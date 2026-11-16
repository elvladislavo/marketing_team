// Usage: node render.js image <html> <out.png>
//        node render.js video <html> <out.mp4> [seconds=8] [fps=30]
// Video templates expose window.render(t) (t = seconds) to draw each frame.
const { chromium } = require('playwright'); const path = require('path');
const fs = require('fs'); const { execFileSync } = require('child_process');
(async () => {
  const [mode, html, out, secs = '8', fps = '30'] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: mode === 'video' ? 1920 : 1350 } });
  await p.goto('file://' + path.resolve(html)); await p.evaluate(() => document.fonts.ready);
  if (mode === 'image') { await p.screenshot({ path: out }); }
  else {
    const dir = fs.mkdtempSync('/tmp/frames-'); const n = Math.round(+secs * +fps);
    for (let i = 0; i < n; i++) { await p.evaluate(t => window.render(t), i / +fps); await p.screenshot({ path: `${dir}/f${String(i).padStart(5, '0')}.png` }); }
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', fps, '-i', `${dir}/f%05d.png`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-movflags', '+faststart', out]);
    fs.rmSync(dir, { recursive: true });
  }
  await b.close(); console.log('wrote', out);
})();
