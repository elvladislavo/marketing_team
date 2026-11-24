const S={img:'../../brand/avatar/ref-relax.jpg',hook:'Strona pracuje <em>za Ciebie</em>',end:'Strona, która<br><em>pracuje?</em>',
lines:['Sobota. Ja odpoczywam.','A strona dalej pracuje.','Przyjmuje zapytania i rezerwacje.','Odpowiada na częste pytania.','Dobra strona pracuje cały tydzień.'],
setup(){ const N=[['F','Nowe zapytanie','Formularz kontaktowy · teraz'],['R','Rezerwacja na jutro','Poniedziałek, 10:00'],['?','Pytanie o cenę','Odpowiedź z FAQ wysłana'],['7','Strona online','Pn – Nd, 24 godziny']];
 $('fx').innerHTML=N.map(([i,a,b],k)=>`<div id="n${k}" class="card" style="left:60px;top:${520+k*170}px;width:560px;padding:22px 24px;display:flex;gap:20px;align-items:center;border-radius:28px;background:rgba(255,255,255,.96)">
  <div style="flex:none;width:76px;height:76px;border-radius:18px;background:${k==3?'#0A0A0B':'#FF2E1F'};color:#fff;font:900 40px 'Archivo Variable';display:flex;align-items:center;justify-content:center">${i}</div>
  <div><div style="font:800 34px 'Archivo Variable'">${a}</div><div style="font:500 24px ui-monospace,monospace;color:#555;margin-top:6px">${b}</div></div></div>`).join('');
 for(let k=0;k<4;k++)$('n'+k).dataset.base='';},
update(t){ camPath([[0,.5,.5,1.0],[END,.56,.48,1.12]],t);
 const at=[L[1].end-.2,L[2].t0+.3,L[3].t0+.3,L[4].t0+.3];at.forEach((a,k)=>{const e=$('n'+k);if(t<a){e.style.opacity=0;return}const kk=oC((t-a)/.35);e.style.opacity=kk;e.style.transform=`translateX(${-80*(1-kk)}px) scale(${.9+.1*oB((t-a)/.35)})`;}); }};
