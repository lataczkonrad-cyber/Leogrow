// Runs every 15 minutes (Netlify scheduled function). Sends each learner's daily streak reminder
// once a day, at their chosen time in their own time zone, only if today's goal isn't reached yet.
import { supa, vapidKeys, sendPush, reminderMessage, localNow } from '../lib/webpush.mjs';

export const config = { schedule: '*/15 * * * *' };
const LATE = 3 * 60; // don't send a reminder more than 3 hours after the chosen time (e.g. not at midnight)

export default async () => {
  const keys = await vapidKeys();
  const now = new Date();
  let sent = 0, gone = 0, page = 0;
  for (;;) {
    const rows = await supa('GET', `push_subs?enabled=eq.true&select=endpoint,p256dh,auth,remind_at,tz,lang,goal,streak,active_day,done_day,sent_day&order=endpoint&limit=500&offset=${page * 500}`);
    const due = rows.filter(r => {
      const L = localNow(r.tz, now), [h, m] = (r.remind_at || '18:00').split(':').map(Number), at = h * 60 + m;
      r._L = L;
      return r.sent_day !== L.day && r.done_day !== L.day && L.min >= at && L.min - at < LATE;
    });
    for (let i = 0; i < due.length; i += 20) {
      await Promise.all(due.slice(i, i + 20).map(async r => {
        const { t, b } = reminderMessage(r, r._L.day, r._L.yesterday);
        try {
          const s = await sendPush(r, { t, b, tag: 'leogrow-daily', day: r._L.day }, keys);
          const where = 'push_subs?endpoint=eq.' + encodeURIComponent(r.endpoint);
          if (s === 404 || s === 410) { gone++; await supa('DELETE', where, undefined, 'return=minimal'); }
          else if (s < 300) { sent++; await supa('PATCH', where, { sent_day: r._L.day }, 'return=minimal'); }
        } catch (e) { console.error('reminder failed', e.message); }
      }));
    }
    if (rows.length < 500) break;
    page++;
  }
  console.log(`streak reminders: ${sent} sent, ${gone} old devices removed`);
  return new Response('ok');
};
