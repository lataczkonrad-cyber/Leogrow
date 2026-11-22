/* ---------- Leo grows up (2026-11-22): a short celebration when a finished level brings the next lemur ----------
   Shown once per level change, on the lesson finish screen, when the last lesson of a level is done and the next level
   has a different Leo picture (Baby → Kid → Teen → Adult → Master). Tap to skip; Leo does not speak here (voice rule). */
const LG_FULL=k=>(typeof LEO_FULL!=='undefined'&&(LEO_FULL[k]||(k==='teen'&&LEO_FULL.kid)))||(LEO_AGES[k]&&(LEO_AGES[k].c||LEO_AGES[k].w));
function lgNextLevel(tid,lv){const t=TRACKS.find(x=>x.id===tid);if(!t)return null;const i=t.levels.indexOf(lv);
  return t.levels.slice(i+1).find(x=>levelUnitsLessons(tid,x).length)||null;}
/* the Leo that comes with the next level, if it is a new picture */
function lgGrowth(tid,lv){const nx=lgNextLevel(tid,lv);if(!nx)return null;const a=leoStage(tid,lv),b=leoStage(tid,nx);
  return a&&b&&a.rig.w!==b.rig.w?{track:tid,from:lv,to:nx,a,b}:null;}
let _LG_RUN=null,_LG_MOVE=null;
(function(){
  const _ol=openLesson;openLesson=function(id){const r=_ol.apply(this,arguments);const l=activeLesson;
    _LG_RUN=l&&!l.review&&!l.bonus_lesson&&l.unit?{id:l.id,track:l.unit.track,level:l.unit.level,was:levelUnitsLessons(l.unit.track,l.unit.level).every(x=>lessonDone(x.id))}:null;return r;};
  const _fin=rLessonFinish;rLessonFinish=function(){const h=_fin(),l=activeLesson,R=_LG_RUN;
    if(l&&R&&R.id===l.id&&!R.was&&levelUnitsLessons(R.track,R.level).every(x=>lessonDone(x.id))){R.was=true;
      const g=lgGrowth(R.track,R.level),key=g&&g.track+':'+g.to;C.lg=C.lg||{};
      if(g&&!C.lg[key]){C.lg[key]=Date.now();saveProgress();_LG_MOVE={track:g.track,level:g.to};setTimeout(()=>leoGrowUp(g),1500);}}
    return h;};
  /* back on the course after growing up: you are now on the next level, with the new Leo */
  const _sc=showCourse;showCourse=function(){const r=_sc.apply(this,arguments);
    if(_LG_MOVE){const m=_LG_MOVE;_LG_MOVE=null;setProfile(m.track,m.level,true);renderCourse();}return r;};
  const _mp=mergeProgress;mergeProgress=function(a,b){const o=_mp(a,b);o.C.lg=Object.assign({},a.C&&a.C.lg,b.C&&b.C.lg);return o;};
})();
function lgChime(){if(typeof soundOn!=='undefined'&&!soundOn)return;if(typeof _tone!=='function')return;
  [[523.25,0],[659.25,.12],[783.99,.24],[1046.5,.36],[1318.5,.5]].forEach(([f,d])=>{try{_tone(f,d,.5,'triangle',.05);}catch(e){}});}
function leoGrowUp(g){
  closeLeoGrowUp(true);
  const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sp=[...Array(18)].map((_,i)=>{const a=i*20+(i%2?8:0),d=34+(i%3)*9;return `<i class="lg-sp" style="--a:${a}deg;--d:${d}vmin;--dl:${(i%4)*.05}s">${i%3?'✦':'✧'}</i>`;}).join('');
  const el=document.createElement('div');el.id='leoGrow';el.className='lg-over'+(reduce?' lg-end':'');el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
  el.setAttribute('aria-label',T2('Leo grew up!','Leo dorósł!'));
  el.innerHTML=`<div class="lg-rays"></div><div class="lg-glow"></div>
   <button class="lg-skip" onclick="event.stopPropagation();closeLeoGrowUp()">${T2('Skip','Pomiń')} ✕</button>
   <div class="lg-stage"><img class="lg-old" src="${LG_FULL(g.a.key)}" alt="${g.a.name}" draggable="false"><img class="lg-new" src="${LG_FULL(g.b.key)}" alt="${g.b.name}" draggable="false"><div class="lg-ring"></div><div class="lg-sparks">${sp}</div></div>
   <div class="lg-text"><small class="lg-tag">${T2('LEVEL '+g.from+' COMPLETE','POZIOM '+g.from+' UKOŃCZONY')}</small>
     <h2>${T2('Leo grew up!','Leo dorósł!')}</h2><b class="lg-name">${g.b.name}</b>
     <p class="lg-from"><span>${g.a.name}</span> → <span>${g.b.name}</span> · ${T2('next level','następny poziom')} <b>${g.to}</b></p>
     <button class="btn btn-gold lg-go" onclick="event.stopPropagation();closeLeoGrowUp()">${T2('Meet ','Poznaj: ')}${g.b.name} →</button></div>`;
  /* first tap jumps to the end, the next one closes */
  el.onclick=()=>{if(!el.classList.contains('lg-end')){el.classList.add('lg-end');}else closeLeoGrowUp();};
  document.body.appendChild(el);document.body.classList.add('lg-open');
  if(!reduce){setTimeout(()=>{if(el.isConnected&&!el.classList.contains('lg-end'))lgChime();},1550);setTimeout(()=>el.classList.add('lg-end'),3400);}
  else lgChime();
  setTimeout(()=>{const b=el.querySelector('.lg-go');b&&b.focus({preventScroll:true});},reduce?50:2600);
}
function closeLeoGrowUp(now){const el=document.getElementById('leoGrow');if(!el)return;document.body.classList.remove('lg-open');
  if(now){el.remove();return;}el.classList.add('lg-bye');setTimeout(()=>el.remove(),260);}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('leoGrow'))closeLeoGrowUp();});
/* tester: replay every grow-up moment in turn */
const LG_DEMO=[['kids','A0'],['kids','A1'],['adults','A2'],['adults','B2']];let _lgDemo=0;
function leoGrowDemo(){const [t,l]=LG_DEMO[_lgDemo++%LG_DEMO.length];const g=lgGrowth(t,l);if(g)leoGrowUp(g);}
(function(){const _tb=testerBar;testerBar=function(){const h=_tb();if(!h||!TESTER)return h;
  return h.replace(/<\/div>$/,`<button class="btn secondary lesson-btn lg-test" onclick="leoGrowDemo()">🌱 ${T2('Leo grows up','Leo rośnie')}</button></div>`);};})();
