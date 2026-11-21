/* ---------- Streak reminders by push: they arrive even when Leogrow is fully closed ----------
   Turning on the daily reminder also subscribes this device to push (Android, PC, and iPhone/iPad once Leogrow is on the Home Screen).
   The server (netlify/functions/push-remind.mjs) sends at the chosen time if today's goal isn't reached yet.
   The app keeps the server up to date: time, goal, streak, and whether today's goal is done. */
const PUSH_FN='/.netlify/functions/push';
const pushSupported=()=>window.isSecureContext&&/^https?:$/.test(location.protocol)&&'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;
function _b64ToBytes(s){s=s.replace(/-/g,'+').replace(/_/g,'/');const r=atob(s+'='.repeat((4-s.length%4)%4));return Uint8Array.from(r,c=>c.charCodeAt(0));}
function _lastDay(pred){const ks=[...activeSet()].filter(k=>k<=localDay()&&pred(k)).sort();return ks.pop()||'';}
function pushStateNow(){const c=reminderCfg();let tz='Europe/Warsaw';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||tz;}catch(e){}
  return {on:c.on,time:c.time,tz,lang:LANG,goal:goalMin(),streak:streakOf(C.days),active_day:_lastDay(()=>true),done_day:todayRec().g?localDay():''};}
async function _pushToken(){try{if(typeof SUPA!=='undefined'&&SUPA&&USER){const {data}=await SUPA.auth.getSession();return data.session&&data.session.access_token||'';}}catch(e){}return '';}
async function _pushSub(make){
  const reg=await navigator.serviceWorker.ready;let sub=await reg.pushManager.getSubscription();
  if(sub||!make)return sub;
  const r=await fetch(PUSH_FN);const j=await r.json();if(!r.ok||!j.key)throw new Error(j.error||'no key');
  return reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:_b64ToBytes(j.key)});
}
async function _pushSave(sub,test){
  const tok=await _pushToken(),state=pushStateNow();
  const r=await fetch(PUSH_FN,{method:'POST',headers:Object.assign({'Content-Type':'application/json'},tok?{Authorization:'Bearer '+tok}:{}),body:JSON.stringify({action:'save',sub:sub.toJSON(),state,test:!!test})});
  const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||('push '+r.status));
  try{localStorage.setItem('leogrowPushSent',JSON.stringify({k:JSON.stringify(state),at:Date.now()}));localStorage.setItem('leogrowPush','on');}catch(e){}
  return j;
}
/* called after the reminder is switched on (from the tap, so iPhone allows it) */
async function pushSubscribe(){
  clearTimeout(_pushT);if(!pushSupported()||Notification.permission!=='granted')return false;
  try{const sub=await _pushSub(true);await _pushSave(sub,true);return true;}
  catch(e){console.warn('Leogrow push:',e);try{localStorage.setItem('leogrowPush','fail');}catch(_){}return false;}
}
async function pushOff(){
  try{localStorage.removeItem('leogrowPush');localStorage.removeItem('leogrowPushSent');}catch(e){}
  if(!pushSupported())return;
  try{const sub=await _pushSub(false);if(!sub)return;
    await fetch(PUSH_FN,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'off',endpoint:sub.endpoint})}).catch(()=>{});
    await sub.unsubscribe();}catch(e){}
}
/* keep the server's copy fresh, but only send when something changed (or once every 6 hours) */
let _pushT=0;
function pushSync(){
  clearTimeout(_pushT);
  _pushT=setTimeout(async()=>{
    const c=reminderCfg();if(!c.on||!pushSupported()||Notification.permission!=='granted')return;
    let last={};try{last=JSON.parse(localStorage.getItem('leogrowPushSent')||'{}');}catch(e){}
    if(last.k===JSON.stringify(pushStateNow())&&Date.now()-(last.at||0)<6*3600e3)return;
    try{const sub=await _pushSub(true);if(sub)await _pushSave(sub,false);}catch(e){console.warn('Leogrow push sync:',e);}
  },1500);
}
/* hook into the existing reminder settings */
const _enableRemOld=enableReminder;
enableReminder=async function(){
  const had=reminderCfg().on;await _enableRemOld();
  if(reminderCfg().on&&!had){const ok=await pushSubscribe();if(!ok&&pushSupported())_comboToastText(T2('🔔 Reminders work while Leogrow is open. For closed-app reminders, try again later.','🔔 Przypomnienia działają, gdy Leogrow jest otwarty. Dla zamkniętej aplikacji spróbuj później.'));if(!activeLesson&&document.getElementById('remTime'))openHabits();}
};
const _setRemOnOld=setReminderOn;
setReminderOn=function(on){_setRemOnOld(on);if(!on)pushOff();};
const _pushStateOld=pushReminderState;
pushReminderState=function(){_pushStateOld();pushSync();};
/* a phone that had the reminder on before push existed gets subscribed quietly (permission is already granted) */
setTimeout(()=>{try{if(reminderCfg().on&&!localStorage.getItem('leogrowPush')&&pushSupported()&&Notification.permission==='granted')pushSubscribe();}catch(e){}},6000);
/* clearer note in the goal & reminder window */
const _openHabitsOld=openHabits;
openHabits=function(){
  _openHabitsOld();const n=document.querySelector('#authModal .rem-note');if(!n)return;
  if(isIOS&&!isStandalone())n.innerHTML=T2('On iPhone and iPad, reminders work once Leogrow is on your Home Screen: tap <b>Share</b> ⬆️ then <b>Add to Home Screen</b>, open Leogrow from there and turn reminders on. The calendar reminder works everywhere.','Na iPhonie i iPadzie przypomnienia działają, gdy Leogrow jest na ekranie początkowym: stuknij <b>Udostępnij</b> ⬆️, potem <b>Do ekranu początkowego</b>, otwórz Leogrow stamtąd i włącz przypomnienia. Przypomnienie w kalendarzu działa wszędzie.');
  else if(reminderCfg().on&&Notification.permission==='granted'){let p='';try{p=localStorage.getItem('leogrowPush')||'';}catch(e){}
    n.textContent=p==='on'?T2('🔔 Leo reminds you at this time, even when the app is closed, only if today\'s goal isn\'t done yet.','🔔 Leo przypomni o tej godzinie, nawet gdy aplikacja jest zamknięta, tylko jeśli dzisiejszy cel nie jest zrobiony.'):n.textContent;}
};
