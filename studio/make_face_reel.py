#!/usr/bin/env python3
"""Generate a talking-photo Reel HTML from photo-reel-intro.html.
Usage: make_face_reel.py <slug> "<hook html>" "<end h2 html>" "line1" "line2" ...
Prints the total duration in seconds. Line starts are computed automatically."""
import sys,re,json
slug,hook,endh2,*lines=sys.argv[1:]
SYL,GAP,PAUSE=0.16,0.07,0.45
vow=lambda w:max(1,len(re.findall(r'[aeiouyąęó]+',w.lower())))
t=0.4;starts=[]
for ln in lines:
    starts.append(round(t,2))
    for w in ln.split(' '):
        n=4 if re.search(r'\d',w) else vow(w); t+=n*SYL+GAP
    t+=PAUSE
end=round(t+0.3,2); total=round(end+2.6,1)
s=open('templates/photo-reel-intro.html').read()
s=re.sub(r'const LINES=\[.*?\];','const LINES='+json.dumps([[a,b] for a,b in zip(starts,lines)],ensure_ascii=False)+';',s,flags=re.S)
s=re.sub(r'<div id="hook">.*?</div>',f'<div id="hook">{hook}</div>',s,flags=re.S)
s=re.sub(r'<h2>.*?</h2>',f'<h2>{endh2}</h2>',s,flags=re.S)
s=s.replace('oC((t-11.6)/.6)',f'oC((t-{end})/.6)').replace('oC((t-12.0-i*.15)/.45)',f'oC((t-{end+0.4})/.45-i*.33)')
open(f'templates/face-{slug}.html','w').write(s); print(total)
