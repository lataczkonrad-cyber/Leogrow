
/* ---------- Daily habit: day streak, daily goal, streak shields, reminders ----------
   Everything lives in C.hab so it syncs with the rest of the progress:
   C.hab = {goal:minutes, goalAt:ms, daily:{'YYYY-MM-DD':{s:seconds,l:lessons,g:goalMet}}, frozen:[days kept by a shield], got:[rewards already given]}
   Reminder settings are per device (localStorage 'leogrowReminder'). */
const GOAL_OPTS=[[5,'🌱','Easy','Na luzie'],[10,'🌿','Regular','Regularnie'],[15,'🌳','Serious','Na serio'],[20,'🔥','Intense','Intensywnie'],[30,'🚀','Pro','Pro']];
const STREAK_MILESTONES={3:5,7:10,14:20,30:40,50:50,100:100,200:150,365:365}; // day → bonus coins
const GOAL_COINS=3, SHIELD_MAX=2;
function localDay(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function _dayShift(k,n){const [y,m,d]=k.split('-').map(Number);return localDay(new Date(y,m-1,d+n));}
function HAB(){C.hab=C.hab||{};const h=C.hab;h.daily=h.daily||{};h.frozen=h.frozen||[];h.got=h.got||[];return h;}
const goalMin=()=>HAB().goal||10;
const todayRec=()=>{const h=HAB(),k=localDay();return h.daily[k]||(h.daily[k]={s:0,l:0,g:false});};
const todayMin=()=>Math.floor(((HAB().daily[localDay()]||{}).s||0)/60);
const goalMetOn=k=>{const r=HAB().daily[k];return !!(r&&r.g);};
function activeSet(){return new Set([...(C.days||[]),...HAB().frozen]);}
/* a day counts when you finished a lesson or reached your goal; shield days keep the chain */
streakOf=function(days){const set=new Set([...(days||[]),...HAB().frozen]);let k=localDay();if(!set.has(k))k=_dayShift(k,-1);let n=0;while(set.has(k)){n++;k=_dayShift(k,-1);}return n;};
function streakStart(){const set=activeSet();let k=localDay();if(!set.has(k))k=_dayShift(k,-1);let s=null;while(set.has(k)){s=k;k=_dayShift(k,-1);}return s;}
const _shopFreezes=()=>typeof shopCount==='function'?(shopCount('freeze')||0):0;
function _earn(n,why){if(typeof shopEarn==='function'){try{shopEarn(n,why);}catch(e){}}}
function shieldsLeft(){const h=HAB();return Math.max(0,Math.min(SHIELD_MAX,h.got.filter(x=>x.startsWith('sh:')).length-h.got.filter(x=>x.startsWith('fu:')).length));}
const _coinTxt=(n,pl)=>typeof shopEarn==='function'?(pl?` +${n} monet`:` +${n} coins`):'';
function bestStreak(){const set=activeSet(),ks=[...set].sort();let best=0,run=0,prev=null;ks.forEach(k=>{run=prev&&_dayShift(prev,1)===k?run+1:1;best=Math.max(best,run);prev=k;});return best;}
function markActiveToday(){C.days=C.days||[];const k=localDay();if(!C.days.includes(k))C.days.push(k);}
/* rewards for reaching streak milestones; a new shield every 7 days of streak (max 2 kept) */
function checkStreakRewards(){
  const h=HAB(),n=streakOf(C.days),st=streakStart();if(!n||!st)return;
  Object.keys(STREAK_MILESTONES).map(Number).forEach(m=>{const key='m'+m+':'+st;if(n>=m&&!h.got.includes(key)){h.got.push(key);_earn(STREAK_MILESTONES[m],'streak-'+m+'-'+st);
    setTimeout(()=>{_comboToastText(T2(`🔥 ${m}-day streak!`+_coinTxt(STREAK_MILESTONES[m]),`🔥 ${m} dni z rzędu!`+_coinTxt(STREAK_MILESTONES[m],1)));if(typeof burstConfetti==='function')burstConfetti();},2200);}});
  if(n>=7&&n%7===0){const key='sh:'+localDay();if(!h.got.includes(key)&&shieldsLeft()<SHIELD_MAX){h.got.push(key);setTimeout(()=>_comboToastText(T2('🛡️ You earned a streak shield!','🛡️ Masz nową tarczę serii!')),4200);}}
}
/* missed a day or two? a saved shield fills the gap so the streak survives */
function applyShields(){
  const h=HAB(),set=activeSet(),y=_dayShift(localDay(),-1);if(set.has(y)||set.has(localDay())||!set.size)return;
  const last=[...set].sort().pop();if(!last||last>y)return;
  const gap=[];let k=_dayShift(last,1);while(k<=y&&gap.length<=SHIELD_MAX+5){gap.push(k);k=_dayShift(k,1);}
  const free=shieldsLeft();if(!gap.length||gap.length>free+_shopFreezes())return;
  const before=streakOf(C.days);for(let i=free;i<gap.length;i++)if(!shopUse('freeze'))return;gap.slice(0,free).forEach(d=>h.got.push('fu:'+d));h.frozen.push(...gap);const after=streakOf(C.days);
  if(after>before){saveProgress();setTimeout(()=>_comboToastText(T2(`🛡️ A shield saved your ${after}-day streak!`,`🛡️ Tarcza uratowała Twoją serię: ${after} dni!`)),1200);}
}
function setGoal(m){const h=HAB();h.goal=m;h.goalAt=Date.now();const r=todayRec();if(!r.g&&r.s>=m*60)goalReached(true);saveProgress();sfxWhoosh&&sfxWhoosh();}
function goalReached(quiet){
  const r=todayRec(),k=localDay(),h=HAB();if(r.g)return;r.g=true;markActiveToday();
  if(!h.got.includes('g:'+k)){h.got.push('g:'+k);_earn(GOAL_COINS,'goal-'+k);}
  checkStreakRewards();saveProgress();pushReminderState();
  if(!quiet){_comboToastText(T2('🎯 Daily goal reached!'+_coinTxt(GOAL_COINS),'🎯 Dzienny cel osiągnięty!'+_coinTxt(GOAL_COINS,1)));if(typeof burstConfetti==='function')burstConfetti();}
}
/* learning time: counted while a lesson is open, on screen, and you touched it in the last 90 s */
let _habLastAct=Date.now();
['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,()=>{_habLastAct=Date.now();},{passive:true,capture:true}));
setInterval(()=>{
  if(!activeLesson||document.visibilityState!=='visible'||Date.now()-_habLastAct>90000)return;
  const r=todayRec();r.s+=5;
  if(!r.g&&r.s>=goalMin()*60)goalReached();
  else if(r.s%60===0)saveProgress(true);
},5000);
/* lesson finished: count it, fix the day key to local time, give streak rewards, show today's goal */
const _finishOld=rLessonFinish;
rLessonFinish=function(){
  const r=todayRec();r.l=(r.l||0)+1;markActiveToday();
  const html=_finishOld();
  markActiveToday();checkStreakRewards();saveProgress();pushReminderState();
  return html.replace('<div class="star-row">',goalStripHtml(true)+'<div class="star-row">');
};
/* sync: keep the best of both devices */
const _mergeOld=mergeProgress;
mergeProgress=function(a,b){
  const out=_mergeOld(a,b),ha=(a.C&&a.C.hab)||{},hb=(b.C&&b.C.hab)||{};
  const pick=(ha.goalAt||0)>=(hb.goalAt||0)?ha:hb,daily={};
  [ha,hb].forEach(x=>Object.entries(x.daily||{}).forEach(([k,r])=>{const o=daily[k]||{s:0,l:0,g:false};daily[k]={s:Math.max(o.s,r.s||0),l:Math.max(o.l,r.l||0),g:o.g||!!r.g};}));
  const keep=localDay(new Date(Date.now()-400*864e5)); // keep about a year of daily records
  Object.keys(daily).forEach(k=>{if(k<keep)delete daily[k];});
  out.C.hab={goal:pick.goal||ha.goal||hb.goal,goalAt:pick.goalAt||0,daily,frozen:[...new Set([...(ha.frozen||[]),...(hb.frozen||[])])].sort(),got:[...new Set([...(ha.got||[]),...(hb.got||[])])]};
  return out;
};
const _pullOld=pullAndMerge;
pullAndMerge=async function(){const ok=await _pullOld.apply(this,arguments);if(ok){applyShields();pushReminderState();if(!activeLesson)renderCourse();}return ok;};
setTimeout(()=>{if(typeof USER==='undefined'||!USER)applyShields();},4000);

/* ---------- what you see ---------- */
function goalRing(size){
  const g=goalMin(),m=Math.min(todayMin(),g),p=g?m/g:0,R=size/2-5,L=2*Math.PI*R,done=todayRec().g;
  return `<svg class="goal-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${R}" class="gr-bg"/><circle cx="${size/2}" cy="${size/2}" r="${R}" class="gr-fg ${done?'done':''}" stroke-dasharray="${L}" stroke-dashoffset="${L*(1-(done?1:p))}" transform="rotate(-90 ${size/2} ${size/2})"/><text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle">${done?'✓':m}</text></svg>`;
}
function goalStripHtml(onFinish){
  const g=goalMin(),m=todayMin(),done=todayRec().g,n=streakOf(C.days);
  const txt=done?T2(`Daily goal done · ${m} min today`,`Dzienny cel zrobiony · dziś ${m} min`):T2(`Today: ${m} / ${g} min`,`Dziś: ${m} / ${g} min`);
  return `<div class="habit-strip ${onFinish?'on-finish':''}">${goalRing(46)}<div><b>${txt}</b><small>🔥 ${n} ${T2(n===1?'day streak':'day streak','dni z rzędu')}${shieldsLeft()?` · 🛡️ ${shieldsLeft()}`:''}</small></div></div>`;
}
function weekDots(){
  const set=activeSet(),fr=new Set(HAB().frozen),names=LANG==='pl'?['Nd','Pn','Wt','Śr','Cz','Pt','So']:['Su','Mo','Tu','We','Th','Fr','Sa'];
  return [...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);const k=localDay(d);
    const cls=fr.has(k)?'shield':goalMetOn(k)?'goal':set.has(k)?'on':'';return `<div class="wk-day ${cls} ${i===6?'today':''}"><i>${fr.has(k)?'🛡️':goalMetOn(k)?'★':''}</i><small>${names[d.getDay()]}</small></div>`;}).join('');
}
function dailyCardHtml(){
  const n=streakOf(C.days),done=todayRec().g,practisedToday=activeSet().has(localDay());
  const msg=done?T2('Goal done for today — see you tomorrow!','Cel na dziś zrobiony — do jutra!')
    :practisedToday?T2(`Keep going to reach your ${goalMin()} min goal.`,`Ucz się dalej, aby dobić do celu ${goalMin()} min.`)
    :n?T2(`Do a lesson today to keep your ${n}-day streak.`,`Zrób dziś lekcję, aby utrzymać serię ${n} dni.`)
    :T2('Do one lesson today to start a streak.','Zrób dziś jedną lekcję, aby zacząć serię.');
  const rem=reminderCfg();
  return `<div class="daily-card"><div class="dc-ring">${goalRing(64)}</div><div class="dc-main">
    <div class="dc-top"><b class="dc-streak ${n?'':'zero'}">🔥 ${n}</b><span>${T2('day streak','dni z rzędu')}</span>${shieldsLeft()?`<span class="dc-shield" title="${T2('Streak shields','Tarcze serii')}">🛡️ ${shieldsLeft()}</span>`:''}</div>
    <p>${msg}</p><div class="dc-week">${weekDots()}</div></div>
    <button class="chip-btn dc-set" onclick="openHabits()">${rem.on?'🔔 '+rem.time:'🎯 '+T2('Goal & reminder','Cel i przypomnienie')}</button></div>`;
}
/* home screens and My progress get the daily card */
const _myHomeOld=myHomeHtml;
myHomeHtml=function(p){return dailyCardHtml()+_myHomeOld(p);};
const _homeOld=homeHtml;
homeHtml=function(){const h=_homeOld();const a='<div class="me-card"';return h.includes(a)?h.replace(a,dailyCardHtml()+a):dailyCardHtml()+h;};
const _progOld=progressHtml;
progressHtml=function(){
  let h=_progOld();
  const b=bestStreak(),totalMin=Math.round(Object.values(HAB().daily).reduce((s,r)=>s+(r.s||0),0)/60),goals=Object.values(HAB().daily).filter(r=>r.g).length;
  const panel=`<div class="panel habit-panel">${zoneTag(T2('DAILY HABIT','CODZIENNY NAWYK'))}${goalStripHtml()}
    <div class="habit-stats"><div><b>🏆 ${b}</b><small>${T2('best streak','najdłuższa seria')}</small></div><div><b>🎯 ${goals}</b><small>${T2('goals reached','osiągnięte cele')}</small></div><div><b>⏱️ ${totalMin}</b><small>${T2('minutes learnt','minut nauki')}</small></div><div><b>🛡️ ${shieldsLeft()}/${SHIELD_MAX}</b><small>${T2('shields','tarcze')}</small></div></div>
    <p class="sub" style="margin:10px 0 0;">${T2('Every 7 days in a row you earn a 🛡️ shield. If you miss a day, a shield saves your streak.','Za każde 7 dni z rzędu dostajesz 🛡️ tarczę. Gdy opuścisz dzień, tarcza uratuje serię.')}</p>
    <button class="btn btn-gold lesson-btn" style="margin-top:12px;" onclick="openHabits()">🎯 ${T2('Daily goal & reminder','Dzienny cel i przypomnienie')}</button></div>`;
  const i=h.indexOf('<h2 class="section-title">');
  return i<0?h+panel:h.slice(0,i)+panel+h.slice(i);
};
/* settings get a row for the goal */
const _settingsOld=openSettings;
openSettings=function(){_settingsOld();const l=document.querySelector('#authModal .set-list');if(!l)return;
  const r=document.createElement('div');r.className='set-row';r.innerHTML=`<b>🎯 ${T2('Daily goal','Dzienny cel')}</b><div class="set-ctl"><button class="seg" onclick="openHabits()">${goalMin()} min${reminderCfg().on?' · 🔔 '+reminderCfg().time:''}</button></div>`;
  l.insertBefore(r,l.children[1]||null);};

/* the goal & reminder window */
function openHabits(){
  const g=goalMin(),rem=reminderCfg(),perm=('Notification' in window)?Notification.permission:'unsupported';
  const opts=GOAL_OPTS.map(([m,e,en,pl])=>`<button class="goal-opt ${m===g?'on':''}" onclick="setGoal(${m});openHabits()"><span>${e}</span><b>${m} min</b><small>${T2(en,pl)}</small></button>`).join('');
  const notifNote=perm==='denied'?T2('Notifications are blocked for this site. Allow them in your browser settings, or use the calendar button.','Powiadomienia są zablokowane dla tej strony. Włącz je w ustawieniach przeglądarki albo użyj przycisku kalendarza.')
    :perm==='unsupported'||(isIOS&&!isStandalone())?T2('This browser can\'t show reminders. The calendar reminder works everywhere.','Ta przeglądarka nie pokaże przypomnień. Przypomnienie w kalendarzu działa wszędzie.')
    :T2('Leogrow reminds you only if you haven\'t reached your goal yet that day.','Leogrow przypomni tylko wtedy, gdy danego dnia cel nie jest jeszcze osiągnięty.');
  authModal(`<button class="auth-x" onclick="closeAuth()">✕</button>${zoneTag(T2('DAILY GOAL','DZIENNY CEL'))}<h2 class="title">🎯 ${T2('How much a day?','Ile dziennie?')}</h2>
    <p class="sub">${T2('Pick a goal you can keep every day. You can change it any time.','Wybierz cel, który dasz radę utrzymać każdego dnia. Możesz go zmienić w każdej chwili.')}</p>
    <div class="goal-opts">${opts}</div>
    <h3 class="habit-h3">🔔 ${T2('Daily reminder','Codzienne przypomnienie')}</h3>
    <div class="rem-row"><label>${T2('Remind me at','Przypomnij o')} <input type="time" id="remTime" value="${rem.time}" onchange="setReminderTime(this.value)"></label></div>
    <div class="rem-btns">
      ${rem.on?`<button class="btn secondary lesson-btn" onclick="setReminderOn(false)">🔕 ${T2('Turn off','Wyłącz')}</button>`:`<button class="btn btn-gold lesson-btn" onclick="enableReminder()">🔔 ${T2('Turn on reminders','Włącz przypomnienia')}</button>`}
      <button class="btn secondary lesson-btn" onclick="downloadReminderIcs()">📅 ${T2('Add to my calendar','Dodaj do kalendarza')}</button>
    </div><p class="rem-note">${notifNote}</p>`);
}
/* ---------- reminders ---------- */
function reminderCfg(){try{return Object.assign({on:false,time:'18:00'},JSON.parse(localStorage.getItem('leogrowReminder')||'{}'));}catch(e){return {on:false,time:'18:00'};}}
function saveReminderCfg(c){try{localStorage.setItem('leogrowReminder',JSON.stringify(c));}catch(e){}pushReminderState();if(!activeLesson)renderCourse();}
function setReminderTime(t){if(!/^\d\d:\d\d$/.test(t))return;const c=reminderCfg();c.time=t;saveReminderCfg(c);if(c.on)_comboToastText(T2('🔔 Reminder set for ','🔔 Przypomnienie ustawione na ')+t);}
function setReminderOn(on){const c=reminderCfg();c.on=on;saveReminderCfg(c);openHabits();}
async function enableReminder(){
  if(!('Notification' in window)||(isIOS&&!isStandalone())){_comboToastText(T2('📅 Use the calendar reminder on this device','📅 Na tym urządzeniu użyj przypomnienia w kalendarzu'));return;}
  let p=Notification.permission;if(p==='default'){try{p=await Notification.requestPermission();}catch(e){}}
  if(p!=='granted'){openHabits();return;}
  const c=reminderCfg();c.on=true;saveReminderCfg(c);
  try{const reg=await navigator.serviceWorker.ready;if(reg.periodicSync){try{await reg.periodicSync.register('leogrow-daily',{minInterval:60*60*1000});}catch(e){}}}catch(e){}
  _comboToastText(T2('🔔 Reminder on — ','🔔 Przypomnienie włączone — ')+c.time);openHabits();
}
/* the service worker reads this to decide whether to remind you (it can wake up even when the app is closed, on Android) */
function pushReminderState(){
  try{if(!('caches' in window))return;const c=reminderCfg();
    const st={on:c.on,time:c.time,done:todayRec().g,today:localDay(),streak:streakOf(C.days),goal:goalMin(),lang:LANG,tz:(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone;}catch(e){return '';}})(),notified:localStorage.getItem('leogrowNotified')||''};
    caches.open('leogrow-state').then(ch=>ch.put('./__reminder',new Response(JSON.stringify(st),{headers:{'Content-Type':'application/json'}}))).catch(()=>{});}catch(e){}
}
function reminderText(){const n=streakOf(C.days),m=Math.max(0,goalMin()-todayMin());
  return n?{t:T2(`🔥 Keep your ${n}-day streak!`,`🔥 Utrzymaj serię ${n} dni!`),b:T2(`${m} minutes of English and today's goal is done.`,`${m} minut angielskiego i dzisiejszy cel zrobiony.`)}
          :{t:T2('Time for English with Leo! 🦁','Czas na angielski z Leo! 🦁'),b:T2(`Just ${goalMin()} minutes today. Let's go!`,`Tylko ${goalMin()} minut dzisiaj. Do dzieła!`)};}
/* while the app is open in the background: remind at the chosen time */
setInterval(async()=>{
  const c=reminderCfg();if(!c.on||!('Notification' in window)||Notification.permission!=='granted')return;
  const now=new Date(),hm=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
  let last='';try{last=localStorage.getItem('leogrowNotified')||'';}catch(e){}
  if(hm<c.time||last===localDay()||todayRec().g||document.visibilityState==='visible')return;
  try{localStorage.setItem('leogrowNotified',localDay());}catch(e){}pushReminderState();
  const {t,b}=reminderText();
  try{const reg=await navigator.serviceWorker.ready;reg.showNotification(t,{body:b,icon:'lingrow-icon-192.png',badge:'lingrow-icon-192.png',tag:'leogrow-daily'});}catch(e){try{new Notification(t,{body:b,icon:'lingrow-icon-192.png'});}catch(_){}}
},60000);
/* calendar reminder: works on every phone and computer, even when the app is closed */
function downloadReminderIcs(){
  const c=reminderCfg(),[hh,mm]=c.time.split(':'),d=localDay().replace(/-/g,''),url=location.origin+location.pathname.replace(/[^/]*$/,'');
  const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Leogrow//Daily reminder//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:leogrow-daily-'+d+'@leogrow','DTSTAMP:'+stamp,
    `DTSTART:${d}T${hh}${mm}00`,'DURATION:PT'+goalMin()+'M',
    'RRULE:FREQ=DAILY','SUMMARY:'+T2('🔥 Leogrow — '+goalMin()+' min of English','🔥 Leogrow — '+goalMin()+' min angielskiego'),
    'DESCRIPTION:'+T2('Keep your streak going! ','Utrzymaj serię! ')+url,'URL:'+url,
    'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:Leogrow','TRIGGER:PT0M','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='leogrow-reminder.ics';document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
  _comboToastText(T2('📅 Open the file to add the daily reminder','📅 Otwórz plik, aby dodać codzienne przypomnienie'));
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')pushReminderState();});
setTimeout(pushReminderState,3000);
