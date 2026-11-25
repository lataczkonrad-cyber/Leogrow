// Open the standalone lesson, visit every step (phone + PC), collect the emoji pictures it shows, take screenshots.
const { chromium } = require('playwright');
const fs = require('fs');
const [,, file, outDir, keysOut] = process.argv;
(async () => {
  const b = await chromium.launch();
  const used = new Set(); const errors = [];
  for (const [name, vp] of [['pc', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
    const p = await b.newPage({ viewport: vp, deviceScaleFactor: name === 'phone' ? 2 : 1 });
    p.on('pageerror', e => errors.push(name + ': ' + e.message));
    p.on('request', r => { const m = r.url().match(/\/emoji\/([^/?]+)\.\w+$/); if (m) used.add(m[1]); });
    await p.goto('file://' + file); await p.waitForTimeout(1500);
    await p.screenshot({ path: `${outDir}/${name}-0-start.png` });
    const n = await p.evaluate(() => zones.length);
    for (let i = 1; i < n; i++) {
      await p.evaluate(i => go(i), i); await p.waitForTimeout(250);
      await p.evaluate(() => document.querySelectorAll('img.emj').forEach(im => { const m = (im.getAttribute('src') || '').match(/emoji\/([^/?]+)\.\w+$/); }));
      if (name === 'pc' || [1, 4, 14, 22, 24].includes(i)) await p.screenshot({ path: `${outDir}/${name}-${i}-${await p.evaluate(i => zones[i].type, i)}.png` });
    }
    // labels of all steps
    if (name === 'pc') console.log(await p.evaluate(() => zones.map((z, i) => i + ':' + z.type).join(' ')));
    await p.close();
  }
  try { JSON.parse(fs.readFileSync(keysOut, 'utf8')).forEach(k => used.add(k)); } catch (e) {}
  fs.writeFileSync(keysOut, JSON.stringify([...used]));
  console.log('emoji used:', used.size, 'errors:', errors.length); errors.slice(0, 10).forEach(e => console.log(e));
  await b.close();
})();
