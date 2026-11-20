// Shared helpers for Leogrow's payment functions. No npm packages needed.
// Netlify → Site configuration → Environment variables must hold:
//   STRIPE_SECRET_KEY          (Stripe → Developers → API keys → Secret key, sk_live_… or sk_test_…)
//   STRIPE_WEBHOOK_SECRET      (Stripe → Developers → Webhooks → your endpoint → Signing secret, whsec_…)
//   SUPABASE_SERVICE_ROLE_KEY  (Supabase → Project Settings → API keys → secret / service_role key)
import crypto from 'node:crypto';

export const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dqksrcffgkngjbkkfhby.supabase.co';
export const PLANS = {
  month: { amount: 2499, name: 'Leogrow Premium (monthly)', namePl: 'Leogrow Premium (miesięcznie)' },
  year:  { amount: 14900, name: 'Leogrow Premium (1 year)', namePl: 'Leogrow Premium (1 rok)', days: 365 },
};

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export function siteUrl(req) {
  const o = req.headers.get('origin');
  if (o && /^https:\/\/[a-z0-9.-]+$/i.test(o)) return o;
  return process.env.URL || 'https://leogrow.netlify.app';
}

function needEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Payments are not set up yet (missing ${name}).`);
  return v;
}

// --- Stripe REST (form-encoded) ---
function form(obj, prefix, out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object' && !Array.isArray(v)) form(v, key, out);
    else if (Array.isArray(v)) v.forEach((x, i) => (typeof x === 'object' ? form(x, `${key}[${i}]`, out) : out.append(`${key}[${i}]`, String(x))));
    else out.append(key, String(v));
  }
  return out;
}
export async function stripe(method, path, params) {
  const r = await fetch('https://api.stripe.com/v1/' + path, {
    method,
    headers: { Authorization: 'Bearer ' + needEnv('STRIPE_SECRET_KEY'), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params ? form(params).toString() : undefined,
  });
  const j = await r.json();
  if (!r.ok) throw new Error((j.error && j.error.message) || 'Stripe error ' + r.status);
  return j;
}

// Stripe-Signature: t=…,v1=…  — HMAC-SHA256 of "t.payload"
export function verifyStripe(payload, header) {
  const secret = needEnv('STRIPE_WEBHOOK_SECRET');
  const parts = Object.fromEntries((header || '').split(',').map(p => p.split('=')).filter(p => p.length === 2).map(([k, v]) => [k, v]));
  const sigs = (header || '').split(',').filter(p => p.startsWith('v1=')).map(p => p.slice(3));
  const t = Number(parts.t);
  if (!t || !sigs.length) return false;
  if (Math.abs(Date.now() / 1000 - t) > 300) return false;
  const want = crypto.createHmac('sha256', secret).update(`${t}.${payload}`).digest('hex');
  return sigs.some(s => s.length === want.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(want)));
}

// --- Supabase (service role, server side only) ---
function supaHeaders(extra) {
  const key = needEnv('SUPABASE_SERVICE_ROLE_KEY');
  return { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', ...extra };
}
export async function userFromToken(token) {
  if (!token) return null;
  const r = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { apikey: needEnv('SUPABASE_SERVICE_ROLE_KEY'), Authorization: 'Bearer ' + token } });
  if (!r.ok) return null;
  const u = await r.json();
  return u && u.id ? u : null;
}
export async function getPremium(userId) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/premium?user_id=eq.${encodeURIComponent(userId)}&select=*`, { headers: supaHeaders() });
  if (!r.ok) throw new Error('Supabase read failed: ' + (await r.text()));
  return (await r.json())[0] || null;
}
export async function savePremium(userId, fields) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/premium?on_conflict=user_id`, {
    method: 'POST',
    headers: supaHeaders({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
    body: JSON.stringify({ user_id: userId, ...fields, updated_at: new Date().toISOString() }),
  });
  if (!r.ok) throw new Error('Supabase write failed: ' + (await r.text()));
}
export const bearer = req => (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
