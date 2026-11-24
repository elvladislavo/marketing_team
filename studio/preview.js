// node preview.js <html> <out.png> : one frame per subtitle line (late in line) + end card
const { chromium } = require('playwright'); const path=require('path'); const {execFileSync}=require('child_process');
(async()=>{const [html,out]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(html));await p.evaluate(()=>document.fonts.ready);
const ts=await p.evaluate(()=>[...L.map(l=>l.end-.15),TOTAL-.4]);const fs=[];
for(const [i,t] of ts.entries()){await p.evaluate(t=>window.render(t),t);const f=`/tmp/pv${i}.png`;await p.screenshot({path:f});fs.push(f);}
console.log(path.basename(html),'TOTAL',await p.evaluate(()=>TOTAL.toFixed(1)),errs.join('|'));await b.close();
execFileSync('ffmpeg',['-loglevel','error','-y',...fs.flatMap(f=>['-i',f]),'-filter_complex',fs.map((_,i)=>`[${i}]scale=300:533[s${i}]`).join(';')+';'+fs.map((_,i)=>`[s${i}]`).join('')+`hstack=inputs=${fs.length}`,out]);})();
