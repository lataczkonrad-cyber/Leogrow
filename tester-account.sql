-- Leogrow: make an account a TESTER (everything unlocked, still a real logged-in account).
-- 1) Put the account's email between the quotes. 2) Press Run.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"tester": true}'::jsonb
where email = 'PUT-THE-EMAIL-HERE'
returning email, raw_app_meta_data->>'tester' as tester;

-- To turn it OFF again, use the same lines with false instead of true:
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"tester": false}'::jsonb where email = 'PUT-THE-EMAIL-HERE';
