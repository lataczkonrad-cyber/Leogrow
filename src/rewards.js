
/* =====================================================================
   Rewards: coin wallet, shop, 3 tries per question, stamina (energy)
   Data lives in C.w and syncs with the rest of the progress.
   ===================================================================== */
const SHOP_ITEMS=[
 // power-ups (used up)
 {id:'freeze',cat:'power',give:['freeze',1],icon:'🧊',price:50,en:'Streak freeze',pl:'Zamrożenie serii',d:'Keeps your streak safe if you miss a day.',dp:'Chroni Twoją serię, gdy opuścisz dzień.'},
 {id:'hint5',cat:'power',give:['hint',5],icon:'💡',price:40,en:'Hint pack ×5',pl:'Podpowiedzi ×5',d:'Hide a wrong answer, or show a letter in Wordle and spelling.',dp:'Ukryj złą odpowiedź albo pokaż literę w Wordle i literowaniu.'},
 {id:'spin3',cat:'power',give:['spin',3],icon:'🎡',price:25,en:'3 extra wheel spins',pl:'3 dodatkowe obroty koła',d:'Spin the Fortune Wheel more times. Right answers on extra spins pay +3 🪙.',dp:'Więcej obrotów Koła Fortuny. Dobra odpowiedź po dodatkowym obrocie daje +3 🪙.'},
 {id:'energy',cat:'power',now:true,icon:'⚡',price:30,en:'Energy refill',pl:'Pełna energia',d:'Fills your energy to the top right away.',dp:'Od razu napełnia energię do pełna.'},
 // Leo's wardrobe (one per slot)
 {id:'o_cap',cat:'leo',slot:'head',icon:'🧢',price:80,en:'Red baseball cap',pl:'Czerwona czapka z daszkiem'},
 {id:'o_party',cat:'leo',slot:'head',icon:'🎉',price:60,en:'Party hat',pl:'Czapeczka imprezowa'},
 {id:'o_sunhat',cat:'leo',slot:'head',icon:'👒',price:100,en:'Summer straw hat',pl:'Słomkowy kapelusz'},
 {id:'o_beanie',cat:'leo',slot:'head',icon:'❄️',price:100,en:'Winter beanie',pl:'Zimowa czapka',season:true},
 {id:'o_flowers',cat:'leo',slot:'head',icon:'🌸',price:110,en:'Spring flower crown',pl:'Wiosenny wianek',season:true},
 {id:'o_tophat',cat:'leo',slot:'head',icon:'🎩',price:120,en:'Top hat',pl:'Cylinder'},
 {id:'o_pirate',cat:'leo',slot:'head',icon:'⚓',price:160,en:'Pirate hat',pl:'Kapelusz pirata'},
 {id:'o_grad',cat:'leo',slot:'head',icon:'🎓',price:180,en:'Graduation cap',pl:'Biret'},
 {id:'o_wizard',cat:'leo',slot:'head',icon:'✨',price:200,en:'Wizard hat',pl:'Kapelusz czarodzieja'},
 {id:'o_crown',cat:'leo',slot:'head',icon:'👑',price:250,en:'Royal crown',pl:'Korona'},
 {id:'o_glasses',cat:'leo',slot:'face',icon:'👓',price:90,en:'Gold reading glasses',pl:'Złote okulary'},
 {id:'o_shades',cat:'leo',slot:'face',icon:'🕶️',price:110,en:'Cool sunglasses',pl:'Okulary przeciwsłoneczne'},
 {id:'o_starglasses',cat:'leo',slot:'face',icon:'⭐',price:120,en:'Star glasses',pl:'Gwiazdkowe okulary'},
 {id:'o_mask',cat:'leo',slot:'face',icon:'🦸',price:130,en:'Hero mask',pl:'Maska bohatera'},
 {id:'o_bow',cat:'leo',slot:'neck',icon:'🎀',price:70,en:'Bow tie',pl:'Muszka'},
 {id:'o_tie',cat:'leo',slot:'neck',icon:'👔',price:90,en:'Smart tie',pl:'Elegancki krawat'},
 {id:'o_scarf',cat:'leo',slot:'neck',icon:'🧣',price:100,en:'Winter scarf',pl:'Zimowy szalik',season:true},
 {id:'o_medal',cat:'leo',slot:'neck',icon:'🏅',price:140,en:'Gold medal',pl:'Złoty medal'},
 {id:'o_cape',cat:'leo',slot:'back',icon:'🦸',price:220,en:'Hero cape',pl:'Peleryna bohatera'},
 {id:'o_royal',cat:'leo',slot:'back',icon:'👑',price:300,en:'Royal cloak',pl:'Królewski płaszcz'},
 // app themes
 {id:'t_classic',cat:'theme',free:true,icon:'🌌',price:0,en:'Classic navy & gold',pl:'Klasyczny granat i złoto',sw:['#050a30','#ecb83a']},
 {id:'t_forest',cat:'theme',icon:'🌲',price:150,en:'Forest',pl:'Las',sw:['#0b2a1c','#e3b341']},
 {id:'t_ocean',cat:'theme',icon:'🌊',price:150,en:'Ocean',pl:'Ocean',sw:['#052a3a','#ff9f6b']},
 {id:'t_sunset',cat:'theme',icon:'🌅',price:200,en:'Sunset',pl:'Zachód słońca',sw:['#2a0b3a','#ff8a3d']},
 {id:'t_berry',cat:'theme',icon:'🍇',price:200,en:'Berry',pl:'Jagoda',sw:['#330a26','#f2b84b']},
 {id:'t_snow',cat:'theme',icon:'❄️',price:250,en:'Winter snow',pl:'Zimowy śnieg',sw:['#0e2741','#9fd8ff'],season:true},
 // bonus lessons
 {id:'b_idioms',cat:'lesson',icon:'🦜',price:120,en:'Everyday idioms',pl:'Codzienne idiomy',d:'“Piece of cake”, “break the ice” and 8 more.',dp:'„Piece of cake”, „break the ice” i 8 innych.'},
 {id:'b_slang',cat:'lesson',icon:'🇬🇧',price:120,en:'British slang',pl:'Brytyjski slang',d:'Cheers, mate! Words people really say in the UK.',dp:'Cheers, mate! Słowa, których naprawdę używa się w UK.'},
 {id:'b_phrasal',cat:'lesson',icon:'🎉',price:120,en:'Phrasal verb party',pl:'Impreza czasowników frazowych',d:'Get up, give up, find out and more.',dp:'Get up, give up, find out i inne.'},
 {id:'b_football',cat:'lesson',icon:'⚽',price:200,en:'Football Fever',pl:'Gorączka futbolu',d:'A big 80-minute lesson on 3 levels (Kids A2, Teens & Adults A2, B1): offside, penalties, rules, a cup final and fan talk.',dp:'Duża lekcja na 80 minut na 3 poziomach (Kids A2, Teens & Adults A2, B1): spalony, karne, zasady, finał pucharu i język kibiców.'},
 {id:'b_rhymes',cat:'lesson',icon:'🎶',price:120,en:'Songs, rhymes & tongue twisters',pl:'Piosenki, rymy i łamańce językowe',d:'Sing a chant, find rhymes and twist your tongue.',dp:'Zaśpiewaj rymowankę, znajdź rymy i połam język.'},
 // profile frames
 {id:'f_gold',cat:'frame',icon:'🟡',price:60,en:'Gold ring',pl:'Złota obwódka'},
 {id:'f_leaf',cat:'frame',icon:'🍃',price:90,en:'Leafy',pl:'Liście'},
 {id:'f_rainbow',cat:'frame',icon:'🌈',price:120,en:'Rainbow',pl:'Tęcza'},
 {id:'f_star',cat:'frame',icon:'✨',price:150,en:'Starry',pl:'Gwiazdki'},
 {id:'f_fire',cat:'frame',icon:'🔥',price:200,en:'Fire',pl:'Ogień'},
 {id:'f_ice',cat:'frame',icon:'🧊',price:200,en:'Ice',pl:'Lód'},
 // profile badges
 {id:'g_globe',cat:'badge',icon:'🌍',price:80,en:'Globetrotter',pl:'Obieżyświat'},
 {id:'g_rocket',cat:'badge',icon:'🚀',price:80,en:'Rocket learner',pl:'Rakieta'},
 {id:'g_lion',cat:'badge',icon:'🦁',price:100,en:'Brave heart',pl:'Odważne serce'},
 {id:'g_brain',cat:'badge',icon:'🧠',price:100,en:'Big brain',pl:'Mózgowiec'},
 {id:'g_target',cat:'badge',icon:'🎯',price:120,en:'Sharp shooter',pl:'Snajper'},
 {id:'g_dragon',cat:'badge',icon:'🐉',price:250,en:'Dragon',pl:'Smok'},
 {id:'g_gem',cat:'badge',icon:'💎',price:300,en:'Diamond',pl:'Diament'},
];
const SHOP_CATS=[
 {id:'power',icon:'⚡',en:'Power-ups',pl:'Wzmocnienia'},
 {id:'leo',icon:'👒',en:"Leo's wardrobe",pl:'Szafa Leo'},
 {id:'theme',icon:'🎨',en:'App themes',pl:'Motywy aplikacji'},
 {id:'lesson',icon:'📚',en:'Bonus lessons',pl:'Lekcje bonusowe'},
 {id:'frame',icon:'🖼️',en:'Profile frames',pl:'Ramki profilu'},
 {id:'badge',icon:'🏷️',en:'Profile badges',pl:'Odznaki profilu'},
];
const SHOP_BY=Object.fromEntries(SHOP_ITEMS.map(i=>[i.id,i]));
const SLOT_OF={leo:null,theme:'theme',frame:'frame',badge:'badge'};

/* ---------- wallet ---------- */
function W(){C.w=C.w||{};const w=C.w;w.e=w.e||{};w.p=w.p||{};w.u=w.u||{};w.eq=w.eq||{};return w;}
const _uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
function coins(){const w=W();let n=0;for(const k in w.e)n+=+w.e[k]||0;for(const k in w.p)n-=+(w.p[k][1])||0;return Math.max(0,n);}
function owned(id){const it=SHOP_BY[id];if(it&&it.free)return true;const w=W();for(const k in w.p)if(w.p[k][0]===id)return true;return false;}
function shopCount(key){const w=W();let n=0;for(const k in w.p){const it=SHOP_BY[w.p[k][0]];if(it&&it.give&&it.give[0]===key)n+=it.give[1];}for(const k in w.u)if(w.u[k]===key)n--;return Math.max(0,n);}
function shopUse(key){if(shopCount(key)<=0)return false;W().u[_uid()]=key;saveProgress();renderWallet();return true;}
function shopEarn(n,why){n=Math.round(+n||0);if(n<=0)return 0;const w=W(),k=why?String(why):_uid();if(w.e[k])return 0;w.e[k]=n;saveProgress();renderWallet();return n;}
function mergeW(a,b){a=a||{};b=b||{};const o={e:Object.assign({},a.e,b.e),p:Object.assign({},a.p,b.p),u:Object.assign({},a.u,b.u)};
  o.eq=((a.eq&&a.eq.t)||0)>=((b.eq&&b.eq.t)||0)?(a.eq||{}):(b.eq||{});
  const ea=a.en,eb=b.en;o.en=ea&&eb?(((ea.s||0)>=(eb.s||0))?ea:eb):(ea||eb);if(!o.en)delete o.en;return o;}
(function(){
  const _lp=loadProgress; loadProgress=function(){_lp();try{const d=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(d&&d.C&&d.C.w)C.w=d.C.w;}catch(e){}};
  const _mp=mergeProgress; mergeProgress=function(a,b){const o=_mp(a,b);o.C.w=mergeW(a.C&&a.C.w,b.C&&b.C.w);return o;};
})();

/* ---------- stamina (energy) ---------- */
const EN_MAX=20, EN_MS=3*60*1000;
// tester accounts never get blocked; local tester mode (file / ?tester) keeps stamina so it can be tested
const energyFree=()=>(typeof isTesterAccount==='function'&&isTesterAccount())||(typeof isPremium==='function'&&isPremium()&&!TESTER);
function energyNow(){const w=W(),now=Date.now();let en=w.en;if(!en||typeof en.v!=='number'){en=w.en={v:EN_MAX,t:now,s:now};}
  if(en.v>=EN_MAX){en.v=EN_MAX;en.t=now;return EN_MAX;}
  const g=Math.floor((now-en.t)/EN_MS);if(g>0){en.v=Math.min(EN_MAX,en.v+g);en.t=en.v>=EN_MAX?now:en.t+g*EN_MS;}
  return en.v;}
function energyNextMs(){const v=energyNow();if(v>=EN_MAX)return 0;return Math.max(0,EN_MS-(Date.now()-W().en.t));}
function energySet(v){energyNow();const en=W().en,now=Date.now();if(en.v>=EN_MAX&&v<EN_MAX)en.t=now;en.v=Math.max(0,Math.min(EN_MAX,v));en.s=now;saveProgress();renderWallet();}
const energyCounts=()=>!!(activeLesson&&!activeLesson.review)&&!energyFree();
let _lastSpend=0;
function spendEnergy(){
  if(!energyCounts())return;const now=Date.now();if(now-_lastSpend<300)return;_lastSpend=now;
  const v=energyNow();energySet(v-1);
  if(v-1<=0)setTimeout(()=>showNoEnergy(),700);
}
const _fmtMs=ms=>{const s=Math.ceil(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
(function(){const _rw=registerWrongAnswer;registerWrongAnswer=function(){const r=_rw.apply(this,arguments);spendEnergy();return r;};})();

function showNoEnergy(lesson){
  if(energyFree())return;
  let m=document.getElementById('noEnergy');if(!m){m=document.createElement('div');m.id='noEnergy';m.className='bonus-overlay rw-overlay';document.body.appendChild(m);}
  m._lesson=lesson||null;
  const draw=()=>{
    const v=energyNow(),c=coins(),rv=PROF()?reviewWords(PROF().track).length:0;
    m.innerHTML=`<div class="bonus-modal rw-modal"><div class="rw-big">${v>0?'⚡':'😴'}</div>
      <h3>${v>0?T2('Energy is back!','Energia wróciła!'):T2('Out of energy','Brak energii')}</h3>
      <div class="rw-meter big"><i style="width:${v/EN_MAX*100}%"></i><span>⚡ ${v}/${EN_MAX}</span></div>
      <p>${v>0?T2('You can carry on.','Możesz grać dalej.'):T2('Every wrong try uses 1 ⚡. Leo needs a little rest.','Każda błędna próba zabiera 1 ⚡. Leo potrzebuje chwili odpoczynku.')}</p>
      <p class="rw-small">${T2('+1 ⚡ every 3 minutes','+1 ⚡ co 3 minuty')}${v<EN_MAX?` · ${T2('next in','następna za')} <b id="enNext">${_fmtMs(energyNextMs())}</b>`:''}</p>
      <div class="rw-actions">
        ${v>0?`<button class="btn btn-gold" onclick="closeNoEnergy(true)">${T2('Continue →','Dalej →')}</button>`:''}
        <button class="btn ${v>0?'secondary':'btn-gold'}" ${c<30?'disabled':''} onclick="buyItem('energy');closeNoEnergy(true)">⚡ ${T2('Refill','Napełnij')} · 30 🪙</button>
        ${c<30?`<p class="rw-small">${T2('You have','Masz')} ${c} 🪙</p>`:''}
        ${rv?`<button class="btn secondary" onclick="closeNoEnergy();if(activeLesson)showCourse();openReview(PROF().track)">🔁 ${T2('Practise review words (no energy needed)','Powtórz trudne słowa (bez energii)')}</button>`:''}
        <button class="btn secondary" onclick="closeNoEnergy();if(activeLesson)showCourse()">🗺️ ${T2('Back to course','Wróć do kursu')}</button>
        ${TESTER?`<button class="btn secondary" onclick="energySet(${EN_MAX});closeNoEnergy(true)">🧪 ${T2('Tester: refill free','Tester: napełnij za darmo')}</button>`:''}
      </div></div>`;
  };
  draw();m.classList.add('show');
  clearInterval(m._t);let last=energyNow();
  m._t=setInterval(()=>{const v=energyNow();if(v!==last){last=v;draw();}else{const e=document.getElementById('enNext');if(e)e.textContent=_fmtMs(energyNextMs());}},1000);
}
function closeNoEnergy(go){const m=document.getElementById('noEnergy');if(!m)return;clearInterval(m._t);m.classList.remove('show');
  if(go&&m._lesson&&energyNow()>0){const l=m._lesson;m._lesson=null;openLesson(l);}}

/* ---------- wallet chips (top bar + lesson bar) ---------- */
function renderWallet(){
  const row=document.querySelector('#lessonView .xp-bar-row');
  if(row&&!document.getElementById('rwBar')){const d=document.createElement('div');d.id='rwBar';d.className='rw-bar';row.parentNode.insertBefore(d,row.nextSibling);}
  const bar=document.getElementById('rwBar');
  if(bar){const v=energyNow(),free=energyFree();
    bar.innerHTML=`<div class="rw-meter" title="${T2('Energy','Energia')}"><i style="width:${free?100:v/EN_MAX*100}%"></i><span>⚡ ${free?'∞':v+'/'+EN_MAX}</span></div>
      <button class="rw-chip" onclick="useHint()" title="${T2('Use a hint','Użyj podpowiedzi')}">💡 <b>${shopCount('hint')}</b></button>
      <button class="rw-chip" onclick="openShop()" title="Shop">🪙 <b>${coins()}</b></button>`;}
}
setInterval(()=>{if(activeLesson)renderWallet();},20000);

/* ---------- 3 tries per question ---------- */
let TRIES={};
function tryMiss(k,max){k=current+':'+k;TRIES[k]=(TRIES[k]||0)+1;const left=max-TRIES[k];
  if(left>0)setTimeout(()=>_comboToastText(T2(`✋ Not quite — ${left} ${left===1?'try':'tries'} left`,`✋ Jeszcze nie — ${left===1?'została 1 próba':'zostały '+left+' próby'}`)),60);
  return left;}
const _maxT=n=>Math.max(1,Math.min(3,n-1));
const _optEls=()=>[...document.querySelectorAll('#panel .opts .opt')];
function _lockOpts(){_optEls().forEach(o=>o.style.pointerEvents='none');}
(function(){
  // Find it
  const _cb=cbPick;cbPick=function(k,el){if(CB.ans)return;const t=CB.order[CB.i];if(CB.opts[k]===t)return _cb(k,el);
    if(el.classList.contains('wrong')||el.classList.contains('hint-out'))return;
    const left=tryMiss('cb'+CB.i,_maxT(CB.opts.length));_cb(k,el);el.style.pointerEvents='none';
    if(left<=0){CB.ans=true;const r=_optEls()[CB.opts.indexOf(t)];if(r)r.classList.add('correct');_lockOpts();setTimeout(()=>{CB.i++;setPanel(cbRender());},1300);}};
  // Balloon pop
  const _bp=bpPick;bpPick=function(idx,el){if(BP.answered)return;if(BP.opts[idx]===BP.correctCard)return _bp(idx,el);
    const left=tryMiss('bp'+BP.i,_maxT(BP.opts.length));_bp(idx,el);
    if(left<=0){BP.answered=true;const r=document.querySelector(`#balloonField .balloon[onclick^="bpPick(${BP.opts.indexOf(BP.correctCard)},"]`);
      document.querySelectorAll('#balloonField .balloon').forEach(b=>b.style.pointerEvents='none');if(r)r.classList.add('rw-reveal');
      setTimeout(()=>{BP.i++;setPanel(bpRender());},1400);}};
  // Whack-a-Leo
  const _wm=wmPick;wmPick=function(idx,el){if(WM.answered)return;const it=WM.qs[WM.i];if(idx===it.correct)return _wm(idx,el);
    const left=tryMiss('wm'+WM.i,_maxT(it.opts.length));if(left<=0)return _wm(idx,el);
    sfxWhack();el.classList.add('mole-wrong');el.style.pointerEvents='none';registerWrongAnswer();};
  // Fill the gap (word bank)
  const _fb=fbPick;fbPick=function(k){if(FB.filled!==null||!FB.bank||FB.bank[k].used)return;const it=FB.items[FB.idx];if(FB.bank[k].w===it.blank)return _fb(k);
    const left=tryMiss('fb'+FB.idx,_maxT(FB.bank.length));if(left<=0)return _fb(k);
    FB.bank[k].used=true;setPanel(fbRender());const m=$('fbMsg');if(m){m.textContent=T2(`Not “${FB.bank[k].w}” — try again!`,`Nie „${FB.bank[k].w}” — spróbuj jeszcze raz!`);m.style.color='#c0392b';}registerWrongAnswer();};
  // Spell it
  const _us=usPick;usPick=function(k){if(!US.used||US.used[k]||US.lock)return _us(k);const it=US.words[US.i];
    if(US.ans.length+1===it.word.length&&(US.ans.join('')+US.letters[k])!==it.word){
      const left=tryMiss('us'+US.i,3);registerWrongAnswer();
      if(left<=0){US.used[k]=true;US.ans.push(US.letters[k]);US.lock=true;setPanel(usRender());const m=$('usMsg');if(m){m.textContent=T2('The word is: ','To słowo to: ')+it.word;m.style.color='#c0392b';}
        if(typeof missWord==='function'&&typeof WORD_IDX!=='undefined')missWord(WORD_IDX.en[it.word.toLowerCase()]);
        setTimeout(()=>{US.i++;US.letters=null;US.lock=false;setPanel(usRender());},1800);return;}}
    return _us(k);};
  // Build the sentence
  const _sb=sbPick;sbPick=function(k){const was=SB.built?SB.built.length:0;const r=_sb(k);const it=SB.items[SB.idx];
    if(SB.pool&&!SB.locked&&SB.built.length===SB.pool.length&&was<SB.built.length&&SB.built.map(x=>SB.pool[x].t).join(' ')!==it.s){
      const left=tryMiss('sb'+SB.idx,3);registerWrongAnswer();const m=$('sbMsg');
      if(left<=0){SB.locked=true;if(m)m.innerHTML=T2('The answer: ','Odpowiedź: ')+'<b>'+esc(it.s)+'</b>';setTimeout(()=>{SB.idx++;SB.pool=null;SB.locked=false;setPanel(sbRender());},2400);}}
    return r;};
  // True / false (/ not given)
  const _tf=tfPick;tfPick=function(i,j,el){const it=TFS.items[i];if(j===it.answer)return _tf(i,j,el);
    const left=tryMiss('tf'+i,_maxT(TFS.labels.length));if(left<=0)return _tf(i,j,el);el.classList.add('wrong');el.style.pointerEvents='none';};
  // Quiz
  const _qp=quizPick;quizPick=function(id,k,el){const st=QS[id];if(!st||!st.cur||!st.cur[k])return _qp(id,k,el);if(st.cur[k].ok)return _qp(id,k,el);
    if(el.classList.contains('wrong')||el.classList.contains('hint-out'))return;
    const left=tryMiss('q'+id+st.i,_maxT(st.cur.length));if(left>0){el.classList.add('wrong');el.style.pointerEvents='none';return;}
    const ok=st.cur.findIndex(x=>x.ok),els=_optEls();const r=_qp(id,k,el);if(els[ok])els[ok].classList.add('correct');return r;};
  // Error hunt
  const _eh=ehPick;ehPick=function(j){if(EH.ans)return;const it=EH.items[EH.idx];if(j===it.wrong)return _eh(j);const c=$('chip'+j);if(c&&c.classList.contains('bad'))return;
    const left=tryMiss('eh'+EH.idx,_maxT(it.s.split(' ').length));if(left<=0)return _eh(j);
    if(c){c.classList.add('bad');c.style.pointerEvents='none';}};
  // Odd one out
  const _oo=ooPick;ooPick=function(k,el){if(OO.ans)return;const it=OO.items[OO.idx];if(k===it.odd)return _oo(k,el);
    const left=tryMiss('oo'+OO.idx,_maxT(it.opts.length));if(left<=0)return _oo(k,el);el.classList.add('wrong');el.style.pointerEvents='none';};
  // Listen and choose
  const _lc=lcPick;lcPick=function(k,el){if(LC.ans)return;if(LC.cur[k].ok)return _lc(k,el);
    const left=tryMiss('lc'+LC.idx,_maxT(LC.cur.length));if(left>0){el.classList.add('wrong');el.style.pointerEvents='none';return;}
    const ok=LC.cur.findIndex(x=>x.ok),els=_optEls();const r=_lc(k,el);if(els[ok])els[ok].classList.add('correct');return r;};
  // Typed translation
  const _tr=trCheck;trCheck=function(id,i){const inp=$(id+'-in-'+i);const was=inp&&inp.disabled;const r=_tr(id,i);
    if(inp&&!was&&!inp.disabled&&inp.value.trim()&&inp.classList.contains('wrong')){const left=tryMiss('tr'+id+i,3);const m=$(id+'-msg-'+i);
      if(left<=0){trShow(id,i);if(m){m.textContent=T2('Answer: ','Odpowiedź: ')+TR[id][i].answers[0];m.className='gap-msg bad';}}
      else if(m)m.textContent=T2(`Try again! 🔄 (${left} left)`,`Spróbuj jeszcze raz! 🔄 (zostało: ${left})`);}
    return r;};
  // Fortune wheel: 3 tries per spin, 3 free spins per wheel, extra spins from the shop
  const _wc=wheelCheck;wheelCheck=function(){if(FW.solved)return _wc();const inp=$('wheelInput');const r=_wc();
    if(FW.solved){if(FW.extra){FW.extra=false;const n=shopEarn(3);if(n)setTimeout(()=>_comboToastText('🎡 +3 🪙'),400);}return r;}
    if(inp&&inp.value.trim()){const left=tryMiss('fw'+(FW.spins||0),3);if(left<=0){const it=FORTUNE_ITEMS[FW.currentIdx];FW.solved=true;FW.extra=false;inp.value=it.en;inp.disabled=true;const m=$('wheelMsg');if(m)m.textContent=T2(`It's “${it.en}” (${it.pl}).`,`To „${it.en}” (${it.pl}).`);}}
    return r;};
  const _sw=spinWheel;spinWheel=function(){if(FW.spinning)return;FW.spins=FW.spins||0;
    if(FW.spins>=3){if(!shopUse('spin')){const card=$('wheelResult');if(card){card.innerHTML=`<div class="wheel-result-emoji">🎡</div><p class="rw-small" style="margin:6px 0 10px">${T2('That was your 3 free spins. Get extra spins in the shop!','To były 3 darmowe obroty. Dodatkowe kupisz w sklepie!')}</p><button class="btn btn-gold" onclick="openShop()">🛍️ ${T2('Shop','Sklep')}</button>`;card.classList.add('show');}return;}
      FW.extra=true;_comboToastText(T2(`🎡 Extra spin! (${shopCount('spin')} left)`,`🎡 Dodatkowy obrót! (zostało: ${shopCount('spin')})`));}
    FW.spins++;_sw();const s=$('spinsLeft');if(s)s.textContent=spinsText();};
  const _rf=rFortuneWheel;rFortuneWheel=function(){return _rf().replace('<div class="wheel-result-card"',`<p class="rw-small" id="spinsLeft">${spinsText()}</p><div class="wheel-result-card"`);};
})();
function spinsText(){const f=Math.max(0,3-(FW.spins||0)),x=shopCount('spin');return T2(`Free spins left: ${f}`,`Darmowe obroty: ${f}`)+(x?` · ${T2('extra','dodatkowe')}: ${x} 🎡`:'');}

/* ---------- hints ---------- */
function _hideWrong(els,isWrong){const c=els.filter((e,i)=>isWrong(i,e)&&!e.classList.contains('wrong')&&!e.classList.contains('hint-out')&&!e.classList.contains('bad')&&e.style.pointerEvents!=='none');
  if(!c.length)return false;const e=c[Math.floor(Math.random()*c.length)];e.classList.add('hint-out');e.style.pointerEvents='none';return true;}
function useHint(){
  if(!activeLesson||!zones[current])return;
  if(shopCount('hint')<=0){_comboToastText(T2('💡 No hints left — get more in the shop','💡 Brak podpowiedzi — kup je w sklepie'));return;}
  const z=zones[current].type;let ok=false;
  const idxOf=e=>{const m=(e.getAttribute('onclick')||'').match(/\((?:'[^']*',)?(\d+)/);return m?+m[1]:-1;};
  try{
    if(z==='find'&&!CB.ans){const t=CB.order[CB.i];ok=_hideWrong(_optEls(),i=>CB.opts[i]!==t);}
    else if(z==='quiz'){const st=QS[activeLesson.id+'-'+current];if(st&&st.cur)ok=_hideWrong(_optEls(),i=>!st.cur[i].ok);}
    else if(z==='listen'&&!LC.ans)ok=_hideWrong(_optEls(),i=>!LC.cur[i].ok);
    else if(z==='odd'&&!OO.ans){const it=OO.items[OO.idx];ok=_hideWrong(_optEls(),i=>i!==it.odd);}
    else if(z==='whack'&&!WM.answered){const it=WM.qs[WM.i];ok=_hideWrong([...document.querySelectorAll('.mole-field .mole')],i=>i!==it.correct);}
    else if(z==='balloon'&&!BP.answered){const c=BP.opts.indexOf(BP.correctCard);ok=_hideWrong([...document.querySelectorAll('#balloonField .balloon')],(i,e)=>idxOf(e)!==c);}
    else if(z==='errors'&&!EH.ans){const it=EH.items[EH.idx];ok=_hideWrong([...document.querySelectorAll('#panel .chip')],(i,e)=>e.id!=='chip'+it.wrong);}
    else if(z==='fill'&&FB.filled===null&&FB.bank){const it=FB.items[FB.idx];const c=FB.bank.map((b,k)=>k).filter(k=>!FB.bank[k].used&&FB.bank[k].w!==it.blank);
      if(c.length){FB.bank[c[Math.floor(Math.random()*c.length)]].used=true;setPanel(fbRender());ok=true;}}
    else if(z==='spell'&&US.ans&&!US.lock){const it=US.words[US.i];if(US.ans.join('')===it.word.slice(0,US.ans.length)){const L=it.word[US.ans.length];const k=US.letters.findIndex((l,i)=>l===L&&!US.used[i]);if(k>=0){W().u[_uid()]='hint';usPick(k);_hintDone();return;}}
      else{_comboToastText(T2('🔄 Reset the word first','🔄 Najpierw zresetuj słowo'));return;}}
    else if(z==='build'&&SB.pool&&!SB.locked){const it=SB.items[SB.idx],ws=it.s.split(' '),b=SB.built.map(x=>SB.pool[x].t);
      if(b.join(' ')===ws.slice(0,b.length).join(' ')){const k=SB.pool.findIndex(p=>!p.used&&p.t===ws[b.length]);if(k>=0){W().u[_uid()]='hint';sbPick(k);_hintDone();return;}}
      else{_comboToastText(T2('↺ Start over first','↺ Najpierw zacznij od nowa'));return;}}
    else if(z==='wordle'&&!WD.done){WD.hints=WD.hints||[];const known=new Set(WD.hints);WD.guesses.forEach(g=>g.states.forEach((s,i)=>{if(s==='correct')known.add(i);}));
      const c=[...Array(WD.len).keys()].filter(i=>!known.has(i));if(c.length){WD.hints.push(c[0]);setPanel(wdRender());ok=true;}}
  }catch(e){console.warn(e);}
  if(!ok){_comboToastText(T2('💡 Hints work in choice games, spelling, sentences and Wordle','💡 Podpowiedzi działają w zadaniach wyboru, literowaniu, zdaniach i Wordle'));return;}
  W().u[_uid()]='hint';_hintDone();
}
function _hintDone(){sfxPop();saveProgress();renderWallet();_comboToastText(T2(`💡 Hint used · ${shopCount('hint')} left`,`💡 Podpowiedź · zostało: ${shopCount('hint')}`));}
(function(){const _wr=wdRender;wdRender=function(){let h=_wr();if(WD.hints&&WD.hints.length&&!WD.done){
  h=h.replace('<div class="wordle-grid">',`<p class="rw-hintline">💡 ${WD.hints.map(i=>T2(`letter ${i+1} is <b>${WD.word[i]}</b>`,`litera ${i+1} to <b>${WD.word[i]}</b>`)).join(' · ')}</p><div class="wordle-grid">`);}return h;};})();

/* ---------- coins for lessons ---------- */
let _RUN=null;
(function(){
  const _ol=openLesson;openLesson=function(id){
    const l=typeof id==='object'?id:(ALL_LESSONS.find(x=>x.id===id)||BONUS_LESSONS.find(x=>x.id===id));
    if(l&&!l.review&&!energyFree()&&energyNow()<=0&&(l.bonus_lesson||lessonUnlocked(l.id))){showNoEnergy(l);return;}
    TRIES={};if(typeof FW!=='undefined'){FW.spins=0;FW.extra=false;}
    if(l&&l.bonus_lesson){const p=PROF()||{track:'kids',level:'A1'};l.unit.track=p.track;l.unit.level=p.level;}
    const r=_ol(l||id);if(activeLesson)_RUN={id:activeLesson.id,paid:false};setTimeout(renderWallet,0);return r;};
  const _lu=lessonUnlocked;lessonUnlocked=function(id){const b=BONUS_LESSONS.find(x=>x.id===id);return b?owned(b.shop):_lu(id);};
  const _fin=rLessonFinish;rLessonFinish=function(){
    const l=activeLesson,first=!lessonDone(l.id),stars=lessonStarsNow(),pts=Math.max(0,score-lessonStartScore);
    let h=_fin();
    if(_RUN&&_RUN.id===l.id&&!_RUN.paid){_RUN.paid=true;
      let n=Math.round(pts/5)+(l.review?0:stars*3+(first?10:0));if(l.test)n*=2;n=Math.max(n,3);
      _RUN.n=shopEarn(n,'L:'+l.id+':'+_uid());if(!energyFree())energySet(energyNow()+3);}
    const n=_RUN&&_RUN.n;
    if(n)h=h.replace('<div class="nav-row" style="justify-content:center',`<div class="rw-earn"><span>🪙</span><div><b>+${n} ${T2('coins','monet')}</b><small>${T2('Spend them in the shop','Wydaj je w sklepie')} · ${T2('you have','masz')} ${coins()} 🪙${energyFree()?'':' · +3 ⚡'}</small></div><button class="btn btn-gold" onclick="openShop()">🛍️ ${T2('Shop','Sklep')}</button></div><div class="nav-row" style="justify-content:center`);
    if(l.bonus_lesson){h=h.replace(/<button class="btn btn-gold" id="nextLessonBtn"[^>]*>[^<]*<\/button>/,'').replace(/ — <b>[^<]*<\/b> is now unlocked! 🔓/,'');}
    return h;};
})();

/* ---------- Leo's outfit: drawn and placed by outfits.js ---------- */

/* ---------- themes, frames, badges ---------- */
function applyTheme(){const t=W().eq.theme;document.body.className=document.body.className.replace(/\btheme-\w+/g,'').trim();if(t&&t!=='t_classic')document.body.classList.add('theme-'+t.slice(2));}
function avatarHtml(size){const eq=W().eq,f=eq.frame?SHOP_BY[eq.frame]:null,b=eq.badge?SHOP_BY[eq.badge]:null;size=size||64;
  return `<span class="rw-ava ${f?'fr-'+f.id.slice(2):''}" style="--s:${size}px"><img src="${LEMUR_COIN}" alt="">${b?`<em title="${T2(b.en,b.pl)}">${b.icon}</em>`:''}</span>`;}

/* ---------- buying & wearing ---------- */
function buyItem(id){const it=SHOP_BY[id];if(!it)return;
  if(!it.give&&!it.now&&owned(id)){wearItem(id);return;}
  if(it.now&&id==='energy'&&!energyFree()&&energyNow()>=EN_MAX){_comboToastText(T2('⚡ Your energy is already full','⚡ Energia jest już pełna'));return;}
  const c=coins();if(c<it.price){_comboToastText(T2(`🪙 You need ${it.price-c} more coins`,`🪙 Brakuje Ci ${it.price-c} monet`));sfxWrong();return;}
  W().p[_uid()]=[id,it.price];
  if(id==='energy')energySet(EN_MAX);
  if(it.slot||SLOT_OF[it.cat])wearItem(id,true);
  saveProgress();sfxCorrect();burstConfetti();
  _comboToastText(T2(`🎉 You got: ${it.en}!`,`🎉 Masz: ${it.pl}!`));
  if(!activeLesson&&VIEW.track==='shop')renderCourse();renderWallet();}
function wearItem(id,quiet){const it=SHOP_BY[id];if(!it||!owned(id))return;const slot=it.slot||SLOT_OF[it.cat];if(!slot)return;const eq=W().eq;
  eq[slot]=eq[slot]===id&&slot!=='theme'?null:id;eq.t=Date.now();if(slot==='theme')applyTheme();saveProgress();if(!quiet){sfxPop();if(!activeLesson&&VIEW.track==='shop')renderCourse();}}
function openShop(cat){if(typeof closeNoEnergy==='function')closeNoEnergy();if(activeLesson)showCourse();SHOP_TAB=cat||SHOP_TAB;nav('shop');}
let SHOP_TAB='power';
function shopTab(c){SHOP_TAB=c;sfxPop();renderCourse();}

function shopItemCard(it){
  const own=owned(it.id),eq=W().eq,slot=it.slot||SLOT_OF[it.cat],wearing=slot&&eq[slot]===it.id||(it.id==='t_classic'&&!eq.theme);
  const name=T2(it.en,it.pl),desc=it.d?T2(it.d,it.dp):'';
  let pic=`<div class="rw-pic">${it.id==='o_flowers'?'🌸':it.icon}</div>`;
  if(it.cat==='theme')pic=`<div class="rw-pic rw-swatch" style="background:linear-gradient(135deg,${it.sw[0]} 55%,${it.sw[1]} 55%)">${it.icon}</div>`;
  if(it.cat==='frame')pic=`<div class="rw-pic plain"><span class="rw-ava fr-${it.id.slice(2)}" style="--s:52px"><img src="${LEMUR_COIN}" alt=""></span></div>`;
  let btn;
  if(it.cat==='lesson'&&own){const ls=BONUS_LESSONS.filter(x=>x.shop===it.id);
    if(ls.length>1)btn=`<div class="rw-lvls"><small>${T2('Choose your level','Wybierz poziom')}</small>${ls.map(l=>`<button class="btn ${lessonDone(l.id)?'secondary':'btn-gold'}" onclick="openLesson('${l.id}')">${lessonDone(l.id)?'↻':'▶'} ${l.fb?l.fb.tag:l.title}</button>`).join('')}</div>`;
    else{const l=ls[0],done=l&&lessonDone(l.id);btn=`<button class="btn btn-gold" onclick="openLesson('${l.id}')">${done?'↻ '+T2('Play again','Zagraj znowu'):'▶ '+T2('Start','Start')}</button>`;}}
  else if(slot&&own)btn=`<button class="btn ${wearing?'btn-navy':'secondary'}" onclick="wearItem('${it.id}')">${wearing?(it.cat==='theme'?'✓ '+T2('In use','Używany'):'✓ '+T2('Wearing · take off','Założone · zdejmij')):(it.cat==='theme'?T2('Use','Użyj'):T2('Wear','Załóż'))}</button>`;
  else btn=`<button class="btn btn-gold" ${coins()<it.price?'data-short="1"':''} onclick="buyItem('${it.id}')">🪙 ${it.price}</button>`;
  const have=it.give?`<span class="rw-have">${T2('You have','Masz')}: <b>${shopCount(it.give[0])}</b></span>`:'';
  return `<div class="rw-item ${wearing?'on':''} ${own&&!it.give&&!it.now?'own':''}">${it.season?`<span class="rw-season">${T2('Seasonal','Sezonowe')}</span>`:''}${pic}<div class="rw-txt"><b>${name}</b>${desc?`<small>${desc}</small>`:''}${have}</div>${btn}</div>`;
}
function shopHtml(){
  const v=energyNow(),free=energyFree(),c=coins();
  const items=SHOP_ITEMS.filter(i=>i.cat===SHOP_TAB);
  return `<div class="panel rw-shop-hero">${zoneTag(T2('SHOP','SKLEP'))}
    <div class="rw-hero-row">
      <div class="rw-hero-leo">${renderLemur('big',[T2('Looking good!','Świetnie wyglądam!'),T2('New hat? 🎩','Nowy kapelusz? 🎩'),T2('Spend your coins!','Wydaj monety!')],110)}</div>
      <div class="rw-hero-txt"><h2 class="title">${T2('Rewards shop','Sklep z nagrodami')} 🛍️</h2>
        <div class="rw-balance"><span>🪙</span><b>${c}</b><small>${T2('coins','monet')}</small></div>
        <div class="rw-meter big"><i style="width:${free?100:v/EN_MAX*100}%"></i><span>⚡ ${T2('Energy','Energia')} ${free?'∞':v+'/'+EN_MAX}</span></div>
        <p class="rw-small">${free?T2('Premium: unlimited energy','Premium: nieograniczona energia'):(v<EN_MAX?T2(`+1 ⚡ every 3 min · next in ${_fmtMs(energyNextMs())}`,`+1 ⚡ co 3 min · następna za ${_fmtMs(energyNextMs())}`):T2('Energy full · each wrong try uses 1 ⚡','Energia pełna · każda błędna próba zabiera 1 ⚡'))}</p>
        <div class="rw-profile">${avatarHtml(54)}<small>${T2('Your profile picture','Twoje zdjęcie profilowe')}</small></div>
      </div></div>
    <p class="rw-small rw-how">${T2('Earn coins by finishing lessons: more points and stars = more coins. Unit tests pay double.','Zdobywaj monety, kończąc lekcje: więcej punktów i gwiazdek = więcej monet. Testy na koniec działu płacą podwójnie.')}</p>
    ${TESTER?`<div class="rw-tester">🧪 <button class="btn secondary" onclick="shopEarn(500,'tester-'+Date.now());renderCourse()">+500 🪙</button><button class="btn secondary" onclick="energySet(0);renderCourse()">⚡ → 0</button><button class="btn secondary" onclick="energySet(${EN_MAX});renderCourse()">⚡ → ${EN_MAX}</button></div>`:''}
  </div>
  <div class="rw-tabs">${SHOP_CATS.map(c=>`<button class="rw-tab ${SHOP_TAB===c.id?'on':''}" onclick="shopTab('${c.id}')"><span>${c.icon}</span>${T2(c.en,c.pl)}</button>`).join('')}</div>
  <div class="rw-grid">${items.map(shopItemCard).join('')}</div>`;
}
(function(){
  const _rc=renderCourse;renderCourse=function(){
    if(VIEW.track==='shop'){document.body.classList.toggle('adult',!!(PROF()&&PROF().track==='adults'));
      $('courseView').innerHTML=courseShell(testerBar()+`<div class="crumbs"><a href="#" onclick="nav();return false;">🏠 Home</a><span>›</span><b>🛍️ ${T2('Shop','Sklep')}</b></div>`+shopHtml());
      if(LANG==='pl'&&typeof applyLang==='function')applyLang();renderWallet();return;}
    _rc();const m=document.querySelector('#courseView .course-main');if(m)m.insertAdjacentHTML('afterbegin',mobWallet());renderWallet();};
  const _sn=sideNav;sideNav=function(){let h=_sn();
    const shop=`<a href="#" class="sn-item ${VIEW.track==='shop'?'on':''}" onclick="nav('shop');return false;"><span>🛍️</span><b>${T2('Shop','Sklep')}</b><small>🪙 ${coins()}</small></a>`;
    h=h.replace('<div class="sn-title">Menu</div>',`<div class="sn-profile">${avatarHtml(40)}<div class="sn-money"><b>🪙 ${coins()}</b><small>⚡ ${energyFree()?'∞':energyNow()+'/'+EN_MAX}</small></div><div class="sn-who"><b>${typeof frMyName==='function'?frMyName():T2('Learner','Uczeń')}</b><small>${T2('My profile','Mój profil')}</small></div></div><div class="sn-title">Menu</div>`);
    const i=h.indexOf('My progress</b>');if(i>=0){const e=h.indexOf('</a>',i)+4;h=h.slice(0,e)+shop+h.slice(e);}else h=h.replace('</aside>',shop+'</aside>');
    return h;};
  if(typeof myHomeHtml==='function'){const _mh=myHomeHtml;myHomeHtml=function(p){return _mh(p).replace('📊 My progress</button></div>',`📊 My progress</button><button class="btn secondary" onclick="nav('shop')">🛍️ ${T2('Shop','Sklep')} · 🪙 ${coins()}</button></div>`);};}
  if(typeof progressHtml==='function'){const _ph=progressHtml;progressHtml=function(){return _ph().replace(/(MY PROGRESS<\/span>)?(<h2 class="title">)/,(m,a,b)=>(a||'')+`<div class="rw-prog-ava">${avatarHtml(72)}</div>`+b);};}
})();
Object.assign(PL_UI,{"🛍️ Shop":"🛍️ Sklep"});

function mobWallet(){const v=energyNow(),f=energyFree();return `<a href="#" class="rw-mob" onclick="nav('shop');return false;">${avatarHtml(30)}<b>🪙 ${coins()}</b><b>⚡ ${f?'∞':v+'/'+EN_MAX}</b><span class="rw-go">🛍️ ${T2('Shop','Sklep')} ›</span></a>`;}
/* ---------- bonus lessons (unlocked in the shop) ---------- */
const BONUS_LESSONS=[
 {id:'bonus-idioms',shop:'b_idioms',title:'Everyday idioms',emoji:'🦜',intro:'Ten idioms English speakers use every day. They don’t mean what the words say!',zones:(()=>{const W=[
   {en:'piece of cake',pl:'bułka z masłem',emoji:'🍰'},{en:'break the ice',pl:'przełamać lody',emoji:'🧊'},{en:'under the weather',pl:'nie czuć się najlepiej',emoji:'🤒'},
   {en:'hit the books',pl:'wziąć się do nauki',emoji:'📚'},{en:'once in a blue moon',pl:'raz na ruski rok',emoji:'🌕'},{en:'cost an arm and a leg',pl:'kosztować majątek',emoji:'💸'},
   {en:"it's raining cats and dogs",pl:'leje jak z cebra',emoji:'🌧️'},{en:'spill the beans',pl:'wygadać się',emoji:'🫘'},{en:'call it a day',pl:'skończyć na dziś',emoji:'🛑'},{en:'on cloud nine',pl:'w siódmym niebie',emoji:'☁️'}];
   return [{type:'cards',label:'Idioms',title:'Ten everyday idioms',cards:W},{type:'find',label:'Find it',cards:W,rounds:8},{type:'match',label:'Match',pairs:W.slice(0,8)},
    {type:'quiz',label:'What does it mean?',tag:'IDIOMS',done:'Idiom master! 🦜',qs:[
     {q:'The test was a piece of cake. The test was…',opts:['very easy','very hard','about food'],correct:0},
     {q:'I feel under the weather. I…',opts:['feel a bit ill','love the rain','am outside'],correct:0},
     {q:'That phone cost an arm and a leg. It was…',opts:['very expensive','cheap','broken'],correct:0},
     {q:"Don't spill the beans! Don't…",opts:['tell the secret','cook dinner','drop the food'],correct:0},
     {q:'I see my cousin once in a blue moon. I see him…',opts:['very rarely','every night','in the sky'],correct:0},
     {q:"Let's call it a day. Let's…",opts:['stop working for today','phone someone','start again'],correct:0},
     {q:'She passed her exam and she is on cloud nine. She is…',opts:['very happy','very tired','on a plane'],correct:0},
     {q:'A game is a good way to break the ice. It helps people…',opts:['feel relaxed together','get cold','break things'],correct:0}]},
    {type:'fill',label:'Fill the gap',items:[
     {before:"Take an umbrella — it's raining cats and",blank:'dogs',after:'!',bank:['dogs','mice','birds'],emoji:'🌧️'},
     {before:'Tomorrow is the exam, so tonight I have to hit the',blank:'books',after:'.',bank:['books','wall','ball'],emoji:'📚'},
     {before:"It's 9 pm. Let's call it a",blank:'day',after:'.',bank:['day','night','friend'],emoji:'🛑'},
     {before:'Learning colours? That’s a piece of',blank:'cake',after:'!',bank:['cake','pizza','bread'],emoji:'🍰'}]},
    {type:'typed',label:'Write it',tag:'TYPE IT',title:'Write the idiom in English ✍️',blocks:[{id:'bi1',label:'🇵🇱 → 🇬🇧',items:W.slice(0,6).map(w=>({prompt:`${w.emoji} ${w.pl}`,answers:[w.en]}))}]}];})()},
 {id:'bonus-slang',shop:'b_slang',title:'British slang',emoji:'🇬🇧',intro:'Cheers, mate! Twelve words you will hear on the streets of London.',zones:(()=>{const W=[
   {en:'cheers',pl:'dzięki',emoji:'🙌'},{en:'mate',pl:'kumpel',emoji:'🤝'},{en:'brilliant',pl:'super',emoji:'🌟'},{en:'knackered',pl:'wykończony',emoji:'😩'},
   {en:'gutted',pl:'załamany',emoji:'😞'},{en:'skint',pl:'spłukany',emoji:'🪹'},{en:'quid',pl:'funt (pieniądz)',emoji:'💷'},{en:'loo',pl:'toaleta',emoji:'🚽'},
   {en:'cuppa',pl:'filiżanka herbaty',emoji:'🍵'},{en:'chuffed',pl:'bardzo zadowolony',emoji:'😊'},{en:'posh',pl:'elegancki, snobistyczny',emoji:'🎩'},{en:'fancy',pl:'mieć ochotę na',emoji:'😋'}];
   return [{type:'cards',label:'Slang',title:'Twelve British slang words',cards:W},{type:'find',label:'Find it',cards:W,rounds:8},{type:'match',label:'Match',pairs:W.slice(0,8)},
    {type:'quiz',label:'Slang quiz',tag:'SLANG',done:'Proper British! 🇬🇧',qs:[
     {q:"I'm knackered. I'm…",opts:['very tired','very hungry','very late'],correct:0},
     {q:'Do you fancy a cuppa? Do you want…',opts:['a cup of tea','a cake','a coat'],correct:0},
     {q:'It costs five quid. It costs five…',opts:['pounds','minutes','dollars'],correct:0},
     {q:"I can't come, I'm skint. I have…",opts:['no money','no time','no shoes'],correct:0},
     {q:'Where is the loo? Where is the…',opts:['toilet','kitchen','bus'],correct:0},
     {q:"She was chuffed with her mark. She was…",opts:['pleased','angry','bored'],correct:0},
     {q:'We lost the final. I’m gutted! I’m…',opts:['really sad','really hungry','really happy'],correct:0},
     {q:'This hotel is very posh. It is…',opts:['elegant and expensive','dirty','tiny'],correct:0}]},
    {type:'tf',label:'True or false?',items:[{text:"'Cheers' can mean 'thanks'.",answer:0},{text:"'Mate' means 'teacher'.",answer:1},{text:"A 'quid' is money.",answer:0},{text:"If you're 'skint', you are rich.",answer:1},{text:"'Brilliant' means 'great'.",answer:0}]},
    {type:'build',label:'Build it',items:[{s:'Cheers mate that was brilliant',pl:'Dzięki, kolego, to było super'},{s:'Do you fancy a cuppa',pl:'Masz ochotę na herbatkę?'},{s:'I am knackered after school',pl:'Jestem wykończony po szkole'}]}];})()},
 {id:'bonus-phrasal',shop:'b_phrasal',title:'Phrasal verb party',emoji:'🎉',intro:'Verb + little word = new meaning. Let’s party with ten phrasal verbs!',zones:(()=>{const W=[
   {en:'get up',pl:'wstawać',emoji:'⏰'},{en:'give up',pl:'poddać się',emoji:'🏳️'},{en:'look for',pl:'szukać',emoji:'🔍'},{en:'turn on',pl:'włączyć',emoji:'💡'},
   {en:'turn off',pl:'wyłączyć',emoji:'🔌'},{en:'find out',pl:'dowiedzieć się',emoji:'🕵️'},{en:'put on',pl:'założyć',emoji:'🧥'},{en:'look after',pl:'opiekować się',emoji:'🐶'},
   {en:'come back',pl:'wrócić',emoji:'🔙'},{en:'run out of',pl:'skończyć się (zabraknąć)',emoji:'🥛'}];
   return [{type:'cards',label:'Verbs',title:'Ten phrasal verbs',cards:W},{type:'find',label:'Find it',cards:W,rounds:8},{type:'memory',label:'Memory',pairs:W.slice(0,6).map(w=>({emoji:w.emoji,word:w.en}))},
    {type:'fill',label:'Fill the gap',items:[
     {before:'Please turn',blank:'off',after:'the light. I want to sleep.',bank:['off','up','for'],emoji:'🔌'},
     {before:"I'm looking",blank:'for',after:'my keys. Where are they?',bank:['for','after','up'],emoji:'🔑'},
     {before:"Don't give",blank:'up',after:"! You can do it!",bank:['up','on','back'],emoji:'💪'},
     {before:'It’s cold. Put',blank:'on',after:'your coat.',bank:['on','off','out'],emoji:'🧥'},
     {before:'Can you look',blank:'after',after:'my cat this weekend?',bank:['after','for','at'],emoji:'🐱'},
     {before:"We've run out",blank:'of',after:'milk.',bank:['of','off','up'],emoji:'🥛'}]},
    {type:'errors',label:'Error hunt',items:[{s:'I get on at seven every morning.',wrong:2,ok:'I get up at seven every morning.'},{s:'Please turn up the TV, I want to sleep.',wrong:2,ok:'Please turn off the TV, I want to sleep.'},{s:'She is looking at her lost phone.',wrong:3,ok:'She is looking for her lost phone.'}]},
    {type:'wordle',label:'Wordle',words:[{word:'after',emoji:'🐶'},{word:'found',emoji:'🕵️'},{word:'climb',emoji:'🧗'}]}];})()},
 {id:'bonus-rhymes',shop:'b_rhymes',title:'Songs, rhymes & tongue twisters',emoji:'🎶',intro:'Sing Leo’s week song, find words that rhyme and try famous tongue twisters!',zones:[
   {type:'reading',label:"Leo's song",title:"Leo's week song 🎶",paras:['<b>Monday, Tuesday</b>, off we go,<br><b>Wednesday, Thursday</b>, nice and slow,','<b>Friday</b> — hey! — the week is done,<br><b>Saturday, Sunday</b>, time for fun!','Clap your hands and count to seven,<br>one, two, three… we’re up in heaven! 👏']},
   {type:'fill',label:'Sing along',tag:'SING IT',items:[
     {before:'Monday, Tuesday, off we',blank:'go',after:',',bank:['go','slow','fun'],emoji:'🎶'},
     {before:'Wednesday, Thursday, nice and',blank:'slow',after:',',bank:['slow','go','done'],emoji:'🐢'},
     {before:'Friday — hey! — the week is',blank:'done',after:',',bank:['done','fun','seven'],emoji:'🎉'},
     {before:'Saturday, Sunday, time for',blank:'fun',after:'!',bank:['fun','done','go'],emoji:'🥳'}]},
   {type:'odd',label:'Rhymes',items:[{opts:['cat','hat','bat','dog'],odd:3,why:'cat, hat, bat rhyme — dog does not.'},{opts:['cake','lake','bike','snake'],odd:2,why:'cake, lake, snake rhyme — bike does not.'},{opts:['moon','spoon','soon','sun'],odd:3,why:'moon, spoon, soon rhyme — sun does not.'},{opts:['bear','chair','hair','bird'],odd:3,why:'bear, chair, hair rhyme — bird does not.'},{opts:['night','light','kite','note'],odd:3,why:'night, light, kite rhyme — note does not.'}]},
   {type:'quiz',label:'Rhyme time',tag:'RHYME TIME',done:'You’ve got rhythm! 🎶',qs:[{q:"What rhymes with 'tree'?",opts:['bee','tray','true'],correct:0},{q:"What rhymes with 'rain'?",opts:['train','run','ring'],correct:0},{q:"What rhymes with 'house'?",opts:['mouse','horse','hose'],correct:0},{q:"What rhymes with 'fish'?",opts:['dish','fast','fresh'],correct:0},{q:"What rhymes with 'star'?",opts:['car','stay','stir'],correct:0}]},
   {type:'build',label:'Tongue twisters',items:[{s:'She sells seashells by the seashore',pl:'Łamaniec: ona sprzedaje muszelki nad morzem'},{s:'Red lorry yellow lorry',pl:'Łamaniec: czerwona ciężarówka, żółta ciężarówka'},{s:'Peter Piper picked a peck of pickled peppers',pl:'Łamaniec: Peter Piper zebrał garść marynowanych papryczek'}]},
   {type:'listen',label:'Listen',items:[{word:'She sells seashells',options:['She sells seashells','She smells sea shells','See shells sell'],correct:0},{word:'Red lorry, yellow lorry',options:['Red lorry, yellow lorry','Red lolly, yellow lolly','Read Laura, hello Laura'],correct:0},{word:'Clap your hands',options:['Clap your hands','Clean your hands','Cut your hands'],correct:0}]}]},
 ...FB_VERSIONS.map(v=>({id:v.id,shop:'b_football',title:'Football Fever',emoji:'⚽',intro:v.intro,zones:v.zones,fb:v})),
];
BONUS_LESSONS.forEach(l=>{l.bonus_lesson=true;l.num='Bonus';l.bonus=l.zones[0].cards||U1A;l.unit={track:'kids',level:'A1',lessons:[{id:'__bonus'}],badge:'',title:'Bonus'};});
BONUS_LESSONS.filter(l=>l.fb).forEach(l=>{l.unit.track=l.fb.track;l.unit.level=l.fb.level;});

/* ---------- start ---------- */
(function(){const _lp=loadProgress;loadProgress=function(){_lp();applyTheme();shopEarn(30,'welcome');setTimeout(renderWallet,0);};})();

/* ---------- PC: full-width page with a right column of panels ---------- */
function sidePanels(){
  const n=streakOf(C.days),v=energyNow(),free=energyFree(),p=typeof PROF==='function'?PROF():null;
  const chip=(click,icon,val,tip,cls)=>`<a href="#" class="sp-stat ${cls||''}" title="${tip}" onclick="${click};return false;"><span>${icon}</span><b>${val}</b></a>`;
  let h=`<div class="sp-stats">`+chip("openHabits()","🔥",n,T2('Day streak','Dni z rzędu'),n?'':'zero')+chip("nav('shop')","🪙",coins(),T2('Coins','Monety'))
    +chip("nav('shop')","⚡",free?'∞':v+'/'+EN_MAX,T2('Energy','Energia'))+(shieldsLeft()?chip("openHabits()","🛡️",shieldsLeft(),T2('Streak shields','Tarcze serii')):'')+`</div>`;
  /* up next */
  const nx=p?(nextInLevel(p.track,p.level)||nextLessonToDo(p.track)):nextLessonToDo();
  if(nx) h+=`<div class="sp-card sp-next"><small class="sp-tag">${T2('UP NEXT','NASTĘPNA LEKCJA')} · ${nx.unit.level}</small>
    <div class="sp-row"><span class="sp-emo">${nx.emoji}</span><div><b>${nx.title}</b><small>⏱ ~${zoneMinutes(nx)} min</small></div></div>
    <button class="btn btn-gold sp-btn" onclick="openLesson('${nx.id}')">${C.active&&C.active.id===nx.id?T2('Continue →','Kontynuuj →'):T2('Start →','Start →')}</button></div>`;
  /* daily goal */
  const g=goalMin(),m=todayMin(),done=todayRec().g;
  h+=`<div class="sp-card"><div class="sp-head"><b>🎯 ${T2('Daily goal','Dzienny cel')}</b><a href="#" onclick="openHabits();return false;">${T2('Change','Zmień')}</a></div>
    <div class="sp-row">${goalRing(58)}<div><b>${done?T2('Done for today!','Na dziś zrobione!'):T2(`${m} of ${g} min`,`${m} z ${g} min`)}</b>
    <small>${n?T2(`🔥 ${n}-day streak`,`🔥 seria: ${n} dni`):T2('Do one lesson to start a streak','Zrób lekcję, by zacząć serię')}</small></div></div>
    <div class="dc-week sp-week">${weekDots()}</div></div>`;
  /* premium (when available) */
  if(typeof openPremium==='function'&&!(typeof isPremium==='function'&&isPremium()))
    h+=`<div class="sp-card sp-prem"><small class="sp-tag">LEOGROW PREMIUM</small><b class="sp-big">${T2('Learn without limits','Ucz się bez limitów')}</b>
      <p>${T2('Unlimited ⚡ energy and every lesson unlocked.','Nieograniczona ⚡ energia i wszystkie lekcje odblokowane.')}</p>
      <button class="btn btn-gold sp-btn" onclick="openPremium()">⭐ ${T2('See Premium','Zobacz Premium')}</button></div>`;
  /* shop */
  h+=`<div class="sp-card"><div class="sp-head"><b>🛍️ ${T2('Shop','Sklep')}</b><span class="sp-coins">🪙 ${coins()}</span></div>
    <div class="sp-row">${avatarHtml(52)}<p>${T2('Spend your coins on outfits for Leo, themes, frames and hints.','Wydaj monety na stroje dla Leo, motywy, ramki i podpowiedzi.')}</p></div>
    <button class="btn secondary sp-btn" onclick="nav('shop')">${T2('Open the shop','Otwórz sklep')} →</button></div>`;
  /* review */
  const rt=p?p.track:(VIEW.track&&TRACKS.find(t=>t.id===VIEW.track)?VIEW.track:null),rv=rt?reviewWords(rt).length:0;
  if(rv) h+=`<div class="sp-card"><div class="sp-head"><b>🔁 ${T2('Review','Powtórka')}</b><span class="sp-coins">${rv}</span></div>
    <p>${reviewWords(rt).slice(0,4).map(w=>w.en).join(', ')}${rv>4?'…':''}</p>
    <button class="btn secondary sp-btn" onclick="openReview('${rt}')">${T2('Practise them','Poćwicz je')} →</button></div>`;
  return h;
}
(function(){const _cs=courseShell;courseShell=function(h){
  let s='';try{s=sidePanels();}catch(e){console.warn('side panels',e);}
  return _cs(h).replace(/<\/div>$/,`<aside class="side-panels">${s}</aside></div>`);};})();
