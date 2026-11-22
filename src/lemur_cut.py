"""Cut the five Leo lemurs (brand/lemurs/sheet.png, navy background) into separate transparent PNGs.
Dev tool, run once when the art changes: python3 lemur_cut.py  (needs scipy). Output: brand/lemurs/<stage>.png
Colours at the edges are 'un-mixed' from the navy, so putting a cut-out back on the same navy gives the original picture."""
import os
import numpy as np
from PIL import Image
from scipy import ndimage as nd
HERE=os.path.dirname(os.path.abspath(__file__)); D=os.path.join(HERE,'brand','lemurs')
BG=np.array([0.,11.,59.])            # the sheet's navy
NAMES=['sitting','waving-small','arms-crossed','waving-tall','hand-on-hip']   # left to right on the sheet
def main():
    a=np.asarray(Image.open(os.path.join(D,'sheet.png')).convert('RGB')).astype(np.float32)
    ad=np.clip((np.sqrt(((a-BG)**2).sum(-1))-16)/(70-16),0,1)          # far from navy
    nv=a[...,2]-np.maximum(a[...,0],a[...,1]); an=np.clip((38-nv)/(38-12),0,1)   # not blue-ish (black fur)
    al=np.maximum(ad,an); m=al>0.5
    lab,n=nd.label(m); sz=nd.sum(m,lab,range(1,n+1))
    big=sorted([i+1 for i,s in enumerate(sz) if s>20000],key=lambda i:nd.find_objects((lab==i).astype(int))[0][1].start)
    assert len(big)==5,len(big)
    for nm,i in zip(NAMES,big):
        core=lab==i; A=al*nd.binary_dilation(core,iterations=4)
        # navy parts of the cap are closed holes near the top: keep them solid
        holes,_=nd.label(nd.binary_fill_holes(core)&~core); ys=np.nonzero(core)[0]; top,h=ys.min(),ys.max()-ys.min()
        for k,sl in enumerate(nd.find_objects(holes)):
            if sl[0].stop<top+0.3*h: A=np.where(holes==k+1,1.0,A)
        Am=np.maximum(A[...,None],0.02)
        rgb=np.clip(np.where(A[...,None]>0.02,(a-(1-A[...,None])*BG)/Am,0),0,255)
        yy,xx=np.nonzero(A>0.02)
        out=np.dstack([rgb,A*255])[yy.min():yy.max()+1,xx.min():xx.max()+1].astype(np.uint8)
        Image.fromarray(out,'RGBA').save(os.path.join(D,nm+'.png'),optimize=True); print(nm,out.shape[1],'x',out.shape[0])


def icons():
    """Badge (top-left of the app) and home-screen icons from the tall waving Leo. Run: python3 lemur_cut.py icons"""
    from PIL import ImageDraw
    cut=Image.open(os.path.join(D,'waving-tall.png')).convert('RGBA'); w,h=cut.size
    navy=tuple(int(v) for v in BG)+(255,)
    # badge: Leo's head in a gold ring
    S=512; head=cut.crop((55,-22,345,268)).resize((S-60,S-60),Image.LANCZOS)   # square centred on the head (ears span x 88-313)
    inner=Image.new('RGBA',(S,S),(0,0,0,0)); disc=Image.new('RGBA',(S,S),navy); disc.alpha_composite(head,(30,40))
    m=Image.new('L',(S,S),0); ImageDraw.Draw(m).ellipse([22,22,S-23,S-23],fill=255); inner.paste(disc,(0,0),m)
    ring=Image.new('RGBA',(S,S),(0,0,0,0)); ImageDraw.Draw(ring).ellipse([4,4,S-5,S-5],outline=(236,184,58,255),width=20)
    inner.alpha_composite(ring); inner.save(os.path.join(HERE,'brand','badge-mini.png'),optimize=True)
    # home-screen icon: Leo from the cap to the waist on navy, full square (the phone rounds the corners)
    I=1024; top=cut.crop((0,-30,w,470)); k=I*0.92/top.height; top=top.resize((int(top.width*k),int(top.height*k)),Image.LANCZOS)
    ic=Image.new('RGBA',(I,I),navy); ic.alpha_composite(top,((I-top.width)//2,I-top.height))
    for n in (180,192,512): ic.convert('RGB').resize((n,n),Image.LANCZOS).save(os.path.join(HERE,'pwa','lingrow-icon-%d.png'%n),optimize=True)

if __name__=='__main__':
    import sys
    icons() if sys.argv[1:]==['icons'] else main()
