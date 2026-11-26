#!/usr/bin/env node
/* Collect every line the app reads aloud with speak() and add the ones that have no clip yet to
   src/voice/lines.json, so tools/voice_gen.py can make them.  Run after building the site:
     cd src && python3 assemble.py && cd .. && node tools/voice_lines.js
   Covers the course (word cards, "Listen and choose", "Say it") and Business English (dialogue lines,
   phrase tables, model emails, dictation / listening items, flashcards). Needs Playwright. */
const path = require('path'), fs = require('fs');
const {chromium} = require('playwright');
const ROOT = path.join(__dirname, '..');
const LINES = path.join(ROOT, 'src', 'voice', 'lines.json');
(async () => {
  const b = await chromium.launch(), p = await b.newPage();
  await p.goto('file://' + path.join(ROOT, 'site', 'lingrow-academy.html') + '?tester');
  await p.waitForFunction(() => typeof ALL_LESSONS !== 'undefined' && typeof BZ_LESSONS !== 'undefined');
  const all = await p.evaluate(() => {
    const out = [], add = t => { if (t && String(t).trim()) out.push(String(t).trim()); };
    for (const l of ALL_LESSONS) {
      let zs = l.zones; try { openLesson(l.id); zs = zones; } catch (e) {}
      (zs || []).forEach(z => {
        if (z.type === 'cards') (z.cards || []).forEach(c => add(c.say || c.en));
        if (z.type === 'listen') (z.items || []).forEach(c => add(c.word));
        if (z.type === 'speak') (z.items || []).forEach(c => add(c.en));
      });
    }
    for (const l of BZ_LESSONS) {
      try { bzOpen(l.id); } catch (e) { continue; }
      [activeLesson.warm].concat(zones.slice(1, -1)).forEach(z => (z && z.ex || []).forEach(e => {
        const s = t => add(bzSay(t));
        if (e.k === 'dialogue') (e.d || []).forEach(r => s(r[1]));
        if (e.k === 'model' && e.d && e.d.text) s(e.d.text);
        if (e.k === 'table' || e.k === 'flash') (e.P || []).forEach(x => s(x.en));
        if (e.items && ['dict', 'recall', 'listen'].includes(e.k)) e.items.forEach(x => s(x.en));
      }));
    }
    return out;
  });
  await b.close();
  const norm = t => t.trim().toLowerCase().split(/\s+/).join(' ');
  const lines = JSON.parse(fs.readFileSync(LINES, 'utf8')), have = new Set(lines.map(norm));
  const add = [];
  for (const t of all) if (!have.has(norm(t))) { have.add(norm(t)); add.push(t); }
  fs.writeFileSync(LINES, JSON.stringify(lines.concat(add), null, 1) + '\n');
  console.log(`${all.length} spoken lines found, ${add.length} new (${add.reduce((s, t) => s + t.length, 0)} characters) added to src/voice/lines.json`);
})();
