/* ---------- Leogrow Business (2026-11-24): a premium Business English section ----------
   Its own page (VIEW.track==='business') with 12 units from B1 to C1; the content is in biz_content.js.
   The exercise types follow the user's own "Presentation Signposting" lesson: model text with the key
   phrases highlighted, flip phrase cards (English → Polish), language notes, situation quiz (A/B/C),
   word-bank text, listen & choose, match, put in order, and a speaking or writing task with a self-check.
   It is part of Premium (the first lesson is a free preview). It is calm on purpose: no coins, confetti,
   bonus pop-ups or sound effects for answers, and Leo only appears once, small, on the section page. */
const BZ_UNITS=[], BZ_LESSONS=[];
const BZ_LV={B1:['Working in English','Angielski w pracy'],B2:['Leading the conversation','Prowadzisz rozmowę'],C1:['Influence and precision','Wpływ i precyzja']};
const BZ_FREE=1;                       // how many lessons (from the start of unit 1) are a free preview
let BZS={}, BZR={}, BZ_F='all';        // exercise state per step, results per step, level filter on the page
const bzOn=()=>!!(activeLesson&&activeLesson.biz);
const bzT=(en,pl)=>(typeof LANG!=='undefined'&&LANG==='pl')?pl:en;
const bzSay=t=>String(t).replace(/\[\[[^|\]]+\|([^\]]+)\]\]/g,'$1').replace(/\s*\(…\)|…|\.\.\./g,' ').replace(/\s*\/\s*/g,' or ').replace(/\s+/g,' ').trim();
function bzSpeak(t){try{if('speechSynthesis' in window)speechSynthesis.cancel();}catch(e){}if(typeof speak==='function')speak(bzSay(t));}
const BZ_ICON={
  play:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  ear:'<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
  mic:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg>',
  stop:'<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>',
  check:'<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  lock:'<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1zm2 0h6V8a3 3 0 0 0-6 0v2z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

/* ---------- build the units and lessons from biz_content.js ---------- */
function bzPhr(L){return L.groups.flatMap(g=>g[1].map(p=>({tag:p[0],en:p[1],note:p[2]||'',pl:p[3]||''})));}
function bzPick(a,n){return shuffle(a.slice()).slice(0,n);}
function bzZones(L){
  const P=bzPhr(L), z=[];
  if(L.sample) z.push({type:'bz-sample',label:'Model',d:L.sample});
  L.groups.forEach(g=>z.push({type:'bz-phrases',label:g[0],h:g[0],p:g[1].map(p=>({tag:p[0],en:p[1],note:p[2]||'',pl:p[3]||''}))}));
  if(L.note) z.push({type:'bz-note',label:'Language note',d:L.note});
  z.push({type:'bz-match',label:'Match',pairs:bzPick(P,6)});
  z.push({type:'bz-listen',label:'Listen',items:bzPick(P,6),pool:P});
  z.push({type:'bz-choose',label:'Choose the best',items:L.mc});
  if(L.bank) z.push({type:'bz-bank',label:'Complete the text',d:L.bank});
  if(L.order) z.push({type:'bz-order',label:'Put in order',d:L.order});
  if(L.task) z.push({type:'bz-task',label:L.task.kind==='write'?'Writing task':'Speaking task',d:L.task});
  return z;
}
function bzTest(u,S){
  const P=S.lessons.flatMap(bzPhr), mc=S.lessons.flatMap(L=>L.mc);
  const z=[{type:'bz-choose',label:'Situations',items:bzPick(mc,15)},
    {type:'bz-listen',label:'Listening',items:bzPick(P,8),pool:P},
    {type:'bz-match',label:'Phrases',pairs:bzPick(P,6)}];
  S.lessons.forEach((L,i)=>{if(L.bank)z.push({type:'bz-bank',label:'Text '+(i+1),d:L.bank});});
  return {id:u.id+'test',biz:true,test:true,unit:u,num:u.n+'.T',title:u.title+' — Unit test',emoji:'',
    intro:bzT('A longer check of the whole unit: situations, listening, phrases and every text from the lessons. Take your time.','Dłuższy test z całego działu: sytuacje, słuchanie, zwroty i wszystkie teksty z lekcji. Nie spiesz się.'),zones:z};
}
(function bzMake(){
  if(typeof BIZ_UNITS_SRC==='undefined')return;
  BIZ_UNITS_SRC.forEach((S,ui)=>{
    const u={id:S.id,level:S.level,track:'business',title:S.title,sub:S.sub,subPl:S.subPl||'',emoji:'',badge:S.title,n:ui+1,biz:true,lessons:[]};
    S.lessons.forEach((L,li)=>u.lessons.push({id:S.id+'l'+(li+1),biz:true,unit:u,num:u.n+'.'+(li+1),title:L.t,emoji:'',intro:L.intro,zones:bzZones(L)}));
    u.lessons.push(bzTest(u,S));
    BZ_UNITS.push(u);BZ_LESSONS.push(...u.lessons);
  });
})();
const bzLesson=id=>BZ_LESSONS.find(l=>l.id===id);
const bzFreeLesson=l=>BZ_LESSONS.indexOf(l)>-1&&BZ_LESSONS.indexOf(l)<BZ_FREE;
const bzPrem=()=>typeof isPremium!=='function'||isPremium();
function bzMinutes(l){const t=l.zones.reduce((s,z)=>s+(z.type==='bz-choose'?z.items.length*.35:({'bz-sample':2,'bz-phrases':2,'bz-note':1.5,'bz-match':1.5,'bz-listen':1.5,'bz-bank':3,'bz-order':2,'bz-task':6}[z.type]||1)),0);return Math.max(5,Math.round(t));}
function bzLessonsOf(lv){return BZ_UNITS.filter(u=>!lv||lv==='all'||u.level===lv).flatMap(u=>u.lessons);}
const bzNext=()=>BZ_LESSONS.find(l=>!lessonDone(l.id))||null;

/* ---------- lesson steps ---------- */
function bzState(i,init){const k=activeLesson.id+':'+i;if(!BZS[k])BZS[k]=init();return BZS[k];}
function bzPaint(){const p=$('panel'),y=window.scrollY,py=p?p.scrollTop:0;setPanel(renderZone(current));if(p)p.scrollTop=py;window.scrollTo(0,y);}
function bzRecord(i,ok,n){BZR[i]=[ok,n];recordZoneStars(ok,n);}
function bzHead(tag,title,sub){return `<div class="bz-eyebrow">${tag}</div><h2 class="bz-title">${title}</h2>${sub?`<p class="bz-lead">${sub}</p>`:''}`;}
function bzNav(i,next){return `<div class="nav-row bz-navrow"><button class="btn secondary" onclick="go(current-1)">${bzT('← Back','← Wstecz')}</button><button class="btn btn-gold" onclick="go(current+1)">${next||bzT('Continue','Dalej')} →</button></div>`;}
function bzScoreLine(ok,n){const p=ok/n;return `<div class="bz-score"><b>${ok} / ${n}</b><span>${p>=.9?bzT('Excellent — this is ready to use at work.','Świetnie — możesz tego używać w pracy.'):p>=.7?bzT('Good. Look again at the ones you missed.','Dobrze. Wróć do tych, w których był błąd.'):bzT('Worth another round — read the phrase cards again first.','Warto powtórzyć — najpierw przejrzyj jeszcze raz karty ze zwrotami.')}</span></div>`;}
function bzLevelTag(){const l=activeLesson,u=l.unit;return `${u.level} · ${l.test?bzT('UNIT TEST','TEST DZIAŁU'):bzT('LESSON','LEKCJA')+' '+l.num}`;}

function bzWelcome(){
  const l=activeLesson,u=l.unit,steps=zones.slice(1,-1);
  return `<div class="bz-welcome">${bzHead('LEOGROW BUSINESS · '+bzLevelTag(),l.title,l.intro)}
   <div class="bz-unitline">${bzT('Unit','Dział')} ${u.n} · ${u.title}</div>
   <ol class="bz-plan">${steps.map((z,k)=>`<li><span>${String(k+1).padStart(2,'0')}</span>${z.label}</li>`).join('')}</ol>
   <p class="bz-meta">${steps.length} ${bzT('steps','kroków')} · ${bzT('about','około')} ${bzMinutes(l)} ${bzT('minutes','minut')}</p>
   <div class="nav-row bz-navrow"><div></div><button class="btn btn-gold" onclick="go(1)">${bzT('Start the lesson','Zacznij lekcję')} →</button></div></div>`;
}
function bzSample(i){
  const d=zones[i].d,tags=[];
  const txt=d.text.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,(m,t,p)=>{let k=tags.indexOf(t);if(k<0){tags.push(t);k=tags.length-1;}return `<mark class="bz-hl c${k%6}"><small>${t}</small>${p}</mark>`;});
  return `${bzHead(bzT('MODEL','WZÓR'),d.h,d.sub||bzT('Read the model. The highlighted phrases are the ones you will learn in this lesson.','Przeczytaj wzór. Zaznaczone zwroty to te, których nauczysz się w tej lekcji.'))}
   <div class="bz-legend">${tags.map((t,k)=>`<span class="bz-key c${k%6}">${t}</span>`).join('')}</div>
   <blockquote class="bz-model">${txt.split(/\n\n/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('')}</blockquote>
   <button class="bz-listenbtn" onclick="bzSpeak(zones[${i}].d.text)">${BZ_ICON.ear}<span>${bzT('Listen to the model','Posłuchaj wzoru')}</span></button>
   ${d.tip?`<div class="bz-box tip">${d.tip}</div>`:''}${bzNav(i)}`;
}
function bzPhrases(i){
  const z=zones[i];
  return `${bzHead(bzT('KEY PHRASES','KLUCZOWE ZWROTY'),z.h,bzT('Tap a card to see the Polish meaning. Tap the speaker to hear it.','Dotknij karty, aby zobaczyć polskie znaczenie. Dotknij głośnika, aby posłuchać.'))}
   <div class="bz-cards">${z.p.map((p,k)=>`<div class="bz-card" onclick="this.classList.toggle('flip')">
     <div class="bz-face bz-front"><span class="bz-tag">${p.tag}</span><b class="bz-phrase">${p.en}</b>${p.note?`<span class="bz-note">${p.note}</span>`:''}
       <button class="bz-say" title="${bzT('Listen','Posłuchaj')}" onclick="event.stopPropagation();bzSpeak(zones[${i}].p[${k}].en)">${BZ_ICON.ear}</button></div>
     <div class="bz-face bz-back"><span class="bz-tag">${p.tag}</span><b>${p.pl}</b><small>${bzT('tap to flip back','dotknij, aby odwrócić')}</small></div></div>`).join('')}</div>${bzNav(i)}`;
}
function bzNote(i){const d=zones[i].d;return `${bzHead(bzT('LANGUAGE NOTE','UWAGA JĘZYKOWA'),d.h,'')}<div class="bz-notebody">${d.html}</div>${bzNav(i)}`;}

/* situation quiz: every question on one page, like the original lesson */
function bzChoose(i){
  const z=zones[i],s=bzState(i,()=>({a:{},ord:z.items.map(q=>shuffle(q.slice(1,-1).map((_,k)=>k)))}));
  const done=Object.keys(s.a).length,ok=z.items.filter((q,k)=>s.a[k]===q[q.length-1]).length;
  return `${bzHead(bzT('SITUATIONS','SYTUACJE'),bzT('Choose the best phrase','Wybierz najlepszy zwrot'),bzT('Read each situation and pick what a professional would say.','Przeczytaj każdą sytuację i wybierz, co powiedziałby profesjonalista.'))}
   <div class="bz-qs">${z.items.map((q,k)=>bzQ(i,k)).join('')}</div>
   <div id="bzcs${i}">${done===z.items.length?bzScoreLine(ok,z.items.length):`<p class="bz-meta">${done} / ${z.items.length} ${bzT('answered','odpowiedzi')}</p>`}</div>${bzNav(i)}`;
}
function bzQ(i,k){
  const z=zones[i],s=BZS[activeLesson.id+':'+i],q=z.items[k],opts=q.slice(1,-1),ci=q[q.length-1],a=s.a[k];
  return `<div class="bz-q ${a!=null?'done':''}" id="bzq${i}-${k}"><div class="bz-qn">${k+1}</div><div class="bz-qb"><p class="bz-qt">${q[0]}</p>
    <div class="bz-opts">${s.ord[k].map((oi,j)=>`<button class="bz-opt ${a!=null?(oi===ci?'ok':oi===a?'no':'dim'):''}" ${a!=null?'disabled':''} onclick="bzAnswer(${i},${k},${oi})"><span class="bz-let">${'ABCD'[j]}</span><span>${opts[oi]}</span></button>`).join('')}</div></div></div>`;
}
function bzAnswer(i,k,oi){
  const z=zones[i],s=BZS[activeLesson.id+':'+i];if(s.a[k]!=null)return;s.a[k]=oi;
  const el=document.getElementById(`bzq${i}-${k}`);if(el)el.outerHTML=bzQ(i,k);
  const n=z.items.length,done=Object.keys(s.a).length,ok=z.items.filter((q,j)=>s.a[j]===q[q.length-1]).length;
  if(done===n)bzRecord(i,ok,n);
  const c=document.getElementById('bzcs'+i);if(c)c.innerHTML=done===n?bzScoreLine(ok,n):`<p class="bz-meta">${done} / ${n} ${bzT('answered','odpowiedzi')}</p>`;
}

/* match English phrases with their Polish meaning */
function bzMatch(i){
  const z=zones[i],s=bzState(i,()=>({L:shuffle(z.pairs.map((_,k)=>k)),R:shuffle(z.pairs.map((_,k)=>k)),done:[],sel:null,side:null,miss:0}));
  const cell=(k,side)=>`<button class="bz-m ${s.done.includes(k)?'ok':''} ${s.sel===k&&s.side===side?'sel':''}" id="bzm${side}${k}" ${s.done.includes(k)?'disabled':''} onclick="bzMatchTap(${i},${k},'${side}')">${side==='L'?z.pairs[k].en:z.pairs[k].pl}</button>`;
  return `${bzHead(bzT('MATCH','DOPASUJ'),bzT('Match the phrase to its meaning','Dopasuj zwrot do znaczenia'),bzT('Tap an English phrase, then its Polish meaning.','Dotknij angielskiego zwrotu, a potem jego polskiego znaczenia.'))}
   <div class="bz-match"><div>${s.L.map(k=>cell(k,'L')).join('')}</div><div>${s.R.map(k=>cell(k,'R')).join('')}</div></div>
   ${s.done.length===z.pairs.length?bzScoreLine(z.pairs.length,z.pairs.length+s.miss).replace(/<b>.*?<\/b>/,`<b>${bzT('All matched','Wszystko dopasowane')}</b>`):''}${bzNav(i)}`;
}
function bzMatchTap(i,k,side){
  const z=zones[i],s=BZS[activeLesson.id+':'+i];if(s.done.includes(k))return;
  if(s.sel===null||s.side===side){s.sel=k;s.side=side;return bzPaint();}
  if(s.sel===k){s.done.push(k);s.sel=null;if(side==='L')bzSpeak(z.pairs[k].en);if(s.done.length===z.pairs.length)bzRecord(i,z.pairs.length,z.pairs.length+s.miss);return bzPaint();}
  s.miss++;const a=document.getElementById('bzm'+side+k),b=document.getElementById('bzm'+s.side+s.sel);s.sel=null;
  [a,b].forEach(e=>e&&e.classList.add('flash'));setTimeout(bzPaint,550);
}

/* listen and choose the phrase you heard */
function bzListen(i){
  const z=zones[i],s=bzState(i,()=>({k:0,ok:0,a:null,opts:null}));
  const n=z.items.length;
  if(s.k>=n){return `${bzHead(bzT('LISTEN','SŁUCHANIE'),bzT('Listen and choose','Posłuchaj i wybierz'),'')}${bzScoreLine(s.ok,n)}${bzNav(i)}`;}
  const it=z.items[s.k];
  if(!s.opts){const others=shuffle(z.pool.filter(p=>p.en!==it.en)).slice(0,2);s.opts=shuffle([it].concat(others));setTimeout(()=>bzSpeak(it.en),350);}
  return `${bzHead(bzT('LISTEN','SŁUCHANIE'),bzT('Listen and choose','Posłuchaj i wybierz'),bzT('Play the phrase and choose the one you hear.','Odtwórz zwrot i wybierz ten, który słyszysz.'))}
   <div class="bz-listen"><button class="bz-play" onclick="bzSpeak(zones[${i}].items[${s.k}].en)">${BZ_ICON.play}<span>${bzT('Play','Odtwórz')}</span></button><span class="bz-meta">${s.k+1} / ${n}</span></div>
   <div class="bz-opts col">${s.opts.map((o,j)=>`<button class="bz-opt ${s.a!=null?(o===it?'ok':j===s.a?'no':'dim'):''}" ${s.a!=null?'disabled':''} onclick="bzListenPick(${i},${j})"><span class="bz-let">${'ABC'[j]}</span><span>${o.en}</span></button>`).join('')}</div>
   ${s.a!=null?`<p class="bz-pl">${it.pl}</p><div class="nav-row bz-navrow"><div></div><button class="btn btn-gold" onclick="bzListenNext(${i})">${s.k+1<n?bzT('Next phrase','Następny zwrot'):bzT('See result','Zobacz wynik')} →</button></div>`:bzNav(i,bzT('Skip','Pomiń'))}`;
}
function bzListenPick(i,j){const s=BZS[activeLesson.id+':'+i],z=zones[i];if(s.a!=null)return;s.a=j;if(s.opts[j]===z.items[s.k])s.ok++;bzPaint();}
function bzListenNext(i){const s=BZS[activeLesson.id+':'+i],z=zones[i];s.k++;s.a=null;s.opts=null;if(s.k>=z.items.length)bzRecord(i,s.ok,z.items.length);bzPaint();}

/* word bank: tap a phrase, then a gap */
function bzGaps(d){const p=d.text.split(/\{([^}]+)\}/);return {parts:p,ans:p.filter((_,k)=>k%2)};}
function bzBank(i){
  const d=zones[i].d,G=bzGaps(d),s=bzState(i,()=>({chips:shuffle(G.ans.concat(d.extra||[])),fill:G.ans.map(()=>null),sel:null,checked:false,shown:false}));
  const used=new Set(s.fill.filter(x=>x!=null));
  let g=-1;
  const body=G.parts.map((t,k)=>{if(k%2===0)return t.replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>');g++;const f=s.fill[g],st=s.checked||s.shown?(f!=null&&s.chips[f].toLowerCase()===G.ans[g].toLowerCase()?'ok':'no'):'';
    return `<button class="bz-gap ${f!=null?'full':''} ${st}" onclick="bzGap(${i},${g})"><sup>${g+1}</sup>${f!=null?s.chips[f]:'&nbsp;'}</button>`;}).join('');
  const ok=s.fill.filter((f,k)=>f!=null&&s.chips[f].toLowerCase()===G.ans[k].toLowerCase()).length;
  return `${bzHead(bzT('IN CONTEXT','W KONTEKŚCIE'),d.h,bzT('Tap a phrase from the box, then tap the gap where it belongs.','Dotknij zwrotu z ramki, a potem luki, do której pasuje.'))}
   <div class="bz-chips">${s.chips.map((c,k)=>`<button class="bz-chip ${used.has(k)?'used':''} ${s.sel===k?'sel':''}" ${used.has(k)||s.shown?'disabled':''} onclick="bzChip(${i},${k})">${c}</button>`).join('')}</div>
   <div class="bz-text"><p>${body.replace(/\{|\}/g,'')}</p></div>
   <div class="bz-actions"><button class="btn btn-gold" onclick="bzCheck(${i})" ${s.shown?'disabled':''}>${bzT('Check','Sprawdź')}</button><button class="btn secondary" onclick="bzShow(${i})">${bzT('Show answers','Pokaż odpowiedzi')}</button><button class="btn secondary" onclick="bzReset(${i})">${bzT('Reset','Od nowa')}</button></div>
   ${s.checked?bzScoreLine(ok,G.ans.length):''}${bzNav(i)}`;
}
function bzChip(i,k){const s=BZS[activeLesson.id+':'+i];s.sel=s.sel===k?null:k;
  if(s.sel!=null&&s._gap!=null&&s.fill[s._gap]==null){s.fill[s._gap]=k;s.sel=null;s._gap=null;s.checked=false;}bzPaint();}
function bzGap(i,g){const s=BZS[activeLesson.id+':'+i];if(s.shown)return;
  if(s.fill[g]!=null){s.fill[g]=null;s.checked=false;return bzPaint();}
  if(s.sel!=null){s.fill[g]=s.sel;s.sel=null;s.checked=false;}else s._gap=g;bzPaint();}
function bzCheck(i){const s=BZS[activeLesson.id+':'+i],G=bzGaps(zones[i].d);s.checked=true;
  if(!s.scored){s.scored=1;const ok=s.fill.filter((f,k)=>f!=null&&s.chips[f].toLowerCase()===G.ans[k].toLowerCase()).length;bzRecord(i,ok,G.ans.length);}bzPaint();}
function bzShow(i){const s=BZS[activeLesson.id+':'+i],G=bzGaps(zones[i].d);if(!s.scored){s.scored=1;const ok=s.fill.filter((f,k)=>f!=null&&s.chips[f].toLowerCase()===G.ans[k].toLowerCase()).length;bzRecord(i,ok,G.ans.length);}
  const free=s.chips.map((c,k)=>k);s.fill=G.ans.map(a=>{const k=free.findIndex(x=>x!=null&&s.chips[x].toLowerCase()===a.toLowerCase());const v=free[k];free[k]=null;return v;});s.shown=true;s.checked=false;bzPaint();}
function bzReset(i){delete BZS[activeLesson.id+':'+i];bzPaint();}

/* put the parts in the right order */
function bzOrder(i){
  const d=zones[i].d,s=bzState(i,()=>({mix:shuffle(d.items.map((_,k)=>k)),seq:[],checked:false}));
  const n=d.items.length,full=s.seq.length===n;
  return `${bzHead(bzT('STRUCTURE','STRUKTURA'),d.h,d.sub||bzT('Tap the parts in the right order. Tap a placed part to take it back.','Dotykaj części we właściwej kolejności. Dotknij ułożonej części, aby ją cofnąć.'))}
   <ol class="bz-seq">${s.seq.map((k,p)=>`<li class="${s.checked?(k===p?'ok':'no'):''}" onclick="bzUnplace(${i},${p})"><span>${p+1}</span>${d.items[k]}</li>`).join('')}${full?'':`<li class="bz-slot"><span>${s.seq.length+1}</span>${bzT('Choose the next part below','Wybierz kolejną część poniżej')}</li>`}</ol>
   <div class="bz-pool">${s.mix.filter(k=>!s.seq.includes(k)).map(k=>`<button class="bz-part" onclick="bzPlace(${i},${k})">${d.items[k]}</button>`).join('')}</div>
   ${full?`<div class="bz-actions"><button class="btn btn-gold" onclick="bzOrderCheck(${i})">${bzT('Check','Sprawdź')}</button><button class="btn secondary" onclick="bzReset(${i})">${bzT('Start again','Od nowa')}</button></div>`:''}
   ${s.checked?bzScoreLine(s.seq.filter((k,p)=>k===p).length,n):''}${bzNav(i)}`;
}
function bzPlace(i,k){const s=BZS[activeLesson.id+':'+i];if(s.checked)return;s.seq.push(k);bzPaint();}
function bzUnplace(i,p){const s=BZS[activeLesson.id+':'+i];if(s.checked)return;s.seq.splice(p,1);bzPaint();}
function bzOrderCheck(i){const s=BZS[activeLesson.id+':'+i];s.checked=true;if(!s.scored){s.scored=1;bzRecord(i,s.seq.filter((k,p)=>k===p).length,s.seq.length);}bzPaint();}

/* speaking / writing task with an outline and a self-check list */
let BZ_REC=null;
function bzTask(i){
  const d=zones[i].d,s=bzState(i,()=>({tick:{}})),w=d.kind==='write';
  let saved='';try{saved=localStorage.getItem('bzw:'+activeLesson.id)||'';}catch(e){}
  return `${bzHead(w?bzT('YOUR TURN · WRITING','TWOJA KOLEJ · PISANIE'):bzT('YOUR TURN · SPEAKING','TWOJA KOLEJ · MÓWIENIE'),d.h,d.intro)}
   <ol class="bz-steps">${d.steps.map((st,k)=>`<li><span>${k+1}</span><div><b>${st[0]}</b><small>${st[1]}</small></div></li>`).join('')}</ol>
   ${d.topics?`<div class="bz-sub">${bzT('Ideas','Pomysły')}</div><ul class="bz-topics">${d.topics.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}
   ${w?`<textarea class="bz-write" id="bzWrite" rows="9" placeholder="${bzT('Write here…','Pisz tutaj…')}" oninput="bzWords(this)">${esc(saved)}</textarea><p class="bz-meta" id="bzWc">${bzWc(saved)} ${bzT('words','słów')}${d.min?` · ${bzT('aim for','cel:')} ${d.min}+`:''}</p>`
      :`<div class="bz-rec" id="bzRec">${bzRecHtml()}</div>`}
   <div class="bz-sub">${bzT('Self-check','Sprawdź siebie')}</div>
   <div class="bz-check">${d.check.map((c,k)=>`<label class="${s.tick[k]?'on':''}"><input type="checkbox" ${s.tick[k]?'checked':''} onchange="bzTick(${i},${k},this)"><span>${c}</span></label>`).join('')}</div>${bzNav(i,bzT('Finish','Zakończ'))}`;
}
const bzWc=t=>(String(t).trim().match(/\S+/g)||[]).length;
function bzWords(el){try{localStorage.setItem('bzw:'+activeLesson.id,el.value);}catch(e){}const d=zones[current].d,c=document.getElementById('bzWc');if(c)c.textContent=`${bzWc(el.value)} ${bzT('words','słów')}${d.min?` · ${bzT('aim for','cel:')} ${d.min}+`:''}`;}
function bzTick(i,k,el){const s=BZS[activeLesson.id+':'+i];s.tick[k]=el.checked;el.parentNode.classList.toggle('on',el.checked);}
function bzRecHtml(){
  const R=BZ_REC,can=!!(navigator.mediaDevices&&window.MediaRecorder);
  if(!can)return `<p class="bz-meta">${bzT('Say it out loud — recording is not available in this browser.','Powiedz to na głos — nagrywanie nie działa w tej przeglądarce.')}</p>`;
  if(R&&R.state==='rec')return `<button class="bz-recbtn on" onclick="bzRecStop()">${BZ_ICON.stop}<span>${bzT('Stop','Zatrzymaj')}</span></button><span class="bz-meta">${bzT('Recording…','Nagrywanie…')} <b id="bzRecT">0:00</b></span>`;
  return `<button class="bz-recbtn" onclick="bzRecStart()">${BZ_ICON.mic}<span>${R&&R.url?bzT('Record again','Nagraj jeszcze raz'):bzT('Record yourself','Nagraj siebie')}</span></button>${R&&R.url?`<audio controls src="${R.url}"></audio>`:`<span class="bz-meta">${bzT('Then play it back and go through the self-check. Nothing is sent anywhere.','Potem odsłuchaj i przejdź przez listę. Nic nie jest nigdzie wysyłane.')}</span>`}`;
}
async function bzRecStart(){
  try{const st=await navigator.mediaDevices.getUserMedia({audio:true});const mr=new MediaRecorder(st),ch=[];
    if(BZ_REC&&BZ_REC.url)URL.revokeObjectURL(BZ_REC.url);
    BZ_REC={state:'rec',mr,t0:Date.now()};mr.ondataavailable=e=>ch.push(e.data);
    mr.onstop=()=>{st.getTracks().forEach(t=>t.stop());BZ_REC={state:'done',url:URL.createObjectURL(new Blob(ch,{type:mr.mimeType||'audio/webm'}))};const r=document.getElementById('bzRec');if(r)r.innerHTML=bzRecHtml();};
    mr.start();const r=document.getElementById('bzRec');if(r)r.innerHTML=bzRecHtml();
    BZ_REC.tm=setInterval(()=>{const e=document.getElementById('bzRecT');if(!e||!BZ_REC||BZ_REC.state!=='rec'){clearInterval(BZ_REC&&BZ_REC.tm);return;}const s=Math.floor((Date.now()-BZ_REC.t0)/1000);e.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');},500);
  }catch(e){_comboToastText(bzT('Microphone is blocked — you can still practise out loud.','Mikrofon jest zablokowany — nadal możesz ćwiczyć na głos.'));}
}
function bzRecStop(){if(BZ_REC&&BZ_REC.mr){clearInterval(BZ_REC.tm);BZ_REC.mr.stop();}}

/* the end of a lesson: a quiet summary, no coins or confetti */
function bzFinish(){
  const l=activeLesson,rows=[];let ok=0,n=0;
  zones.forEach((z,i)=>{if(BZR[i]){ok+=BZR[i][0];n+=BZR[i][1];rows.push([z.label,BZR[i][0],BZR[i][1]]);}});
  const pct=n?Math.round(100*ok/n):null,stars=pct==null?3:pct>=90?3:pct>=70?2:1;
  const prev=C.lessons[l.id]||{stars:0,points:0,done:false};
  const _today=localDay();C.days=C.days||[];if(!C.days.includes(_today))C.days.push(_today);
  C.lessons[l.id]={done:true,stars:Math.max(prev.stars||0,stars),points:Math.max(prev.points||0,pct||0)};
  C.active=null;saveProgress();
  const nx=BZ_LESSONS[BZ_LESSONS.indexOf(l)+1];
  return `<div class="bz-finish">${bzHead('LEOGROW BUSINESS · '+bzLevelTag(),bzT('Lesson complete','Lekcja ukończona'),l.title)}
   ${pct!=null?`<div class="bz-big"><b>${pct}%</b><span>${bzT('of answers correct','poprawnych odpowiedzi')}</span></div>`:''}
   ${rows.length?`<div class="bz-results">${rows.map(r=>`<div><span>${r[0]}</span><i><em style="width:${Math.round(100*r[1]/r[2])}%"></em></i><b>${r[1]}/${r[2]}</b></div>`).join('')}</div>`:''}
   <div class="nav-row bz-navrow"><button class="btn secondary" onclick="bzBackToUnit()">${bzT('Back to the unit','Wróć do działu')}</button>${nx?`<button class="btn btn-gold" onclick="bzOpen('${nx.id}')">${bzT('Next','Dalej')}: ${nx.title} →</button>`:''}</div></div>`;
}
function bzBackToUnit(){const u=activeLesson&&activeLesson.unit;showCourse();if(u){VIEW={track:'business',level:u.id};renderCourse();}}

const _bzRZ=renderZone;
renderZone=function(i){
  if(!bzOn())return _bzRZ.apply(this,arguments);
  const z=zones[i];
  switch(z.type){
    case 'welcome':return bzWelcome();
    case 'finish':return bzFinish();
    case 'bz-sample':return bzSample(i);
    case 'bz-phrases':return bzPhrases(i);
    case 'bz-note':return bzNote(i);
    case 'bz-choose':return bzChoose(i);
    case 'bz-match':return bzMatch(i);
    case 'bz-listen':return bzListen(i);
    case 'bz-bank':return bzBank(i);
    case 'bz-order':return bzOrder(i);
    case 'bz-task':return bzTask(i);
  }
  return _bzRZ.apply(this,arguments);
};
['bz-choose','bz-match','bz-listen','bz-bank','bz-order'].forEach(t=>GRADED.add(t));
/* no bonus pop-ups inside Business lessons */
(function(){const _mb=maybeShowBonus;maybeShowBonus=function(){if(bzOn())return;return _mb.apply(this,arguments);};})();
/* opening a Business lesson: Premium check, then the normal lesson frame in the calm Business look */
function bzOpen(id){
  const l=typeof id==='object'?id:bzLesson(id);if(!l)return;
  if(!bzPrem()&&!bzFreeLesson(l)){openPremium('business');return;}
  if(activeLesson)showCourse();
  BZS={};BZR={};
  openLesson(l);
}
(function(){
  const _ol=openLesson;
  openLesson=function(id){
    const l=typeof id==='object'?id:bzLesson(id);
    if(!l||!l.biz){document.body.classList.remove('biz');return _ol.apply(this,arguments);}
    if(!bzPrem()&&!bzFreeLesson(l)){openPremium('business');return;}
    document.body.classList.add('biz');
    if(!(typeof id==='object')){BZS={};BZR={};}
    const r=_ol(l);
    if(activeLesson&&activeLesson.biz){$('timerPill').textContent='Business '+l.num;bonusShown=true;}
    else document.body.classList.remove('biz');
    return r;
  };
  const _lu=lessonUnlocked;lessonUnlocked=function(id){return bzLesson(id)?true:_lu.apply(this,arguments);};
  const _ia=isAdult;isAdult=function(l){l=l||activeLesson;return !!(l&&l.biz)||_ia.apply(this,arguments);};
  const _sc=showCourse;
  showCourse=function(){
    const was=activeLesson&&activeLesson.biz?activeLesson.unit:null;
    if(BZ_REC&&BZ_REC.state==='rec')bzRecStop();
    try{if('speechSynthesis' in window)speechSynthesis.cancel();}catch(e){}
    const r=_sc.apply(this,arguments);
    if(was){VIEW={track:'business',level:was.id};try{localStorage.setItem('lingrowView',JSON.stringify(VIEW));}catch(e){}renderCourse();}
    return r;
  };
  /* Premium window: say what Business English is when it was opened from here */
  const _op=openPremium;openPremium=function(why){const r=_op.apply(this,arguments);
    try{const m=document.getElementById('authModal');if(m){
      if(why==='business'){const s=m.querySelector('.sub');if(s)s.textContent=bzT('Business English is part of Leogrow Premium.','Business English jest częścią Leogrow Premium.');}
      const ul=m.querySelector('.prem-feats');if(ul&&!ul.querySelector('.bz-feat'))ul.insertAdjacentHTML('afterbegin',`<li class="bz-feat"><span>💼</span>${bzT('Business English: '+BZ_UNITS.length+' units from B1 to C1 — meetings, emails, calls, negotiations, presentations','Business English: '+BZ_UNITS.length+' działów od B1 do C1 — spotkania, e-maile, telefony, negocjacje, prezentacje')}</li>`);}}catch(e){}
    return r;};
})();

/* ---------- the section page ---------- */
function bzLeoHead(){try{const r=(LEO_AGES.senior||LEO_AGES.adult);return r&&r.h?`<img class="bz-leo" src="${r.h}" alt="Leo" draggable="false">`:'';}catch(e){return '';}}
function bzPremLine(){
  if(bzPrem())return `<span class="bz-pill">${BZ_ICON.check}${bzT('Included in your Premium','W ramach Twojego Premium')}</span>`;
  return `<span class="bz-pill off">${BZ_ICON.lock}${bzT('Premium · first lesson free','Premium · pierwsza lekcja za darmo')}</span><button class="btn btn-gold bz-unlock" onclick="openPremium('business')">${bzT('Unlock Business English','Odblokuj Business English')}</button>`;
}
function bzStats(ls){const d=ls.filter(l=>lessonDone(l.id)).length;return {d,n:ls.length,p:ls.length?Math.round(100*d/ls.length):0};}
function bzHomeHtml(){
  const all=bzStats(BZ_LESSONS),nx=bzNext();
  let h=`<section class="bz-hero"><div class="bz-hero-top"><div class="bz-brand">${bzLeoHead()}<span>LEOGROW BUSINESS</span></div>${bzPremLine()}</div>
    <h1 class="bz-h1">Business English</h1>
    <p class="bz-lead">${bzT('The English you need at work: meetings, emails, calls, presentations, negotiations and leading people. Real phrases, real situations, at your own pace.','Angielski, którego potrzebujesz w pracy: spotkania, e-maile, telefony, prezentacje, negocjacje i zarządzanie ludźmi. Prawdziwe zwroty, prawdziwe sytuacje, we własnym tempie.')}</p>
    <div class="bz-figs"><div><b>${BZ_UNITS.length}</b><small>${bzT('units','działów')}</small></div><div><b>${BZ_LESSONS.length}</b><small>${bzT('lessons & tests','lekcji i testów')}</small></div><div><b>B1–C1</b><small>${bzT('levels','poziomy')}</small></div><div><b>${all.p}%</b><small>${bzT('complete','ukończone')}</small></div></div>
    ${nx?`<button class="btn btn-gold bz-go" onclick="bzOpen('${nx.id}')">${all.d?bzT('Continue','Kontynuuj'):bzT('Start','Zacznij')}: ${nx.unit.level} · ${nx.title} ${BZ_ICON.arrow}</button>`:''}
  </section>
  <div class="bz-filter">${['all','B1','B2','C1'].map(f=>`<button class="${BZ_F===f?'on':''}" onclick="BZ_F='${f}';renderCourse()">${f==='all'?bzT('All levels','Wszystkie'):f}</button>`).join('')}</div>`;
  ['B1','B2','C1'].filter(lv=>BZ_F==='all'||BZ_F===lv).forEach(lv=>{
    const us=BZ_UNITS.filter(u=>u.level===lv);if(!us.length)return;
    h+=`<div class="bz-lvhead"><span class="bz-lv">${lv}</span><b>${bzT(BZ_LV[lv][0],BZ_LV[lv][1])}</b><i></i></div><div class="bz-units">`;
    us.forEach(u=>{const s=bzStats(u.lessons);
      h+=`<button class="bz-unit ${s.d===s.n?'done':''}" onclick="nav('business','${u.id}')"><span class="bz-num">${String(u.n).padStart(2,'0')}</span>
        <span class="bz-ubody"><small>${u.level} · ${bzT('Unit','Dział')} ${u.n}</small><b>${u.title}</b><em>${bzT(u.sub,u.subPl||u.sub)}</em>
        <span class="bz-bar"><i style="width:${s.p}%"></i></span><small class="bz-count">${s.d} / ${s.n} ${bzT('done','ukończone')}</small></span><span class="bz-chev">${BZ_ICON.arrow}</span></button>`;});
    h+=`</div>`;
  });
  return h+`<p class="bz-foot">${bzT('Audio uses your device voice for the business phrases.','Dźwięk zwrotów biznesowych korzysta z głosu urządzenia.')}</p>`;
}
function bzUnitHtml(u){
  const s=bzStats(u.lessons),i=BZ_UNITS.indexOf(u),pv=BZ_UNITS[i-1],nx=BZ_UNITS[i+1],prem=bzPrem();
  let h=`<button class="bz-backlink" onclick="nav('business')">← Business English</button>
   <section class="bz-hero unit"><div class="bz-hero-top"><div class="bz-brand"><span>${u.level} · ${bzT('UNIT','DZIAŁ')} ${u.n}</span></div>${bzPremLine()}</div>
    <h1 class="bz-h1">${u.title}</h1><p class="bz-lead">${bzT(u.sub,u.subPl||u.sub)}</p>
    <span class="bz-bar big"><i style="width:${s.p}%"></i></span><small class="bz-count">${s.d} / ${s.n} ${bzT('done','ukończone')}</small></section>
   <div class="bz-lessons">`;
  u.lessons.forEach((l,k)=>{const d=lessonDone(l.id),r=C.lessons[l.id],lock=!prem&&!bzFreeLesson(l),cur=C.active&&C.active.id===l.id;
    h+=`<button class="bz-lesson ${d?'done':''} ${l.test?'test':''} ${lock?'locked':''}" onclick="bzOpen('${l.id}')">
      <span class="bz-ln">${l.test?bzT('TEST','TEST'):l.num}</span>
      <span class="bz-lbody"><b>${l.title}</b><em>${l.intro}</em><small>${l.zones.length} ${bzT('steps','kroków')} · ${bzMinutes(l)} min${d&&r&&r.points?` · ${bzT('best','najlepiej')} ${r.points}%`:''}</small></span>
      <span class="bz-lstate">${d?`<i class="ok">${BZ_ICON.check}</i>`:lock?`<i class="lk">${BZ_ICON.lock}</i>`:`<i class="go">${cur?bzT('Continue','Dalej'):bzT('Start','Start')}</i>`}</span></button>`;});
  h+=`</div><div class="level-nav bz-unitnav">${pv?`<button class="btn secondary" onclick="nav('business','${pv.id}')">← ${pv.title}</button>`:'<span></span>'}${nx?`<button class="btn secondary" onclick="nav('business','${nx.id}')">${nx.title} →</button>`:''}</div>`;
  return h;
}
/* home: one quiet card that leads to the section; side menu: its own item */
function bzHomeCard(){
  const s=bzStats(BZ_LESSONS);
  return `<button class="bz-homecard" onclick="nav('business')"><span class="bz-hc-tag">LEOGROW BUSINESS · PREMIUM</span><b>Business English</b>
    <small>${bzT(`${BZ_UNITS.length} units for work · meetings, emails, negotiations, presentations`,`${BZ_UNITS.length} działów do pracy · spotkania, e-maile, negocjacje, prezentacje`)}${s.d?` · ${s.p}%`:''}</small><span class="bz-hc-go">${BZ_ICON.arrow}</span></button>`;
}
(function(){
  const _rc=renderCourse;
  renderCourse=function(){
    if(VIEW&&VIEW.track==='business'){
      if(typeof PT!=='undefined')PT=null;
      document.body.classList.remove('adult','mh-on');document.body.classList.add('biz','biz-page');
      const u=VIEW.level&&BZ_UNITS.find(x=>x.id===VIEW.level);
      $('courseView').innerHTML=courseShell((typeof testerBar==='function'?testerBar():'')+`<div class="bz-page">${u?bzUnitHtml(u):bzHomeHtml()}</div>`);
      try{emojify($('courseView'));}catch(e){}
      try{if(LANG==='pl')applyLang($('courseView'));}catch(e){}
      return;
    }
    if(!activeLesson)document.body.classList.remove('biz');
    document.body.classList.remove('biz-page');
    const r=_rc.apply(this,arguments);
    try{
      const main=document.querySelector('#courseView .course-main');
      if(main&&!VIEW.track&&main.querySelector('.my-hero')&&!main.querySelector('.bz-homecard')){
        const after=main.querySelector('.mh-dock')||main.querySelector('.mh-stats')||main.querySelector('.my-hero');
        after.insertAdjacentHTML('afterend',bzHomeCard());
      }
    }catch(e){console.warn('business card',e);}
    return r;
  };
  const _sn=sideNav;
  sideNav=function(){let h=_sn.apply(this,arguments);const on=VIEW&&VIEW.track==='business';
    const it=`<a href="#" class="sn-item bz-sn ${on?'on':''}" onclick="nav('business');return false;"><span>💼</span><b>Business</b><small class="bz-sn-tag">PRO</small></a>`;
    const k=h.indexOf('</a>');if(k>-1)h=h.slice(0,k+4)+it+h.slice(k+4);
    return h;};
})();
