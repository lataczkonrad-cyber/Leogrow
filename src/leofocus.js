
/* ---------- Leo is the star (2026-11-22): the five lemurs in the menu, panels and level pages ---------- */
function leoStage(track,level){const st=LEO_STAGES[track]&&LEO_STAGES[track][level];if(!st)return null;const r=LEO_AGES[st[1]];return r?{key:st[1],name:LANG==='pl'?st[3]:st[2],rig:r}:null;}
function leoHeadImg(track,level,cls){const s=leoStage(track,level);return s&&s.rig.h?`<img class="leo-head ${cls||''}" src="${s.rig.h}" alt="${s.name}" title="${s.name}" draggable="false">`:'';}
/* the different Leos a track goes through, in order (one per picture) */
function leoTrackStages(t){const seen={},out=[];t.levels.forEach(l=>{const s=leoStage(t.id,l);if(s&&!seen[s.rig.w]){seen[s.rig.w]=1;out.push(Object.assign({level:l},s));}});return out;}
(function(){
  /* home: all five Leos side by side at the top */
  const _home=homeHtml; homeHtml=function(){let h=_home();
    const i=h.indexOf('<div class="hero-leo">'),j=h.indexOf('<div class="placement-card"');
    if(i>0&&j>i) h=h.slice(0,i)+`<div class="leo-lineup"><img src="${LEO_LINEUP}" alt="Leo grows from a baby to a grown-up" draggable="false"><p>${T2('Leo grows with you: from Baby Leo at A0 to Professor Leo at C1','Leo rośnie razem z Tobą: od Małego Leo (A0) do Profesora Leo (C1)')}</p></div></div>`+h.slice(j);
    return h.replace('<div class="panel course-hero">','<div class="panel course-hero home-hero">');};
  /* a track: its Leos in the hero, and each level card shows the Leo you get there */
  const _track=trackHtml; trackHtml=function(t){let h=_track(t);
    const trio=leoTrackStages(t).map(s=>`<button class="lt-leo" onclick="nav('${t.id}','${s.level}')"><img src="${s.rig.w}" alt="" draggable="false"><span>${s.name}</span><small>${s.level}</small></button>`).join('');
    h=h.replace('<div class="panel course-hero">',`<div class="panel course-hero track-hero"><div class="hero-leo leo-trio">${trio}</div>`);
    return h.replace(/<div class="level-code">(\w\d)<\/div>/g,(m,lv)=>`<div class="level-code">${lv}</div>${leoHeadImg(t.id,lv,'lc-leo')}`);};
  /* one level: that level's Leo, big, in the header */
  const _level=levelHtml; levelHtml=function(t,lv){let h=_level(t,lv);const s=leoStage(t.id,lv);if(!s)return h;
    const k=h.indexOf('<div class="level-head big">'),e=h.indexOf('</p></div></div>',k);if(k<0||e<0)return h;
    return h.slice(0,e)+`</p></div><div class="lh-leo"><img src="${s.rig.w}" alt="" draggable="false"><span>${s.name}</span></div></div>`+h.slice(e+'</p></div></div>'.length);};
  /* side menu: Leo's head instead of the 🧒 / 🧑‍💼 icons */
  const _side=sideNav; sideNav=function(){let h=_side();const p=typeof PROF==='function'?PROF():null;
    TRACKS.forEach(t=>{const lv=(p&&p.track===t.id&&p.level)||t.levels[0];h=h.replace(`<span>${t.emoji}</span><b>${t.name}</b>`,`<span>${leoHeadImg(t.id,lv,'sn-leo')}</span><b>${t.name}</b>`);});
    return h;};
  /* right column: "Your Leo" card at the top, and tighter spacing */
  const _sp=sidePanels; sidePanels=function(){let h=_sp();const p=typeof PROF==='function'?PROF():null;
    const t=p&&TRACKS.find(x=>x.id===p.track), s=p&&leoStage(p.track,p.level);
    let card;
    if(t&&s){const st=leoTrackStages(t),ci=st.findIndex(x=>x.rig.w===s.rig.w);
      card=`<div class="sp-card sp-leo" onclick="nav('${t.id}','${p.level}')"><img class="sp-leo-big" src="${s.rig.w}" alt="" draggable="false"><div><small class="sp-tag">${T2('YOUR LEO','TWÓJ LEO')} · ${p.level}</small><b>${s.name}</b>
        <div class="sp-leo-steps">${st.map((x,i)=>`<img src="${x.rig.h}" class="${i<ci?'past':i===ci?'now':'next'}" title="${x.name} · ${x.level}" alt="">`).join('')}</div>
        <small>${ci<st.length-1?T2('Keep learning and Leo grows up!','Ucz się dalej, a Leo dorośnie!'):T2('Leo is all grown up!','Leo jest już dorosły!')}</small></div></div>`;}
    else card=`<div class="sp-card sp-leo" onclick="nav()"><img class="sp-leo-big" src="${LEO_AGES.adult.w}" alt="" draggable="false"><div><small class="sp-tag">${T2('MEET LEO','POZNAJ LEO')}</small><b>${T2('Leo grows with you','Leo rośnie z Tobą')}</b>
        <div class="sp-leo-steps">${['baby','little','kid','adult','senior'].map(k=>`<img src="${LEO_AGES[k].h}" class="next" alt="">`).join('')}</div></div></div>`;
    const i=h.indexOf('</div>',h.indexOf('<div class="sp-stats">'));
    return i<0?card+h:h.slice(0,i+6)+card+h.slice(i+6);};
})();
