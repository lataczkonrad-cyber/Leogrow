/* =====================================================================
   Chests + weekly challenges
   C.ch = {log:{uid:{d,t,s,f,r,x}}, got:{chestId:{k:tier,t}}, op:{chestId:{r:[rewards],t}}}
     log  = finished lessons (day, time, stars, first time, review, unit test), kept ~10 weeks
     got  = chests earned, op = chests opened (with what was inside). All three merge as a union.
   Chests: wood = every 3 finished lessons · silver = first pass of a unit test, or one weekly challenge
           gold = all three weekly challenges done.
   ===================================================================== */
const CH_TIERS={
  wood:{en:'Wooden chest',pl:'Drewniana skrzynia',a:'#c98a4b',b:'#8a5426',band:'#e3b341',lock:'#ecb83a'},
  silver:{en:'Silver chest',pl:'Srebrna skrzynia',a:'#dfe6f0',b:'#8f9cb3',band:'#5d6b85',lock:'#9fd8ff'},
  gold:{en:'Golden chest',pl:'Złota skrzynia',a:'#ffd866',b:'#c88a12',band:'#7a4d00',lock:'#ff6b8b'}
};
const CH_EVERY=3;
/* small rewards that live in the wallet like shop purchases (hidden from the shop tabs) */
[{id:'c_hint2',give:['hint',2]},{id:'c_hint3',give:['hint',3]},{id:'c_hint5',give:['hint',5]},{id:'c_spin2',give:['spin',2]},{id:'c_spin3',give:['spin',3]},{id:'c_freeze',give:['freeze',1]}]
  .forEach(i=>{i.cat='chest';i.price=0;i.icon='🎁';i.en=i.pl='';SHOP_ITEMS.push(i);SHOP_BY[i.id]=i;});

function CH(){C.ch=C.ch||{};const c=C.ch;c.log=c.log||{};c.got=c.got||{};c.op=c.op||{};return c;}
(function(){
  const _lp=loadProgress;loadProgress=function(){_lp();try{const d=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(d&&d.C&&d.C.ch)C.ch=d.C.ch;}catch(e){}};
  const _mp=mergeProgress;mergeProgress=function(a,b){const o=_mp(a,b),x=(a.C&&a.C.ch)||{},y=(b.C&&b.C.ch)||{};
    const log=Object.assign({},x.log,y.log),keep=Date.now()-70*864e5;Object.keys(log).forEach(k=>{if((log[k].t||0)<keep)delete log[k];});
    o.C.ch={log,got:Object.assign({},x.got,y.got),op:Object.assign({},x.op,y.op)};return o;};
})();

/* ---------- weeks (Monday → Sunday, local time) ---------- */
function weekStart(d){d=d?new Date(d):new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return localDay(d);}
function weekDays(ws){return [0,1,2,3,4,5,6].map(i=>_dayShift(ws,i));}
function weekDaysLeft(){return 7-((new Date().getDay()+6)%7);}

/* ---------- weekly challenges ---------- */
const CHALLENGES=[
 {id:'lessons',icon:'📘',n:5,en:n=>`Finish ${n} lessons`,pl:n=>`Ukończ ${n} lekcji`,m:L=>L.filter(e=>!e.r).length},
 {id:'stars',icon:'⭐',n:12,en:n=>`Collect ${n} stars`,pl:n=>`Zdobądź ${n} gwiazdek`,m:L=>L.reduce((a,e)=>a+(e.r?0:e.s||0),0)},
 {id:'perfect',icon:'🏆',n:3,en:n=>`Get 3 stars in ${n} lessons`,pl:n=>`Zdobądź 3 gwiazdki w ${n} lekcjach`,m:L=>L.filter(e=>!e.r&&e.s>=3).length},
 {id:'days',icon:'📅',n:4,en:n=>`Learn on ${n} different days`,pl:n=>`Ucz się przez ${n} różne dni`,m:(L,ds)=>ds.filter(d=>L.some(e=>e.d===d)||goalMetOn(d)).length},
 {id:'minutes',icon:'⏱️',n:40,en:n=>`Learn for ${n} minutes`,pl:n=>`Ucz się przez ${n} minut`,m:(L,ds)=>Math.floor(ds.reduce((a,d)=>a+((HAB().daily[d]||{}).s||0),0)/60)},
 {id:'goal',icon:'🎯',n:3,en:n=>`Reach your daily goal on ${n} days`,pl:n=>`Osiągnij dzienny cel przez ${n} dni`,m:(L,ds)=>ds.filter(goalMetOn).length},
 {id:'newl',icon:'🔓',n:3,en:n=>`Finish ${n} new lessons`,pl:n=>`Ukończ ${n} nowe lekcje`,m:L=>L.filter(e=>e.f).length},
];
const CH_BY=Object.fromEntries(CHALLENGES.map(c=>[c.id,c]));
function _hash(s){let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
/* the same three challenges on every device for a given week */
function weekChallenges(ws){
  ws=ws||weekStart();const pool=CHALLENGES.slice();
  const out=[];let h=_hash('leogrow'+ws);
  while(out.length<3&&pool.length){const i=h%pool.length;out.push(pool.splice(i,1)[0]);h=_hash(String(h));}
  /* never both "days" and "goal" in one week, they are too alike */
  if(out.some(c=>c.id==='days')&&out.some(c=>c.id==='goal')){const j=out.findIndex(c=>c.id==='goal');out[j]=pool.find(c=>c.id!=='days')||out[j];}
  return out;
}
function _weekLog(ws){const ds=new Set(weekDays(ws));return Object.values(CH().log).filter(e=>ds.has(e.d));}
function challengeState(ws){ws=ws||weekStart();const L=_weekLog(ws),ds=weekDays(ws);
  return weekChallenges(ws).map((c,i)=>{const v=Math.min(c.n,c.m(L,ds)||0);return {c,i,v,done:v>=c.n,id:'c:'+ws+':'+c.id};});}

/* ---------- earning chests ---------- */
function chestsUnopened(){const c=CH();return Object.keys(c.got).filter(k=>!c.op[k]).sort((a,b)=>c.got[a].t-c.got[b].t);}
function chestMeter(){const c=CH(),lastW=Math.max(0,...Object.values(c.got).filter(g=>g.k==='wood').map(g=>g.t));
  return Object.values(c.log).filter(e=>!e.r&&e.t>lastW).length;}
function _give(id,k,why){const c=CH();if(c.got[id])return false;c.got[id]={k,t:Date.now(),w:why||''};return true;}
function chestCheck(quiet){
  const c=CH(),fresh=[];
  /* wooden: every 3 finished lessons */
  const lastW=Math.max(0,...Object.values(c.got).filter(g=>g.k==='wood').map(g=>g.t));
  const since=Object.values(c.log).filter(e=>!e.r&&e.t>lastW).sort((a,b)=>a.t-b.t);
  if(since.length>=CH_EVERY){const id='w:'+since[CH_EVERY-1].t;if(_give(id,'wood','lessons')){c.got[id].t=since[CH_EVERY-1].t+1;fresh.push(id);}}
  /* weekly challenges */
  const ws=weekStart(),st=challengeState(ws);
  st.forEach(s=>{if(s.done&&_give(s.id,'silver','ch:'+s.c.id))fresh.push(s.id);});
  if(st.length&&st.every(s=>s.done)&&_give('g:'+ws,'gold','week'))fresh.push('g:'+ws);
  if(fresh.length){saveProgress();if(!quiet)setTimeout(()=>_comboToastText(fresh.length>1?T2(`🎁 ${fresh.length} new chests!`,`🎁 ${fresh.length} nowe skrzynie!`):T2(`🎁 You earned a ${chestName(fresh[0]).toLowerCase()}!`,`🎁 Masz nową skrzynię: ${chestName(fresh[0]).toLowerCase()}!`)),1600);}
  return fresh;
}
const chestTier=id=>(CH().got[id]||{}).k||'wood';
const chestName=id=>{const t=CH_TIERS[chestTier(id)];return T2(t.en,t.pl);};
function chestWhy(id){const g=CH().got[id]||{},w=g.w||'';
  if(w==='lessons')return T2(`For ${CH_EVERY} finished lessons`,`Za ${CH_EVERY} ukończone lekcje`);
  if(w==='test')return T2('For passing a unit test','Za zdany test działu');
  if(w==='week')return T2('All weekly challenges done!','Wszystkie wyzwania tygodnia zrobione!');
  if(w.startsWith('ch:')){const c=CH_BY[w.slice(3)];return c?T2('Weekly challenge: ','Wyzwanie tygodnia: ')+(LANG==='pl'?c.pl(c.n):c.en(c.n)):'';}
  if(w==='tester')return '🧪 Tester';return '';}

/* log every finished lesson, then pay out chests */
let _CH_RUN=null;
(function(){
  const _ol=openLesson;openLesson=function(id){const r=_ol.apply(this,arguments);_CH_RUN=activeLesson?{id:activeLesson.id,first:!activeLesson.review&&!lessonDone(activeLesson.id),logged:false}:null;return r;};
  const _fin=rLessonFinish;rLessonFinish=function(){
    const l=activeLesson,stars=lessonStarsNow();let h=_fin();
    if(!l)return h;
    let fresh=[];
    if(_CH_RUN&&_CH_RUN.id===l.id&&!_CH_RUN.logged){_CH_RUN.logged=true;
      CH().log[_uid()]={d:localDay(),t:Date.now(),s:stars,f:_CH_RUN.first?1:0,r:l.review?1:0,x:l.test?1:0};
      if(l.test&&stars>0&&_give('s:'+l.id,'silver','test'))fresh.push('s:'+l.id);
      fresh=fresh.concat(chestCheck(true));saveProgress();_CH_RUN.fresh=fresh;}
    fresh=(_CH_RUN&&_CH_RUN.fresh)||[];
    return h.replace('<div class="nav-row" style="justify-content:center',chestFinishHtml(fresh)+'<div class="nav-row" style="justify-content:center');};
})();
/* goal or minutes challenges can finish outside the finish screen */
setInterval(()=>{try{chestCheck();}catch(e){}},60000);

function chestFinishHtml(fresh){
  const m=chestMeter(),left=chestsUnopened().length;
  if(fresh.length) return `<div class="ch-earn">${chestSvg(chestTier(fresh[0]),64,'ch-bob')}<div><b>${fresh.length>1?T2(`${fresh.length} new chests!`,`${fresh.length} nowe skrzynie!`):T2(`New ${chestName(fresh[0]).toLowerCase()}!`,`Nowa skrzynia: ${chestName(fresh[0]).toLowerCase()}!`)}</b><small>${chestWhy(fresh[0])}</small></div><button class="btn btn-gold" onclick="openChest('${fresh[0]}')">${T2('Open it','Otwórz')} →</button></div>`;
  return `<div class="ch-earn quiet">${chestSvg('wood',46)}<div><b>${T2('Next chest','Następna skrzynia')}: ${m}/${CH_EVERY}</b><div class="ch-dots">${[...Array(CH_EVERY)].map((_,i)=>`<i class="${i<m?'on':''}"></i>`).join('')}</div></div>${left?`<button class="btn secondary" onclick="showCourse();nav('chests')">🎁 ${left}</button>`:''}</div>`;
}

/* ---------- what's inside ---------- */
const _rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
function _pick(list){const t=list.reduce((a,x)=>a+x[0],0);let r=Math.random()*t;for(const x of list){if((r-=x[0])<=0)return x[1];}return list[list.length-1][1];}
function _rollChest(k){
  const out=[{t:'coins',n:k==='gold'?_rnd(80,150):k==='silver'?_rnd(30,60):_rnd(10,25)}];
  const nrg=!energyFree()&&energyNow()<EN_MAX;
  if(k==='wood'){const x=_pick([[45,null],[20,'c_hint2'],[15,'c_spin2'],[12,nrg?'energy5':null],[8,'c_freeze']]);if(x)out.push(x==='energy5'?{t:'energy',n:5}:{t:'item',id:x});}
  if(k==='silver'){const x=_pick([[35,'c_hint3'],[25,'c_spin3'],[20,'c_freeze'],[20,nrg?'energy':'c_hint3']]);out.push(x==='energy'?{t:'energy',n:EN_MAX}:{t:'item',id:x});}
  if(k==='gold'){const wear=SHOP_ITEMS.filter(i=>['leo','frame','badge'].includes(i.cat)&&!owned(i.id)&&i.price<=250);
    if(wear.length&&Math.random()<0.7)out.push({t:'wear',id:wear[_rnd(0,wear.length-1)].id});else out.push({t:'item',id:'c_freeze'});
    out.push({t:'item',id:'c_hint5'});}
  return out;
}
function _grant(id,rs){const w=W();rs.forEach((r,i)=>{
  if(r.t==='coins')shopEarn(r.n,'chest:'+id);
  else if(r.t==='energy')energySet(energyNow()+r.n);
  else if(r.t==='item'||r.t==='wear')w.p['ch'+i+':'+id]=[r.id,0];});}
function rewardLabel(r){
  if(r.t==='coins')return {i:'🪙',b:'+'+r.n,s:T2('coins','monet')};
  if(r.t==='energy')return {i:'⚡',b:r.n>=EN_MAX?T2('Full','Pełna'):'+'+r.n,s:T2('energy','energii')};
  const it=SHOP_BY[r.id];if(!it)return {i:'🎁',b:'',s:''};
  if(it.cat==='chest'){const [k,n]=it.give;const m={hint:['💡',T2('hints','podpowiedzi')],spin:['🎡',T2('wheel spins','obroty koła')],freeze:['🧊',T2('streak freeze','zamrożenie serii')]}[k];return {i:m[0],b:'+'+n,s:m[1]};}
  return {i:it.icon,b:T2(it.en,it.pl),s:T2({leo:"for Leo",frame:'profile frame',badge:'profile badge'}[it.cat],{leo:'dla Leo',frame:'ramka profilu',badge:'odznaka profilu'}[it.cat]),wear:it.id};
}

/* ---------- opening ---------- */
function openChest(id){
  const c=CH();if(!c.got[id])return;
  let m=document.getElementById('chestOpen');if(!m){m=document.createElement('div');m.id='chestOpen';m.className='ch-overlay';document.body.appendChild(m);}
  const k=chestTier(id),done=c.op[id];
  m.innerHTML=`<div class="ch-modal ch-${k}"><div class="ch-rays"></div>
    <div class="ch-stage" id="chStage" onclick="crackChest('${id}')">${chestSvg(k,170,done?'open':'ch-wiggle')}</div>
    <h3>${chestName(id)}</h3><p class="rw-small">${chestWhy(id)}</p>
    <div class="ch-loot" id="chLoot"></div>
    <div class="rw-actions" id="chActs">${done?'':`<button class="btn btn-gold" onclick="crackChest('${id}')">🔓 ${T2('Open','Otwórz')}</button>`}</div></div>`;
  m.classList.add('show');m.onclick=e=>{if(e.target===m&&CH().op[id])closeChest();};
  if(done)_showLoot(id,true);
  if(typeof sfxPop==='function')sfxPop();
}
function crackChest(id){
  const c=CH();if(c.op[id]){return;}
  const rs=_rollChest(chestTier(id));c.op[id]={r:rs,t:Date.now()};_grant(id,rs);saveProgress();renderWallet();
  const st=document.getElementById('chStage');if(st){st.onclick=null;st.innerHTML=chestSvg(chestTier(id),170,'ch-shake');}
  const a=document.getElementById('chActs');if(a)a.innerHTML='';
  setTimeout(()=>{if(st)st.innerHTML=chestSvg(chestTier(id),170,'open pop');if(typeof sfxBigWin==='function')sfxBigWin();if(typeof burstConfetti==='function')burstConfetti();_showLoot(id);},650);
}
function _showLoot(id,instant){
  const op=CH().op[id];if(!op)return;const L=document.getElementById('chLoot');if(!L)return;
  L.innerHTML=op.r.map((r,i)=>{const x=rewardLabel(r);return `<div class="ch-item ${instant?'':'in'}" style="animation-delay:${instant?0:.15+i*.22}s"><span>${x.i}</span><b>${x.b}</b><small>${x.s}</small></div>`;}).join('');
  const wear=op.r.map(rewardLabel).find(x=>x.wear),more=chestsUnopened()[0];
  const a=document.getElementById('chActs');if(a)a.innerHTML=(wear&&!_isWorn(wear.wear)?`<button class="btn secondary" onclick="wearItem('${wear.wear}');closeChest()">✨ ${T2('Put it on','Załóż')}</button>`:'')
    +(more?`<button class="btn btn-gold" onclick="openChest('${more}')">🎁 ${T2('Next chest','Następna skrzynia')} (${chestsUnopened().length})</button>`:`<button class="btn btn-gold" onclick="closeChest()">${T2('Nice!','Super!')}</button>`);
}
const _isWorn=id=>Object.values(W().eq).includes(id);
function closeChest(){const m=document.getElementById('chestOpen');if(m)m.classList.remove('show');if(!document.body.classList.contains('in-lesson'))renderCourse();}

/* ---------- the chest picture (drawn here so it is Leogrow's own) ---------- */
function chestSvg(k,size,cls){
  const t=CH_TIERS[k]||CH_TIERS.wood,g='chg'+k;
  const gems=k==='gold'?`<circle cx="30" cy="70" r="4" fill="#5fd3ff"/><circle cx="90" cy="70" r="4" fill="#5fd3ff"/>`:'';
  return `<svg class="ch-svg ${cls||''}" width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
  <defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}"/></linearGradient>
  <radialGradient id="${g}l"><stop offset="0" stop-color="#fff6c8"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="60" cy="106" rx="44" ry="7" fill="#000" opacity=".22"/>
  <g class="ch-glow"><circle cx="60" cy="52" r="46" fill="url(#${g}l)"/></g>
  <rect x="14" y="54" width="92" height="48" rx="10" fill="url(#${g})" stroke="${t.band}" stroke-width="3"/>
  <rect x="14" y="54" width="92" height="9" fill="#000" opacity=".12"/>
  <rect x="26" y="54" width="9" height="48" fill="${t.band}" opacity=".85"/><rect x="85" y="54" width="9" height="48" fill="${t.band}" opacity=".85"/>${gems}
  <g class="ch-lid"><path d="M14 56 V40 C14 22 32 14 60 14 C88 14 106 22 106 40 V56 Z" fill="url(#${g})" stroke="${t.band}" stroke-width="3"/>
    <path d="M26 56 V36 C26 26 30 21 35 19 V56Z M94 56 V36 C94 26 90 21 85 19 V56Z" fill="${t.band}" opacity=".85"/>
    <path d="M24 30 C34 22 48 20 60 20" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".45"/>
    <rect x="50" y="46" width="20" height="20" rx="5" fill="${t.lock}" stroke="${t.band}" stroke-width="2.5"/>
    <path d="M60 52 c-2.6 0 -3.6 2.4 -2.2 4 l-1 5 h6.4 l-1 -5 c1.4 -1.6 .4 -4 -2.2 -4z" fill="${t.band}"/></g>
</svg>`;
}

/* ---------- the Chests page ---------- */
function chestsPageHtml(){
  chestCheck(true);
  const un=chestsUnopened(),m=chestMeter(),ws=weekStart(),st=challengeState(ws),nd=st.filter(s=>s.done).length,dl=weekDaysLeft();
  const c=CH(),hist=Object.keys(c.op).sort((a,b)=>c.op[b].t-c.op[a].t).slice(0,6);
  let h=`<div class="panel ch-hero">${zoneTag(T2('CHESTS','SKRZYNIE'))}
    <div class="ch-hero-row"><div class="ch-hero-art">${chestSvg(un.length?chestTier(un[0]):'wood',120,un.length?'ch-bob':'')}</div>
    <div><h2 class="title">${T2('Chests & challenges','Skrzynie i wyzwania')} 🎁</h2>
    <p class="sub">${un.length?T2(`You have <b>${un.length}</b> chest${un.length>1?'s':''} to open!`,`Masz <b>${un.length}</b> ${un.length===1?'skrzynię':'skrzynie'} do otwarcia!`):T2('Finish lessons and weekly challenges to earn chests full of coins, hints and outfits for Leo.','Kończ lekcje i wyzwania tygodnia, a zdobędziesz skrzynie pełne monet, podpowiedzi i strojów dla Leo.')}</p>
    <div class="ch-meter"><b>${T2('Next wooden chest','Następna drewniana skrzynia')}</b><div class="ch-dots big">${[...Array(CH_EVERY)].map((_,i)=>`<i class="${i<m?'on':''}"></i>`).join('')}</div><small>${m}/${CH_EVERY} ${T2('lessons','lekcji')}</small></div></div></div>
    ${TESTER?`<div class="rw-tester">🧪 <button class="btn secondary" onclick="testerChest('wood')">+ wood</button><button class="btn secondary" onclick="testerChest('silver')">+ silver</button><button class="btn secondary" onclick="testerChest('gold')">+ gold</button></div>`:''}
  </div>`;
  if(un.length) h+=`<div class="ch-shelf">${un.map(id=>`<button class="ch-slot ch-${chestTier(id)}" onclick="openChest('${id}')">${chestSvg(chestTier(id),88,'ch-bob')}<b>${chestName(id)}</b><small>${chestWhy(id)}</small><span class="ch-open">${T2('Open','Otwórz')}</span></button>`).join('')}</div>`;
  h+=`<div class="panel ch-week">${zoneTag(T2('WEEKLY CHALLENGES','WYZWANIA TYGODNIA'))}
    <div class="ch-week-top"><h3>${T2('This week','Ten tydzień')} · ${nd}/${st.length}</h3><span class="ch-left">⏳ ${dl===1?T2('Last day!','Ostatni dzień!'):T2(`${dl} days left`,`zostało ${dl} dni`)}</span></div>
    ${st.map(s=>`<div class="ch-task ${s.done?'done':''}"><span class="ch-ti">${s.done?'✅':s.c.icon}</span><div class="ch-tb"><b>${LANG==='pl'?s.c.pl(s.c.n):s.c.en(s.c.n)}</b>
      <div class="ch-bar"><i style="width:${s.v/s.c.n*100}%"></i><span>${s.v}/${s.c.n}</span></div></div>${chestSvg('silver',40,s.done?'open':'')}</div>`).join('')}
    <div class="ch-task ch-final ${nd===st.length?'done':''}"><span class="ch-ti">👑</span><div class="ch-tb"><b>${T2('Finish all three','Zrób wszystkie trzy')}</b><small>${T2('New challenges every Monday','Nowe wyzwania w każdy poniedziałek')}</small></div>${chestSvg('gold',48,nd===st.length?'open':'')}</div>
  </div>`;
  if(hist.length) h+=`<div class="panel ch-hist">${zoneTag(T2('LAST OPENED','OSTATNIO OTWARTE'))}<div class="ch-hist-row">${hist.map(id=>`<div class="ch-hi">${chestSvg(chestTier(id),36,'open')}<div>${c.op[id].r.map(r=>{const x=rewardLabel(r);return `<span>${x.i} ${x.b}</span>`;}).join('')}</div></div>`).join('')}</div></div>`;
  return h;
}
function testerChest(k){_give('t:'+_uid(),k,'tester');saveProgress();renderCourse();}

(function(){
  const _rc=renderCourse;renderCourse=function(){
    if(VIEW.track==='chests'){document.body.classList.toggle('adult',!!(PROF()&&PROF().track==='adults'));
      $('courseView').innerHTML=courseShell(testerBar()+`<div class="crumbs"><a href="#" onclick="nav();return false;">🏠 Home</a><span>›</span><b>🎁 ${T2('Chests','Skrzynie')}</b></div>`+chestsPageHtml());
      if(LANG==='pl'&&typeof applyLang==='function')applyLang();renderWallet();return;}
    try{chestCheck();}catch(e){}
    _rc();
    if(VIEW.track!=='shop'){const mb=document.querySelector('#courseView .rw-mob');if(mb)mb.insertAdjacentHTML('afterend',chestMobHtml());}};
  const _sn=sideNav;sideNav=function(){const h=_sn(),n=chestsUnopened().length;
    const it=`<a href="#" class="sn-item ${VIEW.track==='chests'?'on':''}" onclick="nav('chests');return false;"><span>🎁</span><b>${T2('Chests','Skrzynie')}</b><small class="${n?'ch-badge':''}">${n?n:challengeState().filter(s=>s.done).length+'/3'}</small></a>`;
    const i=h.indexOf(`<b>${T2('Shop','Sklep')}</b>`);if(i>=0){const e=h.indexOf('</a>',i)+4;return h.slice(0,e)+it+h.slice(e);}return h.replace('</aside>',it+'</aside>');};
  const _sp=sidePanels;sidePanels=function(){const h=_sp();const card=chestPanelHtml(),k=h.indexOf('goal-ring');
    if(k<0)return h+card;const e=h.indexOf('<div class="sp-card',k);return e<0?h+card:h.slice(0,e)+card+h.slice(e);};
})();
function chestMobHtml(){const n=chestsUnopened().length,st=challengeState(),d=st.filter(s=>s.done).length;
  return `<a href="#" class="ch-mob ${n?'has':''}" onclick="nav('chests');return false;">${chestSvg(n?chestTier(chestsUnopened()[0]):'wood',34,n?'ch-bob':'')}<b>${n?T2(`${n} chest${n>1?'s':''} to open`,`Skrzynie do otwarcia: ${n}`):T2('Chests','Skrzynie')}</b><span>🏁 ${d}/${st.length}</span><span class="rw-go">›</span></a>`;}
function chestPanelHtml(){const n=chestsUnopened().length,st=challengeState(),d=st.filter(s=>s.done).length;
  return `<div class="sp-card ch-sp"><div class="sp-head"><b>🎁 ${T2('Chests & challenges','Skrzynie i wyzwania')}</b><span class="sp-coins">${d}/${st.length}</span></div>
    ${st.map(s=>`<div class="ch-mini ${s.done?'done':''}"><span>${s.done?'✅':s.c.icon}</span><div><small>${LANG==='pl'?s.c.pl(s.c.n):s.c.en(s.c.n)}</small><div class="ch-bar sm"><i style="width:${s.v/s.c.n*100}%"></i></div></div></div>`).join('')}
    <button class="btn ${n?'btn-gold':'secondary'} sp-btn" onclick="${n?`openChest('${chestsUnopened()[0]}')`:"nav('chests')"}">${n?`🎁 ${T2('Open','Otwórz')} (${n})`:T2('See all','Zobacz wszystko')+' →'}</button></div>`;}
Object.assign(PL_UI,{"🎁 Chests":"🎁 Skrzynie"});
