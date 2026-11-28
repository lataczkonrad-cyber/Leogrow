/* =====================================================================
   STANDALONE LESSON — Shops, Things & Homes (A1, Teens & Adults)
   Topics from a coursebook Unit 3: shops in town, quantities (a bottle of…,
   a loaf of…), want / want to, possessive pronouns and Whose…?, making
   suggestions, types of homes, a "favourite things" blog and a personal
   town map. All texts, dialogues and people are Leogrow's own.
   Adds four new step types just for this lesson: dialogue (with voices),
   dictation, a tap-the-shop town map and a timed unit test.
   ===================================================================== */
const SH_SHOPS=V([
 ["baker's","piekarnia","🥖"],["bookshop","księgarnia","📚"],["butcher's","sklep mięsny","🥩"],["charity shop","sklep charytatywny","👚💝"],
 ["corner shop","sklepik osiedlowy","🏪"],["florist's","kwiaciarnia","💐"],["games shop","sklep z grami","🎮"],["greengrocer's","warzywniak","🥕🍏"],
 ["pet shop","sklep zoologiczny","🐹"],["pharmacy","apteka","💊"],["shoe shop","sklep obuwniczy","👟"],["sports shop","sklep sportowy","⚽"],
 ["sweet shop","cukiernia, sklep ze słodyczami","🍭"],["toy shop","sklep z zabawkami","🧸"],
]);
const SH_QTY=V([
 ["a bottle of water","butelka wody","🍶💧"],["a box of eggs","pudełko jajek","🥚"],["a bouquet of flowers","bukiet kwiatów","💐"],
 ["a bunch of bananas","kiść bananów","🍌"],["a can of lemonade","puszka lemoniady","🥫"],["a carton of milk","karton mleka","🥛"],
 ["a loaf of bread","bochenek chleba","🍞"],["a packet of crisps","paczka chipsów","🥔🛍️"],["a pair of socks","para skarpetek","🧦"],
 ["a slice of pizza","kawałek pizzy","🍕"],["a box of chocolates","pudełko czekoladek","🍫"],["a bunch of grapes","kiść winogron","🍇"],
]);
const SH_HOME=V([
 ["terraced house","dom szeregowy","🏘️"],["block of flats","blok mieszkalny","🏢"],["canal boat","łódź mieszkalna na kanale","🛥️"],
 ["detached house","dom wolnostojący","🏡"],["suburbs","przedmieścia","🌳🚌"],["city centre","centrum miasta","🏙️"],
 ["balcony","balkon","🪴"],["lift","winda","🛗"],["neighbour","sąsiad","👋"],["garden","ogród","🌻"],
 ["share","dzielić (się)","🤝"],["stay with","mieszkać u kogoś (przez jakiś czas)","🧳"],
]);
const SH_ALL=SH_SHOPS.concat(SH_QTY,SH_HOME);

/* ---------- grammar boxes ---------- */
const SH_G_WANT=`<p><b>want</b> + a thing 🍕 · <b>want to</b> + an action 🏃</p>
${TBL(["","+ a thing (noun)","+ an action (verb)"],[
 ["I / you / we / they","I <b>want</b> a new bike.","I <b>want to</b> go to the toy shop."],
 ["he / she / it","She <b>wants</b> a kitten.","He <b>wants to</b> buy some bread."],
 ["➖","They <b>don't want</b> pizza.<br>He <b>doesn't want</b> a dog.","We <b>don't want to</b> stay at home.<br>She <b>doesn't want to</b> walk."]])}
<p style="margin-top:12px;"><b>Questions:</b> <b>Do</b> you <b>want</b> a drink? · <b>Does</b> she <b>want to</b> come? · <b>What do</b> you <b>want</b>? · <b>Where does</b> he <b>want to</b> go?</p>
<p style="margin-top:8px;">After <b>doesn't</b> and <b>does</b> → <b>want</b> (no -s): <i>He doesn't <b>want</b></i> ✅ — <i>He doesn't <s>wants</s></i> ❌</p>
<p style="margin-top:12px;"><b>How many…?</b> = things you can count: <i>How many <b>bananas</b>?</i> 🍌🍌<br><b>How much…?</b> = things you can't count: <i>How much <b>milk</b>?</i> 🥛</p>
<p style="margin-top:12px;"><b>Quantities:</b> a <b>bottle</b> of water · a <b>box</b> of eggs · a <b>bouquet</b> of flowers · a <b>bunch</b> of bananas · a <b>can</b> of lemonade · a <b>carton</b> of milk · a <b>loaf</b> of bread · a <b>packet</b> of crisps · a <b>pair</b> of socks · a <b>slice</b> of pizza</p>
<p style="margin-top:8px;">Two or more: two <b>loaves</b> of bread · three <b>boxes</b> of eggs · two <b>bunches</b> of grapes · four <b>slices</b> of pizza</p>`;

const SH_G_POSS=`<p><b>Possessive pronouns</b> replace "my + thing". You don't repeat the thing. 🙌</p>
${TBL(["Before a noun","On its own"],[
 ["It's <b>my</b> scarf.","It's <b>mine</b>."],["It's <b>your</b> scarf.","It's <b>yours</b>."],
 ["It's <b>his</b> scarf.","It's <b>his</b>."],["It's <b>her</b> scarf.","It's <b>hers</b>."],
 ["It's <b>our</b> scarf.","It's <b>ours</b>."],["It's <b>their</b> scarf.","It's <b>theirs</b>."]])}
<p style="margin-top:12px;">Many things — the same words: <i>They're my gloves → They're <b>mine</b>.</i> · <i>They're their keys → They're <b>theirs</b>.</i></p>
<p style="margin-top:12px;"><b>Whose…?</b> = Czyje…? 🔎<br><i><b>Whose</b> is this phone? — It's Ola's. It's <b>hers</b>.</i><br><i><b>Whose</b> are these trainers? — They're Tom's. They're <b>his</b>.</i></p>
<p style="margin-top:8px;"><b>'s</b> shows who has it: <i>Kuba<b>'s</b> bag · my sister<b>'s</b> room · my parents<b>'</b> car</i></p>
<p style="margin-top:8px;">⚠️ No apostrophe in <b>yours, hers, ours, theirs</b>: <i>It's <s>her's</s></i> ❌ → <i>It's <b>hers</b></i> ✅</p>`;

const SH_G_SUGG=`<p><b>Making suggestions</b> 💡 = proponowanie</p>
${TBL(["Say this…","…and then"],[
 ["<b>Would you like to</b> go to the cinema?","+ verb (go, see, eat…)"],
 ["<b>Shall we</b> go to the cinema?","+ verb"],
 ["<b>Why don't we</b> go to the cinema?","+ verb"],
 ["<b>How about</b> / <b>What about</b> going to the cinema?","+ verb<b>-ing</b> (going, seeing, eating…)"],
 ["<b>Let's</b> go to the cinema!","+ verb"]])}
<p style="margin-top:12px;"><b>Say yes</b> ✅ <i>Yes, I'd love to. · That's a good idea! · OK. Let's do that. · Great!</i></p>
<p style="margin-top:8px;"><b>Say no</b> ❌ <i>Sorry, I can't. · I'm not sure. · I don't feel like going out.</i></p>
<p style="margin-top:8px;">⚠️ <i>I don't feel like</i> + verb<b>-ing</b>: <i>I don't feel like <b>swimming</b>.</i></p>
<p style="margin-top:8px;">⚠️ <i>How about <b>going</b></i> ✅ — <i>How about <s>go</s></i> ❌</p>`;

/* ---------- the lesson ---------- */
const SH_LESSON={id:"shops-a1",title:"Shops, Things & Homes",emoji:"🛍️",num:"3",
 intro:"Shops in town, a loaf of bread and a bunch of bananas, want and want to, mine and yours, making plans with friends, and all kinds of homes.",
 bonus:SH_ALL,
 zones:[
  /* ===== PART 1 — SHOPS IN TOWN ===== */
  {type:"cards",label:"Shops",title:"Shops in town 🏙️",cards:SH_SHOPS},
  {type:"find",label:"Find the shop",cards:SH_SHOPS,rounds:12,title:"Which shop is it? 🔎"},
  {type:"balloon",label:"Balloon Pop",cards:SH_SHOPS,rounds:10},
  {type:"memory",label:"Memory",pairs:memOf(SH_SHOPS.slice(0,8))},
  {type:"quiz",label:"Where can you buy it?",tag:"WHICH SHOP?",qs:[
   {q:"🥖 You want some fresh rolls for breakfast. Go to the…",opts:["baker's","butcher's","bookshop"],correct:0},
   {q:"🥩 Dad needs some sausages for the barbecue. He goes to the…",opts:["butcher's","florist's","pharmacy"],correct:0},
   {q:"💊 You've got a headache. You need the…",opts:["pharmacy","pet shop","games shop"],correct:0},
   {q:"🐹 You want food for your hamster. Try the…",opts:["pet shop","toy shop","shoe shop"],correct:0},
   {q:"👚 You want an old jacket and the money helps people. It's a…",opts:["charity shop","sports shop","sweet shop"],correct:0},
   {q:"🥕 Mum wants carrots, apples and potatoes. She goes to the…",opts:["greengrocer's","butcher's","bookshop"],correct:0},
   {q:"💐 It's Grandma's birthday. You buy roses at the…",opts:["florist's","baker's","corner shop"],correct:0},
   {q:"🏪 It's late, and you only need milk. The small shop near your flat is the…",opts:["corner shop","games shop","charity shop"],correct:0},
   {q:"⚽ You need a new football and shin pads. Go to the…",opts:["sports shop","toy shop","pet shop"],correct:0},
   {q:"🎮 You want a new game for your console. It's at the…",opts:["games shop","bookshop","pharmacy"],correct:0},
  ]},
  {type:"townmap",label:"Town map",title:"Where is it? Tap the shop 🗺️",sub:"Read the clue and tap the right shop on Market Street.",
   top:[["bookshop","📚"],["toy shop","🧸"],["sweet shop","🍭"],["games shop","🎮"],["pharmacy","💊"]],
   bottom:[["baker's","🥖"],["florist's","💐"],["pet shop","🐹"],["shoe shop","👟"],["butcher's","🥩"]],
   qs:[
    {q:"It's opposite the bookshop.",a:"baker's"},
    {q:"It's between the toy shop and the games shop.",a:"sweet shop"},
    {q:"It's next to the baker's and opposite the toy shop.",a:"florist's"},
    {q:"It's opposite the games shop.",a:"shoe shop"},
    {q:"It's at the end of the street, next to the games shop.",a:"pharmacy"},
    {q:"It's between the florist's and the shoe shop.",a:"pet shop"},
    {q:"It's opposite the pharmacy.",a:"butcher's"},
    {q:"It's next to the bookshop.",a:"toy shop"},
    {q:"You can buy a hamster here. It's opposite the sweet shop.",a:"pet shop"},
    {q:"It's next to the sweet shop and opposite the shoe shop.",a:"games shop"},
   ]},
  {type:"spell",label:"Spell it",words:WL([["baker's","🥖"],["bookshop","📚"],["florist's","💐"],["pharmacy","💊"],["butcher's","🥩"],["toy shop","🧸"],["pet shop","🐹"]])},

  /* ===== PART 2 — QUANTITIES & WANT / WANT TO ===== */
  {type:"cards",label:"Quantities",title:"A loaf, a bunch, a carton… 🛒",cards:SH_QTY},
  {type:"match",label:"Match",pairs:SH_QTY.slice(0,10)},
  {type:"fill",label:"Shopping list",tag:"QUANTITIES",items:[
   {before:"Can I have a",blank:"loaf",after:"of bread, please?",bank:["loaf","can","pair"],emoji:"🍞"},
   {before:"We need a",blank:"carton",after:"of orange juice.",bank:["carton","bunch","slice"],emoji:"🧃"},
   {before:"I'd like a",blank:"bunch",after:"of bananas.",bank:["bunch","bottle","packet"],emoji:"🍌"},
   {before:"Dad bought a",blank:"bouquet",after:"of flowers for Mum.",bank:["bouquet","loaf","can"],emoji:"💐"},
   {before:"Can I have a",blank:"slice",after:"of cheese pizza?",bank:["slice","pair","carton"],emoji:"🍕"},
   {before:"My feet are cold. I need a new",blank:"pair",after:"of socks.",bank:["pair","box","bunch"],emoji:"🧦"},
   {before:"Let's take a",blank:"bottle",after:"of water to the park.",bank:["bottle","loaf","slice"],emoji:"💧"},
   {before:"The cat wants a",blank:"can",after:"of cat food.",bank:["can","bouquet","pair"],emoji:"🐱"},
   {before:"Two",blank:"packets",after:"of crisps, please.",bank:["packets","packet","loafs"],emoji:"🥔"},
   {before:"We need three",blank:"loaves",after:"of bread for the party.",bank:["loaves","loafs","loaf"],emoji:"🥪"},
  ]},
  {type:"odd",label:"Odd one out",items:[
   {opts:["a loaf of bread","a slice of cake","a box of eggs","a pair of milk"],odd:3,why:"Milk comes in a carton or a bottle, not a pair."},
   {opts:["baker's","butcher's","greengrocer's","bookshop"],odd:3,why:"You can't buy food at a bookshop."},
   {opts:["a bunch of bananas","a bunch of grapes","a bunch of flowers","a bunch of milk"],odd:3,why:"You can't have a bunch of milk."},
   {opts:["want to go","want to buy","want to see","want to a pizza"],odd:3,why:"Want to + an action. For a thing: want a pizza."},
   {opts:["mine","yours","ours","my"],odd:3,why:"'My' needs a noun after it (my bag). The others stand alone."},
  ]},
  {type:"grammar",label:"want / want to",title:"want, want to & quantities",html:SH_G_WANT},
  {type:"fill",label:"want or want to?",tag:"WANT / WANT TO",items:[
   {before:"I",blank:"want",after:"a new pair of trainers.",bank:["want","want to","wants"],emoji:"👟"},
   {before:"She",blank:"wants to",after:"go to the florist's.",bank:["wants to","want to","wants"],emoji:"💐"},
   {before:"We",blank:"don't want",after:"any sweets, thanks.",bank:["don't want","doesn't want","don't want to"],emoji:"🍬"},
   {before:"My brother",blank:"doesn't want to",after:"walk to town.",bank:["doesn't want to","don't want to","doesn't wants to"],emoji:"🚶"},
   {before:"",blank:"Do",after:"you want a slice of cake?",bank:["Do","Does","Are"],emoji:"🍰"},
   {before:"What",blank:"does",after:"Lena want for her birthday?",bank:["does","do","is"],emoji:"🎁"},
   {before:"They",blank:"want to",after:"buy a hamster at the pet shop.",bank:["want to","want","wants to"],emoji:"🐹"},
   {before:"How",blank:"many",after:"apples do you want?",bank:["many","much","lot"],emoji:"🍎"},
   {before:"How",blank:"much",after:"milk do we need?",bank:["much","many","lots"],emoji:"🥛"},
  ]},
  {type:"whack",label:"Whack-a-Leo",qs:[
   {q:"a ___ of bread",opts:["loaf","bunch","pair"],correct:0},{q:"a ___ of milk",opts:["carton","loaf","bouquet"],correct:0},
   {q:"a ___ of flowers",opts:["bouquet","slice","can"],correct:0},{q:"a ___ of bananas",opts:["bunch","pair","bottle"],correct:0},
   {q:"a ___ of trainers",opts:["pair","packet","box"],correct:0},{q:"a ___ of crisps",opts:["packet","loaf","pair"],correct:0},
   {q:"a ___ of pizza",opts:["slice","carton","bunch"],correct:0},{q:"a ___ of lemonade",opts:["can","loaf","pair"],correct:0},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"I want to go to the pet shop.",pl:"Chcę iść do sklepu zoologicznego."},
   {s:"Does she want a bunch of flowers?",pl:"Czy ona chce bukiet kwiatów?"},
   {s:"We don't want to stay at home.",pl:"Nie chcemy zostać w domu."},
   {s:"Can I have a loaf of bread, please?",pl:"Czy mogę prosić bochenek chleba?"},
   {s:"How many eggs do you want?",pl:"Ile jajek chcesz?"},
  ]},
  {type:"dialogue",label:"At the baker's",title:"At the baker's 🥖",sub:"Tap 🔊 to hear one line, or ▶ to hear the whole dialogue. Then read it again with a friend.",
   cast:{"Shop assistant":"🧑‍🍳","Kuba":"👦"},lines:[
   ["Shop assistant","Good morning! What would you like?"],
   ["Kuba","Hello! Can I have a loaf of brown bread, please?"],
   ["Shop assistant","Here you are. Anything else?"],
   ["Kuba","Yes. I want four rolls and two slices of apple cake."],
   ["Shop assistant","Sorry, we've only got one slice of apple cake. How about some cherry cake?"],
   ["Kuba","OK, one slice of apple cake and one slice of cherry cake. How much is that?"],
   ["Shop assistant","That's eight pounds fifty, please."],
   ["Kuba","Here you are. Thank you! Bye!"],
  ]},
  {type:"dictation",label:"Dictation",title:"Listen and write ✍️",sub:"Listen and type what you hear. Tap 🐢 to hear it slowly.",items:[
   {en:"I want a loaf of bread."},{en:"She wants to go to the florist's."},
   {en:"Can I have a carton of milk, please?"},{en:"We need a bunch of bananas."},
   {en:"He doesn't want to walk to town."},{en:"The pet shop is next to the baker's."},
  ]},

  /* ===== PART 3 — WHOSE IS IT? (POSSESSIVE PRONOUNS) ===== */
  {type:"dialogue",label:"Story: Lost & found",title:"The lost property box 📦",sub:"After the school disco there are lots of things in the lost property box. Listen and read.",
   cast:{"Mr Price":"👨‍🏫","Ola":"👧","Tom":"🧒","Mia":"👩‍🦰","Zak":"👦🏾"},lines:[
   ["Mr Price","Right, everybody! The disco is over, and look at this box. Whose things are these?"],
   ["Ola","Oh! That green scarf is mine! Thank you, Mr Price."],
   ["Mr Price","And whose is this phone? It's got a cat on it."],
   ["Tom","It isn't mine. My phone is blue. I think it's Mia's."],
   ["Mia","Yes, it's mine! Phew! I'm so happy."],
   ["Mr Price","Whose are these trainers? They're very big."],
   ["Zak","They're not mine. They're my brother's. They're his!"],
   ["Mr Price","And this bottle of water? And these two packets of crisps?"],
   ["Ola","The crisps are ours. Tom and I bought them at the corner shop."],
   ["Tom","Yes, they're ours. But the water isn't. Maybe it's yours, Mr Price?"],
   ["Mr Price","Ha! Yes, it's mine. Now, who wants to help me with the chairs?"],
  ]},
  {type:"tf",label:"True or false?",title:"True, False or Not given?",sub:"Not given = the story doesn't say.",tag:"STORY CHECK",labels:TF3,items:[
   {text:"The green scarf is Ola's.",answer:0},{text:"Tom's phone has got a cat on it.",answer:1},
   {text:"The phone is Mia's.",answer:0},{text:"The big trainers are Zak's.",answer:1},
   {text:"Zak's brother is fifteen.",answer:2},{text:"Ola and Tom bought the crisps.",answer:0},
   {text:"The bottle of water is Mr Price's.",answer:0},
  ]},
  {type:"grammar",label:"mine, yours…",title:"Possessive pronouns & Whose…?",html:SH_G_POSS},
  {type:"fill",label:"Whose is it?",tag:"MINE, YOURS, HIS…",items:[
   {before:"It's Ola's scarf. It's",blank:"hers",after:".",bank:["hers","her","his"],emoji:"🧣"},
   {before:"They're Zak's brother's trainers. They're",blank:"his",after:".",bank:["his","hers","him"],emoji:"👟"},
   {before:"It's my phone. It's",blank:"mine",after:".",bank:["mine","my","me"],emoji:"📱"},
   {before:"Is this your pen? Is it",blank:"yours",after:"?",bank:["yours","your","your's"],emoji:"🖊️"},
   {before:"It's our dog. It's",blank:"ours",after:".",bank:["ours","our","us"],emoji:"🐶"},
   {before:"They're Lena and Max's bikes. They're",blank:"theirs",after:".",bank:["theirs","their","them"],emoji:"🚲"},
   {before:"",blank:"Whose",after:"is this bouquet of flowers?",bank:["Whose","Who's","Who"],emoji:"💐"},
   {before:"This bag isn't",blank:"my",after:"bag. Mine is red.",bank:["my","mine","me"],emoji:"🎒"},
  ]},
  {type:"quiz",label:"Whose…?",tag:"WHOSE IS IT?",qs:[
   {q:"🧢 Whose is this cap? Is it Leo's?",opts:["Yes, it's his.","Yes, it's hers.","Yes, it's him."],correct:0},
   {q:"🧤 Whose are these gloves? Are they Anna's?",opts:["Yes, they're hers.","Yes, they're his.","Yes, it's her."],correct:0},
   {q:"🚗 Is this your parents' car?",opts:["Yes, it's theirs.","Yes, it's their.","Yes, it's ours car."],correct:0},
   {q:"🐕 Is this your dog, Ben and Kate?",opts:["Yes, it's ours.","Yes, it's our.","Yes, it's yours."],correct:0},
   {q:"📱 'Is this phone ___?' — 'No, it isn't mine.'",opts:["yours","your","you"],correct:0},
   {q:"Choose the correct sentence:",opts:["Whose are these keys?","Who's are these keys?","Whose is these keys?"],correct:0},
   {q:"'It's my sister's bike.' = 'It's ___.'",opts:["hers","his","mine"],correct:0},
  ]},
  {type:"errors",label:"Find the error",items:[
   {s:"This scarf is her's.",wrong:3,ok:"This scarf is hers."},
   {s:"Who's is this bottle?",wrong:0,ok:"Whose is this bottle?"},
   {s:"Those trainers are mines.",wrong:3,ok:"Those trainers are mine."},
   {s:"He doesn't wants a new phone.",wrong:2,ok:"He doesn't want a new phone."},
   {s:"I want go to the bookshop.",wrong:2,ok:"I want to go to the bookshop."},
   {s:"Is this bag your?",wrong:3,ok:"Is this bag yours?"},
   {s:"Can I have a loafs of bread?",wrong:4,ok:"Can I have a loaf of bread?"},
  ]},
  {type:"typed",label:"Translation",blocks:[{id:"sh-tr1",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"Czyj jest ten szalik?",answers:["Whose is this scarf","Whose scarf is this"]},
   {prompt:"To jest moje. (o jednej rzeczy)",answers:["It's mine","It is mine"]},
   {prompt:"Te buty są jej.",answers:["These shoes are hers","Those shoes are hers"]},
   {prompt:"Chcę iść do księgarni.",answers:["I want to go to the bookshop"]},
   {prompt:"On nie chce kanapki.",answers:["He doesn't want a sandwich","He does not want a sandwich"]},
   {prompt:"Czy mogę prosić karton mleka?",answers:["Can I have a carton of milk please","Can I have a carton of milk","Could I have a carton of milk please","Could I have a carton of milk"]},
  ]}]},

  /* ===== PART 4 — MAKING SUGGESTIONS ===== */
  {type:"dialogue",label:"Story: Saturday plans",title:"What shall we do on Saturday? 🦈",sub:"Nina, Kuba and Ollie are making plans. Listen and read. What does Ollie want to do?",
   cast:{"Nina":"👧🏼","Kuba":"👦","Ollie":"🧑‍🦱"},lines:[
   ["Nina","Look! There's a new aquarium in town. Would you like to go on Saturday?"],
   ["Kuba","Yes, I'd love to! Ollie, what about you?"],
   ["Ollie","Sorry, I can't go in the morning. I've got a swimming lesson."],
   ["Nina","No problem. Why don't we go in the afternoon?"],
   ["Ollie","That's a good idea. Shall we meet at the bus stop at two o'clock?"],
   ["Kuba","OK, let's do that. How about going to the pizza place after the aquarium?"],
   ["Ollie","Great! After swimming I'm always really hungry."],
   ["Nina","You're always hungry, Ollie! Shall we look at the sharks first?"],
   ["Ollie","Hmm, I don't feel like looking at sharks. I want to see the turtles!"],
   ["Kuba","Sharks and turtles, then. And pizza!"],
  ]},
  {type:"quiz",label:"Story questions",tag:"SATURDAY PLANS",qs:[
   {q:"Where do they want to go on Saturday?",opts:["To the new aquarium","To the swimming pool","To the zoo"],correct:0},
   {q:"Why can't Ollie go in the morning?",opts:["He's got a swimming lesson.","He's hungry.","He doesn't like fish."],correct:0},
   {q:"Where and when do they meet?",opts:["At the bus stop at two","At the aquarium at ten","At the pizza place at two"],correct:0},
   {q:"What does Kuba want to do after the aquarium?",opts:["Go for pizza","Go swimming","Go to the toy shop"],correct:0},
   {q:"What does Ollie want to see?",opts:["The turtles","The sharks","The whales"],correct:0},
  ]},
  {type:"grammar",label:"Suggestions",title:"Making suggestions",html:SH_G_SUGG},
  {type:"fill",label:"Suggest it",tag:"SUGGESTIONS",items:[
   {before:"Would you like",blank:"to go",after:"to town this afternoon?",bank:["to go","going","go"],emoji:"🏙️"},
   {before:"What about",blank:"meeting",after:"at the bus stop?",bank:["meeting","meet","to meet"],emoji:"🚏"},
   {before:"Shall we",blank:"watch",after:"a film?",bank:["watch","watching","to watch"],emoji:"🎬"},
   {before:"Why don't we",blank:"look",after:"at the trainers in the sports shop?",bank:["look","looking","to look"],emoji:"👟"},
   {before:"How about",blank:"eating",after:"a pizza for dinner?",bank:["eating","eat","to eat"],emoji:"🍕"},
   {before:"I don't feel like",blank:"shopping",after:"today. I'm tired.",bank:["shopping","shop","to shop"],emoji:"🛍️"},
   {before:"Yes, I'd love",blank:"to",after:". What time?",bank:["to","it","so"],emoji:"😃"},
   {before:"That's a good",blank:"idea",after:"! Let's do that.",bank:["idea","ideas","think"],emoji:"💡"},
  ]},
  {type:"quiz",label:"Say yes or no",tag:"WHAT DO YOU SAY?",qs:[
   {q:"'Shall we go to the park?' You want to go:",opts:["That's a good idea!","I don't feel like it.","Sorry, I can't."],correct:0},
   {q:"'Would you like to come to my party?' You can't go:",opts:["Sorry, I can't. I'm visiting my grandma.","Yes, I'd love to.","Let's do that."],correct:0},
   {q:"You want to play football. You say:",opts:["Why don't we play football?","Why don't we playing football?","How about play football?"],correct:0},
   {q:"'How about going swimming?' You don't want to:",opts:["I don't feel like swimming.","I don't feel like swim.","Yes, I'd love to."],correct:0},
   {q:"You're not sure about the plan. You say:",opts:["I'm not sure.","OK. Let's do that.","Great!"],correct:0},
   {q:"Which suggestion is correct?",opts:["Shall we meet at six?","Shall we meeting at six?","Shall we to meet at six?"],correct:0},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"Would you like to go to the cinema?",pl:"Czy chciałbyś pójść do kina?"},
   {s:"Why don't we meet at the bus stop?",pl:"Może spotkamy się na przystanku?"},
   {s:"How about going to the sports shop?",pl:"Może pójdziemy do sklepu sportowego?"},
   {s:"Shall we buy a bouquet of flowers?",pl:"Kupimy bukiet kwiatów?"},
   {s:"I don't feel like going out.",pl:"Nie mam ochoty wychodzić."},
  ]},
  {type:"speak",label:"Say it",items:[
   {en:"Would you like to go to town?",emoji:"🏙️",pl:"Czy chciałbyś pójść do miasta?"},
   {en:"Shall we go to the bookshop?",emoji:"📚",pl:"Pójdziemy do księgarni?"},
   {en:"How about going to the park?",emoji:"🌳",pl:"Może pójdziemy do parku?"},
   {en:"Yes, I'd love to.",emoji:"😃",pl:"Tak, chętnie."},
   {en:"That's a good idea!",emoji:"💡",pl:"To dobry pomysł!"},
   {en:"Sorry, I can't.",emoji:"🙅",pl:"Przykro mi, nie mogę."},
   {en:"Can I have a loaf of bread, please?",emoji:"🍞",pl:"Czy mogę prosić bochenek chleba?"},
   {en:"Whose is this phone? It's mine!",emoji:"📱",pl:"Czyj jest ten telefon? Mój!"},
  ]},
  {type:"listen",label:"Listen",items:[
   {word:"Why don't we go to the toy shop?",options:["Why don't we go to the toy shop?","Why don't we go to the shoe shop?","Why don't you go to the toy shop?"],correct:0},
   {word:"I don't feel like going out.",options:["I don't feel like going out.","I don't like going out.","I feel like going out."],correct:0},
   {word:"These trainers are hers.",options:["These trainers are hers.","These trainers are his.","These trainers are here."],correct:0},
   {word:"Can I have a carton of juice?",options:["Can I have a carton of juice?","Can I have a can of juice?","Can I have a cart of juice?"],correct:0},
   {word:"She wants to go to the florist's.",options:["She wants to go to the florist's.","She wants to go to the forest.","She went to the florist's."],correct:0},
  ]},
  {type:"move",label:"Act it out",items:[
   {emoji:"🍞",text:"Be a shop assistant! Give someone a loaf of bread and say: Here you are! 🍞"},
   {emoji:"💐",text:"Smell a big bouquet of flowers and say: These flowers are mine! 💐"},
   {emoji:"🤷",text:"Point at a bag and ask: Whose is this bag? 🤷"},
   {emoji:"🎬",text:"Pretend to call a friend and say: Why don't we go to the cinema? 🎬"},
   {emoji:"🥱",text:"Yawn and say: Sorry, I don't feel like going out! 🥱"},
  ]},

  /* ===== PART 5 — HOMES ===== */
  {type:"cards",label:"Homes",title:"Where do people live? 🏠",cards:SH_HOME},
  {type:"memory",label:"Memory",pairs:memOf(SH_HOME.slice(0,8))},
  {type:"reading",label:"Read: Homes",title:"Four homes, four people",paras:[
   "<b>1 — Emma, 13</b> 🏘️ I live with my mum and my little brother in a <b>terraced house</b>. That means our house shares two walls with the houses next to it. Our <b>neighbours</b> have got three noisy dogs, but they're very friendly! The house is small and I <b>share</b> a bedroom with my brother. My favourite thing is our tiny garden. Mum grows tomatoes and strawberries there.",
   "<b>2 — Marek, 27</b> 🏢 My flat is on the fourteenth floor of a <b>block of flats</b> in the <b>city centre</b>. I haven't got a garden, but I've got a big <b>balcony</b> with lots of plants. From there I can see the whole city at night. The only problem is the <b>lift</b>. When it doesn't work, I walk up 280 steps!",
   "<b>3 — Gran and Grandad</b> 🏡 My grandparents live in a <b>detached house</b> in the <b>suburbs</b>, thirty minutes from town by bus. It's got four bedrooms and an enormous kitchen. In the summer holidays I <b>stay with</b> them for two weeks. Grandad has got chickens, so we have fresh eggs every morning.",
   "<b>4 — Aunt Rosa</b> 🛥️ My aunt lives on a <b>canal boat</b>! It's long and narrow and it's painted red and yellow. Inside there's a little kitchen, a living room, one bedroom and a very small bathroom. At the weekends she goes on trips along the canal. She says it's the best home in the world — but she hasn't got space for a cat.",
  ]},
  {type:"quiz",label:"Which home?",tag:"READING CHECK",qs:[
   {q:"'I share a bedroom.' Which text?",opts:["1 — Emma","2 — Marek","4 — Aunt Rosa"],correct:0},
   {q:"'Sometimes I walk up 280 steps.' Which text?",opts:["2 — Marek","3 — Gran and Grandad","1 — Emma"],correct:0},
   {q:"'We've got chickens.' Which text?",opts:["3 — Gran and Grandad","4 — Aunt Rosa","2 — Marek"],correct:0},
   {q:"'My home moves!' Which text?",opts:["4 — Aunt Rosa","1 — Emma","3 — Gran and Grandad"],correct:0},
   {q:"Where does Marek live?",opts:["In the city centre","In the suburbs","On a boat"],correct:0},
   {q:"What hasn't Aunt Rosa got?",opts:["A cat","A kitchen","A bedroom"],correct:0},
   {q:"What does Emma's mum grow?",opts:["Tomatoes and strawberries","Flowers","Potatoes and carrots"],correct:0},
  ]},
  {type:"dialogue",label:"Listening: Aunt Rosa",title:"Interview with Aunt Rosa 🎧",sub:"Listen first — the text is hidden. Then answer the questions on the next step. Tap 'Show the text' only if you need it.",hide:true,
   cast:{"Emma":"👧","Aunt Rosa":"👩"},lines:[
   ["Emma","Aunt Rosa, how big is your boat?"],
   ["Aunt Rosa","It's eighteen metres long, but only two metres wide. So all the rooms are very small."],
   ["Emma","Have you got a garden?"],
   ["Aunt Rosa","Not really. I've got some flowers and vegetables in boxes on the roof!"],
   ["Emma","What's your favourite thing about living on a boat?"],
   ["Aunt Rosa","I love waking up in a different place. And the ducks visit me every morning."],
   ["Emma","Is there anything you don't like?"],
   ["Aunt Rosa","Yes. In winter it's very cold. And lots of tourists take photos of my boat!"],
   ["Emma","What other home would you like to live in?"],
   ["Aunt Rosa","Maybe a little house by the sea. But only with a boat in the garden!"],
  ]},
  {type:"quiz",label:"Listening questions",tag:"LISTENING",qs:[
   {q:"How long is Aunt Rosa's boat?",opts:["Eighteen metres","Eight metres","Two metres"],correct:0},
   {q:"Where does she grow vegetables?",opts:["In boxes on the roof","In a big garden","At her sister's house"],correct:0},
   {q:"What's her favourite thing?",opts:["Waking up in a different place","The tourists","Cold winters"],correct:0},
   {q:"What doesn't she like?",opts:["The cold in winter and the tourists' photos","The ducks","Her small kitchen"],correct:0},
   {q:"What other home would she like?",opts:["A little house by the sea","A flat in the city centre","A terraced house"],correct:0},
  ]},
  {type:"fill",label:"Homes words",tag:"HOMES",items:[
   {before:"We live on the 9th floor, so we always take the",blank:"lift",after:".",bank:["lift","balcony","garden"],emoji:"🛗"},
   {before:"Our house shares two walls with other houses. It's a",blank:"terraced house",after:".",bank:["terraced house","detached house","canal boat"],emoji:"🏘️"},
   {before:"I",blank:"share",after:"a bedroom with my sister.",bank:["share","stay","live"],emoji:"🤝"},
   {before:"The people next door are our",blank:"neighbours",after:".",bank:["neighbours","tourists","shops"],emoji:"👋"},
   {before:"In the holidays I",blank:"stay with",after:"my cousins in Gdańsk.",bank:["stay with","share","live in"],emoji:"🧳"},
   {before:"We live in the",blank:"suburbs",after:", far from the busy centre.",bank:["suburbs","lift","balcony"],emoji:"🌳"},
  ]},

  /* ===== PART 6 — FAVOURITE THINGS & MY TOWN ===== */
  {type:"reading",label:"Blog: favourite things",title:"Lena's blog: My favourite things ⭐",paras:[
   "<b>Hi, I'm Lena! Today my blog is about my favourite things.</b>",
   "👟 <b>Clothes</b> — My favourite clothes are my new yellow trainers. My best friend Hania and I have got the same trainers, but hers are green. We bought them at the sports shop on Market Street.",
   "🎲 <b>Games</b> — My favourite game is a board game about animals. My cousins have got a copy too, but theirs is very old and some cards are missing. Ours is new!",
   "💐 <b>A shop</b> — My favourite shop is the florist's next to our block of flats. It's called Petal Palace. On Fridays my dad buys a bunch of sunflowers for my mum there. I love the smell!",
   "🐹 <b>My pet</b> — My hamster's name is Pancake. He's small and gold. He doesn't want to sleep at night — he wants to run in his wheel!",
   "What are YOUR favourite things? Write in the comments! ✍️",
  ]},
  {type:"tf",label:"Blog check",title:"True or False?",sub:"Read Lena's blog again.",tag:"BLOG",items:[
   {text:"Lena's trainers are yellow.",answer:0},{text:"Hania's trainers are yellow too.",answer:1},
   {text:"The cousins' board game is new.",answer:1},{text:"The florist's is next to Lena's block of flats.",answer:0},
   {text:"Lena's dad buys flowers on Mondays.",answer:1},{text:"Pancake wants to run at night.",answer:0},
  ]},
  {type:"writing",label:"My favourite things",title:"Write a blog about your favourite things 📝",sub:"Write about two or three favourite things (min. 50 words). Use possessive pronouns (mine, hers, ours…) and a quantity if you can.",
   starters:["Today my blog is about my favourite things.","My favourite clothes are my … . My friend has got the same … , but hers / his are … .","My favourite shop is … . It's next to / opposite … .","On Saturdays I buy a packet of … / a bunch of … there.","My favourite game / book / pet is … because …"],min:50},
  {type:"writing",label:"My personal map",title:"Make your personal map 🗺️",sub:"Think about three places in your town that are important to you (a shop, a park, a friend's house…). Write a 'sticky note' for each one: what it is, where it is and why you like it (min. 50 words).",
   starters:["This is the bakery on … Street. It's next to … .","I buy a loaf of bread / a slice of cake here on … .","This is the park opposite my school. I go there with my friends on Saturdays.","This is my grandma's house. It's a terraced house in the suburbs.","I love this place because …"],min:50},

  /* ===== PART 7 — REVISION GAMES ===== */
  {type:"match",label:"Match: homes",pairs:SH_HOME.slice(0,10)},
  {type:"dictation",label:"Dictation 2",title:"Listen and write ✍️",sub:"Sentences from the whole lesson. Tap 🐢 to hear them slowly.",items:[
   {en:"Whose is this scarf?"},{en:"It's hers."},{en:"Why don't we go to the park?"},
   {en:"I share a bedroom with my sister."},{en:"How about going to the bookshop?"},{en:"My aunt lives on a canal boat."},
  ]},
  {type:"typed",label:"Translation 2",blocks:[{id:"sh-tr2",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"Może pójdziemy do kina? (Why…)",answers:["Why don't we go to the cinema","Why do not we go to the cinema"]},
   {prompt:"To dobry pomysł!",answers:["That's a good idea","That is a good idea","It's a good idea"]},
   {prompt:"Mieszkam w bloku.",answers:["I live in a block of flats"]},
   {prompt:"Ona chce kupić bukiet kwiatów.",answers:["She wants to buy a bouquet of flowers","She wants to buy a bunch of flowers"]},
   {prompt:"Nie mam ochoty pływać.",answers:["I don't feel like swimming","I do not feel like swimming"]},
   {prompt:"Te rowery są ich.",answers:["These bikes are theirs","Those bikes are theirs"]},
  ]}]},
  {type:"wordle",label:"Wordle",words:WL([["bread","🍞"],["bunch","🍌"],["slice","🍕"],["loaf","🍞"],["share","🤝"],["hers","👧"],["mine","🙋"],["flats","🏢"]])},
  {type:"wheel",label:"Fortune Wheel",items:SH_SHOPS.slice(0,10)},

  /* ===== UNIT TEST ===== */
  {type:"unittest",label:"Unit test",title:"Unit 3 test 📝",minutes:15,sections:[
   {name:"Shops 🏪",qs:[
    {q:"You buy medicine at the…",opts:["pharmacy","florist's","baker's"],correct:0},
    {q:"You buy sausages at the…",opts:["butcher's","greengrocer's","bookshop"],correct:0},
    {q:"You buy a hamster at the…",opts:["pet shop","toy shop","sweet shop"],correct:0},
    {q:"You buy roses at the…",opts:["florist's","corner shop","sports shop"],correct:0},
    {type:"type",q:"🥕🍏 A shop with fruit and vegetables: the g_________'s",answers:["greengrocer's","greengrocers","greengrocer"]},
   ]},
   {name:"Quantities 🛒",qs:[
    {q:"a ___ of bread",opts:["loaf","bunch","pair"],correct:0},
    {q:"a ___ of milk",opts:["carton","slice","bouquet"],correct:0},
    {q:"a ___ of bananas",opts:["bunch","packet","can"],correct:0},
    {q:"two ___ of pizza",opts:["slices","slice","loaves"],correct:0},
    {type:"type",q:"🧦 a p___ of socks",answers:["pair"]},
   ]},
   {name:"want / want to ✋",qs:[
    {q:"I ___ a new phone.",opts:["want","want to","wants"],correct:0},
    {q:"She ___ go to the cinema.",opts:["wants to","want to","wants"],correct:0},
    {q:"He doesn't ___ to walk.",opts:["want","wants","wanting"],correct:0},
    {q:"___ they want a drink?",opts:["Do","Does","Are"],correct:0},
    {q:"How ___ milk do you want?",opts:["much","many","lot"],correct:0},
   ]},
   {name:"mine, yours… 🔎",qs:[
    {type:"type",q:"It's my bag. → It's ____.",answers:["mine"]},
    {type:"type",q:"They're Ola's gloves. → They're ____.",answers:["hers"]},
    {type:"type",q:"It's our house. → It's ____.",answers:["ours"]},
    {type:"type",q:"They're Tom and Zak's bikes. → They're ______.",answers:["theirs"]},
    {q:"___ is this scarf?",opts:["Whose","Who's","Who"],correct:0},
   ]},
   {name:"Suggestions 💡",qs:[
    {q:"How about ___ to the park?",opts:["going","go","to go"],correct:0},
    {q:"Would you like ___ to my house?",opts:["to come","coming","come"],correct:0},
    {q:"___ we meet at six?",opts:["Shall","Would","How about"],correct:0},
    {q:"'Why don't we go swimming?' — You don't want to:",opts:["I don't feel like swimming.","That's a good idea.","Yes, I'd love to."],correct:0},
    {type:"type",q:"Why don't we ___ a film? (watch)",answers:["watch"]},
   ]},
   {name:"Homes 🏠",qs:[
    {q:"A tall building with lots of flats is a…",opts:["block of flats","terraced house","canal boat"],correct:0},
    {q:"The people who live next to you are your…",opts:["neighbours","tourists","cousins"],correct:0},
    {q:"Your house shares walls with the houses next to it. It's a…",opts:["terraced house","detached house","lift"],correct:0},
    {q:"'I ___ a bedroom with my brother.'",opts:["share","stay","live"],correct:0},
   ]},
   {name:"Listening 🎧",qs:[
    {say:"Shall we meet at the bus stop at three o'clock?",q:"Where and when do they meet?",opts:["At the bus stop at three","At the bus stop at two","At the shop at three"],correct:0},
    {say:"I'd like two loaves of bread and a bunch of grapes, please.",q:"What does the customer want?",opts:["Two loaves of bread and grapes","Two slices of bread and bananas","A loaf of bread and grapes"],correct:0},
    {say:"Those trainers aren't mine. They're my sister's.",q:"Whose are the trainers?",opts:["His sister's","His","His brother's"],correct:0},
    {say:"My cousin lives in a block of flats in the city centre. The lift never works!",q:"What's the problem?",opts:["The lift doesn't work.","The flat is small.","There's no balcony."],correct:0},
   ]},
  ]},
 ]};

/* =====================================================================
   New step types for this lesson: dialogue, dictation, townmap, unittest
   ===================================================================== */
(function(){
const SX={};                      // state per step
const st=(i,init)=>SX[i]||(SX[i]=init());
function rp(){const y=window.scrollY;setPanel(renderZone(current));try{emojify($('panel'));}catch(e){}window.scrollTo(0,y);}
window.SH_rp=rp;
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

const STANDALONE_LESSON=SH_LESSON;
const STANDALONE_UNIT={id:"shops",level:"A1",track:"adults",topic:"Shops, Things & Homes",title:"Shops, Things & Homes",emoji:"🛍️",badge:"Town Explorer",sub:"",n:3};
