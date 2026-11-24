// bg: 0-3.6 grey (5347), 3.6-6.0 only yellow kept (5348), 6.0-9.0 full colour (5348)
const S={hook:'Wyróżnij <em>się</em>',total:9.0,cta:7.6,
lines:[[.3,1.7,'Większość stron wygląda tak samo.'],[1.9,3.4,'Ten sam szablon. Te same zdjęcia.'],[3.75,5.8,'Klient pamięta tych, którzy się wyróżniają.'],[6.15,7.4,'Twój styl. Twoja strona.']],
setup(){ $('fx').innerHTML=`<div id="flash" style="position:absolute;inset:0;background:#fff;opacity:0"></div><div id="tpl" class="tagr" style="left:540px;top:900px;background:#fff;color:#0A0A0B;font:600 38px ui-monospace,monospace;border:4px dashed #0A0A0B">SZABLON #4721</div>`;},
update(t){ $('flash').style.opacity=t>=3.6&&t<3.9?1-(t-3.6)/.3:t>=6&&t<6.2?.6*(1-(t-6)/.2):0;
 const e=$('tpl');e.style.opacity=t>=1.9&&t<3.6?C((t-1.9)/.15):0;e.style.transform=`translateX(-50%) rotate(-4deg) scale(${.6+.4*oB((t-1.9)/.3)})`;}};
