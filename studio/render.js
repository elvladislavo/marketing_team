// Usage: node render.js image <html> <out.png>
//        node render.js video <html> <out.mp4> [seconds=8] [fps=30]
// Video templates expose window.render(t) (t = seconds) to draw each frame.
//        node render.js overlay <html> <bg.mp4> <out.mp4> [seconds] [fps=30]  (transparent page drawn over a video)
const { chromium } = require('playwright'); const path = require('path');
const fs = require('fs'); const { execFileSync } = require('child_process');
(async () => {
  let [mode, html, out, secs = '8', fps = '30'] = process.argv.slice(2); let bg;
  if (mode === 'overlay') { [, , bg, out, secs, fps = '30'] = process.argv.slice(2); }
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: mode === 'image' ? 1350 : 1920 } });
  await p.goto('file://' + path.resolve(html)); await p.evaluate(() => document.fonts.ready);
  if (mode === 'image') { await p.screenshot({ path: out }); }
  else {
    const dir = fs.mkdtempSync('/tmp/frames-'); const n = Math.round(+secs * +fps);
    const transparent = mode === 'overlay';
    for (let i = 0; i < n; i++) { await p.evaluate(t => window.render(t), i / +fps); await p.screenshot({ path: `${dir}/f${String(i).padStart(5, '0')}.png`, omitBackground: transparent }); }
    if (transparent) execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', bg, '-framerate', fps, '-i', `${dir}/f%05d.png`, '-filter_complex', '[0:v]scale=1080:1920,setsar=1,fps=' + fps + '[b];[b][1:v]overlay=0:0:shortest=1[v]', '-map', '[v]', '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-movflags', '+faststart', out]);
    else execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', fps, '-i', `${dir}/f%05d.png`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-movflags', '+faststart', out]);
    fs.rmSync(dir, { recursive: true });
  }
  await b.close(); console.log('wrote', out);
})();
