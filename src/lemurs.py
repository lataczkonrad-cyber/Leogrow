"""Leo the lemur at five ages (cut-outs from brand/lemurs/, made by lemur_cut.py) turned into animation layers:
  w  whole picture on Leo's navy tile (for plain <img> use)
  b  navy tile with Leo but without his tail (base layer)
  t  the tail alone (sways), drawn over b
  f  Leo without the tail on a clear background, drawn over the tail so the tail's root stays hidden behind him
  p  tail pivot, e  eye boxes [x, y, rx, ry] for blinking — all in % of the square tile"""
import os
import numpy as np
from PIL import Image, ImageFilter
HERE=os.path.dirname(os.path.abspath(__file__)); D=os.path.join(HERE,'brand','lemurs')
BG=(0,11,59)
# eyes = (x, y, half-width, half-height) of each iris, measured once.
# Tail = pixels right (or left for 'sitting') of a boundary line given as (y, x) points in cut-out pixels,
# restricted to rows y0..y1. pivot = where the tail goes behind the body.
POSES={
 'sitting':      dict(side=-1,line=[(150,72),(200,72),(215,62),(260,56),(280,56)],rows=(158,280),pivot=(64,218),eyes=[(95,98,16,15),(148,78,14,14)]),
 'waving-small': dict(side=1,line=[(130,206),(180,212),(262,217),(268,226),(330,226),(395,228)],rows=(130,395),pivot=(226,365),eyes=[(99,100,12,10),(154,88,16,14)]),
 'arms-crossed': dict(side=1,line=[(230,190),(440,196),(470,207),(520,222)],rows=(230,525),pivot=(210,485),frame=0.86,eyes=[(66,108,12,10),(128,98,16,14)]),
 'waving-tall':  dict(side=1,line=[(250,302),(470,302),(520,306),(560,312),(620,318),(650,318)],rows=(250,645),pivot=(315,600),frame=0.86,eyes=[(136,118,15,12),(208,120,20,16)]),
 'hand-on-hip':  dict(side=1,line=[(360,205),(600,203),(640,200)],rows=(360,645),pivot=(205,605),frame=0.86,eyes=[(72,100,13,8),(135,112,16,9)]),
}
def _tailmask(al,cfg,grow=0):
    H,W=al.shape; ys=np.arange(H)
    ly=[p[0] for p in cfg['line']]; lx=[p[1] for p in cfg['line']]
    edge=np.interp(ys,ly,lx)[:,None]-cfg['side']*grow; xx=np.arange(W)[None,:]
    m=(xx>edge) if cfg['side']>0 else (xx<edge)
    r0,r1=cfg['rows']; m&=((ys>=r0-grow)&(ys<=r1+grow))[:,None]
    return m.astype(np.float32)
def make(pose,size=512):
    cut=Image.open(os.path.join(D,pose+'.png')).convert('RGBA'); cfg=POSES[pose]
    w,h=cut.size; S=int(max(h*cfg.get('frame',1.1),w*1.12)); ox=(S-w)//2
    oy=S-h-int(S*0.035) if S>=h*1.05 else int(S*0.045)   # tall Leos are framed from the cap down to the shins
    def place(arr):
        c=Image.new('RGBA',(S,S),(0,0,0,0)); c.paste(Image.fromarray(arr.astype(np.uint8),'RGBA'),(ox,oy)); return c
    a=np.asarray(cut).astype(np.float32)
    # body: cut edge feathered over a few pixels; tail layer reaches 16px under the body, so the
    # body's soft edge always sits on real fur and no seam or gap shows while the tail sways
    tm=np.asarray(Image.fromarray((_tailmask(a[...,3],cfg)*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.5))).astype(np.float32)/255.
    body=a.copy(); body[...,3]*=1-tm
    tail=a.copy(); tail[...,3]*=_tailmask(a[...,3],cfg,grow=16)
    navy=Image.new('RGBA',(S,S),BG+(255,))
    def on_navy(layer): c=navy.copy(); c.alpha_composite(layer); return c
    full,bodyL,tailL=place(a),place(body),place(tail)
    k=size/S; res=lambda im:im.resize((size,size),Image.LANCZOS)
    pct=lambda x,y:(round((x+ox)/S*100,2),round((y+oy)/S*100,2))
    eyes=[[*pct(cx,cy),round(rx/S*100,2),round(ry/S*100,2)] for cx,cy,rx,ry in [(x,y,rx*1.3,ry*1.4) for x,y,rx,ry in cfg['eyes']]]
    # head only (for menus and small icons): a square around the eyes
    (x1,y1,*_),(x2,y2,*_)=cfg['eyes']; hx,hy=(x1+x2)/2,(y1+y2)/2; hs=abs(x2-x1)*3.3+40
    head=cut.crop((int(hx-hs/2),int(hy-hs*0.56),int(hx+hs/2),int(hy+hs*0.44))).resize((160,160),Image.LANCZOS)
    from PIL import ImageDraw
    disc=Image.new('RGBA',(160,160),BG+(255,)); disc.alpha_composite(head)          # round navy badge
    m=Image.new('L',(160,160),0); ImageDraw.Draw(m).ellipse([0,0,159,159],fill=255)
    head=Image.new('RGBA',(160,160),(0,0,0,0)); head.paste(disc,(0,0),m)
    return {'h':head,'c':res(full),'w':res(on_navy(full)),'b':res(on_navy(bodyL)),'t':res(tailL),'f':res(bodyL),'p':list(pct(*cfg['pivot'])),'e':eyes}
# which picture each stage of Leo uses (stage names come from LEO_STAGES in course.js)
STAGES={'baby':'sitting','little':'waving-small','kid':'arms-crossed','teen':'arms-crossed','adult':'waving-tall','senior':'hand-on-hip'}
def make_all(size=512):
    cache={}
    for st,pose in STAGES.items():
        if pose not in cache: cache[pose]=make(pose,size)
    return {st:cache[p] for st,p in STAGES.items()}
if __name__=='__main__':
    import sys
    out=sys.argv[1] if len(sys.argv)>1 else 'lemurs-preview.png'
    poses=list(POSES); W=Image.new('RGB',(260*len(poses),520),'white')
    for i,p in enumerate(poses):
        r=make(p,256); W.paste(r['w'],(i*260,0))
        t=r['b'].copy(); tl=r['t'].copy(); arr=np.asarray(tl).copy(); arr[...,0]=255; arr[...,1]//=3; t.alpha_composite(Image.fromarray(arr)); W.paste(t,(i*260,260))
        from PIL import ImageDraw; d=ImageDraw.Draw(W)
        px,py=r['p']; d.ellipse([i*260+px*2.56-4,260+py*2.56-4,i*260+px*2.56+4,260+py*2.56+4],fill='lime')
        for x,y,rx,ry in r['e']: d.rectangle([i*260+(x-rx)*2.56,(y-ry)*2.56,i*260+(x+rx)*2.56,(y+ry)*2.56],outline='lime')
    W.save(out)

def lineup(height=300):
    """all five Leos side by side, smallest to biggest, on navy (sizes as drawn)"""
    cuts=[Image.open(os.path.join(D,p+'.png')).convert('RGBA') for p in POSES]
    H=max(c.height for c in cuts); k=height/H; gap=int(14*k)
    cuts=[c.resize((max(1,int(c.width*k)),max(1,int(c.height*k))),Image.LANCZOS) for c in cuts]
    pad=int(40*k); W=sum(c.width for c in cuts)+gap*(len(cuts)-1)+2*pad
    out=Image.new('RGBA',(W,height+pad),BG+(255,)); x=pad   # on Leo's navy (edges were un-mixed from it)
    for c in cuts: out.alpha_composite(c,(x,height+pad//2-c.height)); x+=c.width+gap
    return out
