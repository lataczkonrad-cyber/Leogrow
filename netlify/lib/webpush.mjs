// Web Push for Leogrow's streak reminders, built on node:crypto only (no npm packages).
//   - VAPID (RFC 8292): an ES256-signed token that tells the push service the message is from us
//   - message encryption (RFC 8291, "aes128gcm"): only the learner's browser can read the text
// The VAPID key pair is made once, automatically, and kept in the Supabase table push_keys
// (only the server can read it). Netlify variables VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY override it.
import crypto from 'node:crypto';
import { SUPABASE_URL } from './leogrow.mjs';

const b64u = buf => Buffer.from(buf).toString('base64url');
const unb64u = s => Buffer.from(String(s).replace(/=+$/, ''), 'base64url');

function svcHeaders(extra) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('Reminders are not set up yet (missing SUPABASE_SERVICE_ROLE_KEY in Netlify).');
  return { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', ...extra };
}
export async function supa(method, path, body, prefer) {
  const r = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
    method,
    headers: svcHeaders(prefer ? { Prefer: prefer } : {}),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!r.ok) {
    const t = await r.text();
    if (/push_(subs|keys)/.test(t) && /does not exist|schema cache/.test(t)) throw new Error('Reminders setup: run supabase-push.sql in Supabase first.');
    throw new Error(`Supabase ${method} ${path.split('?')[0]} failed: ${r.status} ${t}`);
  }
  return r.status === 204 || !(r.headers.get('content-type') || '').includes('json') ? null : r.json();
}

// ---- VAPID keys ----
export function makeVapidKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const jwk = privateKey.export({ format: 'jwk' });
  return { publicKey: b64u(publicKey.export({ format: 'der', type: 'spki' }).subarray(-65)), privateKey: jwk.d };
}
function privKeyObject(pub, d) {
  const raw = unb64u(pub);
  return crypto.createPrivateKey({ format: 'jwk', key: { kty: 'EC', crv: 'P-256', x: b64u(raw.subarray(1, 33)), y: b64u(raw.subarray(33, 65)), d } });
}
let _keys = null;
export async function vapidKeys() {
  if (_keys) return _keys;
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) return (_keys = { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY });
  let rows = await supa('GET', 'push_keys?id=eq.1&select=public_key,private_key');
  if (!rows.length) {
    const k = makeVapidKeys();
    // "ignore-duplicates": if two requests race, the first saved pair wins and both read it back
    await supa('POST', 'push_keys?on_conflict=id', { id: 1, public_key: k.publicKey, private_key: k.privateKey }, 'resolution=ignore-duplicates,return=minimal');
    rows = await supa('GET', 'push_keys?id=eq.1&select=public_key,private_key');
  }
  return (_keys = { publicKey: rows[0].public_key, privateKey: rows[0].private_key });
}
export function vapidAuth(endpoint, keys, subject) {
  const aud = new URL(endpoint).origin;
  const head = b64u(JSON.stringify({ typ: 'JWT', alg: 'ES256' }));
  const claims = b64u(JSON.stringify({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: subject }));
  const sig = crypto.sign('sha256', Buffer.from(head + '.' + claims), { key: privKeyObject(keys.publicKey, keys.privateKey), dsaEncoding: 'ieee-p1363' });
  return `vapid t=${head}.${claims}.${b64u(sig)}, k=${keys.publicKey}`;
}

// ---- RFC 8291 encryption ----
const hmac = (key, data) => crypto.createHmac('sha256', key).update(data).digest();
export function encrypt(payload, p256dh, auth, _test) {
  const uaPub = unb64u(p256dh), authSecret = unb64u(auth);
  if (uaPub.length !== 65 || authSecret.length < 16) throw new Error('bad subscription keys');
  const as = crypto.createECDH('prime256v1');
  if (_test && _test.asPrivate) as.setPrivateKey(_test.asPrivate); else as.generateKeys();
  const asPub = as.getPublicKey();
  const ecdh = as.computeSecret(uaPub);
  const prkKey = hmac(authSecret, ecdh);
  const ikm = hmac(prkKey, Buffer.concat([Buffer.from('WebPush: info\0'), uaPub, asPub, Buffer.from([1])]));
  const salt = (_test && _test.salt) || crypto.randomBytes(16);
  const prk = hmac(salt, ikm);
  const cek = hmac(prk, Buffer.from('Content-Encoding: aes128gcm\0\x01')).subarray(0, 16);
  const nonce = hmac(prk, Buffer.from('Content-Encoding: nonce\0\x01')).subarray(0, 12);
  const c = crypto.createCipheriv('aes-128-gcm', cek, nonce);
  const body = Buffer.concat([c.update(Buffer.concat([Buffer.from(payload), Buffer.from([2])])), c.final(), c.getAuthTag()]);
  const rs = Buffer.alloc(4); rs.writeUInt32BE(4096);
  return Buffer.concat([salt, rs, Buffer.from([asPub.length]), asPub, body]);
}

// Sends one notification. Returns the push service's HTTP status (201 = sent, 404/410 = subscription is gone).
export async function sendPush(sub, data, keys, { ttl = 6 * 3600, subject = 'https://leogrow.netlify.app' } = {}) {
  const r = await fetch(sub.endpoint, {
    method: 'POST',
    headers: {
      Authorization: vapidAuth(sub.endpoint, keys, subject),
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      TTL: String(ttl),
      Urgency: 'normal',
    },
    body: encrypt(JSON.stringify(data), sub.p256dh, sub.auth),
  });
  if (r.status >= 400 && r.status !== 404 && r.status !== 410) console.error('push failed', r.status, new URL(sub.endpoint).host, await r.text().catch(() => ''));
  return r.status;
}

// ---- the reminder text (same words as the app's own reminder) ----
export function reminderMessage(row, today, yesterday) {
  const pl = row.lang === 'pl';
  const n = row.active_day === today || row.active_day === yesterday ? row.streak || 0 : 0;
  const g = row.goal || 10;
  return n
    ? { t: pl ? `🔥 Utrzymaj serię ${n} dni!` : `🔥 Keep your ${n}-day streak!`, b: pl ? `Tylko ${g} minut angielskiego i dzisiejszy cel zrobiony.` : `Just ${g} minutes of English and today's goal is done.` }
    : { t: pl ? 'Czas na angielski z Leo! 🦁' : 'Time for English with Leo! 🦁', b: pl ? `Tylko ${g} minut dzisiaj. Do dzieła!` : `Just ${g} minutes today. Let's go!` };
}

// local date and HH:MM in a learner's time zone
export function localNow(tz, now = new Date()) {
  let p;
  try { p = new Intl.DateTimeFormat('en-CA', { timeZone: tz || 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now); }
  catch (e) { return localNow('Europe/Warsaw', now); }
  const v = Object.fromEntries(p.map(x => [x.type, x.value]));
  const day = `${v.year}-${v.month}-${v.day}`;
  const [y, m, d] = day.split('-').map(Number);
  const yd = new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10);
  return { day, yesterday: yd, hm: `${v.hour}:${v.minute}`, min: Number(v.hour) * 60 + Number(v.minute) };
}
