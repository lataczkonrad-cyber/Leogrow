// Leogrow — one emoji style everywhere.
// Run after assemble.py + pwa_post.py:   node emoji_post.js
// 1. finds every emoji the app uses (in lingrow-academy.html),
// 2. makes sure site/emoji/<codepoints>.svg exists for each one
//    (Microsoft Fluent Emoji "flat", MIT licence; flags from Twemoji, CC-BY 4.0),
// 3. writes the list into the page (EMOJI_KEYS) so the app swaps the phone's own emoji for these pictures.
// Pictures already in site/emoji/ are reused, so the build works offline. Only new emoji need the internet
// (the two icon packs are downloaded once from the npm registry into src/.emoji-src/, which git ignores).
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const HERE = __dirname, SITE = process.env.SITE_DIR || path.join(HERE, '..', 'site');
const OUT = path.join(SITE, 'lingrow-academy.html'), DIR = path.join(SITE, 'emoji');
const CACHE = path.join(HERE, '.emoji-src');
fs.mkdirSync(DIR, { recursive: true });

const RX = /\p{RI}\p{RI}|[#*0-9]️?⃣|\p{Extended_Pictographic}(?:️|\p{EMod})?(?:‍\p{Extended_Pictographic}(?:️|\p{EMod})?)*/gu;
const keyOf = m => /\p{Emoji_Presentation}|️|⃣|\p{RI}/u.test(m)
  ? [...m].map(c => c.codePointAt(0).toString(16)).filter(h => h !== 'fe0f').join('-') : null;

let html = fs.readFileSync(OUT, 'utf8');
// also catch emoji written as 🔊 inside the scripts
const scan = html.replace(/\\u(d[89ab][0-9a-f]{2})\\u(d[c-f][0-9a-f]{2})/gi, (_, a, b) => String.fromCharCode(parseInt(a, 16), parseInt(b, 16)))
                 .replace(/\\u(fe0f|200d|20e3)/gi, (_, a) => String.fromCharCode(parseInt(a, 16)));
const want = new Map();
for (const m of scan.matchAll(RX)) { const k = keyOf(m[0]); if (k) want.set(k, m[0]); }

let packs = null;
function loadPacks() {
  if (packs) return packs;
  packs = {};
  for (const name of ['fluent-emoji-flat', 'twemoji']) {
    const dir = path.join(CACHE, name), file = path.join(dir, 'package', 'icons.json');
    if (!fs.existsSync(file)) {
      fs.mkdirSync(dir, { recursive: true });
      const meta = JSON.parse(execSync(`curl -sSL https://registry.npmjs.org/@iconify-json/${name}/latest`).toString());
      execSync(`curl -sSL ${meta.dist.tarball} | tar xz -C "${dir}"`);
    }
    const icons = JSON.parse(fs.readFileSync(file, 'utf8'));
    const chars = JSON.parse(fs.readFileSync(path.join(dir, 'package', 'chars.json'), 'utf8'));
    const byKey = {};
    for (const [k, v] of Object.entries(chars)) byKey[k.split('-').filter(h => h !== 'fe0f').join('-')] = v;
    packs[name] = { icons, byKey };
  }
  // Fluent has keycap pictures that its character list forgets
  const f = packs['fluent-emoji-flat'].byKey;
  for (let d = 0; d <= 9; d++) f[(0x30 + d).toString(16) + '-20e3'] = 'keycap-' + d;
  f['23-20e3'] = 'keycap-hashtag'; f['2a-20e3'] = 'keycap-asterisk'; f['1f51f'] = f['1f51f'] || 'keycap-10';
  return packs;
}
function svgOf(pack, name) {
  const { icons } = pack;
  let icon = icons.icons[name], tf = '';
  if (!icon && icons.aliases && icons.aliases[name]) {
    const a = icons.aliases[name]; icon = icons.icons[a.parent];
    const w = icon.width || icons.width, h = icon.height || icons.height;
    if (a.hFlip) tf += `translate(${w} 0) scale(-1 1) `;
    if (a.vFlip) tf += `translate(0 ${h}) scale(1 -1) `;
    if (a.rotate) tf += `rotate(${a.rotate * 90} ${w / 2} ${h / 2}) `;
  }
  if (!icon) return null;
  const w = icon.width || icons.width, h = icon.height || icons.height;
  const body = tf ? `<g transform="${tf.trim()}">${icon.body}</g>` : icon.body;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${body}</svg>`;
}

const have = [], missing = [];
let added = 0;
for (const [k, ch] of want) {
  const file = path.join(DIR, k + '.svg');
  if (fs.existsSync(file)) { have.push(k); continue; }
  const P = loadPacks();
  let svg = null;
  for (const name of ['fluent-emoji-flat', 'twemoji']) {
    const n = P[name].byKey[k]; if (n) svg = svgOf(P[name], n); if (svg) break;
  }
  if (!svg) { missing.push(ch + ' ' + k); continue; }
  fs.writeFileSync(file, svg); have.push(k); added++;
}
have.sort();
const keep = new Set(have.map(k => k + '.svg'));
for (const f of fs.readdirSync(DIR)) if (f.endsWith('.svg') && !keep.has(f)) fs.unlinkSync(path.join(DIR, f));
const before = html;
html = html.replace(/const EMOJI_KEYS=\[[^\]]*\];/, 'const EMOJI_KEYS=' + JSON.stringify(have) + ';');
if (html === before && !html.includes('const EMOJI_KEYS=' + JSON.stringify(have))) throw new Error('EMOJI_KEYS placeholder not found');
fs.writeFileSync(OUT, html);
console.log(`emoji ok: ${have.length} pictures (${added} new)` + (missing.length ? `; no picture for: ${missing.join(', ')}` : ''));
