// Streak reminders: the app saves this device's push subscription and its daily state here.
//   GET                              → { key }  the public key the browser needs to subscribe
//   POST {action:'save', sub, state, test}  → keep (or update) this device; test:true also sends a "reminders are on" message
//   POST {action:'off', endpoint}    → forget this device
// Being logged in is optional. If you are, reaching the goal on one device also stops the reminder on your others.
import { json, userFromToken, bearer } from '../lib/leogrow.mjs';
import { supa, vapidKeys, sendPush, localNow } from '../lib/webpush.mjs';

const DAY = /^\d{4}-\d\d-\d\d$/, HM = /^\d\d:\d\d$/;
const clean = (s, re, max = 40) => (typeof s === 'string' && s.length <= max && (!re || re.test(s)) ? s : null);

function goodEndpoint(e) {
  try { const u = new URL(e); return u.protocol === 'https:' && e.length < 1000 && !/^(localhost|127\.|10\.|192\.168\.)/.test(u.hostname); } catch (_) { return false; }
}

export default async req => {
  try {
    if (req.method === 'GET') return json({ key: (await vapidKeys()).publicKey });
    if (req.method !== 'POST') return json({ error: 'GET or POST' }, 405);
    const body = await req.json().catch(() => ({}));
    const enc = encodeURIComponent;

    if (body.action === 'off') {
      if (!goodEndpoint(body.endpoint)) return json({ error: 'bad endpoint' }, 400);
      await supa('DELETE', 'push_subs?endpoint=eq.' + enc(body.endpoint), undefined, 'return=minimal');
      return json({ ok: true });
    }

    if (body.action !== 'save') return json({ error: 'unknown action' }, 400);
    const sub = body.sub || {}, keys = sub.keys || {}, st = body.state || {};
    if (!goodEndpoint(sub.endpoint) || !clean(keys.p256dh, /^[\w-]+=*$/, 120) || !clean(keys.auth, /^[\w-]+=*$/, 60)) return json({ error: 'bad subscription' }, 400);
    const tz = clean(st.tz, /^[\w+\-/]+$/, 60) || 'Europe/Warsaw';
    try { new Intl.DateTimeFormat('en', { timeZone: tz }); } catch (_) { return json({ error: 'bad time zone' }, 400); }
    const user = await userFromToken(bearer(req)).catch(() => null);

    const old = (await supa('GET', `push_subs?endpoint=eq.${enc(sub.endpoint)}&select=done_day,active_day,streak`))[0] || {};
    const active = clean(st.active_day, DAY);
    const newer = active && (!old.active_day || active >= old.active_day);
    const row = {
      endpoint: sub.endpoint, p256dh: keys.p256dh, auth: keys.auth,
      enabled: st.on !== false,
      remind_at: clean(st.time, HM) || '18:00', tz,
      lang: st.lang === 'pl' ? 'pl' : 'en',
      goal: Math.max(1, Math.min(120, parseInt(st.goal, 10) || 10)),
      // never go backwards: an older report from this device must not undo a newer one
      streak: newer || old.streak == null ? Math.max(0, Math.min(100000, parseInt(st.streak, 10) || 0)) : old.streak,
      active_day: newer ? active : old.active_day || null,
      done_day: [clean(st.done_day, DAY), old.done_day].filter(Boolean).sort().pop() || null,
      updated_at: new Date().toISOString(),
    };
    if (user) row.user_id = user.id;
    await supa('POST', 'push_subs?on_conflict=endpoint', row, 'resolution=merge-duplicates,return=minimal');

    // logged in: tell this learner's other devices too, so you aren't reminded about a goal you already reached
    if (user && row.active_day) {
      const others = await supa('GET', `push_subs?user_id=eq.${user.id}&endpoint=neq.${enc(sub.endpoint)}&select=endpoint,active_day,done_day`);
      for (const o of others) {
        const patch = {};
        if (!o.active_day || row.active_day >= o.active_day) Object.assign(patch, { active_day: row.active_day, streak: row.streak });
        if (row.done_day && (!o.done_day || row.done_day > o.done_day)) patch.done_day = row.done_day;
        if (Object.keys(patch).length) await supa('PATCH', 'push_subs?endpoint=eq.' + enc(o.endpoint), patch, 'return=minimal');
      }
    }

    let test = null;
    if (body.test) {
      const pl = row.lang === 'pl';
      test = await sendPush(row, {
        t: pl ? '🔔 Przypomnienia włączone' : '🔔 Reminders are on',
        b: pl ? `Leo przypomni Ci o ${row.remind_at}, jeśli cel nie będzie jeszcze zrobiony.` : `Leo will remind you at ${row.remind_at} if your goal isn't done yet.`,
        tag: 'leogrow-test',
      }, await vapidKeys(), { ttl: 600 });
      if (test === 404 || test === 410) await supa('DELETE', 'push_subs?endpoint=eq.' + enc(sub.endpoint), undefined, 'return=minimal');
    }
    return json({ ok: true, test, today: localNow(tz).day });
  } catch (e) {
    console.error(e);
    return json({ error: e.message }, 500);
  }
};
