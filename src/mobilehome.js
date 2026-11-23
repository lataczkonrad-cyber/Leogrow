/* ---------- calm home (phone, tablet and PC) ----------
   The home screen on phones keeps only what matters for today:
   1) your Leo + level + the big "next lesson" button,
   2) one slim row: goal ring, streak, coins, energy,
   3) one row of round shortcuts (chests, league, shop, review, premium),
   4) the level path, with only the current unit open and short lesson cards.
   The full-size cards that used to stack on top (Premium banner, wallet, chests, league,
   daily card, review card) are hidden on this screen; their pages are one tap away.
   Since 2026-11-23 tablets and PC (>= 1024px) get the same calm home; the left menu box stays. */
const MH_MQ=window.matchMedia('(max-width:1023px)');
const MH_OPEN=new Set();   // units the learner opened by hand (kept across re-renders)
function _mhSafe(f,d){try{return f();}catch(e){return d;}}
function mhStatsHtml(){
  const n=_mhSafe(()=>streakOf(C.days),0), ring=_mhSafe(()=>goalRing(40),'');
  const c=_mhSafe(()=>coins(),null), ef=_mhSafe(()=>energyFree(),false), ev=_mhSafe(()=>energyNow(),null);
  return `<div class="mh-stats">
    <button class="mh-streak" onclick="openHabits()" title="${T2('Daily goal & reminder','Cel dnia i przypomnienie')}"><span class="mh-ring">${ring}</span><b class="${n?'':'zero'}">🔥 ${n}</b><small>${T2('day streak','dni z rzędu')}</small></button>
    ${c===null?'':`<button class="mh-pill" onclick="nav('shop')" title="${T2('Coins','Monety')}"><b>🪙 ${c}</b></button>`}
    ${ev===null?'':`<button class="mh-pill" onclick="nav('shop')" title="${T2('Energy','Energia')}"><b>⚡ ${ef?'∞':ev+'/'+EN_MAX}</b></button>`}
  </div>`;
}
function mhDockHtml(main){
  const it=[];
  const tile=(ic,label,act,badge,cls)=>`<button class="mh-tile ${cls||''}" onclick="${act}"><span class="mh-ic">${ic}${badge?`<i>${badge}</i>`:''}</span><small>${label}</small></button>`;
  const ch=_mhSafe(()=>chestsUnopened().length,0), st=_mhSafe(()=>challengeState(),[]);
  if(typeof chestsUnopened==='function') it.push(tile('🎁',T2('Chests','Skrzynie'),"nav('chests')",ch||'',ch?'hot':''));
  if(_mhSafe(()=>frOn(),false)) it.push(tile('🏆',T2('League','Liga'),"nav('friends')",_mhSafe(()=>frMyRank(),'')||''));
  it.push(tile('🛍️',T2('Shop','Sklep'),"nav('shop')",''));
  const rv=main.querySelector('.review-card:not(.empty)'), rn=rv?(parseInt(rv.textContent,10)||''):'';
  it.push(tile('🔁',T2('Review','Powtórka'),rv?"mhReview()":"_comboToastText(T2('Words you get wrong will collect here 🔁','Tu zbiorą się słowa, w których robisz błędy 🔁'))",rn,rv?'hot':''));
  if(main.querySelector('#premBanner')) it.push(tile('👑','Premium',"openPremium()",'','prem'));
  else it.push(tile('📊',T2('Progress','Postęp'),"nav('me')",''));
  return `<div class="mh-dock" style="--n:${it.length}">${it.join('')}</div>`;
}
function mhReview(){const r=document.querySelector('#courseView .review-card:not(.empty)');if(r)r.click();}
function mhToggleUnit(head){const b=head.closest('.unit-block');if(!b)return;const k=b.dataset.mh;
  const open=b.classList.toggle('mh-closed')===false; if(open)MH_OPEN.add(k);else MH_OPEN.delete(k);
  if(open)setTimeout(()=>b.scrollIntoView({behavior:'smooth',block:'start'}),60);}
function mhDecorate(){
  const main=document.querySelector('#courseView .course-main'); document.body.classList.remove('mh-on');
  if(!main||VIEW.track||(typeof PT!=='undefined'&&PT))return;
  const hero=main.querySelector('.my-hero'); if(!hero)return;
  main.classList.add('mh'); document.body.classList.add('mh-on');
  // 1) hero first, with a "free plan" line under the button
  const first=main.querySelector('#premBanner,.rw-mob,.ch-mob,.daily-card');
  if(first&&first!==hero)main.insertBefore(hero,first);
  const pb=main.querySelector('#premBanner>span');
  if(pb&&!hero.querySelector('.mh-plan'))hero.insertAdjacentHTML('beforeend',`<div class="mh-plan">${pb.innerHTML}</div>`);
  // 2) slim status row + 3) shortcuts
  hero.insertAdjacentHTML('afterend',mhStatsHtml()+mhDockHtml(main));
  // the "get the app" tip goes to the very end
  const ins=main.querySelector('.install-card'), ln=main.querySelector('.level-nav');
  if(ins&&ln)ln.after(ins);
  // 4) level path: only the current unit is open
  const blocks=[...main.querySelectorAll('.unit-block')]; if(!blocks.length)return;
  let cur=blocks.find(b=>b.querySelector('.lesson-card.next'))||blocks.find(b=>b.querySelector('.lesson-card:not(.done):not(.locked)'))||blocks.find(b=>b.querySelector('.lesson-card:not(.done)'))||blocks[0];
  blocks.forEach((b,i)=>{const c=b.querySelector('.lesson-card');b.dataset.mh=c?c.id:'u'+i;
    const cards=b.querySelectorAll('.lesson-card'),done=b.querySelectorAll('.lesson-card.done').length;
    const head=b.querySelector('.unit-head');
    if(head){head.setAttribute('onclick','mhToggleUnit(this)');head.insertAdjacentHTML('beforeend',`<span class="mh-count">${done}/${cards.length}</span>`);}
    if(b!==cur&&!MH_OPEN.has(b.dataset.mh))b.classList.add('mh-closed');
    if(b===cur)b.classList.add('mh-cur');});
  if(typeof applyLang==='function'&&LANG==='pl')applyLang(main);
}
(function(){
  const _rc=renderCourse;renderCourse=function(){const r=_rc.apply(this,arguments);try{mhDecorate();}catch(e){console.warn('Leogrow phone home:',e);}return r;};
  // turning a tablet or resizing a window across the PC edge redraws the home the right way
  const re=()=>{if(!activeLesson&&document.getElementById('courseView'))renderCourse();};
  if(MH_MQ.addEventListener)MH_MQ.addEventListener('change',re);else if(MH_MQ.addListener)MH_MQ.addListener(re);
})();
