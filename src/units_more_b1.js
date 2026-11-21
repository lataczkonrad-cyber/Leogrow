/* =====================================================================
   MORE TOPICS (round 2) — TEENS & ADULTS B1
   ===================================================================== */

/* ================= B1 · Travel Stories ================= */
mkUnit({id:"be1",level:"B1",track:"adults",topic:"Travel Stories",title:"Travel Stories",emoji:"🧭",badge:"Storyteller",sub:"Trips that went wrong (and right) — and the Past Continuous vs the Past Simple.",
 sets:[
  {title:"On the road",label:"Travel",words:V([
   ["journey","podróż (przejazd)","🛣️"],["trip","wycieczka, wyjazd","🧳"],["sightseeing","zwiedzanie","📸🏛️"],["guidebook","przewodnik (książka)","📘🗺️"],["backpack","plecak","🎒"],["hostel","hostel, schronisko","🛏️🏨"],
   ["luggage","bagaż","🧳🧳"],["delay","opóźnienie","⏳"],["miss a flight","spóźnić się na lot","✈️❌"],["get lost","zgubić się","❓🗺️"],["set off","wyruszyć","🚶‍♂️➡️"],["arrive","przybyć, dotrzeć","🏁"]])},
  {title:"Telling a story",label:"Story words",findTitle:"Which story word is it? 🔎",words:V([
   ["suddenly","nagle","⚡"],["meanwhile","w międzyczasie","🔀"],["eventually","w końcu, ostatecznie","🏁⏳"],["luckily","na szczęście","🍀"],["unfortunately","niestety","😞"],["at first","na początku","1️⃣"],
   ["in the end","ostatecznie, na koniec","🔚"],["as soon as","jak tylko","⏱️"],["while","podczas gdy","↔️"],["amazing view","niesamowity widok","🏔️"],["local people","miejscowi","🧑‍🤝‍🧑"],["unforgettable","niezapomniany","💫"]])},
 ],
 l1:{title:"Off we go",emoji:"🎒",intro:"Journeys, hostels, delays and getting lost — words for every trip.",quizTag:"IN CONTEXT",quizLabel:"In context",quiz:[
   {q:"A cheap place with shared rooms for young travellers:",opts:["hostel","guidebook","delay"],correct:0},{q:"Visiting famous places as a tourist:",opts:["sightseeing","luggage","set off"],correct:0},
   {q:"Your bags and suitcases:",opts:["luggage","journey","backpack"],correct:0},{q:"The train was two hours late. There was a…",opts:["delay","trip","view"],correct:0},
   {q:"We ___ at 6 a.m. to beat the traffic.",opts:["set off","arrived","got lost"],correct:0},{q:"We didn't know where we were. We…",opts:["got lost","missed a flight","arrived"],correct:0},
   {q:"The ___ from Kraków to Lisbon took 30 hours by bus.",opts:["journey","guidebook","hostel"],correct:0},{q:"We got to the airport too late and…",opts:["missed our flight","set off","arrived early"],correct:0},
  ],
  odd:[
   {opts:["hostel","hotel","campsite","luggage"],odd:3,why:"Luggage isn't a place to stay."},
   {opts:["delay","cancellation","strike","view"],odd:3,why:"A view isn't a travel problem."},
   {opts:["set off","leave","depart","arrive"],odd:3,why:"'Arrive' is the end of a journey; the others are the start."},
   {opts:["backpack","suitcase","luggage","guidebook"],odd:3,why:"A guidebook isn't a bag."},
  ],
  wordle:[["hostel","🛏️🏨"],["delay","⏳"],["trip","🧳"],["arrive","🏁"]]},
 l2:{title:"And then…",emoji:"📖",intro:"Suddenly, meanwhile, eventually, luckily — the words that make a story come alive.",fillTag:"STORY LINKERS",fill:[
   {before:"We were walking home when",blank:"suddenly",after:"it started to snow.",bank:["suddenly","eventually","meanwhile"],emoji:"⚡"},
   {before:"",blank:"Luckily",after:", a kind woman showed us the way.",bank:["Luckily","Unfortunately","At first"],emoji:"🍀"},
   {before:"",blank:"Unfortunately",after:", the museum was closed.",bank:["Unfortunately","Luckily","Eventually"],emoji:"😞"},
   {before:"We waited for hours, but",blank:"eventually",after:"the bus came.",bank:["eventually","suddenly","while"],emoji:"🏁⏳"},
   {before:"",blank:"At first",after:"I hated the food, but then I loved it.",bank:["At first","In the end","Meanwhile"],emoji:"1️⃣"},
   {before:"I was buying tickets.",blank:"Meanwhile",after:", Tom was looking for a taxi.",bank:["Meanwhile","Eventually","Luckily"],emoji:"🔀"},
   {before:"",blank:"As soon as",after:"we arrived, it started raining.",bank:["As soon as","While","At first"],emoji:"⏱️"},
   {before:"It was an",blank:"unforgettable",after:"holiday.",bank:["unforgettable","unfortunately","eventually"],emoji:"💫"},
  ],
  tf:{sub:"Read the travel post: 'Day 3 in Porto. We set off early to see the river, but our tram broke down. Luckily, a local man gave us a lift in his tiny car! The view from the bridge was amazing. In the evening we got lost in the old town — eventually we found our hostel at midnight.'",tag:"A TRAVEL POST",items:[
   {text:"It was their third day in Porto.",answer:0},{text:"The tram broke down.",answer:0},{text:"They took a taxi.",answer:1},
   {text:"A local man helped them.",answer:0},{text:"They got lost in the morning.",answer:1},{text:"They got back to the hostel late.",answer:0}]},
  listen:[
   {word:"Suddenly the lights went out.",options:["Suddenly the lights went out.","Suddenly the nights went out.","Luckily the lights went out."],correct:0},
   {word:"We eventually found our hotel.",options:["We eventually found our hotel.","We eventually found a hostel.","We actually found our hotel."],correct:0},
   {word:"We missed our flight.",options:["We missed our flight.","We missed our fight.","We kissed our flight."],correct:0},
  ],
  wordle:[["luckily","🍀"],["while","↔️"],["view","🏔️"],["story","📖"],["local","🧑‍🤝‍🧑"]]},
 grammar:{title:"I was sleeping when…",emoji:"⏸️",label:"Past Continuous",intro:"I was waiting for the bus when it started to rain — the Past Continuous and the Past Simple together.",boxTitle:"Past Continuous vs Past Simple",
  html:`<p><b>Past Continuous</b> = was / were + -ing. It sets the <b>background</b> — an action in progress.</p><p style="margin-top:8px;"><b>Past Simple</b> = a short, finished action that <b>interrupts</b> it.</p>${TBL(["Background (in progress)","Interruption"],[["I <b>was waiting</b> for the bus","when it <b>started</b> to rain."],["We <b>were driving</b> to the coast","when the car <b>broke</b> down."],["<b>While</b> she <b>was sleeping</b>,","someone <b>stole</b> her bag."]])}<p style="margin-top:12px;">Two long actions at the same time: <b>While</b> I <b>was cooking</b>, he <b>was setting</b> the table.</p><p style="margin-top:8px;"><b>when</b> + Past Simple · <b>while</b> + Past Continuous</p>`,
  quizTag:"PAST CONTINUOUS",quiz:[
   {q:"I ___ when the phone rang.",opts:["was sleeping","slept","am sleeping"],correct:0},{q:"They ___ dinner when we arrived.",opts:["were having","was having","had having"],correct:0},
   {q:"While we were walking, it ___ to snow.",opts:["started","was starting","starts"],correct:0},{q:"What ___ you doing at 8 p.m. yesterday?",opts:["were","did","was"],correct:0},
   {q:"She broke her leg while she ___.",opts:["was skiing","skied","skis"],correct:0},{q:"___ I was cooking, he was cleaning.",opts:["While","When","During"],correct:0},
   {q:"The sun ___ and the birds were singing.",opts:["was shining","shined","shines"],correct:0},{q:"We ___ a bear while we were hiking!",opts:["saw","were seeing","see"],correct:0},
  ],
  fill:[
   {before:"I",blank:"was reading",after:"when the train stopped.",bank:["was reading","read","were reading"],emoji:"📖"},
   {before:"We",blank:"were",after:"waiting at the gate when they called our names.",bank:["were","was","did"],emoji:"✈️"},
   {before:"While she was swimming, a fish",blank:"touched",after:"her leg!",bank:["touched","was touching","touches"],emoji:"🐟"},
   {before:"",blank:"While",after:"we were driving, the kids were sleeping.",bank:["While","When","During"],emoji:"🚗"},
   {before:"What were you",blank:"doing",after:"when the storm started?",bank:["doing","do","did"],emoji:"⛈️"},
   {before:"He wasn't",blank:"listening",after:"when the guide explained the route.",bank:["listening","listen","listened"],emoji:"👂"},
   {before:"I",blank:"lost",after:"my passport while I was shopping.",bank:["lost","was losing","lose"],emoji:"🛂"},
   {before:"It",blank:"was raining",after:"when we arrived in London.",bank:["was raining","rained","rains"],emoji:"🌧️"},
  ],
  build:[
   {s:"I was waiting for the bus when it started to rain.",pl:"Czekałem na autobus, kiedy zaczęło padać."},{s:"While we were walking, we saw a fox.",pl:"Kiedy szliśmy, zobaczyliśmy lisa."},
   {s:"What were you doing at ten?",pl:"Co robiłeś o dziesiątej?"},{s:"She was sleeping when the phone rang.",pl:"Spała, kiedy zadzwonił telefon."},{s:"They weren't listening to the guide.",pl:"Nie słuchali przewodnika."},
  ],
  errors:[
   {s:"I was sleep when you called.",wrong:2,ok:"I was sleeping when you called."},
   {s:"They was walking in the park.",wrong:1,ok:"They were walking in the park."},
   {s:"While I cooked, the phone was ringing.",wrong:2,ok:"While I was cooking, the phone rang."},
   {s:"When we were arriving, it was dark.",wrong:3,ok:"When we arrived, it was dark."},
   {s:"What did you doing at 9 p.m.?",wrong:1,ok:"What were you doing at 9 p.m.?"},
  ],
  whack:[
   {q:"I ___ reading.",opts:["was","were"],correct:0},{q:"We ___ talking.",opts:["were","was"],correct:0},
   {q:"___ + Past Continuous",opts:["while","when"],correct:0},{q:"It ___ when I woke up.",opts:["was snowing","snowed"],correct:0},
   {q:"Interruption → ___",opts:["Past Simple","Past Continuous"],correct:0},
  ],
  wordle:[["was","⏸️"],["were","⏸️"],["when","❓"],["walking","🚶"]]},
 reading:{title:"The worst trip ever",emoji:"🌋",intro:"Read a funny story about a trip where everything went wrong, then answer, translate and tell your own travel story.",storyTitle:"The Worst (Best) Trip Ever",label:"Story",paras:[
   "<b>The Worst (Best) Trip Ever</b> 🌋",
   "Two summers ago, my friend Ola and I decided to visit Iceland. We booked cheap flights, packed our backpacks and set off full of energy. Unfortunately, the problems started at the airport: while we were queuing at check-in, Ola realised she had left her passport at home.",
   "Luckily, her brother drove it to the airport just in time. We were running to the gate when we heard the announcement: our flight had a four-hour delay. We spent the night sleeping on the floor of the terminal.",
   "In Iceland, things didn't get much better. On our second day we were driving to a waterfall when the car got a flat tyre in the middle of nowhere. It was raining, the wind was blowing, and neither of us knew how to change a tyre.",
   "Eventually, a farmer stopped and helped us. He invited us to his house for hot soup, and his daughter showed us a hidden hot spring that wasn't in any guidebook. Sitting in that warm water under the northern lights, we laughed about everything. It was the worst trip ever — and also the most unforgettable.",
  ],
  tf:[
   {text:"They went to Iceland two summers ago.",answer:0},{text:"Ola forgot her ticket.",answer:1},{text:"Their flight was delayed.",answer:0},
   {text:"They slept in a hotel near the airport.",answer:1},{text:"The car broke down on the way to a waterfall.",answer:0},{text:"The farmer's name was Jón.",answer:2},{text:"They saw the northern lights.",answer:0}],
  quiz:[
   {q:"What happened while they were queuing at check-in?",opts:["Ola realised she had no passport","They missed the flight","They lost their bags"],correct:0},
   {q:"Who brought the passport?",opts:["Ola's brother","A farmer","A taxi driver"],correct:0},
   {q:"What was the weather like when the tyre went flat?",opts:["Rainy and windy","Sunny","Snowy"],correct:0},
   {q:"What did the farmer's daughter show them?",opts:["A hidden hot spring","A waterfall","A hostel"],correct:0},
   {q:"How does the writer feel about the trip now?",opts:["It was unforgettable","She regrets it","She was bored"],correct:0},
  ],
  typed:[
   {prompt:"Spaliśmy, kiedy zadzwonił budzik.",answers:["We were sleeping when the alarm rang","We were sleeping when the alarm went off"]},
   {prompt:"Niestety zgubiliśmy się.",answers:["Unfortunately, we got lost","Unfortunately we got lost"]},
   {prompt:"Co robiłeś wczoraj o ósmej?",answers:["What were you doing at eight yesterday","What were you doing yesterday at eight","What were you doing at 8 yesterday","What were you doing yesterday at 8"]},
   {prompt:"W końcu dotarliśmy do hotelu.",answers:["Eventually we arrived at the hotel","Eventually, we arrived at the hotel","Eventually we got to the hotel","Eventually, we got to the hotel","In the end we arrived at the hotel","In the end, we arrived at the hotel"]},
  ],
  writing:{label:"Your story",title:"A trip to remember ✍️",sub:"Tell the story of a trip where something went wrong (min. 90 words). Use the Past Continuous and Past Simple together, and at least four story linkers.",starters:["Last year I went to…","At first, everything was…","We were … -ing when suddenly…","Unfortunately, …","Luckily, …","In the end, …"],min:90},
  wordle:[["tyre","🛞"],["farmer","👨‍🌾"],["spring","♨️"],["queue","🧍🧍"]]},
 test:{grammar:[
   {q:"I ___ TV when you called.",opts:["was watching","watched","watch"],correct:0},{q:"While they ___, it started to snow.",opts:["were skiing","skied","was skiing"],correct:0},
   {q:"She ___ her phone while she was running.",opts:["dropped","was dropping","drops"],correct:0},{q:"___ we were in Rome, we visited the Colosseum.",opts:["While","During","Meanwhile"],correct:0},
   {q:"At last, after a long time:",opts:["eventually","suddenly","meanwhile"],correct:0},{q:"To start a journey:",opts:["set off","get lost","arrive"],correct:0},
   {q:"Bags and suitcases:",opts:["luggage","journey","guidebook"],correct:0},{q:"What ___ she doing?",opts:["was","were","did"],correct:0}],
  errors:[
   {s:"We was driving when it happened.",wrong:1,ok:"We were driving when it happened."},
   {s:"I was walk to the station.",wrong:2,ok:"I was walking to the station."},
   {s:"While I was eating, he was calling me.",wrong:6,ok:"While I was eating, he called me."},
   {s:"We got lost and eventually we never arrived.",wrong:4,ok:"We got lost and eventually we arrived."}],
  typed:[
   {prompt:"Padało, kiedy wylądowaliśmy.",answers:["It was raining when we landed"]},
   {prompt:"Zgubiłem paszport, kiedy robiłem zakupy.",answers:["I lost my passport while I was shopping","I lost my passport when I was shopping"]},
   {prompt:"Na szczęście pociąg nie miał opóźnienia.",answers:["Luckily, the train wasn't late","Luckily the train wasn't late","Luckily, the train wasn't delayed","Luckily the train wasn't delayed","Luckily, there was no delay","Luckily there was no delay"]},
   {prompt:"Wyruszyliśmy wcześnie rano.",answers:["We set off early in the morning"]}]},
});

/* ================= B1 · Food & Cooking ================= */
mkUnit({id:"bf1",level:"B1",track:"adults",topic:"Cooking",title:"Food & Cooking",emoji:"🍳",badge:"Home Chef",sub:"Cooking verbs, tastes and recipes — and too / enough, a lot of, a few, a little.",
 sets:[
  {title:"In the kitchen",label:"Cooking",words:V([
   ["chop","siekać, kroić","🔪"],["boil","gotować (we wrzątku)","♨️"],["fry","smażyć","🍳"],["bake","piec","🥧"],["grill","grillować","🔥🥩"],["roast","piec (mięso, warzywa)","🍗"],
   ["stir","mieszać","🥄"],["peel","obierać","🥔🔪"],["grate","trzeć (na tarce)","🧀"],["slice","kroić w plasterki","🍞🔪"],["add","dodać","➕"],["serve","podać (danie)","🍽️"]])},
  {title:"Taste & texture",label:"Taste",findTitle:"Which taste is it? 🔎",words:V([
   ["spicy","ostry","🌶️"],["sweet","słodki","🍯"],["sour","kwaśny","🍋"],["salty","słony","🧂"],["bitter","gorzki","☕"],["crispy","chrupiący","🥓"],
   ["juicy","soczysty","🍑"],["tasty","smaczny","😋"],["bland","mdły, bez smaku","😐"],["fresh","świeży","🥬"],["raw","surowy","🥩"],["homemade","domowy","🏠🍲"]])},
 ],
 l1:{title:"Let's cook!",emoji:"🔪",intro:"Chop, boil, fry, bake, stir — the verbs you need to follow any recipe.",quizTag:"IN THE KITCHEN",quizLabel:"In the kitchen",quiz:[
   {q:"Cut onions into small pieces:",opts:["chop","boil","stir"],correct:0},{q:"Cook pasta in hot water:",opts:["boil","bake","grill"],correct:0},
   {q:"Make a cake in the oven:",opts:["bake","fry","peel"],correct:0},{q:"Cook eggs in a pan with oil:",opts:["fry","boil","grate"],correct:0},
   {q:"Remove the skin from a potato:",opts:["peel","slice","serve"],correct:0},{q:"Move a spoon round and round in soup:",opts:["stir","chop","roast"],correct:0},
   {q:"Make cheese into tiny pieces with a grater:",opts:["grate","slice","boil"],correct:0},{q:"Cook a chicken in the oven:",opts:["roast","stir","peel"],correct:0},
  ],
  odd:[
   {opts:["boil","fry","bake","chop"],odd:3,why:"Chopping is cutting; the others use heat."},
   {opts:["chop","slice","peel","stir"],odd:3,why:"Stirring doesn't use a knife."},
   {opts:["oven","pan","pot","grate"],odd:3,why:"'Grate' is a verb; the others are things you cook in."},
   {opts:["roast","grill","bake","serve"],odd:3,why:"Serving isn't a way of cooking."},
  ],
  wordle:[["chop","🔪"],["bake","🥧"],["stir","🥄"],["peel","🥔🔪"]]},
 l2:{title:"How does it taste?",emoji:"🌶️",intro:"Spicy, sour, crispy, bland — describe food like a food critic.",fillTag:"TASTE",fill:[
   {before:"This curry is too",blank:"spicy",after:"— my mouth is on fire!",bank:["spicy","sweet","fresh"],emoji:"🌶️"},
   {before:"Lemons are very",blank:"sour",after:".",bank:["sour","salty","crispy"],emoji:"🍋"},
   {before:"The chips are lovely and",blank:"crispy",after:".",bank:["crispy","juicy","raw"],emoji:"🍟"},
   {before:"This soup has no flavour. It's",blank:"bland",after:".",bank:["bland","spicy","bitter"],emoji:"😐"},
   {before:"Black coffee without sugar is",blank:"bitter",after:".",bank:["bitter","sweet","juicy"],emoji:"☕"},
   {before:"Sushi is made with",blank:"raw",after:"fish.",bank:["raw","homemade","bland"],emoji:"🍣"},
   {before:"My grandma's",blank:"homemade",after:"pierogi are the best.",bank:["homemade","raw","sour"],emoji:"🥟"},
   {before:"These peaches are so",blank:"juicy",after:"!",bank:["juicy","crispy","salty"],emoji:"🍑"},
  ],
  tf:{sub:"Read the recipe: 'Easy Tomato Soup (serves 4). Peel and chop 2 onions and fry them in a little oil. Add 1 kg of fresh tomatoes and 1 litre of water. Boil for 20 minutes, then blend. Add a pinch of salt and a few basil leaves. Serve hot with crispy bread.'",tag:"A RECIPE",items:[
   {text:"The soup is for four people.",answer:0},{text:"You boil the onions first.",answer:1},{text:"You need one kilo of tomatoes.",answer:0},
   {text:"The soup cooks for 40 minutes.",answer:1},{text:"You add basil at the end.",answer:0},{text:"You serve it cold.",answer:1}]},
  listen:[
   {word:"Chop the onions finely.",options:["Chop the onions finely.","Chop the onions finally.","Shop for onions finely."],correct:0},
   {word:"It's a bit too salty.",options:["It's a bit too salty.","It's a bit too sweet.","It's a bit too smelly."],correct:0},
   {word:"Stir it from time to time.",options:["Stir it from time to time.","Store it from time to time.","Stir it from nine to ten."],correct:0},
  ],
  wordle:[["spicy","🌶️"],["sour","🍋"],["sweet","🍯"],["fresh","🥬"],["salty","🧂"]]},
 grammar:{title:"Too much salt!",emoji:"🧂",label:"too / enough",intro:"Too much salt, not enough time, a few eggs, a little milk — quantifiers for the kitchen.",boxTitle:"too · enough · quantifiers",
  html:`<p><b>too</b> = more than you want · <b>(not) enough</b> = (not) the right amount.</p>${TBL(["Pattern","Example"],[["<b>too</b> + adjective","The soup is <b>too</b> hot."],["<b>too much</b> + uncountable","There's <b>too much</b> salt."],["<b>too many</b> + plural","I ate <b>too many</b> biscuits."],["adjective + <b>enough</b>","It isn't sweet <b>enough</b>."],["<b>enough</b> + noun","We haven't got <b>enough</b> eggs."]])}<p style="margin-top:12px;">Quantifiers:</p>${TBL(["Countable (plural)","Uncountable"],[["<b>a few</b> eggs (some)","<b>a little</b> milk (some)"],["<b>few</b> eggs (almost none)","<b>little</b> time (almost none)"],["<b>many</b> / <b>a lot of</b> tomatoes","<b>much</b> / <b>a lot of</b> sugar"]])}`,
  quizTag:"HOW MUCH?",quiz:[
   {q:"There's ___ salt in this soup. I can't eat it!",opts:["too much","too many","enough"],correct:0},{q:"I ate ___ chocolates and now I feel sick.",opts:["too many","too much","enough"],correct:0},
   {q:"The water isn't hot ___ for the pasta.",opts:["enough","too","much"],correct:0},{q:"Add ___ milk — just a bit.",opts:["a little","a few","many"],correct:0},
   {q:"I need ___ eggs for the cake — three or four.",opts:["a few","a little","much"],correct:0},{q:"How ___ sugar do you take?",opts:["much","many","few"],correct:0},
   {q:"We haven't got ___ chairs for everyone.",opts:["enough","too","much"],correct:0},{q:"The steak is ___ tough to cut.",opts:["too","enough","much"],correct:0},
  ],
  fill:[
   {before:"This coffee is",blank:"too",after:"hot to drink.",bank:["too","enough","much"],emoji:"☕"},
   {before:"There's",blank:"too much",after:"garlic in this sauce.",bank:["too much","too many","enough"],emoji:"🧄"},
   {before:"You put",blank:"too many",after:"chillies in the curry!",bank:["too many","too much","few"],emoji:"🌶️"},
   {before:"The cake isn't sweet",blank:"enough",after:".",bank:["enough","too","much"],emoji:"🍰"},
   {before:"Add",blank:"a little",after:"olive oil to the pan.",bank:["a little","a few","many"],emoji:"🫒"},
   {before:"I need",blank:"a few",after:"potatoes for the soup.",bank:["a few","a little","much"],emoji:"🥔"},
   {before:"Have we got",blank:"enough",after:"bread for the sandwiches?",bank:["enough","too","many"],emoji:"🍞"},
   {before:"How",blank:"many",after:"tomatoes do we need?",bank:["many","much","few"],emoji:"🍅"},
  ],
  build:[
   {s:"There is too much salt in this soup.",pl:"W tej zupie jest za dużo soli."},{s:"The pasta isn't cooked enough.",pl:"Makaron nie jest wystarczająco ugotowany."},
   {s:"Add a little milk and a few eggs.",pl:"Dodaj trochę mleka i kilka jajek."},{s:"We haven't got enough time.",pl:"Nie mamy wystarczająco dużo czasu."},{s:"I ate too many cakes.",pl:"Zjadłem za dużo ciastek."},
  ],
  errors:[
   {s:"There are too much people here.",wrong:3,ok:"There are too many people here."},
   {s:"The soup isn't enough hot.",wrong:3,ok:"The soup isn't hot enough."},
   {s:"Add a few milk to the sauce.",wrong:2,ok:"Add a little milk to the sauce."},
   {s:"How many sugar do you want?",wrong:1,ok:"How much sugar do you want?"},
   {s:"It's too much expensive.",wrong:2,ok:"It's too expensive."},
  ],
  whack:[
   {q:"too ___ salt",opts:["much","many"],correct:0},{q:"too ___ eggs",opts:["many","much"],correct:0},
   {q:"hot ___",opts:["enough","too"],correct:0},{q:"a ___ water",opts:["little","few"],correct:0},
   {q:"a ___ apples",opts:["few","little"],correct:0},
  ],
  wordle:[["enough","✅"],["much","➕"],["many","🔢"],["little","🤏"]]},
 reading:{title:"The cooking class",emoji:"👩‍🍳",intro:"Read about a disastrous first cooking class, then answer, translate and write your own recipe.",storyTitle:"My First Cooking Class",label:"Blog",paras:[
   "<b>My First Cooking Class</b> 👩‍🍳",
   "I've always lived on frozen pizza and takeaways, so for my 30th birthday my sister gave me a present: a Thai cooking class. 'You're old enough to cook a real meal,' she said.",
   "There were eight of us in the class, and the chef, Nok, was patient but strict. First we had to chop vegetables. I was too slow, and my pieces were too big. 'Smaller!' Nok said. 'And not so many carrots!'",
   "Then we made a green curry. I added too much chilli paste and not enough coconut milk, so mine was incredibly spicy. My partner, a retired teacher called Henryk, tasted it and turned red. 'It's… brave,' he said politely.",
   "At the end, we all sat down and ate together. My curry was too hot for everyone except me, but the rice was perfect and the mango dessert was delicious. Now I cook at home at least twice a week — with a little less chilli.",
  ],
  tf:[
   {text:"The writer used to eat a lot of takeaways.",answer:0},{text:"The class was a present from the writer's mother.",answer:1},{text:"There were eight people in the class.",answer:0},
   {text:"The writer chopped vegetables very fast.",answer:1},{text:"The curry was very spicy.",answer:0},{text:"Henryk is a chef.",answer:1},{text:"The writer now cooks at home regularly.",answer:0}],
  quiz:[
   {q:"What was the problem with the writer's vegetables?",opts:["The pieces were too big","They were raw","They were burnt"],correct:0},
   {q:"Why was the curry so spicy?",opts:["Too much chilli paste","Too much coconut milk","Not enough rice"],correct:0},
   {q:"What did Henryk mean by 'It's… brave'?",opts:["He didn't like it, politely","He loved it","It was too sweet"],correct:0},
   {q:"What was delicious?",opts:["The mango dessert","The curry","The carrots"],correct:0},
   {q:"How often does the writer cook now?",opts:["At least twice a week","Every day","Never"],correct:0},
  ],
  typed:[
   {prompt:"Ta zupa jest za słona.",answers:["This soup is too salty"]},
   {prompt:"Nie mamy wystarczająco dużo jajek.",answers:["We haven't got enough eggs","We don't have enough eggs","We have not got enough eggs"]},
   {prompt:"Dodaj trochę soli.",answers:["Add a little salt","Add some salt","Add a bit of salt"]},
   {prompt:"Posiekaj cebulę.",answers:["Chop the onion","Chop the onions","Chop an onion"]},
  ],
  writing:{label:"Recipe",title:"Your favourite recipe ✍️",sub:"Write your favourite recipe and say why you love it (min. 90 words). Use at least six cooking verbs and too / enough / a few / a little.",starters:["My favourite dish is…","You need: a few…, a little…","First, peel / chop…","Then fry / boil…","Be careful — don't add too much…","Serve it with…"],min:90},
  wordle:[["curry","🍛"],["mango","🥭"],["rice","🍚"],["chef","👩‍🍳"]]},
 test:{grammar:[
   {q:"There's ___ sugar in this tea.",opts:["too much","too many","enough of"],correct:0},{q:"This room isn't big ___.",opts:["enough","too","much"],correct:0},
   {q:"I've got ___ friends here — maybe three.",opts:["a few","a little","much"],correct:0},{q:"There's ___ time left — hurry!",opts:["little","few","many"],correct:0},
   {q:"Cook in the oven (cake):",opts:["bake","fry","boil"],correct:0},{q:"No flavour:",opts:["bland","bitter","spicy"],correct:0},
   {q:"Not cooked:",opts:["raw","fresh","juicy"],correct:0},{q:"How ___ eggs do we need?",opts:["many","much","little"],correct:0}],
  errors:[
   {s:"The tea is too much hot.",wrong:3,ok:"The tea is too hot."},
   {s:"We haven't got time enough.",wrong:3,ok:"We haven't got enough time."},
   {s:"There are a little apples left.",wrong:3,ok:"There are a few apples left."},
   {s:"Lemons taste very sweet.",wrong:3,ok:"Lemons taste very sour."}],
  typed:[
   {prompt:"Ten stek jest za twardy.",answers:["This steak is too tough","This steak is too hard"]},
   {prompt:"Smaż cebulę przez pięć minut.",answers:["Fry the onion for five minutes","Fry the onions for five minutes","Fry the onion for 5 minutes","Fry the onions for 5 minutes"]},
   {prompt:"Ciasto nie jest wystarczająco słodkie.",answers:["The cake isn't sweet enough","The cake is not sweet enough"]},
   {prompt:"Zjadłem za dużo frytek.",answers:["I ate too many chips","I ate too many fries","I've eaten too many chips","I have eaten too many chips"]}]},
});

/* ================= B1 · Feelings & Relationships ================= */
mkUnit({id:"bg1",level:"B1",track:"adults",topic:"Relationships",title:"Feelings & Relationships",emoji:"💞",badge:"Heart Reader",sub:"Emotions, friendship and dating — -ed / -ing adjectives and relationship phrasal verbs.",
 sets:[
  {title:"Feelings",label:"Feelings",words:V([
   ["excited","podekscytowany","🤩"],["bored","znudzony","🥱"],["worried","zmartwiony","😟"],["embarrassed","zawstydzony","😳"],["disappointed","rozczarowany","😞"],["relieved","odczuwający ulgę","😮‍💨"],
   ["annoyed","zirytowany","😠"],["confused","zdezorientowany","😕"],["proud","dumny","🏅"],["jealous","zazdrosny","💚"],["lonely","samotny","🧍‍♂️"],["grateful","wdzięczny","🙏"]])},
  {title:"Relationships",label:"Relationships",findTitle:"Which phrase is it? 🔎",words:V([
   ["get on with","dogadywać się z","🤝"],["fall out with","pokłócić się z","💢"],["make up","pogodzić się","🫂"],["split up","rozstać się","💔"],["ask out","zaprosić na randkę","🌹"],["go out with","chodzić z (kimś)","💑"],
   ["fall in love","zakochać się","😍"],["break up","zerwać","🔨💔"],["look up to","podziwiać (kogoś)","👀⬆️"],["rely on","polegać na","🧱"],["trust","ufać","🔐🤝"],["support","wspierać","🫶"]])},
 ],
 l1:{title:"How do you feel?",emoji:"😊",intro:"Excited, worried, embarrassed, relieved — twelve words for feelings.",quizTag:"HOW DO THEY FEEL?",quizLabel:"How do they feel?",quiz:[
   {q:"Tomorrow you're going to Japan for the first time:",opts:["excited","bored","lonely"],correct:0},{q:"You fell over in front of the whole school:",opts:["embarrassed","proud","relieved"],correct:0},
   {q:"Your exam went well after weeks of stress:",opts:["relieved","jealous","annoyed"],correct:0},{q:"Your son won a medal:",opts:["proud","bored","confused"],correct:0},
   {q:"Your friend got the job you wanted:",opts:["jealous","grateful","relieved"],correct:0},{q:"Nothing to do on a rainy Sunday:",opts:["bored","excited","proud"],correct:0},
   {q:"You don't understand the instructions:",opts:["confused","grateful","proud"],correct:0},{q:"Your team lost the final:",opts:["disappointed","relieved","excited"],correct:0},
  ],
  odd:[
   {opts:["happy","excited","proud","worried"],odd:3,why:"'Worried' is a negative feeling."},
   {opts:["annoyed","angry","furious","grateful"],odd:3,why:"'Grateful' isn't about anger."},
   {opts:["bored","lonely","disappointed","relieved"],odd:3,why:"'Relieved' is a positive feeling."},
   {opts:["embarrassed","ashamed","proud","awkward"],odd:2,why:"'Proud' is positive; the others are uncomfortable feelings."},
  ],
  wordle:[["bored","🥱"],["proud","🏅"],["lonely","🧍‍♂️"],["jealous","💚"]]},
 l2:{title:"Friends and partners",emoji:"💑",intro:"Get on with, fall out with, make up, split up — phrasal verbs for relationships.",fillTag:"PHRASAL VERBS",fill:[
   {before:"I",blank:"get on with",after:"my colleagues really well.",bank:["get on with","fall out with","split up"],emoji:"🤝"},
   {before:"Kasia and I",blank:"fell out",after:"over money, but we're friends again now.",bank:["fell out","made up","asked out"],emoji:"💢"},
   {before:"After the argument, they",blank:"made up",after:"and hugged.",bank:["made up","split up","fell out"],emoji:"🫂"},
   {before:"Tom finally",blank:"asked",after:"Ola out to dinner.",bank:["asked","went","fell"],emoji:"🌹"},
   {before:"They",blank:"split up",after:"after five years together.",bank:["split up","made up","got on"],emoji:"💔"},
   {before:"I've always",blank:"looked up to",after:"my older sister.",bank:["looked up to","fallen out with","asked out"],emoji:"👀⬆️"},
   {before:"You can always",blank:"rely on",after:"Marek — he never lets you down.",bank:["rely on","break up","fall out"],emoji:"🧱"},
   {before:"They met in Paris and",blank:"fell in love",after:"at first sight.",bank:["fell in love","split up","made up"],emoji:"😍"},
  ],
  tf:{sub:"Read the advice column: 'Dear Leo, my best friend and I fell out three weeks ago because I forgot her birthday. I feel terrible and lonely. Should I call her? — Sad in Sopot.' 'Dear Sad, yes! Say sorry and ask her for a coffee. Real friends make up. — Leo'",tag:"AN ADVICE COLUMN",items:[
   {text:"The writer argued with her best friend.",answer:0},{text:"They fell out three months ago.",answer:1},{text:"The writer forgot her friend's birthday.",answer:0},
   {text:"The writer feels lonely.",answer:0},{text:"Leo says she should forget her friend.",answer:1},{text:"Leo suggests meeting for coffee.",answer:0}]},
  listen:[
   {word:"We fell out last week.",options:["We fell out last week.","We fell down last week.","We fell in love last week."],correct:0},
   {word:"I'm so embarrassed!",options:["I'm so embarrassed!","I'm so embarrassing!","I'm so impressed!"],correct:0},
   {word:"Can I rely on you?",options:["Can I rely on you?","Can I reply to you?","Can I rely on him?"],correct:0},
  ],
  wordle:[["trust","🔐🤝"],["love","😍"],["split","💔"],["proud","🏅"],["hug","🫂"]]},
 grammar:{title:"Bored or boring?",emoji:"🎭",label:"-ed / -ing",intro:"I'm bored because the film is boring! -ed and -ing adjectives — one of the most common mistakes.",boxTitle:"-ed vs -ing adjectives",
  html:`<p><b>-ed</b> = how a person <b>feels</b>. <b>-ing</b> = what <b>causes</b> the feeling.</p>${TBL(["-ed (feeling)","-ing (cause)"],[["I'm <b>bored</b>.","The lesson is <b>boring</b>."],["She was <b>interested</b> in art.","The museum was <b>interesting</b>."],["We were <b>tired</b>.","It was a <b>tiring</b> day."],["He felt <b>embarrassed</b>.","It was an <b>embarrassing</b> moment."],["I'm <b>confused</b>.","These instructions are <b>confusing</b>."]])}<p style="margin-top:12px;">❗ <b>I'm boring</b> = other people find me boring! Usually you want <b>I'm bored</b>.</p>`,
  quizTag:"-ED OR -ING?",quiz:[
   {q:"The film was so ___ that I fell asleep.",opts:["boring","bored"],correct:0},{q:"I'm ___ in history.",opts:["interested","interesting"],correct:0},
   {q:"It was an ___ day — I didn't stop working.",opts:["exhausting","exhausted"],correct:0},{q:"She felt ___ when she forgot his name.",opts:["embarrassed","embarrassing"],correct:0},
   {q:"The news was really ___.",opts:["shocking","shocked"],correct:0},{q:"We were ___ by the results.",opts:["disappointed","disappointing"],correct:0},
   {q:"Are you ___ about the holiday?",opts:["excited","exciting"],correct:0},{q:"This map is so ___!",opts:["confusing","confused"],correct:0},
  ],
  fill:[
   {before:"I'm",blank:"bored",after:". Let's go out!",bank:["bored","boring"],emoji:"🥱"},
   {before:"That was a",blank:"terrifying",after:"film.",bank:["terrifying","terrified"],emoji:"😱"},
   {before:"She was",blank:"surprised",after:"to see me there.",bank:["surprised","surprising"],emoji:"😲"},
   {before:"The ending was very",blank:"disappointing",after:".",bank:["disappointing","disappointed"],emoji:"😞"},
   {before:"I felt",blank:"relaxed",after:"after the massage.",bank:["relaxed","relaxing"],emoji:"💆"},
   {before:"It's an",blank:"amazing",after:"view!",bank:["amazing","amazed"],emoji:"🏔️"},
   {before:"He's",blank:"worried",after:"about his exam.",bank:["worried","worrying"],emoji:"😟"},
   {before:"What an",blank:"annoying",after:"noise!",bank:["annoying","annoyed"],emoji:"📢"},
  ],
  build:[
   {s:"I was bored because the film was boring.",pl:"Nudziłem się, bo film był nudny."},{s:"She is interested in music.",pl:"Ona interesuje się muzyką."},
   {s:"It was an embarrassing moment.",pl:"To był żenujący moment."},{s:"We were very excited about the trip.",pl:"Byliśmy bardzo podekscytowani wyjazdem."},{s:"They made up after the argument.",pl:"Pogodzili się po kłótni."},
  ],
  errors:[
   {s:"I'm very interesting in football.",wrong:2,ok:"I'm very interested in football."},
   {s:"The lesson was so bored.",wrong:4,ok:"The lesson was so boring."},
   {s:"I was embarrassing when I fell.",wrong:2,ok:"I was embarrassed when I fell."},
   {s:"We fell up after an argument.",wrong:2,ok:"We fell out after an argument."},
   {s:"She gets on well to her boss.",wrong:4,ok:"She gets on well with her boss."},
  ],
  whack:[
   {q:"I'm ___ (feeling)",opts:["tired","tiring"],correct:0},{q:"a ___ book (cause)",opts:["boring","bored"],correct:0},
   {q:"fall ___ with = pokłócić się",opts:["out","up"],correct:0},{q:"make ___ = pogodzić się",opts:["up","out"],correct:0},
   {q:"an ___ story",opts:["exciting","excited"],correct:0},
  ],
  wordle:[["boring","🥱"],["tired","😴"],["shocked","😲"],["worried","😟"]]},
 reading:{title:"The lost friendship",emoji:"🫂",intro:"Read a true-style story about two friends who fell out and made up, then answer, translate and give advice.",storyTitle:"Twenty Years Later",label:"Story",paras:[
   "<b>Twenty Years Later</b> 🫂",
   "When Marta and Ewa were at school, they were inseparable. They shared everything — clothes, secrets, homework. Everyone said they were more like sisters than friends.",
   "But at university, things changed. Ewa started going out with a boy Marta didn't trust, and Marta said so. Ewa felt hurt and annoyed. They had a terrible argument and fell out. Neither of them called the other. Months became years.",
   "Twenty years later, Marta was sitting in a café in Gdańsk when she heard a familiar laugh. It was Ewa. At first, both of them were embarrassed and didn't know what to say. Then Ewa smiled: 'You were right about him, you know. We split up after six months.'",
   "They talked for four hours. They were surprised by how easily they got on — as if nothing had changed. 'I was too proud to call,' Marta admitted. 'Me too,' said Ewa. Today they meet every Sunday, and they say they'll never let pride ruin a friendship again.",
  ],
  tf:[
   {text:"Marta and Ewa were close friends at school.",answer:0},{text:"They fell out at secondary school.",answer:1},{text:"Marta didn't trust Ewa's boyfriend.",answer:0},
   {text:"They spoke on the phone every year.",answer:1},{text:"They met again in a café in Gdańsk.",answer:0},{text:"Ewa is now married.",answer:2},{text:"They now meet every Sunday.",answer:0}],
  quiz:[
   {q:"Why did they fall out?",opts:["Marta criticised Ewa's boyfriend","Ewa forgot Marta's birthday","They argued about homework"],correct:0},
   {q:"How did they feel when they first met again?",opts:["Embarrassed","Excited","Angry"],correct:0},
   {q:"What happened to Ewa and the boyfriend?",opts:["They split up after six months","They got married","They moved to Gdańsk"],correct:0},
   {q:"Why didn't they call each other?",opts:["They were too proud","They lost their numbers","They were too busy"],correct:0},
   {q:"What is the message of the story?",opts:["Don't let pride ruin friendship","Never trust boyfriends","Cafés are good places to work"],correct:0},
  ],
  typed:[
   {prompt:"Nudzę się.",answers:["I'm bored","I am bored"]},
   {prompt:"Dobrze dogaduję się z bratem.",answers:["I get on well with my brother","I get on with my brother well","I get along well with my brother"]},
   {prompt:"Pokłóciły się na studiach.",answers:["They fell out at university","They fell out at uni","They fell out in college","They fell out at college"]},
   {prompt:"To był bardzo ekscytujący dzień.",answers:["It was a very exciting day"]},
  ],
  writing:{label:"Advice",title:"Write an advice reply ✍️",sub:"A reader writes: 'My best friend and I fell out over something stupid. I miss her, but I'm too proud to call.' Write your advice (min. 90 words). Use at least three phrasal verbs and four -ed / -ing adjectives.",starters:["Dear Reader, I understand how you feel…","It must be really frustrating / disappointing…","Friends often fall out over…","I think you should…","Real friends always make up…","You'll feel relieved when…"],min:90},
  wordle:[["cafe","☕"],["laugh","😂"],["pride","🦚"],["sister","👭"]]},
 test:{grammar:[
   {q:"I was really ___ by the news.",opts:["shocked","shocking"],correct:0},{q:"The trip was ___.",opts:["tiring","tired"],correct:0},
   {q:"We ___ out last year but now we're friends again.",opts:["fell","made","split"],correct:0},{q:"They ___ up after ten years of marriage.",opts:["split","made","fell"],correct:0},
   {q:"Feeling happy that something bad is over:",opts:["relieved","jealous","bored"],correct:0},{q:"To have a good relationship with someone:",opts:["get on with","fall out with","break up"],correct:0},
   {q:"I'm ___ in science.",opts:["interested","interesting"],correct:0},{q:"Thankful:",opts:["grateful","proud","lonely"],correct:0}],
  errors:[
   {s:"The match was very excited.",wrong:4,ok:"The match was very exciting."},
   {s:"I'm boring — let's do something!",wrong:1,ok:"I'm bored — let's do something!"},
   {s:"They made out after the argument.",wrong:2,ok:"They made up after the argument."},
   {s:"Can I rely in you?",wrong:3,ok:"Can I rely on you?"}],
  typed:[
   {prompt:"Jestem z ciebie dumny.",answers:["I'm proud of you","I am proud of you"]},
   {prompt:"Zakochali się w Paryżu.",answers:["They fell in love in Paris"]},
   {prompt:"Ta książka jest nudna.",answers:["This book is boring"]},
   {prompt:"Możesz na mnie polegać.",answers:["You can rely on me","You can count on me"]}]},
});

/* ================= B1 · Tech at Home ================= */
mkUnit({id:"bh1",level:"B1",track:"adults",topic:"Technology",title:"Tech at Home",emoji:"📱",badge:"Gadget Guru",sub:"Devices, apps and tech problems — and the Present Perfect Continuous.",
 sets:[
  {title:"Devices & gadgets",label:"Devices",words:V([
   ["smartphone","smartfon","📱"],["laptop","laptop","💻"],["tablet","tablet","📲"],["charger","ładowarka","🔌"],["headphones","słuchawki","🎧"],["smartwatch","smartwatch","⌚"],
   ["speaker","głośnik","🔊"],["router","router","📡"],["printer","drukarka","🖨️"],["screen","ekran","🖥️"],["battery","bateria","🔋"],["keyboard","klawiatura","⌨️"]])},
  {title:"Using technology",label:"Tech verbs",findTitle:"Which tech phrase is it? 🔎",words:V([
   ["download","pobrać","⬇️"],["upload","wgrać, przesłać","⬆️"],["install","zainstalować","🧩"],["update","zaktualizować","🔄"],["log in","zalogować się","🔑"],["log out","wylogować się","🚪🔑"],
   ["password","hasło","🔒"],["crash","zawiesić się, paść","💥💻"],["back up","zrobić kopię zapasową","💾"],["connect to","połączyć się z","🔗"],["switch off","wyłączyć","⏻"],["run out of battery","rozładować się","🪫"]])},
 ],
 l1:{title:"My gadgets",emoji:"🎧",intro:"Chargers, routers, speakers, smartwatches — the devices we use every day.",quizTag:"WHAT IS IT?",quizLabel:"What is it?",quiz:[
   {q:"You need it when your phone is at 2%:",opts:["charger","printer","router"],correct:0},{q:"It sends Wi-Fi around your flat:",opts:["router","speaker","keyboard"],correct:0},
   {q:"You type on it:",opts:["keyboard","screen","battery"],correct:0},{q:"You put them on your ears to listen to music:",opts:["headphones","speakers","chargers"],correct:0},
   {q:"It puts your documents on paper:",opts:["printer","tablet","router"],correct:0},{q:"A watch that counts your steps:",opts:["smartwatch","speaker","laptop"],correct:0},
   {q:"The part of the phone you look at:",opts:["screen","battery","charger"],correct:0},{q:"A portable computer:",opts:["laptop","router","printer"],correct:0},
  ],
  odd:[
   {opts:["laptop","tablet","smartphone","password"],odd:3,why:"A password isn't a device."},
   {opts:["speaker","headphones","earbuds","keyboard"],odd:3,why:"A keyboard isn't for sound."},
   {opts:["charger","battery","cable","screen"],odd:3,why:"A screen isn't about power."},
   {opts:["router","Wi-Fi","modem","printer"],odd:3,why:"A printer isn't about the internet connection."},
  ],
  wordle:[["laptop","💻"],["screen","🖥️"],["tablet","📲"],["router","📡"]]},
 l2:{title:"Have you tried switching it off?",emoji:"🔄",intro:"Download, update, log in, back up, crash — the verbs of tech life (and tech problems).",fillTag:"TECH VERBS",fill:[
   {before:"I need to",blank:"download",after:"the new app.",bank:["download","switch off","crash"],emoji:"⬇️"},
   {before:"Don't forget to",blank:"back up",after:"your photos.",bank:["back up","log out","crash"],emoji:"💾"},
   {before:"My laptop",blank:"crashed",after:"and I lost my work!",bank:["crashed","uploaded","installed"],emoji:"💥💻"},
   {before:"Please",blank:"log in",after:"with your email and password.",bank:["log in","back up","switch off"],emoji:"🔑"},
   {before:"Your phone needs to",blank:"update",after:"— it'll take 10 minutes.",bank:["update","download","connect"],emoji:"🔄"},
   {before:"I can't",blank:"connect",after:"to the Wi-Fi.",bank:["connect","log","install"],emoji:"🔗"},
   {before:"My phone",blank:"ran out of",after:"battery during the call.",bank:["ran out of","switched off","logged out of"],emoji:"🪫"},
   {before:"I",blank:"uploaded",after:"the video to YouTube.",bank:["uploaded","downloaded","crashed"],emoji:"⬆️"},
  ],
  tf:{sub:"Read the help page: 'Wi-Fi not working? 1. Switch the router off and on again. 2. Check your password. 3. Update your device. 4. Still nothing? Call our helpline (open 8 a.m.–8 p.m., Mon–Sat).'",tag:"A HELP PAGE",items:[
   {text:"The first step is to restart the router.",answer:0},{text:"You should check your password.",answer:0},{text:"The page says to buy a new device.",answer:1},
   {text:"The helpline is open on Sundays.",answer:1},{text:"The helpline opens at 8 a.m.",answer:0},{text:"Updating your device is one of the steps.",answer:0}]},
  listen:[
   {word:"My laptop has crashed again.",options:["My laptop has crashed again.","My laptop has cracked again.","My laptop has charged again."],correct:0},
   {word:"Have you backed up your files?",options:["Have you backed up your files?","Have you packed up your files?","Have you backed up your phone?"],correct:0},
   {word:"I forgot my password.",options:["I forgot my password.","I forgot my passport.","I bought my password."],correct:0},
  ],
  wordle:[["update","🔄"],["crash","💥💻"],["login","🔑"],["install","🧩"],["backup","💾"]]},
 grammar:{title:"I've been waiting for an hour!",emoji:"⏳",label:"Present Perf. Cont.",intro:"I've been trying to fix this for hours! The Present Perfect Continuous for activities that started in the past and continue now.",boxTitle:"Present Perfect Continuous",
  html:`<p><b>have / has been + -ing</b> — for an activity that started in the past and is <b>still going on</b> (or just stopped), often with <b>for / since / how long</b>.</p>${TBL(["","Example"],[["+","I<b>'ve been waiting</b> for an hour."],["–","She <b>hasn't been sleeping</b> well."],["?","How long <b>have</b> you <b>been learning</b> English?"]])}<p style="margin-top:12px;"><b>for</b> + period (for two hours) · <b>since</b> + starting point (since Monday)</p><p style="margin-top:8px;">Results you can see now: Your eyes are red — <b>have you been crying</b>?</p><p style="margin-top:8px;">❗ Not with state verbs (know, like, have = own): I<b>'ve known</b> him for years. ❌ I've been knowing</p>`,
  quizTag:"HOW LONG?",quiz:[
   {q:"I've ___ waiting for twenty minutes.",opts:["been","be","being"],correct:0},{q:"She ___ been working here since 2020.",opts:["has","have","is"],correct:0},
   {q:"How long have you ___ this phone?",opts:["had","been having","have"],correct:0},{q:"We've been playing ___ three hours.",opts:["for","since","from"],correct:0},
   {q:"He's been gaming ___ breakfast.",opts:["since","for","during"],correct:0},{q:"Your hands are dirty! What ___ you been doing?",opts:["have","has","are"],correct:0},
   {q:"I've ___ Tom for ten years.",opts:["known","been knowing","know"],correct:0},{q:"It ___ raining all day.",opts:["has been","have been","is been"],correct:0},
  ],
  fill:[
   {before:"I've been",blank:"trying",after:"to connect to the Wi-Fi for an hour.",bank:["trying","try","tried"],emoji:"📡"},
   {before:"She",blank:"has",after:"been using that laptop since 2019.",bank:["has","have","is"],emoji:"💻"},
   {before:"How long have you",blank:"been",after:"waiting?",bank:["been","be","being"],emoji:"⏳"},
   {before:"We've been working on this app",blank:"for",after:"six months.",bank:["for","since","ago"],emoji:"📱"},
   {before:"He's been playing video games",blank:"since",after:"10 a.m.!",bank:["since","for","from"],emoji:"🎮"},
   {before:"My phone",blank:"has been",after:"charging all night.",bank:["has been","have been","is"],emoji:"🔌"},
   {before:"I",blank:"haven't",after:"been sleeping well recently.",bank:["haven't","hasn't","didn't"],emoji:"😴"},
   {before:"I've",blank:"known",after:"her since primary school.",bank:["known","been knowing","know"],emoji:"🤝"},
  ],
  build:[
   {s:"I have been waiting for an hour.",pl:"Czekam od godziny."},{s:"How long have you been learning English?",pl:"Od jak dawna uczysz się angielskiego?"},
   {s:"She has been working here since May.",pl:"Ona pracuje tu od maja."},{s:"It has been raining all day.",pl:"Pada cały dzień."},{s:"We haven't been sleeping well.",pl:"Nie śpimy ostatnio dobrze."},
  ],
  errors:[
   {s:"I've been wait for an hour.",wrong:2,ok:"I've been waiting for an hour."},
   {s:"She has been working here for 2020.",wrong:5,ok:"She has been working here since 2020."},
   {s:"How long you have been studying?",wrong:2,ok:"How long have you been studying?"},
   {s:"I've been knowing him for years.",wrong:2,ok:"I've known him for years."},
   {s:"They has been playing all day.",wrong:1,ok:"They have been playing all day."},
  ],
  whack:[
   {q:"___ two hours",opts:["for","since"],correct:0},{q:"___ Monday",opts:["since","for"],correct:0},
   {q:"I've ___ waiting.",opts:["been","be"],correct:0},{q:"She ___ been crying.",opts:["has","have"],correct:0},
   {q:"I've ___ him for years.",opts:["known","been knowing"],correct:0},
  ],
  wordle:[["been","⏳"],["since","📅"],["waiting","⌛"],["long","📏"]]},
 reading:{title:"Digital detox",emoji:"📵",intro:"Read about someone who has been living without a smartphone, then answer, translate and give your opinion.",storyTitle:"Thirty Days Without My Phone",label:"Article",paras:[
   "<b>Thirty Days Without My Phone</b> 📵",
   "I've been using a smartphone since I was fourteen. Last month I noticed I was checking it over a hundred times a day, even during dinner with friends. So I decided to try something scary: thirty days with an old phone that can only call and text.",
   "The first week was the hardest. I kept reaching into my pocket for a phone that wasn't there. I got lost twice without maps, and I missed a party because the invitation was on a messaging app. I felt annoyed and, honestly, a bit lonely.",
   "But slowly, things changed. I've been reading again — four books so far. I've been sleeping much better, because there's no screen next to my bed. And I've been talking to people on the bus instead of scrolling.",
   "The thirty days ended last week, and I've switched my smartphone back on. But I've deleted three social media apps, I've turned off notifications, and the phone sleeps in the kitchen. I don't think I'll ever go back to a hundred checks a day.",
  ],
  tf:[
   {text:"The writer has had a smartphone since age fourteen.",answer:0},{text:"The writer checked the phone about ten times a day.",answer:1},{text:"The old phone could only call and text.",answer:0},
   {text:"The first week was easy.",answer:1},{text:"The writer missed a party.",answer:0},{text:"The writer is a student.",answer:2},{text:"The writer has deleted some social media apps.",answer:0}],
  quiz:[
   {q:"Why did the writer start the detox?",opts:["They checked the phone too often","The phone broke","A doctor said so"],correct:0},
   {q:"What problem did the writer have without maps?",opts:["Got lost twice","Missed a flight","Lost their job"],correct:0},
   {q:"What has improved?",opts:["Reading and sleeping","Their salary","Their cooking"],correct:0},
   {q:"Where does the phone 'sleep' now?",opts:["In the kitchen","Next to the bed","In the car"],correct:0},
   {q:"'I've been talking to people' — what tense is this?",opts:["Present Perfect Continuous","Past Continuous","Present Simple"],correct:0},
  ],
  typed:[
   {prompt:"Czekam na ciebie od godziny!",answers:["I've been waiting for you for an hour","I have been waiting for you for an hour"]},
   {prompt:"Mój laptop się zawiesił.",answers:["My laptop has crashed","My laptop crashed","My laptop has frozen","My laptop froze"]},
   {prompt:"Zapomniałem hasła.",answers:["I forgot my password","I've forgotten my password","I have forgotten my password","I forgot the password"]},
   {prompt:"Od jak dawna tu pracujesz?",answers:["How long have you been working here","How long have you worked here"]},
  ],
  writing:{label:"Opinion",title:"Could you live without your phone? ✍️",sub:"Write about your relationship with technology (min. 90 words). How long have you been using your phone today? Could you do a digital detox? Use the Present Perfect Continuous at least three times.",starters:["I've been using a smartphone since…","Today I've been…","The app I use most is…","I think I could / couldn't…","The hardest thing would be…","Recently I've been trying to…"],min:90},
  wordle:[["detox","📵"],["scroll","📜"],["maps","🗺️"],["texts","💬"]]},
 test:{grammar:[
   {q:"I've been learning Spanish ___ two years.",opts:["for","since","ago"],correct:0},{q:"They ___ been arguing all morning.",opts:["have","has","are"],correct:0},
   {q:"How long ___ she been living here?",opts:["has","have","is"],correct:0},{q:"I've ___ this car since 2015.",opts:["had","been having","have"],correct:0},
   {q:"Your computer stops working suddenly:",opts:["crash","update","download"],correct:0},{q:"Make a safe copy of your files:",opts:["back up","log out","upload"],correct:0},
   {q:"It gives Wi-Fi to your home:",opts:["router","charger","speaker"],correct:0},{q:"You've been ___! Your eyes are red.",opts:["crying","cry","cried"],correct:0}],
  errors:[
   {s:"I've been waiting since two hours.",wrong:3,ok:"I've been waiting for two hours."},
   {s:"She have been working all day.",wrong:1,ok:"She has been working all day."},
   {s:"We've been knowing them for ages.",wrong:2,ok:"We've known them for ages."},
   {s:"Please log on your account.",wrong:2,ok:"Please log into your account."}],
  typed:[
   {prompt:"Pada od rana.",answers:["It has been raining since the morning","It's been raining since the morning","It has been raining since morning","It's been raining since morning"]},
   {prompt:"Muszę zaktualizować telefon.",answers:["I need to update my phone","I have to update my phone","I must update my phone"]},
   {prompt:"Bateria mi się rozładowała.",answers:["My battery has run out","My battery ran out","My phone has run out of battery","My phone ran out of battery","I've run out of battery","I ran out of battery"]},
   {prompt:"Od dawna gram w tę grę.",answers:["I've been playing this game for a long time","I have been playing this game for a long time"]}]},
});
