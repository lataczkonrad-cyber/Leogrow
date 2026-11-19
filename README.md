# Leogrow (Lingrow Academy) — English A0 → C1 with Leo

- `site/` — the live website. Netlify publishes this folder automatically on every push to `main`.
- `src/` — sources. Rebuild the site with:

```
cd src && python3 assemble.py && python3 pwa_post.py
```

When the app changes, bump `VERSION` in `src/pwa/lingrow-sw.js` so phones pick up the update.
Supabase setup SQL: `supabase-setup.sql`.
