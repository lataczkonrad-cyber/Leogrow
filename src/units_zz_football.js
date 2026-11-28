/* =====================================================================
   EXTRA LESSON — Football Fever ⚽ (2026-11-28)
   One long extra lesson on three levels: Kids A2, Teens & Adults A2 and B1
   (B1 adds phrasal verbs, idioms, a VAR opinion article and an opinion essay).
   Extra units (unit.extra) are always open, are not counted for level progress
   and don't block the next lesson. Step types dialogue / dictation / unittest
   are in steps_more.js.
   ===================================================================== */

const FB_TEAM=V([
 ["referee","sędzia","🧑‍⚖️"],["goalkeeper","bramkarz","🧤"],["defender","obrońca","🛡️"],["midfielder","pomocnik","↔️"],
 ["striker","napastnik","🎯"],["captain","kapitan","🎖️"],["substitute","zawodnik rezerwowy","🔄"],["coach","trener","📋"],
 ["fans","kibice","📣"],["pitch","boisko","🟩"],["stadium","stadion","🏟️"],["crowd","tłum (widzów)","👥"],
 ["kit","strój drużyny","👕"],["bench","ławka rezerwowych","🪑"],
]);
const FB_ACT=V([
 ["pass","podać, podanie","➡️⚽"],["shoot","strzelać, oddać strzał","💥⚽"],["score a goal","strzelić gola","🥅"],["save","obronić strzał, obrona","✋⚽"],
 ["header","strzał głową","🙆⚽"],["tackle","odbiór piłki, wślizg","🦵⚽"],["dribble","dryblować, prowadzić piłkę","🏃⚽"],["cross","dośrodkowanie","⤴️⚽"],
 ["foul","faul","⛔"],["dive","symulować faul (padać)","🤸"],["celebrate","świętować, cieszyć się","🎉"],["get injured","doznać kontuzji","🤕"],
]);
const FB_RULES=V([
 ["penalty","rzut karny","⚪🥅"],["free kick","rzut wolny","🦶⚽"],["corner","rzut rożny","🚩"],["offside","spalony","🚫🏃"],
 ["yellow card","żółta kartka","🟨"],["red card","czerwona kartka","🟥"],["half-time","przerwa między połowami","⏸️"],["extra time","dogrywka","⏱️"],
 ["penalty shootout","seria rzutów karnych","🔁🥅"],["draw","remis","🤝"],["beat","pokonać","💪"],["fixture","mecz w terminarzu","📅"],
 ["league table","tabela ligowa","📊"],["trophy","puchar, trofeum","🏆"],
]);
const FB_ALL=FB_TEAM.concat(FB_ACT,FB_RULES);

/* ---------- grammar boxes ---------- */
const FB_G_RULES=`<p>Football has lots of rules! 📜 We use these words to talk about them:</p>
${TBL(["Word","What it means","Example"],[
 ["<b>must</b> / <b>have to</b>","It's a rule. It's necessary. ✅","Players <b>must</b> wear shin pads.<br>The goalkeeper <b>has to</b> wear a different colour."],
 ["<b>mustn't</b>","It's NOT OK. Don't do it! ⛔","You <b>mustn't</b> touch the ball with your hands."],
 ["<b>don't have to</b>","It isn't necessary. You can, but you don't need to. 🤷","Substitutes <b>don't have to</b> play the whole match."],
 ["<b>can</b> / <b>are allowed to</b>","It's OK. It's permitted. 👍","The goalkeeper <b>can</b> catch the ball in the penalty area.<br>Teams <b>are allowed to</b> make five substitutions."],
 ["<b>can't</b> / <b>aren't allowed to</b>","It isn't permitted. 🚫","Defenders <b>can't</b> pick up the ball.<br>You <b>aren't allowed to</b> push other players."]])}
<p style="margin-top:12px;">⚠️ <b>mustn't</b> ≠ <b>don't have to</b>!<br><i>You <b>mustn't</b> kick the referee.</i> = it's forbidden 😱<br><i>You <b>don't have to</b> score in every match.</i> = it's not necessary 🙂</p>
<p style="margin-top:8px;">⚠️ After <b>must, mustn't, can, can't</b> → verb with no "to": <i>You must <b>stop</b></i> ✅ — <i>You must <s>to stop</s></i> ❌</p>
<p style="margin-top:8px;"><b>he / she / it</b> → <b>has to</b>, <b>doesn't have to</b>, <b>is allowed to</b>: <i>The captain <b>has to</b> shake hands with the referee.</i></p>
<p style="margin-top:8px;">Questions: <i><b>Do</b> we <b>have to</b> wear a kit? · <b>Can</b> the goalkeeper pick it up? · <b>Are</b> we <b>allowed to</b> tackle from behind?</i></p>`;

const FB_G_PAST=`<p><b>Past simple</b> — the language of match reports! 📰 Finished actions in the past.</p>
${TBL(["Regular (+ -ed)","Irregular — learn them! 🧠"],[
 ["pass → <b>passed</b>","beat → <b>beat</b> &nbsp;·&nbsp; win → <b>won</b> &nbsp;·&nbsp; lose → <b>lost</b>"],
 ["kick → <b>kicked</b>","shoot → <b>shot</b> &nbsp;·&nbsp; hit → <b>hit</b> &nbsp;·&nbsp; take → <b>took</b>"],
 ["score → <b>scored</b>","throw → <b>threw</b> &nbsp;·&nbsp; catch → <b>caught</b> &nbsp;·&nbsp; fall → <b>fell</b>"],
 ["save → <b>saved</b>","give → <b>gave</b> &nbsp;·&nbsp; run → <b>ran</b> &nbsp;·&nbsp; come → <b>came</b> on"],
 ["tackle → <b>tackled</b>","keep → <b>kept</b> &nbsp;·&nbsp; get → <b>got</b> &nbsp;·&nbsp; make → <b>made</b>"],
 ["try → <b>tried</b> &nbsp;·&nbsp; stop → <b>stopped</b>","blow (the whistle) → <b>blew</b> &nbsp;·&nbsp; feel → <b>felt</b>"]])}
<p style="margin-top:12px;">➖ <b>didn't</b> + verb: <i>We <b>didn't win</b>.</i> (NOT <s>didn't won</s>) · ❓ <b>Did</b> + verb: <i><b>Did</b> she <b>score</b>?</i></p>
<p style="margin-top:12px;"><b>Linking words</b> for a story 🔗: <i>At the start… · After ten minutes… · Just before half-time… · In the second half… · Then… · Suddenly… · In the last minute… · In the end…</i></p>
<p style="margin-top:8px;">Scores: <i>We <b>won 3–1</b>.</i> (three–one) · <i>It was a <b>draw</b>, 2–2.</i> (two all) · <i>They <b>beat</b> us 1–0.</i> (one–nil)</p>`;

const FB_G_COMP=`<p><b>Comparing teams</b> 📊 — comparatives and superlatives</p>
${TBL(["Adjective","Comparative (2 teams)","Superlative (the whole league)"],[
 ["fast","fast<b>er</b> than","the fast<b>est</b>"],["big","big<b>ger</b> than","the big<b>gest</b>"],
 ["strong","strong<b>er</b> than","the strong<b>est</b>"],["exciting","<b>more</b> exciting than","<b>the most</b> exciting"],
 ["good","<b>better</b> than","<b>the best</b>"],["bad","<b>worse</b> than","<b>the worst</b>"]])}
<p style="margin-top:12px;">With numbers: <b>more</b> points <b>than</b> · <b>fewer</b> goals <b>than</b> · <b>the most</b> wins · <b>the fewest</b> defeats</p>
<p style="margin-top:8px;"><b>as … as</b> = the same · <b>not as … as</b> = less: <i>Leo is<b>n't as</b> tall <b>as</b> Kuba.</i> · <i>The Rovers have<b>n't</b> scored <b>as many</b> goals <b>as</b> the Lions.</i></p>
<p style="margin-top:8px;">Places: <b>top of the league</b> 🥇 · <b>bottom of the league</b> 🔻 · <b>second</b>, <b>third</b>… · <b>goal difference</b> = goals for − goals against</p>
<p style="margin-top:8px;">⚠️ <i>better <b>than</b></i> ✅ — <i>better <s>that</s></i> ❌ · <i><b>the</b> best team</i> ✅ — <i><s>the most good</s></i> ❌</p>`;

const FB_TABLE=TBL(["Pos","Team","P","W","D","L","Goals","Pts"],[
 ["1","🚀 Riverside Rockets","10","7","2","1","24–9","<b>23</b>"],
 ["2","⚡ Hillford Thunder","10","6","2","2","21–12","<b>20</b>"],
 ["3","🦁 Lakeside Lions","10","4","3","3","15–14","<b>15</b>"],
 ["4","🌳 Oakbridge United","10","3","3","4","13–15","<b>12</b>"],
 ["5","🐺 Millbrook Rovers","10","2","3","5","10–18","<b>9</b>"],
 ["6","🏴‍☠️ Port Ellis Pirates","10","1","1","8","6–21","<b>4</b>"]]);

/* ---------- the lesson ---------- */
const FB_LESSON={id:"football-a2",title:"Football Fever",emoji:"⚽",num:"1",
 intro:"Become a real football expert! Referees and substitutes, headers and tackles, offside and penalties, the rules of the game, a cup final, a league table and what fans shout from the stands.",
 bonus:FB_ALL,
 zones:[
  /* ===== PART 1 — WHO'S WHO? ===== */
  {type:"cards",label:"Who's who",title:"Who's who in football? 🏟️",cards:FB_TEAM},
  {type:"find",label:"Find it",cards:FB_TEAM,rounds:10,title:"Find the right picture 🔎"},
  {type:"balloon",label:"Balloon Pop",cards:FB_TEAM,rounds:10},
  {type:"memory",label:"Memory",pairs:memOf(FB_TEAM.slice(0,8))},
  {type:"quiz",label:"Who is it?",tag:"WHO IS IT?",qs:[
   {q:"🧑‍⚖️ This person has a whistle and gives yellow and red cards.",opts:["the referee","the captain","the coach"],correct:0},
   {q:"🧤 This player can catch the ball with their hands.",opts:["the goalkeeper","the striker","the defender"],correct:0},
   {q:"🎯 This player's main job is to score goals.",opts:["the striker","the goalkeeper","the substitute"],correct:0},
   {q:"🛡️ This player stays near their own goal and stops the other team.",opts:["a defender","a fan","a striker"],correct:0},
   {q:"🔄 This player sits on the bench and comes on later in the match.",opts:["a substitute","the referee","the captain"],correct:0},
   {q:"📋 This person trains the team and chooses the players.",opts:["the coach","the referee","the goalkeeper"],correct:0},
   {q:"🎖️ This player wears an armband and leads the team.",opts:["the captain","the substitute","the coach"],correct:0},
   {q:"↔️ This player plays in the middle of the pitch, between the defenders and the strikers.",opts:["a midfielder","a goalkeeper","a fan"],correct:0},
   {q:"📣 These people sing, shout and wave scarves in the stadium.",opts:["the fans","the defenders","the referees"],correct:0},
   {q:"🟩 The grass area where the match is played is the…",opts:["pitch","bench","crowd"],correct:0},
   {q:"👕 The shirts, shorts and socks of a team are the…",opts:["kit","trophy","stadium"],correct:0},
   {q:"👥 All the people watching the match together are the…",opts:["crowd","bench","kit"],correct:0},
  ]},
  {type:"reading",label:"Read: the Rockets",title:"Meet the Riverside Rockets 🚀",paras:[
   "The <b>Riverside Rockets</b> are an under-13 football team from a small town by a river. They play in blue and white, and their home <b>pitch</b> is behind the old sports centre. It isn't a big <b>stadium</b>, but on Saturdays there's a loud <b>crowd</b> of parents, grandparents and friends.",
   "🎖️ <b>Maja, 12</b> — Maja is the <b>captain</b> and the team's best <b>striker</b>. She's very fast and she scores lots of goals with her left foot. Before every match she tells the team: \"Heads up, Rockets!\"",
   "🧤 <b>Kuba, 12</b> — Kuba is the <b>goalkeeper</b>. He's the tallest player in the team and he isn't afraid of anything. Last season he saved four <b>penalties</b>! He always wears lucky green gloves.",
   "🛡️ <b>Zoe, 11</b> — Zoe is a <b>defender</b>. She doesn't score many goals, but she's brilliant at <b>tackles</b>. Strikers from other teams don't like playing against her!",
   "↔️ <b>Olek, 11</b> — Olek is a <b>midfielder</b>. He runs all the time and he's great at long <b>passes</b>. He wants to be a professional footballer one day.",
   "🔄 <b>Leo, 10</b> — Leo is the youngest player. He's usually a <b>substitute</b>, so he starts the match on the <b>bench</b>. But when he comes on, the <b>fans</b> go crazy, because he's amazing at <b>headers</b>!",
   "📋 <b>Mr Byrne</b> is the <b>coach</b>. He's friendly but strict. His favourite rule is: \"Train hard, play fair, and always shake hands with the <b>referee</b>.\"",
  ]},
  {type:"tf",label:"True, false…?",title:"True, False or Not given?",sub:"Read about the Rockets again. Not given = the text doesn't say.",tag:"READING CHECK",labels:TF3,items:[
   {text:"The Rockets play in blue and white.",answer:0},{text:"Their home pitch is in a very big stadium.",answer:1},
   {text:"Maja scores most of her goals with her right foot.",answer:1},{text:"Kuba is the tallest player in the team.",answer:0},
   {text:"Kuba's gloves are green.",answer:0},{text:"Zoe scores lots of goals.",answer:1},
   {text:"Olek's dad was a professional footballer.",answer:2},{text:"Leo usually starts the match on the bench.",answer:0},
   {text:"Mr Byrne is the referee.",answer:1},{text:"The Rockets train three times a week.",answer:2},
  ]},
  {type:"spell",label:"Spell it",words:WL([["referee","🧑‍⚖️"],["goalkeeper","🧤"],["striker","🎯"],["captain","🎖️"],["substitute","🔄"],["stadium","🏟️"],["midfielder","↔️"],["defender","🛡️"]])},

  /* ===== PART 2 — ON THE BALL: ACTIONS ===== */
  {type:"cards",label:"Actions",title:"What do players do? ⚡",cards:FB_ACT},
  {type:"match",label:"Match",pairs:FB_ACT.slice(0,8)},
  {type:"fill",label:"Action words",tag:"FOOTBALL ACTIONS",items:[
   {before:"Olek made a long",blank:"pass",after:"to Maja on the left.",bank:["pass","save","foul"],emoji:"➡️"},
   {before:"Maja ran past three defenders. She can really",blank:"dribble",after:"!",bank:["dribble","dive","celebrate"],emoji:"🏃"},
   {before:"Leo jumped high and scored with a",blank:"header",after:".",bank:["header","tackle","corner"],emoji:"🙆"},
   {before:"What a",blank:"save",after:"! The goalkeeper stopped the ball with one hand.",bank:["save","cross","pass"],emoji:"🧤"},
   {before:"Zoe won the ball with a perfect",blank:"tackle",after:".",bank:["tackle","header","shoot"],emoji:"🦵"},
   {before:"He kicked the other player's leg. That's a",blank:"foul",after:"!",bank:["foul","save","pass"],emoji:"⛔"},
   {before:"She sent a high",blank:"cross",after:"into the penalty area.",bank:["cross","save","bench"],emoji:"⤴️"},
   {before:"He fell down, but nobody touched him! He wanted to",blank:"dive",after:".",bank:["dive","shoot","pass"],emoji:"🤸"},
   {before:"After the goal, all the players ran to the fans to",blank:"celebrate",after:".",bank:["celebrate","tackle","dribble"],emoji:"🎉"},
   {before:"Don't wait —",blank:"shoot",after:"! The goal is empty!",bank:["shoot","save","dive"],emoji:"💥"},
   {before:"Zoe fell badly and",blank:"got injured",after:". She had to leave the pitch.",bank:["got injured","celebrated","scored"],emoji:"🤕"},
  ]},
  {type:"whack",label:"Whack-a-Leo",qs:[
   {q:"A goal with your head is a…",opts:["header","tackle","cross"],correct:0},{q:"The goalkeeper stops the ball: a…",opts:["save","foul","pass"],correct:0},
   {q:"You kick the ball to a teammate: a…",opts:["pass","dive","header"],correct:0},{q:"You take the ball from an opponent: a…",opts:["tackle","save","corner"],correct:0},
   {q:"You break a rule: a…",opts:["foul","goal","save"],correct:0},{q:"You fall down to trick the referee: you…",opts:["dive","dribble","pass"],correct:0},
   {q:"You run with the ball past players: you…",opts:["dribble","save","foul"],correct:0},{q:"You kick the ball from the side into the box: a…",opts:["cross","save","bench"],correct:0},
   {q:"The ball goes in the net: you…",opts:["score a goal","get injured","dive"],correct:0},{q:"Jump, dance, hug your teammates: you…",opts:["celebrate","tackle","shoot"],correct:0},
  ]},
  {type:"odd",label:"Odd one out",items:[
   {opts:["header","pass","cross","bench"],odd:3,why:"A bench is a place to sit. The others are things you do with the ball."},
   {opts:["striker","defender","goalkeeper","referee"],odd:3,why:"The referee isn't a player in a team."},
   {opts:["yellow card","red card","foul","trophy"],odd:3,why:"You get a trophy for winning — not for breaking the rules!"},
   {opts:["pitch","stadium","bench","whistle"],odd:3,why:"A whistle isn't a place. The others are places at a match."},
   {opts:["win","beat","score","lose"],odd:3,why:"Win, beat and score are good news. Lose is bad news!"},
   {opts:["coach","captain","substitute","crowd"],odd:3,why:"The crowd watches. The others are part of the team."},
  ]},
  {type:"listen",label:"Listen",items:[
   {word:"What a header!",options:["What a header!","What a heater!","What a hitter!"],correct:0},
   {word:"The goalkeeper made a great save.",options:["The goalkeeper made a great save.","The goalkeeper made a great safe.","The goalkeeper made a great shave."],correct:0},
   {word:"He tackled the striker.",options:["He tackled the striker.","He tickled the striker.","He talked to the striker."],correct:0},
   {word:"The substitute came on in the second half.",options:["The substitute came on in the second half.","The substitute came in the second car.","The substitute come on in the first half."],correct:0},
   {word:"That was a dive, not a foul!",options:["That was a dive, not a foul!","That was a drive, not a full!","That was five, not four!"],correct:0},
   {word:"She dribbled past two defenders.",options:["She dribbled past two defenders.","She dribbled past the fences.","She doubled past two defenders."],correct:0},
  ]},
  {type:"speak",label:"Say it",items:[
   {en:"Pass the ball!",emoji:"➡️⚽",pl:"Podaj piłkę!"},
   {en:"What a save!",emoji:"🧤",pl:"Co za obrona!"},
   {en:"He scored with a header.",emoji:"🙆⚽",pl:"Strzelił gola głową."},
   {en:"That was a great tackle.",emoji:"🦵⚽",pl:"To był świetny wślizg."},
   {en:"The striker dribbled past the defender.",emoji:"🏃⚽",pl:"Napastnik minął obrońcę dryblingiem."},
   {en:"The substitute is warming up.",emoji:"🔄",pl:"Rezerwowy się rozgrzewa."},
  ]},
  {type:"move",label:"Act it out",items:[
   {emoji:"🙆",text:"Jump up and do a header! Say: What a header! 🙆"},
   {emoji:"🧤",text:"Be a goalkeeper — dive to the left and make a save! Say: Saved! 🧤"},
   {emoji:"🧑‍⚖️",text:"Be the referee: blow an imaginary whistle and show a yellow card. Say: That's a foul! 🟨"},
   {emoji:"🏃",text:"Dribble an imaginary ball around a chair. Say: I'm dribbling past the defender! 🏃"},
   {emoji:"🎉",text:"You scored! Do your best goal celebration and shout: GOAL! 🎉"},
   {emoji:"🤸",text:"Pretend to dive, then stand up and say: Sorry, ref, that was a dive! 🤸"},
  ]},

  /* ===== PART 3 — THE RULES OF THE GAME ===== */
  {type:"cards",label:"Rules & results",title:"Rules and results 🟨🟥",cards:FB_RULES},
  {type:"quiz",label:"What's it called?",tag:"FOOTBALL WORDS",qs:[
   {q:"🚩 The ball goes out behind the goal line. The defender touched it last. It's a…",opts:["corner","penalty","throw-in"],correct:0},
   {q:"⚪🥅 A defender fouls a striker inside the penalty area. It's a…",opts:["penalty","corner","free kick"],correct:0},
   {q:"🚫🏃 A striker is behind all the defenders when the ball is passed to her. She's…",opts:["offside","injured","a substitute"],correct:0},
   {q:"🟨 A player makes a bad foul. The referee shows a…",opts:["yellow card","trophy","fixture"],correct:0},
   {q:"🟥 Two yellow cards = one…",opts:["red card","penalty","draw"],correct:0},
   {q:"⏸️ The 15-minute break in the middle of the match is…",opts:["half-time","extra time","a fixture"],correct:0},
   {q:"⏱️ In a cup final the score is 1–1 after 90 minutes. They play 30 more minutes. That's…",opts:["extra time","half-time","a penalty"],correct:0},
   {q:"🤝 The final score is 2–2. It's a…",opts:["draw","win","foul"],correct:0},
   {q:"🔁🥅 Still a draw after extra time? Five players from each team take penalties. It's a…",opts:["penalty shootout","free kick","league table"],correct:0},
   {q:"📊 A list of all the teams with their points is a…",opts:["league table","fixture","kit"],correct:0},
   {q:"📅 Our next ___ is against Hillford Thunder on Saturday at 10 a.m.",opts:["fixture","trophy","crowd"],correct:0},
   {q:"🏆 The winners lift the…",opts:["trophy","bench","corner"],correct:0},
  ]},
  {type:"grammar",label:"must / have to",title:"Rules: must, mustn't, have to, don't have to, can",html:FB_G_RULES},
  {type:"quiz",label:"Is it allowed?",tag:"THE RULES",qs:[
   {q:"🖐️ Players ___ touch the ball with their hands (but goalkeepers can in their area).",opts:["mustn't","must","don't have to"],correct:0},
   {q:"🦵 Players ___ wear shin pads. It's a rule.",opts:["have to","don't have to","mustn't"],correct:0},
   {q:"🧤 The goalkeeper ___ catch the ball in the penalty area.",opts:["can","mustn't","can't"],correct:0},
   {q:"🔄 Substitutes ___ play the whole match. They sometimes play for only ten minutes.",opts:["don't have to","mustn't","have to"],correct:0},
   {q:"🟥 After a red card, the player ___ leave the pitch.",opts:["has to","doesn't have to","can"],correct:0},
   {q:"😡 You ___ shout at the referee. You can get a yellow card!",opts:["mustn't","have to","are allowed to"],correct:0},
   {q:"🎖️ The captain ___ be the best player. But he or she has to be a good leader.",opts:["doesn't have to","mustn't","can't"],correct:0},
   {q:"🔢 In many leagues teams ___ make five substitutions.",opts:["are allowed to","mustn't","aren't allowed to"],correct:0},
   {q:"👕 The two goalkeepers ___ wear different colours from all the other players.",opts:["must","mustn't","don't have to"],correct:0},
   {q:"🤝 At the end of the match you ___ shake hands. It's good manners, and in our club it's a rule!",opts:["have to","mustn't","aren't allowed to"],correct:0},
  ]},
  {type:"fill",label:"Club rules",tag:"OUR CLUB RULES",items:[
   {before:"You",blank:"must",after:"arrive ten minutes before training.",bank:["must","mustn't","don't have to"],emoji:"⏰"},
   {before:"You",blank:"mustn't",after:"wear jewellery on the pitch. It's dangerous.",bank:["mustn't","must","have to"],emoji:"💍"},
   {before:"You",blank:"don't have to",after:"bring a ball. The club has got lots of balls.",bank:["don't have to","mustn't","must"],emoji:"⚽"},
   {before:"Every player",blank:"has to",after:"bring a bottle of water.",bank:["has to","have to","must to"],emoji:"💧"},
   {before:"Parents",blank:"are allowed to",after:"watch, but they mustn't shout at the referee.",bank:["are allowed to","aren't allowed to","mustn't"],emoji:"👨‍👩‍👧"},
   {before:"",blank:"Do",after:"we have to wear the club kit on Saturday?",bank:["Do","Does","Must"],emoji:"👕"},
   {before:"The goalkeeper",blank:"doesn't have to",after:"run very much, but she has to be brave!",bank:["doesn't have to","don't have to","mustn't"],emoji:"🧤"},
   {before:"You",blank:"can't",after:"play if you're ill. Stay at home!",bank:["can't","can","have to"],emoji:"🤒"},
   {before:"",blank:"Are",after:"we allowed to use our phones in the changing room?",bank:["Are","Do","Have"],emoji:"📱"},
   {before:"You must",blank:"listen",after:"to the coach.",bank:["listen","to listen","listening"],emoji:"📋"},
  ]},
  {type:"tf",label:"Football facts",title:"Real football rules: true or false?",sub:"What do you know about football? Guess if you aren't sure — the answers teach you!",tag:"FOOTBALL FACTS",items:[
   {text:"A professional match has two halves of 45 minutes.",answer:0},
   {text:"There are twelve players in a team on the pitch.",answer:1},
   {text:"You can't be offside in your own half of the pitch.",answer:0},
   {text:"A player with two yellow cards can stay on the pitch.",answer:1},
   {text:"The goalkeeper is allowed to use their hands outside the penalty area.",answer:1},
   {text:"A penalty is taken from a spot eleven metres from the goal.",answer:0},
   {text:"You can score a goal directly from a corner.",answer:0},
   {text:"Players have to take off their boots at half-time.",answer:1},
  ]},
  {type:"errors",label:"Find the error",items:[
   {s:"You must to wear shin pads.",wrong:2,ok:"You must wear shin pads."},
   {s:"She have to wear gloves.",wrong:1,ok:"She has to wear gloves."},
   {s:"Players mustn't touches the ball with their hands.",wrong:2,ok:"Players mustn't touch the ball with their hands."},
   {s:"Does we have to train on Sunday?",wrong:0,ok:"Do we have to train on Sunday?"},
   {s:"He don't have to play the whole match.",wrong:1,ok:"He doesn't have to play the whole match."},
   {s:"We are allow to make five substitutions.",wrong:2,ok:"We are allowed to make five substitutions."},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"You mustn't touch the ball with your hands.",pl:"Nie wolno dotykać piłki rękami."},
   {s:"The goalkeeper is allowed to catch the ball.",pl:"Bramkarzowi wolno złapać piłkę."},
   {s:"Do we have to wear shin pads?",pl:"Czy musimy nosić ochraniacze?"},
   {s:"Substitutes don't have to play the whole match.",pl:"Rezerwowi nie muszą grać całego meczu."},
   {s:"After a red card you have to leave the pitch.",pl:"Po czerwonej kartce musisz zejść z boiska."},
   {s:"The referee gave a penalty for a foul.",pl:"Sędzia podyktował rzut karny za faul."},
  ]},
  
  /* ===== PART 4 — THE CUP FINAL (PAST SIMPLE) ===== */
  {type:"dialogue",label:"Listening: the final",title:"Live on Radio Riverside 🎧📻",sub:"The Rockets are playing Hillford Thunder in the Under-13 Cup Final. Listen to the radio commentary first — the text is hidden. Then answer the questions on the next step.",hide:true,
   cast:{"Commentator Sam":"🎙️","Commentator Priya":"🎧"},lines:[
   ["Commentator Sam","Good afternoon and welcome to the Cup Final! The Riverside Rockets in blue, Hillford Thunder in yellow. And the referee blows her whistle. We're off!"],
   ["Commentator Priya","Ten minutes gone and Thunder are attacking. A cross from the right… a header… and it's a goal! Thunder lead one–nil."],
   ["Commentator Sam","The Rockets' fans are very quiet now. But here's Maja, the Rockets' captain. She dribbles past one defender, two defenders… she shoots… GOAL! One all!"],
   ["Commentator Priya","Just before half-time — oh no! Zoe tackles a Thunder striker in the penalty area. The referee points to the spot. Penalty!"],
   ["Commentator Sam","Kuba in goal for the Rockets… the striker runs up… and Kuba saves it! What a save! It's still one all at half-time."],
   ["Commentator Priya","Second half now, and Mr Byrne makes a substitution. Young Leo is coming on for Olek."],
   ["Commentator Sam","Eighty minutes… a corner for the Rockets. Olek isn't on the pitch, so Maja takes it… and Leo heads it in! Two–one to the Rockets!"],
   ["Commentator Priya","But wait — Thunder go straight up the other end. A long pass… is the striker offside? No flag! She shoots… two all! What a match!"],
   ["Commentator Sam","Ninety minutes, and it's a draw. We're going to extra time… and after extra time it's still two all. So it's a penalty shootout!"],
   ["Commentator Priya","The last penalty… Kuba dives to his left… and he SAVES it! The Rockets win the shootout four–three! The Rockets win the cup!"],
  ]},
  {type:"quiz",label:"Listening questions",tag:"LISTENING",qs:[
   {q:"What colour do Hillford Thunder play in?",opts:["Yellow","Blue","Blue and white"],correct:0},
   {q:"How did Thunder score their first goal?",opts:["With a header after a cross","From a penalty","From a corner"],correct:0},
   {q:"Who scored the Rockets' first goal?",opts:["Maja","Leo","Olek"],correct:0},
   {q:"Why did Thunder get a penalty?",opts:["Zoe tackled a striker in the penalty area.","Kuba touched the ball outside his area.","A defender used her hands."],correct:0},
   {q:"What happened to the penalty before half-time?",opts:["Kuba saved it.","It hit the post.","Thunder scored."],correct:0},
   {q:"Which player went off when Leo came on?",opts:["Olek","Zoe","Maja"],correct:0},
   {q:"What was the score after 90 minutes?",opts:["2–2","2–1","1–1"],correct:0},
   {q:"Who won the penalty shootout?",opts:["The Rockets, 4–3","Thunder, 4–3","The Rockets, 3–2"],correct:0},
  ]},
  {type:"reading",label:"Read: match report",title:"The school newspaper: ROCKETS LIFT THE CUP! 🏆📰",paras:[
   "<b>Last Saturday the Riverside Rockets won the Under-13 Cup for the first time in the club's history.</b> Hundreds of fans came to the final at Hillford Park, and they saw one of the most exciting matches of the year.",
   "The Rockets didn't start well. After ten minutes Thunder scored a great header, and the Rockets looked nervous. But their captain Maja didn't give up. In the 25th minute she ran past two defenders and hit the ball into the top corner. 1–1!",
   "Just before half-time, defender Zoe made a late tackle and the referee gave a penalty to Thunder. Everybody was worried — but goalkeeper Kuba dived and kept the ball out with his fingertips. \"I felt very calm,\" he told us later. \"I just watched the ball.\"",
   "In the second half, coach Mr Byrne brought on substitute Leo, the youngest player in the team. Ten minutes before the end, Leo jumped higher than everybody and headed the ball into the net from Maja's corner. 2–1! But only one minute later, a Thunder striker equalised. Some fans thought she was offside, but the goal stood.",
   "There were no more goals in extra time, so the final went to a penalty shootout. Maja, Olek, Zoe and Leo all scored. Then Kuba saved the last penalty, and the Rockets won 4–3. The players ran to the fans and celebrated for twenty minutes!",
   "\"I'm so proud of them,\" said Mr Byrne. \"We weren't the best team today, but we were the bravest. And we played fair — we didn't get a single yellow card.\" Next up: the Rockets' first league fixture of the new season, against Lakeside Lions on 6th September.",
  ]},
  {type:"quiz",label:"Report check",tag:"READING CHECK",qs:[
   {q:"Was this the Rockets' first cup?",opts:["Yes, it was the first time.","No, they won it last year too.","The report doesn't say."],correct:0},
   {q:"How did Maja score?",opts:["She ran past two defenders and shot into the top corner.","With a header.","From a penalty."],correct:0},
   {q:"How did Kuba feel during the penalty?",opts:["Calm","Nervous","Angry"],correct:0},
   {q:"Who gave Leo the ball for his goal?",opts:["Maja, from a corner","Olek, with a long pass","Zoe, with a cross"],correct:0},
   {q:"Why were some fans unhappy with Thunder's second goal?",opts:["They thought the striker was offside.","The ball didn't cross the line.","It was a dive."],correct:0},
   {q:"How many Rockets players scored in the shootout?",opts:["Four","Three","Five"],correct:0},
   {q:"What is Mr Byrne happy about? (two things)",opts:["The team was brave and played fair.","The team was the best and scored the most.","The fans were quiet and polite."],correct:0},
   {q:"What is the Rockets' next fixture?",opts:["A league match against Lakeside Lions","Another final against Thunder","A friendly against Port Ellis"],correct:0},
  ]},
  {type:"grammar",label:"Past simple",title:"Telling a match story: the past simple",html:FB_G_PAST},
  {type:"fill",label:"Match report",tag:"PAST SIMPLE",items:[
   {before:"Last Saturday the Rockets",blank:"won",after:"the cup.",bank:["won","winned","win"],emoji:"🏆"},
   {before:"Thunder",blank:"scored",after:"a header after ten minutes.",bank:["scored","score","scoring"],emoji:"🙆"},
   {before:"Maja",blank:"ran",after:"past two defenders.",bank:["ran","runned","run"],emoji:"🏃"},
   {before:"Kuba",blank:"caught",after:"the ball easily.",bank:["caught","catched","catch"],emoji:"🧤"},
   {before:"The referee",blank:"gave",after:"a penalty to Thunder.",bank:["gave","gived","give"],emoji:"🧑‍⚖️"},
   {before:"Zoe",blank:"fell",after:"and hurt her knee.",bank:["fell","falled","fall"],emoji:"🤕"},
   {before:"Mr Byrne",blank:"brought",after:"on Leo in the second half.",bank:["brought","bringed","bring"],emoji:"🔄"},
   {before:"We didn't",blank:"lose",after:"a single match last season!",bank:["lose","lost","losed"],emoji:"💪"},
   {before:"",blank:"Did",after:"Leo score in the final?",bank:["Did","Does","Was"],emoji:"❓"},
   {before:"The Rockets",blank:"beat",after:"Thunder 4–3 on penalties.",bank:["beat","beated","beaten"],emoji:"🚀"},
   {before:"Olek",blank:"threw",after:"the ball to Zoe.",bank:["threw","throwed","throw"],emoji:"👐"},
   {before:"The referee",blank:"blew",after:"her whistle at the end of the match.",bank:["blew","blowed","blow"],emoji:"⏱️"},
  ]},
  {type:"whack",label:"Whack the verb",qs:[
   {q:"win →",opts:["won","winned","wan"],correct:0},{q:"lose →",opts:["lost","losed","lose"],correct:0},
   {q:"shoot →",opts:["shot","shooted","shoots"],correct:0},{q:"take →",opts:["took","taked","tooked"],correct:0},
   {q:"catch →",opts:["caught","catched","cought"],correct:0},{q:"keep →",opts:["kept","keeped","kep"],correct:0},
   {q:"beat →",opts:["beat","beated","bet"],correct:0},{q:"come →",opts:["came","comed","come"],correct:0},
   {q:"throw →",opts:["threw","throwed","thrown"],correct:0},{q:"feel →",opts:["felt","feeled","fell"],correct:0},
  ]},
  {type:"errors",label:"Find the error 2",items:[
   {s:"Kuba catched the ball.",wrong:1,ok:"Kuba caught the ball."},
   {s:"We didn't won the match.",wrong:2,ok:"We didn't win the match."},
   {s:"Did she scored a goal?",wrong:2,ok:"Did she score a goal?"},
   {s:"The Rockets beated Thunder.",wrong:2,ok:"The Rockets beat Thunder."},
   {s:"Leo come on in the second half.",wrong:1,ok:"Leo came on in the second half."},
   {s:"Our team is better that their team.",wrong:4,ok:"Our team is better than their team."},
  ]},
  {type:"dictation",label:"Dictation",title:"Listen and write ✍️",sub:"Listen and type what you hear. Tap 🐢 to hear it slowly.",items:[
   {en:"The referee gave a penalty."},{en:"Kuba saved the last penalty."},
   {en:"Leo scored with a header."},{en:"It was a draw after extra time."},
   {en:"You mustn't touch the ball with your hands."},{en:"The Rockets won the cup."},
  ]},
  {type:"typed",label:"Translation",blocks:[{id:"fb-tr",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"Sędzia pokazał żółtą kartkę.",answers:["The referee showed a yellow card"]},
   {prompt:"Wygraliśmy 3–1.",answers:["We won 3-1","We won 3–1","We won three one","We won three-one"]},
   {prompt:"To był remis.",answers:["It was a draw"]},
   {prompt:"Bramkarz obronił rzut karny.",answers:["The goalkeeper saved the penalty","The goalkeeper saved a penalty"]},
   {prompt:"Nie wolno ci krzyczeć na sędziego.",answers:["You mustn't shout at the referee","You must not shout at the referee","You aren't allowed to shout at the referee","You are not allowed to shout at the referee","You can't shout at the referee"]},
   {prompt:"Napastnik był na spalonym.",answers:["The striker was offside"]},
  ]}]},

  /* ===== PART 5 — THE LEAGUE TABLE ===== */
  {type:"grammar",label:"League table",title:"The Under-13 league table 📊",html:`<p>Here is the league table after ten matches. <b>P</b> = played · <b>W</b> = won · <b>D</b> = drawn · <b>L</b> = lost · <b>Pts</b> = points. A win = 3 points, a draw = 1 point, a defeat = 0 points.</p>
${FB_TABLE}
<p style="margin-top:12px;">The Rockets are <b>top of the league</b> with 23 points, three points <b>more than</b> Hillford Thunder. Port Ellis Pirates are <b>bottom of the league</b> — they've only won one match. The Rockets have got <b>the best</b> defence: they let in only nine goals, <b>fewer than</b> any other team.</p>`},
  {type:"grammar",label:"Comparing teams",title:"better, the best, more points than…",html:FB_G_COMP},
  {type:"quiz",label:"Read the table",tag:"LEAGUE TABLE",qs:[
   {q:"📊 Which team is top of the league?",opts:["Riverside Rockets","Hillford Thunder","Lakeside Lions"],correct:0},
   {q:"📊 Which team has lost the most matches?",opts:["Port Ellis Pirates","Millbrook Rovers","Oakbridge United"],correct:0},
   {q:"📊 Thunder have got ___ points than the Rockets.",opts:["fewer","more","the most"],correct:0},
   {q:"📊 Who has scored more goals: the Lions or United?",opts:["The Lions (15)","United (13)","They've scored the same."],correct:0},
   {q:"📊 Which team has drawn the fewest matches?",opts:["Port Ellis Pirates","Lakeside Lions","Millbrook Rovers"],correct:0},
   {q:"📊 The Rockets have got ___ defence in the league.",opts:["the best","the better","the most good"],correct:0},
   {q:"📊 Millbrook Rovers are ___ than Oakbridge United.",opts:["lower in the table","higher in the table","the highest"],correct:0},
   {q:"📊 How many points do the Lions get for 4 wins and 3 draws?",opts:["15","12","7"],correct:0},
   {q:"📊 Thunder's next fixture is against the Rockets. If Thunder win, they will have…",opts:["23 points — the same as the Rockets","21 points","26 points"],correct:0},
  ]},
  {type:"fill",label:"Compare them",tag:"COMPARATIVES & SUPERLATIVES",items:[
   {before:"Maja is",blank:"faster",after:"than Olek.",bank:["faster","more fast","fastest"],emoji:"⚡"},
   {before:"Kuba is the",blank:"tallest",after:"player in the team.",bank:["tallest","taller","most tall"],emoji:"📏"},
   {before:"The final was",blank:"more exciting",after:"than the semi-final.",bank:["more exciting","excitinger","most exciting"],emoji:"🤩"},
   {before:"The Rockets are the",blank:"best",after:"team in the league.",bank:["best","better","goodest"],emoji:"🥇"},
   {before:"The Pirates had the",blank:"worst",after:"season of all the teams.",bank:["worst","worse","baddest"],emoji:"🔻"},
   {before:"Thunder have got fewer points",blank:"than",after:"the Rockets.",bank:["than","that","as"],emoji:"📊"},
   {before:"Our stadium is",blank:"bigger",after:"than yours!",bank:["bigger","biger","more big"],emoji:"🏟️"},
   {before:"Leo isn't as tall",blank:"as",after:"Kuba, but he's great at headers.",bank:["as","than","like"],emoji:"🙆"},
   {before:"The Lions have lost",blank:"fewer",after:"matches than United.",bank:["fewer","less","the fewest"],emoji:"🦁"},
   {before:"That was the",blank:"most beautiful",after:"goal of the season!",bank:["most beautiful","beautifulest","more beautiful"],emoji:"✨"},
  ]},
  {type:"build",label:"Build it 2",items:[
   {s:"The Rockets are top of the league.",pl:"Rakiety są na pierwszym miejscu w lidze."},
   {s:"Thunder have got fewer points than the Rockets.",pl:"Grzmot ma mniej punktów niż Rakiety."},
   {s:"Kuba is the tallest player in the team.",pl:"Kuba jest najwyższym zawodnikiem w drużynie."},
   {s:"It was the most exciting match of the year.",pl:"To był najbardziej ekscytujący mecz roku."},
   {s:"Our next fixture is on Saturday.",pl:"Nasz następny mecz jest w sobotę."},
  ]},

  /* ===== PART 6 — TALK LIKE A FAN ===== */
  {type:"dialogue",label:"Fan talk",title:"After the final: Maja and Grandad 🧓⚽",sub:"Maja's grandad watched the whole match. Tap 🔊 to hear one line or ▶ for the whole dialogue. Then read it again with a friend — one of you is Maja!",
   cast:{"Grandad":"👴","Maja":"👧"},lines:[
   ["Grandad","Maja! Come here, champion! What a match!"],
   ["Maja","Grandad! Did you see my goal? Was it good?"],
   ["Grandad","Good? It was brilliant! What a goal! The goalkeeper didn't have a chance."],
   ["Maja","But I was so angry about their second goal. She was miles offside!"],
   ["Grandad","I know! I shouted, 'Come on, ref! Are you blind?' Your mum told me to sit down."],
   ["Maja","And the penalty before half-time — that was never a penalty! Zoe touched the ball first."],
   ["Grandad","Well, it was a bit late. But then Kuba saved it. He's a wall, that boy!"],
   ["Maja","When the shootout started, I couldn't watch. My legs were shaking."],
   ["Grandad","Nerves of steel, that's what you need. And you scored yours! I'm so proud of you."],
   ["Maja","Thanks, Grandad. Now I need a big pizza. Extra time makes you really hungry!"],
  ]},
  {type:"quiz",label:"What do fans say?",tag:"FAN PHRASES",qs:[
   {q:"😍 Your team scores an amazing goal. You shout:",opts:["What a goal!","What a pity!","Come on, ref!"],correct:0},
   {q:"😡 The referee gives a free kick, but you think it was the wrong decision. You shout:",opts:["Come on, ref!","Well done, ref!","What a save!"],correct:0},
   {q:"🚩 The striker was behind all the defenders. You say:",opts:["He was offside!","He was a substitute!","It's half-time!"],correct:0},
   {q:"🤸 The player fell down, but nobody touched him. You say:",opts:["That was a dive!","That was a header!","That was a corner!"],correct:0},
   {q:"🧤 Your goalkeeper stops a very hard shot. You shout:",opts:["What a save!","What a foul!","He's offside!"],correct:0},
   {q:"😬 It's 0–1 at half-time. Your friend is sad. You say:",opts:["Don't worry, it's only half-time!","The match is over!","What a goal!"],correct:0},
   {q:"🤝 The other team played very well and won. You say to their players:",opts:["Well played!","That was never a goal!","You were lucky!"],correct:0},
   {q:"⏱️ It's the 89th minute and it's 1–1. You say:",opts:["We need one more goal!","It's the first half!","Let's have a penalty shootout now!"],correct:0},
  ]},
  {type:"speak",label:"Say it 2",items:[
   {en:"What a goal!",emoji:"🤩",pl:"Co za gol!"},
   {en:"Come on, ref!",emoji:"😡",pl:"No weź, sędzio!"},
   {en:"He was offside!",emoji:"🚩",pl:"Był na spalonym!"},
   {en:"That was never a penalty!",emoji:"🙅",pl:"To w ogóle nie był karny!"},
   {en:"Don't worry, it's only half-time.",emoji:"⏸️",pl:"Nie martw się, to dopiero przerwa."},
   {en:"Well played!",emoji:"🤝",pl:"Dobrze zagrane!"},
   {en:"We're top of the league!",emoji:"🥇",pl:"Jesteśmy na szczycie tabeli!"},
  ]},
  {type:"writing",label:"Write a match report",title:"Write a match report for the school newspaper 📰",sub:"Write about a real match you played or watched — or invent one! (min. 60 words). Use the past simple, linking words and at least five football words.",
   starters:["Last Saturday … played against … .","At the start of the match … .","After ten minutes, … scored a header / a penalty / a great goal.","Just before half-time, the referee gave … .","In the second half, a substitute came on and … .","In the end, … won 2–1. / It was a draw.","The best player was … because …"],min:60},
  {type:"writing",label:"My dream team",title:"My dream team ⭐",sub:"Choose your dream team: real players, friends from school or your family! Who plays in goal, in defence, in midfield and in attack? Who is the captain and who is the coach? Why? (min. 50 words). Compare them!",
   starters:["My goalkeeper is … because he / she is the tallest / the bravest … .","In defence I've got … . She's great at tackles.","My best midfielder is … . He makes better passes than anyone.","The striker is … because she scores the most goals.","The captain is … and the coach is … .","Our team rule is: you must … / you mustn't … ."],min:50},

  /* ===== PART 7 — REVISION GAMES ===== */
  {type:"match",label:"Match: rules",pairs:FB_RULES.slice(0,8)},
  {type:"dictation",label:"Dictation 2",title:"Listen and write ✍️",sub:"Sentences from the whole lesson. Tap 🐢 to hear them slowly.",items:[
   {en:"What a save!"},{en:"The substitute came on in the second half."},{en:"Players have to wear shin pads."},
   {en:"Thunder have got fewer points than the Rockets."},{en:"That was never a penalty!"},{en:"Our next fixture is on Saturday."},
  ]},
  {type:"typed",label:"Translation 2",blocks:[{id:"fb-tr2",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"On jest kapitanem drużyny.",answers:["He is the captain of the team","He's the captain of the team","He is the team captain","He's the team captain"]},
   {prompt:"Rezerwowy wszedł na boisko.",answers:["The substitute came on","The substitute came onto the pitch","The substitute came on the pitch"]},
   {prompt:"Musimy pokonać Lwy.",answers:["We must beat the Lions","We have to beat the Lions","We need to beat the Lions"]},
   {prompt:"Czy strzeliłeś gola?",answers:["Did you score a goal","Did you score"]},
   {prompt:"To był najlepszy mecz sezonu.",answers:["It was the best match of the season","That was the best match of the season","It was the best game of the season","That was the best game of the season"]},
   {prompt:"Jesteśmy na pierwszym miejscu w lidze.",answers:["We're top of the league","We are top of the league","We are at the top of the league","We're at the top of the league","We are first in the league","We're first in the league"]},
  ]}]},
  {type:"wordle",label:"Wordle",words:WL([["pitch","🟩"],["coach","📋"],["cross","⤴️"],["score","🥅"],["foul","⛔"],["draw","🤝"],["save","🧤"],["crowd","👥"]])},
  {type:"wheel",label:"Fortune Wheel",items:FB_ACT.slice(0,10)},

  /* ===== UNIT TEST ===== */
  {type:"unittest",label:"Final test",title:"Football Fever — final test 📝🏆",minutes:12,sections:[
   {name:"Who's who 🏟️",qs:[
    {q:"The person who gives yellow and red cards is the…",opts:["referee","coach","captain"],correct:0},
    {q:"A player who starts on the bench is a…",opts:["substitute","striker","defender"],correct:0},
    {q:"The player who plays in the middle of the pitch is a…",opts:["midfielder","goalkeeper","fan"],correct:0},
    {q:"All the people watching in the stadium are the…",opts:["crowd","kit","bench"],correct:0},
    {type:"type",q:"🧤 The player who can use their hands: the g__________",answers:["goalkeeper","goalie","keeper"]},
   ]},
   {name:"Actions ⚡",qs:[
    {q:"He jumped and scored with a…",opts:["header","tackle","save"],correct:0},
    {q:"She won the ball with a great…",opts:["tackle","penalty","fixture"],correct:0},
    {q:"He fell down to trick the referee. He…",opts:["dived","saved","crossed"],correct:0},
    {q:"The goalkeeper made a brilliant…",opts:["save","foul","dive"],correct:0},
    {type:"type",q:"🏃⚽ She ran past three players with the ball. She d_______d past them.",answers:["dribbled"]},
   ]},
   {name:"Rules & results 🟨",qs:[
    {q:"A foul inside the penalty area = a…",opts:["penalty","corner","throw-in"],correct:0},
    {q:"The score is 1–1. It's a…",opts:["draw","win","defeat"],correct:0},
    {q:"Two yellow cards = a…",opts:["red card","trophy","free kick"],correct:0},
    {q:"The list of teams and their points is the…",opts:["league table","fixture","bench"],correct:0},
    {type:"type",q:"🚫🏃 The striker was behind all the defenders. He was o______.",answers:["offside","off-side"]},
   ]},
   {name:"must / have to 📜",qs:[
    {q:"You ___ touch the ball with your hands.",opts:["mustn't","don't have to","have to"],correct:0},
    {q:"Players ___ wear shin pads.",opts:["have to","don't have to","mustn't"],correct:0},
    {q:"Substitutes ___ play the whole match.",opts:["don't have to","mustn't","has to"],correct:0},
    {q:"The goalkeeper ___ wear a different colour.",opts:["has to","have to","must to"],correct:0},
    {type:"type",q:"Teams are ______ to make five substitutions. (allow)",answers:["allowed"]},
   ]},
   {name:"Past simple 📰",qs:[
    {type:"type",q:"Last week we ___ the match 2–0. (win)",answers:["won"]},
    {type:"type",q:"Kuba ___ the ball with both hands. (catch)",answers:["caught"]},
    {type:"type",q:"The referee ___ a penalty. (give)",answers:["gave"]},
    {q:"We didn't ___ the final.",opts:["lose","lost","losed"],correct:0},
    {q:"___ Leo score a header?",opts:["Did","Does","Was"],correct:0},
   ]},
   {name:"Comparing 📊",qs:[
    {q:"Maja is ___ than Olek.",opts:["faster","more fast","fastest"],correct:0},
    {q:"The Rockets are the ___ team in the league.",opts:["best","better","goodest"],correct:0},
    {q:"Thunder have got fewer points ___ the Rockets.",opts:["than","that","as"],correct:0},
    {q:"That was the ___ exciting match of the year.",opts:["most","more","much"],correct:0},
    {type:"type",q:"The Pirates are at the b_____ of the league.",answers:["bottom"]},
   ]},
   {name:"Listening 🎧",qs:[
    {say:"The referee showed him a red card, so he had to leave the pitch after only twenty minutes.",q:"What happened to the player?",opts:["He got a red card and left the pitch.","He got injured after twenty minutes.","He scored after twenty minutes."],correct:0},
    {say:"It was nil–nil after ninety minutes and nil–nil after extra time, so we had a penalty shootout. We won five–four.",q:"How did the team win?",opts:["On penalties, 5–4","In extra time, 1–0","After 90 minutes, 5–4"],correct:0},
    {say:"Our next fixture is against Lakeside Lions on Sunday at eleven o'clock. You don't have to bring a ball, but you must bring your kit.",q:"What must the players bring?",opts:["Their kit","A ball","Nothing"],correct:0},
    {say:"Kuba isn't as fast as Zoe, but he's the tallest player, so he's the best goalkeeper.",q:"Who is faster?",opts:["Zoe","Kuba","They are the same."],correct:0},
   ]},
  ]},
 ]};


/* ---------- B1 extras: phrasal verbs & idioms, a VAR opinion article ---------- */
const FB_IDIOMS=V([
 ["send off","wyrzucić z boiska (czerwoną kartką)","🟥👉"],["kick off","rozpocząć (mecz)","▶️⚽"],["knock out","wyeliminować (z turnieju)","🥊"],["warm up","rozgrzewać się","🔥🏃"],
 ["take on","zmierzyć się z (rywalem)","⚔️"],["equalise","wyrównać (wynik)","⚖️"],["score an own goal","strzelić samobója / zaszkodzić sobie","🙈"],["a game of two halves","mecz, który zmienił się po przerwie","🌓"],
 ["move the goalposts","zmieniać zasady w trakcie","🥅↔️"],["be on the ball","być bystrym, czujnym","🧠"],["a level playing field","równe szanse dla wszystkich","⚖️🟩"],["back of the net","gol! (piłka w siatce)","🎉🥅"],
]);
const FB_B1=[
  {type:"cards",label:"Phrasal verbs & idioms",title:"Talk like a football pundit 🎙️",cards:FB_IDIOMS},
  {type:"match",label:"Match: idioms",pairs:FB_IDIOMS.slice(0,10)},
  {type:"quiz",label:"What does it mean?",tag:"IDIOMS",qs:[
   {q:"⚽ 'The referee sent him off.' The player…",opts:["had to leave the pitch after a red card","went home at half-time","was a substitute"],correct:0},
   {q:"⚽ 'We were knocked out in the semi-final.' We…",opts:["lost and left the competition","won the semi-final","were injured"],correct:0},
   {q:"💼 'Changing the deadline again? You keep moving the goalposts!' You…",opts:["keep changing the rules","are very good at football","work too slowly"],correct:0},
   {q:"🧠 'Our new teacher is really on the ball.' She is…",opts:["quick and clever","very sporty","always late"],correct:0},
   {q:"🙈 'Arguing with the judge was a real own goal.' It was…",opts:["something that hurt himself","a brave decision","a lucky moment"],correct:0},
   {q:"🌓 'It was a game of two halves.' The match…",opts:["changed a lot after half-time","lasted only half an hour","had two referees"],correct:0},
   {q:"⚖️ 'Every school should get the same money — a level playing field.' Everyone should…",opts:["have equal chances","play on grass","win the same number of games"],correct:0},
   {q:"⚔️ 'On Saturday we take on the league leaders.' We…",opts:["play against them","watch them on TV","join their team"],correct:0},
  ]},
  {type:"fill",label:"Use them",tag:"PHRASAL VERBS",items:[
   {before:"The match will",blank:"kick off",after:"at 3 o'clock.",bank:["kick off","send off","warm up"],emoji:"▶️"},
   {before:"After his second yellow card, the referee",blank:"sent him off",after:".",bank:["sent him off","took him on","warmed him up"],emoji:"🟥"},
   {before:"Players always",blank:"warm up",after:"for twenty minutes before a match.",bank:["warm up","knock out","kick off"],emoji:"🔥"},
   {before:"We were 1–0 down, but Leo",blank:"equalised",after:"in the 80th minute.",bank:["equalised","knocked out","sent off"],emoji:"⚖️"},
   {before:"Thunder were",blank:"knocked out",after:"of the cup by a small village team!",bank:["knocked out","kicked off","warmed up"],emoji:"🥊"},
   {before:"Next week we",blank:"take on",after:"the best team in the country.",bank:["take on","send off","move"],emoji:"⚔️"},
  ]},
  {type:"reading",label:"Read: VAR",title:"Opinion: Is VAR killing the beautiful game? 📺⚖️",paras:[
   "<b>VAR</b> (the Video Assistant Referee) arrived in top-level football a few years ago. A team of officials watches the match on screens and helps the referee with big decisions: goals, penalties, red cards and offside. Supporters of VAR say it has made the game <b>fairer</b>. Its critics say it has <b>taken the joy out of</b> football. So who is right?",
   "<b>On the one hand</b>, it is clear that referees make mistakes. They have to decide in less than a second, often from the wrong angle, while forty thousand fans are shouting at them. Before VAR, famous World Cup matches were decided by handballs that the referee simply didn't see. <b>In my opinion</b>, it is only fair to use technology when millions of people can see the mistake on TV at home.",
   "<b>On the other hand</b>, VAR has created new problems. Fans in the stadium often have no idea what is happening while the officials study the replays for three or four minutes. <b>What is more</b>, players are now sometimes given offside by just a few centimetres — a toenail or a shoulder. Many people feel that this is not what the offside rule was invented for.",
   "There is also the question of <b>celebrations</b>. A goal used to be a moment of pure happiness. Now many fans wait before they celebrate, just in case VAR takes the goal away. <b>Some people argue that</b> this waiting kills the emotion that makes football special.",
   "<b>To sum up</b>, I believe VAR should stay, but it needs to be faster and clearer. Decisions should be shown on the big screen and explained to the crowd, as they are in rugby. <b>After all</b>, technology should help the referee — not become the star of the show.",
  ]},
  {type:"tf",label:"VAR check",title:"True, False or Not given?",sub:"Read the opinion article again.",tag:"READING · B1",labels:TF3,items:[
   {text:"VAR officials watch the match on screens.",answer:0},
   {text:"VAR helps with every throw-in and corner.",answer:1},
   {text:"The writer thinks referees often decide from the wrong angle.",answer:0},
   {text:"VAR checks usually take less than ten seconds.",answer:1},
   {text:"Some players have been offside by only a few centimetres.",answer:0},
   {text:"The writer wants to stop using VAR.",answer:1},
   {text:"VAR was first used in a Women's World Cup.",answer:2},
   {text:"The writer thinks fans should see the decisions on the big screen.",answer:0},
  ]},
  {type:"quiz",label:"Opinion language",tag:"LINKING WORDS",qs:[
   {q:"Which phrase gives the OTHER side of an argument?",opts:["On the other hand,","What is more,","For example,"],correct:0},
   {q:"Which phrase ADDS another point?",opts:["What is more,","However,","To sum up,"],correct:0},
   {q:"Which phrase starts the CONCLUSION?",opts:["To sum up,","On the one hand,","Firstly,"],correct:0},
   {q:"'___, I think VAR makes the game fairer.'",opts:["In my opinion","In my opinion of","For my opinion"],correct:0},
   {q:"'Some people argue ___ VAR kills the emotion.'",opts:["that","what","about"],correct:0},
  ]},
  {type:"writing",label:"Your opinion",title:"For or against? Write your opinion ✍️",sub:"Choose ONE topic: 'VAR is good for football', 'Footballers earn too much money' or 'Girls and boys should play in the same school team'. Write 100–140 words: give your opinion, two reasons, the other side, and a conclusion.",
   starters:["In my opinion, …","On the one hand, … . On the other hand, …","What is more, …","Some people argue that … , but I believe …","For example, …","To sum up, …"],min:100},
];

/* ---------- three versions: Kids A2 (full), Teens & Adults A2, Teens & Adults B1 ---------- */
(function(){
 const cp=x=>JSON.parse(JSON.stringify(x));
 const base=FB_LESSON.zones;
 const reid=(zs,suf)=>{zs.forEach(z=>{if(z.blocks)z.blocks.forEach(b=>b.id=b.id+'-'+suf);});return zs;};
 const kids=reid(cp(base),'k');
 const adA2=reid(cp(base).filter(z=>z.type!=='move'&&z.type!=='balloon'),'a2');
 let adB1=cp(base).filter(z=>!['move','balloon','memory'].includes(z.type)&&z.label!=='Find it'&&z.label!=='Whack-a-Leo'&&z.label!=='Spell it');
 const at=adB1.findIndex(z=>z.label==='Match: rules');
 adB1.splice(at,0,...cp(FB_B1));
 const t=adB1.find(z=>z.type==='unittest');t.minutes=15;
 t.sections.splice(t.sections.length-1,0,{name:"Idioms & phrasal verbs 🎙️",qs:[
  {q:"The referee ___ him off after a bad foul.",opts:["sent","kicked","took"],correct:0},
  {q:"The final kicks ___ at 8 p.m.",opts:["off","out","on"],correct:0},
  {q:"We were knocked ___ of the cup.",opts:["out","off","up"],correct:0},
  {q:"'Our coach is really on the ball' = he is…",opts:["quick and clever","a good player","angry"],correct:0},
  {q:"'___ the other hand, VAR is very slow.'",opts:["On","In","At"],correct:0},
  {type:"type",q:"🔥 Before the match, the players w___ up.",answers:["warm","warmed"]},
 ]});
 adB1=reid(adB1,'b1');
 const mk=(id,track,level,zones,intro)=>({id:"fbx-"+id,level,track,extra:true,topic:"Extra",title:"Football Fever",emoji:"⚽",badge:"Football Star",
  sub:"An extra lesson for football fans — do it any time, it doesn't block the course.",
  lessons:[{id:"fbx-"+id+"-l1",title:"Football Fever",emoji:"⚽",intro,bonus:FB_ALL,zones}]});
 COURSE.units.push(
  mk("kids-a2","kids","A2",kids,FB_LESSON.intro),
  mk("adults-a2","adults","A2",adA2,"Football words beyond 'goal': referee, substitute, header, tackle, offside, penalty, fixture, league table. The rules with must / have to / allowed to, a cup final in the past simple, a league table and fan phrases."),
  mk("adults-b1","adults","B1",adB1,"Football English at B1: the referee, offside and the league table, rules with must / have to / allowed to, a cup final in the past simple, phrasal verbs and idioms (send off, knock out, move the goalposts) and an opinion article about VAR.")
 );
})();
