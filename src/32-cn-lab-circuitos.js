<style>
/* ===== Laboratorio de circuitos (9.º EGB · Ciencias Físicas) ===== */
.cir-ovl{position:absolute;inset:0;pointer-events:none;z-index:2}
.cir-tag{position:absolute;transform:translate(-50%,-50%);background:color-mix(in srgb,var(--bg-2) 88%,transparent);border:1px solid var(--line);border-radius:8px;padding:2px 7px;font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.7rem;font-weight:600;color:var(--ink);white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.14)}
.cir-tag.med{background:#101820;color:#8CF2B4;border-color:#2b3b46}
.cir-tag.off{opacity:.55}
.cir-tag.burn{background:color-mix(in srgb,var(--bad) 18%,var(--bg-2));border-color:var(--bad);color:var(--bad)}
.cir-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.cir-opt{display:flex;flex-direction:column;gap:2px;align-items:flex-start;text-align:left;padding:9px 11px;border:1px solid var(--line);border-radius:10px;background:var(--bg-2);color:var(--ink);font:inherit;font-size:.82rem;cursor:pointer}
.cir-opt:hover{border-color:var(--accent)}
.cir-opt[aria-pressed="true"]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,var(--bg-2));box-shadow:inset 0 0 0 1px var(--accent)}
.cir-opt b{font-size:.86rem}
.cir-opt span{color:var(--ink-3);font-size:.74rem}
.cir-svg{width:100%;height:auto;display:block;background:var(--bg-2);border:1px solid var(--line);border-radius:12px}
.cir-svg text{font-family:"IBM Plex Sans",sans-serif;font-size:13px;fill:var(--ink)}
.cir-svg .cir-lbl{font-size:11px;fill:var(--ink-3)}
.cir-lamp-on{fill:#FFE08A}
.cir-lamp-off{fill:var(--bg-3)}
.cir-lamp-burn{fill:#4a4a4a}
.cir-bars{display:flex;flex-direction:column;gap:6px}
.cir-brow{display:flex;align-items:center;gap:8px;font-size:.78rem}
.cir-brow .n{width:92px;color:var(--ink-2);flex:none}
.cir-btrack{flex:1;height:10px;border-radius:6px;background:var(--bg-3);border:1px solid var(--line);overflow:hidden}
.cir-bfill{height:100%;background:linear-gradient(90deg,#E8A33D,#FFD98A)}
.cir-bfill.burn{background:var(--bad)}
.cir-brow .v{width:112px;text-align:right;font-family:"IBM Plex Mono",monospace;font-size:.72rem;color:var(--ink-3);flex:none}
.cir-tar{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.cir-tar input{width:92px}
.cir-ap{display:grid;grid-template-columns:1.6fr .9fr .9fr;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid var(--line)}
.cir-ap:last-child{border-bottom:0}
.cir-ap input[type=number]{width:100%}
.cir-safe{border-left:4px solid var(--bad)}
@media (max-width:760px){ .cir-ap{grid-template-columns:1fr .8fr .8fr} .cir-brow .n{width:70px} }
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · 9.º EGB Superior · Ciencias Físicas
   Unidad 2 · Electricidad, circuitos y energía
   LABORATORIO VIRTUAL 3D: ley de Ohm, serie y paralelo, potencia,
   consumo domiciliario y seguridad eléctrica.
   Se articula con 10.º EGB · Unidad 3 (electricidad, magnetismo y ondas).
   ===================================================================== */
(function(){

  /* La actividad se registra aquí para no tocar otros archivos del proyecto. */
  if (typeof BIO !== 'undefined' && BIO.activities && !BIO.activities['cn-lab-circuitos'])
    BIO.activities['cn-lab-circuitos'] = { t:'Laboratorio: electricidad y circuitos', unidad:2, peso:30, xp:120 };

  /* ---------- formato: coma decimal, unidades siempre explícitas ---------- */
  const nf = (v, d=2) => (Math.abs(v) < 1e-9 ? 0 : v).toFixed(d).replace('.', ',');
  const anim = () => (typeof motionOK === 'function' ? motionOK() : true) && !Store.s.a11y.motion;

  /* ---------- catálogo de componentes ---------- */
  const PILAS = [
    { id:'p15', V:1.5, n:'Pila de 1,5 V',  d:'Pila AA común' },
    { id:'p45', V:4.5, n:'Pila de 4,5 V',  d:'Petaca de tres celdas' },
    { id:'p90', V:9.0, n:'Batería de 9 V', d:'Batería rectangular' }
  ];
  const FOCOS = [
    { id:'f3',  R:3,  Pn:0.75, n:'Foco de 3 Ω',  d:'Nominal 1,5 V · 0,75 W' },
    { id:'f6',  R:6,  Pn:3.38, n:'Foco de 6 Ω',  d:'Nominal 4,5 V · 3,38 W' },
    { id:'f12', R:12, Pn:6.75, n:'Foco de 12 Ω', d:'Nominal 9 V · 6,75 W' }
  ];
  /* resistencias con código de bandas (4 bandas: dígito, dígito, multiplicador, tolerancia) */
  const BAND = { neg:0x1b1b1b, caf:0x7a4a1e, roj:0xc02a20, nar:0xd97418, ama:0xe5c02a, ver:0x2a8a45, azu:0x2a55a8, ora:0xc8a227 };
  const RESIS = [
    { id:'r2',  R:2,  n:'Resistencia de 2 Ω',  bandas:['roj','neg','neg','ora'], txt:'rojo · negro · negro · dorado' },
    { id:'r5',  R:5,  n:'Resistencia de 5 Ω',  bandas:['ver','neg','neg','ora'], txt:'verde · negro · negro · dorado' },
    { id:'r10', R:10, n:'Resistencia de 10 Ω', bandas:['caf','neg','neg','ora'], txt:'café · negro · negro · dorado' }
  ];
  const TOPOS = [
    { id:'uno',   n:'Un foco',                 d:'El circuito más simple: pila, interruptor y un foco.' },
    { id:'serie2',n:'Dos focos en serie',      d:'Los dos focos van uno detrás del otro, en el mismo camino.' },
    { id:'par2',  n:'Dos focos en paralelo',   d:'Cada foco tiene su propio camino entre los mismos dos nodos.' },
    { id:'focoR', n:'Foco + resistencia',      d:'Una resistencia en serie limita la corriente del foco.' },
    { id:'mixto', n:'Tres focos (mixto)',      d:'Un foco en serie con dos focos en paralelo.' }
  ];

  /* ---------- estado del laboratorio ---------- */
  const L = {
    topo:'uno', pila:'p45', foco:'f6', res:'r5',
    closed:false, burned:{}, pred:null, predTopo:null,
    amp:0, volt:0, filas:[], logrado:{ uno:null, par2:null },
    esquema:false, retoQuiz:false, retoSeg:false, retoConfig:false, done:false,
    tarifa:0.092, escA:null
  };
  const P = () => PILAS.find(x=>x.id===L.pila);
  const F = () => FOCOS.find(x=>x.id===L.foco);
  const RR = () => RESIS.find(x=>x.id===L.res);

  /* =====================================================================
     FÍSICA: ley de Ohm (I = V/R), resistencia equivalente, potencia P = V·I
     ===================================================================== */
  function solve(){
    const V = P().V, RL = F().R, RX = RR().R;
    const out = { V, closed:L.closed, comps:[], Req:0, I:0, quemados:[] };
    const lampBurn = id => !!L.burned[id];
    /* la resistencia de un filamento quemado es infinita: ese camino queda abierto */
    const rl = id => lampBurn(id) ? Infinity : RL;

    if (L.topo === 'uno'){
      const R = rl('L1'); out.Req = R; out.I = L.closed ? V/R : 0;
      out.comps.push({ id:'L1', tipo:'foco', n:'Foco', R:RL, I:out.I, U:out.I*RL });
    } else if (L.topo === 'serie2'){
      const R = rl('L1') + rl('L2'); out.Req = R; out.I = L.closed ? V/R : 0;
      out.comps.push({ id:'L1', tipo:'foco', n:'Foco 1', R:RL, I:out.I, U:out.I*RL });
      out.comps.push({ id:'L2', tipo:'foco', n:'Foco 2', R:RL, I:out.I, U:out.I*RL });
    } else if (L.topo === 'par2'){
      const g = (1/rl('L1')) + (1/rl('L2')); out.Req = g>0 ? 1/g : Infinity;
      const U = L.closed ? V : 0; out.I = L.closed ? V*g : 0;
      out.comps.push({ id:'L1', tipo:'foco', n:'Foco 1 (rama A)', R:RL, I: lampBurn('L1')?0:U/RL, U: lampBurn('L1')?0:U });
      out.comps.push({ id:'L2', tipo:'foco', n:'Foco 2 (rama B)', R:RL, I: lampBurn('L2')?0:U/RL, U: lampBurn('L2')?0:U });
    } else if (L.topo === 'focoR'){
      const R = rl('L1') + RX; out.Req = R; out.I = L.closed ? V/R : 0;
      out.comps.push({ id:'L1', tipo:'foco', n:'Foco', R:RL, I:out.I, U:out.I*RL });
      out.comps.push({ id:'R1', tipo:'res',  n:'Resistencia', R:RX, I:out.I, U:out.I*RX });
    } else { /* mixto: L1 en serie con (L2 || L3) */
      const g = (1/rl('L2')) + (1/rl('L3')); const Rpar = g>0 ? 1/g : Infinity;
      const R = rl('L1') + Rpar; out.Req = R; out.I = L.closed && isFinite(R) ? V/R : 0;
      const Upar = out.I * (isFinite(Rpar) ? Rpar : 0);
      out.comps.push({ id:'L1', tipo:'foco', n:'Foco 1 (serie)', R:RL, I:out.I, U:out.I*RL });
      out.comps.push({ id:'L2', tipo:'foco', n:'Foco 2 (rama A)', R:RL, I: lampBurn('L2')?0:Upar/RL, U: lampBurn('L2')?0:Upar });
      out.comps.push({ id:'L3', tipo:'foco', n:'Foco 3 (rama B)', R:RL, I: lampBurn('L3')?0:Upar/RL, U: lampBurn('L3')?0:Upar });
    }
    out.comps.forEach(c => {
      if (!isFinite(c.I) || !isFinite(c.U)){ c.I = 0; c.U = 0; }
      c.Pw = c.U * c.I;                                  /* P = V · I */
      c.brillo = c.tipo==='foco' && !lampBurn(c.id) ? clamp(c.Pw / F().Pn, 0, 2.2) : 0;
      c.quemado = lampBurn(c.id);
      if (c.tipo==='foco' && !c.quemado && c.Pw > 2*F().Pn) out.quemados.push(c.id);
    });
    out.Ubat = out.I>0 ? V : V;                          /* pila ideal: no tiene resistencia interna */
    out.Usw  = L.closed ? 0 : V;                         /* interruptor abierto: toda la tensión cae en él */
    out.Pt = V * out.I;
    return out;
  }

  /* puntos de medición según la topología */
  function ampPoints(){
    const a = [{ id:'ppal', n:'Rama principal (junto a la pila)', pos:[3,0.32,0.2] }];
    if (L.topo==='serie2') a.push({ id:'entre', n:'Entre los dos focos', pos:[0,0.32,-1.8] });
    if (L.topo==='focoR')  a.push({ id:'entre', n:'Entre el foco y la resistencia', pos:[0,0.32,-1.8] });
    if (L.topo==='par2'){ a.push({ id:'ramaA', n:'Rama A (foco 1)', pos:[-1.05,0.32,-2.6] }); a.push({ id:'ramaB', n:'Rama B (foco 2)', pos:[-1.05,0.32,-1.0] }); }
    if (L.topo==='mixto'){ a.push({ id:'ramaA', n:'Rama A (foco 2)', pos:[0.1,0.32,-2.6] }); a.push({ id:'ramaB', n:'Rama B (foco 3)', pos:[0.1,0.32,-1.0] }); }
    return a;
  }
  function voltPoints(r){
    const v = [{ id:'pila', n:'Entre los bornes de la pila', pos:[0,1.15,1.8] }];
    r.comps.forEach(c => v.push({ id:c.id, n:'En paralelo con '+c.n, pos:compPos(c.id).map((q,i)=> i===1 ? q+0.95 : q) }));
    v.push({ id:'sw', n:'Entre los contactos del interruptor', pos:[2.0,0.95,1.8] });
    return v;
  }
  function ampRead(r, id){
    if (id==='ramaA') return (r.comps.find(c=>c.id===(L.topo==='par2'?'L1':'L2'))||{I:0}).I;
    if (id==='ramaB') return (r.comps.find(c=>c.id===(L.topo==='par2'?'L2':'L3'))||{I:0}).I;
    return r.I;
  }
  function voltRead(r, id){
    if (id==='pila') return r.V;
    if (id==='sw') return r.Usw;
    const c = r.comps.find(x=>x.id===id); return c ? c.U : 0;
  }

  /* posición 3D de cada componente según la topología */
  function compPos(id){
    if (L.topo==='uno')    return [0,0.5,-1.8];
    if (L.topo==='serie2') return id==='L1' ? [-1.3,0.5,-1.8] : [1.3,0.5,-1.8];
    if (L.topo==='focoR')  return id==='L1' ? [-1.3,0.5,-1.8] : [1.3,0.35,-1.8];
    if (L.topo==='par2')   return id==='L1' ? [0,0.5,-2.6] : [0,0.5,-1.0];
    if (id==='L1') return [-2.0,0.5,-1.8];
    return id==='L2' ? [0.8,0.5,-2.6] : [0.8,0.5,-1.0];
  }
  /* polilíneas de cable por topología (y = 0,2 sobre la mesa) */
  function wirePaths(){
    const y = 0.2, W = [];
    W.push([[-0.9,y,1.8],[-3,y,1.8],[-3,y,-1.8]]);            /* borne − hasta la esquina superior izquierda */
    W.push([[0.9,y,1.8],[1.55,y,1.8]]);                        /* borne + hasta el interruptor */
    W.push([[2.45,y,1.8],[3,y,1.8],[3,y,-1.8]]);               /* interruptor hasta la esquina superior derecha */
    const NL=[-3,y,-1.8], NR=[3,y,-1.8];
    if (L.topo==='uno'){ W.push([NL,[-0.55,y,-1.8]]); W.push([[0.55,y,-1.8],NR]); }
    else if (L.topo==='serie2' || L.topo==='focoR'){ W.push([NL,[-1.85,y,-1.8]]); W.push([[-0.75,y,-1.8],[0.75,y,-1.8]]); W.push([[1.85,y,-1.8],NR]); }
    else if (L.topo==='par2'){
      W.push([NL,[-1.6,y,-1.8]]); W.push([[-1.6,y,-1.0],[-1.6,y,-2.6]]);
      W.push([[-1.6,y,-2.6],[-0.55,y,-2.6]]); W.push([[0.55,y,-2.6],[1.6,y,-2.6]]);
      W.push([[-1.6,y,-1.0],[-0.55,y,-1.0]]); W.push([[0.55,y,-1.0],[1.6,y,-1.0]]);
      W.push([[1.6,y,-1.0],[1.6,y,-2.6]]); W.push([[1.6,y,-1.8],NR]);
    } else {
      W.push([NL,[-2.55,y,-1.8]]); W.push([[-1.45,y,-1.8],[-0.6,y,-1.8]]);
      W.push([[-0.6,y,-1.0],[-0.6,y,-2.6]]);
      W.push([[-0.6,y,-2.6],[0.25,y,-2.6]]); W.push([[1.35,y,-2.6],[2.2,y,-2.6]]);
      W.push([[-0.6,y,-1.0],[0.25,y,-1.0]]); W.push([[1.35,y,-1.0],[2.2,y,-1.0]]);
      W.push([[2.2,y,-1.0],[2.2,y,-2.6]]); W.push([[2.2,y,-1.8],NR]);
    }
    return W;
  }

  /* =====================================================================
     ESCENA 3D
     ===================================================================== */
  /* entorno fijo: mesada fenólica, tablero de madera, pared de azulejos (se crea una sola vez) */
  function cirEntorno(E){
    if (E._cirEnv) return; E._cirEnv = true;
    const K = cnLabKit;
    const B = K.bench({ w:10.6, d:8.2, y:-0.07, z:-0.35, t:0.18, top:'phenolic', wall:{ z:-4.45, h:5, w:26 }, cabH:2.4 });
    E.scene.add(B.group);
    const tabla = new THREE.Mesh(K.slab(7.6, 6.4, 0.1, 0.12, 0.04), K.wood({ base:[222,196,150], dark:[150,112,66], strips:1, seed:17, coat:0.25, rough:0.62 }));
    tabla.position.set(0, 0.03, -0.2); E.scene.add(tabla);
  }
  function cirCurva(path){
    /* recorrido con esquinas redondeadas; el cable baja a apoyarse sobre el tablero entre los bornes */
    const P = path.map(p => new THREE.Vector3(p[0], p[1], p[2]));
    const len = P.reduce((s, p, i) => i ? s + p.distanceTo(P[i-1]) : 0, 0);
    const yb = 0.1, pts = [];
    if (len > 0.7){
      const d0 = P[1].clone().sub(P[0]).normalize(), n = P.length, d1 = P[n-1].clone().sub(P[n-2]).normalize();
      pts.push(P[0]); pts.push(P[0].clone().addScaledVector(d0, 0.22).setY(yb));
      for (let i = 1; i < n - 1; i++) pts.push(P[i].clone().setY(yb));
      pts.push(P[n-1].clone().addScaledVector(d1, -0.22).setY(yb)); pts.push(P[n-1]);
    } else { pts.push(P[0], P[0].clone().lerp(P[P.length-1], 0.5).setY(0.16), P[P.length-1]); }
    const cp = new THREE.CurvePath(), R = 0.16;
    let cur = pts[0];
    for (let i = 1; i < pts.length; i++){
      const b = pts[i], nx = pts[i+1];
      if (!nx){ cp.add(new THREE.LineCurve3(cur, b)); break; }
      const din = b.clone().sub(cur), dout = nx.clone().sub(b); const li = din.length(), lo = dout.length();
      if (li < 1e-4){ continue; }
      const r = Math.min(R, li*0.45, lo*0.45); const a = b.clone().addScaledVector(din.normalize(), -r), c = b.clone().addScaledVector(dout.normalize(), r);
      if (cur.distanceTo(a) > 1e-4) cp.add(new THREE.LineCurve3(cur, a));
      cp.add(new THREE.QuadraticBezierCurve3(a, b, c)); cur = c;
    }
    return cp;
  }
  function buildScene(E, G, tags){
    const K = cnLabKit, low = E.low;
    cirEntorno(E);
    /* limpieza de la topología anterior */
    while (G.children.length){ const o = G.children[0]; G.remove(o); o.traverse && o.traverse(q => { if (q.geometry) q.geometry.dispose(); if (q.material){ (Array.isArray(q.material)?q.material:[q.material]).forEach(m=>{ ['map','bumpMap','roughnessMap'].forEach(k => m[k] && m[k].dispose()); m.dispose(); }); } }); }
    tags.innerHTML = '';
    const reg = { lamps:{}, lights:{}, sw:null, tagList:[], pilas:{} };
    const addTag = (key, pos, cls) => { const el = h('div',{class:'cir-tag '+(cls||'')}, ''); tags.append(el); reg.tagList.push({ el, pos:new THREE.Vector3(pos[0],pos[1],pos[2]), key }); return el; };
    const baq = K.plastic(0x2B2F36, { rough:0.45, coat:0.5 }), laton = K.metal(0xC9A55A, { rough:0.28 }), estano = K.metal(0xC2C7CC, { rough:0.3 });
    const tornillo = (x, z, y) => { const t = new THREE.Mesh(K.lathe([[0,0],[0.075,0],[0.075,0.05],[0.06,0.07],[0,0.07]], 14), laton); t.position.set(x, y ?? 0.11, z); G.add(t); const ra = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.012, 0.02), K.metal(0x7A6230, { rough:0.5 })); ra.position.set(x, (y ?? 0.11) + 0.072, z); G.add(ra); };
    const zocalo = (p, w) => { const b = new THREE.Mesh(K.rbox(w || 1.2, 0.08, 0.52, 0.05, 0.025), baq); b.position.set(p[0], 0.07, p[2]); G.add(b); };

    /* cables con aislante de colores (curvas suaves, extremos de cobre) */
    const COLS = [0x1E2226, 0xC8342B, 0xC8342B, 0x2E6FD4, 0xE0B42A, 0x2A9D5B, 0xE07B39, 0x7A4FB5, 0x2E6FD4, 0xE0B42A, 0x2A9D5B];
    const W = wirePaths();
    W.forEach((path, i) => {
      const cp = cirCurva(path); const L = cp.getLength();
      const g = new THREE.TubeGeometry(cp, Math.max(12, Math.round(L * (low ? 10 : 18))), 0.042, low ? 7 : 10, false);
      const m = new THREE.Mesh(g, K.plastic(COLS[i % COLS.length], { rough:0.38, coat:0.55 })); G.add(m);
      [path[0], path[path.length-1]].forEach(q => { const tip = new THREE.Mesh(new THREE.SphereGeometry(0.046, 10, 8), K.metal(0xC47A3A, { rough:0.3 })); tip.position.set(q[0], q[1], q[2]); G.add(tip); });
    });
    /* regletas en los nodos donde se unen tres o más cables */
    (function(){
      const ends = []; W.forEach(p => { ends.push(p[0], p[p.length-1]); });
      const segs = []; W.forEach(p => { for (let i = 0; i < p.length-1; i++) segs.push([p[i], p[i+1]]); });
      const hecho = [];
      ends.forEach(e => {
        if (hecho.some(q => Math.hypot(q[0]-e[0], q[2]-e[2]) < 0.05)) return;
        let n = 0; segs.forEach(([a, b]) => { const ax = b[0]-a[0], az = b[2]-a[2], l2 = ax*ax + az*az; const t = l2 ? clamp(((e[0]-a[0])*ax + (e[2]-a[2])*az)/l2, 0, 1) : 0; if (Math.hypot(a[0]+ax*t-e[0], a[2]+az*t-e[2]) < 0.05) n += (t > 0.02 && t < 0.98) ? 2 : 1; });
        if (n >= 3){ hecho.push(e); const blk = new THREE.Mesh(K.rbox(0.3, 0.12, 0.3, 0.04, 0.02), K.plastic(0xF0EEE6, { rough:0.5 })); blk.position.set(e[0], 0.14, e[2]); G.add(blk); tornillo(e[0], e[2], 0.2); }
      });
    })();

    /* bornes de conexión de la fuente y las tres fuentes posibles (se muestra la elegida) */
    (function(){
      const pr = K.post(0xC8342B, 1.15), ng = K.post(0x1E2226, 1.15); pr.position.set(0.9, 0.08, 1.8); ng.position.set(-0.9, 0.08, 1.8); G.add(pr, ng);
      const baseB = new THREE.Mesh(K.rbox(2.2, 0.08, 0.9, 0.06, 0.03), baq); baseB.position.set(0, 0.07, 1.8); G.add(baseB);
      const lead = (pts, col) => { const c = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))); const m = new THREE.Mesh(new THREE.TubeGeometry(c, 20, 0.028, 7, false), K.plastic(col, { rough:0.4, coat:0.5 })); return m; };
      /* pila de 1,5 V: celda cilíndrica en su portapilas */
      { const g = new THREE.Group(); G.add(g); reg.pilas.p15 = g;
        const lab = K.printed(S2(512), S2(256), (x, w, hh) => { x.fillStyle = '#1C2127'; x.fillRect(0, 0, w, hh); x.fillStyle = '#C8792E'; x.fillRect(0, 0, w, hh*0.3); x.save(); x.translate(w*0.5, hh*0.6); x.rotate(-Math.PI/2); x.fillStyle = '#F4F1EA'; x.font = `800 ${hh*0.22}px "IBM Plex Sans", Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('1,5 V', 0, 0); x.restore(); x.save(); x.translate(w*0.5, hh*0.15); x.rotate(-Math.PI/2); x.fillStyle = '#1C2127'; x.font = `800 ${hh*0.18}px Arial`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+', 0, 0); x.restore(); });
        lab.wrapS = THREE.RepeatWrapping; lab.offset.x = 0.5;
        const cp15 = [[0,0],[0.25,0],[0.27,0.02]]; for (let i = 0; i <= 20; i++) cp15.push([0.27, 0.02 + 1.14*i/20]); cp15.push([0.25,1.18],[0.09,1.18],[0.09,1.23],[0.06,1.25],[0,1.25]);
        const cel = new THREE.Mesh(K.lathe(cp15, low?24:36), new THREE.MeshPhysicalMaterial({ map:lab, roughness:0.35, clearcoat:0.7, metalness:0.1 }));
        cel.geometry.translate(0, -0.62, 0); cel.rotation.z = -Math.PI/2; cel.position.set(0, 0.42, 1.8); g.add(cel);
        const cuna = new THREE.Mesh(K.rbox(1.45, 0.18, 0.62, 0.05, 0.03), K.plastic(0x30343A, { rough:0.6 })); cuna.position.set(0, 0.2, 1.8); g.add(cuna);
        [-0.7, 0.7].forEach(x => { const cl = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.34, 0.3), estano); cl.position.set(x, 0.36, 1.8); g.add(cl); });
        g.add(lead([[0.72,0.3,1.72],[0.82,0.22,1.66],[0.9,0.3,1.72]], 0xC8342B), lead([[-0.72,0.3,1.72],[-0.82,0.22,1.66],[-0.9,0.3,1.72]], 0x1E2226)); }
      /* petaca de 4,5 V: tres celdas en una caja con láminas de latón */
      { const g = new THREE.Group(); G.add(g); reg.pilas.p45 = g;
        const lab = K.printed(S2(512), S2(256), (x, w, hh) => { const gr = x.createLinearGradient(0, 0, 0, hh); gr.addColorStop(0, '#2F6DB5'); gr.addColorStop(1, '#1E4F8C'); x.fillStyle = gr; x.fillRect(0, 0, w, hh); x.fillStyle = '#F2C230'; x.fillRect(0, hh*0.62, w, hh*0.12); x.fillStyle = '#FFFFFF'; x.font = `800 ${hh*0.34}px "IBM Plex Sans", Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('4,5 V', w/2, hh*0.34); x.font = `600 ${hh*0.1}px Arial`; x.fillStyle = '#1E2A38'; x.fillText('3 celdas · 3 × 1,5 V', w/2, hh*0.68); });
        const caja = new THREE.Mesh(K.rbox(1.15, 0.62, 0.62, 0.05, 0.03), [new THREE.MeshPhysicalMaterial({ map:lab, roughness:0.4, clearcoat:0.6 }), K.plastic(0x245C9E, { rough:0.45 })]); caja.position.set(0, 0.42, 1.8); g.add(caja);
        const tapa = new THREE.Mesh(K.rbox(1.12, 0.05, 0.6, 0.03, 0.015), K.plastic(0x1E2A38, { rough:0.5 })); tapa.position.set(0, 0.74, 1.8); g.add(tapa);
        [[-0.32, 0.36], [0.34, 0.2]].forEach(([x, l]) => { const lm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.012, l), laton); lm.position.set(x, 0.775, 1.8 - 0.05); lm.rotation.x = 0.25; g.add(lm); });
        g.add(lead([[0.34,0.78,1.62],[0.7,0.55,1.62],[0.9,0.32,1.72]], 0xC8342B), lead([[-0.32,0.78,1.56],[-0.7,0.55,1.6],[-0.9,0.32,1.72]], 0x1E2226)); }
      /* batería de 9 V con broche de presión */
      { const g = new THREE.Group(); G.add(g); reg.pilas.p90 = g;
        const lab = K.printed(S2(512), S2(256), (x, w, hh) => { x.fillStyle = '#23272D'; x.fillRect(0, 0, w, hh); x.fillStyle = '#E07B39'; x.fillRect(w*0.62, 0, w*0.38, hh); x.fillStyle = '#FFFFFF'; x.font = `800 ${hh*0.4}px "IBM Plex Sans", Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('9 V', w*0.32, hh*0.5); x.fillStyle = '#23272D'; x.font = `700 ${hh*0.14}px Arial`; x.fillText('+  −', w*0.81, hh*0.5); });
        const bat = new THREE.Mesh(K.rbox(1.0, 0.36, 0.56, 0.05, 0.03), [new THREE.MeshPhysicalMaterial({ map:lab, roughness:0.4, clearcoat:0.6 }), K.plastic(0x23272D, { rough:0.5 })]); bat.position.set(-0.08, 0.3, 1.8); g.add(bat);
        const snap = new THREE.Mesh(K.rbox(0.07, 0.3, 0.44, 0.03, 0.015), K.plastic(0x15181C, { rough:0.6 })); snap.position.set(0.46, 0.3, 1.8); g.add(snap);
        g.add(lead([[0.5,0.36,1.7],[0.72,0.4,1.66],[0.9,0.32,1.72]], 0xC8342B), lead([[0.5,0.26,1.9],[0.35,0.12,2.18],[-0.5,0.12,2.18],[-0.9,0.32,1.9]], 0x1E2226)); }
      addTag('pila',[0,1.05,1.8]);
      addTag('bornes',[-1.75,0.25,2.2]);
    })();

    /* interruptor de cuchilla */
    (function(){
      zocalo([2.0, 0, 1.8], 1.12);
      const plac = (x, h2) => { [-0.07, 0.07].forEach(dz => { const p = new THREE.Mesh(new THREE.BoxGeometry(0.1, h2, 0.025), laton); p.position.set(x, 0.11 + h2/2, 1.8 + dz); G.add(p); }); };
      plac(1.6, 0.26); plac(2.42, 0.22);
      tornillo(1.6, 1.8 + 0.2); tornillo(2.42, 1.8 + 0.2);
      const pal = new THREE.Group();
      const hoja = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.035), K.metal(0xC98A4A, { rough:0.25 })); hoja.position.set(0.45, 0, 0); pal.add(hoja);
      const eje = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.2, 10), laton); eje.rotation.x = Math.PI/2; pal.add(eje);
      const mango = new THREE.Mesh(K.lathe([[0,0],[0.05,0],[0.06,0.05],[0.05,0.2],[0.065,0.26],[0.05,0.3],[0,0.31]], 16), K.plastic(0xD24B3E, { rough:0.35, coat:0.6 })); mango.position.set(0.86, 0.02, 0); pal.add(mango);
      pal.position.set(1.6, 0.33, 1.8); G.add(pal);
      reg.sw = pal; pal.rotation.z = L.closed ? 0 : 0.85;
      addTag('sw',[2.0,0.95,1.8]);
    })();

    /* focos y resistencia */
    const solRef = solve();
    solRef.comps.forEach(c => {
      const p = compPos(c.id);
      if (c.tipo==='foco'){
        zocalo(p); tornillo(p[0] - 0.5, p[2]); tornillo(p[0] + 0.5, p[2]);
        const g = new THREE.Group(); g.position.set(p[0],0,p[2]);
        const porta = new THREE.Mesh(K.lathe([[0,0.11],[0.19,0.11],[0.2,0.14],[0.18,0.3],[0.15,0.33],[0,0.33]], 24), K.plastic(0x1E2226, { rough:0.4, coat:0.5 })); g.add(porta);
        const rp = []; for (let i = 0; i <= 16; i++){ const y = 0.32 + i*0.0095; rp.push([0.105 + 0.012*Math.sin(i*Math.PI*0.5), y]); } rp.unshift([0, 0.32]); rp.push([0.085, 0.48], [0, 0.48]);
        const rosca = new THREE.Mesh(K.lathe(rp, 20), K.metal(0xC4B38A, { rough:0.3 })); g.add(rosca);
        /* ampolla de vidrio (perfil de foco clásico) */
        const bp = [[0.1, 0.46], [0.11, 0.5]], Rb = 0.25, yc = 0.76, a0 = Math.asin(0.13/Rb); for (let i = 0; i <= 18; i++){ const a = a0 + (Math.PI - a0)*i/18; bp.push([Rb*Math.sin(a), yc - Rb*Math.cos(a)]); }
        const bulbo = new THREE.Mesh(K.lathe(bp, low?24:40), new THREE.MeshPhysicalMaterial({ color:0xffffff, roughness:0.05, metalness:0, transparent:true, opacity:0.24, clearcoat:1, emissive:0x000000, depthWrite:false, envMapIntensity:2, side:THREE.DoubleSide }));
        bulbo.renderOrder = 2; g.add(bulbo);
        const soporte = new THREE.MeshStandardMaterial({ color:0x9AA2AA, metalness:0.8, roughness:0.35 });
        [-0.07, 0.07].forEach(x => { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.26, 5), soporte); s.position.set(x, 0.6, 0); g.add(s); });
        const tallo = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.045, 0.14, 10), K.glass({ opacity:0.5 })); tallo.position.y = 0.52; g.add(tallo);
        /* filamento: espiral de tungsteno en dos mitades (la segunda cae si se quema) */
        const filMat = new THREE.MeshStandardMaterial({ color:0x4a3a22, emissive:0xFFB347, emissiveIntensity:0, roughness:0.6 });
        const hel = (dir) => { const pts = []; const n = 60; for (let i = 0; i <= n; i++){ const u = i/n, a = u*Math.PI*2*5; pts.push(new THREE.Vector3(dir*u*0.07, 0.016*Math.sin(a), 0.016*Math.cos(a))); } return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), low?80:140, 0.0055, 5, false), filMat); };
        const fa = new THREE.Group(); fa.position.set(-0.07, 0.73, 0); fa.add(hel(1)); g.add(fa);
        const fb = new THREE.Group(); fb.position.set(0.07, 0.73, 0); fb.add(hel(-1)); g.add(fb);
        const luz = new THREE.PointLight(0xFFD7A0, 0, 5.5, 2); luz.position.set(p[0],0.75,p[2]); G.add(luz);
        const halo = K.halo(0xFFC878, 1.9, 0); halo.position.y = 0.74; g.add(halo);
        G.add(g);
        reg.lamps[c.id] = { g, bulbo, fil:fa, filMat, luz, halo, burnT:-1, fb };
        reg.lights[c.id] = luz;
        addTag('lamp:'+c.id,[p[0],1.3,p[2]]);
      } else {
        zocalo(p); tornillo(p[0] - 0.5, p[2]); tornillo(p[0] + 0.5, p[2]);
        const g = new THREE.Group(); g.position.set(p[0],0.3,p[2]);
        const rf = u => 0.125 + 0.045*Math.pow(Math.cos(u*Math.PI), 6) - (u < 0.04 || u > 0.96 ? 0.05 : 0);
        const perfil = []; for (let i = 0; i <= 24; i++){ const u = i/24; perfil.push([rf(u), -0.42 + u*0.84]); } perfil.unshift([0, -0.42]); perfil.push([0, 0.42]);
        const cuerpo = new THREE.Mesh(K.lathe(perfil, 24), K.plastic(0xD9C9A0, { rough:0.55, coat:0.4 })); cuerpo.rotation.z = Math.PI/2; g.add(cuerpo);
        const pos = [-0.26, -0.15, -0.04, 0.26];
        RR().bandas.forEach((b,i)=>{ const ex = rf((pos[i] + 0.42)/0.84) + 0.007; const banda = new THREE.Mesh(new THREE.CylinderGeometry(ex, ex, 0.055, 24), b==='ora' ? K.metal(BAND[b], { rough:0.3 }) : K.plastic(BAND[b], { rough:0.5, coat:0.4 })); banda.rotation.z = Math.PI/2; banda.position.x = pos[i]; g.add(banda); });
        [-1, 1].forEach(s => { const c2 = new THREE.CatmullRomCurve3([new THREE.Vector3(s*0.4, 0, 0), new THREE.Vector3(s*0.5, 0, 0), new THREE.Vector3(s*0.5, -0.14, 0), new THREE.Vector3(s*0.5, -0.19, 0)]); g.add(new THREE.Mesh(new THREE.TubeGeometry(c2, 12, 0.014, 6, false), estano)); });
        G.add(g);
        addTag('res',[p[0],0.95,p[2]]);
      }
    });

    /* instrumentos: multímetros digitales (amperímetro en serie, voltímetro en paralelo) */
    const instr = (funda, unidad) => {
      const g = new THREE.Group(), cuerpo = new THREE.Group();
      const f = new THREE.Mesh(K.rbox(0.74, 1.0, 0.18, 0.1, 0.05), K.plastic(funda, { rough:0.7, coat:0.1 })); cuerpo.add(f);
      const cara = K.printed(S2(256), S2(360), (x, w, hh) => { x.fillStyle = '#2B3036'; x.fillRect(0, 0, w, hh); x.strokeStyle = '#DDE3E8'; x.lineWidth = 3; const cx = w/2, cy = hh*0.6; x.beginPath(); x.arc(cx, cy, w*0.26, 0, Math.PI*2); x.stroke(); const ap = unidad === 'A' ? -0.8 : -2.3; x.strokeStyle = '#F4F6F8'; x.lineWidth = w*0.03; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(ap)*w*0.24, cy - Math.cos(ap)*w*0.24); x.stroke(); x.fillStyle = '#DDE3E8'; x.font = `700 ${w*0.075}px Arial`; x.textAlign = 'center'; [['V', -2.3], ['A', -0.8], ['Ω', 0.8], ['OFF', 2.3]].forEach(([t2, a]) => x.fillText(t2, cx + Math.sin(a)*w*0.36, cy - Math.cos(a)*w*0.36 + 6)); [['COM', 0.3, '#DDE3E8'], ['V Ω', 0.5, '#E05548'], ['A', 0.7, '#E05548']].forEach(([t2, px, col]) => { x.fillStyle = col; x.font = `700 ${w*0.06}px Arial`; x.fillText(t2, w*px, hh*0.97); }); });
      const pan = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.84), new THREE.MeshPhysicalMaterial({ map:cara, roughness:0.5, clearcoat:0.3 })); pan.position.set(0, -0.04, 0.092); cuerpo.add(pan);
      const lcd = K.lcd({ w:256, h:96, text:'0,00 ' + unidad });
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.2), lcd.mat); pl.position.set(0, 0.3, 0.095); cuerpo.add(pl);
      const perilla = new THREE.Mesh(K.lathe([[0,0],[0.075,0],[0.075,0.04],[0.06,0.055],[0,0.055]], 20), K.plastic(0x1A1D21, { rough:0.5 })); perilla.rotation.x = Math.PI/2; perilla.position.set(0, -0.124, 0.094); cuerpo.add(perilla);
      [[-0.2, 0x1A1D21], [0, 0xC8342B], [0.2, 0xC8342B]].forEach(([x, col]) => { const j = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 12), K.plastic(col)); j.rotation.x = Math.PI/2; j.position.set(x, -0.38, 0.1); cuerpo.add(j); });
      cuerpo.rotation.x = -1.12; cuerpo.position.y = 0.28;
      g.add(cuerpo); G.add(g); g.userData.lcd = lcd; return g;
    };
    reg.amp = instr(0xE8B730, 'A'); reg.volt = instr(0xE0703A, 'V');
    addTag('amp',[0,0,0],'med'); addTag('volt',[0,0,0],'med');
    return reg;
  }
  const S2 = n => cnLabKit.low() ? n/2 : n;

  /* =====================================================================
     ESQUEMA 2D (sin WebGL o a pedido): símbolos normalizados
     ===================================================================== */
  function esquemaSVG(r){
    const est = c => c.quemado ? 'cir-lamp-burn' : (c.brillo>0.05 ? 'cir-lamp-on' : 'cir-lamp-off');
    const lamp = (x,y,c) => `<g><circle cx="${x}" cy="${y}" r="16" class="${est(c)}" stroke="var(--ink)" stroke-width="2"/><path d="M${x-11} ${y-11} L${x+11} ${y+11} M${x+11} ${y-11} L${x-11} ${y+11}" stroke="var(--ink)" stroke-width="2" fill="none"/><text class="cir-lbl" x="${x}" y="${y-22}" text-anchor="middle">${esc(c.n)}</text><text class="cir-lbl" x="${x}" y="${y+30}" text-anchor="middle">${nf(c.U)} V · ${nf(c.I)} A</text></g>`;
    const resi = (x,y,c) => `<g><rect x="${x-22}" y="${y-10}" width="44" height="20" fill="var(--bg-3)" stroke="var(--ink)" stroke-width="2"/><text class="cir-lbl" x="${x}" y="${y-16}" text-anchor="middle">${nf(c.R,0)} Ω</text><text class="cir-lbl" x="${x}" y="${y+28}" text-anchor="middle">${nf(c.U)} V · ${nf(c.I)} A</text></g>`;
    const pila = (x,y) => `<g><path d="M${x-10} ${y-16} L${x-10} ${y+16} M${x+2} ${y-9} L${x+2} ${y+9}" stroke="var(--ink)" stroke-width="3"/><text class="cir-lbl" x="${x}" y="${y+34}" text-anchor="middle">${nf(r.V,1)} V</text></g>`;
    const inter = (x,y,on) => `<g><circle cx="${x-14}" cy="${y}" r="3.5" fill="var(--ink)"/><circle cx="${x+14}" cy="${y}" r="3.5" fill="var(--ink)"/><path d="M${x-14} ${y} L${x+14} ${y+(on?0:-16)}" stroke="var(--ink)" stroke-width="2.5"/><text class="cir-lbl" x="${x}" y="${y+22}" text-anchor="middle">${on?'cerrado':'abierto'}</text></g>`;
    const medi = (x,y,t,val) => `<g><circle cx="${x}" cy="${y}" r="14" fill="var(--bg-2)" stroke="var(--ink)" stroke-width="2"/><text x="${x}" y="${y+5}" text-anchor="middle" font-weight="700">${t}</text><text class="cir-lbl" x="${x}" y="${y-20}" text-anchor="middle">${val}</text></g>`;
    const C = id => r.comps.find(c=>c.id===id) || { n:'', U:0, I:0, R:0, brillo:0, quemado:false };
    let body = '';
    if (L.topo==='uno'){ body = `<path d="M60 200 L60 70 L200 70 M260 70 L400 70 L400 200 L330 200 M290 200 L60 200" stroke="var(--ink)" stroke-width="2" fill="none"/>` + lamp(230,70,C('L1')); }
    else if (L.topo==='serie2' || L.topo==='focoR'){ body = `<path d="M60 200 L60 70 L134 70 M186 70 L274 70 M326 70 L400 70 L400 200 L330 200 M290 200 L60 200" stroke="var(--ink)" stroke-width="2" fill="none"/>` + lamp(160,70,C('L1')) + (L.topo==='serie2' ? lamp(300,70,C('L2')) : resi(300,70,C('R1'))); }
    else if (L.topo==='par2'){ body = `<path d="M60 200 L60 120 L150 120 M150 120 L150 50 L184 50 M216 50 L310 50 L310 120 M150 120 L150 160 L184 160 M216 160 L310 160 L310 120 M310 120 L400 120 L400 200 L330 200 M290 200 L60 200" stroke="var(--ink)" stroke-width="2" fill="none"/>` + lamp(200,50,C('L1')) + lamp(200,160,C('L2')); }
    else { body = `<path d="M60 200 L60 110 L104 110 M156 110 L200 110 M200 110 L200 50 L234 50 M266 50 L340 50 L340 110 M200 110 L200 170 L234 170 M266 170 L340 170 L340 110 M340 110 L400 110 L400 200 L330 200 M290 200 L60 200" stroke="var(--ink)" stroke-width="2" fill="none"/>` + lamp(130,110,C('L1')) + lamp(250,50,C('L2')) + lamp(250,170,C('L3')); }
    const ap = ampPoints()[L.amp] || ampPoints()[0], vp = voltPoints(r)[L.volt] || voltPoints(r)[0];
    const svg = `<svg class="cir-svg" viewBox="0 0 460 250" role="img" aria-label="Esquema del circuito: ${esc(TOPOS.find(t=>t.id===L.topo).n)}, interruptor ${L.closed?'cerrado':'abierto'}">
      ${body}
      ${pila(175,200)}
      ${inter(320,200,L.closed)}
      ${medi(90,230,'A', nf(ampRead(r,ap.id),2)+' A')}
      ${medi(430,160,'V', nf(voltRead(r,vp.id),2)+' V')}
    </svg>
    <p class="small muted" style="margin-top:8px">Amperímetro (A): ${esc(ap.n)}. Voltímetro (V): ${esc(vp.n)}. Interruptor ${L.closed?'cerrado':'abierto'} · corriente total ${nf(r.I)} A.</p>`;
    return svg;
  }

  /* =====================================================================
     VISTA
     ===================================================================== */
  route('/cn/lab/circuitos', (view) => {
    view.classList.add('wide');
    view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
      h('div',{},
        h('span',{class:'eyebrow lab'},'Laboratorio · 9.º EGB Superior · Ciencias Físicas · Unidad 2'),
        h('h1',{},'Electricidad y circuitos: ¿de qué depende que un foco brille más?'),
        h('p',{},'Arma circuitos de baja tensión en una mesa virtual, mide con el amperímetro y el voltímetro, y comprueba la ley de Ohm con tus propios datos. Se articula con la Unidad 3 de 10.º (electricidad, magnetismo y ondas).')),
      h('span',{class:'pill lab'},'+120 XP')));

    /* ---- franja superior: propósito · qué observar · reto (marcado propio) ---- */
    const retoEstado = h('div',{class:'notice'},'Pendiente: arma primero el circuito de un foco y después el de dos focos en paralelo con la misma pila.');
    const franja = h('section',{class:'reto static'},
      h('div',{class:'reto-body'},
        h('div',{class:'reto-col'},
          h('span',{class:'eyebrow'},'Propósito'),
          h('p',{},'Comprender que la corriente depende del voltaje y de la resistencia (I = V/R), y que la forma de conectar los componentes —en serie o en paralelo— cambia el voltaje, la corriente y el brillo de cada foco.')),
        h('div',{class:'reto-col'},
          h('span',{class:'eyebrow'},'Qué observar'),
          h('ul',{class:'checks plain'},
            h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), 'Qué le pasa al brillo de cada foco al pasar de serie a paralelo.'),
            h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), 'Cómo cambia la lectura del amperímetro al cambiar la pila o la resistencia.'),
            h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), 'Qué mide el voltímetro en el interruptor abierto y por qué no circula corriente.'),
            h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), 'Qué potencia soporta un foco antes de quemarse.'))),
        h('div',{class:'reto-col'},
          h('span',{class:'eyebrow'},'🎯 Reto'),
          h('p',{style:'font-weight:600'},'Consigue que dos focos brillen igual de fuerte que uno solo y explica por qué. Después responde la pregunta de análisis y la de seguridad eléctrica.'),
          retoEstado)));
    view.append(franja);

    view.append(h('div',{class:'notice warn cir-safe'}, h('span',{},
      h('b',{},'Seguridad eléctrica. '),
      'Este laboratorio es una simulación de baja tensión (1,5 V a 9 V con pilas). Nunca experimentes con la red domiciliaria de 110 V o 220 V: esa tensión puede atravesar el cuerpo y provocar quemaduras, paro cardíaco o incendios. En casa se trabaja siempre con el interruptor general (breaker) desconectado y con un adulto o un técnico calificado.')));

    /* ---- escenario 3D + panel ---- */
    const stage = h('div',{class:'stage',style:'height:600px;min-height:600px'}), panel = h('div',{class:'panel',style:'align-self:start'});
    view.append(h('div',{class:'viewer'}, stage, panel));
    const tags = h('div',{class:'cir-ovl','aria-hidden':'true'}); stage.append(tags);
    const esq2d = h('div',{style:'position:absolute;inset:12px;display:none;overflow:auto;z-index:1;background:var(--bg-2);border:1px solid var(--line);border-radius:12px;padding:12px'});
    stage.append(esq2d);

    let E = null, G = null, reg = null, frameOn = false;
    if (webglOK){
      try {
        const estrecho = stage.clientWidth < stage.clientHeight * 0.9;   /* en el celular, vista más cenital para llenar el alto */
        E = new Engine3D(stage, { radius:cnLabKit.fitR(stage, 10.4, 1.3, estrecho ? 0.72 : 0.85), phi:estrecho ? 0.7 : 0.96, theta:estrecho ? 0.12 : 0.26, minR:4, maxR:22, target:[0,0.3,0.0], floor:0.085, floorSize:8.5, exposure:1.0, interactive:true,
          aria:'Mesa de circuitos en 3D. Arrastra para rotar, rueda para acercar. Todos los controles del laboratorio están también como botones en el panel de la derecha.' });
      } catch(e){ console.warn('circuitos 3D', e); E = null; }
    }
    if (E){ G = new THREE.Group(); E.scene.add(G); }
    else {
      L.esquema = true;
      stage.append(h('div',{class:'ph',style:'position:absolute;top:12px;left:12px;right:12px;z-index:0'},'Sin WebGL: trabajas con el esquema normalizado en 2D. Los cálculos, las mediciones, la tabla y el reto funcionan igual.'));
    }

    /* ---- panel: bloques ---- */
    const bTopo = h('div',{class:'card stack'}), bComp = h('div',{class:'card stack'}),
          bPred = h('div',{class:'card stack'}), bMed = h('div',{class:'card stack'}),
          bLect = h('div',{class:'card stack'});
    panel.append(bTopo, bComp, bPred, bMed, bLect);

    const stageTop = h('div',{class:'stage-top'}); stage.append(stageTop);
    const btnSw = h('button',{class:'btn primary sm',onclick:()=>toggleSw()},'Cerrar interruptor');
    const btnEsq = h('button',{class:'btn sm',onclick:()=>{ L.esquema = !L.esquema; render(); }}, 'Ver esquema 2D');
    const btnVista = h('button',{class:'btn sm ghost',onclick:()=>E && E.resetView()},'↺ Vista');
    stageTop.append(btnSw, btnEsq, E ? btnVista : null);

    /* ---------- construcción de la escena ---------- */
    function rebuild(){
      if (!E) return;
      try { reg = buildScene(E, G, tags); } catch(e){ console.warn('circuitos 3D', e); reg = null; L.esquema = true; }
      if (!frameOn){ frameOn = true; E.onFrame((t,dt)=>frame(t,dt)); }
    }

    /* ---------- animación por cuadro ---------- */
    function frame(t, dt){
      if (!reg) return;
      const r = solve();
      /* interruptor */
      if (reg.sw){ const goal = L.closed ? 0 : 0.85; reg.sw.rotation.z += (goal - reg.sw.rotation.z) * (anim() ? Math.min(1, dt*10) : 1); }
      /* focos */
      r.comps.forEach(c => {
        const lm = reg.lamps[c.id]; if (!lm) return;
        if (lm.burnT >= 0){
          /* destello, el filamento se corta y el vidrio queda ahumado */
          lm.burnT += dt;
          const k = Math.max(0, 1 - lm.burnT*2.2);
          lm.filMat.emissiveIntensity = 10*k; lm.filMat.emissive.setHex(0xFFF1D0);
          lm.luz.intensity = 7*k;
          lm.halo.material.opacity = 0.9*k; lm.halo.scale.setScalar(1.6 + 2.2*k);
          lm.bulbo.material.color.setHex(0x6A625A); lm.bulbo.material.opacity = Math.min(0.62, 0.24 + lm.burnT*0.4);
          if (lm.fb) lm.fb.rotation.z = -Math.min(1, lm.burnT/1.2)*0.95;
          if (lm.burnT > 1.2){ lm.burnT = -2; lm.filMat.emissiveIntensity = 0; lm.luz.intensity = 0; lm.halo.material.opacity = 0; lm.filMat.color.setHex(0x1b1b1b); lm.bulbo.material.emissive.setHex(0x000000); if (lm.fb) lm.fb.rotation.z = -0.95; }
        } else if (lm.burnT === -1){
          const b = c.brillo;
          const flick = anim() ? 1 + 0.03*Math.sin(t*23 + c.id.charCodeAt(1)) : 1;
          /* el color del filamento pasa de rojo apagado a blanco cálido según la potencia */
          const kb = clamp(b, 0, 1.4)/1.4;
          lm.filMat.emissive.setHSL(0.03 + 0.09*kb, 1, 0.42 + 0.3*kb);
          lm.filMat.emissiveIntensity = b*7*flick;
          lm.luz.intensity = b*4.5*flick;
          lm.halo.material.opacity = clamp(b,0,1.2)*0.62*flick;
          lm.halo.scale.setScalar(1.1 + 1.3*clamp(b, 0, 2));
          lm.bulbo.material.emissive.setHex(b>0.02 ? 0xFFC069 : 0x000000);
          lm.bulbo.material.emissiveIntensity = clamp(b,0,1.5)*0.55;
        }
      });
      /* instrumentos: se colocan en el punto elegido */
      const ap = ampPoints()[L.amp] || ampPoints()[0];
      const vp = voltPoints(r)[L.volt] || voltPoints(r)[0];
      if (reg.amp){ reg.amp.position.set(ap.pos[0], 0.03, ap.pos[2]); reg.amp.userData.lcd.set(nf(ampRead(r, ap.id), 2)+' A'); }
      if (reg.volt){ reg.volt.position.set(vp.pos[0], 0.03, vp.pos[2] + 0.95); reg.volt.userData.lcd.set(nf(voltRead(r, vp.id), 2)+' V'); }
      if (reg.pilas) Object.keys(reg.pilas).forEach(k => { reg.pilas[k].visible = (k === L.pila); });
      /* etiquetas proyectadas */
      const W = stage.clientWidth, H = stage.clientHeight, v = new THREE.Vector3();
      reg.tagList.forEach(tg => {
        let pos = tg.pos, txt = '', cls = '';
        if (tg.key === 'pila'){ txt = P().n; }
        else if (tg.key === 'bornes'){ txt = '− borne · borne +'; }
        else if (tg.key === 'sw'){ txt = L.closed ? 'interruptor cerrado' : 'interruptor abierto'; cls = L.closed ? '' : 'off'; }
        else if (tg.key === 'res'){ txt = RR().n; }
        else if (tg.key.startsWith('lamp:')){
          const id = tg.key.slice(5), c = r.comps.find(x=>x.id===id);
          if (!c) return;
          txt = c.quemado ? c.n+' · quemado' : `${c.n} · ${nf(c.Pw)} W`;
          cls = c.quemado ? 'burn' : (c.brillo>0.02 ? '' : 'off');
        }
        else if (tg.key === 'amp'){ pos = [ap.pos[0] + 0.66, 0.6, ap.pos[2]]; txt = nf(ampRead(r, ap.id), 2)+' A'; cls = 'med'; }
        else if (tg.key === 'volt'){ pos = [vp.pos[0] + 0.66, 0.6, vp.pos[2]+0.95]; txt = nf(voltRead(r, vp.id), 2)+' V'; cls = 'med'; }
        if (pos.isVector3) v.copy(pos); else v.set(pos[0], pos[1], pos[2]);
        v.project(E.camera);
        if (v.z > 1){ tg.el.style.display='none'; return; }
        tg.el.style.display = '';
        tg.el.className = 'cir-tag '+cls;
        tg.el.textContent = txt;
        tg.el.style.left = clamp((v.x+1)/2*W, 56, W-56)+'px';
        tg.el.style.top  = clamp((1-v.y)/2*H, 16, H-16)+'px';
      });
    }

    /* ---------- quemado de focos ---------- */
    function checkBurn(){
      const r = solve();
      if (!r.quemados.length) return false;
      r.quemados.forEach(id => {
        L.burned[id] = true;
        if (reg && reg.lamps[id]) reg.lamps[id].burnT = anim() ? 0 : 1.3;
      });
      const c = r.comps.find(x=>x.id===r.quemados[0]);
      msg('bad', `<b>¡Se quemó el ${c.n}!</b> La potencia disipada fue de ${nf(c.Pw)} W y el foco solo soporta hasta ${nf(2*F().Pn)} W (el doble de su potencia nominal de ${nf(F().Pn)} W). Con ${nf(r.V,1)} V sobre ${nf(c.R,0)} Ω circulan ${nf(c.I)} A: P = V·I = ${nf(c.U)} V × ${nf(c.I)} A = ${nf(c.Pw)} W. El filamento se calentó por encima de su límite y se cortó. Usa una pila de menor voltaje o agrega una resistencia en serie.`);
      Store.log('laboratorio',{ lab:'cn-circuitos', evento:'foco_quemado', topologia:L.topo, pila:P().V, foco:F().R, potencia:+c.Pw.toFixed(2) });
      render();
      return true;
    }

    const aviso = h('div',{class:'notice',style:'display:none'});
    function msg(kind, html){ aviso.className = 'notice '+(kind||''); aviso.innerHTML = '<span>'+html+'</span>'; aviso.style.display='flex'; }

    /* ---------- interruptor ---------- */
    function toggleSw(){
      if (!L.closed && L.pred === null && PREDS[L.topo]){
        msg('warn','Antes de cerrar el interruptor, <b>predice qué va a pasar con el brillo</b>. Elige una opción en el bloque «Predice antes de conectar».');
        bPred.scrollIntoView && bPred.scrollIntoView({ block:'nearest' });
        return;
      }
      L.closed = !L.closed;
      Store.log('laboratorio',{ lab:'cn-circuitos', evento: L.closed?'cerrar_interruptor':'abrir_interruptor', topologia:L.topo, pila:P().V, foco:F().R });
      if (L.closed){
        const r = solve();
        if (!checkBurn()){
          registrarLogro(r);
          if (L.pred !== null) feedbackPred(r);
        }
      } else msg('', 'Interruptor abierto: el circuito está interrumpido, no hay camino cerrado y la corriente es de 0,00 A. El voltímetro colocado en el interruptor marca los '+nf(P().V,1)+' V completos de la pila.');
      render();
    }

    /* ---------- reto: dos focos igual de fuerte que uno ---------- */
    function registrarLogro(r){
      const clave = L.pila+'|'+L.foco;
      if (L.topo==='uno'){ const c = r.comps[0]; if (!c.quemado && c.Pw>0.001) L.logrado.uno = { clave, P:c.Pw }; }
      if (L.topo==='par2'){ const ok = r.comps.every(c=>!c.quemado && c.Pw>0.001); if (ok) L.logrado.par2 = { clave, P:r.comps[0].Pw, P2:r.comps[1].Pw }; }
      const a = L.logrado.uno, b = L.logrado.par2;
      if (a && b && a.clave===b.clave && Math.abs(a.P-b.P) < 0.01*Math.max(a.P,1e-9) + 1e-6 && !L.retoConfig){
        L.retoConfig = true;
        msg('ok', `<b>¡Lo conseguiste!</b> Con la misma pila de ${nf(P().V,1)} V, cada uno de los dos focos en paralelo disipa ${nf(b.P)} W, exactamente la misma potencia que el foco solo (${nf(a.P)} W). En paralelo, cada foco está conectado directamente a los dos bornes de la pila, así que recibe el voltaje completo. Lo que sí cambia es la corriente total: la pila entrega el doble (${nf(r.I)} A) y se descargará en la mitad del tiempo.`);
        Store.log('laboratorio',{ lab:'cn-circuitos', evento:'reto_configuracion', pila:P().V, foco:F().R });
        checkDone();
      }
    }

    /* ---------- predicciones ---------- */
    const PREDS = {
      uno: { q:'¿Qué marcará el amperímetro al cerrar el interruptor?',
        ops:[ 'La corriente será mayor si uso una pila de más voltaje',
              'La corriente será la misma con cualquier pila, porque el foco es el mismo',
              'La corriente será menor si uso una pila de más voltaje' ],
        ok:0,
        wrong:[ null,
          'La resistencia del foco no cambia, pero la corriente sí: I = V/R. Si el voltaje sube y la resistencia se mantiene, la corriente aumenta proporcionalmente.',
          'Es al revés: en I = V/R, al aumentar V con R constante, la corriente aumenta, no disminuye.' ] },
      serie2: { q:'Con dos focos en serie y la misma pila, ¿cómo brillará cada foco comparado con un solo foco?',
        ops:[ 'Los dos brillarán igual de fuerte que el foco solo',
              'Los dos brillarán más débil que el foco solo',
              'El primero brillará fuerte y el segundo casi no brillará' ],
        ok:1,
        wrong:[ 'Es el error más común. En serie la resistencia total se duplica (R + R), así que la corriente se reduce a la mitad y cada foco recibe solo la mitad del voltaje. Con la mitad de voltaje y la mitad de corriente, la potencia de cada foco baja a la cuarta parte: P = (V/2)·(I/2).',
                null,
                'En serie la corriente es la misma en todo el circuito: por el primer foco y por el segundo pasa exactamente la misma cantidad de electrones por segundo. La corriente no "se gasta" en el primer foco; lo que se reparte es el voltaje.' ] },
      par2: { q:'Con dos focos en paralelo y la misma pila, ¿cómo brillará cada foco comparado con un solo foco?',
        ops:[ 'Cada uno brillará la mitad, porque se reparten la energía',
              'Cada uno brillará igual de fuerte que el foco solo',
              'Cada uno brillará más que el foco solo' ],
        ok:1,
        wrong:[ 'El voltaje no se reparte en paralelo: cada foco está conectado a los mismos dos nodos, o sea a los bornes de la pila, y recibe el voltaje completo. Lo que se duplica es la corriente total que entrega la pila, no el brillo que se reparte.',
                null,
                'Cada foco recibe el mismo voltaje que recibía el foco solo, ni más ni menos. No puede brillar más, porque su resistencia no cambió.' ] },
      focoR: { q:'Al poner una resistencia en serie con el foco, ¿qué esperas?',
        ops:[ 'El foco brillará menos, porque la resistencia total aumenta y la corriente baja',
              'El foco brillará igual, porque la resistencia no consume energía',
              'El foco brillará más, porque la resistencia le "empuja" corriente' ],
        ok:0,
        wrong:[ null,
          'La resistencia sí disipa energía en forma de calor y, sobre todo, aumenta la resistencia total: R total = R foco + R resistencia. Con más resistencia y el mismo voltaje, la corriente baja (I = V/R).',
          'Una resistencia nunca aumenta la corriente: se opone al paso de los electrones. Por eso se usa justamente para proteger componentes delicados.' ] },
      mixto: { q:'Un foco en serie con dos focos en paralelo. ¿Cuál brillará más?',
        ops:[ 'Los dos focos en paralelo, porque son dos',
              'El foco que está en serie, porque por él pasa toda la corriente',
              'Los tres brillarán igual' ],
        ok:1,
        wrong:[ 'Por cada foco del paralelo pasa la mitad de la corriente total; por el foco en serie pasa toda. Con la misma resistencia, más corriente significa más potencia: P = I²·R.',
                null,
                'No brillan igual: el conjunto en paralelo tiene la mitad de resistencia que un foco solo, así que sobre él cae menos voltaje que sobre el foco en serie.' ] }
    };
    function feedbackPred(r){
      const pr = PREDS[L.topo]; if (!pr) return;
      const ok = L.pred === pr.ok;
      const lista = r.comps.filter(c=>c.tipo==='foco').map(c=>`${c.n}: ${nf(c.U)} V · ${nf(c.I)} A · ${nf(c.Pw)} W`).join(' | ');
      msg(ok ? 'ok' : 'warn',
        (ok ? '<b>Tu predicción se cumplió.</b> ' : '<b>Lo que observas no coincide con tu predicción.</b> ')
        + (ok ? '' : esc(pr.wrong[L.pred] || '') + ' ')
        + `Mediciones del modelo: ${esc(lista)}. Resistencia equivalente: ${isFinite(r.Req)?nf(r.Req):'∞'} Ω · corriente total: ${nf(r.I)} A.`);
      Store.log('laboratorio',{ lab:'cn-circuitos', evento:'prediccion', topologia:L.topo, opcion:L.pred, correcto:ok });
    }

    /* ---------- render del panel ---------- */
    function pickRow(title, items, current, onPick, aria){
      const g = h('div',{class:'cir-grid',role:'group','aria-label':aria||title});
      items.forEach(it => g.append(h('button',{ class:'cir-opt', 'aria-pressed': String(it.id===current), 'aria-label': it.n+'. '+(it.d||''), onclick:()=>onPick(it.id) },
        h('b',{},it.n), it.d ? h('span',{},it.d) : null)));
      return h('div',{class:'stack'}, h('span',{class:'eyebrow'},title), g);
    }

    function render(){
      const r = solve();
      /* esquema 2D */
      if (L.esquema){ esq2d.style.display=''; esq2d.innerHTML = esquemaSVG(r); tags.style.display='none'; }
      else { esq2d.style.display='none'; tags.style.display=''; }
      btnEsq.textContent = L.esquema ? (E ? 'Ver mesa 3D' : 'Actualizar esquema') : 'Ver esquema 2D';
      btnEsq.style.display = E ? '' : 'none';
      btnSw.textContent = L.closed ? 'Abrir interruptor' : 'Cerrar interruptor';
      btnSw.setAttribute('aria-label', L.closed ? 'Abrir el interruptor del circuito' : 'Cerrar el interruptor del circuito');

      /* bloque topología */
      bTopo.innerHTML = '';
      bTopo.append(pickRow('1 · Elige la topología del circuito', TOPOS, L.topo, id => {
        if (id===L.topo) return;
        L.topo = id; L.closed = false; L.burned = {}; L.pred = null; L.amp = 0; L.volt = 0;
        rebuild(); msg('', 'Circuito armado: <b>'+esc(TOPOS.find(t=>t.id===id).n)+'</b>. Los cables se conectan solos entre los zócalos. Predice y después cierra el interruptor.');
        Store.log('laboratorio',{ lab:'cn-circuitos', evento:'topologia', topologia:id });
        render();
      }, 'Topologías disponibles'));
      bTopo.append(h('p',{class:'small muted'}, TOPOS.find(t=>t.id===L.topo).d));

      /* bloque componentes */
      bComp.innerHTML = '';
      bComp.append(pickRow('2 · Fuente y componentes', PILAS, L.pila, id => { L.pila = id; if (L.closed && !checkBurn()) { registrarLogro(solve()); } Store.log('laboratorio',{lab:'cn-circuitos',evento:'pila',valor:PILAS.find(p=>p.id===id).V}); render(); }, 'Pilas disponibles'));
      bComp.append(pickRow('Foco', FOCOS, L.foco, id => { L.foco = id; L.burned = {}; L.logrado = {uno:null,par2:null}; rebuild(); if (L.closed && !checkBurn()) registrarLogro(solve()); Store.log('laboratorio',{lab:'cn-circuitos',evento:'foco',valor:FOCOS.find(f=>f.id===id).R}); render(); }, 'Focos disponibles'));
      if (L.topo==='focoR') bComp.append(pickRow('Resistencia (bandas de color)', RESIS.map(x=>({id:x.id,n:x.n,d:x.txt})), L.res, id => { L.res = id; rebuild(); if (L.closed && !checkBurn()) registrarLogro(solve()); render(); }, 'Resistencias disponibles'));
      if (Object.keys(L.burned).length) bComp.append(h('button',{class:'btn sm',onclick:()=>{ L.burned={}; L.closed=false; rebuild(); msg('ok','Focos reemplazados. Revisa el voltaje de la pila antes de volver a cerrar el interruptor.'); render(); }},'Reemplazar focos quemados'));

      /* bloque predicción */
      bPred.innerHTML = '';
      const pr = PREDS[L.topo];
      bPred.append(h('span',{class:'eyebrow'},'3 · Predice antes de conectar'));
      if (pr){
        bPred.append(h('p',{style:'font-weight:600'}, pr.q));
        pr.ops.forEach((o,i)=>{
          const b = h('button',{ class:'opt'+(L.pred===i?(L.closed?(i===pr.ok?' ok':' bad'):''):''), 'aria-pressed':String(L.pred===i), onclick:()=>{
            if (L.closed) return toast('Ya cerraste el interruptor: abre y cambia la topología para predecir otra vez.');
            L.pred = i; L.predTopo = L.topo;
            msg('', 'Predicción registrada. Ahora cierra el interruptor y compara con lo que observas.');
            render();
          }}, h('span',{class:'k'},String.fromCharCode(65+i)), o);
          bPred.append(b);
        });
        if (L.pred===null) bPred.append(h('p',{class:'small muted'},'Elige una opción; después podrás cerrar el interruptor y contrastar.'));
      } else bPred.append(h('p',{class:'small muted'},'Esta topología no tiene predicción asociada.'));

      /* bloque instrumentos */
      bMed.innerHTML = '';
      const aps = ampPoints(), vps = voltPoints(r);
      if (L.amp >= aps.length) L.amp = 0;
      if (L.volt >= vps.length) L.volt = 0;
      const selA = h('select',{'aria-label':'Punto donde se conecta el amperímetro (siempre en serie)', onchange:e=>{ L.amp = +e.target.value; Store.log('laboratorio',{lab:'cn-circuitos',evento:'amperimetro',punto:aps[L.amp].id}); render(); }});
      aps.forEach((p,i)=>selA.append(h('option',{value:i,selected:i===L.amp?true:null},p.n)));
      const selV = h('select',{'aria-label':'Punto donde se conecta el voltímetro (siempre en paralelo)', onchange:e=>{ L.volt = +e.target.value; Store.log('laboratorio',{lab:'cn-circuitos',evento:'voltimetro',punto:vps[L.volt].id}); render(); }});
      vps.forEach((p,i)=>selV.append(h('option',{value:i,selected:i===L.volt?true:null},p.n)));
      const Im = ampRead(r, aps[L.amp].id), Vm = voltRead(r, vps[L.volt].id);
      bMed.append(h('span',{class:'eyebrow'},'4 · Instrumentos'),
        h('div',{class:'field'}, h('label',{},'Amperímetro (se conecta en serie)'), selA),
        h('div',{class:'field'}, h('label',{},'Voltímetro (se conecta en paralelo)'), selV),
        h('div',{class:'readouts'},
          h('div',{class:'readout'}, h('div',{class:'v'}, nf(Im,2), ' ', h('span',{class:'u'},'A')), h('div',{class:'l'},'Amperímetro')),
          h('div',{class:'readout'}, h('div',{class:'v'}, nf(Vm,2), ' ', h('span',{class:'u'},'V')), h('div',{class:'l'},'Voltímetro'))),
        h('button',{class:'btn sm',onclick:()=>{
          if (!L.closed) return toast('Cierra el interruptor: con el circuito abierto la corriente es 0,00 A.');
          if (Im <= 1e-6) return toast('El amperímetro marca 0,00 A en ese punto: elige otro punto o revisa si hay un foco quemado.');
          const Rm = Vm/Im;
          L.filas.push({ topo:TOPOS.find(t=>t.id===L.topo).n, punto:vps[L.volt].n, V:Vm, I:Im, R:Rm, Pw:Vm*Im, pila:P().V });
          Store.log('laboratorio',{ lab:'cn-circuitos', evento:'medicion', topologia:L.topo, V:+Vm.toFixed(3), I:+Im.toFixed(3) });
          toast('Medición registrada en la tabla.');
          renderTabla();
        }},'Registrar esta medición'));

      /* lecturas numéricas siempre en texto (no solo el brillo) */
      bLect.innerHTML = '';
      bLect.append(h('span',{class:'eyebrow'},'5 · Lecturas del circuito'));
      bLect.append(h('div',{class:'readouts'},
        h('div',{class:'readout'}, h('div',{class:'v'}, nf(r.V,1), ' ', h('span',{class:'u'},'V')), h('div',{class:'l'},'Voltaje de la pila')),
        h('div',{class:'readout'}, h('div',{class:'v'}, isFinite(r.Req)?nf(r.Req):'∞', ' ', h('span',{class:'u'},'Ω')), h('div',{class:'l'},'Resistencia equivalente')),
        h('div',{class:'readout'}, h('div',{class:'v'}, nf(r.I,2), ' ', h('span',{class:'u'},'A')), h('div',{class:'l'},'Corriente total')),
        h('div',{class:'readout'}, h('div',{class:'v'}, nf(r.Pt,2), ' ', h('span',{class:'u'},'W')), h('div',{class:'l'},'Potencia total'))));
      const bars = h('div',{class:'cir-bars'});
      r.comps.forEach(c => {
        const pct = clamp(c.brillo/2.2,0,1)*100;
        bars.append(h('div',{class:'cir-brow'},
          h('span',{class:'n'}, c.n),
          h('span',{class:'cir-btrack',role:'img','aria-label':`Brillo relativo de ${c.n}: ${nf(c.brillo*100,0)} por ciento de su brillo nominal`}, h('span',{class:'cir-bfill'+(c.quemado?' burn':''),style:'width:'+(c.quemado?100:pct)+'%'})),
          h('span',{class:'v'}, c.quemado ? 'quemado' : `${nf(c.U)} V · ${nf(c.I)} A · ${nf(c.Pw)} W`)));
      });
      bLect.append(bars);
      bLect.append(h('p',{class:'small muted'}, L.closed
        ? `Cálculo: I = V / R = ${nf(r.V,1)} V ÷ ${isFinite(r.Req)?nf(r.Req):'∞'} Ω = ${nf(r.I,2)} A. Potencia total: P = V · I = ${nf(r.Pt,2)} W. Potencia nominal de cada foco: ${nf(F().Pn)} W (se quema sobre ${nf(2*F().Pn)} W).`
        : 'Interruptor abierto: el camino está interrumpido, la corriente es 0,00 A y los focos no disipan potencia.'));
      bLect.append(aviso);

      /* estado del reto */
      const faltan = [];
      if (!L.retoConfig) faltan.push('armar el circuito');
      if (!L.retoQuiz) faltan.push('responder el análisis');
      if (!L.retoSeg) faltan.push('responder la pregunta de seguridad');
      if (L.done){ retoEstado.className = 'notice ok'; retoEstado.textContent = 'Reto resuelto ✓ · dos focos en paralelo brillan igual que uno solo porque cada uno recibe el voltaje completo de la pila.'; franja.classList.add('done'); }
      else { retoEstado.className = 'notice'; retoEstado.textContent = 'Pendiente: '+faltan.join(', ')+'.'; }
    }

    function checkDone(){
      if (L.done) return;
      if (L.retoConfig && L.retoQuiz && L.retoSeg){
        L.done = true;
        Store.completeActivity('cn-lab-circuitos', { score:'paralelo · '+nf(P().V,1)+' V', attempts:L.filas.length });
        Store.addNote && Store.addNote('conclusion','Lab de circuitos (9.º): dos focos en paralelo brillan igual que uno solo porque cada rama recibe el voltaje completo de la pila; en serie el voltaje se reparte y cada foco disipa la cuarta parte de la potencia.');
        toast('Reto del laboratorio de circuitos resuelto.');
        Store.log('laboratorio',{ lab:'cn-circuitos', evento:'reto_completo', mediciones:L.filas.length });
      }
      render();
    }

    /* =====================================================================
       TABLA DE MEDICIONES Y GRÁFICO V vs I
       ===================================================================== */
    const tablaWrap = h('div',{class:'tablewrap'});
    const chartWrap = h('div',{style:'position:relative'});
    const chart = h('canvas',{class:'chart',style:'height:240px'});
    const chartNota = h('p',{class:'small muted'});
    chartWrap.append(chart);
    function renderTabla(){
      tablaWrap.innerHTML = '';
      if (!L.filas.length){ tablaWrap.append(h('p',{class:'small muted'},'Todavía no registras mediciones. Elige un punto para el voltímetro y otro para el amperímetro, cierra el interruptor y pulsa «Registrar esta medición».')); chartNota.textContent=''; lineChart(chart,{series:[{label:'V vs I',color:cssVar('--lab'),pts:[{x:0,y:0}],dots:true}],xmin:0,xmax:1,ymin:0,ymax:10,xlabel:'Corriente I (A)',ylabel:'Voltaje V (V)'}); return; }
      const t = h('table',{class:'data'},
        h('thead',{}, h('tr',{}, h('th',{},'#'), h('th',{},'Topología'), h('th',{},'Punto medido'), h('th',{},'V (V)'), h('th',{},'I (A)'), h('th',{},'R = V/I (Ω)'), h('th',{},'P = V·I (W)'), h('th',{},''))),
        h('tbody',{}, L.filas.map((f,i)=>h('tr',{},
          h('td',{class:'num'}, i+1), h('td',{}, f.topo), h('td',{}, f.punto),
          h('td',{class:'num'}, nf(f.V)), h('td',{class:'num'}, nf(f.I)),
          h('td',{class:'num'}, nf(f.R)), h('td',{class:'num'}, nf(f.Pw)),
          h('td',{}, h('button',{class:'btn sm ghost','aria-label':'Borrar la medición '+(i+1),onclick:()=>{ L.filas.splice(i,1); renderTabla(); }},'✕'))))));
      tablaWrap.append(t);
      const pts = L.filas.map(f=>({x:f.I, y:f.V})).sort((a,b)=>a.x-b.x);
      lineChart(chart, { series:[{ label:'V vs I', color:cssVar('--lab'), pts, dots:true }], xmin:0, ymin:0,
        xlabel:'Corriente I (A)', ylabel:'Voltaje V (V)', xfmt:v=>nf(v,2), yfmt:v=>nf(v,1), xticks:5 });
      /* pendiente por mínimos cuadrados con ordenada en el origen: V = R · I */
      const sxy = pts.reduce((s,p)=>s+p.x*p.y,0), sxx = pts.reduce((s,p)=>s+p.x*p.x,0);
      const pend = sxx>0 ? sxy/sxx : 0;
      chartNota.innerHTML = pts.length<2
        ? 'Registra al menos dos mediciones del <b>mismo punto</b> cambiando la pila: la nube de puntos formará una recta.'
        : `La pendiente de la recta que mejor se ajusta a tus puntos es de <b>${nf(pend)} Ω</b>. Eso es exactamente la resistencia: en V = R·I, la resistencia es la pendiente de la gráfica de voltaje frente a corriente. Si mezclas mediciones de componentes distintos, los puntos no caerán sobre una sola recta.`;
    }

    const bloqueDatos = h('div',{class:'card stack'},
      h('span',{class:'eyebrow lab'},'6 · Tabla de mediciones y gráfico V vs I'),
      h('p',{class:'small muted'},'Para obtener una recta, mide siempre el mismo componente y cambia solo la pila (1,5 V · 4,5 V · 9 V). La pendiente de la recta es la resistencia.'),
      tablaWrap,
      h('div',{class:'row'}, h('button',{class:'btn sm ghost',onclick:()=>{ L.filas=[]; renderTabla(); }},'Vaciar la tabla')),
      chartWrap, chartNota);

    /* =====================================================================
       CONSUMO Y FACTURA (APV · energía en el hogar)
       ===================================================================== */
    const APS = [
      { id:'led',  n:'Foco LED',            W:9,    hs:5 },
      { id:'inc',  n:'Foco incandescente',  W:60,   hs:5 },
      { id:'ref',  n:'Refrigeradora',       W:150,  hs:8 },
      { id:'duc',  n:'Ducha eléctrica',     W:3500, hs:0.5 },
      { id:'tv',   n:'Televisor',           W:90,   hs:4 }
    ];
    const uso = {}; APS.forEach(a => uso[a.id] = { on:(a.id==='ref'||a.id==='led'), hs:a.hs, cant:(a.id==='led'?6:1) });
    const consBody = h('div',{class:'stack'});
    const consRes = h('div',{class:'stack'});
    function consumo(){
      let kwh = 0; const det = [];
      APS.forEach(a => { const u = uso[a.id]; if (!u.on) return; const k = a.W * u.hs * u.cant * 30 / 1000; kwh += k; det.push({ n:a.n, W:a.W, hs:u.hs, cant:u.cant, k }); });
      return { kwh, det, usd: kwh*L.tarifa };
    }
    function renderCons(){
      consBody.innerHTML = '';
      consBody.append(h('div',{class:'cir-ap'}, h('b',{style:'font-size:.78rem'},'Aparato (potencia)'), h('b',{style:'font-size:.78rem'},'Cantidad'), h('b',{style:'font-size:.78rem'},'Horas/día')));
      APS.forEach(a => {
        const u = uso[a.id];
        const chk = h('button',{class:'chip'+(u.on?' picked':''),'aria-pressed':String(u.on),'aria-label':(u.on?'Quitar ':'Añadir ')+a.n+' de '+a.W+' vatios', onclick:()=>{ u.on=!u.on; renderCons(); }}, (u.on?'✓ ':'') + a.n + ' · ' + a.W + ' W');
        const cant = h('input',{type:'number',min:0,max:30,step:1,value:u.cant,'aria-label':'Cantidad de '+a.n, oninput:e=>{ u.cant = clamp(+e.target.value||0,0,30); renderCons(); }});
        const hs = h('input',{type:'number',min:0,max:24,step:0.5,value:u.hs,'aria-label':'Horas de uso al día de '+a.n, oninput:e=>{ u.hs = clamp(+e.target.value||0,0,24); renderCons(); }});
        consBody.append(h('div',{class:'cir-ap'}, chk, cant, hs));
      });
      const c = consumo();
      consRes.innerHTML = '';
      consRes.append(h('div',{class:'readouts'},
        h('div',{class:'readout'}, h('div',{class:'v'}, nf(c.kwh,1), ' ', h('span',{class:'u'},'kWh/mes')), h('div',{class:'l'},'Energía consumida')),
        h('div',{class:'readout'}, h('div',{class:'v'}, nf(c.usd,2), ' ', h('span',{class:'u'},'USD/mes')), h('div',{class:'l'},'Costo referencial')),
        h('div',{class:'readout'}, h('div',{class:'v'}, nf(c.usd*12,2), ' ', h('span',{class:'u'},'USD/año')), h('div',{class:'l'},'Costo anual referencial')),
        h('div',{class:'readout'}, h('div',{class:'v'}, nf(L.tarifa,3), ' ', h('span',{class:'u'},'USD/kWh')), h('div',{class:'l'},'Tarifa usada'))));
      if (c.det.length) consRes.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
        h('thead',{}, h('tr',{}, h('th',{},'Aparato'), h('th',{},'Potencia (W)'), h('th',{},'Cantidad'), h('th',{},'Horas/día'), h('th',{},'kWh/mes'), h('th',{},'USD/mes'))),
        h('tbody',{}, c.det.map(d=>h('tr',{}, h('td',{},d.n), h('td',{class:'num'},d.W), h('td',{class:'num'},d.cant), h('td',{class:'num'},nf(d.hs,1)), h('td',{class:'num'},nf(d.k,1)), h('td',{class:'num'},nf(d.k*L.tarifa,2))))))));
      else consRes.append(h('p',{class:'small muted'},'Selecciona al menos un aparato.'));
      consRes.append(h('p',{class:'small muted'},'kWh al mes = potencia (W) × horas al día × 30 días ÷ 1.000. El costo es referencial: la tarifa eléctrica residencial en el Ecuador depende del consumo mensual, del pliego tarifario vigente y de los subsidios; revisa tu planilla real y cámbiala arriba.'));
      /* comparación de escenarios */
      const filaEsc = h('div',{class:'row'},
        h('button',{class:'btn sm',onclick:()=>{ L.escA = consumo(); renderCons(); toast('Escenario A guardado. Ahora cambia aparatos u horas y compara.'); Store.log('laboratorio',{lab:'cn-circuitos',evento:'escenario_a',kwh:+L.escA.kwh.toFixed(1)}); }},'Guardar como escenario A'),
        L.escA ? h('button',{class:'btn sm ghost',onclick:()=>{ L.escA=null; renderCons(); }},'Borrar escenario A') : null);
      consRes.append(filaEsc);
      if (L.escA){
        const d = L.escA.kwh - c.kwh, du = L.escA.usd - c.usd;
        const k = d > 0.5 ? 'ok' : (d < -0.5 ? 'warn' : '');
        consRes.append(h('div',{class:'notice '+k}, h('span',{html:
          `<b>Escenario A:</b> ${nf(L.escA.kwh,1)} kWh/mes (${nf(L.escA.usd,2)} USD). <b>Escenario B (actual):</b> ${nf(c.kwh,1)} kWh/mes (${nf(c.usd,2)} USD). `
          + (Math.abs(d) < 0.5
             ? 'Los dos escenarios consumen prácticamente lo mismo: prueba cambiar los focos incandescentes por LED o reducir el tiempo de la ducha eléctrica.'
             : d > 0
               ? `El escenario B ahorra <b>${nf(d,1)} kWh al mes</b>, es decir ${nf(du,2)} USD al mes y ${nf(du*12,2)} USD al año. Recuerda que el ahorro grande está en los aparatos que calientan (ducha, plancha, cocina eléctrica): convierten casi toda la energía eléctrica en calor.`
               : `El escenario B consume <b>${nf(-d,1)} kWh más al mes</b> (${nf(-du,2)} USD adicionales al mes). Revisa qué aparato subió: multiplica su potencia por las horas de uso.`) })));
      }
    }
    const tarInp = h('input',{type:'number',min:0.01,max:0.5,step:0.001,value:L.tarifa,'aria-label':'Tarifa eléctrica en dólares por kilovatio hora', oninput:e=>{ L.tarifa = clamp(+e.target.value||0.092, 0.001, 1); renderCons(); }});
    const bloqueCons = h('div',{class:'card stack'},
      h('span',{class:'eyebrow lab'},'7 · Consumo eléctrico del hogar y factura'),
      h('p',{},'Los aparatos no cobran por «electricidad»: cobran por la energía que usan, y la energía es potencia por tiempo. Un foco de 60 W encendido 5 horas al día consume lo mismo que casi siete focos LED de 9 W durante el mismo tiempo.'),
      h('div',{class:'cir-tar'}, h('label',{for:'cir-tarifa'},'Tarifa (USD por kWh):'), tarInp, h('span',{class:'small muted'},'valor por defecto 0,092 USD/kWh · referencial')),
      consBody, consRes);
    tarInp.id = 'cir-tarifa';

    /* =====================================================================
       RETO FINAL: análisis + seguridad
       ===================================================================== */
    const bloqueReto = h('div',{class:'card stack'},
      h('span',{class:'eyebrow lab'},'8 · Reto del laboratorio'),
      h('p',{},'Primero consíguelo en la mesa: arma el circuito de un foco, anota su potencia y luego arma dos focos en paralelo con la misma pila y el mismo foco. Después responde.'));
    bloqueReto.append(quizBlock({
      q:'¿Por qué dos focos en paralelo brillan igual de fuerte que un foco solo, mientras que dos focos en serie brillan mucho menos?',
      ops:[
        'Porque en paralelo cada foco está conectado a los dos bornes de la pila y recibe el voltaje completo, mientras que en serie los focos se reparten el voltaje.',
        'Porque en paralelo la corriente se reparte entre los dos focos y por eso alcanza para los dos.',
        'Porque en serie el primer foco consume la corriente y al segundo le llega menos.',
        'Porque la pila entrega más voltaje cuando hay más focos conectados.'
      ],
      ok:0,
      fb:'Cada rama del paralelo está entre los mismos dos nodos, así que sobre cada foco cae el voltaje completo de la pila: P = V²/R es la misma que la del foco solo. En serie, la resistencia total se duplica, la corriente cae a la mitad y sobre cada foco cae la mitad del voltaje, así que cada uno disipa la cuarta parte de la potencia. El precio del paralelo es que la pila entrega el doble de corriente y dura la mitad.',
      wrong:[
        'La corriente sí se reparte en paralelo, pero eso no explica el brillo: lo que determina la potencia de cada foco es el voltaje que recibe. Cada rama recibe el voltaje completo, por eso cada foco brilla igual que si estuviera solo.',
        'La corriente no se consume ni se gasta en el primer foco: en un circuito en serie la corriente es la misma en todos los puntos. Lo que se reparte es el voltaje, no la corriente.',
        'El voltaje de una pila es una característica de la pila (1,5 V, 4,5 V, 9 V) y no aumenta porque conectes más focos. Lo que cambia al conectar más ramas es la corriente que la pila debe entregar.'
      ]
    }, (att)=>{ L.retoQuiz = true; Store.log('laboratorio',{lab:'cn-circuitos',evento:'quiz_analisis',intentos:att}); checkDone(); }));
    bloqueReto.append(quizBlock({
      q:'Seguridad eléctrica: en este laboratorio trabajamos con 1,5 V a 9 V. ¿Por qué no se repite este experimento con el tomacorriente de la casa (110 V o 220 V)?',
      ops:[
        'Porque con 110 V o 220 V la corriente que puede atravesar el cuerpo es suficiente para provocar quemaduras, contracción muscular y paro cardíaco, y además puede incendiar cables y aparatos.',
        'Porque el tomacorriente da corriente continua y las pilas dan corriente alterna.',
        'Porque los focos de la casa tienen menos resistencia que los del laboratorio.'
      ],
      ok:0,
      fb:'La red domiciliaria tiene un voltaje decenas de veces mayor y puede entregar mucha corriente. Por eso las instalaciones llevan disyuntor (breaker), fusibles y conexión a tierra, y toda intervención se hace con el circuito desconectado y por una persona calificada. Nunca se manipulan enchufes con las manos mojadas ni se sobrecarga un tomacorriente con varias regletas.',
      wrong:[
        'Es al revés: el tomacorriente entrega corriente alterna y las pilas, corriente continua. Pero la razón de la prohibición no es el tipo de corriente, sino el peligro del voltaje alto.',
        'La resistencia del foco no es el problema. El riesgo está en el voltaje de la red y en la corriente que puede atravesar el cuerpo humano.'
      ]
    }, (att)=>{ L.retoSeg = true; Store.log('laboratorio',{lab:'cn-circuitos',evento:'quiz_seguridad',intentos:att}); checkDone(); }));

    view.append(h('div',{style:'height:14px'}), bloqueDatos, h('div',{style:'height:14px'}), bloqueCons, h('div',{style:'height:14px'}), bloqueReto);

    /* ---- arranque ---- */
    rebuild();
    render();
    renderTabla();
    renderCons();
    Store.log('laboratorio',{ lab:'cn-circuitos', evento:'abrir' });

    return { unmount(){ try { E && E.dispose(); } catch(e){ console.warn(e); } } };
  });

})();
</script>
