import os
HERE=os.path.dirname(os.path.abspath(__file__))
SITE=os.environ.get('SITE_DIR',os.path.join(HERE,'..','site'))
import re
SRC=os.path.join(HERE,'lesson-technology.html')
OUT=os.path.join(SITE,'lingrow-academy.html')
src=open(SRC).read()
css_course=open(os.path.join(HERE,'course.css')).read()+"\nbody:not(.in-lesson) .lemur-corner{display:none;}\n"
course_js=open(os.path.join(HERE,'course.js')).read()

head,rest=src.split('<body>',1)
head=head.replace('<title>Lingrow Academy — Unit 3: Technology for All</title>','<title>Lingrow Academy — English A0–C1</title>')
head=head.replace('</style>',css_course+'</style>',1)

logo=re.search(r'<div class="brand-mark">\s*<img src="(data:image[^"]+)"',src).group(1)
body=f'''<body>
<div class="sparkle-field" id="sparkleField"></div>
<div class="app">
  <div class="topbar">
    <div class="brand">
      <div class="brand-mark">
        <img src="{logo}" alt="Lingrow Academy">
      </div>
      <div class="brand-text">LINGROW ACADEMY</div>
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
for _n in ['LEO_IDLE','LEO_CHEER']:
    _v=_re.search(r'const %s = "([^"]+)"'%_n,_lc).group(1)
    engine=_re.sub(r'const %s = "[^"]+"'%_n,lambda m:'const %s = "%s"'%(_n,_v),engine,count=1)
open(OUT,'w').write(head+body+engine+boot)
print('ok',len(head+body+engine+boot))
