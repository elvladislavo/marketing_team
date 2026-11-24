const S={img:'../../brand/avatar/ref-shock.jpg',hook:'Strona na <em>telefonie</em>',end:'Sprawdzić<br><em>Twoją stronę?</em>',
lines:['Tak wygląda Twoja strona na telefonie?','Mały tekst, uciekające przyciski.','Większość ludzi otwiera stronę na telefonie.','Sprawdź swoją dziś.','A jeśli straszy – napisz.'],
setup(){ $('fx').innerHTML=`<div id="phone" class="abs" style="left:300px;top:470px;width:480px;height:960px;border:14px solid #fff;border-radius:64px;background:#fff;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6)">
 <div id="bad" class="abs" style="inset:0;padding:60px 14px;font:400 12px/1.35 Arial;color:#222">
  <div style="white-space:nowrap;font:700 40px Arial;color:#0A0A0B">WITAMY NA NASZEJ STRONIE INTERNETOWEJ FIRMY</div>
  <div style="display:flex;gap:6px;margin:10px 0;white-space:nowrap">${['Start','O nas','Oferta','Galeria','Cennik','Kontakt','Blog','FAQ','Regulamin'].map(s=>`<span style="font:9px Arial;border:1px solid #999;padding:2px 4px">${s}</span>`).join('')}</div>
  <div style="width:700px">Oferujemy szeroki zakres usług najwyższej jakości dla klientów indywidualnych i biznesowych. Zapraszamy do zapoznania się z naszą ofertą oraz do kontaktu z biurem w godzinach pracy od poniedziałku do piątku.</div>
  <div style="margin:16px 0;width:600px;height:240px;background:#ccc"></div>
  <span id="b1" style="display:inline-block;font:9px Arial;background:#FF2E1F;color:#fff;padding:3px 6px">Zadzwoń</span> <span id="b2" style="display:inline-block;font:9px Arial;background:#0A0A0B;color:#fff;padding:3px 6px">Napisz</span></div>
 <div id="good" class="abs" style="inset:0;padding:70px 34px;opacity:0;font-family:'Archivo Variable'">
  <div style="width:70px;height:70px;border-radius:50%;background:#FF2E1F"></div>
  <div style="font:800 54px/1.05 'Archivo Variable';margin:30px 0 16px;color:#0A0A0B">Twoja firma.<br><span class="serif">Jasno.</span></div>
  <div style="font:400 26px/1.4 'Archivo Variable';color:#444">Co robisz, dla kogo i jak się skontaktować.</div>
  <div style="margin-top:34px;background:#FF2E1F;color:#fff;font:800 34px 'Archivo Variable';padding:24px;border-radius:999px;text-align:center">Zadzwoń →</div>
  <div style="margin-top:18px;border:3px solid #0A0A0B;color:#0A0A0B;font:800 30px 'Archivo Variable';padding:20px;border-radius:999px;text-align:center">Napisz</div></div></div>`;},
update(t){ const face=t>=L[2].t0-.1&&t<L[3].t0-.1;
 camPath([[0,.5,.5,1.05],[L[2].t0-.1,.5,.5,1.1],[L[2].t0+.25,.5,.47,1.45],[L[3].t0,.5,.47,1.5],[END,.5,.48,1.15]],t);
 const sh=face&&t<L[2].t0+.7;CAM.dx=sh?Math.sin(t*70)*14:0;CAM.dy=sh?Math.cos(t*55)*10:0;
 $('dim').style.opacity=face?0:.72;
 const ph=$('phone');ph.style.opacity=face?0:C((t-.1)/.3);ph.style.transform=`translateY(${face?0:60*(1-oC((t-(t<L[2].t0?0:L[3].t0-.1))/.4))}px)`;
 const fixed=t>=L[3].t0+.2;$('bad').style.opacity=fixed?0:1;$('good').style.opacity=fixed?C((t-L[3].t0-.2)/.25):0;
 const j=t>=L[1].t0&&t<L[2].t0;$('b1').style.transform=j?`translate(${Math.sin(t*23)*8}px,${Math.cos(t*19)*5}px)`:'';$('b2').style.transform=j?`translate(${Math.cos(t*21)*9}px,${Math.sin(t*17)*6}px)`:''; }};
