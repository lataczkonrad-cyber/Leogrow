import os
HERE=os.path.dirname(os.path.abspath(__file__))
SITE=os.environ.get('SITE_DIR',os.path.join(HERE,'..','site'))
OUT=os.path.join(SITE,'lingrow-academy.html')
s=open(OUT).read()
head='''<meta name="theme-color" content="#050a30">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Lingrow">
<link rel="manifest" href="lingrow.webmanifest">
<link rel="apple-touch-icon" href="lingrow-icon-180.png">
<link rel="icon" type="image/png" href="lingrow-icon-192.png">
<script src="lingrow-config.js"></script>
'''
assert '<link rel="manifest"' not in s
s=s.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">','<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n'+head,1)
js='''
/* ---------- installable app (PWA) ---------- */
let _installEvt=null;
const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
  window.addEventListener('load',()=>navigator.serviceWorker.register('lingrow-sw.js').catch(()=>{}));
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();_installEvt=e;if(!activeLesson)renderCourse();});
window.addEventListener('appinstalled',()=>{_installEvt=null;if(!activeLesson)renderCourse();_comboToastText('📲 Lingrow is on your home screen!');});
function installCard(){
  if(isStandalone()) return '';
  if(_installEvt) return `<div class="install-card"><span>📲</span><div><b>Get the Lingrow app</b><p>Install it on your phone — it opens full-screen and works offline.</p></div><button class="btn btn-gold lesson-btn" onclick="installApp()">Install</button></div>`;
  if(isIOS&&/^https?:$/.test(location.protocol)) return `<div class="install-card"><span>📲</span><div><b>Get the Lingrow app</b><p>Tap <b>Share</b> ⬆️ then <b>Add to Home Screen</b> — it opens full-screen and works offline.</p></div></div>`;
  return '';
}
function installApp(){if(!_installEvt)return;_installEvt.prompt();_installEvt.userChoice.finally(()=>{_installEvt=null;renderCourse();});}
'''
css='''
.install-card{display:flex;align-items:center;gap:14px;margin:0 0 16px;background:linear-gradient(135deg,var(--gold),var(--gold-light));border-radius:20px;padding:12px 16px;color:var(--navy);box-shadow:0 5px 0 #b5891f;}
.install-card>span{font-size:32px;}.install-card div{flex:1;}
.install-card b{font-family:'Baloo 2',sans-serif;font-size:18px;}.install-card p{margin:2px 0 0;font-size:13.5px;}
.install-card .btn{background:var(--navy);color:var(--gold-light);box-shadow:0 3px 0 #000;}
body{padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);}
'''
s=s.replace('</style>',css+'</style>',1)
i=s.rindex('renderCourse();')
s=s[:i]+js+s[i:]
# show the card on the home screen
a='<div class="placement-card" onclick="startPlacement()">'
assert s.count(a)==1
s=s.replace(a,'${installCard()}'+a)
for a,b in [('<p class="sub">Kliknij: <b>','<p class="sub">Click: <b>'),('<h2 class="title">Pytanie ${st.i+1}','<h2 class="title">Question ${st.i+1}')]:
    assert a in s,a; s=s.replace(a,b)
open(OUT,'w').write(s)
import shutil,glob
for f in glob.glob(os.path.join(HERE,'pwa','*')): shutil.copy(f,SITE)
print('pwa ok')
