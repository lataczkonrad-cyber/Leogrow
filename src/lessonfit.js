/* ---------- PC lesson step menu: Leo header + step count (CSS shows it on PC only) ---------- */
(function(){
  const _rt=renderTrail;
  renderTrail=function(){
    _rt();
    const t=document.getElementById('trail'); if(!t||!activeLesson) return;
    const l=activeLesson, u=l.unit||{}, st=(typeof leoStage==='function')?leoStage(u.track,u.level):null;
    const pl=typeof LANG!=='undefined'&&LANG==='pl';
    const stars=Object.values(zoneStars||{}).reduce((a,b)=>a+(+b||0),0);
    const n=zones.length, pct=Math.round(100*Math.max(0,current)/Math.max(1,n-1));
    const h=document.createElement('div'); h.className='trail-head';
    h.innerHTML=`<div class="th-leo">${st?`<img src="${st.rig.h}" alt="">`:''}</div>
      <div class="th-txt"><small>${u.level?u.level+' · ':''}${pl?'Lekcja':'Lesson'} ${l.num||''}</small><b>${l.title||''}</b>
      <span>${pl?'Krok':'Step'} ${current+1} ${pl?'z':'of'} ${n}${stars?` · ⭐ ${stars}`:''}</span></div>
      <div class="th-bar"><i style="width:${pct}%"></i></div>`;
    t.insertBefore(h,t.firstChild);
    [...t.querySelectorAll('.trail-dot')].forEach((d,i)=>d.setAttribute('data-n',i+1));
    // keep the current step in view when the menu scrolls (long lessons, short screens)
    const cur=t.querySelector('.trail-dot.current');
    if(cur&&t.scrollHeight>t.clientHeight){const top=cur.offsetTop-h.offsetHeight-8,bot=cur.offsetTop+cur.offsetHeight+8-t.clientHeight;if(t.scrollTop>top)t.scrollTop=top;else if(t.scrollTop<bot)t.scrollTop=bot;}
  };
})();
/* tag the lesson card with the step type, so CSS can size single steps (e.g. a big Leo on the start page) */
(function(){
  const _go=go;
  go=function(i){_go(i);const p=document.getElementById('panel');if(p&&zones[current])p.setAttribute('data-zone',zones[current].key);};
})();
/* the Leo in the bottom-left corner is the lesson's own Leo (Baby Leo, Teen Leo, Master Leo...) */
(function(){
  const _ol=openLesson;
  openLesson=function(id){
    _ol(id);
    // a lesson started from the welcome screens is not part of the welcome: show Leo in the corner
    if(activeLesson) document.body.classList.remove('onboarding');
    const s=document.getElementById('lemurCornerSlot');
    if(s&&activeLesson){try{s.innerHTML=renderLemur('corner',lemurCornerMsgs,118);}catch(e){}}
  };
})();
