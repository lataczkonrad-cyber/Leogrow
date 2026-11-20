
/* =====================================================================
   LEOGROW — COURSE LAYER
   One course = units → short lessons. Every lesson is a mini version of
   the classic Leogrow lesson (trail of zones, Leo, coins, bonus round),
   built from the same exercise engine above.
   ===================================================================== */

/* ---------- vocabulary ---------- */
const U1A=[
 {en:"wake up",pl:"budzić się",emoji:"⏰"},{en:"turn off the alarm",pl:"wyłączyć budzik",emoji:"🔕"},
 {en:"get up",pl:"wstawać",emoji:"🛏️"},{en:"open the curtains",pl:"odsłonić zasłony",emoji:"🪟"},
 {en:"make my bed",pl:"ścielić łóżko",emoji:"🛌"},{en:"have a shower",pl:"brać prysznic",emoji:"🚿"},
 {en:"wash my face",pl:"myć twarz",emoji:"🧼"},{en:"brush my teeth",pl:"myć zęby",emoji:"🪥"},
 {en:"brush my hair",pl:"czesać włosy",emoji:"💇"},{en:"get dressed",pl:"ubierać się",emoji:"👕"},
];
const U1B=[
 {en:"have breakfast",pl:"jeść śniadanie",emoji:"🥣"},{en:"drink juice",pl:"pić sok",emoji:"🧃"},
 {en:"pack my bag",pl:"pakować plecak",emoji:"🎒"},{en:"put on my shoes",pl:"zakładać buty",emoji:"👟"},
 {en:"put on my coat",pl:"zakładać kurtkę",emoji:"🧥"},{en:"leave home",pl:"wychodzić z domu",emoji:"🚪"},
 {en:"walk to school",pl:"iść pieszo do szkoły",emoji:"🚶"},{en:"catch the bus",pl:"złapać autobus",emoji:"🚌"},
 {en:"go to school",pl:"iść do szkoły",emoji:"🏫"},{en:"be late",pl:"spóźnić się",emoji:"⏳"},
];
const TIMES=[
 {en:"seven o'clock",pl:"siódma (pełna godzina)",emoji:"🕖"},{en:"half past seven",pl:"wpół do ósmej (7:30)",emoji:"🕢"},
 {en:"quarter past eight",pl:"kwadrans po ósmej (8:15)",emoji:"🕗"},{en:"quarter to nine",pl:"za kwadrans dziewiąta (8:45)",emoji:"🕘"},
 {en:"in the morning",pl:"rano",emoji:"🌅"},{en:"early",pl:"wcześnie",emoji:"🐓"},
];
const U2A=[
 {en:"come home",pl:"wracać do domu",emoji:"🏠"},{en:"have lunch",pl:"jeść lunch",emoji:"🥪"},
 {en:"do homework",pl:"odrabiać lekcje",emoji:"📚"},{en:"play football",pl:"grać w piłkę nożną",emoji:"⚽"},
 {en:"play computer games",pl:"grać w gry komputerowe",emoji:"🎮"},{en:"watch TV",pl:"oglądać telewizję",emoji:"📺"},
 {en:"ride my bike",pl:"jeździć na rowerze",emoji:"🚲"},{en:"go swimming",pl:"chodzić na basen",emoji:"🏊"},
 {en:"practise the piano",pl:"ćwiczyć na pianinie",emoji:"🎹"},{en:"walk the dog",pl:"wyprowadzać psa",emoji:"🐕"},
];
const U2B=[
 {en:"meet friends",pl:"spotykać się z przyjaciółmi",emoji:"👫"},{en:"help my mum",pl:"pomagać mamie",emoji:"🤝"},
 {en:"cook dinner",pl:"gotować obiad/kolację",emoji:"🍳"},{en:"have dinner",pl:"jeść kolację",emoji:"🍝"},
 {en:"wash the dishes",pl:"zmywać naczynia",emoji:"🍽️"},{en:"take a bath",pl:"brać kąpiel",emoji:"🛁"},
 {en:"put on my pyjamas",pl:"zakładać piżamę",emoji:"👘"},{en:"listen to music",pl:"słuchać muzyki",emoji:"🎧"},
 {en:"read a book",pl:"czytać książkę",emoji:"📖"},{en:"go to bed",pl:"iść spać",emoji:"🌙"},
];
const U3W=[
 {en:"always",pl:"zawsze (100%)",emoji:"💯"},{en:"usually",pl:"zwykle (80%)",emoji:"👍"},
 {en:"often",pl:"często (60%)",emoji:"🔁"},{en:"sometimes",pl:"czasami (40%)",emoji:"🤷"},
 {en:"hardly ever",pl:"prawie nigdy (5%)",emoji:"🤏"},{en:"never",pl:"nigdy (0%)",emoji:"🚫"},
];
const U3T=[
 {en:"every day",pl:"codziennie",emoji:"📅"},{en:"every week",pl:"co tydzień",emoji:"🗓️"},
 {en:"once a week",pl:"raz w tygodniu",emoji:"1️⃣"},{en:"twice a week",pl:"dwa razy w tygodniu",emoji:"2️⃣"},
 {en:"on Mondays",pl:"w poniedziałki",emoji:"📆"},{en:"at the weekend",pl:"w weekend",emoji:"🎉"},
];
const ALLV=U1A.concat(U1B,U2A,U2B);
const memOf=cards=>cards.map(c=>({emoji:c.emoji,word:c.en}));
const TF3=["True ✅","False ❌","Not given ❔"];
const TBL=(head,rows)=>`<table style="width:100%;border-collapse:collapse;font-size:14px;text-align:left;margin-top:8px;"><tr style="background:#050a30;color:#ecb83a;">${head.map(h=>`<th style="padding:8px;">${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td style="padding:8px;border-bottom:1px solid #eee;">${c}</td>`).join('')}</tr>`).join('')}</table>`;

/* ---------- course ---------- */
const COURSE={
 id:"daily-routines", title:"Daily Routines", emoji:"🌅",
 sub:"Your day in English — from the alarm clock to bedtime. about 60 words and phrases, 12 lessons, around 500 tasks.",
 units:[
 {id:"u1",title:"My Morning",emoji:"🌅",badge:"Early Bird",sub:"Wake up, get ready, go to school.",lessons:[
  {id:"u1l1",title:"Wake up!",emoji:"⏰",intro:"Ten words for the very start of your day — from the alarm clock to getting dressed.",bonus:U1A,zones:[
   {type:"cards",label:"Words",title:"Morning words",cards:U1A},
   {type:"find",label:"Find it",cards:U1A,rounds:10,title:"Which action is it? 🔎"},
   {type:"memory",label:"Memory",pairs:memOf(U1A.slice(0,8))},
   {type:"spell",label:"Spell it",words:[{word:"wake",emoji:"⏰"},{word:"alarm",emoji:"🔕"},{word:"bed",emoji:"🛌"},{word:"curtains",emoji:"🪟"},{word:"shower",emoji:"🚿"},{word:"face",emoji:"🧼"},{word:"teeth",emoji:"🪥"},{word:"hair",emoji:"💇"},{word:"dressed",emoji:"👕"}]},
   {type:"match",label:"Match",pairs:U1A},
   {type:"balloon",label:"Balloon Pop",cards:U1A,rounds:10},
   {type:"odd",label:"Odd one out",items:[
    {opts:["brush my teeth","brush my hair","wash my face","catch the bus"],odd:3,why:"'Catch the bus' happens outside; the others happen in the bathroom."},
    {opts:["shower","teeth","hair","bus"],odd:3,why:"'Bus' isn't part of your body or bathroom."},
    {opts:["wake up","get up","go to bed","turn off the alarm"],odd:2,why:"'Go to bed' is in the evening; the others are in the morning."},
    {opts:["make my bed","open the curtains","get dressed","have lunch"],odd:3,why:"'Have lunch' is at midday; the others are in the morning."},
    {opts:["alarm","curtains","bed","football"],odd:3,why:"'Football' isn't in your bedroom."},
    {opts:["wash","brush","get","pizza"],odd:3,why:"'Pizza' isn't a verb."},
   ]},
  ]},
  {id:"u1l2",title:"Ready for school",emoji:"🎒",intro:"Breakfast, bag, shoes, coat… and off you go! Ten more words.",bonus:U1A.concat(U1B),zones:[
   {type:"cards",label:"Words",title:"Getting ready",cards:U1B},
   {type:"find",label:"Find it",cards:U1B,rounds:10,title:"Which action is it? 🔎"},
   {type:"match",label:"Match",pairs:U1B},
   {type:"spell",label:"Spell it",words:[{word:"weekend",emoji:"🎉"},{word:"juice",emoji:"🧃"},{word:"bag",emoji:"🎒"},{word:"shoes",emoji:"👟"},{word:"coat",emoji:"🧥"},{word:"home",emoji:"🚪"},{word:"walk",emoji:"🚶"},{word:"bus",emoji:"🚌"},{word:"school",emoji:"🏫"},{word:"late",emoji:"⏳"}]},
   {type:"move",label:"Mime & say",items:[
    {emoji:"👕",text:"Mime 'get dressed' — put on an invisible jumper, fast! 👕"},
    {emoji:"🥣",text:"Mime 'have breakfast' — eat a big bowl of cereal! 🥣"},
    {emoji:"🎒",text:"Mime 'pack my bag' — books, pencil case, lunchbox! 🎒"},
    {emoji:"👟",text:"Mime 'put on my shoes' — and tie the laces! 👟"},
    {emoji:"🚌",text:"Mime 'catch the bus' — run, wave, and jump on! 🚌"},
    {emoji:"⏳",text:"Mime 'be late' — look at your watch and panic! ⏳"},
   ]},
   {type:"listen",label:"Listen",items:[
    {word:"I get dressed.",options:["I get dressed.","I get up.","I get to school."],correct:0},
    {word:"We catch the bus.",options:["We catch the bus.","We catch the ball.","We watch the bus."],correct:0},
    {word:"They have breakfast.",options:["They have breakfast.","They have a shower.","They have lunch."],correct:0},
    {word:"I pack my bag.",options:["I pack my bag.","I pick my bag.","I back my bag."],correct:0},
    {word:"Put on your coat!",options:["Put on your coat!","Put on your boat!","Put on your coach!"],correct:0},
    {word:"Don't be late!",options:["Don't be late!","Don't be lazy!","Don't eat late!"],correct:0},
    {word:"We walk to school.",options:["We walk to school.","We work at school.","We walk to the pool."],correct:0},
   ]},
   {type:"memory",label:"Memory",pairs:memOf(U1B.slice(0,8))},
  ]},
  {id:"u1l3",title:"I get up at seven",emoji:"🕖",intro:"Present Simple for routines (I / you / we / they) and telling the time with 'at'.",bonus:U1A.concat(U1B),zones:[
   {type:"grammar",label:"Present Simple",title:"Present Simple — I / you / we / they",html:`<p>We use the <b>Present Simple</b> for things we do <b>every day</b> — our routines.</p>${TBL(["English","Polski"],[["I <b>get up</b> at seven.","Wstaję o siódmej."],["You <b>have</b> a shower.","Bierzesz prysznic."],["We <b>go</b> to school by bus.","Jeździmy do szkoły autobusem."],["They <b>have</b> breakfast at eight.","Oni jedzą śniadanie o ósmej."]])}<p style="margin-top:12px;"><b>Telling the time:</b></p>${TBL(["",""],[["🕖 7:00","seven o'clock"],["🕗 8:15","quarter past eight"],["🕢 7:30","half past seven"],["🕘 8:45","quarter to nine"]])}<p style="margin-top:12px;"><b>at</b> seven o'clock · <b>in</b> the morning · <b>by</b> bus</p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ I gets up at seven. ❌ We having breakfast. ✅ I get up at seven. ✅ We have breakfast.</p>`},
   {type:"cards",label:"Time words",title:"Telling the time",cards:TIMES},
   {type:"whack",label:"Clock whack",qs:[
    {q:"🕖 7:00",opts:["seven o'clock","half past seven","quarter to seven"],correct:0},
    {q:"🕢 7:30",opts:["half past seven","half past six","seven o'clock"],correct:0},
    {q:"🕗 8:15",opts:["quarter past eight","quarter to eight","eight fifty"],correct:0},
    {q:"🕘 8:45",opts:["quarter to nine","quarter past nine","nine forty"],correct:0},
    {q:"🕕 6:00",opts:["six o'clock","sixteen o'clock","half past six"],correct:0},
    {q:"🕣 8:30",opts:["half past eight","half past nine","eight o'clock"],correct:0},
   ]},
   {type:"fill",label:"Fill it",tag:"PRESENT SIMPLE",items:[
    {before:"I",blank:"get up",after:"at seven o'clock.",bank:["get up","gets up","getting up"],emoji:"🛏️"},
    {before:"We have breakfast",blank:"at",after:"eight.",bank:["at","in","on"],emoji:"🥣"},
    {before:"They",blank:"go",after:"to school by bus.",bank:["go","goes","going"],emoji:"🚌"},
    {before:"I have a shower",blank:"in",after:"the morning.",bank:["in","at","on"],emoji:"🚿"},
    {before:"You",blank:"brush",after:"your teeth after breakfast.",bank:["brush","brushes","brushing"],emoji:"🪥"},
    {before:"We go to school",blank:"by",after:"bus.",bank:["by","on","with"],emoji:"🚌"},
    {before:"I",blank:"make",after:"my bed every day.",bank:["make","makes","do"],emoji:"🛌"},
    {before:"They leave home at quarter",blank:"to",after:"eight.",bank:["to","past","at"],emoji:"🕖"},
   ]},
   {type:"build",label:"Build it",items:[
    {s:"I get up at seven.",pl:"Wstaję o siódmej."},
    {s:"We have breakfast at eight.",pl:"Jemy śniadanie o ósmej."},
    {s:"They catch the bus.",pl:"Oni łapią autobus."},
    {s:"I brush my teeth in the morning.",pl:"Myję zęby rano."},
    {s:"You walk to school.",pl:"Chodzisz do szkoły pieszo."},
    {s:"We leave home at half past seven.",pl:"Wychodzimy z domu o wpół do ósmej."},
   ]},
   {type:"errors",label:"Find the error",items:[
    {s:"I gets up at seven.",wrong:1,ok:"I get up at seven."},
    {s:"We have breakfast on eight.",wrong:3,ok:"We have breakfast at eight."},
    {s:"They goes to school.",wrong:1,ok:"They go to school."},
    {s:"I have a shower at the morning.",wrong:4,ok:"I have a shower in the morning."},
    {s:"We go to school with bus.",wrong:4,ok:"We go to school by bus."},
    {s:"You brushes your teeth.",wrong:1,ok:"You brush your teeth."},
   ]},
   {type:"typed",label:"Translation",blocks:[{id:"t13",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
    {prompt:"Wstaję o siódmej.",answers:["I get up at seven","I get up at 7","I get up at seven o'clock"]},
    {prompt:"Jemy śniadanie rano.",answers:["We have breakfast in the morning","We eat breakfast in the morning"]},
    {prompt:"Oni jeżdżą do szkoły autobusem.",answers:["They go to school by bus"]},
    {prompt:"Ścielę łóżko.",answers:["I make my bed"]},
    {prompt:"wpół do ósmej",answers:["half past seven"]},
   ]}]},
  ]},
  {id:"u1l4",title:"Morning check",emoji:"🏅",intro:"Unit review: a story, a big quiz, a Wordle, the fortune wheel and translation.",bonus:U1A.concat(U1B),zones:[
   {type:"reading",label:"Story",title:"Leo's Busy Morning",paras:[
    "<b>Leo's Busy Morning</b>",
    "Leo wakes up at six o'clock, but he doesn't get up. He turns off the alarm and says, 'Five more minutes!' At half past six his alarm rings again — now he jumps out of bed!",
    "He opens the curtains and makes his bed. Then he has a quick shower, washes his face and brushes his teeth. He gets dressed: blue trousers and his favourite gold cape.",
    "Leo has breakfast with his sister — toast, a banana and orange juice. At quarter past seven he packs his bag, puts on his shoes and his coat and leaves home.",
    "'The bus!' He runs, waves… and catches the bus just in time. Leo is never late for school — well, almost never!",
   ]},
   {type:"tf",label:"True/False/NG",title:"True, False or Not given?",sub:"Not given = the story doesn't say.",tag:"READING CHECK",labels:TF3,items:[
    {text:"Leo gets up at six o'clock.",answer:1},
    {text:"Leo makes his bed.",answer:0},
    {text:"Leo has a bath in the morning.",answer:1},
    {text:"Leo's sister has breakfast with him.",answer:0},
    {text:"Leo's sister goes to the same school.",answer:2},
    {text:"Leo drinks orange juice.",answer:0},
    {text:"Leo leaves home at half past eight.",answer:1},
    {text:"Leo walks to school.",answer:1},
   ]},
   {type:"quiz",label:"Big quiz",tag:"MORNING QUIZ",qs:[
    {q:"'brush my teeth' =",opts:["myć zęby","brać prysznic","ubierać się"],correct:0},
    {q:"'ścielić łóżko' =",opts:["make my bed","do my bed","go to bed"],correct:0},
    {q:"What does Leo eat for breakfast?",opts:["Toast and a banana","Cereal","Nothing"],correct:0},
    {q:"I ___ dressed at seven.",opts:["get","gets","getting"],correct:0},
    {q:"We go to school ___ bus.",opts:["by","on","at"],correct:0},
    {q:"8:45 =",opts:["quarter to nine","quarter past nine","quarter past eight"],correct:0},
    {q:"Which one do you put on your feet?",opts:["shoes","coat","pyjamas"],correct:0},
    {q:"'spóźnić się' =",opts:["be late","be early","be ready"],correct:0},
   ]},
   {type:"wordle",label:"Wordle",words:[{word:"shower",emoji:"🚿"},{word:"teeth",emoji:"🪥"},{word:"school",emoji:"🏫"},{word:"juice",emoji:"🧃"},{word:"shoes",emoji:"👟"},{word:"alarm",emoji:"🔕"}]},
   {type:"wheel",label:"Fortune Wheel",items:U1A.concat(U1B)},
   {type:"typed",label:"Translation",blocks:[{id:"m1",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
    {prompt:"Wstaję o siódmej.",answers:["I get up at seven","I get up at 7","I get up at seven o'clock"]},
    {prompt:"Myję zęby i czeszę włosy.",answers:["I brush my teeth and brush my hair","I brush my teeth and I brush my hair"]},
    {prompt:"Jeździmy do szkoły autobusem.",answers:["We go to school by bus"]},
    {prompt:"Pakuję plecak.",answers:["I pack my bag"]},
    {prompt:"Nie spóźnij się!",answers:["Don't be late","Do not be late"]},
   ]}]},
  ]},
 ]},
 {id:"u2",title:"After School",emoji:"🌇",badge:"Busy Bee",sub:"Afternoon and evening — and he / she / it.",lessons:[
  {id:"u2l1",title:"Afternoon fun",emoji:"⚽",intro:"Ten things you do after school: homework, football, games, swimming, the dog…",bonus:U2A,zones:[
   {type:"cards",label:"Words",title:"After school",cards:U2A},
   {type:"find",label:"Find it",cards:U2A,rounds:10,title:"Which activity is it? 🔎"},
   {type:"spell",label:"Spell it",words:[{word:"home",emoji:"🏠"},{word:"lunch",emoji:"🥪"},{word:"homework",emoji:"📚"},{word:"football",emoji:"⚽"},{word:"games",emoji:"🎮"},{word:"bike",emoji:"🚲"},{word:"swimming",emoji:"🏊"},{word:"piano",emoji:"🎹"},{word:"dog",emoji:"🐕"}]},
   {type:"memory",label:"Memory",pairs:memOf(U2A.slice(0,8))},
   {type:"match",label:"Match",pairs:U2A},
   {type:"balloon",label:"Balloon Pop",cards:U2A,rounds:10},
   {type:"odd",label:"Odd one out",items:[
    {opts:["have lunch","have dinner","have breakfast","do homework"],odd:3,why:"'Do homework' isn't a meal; the others are."},
    {opts:["football","piano","swimming","shower"],odd:3,why:"A shower isn't a hobby; the others are."},
    {opts:["play football","watch TV","catch the bus","ride my bike"],odd:2,why:"'Catch the bus' isn't free-time fun; the others are."},
    {opts:["play football","play computer games","play the piano","play homework"],odd:3,why:"We say 'DO homework', not 'play homework'."},
    {opts:["dog","bike","ball","Monday"],odd:3,why:"'Monday' is a day; the others are things."},
    {opts:["go swimming","go home","go to school","go football"],odd:3,why:"We say 'PLAY football', not 'go football'."},
   ]},
  ]},
  {id:"u2l2",title:"Evening",emoji:"🌙",intro:"Friends, cooking, dishes, a bath, music, a good book… and bed. Ten evening words.",bonus:U2A.concat(U2B),zones:[
   {type:"cards",label:"Words",title:"In the evening",cards:U2B},
   {type:"find",label:"Find it",cards:U2B,rounds:10,title:"Which activity is it? 🔎"},
   {type:"match",label:"Match",pairs:U2B},
   {type:"spell",label:"Spell it",words:[{word:"friends",emoji:"👫"},{word:"cook",emoji:"🍳"},{word:"dinner",emoji:"🍝"},{word:"dishes",emoji:"🍽️"},{word:"bath",emoji:"🛁"},{word:"pyjamas",emoji:"👘"},{word:"music",emoji:"🎧"},{word:"book",emoji:"📖"},{word:"bed",emoji:"🌙"}]},
   {type:"balloon",label:"Balloon Pop",cards:U2A.concat(U2B),rounds:10},
   {type:"listen",label:"Listen",items:[
    {word:"I meet my friends.",options:["I meet my friends.","I meat my friends.","I meet my French."],correct:0},
    {word:"We have dinner at seven.",options:["We have dinner at seven.","We have dinner at eleven.","We have lunch at seven."],correct:0},
    {word:"I go to bed at ten.",options:["I go to bed at ten.","I go to bed at two.","I go to bat at ten."],correct:0},
    {word:"I wash the dishes.",options:["I wash the dishes.","I watch the dishes.","I wish the dishes."],correct:0},
    {word:"She takes a bath.",options:["She takes a bath.","She takes a bus.","She takes a path."],correct:0},
    {word:"We listen to music.",options:["We listen to music.","We listen to the news.","We list the music."],correct:0},
    {word:"I help my mum.",options:["I help my mum.","I hold my mum.","I help my mug."],correct:0},
   ]},
   {type:"wheel",label:"Fortune Wheel",items:U2A.concat(U2B)},
  ]},
  {id:"u2l3",title:"She plays football",emoji:"👧",intro:"He / she / it — the verb gets an -s (or -es)!",bonus:U2A.concat(U2B),zones:[
   {type:"grammar",label:"He / she / it",title:"He / she / it + -s",html:`<p>With <b>he, she, it</b> the verb gets <b>-s</b>.</p>${TBL(["I / you / we / they","he / she / it"],[["play","play<b>s</b>"],["read","read<b>s</b>"],["ride","ride<b>s</b>"],["watch","watch<b>es</b>"],["wash","wash<b>es</b>"],["go / do","go<b>es</b> / do<b>es</b>"],["have","<b>has</b> ⚠️"]])}<p style="margin-top:12px;">-ch, -sh, -o → <b>-es</b> · have → <b>has</b></p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ She play football. ❌ He haves lunch. ✅ She plays football. ✅ He has lunch.</p>`},
   {type:"quiz",label:"-s or -es?",tag:"-S OR -ES?",qs:[
    {q:"play → she ___",opts:["plays","playes","plaies"],correct:0},
    {q:"watch → he ___",opts:["watches","watchs","watchies"],correct:0},
    {q:"go → it ___",opts:["goes","gos","goies"],correct:0},
    {q:"have → she ___",opts:["has","haves","have"],correct:0},
    {q:"wash → he ___",opts:["washes","washs","wash"],correct:0},
    {q:"do → she ___",opts:["does","dos","doies"],correct:0},
    {q:"ride → he ___",opts:["rides","ridees","rid"],correct:0},
    {q:"read → she ___",opts:["reads","reades","read"],correct:0},
   ]},
   {type:"fill",label:"Fill it",tag:"HE / SHE / IT",items:[
    {before:"She",blank:"plays",after:"football on Fridays.",bank:["plays","play","playes"],emoji:"⚽"},
    {before:"Tom",blank:"watches",after:"TV after dinner.",bank:["watches","watchs","watch"],emoji:"📺"},
    {before:"My sister",blank:"does",after:"her homework.",bank:["does","dos","do"],emoji:"📚"},
    {before:"He",blank:"has",after:"lunch at school.",bank:["has","haves","have"],emoji:"🥪"},
    {before:"Dad",blank:"washes",after:"the dishes.",bank:["washes","washs","wash"],emoji:"🍽️"},
    {before:"My brother",blank:"goes",after:"swimming on Mondays.",bank:["goes","gos","go"],emoji:"🏊"},
    {before:"Mia",blank:"walks",after:"the dog after school.",bank:["walks","walk","walkes"],emoji:"🐕"},
    {before:"The dog",blank:"sleeps",after:"on my bed.",bank:["sleeps","sleep","sleepes"],emoji:"🐶"},
   ]},
   {type:"build",label:"Build it",items:[
    {s:"He goes to bed at ten.",pl:"On chodzi spać o dziesiątej."},
    {s:"She reads a book.",pl:"Ona czyta książkę."},
    {s:"Mia meets her friends.",pl:"Mia spotyka się z przyjaciółmi."},
    {s:"My mum cooks dinner.",pl:"Moja mama gotuje obiad."},
    {s:"He rides his bike after school.",pl:"On jeździ na rowerze po szkole."},
    {s:"She practises the piano every day.",pl:"Ona codziennie ćwiczy na pianinie."},
   ]},
   {type:"errors",label:"Find the error",items:[
    {s:"She play football.",wrong:1,ok:"She plays football."},
    {s:"He haves dinner at seven.",wrong:1,ok:"He has dinner at seven."},
    {s:"Tom watchs TV.",wrong:1,ok:"Tom watches TV."},
    {s:"My dad cook dinner.",wrong:2,ok:"My dad cooks dinner."},
    {s:"She dos her homework.",wrong:1,ok:"She does her homework."},
    {s:"I plays computer games.",wrong:1,ok:"I play computer games."},
   ]},
   {type:"typed",label:"Translation",blocks:[{id:"t23",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
    {prompt:"Ona czyta książkę.",answers:["She reads a book"]},
    {prompt:"On ogląda telewizję.",answers:["He watches TV","He watches television"]},
    {prompt:"Mama gotuje kolację.",answers:["Mum cooks dinner","My mum cooks dinner","Mom cooks dinner"]},
    {prompt:"Tom wyprowadza psa.",answers:["Tom walks the dog"]},
    {prompt:"Ona zmywa naczynia.",answers:["She washes the dishes"]},
   ]}]},
  ]},
  {id:"u2l4",title:"Mia's afternoon",emoji:"🏅",intro:"Unit review: read about Mia, then whack, guess, sort out mistakes and translate.",bonus:U2A.concat(U2B),zones:[
   {type:"reading",label:"Story",title:"Mia's Afternoon",paras:[
    "<b>Mia's Afternoon</b>",
    "Mia comes home at three. She has lunch with her grandad — he makes the best tomato soup in town. Then she does her homework at the kitchen table.",
    "At four she walks the dog. Rocky is very big and very fast, so Mia rides her bike next to him!",
    "At five she meets her friends in the park and they play football. Mia is the goalkeeper. Today she stops every ball!",
    "In the evening Mia helps her mum. Mum cooks dinner and Mia washes the dishes. After dinner she takes a bath, puts on her pyjamas and listens to music. She reads a book in bed and goes to sleep at nine.",
   ]},
   {type:"tf",label:"True/False/NG",title:"True, False or Not given?",sub:"Not given = the story doesn't say.",tag:"READING CHECK",labels:TF3,items:[
    {text:"Mia has lunch with her grandad.",answer:0},
    {text:"Mia does her homework in her bedroom.",answer:1},
    {text:"Rocky is a small dog.",answer:1},
    {text:"Mia's friends are in her class.",answer:2},
    {text:"Mia is the goalkeeper.",answer:0},
    {text:"Mia cooks dinner.",answer:1},
    {text:"Mia's favourite music is pop.",answer:2},
    {text:"Mia goes to sleep at nine.",answer:0},
   ]},
   {type:"whack",label:"Whack-a-Leo",qs:[
    {q:"Mia ___ football in the park.",opts:["plays","play","playing"],correct:0},
    {q:"'have dinner' =",opts:["jeść kolację","jeść lunch","iść spać"],correct:0},
    {q:"She ___ TV after dinner.",opts:["watches","watchs","watch"],correct:0},
    {q:"When does Mia go to sleep?",opts:["At nine","At ten","At five"],correct:0},
    {q:"Who washes the dishes?",opts:["Mia","Mum","Grandad"],correct:0},
    {q:"'wyprowadzać psa' =",opts:["walk the dog","run the dog","go the dog"],correct:0},
   ]},
   {type:"errors",label:"Find the error",items:[
    {s:"Mia come home at three.",wrong:1,ok:"Mia comes home at three."},
    {s:"She do her homework.",wrong:1,ok:"She does her homework."},
    {s:"Mum cook dinner.",wrong:1,ok:"Mum cooks dinner."},
    {s:"She go to sleep at nine.",wrong:1,ok:"She goes to sleep at nine."},
   ]},
   {type:"wordle",label:"Wordle",words:[{word:"lunch",emoji:"🥪"},{word:"dinner",emoji:"🍝"},{word:"music",emoji:"🎧"},{word:"piano",emoji:"🎹"},{word:"dishes",emoji:"🍽️"}]},
   {type:"typed",label:"Type it",blocks:[{id:"a1",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
    {prompt:"Ona odrabia lekcje.",answers:["She does her homework","She does homework"]},
    {prompt:"On gra w piłkę nożną.",answers:["He plays football"]},
    {prompt:"Mia idzie spać o dziewiątej.",answers:["Mia goes to bed at nine","Mia goes to bed at 9","Mia goes to sleep at nine"]},
    {prompt:"Mia jeździ na rowerze.",answers:["Mia rides her bike","Mia rides a bike"]},
    {prompt:"On słucha muzyki.",answers:["He listens to music"]},
   ]}]},
  ]},
 ]},
 {id:"u3",title:"How Often?",emoji:"📅",badge:"Routine Star",sub:"Always, usually, never — and questions with do / does.",lessons:[
  {id:"u3l1",title:"Always or never?",emoji:"🔁",intro:"Words that say how often: always, usually, often, sometimes, hardly ever, never — plus every day, once a week and more.",bonus:U3W.concat(U3T),zones:[
   {type:"cards",label:"Words",title:"How often?",cards:U3W.concat(U3T)},
   {type:"grammar",label:"100% → 0%",title:"From 100% to 0%",html:TBL(["adverb","",""],[["<b>always</b>","zawsze","💯 100%"],["<b>usually</b>","zwykle","👍 80%"],["<b>often</b>","często","🔁 60%"],["<b>sometimes</b>","czasami","🤷 40%"],["<b>hardly ever</b>","prawie nigdy","🤏 5%"],["<b>never</b>","nigdy","🚫 0%"]])+`<p style="margin-top:12px;">Longer expressions go at the <b>end</b>: I play football <b>twice a week</b>. We swim <b>on Mondays</b>.</p><p style="margin-top:8px;">Question: <b>How often</b> do you…? — Jak często…?</p>`},
   {type:"find",label:"Find it",cards:U3W.concat(U3T),rounds:10,title:"Which one is it? 🔎"},
   {type:"quiz",label:"Quiz",tag:"HOW OFTEN?",qs:[
    {q:"Which one means 100%?",opts:["always","often","usually"],correct:0},
    {q:"Which one means 0%?",opts:["never","sometimes","often"],correct:0},
    {q:"'czasami' =",opts:["sometimes","usually","always"],correct:0},
    {q:"Which is more often?",opts:["usually","sometimes","never"],correct:0},
    {q:"'raz w tygodniu' =",opts:["once a week","one week","every week"],correct:0},
    {q:"Which is less often?",opts:["hardly ever","often","usually"],correct:0},
    {q:"'w weekend' =",opts:["at the weekend","in weekend","on weekend"],correct:0},
    {q:"2 times every week =",opts:["twice a week","two a week","second week"],correct:0},
   ]},
   {type:"match",label:"Match",pairs:U3W.concat(U3T)},
   {type:"balloon",label:"Balloon Pop",cards:U3W.concat(U3T),rounds:10},
   {type:"spell",label:"Spell it",words:[{word:"always",emoji:"💯"},{word:"usually",emoji:"👍"},{word:"often",emoji:"🔁"},{word:"sometimes",emoji:"🤷"},{word:"never",emoji:"🚫"},{word:"twice",emoji:"2️⃣"},{word:"once",emoji:"1️⃣"},{word:"weekend",emoji:"🎉"}]},
  ]},
  {id:"u3l2",title:"Word order",emoji:"🧩",intro:"Where does 'always' go? Before the verb — but after 'be'!",bonus:U3W.concat(U3T),zones:[
   {type:"grammar",label:"Word order",title:"Where does the adverb go?",html:`<p>The adverb goes <b>before</b> the main verb…</p>${TBL(["",""],[["I <b>usually</b> get up at seven.","✅"],["She <b>never</b> watches TV.","✅"],["We <b>often</b> play football.","✅"]])}<p style="margin-top:12px;">…but <b>after</b> am / is / are:</p>${TBL(["",""],[["I am <b>always</b> tired on Mondays.","✅"],["He is <b>often</b> late.","✅"],["They are <b>never</b> hungry.","✅"]])}<p style="margin-top:12px;">Time expressions go at the <b>end</b>: I walk the dog <b>every day</b>.</p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ She watches never TV. ❌ I always am tired. ❌ Every day I walk the dog every day.</p>`},
   {type:"build",label:"Build it",items:[
    {s:"I usually get up at seven.",pl:"Zwykle wstaję o siódmej."},
    {s:"She never watches TV.",pl:"Ona nigdy nie ogląda telewizji."},
    {s:"He is often late.",pl:"On często się spóźnia."},
    {s:"We sometimes play football.",pl:"Czasami gramy w piłkę."},
    {s:"They are always happy.",pl:"Oni są zawsze szczęśliwi."},
    {s:"I walk the dog every day.",pl:"Codziennie wyprowadzam psa."},
    {s:"She goes swimming twice a week.",pl:"Ona chodzi na basen dwa razy w tygodniu."},
    {s:"My dad hardly ever cooks dinner.",pl:"Mój tata prawie nigdy nie gotuje obiadu."},
   ]},
   {type:"errors",label:"Find the error",items:[
    {s:"I get always up at seven.",wrong:2,ok:"I always get up at seven."},
    {s:"She always is happy.",wrong:1,ok:"She is always happy."},
    {s:"He watches never TV.",wrong:2,ok:"He never watches TV."},
    {s:"We play often football.",wrong:2,ok:"We often play football."},
    {s:"I am late sometimes for school.",wrong:3,ok:"I am sometimes late for school."},
    {s:"They go swimming two a week.",wrong:3,ok:"They go swimming twice a week."},
   ]},
   {type:"fill",label:"Fill it",tag:"HOW OFTEN?",items:[
    {before:"I",blank:"always",after:"brush my teeth. (100%)",bank:["always","never","sometimes"],emoji:"🪥"},
    {before:"We",blank:"sometimes",after:"have pizza. (40%)",bank:["sometimes","always","usually"],emoji:"🍕"},
    {before:"He",blank:"never",after:"reads comics. (0%)",bank:["never","often","usually"],emoji:"📚"},
    {before:"She is",blank:"usually",after:"tired after school. (80%)",bank:["usually","never","hardly ever"],emoji:"😴"},
    {before:"I",blank:"often",after:"ride my bike. (60%)",bank:["often","always","never"],emoji:"🚲"},
    {before:"My cat",blank:"hardly ever",after:"goes outside. (5%)",bank:["hardly ever","always","often"],emoji:"🐱"},
    {before:"We have English",blank:"twice",after:"a week.",bank:["twice","two","second"],emoji:"2️⃣"},
   ]},
   {type:"whack",label:"Whack-a-Leo",qs:[
    {q:"Which is correct?",opts:["I often play games.","I play often games.","Often I play games often."],correct:0},
    {q:"Which is correct?",opts:["He is never late.","He never is late.","He is late never."],correct:0},
    {q:"Which is correct?",opts:["We swim on Mondays.","We on Mondays swim.","On Mondays we swim on Mondays."],correct:0},
    {q:"80% =",opts:["usually","sometimes","hardly ever"],correct:0},
    {q:"Which is correct?",opts:["She always walks the dog.","She walks always the dog.","She always walk the dog."],correct:0},
    {q:"'prawie nigdy' =",opts:["hardly ever","never","sometimes"],correct:0},
   ]},
   {type:"move",label:"Stand up!",items:[
    {emoji:"🥣",text:"Stand up if you ALWAYS have breakfast! Say: 'I always have breakfast.' 🥣"},
    {emoji:"⚽",text:"Jump if you OFTEN play football! Say: 'I often play football.' ⚽"},
    {emoji:"🎮",text:"Clap if you play computer games EVERY DAY! Say: 'I play computer games every day.' 🎮"},
    {emoji:"🛁",text:"Touch your nose if you SOMETIMES take a bath! Say: 'I sometimes take a bath.' 🛁"},
    {emoji:"🌙",text:"Sit down if you NEVER go to bed after midnight! Say: 'I never go to bed late.' 🌙"},
   ]},
  ]},
  {id:"u3l3",title:"Do you…?",emoji:"❓",intro:"Questions and negatives: do / does, don't / doesn't — and short answers.",bonus:U3W.concat(U3T),zones:[
   {type:"grammar",label:"do / does",title:"do / does · don't / doesn't",html:TBL(["","I / you / we / they","he / she / it"],[["❓","<b>Do</b> you play…?","<b>Does</b> she play…?"],["➖","I <b>don't</b> play.","She <b>doesn't</b> play."],["✅","Yes, I <b>do</b>.","Yes, she <b>does</b>."],["❌","No, I <b>don't</b>.","No, she <b>doesn't</b>."]])+`<p style="margin-top:12px;">After <b>does / doesn't</b> the verb has <b>no -s</b>: She doesn't <b>play</b>.</p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ Does she plays? ❌ He don't watch TV. ✅ Does she play? ✅ He doesn't watch TV.</p>`},
   {type:"fill",label:"Fill it",tag:"DO / DOES",items:[
    {before:"",blank:"Do",after:"you get up early?",bank:["Do","Does","Are"],emoji:"⏰"},
    {before:"",blank:"Does",after:"he play football?",bank:["Does","Do","Is"],emoji:"⚽"},
    {before:"I",blank:"don't",after:"have breakfast at school.",bank:["don't","doesn't","not"],emoji:"🥣"},
    {before:"She",blank:"doesn't",after:"watch TV.",bank:["doesn't","don't","isn't"],emoji:"📺"},
    {before:"",blank:"Do",after:"they walk to school?",bank:["Do","Does","Are"],emoji:"🚶"},
    {before:"My dog",blank:"doesn't",after:"like the bath.",bank:["doesn't","don't","not"],emoji:"🐕"},
    {before:"How often",blank:"does",after:"Mia go swimming?",bank:["does","do","is"],emoji:"🏊"},
    {before:"We",blank:"don't",after:"go to school at the weekend.",bank:["don't","doesn't","aren't"],emoji:"🎉"},
   ]},
   {type:"quiz",label:"Short answers",tag:"SHORT ANSWERS",qs:[
    {q:"Do you like pizza? (✅)",opts:["Yes, I do.","Yes, I does.","Yes, I am."],correct:0},
    {q:"Does she walk the dog? (❌)",opts:["No, she doesn't.","No, she don't.","No, she isn't."],correct:0},
    {q:"Do they play football? (✅)",opts:["Yes, they do.","Yes, they does.","Yes, they play."],correct:0},
    {q:"Does he cook dinner? (✅)",opts:["Yes, he does.","Yes, he do.","Yes, he cooks does."],correct:0},
    {q:"Do you take a bath? (❌)",opts:["No, I don't.","No, I doesn't.","No, I not."],correct:0},
    {q:"Does it rain every day? (❌)",opts:["No, it doesn't.","No, it don't.","No, it isn't rain."],correct:0},
   ]},
   {type:"build",label:"Build it",items:[
    {s:"How often do you do homework?",pl:"Jak często odrabiasz lekcje?"},
    {s:"Does she catch the bus?",pl:"Czy ona łapie autobus?"},
    {s:"He doesn't go to bed late.",pl:"On nie chodzi spać późno."},
    {s:"Do you walk the dog?",pl:"Czy wyprowadzasz psa?"},
    {s:"We don't watch TV in the morning.",pl:"Nie oglądamy telewizji rano."},
    {s:"How often does he go swimming?",pl:"Jak często on chodzi na basen?"},
   ]},
   {type:"listen",label:"Listen",items:[
    {word:"Do you usually walk to school?",options:["Do you usually walk to school?","Do you usually work at school?","Does he usually walk to school?"],correct:0},
    {word:"She doesn't have lunch at home.",options:["She doesn't have lunch at home.","She does have lunch at home.","She don't have lunch at home."],correct:0},
    {word:"How often do you read?",options:["How often do you read?","How often do you ride?","How old are you?"],correct:0},
    {word:"Yes, he does.",options:["Yes, he does.","Yes, he is.","Yes, he do."],correct:0},
    {word:"We don't get up early.",options:["We don't get up early.","We do get up early.","We don't get up yearly."],correct:0},
   ]},
   {type:"typed",label:"Translation",blocks:[{id:"q1",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
    {prompt:"Czy ona je śniadanie?",answers:["Does she have breakfast","Does she eat breakfast"]},
    {prompt:"Nie oglądam telewizji.",answers:["I don't watch TV","I do not watch TV","I don't watch television"]},
    {prompt:"Jak często grasz w piłkę?",answers:["How often do you play football"]},
    {prompt:"Czy on wyprowadza psa?",answers:["Does he walk the dog"]},
    {prompt:"Tak, ona tak. (krótka odpowiedź)",answers:["Yes, she does","Yes she does"]},
   ]}]},
  ]},
  {id:"u3l4",title:"Leo's week",emoji:"🏆",intro:"Final challenge: read about Leo's week, then quiz, wheel, Wordle and write about YOUR routine.",bonus:ALLV,zones:[
   {type:"reading",label:"Story",title:"Leo's Week",paras:[
    "<b>Leo's Week</b>",
    "Leo always gets up at six — superheroes start early! He usually has a shower, but he never has breakfast at home. He eats a banana on the bus.",
    "After school he often plays football, and he goes swimming twice a week, on Tuesdays and Thursdays. On Wednesdays he sometimes goes to the library and reads comics about other heroes.",
    "Leo hardly ever watches TV. 'It's boring,' he says. He prefers music — he listens to music every evening while he washes the dishes.",
    "At the weekend Leo doesn't get up early. He sleeps until nine, has pancakes with his family and meets his friends in the park. Does he do homework on Sunday? Yes, he does — but only after lunch!",
   ]},
   {type:"tf",label:"True/False/NG",title:"True, False or Not given?",sub:"Not given = the story doesn't say.",tag:"READING CHECK",labels:TF3,items:[
    {text:"Leo always gets up at six on school days.",answer:0},
    {text:"Leo usually has breakfast at home.",answer:1},
    {text:"Leo goes swimming twice a week.",answer:0},
    {text:"Leo often watches TV.",answer:1},
    {text:"Leo's favourite comic is about a lemur.",answer:2},
    {text:"Leo listens to music in the evening.",answer:0},
    {text:"Leo gets up early at the weekend.",answer:1},
    {text:"Leo does homework on Sunday.",answer:0},
   ]},
   {type:"quiz",label:"Final quiz",tag:"FINAL QUIZ",qs:[
    {q:"Where does Leo eat a banana?",opts:["On the bus","At home","At school"],correct:0},
    {q:"When does Leo go swimming?",opts:["On Tuesdays and Thursdays","On Mondays","At the weekend"],correct:0},
    {q:"Which is correct?",opts:["He never has breakfast at home.","He has never breakfast at home.","He never have breakfast at home."],correct:0},
    {q:"___ Leo meet his friends at the weekend?",opts:["Does","Do","Is"],correct:0},
    {q:"'prawie nigdy' =",opts:["hardly ever","sometimes","usually"],correct:0},
    {q:"Leo ___ the dishes every evening.",opts:["washes","wash","washs"],correct:0},
    {q:"Does Leo watch TV a lot?",opts:["No, he doesn't.","Yes, he does.","No, he don't."],correct:0},
    {q:"'wpół do ósmej' =",opts:["half past seven","half past eight","quarter to eight"],correct:0},
   ]},
   {type:"wheel",label:"Fortune Wheel",items:ALLV},
   {type:"wordle",label:"Wordle",words:[{word:"always",emoji:"💯"},{word:"never",emoji:"🚫"},{word:"often",emoji:"🔁"},{word:"twice",emoji:"2️⃣"},{word:"weekend",emoji:"🎉"}]},
   {type:"writing",label:"My routine",title:"My Routine ✍️",sub:"Write about your normal week (min. 40 words). Use always / usually / often / sometimes / hardly ever / never and twice a week / at the weekend!",starters:["I usually get up at…","I always…","After school I often…","Twice a week I…","I hardly ever…","At the weekend I…"],min:40},
  ]},
 ]},
 ],
};


/* ---------- Wordle + Fortune Wheel in every lesson ---------- */
(function(){
 const W=(arr)=>arr.map(([word,emoji])=>({word,emoji}));
 const extra={
  u1l1:{wordle:W([["wake","⏰"],["alarm","🔕"],["shower","🚿"],["teeth","🪥"],["hair","💇"],["face","🧼"]]),wheel:U1A},
  u1l2:{wordle:W([["juice","🧃"],["shoes","👟"],["coat","🧥"],["school","🏫"],["late","⏳"],["walk","🚶"]]),wheel:U1B},
  u1l3:{wordle:W([["seven","🕖"],["eight","🕗"],["early","🐓"],["half","🕢"],["past","⏩"]]),wheel:U1A.concat(U1B)},
  u1l4:{},
  u2l1:{wordle:W([["lunch","🥪"],["piano","🎹"],["games","🎮"],["bike","🚲"],["home","🏠"],["dog","🐕"]]),wheel:U2A},
  u2l2:{wordle:W([["dinner","🍝"],["dishes","🍽️"],["bath","🛁"],["music","🎧"],["book","📖"]])},
  u2l3:{wordle:W([["plays","⚽"],["reads","📖"],["rides","🚲"],["washes","🍽️"],["cooks","🍳"]]),wheel:U2A.concat(U2B)},
  u2l4:{wheel:U2A.concat(U2B)},
  u3l1:{wordle:W([["always","💯"],["often","🔁"],["never","🚫"],["once","1️⃣"],["twice","2️⃣"]]),wheel:U3W.concat(U3T)},
  u3l2:{wordle:W([["usually","👍"],["often","🔁"],["hardly","🤏"],["never","🚫"],["always","💯"]]),wheel:U3W.concat(U3T)},
  u3l3:{wordle:W([["does","❓"],["short","✅"],["answer","💬"],["often","🔁"]]),wheel:ALLV},
  u3l4:{},
 };
 COURSE.units.forEach(u=>u.lessons.forEach(l=>{
  const e=extra[l.id]||{};
  if(e.wordle&&!l.zones.some(z=>z.type==='wordle')) l.zones.push({type:"wordle",label:"Wordle",words:e.wordle});
  if(e.wheel&&!l.zones.some(z=>z.type==='wheel')) l.zones.push({type:"wheel",label:"Fortune Wheel",items:e.wheel});
 }));
})();

/* ---------- Unit tests (final quiz at the end of each unit) ---------- */
COURSE.units[0].lessons.push({id:"u1test",test:true,title:"My Morning — Unit Test",emoji:"📝",intro:"The final test for Unit 1: vocabulary, grammar, mistakes and translation. Get 3 coins to become an Early Bird!",bonus:U1A.concat(U1B),zones:[
 {type:"quiz",label:"Vocabulary test",tag:"UNIT 1 TEST · VOCABULARY",done:"Vocabulary test done! 📝",qs:[
  {q:"'budzić się' =",opts:["wake up","get up","make up"],correct:0},
  {q:"'wyłączyć budzik' =",opts:["turn off the alarm","open the alarm","close the alarm"],correct:0},
  {q:"'ścielić łóżko' =",opts:["make my bed","do my bed","go to bed"],correct:0},
  {q:"'czesać włosy' =",opts:["brush my hair","wash my hair","brush my teeth"],correct:0},
  {q:"🧼 =",opts:["wash my face","have a shower","brush my teeth"],correct:0},
  {q:"🪟 =",opts:["open the curtains","open the door","get dressed"],correct:0},
  {q:"'pakować plecak' =",opts:["pack my bag","put my bag","catch my bag"],correct:0},
  {q:"🧥 =",opts:["put on my coat","put on my shoes","get dressed"],correct:0},
  {q:"'wychodzić z domu' =",opts:["leave home","go home","come home"],correct:0},
  {q:"'spóźnić się' =",opts:["be late","be early","be ready"],correct:0},
  {q:"🚶🏫 =",opts:["walk to school","catch the bus","go home"],correct:0},
  {q:"🧃 =",opts:["drink juice","have breakfast","drink milk"],correct:0},
 ]},
 {type:"quiz",label:"Grammar test",tag:"UNIT 1 TEST · GRAMMAR",done:"Grammar test done! 📝",qs:[
  {q:"I ___ up at seven.",opts:["get","gets","getting"],correct:0},
  {q:"We have breakfast ___ eight o'clock.",opts:["at","in","on"],correct:0},
  {q:"I have a shower ___ the morning.",opts:["in","at","on"],correct:0},
  {q:"They go to school ___ bus.",opts:["by","with","on"],correct:0},
  {q:"7:30 =",opts:["half past seven","half past eight","seven thirty past"],correct:0},
  {q:"8:15 =",opts:["quarter past eight","quarter to eight","eight quarter"],correct:0},
  {q:"8:45 =",opts:["quarter to nine","quarter past nine","quarter to eight"],correct:0},
  {q:"Which is correct?",opts:["You brush your teeth.","You brushes your teeth.","You brushing your teeth."],correct:0},
 ]},
 {type:"errors",label:"Error hunt",items:[
  {s:"I gets dressed at seven.",wrong:1,ok:"I get dressed at seven."},
  {s:"We leave home on eight o'clock.",wrong:3,ok:"We leave home at eight o'clock."},
  {s:"They catches the bus.",wrong:1,ok:"They catch the bus."},
  {s:"I go to school with bus.",wrong:4,ok:"I go to school by bus."},
 ]},
 {type:"typed",label:"Translation",tag:"UNIT 1 TEST · TRANSLATION",title:"Translate ✍️",blocks:[{id:"ut1",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
  {prompt:"Wstaję o wpół do ósmej.",answers:["I get up at half past seven"]},
  {prompt:"Myję twarz i zęby.",answers:["I wash my face and brush my teeth","I wash my face and I brush my teeth"]},
  {prompt:"Zakładam buty i kurtkę.",answers:["I put on my shoes and my coat","I put on my shoes and coat"]},
  {prompt:"Chodzimy do szkoły pieszo.",answers:["We walk to school"]},
  {prompt:"Nie spóźnij się!",answers:["Don't be late","Do not be late"]},
 ]}]},
]});
COURSE.units[1].lessons.push({id:"u2test",test:true,title:"After School — Unit Test",emoji:"📝",intro:"The final test for Unit 2: afternoon & evening words, he/she/it, mistakes and translation. Get 3 coins to become a Busy Bee!",bonus:U2A.concat(U2B),zones:[
 {type:"quiz",label:"Vocabulary test",tag:"UNIT 2 TEST · VOCABULARY",done:"Vocabulary test done! 📝",qs:[
  {q:"'odrabiać lekcje' =",opts:["do homework","make homework","play homework"],correct:0},
  {q:"'wyprowadzać psa' =",opts:["walk the dog","run the dog","take the dog"],correct:0},
  {q:"🎹 =",opts:["practise the piano","listen to music","play football"],correct:0},
  {q:"🚲 =",opts:["ride my bike","drive my bike","go my bike"],correct:0},
  {q:"'chodzić na basen' =",opts:["go swimming","go swim","do swimming"],correct:0},
  {q:"'zmywać naczynia' =",opts:["wash the dishes","cook the dishes","clean the dinner"],correct:0},
  {q:"🛁 =",opts:["take a bath","have a shower","wash my face"],correct:0},
  {q:"'pomagać mamie' =",opts:["help my mum","meet my mum","call my mum"],correct:0},
  {q:"🎧 =",opts:["listen to music","watch TV","read a book"],correct:0},
  {q:"👘🌙 =",opts:["put on my pyjamas","get dressed","put on my coat"],correct:0},
  {q:"'wracać do domu' =",opts:["come home","leave home","go out"],correct:0},
  {q:"🍳 =",opts:["cook dinner","have dinner","wash the dishes"],correct:0},
 ]},
 {type:"quiz",label:"Grammar test",tag:"UNIT 2 TEST · GRAMMAR",done:"Grammar test done! 📝",qs:[
  {q:"She ___ football on Fridays.",opts:["plays","play","playes"],correct:0},
  {q:"He ___ TV after dinner.",opts:["watches","watchs","watch"],correct:0},
  {q:"My mum ___ dinner.",opts:["cooks","cook","cookes"],correct:0},
  {q:"Tom ___ his homework.",opts:["does","dos","do"],correct:0},
  {q:"She ___ a bath every evening.",opts:["takes","take","takees"],correct:0},
  {q:"Dad ___ the dishes.",opts:["washes","washs","wash"],correct:0},
  {q:"It ___ cold in winter.",opts:["is","are","am"],correct:0},
  {q:"Which is correct?",opts:["Mia has lunch at one.","Mia haves lunch at one.","Mia have lunch at one."],correct:0},
 ]},
 {type:"errors",label:"Error hunt",items:[
  {s:"She walk the dog every day.",wrong:1,ok:"She walks the dog every day."},
  {s:"He haves dinner at seven.",wrong:1,ok:"He has dinner at seven."},
  {s:"My brother gos swimming.",wrong:2,ok:"My brother goes swimming."},
  {s:"Tom watchs TV.",wrong:1,ok:"Tom watches TV."},
 ]},
 {type:"typed",label:"Translation",tag:"UNIT 2 TEST · TRANSLATION",title:"Translate ✍️",blocks:[{id:"ut2",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
  {prompt:"On odrabia lekcje po szkole.",answers:["He does his homework after school","He does homework after school"]},
  {prompt:"Ona jeździ na rowerze.",answers:["She rides her bike","She rides a bike"]},
  {prompt:"Mama gotuje kolację.",answers:["Mum cooks dinner","My mum cooks dinner","Mom cooks dinner"]},
  {prompt:"Tata zmywa naczynia.",answers:["Dad washes the dishes","My dad washes the dishes"]},
  {prompt:"Ona idzie spać o dziesiątej.",answers:["She goes to bed at ten","She goes to bed at 10"]},
 ]}]},
]});
COURSE.units[2].lessons.push({id:"u3test",test:true,title:"How Often? — Unit Test",emoji:"📝",intro:"The final test for Unit 3: how often, word order, do/does and translation. Get 3 coins to become a Routine Star!",bonus:U3W.concat(U3T),zones:[
 {type:"quiz",label:"Vocabulary test",tag:"UNIT 3 TEST · VOCABULARY",done:"Vocabulary test done! 📝",qs:[
  {q:"100% =",opts:["always","usually","often"],correct:0},
  {q:"80% =",opts:["usually","sometimes","always"],correct:0},
  {q:"60% =",opts:["often","never","always"],correct:0},
  {q:"40% =",opts:["sometimes","usually","hardly ever"],correct:0},
  {q:"5% =",opts:["hardly ever","sometimes","never"],correct:0},
  {q:"0% =",opts:["never","hardly ever","sometimes"],correct:0},
  {q:"'codziennie' =",opts:["every day","all day","one day"],correct:0},
  {q:"'dwa razy w tygodniu' =",opts:["twice a week","two a week","second week"],correct:0},
  {q:"'w poniedziałki' =",opts:["on Mondays","in Mondays","at Mondays"],correct:0},
  {q:"'raz w tygodniu' =",opts:["once a week","one a week","once week"],correct:0},
 ]},
 {type:"quiz",label:"Grammar test",tag:"UNIT 3 TEST · GRAMMAR",done:"Grammar test done! 📝",qs:[
  {q:"Which is correct?",opts:["I usually get up at seven.","I get usually up at seven.","Usually I get up usually."],correct:0},
  {q:"Which is correct?",opts:["She is always happy.","She always is happy.","Always she is happy."],correct:0},
  {q:"___ you walk the dog?",opts:["Do","Does","Are"],correct:0},
  {q:"___ he play the piano?",opts:["Does","Do","Is"],correct:0},
  {q:"She ___ watch TV.",opts:["doesn't","don't","isn't"],correct:0},
  {q:"Does she cook dinner? (✅)",opts:["Yes, she does.","Yes, she do.","Yes, she cooks."],correct:0},
  {q:"Do they go swimming? (❌)",opts:["No, they don't.","No, they doesn't.","No, they aren't."],correct:0},
  {q:"Does he ___ football?",opts:["play","plays","playing"],correct:0},
  {q:"How often ___ Mia read?",opts:["does","do","is"],correct:0},
  {q:"Which is correct?",opts:["We play football twice a week.","We twice a week play football.","We play twice football a week."],correct:0},
 ]},
 {type:"errors",label:"Error hunt",items:[
  {s:"He watches never TV.",wrong:2,ok:"He never watches TV."},
  {s:"Does she plays the piano?",wrong:2,ok:"Does she play the piano?"},
  {s:"I doesn't like Mondays.",wrong:1,ok:"I don't like Mondays."},
  {s:"We go swimming two a week.",wrong:3,ok:"We go swimming twice a week."},
 ]},
 {type:"typed",label:"Translation",tag:"UNIT 3 TEST · TRANSLATION",title:"Translate ✍️",blocks:[{id:"ut3",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
  {prompt:"Zawsze myję zęby.",answers:["I always brush my teeth"]},
  {prompt:"Ona nigdy się nie spóźnia.",answers:["She is never late"]},
  {prompt:"Czy on chodzi na basen?",answers:["Does he go swimming"]},
  {prompt:"Nie oglądamy telewizji.",answers:["We don't watch TV","We do not watch TV","We don't watch television"]},
  {prompt:"Jak często czytasz książki?",answers:["How often do you read books","How often do you read"]},
 ]}]},
]});



/* ================= A0 · STARTER — Hello! ================= */
const A0G=[
 {en:"hello",pl:"cześć / dzień dobry",emoji:"👋"},{en:"hi",pl:"cześć",emoji:"🙋"},
 {en:"goodbye",pl:"do widzenia",emoji:"🖐️"},{en:"bye",pl:"pa",emoji:"👋"},
 {en:"good morning",pl:"dzień dobry (rano)",emoji:"🌅"},{en:"good night",pl:"dobranoc",emoji:"🌙"},
 {en:"please",pl:"proszę",emoji:"🙏"},{en:"thank you",pl:"dziękuję",emoji:"💛"},
 {en:"yes",pl:"tak",emoji:"✅"},{en:"no",pl:"nie",emoji:"❌"},
];
const A0N=[
 {en:"one",pl:"jeden",emoji:"1️⃣"},{en:"two",pl:"dwa",emoji:"2️⃣"},{en:"three",pl:"trzy",emoji:"3️⃣"},
 {en:"four",pl:"cztery",emoji:"4️⃣"},{en:"five",pl:"pięć",emoji:"5️⃣"},{en:"six",pl:"sześć",emoji:"6️⃣"},
 {en:"seven",pl:"siedem",emoji:"7️⃣"},{en:"eight",pl:"osiem",emoji:"8️⃣"},{en:"nine",pl:"dziewięć",emoji:"9️⃣"},
 {en:"ten",pl:"dziesięć",emoji:"🔟"},{en:"eleven",pl:"jedenaście",emoji:"⚽"},{en:"twelve",pl:"dwanaście",emoji:"🕛"},
 {en:"fifteen",pl:"piętnaście",emoji:"🎂"},{en:"twenty",pl:"dwadzieścia",emoji:"💯"},
];
const A0C=[
 {en:"red",pl:"czerwony",emoji:"🔴"},{en:"blue",pl:"niebieski",emoji:"🔵"},{en:"green",pl:"zielony",emoji:"🟢"},
 {en:"yellow",pl:"żółty",emoji:"🟡"},{en:"orange",pl:"pomarańczowy",emoji:"🟠"},{en:"purple",pl:"fioletowy",emoji:"🟣"},
 {en:"black",pl:"czarny",emoji:"⚫"},{en:"white",pl:"biały",emoji:"⚪"},{en:"brown",pl:"brązowy",emoji:"🟤"},
 {en:"pink",pl:"różowy",emoji:"🌸"},
];
const A0F=[
 {en:"mum",pl:"mama",emoji:"👩"},{en:"dad",pl:"tata",emoji:"👨"},{en:"sister",pl:"siostra",emoji:"👧"},
 {en:"brother",pl:"brat",emoji:"👦"},{en:"grandma",pl:"babcia",emoji:"👵"},{en:"grandpa",pl:"dziadek",emoji:"👴"},
 {en:"baby",pl:"dziecko (niemowlę)",emoji:"👶"},{en:"aunt",pl:"ciocia",emoji:"👩‍🦰"},{en:"uncle",pl:"wujek",emoji:"🧔"},
 {en:"cousin",pl:"kuzyn / kuzynka",emoji:"🧒"},
];
const WL=(arr)=>arr.map(([word,emoji])=>({word,emoji}));
COURSE.units.push({id:"a0",level:"A0",topic:"Hello!",title:"Hello!",emoji:"👋",badge:"First Steps",sub:"Greetings, numbers, colours and family.",lessons:[
 {id:"a0l1",title:"Hello & goodbye",emoji:"👋",intro:"Your very first English words: hello, goodbye, please, thank you…",bonus:A0G,zones:[
  {type:"cards",label:"Words",title:"Hello!",cards:A0G},
  {type:"find",label:"Find it",cards:A0G,rounds:10,title:"Which word is it? 🔎"},
  {type:"listen",label:"Listen",items:[
   {word:"Hello!",options:["Hello!","Yellow!","Hollow!"],correct:0},
   {word:"Thank you.",options:["Thank you.","Thank who?","Thanks two."],correct:0},
   {word:"Good morning!",options:["Good morning!","Good evening!","Good night!"],correct:0},
   {word:"Goodbye!",options:["Goodbye!","Good boy!","Good buy!"],correct:0},
   {word:"Please.",options:["Please.","Peas.","Place."],correct:0},
   {word:"Good night!",options:["Good night!","Good light!","Good morning!"],correct:0},
  ]},
  {type:"match",label:"Match",pairs:A0G},
  {type:"tf",label:"Hello or bye?",title:"Hello or goodbye?",sub:"Is it a word for meeting someone (👋 hello) or leaving (🖐️ goodbye)?",tag:"SORT IT",labels:["👋 Hello","🖐️ Goodbye"],items:[
   {text:"hi",answer:0},{text:"bye",answer:1},{text:"good morning",answer:0},{text:"see you",answer:1},{text:"hello",answer:0},{text:"good night",answer:1},
  ]},
  {type:"memory",label:"Memory",pairs:memOf(A0G.slice(0,8))},
  {type:"spell",label:"Spell it",words:WL([["hello","👋"],["bye","🖐️"],["please","🙏"],["yes","✅"],["no","❌"],["thank","💛"],["morning","🌅"],["night","🌙"]])},
  {type:"wordle",label:"Wordle",words:WL([["hello","👋"],["please","🙏"],["night","🌙"],["thank","💛"]])},
  {type:"wheel",label:"Fortune Wheel",items:A0G},
 ]},
 {id:"a0l2",title:"Numbers 1–20",emoji:"🔢",intro:"Count with Leo! One, two, three… all the way to twenty.",bonus:A0N,zones:[
  {type:"cards",label:"Numbers",title:"Numbers",cards:A0N},
  {type:"find",label:"Find it",cards:A0N,rounds:10,title:"Which number is it? 🔎"},
  {type:"balloon",label:"Balloon Pop",cards:A0N,rounds:10},
  {type:"quiz",label:"Maths",tag:"MATHS IN ENGLISH",qs:[
   {q:"two + three =",opts:["five","four","six"],correct:0},
   {q:"ten − one =",opts:["nine","eight","eleven"],correct:0},
   {q:"six + six =",opts:["twelve","eleven","ten"],correct:0},
   {q:"four + four =",opts:["eight","nine","seven"],correct:0},
   {q:"twenty − five =",opts:["fifteen","fifty","five"],correct:0},
   {q:"seven + three =",opts:["ten","eleven","nine"],correct:0},
   {q:"one + one =",opts:["two","one","three"],correct:0},
   {q:"ten + ten =",opts:["twenty","twelve","eleven"],correct:0},
  ]},
  {type:"listen",label:"Listen",items:[
   {word:"three",options:["3","13","30"],correct:0},{word:"thirteen",options:["13","30","3"],correct:0},
   {word:"twelve",options:["12","20","2"],correct:0},{word:"eight",options:["8","18","80"],correct:0},
   {word:"fifteen",options:["15","50","5"],correct:0},{word:"twenty",options:["20","12","2"],correct:0},
  ]},
  {type:"spell",label:"Spell it",words:WL([["one","1️⃣"],["two","2️⃣"],["three","3️⃣"],["four","4️⃣"],["five","5️⃣"],["six","6️⃣"],["seven","7️⃣"],["ten","🔟"]])},
  {type:"wordle",label:"Wordle",words:WL([["three","3️⃣"],["seven","7️⃣"],["eight","8️⃣"],["twelve","🕛"],["twenty","💯"]])},
  {type:"wheel",label:"Fortune Wheel",items:A0N.slice(0,10)},
 ]},
 {id:"a0l3",title:"Colours",emoji:"🎨",intro:"Red, blue, green… ten colours to paint your world.",bonus:A0C,zones:[
  {type:"cards",label:"Colours",title:"Colours",cards:A0C},
  {type:"find",label:"Find it",cards:A0C,rounds:10,title:"Which colour is it? 🔎"},
  {type:"quiz",label:"What colour?",tag:"WHAT COLOUR IS IT?",qs:[
   {q:"🍌 is…",opts:["yellow","blue","black"],correct:0},{q:"🍅 is…",opts:["red","green","white"],correct:0},
   {q:"🐸 is…",opts:["green","pink","brown"],correct:0},{q:"🐻 is…",opts:["brown","purple","yellow"],correct:0},
   {q:"🍊 is…",opts:["orange","blue","black"],correct:0},{q:"❄️ is…",opts:["white","red","green"],correct:0},
   {q:"🍇 is…",opts:["purple","yellow","orange"],correct:0},{q:"🐷 is…",opts:["pink","green","blue"],correct:0},
  ]},
  {type:"balloon",label:"Balloon Pop",cards:A0C,rounds:10},
  {type:"match",label:"Match",pairs:A0C},
  {type:"memory",label:"Memory",pairs:memOf(A0C.slice(0,8))},
  {type:"spell",label:"Spell it",words:WL([["red","🔴"],["blue","🔵"],["green","🟢"],["pink","🌸"],["black","⚫"],["white","⚪"],["brown","🟤"],["yellow","🟡"]])},
  {type:"wordle",label:"Wordle",words:WL([["green","🟢"],["black","⚫"],["white","⚪"],["brown","🟤"],["purple","🟣"]])},
  {type:"wheel",label:"Fortune Wheel",items:A0C},
 ]},
 {id:"a0l4",title:"My family",emoji:"👨‍👩‍👧",intro:"Mum, dad, sister, brother… and 'This is my…'.",bonus:A0F,zones:[
  {type:"cards",label:"Family",title:"My family",cards:A0F},
  {type:"grammar",label:"This is my…",title:"This is my… / I'm…",html:TBL(["English","Polski"],[["<b>This is my</b> mum.","To jest moja mama."],["<b>This is my</b> brother.","To jest mój brat."],["<b>I'm</b> Leo.","Jestem Leo."],["<b>I'm</b> eight.","Mam osiem lat."],["<b>My name is</b> Ola.","Mam na imię Ola."]])},
  {type:"find",label:"Find it",cards:A0F,rounds:10,title:"Who is it? 🔎"},
  {type:"fill",label:"Fill it",tag:"THIS IS MY…",items:[
   {before:"This is my",blank:"mum",after:".",bank:["mum","dad","baby"],emoji:"👩"},
   {before:"This",blank:"is",after:"my dad.",bank:["is","am","are"],emoji:"👨"},
   {before:"",blank:"I'm",after:"Leo.",bank:["I'm","My","This"],emoji:"🦸"},
   {before:"My",blank:"name",after:"is Ola.",bank:["name","is","am"],emoji:"👧"},
   {before:"This is my",blank:"grandma",after:".",bank:["grandma","grandpa","uncle"],emoji:"👵"},
   {before:"This is",blank:"my",after:"brother.",bank:["my","I","me"],emoji:"👦"},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"This is my sister.",pl:"To jest moja siostra."},{s:"I'm Leo.",pl:"Jestem Leo."},
   {s:"My name is Tom.",pl:"Mam na imię Tom."},{s:"This is my grandpa.",pl:"To jest mój dziadek."},
   {s:"I'm eight.",pl:"Mam osiem lat."},
  ]},
  {type:"memory",label:"Memory",pairs:memOf(A0F.slice(0,8))},
  {type:"wordle",label:"Wordle",words:WL([["sister","👧"],["uncle","🧔"],["baby","👶"],["cousin","🧒"]])},
  {type:"wheel",label:"Fortune Wheel",items:A0F},
 ]},
 {id:"a0test",test:true,title:"A0 Unit Test",emoji:"📝",intro:"The final test for the Starter unit: greetings, numbers, colours and family.",bonus:A0G.concat(A0C,A0F),zones:[
  {type:"quiz",label:"Vocabulary test",tag:"A0 TEST · VOCABULARY",done:"Vocabulary test done! 📝",qs:[
   {q:"'dziękuję' =",opts:["thank you","please","sorry"],correct:0},{q:"🌙 =",opts:["good night","good morning","hello"],correct:0},
   {q:"7 =",opts:["seven","eleven","six"],correct:0},{q:"15 =",opts:["fifteen","fifty","five"],correct:0},
   {q:"12 =",opts:["twelve","twenty","two"],correct:0},{q:"🟢 =",opts:["green","grey","blue"],correct:0},
   {q:"🟣 =",opts:["purple","pink","brown"],correct:0},{q:"'babcia' =",opts:["grandma","aunt","mum"],correct:0},
   {q:"'wujek' =",opts:["uncle","cousin","brother"],correct:0},{q:"'proszę' =",opts:["please","yes","bye"],correct:0},
  ]},
  {type:"quiz",label:"Grammar test",tag:"A0 TEST · GRAMMAR",done:"Grammar test done! 📝",qs:[
   {q:"This ___ my dad.",opts:["is","am","are"],correct:0},{q:"___ Leo.",opts:["I'm","I","My"],correct:0},
   {q:"My ___ is Ola.",opts:["name","is","I'm"],correct:0},{q:"This is ___ brother.",opts:["my","I","me"],correct:0},
   {q:"Answer: 'Hello!' →",opts:["Hi!","Goodbye!","Good night!"],correct:0},{q:"Answer: 'Thank you!' →",opts:["You're welcome!","Please!","No!"],correct:0},
  ]},
  {type:"typed",label:"Translation",tag:"A0 TEST · TRANSLATION",title:"Translate ✍️",blocks:[{id:"ut0",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"To jest moja mama.",answers:["This is my mum","This is my mom"]},{prompt:"Jestem Leo.",answers:["I'm Leo","I am Leo"]},
   {prompt:"dziesięć",answers:["ten"]},{prompt:"czerwony",answers:["red"]},{prompt:"Dzień dobry! (rano)",answers:["Good morning"]},
  ]}]},
 ]},
]});

/* ================= B1 · INTERMEDIATE — Jobs & Work ================= */
const B1J=[
 {en:"nurse",pl:"pielęgniarka / pielęgniarz",emoji:"🧑‍⚕️"},{en:"engineer",pl:"inżynier",emoji:"👷"},
 {en:"lawyer",pl:"prawnik",emoji:"⚖️"},{en:"accountant",pl:"księgowy",emoji:"🧮"},
 {en:"plumber",pl:"hydraulik",emoji:"🔧"},{en:"journalist",pl:"dziennikarz",emoji:"📰"},
 {en:"pilot",pl:"pilot",emoji:"🧑‍✈️"},{en:"chef",pl:"szef kuchni",emoji:"🧑‍🍳"},
 {en:"vet",pl:"weterynarz",emoji:"🐾"},{en:"software developer",pl:"programista",emoji:"💻"},
 {en:"hairdresser",pl:"fryzjer",emoji:"💇"},{en:"firefighter",pl:"strażak",emoji:"🧑‍🚒"},
];
const B1W=[
 {en:"apply for a job",pl:"ubiegać się o pracę",emoji:"📨"},{en:"CV",pl:"CV, życiorys",emoji:"📄"},
 {en:"job interview",pl:"rozmowa kwalifikacyjna",emoji:"🤝"},{en:"salary",pl:"pensja",emoji:"💰"},
 {en:"full-time",pl:"na pełen etat",emoji:"🕘"},{en:"part-time",pl:"na część etatu",emoji:"⏱️"},
 {en:"work overtime",pl:"pracować po godzinach",emoji:"🌃"},{en:"get promoted",pl:"dostać awans",emoji:"📈"},
 {en:"colleague",pl:"współpracownik",emoji:"👥"},{en:"boss",pl:"szef",emoji:"🧑‍💼"},
 {en:"deadline",pl:"termin (ostateczny)",emoji:"⏰"},{en:"quit",pl:"rzucić (pracę)",emoji:"🚪"},
];
COURSE.units.push({id:"b1",level:"B1",topic:"Jobs & Work",title:"Jobs & Work",emoji:"💼",badge:"Career Pro",sub:"Jobs, applying for work, Present Perfect and a job interview.",lessons:[
 {id:"b1l1",title:"What do you do?",emoji:"🧑‍🔧",intro:"Twelve jobs — and how to describe what people do at work.",bonus:B1J,zones:[
  {type:"cards",label:"Jobs",title:"Jobs",cards:B1J},
  {type:"find",label:"Find it",cards:B1J,rounds:10,title:"Which job is it? 🔎"},
  {type:"quiz",label:"Who am I?",tag:"WHO AM I?",qs:[
   {q:"I look after sick animals.",opts:["vet","nurse","chef"],correct:0},
   {q:"I fix pipes and taps.",opts:["plumber","engineer","pilot"],correct:0},
   {q:"I write articles for a newspaper.",opts:["journalist","lawyer","accountant"],correct:0},
   {q:"I help people in court.",opts:["lawyer","firefighter","hairdresser"],correct:0},
   {q:"I write code and build apps.",opts:["software developer","accountant","journalist"],correct:0},
   {q:"I cut and style hair.",opts:["hairdresser","chef","nurse"],correct:0},
   {q:"I look after a company's money.",opts:["accountant","pilot","plumber"],correct:0},
   {q:"I fly planes.",opts:["pilot","engineer","vet"],correct:0},
  ]},
  {type:"match",label:"Match",pairs:B1J.slice(0,10)},
  {type:"spell",label:"Spell it",words:WL([["nurse","🧑‍⚕️"],["lawyer","⚖️"],["plumber","🔧"],["pilot","🧑‍✈️"],["chef","🧑‍🍳"],["engineer","👷"],["journalist","📰"]])},
  {type:"odd",label:"Odd one out",items:[
   {opts:["nurse","vet","doctor","plumber"],odd:3,why:"A plumber doesn't work in health care."},
   {opts:["chef","waiter","pilot","cook"],odd:2,why:"A pilot doesn't work in a restaurant."},
   {opts:["lawyer","judge","accountant","firefighter"],odd:3,why:"A firefighter isn't an office or court job."},
   {opts:["salary","boss","colleague","hairdresser"],odd:3,why:"A hairdresser is a job; the others are workplace words."},
  ]},
  {type:"wordle",label:"Wordle",words:WL([["nurse","🧑‍⚕️"],["pilot","🧑‍✈️"],["lawyer","⚖️"],["plumber","🔧"]])},
  {type:"wheel",label:"Fortune Wheel",items:B1J},
 ]},
 {id:"b1l2",title:"Getting a job",emoji:"📨",intro:"CVs, interviews, salary, overtime, promotion — the language of work.",bonus:B1W,zones:[
  {type:"cards",label:"Words",title:"The world of work",cards:B1W},
  {type:"find",label:"Find it",cards:B1W,rounds:10,title:"Which phrase is it? 🔎"},
  {type:"fill",label:"Fill it",tag:"WORK COLLOCATIONS",items:[
   {before:"I want to",blank:"apply",after:"for this job.",bank:["apply","ask","make"],emoji:"📨"},
   {before:"Please send us your",blank:"CV",after:"by Friday.",bank:["CV","salary","boss"],emoji:"📄"},
   {before:"She works",blank:"part-time",after:"— only mornings.",bank:["part-time","overtime","full-time"],emoji:"⏱️"},
   {before:"He often works",blank:"overtime",after:"to finish projects.",bank:["overtime","part-time","deadline"],emoji:"🌃"},
   {before:"The",blank:"deadline",after:"for the report is Monday.",bank:["deadline","salary","colleague"],emoji:"⏰"},
   {before:"After two years she got",blank:"promoted",after:".",bank:["promoted","applied","quit"],emoji:"📈"},
   {before:"My",blank:"colleagues",after:"are really friendly.",bank:["colleagues","bosses","salaries"],emoji:"👥"},
   {before:"He decided to",blank:"quit",after:"his job and travel.",bank:["quit","apply","promote"],emoji:"🚪"},
  ]},
  {type:"match",label:"Match",pairs:B1W.slice(0,10)},
  {type:"tf",label:"True or false?",title:"True or False?",sub:"Read the job advert: 'Café Luna is looking for a part-time waiter (20 hours a week). Experience is useful but not necessary. Salary: £11 an hour. Send your CV to jobs@cafeluna.com by 15 May.'",tag:"JOB ADVERT",items:[
   {text:"The job is full-time.",answer:1},{text:"You must have experience.",answer:1},
   {text:"The job is 20 hours a week.",answer:0},{text:"You send your CV by email.",answer:0},
   {text:"The salary is £11 an hour.",answer:0},{text:"The deadline is 15 June.",answer:1},
  ]},
  {type:"memory",label:"Memory",pairs:memOf(B1W.slice(0,8))},
  {type:"wordle",label:"Wordle",words:WL([["salary","💰"],["boss","🧑‍💼"],["quit","🚪"],["deadline","⏰"]])},
  {type:"wheel",label:"Fortune Wheel",items:B1W},
 ]},
 {id:"b1l3",title:"Have you ever…?",emoji:"✈️",intro:"Present Perfect for experience — and how it's different from the Past Simple.",bonus:B1J.concat(B1W),zones:[
  {type:"grammar",label:"Present Perfect",title:"Present Perfect vs Past Simple",html:`<p><b>Present Perfect</b> = have / has + past participle. We use it for <b>experience</b> (no exact time) and for things that are <b>still true</b>.</p>${TBL(["Present Perfect","Past Simple"],[["I <b>have worked</b> in a café.","I <b>worked</b> in a café <b>last summer</b>."],["She <b>has been</b> to London.","She <b>went</b> to London <b>in 2022</b>."],["<b>Have</b> you <b>ever</b> <b>had</b> a job interview?","<b>Did</b> you <b>have</b> an interview <b>yesterday</b>?"]])}<p style="margin-top:12px;">Present Perfect + <b>ever, never, already, yet, just, for, since</b>.<br>Past Simple + <b>yesterday, last week, in 2020, ago</b>.</p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ I have worked there last year. ✅ I worked there last year.</p>`},
  {type:"quiz",label:"Participles",tag:"PAST PARTICIPLES",qs:[
   {q:"work → have ___",opts:["worked","work","working"],correct:0},{q:"be → have ___",opts:["been","was","being"],correct:0},
   {q:"write → have ___",opts:["written","wrote","writed"],correct:0},{q:"do → have ___",opts:["done","did","doed"],correct:0},
   {q:"see → have ___",opts:["seen","saw","seed"],correct:0},{q:"go → have ___",opts:["gone / been","went","goed"],correct:0},
   {q:"get → have ___",opts:["got","getted","gotten only"],correct:0},{q:"meet → have ___",opts:["met","meeted","meet"],correct:0},
  ]},
  {type:"fill",label:"Fill it",tag:"PERFECT OR PAST?",items:[
   {before:"I",blank:"have never worked",after:"in an office.",bank:["have never worked","never worked yesterday","am never working"],emoji:"🏢"},
   {before:"She",blank:"started",after:"her new job last Monday.",bank:["started","has started","starts"],emoji:"📅"},
   {before:"",blank:"Have",after:"you ever been to a job interview?",bank:["Have","Did","Are"],emoji:"🤝"},
   {before:"He has worked here",blank:"for",after:"five years.",bank:["for","since","ago"],emoji:"⏳"},
   {before:"They have lived in Kraków",blank:"since",after:"2019.",bank:["since","for","ago"],emoji:"🏙️"},
   {before:"I got the job two weeks",blank:"ago",after:".",bank:["ago","since","for"],emoji:"🎉"},
   {before:"Has she finished the report",blank:"yet",after:"?",bank:["yet","already","ago"],emoji:"📊"},
   {before:"I've",blank:"just",after:"sent my CV!",bank:["just","yet","ago"],emoji:"📄"},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"Have you ever worked abroad?",pl:"Czy kiedykolwiek pracowałeś za granicą?"},
   {s:"I have never had a job interview.",pl:"Nigdy nie miałem rozmowy kwalifikacyjnej."},
   {s:"She has worked here since 2020.",pl:"Ona pracuje tu od 2020 roku."},
   {s:"He got promoted last year.",pl:"On dostał awans w zeszłym roku."},
   {s:"We have already finished the project.",pl:"Już skończyliśmy projekt."},
  ]},
  {type:"errors",label:"Find the error",items:[
   {s:"I have worked there last year.",wrong:1,ok:"I worked there last year."},
   {s:"She has been a nurse since five years.",wrong:5,ok:"She has been a nurse for five years."},
   {s:"Did you ever work in a shop?",wrong:0,ok:"Have you ever worked in a shop?"},
   {s:"He has wrote three reports.",wrong:2,ok:"He has written three reports."},
   {s:"I have seen him two days ago.",wrong:1,ok:"I saw him two days ago."},
  ]},
  {type:"whack",label:"Whack-a-Leo",qs:[
   {q:"I ___ to Spain three times.",opts:["have been","was","am"],correct:0},
   {q:"She ___ the company in 2018.",opts:["joined","has joined","joins"],correct:0},
   {q:"___ you finished yet?",opts:["Have","Did","Do"],correct:0},
   {q:"We've known each other ___ years.",opts:["for","since","ago"],correct:0},
   {q:"They ___ the email yesterday.",opts:["sent","have sent","send"],correct:0},
  ]},
  {type:"wordle",label:"Wordle",words:WL([["since","⏳"],["ever","❓"],["never","🚫"],["already","✅"]])},
  {type:"wheel",label:"Fortune Wheel",items:B1W},
 ]},
 {id:"b1l4",title:"The interview",emoji:"🤝",intro:"Read about Zofia's first job interview, then answer, write and translate.",bonus:B1J.concat(B1W),zones:[
  {type:"reading",label:"Story",title:"Zofia's First Interview",paras:[
   "<b>Zofia's First Interview</b>",
   "Zofia is nineteen and she has never had a real job. Last month she saw an advert for a part-time assistant at a small design studio, so she updated her CV and applied.",
   "Three days later the studio called her. 'We'd like to invite you to an interview on Thursday,' said a friendly voice. Zofia was excited — and terrified.",
   "On Thursday she arrived fifteen minutes early. The boss, Mr Adams, asked her lots of questions. 'Have you ever worked in a team?' 'Yes — I've organised two school festivals,' she answered. 'What are your weaknesses?' Zofia smiled: 'I sometimes work too long on details, but I always meet deadlines.'",
   "On Monday she got an email. She has got the job! She starts next week, and her colleagues have already sent her a welcome message.",
  ]},
  {type:"tf",label:"True/False/NG",title:"True, False or Not given?",sub:"Not given = the story doesn't say.",tag:"READING CHECK",labels:TF3,items:[
   {text:"Zofia has had many jobs before.",answer:1},{text:"The job is part-time.",answer:0},
   {text:"The interview was on Friday.",answer:1},{text:"Zofia arrived late.",answer:1},
   {text:"Mr Adams has worked at the studio for ten years.",answer:2},{text:"Zofia has organised school festivals.",answer:0},
   {text:"Zofia got the job.",answer:0},
  ]},
  {type:"quiz",label:"Questions",tag:"READ AGAIN",qs:[
   {q:"How did Zofia find the job?",opts:["She saw an advert","Her friend told her","Mr Adams called her first"],correct:0},
   {q:"How did Zofia feel before the interview?",opts:["Excited and terrified","Bored","Angry"],correct:0},
   {q:"What is Zofia's 'weakness'?",opts:["She works too long on details","She is always late","She doesn't like teams"],correct:0},
   {q:"How did she get the answer?",opts:["By email","By phone","In a letter"],correct:0},
   {q:"'meet deadlines' means…",opts:["finish work on time","meet your boss","have a meeting"],correct:0},
  ]},
  {type:"typed",label:"Translation",blocks:[{id:"b14",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"Nigdy nie pracowałem w biurze.",answers:["I have never worked in an office","I've never worked in an office"]},
   {prompt:"Czy kiedykolwiek miałeś rozmowę kwalifikacyjną?",answers:["Have you ever had a job interview"]},
   {prompt:"Ona dostała awans w zeszłym roku.",answers:["She got promoted last year","She was promoted last year"]},
   {prompt:"Pracuję tu od trzech lat.",answers:["I have worked here for three years","I've worked here for three years","I have been working here for three years","I've been working here for three years"]},
  ]}]},
  {type:"writing",label:"Cover letter",title:"Your cover letter ✍️",sub:"Write a short email applying for the job at Café Luna (min. 60 words). Use the Present Perfect at least twice!",starters:["Dear Sir or Madam,","I am writing to apply for…","I have worked / I have never…","I have experience in…","I am available…","Yours faithfully,"],min:60},
  {type:"wordle",label:"Wordle",words:WL([["advert","📰"],["studio","🎨"],["team","👥"],["email","📧"]])},
  {type:"wheel",label:"Fortune Wheel",items:B1J.concat(B1W)},
 ]},
 {id:"b1test",test:true,title:"B1 Unit Test",emoji:"📝",intro:"The final test for Jobs & Work: vocabulary, Present Perfect vs Past Simple, mistakes and translation.",bonus:B1J.concat(B1W),zones:[
  {type:"quiz",label:"Vocabulary test",tag:"B1 TEST · VOCABULARY",done:"Vocabulary test done! 📝",qs:[
   {q:"'księgowy' =",opts:["accountant","lawyer","engineer"],correct:0},{q:"'pensja' =",opts:["salary","deadline","CV"],correct:0},
   {q:"'dostać awans' =",opts:["get promoted","get fired","get applied"],correct:0},{q:"'współpracownik' =",opts:["colleague","boss","client"],correct:0},
   {q:"Someone who fixes taps:",opts:["plumber","pilot","vet"],correct:0},{q:"'pracować po godzinach' =",opts:["work overtime","work part-time","work over"],correct:0},
   {q:"You ___ for a job.",opts:["apply","ask","make"],correct:0},{q:"'rzucić pracę' =",opts:["quit your job","throw your job","leave off"],correct:0},
   {q:"20 hours a week =",opts:["part-time","full-time","overtime"],correct:0},{q:"'termin' (work) =",opts:["deadline","dateline","timeline"],correct:0},
  ]},
  {type:"quiz",label:"Grammar test",tag:"B1 TEST · GRAMMAR",done:"Grammar test done! 📝",qs:[
   {q:"I ___ in London in 2021.",opts:["worked","have worked","work"],correct:0},
   {q:"She ___ never ___ abroad.",opts:["has / been","did / be","is / been"],correct:0},
   {q:"We have known him ___ 2015.",opts:["since","for","ago"],correct:0},
   {q:"___ you ever eaten sushi?",opts:["Have","Did","Are"],correct:0},
   {q:"They left an hour ___.",opts:["ago","since","for"],correct:0},
   {q:"I haven't finished ___.",opts:["yet","already","ago"],correct:0},
   {q:"write → have ___",opts:["written","wrote","writed"],correct:0},
   {q:"He ___ just ___ the email.",opts:["has / sent","did / send","is / sent"],correct:0},
  ]},
  {type:"errors",label:"Error hunt",items:[
   {s:"I have met her last week.",wrong:1,ok:"I met her last week."},
   {s:"She works here since 2019.",wrong:1,ok:"She has worked here since 2019."},
   {s:"Have you ever went to Paris?",wrong:3,ok:"Have you ever been to Paris?"},
   {s:"He has been a pilot since ten years.",wrong:5,ok:"He has been a pilot for ten years."},
  ]},
  {type:"typed",label:"Translation",tag:"B1 TEST · TRANSLATION",title:"Translate ✍️",blocks:[{id:"ut4",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"Ona jest pielęgniarką od pięciu lat.",answers:["She has been a nurse for five years","She's been a nurse for five years"]},
   {prompt:"Wysłałem CV wczoraj.",answers:["I sent my CV yesterday","I sent the CV yesterday","I sent a CV yesterday"]},
   {prompt:"Czy już skończyłeś raport?",answers:["Have you finished the report yet","Have you already finished the report"]},
   {prompt:"Nigdy nie byłem w Londynie.",answers:["I have never been to London","I've never been to London"]},
  ]}]},
 ]},
]});

/* ================= B2 · UPPER-INTERMEDIATE — Technology & Media ================= */
const B2M=[
 {en:"go viral",pl:"stać się viralem",emoji:"🚀"},{en:"fake news",pl:"fałszywe wiadomości",emoji:"🤥"},
 {en:"clickbait",pl:"clickbait, przynęta na kliknięcia",emoji:"🎣"},{en:"influencer",pl:"influencer",emoji:"🤳"},
 {en:"follower",pl:"obserwujący",emoji:"👣"},{en:"headline",pl:"nagłówek",emoji:"📰"},
 {en:"source",pl:"źródło",emoji:"🔍"},{en:"biased",pl:"stronniczy",emoji:"⚖️"},
 {en:"reliable",pl:"wiarygodny",emoji:"✅"},{en:"subscribe",pl:"subskrybować",emoji:"🔔"},
 {en:"stream",pl:"transmitować na żywo / streamować",emoji:"📡"},{en:"algorithm",pl:"algorytm",emoji:"🧠"},
];
const B2T=[
 {en:"screen time",pl:"czas przed ekranem",emoji:"📱"},{en:"data privacy",pl:"prywatność danych",emoji:"🔒"},
 {en:"cyberbullying",pl:"cyberprzemoc",emoji:"😢"},{en:"artificial intelligence",pl:"sztuczna inteligencja",emoji:"🤖"},
 {en:"addicted to",pl:"uzależniony od",emoji:"🔁"},{en:"keep up with",pl:"nadążać za",emoji:"🏃"},
 {en:"log in",pl:"zalogować się",emoji:"🔑"},{en:"back up",pl:"zrobić kopię zapasową",emoji:"💾"},
 {en:"update",pl:"aktualizować",emoji:"🔄"},{en:"device",pl:"urządzenie",emoji:"⌚"},
];
COURSE.units.push({id:"b2",level:"B2",topic:"Technology & Media",title:"Technology & Media",emoji:"📡",badge:"Media Expert",sub:"News, social media, the passive voice and reported speech.",lessons:[
 {id:"b2l1",title:"In the news",emoji:"📰",intro:"Fake news, clickbait, reliable sources — talk about media like a pro.",bonus:B2M,zones:[
  {type:"cards",label:"Words",title:"Media words",cards:B2M},
  {type:"find",label:"Find it",cards:B2M,rounds:10,title:"Which word is it? 🔎"},
  {type:"quiz",label:"Definitions",tag:"WHAT DOES IT MEAN?",qs:[
   {q:"A headline designed only to make you click:",opts:["clickbait","source","follower"],correct:0},
   {q:"When a video spreads very fast online, it…",opts:["goes viral","goes live","goes down"],correct:0},
   {q:"Information you can trust is…",opts:["reliable","biased","fake"],correct:0},
   {q:"A report that supports only one side is…",opts:["biased","reliable","viral"],correct:0},
   {q:"Where information comes from:",opts:["source","stream","headline"],correct:0},
   {q:"The system that decides what you see in your feed:",opts:["algorithm","influencer","subscriber"],correct:0},
   {q:"Someone who earns money by promoting products online:",opts:["influencer","journalist","follower"],correct:0},
   {q:"To get every new video from a channel, you…",opts:["subscribe","stream","update"],correct:0},
  ]},
  {type:"match",label:"Match",pairs:B2M.slice(0,10)},
  {type:"fill",label:"Fill it",tag:"MEDIA COLLOCATIONS",items:[
   {before:"Always check the",blank:"source",after:"before you share a story.",bank:["source","headline","follower"],emoji:"🔍"},
   {before:"Her dance video",blank:"went",after:"viral overnight.",bank:["went","got","made"],emoji:"🚀"},
   {before:"That article is completely",blank:"biased",after:"— it ignores the other side.",bank:["biased","reliable","viral"],emoji:"⚖️"},
   {before:"The",blank:"headline",after:"was shocking, but the article was boring.",bank:["headline","source","stream"],emoji:"📰"},
   {before:"He has two million",blank:"followers",after:"on social media.",bank:["followers","sources","headlines"],emoji:"👣"},
   {before:"Don't fall for",blank:"clickbait",after:".",bank:["clickbait","algorithm","subscribe"],emoji:"🎣"},
  ]},
  {type:"odd",label:"Odd one out",items:[
   {opts:["reliable","trustworthy","accurate","biased"],odd:3,why:"'Biased' is negative; the others describe good information."},
   {opts:["follower","subscriber","viewer","headline"],odd:3,why:"A headline isn't a person."},
   {opts:["stream","post","share","newspaper"],odd:3,why:"'Newspaper' is a noun for print media; the others are online actions."},
   {opts:["fake news","clickbait","rumour","fact"],odd:3,why:"A fact is true; the others can be misleading."},
  ]},
  {type:"wordle",label:"Wordle",words:WL([["viral","🚀"],["source","🔍"],["biased","⚖️"],["stream","📡"]])},
  {type:"wheel",label:"Fortune Wheel",items:B2M},
 ]},
 {id:"b2l2",title:"Life online",emoji:"🌐",intro:"Screen time, privacy, AI, cyberbullying — and phrasal verbs for technology.",bonus:B2T,zones:[
  {type:"cards",label:"Words",title:"Life online",cards:B2T},
  {type:"find",label:"Find it",cards:B2T,rounds:10,title:"Which phrase is it? 🔎"},
  {type:"fill",label:"Fill it",tag:"TECH PHRASES",items:[
   {before:"I think I'm",blank:"addicted",after:"to my phone.",bank:["addicted","attached","added"],emoji:"🔁"},
   {before:"Remember to",blank:"back",after:"up your files.",bank:["back","log","keep"],emoji:"💾"},
   {before:"It's hard to",blank:"keep",after:"up with new technology.",bank:["keep","back","log"],emoji:"🏃"},
   {before:"You need a password to",blank:"log",after:"in.",bank:["log","back","keep"],emoji:"🔑"},
   {before:"Teenagers spend too much",blank:"screen",after:"time on their phones.",bank:["screen","device","data"],emoji:"📱"},
   {before:"Apps should protect our data",blank:"privacy",after:".",bank:["privacy","private","prevent"],emoji:"🔒"},
   {before:"Schools must take",blank:"cyberbullying",after:"seriously.",bank:["cyberbullying","algorithm","updates"],emoji:"😢"},
  ]},
  {type:"match",label:"Match",pairs:B2T},
  {type:"listen",label:"Listen",items:[
   {word:"Have you backed up your files?",options:["Have you backed up your files?","Have you packed up your files?","Have you backed your fails?"],correct:0},
   {word:"She's addicted to social media.",options:["She's addicted to social media.","She's added to social media.","She's admitted to social media."],correct:0},
   {word:"Artificial intelligence is changing everything.",options:["Artificial intelligence is changing everything.","Artificial intelligence is charging everything.","Official intelligence is changing everything."],correct:0},
   {word:"I can't keep up with all the updates.",options:["I can't keep up with all the updates.","I can't keep up with all the dates.","I can keep up with all the updates."],correct:0},
  ]},
  {type:"tf",label:"Agree?",title:"Fact or opinion?",sub:"Is the sentence a fact (you can check it) or an opinion (what someone thinks)?",tag:"FACT OR OPINION",labels:["📊 Fact","💬 Opinion"],items:[
   {text:"Social media is the worst invention ever.",answer:1},{text:"Many apps collect users' location data.",answer:0},
   {text:"AI will make teachers unnecessary.",answer:1},{text:"You can back up files to the cloud.",answer:0},
   {text:"Influencers are bad role models.",answer:1},{text:"Some phones show your daily screen time.",answer:0},
  ]},
  {type:"memory",label:"Memory",pairs:memOf(B2T.slice(0,8))},
  {type:"wordle",label:"Wordle",words:WL([["device","⌚"],["update","🔄"],["privacy","🔒"],["login","🔑"]])},
  {type:"wheel",label:"Fortune Wheel",items:B2T},
 ]},
 {id:"b2l3",title:"It was posted…",emoji:"📢",intro:"The passive voice — perfect for news: 'The video was watched by millions.'",bonus:B2M.concat(B2T),zones:[
  {type:"grammar",label:"Passive voice",title:"The passive voice",html:`<p>We use the <b>passive</b> when the action is more important than who did it — very common in news.</p>${TBL(["Tense","Passive"],[["Present Simple","Millions of photos <b>are uploaded</b> every day."],["Past Simple","The video <b>was watched</b> 5 million times."],["Present Perfect","Your data <b>has been stolen</b>."],["Future","The app <b>will be updated</b> tomorrow."],["Modal","Passwords <b>should be changed</b> regularly."]])}<p style="margin-top:12px;">Form: <b>be</b> (in the right tense) + <b>past participle</b>. Use <b>by</b> for the person: The post was shared <b>by</b> an influencer.</p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ The video was watch by millions. ✅ The video was watched by millions.</p>`},
  {type:"fill",label:"Fill it",tag:"PASSIVE",items:[
   {before:"The story",blank:"was shared",after:"by thousands of people.",bank:["was shared","shared","is sharing"],emoji:"📢"},
   {before:"Millions of messages",blank:"are sent",after:"every minute.",bank:["are sent","send","are sending"],emoji:"✉️"},
   {before:"My account",blank:"has been hacked",after:"!",bank:["has been hacked","has hacked","was hack"],emoji:"🔓"},
   {before:"The new phone",blank:"will be released",after:"next month.",bank:["will be released","will release","is release"],emoji:"📱"},
   {before:"Passwords",blank:"should be changed",after:"regularly.",bank:["should be changed","should change","should changed"],emoji:"🔑"},
   {before:"The article",blank:"was written",after:"by a famous journalist.",bank:["was written","was wrote","written"],emoji:"📰"},
   {before:"This photo",blank:"was taken",after:"in 1969.",bank:["was taken","took","was took"],emoji:"📷"},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"The video was watched by millions.",pl:"Film obejrzały miliony ludzi."},
   {s:"Your data is collected by the app.",pl:"Twoje dane są zbierane przez aplikację."},
   {s:"The website has been updated.",pl:"Strona została zaktualizowana."},
   {s:"The results will be announced tomorrow.",pl:"Wyniki zostaną ogłoszone jutro."},
   {s:"Fake news should be reported.",pl:"Fałszywe wiadomości powinny być zgłaszane."},
  ]},
  {type:"errors",label:"Find the error",items:[
   {s:"The post was share by an influencer.",wrong:3,ok:"The post was shared by an influencer."},
   {s:"My phone was stole yesterday.",wrong:3,ok:"My phone was stolen yesterday."},
   {s:"The app will updated tomorrow.",wrong:3,ok:"The app will be updated tomorrow."},
   {s:"English is speak all over the world.",wrong:2,ok:"English is spoken all over the world."},
   {s:"The film was directed from Nolan.",wrong:4,ok:"The film was directed by Nolan."},
  ]},
  {type:"whack",label:"Whack-a-Leo",qs:[
   {q:"The email ___ yesterday.",opts:["was sent","sent","is sent"],correct:0},
   {q:"Cookies ___ by most websites.",opts:["are used","use","are using"],correct:0},
   {q:"The bug ___ already ___.",opts:["has / been fixed","has / fixed","was / fix"],correct:0},
   {q:"steal → was ___",opts:["stolen","stole","stealed"],correct:0},
   {q:"The winner ___ next week.",opts:["will be announced","will announce","announces"],correct:0},
  ]},
  {type:"typed",label:"Rewrite",blocks:[{id:"b23",label:"🔁 Rewrite in the passive",items:[
   {prompt:"People share millions of photos every day. → Millions of photos…",answers:["Millions of photos are shared every day"]},
   {prompt:"Someone hacked my account. → My account…",answers:["My account was hacked"]},
   {prompt:"They will update the app tomorrow. → The app…",answers:["The app will be updated tomorrow"]},
   {prompt:"A journalist wrote the article. → The article…",answers:["The article was written by a journalist"]},
  ]}]},
  {type:"wordle",label:"Wordle",words:WL([["passive","📢"],["spoken","🗣️"],["written","✍️"],["stolen","🔓"]])},
  {type:"wheel",label:"Fortune Wheel",items:B2M.concat(B2T)},
 ]},
 {id:"b2l4",title:"She said that…",emoji:"💬",intro:"Reported speech — and an article about screen time to read, discuss and write about.",bonus:B2M.concat(B2T),zones:[
  {type:"grammar",label:"Reported speech",title:"Reported speech",html:`<p>When we report what someone said, the tense usually moves <b>one step back</b>.</p>${TBL(["Direct speech","Reported speech"],[["'I <b>am</b> tired.'","She said (that) she <b>was</b> tired."],["'I <b>love</b> this app.'","He said he <b>loved</b> that app."],["'We <b>have finished</b>.'","They said they <b>had finished</b>."],["'I <b>will</b> call you.'","She said she <b>would</b> call me."],["'I <b>can</b> help.'","He said he <b>could</b> help."]])}<p style="margin-top:12px;">Also: today → that day · tomorrow → the next day · here → there · this → that.<br><b>say</b> something · <b>tell</b> somebody something.</p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ She said me that… ✅ She told me that… / She said that…</p>`},
  {type:"quiz",label:"Report it",tag:"REPORTED SPEECH",qs:[
   {q:"'I am busy.' → He said he ___ busy.",opts:["was","is","be"],correct:0},
   {q:"'I will post it.' → She said she ___ post it.",opts:["would","will","was"],correct:0},
   {q:"'We can come.' → They said they ___ come.",opts:["could","can","may"],correct:0},
   {q:"'I have seen it.' → He said he ___ it.",opts:["had seen","has seen","saw"],correct:0},
   {q:"She ___ me she was tired.",opts:["told","said","spoke"],correct:0},
   {q:"He ___ that he loved the show.",opts:["said","told","talked"],correct:0},
   {q:"'tomorrow' becomes…",opts:["the next day","yesterday","today"],correct:0},
   {q:"'I like this video.' → He said he liked ___ video.",opts:["that","this","these"],correct:0},
  ]},
  {type:"reading",label:"Article",title:"Is Screen Time Really So Bad?",paras:[
   "<b>Is Screen Time Really So Bad?</b>",
   "Teenagers today spend an average of seven hours a day looking at screens — and that figure doesn't include homework. Many parents are worried, and headlines regularly warn that a whole generation is 'addicted' to their phones.",
   "But some researchers say the story is more complicated. 'It's not just how long you spend online, it's what you do there,' explains Dr Maya Kerr, who has studied digital habits for ten years. Chatting with friends, learning a language or creating music can be positive. Endless scrolling, on the other hand, is linked to poor sleep and lower mood.",
   "Experts agree on a few simple rules: keep phones out of the bedroom at night, turn off unnecessary notifications and take regular breaks. 'Technology isn't the enemy,' Dr Kerr said in a recent interview. 'We just need to use it on purpose.'",
  ]},
  {type:"tf",label:"True/False/NG",title:"True, False or Not given?",sub:"Not given = the article doesn't say.",tag:"READING CHECK",labels:TF3,items:[
   {text:"Teenagers spend about seven hours a day on screens, not counting homework.",answer:0},
   {text:"All researchers agree that screen time is always harmful.",answer:1},
   {text:"Dr Kerr has studied digital habits for a decade.",answer:0},
   {text:"Endless scrolling is linked to poor sleep.",answer:0},
   {text:"Dr Kerr doesn't own a smartphone.",answer:2},
   {text:"Experts suggest keeping phones in the bedroom at night.",answer:1},
  ]},
  {type:"typed",label:"Report it",blocks:[{id:"b24",label:"💬 Report what they said (start with the words given)",items:[
   {prompt:"'Technology isn't the enemy.' → Dr Kerr said that technology…",answers:["Dr Kerr said that technology wasn't the enemy","Dr Kerr said that technology was not the enemy","technology wasn't the enemy"]},
   {prompt:"'I check my phone every five minutes.' → Tom said he…",answers:["Tom said he checked his phone every five minutes","he checked his phone every five minutes"]},
   {prompt:"'I will delete the app.' → Ola said she…",answers:["Ola said she would delete the app","she would delete the app"]},
  ]}]},
  {type:"writing",label:"Opinion",title:"Your opinion ✍️",sub:"Is screen time really so bad? Write a short opinion paragraph (min. 80 words). Use at least one passive and one reported-speech sentence.",starters:["In my opinion,…","On the one hand,… On the other hand,…","It is often said that…","Dr Kerr said that…","To sum up,…"],min:80},
  {type:"wordle",label:"Wordle",words:WL([["screen","📱"],["scroll","📜"],["habit","🔁"],["sleep","😴"]])},
  {type:"wheel",label:"Fortune Wheel",items:B2M.concat(B2T)},
 ]},
 {id:"b2test",test:true,title:"B2 Unit Test",emoji:"📝",intro:"The final test for Technology & Media: vocabulary, passive voice, reported speech and translation.",bonus:B2M.concat(B2T),zones:[
  {type:"quiz",label:"Vocabulary test",tag:"B2 TEST · VOCABULARY",done:"Vocabulary test done! 📝",qs:[
   {q:"'wiarygodny' =",opts:["reliable","biased","viral"],correct:0},{q:"'stronniczy' =",opts:["biased","reliable","addicted"],correct:0},
   {q:"'źródło' =",opts:["source","sauce","resource only"],correct:0},{q:"'nagłówek' =",opts:["headline","headset","heading off"],correct:0},
   {q:"'zrobić kopię zapasową' =",opts:["back up","log in","keep up"],correct:0},{q:"'nadążać za' =",opts:["keep up with","catch on","log out"],correct:0},
   {q:"'cyberprzemoc' =",opts:["cyberbullying","cyber crime only","clickbait"],correct:0},{q:"A video spreads fast → it…",opts:["goes viral","goes live","goes off"],correct:0},
   {q:"'uzależniony od' =",opts:["addicted to","added to","attached by"],correct:0},{q:"'urządzenie' =",opts:["device","advice","devise"],correct:0},
  ]},
  {type:"quiz",label:"Grammar test",tag:"B2 TEST · GRAMMAR",done:"Grammar test done! 📝",qs:[
   {q:"The photo ___ in 1969.",opts:["was taken","took","was took"],correct:0},
   {q:"Your password ___ changed.",opts:["should be","should","should been"],correct:0},
   {q:"My account ___ hacked!",opts:["has been","has","is being"],correct:0},
   {q:"'I am tired.' → She said she ___ tired.",opts:["was","is","has been"],correct:0},
   {q:"'I will help.' → He said he ___ help.",opts:["would","will","was"],correct:0},
   {q:"She ___ me that she was busy.",opts:["told","said","spoke"],correct:0},
   {q:"'tomorrow' in reported speech →",opts:["the next day","tomorrow's day","the day before"],correct:0},
   {q:"The book ___ by Orwell.",opts:["was written","wrote","was wrote"],correct:0},
  ]},
  {type:"errors",label:"Error hunt",items:[
   {s:"The video was watch by millions.",wrong:3,ok:"The video was watched by millions."},
   {s:"She said me that she was tired.",wrong:1,ok:"She told me that she was tired."},
   {s:"The app will updated next week.",wrong:3,ok:"The app will be updated next week."},
   {s:"He said he will call me.",wrong:3,ok:"He said he would call me."},
  ]},
  {type:"typed",label:"Translation",tag:"B2 TEST · TRANSLATION",title:"Translate ✍️",blocks:[{id:"ut5",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"Film został obejrzany przez miliony ludzi.",answers:["The video was watched by millions of people","The film was watched by millions of people"]},
   {prompt:"Moje konto zostało zhakowane.",answers:["My account has been hacked","My account was hacked"]},
   {prompt:"Powiedziała, że jest zmęczona.",answers:["She said she was tired","She said that she was tired"]},
   {prompt:"Zawsze sprawdzaj źródło.",answers:["Always check the source"]},
  ]}]},
 ]},
]});

/* ================= C1 · ADVANCED — Work–Life Balance ================= */
const C1I=[
 {en:"burn out",pl:"wypalić się",emoji:"🔥"},{en:"juggle",pl:"żonglować (obowiązkami)",emoji:"🤹"},
 {en:"cut corners",pl:"iść na skróty",emoji:"✂️"},{en:"call it a day",pl:"skończyć na dziś",emoji:"🌇"},
 {en:"up to my eyes",pl:"po uszy (w pracy)",emoji:"😵"},{en:"a rat race",pl:"wyścig szczurów",emoji:"🐀"},
 {en:"recharge my batteries",pl:"naładować baterie",emoji:"🔋"},{en:"switch off",pl:"wyłączyć się, odpocząć",emoji:"📴"},
 {en:"go the extra mile",pl:"dać z siebie więcej",emoji:"🏃"},{en:"on the back burner",pl:"odłożony na później",emoji:"🍳"},
 {en:"time-consuming",pl:"czasochłonny",emoji:"⏳"},{en:"flexible hours",pl:"elastyczne godziny",emoji:"🕰️"},
];
const C1V=[
 {en:"wellbeing",pl:"dobrostan",emoji:"🧘"},{en:"productivity",pl:"produktywność",emoji:"📈"},
 {en:"workload",pl:"obciążenie pracą",emoji:"📚"},{en:"remote work",pl:"praca zdalna",emoji:"🏡"},
 {en:"commute",pl:"dojazd do pracy",emoji:"🚆"},{en:"boundaries",pl:"granice",emoji:"🚧"},
 {en:"prioritise",pl:"ustalać priorytety",emoji:"🥇"},{en:"procrastinate",pl:"odkładać na później, zwlekać",emoji:"🦥"},
 {en:"sustainable",pl:"zrównoważony, do utrzymania",emoji:"♻️"},{en:"overwhelmed",pl:"przytłoczony",emoji:"🌊"},
];
COURSE.units.push({id:"c1",level:"C1",topic:"Work–Life Balance",title:"Work–Life Balance",emoji:"⚖️",badge:"Balance Master",sub:"Idioms, advanced vocabulary, inversion, mixed conditionals and an essay.",lessons:[
 {id:"c1l1",title:"Burning out",emoji:"🔥",intro:"Idioms that native speakers use about stress, work and rest.",bonus:C1I,zones:[
  {type:"cards",label:"Idioms",title:"Idioms & expressions",cards:C1I},
  {type:"find",label:"Find it",cards:C1I,rounds:10,title:"Which expression is it? 🔎"},
  {type:"quiz",label:"Meaning",tag:"WHAT DOES IT MEAN?",qs:[
   {q:"'I'm up to my eyes in work.'",opts:["I'm extremely busy","I can see my work clearly","I've finished everything"],correct:0},
   {q:"'Let's call it a day.'",opts:["Let's stop working now","Let's phone someone","Let's start again tomorrow morning"],correct:0},
   {q:"'He always cuts corners.'",opts:["He does things badly to save time","He drives dangerously","He saves money"],correct:0},
   {q:"'The project is on the back burner.'",opts:["It's postponed","It's urgent","It's finished"],correct:0},
   {q:"'She went the extra mile.'",opts:["She did more than expected","She walked to work","She travelled abroad"],correct:0},
   {q:"'I need to recharge my batteries.'",opts:["I need to rest","I need a new phone","I need more coffee"],correct:0},
   {q:"'He's tired of the rat race.'",opts:["the competitive, stressful way of working","a pet competition","a sports event"],correct:0},
   {q:"'I find it hard to switch off.'",opts:["to stop thinking about work","to turn off my laptop","to sleep in the dark"],correct:0},
  ]},
  {type:"match",label:"Match",pairs:C1I.slice(0,10)},
  {type:"fill",label:"Fill it",tag:"IDIOMS IN CONTEXT",items:[
   {before:"After three months of 12-hour days, she completely",blank:"burnt out",after:".",bank:["burnt out","called it a day","switched off"],emoji:"🔥"},
   {before:"Parents often have to",blank:"juggle",after:"work and childcare.",bank:["juggle","cut","switch"],emoji:"🤹"},
   {before:"It's late — let's",blank:"call it a day",after:".",bank:["call it a day","go the extra mile","cut corners"],emoji:"🌇"},
   {before:"Never",blank:"cut corners",after:"on safety.",bank:["cut corners","burn out","switch off"],emoji:"✂️"},
   {before:"Our holiday plans are",blank:"on the back burner",after:"until the project ends.",bank:["on the back burner","up to my eyes","in the rat race"],emoji:"🍳"},
   {before:"A weekend in the mountains helps me",blank:"recharge my batteries",after:".",bank:["recharge my batteries","juggle","burn out"],emoji:"🔋"},
  ]},
  {type:"odd",label:"Odd one out",items:[
   {opts:["burn out","exhausted","drained","energised"],odd:3,why:"'Energised' is positive; the others mean very tired."},
   {opts:["call it a day","switch off","recharge","go the extra mile"],odd:3,why:"'Go the extra mile' means work harder; the others are about stopping or resting."},
   {opts:["time-consuming","demanding","tough","effortless"],odd:3,why:"'Effortless' means easy."},
   {opts:["juggle","balance","manage","neglect"],odd:3,why:"'Neglect' means not paying attention to something."},
  ]},
  {type:"wordle",label:"Wordle",words:WL([["juggle","🤹"],["corner","✂️"],["burnout","🔥"],["switch","📴"]])},
  {type:"wheel",label:"Fortune Wheel",items:C1I},
 ]},
 {id:"c1l2",title:"Wellbeing at work",emoji:"🧘",intro:"Precise vocabulary for discussing productivity, workload and wellbeing.",bonus:C1V,zones:[
  {type:"cards",label:"Words",title:"Advanced vocabulary",cards:C1V},
  {type:"find",label:"Find it",cards:C1V,rounds:10,title:"Which word is it? 🔎"},
  {type:"fill",label:"Fill it",tag:"WORD CHOICE",items:[
   {before:"A four-day week could boost",blank:"productivity",after:".",bank:["productivity","product","producing"],emoji:"📈"},
   {before:"My",blank:"workload",after:"has doubled since January.",bank:["workload","workforce","workshop"],emoji:"📚"},
   {before:"Setting clear",blank:"boundaries",after:"helps you protect your free time.",bank:["boundaries","borders","bounds"],emoji:"🚧"},
   {before:"I tend to",blank:"procrastinate",after:"when a task feels too big.",bank:["procrastinate","prioritise","participate"],emoji:"🦥"},
   {before:"Learn to",blank:"prioritise",after:"— not everything is urgent.",bank:["prioritise","procrastinate","prioritised"],emoji:"🥇"},
   {before:"This pace simply isn't",blank:"sustainable",after:".",bank:["sustainable","sustained","sustaining"],emoji:"♻️"},
   {before:"She felt completely",blank:"overwhelmed",after:"by emails.",bank:["overwhelmed","overworked out","overwhelming"],emoji:"🌊"},
   {before:"A long",blank:"commute",after:"eats into your free time.",bank:["commute","community","commitment"],emoji:"🚆"},
  ]},
  {type:"match",label:"Match",pairs:C1V},
  {type:"quiz",label:"Word forms",tag:"WORD FORMATION",qs:[
   {q:"produce → (noun: how much you achieve)",opts:["productivity","productness","producement"],correct:0},
   {q:"sustain → (adjective)",opts:["sustainable","sustainful","sustaining only"],correct:0},
   {q:"priority → (verb)",opts:["prioritise","priorise","prioritate"],correct:0},
   {q:"flexible → (noun)",opts:["flexibility","flexibleness","flexion"],correct:0},
   {q:"balance → (opposite adjective)",opts:["unbalanced","inbalanced","disbalanced"],correct:0},
   {q:"stress → (adjective: causing stress)",opts:["stressful","stressing","stressive"],correct:0},
  ]},
  {type:"listen",label:"Listen",items:[
   {word:"Remote work has reduced my commute.",options:["Remote work has reduced my commute.","Remote work has reduced my community.","Remote work has introduced my commute."],correct:0},
   {word:"We need to set clearer boundaries.",options:["We need to set clearer boundaries.","We need to set clearer borders.","We need to sell clearer boundaries."],correct:0},
   {word:"I'm completely overwhelmed.",options:["I'm completely overwhelmed.","I'm completely overworked.","I'm completely over it."],correct:0},
   {word:"Is this pace sustainable?",options:["Is this pace sustainable?","Is this place sustainable?","Is this pace suitable?"],correct:0},
  ]},
  {type:"memory",label:"Memory",pairs:memOf(C1V.slice(0,8))},
  {type:"wordle",label:"Wordle",words:WL([["commute","🚆"],["remote","🏡"],["balance","⚖️"],["workload","📚"]])},
  {type:"wheel",label:"Fortune Wheel",items:C1V},
 ]},
 {id:"c1l3",title:"Never have I…",emoji:"🎭",intro:"Advanced grammar: inversion for emphasis, and mixed conditionals.",bonus:C1I.concat(C1V),zones:[
  {type:"grammar",label:"Inversion",title:"Inversion for emphasis",html:`<p>After a <b>negative or limiting adverbial</b> at the start of a sentence, we invert the subject and auxiliary — just like in a question. It sounds formal and emphatic.</p>${TBL(["Normal","Inverted"],[["I have <b>never</b> felt so tired.","<b>Never have I</b> felt so tired."],["We <b>rarely</b> finish before six.","<b>Rarely do we</b> finish before six."],["She not only works… but also…","<b>Not only does she</b> work…, but she also…"],["I realised it <b>only</b> later.","<b>Only later did I</b> realise it."],["As soon as I arrived, the phone rang.","<b>No sooner had I</b> arrived <b>than</b> the phone rang."]])}<p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ Never I have seen… ✅ Never have I seen…</p>`},
  {type:"fill",label:"Fill it",tag:"INVERSION",items:[
   {before:"Never",blank:"have I",after:"worked so hard in my life.",bank:["have I","I have","I"],emoji:"😵"},
   {before:"Rarely",blank:"do we",after:"get a proper lunch break.",bank:["do we","we do","we"],emoji:"🥪"},
   {before:"Not only",blank:"does she",after:"manage the team, but she also runs a podcast.",bank:["does she","she does","she"],emoji:"🎙️"},
   {before:"No sooner had I sat down",blank:"than",after:"my boss called.",bank:["than","when","that"],emoji:"📞"},
   {before:"Only later",blank:"did I",after:"realise how exhausted I was.",bank:["did I","I did","I"],emoji:"💡"},
   {before:"Seldom",blank:"does he",after:"switch off at weekends.",bank:["does he","he does","is he"],emoji:"📴"},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"Never have I felt so relaxed.",pl:"Nigdy nie czułem się tak zrelaksowany."},
   {s:"Rarely do we work at weekends.",pl:"Rzadko pracujemy w weekendy."},
   {s:"Only then did she call it a day.",pl:"Dopiero wtedy skończyła na dziś."},
   {s:"Not only is it time-consuming, but it is also stressful.",pl:"Nie tylko jest to czasochłonne, ale też stresujące."},
  ]},
  {type:"grammar",label:"Mixed conditionals",title:"Mixed conditionals",html:`<p>Mixed conditionals connect <b>different times</b>.</p>${TBL(["Type","Example"],[["Past → present","If I <b>had taken</b> that job, I <b>would be</b> rich now."],["Present → past","If I <b>weren't</b> so busy, I <b>would have come</b> to the party."]])}<p style="margin-top:12px;"><b>I wish / If only</b>: I wish I <b>had</b> more free time (now). I wish I <b>hadn't accepted</b> the project (past).</p>`},
  {type:"quiz",label:"Conditionals",tag:"MIXED CONDITIONALS",qs:[
   {q:"If I had studied harder, I ___ a better job now.",opts:["would have","would have had","will have"],correct:0},
   {q:"If she weren't so organised, she ___ the deadline last week.",opts:["would have missed","would miss","will miss"],correct:0},
   {q:"I wish I ___ more free time. (now)",opts:["had","have","would have had"],correct:0},
   {q:"If only I ___ that email yesterday!",opts:["hadn't sent","didn't send","haven't sent"],correct:0},
   {q:"If he ___ the offer, he would be living in Berlin now.",opts:["had accepted","accepted","would accept"],correct:0},
   {q:"If I ___ you, I'd take a break.",opts:["were","am","had been"],correct:0},
  ]},
  {type:"errors",label:"Find the error",items:[
   {s:"Never I have seen such a workload.",wrong:1,ok:"Never have I seen such a workload."},
   {s:"Rarely we take a real holiday.",wrong:1,ok:"Rarely do we take a real holiday."},
   {s:"If I would have known, I would have helped.",wrong:2,ok:"If I had known, I would have helped."},
   {s:"I wish I have more time.",wrong:3,ok:"I wish I had more time."},
   {s:"No sooner had I arrived when it started.",wrong:5,ok:"No sooner had I arrived than it started."},
  ]},
  {type:"wordle",label:"Wordle",words:WL([["never","🚫"],["rarely","🤏"],["seldom","🕰️"],["sooner","⏩"]])},
  {type:"wheel",label:"Fortune Wheel",items:C1I.concat(C1V)},
 ]},
 {id:"c1l4",title:"The four-day week",emoji:"📅",intro:"Read an essay on the four-day week, analyse its arguments and write your own.",bonus:C1I.concat(C1V),zones:[
  {type:"reading",label:"Essay",title:"Should We All Work Four Days a Week?",paras:[
   "<b>Should We All Work Four Days a Week?</b>",
   "For most of the twentieth century, the five-day week seemed as natural as the seasons. Yet a growing number of companies are now experimenting with a radical alternative: the same pay for four days' work.",
   "Supporters argue that the benefits are hard to ignore. In several large trials, productivity stayed the same or even rose, while sick days fell sharply. Not only do employees report lower stress, but they also describe having time, at last, for family, exercise and hobbies that had long been on the back burner.",
   "Critics, however, warn that the model does not suit every sector. A hospital cannot simply close on Fridays, and squeezing five days of work into four may leave staff more overwhelmed, not less. There is also a risk that some people will cut corners just to fit everything in.",
   "Perhaps the real question is not how many days we work, but how sustainably. Had we designed our working lives around wellbeing from the start, we might never have needed the debate at all.",
  ]},
  {type:"tf",label:"True/False/NG",title:"True, False or Not given?",sub:"Not given = the essay doesn't say.",tag:"READING CHECK",labels:TF3,items:[
   {text:"In the trials, employees were paid less for working four days.",answer:1},
   {text:"Productivity did not fall in several trials.",answer:0},
   {text:"Sick days increased during the trials.",answer:1},
   {text:"The four-day week is already law in most European countries.",answer:2},
   {text:"The writer thinks every sector can easily adopt the model.",answer:1},
   {text:"The writer suggests sustainability matters more than the number of days.",answer:0},
  ]},
  {type:"quiz",label:"Analysis",tag:"READ CLOSELY",qs:[
   {q:"'as natural as the seasons' suggests the five-day week…",opts:["seemed normal and unquestioned","was healthy","changed every few months"],correct:0},
   {q:"Which structure appears in paragraph 3 (the supporters)?",opts:["Inversion (Not only do…)","Passive future","Reported speech"],correct:0},
   {q:"What is the critics' main concern?",opts:["Some jobs can't fit into four days","Workers will earn too much","People will exercise too much"],correct:0},
   {q:"'Had we designed…' is an example of…",opts:["an inverted conditional","a question","the passive"],correct:0},
   {q:"The tone of the essay is…",opts:["balanced and thoughtful","angry","humorous"],correct:0},
  ]},
  {type:"typed",label:"Paraphrase",blocks:[{id:"c14",label:"✍️ Paraphrase / translate",items:[
   {prompt:"Rewrite with inversion: I have never felt so exhausted. → Never…",answers:["Never have I felt so exhausted"]},
   {prompt:"Rewrite with inversion: We rarely finish on time. → Rarely…",answers:["Rarely do we finish on time"]},
   {prompt:"Przetłumacz: Gdybym wtedy przyjął tę pracę, mieszkałbym teraz w Berlinie.",answers:["If I had accepted that job, I would live in Berlin now","If I had accepted that job, I would be living in Berlin now","If I had taken that job, I would live in Berlin now","If I had taken that job, I would be living in Berlin now"]},
   {prompt:"Przetłumacz: Muszę naładować baterie.",answers:["I need to recharge my batteries","I have to recharge my batteries"]},
  ]}]},
  {type:"writing",label:"Essay",title:"Your essay ✍️",sub:"Should your country introduce a four-day working week? Write a balanced essay (min. 150 words). Use at least two idioms from this unit, one inversion and one mixed conditional.",starters:["It is often argued that…","Not only would…, but…","On the other hand, critics point out that…","Had governments acted earlier,…","On balance, I believe that…"],min:150},
  {type:"wordle",label:"Wordle",words:WL([["trial","🧪"],["sector","🏭"],["debate","🗣️"],["sustain","♻️"]])},
  {type:"wheel",label:"Fortune Wheel",items:C1I.concat(C1V)},
 ]},
 {id:"c1test",test:true,title:"C1 Unit Test",emoji:"📝",intro:"The final test for Work–Life Balance: idioms, advanced vocabulary, inversion, conditionals and translation.",bonus:C1I.concat(C1V),zones:[
  {type:"quiz",label:"Vocabulary test",tag:"C1 TEST · VOCABULARY",done:"Vocabulary test done! 📝",qs:[
   {q:"'wypalić się' =",opts:["burn out","burn up","burn down"],correct:0},{q:"'iść na skróty' =",opts:["cut corners","cut costs","take a shortcut road"],correct:0},
   {q:"'odłożony na później' =",opts:["on the back burner","on the front line","up to my eyes"],correct:0},{q:"'przytłoczony' =",opts:["overwhelmed","overjoyed","overtaken"],correct:0},
   {q:"'zwlekać' =",opts:["procrastinate","prioritise","participate"],correct:0},{q:"'dojazd do pracy' =",opts:["commute","community","compute"],correct:0},
   {q:"'dać z siebie więcej' =",opts:["go the extra mile","go the distance off","go over the top"],correct:0},{q:"'dobrostan' =",opts:["wellbeing","welfare state","wellness only"],correct:0},
   {q:"'czasochłonny' =",opts:["time-consuming","time-wasting","timeless"],correct:0},{q:"'skończyć na dziś' =",opts:["call it a day","call it off","call it a night out"],correct:0},
  ]},
  {type:"quiz",label:"Grammar test",tag:"C1 TEST · GRAMMAR",done:"Grammar test done! 📝",qs:[
   {q:"Never ___ such a demanding boss.",opts:["have I had","I have had","had I have"],correct:0},
   {q:"Rarely ___ before eight.",opts:["do we leave","we leave","we do leave"],correct:0},
   {q:"No sooner had she left ___ the phone rang.",opts:["than","when","that"],correct:0},
   {q:"If I had saved more, I ___ a house now.",opts:["would own","would have owned","will own"],correct:0},
   {q:"I wish I ___ that project. (past)",opts:["hadn't accepted","didn't accept","wouldn't accept"],correct:0},
   {q:"Not only ___ late, but he also forgot the report.",opts:["was he","he was","he"],correct:0},
   {q:"___ we known, we would have helped.",opts:["Had","Have","If"],correct:0},
   {q:"If she weren't so busy, she ___ yesterday.",opts:["would have come","would come","came"],correct:0},
  ]},
  {type:"errors",label:"Error hunt",items:[
   {s:"Never I have felt so tired.",wrong:1,ok:"Never have I felt so tired."},
   {s:"If I would have known, I would have come.",wrong:2,ok:"If I had known, I would have come."},
   {s:"I wish I have more free time.",wrong:3,ok:"I wish I had more free time."},
   {s:"She always cuts the corners.",wrong:3,ok:"She always cuts corners."},
  ]},
  {type:"typed",label:"Translation",tag:"C1 TEST · TRANSLATION",title:"Translate ✍️",blocks:[{id:"ut6",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"Nigdy nie czułem się tak przytłoczony.",answers:["Never have I felt so overwhelmed","I have never felt so overwhelmed","I've never felt so overwhelmed"]},
   {prompt:"Szkoda, że nie mam więcej czasu. (I wish…)",answers:["I wish I had more time"]},
   {prompt:"Chodźmy skończyć na dziś.",answers:["Let's call it a day","Let us call it a day"]},
   {prompt:"Ona zawsze daje z siebie więcej.",answers:["She always goes the extra mile"]},
  ]}]},
 ]},
]});

/* ================= More units: builder (kids + adults) ================= */
function mkUnit(S){
 const kid=S.track==='kids';
 const [A,B]=S.sets, AB=A.words.concat(B.words);
 const single=ws=>ws.filter(w=>!/\s/.test(w.en)&&w.en.length<=10).map(w=>({word:w.en,emoji:w.emoji}));
 const spellOf=ws=>{const s=single(ws);return s.length>=5?s.slice(0,7):WL(ws.slice(0,6).map(w=>[w.en,w.emoji]));};
 const vocabLesson=(L,set,k)=>{
  const z=[{type:"cards",label:set.label||"Words",title:set.title,cards:set.words},
   {type:"find",label:"Find it",cards:set.words,rounds:10,title:set.findTitle||"Which one is it? 🔎"}];
  if(kid) z.push({type:"balloon",label:"Balloon Pop",cards:set.words,rounds:8});
  if(L.quiz) z.push({type:"quiz",label:L.quizLabel||"Quiz",tag:L.quizTag||"QUIZ",qs:L.quiz});
  if(L.fill) z.push({type:"fill",label:"Fill it",tag:L.fillTag||"FILL IT",items:L.fill});
  z.push({type:"match",label:"Match",pairs:set.words.slice(0,10)});
  z.push({type:"spell",label:"Spell it",words:spellOf(set.words)});
  if(L.tf) z.push({type:"tf",label:"True or false?",title:"True or False?",sub:L.tf.sub,tag:L.tf.tag||"TRUE / FALSE",items:L.tf.items});
  if(L.listen) z.push({type:"listen",label:"Listen",items:L.listen});
  if(L.odd) z.push({type:"odd",label:"Odd one out",items:L.odd});
  if(L.move&&kid) z.push({type:"move",label:"Mime & say",items:L.move});
  if(k===1||!L.odd) z.push({type:"memory",label:"Memory",pairs:memOf(set.words.slice(0,8))});
  z.push({type:"wordle",label:"Wordle",words:WL(L.wordle)});
  z.push({type:"wheel",label:"Fortune Wheel",items:set.words});
  return {id:S.id+'l'+(k+1),title:L.title,emoji:L.emoji,intro:L.intro,bonus:k===0?A.words:AB,zones:z};
 };
 const G=S.grammar, R=S.reading, T=S.test;
 const gl={id:S.id+'l3',title:G.title,emoji:G.emoji,intro:G.intro,bonus:AB,zones:[
  {type:"grammar",label:G.label,title:G.boxTitle,html:G.html},
  {type:"quiz",label:G.quizLabel||"Practice",tag:G.quizTag||"GRAMMAR",qs:G.quiz},
  {type:"fill",label:"Fill it",tag:G.fillTag||"FILL IT",items:G.fill},
  {type:"build",label:"Build it",items:G.build},
  {type:"errors",label:"Find the error",items:G.errors},
  {type:"whack",label:"Whack-a-Leo",qs:G.whack},
  {type:"wordle",label:"Wordle",words:WL(G.wordle)},
  {type:"wheel",label:"Fortune Wheel",items:AB},
 ]};
 const rl={id:S.id+'l4',title:R.title,emoji:R.emoji,intro:R.intro,bonus:AB,zones:[
  {type:"reading",label:R.label||"Story",title:R.storyTitle,paras:R.paras},
  {type:"tf",label:"True/False/NG",title:"True, False or Not given?",sub:"Not given = the text doesn't say.",tag:"READING CHECK",labels:TF3,items:R.tf},
  {type:"quiz",label:"Questions",tag:"READ AGAIN",qs:R.quiz},
  {type:"typed",label:"Translation",blocks:[{id:S.id+'-tr4',label:"🇵🇱 → 🇬🇧 Polish to English",items:R.typed}]},
  {type:"writing",label:R.writing.label||"Writing",title:R.writing.title,sub:R.writing.sub,starters:R.writing.starters,min:R.writing.min},
  {type:"wordle",label:"Wordle",words:WL(R.wordle)},
  {type:"wheel",label:"Fortune Wheel",items:AB},
 ]};
 const tl={id:S.id+'test',test:true,title:`${S.title} — Unit Test`,emoji:"📝",intro:`The final test for ${S.title}: vocabulary, grammar, mistakes and translation. Get 3 coins to win the ${S.badge} badge!`,bonus:AB,zones:[
  {type:"quiz",label:"Grammar test",tag:S.level+" TEST · GRAMMAR",done:"Grammar test done! 📝",qs:T.grammar},
  {type:"errors",label:"Error hunt",items:T.errors},
  {type:"typed",label:"Translation",tag:S.level+" TEST · TRANSLATION",title:"Translate ✍️",blocks:[{id:S.id+'-ut',label:"🇵🇱 → 🇬🇧 Polish to English",items:T.typed}]},
 ]};
 COURSE.units.push({id:S.id,level:S.level,track:S.track,topic:S.topic,title:S.title,emoji:S.emoji,badge:S.badge,sub:S.sub,
  lessons:[vocabLesson(S.l1,A,0),vocabLesson(S.l2,B,1),gl,rl,tl]});
}
const V=rows=>rows.map(([en,pl,emoji])=>({en,pl,emoji}));

/* ================= ADULTS A0 · Nice to Meet You ================= */
mkUnit({id:"aa0",level:"A0",track:"adults",topic:"First Contact",title:"Nice to Meet You",emoji:"🤝",badge:"First Contact",sub:"Greetings, introductions, personal details and the verb 'to be'.",
 sets:[
  {title:"Greetings",label:"Greetings",words:V([
   ["hello","cześć / dzień dobry","👋"],["good morning","dzień dobry (rano)","🌅"],["good evening","dobry wieczór","🌆"],["goodbye","do widzenia","🚪"],
   ["How are you?","Jak się masz?","🙂"],["I'm fine, thanks","Dobrze, dziękuję","👍"],["Nice to meet you","Miło cię poznać","🤝"],["What's your name?","Jak masz na imię?","❓"],
   ["Where are you from?","Skąd jesteś?","🌍"],["See you later","Do zobaczenia","👀"],["excuse me","przepraszam (zaczepiając)","🙋"],["sorry","przepraszam (za błąd)","😔"]])},
  {title:"Personal details",label:"Details",findTitle:"Which detail is it? 🔎",words:V([
   ["first name","imię","🪪"],["surname","nazwisko","🔤"],["age","wiek","🎂"],["address","adres","🏠"],
   ["phone number","numer telefonu","📱"],["email","e-mail","📧"],["job","praca, zawód","💼"],["married","żonaty / zamężna","💍"],
   ["single","stanu wolnego","🙋"],["country","kraj","🗺️"],["city","miasto","🏙️"],["nationality","narodowość","🛂"]])},
 ],
 l1:{title:"Hello there",emoji:"👋",intro:"Twelve everyday phrases for meeting people — at work, in a hotel, anywhere.",quizTag:"WHAT DO YOU SAY?",quizLabel:"What do you say?",quiz:[
   {q:"You meet a colleague at 8 a.m.",opts:["Good morning!","Good evening!","Goodbye!"],correct:0},
   {q:"Someone says 'How are you?'",opts:["I'm fine, thanks.","Nice to meet you.","My name is Anna."],correct:0},
   {q:"You meet a new client for the first time.",opts:["Nice to meet you.","See you later.","Sorry."],correct:0},
   {q:"You want to ask a stranger for help.",opts:["Excuse me…","Goodbye!","I'm fine."],correct:0},
   {q:"You step on someone's foot.",opts:["Sorry!","Excuse me?","Hello!"],correct:0},
   {q:"You leave the office at 5 p.m.",opts:["See you tomorrow!","Good morning!","Nice to meet you!"],correct:0},
   {q:"You want to know someone's name.",opts:["What's your name?","How old are you?","Where are you?"],correct:0},
   {q:"'Where are you from?' — answer:",opts:["I'm from Poland.","I'm fine.","I'm Anna."],correct:0},
  ],
  odd:[
   {opts:["hello","good morning","good evening","goodbye"],odd:3,why:"'Goodbye' ends a conversation; the others start one."},
   {opts:["sorry","excuse me","pardon","thanks"],odd:3,why:"'Thanks' is for gratitude; the others are polite apologies or requests."},
   {opts:["How are you?","What's your name?","Where are you from?","See you later"],odd:3,why:"'See you later' isn't a question."},
   {opts:["morning","afternoon","evening","Monday"],odd:3,why:"Monday is a day; the others are times of day."},
  ],
  wordle:[["hello","👋"],["sorry","😔"],["thanks","🙏"],["later","👀"]]},
 l2:{title:"Filling in a form",emoji:"📝",intro:"Name, surname, address, phone number… the details every form asks for.",fillTag:"A FORM",fill:[
   {before:"My",blank:"surname",after:"is Kowalski.",bank:["surname","age","address"],emoji:"🔤"},
   {before:"My",blank:"phone number",after:"is 601 234 567.",bank:["phone number","email","city"],emoji:"📱"},
   {before:"I live in Gdańsk. It's a",blank:"city",after:"by the sea.",bank:["city","country","job"],emoji:"🏙️"},
   {before:"I'm a nurse. That's my",blank:"job",after:".",bank:["job","age","name"],emoji:"💼"},
   {before:"I'm 34. That's my",blank:"age",after:".",bank:["age","address","surname"],emoji:"🎂"},
   {before:"She has a husband. She's",blank:"married",after:".",bank:["married","single","fine"],emoji:"💍"},
   {before:"My",blank:"email",after:"is anna@mail.com.",bank:["email","address","country"],emoji:"📧"},
   {before:"Poland is my",blank:"country",after:".",bank:["country","city","nationality"],emoji:"🗺️"},
  ],
  tf:{sub:"Read the form: 'First name: Marta. Surname: Nowak. Age: 29. City: Poznań. Job: accountant. Married: no. Email: marta.n@post.pl'",tag:"A FORM",items:[
   {text:"Her surname is Marta.",answer:1},{text:"She is 29.",answer:0},{text:"She lives in Poznań.",answer:0},
   {text:"She is a teacher.",answer:1},{text:"She is married.",answer:1},{text:"She has an email address.",answer:0}]},
  wordle:[["email","📧"],["single","🙋"],["city","🏙️"],["address","🏠"]]},
 grammar:{title:"I am, you are",emoji:"🧩",label:"To be",intro:"The most important verb in English: am / is / are — plus questions and negatives.",boxTitle:"The verb 'to be'",
  html:`<p>Use <b>am / is / are</b> for names, age, jobs, countries and feelings.</p>${TBL(["Positive","Negative","Question"],[["I <b>am</b> (I'm) a doctor.","I'm <b>not</b> a doctor.","<b>Am</b> I late?"],["You / We / They <b>are</b> (you're)","You <b>aren't</b> …","<b>Are</b> you from Spain?"],["He / She / It <b>is</b> (she's)","She <b>isn't</b> …","<b>Is</b> he married?"]])}<p style="margin-top:12px;">Short answers: <b>Yes, I am. / No, she isn't.</b></p><p style="margin-top:8px;">Age: <b>I am 30.</b> ❌ I have 30 years.</p>`,
  quizTag:"AM, IS OR ARE?",quiz:[
   {q:"I ___ a teacher.",opts:["am","is","are"],correct:0},{q:"She ___ from Italy.",opts:["is","am","are"],correct:0},
   {q:"They ___ my colleagues.",opts:["are","is","am"],correct:0},{q:"___ you married?",opts:["Are","Is","Am"],correct:0},
   {q:"He ___ not at work today.",opts:["is","are","am"],correct:0},{q:"We ___ from Poland.",opts:["are","is","am"],correct:0},
   {q:"How old ___ you?",opts:["are","is","have"],correct:0},{q:"It ___ a nice city.",opts:["is","are","am"],correct:0},
  ],
  fill:[
   {before:"My name",blank:"is",after:"Piotr.",bank:["is","are","am"],emoji:"🪪"},
   {before:"I",blank:"am",after:"35 years old.",bank:["am","have","is"],emoji:"🎂"},
   {before:"",blank:"Are",after:"you a student?",bank:["Are","Is","Do"],emoji:"❓"},
   {before:"No, I",blank:"'m not",after:". I'm a nurse.",bank:["'m not","isn't","don't"],emoji:"🧑‍⚕️"},
   {before:"My wife",blank:"isn't",after:"English. She's Polish.",bank:["isn't","aren't","not"],emoji:"💍"},
   {before:"",blank:"Is",after:"your office in the city centre?",bank:["Is","Are","Am"],emoji:"🏢"},
   {before:"Yes, it",blank:"is",after:".",bank:["is","it's","are"],emoji:"✅"},
   {before:"My parents",blank:"are",after:"retired.",bank:["are","is","am"],emoji:"👴"},
  ],
  build:[
   {s:"Nice to meet you.",pl:"Miło cię poznać."},{s:"Where are you from?",pl:"Skąd jesteś?"},
   {s:"I am not married.",pl:"Nie jestem żonaty."},{s:"Is she your colleague?",pl:"Czy ona jest twoją współpracowniczką?"},
   {s:"My surname is Nowak.",pl:"Moje nazwisko to Nowak."},
  ],
  errors:[
   {s:"I have 30 years.",wrong:1,ok:"I am 30 years old."},
   {s:"She are from Spain.",wrong:1,ok:"She is from Spain."},
   {s:"Are he your boss?",wrong:0,ok:"Is he your boss?"},
   {s:"We is colleagues.",wrong:1,ok:"We are colleagues."},
   {s:"I not am a student.",wrong:1,ok:"I am not a student."},
  ],
  whack:[
   {q:"You ___ very kind.",opts:["are","is","am"],correct:0},{q:"___ she a doctor?",opts:["Is","Are","Am"],correct:0},
   {q:"I ___ 42.",opts:["am","have","is"],correct:0},{q:"They ___ from Germany.",opts:["are","is","be"],correct:0},
   {q:"He ___ married.",opts:["isn't","aren't","not"],correct:0},
  ],
  wordle:[["are","✅"],["from","🌍"],["name","🪪"],["fine","👍"]]},
 reading:{title:"At reception",emoji:"🏨",intro:"Read a short dialogue at a language school, then answer, translate and write about yourself.",storyTitle:"First Day at Leogrow School",label:"Dialogue",paras:[
   "<b>First Day at Leogrow School</b>",
   "<b>Receptionist:</b> Good morning! Can I help you?<br><b>Tomasz:</b> Good morning. Yes, I'm a new student. My name is Tomasz Wiśniewski.",
   "<b>Receptionist:</b> Nice to meet you, Tomasz. How do you spell your surname?<br><b>Tomasz:</b> W-I-S-N-I-E-W-S-K-I.<br><b>Receptionist:</b> Thank you. And how old are you?<br><b>Tomasz:</b> I'm forty-one.",
   "<b>Receptionist:</b> What's your job?<br><b>Tomasz:</b> I'm an engineer. I work for a big company in Wrocław.<br><b>Receptionist:</b> Great. And what's your phone number?<br><b>Tomasz:</b> It's 604 718 220.",
   "<b>Receptionist:</b> Perfect. Your class is in room 5. Your teacher is Ms Brown — she's from Scotland. Have a nice day!<br><b>Tomasz:</b> Thanks. See you later!",
  ],
  tf:[
   {text:"Tomasz is a new student.",answer:0},{text:"He is thirty-one.",answer:1},{text:"He is an engineer.",answer:0},
   {text:"He works in Kraków.",answer:1},{text:"Tomasz is married.",answer:2},{text:"His teacher is from Scotland.",answer:0},{text:"His class is in room 3.",answer:1}],
  quiz:[
   {q:"What time of day is it?",opts:["Morning","Evening","Night"],correct:0},
   {q:"What is Tomasz's surname?",opts:["Wiśniewski","Brown","Wrocław"],correct:0},
   {q:"Where is his company?",opts:["In Wrocław","In Scotland","In room 5"],correct:0},
   {q:"Who is Ms Brown?",opts:["His teacher","The receptionist","His boss"],correct:0},
   {q:"'Can I help you?' means…",opts:["Czy mogę pomóc?","Czy możesz mi pomóc?","Czy mam pomóc ci jutro?"],correct:0},
  ],
  typed:[
   {prompt:"Mam na imię Anna.",answers:["My name is Anna","My name's Anna","I am Anna","I'm Anna"]},
   {prompt:"Jestem z Polski.",answers:["I am from Poland","I'm from Poland"]},
   {prompt:"Miło cię poznać.",answers:["Nice to meet you"]},
   {prompt:"Ona nie jest mężatką.",answers:["She is not married","She isn't married","She's not married"]},
  ],
  writing:{label:"About me",title:"Introduce yourself ✍️",sub:"Write about yourself (min. 30 words): name, age, city, job, family.",starters:["Hello! My name is…","I am … years old.","I'm from…","I live in…","I am a / an…","I am married / single."],min:30},
  wordle:[["school","🏫"],["class","📚"],["room","🚪"],["teacher","🧑‍🏫"]]},
 test:{grammar:[
   {q:"She ___ an engineer.",opts:["is","are","am"],correct:0},{q:"___ they from Spain?",opts:["Are","Is","Do"],correct:0},
   {q:"I ___ not tired.",opts:["am","is","are"],correct:0},{q:"How old ___ he?",opts:["is","are","has"],correct:0},
   {q:"We ___ married.",opts:["aren't","isn't","not"],correct:0},{q:"'Are you single?' — 'Yes, I ___.'",opts:["am","are","is"],correct:0},
   {q:"My parents ___ teachers.",opts:["are","is","am"],correct:0},{q:"What ___ your email?",opts:["is","are","am"],correct:0}],
  errors:[
   {s:"He are my colleague.",wrong:1,ok:"He is my colleague."},
   {s:"I have 25 years.",wrong:1,ok:"I am 25 years old."},
   {s:"Is you from London?",wrong:0,ok:"Are you from London?"},
   {s:"They is very nice.",wrong:1,ok:"They are very nice."}],
  typed:[
   {prompt:"Jak masz na imię?",answers:["What is your name","What's your name"]},
   {prompt:"Skąd jesteś?",answers:["Where are you from"]},
   {prompt:"Mam czterdzieści lat.",answers:["I am forty","I'm forty","I am forty years old","I'm forty years old"]},
   {prompt:"Do zobaczenia później!",answers:["See you later"]}]},
});

/* ================= ADULTS A1 · Food & Drink ================= */
mkUnit({id:"aa1",level:"A1",track:"adults",topic:"Food & Drink",title:"Food & Drink",emoji:"🍽️",badge:"Foodie",sub:"Food, ordering in a café, some / any and 'I'd like'.",
 sets:[
  {title:"Food",label:"Food",words:V([
   ["bread","chleb","🍞"],["cheese","ser","🧀"],["chicken","kurczak","🍗"],["fish","ryba","🐟"],["rice","ryż","🍚"],["pasta","makaron","🍝"],
   ["vegetables","warzywa","🥦"],["fruit","owoce","🍎"],["eggs","jajka","🥚"],["soup","zupa","🍲"],["salad","sałatka","🥗"],["dessert","deser","🍰"]])},
  {title:"In a café",label:"Café",findTitle:"Which phrase is it? 🔎",words:V([
   ["coffee","kawa","☕"],["tea","herbata","🍵"],["water","woda","💧"],["juice","sok","🧃"],["menu","menu, karta","📋"],["the bill","rachunek","🧾"],
   ["waiter","kelner","🧑‍🍳"],["table for two","stolik dla dwojga","🍽️"],["I'd like…","Poproszę… / Chciałbym…","🙋"],["How much is it?","Ile to kosztuje?","💶"],["delicious","pyszny","😋"],["tip","napiwek","🪙"]])},
 ],
 l1:{title:"What's for lunch?",emoji:"🥗",intro:"Twelve food words for shopping, cooking and eating out.",quizTag:"WHAT IS IT?",quizLabel:"What is it?",quiz:[
   {q:"It's white and Asian people often eat it with every meal.",opts:["rice","bread","cheese"],correct:0},
   {q:"Italians cook it with tomato sauce.",opts:["pasta","soup","fruit"],correct:0},
   {q:"Hens give us these.",opts:["eggs","fish","salad"],correct:0},
   {q:"You eat it hot, with a spoon.",opts:["soup","bread","dessert"],correct:0},
   {q:"Carrots, onions and broccoli are…",opts:["vegetables","fruit","desserts"],correct:0},
   {q:"Apples, bananas and pears are…",opts:["fruit","vegetables","fish"],correct:0},
   {q:"Cake or ice cream at the end of a meal:",opts:["dessert","salad","rice"],correct:0},
   {q:"It lives in water.",opts:["fish","chicken","cheese"],correct:0},
  ],
  odd:[
   {opts:["apple","banana","pear","carrot"],odd:3,why:"A carrot is a vegetable; the others are fruit."},
   {opts:["coffee","tea","juice","bread"],odd:3,why:"Bread is food; the others are drinks."},
   {opts:["chicken","fish","beef","rice"],odd:3,why:"Rice isn't meat or fish."},
   {opts:["soup","salad","dessert","menu"],odd:3,why:"A menu isn't something you eat."},
  ],
  wordle:[["bread","🍞"],["cheese","🧀"],["pasta","🍝"],["salad","🥗"]]},
 l2:{title:"At the café",emoji:"☕",intro:"Order like a local: menus, drinks, the bill and a polite 'I'd like…'.",fillTag:"ORDERING",fill:[
   {before:"Can I see the",blank:"menu",after:", please?",bank:["menu","bill","tip"],emoji:"📋"},
   {before:"I'd like a",blank:"table for two",after:", please.",bank:["table for two","menu","bill"],emoji:"🍽️"},
   {before:"",blank:"I'd like",after:"a black coffee, please.",bank:["I'd like","I like","I have"],emoji:"☕"},
   {before:"Could we have",blank:"the bill",after:", please?",bank:["the bill","the waiter","the tip"],emoji:"🧾"},
   {before:"",blank:"How much",after:"is the soup?",bank:["How much","How many","How old"],emoji:"💶"},
   {before:"This cake is",blank:"delicious",after:"!",bank:["delicious","expensive","menu"],emoji:"😋"},
   {before:"We left a 10%",blank:"tip",after:"for the waiter.",bank:["tip","bill","menu"],emoji:"🪙"},
   {before:"A glass of",blank:"water",after:", please.",bank:["water","bread","soup"],emoji:"💧"},
  ],
  tf:{sub:"Read the menu: 'Café Mila — Soup of the day 14 zł · Chicken salad 28 zł · Pasta with cheese 26 zł · Coffee 9 zł · Tea 7 zł · Apple cake 15 zł. Open 8:00–20:00.'",tag:"A MENU",items:[
   {text:"Tea is cheaper than coffee.",answer:0},{text:"The chicken salad costs 26 zł.",answer:1},{text:"There is a dessert on the menu.",answer:0},
   {text:"The café opens at 9:00.",answer:1},{text:"Soup of the day costs 14 zł.",answer:0},{text:"There is fish on the menu.",answer:1}]},
  listen:[
   {word:"I'd like a coffee, please.",options:["I'd like a coffee, please.","I like coffee, please.","I'd like a copy, please."],correct:0},
   {word:"Could we have the bill?",options:["Could we have the bill?","Could we have the bell?","Could we have a bit?"],correct:0},
   {word:"A table for two, please.",options:["A table for two, please.","A table for you, please.","A cable for two, please."],correct:0},
   {word:"How much is the soup?",options:["How much is the soup?","How many is the soup?","How much is the soap?"],correct:0},
  ],
  wordle:[["menu","📋"],["water","💧"],["juice","🧃"],["waiter","🧑‍🍳"]]},
 grammar:{title:"Some or any?",emoji:"🧺",label:"Some / any",intro:"Countable and uncountable food, some / any, and polite requests.",boxTitle:"Some, any & countable nouns",
  html:`<p><b>Countable</b> nouns have a plural: an egg → two eggs. <b>Uncountable</b> nouns don't: bread, rice, water, cheese.</p>${TBL(["","Countable","Uncountable"],[["➕","There are <b>some</b> eggs.","There is <b>some</b> cheese."],["➖","There aren't <b>any</b> eggs.","There isn't <b>any</b> milk."],["❓","Are there <b>any</b> apples?","Is there <b>any</b> rice?"]])}<p style="margin-top:12px;">Offers and requests use <b>some</b>: <i>Would you like some tea?</i> · <i>Can I have some water?</i></p><p style="margin-top:8px;"><b>I'd like</b> = I would like (polite). <b>I like</b> = I enjoy it in general.</p>`,
  quizTag:"SOME OR ANY?",quiz:[
   {q:"There is ___ milk in the fridge.",opts:["some","any","a"],correct:0},{q:"Are there ___ eggs?",opts:["any","some","a"],correct:0},
   {q:"We haven't got ___ bread.",opts:["any","some","an"],correct:0},{q:"Would you like ___ coffee?",opts:["some","any","many"],correct:0},
   {q:"I'd like ___ apple, please.",opts:["an","a","some"],correct:0},{q:"Is there ___ rice left?",opts:["any","some","a"],correct:0},
   {q:"rice is…",opts:["uncountable","countable","plural"],correct:0},{q:"egg is…",opts:["countable","uncountable","plural only"],correct:0},
  ],
  fill:[
   {before:"There are",blank:"some",after:"tomatoes on the table.",bank:["some","any","a"],emoji:"🍅"},
   {before:"There isn't",blank:"any",after:"juice left.",bank:["any","some","a"],emoji:"🧃"},
   {before:"Can I have",blank:"some",after:"water, please?",bank:["some","any","a"],emoji:"💧"},
   {before:"Is there",blank:"any",after:"sugar?",bank:["any","some","an"],emoji:"🍬"},
   {before:"I'd like",blank:"an",after:"orange juice.",bank:["an","a","any"],emoji:"🍊"},
   {before:"",blank:"I'd like",after:"the chicken, please.",bank:["I'd like","I like","I'm like"],emoji:"🍗"},
   {before:"I",blank:"like",after:"fish — I eat it every week.",bank:["like","'d like","likes"],emoji:"🐟"},
   {before:"There",blank:"aren't",after:"any vegetables in the soup.",bank:["aren't","isn't","not"],emoji:"🥦"},
  ],
  build:[
   {s:"Would you like some tea?",pl:"Czy chcesz trochę herbaty?"},{s:"There isn't any milk.",pl:"Nie ma mleka."},
   {s:"I'd like a table for two.",pl:"Poproszę stolik dla dwojga."},{s:"Are there any eggs?",pl:"Czy są jakieś jajka?"},
   {s:"Can I have the bill, please?",pl:"Czy mogę prosić o rachunek?"},
  ],
  errors:[
   {s:"There isn't some bread.",wrong:2,ok:"There isn't any bread."},
   {s:"I'd like a water, please.",wrong:2,ok:"I'd like some water, please."},
   {s:"Are there some apples?",wrong:2,ok:"Are there any apples?"},
   {s:"Can I have an coffee?",wrong:3,ok:"Can I have a coffee?"},
   {s:"There are any eggs.",wrong:2,ok:"There are some eggs."},
  ],
  whack:[
   {q:"We need ___ rice.",opts:["some","any","a"],correct:0},{q:"Is there ___ cheese?",opts:["any","some","an"],correct:0},
   {q:"___ a coffee, please.",opts:["I'd like","I like","I liking"],correct:0},{q:"There aren't ___ tomatoes.",opts:["any","some","a"],correct:0},
   {q:"Would you like ___ cake?",opts:["some","any","many"],correct:0},
  ],
  wordle:[["some","➕"],["any","❓"],["would","🙋"],["sugar","🍬"]]},
 reading:{title:"Lunch at Bistro Nowa",emoji:"🍲",intro:"Read about two colleagues having lunch, then answer, translate and write.",storyTitle:"Lunch at Bistro Nowa",paras:[
   "<b>Lunch at Bistro Nowa</b>",
   "It's Friday and Ola and her colleague Mark are hungry. They go to Bistro Nowa, a small restaurant near their office. 'A table for two, please,' says Ola.",
   "The waiter gives them the menu. Mark is vegetarian, so he doesn't eat meat or fish. 'Is there any soup without meat?' he asks. 'Yes, there's tomato soup today,' says the waiter. 'Great — I'd like the tomato soup and some bread, please.'",
   "Ola orders the chicken with rice and a salad. 'Would you like any drinks?' asks the waiter. 'Some water for me, and an apple juice for my colleague.'",
   "The food is delicious. For dessert they share a big piece of cheesecake. At the end Mark asks for the bill. It's 96 zł. They leave a tip and walk back to the office — very happy and very full.",
  ],
  tf:[
   {text:"Ola and Mark are colleagues.",answer:0},{text:"Mark eats fish.",answer:1},{text:"The soup of the day is tomato soup.",answer:0},
   {text:"Ola orders pasta.",answer:1},{text:"The restaurant is far from the office.",answer:1},{text:"They pay by card.",answer:2},{text:"They have a dessert.",answer:0}],
  quiz:[
   {q:"Which day is it?",opts:["Friday","Monday","Sunday"],correct:0},
   {q:"What does Mark drink?",opts:["Apple juice","Coffee","Water"],correct:0},
   {q:"What do they have for dessert?",opts:["Cheesecake","Ice cream","Fruit"],correct:0},
   {q:"How much is the bill?",opts:["96 zł","69 zł","100 zł"],correct:0},
   {q:"'vegetarian' means he doesn't eat…",opts:["meat or fish","bread","vegetables"],correct:0},
  ],
  typed:[
   {prompt:"Poproszę kawę.",answers:["I'd like a coffee please","I would like a coffee please","I'd like a coffee","Can I have a coffee please"]},
   {prompt:"Czy jest jakaś zupa?",answers:["Is there any soup"]},
   {prompt:"Nie ma chleba.",answers:["There isn't any bread","There is no bread","There's no bread"]},
   {prompt:"Rachunek, proszę.",answers:["The bill please","Can I have the bill please","Could we have the bill please"]},
  ],
  writing:{label:"My food",title:"What do you eat? ✍️",sub:"Write about your typical meals (min. 40 words). Use some / any and I like / I'd like.",starters:["For breakfast I usually have…","I like… but I don't like…","There is always some … in my fridge.","My favourite restaurant is…","When I go there, I'd like…"],min:40},
  wordle:[["lunch","🥪"],["rice","🍚"],["full","😌"],["hungry","🤤"]]},
 test:{grammar:[
   {q:"There ___ some cheese.",opts:["is","are","be"],correct:0},{q:"Are there ___ apples?",opts:["any","some","a"],correct:0},
   {q:"___ like the fish, please.",opts:["I'd","I","I'm"],correct:0},{q:"We haven't got ___ milk.",opts:["any","some","a"],correct:0},
   {q:"Would you like ___ tea?",opts:["some","any","a"],correct:0},{q:"bread is…",opts:["uncountable","countable","plural"],correct:0},
   {q:"I'd like ___ egg.",opts:["an","a","some"],correct:0},{q:"There ___ any eggs.",opts:["aren't","isn't","not"],correct:0}],
  errors:[
   {s:"There are some milk.",wrong:1,ok:"There is some milk."},
   {s:"Is there some rice?",wrong:2,ok:"Is there any rice?"},
   {s:"I like a coffee, please.",wrong:1,ok:"I'd like a coffee, please."},
   {s:"We haven't got some bread.",wrong:3,ok:"We haven't got any bread."}],
  typed:[
   {prompt:"Stolik dla dwojga, proszę.",answers:["A table for two please","Table for two please"]},
   {prompt:"Ile to kosztuje?",answers:["How much is it","How much does it cost"]},
   {prompt:"Lubię ryby.",answers:["I like fish"]},
   {prompt:"Czy chcesz trochę herbaty?",answers:["Would you like some tea","Do you want some tea"]}]},
});

/* ================= ADULTS A2 · Travel ================= */
mkUnit({id:"aa2",level:"A2",track:"adults",topic:"Travel",title:"Travel",emoji:"🧳",badge:"Globetrotter",sub:"Transport, hotels and airports — and the Past Simple.",
 sets:[
  {title:"Getting around",label:"Transport",words:V([
   ["plane","samolot","✈️"],["train","pociąg","🚆"],["bus","autobus","🚌"],["taxi","taksówka","🚕"],["ferry","prom","⛴️"],["car","samochód","🚗"],
   ["ticket","bilet","🎫"],["platform","peron","🚉"],["luggage","bagaż","🧳"],["passport","paszport","🛂"],["delay","opóźnienie","⏳"],["return ticket","bilet w obie strony","🔁"]])},
  {title:"At the hotel & airport",label:"Hotel",findTitle:"Which phrase is it? 🔎",words:V([
   ["book a room","zarezerwować pokój","🛏️"],["check in","zameldować się / odprawić","🛎️"],["check out","wymeldować się","🚪"],["single room","pokój jednoosobowy","1️⃣"],
   ["double room","pokój dwuosobowy","2️⃣"],["reception","recepcja","🏨"],["key","klucz","🔑"],["boarding pass","karta pokładowa","🎟️"],
   ["gate","wyjście (na lotnisku)","🚪"],["flight","lot","🛫"],["sightseeing","zwiedzanie","🗺️"],["souvenir","pamiątka","🎁"]])},
 ],
 l1:{title:"On the move",emoji:"🚆",intro:"Twelve words for getting from A to B — tickets, platforms, delays.",quizTag:"WHICH ONE?",quizLabel:"Which one?",quiz:[
   {q:"You need it to fly to another country.",opts:["passport","platform","ferry"],correct:0},
   {q:"It takes you across the sea with your car.",opts:["ferry","taxi","train"],correct:0},
   {q:"You wait for the train here.",opts:["platform","gate","reception"],correct:0},
   {q:"Your bags and suitcases =",opts:["luggage","ticket","delay"],correct:0},
   {q:"The train is 40 minutes late. There's a…",opts:["delay","return","platform"],correct:0},
   {q:"A ticket there and back:",opts:["return ticket","single room","boarding pass"],correct:0},
   {q:"A yellow car that takes you anywhere — for money:",opts:["taxi","bus","ferry"],correct:0},
   {q:"The fastest way to go from Warsaw to Lisbon:",opts:["plane","bus","ferry"],correct:0},
  ],
  odd:[
   {opts:["plane","train","bus","passport"],odd:3,why:"A passport is a document, not transport."},
   {opts:["ticket","boarding pass","passport","luggage"],odd:3,why:"Luggage isn't a document."},
   {opts:["platform","gate","station","pillow"],odd:3,why:"A pillow is in a hotel room, not a station or airport."},
   {opts:["ferry","ship","boat","taxi"],odd:3,why:"A taxi travels on the road, not on water."},
  ],
  wordle:[["train","🚆"],["ticket","🎫"],["ferry","⛴️"],["delay","⏳"]]},
 l2:{title:"Hotel & airport",emoji:"🏨",intro:"Book a room, check in, find your gate — the phrases every traveller needs.",fillTag:"TRAVEL PHRASES",fill:[
   {before:"I'd like to",blank:"book a room",after:"for three nights.",bank:["book a room","check out","sightseeing"],emoji:"🛏️"},
   {before:"You can",blank:"check in",after:"after 2 p.m.",bank:["check in","check out","book"],emoji:"🛎️"},
   {before:"Please leave your",blank:"key",after:"at reception.",bank:["key","gate","flight"],emoji:"🔑"},
   {before:"We'd like a",blank:"double room",after:"with a sea view.",bank:["double room","single room","boarding pass"],emoji:"2️⃣"},
   {before:"Your flight leaves from",blank:"gate",after:"12.",bank:["gate","platform","reception"],emoji:"🚪"},
   {before:"Show your",blank:"boarding pass",after:"before you get on the plane.",bank:["boarding pass","souvenir","room"],emoji:"🎟️"},
   {before:"We bought a small",blank:"souvenir",after:"for my mum.",bank:["souvenir","flight","delay"],emoji:"🎁"},
   {before:"We went",blank:"sightseeing",after:"in the old town.",bank:["sightseeing","check in","reception"],emoji:"🗺️"},
  ],
  tf:{sub:"Read the booking: 'Hotel Bryza, Sopot. Double room, 2 adults. Check-in: Fri 14 June from 15:00. Check-out: Sun 16 June by 11:00. Breakfast included. Free parking.'",tag:"A BOOKING",items:[
   {text:"It's a single room.",answer:1},{text:"They stay two nights.",answer:0},{text:"Check-in is from 3 p.m.",answer:0},
   {text:"They must check out by noon.",answer:1},{text:"Breakfast costs extra.",answer:1},{text:"Parking is free.",answer:0}]},
  listen:[
   {word:"I'd like to check in, please.",options:["I'd like to check in, please.","I'd like to check out, please.","I'd like a chicken, please."],correct:0},
   {word:"Where is gate twelve?",options:["Where is gate twelve?","Where is gate twenty?","Where is the train?"],correct:0},
   {word:"The flight is delayed.",options:["The flight is delayed.","The light is delayed.","The flight is late today."],correct:0},
   {word:"A return ticket to Kraków.",options:["A return ticket to Kraków.","A single ticket to Kraków.","Return the ticket to Kraków."],correct:0},
  ],
  wordle:[["flight","🛫"],["hotel","🏨"],["key","🔑"],["gate","🚪"]]},
 grammar:{title:"We went to…",emoji:"⏪",label:"Past Simple",intro:"Talk about trips: regular -ed verbs, common irregular verbs, questions and negatives.",boxTitle:"The Past Simple",
  html:`<p>Use the <b>Past Simple</b> for finished actions in the past: <i>yesterday, last summer, in 2023, two days ago</i>.</p>${TBL(["Regular (+ed)","Irregular"],[["visit → <b>visited</b>","go → <b>went</b>"],["stay → <b>stayed</b>","fly → <b>flew</b>"],["travel → <b>travelled</b>","buy → <b>bought</b>"],["book → <b>booked</b>","take → <b>took</b> · see → <b>saw</b> · have → <b>had</b>"]])}<p style="margin-top:12px;">➖ I <b>didn't go</b> by train. ❓ <b>Did</b> you <b>enjoy</b> it? — Yes, I <b>did</b>.</p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ Did you went? ✅ Did you go?</p>`,
  quizTag:"PAST FORMS",quiz:[
   {q:"go →",opts:["went","goed","gone"],correct:0},{q:"fly →",opts:["flew","flied","flown"],correct:0},
   {q:"buy →",opts:["bought","buyed","brought"],correct:0},{q:"stay →",opts:["stayed","staid","stood"],correct:0},
   {q:"take →",opts:["took","taked","taken"],correct:0},{q:"see →",opts:["saw","seed","seen"],correct:0},
   {q:"travel →",opts:["travelled","travelt","travel"],correct:0},{q:"have →",opts:["had","haved","has"],correct:0},
  ],
  fill:[
   {before:"Last summer we",blank:"went",after:"to Croatia.",bank:["went","go","gone"],emoji:"🏖️"},
   {before:"We",blank:"stayed",after:"in a small hotel by the sea.",bank:["stayed","stay","staying"],emoji:"🏨"},
   {before:"",blank:"Did",after:"you fly or drive?",bank:["Did","Do","Were"],emoji:"✈️"},
   {before:"We",blank:"didn't",after:"take the ferry.",bank:["didn't","don't","weren't"],emoji:"⛴️"},
   {before:"I",blank:"bought",after:"a souvenir for my sister.",bank:["bought","buyed","buy"],emoji:"🎁"},
   {before:"The flight",blank:"was",after:"two hours late.",bank:["was","were","did"],emoji:"⏳"},
   {before:"Did you enjoy it? — Yes, I",blank:"did",after:".",bank:["did","was","enjoyed"],emoji:"✅"},
   {before:"We",blank:"saw",after:"the old castle on Sunday.",bank:["saw","seen","see"],emoji:"🏰"},
  ],
  build:[
   {s:"We went to Italy last year.",pl:"Pojechaliśmy do Włoch w zeszłym roku."},
   {s:"Did you book the hotel?",pl:"Czy zarezerwowałeś hotel?"},
   {s:"I didn't take my passport.",pl:"Nie wziąłem paszportu."},
   {s:"The train was very late.",pl:"Pociąg bardzo się spóźnił."},
   {s:"We stayed for a week.",pl:"Zostaliśmy na tydzień."},
  ],
  errors:[
   {s:"Did you went to Paris?",wrong:2,ok:"Did you go to Paris?"},
   {s:"We goed by train.",wrong:1,ok:"We went by train."},
   {s:"I didn't bought a ticket.",wrong:2,ok:"I didn't buy a ticket."},
   {s:"They flyed to Rome.",wrong:1,ok:"They flew to Rome."},
   {s:"We was in London last week.",wrong:1,ok:"We were in London last week."},
  ],
  whack:[
   {q:"We ___ a taxi to the hotel.",opts:["took","taked","take"],correct:0},{q:"___ you see the museum?",opts:["Did","Do","Were"],correct:0},
   {q:"I ___ go sightseeing.",opts:["didn't","don't","wasn't"],correct:0},{q:"She ___ to Madrid yesterday.",opts:["flew","flied","flies"],correct:0},
   {q:"The hotel ___ very nice.",opts:["was","were","did"],correct:0},
  ],
  wordle:[["went","🚶"],["flew","✈️"],["bought","🛍️"],["stayed","🏨"]]},
 reading:{title:"A weekend in Gdańsk",emoji:"⚓",intro:"Read a short travel blog post, then answer, translate and write your own.",storyTitle:"A Weekend in Gdańsk",label:"Blog",paras:[
   "<b>A Weekend in Gdańsk</b> — a travel blog by Kasia",
   "Last month my husband and I went to Gdańsk for the weekend. We booked a double room in a small hotel in the old town. We took the train from Warsaw — it was fast and comfortable, only three hours.",
   "On Saturday morning we went sightseeing. We walked along the river, saw the famous crane and visited a museum about the sea. In the afternoon it rained, so we stayed in a café and ate delicious pierogi.",
   "On Sunday we took a ferry to Westerplatte. It was windy but beautiful. I bought a small amber souvenir for my mum.",
   "We checked out at eleven and caught the train home. There was a forty-minute delay, but we didn't mind. It was a perfect little trip!",
  ],
  tf:[
   {text:"Kasia travelled with her husband.",answer:0},{text:"They went by plane.",answer:1},{text:"The train journey took three hours.",answer:0},
   {text:"It rained on Saturday afternoon.",answer:0},{text:"The hotel had a swimming pool.",answer:2},{text:"Kasia bought a souvenir for her sister.",answer:1},{text:"The train home was late.",answer:0}],
  quiz:[
   {q:"Where was their hotel?",opts:["In the old town","By the airport","On a ferry"],correct:0},
   {q:"What did they do when it rained?",opts:["Stayed in a café","Went to the beach","Took a taxi"],correct:0},
   {q:"How did they get to Westerplatte?",opts:["By ferry","By bus","On foot"],correct:0},
   {q:"What was the souvenir made of?",opts:["Amber","Wood","Glass"],correct:0},
   {q:"'we didn't mind' means…",opts:["it wasn't a problem for us","we forgot","we were angry"],correct:0},
  ],
  typed:[
   {prompt:"Pojechaliśmy pociągiem.",answers:["We went by train","We took the train","We travelled by train","We traveled by train"]},
   {prompt:"Czy zarezerwowałeś pokój?",answers:["Did you book a room","Did you book the room"]},
   {prompt:"Lot był opóźniony.",answers:["The flight was delayed"]},
   {prompt:"Kupiłam pamiątkę.",answers:["I bought a souvenir"]},
  ],
  writing:{label:"My trip",title:"Your last trip ✍️",sub:"Write a short blog post about a trip (min. 50 words). Use at least five verbs in the Past Simple.",starters:["Last … I went to…","We travelled by…","We stayed in…","On the first day we…","I didn't…","The best thing was…"],min:50},
  wordle:[["river","🏞️"],["windy","🌬️"],["amber","🟠"],["museum","🏛️"]]},
 test:{grammar:[
   {q:"We ___ to Spain in May.",opts:["went","go","gone"],correct:0},{q:"___ you enjoy the trip?",opts:["Did","Were","Do"],correct:0},
   {q:"I didn't ___ a taxi.",opts:["take","took","taken"],correct:0},{q:"The hotel ___ cheap.",opts:["wasn't","didn't","weren't"],correct:0},
   {q:"They ___ in a tent.",opts:["stayed","staid","stay"],correct:0},{q:"fly →",opts:["flew","flied","flown"],correct:0},
   {q:"We ___ at the airport at 6.",opts:["were","was","did"],correct:0},{q:"buy →",opts:["bought","buyed","brought"],correct:0}],
  errors:[
   {s:"Did she bought a ticket?",wrong:2,ok:"Did she buy a ticket?"},
   {s:"We taked the bus.",wrong:1,ok:"We took the bus."},
   {s:"They was very tired.",wrong:1,ok:"They were very tired."},
   {s:"I didn't went sightseeing.",wrong:2,ok:"I didn't go sightseeing."}],
  typed:[
   {prompt:"Chciałbym się zameldować.",answers:["I'd like to check in","I would like to check in"]},
   {prompt:"Gdzie jest peron?",answers:["Where is the platform"]},
   {prompt:"Polecieliśmy do Rzymu.",answers:["We flew to Rome"]},
   {prompt:"Nie mam biletu.",answers:["I don't have a ticket","I haven't got a ticket"]}]},
});

/* ================= ADULTS B1 · Health & Fitness ================= */
mkUnit({id:"bb1",level:"B1",track:"adults",topic:"Health & Fitness",title:"Health & Fitness",emoji:"🏃",badge:"Fit & Well",sub:"Illness, the doctor's, healthy habits and should / must / have to.",
 sets:[
  {title:"At the doctor's",label:"Health",words:V([
   ["headache","ból głowy","🤕"],["sore throat","ból gardła","😷"],["a cold","przeziębienie","🤧"],["the flu","grypa","🤒"],["temperature","gorączka, temperatura","🌡️"],["cough","kaszel","😮‍💨"],
   ["prescription","recepta","📝"],["painkiller","środek przeciwbólowy","💊"],["appointment","wizyta (umówiona)","📅"],["pharmacy","apteka","🏥"],["recover","wyzdrowieć","💪"],["injury","uraz, kontuzja","🩹"]])},
  {title:"A healthy lifestyle",label:"Lifestyle",findTitle:"Which habit is it? 🔎",words:V([
   ["work out","ćwiczyć","🏋️"],["go jogging","biegać (rekreacyjnie)","🏃"],["stretch","rozciągać się","🧘"],["lose weight","schudnąć","⚖️"],["put on weight","przytyć","🍔"],["balanced diet","zbilansowana dieta","🥗"],
   ["junk food","niezdrowe jedzenie","🍟"],["get enough sleep","wysypiać się","😴"],["cut down on","ograniczyć","✂️"],["give up","rzucić (nałóg)","🚭"],["stay in shape","utrzymywać formę","💯"],["stressed","zestresowany","😣"]])},
 ],
 l1:{title:"I don't feel well",emoji:"🤒",intro:"Symptoms, illnesses and the language of a visit to the doctor's.",quizTag:"WHAT'S WRONG?",quizLabel:"What's wrong?",quiz:[
   {q:"Your head hurts. You've got a…",opts:["headache","sore throat","cough"],correct:0},
   {q:"It hurts when you swallow. You've got a…",opts:["sore throat","temperature","injury"],correct:0},
   {q:"The doctor writes this for your medicine.",opts:["prescription","appointment","pharmacy"],correct:0},
   {q:"You buy medicine here.",opts:["pharmacy","reception","surgery bill"],correct:0},
   {q:"Your body is 39°C. You've got a high…",opts:["temperature","cold","injury"],correct:0},
   {q:"You broke your arm playing football. It's an…",opts:["injury","illness","appointment"],correct:0},
   {q:"A tablet that stops pain:",opts:["painkiller","prescription","cough"],correct:0},
   {q:"To get better after an illness:",opts:["recover","work out","give up"],correct:0},
  ],
  odd:[
   {opts:["headache","sore throat","cough","pharmacy"],odd:3,why:"A pharmacy is a place; the others are symptoms."},
   {opts:["a cold","the flu","a cough","a prescription"],odd:3,why:"A prescription isn't an illness."},
   {opts:["painkiller","tablet","medicine","appointment"],odd:3,why:"An appointment isn't something you take."},
   {opts:["doctor","nurse","pharmacist","patient"],odd:3,why:"A patient doesn't treat people — they get treated."},
  ],
  wordle:[["cough","😮‍💨"],["throat","😷"],["injury","🩹"],["flu","🤒"]]},
 l2:{title:"Staying in shape",emoji:"🥗",intro:"Habits, diets and phrasal verbs for a healthier life.",fillTag:"HEALTHY HABITS",fill:[
   {before:"I",blank:"work out",after:"at the gym three times a week.",bank:["work out","give up","put on"],emoji:"🏋️"},
   {before:"He wants to",blank:"lose weight",after:"before summer.",bank:["lose weight","put on weight","stretch"],emoji:"⚖️"},
   {before:"You should",blank:"cut down on",after:"sugar.",bank:["cut down on","give up on","work out"],emoji:"✂️"},
   {before:"My dad finally",blank:"gave up",after:"smoking.",bank:["gave up","cut down","worked out"],emoji:"🚭"},
   {before:"Always",blank:"stretch",after:"before you run.",bank:["stretch","recover","lose"],emoji:"🧘"},
   {before:"Too much",blank:"junk food",after:"is bad for your heart.",bank:["junk food","balanced diet","sleep"],emoji:"🍟"},
   {before:"Adults need to",blank:"get enough sleep",after:"— seven to nine hours.",bank:["get enough sleep","stay up","go jogging"],emoji:"😴"},
   {before:"She cycles every day to",blank:"stay in shape",after:".",bank:["stay in shape","put on weight","be stressed"],emoji:"💯"},
  ],
  tf:{sub:"Read the leaflet: 'Feel Better in 30 Days — Walk 8,000 steps a day. Drink 2 litres of water. Cut down on sugar and junk food. Sleep 7–9 hours. Free fitness classes every Tuesday at the community centre.'",tag:"A LEAFLET",items:[
   {text:"You should walk 10,000 steps a day.",answer:1},{text:"The plan lasts a month.",answer:0},{text:"You must give up sugar completely.",answer:1},
   {text:"The fitness classes are free.",answer:0},{text:"The classes are on Thursdays.",answer:1},{text:"The leaflet recommends at least seven hours' sleep.",answer:0}]},
  listen:[
   {word:"I've cut down on coffee.",options:["I've cut down on coffee.","I've cut down the coffee.","I've cut out of coffee."],correct:0},
   {word:"She works out every morning.",options:["She works out every morning.","She walks out every morning.","She worked out one morning."],correct:0},
   {word:"He's trying to lose weight.",options:["He's trying to lose weight.","He's trying to lose wait.","He's trying to choose weight."],correct:0},
  ],
  wordle:[["jogging","🏃"],["diet","🥗"],["stress","😣"],["sleep","😴"]]},
 grammar:{title:"You should rest",emoji:"⚕️",label:"Modals",intro:"Advice and obligation: should, must, have to, don't have to and mustn't.",boxTitle:"should · must · have to",
  html:`<p>Modal verbs + <b>infinitive without 'to'</b>: <i>You should <b>rest</b>.</i></p>${TBL(["Form","Meaning","Example"],[["<b>should / shouldn't</b>","advice","You <b>should</b> see a doctor."],["<b>must</b>","strong obligation (from the speaker)","I <b>must</b> stop smoking."],["<b>have to</b>","obligation (rules, other people)","Nurses <b>have to</b> work nights."],["<b>don't have to</b>","no obligation — it's not necessary","You <b>don't have to</b> pay. It's free."],["<b>mustn't</b>","prohibition — it's forbidden","You <b>mustn't</b> drink alcohol with this medicine."]])}<p style="margin-top:12px;color:#c0392b;font-weight:700;">❌ You should to rest. ✅ You should rest.<br>⚠️ mustn't ≠ don't have to!</p>`,
  quizTag:"WHICH MODAL?",quiz:[
   {q:"You look tired. You ___ go to bed early.",opts:["should","mustn't","don't have to"],correct:0},
   {q:"You ___ smoke in hospitals. It's forbidden.",opts:["mustn't","don't have to","should"],correct:0},
   {q:"It's Sunday. I ___ get up early.",opts:["don't have to","mustn't","must"],correct:0},
   {q:"Doctors ___ study for many years.",opts:["have to","don't have to","shouldn't"],correct:0},
   {q:"You ___ eat so much junk food.",opts:["shouldn't","don't have to","must"],correct:0},
   {q:"Does she ___ wear a uniform?",opts:["have to","must","should to"],correct:0},
   {q:"I ___ remember to take my tablets!",opts:["must","mustn't","don't have to"],correct:0},
   {q:"Yesterday I ___ go to the dentist.",opts:["had to","must","have to"],correct:0},
  ],
  fill:[
   {before:"You",blank:"should",after:"drink more water.",bank:["should","mustn't","has to"],emoji:"💧"},
   {before:"You",blank:"mustn't",after:"take more than four tablets a day.",bank:["mustn't","don't have to","should"],emoji:"💊"},
   {before:"The test is free — you",blank:"don't have to",after:"pay.",bank:["don't have to","mustn't","shouldn't to"],emoji:"🆓"},
   {before:"She",blank:"has to",after:"work nights at the hospital.",bank:["has to","have to","must to"],emoji:"🌙"},
   {before:"I",blank:"had to",after:"stay in bed for a week.",bank:["had to","must","have to"],emoji:"🛏️"},
   {before:"You",blank:"shouldn't",after:"work so much — you look stressed.",bank:["shouldn't","don't have to","mustn't to"],emoji:"😣"},
   {before:"Do you",blank:"have to",after:"make an appointment?",bank:["have to","must","should to"],emoji:"📅"},
   {before:"I",blank:"must",after:"start going to the gym again!",bank:["must","mustn't","don't have to"],emoji:"🏋️"},
  ],
  build:[
   {s:"You should see a doctor.",pl:"Powinieneś iść do lekarza."},
   {s:"You don't have to pay.",pl:"Nie musisz płacić."},
   {s:"You mustn't run in the corridor.",pl:"Nie wolno biegać po korytarzu."},
   {s:"She has to take antibiotics.",pl:"Ona musi brać antybiotyki."},
   {s:"I had to cancel my appointment.",pl:"Musiałem odwołać wizytę."},
  ],
  errors:[
   {s:"You should to rest more.",wrong:2,ok:"You should rest more."},
   {s:"She have to work tomorrow.",wrong:1,ok:"She has to work tomorrow."},
   {s:"I must went to the dentist yesterday.",wrong:1,ok:"I had to go to the dentist yesterday."},
   {s:"Do you must wear a mask?",wrong:2,ok:"Do you have to wear a mask?"},
   {s:"He shoulds eat more vegetables.",wrong:1,ok:"He should eat more vegetables."},
  ],
  whack:[
   {q:"You ___ smoke here.",opts:["mustn't","don't have to","should"],correct:0},
   {q:"She ___ get up at 5 for work.",opts:["has to","have to","must to"],correct:0},
   {q:"You ___ come if you don't want to.",opts:["don't have to","mustn't","shouldn't to"],correct:0},
   {q:"You ___ try yoga — it's great!",opts:["should","mustn't","had"],correct:0},
   {q:"Last week I ___ stay at home.",opts:["had to","must","have to"],correct:0},
  ],
  wordle:[["should","👉"],["must","❗"],["advice","💬"],["rest","🛌"]]},
 reading:{title:"The 30-day challenge",emoji:"📆",intro:"Read about Marek's month of healthy living, then answer, translate and give advice.",storyTitle:"Marek's 30-Day Challenge",label:"Article",paras:[
   "<b>Marek's 30-Day Challenge</b>",
   "Marek is a 38-year-old IT manager. He works long hours, eats at his desk and hardly ever exercises. Last winter he had the flu twice and a terrible back injury. 'My doctor told me I had to change something,' he says.",
   "So he started a 30-day challenge. The rules were simple: walk to work, cut down on coffee, no junk food after 8 p.m., and get enough sleep. 'I didn't have to join an expensive gym,' he explains. 'I just had to move more.'",
   "The first week was hard. He had headaches because he was drinking less coffee, and he felt stressed. But in week two he started to sleep better, and by week three he was going jogging with his neighbour.",
   "After a month Marek had lost four kilos and felt full of energy. 'My advice? You shouldn't try to change everything at once. Start small — and you mustn't give up after a bad day.'",
  ],
  tf:[
   {text:"Marek is a doctor.",answer:1},{text:"He had the flu twice last winter.",answer:0},{text:"He joined an expensive gym.",answer:1},
   {text:"The first week was easy.",answer:1},{text:"His neighbour is a personal trainer.",answer:2},{text:"He lost four kilos.",answer:0},{text:"He thinks you should change everything at once.",answer:1}],
  quiz:[
   {q:"Why did Marek start the challenge?",opts:["His doctor told him to change","He wanted to win a prize","His boss asked him"],correct:0},
   {q:"Why did he have headaches in week one?",opts:["He drank less coffee","He slept too much","He ran too far"],correct:0},
   {q:"What happened in week two?",opts:["He slept better","He gave up","He got an injury"],correct:0},
   {q:"What is his main advice?",opts:["Start small","Join a gym","Stop drinking water"],correct:0},
   {q:"'hardly ever' means…",opts:["almost never","very often","always"],correct:0},
  ],
  typed:[
   {prompt:"Powinieneś więcej spać.",answers:["You should sleep more","You should get more sleep"]},
   {prompt:"Nie musisz iść na siłownię.",answers:["You don't have to go to the gym"]},
   {prompt:"Mam ból głowy.",answers:["I have a headache","I've got a headache"]},
   {prompt:"Rzuciłem palenie.",answers:["I gave up smoking","I have given up smoking","I've given up smoking","I quit smoking"]},
  ],
  writing:{label:"Advice",title:"Give some advice ✍️",sub:"A friend is always tired and stressed. Write an email with advice (min. 70 words). Use should, have to and mustn't.",starters:["Hi …, I'm sorry to hear that…","I think you should…","You shouldn't…","You don't have to…, but…","Most importantly, you mustn't…","Take care,"],min:70},
  wordle:[["energy","⚡"],["habit","🔁"],["kilos","⚖️"],["walk","🚶"]]},
 test:{grammar:[
   {q:"You ___ eat less sugar.",opts:["should","should to","musts"],correct:0},{q:"You ___ park here — it's illegal.",opts:["mustn't","don't have to","should"],correct:0},
   {q:"He ___ work on Saturdays.",opts:["has to","have to","must to"],correct:0},{q:"We ___ hurry — we have lots of time.",opts:["don't have to","mustn't","must"],correct:0},
   {q:"Yesterday I ___ see a doctor.",opts:["had to","must","have to"],correct:0},{q:"___ I have to bring my passport?",opts:["Do","Must","Should"],correct:0},
   {q:"You look pale. You ___ go home.",opts:["should","mustn't","don't have to"],correct:0},{q:"'cut down on' =",opts:["reduce","stop completely","start"],correct:0}],
  errors:[
   {s:"You must to see a doctor.",wrong:2,ok:"You must see a doctor."},
   {s:"He don't have to work today.",wrong:1,ok:"He doesn't have to work today."},
   {s:"I have a sore throat yesterday.",wrong:1,ok:"I had a sore throat yesterday."},
   {s:"You shouldn't eating junk food.",wrong:2,ok:"You shouldn't eat junk food."}],
  typed:[
   {prompt:"Muszę umówić wizytę.",answers:["I have to make an appointment","I must make an appointment","I need to make an appointment"]},
   {prompt:"Nie wolno ci tu palić.",answers:["You mustn't smoke here","You must not smoke here","You can't smoke here"]},
   {prompt:"Ona ma gorączkę.",answers:["She has a temperature","She's got a temperature","She has a fever","She's got a fever"]},
   {prompt:"Powinniśmy częściej ćwiczyć.",answers:["We should work out more often","We should exercise more often","We should do more exercise"]}]},
});

/* ================= ADULTS B2 · Our Planet ================= */
mkUnit({id:"bb2",level:"B2",track:"adults",topic:"Environment",title:"Our Planet",emoji:"🌍",badge:"Planet Guardian",sub:"Climate, waste and green living — plus second & third conditionals and 'I wish'.",
 sets:[
  {title:"Environmental issues",label:"Issues",words:V([
   ["climate change","zmiana klimatu","🌡️"],["global warming","globalne ocieplenie","🔥"],["pollution","zanieczyszczenie","🏭"],["emissions","emisje","💨"],["fossil fuels","paliwa kopalne","⛽"],["deforestation","wylesianie","🪓"],
   ["drought","susza","🏜️"],["flood","powódź","🌊"],["endangered species","gatunki zagrożone","🐼"],["greenhouse gases","gazy cieplarniane","☁️"],["carbon footprint","ślad węglowy","👣"],["extreme weather","ekstremalna pogoda","⛈️"]])},
  {title:"Green living",label:"Solutions",findTitle:"Which solution is it? 🔎",words:V([
   ["renewable energy","energia odnawialna","♻️"],["solar panels","panele słoneczne","☀️"],["wind farm","farma wiatrowa","🌬️"],["recycle","poddawać recyklingowi","🔄"],["reduce waste","ograniczać odpady","🗑️"],["single-use plastic","plastik jednorazowy","🥤"],
   ["public transport","transport publiczny","🚋"],["sustainable","zrównoważony","🌱"],["eco-friendly","ekologiczny","🍃"],["compost","kompostować","🪱"],["switch off","wyłączać","🔌"],["second-hand","używany, z drugiej ręki","👕"]])},
 ],
 l1:{title:"A planet under pressure",emoji:"🌡️",intro:"Precise vocabulary for the biggest environmental problems of our time.",quizTag:"DEFINE IT",quizLabel:"Definitions",quiz:[
   {q:"A long period with little or no rain:",opts:["drought","flood","emissions"],correct:0},
   {q:"Coal, oil and gas:",opts:["fossil fuels","renewable energy","greenhouse gases"],correct:0},
   {q:"Cutting down large areas of forest:",opts:["deforestation","pollution","recycling"],correct:0},
   {q:"The total CO₂ your lifestyle produces:",opts:["carbon footprint","global warming","wind farm"],correct:0},
   {q:"Animals that could disappear forever:",opts:["endangered species","extreme weather","emissions"],correct:0},
   {q:"Gases that trap heat in the atmosphere:",opts:["greenhouse gases","fossil fuels","drought"],correct:0},
   {q:"When a river covers the streets with water:",opts:["flood","drought","pollution"],correct:0},
   {q:"Dirty air, water or soil:",opts:["pollution","sustainable","compost"],correct:0},
  ],
  odd:[
   {opts:["drought","flood","heatwave","solar panel"],odd:3,why:"A solar panel is a solution; the others are extreme weather."},
   {opts:["coal","oil","gas","wind"],odd:3,why:"Wind is renewable; the others are fossil fuels."},
   {opts:["pollution","deforestation","emissions","recycling"],odd:3,why:"Recycling helps; the others are problems."},
   {opts:["tiger","panda","polar bear","pigeon"],odd:3,why:"Pigeons aren't an endangered species."},
  ],
  wordle:[["flood","🌊"],["drought","🏜️"],["climate","🌡️"],["carbon","👣"]]},
 l2:{title:"Living greener",emoji:"♻️",intro:"Renewable energy, waste and everyday choices — the language of solutions.",fillTag:"GREEN COLLOCATIONS",fill:[
   {before:"We installed",blank:"solar panels",after:"on our roof last year.",bank:["solar panels","wind farm","fossil fuels"],emoji:"☀️"},
   {before:"Most supermarkets have stopped selling",blank:"single-use plastic",after:"bags.",bank:["single-use plastic","second-hand","renewable"],emoji:"🥤"},
   {before:"Please",blank:"switch off",after:"the lights when you leave.",bank:["switch off","switch over","switch up"],emoji:"🔌"},
   {before:"I buy most of my clothes",blank:"second-hand",after:".",bank:["second-hand","single-use","eco-system"],emoji:"👕"},
   {before:"Taking",blank:"public transport",after:"reduces your carbon footprint.",bank:["public transport","fossil fuels","extreme weather"],emoji:"🚋"},
   {before:"The new",blank:"wind farm",after:"powers 50,000 homes.",bank:["wind farm","flood","drought"],emoji:"🌬️"},
   {before:"We",blank:"compost",after:"all our food scraps.",bank:["compost","pollute","emit"],emoji:"🪱"},
   {before:"Tourism needs to become more",blank:"sustainable",after:".",bank:["sustainable","endangered","disposable"],emoji:"🌱"},
  ],
  tf:{sub:"Read the notice: 'From 1 March our office goes green. Recycling bins on every floor. No single-use cups — bring your own mug. Bike parking in the basement. Lights switch off automatically at 7 p.m. Questions? Ask Ewa (Facilities).'",tag:"OFFICE NOTICE",items:[
   {text:"The changes start in March.",answer:0},{text:"There is one recycling bin in the building.",answer:1},{text:"Staff should bring their own mugs.",answer:0},
   {text:"There is car parking in the basement.",answer:1},{text:"The lights go off automatically in the evening.",answer:0},{text:"Ewa works in Facilities.",answer:0}]},
  listen:[
   {word:"We should invest in renewable energy.",options:["We should invest in renewable energy.","We should invest in renewing energy.","We shouldn't invest in renewable energy."],correct:0},
   {word:"Our carbon footprint is far too high.",options:["Our carbon footprint is far too high.","Our carbon footprint is fairly high.","Our car and footprint are too high."],correct:0},
   {word:"They banned single-use plastic.",options:["They banned single-use plastic.","They planned single-use plastic.","They banned single-use packets."],correct:0},
  ],
  wordle:[["solar","☀️"],["recycle","🔄"],["waste","🗑️"],["green","🍃"]]},
 grammar:{title:"If we had acted…",emoji:"🔀",label:"Conditionals",intro:"Second and third conditionals — and 'I wish / If only' for regrets.",boxTitle:"2nd & 3rd conditionals · wish",
  html:`${TBL(["Type","Form","Use"],[["<b>2nd</b>","If + past simple, <b>would</b> + verb","unreal present / future: <i>If I <b>had</b> a garden, I <b>would grow</b> vegetables.</i>"],["<b>3rd</b>","If + past perfect, <b>would have</b> + past participle","unreal past: <i>If we <b>had acted</b> earlier, we <b>would have prevented</b> it.</i>"],["<b>wish</b> (present)","wish + past simple","<i>I <b>wish</b> I <b>lived</b> nearer work.</i>"],["<b>wish</b> (past)","wish + past perfect","<i>I <b>wish</b> I <b>hadn't bought</b> a diesel car.</i>"]])}<p style="margin-top:12px;">2nd conditional with <b>be</b>: <i>If I <b>were</b> the mayor, I'd ban cars.</i></p><p style="margin-top:8px;color:#c0392b;font-weight:700;">❌ If I would have known… ✅ If I had known…</p>`,
  quizTag:"WHICH FORM?",quiz:[
   {q:"If I ___ more money, I'd buy an electric car.",opts:["had","would have","have had"],correct:0},
   {q:"If they had recycled more, the landfill ___ full.",opts:["wouldn't have been","wouldn't be been","won't be"],correct:0},
   {q:"I wish I ___ a car — I'd love to cycle everywhere.",opts:["didn't need","don't need","won't need"],correct:0},
   {q:"If I ___ you, I'd take the train.",opts:["were","am","would be"],correct:0},
   {q:"If we ___ the forest, the flood wouldn't have happened.",opts:["hadn't cut down","didn't cut down","wouldn't cut down"],correct:0},
   {q:"I wish I ___ that plastic bottle yesterday.",opts:["hadn't bought","didn't buy","wouldn't buy"],correct:0},
   {q:"What ___ you do if your town flooded?",opts:["would","will have","did"],correct:0},
   {q:"If only we ___ earlier!",opts:["had acted","acted","would act"],correct:0},
  ],
  fill:[
   {before:"If more people",blank:"used",after:"public transport, the air would be cleaner.",bank:["used","use","would use"],emoji:"🚋"},
   {before:"If the government had invested in solar,",blank:"we would have",after:"cut emissions.",bank:["we would have","we would","we had"],emoji:"☀️"},
   {before:"I wish I",blank:"lived",after:"closer to the countryside.",bank:["lived","live","had live"],emoji:"🌳"},
   {before:"If I",blank:"were",after:"the president, I'd ban fossil fuels.",bank:["were","am","would be"],emoji:"🏛️"},
   {before:"If we",blank:"had known",after:"about the drought, we'd have saved water.",bank:["had known","knew","would know"],emoji:"🏜️"},
   {before:"I wish they",blank:"hadn't built",after:"the motorway through the forest.",bank:["hadn't built","didn't build","wouldn't build"],emoji:"🛣️"},
   {before:"The species",blank:"would have",after:"survived if people had protected it.",bank:["would have","would","will have"],emoji:"🐼"},
   {before:"If you",blank:"switched off",after:"your devices at night, you'd save energy.",bank:["switched off","switch off","had switch off"],emoji:"🔌"},
  ],
  build:[
   {s:"If I had a garden, I would grow vegetables.",pl:"Gdybym miał ogród, uprawiałbym warzywa."},
   {s:"I wish I had taken the train.",pl:"Żałuję, że nie pojechałem pociągiem."},
   {s:"If we had acted earlier, we would have saved the forest.",pl:"Gdybyśmy zadziałali wcześniej, uratowalibyśmy las."},
   {s:"If I were you, I would recycle more.",pl:"Na twoim miejscu więcej bym recyklingował."},
   {s:"I wish people cared more about nature.",pl:"Szkoda, że ludzie nie dbają bardziej o przyrodę."},
  ],
  errors:[
   {s:"If I would have known, I would have helped.",wrong:2,ok:"If I had known, I would have helped."},
   {s:"If I was you, I'd sell the car.",wrong:2,ok:"If I were you, I'd sell the car."},
   {s:"I wish I have more time.",wrong:3,ok:"I wish I had more time."},
   {s:"If they had planted trees, the flood wouldn't happen.",wrong:8,ok:"If they had planted trees, the flood wouldn't have happened."},
   {s:"If people recycle more, there would be less waste.",wrong:2,ok:"If people recycled more, there would be less waste."},
  ],
  whack:[
   {q:"If I ___ rich, I'd buy a forest.",opts:["were","am","would be"],correct:0},
   {q:"I wish I ___ flown so often last year.",opts:["hadn't","didn't","wouldn't"],correct:0},
   {q:"If we had cycled, we ___ arrived sooner.",opts:["would have","would","had"],correct:0},
   {q:"If you ___ less meat, you'd help the planet.",opts:["ate","eat","had eat"],correct:0},
   {q:"If only it ___ raining!",opts:["would stop","stops","has stopped"],correct:0},
  ],
  wordle:[["wish","🌠"],["would","🔀"],["known","💡"],["unless","❗"]]},
 reading:{title:"The town that said no to cars",emoji:"🚲",intro:"Read an article about a town that banned cars, then analyse, translate and argue.",storyTitle:"The Town That Said No to Cars",label:"Article",paras:[
   "<b>The Town That Said No to Cars</b>",
   "Ten years ago the centre of Valdora, a fictional town of 60,000 people in northern Europe, was choked with traffic. Air pollution was among the worst in the region, and local doctors reported a sharp rise in breathing problems among children.",
   "Then the council made a controversial decision: private cars would be banned from the centre. Shop owners were furious. 'If people can't drive here, they'll shop somewhere else,' one of them told a local newspaper at the time.",
   "A decade later, the picture looks very different. Emissions in the centre have fallen by more than half. Trams run every five minutes, cycle lanes are full, and the old car parks have become parks and playgrounds. Surprisingly, most shops are busier than before, because people walking past tend to stop and browse.",
   "Not everyone is convinced. Older residents in the suburbs complain that they depend on buses which are often overcrowded. 'I wish they had asked us first,' says one retired teacher. Still, a recent survey found that 72% of residents would vote for the ban again. 'If we hadn't taken the risk,' says the mayor, 'we would still be breathing that air.'",
  ],
  tf:[
   {text:"Valdora is a real town.",answer:1},{text:"Children had more breathing problems before the ban.",answer:0},{text:"Shop owners supported the ban at first.",answer:1},
   {text:"Emissions in the centre fell by over 50%.",answer:0},{text:"Most shops lost customers.",answer:1},{text:"The tram tickets are free.",answer:2},{text:"Most residents would support the ban again.",answer:0}],
  quiz:[
   {q:"What happened to the old car parks?",opts:["They became parks and playgrounds","They became shops","They were sold"],correct:0},
   {q:"Why are shops busier now?",opts:["Pedestrians stop and browse","Parking is free","Prices fell"],correct:0},
   {q:"Who is still unhappy?",opts:["Some older residents in the suburbs","The mayor","Children"],correct:0},
   {q:"'choked with traffic' means…",opts:["completely full of cars","without any cars","slowly improving"],correct:0},
   {q:"The mayor's last sentence is an example of the…",opts:["third conditional","first conditional","passive voice"],correct:0},
  ],
  typed:[
   {prompt:"Gdybym był burmistrzem, zakazałbym samochodów.",answers:["If I were the mayor I would ban cars","If I were the mayor I'd ban cars","If I was the mayor I would ban cars","If I was the mayor I'd ban cars"]},
   {prompt:"Żałuję, że nie kupiłem roweru.",answers:["I wish I had bought a bike","I wish I'd bought a bike","I wish I had bought a bicycle","I wish I'd bought a bicycle"]},
   {prompt:"Zanieczyszczenie powietrza jest poważnym problemem.",answers:["Air pollution is a serious problem"]},
   {prompt:"Powinniśmy korzystać z energii odnawialnej.",answers:["We should use renewable energy"]},
  ],
  writing:{label:"Opinion",title:"Should your city ban cars? ✍️",sub:"Write an opinion essay (min. 120 words). Give arguments for and against, and use at least one 2nd and one 3rd conditional.",starters:["Many cities are now considering…","On the one hand,…","On the other hand,…","If our city banned cars,…","If we had invested in public transport earlier,…","In conclusion, I believe…"],min:120},
  wordle:[["trams","🚋"],["survey","📊"],["council","🏛️"],["suburbs","🏘️"]]},
 test:{grammar:[
   {q:"If I ___ a bike, I'd cycle to work.",opts:["had","have","would have"],correct:0},{q:"If we had left earlier, we ___ the train.",opts:["would have caught","would catch","had caught"],correct:0},
   {q:"I wish I ___ speak Spanish.",opts:["could","can","would can"],correct:0},{q:"If she ___ here, she'd know what to do.",opts:["were","is","would be"],correct:0},
   {q:"I wish I ___ that.",opts:["hadn't said","didn't said","wouldn't say"],correct:0},{q:"If they ___ the warning, they would have left.",opts:["had heard","heard","would hear"],correct:0},
   {q:"'carbon footprint' =",opts:["ślad węglowy","paliwo kopalne","farma wiatrowa"],correct:0},{q:"Coal and oil are…",opts:["fossil fuels","renewable energy","greenhouse gases"],correct:0}],
  errors:[
   {s:"If I would be rich, I'd buy a farm.",wrong:2,ok:"If I were rich, I'd buy a farm."},
   {s:"I wish I didn't eat so much yesterday.",wrong:3,ok:"I wish I hadn't eaten so much yesterday."},
   {s:"If we had recycled, we would save more.",wrong:6,ok:"If we had recycled, we would have saved more."},
   {s:"If you will take the bus, you'd save money.",wrong:2,ok:"If you took the bus, you'd save money."}],
  typed:[
   {prompt:"Gdybyśmy wiedzieli, pomoglibyśmy.",answers:["If we had known we would have helped","If we'd known we would have helped","If we had known we'd have helped","If we'd known we'd have helped"]},
   {prompt:"Szkoda, że nie mam ogrodu.",answers:["I wish I had a garden"]},
   {prompt:"Powinniśmy ograniczać odpady.",answers:["We should reduce waste"]},
   {prompt:"Na twoim miejscu jeździłbym komunikacją publiczną.",answers:["If I were you I would use public transport","If I were you I'd use public transport","If I were you I would take public transport","If I were you I'd take public transport"]}]},
});

/* ================= ADULTS C1 · Cities & Society ================= */
mkUnit({id:"cc1",level:"C1",track:"adults",topic:"Cities & Society",title:"Cities & Society",emoji:"🏙️",badge:"Urban Thinker",sub:"Urban life, social issues, cleft sentences and participle clauses.",
 sets:[
  {title:"Urban life",label:"Urban",words:V([
   ["gentrification","gentryfikacja","🏗️"],["urban sprawl","rozlewanie się miast","🏘️"],["affordable housing","przystępne mieszkania","🏠"],["commute","dojeżdżać (do pracy)","🚆"],["infrastructure","infrastruktura","🌉"],["overcrowded","przepełniony","👥"],
   ["vibrant","tętniący życiem","🎭"],["run-down","zaniedbany","🏚️"],["green space","teren zielony","🌳"],["rent","czynsz","💸"],["skyline","panorama miasta","🌆"],["amenities","udogodnienia","🏪"]])},
  {title:"Society & debate",label:"Society",findTitle:"Which expression is it? 🔎",words:V([
   ["inequality","nierówność","⚖️"],["social cohesion","spójność społeczna","🤝"],["marginalised","zmarginalizowany","🚷"],["grassroots","oddolny","🌱"],["policy","polityka (zasady)","📜"],["stakeholder","interesariusz","🧑‍🤝‍🧑"],
   ["to tackle","zmierzyć się z (problemem)","🛠️"],["to exacerbate","pogłębiać, zaostrzać","📈"],["to alleviate","łagodzić","🩹"],["widespread","powszechny","🌐"],["unprecedented","bezprecedensowy","❗"],["a double-edged sword","miecz obosieczny","🗡️"]])},
 ],
 l1:{title:"City living",emoji:"🌆",intro:"Precise vocabulary to describe neighbourhoods, housing and the pressures of modern cities.",quizTag:"IN CONTEXT",quizLabel:"In context",quiz:[
   {q:"Wealthier people move in, rents rise and locals are pushed out:",opts:["gentrification","urban sprawl","infrastructure"],correct:0},
   {q:"The city keeps spreading into the countryside:",opts:["urban sprawl","skyline","amenities"],correct:0},
   {q:"Shops, gyms, schools and clinics nearby:",opts:["amenities","stakeholders","policies"],correct:0},
   {q:"Homes that ordinary people can pay for:",opts:["affordable housing","run-down housing","green space"],correct:0},
   {q:"The trains are so full you can't move. They're…",opts:["overcrowded","vibrant","widespread"],correct:0},
   {q:"Roads, bridges, pipes and power lines:",opts:["infrastructure","skyline","commute"],correct:0},
   {q:"A neighbourhood full of energy, culture and nightlife is…",opts:["vibrant","run-down","marginalised"],correct:0},
   {q:"Buildings in poor condition, needing repair:",opts:["run-down","unprecedented","grassroots"],correct:0},
  ],
  odd:[
   {opts:["vibrant","lively","bustling","run-down"],odd:3,why:"'Run-down' is negative; the others describe a busy, energetic place."},
   {opts:["rent","mortgage","deposit","skyline"],odd:3,why:"A skyline isn't a housing cost."},
   {opts:["parks","squares","green space","overcrowding"],odd:3,why:"Overcrowding is a problem, not a public space."},
   {opts:["commute","travel to work","get to the office","gentrify"],odd:3,why:"'Gentrify' isn't about getting to work."},
  ],
  wordle:[["commute","🚆"],["rent","💸"],["skyline","🌆"],["sprawl","🏘️"]]},
 l2:{title:"Who is the city for?",emoji:"⚖️",intro:"Formal vocabulary for discussing inequality, policy and community action.",fillTag:"COLLOCATIONS",fill:[
   {before:"The council has launched a scheme to",blank:"tackle",after:"homelessness.",bank:["tackle","exacerbate","widespread"],emoji:"🛠️"},
   {before:"Rising rents have",blank:"exacerbated",after:"inequality in the city.",bank:["exacerbated","alleviated","tackled"],emoji:"📈"},
   {before:"Free public transport could",blank:"alleviate",after:"pressure on low-income families.",bank:["alleviate","exacerbate","marginalise"],emoji:"🩹"},
   {before:"The project began as a",blank:"grassroots",after:"campaign run by local residents.",bank:["grassroots","stakeholder","run-down"],emoji:"🌱"},
   {before:"Tourism is",blank:"a double-edged sword",after:": it brings money but pushes up prices.",bank:["a double-edged sword","a policy","an amenity"],emoji:"🗡️"},
   {before:"All",blank:"stakeholders",after:"— residents, businesses and the council — were consulted.",bank:["stakeholders","skylines","policies"],emoji:"🧑‍🤝‍🧑"},
   {before:"The housing crisis has reached an",blank:"unprecedented",after:"level.",bank:["unprecedented","affordable","overcrowded"],emoji:"❗"},
   {before:"Mixed neighbourhoods can strengthen",blank:"social cohesion",after:".",bank:["social cohesion","urban sprawl","rent"],emoji:"🤝"},
  ],
  tf:{sub:"Read the summary: 'A 2025 city report found that average rents rose 31% in five years, while wages rose 12%. One in four residents now spends over half their income on housing. The report recommends rent caps and 5,000 new council flats, but does not estimate the cost.'",tag:"REPORT SUMMARY",items:[
   {text:"Rents rose faster than wages.",answer:0},{text:"Wages rose by 31%.",answer:1},{text:"25% of residents spend more than half their income on housing.",answer:0},
   {text:"The report recommends rent caps.",answer:0},{text:"The report says the plan will cost €2 billion.",answer:1},{text:"The report suggests building new council flats.",answer:0}]},
  listen:[
   {word:"The policy has exacerbated inequality.",options:["The policy has exacerbated inequality.","The policy has alleviated inequality.","The police have exacerbated inequality."],correct:0},
   {word:"It's a double-edged sword.",options:["It's a double-edged sword.","It's a double-headed sword.","It's a double-edged word."],correct:0},
   {word:"Rents have reached unprecedented levels.",options:["Rents have reached unprecedented levels.","Rents have reached unpresented levels.","Tents have reached unprecedented levels."],correct:0},
  ],
  wordle:[["policy","📜"],["tackle","🛠️"],["housing","🏠"],["cohesion","🤝"]]},
 grammar:{title:"What matters is…",emoji:"🎯",label:"Cleft & participles",intro:"Cleft sentences for emphasis, and participle clauses for concise, formal writing.",boxTitle:"Cleft sentences & participle clauses",
  html:`<p><b>Cleft sentences</b> put the focus on one part of the message.</p>${TBL(["Pattern","Example"],[["<b>It is / was … that / who …</b>","<i><b>It was</b> the rent increase <b>that</b> forced us to move.</i>"],["<b>What … is / was …</b>","<i><b>What</b> the city needs <b>is</b> affordable housing.</i>"],["<b>All … is / was …</b>","<i><b>All</b> we want <b>is</b> a safe park.</i>"],["<b>The reason (why) … is that …</b>","<i><b>The reason why</b> people leave <b>is that</b> rents are too high.</i>"]])}<p style="margin-top:12px;"><b>Participle clauses</b> replace a full clause:</p>${TBL(["Type","Example"],[["Present (-ing): active / same time","<i><b>Living</b> in the centre, she never needs a car.</i>"],["Past (-ed): passive","<i><b>Built</b> in 1890, the station is now a museum.</i>"],["Perfect: earlier action","<i><b>Having lived</b> abroad, he understood the problem.</i>"]])}<p style="margin-top:8px;color:#c0392b;font-weight:700;">⚠️ The subject must be the same: ❌ Walking home, the rain started.</p>`,
  quizTag:"EMPHASIS & STYLE",quiz:[
   {q:"___ we need is more green space.",opts:["What","That","It"],correct:0},
   {q:"It was the mayor ___ approved the plan.",opts:["who","what","which is"],correct:0},
   {q:"___ in 1902, the bridge is the city's symbol.",opts:["Built","Building","Having build"],correct:0},
   {q:"___ in the suburbs, I have a long commute.",opts:["Living","Lived","Live"],correct:0},
   {q:"___ the report, the council changed its policy.",opts:["Having read","Read","Having reading"],correct:0},
   {q:"The reason ___ rents rose is that demand exploded.",opts:["why","what","because"],correct:0},
   {q:"All I want ___ a quiet street.",opts:["is","are","that"],correct:0},
   {q:"Which sentence is correct?",opts:["Walking home, I saw the fire.","Walking home, the fire started.","Walked home, I saw the fire."],correct:0},
  ],
  fill:[
   {before:"",blank:"What",after:"surprised me most was the lack of parks.",bank:["What","It","That"],emoji:"🌳"},
   {before:"It was rising rents",blank:"that",after:"pushed artists out of the district.",bank:["that","what","which it"],emoji:"🎨"},
   {before:"",blank:"Designed",after:"by a local architect, the library won several awards.",bank:["Designed","Designing","Having design"],emoji:"🏛️"},
   {before:"",blank:"Having lost",after:"their homes, many families moved to the suburbs.",bank:["Having lost","Losing them","Lost"],emoji:"🏚️"},
   {before:"",blank:"Commuting",after:"two hours a day, he rarely sees his children.",bank:["Commuting","Commuted","To commute"],emoji:"🚆"},
   {before:"",blank:"All",after:"residents are asking for is a fair rent.",bank:["All","What","It"],emoji:"💸"},
   {before:"The reason why the scheme failed is",blank:"that",after:"nobody consulted locals.",bank:["that","because of","what"],emoji:"❌"},
   {before:"",blank:"Surrounded",after:"by motorways, the estate feels cut off.",bank:["Surrounded","Surrounding","Having surround"],emoji:"🛣️"},
  ],
  build:[
   {s:"What the city needs is affordable housing.",pl:"To, czego miasto potrzebuje, to przystępne mieszkania."},
   {s:"It was the residents who started the campaign.",pl:"To mieszkańcy zaczęli kampanię."},
   {s:"Built in 1890, the station is now a museum.",pl:"Zbudowany w 1890 roku dworzec jest teraz muzeum."},
   {s:"Having lived abroad, she understood the problem.",pl:"Mieszkając wcześniej za granicą, rozumiała problem."},
   {s:"All we want is a safe park.",pl:"Wszystko, czego chcemy, to bezpieczny park."},
  ],
  errors:[
   {s:"What the city need is more trams.",wrong:3,ok:"What the city needs is more trams."},
   {s:"It was the council what made the decision.",wrong:4,ok:"It was the council that made the decision."},
   {s:"Building in 1900, the theatre needs repairs.",wrong:0,ok:"Built in 1900, the theatre needs repairs."},
   {s:"Having finish the report, she presented it.",wrong:1,ok:"Having finished the report, she presented it."},
   {s:"All we want are a fair rent.",wrong:3,ok:"All we want is a fair rent."},
  ],
  whack:[
   {q:"___ annoys me is the noise.",opts:["What","It","That"],correct:0},
   {q:"___ in 2010, the tower is the tallest in Poland.",opts:["Completed","Completing","Having complete"],correct:0},
   {q:"It was in 2008 ___ prices began to rise.",opts:["that","what","when it"],correct:0},
   {q:"___ the city, we went straight to the old town.",opts:["Having reached","Reached","Reaching to"],correct:0},
   {q:"The reason ___ I moved is the rent.",opts:["why","what","because"],correct:0},
  ],
  wordle:[["cleft","🎯"],["focus","🔍"],["clause","📝"],["reason","💡"]]},
 reading:{title:"The 15-minute city",emoji:"⏱️",intro:"Read an essay on the '15-minute city', analyse its argument and write your own.",storyTitle:"The 15-Minute City: Utopia or Trap?",label:"Essay",paras:[
   "<b>The 15-Minute City: Utopia or Trap?</b>",
   "Few urban ideas have provoked as much debate in recent years as the '15-minute city' — the notion that every resident should be able to reach work, school, shops, healthcare and green space within a quarter of an hour on foot or by bike. What its supporters promise is nothing less than a quieter, healthier and more neighbourly form of urban life.",
   "The appeal is easy to understand. Having spent decades designing cities around the car, planners are now confronting the consequences: congestion, pollution and long, exhausting commutes. Shortening those distances, advocates argue, would not only cut emissions but also strengthen social cohesion, since people who shop and socialise locally tend to know their neighbours.",
   "Critics, however, see the concept as a double-edged sword. It is the existing neighbourhoods with good amenities, they point out, that will become the most desirable — and therefore the most expensive. Without firm policies on affordable housing, the 15-minute city could exacerbate gentrification, leaving lower-income residents in run-down areas with the very long commutes the idea was meant to eliminate.",
   "What the debate ultimately reveals is that urban design is never purely technical. Whether the 15-minute city becomes a model of fairness or a privilege for the few depends less on planners' maps than on political will. Built carefully, with residents rather than for them, it could alleviate many of the problems it sets out to solve.",
  ],
  tf:[
   {text:"The idea is that everything should be within 15 minutes by car.",answer:1},{text:"Supporters believe it would reduce emissions.",answer:0},{text:"Critics fear it could make some areas more expensive.",answer:0},
   {text:"The author thinks the idea is purely technical.",answer:1},{text:"The concept was invented in Paris.",answer:2},{text:"The author believes residents should be involved in planning.",answer:0},{text:"The essay says lower-income residents might end up with long commutes.",answer:0}],
  quiz:[
   {q:"What is the essay's overall position?",opts:["Balanced — it depends on policy","Completely against","Completely in favour"],correct:0},
   {q:"Why might local shopping strengthen social cohesion?",opts:["People get to know their neighbours","Shops are cheaper","There are fewer cars to park"],correct:0},
   {q:"What do critics call the concept?",opts:["A double-edged sword","A utopia","A grassroots movement"],correct:0},
   {q:"'Built carefully, with residents…' is an example of…",opts:["a participle clause","a cleft sentence","a mixed conditional"],correct:0},
   {q:"'political will' means…",opts:["the determination of politicians to act","a law about wills","a type of vote"],correct:0},
  ],
  typed:[
   {prompt:"To, czego potrzebujemy, to więcej terenów zielonych.",answers:["What we need is more green space","What we need is more green spaces"]},
   {prompt:"To czynsz zmusił nas do przeprowadzki.",answers:["It was the rent that forced us to move","It was the rent which forced us to move"]},
   {prompt:"Wysokie czynsze pogłębiają nierówności.",answers:["High rents exacerbate inequality","High rents are exacerbating inequality"]},
   {prompt:"Dojeżdżam do pracy godzinę.",answers:["I commute for an hour","My commute is an hour","I commute an hour to work","My commute takes an hour"]},
  ],
  writing:{label:"Essay",title:"Your essay ✍️",sub:"'Cities should be designed for people, not cars.' Discuss (min. 180 words). Use at least two cleft sentences and two participle clauses.",starters:["It is often argued that…","What is frequently overlooked, however, is…","Having considered both sides,…","It is the … that…","Designed with residents in mind, …","On balance, I would argue that…"],min:180},
  wordle:[["utopia","🌈"],["planner","📐"],["debate","🗣️"],["fairness","⚖️"]]},
 test:{grammar:[
   {q:"___ I miss most is the sea.",opts:["What","It","That"],correct:0},{q:"It was the residents ___ saved the park.",opts:["who","what","which it"],correct:0},
   {q:"___ by fire in 1945, the church was rebuilt.",opts:["Destroyed","Destroying","Having destroy"],correct:0},{q:"___ the contract, he started work.",opts:["Having signed","Signed","Having signing"],correct:0},
   {q:"'exacerbate' =",opts:["make worse","make better","measure"],correct:0},{q:"'alleviate' =",opts:["make less severe","make worse","ignore"],correct:0},
   {q:"All we need ___ time.",opts:["is","are","that"],correct:0},{q:"Wealthy newcomers push up prices:",opts:["gentrification","urban sprawl","grassroots"],correct:0}],
  errors:[
   {s:"What I need are a holiday.",wrong:3,ok:"What I need is a holiday."},
   {s:"It was Anna which organised the protest.",wrong:3,ok:"It was Anna who organised the protest."},
   {s:"Writing in 1850, the novel is still popular.",wrong:0,ok:"Written in 1850, the novel is still popular."},
   {s:"Having reading the report, she agreed with it.",wrong:1,ok:"Having read the report, she agreed with it."}],
  typed:[
   {prompt:"To, co mnie martwi, to rosnące czynsze.",answers:["What worries me is rising rents","What worries me is the rising rents"]},
   {prompt:"Mieszkając w centrum, nie potrzebuję samochodu.",answers:["Living in the centre I don't need a car","Living in the center I don't need a car","Living in the centre I do not need a car"]},
   {prompt:"To był bezprecedensowy kryzys.",answers:["It was an unprecedented crisis"]},
   {prompt:"Musimy zmierzyć się z nierównością.",answers:["We must tackle inequality","We have to tackle inequality","We need to tackle inequality"]}]},
});

/* ================= KIDS A0 · Animals ================= */
mkUnit({id:"ka0",level:"A0",track:"kids",topic:"Animals",title:"Animal Friends",emoji:"🐾",badge:"Animal Expert",sub:"Pets, farm and wild animals — and a / an, plurals.",
 sets:[
  {title:"Pets & farm animals",label:"Pets",words:V([
   ["dog","pies","🐕"],["cat","kot","🐈"],["rabbit","królik","🐇"],["fish","ryba","🐟"],["bird","ptak","🐦"],["horse","koń","🐎"],
   ["cow","krowa","🐄"],["pig","świnia","🐖"],["sheep","owca","🐑"],["duck","kaczka","🦆"],["hen","kura","🐔"],["mouse","mysz","🐁"]])},
  {title:"Wild animals",label:"Wild",findTitle:"Which animal is it? 🔎",words:V([
   ["lion","lew","🦁"],["tiger","tygrys","🐅"],["elephant","słoń","🐘"],["monkey","małpa","🐒"],["giraffe","żyrafa","🦒"],["zebra","zebra","🦓"],
   ["bear","niedźwiedź","🐻"],["snake","wąż","🐍"],["crocodile","krokodyl","🐊"],["penguin","pingwin","🐧"],["frog","żaba","🐸"],["owl","sowa","🦉"]])},
 ],
 l1:{title:"My pet",emoji:"🐕",intro:"Twelve animals from home and the farm. Woof! Moo! Quack!",quizTag:"WHO SAYS IT?",quizLabel:"Who says it?",quiz:[
   {q:"Woof woof! 🔊",opts:["dog","cat","cow"],correct:0},{q:"Meow! 🔊",opts:["cat","duck","pig"],correct:0},
   {q:"Moo! 🔊",opts:["cow","sheep","horse"],correct:0},{q:"Quack quack! 🔊",opts:["duck","hen","fish"],correct:0},
   {q:"Oink oink! 🔊",opts:["pig","dog","rabbit"],correct:0},{q:"Baa! 🔊",opts:["sheep","cow","bird"],correct:0},
   {q:"Tweet tweet! 🔊",opts:["bird","mouse","horse"],correct:0},{q:"Neigh! 🔊",opts:["horse","pig","cat"],correct:0},
  ],
  odd:[
   {opts:["dog","cat","rabbit","lion"],odd:3,why:"A lion isn't a pet!"},
   {opts:["cow","pig","sheep","fish"],odd:3,why:"A fish doesn't live on a farm field — it lives in water."},
   {opts:["duck","hen","bird","horse"],odd:3,why:"A horse can't fly — the others have wings."},
   {opts:["cat","dog","mouse","red"],odd:3,why:"Red is a colour, not an animal."},
  ],
  move:[
   {emoji:"🐕",text:"Be a dog! Say 'Woof!' and wag your tail! 🐕"},{emoji:"🐇",text:"Hop like a rabbit — five big jumps! 🐇"},
   {emoji:"🦆",text:"Walk like a duck and say 'Quack!' 🦆"},{emoji:"🐎",text:"Gallop like a horse around the room! 🐎"},
  ],
  wordle:[["horse","🐎"],["sheep","🐑"],["mouse","🐁"],["duck","🦆"]]},
 l2:{title:"At the zoo",emoji:"🦁",intro:"Lions, elephants, penguins… and Leo's lemur cousins! Twelve wild animals.",fillTag:"WILD ANIMALS",fill:[
   {before:"The",blank:"elephant",after:"is very big and grey.",bank:["elephant","frog","mouse"],emoji:"🐘"},
   {before:"The",blank:"giraffe",after:"has a long neck.",bank:["giraffe","snake","penguin"],emoji:"🦒"},
   {before:"The",blank:"zebra",after:"is black and white.",bank:["zebra","lion","bear"],emoji:"🦓"},
   {before:"The",blank:"penguin",after:"lives where it's cold.",bank:["penguin","monkey","tiger"],emoji:"🐧"},
   {before:"The",blank:"frog",after:"is small and green.",bank:["frog","bear","elephant"],emoji:"🐸"},
   {before:"The",blank:"monkey",after:"likes bananas.",bank:["monkey","crocodile","snake"],emoji:"🐒"},
   {before:"The",blank:"lion",after:"is the king of animals.",bank:["lion","duck","frog"],emoji:"🦁"},
   {before:"The",blank:"snake",after:"has no legs.",bank:["snake","tiger","zebra"],emoji:"🐍"},
  ],
  tf:{sub:"Look and think! 🐘🦒🐧🐍",tag:"TRUE OR FALSE?",items:[
   {text:"An elephant is small.",answer:1},{text:"A giraffe has a long neck.",answer:0},{text:"A penguin can fly.",answer:1},
   {text:"A snake has four legs.",answer:1},{text:"A zebra is black and white.",answer:0},{text:"A frog can jump.",answer:0}]},
  move:[
   {emoji:"🐘",text:"Be an elephant — swing your long trunk! 🐘"},{emoji:"🐒",text:"Be a monkey — scratch your head and say 'Oo-oo!' 🐒"},
   {emoji:"🐧",text:"Waddle like a penguin! 🐧"},{emoji:"🐸",text:"Jump like a frog — ribbit! 🐸"},
  ],
  wordle:[["lion","🦁"],["tiger","🐅"],["zebra","🦓"],["snake","🐍"],["bear","🐻"]]},
 grammar:{title:"A cat, two cats",emoji:"🔢",label:"a / an & plurals",intro:"A or an? One cat, two cats — and some funny plurals!",boxTitle:"a / an and plurals",
  html:`<p>Use <b>a</b> before a consonant sound and <b>an</b> before a vowel sound (a, e, i, o, u).</p>${TBL(["a","an"],[["<b>a</b> dog 🐕","<b>an</b> elephant 🐘"],["<b>a</b> cat 🐈","<b>an</b> owl 🦉"],["<b>a</b> lion 🦁","<b>an</b> ant 🐜"]])}<p style="margin-top:12px;">Plurals: one cat → two cat<b>s</b> · one fox → two fox<b>es</b></p><p style="margin-top:8px;">Funny ones: one mouse → two <b>mice</b> · one sheep → two <b>sheep</b> · one fish → two <b>fish</b></p>`,
  quizTag:"A OR AN?",quiz:[
   {q:"___ elephant",opts:["an","a"],correct:0},{q:"___ dog",opts:["a","an"],correct:0},
   {q:"___ owl",opts:["an","a"],correct:0},{q:"___ tiger",opts:["a","an"],correct:0},
   {q:"one mouse, two ___",opts:["mice","mouses","mousies"],correct:0},{q:"one cat, three ___",opts:["cats","cat","cates"],correct:0},
   {q:"one sheep, five ___",opts:["sheep","sheeps","sheepes"],correct:0},{q:"one fox, two ___",opts:["foxes","foxs","fox"],correct:0},
  ],
  fill:[
   {before:"I have got",blank:"a",after:"rabbit.",bank:["a","an"],emoji:"🐇"},
   {before:"It's",blank:"an",after:"elephant!",bank:["an","a"],emoji:"🐘"},
   {before:"I can see three",blank:"ducks",after:".",bank:["ducks","duck","duckes"],emoji:"🦆"},
   {before:"There are two",blank:"mice",after:"in the house!",bank:["mice","mouses","mouse"],emoji:"🐁"},
   {before:"The farmer has ten",blank:"sheep",after:".",bank:["sheep","sheeps","sheepes"],emoji:"🐑"},
   {before:"Look! It's",blank:"a",after:"monkey!",bank:["a","an"],emoji:"🐒"},
   {before:"I like",blank:"horses",after:".",bank:["horses","horse","horsies"],emoji:"🐎"},
   {before:"My cat is",blank:"black",after:".",bank:["black","an","cats"],emoji:"🐈‍⬛"},
  ],
  build:[
   {s:"I have got a dog.",pl:"Mam psa."},{s:"It is an elephant.",pl:"To jest słoń."},
   {s:"I like cats.",pl:"Lubię koty."},{s:"The lion is big.",pl:"Lew jest duży."},{s:"I can see two mice.",pl:"Widzę dwie myszy."},
  ],
  errors:[
   {s:"It is a elephant.",wrong:2,ok:"It is an elephant."},
   {s:"I have got two cat.",wrong:4,ok:"I have got two cats."},
   {s:"Look at the three mouses!",wrong:4,ok:"Look at the three mice!"},
   {s:"I can see an dog.",wrong:3,ok:"I can see a dog."},
   {s:"There are five sheeps.",wrong:3,ok:"There are five sheep."},
  ],
  whack:[
   {q:"___ owl 🦉",opts:["an","a"],correct:0},{q:"two ___ 🐁🐁",opts:["mice","mouses"],correct:0},
   {q:"___ snake 🐍",opts:["a","an"],correct:0},{q:"four ___ 🐸🐸🐸🐸",opts:["frogs","frog"],correct:0},
   {q:"___ ant 🐜",opts:["an","a"],correct:0},
  ],
  wordle:[["mice","🐁"],["sheep","🐑"],["foxes","🦊"],["cats","🐈"]]},
 reading:{title:"Leo at the zoo",emoji:"🦒",intro:"Read about Leo's trip to the zoo, then answer, translate and write about your favourite animal!",storyTitle:"Leo at the Zoo",paras:[
   "<b>Leo at the Zoo</b> 🦁",
   "Today Leo is at the zoo with his friend Mia. 'Look, Mia! A giraffe!' says Leo. The giraffe is very tall. It has got a long neck and it eats leaves.",
   "Next they see two elephants. They are big and grey. One elephant is playing with water. Splash! Mia is wet! She laughs.",
   "Then they go to the penguins. The penguins are black and white. They can't fly, but they can swim very fast.",
   "At the end, Leo finds the lemurs. 'Hello, cousins!' he shouts. The lemurs have got long stripy tails, just like Leo. It's the best day ever! 🐒",
  ],
  tf:[
   {text:"Leo is at the zoo with Mia.",answer:0},{text:"The giraffe is small.",answer:1},{text:"There are two elephants.",answer:0},
   {text:"Leo gets wet.",answer:1},{text:"Penguins can swim fast.",answer:0},{text:"Mia's favourite animal is the tiger.",answer:2},{text:"The lemurs have got stripy tails.",answer:0}],
  quiz:[
   {q:"What does the giraffe eat?",opts:["Leaves","Fish","Bananas"],correct:0},
   {q:"What colour are the elephants?",opts:["Grey","Brown","White"],correct:0},
   {q:"Who gets wet?",opts:["Mia","Leo","The penguin"],correct:0},
   {q:"What can't penguins do?",opts:["Fly","Swim","Walk"],correct:0},
   {q:"Who are Leo's 'cousins'?",opts:["The lemurs","The penguins","The elephants"],correct:0},
  ],
  typed:[
   {prompt:"Mam kota.",answers:["I have got a cat","I've got a cat","I have a cat"]},
   {prompt:"To jest słoń.",answers:["It is an elephant","It's an elephant","This is an elephant"]},
   {prompt:"Lubię psy.",answers:["I like dogs"]},
   {prompt:"Żyrafa jest wysoka.",answers:["The giraffe is tall","A giraffe is tall"]},
  ],
  writing:{label:"My animal",title:"My favourite animal ✍️",sub:"Write about your favourite animal (min. 20 words).",starters:["My favourite animal is…","It is big / small.","It is (colour)…","It has got…","It can…","I like it because…"],min:20},
  wordle:[["zoo","🦁"],["tall","🦒"],["swim","🏊"],["tail","🐒"]]},
 test:{grammar:[
   {q:"___ elephant",opts:["an","a"],correct:0},{q:"___ horse",opts:["a","an"],correct:0},
   {q:"one mouse → two ___",opts:["mice","mouses","mouse"],correct:0},{q:"one dog → two ___",opts:["dogs","doges","dog"],correct:0},
   {q:"🐄 =",opts:["cow","pig","duck"],correct:0},{q:"🐧 =",opts:["penguin","bird","duck"],correct:0},
   {q:"one sheep → three ___",opts:["sheep","sheeps","sheepes"],correct:0},{q:"___ ant",opts:["an","a"],correct:0}],
  errors:[
   {s:"I have got an rabbit.",wrong:3,ok:"I have got a rabbit."},
   {s:"Look at the two lion!",wrong:4,ok:"Look at the two lions!"},
   {s:"It is a owl.",wrong:2,ok:"It is an owl."},
   {s:"I can see four mouses.",wrong:4,ok:"I can see four mice."}],
  typed:[
   {prompt:"Mam psa.",answers:["I have got a dog","I've got a dog","I have a dog"]},
   {prompt:"Widzę dwie kaczki.",answers:["I can see two ducks","I see two ducks"]},
   {prompt:"Lew jest duży.",answers:["The lion is big","A lion is big"]},
   {prompt:"Lubię małpy.",answers:["I like monkeys"]}]},
});

/* ================= KIDS A2 · Summer Holidays ================= */
mkUnit({id:"ka2",level:"A2",track:"kids",topic:"Holidays",title:"Summer Holidays",emoji:"🏖️",badge:"Holiday Hero",sub:"Beach, mountains and camping — and the Past Simple with was / were.",
 sets:[
  {title:"Holiday places & things",label:"Holiday",words:V([
   ["beach","plaża","🏖️"],["sea","morze","🌊"],["mountains","góry","⛰️"],["lake","jezioro","🏞️"],["forest","las","🌲"],["tent","namiot","⛺"],
   ["suitcase","walizka","🧳"],["sunglasses","okulary przeciwsłoneczne","🕶️"],["sun cream","krem z filtrem","🧴"],["swimsuit","strój kąpielowy","🩱"],["map","mapa","🗺️"],["postcard","pocztówka","💌"]])},
  {title:"Holiday activities",label:"Fun",findTitle:"What are they doing? 🔎",words:V([
   ["swim","pływać","🏊"],["build a sandcastle","budować zamek z piasku","🏰"],["go hiking","chodzić po górach","🥾"],["go camping","jechać pod namiot","🏕️"],["take photos","robić zdjęcia","📸"],["eat ice cream","jeść lody","🍦"],
   ["ride a bike","jeździć na rowerze","🚲"],["go fishing","łowić ryby","🎣"],["play volleyball","grać w siatkówkę","🏐"],["visit a castle","zwiedzać zamek","🏯"],["sunbathe","opalać się","😎"],["sleep late","spać długo","😴"]])},
 ],
 l1:{title:"Pack your bag!",emoji:"🧳",intro:"Beach or mountains? Twelve words for holiday places and things to pack.",quizTag:"WHAT DO YOU NEED?",quizLabel:"What do you need?",quiz:[
   {q:"It's very sunny. You need…",opts:["sun cream","a tent","a map"],correct:0},
   {q:"You want to swim. You need a…",opts:["swimsuit","postcard","suitcase"],correct:0},
   {q:"You sleep outside in a…",opts:["tent","lake","sea"],correct:0},
   {q:"You put your clothes in a…",opts:["suitcase","forest","beach"],correct:0},
   {q:"You don't know the way. You need a…",opts:["map","swimsuit","sunglasses"],correct:0},
   {q:"You write to Grandma from holiday on a…",opts:["postcard","map","tent"],correct:0},
   {q:"Very high, with snow on top:",opts:["mountains","lake","beach"],correct:0},
   {q:"Lots and lots of trees:",opts:["forest","sea","beach"],correct:0},
  ],
  odd:[
   {opts:["beach","sea","sand","mountains"],odd:3,why:"Mountains aren't at the seaside."},
   {opts:["swimsuit","sunglasses","sun cream","scarf"],odd:3,why:"You don't need a scarf on a hot beach!"},
   {opts:["lake","sea","river","tent"],odd:3,why:"A tent isn't water."},
   {opts:["map","postcard","suitcase","forest"],odd:3,why:"You can't put a forest in your bag!"},
  ],
  move:[
   {emoji:"🧳",text:"Pack an invisible suitcase — fast! 🧳"},{emoji:"🧴",text:"Put on sun cream — face, arms, nose! 🧴"},
   {emoji:"🏊",text:"Swim on the spot — 10 strokes! 🏊"},{emoji:"🕶️",text:"Put on your sunglasses and look cool! 😎"},
  ],
  wordle:[["beach","🏖️"],["tent","⛺"],["lake","🏞️"],["map","🗺️"],["forest","🌲"]]},
 l2:{title:"Holiday fun",emoji:"🏐",intro:"Swim, hike, camp, fish… twelve things to do on holiday!",fillTag:"HOLIDAY FUN",fill:[
   {before:"We",blank:"build a sandcastle",after:"on the beach.",bank:["build a sandcastle","go fishing","sleep late"],emoji:"🏰"},
   {before:"In the mountains we",blank:"go hiking",after:".",bank:["go hiking","swim","sunbathe"],emoji:"🥾"},
   {before:"Dad and I",blank:"go fishing",after:"on the lake.",bank:["go fishing","take photos","ride a bike"],emoji:"🎣"},
   {before:"Mum likes to",blank:"take photos",after:"of everything!",bank:["take photos","eat ice cream","go camping"],emoji:"📸"},
   {before:"It's hot! Let's",blank:"eat ice cream",after:".",bank:["eat ice cream","go hiking","visit a castle"],emoji:"🍦"},
   {before:"On holiday I can",blank:"sleep late",after:"— no school!",bank:["sleep late","swim","build"],emoji:"😴"},
   {before:"We",blank:"play volleyball",after:"with our new friends.",bank:["play volleyball","go fishing","sunbathe"],emoji:"🏐"},
   {before:"We",blank:"visit a castle",after:"with a king's room inside!",bank:["visit a castle","ride a bike","go camping"],emoji:"🏯"},
  ],
  tf:{sub:"Read Ola's postcard: 'Hi Grandma! We are at the seaside. The weather is hot and sunny. Every day I swim and build sandcastles. Dad goes fishing. Yesterday we ate ice cream. Love, Ola'",tag:"A POSTCARD",items:[
   {text:"Ola is in the mountains.",answer:1},{text:"The weather is hot.",answer:0},{text:"Ola builds sandcastles.",answer:0},
   {text:"Mum goes fishing.",answer:1},{text:"They ate ice cream yesterday.",answer:0},{text:"Ola writes to her grandma.",answer:0}]},
  move:[
   {emoji:"🥾",text:"Hike up a big mountain — march on the spot! 🥾"},{emoji:"🎣",text:"Go fishing — throw your line and catch a big fish! 🎣"},
   {emoji:"🏐",text:"Play volleyball — jump and hit the ball! 🏐"},{emoji:"📸",text:"Take a photo — say 'Cheese!' 📸"},
  ],
  wordle:[["swim","🏊"],["photo","📸"],["bike","🚲"],["camping","🏕️"]]},
 grammar:{title:"It was great!",emoji:"⏪",label:"was / were + -ed",intro:"Talk about your holiday: was / were and past verbs with -ed (plus a few special ones).",boxTitle:"was / were & Past Simple",
  html:`${TBL(["was","were"],[["I <b>was</b> at the beach.","We <b>were</b> in the mountains."],["He / She / It <b>was</b> happy.","You / They <b>were</b> tired."],["It <b>wasn't</b> cold.","They <b>weren't</b> at home."]])}<p style="margin-top:12px;"><b>Past verbs</b> often end in <b>-ed</b>: play → play<b>ed</b>, visit → visit<b>ed</b>, swim? ➜ <b>swam</b> (special!)</p>${TBL(["-ed verbs","Special verbs"],[["play → <b>played</b>","go → <b>went</b>"],["visit → <b>visited</b>","swim → <b>swam</b>"],["walk → <b>walked</b>","eat → <b>ate</b>"],["camp → <b>camped</b>","see → <b>saw</b>"]])}`,
  quizTag:"WAS OR WERE?",quiz:[
   {q:"I ___ at the seaside.",opts:["was","were"],correct:0},{q:"We ___ in a tent.",opts:["were","was"],correct:0},
   {q:"The sea ___ warm.",opts:["was","were"],correct:0},{q:"They ___ very happy.",opts:["were","was"],correct:0},
   {q:"play →",opts:["played","plaied","playd"],correct:0},{q:"go →",opts:["went","goed","goes"],correct:0},
   {q:"swim →",opts:["swam","swimmed","swims"],correct:0},{q:"eat →",opts:["ate","eated","eats"],correct:0},
  ],
  fill:[
   {before:"Last summer I",blank:"was",after:"in Spain.",bank:["was","were","am"],emoji:"🇪🇸"},
   {before:"My parents",blank:"were",after:"very relaxed.",bank:["were","was","is"],emoji:"😌"},
   {before:"We",blank:"played",after:"volleyball every day.",bank:["played","play","plaid"],emoji:"🏐"},
   {before:"I",blank:"swam",after:"in the sea.",bank:["swam","swimmed","swim"],emoji:"🏊"},
   {before:"We",blank:"went",after:"to the mountains in August.",bank:["went","goed","go"],emoji:"⛰️"},
   {before:"My brother",blank:"ate",after:"three ice creams!",bank:["ate","eated","eat"],emoji:"🍦"},
   {before:"The weather",blank:"wasn't",after:"bad.",bank:["wasn't","weren't","isn't"],emoji:"☀️"},
   {before:"We",blank:"visited",after:"an old castle.",bank:["visited","visit","visitted"],emoji:"🏯"},
  ],
  build:[
   {s:"I was at the beach.",pl:"Byłem na plaży."},{s:"We went to the mountains.",pl:"Pojechaliśmy w góry."},
   {s:"The sea was warm.",pl:"Morze było ciepłe."},{s:"We played volleyball.",pl:"Graliśmy w siatkówkę."},
   {s:"I ate a big ice cream.",pl:"Zjadłem dużego loda."},
  ],
  errors:[
   {s:"We was at the lake.",wrong:1,ok:"We were at the lake."},
   {s:"I goed to the beach.",wrong:1,ok:"I went to the beach."},
   {s:"They was very happy.",wrong:1,ok:"They were very happy."},
   {s:"I swimmed in the sea.",wrong:1,ok:"I swam in the sea."},
   {s:"We play football yesterday.",wrong:1,ok:"We played football yesterday."},
  ],
  whack:[
   {q:"She ___ tired.",opts:["was","were"],correct:0},{q:"We ___ a castle.",opts:["visited","visit"],correct:0},
   {q:"They ___ to Italy.",opts:["went","goed"],correct:0},{q:"You ___ funny!",opts:["were","was"],correct:0},
   {q:"I ___ a big fish!",opts:["saw","seed"],correct:0},
  ],
  wordle:[["went","🚶"],["swam","🏊"],["were","✅"],["played","🏐"]]},
 reading:{title:"Leo's holiday",emoji:"🏕️",intro:"Read Leo's holiday diary, then answer, translate and write about YOUR holiday!",storyTitle:"Leo's Holiday Diary",label:"Diary",paras:[
   "<b>Leo's Holiday Diary</b> 🏕️",
   "<b>Monday:</b> We arrived at the lake in the mountains. Dad and I put up the tent. It was hard! The tent fell down two times. Mum laughed and took photos.",
   "<b>Tuesday:</b> It was hot and sunny. I swam in the lake and Mum sunbathed. In the afternoon we went fishing, but we didn't catch any fish. We ate pizza instead. 🍕",
   "<b>Wednesday:</b> We went hiking. The mountains were very high and my legs were tired. At the top we saw a beautiful view and I sent a postcard to my friend Mia.",
   "<b>Thursday:</b> It rained all day! We played cards in the tent and told funny stories. It was the best day of the holiday!",
  ],
  tf:[
   {text:"Leo's family went to the seaside.",answer:1},{text:"The tent fell down two times.",answer:0},{text:"On Tuesday it was sunny.",answer:0},
   {text:"They caught three fish.",answer:1},{text:"Leo sent a postcard to Mia.",answer:0},{text:"They went home on Friday.",answer:2},{text:"Leo liked the rainy day.",answer:0}],
  quiz:[
   {q:"Where did they stay?",opts:["In a tent","In a hotel","At Grandma's"],correct:0},
   {q:"What did they eat on Tuesday?",opts:["Pizza","Fish","Ice cream"],correct:0},
   {q:"Why were Leo's legs tired?",opts:["They went hiking","They swam","They played cards"],correct:0},
   {q:"What did they do on Thursday?",opts:["Played cards","Went fishing","Swam in the lake"],correct:0},
   {q:"Who took photos?",opts:["Mum","Dad","Mia"],correct:0},
  ],
  typed:[
   {prompt:"Byłem na plaży.",answers:["I was at the beach","I was on the beach"]},
   {prompt:"Pływaliśmy w jeziorze.",answers:["We swam in the lake"]},
   {prompt:"Było gorąco.",answers:["It was hot"]},
   {prompt:"Pojechaliśmy w góry.",answers:["We went to the mountains"]},
  ],
  writing:{label:"My holiday",title:"My last holiday ✍️",sub:"Write about your last holiday (min. 30 words). Use was / were and past verbs!",starters:["Last summer I went to…","I was with…","The weather was…","Every day I…","I ate…","It was great because…"],min:30},
  wordle:[["diary","📔"],["rain","🌧️"],["cards","🃏"],["pizza","🍕"]]},
 test:{grammar:[
   {q:"We ___ at the lake.",opts:["were","was"],correct:0},{q:"It ___ sunny.",opts:["was","were"],correct:0},
   {q:"go →",opts:["went","goed","gone"],correct:0},{q:"swim →",opts:["swam","swimmed","swum"],correct:0},
   {q:"I ___ volleyball.",opts:["played","play","plaied"],correct:0},{q:"They ___ at home.",opts:["weren't","wasn't","isn't"],correct:0},
   {q:"🏕️ =",opts:["go camping","go fishing","go hiking"],correct:0},{q:"🧴 =",opts:["sun cream","suitcase","swimsuit"],correct:0}],
  errors:[
   {s:"I were at the seaside.",wrong:1,ok:"I was at the seaside."},
   {s:"We eated pizza.",wrong:1,ok:"We ate pizza."},
   {s:"She visit a castle yesterday.",wrong:1,ok:"She visited a castle yesterday."},
   {s:"The mountains was high.",wrong:2,ok:"The mountains were high."}],
  typed:[
   {prompt:"Byliśmy w górach.",answers:["We were in the mountains"]},
   {prompt:"Zjadłem lody.",answers:["I ate ice cream","I ate an ice cream"]},
   {prompt:"Morze było zimne.",answers:["The sea was cold"]},
   {prompt:"Graliśmy w siatkówkę.",answers:["We played volleyball"]}]},
});

/* ---------- CEFR levels (whole app: A0 → C1) ---------- */
const LEVELS=[
 {id:"A0",name:"Starter",desc:"Your very first words: hello, numbers, colours, family.",adesc:"First contact: greetings, personal details and the verb 'to be'.",emoji:"🌱"},
 {id:"A1",name:"Beginner",desc:"Simple everyday life: routines, home, school, free time.",adesc:"Everyday situations: food, cafés, shopping and simple requests.",emoji:"🌿"},
 {id:"A2",name:"Elementary",desc:"Talk about habits, past events and plans.",adesc:"Travel, past experiences and getting around abroad.",emoji:"🌳"},
 {id:"B1",name:"Intermediate",desc:"Stories, opinions, travel and the world of work.",emoji:"🚀"},
 {id:"B2",name:"Upper-intermediate",desc:"Discuss, argue and understand longer texts.",emoji:"🎯"},
 {id:"C1",name:"Advanced",desc:"Fluent, precise English for school, work and life.",emoji:"🏆"},
];
COURSE.units[0].level="A1"; COURSE.units[1].level="A1"; COURSE.units[2].level="A2";
COURSE.units.forEach(u=>{if(!u.topic)u.topic="Daily Routines";});
COURSE.units.sort((a,b)=>LEVELS.findIndex(l=>l.id===a.level)-LEVELS.findIndex(l=>l.id===b.level));

/* ---------- Scale by level: more activities at higher levels, long unit tests ---------- */
(function(){
 const LV_IDX={A0:0,A1:1,A2:2,B1:3,B2:4,C1:5};
 const uniq=a=>{const s=new Set();return a.filter(x=>{const k=x.en||x.s||x.word||JSON.stringify(x);if(s.has(k))return false;s.add(k);return true;});};
 const pick=(arr,n,step)=>{const out=[];if(!arr.length)return out;step=step||1;for(let i=0;out.length<Math.min(n,arr.length);i++){const x=arr[(i*step)%arr.length];if(!out.includes(x))out.push(x);if(i>arr.length*4)break;}return out;};
 const distract=(arr,i,key)=>{const a=arr[(i+1)%arr.length][key],b=arr[(i+3)%arr.length][key],c=arr[(i+5)%arr.length][key];return [...new Set([a,b,c])].filter(x=>x!==arr[i][key]).slice(0,2);};
 const plToEnQuiz=(words,tag,n)=>({type:"quiz",label:"Word quiz",tag,done:"Word quiz done! 🎯",qs:pick(words,n).map(w=>{const i=words.indexOf(w);return {q:`'${w.pl}' =`,opts:[w.en,...distract(words,i,'en')],correct:0};})});
 const enToPlQuiz=(words,tag,n)=>({type:"quiz",label:"What does it mean?",tag,done:"Done! 🎯",qs:pick(words,n,3).map(w=>{const i=words.indexOf(w);return {q:`${w.emoji} '${w.en}' means…`,opts:[w.pl,...distract(words,i,'pl')],correct:0};})});
 const typedWords=(words,id,n)=>({type:"typed",label:"Write the words",tag:"TYPE IT",title:"Write it in English ✍️",blocks:[{id,label:"🇵🇱 → 🇬🇧 Write the English word or phrase",items:pick(words,n,2).map(w=>({prompt:`${w.emoji} ${w.pl}`,answers:[w.en]}))}]});

 COURSE.units.forEach(u=>{
  const li=LV_IDX[u.level]||0;
  const extraCount=[0,1,1,2,2,3][li];
  const unitWords=uniq(u.lessons.filter(l=>!l.test).flatMap(l=>l.bonus||[]));
  /* 1) more activities per lesson at higher levels */
  u.lessons.filter(l=>!l.test).forEach((l,k)=>{
   const words=uniq(l.bonus||unitWords);
   const qn=6+li; // longer at higher levels
   const cands=[
    plToEnQuiz(words,'WORD QUIZ',qn),
    typedWords(words,l.id+'-tw',4+li),
    enToPlQuiz(words,'MEANING QUIZ',qn),
   ];
   if(!l.zones.some(z=>z.type==='memory')) cands.push({type:"memory",label:"Memory",pairs:memOf(words.slice(0,8))});
   const insertAt=l.zones.findIndex(z=>z.type==='wordle');
   const add=cands.slice(0,extraCount);
   if(insertAt>=0) l.zones.splice(insertAt,0,...add); else l.zones.push(...add);
  });
  /* 2) long final test (~10+ min) built from the whole unit */
  const t=u.lessons.find(l=>l.test); if(!t) return;
  const zonesOf=type=>u.lessons.filter(l=>!l.test).flatMap(l=>l.zones.filter(z=>z.type===type));
  const all=type=>uniq(zonesOf(type).flatMap(z=>z.items||z.qs||[]));
  const big=8+li; // more items at higher levels
  const vocabN=Math.min(unitWords.length,16+2*li);
  const extra=[];
  extra.push(plToEnQuiz(unitWords,u.level+' TEST · ALL WORDS',vocabN));
  extra[0].label="All words";
  const fills=all('fill'); if(fills.length) extra.push({type:"fill",label:"Fill it",tag:u.level+" TEST · FILL THE GAP",items:pick(fills,big,3)});
  const builds=all('build'); if(builds.length) extra.push({type:"build",label:"Build it",items:pick(builds,Math.min(big-2,8),2)});
  const listens=all('listen'); if(listens.length) extra.push({type:"listen",label:"Listening",items:pick(listens,6,2)});
  const errs=all('errors'); if(errs.length) extra.push({type:"errors",label:"More errors",items:pick(errs,Math.min(big-2,8),3)});
  const tfs=zonesOf('tf').filter(z=>z.labels===TF3);
  extra.push(enToPlQuiz(unitWords,u.level+' TEST · MEANINGS',Math.min(unitWords.length,10+li)));
  extra.push(typedWords(unitWords,t.id+'-tw',8+li));
  // keep the hand-written test zones, add the generated ones around them
  const hand=t.zones;
  t.zones=[extra[0],...hand.slice(0,2),...extra.slice(1),...hand.slice(2)];
  t.intro+=" It's a long one — about 10–15 minutes. Good luck! 🍀";
 });
})();

const ALL_LESSONS=[];
COURSE.units.forEach((u,ui)=>u.lessons.forEach((l,li)=>{l.unit=u;l.num=`${ui+1}.${li+1}`;ALL_LESSONS.push(l);}));

/* ---------- course progress (persistence) ---------- */
/* separate tester version: leogrow.netlify.app/tester (or ?tester) keeps its own progress and never syncs to the cloud */
const TESTER_SITE=/^https?:$/.test(location.protocol)&&(/\/tester\/?$/.test(location.pathname)||/[?&]tester\b/.test(location.search));
const SAVE_KEY=TESTER_SITE?'leogrowTesterProgress_v1':'lingrowCourse_dailyRoutines_v1';
let C={lessons:{},active:null};          // lessons[id] = {stars, points, done}
let activeLesson=null, lessonStartScore=0;
function saveProgress(noSync){
  try{
    if(activeLesson) C.active={id:activeLesson.id,current,zoneStars,startScore:lessonStartScore};
    localStorage.setItem(SAVE_KEY, JSON.stringify({score,maxCombo,soundOn,musicOn,C}));
  }catch(e){}
  if(!noSync&&typeof queueSync==='function') queueSync();
}
function loadProgress(){
  try{
    const raw=localStorage.getItem(SAVE_KEY); if(!raw) return;
    const d=JSON.parse(raw);
    if(typeof d.score==='number') score=d.score;
    if(typeof d.maxCombo==='number') maxCombo=d.maxCombo;
    if(typeof d.soundOn==='boolean') soundOn=d.soundOn;
    if(typeof d.musicOn==='boolean') musicOn=d.musicOn;
    if(d.C && typeof d.C==='object') C={lessons:d.C.lessons||{},active:d.C.active||null,placed:d.C.placed||{},review:d.C.review||{},days:d.C.days||[],profile:d.C.profile||null,hab:d.C.hab||null};
  }catch(e){}
}
function resetProgress(){
  if(!confirm('Reset all your progress and start over?')) return;
  try{ localStorage.removeItem(SAVE_KEY); }catch(e){}
  location.reload();
}
const lessonDone=id=>!!(C.lessons[id]&&C.lessons[id].done);
/* tester tools: always available when the file is opened directly; on the website only with ?tester in the address */
/* tester accounts: a real logged-in account (Supabase app_metadata.tester = true) also gets every lesson, level and premium option open — see 'Tester accounts' below */
let TESTER_ALLOWED=location.protocol==='file:'||TESTER_SITE;
let TESTER=TESTER_ALLOWED; try{ const t=localStorage.getItem('lingrowTester'); if(t==='0') TESTER=false; if(t==='1'&&TESTER_ALLOWED) TESTER=true; }catch(e){}
function setTester(on){TESTER=on;try{localStorage.setItem('lingrowTester',on?'1':'0');}catch(e){}document.body.classList.toggle('tester',TESTER);renderCourse();}
function skipLesson(){ if(!activeLesson) return; sfxWhoosh(); go(zones.length-1); }
function nextLessonToDo(tid){
  const ls=tid?trackLessons(tid):ALL_LESSONS, pl=tid&&C.placed&&C.placed[tid];
  if(pl){const f=ls.find(l=>!lessonDone(l.id)&&PL_LV.indexOf(l.unit.level)>=PL_LV.indexOf(pl));if(f)return f;}
  return ls.find(l=>!lessonDone(l.id));
}

/* ---------- zone renderers (data-driven) ---------- */
const GRADED=new Set(["find","spell","memory","balloon","whack","match","fill","build","tf","listen","quiz","odd","errors","wordle"]);
let BONUS_POOL=U1A;
function renderZone(i){
  const z=zones[i], l=activeLesson;
  switch(z.type){
    case "welcome": return rLessonWelcome();
    case "finish":  return rLessonFinish();
    case "cards":   return flashcardSection(z.cards,z.title||"Words","Click the card to see the translation.");
    case "find":    return cbInit(z.cards,'FIND IT!',z.title||"Which one is it? 🔎",z.rounds||5);
    case "spell":   return usInit(z.words,'SPELL IT',"Spell the word");
    case "memory":  return mmInit(z.pairs,'MEMORY',"Find the pairs 🧠");
    case "balloon": return bpInit(z.cards,z.rounds||5);
    case "whack":   return wmInit(z.qs);
    case "match":   return mgInit(z.pairs,"Match the phrase","Match the English phrase to its translation.","MATCH");
    case "grammar": return boxRender('GRAMMAR',z.title,z.html);
    case "fill":    return fbInit(z.items,"Fill the gap","Choose the correct word.",z.tag||"FILL IT");
    case "build":   return sbInit(z.items,"Build the sentence","Build the sentence from the tiles.","BUILD IT");
    case "tf":      return tfInit(z.items,z.title||"True or False?",z.sub||"",z.tag||"TRUE / FALSE",z.labels);
    case "listen":  return lcInit(z.items,"Listen and choose","Listen and choose the same sentence.","LISTEN");
    case "quiz":    return quizRender(l.id+'-'+i,z.qs,z.tag||'QUIZ',z.done||"Quiz complete! 🎯");
    case "odd":     return ooInit(z.items,"Odd one out","Which one doesn't belong?","ODD ONE OUT");
    case "errors":  return ehInit(z.items,"Find the mistake!","Click the wrong word.","ERROR HUNT");
    case "typed":   return trRender(z.blocks,z.tag||'TRANSLATION',z.title||"Translate the sentences 🌍","Type the translation or use \"Show answer\".");
    case "reading": return readingRender('READING',z.title,"Read the story.",z.paras);
    case "move":    return mbInit(z.items);
    case "wordle":  return wdInit(z.words);
    case "wheel":   FORTUNE_ITEMS=z.items; return rFortuneWheel();
    case "writing": WPOINTS=false; return writingRender('WRITING',z.title,z.sub,z.starters,z.min);
  }
  return '';
}
function zoneTasks(z){if(z.type==='typed')return z.blocks.reduce((s,b)=>s+b.items.length,0);if(z.type==='find'||z.type==='balloon')return z.rounds||5;if(z.type==='wordle')return 3;if(z.type==='wheel')return 3;if(z.type==='writing')return Math.ceil(z.min/8);if(z.type==='grammar'||z.type==='reading')return 4;return (z.items||z.qs||z.words||z.pairs||z.cards||[]).length;}
function zoneMinutes(l){const t=l.zones.reduce((s,z)=>s+zoneTasks(z),0);return Math.max(3,Math.round(t*11/60));}
function rLessonWelcome(){
  const l=activeLesson;
  const chips=l.zones.map(z=>`<span class="lesson-chip">${z.label}</span>`).join('');
  return `${zoneTag((l.unit.level?l.unit.level+' · ':'')+(l.test?'UNIT TEST':'LESSON '+l.num))}<h2 class="title">${l.title} ${l.emoji}</h2><p class="sub">${l.intro}</p>
  <div style="text-align:center;">${renderLemur('big',isAdult()?['Welcome back.','Let\'s get to work.','Focus — you\'ve got this.','Short, sharp, effective.']:lemurWelcomeMsgs,isAdult()?110:200)}</div>
  <div class="lesson-chips" style="justify-content:center;margin:6px 0 4px;">${chips}</div>
  <p style="text-align:center;color:#8b8ba0;font-size:13px;font-weight:700;">${l.zones.length} activities · about ${zoneMinutes(l)} minutes</p>
  ${navRow(false,"Let's start! 🚀")}`;
}
function lessonStarsNow(){
  const idx=zones.map((z,i)=>GRADED.has(z.type)?i:-1).filter(i=>i>=0);
  if(!idx.length) return 3;
  const avg=idx.reduce((s,i)=>s+(zoneStars[i]||0),0)/idx.length;
  return avg>=2.6?3:avg>=1.6?2:1;
}
function rLessonFinish(){
  const l=activeLesson;
  const stars=lessonStarsNow();
  const pts=Math.max(0,score-lessonStartScore);
  const prev=C.lessons[l.id]||{stars:0,points:0,done:false};
  const firstTime=!prev.done;
  const _today=localDay();C.days=C.days||[];if(!C.days.includes(_today))C.days.push(_today);
  const cleared=l.review?finishReview():0;
  if(!l.review) C.lessons[l.id]={done:true,stars:Math.max(prev.stars,stars),points:Math.max(prev.points,pts)};
  C.active=null; saveProgress();
  burstConfetti(); sfxBigWin();
  const unitDone=!l.review&&l.unit.lessons.every(x=>lessonDone(x.id));
  const _tl=trackLessons(l.unit.track),nxt=l.review?null:_tl[_tl.indexOf(l)+1];
  const coins=[1,2,3].map(n=>n<=stars?`<img class="star-lemur" src="${LEMUR_COIN}" alt="coin">`:`<span class="star-lemur dim">⭐</span>`).join('');
  const badges=[];
  if(stars===3) badges.push({icon:'🏆',label:'Perfect Lesson'});
  if(maxCombo>=8) badges.push({icon:'🔥',label:'Combo Master'});
  if(unitDone) badges.push({icon:'🏅',label:'Unit badge: '+l.unit.badge});
  const badgesHtml=badges.length?`<div class="badge-shelf">${badges.map(b=>`<div class="badge-pill"><span>${b.icon}</span>${b.label}</div>`).join('')}</div>`:'';
  const lemurDone=isAdult()?["Well done.","Solid work.","On to the next one.","That's real progress."]:["Lesson done! 🎉","You're on fire! 🔥","See you in the next lesson!","I'm proud of you!"];
  return `<div class="certif"><div class="medal">${l.emoji}</div><h1>Lesson complete!</h1><p class="sub">${l.review?`Review done — <b>${cleared}</b> word${cleared===1?'':'s'} mastered and removed from your list. ${reviewWords(l.unit.track).length?reviewWords(l.unit.track).length+' still to practise.':'Your list is empty! 🎉'}`:`You finished <b>${l.num} ${l.title}</b>`}${!l.review&&firstTime&&nxt?` — <b>${nxt.num} ${nxt.title}</b> is now unlocked! 🔓`:''}</p>
  <div style="text-align:center;">${renderLemur('big',lemurDone,isAdult()?110:200,isAdult()?'idle':'cheer')}</div>
  <div class="star-row">${coins}</div>
  <p style="font-weight:800;font-size:18px;margin-top:10px;">Points earned: ${pts} 🪙</p>${badgesHtml}${resultsBreakdownHtml()}
  <div class="nav-row" style="justify-content:center;gap:12px;flex-wrap:wrap;">
    <button class="btn secondary" onclick="showCourse()">🗺️ Back to course</button>
    ${nxt?`<button class="btn btn-gold" id="nextLessonBtn" onclick="openLesson('${nxt.id}')">Next lesson →</button>`:''}
  </div></div>`;
}
function resultsBreakdownHtml(){
  const rows=zones.map((z,i)=>GRADED.has(z.type)?`<div class="result-row"><span>${z.label}</span><span class="result-stars">${zoneStars[i]!=null?'⭐'.repeat(zoneStars[i])+'☆'.repeat(3-zoneStars[i]):'— skipped'}</span></div>`:'').join('');
  return rows?`<div class="results-breakdown"><h3>Your results</h3>${rows}</div>`:'';
}

/* ---------- open / close lessons ---------- */
/* ---------- grown-up mode for B1–C1 ---------- */
// calm lo-fi chords for B1+, the original playful tune elsewhere
const ADULT_CHORDS=[[220,277.18,329.63],[0],[196,246.94,293.66],[0],[174.61,220,261.63],[0],[164.81,207.65,246.94],[0]];
function _musicTick(){
  if(!musicOn||!soundOn) return;
  if(document.body.classList.contains('adult')){
    if(musicStep%4===0){const ch=ADULT_CHORDS[(musicStep/4)%ADULT_CHORDS.length];ch.forEach(f=>{if(f)_tone(f,0,1.6,'sine',0.03);});}
    if(musicStep%8===6){_tone(ADULT_CHORDS[0][2]*2,0,0.5,'sine',0.015);}
    musicStep++; return;
  }
  const freq=MUSIC_PATTERN[musicStep%MUSIC_PATTERN.length];
  if(freq) _tone(freq,0,0.16,'triangle',0.045);
  musicStep++;
}
function openLesson(id){
  const l=typeof id==='object'?id:ALL_LESSONS.find(x=>x.id===id);
  if(!l||(!l.review&&!lessonUnlocked(l.id))) return;
  if(!l.review) REVIEW_RUN=null;
  activeLesson=l;
  zones=[{type:"welcome",key:"welcome",label:"Start"}].concat(l.zones.map(z=>({...z,key:z.type})),[{type:"finish",key:"certificate",label:"Finish!"}]);
  BONUS_POOL=l.bonus||U1A;
  Object.keys(QS).forEach(k=>delete QS[k]);
  FW.earned=new Set(); FW.rotation=0;
  bonusShown=false; combo=0;
  const resume=C.active&&C.active.id===id;
  zoneStars=resume?(C.active.zoneStars||{}):{};
  lessonStartScore=resume?C.active.startScore:score;
  current=-1;
  document.body.classList.add('in-lesson');
  document.body.classList.toggle('adult',isAdult(l));
  CONFETTI.splice(0,CONFETTI.length,...(isAdult(l)?['✦','·','✧']:['⏰','🥣','🚌','⚽','🌙','✨']));
  $('courseView').style.display='none';
  $('lessonView').style.display='';
  $('timerPill').textContent='Lesson '+l.num;
  go(resume?Math.min(C.active.current,zones.length-1):0);
  if(resume) setTimeout(()=>_comboToastText('💾 Welcome back — you were here!'),300);
}
function showCourse(){
  const _lastLesson=activeLesson;
  if(activeLesson && zones[current] && zones[current].type!=='finish') saveProgress();
  activeLesson=null;
  document.body.classList.remove('in-lesson','adult');
  CONFETTI.splice(0,CONFETTI.length,'⏰','🥣','🚌','⚽','🌙','✨');
  $('lessonView').style.display='none';
  $('courseView').style.display='';
  $('timerPill').textContent='A0 → C1';
  if(_lastLesson&&!_lastLesson.review){setProfile(_lastLesson.unit.track,_lastLesson.unit.level,true);VIEW={track:null,level:null};try{localStorage.setItem('lingrowView',JSON.stringify(VIEW));}catch(e){}}
  renderCourse();
  window.scrollTo({top:0});
}
function _comboToastText(t){
  let el=document.getElementById('comboToast');
  if(!el){ el=document.createElement('div'); el.id='comboToast'; el.className='combo-toast'; document.body.appendChild(el); }
  el.classList.remove('big'); el.textContent=t;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(window._comboToastTimer); window._comboToastTimer=setTimeout(()=>el.classList.remove('show'),1800);
}

/* ---------- the course page ("lesson book") ---------- */
function coinRow(n,size){return [1,2,3].map(k=>k<=n?`<img class="mini-coin" style="width:${size}px;height:${size}px" src="${LEMUR_COIN}" alt="">`:`<span class="mini-coin dim" style="width:${size}px;height:${size}px">⭐</span>`).join('');}

/* ---------- Tracks: Kids / Adults, each with its own level screens ---------- */
const TRACKS=[
 {id:"kids",name:"Kids",emoji:"🧒",tag:"FOR KIDS",levels:["A0","A1","A2"],desc:"Ages 6–12 · playful lessons with Leo, games, music and lots of coins.",cta:"Let's play!"},
 {id:"adults",name:"Teens & Adults",emoji:"🧑‍💼",tag:"FOR TEENS & ADULTS",levels:["A0","A1","A2","B1","B2","C1"],desc:"Ages 13+ · from your first words to C1 — real-life topics, grammar in depth, calm focused style.",cta:"Start learning"},
];
const trackOfLevel=lv=>TRACKS.find(t=>t.levels.includes(lv))||TRACKS[0];
COURSE.units.forEach(u=>{u.track=u.track||trackOfLevel(u.level).id;});
TRACKS.forEach(t=>{COURSE.units.filter(u=>u.track===t.id).forEach((u,i)=>{u.n=i+1;u.lessons.forEach((l,li)=>{l.num=`${i+1}.${li+1}`;});});});
const trackLessons=tid=>ALL_LESSONS.filter(l=>l.unit.track===tid);
function lessonUnlocked(id){
  if(TESTER) return true;
  const l=ALL_LESSONS.find(x=>x.id===id); if(!l) return false;
  const tl=trackLessons(l.unit.track); const i=tl.indexOf(l);
  if(i===0||lessonDone(tl[i-1].id)||lessonDone(id)) return true;
  // placement test: the first lesson of every level up to the placed level is open
  const pl=C.placed&&C.placed[l.unit.track];
  if(pl&&tl[i-1].unit.level!==l.unit.level&&PL_LV.indexOf(l.unit.level)<=PL_LV.indexOf(pl)) return true;
  return false;
}
function isAdult(l){l=l||activeLesson;return !!(l&&l.unit.track==='adults');}
let VIEW={track:null,level:null};
try{const v=JSON.parse(localStorage.getItem('lingrowView')||'null');if(v&&typeof v==='object')VIEW=v;}catch(e){}
function nav(track,level){if(typeof PT!=='undefined')PT=null;VIEW={track:track||null,level:level||null};try{localStorage.setItem('lingrowView',JSON.stringify(VIEW));}catch(e){}sfxWhoosh();renderCourse();window.scrollTo({top:0,behavior:'smooth'});}
const statsOf=ls=>({total:ls.length,done:ls.filter(l=>lessonDone(l.id)).length,coins:ls.reduce((s,l)=>s+((C.lessons[l.id]&&C.lessons[l.id].stars)||0),0)});

function testerBar(){if(!TESTER_ALLOWED)return '';const acc=typeof testerAccount==='function'&&testerAccount();return `<div class="tester-bar ${TESTER?'on':''}"><span>🧪 <b>${acc?'Tester account':'Tester mode'} ${TESTER?'ON':'OFF'}</b> — ${TESTER?(acc?'everything is open: every level, lesson and premium option, no daily limit. Progress saves to your account.':'every lesson is unlocked and has a ⏭ Skip button.'):'lessons unlock in order, like for real learners.'}</span><button class="btn ${TESTER?'secondary':'btn-gold'} lesson-btn" onclick="setTester(${!TESTER})">${TESTER?'Turn off':'Turn on'}</button></div>`;}
function crumbs(){
  const t=TRACKS.find(x=>x.id===VIEW.track);
  let h=`<div class="crumbs"><a href="#" onclick="nav();return false;">🏠 Home</a>`;
  if(t) h+=`<span>›</span><a href="#" onclick="nav('${t.id}');return false;">${t.emoji} ${t.name}</a>`;
  if(VIEW.track==='me') h+=`<span>›</span><b>📊 My progress</b>`;
  if(VIEW.level) h+=`<span>›</span><b>${VIEW.level}</b>`;
  return h+`</div>`;
}
function unitHtml(u){
  const nxt=nextLessonToDo(u.track);
  const ud=u.lessons.filter(l=>lessonDone(l.id)).length, unitDone=ud===u.lessons.length;
  let h=`<section class="unit-block">
    <div class="unit-head"><div class="unit-num">${u.n}</div><div class="unit-title"><span><b class="lvl-pill">${u.level}</b> UNIT ${u.n} · ${u.topic.toUpperCase()}</span><h3>${u.title} ${u.emoji}</h3><p>${u.sub}</p></div>
    <div class="unit-badge ${unitDone?'won':''}" title="Finish the unit to win this badge">🏅 ${u.badge}</div></div>
    <div class="unit-progress"><div style="width:${ud/u.lessons.length*100}%"></div></div>
    <div class="lesson-grid">`;
  const tl=trackLessons(u.track);
  u.lessons.forEach(l=>{
    const rec=C.lessons[l.id], unlocked=lessonUnlocked(l.id), isDone=lessonDone(l.id);
    const resuming=C.active&&C.active.id===l.id, isNext=nxt&&nxt.id===l.id;
    const prev=tl[tl.indexOf(l)-1];
    const chips=l.zones.map(z=>`<span class="lesson-chip">${z.label}</span>`).join('');
    let action;
    if(!unlocked) action=`<span class="lock-note">🔒 Finish ${prev?prev.num:''} first</span>`;
    else if(resuming) action=`<button class="btn btn-gold lesson-btn" onclick="openLesson('${l.id}')">Continue →</button>`;
    else if(isDone) action=`<button class="btn secondary lesson-btn" onclick="openLesson('${l.id}')">↻ Play again</button>`;
    else action=`<button class="btn btn-gold lesson-btn" onclick="openLesson('${l.id}')">Start →</button>`;
    h+=`<div class="lesson-card ${l.test?'test':''} ${unlocked?'':'locked'} ${isDone?'done':''} ${isNext?'next':''}" id="card-${l.id}" ${unlocked?`onclick="if(event.target.tagName!=='BUTTON')openLesson('${l.id}')"`:''}>
      <div class="lc-top"><div class="lc-emoji">${l.emoji}</div><div class="lc-title"><span>${l.test?l.unit.level+' UNIT TEST · FINAL QUIZ':'LESSON '+l.num}</span><h4>${l.title}</h4></div><div class="lc-coins">${coinRow(rec?rec.stars:0,22)}</div></div>
      <div class="lesson-chips">${chips}</div>
      <div class="lc-bottom"><span class="lc-meta">⏱ ~${zoneMinutes(l)} min${rec&&rec.points?` · best ${rec.points} pts`:''}</span>${action}</div>
    </div>`;
  });
  return h+`</div></section>`;
}
function statsRow(ls){const s=statsOf(ls);return `<div class="hero-stats"><div><b>${s.done}/${s.total}</b><small>lessons</small></div><div><b><img class="mini-coin" src="${LEMUR_COIN}" alt="" style="width:20px;height:20px;vertical-align:-3px"> ${s.coins}/${s.total*3}</b><small>coins</small></div><div><b>${score}</b><small>points</small></div></div><div class="course-bar"><div style="width:${s.total?Math.round(s.done/s.total*100):0}%"></div></div>`;}

/* ---------- Review: words the learner got wrong come back ---------- */
const WORD_IDX={en:{},pl:{}};
ALL_LESSONS.forEach(l=>(l.bonus||[]).concat(...l.zones.filter(z=>z.type==='cards').map(z=>z.cards)).forEach(w=>{
  if(!w||!w.en) return; if(!WORD_IDX.en[w.en.toLowerCase()]) WORD_IDX.en[w.en.toLowerCase()]=w; if(w.pl&&!WORD_IDX.pl[w.pl.toLowerCase()]) WORD_IDX.pl[w.pl.toLowerCase()]=w;}));
let REVIEW_RUN=null; // {track, words:Set, missed:Set}
function reviewWords(tid){const r=(C.review||{});return Object.keys(r).filter(en=>r[en].t===tid&&WORD_IDX.en[en.toLowerCase()]).sort((a,b)=>r[b].n-r[a].n).map(en=>WORD_IDX.en[en.toLowerCase()]);}
function missWord(w){
  if(!w||!w.en||!activeLesson) return;
  w=WORD_IDX.en[w.en.toLowerCase()]||w; if(!w.pl) return;
  const t=activeLesson.unit.track; C.review=C.review||{};
  const r=C.review[w.en]||{n:0,t}; r.n++; r.t=t; C.review[w.en]=r;
  if(REVIEW_RUN) REVIEW_RUN.missed.add(w.en);
  saveProgress();
}
// wrap the engine's answer handlers so every vocabulary mistake is remembered
(function(){
  const _cb=cbPick; cbPick=function(k,el){if(!CB.ans&&CB.opts[k]!==CB.order[CB.i]) missWord(CB.order[CB.i]); return _cb(k,el);};
  const _bp=bpPick; bpPick=function(idx,el){if(!BP.answered&&BP.opts[idx]!==BP.correctCard) missWord(BP.correctCard); return _bp(idx,el);};
  const _mg=mgR; mgR=function(i){if(MG.sel!==null&&MG.sel!==i&&!MG.done.has(i)) missWord(MG.pairs[MG.sel]); return _mg(i);};
  const _qp=quizPick; quizPick=function(id,k,el){const st=QS[id];
    if(st&&st.cur[k]&&!st.cur[k].ok){const q=st.qs[st.i].q;let m=q.match(/^'(.+)' =$/);
      if(m) missWord(WORD_IDX.pl[m[1].toLowerCase()]); else if((m=q.match(/'(.+)' means…$/))) missWord(WORD_IDX.en[m[1].toLowerCase()]);}
    return _qp(id,k,el);};
  const _us=usPick; usPick=function(k){const it=US.words&&US.words[US.i];const r=_us(k);
    if(it&&US.ans&&US.ans.length===it.word.length&&US.ans.join('')!==it.word) missWord(WORD_IDX.en[it.word.toLowerCase()]); return r;};
  const _tr=trCheck; trCheck=function(id,i){const inp=$(id+'-in-'+i);const was=inp&&inp.disabled;const r=_tr(id,i);
    if(inp&&!was&&!inp.disabled&&inp.value.trim()){const it=TR[id][i];missWord(WORD_IDX.en[(it.answers[0]||'').toLowerCase()]);} return r;};
})();
function openReview(tid){
  const ws=reviewWords(tid).slice(0,12); if(!ws.length) return;
  const singles=ws.filter(w=>!/\s/.test(w.en)&&/^[a-z]+$/i.test(w.en)).map(w=>({word:w.en,emoji:w.emoji}));
  const zs=[{type:"cards",label:"Words",title:"Your tricky words",cards:ws},
    {type:"find",label:"Find it",cards:ws,rounds:Math.max(5,ws.length),title:"Which one is it? 🔎"}];
  if(ws.length>=3) zs.push({type:"match",label:"Match",pairs:ws.slice(0,10)});
  if(singles.length>=2) zs.push({type:"spell",label:"Spell it",words:singles.slice(0,8)});
  zs.push({type:"typed",label:"Write the words",tag:"TYPE IT",title:"Write it in English ✍️",blocks:[{id:'rv-'+tid,label:"🇵🇱 → 🇬🇧 Write the English word or phrase",items:ws.map(w=>({prompt:`${w.emoji} ${w.pl}`,answers:[w.en]}))}]});
  const t=TRACKS.find(x=>x.id===tid);
  const l={id:'review-'+tid,review:true,num:'Review',title:'Tricky words',emoji:'🔁',intro:`${ws.length} words you found hard. Get them right and they leave your review list!`,bonus:ws,zones:zs,
    unit:{track:tid,level:VIEW.level||t.levels[0],lessons:[],badge:''}};
  REVIEW_RUN={track:tid,words:new Set(ws.map(w=>w.en)),missed:new Set()};
  C.active=null;
  openLesson(l);
}
function finishReview(){
  if(!REVIEW_RUN) return 0; let cleared=0;
  REVIEW_RUN.words.forEach(en=>{if(!REVIEW_RUN.missed.has(en)&&C.review[en]){delete C.review[en];cleared++;}});
  REVIEW_RUN=null; saveProgress(); return cleared;
}
function reviewCard(tid){
  const n=reviewWords(tid).length;
  if(!n) return `<div class="review-card empty"><span>🔁</span><div><b>Review</b><p>Words you get wrong will collect here so you can practise them again.</p></div></div>`;
  return `<div class="review-card" onclick="openReview('${tid}')"><span>🔁</span><div><b>${n} tricky word${n>1?'s':''} to review</b><p>${reviewWords(tid).slice(0,4).map(w=>w.en).join(', ')}${n>4?'…':''}</p></div><button class="btn btn-gold lesson-btn">Review →</button></div>`;
}

const LEO_ADULT="data:image/webp;base64,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";
/* grown-up Leo: a calm head-and-shoulders portrait in the adult section */
(function(){const _rl=renderLemur;renderLemur=function(id,messages,size,mood){let h=_rl(id,messages,size,mood);
  h=leoGrow(h);
  return h;};})();

/* ---------- PC layout: side menu next to the course pages ---------- */
function sideNav(){
  const cur=VIEW.track, lv=VIEW.level, inPT=typeof PT!=='undefined'&&PT&&!VIEW._leftPT;
  const item=(on,click,icon,label,extra)=>`<a href="#" class="sn-item ${on?'on':''}" onclick="${click};return false;"><span>${icon}</span><b>${label}</b>${extra||''}</a>`;
  let h=`<aside class="side-nav"><div class="sn-title">Menu</div>`;
  h+=item(!cur&&!inPT,"PT=null;nav()","🏠","Home");
  h+=item(inPT,"startPlacement()","🧭","Find my level");
  h+=item(cur==='me'&&!inPT,"nav('me')","📊","My progress",`<small>🔥 ${streakOf(C.days)}</small>`);
  TRACKS.forEach(t=>{
    const s=statsOf(trackLessons(t.id)), rv=reviewWords(t.id).length;
    h+=`<div class="sn-group">`+item(cur===t.id&&!lv&&!inPT,`PT=null;nav('${t.id}')`,t.emoji,t.name,`<small>${s.done}/${s.total}</small>`);
    h+=`<div class="sn-levels">${t.levels.map(l=>`<a href="#" class="sn-lv ${cur===t.id&&lv===l&&!inPT?'on':''}" onclick="PT=null;nav('${t.id}','${l}');return false;">${l}</a>`).join('')}</div>`;
    if(rv) h+=item(false,`openReview('${t.id}')`,"🔁","Review",`<small>${rv}</small>`);
    h+=`</div>`;
  });
  return h+`</aside>`;
}
function courseShell(h){return `<div class="course-layout">${sideNav()}<main class="course-main">${h}</main></div>`;}
/* ---------- Accounts & progress sync (Supabase) ---------- */
const LINGROW_CFG=Object.assign({supabaseUrl:"",supabaseAnonKey:"",google:false},window.LINGROW_CONFIG||{}); // filled in when the project is connected
let SUPA=null, USER=null, _syncTimer=null, _authMode='in';
const cloudOn=()=>!TESTER_SITE&&!!(LINGROW_CFG.supabaseUrl&&LINGROW_CFG.supabaseAnonKey);
function loadSupabase(){ // works with both key types: the new 'sb_publishable_…' key and the legacy 'anon' key
  const srcs=['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js','https://unpkg.com/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js'];
  return new Promise((res,rej)=>{if(window.supabase)return res();const next=i=>{if(i>=srcs.length)return rej();const s=document.createElement('script');s.src=srcs[i];s.onload=()=>res();s.onerror=()=>next(i+1);document.head.appendChild(s);};next(0);});}
async function initCloud(){
  if(!cloudOn()) return;
  try{await loadSupabase();}catch(e){return;} // offline: keep working locally
  const back=handleAuthRedirect();
  SUPA=window.supabase.createClient(LINGROW_CFG.supabaseUrl,LINGROW_CFG.supabaseAnonKey,{auth:{detectSessionInUrl:true,persistSession:true,autoRefreshToken:true,flowType:'implicit'}});
  SUPA.auth.onAuthStateChange((ev,session)=>{const u=session&&session.user||null;const was=USER&&USER.id;USER=u;renderAccountBtn();
    if(ev==='PASSWORD_RECOVERY'){openNewPassword();}
    if(u&&u.id!==was){pullAndMerge();if(back&&back!=='error'&&back!=='recovery')setTimeout(()=>_comboToastText(T2('✅ Email confirmed — you\'re logged in!','✅ E-mail potwierdzony — jesteś zalogowany!')),900);}
    if(back&&/access_token|code=/.test(location.href))setTimeout(()=>history.replaceState(null,'',siteUrl()),50);});
  const {data}=await SUPA.auth.getSession(); USER=data.session&&data.session.user||null; renderAccountBtn(); if(USER) pullAndMerge();
}
function mergeProgress(a,b){ // keep the best of both devices
  const out={score:Math.max(a.score||0,b.score||0),maxCombo:Math.max(a.maxCombo||0,b.maxCombo||0),C:{lessons:{},active:(a.C&&a.C.active)||(b.C&&b.C.active)||null,placed:{},review:{},days:[],profile:(a.C&&a.C.profile)||(b.C&&b.C.profile)||null}};
  [a,b].forEach(x=>{const c=x.C||{};
    Object.entries(c.lessons||{}).forEach(([id,r])=>{const o=out.C.lessons[id]||{stars:0,points:0,done:false};out.C.lessons[id]={done:o.done||!!r.done,stars:Math.max(o.stars,r.stars||0),points:Math.max(o.points,r.points||0)};});
    Object.assign(out.C.placed,c.placed||{});
    Object.entries(c.review||{}).forEach(([en,r])=>{const o=out.C.review[en];out.C.review[en]=o?{n:Math.max(o.n,r.n),t:r.t}:r;});
    (c.days||[]).forEach(d=>{if(!out.C.days.includes(d))out.C.days.push(d);});});
  out.C.days.sort();
  return out;
}
const localSnapshot=()=>({score,maxCombo,C});
let _lastSync=null,_syncErr=null;
function _syncFail(e){_syncErr=(e&&e.message)||String(e);console.warn('sync',e);_comboToastText(T2('⚠️ Cloud save failed: ','⚠️ Nie udało się zapisać w chmurze: ')+_syncErr);}
async function pullAndMerge(){
  if(!SUPA||!USER) return false;
  try{
    const {data,error}=await SUPA.from('progress').select('data').eq('user_id',USER.id).maybeSingle();
    if(error) throw error;
    const m=mergeProgress(localSnapshot(),(data&&data.data)||{});
    score=m.score;maxCombo=m.maxCombo;C=m.C;saveProgress(true);
    const ok=await pushNow(true);
    if(!activeLesson) renderCourse();
    if(ok){const n=Object.values(C.lessons||{}).filter(r=>r&&r.done).length;_comboToastText(T2('☁️ Progress synced · '+n+' lessons saved','☁️ Postęp zsynchronizowany · zapisane lekcje: '+n));}
    return ok;
  }catch(e){_syncFail(e);return false;}
}
async function pushNow(quiet){
  if(!SUPA||!USER) return false;
  clearTimeout(_syncTimer);_syncTimer=null;
  try{const {error}=await SUPA.from('progress').upsert({user_id:USER.id,display_name:(USER.user_metadata&&USER.user_metadata.name)||USER.email,data:localSnapshot(),updated_at:new Date().toISOString()},{onConflict:'user_id'});
    if(error) throw error; _lastSync=new Date();_syncErr=null;return true;}
  catch(e){_syncFail(e);return false;}
}
function queueSync(){if(!SUPA||!USER)return;clearTimeout(_syncTimer);_syncTimer=setTimeout(()=>pushNow(),1500);}
function _flushSync(){if(_syncTimer&&SUPA&&USER)pushNow();}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')_flushSync();else if(USER)pullAndMerge();});
window.addEventListener('pagehide',_flushSync);
window.addEventListener('online',()=>{if(USER)pullAndMerge();});
/* account button + sign-in window */
function renderAccountBtn(){
  let b=document.getElementById('accountBtn');
  if(!cloudOn()){if(b)b.remove();return;}
  if(!b){b=document.createElement('button');b.id='accountBtn';b.className='account-btn';b.onclick=()=>USER?openAccount():openAuth('in');const ctl=document.querySelector('.topbar-controls');ctl.insertBefore(b,ctl.firstChild);}
  b.textContent=USER?'👤 '+((USER.user_metadata&&USER.user_metadata.name)||USER.email.split('@')[0]):'👤 Log in';
  b.title=USER?'Your account':'Log in or create an account';
}
function authModal(inner){let m=document.getElementById('authModal');if(!m){m=document.createElement('div');m.id='authModal';m.className='auth-overlay';m.onclick=e=>{if(e.target===m)closeAuth();};document.body.appendChild(m);}m.innerHTML=`<div class="auth-box panel">${inner}</div>`;m.classList.add('show');}
function closeAuth(){const m=document.getElementById('authModal');if(m)m.classList.remove('show');}
function openAuth(mode){
  _authMode=mode;const up=mode==='up';
  authModal(`<button class="auth-x" onclick="closeAuth()">✕</button>${zoneTag(up?'NEW ACCOUNT':'WELCOME BACK')}
    <h2 class="title">${up?'Create your account':'Log in'}</h2><p class="sub">${up?'Save your progress and continue on any device — PC or phone.':'Your lessons, coins and review words follow you to every device.'}</p>
    ${up?`<input class="auth-in" id="auName" placeholder="Your name" autocomplete="name">`:''}
    <input class="auth-in" id="auEmail" type="email" placeholder="Email" autocomplete="email">
    <input class="auth-in" id="auPass" type="password" placeholder="Password (min. 6 characters)" autocomplete="${up?'new-password':'current-password'}" onkeydown="if(event.key==='Enter')doAuth()">
    <p class="auth-msg" id="auMsg"></p>
    <button class="btn btn-gold auth-go" onclick="doAuth()">${up?'Create account →':'Log in →'}</button>
    ${LINGROW_CFG.google?`<button class="btn secondary auth-go" onclick="googleAuth()">Continue with Google</button>`:''}
    <p class="auth-switch">${up?'Already have an account? <a href="#" onclick="openAuth(\'in\');return false;">Log in</a>':'New here? <a href="#" onclick="openAuth(\'up\');return false;">Create an account</a>'}${up?'':' · <a href="#" onclick="resetPass();return false;">Forgot password?</a>'}</p>
    <p class="auth-note">Your progress on this device is kept and added to your account.</p>`);
  setTimeout(()=>{const e=$(up?'auName':'auEmail');if(e)e.focus();},50);
}
const T2=(en,pl)=>LANG==='pl'?pl:en;
function authError(e){const m=(e&&e.message)||String(e);
  if(/invalid login/i.test(m)) return T2('Wrong email or password.','Zły e-mail lub hasło.');
  if(/not confirmed/i.test(m)) return T2('Your email isn\'t confirmed yet. Click the link we sent you — or send it again below.','Twój e-mail nie jest jeszcze potwierdzony. Kliknij link z wiadomości — albo wyślij go ponownie poniżej.');
  if(/after (\d+) seconds|rate limit|too many/i.test(m)){const s=(m.match(/after (\d+) seconds/)||[])[1];return T2(`Please wait${s?' '+s+' seconds':' a moment'} before trying again — this protects your account.`,`Poczekaj${s?' '+s+' sekund':' chwilę'} przed kolejną próbą — to chroni Twoje konto.`);}
  if(/already registered|already been registered|user already exists/i.test(m)) return T2('This email already has an account — log in instead.','Ten e-mail ma już konto — zaloguj się.');
  if(/password should be|weak password/i.test(m)) return T2('Choose a longer password (at least 6 characters).','Wybierz dłuższe hasło (min. 6 znaków).');
  if(/invalid.*email|email.*invalid/i.test(m)) return T2('That email address doesn\'t look right.','Ten adres e-mail wygląda na błędny.');
  if(/fetch|network/i.test(m)) return T2('No connection — check your internet and try again.','Brak połączenia — sprawdź internet i spróbuj ponownie.');
  return m;}
const siteUrl=()=>location.origin+location.pathname;
async function doAuth(){
  const msg=$('auMsg'),email=$('auEmail').value.trim(),pass=$('auPass').value,btn=document.querySelector('.auth-go');
  if(!email||pass.length<6){msg.textContent=T2('Enter your email and a password of at least 6 characters.','Wpisz e-mail i hasło (min. 6 znaków).');return;}
  msg.textContent='…'; if(btn) btn.disabled=true;
  try{
    if(_authMode==='up'){const name=($('auName')||{}).value||'';const {data,error}=await SUPA.auth.signUp({email,password:pass,options:{data:{name:name.trim()},emailRedirectTo:siteUrl()}});if(error)throw error;
      if(data.user&&Array.isArray(data.user.identities)&&!data.user.identities.length){msg.textContent=T2('This email already has an account — log in instead.','Ten e-mail ma już konto — zaloguj się.');return;}
      if(!data.session){showConfirmNote(email);return;}}
    else{const {error}=await SUPA.auth.signInWithPassword({email,password:pass});if(error){if(/not confirmed/i.test(error.message)){showConfirmNote(email,true);return;}throw error;}}
    closeAuth();
  }catch(e){msg.textContent=authError(e);}
  finally{if(btn) btn.disabled=false;}
}
function showConfirmNote(email,notYet){
  authModal(`<button class="auth-x" onclick="closeAuth()">✕</button>${zoneTag(T2('ONE MORE STEP','JESZCZE JEDEN KROK'))}<div style="font-size:46px;">📧</div>
   <h2 class="title">${T2('Confirm your email','Potwierdź swój e-mail')}</h2>
   <p class="sub">${notYet?T2('Your account isn\'t confirmed yet.','Twoje konto nie jest jeszcze potwierdzone.'):T2('We sent a link to','Wysłaliśmy link na adres')} <b>${email}</b>.<br>${T2('Open it on this device and you\'ll be logged in automatically. Check the spam folder too.','Otwórz go na tym urządzeniu, a zalogujesz się automatycznie. Sprawdź też folder spam.')}</p>
   <p class="auth-msg" id="auMsg"></p>
   <button class="btn secondary auth-go" id="resendBtn" onclick="resendConfirm('${email.replace(/'/g,'')}')">${T2('Send the link again','Wyślij link ponownie')}</button>
   <button class="btn btn-gold auth-go" onclick="openAuth('in')">${T2('I\'ve confirmed — log in','Potwierdziłem — zaloguj')}</button>`);
}
async function resendConfirm(email){const msg=$('auMsg'),b=$('resendBtn');b.disabled=true;
  const {error}=await SUPA.auth.resend({type:'signup',email,options:{emailRedirectTo:siteUrl()}});
  msg.style.color=error?'':'#2e7d32';msg.textContent=error?authError(error):T2('Sent! Check your inbox.','Wysłane! Sprawdź skrzynkę.');
  let n=60;const t=setInterval(()=>{n--;b.textContent=n>0?`${T2('Send again in','Wyślij ponownie za')} ${n}s`:T2('Send the link again','Wyślij link ponownie');if(n<=0){clearInterval(t);b.disabled=false;}},1000);}
/* coming back from an email link: confirm / reset password / errors in the address */
function handleAuthRedirect(){
  const h=new URLSearchParams(location.hash.replace(/^#/,'')), q=new URLSearchParams(location.search);
  const err=h.get('error_description')||q.get('error_description');
  if(err){
    const exp=/expired|invalid/i.test(err)||(h.get('error_code')||q.get('error_code')||'').includes('otp_expired');
    history.replaceState(null,'',siteUrl());
    setTimeout(()=>{openAuth('in');const m=$('auMsg');if(m)m.textContent=exp?T2('That email link has expired or was already used. Log in — or if your email isn\'t confirmed yet, we can send a new link.','Ten link wygasł albo został już użyty. Zaloguj się — a jeśli e-mail nie jest potwierdzony, wyślemy nowy link.'):err;},400);
    return 'error';
  }
  if(h.get('access_token')||q.get('code')) return h.get('type')||'signup';
  return null;
}
function openNewPassword(){
  authModal(`${zoneTag(T2('NEW PASSWORD','NOWE HASŁO'))}<h2 class="title">${T2('Set a new password','Ustaw nowe hasło')}</h2>
   <input class="auth-in" id="auNewPass" type="password" placeholder="${T2('New password (min. 6 characters)','Nowe hasło (min. 6 znaków)')}" autocomplete="new-password">
   <p class="auth-msg" id="auMsg"></p><button class="btn btn-gold auth-go" onclick="saveNewPassword()">${T2('Save password','Zapisz hasło')}</button>`);
}
async function saveNewPassword(){const p=$('auNewPass').value,msg=$('auMsg');if(p.length<6){msg.textContent=T2('At least 6 characters.','Min. 6 znaków.');return;}
  const {error}=await SUPA.auth.updateUser({password:p});if(error){msg.textContent=authError(error);return;}closeAuth();_comboToastText(T2('🔑 Password changed','🔑 Hasło zmienione'));}
async function googleAuth(){await SUPA.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.href.split('#')[0]}});}
async function resetPass(){const email=$('auEmail').value.trim(),msg=$('auMsg');if(!email){msg.textContent='Type your email first.';return;}
  const {error}=await SUPA.auth.resetPasswordForEmail(email,{redirectTo:siteUrl()});msg.textContent=error?error.message:'📧 We sent you a link to set a new password.';}
function openAccount(){
  const all=ALL_LESSONS.length,done=ALL_LESSONS.filter(l=>lessonDone(l.id)).length;
  authModal(`<button class="auth-x" onclick="closeAuth()">✕</button>${zoneTag('YOUR ACCOUNT')}<h2 class="title">👤 ${(USER.user_metadata&&USER.user_metadata.name)||'Learner'}</h2><p class="sub">${USER.email}</p>
   <p class="sub">${done}/${all} lessons · ${score} points</p>
   <p class="sub" id="syncState">${_syncErr?'⚠️ '+_syncErr:_lastSync?'☁️ '+T2('Last saved to cloud: ','Ostatni zapis w chmurze: ')+_lastSync.toLocaleTimeString():'☁️ …'}</p>
   <button class="btn btn-gold auth-go" onclick="syncNowBtn(this)">↻ Sync now</button>
   <button class="btn secondary auth-go" onclick="logOut()">Log out</button>`);
}
async function syncNowBtn(b){b.disabled=true;b.textContent='…';const ok=await pullAndMerge();b.disabled=false;b.textContent='↻ Sync now';const el=$('syncState');if(el)el.textContent=ok?'✅ '+T2('Saved to cloud: ','Zapisano w chmurze: ')+_lastSync.toLocaleTimeString():'⚠️ '+_syncErr;}
async function logOut(){await pushNow();await SUPA.auth.signOut();USER=null;closeAuth();renderAccountBtn();_comboToastText('👋 Logged out — progress stays on this device');}

/* ---------- Tester accounts ----------
   Mark an account as a tester in Supabase (SQL editor):
     update auth.users set raw_app_meta_data = raw_app_meta_data || '{"tester":true}' where email = 'you@example.com';
   That account then works like a normal learner (cloud sync, streaks, progress, shop) but every level,
   lesson, unit test and premium option is open, with no daily limit. Learners can't set app_metadata themselves. */
const _TESTER_LOCAL=TESTER_ALLOWED; // file copy or /tester page
let _testerChecked=null;
const testerAccount=()=>!!(USER&&USER.app_metadata&&USER.app_metadata.tester===true);
function isTesterAccount(){return testerAccount();}
function applyAccountTester(){
  const was=TESTER, acc=testerAccount();
  if(acc){ if(!TESTER_ALLOWED){TESTER_ALLOWED=true;let t=null;try{t=localStorage.getItem('lingrowTester');}catch(e){}TESTER=t!=='0';} }
  else if(!_TESTER_LOCAL&&TESTER_ALLOWED){TESTER_ALLOWED=false;TESTER=false;}
  document.body.classList.toggle('tester',TESTER);
  document.body.classList.toggle('tester-account',acc);
  if(was!==TESTER&&!activeLesson) renderCourse();
  // the saved session can be old: ask Supabase once per login for the account's current flags
  if(USER&&SUPA&&_testerChecked!==USER.id){_testerChecked=USER.id;
    SUPA.auth.getUser().then(({data})=>{const u=data&&data.user;if(!u||!USER||u.id!==USER.id)return;
      const before=testerAccount();USER.app_metadata=u.app_metadata||{};if(testerAccount()!==before)applyAccountTester();}).catch(()=>{});}
  if(!USER) _testerChecked=null;
}
const _renderAccountBtnPlain=renderAccountBtn;
renderAccountBtn=function(){const r=_renderAccountBtnPlain.apply(this,arguments);applyAccountTester();return r;};


/* ---------- My progress dashboard ---------- */
function streakOf(days){const set=new Set(days||[]);let n=0;const d=new Date();
  if(!set.has(d.toISOString().slice(0,10))) d.setDate(d.getDate()-1);
  while(set.has(d.toISOString().slice(0,10))){n++;d.setDate(d.getDate()-1);}return n;}
function progressHtml(){
  const days=C.days||[], streak=streakOf(days), all=ALL_LESSONS, done=all.filter(l=>lessonDone(l.id)).length;
  const coins=all.reduce((s,l)=>s+((C.lessons[l.id]&&C.lessons[l.id].stars)||0),0);
  let h=`<div class="panel prog-hero">${zoneTag('MY PROGRESS')}<h2 class="title">${USER?'👤 '+((USER.user_metadata&&USER.user_metadata.name)||USER.email.split('@')[0]):'My progress'}</h2>
    <div class="prog-stats"><div><b>🔥 ${streak}</b><small>day streak</small></div><div><b>${done}/${all.length}</b><small>lessons</small></div><div><b><img class="mini-coin" src="${LEMUR_COIN}" alt="" style="width:20px;height:20px;vertical-align:-3px"> ${coins}</b><small>coins</small></div><div><b>${score}</b><small>points</small></div></div>
    <div class="wk-row">${weekDots()}</div>
    ${cloudOn()&&!USER?`<p class="sub" style="margin-top:12px;">Progress is saved on this device only. <a href="#" onclick="openAuth('up');return false;">Create a free account</a> to keep it on every device.</p>`:''}</div>`;
  TRACKS.forEach(t=>{
    const ls=trackLessons(t.id); if(!ls.length) return;
    h+=`<h2 class="section-title">${t.emoji} ${t.name}</h2><div class="panel prog-track">`;
    t.levels.forEach(lv=>{const lls=ls.filter(l=>l.unit.level===lv);if(!lls.length)return;const s=statsOf(lls);
      h+=`<a href="#" class="prog-lv" onclick="nav('${t.id}','${lv}');return false;"><span class="lvl-pill">${lv}</span><div class="course-bar"><div style="width:${Math.round(s.done/s.total*100)}%"></div></div><small>${s.done}/${s.total}</small></a>`;});
    const rv=reviewWords(t.id).length, pl=C.placed&&C.placed[t.id];
    h+=`<p class="track-meta" style="margin-top:10px!important;">${pl?`🧭 Placement result: <b>${pl}</b> · `:''}🔁 ${rv} word${rv===1?'':'s'} to review</p></div>`;
    if(rv) h+=reviewCard(t.id);
  });
  return h;
}
/* ---------- Placement test: find the right level ---------- */
const PLACEMENT=[
 {lv:"A0",q:"Hello! What's your ___?",opts:["name","old","from"],c:0},
 {lv:"A0",q:"I ___ a student.",opts:["am","is","are"],c:0},
 {lv:"A0",q:"🍎 This is an ___.",opts:["apple","banana","pear"],c:0},
 {lv:"A1",q:"She ___ to school every day.",opts:["goes","go","going"],c:0},
 {lv:"A1",q:"There ___ some milk in the fridge.",opts:["is","are","be"],c:0},
 {lv:"A1",q:"___ you like coffee?",opts:["Do","Are","Does"],c:0},
 {lv:"A2",q:"Yesterday I ___ to the cinema.",opts:["went","go","have gone"],c:0},
 {lv:"A2",q:"My brother is ___ than me.",opts:["taller","more tall","tallest"],c:0},
 {lv:"A2",q:"We ___ TV when the phone rang.",opts:["were watching","watched","are watching"],c:0},
 {lv:"B1",q:"I've lived here ___ 2015.",opts:["since","for","from"],c:0},
 {lv:"B1",q:"If it rains tomorrow, we ___ at home.",opts:["will stay","stay","would stay"],c:0},
 {lv:"B1",q:"You ___ smoke in a hospital. It's forbidden.",opts:["mustn't","don't have to","shouldn't to"],c:0},
 {lv:"B2",q:"This bridge ___ in 1890.",opts:["was built","built","has built"],c:0},
 {lv:"B2",q:"If I had known, I ___ you.",opts:["would have told","would tell","had told"],c:0},
 {lv:"B2",q:"She told me she ___ tired.",opts:["was","is being","will"],c:0},
 {lv:"C1",q:"Never ___ such a beautiful view.",opts:["have I seen","I have seen","I saw"],c:0},
 {lv:"C1",q:"___ we need is more time.",opts:["What","That","It"],c:0},
 {lv:"C1",q:"The new policy is likely to ___ the problem rather than solve it.",opts:["exacerbate","alleviate","tackle"],c:0},
];
const PL_LV=["A0","A1","A2","B1","B2","C1"];
let PT=null;
function startPlacement(){
  sfxWhoosh();
  const qs=PLACEMENT.map(q=>{const o=q.opts.map((x,k)=>({o:x,ok:k===q.c}));for(let i=o.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[o[i],o[j]]=[o[j],o[i]];}return {...q,cur:o};});
  PT={qs,i:0,right:{},who:null};
  renderPlacement(); window.scrollTo({top:0,behavior:'smooth'});
}
function plWho(w){PT.who=w;renderPlacement();}
function plPick(k,el){
  if(PT.lock) return; PT.lock=true;
  const q=PT.qs[PT.i], ok=q.cur[k].ok;
  el.classList.add(ok?'correct':'wrong'); ok?sfxCorrect():sfxWrong();
  if(ok) PT.right[q.lv]=(PT.right[q.lv]||0)+1;
  setTimeout(()=>{PT.lock=false;PT.i++;renderPlacement();},650);
}
function plSkip(){PT.i++;renderPlacement();}
function plResult(){
  // the first level where you got fewer than 2 of 3 right is where you start
  let lv="C1"; for(const L of PL_LV){ if((PT.right[L]||0)<2){lv=L;break;} }
  const track=PT.who==='kids'?'kids':'adults';
  const t=TRACKS.find(x=>x.id===track);
  const place=t.levels.includes(lv)?lv:t.levels[t.levels.length-1];
  return {lv,place,track};
}
function renderPlacement(){
  document.body.classList.toggle('adult',PT.who==='adults');
  let h=crumbs().replace('</div>','<span>›</span><b>Placement test</b></div>');
  if(!PT.who){
    h+=`<div class="panel placement"><div style="text-align:center;">${zoneTag('PLACEMENT TEST')}<h2 class="title">Find your level</h2><p class="sub">18 quick questions, about 3 minutes. They get harder as you go — just skip the ones you don't know.</p><p class="sub" style="font-weight:800;">First: who is learning?</p></div>
      <div class="opts"><div class="opt" onclick="plWho('kids')">🧒 A kid (6–12)</div><div class="opt" onclick="plWho('adults')">🧑‍💼 A teen or adult</div></div></div>`;
  } else if(PT.i<PT.qs.length){
    const q=PT.qs[PT.i];
    h+=`<div class="panel placement">${zoneTag('PLACEMENT TEST')}<div class="unit-progress" style="margin:10px 0 14px;"><div style="width:${PT.i/PT.qs.length*100}%"></div></div>
      <h2 class="title">Question ${PT.i+1} / ${PT.qs.length}</h2><p class="sub" style="font-size:18px;font-weight:700;color:var(--navy);">${q.q}</p>
      <div class="opts">${q.cur.map((x,k)=>`<div class="opt" onclick="plPick(${k},this)">${x.o}</div>`).join('')}</div>
      <p style="text-align:center;margin-top:14px;"><button class="btn secondary lesson-btn" onclick="plSkip()">I don't know → skip</button></p></div>`;
  } else {
    const r=plResult(), L=LEVELS.find(x=>x.id===r.place), t=TRACKS.find(x=>x.id===r.track);
    const total=Object.values(PT.right).reduce((a,b)=>a+b,0);
    C.placed=C.placed||{}; C.placed[r.track]=r.place; saveProgress();
    const note=r.place!==r.lv?`<p class="sub">You're already above A2 — the Kids section ends at A2. The <a href="#" onclick="nav('adults','${r.lv}');return false;">Teens &amp; Adults ${r.lv}</a> level would challenge you more.</p>`:'';
    h+=`<div class="panel placement" style="text-align:center;">${zoneTag('YOUR RESULT')}
      <div style="text-align:center;">${renderLemur('big',r.track==='adults'?['Nicely done.','Here is your level.']:['Great job! 🎉','Here is your level!'],r.track==='adults'?100:150,r.track==='adults'?'idle':'cheer')}</div>
      <div class="level-code" style="margin:6px auto 10px;width:80px;height:80px;font-size:34px;">${r.place}</div>
      <h2 class="title">${L.name} ${L.emoji}</h2><p class="sub">You got <b>${total} / ${PT.qs.length}</b> right. We recommend starting in <b>${t.name} · ${r.place}</b>. Every level up to ${r.place} is now unlocked for you.</p>${note}
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px;"><button class="btn btn-gold" onclick="nav('${r.track}','${r.place}')">Start ${r.place} →</button><button class="btn secondary" onclick="startPlacement()">↻ Try again</button></div></div>`;
  }
  $('courseView').innerHTML=courseShell(h);
}

/* screen 1: home — pick Kids or Adults */
function homeHtml(){
  let h=`<div class="panel course-hero"><div class="hero-text">${zoneTag('LEOGROW')}<h2 class="title">Who is learning today?</h2><p class="sub">Pick your section — each one has its own levels, lessons and style.</p></div>
    <div class="hero-leo">${renderLemur('big',["Hi! I'm Leo! 👋","Kids or grown-ups?","Pick your path! 🧭"],130)}</div></div><div class="placement-card" onclick="startPlacement()"><span>🧭</span><div><b>Not sure where to start?</b><p>Take the 3-minute placement test and we'll find your level.</p></div><button class="btn btn-gold lesson-btn">Find my level →</button></div><div class="me-card" onclick="nav('me')"><span>📊</span><b>My progress</b><small>🔥 ${streakOf(C.days)} day streak · ${ALL_LESSONS.filter(l=>lessonDone(l.id)).length} lessons done</small><i>›</i></div><div class="track-grid">`;
  TRACKS.forEach(t=>{
    const ls=trackLessons(t.id), s=statsOf(ls);
    const pic=`<img class="track-leo" src="${((t.id==='kids'?LEO_AGES.little:LEO_AGES.adult)||{}).b||LEO_CHEER}" alt="">`;
    h+=`<div class="track-card ${t.id}" onclick="nav('${t.id}')">
      ${pic}<span class="zone-tag">${t.tag}</span><h3>${t.name} ${t.emoji}</h3><p>${t.desc}</p>
      <div class="track-levels">${t.levels.map(lv=>`<span>${lv}</span>`).join('')}</div>
      <div class="course-bar"><div style="width:${s.total?Math.round(s.done/s.total*100):0}%"></div></div>
      <p class="track-meta">${s.done}/${s.total} lessons · ${s.coins} coins</p>
      <button class="btn btn-gold">${t.cta} →</button></div>`;
  });
  return h+`</div>`;
}
/* screen 2: a track — one card per level */
function trackHtml(t){
  const ls=trackLessons(t.id), nxt=nextLessonToDo(t.id);
  let h=`<div class="panel course-hero"><div class="hero-text">${zoneTag(t.tag)}<h2 class="title">${t.name} ${t.emoji}</h2><p class="sub">${t.desc}</p>${statsRow(ls)}
    ${nxt?`<button class="btn btn-gold" style="margin-top:14px;" onclick="openLesson('${nxt.id}')">${C.active&&C.active.id===nxt.id?'Continue':'Next up'}: ${nxt.unit.level} · ${nxt.title} →</button>`:''}</div></div>
    ${reviewCard(t.id)}<h2 class="section-title">Choose your level</h2><div class="level-grid">`;
  t.levels.forEach(lv=>{
    const L=LEVELS.find(x=>x.id===lv), us=COURSE.units.filter(u=>u.level===lv&&u.track===t.id), lls=us.flatMap(u=>u.lessons), s=statsOf(lls);
    const locked=!TESTER&&lls.length&&!lessonUnlocked(lls[0].id);
    h+=`<div class="level-card ${s.total&&s.done===s.total?'done':''} ${locked?'locked':''}" onclick="${lls.length?`nav('${t.id}','${lv}')`:''}">
      <div class="level-code">${lv}</div><div class="level-info"><h3>${L.name} ${L.emoji}</h3><p>${(t.id==='adults'&&L.adesc)||L.desc}</p>
      <p class="level-units">${us.length?us.map(u=>`${u.emoji} ${u.title}`).join(' · '):'Coming soon'}</p>
      ${lls.length?`<div class="course-bar"><div style="width:${Math.round(s.done/s.total*100)}%"></div></div><p class="track-meta">${s.done}/${s.total} lessons · ${s.coins}/${s.total*3} coins ${locked?'· 🔒 finish the level before':''}</p>`:''}</div>
      <div class="level-go">${lls.length?(locked?'🔒':'›'):'⏳'}</div></div>`;
  });
  h+=`</div>`;
  return h;
}
/* screen 3: one level — its units and lessons */
function levelHtml(t,lv){
  const L=LEVELS.find(x=>x.id===lv), us=COURSE.units.filter(u=>u.level===lv&&u.track===t.id);
  const i=t.levels.indexOf(lv), prevL=t.levels[i-1], nextL=t.levels[i+1];
  let h=`<div class="level-head big"><div class="level-code">${lv}</div><div class="level-title"><h2>${L.name} ${L.emoji}</h2><p>${(t.id==='adults'&&L.adesc)||L.desc}</p></div></div>`;
  h+=`<div class="panel level-intro">${statsRow(us.flatMap(u=>u.lessons))}</div>`;
  us.forEach(u=>{h+=unitHtml(u);});
  h+=`<div class="level-nav">${prevL?`<button class="btn secondary" onclick="nav('${t.id}','${prevL}')">← ${prevL}</button>`:'<span></span>'}${nextL?`<button class="btn btn-gold" onclick="nav('${t.id}','${nextL}')">${nextL} →</button>`:`<button class="btn secondary" onclick="nav('${t.id}')">All levels</button>`}</div>`;
  return h;
}
function renderCourse(){
  const t=TRACKS.find(x=>x.id===VIEW.track);
  if(VIEW.level&&(!t||!t.levels.includes(VIEW.level))) VIEW.level=null;
  document.body.classList.toggle('adult',!!(t&&t.id==='adults'));
  let h=testerBar()+crumbs();
  if(VIEW.track==='me') h+=progressHtml(); else if(!t) h+=homeHtml(); else if(!VIEW.level) h+=trackHtml(t); else h+=levelHtml(t,VIEW.level);
  h+=`<p style="text-align:center;margin:26px 0 10px;"><a href="#" onclick="resetProgress();return false;" style="color:#9aa0c0;font-size:12px;text-decoration:underline;">Reset my progress</a></p>`;
  $('courseView').innerHTML=courseShell(h);
}

/* ---------- Polish menus & instructions (English learning content stays English) ---------- */
let LANG='en'; try{LANG=localStorage.getItem('lingrowLang')||'en';}catch(e){}
const PL_UI={
 "Tester mode ON":"Tryb testera WŁ.","Tester mode OFF":"Tryb testera WYŁ.",
 "Tester account ON":"Konto testera WŁ.","Tester account OFF":"Konto testera WYŁ.",
 "— everything is open: every level, lesson and premium option, no daily limit. Progress saves to your account.":"— wszystko jest otwarte: każdy poziom, lekcja i opcja Premium, bez dziennego limitu. Postęp zapisuje się na Twoim koncie.",
 "Every lesson is unlocked for your tester account. Progress, coins and streaks save to this account like for a real learner.":"Każda lekcja jest odblokowana na Twoim koncie testera. Postęp, monety i serie zapisują się na tym koncie jak u prawdziwego ucznia.",
 "— every lesson is unlocked and has a ⏭ Skip button.":"— każda lekcja jest odblokowana i ma przycisk ⏭ Pomiń.",
 "— lessons unlock in order, like for real learners.":"— lekcje odblokowują się po kolei, jak u prawdziwych uczniów.",
 "Turn off":"Wyłącz","Turn on":"Włącz","🗺️ Course":"🗺️ Kurs","⏭ Skip":"⏭ Pomiń","🏠 Home":"🏠 Start",
 "Who is learning today?":"Kto się dziś uczy?","Pick your section — each one has its own levels, lessons and style.":"Wybierz sekcję — każda ma swoje poziomy, lekcje i styl.",
 "Not sure where to start?":"Nie wiesz, od czego zacząć?","Take the 3-minute placement test and we'll find your level.":"Zrób 3-minutowy test, a znajdziemy Twój poziom.",
 "Find my level →":"Znajdź mój poziom →","FOR KIDS":"DLA DZIECI","FOR TEENS & ADULTS":"DLA MŁODZIEŻY I DOROSŁYCH","Kids 🧒":"Dzieci 🧒","🧒 Kids":"🧒 Dzieci","Teens & Adults 🧑‍💼":"Młodzież i dorośli 🧑‍💼","🧑‍💼 Teens & Adults":"🧑‍💼 Młodzież i dorośli",
 "Ages 6–12 · playful lessons with Leo, games, music and lots of coins.":"Wiek 6–12 · wesołe lekcje z Leo, gry, muzyka i mnóstwo monet.",
 "Ages 13+ · from your first words to C1 — real-life topics, grammar in depth, calm focused style.":"Wiek 13+ · od pierwszych słów do C1 — prawdziwe tematy, gramatyka, spokojny styl.",
 "Let's play! →":"Gramy! →","Start learning →":"Zacznij naukę →","Reset my progress":"Zresetuj mój postęp",
 "lessons":"lekcje","coins":"monety","points":"punkty","Choose your level":"Wybierz poziom","Coming soon":"Wkrótce",
 "Review":"Powtórka","Review →":"Powtórz →","Words you get wrong will collect here so you can practise them again.":"Tu zbiorą się słowa, w których robisz błędy, żeby je powtórzyć.",
 "Starter 🌱":"Start 🌱","Beginner 🌿":"Początkujący 🌿","Elementary 🌳":"Podstawowy 🌳","Intermediate 🚀":"Średnio zaawansowany 🚀","Upper-intermediate 🎯":"Wyżej średnio zaawansowany 🎯","Advanced 🏆":"Zaawansowany 🏆",
 "Your very first words: hello, numbers, colours, family.":"Twoje pierwsze słowa: powitania, liczby, kolory, rodzina.",
 "Simple everyday life: routines, home, school, free time.":"Proste życie codzienne: rutyna, dom, szkoła, czas wolny.",
 "Talk about habits, past events and plans.":"Mów o nawykach, przeszłości i planach.",
 "Start →":"Start →","Continue →":"Kontynuuj →","↻ Play again":"↻ Zagraj jeszcze raz","All levels":"Wszystkie poziomy",
 "Find your level":"Znajdź swój poziom","First: who is learning?":"Najpierw: kto się uczy?","🧒 A kid (6–12)":"🧒 Dziecko (6–12)","🧑‍💼 A teen or adult":"🧑‍💼 Nastolatek lub dorosły",
 "18 quick questions, about 3 minutes. They get harder as you go — just skip the ones you don't know.":"18 szybkich pytań, ok. 3 minuty. Są coraz trudniejsze — pomiń te, których nie wiesz.",
 "I don't know → skip":"Nie wiem → pomiń","Placement test":"Test poziomujący","PLACEMENT TEST":"TEST POZIOMUJĄCY","YOUR RESULT":"TWÓJ WYNIK","↻ Try again":"↻ Spróbuj ponownie",
 "Start":"Start","Finish!":"Koniec!","Let's start! 🚀":"Zaczynamy! 🚀","Ready? 🚀":"Gotowy? 🚀","← Back":"← Wstecz","Next →":"Dalej →",
 "Click the card to see the translation.":"Kliknij kartę, aby zobaczyć tłumaczenie.","Find the pairs 🧠":"Znajdź pary 🧠","Flip two cards — the picture and the word must match.":"Odwróć dwie karty — obrazek i słowo muszą pasować.",
 "Spell the word":"Ułóż słowo","Match the phrase":"Połącz wyrażenia","Match the English phrase to its translation.":"Połącz angielskie wyrażenie z tłumaczeniem.",
 "Balloon Pop 🎈":"Przebij balon 🎈","Odd one out":"Co nie pasuje?","Which one doesn't belong?":"Które słowo nie pasuje?","Spin the wheel, then type in English what you landed on!":"Zakręć kołem i napisz po angielsku, co wylosowałeś!","Spin the wheel! 🎡":"Zakręć kołem! 🎡","Fortune Wheel 🎡":"Koło fortuny 🎡","Fortune Wheel":"Koło fortuny",
 "⭐ BONUS ROUND ⭐":"⭐ RUNDA BONUSOWA ⭐","Double points! What is this?":"Podwójne punkty! Co to jest?","Lesson complete!":"Lekcja ukończona!","You finished":"Ukończyłeś","is now unlocked! 🔓":"jest już odblokowana! 🔓","Next lesson →":"Następna lekcja →","🗺️ Back to course":"🗺️ Wróć do kursu",
 "Whack-a-Leo! 🔨":"Trafić Leo! 🔨","Fill the gap":"Uzupełnij lukę","Build the sentence":"Ułóż zdanie","↺ Start over":"↺ Od nowa","Find the mistake!":"Znajdź błąd!",
 "Translate the sentences 🌍":"Przetłumacz zdania 🌍","Type the translation or use \"Show answer\".":"Wpisz tłumaczenie albo użyj „Pokaż odpowiedź”.","Check":"Sprawdź","Show answer":"Pokaż odpowiedź",
 "Read the story.":"Przeczytaj historię.","True, False or Not given?":"Prawda, fałsz czy brak informacji?","True or False?":"Prawda czy fałsz?","True ✅":"Prawda ✅","False ❌":"Fałsz ❌","Not given ❔":"Brak informacji ❔",
 "Do the action, then click \"Done!\".":"Zrób ruch, potem kliknij „Gotowe!”.","Done! ✅":"Gotowe! ✅","Listen and choose":"Posłuchaj i wybierz","Listen and choose the same sentence.":"Posłuchaj i wybierz to samo zdanie.",
 "Which is correct?":"Co jest poprawne?","Write it in English ✍️":"Napisz po angielsku ✍️","Not sure where to start?":"Nie wiesz, od czego zacząć?",
 "Get the Leogrow app":"Pobierz aplikację Leogrow","Install":"Zainstaluj",
 "Words":"Słówka","Find it":"Znajdź","Spell it":"Literuj","Match":"Połącz","Balloon Pop":"Balony","Memory":"Memory","Mime & say":"Pokaż i powiedz","Listen":"Słuchanie","Build it":"Ułóż","Find the error":"Znajdź błąd","Fill it":"Uzupełnij","Quiz":"Quiz","Story":"Historyjka","Translation":"Tłumaczenie","Write the words":"Napisz słowa","Word quiz":"Quiz słówek","What does it mean?":"Co to znaczy?","All words":"Wszystkie słowa","Grammar test":"Test z gramatyki","Error hunt":"Polowanie na błędy","True or false?":"Prawda czy fałsz?","True/False/NG":"P/F/BI","Questions":"Pytania","Listening":"Słuchanie",
 "FIND IT!":"ZNAJDŹ!","SPELL IT":"LITERUJ","MATCH":"POŁĄCZ","BALLOON POP":"BALONY","ODD ONE OUT":"NIE PASUJE","BONUS":"BONUS","WHACK-A-LEO":"TRAF LEO","BUILD IT":"UŁÓŻ","READING":"CZYTANIE","READING CHECK":"SPRAWDŹ CZYTANIE","TRUE OR FALSE?":"PRAWDA CZY FAŁSZ?","TYPE IT":"WPISZ","GRAMMAR":"GRAMATYKA","MEMORY":"MEMORY","LISTEN":"SŁUCHANIE","TRANSLATION":"TŁUMACZENIE","WRITING":"PISANIE","QUIZ":"QUIZ","FILL IT":"UZUPEŁNIJ","ERROR HUNT":"POLOWANIE NA BŁĘDY",
};
const PL_RX=[
 [/^Question (\d+) \/ (\d+)$/,"Pytanie $1 / $2"],
 [/^Question (\d+)\/(\d+) — Which (.+) is it\? Click the balloon with the right name\.$/,"Pytanie $1/$2 — Kliknij balon z właściwą nazwą."],
 [/^Question (\d+)\/(\d+) — click the right lemur before it ducks back down!$/,"Pytanie $1/$2 — kliknij właściwego lemura, zanim się schowa!"],
 [/^Word (\d+) \/ (\d+)\. Click the letters in the right order\.$/,"Słowo $1 / $2. Klikaj litery we właściwej kolejności."],
 [/^Choose the correct word\. \((\d+) \/ (\d+)\)$/,"Wybierz poprawne słowo. ($1 / $2)"],
 [/^Build the sentence from the tiles\. \((\d+) \/ (\d+)\)$/,"Ułóż zdanie z klocków. ($1 / $2)"],
 [/^Click the wrong word\. \((\d+) \/ (\d+)\)$/,"Kliknij błędne słowo. ($1 / $2)"],
 [/^Guess the English word for (.+)! (\d+) guesses left\.$/,"Zgadnij angielskie słowo: $1! Zostało prób: $2."],
 [/^(\d+) activities · about (\d+) minutes$/,"Zadań: $1 · ok. $2 min"],
 [/^(\d+)\/(\d+) lessons · (\d+) coins$/,"$1/$2 lekcji · $3 monet"],
 [/^(\d+)\/(\d+) lessons · (\d+)\/(\d+) coins(.*)$/,(m,a,b,c,d,e)=>`${a}/${b} lekcji · ${c}/${d} monet${e.replace('· 🔒 finish the level before','· 🔒 najpierw skończ poprzedni poziom')}`],
 [/^LESSON (\S+)$/,"LEKCJA $1"],[/^(\S+) · LESSON (\S+)$/,"$1 · LEKCJA $2"],[/^UNIT (\d+) · (.+)$/,"DZIAŁ $1 · $2"],
 [/^(\S+) UNIT TEST · FINAL QUIZ$/,"$1 TEST KOŃCOWY DZIAŁU"],[/^(.+) — Unit Test$/,"$1 — test działu"],
 [/^Next up: (.+) →$/,"Następna: $1 →"],[/^Continue: (.+) →$/,"Kontynuuj: $1 →"],[/^Points earned: (\d+) 🪙$/,"Zdobyte punkty: $1 🪙"],
 [/^Wordle (.+)$/,"Wordle $1"],[/^🔒 Finish (\S*) first$/,"🔒 Najpierw ukończ $1"],[/^⏱ ~(\d+) min(.*)$/,(m,a,b)=>`⏱ ~${a} min${b.replace('best','najlepiej').replace('pts','pkt')}`],
 [/^(\d+) tricky words? to review$/,"Słowa do powtórki: $1"],[/^🔥 (\d+) day streak · (\d+) lessons done$/,"🔥 $1 dni z rzędu · ukończone lekcje: $2"],
];
function plText(t){if(PL_UI[t]) return PL_UI[t];for(const [rx,rep] of PL_RX){if(rx.test(t)) return t.replace(rx,rep);}return null;}
const SKIP_PL='.match-item,.memory-card,.unscramble-tile,.unscramble-slot,.reading-text,.lemur-bubble,.flashcard,.fc-card,.wd-grid,input,textarea';
function applyLang(root){
  if(LANG!=='pl') return;
  const w=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);let n;const todo=[];
  while(n=w.nextNode()){const raw=n.nodeValue,t=raw.trim();if(!t||t.length>160)continue;const p=n.parentElement;if(!p||p.closest('script,style')||p.closest(SKIP_PL))continue;
    const r=plText(t);if(r!==null&&r!==t)todo.push([n,raw.replace(t,r)]);}
  todo.forEach(([n,v])=>{if(n._en===undefined)n._en=n.nodeValue;n.nodeValue=v;});
}
let _langQueued=false;
const _langObs=new MutationObserver(()=>{if(LANG!=='pl'||_langQueued)return;_langQueued=true;requestAnimationFrame(()=>{_langQueued=false;applyLang();});});
function markLang(){document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('on',b.dataset.l===LANG));}
function restoreLang(){const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n._en!==undefined){n.nodeValue=n._en;delete n._en;}}}
function setLang(l){LANG=l;if(l==='en')restoreLang();try{localStorage.setItem('lingrowLang',l);}catch(e){}
  markLang();
  if(!activeLesson) renderCourse(); else if(zones[current]&&!['quiz','find','balloon','whack','spell','memory','match','build','wordle','wheel','typed','writing','fill','errors','tf','listen','odd','move','finish'].includes(zones[current].type)) go(current); else if(l==='en') _comboToastText('🇬🇧 English from the next task');
  applyLang();}
(function(){
  const ctl=document.querySelector('.topbar-controls');
  if(ctl){const w=document.createElement('div');w.className='lang-switch';w.id='langSwitch';
    w.innerHTML=`<button class="lang-btn" data-l="pl" title="Polski" onclick="setLang('pl')">🇵🇱</button><button class="lang-btn" data-l="en" title="English" onclick="setLang('en')">🇬🇧</button>`;
    ctl.insertBefore(w,ctl.firstChild);markLang();}
  _langObs.observe(document.body,{childList:true,subtree:true});
})();

/* ---------- Polish versions of lesson descriptions, instructions and grammar explanations ---------- */
Object.assign(PL_UI,{
 "Click:":"Kliknij:","My progress":"Mój postęp","📊 My progress":"📊 Mój postęp","MY PROGRESS":"MÓJ POSTĘP","day streak":"dni z rzędu","Find my level":"Znajdź mój poziom","Menu":"Menu","Home":"Start","Log in":"Zaloguj się","👤 Log in":"👤 Zaloguj","Create your account":"Załóż konto","Log in →":"Zaloguj się →","Create account →":"Załóż konto →","WELCOME BACK":"WITAJ PONOWNIE","NEW ACCOUNT":"NOWE KONTO","YOUR ACCOUNT":"TWOJE KONTO","Create an account":"Załóż konto","Forgot password?":"Nie pamiętasz hasła?","Your progress on this device is kept and added to your account.":"Postęp z tego urządzenia zostanie zachowany i dodany do konta.","Your lessons, coins and review words follow you to every device.":"Twoje lekcje, monety i słowa do powtórki będą na każdym urządzeniu.","Save your progress and continue on any device — PC or phone.":"Zapisz postęp i ucz się na dowolnym urządzeniu — komputerze lub telefonie.","↻ Sync now":"↻ Synchronizuj","Log out":"Wyloguj się","Kids":"Dzieci","Teens & Adults":"Młodzież i dorośli","Got it →":"Rozumiem →","Whack-a-Leo":"Trafiaj Leo","Keep going →":"Dalej →",
 // unit descriptions
 "Greetings, numbers, colours and family.":"Powitania, liczby, kolory i rodzina.",
 "Greetings, introductions, personal details and the verb 'to be'.":"Powitania, przedstawianie się, dane osobowe i czasownik 'to be'.",
 "Pets, farm and wild animals — and a / an, plurals.":"Zwierzęta domowe, wiejskie i dzikie — oraz a / an i liczba mnoga.",
 "Wake up, get ready, go to school.":"Pobudka, szykowanie się, wyjście do szkoły.",
 "Afternoon and evening — and he / she / it.":"Popołudnie i wieczór — oraz he / she / it.",
 "Food, ordering in a café, some / any and 'I'd like'.":"Jedzenie, zamawianie w kawiarni, some / any i 'I'd like'.",
 "Always, usually, never — and questions with do / does.":"Always, usually, never — oraz pytania z do / does.",
 "Transport, hotels and airports — and the Past Simple.":"Transport, hotele i lotniska — oraz czas Past Simple.",
 "Beach, mountains and camping — and the Past Simple with was / were.":"Plaża, góry i biwak — oraz Past Simple z was / were.",
 "Jobs, applying for work, Present Perfect and a job interview.":"Zawody, szukanie pracy, Present Perfect i rozmowa kwalifikacyjna.",
 "Illness, the doctor's, healthy habits and should / must / have to.":"Choroby, wizyta u lekarza, zdrowe nawyki i should / must / have to.",
 "News, social media, the passive voice and reported speech.":"Wiadomości, media społecznościowe, strona bierna i mowa zależna.",
 "Climate, waste and green living — plus second & third conditionals and 'I wish'.":"Klimat, odpady i ekologiczne życie — oraz 2. i 3. tryb warunkowy i 'I wish'.",
 "Idioms, advanced vocabulary, inversion, mixed conditionals and an essay.":"Idiomy, zaawansowane słownictwo, inwersja, mieszane okresy warunkowe i esej.",
 "Urban life, social issues, cleft sentences and participle clauses.":"Życie w mieście, problemy społeczne, zdania typu cleft i konstrukcje imiesłowowe.",
 // level descriptions (adult)
 "First contact: greetings, personal details and the verb 'to be'.":"Pierwszy kontakt: powitania, dane osobowe i czasownik 'to be'.",
 "Everyday situations: food, cafés, shopping and simple requests.":"Codzienne sytuacje: jedzenie, kawiarnie, zakupy i proste prośby.",
 "Travel, past experiences and getting around abroad.":"Podróże, przeszłe doświadczenia i poruszanie się za granicą.",
 "Stories, opinions, travel and the world of work.":"Historie, opinie, podróże i świat pracy.",
 "Discuss, argue and understand longer texts.":"Dyskutuj, argumentuj i rozumiej dłuższe teksty.",
 "Fluent, precise English for school, work and life.":"Płynny, precyzyjny angielski do szkoły, pracy i życia.",
 // lesson intros
 "Your very first English words: hello, goodbye, please, thank you…":"Twoje pierwsze angielskie słowa: cześć, do widzenia, proszę, dziękuję…",
 "Count with Leo! One, two, three… all the way to twenty.":"Licz z Leo! Jeden, dwa, trzy… aż do dwudziestu.",
 "Red, blue, green… ten colours to paint your world.":"Czerwony, niebieski, zielony… dziesięć kolorów, by pomalować świat.",
 "Mum, dad, sister, brother… and 'This is my…'.":"Mama, tata, siostra, brat… i 'This is my…'.",
 "Twelve everyday phrases for meeting people — at work, in a hotel, anywhere.":"Dwanaście codziennych zwrotów na spotkania z ludźmi — w pracy, w hotelu, wszędzie.",
 "Name, surname, address, phone number… the details every form asks for.":"Imię, nazwisko, adres, telefon… dane, o które pyta każdy formularz.",
 "The most important verb in English: am / is / are — plus questions and negatives.":"Najważniejszy czasownik w angielskim: am / is / are — plus pytania i przeczenia.",
 "Read a short dialogue at a language school, then answer, translate and write about yourself.":"Przeczytaj krótki dialog w szkole językowej, potem odpowiadaj, tłumacz i napisz o sobie.",
 "Twelve animals from home and the farm. Woof! Moo! Quack!":"Dwanaście zwierząt z domu i z wiejskiego podwórka. Hau! Muu! Kwa!",
 "Lions, elephants, penguins… and Leo's lemur cousins! Twelve wild animals.":"Lwy, słonie, pingwiny… i kuzyni Leo — lemury! Dwanaście dzikich zwierząt.",
 "A or an? One cat, two cats — and some funny plurals!":"A czy an? Jeden kot, dwa koty — i kilka śmiesznych liczb mnogich!",
 "Read about Leo's trip to the zoo, then answer, translate and write about your favourite animal!":"Przeczytaj o wycieczce Leo do zoo, potem odpowiadaj, tłumacz i napisz o ulubionym zwierzęciu!",
 "Ten words for the very start of your day — from the alarm clock to getting dressed.":"Dziesięć słów na sam początek dnia — od budzika do ubierania się.",
 "Breakfast, bag, shoes, coat… and off you go! Ten more words.":"Śniadanie, plecak, buty, kurtka… i ruszamy! Dziesięć kolejnych słów.",
 "Present Simple for routines (I / you / we / they) and telling the time with 'at'.":"Present Simple do codziennych czynności (I / you / we / they) i podawanie godziny z 'at'.",
 "Unit review: a story, a big quiz, a Wordle, the fortune wheel and translation.":"Powtórka działu: historyjka, duży quiz, Wordle, koło fortuny i tłumaczenie.",
 "Ten things you do after school: homework, football, games, swimming, the dog…":"Dziesięć rzeczy, które robisz po szkole: lekcje, piłka, gry, pływanie, pies…",
 "Friends, cooking, dishes, a bath, music, a good book… and bed. Ten evening words.":"Przyjaciele, gotowanie, zmywanie, kąpiel, muzyka, dobra książka… i spać. Dziesięć wieczornych słów.",
 "He / she / it — the verb gets an -s (or -es)!":"He / she / it — czasownik dostaje -s (albo -es)!",
 "Unit review: read about Mia, then whack, guess, sort out mistakes and translate.":"Powtórka działu: przeczytaj o Mii, potem trafiaj, zgaduj, poprawiaj błędy i tłumacz.",
 "Twelve food words for shopping, cooking and eating out.":"Dwanaście słów o jedzeniu — na zakupy, do gotowania i do restauracji.",
 "Order like a local: menus, drinks, the bill and a polite 'I'd like…'.":"Zamawiaj jak miejscowy: karta, napoje, rachunek i grzeczne 'I'd like…'.",
 "Countable and uncountable food, some / any, and polite requests.":"Rzeczowniki policzalne i niepoliczalne, some / any i grzeczne prośby.",
 "Read about two colleagues having lunch, then answer, translate and write.":"Przeczytaj o dwóch współpracownikach na lunchu, potem odpowiadaj, tłumacz i pisz.",
 "Words that say how often: always, usually, often, sometimes, hardly ever, never — plus every day, once a week and more.":"Słowa mówiące jak często: always, usually, often, sometimes, hardly ever, never — plus every day, once a week i inne.",
 "Where does 'always' go? Before the verb — but after 'be'!":"Gdzie stawiamy 'always'? Przed czasownikiem — ale po 'be'!",
 "Questions and negatives: do / does, don't / doesn't — and short answers.":"Pytania i przeczenia: do / does, don't / doesn't — i krótkie odpowiedzi.",
 "Final challenge: read about Leo's week, then quiz, wheel, Wordle and write about YOUR routine.":"Wielki finał: przeczytaj o tygodniu Leo, potem quiz, koło, Wordle i napisz o SWOIM dniu.",
 "Twelve words for getting from A to B — tickets, platforms, delays.":"Dwanaście słów o podróżowaniu z A do B — bilety, perony, opóźnienia.",
 "Book a room, check in, find your gate — the phrases every traveller needs.":"Zarezerwuj pokój, zamelduj się, znajdź wyjście — zwroty dla każdego podróżnika.",
 "Talk about trips: regular -ed verbs, common irregular verbs, questions and negatives.":"Opowiadaj o podróżach: czasowniki regularne -ed, popularne nieregularne, pytania i przeczenia.",
 "Read a short travel blog post, then answer, translate and write your own.":"Przeczytaj krótki wpis z bloga podróżniczego, potem odpowiadaj, tłumacz i napisz własny.",
 "Beach or mountains? Twelve words for holiday places and things to pack.":"Plaża czy góry? Dwanaście słów o miejscach wakacyjnych i rzeczach do spakowania.",
 "Swim, hike, camp, fish… twelve things to do on holiday!":"Pływanie, wędrówki, biwak, ryby… dwanaście rzeczy do robienia na wakacjach!",
 "Talk about your holiday: was / were and past verbs with -ed (plus a few special ones).":"Opowiedz o wakacjach: was / were i czasowniki z -ed (plus kilka wyjątków).",
 "Read Leo's holiday diary, then answer, translate and write about YOUR holiday!":"Przeczytaj wakacyjny pamiętnik Leo, potem odpowiadaj, tłumacz i napisz o SWOICH wakacjach!",
 "Twelve jobs — and how to describe what people do at work.":"Dwanaście zawodów — i jak opisać, co ludzie robią w pracy.",
 "CVs, interviews, salary, overtime, promotion — the language of work.":"CV, rozmowy, pensja, nadgodziny, awans — język pracy.",
 "Present Perfect for experience — and how it's different from the Past Simple.":"Present Perfect do mówienia o doświadczeniach — i czym różni się od Past Simple.",
 "Read about Zofia's first job interview, then answer, write and translate.":"Przeczytaj o pierwszej rozmowie kwalifikacyjnej Zofii, potem odpowiadaj, pisz i tłumacz.",
 "Symptoms, illnesses and the language of a visit to the doctor's.":"Objawy, choroby i język wizyty u lekarza.",
 "Habits, diets and phrasal verbs for a healthier life.":"Nawyki, diety i czasowniki frazowe dla zdrowszego życia.",
 "Advice and obligation: should, must, have to, don't have to and mustn't.":"Rady i obowiązki: should, must, have to, don't have to i mustn't.",
 "Read about Marek's month of healthy living, then answer, translate and give advice.":"Przeczytaj o zdrowym miesiącu Marka, potem odpowiadaj, tłumacz i dawaj rady.",
 "Fake news, clickbait, reliable sources — talk about media like a pro.":"Fake newsy, clickbait, wiarygodne źródła — mów o mediach jak zawodowiec.",
 "Screen time, privacy, AI, cyberbullying — and phrasal verbs for technology.":"Czas przed ekranem, prywatność, AI, cyberprzemoc — i czasowniki frazowe o technologii.",
 "The passive voice — perfect for news: 'The video was watched by millions.'":"Strona bierna — idealna do wiadomości: 'The video was watched by millions.'",
 "Reported speech — and an article about screen time to read, discuss and write about.":"Mowa zależna — i artykuł o czasie przed ekranem do przeczytania, omówienia i opisania.",
 "Precise vocabulary for the biggest environmental problems of our time.":"Precyzyjne słownictwo o największych problemach środowiska naszych czasów.",
 "Renewable energy, waste and everyday choices — the language of solutions.":"Energia odnawialna, odpady i codzienne wybory — język rozwiązań.",
 "Second and third conditionals — and 'I wish / If only' for regrets.":"Drugi i trzeci tryb warunkowy — oraz 'I wish / If only' do wyrażania żalu.",
 "Read an article about a town that banned cars, then analyse, translate and argue.":"Przeczytaj artykuł o mieście, które zakazało samochodów, potem analizuj, tłumacz i argumentuj.",
 "Idioms that native speakers use about stress, work and rest.":"Idiomy, których rodzimi użytkownicy używają o stresie, pracy i odpoczynku.",
 "Precise vocabulary for discussing productivity, workload and wellbeing.":"Precyzyjne słownictwo o produktywności, obciążeniu pracą i dobrostanie.",
 "Advanced grammar: inversion for emphasis, and mixed conditionals.":"Zaawansowana gramatyka: inwersja dla podkreślenia i mieszane okresy warunkowe.",
 "Read an essay on the four-day week, analyse its arguments and write your own.":"Przeczytaj esej o czterodniowym tygodniu pracy, przeanalizuj argumenty i napisz własny.",
 "Precise vocabulary to describe neighbourhoods, housing and the pressures of modern cities.":"Precyzyjne słownictwo o dzielnicach, mieszkaniach i presji współczesnych miast.",
 "Formal vocabulary for discussing inequality, policy and community action.":"Formalne słownictwo o nierównościach, polityce i działaniach społecznych.",
 "Cleft sentences for emphasis, and participle clauses for concise, formal writing.":"Zdania typu cleft dla podkreślenia i konstrukcje imiesłowowe w zwięzłym, formalnym stylu.",
 "Read an essay on the '15-minute city', analyse its argument and write your own.":"Przeczytaj esej o '15-minutowym mieście', przeanalizuj argumenty i napisz własny.",
 // writing tasks
 "Introduce yourself ✍️":"Przedstaw się ✍️","My favourite animal ✍️":"Moje ulubione zwierzę ✍️","What do you eat? ✍️":"Co jesz? ✍️","My Routine ✍️":"Mój dzień ✍️","Your last trip ✍️":"Twoja ostatnia podróż ✍️","My last holiday ✍️":"Moje ostatnie wakacje ✍️","Your cover letter ✍️":"Twój list motywacyjny ✍️","Give some advice ✍️":"Daj radę ✍️","Your opinion ✍️":"Twoja opinia ✍️","Should your city ban cars? ✍️":"Czy twoje miasto powinno zakazać aut? ✍️","Your essay ✍️":"Twój esej ✍️",
 "Write about yourself (min. 30 words): name, age, city, job, family.":"Napisz o sobie (min. 30 słów): imię, wiek, miasto, praca, rodzina.",
 "Write about your favourite animal (min. 20 words).":"Napisz o swoim ulubionym zwierzęciu (min. 20 słów).",
 "Write about your typical meals (min. 40 words). Use some / any and I like / I'd like.":"Napisz o swoich typowych posiłkach (min. 40 słów). Użyj some / any oraz I like / I'd like.",
 "Write about your normal week (min. 40 words). Use always / usually / often / sometimes / hardly ever / never and twice a week / at the weekend!":"Napisz o swoim zwykłym tygodniu (min. 40 słów). Użyj always / usually / often / sometimes / hardly ever / never oraz twice a week / at the weekend!",
 "Write a short blog post about a trip (min. 50 words). Use at least five verbs in the Past Simple.":"Napisz krótki wpis na bloga o podróży (min. 50 słów). Użyj co najmniej pięciu czasowników w Past Simple.",
 "Write about your last holiday (min. 30 words). Use was / were and past verbs!":"Napisz o swoich ostatnich wakacjach (min. 30 słów). Użyj was / were i czasowników w przeszłości!",
 "Write a short email applying for the job at Café Luna (min. 60 words). Use the Present Perfect at least twice!":"Napisz krótki e-mail z podaniem o pracę w Café Luna (min. 60 słów). Użyj Present Perfect co najmniej dwa razy!",
 "A friend is always tired and stressed. Write an email with advice (min. 70 words). Use should, have to and mustn't.":"Przyjaciel jest ciągle zmęczony i zestresowany. Napisz e-mail z radami (min. 70 słów). Użyj should, have to i mustn't.",
 "Is screen time really so bad? Write a short opinion paragraph (min. 80 words). Use at least one passive and one reported-speech sentence.":"Czy czas przed ekranem naprawdę jest taki zły? Napisz krótki akapit z opinią (min. 80 słów). Użyj co najmniej jednego zdania w stronie biernej i jednego w mowie zależnej.",
 "Write an opinion essay (min. 120 words). Give arguments for and against, and use at least one 2nd and one 3rd conditional.":"Napisz esej z opinią (min. 120 słów). Podaj argumenty za i przeciw oraz użyj co najmniej jednego 2. i jednego 3. trybu warunkowego.",
 "Should your country introduce a four-day working week? Write a balanced essay (min. 150 words). Use at least two idioms from this unit, one inversion and one mixed conditional.":"Czy twój kraj powinien wprowadzić czterodniowy tydzień pracy? Napisz wyważony esej (min. 150 słów). Użyj co najmniej dwóch idiomów z tego działu, jednej inwersji i jednego mieszanego okresu warunkowego.",
 "'Cities should be designed for people, not cars.' Discuss (min. 180 words). Use at least two cleft sentences and two participle clauses.":"'Miasta powinny być projektowane dla ludzi, nie dla aut.' Omów (min. 180 słów). Użyj co najmniej dwóch zdań typu cleft i dwóch konstrukcji imiesłowowych.",
 // task instructions
 "Is it a word for meeting someone (👋 hello) or leaving (🖐️ goodbye)?":"Czy to słowo na powitanie (👋 hello), czy na pożegnanie (🖐️ goodbye)?",
 "Not given = the text doesn't say.":"Brak informacji = tekst tego nie mówi.","Not given = the story doesn't say.":"Brak informacji = historyjka tego nie mówi.","Not given = the article doesn't say.":"Brak informacji = artykuł tego nie mówi.","Not given = the essay doesn't say.":"Brak informacji = esej tego nie mówi.",
 "Look and think! 🐘🦒🐧🐍":"Popatrz i pomyśl! 🐘🦒🐧🐍",
 "Is the sentence a fact (you can check it) or an opinion (what someone thinks)?":"Czy to zdanie to fakt (można go sprawdzić), czy opinia (czyjeś zdanie)?",
 "Word quiz done! 🎯":"Quiz słówek ukończony! 🎯","Vocabulary test done! 📝":"Test słownictwa ukończony! 📝","Grammar test done! 📝":"Test z gramatyki ukończony! 📝","Done! 🎯":"Gotowe! 🎯",
 "🇵🇱 → 🇬🇧 Write the English word or phrase":"🇵🇱 → 🇬🇧 Napisz angielskie słowo lub zwrot","🇵🇱 → 🇬🇧 Polish to English":"🇵🇱 → 🇬🇧 Z polskiego na angielski","🔁 Rewrite in the passive":"🔁 Przepisz w stronie biernej","💬 Report what they said (start with the words given)":"💬 Przekaż, co powiedzieli (zacznij od podanych słów)","✍️ Paraphrase / translate":"✍️ Sparafrazuj / przetłumacz",
 "Translate ✍️":"Przetłumacz ✍️",
 // set / zone titles
 "Which word is it? 🔎":"Które to słowo? 🔎","Hello or goodbye?":"Cześć czy do widzenia?","Numbers":"Liczby","Which number is it? 🔎":"Która to liczba? 🔎","Colours":"Kolory","Which colour is it? 🔎":"Który to kolor? 🔎","My family":"Moja rodzina","Who is it? 🔎":"Kto to? 🔎","Which one is it? 🔎":"Które to? 🔎","Greetings":"Powitania","Personal details":"Dane osobowe","Which detail is it? 🔎":"Która to informacja? 🔎","Pets & farm animals":"Zwierzęta domowe i wiejskie","Wild animals":"Dzikie zwierzęta","Which animal is it? 🔎":"Które to zwierzę? 🔎","Morning words":"Poranne słowa","Which action is it? 🔎":"Która to czynność? 🔎","Getting ready":"Szykowanie się","Telling the time":"Podawanie godziny","After school":"Po szkole","Which activity is it? 🔎":"Która to czynność? 🔎","In the evening":"Wieczorem","Food":"Jedzenie","In a café":"W kawiarni","Which phrase is it? 🔎":"Który to zwrot? 🔎","How often?":"Jak często?","Getting around":"Poruszanie się","At the hotel & airport":"W hotelu i na lotnisku","Holiday places & things":"Wakacyjne miejsca i rzeczy","Holiday activities":"Wakacyjne zajęcia","What are they doing? 🔎":"Co oni robią? 🔎","Jobs":"Zawody","Which job is it? 🔎":"Który to zawód? 🔎","The world of work":"Świat pracy","At the doctor's":"U lekarza","A healthy lifestyle":"Zdrowy styl życia","Which habit is it? 🔎":"Który to nawyk? 🔎","Media words":"Słowa o mediach","Life online":"Życie online","Fact or opinion?":"Fakt czy opinia?","Environmental issues":"Problemy środowiska","Green living":"Ekologiczne życie","Which solution is it? 🔎":"Które to rozwiązanie? 🔎","Idioms & expressions":"Idiomy i wyrażenia","Which expression is it? 🔎":"Które to wyrażenie? 🔎","Advanced vocabulary":"Zaawansowane słownictwo","Urban life":"Życie w mieście","Society & debate":"Społeczeństwo i debata","Your tricky words":"Twoje trudne słowa",
 // zone labels
 "Hello or bye?":"Cześć czy pa?","Maths":"Matematyka","What colour?":"Jaki kolor?","Family":"Rodzina","Vocabulary test":"Test słownictwa","What do you say?":"Co powiesz?","Details":"Dane","To be":"To be","Practice":"Ćwiczenia","Dialogue":"Dialog","About me":"O mnie","More errors":"Więcej błędów","Pets":"Zwierzaki","Who says it?":"Kto tak mówi?","Wild":"Dzikie","My animal":"Moje zwierzę","Time words":"Słowa o czasie","Clock whack":"Trafiaj zegary","Big quiz":"Duży quiz","Type it":"Wpisz","What is it?":"Co to jest?","Café":"Kawiarnia","My food":"Moje jedzenie","Word order":"Szyk zdania","Stand up!":"Wstań!","Short answers":"Krótkie odpowiedzi","Final quiz":"Quiz końcowy","My routine":"Mój dzień","Transport":"Transport","Which one?":"Które?","Hotel":"Hotel","Blog":"Blog","My trip":"Moja podróż","Holiday":"Wakacje","What do you need?":"Czego potrzebujesz?","Fun":"Zabawa","Diary":"Pamiętnik","My holiday":"Moje wakacje","Who am I?":"Kim jestem?","Participles":"Imiesłowy","Cover letter":"List motywacyjny","Health":"Zdrowie","What's wrong?":"Co dolega?","Lifestyle":"Styl życia","Modals":"Czasowniki modalne","Article":"Artykuł","Advice":"Rady","Definitions":"Definicje","Agree?":"Zgadzasz się?","Passive voice":"Strona bierna","Rewrite":"Przepisz","Reported speech":"Mowa zależna","Report it":"Przekaż","Opinion":"Opinia","Issues":"Problemy","Solutions":"Rozwiązania","Conditionals":"Tryby warunkowe","Idioms":"Idiomy","Meaning":"Znaczenie","Word forms":"Formy słów","Inversion":"Inwersja","Mixed conditionals":"Mieszane okresy warunkowe","Essay":"Esej","Analysis":"Analiza","Paraphrase":"Parafraza","Urban":"Miasto","In context":"W kontekście","Society":"Społeczeństwo","Cleft & participles":"Cleft i imiesłowy","Greetings":"Powitania","Numbers":"Liczby",
 // tags
 "SORT IT":"POSORTUJ","MATHS IN ENGLISH":"MATEMATYKA PO ANGIELSKU","WHAT COLOUR IS IT?":"JAKI TO KOLOR?","WHAT DO YOU SAY?":"CO POWIESZ?","A FORM":"FORMULARZ","AM, IS OR ARE?":"AM, IS CZY ARE?","READ AGAIN":"PRZECZYTAJ JESZCZE RAZ","WHO SAYS IT?":"KTO TAK MÓWI?","WILD ANIMALS":"DZIKIE ZWIERZĘTA","A OR AN?":"A CZY AN?","WORD QUIZ":"QUIZ SŁÓWEK","MORNING QUIZ":"PORANNY QUIZ","WHAT IS IT?":"CO TO JEST?","ORDERING":"ZAMAWIANIE","A MENU":"KARTA DAŃ","SOME OR ANY?":"SOME CZY ANY?","HOW OFTEN?":"JAK CZĘSTO?","SHORT ANSWERS":"KRÓTKIE ODPOWIEDZI","FINAL QUIZ":"QUIZ KOŃCOWY","WHICH ONE?":"KTÓRE?","TRAVEL PHRASES":"ZWROTY PODRÓŻNE","A BOOKING":"REZERWACJA","PAST FORMS":"FORMY PRZESZŁE","WHAT DO YOU NEED?":"CZEGO POTRZEBUJESZ?","HOLIDAY FUN":"WAKACYJNA ZABAWA","A POSTCARD":"POCZTÓWKA","WAS OR WERE?":"WAS CZY WERE?","WHO AM I?":"KIM JESTEM?","WORK COLLOCATIONS":"KOLOKACJE O PRACY","JOB ADVERT":"OGŁOSZENIE O PRACĘ","PAST PARTICIPLES":"IMIESŁOWY BIERNE","PERFECT OR PAST?":"PERFECT CZY PAST?","WHAT'S WRONG?":"CO DOLEGA?","HEALTHY HABITS":"ZDROWE NAWYKI","A LEAFLET":"ULOTKA","WHICH MODAL?":"KTÓRY MODALNY?","WHAT DOES IT MEAN?":"CO TO ZNACZY?","MEDIA COLLOCATIONS":"KOLOKACJE O MEDIACH","TECH PHRASES":"ZWROTY O TECHNOLOGII","FACT OR OPINION":"FAKT CZY OPINIA","PASSIVE":"STRONA BIERNA","REPORTED SPEECH":"MOWA ZALEŻNA","DEFINE IT":"ZDEFINIUJ","GREEN COLLOCATIONS":"EKOLOGICZNE KOLOKACJE","OFFICE NOTICE":"OGŁOSZENIE W BIURZE","WHICH FORM?":"KTÓRA FORMA?","IDIOMS IN CONTEXT":"IDIOMY W KONTEKŚCIE","MEANING QUIZ":"QUIZ ZNACZEŃ","WORD CHOICE":"DOBÓR SŁÓW","WORD FORMATION":"SŁOWOTWÓRSTWO","INVERSION":"INWERSJA","MIXED CONDITIONALS":"MIESZANE WARUNKOWE","READ CLOSELY":"CZYTAJ UWAŻNIE","IN CONTEXT":"W KONTEKŚCIE","COLLOCATIONS":"KOLOKACJE","REPORT SUMMARY":"PODSUMOWANIE RAPORTU","EMPHASIS & STYLE":"NACISK I STYL","PRESENT SIMPLE":"PRESENT SIMPLE","HE / SHE / IT":"HE / SHE / IT","-S OR -ES?":"-S CZY -ES?","DO / DOES":"DO / DOES","THIS IS MY…":"THIS IS MY…",
 // grammar box titles
 "The verb 'to be'":"Czasownik 'to be'","a / an and plurals":"a / an i liczba mnoga","Some, any & countable nouns":"Some, any i rzeczowniki policzalne","From 100% to 0%":"Od 100% do 0%","Where does the adverb go?":"Gdzie stoi przysłówek?","The Past Simple":"Czas Past Simple","was / were & Past Simple":"was / were i Past Simple","The passive voice":"Strona bierna","Reported speech":"Mowa zależna","2nd & 3rd conditionals · wish":"2. i 3. tryb warunkowy · wish","Inversion for emphasis":"Inwersja dla podkreślenia","Mixed conditionals":"Mieszane okresy warunkowe","Cleft sentences & participle clauses":"Zdania cleft i konstrukcje imiesłowowe","Present Simple — I / you / we / they":"Present Simple — I / you / we / they","He / she / it + -s":"He / she / it + -s",
});
PL_RX.push(
 [/^(\S+) TEST · (ALL WORDS|VOCABULARY|GRAMMAR|FILL THE GAP|MEANINGS|TRANSLATION)$/,(m,a,b)=>`${a.replace('UNIT','DZIAŁ')} TEST · ${{'ALL WORDS':'WSZYSTKIE SŁOWA','VOCABULARY':'SŁOWNICTWO','GRAMMAR':'GRAMATYKA','FILL THE GAP':'UZUPEŁNIJ LUKĘ','MEANINGS':'ZNACZENIA','TRANSLATION':'TŁUMACZENIE'}[b]}`],
 [/^UNIT (\d+) TEST · (.+)$/,"DZIAŁ $1 TEST · $2"],
 [/^(\S+) Unit Test$/,"$1 — test działu"],
 [/^Read the (form|menu|booking|postcard|job advert|leaflet|notice|summary): (.+)$/,(m,a,b)=>`Przeczytaj ${{'form':'formularz','menu':'kartę dań','booking':'rezerwację','postcard':'pocztówkę','job advert':'ogłoszenie o pracę','leaflet':'ulotkę','notice':'ogłoszenie','summary':'podsumowanie'}[a]}: ${b}`],
 [/^Read (Ola)'s postcard: (.+)$/,"Przeczytaj pocztówkę Oli: $2"],
 [/^The final test for (.+?): .*$/,(m,a)=>`Test końcowy działu ${a}: słownictwo, gramatyka, błędy i tłumaczenie. Zdobądź 3 monety, aby wygrać odznakę! To długi test — ok. 10–15 minut. Powodzenia! 🍀`],
);
/* grammar explanations: Polish prose, English examples kept */
const GRAMMAR_PL={
 "The verb 'to be'":[["Use <b>am / is / are</b> for names, age, jobs, countries and feelings.","Używamy <b>am / is / are</b>, mówiąc o imieniu, wieku, zawodzie, kraju i uczuciach."],[">Positive<",">Twierdzenie<"],[">Negative<",">Przeczenie<"],[">Question<",">Pytanie<"],["Short answers:","Krótkie odpowiedzi:"],["Age:","Wiek:"]],
 "a / an and plurals":[["Use <b>a</b> before a consonant sound and <b>an</b> before a vowel sound (a, e, i, o, u).","<b>a</b> stawiamy przed spółgłoską, a <b>an</b> przed samogłoską (a, e, i, o, u)."],["Plurals:","Liczba mnoga:"],["Funny ones:","Wyjątki:"]],
 "Present Simple — I / you / we / they":[["We use the <b>Present Simple</b> for things we do <b>every day</b> — our routines.","<b>Present Simple</b> używamy do rzeczy, które robimy <b>codziennie</b> — do naszej rutyny."],["<b>Telling the time:</b>","<b>Podawanie godziny:</b>"]],
 "He / she / it + -s":[["With <b>he, she, it</b> the verb gets <b>-s</b>.","Z <b>he, she, it</b> czasownik dostaje końcówkę <b>-s</b>."]],
 "Some, any & countable nouns":[["<b>Countable</b> nouns have a plural: an egg → two eggs. <b>Uncountable</b> nouns don't: bread, rice, water, cheese.","Rzeczowniki <b>policzalne</b> mają liczbę mnogą: an egg → two eggs. <b>Niepoliczalne</b> nie mają: bread, rice, water, cheese."],[">Countable<",">Policzalne<"],[">Uncountable<",">Niepoliczalne<"],["Offers and requests use <b>some</b>:","W propozycjach i prośbach używamy <b>some</b>:"],["= I would like (polite).","= I would like (grzecznie: chciałbym)."],["= I enjoy it in general.","= lubię to ogólnie."]],
 "From 100% to 0%":[[">adverb<",">przysłówek<"],["Longer expressions go at the <b>end</b>:","Dłuższe wyrażenia stawiamy na <b>końcu</b>:"],["Question:","Pytanie:"]],
 "Where does the adverb go?":[["The adverb goes <b>before</b> the main verb…","Przysłówek stoi <b>przed</b> głównym czasownikiem…"],["…but <b>after</b> am / is / are:","…ale <b>po</b> am / is / are:"],["Time expressions go at the <b>end</b>:","Określenia czasu stawiamy na <b>końcu</b>:"]],
 "do / does · don't / doesn't":[["After <b>does / doesn't</b> the verb has <b>no -s</b>:","Po <b>does / doesn't</b> czasownik jest <b>bez -s</b>:"]],
 "The Past Simple":[["Use the <b>Past Simple</b> for finished actions in the past:","<b>Past Simple</b> używamy do zakończonych czynności w przeszłości:"],[">Regular (+ed)<",">Regularne (+ed)<"],[">Irregular<",">Nieregularne<"]],
 "was / were & Past Simple":[["<b>Past verbs</b> often end in <b>-ed</b>:","<b>Czasowniki w przeszłości</b> często kończą się na <b>-ed</b>:"],["(special!)","(wyjątek!)"],[">-ed verbs<",">Czasowniki z -ed<"],[">Special verbs<",">Wyjątki<"]],
 "Present Perfect vs Past Simple":[["<b>Present Perfect</b> = have / has + past participle. We use it for <b>experience</b> (no exact time) and for things that are <b>still true</b>.","<b>Present Perfect</b> = have / has + III forma. Używamy go do <b>doświadczeń</b> (bez dokładnego czasu) i rzeczy, które <b>nadal są prawdą</b>."]],
 "should · must · have to":[["Modal verbs + <b>infinitive without 'to'</b>:","Czasowniki modalne + <b>bezokolicznik bez 'to'</b>:"],[">Form<",">Forma<"],[">Meaning<",">Znaczenie<"],[">Example<",">Przykład<"],[">advice<",">rada<"],[">strong obligation (from the speaker)<",">silny obowiązek (od mówiącego)<"],[">obligation (rules, other people)<",">obowiązek (zasady, inni ludzie)<"],[">no obligation — it's not necessary<",">brak obowiązku — nie trzeba<"],[">prohibition — it's forbidden<",">zakaz — nie wolno<"]],
 "The passive voice":[["We use the <b>passive</b> when the action is more important than who did it — very common in news.","<b>Stronę bierną</b> stosujemy, gdy czynność jest ważniejsza niż wykonawca — bardzo częsta w wiadomościach."],[">Tense<",">Czas<"],[">Passive<",">Strona bierna<"],["Form: <b>be</b> (in the right tense) + <b>past participle</b>. Use <b>by</b> for the person:","Forma: <b>be</b> (w odpowiednim czasie) + <b>III forma</b>. Wykonawcę dodajemy z <b>by</b>:"]],
 "Reported speech":[["When we report what someone said, the tense usually moves <b>one step back</b>.","Gdy przekazujemy czyjeś słowa, czas zwykle cofa się <b>o jeden krok</b>."],[">Direct speech<",">Mowa niezależna<"],[">Reported speech<",">Mowa zależna<"],["Also:","Także:"]],
 "2nd & 3rd conditionals · wish":[[">Type<",">Typ<"],[">Form<",">Forma<"],[">Use<",">Użycie<"],["unreal present / future:","nierealna teraźniejszość / przyszłość:"],["unreal past:","nierealna przeszłość:"],["2nd conditional with <b>be</b>:","2. tryb warunkowy z <b>be</b>:"]],
 "Inversion for emphasis":[["After a <b>negative or limiting adverbial</b> at the start of a sentence, we invert the subject and auxiliary — just like in a question. It sounds formal and emphatic.","Po <b>przeczącym lub ograniczającym określeniu</b> na początku zdania zamieniamy podmiot z czasownikiem posiłkowym — jak w pytaniu. Brzmi to formalnie i dobitnie."],[">Normal<",">Zwykle<"],[">Inverted<",">Z inwersją<"]],
 "Mixed conditionals":[["Mixed conditionals connect <b>different times</b>.","Mieszane okresy warunkowe łączą <b>różne czasy</b>."],[">Type<",">Typ<"],[">Example<",">Przykład<"],["(now)","(teraz)"],["(past)","(w przeszłości)"]],
 "Cleft sentences & participle clauses":[["<b>Cleft sentences</b> put the focus on one part of the message.","<b>Zdania typu cleft</b> podkreślają jedną część wypowiedzi."],[">Pattern<",">Wzór<"],[">Example<",">Przykład<"],[">Type<",">Typ<"],["<b>Participle clauses</b> replace a full clause:","<b>Konstrukcje imiesłowowe</b> zastępują całe zdanie podrzędne:"],["Present (-ing): active / same time","Imiesłów -ing: strona czynna / ten sam czas"],["Past (-ed): passive","Imiesłów -ed: strona bierna"],["Perfect: earlier action","Having + III forma: wcześniejsza czynność"],["⚠️ The subject must be the same:","⚠️ Podmiot musi być ten sam:"]],
};
(function(){const _rz=renderZone;renderZone=function(i){const z=zones[i];
  if(LANG==='pl'&&z&&z.type==='grammar'&&GRAMMAR_PL[z.title]){const orig=z.html;let h=orig;GRAMMAR_PL[z.title].forEach(([a,b])=>{h=h.split(a).join(b);});z.html=h;const r=_rz(i);z.html=orig;return r;}
  return _rz(i);};})();


/* ---------- Your course: one current course + level, "My levels", Settings ---------- */
const PROF=()=>C.profile&&TRACKS.find(t=>t.id===C.profile.track)?C.profile:null;
function setProfile(track,level,quiet){
  const t=TRACKS.find(x=>x.id===track); if(!t) return;
  if(!level||!t.levels.includes(level)) level=(C.profile&&C.profile.levels&&C.profile.levels[track])||(C.placed&&C.placed[track])||t.levels[0];
  const levels=Object.assign({},C.profile&&C.profile.levels); levels[track]=level;
  C.profile={track,level,levels};
  // picking a level means "this is my level": open its first lesson (and those below), like the placement test does
  C.placed=C.placed||{}; const pl=C.placed[track];
  if(!pl||PL_LV.indexOf(level)>PL_LV.indexOf(pl)) C.placed[track]=level;
  saveProgress();
  if(!quiet) _comboToastText(T2('✅ Your level: ','✅ Twój poziom: ')+t.emoji+' '+level);
}
const _navOld=nav;
nav=function(track,level){
  if(level&&TRACKS.some(t=>t.id===track)){ setProfile(track,level,PROF()&&PROF().track===track&&PROF().level===level); return _navOld(); }
  return _navOld(track,level);
};
function levelUnitsLessons(tid,lv){return COURSE.units.filter(u=>u.level===lv&&u.track===tid).flatMap(u=>u.lessons);}
function nextInLevel(tid,lv){const ls=levelUnitsLessons(tid,lv);return ls.find(l=>!lessonDone(l.id))||null;}
/* home for a learner who already has a course: only their level */
function myHomeHtml(p){
  const t=TRACKS.find(x=>x.id===p.track), L=LEVELS.find(x=>x.id===p.level), ls=levelUnitsLessons(t.id,p.level);
  const nxt=nextInLevel(t.id,p.level), i=t.levels.indexOf(p.level), nextL=t.levels[i+1];
  const cont=C.active&&nxt&&C.active.id===nxt.id;
  let h=`<div class="panel my-hero"><div class="my-hero-top"><div class="level-code">${p.level}</div><div class="my-hero-text">
      <span class="my-course">${t.emoji} ${t.name}</span><h2 class="title">${L.name} ${L.emoji}</h2>
      <button class="chip-btn" onclick="nav('levels')">🔄 Change level</button></div>
      <div class="hero-leo">${renderLemur('big',t.id==='adults'?['Welcome back.','Ready for the next one?']:["Hi! I'm Leo! 👋","Let's keep going! 🚀"],t.id==='adults'?96:110)}</div></div>
    ${statsRow(ls)}
    ${nxt?`<button class="btn btn-gold my-continue" onclick="openLesson('${nxt.id}')">${cont?'▶ Continue':'▶ Next lesson'}: ${nxt.num} · ${nxt.title} →</button>`
        :`<div class="my-done"><b>🏆 ${p.level} complete!</b>${nextL?`<button class="btn btn-gold" onclick="nav('${t.id}','${nextL}')">Go to ${nextL} →</button>`:''}</div>`}
  </div>${typeof installCard==='function'?installCard():''}${reviewCard(t.id)}`;
  COURSE.units.filter(u=>u.level===p.level&&u.track===t.id).forEach(u=>{h+=unitHtml(u);});
  h+=`<div class="level-nav"><button class="btn secondary" onclick="nav('levels')">📚 My levels</button><button class="btn secondary" onclick="nav('me')">📊 My progress</button></div>`;
  return h;
}
/* every course and level in one place; the current one is highlighted */
function myLevelsHtml(){
  const p=PROF();
  let h=`<div class="panel level-intro">${zoneTag('MY LEVELS')}<h2 class="title">Choose your level</h2><p class="sub">Your progress is saved on every level — switching never loses anything.</p></div>`;
  h+=`<div class="placement-card" onclick="startPlacement()"><span>🧭</span><div><b>Not sure where to start?</b><p>Take the 3-minute placement test and we'll find your level.</p></div><button class="btn btn-gold lesson-btn">Find my level →</button></div>`;
  TRACKS.forEach(t=>{
    h+=`<h2 class="section-title">${t.emoji} ${t.name}</h2><div class="level-grid">`;
    t.levels.forEach(lv=>{
      const L=LEVELS.find(x=>x.id===lv), lls=levelUnitsLessons(t.id,lv), s=statsOf(lls), cur=p&&p.track===t.id&&p.level===lv;
      if(!lls.length) return;
      h+=`<div class="level-card ${cur?'current':''} ${s.done===s.total?'done':''}" onclick="nav('${t.id}','${lv}')">
        <div class="level-code">${lv}</div><div class="level-info"><h3>${L.name} ${L.emoji} ${cur?'<span class="cur-pill">Your level</span>':''}</h3>
        <p>${(t.id==='adults'&&L.adesc)||L.desc}</p><div class="course-bar"><div style="width:${Math.round(s.done/s.total*100)}%"></div></div>
        <p class="track-meta">${s.done}/${s.total} lessons · ${s.coins}/${s.total*3} coins</p></div><div class="level-go">${cur?'✓':'›'}</div></div>`;
    });
    h+=`</div>`;
  });
  return h;
}
const _crumbsOld=crumbs;
crumbs=function(){
  if(VIEW.track==='levels') return `<div class="crumbs"><a href="#" onclick="nav();return false;">🏠 Home</a><span>›</span><b>📚 My levels</b></div>`;
  if(!VIEW.track&&PROF()) return '';
  return _crumbsOld();
};
renderCourse=function(){
  const p=PROF();
  let t=TRACKS.find(x=>x.id===VIEW.track);
  if(VIEW.level&&(!t||!t.levels.includes(VIEW.level))) VIEW.level=null;
  if(t&&VIEW.level){setProfile(t.id,VIEW.level,true);VIEW={track:null,level:null};t=null;}
  const homeT=!VIEW.track&&p?TRACKS.find(x=>x.id===p.track):t;
  document.body.classList.toggle('adult',!!(homeT&&homeT.id==='adults'));
  let h=testerBar()+crumbs();
  if(VIEW.track==='me') h+=progressHtml();
  else if(VIEW.track==='levels') h+=myLevelsHtml();
  else if(t) h+=trackHtml(t);
  else if(p) h+=(TESTER?testerJumpHtml():'')+myHomeHtml(p);
  else h+=homeHtml();
  $('courseView').innerHTML=courseShell(h);
};
const _sideNavMine=function(){
  const p=PROF(), cur=VIEW.track, inPT=typeof PT!=='undefined'&&PT&&!VIEW._leftPT;
  const item=(on,click,icon,label,extra)=>`<a href="#" class="sn-item ${on?'on':''}" onclick="${click};return false;"><span>${icon}</span><b>${label}</b>${extra||''}</a>`;
  let h=`<aside class="side-nav"><div class="sn-title">Menu</div>`;
  h+=item(!cur&&!inPT,"PT=null;nav()","🏠","Home",p?`<small>${p.level}</small>`:'');
  h+=item(cur==='levels'&&!inPT,"PT=null;nav('levels')","📚","My levels");
  h+=item(inPT,"startPlacement()","🧭","Find my level");
  h+=item(cur==='me'&&!inPT,"PT=null;nav('me')","📊","My progress",`<small>🔥 ${streakOf(C.days)}</small>`);
  if(p){const rv=reviewWords(p.track).length; if(rv) h+=item(false,`openReview('${p.track}')`,"🔁","Review",`<small>${rv}</small>`);}
  h+=item(false,"openSettings()","⚙️","Settings");
  return h+`</aside>`;
};
const _sideNavAll=sideNav;
sideNav=function(){return TESTER?_sideNavAll():_sideNavMine();};
function testerJumpHtml(){
  return `<div class="panel tester-jump">${zoneTag('🧪 TESTER')}<h2 class="title">Jump to any level</h2><p class="sub">${typeof testerAccount==='function'&&testerAccount()?'Every lesson is unlocked for your tester account. Progress, coins and streaks save to this account like for a real learner.':'Every lesson is unlocked here. Progress in the tester version is separate and never touches your real account.'}</p>`+
   TRACKS.map(t=>`<div class="tj-row"><b>${t.emoji} ${t.name}</b><div class="set-ctl">${t.levels.filter(lv=>levelUnitsLessons(t.id,lv).length).map(lv=>`<button class="seg ${PROF()&&PROF().track===t.id&&PROF().level===lv?'on':''}" onclick="nav('${t.id}','${lv}')">${lv}</button>`).join('')}</div></div>`).join('')+
   `<p style="margin-top:12px;"><button class="btn secondary lesson-btn" onclick="C.profile=null;saveProgress(true);nav()">See the new-learner home</button></p></div>`;
}
/* ---------- Settings ---------- */
function openSettings(){
  const p=PROF(), tr=p?p.track:null, t=TRACKS.find(x=>x.id===tr);
  const seg=(on,click,label)=>`<button class="seg ${on?'on':''}" onclick="${click}">${label}</button>`;
  let acc='';
  if(cloudOn()) acc=USER?`<div class="set-row"><b>👤 Account</b><div class="set-ctl"><span class="set-note">${(USER.user_metadata&&USER.user_metadata.name)||USER.email}</span>${seg(false,"closeAuth();openAccount()",'Sync & log out')}</div></div>`
                     :`<div class="set-row"><b>👤 Account</b><div class="set-ctl">${seg(false,"openAuth('in')",'Log in')}${seg(false,"openAuth('up')",'Create account')}</div></div>`;
  authModal(`<button class="auth-x" onclick="closeAuth()">✕</button>${zoneTag('SETTINGS')}<h2 class="title">⚙️ Settings</h2>
   <div class="set-list">
    <div class="set-row"><b>🌍 Language</b><div class="set-ctl">${seg(LANG==='pl',"setLang('pl');openSettings()",'🇵🇱 Polski')}${seg(LANG==='en',"setLang('en');openSettings()",'🇬🇧 English')}</div></div>
    <div class="set-row"><b>🎒 Course</b><div class="set-ctl">${TRACKS.map(x=>seg(tr===x.id,`setProfile('${x.id}');VIEW={track:null,level:null};renderCourse();openSettings()`,x.emoji+' '+x.name)).join('')}</div></div>
    ${t?`<div class="set-row"><b>📈 Level</b><div class="set-ctl">${t.levels.filter(lv=>levelUnitsLessons(t.id,lv).length).map(lv=>seg(p.level===lv,`setProfile('${t.id}','${lv}');VIEW={track:null,level:null};renderCourse();openSettings()`,lv)).join('')}</div></div>`:''}
    <div class="set-row"><b>🔊 Sound effects</b><div class="set-ctl">${seg(soundOn,"if(!soundOn)toggleSound();openSettings()",'On')}${seg(!soundOn,"if(soundOn)toggleSound();openSettings()",'Off')}</div></div>
    <div class="set-row"><b>🎵 Music</b><div class="set-ctl">${seg(musicOn,"if(!musicOn)toggleMusic();openSettings()",'On')}${seg(!musicOn,"if(musicOn)toggleMusic();openSettings()",'Off')}</div></div>
    ${acc}
    <div class="set-row"><b>🧭 Placement test</b><div class="set-ctl">${seg(false,"closeAuth();startPlacement()",'Find my level again')}</div></div>
    ${TESTER_ALLOWED?`<div class="set-row"><b>🧪 Tester mode</b><div class="set-ctl">${seg(TESTER,"setTester(true);openSettings()",'On')}${seg(!TESTER,"setTester(false);openSettings()",'Off')}</div></div>`:''}
    <div class="set-row danger"><b>🗑️ Reset progress</b><div class="set-ctl">${seg(false,"resetProgress()",'Reset everything')}</div></div>
   </div>`);
  if(LANG==='pl') applyLang();
}
(function(){
  const ctl=document.querySelector('.topbar-controls');
  if(ctl&&!document.getElementById('settingsBtn')){const b=document.createElement('button');b.id='settingsBtn';b.className='sound-toggle';b.title='Settings';b.textContent='⚙️';b.onclick=openSettings;ctl.appendChild(b);}
})();
Object.assign(PL_UI,{
 "🔄 Change level":"🔄 Zmień poziom","📚 My levels":"📚 Moje poziomy","My levels":"Moje poziomy","MY LEVELS":"MOJE POZIOMY","Your level":"Twój poziom",
 "Your progress is saved on every level — switching never loses anything.":"Postęp jest zapisany na każdym poziomie — zmiana niczego nie kasuje.",
 "SETTINGS":"USTAWIENIA","⚙️ Settings":"⚙️ Ustawienia","Settings":"Ustawienia","🌍 Language":"🌍 Język","🎒 Course":"🎒 Kurs","📈 Level":"📈 Poziom",
 "🔊 Sound effects":"🔊 Efekty dźwiękowe","🎵 Music":"🎵 Muzyka","On":"Wł.","Off":"Wył.","👤 Account":"👤 Konto","Sync & log out":"Synchronizacja i wylogowanie",
 "Log in":"Zaloguj się","Create account":"Załóż konto","🧭 Placement test":"🧭 Test poziomujący","Find my level again":"Sprawdź poziom jeszcze raz",
 "🧪 Tester mode":"🧪 Tryb testera","🗑️ Reset progress":"🗑️ Zresetuj postęp","Reset everything":"Zresetuj wszystko","Teens & Adults":"Młodzież i dorośli","Kids":"Dzieci",
 "🧒 Kids":"🧒 Dzieci","🧑‍💼 Teens & Adults":"🧑‍💼 Młodzież i dorośli","Welcome back.":"Witaj ponownie.","Ready for the next one?":"Gotowy na kolejną?","Let's keep going! 🚀":"Działamy dalej! 🚀",
});

/* tapping the Leogrow badge or name goes back home (stays on the same page, so /tester stays the tester home) */
function goHome(){if(typeof closeAuth==='function')closeAuth();if(activeLesson)showCourse();if(typeof PT!=='undefined')PT=null;nav();}
(function(){const b=document.querySelector('.topbar .brand');if(b){b.setAttribute('role','link');b.title='Home';b.style.cursor='pointer';b.onclick=goHome;}})();

/* ---------- Leo grows with the learner ---------- */
const LEO_AGES={};  // filled in by the build: Leo at different ages
const LEO_STAGES={ // [size, which Leo, name EN, name PL]
 kids:{A0:[.62,'baby','Baby Leo','Mały Leo'],A1:[.72,'little','Little Leo','Malutki Leo'],A2:[.82,'kid','Kid Leo','Leo uczeń']},
 adults:{A0:[.86,'teen','Teen Leo','Nastoletni Leo'],A1:[.92,'teen','Teen Leo','Nastoletni Leo'],A2:[.98,'adult','Young Leo','Młody Leo'],
         B1:[1.04,'adult','Student Leo','Leo student'],B2:[1.1,'senior','Grown-up Leo','Dorosły Leo'],C1:[1.16,'senior','Professor Leo','Profesor Leo']}};
function leoContext(){
  if(activeLesson&&activeLesson.unit) return {track:activeLesson.unit.track,level:activeLesson.unit.level};
  if(typeof PT!=='undefined'&&PT) return null;
  const p=typeof PROF==='function'&&PROF(); if(p&&!VIEW.track) return p;
  return null;
}
function leoGrow(h){
  const c=leoContext(), st=c&&LEO_STAGES[c.track]&&LEO_STAGES[c.track][c.level];
  const rig=LEO_AGES[st?st[1]:'teen']; if(!rig||!rig.b) return h;
  if(st) h=h.replace('class="lemur-wrap"',`class="lemur-wrap" style="--leo-s:${st[0]}"`);
  // Leo as layers: body, a swaying tail and eyelids for blinking
  const lids=rig.e.map(([x,y,rx,ry])=>`<span class="leo-lid" style="left:${x-rx}%;top:${y-ry}%;width:${2*rx}%;height:${2*ry}%"></span>`).join('');
  h=h.replace(/<img class="(lemur-img[^"]*)" id="(lemurImgBase-[^"]+)" src="[^"]*"([^>]*)>/,(m,cls,id,rest)=>
    `<div class="leo-rig"><img class="${cls}" id="${id}" data-age="${st?st[1]:'teen'}" src="${rig.b}"${rest}>${rig.a?`<img class="leo-arm" src="${rig.a}" alt="" draggable="false" style="transform-origin:${rig.s[0]}% ${rig.s[1]}%"><img class="leo-cap" src="${rig.c}" alt="" draggable="false">`:''}<img class="leo-tail" src="${rig.t}" alt="" draggable="false" style="transform-origin:${rig.p[0]}% ${rig.p[1]}%"><img class="leo-front" src="${rig.f}" alt="" draggable="false">${lids}</div>`);
  if(st) h=h.replace(/(<div class="lemur-bubble")/,`<span class="leo-age">${LANG==='pl'?st[3]:st[2]}</span>$1`);
  return h;
}
/* Leo waves: hand comes up, waves, goes back down — on greeting, when tapped, and now and then */
function leoWaveArm(rig){
  if(!rig||rig.classList.contains('waving')) return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  rig.classList.add('waving'); setTimeout(()=>rig.classList.remove('waving'),2700);
}
(function(){
  const _lw=lemurWave; lemurWave=function(id){_lw(id); const w=document.getElementById('lemurWrap-'+id); leoWaveArm(w&&w.querySelector('.leo-rig'));};
  // greet: wave once when a new Leo appears
  new MutationObserver(ms=>{ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType!==1)return;
    const r=n.matches&&n.matches('.leo-rig')?[n]:[...n.querySelectorAll?n.querySelectorAll('.leo-rig'):[]];
    r.forEach(x=>{if(!x.closest('.lemur-corner')) setTimeout(()=>leoWaveArm(x),700);});}));}).observe(document.body,{childList:true,subtree:true});
  // and now and then on his own
  setInterval(()=>{document.querySelectorAll('.leo-rig').forEach(r=>{if(Math.random()<0.04) leoWaveArm(r);});},1000);
})();
/* Leo blinks now and then */
(function(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setInterval(()=>{document.querySelectorAll('.leo-rig:not(.blink)').forEach(r=>{
    if(Math.random()<0.075){r.classList.add('blink');setTimeout(()=>{r.classList.remove('blink');
      if(Math.random()<0.18) setTimeout(()=>{r.classList.add('blink');setTimeout(()=>r.classList.remove('blink'),190);},120);},190);}
  });},400);
})();

initCloud();

/* --- Fit text inside cards: long sentences in big answer cards and long words on memory cards
   shrink until they fit, so nothing spills over the edge on phone, tablet or PC. --- */
(function(){
  const SEL='.opt,.memory-front,.tile,.wd-cell,.cb-card,.flash-front,.flash-back,.lesson-chip,.btn';
  function isTextual(el){const t=(el.textContent||'').trim();return t.length>3&&/[A-Za-zÀ-ž]/.test(t);}
  function fit(el){
    if(!el.isConnected)return;
    el.style.fontSize='';
    if(el.classList.contains('big-opt')&&isTextual(el))el.classList.add('big-txt');
    let fs=parseFloat(getComputedStyle(el).fontSize),n=0;
    while(n++<30&&fs>12&&(el.scrollWidth>el.clientWidth+1||el.scrollHeight>el.clientHeight+1&&getComputedStyle(el).overflow!=='visible'&&el.clientHeight>0)){
      fs-=1;el.style.fontSize=fs+'px';
    }
  }
  function fitAll(root){(root||document).querySelectorAll(SEL).forEach(el=>{if(el.offsetWidth||el.closest('.memory-card'))fit(el);});}
  window.fitText=fitAll;
  let raf=0;const later=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>fitAll());};
  document.addEventListener('DOMContentLoaded',()=>{
    new MutationObserver(later).observe(document.body,{childList:true,subtree:true});
    window.addEventListener('resize',later);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(later);
    later();
  });
})();

/* --- Back navigation: an in-app ← Back button, and the phone/browser back button moves
   back inside Leogrow (lesson → course page → level → track → home) instead of leaving
   the site. Each course screen and each opened lesson is a browser history entry. --- */
(function(){
  let ready=false,popping=false,depth=0;
  const stateNow=()=>activeLesson?{lg:'l',id:activeLesson.id}:{lg:'c',t:(VIEW&&VIEW.track)||null,l:(VIEW&&VIEW.level)||null};
  const same=(a,b)=>a&&b&&a.lg===b.lg&&a.id===b.id&&a.t===b.t&&a.l===b.l;
  function record(){
    if(!ready||popping)return;
    const s=stateNow();
    if(same(history.state,s))return;
    try{history.pushState(s,'');depth++;}catch(e){}
    updateBack();
  }
  function updateBack(){
    const atHome=!activeLesson&&!(VIEW&&VIEW.track)&&!(typeof PT!=='undefined'&&PT);
    document.body.classList.toggle('can-back',!atHome);
  }
  function parentOf(){
    if(activeLesson)return 'course';
    if(VIEW&&VIEW.level)return [VIEW.track,null];
    if(VIEW&&VIEW.track)return [null,null];
    return null;
  }
  window.appBack=function(){
    if(depth>0){history.back();return;}
    const p=parentOf();
    if(p==='course')showCourse();
    else if(p){if(typeof PT!=='undefined')PT=null;nav(p[0],p[1]);}
    updateBack();
  };
  window.addEventListener('popstate',e=>{
    const s=e.state;if(!s||!s.lg)return;
    popping=true;depth=Math.max(0,depth-1);
    try{
      if(s.lg==='l'){if(!activeLesson||activeLesson.id!==s.id){if(activeLesson)showCourse();openLesson(s.id);}}
      else{if(activeLesson)showCourse();if(typeof PT!=='undefined')PT=null;nav(s.t,s.l);}
    }catch(err){}
    popping=false;updateBack();
  });
  const wrap=(name)=>{const f=window[name];if(typeof f!=='function')return;window[name]=function(){const r=f.apply(this,arguments);record();updateBack();return r;};};
  window.addEventListener('load',()=>{
    ['nav','openLesson','showCourse'].forEach(wrap);
    const bar=document.querySelector('.topbar-controls');
    if(bar&&!document.getElementById('appBack'))bar.insertAdjacentHTML('afterbegin','<button class="app-back" id="appBack" onclick="appBack()" title="Go back">← Back</button>');
    try{history.replaceState(stateNow(),'');}catch(e){}
    setTimeout(()=>{ready=true;updateBack();},300);
  });
})();
