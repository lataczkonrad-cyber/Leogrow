/* =====================================================================
   MORE TOPICS — KIDS (A0, A1, A2)
   Built with mkUnit(): 2 word lessons, grammar, reading, long unit test.
   ===================================================================== */

/* ================= KIDS A0 · My School ================= */
mkUnit({id:"kb0",level:"A0",track:"kids",topic:"School",title:"My School",emoji:"🏫",badge:"Super Student",sub:"School things, classroom words — and 'What is this? It's a…'.",
 sets:[
  {title:"School things",label:"School things",words:V([
   ["pen","długopis","🖊️"],["pencil","ołówek","✏️"],["rubber","gumka","🧽"],["ruler","linijka","📏"],["book","książka","📕"],["bag","plecak, torba","🎒"],
   ["desk","ławka, biurko","🪑📚"],["crayon","kredka","🖍️"],["scissors","nożyczki","✂️"],["glue","klej","🧴"],["notebook","zeszyt","📓"],["computer","komputer","💻"]])},
  {title:"In the classroom",label:"Classroom",findTitle:"What do you do? 🔎",words:V([
   ["sit down","usiądź","🪑"],["stand up","wstań","🧍"],["open your book","otwórz książkę","📖"],["close your book","zamknij książkę","📕✋"],["listen","słuchaj","👂"],["look","patrz","👀"],
   ["write","pisz","✍️"],["read","czytaj","📚"],["draw","rysuj","🎨"],["sing","śpiewaj","🎤"],["put up your hand","podnieś rękę","🙋"],["be quiet","bądź cicho","🤫"]])},
 ],
 l1:{title:"In my bag",emoji:"🎒",intro:"Pens, pencils, crayons and books! Twelve things for school.",quizTag:"WHAT IS IT?",quizLabel:"What is it?",quiz:[
   {q:"You write with it. ✍️",opts:["pen","bag","desk"],correct:0},{q:"You cut paper with it.",opts:["scissors","glue","ruler"],correct:0},
   {q:"It's long and straight. 📏",opts:["ruler","rubber","book"],correct:0},{q:"You colour with it. 🌈",opts:["crayon","notebook","desk"],correct:0},
   {q:"Your books go in it.",opts:["bag","pencil","glue"],correct:0},{q:"Oops, a mistake! You need a…",opts:["rubber","ruler","crayon"],correct:0},
   {q:"You sit at it in class.",opts:["desk","pen","book"],correct:0},{q:"It makes paper stick.",opts:["glue","scissors","pencil"],correct:0},
  ],
  odd:[
   {opts:["pen","pencil","crayon","banana"],odd:3,why:"You can't write with a banana! 🍌"},
   {opts:["book","notebook","ruler","dog"],odd:3,why:"A dog isn't a school thing."},
   {opts:["scissors","glue","rubber","red"],odd:3,why:"Red is a colour."},
   {opts:["bag","desk","computer","cat"],odd:3,why:"A cat is an animal."},
  ],
  move:[
   {emoji:"✏️",text:"Hold a pencil and write your name in the air! ✏️"},{emoji:"✂️",text:"Make scissors with your fingers — snip snip! ✂️"},
   {emoji:"🎒",text:"Put your bag on your back and walk to school! 🎒"},{emoji:"📏",text:"Show me something long like a ruler! 📏"},
  ],
  wordle:[["pen","🖊️"],["glue","🧴"],["book","📕"],["ruler","📏"]]},
 l2:{title:"Sit down, please!",emoji:"🙋",intro:"Stand up, sit down, listen, look… what your teacher says in class!",fillTag:"IN CLASS",fill:[
   {before:"Please",blank:"sit down",after:"on your chair.",bank:["sit down","stand up","sing"],emoji:"🪑"},
   {before:"",blank:"Open",after:"your book at page ten.",bank:["Open","Close","Draw"],emoji:"📖"},
   {before:"",blank:"Listen",after:"to the song!",bank:["Listen","Write","Look"],emoji:"👂"},
   {before:"",blank:"Look",after:"at the board!",bank:["Look","Listen","Sing"],emoji:"👀"},
   {before:"",blank:"Draw",after:"a cat in your notebook.",bank:["Draw","Read","Stand"],emoji:"🎨"},
   {before:"Put up your",blank:"hand",after:", please.",bank:["hand","book","bag"],emoji:"🙋"},
   {before:"Be",blank:"quiet",after:", please. Shh!",bank:["quiet","up","down"],emoji:"🤫"},
   {before:"",blank:"Write",after:"your name, please.",bank:["Write","Sing","Sit"],emoji:"✍️"},
  ],
  tf:{sub:"Look and think! 👂📖🎤",tag:"TRUE OR FALSE?",items:[
   {text:"You listen with your ears.",answer:0},{text:"You read with your feet.",answer:1},{text:"You sing with your mouth.",answer:0},
   {text:"'Stand up' means 'usiądź'.",answer:1},{text:"You draw with crayons.",answer:0},{text:"'Be quiet' means 'shh!'.",answer:0}]},
  move:[
   {emoji:"🧍",text:"Stand up! Now sit down! Stand up again! 🧍"},{emoji:"🙋",text:"Put up your hand like in class! 🙋"},
   {emoji:"🤫",text:"Be quiet — finger on your lips. Shh! 🤫"},{emoji:"🎤",text:"Sing 'la la la' like a pop star! 🎤"},
  ],
  wordle:[["sing","🎤"],["draw","🎨"],["look","👀"],["read","📚"],["write","✍️"]]},
 grammar:{title:"What is this?",emoji:"❓",label:"What is this?",intro:"What is this? It's a pen! Is it a book? Yes, it is — or no, it isn't!",boxTitle:"What is this? It's a…",
  html:`<p>Ask about a thing with <b>What is this?</b> Answer with <b>It's a… / It's an…</b></p>${TBL(["Question","Answer"],[["<b>What is this?</b> 🖊️","<b>It's a</b> pen."],["<b>What is this?</b> 💻","<b>It's a</b> computer."],["<b>Is it a</b> book? 📕","<b>Yes, it is.</b>"],["<b>Is it a</b> ruler? ✂️","<b>No, it isn't.</b> It's scissors!"]])}<p style="margin-top:12px;">Far away? Use <b>that</b>: <b>What is that?</b> 👉</p>`,
  quizTag:"ASK AND ANSWER",quiz:[
   {q:"What ___ this?",opts:["is","are","am"],correct:0},{q:"___ a pencil.",opts:["It's","Is","It"],correct:0},
   {q:"Is it a book? — Yes, it ___.",opts:["is","isn't","it"],correct:0},{q:"Is it a pen? — No, it ___.",opts:["isn't","is","not"],correct:0},
   {q:"It's ___ ruler.",opts:["a","an"],correct:0},{q:"It's ___ orange.",opts:["an","a"],correct:0},
   {q:"🖍️ What is this?",opts:["It's a crayon.","It's a bag.","It's a desk."],correct:0},{q:"📓 Is it a book?",opts:["No, it isn't. It's a notebook.","Yes, it is a desk.","It's a cat."],correct:0},
  ],
  fill:[
   {before:"What is",blank:"this",after:"? 🖊️",bank:["this","it","is"],emoji:"❓"},
   {before:"",blank:"It's",after:"a pen.",bank:["It's","Is","This"],emoji:"🖊️"},
   {before:"",blank:"Is",after:"it a bag?",bank:["Is","It","Are"],emoji:"🎒"},
   {before:"Yes, it",blank:"is",after:".",bank:["is","isn't","it's"],emoji:"✅"},
   {before:"No, it",blank:"isn't",after:". It's a ruler.",bank:["isn't","is","not"],emoji:"📏"},
   {before:"It's",blank:"a",after:"desk.",bank:["a","an"],emoji:"🪑📚"},
   {before:"What is",blank:"that",after:"? 👉",bank:["that","a","are"],emoji:"👉"},
   {before:"It's",blank:"an",after:"apple!",bank:["an","a"],emoji:"🍎"},
  ],
  build:[
   {s:"What is this?",pl:"Co to jest?"},{s:"It is a pencil.",pl:"To jest ołówek."},
   {s:"Is it a book?",pl:"Czy to jest książka?"},{s:"Yes, it is.",pl:"Tak."},{s:"No, it isn't.",pl:"Nie."},
  ],
  errors:[
   {s:"What are this?",wrong:1,ok:"What is this?"},
   {s:"It's an pen.",wrong:1,ok:"It's a pen."},
   {s:"Is it a bag? Yes, it isn't.",wrong:6,ok:"Is it a bag? Yes, it is."},
   {s:"It a ruler.",wrong:0,ok:"It's a ruler."},
   {s:"Is this a apple?",wrong:2,ok:"Is this an apple?"},
  ],
  whack:[
   {q:"What ___ this? 🖊️",opts:["is","are"],correct:0},{q:"It's ___ book 📕",opts:["a","an"],correct:0},
   {q:"Is it a bag? — Yes, it ___.",opts:["is","isn't"],correct:0},{q:"It's ___ egg 🥚",opts:["an","a"],correct:0},
   {q:"Is it a pen? ✂️ — No, it ___.",opts:["isn't","is"],correct:0},
  ],
  wordle:[["this","👉"],["desk","🪑📚"],["bag","🎒"],["what","❓"]]},
 reading:{title:"Leo goes to school",emoji:"🏫",intro:"Read about Leo's first day at school, then answer, translate and write about your school bag!",storyTitle:"Leo's First Day at School",paras:[
   "<b>Leo's First Day at School</b> 🏫",
   "It's Monday. Leo has got a new bag. It's green and blue. In his bag there is a pencil, a ruler, a rubber and three crayons.",
   "The teacher is Miss Rose. 'Good morning, class! Sit down, please,' she says. Leo sits at his desk next to Mia.",
   "'Open your books!' says Miss Rose. Leo opens his book. 'What is this?' asks Miss Rose. 'It's a computer!' says Leo. 'Very good, Leo!'",
   "Then the children draw and sing a song. Leo puts up his hand. 'I like school!' he says. Everybody laughs. 😊",
  ],
  tf:[
   {text:"It's Monday.",answer:0},{text:"Leo's bag is red.",answer:1},{text:"There are three crayons in his bag.",answer:0},
   {text:"The teacher is Miss Rose.",answer:0},{text:"Leo sits next to Tom.",answer:1},{text:"Leo's favourite colour is green.",answer:2},{text:"The children sing a song.",answer:0}],
  quiz:[
   {q:"What colour is Leo's bag?",opts:["Green and blue","Red and yellow","Black"],correct:0},
   {q:"Who is Miss Rose?",opts:["The teacher","Leo's mum","Mia's sister"],correct:0},
   {q:"Where does Leo sit?",opts:["At his desk","On the floor","On the bus"],correct:0},
   {q:"What is in the picture?",opts:["A computer","A cat","A pencil"],correct:0},
   {q:"What does Leo say at the end?",opts:["I like school!","Goodbye!","I'm tired."],correct:0},
  ],
  typed:[
   {prompt:"Co to jest?",answers:["What is this","What's this"]},
   {prompt:"To jest długopis.",answers:["It is a pen","It's a pen","This is a pen"]},
   {prompt:"Usiądź, proszę.",answers:["Sit down please","Sit down, please","Please sit down"]},
   {prompt:"Lubię szkołę.",answers:["I like school"]},
  ],
  writing:{label:"My bag",title:"My school bag ✍️",sub:"What is in your school bag? Write (min. 20 words).",starters:["My bag is…","In my bag there is…","I have got a…","My favourite thing is…","I like school because…"],min:20},
  wordle:[["school","🏫"],["class","👧👦"],["green","🟢"],["song","🎶"]]},
 test:{grammar:[
   {q:"What ___ this?",opts:["is","are","am"],correct:0},{q:"It's ___ crayon.",opts:["a","an"],correct:0},
   {q:"Is it a pen? — Yes, it ___.",opts:["is","isn't","are"],correct:0},{q:"✂️ =",opts:["scissors","glue","ruler"],correct:0},
   {q:"🙋 =",opts:["put up your hand","sit down","be quiet"],correct:0},{q:"📏 =",opts:["ruler","rubber","pencil"],correct:0},
   {q:"🤫 =",opts:["be quiet","sing","listen"],correct:0},{q:"It's ___ orange.",opts:["an","a"],correct:0}],
  errors:[
   {s:"What is this? It's an book.",wrong:4,ok:"What is this? It's a book."},
   {s:"What are this?",wrong:1,ok:"What is this?"},
   {s:"Is it a ruler? No, it is.",wrong:6,ok:"Is it a ruler? No, it isn't."},
   {s:"Please sit up.",wrong:2,ok:"Please sit down."}],
  typed:[
   {prompt:"Wstań!",answers:["Stand up"]},
   {prompt:"To jest ołówek.",answers:["It is a pencil","It's a pencil","This is a pencil"]},
   {prompt:"Czy to jest książka?",answers:["Is it a book","Is this a book"]},
   {prompt:"Otwórz książkę.",answers:["Open your book","Open the book"]}]},
});

/* ================= KIDS A0 · My Body & Clothes ================= */
mkUnit({id:"kc0",level:"A0",track:"kids",topic:"Body & Clothes",title:"My Body & Clothes",emoji:"👕",badge:"Head-to-Toe Hero",sub:"Body parts and clothes — and 'I have got / she has got'.",
 sets:[
  {title:"My body",label:"Body",words:V([
   ["head","głowa","🗣️"],["eyes","oczy","👀"],["ears","uszy","👂"],["nose","nos","👃"],["mouth","usta","👄"],["hair","włosy","💇"],
   ["hand","dłoń, ręka","✋"],["arm","ramię, ręka","💪"],["leg","noga","🦵"],["foot","stopa","🦶"],["teeth","zęby","🦷"],["tummy","brzuszek","🤰"]])},
  {title:"Clothes",label:"Clothes",findTitle:"Which clothes? 🔎",words:V([
   ["T-shirt","koszulka","👕"],["dress","sukienka","👗"],["skirt","spódnica","🩳👧"],["trousers","spodnie","👖"],["shorts","krótkie spodenki","🩳"],["socks","skarpetki","🧦"],
   ["shoes","buty","👟"],["hat","kapelusz, czapka","👒"],["cap","czapka z daszkiem","🧢"],["jacket","kurtka","🧥"],["scarf","szalik","🧣"],["gloves","rękawiczki","🧤"]])},
 ],
 l1:{title:"Head, shoulders…",emoji:"🦵",intro:"Head, eyes, nose, hands, feet! Twelve body words — touch them as you learn!",quizTag:"WHAT IS IT?",quizLabel:"What is it?",quiz:[
   {q:"You see with your…",opts:["eyes","ears","feet"],correct:0},{q:"You hear with your…",opts:["ears","nose","hands"],correct:0},
   {q:"You smell flowers with your…",opts:["nose","mouth","leg"],correct:0},{q:"You eat with your…",opts:["mouth","ears","hair"],correct:0},
   {q:"You walk with your…",opts:["legs","arms","eyes"],correct:0},{q:"You brush your…",opts:["teeth","tummy","ears"],correct:0},
   {q:"You wave with your…",opts:["hand","foot","nose"],correct:0},{q:"Your hat goes on your…",opts:["head","foot","tummy"],correct:0},
  ],
  odd:[
   {opts:["eyes","ears","nose","socks"],odd:3,why:"Socks are clothes, not a part of your head."},
   {opts:["hand","arm","leg","hat"],odd:3,why:"A hat is clothes."},
   {opts:["foot","leg","toes","hair"],odd:3,why:"Hair is on your head — the others are at the bottom!"},
   {opts:["mouth","teeth","nose","blue"],odd:3,why:"Blue is a colour."},
  ],
  move:[
   {emoji:"🗣️",text:"Touch your head! Now touch your nose! 👃"},{emoji:"✋",text:"Clap your hands three times! 👏"},
   {emoji:"🦶",text:"Stamp your feet — one, two, three! 🦶"},{emoji:"👀",text:"Close your eyes… now open them! 👀"},
  ],
  wordle:[["head","🗣️"],["nose","👃"],["hand","✋"],["teeth","🦷"]]},
 l2:{title:"What are you wearing?",emoji:"👗",intro:"T-shirts, dresses, socks and hats! Twelve clothes words for every day.",fillTag:"CLOTHES",fill:[
   {before:"I put my",blank:"socks",after:"on my feet.",bank:["socks","hat","gloves"],emoji:"🧦"},
   {before:"I put my",blank:"hat",after:"on my head.",bank:["hat","shoes","skirt"],emoji:"👒"},
   {before:"It's cold! Put on your",blank:"scarf",after:".",bank:["scarf","shorts","T-shirt"],emoji:"🧣"},
   {before:"My",blank:"gloves",after:"keep my hands warm.",bank:["gloves","socks","cap"],emoji:"🧤"},
   {before:"Mia has got a pink",blank:"dress",after:".",bank:["dress","trousers","shoes"],emoji:"👗"},
   {before:"It's hot. I'm wearing",blank:"shorts",after:".",bank:["shorts","gloves","jacket"],emoji:"🩳"},
   {before:"My new",blank:"shoes",after:"are white.",bank:["shoes","hat","scarf"],emoji:"👟"},
   {before:"Tom's",blank:"T-shirt",after:"is red.",bank:["T-shirt","gloves","socks"],emoji:"👕"},
  ],
  tf:{sub:"Look and think! 🧦🧤🧢👗",tag:"TRUE OR FALSE?",items:[
   {text:"Socks go on your feet.",answer:0},{text:"Gloves go on your head.",answer:1},{text:"A cap goes on your head.",answer:0},
   {text:"You wear a scarf when it's cold.",answer:0},{text:"You wear shorts in the snow.",answer:1},{text:"Shoes go on your hands.",answer:1}]},
  move:[
   {emoji:"🧤",text:"Pretend to put on your gloves — brrr! 🧤"},{emoji:"🧢",text:"Put on a cap and say 'Cool!' 🧢"},
   {emoji:"👟",text:"Tie your shoes — then run on the spot! 👟"},{emoji:"🧣",text:"Wrap a scarf around your neck! 🧣"},
  ],
  wordle:[["dress","👗"],["socks","🧦"],["scarf","🧣"],["hat","👒"],["shoes","👟"]]},
 grammar:{title:"I have got blue eyes",emoji:"👀",label:"have got",intro:"I have got two hands. She has got long hair. Let's learn 'have got'!",boxTitle:"have got / has got",
  html:`<p>Use <b>have got</b> to say what is yours.</p>${TBL(["I / you / we / they","he / she / it"],[["I <b>have got</b> (I've got) a dog.","She <b>has got</b> (she's got) a cat."],["They <b>haven't got</b> hats.","He <b>hasn't got</b> a scarf."],["<b>Have</b> you <b>got</b> a pen?","<b>Has</b> she <b>got</b> long hair?"]])}<p style="margin-top:12px;">Short answers: <b>Yes, I have. / No, he hasn't.</b></p>`,
  quizTag:"HAVE OR HAS?",quiz:[
   {q:"I ___ got blue eyes.",opts:["have","has"],correct:0},{q:"She ___ got long hair.",opts:["has","have"],correct:0},
   {q:"We ___ got new shoes.",opts:["have","has"],correct:0},{q:"He ___ got a red cap.",opts:["has","have"],correct:0},
   {q:"___ you got a scarf?",opts:["Have","Has"],correct:0},{q:"___ Mia got a dress?",opts:["Has","Have"],correct:0},
   {q:"Have you got gloves? — Yes, I ___.",opts:["have","has","am"],correct:0},{q:"Has he got a hat? — No, he ___.",opts:["hasn't","haven't","isn't"],correct:0},
  ],
  fill:[
   {before:"I",blank:"have",after:"got two hands.",bank:["have","has"],emoji:"✋"},
   {before:"My sister",blank:"has",after:"got long hair.",bank:["has","have"],emoji:"💇"},
   {before:"Leo",blank:"has",after:"got a long tail.",bank:["has","have"],emoji:"🐒"},
   {before:"They",blank:"haven't",after:"got hats.",bank:["haven't","hasn't"],emoji:"👒"},
   {before:"",blank:"Have",after:"you got a jacket?",bank:["Have","Has"],emoji:"🧥"},
   {before:"He",blank:"hasn't",after:"got a scarf.",bank:["hasn't","haven't"],emoji:"🧣"},
   {before:"",blank:"Has",after:"she got brown eyes?",bank:["Has","Have"],emoji:"👀"},
   {before:"Yes, she",blank:"has",after:".",bank:["has","have","is"],emoji:"✅"},
  ],
  build:[
   {s:"I have got blue eyes.",pl:"Mam niebieskie oczy."},{s:"She has got a pink dress.",pl:"Ona ma różową sukienkę."},
   {s:"Have you got a cap?",pl:"Czy masz czapkę z daszkiem?"},{s:"He hasn't got gloves.",pl:"On nie ma rękawiczek."},{s:"We have got new shoes.",pl:"Mamy nowe buty."},
  ],
  errors:[
   {s:"She have got long hair.",wrong:1,ok:"She has got long hair."},
   {s:"I has got a dog.",wrong:1,ok:"I have got a dog."},
   {s:"Has you got a hat?",wrong:0,ok:"Have you got a hat?"},
   {s:"He haven't got socks.",wrong:1,ok:"He hasn't got socks."},
   {s:"I have got two foots.",wrong:4,ok:"I have got two feet."},
  ],
  whack:[
   {q:"I ___ got a cap 🧢",opts:["have","has"],correct:0},{q:"She ___ got a dress 👗",opts:["has","have"],correct:0},
   {q:"___ he got a scarf?",opts:["Has","Have"],correct:0},{q:"They ___ got gloves 🧤",opts:["have","has"],correct:0},
   {q:"one foot, two ___ 🦶🦶",opts:["feet","foots"],correct:0},
  ],
  wordle:[["have","✅"],["eyes","👀"],["hair","💇"],["legs","🦵"]]},
 reading:{title:"The monster party",emoji:"👾",intro:"Read about a funny monster at a party, then answer, translate and draw your own monster with words!",storyTitle:"Zog the Monster",paras:[
   "<b>Zog the Monster</b> 👾",
   "This is Zog. Zog is a funny monster. He has got three eyes, two big ears and one small nose. He has got green hair!",
   "Zog has got four arms and four hands. He hasn't got legs — he has got one big foot. Hop, hop, hop!",
   "Today Zog is at a party. He is wearing a yellow T-shirt, blue shorts and a red cap. He has got one big sock on his big foot.",
   "'I like your T-shirt!' says Leo. 'Thank you!' says Zog. He waves with his four hands. 👋👋👋👋",
  ],
  tf:[
   {text:"Zog has got three eyes.",answer:0},{text:"Zog has got two noses.",answer:1},{text:"Zog's hair is green.",answer:0},
   {text:"Zog has got two legs.",answer:1},{text:"Zog's T-shirt is yellow.",answer:0},{text:"Zog is six years old.",answer:2},{text:"Zog waves with four hands.",answer:0}],
  quiz:[
   {q:"How many eyes has Zog got?",opts:["Three","Two","Four"],correct:0},
   {q:"What colour is his hair?",opts:["Green","Blue","Red"],correct:0},
   {q:"How many arms has he got?",opts:["Four","Two","One"],correct:0},
   {q:"What is on his head?",opts:["A red cap","A yellow hat","A scarf"],correct:0},
   {q:"Where is Zog today?",opts:["At a party","At school","At the zoo"],correct:0},
  ],
  typed:[
   {prompt:"Mam niebieskie oczy.",answers:["I have got blue eyes","I've got blue eyes","I have blue eyes"]},
   {prompt:"Ona ma długie włosy.",answers:["She has got long hair","She's got long hair","She has long hair"]},
   {prompt:"Lubię twoją koszulkę.",answers:["I like your T-shirt","I like your t-shirt","I like your tshirt"]},
   {prompt:"On ma czerwoną czapkę z daszkiem.",answers:["He has got a red cap","He's got a red cap","He has a red cap"]},
  ],
  writing:{label:"My monster",title:"My monster ✍️",sub:"Invent a monster! Write about its body and clothes (min. 20 words).",starters:["My monster is called…","It has got … eyes.","It has got … hair.","It is wearing…","It hasn't got…"],min:20},
  wordle:[["party","🎉"],["funny","😂"],["arms","💪"],["foot","🦶"]]},
 test:{grammar:[
   {q:"I ___ got two ears.",opts:["have","has"],correct:0},{q:"He ___ got a jacket.",opts:["has","have"],correct:0},
   {q:"___ you got a hat?",opts:["Have","Has"],correct:0},{q:"one foot → two ___",opts:["feet","foots","feets"],correct:0},
   {q:"👃 =",opts:["nose","mouth","ear"],correct:0},{q:"🧤 =",opts:["gloves","socks","shoes"],correct:0},
   {q:"🦷 =",opts:["teeth","tummy","hair"],correct:0},{q:"Has she got a scarf? — No, she ___.",opts:["hasn't","haven't","isn't"],correct:0}],
  errors:[
   {s:"He have got green hair.",wrong:1,ok:"He has got green hair."},
   {s:"I put my gloves on my feet.",wrong:3,ok:"I put my socks on my feet."},
   {s:"Has they got caps?",wrong:0,ok:"Have they got caps?"},
   {s:"I have got two foots.",wrong:4,ok:"I have got two feet."}],
  typed:[
   {prompt:"Mam dwie ręce.",answers:["I have got two hands","I've got two hands","I have two hands","I have got two arms","I've got two arms"]},
   {prompt:"Czy masz szalik?",answers:["Have you got a scarf","Do you have a scarf"]},
   {prompt:"On nie ma czapki z daszkiem.",answers:["He hasn't got a cap","He has not got a cap","He doesn't have a cap"]},
   {prompt:"Moje buty są białe.",answers:["My shoes are white"]}]},
});

/* ================= KIDS A1 · Food I Like ================= */
mkUnit({id:"kb1",level:"A1",track:"kids",topic:"Food",title:"Food I Like",emoji:"🍎",badge:"Little Chef",sub:"Fruit, vegetables and yummy food — and 'I like / I don't like / Do you like…?'.",
 sets:[
  {title:"Fruit & vegetables",label:"Fruit & veg",words:V([
   ["apple","jabłko","🍎"],["banana","banan","🍌"],["orange","pomarańcza","🍊"],["pear","gruszka","🍐"],["strawberry","truskawka","🍓"],["grapes","winogrona","🍇"],
   ["watermelon","arbuz","🍉"],["lemon","cytryna","🍋"],["carrot","marchewka","🥕"],["tomato","pomidor","🍅"],["potato","ziemniak","🥔"],["cucumber","ogórek","🥒"]])},
  {title:"Yummy food",label:"Food",findTitle:"Which food is it? 🔎",words:V([
   ["bread","chleb","🍞"],["cheese","ser","🧀"],["milk","mleko","🥛"],["egg","jajko","🥚"],["pizza","pizza","🍕"],["chicken","kurczak","🍗"],
   ["rice","ryż","🍚"],["soup","zupa","🍲"],["cake","ciasto","🍰"],["ice cream","lody","🍦"],["chocolate","czekolada","🍫"],["sandwich","kanapka","🥪"]])},
 ],
 l1:{title:"Fruit salad",emoji:"🍓",intro:"Apples, bananas, carrots… twelve fruit and vegetables for a healthy tummy!",quizTag:"WHAT COLOUR?",quizLabel:"What colour?",quiz:[
   {q:"A banana is…",opts:["yellow","blue","black"],correct:0},{q:"A carrot is…",opts:["orange","purple","white"],correct:0},
   {q:"A strawberry is…",opts:["red","green","grey"],correct:0},{q:"A cucumber is…",opts:["green","pink","yellow"],correct:0},
   {q:"A lemon is…",opts:["yellow","red","brown"],correct:0},{q:"Grapes can be…",opts:["green or purple","blue or white","black or orange"],correct:0},
   {q:"Inside, a watermelon is…",opts:["red","blue","yellow"],correct:0},{q:"A potato is…",opts:["brown","pink","blue"],correct:0},
  ],
  odd:[
   {opts:["apple","pear","banana","carrot"],odd:3,why:"A carrot is a vegetable — the others are fruit."},
   {opts:["tomato","potato","cucumber","grapes"],odd:3,why:"Grapes are fruit — the others are vegetables."},
   {opts:["lemon","banana","pear","cheese"],odd:3,why:"Cheese isn't fruit."},
   {opts:["strawberry","apple","tomato","milk"],odd:3,why:"Milk is a drink — the others are red food."},
  ],
  move:[
   {emoji:"🍌",text:"Peel a banana and eat it — yum! 🍌"},{emoji:"🍋",text:"Taste a lemon — make a sour face! 🍋"},
   {emoji:"🍉",text:"Hold a big watermelon — it's heavy! 🍉"},{emoji:"🥕",text:"Be a rabbit eating a carrot — crunch! 🥕"},
  ],
  wordle:[["apple","🍎"],["pear","🍐"],["lemon","🍋"],["grapes","🍇"]]},
 l2:{title:"Lunchtime!",emoji:"🍕",intro:"Pizza, soup, cake and ice cream! Twelve yummy food words.",fillTag:"YUMMY FOOD",fill:[
   {before:"I drink",blank:"milk",after:"for breakfast.",bank:["milk","soup","pizza"],emoji:"🥛"},
   {before:"A",blank:"sandwich",after:"has got bread and cheese in it.",bank:["sandwich","cake","egg"],emoji:"🥪"},
   {before:"Hens give us",blank:"eggs",after:".",bank:["eggs","rice","bread"],emoji:"🥚"},
   {before:"It's my birthday! Here's a",blank:"cake",after:"!",bank:["cake","soup","milk"],emoji:"🎂"},
   {before:"",blank:"Ice cream",after:"is cold and sweet.",bank:["Ice cream","Soup","Chicken"],emoji:"🍦"},
   {before:"Hot tomato",blank:"soup",after:"— yum!",bank:["soup","milk","ice cream"],emoji:"🍲"},
   {before:"In Italy they make",blank:"pizza",after:".",bank:["pizza","rice","eggs"],emoji:"🍕"},
   {before:"Mice love",blank:"cheese",after:"!",bank:["cheese","chocolate","bread"],emoji:"🐁🧀"},
  ],
  tf:{sub:"Look and think! 🍦🍲🍞🥛",tag:"TRUE OR FALSE?",items:[
   {text:"Ice cream is hot.",answer:1},{text:"Soup is in a bowl.",answer:0},{text:"Milk is white.",answer:0},
   {text:"A sandwich has got bread.",answer:0},{text:"Chocolate is a vegetable.",answer:1},{text:"Eggs come from cows.",answer:1}]},
  move:[
   {emoji:"🍕",text:"Make a big pizza with your hands! 🍕"},{emoji:"🍦",text:"Lick an ice cream — it's cold! 🍦"},
   {emoji:"🍲",text:"The soup is hot! Blow on your spoon! 🍲"},{emoji:"🍰",text:"Sing 'Happy Birthday' and eat the cake! 🍰"},
  ],
  wordle:[["pizza","🍕"],["bread","🍞"],["soup","🍲"],["cake","🍰"],["rice","🍚"]]},
 grammar:{title:"I like pizza!",emoji:"😋",label:"like / don't like",intro:"I like pizza. I don't like soup. Do you like cake? Yes, I do!",boxTitle:"like · don't like · Do you like…?",
  html:`<p>Say what you love and what you don't with <b>like</b>.</p>${TBL(["😋 Yes","😖 No","❓ Question"],[["I <b>like</b> bananas.","I <b>don't like</b> carrots.","<b>Do</b> you <b>like</b> cheese?"],["We <b>like</b> pizza.","They <b>don't like</b> soup.","<b>Do</b> they <b>like</b> milk?"],["She <b>likes</b> cake.","He <b>doesn't like</b> eggs.","<b>Does</b> she <b>like</b> rice?"]])}<p style="margin-top:12px;">Short answers: <b>Yes, I do. / No, I don't. · Yes, she does. / No, he doesn't.</b></p><p style="margin-top:8px;">With he / she / it: <b>likes</b> (+s)!</p>`,
  quizTag:"LIKE OR LIKES?",quiz:[
   {q:"I ___ apples.",opts:["like","likes"],correct:0},{q:"She ___ ice cream.",opts:["likes","like"],correct:0},
   {q:"I ___ like soup. 😖",opts:["don't","doesn't"],correct:0},{q:"He ___ like eggs. 😖",opts:["doesn't","don't"],correct:0},
   {q:"___ you like pizza?",opts:["Do","Does"],correct:0},{q:"___ Leo like bananas?",opts:["Does","Do"],correct:0},
   {q:"Do you like cake? — Yes, I ___.",opts:["do","does","like"],correct:0},{q:"Does she like milk? — No, she ___.",opts:["doesn't","don't","isn't"],correct:0},
  ],
  fill:[
   {before:"I",blank:"like",after:"strawberries. 😋",bank:["like","likes"],emoji:"🍓"},
   {before:"Leo",blank:"likes",after:"bananas.",bank:["likes","like"],emoji:"🍌"},
   {before:"I",blank:"don't",after:"like tomatoes. 😖",bank:["don't","doesn't"],emoji:"🍅"},
   {before:"My brother",blank:"doesn't",after:"like fish.",bank:["doesn't","don't"],emoji:"🐟"},
   {before:"",blank:"Do",after:"you like chocolate?",bank:["Do","Does"],emoji:"🍫"},
   {before:"",blank:"Does",after:"your mum like coffee?",bank:["Does","Do"],emoji:"☕"},
   {before:"Yes, I",blank:"do",after:"!",bank:["do","does","like"],emoji:"✅"},
   {before:"We",blank:"like",after:"pizza on Fridays.",bank:["like","likes"],emoji:"🍕"},
  ],
  build:[
   {s:"I like ice cream.",pl:"Lubię lody."},{s:"I don't like soup.",pl:"Nie lubię zupy."},
   {s:"Do you like cheese?",pl:"Czy lubisz ser?"},{s:"She likes grapes.",pl:"Ona lubi winogrona."},{s:"He doesn't like carrots.",pl:"On nie lubi marchewki."},
  ],
  errors:[
   {s:"She like pizza.",wrong:1,ok:"She likes pizza."},
   {s:"I doesn't like milk.",wrong:1,ok:"I don't like milk."},
   {s:"Does you like cake?",wrong:0,ok:"Do you like cake?"},
   {s:"He don't like eggs.",wrong:1,ok:"He doesn't like eggs."},
   {s:"Do you like apples? Yes, I like.",wrong:6,ok:"Do you like apples? Yes, I do."},
  ],
  whack:[
   {q:"I ___ cake 🍰",opts:["like","likes"],correct:0},{q:"Mia ___ grapes 🍇",opts:["likes","like"],correct:0},
   {q:"___ you like rice?",opts:["Do","Does"],correct:0},{q:"He ___ like soup 😖",opts:["doesn't","don't"],correct:0},
   {q:"Yes, I ___!",opts:["do","does"],correct:0},
  ],
  wordle:[["like","😋"],["yummy","😋"],["milk","🥛"],["egg","🥚"]]},
 reading:{title:"Leo's picnic",emoji:"🧺",intro:"Read about Leo's picnic in the park, then answer, translate and write about the food you like!",storyTitle:"A Picnic in the Park",paras:[
   "<b>A Picnic in the Park</b> 🧺",
   "It's Saturday and it's sunny. Leo and Mia are in the park. They have got a big picnic basket.",
   "In the basket there are sandwiches, apples, grapes and a big chocolate cake. There is a bottle of milk, too.",
   "Mia likes cheese sandwiches. Leo doesn't like cheese — he likes banana sandwiches! 'Banana sandwiches? Yuck!' laughs Mia.",
   "Then a dog comes. It likes sandwiches too! It takes Mia's sandwich and runs away. 'Come back!' shouts Mia. Leo gives her a banana sandwich. 'Thanks, Leo… it's yummy!' 🍌",
  ],
  tf:[
   {text:"It's Saturday.",answer:0},{text:"It's raining.",answer:1},{text:"There is a chocolate cake in the basket.",answer:0},
   {text:"Leo likes cheese.",answer:1},{text:"Mia likes cheese sandwiches.",answer:0},{text:"The dog's name is Rex.",answer:2},{text:"At the end Mia likes the banana sandwich.",answer:0}],
  quiz:[
   {q:"Where are Leo and Mia?",opts:["In the park","At school","At home"],correct:0},
   {q:"What fruit is in the basket?",opts:["Apples and grapes","Pears and lemons","Oranges"],correct:0},
   {q:"What sandwiches does Leo like?",opts:["Banana","Cheese","Chicken"],correct:0},
   {q:"Who takes Mia's sandwich?",opts:["A dog","Leo","A bird"],correct:0},
   {q:"What drink have they got?",opts:["Milk","Juice","Water"],correct:0},
  ],
  typed:[
   {prompt:"Lubię jabłka.",answers:["I like apples"]},
   {prompt:"Nie lubię sera.",answers:["I don't like cheese","I do not like cheese"]},
   {prompt:"Czy lubisz pizzę?",answers:["Do you like pizza"]},
   {prompt:"Ona lubi lody.",answers:["She likes ice cream"]},
  ],
  writing:{label:"My food",title:"Food I like ✍️",sub:"What food do you like and not like? Write (min. 25 words).",starters:["I like…","I really like…","I don't like…","My favourite fruit is…","My mum / dad likes…","For breakfast I…"],min:25},
  wordle:[["picnic","🧺"],["park","🌳"],["sunny","☀️"],["yuck","🤢"]]},
 test:{grammar:[
   {q:"I ___ grapes.",opts:["like","likes"],correct:0},{q:"He ___ chocolate.",opts:["likes","like"],correct:0},
   {q:"___ you like soup?",opts:["Do","Does"],correct:0},{q:"She ___ like carrots.",opts:["doesn't","don't"],correct:0},
   {q:"🍐 =",opts:["pear","apple","lemon"],correct:0},{q:"🥒 =",opts:["cucumber","carrot","potato"],correct:0},
   {q:"🍚 =",opts:["rice","bread","soup"],correct:0},{q:"Does he like eggs? — Yes, he ___.",opts:["does","do","likes"],correct:0}],
  errors:[
   {s:"Mia like bananas.",wrong:1,ok:"Mia likes bananas."},
   {s:"I don't likes soup.",wrong:2,ok:"I don't like soup."},
   {s:"Do she like cake?",wrong:0,ok:"Does she like cake?"},
   {s:"A carrot is a fruit.",wrong:4,ok:"A carrot is a vegetable."}],
  typed:[
   {prompt:"Lubię truskawki.",answers:["I like strawberries"]},
   {prompt:"On nie lubi pomidorów.",answers:["He doesn't like tomatoes","He does not like tomatoes"]},
   {prompt:"Czy Leo lubi banany?",answers:["Does Leo like bananas"]},
   {prompt:"Tak, lubię.",answers:["Yes, I do","Yes I do"]}]},
});

/* ================= KIDS A1 · My House ================= */
mkUnit({id:"kc1",level:"A1",track:"kids",topic:"Home",title:"My House",emoji:"🏡",badge:"Home Explorer",sub:"Rooms and furniture — and 'there is / there are' with in, on, under.",
 sets:[
  {title:"Rooms & places",label:"Rooms",words:V([
   ["house","dom","🏠"],["flat","mieszkanie","🏢"],["kitchen","kuchnia","🍳"],["bedroom","sypialnia","🛌"],["bathroom","łazienka","🛁"],["living room","salon, pokój dzienny","📺🛋️"],
   ["garden","ogród","🌷"],["garage","garaż","🚗🏠"],["door","drzwi","🚪"],["window","okno","🪟"],["stairs","schody","🪜"],["toilet","toaleta","🚽"]])},
  {title:"Things at home",label:"Things",findTitle:"What's in the room? 🔎",words:V([
   ["bed","łóżko","🛏️"],["sofa","kanapa","🛋️"],["chair","krzesło","🪑"],["table","stół","🍽️"],["lamp","lampa","💡"],["clock","zegar","🕰️"],
   ["mirror","lustro","🪞"],["TV","telewizor","📺"],["bookcase","regał na książki","📚"],["plant","roślina","🪴"],["shower","prysznic","🚿"],["fridge","lodówka","🧊🥛"]])},
 ],
 l1:{title:"Come in!",emoji:"🚪",intro:"Kitchen, bedroom, bathroom, garden… let's walk around the house!",quizTag:"WHERE ARE YOU?",quizLabel:"Where are you?",quiz:[
   {q:"You cook dinner in the…",opts:["kitchen","bedroom","garage"],correct:0},{q:"You sleep in the…",opts:["bedroom","kitchen","garden"],correct:0},
   {q:"You have a bath in the…",opts:["bathroom","living room","garage"],correct:0},{q:"You watch TV in the…",opts:["living room","bathroom","stairs"],correct:0},
   {q:"Flowers grow in the…",opts:["garden","kitchen","toilet"],correct:0},{q:"Dad's car is in the…",opts:["garage","bedroom","window"],correct:0},
   {q:"You go up the ___ to your room.",opts:["stairs","door","garden"],correct:0},{q:"You look out of the…",opts:["window","toilet","sofa"],correct:0},
  ],
  odd:[
   {opts:["kitchen","bedroom","bathroom","banana"],odd:3,why:"A banana isn't a room!"},
   {opts:["door","window","stairs","cat"],odd:3,why:"A cat is an animal — the others are parts of a house."},
   {opts:["house","flat","garage","garden"],odd:3,why:"A garden is outside, with plants — you don't live in it."},
   {opts:["bathroom","toilet","shower","garage"],odd:3,why:"The others are about washing — a garage is for the car."},
  ],
  move:[
   {emoji:"🚪",text:"Knock on the door — knock, knock! 🚪"},{emoji:"🪜",text:"Walk up the stairs — big steps! 🪜"},
   {emoji:"🍳",text:"Cook in the kitchen — stir the pot! 🍳"},{emoji:"🛌",text:"Go to bed in your bedroom — snore! 😴"},
  ],
  wordle:[["house","🏠"],["door","🚪"],["flat","🏢"],["garden","🌷"]]},
 l2:{title:"In my room",emoji:"🛏️",intro:"Bed, lamp, sofa, mirror… twelve things you find at home.",fillTag:"AT HOME",fill:[
   {before:"I sleep in my",blank:"bed",after:".",bank:["bed","fridge","clock"],emoji:"🛏️"},
   {before:"The milk is in the",blank:"fridge",after:".",bank:["fridge","bookcase","shower"],emoji:"🧊🥛"},
   {before:"I look in the",blank:"mirror",after:"and brush my hair.",bank:["mirror","TV","plant"],emoji:"🪞"},
   {before:"Dad sits on the",blank:"sofa",after:"and watches TV.",bank:["sofa","lamp","table"],emoji:"🛋️"},
   {before:"My books are on the",blank:"bookcase",after:".",bank:["bookcase","shower","bed"],emoji:"📚"},
   {before:"It's dark. Turn on the",blank:"lamp",after:"!",bank:["lamp","chair","mirror"],emoji:"💡"},
   {before:"What time is it? Look at the",blank:"clock",after:".",bank:["clock","fridge","sofa"],emoji:"🕰️"},
   {before:"We eat dinner at the",blank:"table",after:".",bank:["table","plant","shower"],emoji:"🍽️"},
  ],
  tf:{sub:"Look and think! 🛏️🧊🚿📺",tag:"TRUE OR FALSE?",items:[
   {text:"A fridge is cold.",answer:0},{text:"You sleep in the shower.",answer:1},{text:"A plant is green.",answer:0},
   {text:"You watch the TV.",answer:0},{text:"A clock tells you the time.",answer:0},{text:"A sofa is in the bathroom.",answer:1}]},
  move:[
   {emoji:"🚿",text:"Have a shower — wash your hair! 🚿"},{emoji:"🪞",text:"Look in the mirror and smile! 🪞"},
   {emoji:"🛋️",text:"Sit on the sofa and relax! 🛋️"},{emoji:"🕰️",text:"Be a clock — tick tock with your arms! 🕰️"},
  ],
  wordle:[["sofa","🛋️"],["lamp","💡"],["chair","🪑"],["table","🍽️"],["clock","🕰️"]]},
 grammar:{title:"There is a cat on the bed",emoji:"🐈",label:"there is / are",intro:"There is a lamp. There are two chairs. And where is the cat? Under the table!",boxTitle:"there is · there are · in, on, under",
  html:`<p>Use <b>there is</b> for one thing and <b>there are</b> for two or more.</p>${TBL(["One","Two or more"],[["<b>There is</b> (there's) a bed.","<b>There are</b> two chairs."],["<b>There isn't</b> a TV.","<b>There aren't</b> any plants."],["<b>Is there</b> a garden?","<b>Are there</b> any books?"]])}<p style="margin-top:12px;">Where is it? <b>in</b> the box 📦 · <b>on</b> the table 🍽️ · <b>under</b> the bed 🛏️</p>`,
  quizTag:"IS OR ARE?",quiz:[
   {q:"There ___ a lamp in my room.",opts:["is","are"],correct:0},{q:"There ___ three chairs.",opts:["are","is"],correct:0},
   {q:"There ___ a garden. 🙁",opts:["isn't","aren't"],correct:0},{q:"___ there a TV?",opts:["Is","Are"],correct:0},
   {q:"___ there any books?",opts:["Are","Is"],correct:0},{q:"The cat is ___ the bed. (🛏️ ⬇️)",opts:["under","on","in"],correct:0},
   {q:"The milk is ___ the fridge.",opts:["in","under","on"],correct:0},{q:"The book is ___ the table. (🍽️ ⬆️)",opts:["on","in","under"],correct:0},
  ],
  fill:[
   {before:"There",blank:"is",after:"a mirror in the bathroom.",bank:["is","are"],emoji:"🪞"},
   {before:"There",blank:"are",after:"two beds in my bedroom.",bank:["are","is"],emoji:"🛏️"},
   {before:"There",blank:"isn't",after:"a garage.",bank:["isn't","aren't"],emoji:"🚗🏠"},
   {before:"",blank:"Are",after:"there any plants?",bank:["Are","Is"],emoji:"🪴"},
   {before:"The cat is",blank:"under",after:"the table.",bank:["under","on","at"],emoji:"🐈"},
   {before:"My books are",blank:"on",after:"the bookcase.",bank:["on","under","at"],emoji:"📚"},
   {before:"The cheese is",blank:"in",after:"the fridge.",bank:["in","on","under"],emoji:"🧀"},
   {before:"Is there a TV? Yes, there",blank:"is",after:".",bank:["is","are","isn't"],emoji:"📺"},
  ],
  build:[
   {s:"There is a lamp in my room.",pl:"W moim pokoju jest lampa."},{s:"There are two chairs.",pl:"Są dwa krzesła."},
   {s:"Is there a garden?",pl:"Czy jest ogród?"},{s:"The cat is under the bed.",pl:"Kot jest pod łóżkiem."},{s:"There isn't a TV.",pl:"Nie ma telewizora."},
  ],
  errors:[
   {s:"There are a sofa.",wrong:1,ok:"There is a sofa."},
   {s:"There is three chairs.",wrong:1,ok:"There are three chairs."},
   {s:"Is there any books?",wrong:0,ok:"Are there any books?"},
   {s:"The milk is on the fridge.",wrong:3,ok:"The milk is in the fridge."},
   {s:"There aren't a garden.",wrong:1,ok:"There isn't a garden."},
  ],
  whack:[
   {q:"There ___ a bed 🛏️",opts:["is","are"],correct:0},{q:"There ___ two lamps 💡💡",opts:["are","is"],correct:0},
   {q:"The ball is ___ the box 📦",opts:["in","on"],correct:0},{q:"___ there a fridge?",opts:["Is","Are"],correct:0},
   {q:"The cat is ___ the bed (⬇️)",opts:["under","on"],correct:0},
  ],
  wordle:[["there","👉"],["under","⬇️"],["room","🚪"],["bed","🛏️"]]},
 reading:{title:"Where is Leo?",emoji:"🙈",intro:"Leo is playing hide-and-seek! Read, find him, then answer, translate and write about your room.",storyTitle:"Hide and Seek",paras:[
   "<b>Hide and Seek</b> 🙈",
   "Mia and Leo are playing hide-and-seek in Mia's house. Mia counts: 'One, two, three… ten! Where are you, Leo?'",
   "Mia goes into the kitchen. There is a big table and four chairs. There is a cat under the table — but there isn't a lemur!",
   "Then she goes into the living room. There is a sofa, a TV and two plants. Is Leo behind the sofa? No, he isn't.",
   "Mia goes up the stairs to her bedroom. There is a bed, a lamp and a bookcase. And there is a long, stripy tail under the bed! 'I can see you, Leo!' 🐒",
  ],
  tf:[
   {text:"Mia counts to ten.",answer:0},{text:"There are six chairs in the kitchen.",answer:1},{text:"There is a cat under the table.",answer:0},
   {text:"There are two TVs in the living room.",answer:1},{text:"Mia's bedroom is upstairs.",answer:0},{text:"Mia's bed is pink.",answer:2},{text:"Leo is under the bed.",answer:0}],
  quiz:[
   {q:"What game are they playing?",opts:["Hide-and-seek","Football","Chess"],correct:0},
   {q:"What is under the kitchen table?",opts:["A cat","Leo","A dog"],correct:0},
   {q:"How many plants are in the living room?",opts:["Two","Four","One"],correct:0},
   {q:"Where is Mia's bedroom?",opts:["Up the stairs","Next to the kitchen","In the garden"],correct:0},
   {q:"How does Mia find Leo?",opts:["She sees his tail","She hears him sing","The cat shows her"],correct:0},
  ],
  typed:[
   {prompt:"W kuchni jest stół.",answers:["There is a table in the kitchen","There's a table in the kitchen"]},
   {prompt:"Są dwa krzesła.",answers:["There are two chairs"]},
   {prompt:"Kot jest pod łóżkiem.",answers:["The cat is under the bed","A cat is under the bed"]},
   {prompt:"Gdzie jesteś?",answers:["Where are you"]},
  ],
  writing:{label:"My room",title:"My room ✍️",sub:"Write about your room (min. 25 words). Use there is / there are and in / on / under.",starters:["In my room there is…","There are…","My bed is…","Under my bed there is…","On my desk there is…","I like my room because…"],min:25},
  wordle:[["hide","🙈"],["seek","🔎"],["tail","🐒"],["count","🔢"]]},
 test:{grammar:[
   {q:"There ___ a sofa.",opts:["is","are"],correct:0},{q:"There ___ four chairs.",opts:["are","is"],correct:0},
   {q:"___ there a garden?",opts:["Is","Are"],correct:0},{q:"The shoes are ___ the bed. (⬇️)",opts:["under","on","in"],correct:0},
   {q:"🍳 =",opts:["kitchen","bedroom","garage"],correct:0},{q:"🪞 =",opts:["mirror","window","lamp"],correct:0},
   {q:"🪜 =",opts:["stairs","door","table"],correct:0},{q:"Are there any plants? — Yes, there ___.",opts:["are","is","have"],correct:0}],
  errors:[
   {s:"There are a lamp.",wrong:1,ok:"There is a lamp."},
   {s:"There is two beds.",wrong:1,ok:"There are two beds."},
   {s:"I sleep in the kitchen.",wrong:4,ok:"I sleep in the bedroom."},
   {s:"Is there any chairs?",wrong:0,ok:"Are there any chairs?"}],
  typed:[
   {prompt:"W łazience jest prysznic.",answers:["There is a shower in the bathroom","There's a shower in the bathroom"]},
   {prompt:"Czy jest garaż?",answers:["Is there a garage"]},
   {prompt:"Moje książki są na regale.",answers:["My books are on the bookcase"]},
   {prompt:"Nie ma telewizora.",answers:["There isn't a TV","There is no TV","There is not a TV"]}]},
});

/* ================= KIDS A2 · Sports & Hobbies ================= */
mkUnit({id:"kb2",level:"A2",track:"kids",topic:"Sports & Hobbies",title:"Sports & Hobbies",emoji:"⚽",badge:"Super Sporty",sub:"Sports, hobbies, play / go / do — and the Present Continuous: 'I'm playing!'.",
 sets:[
  {title:"Sports",label:"Sports",words:V([
   ["football","piłka nożna","⚽"],["basketball","koszykówka","🏀"],["tennis","tenis","🎾"],["volleyball","siatkówka","🏐"],["swimming","pływanie","🏊"],["cycling","jazda na rowerze","🚴"],
   ["skiing","jazda na nartach","⛷️"],["ice skating","jazda na łyżwach","⛸️"],["running","bieganie","🏃"],["gymnastics","gimnastyka","🤸"],["karate","karate","🥋"],["table tennis","tenis stołowy","🏓"]])},
  {title:"Hobbies",label:"Hobbies",findTitle:"Which hobby is it? 🔎",words:V([
   ["play the guitar","grać na gitarze","🎸"],["play the piano","grać na pianinie","🎹"],["paint","malować","🎨"],["take photos","robić zdjęcia","📷"],["play chess","grać w szachy","♟️"],["dance","tańczyć","💃"],
   ["sing","śpiewać","🎤"],["cook","gotować","🧑‍🍳"],["read comics","czytać komiksy","💬📖"],["play video games","grać w gry wideo","🎮"],["build models","budować modele","🧱"],["ride a skateboard","jeździć na deskorolce","🛹"]])},
 ],
 l1:{title:"Let's play!",emoji:"🏀",intro:"Football, tennis, swimming, karate… twelve sports — and when we say play, go or do.",quizTag:"PLAY, GO OR DO?",quizLabel:"Play, go or do?",quiz:[
   {q:"I ___ football.",opts:["play","go","do"],correct:0},{q:"I ___ swimming.",opts:["go","play","do"],correct:0},
   {q:"I ___ karate.",opts:["do","play","go"],correct:0},{q:"We ___ basketball.",opts:["play","do","go"],correct:0},
   {q:"They ___ skiing in winter.",opts:["go","play","do"],correct:0},{q:"She ___ gymnastics.",opts:["does","plays","goes"],correct:0},
   {q:"You need a bike for…",opts:["cycling","tennis","karate"],correct:0},{q:"You need ice for…",opts:["ice skating","volleyball","running"],correct:0},
  ],
  odd:[
   {opts:["football","basketball","volleyball","swimming"],odd:3,why:"Swimming doesn't use a ball."},
   {opts:["skiing","ice skating","snowboarding","surfing"],odd:3,why:"Surfing is in the sea — the others are winter sports."},
   {opts:["tennis","table tennis","badminton","karate"],odd:3,why:"Karate doesn't use a racket."},
   {opts:["running","cycling","swimming","chess"],odd:3,why:"Chess isn't a sport where you move your body much!"},
  ],
  move:[
   {emoji:"⚽",text:"Kick a ball — GOAL! ⚽"},{emoji:"🏊",text:"Swim on the spot with your arms! 🏊"},
   {emoji:"🥋",text:"Do a karate move — hi-ya! 🥋"},{emoji:"⛷️",text:"Ski down a mountain — bend your knees! ⛷️"},
  ],
  wordle:[["tennis","🎾"],["karate","🥋"],["skiing","⛷️"],["run","🏃"]]},
 l2:{title:"My hobbies",emoji:"🎸",intro:"Guitar, painting, chess, video games… twelve hobbies for your free time!",fillTag:"HOBBIES",fill:[
   {before:"I play the",blank:"guitar",after:"in a band.",bank:["guitar","chess","photos"],emoji:"🎸"},
   {before:"My sister likes to",blank:"paint",after:"pictures of animals.",bank:["paint","cook","dance"],emoji:"🎨"},
   {before:"Grandpa and I play",blank:"chess",after:"on Sundays.",bank:["chess","piano","comics"],emoji:"♟️"},
   {before:"I take",blank:"photos",after:"with my phone.",bank:["photos","models","games"],emoji:"📷"},
   {before:"Tom can",blank:"ride",after:"a skateboard very fast.",bank:["ride","read","sing"],emoji:"🛹"},
   {before:"We",blank:"dance",after:"to our favourite songs.",bank:["dance","paint","cook"],emoji:"💃"},
   {before:"Mia plays the",blank:"piano",after:"every day.",bank:["piano","chess","video games"],emoji:"🎹"},
   {before:"I",blank:"cook",after:"pancakes with my dad.",bank:["cook","build","sing"],emoji:"🥞"},
  ],
  tf:{sub:"Look and think! 🎸♟️🎨🛹",tag:"TRUE OR FALSE?",items:[
   {text:"You play chess on a board.",answer:0},{text:"You paint with a guitar.",answer:1},{text:"A skateboard has got wheels.",answer:0},
   {text:"You take photos with a camera.",answer:0},{text:"You read comics with your ears.",answer:1},{text:"You need a kitchen to cook.",answer:0}]},
  move:[
   {emoji:"🎸",text:"Play the air guitar — rock star! 🎸"},{emoji:"🎹",text:"Play the piano with all your fingers! 🎹"},
   {emoji:"📷",text:"Take a photo of your friend — say 'cheese!' 📷"},{emoji:"💃",text:"Dance for ten seconds! 💃"},
  ],
  wordle:[["chess","♟️"],["paint","🎨"],["dance","💃"],["piano","🎹"],["cook","🧑‍🍳"]]},
 grammar:{title:"I'm playing football!",emoji:"⚽",label:"Present Continuous",intro:"What are you doing now? I'm playing! She's dancing! The Present Continuous for right now.",boxTitle:"Present Continuous — right now!",
  html:`<p>Use the <b>Present Continuous</b> for things happening <b>now</b>: <b>am / is / are + verb-ing</b>.</p>${TBL(["Positive","Negative","Question"],[["I <b>am</b> (I'm) play<b>ing</b>.","I'm <b>not</b> play<b>ing</b>.","<b>Am</b> I winning?"],["You / We / They <b>are</b> swimm<b>ing</b>.","They <b>aren't</b> danc<b>ing</b>.","<b>Are</b> you paint<b>ing</b>?"],["He / She / It <b>is</b> runn<b>ing</b>.","She <b>isn't</b> sing<b>ing</b>.","<b>Is</b> he cook<b>ing</b>?"]])}<p style="margin-top:12px;">Spelling: dance → danc<b>ing</b> · swim → swi<b>mm</b>ing · run → ru<b>nn</b>ing</p><p style="margin-top:8px;"><b>What are you doing?</b> — <b>I'm reading comics.</b></p>`,
  quizTag:"RIGHT NOW!",quiz:[
   {q:"I ___ playing tennis.",opts:["am","is","are"],correct:0},{q:"She ___ dancing.",opts:["is","are","am"],correct:0},
   {q:"They ___ swimming.",opts:["are","is","am"],correct:0},{q:"swim →",opts:["swimming","swiming","swimeing"],correct:0},
   {q:"dance →",opts:["dancing","danceing","dancting"],correct:0},{q:"What ___ you doing?",opts:["are","is","do"],correct:0},
   {q:"Is he cooking? — Yes, he ___.",opts:["is","does","are"],correct:0},{q:"We ___ watching TV. We're playing!",opts:["aren't","isn't","not"],correct:0},
  ],
  fill:[
   {before:"Look! Leo",blank:"is",after:"riding a skateboard!",bank:["is","are","am"],emoji:"🛹"},
   {before:"I'm",blank:"reading",after:"a comic.",bank:["reading","read","reads"],emoji:"💬📖"},
   {before:"The children are",blank:"swimming",after:"in the pool.",bank:["swimming","swiming","swim"],emoji:"🏊"},
   {before:"Mum",blank:"isn't",after:"cooking. She's painting.",bank:["isn't","aren't","not"],emoji:"🎨"},
   {before:"",blank:"Are",after:"you playing chess?",bank:["Are","Is","Do"],emoji:"♟️"},
   {before:"Tom is",blank:"running",after:"very fast!",bank:["running","runing","runs"],emoji:"🏃"},
   {before:"What",blank:"is",after:"she doing?",bank:["is","are","does"],emoji:"❓"},
   {before:"She's",blank:"dancing",after:"to music.",bank:["dancing","danceing","dance"],emoji:"💃"},
  ],
  build:[
   {s:"I am playing football.",pl:"Gram (teraz) w piłkę nożną."},{s:"She is dancing now.",pl:"Ona teraz tańczy."},
   {s:"What are you doing?",pl:"Co robisz?"},{s:"They aren't swimming.",pl:"Oni nie pływają."},{s:"Is he playing the guitar?",pl:"Czy on gra na gitarze?"},
  ],
  errors:[
   {s:"She are dancing.",wrong:1,ok:"She is dancing."},
   {s:"I am play tennis.",wrong:2,ok:"I am playing tennis."},
   {s:"They are swiming.",wrong:2,ok:"They are swimming."},
   {s:"What you are doing?",wrong:1,ok:"What are you doing?"},
   {s:"He isn't cook now.",wrong:2,ok:"He isn't cooking now."},
  ],
  whack:[
   {q:"I ___ running 🏃",opts:["am","is"],correct:0},{q:"They ___ dancing 💃",opts:["are","is"],correct:0},
   {q:"run →",opts:["running","runing"],correct:0},{q:"Leo ___ singing 🎤",opts:["is","are"],correct:0},
   {q:"go ___ (🏊)",opts:["swimming","football"],correct:0},
  ],
  wordle:[["doing","❓"],["skate","⛸️"],["swim","🏊"],["sport","🏅"]]},
 reading:{title:"Sports day",emoji:"🏅",intro:"It's Sports Day at Leo's school! Read what everybody is doing, then answer, translate and write.",storyTitle:"Sports Day",paras:[
   "<b>Sports Day</b> 🏅",
   "It's Sports Day at Leo's school and everybody is outside. The sun is shining and the parents are watching.",
   "Look at the field! Some boys are playing football and a girl is scoring a goal. Next to them, Mia and her friends are running a race. Mia is winning!",
   "In the hall, the gymnastics team is doing cartwheels. Tom isn't doing gymnastics — he's playing table tennis with his teacher.",
   "And where is Leo? He's sitting in a tree with his camera. He's taking photos of everybody! 'Smile!' he shouts. 'This is for the school newspaper!' 📷",
  ],
  tf:[
   {text:"Sports Day is outside and inside.",answer:0},{text:"It's raining.",answer:1},{text:"Mia is winning the race.",answer:0},
   {text:"Tom is doing gymnastics.",answer:1},{text:"Tom is playing table tennis.",answer:0},{text:"Leo's camera is new.",answer:2},{text:"Leo is taking photos for the school newspaper.",answer:0}],
  quiz:[
   {q:"What's the weather like?",opts:["Sunny","Rainy","Snowy"],correct:0},
   {q:"Who is watching?",opts:["The parents","The police","Nobody"],correct:0},
   {q:"What is the gymnastics team doing?",opts:["Cartwheels","Swimming","Singing"],correct:0},
   {q:"Who is Tom playing with?",opts:["His teacher","Mia","Leo"],correct:0},
   {q:"Where is Leo?",opts:["In a tree","On the field","In the hall"],correct:0},
  ],
  typed:[
   {prompt:"Gram w tenisa.",answers:["I play tennis","I'm playing tennis","I am playing tennis"]},
   {prompt:"Ona teraz tańczy.",answers:["She is dancing now","She's dancing now"]},
   {prompt:"Co robisz?",answers:["What are you doing"]},
   {prompt:"On nie pływa.",answers:["He isn't swimming","He is not swimming","He's not swimming","He doesn't swim"]},
  ],
  writing:{label:"My free time",title:"My sports and hobbies ✍️",sub:"Write about your favourite sport and hobby (min. 30 words). What are you doing in your favourite photo?",starters:["My favourite sport is…","I play / go / do…","My hobby is…","At the weekend I…","In my photo I am…-ing…"],min:30},
  wordle:[["race","🏁"],["field","🟩"],["goal","🥅"],["team","👥"]]},
 test:{grammar:[
   {q:"I ___ swimming every Saturday.",opts:["go","play","do"],correct:0},{q:"She ___ karate.",opts:["does","plays","goes"],correct:0},
   {q:"Look! They ___ dancing.",opts:["are","is","am"],correct:0},{q:"run → ___",opts:["running","runing","runeing"],correct:0},
   {q:"🏓 =",opts:["table tennis","tennis","volleyball"],correct:0},{q:"♟️ =",opts:["play chess","play the piano","paint"],correct:0},
   {q:"What ___ he doing?",opts:["is","are","does"],correct:0},{q:"⛸️ =",opts:["ice skating","skiing","cycling"],correct:0}],
  errors:[
   {s:"I play swimming.",wrong:1,ok:"I go swimming."},
   {s:"He are playing chess.",wrong:1,ok:"He is playing chess."},
   {s:"We are danceing.",wrong:2,ok:"We are dancing."},
   {s:"She is paint a picture.",wrong:2,ok:"She is painting a picture."}],
  typed:[
   {prompt:"Gram na gitarze.",answers:["I play the guitar","I'm playing the guitar","I am playing the guitar"]},
   {prompt:"Oni grają w koszykówkę.",answers:["They play basketball","They are playing basketball","They're playing basketball"]},
   {prompt:"Czy ona maluje?",answers:["Is she painting","Does she paint"]},
   {prompt:"Chodzę na narty zimą.",answers:["I go skiing in winter","I go skiing in the winter"]}]},
});

/* ================= KIDS A2 · Weather & Seasons ================= */
mkUnit({id:"kc2",level:"A2",track:"kids",topic:"Weather",title:"Weather & Seasons",emoji:"🌦️",badge:"Weather Watcher",sub:"Weather, the four seasons — and comparing: hotter, colder, the hottest!",
 sets:[
  {title:"What's the weather like?",label:"Weather",words:V([
   ["sunny","słonecznie","☀️"],["rainy","deszczowo","🌧️"],["cloudy","pochmurno","☁️"],["windy","wietrznie","🌬️"],["snowy","śnieżnie","🌨️"],["stormy","burzowo","⛈️"],
   ["foggy","mglisto","🌫️"],["hot","gorąco","🥵"],["cold","zimno","🥶"],["warm","ciepło","🌤️"],["rainbow","tęcza","🌈"],["lightning","błyskawica","⚡"]])},
  {title:"Seasons & things",label:"Seasons",findTitle:"Which one is it? 🔎",words:V([
   ["spring","wiosna","🌸"],["summer","lato","🏖️"],["autumn","jesień","🍂"],["winter","zima","❄️"],["umbrella","parasol","☂️"],["raincoat","płaszcz przeciwdeszczowy","🧥💧"],
   ["wellies","kalosze","🥾"],["snowman","bałwan","⛄"],["kite","latawiec","🪁"],["puddle","kałuża","💦"],["leaves","liście","🍁"],["sunflower","słonecznik","🌻"]])},
 ],
 l1:{title:"What's the weather like?",emoji:"🌧️",intro:"Sunny, rainy, windy, snowy… twelve words to talk about the weather.",quizTag:"WHAT'S THE WEATHER?",quizLabel:"Weather",quiz:[
   {q:"☀️ It's…",opts:["sunny","snowy","foggy"],correct:0},{q:"🌧️ It's…",opts:["rainy","windy","hot"],correct:0},
   {q:"🌬️ It's…",opts:["windy","cloudy","warm"],correct:0},{q:"🌨️ It's…",opts:["snowy","sunny","stormy"],correct:0},
   {q:"You can't see far. It's…",opts:["foggy","sunny","hot"],correct:0},{q:"Rain + sun = a…",opts:["rainbow","snowman","kite"],correct:0},
   {q:"Thunder and lightning! It's…",opts:["stormy","warm","foggy"],correct:0},{q:"35°C! It's…",opts:["hot","cold","snowy"],correct:0},
  ],
  odd:[
   {opts:["sunny","rainy","windy","happy"],odd:3,why:"'Happy' is a feeling, not weather."},
   {opts:["hot","warm","sunny","snowy"],odd:3,why:"Snowy weather is cold!"},
   {opts:["rain","snow","fog","sun cream"],odd:3,why:"Sun cream isn't weather."},
   {opts:["cloudy","rainy","stormy","sunny"],odd:3,why:"Sunny is the only one with blue sky!"},
  ],
  move:[
   {emoji:"🌬️",text:"Be the wind — whooosh! Wave your arms! 🌬️"},{emoji:"🥶",text:"It's cold! Shiver — brrr! 🥶"},
   {emoji:"🥵",text:"It's hot! Fan your face! 🥵"},{emoji:"🌧️",text:"Make rain with your fingers — pitter-patter! 🌧️"},
  ],
  wordle:[["sunny","☀️"],["windy","🌬️"],["cold","🥶"],["foggy","🌫️"]]},
 l2:{title:"Four seasons",emoji:"🍂",intro:"Spring, summer, autumn, winter — and umbrellas, kites and snowmen!",fillTag:"SEASONS",fill:[
   {before:"In",blank:"winter",after:"we make a snowman.",bank:["winter","summer","spring"],emoji:"⛄"},
   {before:"In",blank:"autumn",after:"the leaves are red and yellow.",bank:["autumn","spring","summer"],emoji:"🍂"},
   {before:"In",blank:"spring",after:"the flowers come out.",bank:["spring","winter","autumn"],emoji:"🌸"},
   {before:"In",blank:"summer",after:"we go to the beach.",bank:["summer","winter","autumn"],emoji:"🏖️"},
   {before:"It's raining! Take your",blank:"umbrella",after:".",bank:["umbrella","kite","snowman"],emoji:"☂️"},
   {before:"It's windy — let's fly a",blank:"kite",after:"!",bank:["kite","puddle","sunflower"],emoji:"🪁"},
   {before:"I jump in the",blank:"puddle",after:"in my wellies. Splash!",bank:["puddle","rainbow","leaves"],emoji:"💦"},
   {before:"A",blank:"sunflower",after:"is very tall and yellow.",bank:["sunflower","snowman","raincoat"],emoji:"🌻"},
  ],
  tf:{sub:"Think about Poland! 🇵🇱 🌸🏖️🍂❄️",tag:"TRUE OR FALSE?",items:[
   {text:"It's cold in winter.",answer:0},{text:"It snows in summer.",answer:1},{text:"Leaves fall in autumn.",answer:0},
   {text:"You need an umbrella when it's sunny.",answer:1},{text:"You wear wellies in the rain.",answer:0},{text:"A snowman is hot.",answer:1}]},
  listen:[
   {word:"It's windy today.",options:["It's windy today.","It's Wendy today.","It's sunny today."],correct:0},
   {word:"Take your umbrella!",options:["Take your umbrella!","Take your yellow!","Make your umbrella!"],correct:0},
   {word:"I love autumn.",options:["I love autumn.","I love August.","I live in autumn."],correct:0},
  ],
  move:[
   {emoji:"⛄",text:"Build a snowman — roll a big snowball! ⛄"},{emoji:"🪁",text:"Fly a kite — hold the string and run! 🪁"},
   {emoji:"💦",text:"Jump in a puddle — SPLASH! 💦"},{emoji:"🌻",text:"Grow like a sunflower — from small to very tall! 🌻"},
  ],
  wordle:[["winter","❄️"],["kite","🪁"],["spring","🌸"],["leaves","🍁"],["summer","🏖️"]]},
 grammar:{title:"Hotter and hotter!",emoji:"🌡️",label:"Comparing",intro:"Summer is hotter than spring. Winter is the coldest season! Let's compare.",boxTitle:"Comparatives & superlatives",
  html:`<p>Compare two things with <b>-er + than</b>. For the number one, use <b>the -est</b>.</p>${TBL(["Word","Two things","Number one 🏆"],[["cold","cold<b>er</b> than","<b>the</b> cold<b>est</b>"],["hot","ho<b>tt</b>er than","<b>the</b> ho<b>tt</b>est"],["sunny","sunn<b>ier</b> than","<b>the</b> sunn<b>iest</b>"],["beautiful","<b>more</b> beautiful than","<b>the most</b> beautiful"]])}<p style="margin-top:12px;">Special: good → <b>better</b> → <b>the best</b> · bad → <b>worse</b> → <b>the worst</b></p>`,
  quizTag:"COMPARE IT!",quiz:[
   {q:"Winter is ___ than autumn.",opts:["colder","coldest","more cold"],correct:0},{q:"July is the ___ month.",opts:["hottest","hotter","hotest"],correct:0},
   {q:"Today is ___ than yesterday.",opts:["sunnier","sunnyer","more sunny"],correct:0},{q:"An elephant is ___ than a cat.",opts:["bigger","biger","more big"],correct:0},
   {q:"Spring is ___ beautiful than winter.",opts:["more","most","-er"],correct:0},{q:"good → better → the ___",opts:["best","goodest","better"],correct:0},
   {q:"This is the ___ day of the year! 🌧️🌧️",opts:["worst","baddest","worse"],correct:0},{q:"A giraffe is ___ than a dog.",opts:["taller","tallest","more tall"],correct:0},
  ],
  fill:[
   {before:"Summer is",blank:"hotter",after:"than spring.",bank:["hotter","hottest","hoter"],emoji:"🥵"},
   {before:"January is the",blank:"coldest",after:"month.",bank:["coldest","colder","most cold"],emoji:"🥶"},
   {before:"Today is",blank:"windier",after:"than yesterday.",bank:["windier","windyer","windiest"],emoji:"🌬️"},
   {before:"Autumn is the",blank:"most",after:"colourful season.",bank:["most","more","-est"],emoji:"🍂"},
   {before:"My umbrella is",blank:"bigger",after:"than your umbrella.",bank:["bigger","biger","biggest"],emoji:"☂️"},
   {before:"Summer is the",blank:"best",after:"season!",bank:["best","better","goodest"],emoji:"🏖️"},
   {before:"Rain is",blank:"better",after:"than snow for my garden.",bank:["better","best","gooder"],emoji:"🌱"},
   {before:"The sun is",blank:"hotter",after:"than the moon.",bank:["hotter","hottest","more hot"],emoji:"☀️"},
  ],
  build:[
   {s:"Winter is colder than spring.",pl:"Zima jest zimniejsza niż wiosna."},{s:"Summer is the hottest season.",pl:"Lato jest najgorętszą porą roku."},
   {s:"Today is sunnier than yesterday.",pl:"Dziś jest bardziej słonecznie niż wczoraj."},{s:"Autumn is the best season.",pl:"Jesień jest najlepszą porą roku."},{s:"My kite is bigger than yours.",pl:"Mój latawiec jest większy niż twój."},
  ],
  errors:[
   {s:"Winter is more cold than autumn.",wrong:2,ok:"Winter is colder than autumn."},
   {s:"July is the hotest month.",wrong:3,ok:"July is the hottest month."},
   {s:"Summer is better that winter.",wrong:3,ok:"Summer is better than winter."},
   {s:"Spring is the goodest season.",wrong:3,ok:"Spring is the best season."},
   {s:"Today is sunnyer than Monday.",wrong:2,ok:"Today is sunnier than Monday."},
  ],
  whack:[
   {q:"cold → ___",opts:["colder","more cold"],correct:0},{q:"hot → the ___",opts:["hottest","hotest"],correct:0},
   {q:"good → ___",opts:["better","gooder"],correct:0},{q:"big → ___",opts:["bigger","biger"],correct:0},
   {q:"Summer is hotter ___ winter.",opts:["than","that"],correct:0},
  ],
  wordle:[["colder","🥶"],["best","🏆"],["than","⚖️"],["hotter","🥵"]]},
 reading:{title:"Leo's weather report",emoji:"📺",intro:"Leo is a TV weather reporter today! Read his report, then answer, translate and write your own.",storyTitle:"Weather with Leo",paras:[
   "<b>Weather with Leo</b> 📺",
   "Good morning! I'm Leo, and this is the weather for Saturday. In the north it's cloudy and windy — the windiest day of the week! It's a great day to fly a kite. 🪁",
   "In the mountains it's snowy and very cold, minus five degrees. Wear your scarf and gloves. Maybe you can build a snowman! ⛄",
   "In the city it's rainy in the morning, so take your umbrella and your wellies. But in the afternoon the sun is coming out — look for a rainbow! 🌈",
   "And at the beach? It's warmer than in the city, but the sea is still cold. Brrr! That's all from me. Have a lovely weekend! 👋",
  ],
  tf:[
   {text:"The report is for Saturday.",answer:0},{text:"In the north it's sunny.",answer:1},{text:"It's minus five in the mountains.",answer:0},
   {text:"It's rainy in the city all day.",answer:1},{text:"Leo says you can see a rainbow in the city.",answer:0},{text:"It's colder at the beach than in the city.",answer:1},{text:"Leo's favourite season is winter.",answer:2}],
  quiz:[
   {q:"Where is it the windiest?",opts:["In the north","At the beach","In the city"],correct:0},
   {q:"What can you do in the mountains?",opts:["Build a snowman","Swim in the sea","Fly a kite"],correct:0},
   {q:"What do you need in the city in the morning?",opts:["An umbrella","Sun cream","Gloves"],correct:0},
   {q:"What happens in the afternoon in the city?",opts:["The sun comes out","It snows","It's foggy"],correct:0},
   {q:"How is the sea?",opts:["Still cold","Very hot","Warm"],correct:0},
  ],
  typed:[
   {prompt:"Jest słonecznie.",answers:["It is sunny","It's sunny"]},
   {prompt:"Weź parasol!",answers:["Take your umbrella","Take an umbrella","Take the umbrella"]},
   {prompt:"Zima jest zimniejsza niż jesień.",answers:["Winter is colder than autumn"]},
   {prompt:"Lato jest najlepszą porą roku.",answers:["Summer is the best season"]},
  ],
  writing:{label:"Weather report",title:"My weather report ✍️",sub:"Be a weather reporter! Write about today's weather and your favourite season (min. 35 words). Use -er than and the -est.",starters:["Good morning! This is the weather for…","Today it's…","It's colder / warmer than…","Take your…","My favourite season is… because…","It's the best season!"],min:35},
  wordle:[["report","📺"],["north","🧭"],["beach","🏖️"],["snowy","🌨️"]]},
 test:{grammar:[
   {q:"Winter is ___ than summer.",opts:["colder","coldest","more cold"],correct:0},{q:"It's the ___ day of the year!",opts:["hottest","hotter","hotest"],correct:0},
   {q:"good → better → ___",opts:["the best","the goodest","the better"],correct:0},{q:"🌫️ It's…",opts:["foggy","windy","sunny"],correct:0},
   {q:"🍂 =",opts:["autumn","spring","winter"],correct:0},{q:"☂️ =",opts:["umbrella","raincoat","kite"],correct:0},
   {q:"Today is ___ than yesterday.",opts:["rainier","rainyer","more rainy"],correct:0},{q:"⛈️ It's…",opts:["stormy","snowy","warm"],correct:0}],
  errors:[
   {s:"Summer is more hot than spring.",wrong:2,ok:"Summer is hotter than spring."},
   {s:"Winter is the colder season.",wrong:3,ok:"Winter is the coldest season."},
   {s:"It's raining. Take your kite!",wrong:4,ok:"It's raining. Take your umbrella!"},
   {s:"My dog is biger than your cat.",wrong:3,ok:"My dog is bigger than your cat."}],
  typed:[
   {prompt:"Jest wietrznie i zimno.",answers:["It is windy and cold","It's windy and cold"]},
   {prompt:"Latem jest gorąco.",answers:["It is hot in summer","It's hot in summer","It is hot in the summer","It's hot in the summer","In summer it is hot","In summer it's hot"]},
   {prompt:"Wiosna jest cieplejsza niż zima.",answers:["Spring is warmer than winter"]},
   {prompt:"Jaka jest pogoda?",answers:["What is the weather like","What's the weather like"]}]},
});
