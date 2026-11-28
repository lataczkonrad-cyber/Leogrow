/* =====================================================================
   STANDALONE LESSON — Bugs & Nature (Kids A1)
   Topics from a kids' coursebook unit: small animals (caterpillar, ladybird,
   snail, beetle), "Is it a…? Yes, it is / No, it isn't", "Can you help me?
   Yes, of course", nature words and "This is a… / These are…".
   Leogrow's own sentences and every Leogrow exercise type.
   ===================================================================== */
const BUG_A=V([
 ["caterpillar","gąsienica","🐛"],["ladybird","biedronka","🐞"],["snail","ślimak","🐌"],["beetle","żuk, chrząszcz","🪲"],
 ["butterfly","motyl","🦋"],["bee","pszczoła","🐝"],["leaf","liść","🍃"],["flower","kwiat","🌸"],
]);
const BUG_B=V([
 ["mountain","góra","⛰️"],["waterfall","wodospad","💦⛰️"],["ocean","ocean","🌊"],["valley","dolina","🏞️"],
 ["lake","jezioro","🦆💧"],["island","wyspa","🏝️"],["rock","skała","🪨"],["path","ścieżka","🥾"],
 ["trees","drzewa","🌳🌳"],["river","rzeka","🛶"],
]);
const BUG_ALL=BUG_A.concat(BUG_B);

const BUG_GRAMMAR=`<p><b>Is it a …?</b> 🔎</p>
${TBL(["Question","✅ Yes","❌ No"],[
 ["<b>Is it a</b> snail? 🐌","<b>Yes, it is.</b>","<b>No, it isn't.</b> It's a beetle."],
 ["<b>Is it a</b> ladybird? 🐞","<b>Yes, it is.</b>","<b>No, it isn't.</b> It's a leaf."]])}
<p style="margin-top:12px;"><b>This is / These are</b> 👉</p>
${TBL(["One ☝️","Many 🖐️"],[
 ["<b>This is a</b> mountain. ⛰️","<b>These are</b> mountain<b>s</b>. ⛰️⛰️"],
 ["<b>This is a</b> tree. 🌳","<b>These are</b> tree<b>s</b>. 🌳🌳"],
 ["<b>This is an</b> island. 🏝️","<b>These are</b> island<b>s</b>. 🏝️🏝️"]])}
<p style="margin-top:12px;"><b>a</b> + b, c, l, m… → <i>a lake</i> · <b>an</b> + a, e, i, o, u → <i>an island, an ocean</i></p>
<p style="margin-top:8px;"><b>Asking for help</b> 🙋 <i>Can you help me?</i> — <b>Yes, of course!</b> · <i>Thank you!</i></p>`;

const BUG_LESSON={id:"bugs-a1",title:"Bugs & Nature",emoji:"🐞",num:"3",
 intro:"Little bugs, big mountains! Learn bug and nature words, and say Is it a…? and This is a… / These are….",
 bonus:BUG_ALL,
 zones:[
  {type:"cards",label:"Bugs",title:"Little bugs 🐞",cards:BUG_A},
  {type:"find",label:"Find it",cards:BUG_A,rounds:8,title:"Which bug is it? 🔎"},
  {type:"balloon",label:"Balloon Pop",cards:BUG_A,rounds:8},
  {type:"speak",label:"Say it",items:[
   {en:"caterpillar",emoji:"🐛",pl:"gąsienica"},{en:"ladybird",emoji:"🐞",pl:"biedronka"},{en:"snail",emoji:"🐌",pl:"ślimak"},
   {en:"Is it a beetle?",emoji:"🪲",pl:"Czy to żuk?"},{en:"Yes, it is.",emoji:"✅",pl:"Tak."},
   {en:"Can you help me?",emoji:"🙋",pl:"Czy możesz mi pomóc?"},{en:"Yes, of course!",emoji:"👍",pl:"Tak, oczywiście!"}]},
  {type:"cards",label:"Nature",title:"Nature words 🏞️",cards:BUG_B},
  {type:"match",label:"Match",pairs:BUG_B},
  {type:"memory",label:"Memory",pairs:memOf(BUG_A)},
  {type:"spell",label:"Spell it",words:WL([["snail","🐌"],["beetle","🪲"],["leaf","🍃"],["lake","🦆💧"],["rock","🪨"],["ocean","🌊"],["island","🏝️"]])},
  {type:"quiz",label:"Is it a…?",tag:"IS IT A…?",qs:[
   {q:"🐌 Is it a snail?",opts:["Yes, it is.","No, it isn't."],correct:0},
   {q:"🐞 Is it a beetle?",opts:["No, it isn't. It's a ladybird.","Yes, it is."],correct:0},
   {q:"🐛 Is it a caterpillar?",opts:["Yes, it is.","No, it isn't."],correct:0},
   {q:"🍃 Is it a snail?",opts:["No, it isn't. It's a leaf.","Yes, it is."],correct:0},
   {q:"🦋 Is it a butterfly?",opts:["Yes, it is.","No, it isn't."],correct:0},
   {q:"🪲 Is it a bee?",opts:["No, it isn't. It's a beetle.","Yes, it is."],correct:0},
   {q:"Your friend says: Can you help me?",opts:["Yes, of course!","It's a snail.","These are trees."],correct:0},
  ]},
  {type:"fill",label:"This is / These are",tag:"THIS IS · THESE ARE",items:[
   {before:"",blank:"This is",after:"a waterfall.",bank:["This is","These are"],emoji:"💦⛰️"},
   {before:"",blank:"These are",after:"mountains.",bank:["These are","This is"],emoji:"⛰️⛰️"},
   {before:"This is",blank:"an",after:"island.",bank:["an","a"],emoji:"🏝️"},
   {before:"This is",blank:"a",after:"lake.",bank:["a","an"],emoji:"🦆💧"},
   {before:"These are",blank:"rocks",after:".",bank:["rocks","rock"],emoji:"🪨🪨"},
   {before:"This is",blank:"an",after:"ocean.",bank:["an","a"],emoji:"🌊"},
   {before:"",blank:"These are",after:"trees.",bank:["These are","This is"],emoji:"🌳🌳"},
   {before:"Is it a ladybird? Yes, it",blank:"is",after:".",bank:["is","isn't"],emoji:"🐞"},
  ]},
  {type:"odd",label:"Odd one out",items:[
   {opts:["snail","beetle","ladybird","lake"],odd:3,why:"A lake isn't a bug. 🦆💧"},
   {opts:["mountain","valley","waterfall","bee"],odd:3,why:"A bee is a bug! 🐝"},
   {opts:["ocean","lake","river","rock"],odd:3,why:"A rock isn't water. 🪨"},
   {opts:["leaf","flower","trees","snail"],odd:3,why:"A snail is an animal, not a plant. 🐌"},
  ]},
  {type:"move",label:"Mime & say",items:[
   {emoji:"🐌",text:"Move slowly like a snail… sloooow! Say: I'm a snail! 🐌"},
   {emoji:"🐛",text:"Wiggle on the floor like a caterpillar! Say: I'm a caterpillar! 🐛"},
   {emoji:"🦋",text:"Flap your arms and fly like a butterfly! Say: I'm a butterfly! 🦋"},
   {emoji:"⛰️",text:"Stand on your toes and be a tall mountain! Say: This is a mountain! ⛰️"},
  ]},
  {type:"grammar",label:"Is it a…?",title:"Is it a…? · This is / These are",html:BUG_GRAMMAR},
  {type:"whack",label:"Whack-a-Leo",qs:[
   {q:"🐞 It's a…",opts:["ladybird","snail","rock"],correct:0},{q:"🐌 It's a…",opts:["snail","bee","lake"],correct:0},
   {q:"🪲 It's a…",opts:["beetle","leaf","path"],correct:0},{q:"🏝️ This is an…",opts:["island","ocean","valley"],correct:0},
   {q:"⛰️⛰️ These are…",opts:["mountains","mountain","a mountain"],correct:0},{q:"🌊 This is an…",opts:["ocean","island","river"],correct:0},
  ]},
  {type:"build",label:"Build it",items:[
   {s:"Is it a snail?",pl:"Czy to ślimak?"},{s:"Yes, it is.",pl:"Tak."},{s:"No, it isn't.",pl:"Nie."},
   {s:"This is a waterfall.",pl:"To jest wodospad."},{s:"These are mountains.",pl:"To są góry."},{s:"Can you help me?",pl:"Czy możesz mi pomóc?"},
  ]},
  {type:"errors",label:"Find the error",items:[
   {s:"This is a island.",wrong:2,ok:"This is an island."},
   {s:"These is mountains.",wrong:1,ok:"These are mountains."},
   {s:"Is it a snail? Yes, it isn't.",wrong:6,ok:"Yes, it is."},
   {s:"This are a lake.",wrong:1,ok:"This is a lake."},
  ]},
  {type:"listen",label:"Listen",items:[
   {word:"Is it a ladybird?",options:["Is it a ladybird?","Is it a beetle?","It's a ladybird."],correct:0},
   {word:"These are mountains.",options:["These are mountains.","This is a mountain.","These are fountains."],correct:0},
   {word:"Can you help me?",options:["Can you help me?","Can you hear me?","Can I help you?"],correct:0},
  ]},
  {type:"reading",label:"Story",title:"Leo in the Park",paras:[
   "<b>Leo in the Park</b> 🌳",
   "Leo and Zuzia are in the park. 🌳 There are trees, flowers and a big lake. 🦆💧",
   "Zuzia looks at a green leaf. 🍃 \"Leo, is it a caterpillar?\" — \"Yes, it is!\" 🐛",
   "\"And this? Is it a beetle?\" — \"No, it isn't. It's a snail!\" 🐌",
   "Zuzia can't see the top of the tree. \"Leo, can you help me?\" — \"Yes, of course!\" Leo jumps up the tree. 🐒",
   "\"Look, Zuzia! These are ladybirds! One, two, three!\" 🐞🐞🐞 — \"Thank you, Leo! They're beautiful!\"",
  ]},
  {type:"tf",label:"True or false?",title:"True or False?",sub:"Read the story again.",tag:"STORY CHECK",items:[
   {text:"Leo and Zuzia are in the park.",answer:0},{text:"There is a big lake.",answer:0},
   {text:"The snail is a beetle.",answer:1},{text:"Leo can help Zuzia.",answer:0},
   {text:"There are two ladybirds.",answer:1},
  ]},
  {type:"quiz",label:"Questions",tag:"STORY QUESTIONS",qs:[
   {q:"Where are Leo and Zuzia?",opts:["In the park","At the beach","On a mountain"],correct:0},
   {q:"What's on the leaf?",opts:["A caterpillar","A bee","A fish"],correct:0},
   {q:"Who jumps up the tree?",opts:["Leo","Zuzia","The snail"],correct:0},
   {q:"How many ladybirds are there?",opts:["Three","Two","One"],correct:0},
  ]},
  {type:"typed",label:"Translation",blocks:[{id:"bug-tr",label:"🇵🇱 → 🇬🇧 Polish to English",items:[
   {prompt:"To jest ślimak.",answers:["It's a snail","It is a snail","This is a snail"]},
   {prompt:"Czy to biedronka?",answers:["Is it a ladybird","Is this a ladybird"]},
   {prompt:"Tak, oczywiście!",answers:["Yes, of course"]},
   {prompt:"To są góry.",answers:["These are mountains","These are the mountains"]},
  ]}]},
  {type:"writing",label:"Write",title:"Is it a…? ✍️",sub:"Write 3 questions and answers about bugs (min. 15 words).",
   starters:["Is it a snail? Yes, it is.","Is it a beetle? No, it isn't. It's a ladybird.","Is it a …? …"],min:15},
  {type:"wordle",label:"Wordle",words:WL([["snail","🐌"],["lake","🦆💧"],["rock","🪨"],["ocean","🌊"],["path","🥾"],["leaf","🍃"]])},
  {type:"wheel",label:"Fortune Wheel",items:BUG_A},
 ]};
const STANDALONE_LESSON=BUG_LESSON;
const STANDALONE_UNIT={id:"bugs",level:"A1",track:"kids",topic:"Bugs & Nature",title:"Bugs & Nature",emoji:"🐞",badge:"Bug Explorer",sub:"",n:3};
