<style>
/* ===== Laboratorios de la fase 2 (prefijo lb2-) ===== */
.lb2-ctrls{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px}
.lb2-ctrls>*{min-width:0}
.lb2-body{min-width:0}
.lb2-body select,.lb2-body input,.lb2-body .field,.lb2-body .slider{min-width:0;max-width:100%}
.lb2-body select{text-overflow:ellipsis}
.lb2-ctrls label{overflow-wrap:anywhere}
@media (max-width:760px){ .lb2-ctrls{grid-template-columns:1fr} }
.lb2-tag{display:inline-block;margin-left:6px;font-size:.64rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;padding:2px 7px;border-radius:999px;border:1px solid var(--line-2);color:var(--ink-3);background:var(--bg-2);vertical-align:middle}
.lb2-tag.indep{background:var(--lab-soft);border-color:var(--lab);color:var(--lab)}
.lb2-viz{display:grid;grid-template-columns:78px 1fr;gap:14px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--bg-3)}
.lb2-viz>*{min-width:0}
.lb2-viz .em{font-size:2.6rem;text-align:center;line-height:1}
.lb2-viz .big{font-family:var(--font-m);font-variant-numeric:tabular-nums;font-size:1.5rem;font-weight:700;color:var(--ink)}
.lb2-viz .big .u{font-size:.8rem;font-weight:600;color:var(--ink-3);margin-left:4px}
.lb2-viz .cap{font-size:.78rem;color:var(--ink-3);line-height:1.35}
.lb2-bar{height:12px;border-radius:999px;background:var(--bg-2);border:1px solid var(--line-2);overflow:hidden;margin:6px 0 4px;position:relative}
.lb2-bar i{display:block;height:100%;background:var(--lab);border-radius:999px}
.lb2-bar.div i{position:absolute;top:0;background:var(--ok)}
.lb2-bar.div i.neg{background:var(--bad)}
.lb2-bar.div::after{content:"";position:absolute;left:50%;top:-3px;bottom:-3px;width:1px;background:var(--ink-3)}
.lb2-checks{display:flex;flex-direction:column;gap:5px}
.lb2-checks label{display:flex;gap:9px;align-items:flex-start;padding:8px 10px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);font-size:.85rem;line-height:1.35;font-weight:500}
.lb2-checks label.on{border-color:var(--lab);background:var(--lab-soft)}
.lb2-checks input{margin-top:3px;flex:none}
.lb2-mini{font-size:.78rem;color:var(--ink-3);font-family:var(--font-m);font-variant-numeric:tabular-nums}
.lb2-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media (max-width:760px){ .lb2-grid2{grid-template-columns:1fr} }
.lb2-links{display:flex;flex-wrap:wrap;gap:8px}
.lb2-links .btn{white-space:normal;text-align:left;line-height:1.3}
table.data td.lb2-rep{color:var(--ink-3)}
.lb2-num{width:120px!important;display:inline-block}
.lb2-hint{font-size:.8rem;color:var(--ink-3);line-height:1.45}
/* ---- escenas ilustradas del paso «Experimentación» (v1.7) ---- */
:root{--lb2-glass:rgba(78,104,132,.78);--lb2-wall1:#E3EAF2;--lb2-wall2:#F6F9FC;--lb2-tile:rgba(120,140,165,.16);--lb2-card:#FFFFFF;
  --lb2-sky1:#A9D2EE;--lb2-sky2:#E8F3FA;--lb2-mtn1:#9FB4C6;--lb2-mtn2:#7FA374;--lb2-snow:#FFFFFF;--lb2-sea:#4E9CC8;--lb2-sea2:#7FC0E0;
  --lb2-track:#B85C45;--lb2-track2:#9E4A36;--lb2-grass:#86BD6E;--lb2-sun:#FFD36A}
@media (prefers-color-scheme:dark){ :root:not([data-theme="light"]){--lb2-glass:rgba(196,220,244,.58);--lb2-wall1:#172840;--lb2-wall2:#0F1C2F;--lb2-tile:rgba(160,190,225,.07);--lb2-card:#1C2D46;
  --lb2-sky1:#0F2038;--lb2-sky2:#28446A;--lb2-mtn1:#2F4865;--lb2-mtn2:#2B4A36;--lb2-snow:#C9D8E8;--lb2-sea:#1E4F76;--lb2-sea2:#2D6A93;
  --lb2-track:#80402F;--lb2-track2:#6A3326;--lb2-grass:#2F5B35;--lb2-sun:#F4C95D} }
:root[data-theme="dark"]{--lb2-glass:rgba(196,220,244,.58);--lb2-wall1:#172840;--lb2-wall2:#0F1C2F;--lb2-tile:rgba(160,190,225,.07);--lb2-card:#1C2D46;
  --lb2-sky1:#0F2038;--lb2-sky2:#28446A;--lb2-mtn1:#2F4865;--lb2-mtn2:#2B4A36;--lb2-snow:#C9D8E8;--lb2-sea:#1E4F76;--lb2-sea2:#2D6A93;
  --lb2-track:#80402F;--lb2-track2:#6A3326;--lb2-grass:#2F5B35;--lb2-sun:#F4C95D}
.lb2-viz.lb2-viz-esc{grid-template-columns:1fr;gap:10px;padding:10px}
.lb2-esc{position:relative;border-radius:10px;overflow:hidden;border:1px solid var(--line);background:var(--bg-2);line-height:0}
.lb2-esc-svg{display:block;width:100%;height:auto;max-height:430px}
.lb2-esc-svg .lb2-edge{stroke:var(--lb2-glass);fill:none}
.lb2-esc-svg .lb2-tx{font-family:var(--font-m);font-weight:600;fill:var(--ink)}
.lb2-esc-svg .lb2-tx2{font-family:var(--font-b);font-weight:600;fill:var(--ink-2)}
.lb2-esc-svg .lb2-card{fill:var(--lb2-card);stroke:var(--line-2)}
.lb2-lect{padding:0 4px 2px;min-width:0}
</style>
<script>
/* =====================================================================
   LABORATORIOS DE LA FASE 2
   1) Frecuencia cardíaca y ejercicio  → #/laboratorio/frecuencia-cardiaca
   2) Enzimas: catalasa y temperatura  → #/laboratorio/catalasa
   3) Ósmosis en papa                  → #/laboratorio/osmosis-papa
   4) Fermentación de levadura         → #/laboratorio/fermentacion

   Los cuatro comparten un motor de indagación (lb2Lab) que reproduce la
   secuencia del laboratorio de fotosíntesis: pregunta → hipótesis →
   materiales → procedimiento → variables → experimentación → resultados →
   representación → análisis → conclusión.  Los datos NO están tabulados:
   cada laboratorio aporta un modelo cuantitativo con ruido, de modo que
   repetir una medición devuelve un valor ligeramente distinto y obliga a
   promediar réplicas, como en un laboratorio real.
   ===================================================================== */
try {
  if (typeof BIO !== 'undefined' && BIO && BIO.activities)
    Object.assign(BIO.activities, {
      'lab-frecuencia-cardiaca': { t:'Laboratorio: Frecuencia cardíaca y ejercicio', unidad:6, peso:10, xp:130 },
      'lab-catalasa':            { t:'Laboratorio: Catalasa y temperatura',          unidad:2, peso:10, xp:130 },
      'lab-osmosis-papa':        { t:'Laboratorio: Ósmosis en papa',                 unidad:2, peso:10, xp:130 },
      'lab-fermentacion':        { t:'Laboratorio: Fermentación de levadura',        unidad:2, peso:10, xp:130 }
    });
} catch(e){ console.warn('labs fase 2: registro de actividades', e); }
try {
  if (typeof ACT_HREF === 'object' && ACT_HREF) Object.assign(ACT_HREF, {
    'lab-frecuencia-cardiaca':'#/laboratorio/frecuencia-cardiaca',
    'lab-catalasa':'#/laboratorio/catalasa',
    'lab-osmosis-papa':'#/laboratorio/osmosis-papa',
    'lab-fermentacion':'#/laboratorio/fermentacion'
  });
} catch(e){ console.warn('labs fase 2: enlaces de actividad', e); }

/* Metadatos para que la vista principal construya las tarjetas. */
try {
  if (typeof BIO !== 'undefined' && BIO) BIO.labsFase2 = [
    { id:'lab-frecuencia-cardiaca', href:'#/laboratorio/frecuencia-cardiaca', t:'Frecuencia cardíaca y ejercicio', em:'🫀', areas:['cuerpo'],
      reto:'¿Cuánto tarda tu corazón en recuperarse después del ejercicio?',
      d:'Registra pulsaciones antes, durante y minuto a minuto después de distintas intensidades, y compara perfiles de condición física.' },
    { id:'lab-catalasa', href:'#/laboratorio/catalasa', t:'Enzimas: catalasa y temperatura', em:'🧫', areas:['celular','cuerpo'],
      reto:'¿A qué temperatura trabaja mejor una enzima y por qué deja de funcionar?',
      d:'Mide el oxígeno que libera la catalasa de hígado o de papa al descomponer el peróxido de hidrógeno.' },
    { id:'lab-osmosis-papa', href:'#/laboratorio/osmosis-papa', t:'Ósmosis en papa', em:'💧', areas:['celular'],
      reto:'Encuentra la concentración de sal en la que la papa no gana ni pierde agua.',
      d:'Pesa cilindros de papa antes y después de sumergirlos en soluciones de distinta concentración y halla el punto isotónico.' },
    { id:'lab-fermentacion', href:'#/laboratorio/fermentacion', t:'Fermentación de levadura', em:'🍞', areas:['celular','biodiversidad'],
      reto:'¿Qué necesita la levadura para producir más CO₂?',
      d:'Mide el dióxido de carbono liberado según el tipo de azúcar, la cantidad, la temperatura y la presencia de oxígeno.' }
  ];
} catch(e){ console.warn('labs fase 2: metadatos', e); }

/* ---------------------------------------------------------------------
   Utilidades numéricas comunes
   --------------------------------------------------------------------- */
function lb2Gauss(sd){
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return sd * Math.sqrt(-2*Math.log(u)) * Math.cos(2*Math.PI*v);
}
function lb2N(v, d){
  const k = Math.pow(10, d||0);
  const n = Math.round(v*k)/k;
  return (d ? n.toFixed(d) : String(Math.round(n))).replace('.', ',');
}
function lb2Mean(a){ return a.reduce((s,x)=>s+x,0)/(a.length||1); }
function lb2Sd(a){ if (a.length<2) return 0; const m = lb2Mean(a); return Math.sqrt(a.reduce((s,x)=>s+(x-m)*(x-m),0)/(a.length-1)); }
const lb2Min = t => t ? t[0].toLowerCase() + t.slice(1) : '';
function lb2Note(kind, titulo, texto){
  return h('div',{class:'notice '+(kind||'')}, h('span',{}, titulo ? h('b',{}, titulo+' ') : null, texto));
}
/* valor numérico del eje X para una variable (las categóricas usan su índice) */
function lb2X(def, val){ return def.opts ? Math.max(0, def.opts.findIndex(o=>o.v===val)) : +val; }
/* etiqueta legible de un valor */
function lb2Lbl(def, val){
  if (def.opts){ const o = def.opts.find(o=>o.v===val); return o ? o.n : String(val); }
  return lb2N(+val, def.dec||0) + (def.u ? ' '+def.u : '');
}
function lb2Color(i){
  /* orden validado (dataviz): vecinos distinguibles también con daltonismo, en claro y en oscuro */
  const c = ['--lab','--deoxy','--eco','--gen','--anat','--cell'];
  return cssVar(c[i % c.length]) || '#C7841F';
}
/* regresión lineal simple; devuelve {m, b, x0} donde x0 es el cruce por cero */
function lb2Fit(pts){
  const n = pts.length; if (n < 2) return null;
  const mx = lb2Mean(pts.map(p=>p.x)), my = lb2Mean(pts.map(p=>p.y));
  let num = 0, den = 0;
  pts.forEach(p => { num += (p.x-mx)*(p.y-my); den += (p.x-mx)*(p.x-mx); });
  if (!den) return null;
  const m = num/den, b = my - m*mx;
  return { m, b, x0: m ? -b/m : null };
}

/* ---------------------------------------------------------------------
   ESCENAS ILUSTRADAS (v1.7): kit SVG común
   Cada laboratorio declara C.escena = () => ({ el, upd(vars, est), tick(t, dt) }).
   upd recibe la estimación sin ruido de C.model (la misma que la lectura
   numérica); tick(t, dt) anima, y tick(null) dibuja el estado estático.
   --------------------------------------------------------------------- */
const LB2_NS = 'http://www.w3.org/2000/svg';
let lb2Uid = 0;
function lb2S(tag, a, ...kids){
  const e = document.createElementNS(LB2_NS, tag);
  if (a) for (const k in a){ const v = a[k]; if (v == null || v === false) continue; e.setAttribute(k, String(v)); }
  kids.flat(9).forEach(c => { if (c == null || c === false) return; e.append(typeof c === 'string' ? document.createTextNode(c) : c); });
  return e;
}
function lb2At(e, a){ for (const k in a) e.setAttribute(k, typeof a[k] === 'number' ? String(Math.round(a[k]*100)/100) : a[k]); return e; }
const lb2Anim = () => { try { return (typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion); } catch(e){ return true; } };
function lb2Rng(seed){ let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function lb2Mix(c1, c2, f){
  const p = c => [1,3,5].map(i => parseInt(c.slice(i, i+2), 16)); const a = p(c1), b = p(c2); f = clamp(f, 0, 1);
  return '#' + a.map((x,i) => Math.round(x + (b[i]-x)*f).toString(16).padStart(2,'0')).join('');
}
function lb2Ramp(st, v){
  if (v <= st[0][0]) return st[0][1];
  for (let i = 1; i < st.length; i++) if (v <= st[i][0]) return lb2Mix(st[i-1][1], st[i][1], (v - st[i-1][0])/(st[i][0] - st[i-1][0]));
  return st[st.length-1][1];
}
const lb2Ease = (cur, tgt, dt, k) => dt == null ? tgt : cur + (tgt - cur)*Math.min(1, dt*(k||4));
function lb2Stop(o, c, op){ return lb2S('stop',{offset:o, style:'stop-color:'+c+(op != null ? ';stop-opacity:'+op : '')}); }

/* Bucle rAF de una escena: espera a que el nodo entre al documento, se detiene cuando sale,
   se pausa con la pestaña oculta y, sin animación, dibuja una sola vez el estado estático. */
function lb2Run(esc, host){
  let seen = false, tries = 0, last = 0, T = 0;
  const frame = (now) => {
    if (!host.isConnected){ if (seen || ++tries > 600) return; requestAnimationFrame(frame); return; }
    seen = true; requestAnimationFrame(frame);
    if (document.hidden){ last = 0; return; }
    const dt = last ? Math.min(0.05, (now - last)/1000) : 1/60; last = now;
    if (!lb2Anim()){ if (!esc._static){ try { esc.tick(null); } catch(e){} esc._static = true; } return; }
    esc._static = false; T += dt;
    try { esc.tick(T, dt); } catch(e){ console.warn('lb2: animación', e); esc.tick = () => {}; }
  };
  requestAnimationFrame(frame);
}

/* Lienzo base: pared de laboratorio con azulejos, mesada, degradados comunes. */
function lb2Base(W, H, label, o){
  o = o || {};
  const pre = 'lb2e' + (++lb2Uid) + '-';
  const svg = lb2S('svg',{viewBox:`0 0 ${W} ${H}`, class:'lb2-esc-svg', role:'img', 'aria-label':label, focusable:'false'});
  const defs = lb2S('defs'); svg.append(defs);
  const B = { svg, defs, W, H, grads:{}, id:n => pre+n, url:n => `url(#${pre}${n})` };
  B.lin = (n, st, x1=0, y1=0, x2=0, y2=1) => { const g = lb2S('linearGradient',{id:pre+n, x1, y1, x2, y2}, st.map(s => lb2Stop(...s))); defs.append(g); B.grads[n] = g; return B.url(n); };
  B.rad = (n, st, cx=.5, cy=.5, r=.5, fx, fy) => { const g = lb2S('radialGradient',{id:pre+n, cx, cy, r, fx:fx ?? cx, fy:fy ?? cy}, st.map(s => lb2Stop(...s))); defs.append(g); B.grads[n] = g; return B.url(n); };
  B.recolor = (n, cols) => { const g = B.grads[n]; if (!g) return; [...g.children].forEach((s,i) => { if (cols[i]) s.style.stopColor = cols[i]; }); };
  B.lin('glass', [[0,'#FFFFFF',.36],[.1,'#FFFFFF',.12],[.5,'#FFFFFF',.03],[.82,'#FFFFFF',.12],[.92,'#FFFFFF',.32],[1,'#FFFFFF',.08]], 0,0,1,0);
  B.rad('shadow', [[0,'#000000',.42],[1,'#000000',0]]);
  B.lin('metal', [[0,'#6F7A86'],[.3,'#E9EEF3'],[.55,'#AEB8C3'],[1,'#58626D']], 0,0,1,0);
  B.lin('metalV', [[0,'#E9EEF3'],[.45,'#AEB8C3'],[1,'#5E6873']]);
  B.rad('bub', [[0,'#FFFFFF',.95],[.55,'#FFFFFF',.35],[1,'#CFE3F2',.55]], .38, .34, .62);
  B.rad('foam', [[0,'#FFFFFF'],[.7,'#F3F7FA'],[1,'#C9D6E1']], .38, .32, .7);
  if (o.lab !== false){
    B.lin('wall', [[0,'var(--lb2-wall1)'],[1,'var(--lb2-wall2)']]);
    defs.append(lb2S('pattern',{id:pre+'tile', width:46, height:46, patternUnits:'userSpaceOnUse'},
      lb2S('path',{d:'M46 0H0V46', fill:'none', style:'stroke:var(--lb2-tile)', 'stroke-width':2})));
    B.lin('bench', [[0,'#56657A'],[.07,'#364254'],[1,'#1E2631']]);
    const by = o.benchY || H - 42; B.benchY = by;
    svg.append(lb2S('rect',{x:0, y:0, width:W, height:by, fill:B.url('wall')}),
      lb2S('rect',{x:0, y:0, width:W, height:by, fill:B.url('tile')}),
      lb2S('rect',{x:0, y:by, width:W, height:H-by, fill:B.url('bench')}),
      lb2S('rect',{x:0, y:by, width:W, height:2, fill:'#FFFFFF', opacity:.22}));
  }
  B.shadow = (cx, cy, rx, ry) => lb2S('ellipse',{cx, cy, rx, ry, fill:B.url('shadow')});
  B.text = (x, y, s, a) => lb2S('text', Object.assign({x, y, class:'lb2-tx', 'font-size':18}, a||{}), s);
  return B;
}

/* Recipiente de vidrio de fondo redondeado (vaso o cubeta). Capas: detrás → inner → líquido → over → vidrio. */
function lb2Vessel(B, x, y, w, h, o){
  o = o || {};
  const r = o.r ?? 14, g = lb2S('g');
  const body = `M${x},${y} L${x},${y+h-r} Q${x},${y+h} ${x+r},${y+h} L${x+w-r},${y+h} Q${x+w},${y+h} ${x+w},${y+h-r} L${x+w},${y}`;
  if (o.shadow !== false) g.append(B.shadow(x+w/2, y+h+1, w*0.6, 7));
  const inner = lb2S('g'), over = lb2S('g');
  const liq = lb2S('path',{fill:o.liquid || 'none'}), surf = lb2S('path',{fill:'none', stroke:'#FFFFFF', 'stroke-width':1.8, opacity:.6, 'stroke-linecap':'round'});
  g.append(lb2S('path',{d:body+'Z', fill:'#FFFFFF', opacity:.07}), inner, liq, surf, over,
    lb2S('path',{d:body+'Z', fill:B.url('glass')}),
    lb2S('path',{d:body, class:'lb2-edge', 'stroke-width':2.4, 'stroke-linejoin':'round'}),
    lb2S('path',{d:`M${x-6},${y-2} Q${x-5},${y+3} ${x},${y+5} M${x+w+6},${y-2} Q${x+w+5},${y+3} ${x+w},${y+5}`, class:'lb2-edge', 'stroke-width':2.4, 'stroke-linecap':'round'}),
    lb2S('rect',{x:x+7, y:y+12, width:5, height:Math.max(10, h-34), rx:2.5, fill:'#FFFFFF', opacity:.38}),
    lb2S('rect',{x:x+w-13, y:y+18, width:2.5, height:h*0.45, rx:1.2, fill:'#FFFFFF', opacity:.22}));
  if (o.grad !== false) for (let i = 1; i <= 4; i++){ const gy = y + h - i*h/5.2; g.append(lb2S('line',{x1:x+w-(i%2?22:30), x2:x+w-9, y1:gy, y2:gy, class:'lb2-edge', 'stroke-width':1.4, opacity:.8})); }
  const setLevel = (ly) => {
    const a = x+1.8, b = x+w-1.8, m = o.menisco ?? 4;
    liq.setAttribute('d', `M${a},${ly-m} Q${x+w/2},${ly+m*0.7} ${b},${ly-m} L${b},${y+h-r} Q${b},${y+h-1.8} ${x+w-r},${y+h-1.8} L${x+r},${y+h-1.8} Q${a},${y+h-1.8} ${a},${y+h-r} Z`);
    surf.setAttribute('d', `M${a+2},${ly-m+0.6} Q${x+w/2},${ly+m*0.7} ${b-2},${ly-m+0.6}`);
  };
  return { g, inner, over, liq, surf, setLevel, x, y, w, h };
}

/* Tubo de ensayo vertical de fondo redondo. */
function lb2Tube(B, cx, top, w, h, o){
  o = o || {};
  const x = cx - w/2, r = w/2, g = lb2S('g');
  const body = `M${x},${top} L${x},${top+h-r} A${r},${r} 0 0 0 ${x+w},${top+h-r} L${x+w},${top}`;
  const inner = lb2S('g'), over = lb2S('g');
  const liq = lb2S('path',{fill:o.liquid || 'none'}), surf = lb2S('path',{fill:'none', stroke:'#FFFFFF', 'stroke-width':1.6, opacity:.65});
  g.append(lb2S('path',{d:body+'Z', fill:'#FFFFFF', opacity:.08}), inner, liq, surf, over,
    lb2S('path',{d:body+'Z', fill:B.url('glass')}),
    lb2S('path',{d:body, class:'lb2-edge', 'stroke-width':2.2}),
    lb2S('ellipse',{cx, cy:top, rx:r+3, ry:3.5, class:'lb2-edge', 'stroke-width':2.2}),
    lb2S('rect',{x:x+5, y:top+10, width:4, height:h-r-18, rx:2, fill:'#FFFFFF', opacity:.42}));
  const setLevel = (ly) => {
    const a = x+1.6, b = x+w-1.6, rr = r-1.6;
    liq.setAttribute('d', `M${a},${ly-3} Q${cx},${ly+2.5} ${b},${ly-3} L${b},${top+h-r} A${rr},${rr} 0 0 1 ${a},${top+h-r} Z`);
    surf.setAttribute('d', `M${a+1.5},${ly-2.6} Q${cx},${ly+2.5} ${b-1.5},${ly-2.6}`);
  };
  return { g, inner, over, liq, surf, setLevel, x, top, w, h, cx, r };
}

/* Termómetro de vidrio con columna roja y etiqueta de lectura. */
function lb2Thermo(B, x, y1, y2, min, max){
  const g = lb2S('g'), col = lb2S('rect',{x:x-2.6, width:5.2, rx:2.6, fill:'#D93A30'});
  g.append(lb2S('rect',{x:x-7, y:y1, width:14, height:y2-y1, rx:7, class:'lb2-card', 'stroke-width':1.5, opacity:.92}));
  for (let i = 0; i <= 8; i++){ const ty = y2 - 12 - (y2-y1-22)*i/8; g.append(lb2S('line',{x1:x+3, x2:x+(i%2?6:8), y1:ty, y2:ty, style:'stroke:var(--ink-3)', 'stroke-width':1.1})); }
  g.append(col, lb2S('circle',{cx:x, cy:y2, r:9.5, fill:'#D93A30', stroke:'#9E2019', 'stroke-width':1.2}),
    lb2S('circle',{cx:x-3, cy:y2-3, r:2.8, fill:'#FFFFFF', opacity:.6}),
    lb2S('rect',{x:x-4.5, y:y1+5, width:2, height:y2-y1-18, rx:1, fill:'#FFFFFF', opacity:.5}));
  const tag = lb2S('g'), txt = B.text(x, y1-13, '', {'text-anchor':'middle', 'font-size':18});
  tag.append(lb2S('rect',{x:x-38, y:y1-35, width:76, height:29, rx:9, class:'lb2-card', 'stroke-width':1.2}), txt);
  g.append(tag);
  return { g, set(v){ const ty = y2 - 12 - (y2-y1-22)*clamp((v-min)/(max-min), 0, 1); lb2At(col, {y:ty, height:y2-ty}); txt.textContent = lb2N(v, 0) + ' °C'; } };
}

/* Baño maría: cubeta con agua teñida según temperatura, placa calefactora, hielo o vapor. */
function lb2Bath(B, x, y, w, h, waterY){
  const g = lb2S('g');
  const plate = lb2S('g');
  plate.append(lb2S('rect',{x:x-8, y:y+h, width:w+16, height:14, rx:4, fill:B.url('metalV')}),
    lb2S('rect',{x:x-8, y:y+h+11, width:w+16, height:3, fill:'#000', opacity:.25}));
  const led = lb2S('circle',{cx:x+w-6, cy:y+h+7, r:3.2, fill:'#FF5A3C'});
  plate.append(lb2S('circle',{cx:x+w-6, cy:y+h+7, r:3.2, fill:'#3A1A16'}), led);
  const glow = lb2S('rect',{x:x+6, y:y+h-8, width:w-12, height:10, rx:5, fill:'#FF7A3C', opacity:0, filter:null});
  B.lin('bathw', [[0,'#86C9E3',.3],[1,'#5AA9D6',.46]]);
  const V = lb2Vessel(B, x, y, w, h, {r:10, liquid:B.url('bathw'), grad:false, menisco:3});
  V.setLevel(waterY);
  const ice = lb2S('g',{opacity:0});
  [[x+26, waterY-10, 16, -12],[x+w*0.62, waterY-8, 13, 18],[x+w-44, waterY-11, 15, 6]].forEach(([ix,iy,s,rot]) =>
    ice.append(lb2S('rect',{x:ix, y:iy, width:s, height:s, rx:3, fill:'#EAF7FF', opacity:.85, stroke:'#FFFFFF', 'stroke-width':1.2, transform:`rotate(${rot} ${ix+s/2} ${iy+s/2})`})));
  const steam = lb2S('g',{opacity:0}), wisps = [];
  [x+w*0.18, x+w*0.5, x+w*0.8].forEach((sx,i) => { const p = lb2S('path',{d:`M${sx},${y-4} c-8,-12 8,-20 0,-32 c-7,-10 6,-18 0,-28`, fill:'none', stroke:'#FFFFFF', 'stroke-width':5, 'stroke-linecap':'round', opacity:.5}); wisps.push(p); steam.append(p); });
  V.over.append(ice);
  g.append(plate, glow, V.g, steam);
  let tmp = 20;
  return { g, V,
    setTemp(t){ tmp = t;
      const c1 = lb2Ramp([[0,'#79BEEB'],[20,'#8CCBE2'],[40,'#A6D2CF'],[60,'#E8BE93'],[80,'#F0A57D']], t);
      B.recolor('bathw', [c1, lb2Mix(c1, '#2F7FB8', .35)]);
      ice.setAttribute('opacity', clamp((9 - t)/7, 0, 1));
      steam.setAttribute('opacity', clamp((t - 42)/28, 0, 0.9));
      led.setAttribute('opacity', clamp((t - 22)/30, 0.08, 1));
      glow.setAttribute('opacity', clamp((t - 30)/60, 0, 0.5)); },
    tick(T){ wisps.forEach((p,i) => { const ph = T == null ? 0.5 : ((T*0.35 + i*0.33) % 1);
      p.setAttribute('transform', `translate(0 ${-ph*18})`); p.setAttribute('opacity', T == null ? .45 : (0.6*Math.sin(Math.PI*ph))); }); } };
}

/* Grupo de burbujas reutilizables (sin crear nodos por fotograma). */
function lb2Pool(parent, n, mk){ const a = []; for (let i = 0; i < n; i++){ const el = mk(i); el.setAttribute('visibility','hidden'); parent.append(el); a.push({ el, on:false, x:0, y:0, r:0, v:0, p:0 }); } return a; }
function lb2Spawn(pool, init){ const b = pool.find(b => !b.on); if (!b) return null; b.on = true; init(b); b.el.setAttribute('visibility','visible'); return b; }
function lb2Kill(b){ b.on = false; b.el.setAttribute('visibility','hidden'); }

/* ---------- Escena 1 · frecuencia cardíaca: persona en actividad + pulsómetro con ECG ---------- */
const LB2_POSE = {
  reposo:  { cad:0,    thigh:0,  knee:0,   arm:0,  elbow:0,  lean:0,  bounce:0, speed:0 },
  caminar: { cad:0.95, thigh:24, knee:38,  arm:20, elbow:18, lean:3,  bounce:2, speed:46 },
  trotar:  { cad:1.35, thigh:34, knee:78,  arm:30, elbow:78, lean:9,  bounce:5, speed:120 },
  correr:  { cad:1.65, thigh:46, knee:105, arm:42, elbow:88, lean:15, bounce:7, speed:210 }
};
const LB2_SHIRT = { sed:'#8C96A8', act:'#23A391', dep:'#EE6A43' };
function lb2Ecg(ph, per){
  const q = 0.02/per, g = (c,s) => Math.exp(-Math.pow((ph-c)/s, 2));
  return 0.13*g(0.13, 0.035) - 0.12*g(0.25-1.7*q, q*0.9) + 1.0*g(0.25, q) - 0.24*g(0.25+1.8*q, q*1.1) + 0.3*g(0.5, 0.055);
}
function lb2EscFC(){
  const W = 640, H = 340, B = lb2Base(W, H, 'Persona haciendo ejercicio y pulsómetro', {lab:false});
  const { svg } = B;
  B.lin('sky', [[0,'var(--lb2-sky1)'],[1,'var(--lb2-sky2)']]);
  B.lin('sea', [[0,'var(--lb2-sea2)'],[1,'var(--lb2-sea)']]);
  B.lin('track', [[0,'var(--lb2-track)'],[1,'var(--lb2-track2)']]);
  B.rad('sun', [[0,'var(--lb2-sun)',1],[.55,'var(--lb2-sun)',.55],[1,'var(--lb2-sun)',0]]);
  B.rad('heart', [[0,'#EE7A6E'],[.55,'#C7382F'],[1,'#7E1B17']], .38, .3, .75);
  B.rad('hglow', [[0,'#FF5B5B',.55],[1,'#FF5B5B',0]]);
  svg.append(lb2S('rect',{x:0, y:0, width:W, height:H, fill:B.url('sky')}),
    lb2S('circle',{cx:70, cy:62, r:52, fill:B.url('sun')}), lb2S('circle',{cx:70, cy:62, r:17, style:'fill:var(--lb2-sun)'}));
  /* Andes (Quito) */
  const gMtn = lb2S('g');
  gMtn.append(lb2S('path',{d:'M0,206 L38,188 L82,197 L130,168 L168,184 L214,160 L262,190 L300,176 L346,196 L346,244 L0,244Z', style:'fill:var(--lb2-mtn1)', opacity:.75}),
    lb2S('path',{d:'M120,244 L214,112 L230,110 L326,244Z', style:'fill:var(--lb2-mtn1)'}),
    lb2S('path',{d:'M190,146 L214,112 L230,110 L256,146 L246,141 L236,150 L226,140 L214,151 L203,142Z', style:'fill:var(--lb2-snow)'}),
    lb2S('path',{d:'M214,112 L230,110 L326,244 L262,244Z', fill:'#000', opacity:.08}),
    lb2S('path',{d:'M0,244 C60,220 118,228 176,236 C232,244 280,226 346,232 L346,250 L0,250Z', style:'fill:var(--lb2-mtn2)'}));
  /* nivel del mar */
  const gSea = lb2S('g');
  gSea.append(lb2S('rect',{x:0, y:206, width:346, height:40, fill:B.url('sea')}),
    lb2S('path',{d:'M16,218 q10,-4 20,0 t20,0 M120,228 q10,-4 20,0 t20,0 M232,216 q10,-4 20,0 t20,0 M60,236 q10,-4 20,0 t20,0', fill:'none', stroke:'#FFFFFF', 'stroke-width':1.6, opacity:.45}));
  svg.append(gMtn, gSea);
  /* suelo: césped y pista */
  svg.append(lb2S('rect',{x:0, y:242, width:W, height:22, style:'fill:var(--lb2-grass)'}),
    lb2S('rect',{x:0, y:262, width:W, height:78, fill:B.url('track')}),
    lb2S('rect',{x:0, y:262, width:W, height:2, fill:'#FFFFFF', opacity:.35}),
    lb2S('rect',{x:0, y:326, width:W, height:2.5, fill:'#FFFFFF', opacity:.5}));
  const marks = lb2S('g');
  for (let i = -1; i < 6; i++) marks.append(lb2S('rect',{x:i*80, y:292, width:34, height:3, rx:1.5, fill:'#FFFFFF', opacity:.4}));
  svg.append(marks);
  /* letrero de altitud */
  const sign = lb2S('g'), signT = B.text(52, 208, '', {'font-size':16, 'text-anchor':'middle', class:'lb2-tx2'});
  sign.append(lb2S('rect',{x:49, y:214, width:5, height:50, fill:'#6B5237'}),
    lb2S('rect',{x:10, y:190, width:84, height:28, rx:6, class:'lb2-card', 'stroke-width':1.2}), signT);
  svg.append(sign);
  /* banca para el reposo */
  const bench = lb2S('g');
  bench.append(B.shadow(178, 300, 70, 6), lb2S('rect',{x:112, y:258, width:132, height:10, rx:3, fill:'#A7773F'}), lb2S('rect',{x:112, y:258, width:132, height:3, fill:'#FFFFFF', opacity:.3}),
    lb2S('rect',{x:122, y:268, width:8, height:32, fill:'#6E4E2B'}), lb2S('rect',{x:226, y:268, width:8, height:32, fill:'#6E4E2B'}));
  svg.append(bench);
  /* persona (extremidades como trazos redondeados) */
  const P = lb2S('g'), sh = B.shadow(185, 300, 42, 6);
  const mkL = (col, w) => lb2S('path',{fill:'none', stroke:col, 'stroke-width':w, 'stroke-linecap':'round', 'stroke-linejoin':'round'});
  const legB = mkL('#A86F4E', 13), shoeB = mkL('#D9DEE4', 9), shortB = mkL('#1E2634', 18), armB = mkL('#A86F4E', 10), slvB = mkL('#000', 14);
  const torso = mkL('#8C96A8', 27), neck = mkL('#C68B65', 9);
  const legF = mkL('#C68B65', 13), shoeF = mkL('#F4F6F8', 9), shortF = mkL('#2B3547', 18), armF = mkL('#C68B65', 10), slvF = mkL('#000', 14);
  const head = lb2S('circle',{r:14.5, fill:'#C68B65'}), hair = lb2S('path',{fill:'#2B2118'});
  P.append(sh, armB, slvB, legB, shoeB, shortB, torso, neck, head, hair, legF, shoeF, shortF, armF, slvF);
  svg.append(P);
  /* pulsómetro */
  const M = lb2S('g');
  M.append(lb2S('rect',{x:356, y:16, width:270, height:308, rx:20, fill:'#0A131E', stroke:'#2C3D52', 'stroke-width':3}),
    lb2S('rect',{x:364, y:24, width:254, height:292, rx:14, fill:'none', stroke:'#FFFFFF', opacity:.06, 'stroke-width':2}),
    lb2S('text',{x:378, y:48, 'font-size':14, fill:'#6F8BA8', 'font-family':'var(--font-m)', 'letter-spacing':'1.5'}, 'PULSÓMETRO'));
  const hglow = lb2S('circle',{cx:420, cy:118, r:50, fill:B.url('hglow')});
  const heart = lb2S('g');
  heart.append(
    lb2S('path',{d:'M-6,-34 C-8,-50 4,-60 20,-58 C32,-57 38,-48 36,-40', fill:'none', stroke:'#B83A32', 'stroke-width':11, 'stroke-linecap':'round'}),
    lb2S('path',{d:'M8,-33 C10,-46 16,-52 24,-54', fill:'none', stroke:'#FFFFFF', opacity:.25, 'stroke-width':3, 'stroke-linecap':'round'}),
    lb2S('path',{d:'M-20,-30 L-22,-52', fill:'none', stroke:'#4E6FC0', 'stroke-width':10, 'stroke-linecap':'round'}),
    lb2S('path',{d:'M6,-30 C4,-40 -4,-46 -12,-44', fill:'none', stroke:'#5C7BCB', 'stroke-width':9, 'stroke-linecap':'round'}),
    lb2S('path',{d:'M-2,-30 C22,-40 46,-22 42,4 C38,28 18,42 4,54 C-12,42 -40,24 -42,-2 C-44,-24 -24,-36 -2,-30Z', fill:B.url('heart'), stroke:'#6A1512', 'stroke-width':1.5}),
    lb2S('path',{d:'M8,-26 C16,-6 14,20 6,46', fill:'none', stroke:'#F2C66A', 'stroke-width':2.4, opacity:.85}),
    lb2S('path',{d:'M-30,-18 C-34,-8 -34,4 -30,12', fill:'none', stroke:'#FFFFFF', 'stroke-width':4, 'stroke-linecap':'round', opacity:.35}));
  M.append(hglow, heart);
  const num = lb2S('text',{x:604, y:118, 'text-anchor':'end', 'font-size':60, 'font-weight':700, fill:'#7CF29A', 'font-family':'var(--font-m)'}, '');
  const numU = lb2S('text',{x:604, y:144, 'text-anchor':'end', 'font-size':18, fill:'#7CF29A', opacity:.85, 'font-family':'var(--font-m)'}, 'lpm · pico');
  M.append(num, numU);
  const sub = lb2S('text',{x:378, y:186, 'font-size':18, fill:'#9FB3C8', 'font-family':'var(--font-m)'}, '');
  M.append(sub);
  B.defs.append(lb2S('pattern',{id:B.id('ecg'), width:20, height:20, patternUnits:'userSpaceOnUse', x:370, y:198},
    lb2S('path',{d:'M20 0H0V20', fill:'none', stroke:'#3FE08A', 'stroke-width':1, opacity:.14})));
  const EX = 372, EW = 238, EY = 200, EH = 104;
  M.append(lb2S('rect',{x:EX, y:EY, width:EW, height:EH, rx:8, fill:'#06100B'}), lb2S('rect',{x:EX, y:EY, width:EW, height:EH, rx:8, fill:B.url('ecg')}));
  const trace = lb2S('path',{fill:'none', stroke:'#5CF08A', 'stroke-width':2.4, 'stroke-linejoin':'round', 'stroke-linecap':'round'});
  const dot = lb2S('circle',{r:4, fill:'#C9FFD8'});
  M.append(trace, dot);
  svg.append(M);

  const S = { bpm:70, tgt:70, pose:LB2_POSE.reposo, int:'reposo', phi:0, walk:0, beat:0, samp:[], acc:0, sp:0 };
  const N = EW - 8;
  const polar = (x, y, ang, len) => { const a = ang*Math.PI/180; return [x + Math.sin(a)*len, y + Math.cos(a)*len]; };
  const pl = (...pts) => 'M' + pts.map(p => p[0].toFixed(1)+','+p[1].toFixed(1)).join(' L');
  const part = (a, b, f) => [a[0] + (b[0]-a[0])*f, a[1] + (b[1]-a[1])*f];
  function pose(phi){
    const Pz = S.pose;
    if (S.int === 'reposo'){                         /* sentado en la banca, respirando */
      const br = Math.sin(phi*0.35)*1.2;
      const hip = [178, 252], nk = [174, 198 + br*0.3];
      const kF = [218, 254], aF = [220, 296], kB = [212, 252], aB = [213, 296];
      const shd = [175, 206 + br*0.3];
      return { hip, nk, kF, aF, kB, aB, eF:[190, 238], wF:[214, 248], eB:[186, 236], wB:[208, 246], shd, hd:[173, 180 + br*0.5], lean:0 };
    }
    const bounce = -Pz.bounce*Math.abs(Math.cos(phi));
    const hip = [190, 214 + bounce + (1 - Math.cos(Pz.thigh*Math.PI/180))*6];
    const nk = polar(hip[0], hip[1], 180 - Pz.lean, 56);
    const leg = (ph) => { const th = Pz.thigh*Math.sin(ph); const k = polar(hip[0], hip[1], th, 42);
      const bend = Pz.knee*Math.pow(Math.max(0, Math.cos(ph)), 1.4) + 6; const a = polar(k[0], k[1], th - bend, 42); return [k, a]; };
    const [kF, aF] = leg(phi), [kB, aB] = leg(phi + Math.PI);
    const shd = part(nk, hip, 0.12);
    const arm = (ph) => { const ua = -Pz.arm*Math.sin(ph) - Pz.lean*0.3; const e = polar(shd[0], shd[1], ua, 29); const w = polar(e[0], e[1], ua + Pz.elbow, 27); return [e, w]; };
    const [eF, wF] = arm(phi + Math.PI), [eB, wB] = arm(phi);
    const hd = polar(nk[0], nk[1], 180 - Pz.lean*1.1, 17);
    return { hip, nk, kF, aF, kB, aB, eF, wF, eB, wB, shd, hd, lean:Pz.lean };
  }
  function drawPerson(phi){
    const q = pose(phi);
    legB.setAttribute('d', pl(q.hip, q.kB, q.aB)); legF.setAttribute('d', pl(q.hip, q.kF, q.aF));
    shoeB.setAttribute('d', pl([q.aB[0]-3, q.aB[1]+1], [q.aB[0]+10, q.aB[1]+2])); shoeF.setAttribute('d', pl([q.aF[0]-3, q.aF[1]+1], [q.aF[0]+10, q.aF[1]+2]));
    shortB.setAttribute('d', pl(q.hip, part(q.hip, q.kB, 0.5))); shortF.setAttribute('d', pl(q.hip, part(q.hip, q.kF, 0.5)));
    torso.setAttribute('d', pl(part(q.hip, q.nk, 0.04), part(q.hip, q.nk, 0.9)));
    neck.setAttribute('d', pl(q.nk, part(q.nk, q.hd, 0.55)));
    armB.setAttribute('d', pl(q.shd, q.eB, q.wB)); armF.setAttribute('d', pl(q.shd, q.eF, q.wF));
    slvB.setAttribute('d', pl(q.shd, part(q.shd, q.eB, 0.45))); slvF.setAttribute('d', pl(q.shd, part(q.shd, q.eF, 0.45)));
    lb2At(head, {cx:q.hd[0], cy:q.hd[1]});
    const hx = q.hd[0], hy = q.hd[1];
    hair.setAttribute('d', `M${hx-15},${hy+1} C${hx-16},${hy-14} ${hx-4},${hy-19} ${hx+6},${hy-16} C${hx+13},${hy-14} ${hx+15},${hy-8} ${hx+14},${hy-4} C${hx+6},${hy-9} ${hx-4},${hy-8} ${hx-9},${hy+2} Z`);
    lb2At(sh, {cx:q.hip[0] + 4, rx: S.int === 'reposo' ? 0 : 40});
  }
  function pushSamples(dt){
    const per = 60/Math.max(30, S.bpm), sp = 92;
    S.acc += sp*dt;
    while (S.acc >= 1){ S.acc -= 1; S.beat += (1/sp)/per; S.samp.push(lb2Ecg(S.beat % 1, per)); }
    while (S.samp.length > N) S.samp.shift();
  }
  function drawTrace(){
    const base = EY + EH*0.68, amp = EH*0.52, n = S.samp.length;
    let d = ''; for (let i = 0; i < n; i++){ const x = EX + 4 + (N - n + i), y = base - S.samp[i]*amp; d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
    trace.setAttribute('d', d);
    if (n){ lb2At(dot, {cx: EX + 4 + (N-1), cy: base - S.samp[n-1]*amp}); }
  }
  return {
    el: svg,
    upd(v, est){
      S.int = v.intensidad; S.pose = LB2_POSE[v.intensidad] || LB2_POSE.reposo; S.tgt = est.extra.pico;
      const quito = v.altitud === 'quito';
      gMtn.setAttribute('display', quito ? 'inline' : 'none'); gSea.setAttribute('display', quito ? 'none' : 'inline');
      signT.textContent = quito ? '2.850 m' : '0 m';
      bench.setAttribute('opacity', S.int === 'reposo' ? 1 : 0.0);
      const shirt = LB2_SHIRT[v.condicion] || '#8C96A8';
      torso.setAttribute('stroke', shirt); slvF.setAttribute('stroke', shirt); slvB.setAttribute('stroke', lb2Mix(shirt, '#000000', .22));
      hair.setAttribute('fill', v.edad >= 45 ? '#B8B8B8' : '#2B2118');
      numU.textContent = S.int === 'reposo' ? 'lpm · reposo' : 'lpm · pico';
      sub.textContent = 'reposo ' + est.extra.rest + ' · máx. ' + est.extra.fcMax;
      svg.setAttribute('aria-label', `Persona ${(LB2_COND[v.condicion]||{}).n ? LB2_COND[v.condicion].n.toLowerCase() : ''} de ${v.edad} años en actividad «${(LB2_INT[v.intensidad]||{}).n || ''}» a ${quito ? '2.850 m (Quito)' : 'nivel del mar'}. El pulsómetro marca un pico de ${est.extra.pico} latidos por minuto; reposo ${est.extra.rest} y máximo teórico ${est.extra.fcMax}. El corazón y el trazo de ECG laten a ese ritmo.`);
    },
    tick(T, dt){
      if (T == null){
        S.bpm = S.tgt; S.samp = []; S.acc = 0; S.beat = 0.6;
        for (let i = 0; i < 200 && S.samp.length < N; i++) pushSamples(0.02);
        drawPerson(1.1); drawTrace(); num.textContent = String(Math.round(S.bpm)); heart.setAttribute('transform','translate(420 118) scale(0.9)'); hglow.setAttribute('opacity', .6);
        marks.setAttribute('transform', ''); return;
      }
      S.bpm = lb2Ease(S.bpm, S.tgt, dt, 5);
      S.phi += 2*Math.PI*(S.pose.cad || 0.25)*dt;
      S.sp = lb2Ease(S.sp, S.pose.speed, dt, 2); S.walk = (S.walk + S.sp*dt) % 80;
      marks.setAttribute('transform', `translate(${-S.walk.toFixed(1)} 0)`);
      pushSamples(dt); drawTrace(); drawPerson(S.phi);
      const ph = S.beat % 1, pulse = Math.exp(-Math.pow((ph - 0.27)/0.06, 2));
      heart.setAttribute('transform', `translate(420 118) scale(${(0.9*(1 + 0.085*pulse)).toFixed(3)})`);
      hglow.setAttribute('opacity', (0.25 + 0.75*pulse).toFixed(2));
      num.textContent = String(Math.round(S.bpm));
    }
  };
}

/* ---------- Escena 2 · catalasa: tubo en baño maría, tejido, espuma de O₂, termómetro y tira de pH ---------- */
const LB2_PHC = [[3,'#E23B2E'],[4,'#EF6D28'],[5,'#F4A020'],[6,'#E4CF34'],[7,'#62B946'],[8,'#26A07A'],[9,'#2B7CC1'],[10,'#3C4BB0'],[11,'#6B3A9E']];
function lb2EscCat(){
  const W = 640, H = 340, B = lb2Base(W, H, 'Montaje de la catalasa', {benchY:300});
  const { svg } = B;
  B.lin('h2o2', [[0,'#E4F3FC',.45],[1,'#BFDFF3',.6]]);
  B.rad('liver', [[0,'#C2524A'],[.6,'#8E2A26'],[1,'#5A1715']], .35, .3, .8);
  B.lin('potTop', [[0,'#FBF0C8'],[1,'#EFD99A']]);
  B.lin('bottle', [[0,'#4A2A12'],[.25,'#8A5626'],[.5,'#6B3E18'],[1,'#3A200D']], 0,0,1,0);
  B.lin('phbar', LB2_PHC.map(([p,c]) => [(p-3)/8, c]), 0,0,1,0);
  /* soporte universal con pinza */
  svg.append(lb2S('rect',{x:56, y:292, width:96, height:9, rx:3, fill:B.url('metalV')}),
    lb2S('rect',{x:96, y:26, width:9, height:268, rx:4, fill:B.url('metal')}),
    lb2S('rect',{x:98, y:70, width:170, height:9, rx:3, fill:B.url('metalV')}),
    lb2S('rect',{x:92, y:64, width:18, height:21, rx:4, fill:'#2F3A48'}));
  /* baño maría */
  const bath = lb2Bath(B, 158, 124, 262, 160, 152);
  /* tubo de ensayo dentro del baño */
  const tube = lb2Tube(B, 282, 40, 46, 228, {liquid:B.url('h2o2')});
  const LIQ = 206; tube.setLevel(LIQ);
  /* tejido: hígado (trozo brillante) o papa (cubo) */
  const tissue = lb2S('g'), liver = lb2S('g'), potato = lb2S('g');
  liver.append(lb2S('path',{d:'M-17,6 C-20,-6 -10,-14 0,-12 C10,-15 19,-8 18,2 C17,11 8,14 -2,13 C-10,14 -16,12 -17,6Z', fill:B.url('liver'), stroke:'#4A1210', 'stroke-width':1}),
    lb2S('path',{d:'M-9,-7 C-4,-10 3,-10 7,-8', fill:'none', stroke:'#FFFFFF', 'stroke-width':2.2, 'stroke-linecap':'round', opacity:.5}));
  potato.append(lb2S('path',{d:'M-15,-6 L-4,-13 L16,-9 L16,9 L4,14 L-15,9Z', fill:'#E3C77F', stroke:'#A88A45', 'stroke-width':1}),
    lb2S('path',{d:'M-15,-6 L-4,-13 L16,-9 L4,-2Z', fill:B.url('potTop')}),
    lb2S('path',{d:'M4,-2 L16,-9 L16,9 L4,14Z', fill:'#CDAE62'}));
  tissue.append(liver, potato);
  const cooked = lb2S('g',{opacity:0});
  cooked.append(lb2S('path',{d:'M-17,6 C-20,-6 -10,-14 0,-12 C10,-15 19,-8 18,2 C17,11 8,14 -2,13 C-10,14 -16,12 -17,6Z', fill:'#8C7A6C', opacity:.85}));
  tissue.append(cooked);
  tube.over.append(tissue);
  /* burbujas que suben en el líquido y columna de espuma */
  const bubG = lb2S('g'), foamG = lb2S('g');
  const clip = lb2S('clipPath',{id:B.id('tclip')}, lb2S('rect',{x:tube.x+1.5, y:tube.top+2, width:tube.w-3, height:tube.h}));
  B.defs.append(clip);
  foamG.setAttribute('clip-path', B.url('tclip')); bubG.setAttribute('clip-path', B.url('tclip'));
  const bubs = lb2Pool(bubG, 26, () => lb2S('circle',{r:2, fill:B.url('bub'), stroke:'#FFFFFF', 'stroke-width':.8}));
  const foamBack = lb2S('rect',{x:tube.x+1.5, width:tube.w-3, fill:'#F4F8FB', opacity:.9});
  foamG.append(foamBack);
  const rng = lb2Rng(7), foam = [];
  for (let row = 0; row < 26; row++) for (let c = 0; c < 4; c++){
    const r = 4 + rng()*4.5, x = tube.x + 6 + c*11 + (row%2)*5 + rng()*3, y = LIQ - 2 - row*6.4 - rng()*2;
    const el = lb2S('circle',{cx:x, cy:y, r, fill:B.url('foam'), stroke:'#B9CBD8', 'stroke-width':.7});
    foamG.append(el); foam.push({ el, x, y, r, k:rng()*6.28 });
  }
  tube.over.append(bubG, foamG);
  bath.V.over.append(tube.g);
  svg.append(bath.g);
  /* termómetro en el baño */
  const th = lb2Thermo(B, 392, 70, 266, 0, 80);
  svg.append(th.g);
  /* insignia del tratamiento previo */
  const badge = lb2S('g',{transform:'translate(236 104)'});
  const bSnow = lb2S('g'), bFire = lb2S('g');
  bSnow.append(lb2S('circle',{r:15, fill:'#DDF1FF', stroke:'#5AA6DA', 'stroke-width':1.5}),
    lb2S('path',{d:'M0,-9 V9 M-7.8,-4.5 L7.8,4.5 M-7.8,4.5 L7.8,-4.5 M-3,-7 L0,-4 L3,-7 M-3,7 L0,4 L3,7', fill:'none', stroke:'#2F7FBF', 'stroke-width':1.8, 'stroke-linecap':'round'}));
  bFire.append(lb2S('circle',{r:15, fill:'#FFE6D6', stroke:'#E0703A', 'stroke-width':1.5}),
    lb2S('path',{d:'M0,10 C-7,10 -8,3 -5,-2 C-4,1 -2,2 -1,1 C-3,-4 0,-8 2,-11 C3,-6 8,-3 7,3 C7,7 4,10 0,10Z', fill:'#F2762E'}),
    lb2S('path',{d:'M0,9 C-3,9 -4,6 -2,3 C0,5 2,3 2,1 C4,4 4,9 0,9Z', fill:'#FFD23F'}));
  badge.append(bSnow, bFire);
  svg.append(badge);
  /* tabla de pH con tira indicadora */
  const card = lb2S('g');
  card.append(lb2S('rect',{x:448, y:22, width:178, height:136, rx:12, class:'lb2-card', 'stroke-width':1.2}),
    lb2S('rect',{x:462, y:40, width:130, height:12, rx:2, fill:'#F7F3E8', stroke:'#CFC7B2', 'stroke-width':1}));
  const pad = lb2S('rect',{x:592, y:37, width:22, height:18, rx:3, stroke:'#00000033', 'stroke-width':1});
  card.append(pad, lb2S('rect',{x:462, y:72, width:152, height:16, rx:4, fill:B.url('phbar')}));
  [3,5,7,9,11].forEach(p => { const x = 462 + (p-3)/8*152; card.append(lb2S('line',{x1:x, x2:x, y1:88, y2:94, style:'stroke:var(--ink-3)', 'stroke-width':1.2}),
    B.text(x, 111, String(p), {'font-size':15, 'text-anchor':'middle', class:'lb2-tx2'})); });
  const mark = lb2S('path',{d:'M0,0 L-6,-9 L6,-9Z', style:'fill:var(--ink)'});
  const phT = B.text(537, 144, '', {'text-anchor':'middle', 'font-size':22});
  card.append(mark, phT);
  svg.append(card);
  /* frasco de H₂O₂ */
  const bottle = lb2S('g');
  bottle.append(B.shadow(540, 300, 40, 6),
    lb2S('path',{d:'M508,300 L508,214 Q508,200 522,196 L528,194 L528,182 L552,182 L552,194 L558,196 Q572,200 572,214 L572,300Z', fill:B.url('bottle'), stroke:'#2A1608', 'stroke-width':1}),
    lb2S('rect',{x:526, y:168, width:28, height:16, rx:3, fill:'#F2F2F2', stroke:'#BDBDBD', 'stroke-width':1}),
    lb2S('rect',{x:512, y:224, width:56, height:52, rx:5, fill:'#FFFFFF', opacity:.94}),
    lb2S('rect',{x:514, y:207, width:6, height:84, rx:3, fill:'#FFFFFF', opacity:.18}),
    lb2S('text',{x:540, y:246, 'text-anchor':'middle', 'font-size':15, 'font-weight':700, fill:'#1F2A36', 'font-family':'var(--font-b)'}, 'H₂O₂'));
  const concT = lb2S('text',{x:540, y:267, 'text-anchor':'middle', 'font-size':16, 'font-weight':700, fill:'#B3261E', 'font-family':'var(--font-m)'}, '');
  bottle.append(concT);
  svg.append(bottle);

  const S = { foam:0, tgt:0, rate:0, acc:0 };
  function drawFoam(T){
    const top = LIQ - S.foam*150;
    lb2At(foamBack, {y:top + 5, height:Math.max(0, LIQ - top - 3)});
    foam.forEach(f => {
      const vis = f.y - f.r*0.3 > top && S.foam > 0.015;
      f.el.setAttribute('visibility', vis ? 'visible' : 'hidden');
      if (vis && T != null) f.el.setAttribute('r', (f.r*(1 + 0.07*Math.sin(T*3 + f.k))).toFixed(2));
    });
  }
  return {
    el: svg,
    upd(v, est){
      S.tgt = clamp(est.y/60, 0, 1); S.rate = est.y;
      bath.setTemp(v.temp); th.set(v.temp);
      liver.setAttribute('display', v.fuente === 'papa' ? 'none' : 'inline'); potato.setAttribute('display', v.fuente === 'papa' ? 'inline' : 'none');
      const s = 0.62 + 0.38*clamp((v.enzima - 0.5)/3.5, 0, 1);
      tissue.setAttribute('transform', `translate(${tube.cx} ${tube.top + tube.h - 20}) scale(${s.toFixed(2)})`);
      cooked.setAttribute('opacity', v.previo === 'calor' ? 1 : 0);
      if (v.fuente === 'papa') cooked.firstChild.setAttribute('d', 'M-15,-6 L-4,-13 L16,-9 L16,9 L4,14 L-15,9Z'); else cooked.firstChild.setAttribute('d', 'M-17,6 C-20,-6 -10,-14 0,-12 C10,-15 19,-8 18,2 C17,11 8,14 -2,13 C-10,14 -16,12 -17,6Z');
      bSnow.setAttribute('display', v.previo === 'frio' ? 'inline' : 'none'); bFire.setAttribute('display', v.previo === 'calor' ? 'inline' : 'none');
      pad.setAttribute('fill', lb2Ramp(LB2_PHC, v.pH));
      mark.setAttribute('transform', `translate(${(462 + clamp((v.pH-3)/8, 0, 1)*152).toFixed(1)} 72)`);
      phT.textContent = 'pH ' + lb2N(v.pH, 1);
      concT.textContent = lb2N(v.sustrato, 1) + ' %';
      const nivel = S.tgt > 0.66 ? 'alta' : S.tgt > 0.3 ? 'media' : S.tgt > 0.05 ? 'baja' : 'casi nula';
      svg.setAttribute('aria-label', `Tubo de ensayo en baño maría a ${lb2N(v.temp,0)} °C con ${v.fuente === 'papa' ? 'papa' : 'hígado'} (${lb2N(v.enzima,1)} mL de extracto${v.previo === 'calor' ? ', previamente calentado a 70 °C' : v.previo === 'frio' ? ', previamente enfriado a 4 °C' : ''}) y H₂O₂ al ${lb2N(v.sustrato,1)} %, pH ${lb2N(v.pH,1)}. La columna de espuma de oxígeno es ${nivel}.`);
    },
    tick(T, dt){
      S.foam = lb2Ease(S.foam, S.tgt, dt, 1.6);
      bath.tick(T);
      if (T == null){
        bubs.forEach(lb2Kill);
        const n = Math.round(S.tgt*14), r = lb2Rng(3);
        for (let i = 0; i < n; i++) lb2Spawn(bubs, b => { b.x = tube.cx + (r()-0.5)*26; b.y = LIQ + 6 + r()*50; b.r = 1.5 + r()*2.2; lb2At(b.el, {cx:b.x, cy:b.y, r:b.r}); });
        drawFoam(null); return;
      }
      S.acc += dt*S.rate*0.55;
      while (S.acc >= 1){ S.acc -= 1; lb2Spawn(bubs, b => { b.x = tube.cx + (Math.random()-0.5)*20; b.y = tube.top + tube.h - 22; b.r = 1.4 + Math.random()*2.4; b.v = 38 + Math.random()*30; b.p = Math.random()*6; }); }
      bubs.forEach(b => { if (!b.on) return; b.y -= b.v*dt; b.p += dt*5;
        if (b.y < LIQ + 2) { lb2Kill(b); return; }
        lb2At(b.el, {cx:b.x + Math.sin(b.p)*1.5, cy:b.y, r:b.r}); });
      drawFoam(T);
    }
  };
}

/* ---------- Escena 3 · ósmosis: vaso con solución, cilindro de papa, células al microscopio y balanza ---------- */
function lb2EscOsm(){
  const W = 640, H = 340, B = lb2Base(W, H, 'Montaje de ósmosis en papa', {benchY:300});
  const { svg } = B;
  B.lin('sol', [[0,'#BFE3F6',.3],[1,'#8CC6E8',.46]]);
  B.lin('potB', [[0,'#FBEDBE'],[.35,'#EED48A'],[1,'#C7A457']]);
  B.rad('potF', [[0,'#FFF6D8'],[.7,'#F3E0A2'],[1,'#D9BC6E']]);
  B.lin('lcd', [[0,'#0F2016'],[1,'#07130C']]);
  /* vaso con la solución */
  const V = lb2Vessel(B, 30, 104, 250, 194, {r:16, liquid:B.url('sol')});
  const LV = 142; V.setLevel(LV);
  const salt = lb2S('g'), rng = lb2Rng(11), grains = [];
  for (let i = 0; i < 90; i++){ const x = 42 + rng()*226, y = LV + 6 + rng()*140; const el = lb2S('circle',{cx:x, cy:y, r:1.5 + rng()*0.9, fill:'#FFFFFF', stroke:'#5D86A8', 'stroke-width':.6}); salt.append(el); grains.push({el, x, y, k:rng()*6.28, i}); }
  /* cilindro de papa sumergido */
  const cyl = lb2S('g'), cylBody = lb2S('path',{fill:B.url('potB'), stroke:'#A98C48', 'stroke-width':1.2}), cylFace = lb2S('ellipse',{fill:B.url('potF'), stroke:'#A98C48', 'stroke-width':1.2}), cylRing = lb2S('ellipse',{fill:'none', stroke:'#D9BF78', 'stroke-width':1.2}), cylHi = lb2S('path',{fill:'none', stroke:'#FFFFFF', 'stroke-width':3, 'stroke-linecap':'round', opacity:.45});
  cyl.append(lb2S('ellipse',{cx:166, cy:292, rx:84, ry:4, fill:'#000', opacity:.12}), cylBody, cylHi, cylFace, cylRing);
  /* flechas de agua (gotas animadas + flechas fijas) */
  const drops = lb2S('g'), arrows = lb2S('g');
  const dropL = [];
  for (let i = 0; i < 10; i++){ const el = lb2S('path',{d:'M0,-6 C3,-2 4,1 4,2.5 A4,4 0 0 1 -4,2.5 C-4,1 -3,-2 0,-6Z', fill:'#3E9BE0', stroke:'#FFFFFF', 'stroke-width':1}); drops.append(el); dropL.push({el, a:(i/10)*Math.PI + Math.PI*0.05, p:i/10}); }
  const arrowTxt = B.text(155, LV + 30, '', {'text-anchor':'middle', 'font-size':18, style:'fill:var(--info);paint-order:stroke;stroke:var(--bg-2);stroke-width:5px;stroke-linejoin:round', 'font-family':'var(--font-b)', 'font-weight':700});
  const arwP = lb2S('path',{fill:'none', style:'stroke:var(--info)', 'stroke-width':3.4, 'stroke-linecap':'round', 'stroke-linejoin':'round'});
  arrows.append(arwP, arrowTxt);
  V.inner.append(salt, cyl); V.over.append(drops, arrows);
  svg.append(V.g);
  /* etiqueta del vaso */
  const lab = lb2S('g');
  const concT = lb2S('text',{x:208, y:130, 'text-anchor':'middle', 'font-size':17, 'font-weight':700, fill:'#1F2A36', 'font-family':'var(--font-m)'}, '');
  lab.append(lb2S('rect',{x:150, y:111, width:116, height:27, rx:5, fill:'#FFFFFF', stroke:'#C9D3DD', 'stroke-width':1, opacity:.95}), concT);
  svg.append(lab);
  /* termómetro */
  const th = lb2Thermo(B, 58, 92, 282, 5, 35);
  svg.append(th.g);
  /* lupa: células de papa */
  const LX = 352, LY = 76, LR = 56;
  B.defs.append(lb2S('clipPath',{id:B.id('lens')}, lb2S('circle',{cx:LX, cy:LY, r:LR-3})));
  const lens = lb2S('g'), cells = lb2S('g',{'clip-path':B.url('lens')});
  cells.append(lb2S('rect',{x:LX-LR, y:LY-LR, width:LR*2, height:LR*2, fill:'#CFE7F4'}));
  const protos = [];
  for (let r = -1; r <= 1; r++) for (let c = -1; c <= 1; c++){
    const cx = LX + c*38 + (r%2 ? 19 : 0), cy = LY + r*34, w = 34, hh = 30;
    cells.append(lb2S('rect',{x:cx-w/2, y:cy-hh/2, width:w, height:hh, rx:6, fill:'none', stroke:'#8E7B45', 'stroke-width':3}));
    const pr = lb2S('g'); pr.append(lb2S('rect',{x:-w/2+2, y:-hh/2+2, width:w-4, height:hh-4, rx:5, fill:'#F4E8C3', stroke:'#C4AC6A', 'stroke-width':1}),
      lb2S('ellipse',{cx:-5, cy:-3, rx:4, ry:3, fill:'#FFFFFF', stroke:'#BFB08A', 'stroke-width':.8}), lb2S('ellipse',{cx:6, cy:4, rx:3.5, ry:2.6, fill:'#FFFFFF', stroke:'#BFB08A', 'stroke-width':.8}), lb2S('ellipse',{cx:4, cy:-6, rx:2.6, ry:2, fill:'#FFFFFF', stroke:'#BFB08A', 'stroke-width':.8}));
    cells.append(pr); protos.push({ el:pr, cx, cy });
  }
  lens.append(lb2S('line',{x1:LX-LR*0.72, y1:LY+LR*0.72, x2:228, y2:232, style:'stroke:var(--ink-3)', 'stroke-width':1.4, 'stroke-dasharray':'4 4'}),
    cells, lb2S('circle',{cx:LX, cy:LY, r:LR, fill:'none', stroke:'#39424F', 'stroke-width':6}),
    lb2S('circle',{cx:LX, cy:LY, r:LR-3, fill:'none', stroke:'#FFFFFF', 'stroke-width':1.2, opacity:.5}),
    lb2S('path',{d:`M${LX-LR*0.55},${LY-LR*0.62} A${LR*0.8},${LR*0.8} 0 0 1 ${LX+LR*0.2},${LY-LR*0.82}`, fill:'none', stroke:'#FFFFFF', 'stroke-width':4, 'stroke-linecap':'round', opacity:.45}));
  svg.append(lens);
  /* reloj de cocina (tiempo de inmersión) */
  const TX = 348, TY = 256;
  const wedge = lb2S('path',{fill:'#F28B6B', opacity:.55}), hand = lb2S('line',{x1:TX, y1:TY, stroke:'#C0392B', 'stroke-width':2.5, 'stroke-linecap':'round'});
  const clock = lb2S('g');
  clock.append(B.shadow(TX, 300, 34, 5), lb2S('circle',{cx:TX, cy:TY, r:32, fill:'#E9EEF2', stroke:'#8B97A4', 'stroke-width':2}), lb2S('circle',{cx:TX, cy:TY, r:27, fill:'#FFFFFF'}), wedge);
  for (let i = 0; i < 12; i++){ const a = i/12*Math.PI*2; clock.append(lb2S('line',{x1:TX + Math.sin(a)*22, y1:TY - Math.cos(a)*22, x2:TX + Math.sin(a)*26, y2:TY - Math.cos(a)*26, stroke:'#56606B', 'stroke-width':i%3 ? 1 : 2})); }
  clock.append(hand, lb2S('circle',{cx:TX, cy:TY, r:3, fill:'#56606B'}), lb2S('rect',{x:TX-6, y:TY-40, width:12, height:8, rx:2, fill:'#8B97A4'}));
  const tiempoT = lb2S('text',{x:TX, y:327, 'text-anchor':'middle', 'font-size':18, fill:'#E6ECF2', 'font-family':'var(--font-m)', 'font-weight':600}, '');
  svg.append(clock, tiempoT);
  /* balanza digital con el cilindro ya secado */
  const bal = lb2S('g');
  bal.append(B.shadow(518, 300, 108, 7),
    lb2S('path',{d:'M414,298 L424,236 Q426,228 436,228 L600,228 Q610,228 612,236 L622,298Z', fill:'#E3E8EE', stroke:'#8F9BA8', 'stroke-width':1.5}),
    lb2S('path',{d:'M414,298 L424,236 Q426,228 436,228 L600,228 Q610,228 612,236 L614,246 L420,246Z', fill:'#FFFFFF', opacity:.4}),
    lb2S('rect',{x:440, y:254, width:156, height:34, rx:6, fill:B.url('lcd'), stroke:'#2B3A31', 'stroke-width':1.5}),
    lb2S('rect',{x:446, y:214, width:144, height:10, rx:4, fill:B.url('metalV')}),
    lb2S('rect',{x:508, y:222, width:20, height:8, fill:'#8F9BA8'}));
  const pc = lb2S('g'), pcBody = lb2S('path',{fill:B.url('potB'), stroke:'#A98C48', 'stroke-width':1}), pcFace = lb2S('ellipse',{fill:B.url('potF'), stroke:'#A98C48', 'stroke-width':1});
  pc.append(pcBody, pcFace);
  const massT = lb2S('text',{x:588, y:280, 'text-anchor':'end', 'font-size':24, 'font-weight':700, fill:'#8CF5A0', 'font-family':'var(--font-m)'}, '');
  const iniT = lb2S('text',{x:518, y:327, 'text-anchor':'middle', 'font-size':17, fill:'#C9D3DE', 'font-family':'var(--font-m)'}, '');
  bal.append(pc, massT, iniT);
  svg.append(bal);

  const S = { y:0, tgt:0, L:120, dir:0 };
  function cylPath(cx, cy, L, D, wr, T){
    const x0 = cx - L/2, x1 = cx + L/2, n = 18; let top = '', bot = '';
    for (let i = 0; i <= n; i++){ const x = x0 + (x1-x0)*i/n, w = wr*Math.sin(i*1.9 + (T||0)*0) ; top += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (cy - D/2 + w).toFixed(1); }
    for (let i = n; i >= 0; i--){ const x = x0 + (x1-x0)*i/n, w = wr*Math.sin(i*2.3 + 1); bot += ' L' + x.toFixed(1) + ',' + (cy + D/2 - w).toFixed(1); }
    return top + bot + ' Z';
  }
  function draw(T){
    const f = S.y/100, sx = 1 + f*0.9, sy = 1 + f*1.7, L = S.L*sx, D = 38*sy, wr = Math.max(0, -S.y)/14*3.2;
    const cx = 166, cy = 268 - (D - 38)/2;
    cylBody.setAttribute('d', cylPath(cx, cy, L, D, wr));
    lb2At(cylFace, {cx:cx + L/2, cy, rx:D*0.24, ry:D/2 - wr*0.3}); lb2At(cylRing, {cx:cx + L/2, cy, rx:D*0.15, ry:D*0.33});
    cylHi.setAttribute('d', `M${(cx - L/2 + 8).toFixed(1)},${(cy - D*0.3).toFixed(1)} L${(cx + L/2 - 10).toFixed(1)},${(cy - D*0.3).toFixed(1)}`);
    const shade = clamp(-S.y/14, 0, 1);
    cylBody.style.opacity = String(1 - shade*0.12);
    /* versión pequeña en la balanza */
    const pL = L*0.55, pD = D*0.55, px = 510, py = 214 - pD/2;
    pcBody.setAttribute('d', cylPath(px, py, pL, pD, wr*0.55)); lb2At(pcFace, {cx:px + pL/2, cy:py, rx:pD*0.24, ry:pD/2});
    /* células */
    const k = S.y >= 0 ? 0.97 + clamp(S.y/14, 0, 1)*0.03 : 0.97 - clamp(-S.y/14, 0, 1)*0.36;
    protos.forEach(p => p.el.setAttribute('transform', `translate(${p.cx} ${p.cy}) scale(${k.toFixed(3)} ${(k*0.97).toFixed(3)})`));
    /* gotas de agua: entran (+) o salen (−) del cilindro */
    const mag = clamp(Math.abs(S.y)/10, 0, 1), dir = S.y > 0.4 ? 1 : S.y < -0.4 ? -1 : 0;
    dropL.forEach((d, i) => {
      if (!dir || i >= Math.round(3 + mag*7)){ d.el.setAttribute('visibility','hidden'); return; }
      d.el.setAttribute('visibility','visible');
      const ph = T == null ? ((i*0.37) % 1) : ((T*0.45 + d.p) % 1);
      const u = dir > 0 ? 1 - ph : ph;                      /* 1 = lejos del cilindro, 0 = en la superficie */
      const ang = Math.PI + d.a, rx = L/2 + 10 + u*44, ry = D/2 + 8 + u*44;
      const x = cx + Math.cos(ang)*rx, y = cy + Math.sin(ang)*ry;
      const rot = Math.atan2(Math.sin(ang)*ry, Math.cos(ang)*rx)*180/Math.PI + (dir > 0 ? -90 : 90);
      d.el.setAttribute('transform', `translate(${x.toFixed(1)} ${Math.min(y, 292).toFixed(1)}) rotate(${rot.toFixed(0)})`);
      d.el.setAttribute('opacity', (Math.sin(Math.PI*ph)*0.9 + 0.1).toFixed(2));
    });
    /* flecha fija sobre el cilindro */
    if (dir){
      const ay = cy - D/2 - 12, a0 = ay - 34, a1 = ay;
      const [p0, p1] = dir > 0 ? [a0, a1] : [a1, a0];
      arwP.setAttribute('d', `M${cx},${p0} L${cx},${p1} M${cx-7},${p1 - 8*dir} L${cx},${p1} L${cx+7},${p1 - 8*dir}`);
      arwP.setAttribute('opacity', (0.4 + 0.6*mag).toFixed(2));
      lb2At(arrowTxt, {x:cx, y:ay - 42}); arrowTxt.setAttribute('text-anchor','middle');
      arrowTxt.textContent = dir > 0 ? 'entra agua' : 'sale agua';
    } else { arwP.setAttribute('d', ''); lb2At(arrowTxt, {x:cx, y:cy - D/2 - 22}); arrowTxt.setAttribute('text-anchor','middle'); arrowTxt.textContent = 'flujo neto ≈ 0'; }
    /* partículas de sal que se agitan */
    if (T != null) grains.forEach(g => { if (g.el.getAttribute('visibility') === 'hidden') return; lb2At(g.el, {cx:g.x + Math.sin(T*0.8 + g.k)*2.2, cy:g.y + Math.cos(T*0.6 + g.k)*1.8}); });
  }
  return {
    el: svg,
    upd(v, est){
      S.tgt = est.y; S.L = 52 + clamp((v.largo - 2)/4, 0, 1)*108;
      const n = Math.round(clamp(v.conc/2, 0, 1)*grains.length);
      grains.forEach((g, i) => g.el.setAttribute('visibility', i < n ? 'visible' : 'hidden'));
      const c1 = lb2Mix('#BFE3F6', '#D5E4EA', v.conc/2), c2 = lb2Mix('#8CC6E8', '#A9C4D2', v.conc/2);
      B.recolor('sol', [c1, c2]);
      concT.textContent = 'NaCl ' + lb2N(v.conc, 1) + ' %';
      th.set(v.temp);
      const a = v.tiempo/60*Math.PI*2, r = 25;
      wedge.setAttribute('d', v.tiempo >= 60 ? `M${TX},${TY-r} A${r},${r} 0 1 1 ${TX-0.01},${TY-r} Z`
        : `M${TX},${TY} L${TX},${TY-r} A${r},${r} 0 ${v.tiempo > 30 ? 1 : 0} 1 ${(TX + Math.sin(a)*r).toFixed(1)},${(TY - Math.cos(a)*r).toFixed(1)} Z`);
      lb2At(hand, {x2:TX + Math.sin(a)*23, y2:TY - Math.cos(a)*23});
      tiempoT.textContent = lb2N(v.tiempo, 0) + ' min';
      const m0 = Math.PI*0.25*v.largo*1.06, mf = m0*(1 + est.y/100);
      massT.textContent = lb2N(mf, 2) + ' g';
      iniT.textContent = 'masa inicial ' + lb2N(m0, 2) + ' g';
      const tipo = est.y > 0.5 ? 'hipotónica: el cilindro gana agua, se hincha y sus células quedan turgentes' : est.y < -0.5 ? 'hipertónica: el cilindro pierde agua, se arruga y sus células se plasmolizan' : 'casi isotónica: el cilindro no gana ni pierde agua';
      svg.setAttribute('aria-label', `Vaso con solución de NaCl al ${lb2N(v.conc,1)} % a ${lb2N(v.temp,0)} °C y un cilindro de papa de ${lb2N(v.largo,1)} cm durante ${lb2N(v.tiempo,0)} min. La solución es ${tipo}. La balanza marca ${lb2N(mf,2)} g frente a ${lb2N(m0,2)} g iniciales.`);
    },
    tick(T, dt){ S.y = lb2Ease(S.y, S.tgt, dt, 2.5); draw(T); }
  };
}

/* ---------- Escena 4 · fermentación: matraz con levadura en baño, globo que se infla con CO₂ ---------- */
function lb2EscFer(){
  const W = 640, H = 340, B = lb2Base(W, H, 'Montaje de fermentación', {benchY:300});
  const { svg } = B;
  B.lin('yeast', [[0,'#EEDCAE',.88],[1,'#C9A665',.95]]);
  B.rad('ball', [[0,'#FF9AA3'],[.45,'#E5485A'],[1,'#A31E30']], .36, .3, .75);
  const bath = lb2Bath(B, 86, 150, 330, 136, 176);
  svg.append(bath.g);
  /* matraz Erlenmeyer */
  const cx = 226, NT = 116, NB = 156, BY = 280, NW = 19, BW = 84;
  const sideX = (y) => NW + (BW - NW)*clamp((y - NB)/(BY - 14 - NB), 0, 1);
  const body = `M${cx-NW},${NT} L${cx-NW},${NB} L${cx-BW},${BY-14} Q${cx-BW-4},${BY} ${cx-BW+12},${BY} L${cx+BW-12},${BY} Q${cx+BW+4},${BY} ${cx+BW},${BY-14} L${cx+NW},${NB} L${cx+NW},${NT}`;
  const F = lb2S('g'), inner = lb2S('g'), over = lb2S('g');
  const LV = 214, liq = lb2S('path',{fill:B.url('yeast')});
  const lx = sideX(LV) - 2;
  liq.setAttribute('d', `M${cx-lx},${LV-3} Q${cx},${LV+3} ${cx+lx},${LV-3} L${cx+BW-3},${BY-14} Q${cx+BW},${BY-2} ${cx+BW-12},${BY-2} L${cx-BW+12},${BY-2} Q${cx-BW},${BY-2} ${cx-BW+3},${BY-14} Z`);
  B.defs.append(lb2S('clipPath',{id:B.id('fl')}, lb2S('path',{d:liq.getAttribute('d')})));
  const cellsG = lb2S('g',{'clip-path':B.url('fl')}), bubG = lb2S('g',{'clip-path':B.url('fl')}), sugarG = lb2S('g'), airG = lb2S('g',{'clip-path':B.url('fl')});
  const rng = lb2Rng(5), yeast = [];
  for (let i = 0; i < 30; i++){ const x = cx - 70 + rng()*140, y = LV + 6 + rng()*56; const g = lb2S('g'); const c1 = lb2S('ellipse',{rx:4.2, ry:3.3, 'stroke-width':.8}), c2 = lb2S('circle',{cx:4.4, cy:-2.2, r:1.8, 'stroke-width':.6});
    g.append(c1, c2); cellsG.append(g); yeast.push({g, c:[c1, c2], x, y, k:rng()*6.28, rot:rng()*180}); }
  const grains = [];
  for (let i = 0; i < 30; i++){ const x = cx - 62 + rng()*124, y = BY - 6 - rng()*8; const el = lb2S('rect',{x:-2.2, y:-2.2, width:4.4, height:4.4, rx:.8, fill:'#FFFFFF', stroke:'#BFB59C', 'stroke-width':.6, transform:`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(rng()*90).toFixed(0)})`}); sugarG.append(el); grains.push(el); }
  const bubs = lb2Pool(bubG, 34, () => lb2S('circle',{r:2, fill:B.url('bub'), stroke:'#FFFFFF', 'stroke-width':.7}));
  const airB = lb2Pool(airG, 10, () => lb2S('circle',{r:4, fill:'#FFFFFF', opacity:.55, stroke:'#FFFFFF', 'stroke-width':1}));
  const foamRing = lb2S('g');
  for (let i = 0; i < 16; i++){ const x = cx - lx + 6 + i*(2*lx - 12)/15; foamRing.append(lb2S('circle',{cx:x, cy:LV - 2 + (i%2)*2, r:3 + (i%3), fill:B.url('foam'), stroke:'#D8C9A5', 'stroke-width':.6})); }
  inner.append(liq, sugarG, cellsG, bubG, airG, foamRing);
  /* tubo de aireación (solo con O₂) */
  const airTube = lb2S('g');
  airTube.append(lb2S('path',{d:`M${cx+NW},${NB-24} L${cx+56},${NB-24}`, class:'lb2-edge', 'stroke-width':9, 'stroke-linecap':'round'}),
    lb2S('path',{d:`M${cx+6},${NB-24} L${cx+6},${BY-18}`, class:'lb2-edge', 'stroke-width':5, 'stroke-linecap':'round'}));
  F.append(B.shadow(cx, BY+2, BW*0.9, 6), lb2S('path',{d:body+'Z', fill:'#FFFFFF', opacity:.07}), inner, airTube, over,
    lb2S('path',{d:body+'Z', fill:B.url('glass')}), lb2S('path',{d:body, class:'lb2-edge', 'stroke-width':2.4, 'stroke-linejoin':'round'}),
    lb2S('ellipse',{cx, cy:NT, rx:NW+4, ry:4, class:'lb2-edge', 'stroke-width':2.4}),
    lb2S('path',{d:`M${cx-NW+6},${NB+6} L${cx-BW+16},${BY-22}`, stroke:'#FFFFFF', 'stroke-width':5, 'stroke-linecap':'round', opacity:.35}));
  const lab = lb2S('g'), labT = lb2S('text',{x:cx, y:255, 'text-anchor':'middle', 'font-size':15, 'font-weight':700, fill:'#1F2A36', 'font-family':'var(--font-b)'}, '');
  lab.append(lb2S('rect',{x:cx-58, y:236, width:116, height:28, rx:5, fill:'#FFFFFF', opacity:.93, stroke:'#C9C2AE', 'stroke-width':1}), labT);
  F.append(lab);
  bath.V.over.append(F);
  /* globo */
  const ball = lb2S('g'), bNeck = lb2S('path',{fill:'#C83244'}), bBody = lb2S('ellipse',{fill:B.url('ball'), stroke:'#8A1B29', 'stroke-width':1.2}), bHi = lb2S('ellipse',{fill:'#FFFFFF', opacity:.4});
  ball.append(bNeck, bBody, bHi, lb2S('rect',{x:cx-NW-3, y:NT-4, width:2*NW+6, height:9, rx:3, fill:'#B52A3B'}));
  svg.append(ball);
  const volT = B.text(cx + 74, 36, '', {'font-size':17});
  const volT2 = lb2S('text',{x:cx + 74, y:60, 'font-size':17, class:'lb2-tx2'}, 'en 6 minutos');
  svg.append(volT, volT2);
  /* bomba de aire */
  const pump = lb2S('g');
  pump.append(B.shadow(588, 300, 44, 6), lb2S('rect',{x:548, y:256, width:82, height:44, rx:9, fill:'#3E7CB1', stroke:'#27567E', 'stroke-width':1.5}),
    lb2S('rect',{x:555, y:264, width:34, height:28, rx:4, fill:'#2F6593'}),
    ...[0,1,2,3].map(i => lb2S('line',{x1:559, x2:585, y1:270 + i*6, y2:270 + i*6, stroke:'#1E4A70', 'stroke-width':2})),
    lb2S('text',{x:610, y:283, 'text-anchor':'middle', 'font-size':14, 'font-weight':700, fill:'#FFFFFF', 'font-family':'var(--font-b)'}, 'aire'),
    lb2S('path',{d:`M596,256 C596,170 ${cx+130},${NB-24} ${cx+56},${NB-24}`, fill:'none', stroke:'#C9D6E0', 'stroke-width':6, 'stroke-linecap':'round'}),
    lb2S('path',{d:`M596,256 C596,170 ${cx+130},${NB-24} ${cx+56},${NB-24}`, fill:'none', stroke:'#FFFFFF', 'stroke-width':2, opacity:.6}));
  /* sobre de levadura y frasco del azúcar sobre la mesada */
  const side = lb2S('g');
  B.lin('foil', [[0,'#E9C977'],[.5,'#C79A3E'],[1,'#A87C2A']], 0,0,1,0);
  side.append(B.shadow(455, 300, 24, 4),
    lb2S('path',{d:'M435,300 L438,240 L472,240 L475,300Z', fill:B.url('foil'), stroke:'#8A6420', 'stroke-width':1}),
    lb2S('path',{d:'M438,240 L441,232 L469,232 L472,240Z', fill:'#B8892F'}),
    lb2S('ellipse',{cx:455, cy:267, rx:11, ry:8.5, fill:'#FFF6DC'}),
    lb2S('ellipse',{cx:452, cy:267, rx:4, ry:3.2, fill:'#E8D2A0', stroke:'#9C7C40', 'stroke-width':.8}),
    lb2S('ellipse',{cx:459, cy:269, rx:3.2, ry:2.6, fill:'#E8D2A0', stroke:'#9C7C40', 'stroke-width':.8}));
  const jar = lb2S('g'), jarT = lb2S('text',{x:512, y:278, 'text-anchor':'middle', 'font-size':11.5, 'font-weight':700, fill:'#1F2A36', 'font-family':'var(--font-b)'}, '');
  jar.append(B.shadow(512, 300, 30, 4), lb2S('rect',{x:484, y:246, width:56, height:54, rx:7, fill:'#FFFFFF', opacity:.9}),
    lb2S('path',{d:'M487,297 L487,284 Q512,278 537,284 L537,297Z', fill:'#F3F1EA'}),
    lb2S('rect',{x:484, y:246, width:56, height:54, rx:7, fill:B.url('glass')}), lb2S('rect',{x:484, y:246, width:56, height:54, rx:7, class:'lb2-edge', 'stroke-width':1.6}),
    lb2S('rect',{x:482, y:236, width:60, height:12, rx:3, fill:'#6C7A89'}), lb2S('rect',{x:487, y:264, width:50, height:19, rx:2, fill:'#FFFFFF', stroke:'#C9C2AE', 'stroke-width':.8}), jarT);
  side.append(jar);
  svg.append(side, pump);
  const th = lb2Thermo(B, 382, 124, 272, 5, 60);
  svg.append(th.g);

  const S = { R:10, tgtR:10, rate:0, acc:0, accA:0, air:false, dead:false };
  function drawBall(T){
    const R = S.R, wob = T == null ? 0 : Math.sin(T*1.7)*1.5;
    const cy = NT - 4 - R*0.92;
    const limp = clamp((R - 10)/16, 0, 1);            /* globo casi vacío: goma floja y caída */
    lb2At(bBody, {cx:cx + wob*0.4 + (1-limp)*5, cy:cy + (1-limp)*R*0.35, rx:R*0.9 + 2, ry:(R + 1)*(0.62 + 0.38*limp)});
    lb2At(bHi, {cx:cx - R*0.35, cy:cy - R*0.4, rx:R*0.18 + 1, ry:R*0.28 + 1});
    const nw = Math.min(NW + 2, R*0.55 + 6);
    bNeck.setAttribute('d', `M${cx-NW-1},${NT} C${cx-NW},${NT-8} ${cx-nw},${cy + R*0.7} ${cx},${cy + R*0.8} C${cx+nw},${cy + R*0.7} ${cx+NW},${NT-8} ${cx+NW+1},${NT} Z`);
  }
  return {
    el: svg,
    upd(v, est){
      const vol = Math.max(0, est.y*6);
      S.tgtR = 10 + 45*Math.pow(clamp(vol/210, 0, 1), 0.6);
      S.rate = est.y; S.air = v.oxigeno === 'aireado'; S.dead = v.temp > 50;
      bath.setTemp(v.temp); th.set(v.temp);
      airTube.setAttribute('display', S.air ? 'inline' : 'none'); pump.setAttribute('display', S.air ? 'inline' : 'none');
      const az = LB2_AZ[v.azucar] || LB2_AZ.glucosa;
      jar.setAttribute('display', v.azucar === 'ninguno' ? 'none' : 'inline');
      jarT.textContent = v.azucar === 'almidonh' ? 'Almidón' : az.n;
      labT.textContent = (v.azucar === 'almidonh' ? 'Almidón + amilasa' : az.n) + (v.azucar === 'ninguno' ? '' : ' · ' + lb2N(v.cantidad, 0) + ' g');
      const n = v.azucar === 'ninguno' ? 0 : Math.round(clamp(v.cantidad/10, 0, 1)*grains.length);
      const polvo = v.azucar === 'almidon' || v.azucar === 'almidonh';
      grains.forEach((g, i) => { g.setAttribute('visibility', i < n ? 'visible' : 'hidden'); g.setAttribute('rx', polvo ? 2.2 : .8); });
      const vivo = !S.dead;
      yeast.forEach(y => { y.c.forEach(c => { c.setAttribute('fill', vivo ? '#F7EACB' : '#B9B3A6'); c.setAttribute('stroke', vivo ? '#9C7C40' : '#7E786C'); }); });
      foamRing.setAttribute('opacity', clamp((est.y - 8)/14, 0, 1).toFixed(2));
      volT.textContent = '≈ ' + lb2N(vol, 0) + ' mL de CO₂';
      svg.setAttribute('aria-label', `Matraz con levadura y ${labT.textContent.toLowerCase()} en baño a ${lb2N(v.temp,0)} °C, ${S.air ? 'aireado con una bomba (con oxígeno)' : 'cerrado con un globo (sin oxígeno)'}. ${S.dead ? 'A esta temperatura las levaduras mueren. ' : ''}El globo recoge unos ${lb2N(vol,0)} mL de CO₂ en 6 minutos.`);
    },
    tick(T, dt){
      S.R = lb2Ease(S.R, S.tgtR, dt, 1.5);
      bath.tick(T); drawBall(T);
      if (T == null){
        bubs.forEach(lb2Kill); airB.forEach(lb2Kill);
        const n = Math.round(clamp(S.rate/35, 0, 1)*18), r = lb2Rng(9);
        for (let i = 0; i < n; i++) lb2Spawn(bubs, b => lb2At(b.el, {cx:cx - 60 + r()*120, cy:LV + 8 + r()*58, r:1.4 + r()*2}));
        if (S.air) for (let i = 0; i < 4; i++) lb2Spawn(airB, b => lb2At(b.el, {cx:cx + 6, cy:BY - 26 - i*14, r:3.5}));
        yeast.forEach(y => y.g.setAttribute('transform', `translate(${y.x.toFixed(1)} ${y.y.toFixed(1)}) rotate(${y.rot.toFixed(0)})`));
        return;
      }
      S.acc += dt*S.rate*0.9;
      while (S.acc >= 1){ S.acc -= 1; lb2Spawn(bubs, b => { b.x = cx - 64 + Math.random()*128; b.y = BY - 8 - Math.random()*20; b.r = 1.3 + Math.random()*2; b.v = 30 + Math.random()*26; b.p = Math.random()*6; }); }
      bubs.forEach(b => { if (!b.on) return; b.y -= b.v*dt; b.p += dt*4; if (b.y < LV) { lb2Kill(b); return; } lb2At(b.el, {cx:b.x + Math.sin(b.p)*1.4, cy:b.y, r:b.r}); });
      if (S.air){ S.accA += dt*3.2; while (S.accA >= 1){ S.accA -= 1; lb2Spawn(airB, b => { b.x = cx + 6; b.y = BY - 20; b.r = 3 + Math.random()*2; b.v = 55 + Math.random()*20; b.p = Math.random()*6; }); } }
      airB.forEach(b => { if (!b.on) return; b.y -= b.v*dt; b.p += dt*6; if (b.y < LV) { lb2Kill(b); return; } lb2At(b.el, {cx:b.x + Math.sin(b.p)*3, cy:b.y, r:b.r}); });
      const mv = S.dead ? 0.15 : 1;
      yeast.forEach(y => y.g.setAttribute('transform', `translate(${(y.x + Math.sin(T*0.5*mv + y.k)*4).toFixed(1)} ${(y.y + Math.cos(T*0.4*mv + y.k)*3).toFixed(1)}) rotate(${(y.rot + T*8*mv).toFixed(0)})`));
    }
  };
}

/* ---------------------------------------------------------------------
   MOTOR GENÉRICO DE LABORATORIO
   --------------------------------------------------------------------- */
function lb2Lab(view, C){
  view.classList.add('wide');
  const hecho = () => { try { return !!Store.s.activities[C.actId]?.done; } catch(e){ return false; } };
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'},
    h('div',{}, h('span',{class:'eyebrow lab'}, C.eyebrow), h('h1',{}, C.title), h('p',{}, C.sub)),
    h('span',{class:'pill lab'}, '+'+(C.xp||130)+' XP')));
  view.append(purposeBanner({ proposito:C.proposito, observa:C.observa, reto:C.reto, done:hecho() }));

  const STEPS = ['Pregunta','Hipótesis','Materiales','Procedimiento','Variables','Experimentación','Resultados','Representación','Análisis','Conclusión'];
  const KEYS = Object.keys(C.VARS);
  const L = { step:0, done:new Set(), hip:'', indep:'', vars:Object.assign({}, C.defaults), runs:[], attempts:0, concl:'', extraOK:!C.analysisExtra, ctrlOK:false };
  const minLevels = (k) => { const d = C.VARS[k]; const disp = d.opts ? d.opts.length : 99; return Math.min(C.minLevels || 5, disp); };

  const stepsEl = h('ul',{class:'steps'}), body = h('div',{class:'card stack lb2-body'});
  view.append(h('div',{class:'lab-layout'},
    h('div',{class:'card',style:'align-self:start'}, h('span',{class:'eyebrow lab'},'Secuencia del experimento'), stepsEl,
      C.links && C.links.length ? h('div',{class:'stack',style:'margin-top:10px;padding-top:10px;border-top:1px solid var(--line)'},
        h('span',{class:'eyebrow'},'Antes o después'),
        h('div',{class:'lb2-links'}, C.links.map(([t,href]) => h('a',{class:'btn sm',href}, t)))) : null),
    body));

  function renderSteps(){
    stepsEl.innerHTML = '';
    const maxOpen = Math.max(-1, ...Array.from(L.done)) + 1;
    STEPS.forEach((s,i) => stepsEl.append(h('li',{}, h('button',{
      class: L.done.has(i) ? 'done' : '',
      'aria-current': L.step===i ? 'step' : null,
      onclick: () => { if (i <= maxOpen) { L.step = i; render(); } else toast('Completa primero el paso anterior.'); }
    }, h('span',{class:'n'}, L.done.has(i) ? '✓' : String(i+1)), s))));
  }
  const next = () => h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{
    L.done.add(L.step); L.step = Math.min(L.step+1, STEPS.length-1); render();
    try { Store.log('laboratorio',{lab:C.slug, paso:STEPS[L.step]}); } catch(e){}
  }},'Continuar →');

  /* ---- agrupación de réplicas por valor de la variable independiente ---- */
  function levels(){
    const map = new Map();
    L.runs.forEach(r => {
      const key = String(r.v[L.indep]);
      if (!map.has(key)) map.set(key, { key, val:r.v[L.indep], x:lb2X(C.VARS[L.indep], r.v[L.indep]), ys:[], curves:[] });
      const g = map.get(key); g.ys.push(r.y); if (r.curve) g.curves.push(r.curve);
    });
    const arr = Array.from(map.values());
    arr.forEach(g => { g.n = g.ys.length; g.mean = lb2Mean(g.ys); g.sd = lb2Sd(g.ys);
      if (g.curves.length){ g.curve = g.curves[0].map((p,i)=>({ x:p.x, y:lb2Mean(g.curves.map(c=>c[i].y)) })); } });
    arr.sort((a,b)=>a.x-b.x);
    return arr;
  }
  function replicados(){ return levels().filter(g=>g.n >= (C.minReps||2)).length; }

  /* ---- visualización en vivo de la condición actual ---- */
  function vizNode(){
    let esc = null;
    if (C.escena){ try { esc = C.escena(); } catch(e){ console.warn('lb2: escena', e); esc = null; } }
    const box = h('div',{class:'lb2-viz'+(esc?' lb2-viz-esc':'')});
    const em = esc ? null : h('div',{class:'em','aria-hidden':'true'}, C.em);
    const barIn = h('i'), bar = h('div',{class:'lb2-bar'+(C.diverging?' div':'')}, barIn);
    const big = h('div',{class:'big'}), cap = h('div',{class:'cap'});
    if (esc) box.append(h('div',{class:'lb2-esc'}, esc.el), h('div',{class:'lb2-lect'}, big, bar, cap));
    else box.append(em, h('div',{}, big, bar, cap));
    if (esc) lb2Run(esc, box);
    const upd = () => {
      const est = C.model(L.vars, true);
      const max = C.vizMax || 1;
      if (C.diverging){
        const f = clamp(est.y/max, -1, 1);
        barIn.className = f < 0 ? 'neg' : '';
        barIn.style.width = Math.abs(f)*50 + '%';
        barIn.style.left = f < 0 ? (50 - Math.abs(f)*50) + '%' : '50%';
      } else {
        barIn.style.width = clamp(est.y/max, 0, 1)*100 + '%';
      }
      big.innerHTML = '';
      big.append(document.createTextNode(lb2N(est.y, C.dec||0)), h('span',{class:'u'}, C.depUnit));
      cap.textContent = C.vizCap ? C.vizCap(L.vars, est) : '';
      if (em) em.style.transform = 'scale('+(0.85 + 0.3*clamp(Math.abs(est.y)/max,0,1)).toFixed(2)+')';
      if (esc){ try { esc.upd(L.vars, est); esc._static = false; if (!lb2Anim()){ esc.tick(null); esc._static = true; } } catch(e){ console.warn('lb2: escena', e); } }
    };
    upd();
    return { el:box, upd };
  }

  /* ---- panel de controles de las variables ---- */
  function ctrlNode(onChange){
    const g = h('div',{class:'lb2-ctrls'});
    KEYS.forEach(k => {
      const d = C.VARS[k], id = 'lb2-'+C.slug+'-'+k;
      const tag = h('span',{class:'lb2-tag'+(k===L.indep?' indep':'')}, k===L.indep ? 'independiente' : 'controlada');
      if (d.opts){
        const sel = h('select',{id, 'aria-label':d.n});
        d.opts.forEach(o => sel.append(h('option',{value:o.v}, o.n)));
        sel.value = L.vars[k];
        sel.addEventListener('change', () => { L.vars[k] = sel.value; onChange(); });
        g.append(h('div',{class:'field'}, h('label',{for:id}, d.n, tag), sel));
      } else {
        const inp = h('input',{type:'range', min:d.min, max:d.max, step:d.step, value:L.vars[k], id, 'aria-label':d.n});
        const out = h('output',{}, lb2Lbl(d, L.vars[k]));
        inp.addEventListener('input', () => { L.vars[k] = +inp.value; out.value = lb2Lbl(d, L.vars[k]); onChange(); });
        g.append(h('div',{class:'slider'}, h('label',{for:id}, d.n, tag), out, inp));
      }
    });
    return g;
  }

  /* ---- tabla de mediciones ---- */
  function runsTable(){
    if (!L.runs.length) return h('p',{class:'small muted'},'Todavía no hay mediciones.');
    const rep = {};
    return h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'#'), h('th',{},'Réplica'), ...KEYS.map(k=>h('th',{}, C.VARS[k].n)), h('th',{}, C.depName))),
      h('tbody',{}, L.runs.map((r,i) => {
        const key = String(r.v[L.indep]); rep[key] = (rep[key]||0)+1;
        return h('tr',{},
          h('td',{class:'num'}, String(i+1)),
          h('td',{class:'num lb2-rep'}, 'R'+rep[key]),
          ...KEYS.map(k => h('td',{class:'num'}, lb2Lbl(C.VARS[k], r.v[k]))),
          h('td',{class:'num'}, h('b',{}, lb2N(r.y, C.dec||0))));
      }))));
  }
  function meansTable(){
    const gs = levels();
    return h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{}, C.VARS[L.indep].n+' (independiente)'), h('th',{},'Réplicas'),
        h('th',{}, 'Promedio de '+C.depName.toLowerCase()), h('th',{},'Desviación típica'))),
      h('tbody',{}, gs.map(g => h('tr',{},
        h('td',{class:'num'}, lb2Lbl(C.VARS[L.indep], g.val)),
        h('td',{class:'num'}, String(g.n)),
        h('td',{class:'num'}, h('b',{}, lb2N(g.mean, (C.dec||0)+1))),
        h('td',{class:'num'}, g.n>1 ? '± '+lb2N(g.sd, (C.dec||0)+1) : '—'))))));
  }

  /* ---- gráficos ---- */
  /* estado de la predicción: uno por serie de mediciones (variable independiente + número de mediciones) */
  function predEstado(){
    const k = L.indep + '|' + L.runs.length;
    if (!L.pred || L.pred.k !== k) L.pred = { k };
    return L.pred;
  }
  function tendencia(){
    const d = C.VARS[L.indep];
    if (d.opts || !(C.lineal || []).includes(L.indep)) return null;
    return lb2Fit(levels().map(g => ({ x:g.x, y:g.mean })));
  }
  function drawScalar(canvas, pred){
    const gs = levels(), d = C.VARS[L.indep];
    const pts = gs.map(g => ({ x:g.x, y:g.mean, sd: g.n > 1 ? g.sd : 0 }));
    const ys = pts.map(p=>p.y);
    let ymin, ymax;
    if (Math.min(...ys) < 0){                      /* escala simétrica alrededor del cero */
      const M = Math.max(...ys.map(Math.abs))*1.25;
      const paso = Math.pow(10, Math.floor(Math.log10(Math.max(M,1))));
      ymax = Math.ceil(M/(paso/2))*(paso/2); ymin = -ymax;
    }
    const lin = !!tendencia();
    lineChart(canvas, {
      series:[{ label:C.depName, color:lb2Color(0), pts, dots:true, tendencia: lin ? 'lineal' : undefined }],
      anotaciones: C.anotaciones ? C.anotaciones(gs, L) : undefined,
      titulo: C.depName + ' según ' + lb2Min(C.VARS[L.indep].n),
      tipfmt: v => lb2N(v, (C.dec||0)+1),
      prediccion: pred || undefined,
      /* categorías: medio paso de margen y marcas justo debajo de cada punto */
      xmin: d.opts ? -0.5 : d.min, xmax: d.opts ? d.opts.length-0.5 : d.max,
      ymin, ymax,
      xlabel: d.n + (d.u ? ' ('+d.u+')' : ''), ylabel: C.depUnit,
      xticks: d.opts ? d.opts.length*2 : 5,
      xfmt: v => d.opts ? (Math.abs(v - Math.round(v)) > 0.01 ? '' : d.opts[Math.round(v)] ? d.opts[Math.round(v)].nCorto || d.opts[Math.round(v)].n : '') : lb2N(v, d.dec||0),
      yfmt: v => lb2N(v, C.dec||0)
    });
  }
  function drawCurves(canvas){
    const gs = levels(), d = C.VARS[L.indep];
    lineChart(canvas, {
      series: gs.slice(0,6).map((g,i) => {
        const o = d.opts && d.opts.find(o=>o.v===g.val);
        return { label:(o ? (o.nCorto||o.n) : lb2Lbl(d, g.val)), color:lb2Color(i), pts:g.curve, dots:true };
      }),
      xmin: C.curveXmin, xmax: C.curveXmax, ymin: C.curveYmin ?? 0,
      xlabel: C.curveXlabel, ylabel: C.curveYlabel, xticks: C.curveXticks || 6,
      yfmt: v => lb2N(v, 0)
    });
  }

  /* ---- pasos ---- */
  function render(){
    renderSteps(); body.innerHTML = '';
    const i = L.step;
    body.append(h('span',{class:'eyebrow lab'}, `Paso ${i+1} · ${STEPS[i]}`));

    if (i === 0){
      body.append(h('h3',{},'¿Qué queremos descubrir?'), h('p',{}, C.pregunta.texto),
        lb2Note('info','Pregunta de investigación:', C.pregunta.pregunta), next());
    }

    else if (i === 1){
      const ta = h('textarea',{placeholder:C.hipPlaceholder, 'aria-label':'Hipótesis', style:'min-height:96px'});
      ta.value = L.hip;
      body.append(h('h3',{},'Escribe tu hipótesis'),
        h('p',{class:'small muted'},'Escríbela ANTES de ver ningún dato. Una hipótesis es una predicción comprobable con la forma «si… entonces… porque…». Después comprobarás si tus propios datos la sostienen.'),
        ta, C.hipHint ? h('p',{class:'lb2-hint'}, C.hipHint) : null,
        h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{
          const t = ta.value.trim();
          if (t.length < 30) return toast('Formula la hipótesis completa: si… entonces… porque…');
          if (!/porque/i.test(t)) return toast('Falta la justificación: añade «porque…» y explica el mecanismo.');
          L.hip = t; try { Store.addNote('hipotesis', C.nota+': '+L.hip); } catch(e){}
          L.done.add(1); L.step = 2; render();
        }},'Guardar hipótesis →'));
    }

    else if (i === 2){
      const m = h('div',{class:'materials'});
      C.materiales.forEach(([em,t]) => m.append(h('div',{}, h('span',{}, em), t)));
      body.append(h('h3',{},'Materiales'), m, h('p',{class:'small muted'}, C.materialesNota), next());
    }

    else if (i === 3){
      body.append(h('h3',{},'Procedimiento'),
        h('ol',{style:'padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:.92rem'}, C.procedimiento.map(t=>h('li',{}, t))),
        C.seguridad ? lb2Note('warn','Seguridad:', C.seguridad) : null, next());
    }

    else if (i === 4){
      const sel = h('select',{'aria-label':'Variable independiente'});
      sel.append(h('option',{value:''},'Elige la variable que vas a manipular…'));
      C.indepAllowed.forEach(k => sel.append(h('option',{value:k}, C.VARS[k].n)));
      sel.value = L.indep;
      const ctrlBox = h('div',{class:'lb2-checks'});
      const fb = h('div',{class:'notice',style:'display:none'});
      const cont = h('button',{class:'btn primary',style:'align-self:flex-start'},'Continuar a la experimentación →');

      function pintaChecks(){
        ctrlBox.innerHTML = '';
        if (!sel.value){ ctrlBox.append(h('p',{class:'small muted'},'Elige primero la variable independiente.')); return; }
        KEYS.forEach(k => {
          const lab = h('label',{});
          const cb = h('input',{type:'checkbox','aria-label':'Mantener constante: '+C.VARS[k].n});
          cb.dataset.k = k;
          cb.addEventListener('change', ()=> lab.classList.toggle('on', cb.checked));
          lab.append(cb, h('span',{}, h('b',{}, C.VARS[k].n), C.VARS[k].porque ? h('span',{class:'small muted'}, ' — '+C.VARS[k].porque) : null));
          ctrlBox.append(lab);
        });
      }
      sel.addEventListener('change', ()=>{ L.ctrlOK = false; cont.style.display='none'; fb.style.display='none'; pintaChecks(); });
      pintaChecks();

      cont.style.display = 'none';
      cont.addEventListener('click', ()=>{ L.done.add(4); L.step = 5; render(); });

      const check = h('button',{class:'btn',style:'align-self:flex-start',onclick:()=>{
        if (!sel.value) return toast('Elige la variable independiente.');
        const marcadas = $$('input[type=checkbox]', ctrlBox).filter(c=>c.checked).map(c=>c.dataset.k);
        const faltan = KEYS.filter(k => k !== sel.value && !marcadas.includes(k));
        const sobra = marcadas.includes(sel.value);
        if (sobra){
          fb.className = 'notice bad';
          fb.innerHTML = '<span><b>Ojo: marcaste como constante la variable que vas a manipular.</b> Si «'+esc(C.VARS[sel.value].n)+'» no cambia, no hay experimento. Desmárcala y deja marcadas solo las demás.</span>';
          fb.style.display = 'flex'; return;
        }
        if (faltan.length){
          fb.className = 'notice warn';
          fb.innerHTML = '<span><b>Diseño todavía no válido.</b> Dejaste sin controlar: '+esc(faltan.map(k=>C.VARS[k].n).join(', '))+
            '. Si esas variables también cambian entre mediciones, cualquier diferencia que observes podría deberse a ellas y no a «'+esc(C.VARS[sel.value].n)+'». Márcalas todas.</span>';
          fb.style.display = 'flex'; return;
        }
        L.indep = sel.value; L.ctrlOK = true;
        fb.className = 'notice ok';
        fb.innerHTML = '<span><b>Diseño válido.</b> Manipulas <b>'+esc(C.VARS[L.indep].n)+'</b>, mides <b>'+esc(C.depName.toLowerCase())+
          '</b> y mantienes constantes '+esc(KEYS.filter(k=>k!==L.indep).map(k=>C.VARS[k].n).join(', '))+'. Así cualquier cambio podrá atribuirse a una sola causa.</span>';
        fb.style.display = 'flex'; cont.style.display = '';
        try { Store.log('laboratorio',{lab:C.slug, independiente:L.indep}); } catch(e){}
      }},'Comprobar mi diseño');

      body.append(h('h3',{},'Identifica las variables'),
        h('div',{class:'field'}, h('label',{},'Variable independiente (la que tú cambias)'), sel),
        h('div',{class:'kv'}, h('dt',{},'Variable dependiente'), h('dd',{}, C.depName+' ('+C.depUnit+')'),
          h('dt',{},'Cómo se mide'), h('dd',{}, C.depComo)),
        h('p',{class:'small',style:'font-weight:600;margin-top:6px'},'Marca todas las variables que vas a mantener constantes:'),
        ctrlBox, check, fb, cont);
    }

    else if (i === 5){
      const viz = vizNode();
      const fb = h('div',{class:'notice',style:'display:none'});
      const tbl = h('div',{});
      const estado = h('p',{class:'lb2-mini'});
      const cont = h('button',{class:'btn primary',style:'display:none'},'Ver resultados →');
      const need = minLevels(L.indep), needRep = C.minRepLevels || 1;

      function pintaEstado(){
        const gs = levels(), rep = replicados();
        estado.textContent = `Mediciones: ${L.runs.length} · valores distintos de ${C.VARS[L.indep].n.toLowerCase()}: ${gs.length}/${need} · valores con al menos ${C.minReps||2} réplicas: ${rep}/${needRep}`;
        const ok = gs.length >= need && rep >= needRep;
        cont.style.display = ok ? '' : 'none';
      }
      function pintaTabla(){ tbl.innerHTML=''; tbl.append(runsTable()); }

      const ctrls = ctrlNode(()=>viz.upd());
      const medir = h('button',{class:'btn primary',onclick:()=>{
        const prev = L.runs[L.runs.length-1];
        if (prev){
          const changed = KEYS.filter(k => prev.v[k] !== L.vars[k]);
          const bad = changed.filter(k => k !== L.indep);
          if (bad.length){
            fb.className = 'notice bad';
            fb.innerHTML = '<span><b>Cambiaste '+(bad.length>1?'varias variables controladas':'una variable controlada')+' ('+esc(bad.map(k=>C.VARS[k].n).join(', '))+
              ').</b> Si cambias dos variables a la vez no podrás saber cuál causó el cambio: el experimento deja de ser válido. Devuelve '+
              esc(bad.map(k=>C.VARS[k].n+' a '+lb2Lbl(C.VARS[k], prev.v[k])).join(', '))+' o reinicia la serie.</span>';
            fb.style.display = 'flex';
            try { Store.log('laboratorio',{lab:C.slug, error:'variable_no_controlada'}); } catch(e){}
            return;
          }
          if (!changed.length){
            fb.className = 'notice ok';
            fb.textContent = 'Réplica registrada: mismas condiciones, valor ligeramente distinto. Eso es el error experimental; por eso se promedia.';
            fb.style.display = 'flex';
          } else { fb.style.display = 'none'; }
        } else { fb.style.display = 'none'; }
        const r = C.model(L.vars, false);
        L.runs.push({ v:Object.assign({}, L.vars), y:r.y, curve:r.curve||null, extra:r.extra||null });
        pintaTabla(); pintaEstado();
        try { Store.log('laboratorio',{lab:C.slug, medicion:L.runs.length, valor:r.y, independiente:L.indep, x:L.vars[L.indep]}); } catch(e){}
      }}, C.medirLabel || '⏱ Tomar la medición');

      const restaurar = h('select',{'aria-label':'Volver a condiciones de una medición anterior'});
      function pintaRestaurar(){
        restaurar.innerHTML = '';
        restaurar.append(h('option',{value:''},'Volver a las condiciones de… (para replicar)'));
        levels().forEach(g => restaurar.append(h('option',{value:g.key}, lb2Lbl(C.VARS[L.indep], g.val)+' ('+g.n+' réplica'+(g.n>1?'s':'')+')')));
      }
      restaurar.addEventListener('change', ()=>{
        if (!restaurar.value) return;
        const r = L.runs.slice().reverse().find(r => String(r.v[L.indep]) === restaurar.value);
        if (r){ L.vars = Object.assign({}, r.v); render(); }
      });

      const reset = h('button',{class:'btn',onclick:()=>{ L.runs = []; pintaTabla(); pintaEstado(); pintaRestaurar(); fb.style.display='none'; }},'Reiniciar serie');
      cont.addEventListener('click', ()=>{ L.done.add(5); L.step = 6; render(); });

      body.append(h('h3',{},'Experimentación'),
        h('p',{class:'small muted'}, `Variable independiente: ${C.VARS[L.indep].n}. Cambia solo esa variable entre mediciones y repite cada condición al menos ${C.minReps||2} veces: el instrumento y el material vivo nunca dan dos veces el mismo número.`),
        ctrls, viz.el, h('div',{class:'row'}, medir, reset, cont), h('div',{class:'field'}, restaurar), fb, estado, tbl);
      pintaTabla(); pintaEstado(); pintaRestaurar();
    }

    else if (i === 6){
      body.append(h('h3',{},'Resultados'),
        h('p',{class:'small muted'},'Datos generados por el modelo con el ruido propio de una medición real. Primero las mediciones individuales; después el promedio de las réplicas, que es el valor con el que se trabaja.'),
        h('p',{style:'font-weight:600;margin-top:4px'},'Mediciones'), runsTable(),
        h('p',{style:'font-weight:600;margin-top:10px'},'Promedios por condición'), meansTable(),
        C.resultadosNota ? lb2Note('info', null, C.resultadosNota) : null, next());
    }

    else if (i === 7){
      const wrapA = h('div',{style:'position:relative'}), cA = h('canvas',{class:'chart'});
      wrapA.append(cA);
      const est = predEstado();
      body.append(h('h3',{},'Representación gráfica'), h('p',{class:'small muted'}, C.graficoNota ||
        'Pasa el cursor o el dedo por el gráfico (o usa las flechas del teclado) para leer los valores. La tabla del paso anterior contiene los mismos datos en texto.'));
      const fit = tendencia();
      const notas = h('div',{class:'stack',style:'gap:8px'},
        lb2Note('info','Cómo leer las barras de error:','cada punto es el promedio de tus réplicas y la barra vertical va desde el promedio menos la desviación típica hasta el promedio más la desviación típica. Si las barras de dos condiciones se solapan mucho, la diferencia entre ellas podría deberse solo al error de medición.'),
        fit ? lb2Note('ok', null, grafTendenciaTexto(grafRegresion(levels().map(g => ({ x:g.x, y:g.mean })), 'lineal')) + (C.tendenciaNota ? ' ' + C.tendenciaNota : '')) : null);
      let secB = null, cB = null;
      if (C.curve){
        const wrapB = h('div',{style:'position:relative'}); cB = h('canvas',{class:'chart'});
        wrapB.append(cB);
        const nc = levels().length;
        secB = h('div',{class:'stack',style:'gap:10px'}, h('p',{style:'font-weight:600'}, C.curveTitle), wrapB,
          nc > 6 ? h('p',{class:'small muted'},`Se dibujan las seis primeras condiciones para que las curvas sigan siendo legibles; la tabla de resultados contiene las ${nc}.`) : null);
      }
      const secA = h('div',{class:'stack',style:'gap:10px'}, C.curve ? h('p',{style:'font-weight:600;margin-top:8px'}, C.scalarTitle) : null, wrapA, notas);
      /* primero la predicción (sobre el gráfico de promedios); las curvas y las notas aparecen al confirmar u omitir */
      const pendiente = !est.fase || est.fase === 'dibujar';
      if (secB){ body.append(secB, secA); } else body.append(secA);
      const mostrar = () => { if (secB){ secB.style.display = ''; setTimeout(()=>{ try { drawCurves(cB); } catch(e){ console.warn(e); } }, 30); } notas.style.display = ''; };
      if (pendiente){ if (secB) secB.style.display = 'none'; notas.style.display = 'none'; }
      const pred = { estado:est, id:C.slug, nota:C.nota, unidadX:C.VARS[L.indep].u || '', unidadY:C.depUnit,
        que: lb2Min(C.depName) + ' según ' + lb2Min(C.VARS[L.indep].n),
        pregunta:`¿Cómo crees que cambiará «${lb2Min(C.depName)}» al cambiar «${lb2Min(C.VARS[L.indep].n)}»?`,
        onFin: () => mostrar() };
      setTimeout(()=>{ try { drawScalar(cA, pred); if (!pendiente) mostrar(); } catch(e){ console.warn(e); } }, 30);
      body.append(next());
    }

    else if (i === 8){
      const gs = levels();
      const quizzes = C.analisis(gs, L, C);
      const extraDone = () => { L.extraOK = true; check(); };
      let n = 0;
      const cont = h('button',{class:'btn primary',style:'display:none;align-self:flex-start',onclick:()=>{ L.done.add(8); L.step = 9; render(); }},'Ir a la conclusión →');
      function check(){ if (n >= quizzes.length && L.extraOK) cont.style.display = ''; }
      body.append(h('h3',{},'Análisis guiado'));
      if (C.analisisIntro) body.append(C.analisisIntro(gs, L, C));
      if (C.analysisExtra) body.append(L.extraOK
        ? lb2Note('ok','Prueba complementaria ya realizada.','Ya ejecutaste la prueba de este laboratorio. Continúa con las preguntas de análisis.')
        : C.analysisExtra(gs, L, extraDone, C));
      quizzes.forEach(q => body.append(quizBlock(q, (att)=>{ n++; L.attempts += (att||1); check(); })));
      body.append(cont); check();
    }

    else if (i === 9){
      const gs = levels();
      const ta = h('textarea',{placeholder:'Mi hipótesis fue… Los datos muestran que… (cita al menos un número de tu tabla). Por lo tanto, la hipótesis se… porque…','aria-label':'Conclusión', style:'min-height:130px'});
      ta.value = L.concl;
      let ver = null;
      const vs = h('div',{class:'row'}, ['Confirmada','Refutada','Parcialmente confirmada'].map(t => h('button',{class:'chip',onclick:function(){
        ver = t; $$('button', vs).forEach(b=>b.classList.remove('picked')); this.classList.add('picked');
      }}, t)));
      const resumen = gs.map(g => `${lb2Lbl(C.VARS[L.indep], g.val)} → ${lb2N(g.mean,(C.dec||0)+1)} ${C.depUnit} (n=${g.n})`).join(' | ');
      body.append(h('h3',{},'Conclusión'),
        lb2Note(null, 'Tu hipótesis:', L.hip),
        lb2Note('info', 'Tus datos:', resumen),
        h('p',{class:'small',style:'font-weight:600'},'Tu hipótesis quedó…'), vs, ta,
        h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{
          if (!ver) return toast('Indica si tu hipótesis quedó confirmada, refutada o parcialmente confirmada.');
          const t = ta.value.trim();
          if (t.length < 60) return toast('Redacta una conclusión más completa (mínimo 60 caracteres).');
          if (!/\d/.test(t)) return toast('Una conclusión científica cita datos: incluye al menos un número de tu tabla.');
          L.concl = t;
          const evalu = C.evalua ? C.evalua(gs, L, ver, C) : null;
          try {
            Store.addNote('resultado', `${C.nota} · independiente: ${C.VARS[L.indep].n}. Datos: ${resumen}`);
            Store.addNote('conclusion', `${C.nota} (${ver.toLowerCase()}): ${L.concl}`);
          } catch(e){}
          try { Store.completeActivity(C.actId, { score:ver, attempts:Math.max(1, L.attempts), mediciones:L.runs.length }); } catch(e){ console.warn(e); }
          try { Store.grantBadge('investigador'); } catch(e){}
          L.done.add(9); renderSteps();
          if (evalu) body.append(evalu);
          body.append(lb2Note('ok','Laboratorio completado.','Tus datos y tu conclusión quedaron guardados en el cuaderno de campo. Puedes repetir el experimento con otra variable independiente para comparar.'),
            h('div',{class:'row'}, h('a',{class:'btn',href:'#/cuaderno'},'Ver cuaderno'),
              h('button',{class:'btn',onclick:()=>{ L.runs=[]; L.extraOK=!C.analysisExtra; L.done=new Set([0,1,2,3]); L.step=4; render(); }},'Repetir con otra variable'),
              ...(C.links||[]).map(([t,href])=>h('a',{class:'btn',href}, t))));
        }},'Guardar conclusión'));
    }
  }
  render();
  return { unmount(){} };
}

/* =====================================================================
   LABORATORIO 1 · FRECUENCIA CARDÍACA Y EJERCICIO
   ===================================================================== */
const LB2_COND = { sed:{n:'Sedentaria', rest:78, tau:3.4}, act:{n:'Activa (3 días/semana)', rest:68, tau:2.1}, dep:{n:'Deportista', rest:55, tau:1.2} };
const LB2_INT  = { reposo:{n:'Reposo', f:0}, caminar:{n:'Caminar', f:0.30}, trotar:{n:'Trotar', f:0.62}, correr:{n:'Correr', f:0.88} };
const LB2_ALT  = { mar:{n:'Nivel del mar (0 m)', k:1.00, rest:0, tau:1.00}, quito:{n:'Quito (2.850 m)', k:1.14, rest:5, tau:1.25} };

function lb2FC(v, quiet){
  const c = LB2_COND[v.condicion], it = LB2_INT[v.intensidad], al = LB2_ALT[v.altitud];
  const fcMax = 208 - 0.7*v.edad;
  const rest = c.rest + al.rest;
  const f = Math.min(0.97, it.f * al.k);
  const pico = rest + (fcMax - rest)*f;
  const tau = c.tau * al.tau;
  const curve = [];
  for (let t = 0; t <= 6; t++){
    let y = rest + (pico - rest)*Math.exp(-t/tau);
    if (!quiet) y += lb2Gauss(1.8);
    curve.push({ x:t, y:Math.round(y) });
  }
  return { y: curve[0].y - curve[1].y, curve, extra:{ pico:curve[0].y, rest:Math.round(rest), fcMax:Math.round(fcMax) } };
}

route('/laboratorio/frecuencia-cardiaca', (view) => lb2Lab(view, {
  slug:'frecuencia-cardiaca', actId:'lab-frecuencia-cardiaca', nota:'Lab frecuencia cardíaca', xp:130, em:'🫀', escena: lb2EscFC,
  eyebrow:'Laboratorio transversal · Cuerpo humano y salud',
  title:'Frecuencia cardíaca: ¿cuánto tarda tu corazón en recuperarse?',
  sub:'Después de un esfuerzo, el corazón no vuelve de golpe a su ritmo de reposo: baja siguiendo una curva. La forma de esa curva dice más sobre la condición física que el número máximo de pulsaciones.',
  proposito:'Comprobar experimentalmente que la velocidad de recuperación de la frecuencia cardíaca, y no la frecuencia máxima, es el mejor indicador de condición física.',
  observa:['Cuántas pulsaciones baja el corazón en el primer minuto de descanso','Si el pico de frecuencia distingue o no a una persona entrenada de una sedentaria','Qué cambia al repetir el mismo esfuerzo en Quito, a 2.850 m'],
  reto:'Encuentra un indicador que separe con claridad a las tres personas y demuestra con tus datos que la frecuencia máxima NO sirve para eso.',
  pregunta:{ texto:'Al terminar un esfuerzo, el corazón deja de recibir la señal de «más trabajo» y va bajando hasta su ritmo de reposo. Entre dos personas que corren lo mismo, ¿se distinguen por las pulsaciones que alcanzan o por la rapidez con que las bajan?',
    pregunta:'¿Cómo afecta la condición física (o la altitud, o la intensidad del ejercicio) a la recuperación de la frecuencia cardíaca durante el primer minuto de descanso?' },
  hipPlaceholder:'Si una persona está mejor entrenada, entonces su frecuencia cardíaca al minuto de descanso ___, porque ___',
  hipHint:'Piensa en qué hace el sistema nervioso parasimpático al terminar el esfuerzo y en cuánta sangre mueve el corazón en cada latido de una persona entrenada.',
  materiales:[['⏱️','Cronómetro'],['🫀','Pulsómetro o dos dedos en la muñeca'],['🏃','Espacio para caminar, trotar y correr'],['📓','Tabla de registro'],['💧','Agua'],['🪑','Silla para el reposo']],
  materialesNota:'En el laboratorio real se cuentan las pulsaciones durante 15 segundos y se multiplica por 4. Aquí la medición es inmediata, pero conserva el error propio del método (±2 lpm).',
  procedimiento:['Toma la frecuencia cardíaca en reposo, sentada o sentado, después de 3 minutos de calma.','Realiza la actividad elegida durante 3 minutos a ritmo constante.','Al terminar, mide inmediatamente las pulsaciones: ese es el pico (minuto 0).','Siéntate y vuelve a medir al minuto 1, 2, 3, 4, 5 y 6 de descanso.','Registra la serie completa y repite la prueba al menos dos veces por condición.','Cambia una sola variable (persona, intensidad o altitud) y repite todo el protocolo.'],
  seguridad:'Nadie debe llegar al agotamiento. Si aparece mareo, dolor en el pecho o falta de aire, se detiene la prueba. Quien tenga indicación médica de no hacer esfuerzos solo registra datos.',
  VARS:{
    intensidad:{ n:'Intensidad del ejercicio', opts:[{v:'reposo',n:'Reposo',nCorto:'Reposo'},{v:'caminar',n:'Caminar',nCorto:'Caminar'},{v:'trotar',n:'Trotar',nCorto:'Trotar'},{v:'correr',n:'Correr',nCorto:'Correr'}], porque:'a más intensidad, más oxígeno piden los músculos y más sube el corazón' },
    condicion:{ n:'Condición física de la persona', opts:[{v:'sed',n:'Sedentaria',nCorto:'Sedent.'},{v:'act',n:'Activa (3 días/semana)',nCorto:'Activa'},{v:'dep',n:'Deportista',nCorto:'Deport.'}], porque:'el entrenamiento cambia el volumen de sangre por latido y el tono parasimpático' },
    altitud:{ n:'Altitud', opts:[{v:'mar',n:'Nivel del mar (0 m)',nCorto:'0 m'},{v:'quito',n:'Quito (2.850 m)',nCorto:'2.850 m'}], porque:'a mayor altitud hay menos oxígeno en cada litro de aire' },
    edad:{ n:'Edad', u:'años', min:12, max:60, step:1, dec:0, porque:'la frecuencia cardíaca máxima baja con la edad (208 − 0,7 × edad)' }
  },
  defaults:{ intensidad:'trotar', condicion:'act', altitud:'mar', edad:16 },
  indepAllowed:['condicion','intensidad','altitud'],
  depName:'Recuperación en el primer minuto', depUnit:'lpm', dec:0,
  depComo:'pulsaciones del pico menos pulsaciones al minuto 1 de descanso: cuántos latidos por minuto bajó el corazón en 60 segundos.',
  model: lb2FC, minLevels:3, minReps:2, minRepLevels:2,
  vizMax:80, vizCap:(v,est)=>`Pico ≈ ${est.extra.pico} lpm · reposo ≈ ${est.extra.rest} lpm · FC máxima teórica ${est.extra.fcMax} lpm`,
  medirLabel:'🫀 Registrar la serie completa',
  curve:true, curveXmin:0, curveXmax:6, curveYmin:40, curveXticks:6,
  curveXlabel:'minutos de descanso', curveYlabel:'lpm',
  curveTitle:'Curvas de recuperación: frecuencia cardíaca en los 6 minutos posteriores al esfuerzo',
  scalarTitle:'Indicador: cuánto baja el corazón en el primer minuto',
  resultadosNota:'Compara dos columnas a la vez: el valor del minuto 0 (el pico) y la caída del primer minuto. Una de las dos separa a las personas; la otra no.',
  links:[['Simulador cardiorrespiratorio','#/simuladores/circulacion'],['Explorar el corazón en 3D','#/explorar/corazon']],
  analisisIntro:(gs, L, C) => {
    const filas = gs.map(g => {
      const picos = L.runs.filter(r => String(r.v[L.indep])===g.key).map(r=>r.extra.pico);
      return { n:lb2Lbl(C.VARS[L.indep], g.val), pico:lb2Mean(picos), rec:g.mean };
    });
    const dP = Math.max(...filas.map(f=>f.pico)) - Math.min(...filas.map(f=>f.pico));
    const dR = Math.max(...filas.map(f=>f.rec)) - Math.min(...filas.map(f=>f.rec));
    return h('div',{class:'stack'},
      h('div',{class:'tablewrap'}, h('table',{class:'data'},
        h('thead',{}, h('tr',{}, h('th',{},'Condición'), h('th',{},'Pico promedio (lpm)'), h('th',{},'Recuperación al minuto 1 (lpm)'))),
        h('tbody',{}, filas.map(f => h('tr',{}, h('td',{}, f.n), h('td',{class:'num'}, lb2N(f.pico,1)), h('td',{class:'num'}, h('b',{}, lb2N(f.rec,1)))))))),
      lb2Note(dR > dP ? 'ok' : 'info', 'Rango de cada indicador en tus datos:',
        `el pico varía ${lb2N(dP,1)} lpm entre condiciones, mientras que la recuperación del primer minuto varía ${lb2N(dR,1)} lpm. ` +
        (dR > dP ? 'El indicador que más separa a las condiciones es el que tiene mayor rango: la recuperación.' : 'Si el rango del pico salió mayor, revisa qué variable elegiste como independiente: con la intensidad del ejercicio ambos indicadores cambian a la vez.')));
  },
  analysisExtra:(gs, L, done) => {
    const out = h('div',{});
    return h('div',{class:'card stack'},
      h('span',{class:'eyebrow lab'},'Prueba cruzada obligatoria'),
      h('p',{},'Antes de concluir, corre el mismo esfuerzo (trotar, 16 años, nivel del mar) para las tres condiciones físicas y mira las dos columnas.'),
      h('button',{class:'btn primary',style:'align-self:flex-start',onclick:function(){
        this.disabled = true;
        const filas = ['sed','act','dep'].map(c => {
          const rs = [0,1,2].map(()=>lb2FC({ intensidad:'trotar', condicion:c, altitud:'mar', edad:16 }, false));
          return { n:LB2_COND[c].n, pico:lb2Mean(rs.map(r=>r.extra.pico)), rec:lb2Mean(rs.map(r=>r.y)) };
        });
        out.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
          h('thead',{}, h('tr',{}, h('th',{},'Condición física'), h('th',{},'Pico (promedio de 3)'), h('th',{},'Recuperación 1 min'))),
          h('tbody',{}, filas.map(f => h('tr',{}, h('td',{}, f.n), h('td',{class:'num'}, lb2N(f.pico,1)), h('td',{class:'num'}, h('b',{}, lb2N(f.rec,1)))))))),
          lb2Note('ok','Lo que acabas de comprobar:',
            `las tres personas llegan a un pico casi idéntico (${lb2N(filas[0].pico,0)}, ${lb2N(filas[1].pico,0)} y ${lb2N(filas[2].pico,0)} lpm: la diferencia cabe dentro del error de medición), pero la deportista baja ${lb2N(filas[2].rec,0)} lpm en el primer minuto frente a ${lb2N(filas[0].rec,0)} lpm de la persona sedentaria. La frecuencia máxima depende sobre todo de la edad; la recuperación depende del entrenamiento.`));
        done();
      }},'Ejecutar la prueba cruzada'), out);
  },
  analisis:(gs, L) => {
    const mejor = gs.reduce((a,b)=> b.mean > a.mean ? b : a);
    const peor = gs.reduce((a,b)=> b.mean < a.mean ? b : a);
    return [
      { q:'Según tus datos, ¿qué indicador distingue mejor a una persona entrenada de una sedentaria?',
        ops:['La frecuencia cardíaca máxima alcanzada durante el esfuerzo','La rapidez con que la frecuencia baja en el primer minuto de descanso','La frecuencia cardíaca en reposo antes de empezar'],
        ok:1,
        fb:`Tus propias series lo muestran: el pico apenas cambia entre personas (lo fija sobre todo la edad, 208 − 0,7 × edad), mientras que la caída del primer minuto pasó de ${lb2N(peor.mean,0)} a ${lb2N(mejor.mean,0)} lpm. Esa caída se llama frecuencia de recuperación y refleja cuán rápido el sistema nervioso parasimpático vuelve a frenar el corazón.`,
        wrong:['Revisa la columna del pico en tu tabla: los valores de las tres condiciones se solapan dentro del error de ±2 lpm. La frecuencia máxima la fija sobre todo la edad, no el entrenamiento.',
               'El reposo bajo sí acompaña al entrenamiento, pero es un dato estático: no mide cómo responde el corazón al esfuerzo. Además puede bajar por fiebre, sueño o medicación.'] },
      { q:'El corazón de una persona deportista bombea más sangre en cada latido. ¿Qué consecuencia tiene eso para el mismo trabajo muscular?',
        ops:['Necesita más latidos por minuto para mover la misma sangre','Necesita menos latidos por minuto, porque cada latido rinde más','No cambia nada: el gasto cardíaco no depende del volumen por latido'],
        ok:1,
        fb:'El gasto cardíaco es frecuencia × volumen sistólico. Si el volumen sistólico sube (corazón entrenado, ventrículo más elástico y con más volumen), la misma cantidad de sangre por minuto se consigue con menos latidos. Por eso baja el reposo y por eso la recuperación es más rápida.',
        wrong:['Es al revés: si cada latido mueve más sangre, hacen falta menos latidos para el mismo gasto cardíaco.','El gasto cardíaco es exactamente frecuencia × volumen sistólico: depende de los dos factores. Míralo en el simulador cardiorrespiratorio.'] },
      { q:'Repites exactamente el mismo esfuerzo en Quito (2.850 m). ¿Qué esperas y por qué?',
        ops:['La misma curva: el corazón no percibe la altitud','Un pico algo más alto y una recuperación más lenta, porque cada litro de aire lleva menos oxígeno y el corazón debe compensar','Un pico más bajo, porque el aire de montaña es más puro'],
        ok:1,
        fb:'A 2.850 m la presión parcial de oxígeno es alrededor de un 28 % menor. La misma carga de trabajo representa un porcentaje mayor del máximo, así que el corazón sube más y tarda más en volver. Es la misma variable «altitud» que aparece en el simulador cardiorrespiratorio como caída de la saturación.',
        wrong:['El corazón no percibe la altitud directamente, pero sí percibe el oxígeno que llega a los tejidos: los quimiorreceptores detectan el déficit y aceleran la frecuencia.','«Aire puro» no significa más oxígeno: el porcentaje de O₂ sigue siendo 21 %, pero la presión total es menor y por eso entra menos oxígeno en cada respiración.'] },
      { q:'¿Por qué repetiste cada condición dos o tres veces en lugar de medir una sola?',
        ops:['Para que el experimento durara más y pareciera más serio','Porque cada medición tiene error (±2 lpm): promediar réplicas reduce ese error y permite distinguir diferencias reales de simple ruido','Porque el corazón se cansa y la segunda medición siempre sale más baja'],
        ok:1,
        fb:'Con una sola medición no puedes saber si una diferencia de 3 lpm es real o es el error del método. Al promediar réplicas el error del promedio se reduce, y la desviación típica de tu tabla te dice cuánto ruido tienes.',
        wrong:['La repetición no es un trámite: es lo que permite separar la señal del ruido.','Si la segunda medición saliera siempre más baja, eso sería un error sistemático (por ejemplo, no respetar el reposo previo), y habría que corregir el protocolo, no promediarlo.'] }
    ];
  },
  evalua:(gs, L, ver, C) => {
    const dR = Math.max(...gs.map(g=>g.mean)) - Math.min(...gs.map(g=>g.mean));
    return lb2Note(dR >= 10 ? 'ok' : 'info', 'Evaluación de tus datos:',
      `en tu serie la recuperación del primer minuto varió ${lb2N(dR,1)} lpm entre la mejor y la peor condición. ` +
      (dR >= 10 ? 'Es una diferencia mucho mayor que el error de ±2 lpm: tu conclusión se sostiene sobre datos, no sobre impresiones.'
                : 'Es una diferencia pequeña frente al error de medición: antes de afirmar nada, convendría añadir réplicas o ampliar el rango de la variable independiente.'));
  }
}));

/* =====================================================================
   LABORATORIO 2 · CATALASA Y TEMPERATURA
   ===================================================================== */
const LB2_SRC = { higado:{n:'Hígado de res', k:26}, papa:{n:'Papa', k:9} };
const LB2_PRE = { ninguno:{n:'Sin tratamiento previo', f:1.00}, frio:{n:'Enfriada a 4 °C y devuelta a 20 °C', f:0.97}, calor:{n:'Calentada a 70 °C y devuelta a 20 °C', f:0.05} };

function lb2V0(v){
  const fT = Math.pow(2, (v.temp-20)/10) / (1 + Math.exp((v.temp-42)/3));
  const fp = Math.exp(-Math.pow((v.pH-7)/2.1, 2));
  const fs = v.sustrato/(v.sustrato + 1.2);
  const fe = v.enzima/2;
  return LB2_SRC[v.fuente].k * fT * fp * fs * fe * LB2_PRE[v.previo].f;
}
function lb2Cat(v, quiet){
  const v0 = lb2V0(v);
  const tot = Math.max(0.1, 10*v.sustrato);
  const k = v0/tot;                                   /* min⁻¹ */
  const curve = [];
  for (let t = 0; t <= 120; t += 10){
    let y = tot*(1 - Math.exp(-k*t/60));
    if (!quiet) y *= (1 + lb2Gauss(0.035));
    curve.push({ x:t, y: Math.max(0, Math.round(y*10)/10) });
  }
  const y = Math.round(curve[2].y*3*10)/10;           /* mL en 20 s → mL/min */
  return { y, curve, extra:{ v0 } };
}

route('/laboratorio/catalasa', (view) => lb2Lab(view, {
  slug:'catalasa', actId:'lab-catalasa', nota:'Lab catalasa', xp:130, em:'🧫', escena: lb2EscCat,
  eyebrow:'Laboratorio transversal · Mundo celular · Cuerpo humano y salud',
  title:'Catalasa: ¿a qué temperatura trabaja mejor una enzima?',
  sub:'Toda célula que usa oxígeno produce peróxido de hidrógeno (H₂O₂), que es tóxico. La catalasa lo descompone en agua y oxígeno a una velocidad enorme. Ese oxígeno sale en forma de espuma y se puede medir.',
  proposito:'Medir la velocidad de una enzima en distintas condiciones y descubrir por qué las dos ramas de la curva de temperatura tienen causas diferentes.',
  observa:['Cuánto oxígeno se libera por minuto en cada condición','Dónde está el máximo de la curva y qué pasa antes y después','Qué ocurre cuando una enzima vuelve a su temperatura inicial después de haber pasado frío o calor'],
  reto:'Encuentra la temperatura óptima con tus datos y demuestra experimentalmente que el frío y el calor NO hacen lo mismo con la enzima.',
  pregunta:{ texto:'La catalasa es una proteína. Su forma tridimensional crea un hueco —el sitio activo— donde encaja el H₂O₂. Todo lo que cambie esa forma cambia la velocidad de la reacción. Pero no todos los cambios son iguales: algunos se deshacen y otros no.',
    pregunta:'¿Cómo afecta la temperatura (o el pH, la concentración de sustrato, la cantidad de enzima o su origen) a la velocidad con que la catalasa descompone el H₂O₂?' },
  hipPlaceholder:'Si aumento la temperatura, entonces la velocidad de la catalasa ___, porque ___',
  hipHint:'Piensa en dos cosas a la vez: cuántos choques por segundo hay entre la enzima y el sustrato, y qué le ocurre a la forma de una proteína cuando se calienta demasiado.',
  materiales:[['🧫','Extracto de hígado o de papa'],['🧪','H₂O₂ (agua oxigenada)'],['🌡️','Baños a distintas temperaturas'],['⚗️','Probeta invertida o jeringa'],['⏱️','Cronómetro'],['🧂','Soluciones tampón de pH'],['📏','Regla graduada'],['📓','Tabla de registro']],
  materialesNota:'El oxígeno liberado se recoge por desplazamiento de agua en una probeta invertida: el volumen de gas que se acumula es la medida directa del producto de la reacción.',
  procedimiento:['Prepara el extracto de enzima y mantenlo a la temperatura elegida durante 5 minutos.','Mide el H₂O₂ y llévalo también a esa temperatura.','Mezcla los dos y tapa inmediatamente conectando el tubo a la probeta invertida.','Lee el volumen de oxígeno acumulado cada 10 segundos durante 2 minutos.','Calcula la velocidad inicial con los primeros 20 segundos: es la parte más recta de la curva.','Repite cada condición al menos dos veces y cambia una sola variable entre series.'],
  seguridad:'El H₂O₂ concentrado irrita piel y ojos: usa guantes y gafas. La reacción libera calor y espuma: no tapes el tubo con nada que no deje salir el gas por la probeta.',
  VARS:{
    temp:{ n:'Temperatura', u:'°C', min:0, max:80, step:5, dec:0, porque:'la temperatura cambia los choques por segundo y, por encima del óptimo, la forma de la proteína' },
    pH:{ n:'pH del medio', u:'', min:3, max:11, step:0.5, dec:1, porque:'el pH cambia la carga de los aminoácidos del sitio activo' },
    sustrato:{ n:'Concentración de H₂O₂', u:'%', min:0.5, max:6, step:0.5, dec:1, porque:'con poco sustrato la enzima está ociosa; con mucho, saturada' },
    enzima:{ n:'Cantidad de extracto', u:'mL', min:0.5, max:4, step:0.5, dec:1, porque:'más enzima significa más sitios activos trabajando a la vez' },
    fuente:{ n:'Origen de la catalasa', opts:[{v:'higado',n:'Hígado de res',nCorto:'Hígado'},{v:'papa',n:'Papa',nCorto:'Papa'}], porque:'el hígado tiene mucha más catalasa por gramo que la papa' },
    previo:{ n:'Tratamiento previo del extracto', opts:[{v:'ninguno',n:'Sin tratamiento previo',nCorto:'Ninguno'},{v:'frio',n:'Enfriada a 4 °C y devuelta a 20 °C',nCorto:'Frío→20°'},{v:'calor',n:'Calentada a 70 °C y devuelta a 20 °C',nCorto:'Calor→20°'}], porque:'lo que le pasó antes a la enzima puede haber cambiado su forma para siempre' }
  },
  defaults:{ temp:20, pH:7, sustrato:3, enzima:2, fuente:'higado', previo:'ninguno' },
  indepAllowed:['temp','pH','sustrato','enzima','fuente'],
  depName:'Velocidad inicial de la reacción', depUnit:'mL O₂/min', dec:1,
  depComo:'volumen de oxígeno recogido en los primeros 20 segundos, llevado a minutos (×3). Se usa el tramo inicial porque después el sustrato se agota y la curva se aplana.',
  model: lb2Cat, minLevels:5, minReps:2, minRepLevels:1,
  lineal:['enzima'],
  vizMax:60, vizCap:(v,est)=>`Se recogerán unos ${lb2N(10*v.sustrato,0)} mL de O₂ en total; la mitad, en los primeros ${lb2N(0.69*10*v.sustrato/Math.max(0.01,est.extra.v0)*60,0)} segundos.`,
  medirLabel:'⏱ Medir 2 minutos de reacción',
  curve:true, curveXmin:0, curveXmax:120, curveXticks:6,
  curveXlabel:'segundos', curveYlabel:'mL de O₂ acumulado',
  curveTitle:'Oxígeno acumulado en el tiempo (una curva por condición)',
  scalarTitle:'Velocidad inicial frente a la variable independiente',
  resultadosNota:'Fíjate en que todas las curvas terminan aplanándose: no porque la enzima se canse, sino porque el H₂O₂ se acaba. Por eso la velocidad se mide al principio.',
  links:[['Biomoléculas y homeostasis','#/cn/biomoleculas'],['Procesos celulares','#/explorar/procesos']],
  analisisIntro:(gs, L, C) => (L.indep === 'temp')
    ? lb2Note('info','Localiza el óptimo:', `el máximo de tu serie está en ${lb2Lbl(C.VARS.temp, gs.reduce((a,b)=>b.mean>a.mean?b:a).val)}. Recuerda que el óptimo verdadero puede caer entre dos de tus puntos: con pasos de 5 °C solo puedes acotarlo, no clavarlo.`)
    : lb2Note('info','Nota:', 'Elegiste una variable distinta de la temperatura. Las preguntas siguientes te piden razonar también sobre la curva térmica: la prueba de abajo te dará los datos que necesitas.'),
  analysisExtra:(gs, L, done) => {
    const out = h('div',{});
    return h('div',{class:'card stack'},
      h('span',{class:'eyebrow lab'},'Prueba de reversibilidad (obligatoria)'),
      h('p',{},'Tres porciones del mismo extracto. La primera no se toca. La segunda pasa 10 minutos a 4 °C. La tercera pasa 10 minutos a 70 °C. Las tres se miden después a 20 °C, en idénticas condiciones.'),
      h('button',{class:'btn primary',style:'align-self:flex-start',onclick:function(){
        this.disabled = true;
        const base = { temp:20, pH:7, sustrato:3, enzima:2, fuente:'higado' };
        const filas = ['ninguno','frio','calor'].map(p => {
          const rs = [0,1,2].map(()=>lb2Cat(Object.assign({}, base, {previo:p}), false));
          return { n:LB2_PRE[p].n, v:lb2Mean(rs.map(r=>r.y)) };
        });
        const pct = f => Math.round(f.v/filas[0].v*100);
        out.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
          h('thead',{}, h('tr',{}, h('th',{},'Tratamiento previo'), h('th',{},'Velocidad a 20 °C (mL O₂/min)'), h('th',{},'% de actividad conservada'))),
          h('tbody',{}, filas.map(f => h('tr',{}, h('td',{}, f.n), h('td',{class:'num'}, lb2N(f.v,1)), h('td',{class:'num'}, h('b',{}, pct(f)+' %'))))))),
          lb2Note('ok','La asimetría, medida:',
            `la porción que pasó frío recuperó el ${pct(filas[1])} % de su actividad al volver a 20 °C: el frío solo frena, y al calentar de nuevo las moléculas vuelven a chocar con la misma energía. La porción que pasó por 70 °C conserva apenas el ${pct(filas[2])} %: el calor rompió los enlaces débiles que sostenían la forma tridimensional y el sitio activo dejó de existir. Bajar la temperatura no vuelve a plegar la proteína, igual que enfriar un huevo frito no devuelve la clara transparente.`));
        done();
      }},'Ejecutar la prueba de reversibilidad'), out);
  },
  analisis:(gs, L) => [
    { q:'Las dos ramas de la curva de temperatura (antes y después del óptimo) ¿tienen la misma causa?',
      ops:['Sí: en las dos, la temperatura cambia la velocidad de la reacción por la misma razón','No: la rama que sube se debe a más choques por segundo; la que baja, a la desnaturalización de la proteína','No: la rama que sube se debe a que hay más sustrato y la que baja a que se agota'],
      ok:1,
      fb:'De 0 °C al óptimo, subir la temperatura da más energía cinética: enzima y sustrato chocan más veces por segundo y con la orientación adecuada. Pasado el óptimo (aquí, alrededor de 40 °C) los enlaces débiles que sostienen el plegamiento se rompen: la proteína se desnaturaliza y el sitio activo desaparece. Son dos fenómenos distintos que se cruzan en el máximo.',
      wrong:['Es el error más común de la unidad. Si fuera la misma causa, la curva seguiría subiendo: no habría ningún máximo.','La concentración de sustrato fue una variable controlada en tu diseño: no cambió entre mediciones, así que no puede explicar la caída.'] },
    { q:'Según la prueba de reversibilidad que acabas de ejecutar, ¿qué afirmación es correcta?',
      ops:['El frío y el calor dañan la enzima por igual; solo cambia la rapidez','El frío frena la enzima de forma reversible; el calor por encima del óptimo la desnaturaliza de forma irreversible','El calor es reversible si se enfría rápido; el frío es el que daña de forma permanente'],
      ok:1,
      fb:'Esa asimetría explica por qué los alimentos se conservan en frío (las enzimas y los microorganismos se frenan, pero nada se destruye) y por qué la pasteurización o la fiebre muy alta son otra cosa: ahí las proteínas pierden su forma y no la recuperan.',
      wrong:['Tus propios números lo desmienten: la porción enfriada recuperó prácticamente toda su actividad y la calentada no.','Es justo al revés. Y fíjate en que la velocidad de enfriamiento no aparece en los datos: lo determinante es si se superó o no la temperatura de desnaturalización.'] },
    { q:'Aumentas la concentración de H₂O₂ manteniendo todo lo demás igual. ¿Qué esperas que ocurra con la velocidad inicial?',
      ops:['Sube en proporción directa, sin límite','Sube al principio y luego se estabiliza, porque todos los sitios activos están ocupados','Baja, porque el exceso de sustrato bloquea la enzima'],
      ok:1,
      fb:'Es la saturación enzimática: con poco sustrato, la velocidad depende de cuántas moléculas encuentra la enzima; con mucho, todos los sitios activos están ocupados y el límite lo pone la propia enzima. Añadir más extracto sí subiría la meseta, porque añade sitios activos.',
      wrong:['Si fuera proporcional sin límite, con suficiente H₂O₂ la reacción sería instantánea. El número de sitios activos es finito.','El exceso de sustrato no bloquea a la catalasa. La inhibición por sustrato existe en otras enzimas, pero aquí lo que aparece es una meseta.'] },
    { q:'El hígado da más oxígeno por minuto que la papa en idénticas condiciones. ¿Qué significa eso?',
      ops:['Que la catalasa del hígado es una enzima distinta y más rápida por molécula','Que el hígado contiene más catalasa por gramo, porque su metabolismo genera más peróxido','Que el hígado está más caliente y por eso reacciona mejor'],
      ok:1,
      fb:'La enzima es la misma familia; lo que cambia es la cantidad. El hígado desintoxica y oxida sin parar, así que produce mucho H₂O₂ y necesita muchísima catalasa. La papa también tiene, pero bastante menos por gramo.',
      wrong:['La velocidad por molécula (número de recambio) es parecida. Lo que difiere es cuántas moléculas de enzima hay en cada gramo de tejido.','En el experimento la temperatura era una variable controlada: los dos extractos se midieron a la misma temperatura.'] }
  ],
  evalua:(gs, L, ver, C) => {
    if (L.indep !== 'temp') return lb2Note('info','Evaluación de tus datos:', `trabajaste con «${C.VARS[L.indep].n}». Para cerrar el reto del laboratorio conviene repetir la serie tomando la temperatura como variable independiente y localizar el óptimo con tus propios puntos.`);
    const top = gs.reduce((a,b)=>b.mean>a.mean?b:a);
    const bien = Math.abs(+top.val - 40) <= 7.5;
    return lb2Note(bien ? 'ok' : 'warn','Evaluación de tus datos:',
      `tu máximo cayó en ${lb2N(+top.val,0)} °C, con ${lb2N(top.mean,1)} mL O₂/min. ` +
      (bien ? 'Coincide con el óptimo de la catalasa de mamífero, que está cerca de los 37–40 °C: la temperatura del cuerpo donde trabaja normalmente.'
            : 'El óptimo real de la catalasa está cerca de los 37–40 °C. Si tu máximo quedó lejos, probablemente tu serie tiene pocos puntos en esa zona o el ruido desplazó el máximo: añade réplicas alrededor de 35–45 °C.'));
  }
}));

/* =====================================================================
   LABORATORIO 3 · ÓSMOSIS EN PAPA
   ===================================================================== */
const LB2_ISO = 0.9;   /* % de NaCl equivalente al interior de la célula de papa */

function lb2Osm(v, quiet){
  const tau = 20*(v.largo/4)*(1 - (v.temp-20)*0.012);
  const dmax = 15*Math.tanh(1.1*(LB2_ISO - v.conc)/LB2_ISO);
  let y = dmax*(1 - Math.exp(-v.tiempo/Math.max(4, tau)));
  if (!quiet) y += lb2Gauss(0.8);
  return { y: Math.round(y*10)/10 };
}

route('/laboratorio/osmosis-papa', (view) => lb2Lab(view, {
  slug:'osmosis-papa', actId:'lab-osmosis-papa', nota:'Lab ósmosis en papa', xp:130, em:'💧', escena: lb2EscOsm,
  eyebrow:'Laboratorio transversal · Mundo celular',
  title:'Ósmosis: encuentra el punto en el que la papa no gana ni pierde agua',
  sub:'Un cilindro de papa sumergido en agua pura gana peso; en salmuera lo pierde. En algún punto intermedio la balanza no se mueve: ahí la concentración del exterior iguala a la del interior de la célula. Ese valor no se lee, se calcula.',
  proposito:'Determinar la concentración isotónica de un tejido vegetal interpolando el punto donde la recta de cambio de masa cruza el cero, y valorar el peso del error experimental en esa estimación.',
  observa:['En qué concentraciones la masa sube y en cuáles baja','Cuánto varían dos réplicas de la misma concentración','Entre qué dos puntos cambia el signo del cambio de masa'],
  reto:'Calcula por interpolación la concentración isotónica de tu papa y justifica con la desviación de tus réplicas cuánta confianza merece ese número.',
  pregunta:{ texto:'La membrana de la célula deja pasar agua pero casi no deja pasar sal. Si fuera hay más sal que dentro, el agua sale y el cilindro pierde masa; si hay menos, entra y la gana. Como el cambio de masa pasa de positivo a negativo, en algún punto vale exactamente cero.',
    pregunta:'¿Cómo cambia la masa de un cilindro de papa según la concentración de la solución en la que se sumerge, y en qué concentración el cambio es nulo?' },
  hipPlaceholder:'Si aumento la concentración de sal de la solución, entonces la masa del cilindro ___, y el cambio será cero cuando ___, porque ___',
  hipHint:'No basta con decir «pierde agua»: arriesga un valor numérico para la concentración isotónica. Una hipótesis cuantitativa es más fácil de refutar, y por eso es mejor hipótesis.',
  materiales:[['🥔','Papas del mismo tubérculo'],['🔪','Sacabocados o cuchillo'],['⚖️','Balanza de 0,01 g'],['🧂','Sal y agua destilada'],['🥛','Seis vasos rotulados'],['📏','Regla'],['🧻','Papel absorbente'],['⏱️','Reloj']],
  materialesNota:'Los cilindros deben salir del mismo tubérculo y tener el mismo tamaño: papas distintas tienen concentraciones internas distintas, y un cilindro más grueso tarda más en equilibrarse.',
  procedimiento:['Corta cilindros iguales, sécalos suavemente con papel y pésalos: esa es la masa inicial.','Prepara las soluciones de sal en el rango elegido y rotula cada vaso.','Sumerge un cilindro en cada vaso y anota la hora.','Pasado el tiempo previsto, saca el cilindro, sécalo siempre con la misma técnica y pésalo.','Calcula el cambio porcentual: (masa final − masa inicial) ÷ masa inicial × 100.','Repite cada concentración al menos dos veces: el secado es la mayor fuente de error.'],
  seguridad:'Ningún riesgo químico. El único cuidado es con el cuchillo o el sacabocados: corta siempre sobre una tabla y en dirección contraria al cuerpo.',
  VARS:{
    conc:{ n:'Concentración de NaCl', u:'%', min:0, max:2, step:0.1, dec:1, porque:'es la variable que determina hacia dónde se mueve el agua' },
    tiempo:{ n:'Tiempo de inmersión', u:'min', min:10, max:60, step:5, dec:0, porque:'si unos cilindros se equilibran y otros no, la comparación deja de ser justa' },
    temp:{ n:'Temperatura del agua', u:'°C', min:5, max:35, step:5, dec:0, porque:'la temperatura cambia la rapidez con que el agua atraviesa la membrana' },
    largo:{ n:'Largo del cilindro', u:'cm', min:2, max:6, step:0.5, dec:1, porque:'un cilindro más largo tiene menos superficie por gramo y tarda más en equilibrarse' }
  },
  defaults:{ conc:0.6, tiempo:30, temp:20, largo:4 },
  indepAllowed:['conc'],
  depName:'Cambio porcentual de masa', depUnit:'%', dec:1, diverging:true, vizMax:14,
  depComo:'(masa final − masa inicial) ÷ masa inicial × 100. Positivo significa que el cilindro ganó agua; negativo, que la perdió.',
  model: lb2Osm, minLevels:5, minReps:2, minRepLevels:3,
  lineal:['conc'],
  anotaciones:(gs) => {
    const fit = lb2Fit(gs.map(g=>({x:+g.val, y:g.mean})));
    const a = [{ y:0, texto:'sin cambio de masa' }];
    if (fit && fit.x0 != null && fit.x0 >= 0 && fit.x0 <= 2) a.push({ x:fit.x0, texto:'cruce por cero' });
    return a;
  },
  tendenciaNota:'Donde la recta corta la línea «sin cambio de masa» está el punto isotónico; en el Análisis calcularás su valor.',
  vizCap:(v,est)=> est.y > 0.5 ? 'El cilindro está ganando agua: la solución es hipotónica respecto al interior de la célula.'
                 : est.y < -0.5 ? 'El cilindro está perdiendo agua: la solución es hipertónica respecto al interior de la célula.'
                 : 'La balanza casi no se mueve: estás muy cerca del punto isotónico.',
  medirLabel:'⚖️ Pesar el cilindro',
  curve:false,
  graficoNota:'La recta cruza el eje horizontal en el punto isotónico. Ese cruce no coincide con ninguno de tus puntos medidos: hay que calcularlo.',
  resultadosNota:'Observa la desviación típica de cada concentración: es el error de tu técnica de secado. Cualquier conclusión que dependa de diferencias menores que ese número no es sólida.',
  links:[['Procesos celulares (ósmosis y transporte)','#/explorar/procesos'],['La célula ampliada','#/explorar/celula-ampliada']],
  analisisIntro:(gs) => lb2Note('info','Lo que ya sabes y lo que vas a hacer ahora:',
    'La dirección del movimiento del agua (hipotónico, isotónico, hipertónico) la exploraste en Procesos celulares. Aquí no se trata de predecir el sentido, sino de obtener un número: la concentración exacta en la que el flujo neto es cero. Eso solo se consigue con datos y con una interpolación.'),
  analysisExtra:(gs, L, done) => {
    const fit = lb2Fit(gs.map(g=>({x:+g.val, y:g.mean})));
    const sel1 = h('select',{'aria-label':'Primer punto'}), sel2 = h('select',{'aria-label':'Segundo punto'});
    gs.forEach(g => { const t = lb2N(+g.val,1)+' % → '+lb2N(g.mean,1)+' %'; sel1.append(h('option',{value:g.key}, t)); sel2.append(h('option',{value:g.key}, t)); });
    const pos = gs.filter(g=>g.mean>0), neg = gs.filter(g=>g.mean<0);
    if (pos.length) sel1.value = pos[pos.length-1].key;
    if (neg.length) sel2.value = neg[0].key;
    const out1 = h('div',{});
    const inp = h('input',{type:'text', class:'lb2-num', inputmode:'decimal', 'aria-label':'Tu estimación de la concentración isotónica en porcentaje', placeholder:'Ej.: 0,9'});
    const out2 = h('div',{});

    const calcular = h('button',{class:'btn',onclick:()=>{
      const a = gs.find(g=>g.key===sel1.value), b = gs.find(g=>g.key===sel2.value);
      out1.innerHTML = '';
      if (!a || !b || a.key === b.key) { out1.append(lb2Note('warn', null, 'Elige dos puntos distintos.')); return; }
      if ((a.mean > 0) === (b.mean > 0)){
        out1.append(lb2Note('warn','Esos dos puntos no sirven para interpolar.','Los dos tienen el mismo signo, así que la recta que los une no cruza el cero entre ellos. Elige un punto con cambio positivo (ganó agua) y otro con cambio negativo (perdió agua).'));
        return;
      }
      const x1 = +a.val, y1 = a.mean, x2 = +b.val, y2 = b.mean;
      const x0 = x1 - y1*(x2-x1)/(y2-y1);
      out1.append(lb2Note('ok','Interpolación lineal entre tus dos puntos:',
        `x₀ = ${lb2N(x1,1)} − (${lb2N(y1,1)}) × (${lb2N(x2,1)} − ${lb2N(x1,1)}) ÷ (${lb2N(y2,1)} − (${lb2N(y1,1)})) = ${lb2N(x0,2)} %. ` +
        `Entre ${lb2N(x1,1)} % y ${lb2N(x2,1)} % el cambio de masa pasó de positivo a negativo; el cero está en ese tramo. Escribe abajo tu estimación final.`));
      try { Store.log('laboratorio',{lab:'osmosis-papa', interpolacion:Math.round(x0*100)/100}); } catch(e){}
    }},'Calcular el cruce por cero');

    const enviar = h('button',{class:'btn primary',onclick:()=>{
      const val = parseFloat(String(inp.value).replace(',','.'));
      out2.innerHTML = '';
      if (isNaN(val)){ out2.append(lb2Note('warn', null, 'Escribe un número, por ejemplo 0,9.')); return; }
      const propio = fit && fit.x0 != null ? fit.x0 : LB2_ISO;
      const dPropio = Math.abs(val - propio), dReal = Math.abs(val - LB2_ISO);
      if (dPropio > 0.25){
        out2.append(lb2Note('bad','Ese valor no sale de tus datos.',
          `La recta ajustada a tus ${gs.length} promedios cruza el cero en ${lb2N(propio,2)} %. Tu estimación se aparta ${lb2N(dPropio,2)} puntos de lo que dicen tus propias mediciones. Revisa la interpolación: el punto isotónico está entre la última concentración que hizo ganar masa y la primera que la hizo perder.`));
        return;
      }
      out2.append(lb2Note('ok','Estimación coherente con tus datos.',
        `Tu valor (${lb2N(val,2)} %) concuerda con la recta ajustada a tus promedios (${lb2N(propio,2)} %). El valor de referencia para la papa está alrededor de ${lb2N(LB2_ISO,1)} % de NaCl; tú te quedaste a ${lb2N(dReal,2)} puntos. ` +
        `La diferencia no es un fallo: la concentración interna varía de un tubérculo a otro y el secado con papel introduce un error de casi un punto porcentual de masa. Por eso se promedian réplicas y por eso se ajusta una recta a todos los puntos en lugar de fiarse de dos.`));
      try { Store.log('laboratorio',{lab:'osmosis-papa', estimacion:val, ajuste:Math.round(propio*100)/100}); } catch(e){}
      enviar.disabled = true; done();
    }},'Comprobar mi estimación');

    return h('div',{class:'card stack'},
      h('span',{class:'eyebrow lab'},'Cálculo del punto isotónico (obligatorio)'),
      h('p',{class:'small muted'},'Paso 1: elige los dos puntos entre los que el cambio de masa cambia de signo e interpola.'),
      h('div',{class:'lb2-grid2'},
        h('div',{class:'field'}, h('label',{},'Punto con cambio positivo'), sel1),
        h('div',{class:'field'}, h('label',{},'Punto con cambio negativo'), sel2)),
      calcular, out1,
      h('p',{class:'small muted',style:'margin-top:6px'},'Paso 2: escribe tu estimación final de la concentración isotónica, en porcentaje.'),
      h('div',{class:'row'}, inp, enviar), out2);
  },
  analisis:(gs, L) => {
    const fit = lb2Fit(gs.map(g=>({x:+g.val, y:g.mean})));
    const x0 = fit && fit.x0 != null ? fit.x0 : LB2_ISO;
    const sdMax = Math.max(...gs.map(g=>g.sd||0));
    return [
      { q:'¿Por qué el punto isotónico hay que interpolarlo en lugar de leerlo directamente de la tabla?',
        ops:['Porque la balanza no es lo bastante precisa para leer un cero','Porque el cero casi nunca cae justo en una de las concentraciones ensayadas: se deduce de dónde la recta cruza el eje','Porque el cambio de masa nunca llega exactamente a cero en ninguna concentración'],
        ok:1,
        fb:`Tus concentraciones van de 0,1 en 0,1: la probabilidad de acertar el cero exacto es mínima. Por eso se ajusta una recta a todos los promedios y se busca su intersección con el eje horizontal. En tu serie, ese cruce cayó en ${lb2N(x0,2)} %.`,
        wrong:['La balanza tiene precisión de sobra (0,01 g). El problema no es el instrumento, sino que el cero cae entre dos puntos medidos.','Sí existe una concentración en la que el flujo neto es cero: lo que ocurre es que probablemente no la ensayaste.'] },
      { q:'Un compañero mide una sola vez cada concentración y obtiene un punto isotónico distinto al tuyo. ¿Qué le dirías?',
        ops:['Que su papa es distinta y por eso no hay nada que discutir','Que sin réplicas no puede saber si su diferencia es real o es error de medición: la desviación de tus réplicas llegó a ± '+lb2N(sdMax,1)+' puntos','Que el método está mal y hay que usar otra técnica'],
        ok:1,
        fb:'Con una sola medición por punto, un error de secado de un gramo se convierte directamente en un punto isotónico desplazado. Promediar réplicas reduce ese error y además te da una medida de cuánto ruido tienes.',
        wrong:['La variación entre tubérculos existe y es real, pero eso es justamente una razón más para repetir y promediar, no para dejar de comparar.','El método de pesada es el estándar en este experimento. Lo que falta no es técnica nueva, sino repeticiones.'] },
      { q:'En una solución más concentrada que el punto isotónico, ¿qué atraviesa la membrana?',
        ops:['Sal, que entra a la célula hasta igualar las concentraciones','Agua, que sale de la célula hacia la solución más concentrada','Agua y sal a la vez, en direcciones opuestas'],
        ok:1,
        fb:'La membrana es semipermeable: el agua la cruza libremente y la sal casi no. Por eso el disolvente se mueve hacia donde hay menos agua libre, y la célula pierde masa. Esa pérdida es lo que pesaste.',
        wrong:['Si la sal entrara con facilidad, el experimento no funcionaría: las concentraciones se igualarían sin que la masa cambiara.','La sal prácticamente no atraviesa la membrana en este montaje. Lo que se desplaza es el agua.'] },
      { q:'Dejas los cilindros 10 minutos en lugar de 30. ¿Qué cambia en tu gráfico?',
        ops:['El punto isotónico se desplaza hacia concentraciones mayores','Los cambios de masa son menores en valor absoluto, pero el cruce por cero se mantiene en el mismo lugar','No cambia nada, porque la ósmosis es instantánea'],
        ok:1,
        fb:'El tiempo afecta a cuánto se ha avanzado hacia el equilibrio, es decir, a la pendiente de la recta; no a la concentración en la que el flujo neto es nulo. Por eso el tiempo debía ser una variable controlada: si cada vaso hubiera tenido su propio tiempo, la recta se habría deformado.',
        wrong:['El punto isotónico lo fija la concentración interna del tejido, no el tiempo de inmersión.','La ósmosis es un proceso gradual: en 10 minutos el cilindro apenas ha empezado a equilibrarse.'] }
    ];
  },
  evalua:(gs, L, ver, C) => {
    const fit = lb2Fit(gs.map(g=>({x:+g.val, y:g.mean})));
    const x0 = fit && fit.x0 != null ? fit.x0 : null;
    if (x0 == null) return lb2Note('info','Evaluación de tus datos:','No se pudo ajustar una recta a tus promedios.');
    const err = Math.abs(x0 - LB2_ISO);
    return lb2Note(err <= 0.15 ? 'ok' : 'warn','Evaluación de tus datos:',
      `la recta ajustada a tus ${gs.length} promedios cruza el cero en ${lb2N(x0,2)} % de NaCl, frente al valor de referencia de ${lb2N(LB2_ISO,1)} %: una diferencia de ${lb2N(err,2)} puntos. ` +
      (err <= 0.15 ? 'Es una estimación muy buena para una técnica de pesada con secado manual.'
                   : 'La desviación es apreciable: probablemente tus puntos están concentrados en un extremo del rango o te faltan réplicas cerca del cruce. Repite añadiendo concentraciones entre 0,6 % y 1,2 %.'));
  }
}));

/* =====================================================================
   LABORATORIO 4 · FERMENTACIÓN DE LEVADURA
   ===================================================================== */
const LB2_AZ = {
  glucosa:  { n:'Glucosa',  f:1.00, y:0.9 },
  sacarosa: { n:'Sacarosa', f:0.90, y:0.9 },
  lactosa:  { n:'Lactosa',  f:0.02, y:0.02 },
  almidon:  { n:'Almidón',  f:0.03, y:0.03 },
  almidonh: { n:'Almidón + amilasa (hidrolizado)', f:0.78, y:0.8 },
  ninguno:  { n:'Sin azúcar', f:0, y:0 }
};
const LB2_O2 = { cerrado:{ n:'Tubo cerrado (sin O₂): fermentación', r:1.00, atp:2,  rend:1.0 },
                 aireado:{ n:'Frasco aireado (con O₂): respiración', r:1.25, atp:32, rend:3.0 } };

function lb2Fer(v, quiet){
  const a = LB2_AZ[v.azucar], o = LB2_O2[v.oxigeno];
  let fT = Math.exp(-Math.pow((v.temp-35)/13, 2));
  if (v.temp > 50) fT *= Math.max(0, 1 - (v.temp-50)/8);
  const fC = v.cantidad/(v.cantidad + 2.5);
  const vmax = 42*a.f*fC*fT*o.r;
  const tot = 120*v.cantidad*a.y*o.rend;
  const k = tot > 0 ? vmax/tot : 0;
  const curve = [];
  for (let t = 0; t <= 20; t += 2){
    let y = tot*(1 - Math.exp(-k*t));
    if (!quiet) y *= (1 + lb2Gauss(0.04));
    curve.push({ x:t, y: Math.max(0, Math.round(y*10)/10) });
  }
  const y = Math.round(curve[3].y/6*10)/10;   /* mL a los 6 min → mL/min */
  return { y, curve, extra:{ tot, atp:o.atp } };
}

route('/laboratorio/fermentacion', (view) => lb2Lab(view, {
  slug:'fermentacion', actId:'lab-fermentacion', nota:'Lab fermentación de levadura', xp:130, em:'🍞', escena: lb2EscFer,
  eyebrow:'Laboratorio transversal · Mundo celular · Biodiversidad y ecosistemas',
  title:'Fermentación: ¿qué necesita la levadura para producir más CO₂?',
  sub:'La levadura es un hongo unicelular. Cuando dispone de un azúcar que puede usar, lo degrada y libera dióxido de carbono: por eso sube el pan. Midiendo ese gas se mide su metabolismo en directo.',
  proposito:'Determinar qué azúcares puede aprovechar la levadura y en qué condiciones, y comparar el rendimiento de la fermentación con el de la respiración aerobia.',
  observa:['Qué azúcares producen gas y cuáles no producen nada','Cómo cambia la producción con la temperatura y con la cantidad de azúcar','Cuánto CO₂ y cuánto ATP se obtienen con oxígeno y sin oxígeno'],
  reto:'Encuentra al menos un azúcar que la levadura no pueda usar y explica, con tus datos, qué le falta a la levadura para aprovecharlo.',
  pregunta:{ texto:'La levadura no puede comer cualquier cosa: para usar un azúcar necesita una enzima capaz de partirlo y de meterlo en la vía metabólica. Si no tiene esa enzima, el azúcar está ahí y no le sirve de nada.',
    pregunta:'¿Cómo afectan el tipo de azúcar (o su cantidad, la temperatura y la presencia de oxígeno) a la producción de CO₂ de un cultivo de levadura?' },
  hipPlaceholder:'Si doy a la levadura ___, entonces producirá ___ CO₂ que con ___, porque ___',
  hipHint:'Arriesga una predicción para cada azúcar de la lista, no solo para uno. Piensa en qué enzimas necesita una célula para partir un disacárido o un polisacárido.',
  materiales:[['🍞','Levadura seca'],['🍬','Glucosa, sacarosa, lactosa y almidón'],['💦','Agua tibia'],['🧪','Tubos de ensayo con tapón'],['🎈','Globos o jeringas para recoger el gas'],['🌡️','Termómetro y baño'],['⏱️','Cronómetro'],['⚖️','Balanza']],
  materialesNota:'El CO₂ se recoge en una jeringa o se mide por el desplazamiento de agua. Un globo sirve para ver el fenómeno, pero no para medirlo con precisión: su goma opone una resistencia que cambia con el tamaño.',
  procedimiento:['Disuelve la misma masa de levadura en agua tibia en todos los tubos.','Añade el azúcar elegido en la cantidad prevista y agita para disolverlo.','Tapa el tubo y conéctalo al sistema de recogida de gas.','Coloca el tubo en el baño a la temperatura elegida.','Lee el volumen de CO₂ acumulado cada 2 minutos durante 20 minutos.','Repite cada condición al menos dos veces y cambia una sola variable entre series.'],
  seguridad:'Nunca calientes un tubo tapado con llama y no uses tapones a presión: el CO₂ acumulado puede hacer saltar el tapón. El sistema debe tener siempre una salida hacia la jeringa o la probeta.',
  VARS:{
    azucar:{ n:'Tipo de azúcar', opts:[{v:'ninguno',n:'Sin azúcar',nCorto:'Ninguno'},{v:'glucosa',n:'Glucosa',nCorto:'Glucosa'},{v:'sacarosa',n:'Sacarosa',nCorto:'Sacarosa'},{v:'lactosa',n:'Lactosa',nCorto:'Lactosa'},{v:'almidon',n:'Almidón',nCorto:'Almidón'},{v:'almidonh',n:'Almidón + amilasa (hidrolizado)',nCorto:'Almidón+a.'}], porque:'cada azúcar necesita su propia enzima para poder usarse' },
    cantidad:{ n:'Cantidad de azúcar', u:'g', min:0, max:10, step:1, dec:0, porque:'el sustrato disponible limita cuánto CO₂ puede llegar a producirse' },
    temp:{ n:'Temperatura', u:'°C', min:5, max:60, step:5, dec:0, porque:'las enzimas de la levadura tienen su propio óptimo térmico' },
    oxigeno:{ n:'Presencia de oxígeno', opts:[{v:'cerrado',n:'Tubo cerrado (sin O₂): fermentación',nCorto:'Sin O₂'},{v:'aireado',n:'Frasco aireado (con O₂): respiración',nCorto:'Con O₂'}], porque:'con oxígeno la ruta metabólica es otra y el rendimiento cambia por completo' }
  },
  defaults:{ azucar:'glucosa', cantidad:5, temp:35, oxigeno:'cerrado' },
  indepAllowed:['azucar','temp','cantidad','oxigeno'],
  depName:'Velocidad media de producción de CO₂', depUnit:'mL/min', dec:1,
  depComo:'volumen de CO₂ acumulado a los 6 minutos dividido para 6. Se toma el tramo inicial porque después empieza a agotarse el azúcar.',
  model: lb2Fer, minLevels:5, minReps:2, minRepLevels:1,
  vizMax:35, vizCap:(v,est)=>`Si la reacción llegara al final se acumularían unos ${lb2N(est.extra.tot,0)} mL de CO₂ · rendimiento energético: ${est.extra.atp} ATP por glucosa.`,
  medirLabel:'⏱ Medir 20 minutos de cultivo',
  curve:true, curveXmin:0, curveXmax:20, curveXticks:5,
  curveXlabel:'minutos', curveYlabel:'mL de CO₂ acumulado',
  curveTitle:'CO₂ acumulado en el tiempo (una curva por condición)',
  scalarTitle:'Velocidad media de producción frente a la variable independiente',
  resultadosNota:'Si alguna condición dio una línea prácticamente plana, ese resultado no es un fallo del montaje: es un dato, y de los más informativos del laboratorio.',
  links:[['Biomoléculas y homeostasis','#/cn/biomoleculas'],['Procesos celulares (respiración)','#/explorar/procesos']],
  analisisIntro:(gs, L, C) => {
    const nulos = gs.filter(g => g.mean < 1.5);
    return nulos.length
      ? lb2Note('warn','Tienes condiciones sin producción de gas:',
          nulos.map(g=>lb2Lbl(C.VARS[L.indep], g.val)).join(', ') +
          '. Un resultado nulo no significa que el experimento fallara: significa que la levadura no pudo usar ese sustrato o que las condiciones lo impidieron. Descubre cuál de las dos cosas fue.')
      : lb2Note('info','Nota:', 'En tu serie todas las condiciones produjeron gas. Antes de concluir, prueba también con lactosa y con almidón: son los casos que revelan el papel de las enzimas.');
  },
  analysisExtra:(gs, L, done) => {
    const out = h('div',{});
    return h('div',{class:'card stack'},
      h('span',{class:'eyebrow lab'},'Comparación obligatoria: fermentación frente a respiración'),
      h('p',{},'Mismo cultivo, misma glucosa (5 g), misma temperatura (35 °C). Solo cambia si el frasco está cerrado o aireado.'),
      h('button',{class:'btn primary',style:'align-self:flex-start',onclick:function(){
        this.disabled = true;
        const base = { azucar:'glucosa', cantidad:5, temp:35 };
        const filas = ['cerrado','aireado'].map(o => {
          const rs = [0,1,2].map(()=>lb2Fer(Object.assign({}, base, {oxigeno:o}), false));
          return { n:LB2_O2[o].n, v:lb2Mean(rs.map(r=>r.y)), tot:lb2Mean(rs.map(r=>r.curve[r.curve.length-1].y)), atp:LB2_O2[o].atp };
        });
        out.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
          h('thead',{}, h('tr',{}, h('th',{},'Condición'), h('th',{},'Velocidad (mL/min)'), h('th',{},'CO₂ a los 20 min (mL)'), h('th',{},'ATP por glucosa'))),
          h('tbody',{}, filas.map(f => h('tr',{}, h('td',{}, f.n), h('td',{class:'num'}, lb2N(f.v,1)), h('td',{class:'num'}, lb2N(f.tot,0)), h('td',{class:'num'}, h('b',{}, String(f.atp)))))))),
          lb2Note('ok','Lo que muestran los números:',
            `con oxígeno la levadura sacó ${lb2N(filas[1].tot,0)} mL de CO₂ de los mismos 5 g de glucosa, frente a ${lb2N(filas[0].tot,0)} mL sin oxígeno: es la diferencia entre oxidar la glucosa por completo (6 CO₂ por molécula) y dejarla a medias en etanol (2 CO₂ por molécula). ` +
            `Y la diferencia importante no está en el gas, sino en la energía: 32 ATP por glucosa con oxígeno frente a 2 sin él. La fermentación es una salida de emergencia, mucho más rápida por molécula pero mucho menos rentable; por eso el pan sube con levadura en masa cerrada y por eso una cerveza se hace en tanques sin aire.`));
        done();
      }},'Ejecutar la comparación'), out);
  },
  analisis:(gs, L) => [
    { q:'La levadura no produce prácticamente nada de CO₂ con lactosa. ¿Cuál es la explicación correcta?',
      ops:['La lactosa no es un azúcar, por eso no sirve como alimento','La levadura de panadería no tiene lactasa: sin esa enzima no puede partir la lactosa en glucosa y galactosa','La lactosa mata a la levadura por ser de origen animal'],
      ok:1,
      fb:'La lactosa es un disacárido perfectamente energético: quien no puede usarlo es la levadura, porque le falta la enzima que lo corta. Es el mismo motivo por el que muchas personas son intolerantes a la lactosa: no fabrican suficiente lactasa en el intestino. El sustrato está; la enzima no.',
      wrong:['La lactosa sí es un azúcar: es el disacárido de la leche, formado por glucosa y galactosa.','La levadura no muere con lactosa: sigue viva, simplemente no puede aprovecharla. Si le añades glucosa al mismo tubo, empieza a producir gas.'] },
    { q:'Con almidón tampoco hay gas, pero con almidón previamente tratado con amilasa sí. ¿Qué demuestra esa pareja de resultados?',
      ops:['Que la amilasa es la que produce el CO₂','Que el almidón sí es aprovechable, pero solo después de hidrolizarlo en azúcares más pequeños que la levadura sí puede transportar y usar','Que el almidón estaba en mal estado en el primer tubo'],
      ok:1,
      fb:'El almidón es un polisacárido enorme: no atraviesa la membrana de la levadura y esta no segrega amilasa. Al hidrolizarlo previamente (con amilasa, o con la amilasa de la saliva) se obtiene maltosa y glucosa, que sí entran. Es exactamente lo que hace tu sistema digestivo antes de absorber un pan.',
      wrong:['La amilasa es una enzima digestiva: corta el almidón, no produce gas. Sin levadura no habría CO₂ aunque hubiera amilasa.','Los dos tubos tenían el mismo almidón. La única diferencia fue el tratamiento previo con la enzima, y esa es la variable que explica el resultado.'] },
    { q:'Según la comparación que ejecutaste, ¿por qué se dice que la fermentación es menos eficiente que la respiración aerobia?',
      ops:['Porque produce menos CO₂ por minuto','Porque obtiene 2 ATP por glucosa frente a 32: deja la mayor parte de la energía atrapada en el etanol','Porque necesita más azúcar para empezar'],
      ok:1,
      fb:'La eficiencia se mide en energía aprovechada por molécula de combustible, no en gas producido. En la fermentación la glucosa solo se parte hasta etanol, que todavía contiene muchísima energía química: por eso el etanol arde. Con oxígeno, la oxidación llega hasta CO₂ y agua, y no queda energía por extraer.',
      wrong:['La velocidad por molécula es incluso mayor en la fermentación; su problema es el rendimiento, no la rapidez.','La cantidad de azúcar necesaria para arrancar es la misma: lo que cambia es cuánta energía se obtiene de cada gramo.'] },
    { q:'A 60 °C la producción cae casi a cero y ya no se recupera al enfriar. ¿Por qué?',
      ops:['Porque a esa temperatura el CO₂ se disuelve en el agua y no se puede medir','Porque las enzimas de la levadura se desnaturalizan y las células mueren: el daño es irreversible','Porque el azúcar se caramelizó y dejó de ser azúcar'],
      ok:1,
      fb:'Es el mismo fenómeno que viste con la catalasa, pero ahora en un organismo completo: por encima de unos 50 °C las proteínas de la levadura pierden su forma y la célula no sobrevive. Enfriarla no la revive. En cambio, a 5 °C la levadura solo está frenada: al templarla vuelve a trabajar. Por eso la masa de pan se guarda en la nevera y no en el horno.',
      wrong:['El CO₂ sí es algo más soluble en frío que en caliente, pero eso no explica una caída casi total ni que sea irreversible.','La caramelización necesita temperaturas muy superiores (por encima de 150 °C) y en seco, no en una disolución acuosa a 60 °C.'] }
  ],
  evalua:(gs, L, ver, C) => {
    if (L.indep !== 'azucar') return lb2Note('info','Evaluación de tus datos:','Tu serie exploró otra variable. Para cerrar el reto conviene repetir tomando el tipo de azúcar como variable independiente: es la serie que revela qué enzimas tiene y cuáles le faltan a la levadura.');
    const nulos = gs.filter(g => g.mean < 1.5).map(g => g.val);
    const hayLac = nulos.includes('lactosa'), hayAlm = nulos.includes('almidon');
    return lb2Note(hayLac || hayAlm ? 'ok' : 'warn','Evaluación de tus datos:',
      hayLac || hayAlm
        ? `encontraste ${nulos.length} sustrato(s) sin producción apreciable de gas. Ese resultado negativo es el hallazgo central del laboratorio: demuestra que lo que limita a la levadura no es la falta de comida, sino la falta de la enzima capaz de procesarla.`
        : 'Todas las condiciones que mediste produjeron gas, así que todavía no has comprobado el punto clave. Repite la serie incluyendo lactosa y almidón sin hidrolizar.');
  }
}));
</script>
