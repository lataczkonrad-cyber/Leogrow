(function(){
  var q=new URLSearchParams(location.search).get('lang'), l=q;
  if(!l){try{l=localStorage.getItem('lingrowLang');}catch(e){}}
  if(l!=='en'&&l!=='pl') l=(navigator.language||'').toLowerCase().indexOf('pl')===0?'pl':'en';
  function set(x){l=x;document.documentElement.lang=x;
    document.querySelectorAll('article[data-lang]').forEach(function(a){a.hidden=a.getAttribute('data-lang')!==x;});
    document.querySelectorAll('.lg-lang button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-l')===x);});}
  document.querySelectorAll('.lg-lang button').forEach(function(b){b.onclick=function(){set(b.getAttribute('data-l'));};});
  set(l);
})();
