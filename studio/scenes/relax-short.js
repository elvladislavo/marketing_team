const S={img:'../../brand/avatar/ref-relax.jpg',hook:'Strona pracuje <em>za Ciebie</em>',end:'Strona, która<br><em>pracuje?</em>',tail:1.4,
lines:['Ja odpoczywam.','Strona przyjmuje zapytania.','Pracuje cały tydzień.'],
setup(){ const N=[['F','Nowe zapytanie','Formularz kontaktowy · teraz'],['R','Rezerwacja na jutro','Poniedziałek, 10:00'],['?','Pytanie o cenę','Odpowiedź z FAQ wysłana'],['7','Strona online','Pn – Nd, 24 godziny']];
 $('fx').innerHTML=N.map(([i,a,b],k)=>`<div id="n${k}" class="card" style="left:60px;top:${520+k*170}px;width:560px;padding:22px 24px;display:flex;gap:20px;align-items:center;border-radius:28px;background:rgba(255,255,255,.96)">
  <div style="flex:none;width:76px;height:76px;border-radius:18px;background:${k==3?'#0A0A0B':'#FF2E1F'};color:#fff;font:900 40px 'Archivo Variable';display:flex;align-items:center;justify-content:center">${i}</div>
  <div><div style="font:800 34px 'Archivo Variable'">${a}</div><div style="font:500 24px ui-monospace,monospace;color:#555;margin-top:6px">${b}</div></div></div>`).join('');},
update(t){ camPath([[0,.5,.5,1.0],[END,.56,.48,1.12]],t);
 const at=[L[0].end-.1,L[1].t0+.25,L[1].t0+.8,L[2].t0+.25];at.forEach((a,k)=>{const e=$('n'+k);if(t<a){e.style.opacity=0;return}const kk=oC((t-a)/.3);e.style.opacity=kk;e.style.transform=`translateX(${-80*(1-kk)}px) scale(${.9+.1*oB((t-a)/.3)})`;}); }};
