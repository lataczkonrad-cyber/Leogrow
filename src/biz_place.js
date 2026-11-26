/* ---------- Business English placement test (free, ~10 min) ----------
   30 questions, 10 per level (B1 → B2 → C1). Grammar for work, the right
   phrase for a situation, tone/register and business vocabulary.
   Result = the first level you haven't mastered (under 7/10), saved to C.placed.business. */
const BZP_Q=[
 /* ---- B1 ---- */
 {lv:'B1',k:'Grammar',q:'Our sales ___ by 12% last quarter.',o:['rose','have risen','are rising','rise'],c:0},
 {lv:'B1',k:'Phrase',q:'You want to start a meeting. What do you say?',o:["Right, let's get started.","Let's finish here.","Any other business?","I'll keep it short, bye."],c:0},
 {lv:'B1',k:'Email',q:'The best opening for a reply to a customer:',o:['Thank you for your email.','Hey, what do you want?','I got your thing.','Dear Sir, yo.'],c:0},
 {lv:'B1',k:'Vocabulary',q:'The money a company receives from sales is its…',o:['revenue','salary','invoice','budget cut'],c:0},
 {lv:'B1',k:'Grammar',q:'I ___ for this company since 2019.',o:['have worked','work','am working','worked'],c:0},
 {lv:'B1',k:'Phrase',q:'You did not understand a number on the call. You say:',o:['Sorry, could you repeat that figure?','What? Say it again.','No.','I understand everything.'],c:0},
 {lv:'B1',k:'Vocabulary',q:'A document asking a client to pay for work is an…',o:['invoice','agenda','offer letter','minutes'],c:0},
 {lv:'B1',k:'Grammar',q:'Our new model is ___ than the old one.',o:['cheaper','more cheap','cheapest','the cheaper'],c:0},
 {lv:'B1',k:'Meetings',q:'"Let\'s move on to the next point on the ___."',o:['agenda','minutes','deadline','chart'],c:0},
 {lv:'B1',k:'Phrase',q:'In a presentation, you want to show a chart. You say:',o:['If you look at this chart, you can see…','Chart. Look.','I hope you like charts.','This is a chart, finished.'],c:0},
 /* ---- B2 ---- */
 {lv:'B2',k:'Grammar',q:'If we ___ the price, we would lose our margin.',o:['lowered','lower','had lowered','will lower'],c:0},
 {lv:'B2',k:'Negotiating',q:'You want to offer something only on a condition. Best phrase:',o:["We could agree to that, provided that you sign for two years.","OK, fine, whatever you want.","No way.","Maybe yes, maybe no."],c:0},
 {lv:'B2',k:'Tone',q:'Which sentence is the most polite way to disagree?',o:["I see your point, but I'm not sure that would work.","That's wrong.","You don't understand.","No, that's a bad idea."],c:0},
 {lv:'B2',k:'Vocabulary',q:'The amount of the market a company controls is its market…',o:['share','part','piece','stake price'],c:0},
 {lv:'B2',k:'Grammar',q:'The report ___ by the finance team before Friday.',o:['will be checked','will check','checks','is checking'],c:0},
 {lv:'B2',k:'Trends',q:'Sales went up quickly and suddenly. They…',o:['soared','levelled off','dipped','stagnated'],c:0},
 {lv:'B2',k:'Email',q:'A good way to remind someone politely:',o:['Just a quick reminder that the report is due on Friday.','You forgot the report again.','Where is my report???','Report. Friday. Now.'],c:0},
 {lv:'B2',k:'Grammar',q:'By the end of the year, we ___ three new offices.',o:['will have opened','will open','are opening','have opened'],c:0},
 {lv:'B2',k:'Problem-solving',q:'"We need to get to the ___ of the problem before we fix it."',o:['root','floor','surface','edge'],c:0},
 {lv:'B2',k:'Vocabulary',q:'A person who invests in a company and owns part of it is a…',o:['shareholder','customer','supplier','contractor'],c:0},
 /* ---- C1 ---- */
 {lv:'C1',k:'Grammar',q:'___ we known about the delay, we would have informed the client.',o:['Had','If','Should','Were'],c:0},
 {lv:'C1',k:'Tone',q:'The most diplomatic way to say "Your plan won\'t work":',o:['I wonder whether the plan might need a little more work on the timeline.',"Your plan won't work.",'This plan is a disaster.',"I don't like it."],c:0},
 {lv:'C1',k:'Grammar',q:'Not only ___ the target, but we also cut costs.',o:['did we meet','we met','we did meet','met we'],c:0},
 {lv:'C1',k:'Vocabulary',q:'"The merger will create ___ that save us €2m a year."',o:['synergies','benefits packages','overheads','liabilities'],c:0},
 {lv:'C1',k:'Leadership',q:'You give feedback on weak work. Which is best?',o:["The structure works well; the data section could be stronger if we add sources.","This is bad. Do it again.","Good job!! (it isn't)","Whatever, it's fine."],c:0},
 {lv:'C1',k:'Idiom',q:'"We need to ___ on this decision now; waiting costs money."',o:['pull the trigger','hit the roof','cut corners','miss the boat'],c:0},
 {lv:'C1',k:'Grammar',q:'It is essential that every manager ___ the new policy.',o:['follow','follows','will follow','is following'],c:0},
 {lv:'C1',k:'Crisis',q:'A public apology after a data leak should start with:',o:['We sincerely apologise and take full responsibility.','Mistakes happen to everyone.','It was not really our fault.','No comment.'],c:0},
 {lv:'C1',k:'Hedging',q:'Which sentence sounds most cautious and professional?',o:['The figures would appear to suggest a slight slowdown.','The figures prove we are failing.','Sales are dead.','Numbers are bad, for sure.'],c:0},
 {lv:'C1',k:'Vocabulary',q:'Thinking about the long-term future of the business, not just this quarter:',o:['strategic','short-sighted','day-to-day','last-minute'],c:0}
];
const BZP_PASS=7;
let BZP=null;   // {q:[shuffled per level], i, ans:{idx:true/false/null}, done}
function bzpShuf(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function bzpStart(){
  const q=[];['B1','B2','C1'].forEach(lv=>bzpShuf(BZP_Q.filter(x=>x.lv===lv)).forEach(x=>{const ord=bzpShuf(x.o.map((t,k)=>k));q.push({x,ord});}));
  BZP={q,i:0,ans:{},pick:null,done:false,stop:false};
  nav('business','placement');try{window.scrollTo(0,0);}catch(e){}
}
function bzpScore(lv){let ok=0,n=0;BZP.q.forEach((it,k)=>{if(it.x.lv!==lv)return;n++;if(BZP.ans[k]===true)ok++;});return {ok,n};}
function bzpLevel(){
  for(const lv of ['B1','B2','C1']){if(bzpScore(lv).ok<BZP_PASS)return lv;}
  return 'C1+';
}
function bzpPick(k){
  if(!BZP||BZP.pick!==null)return;
  const it=BZP.q[BZP.i];BZP.pick=k;BZP.ans[BZP.i]=(it.ord[k]===it.x.c);
  renderCourse();
  setTimeout(bzpNext,750);
}
function bzpSkip(){if(!BZP||BZP.pick!==null)return;BZP.ans[BZP.i]=null;bzpNext();}
function bzpNext(){
  if(!BZP)return;
  BZP.pick=null;
  const cur=BZP.q[BZP.i],nxt=BZP.q[BZP.i+1];
  // end of a level block: if this level was clearly too hard, stop here
  if(nxt&&nxt.x.lv!==cur.x.lv&&bzpScore(cur.x.lv).ok<5){BZP.stop=true;bzpFinish();return;}
  if(!nxt){bzpFinish();return;}
  BZP.i++;renderCourse();
}
function bzpFinish(){
  BZP.done=true;
  const lv=bzpLevel();
  C.placed=C.placed||{};C.placed.business=lv;
  try{saveProgress();}catch(e){}
  BZ_F=lv==='C1+'?'C1':lv;
  renderCourse();try{window.scrollTo(0,0);}catch(e){}
}
function bzpGo(){
  const r=(C.placed&&C.placed.business)||'B1',lv=r==='C1+'?'C1':r;
  BZ_F=lv;BZP=null;
  const u=BZ_UNITS.filter(x=>x.level===lv).find(x=>x.lessons.some(l=>!lessonDone(l.id)))||BZ_UNITS.find(x=>x.level===lv);
  nav('business',u?u.id:null);try{window.scrollTo(0,0);}catch(e){}
}
function bzpHomeBtn(){
  const r=C.placed&&C.placed.business;
  return r?`<button class="bzx-btn outw" onclick="bzpStart()">🎯 ${bzT('Your level','Twój poziom')}: ${r} · ${bzT('RETAKE TEST','POWTÓRZ TEST')}</button>`
          :`<button class="bzx-btn outw" onclick="bzpStart()">🎯 ${bzT('FIND YOUR LEVEL · 10 MIN','SPRAWDŹ SWÓJ POZIOM · 10 MIN')}</button>`;
}
function bzPlaceHtml(){
  const back=`<button class="bz-backlink" onclick="BZP=null;nav('business')">← Business English</button>`;
  if(!BZP||!BZP.q)return back+bzpIntroHtml();
  if(BZP.done)return back+bzpResultHtml();
  const it=BZP.q[BZP.i],n=BZP.q.length,L='ABCD',p=Math.round(100*BZP.i/n);
  const opts=it.ord.map((oi,k)=>{let cls='';if(BZP.pick!==null){if(oi===it.x.c)cls='ok';else if(k===BZP.pick)cls='no';else cls='dim';}
    return `<button class="bzx-opt ${cls}" ${BZP.pick!==null?'disabled':''} onclick="bzpPick(${k})"><span class="bzx-let">${L[k]}</span><span>${it.x.o[oi]}</span></button>`;}).join('');
  return back+`<section class="bzp-hero bzpl-hero"><div class="bzp-hero-in"><div class="bzp-top"><div class="bzp-brand"><span class="bzp-uic big">🎯</span><b>${bzT('PLACEMENT TEST','TEST POZIOMUJĄCY')}</b></div><span class="bzp-pill">${it.x.lv} · ${it.x.k}</span></div>
     <div class="bzpl-prog"><i><em style="width:${p}%"></em></i><small>${BZP.i+1} / ${n}</small></div></div></section>
   <section class="bzx-card bzpl-card"><div class="bzx-q"><span class="bzx-qn">${BZP.i+1}</span><b>${it.x.q}</b></div>
     <div class="bzx-opts">${opts}</div>
     <div class="bzpl-foot"><button class="bzx-btn sm out" ${BZP.pick!==null?'disabled':''} onclick="bzpSkip()">${bzT("I don't know · skip","Nie wiem · pomiń")}</button></div></section>`;
}
function bzpIntroHtml(){
  return `<section class="bzp-hero bzpl-hero"><div class="bzp-hero-in"><div class="bzp-top"><div class="bzp-brand"><span class="bzp-uic big">🎯</span><b>${bzT('PLACEMENT TEST','TEST POZIOMUJĄCY')}</b></div><span class="bzp-pill on">${BZ_ICON.check}${bzT('Free','Za darmo')}</span></div>
    <h1>${bzT('Find your Business English level','Sprawdź swój poziom Business English')}</h1>
    <p>${bzT('30 short questions from B1 to C1: grammar for work, the right phrase for a situation, polite tone and business vocabulary. About 10 minutes. If you don\'t know an answer, just skip it.','30 krótkich pytań od B1 do C1: gramatyka w pracy, właściwy zwrot do sytuacji, uprzejmy ton i słownictwo biznesowe. Około 10 minut. Jeśli nie znasz odpowiedzi, po prostu pomiń.')}</p>
    <div class="bzp-cta"><button class="bzx-btn gold big" onclick="bzpStart()">${bzT('START THE TEST','ZACZNIJ TEST')} ${BZ_ICON.arrow}</button></div></div></section>`;
}
function bzpResultHtml(){
  const r=bzpLevel(),lv=r==='C1+'?'C1':r;
  const u=BZ_UNITS.filter(x=>x.level===lv).find(x=>x.lessons.some(l=>!lessonDone(l.id)))||BZ_UNITS.find(x=>x.level===lv);
  const msg={
    'B1':[bzpScore('B1').ok<5?'Start with B1. Business English is easiest after general English at about B1, so the Teens & Adults course can help too.':'Start with B1: you know the basics, now make them sound professional.',
          bzpScore('B1').ok<5?'Zacznij od B1. Business English najlepiej idzie po ogólnym angielskim na poziomie około B1, więc pomocny może być też kurs Teens & Adults.':'Zacznij od B1: znasz podstawy, teraz nadaj im profesjonalny ton.'],
    'B2':['Start with B2: you handle everyday work English, now negotiate, persuade and write with confidence.','Zacznij od B2: radzisz sobie z codziennym angielskim w pracy, teraz negocjuj, przekonuj i pisz pewnie.'],
    'C1':['Start with C1: lead, influence and handle difficult conversations with nuance.','Zacznij od C1: prowadź, wpływaj na innych i prowadź trudne rozmowy z wyczuciem.'],
    'C1+':['Excellent! You passed every level. Go to C1 for the most advanced lessons and case studies.','Świetnie! Wszystkie poziomy zaliczone. Wybierz C1, gdzie są najbardziej zaawansowane lekcje i studia przypadków.']}[r];
  const rows=['B1','B2','C1'].map(l=>{const s=bzpScore(l),asked=BZP.q.some((it,k)=>it.x.lv===l&&k<=BZP.i);
    return `<div class="bzpl-row ${s.ok>=BZP_PASS?'pass':''}"><span class="bzp-lvb">${l}</span><i><em style="width:${asked?10*s.ok:0}%"></em></i><b>${asked?`${s.ok} / ${s.n}`:bzT('not tested','nie sprawdzono')}</b></div>`;}).join('');
  return `<section class="bzp-hero bzpl-hero"><div class="bzp-hero-in"><div class="bzp-top"><div class="bzp-brand"><span class="bzp-uic big">🎯</span><b>${bzT('YOUR RESULT','TWÓJ WYNIK')}</b></div><span class="bzp-pill on">${BZ_ICON.check}${bzT('Saved','Zapisano')}</span></div>
    <div class="bzpl-big"><span>${bzT('Your Business English level','Twój poziom Business English')}</span><b>${r==='C1+'?'C1':r}</b></div>
    <p>${bzT(msg[0],msg[1])}</p>
    <div class="bzp-cta"><button class="bzx-btn gold big" onclick="bzpGo()">${bzT('START','ZACZNIJ')}: ${lv}${u?` · ${u.title}`:''} ${BZ_ICON.arrow}</button><button class="bzx-btn outw" onclick="bzpStart()">${bzT('RETAKE','POWTÓRZ')}</button></div></div></section>
   <section class="bzx-card"><div class="bzx-ct"><span>📊</span>${bzT('Score by level','Wynik na poziomach')}</div><div class="bzpl-rows">${rows}</div>
    <p class="bzpl-note">${bzT(`You pass a level with ${BZP_PASS} of 10. ${BZP.stop?'The test stopped early because the next level would be too hard for now.':''}`,`Poziom zaliczasz przy ${BZP_PASS} z 10. ${BZP.stop?'Test zakończył się wcześniej, bo kolejny poziom byłby na razie za trudny.':''}`)}</p></section>`;
}
