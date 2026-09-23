<style>
/* ===== CN · U3 · Simulador del espacio y del espectro electromagnético ===== */
.esp-plist{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.esp-plist button{display:flex;align-items:center;gap:8px;padding:7px 9px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);font-size:.8rem;font-weight:600;color:var(--ink-2);text-align:left;width:100%}
.esp-plist button:hover{background:var(--bg-3);color:var(--ink)}
.esp-plist button[aria-pressed="true"]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--ink)}
.esp-dot{width:13px;height:13px;border-radius:50%;flex:none;border:1px solid rgba(0,0,0,.25)}
.esp-vueltas{display:flex;flex-wrap:wrap;gap:6px}
.esp-vueltas span{font-family:var(--font-m);font-size:.72rem;padding:3px 8px;border-radius:999px;background:var(--bg-3);color:var(--ink-2);display:inline-flex;align-items:center;gap:6px}
.esp-vueltas i{width:9px;height:9px;border-radius:50%;display:inline-block}
.esp-spec{position:relative;display:flex;flex-direction:column;gap:6px}
.esp-row{display:flex;gap:3px;width:100%}
.esp-row>*{flex:1 1 0;min-width:0}
.esp-cmp>div{display:flex;flex-direction:row;justify-content:center;align-items:flex-end;gap:10px;color:var(--ink-2);text-align:center;font-size:.66rem;line-height:1.1;padding-bottom:2px}
.esp-cmp svg{width:34px;height:34px;display:block;color:var(--ink-2)}
.esp-cmp span{display:block;color:var(--ink-3);font-family:var(--font-m);font-size:.6rem}
.esp-cmp>div.on{color:var(--ink)}.esp-cmp>div.on svg{color:var(--accent)}
.esp-wave{display:block;width:100%;height:112px;border-radius:12px;background:#0d1220;border:1px solid var(--line)}
.esp-band{display:flex;gap:3px;width:100%}
.esp-band button{flex:1 1 0;min-width:0;padding:10px 4px 9px;border:0;border-radius:10px;color:#10131a;font-weight:700;font-size:.74rem;line-height:1.15;text-align:center;position:relative;transition:transform .15s,box-shadow .15s;display:flex;flex-direction:column;align-items:center;gap:3px;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -2px 0 rgba(0,0,0,.14),0 1px 2px rgba(0,0,0,.12);text-shadow:0 1px 0 rgba(255,255,255,.35)}
.esp-band button svg{width:20px;height:20px;flex:none;opacity:.85}
.esp-band button:hover{filter:brightness(1.07)}
.esp-band button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.esp-band button[aria-pressed="true"]{transform:translateY(-3px);box-shadow:inset 0 0 0 3px #10131a,0 6px 14px rgba(0,0,0,.28)}
.esp-band button[aria-pressed="true"]::after{content:"";position:absolute;left:50%;bottom:-9px;margin-left:-7px;border:7px solid transparent;border-top-color:var(--ink);border-bottom:0}
.esp-band button small{display:block;font-weight:500;font-size:.6rem;opacity:.85;font-family:var(--font-m)}
.esp-ticks{position:relative;height:30px;font-family:var(--font-m);font-size:.64rem;color:var(--ink-3)}
.esp-ticks span{position:absolute;top:2px;transform:translateX(-50%);white-space:nowrap;padding-top:6px}
.esp-ticks span::before{content:"";position:absolute;left:50%;top:0;width:1px;height:5px;background:var(--ink-3)}
.esp-ticks span.b{top:15px}.esp-ticks span.b::before{height:18px;top:-13px}
.esp-scale{display:flex;justify-content:space-between;font-family:var(--font-m);font-size:.68rem;color:var(--ink-3);margin-top:2px;gap:10px}
.esp-ejes{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;align-items:center;font-size:.72rem;color:var(--ink-3)}
.esp-ejes i{display:block;height:8px;border-radius:4px}
.esp-cap{font-size:.86rem;color:var(--ink-2);margin:2px 0 0}
.esp-stage{background:radial-gradient(ellipse at 50% 42%,#1d2742 0%,#0b0f1c 62%,#070a13 100%)!important}
.esp-stage .lbl{background:rgba(10,14,26,.72);border-color:#3d4a6b;color:#eef2ff}
.esp-2d svg{width:100%;height:100%;display:block}
.esp-2d [data-id]{cursor:pointer}
.esp-2d [data-id]:focus-visible{outline:2px solid var(--accent)}
.esp-star{width:100%;height:auto;display:block}
.esp-warm{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}
@media(max-width:720px){.esp-plist{grid-template-columns:1fr}.esp-band button{font-size:.66rem;padding:8px 1px 7px;min-height:118px;justify-content:flex-start}.esp-band button .esp-bt{writing-mode:vertical-rl;transform:rotate(180deg);text-align:left}.esp-band button small{display:none}.esp-cmp>div b{display:none}.esp-cmp span{display:none}.esp-cmp svg{width:22px;height:22px}.esp-wave{height:92px}.esp-ticks{font-size:.56rem}}
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · 9.º EGB Superior · Ciencias Físicas
   Unidad 3: Gravedad, radiación y modelos del espacio
   Rutas:  #/cn/sim/espacio   (sistema solar 3D)
           #/cn/sim/espectro  (espectro electromagnético)
   Actividad: cn-sim-espacio
   Todos los datos astronómicos son APROXIMADOS y redondeados para el aula.
   ===================================================================== */

BIO.activities['cn-sim-espacio'] = { t:'Simulador: sistema solar y espectro electromagnético', unidad:3, peso:20, xp:120 };

/* ---------- datos (valores aproximados, fuentes tipo NASA Planetary Fact Sheet) ---------- */
const ESP_PLANETAS = [
  { id:'mercurio', n:'Mercurio', color:0x9e9b97, hex:'#9e9b97', dKm:4879,   ua:0.39, mkm:57.9,   pD:87.97,  pTxt:'88 días terrestres',              pA:0.241, g:3.7,  t:'167 °C (media; de −180 °C a 430 °C)', lunas:0,
    dato:'Aunque es el planeta más cercano al Sol, no es el más caliente: casi no tiene atmósfera que guarde el calor, así que de noche baja hasta unos −180 °C.' },
  { id:'venus',    n:'Venus',    color:0xe6c37a, hex:'#e6c37a', dKm:12104,  ua:0.72, mkm:108.2,  pD:224.7,  pTxt:'224,7 días terrestres',           pA:0.615, g:8.9,  t:'464 °C', lunas:0,
    dato:'Es el mundo más caliente del sistema solar por su atmósfera densísima de CO₂: un efecto invernadero desbocado. Además gira al revés que los demás.' },
  { id:'tierra',   n:'Tierra',   color:0x4a86c8, hex:'#4a86c8', dKm:12742,  ua:1.00, mkm:149.6,  pD:365.25, pTxt:'365,25 días (1 año)',             pA:1.000, g:9.8,  t:'15 °C', lunas:1,
    dato:'El único mundo conocido con agua líquida estable en la superficie. Desde Ecuador, en la mitad del mundo, el Sol llega casi perpendicular al mediodía.' },
  { id:'marte',    n:'Marte',    color:0xc1553a, hex:'#c1553a', dKm:6779,   ua:1.52, mkm:227.9,  pD:686.98, pTxt:'687 días (1,9 años)',             pA:1.881, g:3.7,  t:'−63 °C', lunas:2,
    dato:'Tiene el volcán más alto conocido, el Monte Olimpo, de unos 22 km de altura: casi cuatro veces el Chimborazo medido desde su base.' },
  { id:'jupiter',  n:'Júpiter',  color:0xd8a97a, hex:'#d8a97a', dKm:139820, ua:5.20, mkm:778.5,  pD:4332.6, pTxt:'11,9 años (4.333 días)',          pA:11.86, g:24.8, t:'−108 °C', lunas:95,
    dato:'Su Gran Mancha Roja es una tormenta más ancha que toda la Tierra y se observa desde hace siglos.' },
  { id:'saturno',  n:'Saturno',  color:0xe3c98f, hex:'#e3c98f', dKm:116460, ua:9.54, mkm:1434,   pD:10759,  pTxt:'29,4 años (10.759 días)',         pA:29.46, g:10.4, t:'−138 °C', lunas:146,
    dato:'Sus anillos son miles de millones de trozos de hielo y roca: miden unos 280.000 km de ancho, pero apenas decenas de metros de espesor.' },
  { id:'urano',    n:'Urano',    color:0x8fd3d8, hex:'#8fd3d8', dKm:50724,  ua:19.19,mkm:2871,   pD:30687,  pTxt:'84,0 años (30.687 días)',         pA:84.01, g:8.9,  t:'−195 °C', lunas:28,
    dato:'Gira “acostado”: su eje está inclinado unos 98°, como si rodara sobre su órbita en lugar de girar como un trompo.' },
  { id:'neptuno',  n:'Neptuno',  color:0x4a6fd0, hex:'#4a6fd0', dKm:49244,  ua:30.07,mkm:4495,   pD:60190,  pTxt:'164,8 años (60.190 días)',        pA:164.8, g:11.2, t:'−201 °C', lunas:16,
    dato:'Tiene los vientos más veloces del sistema solar: más de 1.800 km/h. Se lo descubrió con cálculos matemáticos antes de verlo por el telescopio.' }
];
/* inclinación de la órbita respecto al plano de la Tierra (grados, simplificada) */
const ESP_INC = { mercurio:7.0, venus:3.4, tierra:0, marte:1.9, jupiter:1.3, saturno:2.5, urano:0.8, neptuno:1.8 };

const ESP_BANDAS = [
  { id:'radio', n:'Radio', css:'#7b8cd6', lam:'más de 1 m (hasta varios km)', ev:'≈ 0,000004 eV por fotón', peso:1,
    usos:['Radio FM: ondas de unos 3 m de largo','Televisión abierta y radioaficionados','Telefonía celular y wifi (en su borde con las microondas)'],
    riesgo:'Muy bajo: son las ondas menos energéticas del espectro y no ionizan la materia.',
    proteccion:'No requiere protección especial. Las antenas de alta potencia sí se instalan lejos de las personas.' },
  { id:'micro', n:'Microondas', css:'#61b3b8', lam:'de 1 mm a 1 m', ev:'≈ 0,00001 eV por fotón', peso:1,
    usos:['Horno microondas (12,2 cm): hace vibrar las moléculas de agua del alimento','Radar del aeropuerto y de los meteorólogos','GPS y enlaces satelitales'],
    riesgo:'A mucha potencia calientan los tejidos (sobre todo ojos y piel), pero no rompen moléculas.',
    proteccion:'La malla metálica de la puerta del horno actúa como jaula: los huecos son más pequeños que la onda y esta no sale.' },
  { id:'ir', n:'Infrarrojo', css:'#e07a4f', lam:'de 700 nm a 1 mm', ev:'≈ 0,12 eV por fotón (a 10 µm)', peso:1,
    usos:['Control remoto del televisor','Cámaras térmicas y visión nocturna','El calor que sentimos del Sol o de una plancha'],
    riesgo:'Quemaduras por calor cuando la intensidad es muy alta (hornos, soldadura, vidrio fundido).',
    proteccion:'Distancia, pantallas térmicas y gafas filtrantes en trabajos con calor intenso.' },
  { id:'vis', n:'Visible', css:'#8ed36b', lam:'de 380 nm (violeta) a 750 nm (rojo)', ev:'≈ 2,3 eV por fotón (luz verde)', peso:0.55,
    usos:['La visión humana: es la única franja que detectan nuestros ojos','La fotosíntesis de las plantas','Fibra óptica, semáforos, pantallas'],
    riesgo:'La luz intensa y los láseres pueden dañar la retina de forma permanente.',
    proteccion:'Nunca mirar el Sol ni un láser de frente; usar filtros solares certificados para observar un eclipse.' },
  { id:'uv', n:'Ultravioleta', css:'#9b7ce0', lam:'de 10 nm a 380 nm', ev:'≈ 4,1 eV por fotón (a 300 nm)', peso:0.7,
    usos:['Lámparas germicidas UV-C: esterilizan agua e instrumental','Producción de vitamina D en la piel','Luces negras y detección de billetes falsos'],
    riesgo:'Es el primer rango ionizante: quema la piel, daña el ADN (cáncer de piel) y produce cataratas.',
    proteccion:'Bloqueador solar, gorra, camiseta, gafas con filtro UV y sombra entre las 10:00 y las 15:00. En Ecuador esto es especialmente importante.' },
  { id:'x', n:'Rayos X', css:'#5b7fb0', lam:'de 0,01 nm a 10 nm', ev:'≈ 12.400 eV por fotón (a 0,1 nm)', peso:0.9,
    usos:['Radiografías de huesos y dientes','Tomografías (TAC)','Control de equipaje en aeropuertos'],
    riesgo:'Radiación ionizante: puede romper el ADN de las células y, en dosis altas o repetidas, causar cáncer.',
    proteccion:'Delantal y collarín de plomo, dosis mínima necesaria, no repetir estudios sin indicación médica.' },
  { id:'gamma', n:'Rayos gamma', css:'#c76a8a', lam:'menos de 0,01 nm', ev:'≈ 1.240.000 eV por fotón', peso:0.9,
    usos:['Radioterapia contra tumores','Esterilización de material quirúrgico','Astronomía de altas energías: estrellas que explotan'],
    riesgo:'La radiación más energética e ionizante: atraviesa el cuerpo y daña gravemente los tejidos.',
    proteccion:'Blindaje de plomo u hormigón, distancia y tiempo mínimo de exposición; solo personal capacitado con dosímetro.' }
];

/* ---------- utilidades de formato (coma decimal, punto de miles) ---------- */
const espDec = (v, d=1) => Number(v).toFixed(d).replace('.', ',');
const espMil = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const espQuieto = () => !!Store.s.a11y.motion || !motionOK();

/* =====================================================================
   TEXTURAS PROCEDURALES DE LOS CUERPOS (lienzos pintados una sola vez)
   ===================================================================== */
function espRuido(seed, gx, gy){
  const R = Kit.rng(seed), g = new Float32Array(gx*gy);
  for (let i=0;i<g.length;i++) g[i] = R()*2-1;
  return (u,v) => { const x=u*gx, y=v*gy, x0=Math.floor(x), y0=Math.floor(y), tx=x-x0, ty=y-y0;
    const sx=tx*tx*(3-2*tx), sy=ty*ty*(3-2*ty), i0=((x0%gx)+gx)%gx, i1=(i0+1)%gx, j0=((y0%gy)+gy)%gy, j1=(j0+1)%gy;
    const A=g[j0*gx+i0], B=g[j0*gx+i1], C=g[j1*gx+i0], D=g[j1*gx+i1];
    return A+(B-A)*sx+(C-A)*sy+(A-B-C+D)*sx*sy; };
}
function espFbm(seed, gx, gy, oct){
  const L = []; for (let k=0;k<oct;k++) L.push(espRuido(seed+k*131, gx<<k, gy<<k));
  return (u,v) => { let s=0, a=0.5; for (const n of L){ s+=a*n(u,v); a*=0.5; } return s; };
}
const espRGB = hx => [(hx>>16)&255, (hx>>8)&255, hx&255];
const espMix = (A,B,t) => { t = t<0?0:t>1?1:t; return [A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t, A[2]+(B[2]-A[2])*t]; };
const espSS = (e0,e1,x) => { const t = Math.max(0,Math.min(1,(x-e0)/(e1-e0))); return t*t*(3-2*t); };
const ESP_TEX = {};
/* pinta un lienzo equirectangular: fn(u, v, lat) → [r,g,b,(a)] */
function espPintar(clave, W, H, fn){
  if (ESP_TEX[clave]) return ESP_TEX[clave];
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d'), img = x.createImageData(W,H), D = img.data;
  for (let j=0;j<H;j++){ const v = j/H, lat = 90 - v*180; for (let i=0;i<W;i++){ const k=(j*W+i)*4, q = fn(i/W, v, lat);
    D[k]=Math.min(255,q[0]); D[k+1]=Math.min(255,q[1]); D[k+2]=Math.min(255,q[2]); D[k+3]= q.length>3 ? q[3] : 255; } }
  x.putImageData(img,0,0);
  return (ESP_TEX[clave] = c);
}
function espTexPlaneta(id){
  const low = (typeof lowEnd === 'function') && lowEnd();
  const grande = id==='jupiter' || id==='saturno' || id==='tierra';
  const W = low ? 256 : (grande ? 512 : 256), H = W/2;
  if (id==='mercurio'){
    const n = espFbm(11, 8, 4, 5), f = espFbm(13, 32, 16, 3);
    const c = espPintar('mercurio', W, H, (u,v) => { const t = 0.5 + n(u,v)*0.9 + f(u,v)*0.3; return espMix(espRGB(0x6f6a64), espRGB(0xb5afa6), t); });
    if (!c._crateres){ c._crateres = true; const x = c.getContext('2d'), R = Kit.rng(5);
      for (let i=0;i<(low?70:140);i++){ const cx = R()*W, cy = H*0.12 + R()*H*0.76, r = (0.4 + Math.pow(R(),3)*4)*W/256;
        const g = x.createRadialGradient(cx-r*0.2, cy-r*0.2, 0, cx, cy, r*1.25);
        g.addColorStop(0,'rgba(60,56,52,.55)'); g.addColorStop(0.75,'rgba(70,66,60,.35)'); g.addColorStop(0.86,'rgba(215,208,196,.45)'); g.addColorStop(1,'rgba(200,195,185,0)');
        x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy, r*1.25/Math.max(0.35, Math.sin(Math.PI*cy/H)), r*1.25, 0, 0, 7); x.fill(); } }
    return c;
  }
  if (id==='venus'){
    const n = espFbm(21, 6, 3, 5), w = espFbm(23, 4, 4, 3);
    return espPintar('venus', W, H, (u,v,lat) => { const b = Math.sin((v + w(u,v)*0.12 + Math.abs(lat)/90*0.15*Math.sin(u*Math.PI*2))*Math.PI*9);
      const t = 0.5 + b*0.18 + n(u*1.0 + v*0.3, v)*0.7; return espMix(espRGB(0xc9a15a), espRGB(0xf2dfab), t); });
  }
  if (id==='tierra'){
    const n = espFbm(31, 6, 3, 6), d = espFbm(37, 24, 12, 3);
    return espPintar('tierra', W, H, (u,v,lat) => { const al = Math.abs(lat), h = n(u,v) + d(u,v)*0.15;
      if (al > 72 + d(u,v)*10) return espMix(espRGB(0xdfe8ef), espRGB(0xffffff), 0.5+d(u,v));
      if (h > 0.06){ const seco = Math.exp(-Math.pow((al-24)/9,2)) * (0.6 + d(u,v)*2);
        let c = espMix(espRGB(0x2f6a2e), espRGB(0x5f8a3e), (al/60) + d(u,v));
        return espMix(c, espRGB(0xc9ac72), seco); }
      return espMix(espRGB(0x0d3872), espRGB(0x2a78b8), espSS(-0.12, 0.06, h)); });
  }
  if (id==='tierra-nubes'){
    const n = espFbm(41, 10, 4, 5), d = espFbm(43, 40, 16, 3);
    return espPintar('tierra-nubes', W, H, (u,v,lat) => { const band = 0.35*Math.exp(-Math.pow((lat-6)/8,2)) + 0.3*Math.exp(-Math.pow((Math.abs(lat)-55)/12,2));
      const a = espSS(0.12, 0.42, n(u + d(u,v)*0.05, v) + band + d(u,v)*0.2); return [255,255,255, a*235]; });
  }
  if (id==='marte'){
    const n = espFbm(51, 6, 3, 6), d = espFbm(53, 32, 16, 3);
    return espPintar('marte', W, H, (u,v,lat) => { const al = Math.abs(lat);
      if (al > 80 + d(u,v)*6) return [238,236,232];
      let c = espMix(espRGB(0xa2482e), espRGB(0xd58a5a), 0.5 + n(u,v)*1.1 + d(u,v)*0.3);
      c = espMix(c, espRGB(0x6a3a2a), espSS(0.14, 0.3, n(u*1.7+0.3, v)) * 0.55);                       /* regiones oscuras */
      c = espMix(c, espRGB(0x4a261c), Math.exp(-Math.pow((lat+8)/2.2,2)) * espSS(0.52,0.56,u) * (1-espSS(0.7,0.74,u)) * 0.8);   /* gran cañón */
      return c; });
  }
  if (id==='jupiter'){
    const w = espFbm(61, 8, 4, 5), f = espFbm(67, 32, 32, 3);
    const zonas = [0xe9dcc3, 0xc98d5a, 0xefe4cc, 0xb5764c, 0xe4d2b0, 0xd0a070, 0xf0e6d2, 0xa8704a, 0xe2cfaa, 0xc49468, 0xd9c2a0];
    return espPintar('jupiter', W, H, (u,v,lat) => {
      const vv = v + w(u*2, v)*0.035*(0.4+Math.sin(v*Math.PI*14)**2), k = vv*zonas.length, i0 = Math.max(0,Math.min(zonas.length-1, Math.floor(k)));
      const i1 = Math.min(zonas.length-1, i0+1), t = espSS(0.72, 1, k - i0);
      let c = espMix(espRGB(zonas[i0]), espRGB(zonas[i1]), t); const g = 1 + f(u,v)*0.12; c = c.map(q=>q*g);
      /* Gran Mancha Roja (latitud ≈ 22° S) */
      let du = (u-0.62)*360/12, dv = (lat+22)/6, r = Math.hypot(du, dv);
      if (r < 1.35){ c = espMix(c, espRGB(0xf0d9b8), espSS(1.35, 1.05, r)*0.85); c = espMix(c, espRGB(0xc2553a), espSS(1.0, 0.55, r + f(u*3,v)*0.25)); }
      return c; });
  }
  if (id==='saturno'){
    const w = espFbm(71, 8, 4, 4), f = espFbm(73, 32, 32, 2);
    return espPintar('saturno', W, H, (u,v,lat) => { const b = Math.sin((v + w(u,v)*0.01)*Math.PI*22), b2 = Math.sin(v*Math.PI*7);
      let c = espMix(espRGB(0xcfae72), espRGB(0xf0dcaa), 0.55 + b*0.18 + b2*0.2);
      if (Math.abs(lat) > 70) c = espMix(c, espRGB(0x9fa87e), espSS(70, 80, Math.abs(lat))*0.6);
      const g = 1 + f(u,v)*0.06; return c.map(q=>q*g); });
  }
  if (id==='urano'){
    const f = espFbm(81, 16, 8, 3);
    return espPintar('urano', W, H, (u,v) => { const b = Math.sin(v*Math.PI*10)*0.05; const c = espMix(espRGB(0x8fd3d8), espRGB(0xc6eef0), 0.45 + b + f(u,v)*0.15);
      return c; });
  }
  /* neptuno */
  const w = espFbm(91, 8, 4, 4), f = espFbm(93, 32, 16, 3);
  return espPintar('neptuno', W, H, (u,v,lat) => { const b = Math.sin((v + w(u,v)*0.02)*Math.PI*12);
    let c = espMix(espRGB(0x2f55c4), espRGB(0x5a86e6), 0.5 + b*0.25 + f(u,v)*0.3);
    const r = Math.hypot((u-0.35)*3, (lat+20)/6); if (r < 1) c = espMix(c, espRGB(0x1b2d78), espSS(1, 0.5, r));        /* Gran Mancha Oscura */
    if (Math.abs(lat+34) < 1.4 && Math.abs(u-0.42) < 0.08) c = espMix(c, [235,240,255], 0.75*espSS(0.08, 0.03, Math.abs(u-0.42)));                                   /* nubes altas */
    return c; });
}
function espTexSol(){
  const low = (typeof lowEnd === 'function') && lowEnd(), W = low ? 256 : 512, H = W/2;
  const g = espFbm(101, 128, 64, 2), m = espFbm(103, 8, 4, 4);
  return espPintar('sol', W, H, (u,v,lat) => { const gr = g(u,v), t = 0.55 + gr*1.4 + m(u,v)*0.4;
    let c = espMix(espRGB(0xf08a1c), espRGB(0xffd24a), t); c = espMix(c, espRGB(0xfff2b8), espSS(0.2, 0.45, gr));
    /* manchas solares en las latitudes medias: núcleo oscuro (umbra) y borde más claro (penumbra) */
    [[0.22,16,1],[0.27,19,0.6],[0.64,-14,0.8]].forEach(([u0,l0,k]) => { const r = Math.hypot((u-u0)*360/(3.2*k), (lat-l0)/(2.6*k));
      if (r < 1.6){ c = espMix(c, espRGB(0xb0581a), espSS(1.6, 1.0, r)*0.7); c = espMix(c, espRGB(0x4a200c), espSS(0.75, 0.35, r)); } });
    return c; });
}
/* anillos de Saturno (perfil radial): C tenue, B brillante, división de Cassini, A con la división de Encke */
function espTexAnillo(){
  if (ESP_TEX.anillo) return ESP_TEX.anillo;
  const W = 512, c = document.createElement('canvas'); c.width = W; c.height = 4;
  const x = c.getContext('2d'), img = x.createImageData(W,4), D = img.data, f = espFbm(111, 128, 1, 3);
  const RIN = 1.24, ROUT = 2.27;
  for (let i=0;i<W;i++){ const r = RIN + (ROUT-RIN)*i/W, fr = 1 + f(i/W, 0)*0.35;
    let col, a;
    if (r < 1.53){ col = [150,136,112]; a = 0.22 + 0.1*espSS(1.24,1.5,r); }
    else if (r < 1.95){ col = [232,214,172]; a = 0.88; }
    else if (r < 2.03){ col = [110,100,90]; a = 0.06; }
    else { col = [206,186,148]; a = Math.abs(r-2.214) < 0.006 ? 0.05 : 0.62; }
    a = Math.max(0, Math.min(1, a*fr)); col = col.map(q => q*(0.9 + f(i/W,0)*0.3));
    for (let j=0;j<4;j++){ const k=(j*W+i)*4; D[k]=col[0]; D[k+1]=col[1]; D[k+2]=col[2]; D[k+3]=a*255; } }
  x.putImageData(img,0,0);
  return (ESP_TEX.anillo = c);
}
/* halo aditivo con degradado radial (corona solar, brillo) */
function espHalo(stops, rayos){
  const n = 256, c = document.createElement('canvas'); c.width = c.height = n;
  const x = c.getContext('2d'), g = x.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);
  stops.forEach(([o,col]) => g.addColorStop(o,col)); x.fillStyle = g; x.fillRect(0,0,n,n);
  if (rayos){ const R = Kit.rng(7); x.globalCompositeOperation = 'lighter';
    for (let i=0;i<rayos;i++){ const a = R()*Math.PI*2, l = n*(0.28 + R()*0.2), w = 2 + R()*5;
      const lg = x.createLinearGradient(n/2, n/2, n/2 + Math.cos(a)*l, n/2 + Math.sin(a)*l);
      lg.addColorStop(0,'rgba(255,220,150,.05)'); lg.addColorStop(1,'rgba(255,200,120,0)');
      x.strokeStyle = lg; x.lineWidth = w; x.beginPath(); x.moveTo(n/2, n/2); x.lineTo(n/2 + Math.cos(a)*l, n/2 + Math.sin(a)*l); x.stroke(); } }
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding;
  return new THREE.Sprite(new THREE.SpriteMaterial({ map:t, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, toneMapped:false }));
}
/* campo de estrellas: tres tamaños y la franja de la Vía Láctea; siempre centrado en la cámara */
function espEstrellas(low){
  const grupo = new THREE.Group(), R = Kit.rng(2024);
  const inc = new THREE.Matrix4().makeRotationX(1.05).multiply(new THREE.Matrix4().makeRotationZ(0.5));
  const tint = [[1,1,1],[0.8,0.87,1],[1,0.93,0.8],[1,0.8,0.7],[0.75,0.82,1]];
  [[low?700:1500, 1.2, 0.55, false],[low?260:520, 1.8, 0.8, false],[low?60:120, 2.6, 1, false],[low?1400:3200, 1.0, 0.35, true]].forEach(([n, sz, br, via]) => {
    const P = new Float32Array(n*3), C = new Float32Array(n*3), v = new THREE.Vector3();
    for (let i=0;i<n;i++){
      if (via){ const a = R()*Math.PI*2, h = (R()+R()+R()-1.5)*0.16; v.set(Math.cos(a), h, Math.sin(a)).normalize().applyMatrix4(inc); }
      else { const z = R()*2-1, a = R()*Math.PI*2, r = Math.sqrt(1-z*z); v.set(r*Math.cos(a), z, r*Math.sin(a)); }
      v.multiplyScalar(60); P.set([v.x,v.y,v.z], i*3);
      const t = tint[Math.floor(R()*tint.length)], b = br*(0.55 + R()*0.45); C.set([t[0]*b, t[1]*b, t[2]*b], i*3); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(P,3)); g.setAttribute('color', new THREE.BufferAttribute(C,3));
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ size:sz, sizeAttenuation:false, vertexColors:true, depthTest:false, depthWrite:false, toneMapped:false }));
    pts.renderOrder = -10; grupo.add(pts); });
  return grupo;
}
/* inclinación del eje (grados, aproximada; solo visual) y giro visual relativo */
const ESP_EJE = { mercurio:0.03, venus:177.4, tierra:23.4, marte:25.2, jupiter:3.1, saturno:21.8, urano:97.8, neptuno:28.3 };
const ESP_GIRO = { mercurio:0.05, venus:0.03, tierra:0.5, marte:0.5, jupiter:1.2, saturno:1.1, urano:0.7, neptuno:0.7 };

/* =====================================================================
   ESPECTRO ILUSTRADO: comparaciones de escala, íconos de uso y onda animada
   ===================================================================== */
/* objeto de tamaño comparable a la longitud de onda de cada región (órdenes de magnitud) */
const ESP_ESCALA = {
  radio:[['edificio','≈ 100 m'],['persona','≈ 1,7 m']], micro:[['insecto','≈ 1 cm']], ir:[['célula','≈ 10 µm']],
  vis:[['bacteria','≈ 0,5 µm']], uv:[['virus','≈ 100 nm']], x:[['átomo','≈ 0,1 nm']], gamma:[['núcleo atómico','≈ 0,00001 nm']]
};
/* límites entre regiones (de izquierda a derecha), según las longitudes de onda de las fichas */
const ESP_LIMITES = ['1 m','1 mm','≈ 700 nm','380 nm','10 nm','0,01 nm'];
/* longitud de onda dibujada (fracción del ancho) y fondo de cada botón */
const ESP_ONDA = { radio:0.15, micro:0.066, ir:0.032, vis:0.019, uv:0.011, x:0.0068, gamma:0.0042 };
const ESP_FONDO = {
  radio:'linear-gradient(180deg,#9aa8ec,#6f80cf)', micro:'linear-gradient(180deg,#86cdd1,#55a7ad)', ir:'linear-gradient(180deg,#f29a72,#d86a42)',
  vis:'linear-gradient(90deg,#ff5a4a,#ffa13d 22%,#ffe94a 42%,#6ee06a 60%,#4aa8ff 80%,#9a6cff)',
  uv:'linear-gradient(180deg,#b99cf0,#8d6dd6)', x:'linear-gradient(180deg,#8aa6d2,#5577aa)', gamma:'linear-gradient(180deg,#e28eab,#bd5f82)'
};
const espSvg = (vb, cuerpo) => `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${cuerpo}</svg>`;
const ESP_GLIFO = {
  edificio: espSvg('0 0 32 32','<rect x="9" y="4" width="14" height="25" rx="1.5"/><path d="M4 29h24M13 9h2M17 9h2M13 13h2M17 13h2M13 17h2M17 17h2M13 21h2M17 21h2"/><path d="M14.5 29v-4h3v4"/>'),
  persona: espSvg('0 0 32 32','<circle cx="16" cy="6.5" r="3"/><path d="M16 10v10M16 20l-4 9M16 20l4 9M10 14l6-2 6 2"/>'),
  insecto: espSvg('0 0 32 32','<ellipse cx="16" cy="19" rx="3.2" ry="6"/><circle cx="16" cy="10.5" r="2.4"/><path d="M13 17c-5-4-9-2-8 1s5 3 8 1M19 17c5-4 9-2 8 1s-5 3-8 1M14.6 8.6 12 5M17.4 8.6 20 5M13 21l-4 3M19 21l4 3"/>'),
  'célula': espSvg('0 0 32 32','<path d="M16 4c7 0 12 5 12 11.5S23 28 15.5 28 4 23 4 16 9 4 16 4Z"/><circle cx="17" cy="15" r="4.2"/><circle cx="18" cy="14.4" r="1.2"/><path d="M8.5 20.5h2M22 22.5h2M10 10h1.5"/>'),
  bacteria: espSvg('0 0 32 32','<rect x="6" y="11" width="18" height="10" rx="5"/><path d="M24 16c2.5 0 2.5-3 5-3M11 14.5h3M16 17.5h3"/>'),
  virus: espSvg('0 0 32 32','<circle cx="16" cy="16" r="7"/><path d="M16 9V5M16 23v4M9 16H5M23 16h4M11 11 8 8M21 21l3 3M21 11l3-3M11 21l-3 3"/><circle cx="16" cy="4" r="1"/><circle cx="16" cy="28" r="1"/><circle cx="4" cy="16" r="1"/><circle cx="28" cy="16" r="1"/>'),
  'átomo': espSvg('0 0 32 32','<circle cx="16" cy="16" r="2" fill="currentColor"/><ellipse cx="16" cy="16" rx="12" ry="4.5"/><ellipse cx="16" cy="16" rx="12" ry="4.5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="4.5" transform="rotate(-60 16 16)"/>'),
  'núcleo atómico': espSvg('0 0 32 32','<circle cx="13" cy="13" r="4"/><circle cx="19" cy="13" r="4" fill="currentColor" fill-opacity=".35"/><circle cx="16" cy="18.5" r="4"/><circle cx="12" cy="20" r="4" fill="currentColor" fill-opacity=".35"/><circle cx="20" cy="20" r="4"/>')
};
/* un uso típico de cada región, como ícono dentro del botón */
const ESP_USO = {
  radio: espSvg('0 0 24 24','<path d="M12 10v12M8 22l4-12 4 12M9.5 17h5"/><path d="M8.5 6.5a5 5 0 0 1 7 0M6 4a8.5 8.5 0 0 1 12 0"/><circle cx="12" cy="9" r="1.3" fill="currentColor"/>'),
  micro: espSvg('0 0 24 24','<rect x="2.5" y="5" width="19" height="14" rx="2"/><rect x="5" y="7.5" width="10" height="9" rx="1"/><path d="M18 8.5v1M18 12v1M18 15.5v1"/>'),
  ir: espSvg('0 0 24 24','<rect x="8" y="8" width="8" height="14" rx="2.5"/><circle cx="12" cy="12" r="1.3"/><path d="M10.5 16h3M10.5 19h3M9 5a4.5 4.5 0 0 1 6 0M7 2.8a7.5 7.5 0 0 1 10 0"/>'),
  vis: espSvg('0 0 24 24','<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
  uv: espSvg('0 0 24 24','<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/>'),
  x: espSvg('0 0 24 24','<path d="M7.5 5.5a2.2 2.2 0 1 0-3 3l1.5 1.5L14 18l1.5 1.5a2.2 2.2 0 1 0 3-3l0 0a2.2 2.2 0 1 0-3-3L8 6"/><path d="M8 6 6.5 4.5"/>'),
  gamma: espSvg('0 0 24 24','<circle cx="12" cy="12" r="1.8" fill="currentColor"/><path d="M12 9.2 9.3 4.6a8.5 8.5 0 0 1 5.4 0ZM14.4 13.4l5.3.1a8.5 8.5 0 0 1-2.7 4.7ZM9.6 13.4 7 18.2a8.5 8.5 0 0 1-2.7-4.7Z" fill="currentColor" fill-opacity=".85"/>')
};
/* color aproximado de una longitud de onda visible (nm) → [r,g,b] en 0–255 */
function espLambdaRGB(l){
  let r=0,g=0,b=0;
  if (l<440){ r=-(l-440)/60; b=1; } else if (l<490){ g=(l-440)/50; b=1; } else if (l<510){ g=1; b=-(l-510)/20; }
  else if (l<580){ r=(l-510)/70; g=1; } else if (l<645){ r=1; g=-(l-645)/65; } else r=1;
  const f = l<420 ? 0.3+0.7*(l-380)/40 : l>700 ? 0.3+0.7*(750-l)/50 : 1;
  return [r,g,b].map(c => Math.round(255*Math.pow(Math.max(0,c)*f, 0.8)));
}
/* espectro de absorción de una estrella tipo Sol (líneas de Fraunhofer principales) */
function espEspectroSVG(){
  const W = 600, X = l => ((l-380)/(750-380)*W).toFixed(1);
  let stops = ''; for (let l=380;l<=750;l+=10){ const [r,g,b] = espLambdaRGB(l); stops += `<stop offset="${((l-380)/370*100).toFixed(1)}%" stop-color="rgb(${r},${g},${b})"/>`; }
  const L = [[393.4,2.6,'Ca'],[396.8,2.4,''],[410.2,1.4,'Hδ'],[430.8,1.8,''],[434.0,1.6,'Hγ'],[438.4,0.8,''],[440.5,0.7,''],[486.1,2.0,'Hβ'],[495.8,0.8,''],
             [516.7,1.1,'Mg'],[517.3,1.1,''],[518.4,1.1,''],[527.0,1.0,''],[532.8,0.7,''],[537.1,0.7,''],[589.0,1.3,'Na'],[589.6,1.3,''],[656.3,2.3,'Hα']];
  const lineas = L.map(([l,w]) => `<rect x="${(X(l)-w*1.5).toFixed(1)}" y="16" width="${(w*3).toFixed(1)}" height="46" fill="url(#espLinea)" opacity="${w>1.2?0.95:0.7}"/>`).join('');
  const et = L.filter(q => q[2]).map(([l,,n]) => `<text x="${X(n==='Ca'?395:l)}" y="11" text-anchor="middle">${n}</text>`).join('');
  const tk = [400,500,600,700].map(l => `<line x1="${X(l)}" y1="62" x2="${X(l)}" y2="66" stroke="currentColor"/><text x="${X(l)}" y="77" text-anchor="middle">${l} nm</text>`).join('');
  return `<svg class="esp-star" viewBox="0 0 ${W} 80" role="img" aria-label="Espectro de una estrella parecida al Sol: franja continua de colores del violeta (400 nm) al rojo (700 nm), cruzada por líneas oscuras de absorción; las más marcadas son las del calcio, del hidrógeno (H alfa, beta, gamma y delta), del magnesio y del sodio" style="color:var(--ink-3);font:600 10px var(--font-m, monospace)">
    <defs><linearGradient id="espArcoiris" x1="0" y1="0" x2="1" y2="0">${stops}</linearGradient>
      <linearGradient id="espLinea" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#06070b" stop-opacity="0"/><stop offset=".5" stop-color="#06070b"/><stop offset="1" stop-color="#06070b" stop-opacity="0"/></linearGradient>
      <linearGradient id="espBrillo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
      <clipPath id="espRecorte"><rect x="0" y="16" width="${W}" height="46" rx="7"/></clipPath></defs>
    <g fill="currentColor">${et}</g>
    <g clip-path="url(#espRecorte)"><rect x="0" y="16" width="${W}" height="46" fill="url(#espArcoiris)"/>${lineas}<rect x="0" y="16" width="${W}" height="46" fill="url(#espBrillo)"/></g>
    <rect x="0.5" y="16.5" width="${W-1}" height="45" rx="7" fill="none" stroke="var(--line)"/>
    <g fill="currentColor">${tk}</g></svg>`;
}
/* onda animada: cada región con su propia longitud de onda; todas avanzan a la misma rapidez (la de la luz) */
function espOnda(cv, getRegiones, getSel){
  const ctx = cv.getContext('2d'); let W = 0, H = 0, dpr = 1, raf = 0, t0 = performance.now();
  const medir = () => { dpr = Math.min(2, window.devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight; cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); };
  const dibujar = (t) => {
    if (!W) medir(); if (!W) return;
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,W,H);
    const R = getRegiones(), sel = getSel(), mid = H*0.52, A = H*0.27, c = Math.max(24, W*0.035);
    R.forEach(r => {
      const on = r.id === sel, x0 = r.x0, x1 = r.x1;
      /* fondo de la región */
      if (r.id === 'vis'){ const g = ctx.createLinearGradient(x0,0,x1,0); ['#ff4a3a','#ffa13d','#ffe94a','#5bd65a','#3a98ff','#8a5cff'].forEach((q,i) => g.addColorStop(i/5, q));
        ctx.globalAlpha = on ? 0.42 : 0.24; ctx.fillStyle = g; } else { ctx.globalAlpha = on ? 0.3 : 0.1; ctx.fillStyle = r.css; }
      ctx.fillRect(x0, 0, x1-x0, H); ctx.globalAlpha = 1;
      if (on){ ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.5; ctx.strokeRect(x0+0.75, 0.75, x1-x0-1.5, H-1.5); }
      /* onda */
      const lam = Math.max(3.2, ESP_ONDA[r.id]*Math.max(W, 520)), k = Math.PI*2/lam;
      ctx.save(); ctx.beginPath(); ctx.rect(x0, 0, x1-x0, H); ctx.clip(); ctx.beginPath();
      const paso = Math.max(0.5, lam/14);
      for (let x = x0; x <= x1+paso; x += paso){ const y = mid - A*Math.sin(k*(x - c*t)); x === x0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y); }
      if (r.id === 'vis'){ const g = ctx.createLinearGradient(x0,0,x1,0); ['#ff6a5a','#ffb04a','#fff06a','#7aea7a','#6ab8ff','#b08cff'].forEach((q,i) => g.addColorStop(i/5, q)); ctx.strokeStyle = g; }
      else ctx.strokeStyle = on ? '#ffffff' : 'rgba(235,240,255,.72)';
      ctx.lineWidth = Math.min(on ? 2.6 : 1.6, Math.max(1, lam*0.34)); ctx.shadowColor = on ? 'rgba(255,255,255,.7)' : 'transparent'; ctx.shadowBlur = on ? 6 : 0; ctx.stroke();
      ctx.restore();
      /* marca de una longitud de onda (λ) en la región elegida */
      if (on && lam < (x1-x0)*0.9){ const xa = x0 + (x1-x0-lam)/2, ya = mid - A - 9;
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(xa, ya+4); ctx.lineTo(xa, ya); ctx.lineTo(xa+lam, ya); ctx.lineTo(xa+lam, ya+4); ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.font = '600 11px "IBM Plex Mono",monospace'; ctx.textAlign = 'center'; ctx.fillText('λ', xa+lam/2, ya-3); }
    });
    /* separadores */
    ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1; R.slice(1).forEach(r => { ctx.beginPath(); ctx.moveTo(r.x0-1.5, 6); ctx.lineTo(r.x0-1.5, H-6); ctx.stroke(); });
  };
  const bucle = (now) => { if (!cv.isConnected){ raf = 0; return; } raf = requestAnimationFrame(bucle);
    if (document.hidden || cv.offsetParent === null) return; dibujar((now - t0)/1000); };
  const ro = new ResizeObserver(() => { medir(); dibujar(espQuieto() ? 0 : (performance.now()-t0)/1000); }); ro.observe(cv);
  return {
    iniciar(){ if (espQuieto()){ dibujar(0); return; } if (!raf) raf = requestAnimationFrame(bucle); },
    redibujar(){ if (espQuieto() || !raf) dibujar(0); },
    parar(){ if (raf) cancelAnimationFrame(raf); raf = 0; ro.disconnect(); }
  };
}

/* =====================================================================
   VISTA
   ===================================================================== */
function espacioView(view, tabIni){
  view.classList.add('wide');
  const hecho = () => !!Store.s.activities['cn-sim-espacio']?.done;

  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'},
    h('div',{},
      h('span',{class:'eyebrow'},'Ciencias Naturales · 9.º EGB Superior · Ciencias Físicas · Unidad 3'),
      h('h1',{},'Gravedad, radiación y modelos del espacio'),
      h('p',{},'Dos maneras de conocer lo que nunca podremos tocar: un modelo del sistema solar que podemos girar y medir, y la luz que nos llega de las estrellas. Ojo: un modelo no es la realidad, es una herramienta para pensarla.')),
    h('span',{class:'pill'},'Datos aproximados')));

  const retoSt = h('div',{class:'notice'},'Pendiente: baja hasta el reto y responde las cuatro preguntas.');
  if (hecho()){ retoSt.className='notice ok'; retoSt.textContent='Reto resuelto ✓'; }
  view.append(purposeBanner({
    proposito:'Explicar el movimiento de los planetas alrededor del Sol y reconocer la radiación electromagnética como la única evidencia que tenemos de lo que ocurre a millones de kilómetros.',
    observa:[
      'Qué le pasa al modelo cuando pides la escala real de distancias',
      'Cuántas vueltas da Mercurio mientras la Tierra da una sola',
      'Cómo cambia tu peso (no tu masa) de un mundo a otro',
      'Que el infrarrojo se siente caliente, pero el ultravioleta es el que daña'
    ],
    reto:'Responde las cuatro preguntas del reto final: escala, tamaño, energía de la radiación y por qué “en el espacio hace frío” es una frase tramposa.',
    statusEl: retoSt
  }));

  /* ---- pestañas ---- */
  const tabs = h('div',{class:'tabs',role:'tablist',style:'margin-bottom:14px'});
  const paneSolar = h('div',{role:'tabpanel','aria-label':'Sistema solar'});
  const paneEsp   = h('div',{role:'tabpanel','aria-label':'Espectro electromagnético',style:'display:none'});
  let tab = tabIni === 'espectro' ? 'espectro' : 'solar';
  const bSolar = h('button',{role:'tab',onclick:()=>setTab('solar')},'🪐 Sistema solar 3D');
  const bEsp   = h('button',{role:'tab',onclick:()=>setTab('espectro')},'🌈 Espectro electromagnético');
  tabs.append(bSolar, bEsp);
  function setTab(t){
    tab = t;
    bSolar.setAttribute('aria-selected', t==='solar');
    bEsp.setAttribute('aria-selected', t==='espectro');
    paneSolar.style.display = t==='solar' ? '' : 'none';
    paneEsp.style.display   = t==='espectro' ? '' : 'none';
    if (t==='solar' && E) E.resize();
    if (t==='espectro' && typeof posTicks === 'function'){ requestAnimationFrame(() => { posTicks(); onda.redibujar(); }); }
    Store.log('pestania',{vista:'cn-sim-espacio',pestania:t});
  }

  /* =================================================================
     BLOQUE 1 · SISTEMA SOLAR
     ================================================================= */
  const S = { escala:'did', vel: espQuieto() ? 0 : 10, dias:0, sel:'tierra', masa:45 };
  const stage = h('div',{class:'stage esp-stage',style:'align-self:start;height:600px;min-height:600px'}), panel = h('div',{class:'panel'});

  /* controles sobre el escenario */
  const segEscala = h('div',{class:'segmented',role:'group','aria-label':'Escala del modelo'});
  const btnDid  = h('button',{onclick:()=>setEscala('did'),'aria-label':'Escala didáctica'},'Escala didáctica');
  const btnReal = h('button',{onclick:()=>setEscala('real'),'aria-label':'Escala real de distancias'},'Escala real de distancias');
  segEscala.append(btnDid, btnReal);
  const chkLbl = h('input',{type:'checkbox',checked:true,'aria-label':'Mostrar etiquetas de los planetas',onchange:e=>{ if (E) E.setLabels(e.target.checked); }});
  const segVel = h('div',{class:'segmented',role:'group','aria-label':'Velocidad de la simulación'});
  const VELS = [[0,'⏸','Pausa'],[1,'×1','1 día por segundo'],[10,'×10','10 días por segundo'],[100,'×100','100 días por segundo']];
  const btnsVel = VELS.map(([v,txt,lab]) => h('button',{'aria-label':lab,onclick:()=>setVel(v)},txt));
  segVel.append(...btnsVel);
  const notaTiempo = h('span',{class:'stage-note'},'—');
  stage.append(h('div',{class:'stage-top'}, segEscala, h('label',{class:'toggle',style:'background:color-mix(in srgb,var(--bg-2) 85%,transparent);padding:4px 10px;border-radius:10px;border:1px solid var(--line)'}, chkLbl, 'Etiquetas')));
  stage.append(h('div',{class:'stage-bottom'}, segVel, notaTiempo));

  /* panel lateral */
  const listaEl = h('div',{class:'esp-plist',role:'group','aria-label':'Lista de cuerpos del sistema solar, seleccionables con el teclado'});
  const fichaEl = h('div',{class:'stack'});
  const vueltasEl = h('div',{class:'esp-vueltas','aria-live':'polite'});
  const readEl = h('div',{class:'readouts',style:'grid-template-columns:repeat(2,1fr)'});
  panel.append(
    h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Elige un cuerpo'), listaEl,
      h('p',{class:'small muted'},'También puedes hacer clic sobre el planeta en el modelo. Con el teclado: Tab para recorrer la lista y Enter para elegir.')),
    h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Ficha del cuerpo'), fichaEl),
    h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Reloj del modelo'), readEl, vueltasEl,
      h('p',{class:'small muted'},'“Vueltas” = órbitas completas alrededor del Sol desde que empezó la simulación.'))
  );

  const notaEscala = h('div',{class:'notice info'});
  paneSolar.append(h('div',{class:'viewer'}, stage, panel), h('div',{style:'height:14px'}), notaEscala);

  /* --- motor 3D --- */
  let E = null, sun = null, svg2d = null, marcas2d = null, raf2d = 0;
  let estrellas = null, corona = null, brilloSol = null, solMat = null;
  const M = {};   /* mallas por id */
  const ORB = {}; /* líneas de órbita por id */
  let sunR = 1;

  if (webglOK){
    try {
      E = new Engine3D(stage, {
        radius:36, phi:0.86, theta:0.5, minR:2, maxR:72, target:[0,0,0], dark:true, exposure:1.0,
        aria:'Modelo 3D del sistema solar. Arrastra para rotar, rueda del ratón para acercar. Usa la lista de cuerpos para seleccionar con el teclado.',
        onSelect:(id)=>{ if (id) elegir(id.replace('-orb','')); }
      });
      construir3D();
    } catch(err){ console.warn('espacio 3D', err); E = null; }
  }
  if (!E){
    stage.append(construir2D());
  }

  function construir3D(){
    /* el Sol es la única fuente real: atenuamos las luces de estudio del motor */
    E.scene.traverse(o => { if (o.isDirectionalLight) o.intensity *= 0.22; if (o.isHemisphereLight) o.intensity = 0.10; });
    E.spotlight = () => {};   /* en el sistema solar no atenuamos los demás cuerpos al seleccionar uno */
    E.scene.add(new THREE.PointLight(0xfff2d8, 2.4));
    const low = E.low;
    estrellas = espEstrellas(low); E.scene.add(estrellas);
    /* Sol: fotosfera granulada con oscurecimiento del limbo (shader propio) + corona aditiva */
    const tSol = new THREE.CanvasTexture(espTexSol()); tSol.wrapS = THREE.RepeatWrapping;
    solMat = new THREE.ShaderMaterial({ uniforms:{ map:{ value:tSol }, t:{ value:0 } },
      vertexShader:'varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main(){ vUv = uv; vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
      fragmentShader:'uniform sampler2D map; uniform float t; varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main(){ vec3 c = texture2D(map, vUv + vec2(t*0.004, 0.0)).rgb; float mu = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0); c *= 0.52 + 0.55*pow(mu, 0.45); c += vec3(1.0,0.55,0.15)*pow(1.0-mu, 2.5)*0.35; gl_FragColor = vec4(c, 1.0); }' });
    sun = new THREE.Mesh(new THREE.SphereGeometry(1, low?32:48, low?22:32), solMat);
    E.addPart('sol', [sun], { passThrough:true });
    E.addLabel('sol','Sol',[0,1.4,0]);
    brilloSol = espHalo([[0,'rgba(255,240,200,.95)'],[0.18,'rgba(255,214,120,.55)'],[0.42,'rgba(255,170,70,.16)'],[1,'rgba(255,140,40,0)']]);
    corona = espHalo([[0,'rgba(255,220,160,.3)'],[0.3,'rgba(255,190,110,.1)'],[1,'rgba(255,160,80,0)']], low ? 30 : 60);
    E.scene.add(brilloSol, corona);
    ESP_PLANETAS.forEach((p, i) => {
      const tx = new THREE.CanvasTexture(espTexPlaneta(p.id)); tx.encoding = THREE.sRGBEncoding; tx.anisotropy = 4;
      const m = new THREE.Mesh(new THREE.SphereGeometry(1, low?32:48, low?22:32), new THREE.MeshStandardMaterial({ map:tx, roughness:0.92, metalness:0, envMapIntensity:0.12 }));
      m.position.set(3 + i, 0, 0);
      m.rotation.x = (ESP_EJE[p.id]||0)*Math.PI/180;
      const meshes = [m];
      if (p.id === 'tierra'){
        const tn = new THREE.CanvasTexture(espTexPlaneta('tierra-nubes')); tn.encoding = THREE.sRGBEncoding;
        const nub = new THREE.Mesh(new THREE.SphereGeometry(1.03, low?32:48, low?22:32), new THREE.MeshStandardMaterial({ map:tn, transparent:true, depthWrite:false, roughness:1, metalness:0 }));
        m.add(nub); M['tierra-nubes'] = nub;
      }
      if (p.id === 'saturno'){
        /* anillos con huecos: la textura es un perfil radial, así que las UV se recalculan por radio */
        const RIN = 1.24, ROUT = 2.27, rg = new THREE.RingGeometry(RIN, ROUT, low?96:160, 3);
        const P = rg.attributes.position, U = rg.attributes.uv;
        for (let k=0;k<P.count;k++){ const r = Math.hypot(P.getX(k), P.getY(k)); U.setXY(k, (r-RIN)/(ROUT-RIN), 0.5); }
        const ta = new THREE.CanvasTexture(espTexAnillo()); ta.encoding = THREE.sRGBEncoding;
        const ring = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ map:ta, color:new THREE.Color(0xf2ead8), side:THREE.DoubleSide, transparent:true, depthWrite:false, toneMapped:false }));
        ring.rotation.x = -Math.PI/2 + 0.38; ring.userData.ring = true; ring.renderOrder = 2;
        meshes.push(ring); M[p.id+'-ring'] = ring;
      }
      E.addPart(p.id, meshes);
      E.addLabel(p.id, p.n, [0,0,0]);
      M[p.id] = m;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(256*3), 3));
      const line = new THREE.LineLoop(geo, new THREE.LineBasicMaterial({ color:new THREE.Color(0x8ea2cc).convertSRGBToLinear(), transparent:true, opacity:0.26, depthWrite:false }));
      line.userData.col0 = line.material.color.clone();
      E.addPart(p.id+'-orb', [line], { pickable:false, passThrough:true });
      ORB[p.id] = line;
    });
    aplicarEscala();
    E.onFrame((t, dt) => {
      paso(dt);
      estrellas.position.copy(E.camera.position);
      solMat.uniforms.t.value = espQuieto() ? 0 : t;
      if (S.vel > 0 && !espQuieto()) ESP_PLANETAS.forEach(p => M[p.id].rotateY(dt*(ESP_GIRO[p.id]||0.3)));
      if (M['tierra-nubes'] && S.vel > 0 && !espQuieto()) M['tierra-nubes'].rotateY(dt*0.05);
    });
  }
  function marcarOrbita(id){
    Object.entries(ORB).forEach(([k,l]) => { const on = k === id, p = ESP_PLANETAS.find(q => q.id === k);
      l.material.color.copy(on ? new THREE.Color(p.hex).convertSRGBToLinear() : l.userData.col0);
      l.material.opacity = on ? 0.85 : 0.26; });
  }

  /* --- escalas --- */
  const UA_REAL = 15 / 30.07;            /* unidades del modelo por UA en escala real */
  const R_SOL_KM = 696340, KM_UA = 149.6e6;
  function aplicarEscala(){
    const real = S.escala === 'real';
    ESP_PLANETAS.forEach((p, i) => {
      p._r   = real ? p.ua * UA_REAL : 3.0 + i*1.55;
      p._rad = real ? Math.max((p.dKm/2) / KM_UA * UA_REAL, 0.02)
                    : clamp(Math.pow(p.dKm/12742, 0.42) * 0.30, 0.09, 0.62);
    });
    sunR = real ? Math.max(R_SOL_KM / KM_UA * UA_REAL, 0.05) : 1.0;
    if (E){
      ESP_PLANETAS.forEach(p => {
        const inc = (ESP_INC[p.id]||0) * Math.PI/180;
        const pos = ORB[p.id].geometry.attributes.position;
        for (let k=0;k<256;k++){ const a = k/256*Math.PI*2;
          pos.setXYZ(k, Math.cos(a)*p._r, Math.sin(a)*p._r*Math.sin(inc), Math.sin(a)*p._r*Math.cos(inc)); }
        pos.needsUpdate = true; ORB[p.id].geometry.computeBoundingSphere();
      });
      posiciones3D();
    }
    posiciones2D();
    btnDid.setAttribute('aria-selected', !real); btnReal.setAttribute('aria-selected', real);
    notaEscala.innerHTML = real
      ? '<span><b>Escala real de distancias (los tamaños también).</b> Ahora las distancias entre las órbitas sí guardan la proporción verdadera… y los planetas prácticamente desaparecen. No es un error del programa: si el Sol tuviera el tamaño de una pelota de básquet (24 cm), la Tierra sería una bolita de 2,2 mm ubicada a 26 metros de distancia, y Neptuno estaría a 780 metros. Y aun así, en esta pantalla los planetas están dibujados <b>muchísimo más grandes</b> de lo que les tocaría, porque si no serían invisibles.</span>'
      : '<span><b>Escala didáctica (la de los libros y las maquetas).</b> Las órbitas están repartidas de forma pareja y los planetas agrandados para poder verlos y compararlos. Sirve para estudiar el orden, los tamaños relativos y los movimientos, pero <b>miente sobre las distancias</b>. Ningún dibujo escolar puede mostrar al mismo tiempo el tamaño real y la distancia real: el sistema solar es sobre todo espacio vacío. Cambia a “escala real de distancias” y compruébalo.</span>';
  }
  function setEscala(v){ S.escala = v; aplicarEscala(); Store.log('simulador',{modelo:'espacio',escala:v}); }

  /* --- tiempo --- */
  function setVel(v){
    S.vel = v;
    btnsVel.forEach((b,i) => b.setAttribute('aria-selected', VELS[i][0]===v));
    if (v>0 && !E && !raf2d) bucle2D();
    Store.log('simulador',{modelo:'espacio',velocidad:v});
  }
  let acum = 0;
  function paso(dt){
    if (S.vel > 0) S.dias += dt * S.vel;
    if (E) posiciones3D(); else posiciones2D();
    acum += dt;
    if (acum > 0.2){ acum = 0; refrescarTiempo(); }
  }
  function bucle2D(){
    let last = performance.now();
    const f = (now) => { raf2d = requestAnimationFrame(f); if (document.hidden) { last = now; return; }
      const dt = Math.min((now-last)/1000, 0.05); last = now; paso(dt); };
    raf2d = requestAnimationFrame(f);
  }
  function angulo(p){ return p._fase + (S.dias / p.pD) * Math.PI*2; }
  function posiciones3D(){
    if (!E) return;
    sun.scale.setScalar(sunR);
    if (brilloSol){ brilloSol.scale.setScalar(sunR*4.2); corona.scale.setScalar(sunR*9); }
    const ls = E.labels.get('sol'); if (ls) ls.pos.set(0, sunR + 0.35, 0);
    ESP_PLANETAS.forEach(p => {
      const a = angulo(p), inc = (ESP_INC[p.id]||0) * Math.PI/180;
      const x = Math.cos(a)*p._r, y = Math.sin(a)*p._r*Math.sin(inc), z = Math.sin(a)*p._r*Math.cos(inc);
      const m = M[p.id]; m.position.set(x,y,z); m.scale.setScalar(p._rad);
      const ring = M['saturno-ring'];
      if (p.id==='saturno' && ring){ ring.position.set(x,y,z); ring.scale.setScalar(p._rad); }
      const l = E.labels.get(p.id); if (l) l.pos.set(x, y + p._rad + 0.22, z);
    });
  }

  function refrescarTiempo(){
    readEl.innerHTML = '';
    const anios = S.dias/365.25;
    [[espMil(S.dias), 'días terrestres', 'Tiempo transcurrido'],
     [espDec(anios,2), 'años terrestres', 'Lo mismo, en años de la Tierra']].forEach(([v,u,l]) =>
      readEl.append(h('div',{class:'readout'}, h('div',{class:'v'}, v, ' ', h('span',{class:'u'},u)), h('div',{class:'l'}, l))));
    vueltasEl.innerHTML = '';
    ESP_PLANETAS.forEach(p => vueltasEl.append(h('span',{}, h('i',{style:'background:'+p.hex}), p.n+' '+espDec(S.dias/p.pD, 2))));
    notaTiempo.textContent = S.vel===0 ? 'Simulación en pausa' : `${espMil(S.dias)} días terrestres · ${espDec(S.dias/365.25,2)} años`;
  }

  /* --- selección y ficha --- */
  const listaBtns = {};
  function pintarLista(){
    listaEl.innerHTML = '';
    listaBtns.sol = h('button',{'aria-pressed':'false','aria-label':'Sol',onclick:()=>elegir('sol')},
      h('span',{class:'esp-dot',style:'background:#ffce5a'}), 'Sol');
    listaEl.append(listaBtns.sol);
    ESP_PLANETAS.forEach(p => { listaBtns[p.id] = h('button',{'aria-pressed':'false','aria-label':p.n,onclick:()=>elegir(p.id)},
      h('span',{class:'esp-dot',style:'background:'+p.hex}), p.n); listaEl.append(listaBtns[p.id]); });
    marcarLista();
  }
  /* no se reconstruye la lista al elegir: así el foco del teclado no se pierde */
  function marcarLista(){ Object.entries(listaBtns).forEach(([k,b]) => b.setAttribute('aria-pressed', k===S.sel ? 'true' : 'false')); }
  function elegir(id){
    S.sel = id; marcarLista();
    if (E){ E.select(id); marcarOrbita(id); }
    if (marcas2d) Object.entries(marcas2d).forEach(([k,el]) => el.setAttribute('stroke', k===id ? '#ffffff' : 'none'));
    ficha(id);
    Store.log('seleccion',{modelo:'espacio',cuerpo:id});
  }
  function ficha(id){
    fichaEl.innerHTML = '';
    if (id === 'sol'){
      fichaEl.append(h('h3',{style:'margin:0'},'Sol'),
        h('dl',{class:'kv'},
          h('dt',{},'Diámetro'), h('dd',{},'1.392.700 km (unas 109 Tierras en fila)'),
          h('dt',{},'Distancia media a la Tierra'), h('dd',{},'1 UA = 149,6 millones de km'),
          h('dt',{},'Gravedad superficial'), h('dd',{},'274 m/s² (28 veces la de la Tierra)'),
          h('dt',{},'Temperatura'), h('dd',{},'≈ 5.500 °C en la superficie; 15 millones de °C en el núcleo'),
          h('dt',{},'Qué es'), h('dd',{},'Una estrella: una esfera de gas ionizado donde el hidrógeno se fusiona en helio')),
        h('p',{class:'small'},'Dato curioso: su luz demora unos 8 minutos y 20 segundos en llegar a nosotros. Cuando miras el Sol (nunca directamente), ves cómo era hace 8 minutos.'));
      return;
    }
    const p = ESP_PLANETAS.find(x => x.id === id); if (!p) return;
    const orden = ESP_PLANETAS.indexOf(p) + 1;
    fichaEl.append(
      h('div',{class:'row',style:'align-items:center;gap:8px'}, h('span',{class:'esp-dot',style:'width:18px;height:18px;background:'+p.hex}), h('h3',{style:'margin:0'}, p.n), h('span',{class:'pill'}, orden+'.º desde el Sol')),
      h('dl',{class:'kv'},
        h('dt',{},'Diámetro'), h('dd',{}, espMil(p.dKm)+' km'+(p.id==='tierra'?'':`  (${espDec(p.dKm/12742,2)} veces la Tierra)`)),
        h('dt',{},'Distancia media al Sol'), h('dd',{}, espDec(p.ua,2)+' UA · '+espDec(p.mkm,1)+' millones de km'),
        h('dt',{},'Periodo orbital'), h('dd',{}, p.pTxt),
        h('dt',{},'Gravedad superficial'), h('dd',{}, espDec(p.g,1)+' m/s²'),
        h('dt',{},'Temperatura media'), h('dd',{}, p.t),
        h('dt',{},'Lunas conocidas'), h('dd',{}, p.lunas===0 ? 'ninguna' : espMil(p.lunas))),
      h('div',{class:'notice'}, h('span',{}, h('b',{},'Dato curioso: '), p.dato)),
      h('p',{class:'small muted'},'Valores aproximados y redondeados. El número de lunas cambia: cada año se confirman nuevas.'));
    if (Store.s.a11y.tts) fichaEl.append(TTS.btn(()=>fichaEl.textContent, 'Leer la ficha'));
  }

  /* --- alternativa 2D sin WebGL --- */
  function construir2D(){
    const NS = 'http://www.w3.org/2000/svg';
    svg2d = document.createElementNS(NS,'svg');
    svg2d.setAttribute('viewBox','0 0 640 430');
    svg2d.setAttribute('role','img');
    svg2d.setAttribute('aria-label','Esquema en dos dimensiones del sistema solar: órbitas concéntricas alrededor del Sol. Los datos de cada planeta están en la lista y en la ficha.');
    const cx = 320, cy = 215;
    const fondo = document.createElementNS(NS,'rect');
    fondo.setAttribute('width','640'); fondo.setAttribute('height','430'); fondo.setAttribute('fill','#0d1220');
    svg2d.append(fondo);
    marcas2d = {};
    const orb2d = {};
    ESP_PLANETAS.forEach(p => {
      const e = document.createElementNS(NS,'ellipse');
      e.setAttribute('cx',cx); e.setAttribute('cy',cy); e.setAttribute('fill','none');
      e.setAttribute('stroke','#4a5a80'); e.setAttribute('stroke-width','1');
      svg2d.append(e); orb2d[p.id] = e;
    });
    const s = document.createElementNS(NS,'circle');
    s.setAttribute('cx',cx); s.setAttribute('cy',cy); s.setAttribute('fill','#ffce5a');
    s.setAttribute('data-id','sol'); s.setAttribute('tabindex','0'); s.setAttribute('role','button');
    s.setAttribute('aria-label','Sol'); svg2d.append(s); marcas2d.sol = s;
    ESP_PLANETAS.forEach(p => {
      const c = document.createElementNS(NS,'circle');
      c.setAttribute('fill', p.hex); c.setAttribute('data-id', p.id);
      c.setAttribute('tabindex','0'); c.setAttribute('role','button'); c.setAttribute('aria-label', p.n);
      c.setAttribute('stroke-width','2'); c.setAttribute('stroke','none');
      svg2d.append(c); marcas2d[p.id] = c;
    });
    svg2d.addEventListener('click', e => { const t = e.target.closest('[data-id]'); if (t) elegir(t.dataset.id); });
    svg2d.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){ const t = e.target.closest('[data-id]'); if (t){ e.preventDefault(); elegir(t.dataset.id); } } });
    svg2d._orb = orb2d;
    const wrap = h('div',{class:'esp-2d',style:'position:absolute;inset:0;padding:8px'});
    wrap.append(svg2d);
    const aviso = h('div',{class:'stage-note',style:'position:absolute;top:54px;left:12px;z-index:4'},'Sin WebGL: esquema 2D con los mismos datos y los mismos controles');
    const cont = h('div',{style:'position:absolute;inset:0'}, wrap, aviso);
    return cont;
  }
  function posiciones2D(){
    if (!svg2d) return;
    const real = S.escala === 'real';
    const cx = 320, cy = 215, MAXR = 272;
    const sr = real ? Math.max(R_SOL_KM/KM_UA/30.07*MAXR, 2.5) : 16;
    marcas2d.sol.setAttribute('r', sr.toFixed(2));
    ESP_PLANETAS.forEach((p,i) => {
      const rx = real ? p.ua/30.07*MAXR : 34 + i*34;
      const ry = rx*0.36;
      const o = svg2d._orb[p.id]; o.setAttribute('rx', rx.toFixed(1)); o.setAttribute('ry', ry.toFixed(1));
      const a = angulo(p);
      const pr = real ? Math.max((p.dKm/2)/KM_UA/30.07*MAXR, 1) : clamp(Math.pow(p.dKm/12742,0.42)*5.4, 2.2, 13);
      const c = marcas2d[p.id];
      c.setAttribute('cx', (cx + Math.cos(a)*rx).toFixed(1));
      c.setAttribute('cy', (cy + Math.sin(a)*ry).toFixed(1));
      c.setAttribute('r', pr.toFixed(2));
    });
  }

  /* --- gravedad: tu peso en cada mundo --- */
  const pesoTbl = h('div',{class:'tablewrap'});
  const inpMasa = h('input',{type:'number',min:'10',max:'200',step:'0.5',value:'45',id:'esp-masa','aria-label':'Tu masa en kilogramos'});
  inpMasa.addEventListener('input', () => { const v = parseFloat(inpMasa.value); if (!isNaN(v) && v>0){ S.masa = clamp(v, 1, 500); pintarPeso(); } });
  const MUNDOS = [['Luna', 1.62, '#c9c6c0'], ['Sol', 274, '#ffce5a']];
  function pintarPeso(){
    const filas = ESP_PLANETAS.map(p => [p.n, p.g, p.hex]).concat(MUNDOS);
    const t = h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Mundo'), h('th',{},'Gravedad (m/s²)'), h('th',{},'Tu peso (N)'), h('th',{},'Equivalente (kg-f)'), h('th',{},'Veces tu peso aquí'))),
      h('tbody',{}, filas.map(([n,g]) => {
        const peso = S.masa*g, kgf = peso/9.80665, rel = g/9.8;
        return h('tr',{}, h('td',{}, n), h('td',{class:'num'}, espDec(g,2)), h('td',{class:'num'}, espMil(peso)+' N'),
          h('td',{class:'num'}, espDec(kgf,1)+' kgf'),
          h('td',{class:'num'}, espDec(rel,2)+' ×'));
      })));
    pesoTbl.innerHTML = ''; pesoTbl.append(t);
  }
  const cardPeso = h('div',{class:'card stack'},
    h('span',{class:'eyebrow'},'Gravedad · ¿cuánto pesarías en cada mundo?'),
    h('p',{class:'small muted',html:'Tu <b>masa</b> es la misma en todas partes: es la cantidad de materia que tienes. Lo que cambia es tu <b>peso</b>, que es la fuerza con la que ese mundo te atrae: P = m · g. En la balanza de la tienda marcan kilogramos, pero en realidad miden una fuerza; por eso usamos el kilogramo-fuerza para comparar.'}),
    h('div',{class:'field',style:'max-width:260px'}, h('label',{for:'esp-masa'},'Tu masa (kg)'), inpMasa),
    pesoTbl,
    h('div',{class:'notice'}, h('span',{}, h('b',{},'Fíjate: '),'Mercurio y Marte tienen casi la misma gravedad aunque Marte es más grande. El peso no depende solo del tamaño: depende de la masa del cuerpo y de su radio. Y en Júpiter, con tu misma masa, casi no podrías levantarte del suelo.')));

  /* --- gráfico distancia vs periodo --- */
  const cvChart = h('canvas',{class:'chart',style:'height:260px'});
  const cardChart = h('div',{class:'card stack'},
    h('span',{class:'eyebrow'},'¿Hay una regla escondida? Distancia vs. periodo orbital'),
    h('p',{class:'small muted'},'Cada punto es un planeta: a la izquierda su distancia al Sol (en UA) y hacia arriba cuánto demora en dar una vuelta completa (en años terrestres). Observa la forma de la curva antes de leer cualquier fórmula.'),
    h('div',{style:'position:relative'}, cvChart),
    h('div',{class:'notice info'}, h('span',{html:'<b>Qué observar: </b>la línea no es recta. Neptuno está unas 30 veces más lejos que la Tierra, pero no demora 30 años: demora casi 165. Cuanto más lejos está un planeta, más largo es su camino <b>y</b> más lento se mueve por él. Johannes Kepler encontró esta relación en 1619 comparando justamente estos dos números; no la memorices: compruébala con los puntos.'})));

  paneSolar.append(h('div',{style:'height:14px'}), h('div',{class:'grid g2'}, cardPeso, cardChart));

  /* =================================================================
     BLOQUE 2 · ESPECTRO ELECTROMAGNÉTICO
     ================================================================= */
  const banda = h('div',{class:'esp-band',role:'group','aria-label':'Regiones del espectro electromagnético'});
  const fichaB = h('div',{class:'stack'});
  let selB = 'vis';
  const btnsB = ESP_BANDAS.map(b => h('button',{
    style:`background:${ESP_FONDO[b.id] || b.css};flex-grow:${b.peso}`,'aria-pressed':false,
    'aria-label':`${b.n}. Longitud de onda ${b.lam}`,
    onclick:()=>elegirBanda(b.id)
  }, h('span',{html:ESP_USO[b.id] || ''}), h('span',{class:'esp-bt'}, b.n), h('small',{}, b.id==='vis' ? 'lo que vemos' : b.id==='radio' ? 'menos energía' : b.id==='gamma' ? 'más energía' : '')));
  banda.append(...btnsB);
  /* fila de comparaciones de escala, alineada con los botones */
  const cmpEls = ESP_BANDAS.map(b => h('div',{style:`flex-grow:${b.peso}`},
    ...(ESP_ESCALA[b.id]||[]).map(([n,t]) => h('div',{style:'display:flex;flex-direction:column;align-items:center'}, h('span',{html:ESP_GLIFO[n]||'',style:'display:block;font-size:0;color:inherit'}), h('b',{style:'font-weight:600'}, n), h('span',{}, t)))));
  const cmpRow = h('div',{class:'esp-row esp-cmp','aria-hidden':'true'}, ...cmpEls);
  const cvOnda = h('canvas',{class:'esp-wave',role:'img','aria-label':'Onda animada: de izquierda a derecha la longitud de onda se acorta y la frecuencia aumenta, desde las ondas de radio hasta los rayos gamma; todas viajan a la misma rapidez.'});
  const ticks = h('div',{class:'esp-ticks','aria-hidden':'true'});
  const tickEls = ESP_LIMITES.map((t,i) => { const e = h('span',{class: i%2 ? 'b' : ''}, t); ticks.append(e); return e; });
  const capEsc = h('p',{class:'esp-cap','aria-live':'polite'});
  const regiones = () => { const r0 = cvOnda.getBoundingClientRect();
    return btnsB.map((el,i) => { const r = el.getBoundingClientRect(); return { id:ESP_BANDAS[i].id, css:ESP_BANDAS[i].css, x0:r.left-r0.left, x1:r.right-r0.left }; }); };
  const posTicks = () => { const r0 = ticks.getBoundingClientRect(); if (!r0.width) return;
    btnsB.slice(1).forEach((el,i) => { const r = el.getBoundingClientRect(); tickEls[i].style.left = (r.left - r0.left - 1.5) + 'px'; }); };
  const onda = espOnda(cvOnda, regiones, () => selB);
  new ResizeObserver(posTicks).observe(ticks);
  function elegirBanda(id){
    selB = id; btnsB.forEach((el,i) => el.setAttribute('aria-pressed', ESP_BANDAS[i].id===id));
    const b = ESP_BANDAS.find(x => x.id===id);
    cmpEls.forEach((el,i) => el.classList.toggle('on', ESP_BANDAS[i].id===id));
    const cmp = (ESP_ESCALA[id]||[]).map(([n,t]) => `${n==='átomo'||n==='edificio'||n==='insecto'?'un':n==='persona'||n==='célula'||n==='bacteria'?'una':'un'} ${n} (${t})`).join(' o ');
    capEsc.innerHTML = `<b>${esc(b.n)}:</b> su longitud de onda típica es comparable al tamaño de ${esc(cmp)}.`;
    onda.redibujar();
    fichaB.innerHTML = '';
    fichaB.append(
      h('h3',{style:'margin:0'}, b.n),
      h('dl',{class:'kv'},
        h('dt',{},'Longitud de onda típica'), h('dd',{}, b.lam),
        h('dt',{},'Energía por fotón (aprox.)'), h('dd',{}, b.ev)),
      h('span',{class:'eyebrow'},'Para qué sirve en la vida diaria'),
      h('ul',{class:'checks plain'}, b.usos.map(u => h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), u))),
      h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Riesgo: '), b.riesgo)),
      h('div',{class:'notice ok'}, h('span',{}, h('b',{},'Cómo protegerse: '), b.proteccion)));
    if (Store.s.a11y.tts) fichaB.append(TTS.btn(()=>fichaB.textContent, 'Leer la ficha'));
    Store.log('seleccion',{modelo:'espectro',banda:id});
  }

  const svgEstrella = espEspectroSVG();

  paneEsp.append(
    h('div',{class:'card stack'},
      h('span',{class:'eyebrow'},'Toca cada región'),
      h('p',{class:'small muted'},'Todas son la misma cosa —radiación electromagnética— viajando a 300.000 km/s. Lo único que cambia es la longitud de onda: hacia la izquierda las ondas son largas y traen poca energía; hacia la derecha son cortísimas y cada fotón golpea con muchísima más fuerza. La franja visible, la única que ven tus ojos, es apenas una rendija en el medio.'),
      h('div',{class:'esp-spec'}, cmpRow, cvOnda, banda, ticks),
      h('div',{class:'esp-scale'}, h('span',{},'← ondas largas · poca energía'), h('span',{},'ondas cortas · mucha energía →')),
      capEsc),
    h('div',{style:'height:14px'}),
    h('div',{class:'grid g2'},
      h('div',{class:'card stack'}, fichaB),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow'},'¿Qué luz nos llega de las estrellas?'),
        h('p',{html:'Nunca hemos tocado una estrella y jamás lo haremos. Todo lo que sabemos de ellas llegó como radiación: es <b>evidencia indirecta</b>. Cuando esa luz se descompone con un prisma o una red de difracción, aparecen líneas oscuras en lugares precisos.'}),
        h('div',{html:svgEstrella}),
        h('p',{class:'small muted'},'Espectro de una estrella (esquema): la franja continua nos habla de su temperatura; las líneas oscuras, de su composición.'),
        h('p',{class:'small',html:'<b>Composición.</b> Cada elemento químico absorbe longitudes de onda exactas, como una huella digital. Si en el espectro falta justo la luz que absorbe el hidrógeno, es porque hay hidrógeno en esa estrella. Así se descubrió el helio en el Sol antes que en la Tierra.'}),
        h('p',{class:'small',html:'<b>Temperatura.</b> El color dominante delata el calor: las estrellas azules superan los 20.000 °C y las rojizas rondan los 3.000 °C. Es la misma regla del hierro en la fragua: primero rojo, después blanco.'}),
        h('p',{class:'small',html:'<b>Movimiento.</b> Si todas las líneas se corren hacia el rojo, la estrella o la galaxia se está alejando. Así supimos que el universo se expande.'}),
        h('div',{class:'notice info'}, h('span',{}, h('b',{},'Desde Ecuador, en la mitad del mundo: '),'parados sobre la línea equinoccial vemos, a lo largo del año, las constelaciones del hemisferio norte y las del sur; casi ningún otro país tiene ese cielo doble. La Estrella Polar aparece rozando el horizonte norte y la Cruz del Sur, el horizonte sur. Además, el Sol cae casi perpendicular al mediodía todo el año: por eso nuestro índice UV es de los más altos del planeta, incluso en días nublados y sobre todo en el páramo, donde hay menos atmósfera que filtre. Gorra, bloqueador y sombra no son exageración: son física.')))));

  /* =================================================================
     RETO
     ================================================================= */
  const retoWrap = h('div',{class:'card stack',style:'margin-top:16px'});
  const PREGUNTAS = [
    { q:'Un compañero dice: “los planetas más grandes están más lejos del Sol; por eso Júpiter es enorme”. ¿Qué respondes con los datos del simulador?',
      ops:['Tiene razón: el tamaño aumenta con la distancia al Sol',
           'No: Neptuno está mucho más lejos que Júpiter y es casi tres veces más pequeño. El tamaño y la distancia son datos independientes',
           'Tiene razón solo para los planetas rocosos'],
      ok:1,
      fb:'Exacto. Júpiter (139.820 km) está a 5,2 UA y Neptuno (49.244 km) a 30,1 UA: mucho más lejos y bastante más pequeño. Lo que sí cambia con la distancia es el tipo de planeta: cerca del Sol quedaron los rocosos y lejos, los gigantes gaseosos y helados.',
      wrong:['Revisa la ficha de Júpiter y la de Neptuno: compara el diámetro y la distancia. Neptuno está seis veces más lejos y es casi tres veces más pequeño.',
             'Entre los rocosos tampoco se cumple: Mercurio es el más cercano y es el más pequeño, pero Venus (más lejos que Mercurio) es apenas menor que la Tierra. No hay regla de tamaño según distancia.'] },
    { q:'Pon la simulación en ×100 y observa. ¿Por qué Mercurio da varias vueltas mientras la Tierra apenas completa una?',
      ops:['Porque Mercurio es más pequeño y le cuesta menos girar',
           'Porque su órbita es mucho más corta y, además, se mueve más rápido al estar más cerca del Sol',
           'Porque la Tierra se detiene de vez en cuando por las estaciones'],
      ok:1,
      fb:'Así es. Mercurio recorre un camino mucho más corto (0,39 UA de radio frente a 1 UA) y encima lo hace a mayor velocidad, porque cerca del Sol la atracción gravitatoria es más intensa. Resultado: 88 días frente a 365,25. Esa doble razón es la que Kepler resumió en su tercera ley.',
      wrong:['El tamaño del planeta no interviene: un planeta pequeño situado lejos, como Plutón, demora 248 años. Fíjate en el radio de la órbita.',
             'La Tierra nunca se detiene: se mueve a unos 30 km/s sin parar. Las estaciones se deben a la inclinación de su eje, no a cambios de velocidad apreciables.'] },
    { q:'El infrarrojo del Sol se siente caliente en la piel; el ultravioleta no se siente. Sin embargo, el que produce quemaduras y cáncer de piel es el ultravioleta. ¿Por qué?',
      ops:['Porque el ultravioleta calienta más que el infrarrojo, aunque no lo notemos',
           'Porque cada fotón ultravioleta lleva unos 4 eV, energía suficiente para romper enlaces del ADN, mientras que el infrarrojo (≈ 0,12 eV) solo hace vibrar las moléculas y eso lo percibimos como calor',
           'Porque el ultravioleta viaja más rápido que el infrarrojo y penetra más'],
      ok:1,
      fb:'Correcto. Sentir calor y hacer daño son cosas distintas. El infrarrojo agita moléculas: es calor. El ultravioleta es ionizante en su extremo: cada fotón tiene unas 30 veces más energía y puede romper moléculas, incluido el ADN. Por eso te quemas un día fresco y nublado en el páramo sin sentir nada.',
      wrong:['El ultravioleta no “calienta más”: calentar es agitar moléculas, y en eso el infrarrojo es el especialista. El daño del UV viene de la energía por fotón, no de la temperatura.',
             'Toda la radiación electromagnética viaja a la misma velocidad en el vacío: 300.000 km/s. Lo que cambia es la longitud de onda y, con ella, la energía de cada fotón.'] },
    { q:'“En el espacio hace frío porque está muy lejos del Sol.” En la Estación Espacial, a solo 400 km de altura, la cara iluminada supera los 120 °C y la sombreada baja de −150 °C. ¿Qué falla en esa frase?',
      ops:['Nada: a 400 km ya se está muy lejos del Sol y por eso hace frío',
           'Que en el vacío casi no hay materia: sin aire no hay conducción ni convección, solo radiación. Un objeto se calienta muchísimo al Sol y se enfría muchísimo en la sombra; la distancia apenas cambió',
           'Que el vacío es frío por naturaleza y enfría todo lo que toca'],
      ok:1,
      fb:'Eso es. La temperatura necesita materia que se agite; en el vacío casi no hay. El calor solo se transmite por radiación, y por eso los trajes y las naves llevan capas aislantes y reflectantes para ambos extremos. Además, 400 km no es nada: la distancia al Sol sigue siendo prácticamente 1 UA, es decir, 149,6 millones de kilómetros.',
      wrong:['Compara: la Tierra está a 149.600.000 km del Sol y la Estación, a 400 km más. Esa diferencia es de un 0,0003 %: no explica nada.',
             'El vacío no tiene temperatura propia porque casi no tiene partículas. No “enfría”: simplemente no hay aire que lleve calor hacia el objeto ni que se lo quite por contacto.'] }
  ];
  let resueltas = 0, intentosTot = 0;
  retoWrap.append(h('span',{class:'eyebrow'},'🎯 Reto final · errores que se repiten todos los años'),
    h('p',{class:'small muted'},'Antes de responder, usa el simulador: cambia la escala, pon la velocidad en ×100 y revisa las fichas. Si te equivocas, la retroalimentación te dice exactamente dónde mirar.'));
  PREGUNTAS.forEach(p => retoWrap.append(quizBlock(p, (intentos) => {
    resueltas++; intentosTot += intentos;
    if (resueltas === PREGUNTAS.length){
      Store.completeActivity('cn-sim-espacio', { score:`${PREGUNTAS.length}/${PREGUNTAS.length}`, attempts:intentosTot });
      retoSt.className = 'notice ok';
      retoSt.innerHTML = `<span><b>¡Reto resuelto!</b> Cuatro de cuatro con ${intentosTot} intento${intentosTot===1?'':'s'} en total. Ya puedes explicar las órbitas sin confundir la escala del modelo con los tamaños reales, y distinguir el calor (infrarrojo) del daño (ultravioleta).</span>`;
      retoWrap.append(h('div',{class:'notice ok'},'Actividad completada y registrada en tu progreso de la Unidad 3.'));
      toast('Reto del espacio completado ✓');
    }
  })));
  retoWrap.append(h('div',{class:'row',style:'margin-top:4px'},
    h('button',{class:'btn sm',onclick:()=>setTab('solar')},'Volver al sistema solar'),
    h('button',{class:'btn sm',onclick:()=>setTab('espectro')},'Volver al espectro'),
    h('a',{class:'btn sm ghost',href:'#/cn/sim/espectro'},'Abrir el espectro en su propia página')));

  view.append(tabs, paneSolar, paneEsp, retoWrap);

  /* ---- arranque ---- */
  ESP_PLANETAS.forEach((p,i) => { p._fase = i*1.1; });
  aplicarEscala();
  pintarLista(); ficha(S.sel); pintarPeso(); elegirBanda(selB);
  setVel(S.vel); setTab(tab); onda.iniciar(); requestAnimationFrame(posTicks);
  refrescarTiempo();
  if (E) E.select(S.sel); else posiciones2D();
  if (espQuieto()) notaTiempo.textContent = 'Simulación en pausa (preferencia de menos movimiento activa). Pulsa ×1, ×10 o ×100 cuando quieras.';
  setTimeout(() => {
    lineChart(cvChart, {
      series:[{ label:'planetas', color:cssVar('--accent'), dots:true, pts: ESP_PLANETAS.map(p => ({ x:p.ua, y:p.pA })) }],
      xmin:0, xmax:32, ymin:0, ymax:180, xticks:8,
      xlabel:'Distancia media al Sol (UA)', ylabel:'años terrestres',
      xfmt:v => espDec(v,0), yfmt:v => espDec(v,0)
    });
  }, 60);

  return { unmount(){ if (raf2d) cancelAnimationFrame(raf2d); raf2d = 0; onda.parar(); if (E) E.dispose(); E = null; } };
}

route('/cn/sim/espacio',  (view, p) => espacioView(view, p && p.t === 'espectro' ? 'espectro' : 'solar'));
route('/cn/sim/espectro', (view) => espacioView(view, 'espectro'));
</script>
