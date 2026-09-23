<style>
/* ===== Selección natural y evolución (BGU U4 · 9.º EGB CVT U1) — CSS propio, prefijo evo- ===== */
.evo-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.evo-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.evo-nav button:hover{border-color:var(--gen,var(--accent))}
.evo-nav button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.evo-nav button[aria-current="true"]{background:var(--gen,var(--accent));border-color:var(--gen,var(--accent));color:#fff}
.evo-stage{height:430px;min-height:430px;align-self:start}
.evo-cv{width:100%;display:block;border:1px solid var(--line);border-radius:12px;background:var(--bg-3)}
.evo-chart{position:relative}
.evo-chart canvas{width:100%;height:250px;display:block}
.evo-ctrls{display:flex;flex-direction:column;gap:11px}
.evo-grp{display:flex;flex-direction:column;gap:5px}
.evo-grp>.evo-lab{font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);font-weight:600}
.evo-seg{display:flex;flex-wrap:wrap;gap:4px}
.evo-seg button{flex:1 1 auto;min-width:64px;border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:9px;padding:6px 8px;font:600 .78rem/1.15 "IBM Plex Sans",sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px}
.evo-seg button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.evo-seg button[aria-pressed="true"]{background:color-mix(in srgb,var(--gen,var(--accent)) 18%,var(--bg-2));border-color:var(--gen,var(--accent));color:var(--ink)}
.evo-seg button i{width:13px;height:13px;border-radius:3px;border:1px solid var(--line-2,var(--line));display:inline-block;font-style:normal;flex:0 0 auto}
.evo-hist{display:flex;align-items:flex-end;gap:3px;height:120px;padding:4px 2px 0;border-bottom:1px solid var(--line)}
.evo-hist>div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%}
.evo-hist i{display:block;border-radius:4px 4px 0 0;min-height:2px;border:1px solid rgba(0,0,0,.18)}
.evo-histx{display:flex;justify-content:space-between;font-size:.66rem;color:var(--ink-3);margin-top:3px;font-family:var(--font-m,"IBM Plex Mono",monospace)}
.evo-two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.evo-kv{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:.82rem;margin:0}
.evo-kv dt{color:var(--ink-3)}
.evo-kv dd{margin:0;font-family:var(--font-m,"IBM Plex Mono",monospace);font-variant-numeric:tabular-nums;color:var(--ink);font-weight:600}
.evo-sw{display:inline-block;width:14px;height:14px;border-radius:4px;border:1px solid var(--line);vertical-align:-2px;margin-right:5px}
.evo-lg{display:flex;flex-wrap:wrap;gap:10px;font-size:.76rem;color:var(--ink-2);align-items:center}
.evo-lg span{display:inline-flex;align-items:center;gap:5px}
.evo-lg i{width:16px;height:4px;border-radius:2px;display:inline-block;font-style:normal}
.evo-bugs{display:flex;flex-wrap:wrap;gap:7px}
.evo-bug{width:28px;height:36px;position:relative;flex:0 0 auto;display:block}
.evo-bug svg{width:100%;height:100%;display:block;filter:drop-shadow(0 1px 1px rgba(0,0,0,.25))}
.evo-mito{border:1px solid var(--line);border-left:4px solid var(--bad);border-radius:12px;padding:11px 13px;background:var(--bg-2);display:flex;flex-direction:column;gap:7px}
.evo-mito h4{margin:0;font-size:.95rem;color:var(--bad)}
.evo-mito .evo-ok{border-left:3px solid var(--ok);padding-left:9px;font-size:.88rem}
.evo-mito .evo-ok b{color:var(--ok)}
.evo-limbs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.evo-limb{border:1px solid var(--line);border-radius:12px;background:var(--bg-2);padding:6px;text-align:center}
.evo-limb svg{width:100%;height:auto;display:block}
.evo-limb h4{margin:2px 0 0;font-size:.8rem}
.evo-limb p{margin:0;font-size:.68rem;color:var(--ink-3)}
.evo-h{stroke:rgba(0,0,0,.45);stroke-width:1.2;cursor:pointer}
.evo-h.on{stroke:var(--accent);stroke-width:2.6}
.evo-h.dim{opacity:.22}
.evo-strata{display:flex;flex-direction:column;gap:0;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.evo-stra{display:grid;grid-template-columns:78px 1fr;gap:10px;padding:9px 11px;align-items:center;border-bottom:1px solid var(--line);font-size:.83rem}
.evo-stra:last-child{border-bottom:0}
.evo-stra .evo-ma{font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.74rem;color:var(--ink-3);text-align:right}
.evo-cyt{display:flex;flex-direction:column;gap:6px}
.evo-cyt .evo-r{display:grid;grid-template-columns:minmax(96px,1fr) 3fr 54px;gap:8px;align-items:center;font-size:.82rem}
.evo-cyt .evo-t{height:13px;background:var(--bg-3);border:1px solid var(--line);border-radius:4px;overflow:hidden}
.evo-cyt .evo-t i{display:block;height:100%;background:var(--gen,var(--accent))}
.evo-cyt .evo-n{font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.74rem;text-align:right;color:var(--ink-2)}
.evo-runs{display:flex;flex-wrap:wrap;gap:6px;font-size:.72rem;font-family:var(--font-m,"IBM Plex Mono",monospace)}
.evo-runs span{border:1px solid var(--line);border-radius:999px;padding:2px 9px;background:var(--bg-3);color:var(--ink-2)}
@media(max-width:820px){.evo-limbs{grid-template-columns:repeat(2,1fr)}.evo-two{grid-template-columns:1fr}}
</style>
<script>
/* =====================================================================
   SELECCIÓN NATURAL Y EVOLUCIÓN
   Biología BGU · Unidad 4 "Genética y evolución"
   Ciencias Naturales EGB · 9.º CVT U1 "Herencia, evolución y diversidad"
   Ruta: #/explorar/evolucion
   Todo lo nuevo de este archivo lleva el prefijo evo- / evo / EVO_.
   ===================================================================== */
try { if (typeof BIO === 'object' && BIO && BIO.activities) Object.assign(BIO.activities, {
  'reto-evolucion': { t:'Reto: selección natural', unidad:null, peso:0, xp:140 }
}); } catch(e){ console.warn('evo activities', e); }
try { if (typeof ACT_HREF === 'object' && ACT_HREF) ACT_HREF['reto-evolucion'] = '#/explorar/evolucion'; } catch(e){}

/* ------------------------------------------------------------- formato */
const evoN = (v, d) => (typeof v === 'number' && isFinite(v) ? v : 0).toFixed(d === undefined ? 2 : d).replace('.', ',');
const evoPct = (v, d) => evoN(v*100, d === undefined ? 0 : d) + ' %';
const evoQuieto = () => !((typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion));

/* mezcla de dos colores hexadecimales, t de 0 a 1 */
function evoMix(a, b, t){
  const p = x => [parseInt(x.slice(1,3),16), parseInt(x.slice(3,5),16), parseInt(x.slice(5,7),16)];
  const A = p(a), B = p(b), k = clamp(t,0,1);
  return '#' + [0,1,2].map(i => Math.round(A[i]+(B[i]-A[i])*k).toString(16).padStart(2,'0')).join('');
}
/* el rasgo va de 0 (caparazón claro) a 1 (caparazón oscuro) */
const EVO_CLARO = '#EADCB4', EVO_OSCURO = '#241A11';
const evoColor = v => evoMix(EVO_CLARO, EVO_OSCURO, v);
const evoSuelo = tone => evoMix('#D8CAA2', '#221B14', tone);

/* --------------------------------------------- azar reproducible (PRNG) */
function evoRng(seed){
  let a = (seed >>> 0) || 1;
  return function(){ a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const evoSemilla = () => (Math.floor(Math.random()*1e9) + 7) >>> 0;

/* =====================================================================
   NÚCLEO DE LA SIMULACIÓN
   Rasgo poligénico: 5 genes, 2 alelos cada uno (claro = 0, oscuro = 1).
   El valor del rasgo es la suma de alelos oscuros / 10, más un pequeño
   efecto del ambiente (el mismo genotipo no da siempre el mismo tono).
   ===================================================================== */
const EVO_LOCI = 5;

function evoValor(ind){
  let s = 0; for (let i=0;i<EVO_LOCI;i++) s += ind.g[i][0] + ind.g[i][1];
  return clamp(s/(2*EVO_LOCI) + ind.e, 0, 1);
}
function evoNace(rng, p){
  const g = [];
  for (let i=0;i<EVO_LOCI;i++) g.push([rng()<p?1:0, rng()<p?1:0]);
  const ind = { g, e:(rng()+rng()+rng()-1.5)*0.07 };
  ind.v = evoValor(ind); return ind;
}
function evoPoblacion(n, p, rng){ const a = []; for (let i=0;i<n;i++) a.push(evoNace(rng, p)); return a; }

function evoCruce(a, b, rng, mu){
  const g = [];
  for (let i=0;i<EVO_LOCI;i++){
    let x = a.g[i][rng()<0.5?0:1], y = b.g[i][rng()<0.5?0:1];
    if (rng() < mu) x = 1-x;           /* mutación: cambia un alelo al azar */
    if (rng() < mu) y = 1-y;
    g.push([x,y]);
  }
  const ind = { g, e:(rng()+rng()+rng()-1.5)*0.07 };
  ind.v = evoValor(ind); return ind;
}
/* frecuencia del alelo "oscuro" en toda la población */
function evoFrec(pop){
  if (!pop.length) return 0;
  let s = 0; pop.forEach(i => { for (let k=0;k<EVO_LOCI;k++) s += i.g[k][0] + i.g[k][1]; });
  return s / (pop.length * 2 * EVO_LOCI);
}
/* frecuencia del alelo oscuro en UN solo gen de los cinco (para ver deriva) */
function evoFrecLocus(pop, k){
  if (!pop.length) return 0;
  let s = 0; pop.forEach(i => { s += i.g[k][0] + i.g[k][1]; });
  return s / (pop.length*2);
}
/* cuántos de los cinco genes han quedado fijados (ya no tienen variación) */
function evoFijados(pop){
  let n = 0;
  for (let k=0;k<EVO_LOCI;k++){ const f = evoFrecLocus(pop,k); if (f <= 0 || f >= 1) n++; }
  return n;
}
const evoMedia = pop => pop.length ? pop.reduce((s,i)=>s+i.v,0)/pop.length : 0;
function evoDesv(pop){
  if (pop.length < 2) return 0;
  const m = evoMedia(pop);
  return Math.sqrt(pop.reduce((s,i)=>s+(i.v-m)*(i.v-m),0)/pop.length);
}
function evoHist(pop, bins){
  const B = bins || 10, a = new Array(B).fill(0);
  pop.forEach(i => a[Math.min(B-1, Math.floor(i.v*B))]++);
  return a;
}

/* ---- ambiente → óptimos de camuflaje y fuerza de la presión ---- */
const EVO_FONDOS = {
  claro:   { n:'Arena clara',        tone:0.10, opt:[0.10], d:'Suelo de arena y roca clara.' },
  moteado: { n:'Suelo moteado',      tone:0.50, opt:[0.50], d:'Mezcla pareja de claro y oscuro: destaca quien se va a un extremo.' },
  oscuro:  { n:'Ceniza volcánica',   tone:0.90, opt:[0.90], d:'Suelo oscuro, como tras una erupción o un incendio.' },
  parches: { n:'Dos parches',        tone:0.50, opt:[0.12,0.88], d:'La mitad del terreno es arena clara y la otra mitad ceniza: se esconden bien los dos extremos, no el término medio.' }
};
const EVO_CLIMA = { calido:{ n:'Cálido', dz:-0.06 }, templado:{ n:'Templado', dz:0 }, frio:{ n:'Frío', dz:0.06 } };

function evoOptimos(cfg){
  const base = EVO_FONDOS[cfg.fondo].opt, dz = EVO_CLIMA[cfg.clima].dz;
  return base.map(o => clamp(o + dz, 0.02, 0.98));
}
/* supervivencia de un individuo: qué tan cerca está del óptimo más próximo */
function evoAptitud(v, optimos, s){
  if (s <= 0) return 1;
  const w = 0.55 - 0.40*s;                /* presión fuerte = ventana angosta */
  let best = 0;
  optimos.forEach(o => { const d = (v-o)/w; best = Math.max(best, Math.exp(-0.5*d*d)); });
  return clamp(0.04 + 0.96*best, 0.04, 1);
}
function evoTipo(cfg){
  if (cfg.s <= 0) return { k:'neutral', n:'Sin selección: solo deriva', d:'Nadie muere por su color. Si la frecuencia cambia, es azar.' };
  const o = evoOptimos(cfg);
  if (o.length > 1) return { k:'disruptiva', n:'Selección disruptiva', d:'Los dos extremos sobreviven mejor que el promedio, y además cada escarabajo se aparea dentro de su propio parche: la distribución se abre en dos.' };
  if (Math.abs(o[0]-0.5) < 0.12) return { k:'estabilizadora', n:'Selección estabilizadora', d:'Gana el término medio: la media casi no se mueve, pero la variación se reduce.' };
  return { k:'direccional', n:'Selección direccional', d:'El óptimo está en un extremo: la media se desplaza hacia ese lado generación tras generación.' };
}

/* ---- una generación completa: sobrevivir, reproducirse, morir ---- */
function evoGeneracion(pop, cfg, rng){
  const optimos = evoOptimos(cfg);
  pop.forEach(i => { i.w = evoAptitud(i.v, optimos, cfg.s); i.vive = rng() < i.w; });
  let vivos = pop.filter(i => i.vive);
  if (vivos.length < 2){ vivos = pop.slice().sort((a,b)=>b.w-a.w).slice(0, Math.max(2, Math.round(pop.length*0.1))); vivos.forEach(i => i.vive = true); }
  /* sorteo de un progenitor dentro de un grupo, proporcional a su aptitud */
  const sorteador = grupo => {
    const cum = []; let acc = 0; grupo.forEach(i => { acc += i.w || 1; cum.push(acc); });
    return () => { const x = rng()*acc; let lo = 0, hi = cum.length-1; while (lo < hi){ const m = (lo+hi)>>1; if (cum[m] < x) lo = m+1; else hi = m; } return grupo[lo]; };
  };
  /* Con dos óptimos, cada individuo vive y se aparea en su propio parche.
     Sin ese apareamiento por semejanza, la recombinación vuelve a mezclar
     los dos extremos cada generación y la población nunca se parte en dos. */
  let grupos;
  if (optimos.length > 1){
    const corte = (optimos[0]+optimos[1])/2;
    const A = vivos.filter(i => i.v <= corte), B = vivos.filter(i => i.v > corte);
    grupos = [A, B].filter(g => g.length >= 2);
    if (!grupos.length) grupos = [vivos];
  } else grupos = [vivos];
  const picks = grupos.map(g => ({ pick: sorteador(g), peso: g.reduce((s,i)=>s+(i.w||1),0) }));
  const pesoTot = picks.reduce((s,g)=>s+g.peso,0) || 1;
  const N = cfg.N, hijos = [];
  for (let k=0;k<N;k++){
    let x = rng()*pesoTot, gi = 0; while (gi < picks.length-1 && x > picks[gi].peso){ x -= picks[gi].peso; gi++; }
    const P = picks[gi].pick;
    const a = P(); let b = P(); let t = 0; while (b === a && t++ < 8) b = P();
    hijos.push(evoCruce(a, b, rng, cfg.mu));
  }
  return { hijos, vivos: vivos.length, muertos: pop.length - vivos.length };
}

/* ---- corrida completa: devuelve la serie por generación ---- */
function evoMedir(pop, g, extra){
  return Object.assign({ g, p:evoFrec(pop), p1:evoFrecLocus(pop,0), fij:evoFijados(pop),
    m:evoMedia(pop), sd:evoDesv(pop), n:pop.length }, extra||{});
}
function evoCorrida(cfg, gens, seed){
  const rng = evoRng(seed);
  let pop = evoPoblacion(cfg.N0 || cfg.N, cfg.p0 === undefined ? 0.5 : cfg.p0, rng);
  const serie = [evoMedir(pop, 0)];
  const pop0 = pop.slice();
  for (let g=1; g<=gens; g++){
    const c = typeof cfg.porGen === 'function' ? cfg.porGen(g, cfg) : cfg;
    const r = evoGeneracion(pop, c, rng);
    pop = r.hijos;
    serie.push(evoMedir(pop, g, { vivos:r.vivos }));
  }
  return { serie, pop, pop0 };
}

/* =====================================================================
   PIEZAS VISUALES REUTILIZABLES
   ===================================================================== */
/* histograma del rasgo, con doble codificación: altura + color de la barra */
function evoHistEl(pop, titulo, extra){
  const B = 10, hs = evoHist(pop, B), max = Math.max(1, ...hs);
  const barras = h('div',{class:'evo-hist',role:'img','aria-label':
    titulo + '. Reparto del rasgo en ' + B + ' tramos: ' + hs.map((c,i)=>`de ${evoN(i/B,1)} a ${evoN((i+1)/B,1)}: ${c}`).join('; ')});
  hs.forEach((c,i) => barras.append(h('div',{title:`${c} individuos con tono entre ${evoN(i/B,1)} y ${evoN((i+1)/B,1)}`},
    h('i',{style:`height:${Math.round(c/max*100)}%;background:${evoColor((i+0.5)/B)}`}))));
  return h('div',{class:'stack',style:'gap:4px'},
    h('span',{class:'eyebrow'}, titulo),
    barras,
    h('div',{class:'evo-histx'}, h('span',{},'claro 0,0'), h('span',{},'0,5'), h('span',{},'oscuro 1,0')),
    extra || null);
}
/* escarabajo en SVG para la fila de individuos: mismo dibujo que en el terreno */
function evoBichoSVG(v, out){
  const col = evoColor(v), osc = evoMix(col,'#000000',0.55), luz = evoMix(col,'#ffffff',0.38), som = evoMix(col,'#000000',0.3);
  const id = 'evo-bg-' + Math.round(v*1000);
  return `<svg viewBox="0 0 28 36" aria-hidden="true"><defs><radialGradient id="${id}" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="${luz}"/><stop offset=".6" stop-color="${col}"/><stop offset="1" stop-color="${som}"/></radialGradient></defs>
    <g${out ? ' opacity=".38" style="filter:grayscale(.85)"' : ''}><g stroke="#1E160F" stroke-width="1.3" stroke-linecap="round" opacity=".85"><path d="M8 15L3 12M8 20L2.5 20M8 25L3 29M20 15L25 12M20 20L25.5 20M20 25L25 29M12 6.5L9 2M16 6.5L19 2"/></g>
    <ellipse cx="14" cy="7.5" rx="3.6" ry="2.8" fill="${osc}"/><ellipse cx="14" cy="11" rx="6" ry="3.4" fill="${osc}"/>
    <ellipse cx="14" cy="22" rx="8.6" ry="11" fill="url(#${id})" stroke="rgba(0,0,0,.42)" stroke-width=".9"/>
    <path d="M14 12.5V32.5" stroke="rgba(0,0,0,.45)" stroke-width=".9"/><ellipse cx="10" cy="18" rx="1.8" ry="4" fill="#fff" opacity=".32"/></g>
    ${out ? '<path d="M5 9L23 33M23 9L5 33" stroke="#C8281E" stroke-width="2.2" stroke-linecap="round"/>' : ''}</svg>`;
}
/* fila de individuos en 2D (también sirve de alternativa sin WebGL) */
function evoBugsEl(pop, opts){
  const o = opts || {};
  const wrap = h('div',{class:'evo-bugs',role:'img','aria-label': o.aria || 'Población: cada figura es un individuo; el tono del caparazón es el rasgo que se hereda.'});
  pop.slice(0, o.max || 120).forEach(i => { const out = o.marcarMuertos && i.vive === false;
    wrap.append(h('span',{
    class:'evo-bug' + (out ? ' out' : ''),
    title:`Tono ${evoN(i.v)}${i.vive === false ? ' · no dejó descendencia' : ''}`, html:evoBichoSVG(i.v, out) })); });
  return wrap;
}
/* escarabajo visto desde arriba, en canvas: patas, antenas, cabeza, pronoto y élitros con volumen */
function evoBicho2D(x, cx, cy, rr, v){
  const col = evoColor(v), osc = evoMix(col,'#000000',0.55);
  x.save(); x.lineCap = 'round';
  x.strokeStyle = 'rgba(20,14,10,.8)'; x.lineWidth = Math.max(0.8, rr*0.1);
  [-0.35, 0.05, 0.45].forEach((dy, i) => [1,-1].forEach(s => { x.beginPath(); x.moveTo(cx + s*rr*0.45, cy + dy*rr); x.lineTo(cx + s*rr*1.0, cy + dy*rr + (i-1)*rr*0.35); x.stroke(); }));
  [1,-1].forEach(s => { x.beginPath(); x.moveTo(cx + s*rr*0.15, cy - rr*1.15); x.quadraticCurveTo(cx + s*rr*0.35, cy - rr*1.5, cx + s*rr*0.55, cy - rr*1.6); x.stroke(); });
  x.fillStyle = osc; x.beginPath(); x.ellipse(cx, cy - rr*1.08, rr*0.3, rr*0.24, 0, 0, 6.2832); x.fill();
  x.beginPath(); x.ellipse(cx, cy - rr*0.78, rr*0.5, rr*0.28, 0, 0, 6.2832); x.fill();
  const g = x.createRadialGradient(cx - rr*0.3, cy - rr*0.3, rr*0.1, cx, cy + rr*0.1, rr*1.1);
  g.addColorStop(0, evoMix(col,'#ffffff',0.35)); g.addColorStop(0.6, col); g.addColorStop(1, evoMix(col,'#000000',0.3));
  x.fillStyle = g; x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1;
  x.beginPath(); x.ellipse(cx, cy + rr*0.12, rr*0.72, rr*0.9, 0, 0, 6.2832); x.fill(); x.stroke();
  x.beginPath(); x.moveTo(cx, cy - rr*0.62); x.lineTo(cx, cy + rr*0.98); x.stroke();
  x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.ellipse(cx - rr*0.34, cy - rr*0.2, rr*0.16, rr*0.34, -0.2, 0, 6.2832); x.fill();
  x.restore();
}
/* lienzo 2D de la población sobre su fondo real (se ve el camuflaje) */
function evoPintaCampo(cv, pop, cfg){
  const W = cv.clientWidth || 600, H = 260;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = W*dpr; cv.height = H*dpr; cv.style.height = H+'px';
  const x = cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0);
  const F = EVO_FONDOS[cfg.fondo];
  if (cfg.fondo === 'parches'){ x.fillStyle = evoSuelo(0.10); x.fillRect(0,0,W/2,H); x.fillStyle = evoSuelo(0.90); x.fillRect(W/2,0,W/2,H); }
  else { x.fillStyle = evoSuelo(F.tone); x.fillRect(0,0,W,H); }
  const rng = evoRng(cfg.seedFondo || 12345);
  /* grava: guijarros con volumen (sombra abajo a la derecha, brillo arriba a la izquierda) */
  const tonoEn = px => cfg.fondo === 'parches' ? (px < W/2 ? 0.10 : 0.90) : F.tone;
  for (let i=0;i<Math.round(W*H/260);i++){
    const px = rng()*W, py = rng()*H, r = 1.4 + rng()*rng()*6.5, a = rng()*Math.PI, tb = tonoEn(px);
    const t = tb > 0.3 && tb < 0.7 ? (rng() < 0.5 ? 0.12 + rng()*0.18 : 0.72 + rng()*0.2) : clamp(tb + (rng()-0.5)*0.32, 0, 1);
    const base = evoSuelo(t);
    x.fillStyle = 'rgba(0,0,0,.26)'; x.beginPath(); x.ellipse(px + r*0.25, py + r*0.3, r, r*0.76, a, 0, 6.2832); x.fill();
    const g = x.createRadialGradient(px - r*0.35, py - r*0.38, r*0.1, px, py, r*1.1);
    g.addColorStop(0, evoMix(base,'#ffffff',0.3)); g.addColorStop(0.55, base); g.addColorStop(1, evoMix(base,'#000000',0.32));
    x.fillStyle = g; x.beginPath(); x.ellipse(px, py, r, r*0.74, a, 0, 6.2832); x.fill();
  }
  const n = Math.min(pop.length, 140), cols = Math.ceil(Math.sqrt(n*W/H)), filas = Math.ceil(n/cols);
  const cw = W/cols, ch = H/filas, r2 = evoRng((cfg.seedFondo||12345)+99);
  pop.slice(0,n).forEach((ind, k) => {
    const cx = (k%cols)*cw + cw/2 + (r2()-0.5)*cw*0.45;
    const cy = Math.floor(k/cols)*ch + ch/2 + (r2()-0.5)*ch*0.45;
    const rr = Math.max(4.5, Math.min(cw, ch)*0.30);
    x.globalAlpha = ind.vive === false ? 0.20 : 1;
    evoBicho2D(x, cx, cy, rr, ind.v);
    const puntos = Math.round(ind.v*5);          /* doble codificación: no solo color */
    x.fillStyle = ind.v > 0.5 ? 'rgba(255,255,255,.75)' : 'rgba(0,0,0,.6)';
    for (let d=0; d<puntos; d++){ x.beginPath(); x.arc(cx + (d%2?rr*0.36:-rr*0.36), cy - rr*0.3 + Math.floor(d/2)*rr*0.4, Math.max(1.1, rr*0.11), 0, 6.2832); x.fill(); }
    if (ind.vive === false){ x.globalAlpha = 0.85; x.strokeStyle = 'rgba(200,40,30,.9)'; x.lineWidth = 1.6;
      x.beginPath(); x.moveTo(cx-rr*0.8, cy-rr*0.8); x.lineTo(cx+rr*0.8, cy+rr*0.8); x.moveTo(cx+rr*0.8, cy-rr*0.8); x.lineTo(cx-rr*0.8, cy+rr*0.8); x.stroke(); }
    x.globalAlpha = 1;
  });
  cv.setAttribute('role','img');
  cv.setAttribute('aria-label', `Terreno ${F.n.toLowerCase()} con ${n} individuos. Tono medio ${evoN(evoMedia(pop))} de 1,00.`);
}

/* selector accesible de opciones (botones con aria-pressed) */
function evoSeg(label, ops, valor, onPick){
  const seg = h('div',{class:'evo-seg',role:'group','aria-label':label});
  const btns = {};
  ops.forEach(o => {
    const b = h('button',{ type:'button', 'aria-pressed':String(o.v===valor()), title:o.t||o.n,
      onclick:()=>{ onPick(o.v); Object.entries(btns).forEach(([k,e]) => e.setAttribute('aria-pressed', String(k===o.v))); } },
      o.c ? h('i',{style:`background:${o.c}`}) : null, o.n);
    btns[o.v] = b; seg.append(b);
  });
  return h('div',{class:'evo-grp'}, h('span',{class:'evo-lab'}, label), seg);
}
const evoNota = (cls, titulo, txt) => h('div',{class:'notice '+cls},
  h('span',{}, h('b',{}, titulo+' '), /<[a-z/]/i.test(txt) ? h('span',{html:txt}) : txt));

/* =====================================================================
   ESCENA 3D: un terreno y una población de escarabajos procedurales
   ===================================================================== */
/* v1.7 · textura de grava: guijarros con luz desde arriba a la izquierda, no simples manchas */
function evoTexSuelo(tone){
  const S = (typeof lowEnd === 'function' && lowEnd()) ? 256 : 512;
  const c = document.createElement('canvas'); c.width = c.height = S;
  const x = c.getContext('2d'), k = S/256;
  x.fillStyle = evoSuelo(tone); x.fillRect(0,0,S,S);
  const rng = evoRng(Math.round(tone*1000)+3);
  /* arenilla fina */
  for (let i=0;i<1400;i++){ x.globalAlpha = 0.05+rng()*0.12; x.fillStyle = rng()<0.5?'#000':'#fff'; x.fillRect(rng()*S, rng()*S, k*(0.6+rng()*1.2), k*(0.6+rng()*1.2)); }
  x.globalAlpha = 1;
  /* guijarros: en el suelo moteado se mezclan claros y oscuros; en los otros, variaciones del mismo tono */
  for (let i=0;i<520;i++){
    const px = rng()*S, py = rng()*S, r = k*(1.6 + rng()*rng()*7.5), a = rng()*Math.PI;
    const t = tone > 0.3 && tone < 0.7 ? (rng() < 0.5 ? 0.12 + rng()*0.18 : 0.72 + rng()*0.2) : clamp(tone + (rng()-0.5)*0.34, 0, 1);
    const base = evoSuelo(t);
    [[0,0],[S,0],[-S,0],[0,S],[0,-S]].forEach(([ox,oy]) => { const cx = px+ox, cy = py+oy; if (cx < -12*k || cx > S+12*k || cy < -12*k || cy > S+12*k) return;
      x.fillStyle = 'rgba(0,0,0,.28)'; x.beginPath(); x.ellipse(cx + r*0.22, cy + r*0.3, r*1.04, r*0.78, a, 0, 6.2832); x.fill();
      const g = x.createRadialGradient(cx - r*0.35, cy - r*0.4, r*0.1, cx, cy, r*1.1);
      g.addColorStop(0, evoMix(base, '#ffffff', 0.32)); g.addColorStop(0.55, base); g.addColorStop(1, evoMix(base, '#000000', 0.35));
      x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy, r, r*0.74, a, 0, 6.2832); x.fill(); });
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(5,5);
  t.encoding = THREE.sRGBEncoding;   /* r128: sin esto el suelo oscuro se ve gris claro */
  t.anisotropy = 4;
  return t;
}
/* r128 no gestiona color: hay que pasar los colores a espacio lineal a mano */
function evoCol3(hex){ const c = new THREE.Color(hex); return c.convertSRGBToLinear ? c.convertSRGBToLinear() : c; }
/* geometrías compartidas del escarabajo (se crean una vez por escena) */
function evoGeosEscarabajo(low){
  const seg = low ? [14,10] : [22,15];
  /* élitro: medio huevo, más ancho delante y afilado detrás, con el borde interior recto (la sutura) */
  const eli = new THREE.SphereGeometry(1, seg[0], seg[1]);
  const p = eli.attributes.position;
  for (let i=0;i<p.count;i++){ let X = p.getX(i), Y = p.getY(i), Z = p.getZ(i);
    const ancho = 1 - 0.3*Math.max(0, -Z)*Math.max(0, -Z);   /* se estrecha hacia atrás, con el borde interior (X = -1) recto */
    X = -1 + (X + 1)*ancho; if (Y < -0.2) Y = -0.2 + (Y + 0.2)*0.25;  /* panza casi plana */
    p.setXYZ(i, X, Y, Z); }
  eli.computeVertexNormals();
  /* patas (fémur + tibia), antenas y ojos: una sola geometría oscura para todos */
  const partes = [], V = (a) => new THREE.Vector3(a[0], a[1], a[2]);
  const cil = (a, b, r) => { const A = V(a), B = V(b), d = new THREE.Vector3().subVectors(B, A), L = d.length();
    const g = new THREE.CylinderGeometry(r*0.8, r, L, low ? 4 : 6, 1);
    g.applyMatrix4(new THREE.Matrix4().compose(A.clone().addScaledVector(d, 0.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), d.normalize()), new THREE.Vector3(1,1,1)));
    return g; };
  [[0.36, 1],[0.1, 1],[-0.2, 1]].forEach(([z]) => [1,-1].forEach(s => {
    const hip = [s*0.22, -0.1, z], knee = [s*0.42, 0.0, z + (z > 0.2 ? 0.1 : z < 0 ? -0.08 : 0)], foot = [s*0.52, -0.2, z + (z > 0.2 ? 0.2 : z < 0 ? -0.2 : 0.02)];
    partes.push(cil(hip, knee, 0.03), cil(knee, foot, 0.022)); }));
  [1,-1].forEach(s => { partes.push(cil([s*0.07, 0.0, 0.72], [s*0.2, 0.08, 0.9], 0.016), cil([s*0.2, 0.08, 0.9], [s*0.3, 0.1, 1.05], 0.014));
    const ojo = new THREE.SphereGeometry(0.045, 8, 6); ojo.translate(s*0.13, 0.0, 0.7); partes.push(ojo); });
  const oscuro = Kit.merge(partes);
  return { eli, cabeza:new THREE.SphereGeometry(1, low ? 12 : 16, low ? 9 : 12), oscuro };
}
/* escarabajo: dos élitros que dejan ver la sutura central, pronoto, cabeza, seis patas y antenas */
function evoEscarabajo(geos, v, mPatas){
  const col = evoColor(v);
  const mEli = mat(evoCol3(col), { roughness:0.42, clearcoat:0.65, clearcoatRoughness:0.28, envMapIntensity:0.55 });
  const mOsc = mat(evoCol3(evoMix(col,'#000000',0.55)), { roughness:0.5, clearcoat:0.4, clearcoatRoughness:0.35, envMapIntensity:0.45 });
  const eliL = new THREE.Mesh(geos.eli, mEli); eliL.scale.set(-0.21, 0.2, 0.5); eliL.position.set(-0.205, 0.04, -0.06);
  const eliR = new THREE.Mesh(geos.eli, mEli); eliR.scale.set(0.21, 0.2, 0.5); eliR.position.set( 0.205, 0.04, -0.06);
  const pron = new THREE.Mesh(geos.cabeza, mOsc); pron.scale.set(0.3, 0.15, 0.16); pron.position.set(0, -0.0, 0.47);
  const cab  = new THREE.Mesh(geos.cabeza, mOsc); cab.scale.set(0.17, 0.11, 0.13); cab.position.set(0, -0.04, 0.66);
  const pat  = new THREE.Mesh(geos.oscuro, mPatas);
  const g = new THREE.Group(); g.add(eliL, eliR, pron, cab, pat); g.scale.setScalar(0.86);
  g.userData.claros = [mEli]; g.userData.oscuros = [mOsc];
  return g;
}
function evoEscena(stage, pop, tone){
  const E = new Engine3D(stage, {
    radius:10.2, phi:0.9, theta:0.42, minR:5, maxR:20, target:[0,0,0.35], exposure:0.95,
    aria:'Terreno con una población de escarabajos. Cada uno tiene su propio tono de caparazón. Arrastra para girar, rueda para acercar; las flechas del teclado también giran.'
  });
  const low = E.low;
  const geos = evoGeosEscarabajo(low);
  const mPatas = mat(evoCol3('#1C140E'), { roughness:0.55, clearcoat:0.3, envMapIntensity:0.35 });
  const tex = { 0:evoTexSuelo(0.10), 1:evoTexSuelo(0.50), 2:evoTexSuelo(0.90) };
  const suelo = new THREE.Mesh(new THREE.PlaneGeometry(40,40,1,1),
    new THREE.MeshStandardMaterial({ map:tex[1], roughness:0.96, metalness:0, envMapIntensity:0.4 }));
  suelo.rotation.x = -Math.PI/2; suelo.position.y = -0.18;
  E.scene.add(suelo);
  /* horizonte: la grava se funde con el fondo del escenario en lugar de terminar en un borde */
  const fondo = new THREE.Color(cssVar('--bg-2') || '#EEF1F5');
  E.scene.fog = new THREE.Fog(fondo, 14, 27);
  const grupos = [];
  const rng = evoRng(4242), n = pop.length, cols = Math.ceil(Math.sqrt(n)), sitios = [];
  pop.forEach((ind, i) => {
    const g = evoEscarabajo(geos, ind.v, mPatas);
    const gx = (i%cols - (cols-1)/2) * 1.55 + (rng()-0.5)*0.5;
    const gz = (Math.floor(i/cols) - (Math.ceil(n/cols)-1)/2) * 1.55 + (rng()-0.5)*0.5;
    g.position.set(gx, 0.06, gz); g.rotation.y = rng()*6.2832;
    g.userData.fase = rng()*6.2832; g.userData.base = g.position.clone();
    E.scene.add(g); grupos.push(g); sitios.push([gx, gz]);
  });
  /* guijarros en relieve alrededor de los escarabajos (una sola malla instanciada) */
  const gg = new THREE.IcosahedronGeometry(1, low ? 0 : 1), gp = gg.attributes.position, rr = evoRng(77);
  for (let i=0;i<gp.count;i++){ const f = 0.82 + 0.3*Kit.fbm(gp.getX(i)*1.7+3, gp.getY(i)*1.7, gp.getZ(i)*1.7, 2); gp.setXYZ(i, gp.getX(i)*f, gp.getY(i)*f*0.62, gp.getZ(i)*f); }
  gg.computeVertexNormals();
  const NG = low ? 260 : 620;
  const piedras = new THREE.InstancedMesh(gg, new THREE.MeshStandardMaterial({ color:0xffffff, roughness:0.82, metalness:0, envMapIntensity:0.45 }), NG);
  const dum = new THREE.Object3D(), tonos = []; let k = 0;
  for (let t=0; t<NG*4 && k<NG; t++){
    const x = (rr()-0.5)*13, z = (rr()-0.5)*13;
    if (sitios.some(([sx,sz]) => Math.hypot(sx-x, sz-z) < 0.62)) continue;
    const s = 0.05 + rr()*rr()*0.2;
    dum.position.set(x, -0.18 + s*0.28, z); dum.rotation.set(rr()*0.4, rr()*6.28, rr()*0.4); dum.scale.set(s*(0.8+rr()*0.5), s, s*(0.8+rr()*0.5));
    dum.updateMatrix(); piedras.setMatrixAt(k, dum.matrix); tonos.push([rr(), rr()]); k++;
  }
  piedras.count = k; E.scene.add(piedras);
  const tinta = (tn) => { const c = new THREE.Color();
    for (let i=0;i<k;i++){ const [u, w] = tonos[i];
      const t = tn > 0.3 && tn < 0.7 ? (u < 0.5 ? 0.1 + w*0.2 : 0.72 + w*0.22) : clamp(tn + (u-0.5)*0.34, 0, 1);
      c.copy(evoCol3(evoSuelo(t))); piedras.setColorAt(i, c); }
    if (piedras.instanceColor) piedras.instanceColor.needsUpdate = true; };
  E.onFrame((t) => {
    if (evoQuieto()) return;
    grupos.forEach((g,i) => { if (!g.visible) return;
      g.position.y = g.userData.base.y + Math.sin(t*1.4 + g.userData.fase)*0.02;
      g.rotation.y += 0.0015*Math.sin(t*0.5 + i); });
  });
  const api = {
    E, grupos,
    setTone(tn){ const k2 = tn < 0.3 ? 0 : tn > 0.7 ? 2 : 1; suelo.material.map = tex[k2]; suelo.material.needsUpdate = true; tinta(tn); },
    setPop(p){ grupos.forEach((g,i) => { const ind = p[i];
        if (!ind){ g.visible = false; return; }
        g.visible = true;
        const col = evoColor(ind.v);
        g.userData.claros.forEach(m => m.color.copy(evoCol3(col)));
        g.userData.oscuros.forEach(m => m.color.copy(evoCol3(evoMix(col,'#000000',0.55)))); }); },
    mostrarVivos(p){ grupos.forEach((g,i) => { g.visible = !p[i] || p[i].vive !== false; }); },
    dispose(){ try { Object.values(tex).forEach(t => t.dispose()); } catch(e){} try { E.dispose(); } catch(e){} }
  };
  api.setTone(tone === undefined ? 0.5 : tone);
  return api;
}

/* =====================================================================
   DATOS REALES
   ===================================================================== */
/* Pinzón de tierra mediano (Geospiza fortis), isla Daphne Major, Galápagos.
   Profundidad media del pico en milímetros. Valores aproximados publicados
   por Peter y Rosemary Grant. 1977: gran sequía. 1983: El Niño muy lluvioso. */
const EVO_PINZONES = [
  { y:1973, pico:9.42, nota:'Año normal. Semillas de todos los tamaños.' },
  { y:1975, pico:9.35, nota:'Año húmedo: abundan las semillas pequeñas y blandas.' },
  { y:1976, pico:9.42, nota:'Antes de la sequía. Población grande (≈1 200 aves).' },
  { y:1978, pico:10.08, nota:'Después de la sequía de 1977: sobrevivió menos del 15 % y casi todos eran de pico grande.' },
  { y:1980, pico:9.96, nota:'Se mantiene el pico grande: siguen escaseando las semillas blandas.' },
  { y:1982, pico:9.90, nota:'Años intermedios.' },
  { y:1984, pico:9.70, nota:'Tras El Niño de 1983: lluvia, semillas pequeñas y blandas otra vez.' },
  { y:1987, pico:9.66, nota:'La media vuelve a bajar: la selección cambió de sentido con el ambiente.' }
];
/* dureza media del alimento disponible (índice de Grant), misma isla */
const EVO_SEMILLAS = [
  { y:1976, d:5.1 }, { y:1977, d:6.0 }, { y:1978, d:5.9 }, { y:1980, d:5.6 },
  { y:1982, d:5.4 }, { y:1984, d:4.6 }, { y:1987, d:4.8 }
];
/* Citocromo c: número de aminoácidos distintos respecto al humano (de 104) */
const EVO_CITO = [
  { n:'Chimpancé', d:0 }, { n:'Mono rhesus', d:1 }, { n:'Perro', d:11 }, { n:'Caballo', d:12 },
  { n:'Gallina', d:13 }, { n:'Rana toro', d:18 }, { n:'Atún', d:21 }, { n:'Levadura', d:44 }
];
/* Registro fósil: el tránsito de mamífero terrestre a ballena */
const EVO_FOSILES = [
  { ma:'50 Ma', n:'Pakicetus', d:'Mamífero terrestre con oído interno idéntico al de las ballenas actuales. Patas completas.' },
  { ma:'49 Ma', n:'Ambulocetus', d:'Anfibio: patas cortas y potentes, cola gruesa. Caminaba y nadaba.' },
  { ma:'47 Ma', n:'Rodhocetus', d:'Patas traseras reducidas, columna flexible, ya casi solo acuático.' },
  { ma:'38 Ma', n:'Basilosaurus', d:'Totalmente acuático, con patas traseras diminutas e inútiles.' },
  { ma:'Hoy',   n:'Ballena jorobada', d:'Aleta con húmero, radio, cúbito y falanges dentro; restos de pelvis flotando en el músculo.' }
];
/* Extremidades anteriores: mismos huesos, funciones distintas (homología) */
const EVO_HUESOS = { hum:{ n:'Húmero', c:'#D8452F' }, rad:{ n:'Radio', c:'#E0891A' }, cub:{ n:'Cúbito', c:'#2E9E5B' }, car:{ n:'Carpianos', c:'#2E6BD8' }, fal:{ n:'Metacarpianos y falanges', c:'#8E5BD0' } };
const EVO_EXTREM = [
  { id:'humano', n:'Brazo humano', f:'Agarrar y manipular', hum:58, ante:52, aw:7, hw:10, car:3,
    ded:[{a:-58,l:[15,11,8],w:5},{a:-26,l:[21,15,11],w:5},{a:-8,l:[23,16,12],w:5},{a:10,l:[21,15,11],w:5},{a:28,l:[16,11,8],w:5}] },
  { id:'ballena', n:'Aleta de ballena', f:'Dirigir el nado', hum:26, ante:30, aw:9, hw:14, car:5,
    ded:[{a:-30,l:[14,12,10,9],w:7},{a:-12,l:[16,14,12,10,9],w:7},{a:4,l:[15,13,11,9,8],w:7},{a:20,l:[12,10,8],w:6}] },
  { id:'murcielago', n:'Ala de murciélago', f:'Volar batiendo', hum:38, ante:62, aw:4, hw:7, car:3,
    ded:[{a:-70,l:[12,9,6],w:4},{a:-34,l:[58,44,24],w:3},{a:-10,l:[62,47,26],w:3},{a:14,l:[57,42,22],w:3},{a:38,l:[48,36,18],w:3}] },
  { id:'ave', n:'Ala de ave', f:'Volar batiendo', hum:42, ante:46, aw:5, hw:8, car:6,
    ded:[{a:-34,l:[10,8],w:4},{a:-6,l:[26,18],w:5},{a:22,l:[12],w:4}] }
];

function evoExtremidadSVG(sp){
  const W = 150, H = 250, P = 8, out = [];
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  const caja = (px,py,r) => { x0 = Math.min(x0,px-r); x1 = Math.max(x1,px+r); y0 = Math.min(y0,py-r); y1 = Math.max(y1,py+r); };
  const R = (x,y,a,len,w,tipo) => {
    const g = EVO_HUESOS[tipo];
    out.push(`<rect class="evo-h" data-h="${tipo}" x="${(-w/2).toFixed(1)}" y="${(-w*0.2).toFixed(1)}" width="${w.toFixed(1)}" height="${(len+w*0.4).toFixed(1)}" rx="${(w/2).toFixed(1)}" fill="${g.c}" transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${a})"><title>${g.n} · ${sp.n}</title></rect>`);
    const r = a*Math.PI/180, ex = x - len*Math.sin(r), ey = y + len*Math.cos(r);
    caja(x,y,w*0.7); caja(ex,ey,w*0.7);
    return [ex, ey];
  };
  let x = 0, y = 0;
  [x,y] = R(x, y, 0, sp.hum, sp.hw, 'hum');                        /* húmero */
  R(x - sp.aw*1.05, y, -5, sp.ante, sp.aw, 'rad');                 /* radio */
  const fin = R(x + sp.aw*1.05, y, 5, sp.ante, sp.aw, 'cub');      /* cúbito */
  const cx = x, cyE = fin[1] + sp.car*0.5, rx = sp.aw*1.9;
  out.push(`<ellipse class="evo-h" data-h="car" cx="${cx.toFixed(1)}" cy="${cyE.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${sp.car.toFixed(1)}" fill="${EVO_HUESOS.car.c}"><title>Carpianos · ${sp.n}</title></ellipse>`);
  caja(cx, cyE, Math.max(rx, sp.car));
  const cy = cyE + sp.car;
  sp.ded.forEach(d => {
    let px = cx + (d.a/90)*rx*0.55, py = cy;
    d.l.forEach((len,i) => { const q = R(px, py, d.a, len, Math.max(2.2, d.w*(1-i*0.11)), 'fal'); px = q[0]; py = q[1] + 1.0; });
  });
  const w = Math.max(1, x1-x0), hh = Math.max(1, y1-y0);
  const k = Math.min((W-2*P)/w, (H-2*P)/hh);
  const tx = P + ((W-2*P) - w*k)/2 - x0*k, ty = P - y0*k;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${sp.n}: húmero, radio, cúbito, carpianos y falanges, con la misma disposición que en las demás especies">
    <g transform="translate(${tx.toFixed(1)},${ty.toFixed(1)}) scale(${k.toFixed(3)})">${out.join('')}</g></svg>`;
}

/* preguntas del reto final: se responden mirando lo que pasó, no memorizando */
const EVO_PREGUNTAS = [
  { q:'En el simulador pusiste fondo oscuro y depredador fuerte. La media del rasgo subió de 0,50 a 0,82 en 25 generaciones. ¿Qué les pasó a los escarabajos claros que existían al inicio?',
    ops:['Se fueron oscureciendo poco a poco a lo largo de su vida para camuflarse.',
         'Siguieron siendo claros toda su vida; simplemente fueron comidos más a menudo y dejaron menos descendencia.',
         'Se convirtieron en otra especie distinta dentro de la misma generación.',
         'Sus genes detectaron el suelo oscuro y produjeron la mutación necesaria.'],
    ok:1, fb:'Ningún individuo cambió de tono. Lo que cambió fue la proporción: los claros dejaron menos hijos y su versión del gen se volvió rara. La evolución le ocurre a la población, no al individuo.',
    wrong:['Eso sería un cambio dentro de la vida del individuo (como broncearse) y no se hereda. En la simulación el tono de cada escarabajo queda fijo al nacer: revisa la sección 1.',
           'Una especie nueva necesita aislamiento reproductivo y muchísimas generaciones. Aquí solo cambió la frecuencia de un rasgo dentro de la misma especie.',
           'Las mutaciones ocurren al azar, antes y con independencia del ambiente. El ambiente no las encarga: solo filtra las que ya existen.'] },

  { q:'Corriste tres veces el mismo escenario sin depredador y con poblaciones de 8 individuos. Las tres curvas de frecuencia terminaron en sitios distintos (0,00 · 0,48 · 1,00). ¿Cuál es la lectura correcta?',
    ops:['La simulación tiene un error: sin selección la frecuencia debería quedarse en 0,50.',
         'Hubo selección escondida que actuó de forma distinta cada vez.',
         'Es deriva genética: con pocos individuos, el azar del muestreo de gametos mueve la frecuencia sin que nadie sobreviva mejor.',
         'Las tres poblaciones se adaptaron a tres ambientes diferentes.'],
    ok:2, fb:'Esa es la firma de la deriva: resultado impredecible, distinto en cada corrida, y más violento cuanto menor es la población. Con 250 individuos las curvas se quedan pegadas a 0,50.',
    wrong:['Sin selección la frecuencia se mantiene en 0,50 solo en promedio y con población infinita. En una población real y pequeña, cada generación es una muestra al azar.',
           'La aptitud estaba puesta en cero: comprobaste que sin depredador todos los tonos sobreviven igual. No había ninguna presión.',
           'El ambiente era idéntico en las tres corridas. Lo único que cambió fue la semilla del azar.'] },

  { q:'Un histograma pasa de una campana centrada en 0,50 a dos montones, uno cerca de 0,15 y otro cerca de 0,85, con casi nadie en el medio. ¿Qué tipo de selección lo produce y con qué ambiente lo provocaste?',
    ops:['Estabilizadora, con suelo moteado.','Direccional, con ceniza volcánica.','Disruptiva, con el terreno de dos parches.','Deriva, con población pequeña.'],
    ok:2, fb:'Con dos parches hay dos óptimos: el claro se esconde en la arena y el oscuro en la ceniza. El tono intermedio no se camufla en ninguna parte y es el que más se pierde.',
    wrong:['La estabilizadora hace lo contrario: estrecha la campana alrededor del medio y elimina los extremos.',
           'La direccional corre la campana entera hacia un lado, pero sigue siendo una sola campana.',
           'La deriva mueve la frecuencia al azar, sin partir la distribución en dos montones ordenados.'] },

  { q:'Tras la sequía de 1977 en Daphne Major, el pico medio de Geospiza fortis subió de 9,4 a 10,1 mm; después de El Niño de 1983 volvió a bajar a 9,7 mm. ¿Qué demuestra ese vaivén?',
    ops:['Que la evolución avanza hacia formas cada vez más perfectas y a veces retrocede por error.',
         'Que la selección natural no tiene una meta: sigue al ambiente, y si el ambiente cambia de sentido, el rasgo también.',
         'Que los pinzones aprendieron a usar semillas distintas y enseñaron el truco a sus crías.',
         'Que los datos de 1983 estaban mal tomados.'],
    ok:1, fb:'En la sequía solo quedaron semillas grandes y duras, y ganó el pico grande. Con las lluvias volvieron las semillas pequeñas y blandas, y la ventaja cambió de bando. No hay progreso: hay ajuste a lo que hay.',
    wrong:['No existe una escala de perfección. Un pico grande es una ventaja en sequía y una desventaja cuando abundan las semillas blandas.',
           'El pico es una característica anatómica heredada, no una conducta que se enseñe. Los Grant midieron picos de padres e hijos y comprobaron que se hereda.',
           'Son medidas de miles de aves anilladas una por una durante cuarenta años: es uno de los conjuntos de datos mejor documentados de la biología.'] },

  { q:'El ala de un murciélago y el ala de una mosca sirven las dos para volar, pero solo una comparte húmero, radio, cúbito y falanges con tu brazo. ¿Cómo se llama cada relación?',
    ops:['Las dos son homologías, porque cumplen la misma función.',
         'El ala del murciélago es homóloga a tu brazo (mismo origen); el ala de la mosca es análoga (misma función, origen distinto).',
         'Las dos son analogías, porque las dos vuelan.',
         'El ala de la mosca es homóloga porque es más antigua.'],
    ok:1, fb:'La homología se reconoce por la estructura y el origen compartido, no por lo que hace. Por eso el ala del murciélago, la aleta de la ballena y tu brazo tienen los mismos huesos en el mismo orden aunque hagan cosas distintas.',
    wrong:['La función igual no crea homología: eso es justamente lo que define una analogía.',
           'Si fueran las dos analogías, el murciélago no tendría tus mismos huesos en el mismo orden. Míralo en los esquemas de la sección 5.',
           'La antigüedad no define nada aquí: el ala de la mosca no tiene huesos, está hecha de quitina y nació de un origen completamente distinto.'] },

  { q:'Una población de 200 escarabajos cae a 6 individuos por una erupción y luego se recupera hasta 200. Comparas el histograma de antes con el de después. ¿Qué esperas ver y por qué?',
    ops:['La misma campana: al recuperarse el número, se recupera la variación.',
         'Una campana más angosta y corrida al azar: los 6 supervivientes llevaban solo una parte de los alelos, y la población nueva sale toda de ellos.',
         'Una campana más ancha, porque la población tuvo que adaptarse rápido.',
         'Dos montones separados, como en la selección disruptiva.'],
    ok:1, fb:'Es el cuello de botella: se pierde variación de golpe y por azar, sin que nadie sobreviviera mejor. Recuperar el número es rápido; recuperar la variación necesita muchísimas generaciones de mutación.',
    wrong:['El número se recupera, pero los alelos que no pasaron por el cuello ya no están. La descendencia solo puede copiar lo que quedó.',
           'La variación no aumenta porque haga falta. La única fuente nueva de variación es la mutación, y es lenta.',
           'Dos montones exigen dos óptimos que favorezcan los extremos. Aquí no hubo ninguna presión: solo azar.'] }
];

/* =====================================================================
   VISTA PRINCIPAL
   ===================================================================== */
function evoVista(view){
  view.classList.add('wide');
  const SEC = [
    { id:'variacion', n:'1 · La variación ya estaba' },
    { id:'simulador', n:'2 · Simulador de selección' },
    { id:'tipos',     n:'3 · Los tres tipos' },
    { id:'deriva',    n:'4 · Deriva y cuello de botella' },
    { id:'pruebas',   n:'5 · Evidencias' },
    { id:'errores',   n:'6 · Errores frecuentes' },
    { id:'reto',      n:'7 · Reto final' }
  ];
  const St = {
    sec:0, paso:0, seedVar:evoSemilla(),
    cfg:{ fondo:'oscuro', s:0.7, clima:'templado', recurso:'normal', N:120, mu:0.0015, seedFondo:777 },
    gen:0, pop:null, serie:[], previas:[], rng:null, seed:evoSemilla(),
    popIni:null, corridas:0,
    marcas:{ variacion:false, simulador:false, direccional:false, estabilizadora:false, disruptiva:false, deriva:false, botella:false, homologia:false, pinzones:false },
    start:Date.now()
  };
  const hecho0 = !!(Store.s.activities['reto-evolucion'] && Store.s.activities['reto-evolucion'].done);

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{},
      h('span',{class:'eyebrow gen'},'Genética y evolución · BGU U4 · 9.º EGB CVT U1'),
      h('h1',{},'Selección natural: cómo cambia una población sin que cambie ningún individuo'),
      h('p',{},'Aquí no se memoriza la definición de selección natural: se la hace ocurrir. Cambias el suelo, sueltas o retiras al depredador, achicas la población, y miras qué le pasa a la distribución del rasgo generación tras generación.')),
    h('span',{class:'pill gen'},'+140 XP · 45–60 min')));

  const retoSt = h('div',{class:'notice'+(hecho0?' ok':'')},
    hecho0 ? 'Reto resuelto ✓ · puedes volver a recorrer todas las secciones.' : 'Pendiente: llega a la sección 7 y responde las seis preguntas.');
  view.append(purposeBanner({
    proposito:'Explicar el cambio evolutivo como un cambio en las frecuencias de una población a lo largo de generaciones, distinguir la selección natural de la deriva genética y leer en datos reales —los pinzones de Galápagos— cómo el ambiente decide qué variantes dejan descendencia.',
    observa:[
      'Que la variación existe ANTES de que aparezca la presión: el ambiente no la fabrica, solo la filtra',
      'Que ningún escarabajo cambia de color: lo que cambia es cuántos hay de cada tono',
      'Que dos corridas con el mismo ambiente no dan el mismo resultado, sobre todo si la población es pequeña',
      'Que la media del pico de los pinzones sube con la sequía y vuelve a bajar con El Niño: no hay una meta'
    ],
    reto:'Provoca las tres formas de selección desde el simulador, distingue una corrida con deriva de una con selección, y cierra con las seis preguntas del reto final.',
    statusEl: retoSt }));

  const nav = h('nav',{class:'evo-nav','aria-label':'Secciones del recurso'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);
  let Esc = null;   /* escena 3D viva; se libera al cambiar de sección */

  function soltar(){ if (Esc){ try { Esc.dispose(); } catch(e){ console.warn(e); } Esc = null; } }
  function renderNav(){
    nav.innerHTML = '';
    SEC.forEach((s,i) => nav.append(h('button',{ type:'button', 'aria-current':String(i===St.sec), onclick:()=>{ St.sec = i; render(); } }, s.n)));
  }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:8px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec = Math.max(0, St.sec-1); render(); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec = Math.min(SEC.length-1, St.sec+1); render(); }},'Siguiente →'));
  }

  /* =================================================================
     1 · LA VARIACIÓN YA ESTABA
     ================================================================= */
  function secVariacion(){
    const N = 25;
    let rng = evoRng(St.seedVar);
    let pop = evoPoblacion(N, 0.5, rng);
    let fondo = 0.5, fase = 0;   /* 0 neutro · 1 fondo oscuro · 2 depredador · 3 hijos */

    const stage = h('div',{class:'stage evo-stage'});
    const panel = h('div',{class:'panel stack'});
    const hist = h('div',{});
    const lectura = h('div',{class:'stack',style:'gap:6px'});
    const alt2d = h('div',{});

    function pintarHist(){
      hist.innerHTML = '';
      const sup = fase === 2;
      const vivos = sup ? pop.filter(i => i.vive !== false) : pop;
      hist.append(evoHistEl(vivos, sup ? 'Reparto del rasgo entre los que sobrevivieron'
        : fase === 3 ? 'Reparto del rasgo en la nueva generación' : 'Reparto del rasgo en la población',
        h('dl',{class:'evo-kv'},
          h('dt',{},'Individuos'), h('dd',{}, String(vivos.length) + (sup ? ' de '+pop.length : '')),
          h('dt',{},'Tono medio'), h('dd',{}, evoN(evoMedia(vivos))),
          h('dt',{},'Variación (desviación)'), h('dd',{}, evoN(evoDesv(vivos))),
          h('dt',{},'Frecuencia del alelo oscuro'), h('dd',{}, evoPct(evoFrec(vivos),1)))));
      alt2d.innerHTML = '';
      alt2d.append(evoBugsEl(pop, { marcarMuertos:true, aria:'Los 25 individuos de la población, uno por figura. El tono del caparazón es el rasgo heredado.' }));
    }
    function pintarLectura(){
      lectura.innerHTML = '';
      if (fase === 0) lectura.append(
        evoNota('info','Mira antes de tocar nada.','Estos 25 escarabajos nacieron de padres al azar en un suelo neutro. No hay depredador, no hay presión, no hay "necesidad" de nada. Y aun así <b>no hay dos iguales</b>: cada uno heredó una combinación distinta de los cinco genes que fijan el tono.'),
        h('p',{class:'small muted'},'De dónde sale esa variación: mutaciones antiguas que ocurrieron al azar, más la recombinación que baraja los alelos de los padres en cada gameto.'));
      else if (fase === 1) lectura.append(
        evoNota('warn','Cambió el suelo, no los escarabajos.','El terreno ahora es ceniza volcánica. Compara las dos cifras: el tono medio y la variación son <b>exactamente los mismos</b> que antes. Ningún individuo se oscureció al ver el suelo oscuro. Lo único que cambió es quién se ve y quién no.'));
      else if (fase === 2) lectura.append(
        evoNota('bad','Pasó el depredador.','Los tachados no dejaron descendencia. Fíjate bien: <b>son los mismos individuos claros que ya estaban ahí desde el inicio</b>. No apareció ningún escarabajo nuevo ni nadie cambió de color. La media del grupo subió porque se quedaron los que ya eran oscuros.'),
        h('p',{class:'small muted'},'Esta es la idea que más se confunde en el examen: la presión del ambiente no crea variantes, solo elige entre las que ya existían.'));
      else lectura.append(
        evoNota('ok','La siguiente generación.','Los supervivientes se cruzaron. Sus hijos vuelven a ser todos distintos entre sí —la recombinación y las mutaciones siguen generando variación—, pero la campana entera está corrida hacia lo oscuro. <b>Eso es evolución: un cambio en la población, no en el individuo.</b>'));
    }
    function pintar(){
      pintarHist(); pintarLectura();
      if (Esc){ Esc.setTone(fondo); Esc.setPop(pop); Esc.mostrarVivos(fase === 2 ? pop : pop.map(()=>({ vive:true }))); }
    }

    const btnFondo = h('button',{class:'btn', onclick:()=>{ if (fase >= 1) return; fase = 1; fondo = 0.9; pintar(); actualizarBotones(); }},'1 · Oscurecer el suelo');
    const btnDep = h('button',{class:'btn', onclick:()=>{ if (fase < 1 || fase >= 2) return; fase = 2;
      const optimos = [0.9];
      pop.forEach(i => { i.w = evoAptitud(i.v, optimos, 0.8); i.vive = rng() < i.w; });
      if (pop.filter(i=>i.vive).length < 3) pop.slice().sort((a,b)=>b.w-a.w).slice(0,3).forEach(i => i.vive = true);
      St.marcas.variacion = true; pintar(); actualizarBotones(); }},'2 · Soltar al depredador');
    const btnHijos = h('button',{class:'btn primary', onclick:()=>{ if (fase < 2 || fase >= 3) return; fase = 3;
      const vivos = pop.filter(i => i.vive);
      const hijos = []; for (let k=0;k<N;k++){ const a = vivos[Math.floor(rng()*vivos.length)], b = vivos[Math.floor(rng()*vivos.length)]; hijos.push(evoCruce(a,b,rng,0.0015)); }
      pop = hijos; pintar(); actualizarBotones(); }},'3 · Ver la siguiente generación');
    const btnOtra = h('button',{class:'btn ghost sm', onclick:()=>{ St.seedVar = evoSemilla(); rng = evoRng(St.seedVar); pop = evoPoblacion(N, 0.5, rng); fase = 0; fondo = 0.5; pintar(); actualizarBotones(); }},'Generar otra población');
    function actualizarBotones(){
      btnFondo.disabled = fase >= 1; btnDep.disabled = fase !== 1; btnHijos.disabled = fase !== 2;
      [btnFondo,btnDep,btnHijos].forEach(b => b.classList.toggle('primary', !b.disabled && b === (fase===0?btnFondo:fase===1?btnDep:btnHijos)));
    }

    if (webglOK){ try { Esc = evoEscena(stage, pop, fondo); } catch(e){ console.warn('evo 3D', e); Esc = null; } }
    if (!Esc){
      stage.append(h('div',{class:'ph',style:'padding:14px'},'Sin WebGL: aquí tienes la misma población en 2D. Cada figura es un individuo y el tono es el rasgo heredado.'));
      stage.classList.remove('evo-stage'); stage.style.height = 'auto'; stage.style.minHeight = '0';
    }
    stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Cada escarabajo hereda su tono. Gira la escena con el ratón o con las flechas del teclado.')));

    panel.append(
      h('span',{class:'eyebrow gen'},'Tres pasos, en este orden'),
      h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'}, btnFondo, btnDep, btnHijos, btnOtra),
      hist, lectura);

    pintar(); actualizarBotones();

    return h('div',{class:'stack'},
      h('div',{class:'viewer'}, stage, panel),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'La población, individuo por individuo'),
        alt2d,
        h('p',{class:'small muted'},'Los que quedan tachados y desvaídos son los que no dejaron descendencia. Compáralos con la lista de antes: son los mismos de siempre, no unos nuevos.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'¿De dónde salió tanta variación?'),
        h('div',{class:'grid g2'},
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Mutación'), h('p',{},'Errores de copia del ADN, al azar y sin relación con lo que le conviene al individuo. Son raras, pero en millones de individuos y miles de generaciones aparecen constantemente. Es la única fuente de alelos nuevos.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Recombinación'), h('p',{},'En cada gameto se baraja de nuevo lo que vino de papá y de mamá. No inventa alelos nuevos, pero fabrica combinaciones nuevas: por eso dos hermanos no son iguales.'))),
        evoNota('info','Conecta con lo que ya viste:','En el laboratorio de genética editaste una base del ADN y comprobaste que una mutación puede ser silenciosa, cambiar un aminoácido o cortar la proteína. Esas mismas mutaciones, acumuladas en una población, son la materia prima sobre la que trabaja la selección natural.')),
      secNav());
  }

  /* =================================================================
     2 · SIMULADOR DE SELECCIÓN NATURAL
     ================================================================= */
  function nuevaPoblacion(){
    St.rng = evoRng(St.seed);
    St.cfg.N = St.cfg.recurso === 'escaso' ? 24 : 120;
    St.pop = evoPoblacion(St.cfg.N, 0.5, St.rng);
    St.popIni = St.pop.slice();
    St.gen = 0;
    St.serie = [{ g:0, p:evoFrec(St.pop), m:evoMedia(St.pop), sd:evoDesv(St.pop) }];
  }
  function pasoGen(){
    const r = evoGeneracion(St.pop, St.cfg, St.rng);
    St.pop = r.hijos; St.gen++;
    St.serie.push({ g:St.gen, p:evoFrec(St.pop), m:evoMedia(St.pop), sd:evoDesv(St.pop), vivos:r.vivos });
  }

  function secSimulador(){
    if (!St.pop) nuevaPoblacion();
    const campo = h('canvas',{class:'evo-cv'});
    const cvChart = h('canvas',{});
    const chartWrap = h('div',{class:'evo-chart'}, cvChart);
    const lecturas = h('dl',{class:'evo-kv'});
    const tipoEl = h('div',{class:'notice info'});
    const histWrap = h('div',{class:'evo-two'});
    const runsEl = h('div',{class:'evo-runs'});
    const tabla = h('div',{class:'tablewrap'});

    function pintar(){
      evoPintaCampo(campo, St.pop, St.cfg);
      const t = evoTipo(St.cfg);
      tipoEl.className = 'notice ' + (t.k === 'neutral' ? 'warn' : 'info');
      tipoEl.innerHTML = '';
      tipoEl.append(h('span',{}, h('b',{}, t.n + ': '), t.d + ' Óptimo(s) de camuflaje: ' + evoOptimos(St.cfg).map(o=>evoN(o)).join(' y ') + '.'));
      lecturas.innerHTML = '';
      const u = St.serie[St.serie.length-1];
      lecturas.append(
        h('dt',{},'Generación'), h('dd',{}, String(St.gen)),
        h('dt',{},'Individuos'), h('dd',{}, String(St.pop.length)),
        h('dt',{},'Frecuencia del alelo oscuro'), h('dd',{}, evoPct(u.p,1)),
        h('dt',{},'Tono medio'), h('dd',{}, evoN(u.m)),
        h('dt',{},'Variación (desviación)'), h('dd',{}, evoN(u.sd)),
        h('dt',{},'Cambio desde el inicio'), h('dd',{}, (u.m - St.serie[0].m >= 0 ? '+' : '−') + evoN(Math.abs(u.m - St.serie[0].m))));
      histWrap.innerHTML = '';
      histWrap.append(evoHistEl(St.popIni,'Generación 0 (inicio)'), evoHistEl(St.pop,'Generación '+St.gen+' (ahora)'));
      /* gráfico: frecuencia alélica y media del rasgo, más las corridas anteriores en gris */
      const gris = cssVar('--ink-3') || '#888';
      const series = St.previas.map(pv => ({ pts: pv.map(d=>({x:d.g,y:d.p})), color:gris, label:'' }));
      series.push({ pts: St.serie.map(d=>({x:d.g,y:d.p})), color: cssVar('--gen') || '#8E5BD0', label:'', dots:St.serie.length<=40 });
      series.push({ pts: St.serie.map(d=>({x:d.g,y:d.m})), color: cssVar('--accent') || '#2E6BD8', label:'' });
      cvChart._opts = null;
      lineChart(cvChart, { series, xlabel:'generación', ylabel:'0 = claro · 1 = oscuro', ymin:0, ymax:1,
        xmin:0, xmax:Math.max(10, St.gen), xfmt:v=>String(Math.round(v)), yfmt:v=>evoN(v,1) });
      runsEl.innerHTML = '';
      runsEl.append(h('span',{},'Corridas hechas: '+St.corridas));
      St.previas.slice(-5).forEach((pv,i) => runsEl.append(h('span',{},'anterior '+(i+1)+': terminó en '+evoN(pv[pv.length-1].p))));
      tabla.innerHTML = '';
      const filas = St.serie.filter((d,i) => i===0 || i===St.serie.length-1 || i%Math.max(1,Math.round(St.serie.length/8))===0);
      tabla.append(h('table',{class:'data','aria-label':'Frecuencia del alelo oscuro y tono medio por generación'},
        h('thead',{}, h('tr',{}, h('th',{},'Gen.'), h('th',{},'Frecuencia'), h('th',{},'Tono medio'), h('th',{},'Variación'))),
        h('tbody',{}, filas.map(d => h('tr',{}, h('td',{},String(d.g)), h('td',{},evoPct(d.p,1)), h('td',{},evoN(d.m)), h('td',{},evoN(d.sd)))))));
    }

    async function correr(n){
      St.marcas.simulador = true;
      const t = evoTipo(St.cfg); if (t.k !== 'neutral') St.marcas[t.k] = true; else St.marcas.deriva = true;
      for (let k=0;k<n;k++){
        pasoGen();
        if (!evoQuieto() && k % 3 === 0){ pintar(); await new Promise(r => setTimeout(r, 16)); }
      }
      pintar();
      Store.log('simulacion',{ recurso:'evolucion', fondo:St.cfg.fondo, presion:St.cfg.s, clima:St.cfg.clima, gen:St.gen, p:Math.round(St.serie[St.serie.length-1].p*100)/100 });
    }
    function reiniciar(nuevaSemilla){
      if (St.serie.length > 3){ St.previas.push(St.serie.slice()); if (St.previas.length > 5) St.previas.shift(); St.corridas++; }
      if (nuevaSemilla) St.seed = evoSemilla();
      nuevaPoblacion(); pintar();
    }

    const ctr = h('div',{class:'evo-ctrls'},
      evoSeg('Suelo', [
        { v:'claro',   n:'Arena clara',  c:evoSuelo(0.10) },
        { v:'moteado', n:'Moteado',      c:evoSuelo(0.50) },
        { v:'oscuro',  n:'Ceniza',       c:evoSuelo(0.90) },
        { v:'parches', n:'Dos parches',  c:'linear-gradient(90deg,'+evoSuelo(0.10)+' 50%,'+evoSuelo(0.90)+' 50%)' }
      ], ()=>St.cfg.fondo, v => { St.cfg.fondo = v; pintar(); }),
      evoSeg('Depredador', [
        { v:'0',   n:'Ninguno', t:'Sin presión: solo actúa el azar' },
        { v:'0.4', n:'Suave' },
        { v:'0.7', n:'Medio' },
        { v:'1',   n:'Fuerte' }
      ], ()=>String(St.cfg.s), v => { St.cfg.s = parseFloat(v); pintar(); }),
      evoSeg('Recurso', [
        { v:'normal', n:'Abundante (120)' },
        { v:'escaso', n:'Escaso (24)', t:'Poblaciones pequeñas: se nota mucho más el azar' }
      ], ()=>St.cfg.recurso, v => { St.cfg.recurso = v; reiniciar(false); }),
      evoSeg('Clima', [
        { v:'calido',   n:'Cálido' },
        { v:'templado', n:'Templado' },
        { v:'frio',     n:'Frío', t:'En frío, el caparazón oscuro absorbe más calor: corre un poco el óptimo' }
      ], ()=>St.cfg.clima, v => { St.cfg.clima = v; pintar(); }),
      h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
        h('button',{class:'btn primary', onclick:e=>{ e.target.disabled = true; correr(25).then(()=>{ e.target.disabled = false; }); }},'Correr 25 generaciones'),
        h('button',{class:'btn sm', onclick:()=>{ St.marcas.simulador = true; pasoGen(); pintar(); }},'+1 generación'),
        h('button',{class:'btn sm ghost', onclick:()=>reiniciar(true)},'Reiniciar con otro azar'),
        h('button',{class:'btn sm ghost', onclick:()=>{ St.previas = []; St.corridas = 0; reiniciar(true); }},'Borrar corridas anteriores')));

    pintar();

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'El terreno, tal como lo ve el depredador'),
        campo,
        h('p',{class:'small muted'},'Cada figura es un individuo. Los puntitos del caparazón acompañan al tono, para que no dependas solo del color. Una X roja marca a quien no dejó descendencia en la última generación.'),
        tipoEl),
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Controla el ambiente'), ctr),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Lecturas'), lecturas,
          evoNota('info','Cómo leerlo:','La <b>frecuencia del alelo oscuro</b> es qué porcentaje de todas las copias del gen en la población son de la versión oscura. El <b>tono medio</b> es el promedio de lo que se ve. Los dos suben y bajan juntos, pero el primero es lo que de verdad se hereda.'))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Frecuencia alélica y media del rasgo, generación a generación'),
        chartWrap,
        h('div',{class:'evo-lg'},
          h('span',{}, h('i',{style:'background:'+(cssVar('--gen')||'#8E5BD0')}), 'Frecuencia del alelo oscuro'),
          h('span',{}, h('i',{style:'background:'+(cssVar('--accent')||'#2E6BD8')}), 'Tono medio del rasgo'),
          h('span',{}, h('i',{style:'background:'+(cssVar('--ink-3')||'#888')}), 'Corridas anteriores (mismo ambiente, otro azar)')),
        runsEl,
        evoNota('warn','Haz esto antes de seguir:','Corre <b>la misma configuración tres o cuatro veces</b> con «Reiniciar con otro azar». Las curvas grises no se superponen: el ambiente marca la dirección, pero el azar decide el detalle. Con «Recurso escaso» la diferencia entre corridas se vuelve enorme.'),
        tabla),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'La distribución del rasgo, antes y ahora'), histWrap),
      secNav());
  }

  /* =================================================================
     3 · LOS TRES TIPOS DE SELECCIÓN
     ================================================================= */
  function secTipos(){
    const TIPOS = [
      { k:'direccional', n:'Direccional', fondo:'oscuro', d:'El óptimo está en un extremo. La campana entera se desplaza hacia allá y la media cambia mucho.',
        ej:'Polilla del abedul en la Inglaterra industrial: con los troncos ennegrecidos por el hollín, la forma oscura pasó de rara a mayoritaria en unas 50 generaciones. Cuando se limpió el aire, volvió a bajar.' },
      { k:'estabilizadora', n:'Estabilizadora', fondo:'moteado', d:'El óptimo está en el medio. La media casi no se mueve, pero la campana se vuelve más angosta: desaparecen los extremos.',
        ej:'Peso al nacer en humanos: los bebés muy pequeños y los muy grandes tienen históricamente más riesgo. La media se ha mantenido estable durante generaciones.' },
      { k:'disruptiva', n:'Disruptiva', fondo:'parches', d:'Hay dos óptimos y el término medio no sirve para nada. La distribución se parte en dos montones.',
        ej:'Pinzones de Camerún que comen semillas muy duras o muy blandas: en la misma población conviven picos grandes y picos pequeños, y los intermedios escasean.' }
    ];
    const salida = h('div',{class:'stack'});
    const cajas = h('div',{class:'grid g3'});

    function provocar(t){
      const cfg = { fondo:t.fondo, s:1, clima:'templado', N:140, mu:0.0015, seedFondo:555 };
      const r = evoCorrida(Object.assign({}, cfg, { N0:140 }), 40, evoSemilla());
      St.marcas[t.k] = true;
      salida.innerHTML = '';
      const ini = r.serie[0], fin = r.serie[r.serie.length-1];
      const cvc = h('canvas',{});
      salida.append(
        h('div',{class:'card stack'},
          h('span',{class:'eyebrow gen'},'Selección '+t.n.toLowerCase()+' · 40 generaciones · suelo: '+EVO_FONDOS[t.fondo].n.toLowerCase()),
          h('p',{},t.d),
          h('div',{class:'evo-two'},
            evoHistEl(r.pop0,'Generación 0'),
            evoHistEl(r.pop,'Generación 40')),
          h('dl',{class:'evo-kv'},
            h('dt',{},'Tono medio'), h('dd',{}, evoN(ini.m)+' → '+evoN(fin.m)+'  (cambio '+(fin.m-ini.m>=0?'+':'−')+evoN(Math.abs(fin.m-ini.m))+')'),
            h('dt',{},'Variación (desviación)'), h('dd',{}, evoN(ini.sd)+' → '+evoN(fin.sd)+'  ('+(fin.sd<ini.sd?'se estrechó':'se ensanchó')+')'),
            h('dt',{},'Frecuencia del alelo oscuro'), h('dd',{}, evoPct(ini.p,1)+' → '+evoPct(fin.p,1))),
          h('div',{class:'evo-chart'}, cvc),
          evoNota('ok','La firma de este tipo:', t.k==='direccional'
            ? 'La media se movió mucho y la variación bajó algo: casi todos acabaron pareciéndose al extremo favorecido.'
            : t.k==='estabilizadora'
            ? 'La media casi no se movió, pero la variación bajó claramente. Ojo: que la media no cambie <b>no</b> significa que no haya selección.'
            : 'La media se quedó cerca de 0,50 y sin embargo casi nadie tiene ese valor: la variación <b>subió</b> en vez de bajar. Mirar solo la media aquí te engañaría: hay que mirar la forma de la distribución. Ojo al detalle que lo hace posible: en los dos parches cada escarabajo se aparea con los de su propio parche. Si se cruzaran al azar, la recombinación volvería a rellenar el centro cada generación. Por eso la selección disruptiva es el primer paso hacia dos especies.'),
          h('p',{class:'small muted'}, h('b',{},'Caso real: '), t.ej)));
      salida.scrollIntoView({ behavior: evoQuieto() ? 'auto' : 'smooth', block:'nearest' });
      setTimeout(()=>{ try { lineChart(cvc, { series:[
        { pts:r.serie.map(d=>({x:d.g,y:d.m})), color:cssVar('--accent')||'#2E6BD8', label:'tono medio' },
        { pts:r.serie.map(d=>({x:d.g,y:Math.min(1,d.sd*2)})), color:cssVar('--warn')||'#E0891A', label:'variación (×2)' }
      ], xlabel:'generación', ylabel:'0 a 1', ymin:0, ymax:1, xmin:0, xmax:40, xfmt:v=>String(Math.round(v)), yfmt:v=>evoN(v,1) }); } catch(e){ console.warn(e); } }, 20);
    }

    TIPOS.forEach(t => cajas.append(h('div',{class:'card stack'},
      h('h3',{style:'margin:0'}, t.n),
      h('p',{class:'small'}, t.d),
      h('p',{class:'small muted'},'Ambiente que la provoca: '+EVO_FONDOS[t.fondo].d),
      h('button',{class:'btn primary sm', onclick:()=>provocar(t)},'Provocarla ahora'))));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'La misma población, tres ambientes'),
        h('p',{},'La selección natural no siempre corre la media hacia un lado. Depende de dónde estén los óptimos. Provoca las tres desde aquí y compara la forma del histograma final: es lo que hay que saber reconocer.'),
        h('p',{class:'small muted'},'Cada botón arranca de una población nueva con frecuencia 0,50 y corre 40 generaciones con presión fuerte.')),
      cajas, salida,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Para no confundirlas'),
        h('div',{class:'tablewrap'}, h('table',{class:'data'},
          h('thead',{}, h('tr',{}, h('th',{},'Tipo'), h('th',{},'Qué le pasa a la media'), h('th',{},'Qué le pasa a la variación'), h('th',{},'Forma final'))),
          h('tbody',{},
            h('tr',{}, h('td',{},'Direccional'), h('td',{},'Se desplaza a un extremo'), h('td',{},'Baja poco a poco'), h('td',{},'Una campana corrida')),
            h('tr',{}, h('td',{},'Estabilizadora'), h('td',{},'Se queda donde estaba'), h('td',{},'Baja mucho'), h('td',{},'Una campana angosta')),
            h('tr',{}, h('td',{},'Disruptiva'), h('td',{},'Se queda donde estaba'), h('td',{},'Sube'), h('td',{},'Dos montones separados'))))),
        evoNota('warn','Trampa habitual:','En la estabilizadora y en la disruptiva la media es casi la misma, y sin embargo son situaciones opuestas. Si solo miras el promedio, no distingues nada: hay que mirar el histograma.')),
      secNav());
  }

  /* =================================================================
     4 · DERIVA GENÉTICA Y CUELLO DE BOTELLA
     ================================================================= */
  function secDeriva(){
    const salidaD = h('div',{class:'stack'});
    const salidaB = h('div',{class:'stack'});

    const GENS = 60;
    function replicas(N, k){
      const out = [];
      for (let i=0;i<k;i++) out.push(evoCorrida({ fondo:'moteado', s:0, clima:'templado', N, N0:N, mu:0 }, GENS, evoSemilla()).serie);
      return out;
    }
    function correrDeriva(){
      St.marcas.deriva = true;
      salidaD.innerHTML = '';
      const chico = replicas(8, 8), grande = replicas(250, 8);
      const fijas = ss => ss.filter(s => { const p = s[s.length-1].p1; return p <= 0 || p >= 1; }).length;
      const fijA = fijas(chico), fijB = fijas(grande);
      const rango = ss => { const f = ss.map(s=>s[s.length-1].p1); return evoN(Math.min(...f))+' a '+evoN(Math.max(...f)); };
      const c1 = h('canvas',{}), c2 = h('canvas',{});
      salidaD.append(h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'8 poblaciones de 8 individuos'), h('div',{class:'evo-chart'}, c1),
          h('dl',{class:'evo-kv'}, h('dt',{},'Genes que quedaron fijados'), h('dd',{}, fijA+' de 8 poblaciones'), h('dt',{},'Rango final'), h('dd',{}, rango(chico)))),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'8 poblaciones de 250 individuos'), h('div',{class:'evo-chart'}, c2),
          h('dl',{class:'evo-kv'}, h('dt',{},'Genes que quedaron fijados'), h('dd',{}, fijB+' de 8 poblaciones'), h('dt',{},'Rango final'), h('dd',{}, rango(grande))))));
      salidaD.append(evoNota(fijA > fijB ? 'ok' : 'info','Lo que acabas de ver:',
        'Las dieciséis poblaciones vivieron en el mismo suelo moteado, <b>sin depredador y sin mutación</b>: nadie sobrevivió mejor que nadie. Seguimos <b>un solo gen de los cinco</b> para que se vea claro. Aun así la frecuencia se movió sola. En las poblaciones de 8 individuos, <b>'+fijA+' de 8</b> terminaron fijadas en 0 o en 1 —ese alelo desapareció para siempre y ya no puede volver salvo por mutación—; en las de 250, <b>'+fijB+' de 8</b>, y el resto se quedó dando vueltas cerca de 0,50. Cuanto menor es la población, más manda el azar.'));
      const dib = (cv, ss) => { setTimeout(()=>{ try { lineChart(cv, { series: ss.map((s,i)=>({ pts:s.map(d=>({x:d.g,y:d.p1})), color: i%2 ? (cssVar('--gen')||'#8E5BD0') : (cssVar('--accent')||'#2E6BD8'), label:'' })),
        xlabel:'generación', ylabel:'frecuencia del alelo oscuro (un gen)', ymin:0, ymax:1, xmin:0, xmax:GENS, xfmt:v=>String(Math.round(v)), yfmt:v=>evoN(v,1) }); } catch(e){ console.warn(e); } }, 20); };
      dib(c1, chico); dib(c2, grande);
    }
    function correrBotella(){
      St.marcas.botella = true;
      salidaB.innerHTML = '';
      const cfg = { fondo:'moteado', s:0, clima:'templado', N:250, N0:250, mu:0,
        porGen:(g, c) => Object.assign({}, c, { N: (g >= 13 && g <= 16) ? 4 : 250 }) };
      const r = evoCorrida(cfg, 45, evoSemilla());
      const antes = r.serie[12], dentro = r.serie[16], fin = r.serie[r.serie.length-1];
      const cv = h('canvas',{});
      salidaB.append(h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Erupción en la generación 13: solo sobreviven 4 escarabajos, elegidos al azar'),
        h('div',{class:'evo-chart'}, cv),
        h('div',{class:'evo-lg'},
          h('span',{}, h('i',{style:'background:'+(cssVar('--gen')||'#8E5BD0')}),'Frecuencia del alelo oscuro en un gen'),
          h('span',{}, h('i',{style:'background:'+(cssVar('--warn')||'#E0891A')}),'Genes ya fijados, de 5 (sin variación)')),
        h('div',{class:'evo-two'}, evoHistEl(r.pop0,'Antes (generación 0, N = 250)'), evoHistEl(r.pop,'Después (generación 45, N = 250)')),
        h('dl',{class:'evo-kv'},
          h('dt',{},'Frecuencia antes del cuello (gen 1)'), h('dd',{}, evoPct(antes.p1,1)),
          h('dt',{},'Frecuencia al salir del cuello'), h('dd',{}, evoPct(dentro.p1,1)),
          h('dt',{},'Frecuencia al final'), h('dd',{}, evoPct(fin.p1,1)),
          h('dt',{},'Genes sin variación, antes / después'), h('dd',{}, r.serie[0].fij+' de 5 → '+fin.fij+' de 5'),
          h('dt',{},'Variación del rasgo, antes / después'), h('dd',{}, evoN(r.serie[0].sd)+' → '+evoN(fin.sd))),
        evoNota('bad','Cuello de botella:','La población recuperó el número, pero no la variación: todos los de hoy descienden de esos cuatro. Los alelos que no pasaron por el cuello ya no existen, y recuperarlos depende de que vuelvan a aparecer por mutación, que es lentísimo. <b>Aquí no hubo ninguna ventaja ni desventaja: solo azar.</b>'),
        h('p',{class:'small muted'},'Por eso preocupa tanto el tamaño de las poblaciones amenazadas: el cóndor andino, con pocos cientos de individuos en el Ecuador, tiene muy poca variación genética con la que responder a una enfermedad nueva.')));
      setTimeout(()=>{ try { lineChart(cv, { series:[
        { pts:r.serie.map(d=>({x:d.g,y:d.p1})), color:cssVar('--gen')||'#8E5BD0', label:'' },
        { pts:r.serie.map(d=>({x:d.g,y:d.fij/EVO_LOCI})), color:cssVar('--warn')||'#E0891A', label:'' }
      ], xlabel:'generación (el cuello ocurre entre la 13 y la 16)', ylabel:'0 a 1', ymin:0, ymax:1, xmin:0, xmax:45, xfmt:v=>String(Math.round(v)), yfmt:v=>evoN(v,1) }); } catch(e){ console.warn(e); } }, 20);
    }

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Cuando nadie sobrevive mejor y aun así todo cambia'),
        h('p',{html:'En esta sección el depredador está apagado y la mutación en cero: todos los tonos sobreviven exactamente igual. Si la frecuencia se mueve, la única explicación posible es el azar de quién se reproduce con quién y de qué alelo le toca a cada gameto. Eso es la <b>deriva genética</b>.'}),
        h('button',{class:'btn primary', onclick:correrDeriva},'Correr 16 poblaciones sin selección')),
      salidaD,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Cuello de botella'),
        h('p',{},'Un desastre —una erupción, una sequía, la tala de un bosque— no elige: mata a casi todos con independencia de su tono. Los pocos que quedan llevan, por puro azar, una muestra sesgada de los alelos que había.'),
        h('button',{class:'btn primary', onclick:correrBotella},'Provocar un cuello de botella')),
      salidaB,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Deriva y selección no son lo mismo'),
        h('div',{class:'tablewrap'}, h('table',{class:'data'},
          h('thead',{}, h('tr',{}, h('th',{},''), h('th',{},'Selección natural'), h('th',{},'Deriva genética'))),
          h('tbody',{},
            h('tr',{}, h('td',{},'Causa'), h('td',{},'Diferencias reales de supervivencia o reproducción'), h('td',{},'Azar del muestreo de una generación a otra')),
            h('tr',{}, h('td',{},'Dirección'), h('td',{},'Predecible: hacia el óptimo del ambiente'), h('td',{},'Impredecible: cada corrida va para otro lado')),
            h('tr',{}, h('td',{},'Efecto del tamaño'), h('td',{},'Actúa igual en poblaciones grandes y pequeñas'), h('td',{},'Casi nula si N es grande; brutal si N es pequeño')),
            h('tr',{}, h('td',{},'¿Produce adaptación?'), h('td',{},'Sí: ajusta la población al ambiente'), h('td',{},'No: puede incluso fijar alelos perjudiciales'))))),
        evoNota('info','Las dos actúan a la vez.','En el simulador de la sección 2, con depredador fuerte y recurso escaso, tienes selección y deriva al mismo tiempo: la media va hacia el óptimo, pero el camino es distinto en cada corrida.')),
      secNav());
  }

  /* =================================================================
     5 · EVIDENCIAS DE LA EVOLUCIÓN
     ================================================================= */
  function secPruebas(){
    /* --- homologías --- */
    const limbs = h('div',{class:'evo-limbs'});
    EVO_EXTREM.forEach(sp => limbs.append(h('div',{class:'evo-limb'},
      h('div',{html:evoExtremidadSVG(sp)}),
      h('h4',{}, sp.n), h('p',{}, sp.f))));
    const leyenda = h('div',{class:'evo-lg'});
    let huesoSel = null;
    const lectHueso = h('div',{class:'notice info'},'Toca un hueso (o elige uno en la lista) y se marcará el mismo hueso en las cuatro extremidades.');
    function marcar(k){
      huesoSel = (huesoSel === k) ? null : k;
      $$('.evo-h', limbs).forEach(el => {
        el.classList.toggle('on', !!huesoSel && el.dataset.h === huesoSel);
        el.classList.toggle('dim', !!huesoSel && el.dataset.h !== huesoSel);
      });
      $$('button', leyenda).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.h === huesoSel)));
      lectHueso.innerHTML = '';
      if (!huesoSel){ lectHueso.className = 'notice info'; lectHueso.textContent = 'Toca un hueso (o elige uno en la lista) y se marcará el mismo hueso en las cuatro extremidades.'; return; }
      St.marcas.homologia = true;
      lectHueso.className = 'notice ok';
      lectHueso.append(h('span',{}, h('b',{}, EVO_HUESOS[huesoSel].n + ': '),
        'está en las cuatro, en el mismo sitio y en el mismo orden, aunque una agarra, otra nada y dos vuelan. Cambian el tamaño y la proporción; el plano de construcción no. Eso solo se explica si vienen de un antepasado común que ya tenía ese hueso.'));
    }
    Object.entries(EVO_HUESOS).forEach(([k,g]) => leyenda.append(h('button',{
      class:'chip', type:'button', 'data-h':k, 'aria-pressed':'false', onclick:()=>marcar(k) },
      h('span',{class:'evo-sw',style:'background:'+g.c}), g.n)));
    limbs.addEventListener('click', e => { const t = e.target.closest('.evo-h'); if (t) marcar(t.dataset.h); });

    /* --- registro fósil --- */
    const estratos = h('div',{class:'evo-strata'});
    EVO_FOSILES.forEach(f => estratos.append(h('div',{class:'evo-stra'},
      h('span',{class:'evo-ma'}, f.ma), h('span',{}, h('b',{}, f.n + ' · '), f.d))));

    /* --- ADN comparado --- */
    const cyt = h('div',{class:'evo-cyt'});
    const maxd = Math.max(...EVO_CITO.map(c=>c.d));
    EVO_CITO.forEach(c => cyt.append(h('div',{class:'evo-r'},
      h('span',{}, c.n),
      h('span',{class:'evo-t',role:'img','aria-label':c.n+': '+c.d+' aminoácidos distintos de 104'}, h('i',{style:'width:'+Math.round(Math.max(2, c.d/maxd*100))+'%'})),
      h('span',{class:'evo-n'}, String(c.d)))));

    /* --- pinzones de Galápagos --- */
    const cvP = h('canvas',{}), cvS = h('canvas',{});
    const tablaP = h('div',{class:'tablewrap'}, h('table',{class:'data','aria-label':'Profundidad media del pico de Geospiza fortis en Daphne Major'},
      h('thead',{}, h('tr',{}, h('th',{},'Año'), h('th',{},'Pico medio (mm)'), h('th',{},'Qué pasaba ese año'))),
      h('tbody',{}, EVO_PINZONES.map(d => h('tr',{}, h('td',{},String(d.y)), h('td',{}, evoN(d.pico)), h('td',{class:'small'}, d.nota))))));
    const pinzBtn = h('button',{class:'btn primary sm', onclick:()=>{ St.marcas.pinzones = true; dibujarPinzones(); toast('Datos de Grant y Grant graficados.'); }},'Graficar los datos reales');
    function dibujarPinzones(){
      try {
        lineChart(cvP, { series:[{ pts:EVO_PINZONES.map(d=>({x:d.y,y:d.pico})), color:cssVar('--gen')||'#8E5BD0', label:'pico medio (mm)', dots:true }],
          xlabel:'año', ylabel:'profundidad del pico (mm)', ymin:9.0, ymax:10.4, xmin:1973, xmax:1987, xticks:7, xfmt:v=>String(Math.round(v)), yfmt:v=>evoN(v,1) });
        lineChart(cvS, { series:[{ pts:EVO_SEMILLAS.map(d=>({x:d.y,y:d.d})), color:cssVar('--warn')||'#E0891A', label:'dureza del alimento', dots:true }],
          xlabel:'año', ylabel:'índice de dureza de las semillas', ymin:4, ymax:6.5, xmin:1976, xmax:1987, xticks:6, xfmt:v=>String(Math.round(v)), yfmt:v=>evoN(v,1) });
      } catch(e){ console.warn('pinzones', e); }
    }
    setTimeout(dibujarPinzones, 30);

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'1 · Homologías: los mismos huesos para oficios distintos'),
        h('p',{},'Compara las cuatro extremidades anteriores. Son de un ser humano, una ballena, un murciélago y un ave. Hacen cosas completamente distintas y, sin embargo, tienen los mismos huesos en el mismo orden.'),
        leyenda, limbs, lectHueso,
        h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Y ahora lo contrario: '),
          'el ala de una mosca también vuela, pero no tiene húmero, ni radio, ni falanges: es una lámina de quitina que nació de un origen distinto. Eso es una ',
          h('b',{},'analogía'), ': misma función, orígenes separados. Otro par análogo: la aleta de un tiburón y la de un delfín, parecidas por fuera y muy distintas por dentro.'))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'2 · Registro fósil: las formas intermedias existen'),
        h('p',{},'«Si las ballenas vienen de mamíferos terrestres, ¿dónde están las formas de en medio?» Están, y se las sigue encontrando. Esta es la serie mejor documentada:'),
        estratos,
        h('p',{class:'small muted'},'En el Ecuador hay registro fósil marino en la península de Santa Elena y en Manabí, y restos de megafauna del Pleistoceno —perezosos gigantes y mastodontes— en la sierra, por ejemplo en los depósitos de Cangahua cerca de Quito.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'3 · ADN y proteínas: el parentesco escrito por dentro'),
        h('p',{},'El citocromo c es una proteína de 104 aminoácidos que usan todos los seres vivos para respirar. Esta es la cantidad de aminoácidos en que difiere de la versión humana:'),
        cyt,
        h('p',{class:'small muted'},'Cuantas menos diferencias, más reciente es el antepasado común. El orden que sale de aquí —chimpancé, mono, mamíferos, ave, anfibio, pez, hongo— es exactamente el mismo que ya habían deducido los anatomistas mirando huesos, sin saber nada de proteínas. Dos métodos independientes que coinciden: eso es lo que convierte una idea en ciencia sólida.'),
        evoNota('info','Dato para dimensionarlo:','El genoma humano y el del chimpancé coinciden en cerca del 98,8 % en las regiones comparables. También compartimos genes de reparación del ADN con las bacterias.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'4 · Caso ecuatoriano: los pinzones de Daphne Major (Galápagos)'),
        h('p',{},'Peter y Rosemary Grant midieron el pico de miles de pinzones de tierra medianos (', h('i',{},'Geospiza fortis'), ') en la isla Daphne Major durante cuarenta años. En 1977 no llovió: se acabaron las semillas pequeñas y blandas y solo quedaron las grandes y duras, que únicamente los picos más profundos podían romper. Murió más del 85 % de la población.'),
        pinzBtn,
        h('div',{class:'grid g2'},
          h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Pico medio de la población'), h('div',{class:'evo-chart'}, cvP)),
          h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Dureza del alimento disponible'), h('div',{class:'evo-chart'}, cvS))),
        tablaP,
        evoNota('ok','Lo importante de este caso:','Es selección natural medida en la naturaleza, en un plazo humano, con individuos anillados uno por uno. Y mira el final de la curva: <b>después de El Niño de 1983 el pico volvió a achicarse</b>. La selección no persigue un ideal de pico grande; sigue al ambiente, y cuando el ambiente cambia de sentido, ella también.'),
        h('p',{class:'small muted'},'Valores aproximados de la serie publicada por Grant y Grant. En la sequía de 2004 ocurrió algo aún más fino: la llegada de un pinzón de pico grande competidor hizo que el pico de ', h('i',{},'G. fortis'), ' se hiciera más pequeño, no más grande.')),
      secNav());
  }

  /* =================================================================
     6 · ERRORES FRECUENTES
     ================================================================= */
  function secErrores(){
    const M = [
      { mal:'«El individuo se adapta durante su vida.»',
        bien:'Un individuo no evoluciona. Puede broncearse, entrenar o acostumbrarse a la altura, pero eso son respuestas fisiológicas que no se heredan y que mueren con él. Lo que evoluciona es la población, y solo a través de lo que se transmite en los gametos.',
        prueba:'En la sección 1 ningún escarabajo cambió de tono. Lo que cambió fue cuántos había de cada tono.' },
      { mal:'«La jirafa estiró el cuello para alcanzar las hojas y sus hijos nacieron con el cuello más largo.»',
        bien:'Eso es lamarckismo, y no funciona: estirar el cuello no cambia el ADN de los gametos. Lo que ocurrió es que en la población de antepasados ya había cuellos de distintas longitudes —por mutación y recombinación—, y los de cuello algo más largo llegaron a más comida, sobrevivieron mejor y dejaron más hijos. Repetido durante miles de generaciones.',
        prueba:'Compáralo con el simulador: el fondo oscuro no oscureció a nadie; solo hizo que los ya oscuros dejaran más descendencia.' },
      { mal:'«La evolución busca la perfección» o «va hacia formas superiores».',
        bien:'La selección natural no tiene meta, ni memoria, ni plan. Solo favorece lo que funciona aquí y ahora; si el ambiente cambia, lo favorecido cambia. Además arrastra chapuzas heredadas: el nervio laríngeo recurrente de la jirafa da un rodeo de más de cuatro metros porque así estaba en los peces.',
        prueba:'En los pinzones, el pico grande fue una ventaja en 1977 y una desventaja después de 1983. Ninguna de las dos formas es «superior».' },
      { mal:'«Sobrevive el más fuerte.»',
        bien:'La frase correcta es «sobrevive el que mejor deja descendencia en ese ambiente». Muchas veces gana el más pequeño, el que pasa desapercibido, el que aguanta la sequía o el que cuida mejor a sus crías. Un escarabajo oscuro no es más fuerte que uno claro: solo se ve menos sobre la ceniza.',
        prueba:'En el simulador, cambia el suelo a arena clara: ahora ganan exactamente los que antes perdían, sin que nadie se haya vuelto más fuerte.' },
      { mal:'«La evolución es solo una teoría, o sea, una suposición.»',
        bien:'En ciencia, una teoría es una explicación comprobada que reúne miles de observaciones independientes, no una corazonada. Anatomía comparada, fósiles, ADN, biogeografía y experimentos en tiempo real (pinzones, bacterias resistentes a antibióticos) apuntan todos al mismo sitio.',
        prueba:'La sección 5 te muestra tres líneas de evidencia distintas que dan el mismo árbol.' },
      { mal:'«El ambiente provoca las mutaciones que hacen falta.»',
        bien:'Las mutaciones ocurren al azar respecto a lo que le conviene al individuo. Una bacteria no fabrica resistencia porque le pongas antibiótico: en la población ya había alguna resistente, y el antibiótico mató a todas las demás. Por eso no hay que dejar los tratamientos a medias.',
        prueba:'En la sección 1 la variación ya estaba antes de que apareciera el depredador.' }
    ];
    const cont = h('div',{class:'stack'});
    M.forEach(m => cont.append(h('div',{class:'evo-mito'},
      h('h4',{},'✗ '+m.mal),
      h('div',{class:'evo-ok'}, h('b',{},'Lo que de verdad ocurre. '), m.bien),
      h('p',{class:'small muted',style:'margin:0'}, h('b',{},'Compruébalo aquí mismo: '), m.prueba))));
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Seis frases que hay que desmontar'),
        h('p',{},'Ninguna de estas frases es una tontería: todas suenan razonables y por eso se repiten. Lo que tienen en común es que ponen el cambio en el individuo y le dan una intención a la naturaleza. Léelas con lo que acabas de simular en la mano.'),
        cont),
      secNav());
  }

  /* =================================================================
     7 · RETO FINAL
     ================================================================= */
  function secReto(){
    const marcas = [
      ['variacion','Comprobaste que la variación existía antes del depredador'],
      ['simulador','Corriste el simulador cambiando el ambiente'],
      ['direccional','Provocaste selección direccional'],
      ['estabilizadora','Provocaste selección estabilizadora'],
      ['disruptiva','Provocaste selección disruptiva'],
      ['deriva','Viste deriva genética sin selección'],
      ['botella','Provocaste un cuello de botella'],
      ['homologia','Rastreaste un hueso en las cuatro extremidades'],
      ['pinzones','Graficaste los datos reales de los pinzones']
    ];
    const lista = h('ul',{class:'checks plain'});
    marcas.forEach(([k,t]) => lista.append(h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{}, (St.marcas[k]?'✓ ':'· ')+t))));

    const wrap = h('div',{class:'card stack'});
    let ok = 0, intentos = 0;
    wrap.append(
      h('span',{class:'eyebrow gen'},'🎯 Reto final · seis preguntas sobre lo que acabas de ver'),
      h('p',{class:'small muted'},'Ninguna se responde de memoria: todas se responden mirando un gráfico, un histograma o una simulación de las secciones anteriores. Si te equivocas, la retroalimentación te dice a cuál volver.'));
    EVO_PREGUNTAS.forEach(p => wrap.append(quizBlock(p, (att) => {
      ok++; intentos += att;
      if (ok === EVO_PREGUNTAS.length){
        const hechas = marcas.filter(([k]) => St.marcas[k]).length;
        const min = Math.round((Date.now() - St.start)/60000);
        try {
          Store.completeActivity('reto-evolucion', {
            score: EVO_PREGUNTAS.length + '/' + EVO_PREGUNTAS.length,
            attempts: intentos - EVO_PREGUNTAS.length,
            duracionMin: min,
            tareas: hechas + '/' + marcas.length });
        } catch(e){ console.warn('completeActivity', e); }
        retoSt.className = 'notice ok';
        retoSt.innerHTML = '<span><b>¡Reto resuelto!</b> Seis de seis, con ' + hechas + ' de ' + marcas.length + ' tareas del recorrido completadas.</span>';
        wrap.append(evoNota('ok','Actividad completada y registrada en tu progreso.','Ya puedes explicar la selección natural sin caer en «el individuo se adapta» ni en «sobrevive el más fuerte», distinguirla de la deriva y sostener la explicación con evidencias: homologías, fósiles, ADN y los pinzones de Galápagos.'));
        toast('Actividad completada: Reto de selección natural ✓');
      }
    })));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Lo que hiciste hasta aquí'), lista,
        h('p',{class:'small muted'},'Puedes responder aunque falte alguna casilla, pero cada tarea del recorrido te da justo el argumento con el que se responde una de las preguntas.')),
      wrap,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Para llevar al cuaderno'),
        h('p',{html:'La selección natural necesita tres cosas y nada más: <b>que haya variación</b>, <b>que esa variación se herede</b> y <b>que unas variantes dejen más descendencia que otras en ese ambiente</b>. Si se cumplen las tres, el cambio en la población es inevitable. No hace falta ninguna intención, ninguna meta y ningún esfuerzo del individuo.'}),
        h('p',{html:'Y hay un segundo motor que no es la selección: la <b>deriva genética</b>, el azar del muestreo. Manda poco en poblaciones grandes y manda muchísimo en las pequeñas. Distinguir cuál de los dos explica un cambio es, en la práctica, lo que hace un biólogo evolutivo.'}),
        h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
          h('button',{class:'btn sm', onclick:()=>{
            try { Store.addNote('gen','Selección natural: variación + herencia + reproducción diferencial. Deriva = azar, fuerte si N es pequeño. Pinzones de Daphne Major: pico de 9,4 a 10,1 mm tras la sequía de 1977 y de vuelta a 9,7 tras El Niño de 1983.', { recurso:'evolucion' });
              toast('Guardado en tu cuaderno.'); } catch(e){ console.warn(e); } }},'Guardar resumen en el cuaderno'),
          h('a',{class:'btn sm ghost', href:'#/explorar/genetica'},'Volver al laboratorio de genética'))),
      secNav());
  }

  /* =================================================================
     RENDER
     ================================================================= */
  function render(){
    soltar();
    renderNav(); body.innerHTML = '';
    const f = [secVariacion, secSimulador, secTipos, secDeriva, secPruebas, secErrores, secReto][St.sec];
    body.append(f());
    Store.log('seccion',{ recurso:'evolucion', seccion:SEC[St.sec].id });
  }
  render();
  return { unmount(){ soltar(); } };
}

route('/explorar/evolucion', (view) => evoVista(view));
</script>
