/* Leogrow — offline support. Bump VERSION when the app file changes. */
const VERSION = 'leogrow-v7';
const CORE = ['./lingrow-academy.html', './lingrow-config.js', './lingrow.webmanifest', './lingrow-icon-192.png', './lingrow-icon-512.png', './lingrow-icon-180.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // the app page: try the network first so updates arrive, fall back to the saved copy offline
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
