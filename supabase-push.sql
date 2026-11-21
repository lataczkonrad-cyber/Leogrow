-- Leogrow streak reminders (push notifications). Paste this into Supabase → SQL Editor → New query → Run.
-- Only Leogrow's server functions (service role) can read or write these tables; the website can't.
create table if not exists public.push_subs (
  endpoint   text primary key,          -- the device's push address (from the browser)
  p256dh     text not null,             -- the device's encryption key
  auth       text not null,
  user_id    uuid references auth.users on delete cascade,  -- set when the learner is logged in
  enabled    boolean not null default true,
  remind_at  text not null default '18:00',  -- HH:MM, learner's local time
  tz         text not null default 'Europe/Warsaw',
  lang       text not null default 'en',
  goal       int  not null default 10,  -- minutes a day
  streak     int  not null default 0,
  active_day text,                      -- last day with a lesson or goal (YYYY-MM-DD, local)
  done_day   text,                      -- last day the daily goal was reached
  sent_day   text,                      -- last day a reminder was sent
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists push_subs_user on public.push_subs (user_id);
-- the server's own signing keys for push messages (made automatically on first use)
create table if not exists public.push_keys (
  id int primary key,
  public_key text not null,
  private_key text not null
);
alter table public.push_subs enable row level security;
alter table public.push_keys enable row level security;
revoke all on public.push_subs from anon, authenticated;
revoke all on public.push_keys from anon, authenticated;
grant all on public.push_subs to service_role;
grant all on public.push_keys to service_role;
notify pgrst, 'reload schema';
