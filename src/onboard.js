/* ---------- First run: a short welcome for new learners ----------
   Steps: hello (language) → who is learning → where to start (A0, a level, or the placement test) → daily goal → ready.
   Shown only to a learner with no course yet and no finished lessons. Progress through the steps is kept in
   localStorage 'leogrowOnboard' = {step, track, done}. "Skip" leaves it for good and shows the full home page. */
const OB_KEY=TESTER_SITE?'leogrowTesterOnboard':'leogrowOnboard';
let OB={step:'hello',track:null,done:false,started:false};
try{Object.assign(OB,JSON.parse(localStorage.getItem(OB_KEY)||'{}'));}catch(e){}
function obSave(){try{localStorage.setItem(OB_KEY,JSON.stringify(OB));}catch(e){}}
function obActive(){
  if(OB.done) return false;
  // an existing learner (a course or finished lessons, maybe from the cloud) never sees the welcome
  if(!OB.started&&(PROF()||Object.values(C.lessons||{}).some(r=>r&&r.done))){OB.done=true;obSave();return false;}
  return !VIEW.track&&!(typeof PT!=='undefined'&&PT);
}
function obGo(step){OB.step=step;OB.started=true;obSave();if(typeof sfxWhoosh==='function')sfxWhoosh();renderCourse();window.scrollTo({top:0,behavior:'smooth'});}
function obWho(t){OB.track=t;obGo('start');}
function obLevel(lv){setProfile(OB.track,lv,true);obGo('goal');}
function obPlacement(){
  OB.step='pt';OB.started=true;obSave();startPlacement();
  if(PT){PT.who=OB.track;renderPlacement();}
}
function obGoal(m){setGoal(m);obGo('ready');}
function obFinish(open){
  OB.done=true;obSave();
  const p=PROF(), nx=p&&(nextInLevel(p.track,p.level)||nextLessonToDo(p.track));
  VIEW={track:null,level:null};
  if(open&&nx){renderCourse();openLesson(nx.id);} else renderCourse();
}
function obSkip(){OB.done=true;obSave();VIEW={track:null,level:null};renderCourse();}
/* tester: replay the welcome from the start, even with a course already picked (tester progress is separate) */
function obReplay(){if(typeof closeAuth==='function')closeAuth();if(activeLesson)showCourse();if(typeof PT!=='undefined')PT=null;
  OB={step:'hello',track:null,done:false,started:true,preview:true};obSave();VIEW={track:null,level:null};renderCourse();window.scrollTo({top:0,behavior:'smooth'});}
function obReset(){OB={step:'hello',track:null,done:false,started:false};obSave();}

const OB_LV_PL={Starter:'Start od zera',Beginner:'Początkujący',Elementary:'Podstawowy',Intermediate:'Średni','Upper-intermediate':'Średnio zaawansowany',Advanced:'Zaawansowany'};
const obLvName=L=>LANG==='pl'&&OB_LV_PL[L.name]||L.name;
function obDots(){
  const steps=['who','start','goal','ready'], i=steps.indexOf(OB.step==='pt'?'start':OB.step);
  return `<div class="ob-dots">${steps.map((s,k)=>`<i class="${k<i?'done':k===i?'on':''}"></i>`).join('')}</div>`;
}
function obTop(back){
  return `<div class="ob-top">${back?`<button class="ob-link" onclick="obGo('${back}')">← ${T2('Back','Wstecz')}</button>`:'<span></span>'}${OB.step==='hello'?'':obDots()}<button class="ob-link" onclick="obSkip()">${T2('Skip','Pomiń')}</button></div>`;
}
function obHtml(){
  const t=TRACKS.find(x=>x.id===OB.track), adult=OB.track==='adults';
  const leo=(msgs,size)=>`<div class="ob-leo">${renderLemur('big',msgs,size||(adult?96:120),adult?'idle':'cheer')}</div>`;
  let h='';
  if(OB.step==='hello'){
    h=obTop()+leo([T2("Hi! I'm Leo! 👋","Cześć! Jestem Leo! 👋"),T2("Let's set you up!","Zaczynamy!")],130)+
    `<span class="zone-tag">${T2('WELCOME','WITAJ')}</span><h2 class="title">${T2('Welcome to Leogrow!','Witaj w Leogrow!')}</h2>
    <p class="sub">${T2('Three quick questions and you are ready for your first lesson.','Trzy krótkie pytania i możesz zacząć pierwszą lekcję.')}</p>
    <p class="ob-q">${T2('Menus and instructions in:','Menu i polecenia po:')}</p>
    <div class="ob-langs"><button class="ob-pill ${LANG==='pl'?'on':''}" onclick="setLang('pl')">🇵🇱 Polski</button><button class="ob-pill ${LANG==='en'?'on':''}" onclick="setLang('en')">🇬🇧 English</button></div>
    <button class="btn btn-gold ob-main" onclick="obGo('who')">${T2("Let's start →","Zaczynamy →")}</button>`;
  } else if(OB.step==='who'){
    h=obTop('hello')+`<span class="zone-tag">${T2('STEP 1 OF 3','KROK 1 Z 3')}</span><h2 class="title">${T2('Who is learning?','Kto się uczy?')}</h2>
    <p class="sub">${T2('Each section has its own lessons and style.','Każda część ma własne lekcje i styl.')}</p><div class="ob-cards">`+
    TRACKS.map(x=>`<button class="ob-card ${x.id}" onclick="obWho('${x.id}')"><span class="ob-ico">${x.emoji}</span>
      <b>${x.id==='kids'?T2('A kid','Dziecko'):T2('A teen or adult','Nastolatek lub dorosły')}</b>
      <small>${x.id==='kids'?T2('Ages 3–12 · games, music and coins · A0–A2','3–12 lat · gry, muzyka i monety · A0–A2'):T2('Ages 13+ · real-life topics, calm style · A0–C1','13+ lat · tematy z życia, spokojny styl · A0–C1')}</small></button>`).join('')+`</div>`;
  } else if(OB.step==='start'&&t){
    const lvls=t.levels.filter(lv=>levelUnitsLessons(t.id,lv).length);
    h=obTop('who')+`<span class="zone-tag">${T2('STEP 2 OF 3','KROK 2 Z 3')}</span><h2 class="title">${T2('Where do you want to start?','Od czego zaczynamy?')}</h2>
    <div class="ob-list">
      <button class="ob-row" onclick="obLevel('${lvls[0]}')"><span>🌱</span><div><b>${T2("I'm new to English","Dopiero zaczynam")}</b><small>${T2('Start from the very first words','Zacznij od pierwszych słówek')} · ${lvls[0]}</small></div><i>›</i></button>
      <button class="ob-row gold" onclick="obPlacement()"><span>🧭</span><div><b>${T2('Find my level','Sprawdź mój poziom')}</b><small>${T2('A 3-minute test · skip what you don\'t know','Test na 3 minuty · pomiń, czego nie wiesz')}</small></div><i>›</i></button>
    </div>
    <p class="ob-q">${T2('Or pick your level:','Albo wybierz swój poziom:')}</p>
    <div class="ob-levels">${lvls.map(lv=>{const L=LEVELS.find(x=>x.id===lv);return `<button class="ob-lv" onclick="obLevel('${lv}')"><span class="level-code">${lv}</span><b>${obLvName(L)}</b></button>`;}).join('')}</div>`;
  } else if(OB.step==='goal'){
    const g=goalMin();
    h=obTop(PROF()?'start':'who')+`<span class="zone-tag">${T2('STEP 3 OF 3','KROK 3 Z 3')}</span><h2 class="title">${T2('How much a day?','Ile dziennie?')}</h2>
    <p class="sub">${T2('Pick a goal you can keep every day. You can change it any time in ⚙️ Settings.','Wybierz cel, który dasz radę utrzymać każdego dnia. Zmienisz go w każdej chwili w ⚙️ Ustawieniach.')}</p>
    <div class="goal-opts ob-goals">${GOAL_OPTS.map(([m,e,en,pl])=>`<button class="goal-opt ${m===g&&HAB().goalAt?'on':''}" onclick="obGoal(${m})"><span>${e}</span><b>${m} min</b><small>${T2(en,pl)}</small></button>`).join('')}</div>`;
  } else if(OB.step==='ready'&&PROF()){
    const p=PROF(), tt=TRACKS.find(x=>x.id===p.track), L=LEVELS.find(x=>x.id===p.level), nx=nextInLevel(p.track,p.level)||nextLessonToDo(p.track);
    const acc=typeof cloudOn==='function'&&cloudOn()&&!USER;
    h=obTop('goal')+leo(p.track==='adults'?[T2('All set.','Gotowe.'),T2('Enjoy your first lesson.','Miłej pierwszej lekcji.')]:[T2('All set! 🎉','Gotowe! 🎉'),T2("Let's learn together!","Uczymy się razem!")])+
    `<h2 class="title">${T2("You're ready!","Wszystko gotowe!")}</h2>
    <div class="ob-sum"><div><small>${T2('Course','Kurs')}</small><b>${tt.emoji} ${tt.id==='kids'?T2('Kids','Dzieci'):T2('Teens & Adults','Młodzież i dorośli')}</b></div>
      <div><small>${T2('Level','Poziom')}</small><b>${p.level} · ${obLvName(L)}</b></div><div><small>${T2('Daily goal','Dzienny cel')}</small><b>🎯 ${goalMin()} min</b></div></div>
    ${nx?`<button class="btn btn-gold ob-main" onclick="obFinish(true)">▶ ${T2('Start my first lesson','Zacznij pierwszą lekcję')}</button>`:''}
    <button class="ob-link ob-later" onclick="obFinish(false)">${T2('Look around first','Najpierw się rozejrzę')}</button>
    ${acc?`<p class="ob-acc">💾 ${T2('Want your progress on phone and PC?','Chcesz mieć postęp na telefonie i komputerze?')} <a href="#" onclick="openAuth('up');return false;">${T2('Create a free account','Załóż darmowe konto')}</a></p>`:''}`;
  } else { if(!TRACKS.some(x=>x.id===OB.track)) OB.track=null; OB.step=OB.track?'start':'who'; obSave(); return obHtml(); }
  return testerBar()+`<div class="ob-wrap"><div class="panel ob-panel ob-${OB.step}">${h}</div></div>`;
}

/* the course page shows the welcome until it is finished or skipped */
(function(){
  const _rc=renderCourse;
  renderCourse=function(){
    /* the placement test started from the welcome comes back to it: "Start A1 →" picks the level, then the goal step follows */
    if(!OB.done&&OB.step==='pt'){ if(PROF()) {OB.step='goal';obSave();} else if(!(typeof PT!=='undefined'&&PT)) {OB.step='start';obSave();} }
    if(obActive()){
      document.body.classList.toggle('adult',OB.track==='adults');
      document.body.classList.add('onboarding');
      $('courseView').innerHTML=obHtml();
      if(LANG==='pl'&&typeof applyLang==='function') applyLang();
      return;
    }
    document.body.classList.remove('onboarding');
    return _rc.apply(this,arguments);
  };
  /* tester: "See the new-learner home" also shows the welcome again */
  const _tj=testerJumpHtml;
  testerJumpHtml=function(){return _tj().replace('C.profile=null;saveProgress(true);nav()','C.profile=null;saveProgress(true);obReset();nav()')
    .replace(/<\/div>$/,`<p style="margin-top:8px;"><button class="btn btn-gold lesson-btn" onclick="obReplay()">👋 ${T2('Show the welcome again','Pokaż powitanie jeszcze raz')}</button></p></div>`);};
  /* tester bar on every page: a button that replays the welcome */
  const _tb=testerBar;
  testerBar=function(){const h=_tb(),btn=`<button class="btn secondary lesson-btn ob-replay" onclick="obReplay()">👋 ${T2('Welcome screen','Ekran powitalny')}</button>`;
    if(h) return h.replace(/<\/div>$/,btn+'</div>');
    return TESTER?`<div class="tester-bar on"><span>🧪 <b>${T2('Tester','Tester')}</b></span>${btn}</div>`:'';};
  /* settings: the same, for testers */
  const _os=openSettings;
  openSettings=function(){_os.apply(this,arguments);if(!(TESTER_ALLOWED||TESTER))return;const l=document.querySelector('#authModal .set-list');if(!l)return;
    const r=document.createElement('div');r.className='set-row';r.innerHTML=`<b>👋 ${T2('Welcome screen','Ekran powitalny')}</b><div class="set-ctl"><button class="seg" onclick="obReplay()">${T2('Show again','Pokaż ponownie')}</button></div>`;
    const d=l.querySelector('.set-row.danger');l.insertBefore(r,d||null);};
})();
