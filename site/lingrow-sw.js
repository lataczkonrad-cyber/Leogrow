/* Leogrow — offline support. Bump VERSION when the app file changes. */
const VERSION = 'leogrow-v42';
const CORE = ['./lingrow-academy.html', './lingrow-config.js', './lingrow.webmanifest', './lingrow-icon-192.png', './lingrow-icon-512.png', './lingrow-icon-180.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== 'leogrow-state').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // accounts, progress and Premium status must always be fresh: never serve them from the cache
  if (url.hostname.endsWith('.supabase.co') || url.hostname === 'accounts.google.com' || url.pathname.startsWith('/.netlify/')) return;
  // the app page: try the network first so updates arrive, fall back to the saved copy offline
  // other pages (terms, privacy): network first, their own saved copy offline
  if (url.origin === location.origin && /\/(terms|privacy)\.html$/.test(url.pathname)) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req)));
    return;
  }
  if (req.mode === 'navigate' || url.pathname.endsWith('.html')) {
    e.respondWith(fetch(req,{cache:'no-store'}).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('./lingrow-academy.html', copy)); return r; })
      .catch(() => caches.match('./lingrow-academy.html')));
    return;
  }
  // everything else (icons, fonts): saved copy first, refresh in the background
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});

/* daily reminder: on Android (installed app) the browser wakes this up now and then; remind once a day after the chosen time if the goal isn't done */
const _day = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
async function maybeRemind() {
  const c = await caches.open('leogrow-state'), r = await c.match('./__reminder');
  if (!r) return;
  const st = await r.json(), now = new Date(), today = _day(now);
  const hm = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  if (!st.on || hm < st.time || st.notified === today || (st.today === today && st.done)) return;
  const wins = await self.clients.matchAll({ type: 'window' });
  if (wins.some(w => w.visibilityState === 'visible')) return;
  const pl = st.lang === 'pl', n = st.today === today || st.today === _day(new Date(now - 864e5)) ? st.streak : 0;
  const title = n ? (pl ? `🔥 Utrzymaj serię ${n} dni!` : `🔥 Keep your ${n}-day streak!`) : (pl ? 'Czas na angielski z Leo! 🦁' : 'Time for English with Leo! 🦁');
  const body = pl ? `Tylko ${st.goal} minut dzisiaj. Do dzieła!` : `Just ${st.goal} minutes today. Let's go!`;
  st.notified = today;
  await c.put('./__reminder', new Response(JSON.stringify(st), { headers: { 'Content-Type': 'application/json' } }));
  await self.registration.showNotification(title, { body, icon: 'lingrow-icon-192.png', badge: 'lingrow-icon-192.png', tag: 'leogrow-daily' });
}
self.addEventListener('periodicsync', e => { if (e.tag === 'leogrow-daily') e.waitUntil(maybeRemind()); });
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    const w = ws.find(x => 'focus' in x);
    return w ? w.focus() : self.clients.openWindow(self.registration.scope);
  }));
});

/* streak reminder sent by the server (works when the app is fully closed; on iPhone once Leogrow is on the Home Screen) */
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { b: e.data && e.data.text() }; }
  const title = d.t || 'Leogrow', tag = d.tag || 'leogrow-daily';
  e.waitUntil((async () => {
    // remember it, so the app's own on-device reminder doesn't repeat it today
    if (tag === 'leogrow-daily') {
      try { const c = await caches.open('leogrow-state'), r = await c.match('./__reminder');
        if (r) { const st = await r.json(); st.notified = d.day || _day(new Date()); await c.put('./__reminder', new Response(JSON.stringify(st), { headers: { 'Content-Type': 'application/json' } })); } } catch (_) {}
    }
    await self.registration.showNotification(title, { body: d.b || '', icon: 'lingrow-icon-192.png', badge: 'lingrow-icon-192.png', tag });
  })());
});
/* the browser renewed this device's push address: tell the server the new one */
self.addEventListener('pushsubscriptionchange', e => {
  e.waitUntil((async () => {
    try {
      const old = e.oldSubscription, sub = e.newSubscription || await self.registration.pushManager.subscribe(old ? old.options : { userVisibleOnly: true, applicationServerKey: (await (await fetch('/.netlify/functions/push')).json()).key });
      let state = {};
      try { const r = await (await caches.open('leogrow-state')).match('./__reminder'); if (r) { const st = await r.json(); state = { on: st.on, time: st.time, lang: st.lang, goal: st.goal, streak: st.streak, tz: st.tz }; } } catch (_) {}
      await fetch('/.netlify/functions/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', sub: sub.toJSON(), state }) });
      if (old) await fetch('/.netlify/functions/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'off', endpoint: old.endpoint }) });
    } catch (_) {}
  })());
});
