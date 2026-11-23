/* =====================================================================
   STANDALONE LESSON — Going on Holiday (A2, Teens & Adults)
   Built from the topics of a coursebook unit (holiday words, Past Simple,
   requests, phrases with "get", a holiday story and a holiday email),
   with Leogrow's own sentences and every Leogrow exercise type.
   ===================================================================== */
const HOL_A=V([
 ["go camping","jechać pod namiot","🏕️"],["go cycling","jeździć na rowerze","🚴"],["go hiking","wędrować","🥾⛰️"],
 ["go on a boat trip","popłynąć na wycieczkę łodzią","⛵"],["go on a day trip","pojechać na całodniową wycieczkę","🚌☀️"],
 ["go on a guided tour","pojechać na wycieczkę z przewodnikiem","🧑‍🏫🏛️"],["go snorkelling","nurkować z rurką","🤿"],
 ["go to the beach","iść / jechać na plażę","🏖️"],["try the local food","próbować lokalnego jedzenia","🍲😋"],
 ["explore a city","zwiedzać miasto","🏙️"],["buy a souvenir","kupić pamiątkę","🎁🛍️"],["go fishing","iść na ryby","🎣"],
]);
const HOL_B=V([
 ["get bored","znudzić się","🥱"],["get cold","marznąć","🥶"],["get dark","ściemniać się","🌙"],["get lost","zgubić się","❓🗺️"],
 ["get tired","zmęczyć się","😩"],["caravan","przyczepa kempingowa","🚐"],["airport","lotnisko","✈️"],["pillow","poduszka","🛏️"],
 ["train timetable","rozkład jazdy pociągów","🚆🕒"],["lend","pożyczać (komuś)","🤲"],["have a rest","odpoczywać","🛋️"],["a week ago","tydzień temu","📅"],
]);
const HOL_ALL=HOL_A.concat(HOL_B);

const HOL_GRAMMAR=`<p><b>Past Simple</b> = finished actions in the past: <i>yesterday, last summer, two days ago</i>.</p>
${TBL(["","➕ Positive","➖ Negative"],[
 ["<b>to be</b>","I / he / she / it <b>was</b> tired.<br>We / you / they <b>were</b> happy.","It <b>wasn't</b> hot.<br>They <b>weren't</b> at home."],
 ["<b>regular</b>","We <b>visited</b> a castle.<br>I <b>stayed</b> in a hostel.","We <b>didn't visit</b> the museum."],
 ["<b>irregular</b>","She <b>went</b> hiking.<br>I <b>bought</b> a souvenir.","She <b>didn't go</b> hiking."]])}
<p style="margin-top:12px;"><b>Questions:</b> <b>Did</b> you <b>go</b> camping? — <b>Yes, I did. / No, I didn't.</b><br><b>Was</b> it cold? — <b>Yes, it was. / No, it wasn't.</b><br><b>Where did</b> you <b>stay</b>? · <b>What did</b> you <b>eat</b>?</p>
<p style="margin-top:8px;">After <b>didn't</b> and <b>did</b> use the base verb: <i>didn't <b>go</b></i> ✅ — <i>didn't <s>went</s></i> ❌</p>
<p style="margin-top:8px;"><b>Irregular verbs:</b> go → went · buy → bought · eat → ate · swim → swam · take → took · see → saw · have → had · get → got · catch → caught · sleep → slept · lose → lost · meet → met</p>
<p style="margin-top:8px;"><b>Asking for things:</b> <i>Can you pass me the map, please?</i> · <i>Could you lend me your charger?</i> · <i>Can I have the window seat?</i><br><b>Answers:</b> <i>Yes, of course. · Yes, no problem. · Sorry, I can't. I'm using it right now. · Not now, sorry. I'm busy.</i></p>`;

const HOL_LESSON={id:"holiday-a2",title:"Going on Holiday",emoji:"🧳",num:"3",
 intro:"Holiday activities, phrases with get, the Past Simple and polite requests — a whole unit in one lesson.",
 bonus:HOL_ALL,
 zones:[
  {type:"cards",label:"Holiday words",title:"What can you do on holiday?",cards:HOL_A},
  {type:"find",label:"Find it",cards:HOL_A,rounds:10,title:"Which holiday activity is it? 🔎"},
  {type:"balloon",label:"Balloon Pop",cards:HOL_A,rounds:8},
  {type:"speak",label:"Say it",items:[
   {en:"go snorkelling",emoji:"🤿",pl:"nurkować z rurką"},{en:"try the local food",emoji:"🍲😋",pl:"próbować lokalnego jedzenia"},
   {en:"go on a guided tour",emoji:"🧑‍🏫🏛️",pl:"pojechać na wycieczkę z przewodnikiem"},
   {en:"We went camping last summer.",emoji:"🏕️",pl:"Zeszłego lata pojechaliśmy pod namiot."},
   {en:"Could you give me the key, please?",emoji:"🔑",pl:"Czy możesz mi dać klucz?"},
   {en:"Sorry, I can't. I'm using it right now.",emoji:"🙅",pl:"Przykro mi, nie mogę. Właśnie tego używam."}]},
  {type:"quiz",label:"In context",tag:"HOLIDAY IDEAS",qs:[
   {q:"You love animals in the sea. Why don't you…",opts:["go snorkelling","go cycling","go on a guided tour"],correct:0},
   {q:"You want to sleep in a tent. Let's…",opts:["go camping","go to the beach","buy a souvenir"],correct:0},
   {q:"You want someone to tell you about old buildings. Go on a…",opts:["guided tour","boat trip","day trip"],correct:0},
   {q:"You leave in the morning and come back in the evening. It's a…",opts:["day trip","guided tour","caravan"],correct:0},
   {q:"You want to eat what people eat there. You…",opts:["try the local food","go fishing","explore a city"],correct:0},
   {q:"You walk up a mountain with a backpack. You…",opts:["go hiking","go snorkelling","have a rest"],correct:0},
   {q:"You take a small present home for Grandma. You…",opts:["buy a souvenir","lend a souvenir","get a souvenir lost"],correct:0},
   {q:"You sit by a lake for hours with a rod. You…",opts:["go fishing","go cycling","go on a boat trip"],correct:0},
  ]},
  {type:"cards",label:"Get & travel",title:"Phrases with get + travel words",cards:HOL_B},
  {type:"match",label:"Match",pairs:HOL_B.slice(0,10)},
  {type:"memory",label:"Memory",pairs:memOf(HOL_A.slice(0,8))},
  {type:"spell",label:"Spell it",words:WL([["camping","🏕️"],["beach","🏖️"],["souvenir","🎁"],["caravan","🚐"],["airport","✈️"],["pillow","🛏️"],["fishing","🎣"]])},
  {type:"fill",label:"Phrases with get",tag:"GET + …",items:[
   {before:"I need my jumper. It's getting",blank:"cold",after:"!",bank:["cold","lost","bored"],emoji:"🥶"},
   {before:"We didn't have a map, so we got",blank:"lost",after:"in the old town.",bank:["lost","tired","dark"],emoji:"❓🗺️"},
   {before:"In winter it gets",blank:"dark",after:"at four o'clock.",bank:["dark","cold","tired"],emoji:"🌙"},
   {before:"This museum is so boring. I'm getting",blank:"bored",after:".",bank:["bored","lost","dark"],emoji:"🥱"},
   {before:"After ten kilometres we got",blank:"tired",after:"and had a rest.",bank:["tired","bored","lost"],emoji:"😩"},
   {before:"Can you",blank:"lend",after:"me ten euros? I want a souvenir.",bank:["lend","borrow","give back"],emoji:"🤲"},
   {before:"We slept in a",blank:"caravan",after:"by the lake.",bank:["caravan","airport","pillow"],emoji:"🚐"},
   {before:"Let's check the",blank:"train timetable",after:"before we go.",bank:["train timetable","pillow","souvenir"],emoji:"🚆🕒"},
  ]},
  {type:"odd",label:"Odd one out",items:[
   {opts:["go hiking","go cycling","go snorkelling","buy a souvenir"],odd:3,why:"Buying a souvenir isn't a sport."},
   {opts:["get cold","get tired","get bored","have a rest"],odd:3,why:"'Have a rest' doesn't use get."},
   {opts:["airport","caravan","train timetable","pillow"],odd:3,why:"A pillow isn't about travelling."},
   {opts:["went","bought","swam","visited"],odd:3,why:"'Visited' is regular — the others are irregular."},
   {opts:["yesterday","last summer","a week ago","tomorrow"],odd:3,why:"Tomorrow is the future, not the past."},
  ]},
  {type:"move",label:"Mime & say",items:[
   {emoji:"🚴",text:"Ride a bike up a big hill! Say: I went cycling! 🚴"},
   {emoji:"🤿",text:"Put on your mask and swim with the fish! Say: I went snorkelling! 🤿"},
   {emoji:"🥶",text:"Shiver — brrr! Say: I got cold! 🥶"},
   {emoji:"🎣",text:"Throw your fishing rod and catch a big fish! Say: I caught a fish! 🎣"},
  ]},
  {type:"grammar",label:"Past Simple",title:"Past Simple & requests",html:HOL_GRAMMAR},
  {type:"fill",label:"Fill it",tag:"PAST SIMPLE",items:[
   {before:"Last summer we",blank:"went",after:"to Croatia.",bank:["went","go","goed"],emoji:"✈️"},
   {before:"The weather",blank:"was",after:"great every day.",bank:["was","were","is"],emoji:"☀️"},
   {before:"My brother",blank:"didn't like",after:"the long walks.",bank:["didn't like","didn't liked","not liked"],emoji:"🥾"},
   {before:"We",blank:"swam",after:"in the sea every morning.",bank:["swam","swimmed","swim"],emoji:"🏊"},
   {before:"",blank:"Did",after:"you try the local food?",bank:["Did","Were","Do"],emoji:"🍲"},
   {before:"The hotel rooms",blank:"weren't",after:"very big.",bank:["weren't","wasn't","didn't"],emoji:"🏨"},
   {before:"I",blank:"bought",after:"a T-shirt as a souvenir.",bank:["bought","buyed","buy"],emoji:"👕"},
   {before:"We",blank:"visited",after:"an old castle on Tuesday.",bank:["visited","visit","visitted"],emoji:"🏰"},
  ]},
  {type:"whack",label:"Whack-a-Leo",qs:[
   {q:"go → ?",opts:["went","goed","gone"],correct:0},{q:"buy → ?",opts:["bought","buyed","brought"],correct:0},
   {q:"eat → ?",opts:["ate","eated","eat"],correct:0},{q:"take → ?",opts:["took","taked","takes"],correct:0},
   {q:"see → ?",opts:["saw","seed","seen"],correct:0},{q:"catch → ?",opts:["caught","catched","cought"],correct:0},
   {q:"sleep → ?",opts:["slept","sleeped","slipped"],correct:0},{q:"lose → ?",opts:["lost","losed","loosed"],correct:0},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"Did you go camping last summer?",pl:"Czy pojechałeś pod namiot zeszłego lata?"},
   {s:"We didn't take a map.",pl:"Nie wzięliśmy mapy."},
   {s:"Where did you stay?",pl:"Gdzie się zatrzymaliście?"},
   {s:"Was the water cold?",pl:"Czy woda była zimna?"},
   {s:"Could you lend me your charger?",pl:"Czy możesz pożyczyć mi swoją ładowarkę?"},
   {s:"It got dark very early.",pl:"Bardzo wcześnie się ściemniło."},
  ]},
  {type:"errors",label:"Find the error",items:[
   {s:"We goed to the beach yesterday.",wrong:1,ok:"We went to the beach yesterday."},
   {s:"I didn't saw any whales.",wrong:2,ok:"I didn't see any whales."},
   {s:"The rooms was very small.",wrong:2,ok:"The rooms were very small."},
   {s:"Did you went hiking?",wrong:2,ok:"Did you go hiking?"},
   {s:"She buyed a souvenir for me.",wrong:1,ok:"She bought a souvenir for me."},
   {s:"We get lost two days ago.",wrong:1,ok:"We got lost two days ago."},
  ]},
  {type:"quiz",label:"Requests",tag:"WHAT DO YOU SAY?",qs:[
   {q:"You need the key to your hotel room. You say:",opts:["Could you give me the key, please?","You give me the key.","I can the key?"],correct:0},
   {q:"Your friend asks for your tablet, but you're using it:",opts:["Sorry, you can't. I'm using it right now.","Yes, of course. Here you are.","Not now, it's getting dark."],correct:0},
   {q:"Mum asks you to bring her phone. You say yes:",opts:["Yes, no problem.","Sorry, I can't.","I didn't hear."],correct:0},
   {q:"You're doing homework and can't help now:",opts:["Not now, sorry. I'm busy.","Yes, of course.","Did you help?"],correct:0},
   {q:"You want the window seat on the train:",opts:["Can I have the window seat?","Do I have the window seat yesterday?","Give window!"],correct:0},
   {q:"'Can I borrow your sunglasses?' — 'Yes, ___.'",opts:["of course","I can't","I'm busy"],correct:0},
  ]},
  {type:"listen",label:"Listen",items:[
   {word:"Could you give me the key to my room?",options:["Could you give me the key to my room?","Could you give me the key to the car?","Can you give me a cake for my room?"],correct:0},
   {word:"We went on a boat trip.",options:["We went on a boat trip.","We want a boat trip.","We went on a bus trip."],correct:0},
   {word:"I got lost in the city.",options:["I got lost in the city.","I got cold in the city.","I lost my city."],correct:0},
   {word:"Did you try the local food?",options:["Did you try the local food?","Do you try the local food?","Did you buy the local food?"],correct:0},
  ]},
  {type:"reading",label:"Story",title:"Three Days in the Mountains",paras:[
   "<b>Three Days in the Mountains</b> — by Zosia, 14",
   "<b>A</b> — My family doesn't like big cities. We get bored in museums and shops! So last August we drove to the Tatra Mountains in our old caravan. Grandpa came too. He's seventy, but he's very fit.",
   "<b>B</b> — On the first day we went hiking to a lake. It was beautiful, but the path was really long and I got tired. In the afternoon it started to rain and we got very cold. Grandpa made hot chocolate in the caravan. That was the best part of the day!",
   "<b>C</b> — On the second day we went on a guided tour of a cave. The guide told us about the bears that live in the forest. We didn't see any bears, but we saw two eagles. In the evening my little brother lost his pillow, so he slept on Grandpa's jumper.",
   "<b>D</b> — On the last day we tried the local food — cheese, soup and big pancakes. I bought a wooden souvenir for my best friend. We didn't get lost once, because Grandpa knows every path. I want to go back next year!",
  ]},
  {type:"tf",label:"True/False/NG",title:"True, False or Not given?",sub:"Not given = the text doesn't say.",tag:"READING CHECK",labels:TF3,items:[
   {text:"Zosia's family loves big cities.",answer:1},{text:"They travelled in a caravan.",answer:0},
   {text:"Zosia got tired on the first day.",answer:0},{text:"They saw two bears in the forest.",answer:1},
   {text:"The guide was from Kraków.",answer:2},{text:"Zosia bought a souvenir for her friend.",answer:0},
   {text:"They got lost on the last day.",answer:1},
  ]},
  {type:"quiz",label:"Questions",tag:"READ AGAIN",qs:[
   {q:"Which part says why they didn't go to a city?",opts:["A","B","C"],correct:0},
   {q:"What was the best part of the first day?",opts:["Hot chocolate in the caravan","The long path","The rain"],correct:0},
   {q:"Where did they go on the second day?",opts:["To a cave","To a lake","To the beach"],correct:0},
   {q:"What did the brother sleep on?",opts:["Grandpa's jumper","A pillow","A souvenir"],correct:0},
   {q:"Why didn't they get lost?",opts:["Grandpa knows every path.","They had a map.","They had a guide every day."],correct:0},
  ]},
  {type:"typed",label:"Translation",blocks:[{id:"hol-tr",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"Zeszłego lata pojechaliśmy pod namiot.",answers:["Last summer we went camping","We went camping last summer"]},
   {prompt:"Nie zgubiliśmy się.",answers:["We didn't get lost","We did not get lost"]},
   {prompt:"Czy próbowałeś lokalnego jedzenia?",answers:["Did you try the local food"]},
   {prompt:"Robi się ciemno.",answers:["It's getting dark","It is getting dark"]},
   {prompt:"Czy możesz mi pożyczyć swój telefon?",answers:["Can you lend me your phone","Could you lend me your phone"]},
   {prompt:"Tydzień temu byłem na plaży.",answers:["A week ago I was at the beach","I was at the beach a week ago","A week ago I was on the beach","I was on the beach a week ago"]},
  ]}]},
  {type:"writing",label:"Holiday email",title:"Write a holiday email ✉️",sub:"Imagine you're on holiday. Write an email to a friend or someone in your family (min. 50 words). Start with Hi / Dear…, say what you did, and finish with a reason to stop writing.",
   starters:["Hi … ! / Dear Aunt … ,","I hope you're well. We're having a lovely time in …","I wish you were here!","Yesterday we went … and …","We didn't … because …","I need to …, so I can't write any more.","See you soon! / Lots of love,"],min:50},
  {type:"wordle",label:"Wordle",words:WL([["beach","🏖️"],["tired","😩"],["lost","❓🗺️"],["camping","🏕️"],["pillow","🛏️"]])},
  {type:"wheel",label:"Fortune Wheel",items:HOL_A},
 ]};
const STANDALONE_LESSON=HOL_LESSON;
const STANDALONE_UNIT={id:"holiday",level:"A2",track:"adults",topic:"Going on Holiday",title:"Going on Holiday",emoji:"🧳",badge:"Holiday Explorer",sub:"",n:3};
