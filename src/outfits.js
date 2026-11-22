
/* =====================================================================
   Leo's wardrobe (2026-11-22): outfits drawn as vector art that fits each of the five lemurs.
   Anchors per Leo come from lemurs.py (rig.o for the square picture, rig.oh for the round head):
   cap = the navy cap (hats cover it), eyes (glasses), neck (scarves, ties, medals), back (capes).
   Each piece is drawn in its own units: 100 = the cap width / eye distance / neck width / shoulder width.
   ===================================================================== */
const OUTFIT_DEFS=`<defs>
<linearGradient id="lgRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".55" stop-color="#e02f3a"/><stop offset="1" stop-color="#a3121f"/></linearGradient>
<linearGradient id="lgRedD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c81d2a"/><stop offset="1" stop-color="#7d0c16"/></linearGradient>
<linearGradient id="lgGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1b0"/><stop offset=".45" stop-color="#f2c14e"/><stop offset="1" stop-color="#b47a16"/></linearGradient>
<linearGradient id="lgGoldH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b47a16"/><stop offset=".35" stop-color="#ffe58a"/><stop offset=".6" stop-color="#f2c14e"/><stop offset="1" stop-color="#a86d10"/></linearGradient>
<linearGradient id="lgBlack" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#121218"/><stop offset=".3" stop-color="#3b3b4a"/><stop offset=".55" stop-color="#22222c"/><stop offset="1" stop-color="#0a0a0f"/></linearGradient>
<linearGradient id="lgStraw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe6ae"/><stop offset=".6" stop-color="#e8c071"/><stop offset="1" stop-color="#c4904a"/></linearGradient>
<linearGradient id="lgPurple" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3b1f78"/><stop offset=".35" stop-color="#7d4fd0"/><stop offset=".6" stop-color="#5a33a8"/><stop offset="1" stop-color="#2c1660"/></linearGradient>
<linearGradient id="lgRoyal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b3fd0"/><stop offset="1" stop-color="#3a1470"/></linearGradient>
<linearGradient id="lgCape" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f1020"/><stop offset=".3" stop-color="#e63946"/><stop offset=".55" stop-color="#c81d2a"/><stop offset="1" stop-color="#7a0c18"/></linearGradient>
<linearGradient id="lgLens" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c4a6e"/><stop offset="1" stop-color="#0b1020"/></linearGradient>
<linearGradient id="lgPink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9ccf"/><stop offset="1" stop-color="#e0408f"/></linearGradient>
<linearGradient id="lgBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa2ff"/><stop offset="1" stop-color="#1f4fb8"/></linearGradient>
<linearGradient id="lgNavy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3c8f"/><stop offset="1" stop-color="#0b1650"/></linearGradient>
<linearGradient id="lgCream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dcd6c8"/></linearGradient>
<linearGradient id="lgGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ee07a"/><stop offset="1" stop-color="#2f8f3c"/></linearGradient>
<radialGradient id="rgMedal" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#fff6c4"/><stop offset=".45" stop-color="#f2c14e"/><stop offset="1" stop-color="#9c6510"/></radialGradient>
<radialGradient id="rgPom" cx=".38" cy=".32" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d2c2"/></radialGradient>
</defs>`;
const _OL='stroke="rgba(20,10,30,.45)" stroke-width="1.6" stroke-linejoin="round"';
const _SH='fill="#fff" opacity=".28"';
function _flower(x,y,r,c){let p='';for(let i=0;i<5;i++){const a=i*72*Math.PI/180;p+=`<circle cx="${(x+Math.cos(a)*r*.62).toFixed(1)}" cy="${(y+Math.sin(a)*r*.62).toFixed(1)}" r="${(r*.5).toFixed(1)}" fill="${c}" stroke="rgba(120,30,70,.35)" stroke-width=".8"/>`;}
  return p+`<circle cx="${x}" cy="${y}" r="${(r*.36).toFixed(1)}" fill="#ffd23f"/>`;}
function _star(x,y,r,f,extra){let p=[];for(let i=0;i<10;i++){const a=(i*36-90)*Math.PI/180,rr=i%2?r*.45:r;p.push((x+Math.cos(a)*rr).toFixed(1)+','+(y+Math.sin(a)*rr).toFixed(1));}return `<polygon points="${p.join(' ')}" fill="${f}" ${extra||''}/>`;}
const OUTFIT_ART={
 /* ---- hats: origin = middle of Leo's navy cap; they cover it ---- */
 o_cap:{top:-46,svg:()=>`<path d="M-50,14 C-50,-34 -22,-44 0,-44 C24,-44 52,-34 52,14 Z" fill="url(#lgRed)" ${_OL}/>
  <path d="M0,-44 C-6,-20 -6,0 -4,14" fill="none" stroke="rgba(90,0,10,.35)" stroke-width="1.5"/><path d="M0,-44 C14,-22 22,-4 24,14" fill="none" stroke="rgba(90,0,10,.3)" stroke-width="1.3"/>
  <circle cx="0" cy="-44" r="5" fill="url(#lgRedD)"/><ellipse cx="-20" cy="-22" rx="13" ry="8" ${_SH}/>
  <circle cx="-6" cy="-12" r="11" fill="#fff" ${_OL}/>${_star(-6,-12,8,'#f2c14e')}
  <path d="M-54,10 Q2,-2 58,8 Q64,24 6,30 Q-56,30 -54,10 Z" fill="url(#lgRedD)" ${_OL}/>`},
 o_tophat:{top:-82,svg:()=>`<ellipse cx="0" cy="16" rx="64" ry="14" fill="url(#lgBlack)" ${_OL}/>
  <path d="M-42,15 L-44,-74 Q0,-82 44,-74 L42,15 Q0,22 -42,15 Z" fill="url(#lgBlack)" ${_OL}/>
  <ellipse cx="0" cy="-74" rx="44" ry="8" fill="#3a3a48"/>
  <path d="M-43,-6 Q0,0 43,-6 L42,10 Q0,17 -42,10 Z" fill="url(#lgRed)"/>
  <rect x="-30" y="-68" width="8" height="58" rx="4" ${_SH}/>`},
 o_sunhat:{top:-40,svg:()=>`<ellipse cx="0" cy="12" rx="82" ry="22" fill="url(#lgStraw)" ${_OL}/>
  <ellipse cx="0" cy="12" rx="66" ry="15" fill="none" stroke="rgba(150,100,40,.35)" stroke-width="1.5"/>
  <path d="M-44,12 C-46,-38 46,-38 44,12 Q0,20 -44,12 Z" fill="url(#lgStraw)" ${_OL}/>
  <path d="M-30,-18 Q0,-26 30,-18 M-38,-6 Q0,-14 38,-6" fill="none" stroke="rgba(150,100,40,.35)" stroke-width="1.5"/>
  <path d="M-45,2 Q0,10 45,2 L44,12 Q0,20 -44,12 Z" fill="url(#lgPink)"/>
  ${_flower(34,4,11,'#fff')}<ellipse cx="-20" cy="-22" rx="10" ry="6" ${_SH}/>`},
 o_grad:{top:-46,svg:()=>`<path d="M-42,-6 L42,-6 L40,22 Q0,30 -40,22 Z" fill="url(#lgBlack)" ${_OL}/>
  <polygon points="0,-46 76,-24 0,-4 -76,-24" fill="#1c1c26" ${_OL}/><polygon points="0,-4 76,-24 76,-19 0,1 -76,-19 -76,-24" fill="#0c0c12"/>
  <polygon points="0,-44 40,-32 0,-22 -40,-32" fill="#fff" opacity=".1"/>
  <path d="M0,-25 Q40,-24 54,-20 L56,14" fill="none" stroke="url(#lgGold)" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M51,12 L61,12 L64,32 L48,32 Z" fill="url(#lgGold)"/><circle cx="0" cy="-25" r="5" fill="url(#lgGold)"/>`},
 o_crown:{top:-40,svg:()=>`<path d="M-42,10 C-42,-34 42,-34 42,10 Z" fill="url(#lgRed)" ${_OL}/><ellipse cx="-14" cy="-14" rx="10" ry="6" ${_SH}/>
  <path d="M-48,22 L-52,-18 L-30,2 L-16,-32 L0,-4 L16,-32 L30,2 L52,-18 L48,22 Q0,30 -48,22 Z" fill="url(#lgGold)" ${_OL}/>
  <path d="M-48,8 Q0,16 48,8 L48,22 Q0,30 -48,22 Z" fill="url(#lgGoldH)" ${_OL}/>
  <circle cx="-52" cy="-18" r="5" fill="#e63946"/><circle cx="52" cy="-18" r="5" fill="#e63946"/><circle cx="-16" cy="-32" r="5" fill="#4ea8ff"/><circle cx="16" cy="-32" r="5" fill="#4ea8ff"/>
  <ellipse cx="0" cy="16" rx="7" ry="6" fill="#2fbf71" stroke="#fff" stroke-width="1"/><circle cx="-28" cy="15" r="4" fill="#e63946"/><circle cx="28" cy="15" r="4" fill="#e63946"/>
  <circle cx="-2" cy="14" r="2" fill="#fff" opacity=".7"/>`},
 o_flowers:{top:-14,svg:()=>{let s=`<path d="M-58,14 Q0,30 58,14" fill="none" stroke="url(#lgGreen)" stroke-width="7" stroke-linecap="round"/>`;
  [[-58,10],[-36,-4],[-14,-12],[10,-12],[34,-6],[56,6],[-48,22],[46,22]].forEach(([x,y],i)=>{s+=`<ellipse cx="${x}" cy="${y+14}" rx="9" ry="4.5" transform="rotate(${i%2?30:-30} ${x} ${y+14})" fill="url(#lgGreen)"/>`;});
  [[-56,14,'#ff8ac6'],[-34,20,'#fff'],[-10,24,'#ffd23f'],[14,24,'#ff8ac6'],[38,20,'#fff'],[58,12,'#b28dff']].forEach(([x,y,c])=>{s+=_flower(x,y,12,c);});return s;}},
 o_beanie:{top:-60,svg:()=>`<circle cx="0" cy="-46" r="15" fill="url(#rgPom)" ${_OL}/>
  <path d="M-50,12 C-52,-46 52,-46 50,12 Z" fill="url(#lgRed)" ${_OL}/>
  ${[-36,-24,-12,0,12,24,36].map(x=>`<path d="M${x},${-34+Math.abs(x)*.25} Q${x*1.05},-10 ${x*1.1},10" fill="none" stroke="rgba(90,0,10,.28)" stroke-width="2"/>`).join('')}
  <path d="M-46,-14 Q0,-24 46,-14" fill="none" stroke="#fff" stroke-width="6" opacity=".9"/>
  <path d="M-55,4 Q0,-4 55,4 L55,24 Q0,32 -55,24 Z" fill="url(#lgCream)" ${_OL}/>
  ${[-44,-30,-16,-2,12,26,40].map(x=>`<path d="M${x},${1-(Math.abs(x)<30?2:0)} L${x},26" stroke="rgba(0,0,0,.1)" stroke-width="2.5"/>`).join('')}
  <ellipse cx="-22" cy="-26" rx="10" ry="6" ${_SH}/>`},
 o_wizard:{top:-108,svg:()=>`<path d="M-46,14 Q-14,-30 10,-104 Q22,-40 46,14 Z" fill="url(#lgPurple)" ${_OL}/>
  <ellipse cx="0" cy="16" rx="70" ry="14" fill="#3b1f78" ${_OL}/>
  <path d="M-45,4 Q0,12 45,4 L46,14 Q0,22 -46,14 Z" fill="url(#lgGold)"/>
  ${_star(-8,-26,9,'url(#lgGold)')}${_star(14,-58,6,'url(#lgGold)')}${_star(22,-14,5,'#fff')}<circle cx="-20" cy="-6" r="2.4" fill="#fff"/><circle cx="4" cy="-82" r="2" fill="#fff"/>`},
 o_pirate:{top:-36,svg:()=>`<path d="M-74,22 Q-66,-16 -32,-24 Q0,-44 32,-24 Q66,-16 74,22 Q40,8 0,18 Q-40,8 -74,22 Z" fill="url(#lgBlack)" ${_OL}/>
  <path d="M-74,22 Q-40,8 0,18 Q40,8 74,22" fill="none" stroke="url(#lgGold)" stroke-width="4"/>
  <circle cx="0" cy="-8" r="11" fill="#f4efe2"/><circle cx="-4" cy="-10" r="2.6" fill="#222"/><circle cx="4" cy="-10" r="2.6" fill="#222"/><rect x="-4" y="-2" width="8" height="3" rx="1" fill="#222"/>
  <path d="M-12,6 L12,-2 M-12,-2 L12,6" stroke="#f4efe2" stroke-width="3" stroke-linecap="round"/>
  <path d="M40,-20 Q70,-60 88,-50 Q70,-36 48,-16 Z" fill="url(#lgRed)" ${_OL}/>`},
 o_party:{top:-110,svg:()=>`<g transform="translate(4,-22) rotate(8)"><path d="M-30,6 L0,-80 L30,6 Q0,14 -30,6 Z" fill="url(#lgBlue)" ${_OL}/>
  <path d="M-20,-22 L-8,-56 L8,-56 L-6,-22 Z M-28,0 L-16,-34 L4,-34 L-6,4 Z" fill="url(#lgGold)" opacity=".95"/>
  <path d="M12,-46 L20,-22 L8,4 L22,8 Z" fill="url(#lgPink)" opacity=".9"/>
  <circle cx="0" cy="-82" r="9" fill="url(#lgPink)" ${_OL}/><circle cx="-12" cy="-20" r="2.5" fill="#fff"/><circle cx="14" cy="-8" r="2.5" fill="#fff"/></g>`},
 /* ---- glasses & masks: origin = between the eyes, eyes at x = -50 and +50 ---- */
 o_glasses:{svg:()=>`<g fill="rgba(210,235,255,.16)" stroke="url(#lgGoldH)" stroke-width="6"><circle cx="-50" cy="0" r="33"/><circle cx="50" cy="0" r="33"/></g>
  <path d="M-18,-4 Q0,-14 18,-4" fill="none" stroke="url(#lgGold)" stroke-width="5"/><path d="M-83,-6 L-100,-10 M83,-6 L100,-10" stroke="url(#lgGold)" stroke-width="5" stroke-linecap="round"/>
  <path d="M-68,-16 Q-60,-26 -48,-26 M32,-16 Q40,-26 52,-26" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>`},
 o_shades:{svg:()=>[-1,1].map(k=>`<path d="M${k*86},-20 Q${k*50},-30 ${k*14},-18 Q${k*10},24 ${k*46},32 Q${k*84},28 ${k*86},-20 Z" fill="url(#lgLens)" stroke="#1a1a22" stroke-width="4"/>
  <path d="M${k*70},-14 L${k*34},16" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/>`).join('')+
  `<path d="M-14,-16 Q0,-24 14,-16" fill="none" stroke="#1a1a22" stroke-width="5"/><path d="M-86,-18 L-102,-22 M86,-18 L102,-22" stroke="#1a1a22" stroke-width="5" stroke-linecap="round"/>`},
 o_starglasses:{svg:()=>_star(-50,2,44,'url(#lgPink)',_OL)+_star(50,2,44,'url(#lgPink)',_OL)+
  `<circle cx="-50" cy="4" r="20" fill="rgba(255,240,250,.35)"/><circle cx="50" cy="4" r="20" fill="rgba(255,240,250,.35)"/><path d="M-20,-2 Q0,-12 20,-2" fill="none" stroke="#e0408f" stroke-width="6"/>
  <circle cx="-60" cy="-8" r="5" fill="#fff" opacity=".8"/><circle cx="40" cy="-8" r="5" fill="#fff" opacity=".8"/>`},
 o_mask:{svg:()=>`<path fill-rule="evenodd" d="M-104,-8 Q-86,-40 -46,-34 Q0,-26 46,-34 Q86,-40 104,-8 Q96,34 52,34 Q18,34 0,16 Q-18,34 -52,34 Q-96,34 -104,-8 Z
  M-50,-18 C-28,-18 -24,18 -50,20 C-74,18 -72,-18 -50,-18 Z M50,-18 C72,-18 74,18 50,20 C24,18 28,-18 50,-18 Z" fill="url(#lgRed)" ${_OL}/>
  <path d="M-104,-8 L-124,-2 L-118,10 M104,-8 L124,-2 L118,10" fill="none" stroke="#c81d2a" stroke-width="5" stroke-linecap="round"/>
  <path d="M-88,-22 Q-70,-32 -54,-30" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".45"/>`},
 /* ---- neck: origin = middle of the neck, 100 = neck width ---- */
 o_bow:{svg:()=>`<path d="M-6,-2 L-44,-24 Q-54,0 -44,24 Z M6,-2 L44,-24 Q54,0 44,24 Z" fill="url(#lgRed)" ${_OL}/>
  <path d="M-12,0 L-36,-12 M-12,2 L-36,14 M12,0 L36,-12 M12,2 L36,14" stroke="rgba(90,0,10,.35)" stroke-width="2"/>
  <rect x="-10" y="-11" width="20" height="22" rx="6" fill="url(#lgRedD)" ${_OL}/>
  ${[[-30,-6],[-22,10],[30,-6],[22,10],[-38,4],[38,4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#fff" opacity=".85"/>`).join('')}`},
 o_scarf:{svg:()=>`<path d="M14,8 L40,8 L46,84 L20,86 Z" fill="url(#lgRed)" ${_OL}/>
  <path d="M16,30 L42,29 M18,52 L44,51 M19,70 L45,69" stroke="#fff" stroke-width="6"/>
  <path d="M20,86 L21,96 M27,86 L28,96 M34,85 L35,95 M41,85 L42,95" stroke="#e02f3a" stroke-width="3" stroke-linecap="round"/>
  <path d="M-58,-12 Q0,8 58,-12 L60,12 Q0,34 -60,12 Z" fill="url(#lgRed)" ${_OL}/>
  <path d="M-59,0 Q0,22 59,0" fill="none" stroke="#fff" stroke-width="6"/>
  <path d="M8,10 Q22,4 34,10 L36,24 Q22,30 10,24 Z" fill="url(#lgRedD)" ${_OL}/>`},
 o_medal:{svg:()=>`<path d="M-42,-12 L-10,42 L10,42 L42,-12 L28,-12 L0,32 L-28,-12 Z" fill="url(#lgBlue)" ${_OL}/>
  <path d="M-36,-12 L-6,38 M36,-12 L6,38" stroke="#fff" stroke-width="3" opacity=".6"/>
  <circle cx="0" cy="58" r="22" fill="url(#rgMedal)" ${_OL}/><circle cx="0" cy="58" r="15" fill="none" stroke="#b47a16" stroke-width="2"/>
  ${_star(0,58,11,'#fff3c2','stroke="#b47a16" stroke-width="1.2"')}`},
 o_tie:{svg:()=>`<path d="M-10,2 L10,2 L18,92 L0,112 L-18,92 Z" fill="url(#lgNavy)" ${_OL}/>
  ${[24,46,68,90].map(y=>`<path d="M${-12-y*.06},${y} L${12+y*.06},${y-14}" stroke="url(#lgGold)" stroke-width="4"/>`).join('')}
  <path d="M-14,-10 L14,-10 L10,8 L-10,8 Z" fill="url(#lgNavy)" ${_OL}/>
  <path d="M-30,-14 L-12,-6 L-16,10 Z M30,-14 L12,-6 L16,10 Z" fill="#fff" ${_OL}/>`},
 /* ---- back: origin = between the shoulders, 100 = shoulder width; a.L = cape length ---- */
 o_cape:{svg:a=>{const L=a.L,R=74+L*.2;return `<path d="M-46,-2 L-34,-18 Q0,-8 34,-18 L46,-2 C58,${L*.35} 70,${L*.75} ${R},${L} Q0,${L+16} ${-R},${L} C-70,${L*.75} -58,${L*.35} -46,-2 Z" fill="url(#lgCape)" ${_OL}/>
  <path d="M-30,10 C-40,${L*.4} -48,${L*.7} -52,${L*.95} M28,10 C38,${L*.4} 46,${L*.7} 50,${L*.95}" fill="none" stroke="rgba(80,0,10,.35)" stroke-width="3"/>
  <path d="M-34,-18 Q0,-8 34,-18 L30,-8 Q0,0 -30,-8 Z" fill="url(#lgGold)"/>`},
  front:()=>`<path d="M-40,-10 Q-20,-2 -6,-4 L-6,4 Q-24,6 -42,-2 Z M40,-10 Q20,-2 6,-4 L6,4 Q24,6 42,-2 Z" fill="url(#lgRedD)" ${_OL}/><circle cx="0" cy="0" r="8" fill="url(#rgMedal)" ${_OL}/>${_star(0,0,5,'#fff3c2')}`},
 o_royal:{svg:a=>{const L=a.L,R=76+L*.2;let d='';for(let i=0;i<9;i++){const t=i/8,x=-R+t*2*R;d+=`<path d="M${x.toFixed(1)},${(L+4-Math.sin(t*Math.PI)*-10).toFixed(1)} l-2,6 l2,4 l2,-4 Z" fill="#111"/>`;}
  return `<path d="M-46,-2 L-34,-18 Q0,-8 34,-18 L46,-2 C58,${L*.35} 70,${L*.75} ${R},${L} Q0,${L+16} ${-R},${L} C-70,${L*.75} -58,${L*.35} -46,-2 Z" fill="url(#lgRoyal)" ${_OL}/>
  <path d="M${R},${L} Q0,${L+16} ${-R},${L}" fill="none" stroke="url(#lgCream)" stroke-width="14" stroke-linecap="round"/>${d}
  <path d="M-48,-4 Q0,10 48,-4 L44,-22 Q0,-8 -44,-22 Z" fill="url(#lgCream)" ${_OL}/>
  ${[-30,-10,10,30].map(x=>`<path d="M${x},${-6+Math.abs(x)*-.1} l-2,5 l2,4 l2,-4 Z" fill="#111"/>`).join('')}`},
  front:()=>`<path d="M-44,-12 Q-22,0 -6,-2 L-6,6 Q-26,10 -46,-2 Z M44,-12 Q22,0 6,-2 L6,6 Q26,10 46,-2 Z" fill="url(#lgCream)" ${_OL}/><circle cx="-24" cy="0" r="1.8" fill="#111"/><circle cx="24" cy="0" r="1.8" fill="#111"/><circle cx="0" cy="2" r="8" fill="url(#rgMedal)" ${_OL}/><circle cx="0" cy="2" r="3.5" fill="#7b3fd0"/>`},
};
const OUTFIT_SLOTS=['back','neck','face','head'];
const _g=(x,y,deg,k,body)=>`<g transform="translate(${(+x).toFixed(2)} ${(+y).toFixed(2)}) rotate(${deg||0}) scale(${(+k).toFixed(4)})">${body}</g>`;
/* the outfit groups for one Leo picture. o = anchors (rig.o or rig.oh), eq = what Leo wears, slots = which layers */
function outfitSvg(o,eq,slots){if(!o)return '';let s='';
  slots.forEach(sl=>{const id=eq[sl];let art=id&&OUTFIT_ART[id];
    if(!art&&sl==='neck'&&eq.back&&OUTFIT_ART[eq.back]&&OUTFIT_ART[eq.back].front)art={svg:()=>''};if(!art)return;
    if(sl==='head'&&o.cap){const[x,y,w,r]=o.cap;s+=_g(x,y,r,w/100,art.svg({}));}
    else if(sl==='face'&&o.eyes){const[[x1,y1],[x2,y2]]=o.eyes,d=Math.hypot(x2-x1,y2-y1),r=Math.atan2(y2-y1,x2-x1)*180/Math.PI;s+=_g((x1+x2)/2,(y1+y2)/2,r.toFixed(1),d/100,art.svg({}));}
    else if(sl==='neck'&&o.neck){if(eq.back&&OUTFIT_ART[eq.back]&&OUTFIT_ART[eq.back].front&&o.back){const[bx,by,bw]=o.back;s+=_g(bx,by-bw*.06,0,bw/100,OUTFIT_ART[eq.back].front());}
      const[x,y,w,r]=o.neck;s+=_g(x,y,r,w/100,art.svg({}));}
    else if(sl==='back'&&o.back){const[x,y,w,L]=o.back;s+=_g(x,y,0,w/100,art.svg({L:L/w*100}));}});
  return s;}
/* how far a hat sticks out above the picture (in % of it), so the picture can make room */
function outfitTop(o,eq){const a=eq.head&&OUTFIT_ART[eq.head];if(!a||!o||!o.cap)return 0;const[,y,w]=o.cap;return Math.max(0,-(y+a.top*w/100)+2);}
/* a dressed still picture of Leo as an SVG image (same size and shape as the plain one) */
const _dressCache={};
function leoDressedSrc(rig,kind,eq){const head=kind==='h';const o=head?rig.oh:rig.o;
  const key=(head?'h':'w')+rig.w.length+rig.w.slice(-24)+JSON.stringify([eq.head,eq.face,eq.neck,head?0:eq.back]);
  if(_dressCache[key])return _dressCache[key];
  const ext=outfitTop(o,eq),vb=`${(-ext/2).toFixed(2)} ${(-ext).toFixed(2)} ${(100+ext).toFixed(2)} ${(100+ext).toFixed(2)}`;
  let body;
  if(head) body=`<clipPath id="cHead"><circle cx="50" cy="50" r="50"/></clipPath><image href="${rig.h}" x="0" y="0" width="100" height="100"/>
    <g clip-path="url(#cHead)">${outfitSvg(o,eq,['neck'])}</g>${outfitSvg(o,eq,['face','head'])}`;
  else if(eq.back&&rig.t&&rig.f) body=`<rect x="-50" y="-50" width="300" height="300" fill="#000b3b"/>${outfitSvg(o,eq,['back'])}<image href="${rig.t}" width="100" height="100"/><image href="${rig.f}" width="100" height="100"/>${outfitSvg(o,eq,['neck','face','head'])}`;
  else body=`<rect x="-50" y="-50" width="300" height="300" fill="#000b3b"/><image href="${rig.w}" width="100" height="100"/>${outfitSvg(o,eq,['neck','face','head'])}`;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${head?160:512}" height="${head?160:512}">${OUTFIT_DEFS}${body}</svg>`;
  return _dressCache[key]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);}

/* ---------- in the app ---------- */
let OUTFIT_TRY=null;            // shop: the piece Leo is trying on (not bought yet)
let SHOP_LEO=null;              // shop: which of the five Leos the wardrobe shows
const _ART_SLOT=id=>{const it=SHOP_BY[id];return it&&it.slot;};
/* what Leo wears right now (in the shop, plus whatever he is trying on) */
function leoEq(tryOn){const e=W().eq,o={head:e.head,face:e.face,neck:e.neck,back:e.back};
  if(tryOn&&OUTFIT_TRY&&!activeLesson&&VIEW.track==='shop'){const sl=_ART_SLOT(OUTFIT_TRY);if(sl)o[sl]=OUTFIT_TRY;}
  for(const k in o)if(!o[k]||!OUTFIT_ART[o[k]])delete o[k];return o;}
const _eqAny=eq=>!!(eq.head||eq.face||eq.neck||eq.back);
/* gradients for the pieces drawn on the page (one copy, always rendered so every browser finds them) */
(function(){const d=document.createElement('div');d.innerHTML=`<svg width="0" height="0" style="position:absolute;width:0;height:0" aria-hidden="true">${OUTFIT_DEFS}</svg>`;document.body.appendChild(d.firstChild);})();
const _wearSvg=(cls,inner)=>`<svg class="leo-wear ${cls}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${inner}</svg>`;
/* the moving Leo (lessons, home, shop): cape behind him, the rest in front */
(function(){const _lg=leoGrow;leoGrow=function(h){h=_lg(h);const eq=leoEq(true);if(!_eqAny(eq))return h;
  const s=h.indexOf('<div class="leo-rig">');if(s<0)return h;const m=h.slice(s,s+4000).match(/data-age="(\w+)"/);const rig=LEO_AGES[m?m[1]:'adult'];if(!rig||!rig.o)return h;
  const top=outfitTop(rig.o,eq);
  let r=h.slice(s);
  if(eq.back)r=r.replace('<img class="leo-tail"',_wearSvg('wear-back',outfitSvg(rig.o,eq,['back']))+'<img class="leo-tail"');
  const front=outfitSvg(rig.o,eq,['neck','face','head']);
  const e=r.indexOf('</div>');r=r.slice(0,e)+_wearSvg('wear-front',front)+r.slice(e);
  r=r.replace('<div class="leo-rig">',`<div class="leo-rig dressed${top>0?' leo-hat':''}">`);
  return h.slice(0,s)+r;};})();
/* the still pictures (track and level pages, side menu, Your Leo card) */
let _leoSrcMap=null;
function dressLeoImgs(h,tryOn){const eq=leoEq(tryOn);if(!_eqAny(eq)||!h)return h;
  if(!_leoSrcMap){_leoSrcMap=[];const seen=new Set();for(const k in LEO_AGES){const r=LEO_AGES[k];if(!r||!r.o||seen.has(r.w))continue;seen.add(r.w);_leoSrcMap.push([r,'w'],[r,'h']);}}
  _leoSrcMap.forEach(([r,kind])=>{const src='src="'+r[kind]+'"';if(h.indexOf(src)>=0)h=h.split(src).join('src="'+leoDressedSrc(r,kind,eq)+'"');});
  return h;}
(function(){
  const _t=trackHtml;trackHtml=function(){return dressLeoImgs(_t.apply(this,arguments));};
  const _l=levelHtml;levelHtml=function(){return dressLeoImgs(_l.apply(this,arguments));};
  const _n=sideNav;sideNav=function(){return dressLeoImgs(_n.apply(this,arguments));};
  const _p=sidePanels;sidePanels=function(){return dressLeoImgs(_p.apply(this,arguments));};
  // the wardrobe shows the Leo you pick (your own Leo at first)
  const _ctx=leoContext;leoContext=function(){if(!activeLesson&&VIEW.track==='shop'){const k=SHOP_LEO||(()=>{const p=PROF();const st=p&&LEO_STAGES[p.track]&&LEO_STAGES[p.track][p.level];return st?st[1]:'adult';})();
      return LEO_PICK[k]||null;}return _ctx.apply(this,arguments);};
})();
const LEO_PICK={baby:{track:'kids',level:'A0'},little:{track:'kids',level:'A1'},kid:{track:'kids',level:'A2'},teen:{track:'adults',level:'A2'},adult:{track:'adults',level:'B1'},senior:{track:'adults',level:'C1'}};
function leoPickKey(){const c=leoContext(),st=c&&LEO_STAGES[c.track]&&LEO_STAGES[c.track][c.level];return st?st[1]:'adult';}

/* ---------- the wardrobe in the shop ---------- */
const _PIC_BOX={head:'-82 -112 164 164',face:'-128 -62 256 124',neck:'-66 -24 132 132',back:'-110 -30 220 230'};
function outfitPic(id){const it=SHOP_BY[id],a=OUTFIT_ART[id];if(!a)return '';
  let vb=_PIC_BOX[it.slot];if(it.slot==='head'){const t=Math.min(-46,a.top-6);vb=`-84 ${t} 168 ${Math.max(84,40-t)}`;}
  return `<svg class="rw-outfit" viewBox="${vb}" aria-hidden="true">${a.svg({L:180})}${a.front?`<g transform="translate(0,-12)">${a.front()}</g>`:''}</svg>`;}
function tryOutfit(id){OUTFIT_TRY=OUTFIT_TRY===id?null:id;sfxPop();
  const y=window.scrollY,g=document.querySelector('.rw-grid'),gy=g&&g.getBoundingClientRect().top;renderCourse();
  const g2=document.querySelector('.rw-grid');window.scrollTo(0,g2&&gy!=null?y+(g2.getBoundingClientRect().top-gy):y);}
function pickShopLeo(k){SHOP_LEO=k;sfxPop();renderCourse();}
function takeAllOff(){const e=W().eq;['head','face','neck','back'].forEach(s=>e[s]=null);e.t=Date.now();OUTFIT_TRY=null;saveProgress();sfxPop();renderCourse();}
(function(){
  const _card=shopItemCard;shopItemCard=function(it){let h=_card(it);if(it.cat!=='leo'||!OUTFIT_ART[it.id])return h;
    const trying=OUTFIT_TRY===it.id;
    h=h.replace(/<div class="rw-pic">[\s\S]*?<\/div>/,`<button class="rw-pic rw-pic-outfit ${trying?'trying':''}" onclick="tryOutfit('${it.id}')" title="${T2('Try it on','Przymierz')}">${outfitPic(it.id)}${owned(it.id)?'':`<span class="rw-try">${trying?T2('✓ On Leo','✓ Na Leo'):T2('Try on','Przymierz')}</span>`}</button>`);
    return h.replace('class="rw-item ','class="rw-item rw-outfit-item '+(trying?'trying ':''));};
  const _shop=shopHtml;shopHtml=function(){let h=_shop();
    if(SHOP_TAB!=='leo'){OUTFIT_TRY=null;return h;}
    const cur=leoPickKey(),it=OUTFIT_TRY&&SHOP_BY[OUTFIT_TRY];
    const picks=['baby','little','kid','adult','senior'].map(k=>{const st=LEO_PICK[k],s=LEO_STAGES[st.track][st.level];
      return `<button class="ow-leo ${cur===k?'on':''}" onclick="pickShopLeo('${k}')"><img src="${dressLeoImgs('src="'+LEO_AGES[k].h+'"',true).slice(5,-1)}" alt=""><span>${LANG==='pl'?s[3]:s[2]}</span></button>`;}).join('');
    const eq=leoEq(true),rig=LEO_AGES[cur];
    const bar=`<div class="ow-bar"><img class="ow-big" src="${_eqAny(eq)?leoDressedSrc(rig,'w',eq):rig.w}" alt=""><div class="ow-side"><div class="ow-row"><b>${T2('See it on:','Zobacz na:')}</b><div class="ow-leos">${picks}</div></div>
      <p class="rw-small">${it?(owned(it.id)?T2(`Leo is wearing the ${it.en}.`,`Leo ma na sobie: ${it.pl}.`):T2(`Leo is trying on the ${it.en}. Buy it to keep it!`,`Leo przymierza: ${it.pl}. Kup, żeby zostało!`)):T2('Tap a picture to try it on. Leo wears one hat, one pair of glasses, one neck piece and one cape at a time, everywhere he appears.','Dotknij obrazka, żeby przymierzyć. Leo nosi jedną czapkę, jedne okulary, jedną rzecz na szyję i jedną pelerynę naraz, wszędzie gdzie się pojawia.')}</p>
      ${_eqAny(W().eq)?`<button class="btn secondary ow-off" onclick="takeAllOff()">${T2('Take everything off','Zdejmij wszystko')}</button>`:''}</div></div>`;
    return h.replace('<div class="rw-grid">',bar+'<div class="rw-grid">');};
  // buying or wearing ends the try-on
  const _buy=buyItem;buyItem=function(id){if(OUTFIT_TRY===id)OUTFIT_TRY=null;return _buy.apply(this,arguments);};
  const _wear=wearItem;wearItem=function(id){if(OUTFIT_TRY===id)OUTFIT_TRY=null;return _wear.apply(this,arguments);};
  // the try-on bar sticks just under the top bar
  const _rc=renderCourse;renderCourse=function(){const r=_rc.apply(this,arguments);const b=document.querySelector('.ow-bar');
    if(b){const tb=document.querySelector('.topbar'),cs=tb&&getComputedStyle(tb);b.style.top=(tb&&cs.position==='sticky'?tb.getBoundingClientRect().height+(parseFloat(cs.top)||0)+6:8)+'px';}return r;};
  const _tab=shopTab;shopTab=function(c){OUTFIT_TRY=null;return _tab.apply(this,arguments);};
})();
