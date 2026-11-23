/* =====================================================================
   Friends league: add friends with a code or a link, race them on weekly points.
   Supabase (supabase-friends.sql): friend_board = one public-to-friends row per learner
   {code, name, leo, week, xp, last_week, last_xp}; friends = who follows whom (both ways,
   only through add_friend(code) / remove_friend(id)). A learner can read only their own row
   and their friends' rows.
   Points come from the chest log (C.ch.log): every finished lesson stores p = lesson points.
   ===================================================================== */
const FR_MAX=50;
let FR={rows:null,at:0,busy:false,err:'',msg:'',edit:false};
const _fe=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const frOn=()=>typeof cloudOn==='function'&&cloudOn();

/* ---------- my points ---------- */
function _lpPts(e){return typeof e.p==='number'?e.p:20+(e.s||1)*20;} /* lessons from before the league: a fair guess */
function weekPoints(ws){ws=ws||weekStart();const ds=new Set(weekDays(ws));return Object.values(CH().log).filter(e=>ds.has(e.d)).reduce((a,e)=>a+_lpPts(e),0);}
const prevWeek=ws=>_dayShift(ws||weekStart(),-7);
(function(){
  const _fin=rLessonFinish;rLessonFinish=function(){
    const pts=Math.max(10,score-lessonStartScore),t0=Date.now();const h=_fin();
    /* the chest layer has just logged this lesson: add its points */
    const L=CH().log;let k=null;for(const id in L){const e=L[id];if(e.t>=t0-2000&&typeof e.p!=='number'&&(!k||e.t>L[k].t))k=id;}
    if(k){L[k].p=pts;saveProgress();frQueuePush();}
    return h;};
})();

/* ---------- who I am on the board ---------- */
function frMyName(){return (userName()||'').trim().split(/\s+/)[0].slice(0,20)||T2('Learner','Uczeń');}
function frMyLeo(){const p=PROF();const s=p&&typeof leoStage==='function'&&leoStage(p.track,p.level);return s?s.key:'kid';}
function frRow(){const ws=weekStart(),pw=prevWeek(ws);
  return {user_id:USER.id,name:frMyName(),leo:frMyLeo(),week:ws,xp:weekPoints(ws),last_week:pw,last_xp:weekPoints(pw),updated_at:new Date().toISOString()};}
let _frT=null;
function frQueuePush(){if(!frOn()||!SUPA||!USER)return;clearTimeout(_frT);_frT=setTimeout(()=>frPush(),1200);}
async function frPush(){if(!SUPA||!USER)return false;
  try{const {error}=await SUPA.from('friend_board').upsert(frRow(),{onConflict:'user_id'});if(error)throw error;return true;}
  catch(e){FR.err=_frErr(e);return false;}}
function _frErr(e){const m=(e&&e.message)||String(e||'');
  if(/friend_board|friends|add_friend|schema cache|does not exist|not find/i.test(m))return 'setup';return m;}

/* ---------- loading the board ---------- */
async function frLoad(force){
  if(!frOn()||!SUPA||!USER||FR.busy)return;if(!force&&FR.rows&&Date.now()-FR.at<30000)return;
  FR.busy=true;
  try{await frPush();
    const {data,error}=await SUPA.from('friend_board').select('user_id,code,name,leo,week,xp,last_week,last_xp');
    if(error)throw error;FR.rows=data||[];FR.at=Date.now();if(FR.err==='setup')FR.err='';frWinnerCheck();}
  catch(e){FR.err=_frErr(e);}
  FR.busy=false;if(VIEW.track==='friends'&&!activeLesson)renderCourse();}
function frMe(){return (FR.rows||[]).find(r=>USER&&r.user_id===USER.id);}
/* this week's ranking: everyone's points for the current week (0 if they haven't learned yet) */
function frRanking(ws){ws=ws||weekStart();const pw=prevWeek(ws);
  const rows=(FR.rows||[]).map(r=>{const me=USER&&r.user_id===USER.id;
    const xp=me?weekPoints(ws):(r.week===ws?r.xp:0);
    const last=me?weekPoints(pw):(r.week===pw?r.xp:r.last_week===pw?r.last_xp:0);
    return {id:r.user_id,me,name:me?frMyName():r.name,leo:me?frMyLeo():r.leo,xp:xp||0,last:last||0};});
  if(USER&&!rows.some(r=>r.me))rows.push({id:USER.id,me:true,name:frMyName(),leo:frMyLeo(),xp:weekPoints(ws),last:weekPoints(pw)});
  rows.sort((a,b)=>b.xp-a.xp||(a.me?-1:b.me?1:0)||String(a.name).localeCompare(b.name));
  let rk=0,prev=null;rows.forEach((r,i)=>{if(r.xp!==prev){rk=i+1;prev=r.xp;}r.rank=rk;});
  return rows;}
function frLastWinner(){const rows=frRanking().filter(r=>r.last>0).sort((a,b)=>b.last-a.last);
  if(rows.length<2)return null;return rows[1].last===rows[0].last?null:rows[0];}
/* win last week's league (with at least one friend) → 50 coins, once */
function frWinnerCheck(){const w=frLastWinner();if(!w||!w.me)return;
  if(shopEarn(50,'league:'+prevWeek()))setTimeout(()=>_comboToastText(T2('🏆 You won last week\'s friends league! +50 🪙','🏆 Wygrałeś ligę znajomych w zeszłym tygodniu! +50 🪙')),900);}

/* ---------- adding / removing ---------- */
function frCodeFmt(c){c=String(c||'').toUpperCase();return c.length===8?c.slice(0,4)+'-'+c.slice(4):c;}
const frClean=c=>String(c||'').toUpperCase().replace(/[^0-9A-Z]/g,'');
async function frAdd(code){
  code=frClean(code);if(!code){FR.msg=T2('Type your friend\'s code first.','Najpierw wpisz kod znajomego.');renderCourse();return;}
  if(!SUPA||!USER){try{localStorage.setItem('lg_friend_pending',code);}catch(e){}openAuth('up');return;}
  FR.msg='⏳';renderCourse();
  try{await frPush();const {data,error}=await SUPA.rpc('add_friend',{p_code:code});if(error)throw error;const r=data||{};
    if(r.ok){FR.msg='';sfxPop();_comboToastText(T2(`🏆 ${r.name} is now your friend!`,`🏆 ${r.name} jest teraz twoim znajomym!`));if(typeof burstConfetti==='function')burstConfetti();await frLoad(true);return;}
    FR.msg=r.why==='self'?T2('That\'s your own code 🙂','To twój własny kod 🙂'):r.why==='full'?T2(`You can have up to ${FR_MAX} friends.`,`Możesz mieć najwyżej ${FR_MAX} znajomych.`):
      r.why==='already'?T2('You are already friends!','Już jesteście znajomymi!'):T2('No one has this code. Check it and try again.','Nikt nie ma takiego kodu. Sprawdź go i spróbuj jeszcze raz.');}
  catch(e){FR.msg=_frErr(e)==='setup'?T2('Friends are not switched on yet.','Znajomi nie są jeszcze włączeni.'):_frErr(e);}
  renderCourse();}
async function frRemove(id){const r=frRanking().find(x=>x.id===id);if(!r||r.me)return;
  try{const {error}=await SUPA.rpc('remove_friend',{p_id:id});if(error)throw error;FR.rows=(FR.rows||[]).filter(x=>x.user_id!==id);
    _comboToastText(T2(`${r.name} removed`,`Usunięto: ${r.name}`));}catch(e){FR.msg=_frErr(e);}
  renderCourse();}
function frLink(){const m=frMe();return m?siteUrl()+'?friend='+m.code:'';}
async function frShare(){const m=frMe();if(!m)return;const url=frLink(),txt=T2(`Learn English with me on Leogrow! My friend code: ${frCodeFmt(m.code)}`,`Ucz się ze mną angielskiego w Leogrow! Mój kod znajomego: ${frCodeFmt(m.code)}`);
  if(navigator.share){try{await navigator.share({title:'Leogrow',text:txt,url});return;}catch(e){if(e&&e.name==='AbortError')return;}}
  frCopy(txt+' '+url,T2('📋 Invite copied — paste it to your friend','📋 Zaproszenie skopiowane — wklej je znajomemu'));}
function frCopy(t,ok){const done=()=>_comboToastText(ok||T2('📋 Copied','📋 Skopiowano'));
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(done,()=>{prompt('',t);});else{prompt('',t);}}

/* invite links: leogrow.netlify.app/?friend=CODE */
(function(){try{const q=new URLSearchParams(location.search),c=frClean(q.get('friend'));
  if(c){localStorage.setItem('lg_friend_pending',c);q.delete('friend');const s=q.toString();history.replaceState(null,'',location.pathname+(s?'?'+s:'')+location.hash);
    VIEW={track:'friends',level:null};}}catch(e){}})();
let _frPendingBusy=false;
function frPending(){let c=null;try{c=localStorage.getItem('lg_friend_pending');}catch(e){}
  if(!c||!SUPA||!USER||_frPendingBusy)return;_frPendingBusy=true;try{localStorage.removeItem('lg_friend_pending');}catch(e){}
  if(!activeLesson){VIEW={track:'friends',level:null};}frAdd(c).finally(()=>{_frPendingBusy=false;});}
(function(){const _ab=renderAccountBtn;renderAccountBtn=function(){const r=_ab.apply(this,arguments);
  if(USER&&SUPA){setTimeout(frPending,300);if(!FR.rows)setTimeout(()=>frLoad(),800);}else{FR.rows=null;}return r;};})();

/* ---------- pictures ---------- */
function frLeoImg(k,cls){const r=LEO_AGES[k]||LEO_AGES.kid||LEO_AGES.adult;return r&&r.h?`<img class="fr-leo ${cls||''}" src="${r.h}" alt="" draggable="false">`:'<span class="fr-leo">🐒</span>';}
function frLeoFull(k){const src=(typeof LEO_FULL!=='undefined'&&LEO_FULL[k])||(LEO_AGES[k]&&LEO_AGES[k].c)||(LEO_FULL&&LEO_FULL.kid);return `<img class="fr-full" src="${src}" alt="" draggable="false">`;}
const FR_MEDAL=['🥇','🥈','🥉'];

/* ---------- the Friends page ---------- */
function frPodium(rows){const top=rows.slice(0,3);while(top.length<3)top.push(null);
  const order=[1,0,2];
  return `<div class="fr-podium">${order.map(i=>{const r=top[i];
    if(!r)return `<div class="fr-step s${i+1} empty"><button class="fr-ghost" onclick="frFocusCode()">＋</button><b>${T2('Invite a friend','Zaproś znajomego')}</b><div class="fr-block"><span>${i+1}</span></div></div>`;
    return `<div class="fr-step s${i+1} ${r.me?'me':''}"><div class="fr-stand">${i===0?'<span class="fr-crown">👑</span>':''}${frLeoFull(r.leo)}</div><b>${_fe(r.name)}${r.me?` <small>(${T2('you','ty')})</small>`:''}</b><em>${r.xp} ${T2('pts','pkt')}</em><div class="fr-block"><span>${FR_MEDAL[i]}</span></div></div>`;}).join('')}</div>`;}
function frListHtml(rows){const max=Math.max(1,...rows.map(r=>r.xp));
  return rows.map(r=>`<div class="fr-row ${r.me?'me':''} ${r.rank<=3&&r.xp>0?'top':''}"><span class="fr-rank">${r.rank<=3&&r.xp>0?FR_MEDAL[r.rank-1]:r.rank}</span>${frLeoImg(r.leo)}
    <div class="fr-mid"><b>${_fe(r.name)}${r.me?` <small>${T2('you','ty')}</small>`:''}</b><div class="fr-bar"><i style="width:${r.xp/max*100}%"></i></div></div>
    <span class="fr-pts">${r.xp}<small>${T2('pts','pkt')}</small></span>${FR.edit&&!r.me?`<button class="fr-x" title="${T2('Remove','Usuń')}" onclick="frRemove('${r.id}')">✕</button>`:''}</div>`).join('');}
function frFocusCode(){const i=document.getElementById('frCode');if(i){i.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>i.focus(),350);}}
function frInviteHtml(){const m=frMe();
  return `<div class="panel fr-invite">${zoneTag(T2('INVITE','ZAPROŚ'))}
    <div class="fr-inv-grid"><div class="fr-mycode"><small>${T2('Your friend code','Twój kod znajomego')}</small>
      <b class="fr-code" onclick="frCopy('${m?frCodeFmt(m.code):''}')">${m?frCodeFmt(m.code):'····-····'}</b>
      <div class="fr-btns"><button class="btn btn-gold" onclick="frShare()" ${m?'':'disabled'}>📨 ${T2('Send invite link','Wyślij zaproszenie')}</button><button class="btn secondary" onclick="frCopy('${m?frCodeFmt(m.code):''}')" ${m?'':'disabled'}>📋 ${T2('Copy code','Kopiuj kod')}</button></div></div>
    <div class="fr-add"><small>${T2('Got a code from a friend?','Masz kod od znajomego?')}</small>
      <div class="fr-add-row"><input id="frCode" class="auth-in" maxlength="9" placeholder="ABCD-1234" autocomplete="off" autocapitalize="characters" spellcheck="false" onkeydown="if(event.key==='Enter')frAdd(this.value)"><button class="btn btn-gold" onclick="frAdd(document.getElementById('frCode').value)">${T2('Add','Dodaj')}</button></div>
      ${FR.msg?`<p class="fr-msg">${_fe(FR.msg)}</p>`:''}</div></div>
    <p class="fr-note">🔒 ${T2('Only friends you add can see your first name, your Leo and your weekly points. Nobody can find you without your code.','Tylko dodani znajomi widzą twoje imię, twojego Leo i punkty z tygodnia. Nikt cię nie znajdzie bez twojego kodu.')}</p></div>`;}
function friendsPageHtml(){
  const dl=weekDaysLeft(),left=dl===1?T2('Last day!','Ostatni dzień!'):T2(`${dl} days left`,`zostało ${dl} dni`);
  const hero=(inner)=>`<div class="panel fr-hero">${zoneTag(T2('FRIENDS LEAGUE','LIGA ZNAJOMYCH'))}<div class="fr-hero-top"><div><h2 class="title">${T2('Friends league','Liga znajomych')} 🏆</h2>
    <p class="sub">${T2('Learn with your friends. Every finished lesson gives you points. Most points by Sunday wins the week!','Ucz się ze znajomymi. Każda ukończona lekcja daje punkty. Kto do niedzieli zbierze najwięcej, wygrywa tydzień!')}</p></div><span class="ch-left">⏳ ${left}</span></div>${inner}</div>`;
  if(!frOn()) return hero(`<div class="fr-empty">${frLeoImg('kid','big')}<p>${T2('The friends league works on the Leogrow website when you are logged in.','Liga znajomych działa na stronie Leogrow, gdy jesteś zalogowany.')}</p></div>`);
  if(!USER) return hero(`<div class="fr-empty">${frLeoImg(frMyLeo(),'big')}<p><b>${T2('Log in to play with friends','Zaloguj się, by grać ze znajomymi')}</b><br>${T2('You need an account so your friends can see your points.','Potrzebujesz konta, żeby znajomi widzieli twoje punkty.')}</p>
    <div class="fr-btns"><button class="btn btn-gold" onclick="openAuth('up')">${T2('Create an account','Załóż konto')}</button><button class="btn secondary" onclick="openAuth('in')">${T2('Log in','Zaloguj się')}</button></div></div>`);
  if(FR.err==='setup') return hero(`<div class="fr-empty">${frLeoImg('kid','big')}<p>${T2('The friends league is almost ready — it will switch on soon.','Liga znajomych jest prawie gotowa — wkrótce się włączy.')}</p></div>`);
  if(!FR.rows){frLoad();return hero(`<div class="fr-empty"><p>⏳ ${T2('Loading your friends…','Wczytuję znajomych…')}</p></div>`);}
  frLoad();
  const rows=frRanking(),me=rows.find(r=>r.me),n=rows.length-1,lw=frLastWinner();
  let h=hero(frPodium(rows)+`<div class="fr-you"><b>${me&&n?T2(`You are #${me.rank}`,`Jesteś na ${me.rank}. miejscu`):T2('Your week','Twój tydzień')}</b><span>${me?me.xp:0} ${T2('pts this week','pkt w tym tygodniu')}</span>${!n?`<small>${T2('Add a friend to start racing!','Dodaj znajomego i zacznijcie wyścig!')}</small>`:rows[0]&&!rows[0].me&&me?`<small>${T2(`${rows[0].xp-me.xp+1} pts to take 1st place`,`${rows[0].xp-me.xp+1} pkt do 1. miejsca`)}</small>`:me&&me.xp>0&&n?`<small>${T2('You are in the lead! 🎉','Prowadzisz! 🎉')}</small>`:''}</div>`);
  if(lw) h+=`<div class="fr-last">🏆 <b>${T2('Last week\'s winner','Zwycięzca zeszłego tygodnia')}:</b> ${frLeoImg(lw.leo,'sm')} ${_fe(lw.name)}${lw.me?' ('+T2('you','ty')+')':''} · ${lw.last} ${T2('pts','pkt')}</div>`;
  h+=`<div class="panel fr-list">${zoneTag(T2('THIS WEEK','TEN TYDZIEŃ'))}<div class="fr-list-top"><h3>${T2('Ranking','Ranking')} · ${rows.length}</h3>${n?`<a href="#" onclick="FR.edit=!FR.edit;renderCourse();return false;">${FR.edit?T2('Done','Gotowe'):T2('Edit friends','Edytuj znajomych')}</a>`:''}</div>${frListHtml(rows)}
    <p class="fr-note">${T2('New week every Monday. The winner gets 50 🪙.','Nowy tydzień w każdy poniedziałek. Zwycięzca dostaje 50 🪙.')}</p></div>`;
  h+=frInviteHtml();
  if(FR.err&&FR.err!=='setup') h+=`<p class="fr-msg">${_fe(FR.err)}</p>`;
  return h;}

/* ---------- menu, phone strip, right column ---------- */
function frMyRank(){if(!FR.rows||!USER)return '';const me=frRanking().find(r=>r.me);return me&&FR.rows.length>1?'#'+me.rank:'';}
function frMobHtml(){const r=frMyRank();
  return `<a href="#" class="ch-mob fr-mob" onclick="nav('friends');return false;"><span class="fr-mob-ic">🏆</span><b>${T2('Friends league','Liga znajomych')}</b>${r?`<span>🏁 ${r}</span>`:''}<span class="rw-go">›</span></a>`;}
function frPanelHtml(){
  if(!frOn())return '';
  let body;
  if(!USER) body=`<p>${T2('Race your friends on weekly points.','Ścigaj się ze znajomymi na punkty.')}</p><button class="btn secondary sp-btn" onclick="nav('friends')">${T2('See how','Zobacz jak')} →</button>`;
  else if(!FR.rows||FR.rows.length<2) body=`<p>${T2('Invite a friend and race on weekly points.','Zaproś znajomego i ścigajcie się na punkty.')}</p><button class="btn secondary sp-btn" onclick="nav('friends')">🏆 ${T2('Add friends','Dodaj znajomych')}</button>`;
  else{const rows=frRanking(),me=rows.find(r=>r.me),top=rows.slice(0,3);if(me&&me.rank>3)top.push(me);
    body=top.map(r=>`<div class="fr-mini ${r.me?'me':''}"><span>${r.rank<=3&&r.xp>0?FR_MEDAL[r.rank-1]:r.rank}</span>${frLeoImg(r.leo,'sm')}<b>${_fe(r.name)}</b><em>${r.xp}</em></div>`).join('')
      +`<button class="btn secondary sp-btn" onclick="nav('friends')">${T2('See all','Zobacz wszystko')} →</button>`;}
  return `<div class="sp-card fr-sp" onclick="if(!event.target.closest('button'))nav('friends')"><div class="sp-head"><b>🏆 ${T2('Friends league','Liga znajomych')}</b><span class="sp-coins">${frMyRank()||'⏳ '+weekDaysLeft()+T2('d','d')}</span></div>${body}</div>`;}
(function(){
  const _rc=renderCourse;renderCourse=function(){
    if(VIEW.track==='friends'){document.body.classList.toggle('adult',!!(PROF()&&PROF().track==='adults'));
      $('courseView').innerHTML=courseShell(testerBar()+`<div class="crumbs"><a href="#" onclick="nav();return false;">🏠 Home</a><span>›</span><b>🏆 ${T2('Friends','Znajomi')}</b></div>`+friendsPageHtml());
      if(LANG==='pl'&&typeof applyLang==='function')applyLang();renderWallet();return;}
    _rc();
    if(!VIEW.track&&frOn()){const mb=document.querySelector('#courseView .ch-mob')||document.querySelector('#courseView .rw-mob');if(mb)mb.insertAdjacentHTML('afterend',frMobHtml());}};
  const _sn=sideNav;sideNav=function(){const h=_sn(),r=frMyRank();
    const it=`<a href="#" class="sn-item ${VIEW.track==='friends'?'on':''}" onclick="nav('friends');return false;"><span>🏆</span><b>${T2('Friends','Znajomi')}</b>${r?`<small>${r}</small>`:''}</a>`;
    const i=h.indexOf(`<b>${T2('Chests','Skrzynie')}</b>`);if(i>=0){const e=h.indexOf('</a>',i)+4;return h.slice(0,e)+it+h.slice(e);}return h.replace('</aside>',it+'</aside>');};
  const _sp=sidePanels;sidePanels=function(){const h=_sp(),card=frPanelHtml();if(!card)return h;const k=h.indexOf('ch-sp');
    if(k<0)return h+card;const e=h.indexOf('<div class="sp-card',k);return e<0?h+card:h.slice(0,e)+card+h.slice(e);};
})();
Object.assign(PL_UI,{"🏆 Friends":"🏆 Znajomi"});
