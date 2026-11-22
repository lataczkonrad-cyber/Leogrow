/* =====================================================================
   MORE TOPICS (round 2) — KIDS A1 / A2 + TEENS & ADULTS A0
   ===================================================================== */

/* ================= KIDS A1 · My Town ================= */
mkUnit({id:"kd1",level:"A1",track:"kids",topic:"Town",title:"My Town",emoji:"🏘️",badge:"Town Explorer",sub:"Places in town and ways to travel — and 'I can / I can't'.",
 sets:[
  {title:"Places in town",label:"Places",words:V([
   ["park","park","🌳"],["shop","sklep","🏪"],["school","szkoła","🏫"],["hospital","szpital","🏥"],["library","biblioteka","📚"],["cinema","kino","🎬"],
   ["zoo","zoo","🦁"],["playground","plac zabaw","🛝"],["swimming pool","basen","🏊"],["bakery","piekarnia","🥐"],["bank","bank","🏦"],["street","ulica","🛣️"]])},
  {title:"Getting around",label:"Transport",findTitle:"How do they go? 🔎",words:V([
   ["car","samochód","🚗"],["bus","autobus","🚌"],["bike","rower","🚲"],["train","pociąg","🚆"],["taxi","taksówka","🚕"],["tram","tramwaj","🚋"],
   ["scooter","hulajnoga","🛴"],["plane","samolot","✈️"],["boat","łódź","⛵"],["on foot","pieszo","🚶"],["traffic lights","światła drogowe","🚦"],["bridge","most","🌉"]])},
 ],
 l1:{title:"Walk around town",emoji:"🗺️",intro:"Park, shop, school, zoo… twelve places in your town!",quizTag:"WHERE IS IT?",quizLabel:"Where is it?",quiz:[
   {q:"You see a film at the…",opts:["cinema","bank","bakery"],correct:0},{q:"You read books at the…",opts:["library","swimming pool","zoo"],correct:0},
   {q:"Doctors work at the…",opts:["hospital","playground","shop"],correct:0},{q:"You see lions and monkeys at the…",opts:["zoo","school","bank"],correct:0},
   {q:"You buy bread at the…",opts:["bakery","cinema","library"],correct:0},{q:"You swim at the…",opts:["swimming pool","park","hospital"],correct:0},
   {q:"You play on the swings at the…",opts:["playground","bank","bakery"],correct:0},{q:"You learn and have lessons at…",opts:["school","the zoo","the cinema"],correct:0},
  ],
  odd:[
   {opts:["park","zoo","playground","car"],odd:3,why:"A car isn't a place."},
   {opts:["shop","bakery","bank","bike"],odd:3,why:"A bike isn't a building."},
   {opts:["cinema","library","school","street"],odd:3,why:"A street isn't a building."},
   {opts:["hospital","school","cinema","tram"],odd:3,why:"A tram is transport."},
  ],
  move:[
   {emoji:"🏊",text:"Swim like a fish at the swimming pool! 🏊"},{emoji:"🛝",text:"Go down the slide — wheee! 🛝"},
   {emoji:"🦁",text:"Roar like a lion at the zoo! 🦁"},{emoji:"🎬",text:"Eat popcorn at the cinema — crunch! 🍿"},
  ],
  wordle:[["park","🌳"],["zoo","🦁"],["shop","🏪"],["bank","🏦"]]},
 l2:{title:"Beep beep!",emoji:"🚌",intro:"Car, bus, bike, train… how do you go to school?",fillTag:"TRANSPORT",fill:[
   {before:"I ride my",blank:"bike",after:"in the park.",bank:["bike","plane","boat"],emoji:"🚲"},
   {before:"The",blank:"bus",after:"is big and yellow.",bank:["bus","scooter","bike"],emoji:"🚌"},
   {before:"A",blank:"plane",after:"flies in the sky.",bank:["plane","train","tram"],emoji:"✈️"},
   {before:"A",blank:"boat",after:"goes on the water.",bank:["boat","car","bus"],emoji:"⛵"},
   {before:"I walk to school. I go",blank:"on foot",after:".",bank:["on foot","by plane","by boat"],emoji:"🚶"},
   {before:"Red light! Stop at the",blank:"traffic lights",after:".",bank:["traffic lights","bridge","bakery"],emoji:"🚦"},
   {before:"The",blank:"train",after:"goes very fast.",bank:["train","scooter","bike"],emoji:"🚆"},
   {before:"We walk over the",blank:"bridge",after:".",bank:["bridge","tram","taxi"],emoji:"🌉"},
  ],
  tf:{sub:"Look and think! 🚲🚌✈️⛵",tag:"TRUE OR FALSE?",items:[
   {text:"A plane can fly.",answer:0},{text:"A boat goes on the road.",answer:1},{text:"A bike has got two wheels.",answer:0},
   {text:"A bus is very small.",answer:1},{text:"A train goes on tracks.",answer:0},{text:"You can swim at the library.",answer:1}]},
  listen:[
   {word:"I go to school by bus.",options:["I go to school by bus.","I go to school by bike.","I go to school by boat."],correct:0},
   {word:"The cinema is in my street.",options:["The cinema is in my street.","The school is in my street.","The cinema is in my house."],correct:0},
   {word:"Stop at the traffic lights!",options:["Stop at the traffic lights!","Stop at the bakery!","Stop at the bus stop!"],correct:0},
  ],
  move:[
   {emoji:"🚗",text:"Drive a car — turn the wheel! 🚗"},{emoji:"✈️",text:"Be a plane — arms out and fly! ✈️"},
   {emoji:"🚲",text:"Ride a bike — pedal fast! 🚲"},{emoji:"🚦",text:"Red — stop! Green — go! Play traffic lights! 🚦"},
  ],
  wordle:[["bike","🚲"],["train","🚆"],["boat","⛵"],["taxi","🚕"],["plane","✈️"]]},
 grammar:{title:"I can ride a bike!",emoji:"🚲",label:"can / can't",intro:"I can ride a bike. I can't fly a plane. Can you swim? Yes, I can!",boxTitle:"can / can't",
  html:`<p>Use <b>can</b> for things you are able to do. Use <b>can't</b> for things you aren't able to do.</p>${TBL(["✅ Yes","❌ No","❓ Question"],[["I <b>can</b> swim.","I <b>can't</b> fly.","<b>Can</b> you swim?"],["She <b>can</b> ride a bike.","He <b>can't</b> drive a car.","<b>Can</b> he skate?"]])}<p style="margin-top:12px;">Short answers: <b>Yes, I can.</b> / <b>No, I can't.</b></p><p style="margin-top:8px;">❗ Always the same: he <b>can</b> (not 'cans'), can <b>swim</b> (not 'can swims').</p>`,
  quizTag:"CAN OR CAN'T?",quiz:[
   {q:"A fish ___ swim.",opts:["can","can't"],correct:0},{q:"A cat ___ fly.",opts:["can't","can"],correct:0},
   {q:"I'm 8. I ___ drive a car.",opts:["can't","can"],correct:0},{q:"___ you ride a bike?",opts:["Can","Do"],correct:0},
   {q:"Can you swim? — Yes, I ___.",opts:["can","do","am"],correct:0},{q:"She can ___ very well.",opts:["dance","dances"],correct:0},
   {q:"A bird ___ fly.",opts:["can","can't"],correct:0},{q:"Can he skate? — No, he ___.",opts:["can't","isn't","don't"],correct:0},
  ],
  fill:[
   {before:"I",blank:"can",after:"ride a scooter. ✅",bank:["can","can't"],emoji:"🛴"},
   {before:"A dog",blank:"can't",after:"drive a bus! ❌",bank:["can't","can"],emoji:"🐶"},
   {before:"",blank:"Can",after:"you swim?",bank:["Can","Do"],emoji:"🏊"},
   {before:"Yes, I",blank:"can",after:"!",bank:["can","do","am"],emoji:"✅"},
   {before:"My baby brother can't",blank:"walk",after:".",bank:["walk","walks"],emoji:"👶"},
   {before:"Leo",blank:"can",after:"climb trees. ✅",bank:["can","cans"],emoji:"🌳"},
   {before:"No, she",blank:"can't",after:".",bank:["can't","isn't","doesn't"],emoji:"❌"},
   {before:"Birds can",blank:"fly",after:".",bank:["fly","flies"],emoji:"🐦"},
  ],
  build:[
   {s:"I can ride a bike.",pl:"Umiem jeździć na rowerze."},{s:"I can't fly a plane.",pl:"Nie umiem latać samolotem."},
   {s:"Can you swim?",pl:"Czy umiesz pływać?"},{s:"Yes, I can.",pl:"Tak, umiem."},{s:"She can't drive a car.",pl:"Ona nie umie prowadzić samochodu."},
  ],
  errors:[
   {s:"She cans swim.",wrong:1,ok:"She can swim."},
   {s:"I can rides a bike.",wrong:2,ok:"I can ride a bike."},
   {s:"Do you can skate?",wrong:0,ok:"Can you skate?"},
   {s:"Can you swim? Yes, I do.",wrong:5,ok:"Can you swim? Yes, I can."},
   {s:"A fish can walk.",wrong:3,ok:"A fish can swim."},
  ],
  whack:[
   {q:"A bird ___ fly 🐦",opts:["can","can't"],correct:0},{q:"A fish ___ walk 🐟",opts:["can't","can"],correct:0},
   {q:"___ you skate?",opts:["Can","Do"],correct:0},{q:"he ___ swim",opts:["can","cans"],correct:0},
   {q:"Yes, I ___!",opts:["can","do"],correct:0},
  ],
  wordle:[["can","✅"],["swim","🏊"],["ride","🚲"],["fly","🐦"]]},
 reading:{title:"Leo's town",emoji:"🏙️",intro:"Read about Leo's trip around his town, then answer, translate and write about your town!",storyTitle:"A Day in Town",paras:[
   "<b>A Day in Town</b> 🏙️",
   "Leo lives in a small town. There is a park, a school, a library and a big zoo. Leo loves his town!",
   "On Saturday Leo and Mia go to town by bus. First they go to the bakery. They buy two big buns. Yum!",
   "Then they go to the library. Mia can read very well. Leo can't read big books — he likes books with pictures.",
   "In the afternoon they go to the swimming pool. Leo can't swim, but Mia can. 'I can teach you!' says Mia. At the end of the day Leo can swim a little. 'I can swim! I can swim!' he shouts. 🏊",
  ],
  tf:[
   {text:"Leo lives in a small town.",answer:0},{text:"They go to town by car.",answer:1},{text:"They buy buns at the bakery.",answer:0},
   {text:"Mia can read very well.",answer:0},{text:"Leo likes books with pictures.",answer:0},{text:"The swimming pool is next to the zoo.",answer:2},{text:"At the end Leo can't swim at all.",answer:1}],
  quiz:[
   {q:"What day is it?",opts:["Saturday","Monday","Friday"],correct:0},
   {q:"How do they go to town?",opts:["By bus","By bike","On foot"],correct:0},
   {q:"Where do they go first?",opts:["The bakery","The zoo","The library"],correct:0},
   {q:"What books does Leo like?",opts:["Books with pictures","Big books","No books"],correct:0},
   {q:"Who teaches Leo to swim?",opts:["Mia","His mum","A teacher"],correct:0},
  ],
  typed:[
   {prompt:"Umiem pływać.",answers:["I can swim"]},
   {prompt:"Nie umiem jeździć na rowerze.",answers:["I can't ride a bike","I cannot ride a bike"]},
   {prompt:"Czy umiesz czytać?",answers:["Can you read"]},
   {prompt:"Jadę do szkoły autobusem.",answers:["I go to school by bus"]},
  ],
  writing:{label:"My town",title:"My town ✍️",sub:"Write about your town and what you can do there (min. 25 words).",starters:["In my town there is…","There are…","I can … at the…","I go to school by…","My favourite place is…"],min:25},
  wordle:[["buns","🥐"],["books","📚"],["town","🏘️"],["teach","👩‍🏫"]]},
 test:{grammar:[
   {q:"A horse ___ run fast.",opts:["can","can't"],correct:0},{q:"A tree ___ walk.",opts:["can't","can"],correct:0},
   {q:"___ you skate?",opts:["Can","Do"],correct:0},{q:"Can she dance? — Yes, she ___.",opts:["can","does","is"],correct:0},
   {q:"🏥 =",opts:["hospital","school","bank"],correct:0},{q:"🚋 =",opts:["tram","train","taxi"],correct:0},
   {q:"🥐 You buy bread at the…",opts:["bakery","library","cinema"],correct:0},{q:"🛴 =",opts:["scooter","bike","car"],correct:0}],
  errors:[
   {s:"He can swims.",wrong:2,ok:"He can swim."},
   {s:"Can you fly? No, I don't.",wrong:5,ok:"Can you fly? No, I can't."},
   {s:"I go to school by foot.",wrong:4,ok:"I go to school on foot."},
   {s:"A plane goes on the water.",wrong:5,ok:"A plane goes in the sky."}],
  typed:[
   {prompt:"Ptaki umieją latać.",answers:["Birds can fly"]},
   {prompt:"Ona nie umie pływać.",answers:["She can't swim","She cannot swim"]},
   {prompt:"Tak, umiem.",answers:["Yes, I can","Yes I can"]},
   {prompt:"W moim mieście jest park.",answers:["There is a park in my town","There's a park in my town","In my town there is a park","In my town there's a park"]}]},
});

/* ================= KIDS A1 · Toys & Games ================= */
mkUnit({id:"ke1",level:"A1",track:"kids",topic:"Toys",title:"Toys & Games",emoji:"🧸",badge:"Toy Box Hero",sub:"Toys, games and playing together — and 'Whose is it? It's Tom's!'.",
 sets:[
  {title:"My toys",label:"Toys",words:V([
   ["teddy bear","miś","🧸"],["doll","lalka","🪆"],["ball","piłka","⚽"],["kite","latawiec","🪁"],["robot","robot","🤖"],["puzzle","puzzle, układanka","🧩"],
   ["car","samochodzik","🏎️"],["train set","kolejka","🚂"],["blocks","klocki","🧱"],["yo-yo","jo-jo","🪀"],["balloon","balon","🎈"],["drum","bęben","🥁"]])},
  {title:"Let's play!",label:"Games",findTitle:"Which game is it? 🔎",words:V([
   ["hide-and-seek","chowany","🙈"],["tag","berek","🏃"],["board game","gra planszowa","🎲"],["cards","karty","🃏"],["video game","gra wideo","🎮"],["skipping rope","skakanka","🪢"],
   ["win","wygrywać","🏆"],["lose","przegrywać","😞"],["my turn","moja kolej","👆"],["share","dzielić się","🤲"],["team","drużyna","👫"],["fun","zabawa, zabawny","🥳"]])},
 ],
 l1:{title:"My toy box",emoji:"📦",intro:"Teddy bears, dolls, kites and robots — twelve toys to play with!",quizTag:"WHICH TOY?",quizLabel:"Which toy?",quiz:[
   {q:"It flies in the wind:",opts:["kite","drum","doll"],correct:0},{q:"You kick it:",opts:["ball","puzzle","robot"],correct:0},
   {q:"It's soft and you hug it:",opts:["teddy bear","drum","blocks"],correct:0},{q:"You build a tower with them:",opts:["blocks","kite","balloon"],correct:0},
   {q:"You hit it — boom boom!",opts:["drum","doll","yo-yo"],correct:0},{q:"It goes up and down on a string:",opts:["yo-yo","train set","ball"],correct:0},
   {q:"It's got lots of small pieces:",opts:["puzzle","balloon","kite"],correct:0},{q:"It's made of metal and says 'beep beep':",opts:["robot","teddy bear","doll"],correct:0},
  ],
  odd:[
   {opts:["doll","teddy bear","robot","apple"],odd:3,why:"An apple isn't a toy."},
   {opts:["ball","balloon","yo-yo","blocks"],odd:3,why:"Blocks aren't round."},
   {opts:["kite","balloon","plane","drum"],odd:3,why:"A drum can't fly."},
   {opts:["puzzle","cards","board game","kite"],odd:3,why:"You play the others at a table."},
  ],
  move:[
   {emoji:"🪁",text:"Run and fly a kite! 🪁"},{emoji:"🤖",text:"Walk like a robot — beep, beep! 🤖"},
   {emoji:"🥁",text:"Play the drum — boom, boom, boom! 🥁"},{emoji:"🧸",text:"Give your teddy bear a big hug! 🧸"},
  ],
  wordle:[["doll","🪆"],["ball","⚽"],["kite","🪁"],["robot","🤖"]]},
 l2:{title:"Game time",emoji:"🎲",intro:"Hide-and-seek, tag, cards and board games — let's play together!",fillTag:"LET'S PLAY",fill:[
   {before:"Close your eyes and count to ten. It's",blank:"hide-and-seek",after:"!",bank:["hide-and-seek","cards","tag"],emoji:"🙈"},
   {before:"Run! You're it! Let's play",blank:"tag",after:".",bank:["tag","cards","puzzle"],emoji:"🏃"},
   {before:"Throw the dice. It's a",blank:"board game",after:".",bank:["board game","kite","drum"],emoji:"🎲"},
   {before:"Yay! I",blank:"win",after:"!",bank:["win","lose","share"],emoji:"🏆"},
   {before:"Oh no, I",blank:"lose",after:"again.",bank:["lose","win","share"],emoji:"😞"},
   {before:"You've had a go. Now it's",blank:"my turn",after:"!",bank:["my turn","a team","fun"],emoji:"👆"},
   {before:"Please",blank:"share",after:"your toys with your sister.",bank:["share","lose","win"],emoji:"🤲"},
   {before:"Playing with friends is",blank:"fun",after:"!",bank:["fun","lose","team"],emoji:"🥳"},
  ],
  tf:{sub:"Look and think! 🙈🎲🃏🎮",tag:"TRUE OR FALSE?",items:[
   {text:"In hide-and-seek you close your eyes and count.",answer:0},{text:"You play cards in the swimming pool.",answer:1},{text:"A board game has got dice.",answer:0},
   {text:"You play a video game on a TV or computer.",answer:0},{text:"In tag you sit and sleep.",answer:1},{text:"Sharing is bad.",answer:1}]},
  listen:[
   {word:"It's my turn!",options:["It's my turn!","It's your turn!","It's my toy!"],correct:0},
   {word:"Let's play hide-and-seek.",options:["Let's play hide-and-seek.","Let's play tag.","Let's play cards."],correct:0},
   {word:"I win!",options:["I win!","I lose!","I swim!"],correct:0},
  ],
  move:[
   {emoji:"🙈",text:"Cover your eyes and count to ten! 🙈"},{emoji:"🪢",text:"Jump with a skipping rope — 1, 2, 3! 🪢"},
   {emoji:"🏆",text:"You win! Jump and shout 'Yes!' 🏆"},{emoji:"🤲",text:"Share a toy with a friend — pass it! 🤲"},
  ],
  wordle:[["win","🏆"],["lose","😞"],["cards","🃏"],["team","👫"],["share","🤲"]]},
 grammar:{title:"Whose is it?",emoji:"❓",label:"whose · 's",intro:"Whose ball is this? It's Tom's! Whose dolls are these? They're Mia's!",boxTitle:"whose · 's",
  html:`<p>Ask about the owner with <b>Whose…?</b> Answer with a name + <b>'s</b>.</p>${TBL(["❓ Question","✅ Answer"],[["<b>Whose</b> ball is this?","It's <b>Tom's</b>. It's <b>Tom's</b> ball."],["<b>Whose</b> dolls are these?","They're <b>Mia's</b>."],["<b>Whose</b> is the kite?","It's <b>my sister's</b>."]])}<p style="margin-top:12px;"><b>'s</b> = belongs to: Leo<b>'s</b> robot = the robot of Leo.</p><p style="margin-top:8px;">Two or more people: my <b>parents'</b> car (s + ').</p>`,
  quizTag:"WHOSE IS IT?",quiz:[
   {q:"___ teddy bear is this?",opts:["Whose","Who","What"],correct:0},{q:"It's ___ kite.",opts:["Anna's","Anna","Annas"],correct:0},
   {q:"This is ___ robot.",opts:["Leo's","Leos","Leo"],correct:0},{q:"Whose ___ are these? — They're Tom's.",opts:["cards","card"],correct:0},
   {q:"Whose is the ball? — It's ___.",opts:["Mia's","Mia","Mias"],correct:0},{q:"___ toys are these?",opts:["Whose","Who's","Who"],correct:0},
   {q:"It's my ___ drum.",opts:["brother's","brother","brothers"],correct:0},{q:"That's the ___ train set. (= of the two boys)",opts:["boys'","boy's","boys's"],correct:0},
  ],
  fill:[
   {before:"",blank:"Whose",after:"yo-yo is this?",bank:["Whose","Who","What"],emoji:"🪀"},
   {before:"It's",blank:"Tom's",after:"yo-yo.",bank:["Tom's","Tom","Toms"],emoji:"👦"},
   {before:"These are",blank:"Mia's",after:"blocks.",bank:["Mia's","Mia","Mias"],emoji:"🧱"},
   {before:"Whose",blank:"balloons",after:"are these?",bank:["balloons","balloon"],emoji:"🎈"},
   {before:"The puzzle is my",blank:"sister's",after:".",bank:["sister's","sister","sisters"],emoji:"🧩"},
   {before:"That's",blank:"Leo's",after:"skipping rope.",bank:["Leo's","Leo","Leos"],emoji:"🪢"},
   {before:"",blank:"Whose",after:"is the red car?",bank:["Whose","Who","Where"],emoji:"🏎️"},
   {before:"It's my",blank:"dad's",after:"guitar.",bank:["dad's","dad","dads"],emoji:"🎸"},
  ],
  build:[
   {s:"Whose ball is this?",pl:"Czyja to piłka?"},{s:"It's Tom's ball.",pl:"To piłka Toma."},
   {s:"Whose dolls are these?",pl:"Czyje to lalki?"},{s:"They're Mia's.",pl:"To lalki Mii."},{s:"This is Leo's robot.",pl:"To robot Leo."},
  ],
  errors:[
   {s:"Who ball is this?",wrong:0,ok:"Whose ball is this?"},
   {s:"It's Anna kite.",wrong:1,ok:"It's Anna's kite."},
   {s:"This is Leos robot.",wrong:2,ok:"This is Leo's robot."},
   {s:"Whose cards is these?",wrong:2,ok:"Whose cards are these?"},
   {s:"It's my brothers drum.",wrong:2,ok:"It's my brother's drum."},
  ],
  whack:[
   {q:"___ is it?",opts:["Whose","Who"],correct:0},{q:"It's ___ kite.",opts:["Tom's","Tom"],correct:0},
   {q:"Whose toys ___ these?",opts:["are","is"],correct:0},{q:"Mia___ doll",opts:["'s","s"],correct:0},
   {q:"my ___ car (mum + dad)",opts:["parents'","parent"],correct:0},
  ],
  wordle:[["whose","❓"],["toys","🧸"],["play","🎮"],["mine","👆"]]},
 reading:{title:"The lost teddy",emoji:"🧸",intro:"Read about a lost teddy bear at a party, then answer, translate and write about your favourite toy!",storyTitle:"Whose Teddy Is It?",paras:[
   "<b>Whose Teddy Is It?</b> 🧸",
   "It's Mia's birthday party. There are balloons, a big cake and lots of friends. They play hide-and-seek and tag in the garden. It's fun!",
   "After the party, Mia's mum finds a small brown teddy bear under the sofa. 'Whose teddy is this?' she asks.",
   "'It isn't my teddy,' says Mia. 'My teddy is white.' 'Is it Tom's?' asks Mum. 'No, Tom's teddy is big,' says Mia. 'Is it Ola's?' 'No, Ola hasn't got a teddy. She's got a robot!'",
   "Then the phone rings. It's Leo! 'I can't find my teddy,' he says. 'He's small and brown and his name is Mr Bear.' Mia laughs. 'It's Leo's teddy! Don't worry, Leo — Mr Bear is here!' 🧸",
  ],
  tf:[
   {text:"It's Mia's birthday.",answer:0},{text:"They play cards in the garden.",answer:1},{text:"The teddy is under the sofa.",answer:0},
   {text:"Mia's teddy is brown.",answer:1},{text:"Ola has got a robot.",answer:0},{text:"Tom is seven years old.",answer:2},{text:"The teddy is Leo's.",answer:0}],
  quiz:[
   {q:"What games do they play?",opts:["Hide-and-seek and tag","Cards","Video games"],correct:0},
   {q:"Who finds the teddy?",opts:["Mia's mum","Tom","Leo"],correct:0},
   {q:"What colour is Mia's teddy?",opts:["White","Brown","Pink"],correct:0},
   {q:"What has Ola got?",opts:["A robot","A big teddy","A kite"],correct:0},
   {q:"What is the teddy's name?",opts:["Mr Bear","Teddy","Brownie"],correct:0},
  ],
  typed:[
   {prompt:"Czyja to piłka?",answers:["Whose ball is this","Whose ball is it","Whose is this ball"]},
   {prompt:"To miś Mii.",answers:["It's Mia's teddy","It's Mia's teddy bear","This is Mia's teddy","This is Mia's teddy bear","It is Mia's teddy"]},
   {prompt:"Teraz moja kolej!",answers:["It's my turn now","Now it's my turn","It's my turn","My turn now"]},
   {prompt:"Wygrałem!",answers:["I win","I won"]},
  ],
  writing:{label:"My toy",title:"My favourite toy ✍️",sub:"Write about your favourite toy and a game you like (min. 25 words).",starters:["My favourite toy is…","It's…(colour / big / small)","Its name is…","I play with it…","I like playing… with my friends."],min:25},
  wordle:[["party","🎉"],["sofa","🛋️"],["brown","🟤"],["white","⚪"]]},
 test:{grammar:[
   {q:"___ kite is this?",opts:["Whose","Who","Where"],correct:0},{q:"It's ___ ball.",opts:["Ben's","Ben","Bens"],correct:0},
   {q:"Whose dolls ___ these?",opts:["are","is"],correct:0},{q:"That's my ___ bike.",opts:["sister's","sister","sisters"],correct:0},
   {q:"🪁 =",opts:["kite","balloon","ball"],correct:0},{q:"🧱 =",opts:["blocks","puzzle","cards"],correct:0},
   {q:"🙈 =",opts:["hide-and-seek","tag","board game"],correct:0},{q:"🏆 I ___!",opts:["win","lose","share"],correct:0}],
  errors:[
   {s:"It's Ola robot.",wrong:1,ok:"It's Ola's robot."},
   {s:"Who's teddy is this?",wrong:0,ok:"Whose teddy is this?"},
   {s:"Whose blocks is this?",wrong:2,ok:"Whose blocks are these?"},
   {s:"This is Toms train set.",wrong:2,ok:"This is Tom's train set."}],
  typed:[
   {prompt:"Czyje to zabawki?",answers:["Whose toys are these","Whose toys are those"]},
   {prompt:"To latawiec mojego brata.",answers:["It's my brother's kite","This is my brother's kite","It is my brother's kite"]},
   {prompt:"Podziel się zabawkami.",answers:["Share your toys","Share the toys"]},
   {prompt:"Zagrajmy w berka!",answers:["Let's play tag"]}]},
});

/* ================= KIDS A2 · When I Grow Up ================= */
mkUnit({id:"kd2",level:"A2",track:"kids",topic:"Jobs",title:"When I Grow Up",emoji:"🧑‍🚀",badge:"Dream Big",sub:"Jobs, dreams and the future — 'I want to be…' and 'I will…'.",
 sets:[
  {title:"Cool jobs",label:"Jobs",words:V([
   ["astronaut","astronauta","🧑‍🚀"],["firefighter","strażak","🧑‍🚒"],["police officer","policjant","👮"],["vet","weterynarz","🐶🩺"],["doctor","lekarz","🧑‍⚕️"],["teacher","nauczyciel","🧑‍🏫"],
   ["singer","piosenkarz","🎤"],["footballer","piłkarz","⚽"],["artist","artysta","🎨"],["scientist","naukowiec","🔬"],["baker","piekarz","🥖"],["dancer","tancerz","💃"]])},
  {title:"Big dreams",label:"Dreams",findTitle:"Which word is it? 🔎",words:V([
   ["grow up","dorastać","📏"],["dream","marzenie, marzyć","💭"],["future","przyszłość","🔮"],["famous","sławny","⭐"],["rich","bogaty","💰"],["help","pomagać","🤝"],
   ["travel","podróżować","🌍"],["space","kosmos","🌌"],["invent","wynaleźć","💡"],["brave","odważny","🦁"],["hard-working","pracowity","💪"],["one day","pewnego dnia","📅"]])},
 ],
 l1:{title:"Who am I?",emoji:"🕵️",intro:"Astronaut, firefighter, vet, scientist — twelve cool jobs!",quizTag:"WHAT DO THEY DO?",quizLabel:"What do they do?",quiz:[
   {q:"This person goes into space:",opts:["astronaut","baker","dancer"],correct:0},{q:"This person helps sick animals:",opts:["vet","singer","artist"],correct:0},
   {q:"This person stops fires:",opts:["firefighter","teacher","footballer"],correct:0},{q:"This person makes bread:",opts:["baker","scientist","police officer"],correct:0},
   {q:"This person paints pictures:",opts:["artist","vet","astronaut"],correct:0},{q:"This person works at a school:",opts:["teacher","firefighter","baker"],correct:0},
   {q:"This person does experiments:",opts:["scientist","dancer","singer"],correct:0},{q:"This person plays football in a big stadium:",opts:["footballer","doctor","vet"],correct:0},
  ],
  odd:[
   {opts:["doctor","vet","nurse","baker"],odd:3,why:"A baker doesn't help sick people or animals."},
   {opts:["singer","dancer","artist","police officer"],odd:3,why:"The others are artistic jobs."},
   {opts:["astronaut","rocket","space","bread"],odd:3,why:"Bread isn't about space."},
   {opts:["firefighter","police officer","doctor","footballer"],odd:3,why:"The others help in emergencies."},
  ],
  move:[
   {emoji:"🧑‍🚀",text:"Be an astronaut — float in space! 🧑‍🚀"},{emoji:"🧑‍🚒",text:"Be a firefighter — spray the water! 💦"},
   {emoji:"💃",text:"Be a dancer — spin around! 💃"},{emoji:"🎤",text:"Be a singer — sing 'La la la!' 🎤"},
  ],
  wordle:[["vet","🐶🩺"],["baker","🥖"],["artist","🎨"],["singer","🎤"]]},
 l2:{title:"Dream big",emoji:"💭",intro:"Dreams, the future, travel and space — what will you do one day?",fillTag:"BIG DREAMS",fill:[
   {before:"When I",blank:"grow up",after:", I want to be a vet.",bank:["grow up","invent","travel"],emoji:"📏"},
   {before:"I want to",blank:"travel",after:"around the world.",bank:["travel","grow up","brave"],emoji:"🌍"},
   {before:"Astronauts go into",blank:"space",after:".",bank:["space","future","dream"],emoji:"🌌"},
   {before:"Firefighters are very",blank:"brave",after:".",bank:["brave","rich","famous"],emoji:"🦁"},
   {before:"One day I will",blank:"invent",after:"a flying car!",bank:["invent","grow up","help"],emoji:"💡"},
   {before:"She is a",blank:"famous",after:"singer. Everybody knows her!",bank:["famous","brave","hard-working"],emoji:"⭐"},
   {before:"Doctors",blank:"help",after:"sick people.",bank:["help","travel","dream"],emoji:"🤝"},
   {before:"My",blank:"dream",after:"is to be a footballer.",bank:["dream","space","future"],emoji:"💭"},
  ],
  tf:{sub:"Look and think! 🧑‍🚀🧑‍🚒🐶🩺🎨",tag:"TRUE OR FALSE?",items:[
   {text:"Astronauts go to space.",answer:0},{text:"Vets help sick cars.",answer:1},{text:"Firefighters are brave.",answer:0},
   {text:"Artists paint pictures.",answer:0},{text:"Bakers make bread.",answer:0},{text:"Teachers work in a hospital.",answer:1}]},
  listen:[
   {word:"I want to be a vet.",options:["I want to be a vet.","I want to be a vest.","I want to see a vet."],correct:0},
   {word:"She will travel to space.",options:["She will travel to space.","She will travel to Spain.","She will travel to school."],correct:0},
   {word:"When I grow up…",options:["When I grow up…","When I go up…","When I wake up…"],correct:0},
  ],
  move:[
   {emoji:"📏",text:"Grow up! Start small and stand up tall! 📏"},{emoji:"🦁",text:"Be brave — stand like a superhero! 🦸"},
   {emoji:"🌍",text:"Travel the world — walk on the spot! 🌍"},{emoji:"💡",text:"Invent something — tap your head and say 'Aha!' 💡"},
  ],
  wordle:[["dream","💭"],["space","🌌"],["brave","🦁"],["famous","⭐"],["future","🔮"]]},
 grammar:{title:"I will be a vet!",emoji:"🔮",label:"want to be · will",intro:"I want to be an astronaut. I will fly to the moon! — talk about the future.",boxTitle:"want to be · will",
  html:`<p>Talk about your <b>dreams</b> with <b>want to be</b>:</p>${TBL(["Person","Example"],[["I / you / we / they","I <b>want to be</b> a vet."],["he / she","She <b>wants to be</b> a singer."],["❓","What <b>do</b> you <b>want to be</b>?"]])}<p style="margin-top:12px;">Say what you think will happen with <b>will + verb</b> (same for everyone!):</p>${TBL(["✅","❌"],[["I <b>will</b> (I'll) live in London.","I <b>won't</b> (will not) live in a cave."],["She <b>will</b> help animals.","He <b>won't</b> be a baker."]])}`,
  quizTag:"THE FUTURE",quiz:[
   {q:"I ___ to be a doctor.",opts:["want","wants","will"],correct:0},{q:"She ___ to be a dancer.",opts:["wants","want","is"],correct:0},
   {q:"What do you want to ___?",opts:["be","is","are"],correct:0},{q:"One day I ___ fly to the moon.",opts:["will","want","am"],correct:0},
   {q:"He ___ be a baker. He hates cooking!",opts:["won't","will","wants"],correct:0},{q:"I'll ___ in a big house.",opts:["live","lives","to live"],correct:0},
   {q:"Will you be famous? — Yes, I ___!",opts:["will","do","am"],correct:0},{q:"My brother wants ___ a pilot.",opts:["to be","be","is"],correct:0},
  ],
  fill:[
   {before:"I",blank:"want",after:"to be an artist.",bank:["want","wants","will"],emoji:"🎨"},
   {before:"Tom",blank:"wants",after:"to be a footballer.",bank:["wants","want","is"],emoji:"⚽"},
   {before:"What do you want to",blank:"be",after:"?",bank:["be","is","are"],emoji:"❓"},
   {before:"One day I",blank:"will",after:"travel to Japan.",bank:["will","want","am"],emoji:"🗾"},
   {before:"She",blank:"won't",after:"be a firefighter. She's scared of fire.",bank:["won't","will","wants"],emoji:"🔥"},
   {before:"We'll",blank:"help",after:"animals.",bank:["help","helps","to help"],emoji:"🐾"},
   {before:"Mia wants",blank:"to be",after:"a scientist.",bank:["to be","be","is"],emoji:"🔬"},
   {before:"I think you",blank:"will",after:"be a great teacher!",bank:["will","want","are"],emoji:"🧑‍🏫"},
  ],
  build:[
   {s:"I want to be a vet.",pl:"Chcę być weterynarzem."},{s:"She wants to be a singer.",pl:"Ona chce być piosenkarką."},
   {s:"What do you want to be?",pl:"Kim chcesz być?"},{s:"I will travel around the world.",pl:"Będę podróżować dookoła świata."},{s:"He won't be a baker.",pl:"On nie będzie piekarzem."},
  ],
  errors:[
   {s:"I want be a doctor.",wrong:2,ok:"I want to be a doctor."},
   {s:"She want to be a vet.",wrong:1,ok:"She wants to be a vet."},
   {s:"I will to fly to the moon.",wrong:2,ok:"I will fly to the moon."},
   {s:"He wills be famous.",wrong:1,ok:"He will be famous."},
   {s:"What you want to be?",wrong:0,ok:"What do you want to be?"},
  ],
  whack:[
   {q:"she ___ to be",opts:["wants","want"],correct:0},{q:"I want ___ a vet",opts:["to be","be"],correct:0},
   {q:"I ___ fly!",opts:["will","wills"],correct:0},{q:"will not = ___",opts:["won't","willn't"],correct:0},
   {q:"he will ___",opts:["help","helps"],correct:0},
  ],
  wordle:[["want","💭"],["will","🔮"],["grow","📏"],["help","🤝"]]},
 reading:{title:"Our dream jobs",emoji:"🌟",intro:"Read what four children in Leo's class want to be, then answer, translate and write about your dream job!",storyTitle:"Dream Jobs Day",paras:[
   "<b>Dream Jobs Day</b> 🌟",
   "Today is Dream Jobs Day at Leo's school. Everybody comes to school in costumes!",
   "Mia is wearing a white coat. 'I want to be a scientist,' she says. 'I will invent a robot that cleans my room!'",
   "Tom is wearing a football shirt. 'I want to be a famous footballer. I'll play for Poland!' Ola has got a helmet. 'I want to be an astronaut. One day I'll walk on the moon.'",
   "And Leo? Leo is wearing a big red hat. 'I want to be a firefighter,' he says. 'Firefighters are brave and they help people.' The teacher smiles. 'I think you will all be great!' 🌟",
  ],
  tf:[
   {text:"Everybody comes in costumes.",answer:0},{text:"Mia wants to be a doctor.",answer:1},{text:"Mia will invent a robot.",answer:0},
   {text:"Tom wants to play for Poland.",answer:0},{text:"Ola wants to be a singer.",answer:1},{text:"The teacher wants to be a dancer.",answer:2},{text:"Leo wants to be a firefighter.",answer:0}],
  quiz:[
   {q:"What is Mia wearing?",opts:["A white coat","A helmet","A football shirt"],correct:0},
   {q:"What will Mia's robot do?",opts:["Clean her room","Cook dinner","Play football"],correct:0},
   {q:"What does Ola want to do one day?",opts:["Walk on the moon","Play football","Paint"],correct:0},
   {q:"What is Leo wearing?",opts:["A big red hat","A white coat","A blue shirt"],correct:0},
   {q:"Why does Leo want to be a firefighter?",opts:["They are brave and help people","They are rich","They are famous"],correct:0},
  ],
  typed:[
   {prompt:"Chcę być lekarzem.",answers:["I want to be a doctor"]},
   {prompt:"Ona chce być artystką.",answers:["She wants to be an artist"]},
   {prompt:"Kim chcesz być?",answers:["What do you want to be"]},
   {prompt:"Pewnego dnia polecę na Księżyc.",answers:["One day I will fly to the moon","One day I'll fly to the moon","One day, I'll fly to the moon","One day, I will fly to the moon"]},
  ],
  writing:{label:"My dream",title:"My dream job ✍️",sub:"What do you want to be when you grow up? Why? What will you do? Write (min. 30 words).",starters:["When I grow up, I want to be…","I want to be a … because…","I will…","I won't…","One day I'll…"],min:30},
  wordle:[["coat","🥼"],["moon","🌙"],["helmet","⛑️"],["shirt","👕"]]},
 test:{grammar:[
   {q:"I ___ to be a singer.",opts:["want","wants","will"],correct:0},{q:"He ___ to be a vet.",opts:["wants","want","will"],correct:0},
   {q:"One day we ___ live on Mars!",opts:["will","want","are"],correct:0},{q:"She ___ be a baker. She doesn't like bread.",opts:["won't","will","wants"],correct:0},
   {q:"🧑‍🚒 =",opts:["firefighter","police officer","doctor"],correct:0},{q:"🔬 =",opts:["scientist","artist","teacher"],correct:0},
   {q:"Not scared:",opts:["brave","famous","rich"],correct:0},{q:"🌌 Astronauts go into…",opts:["space","the sea","the future"],correct:0}],
  errors:[
   {s:"I wants to be a pilot.",wrong:1,ok:"I want to be a pilot."},
   {s:"She will travels to Spain.",wrong:2,ok:"She will travel to Spain."},
   {s:"He want to be an artist.",wrong:1,ok:"He wants to be an artist."},
   {s:"I want to is a teacher.",wrong:3,ok:"I want to be a teacher."}],
  typed:[
   {prompt:"On chce być piłkarzem.",answers:["He wants to be a footballer"]},
   {prompt:"Będę pomagać zwierzętom.",answers:["I will help animals","I'll help animals"]},
   {prompt:"Nie będę sławny.",answers:["I won't be famous","I will not be famous"]},
   {prompt:"Strażacy są odważni.",answers:["Firefighters are brave"]}]},
});

/* ================= KIDS A2 · Animals Around the World ================= */
mkUnit({id:"ke2",level:"A2",track:"kids",topic:"Animals",title:"Animals Around the World",emoji:"🌍",badge:"Wildlife Explorer",sub:"Wild animals and where they live — and Past Simple questions: 'Did you see…?'.",
 sets:[
  {title:"Wild animals",label:"Animals",words:V([
   ["elephant","słoń","🐘"],["giraffe","żyrafa","🦒"],["zebra","zebra","🦓"],["kangaroo","kangur","🦘"],["penguin","pingwin","🐧"],["polar bear","niedźwiedź polarny","🐻‍❄️"],
   ["crocodile","krokodyl","🐊"],["camel","wielbłąd","🐫"],["koala","koala","🐨"],["panda","panda","🐼"],["shark","rekin","🦈"],["parrot","papuga","🦜"]])},
  {title:"Where they live",label:"Habitats",findTitle:"Where is it? 🔎",words:V([
   ["jungle","dżungla","🌴"],["desert","pustynia","🏜️"],["ocean","ocean","🌊"],["river","rzeka","🏞️"],["mountain","góra","⛰️"],["ice","lód","🧊"],
   ["forest","las","🌲"],["island","wyspa","🏝️"],["fur","futro, sierść","🧶"],["wings","skrzydła","🪽"],["tail","ogon","〰️"],["dangerous","niebezpieczny","⚠️"]])},
 ],
 l1:{title:"Wild and wonderful",emoji:"🐘",intro:"Elephants, giraffes, penguins and sharks — twelve amazing wild animals!",quizTag:"WHICH ANIMAL?",quizLabel:"Which animal?",quiz:[
   {q:"It's got a very long neck:",opts:["giraffe","penguin","shark"],correct:0},{q:"It's black and white and lives on the ice:",opts:["penguin","zebra","parrot"],correct:0},
   {q:"It jumps and carries its baby in a pocket:",opts:["kangaroo","koala","camel"],correct:0},{q:"It's very big and grey, with a long nose:",opts:["elephant","crocodile","panda"],correct:0},
   {q:"It's got stripes and looks like a horse:",opts:["zebra","giraffe","polar bear"],correct:0},{q:"It lives in the desert and has got humps:",opts:["camel","penguin","shark"],correct:0},
   {q:"It's black and white and eats bamboo:",opts:["panda","zebra","penguin"],correct:0},{q:"It's a colourful bird that can talk:",opts:["parrot","koala","crocodile"],correct:0},
  ],
  odd:[
   {opts:["shark","crocodile","penguin","camel"],odd:3,why:"A camel can't swim well — it lives in the desert."},
   {opts:["koala","kangaroo","panda","parrot"],odd:3,why:"A parrot is a bird."},
   {opts:["zebra","panda","penguin","giraffe"],odd:3,why:"A giraffe isn't black and white."},
   {opts:["elephant","polar bear","camel","parrot"],odd:3,why:"A parrot is small."},
  ],
  move:[
   {emoji:"🦘",text:"Jump like a kangaroo — boing, boing! 🦘"},{emoji:"🐧",text:"Walk like a penguin — waddle, waddle! 🐧"},
   {emoji:"🐘",text:"Swing your long elephant nose! 🐘"},{emoji:"🦒",text:"Stretch up tall like a giraffe! 🦒"},
  ],
  wordle:[["zebra","🦓"],["panda","🐼"],["camel","🐫"],["shark","🦈"]]},
 l2:{title:"Where do they live?",emoji:"🗺️",intro:"Jungle, desert, ocean, ice — where do wild animals live?",fillTag:"HABITATS",fill:[
   {before:"Camels live in the",blank:"desert",after:". It's hot and sandy.",bank:["desert","ocean","ice"],emoji:"🏜️"},
   {before:"Sharks swim in the",blank:"ocean",after:".",bank:["ocean","desert","jungle"],emoji:"🌊"},
   {before:"Parrots and monkeys live in the",blank:"jungle",after:".",bank:["jungle","ice","desert"],emoji:"🌴"},
   {before:"Polar bears live on the",blank:"ice",after:".",bank:["ice","jungle","river"],emoji:"🧊"},
   {before:"Polar bears have got thick white",blank:"fur",after:".",bank:["fur","wings","tail"],emoji:"🧶"},
   {before:"Birds have got",blank:"wings",after:".",bank:["wings","fur","tails"],emoji:"🪽"},
   {before:"Crocodiles are",blank:"dangerous",after:"! Don't swim with them!",bank:["dangerous","island","fur"],emoji:"⚠️"},
   {before:"A kangaroo has got a long, strong",blank:"tail",after:".",bank:["tail","wing","fur"],emoji:"〰️"},
  ],
  tf:{sub:"Look and think! 🐫🏜️ 🐧🧊 🦈🌊",tag:"TRUE OR FALSE?",items:[
   {text:"Camels live in the desert.",answer:0},{text:"Penguins live in the jungle.",answer:1},{text:"Sharks live in the ocean.",answer:0},
   {text:"Parrots have got wings.",answer:0},{text:"Polar bears have got black fur.",answer:1},{text:"Crocodiles are dangerous.",answer:0}]},
  listen:[
   {word:"Did you see the elephant?",options:["Did you see the elephant?","Do you see the elephant?","Did you see the elevator?"],correct:0},
   {word:"Penguins can't fly.",options:["Penguins can't fly.","Penguins can fly.","Pandas can't fly."],correct:0},
   {word:"Camels live in the desert.",options:["Camels live in the desert.","Camels live in the dessert.","Camels live in the forest."],correct:0},
  ],
  move:[
   {emoji:"🦈",text:"Swim like a shark — open your big mouth! 🦈"},{emoji:"🐊",text:"Snap like a crocodile — snap, snap! 🐊"},
   {emoji:"🦜",text:"Flap your wings like a parrot! 🦜"},{emoji:"🐻‍❄️",text:"Brrr! Shiver on the ice like a polar bear! 🧊"},
  ],
  wordle:[["jungle","🌴"],["ocean","🌊"],["desert","🏜️"],["wings","🪽"],["river","🏞️"]]},
 grammar:{title:"Did you see a shark?",emoji:"🦈",label:"Past Simple questions",intro:"Did you see a lion? Yes, I did! Where did you go? — asking about the past.",boxTitle:"Past Simple questions (did)",
  html:`<p>To ask about the past, use <b>Did</b> + person + verb (no -ed!).</p>${TBL(["❓ Question","✅ / ❌ Answer"],[["<b>Did</b> you <b>see</b> a lion?","Yes, I <b>did</b>. / No, I <b>didn't</b>."],["<b>Did</b> she <b>go</b> to the zoo?","Yes, she <b>did</b>."],["<b>Where did</b> you <b>go</b>?","We <b>went</b> to Africa!"],["<b>What did</b> you <b>eat</b>?","I <b>ate</b> a sandwich."]])}<p style="margin-top:12px;">❗ <b>Did</b> you <b>see</b>…? (✗ Did you saw…?)</p><p style="margin-top:8px;">Negative: I <b>didn't see</b> a shark.</p>`,
  quizTag:"DID YOU…?",quiz:[
   {q:"___ you see the giraffes?",opts:["Did","Do","Were"],correct:0},{q:"Did you ___ the penguins?",opts:["see","saw","seeing"],correct:0},
   {q:"Did she go to the zoo? — Yes, she ___.",opts:["did","does","was"],correct:0},{q:"Where ___ you go on holiday?",opts:["did","do","was"],correct:0},
   {q:"Did they swim with sharks? — No, they ___!",opts:["didn't","don't","weren't"],correct:0},{q:"What did you ___ at the zoo?",opts:["see","saw","sees"],correct:0},
   {q:"I ___ see a crocodile.",opts:["didn't","don't","wasn't"],correct:0},{q:"Did the elephant ___ water?",opts:["drink","drank","drinks"],correct:0},
  ],
  fill:[
   {before:"",blank:"Did",after:"you see a koala in Australia?",bank:["Did","Do","Are"],emoji:"🐨"},
   {before:"Yes, I",blank:"did",after:"! It was so cute.",bank:["did","do","was"],emoji:"✅"},
   {before:"Did you",blank:"feed",after:"the camels?",bank:["feed","fed","feeds"],emoji:"🐫"},
   {before:"Where did you",blank:"go",after:"last summer?",bank:["go","went","goes"],emoji:"🗺️"},
   {before:"No, we",blank:"didn't",after:"see any sharks.",bank:["didn't","don't","weren't"],emoji:"🦈"},
   {before:"What did the parrot",blank:"say",after:"?",bank:["say","said","says"],emoji:"🦜"},
   {before:"",blank:"Did",after:"Mia take photos of the pandas?",bank:["Did","Does","Was"],emoji:"📷"},
   {before:"What",blank:"did",after:"you eat in the jungle?",bank:["did","do","were"],emoji:"🍌"},
  ],
  build:[
   {s:"Did you see a lion?",pl:"Czy widziałeś lwa?"},{s:"Yes, I did.",pl:"Tak (widziałem)."},
   {s:"Where did you go?",pl:"Dokąd pojechałeś?"},{s:"I didn't see a shark.",pl:"Nie widziałem rekina."},{s:"What did you eat?",pl:"Co jadłeś?"},
  ],
  errors:[
   {s:"Did you saw the zebras?",wrong:2,ok:"Did you see the zebras?"},
   {s:"Do you go to the zoo yesterday?",wrong:0,ok:"Did you go to the zoo yesterday?"},
   {s:"Did she see it? Yes, she saw.",wrong:6,ok:"Did she see it? Yes, she did."},
   {s:"Where you did go?",wrong:1,ok:"Where did you go?"},
   {s:"I didn't saw a bear.",wrong:2,ok:"I didn't see a bear."},
  ],
  whack:[
   {q:"___ you see it?",opts:["Did","Do"],correct:0},{q:"Did you ___?",opts:["see","saw"],correct:0},
   {q:"Yes, I ___!",opts:["did","saw"],correct:0},{q:"No, I ___.",opts:["didn't","don't"],correct:0},
   {q:"Where ___ you go?",opts:["did","went"],correct:0},
  ],
  wordle:[["did","❓"],["see","👀"],["went","🚶"],["saw","👁️"]]},
 reading:{title:"Leo's big trip",emoji:"✈️",intro:"Read an interview with Leo about his trip around the world, then answer, translate and write about animals you saw!",storyTitle:"Around the World with Leo",paras:[
   "<b>Around the World with Leo</b> ✈️",
   "<b>Mia:</b> Leo, you went on a big trip! Where did you go? <b>Leo:</b> I went to Australia, Africa and the South Pole!",
   "<b>Mia:</b> Did you see kangaroos in Australia? <b>Leo:</b> Yes, I did! I saw a mummy kangaroo with a baby in her pocket. I also saw a koala sleeping in a tree.",
   "<b>Mia:</b> What did you see in Africa? <b>Leo:</b> I saw elephants, giraffes and zebras. I didn't see a lion, but I heard one at night. Roar! It was scary!",
   "<b>Mia:</b> And did you like the South Pole? <b>Leo:</b> Yes, but it was very cold! I saw hundreds of penguins. One penguin took my hat! 🐧",
  ],
  tf:[
   {text:"Leo went to Australia.",answer:0},{text:"Leo saw a koala in a tree.",answer:0},{text:"Leo saw a lion in Africa.",answer:1},
   {text:"Leo heard a lion at night.",answer:0},{text:"The South Pole was hot.",answer:1},{text:"Leo went by boat.",answer:2},{text:"A penguin took Leo's hat.",answer:0}],
  quiz:[
   {q:"Where did Leo go?",opts:["Australia, Africa and the South Pole","Only Africa","Asia and America"],correct:0},
   {q:"What was in the kangaroo's pocket?",opts:["A baby","A koala","A hat"],correct:0},
   {q:"Which animals did Leo see in Africa?",opts:["Elephants, giraffes and zebras","Penguins","Koalas"],correct:0},
   {q:"Why was it scary at night?",opts:["He heard a lion","It was dark and cold","A shark came"],correct:0},
   {q:"What did a penguin take?",opts:["Leo's hat","Leo's camera","Leo's sandwich"],correct:0},
  ],
  typed:[
   {prompt:"Czy widziałeś słonie?",answers:["Did you see the elephants","Did you see elephants","Did you see any elephants"]},
   {prompt:"Tak, widziałem.",answers:["Yes, I did","Yes I did"]},
   {prompt:"Dokąd pojechałeś?",answers:["Where did you go"]},
   {prompt:"Pingwiny żyją na lodzie.",answers:["Penguins live on the ice","Penguins live on ice"]},
  ],
  writing:{label:"My trip",title:"Animals I saw ✍️",sub:"Write about a trip to a zoo or a holiday. Which animals did you see? Write (min. 30 words). Then write two questions with Did…?",starters:["Last summer I went to…","I saw…","I didn't see…","My favourite animal was…","Did you see…?","Did you go…?"],min:30},
  wordle:[["pocket","👝"],["tree","🌳"],["scary","😱"],["cold","🥶"]]},
 test:{grammar:[
   {q:"___ you go to the zoo?",opts:["Did","Do","Was"],correct:0},{q:"Did you ___ a panda?",opts:["see","saw","seen"],correct:0},
   {q:"Did he like it? — Yes, he ___.",opts:["did","liked","does"],correct:0},{q:"I ___ see a shark. Phew!",opts:["didn't","don't","wasn't"],correct:0},
   {q:"🦘 =",opts:["kangaroo","koala","camel"],correct:0},{q:"🐧 lives on the…",opts:["ice","desert","jungle"],correct:0},
   {q:"🏜️ =",opts:["desert","ocean","forest"],correct:0},{q:"Birds have got…",opts:["wings","fur","humps"],correct:0}],
  errors:[
   {s:"Did you went to Africa?",wrong:2,ok:"Did you go to Africa?"},
   {s:"What you did see?",wrong:1,ok:"What did you see?"},
   {s:"Did they see it? No, they don't.",wrong:6,ok:"Did they see it? No, they didn't."},
   {s:"Camels live in the ocean.",wrong:4,ok:"Camels live in the desert."}],
  typed:[
   {prompt:"Czy ona widziała żyrafy?",answers:["Did she see the giraffes","Did she see giraffes","Did she see any giraffes"]},
   {prompt:"Nie, nie widziała.",answers:["No, she didn't","No she didn't","No, she did not"]},
   {prompt:"Co widziałeś w zoo?",answers:["What did you see at the zoo","What did you see in the zoo"]},
   {prompt:"Rekiny są niebezpieczne.",answers:["Sharks are dangerous"]}]},
});

/* ================= ADULTS A0 · Food & Prices ================= */
mkUnit({id:"ad0",level:"A0",track:"adults",topic:"Food & Prices",title:"Food & Prices",emoji:"🛒",badge:"Smart Shopper",sub:"Food, drinks, numbers to 100 and prices — and 'Can I have…?'.",
 sets:[
  {title:"Food & drinks",label:"Food",words:V([
   ["coffee","kawa","☕"],["tea","herbata","🍵"],["water","woda","💧"],["juice","sok","🧃"],["bread","chleb","🍞"],["cheese","ser","🧀"],
   ["egg","jajko","🥚"],["apple","jabłko","🍎"],["chicken","kurczak","🍗"],["salad","sałatka","🥗"],["sandwich","kanapka","🥪"],["cake","ciasto","🍰"]])},
  {title:"Numbers & money",label:"Numbers",findTitle:"Which number is it? 🔎",words:V([
   ["twenty","dwadzieścia","2️⃣0️⃣"],["thirty","trzydzieści","3️⃣0️⃣"],["forty","czterdzieści","4️⃣0️⃣"],["fifty","pięćdziesiąt","5️⃣0️⃣"],["sixty","sześćdziesiąt","6️⃣0️⃣"],["seventy","siedemdziesiąt","7️⃣0️⃣"],
   ["eighty","osiemdziesiąt","8️⃣0️⃣"],["ninety","dziewięćdziesiąt","9️⃣0️⃣"],["a hundred","sto","💯"],["price","cena","🏷️"],["cheap","tani","👍💸"],["expensive","drogi","💎"]])},
 ],
 l1:{title:"Coffee, please",emoji:"☕",intro:"Coffee, tea, bread, cheese — twelve words for food and drinks.",quizTag:"FOOD OR DRINK?",quizLabel:"Food or drink?",quiz:[
   {q:"☕ =",opts:["coffee","tea","juice"],correct:0},{q:"🍵 =",opts:["tea","water","coffee"],correct:0},
   {q:"🧃 =",opts:["juice","milk","water"],correct:0},{q:"🍞 =",opts:["bread","cake","cheese"],correct:0},
   {q:"🧀 =",opts:["cheese","egg","salad"],correct:0},{q:"🥗 =",opts:["salad","sandwich","chicken"],correct:0},
   {q:"🍗 =",opts:["chicken","apple","bread"],correct:0},{q:"🍰 =",opts:["cake","tea","egg"],correct:0},
  ],
  odd:[
   {opts:["coffee","tea","juice","bread"],odd:3,why:"Bread isn't a drink."},
   {opts:["cheese","egg","chicken","water"],odd:3,why:"Water is a drink."},
   {opts:["apple","salad","sandwich","coffee"],odd:3,why:"Coffee is a drink."},
   {opts:["cake","sandwich","bread","tea"],odd:3,why:"Tea is a drink."},
  ],
  wordle:[["tea","🍵"],["juice","🧃"],["bread","🍞"],["egg","🥚"]]},
 l2:{title:"How much is it?",emoji:"🏷️",intro:"Twenty, fifty, a hundred — numbers and prices in English.",fillTag:"NUMBERS",fill:[
   {before:"10 + 10 =",blank:"twenty",after:"",bank:["twenty","thirty","forty"],emoji:"➕"},
   {before:"25 + 25 =",blank:"fifty",after:"",bank:["fifty","sixty","fifteen"],emoji:"➕"},
   {before:"50 + 50 =",blank:"a hundred",after:"",bank:["a hundred","ninety","eighty"],emoji:"💯"},
   {before:"20 + 10 =",blank:"thirty",after:"",bank:["thirty","thirteen","forty"],emoji:"➕"},
   {before:"The coffee is 3 zł. It's",blank:"cheap",after:".",bank:["cheap","expensive","price"],emoji:"👍💸"},
   {before:"The watch is 5,000 zł. It's",blank:"expensive",after:"!",bank:["expensive","cheap","twenty"],emoji:"💎"},
   {before:"What's the",blank:"price",after:"of this cake?",bank:["price","cheap","hundred"],emoji:"🏷️"},
   {before:"40 + 30 =",blank:"seventy",after:"",bank:["seventy","seventeen","sixty"],emoji:"➕"},
  ],
  tf:{sub:"Read the menu: 'CAFÉ ROMA — coffee 9 zł · tea 7 zł · juice 8 zł · cheese sandwich 15 zł · chicken salad 24 zł · apple cake 12 zł'",tag:"A MENU",items:[
   {text:"Coffee is 9 zł.",answer:0},{text:"Tea is more expensive than coffee.",answer:1},{text:"A cheese sandwich is 15 zł.",answer:0},
   {text:"The chicken salad is 42 zł.",answer:1},{text:"There is apple cake.",answer:0},{text:"Juice is 18 zł.",answer:1}]},
  listen:[
   {word:"It's forty zloty.",options:["It's forty zloty.","It's fourteen zloty.","It's four zloty."],correct:0},
   {word:"Can I have a coffee, please?",options:["Can I have a coffee, please?","Can I have a copy, please?","Can I have a tea, please?"],correct:0},
   {word:"That's sixty.",options:["That's sixty.","That's sixteen.","That's fifty."],correct:0},
  ],
  wordle:[["twenty","2️⃣0️⃣"],["fifty","5️⃣0️⃣"],["price","🏷️"],["cheap","👍💸"],["sixty","6️⃣0️⃣"]]},
 grammar:{title:"Can I have a tea, please?",emoji:"🙋",label:"Can I have…? · How much…?",intro:"Can I have a coffee, please? How much is it? It's nine zloty. — ordering and paying.",boxTitle:"Can I have…? · How much is / are…?",
  html:`<p>Order politely with <b>Can I have…, please?</b></p>${TBL(["You say","Example"],[["Can I have + a / an …?","<b>Can I have a</b> coffee, <b>please</b>?"],["Can I have + some …?","<b>Can I have some</b> water, <b>please</b>?"],["I'd like (= I want, politely)","<b>I'd like</b> a sandwich."]])}<p style="margin-top:12px;">Ask the price:</p>${TBL(["One thing","Two or more"],[["<b>How much is</b> the cake?","<b>How much are</b> the apples?"],["<b>It's</b> 12 zł.","<b>They're</b> 5 zł."]])}<p style="margin-top:12px;">Numbers: 13 thir<b>teen</b> ↔ 30 thir<b>ty</b>, 14 four<b>teen</b> ↔ 40 for<b>ty</b> (no 'u'!).</p>`,
  quizTag:"AT THE CAFÉ",quiz:[
   {q:"___ I have a tea, please?",opts:["Can","Do","Am"],correct:0},{q:"How much ___ the coffee?",opts:["is","are","do"],correct:0},
   {q:"How much ___ the eggs?",opts:["are","is","does"],correct:0},{q:"Can I have ___ apple, please?",opts:["an","a","some"],correct:0},
   {q:"Can I have ___ water, please?",opts:["some","a","an"],correct:0},{q:"'How much is it?' '___ 20 zł.'",opts:["It's","They're","Is"],correct:0},
   {q:"40 =",opts:["forty","fourty","fourteen"],correct:0},{q:"I'd ___ a sandwich, please.",opts:["like","likes","liking"],correct:0},
  ],
  fill:[
   {before:"",blank:"Can",after:"I have a juice, please?",bank:["Can","Do","Is"],emoji:"🧃"},
   {before:"How much",blank:"is",after:"the cheese?",bank:["is","are","am"],emoji:"🧀"},
   {before:"How much",blank:"are",after:"the apples?",bank:["are","is","am"],emoji:"🍎"},
   {before:"Can I have",blank:"an",after:"egg sandwich?",bank:["an","a","some"],emoji:"🥚"},
   {before:"",blank:"They're",after:"8 zł.",bank:["They're","It's","Is"],emoji:"🏷️"},
   {before:"I'd",blank:"like",after:"a chicken salad, please.",bank:["like","likes","want"],emoji:"🥗"},
   {before:"Can I have",blank:"some",after:"bread, please?",bank:["some","a","an"],emoji:"🍞"},
   {before:"That's",blank:"ninety",after:"zloty, please. (90)",bank:["ninety","nineteen","nine"],emoji:"💳"},
  ],
  build:[
   {s:"Can I have a coffee, please?",pl:"Poproszę kawę."},{s:"How much is the cake?",pl:"Ile kosztuje ciasto?"},
   {s:"How much are the apples?",pl:"Ile kosztują jabłka?"},{s:"It's twenty zloty.",pl:"To kosztuje dwadzieścia złotych."},{s:"I'd like a sandwich.",pl:"Poproszę kanapkę."},
  ],
  errors:[
   {s:"How much are the coffee?",wrong:2,ok:"How much is the coffee?"},
   {s:"Can I have a apple?",wrong:3,ok:"Can I have an apple?"},
   {s:"How much is the eggs?",wrong:2,ok:"How much are the eggs?"},
   {s:"I'd likes a tea.",wrong:1,ok:"I'd like a tea."},
   {s:"Do I have a juice, please?",wrong:0,ok:"Can I have a juice, please?"},
  ],
  whack:[
   {q:"How much ___ it?",opts:["is","are"],correct:0},{q:"How much ___ they?",opts:["are","is"],correct:0},
   {q:"___ apple",opts:["an","a"],correct:0},{q:"40 = ___",opts:["forty","fourty"],correct:0},
   {q:"___ I have…?",opts:["Can","Do"],correct:0},
  ],
  wordle:[["please","🙏"],["much","💰"],["have","🙋"],["forty","4️⃣0️⃣"]]},
 reading:{title:"At the market",emoji:"🧺",intro:"Read a conversation at a market stall, then answer, translate and write your own café order.",storyTitle:"At the Market",label:"Dialogue",paras:[
   "<b>At the Market</b> 🧺",
   "<b>Seller:</b> Good morning! Can I help you? <b>Anna:</b> Yes, please. How much are the apples?",
   "<b>Seller:</b> They're six zloty a kilo. <b>Anna:</b> OK. Can I have two kilos, please? And how much is the cheese?",
   "<b>Seller:</b> It's thirty zloty. It's very good cheese! <b>Anna:</b> Thirty? That's expensive! Can I have a small piece, please?",
   "<b>Seller:</b> Of course. Here you are. That's twenty-seven zloty, please. <b>Anna:</b> Here you are. Thank you! Goodbye!",
  ],
  tf:[
   {text:"The apples are six zloty a kilo.",answer:0},{text:"Anna wants three kilos of apples.",answer:1},{text:"The cheese is thirty zloty.",answer:0},
   {text:"Anna thinks the cheese is cheap.",answer:1},{text:"Anna buys a small piece of cheese.",answer:0},{text:"The seller's name is Piotr.",answer:2},{text:"Anna pays twenty-seven zloty.",answer:0}],
  quiz:[
   {q:"Where is Anna?",opts:["At the market","At a café","At home"],correct:0},
   {q:"How much are the apples?",opts:["Six zloty a kilo","Sixty zloty","Sixteen zloty"],correct:0},
   {q:"How many kilos does she buy?",opts:["Two","One","Five"],correct:0},
   {q:"What does Anna say about the cheese?",opts:["It's expensive","It's cheap","It's bad"],correct:0},
   {q:"How much does she pay?",opts:["Twenty-seven zloty","Thirty zloty","Seventy-two zloty"],correct:0},
  ],
  typed:[
   {prompt:"Poproszę herbatę.",answers:["Can I have a tea, please","Can I have a tea please","Can I have tea, please","A tea, please","I'd like a tea, please","I'd like a tea"]},
   {prompt:"Ile to kosztuje?",answers:["How much is it","How much is this","How much does it cost"]},
   {prompt:"To jest drogie.",answers:["It's expensive","It is expensive","That's expensive","This is expensive"]},
   {prompt:"Pięćdziesiąt złotych.",answers:["Fifty zloty","Fifty zlotys","50 zloty"]},
  ],
  writing:{label:"Your order",title:"At the café ✍️",sub:"Write a short dialogue at a café (min. 35 words). Order two things, ask the price and pay.",starters:["Waiter: Hello! Can I help you?","You: Can I have…, please?","You: How much is…?","Waiter: It's…","You: Here you are. Thank you!"],min:35},
  wordle:[["kilo","⚖️"],["piece","🍰"],["seller","🧑‍🌾"],["thank","🙏"]]},
 test:{grammar:[
   {q:"___ I have a juice, please?",opts:["Can","Do","Are"],correct:0},{q:"How much ___ the bread?",opts:["is","are","do"],correct:0},
   {q:"How much ___ the eggs?",opts:["are","is","am"],correct:0},{q:"Can I have ___ orange juice?",opts:["an","a","some a"],correct:0},
   {q:"60 =",opts:["sixty","sixteen","six"],correct:0},{q:"100 =",opts:["a hundred","a thousand","ten"],correct:0},
   {q:"5,000 zł for a coffee? That's…",opts:["expensive","cheap","price"],correct:0},{q:"🥪 =",opts:["sandwich","salad","cake"],correct:0}],
  errors:[
   {s:"How much is the apples?",wrong:2,ok:"How much are the apples?"},
   {s:"Can I has a coffee?",wrong:2,ok:"Can I have a coffee?"},
   {s:"It's fourty zloty.",wrong:1,ok:"It's forty zloty."},
   {s:"Can I have an tea?",wrong:3,ok:"Can I have a tea?"}],
  typed:[
   {prompt:"Ile kosztują jabłka?",answers:["How much are the apples","How much are apples"]},
   {prompt:"Poproszę kanapkę z serem.",answers:["Can I have a cheese sandwich, please","Can I have a cheese sandwich please","Can I have a cheese sandwich","I'd like a cheese sandwich, please","I'd like a cheese sandwich","A cheese sandwich, please"]},
   {prompt:"To jest tanie.",answers:["It's cheap","It is cheap","That's cheap","This is cheap"]},
   {prompt:"Trzydzieści złotych.",answers:["Thirty zloty","Thirty zlotys","30 zloty"]}]},
});
