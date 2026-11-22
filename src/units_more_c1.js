/* =====================================================================
   MORE TOPICS (round 2) — TEENS & ADULTS C1
   ===================================================================== */

/* ================= C1 · Language & Communication ================= */
mkUnit({id:"cf1",level:"C1",track:"adults",topic:"Communication",title:"Language & Communication",emoji:"🗣️",badge:"Master Communicator",sub:"Accents, body language and miscommunication — discourse markers that organise what you say.",
 sets:[
  {title:"Language itself",label:"Language",words:V([
   ["fluent","płynny (językowo)","🌊"],["accent","akcent","🗺️"],["dialect","dialekt, gwara","🏘️"],["mother tongue","język ojczysty","👩‍👧"],["bilingual","dwujęzyczny","🔤🔤"],["slang","slang","🛹"],
   ["idiom","idiom","🧩"],["jargon","żargon","🧪"],["pronunciation","wymowa","👄"],["vocabulary","słownictwo","📖"],["translate","tłumaczyć","🔁"],["acquire","przyswajać (język)","🧠"]])},
  {title:"Getting the message across",label:"Communication",findTitle:"Which communication word is it? 🔎",words:V([
   ["body language","mowa ciała","🙆"],["eye contact","kontakt wzrokowy","👀"],["tone of voice","ton głosu","🎚️"],["misunderstanding","nieporozumienie","❓❗"],["get the wrong end of the stick","źle zrozumieć","🥢"],["beat around the bush","owijać w bawełnę","🌳"],
   ["get to the point","przejść do sedna","🎯"],["articulate","elokwentny, wyrażać jasno","🎤"],["persuasive","przekonujący","🗣️"],["interrupt","przerywać","✋"],["small talk","rozmowa o niczym","☕"],["convey","przekazać (znaczenie)","📨"]])},
 ],
 l1:{title:"Speaking in tongues",emoji:"🌍",intro:"Accents, dialects, idioms and jargon — talk about language like a linguist.",quizTag:"LANGUAGE",quizLabel:"Language",quiz:[
   {q:"The first language you learned as a child:",opts:["mother tongue","dialect","jargon"],correct:0},{q:"Able to speak two languages equally well:",opts:["bilingual","fluent","articulate"],correct:0},
   {q:"Technical words used by one profession:",opts:["jargon","slang","idiom"],correct:0},{q:"A phrase whose meaning isn't obvious from its words:",opts:["idiom","accent","vocabulary"],correct:0},
   {q:"A local form of a language with its own words:",opts:["dialect","accent","translation"],correct:0},{q:"Very informal words, often used by young people:",opts:["slang","jargon","dialect"],correct:0},
   {q:"Children ___ language naturally, without lessons.",opts:["acquire","translate","interrupt"],correct:0},{q:"The way you say words:",opts:["pronunciation","vocabulary","idiom"],correct:0},
  ],
  odd:[
   {opts:["slang","jargon","dialect","eye contact"],odd:3,why:"Eye contact is non-verbal."},
   {opts:["fluent","bilingual","articulate","silent"],odd:3,why:"'Silent' isn't about speaking well."},
   {opts:["translate","interpret","paraphrase","interrupt"],odd:3,why:"Interrupting doesn't express meaning in other words."},
   {opts:["accent","pronunciation","intonation","vocabulary"],odd:3,why:"Vocabulary is words; the others are about sound."},
  ],
  wordle:[["accent","🗺️"],["idiom","🧩"],["slang","🛹"],["fluent","🌊"]]},
 l2:{title:"Lost in conversation",emoji:"💬",intro:"Body language, tone of voice and misunderstandings — why messages go wrong.",fillTag:"COMMUNICATION",fill:[
   {before:"Crossed arms are a classic example of defensive",blank:"body language",after:".",bank:["body language","small talk","jargon"],emoji:"🙆"},
   {before:"In some cultures, too much",blank:"eye contact",after:"is seen as rude.",bank:["eye contact","tone of voice","slang"],emoji:"👀"},
   {before:"It wasn't what she said — it was her",blank:"tone of voice",after:".",bank:["tone of voice","vocabulary","dialect"],emoji:"🎚️"},
   {before:"Stop beating around the bush and",blank:"get to the point",after:"!",bank:["get to the point","interrupt","acquire"],emoji:"🎯"},
   {before:"Please don't",blank:"interrupt",after:"me while I'm speaking.",bank:["interrupt","convey","translate"],emoji:"✋"},
   {before:"Emojis help to",blank:"convey",after:"emotion in a text message.",bank:["convey","interrupt","acquire"],emoji:"📨"},
   {before:"The whole argument was caused by a simple",blank:"misunderstanding",after:".",bank:["misunderstanding","pronunciation","idiom"],emoji:"❓❗"},
   {before:"He's very",blank:"articulate",after:"— he explains complex ideas clearly.",bank:["articulate","bilingual","persuasive"],emoji:"🎤"},
  ],
  tf:{sub:"Read the research summary: 'Researchers claim that in face-to-face conversation, only a small part of meaning comes from words; tone of voice and body language carry the rest. However, critics point out that the original study looked only at single words expressing feelings, not real conversations. In text messages, where tone is missing, misunderstandings are far more common.'",tag:"RESEARCH",items:[
   {text:"Researchers say words carry only part of the meaning.",answer:0},{text:"Tone of voice plays no role.",answer:1},{text:"Critics question the original study.",answer:0},
   {text:"The study analysed long, real conversations.",answer:1},{text:"Text messages lack tone of voice.",answer:0},{text:"Misunderstandings are rarer in texts.",answer:1}]},
  listen:[
   {word:"Let's get to the point.",options:["Let's get to the point.","Let's get to the pond.","Let's go to the point."],correct:0},
   {word:"I think you've got the wrong end of the stick.",options:["I think you've got the wrong end of the stick.","I think you've got the wrong end of the street.","I think you've got the long end of the stick."],correct:0},
   {word:"She's completely bilingual.",options:["She's completely bilingual.","She's completely brilliant.","She's completely multilingual."],correct:0},
  ],
  wordle:[["convey","📨"],["tone","🎚️"],["point","🎯"],["voice","🗣️"],["chat","☕"]]},
 grammar:{title:"Having said that…",emoji:"🧭",label:"Discourse markers",intro:"As a matter of fact, having said that, on the whole, mind you — discourse markers that guide your listener.",boxTitle:"Discourse markers",
  html:`<p><b>Discourse markers</b> show how your ideas connect. They make you sound organised and natural.</p>${TBL(["Function","Markers"],[["adding a point","<b>What's more</b>, <b>Besides</b>, <b>On top of that</b>"],["contrast / concession","<b>Having said that</b>, <b>Mind you</b>, <b>Even so</b>, <b>That said</b>"],["surprising truth","<b>As a matter of fact</b>, <b>Actually</b>, <b>In fact</b>"],["generalising","<b>On the whole</b>, <b>By and large</b>, <b>All in all</b>"],["changing topic","<b>Anyway</b>, <b>By the way</b>, <b>Speaking of which</b>"],["clarifying","<b>In other words</b>, <b>That is to say</b>, <b>To put it another way</b>"]])}<p style="margin-top:12px;">Most go at the <b>start</b> of a sentence, followed by a <b>comma</b>.</p>`,
  quizTag:"MARKERS",quiz:[
   {q:"The course is expensive. ___, it's worth every penny.",opts:["Having said that","What's more","In other words"],correct:0},{q:"He's not shy. ___, he loves public speaking.",opts:["As a matter of fact","On the whole","Anyway"],correct:0},
   {q:"___, people were satisfied, though a few complained.",opts:["On the whole","By the way","Mind you"],correct:0},{q:"It's cheap. ___, it's very easy to use.",opts:["What's more","Having said that","Even so"],correct:0},
   {q:"He's 'economical with the truth' — ___, he lies.",opts:["in other words","besides","by and large"],correct:0},{q:"___, did you see the email from Anna?",opts:["By the way","In fact","All in all"],correct:0},
   {q:"Her English is great. ___, she did live in London for ten years.",opts:["Mind you","What's more","In other words"],correct:0},{q:"___, it was a successful conference.",opts:["All in all","Besides","By the way"],correct:0},
  ],
  fill:[
   {before:"The talk was too long.",blank:"Having said that",after:", it was very interesting.",bank:["Having said that","What's more","In other words"],emoji:"🎤"},
   {before:"",blank:"As a matter of fact",after:", I've never been to London.",bank:["As a matter of fact","On the whole","By the way"],emoji:"💂"},
   {before:"The flat is cheap and,",blank:"what's more",after:", it's near the station.",bank:["what's more","having said that","mind you"],emoji:"🚉"},
   {before:"",blank:"On the whole",after:", students found the course useful.",bank:["On the whole","Anyway","In fact"],emoji:"📊"},
   {before:"He's not very tactful —",blank:"in other words",after:", he's rude.",bank:["in other words","what's more","by the way"],emoji:"😬"},
   {before:"",blank:"Anyway",after:", let's get back to the main topic.",bank:["Anyway","Besides","Mind you"],emoji:"↩️"},
   {before:"She's strict.",blank:"Mind you",after:", she's also very fair.",bank:["Mind you","What's more","By the way"],emoji:"⚖️"},
   {before:"",blank:"All in all",after:", I'd say the project was a success.",bank:["All in all","Besides","In other words"],emoji:"🏁"},
  ],
  build:[
   {s:"Having said that, I still think he's right.",pl:"Mimo to nadal uważam, że on ma rację."},{s:"As a matter of fact, I agree with you.",pl:"Prawdę mówiąc, zgadzam się z tobą."},
   {s:"On the whole, the meeting went well.",pl:"Ogólnie rzecz biorąc, spotkanie poszło dobrze."},{s:"In other words, we need more time.",pl:"Innymi słowy, potrzebujemy więcej czasu."},{s:"What's more, it's completely free.",pl:"Co więcej, jest to całkowicie darmowe."},
  ],
  errors:[
   {s:"Having say that, it was useful.",wrong:1,ok:"Having said that, it was useful."},
   {s:"As a matter of fakt, I'm Polish.",wrong:4,ok:"As a matter of fact, I'm Polish."},
   {s:"On whole, it was fine.",wrong:0,ok:"On the whole, it was fine."},
   {s:"What's more, it's expensive. On top of it, it's slow.",wrong:7,ok:"What's more, it's expensive. On top of that, it's slow."},
   {s:"In others words, we failed.",wrong:1,ok:"In other words, we failed."},
  ],
  whack:[
   {q:"adding → ___",opts:["What's more","Having said that"],correct:0},{q:"contrast → ___",opts:["Mind you","Besides"],correct:0},
   {q:"generalising → ___",opts:["On the whole","By the way"],correct:0},{q:"changing topic → ___",opts:["Anyway","In fact"],correct:0},
   {q:"clarifying → ___",opts:["In other words","All in all"],correct:0},
  ],
  wordle:[["anyway","↩️"],["besides","➕"],["fact","💡"],["whole","🌐"]]},
 reading:{title:"Lost in translation",emoji:"🌐",intro:"Read an essay on why speaking the same language doesn't guarantee understanding, then answer, translate and reflect.",storyTitle:"Lost in Translation",label:"Essay",paras:[
   "<b>Lost in Translation</b> 🌐",
   "We tend to assume that if two people speak the same language, they will understand each other. As a matter of fact, some of the worst misunderstandings happen between native speakers. A British manager who says 'That's an interesting idea' may well mean 'That's a terrible idea' — and an American colleague may take it as genuine praise.",
   "Culture shapes not just what we say but how we say it. In so-called 'low-context' cultures, such as Germany or the Netherlands, people value directness: you say what you mean and get to the point. In 'high-context' cultures, such as Japan, much of the meaning lies in what is left unsaid — in tone of voice, silence and body language.",
   "Neither style is better. Having said that, problems arise when the two meet without awareness. A direct speaker may seem rude; an indirect one may seem evasive, as if beating around the bush. What's more, in international teams that communicate mostly by email, the non-verbal clues that might help are simply missing.",
   "So what can be done? On the whole, researchers suggest three habits: ask clarifying questions, summarise what you think you heard ('In other words, you'd like…'), and never assume that silence means agreement. Being fluent in a language, it turns out, is only half the job. The other half is being fluent in people.",
  ],
  tf:[
   {text:"Misunderstandings can happen between native speakers.",answer:0},{text:"'That's an interesting idea' always means praise in Britain.",answer:1},{text:"The Netherlands is given as a low-context culture.",answer:0},
   {text:"In high-context cultures, silence can carry meaning.",answer:0},{text:"The writer says direct communication is better.",answer:1},{text:"The writer works for an international bank.",answer:2},{text:"Email removes non-verbal clues.",answer:0}],
  quiz:[
   {q:"What can 'That's an interesting idea' mean from a British manager?",opts:["It's a bad idea","It's the best idea","I didn't hear you"],correct:0},
   {q:"What do low-context cultures value?",opts:["Directness","Silence","Long speeches"],correct:0},
   {q:"How might an indirect speaker seem to a direct one?",opts:["Evasive","Rude","Fluent"],correct:0},
   {q:"Which habit do researchers suggest?",opts:["Summarise what you heard","Avoid questions","Speak louder"],correct:0},
   {q:"What is the 'other half of the job'?",opts:["Being fluent in people","Learning more grammar","Using email"],correct:0},
  ],
  typed:[
   {prompt:"Innymi słowy, nie zgadzasz się.",answers:["In other words, you don't agree","In other words you don't agree","In other words, you disagree","In other words you disagree"]},
   {prompt:"Prawdę mówiąc, nigdy tam nie byłem.",answers:["As a matter of fact, I've never been there","As a matter of fact I've never been there","As a matter of fact, I have never been there","As a matter of fact I have never been there","In fact, I've never been there","Actually, I've never been there"]},
   {prompt:"Przejdźmy do sedna.",answers:["Let's get to the point","Let us get to the point"]},
   {prompt:"Ona jest dwujęzyczna.",answers:["She's bilingual","She is bilingual"]},
  ],
  writing:{label:"Your reflection",title:"A misunderstanding I'll never forget ✍️",sub:"Describe a misunderstanding (between languages or cultures) and what it taught you (min. 150 words). Use at least five different discourse markers.",starters:["As a matter of fact, …","At first, I thought…","What's more, …","Having said that, …","In other words, …","All in all, …"],min:150},
  wordle:[["silence","🤫"],["culture","🎎"],["email","📧"],["direct","➡️"]]},
 test:{grammar:[
   {q:"The hotel was old. ___, the staff were lovely.",opts:["Having said that","What's more","In other words"],correct:0},{q:"___, the results were positive.",opts:["On the whole","By the way","Besides"],correct:0},
   {q:"It's quick. ___, it's cheap.",opts:["What's more","Mind you","Anyway"],correct:0},{q:"He's frugal — ___, he hates spending money.",opts:["in other words","what's more","all in all"],correct:0},
   {q:"Words used only in one profession:",opts:["jargon","slang","dialect"],correct:0},{q:"To express a meaning or feeling:",opts:["convey","interrupt","acquire"],correct:0},
   {q:"Not saying something directly:",opts:["beat around the bush","get to the point","make small talk"],correct:0},{q:"Polite conversation about unimportant things:",opts:["small talk","body language","jargon"],correct:0}],
  errors:[
   {s:"Having saying that, I liked it.",wrong:1,ok:"Having said that, I liked it."},
   {s:"In the other words, it's over.",wrong:1,ok:"In other words, it's over."},
   {s:"On a whole, people agreed.",wrong:1,ok:"On the whole, people agreed."},
   {s:"By the ways, are you coming?",wrong:2,ok:"By the way, are you coming?"}],
  typed:[
   {prompt:"Co więcej, to jest darmowe.",answers:["What's more, it's free","What's more it's free","What's more, it is free","What is more, it's free","Moreover, it's free"]},
   {prompt:"Ogólnie rzecz biorąc, było dobrze.",answers:["On the whole, it was good","On the whole it was good","All in all, it was good","All in all it was good"]},
   {prompt:"Nie przerywaj mi.",answers:["Don't interrupt me","Do not interrupt me"]},
   {prompt:"Ma brytyjski akcent.",answers:["He has a British accent","She has a British accent","He's got a British accent","She's got a British accent"]}]},
});

/* ================= C1 · Psychology & Behaviour ================= */
mkUnit({id:"cg1",level:"C1",track:"adults",topic:"Psychology",title:"Psychology & Behaviour",emoji:"🧠",badge:"Mind Reader",sub:"Habits, biases and motivation — ellipsis and substitution (so, not, do, one).",
 sets:[
  {title:"The mind",label:"Psychology",words:V([
   ["behaviour","zachowanie","🧍"],["personality trait","cecha osobowości","🧬"],["self-esteem","poczucie własnej wartości","🪞"],["motivation","motywacja","🔥"],["willpower","siła woli","💪"],["habit","nawyk","🔁"],
   ["anxiety","lęk, niepokój","😰"],["resilience","odporność psychiczna","🌱"],["empathy","empatia","🫂"],["peer pressure","presja rówieśników","👥"],["subconscious","podświadomy","🌊🧠"],["introvert","introwertyk","🐚"]])},
  {title:"How we think",label:"Thinking",findTitle:"Which thinking word is it? 🔎",words:V([
   ["bias","uprzedzenie, skrzywienie","↗️"],["first impression","pierwsze wrażenie","👋"],["jump to conclusions","wyciągać pochopne wnioski","🦘"],["rationalise","racjonalizować","🧮"],["procrastinate","zwlekać","🛋️"],["overthink","myśleć za dużo","🌀"],
   ["gut feeling","przeczucie","🫃"],["trigger","wyzwalacz, wywołać","🔫"],["reward","nagroda","🏆"],["conform","dostosować się","🧩"],["in denial","wypierający (prawdę)","🙈"],["cognitive","poznawczy","⚙️"]])},
 ],
 l1:{title:"What makes us tick",emoji:"⏱️",intro:"Self-esteem, willpower, resilience and peer pressure — words for how people work.",quizTag:"PSYCHOLOGY",quizLabel:"Psychology",quiz:[
   {q:"The ability to recover quickly from difficulties:",opts:["resilience","anxiety","bias"],correct:0},{q:"How much you value yourself:",opts:["self-esteem","willpower","empathy"],correct:0},
   {q:"The ability to understand how others feel:",opts:["empathy","motivation","habit"],correct:0},{q:"Strength to control what you do, e.g. avoid cake:",opts:["willpower","peer pressure","trait"],correct:0},
   {q:"Influence from people your age to act like them:",opts:["peer pressure","resilience","self-esteem"],correct:0},{q:"A feeling of worry and nervousness:",opts:["anxiety","empathy","motivation"],correct:0},
   {q:"Someone who recharges by being alone:",opts:["introvert","extrovert","conformist"],correct:0},{q:"Something you do regularly, often without thinking:",opts:["habit","trait","reward"],correct:0},
  ],
  odd:[
   {opts:["anxiety","stress","worry","empathy"],odd:3,why:"Empathy isn't a negative feeling."},
   {opts:["shy","introverted","reserved","outgoing"],odd:3,why:"Outgoing is the opposite."},
   {opts:["willpower","self-control","discipline","peer pressure"],odd:3,why:"Peer pressure comes from others, not from you."},
   {opts:["habit","routine","custom","anxiety"],odd:3,why:"Anxiety isn't a regular action."},
  ],
  wordle:[["habit","🔁"],["trait","🧬"],["empathy","🫂"],["anxiety","😰"]]},
 l2:{title:"Mind games",emoji:"🎲",intro:"Bias, gut feelings, procrastination and denial — how our brains trick us.",fillTag:"THINKING",fill:[
   {before:"We all have a",blank:"bias",after:"towards people who are similar to us.",bank:["bias","reward","habit"],emoji:"↗️"},
   {before:"Don't",blank:"jump to conclusions",after:"— wait until you know all the facts.",bank:["jump to conclusions","procrastinate","conform"],emoji:"🦘"},
   {before:"I always",blank:"procrastinate",after:"when I have a big essay to write.",bank:["procrastinate","rationalise","trigger"],emoji:"🛋️"},
   {before:"My",blank:"gut feeling",after:"told me not to trust him.",bank:["gut feeling","first impression","bias"],emoji:"🫃"},
   {before:"Stress can",blank:"trigger",after:"old bad habits.",bank:["trigger","conform","reward"],emoji:"🔫"},
   {before:"He says he doesn't have a problem — he's",blank:"in denial",after:".",bank:["in denial","cognitive","biased"],emoji:"🙈"},
   {before:"Teenagers often",blank:"conform",after:"to what their friends do.",bank:["conform","overthink","rationalise"],emoji:"🧩"},
   {before:"Stop trying to",blank:"rationalise",after:"eating three doughnuts!",bank:["rationalise","trigger","procrastinate"],emoji:"🍩"},
  ],
  tf:{sub:"Read the study summary: 'In a famous experiment, people were shown three lines and asked which matched a fourth. When actors in the room gave the wrong answer, about one in three real participants agreed with them, even though the answer was obvious. Most later said they knew the group was wrong but didn't want to stand out.'",tag:"A STUDY",items:[
   {text:"Participants compared lines.",answer:0},{text:"The correct answer was difficult to see.",answer:1},{text:"Actors gave wrong answers on purpose.",answer:0},
   {text:"Nearly everyone agreed with the actors.",answer:1},{text:"Some participants conformed to the group.",answer:0},{text:"Most believed the group was right.",answer:1}]},
  listen:[
   {word:"Don't jump to conclusions.",options:["Don't jump to conclusions.","Don't jump to confusions.","Don't jump to the conclusion."],correct:0},
   {word:"I always procrastinate.",options:["I always procrastinate.","I always concentrate.","I rarely procrastinate."],correct:0},
   {word:"Trust your gut feeling.",options:["Trust your gut feeling.","Trust your good feeling.","Test your gut feeling."],correct:0},
  ],
  wordle:[["bias","↗️"],["reward","🏆"],["denial","🙈"],["trigger","🔫"],["gut","🫃"]]},
 grammar:{title:"I hope so / I'm afraid not",emoji:"✂️",label:"Ellipsis & substitution",intro:"I hope so. I'm afraid not. She did, too. The red one — avoid repeating words with ellipsis and substitution.",boxTitle:"Ellipsis & substitution",
  html:`<p>Fluent speakers avoid repetition. They <b>leave words out</b> (ellipsis) or <b>replace them</b> (substitution).</p>${TBL(["Instead of repeating…","Say"],[["I think <i>it will rain</i>.","I think <b>so</b>. / I don't think <b>so</b>."],["I'm afraid <i>it won't work</i>.","I'm afraid <b>not</b>. / I hope <b>not</b>."],["He likes jazz and I <i>like jazz</i> too.","He likes jazz and <b>so do I</b>."],["She didn't call, but I <i>called</i>.","She didn't call, but I <b>did</b>."],["I want <i>a cake</i> — the chocolate <i>cake</i>.","I want the chocolate <b>one</b>."],["I'd love to <i>come</i>.","I'd love <b>to</b>."]])}<p style="margin-top:12px;"><b>so</b> after: think, hope, expect, suppose, guess, be afraid · <b>not</b> for the negative: I hope <b>not</b> (✗ I don't hope so).</p>`,
  quizTag:"SAY LESS",quiz:[
   {q:"'Will she pass?' 'I hope ___.'",opts:["so","it","that"],correct:0},{q:"'Is it going to rain?' 'I'm afraid ___.'",opts:["so","it","yes"],correct:0},
   {q:"'Will he be late?' 'I hope ___.'",opts:["not","no","don't"],correct:0},{q:"I procrastinate, and ___ my brother.",opts:["so does","so is","does so"],correct:0},
   {q:"I don't like horror films, and ___ does my wife.",opts:["neither","so","either"],correct:0},{q:"'Do you want to come?' 'I'd love ___.'",opts:["to","it","so"],correct:0},
   {q:"These shoes are too small. Have you got bigger ___?",opts:["ones","one","them"],correct:0},{q:"She said she'd help, and she ___.",opts:["did","was","so"],correct:0},
  ],
  fill:[
   {before:"'Is he an introvert?' 'I think",blank:"so",after:".'",bank:["so","it","yes"],emoji:"🐚"},
   {before:"'Will the test be hard?' 'I hope",blank:"not",after:".'",bank:["not","no","so"],emoji:"📝"},
   {before:"I overthink everything, and so",blank:"does",after:"my sister.",bank:["does","is","do"],emoji:"🌀"},
   {before:"He wasn't nervous, but I",blank:"was",after:".",bank:["was","did","were"],emoji:"😰"},
   {before:"I don't need a big car — a small",blank:"one",after:"is fine.",bank:["one","it","ones"],emoji:"🚗"},
   {before:"'Can you come tonight?' 'I'd like",blank:"to",after:", but I'm busy.'",bank:["to","it","so"],emoji:"🌙"},
   {before:"I haven't seen the film, and",blank:"neither",after:"has Tom.",bank:["neither","so","either"],emoji:"🎬"},
   {before:"'Did they apologise?' 'I'm afraid",blank:"not",after:".'",bank:["not","no","so"],emoji:"🙊"},
  ],
  build:[
   {s:"I think so, but I'm not sure.",pl:"Myślę, że tak, ale nie jestem pewien."},{s:"I hope not.",pl:"Mam nadzieję, że nie."},
   {s:"She likes psychology and so do I.",pl:"Ona lubi psychologię i ja też."},{s:"I'd love to, but I can't.",pl:"Bardzo chętnie, ale nie mogę."},{s:"I prefer the blue one.",pl:"Wolę ten niebieski."},
  ],
  errors:[
   {s:"I don't hope so.",wrong:1,ok:"I hope not."},
   {s:"She is tired and so do I.",wrong:5,ok:"She is tired and so am I."},
   {s:"I'd love it, but I'm busy.",wrong:2,ok:"I'd love to, but I'm busy."},
   {s:"I want the red ones car.",wrong:3,ok:"I want the red car."},
   {s:"I don't like it and so does he.",wrong:5,ok:"I don't like it and neither does he."},
  ],
  whack:[
   {q:"I think ___.",opts:["so","it"],correct:0},{q:"I hope ___. (negative)",opts:["not","no"],correct:0},
   {q:"I'm tired and so ___ I.",opts:["am","do"],correct:0},{q:"I'd love ___.",opts:["to","it"],correct:0},
   {q:"the green ___",opts:["one","it"],correct:0},
  ],
  wordle:[["hope","🤞"],["afraid","😟"],["neither","🙅"],["suppose","🤔"]]},
 reading:{title:"The marshmallow test",emoji:"🍬",intro:"Read about a famous psychology experiment — and why the story might be wrong — then answer, translate and discuss.",storyTitle:"The Marshmallow Test",label:"Article",paras:[
   "<b>The Marshmallow Test</b> 🍬",
   "In the late 1960s, researchers at Stanford University offered young children a simple choice: eat one marshmallow now, or wait fifteen minutes alone in a room and get two. Some children ate it immediately. Others covered their eyes, sang songs or turned their chairs around — anything to resist temptation.",
   "Years later, the researchers followed up. The children who had waited, they claimed, had better exam results and higher self-esteem as teenagers. The conclusion seemed obvious: willpower in childhood predicts success in life. Did parents start training their children to wait? Many did, and schools did too.",
   "But was the conclusion right? A larger study in 2018 suggested probably not, or at least not entirely. When researchers took family income into account, most of the effect disappeared. Children from poorer homes, where promises aren't always kept and food might disappear, had good reason not to wait. Eating the marshmallow wasn't weak willpower; it was a rational choice.",
   "The story is a useful reminder of how easily we jump to conclusions. A simple, attractive explanation spreads quickly; a complex, uncomfortable one doesn't. Is willpower important? Of course it is. Is it the whole story? Almost certainly not.",
  ],
  tf:[
   {text:"The experiment took place in the 1960s.",answer:0},{text:"Children who waited got three marshmallows.",answer:1},{text:"Some children sang songs to resist.",answer:0},
   {text:"The 2018 study fully confirmed the original conclusion.",answer:1},{text:"Family income explained much of the effect.",answer:0},{text:"The original researchers later won a prize.",answer:2},{text:"The writer thinks willpower doesn't matter at all.",answer:1}],
  quiz:[
   {q:"What choice did the children have?",opts:["One marshmallow now or two later","Sweets or fruit","Play or study"],correct:0},
   {q:"What did the first researchers claim about children who waited?",opts:["They did better at school","They were less happy","They were poorer"],correct:0},
   {q:"What changed in the 2018 study?",opts:["Family income was considered","More marshmallows were used","Adults were tested"],correct:0},
   {q:"Why might poorer children not wait?",opts:["Promises aren't always kept","They don't like sweets","They were older"],correct:0},
   {q:"What is the main lesson?",opts:["Simple explanations spread easily","Never trust science","Willpower is useless"],correct:0},
  ],
  typed:[
   {prompt:"Mam nadzieję, że nie.",answers:["I hope not"]},
   {prompt:"Myślę, że tak.",answers:["I think so"]},
   {prompt:"Ona zwleka, i ja też.",answers:["She procrastinates, and so do I","She procrastinates and so do I"]},
   {prompt:"Nie wyciągaj pochopnych wniosków.",answers:["Don't jump to conclusions","Do not jump to conclusions"]},
  ],
  writing:{label:"Your view",title:"Is willpower the key to success? ✍️",sub:"Give your opinion with examples (min. 150 words). Use ellipsis or substitution at least four times (so, not, one, do/did…).",starters:["Many people believe…","I think so too, but…","Take my own habits: …","Is it the only factor? I doubt it.","In my experience, …","All in all, …"],min:150},
  wordle:[["sweet","🍬"],["wait","⏳"],["income","💶"],["child","🧒"]]},
 test:{grammar:[
   {q:"'Is it true?' 'I'm afraid ___.'",opts:["so","it","yes"],correct:0},{q:"'Will it hurt?' 'I hope ___.'",opts:["not","no","so not"],correct:0},
   {q:"He can't swim, and ___ can I.",opts:["neither","so","either"],correct:0},{q:"This mug is broken. Can I have another ___?",opts:["one","it","ones"],correct:0},
   {q:"The ability to bounce back:",opts:["resilience","bias","anxiety"],correct:0},{q:"To delay doing something you should do:",opts:["procrastinate","conform","trigger"],correct:0},
   {q:"Refusing to accept the truth:",opts:["in denial","in charge","in demand"],correct:0},{q:"Understanding others' feelings:",opts:["empathy","willpower","habit"],correct:0}],
  errors:[
   {s:"I don't think it.",wrong:3,ok:"I don't think so."},
   {s:"He was late and so did I.",wrong:5,ok:"He was late and so was I."},
   {s:"I'd love, thank you.",wrong:1,ok:"I'd love to, thank you."},
   {s:"I hope no.",wrong:2,ok:"I hope not."}],
  typed:[
   {prompt:"Obawiam się, że tak.",answers:["I'm afraid so","I am afraid so"]},
   {prompt:"Wolę ten czerwony.",answers:["I prefer the red one","I'd prefer the red one"]},
   {prompt:"Bardzo chętnie.",answers:["I'd love to","I would love to"]},
   {prompt:"On ma niskie poczucie własnej wartości.",answers:["He has low self-esteem","He's got low self-esteem"]}]},
});

/* ================= C1 · Law & Human Rights ================= */
mkUnit({id:"ch1",level:"C1",track:"adults",topic:"Law & Rights",title:"Law & Human Rights",emoji:"⚖️",badge:"Rights Defender",sub:"Freedoms, courts and legislation — formal nominalisation (turning verbs into nouns).",
 sets:[
  {title:"Rights & freedoms",label:"Rights",words:V([
   ["human rights","prawa człowieka","🕊️"],["freedom of speech","wolność słowa","🗣️"],["equality","równość","🟰"],["discrimination","dyskryminacja","🚫"],["privacy","prywatność","🔒"],["censorship","cenzura","⬛"],
   ["protest","protest, protestować","✊"],["vote","głosować, głos","🗳️"],["asylum","azyl","🏠🛡️"],["violate","naruszać","💢"],["campaign for","walczyć o (kampanią)","📣"],["uphold","przestrzegać, stać na straży","🏛️"]])},
  {title:"The legal system",label:"Law",findTitle:"Which legal word is it? 🔎",words:V([
   ["legislation","ustawodawstwo","📜"],["constitution","konstytucja","📕"],["court","sąd","🏛️⚖️"],["lawsuit","pozew","📁"],["sue","pozwać","👉📁"],["ruling","orzeczenie","🔨"],
   ["appeal","apelacja, odwołać się","↩️"],["loophole","luka prawna","🕳️"],["ban","zakaz, zakazać","⛔"],["enforce","egzekwować","👮"],["amendment","poprawka","✏️"],["legal aid","pomoc prawna","🆘"]])},
 ],
 l1:{title:"Born free",emoji:"🕊️",intro:"Freedom of speech, equality, privacy and discrimination — the vocabulary of rights.",quizTag:"RIGHTS",quizLabel:"Rights",quiz:[
   {q:"Treating someone unfairly because of who they are:",opts:["discrimination","equality","privacy"],correct:0},{q:"The right to say what you think:",opts:["freedom of speech","censorship","asylum"],correct:0},
   {q:"Protection given by a country to a refugee:",opts:["asylum","vote","protest"],correct:0},{q:"When a government blocks books, films or news:",opts:["censorship","equality","legislation"],correct:0},
   {q:"To break a rule or a right:",opts:["violate","uphold","vote"],correct:0},{q:"The right to keep your life to yourself:",opts:["privacy","freedom of speech","protest"],correct:0},
   {q:"The courts must ___ the law.",opts:["uphold","violate","censor"],correct:0},{q:"Everyone having the same rights:",opts:["equality","discrimination","asylum"],correct:0},
  ],
  odd:[
   {opts:["equality","fairness","justice","censorship"],odd:3,why:"Censorship limits freedom."},
   {opts:["protest","march","demonstration","privacy"],odd:3,why:"Privacy isn't a public action."},
   {opts:["violate","break","breach","uphold"],odd:3,why:"'Uphold' means to support a rule."},
   {opts:["vote","elect","choose","ban"],odd:3,why:"A ban stops something; the others are choices."},
  ],
  wordle:[["rights","🕊️"],["vote","🗳️"],["equal","🟰"],["asylum","🏠🛡️"]]},
 l2:{title:"Order in court",emoji:"🔨",intro:"Legislation, lawsuits, rulings and loopholes — how the legal system works.",fillTag:"THE LAW",fill:[
   {before:"Parliament passed new",blank:"legislation",after:"on data protection.",bank:["legislation","loophole","asylum"],emoji:"📜"},
   {before:"She decided to",blank:"sue",after:"the company for unfair dismissal.",bank:["sue","enforce","ban"],emoji:"👉📁"},
   {before:"The court's",blank:"ruling",after:"was final.",bank:["ruling","lawsuit","amendment"],emoji:"🔨"},
   {before:"They plan to",blank:"appeal",after:"against the decision.",bank:["appeal","uphold","violate"],emoji:"↩️"},
   {before:"Rich companies often use a",blank:"loophole",after:"to avoid tax.",bank:["loophole","constitution","ruling"],emoji:"🕳️"},
   {before:"The city introduced a",blank:"ban",after:"on old diesel cars.",bank:["ban","vote","appeal"],emoji:"⛔"},
   {before:"The police are responsible for helping to",blank:"enforce",after:"the law.",bank:["enforce","sue","appeal"],emoji:"👮"},
   {before:"People who can't pay a lawyer can get",blank:"legal aid",after:".",bank:["legal aid","asylum","amendment"],emoji:"🆘"},
  ],
  tf:{sub:"Read the summary: 'The Universal Declaration of Human Rights was adopted by the United Nations in 1948, after the Second World War. It lists 30 rights, including the right to education, freedom of speech and freedom from torture. The declaration itself is not legally binding, but many countries have included its principles in their constitutions and legislation.'",tag:"HISTORY",items:[
   {text:"The declaration was adopted in 1948.",answer:0},{text:"It was written before the Second World War.",answer:1},{text:"It lists 30 rights.",answer:0},
   {text:"Education is one of the rights.",answer:0},{text:"The declaration is legally binding everywhere.",answer:1},{text:"No country has used its principles.",answer:1}]},
  listen:[
   {word:"They decided to appeal.",options:["They decided to appeal.","They decided to apply.","They decided to a peel."],correct:0},
   {word:"It's a violation of human rights.",options:["It's a violation of human rights.","It's a violation of human nights.","It's a vibration of human rights."],correct:0},
   {word:"The court ruled in her favour.",options:["The court ruled in her favour.","The court rolled in her favour.","The court ruled in our favour."],correct:0},
  ],
  wordle:[["court","🏛️⚖️"],["sue","👉📁"],["appeal","↩️"],["ban","⛔"],["ruling","🔨"]]},
 grammar:{title:"The introduction of the law",emoji:"📑",label:"Nominalisation",intro:"'They introduced the law' becomes 'The introduction of the law' — formal English turns verbs into nouns.",boxTitle:"Formal nominalisation",
  html:`<p><b>Nominalisation</b> = using a <b>noun</b> instead of a verb or adjective. It makes writing more <b>formal</b>, <b>impersonal</b> and compact — typical of law, reports and essays.</p>${TBL(["Verb / adjective style","Nominalised (formal)"],[["The government <b>decided</b> to ban it, which <b>surprised</b> people.","The government's <b>decision</b> to ban it came as a <b>surprise</b>."],["Prices <b>rose</b> quickly.","There was a rapid <b>rise</b> in prices."],["If people are <b>poor</b>, they can't get legal aid easily.","<b>Poverty</b> limits access to legal aid."],["They <b>failed</b> to protect privacy.","Their <b>failure</b> to protect privacy…"],["Women were <b>able</b> to vote in 1918.","Women gained the <b>ability</b> / <b>right</b> to vote in 1918."]])}<p style="margin-top:12px;">Common pairs: introduce → <b>introduction</b>, discriminate → <b>discrimination</b>, refuse → <b>refusal</b>, enforce → <b>enforcement</b>, equal → <b>equality</b>, free → <b>freedom</b>.</p>`,
  quizTag:"VERB → NOUN",quiz:[
   {q:"The ___ of the new law caused protests. (introduce)",opts:["introduction","introducing","introduce"],correct:0},{q:"Their ___ to cooperate was criticised. (refuse)",opts:["refusal","refusing","refuse"],correct:0},
   {q:"The ___ of the rules is weak. (enforce)",opts:["enforcement","enforcing","enforce"],correct:0},{q:"___ remains a major problem in many workplaces. (discriminate)",opts:["Discrimination","Discriminating","Discriminate"],correct:0},
   {q:"There has been a sharp ___ in complaints. (increase)",opts:["increase","increasing","increased"],correct:0},{q:"The court's ___ was unexpected. (decide)",opts:["decision","deciding","decide"],correct:0},
   {q:"The ___ of the prisoners was demanded. (release)",opts:["release","releasing","released"],correct:0},{q:"___ of speech is a basic right. (free)",opts:["Freedom","Freely","Free"],correct:0},
  ],
  fill:[
   {before:"The",blank:"introduction",after:"of the ban was delayed.",bank:["introduction","introduce","introducing"],emoji:"⛔"},
   {before:"Their",blank:"failure",after:"to act led to a lawsuit.",bank:["failure","fail","failing"],emoji:"📁"},
   {before:"The",blank:"protection",after:"of privacy is a priority.",bank:["protection","protect","protective"],emoji:"🔒"},
   {before:"",blank:"Equality",after:"before the law is a key principle.",bank:["Equality","Equal","Equally"],emoji:"🟰"},
   {before:"The",blank:"violation",after:"of these rights cannot be accepted.",bank:["violation","violate","violated"],emoji:"💢"},
   {before:"There was strong",blank:"opposition",after:"to the amendment.",bank:["opposition","oppose","opposed"],emoji:"✊"},
   {before:"The judge's",blank:"refusal",after:"to delay the trial surprised everyone.",bank:["refusal","refuse","refused"],emoji:"🔨"},
   {before:"",blank:"Poverty",after:"often limits access to justice.",bank:["Poverty","Poor","Poorly"],emoji:"💸"},
  ],
  build:[
   {s:"The introduction of the law caused protests.",pl:"Wprowadzenie ustawy wywołało protesty."},{s:"Their refusal to cooperate was a mistake.",pl:"Ich odmowa współpracy była błędem."},
   {s:"The protection of privacy is essential.",pl:"Ochrona prywatności jest kluczowa."},{s:"There was a sharp rise in complaints.",pl:"Nastąpił gwałtowny wzrost liczby skarg."},{s:"Discrimination remains a serious problem.",pl:"Dyskryminacja nadal jest poważnym problemem."},
  ],
  errors:[
   {s:"The introduce of the law was delayed.",wrong:1,ok:"The introduction of the law was delayed."},
   {s:"Their refuse to help was shocking.",wrong:1,ok:"Their refusal to help was shocking."},
   {s:"The court's decide was final.",wrong:2,ok:"The court's decision was final."},
   {s:"Equal before the law is essential.",wrong:0,ok:"Equality before the law is essential."},
   {s:"The enforce of rules is weak.",wrong:1,ok:"The enforcement of rules is weak."},
  ],
  whack:[
   {q:"decide → ___",opts:["decision","decidement"],correct:0},{q:"refuse → ___",opts:["refusal","refusion"],correct:0},
   {q:"free → ___",opts:["freedom","freeness"],correct:0},{q:"fail → ___",opts:["failure","failment"],correct:0},
   {q:"enforce → ___",opts:["enforcement","enforcion"],correct:0},
  ],
  wordle:[["freedom","🕊️"],["refusal","🙅"],["failure","❌"],["release","🔓"]]},
 reading:{title:"One woman, one vote",emoji:"🗳️",intro:"Read a short history of the fight for women's right to vote, then answer, translate and write a formal summary.",storyTitle:"One Woman, One Vote",label:"History",paras:[
   "<b>One Woman, One Vote</b> 🗳️",
   "At the beginning of the twentieth century, the exclusion of women from voting was the norm almost everywhere. The idea that women might take part in political decisions was seen by many men — and some women — as dangerous, even absurd.",
   "The campaign for women's suffrage took many forms. In Britain, peaceful petitions were followed by more radical action: protesters chained themselves to railings, broke windows and went on hunger strike in prison. Their imprisonment and treatment by the authorities attracted international attention and, gradually, public sympathy.",
   "Poland was surprisingly early. In November 1918, immediately after the restoration of independence, women were granted the right to vote and to stand for parliament. In Britain, women over 30 gained the vote that same year, but full equality with men only came in 1928. In Switzerland, the introduction of women's suffrage at national level did not happen until 1971.",
   "Today, the right to vote regardless of gender is considered a basic human right. Yet its history is a reminder that rights are rarely given; they are won, and their protection requires constant attention. The enforcement of equality, in voting and beyond, remains unfinished business in many parts of the world.",
  ],
  tf:[
   {text:"Women were excluded from voting in most countries around 1900.",answer:0},{text:"British campaigners only used peaceful petitions.",answer:1},{text:"Some protesters went on hunger strike.",answer:0},
   {text:"Polish women got the vote in 1918.",answer:0},{text:"British women got full equality in 1918.",answer:1},{text:"Swiss women first voted nationally in 1971.",answer:0},{text:"The first Polish female MP was a teacher.",answer:2}],
  quiz:[
   {q:"How did many people see women voting in 1900?",opts:["As dangerous or absurd","As normal","As a human right"],correct:0},
   {q:"What attracted international attention in Britain?",opts:["The protesters' imprisonment and treatment","The petitions","The elections"],correct:0},
   {q:"When did Polish women get the vote?",opts:["Right after independence in 1918","In 1928","In 1971"],correct:0},
   {q:"What happened in Britain in 1928?",opts:["Full voting equality","Women over 30 got the vote","Voting was banned"],correct:0},
   {q:"What is the writer's main message?",opts:["Rights must be won and protected","Voting is unimportant","All countries are equal now"],correct:0},
  ],
  typed:[
   {prompt:"Wolność słowa jest prawem człowieka.",answers:["Freedom of speech is a human right"]},
   {prompt:"Wprowadzenie zakazu było błędem.",answers:["The introduction of the ban was a mistake"]},
   {prompt:"Postanowili się odwołać.",answers:["They decided to appeal"]},
   {prompt:"Pozwała firmę.",answers:["She sued the company"]},
  ],
  writing:{label:"Formal summary",title:"A right worth fighting for ✍️",sub:"Write a formal paragraph about one human right and why it matters today (min. 150 words). Use at least six nominalisations (e.g. protection, introduction, failure, equality).",starters:["The protection of … is essential because…","Historically, the introduction of…","The failure to…","In many countries, discrimination…","The enforcement of…","In conclusion, …"],min:150},
  wordle:[["ballot","🗳️"],["prison","🔒"],["strike","✊"],["women","👩"]]},
 test:{grammar:[
   {q:"The ___ of the new rules was postponed. (introduce)",opts:["introduction","introducing","introduce"],correct:0},{q:"His ___ to answer surprised the court. (refuse)",opts:["refusal","refusing","refused"],correct:0},
   {q:"There was a sharp ___ in crime. (fall)",opts:["fall","falling","fell"],correct:0},{q:"The ___ of these laws is the police's job. (enforce)",opts:["enforcement","enforcing","enforce"],correct:0},
   {q:"A gap in the law that people exploit:",opts:["loophole","ruling","amendment"],correct:0},{q:"To take legal action against someone:",opts:["sue","uphold","vote"],correct:0},
   {q:"A change to a law or constitution:",opts:["amendment","appeal","asylum"],correct:0},{q:"Blocking information or art:",opts:["censorship","equality","privacy"],correct:0}],
  errors:[
   {s:"The protect of privacy matters.",wrong:1,ok:"The protection of privacy matters."},
   {s:"Their fail to act was criticised.",wrong:1,ok:"Their failure to act was criticised."},
   {s:"The judge's decide shocked us.",wrong:2,ok:"The judge's decision shocked us."},
   {s:"Free of speech is a right.",wrong:0,ok:"Freedom of speech is a right."}],
  typed:[
   {prompt:"To narusza prawa człowieka.",answers:["It violates human rights","This violates human rights","That violates human rights"]},
   {prompt:"Sąd wydał orzeczenie.",answers:["The court made a ruling","The court gave a ruling","The court issued a ruling"]},
   {prompt:"Ich odmowa współpracy była błędem.",answers:["Their refusal to cooperate was a mistake"]},
   {prompt:"Dyskryminacja jest nielegalna.",answers:["Discrimination is illegal"]}]},
});

/* ================= C1 · Global Issues & Migration ================= */
mkUnit({id:"ci1",level:"C1",track:"adults",topic:"Global Issues",title:"Global Issues & Migration",emoji:"🌍",badge:"Global Citizen",sub:"Migration, inequality and global challenges — inversion for emphasis (Never have I…, Not only…).",
 sets:[
  {title:"People on the move",label:"Migration",words:V([
   ["migrant","migrant","🚶‍♀️"],["refugee","uchodźca","⛺"],["emigrate","emigrować","🛫"],["immigrant","imigrant","🛬"],["border","granica","🚧"],["integration","integracja","🤝"],
   ["displaced","przesiedlony","🏚️"],["seek","szukać (azylu, pracy)","🔍"],["homesick","tęskniący za domem","🏡💭"],["diaspora","diaspora","🌐"],["work permit","pozwolenie na pracę","📇"],["brain drain","drenaż mózgów","🧠✈️"]])},
  {title:"Global challenges",label:"Global issues",findTitle:"Which global issue is it? 🔎",words:V([
   ["inequality","nierówność","📊"],["poverty","ubóstwo","🪙"],["famine","głód (klęska)","🌾❌"],["conflict","konflikt","⚔️"],["drought","susza","🏜️"],["humanitarian aid","pomoc humanitarna","📦❤️"],
   ["overpopulation","przeludnienie","👥🌍"],["shortage","niedobór","📉"],["life expectancy","średnia długość życia","⌛"],["literacy","umiejętność czytania i pisania","🔤"],["tackle","zmierzyć się z","🛠️"],["urgent","pilny","🚨"]])},
 ],
 l1:{title:"Leaving home",emoji:"🧳",intro:"Migrants, refugees, borders and integration — talk about why people move.",quizTag:"MIGRATION",quizLabel:"Migration",quiz:[
   {q:"A person forced to leave their country because of war or danger:",opts:["refugee","immigrant","diaspora"],correct:0},{q:"To leave your country to live in another one:",opts:["emigrate","integrate","seek"],correct:0},
   {q:"The line between two countries:",opts:["border","permit","shortage"],correct:0},{q:"When skilled people leave a country for better jobs abroad:",opts:["brain drain","integration","diaspora"],correct:0},
   {q:"Missing your home when you're away:",opts:["homesick","displaced","urgent"],correct:0},{q:"Becoming part of a new society:",opts:["integration","emigration","drought"],correct:0},
   {q:"Forced to leave your home, even inside your country:",opts:["displaced","homesick","literate"],correct:0},{q:"A document that lets you work legally abroad:",opts:["work permit","border","asylum"],correct:0},
  ],
  odd:[
   {opts:["migrant","refugee","immigrant","border"],odd:3,why:"A border isn't a person."},
   {opts:["emigrate","relocate","move abroad","integrate"],odd:3,why:"Integrating happens after you arrive."},
   {opts:["homesick","lonely","nostalgic","urgent"],odd:3,why:"'Urgent' isn't a feeling about home."},
   {opts:["visa","passport","work permit","diaspora"],odd:3,why:"A diaspora is a community, not a document."},
  ],
  wordle:[["border","🚧"],["migrant","🚶‍♀️"],["seek","🔍"],["refugee","⛺"]]},
 l2:{title:"One world",emoji:"🌐",intro:"Poverty, inequality, drought and famine — the challenges facing our planet.",fillTag:"GLOBAL ISSUES",fill:[
   {before:"The gap between rich and poor shows growing",blank:"inequality",after:".",bank:["inequality","literacy","integration"],emoji:"📊"},
   {before:"After three years without rain, the region suffered a severe",blank:"drought",after:".",bank:["drought","conflict","shortage"],emoji:"🏜️"},
   {before:"The",blank:"famine",after:"left millions without enough food.",bank:["famine","border","diaspora"],emoji:"🌾❌"},
   {before:"Charities sent",blank:"humanitarian aid",after:"to the area.",bank:["humanitarian aid","brain drain","work permits"],emoji:"📦❤️"},
   {before:"There's a",blank:"shortage",after:"of doctors in rural areas.",bank:["shortage","drought","conflict"],emoji:"📉"},
   {before:"",blank:"Life expectancy",after:"has risen thanks to better healthcare.",bank:["Life expectancy","Literacy","Poverty"],emoji:"⌛"},
   {before:"Governments must work together to",blank:"tackle",after:"climate change.",bank:["tackle","seek","emigrate"],emoji:"🛠️"},
   {before:"",blank:"Literacy",after:"rates have improved as more girls go to school.",bank:["Literacy","Famine","Inequality"],emoji:"🔤"},
  ],
  tf:{sub:"Read the data summary: 'According to the UN, more than 280 million people live outside their country of birth — about 3.6% of the world's population. Most migrate for work or family reasons. However, over 100 million people have been forcibly displaced by conflict, persecution or disasters. Most refugees live in countries next to their own, not in rich Western nations.'",tag:"THE DATA",items:[
   {text:"Over 280 million people live outside their country of birth.",answer:0},{text:"That is more than 10% of the world's population.",answer:1},{text:"Most people migrate for work or family.",answer:0},
   {text:"Over 100 million people have been forcibly displaced.",answer:0},{text:"Most refugees live in rich Western countries.",answer:1},{text:"Disasters never cause displacement.",answer:1}]},
  listen:[
   {word:"There's a severe drought.",options:["There's a severe drought.","There's a severe draught.","There's a several drought."],correct:0},
   {word:"Millions are seeking asylum.",options:["Millions are seeking asylum.","Millions are speaking asylum.","Millions are seeking a sign."],correct:0},
   {word:"We must tackle inequality.",options:["We must tackle inequality.","We must tackle in quality.","We must take on equality."],correct:0},
  ],
  wordle:[["poverty","🪙"],["famine","🌾❌"],["drought","🏜️"],["tackle","🛠️"],["urgent","🚨"]]},
 grammar:{title:"Never have I seen…",emoji:"❗",label:"Inversion for emphasis",intro:"Never have I seen such poverty. Not only did they lose their home, but… — inversion for dramatic emphasis.",boxTitle:"Inversion for emphasis",
  html:`<p>After a <b>negative or limiting</b> phrase at the start of a sentence, we use <b>question word order</b> (auxiliary + subject). It sounds formal and dramatic.</p>${TBL(["Normal","Inverted (emphatic)"],[["I have <b>never</b> seen such poverty.","<b>Never have I</b> seen such poverty."],["They lost their home and their jobs.","<b>Not only did they</b> lose their home, <b>but</b> they also lost their jobs."],["We <b>rarely</b> hear their stories.","<b>Rarely do we</b> hear their stories."],["I realised the danger only later.","<b>Only later did I</b> realise the danger."],["You should not open the door <b>under any circumstances</b>.","<b>Under no circumstances should you</b> open the door."],["As soon as we arrived, the border closed.","<b>No sooner had we</b> arrived <b>than</b> the border closed."]])}<p style="margin-top:12px;">No auxiliary? Add <b>do / does / did</b>: Seldom <b>does</b> he complain.</p>`,
  quizTag:"INVERSION",quiz:[
   {q:"Never ___ such a crisis.",opts:["have I seen","I have seen","I saw"],correct:0},{q:"Not only ___ their homes, but also their families.",opts:["did they lose","they lost","lost they"],correct:0},
   {q:"Rarely ___ politicians admit mistakes.",opts:["do","does","are"],correct:0},{q:"Under no circumstances ___ cross the border here.",opts:["should you","you should","you"],correct:0},
   {q:"No sooner had we left ___ the storm began.",opts:["than","when","then"],correct:0},{q:"Only later ___ how dangerous the journey was.",opts:["did she realise","she realised","realised she"],correct:0},
   {q:"Seldom ___ he talk about his past.",opts:["does","do","is"],correct:0},{q:"Little ___ they know what was waiting for them.",opts:["did","were","had"],correct:0},
  ],
  fill:[
   {before:"Never",blank:"have",after:"I felt so far from home.",bank:["have","did","am"],emoji:"🏡💭"},
   {before:"Not only",blank:"did",after:"they cross the desert, but they also crossed the sea.",bank:["did","have","were"],emoji:"🏜️"},
   {before:"Rarely",blank:"do",after:"we think about where our food comes from.",bank:["do","are","have"],emoji:"🍞"},
   {before:"Under no circumstances",blank:"should",after:"aid workers be attacked.",bank:["should","would","can"],emoji:"📦❤️"},
   {before:"No sooner had the war ended",blank:"than",after:"the famine began.",bank:["than","when","then"],emoji:"🌾❌"},
   {before:"Only when I emigrated",blank:"did",after:"I understand my parents.",bank:["did","do","had"],emoji:"🛫"},
   {before:"Seldom",blank:"does",after:"the news show the full story.",bank:["does","do","is"],emoji:"📰"},
   {before:"Little",blank:"did",after:"we know how hard integration would be.",bank:["did","had","were"],emoji:"🤝"},
  ],
  build:[
   {s:"Never have I seen such poverty.",pl:"Nigdy nie widziałem takiej biedy."},{s:"Not only did they lose their home.",pl:"Nie tylko stracili dom."},
   {s:"Rarely do we hear their stories.",pl:"Rzadko słyszymy ich historie."},{s:"Under no circumstances should you give up.",pl:"W żadnym wypadku nie powinieneś się poddawać."},{s:"Only later did I understand.",pl:"Dopiero później zrozumiałem."},
  ],
  errors:[
   {s:"Never I have seen such a thing.",wrong:1,ok:"Never have I seen such a thing."},
   {s:"Not only they lost their jobs, but also their homes.",wrong:2,ok:"Not only did they lose their jobs, but also their homes."},
   {s:"Rarely we hear good news.",wrong:1,ok:"Rarely do we hear good news."},
   {s:"No sooner had we arrived when it rained.",wrong:5,ok:"No sooner had we arrived than it rained."},
   {s:"Only later I realised the truth.",wrong:2,ok:"Only later did I realise the truth."},
  ],
  whack:[
   {q:"Never ___ I…",opts:["have","I have"],correct:0},{q:"Rarely ___ we…",opts:["do","we"],correct:0},
   {q:"No sooner… ___",opts:["than","when"],correct:0},{q:"Not only ___ they…",opts:["did","they"],correct:0},
   {q:"Under no circumstances ___ you…",opts:["should","you should"],correct:0},
  ],
  wordle:[["never","🚫"],["rarely","🐢"],["seldom","🕰️"],["sooner","⏩"]]},
 reading:{title:"Two suitcases",emoji:"🧳",intro:"Read a personal essay by a woman who emigrated twice, then answer, translate and write about belonging.",storyTitle:"Two Suitcases",label:"Essay",paras:[
   "<b>Two Suitcases</b> 🧳",
   "My grandmother left Poland in 1981 with two suitcases and a baby — my mother. Thirty-five years later, I made the opposite journey, from Chicago to Kraków, with two suitcases and a laptop. Never have I felt my family's history as strongly as on the day I landed.",
   "For my grandmother, emigration was a necessity. Not only had she lost her job, but she feared for her husband's safety. In America she cleaned offices at night and studied English by day. Rarely did she complain, yet she was homesick for the rest of her life. She never went back.",
   "My move was a choice, and I know how privileged that makes me. I have a work permit, a passport that opens most borders and a job that exists entirely online. Only after arriving did I understand how different my experience is from that of the refugees I now meet as a volunteer — people displaced by conflict and drought, who often carry no suitcase at all.",
   "We talk about migration as if it were one thing. It isn't. Behind every statistic is a person deciding what to pack and what to leave behind. Under no circumstances should we forget that most of our families, if we look back far enough, were once the ones arriving.",
  ],
  tf:[
   {text:"The grandmother left Poland in 1981.",answer:0},{text:"The writer moved from Kraków to Chicago.",answer:1},{text:"The grandmother studied English during the day.",answer:0},
   {text:"The grandmother often complained.",answer:1},{text:"The writer's job is online.",answer:0},{text:"The writer volunteers with refugees.",answer:0},{text:"The writer's mother is a doctor.",answer:2}],
  quiz:[
   {q:"What did the grandmother take with her?",opts:["Two suitcases and a baby","A laptop","Nothing at all"],correct:0},
   {q:"Why did the grandmother emigrate?",opts:["She had lost her job and feared for her husband","She wanted adventure","She got a job offer"],correct:0},
   {q:"How does the writer describe her own move?",opts:["As a privileged choice","As a necessity","As a mistake"],correct:0},
   {q:"What did she understand only after arriving?",opts:["How different refugees' experiences are","How to speak Polish","How cheap Kraków is"],correct:0},
   {q:"What does the writer ask us not to forget?",opts:["Most families were once migrants","Statistics are always right","Borders should be closed"],correct:0},
  ],
  typed:[
   {prompt:"Nigdy nie widziałem czegoś takiego.",answers:["Never have I seen anything like it","Never have I seen anything like this","Never have I seen such a thing","I've never seen anything like it","I have never seen anything like it"]},
   {prompt:"Ona tęskni za domem.",answers:["She's homesick","She is homesick","She misses home","She feels homesick"]},
   {prompt:"Rzadko słyszymy ich historie.",answers:["Rarely do we hear their stories","We rarely hear their stories"]},
   {prompt:"Musimy zmierzyć się z ubóstwem.",answers:["We must tackle poverty","We have to tackle poverty","We need to tackle poverty"]},
  ],
  writing:{label:"Your essay",title:"Where do I belong? ✍️",sub:"Write about migration in your family or community, or about what 'home' means to you (min. 150 words). Use at least four inverted structures.",starters:["Never have I…","Not only did…, but…","Rarely do people…","Only when… did I…","Under no circumstances should we…","No sooner had… than…"],min:150},
  wordle:[["luggage","🧳"],["laptop","💻"],["permit","📇"],["helper","🙋"]]},
 test:{grammar:[
   {q:"Never ___ so many people at the border.",opts:["had we seen","we had seen","we saw"],correct:0},{q:"Not only ___ food, but also medicine.",opts:["did they need","they needed","needed they"],correct:0},
   {q:"Only then ___ the truth.",opts:["did I learn","I learned","learned I"],correct:0},{q:"No sooner ___ arrived than the rain started.",opts:["had they","they had","did they"],correct:0},
   {q:"A long period without rain:",opts:["drought","famine","conflict"],correct:0},{q:"Skilled people leaving their country:",opts:["brain drain","diaspora","integration"],correct:0},
   {q:"Not having enough of something:",opts:["shortage","literacy","border"],correct:0},{q:"To deal with a difficult problem:",opts:["tackle","emigrate","seek"],correct:0}],
  errors:[
   {s:"Never I have been so tired.",wrong:1,ok:"Never have I been so tired."},
   {s:"Rarely she talks about the war.",wrong:1,ok:"Rarely does she talk about the war."},
   {s:"Under no circumstances you should leave.",wrong:3,ok:"Under no circumstances should you leave."},
   {s:"No sooner had I sat down then the phone rang.",wrong:6,ok:"No sooner had I sat down than the phone rang."}],
  typed:[
   {prompt:"Nie tylko stracili dom.",answers:["Not only did they lose their home","Not only did they lose their house"]},
   {prompt:"Dopiero później zrozumiałem.",answers:["Only later did I understand","Only later did I realise","Only later did I realize"]},
   {prompt:"Wysłano pomoc humanitarną.",answers:["Humanitarian aid was sent","They sent humanitarian aid"]},
   {prompt:"On jest uchodźcą.",answers:["He's a refugee","He is a refugee"]}]},
});
