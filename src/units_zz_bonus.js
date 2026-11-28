/* =====================================================================
   BONUS LESSONS ON LEVELS (2026-11-28)
   Every Shop bonus lesson is bought once and then has level buttons:
   Kids · A1, Teens & Adults · A2 and Teens & Adults · B1 (Football: Kids A2, A2, B1).
   The old single bonus lessons stay as the Kids · A1 version (same ids, so
   progress is kept). rewards.js reads BONUS_VERSIONS and BONUS_NEW.
   ===================================================================== */
const BX={};
/* one builder for every level: the same blocks, more and harder at higher levels */
BX.mk=function(d,lv){
 const kid=lv==='kids', b1=lv==='b1', W=d.words;
 const z=[{type:'cards',label:d.wordsLabel||'Words',title:d.cardsTitle,cards:W},
  {type:'find',label:'Find it',cards:W,rounds:kid?8:10}];
 if(kid)z.push({type:'balloon',label:'Balloon Pop',cards:W,rounds:8},{type:'memory',label:'Memory',pairs:memOf(W.slice(0,6))});
 else z.push({type:'match',label:'Match',pairs:W.slice(0,8)});
 if(d.reading)z.push({type:'reading',label:d.reading.label||'Read',title:d.reading.title,paras:d.reading.paras});
 if(d.tf)z.push({type:'tf',label:'True or false?',title:d.tf.title||'True, False or Not given?',sub:d.tf.sub||'',tag:'READING',labels:d.tf.three?TF3:undefined,items:d.tf.items});
 z.push({type:'quiz',label:d.quizLabel||'Quiz',tag:d.quizTag||'QUIZ',qs:d.quiz});
 z.push({type:'fill',label:'Fill the gap',tag:d.fillTag||'FILL IT',items:d.fill});
 if(d.errors)z.push({type:'errors',label:'Find the error',items:d.errors});
 if(d.build)z.push({type:'build',label:'Build it',items:d.build});
 if(d.listen)z.push({type:'listen',label:'Listen',items:d.listen});
 if(d.move&&kid)z.push({type:'move',label:'Act it out',items:d.move});
 if(!kid)z.push({type:'typed',label:'Write it',tag:'TYPE IT',title:'Write it in English ✍️',blocks:[{id:d.id+'-tw',label:'🇵🇱 → 🇬🇧',items:W.slice(0,b1?8:6).map(w=>({prompt:`${w.emoji} ${w.pl}`,answers:[w.en]}))}]});
 if(d.writing&&b1)z.push({type:'writing',label:'Write',title:d.writing.title,sub:d.writing.sub,starters:d.writing.starters,min:d.writing.min||60});
 if(d.wordle)z.push({type:'wordle',label:'Wordle',words:WL(d.wordle)});
 z.push({type:'wheel',label:'Fortune Wheel',items:W.slice(0,10)});
 return z;
};
BX.TAG={kids:['kids','A1','Kids · A1'],a2:['adults','A2','Teens & Adults · A2'],b1:['adults','B1','Teens & Adults · B1']};
BX.v=(id,lv,intro,d)=>{const t=BX.TAG[lv];d.id=id;return {id,track:t[0],level:t[1],tag:t[2],intro,zones:BX.mk(d,lv)};};

/* ================= EVERYDAY IDIOMS: A2 + B1 ================= */
const BONUS_VERSIONS={};
BONUS_VERSIONS.b_idioms=[
 BX.v('bonus-idioms-a2','a2','Twelve everyday idioms about feelings, time and money — what they really mean and when to use them.',{
  cardsTitle:'Twelve everyday idioms',wordsLabel:'Idioms',words:V([
   ["piece of cake","bułka z masłem","🍰"],["break the ice","przełamać lody","🧊"],["under the weather","nie czuć się najlepiej","🤒"],["hit the books","wziąć się do nauki","📚"],
   ["once in a blue moon","raz na ruski rok","🌕"],["cost an arm and a leg","kosztować majątek","💸"],["call it a day","skończyć na dziś","🛑"],["on cloud nine","w siódmym niebie","☁️"],
   ["in hot water","w tarapatach","♨️"],["keep an eye on","mieć oko na","👀"],["a big fish","gruba ryba (ważna osoba)","🐟"],["the last straw","kropla, która przelała czarę","🥤"]]),
  quizTag:'IDIOMS',quiz:[
   {q:"I'm in hot water with my mum. I…",opts:["am in trouble","am in the bath","am very happy"],correct:0},
   {q:"Can you keep an eye on my bag? Can you…",opts:["watch it for me","close your eye","buy it"],correct:0},
   {q:"He's a big fish in our town. He is…",opts:["an important person","a fisherman","very fat"],correct:0},
   {q:"The noise was the last straw. After the noise I…",opts:["couldn't take any more","had a drink","felt better"],correct:0},
   {q:"The maths test was a piece of cake. It was…",opts:["very easy","very hard","delicious"],correct:0},
   {q:"I only go to the cinema once in a blue moon. I go…",opts:["very rarely","every week","at night"],correct:0},
   {q:"I'm under the weather today. I…",opts:["feel a bit ill","am outside","love the rain"],correct:0},
  ],
  fill:[
   {before:"I've got an exam tomorrow, so tonight I have to hit the",blank:"books",after:".",bank:["books","ball","road"],emoji:"📚"},
   {before:"New trainers cost an arm and a",blank:"leg",after:"!",bank:["leg","foot","hand"],emoji:"💸"},
   {before:"I broke Dad's phone. Now I'm in hot",blank:"water",after:".",bank:["water","tea","soup"],emoji:"♨️"},
   {before:"We're tired. Let's call it a",blank:"day",after:".",bank:["day","night","friend"],emoji:"🛑"},
   {before:"She got the main part in the play. She's on cloud",blank:"nine",after:".",bank:["nine","seven","ten"],emoji:"☁️"},
  ],
  build:[{s:"The test was a piece of cake.",pl:"Test był bułką z masłem."},{s:"Can you keep an eye on my dog?",pl:"Możesz mieć oko na mojego psa?"},{s:"Let's call it a day.",pl:"Skończmy na dziś."}],
  wordle:[["cake","🍰"],["moon","🌕"],["straw","🥤"]]}),
 BX.v('bonus-idioms-b1','b1','Sixteen idioms for real conversations: work, decisions, secrets and success — plus an email full of them.',{
  cardsTitle:'Idioms for real life',wordsLabel:'Idioms',words:V([
   ["break the ice","przełamać lody","🧊"],["spill the beans","wygadać się","🫘"],["cost an arm and a leg","kosztować majątek","💸"],["in hot water","w tarapatach","♨️"],
   ["the ball is in your court","teraz twój ruch","🎾"],["sit on the fence","nie opowiadać się po żadnej stronie","🚧"],["cut corners","iść na skróty (byle jak)","✂️"],["get cold feet","stchórzyć w ostatniej chwili","🥶"],
   ["hit the nail on the head","trafić w sedno","🔨"],["a blessing in disguise","szczęście w nieszczęściu","🎁"],["burn the midnight oil","pracować do późna w nocy","🕯️"],["see eye to eye","zgadzać się","🤝"],
   ["once in a blue moon","raz na ruski rok","🌕"],["learn the ropes","wdrożyć się, nauczyć się podstaw","🪢"],["a piece of cake","bułka z masłem","🍰"],["under the weather","nie czuć się najlepiej","🤒"]]),
  reading:{title:"Email: My first week at the new job 📧",paras:[
   "Hi Kasia,<br>Thanks for your message! My first week at the café was busy. On Monday I didn't know anyone, so I told a few silly jokes to <b>break the ice</b>. It worked — everyone laughed!",
   "I'm still <b>learning the ropes</b>. The coffee machine is very complicated, and on Tuesday I <b>cut corners</b> and didn't clean it properly. My manager noticed, so I was <b>in hot water</b> for a while. 😬",
   "The good news is that my manager and I <b>see eye to eye</b> on most things. She says I <b>hit the nail on the head</b> when I suggested a new cake menu. Losing my old job was really <b>a blessing in disguise</b>!",
   "Anyway, you asked about the trip to Gdańsk. I'd love to come, but I'm <b>burning the midnight oil</b> this month because of my exams. You decide the date — <b>the ball is in your court</b>! 🎾<br>Love, Ola"]},
  tf:{three:true,sub:'Read Ola\'s email. Not given = the email doesn\'t say.',items:[
   {text:"Ola told jokes on her first day.",answer:0},{text:"Ola already knows everything about the job.",answer:1},
   {text:"Ola cleaned the coffee machine badly on Tuesday.",answer:0},{text:"Ola and her manager often disagree.",answer:1},
   {text:"The manager liked Ola's idea for a new menu.",answer:0},{text:"Ola's old job was in a bank.",answer:2},{text:"Ola wants Kasia to choose the date.",answer:0}]},
  quizTag:'IDIOMS · B1',quiz:[
   {q:"'Stop sitting on the fence!' means…",opts:["Choose a side!","Get down, it's dangerous!","Go outside!"],correct:0},
   {q:"He got cold feet before the wedding. He…",opts:["got nervous and wanted to stop","needed warm socks","danced all night"],correct:0},
   {q:"Who spilled the beans about the party? Who…",opts:["told the secret","made a mess","cooked dinner"],correct:0},
   {q:"You've hit the nail on the head. You are…",opts:["exactly right","very strong","hurt"],correct:0},
   {q:"Losing the match was a blessing in disguise. It was…",opts:["bad but it had a good result","a present","a costume party"],correct:0},
   {q:"I've sent my offer. The ball is in your court. Now…",opts:["it's your decision","let's play tennis","you lost"],correct:0},
   {q:"Builders who cut corners…",opts:["do the job cheaply and badly","make round buildings","work very carefully"],correct:0},
  ],
  fill:[
   {before:"Don't tell anyone! Please don't spill the",blank:"beans",after:".",bank:["beans","milk","coffee"],emoji:"🤫"},
   {before:"My brother and I don't see eye to",blank:"eye",after:"about music.",bank:["eye","nose","face"],emoji:"🤝"},
   {before:"She got cold",blank:"feet",after:"and didn't jump.",bank:["feet","hands","ears"],emoji:"🥶"},
   {before:"It takes a few weeks to learn the",blank:"ropes",after:"in a new job.",bank:["ropes","rules","roads"],emoji:"🪢"},
   {before:"I burned the midnight",blank:"oil",after:"before the exam.",bank:["oil","candle","lamp"],emoji:"🕯️"},
   {before:"You can't sit on the",blank:"fence",after:"forever. Decide!",bank:["fence","wall","chair"],emoji:"🚧"},
  ],
  errors:[{s:"Don't spill the peas, it's a secret!",wrong:3,ok:"Don't spill the beans, it's a secret!"},{s:"We see eye to nose on most things.",wrong:4,ok:"We see eye to eye on most things."},{s:"The ball is in your yard now.",wrong:5,ok:"The ball is in your court now."}],
  build:[{s:"The ball is in your court.",pl:"Teraz twój ruch."},{s:"She got cold feet at the last minute.",pl:"Stchórzyła w ostatniej chwili."},{s:"It was a blessing in disguise.",pl:"To było szczęście w nieszczęściu."}],
  writing:{title:"Write an email with idioms ✍️",sub:"Write to a friend about a new school, club or job (min. 60 words). Use at least four idioms from this lesson.",starters:["Hi …, thanks for your message!","On my first day I … to break the ice.","I'm still learning the ropes, but …","I was in hot water when …","The ball is in your court — …"],min:60},
  wordle:[["beans","🫘"],["fence","🚧"],["ropes","🪢"]]}),
];

/* ================= BRITISH SLANG: A2 + B1 ================= */
BONUS_VERSIONS.b_slang=[
 BX.v('bonus-slang-a2','a2','Sixteen words you will hear in the UK — from cheers and mate to gutted, skint and a cuppa.',{
  cardsTitle:'British slang',wordsLabel:'Slang',words:V([
   ["cheers","dzięki / na zdrowie","🙌"],["mate","kumpel","🤝"],["brilliant","super","🌟"],["knackered","wykończony","😩"],
   ["gutted","załamany","😞"],["skint","spłukany","🪹"],["quid","funt (pieniądz)","💷"],["loo","toaleta","🚽"],
   ["cuppa","filiżanka herbaty","🍵"],["chuffed","bardzo zadowolony","😊"],["fancy","mieć ochotę na","😋"],["queue","kolejka","🧍🧍"],
   ["chips","frytki","🍟"],["crisps","chipsy","🥔"],["flat","mieszkanie","🏢"],["lift","winda","🛗"]]),
  quizTag:'SLANG',quiz:[
   {q:"In the UK, 'chips' are…",opts:["fries","crisps in a bag","biscuits"],correct:0},
   {q:"'Let's join the queue.' A queue is…",opts:["a line of people waiting","a famous queen","a bus"],correct:0},
   {q:"I'm skint until Friday. I have…",opts:["no money","no time","no friends"],correct:0},
   {q:"'Do you fancy a cuppa?' He's offering…",opts:["a cup of tea","a biscuit","a cupcake"],correct:0},
   {q:"I'm chuffed with my mark! I'm…",opts:["very pleased","angry","tired"],correct:0},
   {q:"'Where's the loo?' You are looking for…",opts:["the toilet","the lift","the door"],correct:0},
   {q:"That's five quid. That's five…",opts:["pounds","euros","minutes"],correct:0},
  ],
  fill:[
   {before:"I walked ten kilometres. I'm",blank:"knackered",after:"!",bank:["knackered","chuffed","skint"],emoji:"😩"},
   {before:"We lost the final. I'm",blank:"gutted",after:".",bank:["gutted","brilliant","posh"],emoji:"😞"},
   {before:"Thanks for the help,",blank:"mate",after:"!",bank:["mate","quid","loo"],emoji:"🤝"},
   {before:"A bag of",blank:"crisps",after:"and a can of cola, please.",bank:["crisps","chips","flats"],emoji:"🥔"},
   {before:"We live in a",blank:"flat",after:"on the fifth floor.",bank:["flat","loo","queue"],emoji:"🏢"},
  ],
  build:[{s:"Do you fancy a cuppa?",pl:"Masz ochotę na herbatkę?"},{s:"Cheers mate, that was brilliant!",pl:"Dzięki, kolego, to było super!"},{s:"I can't come, I'm skint.",pl:"Nie mogę przyjść, jestem spłukany."}],
  wordle:[["skint","🪹"],["queue","🧍"],["cuppa","🍵"]]}),
 BX.v('bonus-slang-b1','b1','Real British English: slang, polite "British" phrases and what people REALLY mean when they say "not bad".',{
  cardsTitle:'Slang & British phrases',wordsLabel:'Slang',words:V([
   ["gutted","załamany","😞"],["chuffed","bardzo zadowolony","😊"],["knackered","wykończony","😩"],["skint","spłukany","🪹"],
   ["gobsmacked","osłupiały ze zdziwienia","😲"],["cheeky","bezczelny (ale zabawny)","😜"],["dodgy","podejrzany, kiepski","🤨"],["fortnight","dwa tygodnie","📆"],
   ["sorted","załatwione","✅"],["a bit miffed","trochę obrażony","😤"],["proper","porządny, prawdziwy","💯"],["to have a go","spróbować","🎯"],
   ["can't be bothered","nie chce mi się","🥱"],["to pop out","wyskoczyć na chwilę","🚪"],["not bad","całkiem dobrze (często: super)","👌"],["fair enough","no dobra, rozumiem","🙂"]]),
  reading:{title:"What British people say… and what they mean 🇬🇧",paras:[
   "British people are famous for being polite — and for not always saying exactly what they mean. Learners of English often find this <b>a bit confusing</b>.",
   "<b>'Not bad'</b> usually means 'very good'. If your British friend tastes your cake and says 'Not bad at all!', you can be <b>chuffed</b>. 🎂",
   "<b>'I'll bear it in mind'</b> sometimes means 'I'm not going to do it'. And <b>'With the greatest respect…'</b> often means 'I think you're wrong'!",
   "Teenagers use lots of slang too. If something is <b>dodgy</b>, don't trust it. If your friend is <b>gobsmacked</b>, they are very surprised. And if you <b>can't be bothered</b> to do your homework… well, that's your problem! 😜"]},
  tf:{three:true,sub:'Read the text. Not given = the text doesn\'t say.',items:[
   {text:"'Not bad' often means 'very good'.",answer:0},{text:"'I'll bear it in mind' always means 'Yes, I'll do it'.",answer:1},
   {text:"'With the greatest respect' can mean 'I think you're wrong'.",answer:0},{text:"Most British people say 'not bad' every day.",answer:2},{text:"A dodgy website is a good one to trust.",answer:1}]},
  quizTag:'SLANG · B1',quiz:[
   {q:"I'll see you in a fortnight. That's in…",opts:["two weeks","four days","one month"],correct:0},
   {q:"'Can I borrow a tenner?' 'Cheeky!' The person is…",opts:["joking that you are rude","very angry","saying thank you"],correct:0},
   {q:"'The tickets are sorted.' The tickets are…",opts:["bought / ready","lost","in the right order"],correct:0},
   {q:"She was a bit miffed when I forgot her birthday. She was…",opts:["a little annoyed","very happy","ill"],correct:0},
   {q:"'Have a go!' means…",opts:["Try it!","Go away!","Hurry up!"],correct:0},
   {q:"'Fair enough' means…",opts:["OK, I understand","That's not fair","That's enough food"],correct:0},
   {q:"I'm just popping out. I'm…",opts:["going out for a short time","jumping","making popcorn"],correct:0},
  ],
  fill:[
   {before:"When I saw the price I was",blank:"gobsmacked",after:"!",bank:["gobsmacked","sorted","cheeky"],emoji:"😲"},
   {before:"That burger looks a bit",blank:"dodgy",after:". Don't eat it.",bank:["dodgy","proper","chuffed"],emoji:"🤨"},
   {before:"It's Sunday and I can't be",blank:"bothered",after:"to cook.",bank:["bothered","sorted","miffed"],emoji:"🥱"},
   {before:"We're going to Scotland for a",blank:"fortnight",after:".",bank:["fortnight","fortune","forty"],emoji:"📆"},
   {before:"Don't worry about the tickets — it's all",blank:"sorted",after:".",bank:["sorted","skint","gutted"],emoji:"✅"},
  ],
  errors:[{s:"I can't be bother to go out.",wrong:3,ok:"I can't be bothered to go out."},{s:"She was a bit miff about it.",wrong:4,ok:"She was a bit miffed about it."},{s:"Let me have a went at it.",wrong:4,ok:"Let me have a go at it."}],
  build:[{s:"I'm just popping out for a minute.",pl:"Wyskoczę tylko na minutę."},{s:"That's a bit dodgy, mate.",pl:"To trochę podejrzane, kolego."},{s:"Not bad at all!",pl:"Całkiem nieźle! (super!)"}],
  writing:{title:"Text messages with slang 📱",sub:"Write a chat between you and a British friend planning a weekend (min. 60 words). Use at least five slang words.",starters:["Hiya mate! Fancy … this weekend?","Sorry, I'm a bit skint at the moment…","Fair enough! What about …?","Sorted! See you at …"],min:60},
  wordle:[["proper","💯"],["cheeky","😜"],["dodgy","🤨"]]}),
];

/* ================= PHRASAL VERBS: A2 + B1 ================= */
BONUS_VERSIONS.b_phrasal=[
 BX.v('bonus-phrasal-a2','a2','Fourteen everyday phrasal verbs for home, school and friends — and where the little word goes.',{
  cardsTitle:'Fourteen phrasal verbs',wordsLabel:'Verbs',words:V([
   ["get up","wstawać","⏰"],["give up","poddać się","🏳️"],["look for","szukać","🔍"],["turn on","włączyć","💡"],["turn off","wyłączyć","🔌"],
   ["find out","dowiedzieć się","🕵️"],["put on","założyć","🧥"],["take off","zdjąć / wystartować","🛫"],["look after","opiekować się","🐶"],["come back","wrócić","🔙"],
   ["run out of","skończyć się (zabraknąć)","🥛"],["pick up","podnieść / odebrać","🫳"],["get on with","dogadywać się z","😊"],["fill in","wypełnić (formularz)","📝"]]),
  quizTag:'PHRASAL VERBS',quiz:[
   {q:"The plane takes ___ at 8 a.m.",opts:["off","on","up"],correct:0},
   {q:"Can you pick me ___ from school?",opts:["up","on","for"],correct:0},
   {q:"I get on ___ my sister. We're friends.",opts:["with","to","for"],correct:0},
   {q:"Please fill ___ this form.",opts:["in","off","back"],correct:0},
   {q:"I want to find ___ the truth.",opts:["out","on","after"],correct:0},
   {q:"We ran out ___ bread, so I went to the shop.",opts:["of","off","from"],correct:0},
  ],
  fill:[
   {before:"Take",blank:"off",after:"your shoes before you come in.",bank:["off","on","up"],emoji:"👟"},
   {before:"I'm looking",blank:"for",after:"my phone. Have you seen it?",bank:["for","after","at"],emoji:"📱"},
   {before:"When will you come",blank:"back",after:"from holiday?",bank:["back","off","up"],emoji:"🔙"},
   {before:"Who looks",blank:"after",after:"your dog when you're away?",bank:["after","for","on"],emoji:"🐶"},
   {before:"Don't give",blank:"up",after:"— you're nearly there!",bank:["up","in","on"],emoji:"💪"},
  ],
  errors:[{s:"I get down at seven every morning.",wrong:2,ok:"I get up at seven every morning."},{s:"Please turn of the light.",wrong:2,ok:"Please turn off the light."},{s:"I get on to my brother.",wrong:3,ok:"I get on with my brother."}],
  build:[{s:"Please turn off the TV.",pl:"Proszę, wyłącz telewizor."},{s:"I'm looking for my keys.",pl:"Szukam swoich kluczy."},{s:"We've run out of milk.",pl:"Skończyło nam się mleko."}],
  wordle:[["after","🐶"],["found","🕵️"],["pick","🫳"]]}),
 BX.v('bonus-phrasal-b1','b1','Sixteen B1 phrasal verbs, separable or not, plus a story about a school trip where everything went wrong.',{
  cardsTitle:'B1 phrasal verbs',wordsLabel:'Verbs',words:V([
   ["set off","wyruszyć","🚌"],["break down","zepsuć się","🔧"],["put off","odłożyć (na później)","⏳"],["call off","odwołać","❌"],
   ["turn up","pojawić się","🙋"],["get over","dojść do siebie po","🩹"],["come up with","wymyślić","💡"],["look forward to","nie móc się doczekać","🤩"],
   ["put up with","znosić, tolerować","😤"],["catch up with","dogonić, nadrobić","🏃"],["run into","wpaść na (kogoś)","😮"],["sort out","załatwić, rozwiązać","🧩"],
   ["work out","rozwiązać / ćwiczyć","🏋️"],["give back","oddać","↩️"],["take up","zacząć (hobby)","🎸"],["end up","skończyć (gdzieś)","🏁"]]),
  reading:{title:"The school trip that went wrong 🚌",paras:[
   "We <b>set off</b> at seven in the morning. Everyone was <b>looking forward to</b> the trip to the mountains. But after an hour, the bus <b>broke down</b> on the motorway!",
   "Our teacher, Mr Nowak, tried to <b>sort out</b> the problem. He phoned the bus company, but no new bus <b>turned up</b> for two hours. We had to <b>put up with</b> the cold and the noise of the cars.",
   "Then Zosia <b>came up with</b> a brilliant idea: a quiz about the mountains, right there next to the road. It was so much fun that we forgot about the bus.",
   "In the end the hike was <b>called off</b>, and we <b>ended up</b> in a small café in a village. There we <b>ran into</b> my cousin, who was working there! It wasn't the trip we planned, but it was the best day of the year."]},
  tf:{three:true,sub:'Read the story. Not given = the story doesn\'t say.',items:[
   {text:"The bus broke down after about an hour.",answer:0},{text:"A new bus came very quickly.",answer:1},
   {text:"Zosia thought of the quiz.",answer:0},{text:"The class went hiking in the afternoon.",answer:1},{text:"The café was famous for its cakes.",answer:2},{text:"The writer met a family member at the café.",answer:0}]},
  quizTag:'PHRASAL VERBS · B1',quiz:[
   {q:"The concert was called ___ because of the storm.",opts:["off","up","out"],correct:0},
   {q:"I'm really looking forward ___ the holidays.",opts:["to","for","at"],correct:0},
   {q:"Stop putting ___ your homework! Do it now.",opts:["off","up","on"],correct:0},
   {q:"It took me weeks to get ___ the flu.",opts:["over","up","off"],correct:0},
   {q:"I can't put up ___ this noise any more!",opts:["with","to","for"],correct:0},
   {q:"She took ___ the guitar last year.",opts:["up","off","over"],correct:0},
   {q:"We got lost and ended ___ in the wrong town.",opts:["up","off","out"],correct:0},
  ],
  fill:[
   {before:"I'm looking forward to",blank:"seeing",after:"you!",bank:["seeing","see","saw"],emoji:"🤩"},
   {before:"Can you give me",blank:"back",after:"my book tomorrow?",bank:["back","up","off"],emoji:"↩️"},
   {before:"I was ill, so I need to catch",blank:"up",after:"with my homework.",bank:["up","on","off"],emoji:"🏃"},
   {before:"Guess who I ran",blank:"into",after:"at the shop? Our old teacher!",bank:["into","over","off"],emoji:"😮"},
   {before:"Don't worry, we'll sort it",blank:"out",after:".",bank:["out","up","off"],emoji:"🧩"},
   {before:"He came up",blank:"with",after:"a great plan.",bank:["with","to","for"],emoji:"💡"},
  ],
  errors:[{s:"I'm looking forward to see you.",wrong:4,ok:"I'm looking forward to seeing you."},{s:"They called up the match because of rain.",wrong:2,ok:"They called off the match because of rain."},{s:"I can't put up for this noise.",wrong:4,ok:"I can't put up with this noise."}],
  build:[{s:"The bus broke down on the motorway.",pl:"Autobus zepsuł się na autostradzie."},{s:"We ended up in a small café.",pl:"Wylądowaliśmy w małej kawiarni."},{s:"She came up with a brilliant idea.",pl:"Wymyśliła świetny pomysł."}],
  writing:{title:"A day that went wrong ✍️",sub:"Write a short story about a day when things went wrong (min. 60 words). Use at least five phrasal verbs.",starters:["We set off at …","Suddenly, the … broke down.","We had to put up with …","Then someone came up with …","In the end, we ended up …"],min:60},
  wordle:[["sort","🧩"],["break","🔧"],["catch","🏃"]]}),
];

/* ================= SONGS, RHYMES & TONGUE TWISTERS: A2 + B1 ================= */
BONUS_VERSIONS.b_rhymes=[
 BX.v('bonus-rhymes-a2','a2','Rhyming pairs, a short poem to complete and five famous tongue twisters to say faster and faster.',{
  cardsTitle:'Words that rhyme',wordsLabel:'Rhymes',words:V([
   ["cat","kot","🐱"],["hat","kapelusz","🎩"],["moon","księżyc","🌕"],["spoon","łyżka","🥄"],["light","światło","💡"],["kite","latawiec","🪁"],
   ["bear","niedźwiedź","🐻"],["chair","krzesło","🪑"],["snake","wąż","🐍"],["cake","ciasto","🍰"],["train","pociąg","🚆"],["rain","deszcz","🌧️"]]),
  reading:{label:'Poem',title:"A rainy day poem 🌧️",paras:["Outside it's grey, there's lots of <b>rain</b>,<br>I'm sitting on a noisy <b>train</b>.","I've got a book, I've got some <b>cake</b>,<br>I'm going to my grandma's <b>lake</b>.","The sky gets dark, I see the <b>moon</b>,<br>I'll be at Grandma's very <b>soon</b>! 🚆"]},
  quizTag:'RHYME TIME',quiz:[
   {q:"What rhymes with 'night'?",opts:["kite","knife","nice"],correct:0},{q:"What rhymes with 'bear'?",opts:["chair","beer","bird"],correct:0},
   {q:"What rhymes with 'snake'?",opts:["cake","snack","sneak"],correct:0},{q:"What rhymes with 'blue'?",opts:["shoe","blow","bless"],correct:0},
   {q:"What rhymes with 'phone'?",opts:["bone","fun","fine"],correct:0},{q:"What rhymes with 'eight'?",opts:["late","eat","egg"],correct:0}],
  fill:[
   {before:"Outside it's grey, there's lots of",blank:"rain",after:",",bank:["rain","snow","sun"],emoji:"🌧️"},
   {before:"I'm sitting on a noisy",blank:"train",after:".",bank:["train","bus","car"],emoji:"🚆"},
   {before:"I've got a book, I've got some",blank:"cake",after:",",bank:["cake","bread","tea"],emoji:"🍰"},
   {before:"The sky gets dark, I see the",blank:"moon",after:",",bank:["moon","stars","sun"],emoji:"🌕"},
   {before:"I'll be at Grandma's very",blank:"soon",after:"!",bank:["soon","late","now"],emoji:"🏡"}],
  build:[{s:"She sells seashells by the seashore",pl:"Łamaniec: ona sprzedaje muszelki nad morzem"},{s:"How much wood would a woodchuck chuck",pl:"Łamaniec: ile drewna rzuciłby świstak"},{s:"Fuzzy Wuzzy was a bear",pl:"Łamaniec: Fuzzy Wuzzy był niedźwiedziem"}],
  listen:[{word:"She sells seashells",options:["She sells seashells","She smells sea shells","See shells sell"],correct:0},{word:"A big black bug bit a big black bear",options:["A big black bug bit a big black bear","A big back bag bit a big black bear","A big black bug bit a black bird"],correct:0}],
  wordle:[["spoon","🥄"],["chair","🪑"],["light","💡"]]}),
 BX.v('bonus-rhymes-b1','b1','Rhyme, rhythm and song lyrics: sounds that look different but rhyme, a song to complete and the hardest tongue twisters.',{
  cardsTitle:'Same sound, different spelling',wordsLabel:'Rhymes',words:V([
   ["through","przez","🚇"],["true","prawdziwy","✅"],["flower","kwiat","🌸"],["hour","godzina","⏰"],["heart","serce","❤️"],["start","start","🏁"],
   ["eight","osiem","8️⃣"],["late","późno","⌛"],["word","słowo","💬"],["bird","ptak","🐦"],["weight","waga","⚖️"],["wait","czekać","⏳"],["knows","wie","🧠"],["nose","nos","👃"]]),
  reading:{label:'Song',title:"Song: Keep on running 🎵",paras:["I left my home at <b>eight</b> o'clock,<br>I knew that I was running <b>late</b>,","the city lights were shining <b>through</b>,<br>and every word I sang was <b>true</b>.","So keep on running, follow your <b>heart</b>,<br>every ending is a brand new <b>start</b>,","and when the night becomes an <b>hour</b>,<br>you'll grow just like a summer <b>flower</b>. 🌸"]},
  tf:{items:[{text:"'Through' and 'true' rhyme.",answer:0},{text:"'Heart' and 'start' rhyme.",answer:0},{text:"'Word' and 'bird' don't rhyme.",answer:1},{text:"'Hour' sounds like 'our'.",answer:0},{text:"'Knows' and 'nose' sound different.",answer:1}]},
  quizTag:'SOUNDS · B1',quiz:[
   {q:"Which word rhymes with 'weight'?",opts:["wait","white","wheat"],correct:0},{q:"Which word rhymes with 'heard'?",opts:["bird","heart","hard"],correct:0},
   {q:"Which word has a silent letter?",opts:["knife","kite","kick"],correct:0},{q:"Which word rhymes with 'though'?",opts:["snow","tough","through"],correct:0},
   {q:"Which pair sounds the SAME?",opts:["knows / nose","cut / cute","hat / heat"],correct:0},{q:"Which word rhymes with 'love'?",opts:["glove","move","stove"],correct:0}],
  fill:[
   {before:"I left my home at eight o'clock, I knew that I was running",blank:"late",after:",",bank:["late","fast","home"],emoji:"⌛"},
   {before:"the city lights were shining",blank:"through",after:",",bank:["through","bright","down"],emoji:"🌃"},
   {before:"So keep on running, follow your",blank:"heart",after:",",bank:["heart","dream","road"],emoji:"❤️"},
   {before:"every ending is a brand new",blank:"start",after:",",bank:["start","day","song"],emoji:"🏁"},
   {before:"you'll grow just like a summer",blank:"flower",after:".",bank:["flower","tree","child"],emoji:"🌸"}],
  build:[{s:"Peter Piper picked a peck of pickled peppers",pl:"Łamaniec: Peter Piper zebrał garść marynowanych papryczek"},{s:"I scream you scream we all scream for ice cream",pl:"Gra słów: krzyczę / lody"},{s:"Red lorry yellow lorry red lorry yellow lorry",pl:"Łamaniec: czerwona ciężarówka, żółta ciężarówka"}],
  listen:[{word:"Which witch is which?",options:["Which witch is which?","Which watch is which?","Rich witch is rich?"],correct:0},{word:"Six sticky skeletons",options:["Six sticky skeletons","Sick sticky skeletons","Six tricky skeletons"],correct:0},{word:"Eleven benevolent elephants",options:["Eleven benevolent elephants","Eleven elegant elephants","Seven benevolent elephants"],correct:0}],
  writing:{title:"Write your own song verse 🎤",sub:"Write two or three verses of a song or poem (min. 50 words). Every two lines should rhyme. Use words like heart/start, through/true, eight/late.",starters:["When I wake up in the morning light, …","I want to tell you something true, …","…follow your heart / …a brand new start"],min:50},
  wordle:[["heart","❤️"],["eight","8️⃣"],["bird","🐦"]]}),
];

/* ================= NEW BONUS LESSONS (3 levels each) ================= */
const BONUS_NEW=[];
/* ---- Space adventure ---- */
BONUS_NEW.push({shop:{id:'b_space',cat:'lesson',icon:'🚀',price:150,en:'Space adventure',pl:'Kosmiczna przygoda',d:'Planets, astronauts and a trip to Mars — on 3 levels.',dp:'Planety, astronauci i podróż na Marsa — na 3 poziomach.'},title:'Space adventure',emoji:'🚀',versions:[
 BX.v('bonus-space','kids','Rockets, planets and stars — blast off with Leo!',{
  cardsTitle:'Into space 🚀',words:V([["rocket","rakieta","🚀"],["planet","planeta","🪐"],["star","gwiazda","⭐"],["moon","księżyc","🌕"],["sun","słońce","☀️"],["astronaut","astronauta","🧑‍🚀"],["alien","kosmita","👽"],["Earth","Ziemia","🌍"],["telescope","teleskop","🔭"],["comet","kometa","☄️"]]),
  quiz:[{q:"We live on…",opts:["Earth","the Moon","the Sun"],correct:0},{q:"A person who goes to space is an…",opts:["astronaut","alien","artist"],correct:0},{q:"You look at stars with a…",opts:["telescope","rocket","comet"],correct:0},{q:"It is hot and gives us light. It's the…",opts:["Sun","Moon","Earth"],correct:0},{q:"Saturn has rings. It's a…",opts:["planet","star","rocket"],correct:0}],
  fill:[{before:"The",blank:"rocket",after:"goes up, up, up!",bank:["rocket","moon","star"],emoji:"🚀"},{before:"At night I can see the",blank:"moon",after:"and the stars.",bank:["moon","sun","rocket"],emoji:"🌕"},{before:"The green",blank:"alien",after:"says hello!",bank:["alien","planet","comet"],emoji:"👽"},{before:"There are eight",blank:"planets",after:"around the Sun.",bank:["planets","rockets","aliens"],emoji:"🪐"}],
  move:[{emoji:"🚀",text:"Count down 10, 9, 8… and jump like a rocket! Say: Blast off! 🚀"},{emoji:"🧑‍🚀",text:"Walk slowly like an astronaut on the Moon. 🌕"},{emoji:"👽",text:"Be a friendly alien and say: Hello, Earth! 👽"}],
  wordle:[["star","⭐"],["moon","🌕"],["comet","☄️"]]}),
 BX.v('bonus-space-a2','a2','The solar system, life on a space station and a trip to Mars, with comparatives: bigger, hotter, the furthest.',{
  cardsTitle:'The solar system',words:V([["solar system","układ słoneczny","☀️🪐"],["planet","planeta","🪐"],["orbit","orbita, krążyć","🔄"],["astronaut","astronauta","🧑‍🚀"],["space station","stacja kosmiczna","🛰️"],["gravity","grawitacja","🍎"],["spacesuit","skafander","🥼"],["launch","start (rakiety)","🚀"],["galaxy","galaktyka","🌌"],["Mars","Mars","🔴"],["satellite","satelita","📡"],["crater","krater","🕳️"]]),
  reading:{title:"A day on the space station 🛰️",paras:["Astronauts on the International Space Station see the Sun rise sixteen times a day! The station <b>orbits</b> the Earth every ninety minutes.","There is almost no <b>gravity</b>, so everything floats. Astronauts sleep in sleeping bags on the wall and drink through straws.","They exercise for two hours every day, because their muscles get weaker in space. They wear a <b>spacesuit</b> when they go outside."]},
  tf:{items:[{text:"The station goes around the Earth every 90 minutes.",answer:0},{text:"Astronauts sleep in normal beds.",answer:1},{text:"Astronauts exercise every day.",answer:0},{text:"Muscles get stronger in space.",answer:1}]},
  quiz:[{q:"Mars is ___ than the Earth.",opts:["smaller","more small","smallest"],correct:0},{q:"Jupiter is the ___ planet.",opts:["biggest","bigger","most big"],correct:0},{q:"The Moon ___ the Earth.",opts:["orbits","launches","floats"],correct:0},{q:"Mars is called the ___ planet.",opts:["red","blue","green"],correct:0},{q:"Things fall down because of…",opts:["gravity","galaxy","orbit"],correct:0},{q:"Mercury is ___ to the Sun than the Earth.",opts:["closer","closest","more close"],correct:0}],
  fill:[{before:"Venus is",blank:"hotter",after:"than Mars.",bank:["hotter","hottest","more hot"],emoji:"🔥"},{before:"Our Sun is in the Milky Way",blank:"galaxy",after:".",bank:["galaxy","planet","crater"],emoji:"🌌"},{before:"The rocket",blank:"launch",after:"is at 9 a.m.",bank:["launch","orbit","crater"],emoji:"🚀"},{before:"There are lots of",blank:"craters",after:"on the Moon.",bank:["craters","satellites","galaxies"],emoji:"🕳️"},{before:"Neptune is the",blank:"furthest",after:"planet from the Sun.",bank:["furthest","further","far"],emoji:"🔵"}],
  build:[{s:"Jupiter is the biggest planet.",pl:"Jowisz jest największą planetą."},{s:"Astronauts sleep on the wall.",pl:"Astronauci śpią na ścianie."},{s:"The Moon orbits the Earth.",pl:"Księżyc krąży wokół Ziemi."}],
  wordle:[["orbit","🔄"],["mars","🔴"],["space","🌌"]]}),
 BX.v('bonus-space-b1','b1','Should humans live on Mars? Space words, the future with will / going to, and an article for and against.',{
  cardsTitle:'Space exploration',words:V([["explore","badać, eksplorować","🧭"],["mission","misja","🎯"],["spacecraft","statek kosmiczny","🛸"],["oxygen","tlen","🫁"],["atmosphere","atmosfera","🌫️"],["colony","kolonia","🏘️"],["survive","przetrwać","💪"],["launch","wystrzelić","🚀"],["rover","łazik","🚙"],["zero gravity","nieważkość","🎈"],["light year","rok świetlny","💫"],["habitable","nadający się do zamieszkania","🏡"]]),
  reading:{title:"Should humans live on Mars? 🔴",paras:["Some scientists believe that humans <b>will</b> live on Mars before 2060. Private companies <b>are going to</b> send <b>spacecraft</b> with people there in the next few decades.","Supporters say a Mars <b>colony</b> could help humanity <b>survive</b> if something terrible happens on Earth. They also say we will learn amazing things when we <b>explore</b> other worlds.","However, life on Mars would be extremely hard. The <b>atmosphere</b> is thin and there is almost no <b>oxygen</b>. The temperature can fall to minus 120 degrees, and the trip takes about seven months.","Critics argue that we should spend the money on solving problems here on Earth first. What do you think — is Mars our future home, or an expensive dream?"]},
  tf:{three:true,items:[{text:"Some scientists think people will live on Mars before 2060.",answer:0},{text:"Mars has a thick atmosphere with lots of oxygen.",answer:1},{text:"The trip to Mars takes about seven months.",answer:0},{text:"The first Mars colony will have 100 people.",answer:2},{text:"Critics want to spend money on Earth's problems first.",answer:0}]},
  quiz:[{q:"Look at that rocket! It ___ take off.",opts:["is going to","will to","goes to"],correct:0},{q:"I think people ___ visit Mars one day.",opts:["will","are going","going to"],correct:0},{q:"A planet where people can live is…",opts:["habitable","atmospheric","zero gravity"],correct:0},{q:"A robot car that explores a planet is a…",opts:["rover","colony","mission"],correct:0},{q:"A light year measures…",opts:["distance","time","light bulbs"],correct:0},{q:"'However' introduces…",opts:["the opposite idea","an example","a conclusion"],correct:0}],
  fill:[{before:"Humans need",blank:"oxygen",after:"to breathe.",bank:["oxygen","gravity","orbit"],emoji:"🫁"},{before:"The",blank:"mission",after:"to the Moon was a success.",bank:["mission","rover","colony"],emoji:"🎯"},{before:"Could we",blank:"survive",after:"on Mars without a spacesuit?",bank:["survive","launch","explore"],emoji:"💪"},{before:"In",blank:"zero gravity",after:", water floats in balls.",bank:["zero gravity","atmosphere","light year"],emoji:"🎈"},{before:"Next year they",blank:"are going to",after:"launch a new telescope. It's all planned.",bank:["are going to","will be","going"],emoji:"🔭"}],
  errors:[{s:"I think people will to live on Mars.",wrong:4,ok:"I think people will live on Mars."},{s:"There is almost no oxigen on Mars.",wrong:4,ok:"There is almost no oxygen on Mars."},{s:"They going to launch the rocket tomorrow.",wrong:1,ok:"They are going to launch the rocket tomorrow."}],
  build:[{s:"Humans will live on Mars one day.",pl:"Ludzie kiedyś zamieszkają na Marsie."},{s:"The trip takes about seven months.",pl:"Podróż trwa około siedmiu miesięcy."},{s:"There is almost no oxygen there.",pl:"Prawie nie ma tam tlenu."}],
  writing:{title:"Would you go to Mars? ✍️",sub:"Write your opinion (min. 70 words): would you like to live on Mars? Give two reasons and one problem.",starters:["In my opinion, …","Firstly, …","On the other hand, …","I think in the future people will …","To sum up, …"],min:70},
  wordle:[["rover","🚙"],["orbit","🔄"],["comet","☄️"]]}),
]});

/* ---- Video games ---- */
BONUS_NEW.push({shop:{id:'b_games',cat:'lesson',icon:'🎮',price:150,en:'Game on!',pl:'Gramy!',d:'Video game English: levels, bosses, teamwork and gaming habits — on 3 levels.',dp:'Angielski gier: poziomy, bossowie, gra zespołowa i nawyki — na 3 poziomach.'},title:'Game on!',emoji:'🎮',versions:[
 BX.v('bonus-games','kids','Press start! Words from your favourite games.',{
  cardsTitle:'Game words 🎮',words:V([["level","poziom","🆙"],["player","gracz","🧑‍💻"],["score","wynik","💯"],["win","wygrać","🏆"],["lose","przegrać","😢"],["jump","skakać","🦘"],["coin","moneta","🪙"],["life","życie","❤️"],["controller","kontroler","🎮"],["team","drużyna","👥"]]),
  quiz:[{q:"You get to the end of the game. You…",opts:["win","lose","jump"],correct:0},{q:"You hold it in your hands to play.",opts:["controller","level","coin"],correct:0},{q:"You have three ___. Be careful!",opts:["lives","levels","teams"],correct:0},{q:"Collect the gold ___!",opts:["coins","players","scores"],correct:0},{q:"Level 1, level 2… now it's the next ___.",opts:["level","team","life"],correct:0}],
  fill:[{before:"Press A to",blank:"jump",after:"!",bank:["jump","lose","coin"],emoji:"🦘"},{before:"My",blank:"score",after:"is 100 points!",bank:["score","life","team"],emoji:"💯"},{before:"We are in the same",blank:"team",after:".",bank:["team","level","coin"],emoji:"👥"},{before:"Oh no, I",blank:"lost",after:"a life!",bank:["lost","won","jumped"],emoji:"💔"}],
  move:[{emoji:"🦘",text:"Jump three times like a game hero! 🦘"},{emoji:"🪙",text:"Pretend to collect coins and count: one coin, two coins, three coins! 🪙"},{emoji:"🏆",text:"You won! Do a victory dance and shout: I win! 🏆"}],
  wordle:[["level","🆙"],["coin","🪙"],["team","👥"]]}),
 BX.v('bonus-games-a2','a2','Bosses, power-ups and online friends: talk about the games you play with the present continuous and "have to".',{
  cardsTitle:'Gaming English',words:V([["boss","boss (przeciwnik)","👹"],["power-up","wzmocnienie","⚡"],["save","zapisać grę","💾"],["respawn","odrodzić się","🔁"],["character","postać","🦸"],["online","w sieci, online","🌐"],["download","pobrać","⬇️"],["update","aktualizacja","🔄"],["headset","słuchawki z mikrofonem","🎧"],["quest","misja, zadanie","🗺️"],["inventory","ekwipunek","🎒"],["multiplayer","gra wieloosobowa","👥"]]),
  reading:{title:"Mia's gaming blog 🎮",paras:["Right now I'm playing a game called <b>Sky Builders</b>. It's a <b>multiplayer</b> game, so I play <b>online</b> with my cousins in Kraków and London. We talk on our <b>headsets</b>.","In every level you have to finish a <b>quest</b>. At the end there's a <b>boss</b> — a giant robot! You have to collect <b>power-ups</b> to beat it.","My mum says I have to stop after one hour, so I always <b>save</b> the game before dinner. Fair enough!"]},
  tf:{items:[{text:"Mia plays alone.",answer:1},{text:"Her cousins live in different cities.",answer:0},{text:"The boss is a giant robot.",answer:0},{text:"Mia can play for three hours a day.",answer:1}]},
  quiz:[{q:"The game is slow. I need to ___ it.",opts:["update","respawn","boss"],correct:0},{q:"You lost a life but you come back: you…",opts:["respawn","download","save"],correct:0},{q:"Where do you keep your items?",opts:["inventory","headset","quest"],correct:0},{q:"Right now I ___ a racing game.",opts:["'m playing","play","plays"],correct:0},{q:"You ___ beat the boss to finish the level.",opts:["have to","has to","must to"],correct:0},{q:"A strong enemy at the end of a level is a…",opts:["boss","character","power-up"],correct:0}],
  fill:[{before:"Don't forget to",blank:"save",after:"the game!",bank:["save","lose","respawn"],emoji:"💾"},{before:"My favourite",blank:"character",after:"is a ninja cat.",bank:["character","inventory","update"],emoji:"🦸"},{before:"I'm",blank:"downloading",after:"a new game. It's 50% done.",bank:["downloading","download","downloads"],emoji:"⬇️"},{before:"Grab the",blank:"power-up",after:"to run faster!",bank:["power-up","headset","quest"],emoji:"⚡"},{before:"My brother",blank:"has to",after:"finish his homework before he plays.",bank:["has to","have to","must to"],emoji:"📚"}],
  build:[{s:"I'm playing online with my friends.",pl:"Gram online z przyjaciółmi."},{s:"You have to beat the boss.",pl:"Musisz pokonać bossa."},{s:"Don't forget to save the game.",pl:"Nie zapomnij zapisać gry."}],
  wordle:[["boss","👹"],["quest","🗺️"],["save","💾"]]}),
 BX.v('bonus-games-b1','b1','Are video games good for you? Gaming vocabulary, a debate article and giving balanced opinions.',{
  cardsTitle:'Gaming & screen time',words:V([["addictive","uzależniający","🌀"],["screen time","czas przed ekranem","📱"],["teamwork","praca zespołowa","🤝"],["reaction time","czas reakcji","⚡"],["in-game purchase","zakup w grze","💳"],["esports","e-sport","🏆"],["strategy","strategia","♟️"],["violent","brutalny","💥"],["problem-solving","rozwiązywanie problemów","🧩"],["streamer","streamer","📹"],["rating","klasyfikacja wiekowa","🔞"],["balance","równowaga","⚖️"]]),
  reading:{title:"Video games: good or bad? 🎮",paras:["Over three billion people play video games. Many parents worry that games are <b>addictive</b> and that children spend too much <b>screen time</b> indoors.","However, research suggests that some games improve <b>problem-solving</b> and <b>reaction time</b>. <b>Strategy</b> games teach players to plan ahead, and team games build <b>teamwork</b> and communication.","There are real dangers too. Some games encourage players to spend money on <b>in-game purchases</b>, and others are too <b>violent</b> for young players — which is why games have age <b>ratings</b>.","Most experts agree that the key is <b>balance</b>: playing for a limited time, choosing the right games and still making time for sport, friends and sleep."]},
  tf:{three:true,items:[{text:"Over three billion people play video games.",answer:0},{text:"Research shows all games are bad for children.",answer:1},{text:"Strategy games can teach planning.",answer:0},{text:"Most gamers spend money every week.",answer:2},{text:"Experts say balance is important.",answer:0}]},
  quiz:[{q:"A game you can't stop playing is…",opts:["addictive","violent","balanced"],correct:0},{q:"Professional video game competitions are…",opts:["esports","streamers","ratings"],correct:0},{q:"'Research suggests that…' introduces…",opts:["evidence","a joke","a question"],correct:0},{q:"Buying a new skin in a game is an…",opts:["in-game purchase","update","esport"],correct:0},{q:"An age label like 'PEGI 12' is a…",opts:["rating","strategy","balance"],correct:0},{q:"'There are real dangers too' gives…",opts:["the other side","the conclusion","an example"],correct:0}],
  fill:[{before:"Too much",blank:"screen time",after:"can hurt your eyes.",bank:["screen time","teamwork","strategy"],emoji:"📱"},{before:"Chess is a",blank:"strategy",after:"game.",bank:["strategy","violent","rating"],emoji:"♟️"},{before:"Gamers often have a fast",blank:"reaction time",after:".",bank:["reaction time","balance","rating"],emoji:"⚡"},{before:"My favourite",blank:"streamer",after:"plays live every evening.",bank:["streamer","esport","purchase"],emoji:"📹"},{before:"The key is",blank:"balance",after:": play, but also go outside.",bank:["balance","rating","screen"],emoji:"⚖️"}],
  errors:[{s:"Games can to improve reaction time.",wrong:2,ok:"Games can improve reaction time."},{s:"Many parents worries about screen time.",wrong:2,ok:"Many parents worry about screen time."},{s:"Some games is too violent for children.",wrong:2,ok:"Some games are too violent for children."}],
  build:[{s:"Some games improve problem-solving.",pl:"Niektóre gry poprawiają umiejętność rozwiązywania problemów."},{s:"The key is balance.",pl:"Kluczem jest równowaga."},{s:"This game is too violent for young players.",pl:"Ta gra jest zbyt brutalna dla młodych graczy."}],
  writing:{title:"Your opinion: games and school ✍️",sub:"Should schools use video games in lessons? Write 70+ words with your opinion, two reasons and the other side.",starters:["I believe that …","One reason is that …","What is more, …","However, some people think …","To sum up, …"],min:70},
  wordle:[["boss","👹"],["skill","🎯"],["level","🆙"]]}),
]});

/* ---- Wild animals ---- */
BONUS_NEW.push({shop:{id:'b_animals',cat:'lesson',icon:'🐾',price:150,en:'Wild animals',pl:'Dzikie zwierzęta',d:'Jungle, ocean and savanna animals, habitats and saving wildlife — on 3 levels.',dp:'Zwierzęta dżungli, oceanu i sawanny, siedliska i ochrona przyrody — na 3 poziomach.'},title:'Wild animals',emoji:'🐾',versions:[
 BX.v('bonus-animals','kids','Lions, whales, parrots and more — who lives where?',{
  cardsTitle:'Wild animals 🐾',words:V([["lion","lew","🦁"],["elephant","słoń","🐘"],["giraffe","żyrafa","🦒"],["monkey","małpa","🐒"],["whale","wieloryb","🐋"],["shark","rekin","🦈"],["parrot","papuga","🦜"],["crocodile","krokodyl","🐊"],["penguin","pingwin","🐧"],["zebra","zebra","🦓"]]),
  quiz:[{q:"It has a very long neck.",opts:["giraffe","lion","shark"],correct:0},{q:"It lives in the sea and it's very big.",opts:["whale","monkey","zebra"],correct:0},{q:"It's black and white and it can't fly.",opts:["penguin","parrot","lion"],correct:0},{q:"It has a long nose called a trunk.",opts:["elephant","crocodile","giraffe"],correct:0},{q:"It can talk a little and it's colourful.",opts:["parrot","penguin","zebra"],correct:0}],
  fill:[{before:"The",blank:"lion",after:"is the king of the animals.",bank:["lion","whale","parrot"],emoji:"🦁"},{before:"The",blank:"monkey",after:"climbs trees.",bank:["monkey","shark","penguin"],emoji:"🐒"},{before:"A",blank:"zebra",after:"has black and white stripes.",bank:["zebra","whale","parrot"],emoji:"🦓"},{before:"Be careful! The",blank:"crocodile",after:"has big teeth.",bank:["crocodile","giraffe","penguin"],emoji:"🐊"}],
  move:[{emoji:"🐘",text:"Walk like an elephant and swing your trunk! 🐘"},{emoji:"🐒",text:"Jump like a monkey and say: Ooh ooh! 🐒"},{emoji:"🐧",text:"Waddle like a penguin across the room. 🐧"}],
  wordle:[["lion","🦁"],["whale","🐋"],["zebra","🦓"]]}),
 BX.v('bonus-animals-a2','a2','Habitats, what animals eat and how they move — with can / can\'t and "the fastest, the biggest".',{
  cardsTitle:'Animals and their homes',words:V([["habitat","siedlisko","🏞️"],["jungle","dżungla","🌴"],["savanna","sawanna","🌾"],["desert","pustynia","🏜️"],["ocean","ocean","🌊"],["predator","drapieżnik","🦈"],["prey","ofiara","🐇"],["claw","pazur","🐾"],["fur","futro","🧸"],["feather","pióro","🪶"],["herd","stado","🦓🦓"],["nest","gniazdo","🪺"]]),
  reading:{title:"Amazing animal records 🏆",paras:["The <b>cheetah</b> is the fastest land animal. It can run at 110 km/h, but only for about 30 seconds!","The <b>blue whale</b> is the biggest animal that has ever lived. Its heart is as big as a small car. It lives in the <b>ocean</b> and eats tiny animals called krill.","<b>Camels</b> live in the <b>desert</b>. They can walk for days without water, and their thick <b>fur</b> keeps them cool in the day and warm at night."]},
  tf:{items:[{text:"A cheetah can run at 110 km/h for hours.",answer:1},{text:"The blue whale's heart is very big.",answer:0},{text:"Blue whales eat sharks.",answer:1},{text:"Camels can walk for days without water.",answer:0}]},
  quiz:[{q:"An animal that hunts other animals is a…",opts:["predator","prey","herd"],correct:0},{q:"Birds lay eggs in a…",opts:["nest","claw","herd"],correct:0},{q:"The cheetah is the ___ land animal.",opts:["fastest","faster","most fast"],correct:0},{q:"Penguins ___ fly, but they can swim.",opts:["can't","can","don't can"],correct:0},{q:"Lions and zebras live on the…",opts:["savanna","ocean","desert"],correct:0},{q:"A group of elephants is a…",opts:["herd","nest","claw"],correct:0}],
  fill:[{before:"Birds have",blank:"feathers",after:", not fur.",bank:["feathers","claws","nests"],emoji:"🪶"},{before:"A cat uses its",blank:"claws",after:"to climb.",bank:["claws","feathers","herds"],emoji:"🐾"},{before:"Monkeys and parrots live in the",blank:"jungle",after:".",bank:["jungle","desert","ocean"],emoji:"🌴"},{before:"The rabbit is the fox's",blank:"prey",after:".",bank:["prey","predator","habitat"],emoji:"🐇"},{before:"The blue whale is the",blank:"biggest",after:"animal in the world.",bank:["biggest","bigger","most big"],emoji:"🐋"}],
  build:[{s:"The cheetah is the fastest land animal.",pl:"Gepard jest najszybszym zwierzęciem lądowym."},{s:"Penguins can't fly but they can swim.",pl:"Pingwiny nie umieją latać, ale umieją pływać."},{s:"Camels live in the desert.",pl:"Wielbłądy żyją na pustyni."}],
  wordle:[["claw","🐾"],["nest","🪺"],["herd","🦓"]]}),
 BX.v('bonus-animals-b1','b1','Endangered species and how we can protect them: conservation vocabulary, the passive voice and a persuasive text.',{
  cardsTitle:'Saving wildlife',words:V([["endangered","zagrożony wyginięciem","⚠️"],["extinct","wymarły","🦤"],["species","gatunek","🧬"],["habitat loss","utrata siedlisk","🪓"],["poaching","kłusownictwo","🎯"],["conservation","ochrona przyrody","🌿"],["reserve","rezerwat","🏞️"],["climate change","zmiana klimatu","🌡️"],["pollution","zanieczyszczenie","🏭"],["breed","rozmnażać się","🐣"],["release","wypuścić (na wolność)","🕊️"],["volunteer","wolontariusz","🙋"]]),
  reading:{title:"Back from the edge 🐼",paras:["In the 1980s, there were only about 1,100 giant pandas left in the wild. The species was <b>endangered</b>, mainly because of <b>habitat loss</b>: their bamboo forests were cut down for farms and roads.","Then China created dozens of <b>reserves</b>. Forests were protected, and new bamboo was planted. Pandas were <b>bred</b> in centres and some were <b>released</b> into the wild.","Today there are more than 1,800 wild pandas. In 2016 the panda was moved from 'endangered' to 'vulnerable'. It shows that <b>conservation</b> really works.","However, many species are still at risk from <b>poaching</b>, <b>pollution</b> and <b>climate change</b>. Scientists say that one million species could become <b>extinct</b> if we don't act."]},
  tf:{three:true,items:[{text:"There were about 1,100 wild pandas in the 1980s.",answer:0},{text:"Pandas lost their forests because of fires.",answer:1},{text:"Some pandas from centres were released into the wild.",answer:0},{text:"Pandas are no longer at any risk.",answer:1},{text:"The panda reserves are open to tourists.",answer:2}]},
  quiz:[{q:"An animal that no longer exists is…",opts:["extinct","endangered","released"],correct:0},{q:"Illegal hunting is…",opts:["poaching","breeding","conservation"],correct:0},{q:"New bamboo ___ planted.",opts:["was","were","is being to"],correct:0},{q:"The forests ___ cut down for farms.",opts:["were","was","are been"],correct:0},{q:"A protected area for animals is a…",opts:["reserve","species","habitat loss"],correct:0},{q:"'However' in the last paragraph introduces…",opts:["a problem that still exists","a happy ending","an example of pandas"],correct:0}],
  fill:[{before:"Tigers are an",blank:"endangered",after:"species.",bank:["endangered","extinct","released"],emoji:"🐯"},{before:"The dodo is",blank:"extinct",after:". There are none left.",bank:["extinct","endangered","bred"],emoji:"🦤"},{before:"Plastic",blank:"pollution",after:"kills many sea animals.",bank:["pollution","conservation","reserve"],emoji:"🏭"},{before:"The young turtles were",blank:"released",after:"into the sea.",bank:["released","poached","bred"],emoji:"🐢"},{before:"I want to be a",blank:"volunteer",after:"at an animal centre.",bank:["volunteer","species","reserve"],emoji:"🙋"}],
  errors:[{s:"The forests was cut down for farms.",wrong:2,ok:"The forests were cut down for farms."},{s:"Pandas were breed in special centres.",wrong:2,ok:"Pandas were bred in special centres."},{s:"Many species is in danger.",wrong:2,ok:"Many species are in danger."}],
  build:[{s:"The forests were protected.",pl:"Lasy zostały objęte ochroną."},{s:"Conservation really works.",pl:"Ochrona przyrody naprawdę działa."},{s:"Many species are still at risk.",pl:"Wiele gatunków wciąż jest zagrożonych."}],
  writing:{title:"Save an animal! ✍️",sub:"Choose an endangered animal. Write a short persuasive text (70+ words): why it's in danger and what people can do to help.",starters:["The … is an endangered species.","It is in danger because …","Its habitat is being destroyed by …","We can help by …","If we don't act now, …"],min:70},
  wordle:[["panda","🐼"],["breed","🐣"],["tiger","🐯"]]}),
]});

/* ================= KIDS · A1 versions of the first bonus lessons =================
   The original bonus lessons were too hard for kids (knackered, skint, run out of…).
   These replace their content but keep the same lesson ids, so progress is kept. */
const BONUS_KIDS={
 b_idioms:BX.v('bonus-idioms','kids','Funny English sayings with pictures: it\'s raining cats and dogs! 🐱🐶',{
  cardsTitle:'Funny sayings',wordsLabel:'Sayings',words:V([
   ["piece of cake","bardzo łatwe","🍰"],["raining cats and dogs","leje jak z cebra","🐱🐶"],["over the moon","bardzo szczęśliwy","🌙"],["busy as a bee","bardzo zajęty","🐝"],
   ["cool as a cucumber","spokojny","🥒"],["butterflies in my tummy","stres, tremę","🦋"],["hungry as a horse","bardzo głodny","🐴"],["early bird","ranny ptaszek","🐦"]]),
  quizTag:'WHAT DOES IT MEAN?',quiz:[
   {q:"🍰 The test was a piece of cake. It was…",opts:["easy","hard","yummy"],correct:0},
   {q:"🐱🐶 It's raining cats and dogs! There is…",opts:["lots of rain","a cat and a dog","snow"],correct:0},
   {q:"🌙 I'm over the moon! I'm…",opts:["very happy","in space","sleepy"],correct:0},
   {q:"🐴 I'm as hungry as a horse! I want…",opts:["a lot of food","a horse","water"],correct:0},
   {q:"🐦 You get up at six. You are an…",opts:["early bird","busy bee","cucumber"],correct:0}],
  fill:[
   {before:"Maths today was a piece of",blank:"cake",after:"!",bank:["cake","pizza","bread"],emoji:"🍰"},
   {before:"Take your umbrella! It's raining cats and",blank:"dogs",after:"!",bank:["dogs","mice","birds"],emoji:"☔"},
   {before:"Mum is very busy. She's as busy as a",blank:"bee",after:".",bank:["bee","cat","fish"],emoji:"🐝"},
   {before:"I've got a new puppy. I'm over the",blank:"moon",after:"!",bank:["moon","sun","star"],emoji:"🐶"}],
  move:[{emoji:"🐝",text:"Be a busy bee! Fly around the room and buzz: Bzzz! 🐝"},{emoji:"🐴",text:"Rub your tummy and say: I'm as hungry as a horse! 🐴"},{emoji:"🌙",text:"Jump up high and shout: I'm over the moon! 🌙"}],
  wordle:[["cake","🍰"],["moon","🌙"],["horse","🐴"]]}),
 b_slang:BX.v('bonus-slang','kids','Hello from the UK! Easy words British kids say every day.',{
  cardsTitle:'British words for kids',wordsLabel:'UK words',words:V([
   ["mum","mama","👩"],["mate","kolega","🤝"],["cheers","dzięki","🙌"],["brilliant","super","🌟"],["biscuit","ciastko","🍪"],["sweets","cukierki","🍬"],
   ["jumper","sweter","🧶"],["trainers","buty sportowe","👟"],["lorry","ciężarówka","🚚"],["bin","kosz na śmieci","🗑️"],["chips","frytki","🍟"],["holiday","wakacje","🏖️"]]),
  quizTag:'UK WORDS',quiz:[
   {q:"🍪 In the UK, a cookie is a…",opts:["biscuit","sweet","chip"],correct:0},
   {q:"🍟 In the UK, fries are…",opts:["chips","crisps","biscuits"],correct:0},
   {q:"🚚 A big truck is a…",opts:["lorry","bin","jumper"],correct:0},
   {q:"🙌 'Cheers!' means…",opts:["Thanks!","Goodbye!","Sorry!"],correct:0},
   {q:"🌟 That's brilliant! It's…",opts:["great","bad","cold"],correct:0},
   {q:"🧶 It's cold. Put on your…",opts:["jumper","trainers","sweets"],correct:0}],
  fill:[
   {before:"Put the paper in the",blank:"bin",after:", please.",bank:["bin","lorry","jumper"],emoji:"🗑️"},
   {before:"Can I have a",blank:"biscuit",after:"with my milk?",bank:["biscuit","lorry","holiday"],emoji:"🍪"},
   {before:"Let's play, my",blank:"mate",after:"!",bank:["mate","mum","bin"],emoji:"🤝"},
   {before:"I wear my",blank:"trainers",after:"for football.",bank:["trainers","sweets","chips"],emoji:"👟"},
   {before:"We go to the sea on",blank:"holiday",after:".",bank:["holiday","biscuit","lorry"],emoji:"🏖️"}],
  move:[{emoji:"🚚",text:"Drive a big lorry! Say: Beep beep! 🚚"},{emoji:"🍪",text:"Eat a pretend biscuit and say: Yummy! Cheers, Mum! 🍪"},{emoji:"🧶",text:"Put on a pretend jumper and say: Brrr, it's cold! 🧶"}],
  wordle:[["mate","🤝"],["sweet","🍬"],["chips","🍟"]]}),
 b_phrasal:BX.v('bonus-phrasal','kids','Stand up, sit down, wake up! Little action words for every day.',{
  cardsTitle:'Action words',wordsLabel:'Actions',words:V([
   ["wake up","obudzić się","⏰"],["get up","wstać (z łóżka)","🛏️"],["stand up","wstać","🧍"],["sit down","usiąść","🪑"],["put on","założyć","🧥"],["take off","zdjąć","🧢"],
   ["turn on","włączyć","💡"],["turn off","wyłączyć","🔌"],["come in","wejść","🚪"],["go out","wyjść","🌳"]]),
  quizTag:'ACTIONS',quiz:[
   {q:"🪑 The teacher says: Please ___ down.",opts:["sit","stand","wake"],correct:0},
   {q:"💡 It's dark. ___ on the light!",opts:["Turn","Put","Sit"],correct:0},
   {q:"🧥 It's cold. Put ___ your coat.",opts:["on","off","up"],correct:0},
   {q:"🧢 We're inside. Take ___ your cap.",opts:["off","on","in"],correct:0},
   {q:"⏰ It's 7 o'clock. Wake ___!",opts:["up","down","off"],correct:0},
   {q:"🚪 Knock, knock! Come ___!",opts:["in","out","off"],correct:0}],
  fill:[
   {before:"Please stand",blank:"up",after:"and say hello.",bank:["up","down","off"],emoji:"🧍"},
   {before:"Turn",blank:"off",after:"the TV. It's bedtime.",bank:["off","on","in"],emoji:"📺"},
   {before:"Let's go",blank:"out",after:"and play in the park!",bank:["out","in","up"],emoji:"🌳"},
   {before:"I get",blank:"up",after:"at seven o'clock.",bank:["up","down","in"],emoji:"🛏️"}],
  move:[{emoji:"🧍",text:"Stand up! Sit down! Stand up! Sit down! 🪑"},{emoji:"🧥",text:"Put on a pretend coat, then take it off! 🧥"},{emoji:"⏰",text:"Pretend to sleep… then wake up and stretch! ⏰"}],
  wordle:[["wake","⏰"],["stand","🧍"],["door","🚪"]]}),
};
