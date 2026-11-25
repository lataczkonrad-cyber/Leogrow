"""Build a standalone one-lesson Leogrow file from the built site.  Run ./build.sh <name> (it does all steps).
Takes site/lingrow-academy.html (the whole engine: exercises, Leo, sounds, voice, emoji pictures),
adds the lesson from <name>_lesson.js (it defines STANDALONE_LESSON and STANDALONE_UNIT), opens it straight away and lets the learner jump to any step.
Voice clips and emoji pictures the lesson needs are put inside the file, so it works on its own."""
import os, re, json, base64, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(HERE, '..', '..', 'site')
OUT = os.environ.get('OUT', os.path.join(HERE, 'leogrow-holiday-lesson.html'))
LIVE = 'https://leogrow.netlify.app/'
html = open(os.path.join(SITE, 'lingrow-academy.html')).read()
NAME = os.environ.get('LESSON', 'holiday')
lesson = open(os.path.join(HERE, NAME + '_lesson.js')).read()

def b64(path, mime):
    return 'data:%s;base64,%s' % (mime, base64.b64encode(open(path, 'rb').read()).decode())

# ---- voice: inline the clips this lesson can play (words, sentences, Leo's "lesson complete" lines)
clips = json.loads(re.search(r'const VOICE_CLIPS=(\{.*?\});\n', html).group(1))
leo = json.loads(re.search(r'const LEO_CLIPS=(\{.*?\});', html).group(1))
strings = set()
for m in re.finditer(r'(?:\["|en:"|word:"|options:\[)([^"\]]+)', lesson):
    strings.add(' '.join(m.group(1).strip().lower().split()))
for m in re.finditer(r'"([^"]{2,60})"', lesson):
    strings.add(' '.join(m.group(1).strip().lower().split()))
want = {f for k, f in clips.items() if k in strings}
want |= set(leo.get('win', []))
vdata = {f: b64(os.path.join(SITE, 'voice', f), 'audio/mpeg') for f in sorted(want) if os.path.exists(os.path.join(SITE, 'voice', f))}
print('voice clips inside:', len(vdata), 'of', len([k for k in clips if k in strings]), 'matching')

old = "a=new Audio('voice/'+f)"
assert html.count(old) == 1
html = html.replace(old, "a=new Audio(VOICE_DATA[f]||'%svoice/'+f)" % LIVE)

# ---- emoji pictures: inline the ones the lesson shows, the rest load from the live site
old = "im.src='emoji/'+EMOJI_FILE.get(k)"
assert html.count(old) == 1
html = html.replace(old, "im.src=EMOJI_DATA[k]||'%semoji/'+EMOJI_FILE.get(k)" % LIVE)
edata = {}  # filled in by inline_emoji.py after emoji_post.js has added any new pictures
data_js = 'const VOICE_DATA=%s;const EMOJI_DATA=%s;\n' % (json.dumps(vdata), json.dumps(edata))
first_script = html.index('<script>', html.index('<body>')) + len('<script>')
html = html[:first_script] + '\n' + data_js + html[first_script:]

# ---- title, and no links to files that only exist on the website
_u = re.search(r'STANDALONE_UNIT=\{.*?level:"(\w+)".*?title:"([^"]+)"', lesson)
html = re.sub(r'<title>[^<]*</title>', '<title>Leogrow — %s (%s)</title>' % (_u.group(2), _u.group(1)), html, count=1)
html = re.sub(r'<link rel="manifest"[^>]*>', '', html)
html = re.sub(r'<link rel="apple-touch-icon"[^>]*>', '', html)
html = html.replace('href="lingrow-icon-192.png"', 'href="%s"' % b64(os.path.join(SITE, 'lingrow-icon-192.png'), 'image/png'))
html = html.replace('<script src="lingrow-config.js"></script>', '')  # no accounts in the standalone lesson

# ---- the lesson + open it straight away
boot = lesson + r'''
/* ---------- standalone mode: one lesson, every step open ---------- */
(function(){
  const L=STANDALONE_LESSON, unit=Object.assign({lessons:[L]},STANDALONE_UNIT);
  L.unit=unit; ALL_LESSONS.push(L);
  window.STANDALONE=true;
  lessonUnlocked=()=>true;
  // the automatic pronunciation check only runs on the website, so here: listen, say it out loud, tap Next
  SP.off=true;
  // "Course" means "start this lesson again" here
  showCourse=function(){ C.active=null; saveProgress(true); openLesson(L); window.scrollTo({top:0}); };
  const _fin=rLessonFinish;
  rLessonFinish=function(){ return _fin().replace('🗺️ Back to course','🔁 Start again'); };
  const _welcome=rLessonWelcome;
  rLessonWelcome=function(){ return _welcome().replace('</p>\n  <div style="text-align:center;">','</p><p class="sa-hint">💡 Tap any step in the step list to jump straight to it — you don\'t have to do them in order.</p>\n  <div style="text-align:center;">'); };
  const st=document.createElement('style');
  st.textContent=`body.tester .topbar::after{display:none!important}
  .back-course,.tester-bar,#testerBar{display:none!important}
  .sa-hint{text-align:center;font-weight:800;color:#050a30;background:#fff6dc;border:2px solid #ecb83a;border-radius:14px;padding:8px 12px;margin:8px auto;max-width:560px;font-size:14px}
  .trail-dot{cursor:pointer}`;
  document.head.appendChild(st);
  try{document.body.classList.remove('onboarding');}catch(e){}
  openLesson(L);
})();
'''
end = html.rindex('</script>')
html = html[:end] + boot + html[end:]
open(OUT, 'w').write(html)
print('ok', OUT, round(len(html) / 1e6, 2), 'MB')
