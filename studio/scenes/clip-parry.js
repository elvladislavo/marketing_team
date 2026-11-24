// parry_edit.mp4: impacts ~0.25, 1.5, 2.25, 4.5, 5.75 s
const HITS=[[.05,.3,'BŁĄD 404',140,620],[1.15,1.55,'WOLNA STRONA',560,700],[1.95,2.3,'SPAM',600,560],[4.1,4.5,'BRAK HTTPS',120,760],[5.4,5.8,'ZEPSUTY FORMULARZ',300,620]];
const S={hook:'Odbijam <em>problemy</em> Twojej strony',total:6.85,cta:5.9,
lines:[[.1,1.3,'Problemy ze stroną?'],[2.6,4.0,'Odbijam je po kolei.'],[4.6,5.8,'A Ty robisz swoje.']],
setup(){ $('fx').innerHTML=HITS.map(([a,h,txt,x,y],i)=>`<div id="h${i}" class="tagr" style="left:${x}px;top:${y}px">${txt}</div><div id="k${i}" class="tagr" style="left:${x}px;top:${y+80}px;background:#fff;color:#0A0A0B;font-size:34px">ODBITE ✓</div>`).join('');},
update(t){ HITS.forEach(([a,h],i)=>{const e=$('h'+i),k=$('k'+i);
 if(t<a||t>h+.9){e.style.opacity=0;k.style.opacity=0;return}
 const hit=t>=h; e.style.opacity=hit?1-C((t-h-.5)/.4):C((t-a)/.12); e.style.transform=hit?`rotate(${-8+Math.sin(i)*6}deg) scale(${1-.15*C((t-h)/.2)})`:`scale(${.6+.4*oB((t-a)/.25)})`;
 e.style.textDecoration=hit?'line-through':'none'; e.style.textDecorationThickness='6px';
 k.style.opacity=hit?C((t-h)/.1)*(1-C((t-h-.5)/.4)):0; k.style.transform=`scale(${hit?.5+.5*oB((t-h)/.25):.5})`;});}};
