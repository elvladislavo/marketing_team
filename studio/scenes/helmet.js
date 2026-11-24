const S={img:'../../brand/avatar/ref-helmet.jpg',hook:'Spójny <em>wizerunek</em>',end:'Jedna<br><em>marka?</em>',
lines:['Kask, krawat i sportowa koszulka.','Na imprezie działa.','W firmie już nie.','Logo, kolory i czcionki – wszędzie takie same.','Wtedy klient Cię zapamięta.'],
setup(){ const T=[['KASK',.10,.15],['KRAWAT',.50,.63],['KOSZULKA',.14,.56]];
 $('camfx').insertAdjacentHTML('beforeend',T.map(([s,u,v],i)=>`<div id="tg${i}" class="tagr" style="left:${u*1440}px;top:${v*1920}px">${s}</div>`).join(''));
 const card=(i,lab,bad)=>`<div id="cd${i}" class="card" style="left:${80+i*320}px;top:860px;width:280px;height:380px;overflow:hidden;padding:0"><div class="bad" style="position:absolute;inset:0;padding:22px;${bad}">
   <div style="font:inherit;font-size:30px">Moja Firma</div><div style="margin-top:14px;height:120px;background:currentColor;opacity:.2;border-radius:6px"></div><div style="margin-top:14px;font-size:20px">${lab}</div></div>
  <div class="good" style="position:absolute;inset:0;padding:22px;background:#0A0A0B;color:#fff;opacity:0"><div style="width:100%;height:8px;background:#FF2E1F"></div>
   <div style="font:800 34px 'Archivo Variable';margin-top:18px">Moja Firma</div><div style="margin-top:14px;height:120px;background:#FF2E1F;border-radius:10px"></div><div style="margin-top:14px;font:600 22px ui-monospace,monospace;letter-spacing:.1em">${lab}</div></div></div>`;
 $('fx').innerHTML=card(0,'INSTAGRAM',"background:#fff;color:#0A0A0B;font:italic 400 30px Georgia,serif;transform:rotate(-4deg)")+card(1,'STRONA',"background:#ddd;color:#333;font:700 30px 'Courier New',monospace;transform:rotate(3deg)")+card(2,'GOOGLE',"background:#FF2E1F;color:#fff;font:300 30px Arial;transform:rotate(-2deg)")+
  `<div id="xx" class="abs" style="left:0;right:0;top:600px;text-align:center;font:900 420px/1 'Archivo Variable';color:#FF2E1F;-webkit-text-stroke:8px #fff">✕</div>`;
 [0,1,2].forEach(i=>{$('tg'+i).dataset.base='';$('cd'+i).dataset.base=''});$('xx').dataset.base='';},
update(t){ camPath([[0,.45,.43,.95],[L[1].t0,.45,.42,.98],[END,.45,.42,1.04]],t);
 CAM.dy=t>=L[1].t0&&t<L[1].t0+.8?-Math.abs(Math.sin((t-L[1].t0)*12))*30*(1-(t-L[1].t0)/.8):0;
 [0,1,2].forEach(i=>{const e=$('tg'+i);if(t>=L[2].t0){e.style.opacity=1-C((t-L[2].t0)/.3);return}pop(e,t,L[0].t0+i*.45,.3)});
 $('dim').style.opacity=t>=L[2].t0?.7*C((t-L[2].t0)/.3):0;
 const xe=$('xx');if(t>=L[2].t0&&t<L[3].t0){pop(xe,t,L[2].t0+.1,1.8)}else xe.style.opacity=0;
 const snap=L[3].t0+1.3;[0,1,2].forEach(i=>{const c=$('cd'+i);if(t<L[3].t0){c.style.opacity=0;return}pop(c,t,L[3].t0+i*.15,.4);
  c.querySelector('.good').style.opacity=C((t-snap-i*.12)/.2);c.querySelector('.bad').style.opacity=1-C((t-snap-i*.12)/.2);}); }};
