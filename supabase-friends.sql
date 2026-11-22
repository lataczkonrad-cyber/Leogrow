-- Leogrow friends league.
-- Paste this into Supabase → SQL Editor → New query → Run. It is safe to run again.

-- 1) one row per learner that friends can see: friend code, first name, Leo, weekly points
create table if not exists public.friend_board (
  user_id    uuid primary key references auth.users on delete cascade,
  code       text not null unique default upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8)),
  name       text not null default 'Learner' check (char_length(name) <= 20),
  leo        text check (char_length(leo) <= 12),
  week       text,
  xp         int  not null default 0 check (xp between 0 and 200000),
  last_week  text,
  last_xp    int  not null default 0 check (last_xp between 0 and 200000),
  updated_at timestamptz not null default now()
);

-- 2) who is friends with whom (always stored both ways)
create table if not exists public.friends (
  user_id    uuid not null references auth.users on delete cascade,
  friend_id  uuid not null references auth.users on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id)
);

alter table public.friend_board enable row level security;
alter table public.friends      enable row level security;

-- you see your own row and your friends' rows, nobody else's
drop policy if exists "board: me and my friends" on public.friend_board;
create policy "board: me and my friends" on public.friend_board for select using (
  auth.uid() = user_id
  or exists (select 1 from public.friends f where f.user_id = auth.uid() and f.friend_id = friend_board.user_id)
);
drop policy if exists "board: add my row" on public.friend_board;
create policy "board: add my row" on public.friend_board for insert with check (auth.uid() = user_id);
drop policy if exists "board: update my row" on public.friend_board;
create policy "board: update my row" on public.friend_board for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "friends: my list" on public.friends;
create policy "friends: my list" on public.friends for select using (auth.uid() = user_id);

-- 3) add a friend by their code (the only way to make friends)
create or replace function public.add_friend(p_code text) returns json
language plpgsql security definer set search_path = public as $$
declare me uuid := auth.uid(); fid uuid; fname text;
begin
  if me is null then return json_build_object('ok', false, 'why', 'login'); end if;
  select user_id, name into fid, fname from friend_board
    where code = upper(regexp_replace(coalesce(p_code, ''), '[^0-9A-Za-z]', '', 'g'));
  if fid is null then return json_build_object('ok', false, 'why', 'nocode'); end if;
  if fid = me then return json_build_object('ok', false, 'why', 'self'); end if;
  if exists (select 1 from friends where user_id = me and friend_id = fid) then
    return json_build_object('ok', false, 'why', 'already', 'name', fname); end if;
  if (select count(*) from friends where user_id = me) >= 50 then return json_build_object('ok', false, 'why', 'full'); end if;
  insert into friends (user_id, friend_id) values (me, fid), (fid, me) on conflict do nothing;
  return json_build_object('ok', true, 'name', fname);
end $$;

-- 4) remove a friend (from both lists)
create or replace function public.remove_friend(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  delete from friends where (user_id = auth.uid() and friend_id = p_id) or (user_id = p_id and friend_id = auth.uid());
end $$;

-- 5) let logged-in learners use it from the website
grant usage on schema public to authenticated;
revoke all on public.friend_board, public.friends from anon, authenticated;
grant select on public.friend_board to authenticated;
-- the friend code can't be changed by the learner (only name, Leo and points)
grant insert (user_id, name, leo, week, xp, last_week, last_xp, updated_at),
      update (user_id, name, leo, week, xp, last_week, last_xp, updated_at) on public.friend_board to authenticated;
grant select on public.friends to authenticated;
revoke execute on function public.add_friend(text), public.remove_friend(uuid) from public, anon;
grant execute on function public.add_friend(text), public.remove_friend(uuid) to authenticated;
notify pgrst, 'reload schema';
