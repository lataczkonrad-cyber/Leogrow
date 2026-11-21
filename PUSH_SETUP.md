# Streak reminders — setup (about 2 minutes)

Learners who turn on **🎯 Goal & reminder → 🔔 Turn on reminders** now get their reminder even when Leogrow is fully closed.
Leo only reminds them if they haven't reached today's goal yet, once a day, at the time they picked.

## 1. Supabase: make the reminder tables
1. Open supabase.com → your Leogrow project → **SQL Editor** → **New query**.
2. Paste everything from `supabase-push.sql` and click **Run**.

That's all. No new keys are needed: the server makes its own push keys the first time and keeps them safe in Supabase.
(It uses the `SUPABASE_SERVICE_ROLE_KEY` that is already in Netlify for Premium.)

## 2. Try it
- **Android phone or computer (Chrome, Edge, Firefox):** open leogrow.netlify.app → **🎯 Goal & reminder** → **🔔 Turn on reminders** → **Allow**.
  A "🔔 Reminders are on" message pops up within a few seconds. That means it works.
- **iPhone / iPad (iOS 16.4 or newer):** first open the site in Safari, tap **Share ⬆️ → Add to Home Screen**,
  open Leogrow from the Home Screen icon, then turn reminders on as above. (Apple only allows reminders for apps on the Home Screen.)

## Good to know
- Reminders are checked every 15 minutes, so one can arrive up to 15 minutes after the chosen time.
- If the learner is logged in, reaching the goal on one device stops today's reminder on their other devices too.
- Netlify → **Logs → Functions → push-remind** shows how many reminders went out each time.
