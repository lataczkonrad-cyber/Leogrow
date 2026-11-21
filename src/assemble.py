import os
HERE=os.path.dirname(os.path.abspath(__file__))
SITE=os.environ.get('SITE_DIR',os.path.join(HERE,'..','site'))
import re
SRC=os.path.join(HERE,'lesson-technology.html')
OUT=os.path.join(SITE,'lingrow-academy.html')
src=open(SRC).read()
css_course=open(os.path.join(HERE,'course.css')).read()+open(os.path.join(HERE,'habits.css')).read()+open(os.path.join(HERE,'rewards.css')).read()+open(os.path.join(HERE,'premium.css')).read()+open(os.path.join(HERE,'chests.css')).read()+open(os.path.join(HERE,'onboard.css')).read()+"\nbody:not(.in-lesson) .lemur-corner{display:none;}\n"
course_js=open(os.path.join(HERE,'course.js')).read()+'\n'+open(os.path.join(HERE,'habits.js')).read()+'\n'+open(os.path.join(HERE,'push.js')).read()+'\n'+open(os.path.join(HERE,'rewards.js')).read()+'\n'+open(os.path.join(HERE,'premium.js')).read()+'\n'+open(os.path.join(HERE,'chests.js')).read()+'\n'+open(os.path.join(HERE,'onboard.js')).read()
# more topic units (units_*.js) go in just before the CEFR levels block, so they are sorted, scaled and numbered like the rest
import glob as _glob
_more=''.join(open(f).read()+'\n' for f in sorted(_glob.glob(os.path.join(HERE,'units_*.js'))))
assert course_js.count('/* ---------- CEFR levels')==1
course_js=course_js.replace('/* ---------- CEFR levels',_more+'/* ---------- CEFR levels',1)


import base64,io
from PIL import Image
def _uri(name,size,q=88):
    im=Image.open(os.path.join(HERE,'brand',name)).convert('RGBA');im.thumbnail((size,size),Image.LANCZOS)
    b=io.BytesIO();im.save(b,'WEBP',quality=q,method=6);return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
import sys as _sys; _sys.path.insert(0,HERE); import leo_age
def _imuri(im,size=480,q=86):
    im=im.copy();im.thumbnail((size,size),Image.LANCZOS);b=io.BytesIO();im.save(b,'WEBP',quality=q,method=6);return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
import belly
_LEO_BASE=belly.furry_belly(Image.open(os.path.join(HERE,'brand','icon-rounded.png')))
import leo_rig
LEO_AGES={n:{'b':_imuri(r['body']),'t':_imuri(r['tail'],q=88),'f':_imuri(r['front'],q=88),'a':_imuri(r['arm'],q=88),'c':_imuri(r['cap'],q=88),'s':r['shoulder'],'p':r['pivot'],'e':r['eyes']} for n,r in leo_rig.make_rigs(_LEO_BASE).items()}
course_js=course_js.replace('const LEO_AGES={};','const LEO_AGES='+__import__('json').dumps(LEO_AGES)+';',1)
LEO_NEW=_imuri(_LEO_BASE,560); BADGE=_uri('badge-mini.png',256); BADGE_SM=_uri('badge-mini.png',96)
course_js,_k=re.subn(r'const LEO_ADULT="[^"]+"',lambda m:'const LEO_ADULT="%s"'%BADGE,course_js,count=1); assert _k==1
head,rest=src.split('<body>',1)
head=head.replace('<title>Leogrow — Unit 3: Technology for All</title>','<title>Leogrow — English A0–C1</title>')
head=head.replace('</style>',css_course+'</style>',1)

logo=re.search(r'<div class="brand-mark">\s*<img src="(data:image[^"]+)"',src).group(1)
body=f'''<body>
<div class="sparkle-field" id="sparkleField"></div>
<div class="app">
  <div class="topbar">
    <div class="brand">
      <div class="brand-mark">
        <img src="{BADGE_SM}" alt="Leogrow">
      </div>
      <div class="brand-text"><span class="wm-leo">Leo</span><span class="wm-grow">grow</span></div>
    </div>
    <div class="topbar-controls">
      <button class="back-course" onclick="showCourse()" title="Back to the course">🗺️ Course</button>
      <button class="back-course skip-btn" onclick="skipLesson()" title="Tester: jump to the end of this lesson">⏭ Skip</button>
      <button class="sound-toggle" id="musicToggle" onclick="toggleMusic()" title="Background music">🎵</button>
      <button class="sound-toggle" id="soundToggle" onclick="toggleSound()" title="Sound effects">🔊</button>
      <div class="timer-pill" id="timerPill">A0 → C1</div>
    </div>
  </div>
  <div id="courseView"></div>
  <div id="lessonView" style="display:none">
    <div class="xp-bar-row"><div class="xp-bar-wrap"><div class="xp-bar-fill" id="xpBarFill"></div></div><div class="xp-bar-label" id="xpBarLabel">0%</div></div>
    <div class="trail" id="trail"></div>
    <div class="panel" id="panel"></div>
  </div>
</div>
<div class="score-hud" id="scoreHud">0 pts</div>
<div class="confetti" id="confetti"></div>
<div class="lemur-corner" id="lemurCornerSlot"></div>
<script>
'''
script=rest.split('<script>',1)[1]
start=script.index('const LEO_IDLE')
end=script.index("const zones=[")
engine=script[start:end]

def rep(old,new,count=1):
    global engine
    assert old in engine, old[:60]
    engine=engine.replace(old,new,count)

rep('const CONFETTI=["💻","📱","✨","🎧","📷"];','const CONFETTI=["⏰","🥣","🚌","⚽","🌙","✨"];')
rep('const lemurWelcomeMsgs=["Hi! I\'m Leo! 👋","Let\'s talk tech! 💻","Ready to explore?","Log in and let\'s go!"];','const lemurWelcomeMsgs=["Hi! I\'m Leo! 👋","Short and sweet — let\'s go!","Ready? 🚀","You can do it! 💪"];')
rep('const lemurCertMsgs=["Amazing work today!","You\'re a tech expert! 💻","See you next time!","I\'m proud of you!"];','const lemurCertMsgs=["Amazing work today!","See you next time!","I\'m proud of you!"];')
# persistence is replaced by the course layer
s=engine.index("const SAVE_KEY='lingrowTechProgress_v1';")
e=engine.index("const $=id=>")
engine=engine[:s]+engine[e:]
# bonus round uses the current lesson's words
rep("const item=techCards[Math.floor(Math.random()*techCards.length)];\n  const wrongPool=shuffle(techCards.filter(c=>c!==item)).slice(0,2);",
    "const item=BONUS_POOL[Math.floor(Math.random()*BONUS_POOL.length)];\n  const wrongPool=shuffle(BONUS_POOL.filter(c=>c!==item)).slice(0,2);")
# zones are data-driven per lesson
rep("setPanel(renderers[z.key]());","setPanel(renderZone(i));")
rep("function rTechBalloon(){return bpInit(techCards,8);}\n","")
rep("${zoneTag('WHACK-A-CLOCK')}<h2 class=\"title\">Whack-a-Clock! 🔨</h2>","${zoneTag('WHACK-A-LEO')}<h2 class=\"title\">Whack-a-Leo! 🔨</h2>")
rep("doneScreen('WHACK-A-CLOCK',","doneScreen('WHACK-A-LEO',")
rep("<h2 class=\"title\">Free Time Wordle ${WD.emoji}</h2>","<h2 class=\"title\">Wordle ${WD.emoji}</h2>")
rep("Spin the wheel, then type in English what activity you landed on!","Spin the wheel, then type in English what you landed on!")
# stars for exercise types that didn't record them
rep('TFS={items,labels:labels||["True ✅","False ❌"]};','TFS={items,labels:labels||["True ✅","False ❌"],n:0,ok:0};')
rep("if(j===it.answer){el.classList.add('correct');addScore(4);}else{el.classList.add('wrong');o[it.answer].classList.add('correct');}o.forEach(x=>x.style.pointerEvents='none');}",
    "TFS.n++;if(j===it.answer){el.classList.add('correct');TFS.ok++;addScore(4);}else{el.classList.add('wrong');o[it.answer].classList.add('correct');}o.forEach(x=>x.style.pointerEvents='none');if(TFS.n===TFS.items.length)recordZoneStars(TFS.ok,TFS.n);}")
rep("R:shuffle(pairs.map((_,i)=>i)),msg:''};","R:shuffle(pairs.map((_,i)=>i)),msg:'',miss:0};")
rep("MG.msg=MG.done.size===MG.pairs.length?\"All matched! 🎉\":\"Great! ✅\";}else{MG.sel=null;MG.msg=\"Try again! 🔄\";}",
    "MG.msg=MG.done.size===MG.pairs.length?\"All matched! 🎉\":\"Great! ✅\";if(MG.done.size===MG.pairs.length)recordZoneStars(MG.pairs.length,MG.pairs.length+MG.miss);}else{MG.sel=null;MG.miss++;registerWrongAnswer();MG.msg=\"Try again! 🔄\";}")
rep("MM={pairs,tag,title,cards:[],flipped:[],matched:new Set(),lock:false};","MM={pairs,tag,title,cards:[],flipped:[],matched:new Set(),lock:false,miss:0};")
rep("MM.matched.add(MM.cards[a].id);addScore(5);","MM.matched.add(MM.cards[a].id);addScore(5);if(MM.matched.size===MM.pairs.length)recordZoneStars(MM.pairs.length,MM.pairs.length+Math.floor(MM.miss/2));")
rep("}else{setTimeout(()=>{MM.flipped=[];","}else{MM.miss++;setTimeout(()=>{MM.flipped=[];")
rep("if(won){ WD.done=true; WD.won=true; addScore(10); }","if(won){ WD.done=true; WD.won=true; addScore(10); recordZoneStars(1,1); }")
rep("else if(WD.guesses.length>=WD.maxGuesses){ WD.done=true; WD.won=false; registerWrongAnswer(); }","else if(WD.guesses.length>=WD.maxGuesses){ WD.done=true; WD.won=false; registerWrongAnswer(); recordZoneStars(1,2); }")

boot='''
let zones=[];
let FORTUNE_ITEMS=[];
'''+course_js+'''
document.getElementById('lemurCornerSlot').innerHTML=renderLemur('corner',lemurCornerMsgs,118);
(function initSparkleField(){
  const field = document.getElementById('sparkleField');
  if(!field) return;
  const leafIcons = ['⏰','🌙'];
  let html = '';
  for(let i=0;i<8;i++){
    const left = Math.round(Math.random()*100);
    const duration = (14 + Math.random()*10).toFixed(1);
    const delay = (Math.random()*-20).toFixed(1);
    const dx = Math.round((Math.random()-0.5)*80);
    const size = (14 + Math.random()*10).toFixed(0);
    const style = `left:${left}%;--dx:${dx}px;animation-duration:${duration}s;animation-delay:${delay}s;`;
    if(i % 3 === 2){ html += `<span style="${style}font-size:${size}px;">${leafIcons[i%2]}</span>`; }
    else { const s=(size*1.2).toFixed(0); html += `<img class="sparkle-lemur" src="${LEMUR_COIN}" alt="" style="${style}width:${s}px;height:${s}px;">`; }
  }
  field.innerHTML = html;
})();
const _panelObserver = new MutationObserver(muts=>{
  for(const m of muts){
    if(m.type==='attributes' && m.attributeName==='class'){
      const el=m.target;
      if(el.classList && (el.classList.contains('wrong')||el.classList.contains('bad'))){
        if(!window._lastWrongAt || Date.now()-window._lastWrongAt>250){
          window._lastWrongAt=Date.now();
          registerWrongAnswer();
        }
      }
    }
  }
});
_panelObserver.observe($('panel'), {attributes:true, attributeFilter:['class'], subtree:true});
loadProgress();
renderScoreHud();
const soundBtn=$('soundToggle'); if(soundBtn) soundBtn.textContent=soundOn?'🔊':'🔇';
const musicBtn=$('musicToggle'); if(musicBtn) musicBtn.classList.toggle('active', musicOn);
if(musicOn){ musicOn=false; toggleMusic(); }
updateTimer=()=>{};
document.body.classList.toggle('tester',TESTER);
renderCourse();
</script>
</body>
</html>
'''
import re as _re
_lc=open(os.path.join(HERE,'leo_centered.js')).read()
for _o in ["img.src = LEO_CHEER;","img.src = LEO_IDLE;"]:
    assert engine.count(_o)==1,_o; engine=engine.replace(_o,"if(!img.dataset.age) "+_o)
for _n,_v in [('LEO_IDLE',LEO_NEW),('LEO_CHEER',LEO_NEW),('LEMUR_COIN',BADGE)]:
    engine,_k=_re.subn(r'const %s = "[^"]+"'%_n,lambda m:'const %s = "%s"'%(_n,_v),engine,count=1); assert _k==1,_n

# --- voice clips (tools/voice_gen.py) : play the user's recorded voice, browser voice as fallback
_VDIR=os.path.join(HERE,'voice'); _vidx=os.path.join(_VDIR,'index.json')
VOICE_CLIPS=__import__('json').load(open(_vidx)) if os.path.exists(_vidx) else {}
VOICE_CLIPS={k:v for k,v in VOICE_CLIPS.items() if os.path.exists(os.path.join(_VDIR,v))}
_old_speak="function speak(t){try{if(!('speechSynthesis' in window))return false;"
assert engine.count(_old_speak)==1
_VOICE_JS=("const VOICE_CLIPS="+__import__('json').dumps(VOICE_CLIPS,ensure_ascii=False)+";\n"
 # one reusable player per clip: no reload delay, so the first sound isn't swallowed
 "const _vCache={};let _vAud=null;window._voiceBusy=false;\n"
 "function _vGet(f){let a=_vCache[f];if(!a){a=new Audio('voice/'+f);a.preload='auto';"
 "a.addEventListener('ended',()=>{if(_vAud===a)window._voiceBusy=false;});"
 "a.addEventListener('pause',()=>{if(_vAud===a)window._voiceBusy=false;});_vCache[f]=a;}return a;}\n"
 "function speak(t){const f=VOICE_CLIPS[String(t||'').trim().toLowerCase().split(/\\s+/).join(' ')];"
 "if(f){try{if('speechSynthesis' in window)speechSynthesis.cancel();const a=_vGet(f);"
 # tapping again while the same clip is still playing lets it finish instead of cutting it
 "if(_vAud===a&&!a.paused&&!a.ended)return true;"
 "if(_vAud&&_vAud!==a){_vAud.pause();}_vAud=a;a.currentTime=0;window._voiceBusy=true;"
 "const p=a.play();if(p&&p.catch)p.catch(()=>{window._voiceBusy=false;_ttsSpeak(t);});return true;}catch(e){}}return _ttsSpeak(t);}\n"
 "function _ttsSpeak(t){try{if(!('speechSynthesis' in window))return false;")
engine=engine.replace(_old_speak,_VOICE_JS,1)
# the little background tune pauses while your voice is speaking
_mt="if(!musicOn||!soundOn) return;"
assert engine.count(_mt)==1
engine=engine.replace(_mt,"if(!musicOn||!soundOn||window._voiceBusy) return;")
# --- Leo's own lines in the owner's voice (tools/voice_gen.py --leo): praise, try again, lesson complete
_lj=os.path.join(_VDIR,'leo_lines.json'); _li=os.path.join(_VDIR,'leo_index.json')
LEO_CLIPS={}
if os.path.exists(_lj) and os.path.exists(_li):
    _lidx=__import__('json').load(open(_li))
    for _g,_ts in __import__('json').load(open(_lj)).items():
        _fs=[_lidx.get(' '.join(t.strip().lower().split())) for t in _ts]
        LEO_CLIPS[_g]=[f for f in _fs if f and os.path.exists(os.path.join(_VDIR,f))]
_lsay={}
if os.path.exists(_lj) and os.path.exists(_li):
    for _t in __import__('json').load(open(_lj)).get('intro',[]):
        _f=_lidx.get(' '.join(_t.strip().lower().split()))
        if _f and os.path.exists(os.path.join(_VDIR,_f)): _lsay[_t]=_f
    LEO_CLIPS.pop('intro',None)
LEO_SAY={' '.join(k.strip().lower().split()):v for k,v in _lsay.items()}
_LEO_JS=("const LEO_CLIPS="+__import__('json').dumps(LEO_CLIPS)+";const LEO_SAY="+__import__('json').dumps(LEO_SAY,ensure_ascii=False)+";let _leoLast='';window._leoTalking=false;\n"
 "function _leoPlay(f){const a=_vGet(f);if(_vAud&&_vAud!==a)_vAud.pause();_vAud=a;a.currentTime=0;window._voiceBusy=true;window._leoTalking=true;"
 "const off=()=>{if(_vAud===a)window._leoTalking=false;a.removeEventListener('ended',off);a.removeEventListener('pause',off);};"
 "a.addEventListener('ended',off);a.addEventListener('pause',off);const p=a.play();if(p&&p.catch)p.catch(()=>{window._voiceBusy=false;window._leoTalking=false;});}\n"
 # Leo speaks now and then, never over a lesson word; a lesson word cuts Leo short instead
 "function leoSay(g,prob,delay){try{if(typeof soundOn!=='undefined'&&!soundOn)return;const l=LEO_CLIPS[g];"
 "if(!l||!l.length||Math.random()>prob||window._voiceBusy)return;let f=l[Math.floor(Math.random()*l.length)];"
 "if(f===_leoLast&&l.length>1)f=l[(l.indexOf(f)+1)%l.length];_leoLast=f;"
 "setTimeout(()=>{if(window._voiceBusy)return;_leoPlay(f);},delay||450);}catch(e){}}\n"
 # Leo reads the grey intro text on the first page of a lesson (not the instructions on later steps)
 "function _leoKey(t){return String(t||'').replace(/\\(\\s*\\d+\\s*\\/\\s*\\d+\\s*\\)\\s*$/,'').trim()"
 ".replace(/^(Question|Pytanie|Word|Słowo)\\s*\\d+\\s*\\/\\s*\\d+\\s*[.\u2014\u2013-]?\\s*/,'').trim().toLowerCase().split(/\\s+/).join(' ');}\n"
 "function leoRead(){try{if(typeof soundOn!=='undefined'&&!soundOn)return;if(typeof zones==='undefined'||!zones[current]||zones[current].type!=='welcome'){if(window._leoTalking&&_vAud)_vAud.pause();return;}const e=document.querySelector('#lessonView .sub');if(!e)return;"
 "const f=LEO_SAY[_leoKey(e.textContent)];if(!f)return;window._leoTalking=true;"
 "setTimeout(()=>_leoPlay(f),250);}catch(e){}}\n")
engine=engine.replace("function _ttsSpeak(t){",_LEO_JS+"function _ttsSpeak(t){",1)
# Leo talks only at the start (first-page intro) and at the end of a lesson
for _o,_n in [("function sfxBigWin(){","function sfxBigWin(){\n  leoSay('win',1,900);"),
              # the Listen step waits until Leo has read the instruction, then plays the sentence
              ("setTimeout(()=>{if($('lcBtn'))lcSay();},350)","setTimeout(function _t(){if(window._leoTalking)return setTimeout(_t,150);if($('lcBtn'))lcSay();},350)"),
              # a new lesson step: Leo reads its grey intro / instruction text
              ("setPanel(renderZone(i));if(changed){","setPanel(renderZone(i));if(changed){leoRead();")]:
    assert engine.count(_o)==1,_o; engine=engine.replace(_o,_n)
import shutil as _sh
_sv=os.path.join(os.path.dirname(OUT),'voice'); _sh.rmtree(_sv,ignore_errors=True)
if VOICE_CLIPS:
    os.makedirs(_sv); [_sh.copy(os.path.join(_VDIR,v),_sv) for v in set(VOICE_CLIPS.values())|{f for l in LEO_CLIPS.values() for f in l}|set(LEO_SAY.values())]
print('voice clips:',len(VOICE_CLIPS),'leo:',sum(map(len,LEO_CLIPS.values())))
open(OUT,'w').write(head+body+engine+boot)
print('ok',len(head+body+engine+boot))
