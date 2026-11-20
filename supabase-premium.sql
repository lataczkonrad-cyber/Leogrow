-- Leogrow Premium: one row per learner who paid. Only the payment webhook (service role) writes it.
-- Paste this into Supabase → SQL Editor → New query → Run.
create table if not exists public.premium (
  user_id uuid primary key references auth.users on delete cascade,
  sub_until timestamptz,             -- monthly subscription paid until
  sub_status text,                   -- active / past_due / canceled …
  paid_until timestamptz,            -- yearly one-off payment valid until
  stripe_customer_id text,
  stripe_subscription_id text,
  last_payment text,
  updated_at timestamptz not null default now()
);
alter table public.premium enable row level security;
-- learners can only read their own row; nobody can write it from the website
drop policy if exists "read own premium" on public.premium;
create policy "read own premium" on public.premium for select using (auth.uid() = user_id);
grant select on public.premium to authenticated;
grant all on public.premium to service_role;
notify pgrst, 'reload schema';
