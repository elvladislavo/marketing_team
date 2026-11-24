const TU=.427,TV=.55;
const S={img:'../../brand/avatar/ref-archery.jpg',hook:'Trafić w <em>klienta</em>',end:'Do kogo mówi<br><em>Twoja strona?</em>',tail:1.4,
lines:['Strona dla wszystkich?','Nie. Dla jednego klienta.','Wtedy trafiasz.'],
setup(){ blurRect(.385,.17,.475,.345,18);
 const cx=TU*1440,cy=TV*1920,R=[.25,.17,.09].map(r=>r*1440);
 $('camfx').insertAdjacentHTML('beforeend',`<svg width="1440" height="1920" style="position:absolute;left:0;top:0">${R.map((r,i)=>`<circle id="ring${i}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#FF2E1F" stroke-width="10" stroke-dasharray="${2*Math.PI*r}" stroke-dashoffset="${2*Math.PI*r}"/>`).join('')}
 <g id="arrow"><line x1="0" y1="0" x2="-300" y2="-210" stroke="#fff" stroke-width="12" stroke-linecap="round"/><polygon points="0,0 -40,-8 -22,-34" fill="#FF2E1F"/><polygon points="-300,-210 -330,-250 -270,-238" fill="#FF2E1F"/><polygon points="-300,-210 -340,-200 -318,-178" fill="#FF2E1F"/></g></svg>
 ${['WSZYSCY','MAŁE FIRMY','TWÓJ KLIENT'].map((s,i)=>`<div id="lb${i}" class="tagr" style="left:${cx}px;top:${i==2?cy+R[i]+16:cy-R[i]-30}px;font-size:34px;${i==2?'background:#0A0A0B':''}">${s}</div>`).join('')}
 <div id="btn" class="tagr" style="left:${cx}px;top:${cy+R[2]+110}px;font-size:40px;border-radius:999px;padding:18px 34px">Napisz w DM →</div>`);
 ['lb0','lb1','lb2','btn'].forEach(id=>$(id).dataset.base='translate(-50%,0)');},
update(t){ camPath([[0,TU,TV,1.3],[L[1].end,TU,TV,1.38],[L[2].t0+.5,.58,.5,1.0]],t);
 const at=[0.15,L[0].t0+.55,L[1].t0+.25];
 [0,1,2].forEach(i=>{const r=$('ring'+i),len=+r.getAttribute('stroke-dasharray');r.setAttribute('stroke-dashoffset',len*(1-oC((t-at[i])/.45)));pop($('lb'+i),t,at[i]+.1,.3);});
 const h=L[1].t0+.5,ka=oC((t-h+.3)/.3),ax=TU*1440,ay=TV*1920;$('arrow').setAttribute('transform',`translate(${ax+700*(1-ka)},${ay-490*(1-ka)}) scale(.7)`);$('arrow').style.opacity=t>h-.3?1:0;
 CAM.dx=t>h&&t<h+.3?Math.sin(t*90)*8:0; pop($('btn'),t,L[2].t0+.3,.3); }};
