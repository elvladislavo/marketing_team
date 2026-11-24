// bg: 0-1.9 black, then selfie reaction (slowed)
const S={hook:'',total:5.6,cta:4.3,
lines:[],
setup(){ $('fx').innerHTML=`<div id="intro" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
  <div style="font:800 64px/1.1 'Archivo Variable';color:#fff;text-align:center">Kiedy strona<br>ładuje się w mniej<br>niż <span class="serif">sekundę</span></div>
  <svg width="420" height="420" style="margin-top:60px"><circle cx="210" cy="210" r="180" stroke="#333" stroke-width="26" fill="none"/><circle id="arc" cx="210" cy="210" r="180" stroke="#FF2E1F" stroke-width="26" fill="none" stroke-linecap="round" transform="rotate(-90 210 210)" stroke-dasharray="1131" stroke-dashoffset="1131"/>
  <text id="num" x="210" y="245" text-anchor="middle" font-family="Archivo Variable" font-weight="900" font-size="120" fill="#fff">0</text></svg>
  <div style="font:700 34px ui-monospace,monospace;color:#bbb;letter-spacing:.15em;margin-top:20px">WYNIK SZYBKOŚCI</div></div>
 <div id="me" class="tagr" style="left:540px;top:470px;font-size:58px;background:#fff;color:#0A0A0B">Moja reakcja:</div>`;
 $('shade').style.opacity=0;},
update(t){ const k=oC((t-.4)/1.1);$('arc').setAttribute('stroke-dashoffset',1131*(1-k));$('num').textContent=Math.round(100*k);
 $('intro').style.opacity=t<1.9?1:0; $('shade').style.opacity=t<1.9?0:1;
 const m=$('me');m.style.opacity=t>=1.9?C((t-1.9)/.1):0;m.style.transform=`translateX(-50%) rotate(-3deg) scale(${t<1.9?.4:.4+.6*oB((t-1.9)/.3)})`;}};
