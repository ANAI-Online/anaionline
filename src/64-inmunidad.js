<style>
/* ===== Microorganismos, inmunidad, vacunas y antibióticos (9.º EGB · BGU U6) — CSS propio, prefijo inm- ===== */
.inm-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.inm-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.inm-nav button:hover{border-color:var(--anat,var(--accent))}
.inm-nav button:focus-visible,.inm-seg button:focus-visible,.inm-step:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.inm-nav button[aria-current="true"]{background:var(--anat,var(--accent));border-color:var(--anat,var(--accent));color:#fff}
.inm-stage{height:460px;min-height:460px;align-self:start}
.inm-stage .inm-escala{position:absolute;left:12px;top:12px;z-index:3;background:color-mix(in srgb,var(--bg-2) 86%,transparent);border:1px solid var(--line);border-radius:8px;padding:5px 9px;font:600 .72rem/1.2 "IBM Plex Mono",monospace;color:var(--ink-2);display:flex;flex-direction:column;gap:3px;pointer-events:none}
.inm-stage .inm-escala i{display:block;height:4px;background:var(--ink-2);border-radius:2px}
.inm-seg{display:flex;flex-wrap:wrap;gap:4px}
.inm-seg button{flex:1 1 auto;min-width:64px;border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:9px;padding:6px 8px;font:600 .78rem/1.15 "IBM Plex Sans",sans-serif;cursor:pointer}
.inm-seg button[aria-pressed="true"]{background:color-mix(in srgb,var(--anat,var(--accent)) 18%,var(--bg-2));border-color:var(--anat,var(--accent));color:var(--ink)}
.inm-grp{display:flex;flex-direction:column;gap:5px}
.inm-grp>.inm-lab{font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);font-weight:600}
.inm-parts{display:flex;flex-direction:column;gap:4px}
.inm-parts button{display:flex;gap:8px;align-items:center;text-align:left;border:1px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:9px;padding:6px 9px;font:500 .82rem/1.2 "IBM Plex Sans",sans-serif;cursor:pointer}
.inm-parts button[aria-pressed="true"]{border-color:var(--accent);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--accent) 25%,transparent)}
.inm-parts button i{width:12px;height:12px;border-radius:3px;flex:0 0 auto;border:1px solid rgba(0,0,0,.25)}
.inm-parts small{margin-left:auto;color:var(--ink-3);font-size:.68rem}
.inm-cv{width:100%;display:block;border:1px solid var(--line);border-radius:12px;background:#F7E3DA}
.inm-chart{position:relative}
.inm-chart canvas{width:100%;height:260px;display:block}
.inm-kv{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:.82rem;margin:0}
.inm-kv dt{color:var(--ink-3)}
.inm-kv dd{margin:0;font-family:"IBM Plex Mono",monospace;font-variant-numeric:tabular-nums;color:var(--ink);font-weight:600}
.inm-lg{display:flex;flex-wrap:wrap;gap:10px;font-size:.76rem;color:var(--ink-2);align-items:center}
.inm-lg span{display:inline-flex;align-items:center;gap:5px}
.inm-lg i{width:16px;height:4px;border-radius:2px;display:inline-block;font-style:normal}
.inm-lg svg{flex:0 0 auto}
.inm-sl{display:grid;grid-template-columns:150px 1fr 70px;gap:10px;align-items:center}
.inm-sl label{font-size:.82rem;color:var(--ink-2)}
.inm-sl input[type=range]{width:100%}
.inm-sl output{font-family:"IBM Plex Mono",monospace;font-size:.82rem;color:var(--ink);text-align:right;font-weight:600}
.inm-fase{margin-top:8px;background:var(--bg-3);color:var(--ink);border:1px solid var(--line);border-radius:10px;padding:7px 11px;font:600 .84rem/1.3 "IBM Plex Sans",sans-serif}
.inm-steps{display:flex;flex-wrap:wrap;gap:5px}
.inm-step{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:8px;padding:5px 9px;font:600 .76rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.inm-step[aria-current="true"]{background:var(--anat,var(--accent));border-color:var(--anat,var(--accent));color:#fff}
.inm-vac{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.inm-vac button{display:flex;flex-direction:column;align-items:center;gap:4px;border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:12px;padding:9px 6px;cursor:pointer;font:600 .8rem/1.2 "IBM Plex Sans",sans-serif;text-align:center}
.inm-vac button[aria-pressed="true"]{border-color:var(--anat,var(--accent));box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--anat,var(--accent)) 24%,transparent)}
.inm-vac svg{width:64px;height:64px}
.inm-mito{border:1px solid var(--line);border-left:4px solid var(--bad);border-radius:12px;padding:11px 13px;background:var(--bg-2);display:flex;flex-direction:column;gap:7px}
.inm-mito h4{margin:0;font-size:.95rem;color:var(--bad)}
.inm-mito .inm-ok{border-left:3px solid var(--ok);padding-left:9px;font-size:.88rem}
.inm-mito .inm-ok b{color:var(--ok)}
.inm-bars{display:flex;flex-direction:column;gap:5px}
.inm-bar{display:grid;grid-template-columns:minmax(120px,1.2fr) 3fr 64px;gap:8px;align-items:center;font-size:.8rem}
.inm-bar .tr{height:14px;background:var(--bg-3);border:1px solid var(--line);border-radius:4px;overflow:hidden}
.inm-bar .tr i{display:block;height:100%}
.inm-bar .n{font-family:"IBM Plex Mono",monospace;font-size:.74rem;text-align:right;color:var(--ink-2)}
.inm-runs{display:flex;flex-wrap:wrap;gap:6px;font-size:.72rem;font-family:"IBM Plex Mono",monospace}
.inm-runs span{border:1px solid var(--line);border-radius:999px;padding:2px 9px;background:var(--bg-3);color:var(--ink-2)}
.inm-estado{font-weight:700;font-size:.95rem}
.inm-two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.inm-tl{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.inm-tl>div{display:grid;grid-template-columns:92px 1fr;gap:10px;padding:8px 11px;border-bottom:1px solid var(--line);font-size:.84rem}
.inm-tl>div:last-child{border-bottom:0}
.inm-wrap{white-space:normal;max-width:100%;height:auto;text-align:left}
.inm-tl b.y{font-family:"IBM Plex Mono",monospace;font-size:.78rem;color:var(--ink-3);text-align:right}
@media(max-width:820px){.inm-vac{grid-template-columns:repeat(2,1fr)}.inm-two{grid-template-columns:1fr}.inm-sl{grid-template-columns:1fr;gap:2px}.inm-sl output{text-align:left}.inm-stage{height:340px;min-height:340px}}
</style>
<script>
/* =====================================================================
   MICROORGANISMOS, INMUNIDAD, VACUNAS Y ANTIBIÓTICOS
   Ciencias Naturales 9.º EGB · "Sistemas humanos, reproducción, inmunidad y salud"
   Biología BGU · Unidad 6 "Anatomía y fisiología humana"
   Ruta: #/explorar/inmunidad · Actividad: reto-inmunidad
   Todo lo nuevo de este archivo lleva el prefijo inm- / inm / INM_.
   ===================================================================== */
try { if (typeof BIO === 'object' && BIO && BIO.activities && !BIO.activities['reto-inmunidad'])
  BIO.activities['reto-inmunidad'] = { t:'Reto: inmunidad y vacunas', unidad:6, peso:0, xp:150 };
} catch(e){ console.warn('inm activities', e); }
try { if (typeof ACT_HREF === 'object' && ACT_HREF) ACT_HREF['reto-inmunidad'] = '#/explorar/inmunidad'; } catch(e){}

/* ------------------------------------------------------------- formato */
const inmN = (v, d) => (typeof v === 'number' && isFinite(v) ? v : 0).toFixed(d === undefined ? 1 : d).replace('.', ',');
const inmMil = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const inmPct = (v, d) => inmN(v*100, d === undefined ? 0 : d) + ' %';
/* número grande legible: 3,2 millones · 45.000 */
function inmGrande(v){
  if (v >= 1e9) return inmN(v/1e9, 1) + ' mil millones';
  if (v >= 1e6) return inmN(v/1e6, 1) + ' millones';
  return inmMil(v);
}
const inmQuieto = () => !((typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion));
const inmCol = (v, fb) => { try { return cssVar(v) || fb; } catch(e){ return fb; } };
const inmNota = (cls, titulo, txt) => h('div',{class:'notice '+cls},
  h('span',{}, h('b',{}, titulo+' '), /<[a-z/]/i.test(txt) ? h('span',{html:txt}) : txt));

/* azar reproducible */
function inmRng(seed){
  let a = (seed >>> 0) || 1;
  return function(){ a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const inmSemilla = () => (Math.floor(Math.random()*1e9) + 11) >>> 0;
function inmPoisson(l, R){ const L = Math.exp(-l); let k = 0, p = 1; do { k++; p *= R(); } while (p > L); return k-1; }
function inmBinom(n, p, R){
  if (n <= 0 || p <= 0) return 0; if (p >= 1) return n;
  if (n < 40){ let k = 0; for (let i=0;i<n;i++) if (R() < p) k++; return k; }
  let g = 0; for (let i=0;i<6;i++) g += R(); g = (g-3)*Math.SQRT2;
  return Math.max(0, Math.min(n, Math.round(n*p + Math.sqrt(n*p*(1-p))*g)));
}

/* selector accesible (botones con aria-pressed) */
function inmSeg(label, ops, valor, onPick){
  const seg = h('div',{class:'inm-seg',role:'group','aria-label':label});
  const btns = {};
  ops.forEach(o => {
    const b = h('button',{ type:'button', 'aria-pressed':String(o.v===valor()), title:o.t||o.n,
      onclick:()=>{ onPick(o.v); Object.entries(btns).forEach(([k,e]) => e.setAttribute('aria-pressed', String(k===String(o.v)))); } }, o.n);
    btns[o.v] = b; seg.append(b);
  });
  return h('div',{class:'inm-grp'}, h('span',{class:'inm-lab'}, label), seg);
}
/* deslizador con etiqueta y salida legible */
function inmSlider(id, label, min, max, step, val, fmt, onInput){
  const out = h('output',{for:id}, fmt(val));
  const inp = h('input',{type:'range', id, min, max, step, value:val, 'aria-label':label,
    oninput:e => { const v = parseFloat(e.target.value); out.textContent = fmt(v); inp.setAttribute('aria-valuetext', fmt(v)); onInput(v); }});
  inp.setAttribute('aria-valuetext', fmt(val));
  return { el:h('div',{class:'inm-sl'}, h('label',{for:id}, label), inp, out), inp, out,
    set(v){ inp.value = v; out.textContent = fmt(v); inp.setAttribute('aria-valuetext', fmt(v)); } };
}

/* =====================================================================
   1 · BACTERIA Y VIRUS EN 3D
   Escala: 1 unidad = 0,5 µm. Bacilo de 2 µm × 1 µm (como E. coli) y
   virus con envoltura de 100 nm (como el de la gripe). Flagelo de 20 nm
   de grosor y unos 3 µm de largo.
   ===================================================================== */
const INM_PARTES = {
  pared:     { org:'bacteria', n:'Pared celular', c:'#C9A66B',
    d:'Malla rígida de peptidoglucano (azúcares unidos por pequeños péptidos) que rodea la membrana. Da forma a la bacteria y evita que reviente por la presión del agua que entra.',
    ab:'Blanco de la penicilina, la amoxicilina y las cefalosporinas: impiden que la bacteria termine de construir la malla. Al crecer, la pared se rompe y la bacteria revienta. Nuestras células no tienen peptidoglucano, por eso a nosotros no nos afecta.' },
  membrana:  { org:'bacteria', n:'Membrana plasmática', c:'#E08A6A',
    d:'Bicapa de lípidos con proteínas, como la de tus células. Controla lo que entra y sale, y en ella la bacteria obtiene energía (no tiene mitocondrias).',
    ab:'Algunos antibióticos de uso restringido, como la colistina, la dañan en ciertas bacterias. Se reservan para casos graves porque son más tóxicos.' },
  adn:       { org:'bacteria', n:'ADN circular (nucleoide)', c:'#3A63C8',
    d:'Un solo cromosoma cerrado en círculo, plegado en una zona llamada nucleoide. No hay núcleo ni membrana nuclear: por eso la bacteria es una célula procariota.',
    ab:'Blanco del ciprofloxacino y otras quinolonas: bloquean una enzima bacteriana (la ADN girasa) que desenrolla el ADN para copiarlo. Nuestra versión de esa enzima es diferente.' },
  plasmido:  { org:'bacteria', n:'Plásmido', c:'#2E9E8F',
    d:'Pequeño anillo extra de ADN. No es imprescindible para vivir, pero puede llevar genes útiles, como los de resistencia a antibióticos.',
    ab:'No es un blanco: es un problema. Las bacterias pueden pasarse plásmidos entre sí, incluso entre especies distintas (transferencia horizontal). Así se difunde la resistencia.' },
  ribosomas: { org:'bacteria', n:'Ribosomas 70S', c:'#7A48B0',
    d:'Miles de pequeñas "fábricas" que leen el ARN mensajero y arman proteínas. Los de las bacterias (70S) son más pequeños y distintos de los nuestros (80S).',
    ab:'Blanco de la azitromicina, la tetraciclina y la gentamicina: se pegan al ribosoma 70S y frenan la fabricación de proteínas. Como nuestros ribosomas son 80S, casi no los afectan.' },
  flagelo:   { org:'bacteria', n:'Flagelo', c:'#8C6A3F',
    d:'Filamento helicoidal de unos 20 nm de grosor que gira como una hélice gracias a un motor en la base, impulsado por iones que atraviesan la membrana.',
    ab:'No hay antibióticos comunes que lo ataquen, pero el sistema inmune reconoce su proteína (flagelina) como señal de alarma.' },
  envoltura: { org:'virus', n:'Envoltura lipídica', c:'#E4B94E',
    d:'Capa de lípidos que el virus "roba" de la membrana de la última célula que infectó al salir de ella. No todos los virus tienen envoltura.',
    ab:'Ningún antibiótico actúa aquí. El jabón sí la destruye: por eso lavarse las manos inactiva virus como el de la gripe.' },
  espiculas: { org:'virus', n:'Espículas (glucoproteínas)', c:'#D8452F',
    d:'Proteínas que sobresalen de la envoltura y encajan en receptores de la célula que el virus va a infectar, como una llave en una cerradura.',
    ab:'Son el blanco principal de los anticuerpos y de muchas vacunas: si un anticuerpo tapa la espícula, el virus ya no puede entrar a la célula.' },
  capside:   { org:'virus', n:'Cápside', c:'#4F9ACB',
    d:'Cubierta de proteínas repetidas que protege el material genético. Su forma varía según el virus: icosaédrica, helicoidal o más compleja.',
    ab:'No es una célula: no tiene pared, ni ribosomas, ni metabolismo propio. Un antibiótico no encuentra aquí nada que bloquear.' },
  genoma:    { org:'virus', n:'Material genético (ARN o ADN)', c:'#8E5BD0',
    d:'Las instrucciones para fabricar más virus. Puede ser ADN o ARN. El virus no puede leerlas solo: necesita los ribosomas y la energía de la célula que infecta.',
    ab:'Algunos antivirales, como los que se usan contra el VIH o la hepatitis C, bloquean las enzimas que copian este material. Son específicos para cada virus y no son antibióticos.' }
};
const INM_ANTIB = [
  { id:'penicilina',  n:'Amoxicilina (familia de la penicilina)', blanco:'pared' },
  { id:'azitro',      n:'Azitromicina', blanco:'ribosomas' },
  { id:'cipro',       n:'Ciprofloxacino', blanco:'adn' }
];

function inmCol3(hex){ const c = new THREE.Color(hex); return c.convertSRGBToLinear ? c.convertSRGBToLinear() : c; }

function inmOscuro(){
  const c = (inmCol('--bg', '#ffffff') || '#ffffff').trim(), m = c.match(/^#([0-9a-f]{6})$/i);
  if (!m) return false; const n = parseInt(m[1], 16);
  return ((n>>16&255)*0.3 + (n>>8&255)*0.59 + (n&255)*0.11) < 90;
}
/* contexto a escala (1 unidad = 0,5 µm): líquido intersticial con partículas,
   fibras de colágeno, un capilar de 8 µm con glóbulos rojos de 7,5 µm y el
   borde de un macrófago de ~20 µm que extiende pseudópodos. Nada de esto es
   seleccionable: solo da contexto. */
function inmContexto(E, osc, low){
  const S = E.scene, R = inmRng(4242), fondo = osc ? '#1F1418' : '#F1E2DB';
  S.fog = new THREE.Fog(inmCol3(fondo), 12, 40);
  const g = new THREE.SphereGeometry(60, 32, 16), col = [], pos = g.attributes.position;
  const a = new THREE.Color(osc ? '#2A1A20' : '#F7ECE6'), b = new THREE.Color(osc ? '#140C10' : '#E2C7BE'), c = new THREE.Color();
  for (let i=0;i<pos.count;i++){ const y = pos.getY(i)/60; c.copy(a).lerp(b, clamp(0.5 - y*0.8, 0, 1)); if (c.convertSRGBToLinear) c.convertSRGBToLinear(); col.push(c.r, c.g, c.b); }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  S.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors:true, side:THREE.BackSide, depthWrite:false, fog:false, toneMapped:false })));
  const grupo = new THREE.Group(); S.add(grupo);
  /* capilar sanguíneo (pared translúcida de endotelio) */
  const cap = new THREE.Group(); cap.position.set(1, 4.2, -17); cap.rotation.set(0.05, 0.18, 0.04); grupo.add(cap);
  const pared = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 70, low ? 36 : 56, 1, true),
    Kit.tissue({ color:inmCol3('#D98E86'), tex:'tissue', rep:[10, 3], bump:0.03, transparent:true, opacity:0.42, side:THREE.DoubleSide, depthWrite:false, coat:0.6, env:1.4 }));
  pared.rotation.z = Math.PI/2; pared.renderOrder = 1; cap.add(pared);
  const nuc = new THREE.SphereGeometry(1, 16, 10), mNuc = Kit.tissue({ color:inmCol3('#B9706C'), rough:0.5, transparent:true, opacity:0.6, depthWrite:false });
  for (let i=0;i<7;i++){ const ang = -0.5 + R()*1.4, px = -26 + i*8.5 + R()*3;
    const m = new THREE.Mesh(nuc, mNuc); m.scale.set(2.2, 0.9, 0.35); m.position.set(px, Math.sin(ang)*7.85, Math.cos(ang)*7.85); m.rotation.x = -ang; cap.add(m); }
  /* glóbulos rojos: disco bicóncavo de 7,5 µm (perfil de Evans y Fung) */
  const Rr = 3.75, perfil = [];
  for (let i=0;i<=16;i++){ const u = 1 - i/16, r = Rr*u, h = 0.5*Rr*0.52*Math.sqrt(Math.max(0, 1 - u*u))*(0.207 + 2.003*u*u - 1.123*u*u*u*u); perfil.push(new THREE.Vector2(Math.max(0.0001, r), h)); }
  for (let i=15;i>=0;i--){ const p = perfil[i]; perfil.push(new THREE.Vector2(p.x, -p.y)); }
  perfil.reverse();
  const gR = new THREE.LatheGeometry(perfil, low ? 28 : 44), mR = Kit.tissue({ color:inmCol3('#C23B34'), rough:0.42, coat:0.5 });
  [[-15, 1, 0.3, 1.2], [-4, -1.2, 0.9, 0.5], [7, 0.8, -0.6, 1.4], [18, -0.5, 0.4, 0.9]].forEach(([px, py, rz, ry]) => {
    const m = new THREE.Mesh(gR, mR); m.position.set(px, py, 0); m.rotation.set(Math.PI/2 + rz*0.4, ry, rz); cap.add(m); });
  /* fibras de colágeno de la matriz extracelular */
  const mCol = Kit.tissue({ color:inmCol3(osc ? '#9C8478' : '#E3CDBE'), rough:0.7, coat:0.15 });
  const fibras = [[-3.6, 1.2, -6.5, 0.5], [2.6, -3.4, -8.5, -0.3], [-1.0, 4.6, -10, 0.2]];
  fibras.forEach(([y0, y1, z, tw], k) => {
    for (let hh=0; hh<3; hh++){
      const pts = [];
      for (let i=0;i<=40;i++){ const t = i/40, xx = -16 + t*32, base = y0 + (y1 - y0)*t + Math.sin(t*3 + k)*0.6, ph = t*26 + hh*2.094;
        pts.push(new THREE.Vector3(xx, base + Math.cos(ph)*0.07 + Math.sin(t*9 + k)*0.25, z + Math.sin(t*2 + k)*0.8 + Math.sin(ph)*0.07)); }
      grupo.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), low ? 80 : 140, 0.045, 5, false), mCol));
    }
  });
  /* macrófago: solo entra al cuadro una parte (mide unos 20 µm) */
  const macro = new THREE.Group(); macro.position.set(-8.5, -11.2, -6.5); grupo.add(macro);
  const mMac = Kit.tissue({ color:inmCol3(osc ? '#C9B79C' : '#E8D6BD'), tex:'tissue', rep:[2, 2], bump:0.02, rough:0.45, coat:0.55 });
  const cuerpo = new THREE.Mesh(Kit.sculpt({ radii:[9, 8.2, 8], disp:(p) => 0.7*Kit.fbm(p.x*0.16, p.y*0.16, p.z*0.16, 3) + 0.12*Kit.fbm(p.x*0.6, p.y*0.6, p.z*0.6, 2) }), mMac);
  macro.add(cuerpo);
  const pseudo = [
    [[-1.5, 7.4, 1.5], [1.2, 8.8, 3.2], [4.4, 9.4, 4.4], [6.5, 9.7, 5.2]],
    [[2.5, 7.0, 1.0], [4.4, 8.1, 2.6], [6.6, 8.3, 3.8], [7.8, 8.0, 4.4]],
    [[-4.0, 6.8, 2.8], [-3.2, 9.0, 4.2], [-2.0, 10.4, 4.6]]
  ];
  const fin = [];
  pseudo.forEach((p, k) => { const gP = Kit.taper(p.map(q => new THREE.Vector3(...q)), 1.4 - k*0.2, 0.28, { bumpy:0.12, bf:5, seed:k });
    macro.add(new THREE.Mesh(gP, mMac)); fin.push(new THREE.Vector3(...p[p.length - 1]).add(macro.position)); });
  /* partículas del plasma y del líquido intersticial */
  const n = low ? 320 : 700, P = new Float32Array(n*3);
  for (let i=0;i<n;i++){ P[i*3] = -9 + R()*20; P[i*3+1] = -5 + R()*10; P[i*3+2] = -9 + R()*11; }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(P, 3));
  const polvo = new THREE.Points(pg, new THREE.PointsMaterial({ color: osc ? 0xE9C9BE : 0xB88A7E, size:0.045, transparent:true, opacity: osc ? 0.55 : 0.65, depthWrite:false }));
  grupo.add(polvo);
  cap.updateMatrixWorld(true);
  return { polvo, pseudo:fin[0], capilar:new THREE.Vector3(0.8, -3.6, 7.1).applyMatrix4(cap.matrixWorld) };
}
/* anticuerpo IgG en forma de Y: cadenas pesadas (oscuras) y ligeras (claras). Brazos hacia −y */
function inmAnticuerpoGeo(){
  const pesada = [], ligera = [];
  const seg = (arr, a, b, r) => { const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), L = A.distanceTo(B);
    const c = new THREE.CylinderGeometry(r, r, L, 8, 1); c.translate(0, L/2, 0);
    c.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), B.clone().sub(A).normalize())));
    c.translate(A.x, A.y, A.z); arr.push(c);
    [A, B].forEach(P => { const s = new THREE.SphereGeometry(r, 8, 6); s.translate(P.x, P.y, P.z); arr.push(s); }); };
  seg(pesada, [0, 0, 0], [0, 0.15, 0], 0.028);
  [-1, 1].forEach(sg => { seg(pesada, [0, 0, 0], [sg*0.075, -0.085, 0], 0.024); seg(ligera, [sg*0.075, -0.085, 0.01], [sg*0.135, -0.155, 0.01], 0.021); seg(pesada, [sg*0.075, -0.085, -0.01], [sg*0.13, -0.15, -0.01], 0.018); });
  const P = Kit.merge(pesada), L = Kit.merge(ligera); P.scale(0.2, 0.2, 0.2); L.scale(0.2, 0.2, 0.2);  /* IgG ≈ 15 nm = 0,03 unidades */
  return { pesada:P, ligera:L };
}
function inmEscena(stage, onSel){
  const osc = inmOscuro();
  const E = new Engine3D(stage, {
    radius:10.8, phi:1.2, theta:0.22, minR:0.6, maxR:18, target:[-0.5,0,0], exposure:0.95, escala:{ unidad:'µm', porUnidad:0.5 },
    onSelect:(id) => { if (id && INM_PARTES[id]) onSel(id, 'modelo'); },
    aria:'Modelo 3D de una bacteria con forma de bacilo y, a su derecha, un virus con envoltura a la misma escala, en el líquido de un tejido junto a un capilar con glóbulos rojos y el borde de un macrófago. Arrastra para girar, rueda para acercar; las flechas del teclado también giran. Usa la lista de partes para elegir con el teclado.'
  });
  const low = E.low;
  /* escenarios angostos (móvil): alejar un poco la cámara para que quepan bacteria y virus */
  const asp = (stage.clientWidth || 600)/(stage.clientHeight || 460);
  if (asp < 1.45){ E.opts.radius *= Math.min(1.45, 1.45/asp); E.sph.r = E.goal.r = E.opts.radius; }
  const ctx = inmContexto(E, osc, low);
  const tr = (hex, op, extra) => mat(inmCol3(hex), Object.assign({ transparent:true, opacity:op, depthWrite:false, side:THREE.DoubleSide, roughness:0.45, clearcoat:0.4 }, extra||{}));
  const R = inmRng(20260921);
  /* --- cápsula (bacilo) por torneado: eje a lo largo de x --- */
  function capsula(r, L, seg){
    const pts = [];
    for (let i=0;i<=12;i++){ const a = -Math.PI/2 + (i/12)*(Math.PI/2); pts.push(new THREE.Vector2(Math.max(0.0001, r*Math.cos(a)), -L + r*Math.sin(a))); }
    for (let i=0;i<=12;i++){ const a = (i/12)*(Math.PI/2); pts.push(new THREE.Vector2(Math.max(0.0001, r*Math.cos(a)), L + r*Math.sin(a))); }
    const g = new THREE.LatheGeometry(pts, seg || 40); g.rotateZ(-Math.PI/2); return g;
  }
  const mPared = Kit.tissue({ color:inmCol3(INM_PARTES.pared.c), tex:'granular', rep:[6, 2], bump:0.012, transparent:true, opacity:0.34, depthWrite:false, side:THREE.DoubleSide, rough:0.5, coat:0.6 });
  const pared = new THREE.Mesh(capsula(0.5, 1.5, low ? 40 : 64), mPared);
  const membrana = new THREE.Mesh(capsula(0.44, 1.5, low ? 40 : 56), tr(INM_PARTES.membrana.c, 0.40));
  const citoplasma = new THREE.Mesh(capsula(0.43, 1.5), tr('#F5E7D8', 0.14));
  /* nucleoide: un cromosoma cerrado, enrollado en el centro */
  const cpts = [];
  for (let i=0;i<64;i++){ const s = i/64*Math.PI*2;
    cpts.push(new THREE.Vector3(1.05*Math.sin(s) + 0.22*Math.sin(7*s), 0.20*Math.sin(5*s+1) + 0.09*Math.cos(11*s), 0.20*Math.cos(3*s) + 0.09*Math.sin(9*s))); }
  const adn = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cpts, true), low ? 320 : 520, 0.016, 5, true), mat(inmCol3(INM_PARTES.adn.c), { roughness:0.5 }));
  const plasmido = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.012, 6, 32), mat(inmCol3(INM_PARTES.plasmido.c), { roughness:0.5 }));
  plasmido.position.set(1.42, 0.14, 0.12); plasmido.rotation.set(0.6, 0.9, 0);
  /* ribosomas: unas 160 esferas de ~22 nm fusionadas en una sola malla */
  const rgs = [];
  for (let i=0;i<160;i++){
    let x, y, z; do { x = (R()*2-1)*1.8; y = (R()*2-1)*0.36; z = (R()*2-1)*0.36; } while (y*y+z*z > 0.13 || (Math.abs(x) > 1.5 && (Math.abs(x)-1.5)**2 + y*y + z*z > 0.13));
    const g = new THREE.SphereGeometry(0.024, 7, 5); g.translate(x, y, z); rgs.push(g);
  }
  const ribosomas = new THREE.Mesh(Kit.merge(rgs), mat(inmCol3(INM_PARTES.ribosomas.c), { roughness:0.6 }));
  /* flagelo helicoidal que sale del polo izquierdo, con gancho y motor */
  const fpts = [];
  for (let i=0;i<=120;i++){ const t = i/120; const amp = 0.20*Math.min(1, t*6);
    fpts.push(new THREE.Vector3(-1.98 - t*6.0, amp*Math.sin(t*6*Math.PI*2), amp*Math.cos(t*6*Math.PI*2))); }
  const flagelo = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(fpts), low ? 220 : 360, 0.02, 5, false), mat(inmCol3(INM_PARTES.flagelo.c), { roughness:0.5, clearcoat:0.3 }));
  const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.12, 14), mat(inmCol3('#6E5230'), { roughness:0.4, metalness:0.2 }));
  motor.rotation.z = Math.PI/2; motor.position.set(-1.96, 0, 0);
  /* pili (fimbrias): filamentos finos y cortos en la superficie (grosor exagerado para que se vean) */
  const pgs = [];
  for (let i=0;i<(low ? 60 : 110);i++){
    const u = R()*2 - 1, ang = R()*Math.PI*2, px = u*1.9;
    let nrm, base;
    if (Math.abs(px) <= 1.5){ nrm = new THREE.Vector3(0, Math.cos(ang), Math.sin(ang)); base = new THREE.Vector3(px, 0, 0).addScaledVector(nrm, 0.5); }
    else { const sg = Math.sign(px), th = R()*1.2; nrm = new THREE.Vector3(sg*Math.cos(th), Math.sin(th)*Math.cos(ang), Math.sin(th)*Math.sin(ang)); base = new THREE.Vector3(sg*1.5, 0, 0).addScaledVector(nrm, 0.5); }
    if (base.x < -1.85) continue;
    const L = 0.16 + R()*0.22, c = new THREE.CylinderGeometry(0.006, 0.009, L, 4, 1); c.translate(0, L/2, 0);
    c.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), nrm)));
    c.translate(base.x, base.y, base.z); pgs.push(c);
  }
  const pili = new THREE.Mesh(Kit.merge(pgs), mat(inmCol3('#D2B98A'), { roughness:0.6 }));
  E.scene.add(pili);

  /* --- virus con envoltura, 100 nm de diámetro --- */
  const VC = new THREE.Vector3(3.3, 0, 0.2);
  const envoltura = new THREE.Mesh(new THREE.SphereGeometry(0.07, 36, 24), Kit.tissue({ color:inmCol3(INM_PARTES.envoltura.c), tex:'tissue', rep:[3, 2], bump:0.004, transparent:true, opacity:0.45, depthWrite:false, rough:0.35, coat:0.7 }));
  /* cápside icosaédrica con capsómeros en relieve */
  const icoG = new THREE.IcosahedronGeometry(0.046, 0), capG = [icoG.clone()];
  const ico1 = new THREE.IcosahedronGeometry(0.047, 1), vp = ico1.attributes.position, vistos = new Set();
  for (let i=0;i<vp.count;i++){ const k = `${vp.getX(i).toFixed(4)},${vp.getY(i).toFixed(4)},${vp.getZ(i).toFixed(4)}`; if (vistos.has(k)) continue; vistos.add(k);
    const s = new THREE.SphereGeometry(0.0075, 6, 4); s.translate(vp.getX(i), vp.getY(i), vp.getZ(i)); capG.push(s); }
  const capside = new THREE.Mesh(Kit.merge(capG.map(g => g.index ? g.toNonIndexed() : g)), mat(inmCol3(INM_PARTES.capside.c), { flatShading:true, roughness:0.4, clearcoat:0.3 }));
  const gpts = []; for (let i=0;i<40;i++){ const s = i/40*Math.PI*2; gpts.push(new THREE.Vector3(0.028*Math.sin(s)+0.008*Math.sin(5*s), 0.02*Math.sin(3*s+0.5), 0.028*Math.cos(s)+0.008*Math.cos(4*s))); }
  const genoma = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(gpts, true), 160, 0.0035, 4, true), mat(inmCol3(INM_PARTES.genoma.c), { roughness:0.5 }));
  /* espículas: glucoproteínas triméricas (tallo y cabeza de tres lóbulos) */
  const sgs = [], up = new THREE.Vector3(0,1,0);
  for (let i=0;i<42;i++){ /* espiral de Fibonacci: reparto parejo */
    const yy = 1 - (i+0.5)/42*2, rr = Math.sqrt(1-yy*yy), th = i*2.39996;
    const dir = new THREE.Vector3(Math.cos(th)*rr, yy, Math.sin(th)*rr);
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir), m4 = new THREE.Matrix4().makeRotationFromQuaternion(q);
    const tallo = new THREE.CylinderGeometry(0.0028, 0.004, 0.022, 6); tallo.translate(0, 0.07+0.011, 0); tallo.applyMatrix4(m4); sgs.push(tallo);
    for (let k=0;k<3;k++){ const a = k*2.094 + i; const cabeza = new THREE.SphereGeometry(0.0058, 7, 5); cabeza.scale(1, 1.35, 1); cabeza.translate(Math.cos(a)*0.0042, 0.07+0.027, Math.sin(a)*0.0042); cabeza.applyMatrix4(m4); sgs.push(cabeza); }
  }
  const espiculas = new THREE.Mesh(Kit.merge(sgs), mat(inmCol3(INM_PARTES.espiculas.c), { roughness:0.45, clearcoat:0.3 }));
  const virus = [envoltura, capside, genoma, espiculas];
  virus.forEach(m => m.position.copy(VC));
  /* halo que ayuda a encontrar el virus a escala real */
  const hc = document.createElement('canvas'); hc.width = hc.height = 64; const hx = hc.getContext('2d');
  hx.strokeStyle = 'rgba(255,255,255,1)'; hx.lineWidth = 3; hx.beginPath(); hx.arc(32, 32, 26, 0, 6.2832); hx.stroke();
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map:new THREE.CanvasTexture(hc), color: osc ? 0xFFD27A : 0xC0392B, transparent:true, opacity:0.75, depthWrite:false, fog:false }));
  halo.scale.setScalar(0.42); halo.position.copy(VC); E.scene.add(halo);
  /* anticuerpos (solo en el modo ampliado): unos pegados a las espículas, otros libres */
  const AG = inmAnticuerpoGeo(), mH = mat(inmCol3('#2E6BD8'), { roughness:0.4, clearcoat:0.4 }), mL = mat(inmCol3('#9CC0F5'), { roughness:0.4, clearcoat:0.4 });
  const anticuerpos = new THREE.Group(); anticuerpos.visible = false; E.scene.add(anticuerpos);
  const abDir = [[0.3, 0.9, 0.3, 0], [-0.8, 0.4, 0.45, 0], [0.75, -0.35, 0.55, 0], [-0.2, -0.7, 0.7, 0], [0.9, 0.7, -0.2, 0.5], [-0.9, -0.6, -0.1, 0.7]];
  abDir.forEach(([dx, dy, dz, libre]) => { const g = new THREE.Group(); g.add(new THREE.Mesh(AG.pesada, mH), new THREE.Mesh(AG.ligera, mL));
    const d = new THREE.Vector3(dx, dy, dz).normalize(); g.userData = { d, libre };
    g.quaternion.setFromUnitVectors(up, d); if (libre) g.rotateZ(libre*1.5); anticuerpos.add(g); });
  const colocarAnticuerpos = k => anticuerpos.children.forEach(g => { g.scale.setScalar(k); g.position.copy(VC).addScaledVector(g.userData.d, (0.104 + 0.031 + g.userData.libre*0.05)*k); });

  E.addPart('pared', [pared], { passThrough:true });
  E.addPart('membrana', [membrana, citoplasma], { passThrough:true });
  E.addPart('adn', [adn]);
  E.addPart('plasmido', [plasmido]);
  E.addPart('ribosomas', [ribosomas]);
  E.addPart('flagelo', [flagelo, motor]);
  E.addPart('envoltura', [envoltura], { passThrough:true });
  E.addPart('espiculas', [espiculas]);
  E.addPart('capside', [capside]);
  E.addPart('genoma', [genoma]);
  E.addLabel('pared', 'Pared', [0.2, 0.62, 0]);
  E.addLabel('flagelo', 'Flagelo', [-5.2, 0.35, 0]);
  E.addLabel('adn', 'ADN circular', [-0.6, -0.25, 0.3]);
  E.addLabel('envoltura', 'Virus (100 nm)', [VC.x, 0.32, VC.z], [VC.x, VC.y + 0.1, VC.z]);
  /* las etiquetas del contexto van delante (el motor oculta las que quedan detrás del centro) y apuntan con una línea guía */
  E.addLabel('inm-ctx-mac', 'Macrófago (≈ 20 µm)', [-3.3, -2.3, 0.6], ctx.pseudo);
  E.addLabel('inm-ctx-cap', 'Capilar con glóbulos rojos', [3.2, 2.4, 0.2], ctx.capilar);
  const ctxLbl = ['inm-ctx-mac', 'inm-ctx-cap'].map(id => E.labels.get(id)).filter(Boolean);
  ctxLbl.forEach(l => { l.el.style.opacity = '.82'; l.el.tabIndex = -1; l.el.style.fontWeight = '500'; });

  let k = 1, t0 = 0;
  const setZoom = on => {
    k = on ? 10 : 1;
    virus.forEach(m => { m.scale.setScalar(k); m.position.copy(VC); });
    anticuerpos.visible = on; colocarAnticuerpos(k); halo.visible = !on;
    const lb = E.labels.get('envoltura'); if (lb){ lb.pos.set(VC.x, on ? 1.15 : 0.32, VC.z); lb.el.textContent = on ? 'Virus ampliado ×10 (fuera de escala)' : 'Virus (100 nm)'; E.setAnchor('envoltura', on ? null : [VC.x, VC.y + 0.1, VC.z]); }
    ctxLbl.forEach(l => { l.el.style.visibility = on ? 'hidden' : ''; });
    if (on) E.focus(VC.clone(), 4.6); else { E.resetView(); }
  };
  /* barra de escala coherente con la cámara (1 unidad = 0,5 µm) */
  let barra = null, ultW = 0;
  const OPC = [[0.1,'0,1 µm'],[0.2,'0,2 µm'],[0.5,'0,5 µm'],[1,'1 µm'],[2,'2 µm'],[5,'5 µm']];
  E.onFrame((t, dt) => {
    if (!barra) barra = stage.querySelector('.inm-escala');
    if (barra){
      const H = stage.clientHeight || 400, pxu = H/(2*E.sph.r*Math.tan(E.camera.fov*Math.PI/360));
      let op = OPC[0]; for (let j=OPC.length-1;j>=0;j--){ if (OPC[j][0]*2*pxu <= 150){ op = OPC[j]; break; } }
      const w = Math.round(op[0]*2*pxu);
      if (w !== ultW){ ultW = w; const i = barra.querySelector('i'), s = barra.querySelector('span'); if (i) i.style.width = w + 'px'; if (s && s.textContent !== op[1]) s.textContent = op[1]; }
    }
    if (inmQuieto()) return;
    flagelo.rotation.x += (dt||0.016)*7;           /* el flagelo gira como una hélice */
    t0 += dt||0.016;
    virus.forEach(m => { m.position.y = VC.y + Math.sin(t0*1.3)*0.01*k; m.rotation.y += (dt||0.016)*0.25; });
    if (anticuerpos.visible) anticuerpos.children.forEach((g, i) => { if (g.userData.libre) g.position.y += Math.sin(t0*1.1 + i)*0.0008*k; });
    halo.material.opacity = 0.45 + 0.35*Math.sin(t0*2.2);
    ctx.polvo.position.set(Math.sin(t0*0.08)*0.35, Math.cos(t0*0.11)*0.2, 0);
  });
  return {
    E, setZoom,
    antibiotico(id){ /* efecto visible del antibiótico sobre su blanco */
      const setOp = (mesh, op) => { mesh.material.opacity = op; mesh.material.transparent = true; mesh.material.needsUpdate = true; };
      setOp(pared, 0.34); ribosomas.material.color.copy(inmCol3(INM_PARTES.ribosomas.c)); adn.material.color.copy(inmCol3(INM_PARTES.adn.c));
      [ribosomas, adn].forEach(m => { if (m.material.userData) m.material.userData.c0 = null; });
      pili.visible = true;
      if (id === 'pared'){ setOp(pared, 0.07); pili.visible = false; }
      if (id === 'ribosomas'){ ribosomas.material.color.copy(inmCol3('#9A9A9A')); }
      if (id === 'adn'){ adn.material.color.copy(inmCol3('#9A9A9A')); }
    },
    dispose(){ try { E.dispose(); } catch(e){} }
  };
}

/* alternativa sin WebGL: el mismo esquema en 2D (SVG) */
function inmSvg2D(){
  const P = INM_PARTES;
  const R = inmRng(77);
  const rib = Array.from({length:40},()=>{ let px, py; do { px = 150 + R()*196; py = 98 + R()*64; } while (((px-248)/112)**2 + ((py-130)/34)**2 > 1); return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="2.6" fill="${P.ribosomas.c}" opacity=".85"/>`; }).join('');
  const pili = Array.from({length:26},(_,i)=>{ const a = i/26*Math.PI*2, px = 248 + Math.cos(a)*132, py = 130 + Math.sin(a)*52, qx = 248 + Math.cos(a)*146, qy = 130 + Math.sin(a)*60; return `<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${qx.toFixed(1)}" y2="${qy.toFixed(1)}" stroke="#B89C68" stroke-width="1.2" stroke-linecap="round"/>`; }).join('');
  const esp = Array.from({length:18},(_,i)=>{ const a = i/18*Math.PI*2; return `<line x1="${(550+40*Math.cos(a)).toFixed(1)}" y1="${(150+40*Math.sin(a)).toFixed(1)}" x2="${(550+52*Math.cos(a)).toFixed(1)}" y2="${(150+52*Math.sin(a)).toFixed(1)}" stroke="#B8352A" stroke-width="3" stroke-linecap="round"/><circle cx="${(550+55*Math.cos(a)).toFixed(1)}" cy="${(150+55*Math.sin(a)).toFixed(1)}" r="4.4" fill="url(#inm-s2e)"/>`; }).join('');
  return `<svg viewBox="0 0 640 260" role="img" aria-label="Esquema en 2D: bacilo de 2 micrómetros con pared, membrana, ADN circular, plásmido, ribosomas y flagelo; a su derecha, un virus de 100 nanómetros, apenas un punto a la misma escala, y un recuadro con el virus ampliado diez veces mostrando envoltura, espículas, cápside y material genético." style="width:100%;height:auto;display:block;border-radius:12px">
    <defs>
      <linearGradient id="inm-s2f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F9EEE7"/><stop offset="1" stop-color="#EBD3C8"/></linearGradient>
      <linearGradient id="inm-s2p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6CC98"/><stop offset=".5" stop-color="${P.pared.c}"/><stop offset="1" stop-color="#9C7B45"/></linearGradient>
      <radialGradient id="inm-s2c" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFF8F0"/><stop offset="1" stop-color="#F0D9C4"/></radialGradient>
      <radialGradient id="inm-s2v" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FBE7A0"/><stop offset="1" stop-color="${P.envoltura.c}"/></radialGradient>
      <radialGradient id="inm-s2e" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#F59A86"/><stop offset="1" stop-color="${P.espiculas.c}"/></radialGradient>
      <filter id="inm-s2s" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#5a3a2a" flood-opacity=".22"/></filter>
    </defs>
    <rect x="0" y="0" width="640" height="260" rx="12" fill="url(#inm-s2f)"/>
    ${Array.from({length:10},(_,i)=>`<path d="M${-20 + i*70} ${30 + (i%3)*70} q40 -12 80 0 t80 0" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`).join('')}
    <path d="M118 130 C 90 100, 70 160, 42 130 S -4 100, 10 130" fill="none" stroke="${P.flagelo.c}" stroke-width="3" stroke-linecap="round"/>
    ${pili}
    <rect x="118" y="80" width="260" height="100" rx="50" fill="url(#inm-s2p)" stroke="#8a6c3c" stroke-width="2" filter="url(#inm-s2s)"><title>${P.pared.n}</title></rect>
    <rect x="127" y="89" width="242" height="82" rx="41" fill="url(#inm-s2c)" stroke="${P.membrana.c}" stroke-width="3"><title>${P.membrana.n}</title></rect>
    ${rib}
    <path d="M170 130 C 190 100, 220 160, 250 125 S 300 100, 320 135 S 280 160, 240 150 S 180 160, 170 130 Z" fill="none" stroke="${P.adn.c}" stroke-width="3" stroke-linejoin="round"><title>${P.adn.n}</title></path>
    <circle cx="345" cy="112" r="8" fill="none" stroke="${P.plasmido.c}" stroke-width="3"><title>${P.plasmido.n}</title></circle>
    <rect x="160" y="96" width="120" height="8" rx="4" fill="#fff" opacity=".35"/>
    <text x="248" y="205" text-anchor="middle" font-size="13" fill="#333">Bacteria (bacilo) · 2 µm</text>
    <circle cx="412" cy="130" r="2.8" fill="${P.envoltura.c}" stroke="#8a6c3c"/>
    <circle cx="412" cy="130" r="9" fill="none" stroke="#C0392B" stroke-width="1.2" opacity=".6"/>
    <text x="412" y="116" text-anchor="middle" font-size="11" fill="#333">virus</text>
    <line x1="420" y1="134" x2="470" y2="150" stroke="#888" stroke-dasharray="3 3"/>
    <rect x="470" y="60" width="160" height="170" rx="12" fill="#fff" stroke="#c9b8ae" filter="url(#inm-s2s)"/>
    <text x="550" y="80" text-anchor="middle" font-size="11" fill="#333">Virus ampliado ×10</text>
    ${esp}
    <circle cx="550" cy="150" r="40" fill="url(#inm-s2v)" opacity=".85" stroke="#8a6c3c"/>
    <polygon points="550,122 574,136 574,164 550,178 526,164 526,136" fill="${P.capside.c}" stroke="#2E6E9C" stroke-width="1.2"/>
    <path d="M550,122 L550,150 L574,164 M550,150 L526,164" stroke="#2E6E9C" stroke-width="1" opacity=".6" fill="none"/>
    <path d="M536 150 C 543 135, 553 165, 560 146 S 566 160, 564 152" fill="none" stroke="${P.genoma.c}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="535" cy="128" rx="10" ry="5" fill="#fff" opacity=".35"/>
    <line x1="30" y1="240" x2="160" y2="240" stroke="#333" stroke-width="3"/><text x="95" y="232" text-anchor="middle" font-size="11" fill="#333">1 µm</text>
  </svg>`;
}

/* =====================================================================
   2 · RESPUESTA INMUNE (escena 2D por pasos) Y MEMORIA
   ===================================================================== */
const INM_PASOS = [
  { n:'Barreras', fase:'1 · Barreras: la piel intacta y las mucosas no dejan pasar a las bacterias.',
    t:'La primera defensa no es una célula: es una barrera. La piel está hecha de capas de células muertas muy unidas; las mucosas atrapan microbios en el moco; las lágrimas y la saliva tienen lisozima, una enzima que rompe la pared bacteriana; el ácido del estómago destruye casi todo lo que tragas.',
    n2:'La piel también es ligeramente ácida y está cubierta por microbiota: bacterias inofensivas que ocupan el espacio y los nutrientes que necesitaría un patógeno.',
    n3:'Las barreras son inespecíficas: actúan igual contra cualquier microbio. Cuando fallan, como en una quemadura extensa, el riesgo de infección se dispara aunque el resto del sistema inmune esté sano.' },
  { n:'Entrada', fase:'2 · Una herida abre la barrera: las bacterias entran al tejido y se multiplican.',
    t:'Basta un corte o un raspón. Las bacterias que estaban en la superficie entran al tejido, encuentran agua, calor y nutrientes, y empiezan a dividirse: una bacteria puede convertirse en millones en pocas horas.',
    n2:'Cada división toma, en buenas condiciones, de 20 minutos a unas horas. Por eso la respuesta tiene que empezar rápido.',
    n3:'Las células del tejido reconocen moléculas que solo tienen los microbios —como el peptidoglucano o la flagelina— mediante receptores de reconocimiento de patrones. Es la señal de alarma que pone en marcha la respuesta innata.' },
  { n:'Inflamación', fase:'3 · Inflamación: el capilar se dilata, llegan más sangre y más defensas. Rubor, calor, hinchazón y dolor.',
    t:'Los mastocitos del tejido liberan histamina y otras señales. Los capilares se ensanchan y se vuelven más permeables: llega más sangre (por eso la zona se pone roja y caliente), sale líquido (se hincha) y se estimulan los nervios (duele). Los neutrófilos salen del capilar y se dirigen hacia las bacterias.',
    n2:'La inflamación no es la enfermedad: es la respuesta del cuerpo. La fiebre funciona parecido a escala de todo el organismo: acelera las defensas y frena a muchos microbios.',
    n3:'Los neutrófilos cruzan la pared del capilar por diapédesis y siguen el rastro de señales químicas (quimiotaxis). Son los leucocitos más abundantes y viven pocos días: el pus es, en gran parte, neutrófilos muertos.' },
  { n:'Fagocitosis', fase:'4 · Respuesta innata: neutrófilos y macrófagos engullen y digieren a las bacterias (fagocitosis).',
    t:'Los fagocitos rodean a cada bacteria con su membrana, la encierran en una vesícula y la digieren con enzimas. Esta respuesta innata es rápida —empieza en minutos u horas— pero es igual para cualquier microbio y no deja memoria.',
    n2:'Si la infección es pequeña, la respuesta innata basta y ni te enteras. Si no, hace tiempo mientras se prepara la respuesta adaptativa.',
    n3:'Los macrófagos, además de comer, liberan citocinas que coordinan la inflamación y ayudan a activar a los linfocitos. La respuesta innata y la adaptativa no son compartimentos separados: se hablan todo el tiempo.' },
  { n:'Presentación', fase:'5 · Una célula dendrítica toma un trozo de la bacteria (antígeno) y viaja por la linfa hasta el ganglio.',
    t:'Las células dendríticas son las "mensajeras". Capturan fragmentos del microbio —los antígenos— y viajan por los vasos linfáticos hasta el ganglio más cercano. Allí se los muestran a los linfocitos, buscando al que tenga el receptor que encaja justo con ese antígeno.',
    n2:'Por eso se inflaman los ganglios del cuello cuando tienes una infección de garganta: dentro se está organizando la respuesta.',
    n3:'La célula dendrítica presenta el antígeno unido a moléculas MHC de su superficie. Solo el linfocito T cuyo receptor reconoce esa combinación exacta se activa: es la base de la especificidad.' },
  { n:'Respuesta adaptativa', fase:'6 · Adaptativa: los linfocitos B elegidos se multiplican y liberan anticuerpos; los linfocitos T coordinan y atacan células infectadas.',
    t:'El linfocito B que reconoce el antígeno, con ayuda de un linfocito T colaborador, se multiplica en miles de copias. Muchas se convierten en células plasmáticas que liberan anticuerpos: proteínas en forma de Y que se pegan al microbio, lo neutralizan y lo marcan para que los fagocitos lo eliminen. Los linfocitos T citotóxicos destruyen las células que ya fueron infectadas por un virus.',
    n2:'Esta respuesta tarda: la primera vez, entre una y dos semanas en alcanzar su máximo. Por eso te enfermas antes de curarte.',
    n3:'Cada linfocito nace con un receptor distinto, generado al azar por recombinación de segmentos génicos. El antígeno "selecciona" al linfocito que encaja y ese se multiplica (selección clonal): es selección natural a escala de células, dentro de ti.' },
  { n:'Memoria', fase:'7 · Memoria: la infección terminó, pero quedan linfocitos B y T de memoria que recuerdan ese antígeno.',
    t:'Cuando se acaba la infección, la mayoría de linfocitos activados muere, pero algunos quedan como células de memoria durante años. Si el mismo microbio vuelve, lo reconocen de inmediato: la respuesta es más rápida, más fuerte y muchas veces ni llegas a enfermarte. Es lo que se ve en la gráfica de abajo.',
    n2:'La memoria es específica: la que dejó el sarampión no protege contra la gripe. Y en algunos virus, como el de la gripe, el antígeno cambia cada año y la memoria vieja reconoce menos.',
    n3:'En la segunda respuesta dominan anticuerpos IgG de mayor afinidad, producto de la maduración de la afinidad en los centros germinales del ganglio. La primera respuesta empieza con IgM, de menor afinidad.' }
];

/* nivel de anticuerpos tras una exposición en t0 (días). sec = hay memoria */
function inmResp(t, t0, sec){
  const d = t - t0; if (d < 0) return 0;
  const lag = sec ? 2 : 6, up = sec ? 1.6 : 2.4, peak = sec ? 1000 : 100, dec = sec ? 90 : 30, base = sec ? 60 : 10;
  const tp = lag + up*3;
  if (d < tp) return peak/(1 + Math.exp(-(d - lag - up*1.5)/(up/2.2)));
  return base + (peak - base)*Math.exp(-(d - tp)/dec*Math.LN2);
}
/* serie completa: primera exposición el día 0 y segunda el día t2 */
function inmCurva(t2, dias){
  const pts = [];
  for (let t=0; t<=dias; t+=0.5) pts.push({ x:t, y: inmResp(t, 0, false) + inmResp(t, t2, true) });
  return pts;
}
/* primer día en que se supera un umbral a partir de t0 */
function inmCruce(fn, t0, umbral){ for (let t=t0; t<t0+60; t+=0.25) if (fn(t) >= umbral) return t - t0; return null; }

/* dibuja la escena de la respuesta inmune en un canvas 2D (800 × 400 lógicos) */
const INM_ESC = (() => {
  const R = inmRng(7331), C = { x:225, y:190 }, bac = [];
  for (let i=0;i<16;i++){ const a = R()*Math.PI*2, r = 14 + R()*58; bac.push({ x:C.x + Math.cos(a)*r, y:C.y + Math.sin(a)*r*0.7, a:R()*Math.PI, f:R()*6.28 }); }
  const fag = [0,1,2,3].map(j => ({ x0:90 + j*95, y0:335, x:C.x + (j-1.5)*42, y:C.y + 52 - (j%2)*12 }));
  const ruta = [[C.x+30,C.y+18],[330,205],[470,180],[590,215],[662,232]];
  return { C, bac, fag, ruta };
})();
function inmRuta(pts, u){
  const segs = []; let L = 0;
  for (let i=1;i<pts.length;i++){ const d = Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]); segs.push(d); L += d; }
  let s = clamp(u,0,1)*L;
  for (let i=0;i<segs.length;i++){ if (s <= segs[i]){ const k = s/segs[i]; return [pts[i][0]+(pts[i+1][0]-pts[i][0])*k, pts[i][1]+(pts[i+1][1]-pts[i][1])*k]; } s -= segs[i]; }
  return pts[pts.length-1];
}
/* fondo fijo de la escena (piel, dermis, capilar, vaso linfático y ganglio): se pinta una vez en caché */
const INM_FONDO = { cv:null, key:'' };
function inmFondoEscena(x, S){
  /* aire */
  const ai = x.createLinearGradient(0, 0, 0, 70); ai.addColorStop(0, '#E4F0F7'); ai.addColorStop(1, '#F1F7FA');
  x.fillStyle = ai; x.fillRect(0, 0, 800, 70);
  /* dermis */
  const de = x.createLinearGradient(0, 100, 0, 400); de.addColorStop(0, '#F8E6DC'); de.addColorStop(1, '#F1D6CA');
  x.fillStyle = de; x.fillRect(0, 100, 800, 300);
  const R = inmRng(515);
  /* fibras de colágeno onduladas */
  x.lineCap = 'round';
  for (let i=0;i<46;i++){ const y0 = 112 + R()*270, x0 = R()*800, L = 60 + R()*120, a = (R() - 0.5)*0.5;
    x.strokeStyle = R() < 0.5 ? 'rgba(226,186,170,.55)' : 'rgba(255,245,238,.7)'; x.lineWidth = 1.4 + R()*1.8;
    x.beginPath(); for (let k=0;k<=12;k++){ const t = k/12, px = x0 + Math.cos(a)*L*t, py = y0 + Math.sin(a)*L*t + Math.sin(t*9 + i)*3; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
  /* fibroblastos (células fusiformes del tejido) */
  for (let i=0;i<9;i++){ const px = 30 + R()*740, py = 130 + R()*170, a = (R() - 0.5)*0.6;
    x.save(); x.translate(px, py); x.rotate(a); x.fillStyle = 'rgba(214,160,150,.45)'; x.beginPath(); x.moveTo(-22, 0); x.quadraticCurveTo(0, -6, 22, 0); x.quadraticCurveTo(0, 6, -22, 0); x.fill();
    x.fillStyle = 'rgba(160,95,95,.5)'; x.beginPath(); x.ellipse(0, 0, 6, 2.6, 0, 0, 6.2832); x.fill(); x.restore(); }
  /* epidermis: capa córnea y queratinocitos */
  const ep = x.createLinearGradient(0, 70, 0, 100); ep.addColorStop(0, '#EBCDAE'); ep.addColorStop(1, '#D8A988');
  x.fillStyle = ep; x.fillRect(0, 70, 800, 30);
  x.fillStyle = 'rgba(245,225,200,.9)'; x.fillRect(0, 70, 800, 5);
  x.strokeStyle = 'rgba(150,100,70,.28)'; x.lineWidth = 1;
  for (let c=0;c<40;c++){ x.beginPath(); x.moveTo(c*20 + (c%2)*6, 71); x.lineTo(c*20 + 14, 74); x.stroke(); }
  for (let r=0;r<2;r++) for (let c=0;c<26;c++){ const cx = c*32 + (r ? 16 : 0), cy = 76 + r*12;
    x.fillStyle = r ? 'rgba(200,140,110,.25)' : 'rgba(230,185,150,.3)'; inmRRect(x, cx + 1, cy, 30, 11, 4); x.fill(); x.stroke();
    x.fillStyle = 'rgba(140,85,65,.35)'; x.beginPath(); x.ellipse(cx + 16, cy + 5.5, 3.5, 2.3, 0, 0, 6.2832); x.fill(); }
  x.fillStyle = 'rgba(150,90,70,.5)'; x.fillRect(0, 99, 800, 1.5);
  /* vaso linfático con válvulas */
  x.lineJoin = 'round';
  x.strokeStyle = '#D8CC9C'; x.lineWidth = 19; x.beginPath(); S.ruta.forEach((p,i) => i ? x.lineTo(p[0],p[1]) : x.moveTo(p[0],p[1])); x.stroke();
  x.strokeStyle = '#F6EFD2'; x.lineWidth = 13; x.stroke();
  x.strokeStyle = 'rgba(160,135,70,.55)'; x.lineWidth = 1.5;
  for (let i=1;i<S.ruta.length-1;i++){ const [ax, ay] = S.ruta[i], [bx, by] = S.ruta[i+1], mx = (ax + bx)/2, my = (ay + by)/2, an = Math.atan2(by - ay, bx - ax);
    x.save(); x.translate(mx, my); x.rotate(an); x.beginPath(); x.moveTo(-4, -6); x.lineTo(3, 0); x.lineTo(-4, 6); x.stroke(); x.restore(); }
  /* ganglio linfático: cápsula, folículos de la corteza y médula */
  x.save();
  const gg = x.createRadialGradient(675, 205, 10, 690, 225, 115); gg.addColorStop(0, '#F8F0DA'); gg.addColorStop(1, '#E9D7AE');
  x.fillStyle = gg; x.strokeStyle = '#B08E4E'; x.lineWidth = 3; x.beginPath(); x.ellipse(690, 225, 88, 112, 0, 0, 6.2832); x.fill(); x.stroke();
  x.beginPath(); x.ellipse(690, 225, 84, 108, 0, 0, 6.2832); x.clip();
  for (let i=0;i<9;i++){ const a = -Math.PI*0.95 + i*(Math.PI*1.5/8), fx = 690 + Math.cos(a)*64, fy = 225 + Math.sin(a)*86;
    const fg = x.createRadialGradient(fx, fy, 2, fx, fy, 22); fg.addColorStop(0, 'rgba(250,236,200,.95)'); fg.addColorStop(0.55, 'rgba(214,190,140,.6)'); fg.addColorStop(1, 'rgba(214,190,140,0)');
    x.fillStyle = fg; x.beginPath(); x.arc(fx, fy, 22, 0, 6.2832); x.fill(); }
  x.fillStyle = 'rgba(200,170,110,.25)'; for (let i=0;i<120;i++){ x.beginPath(); x.arc(690 + (R() - 0.5)*170, 225 + (R() - 0.5)*220, 1.3, 0, 6.2832); x.fill(); }
  x.restore();
  x.strokeStyle = '#D8CC9C'; x.lineWidth = 12; x.beginPath(); x.moveTo(738, 318); x.quadraticCurveTo(760, 350, 790, 356); x.stroke();
  x.strokeStyle = '#F6EFD2'; x.lineWidth = 7; x.stroke();
}
function inmRRect(x, X, Y, W, H, r){ x.beginPath(); x.moveTo(X+r,Y); x.arcTo(X+W,Y,X+W,Y+H,r); x.arcTo(X+W,Y+H,X,Y+H,r); x.arcTo(X,Y+H,X,Y,r); x.arcTo(X,Y,X+W,Y,r); x.closePath(); }
function inmRotulo(x, t, px, py, al){
  x.font = '600 12.5px "IBM Plex Sans",sans-serif'; const w = x.measureText(t).width + 12;
  const X = al === 'center' ? px - w/2 : px - 6;
  x.fillStyle = 'rgba(255,255,255,.78)'; inmRRect(x, X, py - 13, w, 18, 9); x.fill();
  x.fillStyle = '#4a3f38'; x.textAlign = al || 'left'; x.fillText(t, px, py);
}
function inmDibujaPaso(cv, paso, u, tiempo){
  const W = cv.clientWidth || 760, H = Math.round(W*0.5);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (cv.width !== Math.round(W*dpr) || cv.height !== Math.round(H*dpr)){ cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); cv.style.height = H+'px'; }
  const x = cv.getContext('2d'); const s = W/800;
  const S = INM_ESC, C = S.C, e = v => clamp(v,0,1), ease = v => { v = e(v); return v*v*(3-2*v); };
  const T = tiempo || 0;
  /* fondo en caché (a la resolución real del lienzo) */
  const key = cv.width + 'x' + cv.height;
  if (INM_FONDO.key !== key){ const c = INM_FONDO.cv || document.createElement('canvas'); c.width = cv.width; c.height = cv.height;
    const cx = c.getContext('2d'); cx.setTransform(dpr*s, 0, 0, dpr*s, 0, 0); inmFondoEscena(cx, S); INM_FONDO.cv = c; INM_FONDO.key = key; }
  x.setTransform(1, 0, 0, 1, 0, 0); x.drawImage(INM_FONDO.cv, 0, 0);
  x.setTransform(dpr*s, 0, 0, dpr*s, 0, 0);
  const herida = paso >= 1 && paso <= 5;
  if (herida){
    const hg = x.createLinearGradient(0, 68, 0, 104); hg.addColorStop(0, '#F3D2C4'); hg.addColorStop(1, '#F8E3DA');
    x.fillStyle = hg; x.beginPath(); x.moveTo(193, 68); x.lineTo(247, 68); x.lineTo(240, 104); x.quadraticCurveTo(220, 110, 200, 104); x.closePath(); x.fill();
    x.fillStyle = '#A8352E'; x.beginPath(); x.moveTo(190, 70); x.lineTo(196, 70); x.lineTo(201, 102); x.lineTo(195, 102); x.closePath(); x.fill();
    x.beginPath(); x.moveTo(244, 70); x.lineTo(250, 70); x.lineTo(245, 102); x.lineTo(239, 102); x.closePath(); x.fill();
    x.fillStyle = 'rgba(200,60,50,.25)'; x.beginPath(); x.ellipse(220, 104, 26, 6, 0, 0, 6.2832); x.fill();
  }
  if (paso === 6){ const cg = x.createLinearGradient(0, 70, 0, 100); cg.addColorStop(0, '#F0C6B2'); cg.addColorStop(1, '#E8B69E'); x.fillStyle = cg; inmRRect(x, 193, 70, 54, 30, 6); x.fill(); x.strokeStyle = 'rgba(170,100,80,.35)'; x.lineWidth = 1; x.stroke(); }
  /* enrojecimiento de la inflamación */
  const rojo = paso === 2 ? ease(u)*0.45 : (paso === 3 || paso === 4) ? 0.45 : paso === 5 ? 0.45*(1-ease(u)) : 0;
  if (rojo > 0){ const g = x.createRadialGradient(C.x, C.y, 10, C.x, C.y, 150); g.addColorStop(0, `rgba(220,60,50,${rojo})`); g.addColorStop(1, 'rgba(220,60,50,0)'); x.fillStyle = g; x.fillRect(60,100,340,240); }
  /* capilar: endotelio, plasma y glóbulos rojos que circulan */
  const ancho = paso === 2 ? 22 + 12*ease(u) : (paso === 3 || paso === 4) ? 34 : paso === 5 ? 34 - 12*ease(u) : 22;
  const y1 = 335 - ancho/2, y2 = 335 + ancho/2;
  const pl = x.createLinearGradient(0, y1, 0, y2); pl.addColorStop(0, '#D65A4C'); pl.addColorStop(0.5, '#E57A69'); pl.addColorStop(1, '#C1463A');
  x.fillStyle = pl; x.fillRect(0, y1, 560, ancho);
  x.fillStyle = '#E9A79B'; x.fillRect(0, y1 - 4, 560, 4); x.fillRect(0, y2, 560, 4);
  x.fillStyle = 'rgba(150,70,70,.55)'; for (let k=0;k<9;k++){ x.beginPath(); x.ellipse(30 + k*62, y1 - 2, 9, 2.2, 0, 0, 6.2832); x.fill(); x.beginPath(); x.ellipse(60 + k*62, y2 + 2, 9, 2.2, 0, 0, 6.2832); x.fill(); }
  x.strokeStyle = '#8E2A22'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(0, y1 - 4); x.lineTo(560, y1 - 4); x.moveTo(0, y2 + 4); x.lineTo(560, y2 + 4); x.stroke();
  x.fillStyle = '#E9D6D0'; x.beginPath(); x.moveTo(560, y1 - 4); x.quadraticCurveTo(570, 335, 560, y2 + 4); x.fill();
  x.save(); x.beginPath(); x.rect(0, y1, 556, ancho); x.clip();
  for (let i=0;i<14;i++){ const px = ((i*43 + T*38) % 580) - 10, py = 335 + ((i%3)-1)*ancho*0.22;
    const rg = x.createRadialGradient(px, py, 1, px, py, 8); rg.addColorStop(0, '#E76A5C'); rg.addColorStop(0.45, '#C9302A'); rg.addColorStop(1, '#A51F1C');
    x.fillStyle = rg; x.beginPath(); x.ellipse(px, py, 7.5, 4.3, (i%4)*0.2, 0, 6.2832); x.fill();
    x.fillStyle = 'rgba(255,170,160,.45)'; x.beginPath(); x.ellipse(px, py, 3.2, 1.6, (i%4)*0.2, 0, 6.2832); x.fill(); }
  x.restore();
  /* flujo de la linfa */
  x.strokeStyle = 'rgba(150,125,60,.5)'; x.lineWidth = 1.5; x.setLineDash([5,4]); x.lineDashOffset = -T*14;
  x.beginPath(); S.ruta.forEach((p,i) => i ? x.lineTo(p[0],p[1]) : x.moveTo(p[0],p[1])); x.stroke(); x.setLineDash([]); x.lineDashOffset = 0;
  /* rótulos fijos */
  inmRotulo(x, 'Exterior', 10, 22); inmRotulo(x, 'Piel', 10, 92); inmRotulo(x, 'Tejido', 10, 124); inmRotulo(x, 'Capilar sanguíneo', 10, 370);
  inmRotulo(x, 'Ganglio linfático', 690, 358, 'center'); inmRotulo(x, 'Vaso linfático', 470, 166, 'center');
  /* figuras */
  const bacilo = (px, py, a, al) => { if (al <= 0) return; x.save(); x.globalAlpha = al; x.translate(px, py); x.rotate(a);
    x.strokeStyle = 'rgba(47,90,30,.55)'; x.lineWidth = 0.8; x.beginPath(); x.moveTo(-13, 0); x.quadraticCurveTo(-17, -3, -20, 0); x.quadraticCurveTo(-23, 3, -26, 0); x.stroke();
    const g = x.createLinearGradient(0, -5, 0, 5); g.addColorStop(0, '#9CCB72'); g.addColorStop(0.5, '#6FA84F'); g.addColorStop(1, '#4B7E32');
    x.fillStyle = g; x.strokeStyle = '#2F5A1E'; x.lineWidth = 1.3;
    x.beginPath(); x.moveTo(-9,-4.5); x.lineTo(9,-4.5); x.arc(9,0,4.5,-1.5708,1.5708); x.lineTo(-9,4.5); x.arc(-9,0,4.5,1.5708,4.7124); x.fill(); x.stroke();
    x.fillStyle = 'rgba(255,255,255,.4)'; x.beginPath(); x.ellipse(-2, -2, 7, 1.3, 0, 0, 6.2832); x.fill();
    x.fillStyle = 'rgba(40,80,25,.45)'; x.beginPath(); x.ellipse(1, 0.8, 4, 1.8, 0.3, 0, 6.2832); x.fill();
    x.restore(); };
  const fagocito = (px, py, r, macro) => {
    x.save();
    if (macro){
      /* macrófago: célula grande e irregular con pseudópodos */
      const g = x.createRadialGradient(px - r*0.3, py - r*0.35, 2, px, py, r*1.4); g.addColorStop(0, '#F6EDDD'); g.addColorStop(1, '#D9C3A0');
      x.fillStyle = g; x.strokeStyle = '#8A6D45'; x.lineWidth = 1.8; x.beginPath();
      for (let k=0;k<=48;k++){ const a = k/48*6.2832, bump = 0.10*Math.sin(a*3 + px*0.05) + 0.34*Math.pow(Math.max(0, Math.sin(a*2 + 0.6)), 6) + 0.22*Math.pow(Math.max(0, Math.sin(a*3 - 1.1)), 8), rr = r*(1 + bump);
        k ? x.lineTo(px + Math.cos(a)*rr, py + Math.sin(a)*rr) : x.moveTo(px + Math.cos(a)*rr, py + Math.sin(a)*rr); }
      x.closePath(); x.fill(); x.stroke();
      x.fillStyle = 'rgba(255,255,255,.5)'; [[-7, 6, 3], [8, 7, 2.4], [-2, -9, 2]].forEach(o => { x.beginPath(); x.arc(px + o[0], py + o[1], o[2], 0, 6.2832); x.fill(); });
      x.fillStyle = 'rgba(111,168,79,.55)'; x.beginPath(); x.ellipse(px - 8, py - 3, 4, 2, 0.4, 0, 6.2832); x.fill();
      const ng = x.createRadialGradient(px + 2, py - 3, 1, px + 3, py - 2, r*0.4); ng.addColorStop(0, '#A98B5F'); ng.addColorStop(1, '#6E5230');
      x.fillStyle = ng; x.beginPath(); x.ellipse(px + 4, py - 1, r*0.34, r*0.25, 0.4, 0, 6.2832); x.fill();
    } else {
      /* neutrófilo: núcleo de 3 lóbulos y citoplasma granuloso */
      const g = x.createRadialGradient(px - r*0.3, py - r*0.35, 1, px, py, r*1.1); g.addColorStop(0, '#FAF4FC'); g.addColorStop(1, '#DCC8EA');
      x.fillStyle = g; x.strokeStyle = '#7A5A93'; x.lineWidth = 1.6; x.beginPath();
      for (let k=0;k<=28;k++){ const a = k/28*6.2832, rr = r*(1 + 0.07*Math.sin(a*5 + px)); k ? x.lineTo(px+Math.cos(a)*rr, py+Math.sin(a)*rr) : x.moveTo(px+Math.cos(a)*rr, py+Math.sin(a)*rr); }
      x.closePath(); x.fill(); x.stroke();
      x.fillStyle = 'rgba(160,110,190,.5)'; for (let k=0;k<10;k++){ x.beginPath(); x.arc(px + Math.cos(k*2.4)*r*0.62, py + Math.sin(k*2.4)*r*0.62, 0.9, 0, 6.2832); x.fill(); }
      x.fillStyle = '#6B3FA0'; x.strokeStyle = '#6B3FA0'; x.lineWidth = 1.6;
      x.beginPath(); x.moveTo(px - 4, py - 2); x.lineTo(px + 1, py + 3); x.lineTo(px + 5, py - 3); x.stroke();
      [[-4,-2,3.3],[1,3,3.1],[5,-3,3.2]].forEach(o => { x.beginPath(); x.arc(px+o[0], py+o[1], o[2], 0, 6.2832); x.fill(); });
    }
    x.restore(); };
  const linfo = (px, py, letra, col) => {
    const plasm = letra === 'P', r = plasm ? 12.5 : 11;
    x.fillStyle = 'rgba(0,0,0,.12)'; x.beginPath(); x.arc(px + 1, py + 1.5, r, 0, 6.2832); x.fill();
    const g = x.createRadialGradient(px - 4, py - 4, 1, px, py, r); g.addColorStop(0, '#FFFFFF'); g.addColorStop(1, col === '#4F86C6' ? (plasm ? '#C9DAF0' : '#DCE7F4') : '#F6DFD8');
    x.fillStyle = g; x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1.2; x.beginPath(); x.arc(px, py, r, 0, 6.2832); x.fill(); x.stroke();
    const nx = plasm ? px - 3 : px, ny = plasm ? py + 1 : py, nr = plasm ? 6.6 : 8.6;
    const ng = x.createRadialGradient(nx - 2.5, ny - 3, 0.5, nx, ny, nr); ng.addColorStop(0, col); ng.addColorStop(1, 'rgba(20,30,60,.9)');
    x.fillStyle = col; x.beginPath(); x.arc(nx, ny, nr, 0, 6.2832); x.fill();
    x.fillStyle = ng; x.globalAlpha = 0.55; x.beginPath(); x.arc(nx, ny, nr, 0, 6.2832); x.fill(); x.globalAlpha = 1;
    x.fillStyle = '#fff'; x.font = '700 ' + (letra.length > 1 ? 8.5 : 10) + 'px "IBM Plex Sans",sans-serif'; x.textAlign = 'center'; x.fillText(letra, nx, ny + 3.5); };
  const anticuerpo = (px, py, a, sz) => { x.save(); x.translate(px, py); x.rotate(a); const k = sz||1; x.lineCap = 'round';
    x.strokeStyle = '#1F4FA8'; x.lineWidth = 2.6*k; x.beginPath(); x.moveTo(0, 7*k); x.lineTo(0, 0); x.lineTo(-4*k, -4.8*k); x.moveTo(0,0); x.lineTo(4*k, -4.8*k); x.stroke();
    x.strokeStyle = '#8FB4F0'; x.lineWidth = 2*k; x.beginPath(); x.moveTo(-4*k, -4.8*k); x.lineTo(-6.2*k, -7.4*k); x.moveTo(4*k, -4.8*k); x.lineTo(6.2*k, -7.4*k); x.stroke();
    x.restore(); };
  const dendritica = (px, py) => {
    x.save(); x.strokeStyle = '#C99A2A'; x.lineCap = 'round';
    for (let k=0;k<7;k++){ const a = k/7*6.2832 + 0.3, L = 22 + (k%3)*6; x.lineWidth = 3.2;
      x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + Math.cos(a + 0.3)*L*0.6, py + Math.sin(a + 0.3)*L*0.6, px + Math.cos(a)*L, py + Math.sin(a)*L); x.stroke();
      x.lineWidth = 1.4; x.beginPath(); x.moveTo(px + Math.cos(a)*L*0.7, py + Math.sin(a)*L*0.7); x.lineTo(px + Math.cos(a + 0.5)*L*0.95, py + Math.sin(a + 0.5)*L*0.95); x.stroke(); }
    const g = x.createRadialGradient(px - 4, py - 4, 1, px, py, 13); g.addColorStop(0, '#FBE7A6'); g.addColorStop(1, '#E2B23E');
    x.fillStyle = g; x.strokeStyle = '#9A7418'; x.lineWidth = 1.5; x.beginPath(); x.arc(px, py, 11, 0, 6.2832); x.fill(); x.stroke();
    x.fillStyle = '#9A7418'; x.beginPath(); x.ellipse(px + 2, py + 1, 5, 4, 0.3, 0, 6.2832); x.fill();
    x.fillStyle = '#6FA84F'; x.strokeStyle = '#2F5A1E'; x.lineWidth = 1; x.beginPath(); x.moveTo(px-4,py-3); x.lineTo(px+4,py-3); x.lineTo(px,py-10); x.closePath(); x.fill(); x.stroke();
    x.restore(); };
  const mastocito = (px, py) => { const g = x.createRadialGradient(px - 5, py - 5, 1, px, py, 16); g.addColorStop(0, '#FBEAF1'); g.addColorStop(1, '#E7B9CF');
    x.fillStyle = g; x.strokeStyle = '#A0527A'; x.lineWidth = 1.6; x.beginPath(); x.arc(px, py, 15, 0, 6.2832); x.fill(); x.stroke();
    x.fillStyle = 'rgba(120,50,90,.5)'; x.beginPath(); x.ellipse(px, py, 5, 4, 0, 0, 6.2832); x.fill();
    x.fillStyle = '#8E3E6A'; for (let k=0;k<16;k++){ const rr = 7 + (k%3)*2.2; x.beginPath(); x.arc(px + Math.cos(k*0.9)*rr, py + Math.sin(k*1.3)*rr*0.9, 1.7, 0, 6.2832); x.fill(); } };
  const jig = (i) => [Math.sin(T*2 + S.bac[i].f)*2, Math.cos(T*1.7 + S.bac[i].f)*2];

  if (paso === 0){
    for (let i=0;i<6;i++){ const bx = 150 + i*80, by = 40 + Math.sin(T*2.2 + i)*14 + (i%2)*6; bacilo(bx, by, 0.3*i, 1); }
    x.fillStyle = '#2F5A1E'; x.font = '600 12px "IBM Plex Sans",sans-serif'; x.textAlign = 'left'; x.fillText('Bacterias en la superficie', 590, 22);
    linfo(690, 200, 'B', '#4F86C6'); linfo(716, 236, 'T', '#D9644A'); linfo(664, 250, 'B', '#4F86C6');
  }
  if (paso === 1){
    for (let i=0;i<6;i++){ const k = ease(u*1.5 - i*0.08); const sx = 205 + i*6, sy = 40; const b = S.bac[i];
      bacilo(sx + (b.x - sx)*k, sy + (b.y - sy)*k, b.a*k, 1); }
    for (let i=6;i<16;i++){ const al = e((u - 0.55 - (i-6)*0.04)*6); if (al > 0){ const b = S.bac[i]; bacilo(b.x, b.y, b.a, al); } }
    linfo(690, 200, 'B', '#4F86C6'); linfo(716, 236, 'T', '#D9644A'); linfo(664, 250, 'B', '#4F86C6');
  }
  if (paso === 2){
    S.bac.forEach((b,i) => { const j = jig(i); bacilo(b.x+j[0], b.y+j[1], b.a, 1); });
    mastocito(320, 250);
    x.fillStyle = '#E0A21A'; for (let k=0;k<22;k++){ const a = k/22*6.2832, r = 18 + ease(u)*70*(0.6 + 0.4*((k*7)%5)/5); x.beginPath(); x.arc(320 + Math.cos(a)*r, 250 + Math.sin(a)*r*0.8, 2.4, 0, 6.2832); x.fill(); }
    S.fag.forEach((f,j) => { const k = ease(u*1.3 - j*0.1); fagocito(f.x0 + (f.x - f.x0)*k, f.y0 + (f.y - f.y0)*k, 14, false); });
    linfo(690, 200, 'B', '#4F86C6'); linfo(716, 236, 'T', '#D9644A'); linfo(664, 250, 'B', '#4F86C6');
  }
  if (paso === 3 || paso === 4 || paso === 5){
    const macro = { x:C.x + 78, y:C.y - 16 };
    const mk = paso === 3 ? ease(u*1.5) : 1;
    fagocito(345 + (macro.x - 345)*mk, 290 + (macro.y - 290)*mk, 21, true);
    S.fag.forEach(f => fagocito(f.x, f.y, 14, false));
    S.bac.forEach((b,i) => {
      if (i < 11){                            /* engullidas por los fagocitos */
        if (paso !== 3) return;
        const t0 = 0.12 + i*0.07, k = e((u - t0)/0.12);
        if (k >= 1) return;
        let dest = S.fag[i%4]; if (i%5 === 4) dest = macro;
        bacilo(b.x + (dest.x - b.x)*k, b.y + (dest.y - b.y)*k, b.a, 1 - k*0.9);
      } else {                                 /* quedan unas pocas */
        let al = 1; if (paso === 5) al = 1 - e((u - 0.78)/0.15);
        if (al <= 0) return;
        const j = jig(i); bacilo(b.x+j[0], b.y+j[1], b.a, al);
        if (paso === 5 && u > 0.55){ for (let q=0;q<3;q++) anticuerpo(b.x + Math.cos(q*2.1)*12, b.y + Math.sin(q*2.1)*10, q*2.1 + 1.57, 0.7); }
      }
    });
    if (paso === 4){ const p = inmRuta(S.ruta, ease(u)); dendritica(p[0], p[1]); }
    if (paso === 5){
      dendritica(648, 250);
      const nB = 1 + Math.floor(ease(u*1.8)*9);
      for (let k=0;k<nB;k++){ const a = k*0.9, r = 12 + k*5.2; linfo(700 + Math.cos(a)*r, 205 + Math.sin(a)*r*1.1, k%3 === 2 ? 'P' : 'B', '#4F86C6'); }
      linfo(655, 195, 'Th', '#D9644A');
      if (u > 0.25) for (let k=0;k<12;k++){ const uu = e((u - 0.25 - k*0.025)*1.8); if (uu <= 0 || uu >= 1) continue; const p = inmRuta(S.ruta.slice().reverse(), uu); anticuerpo(p[0] + ((k%3)-1)*8, p[1] + ((k%2)*2-1)*5, k, 1); }
      for (let k=0;k<2;k++){ const uu = e((u - 0.4 - k*0.12)*1.6); if (uu > 0) { const p = inmRuta(S.ruta.slice().reverse(), uu*0.85); linfo(p[0], p[1] + 16, 'Tc', '#B8452C'); } }
    } else { linfo(690, 200, 'B', '#4F86C6'); linfo(716, 236, 'T', '#D9644A'); linfo(664, 250, 'B', '#4F86C6'); }
  }
  if (paso === 6){
    [[672,190,'Bm'],[708,205,'Bm'],[680,245,'Bm']].forEach(p => linfo(p[0], p[1], p[2], '#4F86C6'));
    [[716,255,'Tm'],[650,220,'Tm']].forEach(p => linfo(p[0], p[1], p[2], '#D9644A'));
    for (let k=0;k<4;k++) anticuerpo(((k*140 + T*38) % 560), 335 + ((k%2)*2-1)*4, 1.57, 0.9);
    x.font = '600 12px "IBM Plex Sans",sans-serif'; const tw = x.measureText('Tejido limpio · herida cerrada').width + 16;
    x.fillStyle = 'rgba(255,255,255,.8)'; inmRRect(x, C.x - tw/2, C.y - 14, tw, 20, 10); x.fill();
    x.fillStyle = '#2F5A1E'; x.textAlign = 'center'; x.fillText('Tejido limpio · herida cerrada', C.x, C.y);
  }
  cv.setAttribute('aria-label', 'Escena del paso ' + (paso+1) + ' de 7: ' + INM_PASOS[paso].fase);
}

/* =====================================================================
   3 · VACUNAS
   ===================================================================== */
/* carga del patógeno tras un contacto, con o sin memoria previa (vacuna) */
function inmInfeccion(vacunado){
  let P = 100; const out = [], ab = [];
  for (let t=0; t<=30.001; t+=0.05){
    const A = vacunado ? inmResp(t, 0, true) + 60 : inmResp(t, 0, false);
    P += P*(1.4 - 0.025*A)*0.05; if (P < 1) P = 0;
    if (Math.abs(t*2 - Math.round(t*2)) < 0.02){ out.push({ x:Math.round(t*2)/2, y: P > 0 ? Math.log10(P) : 0 }); ab.push({ x:Math.round(t*2)/2, y:A }); }
  }
  return { carga:out, anticuerpos:ab };
}
const INM_VACUNAS = [
  { id:'atenuada', n:'Atenuadas', sub:'Microbio vivo, debilitado',
    icon:'<svg viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="inm-v1" cx="38%" cy="34%" r="70%"><stop offset="0" stop-color="#FBE7A0"/><stop offset=".7" stop-color="#E4B94E"/><stop offset="1" stop-color="#B98A2C"/></radialGradient></defs>'+Array.from({length:14},(_,i)=>{const a=i/14*6.283;return `<line x1="${(32+16*Math.cos(a)).toFixed(1)}" y1="${(30+16*Math.sin(a)).toFixed(1)}" x2="${(32+23*Math.cos(a)).toFixed(1)}" y2="${(30+23*Math.sin(a)).toFixed(1)}" stroke="#B8352A" stroke-width="2.2" stroke-linecap="round"/><circle cx="${(32+24*Math.cos(a)).toFixed(1)}" cy="${(30+24*Math.sin(a)).toFixed(1)}" r="2.6" fill="#D8452F"/>`;}).join('')+'<circle cx="32" cy="30" r="16.5" fill="url(#inm-v1)" stroke="#8a6c3c" stroke-width="1.5"/><path d="M24 32 q4 -8 8 0 t8 0" fill="none" stroke="#8E5BD0" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="26" cy="23" rx="4.5" ry="2.4" fill="#fff" opacity=".45"/><text x="32" y="62" font-size="8" text-anchor="middle" fill="currentColor">vivo y débil</text></svg>',
    que:'El microbio completo y vivo, pero debilitado en el laboratorio para que se multiplique muy poco y no cause la enfermedad en una persona sana.',
    como:'Como el microbio se multiplica un poco, el sistema inmune ve una "infección de ensayo" muy parecida a la real: se activan linfocitos B y T y queda memoria fuerte, a menudo con una o dos dosis.',
    ej:'SRP (sarampión, rubéola y paperas), varicela, fiebre amarilla, rotavirus, polio oral (bOPV) y BCG contra la tuberculosis.',
    ojo:'No se aplican a personas con defensas muy bajas (por ejemplo, en quimioterapia) ni, en general, durante el embarazo. Justamente por ellas importa la inmunidad de grupo.' },
  { id:'inactivada', n:'Inactivadas', sub:'Microbio entero, muerto',
    icon:'<svg viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="inm-v2" cx="38%" cy="34%" r="70%"><stop offset="0" stop-color="#ECE7DD"/><stop offset=".7" stop-color="#C9C0AE"/><stop offset="1" stop-color="#8F8674"/></radialGradient></defs>'+Array.from({length:14},(_,i)=>{const a=i/14*6.283+.1;return `<line x1="${(32+16*Math.cos(a)).toFixed(1)}" y1="${(30+16*Math.sin(a)).toFixed(1)}" x2="${(32+22*Math.cos(a+.12)).toFixed(1)}" y2="${(30+22*Math.sin(a+.12)).toFixed(1)}" stroke="#8d7f73" stroke-width="2.2" stroke-linecap="round"/><circle cx="${(32+23*Math.cos(a+.14)).toFixed(1)}" cy="${(30+23*Math.sin(a+.14)).toFixed(1)}" r="2.4" fill="#A39689"/>`;}).join('')+'<circle cx="32" cy="30" r="16.5" fill="url(#inm-v2)" stroke="#6b6254" stroke-width="1.5"/><path d="M25 23 l14 14 M39 23 l-14 14" stroke="#444" stroke-width="3" stroke-linecap="round"/><text x="32" y="62" font-size="8" text-anchor="middle" fill="currentColor">inactivado</text></svg>',
    que:'El microbio entero, pero inactivado con calor o sustancias químicas: conserva su forma y sus antígenos, pero ya no puede multiplicarse.',
    como:'El sistema inmune reconoce los antígenos y produce anticuerpos y memoria. Como el microbio no se multiplica, la señal es más débil: suelen hacer falta varias dosis y refuerzos.',
    ej:'Polio inyectable (IPV), hepatitis A y la mayoría de vacunas contra la gripe.',
    ojo:'No pueden causar la enfermedad, porque no hay nada vivo. Pueden dar dolor en el brazo o fiebre leve: es la respuesta inmune trabajando.' },
  { id:'subunidad', n:'Subunidades y toxoides', sub:'Solo una pieza',
    icon:'<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="inm-v3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F08A76"/><stop offset="1" stop-color="#B8352A"/></linearGradient></defs><circle cx="32" cy="30" r="23" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="3 4" opacity=".45"/><path d="M29 48 L30 30 M35 48 L34 30" stroke="#B8352A" stroke-width="3.2" stroke-linecap="round"/><circle cx="27" cy="22" r="6.5" fill="url(#inm-v3)"/><circle cx="37" cy="22" r="6.5" fill="url(#inm-v3)"/><circle cx="32" cy="15.5" r="6.5" fill="url(#inm-v3)"/><ellipse cx="29.5" cy="13.5" rx="2.6" ry="1.4" fill="#fff" opacity=".5"/><text x="32" y="62" font-size="8" text-anchor="middle" fill="currentColor">solo la pieza</text></svg>',
    que:'Solo una parte del microbio: una proteína de su superficie (a veces fabricada por levaduras en el laboratorio), un azúcar de su cápsula unido a una proteína, o una toxina inactivada (toxoide).',
    como:'El sistema inmune aprende a reconocer justo la pieza clave: la espícula que usa para entrar o la toxina que causa el daño. Suelen llevar un adyuvante que refuerza la señal.',
    ej:'Hepatitis B, VPH (virus del papiloma humano), neumococo, Haemophilus influenzae tipo b y los toxoides de difteria y tétanos (todos en la pentavalente o por separado).',
    ojo:'Son muy seguras porque no hay microbio completo. Casi siempre necesitan varias dosis.' },
  { id:'arnm', n:'ARN mensajero', sub:'Instrucciones, no el microbio',
    icon:'<svg viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="inm-v4" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".75" stop-color="#EBDDF4"/><stop offset="1" stop-color="#CDB4E2"/></radialGradient></defs>'+Array.from({length:22},(_,i)=>{const a=i/22*6.283;return `<circle cx="${(32+20*Math.cos(a)).toFixed(1)}" cy="${(29+20*Math.sin(a)).toFixed(1)}" r="2.3" fill="#B08CD6" stroke="#8E5BD0" stroke-width=".6"/>`;}).join('')+'<circle cx="32" cy="29" r="18.5" fill="url(#inm-v4)"/><path d="M19 30 q3.2 -7 6.5 0 t6.5 0 t6.5 0 t6.5 0" fill="none" stroke="#8E5BD0" stroke-width="2.6" stroke-linecap="round"/><path d="M21 30 v3 M27 30 v-3 M33 30 v3 M39 30 v-3" stroke="#E4574A" stroke-width="1.4" stroke-linecap="round"/><text x="32" y="62" font-size="8" text-anchor="middle" fill="currentColor">ARNm en lípidos</text></svg>',
    que:'Una molécula de ARN mensajero con la receta de una sola proteína del virus (en las de COVID-19, la espícula), envuelta en una gotita de lípidos que la protege.',
    como:'Algunas de tus células leen esa receta con sus ribosomas y fabrican la espícula durante unos días. El sistema inmune la ve y produce anticuerpos y linfocitos de memoria. El ARNm se degrada en pocos días.',
    ej:'Vacunas contra la COVID-19 de Pfizer-BioNTech y Moderna.',
    ojo:'El ARNm no entra al núcleo, que es donde está tu ADN, y no puede modificarlo. Tampoco contiene el virus. Se estudiaba desde los años noventa; la pandemia aceleró su uso, pero no se saltó las fases de ensayo.' }
];
const INM_MITOS = [
  { mal:'«Las vacunas causan autismo.»',
    bien:'Esta idea nació de un artículo de 1998 con solo 12 niños, firmado por Andrew Wakefield. Se descubrió que los datos habían sido manipulados: la revista The Lancet lo retiró en 2010 y el autor perdió su licencia médica. Desde entonces se han estudiado millones de niños en varios países. Un estudio de Dinamarca con más de 650.000 niños (2019) comparó vacunados y no vacunados con la SRP: el autismo fue igual de frecuente en los dos grupos.',
    por:'Por qué parece creíble: los primeros signos del autismo suelen notarse cerca de la edad en que se aplica la SRP. Que dos cosas ocurran en la misma época no significa que una cause la otra.' },
  { mal:'«Tantas vacunas juntas sobrecargan el sistema inmune del bebé.»',
    bien:'Desde que nace, un bebé enfrenta miles de antígenos nuevos cada día: en la leche, en la piel, en todo lo que se lleva a la boca y en los billones de bacterias que colonizan su intestino. Las vacunas son una fracción muy pequeña de eso. Además, las vacunas actuales están mucho más purificadas: la antigua vacuna contra la viruela tenía, ella sola, unas 200 proteínas; todo el esquema infantil actual suma una cantidad parecida.',
    por:'Lo que sí es real: después de una vacuna puede haber fiebre leve o dolor. Es la respuesta inmune funcionando, no una sobrecarga, y pasa en uno o dos días.' },
  { mal:'«Es mejor la inmunidad natural: que le dé el sarampión y listo.»',
    bien:'La infección natural sí deja memoria, pero el precio puede ser alto: el sarampión causa neumonía, encefalitis y la muerte de alrededor de 1 a 3 de cada 1.000 niños infectados incluso en países con buenos hospitales. Además, se ha visto que borra parte de la memoria inmunitaria contra otras infecciones que ya se tenían («amnesia inmunológica»). La vacuna genera memoria sin pagar ese precio.',
    por:'La vacuna es un ensayo de la infección sin la enfermedad: por eso la curva de la sección 2 sirve para las dos.' },
  { mal:'«Si casi todos están vacunados, yo no necesito vacunarme.»',
    bien:'La inmunidad de grupo funciona solo mientras la cobertura se mantenga por encima del umbral. Si muchas personas piensan así a la vez, la cobertura cae y el brote vuelve: es exactamente lo que ha pasado con el sarampión en varios países de América desde 2018.',
    por:'Compruébalo en la sección 4: baja la cobertura del sarampión del 95 % al 85 % y repite varias veces.' }
];

/* =====================================================================
   4 · INMUNIDAD DE GRUPO (población en cuadrícula de 40 × 40)
   ===================================================================== */
const INM_LADO = 40;
const INM_ENF = [
  { id:'gripe',      n:'Gripe estacional', R0:1.5, t:'R₀ entre 1,3 y 2' },
  { id:'covid',      n:'COVID-19 (2020)',  R0:3,   t:'Variante inicial: R₀ entre 2,5 y 3' },
  { id:'polio',      n:'Poliomielitis',    R0:6,   t:'R₀ entre 5 y 7' },
  { id:'sarampion',  n:'Sarampión',        R0:15,  t:'R₀ entre 12 y 18: de las más contagiosas que se conocen' }
];
/* estados: 0 susceptible · 1 protegido por la vacuna · 2 infectado · 3 recuperado · 4 contagiado hoy */
function inmHerdNueva(cfg, seed){
  const R = inmRng(seed), N = INM_LADO*INM_LADO;
  const st = new Uint8Array(N), noV = new Uint8Array(N), vac = new Uint8Array(N), dias = new Uint8Array(N);
  for (let i=0;i<N;i++) noV[i] = R() < 0.03 ? 1 : 0;
  const pElig = Math.min(1, cfg.cov/0.97);          /* el 3 % que no puede vacunarse queda fuera */
  for (let i=0;i<N;i++) if (!noV[i] && R() < pElig){ vac[i] = 1; if (R() < cfg.eff) st[i] = 1; }
  let semillas = 0, intentos = 0;
  while (semillas < 4 && intentos++ < 5000){ const i = Math.floor(R()*N); if (st[i] === 0){ st[i] = 2; semillas++; } }
  const sim = { cfg, R, st, noV, vac, dias, dia:0, total:semillas, serie:[{ x:0, y:semillas }], fin:semillas === 0 };
  sim.noVacTot = noV.reduce((a,b)=>a+b,0);
  sim.susc0 = st.reduce((a,v)=>a+(v===0||v===2?1:0),0);
  return sim;
}
function inmHerdDia(sim){
  if (sim.fin) return;
  const { st, dias, R, cfg } = sim, N = st.length, D = 7, L = INM_LADO;
  const inf = []; for (let i=0;i<N;i++) if (st[i] === 2) inf.push(i);
  if (!inf.length){ sim.fin = true; return; }
  const nuevos = [];
  for (const i of inf){
    const c = inmPoisson(cfg.R0/D, R);
    for (let k=0;k<c;k++){
      let j;
      if (R() < 0.5){ const x = i%L, y = (i/L)|0; const xx = (x + Math.round((R()*2-1)*3) + L) % L, yy = (y + Math.round((R()*2-1)*3) + L) % L; j = yy*L + xx; }
      else j = Math.floor(R()*N);
      if (st[j] === 0){ st[j] = 4; nuevos.push(j); }
    }
    dias[i]++; if (dias[i] >= D) st[i] = 3;
  }
  nuevos.forEach(j => { st[j] = 2; dias[j] = 0; });
  sim.total += nuevos.length; sim.dia++;
  let act = 0; for (let i=0;i<N;i++) if (st[i] === 2) act++;
  sim.serie.push({ x:sim.dia, y:act });
  if (!act || sim.dia >= 180) sim.fin = true;
}
function inmHerdCorre(cfg, seed){ const s = inmHerdNueva(cfg, seed); while (!s.fin) inmHerdDia(s); return s; }
function inmHerdNoVac(sim){ let n = 0; for (let i=0;i<sim.st.length;i++) if (sim.noV[i] && (sim.st[i] === 2 || sim.st[i] === 3)) n++; return n; }
function inmHerdPinta(cv, sim){
  const W = Math.min(cv.clientWidth || 520, 640), c = W/INM_LADO;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (cv.width !== Math.round(W*dpr)){ cv.width = Math.round(W*dpr); cv.height = Math.round(W*dpr); cv.style.height = W+'px'; }
  const x = cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0);
  x.fillStyle = '#FBFAF7'; x.fillRect(0,0,W,W);
  for (let i=0;i<sim.st.length;i++){
    const cx = (i%INM_LADO + 0.5)*c, cy = (((i/INM_LADO)|0) + 0.5)*c, s = sim.st[i], r = c*0.36;
    if (sim.noV[i]){      /* rombo: no puede vacunarse */
      x.beginPath(); x.moveTo(cx, cy-r*1.2); x.lineTo(cx+r*1.2, cy); x.lineTo(cx, cy+r*1.2); x.lineTo(cx-r*1.2, cy); x.closePath();
      if (s === 2){ x.fillStyle = '#D8452F'; x.fill(); } else if (s === 3){ x.fillStyle = '#8B8F96'; x.fill(); } else { x.fillStyle = '#FFE9A8'; x.fill(); x.strokeStyle = '#9A7418'; x.lineWidth = 1.4; x.stroke(); }
      continue;
    }
    if (s === 2){ x.fillStyle = '#D8452F'; x.beginPath(); x.arc(cx, cy, r*1.15, 0, 6.2832); x.fill(); }
    else if (s === 3){ x.fillStyle = '#9AA0A6'; x.beginPath(); x.arc(cx, cy, r*0.6, 0, 6.2832); x.fill(); }
    else if (s === 1){ x.fillStyle = '#2E6BD8'; x.fillRect(cx-r, cy-r, r*2, r*2); }
    else if (sim.vac[i]){ x.strokeStyle = '#2E6BD8'; x.lineWidth = 1.3; x.strokeRect(cx-r*0.85, cy-r*0.85, r*1.7, r*1.7); }
    else { x.strokeStyle = '#7C7A76'; x.lineWidth = 1.1; x.beginPath(); x.arc(cx, cy, r*0.8, 0, 6.2832); x.stroke(); }
  }
  cv.setAttribute('role','img');
  let act = 0; sim.st.forEach(v => { if (v === 2) act++; });
  cv.setAttribute('aria-label', `Población de ${sim.st.length} personas, día ${sim.dia}. ${act} con infección activa, ${sim.total} contagiadas en total.`);
}
const INM_ICO = {
  susc:'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="4.5" fill="none" stroke="#7C7A76" stroke-width="1.4"/></svg>',
  vac:'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="2" width="10" height="10" fill="#2E6BD8"/></svg>',
  vacF:'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2.5" y="2.5" width="9" height="9" fill="none" stroke="#2E6BD8" stroke-width="1.4"/></svg>',
  inf:'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="#D8452F"/></svg>',
  rec:'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="3.2" fill="#9AA0A6"/></svg>',
  noV:'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1 L13 7 L7 13 L1 7 Z" fill="#FFE9A8" stroke="#9A7418" stroke-width="1.3"/></svg>'
};

/* =====================================================================
   5 · RESISTENCIA A ANTIBIÓTICOS
   Cuatro tipos de bacteria según su sensibilidad al mismo antibiótico.
   Supervivencia diaria bajo tratamiento (ya descontado el crecimiento):
   sensibles 12 %, poco sensibles 30 %, resistentes 62 %; las muy
   resistentes (mutación nueva) crecen igual con o sin antibiótico.
   ===================================================================== */
const INM_TIPOS_B = [
  { n:'Sensibles',                 c:'#6FA84F', surv:0.12 },
  { n:'Poco sensibles',            c:'#C8B43A', surv:0.30 },
  { n:'Resistentes',               c:'#E0891A', surv:0.62 },
  { n:'Muy resistentes (mutación)', c:'#B8452C', surv:3.0 }
];
const INM_K = 1e9, INM_SINTOMAS = 1e7, INM_IMMUNE = 2e4, INM_MUT = 3e-8, INM_CRECE = 3.5;
function inmBactNueva(seed){
  const R = inmRng(seed);
  const fR = 0.0006 + R()*0.0009, fP = 0.006 + R()*0.006;   /* la variación de partida cambia un poco cada vez */
  const N = 1e8;
  return { R, b:[Math.round(N*(1-fR-fP)), Math.round(N*fP), Math.round(N*fR), 0], dia:0, serie:[], b0:null, sintomasFin:null };
}
function inmBactPaso(sim, droga, sub){
  const R = sim.R, b = sim.b, N = b[0]+b[1]+b[2]+b[3], nb = [0,0,0,0];
  const imm = Math.min(0.9, INM_IMMUNE/sub/Math.max(N,1));
  for (let i=0;i<4;i++){
    let n = b[i]; if (!n) continue;
    const net = droga ? INM_TIPOS_B[i].surv : INM_CRECE;
    n = inmBinom(n, (net < 1 ? Math.pow(net, 1/sub) : 1)*(1-imm), R);
    const g = net > 1 ? Math.pow(net, 1/sub) - 1 : 0;
    const nac = inmBinom(n, Math.min(1, g*Math.max(0, 1 - N/INM_K)*(0.85 + 0.3*R())), R);
    const mut = i < 3 ? inmBinom(nac, INM_MUT, R) : 0;
    nb[i] += n + nac - mut; if (i < 3) nb[i+1] += mut;
  }
  sim.b = nb;
}
/* plan: { tipo:'completo'|'corta'|'olvida', corta:día, desde:día de inicio } */
function inmBactDias(sim, plan, dias){
  const sub = 4, R = sim.R;
  for (let d=0; d<dias; d++){
    const dd = sim.dia;
    let droga = dd >= plan.desde && dd < plan.desde + 7;
    if (plan.tipo === 'corta' && dd >= plan.desde + plan.corta) droga = false;
    if (plan.tipo === 'olvida' && droga && R() < 0.4) droga = false;
    for (let k=0;k<sub;k++) inmBactPaso(sim, droga, sub);
    sim.dia++;
    const N = sim.b[0]+sim.b[1]+sim.b[2]+sim.b[3];
    sim.serie.push({ d:sim.dia, N, res:sim.b[2]+sim.b[3], droga, b:sim.b.slice() });
  }
}
function inmPintaPlaca(cv, b){
  const W = cv.clientWidth || 300, H = Math.round(Math.min(W, 300));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); cv.style.height = H+'px';
  const x = cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0);
  const osc = inmOscuro();
  x.fillStyle = osc ? '#16243A' : '#EEF2F6'; x.fillRect(0,0,W,H);
  const cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 10;
  const sh = x.createRadialGradient(cx + 3, cy + 6, r*0.8, cx + 3, cy + 6, r*1.08); sh.addColorStop(0, 'rgba(10,20,35,.28)'); sh.addColorStop(1, 'rgba(10,20,35,0)');
  x.fillStyle = sh; x.beginPath(); x.arc(cx + 3, cy + 6, r*1.08, 0, 6.2832); x.fill();
  const vb = x.createRadialGradient(cx - r*0.3, cy - r*0.4, r*0.2, cx, cy, r*1.05); vb.addColorStop(0, 'rgba(238,244,250,.98)'); vb.addColorStop(1, 'rgba(170,188,205,.98)');
  x.fillStyle = vb; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fill();
  const ag = x.createRadialGradient(cx - r*0.25, cy - r*0.3, r*0.1, cx, cy, r*0.97); ag.addColorStop(0, '#F8EABF'); ag.addColorStop(0.7, '#EFD897'); ag.addColorStop(1, '#D9BC6E');
  x.fillStyle = ag; x.beginPath(); x.arc(cx, cy, r - 5, 0, 6.2832); x.fill();
  x.strokeStyle = 'rgba(120,140,160,.85)'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.stroke();
  x.strokeStyle = 'rgba(255,255,255,.9)'; x.lineWidth = 1.3; x.beginPath(); x.arc(cx, cy, r - 2.5, 3.5, 5.0); x.stroke();
  const N = b[0]+b[1]+b[2]+b[3];
  const dots = N <= 0 ? 0 : Math.max(1, Math.min(320, Math.round(Math.log10(N+1)/9*320)));
  const R = inmRng(99);
  /* cada punto representa una fracción de la población: se reparte según la proporción de cada tipo */
  const cuota = b.map(v => N ? v/N*dots : 0); const n = cuota.map(Math.floor);
  let resto = dots - n.reduce((a,v)=>a+v,0); const orden = cuota.map((v,i)=>[v-Math.floor(v),i]).sort((a,b)=>b[0]-a[0]);
  for (let k=0;k<resto;k++) n[orden[k%4][1]]++;
  for (let i=3;i>=0;i--) if (b[i] > 0 && n[i] === 0 && dots > 0){ n[i] = 1; const m = n.indexOf(Math.max(...n)); if (m !== i) n[m]--; }
  n.forEach((cnt, t) => { for (let k=0;k<cnt;k++){
    const a = R()*6.2832, rr = Math.sqrt(R())*(r-10), px = cx + Math.cos(a)*rr, py = cy + Math.sin(a)*rr, rot = R()*3.14;
    x.save(); x.translate(px, py); x.rotate(rot);
    x.fillStyle = 'rgba(80,60,20,.22)'; x.beginPath(); x.ellipse(0.8, 1.2, 9, 3.6, 0, 0, 6.2832); x.fill();
    const bg = x.createLinearGradient(0, -3, 0, 3); bg.addColorStop(0, 'rgba(255,255,255,.55)'); bg.addColorStop(0.45, 'rgba(255,255,255,0)'); bg.addColorStop(1, 'rgba(0,0,0,.18)');
    x.fillStyle = INM_TIPOS_B[t].c; x.strokeStyle = 'rgba(0,0,0,.5)'; x.lineWidth = t >= 2 ? 2.2 : 1;
    x.beginPath(); x.moveTo(-6,-3); x.lineTo(6,-3); x.arc(6,0,3,-1.5708,1.5708); x.lineTo(-6,3); x.arc(-6,0,3,1.5708,4.7124); x.fill(); x.fillStyle = bg; x.fill(); x.stroke();
    if (t >= 2){ x.fillStyle = '#fff'; x.font = '700 6px sans-serif'; x.textAlign = 'center'; x.fillText('R', 0, 2.2); }
    x.restore(); } });
  cv.setAttribute('role','img');
  cv.setAttribute('aria-label', N <= 0 ? 'Placa sin bacterias.' : `Muestra de la población: ${b.map((v,i)=>INM_TIPOS_B[i].n.toLowerCase()+' '+inmPct(N?v/N:0,1)).join(', ')}.`);
}

/* =====================================================================
   7 · RETO FINAL
   ===================================================================== */
const INM_PREGUNTAS = [
  { q:'Tu primo tiene gripe y quiere tomar la amoxicilina que sobró de un tratamiento anterior. Con lo que viste en el modelo 3D, ¿por qué no le va a servir?',
    ops:['Porque el virus es tan pequeño que el antibiótico no alcanza a tocarlo.',
         'Porque la amoxicilina bloquea la construcción de la pared de peptidoglucano, y el virus no tiene pared, ni ribosomas, ni metabolismo propio que bloquear.',
         'Porque los virus de la gripe ya se volvieron resistentes a la amoxicilina.',
         'Sí le serviría si toma una dosis más alta.'],
    ok:1, fb:'El antibiótico actúa sobre estructuras que solo tienen las bacterias. El virus no las tiene: no hay nada que bloquear. Además, tomarlo sin necesidad selecciona bacterias resistentes en tu propia microbiota.',
    wrong:['El tamaño no es el problema: el antibiótico es una molécula mucho más pequeña que el virus. Lo que falta es el blanco. Vuelve al modelo y aplica la amoxicilina al virus.',
           'Para volverse resistente, primero hay que ser sensible. Los virus nunca fueron blanco de los antibióticos porque no tienen pared ni ribosomas.',
           'Más dosis no crea un blanco que no existe, y sí aumenta los efectos adversos y la presión de selección sobre tus bacterias.'] },
  { q:'En la gráfica de memoria, la primera exposición tarda unos 10 días en superar el nivel protector y llega a 100 unidades; la segunda lo supera en unos 2 días y llega a unas 1.000. ¿Qué explica la diferencia?',
    ops:['Que los anticuerpos de la primera vez se quedan para siempre en su nivel máximo.',
         'Que el microbio llega más débil la segunda vez.',
         'Que quedaron linfocitos B y T de memoria que ya reconocen ese antígeno y no hay que buscarlos desde cero.',
         'Que la segunda vez responde solo la inmunidad innata, que es más rápida.'],
    ok:2, fb:'Las células de memoria ya están seleccionadas y en mayor número: se activan de inmediato y producen más anticuerpos, y de mejor afinidad. Es la base de las vacunas y de los refuerzos.',
    wrong:['Mira la curva: después del pico los anticuerpos bajan. Lo que perdura son las células de memoria, no el nivel máximo de anticuerpos.',
           'El microbio es el mismo. Lo que cambió es tu sistema inmune.',
           'La innata es rápida pero no tiene memoria: responde igual la primera y la segunda vez. La mejora es de la respuesta adaptativa.'] },
  { q:'En el simulador pusiste 80 % de cobertura. Con gripe (R₀ = 1,5) el brote se apagó solo; con sarampión (R₀ = 15) hubo un brote grande. ¿Por qué?',
    ops:['Porque la vacuna del sarampión funciona peor que la de la gripe.',
         'Porque el umbral de inmunidad de grupo es 1 − 1/R₀: 33 % para la gripe y 93 % para el sarampión. Con 80 % se supera el primero, pero no el segundo.',
         'Porque con sarampión el azar fue desfavorable; repitiendo, se apagaría igual.',
         'Porque el sarampión solo afecta a los que no pueden vacunarse.'],
    ok:1, fb:'Cuanto más contagiosa es una enfermedad, más alta debe ser la cobertura para que cada caso contagie en promedio a menos de una persona. Por eso para el sarampión se pide 95 % con dos dosis.',
    wrong:['En el simulador la eficacia era la misma para las dos. Cambia solo el R₀ y la diferencia aparece igual.',
           'Repite varias veces con 80 % y sarampión: la mayoría de corridas terminan en brote grande. El azar mueve el detalle, no la tendencia.',
           'El brote alcanzó a muchas personas no vacunadas en general, no solo a los rombos. Los rombos son los que más dependen de los demás.'] },
  { q:'Un bebé de 3 meses aún no puede recibir la SRP (en el simulador, los rombos). ¿Qué lo protege del sarampión?',
    ops:['Que las personas a su alrededor estén vacunadas por encima del umbral: el virus no encuentra cadenas de contagio que lleguen hasta él.',
         'Que los anticuerpos de los vacunados pasan a él por el aire.',
         'Nada: si no está vacunado, se va a contagiar sí o sí.',
         'Que el sarampión no afecta a los bebés.'],
    ok:0, fb:'Es la inmunidad de grupo: cada persona vacunada es un eslabón que corta la cadena. Por encima del umbral, casi ningún rombo se contagia aunque ninguno esté vacunado.',
    wrong:['Los anticuerpos no viajan por el aire. Un bebé puede recibir algunos de su madre por la placenta y la leche, pero duran poco: la protección fuerte viene de que el virus no llegue.',
           'El simulador muestra lo contrario: con cobertura alta, la gran mayoría de rombos terminan el brote sin contagiarse.',
           'Los bebés son justamente de los más vulnerables al sarampión y a sus complicaciones.'] },
  { q:'Interrumpiste el tratamiento el día 3 porque te sentías mejor. La infección volvió y ahora el porcentaje de resistentes pasó de menos del 0,2 % a alrededor del 10 %. ¿Qué ocurrió?',
    ops:['Las bacterias se acostumbraron al antibiótico durante esos tres días.',
         'Tu cuerpo se volvió resistente al antibiótico.',
         'El antibiótico provocó las mutaciones de resistencia.',
         'El antibiótico eliminó primero a las más sensibles; las menos sensibles, que ya existían, sobrevivieron y se multiplicaron sin competencia.'],
    ok:3, fb:'Es selección natural en días: la variación ya estaba, el antibiótico solo cambió quién sobrevive. Por eso un tratamiento se toma exactamente como lo indica el médico.',
    wrong:['Ninguna bacteria "se acostumbra": las que sobrevivieron ya eran menos sensibles desde el inicio. Mira la placa del día 0: las marcadas con R estaban ahí.',
           'La que se vuelve resistente es la población de bacterias, no la persona.',
           'Las mutaciones ocurren al azar, con o sin antibiótico. El antibiótico no las encarga: solo elimina a las que no las tienen.'] },
  { q:'Una compañera dice que la vacuna de ARNm contra la COVID-19 "modifica el ADN". ¿Qué le respondes con base en lo que viste?',
    ops:['Tiene razón: el ARNm se integra en el ADN para producir la proteína de por vida.',
         'El ARNm lleva la receta de la espícula; tus ribosomas la fabrican por unos días y el ARNm se degrada. No entra al núcleo ni puede cambiar el ADN.',
         'La vacuna de ARNm contiene el virus atenuado, por eso funciona.',
         'La vacuna de ARNm trae anticuerpos ya hechos, por eso protege rápido.'],
    ok:1, fb:'El ARNm se queda en el citoplasma, donde están los ribosomas. Tu ADN está en el núcleo, y nuestras células no tienen la enzima que convierte ARN en ADN. La memoria que queda es de tus linfocitos, no del ARNm.',
    wrong:['El ARNm no se integra: se lee en el citoplasma y se degrada en días. La protección que perdura está en las células de memoria.',
           'Eso describe a las vacunas atenuadas, como la SRP. La de ARNm no trae ningún virus: solo instrucciones para una proteína.',
           'Recibir anticuerpos ya hechos es inmunidad pasiva, como un suero antiofídico, y no deja memoria. La vacuna hace que tú fabriques los tuyos.'] }
];

/* =====================================================================
   VISTA PRINCIPAL
   ===================================================================== */
function inmVista(view){
  view.classList.add('wide');
  const SEC = [
    { id:'microbios',  n:'1 · Bacterias y virus' },
    { id:'respuesta',  n:'2 · Respuesta inmune' },
    { id:'vacunas',    n:'3 · Vacunas' },
    { id:'grupo',      n:'4 · Inmunidad de grupo' },
    { id:'resistencia',n:'5 · Resistencia' },
    { id:'ecuador',    n:'6 · En el Ecuador' },
    { id:'reto',       n:'7 · Reto final' }
  ];
  const St = {
    sec:0, start:Date.now(), limpiar:[], post:[],
    parte:null, zoom:false, antib:null,
    paso:0, u:0, auto:false, playing:false,
    t2:90, logEsc:false, vacTipo:null, gemelos:false,
    herd:{ enf:'sarampion', R0:15, cov:0.85, eff:1, seed:inmSemilla(), previas:[], corridas:0, sim:null, barrido:null },
    res:{ plan:'corta', corta:3, sim:null, seed:inmSemilla(), segunda:false },
    marcas:{ modelo:false, antivirus:false, pasos:false, memoria:false, gemelos:false, tipos:false, rebano:false, umbral:false, cortado:false, completo:false }
  };
  const hecho0 = !!(Store.s.activities['reto-inmunidad'] && Store.s.activities['reto-inmunidad'].done);

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{},
      h('span',{class:'eyebrow anat'},'Sistemas humanos y salud · 9.º EGB · Biología BGU U6'),
      h('h1',{},'Microbios, defensas, vacunas y antibióticos'),
      h('p',{},'Compara una bacteria y un virus a escala, mira cómo se defiende tu cuerpo, provoca un brote en una población y decide si terminas o no un tratamiento. Primero lo haces ocurrir; después lo explicamos.')),
    h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
      h('span',{class:'pill anat'},'+150 XP · 50–70 min'),
      h('a',{class:'btn sm ghost',href:'#/explorar/celula-procariota'},'Célula procariota'),
      h('a',{class:'btn sm ghost',href:'#/microscopio'},'Microscopio'))));

  const retoSt = h('div',{class:'notice'+(hecho0?' ok':'')},
    hecho0 ? 'Reto resuelto ✓ · puedes volver a recorrer todas las secciones.' : 'Pendiente: llega a la sección 7 y responde las seis preguntas.');
  view.append(purposeBanner({
    proposito:'Explicar cómo se defiende el cuerpo de bacterias y virus, cómo una vacuna crea memoria sin enfermedad, por qué la vacunación protege también a quien no puede vacunarse, y por qué los antibióticos no sirven contra virus y se deben usar solo con receta y como se indica.',
    observa:[
      'Qué estructuras tiene la bacteria que al virus le faltan, y a qué escala está cada uno',
      'Que la segunda respuesta inmune llega antes y más alto que la primera',
      'En qué cobertura de vacunación el brote deja de crecer, y cómo cambia con el R₀',
      'Qué bacterias quedan vivas cuando se interrumpe un tratamiento'
    ],
    reto:'Prueba un antibiótico contra el virus, recorre la respuesta inmune, encuentra el umbral de inmunidad de grupo del sarampión, interrumpe un tratamiento y resuelve las seis preguntas del reto final.',
    statusEl: retoSt }));

  const nav = h('nav',{class:'inm-nav','aria-label':'Secciones del recurso'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);

  const tras = fn => St.post.push(fn);
  function soltar(){ St.limpiar.forEach(f => { try { f(); } catch(e){ console.warn(e); } }); St.limpiar = []; St.playing = false; }
  function renderNav(){
    nav.innerHTML = '';
    SEC.forEach((s,i) => nav.append(h('button',{ type:'button', 'aria-current':String(i===St.sec), onclick:()=>{ St.sec = i; render(); } }, s.n)));
  }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:8px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec = Math.max(0, St.sec-1); render(); view.scrollIntoView({block:'start'}); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec = Math.min(SEC.length-1, St.sec+1); render(); view.scrollIntoView({block:'start'}); }},'Siguiente →'));
  }

  /* =================================================================
     1 · BACTERIAS Y VIRUS
     ================================================================= */
  function secMicrobios(){
    const stage = h('div',{class:'stage inm-stage'});
    const panel = h('div',{class:'panel stack'});
    const info = h('div',{class:'stack',style:'gap:6px'});
    const lista = h('div',{class:'inm-parts',role:'group','aria-label':'Partes del modelo'});
    const resAb = h('div',{});
    let Esc = null;

    function elegir(id){
      St.parte = id; St.marcas.modelo = true;
      const p = INM_PARTES[id];
      $$('button', lista).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
      if (Esc){ try { Esc.E.select(id); } catch(e){} }
      info.innerHTML = '';
      info.append(
        h('span',{class:'eyebrow'}, p.org === 'bacteria' ? 'Bacteria' : 'Virus'),
        h('h3',{style:'margin:0'}, p.n),
        h('p',{class:'small',style:'margin:0'}, p.d),
        h('div',{class:'notice '+(p.org==='bacteria' && ['pared','ribosomas','adn'].includes(id) ? 'ok' : 'info')},
          h('span',{}, h('b',{},'¿Y los fármacos? '), p.ab)));
    }
    ['bacteria','virus'].forEach(org => {
      lista.append(h('span',{class:'inm-lab',style:'font-size:.74rem;color:var(--ink-3);font-weight:700;margin-top:4px'}, org === 'bacteria' ? 'Bacteria · 2 µm de largo' : 'Virus · 0,1 µm (100 nm)'));
      Object.entries(INM_PARTES).filter(([,p]) => p.org === org).forEach(([id,p]) =>
        lista.append(h('button',{type:'button','data-id':id,'aria-pressed':'false', onclick:()=>elegir(id)},
          h('i',{style:'background:'+p.c}), p.n)));
    });

    function aplicar(abId, org){
      const ab = INM_ANTIB.find(a => a.id === abId);
      St.antib = abId;
      resAb.innerHTML = '';
      if (org === 'virus'){
        St.marcas.antivirus = true;
        if (Esc){ Esc.antibiotico(null); if (!St.zoom){ St.zoom = true; Esc.setZoom(true); zoomBtn.setAttribute('aria-pressed','true'); zoomBtn.textContent = 'Volver a la escala real'; } }
        resAb.append(inmNota('warn', ab.n + ' contra el virus: no pasa nada.',
          'Busca su blanco —' + INM_PARTES[ab.blanco].n.toLowerCase() + '— y el virus no lo tiene. Mira la lista: envoltura, espículas, cápside y material genético. Nada de pared de peptidoglucano, nada de ribosomas propios, nada de ADN girasa. <b>Por eso un antibiótico no cura la gripe, el resfriado ni la COVID-19.</b>'));
      } else {
        if (Esc) Esc.antibiotico(ab.blanco);
        elegir(ab.blanco);
        resAb.append(inmNota('ok', ab.n + ' contra la bacteria: encontró su blanco.',
          INM_PARTES[ab.blanco].ab + (Esc ? ' En el modelo, la estructura afectada se ve atenuada.' : '')));
      }
      Store.log('simulacion',{ recurso:'inmunidad', antibiotico:abId, objetivo:org });
    }
    const abSel = { v:'penicilina' };
    const zoomBtn = h('button',{class:'btn sm', 'aria-pressed':String(St.zoom), onclick:()=>{
      St.zoom = !St.zoom; zoomBtn.setAttribute('aria-pressed', String(St.zoom));
      zoomBtn.textContent = St.zoom ? 'Volver a la escala real' : 'Ampliar solo el virus ×10';
      if (Esc) Esc.setZoom(St.zoom); }}, St.zoom ? 'Volver a la escala real' : 'Ampliar solo el virus ×10');

    if (webglOK){ try { Esc = inmEscena(stage, (id) => elegir(id)); } catch(e){ console.warn('inm 3D', e); Esc = null; } }
    if (!Esc){
      stage.classList.remove('inm-stage'); stage.style.height = 'auto'; stage.style.minHeight = '0'; stage.style.padding = '12px';
      stage.append(h('div',{class:'stack'}, h('div',{class:'notice info'},'Sin WebGL: aquí tienes el mismo esquema en 2D. Elige las partes en la lista de la derecha.'), h('div',{html:inmSvg2D()})));
    } else {
      stage.append(h('div',{class:'inm-escala','aria-hidden':'true'}, h('span',{},'1 µm'), h('i',{style:'width:64px'})));
      stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Arrastra para girar · rueda para acercar · flechas del teclado. El virus es el puntito a la derecha.')));
      St.limpiar.push(() => { Esc.dispose(); Esc = null; });
      if (St.zoom) setTimeout(() => Esc && Esc.setZoom(true), 30);
    }

    panel.append(
      h('span',{class:'eyebrow anat'},'Explora primero'),
      h('p',{class:'small',style:'margin:0'},'Elige una parte. Luego prueba un antibiótico contra cada microbio.'),
      Esc ? zoomBtn : null, lista, info);
    if (St.parte) setTimeout(() => elegir(St.parte), 40);
    else info.append(h('p',{class:'small muted'},'Sugerencia: empieza por la pared de la bacteria y después busca la pared del virus.'));

    const ctrlAb = h('div',{class:'card stack'},
      h('span',{class:'eyebrow anat'},'Experimento: ¿contra quién funciona un antibiótico?'),
      inmSeg('Antibiótico', INM_ANTIB.map(a => ({ v:a.id, n:a.n })), () => abSel.v, v => { abSel.v = v; }),
      h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
        h('button',{class:'btn primary sm', onclick:()=>aplicar(abSel.v, 'bacteria')},'Aplicar a la bacteria'),
        h('button',{class:'btn primary sm', onclick:()=>aplicar(abSel.v, 'virus')},'Aplicar al virus'),
        h('button',{class:'btn ghost sm', onclick:()=>{ if (Esc) Esc.antibiotico(null); resAb.innerHTML = ''; }},'Restablecer')),
      resAb);

    const tabla = h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},''), h('th',{},'Bacteria'), h('th',{},'Virus'))),
      h('tbody',{},
        h('tr',{}, h('td',{},'Tamaño típico'), h('td',{},'1 a 5 µm (se ve con microscopio óptico)'), h('td',{},'20 a 300 nm: de 10 a 100 veces más pequeño (hace falta microscopio electrónico)')),
        h('tr',{}, h('td',{},'¿Es una célula?'), h('td',{},'Sí: célula procariota, sin núcleo'), h('td',{},'No: es material genético dentro de una cubierta de proteínas')),
        h('tr',{}, h('td',{},'Cómo se reproduce'), h('td',{},'Sola, por división binaria'), h('td',{},'Solo dentro de una célula, usando sus ribosomas y su energía')),
        h('tr',{}, h('td',{},'Ribosomas y metabolismo'), h('td',{},'Propios (ribosomas 70S)'), h('td',{},'No tiene')),
        h('tr',{}, h('td',{},'Ejemplos de enfermedad'), h('td',{},'Faringitis estreptocócica, tuberculosis, infección urinaria, salmonelosis'), h('td',{},'Gripe, resfriado, sarampión, COVID-19, VPH, dengue')),
        h('tr',{}, h('td',{},'Cómo se combate'), h('td',{},'Sistema inmune; antibióticos cuando el médico lo indica; vacunas para algunas'), h('td',{},'Sistema inmune; vacunas; antivirales específicos para unos pocos virus')))));

    return h('div',{class:'stack'},
      h('div',{class:'viewer'}, stage, panel),
      ctrlAb,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Ahora sí, la explicación'),
        h('p',{},'A la misma escala, el virus es apenas un punto junto a la bacteria: un bacilo de 2 µm es unas veinte veces más largo que un virus de gripe. Pero la diferencia importante no es el tamaño: la bacteria es una célula viva con su propia maquinaria, y el virus no.'),
        tabla,
        depthBlock({ id:'inm-antibioticos',
          n1:'Un antibiótico es una sustancia que mata bacterias o frena su crecimiento atacando algo que las bacterias tienen y nuestras células no: la pared de peptidoglucano, los ribosomas 70S o ciertas enzimas. Los virus no tienen nada de eso, así que los antibióticos no les hacen nada.',
          n2:'Esa diferencia se llama toxicidad selectiva: el fármaco daña al microbio mucho más que a nosotros. Contra los virus es más difícil lograrla, porque usan la maquinaria de nuestras propias células; por eso hay pocos antivirales y cada uno sirve para virus concretos (por ejemplo, el oseltamivir para la gripe o los antirretrovirales para el VIH).',
          n3:'Las mitocondrias tienen ribosomas parecidos a los bacterianos, porque descienden de una bacteria antigua (teoría endosimbiótica). Eso explica algunos efectos adversos de ciertos antibióticos que actúan sobre el ribosoma. No todas las bacterias son dañinas: en tu intestino viven billones que te ayudan, y los antibióticos también las afectan.' }),
        h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
          h('a',{class:'btn sm',href:'#/explorar/celula-procariota'},'Ver la célula procariota en detalle'),
          h('a',{class:'btn sm',href:'#/microscopio'},'Observar bacterias al microscopio'),
          h('a',{class:'btn sm ghost',href:'#/mision/diagnostico-celular'},'Misión: diagnóstico celular'))),
      secNav());
  }

  /* =================================================================
     2 · RESPUESTA INMUNE Y MEMORIA
     ================================================================= */
  function secRespuesta(){
    const cv = h('canvas',{class:'inm-cv',role:'img'});
    const fase = h('div',{class:'inm-fase','aria-live':'polite'});
    const escena = h('div',{style:'position:relative'}, cv, fase);
    const pasosEl = h('div',{class:'inm-steps',role:'group','aria-label':'Pasos de la respuesta inmune'});
    const textoPaso = h('div',{class:'stack',style:'gap:6px'});
    const playBtn = h('button',{class:'btn primary sm'});
    let raf = 0, last = 0, T = 0;

    function pintarTexto(){
      const P = INM_PASOS[St.paso];
      fase.textContent = P.fase;
      $$('button', pasosEl).forEach((b,i) => b.setAttribute('aria-current', String(i === St.paso)));
      textoPaso.innerHTML = '';
      textoPaso.append(h('h3',{style:'margin:0'}, (St.paso+1) + ' · ' + P.n),
        depthBlock({ id:'inm-paso-'+St.paso, n1:P.t, n2:P.n2, n3:P.n3 }));
      if (St.paso === INM_PASOS.length-1) St.marcas.pasos = true;
      playBtn.textContent = St.playing ? '⏸ Pausar' : (St.auto || St.u >= 1 ? '▶ Reproducir todo' : '▶ Reproducir');
      playBtn.disabled = inmQuieto() || null;
    }
    function dibujar(){ inmDibujaPaso(cv, St.paso, St.u, T); }
    function bucle(ts){
      if (!St.playing){ raf = 0; return; }
      const dt = last ? Math.min(0.05, (ts - last)/1000) : 0; last = ts; T += dt;
      St.u += dt/6;
      if (St.u >= 1){
        if (St.auto && St.paso < INM_PASOS.length-1){ St.paso++; St.u = 0; pintarTexto(); }
        else { St.u = 1; St.playing = false; St.auto = false; dibujar(); pintarTexto(); raf = 0; return; }
      }
      dibujar();
      raf = requestAnimationFrame(bucle);
    }
    function arrancar(auto){
      if (inmQuieto()){ St.u = 1; dibujar(); pintarTexto(); return; }
      St.auto = auto; St.playing = true; last = 0;
      if (!raf) raf = requestAnimationFrame(bucle);
      pintarTexto();
    }
    function irA(i, animar){
      St.paso = clamp(i, 0, INM_PASOS.length-1); St.u = 0; St.auto = false;
      if (animar && !inmQuieto()) arrancar(false); else { St.u = 1; St.playing = false; dibujar(); pintarTexto(); }
    }
    INM_PASOS.forEach((p,i) => pasosEl.append(h('button',{type:'button',class:'inm-step', onclick:()=>irA(i, true)}, (i+1)+' · '+p.n)));
    playBtn.onclick = () => {
      if (St.playing){ St.playing = false; pintarTexto(); return; }
      if (St.u >= 1 && St.paso === INM_PASOS.length-1){ St.paso = 0; St.u = 0; }
      arrancar(true);
    };
    St.limpiar.push(() => { St.playing = false; if (raf) cancelAnimationFrame(raf); raf = 0; });

    /* ---- memoria inmunológica ---- */
    const cvM = h('canvas',{}), cvC = h('canvas',{});
    const lect = h('dl',{class:'inm-kv'});
    const UMBRAL = 50;
    const sl = inmSlider('inm-t2','Segunda exposición el día', 40, 200, 5, St.t2, v => 'día '+Math.round(v), v => { St.t2 = v; St.marcas.memoria = true; pintarMemoria(); });
    function pintarMemoria(){
      const dias = Math.ceil((St.t2 + 45)/25)*25;
      const tr = v => St.logEsc ? Math.log10(Math.max(1, v)) : v;
      const curva = inmCurva(St.t2, dias).map(p => ({ x:p.x, y:tr(p.y) }));
      const fn = t => inmResp(t,0,false) + inmResp(t,St.t2,true);
      const d1 = inmCruce(fn, 0, UMBRAL), d2 = inmCruce(fn, St.t2, UMBRAL);
      let p1 = 0, p2 = 0; for (let t=0;t<St.t2;t+=0.5) p1 = Math.max(p1, fn(t)); for (let t=St.t2;t<=dias;t+=0.5) p2 = Math.max(p2, fn(t));
      const ymax = St.logEsc ? 4 : 1200;
      lineChart(cvM, { series:[
        { pts:[{x:0,y:tr(UMBRAL)},{x:dias,y:tr(UMBRAL)}], color:inmCol('--ink-3','#888'), label:'nivel protector' },
        { pts:curva, color:inmCol('--accent','#2E6BD8'), label:'' },
        { pts:[{x:0,y:0},{x:0.01,y:ymax*0.96}], color:inmCol('--warn','#E0891A'), label:'' },
        { pts:[{x:St.t2,y:0},{x:St.t2+0.01,y:ymax*0.96}], color:inmCol('--bad','#D8452F'), label:'' }
      ], xlabel:'días', ylabel: St.logEsc ? 'anticuerpos (escala logarítmica)' : 'anticuerpos (unidades relativas)',
        ymin:0, ymax, xmin:0, xmax:dias, xticks:dias/25, xfmt:v=>String(Math.round(v)), yfmt: St.logEsc ? (v => inmMil(Math.pow(10,v))) : (v => inmMil(v)) });
      /* comparación superpuesta: días desde cada contacto */
      const a1 = [], a2 = [];
      for (let d=0; d<=30; d+=0.5){ a1.push({ x:d, y:tr(inmResp(d,0,false)) }); a2.push({ x:d, y:tr(inmResp(d,0,true) + inmResp(St.t2+d,0,false)) }); }
      lineChart(cvC, { series:[
        { pts:[{x:0,y:tr(UMBRAL)},{x:30,y:tr(UMBRAL)}], color:inmCol('--ink-3','#888'), label:'' },
        { pts:a1, color:inmCol('--warn','#E0891A'), label:'1.ª' },
        { pts:a2, color:inmCol('--bad','#D8452F'), label:'2.ª' }
      ], xlabel:'días desde el contacto', ylabel:'anticuerpos', ymin:0, ymax, xmin:0, xmax:30, xticks:6, xfmt:v=>String(Math.round(v)), yfmt: St.logEsc ? (v => inmMil(Math.pow(10,v))) : (v => inmMil(v)) });
      lect.innerHTML = '';
      lect.append(
        h('dt',{},'1.ª exposición · días hasta el nivel protector'), h('dd',{}, d1 === null ? '—' : inmN(d1,1)+' días'),
        h('dt',{},'1.ª exposición · máximo'), h('dd',{}, inmMil(p1)),
        h('dt',{},'2.ª exposición · días hasta el nivel protector'), h('dd',{}, d2 === null ? '—' : inmN(d2,1)+' días'),
        h('dt',{},'2.ª exposición · máximo'), h('dd',{}, inmMil(p2)),
        h('dt',{},'La 2.ª es'), h('dd',{}, (d1 && d2 ? inmN(d1/Math.max(0.1,d2),1)+' veces más rápida y ' : '') + inmN(p2/Math.max(1,p1),0)+' veces más alta'));
    }
    tras(() => { dibujar(); pintarTexto(); pintarMemoria(); if (!inmQuieto()) arrancar(false); });

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Una herida en la piel, paso a paso'),
        h('p',{class:'small muted',style:'margin:0'},'Reproduce toda la secuencia o salta a un paso. Cada figura lleva forma y letra, no solo color: bacilo verde = bacteria; célula con núcleo en lóbulos = neutrófilo; célula grande = macrófago; estrella = célula dendrítica; B, P, Th, Tc = linfocitos; Y azul = anticuerpo; M = memoria.'),
        escena,
        h('div',{class:'row',style:'flex-wrap:wrap;gap:6px;align-items:center'},
          h('button',{class:'btn sm', onclick:()=>irA(St.paso-1, false)},'← Paso anterior'),
          playBtn,
          h('button',{class:'btn sm', onclick:()=>irA(St.paso+1, true)},'Paso siguiente →')),
        pasosEl,
        inmQuieto() ? inmNota('info','Animación en pausa:','tienes activada la opción de menos movimiento. Cada paso se muestra como una imagen fija; usa los botones para avanzar.') : null),
      h('div',{class:'card stack'}, textoPaso),
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Respuesta innata'),
          h('p',{class:'small',style:'margin:0'},'Barreras, inflamación, fiebre y fagocitos. Actúa en minutos u horas, es igual para cualquier microbio y no deja memoria.')),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Respuesta adaptativa'),
          h('p',{class:'small',style:'margin:0'},'Linfocitos B (anticuerpos) y linfocitos T (colaboradores y citotóxicos). Tarda días la primera vez, es específica para cada antígeno y deja memoria.'))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Memoria inmunológica: el mismo microbio, dos veces'),
        h('p',{},'La gráfica sigue el nivel de anticuerpos contra un microbio. El día 0 es el primer contacto; mueve el deslizador para elegir cuándo llega el segundo. Compara las dos subidas.'),
        sl.el,
        h('label',{class:'row',style:'gap:6px;font-size:.84rem'}, h('input',{type:'checkbox', checked:St.logEsc || null, onchange:e=>{ St.logEsc = e.target.checked; pintarMemoria(); }}), 'Escala logarítmica (para comparar mejor los dos picos)'),
        h('div',{class:'inm-chart'}, cvM),
        h('div',{class:'inm-lg'},
          h('span',{}, h('i',{style:'background:'+inmCol('--accent','#2E6BD8')}),'Anticuerpos en sangre'),
          h('span',{}, h('i',{style:'background:'+inmCol('--warn','#E0891A')}),'1.ª exposición'),
          h('span',{}, h('i',{style:'background:'+inmCol('--bad','#D8452F')}),'2.ª exposición'),
          h('span',{}, h('i',{style:'background:'+inmCol('--ink-3','#888')}),'Nivel protector')),
        h('span',{class:'eyebrow',style:'margin-top:6px'},'Las dos respuestas superpuestas'),
        h('div',{class:'inm-chart'}, cvC),
        lect,
        inmNota('ok','Lo que muestra la curva:','La primera vez hay una espera de casi una semana antes de que suban los anticuerpos: es el tiempo que toma encontrar y multiplicar a los linfocitos que encajan. Mientras tanto, el microbio avanza y te enfermas. La segunda vez, las <b>células de memoria</b> ya están listas: la respuesta supera el nivel protector en unos dos días y es mucho más alta. Muchas veces el microbio es eliminado antes de que notes síntomas.'),
        h('p',{class:'small muted',style:'margin:0'},'Modelo simplificado con valores relativos: la forma de las curvas es la que se mide en personas, pero los números exactos cambian según el microbio y la persona.')),
      secNav());
  }

  /* =================================================================
     3 · VACUNAS
     ================================================================= */
  function secVacunas(){
    const cvG = h('canvas',{});
    const lectG = h('div',{});
    const gemBtn = h('button',{class:'btn primary', onclick:()=>{ St.gemelos = true; St.marcas.gemelos = true; pintarGemelos(); }},'Exponer a los dos al mismo virus');
    function pintarGemelos(){
      const a = inmInfeccion(false), b = inmInfeccion(true);
      const umbral = 4;
      const series = [{ pts:[{x:0,y:umbral},{x:30,y:umbral}], color:inmCol('--ink-3','#888'), label:'aparecen síntomas' }];
      if (St.gemelos){ series.push({ pts:a.carga, color:inmCol('--bad','#D8452F'), label:'' }, { pts:b.carga, color:inmCol('--accent','#2E6BD8'), label:'' }); }
      lineChart(cvG, { series, xlabel:'días desde el contacto', ylabel:'cantidad de virus en el cuerpo', ymin:0, ymax:8, xmin:0, xmax:30, xticks:6, xfmt:v=>String(Math.round(v)), yfmt:v => v < 0.5 ? '0' : '10^'+Math.round(v) });
      lectG.innerHTML = '';
      if (!St.gemelos){ lectG.append(h('p',{class:'small muted'},'Todavía no pasa nada: pulsa el botón.')); return; }
      const dias = s => s.carga.filter(p => p.y >= umbral).length*0.5;
      const pico = s => Math.max(...s.carga.map(p=>p.y));
      lectG.append(h('dl',{class:'inm-kv'},
        h('dt',{},'Sin vacuna · días con síntomas'), h('dd',{}, inmN(dias(a),1)),
        h('dt',{},'Sin vacuna · máximo de virus'), h('dd',{}, '≈ '+inmGrande(Math.pow(10, pico(a)))),
        h('dt',{},'Vacunada · días con síntomas'), h('dd',{}, inmN(dias(b),1)),
        h('dt',{},'Vacunada · máximo de virus'), h('dd',{}, '≈ '+inmGrande(Math.pow(10, pico(b))) + (pico(b) <= 2.05 ? ' (no pasó de lo que entró)' : ''))),
        inmNota('ok','¿Qué cambió?','Las dos recibieron el mismo virus el mismo día. La que estaba vacunada ya tenía <b>células de memoria</b>: su respuesta fue la segunda curva de la sección anterior, y eliminó al virus antes de que se multiplicara lo suficiente para dar síntomas. La vacuna fue su "primera exposición", pero sin enfermedad.'));
    }
    tras(pintarGemelos);

    const detalle = h('div',{class:'stack'});
    const botones = h('div',{class:'inm-vac',role:'group','aria-label':'Tipos de vacuna'});
    const vistos = new Set();
    function elegirVac(id){
      St.vacTipo = id; vistos.add(id); if (vistos.size >= 2) St.marcas.tipos = true;
      $$('button', botones).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
      const v = INM_VACUNAS.find(x => x.id === id);
      detalle.innerHTML = '';
      detalle.append(h('div',{class:'card stack'},
        h('h3',{style:'margin:0'}, 'Vacunas ' + v.n.toLowerCase()),
        h('div',{class:'grid g2'},
          h('div',{class:'stack',style:'gap:4px'}, h('span',{class:'eyebrow'},'Qué contiene'), h('p',{class:'small',style:'margin:0'}, v.que)),
          h('div',{class:'stack',style:'gap:4px'}, h('span',{class:'eyebrow'},'Cómo crea memoria'), h('p',{class:'small',style:'margin:0'}, v.como))),
        h('p',{class:'small',style:'margin:0'}, h('b',{},'Ejemplos: '), v.ej),
        inmNota('info','A tener en cuenta:', v.ojo)));
    }
    INM_VACUNAS.forEach(v => botones.append(h('button',{type:'button','data-id':v.id,'aria-pressed':'false', onclick:()=>elegirVac(v.id)},
      h('span',{html:v.icon}), h('span',{}, v.n), h('small',{class:'muted',style:'font-weight:400'}, v.sub))));
    if (St.vacTipo) setTimeout(() => elegirVac(St.vacTipo), 0);

    const mitos = h('div',{class:'stack'});
    INM_MITOS.forEach(m => mitos.append(h('div',{class:'inm-mito'},
      h('h4',{},'✗ '+m.mal),
      h('div',{class:'inm-ok'}, h('b',{},'Lo que muestra la evidencia. '), m.bien),
      h('p',{class:'small muted',style:'margin:0'}, m.por))));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Explora primero: dos hermanas gemelas y el mismo virus'),
        h('p',{},'Ana y Belén son gemelas: mismo ADN, misma edad, misma salud. Belén recibió la vacuna hace meses; Ana, no. El mismo día, las dos respiran el mismo virus. ¿Qué pasa dentro de cada una?'),
        gemBtn,
        h('div',{class:'inm-chart'}, cvG),
        h('div',{class:'inm-lg'},
          h('span',{}, h('i',{style:'background:'+inmCol('--bad','#D8452F')}),'Ana, sin vacuna'),
          h('span',{}, h('i',{style:'background:'+inmCol('--accent','#2E6BD8')}),'Belén, vacunada'),
          h('span',{}, h('i',{style:'background:'+inmCol('--ink-3','#888')}),'Por encima de esta línea hay síntomas')),
        lectG),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Qué es una vacuna'),
        h('p',{},'Una vacuna le muestra al sistema inmune un antígeno del microbio —el microbio debilitado, muerto, una pieza o las instrucciones para fabricar esa pieza— sin causar la enfermedad. El cuerpo responde como en una primera exposición y guarda células de memoria. Cuando llega el microbio de verdad, la respuesta es la segunda curva: rápida y alta.'),
        h('p',{class:'small muted',style:'margin:0'},'Además del antígeno, un vial puede llevar un adyuvante (refuerza la señal), sales o azúcares que lo estabilizan y agua. Todo en cantidades muy pequeñas y estudiadas.'),
        h('span',{class:'eyebrow',style:'margin-top:4px'},'Cuatro formas de enseñarle al sistema inmune · elige una'),
        botones),
      detalle,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Por qué a veces hacen falta varias dosis y refuerzos'),
        depthBlock({ id:'inm-dosis',
          n1:'Cada dosis es como una nueva exposición: la segunda y la tercera generan una respuesta más alta y más duradera, igual que en la curva de memoria. Por eso el esquema pide varias dosis a los 2, 4 y 6 meses.',
          n2:'Las vacunas que no se multiplican (inactivadas y de subunidades) dan una señal más débil y necesitan más dosis. Algunas protecciones bajan con los años —como la del tétanos— y se recuperan con un refuerzo. La de la gripe se aplica cada año porque el virus cambia sus espículas.',
          n3:'La duración depende de cuántas células plasmáticas de vida larga y células de memoria se formen. Los refuerzos se programan con datos de vigilancia: cuando los anticuerpos de la población bajan del nivel protector o aparecen brotes en personas vacunadas hace mucho tiempo.' })),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Dudas frecuentes, con respeto y con evidencia'),
        h('p',{class:'small'},'Tener dudas sobre lo que te inyectan es razonable: es tu cuerpo. La respuesta de la ciencia no es "créelo porque sí", sino "mira cómo se comprobó". Estas son las dudas más comunes y lo que dicen los datos.'),
        mitos,
        h('p',{class:'small muted',style:'margin:0'},'Las vacunas sí pueden tener efectos adversos: los más comunes son dolor en el brazo y fiebre leve; las reacciones graves, como una alergia fuerte, son muy raras (alrededor de 1 por cada millón de dosis) y por eso se espera un rato en el centro de salud después de vacunarse.')),
      secNav());
  }

  /* =================================================================
     4 · INMUNIDAD DE GRUPO
     ================================================================= */
  function secGrupo(){
    const H = St.herd;
    const cv = h('canvas',{style:'width:100%;max-width:640px;display:block;margin:0 auto;border:1px solid var(--line);border-radius:10px'});
    const cvC = h('canvas',{}), cvB = h('canvas',{});
    const lect = h('dl',{class:'inm-kv'});
    const runsEl = h('div',{class:'inm-runs'});
    const umbralBox = h('div',{});
    const barridoBox = h('div',{class:'stack'});
    let corriendo = false, timer = 0;
    St.limpiar.push(() => { clearTimeout(timer); corriendo = false; });

    const cfg = () => ({ R0:H.R0, cov:H.cov, eff:H.eff });
    const thr = () => Math.max(0, 1 - 1/H.R0);
    function nueva(){ H.sim = inmHerdNueva(cfg(), H.seed); }
    if (!H.sim) nueva();

    function pintar(){
      const s = H.sim;
      inmHerdPinta(cv, s);
      let act = 0; for (let i=0;i<s.st.length;i++) if (s.st[i] === 2) act++;
      const noVinf = inmHerdNoVac(s);
      const Re = H.R0 * (1 - Math.min(0.97, H.cov)*H.eff);
      lect.innerHTML = '';
      lect.append(
        h('dt',{},'Día'), h('dd',{}, String(s.dia) + (s.fin && s.dia > 0 ? ' · brote terminado' : '')),
        h('dt',{},'Infección activa ahora'), h('dd',{}, inmMil(act)),
        h('dt',{},'Contagiadas en total'), h('dd',{}, inmMil(s.total) + ' de ' + inmMil(s.st.length) + ' (' + inmPct(s.total/s.st.length,1) + ')'),
        h('dt',{},'Rombos (no pueden vacunarse) contagiados'), h('dd',{}, noVinf + ' de ' + s.noVacTot),
        h('dt',{},'Contagios por caso al inicio'), h('dd',{}, inmN(Re,1) + (Re < 1 ? ' → menos de 1' : ' → más de 1')));
      const gris = inmCol('--ink-3','#999');
      const series = H.previas.map(p => ({ pts:p.serie, color:gris, label:'' }));
      series.push({ pts:s.serie, color:inmCol('--bad','#D8452F'), label:'', dots:false });
      const ymax = Math.max(40, ...H.previas.map(p => Math.max(...p.serie.map(q=>q.y))), ...s.serie.map(q=>q.y));
      const xmx = Math.ceil(Math.max(60, s.dia, ...H.previas.map(p => p.serie.length))/20)*20;
      lineChart(cvC, { series, xlabel:'días', ylabel:'personas con infección activa', ymin:0, ymax:Math.ceil(ymax*1.1/20)*20, xmin:0,
        xmax:xmx, xticks:xmx/20, xfmt:v=>String(Math.round(v)), yfmt:v=>inmMil(v) });
      runsEl.innerHTML = '';
      runsEl.append(h('span',{},'Corridas: '+H.corridas));
      H.previas.slice(-6).forEach(p => runsEl.append(h('span',{}, p.etq)));
      pintarUmbral();
    }
    function pintarUmbral(){
      umbralBox.innerHTML = '';
      if (H.corridas < 2 && !H.barrido){ umbralBox.append(inmNota('info','Tu tarea:','Corre el brote al menos dos veces con coberturas distintas. Busca a partir de qué porcentaje de vacunados el brote se apaga solo. Después aparecerá aquí la explicación.')); return; }
      St.marcas.umbral = St.marcas.umbral || H.corridas >= 3;
      umbralBox.append(h('div',{class:'notice ok'}, h('span',{html:
        '<b>El umbral de inmunidad de grupo.</b> Si cada persona infectada contagia en promedio a R₀ personas cuando nadie es inmune, el brote se apaga cuando la fracción inmune es tal que cada caso contagia a menos de una: <b>umbral = 1 − 1/R₀</b>. Con R₀ = ' + inmN(H.R0,1) + ', el umbral es <b>' + inmPct(thr(),1) + '</b>' +
        (H.eff < 1 ? '; y como la vacuna protege al ' + inmPct(H.eff) + ', la cobertura necesaria sube a ' + (thr()/H.eff > 0.97 ? 'más de lo que se puede alcanzar aquí' : inmPct(thr()/H.eff,1)) : '') +
        '. Por debajo, el brote puede crecer; por encima, se apaga aunque haya personas sin vacunar.'})));
    }
    function correr(){
      if (corriendo) return;
      if (H.sim.dia > 0 || H.sim.fin){ H.seed = inmSemilla(); nueva(); }
      corriendo = true; St.marcas.rebano = true;
      const fin = () => {
        corriendo = false;
        H.corridas++;
        H.previas.push({ serie:H.sim.serie.slice(), etq: INM_ENF.find(e=>e.R0===H.R0)?.n.split(' ')[0] + ' · ' + inmPct(H.cov) + ' → ' + inmPct(H.sim.total/H.sim.st.length) });
        if (H.previas.length > 6) H.previas.shift();
        H.previas = H.previas.slice(); pintar();
        Store.log('simulacion',{ recurso:'inmunidad-grupo', R0:H.R0, cobertura:H.cov, eficacia:H.eff, contagiados:H.sim.total });
      };
      if (inmQuieto()){ while (!H.sim.fin) inmHerdDia(H.sim); fin(); return; }
      const paso = () => {
        if (!corriendo) return;
        for (let k=0;k<2;k++) inmHerdDia(H.sim);
        pintarVivo();
        if (H.sim.fin) fin(); else timer = setTimeout(paso, 60);
      };
      paso();
    }
    function pintarVivo(){   /* durante la animación solo se pinta el tablero y la curva actual */
      inmHerdPinta(cv, H.sim);
      const s = H.sim; let act = 0; for (let i=0;i<s.st.length;i++) if (s.st[i] === 2) act++;
      lect.children[1] && (lect.children[1].textContent = String(s.dia));
      lect.children[3] && (lect.children[3].textContent = inmMil(act));
      lect.children[5] && (lect.children[5].textContent = inmMil(s.total) + ' de ' + inmMil(s.st.length));
    }
    function barrido(){
      St.marcas.umbral = true;
      const covs = []; for (let c=0;c<=0.95001;c+=0.05) covs.push(Math.round(c*100)/100);
      const pts = covs.map(c => { let s = 0; for (let r=0;r<3;r++) s += inmHerdCorre({ R0:H.R0, cov:c, eff:H.eff }, inmSemilla()).total; return { x:c*100, y:s/3/(INM_LADO*INM_LADO)*100 }; });
      H.barrido = { pts, R0:H.R0, eff:H.eff };
      pintarBarrido(); pintarUmbral();
    }
    function pintarBarrido(){
      barridoBox.innerHTML = '';
      if (!H.barrido) return;
      const B = H.barrido, t = Math.max(0, 1 - 1/B.R0)*100/B.eff;
      barridoBox.append(h('span',{class:'eyebrow'},'Barrido: porcentaje de la población que se contagió según la cobertura (promedio de 3 corridas por punto) · R₀ = '+inmN(B.R0,1)),
        h('div',{class:'inm-chart'}, cvB),
        h('div',{class:'inm-lg'}, h('span',{}, h('i',{style:'background:'+inmCol('--bad','#D8452F')}),'Contagiados (%)'), h('span',{}, h('i',{style:'background:'+inmCol('--ok','#2E9E5B')}),'Umbral teórico 1 − 1/R₀' + (B.eff < 1 ? ' corregido por la eficacia' : ''))));
      setTimeout(() => lineChart(cvB, { series:[
        { pts:B.pts, color:inmCol('--bad','#D8452F'), label:'', dots:true },
        ...(t <= 100 ? [{ pts:[{x:t,y:0},{x:t+0.01,y:100}], color:inmCol('--ok','#2E9E5B'), label:'umbral '+inmN(t,0)+' %' }] : [])
      ], xlabel:'cobertura de vacunación (%)', ylabel:'contagiados (%)', ymin:0, ymax:100, xmin:0, xmax:100, xfmt:v=>inmN(v,0), yfmt:v=>inmN(v,0) }), 0);
    }

    const slR0 = inmSlider('inm-r0','R₀ (contagiosidad)', 1, 18, 0.5, H.R0, v => inmN(v,1), v => { H.R0 = v; nueva(); pintar(); });
    const slCov = inmSlider('inm-cov','Cobertura de vacunación', 0, 97, 1, Math.round(H.cov*100), v => inmN(v,0)+' %', v => { H.cov = v/100; nueva(); pintar(); });
    const enfSeg = inmSeg('Enfermedad', INM_ENF.map(e => ({ v:e.id, n:e.n+' · '+inmN(e.R0,1), t:e.t })), () => H.enf, v => { H.enf = v; H.R0 = INM_ENF.find(e=>e.id===v).R0; slR0.set(H.R0); nueva(); pintar(); });
    const effSeg = inmSeg('Eficacia de la vacuna', [
      { v:'1', n:'100 %', t:'Modelo ideal' }, { v:'0.95', n:'95 %', t:'Parecida a dos dosis de SRP (≈ 97 %)' }, { v:'0.6', n:'60 %', t:'Parecida a la vacuna de la gripe en una buena temporada' }
    ], () => String(H.eff), v => { H.eff = parseFloat(v); nueva(); pintar(); });

    const leyenda = h('div',{class:'inm-lg'},
      h('span',{html:INM_ICO.susc+' Sin vacunar, sin contagiar'}),
      h('span',{html:INM_ICO.vac+' Vacunada y protegida'}),
      h('span',{html:INM_ICO.vacF+' Vacunada, pero la vacuna no la protegió'}),
      h('span',{html:INM_ICO.inf+' Infección activa'}),
      h('span',{html:INM_ICO.rec+' Ya se recuperó'}),
      h('span',{html:INM_ICO.noV+' No puede vacunarse (bebé, persona inmunodeprimida)'}));

    tras(pintar); tras(pintarBarrido);

    return h('div',{class:'stack'},
      h('div',{class:'grid g2',style:'align-items:start'},
        h('div',{class:'card stack'},
          h('span',{class:'eyebrow anat'},'Una comunidad de 1.600 personas'),
          cv, leyenda),
        h('div',{class:'card stack'},
          h('span',{class:'eyebrow anat'},'Controles'),
          enfSeg, slR0.el, slCov.el, effSeg,
          h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
            h('button',{class:'btn primary', onclick:correr},'Soltar 4 casos y ver el brote'),
            h('button',{class:'btn sm ghost', onclick:()=>{ clearTimeout(timer); corriendo = false; H.seed = inmSemilla(); nueva(); pintar(); }},'Nueva población'),
            h('button',{class:'btn sm ghost', onclick:()=>{ H.previas = []; H.corridas = 0; pintar(); }},'Borrar corridas')),
          lect,
          h('p',{class:'small muted',style:'margin:0'},'Cada persona contagia durante 7 días a la mitad de sus contactos cerca de casa y a la otra mitad en cualquier parte de la comunidad. El 3 % no puede vacunarse. Hay azar: al repetir, el brote cambia.'))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Casos activos día a día'),
        h('div',{class:'inm-chart'}, cvC),
        h('div',{class:'inm-lg'}, h('span',{}, h('i',{style:'background:'+inmCol('--bad','#D8452F')}),'Corrida actual'), h('span',{}, h('i',{style:'background:'+inmCol('--ink-3','#999')}),'Corridas anteriores')),
        runsEl,
        inmNota('warn','Haz esto:','Elige sarampión y prueba con 70 %, 85 %, 90 % y 95 % de cobertura. Repite cada una dos veces. Después cambia a gripe y busca la cobertura mínima que apaga el brote. ¿Coinciden?'),
        h('button',{class:'btn sm inm-wrap', onclick:barrido},'Barrido automático de coberturas para esta enfermedad'),
        barridoBox,
        umbralBox),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Por qué protege a quien no puede vacunarse'),
        h('p',{},'Fíjate en los rombos: bebés demasiado pequeños para ciertas vacunas, personas en tratamiento contra el cáncer o con defensas muy bajas. Ellos no pueden vacunarse. Por encima del umbral casi ninguno se contagia, aunque nadie los haya vacunado: el virus no encuentra cadenas de contagio que lleguen hasta ellos. Por debajo, son de los primeros en caer.'),
        depthBlock({ id:'inm-umbral',
          n1:'Cuanto más contagiosa es una enfermedad, más personas tienen que estar vacunadas para frenarla. Con el sarampión hace falta alrededor del 95 %; con la gripe, bastante menos.',
          n2:'El umbral sale de pedir que cada caso contagie a menos de una persona: R₀ × (fracción que aún puede contagiarse) < 1. Si la fracción inmune es p, queda R₀ × (1 − p) < 1, es decir, p > 1 − 1/R₀. Para el sarampión (R₀ ≈ 15) da 93 %; para la gripe (R₀ ≈ 1,5), 33 %.',
          n3:'El modelo supone que la población se mezcla de forma homogénea. En la realidad, si los no vacunados viven agrupados —una escuela, un barrio—, allí la cobertura local cae por debajo del umbral y puede haber brotes aunque el promedio del país sea alto. Además, la vacuna de la gripe tiene eficacia moderada y el virus cambia cada año, así que la inmunidad de grupo contra la gripe es mucho más difícil de alcanzar.' })),
      secNav());
  }

  /* =================================================================
     5 · RESISTENCIA A ANTIBIÓTICOS
     ================================================================= */
  function secResistencia(){
    const RS = St.res;
    const placa0 = h('canvas',{style:'width:100%;display:block'}), placa = h('canvas',{style:'width:100%;display:block'});
    const cvR = h('canvas',{});
    const estado = h('div',{class:'notice info'});
    const barras = h('div',{class:'inm-bars'});
    const lect = h('dl',{class:'inm-kv'});
    const segundaBox = h('div',{});
    let timer = 0, corriendo = false;
    St.limpiar.push(() => { clearTimeout(timer); corriendo = false; });

    const planObj = () => ({ tipo:RS.plan, corta:RS.corta, desde:0 });
    function nueva(){ RS.sim = inmBactNueva(RS.seed); RS.b0 = RS.sim.b.slice(); RS.segunda = false; RS.inicio2 = null; }
    if (!RS.sim) nueva();

    function pintarBarras(b){
      barras.innerHTML = '';
      const N = b.reduce((a,v)=>a+v,0);
      INM_TIPOS_B.forEach((t,i) => { const f = N ? b[i]/N : 0;
        barras.append(h('div',{class:'inm-bar'}, h('span',{}, (i>=2?'R · ':'') + t.n),
          h('span',{class:'tr',role:'img','aria-label':t.n+': '+inmPct(f,2)}, h('i',{style:`width:${Math.max(f>0?1:0, f*100)}%;background:${t.c}`})),
          h('span',{class:'n'}, inmPct(f, f < 0.01 && f > 0 ? 2 : 1)))); });
    }
    function pintar(){
      const s = RS.sim, b = s.b, N = b.reduce((a,v)=>a+v,0);
      inmPintaPlaca(placa0, RS.b0); inmPintaPlaca(placa, b); pintarBarras(b);
      const u = s.serie[s.serie.length-1];
      lect.innerHTML = '';
      lect.append(
        h('dt',{},'Día'), h('dd',{}, String(s.dia)),
        h('dt',{},'Bacterias en la infección'), h('dd',{}, N ? '≈ '+inmGrande(N) : '0'),
        h('dt',{},'Resistentes (R)'), h('dd',{}, N ? inmPct((b[2]+b[3])/N, 1) : '—'),
        h('dt',{},'Resistentes al inicio'), h('dd',{}, inmPct((RS.b0[2]+RS.b0[3])/RS.b0.reduce((a,v)=>a+v,0), 2)));
      /* estado de la persona */
      let cls = 'info', txt = 'Día 0: te sientes enfermo o enferma. El médico confirmó que es una infección bacteriana y te recetó un antibiótico por 7 días.';
      if (s.dia > 0){
        if (N === 0){ cls = 'ok'; txt = 'Curado o curada: el antibiótico redujo la población y el sistema inmune eliminó a las últimas bacterias, incluidas las menos sensibles.'; }
        else if (N >= INM_SINTOMAS){ cls = 'bad'; txt = (s.serie.some(p => p.N < INM_SINTOMAS) ? 'La infección volvió. ' : '') + 'Tienes síntomas: hay más de 10 millones de bacterias.'; }
        else { cls = 'warn'; txt = 'Te sientes mejor: la población bajó y los síntomas se fueron… pero todavía quedan bacterias.'; }
      }
      estado.className = 'notice ' + cls; estado.innerHTML = '';
      estado.append(h('span',{class:'inm-estado'}, txt));
      /* gráfico logarítmico */
      const S = [{ x:0, N:RS.b0.reduce((a,v)=>a+v,0), res:RS.b0[2]+RS.b0[3] }].concat(s.serie.map(p => ({ x:p.d, N:p.N, res:p.res })));
      const lg = v => v > 0 ? Math.log10(v) : 0;
      const tratados = s.serie.filter(p => p.droga).map(p => p.d);
      const dias = Math.max(16, s.dia) <= 16 ? 16 : 28;
      const series = [
        { pts:[{x:0,y:7},{x:dias,y:7}], color:inmCol('--ink-3','#888'), label:'síntomas' },
        { pts:S.map(p => ({ x:p.x, y:lg(p.N) })), color:inmCol('--anat','#C0392B'), label:'' },
        { pts:S.map(p => ({ x:p.x, y:lg(p.res) })), color:'#E0891A', label:'' }
      ];
      tratados.forEach(d => series.push({ pts:[{x:d-1,y:0.15},{x:d,y:0.15}], color:inmCol('--accent','#2E6BD8'), label:'' }));
      lineChart(cvR, { series, xlabel:'días (barra azul abajo = días con antibiótico)', ylabel:'número de bacterias', ymin:0, ymax:12, xmin:0, xmax:dias, xticks:dias/4,
        xfmt:v=>String(Math.round(v)), yfmt:v => v < 0.5 ? '0' : '10^'+Math.round(v) });
      /* segunda oportunidad */
      segundaBox.innerHTML = '';
      if (s.dia >= 16 && N >= INM_SINTOMAS && !RS.segunda){
        segundaBox.append(h('div',{class:'notice warn'}, h('span',{}, h('b',{},'La infección volvió. '), 'Si tomas otra vez el mismo antibiótico, ¿funcionará igual que la primera vez?')),
          h('button',{class:'btn primary sm', onclick:segunda},'Tomar el mismo antibiótico 7 días completos'));
      }
      if (RS.segunda && s.dia >= RS.inicio2 + 10){
        const fR = N ? (b[2]+b[3])/N : 0;
        segundaBox.append(inmNota(N ? 'bad' : 'ok', N ? 'El mismo antibiótico ya no alcanza.' : 'Esta vez funcionó, por poco.',
          N ? 'Aunque esta vez tomaste el tratamiento completo, la población que tratas ya no es la del principio: el ' + inmPct(fR) + ' son resistentes. Haría falta otro antibiótico, a veces más caro, más tóxico o solo disponible en el hospital. Así se ve la resistencia en un paciente.'
            : 'El azar ayudó y el sistema inmune terminó el trabajo. Repite el experimento: en la mayoría de corridas, el segundo tratamiento no basta.'));
      }
    }
    function correr(){
      if (corriendo) return;
      RS.seed = inmSemilla(); nueva();
      if (RS.plan === 'corta') St.marcas.cortado = true;
      if (RS.plan === 'completo') St.marcas.completo = true;
      if (RS.plan === 'olvida') St.marcas.cortado = true;
      corriendo = true;
      const plan = planObj();
      const fin = () => { corriendo = false; pintar();
        Store.log('simulacion',{ recurso:'resistencia', plan:RS.plan, corta:RS.corta, resistentesFin: Math.round(((RS.sim.b[2]+RS.sim.b[3])/Math.max(1,RS.sim.b.reduce((a,v)=>a+v,0)))*1000)/1000 }); };
      if (inmQuieto()){ inmBactDias(RS.sim, plan, 16); fin(); return; }
      const paso = () => { if (!corriendo) return; inmBactDias(RS.sim, plan, 1); pintar(); if (RS.sim.dia >= 16) fin(); else timer = setTimeout(paso, 260); };
      paso();
    }
    function segunda(){
      if (corriendo) return;
      RS.segunda = true; RS.inicio2 = RS.sim.dia; corriendo = true;
      const plan = { tipo:'completo', desde:RS.sim.dia };
      const fin = () => { corriendo = false; pintar(); };
      if (inmQuieto()){ inmBactDias(RS.sim, plan, 10); fin(); return; }
      const paso = () => { if (!corriendo) return; inmBactDias(RS.sim, plan, 1); pintar(); if (RS.sim.dia >= RS.inicio2 + 10) fin(); else timer = setTimeout(paso, 260); };
      paso();
    }

    const diaSl = inmSlider('inm-corta','Dejo de tomarlo el día', 1, 6, 1, RS.corta, v => 'día '+Math.round(v), v => { RS.corta = Math.round(v); });
    const planSeg = inmSeg('Qué haces con el tratamiento', [
      { v:'completo', n:'Lo termino (7 días)', t:'Tomas todas las dosis como indicó el médico' },
      { v:'corta',    n:'Lo interrumpo', t:'Lo dejas cuando te sientes mejor' },
      { v:'olvida',   n:'Me salto dosis', t:'Olvidas alrededor del 40 % de los días' }
    ], () => RS.plan, v => { RS.plan = v; diaSl.el.style.display = v === 'corta' ? '' : 'none'; });
    diaSl.el.style.display = RS.plan === 'corta' ? '' : 'none';

    tras(pintar);

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Explora primero: tú decides'),
        h('p',{},'Tienes una infección bacteriana con unos 100 millones de bacterias. No todas son iguales: por mutaciones al azar, unas pocas son menos sensibles al antibiótico que las demás. Nadie las fabricó: ya estaban ahí antes de la primera pastilla.'),
        h('div',{class:'grid g2',style:'align-items:start'},
          h('div',{class:'stack'}, planSeg, diaSl.el,
            h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
              h('button',{class:'btn primary', onclick:correr},'Empezar el tratamiento'),
              h('button',{class:'btn sm ghost', onclick:()=>{ clearTimeout(timer); corriendo = false; RS.seed = inmSemilla(); nueva(); pintar(); }},'Otra infección (otro azar)')),
            estado, lect),
          h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Tipos de bacteria en la infección'), barras,
            h('p',{class:'small muted',style:'margin:0'},'Las marcadas con R tienen borde grueso y una letra R en la placa, para que no dependas del color.')))),
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Placa: día 0'), placa0),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Placa: ahora'), placa)),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Población bacteriana día a día (escala logarítmica)'),
        h('div',{class:'inm-chart'}, cvR),
        h('div',{class:'inm-lg'},
          h('span',{}, h('i',{style:'background:'+inmCol('--anat','#C0392B')}),'Todas las bacterias'),
          h('span',{}, h('i',{style:'background:#E0891A'}),'Solo las resistentes (R)'),
          h('span',{}, h('i',{style:'background:'+inmCol('--accent','#2E6BD8')}),'Días con antibiótico'),
          h('span',{}, h('i',{style:'background:'+inmCol('--ink-3','#888')}),'Umbral de síntomas')),
        segundaBox,
        inmNota('warn','Haz esto:','Corre primero «Lo termino» y luego «Lo interrumpo» el día 3. Compara la línea naranja: ¿qué fracción son resistentes al final en cada caso? Repite con otro azar.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Qué acabas de ver: selección natural en días'),
        h('p',{},'El antibiótico mata primero a las bacterias más sensibles. Cuando te sientes mejor todavía quedan las menos sensibles. Si interrumpes el tratamiento, esas sobrevivientes se multiplican sin competencia y la nueva población ya es, en buena parte, resistente. Ninguna bacteria "se acostumbró": el antibiótico solo cambió quién sobrevive. Es el mismo mecanismo que viste con los escarabajos.'),
        h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'}, h('a',{class:'btn sm',href:'#/explorar/evolucion'},'Ir a selección natural y evolución')),
        depthBlock({ id:'inm-resistencia',
          n1:'La resistencia es de las bacterias, no de la persona. Cada vez que se usa un antibiótico sin necesidad o se interrumpe, se da ventaja a las bacterias resistentes.',
          n2:'Las bacterias resistentes no se quedan en ti: pasan a otras personas, al agua y a los animales. Además, pueden compartir genes de resistencia en plásmidos, incluso entre especies distintas. Por eso la resistencia es un problema de salud pública y no solo individual.',
          n3:'La duración correcta de cada tratamiento la decide el personal de salud según la infección; hoy muchos tratamientos se indican más cortos que antes porque se comprobó que funcionan igual y seleccionan menos resistencia. La regla no es "más es mejor", sino: exactamente lo indicado, sin cortarlo por tu cuenta, sin guardar sobrantes y sin compartirlos. El uso masivo de antibióticos en la cría de animales también contribuye.' }),
        h('div',{class:'grid g3'},
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'No te automediques'), h('p',{class:'small'},'Solo un profesional puede saber si una infección es bacteriana y qué antibiótico sirve. El que "le funcionó a tu vecino" puede ser el equivocado.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'No pidas antibióticos para un resfriado'), h('p',{class:'small'},'Los resfriados, la mayoría de dolores de garganta y la gripe son virales. El antibiótico no acorta la enfermedad y sí selecciona resistencia en tu microbiota.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Sigue la indicación completa'), h('p',{class:'small'},'Toma cada dosis a su hora y por los días indicados. No guardes sobrantes ni los compartas. Si te sienta mal, consulta en vez de dejarlo.')))),
      secNav());
  }

  /* =================================================================
     6 · CONTEXTO ECUATORIANO
     ================================================================= */
  function secEcuador(){
    const esquema = [
      ['Al nacer', 'BCG (formas graves de tuberculosis) y hepatitis B'],
      ['2, 4 y 6 meses', 'Pentavalente (difteria, tos ferina, tétanos, hepatitis B y Haemophilus influenzae tipo b), polio, neumococo; rotavirus a los 2 y 4 meses'],
      ['Desde los 6 meses', 'Influenza (gripe), con refuerzo anual en los grupos indicados'],
      ['Alrededor del año', 'SRP (sarampión, rubéola y paperas), fiebre amarilla y varicela'],
      ['Alrededor de los 18 meses', 'Segunda dosis de SRP y refuerzos de DPT y polio'],
      ['Edad escolar', 'Refuerzos y VPH (virus del papiloma humano) desde los 9 años'],
      ['Adolescencia, embarazo y adultez', 'dT (difteria y tétanos), influenza en grupos de riesgo y otras según indicación']
    ];
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'El esquema de vacunación del Ministerio de Salud Pública (MSP)'),
        h('p',{},'En el Ecuador, las vacunas del esquema nacional se aplican gratis en los centros de salud del MSP y en brigadas escolares. Este es un resumen por etapas; el calendario exacto y las edades se actualizan, así que la fuente final es tu carné de vacunación y tu centro de salud.'),
        h('div',{class:'tablewrap'}, h('table',{class:'data','aria-label':'Resumen del esquema de vacunación por etapas'},
          h('thead',{}, h('tr',{}, h('th',{},'Etapa aproximada'), h('th',{},'Vacunas'))),
          h('tbody',{}, esquema.map(r => h('tr',{}, h('td',{}, h('b',{}, r[0])), h('td',{}, r[1])))))),
        inmNota('info','Tarea para la casa:','Pide tu carné de vacunación y compáralo con la tabla. ¿Te falta alguna dosis? No es para preocuparse: en el centro de salud pueden completar el esquema a casi cualquier edad.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'El sarampión volvió a la región'),
        h('div',{class:'inm-tl'},
          h('div',{}, h('b',{class:'y'},'1990s'), h('span',{},'Con campañas masivas, el continente americano reduce el sarampión hasta casi desaparecer. En el Ecuador, el último caso de polio salvaje se registró a inicios de los noventa y las Américas fueron certificadas libres de polio en 1994.')),
          h('div',{}, h('b',{class:'y'},'2016'), h('span',{},'La Organización Panamericana de la Salud declara a las Américas libres de sarampión endémico: la primera región del mundo en lograrlo.')),
          h('div',{}, h('b',{class:'y'},'2018–2019'), h('span',{},'Brotes grandes en Venezuela y Brasil, donde la transmisión se volvió a establecer. El Ecuador confirmó casos importados y los contuvo con vacunación de bloqueo alrededor de cada caso.')),
          h('div',{}, h('b',{class:'y'},'2020–2022'), h('span',{},'Durante la pandemia bajaron las coberturas de vacunación en casi toda la región, también en el Ecuador: muchos niños se quedaron sin alguna dosis.')),
          h('div',{}, h('b',{class:'y'},'2025'), h('span',{},'Brotes importantes en Norteamérica, sobre todo en México, Estados Unidos y Canadá, con muertes de niños no vacunados. A finales de año Canadá perdió su condición de país libre de sarampión.'))),
        h('p',{class:'small'},'La lección coincide con el simulador: cuando la cobertura de dos dosis de SRP queda por debajo de cerca del 95 %, el sarampión encuentra por dónde volver. En varios años recientes, la segunda dosis en el Ecuador estuvo por debajo de esa meta.'),
        h('p',{class:'small muted',style:'margin:0'},'Para cifras actualizadas, consulta los boletines epidemiológicos del MSP y las alertas de la OPS.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Antibióticos sin receta'),
        h('p',{},'En el Ecuador, la venta de antibióticos requiere receta médica. Aun así, estudios en farmacias del país y de la región han encontrado que muchas los venden sin ella, y es común guardar sobrantes o tomar lo que recomienda un familiar. Es una de las causas por las que aumentan las infecciones resistentes.'),
        h('div',{class:'grid g2'},
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'A escala mundial'), h('p',{class:'small'},'Se estimó que en 2019 las infecciones por bacterias resistentes causaron directamente alrededor de 1,27 millones de muertes en el mundo, y estuvieron relacionadas con casi 5 millones. La OMS la considera una de las mayores amenazas para la salud pública.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Lo que se está haciendo'), h('p',{class:'small'},'El MSP tiene un plan nacional contra la resistencia a los antimicrobianos, que incluye vigilancia en hospitales, control de la venta en farmacias y uso responsable también en la producción animal.'))),
        inmNota('warn','Si te ofrecen un antibiótico sin receta:','puedes decir que no. Explica lo que viste en el simulador: sin diagnóstico, puede no ser el antibiótico correcto, puede no hacer falta —si la infección es viral— y siempre suma presión de selección.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Prevención: lo que está en tus manos'),
        h('div',{class:'grid g3'},
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Lavarse las manos'), h('p',{class:'small'},'Con agua y jabón, 20 segundos. El jabón destruye la envoltura de muchos virus y arrastra bacterias.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Agua y alimentos seguros'), h('p',{class:'small'},'Hervir o clorar el agua y cocinar bien los alimentos previene diarreas bacterianas y virales.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Esquema completo'), h('p',{class:'small'},'Revisar el carné y completar las dosis te protege a ti y a quienes no pueden vacunarse.')))),
      secNav());
  }

  /* =================================================================
     7 · RETO FINAL
     ================================================================= */
  function secReto(){
    const marcas = [
      ['modelo','Exploraste las partes de la bacteria y del virus'],
      ['antivirus','Probaste un antibiótico contra el virus'],
      ['pasos','Llegaste al paso de la memoria en la respuesta inmune'],
      ['memoria','Moviste la segunda exposición en la curva de anticuerpos'],
      ['gemelos','Comparaste a la gemela vacunada con la no vacunada'],
      ['tipos','Revisaste al menos dos tipos de vacuna'],
      ['rebano','Soltaste un brote en el simulador'],
      ['umbral','Encontraste el umbral de inmunidad de grupo'],
      ['cortado','Interrumpiste un tratamiento o te saltaste dosis'],
      ['completo','Completaste un tratamiento']
    ];
    const lista = h('ul',{class:'checks plain'});
    marcas.forEach(([k,t]) => lista.append(h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{}, (St.marcas[k]?'✓ ':'· ')+t))));
    const wrap = h('div',{class:'card stack'});
    let ok = 0, intentos = 0;
    wrap.append(
      h('span',{class:'eyebrow anat'},'🎯 Reto final · seis preguntas'),
      h('p',{class:'small muted'},'Todas se responden con lo que viste en el modelo, las curvas y los simuladores. Si te equivocas, la retroalimentación te dice a qué sección volver.'));
    INM_PREGUNTAS.forEach(p => wrap.append(quizBlock(p, (att) => {
      ok++; intentos += att;
      if (ok === INM_PREGUNTAS.length){
        const hechas = marcas.filter(([k]) => St.marcas[k]).length;
        try {
          Store.completeActivity('reto-inmunidad', {
            score: INM_PREGUNTAS.length + '/' + INM_PREGUNTAS.length,
            attempts: intentos,
            duracionMin: Math.round((Date.now() - St.start)/60000),
            tareas: hechas + '/' + marcas.length });
        } catch(e){ console.warn('completeActivity', e); }
        retoSt.className = 'notice ok';
        retoSt.innerHTML = '<span><b>¡Reto resuelto!</b> Seis de seis, con ' + hechas + ' de ' + marcas.length + ' tareas del recorrido completadas.</span>';
        wrap.append(inmNota('ok','Actividad completada y registrada en tu progreso.','Ya puedes explicar por qué un antibiótico no sirve contra un virus, cómo la memoria inmunológica hace funcionar a las vacunas, por qué hace falta cierta cobertura para proteger a toda la comunidad y cómo se seleccionan las bacterias resistentes.'));
        toast('Actividad completada: Reto de inmunidad y vacunas ✓');
      }
    })));
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Lo que hiciste hasta aquí'), lista,
        h('p',{class:'small muted'},'Puedes responder aunque falte alguna casilla, pero cada tarea te da el argumento de una pregunta.')),
      wrap,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow anat'},'Para llevar al cuaderno'),
        h('p',{html:'<b>Bacterias</b>: células procariotas; algunas causan enfermedades y se tratan con antibióticos que atacan estructuras que solo ellas tienen. <b>Virus</b>: no son células; se multiplican dentro de las nuestras; los antibióticos no les hacen nada.'}),
        h('p',{html:'<b>Inmunidad</b>: barreras → respuesta innata (inflamación, fagocitos) → respuesta adaptativa (linfocitos B y anticuerpos, linfocitos T) → <b>memoria</b>. Una <b>vacuna</b> crea esa memoria sin la enfermedad; con cobertura sobre <b>1 − 1/R₀</b>, protege también a quien no puede vacunarse. Interrumpir un antibiótico <b>selecciona</b> bacterias resistentes.'}),
        h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
          h('button',{class:'btn sm', onclick:()=>{
            try { Store.addNote('anat','Antibióticos: solo contra bacterias (pared, ribosomas 70S, ADN girasa). Memoria: 2.ª respuesta más rápida y alta. Vacuna = memoria sin enfermedad. Umbral de grupo = 1 − 1/R₀ (sarampión ≈ 93 %, gripe ≈ 33 %). Cortar un tratamiento selecciona resistentes.', { recurso:'inmunidad' });
              toast('Guardado en tu cuaderno.'); } catch(e){ console.warn(e); } }},'Guardar resumen en el cuaderno'),
          h('a',{class:'btn sm ghost', href:'#/explorar/evolucion'},'Selección natural'),
          h('a',{class:'btn sm ghost', href:'#/mision/diagnostico-celular'},'Misión: diagnóstico celular'))),
      secNav());
  }

  /* =================================================================
     RENDER
     ================================================================= */
  function render(){
    soltar();
    renderNav(); body.innerHTML = ''; St.post = [];
    const f = [secMicrobios, secRespuesta, secVacunas, secGrupo, secResistencia, secEcuador, secReto][St.sec];
    body.append(f());
    St.post.forEach(fn => { try { fn(); } catch(e){ console.warn('inm', e); } }); St.post = [];
    Store.log('seccion',{ recurso:'inmunidad', seccion:SEC[St.sec].id });
  }
  render();
  return { unmount(){ soltar(); } };
}

route('/explorar/inmunidad', (view) => inmVista(view));
</script>
