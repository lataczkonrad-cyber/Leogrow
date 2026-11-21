
/* ---------- Leogrow Premium (Stripe) ----------
   Free:    the whole A0 level of every track + the first lesson of every other unit, up to 3 lessons a day.
   Premium: every lesson and unit test, no daily limit. 7 days free for every new account.
   Payments: Netlify functions in netlify/functions (checkout, billing-portal, stripe-webhook).
   The webhook writes public.premium in Supabase; the app reads the learner's own row. */
const PREMIUM={
  freeLevels:['A0'], freeLessonsPerUnit:1, dailyFree:3, trialDays:0,   // no free trial on sign-up: the 7 free days come only with the monthly subscription (Stripe trial)
  price:{month:'24,99 zł',year:'149 zł'},
  row:null, loadedFor:null,
};
const _todayKey=()=>new Date().toISOString().slice(0,10);
function premiumUntil(){
  const r=PREMIUM.row; if(!r) return 0;
  return Math.max(r.sub_until?Date.parse(r.sub_until):0, r.paid_until?Date.parse(r.paid_until):0);
}
function trialUntil(){
  if(!USER||!USER.created_at) return 0;
  return Date.parse(USER.created_at)+PREMIUM.trialDays*864e5;
}
const paidPremium=()=>premiumUntil()>Date.now();
const subTrial=()=>!!(PREMIUM.row&&PREMIUM.row.sub_status==='trialing');
const onTrial=()=>!paidPremium()&&trialUntil()>Date.now();
function isPremium(){
  if(TESTER||!cloudOn()) return true;          // tester tools and offline copies see everything
  return paidPremium()||onTrial();
}
function freeLesson(l){
  if(!l||l.review) return true;
  const u=l.unit; if(PREMIUM.freeLevels.includes(u.level)) return true;
  return u.lessons.indexOf(l)<PREMIUM.freeLessonsPerUnit;
}
const needsPremium=l=>!isPremium()&&!freeLesson(l);
/* daily limit for the free plan: distinct lessons opened today */
function dailyOpened(){try{const d=JSON.parse(localStorage.getItem('leogrowDaily')||'null');if(d&&d.d===_todayKey())return d.ids||[];}catch(e){}return [];}
function markOpened(id){const ids=dailyOpened();if(ids.includes(id))return;ids.push(id);try{localStorage.setItem('leogrowDaily',JSON.stringify({d:_todayKey(),ids}));}catch(e){}}
const freeLeftToday=()=>Math.max(0,PREMIUM.dailyFree-dailyOpened().length);

const _openLessonFree=openLesson;
openLesson=function(id){
  const l=typeof id==='object'?id:ALL_LESSONS.find(x=>x.id===id);
  if(l&&!isPremium()){
    if(!freeLesson(l)){openPremium('lesson');return;}
    const key=l.review?'review-'+l.unit.track:l.id, resume=C.active&&C.active.id===l.id;
    if(!resume&&!dailyOpened().includes(key)&&freeLeftToday()<=0){openPremium('daily');return;}
    if(l.review||lessonUnlocked(l.id)) markOpened(key);
  }
  return _openLessonFree.apply(this,arguments);
};

/* lesson cards: show a ⭐ Premium button instead of Start on paid lessons */
const _renderCoursePlain=renderCourse;
renderCourse=function(){
  const r=_renderCoursePlain.apply(this,arguments);
  try{decoratePremium();}catch(e){console.warn('premium',e);}
  return r;
};
function decoratePremium(){
  if(!cloudOn()) return;
  const prem=isPremium();
  ALL_LESSONS.forEach(l=>{
    const card=document.getElementById('card-'+l.id); if(!card) return;
    if(prem||freeLesson(l)) return;
    card.classList.add('premium-lock');
    const unlocked=lessonUnlocked(l.id);
    card.onclick=null; card.removeAttribute('onclick');
    if(unlocked){
      card.setAttribute('onclick',"openPremium('lesson')");
      const btn=card.querySelector('.lc-bottom .lesson-btn');
      if(btn) btn.outerHTML=`<button class="btn btn-gold lesson-btn prem-btn" onclick="event.stopPropagation();openPremium('lesson')">⭐ Premium</button>`;
    }
    const tag=card.querySelector('.lc-title span'); if(tag&&!tag.querySelector('.prem-tag')) tag.insertAdjacentHTML('beforeend',' <b class="prem-tag">⭐ PREMIUM</b>');
  });
  const main=document.querySelector('#courseView .course-main');
  if(main&&!document.getElementById('premBanner')){
    let h='';
    if(paidPremium()) h='';
    else if(onTrial()){const d=Math.max(1,Math.ceil((trialUntil()-Date.now())/864e5));h=`<span>⭐ <b>${T2('Premium trial','Próbny Premium')}</b> · ${T2(d+(d===1?' day':' days')+' left','zostało dni: '+d)}</span><button class="btn btn-gold lesson-btn" onclick="openPremium()">${T2('Keep Premium','Zostań z Premium')}</button>`;}
    else{const n=freeLeftToday();h=`<span>🌱 <b>${T2('Free plan','Plan darmowy')}</b> · ${T2(n+' of '+PREMIUM.dailyFree+' lessons left today','zostało lekcji dziś: '+n+' z '+PREMIUM.dailyFree)}</span><button class="btn btn-gold lesson-btn" onclick="openPremium()">⭐ ${T2('Go Premium','Przejdź na Premium')}</button>`;}
    if(h) main.insertAdjacentHTML('afterbegin',`<div class="prem-banner" id="premBanner">${h}</div>`);
  }
}

/* the Premium window */
function openPremium(why){
  if(!cloudOn()) return;
  const reason=why==='lesson'?T2('This lesson is part of Leogrow Premium.','Ta lekcja jest częścią Leogrow Premium.')
              :why==='daily'?T2('You\'ve used today\'s '+PREMIUM.dailyFree+' free lessons. Come back tomorrow, or go Premium for unlimited learning.','Wykorzystałeś dziś '+PREMIUM.dailyFree+' darmowe lekcje. Wróć jutro albo przejdź na Premium i ucz się bez limitu.')
              :T2('Learn every level from A0 to C1, with no limits.','Ucz się na każdym poziomie od A0 do C1, bez limitów.');
  const feats=[
    ['📚',T2('All '+ALL_LESSONS.length+' lessons, Kids A0–A2 and Teens & Adults A0–C1','Wszystkie lekcje ('+ALL_LESSONS.length+'): Dzieci A0–A2 oraz Młodzież i Dorośli A0–C1')],
    ['♾️',T2('Unlimited lessons every day','Nielimitowane lekcje każdego dnia')],
    ['🏆',T2('Every unit test and final test','Wszystkie testy działów i testy końcowe')],
    ['🔁',T2('Unlimited review of your missed words','Nielimitowane powtórki trudnych słówek')],
  ].map(([e,t])=>`<li><span>${e}</span>${t}</li>`).join('');
  let body;
  if(paidPremium()){
    body=`<p class="prem-state">✅ ${subTrial()?T2('Free week — your first payment is on','Darmowy tydzień — pierwsza płatność')+' ':''}${subTrial()?'':T2('You have Premium until','Masz Premium do')} <b>${new Date(premiumUntil()).toLocaleDateString(LANG==='pl'?'pl-PL':'en-GB')}</b>.</p>${manageBtn()}`;
  }else if(!USER){
    body=`<p class="prem-state">${T2('Create a free account first, then pick a plan. The monthly plan starts with <b>7 days free</b>.','Najpierw załóż darmowe konto, potem wybierz plan. Plan miesięczny zaczyna się od <b>7 dni za darmo</b>.')}</p>
      <button class="btn btn-gold auth-go" onclick="openAuth('up')">${T2('Create free account →','Załóż darmowe konto →')}</button>
      <button class="btn secondary auth-go" onclick="openAuth('in')">${T2('I have an account','Mam już konto')}</button>`;
  }else{
    const t=onTrial()?`<p class="prem-state">⭐ ${T2('Your free trial ends on','Twój okres próbny kończy się')} <b>${new Date(trialUntil()).toLocaleDateString(LANG==='pl'?'pl-PL':'en-GB')}</b>.</p>`:'';
    body=t+`<div class="prem-plans">
      <button class="prem-plan" onclick="buyPremium('year',this)"><i>${T2('BEST VALUE · −50%','NAJLEPSZA CENA · −50%')}</i><b>${PREMIUM.price.year}</b><small>${T2('for 1 year · about 12 zł a month','za 1 rok · ok. 12 zł miesięcznie')}</small><em>${T2('One payment, no auto-renewal · BLIK, card, Przelewy24','Jedna płatność, bez odnawiania · BLIK, karta, Przelewy24')}</em></button>
      <button class="prem-plan" onclick="buyPremium('month',this)"><i>${T2('MONTHLY','MIESIĘCZNIE')}</i><b>${PREMIUM.price.month}</b><small>${T2('a month · first 7 days free','miesięcznie · pierwsze 7 dni za darmo')}</small><em>${T2('Cancel anytime in the first 7 days and you pay nothing · Card, Apple Pay, Google Pay','Anuluj w ciągu 7 dni, a nic nie zapłacisz · Karta, Apple Pay, Google Pay')}</em></button>
    </div><p class="auth-msg" id="premMsg"></p>
    <p class="auth-note">${T2('Secure payment by Stripe. Premium unlocks on all your devices.','Bezpieczna płatność przez Stripe. Premium działa na wszystkich Twoich urządzeniach.')}</p>`;
  }
  authModal(`<button class="auth-x" onclick="closeAuth()">✕</button>${zoneTag('LEOGROW PREMIUM')}
    <h2 class="title">⭐ Leogrow Premium</h2><p class="sub">${reason}</p><ul class="prem-feats">${feats}</ul>${body}`);
}
function manageBtn(){
  const r=PREMIUM.row;
  return r&&r.stripe_subscription_id?`<button class="btn secondary auth-go" onclick="managePremium(this)">${T2('Manage or cancel subscription','Zarządzaj subskrypcją lub ją anuluj')}</button><p class="auth-msg" id="premMsg"></p>`:'';
}
async function _premFetch(path,body){
  const {data}=await SUPA.auth.getSession(); const tok=data.session&&data.session.access_token;
  if(!tok) throw new Error(T2('Please log in again.','Zaloguj się ponownie.'));
  const r=await fetch('/.netlify/functions/'+path,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+tok},body:JSON.stringify(body||{})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok||!j.url) throw new Error(j.error||T2('Payments are not available right now. Please try again later.','Płatności są teraz niedostępne. Spróbuj ponownie później.'));
  return j.url;
}
async function buyPremium(plan,btn){
  const msg=$('premMsg'); document.querySelectorAll('.prem-plan').forEach(b=>b.disabled=true); if(msg) msg.textContent='…';
  try{ await pushNow(true); location.href=await _premFetch('checkout',{plan,lang:LANG}); }
  catch(e){ if(msg) msg.textContent=e.message; document.querySelectorAll('.prem-plan').forEach(b=>b.disabled=false); }
}
async function managePremium(btn){
  const msg=$('premMsg'); btn.disabled=true;
  try{ location.href=await _premFetch('billing-portal',{lang:LANG}); }
  catch(e){ if(msg) msg.textContent=e.message; btn.disabled=false; }
}

/* load the learner's Premium row whenever the logged-in account changes */
async function loadPremium(){
  if(!SUPA||!USER){PREMIUM.row=null;PREMIUM.loadedFor=null;return;}
  const uid=USER.id;
  try{
    const {data,error}=await SUPA.from('premium').select('sub_until,paid_until,sub_status,stripe_subscription_id').eq('user_id',uid).maybeSingle();
    if(error) throw error;
    if(!USER||USER.id!==uid) return;
    PREMIUM.row=data||null; PREMIUM.loadedFor=uid;
    try{localStorage.setItem('leogrowPremium',JSON.stringify({u:uid,row:PREMIUM.row}));}catch(e){}
  }catch(e){console.warn('premium',e);}
  if(!activeLesson) renderCourse();
}
try{const c=JSON.parse(localStorage.getItem('leogrowPremium')||'null');if(c&&c.row)PREMIUM.cached=c;}catch(e){}
const _renderAccountBtnPlain=renderAccountBtn;
renderAccountBtn=function(){
  const r=_renderAccountBtnPlain.apply(this,arguments);
  const uid=USER&&USER.id||null;
  if(uid!==PREMIUM.loadedFor){
    PREMIUM.loadedFor=uid;
    PREMIUM.row=uid&&PREMIUM.cached&&PREMIUM.cached.u===uid?PREMIUM.cached.row:null;   // works offline too
    if(uid) loadPremium(); else if(!activeLesson) renderCourse();
  }
  return r;
};
/* account window: show the plan */
const _openAccountPlain=openAccount;
openAccount=function(){
  const r=_openAccountPlain.apply(this,arguments);
  const box=document.querySelector('#authModal .auth-box'); if(!box) return r;
  let h;
  if(paidPremium()) h=`<p class="prem-state">⭐ <b>Premium</b> ${subTrial()?T2('free until','za darmo do'):T2('until','do')} ${new Date(premiumUntil()).toLocaleDateString(LANG==='pl'?'pl-PL':'en-GB')}</p>${manageBtn()}`;
  else if(onTrial()) h=`<p class="prem-state">⭐ ${T2('Premium trial until','Próbny Premium do')} ${new Date(trialUntil()).toLocaleDateString(LANG==='pl'?'pl-PL':'en-GB')}</p><button class="btn btn-gold auth-go" onclick="openPremium()">⭐ ${T2('See Premium plans','Zobacz plany Premium')}</button>`;
  else h=`<p class="prem-state">🌱 ${T2('Free plan','Plan darmowy')}</p><button class="btn btn-gold auth-go" onclick="openPremium()">⭐ ${T2('Go Premium','Przejdź na Premium')}</button>`;
  const sync=box.querySelector('button[onclick^="syncNowBtn"]');
  if(sync) sync.insertAdjacentHTML('beforebegin',`<div class="prem-acc">${h}</div>`); else box.insertAdjacentHTML('beforeend',h);
  return r;
};
/* back from Stripe */
(function(){
  const q=new URLSearchParams(location.search), p=q.get('premium'); if(!p) return;
  q.delete('premium'); history.replaceState(null,'',location.pathname+(q.toString()?'?'+q:'')+location.hash);
  if(p==='cancel'){setTimeout(()=>_comboToastText(T2('Payment cancelled — nothing was charged.','Płatność anulowana — nic nie zostało pobrane.')),900);return;}
  if(p!=='ok') return;
  setTimeout(()=>_comboToastText(T2('🎉 Thank you! Unlocking Premium…','🎉 Dziękujemy! Odblokowujemy Premium…')),900);
  let tries=0; const tick=async()=>{ tries++;
    if(USER){ await loadPremium(); if(paidPremium()){ _comboToastText(T2('⭐ Premium is on. Enjoy every lesson!','⭐ Premium włączone. Miłej nauki!')); return; } }
    if(tries<15) setTimeout(tick,2000);
    else _comboToastText(T2('Payment received. Premium will appear in a minute — refresh the page.','Płatność otrzymana. Premium pojawi się za chwilę — odśwież stronę.'));
  }; setTimeout(tick,1500);
})();
