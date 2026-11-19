-- Lingrow Academy: one row of saved progress per learner.
-- Paste this into Supabase → SQL Editor → New query → Run.
create table if not exists public.progress (
  user_id uuid primary key references auth.users on delete cascade,
  display_name text,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;
-- every learner can only see and change their own row
create policy "read own progress"   on public.progress for select using (auth.uid() = user_id);
create policy "insert own progress" on public.progress for insert with check (auth.uid() = user_id);
create policy "update own progress" on public.progress for update using (auth.uid() = user_id);
-- let logged-in learners use the table through the website (needed on newer Supabase projects)
grant usage on schema public to authenticated;
grant select, insert, update on public.progress to authenticated;
notify pgrst, 'reload schema';
