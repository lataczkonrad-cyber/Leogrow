/* =====================================================================
   Extra step types (from the standalone lessons): dialogue, dictation, townmap, unittest.
   State is per step index, so it is cleared whenever a lesson opens.
   ===================================================================== */
(function(){
const SX={};                      // state per step
const st=(i,init)=>SX[i]||(SX[i]=init());
function rp(){const y=window.scrollY;setPanel(renderZone(current));try{emojify($('panel'));}catch(e){}window.scrollTo(0,y);}
window.SH_rp=rp;
const _olx=openLesson;openLesson=function(){for(const k in SX)delete SX[k];try{clearInterval(UT_TICK);}catch(e){}return _olx.apply(this,arguments);};
function voiceEn(){try{const v=speechSynthesis.getVoices();return v.filter(x=>/^en[-_]GB/i.test(x.lang)).concat(v.filter(x=>/^en/i.test(x.lang)));}catch(e){return [];}}
function say(text,opt){opt=opt||{};try{
  if(!opt.queue)speechSynthesis.cancel();
  if(!opt.slow&&!opt.pitch&&!opt.queue&&typeof speak==='function'){speak(text);return;}
  const u=new SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=opt.slow?0.6:0.9;u.pitch=opt.pitch||1;
  const vs=voiceEn();if(vs.length)u.voice=vs[(opt.voice||0)%Math.min(vs.length,3)];
  if(opt.onend)u.onend=opt.onend;speechSynthesis.speak(u);}catch(e){}}
const nrm=s=>norm(String(s||'').replace(/[,;:"“”]/g,'').replace(/[‘’]/g,"'"));

/* ---- dialogue ---- */
function dlRender(i){const z=zones[i],s=st(i,()=>({show:!z.hide,playing:-1}));const names=Object.keys(z.cast);
  const rows=z.lines.map(([who,t],k)=>{const side=names.indexOf(who)%2?'r':'l';
    return `<div class="shd-row ${side}${s.playing===k?' on':''}"><div class="shd-av">${z.cast[who]||'🙂'}</div><div class="shd-bub"><b>${who}</b><span>${s.show?t:'<i class="shd-hid">• • • • • • • •</i>'}</span></div><button class="shd-say" onclick="SH_dlSay(${i},${k})" aria-label="Listen">🔊</button></div>`;}).join('');
  return `${zoneTag(z.hide?'LISTENING':'DIALOGUE')}<h2 class="title">${z.title}</h2><p class="sub">${z.sub||''}</p>
  <div class="shd-tools"><button class="btn btn-gold" onclick="SH_dlAll(${i})">▶ Play the whole dialogue</button>${z.hide?`<button class="btn secondary" onclick="SH_dlShow(${i})">${s.show?'🙈 Hide the text':'👀 Show the text'}</button>`:''}</div>
  <div class="shd">${rows}</div>${navRow(true)}`;}
window.SH_dlSay=(i,k)=>{const z=zones[i],names=Object.keys(z.cast),[who,t]=z.lines[k];say(t,{voice:names.indexOf(who),pitch:[1,1.15,0.9,1.25,0.8][names.indexOf(who)%5]});};
window.SH_dlShow=i=>{const s=st(i,()=>({}));s.show=!s.show;rp();};
window.SH_dlAll=i=>{const z=zones[i],names=Object.keys(z.cast),s=st(i,()=>({}));try{speechSynthesis.cancel();}catch(e){}
  const mark=k=>{s.playing=k;document.querySelectorAll('.shd-row').forEach((r,j)=>r.classList.toggle('on',j===k));const r=document.querySelectorAll('.shd-row')[k];if(r&&r.scrollIntoView)r.scrollIntoView({block:'nearest',behavior:'smooth'});};
  z.lines.forEach(([who,t],k)=>{const u=new SpeechSynthesisUtterance(t);u.lang='en-GB';u.rate=0.9;const n=names.indexOf(who);u.pitch=[1,1.15,0.9,1.25,0.8][n%5];const vs=voiceEn();if(vs.length)u.voice=vs[n%Math.min(vs.length,3)];u.onstart=()=>mark(k);if(k===z.lines.length-1)u.onend=()=>mark(-1);try{speechSynthesis.speak(u);}catch(e){}});};

/* ---- dictation ---- */
function dcRender(i){const z=zones[i],s=st(i,()=>({v:{},r:{}}));const done=z.items.filter((_,k)=>s.r[k]==='ok'||s.r[k]==='shown').length;
  return `${zoneTag('DICTATION')}<h2 class="title">${z.title}</h2><p class="sub">${z.sub}</p>`+z.items.map((it,k)=>{const r=s.r[k];
   return `<div class="gap-card shdc" style="text-align:left;"><div class="shdc-top"><span class="shdc-n">${k+1}</span><button class="shd-say big" onclick="SH_dcSay(${i},${k})">🔊</button><button class="shd-say big" onclick="SH_dcSay(${i},${k},1)" title="slowly">🐢</button></div>
   <input type="text" class="gap-input ${r==='ok'?'correct':r==='shown'?'shown':r==='bad'?'wrong':''}" id="shdc-${i}-${k}" style="width:100%;box-sizing:border-box;" placeholder="Type what you hear…" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(s.v[k]||'')}" ${r==='ok'||r==='shown'?'disabled':''} onkeydown="if(event.key==='Enter')SH_dcCheck(${i},${k})">
   <div style="margin-top:6px;"><button class="gap-check" onclick="SH_dcCheck(${i},${k})">Check</button><button class="gap-show-btn" onclick="SH_dcShow(${i},${k})">Show answer</button></div>
   <div class="gap-msg ${r==='ok'?'ok':r==='bad'?'bad':''}">${r==='ok'?'Perfect! ✅':r==='shown'?'Answer: <b>'+esc(it.en)+'</b>':r==='bad'?'Not quite — listen again 🔄':''}</div></div>`;}).join('')+
   `<p class="sub" style="text-align:center;">${done} / ${z.items.length} done</p>${navRow(true)}`;}
window.SH_dcSay=(i,k,slow)=>say(zones[i].items[k].en,{slow:!!slow});
function dcFinish(i){const z=zones[i],s=SX[i];if(z.items.every((_,k)=>s.r[k]==='ok'||s.r[k]==='shown')&&!s.rec){s.rec=1;recordZoneStars(z.items.filter((_,k)=>s.first[k]).length,z.items.length);}}
window.SH_dcCheck=(i,k)=>{const z=zones[i],s=st(i,()=>({v:{},r:{}}));s.first=s.first||{};const el=$('shdc-'+i+'-'+k);if(!el||el.disabled)return;s.v[k]=el.value;
  if(nrm(el.value)===nrm(z.items[k].en)){if(s.r[k]!=='bad'){s.first[k]=1;}s.r[k]='ok';addScore(5);sfxCorrect();}else{s.r[k]='bad';sfxWrong();}
  rp();dcFinish(i);};
window.SH_dcShow=(i,k)=>{const s=st(i,()=>({v:{},r:{}}));s.first=s.first||{};const el=$('shdc-'+i+'-'+k);if(el&&!el.disabled){s.v[k]=zones[i].items[k].en;s.r[k]='shown';rp();dcFinish(i);}};

/* ---- town map ---- */
function tmRender(i){const z=zones[i],s=st(i,()=>({k:0,ok:0,miss:false,wrong:null,right:null}));
  if(s.k>=z.qs.length){if(!s.rec){s.rec=1;recordZoneStars(s.ok,z.qs.length);}return `${zoneTag('TOWN MAP')}<h2 class="title">Great map reading! 🗺️</h2><p class="sub">Score: <b>${s.ok} / ${z.qs.length}</b></p>${tmMap(z,s,true)}${navRow(true)}`;}
  const q=z.qs[s.k];
  return `${zoneTag('TOWN MAP')}<h2 class="title">${z.title}</h2><p class="sub">${z.sub}</p>
  <div class="shm-q"><span class="shm-qn">${s.k+1} / ${z.qs.length}</span><b>${q.q}</b><button class="shd-say" onclick="SH_tmSay(${i})">🔊</button></div>${tmMap(z,s)}${navRow(true)}`;}
function tmShop(i,[n,e],s,end){const cls=s.right===n?' ok':s.wrong===n?' bad':'';
  return `<button class="shm-shop${cls}" ${end?'disabled':''} onclick="SH_tmPick(${i},'${n.replace(/'/g,"\\'")}')"><span class="shm-roof"></span><span class="shm-e">${e}</span><span class="shm-n">${n}</span></button>`;}
function tmMap(z,s,end){const i=current;
  return `<div class="shm"><div class="shm-row">${z.top.map(x=>tmShop(i,x,s,end)).join('')}</div><div class="shm-road"><span>Market Street</span></div><div class="shm-row">${z.bottom.map(x=>tmShop(i,x,s,end)).join('')}</div></div>`;}
window.SH_tmSay=i=>{const s=SX[i];say(zones[i].qs[s.k].q);};
window.SH_tmPick=(i,n)=>{const z=zones[i],s=SX[i];if(s.lock)return;const q=z.qs[s.k];
  if(n===q.a){s.right=n;s.wrong=null;if(!s.miss){s.ok++;addScore(5);}sfxCorrect();s.lock=1;rp();setTimeout(()=>{s.k++;s.miss=false;s.right=null;s.lock=0;rp();},850);}
  else{s.wrong=n;s.miss=true;sfxWrong();rp();}};

/* ---- unit test ---- */
let UT_TICK=null;
function utAll(z){const a=[];z.sections.forEach((sec,si)=>sec.qs.forEach((q,qi)=>a.push({q,si,qi,id:si+'-'+qi})));return a;}
function utRender(i){const z=zones[i],s=st(i,()=>({phase:'intro',a:{},order:{}})),all=utAll(z);
  if(s.phase==='intro')return `${zoneTag('UNIT TEST')}<h2 class="title">${z.title}</h2><p class="sub">${all.length} questions in ${z.sections.length} parts · ${z.minutes} minutes. You can't check answers until the end — then you see your score for each part.</p>
   <div class="reading-box"><p>${z.sections.map(x=>`<span class="lesson-chip">${x.name} · ${x.qs.length}</span>`).join(' ')}</p><p style="margin-top:10px;">⏱️ The clock starts when you tap <b>Start the test</b>. When the time is up, the test finishes on its own.</p><p>🎧 In the listening part, tap 🔊 to hear each recording (as many times as you like).</p></div>
   <div class="nav-row"><button class="btn secondary" onclick="go(current-1)">← Back</button><button class="btn btn-gold" onclick="SH_utStart(${i})">Start the test ⏱️</button></div>`;
  const done=s.phase==='done';
  let h=`${zoneTag('UNIT TEST')}<div class="sht-bar"><b>${z.title}</b><span id="shtClock" class="sht-clock">${done?'✔ Finished':utClock(s)}</span></div>`;
  if(done){const tot=all.length,ok=all.filter(x=>s.res[x.id]).length,p=Math.round(100*ok/tot);
    h+=`<div class="sht-score"><div class="sht-ring" style="--p:${p}"><b>${p}%</b></div><div><b>${ok} / ${tot} correct</b><span>${p>=90?'Excellent! You know this unit really well. 🏆':p>=70?'Good work! Look again at the red answers. 👍':'Have another look at the grammar boxes, then try again. 💪'}</span></div></div>
    <div class="sht-parts">${z.sections.map((sec,si)=>{const q=all.filter(x=>x.si===si),o=q.filter(x=>s.res[x.id]).length;return `<div><span>${sec.name}</span><i><em style="width:${Math.round(100*o/q.length)}%"></em></i><b>${o}/${q.length}</b></div>`;}).join('')}</div>`;}
  let n=0;
  z.sections.forEach((sec,si)=>{h+=`<h3 class="sht-sec">${sec.name}</h3>`;sec.qs.forEach((q,qi)=>{n++;const id=si+'-'+qi,v=s.a[id],res=done?(s.res[id]?' ok':' bad'):'';
    h+=`<div class="sht-q${res}"><p><span class="sht-n">${n}</span>${q.say?`<button class="shd-say" onclick="SH_utSay(${i},${si},${qi})">🔊</button> `:''}${q.q}</p>`;
    if(q.type==='type'){h+=`<input type="text" class="gap-input" style="width:100%;max-width:340px;box-sizing:border-box;" autocomplete="off" autocapitalize="off" spellcheck="false" ${done?'disabled':''} value="${esc(v||'')}" oninput="SH_utType(${i},'${id}',this.value)">${done&&!s.res[id]?`<div class="gap-msg ok">✔ ${esc(q.answers[0])}</div>`:''}`;}
    else{const ord=s.order[id]||(s.order[id]=shuffle(q.opts.map((_,k)=>k)));
      h+=`<div class="sht-opts">${ord.map(k=>`<button class="sht-opt${v===k?' on':''}${done&&k===q.correct?' right':''}${done&&v===k&&k!==q.correct?' wrong':''}" ${done?'disabled':''} onclick="SH_utPick(${i},'${id}',${k})">${q.opts[k]}</button>`).join('')}</div>`;}
    h+=`</div>`;});});
  const left=all.filter(x=>s.a[x.id]==null||s.a[x.id]==='').length;
  h+=done?`<div class="nav-row"><button class="btn secondary" onclick="SH_utAgain(${i})">🔁 Take the test again</button><button class="btn btn-gold" onclick="go(current+1)">Finish the lesson →</button></div>`
   :`<div class="nav-row"><button class="btn secondary" onclick="go(current-1)">← Back</button><button class="btn btn-gold" onclick="SH_utEnd(${i})">✔ Finish the test${left?` (${left} empty)`:''}</button></div>`;
  return h;}
function utClock(s){const r=Math.max(0,Math.round((s.end-Date.now())/1000));return '⏱️ '+Math.floor(r/60)+':'+String(r%60).padStart(2,'0');}
window.SH_utStart=i=>{const z=zones[i],s=SX[i];s.phase='run';s.end=Date.now()+z.minutes*60000;clearInterval(UT_TICK);
  UT_TICK=setInterval(()=>{const c=$('shtClock');if(s.phase!=='run'){clearInterval(UT_TICK);return;}if(Date.now()>=s.end){if(current===i)SH_utEnd(i);else s.timeUp=1;return;}if(c)c.textContent=utClock(s);},1000);rp();window.scrollTo({top:0});};
window.SH_utPick=(i,id,k)=>{SX[i].a[id]=k;sfxPop&&sfxPop();rp();};
window.SH_utType=(i,id,v)=>{SX[i].a[id]=v;};
window.SH_utSay=(i,si,qi)=>say(zones[i].sections[si].qs[qi].say);
window.SH_utEnd=i=>{const z=zones[i],s=SX[i];clearInterval(UT_TICK);s.phase='done';s.res={};let ok=0;const all=utAll(z);
  all.forEach(x=>{const v=s.a[x.id];const r=x.q.type==='type'?(v!=null&&x.q.answers.map(nrm).includes(nrm(v))):v===x.q.correct;s.res[x.id]=r;if(r)ok++;});
  addScore(ok*3);recordZoneStars(ok,all.length);if(ok/all.length>=0.9){try{burstConfetti();sfxBigWin();}catch(e){}}rp();window.scrollTo({top:0,behavior:'smooth'});};
window.SH_utAgain=i=>{delete SX[i];rp();};

/* ---- plug the new types into the engine ---- */
['dictation','townmap','unittest'].forEach(t=>GRADED.add(t));
const _rz=renderZone;
renderZone=function(i){const z=zones[i];
  if(z&&z.type==='dialogue')return dlRender(i);
  if(z&&z.type==='dictation')return dcRender(i);
  if(z&&z.type==='townmap')return tmRender(i);
  if(z&&z.type==='unittest'){const s=SX[i];if(s&&s.phase==='run'&&s.timeUp){SH_utEnd(i);}return utRender(i);}
  return _rz.apply(this,arguments);};
const _zt=zoneTasks;
zoneTasks=function(z){if(z.type==='dialogue')return Math.ceil(z.lines.length/2)+(z.hide?3:0);if(z.type==='townmap')return z.qs.length;if(z.type==='dictation')return z.items.length*2;if(z.type==='unittest')return Math.round(z.minutes*60/11);return _zt(z);};

const css=document.createElement('style');css.textContent=`
.shd{display:flex;flex-direction:column;gap:10px;margin:12px 0 4px}
.shd-tools{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:4px 0 6px}
.shd-row{display:flex;align-items:flex-end;gap:8px;max-width:92%}
.shd-row.r{flex-direction:row-reverse;align-self:flex-end}
.shd-av{font-size:30px;line-height:1;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:#fff3d6;border:2px solid #ecb83a;border-radius:50%;flex:none}
.shd-av img{width:30px;height:30px}
.shd-bub{background:#fff;border:2px solid #e4e1f0;border-radius:18px 18px 18px 6px;padding:8px 14px;box-shadow:0 2px 0 #e4e1f0;text-align:left}
.shd-row.r .shd-bub{background:#f1f3ff;border-color:#c9cff5;border-radius:18px 18px 6px 18px}
.shd-bub b{display:block;font-size:12px;color:#8b6b10;letter-spacing:.3px}
.shd-bub span{font-size:16px;font-weight:600;color:#050a30}
.shd-row.on .shd-bub{border-color:#ecb83a;box-shadow:0 0 0 3px #ffd87388}
.shd-hid{color:#b9b6c9;letter-spacing:2px;font-style:normal}
.shd-say{border:none;background:#050a30;color:#fff;border-radius:50%;width:36px;height:36px;font-size:16px;cursor:pointer;flex:none;display:inline-flex;align-items:center;justify-content:center;vertical-align:middle}
.shd-say.big{width:44px;height:44px;font-size:20px;margin-right:6px}
.shd-say:active{transform:scale(.93)}
.shdc-top{display:flex;align-items:center;gap:4px;margin-bottom:8px}
.shdc-n{font-family:'Baloo 2',sans-serif;font-weight:800;color:#050a30;background:#ffd873;border-radius:10px;padding:2px 10px;margin-right:8px}
.shm-q{display:flex;align-items:center;gap:10px;background:#050a30;color:#fff;border-radius:16px;padding:12px 14px;margin:10px 0 12px;font-size:17px}
.shm-q b{flex:1}.shm-q .shd-say{background:#ecb83a;color:#050a30}
.shm-qn{font-size:12px;font-weight:800;color:#ecb83a;white-space:nowrap}
.shm{background:#e9f4e4;border-radius:20px;padding:12px 10px;border:2px solid #cfe3c6}
.shm-row{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.shm-road{background:#4a4f63;border-radius:10px;margin:12px 0;height:46px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.shm-road::before{content:"";position:absolute;left:0;right:0;top:50%;border-top:4px dashed #ffd873;opacity:.8}
.shm-road span{position:relative;background:#4a4f63;color:#fff;font-weight:800;font-size:12px;padding:2px 10px;border-radius:8px;letter-spacing:.5px}
.shm-shop{position:relative;border:2px solid #d8d4e6;background:#fffdf8;border-radius:10px 10px 8px 8px;padding:20px 4px 8px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:inherit;min-height:96px;transition:transform .12s}
.shm-shop:hover{transform:translateY(-2px)}
.shm-roof{position:absolute;top:0;left:0;right:0;height:14px;border-radius:8px 8px 0 0;background:repeating-linear-gradient(90deg,#ecb83a 0 12px,#fff3d6 12px 24px)}
.shm-row:last-child .shm-roof{background:repeating-linear-gradient(90deg,#050a30 0 12px,#c9cff5 12px 24px)}
.shm-e{font-size:30px;line-height:1}.shm-e img{width:34px;height:34px}
.shm-n{font-size:12px;font-weight:800;color:#050a30;line-height:1.15;text-align:center}
.shm-shop.ok{background:#dff6e3;border-color:#2fa84f;transform:scale(1.05)}
.shm-shop.bad{background:#ffe3e3;border-color:#e0475b;animation:shmShake .35s}
@keyframes shmShake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
@media(max-width:560px){.shm-row{gap:4px}.shm-shop{padding:18px 2px 6px;min-height:84px}.shm-e{font-size:24px}.shm-e img{width:26px;height:26px}.shm-n{font-size:10px}}
.sht-bar{position:sticky;top:64px;z-index:5;display:flex;justify-content:space-between;align-items:center;background:#050a30;color:#fff;border-radius:14px;padding:10px 14px;margin:6px 0 12px}
.sht-clock{font-weight:800;color:#ffd873;font-variant-numeric:tabular-nums}
.sht-sec{font-family:'Baloo 2',sans-serif;color:#050a30;margin:18px 0 6px;border-bottom:3px solid #ecb83a;display:inline-block}
.sht-q{background:#fff;border:2px solid #e4e1f0;border-radius:14px;padding:10px 12px;margin:8px 0;text-align:left}
.sht-q p{margin:0 0 8px;font-weight:700;font-size:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.sht-q.ok{border-color:#2fa84f;background:#f3fbf4}.sht-q.bad{border-color:#e0475b;background:#fff6f6}
.sht-n{background:#fff3d6;border:2px solid #ecb83a;border-radius:8px;font-size:12px;font-weight:800;padding:0 7px;color:#050a30}
.sht-opts{display:flex;flex-wrap:wrap;gap:8px}
.sht-opt{border:2px solid #d8d4e6;background:#fbf9f4;border-radius:12px;padding:8px 12px;font:inherit;font-weight:700;cursor:pointer;color:#050a30}
.sht-opt.on{border-color:#050a30;background:#050a30;color:#fff}
.sht-opt.right{border-color:#2fa84f;background:#dff6e3;color:#14532d}
.sht-opt.wrong{border-color:#e0475b;background:#ffe3e3;color:#7f1d1d;text-decoration:line-through}
.sht-score{display:flex;align-items:center;gap:16px;background:#fff3d6;border:2px solid #ecb83a;border-radius:18px;padding:14px;margin-bottom:10px;text-align:left}
.sht-score span{display:block;font-size:14px;margin-top:4px}
.sht-ring{--p:0;width:84px;height:84px;border-radius:50%;flex:none;background:conic-gradient(#ecb83a calc(var(--p)*1%),#e4e1f0 0);display:flex;align-items:center;justify-content:center}
.sht-ring b{background:#fff;width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;color:#050a30}
.sht-parts{display:grid;gap:6px;margin:6px 0 8px}
.sht-parts div{display:grid;grid-template-columns:130px 1fr 44px;align-items:center;gap:8px;font-weight:700;font-size:14px;text-align:left}
.sht-parts i{height:10px;background:#e4e1f0;border-radius:6px;overflow:hidden}.sht-parts em{display:block;height:100%;background:#ecb83a}
`;document.head.appendChild(css);
})();

