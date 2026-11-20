# Leogrow — English A0 → C1 with Leo

- `site/` — the live website. Netlify publishes this folder automatically on every push to `main`.
- `src/` — sources. Rebuild the site with:

```
cd src && python3 assemble.py && python3 pwa_post.py && node emoji_post.js
```

When the app changes, bump `VERSION` in `src/pwa/lingrow-sw.js` so phones pick up the update.
Supabase setup SQL: `supabase-setup.sql`.
z

## Emoji pictures
All emoji are drawn from self-hosted pictures in `site/emoji/` so they look the same on every device:
[Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (flat style, MIT licence); flags from
[Twemoji](https://github.com/jdecked/twemoji) (graphics CC-BY 4.0). `node emoji_post.js` adds pictures for any new emoji
in the lessons (it downloads the packs once) and removes unused ones.
