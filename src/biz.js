/* ---------- Leogrow Business: a premium Business English section ----------
   2026-11-24: first version (12 units, B1–C1). 2026-11-25: deeper and longer, in the style of the user's own
   "Business English B1" lessons: every lesson is a set of sections with tabs at the top (Warm-up, Dialogue,
   Vocabulary, Language, Listening, Writing, Speaking, Flashcards), each section a page of white cards.
   Content: biz_b1/b2/c1.js (phrases, notes, quizzes, texts), biz_dlg_*.js (dialogue, reading questions,
   "say it better", roleplay, writing task for every lesson) and biz_cases.js (one case study per unit).
   It stays calm on purpose: no coins, confetti, bonus pop-ups or Leo inside the lessons. */
const BZ_UNITS=[], BZ_LESSONS=[];
const BZ_LV={B1:['Working in English','Angielski w pracy','Calls, emails, introductions and your first presentations.','Telefony, e-maile, przedstawianie się i pierwsze prezentacje.'],
  B2:['Leading the conversation','Prowadzisz rozmowę','Meetings, numbers, negotiations and unhappy customers.','Spotkania, liczby, negocjacje i niezadowoleni klienci.'],
  C1:['Influence and precision','Wpływ i precyzja','Pitching, formal reports, leading people and career moves.','Pitching, formalne raporty, zarządzanie ludźmi i kariera.']};
const BZ_UICON={bz1:'👋',bz2:'📞',bz3:'📧',bz4:'🎤',bz5:'🗓️',bz6:'📈',bz7:'🤝',bz8:'🛎️',bz9:'🚀',bz10:'📑',bz11:'🧭',bz12:'🎯'};
const BZ_FREE=1;                       // how many lessons (from the start of unit 1) are a free preview
let BZS={}, BZR={}, BZ_F='all';        // exercise state, results ("zone:exercise" → [ok,n,label]), level filter
const bzOn=()=>!!(activeLesson&&activeLesson.biz);
const bzT=(en,pl)=>(typeof LANG!=='undefined'&&LANG==='pl')?pl:en;
const bzSay=t=>String(t).replace(/\[\[[^|\]]+\|([^\]]+)\]\]/g,'$1').replace(/\[[^\]]*\]/g,' ').replace(/\s*\(…\)|…|\.\.\./g,' ').replace(/\s*\/\s*/g,' or ').replace(/\s+/g,' ').trim();
function bzSpeak(t){try{if('speechSynthesis' in window)speechSynthesis.cancel();}catch(e){}if(typeof speak==='function')speak(bzSay(t));}
const bzE=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BZ_ICON={
  play:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  ear:'<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
  mic:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg>',
  stop:'<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>',
  check:'<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  lock:'<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1zm2 0h6V8a3 3 0 0 0-6 0v2z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

/* ---------- text helpers: phrase cores, normalising and comparing typed answers ---------- */
function bzPhr(L){return L.groups.flatMap(g=>g[1].map(p=>({tag:p[0],en:p[1],note:p[2]||'',pl:p[3]||'',grp:g[0]})));}
function bzPick(a,n){return shuffle(a.slice()).slice(0,n);}
const bzTagName=t=>String(t).toLowerCase().replace(/^\w/,c=>c.toUpperCase());
function bzCores(en){ // the parts of a phrase you would actually see in a sentence ("I'm responsible for …" → "i'm responsible for")
  const out=[];String(en).split(/\s+\/\s+/).forEach(a=>{a.replace(/\([^)]*\)/g,' ').replace(/\[[^\]]*\]/g,'…').split(/…|\.\.\.|\+/).forEach(f=>{f=f.replace(/^[\s,.;:!?—–-]+|[\s,.;:!?—–-]+$/g,'').trim();if(f.split(/\s+/).length>=2&&f.length>=6)out.push(f);});});
  return out;
}
function bzNorm(s){
  return ' '+String(s).toLowerCase().replace(/[’‘`]/g,"'").replace(/won't/g,'will not').replace(/can't/g,'can not').replace(/n't\b/g,' not').replace(/'m\b/g,' am').replace(/'re\b/g,' are').replace(/'ll\b/g,' will').replace(/'ve\b/g,' have').replace(/'d\b/g,' would').replace(/\b(it|that|what|there|here|he|she|let)'s\b/g,(m,a)=>a==='let'?'let us':a+' is')
    .replace(/[^a-z0-9ąćęłńóśźż' ]+/g,' ').replace(/\s+/g,' ').trim()+' ';
}
function bzLev(a,b){if(a===b)return 0;const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array(n+1).fill(0).map((_,j)=>j);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}return p[n];}
function bzSim(want,got){ // 0–1, also forgives extra words after the phrase ("I'm in charge of sales")
  const w=bzNorm(want).trim(),g=bzNorm(got).trim();if(!g)return 0;
  const r=(a,b)=>1-bzLev(a,b)/Math.max(a.length,b.length,1);
  return Math.max(r(w,g),r(w,g.slice(0,w.length)),g.includes(w)?1:0);
}
function bzAnswers(en){return String(en).split(/\s+\/\s+/).map(a=>a.replace(/\([^)]*\)/g,'').replace(/…|\.\.\./g,'').replace(/\s+([,.?!])/g,'$1').replace(/[\s,—–-]+$/,'').trim()).filter(Boolean);}
const bzTypable=p=>{const a=String(p.en).split(/\s+\/\s+/)[0];return !/\[|\+/.test(a)&&bzAnswers(p.en)[0].split(/\s+/).length>=2&&!/…\s*\S.*…|^…/.test(a)&&a.replace(/…/g,'').trim().split(/\s+/).length<=10&&!/…[^,.?!]*\S/.test(a.replace(/…\s*$/,''));};
const bzUsed=(txt,p)=>{const t=bzNorm(txt);return bzCores(p.en).some(c=>t.includes(bzNorm(c)));};

/* ---------- building the lessons ---------- */
const BZ_SEC={warm:['🔥','Warm-up','Rozgrzewka'],dlg:['💬','Dialogue','Dialog'],read:['📄','Reading','Czytanie'],voc:['📋','Vocabulary','Słownictwo'],lang:['📐','Language','Język'],
  lis:['🎧','Listening','Słuchanie'],wri:['✍️','Writing','Pisanie'],spk:['🎤','Speaking','Mówienie'],fla:['🃏','Flashcards','Fiszki'],sit:['🧭','Situations','Sytuacje'],txt:['📝','Texts','Teksty']};
function bzSec(k,min,title,sub,ex){const s=BZ_SEC[k];return {type:'bzx',sec:k,ico:s[0],name:s[1],namePl:s[2],label:s[1],min,title,sub,ex};}
function bzFuncItems(P,n){ // "What function?": quote → which job does it do
  const tags=[...new Set(P.map(p=>p.tag))];if(tags.length<3)return [];
  return bzPick(P.filter(p=>bzTypable(p)||p.en.length<70),n).map(p=>{const o=shuffle(tags.filter(t=>t!==p.tag)).slice(0,3).concat(p.tag);const opts=shuffle(o).map(bzTagName);return [`“${p.en}”`].concat(opts,[opts.indexOf(bzTagName(p.tag))]);});
}
function bzLessonZones(L,X,u){
  const P=bzPhr(L),T=P.filter(bzTypable),z=[];
  const dl=[];
  if(X&&X.d)dl.push({k:'context',t:bzT('Context','Kontekst'),ic:'📖',d:X.c},{k:'dialogue',t:bzT('Read the dialogue','Przeczytaj dialog'),ic:'🗣️',p:X.p,d:X.d,P,tag:bzT('Tap underlined phrases for meaning','Dotknij podkreślonych zwrotów')});
  if(L.sample)dl.push({k:'model',t:L.sample.h,ic:'📄',d:L.sample,tag:bzT('Model text','Wzór')});
  if(X&&X.q)dl.push({k:'mc',t:bzT('Comprehension','Zrozumienie'),ic:'✅',sub:bzT('Choose the correct answer.','Wybierz poprawną odpowiedź.'),items:X.q,g:1});
  if(dl.length)z.push(bzSec('dlg',15,bzT('Dialogue','Dialog')+': '+L.t,bzT('Read the conversation carefully, then answer the questions.','Przeczytaj uważnie rozmowę, a potem odpowiedz na pytania.'),dl));
  const vo=[{k:'table',t:bzT('Phrase bank','Bank zwrotów'),ic:'📚',P,tip:bzT('<b>How</b> you say something is as important as <b>what</b> you say. Notice how polite and indirect these phrases are — this is key in English-language business culture.','W biznesie <b>jak</b> coś mówisz jest równie ważne jak <b>co</b> mówisz. Zwróć uwagę, jak grzeczne i pośrednie są te zwroty.')}];
  const fi=bzFuncItems(P,6);if(fi.length)vo.push({k:'mc',t:bzT('What function?','Jaka funkcja?'),ic:'🔗',tag:bzT('Choose the correct label','Wybierz etykietę'),sub:bzT('Read each phrase. What is the speaker doing?','Przeczytaj każdy zwrot. Co robi mówiący?'),items:fi,g:1});
  if(T.length>=4)vo.push({k:'recall',t:bzT('Say it in English','Powiedz to po angielsku'),ic:'⌨️',tag:bzT('Type the phrase','Wpisz zwrot'),items:bzPick(T,Math.min(6,T.length)),g:1});
  if(L.bank)vo.push({k:'gaps',t:L.bank.h,ic:'✏️',tag:bzT('Type the missing words','Wpisz brakujące słowa'),d:L.bank,g:1});
  z.push(bzSec('voc',15,bzT('Vocabulary','Słownictwo')+': '+(L.groups[0]&&L.groups[0][0]||L.t),bzT('Key phrases and expressions — learn them, then practise.','Kluczowe zwroty — naucz się ich, potem ćwicz.'),vo));
  const la=[];
  if(L.note)la.push({k:'note',t:L.note.h,ic:'📖',d:L.note});
  la.push({k:'mc',t:bzT('Choose the best phrase','Wybierz najlepszy zwrot'),ic:'🎯',sub:bzT('Read each situation and pick what a professional would say.','Przeczytaj sytuację i wybierz, co powiedziałby profesjonalista.'),items:L.mc,g:1});
  if(X&&X.f)la.push({k:'fix',t:bzT('Rewrite to sound more professional','Przepisz bardziej profesjonalnie'),ic:'🪄',sub:bzT('Each sentence is too direct or simply wrong. Write a better version, then check — a sample answer is shown.','Każde zdanie jest zbyt bezpośrednie albo błędne. Napisz lepszą wersję i sprawdź — zobaczysz przykładową odpowiedź.'),items:X.f,g:1});
  if(L.order)la.push({k:'order',t:L.order.h,ic:'🧩',d:L.order,g:1});
  z.push(bzSec('lang',15,bzT('Language','Język')+': '+(L.note?L.note.h:bzT('Using the phrases well','Dobre użycie zwrotów')),bzT('The grammar and the tone that make you sound professional.','Gramatyka i ton, dzięki którym brzmisz profesjonalnie.'),la));
  const li=[{k:'listen',t:bzT('Listen and choose','Posłuchaj i wybierz'),ic:'🎧',items:bzPick(P,6),pool:P,g:1}];
  if(T.length>=4)li.push({k:'dict',t:bzT('Listen and type','Posłuchaj i zapisz'),ic:'✍️',tag:bzT('Dictation','Dyktando'),items:bzPick(T,4),g:1});
  z.push(bzSec('lis',10,bzT('Listening','Słuchanie')+': '+bzT('catch the phrases','wyłap zwroty'),bzT('Train your ear: first choose, then write down what you hear.','Ćwicz ucho: najpierw wybierz, potem zapisz, co słyszysz.'),li));
  const w=L.task&&L.task.kind==='write'?L.task:null,wx=X&&X.wr;
  if(w||wx)z.push(bzSec('wri',15,bzT('Writing','Pisanie')+': '+(w?w.h:wx.h),bzT('Put the language to work in a real piece of writing.','Użyj języka w prawdziwym tekście.'),[{k:'write',t:bzT('Writing task','Zadanie'),ic:'📋',w,x:wx,P}]));
  const sp=[{k:'useful',t:bzT('Useful language — quick reference','Przydatne zwroty — ściąga'),ic:'🗣️',P}];
  if(X&&X.r)sp.push({k:'speak',t:bzT('Roleplay','Scenka')+': '+X.r.h,ic:'🎯',r:X.r});
  if(L.task&&L.task.kind==='speak')sp.push({k:'speak',t:bzT('Speaking task','Zadanie')+': '+L.task.h,ic:'🎙️',task:L.task});
  sp.push({k:'self',t:bzT('Self-assessment','Samoocena'),ic:'✅',items:(L.task&&L.task.kind==='speak'?L.task.check:null)||L.groups.map(g=>bzT('I can use phrases for: ','Umiem używać zwrotów: ')+g[0].toLowerCase()).concat(X&&X.r?[bzT('I can handle this situation: ','Poradzę sobie w sytuacji: ')+X.r.h.toLowerCase()]:[])});
  z.push(bzSec('spk',10,bzT('Speaking','Mówienie')+': '+(X&&X.r?X.r.h:L.t),bzT('Put it all together — say it out loud.','Połącz wszystko — powiedz to na głos.'),sp));
  z.push(bzSec('fla',0,bzT('Flashcards','Fiszki')+': '+L.t,bzT('Flip each card. Be honest — the ones you mark “See again” come back.','Odwróć każdą kartę. Bądź szczery — karty „Jeszcze raz” wrócą.'),[{k:'flash',t:bzT('Flashcards','Fiszki'),ic:'🃏',P}]));
  return z;
}
function bzWarm(L,X,P){
  const obj=[];
  if(X&&X.d)obj.push(bzT('Read and analyse a dialogue: ','Przeczytać i przeanalizować dialog: ')+X.c.split('.')[0].toLowerCase()+'.');
  obj.push(bzT(`Learn ${P.length} key phrases for ${L.t.toLowerCase()}`,`Nauczyć się ${P.length} kluczowych zwrotów: ${L.t.toLowerCase()}`));
  if(L.note)obj.push(bzT('Language focus: ','Język: ')+L.note.h);
  if(X&&X.f)obj.push(bzT('Rewrite direct sentences to sound professional','Przepisać zbyt bezpośrednie zdania na profesjonalne'));
  if((L.task&&L.task.kind==='write')||(X&&X.wr))obj.push(bzT('Write: ','Napisać: ')+((L.task&&L.task.kind==='write')?L.task.h:X.wr.h).toLowerCase());
  if(X&&X.r)obj.push(bzT('Speak: ','Powiedzieć: ')+X.r.h.toLowerCase());
  return bzSec('warm',5,bzT('Warm-up','Rozgrzewka')+': '+L.t,bzT('Get ready — activate what you already know.','Przygotuj się — przypomnij sobie, co już wiesz.'),[{k:'think',t:bzT('Think first','Najpierw pomyśl'),ic:'🧠',intro:L.intro,qs:(X&&X.w)||[],prev:bzPick(P,8).map(p=>p.en.replace(/\s*\([^)]*\)/g,''))},{k:'obj',t:bzT("Today's objectives",'Cele lekcji'),ic:'🎯',items:obj}]);
}
function bzCaseZones(K){
  const z=[],c=K.case,doc=c.doc;
  const brief=bzSec('warm',5,bzT('Briefing','Odprawa')+': '+c.h,bzT('Read your role and the situation before you start.','Przeczytaj swoją rolę i sytuację, zanim zaczniesz.'),[
    {k:'brief',t:bzT('Your role','Twoja rola'),ic:'🧑‍💼',role:c.role,brief:c.brief,intro:K.intro},
    {k:'obj',t:bzT('In this case study you will','W tym studium przypadku'),ic:'🎯',items:[bzT('Read a realistic document and find the key facts','Przeczytać realistyczny dokument i znaleźć kluczowe fakty'),bzT(`Answer ${K.qs.length} detailed questions`,`Odpowiedzieć na ${K.qs.length} szczegółowych pytań`),bzT(`Rewrite ${K.fix.length} weak lines so they sound professional`,`Poprawić ${K.fix.length} słabych zdań`),(K.task.kind==='write'?bzT('Write: ','Napisać: '):bzT('Speak: ','Powiedzieć: '))+K.task.h.toLowerCase()]}]);
  z.push(bzSec('read',15,bzT('Reading','Czytanie')+': '+c.h,bzT('Read carefully — the questions are about details.','Czytaj uważnie — pytania dotyczą szczegółów.'),[{k:'doc',t:c.h,ic:{email:'📧',chat:'💬',transcript:'🗣️',memo:'📄'}[doc.kind]||'📄',d:doc},{k:'mc',t:bzT('Check your understanding','Sprawdź, czy rozumiesz'),ic:'✅',sub:bzT('Choose the correct answer.','Wybierz poprawną odpowiedź.'),items:K.qs,g:1}]));
  z.push(bzSec('lang',10,bzT('Say it better','Powiedz to lepiej'),bzT('Every line below would hurt you at work. Fix it.','Każde z tych zdań zaszkodziłoby Ci w pracy. Popraw je.'),[{k:'fix',t:bzT('Rewrite to sound more professional','Przepisz bardziej profesjonalnie'),ic:'🪄',sub:bzT('Write your version, then check. A sample answer is shown after checking.','Napisz swoją wersję i sprawdź. Po sprawdzeniu zobaczysz przykład.'),items:K.fix,g:1}]));
  if(K.task.kind==='write')z.push(bzSec('wri',20,bzT('Writing','Pisanie')+': '+K.task.h,K.task.intro,[{k:'write',t:bzT('Writing task','Zadanie'),ic:'📋',w:K.task,P:[]}]));
  else z.push(bzSec('spk',20,bzT('Speaking','Mówienie')+': '+K.task.h,K.task.intro,[{k:'speak',t:K.task.h,ic:'🎯',task:K.task},{k:'self',t:bzT('Self-assessment','Samoocena'),ic:'✅',items:K.task.check}]));
  return {brief,zones:z};
}
function bzTestZones(S){
  const P=S.lessons.flatMap(bzPhr),T=P.filter(bzTypable),mc=S.lessons.flatMap(L=>L.mc),z=[];
  z.push(bzSec('sit',10,bzT('Situations','Sytuacje'),bzT('What would a professional say? 15 situations from the whole unit.','Co powiedziałby profesjonalista? 15 sytuacji z całego działu.'),[{k:'mc',t:bzT('Choose the best phrase','Wybierz najlepszy zwrot'),ic:'🎯',items:bzPick(mc,15),g:1}]));
  z.push(bzSec('voc',10,bzT('Vocabulary','Słownictwo'),bzT('Recognise the function, then produce the phrase yourself.','Rozpoznaj funkcję, a potem sam napisz zwrot.'),[{k:'mc',t:bzT('What function?','Jaka funkcja?'),ic:'🔗',items:bzFuncItems(P,6),g:1},{k:'recall',t:bzT('Say it in English','Powiedz to po angielsku'),ic:'⌨️',items:bzPick(T,8),g:1}]));
  z.push(bzSec('lis',10,bzT('Listening','Słuchanie'),bzT('Choose what you hear, then write it down.','Wybierz, co słyszysz, potem to zapisz.'),[{k:'listen',t:bzT('Listen and choose','Posłuchaj i wybierz'),ic:'🎧',items:bzPick(P,8),pool:P,g:1},{k:'dict',t:bzT('Listen and type','Posłuchaj i zapisz'),ic:'✍️',items:bzPick(T,5),g:1}]));
  const tx=S.lessons.filter(L=>L.bank).map((L,i)=>({k:'gaps',t:L.bank.h,ic:'✏️',d:L.bank,g:1}));
  if(tx.length)z.push(bzSec('txt',10,bzT('Texts','Teksty'),bzT('Every text from the unit — type the missing phrases.','Wszystkie teksty z działu — wpisz brakujące zwroty.'),tx));
  return z;
}
(function bzMake(){
  if(typeof BIZ_UNITS_SRC==='undefined')return;
  const XX=typeof BIZ_X!=='undefined'?BIZ_X:{},CS=typeof BIZ_CASES!=='undefined'?BIZ_CASES:[];
  BIZ_UNITS_SRC.forEach((S,ui)=>{
    const u={id:S.id,level:S.level,track:'business',title:S.title,sub:S.sub,subPl:S.subPl||'',emoji:'',badge:S.title,n:ui+1,biz:true,lessons:[]};
    S.lessons.forEach((L,li)=>{const id=S.id+'l'+(li+1),X=XX[id];
      u.lessons.push({id,biz:true,unit:u,num:u.n+'.'+(li+1),kind:'lesson',title:L.t,emoji:'',intro:L.intro,warm:bzWarm(L,X,bzPhr(L)),zones:bzLessonZones(L,X,u)});});
    const K=CS.find(k=>k.unit===S.id);
    if(K){const cz=bzCaseZones(K);u.lessons.push({id:S.id+'case',biz:true,unit:u,num:u.n+'.C',kind:'case',title:K.t,emoji:'',intro:K.intro,warm:cz.brief,zones:cz.zones});}
    u.lessons.push({id:S.id+'test',biz:true,test:true,kind:'test',unit:u,num:u.n+'.T',title:u.title+' — '+bzT('Unit test','Test działu'),emoji:'',
      intro:bzT('A long check of the whole unit: 15 situations, phrase functions, typing from memory, listening, dictation and every text from the lessons. Plan at least 30 minutes.','Długi test z całego działu: 15 sytuacji, funkcje zwrotów, pisanie z pamięci, słuchanie, dyktando i wszystkie teksty z lekcji. Zaplanuj co najmniej 30 minut.'),
      warm:bzSec('warm',2,bzT('Unit test','Test działu')+': '+u.title,bzT('No hints, no phrase tables — show what you know.','Bez podpowiedzi i tabel — pokaż, co umiesz.'),[{k:'brief',t:bzT('How it works','Jak to działa'),ic:'📋',intro:bzT('A long check of the whole unit: 15 situations, phrase functions, typing from memory, listening, dictation and every text from the lessons. Take your time — your score is shown at the end.','Długi test z całego działu: 15 sytuacji, funkcje zwrotów, pisanie z pamięci, słuchanie, dyktando i wszystkie teksty z lekcji. Nie spiesz się — wynik zobaczysz na końcu.')}]),zones:bzTestZones(S)});
    BZ_UNITS.push(u);BZ_LESSONS.push(...u.lessons);
  });
})();
const bzLesson=id=>BZ_LESSONS.find(l=>l.id===id);
const bzFreeLesson=l=>BZ_LESSONS.indexOf(l)>-1&&BZ_LESSONS.indexOf(l)<BZ_FREE;
const bzPrem=()=>typeof isPremium!=='function'||isPremium();
function bzMinutes(l){return (l.warm?l.warm.min:0)+l.zones.reduce((s,z)=>s+(z.min||0),0);}
function bzHM(m){return m>=60?`${Math.floor(m/60)} h${m%60?' '+(m%60)+' min':''}`:m+' min';}
const bzNext=()=>BZ_LESSONS.find(l=>!lessonDone(l.id))||null;

/* ---------- lesson frame: tabs, section header, cards ---------- */
const bzZ=i=>i===0?activeLesson.warm:zones[i];
function bzState(k,init){k=activeLesson.id+':'+k;if(!BZS[k])BZS[k]=init();return BZS[k];}
function bzPaint(){const p=$('panel'),y=window.scrollY;setPanel(renderZone(current));window.scrollTo(0,y);try{emojify($('panel'));}catch(e){}}
function bzRe(i,j){const el=document.getElementById(`bzc${i}-${j}`);if(!el)return bzPaint();el.outerHTML=bzCard(i,j);try{emojify(document.getElementById(`bzc${i}-${j}`));}catch(e){}}
function bzRecord(i,j,ok,n){const z=bzZ(i),e=z.ex[j];BZR[i+':'+j]=[ok,n,e.t];let a=0,b=0;Object.keys(BZR).forEach(k=>{if(k.split(':')[0]==String(i)){a+=BZR[k][0];b+=BZR[k][1];}});if(i===current)recordZoneStars(a,b);}
function bzScoreLine(ok,n){const p=ok/n;return `<div class="bzx-score"><div class="bzx-score-n">${ok}<small>/ ${n}</small></div><span>${p>=.9?bzT('Excellent — this is ready to use at work.','Świetnie — możesz tego używać w pracy.'):p>=.7?bzT('Good. Look again at the ones you missed.','Dobrze. Wróć do tych, w których był błąd.'):bzT('Worth another round — read the phrase bank again first.','Warto powtórzyć — najpierw przejrzyj jeszcze raz bank zwrotów.')}</span></div>`;}
function bzExNo(i,j){let n=0;for(let a=0;a<=i;a++){const z=bzZ(a);if(!z||!z.ex)continue;z.ex.forEach((e,b)=>{if((a<i||b<=j)&&e.g)n++;});}return n;}
function bzTabs(){
  const l=activeLesson,u=l.unit,all=[l.warm].concat(zones.slice(1,-1)),tot=all.reduce((s,z)=>s+(z.min||0),0),pct=Math.round(100*Math.min(current,zones.length-1)/(zones.length-1));
  return `<div class="bzx-top"><div class="bzx-brand"><b>${bzT('Unit','Dział')} ${u.n} · ${u.title}</b><span class="bzx-pill">${u.level} ${l.kind==='case'?bzT('CASE STUDY','STUDIUM PRZYPADKU'):l.test?bzT('UNIT TEST','TEST'):'BUSINESS'}</span><span class="bzx-pill">⏱ ${tot} MIN</span></div>
   <div class="bzx-prog"><span>${bzT('PROGRESS','POSTĘP')}</span><i><em style="width:${pct}%"></em></i><b>${pct}%</b></div>
   <nav class="bzx-tabs">${all.map((z,k)=>`<button class="bzx-tab ${k===current?'on':''} ${k<current?'done':''}" onclick="go(${k})"><span class="bzx-ti ${k<current?'ok':''}">${k<current?'✓':z.ico}</span><b>${bzT(z.name,z.namePl)}</b><small>${z.min?z.min+' min':bzT('bonus','bonus')}</small></button>`).join('')}</nav></div>`;
}
function bzSection(i){
  const z=bzZ(i),all=[activeLesson.warm].concat(zones.slice(1,-1)),prev=all[i-1],next=all[i+1];
  return `<div class="bzx">${bzTabs()}<div class="bzx-body">
   <header class="bzx-head"><span class="bzx-hico">${z.ico}</span><div><h2>${z.title}</h2><p>${z.sub}</p><span class="bzx-chip">${z.min?'⏱ '+z.min+' '+bzT('MINUTES','MINUT'):'⭐ BONUS'}</span></div></header>
   ${z.ex.map((e,j)=>bzCard(i,j)).join('')}
   <div class="bzx-nav">${prev?`<button class="bzx-btn out" onclick="go(${i-1})">← ${bzT(prev.name,prev.namePl).toUpperCase()}</button>`:'<span></span>'}
    <button class="bzx-btn gold" onclick="go(${i+1})">${next?(i===0?bzT('START','START')+' → ':'')+bzT(next.name,next.namePl).toUpperCase()+' →':'🏁 '+bzT('FINISH','ZAKOŃCZ')}</button></div></div></div>`;
}
function bzCard(i,j){
  const e=bzZ(i).ex[j],no=e.g?bzExNo(i,j):0;
  const head=`<div class="bzx-ct"><span>${e.ic||''}</span>${no?bzT('Exercise','Ćwiczenie')+' '+no+': ':''}${e.t}${e.tag?`<em class="bzx-tag">${e.tag}</em>`:''}</div>${e.sub?`<p class="bzx-cs">${e.sub}</p>`:''}`;
  let b='';
  try{b=({think:bzThink,obj:bzObj,brief:bzBrief,context:bzContext,dialogue:bzDialogue,model:bzModel,doc:bzDoc,mc:bzMC,table:bzTable,recall:bzRecall,dict:bzDict,listen:bzListen,gaps:bzGaps,order:bzOrder,fix:bzFix,note:bzNote,write:bzWrite,useful:bzUseful,speak:bzSpeakCard,self:bzSelf,flash:bzFlash})[e.k](i,j,e);}catch(err){console.warn('biz card',e.k,err);b='';}
  return `<section class="bzx-card k-${e.k}" id="bzc${i}-${j}">${head}${b}</section>`;
}

/* ---- warm-up, briefing, objectives, context ---- */
function bzThink(i,j,e){const s=bzState(i+':'+j,()=>({a:{}}));
  return `<div class="bzx-ibox">${e.intro}</div>${e.qs.map((q,k)=>`<div class="bzx-q"><span class="bzx-qn">${k+1}</span><b>${q}</b></div><textarea class="bzx-ta" rows="3" placeholder="${bzT('Write 2–3 sentences…','Napisz 2–3 zdania…')}" oninput="bzState('${i}:${j}',()=>({a:{}})).a[${k}]=this.value">${bzE(s.a[k]||'')}</textarea>`).join('')}
   <div class="bzx-wbox"><div class="bzx-lbl">${bzT('Quick preview — what do you already know?','Szybki podgląd — co już znasz?')}</div>${e.prev.map(p=>`<b>${bzE(p)}</b>`).join(' · ')}</div>`;}
function bzObj(i,j,e){return `<ul class="bzx-obj">${e.items.map(t=>`<li>✅ <span>${t}</span></li>`).join('')}</ul>`;}
function bzBrief(i,j,e){return `${e.role?`<div class="bzx-ibox"><b>${bzT('Your role:','Twoja rola:')}</b> ${e.role}</div>`:''}${e.brief?`<div class="bzx-wbox"><div class="bzx-lbl">${bzT('The situation','Sytuacja')}</div>${e.brief}</div>`:''}${!e.role&&e.intro?`<div class="bzx-ibox">${e.intro}</div>`:''}`;}
function bzContext(i,j,e){return `<div class="bzx-ibox"><b>${bzT('Situation:','Sytuacja:')}</b> ${e.d}</div>`;}

/* ---- dialogue with tap-to-translate phrases ---- */
function bzMarkPhrases(text,P){
  const fr=[];P.forEach((p,k)=>bzCores(p.en).forEach(c=>fr.push([c,k])));fr.sort((a,b)=>b[0].length-a[0].length);
  let t=bzE(text);const found=[];
  fr.forEach(([c,k])=>{const re=new RegExp('(^|[^\\w\\u0001])('+bzE(c).replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/'/g,"['’]")+')(?![\\w])','i');
    const m=t.match(re);if(m&&!/\u0001[^\u0002]*$/.test(t.slice(0,m.index+m[1].length))){found.push([m[2],k]);t=t.replace(re,(a,pre)=>pre+'\u0001'+(found.length-1)+'\u0002');}});
  return t.replace(/\u0001(\d+)\u0002/g,(a,n)=>{const [w,k]=found[+n],p=P[k];return `<mark class="bzx-hw" tabindex="0" onclick="this.classList.toggle('open')">${w}<span class="bzx-tip"><b>${bzE(p.pl)}</b>${p.note?`<small>${bzE(p.note)}</small>`:''}</span></mark>`;});
}
function bzDialogue(i,j,e){
  const ini=n=>String(n).split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();
  return `<div class="bzx-dlg">${e.d.map((r,k)=>{const sp=e.p[r[0]]||['?',''],side=r[0]?'b':'a';
    return `<div class="bzx-row ${side}"><span class="bzx-av av-${side}">${ini(sp[0])}</span><div class="bzx-bw"><span class="bzx-who">${sp[0]}${sp[1]?` <i>(${sp[1]})</i>`:''}</span><div class="bzx-bub">${bzMarkPhrases(r[1],e.P)}<button class="bzx-say" title="${bzT('Listen','Posłuchaj')}" onclick="bzSpeak(bzZ(${i}).ex[${j}].d[${k}][1])">${BZ_ICON.ear}</button></div></div></div>`;}).join('')}</div>
   <button class="bzx-btn navy sm" onclick="bzPlayAll(${i},${j})">${BZ_ICON.play}<span>${bzT('Listen to the whole dialogue','Posłuchaj całego dialogu')}</span></button>`;
}
function bzPlayAll(i,j){const d=bzZ(i).ex[j].d.map(r=>r[1]).join(' … ');bzSpeak(d);}
function bzModel(i,j,e){
  const d=e.d,tags=[];
  const txt=bzE(d.text).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,(m,t,p)=>{let k=tags.indexOf(t);if(k<0){tags.push(t);k=tags.length-1;}return `<mark class="bz-hl c${k%6}"><small>${t}</small>${p}</mark>`;});
  return `<div class="bz-legend">${tags.map((t,k)=>`<span class="bz-key c${k%6}">${t}</span>`).join('')}</div>
   <blockquote class="bz-model">${txt.split(/\n\n/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('')}</blockquote>
   <button class="bzx-btn out sm" onclick="bzSpeak(bzZ(${i}).ex[${j}].d.text)">${BZ_ICON.ear}<span>${bzT('Listen to the model','Posłuchaj wzoru')}</span></button>${d.tip?`<div class="bzx-ibox tip">${d.tip}</div>`:''}`;
}
/* ---- a case study document: email, chat, transcript or memo ---- */
function bzDoc(i,j,e){
  const d=e.d,meta=`<div class="bzx-meta">${d.meta.map(m=>`<div><span>${m[0]}:</span><b>${bzE(m[1])}</b></div>`).join('')}</div>`;
  if(d.kind==='email'||d.kind==='memo')return `<div class="bzx-doc ${d.kind}"><div class="bzx-docbar"><i></i><i></i><i></i><span>${d.kind==='email'?bzT('Inbox','Skrzynka'):bzT('Document','Dokument')}</span></div>${meta}<div class="bzx-doctext">${bzE(d.text).split(/\n\n/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('')}</div></div>`;
  const lines=d.text.split('\n'),who=[];
  const rows=lines.map(l=>{const m=l.match(/^([A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż ]{1,22}):\s*(.*)$/);if(!m)return `<div class="bzx-note">${bzE(l)}</div>`;let k=who.indexOf(m[1]);if(k<0){who.push(m[1]);k=who.length-1;}const side=k%2?'b':'a';
    return `<div class="bzx-row ${side}"><span class="bzx-av av-${side}">${bzE(m[1]).slice(0,2).toUpperCase()}</span><div class="bzx-bw"><span class="bzx-who">${bzE(m[1])}</span><div class="bzx-bub">${bzE(m[2])}</div></div></div>`;}).join('');
  return `<div class="bzx-doc ${d.kind}">${meta}<div class="bzx-dlg">${rows}</div></div>`;
}

/* ---- multiple choice, all questions on one card ---- */
function bzMC(i,j,e){
  const s=bzState(i+':'+j,()=>({a:{},ord:e.items.map(q=>shuffle(q.slice(1,-1).map((_,k)=>k)))}));
  const n=e.items.length,done=Object.keys(s.a).length,ok=e.items.filter((q,k)=>s.a[k]===q[q.length-1]).length;
  return `<div class="bzx-qs">${e.items.map((q,k)=>{const opts=q.slice(1,-1),ci=q[q.length-1],a=s.a[k];
    return `<div class="bzx-qb"><div class="bzx-q"><span class="bzx-qn">${k+1}</span><b>${q[0]}</b></div><div class="bzx-opts">${s.ord[k].map((oi,x)=>`<button class="bzx-opt ${a!=null?(oi===ci?'ok':oi===a?'no':'dim'):''}" ${a!=null?'disabled':''} onclick="bzMCA(${i},${j},${k},${oi})"><span class="bzx-let">${'ABCD'[x]}</span><span>${opts[oi]}</span></button>`).join('')}</div></div>`;}).join('')}</div>
   ${done===n?bzScoreLine(ok,n):`<p class="bzx-meta2">${done} / ${n} ${bzT('answered','odpowiedzi')}</p>`}`;
}
function bzMCA(i,j,k,oi){const e=bzZ(i).ex[j],s=bzState(i+':'+j,()=>({}));if(s.a[k]!=null)return;s.a[k]=oi;
  const n=e.items.length;if(Object.keys(s.a).length===n)bzRecord(i,j,e.items.filter((q,x)=>s.a[x]===q[q.length-1]).length,n);bzRe(i,j);}

/* ---- phrase bank table, quick reference ---- */
function bzTable(i,j,e){
  return `${e.tip?`<div class="bzx-wbox"><div class="bzx-lbl">💡 ${bzT('Study tip','Wskazówka')}</div>${e.tip}</div>`:''}
   <div class="bzx-tw"><table class="bzx-tbl"><thead><tr><th>${bzT('Function','Funkcja')}</th><th>${bzT('English phrase','Zwrot po angielsku')}</th><th>${bzT('Polish meaning','Po polsku')}</th></tr></thead><tbody>
   ${e.P.map((p,k)=>`<tr><td class="cat">${bzE(p.tag)}</td><td><b>${bzE(p.en)}</b>${p.note?`<small>${bzE(p.note)}</small>`:''}<button class="bzx-say in" onclick="bzSpeak(bzZ(${i}).ex[${j}].P[${k}].en)">${BZ_ICON.ear}</button></td><td>${bzE(p.pl)}</td></tr>`).join('')}</tbody></table></div>`;
}
function bzUseful(i,j,e){
  const by={};e.P.forEach(p=>{(by[p.tag]=by[p.tag]||[]).push(p.en);});
  return `<div class="bzx-tw"><table class="bzx-tbl two"><thead><tr><th>${bzT('You want to…','Chcesz…')}</th><th>${bzT('Say this','Powiedz')}</th></tr></thead><tbody>${Object.keys(by).map(t=>`<tr><td>${bzTagName(t)}</td><td>“${by[t].slice(0,2).map(bzE).join('” / “')}”</td></tr>`).join('')}</tbody></table></div>`;
}

/* ---- typing: from Polish, and dictation ---- */
function bzTypeCard(i,j,e,mode){
  const s=bzState(i+':'+j,()=>({v:{},chk:false,hint:{}}));
  const res=k=>{const it=e.items[k],v=s.v[k]||'';return Math.max(...bzAnswers(it.en).map(a=>bzSim(a,v)));};
  const ok=s.chk?e.items.filter((_,k)=>res(k)>=.86).length:0;
  return `<div class="bzx-typ">${e.items.map((it,k)=>{const r=s.chk?res(k):0,st=s.chk?(r>=.86?'ok':r>=.7?'near':'no'):'',ans=bzAnswers(it.en)[0];
    const hint=ans.split(/\s+/).map(w=>w[0]+w.slice(1).replace(/[a-zA-Z]/g,'_')).join(' ');
    return `<div class="bzx-ti-row ${st}"><span class="bzx-qn">${k+1}</span><div class="bzx-ti-b">
      ${mode==='dict'?`<button class="bzx-btn navy sm" onclick="bzSpeak(bzZ(${i}).ex[${j}].items[${k}].en)">${BZ_ICON.play}<span>${bzT('Play','Odtwórz')}</span></button>`:`<div class="bzx-pl">🇵🇱 ${bzE(it.pl)}</div>`}
      <input class="bzx-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" value="${bzE(s.v[k]||'')}" placeholder="${mode==='dict'?bzT('Type what you hear…','Wpisz, co słyszysz…'):bzT('Type it in English…','Wpisz po angielsku…')}" oninput="bzState('${i}:${j}',()=>({v:{}})).v[${k}]=this.value" onkeydown="if(event.key==='Enter'){const n=this.closest('.bzx-ti-row').nextElementSibling;if(n&&n.querySelector('input'))n.querySelector('input').focus();}">
      ${s.chk?`<div class="bzx-fb">${r>=.86?'✔️ '+bzT('Correct','Dobrze'):r>=.7?'〰️ '+bzT('Almost — check the spelling:','Prawie — sprawdź pisownię:'):'✖️ '+bzT('The phrase is:','Zwrot to:')} ${r>=.86&&r<1?'<b>'+bzE(it.en)+'</b>':r<.86?'<b>'+bzE(it.en)+'</b>':''}</div>`:(s.hint[k]&&mode!=='dict'?`<div class="bzx-hint">${bzE(hint)}</div>`:'')}
      ${!s.chk&&mode!=='dict'&&!s.hint[k]?`<button class="bzx-link" onclick="bzState('${i}:${j}',()=>({})).hint[${k}]=1;bzRe(${i},${j})">💡 ${bzT('Hint','Podpowiedź')}</button>`:''}</div></div>`;}).join('')}</div>
   <div class="bzx-actions"><button class="bzx-btn navy" onclick="bzTypeCheck(${i},${j})">${bzT('CHECK ANSWERS','SPRAWDŹ')}</button><button class="bzx-btn out" onclick="delete BZS[activeLesson.id+':${i}:${j}'];bzRe(${i},${j})">${bzT('RESET','OD NOWA')}</button></div>
   ${s.chk?bzScoreLine(ok,e.items.length):''}`;
}
const bzRecall=(i,j,e)=>bzTypeCard(i,j,e,'recall');
const bzDict=(i,j,e)=>bzTypeCard(i,j,e,'dict');
function bzTypeCheck(i,j){const e=bzZ(i).ex[j],s=bzState(i+':'+j,()=>({v:{}}));document.querySelectorAll(`#bzc${i}-${j} .bzx-in`).forEach((el,k)=>s.v[k]=el.value);s.chk=true;
  if(!s.scored){s.scored=1;bzRecord(i,j,e.items.filter((it,k)=>Math.max(...bzAnswers(it.en).map(a=>bzSim(a,s.v[k]||'')))>=.86).length,e.items.length);}bzRe(i,j);}

/* ---- listen and choose (one phrase at a time) ---- */
function bzListen(i,j,e){
  const s=bzState(i+':'+j,()=>({k:0,ok:0,a:null,opts:null})),n=e.items.length;
  if(s.k>=n)return bzScoreLine(s.ok,n)+`<div class="bzx-actions"><button class="bzx-btn out" onclick="delete BZS[activeLesson.id+':${i}:${j}'];bzRe(${i},${j})">${bzT('TRY AGAIN','JESZCZE RAZ')}</button></div>`;
  const it=e.items[s.k];
  if(!s.opts){const others=shuffle(e.pool.filter(p=>p.en!==it.en)).slice(0,3);s.opts=shuffle([it].concat(others));}
  return `<div class="bzx-lis"><button class="bzx-play" onclick="bzSpeak(bzZ(${i}).ex[${j}].items[${s.k}].en)">${BZ_ICON.play}</button><div><b>${bzT('Play the phrase and choose what you hear','Odtwórz zwrot i wybierz, co słyszysz')}</b><small>${s.k+1} / ${n}</small></div></div>
   <div class="bzx-opts">${s.opts.map((o,x)=>`<button class="bzx-opt ${s.a!=null?(o===it?'ok':x===s.a?'no':'dim'):''}" ${s.a!=null?'disabled':''} onclick="bzListenPick(${i},${j},${x})"><span class="bzx-let">${'ABCD'[x]}</span><span>${bzE(o.en)}</span></button>`).join('')}</div>
   ${s.a!=null?`<p class="bzx-meta2">🇵🇱 ${bzE(it.pl)}</p><div class="bzx-actions"><button class="bzx-btn navy" onclick="bzListenNext(${i},${j})">${s.k+1<n?bzT('NEXT PHRASE','NASTĘPNY'):bzT('SEE RESULT','WYNIK')} →</button></div>`:''}`;
}
function bzListenPick(i,j,x){const s=bzState(i+':'+j,()=>({})),e=bzZ(i).ex[j];if(s.a!=null)return;s.a=x;if(s.opts[x]===e.items[s.k])s.ok++;bzRe(i,j);}
function bzListenNext(i,j){const s=bzState(i+':'+j,()=>({})),e=bzZ(i).ex[j];s.k++;s.a=null;s.opts=null;if(s.k>=e.items.length)bzRecord(i,j,s.ok,e.items.length);bzRe(i,j);if(s.k<e.items.length)setTimeout(()=>bzSpeak(e.items[s.k].en),300);}

/* ---- text with gaps: type the missing phrases (word bank shown) ---- */
function bzGapsOf(d){const p=d.text.split(/\{([^}]+)\}/);return {parts:p,ans:p.filter((_,k)=>k%2)};}
function bzGaps(i,j,e){
  const d=e.d,G=bzGapsOf(d),s=bzState(i+':'+j,()=>({v:{},chk:false,show:false,bank:shuffle(G.ans.concat(d.extra||[]))}));
  const st=g=>{const v=s.show?G.ans[g]:(s.v[g]||'');return s.chk||s.show?(bzSim(G.ans[g],v)>=.9&&bzNorm(v).trim().length>=bzNorm(G.ans[g]).trim().length-2?'ok':'no'):'';};
  let g=-1;
  const body=G.parts.map((t,k)=>{if(k%2===0)return bzE(t).replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>');g++;const w=Math.max(6,G.ans[g].length+2);
    return `<span class="bzx-gap ${st(g)}"><sup>${g+1}</sup><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:${w}ch" value="${bzE(s.show?G.ans[g]:(s.v[g]||''))}" ${s.show?'disabled':''} oninput="bzState('${i}:${j}',()=>({v:{}})).v[${g}]=this.value"></span>`;}).join('');
  const ok=G.ans.filter((a,k)=>bzSim(a,s.v[k]||'')>=.9).length;
  return `${e.k&&!bzZ(i).ex[j].noBank?`<div class="bzx-wbox"><div class="bzx-lbl">${bzT('Word bank','Bank słów')}</div>${s.bank.map(b=>`<b>${bzE(b)}</b>`).join(' · ')}</div>`:''}
   <div class="bzx-text"><p>${body}</p></div>
   <div class="bzx-actions"><button class="bzx-btn navy" onclick="bzGapCheck(${i},${j})" ${s.show?'disabled':''}>${bzT('CHECK ANSWERS','SPRAWDŹ')}</button><button class="bzx-btn out" onclick="bzGapShow(${i},${j})">${bzT('SHOW ANSWERS','POKAŻ ODPOWIEDZI')}</button><button class="bzx-btn out" onclick="delete BZS[activeLesson.id+':${i}:${j}'];bzRe(${i},${j})">${bzT('RESET','OD NOWA')}</button></div>
   ${s.chk?bzScoreLine(ok,G.ans.length):''}`;
}
function bzGapRead(i,j){const s=bzState(i+':'+j,()=>({v:{}}));document.querySelectorAll(`#bzc${i}-${j} .bzx-gap input`).forEach((el,k)=>s.v[k]=el.value);return s;}
function bzGapScore(i,j,s){const G=bzGapsOf(bzZ(i).ex[j].d);if(!s.scored){s.scored=1;bzRecord(i,j,G.ans.filter((a,k)=>bzSim(a,s.v[k]||'')>=.9).length,G.ans.length);}}
function bzGapCheck(i,j){const s=bzGapRead(i,j);s.chk=true;bzGapScore(i,j,s);bzRe(i,j);}
function bzGapShow(i,j){const s=bzGapRead(i,j);bzGapScore(i,j,s);s.show=true;s.chk=false;bzRe(i,j);}

/* ---- put in order ---- */
function bzOrder(i,j,e){
  const d=e.d,s=bzState(i+':'+j,()=>({mix:shuffle(d.items.map((_,k)=>k)),seq:[],chk:false})),n=d.items.length,full=s.seq.length===n;
  return `<p class="bzx-cs">${d.sub||bzT('Tap the parts in the right order. Tap a placed part to take it back.','Dotykaj części we właściwej kolejności. Dotknij ułożonej części, aby ją cofnąć.')}</p>
   <ol class="bz-seq">${s.seq.map((k,p)=>`<li class="${s.chk?(k===p?'ok':'no'):''}" onclick="bzUnplace(${i},${j},${p})"><span>${p+1}</span>${d.items[k]}</li>`).join('')}${full?'':`<li class="bz-slot"><span>${s.seq.length+1}</span>${bzT('Choose the next part below','Wybierz kolejną część poniżej')}</li>`}</ol>
   <div class="bz-pool">${s.mix.filter(k=>!s.seq.includes(k)).map(k=>`<button class="bz-part" onclick="bzPlace(${i},${j},${k})">${d.items[k]}</button>`).join('')}</div>
   ${full?`<div class="bzx-actions"><button class="bzx-btn navy" onclick="bzOrderCheck(${i},${j})">${bzT('CHECK','SPRAWDŹ')}</button><button class="bzx-btn out" onclick="delete BZS[activeLesson.id+':${i}:${j}'];bzRe(${i},${j})">${bzT('START AGAIN','OD NOWA')}</button></div>`:''}
   ${s.chk?bzScoreLine(s.seq.filter((k,p)=>k===p).length,n):''}`;
}
function bzPlace(i,j,k){const s=bzState(i+':'+j,()=>({}));if(s.chk)return;s.seq.push(k);bzRe(i,j);}
function bzUnplace(i,j,p){const s=bzState(i+':'+j,()=>({}));if(s.chk)return;s.seq.splice(p,1);bzRe(i,j);}
function bzOrderCheck(i,j){const s=bzState(i+':'+j,()=>({}));s.chk=true;if(!s.scored){s.scored=1;bzRecord(i,j,s.seq.filter((k,p)=>k===p).length,s.seq.length);}bzRe(i,j);}

/* ---- rewrite to sound professional: typed, checked against key words, sample shown ---- */
function bzFix(i,j,e){
  const s=bzState(i+':'+j,()=>({v:{},chk:false}));
  const good=k=>{const t=bzNorm(s.v[k]||'');return e.items[k][2].some(w=>t.includes(bzNorm(w)));};
  const ok=s.chk?e.items.filter((_,k)=>good(k)).length:0;
  return `<div class="bzx-fix">${e.items.map((it,k)=>`<div class="bzx-fx ${s.chk?(good(k)?'ok':'no'):''}"><div class="bzx-q"><span class="bzx-qn">${k+1}</span><b>${bzT('Direct:','Zbyt bezpośrednio:')} <i>“${bzE(it[0])}”</i></b></div>
     <textarea class="bzx-ta sm" rows="2" placeholder="${bzT('Your professional version…','Twoja profesjonalna wersja…')}" oninput="bzState('${i}:${j}',()=>({v:{}})).v[${k}]=this.value">${bzE(s.v[k]||'')}</textarea>
     ${s.chk?`<div class="bzx-sample"><span>${good(k)?'✔️ '+bzT('Good — you used a key expression.','Dobrze — użyłeś kluczowego wyrażenia.'):'💡 '+bzT('Compare with the sample:','Porównaj z przykładem:')}</span><b>${bzE(it[1])}</b></div>`:''}</div>`).join('')}</div>
   <div class="bzx-actions"><button class="bzx-btn navy" onclick="bzFixCheck(${i},${j})">${bzT('CHECK & SHOW SAMPLE ANSWERS','SPRAWDŹ I POKAŻ PRZYKŁADY')}</button>${s.chk?`<button class="bzx-btn out" onclick="bzState('${i}:${j}',()=>({})).chk=false;bzRe(${i},${j})">${bzT('HIDE','UKRYJ')}</button>`:''}</div>
   ${s.chk?bzScoreLine(ok,e.items.length):''}`;
}
function bzFixCheck(i,j){const e=bzZ(i).ex[j],s=bzState(i+':'+j,()=>({v:{}}));document.querySelectorAll(`#bzc${i}-${j} textarea`).forEach((el,k)=>s.v[k]=el.value);s.chk=true;
  if(!s.scored&&e.items.some((_,k)=>(s.v[k]||'').trim())){s.scored=1;bzRecord(i,j,e.items.filter((it,k)=>{const t=bzNorm(s.v[k]||'');return it[2].some(w=>t.includes(bzNorm(w)));}).length,e.items.length);}bzRe(i,j);}

function bzNote(i,j,e){return `<div class="bzx-ibox note">${e.d.html}</div>`;}

/* ---- writing: an email form, word count and the lesson phrases that light up when you use them ---- */
function bzWrite(i,j,e){
  const w=e.w,x=e.x||{},key='bzw:'+activeLesson.id;let saved='',subj='';try{saved=localStorage.getItem(key)||'';subj=localStorage.getItem(key+':s')||'';}catch(err){}
  const min=(w&&w.min)||x.min||80,P=(e.P||[]).filter(p=>bzCores(p.en).length).slice(0,10);
  const steps=w?w.steps:null;
  return `<div class="bzx-ibox"><b>${bzT('Situation:','Sytuacja:')}</b> ${w?w.intro:x.s}</div>
   ${steps?`<div class="bzx-wbox"><div class="bzx-lbl">📝 ${bzT('You must include in your text','W tekście musi się znaleźć')}</div><ol class="bzx-must">${steps.map(st=>`<li><b>${st[0]}</b> — ${st[1]}</li>`).join('')}</ol></div>`
     :`<div class="bzx-wbox"><div class="bzx-lbl">📝 ${bzT('You must include','Musisz użyć')}</div>${bzT(`At least <b>4 phrases</b> from this lesson (they light up below when you use them) · a clear purpose · a polite closing · at least <b>${min} words</b>.`,`Co najmniej <b>4 zwroty</b> z tej lekcji (podświetlą się poniżej) · jasny cel · grzeczne zakończenie · co najmniej <b>${min} słów</b>.`)}</div>`}
   ${P.length?`<div class="bzx-lbl sp">${bzT('Phrases from this lesson','Zwroty z tej lekcji')}</div><div class="bzx-used" id="bzUsed">${P.map((p,k)=>`<span class="${bzUsed(saved,p)?'on':''}" data-k="${k}">${bzE(p.en)}</span>`).join('')}</div>`:''}
   <div class="bzx-mail"><div class="bzx-mrow"><span>${bzT('To:','Do:')}</span><b>${bzE(x.to||bzT('the person in the task','osoba z zadania'))}</b></div>
    <div class="bzx-mrow"><span>${bzT('Subject:','Temat:')}</span><input type="text" value="${bzE(subj||'')}" placeholder="${bzE(x.su||bzT('Subject…','Temat…'))}" oninput="try{localStorage.setItem('${key}:s',this.value)}catch(e){}"></div>
    <textarea class="bzx-ta big" id="bzWrite" rows="11" placeholder="${bzT('Dear …,\n\nI am writing to …','Dear …,\n\nI am writing to …')}" oninput="bzWords(${i},${j},this)">${bzE(saved)}</textarea></div>
   <p class="bzx-wc" id="bzWc">${bzWcTxt(saved,min,P)}</p>
   ${w&&w.check?`<div class="bzx-lbl sp">${bzT('Self-check','Sprawdź siebie')}</div>`+bzChecks(i,j,w.check):''}`;
}
const bzWc=t=>(String(t).trim().match(/\S+/g)||[]).length;
function bzWcTxt(t,min,P){const n=bzWc(t),u=P.filter(p=>bzUsed(t,p)).length;return `<b class="${n>=min?'ok':''}">${n}</b> ${bzT('words','słów')} (${bzT('aim for','cel:')} ${min}+)${P.length?` · <b class="${u>=4?'ok':''}">${u}</b> ${bzT('lesson phrases used','użytych zwrotów')}`:''}`;}
function bzWords(i,j,el){const e=bzZ(i).ex[j],min=(e.w&&e.w.min)||(e.x&&e.x.min)||80,P=(e.P||[]).filter(p=>bzCores(p.en).length).slice(0,10);
  try{localStorage.setItem('bzw:'+activeLesson.id,el.value);}catch(err){}
  const c=document.getElementById('bzWc');if(c)c.innerHTML=bzWcTxt(el.value,min,P);
  document.querySelectorAll('#bzUsed span').forEach(s=>s.classList.toggle('on',bzUsed(el.value,P[+s.dataset.k])));}

/* ---- speaking: a scenario card, a recorder and self-assessment ---- */
let BZ_REC=null;
function bzSpeakCard(i,j,e){
  const r=e.r,t=e.task;
  return `<div class="bzx-scn"><div class="bzx-lbl">🎙️ ${bzT('Scenario','Scenariusz')}</div><p>${r?r.s:t.intro}</p><ul>${(r?r.b:t.steps.map(s=>`<b>${s[0]}:</b> ${s[1]}`)).map(b=>`<li>→ ${b}</li>`).join('')}</ul>${t&&t.topics?`<div class="bzx-lbl">${bzT('Ideas','Pomysły')}</div><ul>${t.topics.map(x=>`<li>→ ${x}</li>`).join('')}</ul>`:''}</div>
   <div class="bzx-rec" id="bzRec${i}-${j}">${bzRecHtml(i,j)}</div>${t&&t.check&&bzZ(i).ex.every(x=>x.k!=='self')?`<div class="bzx-lbl sp">${bzT('Self-check','Sprawdź siebie')}</div>`+bzChecks(i,j,t.check):''}`;
}
function bzSelf(i,j,e){return bzChecks(i,j,e.items);}
function bzChecks(i,j,items){const s=bzState(i+':'+j+':c',()=>({}));return `<div class="bzx-checks">${items.map((c,k)=>`<label class="${s[k]?'on':''}"><input type="checkbox" ${s[k]?'checked':''} onchange="bzState('${i}:${j}:c',()=>({}))[${k}]=this.checked;this.parentNode.classList.toggle('on',this.checked)"><span>${c}</span></label>`).join('')}</div>`;}
function bzRecHtml(i,j){
  const R=BZ_REC&&BZ_REC.at===i+'-'+j?BZ_REC:null,can=!!(navigator.mediaDevices&&window.MediaRecorder);
  if(!can)return `<span class="bzx-meta2">${bzT('Say it out loud — recording is not available in this browser.','Powiedz to na głos — nagrywanie nie działa w tej przeglądarce.')}</span>`;
  if(R&&R.state==='rec')return `<button class="bzx-btn red" onclick="bzRecStop()">${BZ_ICON.stop}<span>${bzT('STOP','STOP')}</span></button><span class="bzx-meta2">${bzT('Recording…','Nagrywanie…')} <b id="bzRecT">0:00</b></span>`;
  return `<button class="bzx-btn navy" onclick="bzRecStart(${i},${j})">${BZ_ICON.mic}<span>${R&&R.url?bzT('RECORD AGAIN','NAGRAJ PONOWNIE'):bzT('RECORD YOURSELF','NAGRAJ SIEBIE')}</span></button>${R&&R.url?`<audio controls src="${R.url}"></audio>`:`<span class="bzx-meta2">${bzT('Then play it back and tick the self-assessment. Nothing is sent anywhere.','Potem odsłuchaj i zaznacz samoocenę. Nic nie jest nigdzie wysyłane.')}</span>`}`;
}
async function bzRecStart(i,j){
  try{const st=await navigator.mediaDevices.getUserMedia({audio:true});const mr=new MediaRecorder(st),ch=[],at=i+'-'+j;
    if(BZ_REC&&BZ_REC.url)URL.revokeObjectURL(BZ_REC.url);
    BZ_REC={state:'rec',mr,t0:Date.now(),at};mr.ondataavailable=ev=>ch.push(ev.data);
    const box=()=>document.getElementById('bzRec'+at);
    mr.onstop=()=>{st.getTracks().forEach(t=>t.stop());BZ_REC={state:'done',at,url:URL.createObjectURL(new Blob(ch,{type:mr.mimeType||'audio/webm'}))};const r=box();if(r)r.innerHTML=bzRecHtml(i,j);};
    mr.start();const r=box();if(r)r.innerHTML=bzRecHtml(i,j);
    BZ_REC.tm=setInterval(()=>{const el=document.getElementById('bzRecT');if(!el||!BZ_REC||BZ_REC.state!=='rec'){clearInterval(BZ_REC&&BZ_REC.tm);return;}const s=Math.floor((Date.now()-BZ_REC.t0)/1000);el.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');},500);
  }catch(err){_comboToastText(bzT('Microphone is blocked — you can still practise out loud.','Mikrofon jest zablokowany — nadal możesz ćwiczyć na głos.'));}
}
function bzRecStop(){if(BZ_REC&&BZ_REC.mr){clearInterval(BZ_REC.tm);BZ_REC.mr.stop();}}

/* ---- flashcards: flip, then "I knew it" or "See again" ---- */
function bzFlash(i,j,e){
  const s=bzState(i+':'+j,()=>({q:shuffle(e.P.map((_,k)=>k)),flip:false,known:0,again:0,seen:0}));
  if(!s.q.length)return `<div class="bzx-fdone"><b>🏁 ${bzT('Deck complete','Talia ukończona')}</b><span>${bzT(`You knew ${s.known} of ${e.P.length} phrases the first time.`,`Za pierwszym razem znałeś ${s.known} z ${e.P.length} zwrotów.`)}</span><button class="bzx-btn out" onclick="delete BZS[activeLesson.id+':${i}:${j}'];bzRe(${i},${j})">${bzT('START AGAIN','OD NOWA')}</button></div>`;
  const p=e.P[s.q[0]];
  return `<div class="bzx-wbox"><div class="bzx-lbl">💡 ${bzT('How to use','Jak używać')}</div>${bzT('Flip the card. If you knew the Polish meaning, click <b>I knew it ✓</b>. If not, click <b>See again ↺</b> — it comes back at the end of the deck.','Odwróć kartę. Jeśli znałeś znaczenie, kliknij <b>Znałem ✓</b>. Jeśli nie — <b>Jeszcze raz ↺</b>, a karta wróci na koniec talii.')}</div>
   <div class="bzx-fstat"><span>${bzT('Cards left','Zostało')}: <b>${s.q.length}</b></span><span>✓ <b>${s.known}</b></span><span>↺ <b>${s.again}</b></span></div>
   <div class="bzx-fc ${s.flip?'flip':''}" onclick="bzState('${i}:${j}',()=>({})).flip=!bzState('${i}:${j}',()=>({})).flip;bzRe(${i},${j})"><div class="bzx-fin">
     <div class="bzx-ff front"><span class="bzx-ftag">● ${bzE(p.tag)}</span><b>${bzE(p.en)}</b><small>${bzT('tap to reveal →','dotknij, aby odkryć →')}</small></div>
     <div class="bzx-ff back"><span class="bzx-ftag">🇵🇱</span><b>${bzE(p.pl)}</b>${p.note?`<small>${bzE(p.note)}</small>`:''}</div></div></div>
   <div class="bzx-factions"><button class="bzx-fbtn again" ${s.flip?'':'disabled'} onclick="bzFl(${i},${j},0)">↺ ${bzT('SEE AGAIN','JESZCZE RAZ')}</button><button class="bzx-fbtn skip" onclick="bzSpeak(bzZ(${i}).ex[${j}].P[${s.q[0]}].en)">${BZ_ICON.ear}</button><button class="bzx-fbtn knew" ${s.flip?'':'disabled'} onclick="bzFl(${i},${j},1)">✓ ${bzT('I KNEW IT','ZNAŁEM')}</button></div>`;
}
function bzFl(i,j,ok){const s=bzState(i+':'+j,()=>({})),k=s.q.shift();if(ok){if(!s.miss||!s.miss[k])s.known++;}else{s.again++;s.miss=s.miss||{};s.miss[k]=1;s.q.push(k);}s.flip=false;bzRe(i,j);}

/* ---- the end of a lesson: a quiet summary, no coins or confetti ---- */
function bzFinish(){
  const l=activeLesson,rows=[];let ok=0,n=0;
  Object.keys(BZR).sort((a,b)=>{const x=a.split(':').map(Number),y=b.split(':').map(Number);return x[0]-y[0]||x[1]-y[1];}).forEach(k=>{const r=BZR[k];ok+=r[0];n+=r[1];rows.push([r[2],r[0],r[1]]);});
  const pct=n?Math.round(100*ok/n):null,stars=pct==null?3:pct>=90?3:pct>=70?2:1;
  const prev=C.lessons[l.id]||{stars:0,points:0,done:false};
  const _today=localDay();C.days=C.days||[];if(!C.days.includes(_today))C.days.push(_today);
  C.lessons[l.id]={done:true,stars:Math.max(prev.stars||0,stars),points:Math.max(prev.points||0,pct||0)};
  C.active=null;saveProgress();
  const nx=BZ_LESSONS[BZ_LESSONS.indexOf(l)+1];
  return `<div class="bzx"><div class="bzx-body"><div class="bzx-finish">
   <header class="bzx-head"><span class="bzx-hico">🏁</span><div><h2>${bzT('Lesson complete','Lekcja ukończona')}</h2><p>${l.unit.level} · ${l.num} · ${l.title}</p></div></header>
   <section class="bzx-card">${pct!=null?`<div class="bzx-big"><div class="bzx-ring" style="--p:${pct}"><b>${pct}%</b></div><div><b>${bzT('of answers correct','poprawnych odpowiedzi')}</b><span>${ok} / ${n} · ${rows.length} ${bzT('exercises','ćwiczeń')}</span></div></div>`:''}
   ${rows.length?`<div class="bzx-results">${rows.map(r=>`<div><span>${r[0]}</span><i><em style="width:${Math.round(100*r[1]/r[2])}%"></em></i><b>${r[1]}/${r[2]}</b></div>`).join('')}</div>`:''}</section>
   <div class="bzx-nav"><button class="bzx-btn out" onclick="bzBackToUnit()">← ${bzT('BACK TO THE UNIT','WRÓĆ DO DZIAŁU')}</button>${nx?`<button class="bzx-btn gold" onclick="bzOpen('${nx.id}')">${bzT('NEXT','DALEJ')}: ${nx.title} →</button>`:''}</div></div></div></div>`;
}
function bzBackToUnit(){const u=activeLesson&&activeLesson.unit;showCourse();if(u){VIEW={track:'business',level:u.id};renderCourse();}}

const _bzRZ=renderZone;
renderZone=function(i){
  if(!bzOn())return _bzRZ.apply(this,arguments);
  const z=zones[i];
  if(z.type==='finish')return bzFinish();
  if(i===0||z.type==='bzx')return bzSection(i);
  return _bzRZ.apply(this,arguments);
};
/* no bonus pop-ups inside Business lessons; Business sections paint their own emoji after go() */
(function(){const _mb=maybeShowBonus;maybeShowBonus=function(){if(bzOn())return;return _mb.apply(this,arguments);};
  const _go=go;go=function(i){const r=_go.apply(this,arguments);if(bzOn()){try{emojify($('panel'));}catch(e){}try{const t=document.querySelector('.bzx-tabs'),o=t&&t.querySelector('.bzx-tab.on');if(o)t.scrollLeft=o.offsetLeft-(t.clientWidth-o.offsetWidth)/2;}catch(e){}try{if(LANG==='pl')applyLang($('panel'));}catch(e){}}return r;};})();
/* opening a Business lesson: Premium check, then the normal lesson frame in the Business look */
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
      const ul=m.querySelector('.prem-feats');if(ul&&!ul.querySelector('.bz-feat'))ul.insertAdjacentHTML('afterbegin',`<li class="bz-feat"><span>💼</span>${bzT('Business English: '+BZ_UNITS.length+' units from B1 to C1 — long lessons, case studies, meetings, emails, negotiations, presentations','Business English: '+BZ_UNITS.length+' działów od B1 do C1 — długie lekcje, studia przypadków, spotkania, e-maile, negocjacje, prezentacje')}</li>`);}}catch(e){}
    return r;};
})();

/* ---------- the section page ---------- */
function bzLeoHead(){try{const r=(LEO_AGES.senior||LEO_AGES.adult);return r&&r.h?`<img class="bz-leo" src="${r.h}" alt="Leo" draggable="false">`:'';}catch(e){return '';}}
function bzPremLine(){
  if(bzPrem())return `<span class="bzp-pill on">${BZ_ICON.check}${bzT('Included in your Premium','W ramach Twojego Premium')}</span>`;
  return `<span class="bzp-pill">${BZ_ICON.lock}${bzT('Premium · first lesson free','Premium · pierwsza lekcja za darmo')}</span>`;
}
function bzStats(ls){const d=ls.filter(l=>lessonDone(l.id)).length;return {d,n:ls.length,p:ls.length?Math.round(100*d/ls.length):0};}
const BZ_FLOW=[['🔥','Warm-up','Rozgrzewka'],['💬','Dialogue','Dialog'],['📋','Vocabulary','Słownictwo'],['📐','Language','Język'],['🎧','Listening','Słuchanie'],['✍️','Writing','Pisanie'],['🎤','Speaking','Mówienie'],['🃏','Flashcards','Fiszki']];
function bzHomeHtml(){
  const all=bzStats(BZ_LESSONS),nx=bzNext(),mins=BZ_LESSONS.reduce((s,l)=>s+bzMinutes(l),0),cases=BZ_LESSONS.filter(l=>l.kind==='case').length;
  let h=`<section class="bzp-hero"><div class="bzp-hero-in"><div class="bzp-top"><div class="bzp-brand">${bzLeoHead()}<b>Leogrow<i>Business</i></b></div>${bzPremLine()}</div>
    <h1>Business English</h1>
    <p>${bzT('Long, real-world lessons for work: dialogues, phrase banks, grammar for tone, listening, writing, speaking and case studies. From B1 to C1.','Długie lekcje z prawdziwych sytuacji w pracy: dialogi, banki zwrotów, gramatyka tonu, słuchanie, pisanie, mówienie i studia przypadków. Od B1 do C1.')}</p>
    <div class="bzp-stats"><div><span>📚</span><b>${BZ_UNITS.length}</b><small>${bzT('units','działów')}</small></div><div><span>📝</span><b>${BZ_LESSONS.length}</b><small>${bzT('lessons, cases & tests','lekcji, case study i testów')}</small></div><div><span>⏱</span><b>${Math.round(mins/60)} h</b><small>${bzT('of learning','nauki')}</small></div><div><span>🎯</span><b>${all.p}%</b><small>${bzT('complete','ukończone')}</small></div></div>
    <div class="bzp-cta">${nx?`<button class="bzx-btn gold big" onclick="bzOpen('${nx.id}')">${all.d?bzT('CONTINUE','KONTYNUUJ'):bzT('START','ZACZNIJ')}: ${nx.unit.level} · ${nx.title} ${BZ_ICON.arrow}</button>`:''}${bzPrem()?'':`<button class="bzx-btn outw" onclick="openPremium('business')">${bzT('UNLOCK BUSINESS ENGLISH','ODBLOKUJ BUSINESS ENGLISH')}</button>`}</div></div></section>
  <section class="bzp-flow"><div class="bzp-flow-h"><b>${bzT('Every lesson, about 85 minutes','Każda lekcja, około 85 minut')}</b><small>${bzT(`+ ${cases} case studies and ${BZ_UNITS.length} long unit tests`,`+ ${cases} studiów przypadku i ${BZ_UNITS.length} długich testów`)}</small></div>
   <div class="bzp-steps">${BZ_FLOW.map((f,k)=>`<div><span>${f[0]}</span><b>${bzT(f[1],f[2])}</b></div>`).join('<i>›</i>')}</div></section>
  <div class="bz-filter">${['all','B1','B2','C1'].map(f=>`<button class="${BZ_F===f?'on':''}" onclick="BZ_F='${f}';renderCourse()">${f==='all'?bzT('All levels','Wszystkie'):f}</button>`).join('')}</div>`;
  ['B1','B2','C1'].filter(lv=>BZ_F==='all'||BZ_F===lv).forEach(lv=>{
    const us=BZ_UNITS.filter(u=>u.level===lv);if(!us.length)return;
    h+=`<div class="bzp-lv"><span class="bzp-lvb">${lv}</span><div><b>${bzT(BZ_LV[lv][0],BZ_LV[lv][1])}</b><small>${bzT(BZ_LV[lv][2],BZ_LV[lv][3])}</small></div><i></i></div><div class="bzp-units">`;
    us.forEach(u=>{const s=bzStats(u.lessons),m=u.lessons.reduce((a,l)=>a+bzMinutes(l),0);
      h+=`<button class="bzp-unit lv-${lv} ${s.d===s.n?'done':''}" onclick="nav('business','${u.id}')">
        <div class="bzp-uh"><span class="bzp-uic">${BZ_UICON[u.id]||'📘'}</span><div><small>${u.level} · ${bzT('Unit','Dział')} ${u.n}</small><b>${u.title}</b></div><span class="bzx-chip">⏱ ${bzHM(m)}</span></div>
        <p>${bzT(u.sub,u.subPl||u.sub)}</p>
        <div class="bzp-tags"><span>📘 ${u.lessons.filter(l=>l.kind==='lesson').length} ${bzT('lessons','lekcje')}</span>${u.lessons.some(l=>l.kind==='case')?`<span>🗂️ ${bzT('Case study','Case study')}</span>`:''}<span>📝 ${bzT('Unit test','Test')}</span></div>
        <div class="bzp-prog"><i><em style="width:${s.p}%"></em></i><small>${s.d} / ${s.n}</small></div></button>`;});
    h+=`</div>`;
  });
  return h+`<p class="bz-foot">${bzT('Audio uses your device voice for the business phrases.','Dźwięk zwrotów biznesowych korzysta z głosu urządzenia.')}</p>`;
}
function bzUnitHtml(u){
  const s=bzStats(u.lessons),i=BZ_UNITS.indexOf(u),pv=BZ_UNITS[i-1],nx=BZ_UNITS[i+1],prem=bzPrem(),m=u.lessons.reduce((a,l)=>a+bzMinutes(l),0);
  let h=`<button class="bz-backlink" onclick="nav('business')">← Business English</button>
   <section class="bzp-hero unit"><div class="bzp-hero-in"><div class="bzp-top"><div class="bzp-brand"><span class="bzp-uic big">${BZ_UICON[u.id]||'📘'}</span><b>${u.level} · ${bzT('UNIT','DZIAŁ')} ${u.n}</b></div>${bzPremLine()}</div>
    <h1>${u.title}</h1><p>${bzT(u.sub,u.subPl||u.sub)}</p>
    <div class="bzp-stats"><div><span>📝</span><b>${u.lessons.length}</b><small>${bzT('lessons & tests','lekcji i testów')}</small></div><div><span>⏱</span><b>${bzHM(m)}</b><small>${bzT('in total','razem')}</small></div><div><span>🎯</span><b>${s.p}%</b><small>${s.d} / ${s.n} ${bzT('done','ukończone')}</small></div></div></div></section>
   <section class="bzx-card bzp-goals"><div class="bzx-ct"><span>🎯</span>${bzT('In this unit you will learn to','W tym dziale nauczysz się')}</div><ul class="bzx-obj">${u.lessons.filter(l=>l.kind==='lesson').map(l=>`<li>✅ <span><b>${l.title}</b> — ${l.intro}</span></li>`).join('')}</ul></section>
   <div class="bzp-lessons">`;
  u.lessons.forEach((l,k)=>{const d=lessonDone(l.id),r=C.lessons[l.id],lock=!prem&&!bzFreeLesson(l),cur=C.active&&C.active.id===l.id;
    const secs=[l.warm].concat(l.zones);
    h+=`<button class="bzp-lesson ${d?'done':''} k-${l.kind} ${lock?'locked':''}" onclick="bzOpen('${l.id}')">
      <span class="bzp-ln">${l.kind==='test'?'📝':l.kind==='case'?'🗂️':l.num}</span>
      <span class="bzp-lb"><small>${l.kind==='test'?bzT('UNIT TEST','TEST DZIAŁU'):l.kind==='case'?bzT('CASE STUDY · HARDER','STUDIUM PRZYPADKU · TRUDNIEJSZE'):bzT('LESSON','LEKCJA')+' '+l.num}</small><b>${l.kind==='test'?bzT('Unit test','Test działu'):l.title}</b><em>${l.intro}</em>
       <span class="bzp-secs">${secs.map(z=>`<i title="${z.name}">${z.ico}</i>`).join('')}<span class="bzx-chip">⏱ ${bzHM(bzMinutes(l))}</span>${d&&r&&r.points?`<span class="bzp-best">${bzT('best','najlepiej')} ${r.points}%</span>`:''}</span></span>
      <span class="bzp-st">${d?`<i class="ok">${BZ_ICON.check}</i>`:lock?`<i class="lk">${BZ_ICON.lock}</i>`:`<i class="go">${cur?bzT('Continue','Dalej'):bzT('Start','Start')}</i>`}</span></button>`;});
  h+=`</div><div class="level-nav bz-unitnav">${pv?`<button class="btn secondary" onclick="nav('business','${pv.id}')">← ${pv.title}</button>`:'<span></span>'}${nx?`<button class="btn secondary" onclick="nav('business','${nx.id}')">${nx.title} →</button>`:''}</div>`;
  return h;
}
/* home: one quiet card that leads to the section; side menu: its own item */
function bzHomeCard(){
  const s=bzStats(BZ_LESSONS);
  return `<button class="bz-homecard" onclick="nav('business')"><span class="bz-hc-tag">LEOGROW BUSINESS · PREMIUM</span><b>Business English</b>
    <small>${bzT(`${BZ_UNITS.length} units for work · long lessons, case studies, meetings, emails, negotiations`,`${BZ_UNITS.length} działów do pracy · długie lekcje, studia przypadków, spotkania, e-maile, negocjacje`)}${s.d?` · ${s.p}%`:''}</small><span class="bz-hc-go">${BZ_ICON.arrow}</span></button>`;
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
