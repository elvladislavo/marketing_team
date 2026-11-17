// node frames.js <html> <out.png> t1 t2 ... -> horizontal strip of frames at given times
const { chromium } = require('playwright'); const path=require('path'); const {execFileSync}=require('child_process');
(async()=>{const [html,out,...ts]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+path.resolve(html));await p.evaluate(()=>document.fonts.ready);const fs=[];
for(const [i,t] of ts.entries()){await p.evaluate(t=>window.render(+t),t);const f=`/tmp/fr${i}.png`;await p.screenshot({path:f});fs.push(f);}
console.log('TOTAL',await p.evaluate(()=>window.TOTAL));await b.close();
execFileSync('ffmpeg',['-loglevel','error','-y',...fs.flatMap(f=>['-i',f]),'-filter_complex',fs.map((_,i)=>`[${i}]scale=360:640[s${i}]`).join(';')+';'+fs.map((_,i)=>`[s${i}]`).join('')+`hstack=inputs=${fs.length}`,out]);})();
