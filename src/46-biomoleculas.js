<style>
/* ===== CN · 10.º CVT U1 · Biomoléculas 3D y homeostasis ===== */
.bio-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.bio-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.bio-nav button[aria-current="true"]{background:var(--cell);border-color:var(--cell);color:#fff}
.bio-stage{background:radial-gradient(ellipse at 50% 38%,#16232e 0%,#0e161f 62%,#080d13 100%)!important}
.bio-stage .lbl{background:rgba(10,18,26,.78);border-color:#3a5568;color:#e6f3ff}
.bio-fam{display:grid;grid-template-columns:repeat(auto-fit,minmax(152px,1fr));gap:8px}
.bio-fam button{border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:12px;padding:9px 11px;font:600 .84rem/1.2 "IBM Plex Sans",sans-serif;cursor:pointer;text-align:left}
.bio-fam button[aria-pressed="true"]{border-color:var(--cell);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--cell) 24%,transparent)}
.bio-fam button small{display:block;font-weight:400;font-size:.73rem;color:var(--ink-3);margin-top:3px;line-height:1.3}
.bio-chips{display:flex;flex-wrap:wrap;gap:6px}
.bio-chips button{border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:10px;padding:6px 11px;font:600 .8rem/1.15 "IBM Plex Sans",sans-serif;cursor:pointer}
.bio-chips button[aria-pressed="true"]{background:var(--cell);border-color:var(--cell);color:#fff}
.bio-part{display:flex;flex-direction:column;gap:6px}
.bio-part button{border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:11px;padding:8px 11px;font:600 .83rem/1.2 "IBM Plex Sans",sans-serif;cursor:pointer;text-align:left;display:flex;gap:8px;align-items:flex-start}
.bio-part button[aria-pressed="true"]{border-color:var(--cell);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--cell) 22%,transparent)}
.bio-part i{width:12px;height:12px;border-radius:4px;flex:0 0 auto;margin-top:3px;border:1px solid rgba(0,0,0,.25)}
.bio-part small{display:block;font-weight:400;font-size:.74rem;color:var(--ink-3);margin-top:3px;line-height:1.35}
.bio-kv{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:.85rem;margin:6px 0 0}
.bio-kv dt{font-weight:600;color:var(--ink-2)}
.bio-kv dd{margin:0;color:var(--ink-2)}
.bio-sld{display:grid;gap:3px;margin-bottom:10px}
.bio-sld input[type=range]{width:100%}
.bio-sld label{font:600 .8rem/1.2 "IBM Plex Sans",sans-serif;color:var(--ink-2);display:flex;justify-content:space-between;gap:10px}
.bio-sld label b{font-family:"IBM Plex Mono",monospace;color:var(--ink)}
.bio-read{display:grid;grid-template-columns:repeat(auto-fit,minmax(112px,1fr));gap:8px}
.bio-read>div{border:1px solid var(--line);border-radius:11px;padding:7px 10px;background:var(--bg-2)}
.bio-read span{display:block;font-size:.7rem;color:var(--ink-3);letter-spacing:.03em;text-transform:uppercase}
.bio-read b{font:700 1.05rem/1.2 "IBM Plex Mono",monospace;color:var(--ink)}
.bio-bar{height:13px;border-radius:7px;border:1px solid var(--line);position:relative;overflow:hidden;background:var(--bg-3)}
.bio-bar i{position:absolute;left:0;top:0;bottom:0;display:block;border-radius:6px}
.bio-leg{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;font-size:.78rem;color:var(--ink-3)}
.bio-leg span{display:inline-flex;align-items:center;gap:6px}
.bio-leg i{width:24px;height:0;border-top-width:3px;border-top-style:solid;display:inline-block}
.bio-seg{display:flex;flex-wrap:wrap;gap:4px}
.bio-seg button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:8px;padding:5px 10px;font:600 .76rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.bio-seg button[aria-pressed="true"]{background:var(--cell);border-color:var(--cell);color:#fff}
.bio-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(228px,1fr));gap:12px}
.bio-cols>div{border:1px solid var(--line);border-radius:12px;padding:11px 13px;background:var(--bg-2)}
.bio-cols h4{margin:0 0 6px;font-size:.92rem}
.bio-cols li{font-size:.83rem;margin-bottom:5px}
.bio-fase{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:.8rem;color:var(--ink-3)}
.bio-svg{width:100%;height:auto;display:block;background:var(--bg-3);border:1px solid var(--line);border-radius:14px}
.bio-tab{font-size:.83rem}
@media(max-width:700px){.bio-cols{grid-template-columns:1fr}}
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · 10.º EGB Superior · Ciencias de la Vida y la Tierra
   Unidad 1: Biomoléculas, regulación y homeostasis
   Reto de unidad: ¿Cómo conectan la estructura molecular, la función y la
   regulación de los sistemas vivos?

   Destrezas: AO.CVT.10.01 (relacionar carbohidratos, lípidos, proteínas y
   ácidos nucleicos con funciones biológicas), AO.CVT.10.02 (explicar la
   homeostasis integrando regulación nerviosa y hormonal), AO.CVT.10.03
   (evaluar una afirmación de nutrición o salud distinguiendo evidencia de
   marketing).

   Ruta: #/cn/biomoleculas   ·   Actividad: cn-biomoleculas
   Todas las cifras son APROXIMADAS y didácticas. Nada de esto sirve para
   diagnosticar: los modelos explican mecanismos, no personas.
   ===================================================================== */

/* Registro defensivo de la actividad (no se toca src/30-cn-data.js) */
if (typeof BIO !== 'undefined' && BIO.activities)
  Object.assign(BIO.activities, {'cn-biomoleculas':{t:'Biomoléculas y homeostasis', unidad:null, peso:0, xp:140}});
if (typeof ACT_HREF !== 'undefined') ACT_HREF['cn-biomoleculas'] = '#/cn/biomoleculas';

/* ---------- utilidades de formato (español de Ecuador) ---------- */
const biomDec = (v, d=1) => Number(v).toFixed(d).replace('.', ',');
const biomQuieto = () => !!Store.s.a11y.motion || (typeof motionOK === 'function' && !motionOK());
const biomLerp = (a, b, t) => a + (b-a)*t;
const biomSuave = t => t*t*(3-2*t);
/* generador pseudoaleatorio reproducible: el mismo modelo en todas las máquinas */
function biomAzar(semilla){ let s = semilla>>>0; return () => { s = (s*1664525 + 1013904223) >>> 0; return s/4294967296; }; }

/* =====================================================================
   1 · ÁTOMOS, ENLACES Y ENSAMBLADO DE MODELOS DE BOLAS Y VARILLAS
   ===================================================================== */
const BIOM_EL = {
  C:{ c:0x272c31, r:0.36, n:'Carbono'   },
  H:{ c:0xeef3f8, r:0.21, n:'Hidrógeno' },
  O:{ c:0xb02a1c, r:0.33, n:'Oxígeno'   },
  N:{ c:0x2452b8, r:0.34, n:'Nitrógeno' },
  P:{ c:0xd08410, r:0.40, n:'Fósforo'   },
  S:{ c:0xdccb3c, r:0.38, n:'Azufre'    },
  R:{ c:0x7a3fc4, r:0.46, n:'Radical R' }
};
const BIOM_EJE = new THREE.Vector3(0,1,0);
/* v1.7 · material de modelo molecular: el hexadecimal se pasa a lineal para que, con el mapeo tonal
   neutro del motor, cada átomo se vea del color de su muestra en la lista (convención CPK) */
function biomMat(c, extra){ return mat(new THREE.Color(c).convertSRGBToLinear(), Object.assign({ roughness:0.3, clearcoat:0.55, clearcoatRoughness:0.2, envMapIntensity:1.0 }, extra||{}, { roughness: Math.max(0.12, ((extra||{}).roughness ?? 0.3) - 0.08) })); }
function biomLuz(E){ E.scene.traverse(o => { if (o.isDirectionalLight) o.intensity *= 0.9; if (o.isHemisphereLight) o.intensity = 0.32; }); }

function biomAtomo(el, p, esc){
  const d = BIOM_EL[el] || BIOM_EL.C;
  const low = (typeof lowEnd === 'function') && lowEnd();
  const g = new THREE.SphereGeometry(d.r*(esc||1), low?14:22, low?10:16);
  const m = new THREE.Mesh(g, biomMat(d.c, { roughness:0.42, clearcoat:0.25, clearcoatRoughness:0.35 }));
  m.position.set(p[0], p[1], p[2]);
  return m;
}
function biomVarilla(a, b, color, rad){
  const A = new THREE.Vector3(a[0],a[1],a[2]), B = new THREE.Vector3(b[0],b[1],b[2]);
  const d = new THREE.Vector3().subVectors(B, A), L = d.length() || 0.001;
  const g = new THREE.CylinderGeometry(rad||0.095, rad||0.095, L, 10, 1);
  const m = new THREE.Mesh(g, biomMat(color ?? 0x8e9aa6, { roughness:0.55, clearcoat:0.2 }));
  m.position.copy(A).addScaledVector(d, 0.5);
  m.quaternion.setFromUnitVectors(BIOM_EJE, d.clone().normalize());
  return m;
}
/* enlace simple, doble o triple: los dobles se dibujan como dos varillas paralelas */
function biomEnlace(A, B, orden, color){
  const out = [];
  if ((orden||1) <= 1){ out.push(biomVarilla(A, B, color)); return out; }
  const d = new THREE.Vector3(B[0]-A[0], B[1]-A[1], B[2]-A[2]).normalize();
  let aux = new THREE.Vector3(0,1,0);
  if (Math.abs(d.dot(aux)) > 0.92) aux = new THREE.Vector3(1,0,0);
  const o = new THREE.Vector3().crossVectors(d, aux).normalize().multiplyScalar(0.10);
  [1,-1].forEach(s => out.push(biomVarilla(
    [A[0]+o.x*s, A[1]+o.y*s, A[2]+o.z*s],
    [B[0]+o.x*s, B[1]+o.y*s, B[2]+o.z*s], color, 0.062)));
  return out;
}
/* Monta en el motor una molécula {atoms:[{el,p,g,s}], bonds:[[i,j,orden,grupo]]} */
function biomMontar(E, mol, etiquetas){
  const porGrupo = {}, lejos = {};
  const add = (g, m) => { (porGrupo[g] = porGrupo[g] || []).push(m); };
  mol.atoms.forEach(a => {
    add(a.g, biomAtomo(a.el, a.p, a.s));
    const d2 = a.p[0]*a.p[0] + a.p[1]*a.p[1] + a.p[2]*a.p[2];
    if (!lejos[a.g] || d2 > lejos[a.g].d) lejos[a.g] = { d:d2, p:a.p };   /* el átomo más externo del grupo */
  });
  (mol.bonds||[]).forEach(b => {
    const A = mol.atoms[b[0]].p, B = mol.atoms[b[1]].p;
    const g = b[3] || mol.atoms[b[0]].g;
    biomEnlace(A, B, b[2]||1).forEach(m => add(g, m));
  });
  /* las etiquetas se cuelgan del átomo más externo y se escalonan en altura
     para que no se amontonen unas sobre otras al proyectarlas */
  Object.keys(porGrupo).forEach((g, i) => {
    E.addPart(g, porGrupo[g]);
    if (etiquetas && etiquetas[g] && lejos[g]){
      const q = lejos[g].p;
      E.addLabel(g, etiquetas[g], [q[0]*1.10, q[1]*1.10 + (i%2 ? 0.85 : -0.85), q[2]*1.10]);
    }
  });
}
/* Constructor de listas de átomos y enlaces */
function biomLienzo(){
  const atoms = [], bonds = [];
  return {
    atoms, bonds,
    a(el, p, g, s){ atoms.push({el, p, g, s}); return atoms.length-1; },
    b(i, j, orden, g){ bonds.push([i, j, orden||1, g]); return bonds.length-1; },
    /* centra el modelo en el origen para que la cámara siempre lo encuadre */
    centrar(){
      if (!atoms.length) return this;
      const c = [0,0,0];
      atoms.forEach(a => { c[0]+=a.p[0]; c[1]+=a.p[1]; c[2]+=a.p[2]; });
      c[0]/=atoms.length; c[1]/=atoms.length; c[2]/=atoms.length;
      atoms.forEach(a => { a.p = [a.p[0]-c[0], a.p[1]-c[1], a.p[2]-c[2]]; });
      return this;
    }
  };
}

/* ---------- Carbohidratos: glucosa (anillo de piranosa) ---------- */
function biomGlucosa(){
  const L = biomLienzo(), R = 1.32, anillo = [];
  for (let i=0;i<6;i++){
    const a = i*Math.PI/3, y = (i%2 ? 0.24 : -0.24);
    anillo.push(L.a(i===0 ? 'O' : 'C', [Math.cos(a)*R, y, Math.sin(a)*R], i===1 ? 'anomerico' : 'anillo'));
  }
  for (let i=0;i<6;i++) L.b(anillo[i], anillo[(i+1)%6], 1, 'anillo');
  for (let i=1;i<=5;i++){
    const a = i*Math.PI/3, ox = Math.cos(a), oz = Math.sin(a), base = L.atoms[anillo[i]].p, up = (i%2 ? 1 : -1);
    if (i===5){   /* grupo CH2OH exocíclico (el carbono 6) */
      const c6 = [base[0]+ox*0.78, base[1]+up*0.95, base[2]+oz*0.78];
      const i6 = L.a('C', c6, 'ch2oh'); L.b(anillo[5], i6, 1, 'ch2oh');
      const o6 = [c6[0]+ox*0.92, c6[1]+up*0.52, c6[2]+oz*0.92];
      const io = L.a('O', o6, 'ch2oh'); L.b(i6, io, 1, 'ch2oh');
      const ih = L.a('H', [o6[0]+ox*0.40, o6[1]+up*0.58, o6[2]+oz*0.40], 'ch2oh'); L.b(io, ih, 1, 'ch2oh');
      L.b(i6, L.a('H', [c6[0]-oz*0.62, c6[1]+up*0.52, c6[2]+ox*0.62], 'hidrogenos'), 1, 'hidrogenos');
    } else {
      const g = (i===1) ? 'anomerico' : 'hidroxilos';
      const o = [base[0]+ox*0.90, base[1]+up*0.72, base[2]+oz*0.90];
      const io = L.a('O', o, g); L.b(anillo[i], io, 1, g);
      const ih = L.a('H', [o[0]+ox*0.40, o[1]+up*0.60, o[2]+oz*0.40], g); L.b(io, ih, 1, g);
    }
    L.b(anillo[i], L.a('H', [base[0]+ox*0.60, base[1]-up*0.82, base[2]+oz*0.60], 'hidrogenos'), 1, 'hidrogenos');
  }
  return L.centrar();
}

/* ---------- Carbohidratos: polímeros (almidón α o celulosa β) ---------- */
function biomPolisacarido(tipo){
  const L = biomLienzo(), n = 5, prev = [];
  for (let u=0; u<n; u++){
    const M = new THREE.Matrix4();
    if (tipo === 'alfa'){                    /* α(1→4): la cadena se enrosca en hélice */
      const th = u*0.95;
      M.makeRotationY(th);
      M.setPosition(Math.cos(th)*2.6 - 2.6, u*0.42 - 0.84, Math.sin(th)*2.6);
    } else {                                 /* β(1→4): cada unidad gira 180°, la cadena sale recta */
      M.makeRotationX(u%2 ? Math.PI : 0);
      M.setPosition(u*2.55 - 5.1, 0, 0);
    }
    const T = p => { const v = new THREE.Vector3(p[0],p[1],p[2]).applyMatrix4(M); return [v.x, v.y, v.z]; };
    const gr = 'glucosa';
    const idx = [];
    for (let i=0;i<6;i++){
      const a = i*Math.PI/3;
      idx.push(L.a(i===0?'O':'C', T([Math.cos(a)*1.10, (i%2?0.16:-0.16), Math.sin(a)*1.10]), gr));
    }
    for (let i=0;i<6;i++) L.b(idx[i], idx[(i+1)%6], 1, gr);
    /* CH2OH que sobresale: es lo que en la celulosa se alterna arriba y abajo */
    const c6 = T([-0.30, 1.25, -1.30]), o6 = T([-0.30, 2.05, -1.90]);
    const i6 = L.a('C', c6, 'ch2oh'); L.b(idx[4], i6, 1, 'ch2oh');
    const j6 = L.a('O', o6, 'ch2oh'); L.b(i6, j6, 1, 'ch2oh');
    /* hidroxilos libres (los que forman puentes de hidrógeno entre cadenas) */
    [1,2].forEach(k => { const a = k*Math.PI/3;
      const oo = T([Math.cos(a)*1.95, (k%2?0.70:-0.70), Math.sin(a)*1.95]);
      L.b(idx[k], L.a('O', oo, 'hidroxilos'), 1, 'hidroxilos'); });
    prev.push({ idx, T });
    if (u > 0){   /* puente de oxígeno: el enlace glucosídico */
      const A = L.atoms[prev[u-1].idx[1]].p, B = L.atoms[idx[4]].p;
      const puente = [(A[0]+B[0])/2, (A[1]+B[1])/2, (A[2]+B[2])/2];
      const ip = L.a('O', puente, 'enlace');
      L.b(prev[u-1].idx[1], ip, 1, 'enlace'); L.b(ip, idx[4], 1, 'enlace');
    }
  }
  return L.centrar();
}

/* ---------- Lípidos: ácido graso saturado o insaturado ---------- */
function biomAcidoGraso(insat){
  const L = biomLienzo(), n = 15, pts = [];
  let px = 0, py = 0, ang = 0;
  for (let i=0;i<n;i++){
    const nx = -Math.sin(ang), ny = Math.cos(ang), s = (i%2 ? 0.30 : -0.30);
    pts.push([px + nx*s, py + ny*s, 0]);
    if (insat && i === 7) ang += 0.72;           /* doble enlace cis: la cadena se dobla */
    px += Math.cos(ang)*0.66; py += Math.sin(ang)*0.66;
  }
  const idx = pts.map((p,i) => L.a('C', p, i===0 ? 'carboxilo' : 'cadena'));
  for (let i=0;i<n-1;i++){
    const doble = insat && i === 7;
    L.b(idx[i], idx[i+1], doble ? 2 : 1, doble ? 'doble' : (i===0 ? 'carboxilo' : 'cadena'));
  }
  /* cabeza: grupo carboxilo -COOH */
  const c0 = pts[0];
  const od = L.a('O', [c0[0]-0.55, c0[1]+0.72, 0], 'carboxilo'); L.b(idx[0], od, 2, 'carboxilo');
  const oh = L.a('O', [c0[0]-0.92, c0[1]-0.52, 0], 'carboxilo'); L.b(idx[0], oh, 1, 'carboxilo');
  L.b(oh, L.a('H', [c0[0]-1.55, c0[1]-0.22, 0], 'carboxilo'), 1, 'carboxilo');
  /* hidrógenos de la cola: son los que la hacen apolar */
  for (let i=1;i<n;i++){
    const p = pts[i], up = (i%2 ? 1 : -1);
    if (!(insat && (i===7 || i===8))){
      L.b(idx[i], L.a('H', [p[0], p[1]+up*0.62, 0.58], 'hidrogenos'), 1, 'hidrogenos');
      L.b(idx[i], L.a('H', [p[0], p[1]+up*0.62, -0.58], 'hidrogenos'), 1, 'hidrogenos');
    } else L.b(idx[i], L.a('H', [p[0], p[1]+up*0.70, 0], 'hidrogenos'), 1, 'hidrogenos');
  }
  return L.centrar();
}

/* ---------- Lípidos: fosfolípido (cabeza polar + dos colas apolares) ---------- */
function biomFosfolipido(){
  const L = biomLienzo();
  /* cabeza: colina (N) – fosfato (P) */
  const iN = L.a('N', [0, 4.45, 0], 'cabeza');
  ['x','z'].forEach((k,i) => L.b(iN, L.a('C', [i?0:0.85, 5.10, i?0.85:0], 'cabeza'), 1, 'cabeza'));
  const iP = L.a('P', [0, 3.05, 0], 'cabeza'); L.b(iN, iP, 1, 'cabeza');
  L.b(iP, L.a('O', [0.95, 3.35, 0.35], 'cabeza'), 2, 'cabeza');
  L.b(iP, L.a('O', [-0.95, 3.35, -0.35], 'cabeza'), 1, 'cabeza');
  const iOg = L.a('O', [0, 2.15, 0], 'cabeza'); L.b(iP, iOg, 1, 'cabeza');
  /* glicerol: tres carbonos que unen la cabeza con las colas */
  const g1 = L.a('C', [0, 1.35, 0], 'glicerol'); L.b(iOg, g1, 1, 'glicerol');
  const g2 = L.a('C', [0.55, 0.62, 0], 'glicerol'); L.b(g1, g2, 1, 'glicerol');
  const g3 = L.a('C', [-0.55, 0.62, 0], 'glicerol'); L.b(g1, g3, 1, 'glicerol');
  /* dos colas de ácido graso: una recta (saturada) y una doblada (insaturada) */
  [[g2, 0.62, false], [g3, -0.62, true]].forEach(([anc, x0, insat]) => {
    const oe = L.a('O', [x0, -0.10, 0], 'ester'); L.b(anc, oe, 1, 'ester');
    const ce = L.a('C', [x0, -0.92, 0], 'ester'); L.b(oe, ce, 1, 'ester');
    L.b(ce, L.a('O', [x0 + (x0>0?0.80:-0.80), -0.72, 0], 'ester'), 2, 'ester');
    let px = x0, py = -0.92, ang = -Math.PI/2, prev = ce;
    for (let i=0;i<11;i++){
      if (insat && i === 5) ang += 0.68*(x0>0?1:-1);
      px += Math.cos(ang)*0.66; py += Math.sin(ang)*0.66;
      const nx = -Math.sin(ang), ny = Math.cos(ang), s = (i%2 ? 0.28 : -0.28);
      const id = L.a('C', [px + nx*s, py + ny*s, 0], 'colas');
      L.b(prev, id, (insat && i===5) ? 2 : 1, 'colas'); prev = id;
    }
  });
  return L.centrar();
}

/* ---------- Lípidos: bicapa (geometría fusionada, muchas moléculas) ---------- */
function biomBicapa3D(stage){
  const E = new Engine3D(stage, {
    radius:13.5, phi:1.32, theta:0.55, minR:5, maxR:26, target:[0,0,0], dark:true, exposure:1.0,
    aria:'Modelo 3D de una bicapa de fosfolípidos. Arrastra para rotar y usa la lista de partes para seleccionar con el teclado.'
  });
  biomLuz(E);
  const cab = [], col = [], nx = 9, nz = 5, sp = 1.02;
  for (let ix=0; ix<nx; ix++) for (let iz=0; iz<nz; iz++) for (const s of [1,-1]){
    const x = (ix-(nx-1)/2)*sp + (iz%2 ? sp*0.3 : 0), z = (iz-(nz-1)/2)*sp;
    const g = new THREE.SphereGeometry(0.34, 12, 9); g.translate(x, s*1.62, z); cab.push(g);
    for (const t of [-0.17, 0.17]){
      const c = new THREE.CylinderGeometry(0.075, 0.055, 1.45, 7, 1);
      c.translate(x + t, s*0.72, z); col.push(c);
    }
  }
  const mC = new THREE.Mesh(Kit.merge(cab), biomMat(0xe8a232, { roughness:0.3, clearcoat:0.6 }));
  const mT = new THREE.Mesh(Kit.merge(col), biomMat(0xd9cfbb, { roughness:0.7 }));
  E.addPart('cabezas', [mC]); E.addLabel('cabezas','Cabezas polares (miran al agua)', [0, 2.7, 3.4]);
  E.addPart('colas', [mT]);   E.addLabel('colas','Colas apolares (se esconden del agua)', [0, 0, 3.6]);
  /* agua a ambos lados: esferas pequeñas y transparentes */
  const ag = [], rnd = biomAzar(97);
  for (let i=0;i<150;i++){
    const g = new THREE.SphereGeometry(0.12, 7, 5);
    g.translate((rnd()-0.5)*10, (rnd()<0.5 ? 1 : -1)*(2.25 + rnd()*1.7), (rnd()-0.5)*6);
    ag.push(g);
  }
  const mA = new THREE.Mesh(Kit.merge(ag), biomMat(0x59b6e6, { transparent:true, opacity:0.55, roughness:0.15 }));
  E.addPart('agua', [mA], { passThrough:true }); E.addLabel('agua','Agua', [-4.6, 3.6, 0]);
  return E;
}

/* ---------- Proteínas: aminoácido ---------- */
function biomAminoacido(){
  const L = biomLienzo();
  const ca = L.a('C', [0, 0, 0], 'alfa');
  L.b(ca, L.a('H', [0, 0.95, -0.42], 'alfa'), 1, 'alfa');
  /* grupo amino -NH2 */
  const iN = L.a('N', [-1.42, 0.32, 0], 'amino'); L.b(ca, iN, 1, 'amino');
  L.b(iN, L.a('H', [-2.05, 0.95, 0.42], 'amino'), 1, 'amino');
  L.b(iN, L.a('H', [-1.92, -0.28, -0.62], 'amino'), 1, 'amino');
  /* grupo carboxilo -COOH */
  const iC = L.a('C', [1.42, 0.32, 0], 'carboxilo'); L.b(ca, iC, 1, 'carboxilo');
  L.b(iC, L.a('O', [1.62, 1.52, 0.30], 'carboxilo'), 2, 'carboxilo');
  const iO = L.a('O', [2.42, -0.48, -0.25], 'carboxilo'); L.b(iC, iO, 1, 'carboxilo');
  L.b(iO, L.a('H', [3.15, -0.12, -0.60], 'carboxilo'), 1, 'carboxilo');
  /* radical R: lo único que cambia entre los veinte aminoácidos */
  const iR = L.a('R', [0.10, -0.72, 1.35], 'radical', 1.0); L.b(ca, iR, 1, 'radical');
  return L.centrar();
}

/* ---------- Proteínas: tripéptido (enlaces peptídicos) ---------- */
function biomPeptido(){
  const L = biomLienzo();
  let prevC = null;
  for (let u=0; u<3; u++){
    const x = u*3.05 - 3.05, y = (u%2 ? 0.30 : -0.30);
    const iN = L.a('N', [x-1.25, y+0.28, 0], u===0 ? 'esqueleto' : 'enlace');
    if (u===0) L.b(iN, L.a('H', [x-1.85, y+0.92, 0.35], 'esqueleto'), 1, 'esqueleto');
    else L.b(iN, L.a('H', [x-1.35, y+1.22, 0.30], 'enlace'), 1, 'enlace');
    const ca = L.a('C', [x, y, 0], 'esqueleto'); L.b(iN, ca, 1, u===0 ? 'esqueleto' : 'enlace');
    const iR = L.a('R', [x+0.10, y-1.05, 1.15], 'radicales', 0.95); L.b(ca, iR, 1, 'radicales');
    const iC = L.a('C', [x+1.32, y+0.32, 0], 'esqueleto'); L.b(ca, iC, 1, 'esqueleto');
    L.b(iC, L.a('O', [x+1.52, y+1.52, 0.28], 'esqueleto'), 2, 'esqueleto');
    if (prevC !== null) L.b(prevC, iN, 1, 'enlace');   /* el enlace peptídico C–N */
    prevC = iC;
    if (u===2){
      const iO = L.a('O', [x+2.35, y-0.45, -0.25], 'esqueleto'); L.b(iC, iO, 1, 'esqueleto');
      L.b(iO, L.a('H', [x+3.05, y-0.12, -0.55], 'esqueleto'), 1, 'esqueleto');
    }
  }
  return L.centrar();
}

/* ---------- Ácidos nucleicos: nucleótido ---------- */
function biomNucleotido(){
  const L = biomLienzo();
  /* grupo fosfato */
  const iP = L.a('P', [-3.35, 0.55, 0], 'fosfato');
  L.b(iP, L.a('O', [-4.25, 1.35, 0.35], 'fosfato'), 2, 'fosfato');
  L.b(iP, L.a('O', [-4.05, -0.45, -0.45], 'fosfato'), 1, 'fosfato');
  L.b(iP, L.a('O', [-3.05, 1.35, -1.05], 'fosfato'), 1, 'fosfato');
  const iOp = L.a('O', [-2.25, -0.05, 0.45], 'fosfato'); L.b(iP, iOp, 1, 'fosfato');
  /* pentosa: anillo de cinco (cuatro carbonos y un oxígeno) */
  const anillo = [];
  for (let i=0;i<5;i++){
    const a = i*2*Math.PI/5 + 1.1;
    anillo.push(L.a(i===0 ? 'O' : 'C', [-0.55 + Math.cos(a)*1.05, Math.sin(a)*1.05, 0.10*(i%2?1:-1)], 'azucar'));
  }
  for (let i=0;i<5;i++) L.b(anillo[i], anillo[(i+1)%5], 1, 'azucar');
  const c5 = L.a('C', [-1.75, 0.85, 0.30], 'azucar'); L.b(anillo[4], c5, 1, 'azucar'); L.b(c5, iOp, 1, 'fosfato');
  const oh = L.a('O', [-0.85, -1.95, -0.35], 'azucar'); L.b(anillo[2], oh, 1, 'azucar');
  L.b(oh, L.a('H', [-1.35, -2.55, -0.75], 'azucar'), 1, 'azucar');
  /* base nitrogenada: anillo de seis con dos nitrógenos */
  const iNb = L.a('N', [0.78, 0.55, 0], 'base'); L.b(anillo[1], iNb, 1, 'base');
  const bas = [iNb];
  for (let i=1;i<6;i++){
    const a = i*Math.PI/3 + 2.7;
    bas.push(L.a(i===3 ? 'N' : 'C', [0.78 + 1.25 + Math.cos(a)*1.25, 0.55 + Math.sin(a)*1.25, 0], 'base'));
  }
  for (let i=0;i<6;i++) L.b(bas[i], bas[(i+1)%6], i%2 ? 2 : 1, 'base');
  L.b(bas[2], L.a('O', [bas.length ? L.atoms[bas[2]].p[0]+0.95 : 0, L.atoms[bas[2]].p[1]+0.95, 0], 'base'), 2, 'base');
  L.b(bas[4], L.a('H', [L.atoms[bas[4]].p[0]+0.60, L.atoms[bas[4]].p[1]-0.85, 0], 'base'), 1, 'base');
  return L.centrar();
}

/* =====================================================================
   2 · CATÁLOGO DE MODELOS, PARTES Y EXPLICACIONES
   ===================================================================== */
const BIOM_FAMILIAS = [
  { id:'carb', n:'Carbohidratos', em:'🍚', col:'#e8a232',
    d:'Energía rápida y estructura. Están hechos de carbono, hidrógeno y oxígeno en proporción aproximada 1:2:1.' },
  { id:'lip',  n:'Lípidos', em:'🫒', col:'#d7c44a',
    d:'Reserva de energía, membranas y hormonas. Casi todo son cadenas de carbono e hidrógeno: por eso no se mezclan con el agua.' },
  { id:'prot', n:'Proteínas', em:'🧬', col:'#59b6e6',
    d:'Las herramientas de la célula: enzimas, transporte, defensa, movimiento y estructura. Llevan nitrógeno.' },
  { id:'anuc', n:'Ácidos nucleicos', em:'🧪', col:'#9160d4',
    d:'ADN y ARN: guardan y transmiten la información para fabricar proteínas. Llevan nitrógeno y fósforo.' }
];

const BIOM_MODELOS = {
  glucosa:{ fam:'carb', n:'Glucosa', sub:'monómero', formula:'C₆H₁₂O₆', radio:9.5,
    d:'Es el monómero: la pieza suelta. En disolución casi toda la glucosa está cerrada en anillo, no en cadena abierta como se dibuja en muchos libros.',
    funcion:'Combustible inmediato de la célula. En la respiración celular se oxida y su energía pasa al ATP.',
    build: biomGlucosa,
    partes:[
      { id:'anillo', n:'Esqueleto del anillo', c:'#33393f', d:'Cinco carbonos y un oxígeno cerrados en hexágono. Ese oxígeno dentro del anillo no es un hidroxilo: es parte de la estructura.' },
      { id:'anomerico', n:'Carbono anomérico (C1)', c:'#d64a3c', d:'El carbono clave: su hidroxilo es el que reacciona para unirse a otra glucosa. Si queda hacia abajo la unión es α (almidón); si queda hacia arriba es β (celulosa). Ese detalle mínimo decide si podemos digerirlo.' },
      { id:'hidroxilos', n:'Hidroxilos (–OH)', c:'#d64a3c', d:'Cada –OH puede formar puentes de hidrógeno con el agua. Por eso la glucosa es muy soluble y viaja disuelta en la sangre.' },
      { id:'ch2oh', n:'Grupo CH₂OH (C6)', c:'#e8a232', d:'El carbono 6 sobresale del anillo. Es el punto donde se enganchan las ramificaciones del glucógeno y de la amilopectina.' },
      { id:'hidrogenos', n:'Hidrógenos', c:'#eef3f8', d:'Se dibujan pequeños, pero son la mitad de los átomos. Cuando un modelo los esconde, no es que no estén: es una simplificación.' }
    ]},
  almidon:{ fam:'carb', n:'Almidón (enlace α)', sub:'polímero', formula:'(C₆H₁₀O₅)ₙ', radio:16,
    d:'Cinco glucosas unidas con enlace α(1→4). Como el oxígeno puente sale hacia abajo, la cadena se curva y termina enroscada en hélice.',
    funcion:'Reserva de energía de las plantas: papa, yuca, arroz, verde. Nuestra amilasa sí rompe el enlace α, así que lo digerimos.',
    build: () => biomPolisacarido('alfa'),
    partes:[
      { id:'glucosa', n:'Unidades de glucosa', c:'#33393f', d:'Las mismas piezas del modelo anterior, dibujadas sin sus hidrógenos para poder ver la forma del conjunto.' },
      { id:'enlace', n:'Enlace glucosídico α(1→4)', c:'#d64a3c', d:'El puente de oxígeno entre el C1 de una glucosa y el C4 de la siguiente. Al formarse se libera una molécula de agua: eso es una reacción de condensación.' },
      { id:'ch2oh', n:'Grupos CH₂OH', c:'#e8a232', d:'Aquí todos apuntan al mismo lado, porque todas las unidades están en la misma orientación.' },
      { id:'hidroxilos', n:'Hidroxilos libres', c:'#d64a3c', d:'Quedan expuestos hacia fuera de la hélice y atrapan agua: por eso el almidón cocido se hincha y espesa.' }
    ]},
  celulosa:{ fam:'carb', n:'Celulosa (enlace β)', sub:'polímero', formula:'(C₆H₁₀O₅)ₙ', radio:18,
    d:'Las mismas cinco glucosas, pero con enlace β(1→4): cada unidad entra girada 180°. La cadena sale recta y las cadenas vecinas se pegan entre sí.',
    funcion:'Es la pared de las células vegetales: madera, algodón, fibra de la fruta. No tenemos la enzima que rompe el enlace β, así que pasa entera: es la fibra.',
    build: () => biomPolisacarido('beta'),
    partes:[
      { id:'glucosa', n:'Unidades de glucosa', c:'#33393f', d:'Fíjate en que se alternan: una arriba, la siguiente al revés. Esa alternancia es toda la diferencia con el almidón.' },
      { id:'enlace', n:'Enlace glucosídico β(1→4)', c:'#d64a3c', d:'Químicamente es también un puente de oxígeno; geométricamente está en la posición contraria. Una enzima reconoce formas, no fórmulas: por eso la amilasa no lo toca.' },
      { id:'ch2oh', n:'Grupos CH₂OH', c:'#e8a232', d:'Aquí apuntan alternadamente arriba y abajo. Esos grupos forman puentes de hidrógeno con la cadena de al lado y arman fibras muy resistentes.' },
      { id:'hidroxilos', n:'Hidroxilos libres', c:'#d64a3c', d:'Quedan alineados a lo largo de la cadena recta, ideales para engancharse con las cadenas vecinas.' }
    ]},
  graso:{ fam:'lip', n:'Ácido graso saturado', sub:'monómero', formula:'C₁₅H₃₁COOH (aprox.)', radio:17,
    d:'Una cabeza ácida y una cola larga de carbonos e hidrógenos. Saturado significa que no hay dobles enlaces: cada carbono lleva todos los hidrógenos que puede.',
    funcion:'Reserva concentrada de energía: más del doble de energía por gramo que un carbohidrato, porque está más reducido (más enlaces C–H).',
    build: () => biomAcidoGraso(false),
    partes:[
      { id:'carboxilo', n:'Cabeza –COOH', c:'#d64a3c', d:'La única parte polar de la molécula. Puede ceder su hidrógeno: por eso se llama ácido graso.' },
      { id:'cadena', n:'Cola de carbonos', c:'#33393f', d:'Recta y flexible. Al no tener dobles enlaces, las colas se apilan muy juntas: por eso las grasas saturadas son sólidas a temperatura ambiente.' },
      { id:'hidrogenos', n:'Hidrógenos de la cola', c:'#eef3f8', d:'En estos enlaces C–H está guardada la energía. Y como no tienen carga, no atraen al agua: la cola es apolar.' }
    ]},
  graso2:{ fam:'lip', n:'Ácido graso insaturado', sub:'monómero', formula:'C₁₇H₃₃COOH (aprox.)', radio:17,
    d:'La misma idea, con un doble enlace en posición cis. Ese doble enlace quiebra la cola: mira el codo del modelo.',
    funcion:'Aceites vegetales y grasa de pescado. El codo impide que las moléculas se apilen, así que son líquidos a temperatura ambiente y dan fluidez a las membranas.',
    build: () => biomAcidoGraso(true),
    partes:[
      { id:'carboxilo', n:'Cabeza –COOH', c:'#d64a3c', d:'Igual que en el saturado: la parte polar.' },
      { id:'doble', n:'Doble enlace cis', c:'#59b6e6', d:'Dos varillas paralelas: ahí faltan dos hidrógenos. El doble enlace no gira, así que la cadena queda doblada en ese punto para siempre.' },
      { id:'cadena', n:'Cola de carbonos', c:'#33393f', d:'Compárala con la del saturado: aquí no es recta. Por eso las moléculas no se apilan y el aceite no se solidifica en la cocina.' },
      { id:'hidrogenos', n:'Hidrógenos', c:'#eef3f8', d:'Faltan dos respecto del saturado: eso es exactamente lo que significa “insaturado”.' }
    ]},
  fosfolipido:{ fam:'lip', n:'Fosfolípido', sub:'molécula anfipática', formula:'cabeza fosfato + 2 colas', radio:23,
    d:'Se parece a un triglicérido, pero una de las tres colas fue sustituida por un fosfato con carga. Resultado: una molécula con una punta que ama el agua y dos colas que la evitan.',
    funcion:'Es el ladrillo de todas las membranas celulares. Su doble personalidad es la razón de que la membrana se forme sola en el agua.',
    build: biomFosfolipido,
    partes:[
      { id:'cabeza', n:'Cabeza polar (fosfato y colina)', c:'#e8a232', d:'Tiene cargas eléctricas: el agua la rodea encantada. En un modelo de membrana es la bolita que siempre se dibuja hacia fuera.' },
      { id:'glicerol', n:'Glicerol', c:'#33393f', d:'Tres carbonos que hacen de nudo: sostienen la cabeza por un lado y las dos colas por el otro.' },
      { id:'ester', n:'Enlaces éster', c:'#d64a3c', d:'Unen el glicerol con cada cola. Son los enlaces que rompen las lipasas durante la digestión.' },
      { id:'colas', n:'Colas apolares', c:'#8e9aa6', d:'Una recta y una doblada, como en la mayoría de las membranas reales. La cola doblada mantiene la membrana fluida.' }
    ]},
  aminoacido:{ fam:'prot', n:'Aminoácido', sub:'monómero', formula:'H₂N–CHR–COOH', radio:9.5,
    d:'Todos los aminoácidos tienen el mismo esqueleto: un carbono central con un grupo amino, un grupo carboxilo, un hidrógeno y un radical R.',
    funcion:'Son las 20 letras con las que se escriben todas las proteínas. Nueve de ellas son esenciales: el cuerpo no las fabrica y deben venir de la comida.',
    build: biomAminoacido,
    partes:[
      { id:'amino', n:'Grupo amino (–NH₂)', c:'#3f74d6', d:'El que aporta el nitrógeno. Es básico: capta hidrógenos del medio.' },
      { id:'carboxilo', n:'Grupo carboxilo (–COOH)', c:'#d64a3c', d:'Es ácido: cede hidrógenos. Tener las dos cosas a la vez permite que el aminoácido amortigüe cambios de pH.' },
      { id:'alfa', n:'Carbono α', c:'#33393f', d:'El carbono central, el punto de encuentro de los cuatro grupos.' },
      { id:'radical', n:'Radical R', c:'#9160d4', d:'Lo único que cambia entre los veinte aminoácidos. Puede ser polar, apolar, ácido o básico, y de eso depende cómo se pliega después la proteína.' }
    ]},
  peptido:{ fam:'prot', n:'Tripéptido', sub:'polímero', formula:'3 aminoácidos', radio:15,
    d:'Tres aminoácidos unidos. El grupo carboxilo de uno reacciona con el grupo amino del siguiente y se libera agua.',
    funcion:'Así se construyen las proteínas en el ribosoma, un aminoácido a la vez, siguiendo el orden que dicta el ARN mensajero.',
    build: biomPeptido,
    partes:[
      { id:'enlace', n:'Enlace peptídico', c:'#3f74d6', d:'La unión C–N entre dos aminoácidos. Es rígido y plano: no gira. Esa rigidez es la que obliga a la cadena a plegarse en hélices y láminas, y no de cualquier manera.' },
      { id:'esqueleto', n:'Esqueleto de la cadena', c:'#33393f', d:'N–C–C, N–C–C, N–C–C… Se repite siempre igual en todas las proteínas del planeta.' },
      { id:'radicales', n:'Radicales R', c:'#9160d4', d:'Salen hacia fuera del esqueleto. Son los que se atraen o se repelen entre sí y deciden la forma final: la secuencia manda sobre la forma.' }
    ]},
  nucleotido:{ fam:'anuc', n:'Nucleótido', sub:'monómero', formula:'fosfato + pentosa + base', radio:12,
    d:'Tres piezas siempre en el mismo orden: un fosfato, un azúcar de cinco carbonos y una base nitrogenada.',
    funcion:'Encadenados forman el ADN y el ARN. Y uno de ellos, con dos fosfatos más, es el ATP: la moneda de energía de la célula.',
    build: biomNucleotido,
    partes:[
      { id:'fosfato', n:'Grupo fosfato', c:'#e8a232', d:'Tiene carga negativa: por eso el ADN es un ácido y migra hacia el polo positivo en una electroforesis. Se une al fosfato del siguiente nucleótido y forma el esqueleto de la cadena.' },
      { id:'azucar', n:'Pentosa (azúcar de 5 C)', c:'#33393f', d:'Si es desoxirribosa, la molécula es ADN; si es ribosa (tiene un –OH más), es ARN. Un solo oxígeno de diferencia decide cuál de los dos es.' },
      { id:'base', n:'Base nitrogenada', c:'#3f74d6', d:'Aquí está la información. Es la única parte que cambia de un nucleótido a otro: A, T, C, G (o U en el ARN). Su forma plana permite el apareamiento con la base complementaria.' }
    ]}
};

/* Escena 3D genérica para un modelo del catálogo */
function biomModelo3D(stage, id, onSel){
  const M = BIOM_MODELOS[id];
  if (id === 'bicapa') return biomBicapa3D(stage);
  const E = new Engine3D(stage, {
    radius:M.radio, phi:1.28, theta:0.42, minR:4, maxR:M.radio*2.2, target:[0,0,0], dark:true, exposure:1.0,
    aria:'Modelo 3D de '+M.n+' en bolas y varillas. Arrastra para rotar, rueda del ratón para acercar, flechas del teclado para girar. La lista de partes permite seleccionar cada grupo con el teclado.',
    onSelect:(pid)=>{ if (pid) onSel(pid); }
  });
  biomLuz(E);
  const etq = {};
  M.partes.forEach(p => { etq[p.id] = p.n; });
  biomMontar(E, M.build(), etq);
  E.spin = true;
  return E;
}

/* =====================================================================
   3 · PROTEÍNA: PLEGAMIENTO, DESNATURALIZACIÓN Y SITIO ACTIVO
   ===================================================================== */
const BIOM_NRES = 44;
/* Dos juegos de coordenadas: la forma plegada (funcional) y la cadena suelta */
function biomCoordenadas(){
  const fold = [], coil = [];
  for (let i=0;i<BIOM_NRES;i++){
    const t = i/(BIOM_NRES-1), big = t*Math.PI*2*1.7, Rb = 1.45, small = i*1.15, rs = 0.62;
    fold.push([
      Math.cos(big)*Rb + Math.cos(small)*rs*Math.cos(big),
      (t-0.5)*1.9 + Math.sin(small)*rs,
      Math.sin(big)*Rb + Math.cos(small)*rs*Math.sin(big)
    ]);
  }
  const rnd = biomAzar(20261);
  let x = 0, y = 0, z = 0, a = 0.15, b = 0;
  for (let i=0;i<BIOM_NRES;i++){
    coil.push([x, y, z]);
    a += (rnd()-0.5)*1.35; b += (rnd()-0.5)*1.05;
    x += Math.cos(a)*0.50 + 0.10; y += Math.sin(a)*0.44; z += Math.sin(b)*0.50;
  }
  const c = [0,0,0];
  coil.forEach(p => { c[0]+=p[0]; c[1]+=p[1]; c[2]+=p[2]; });
  coil.forEach(p => { p[0]-=c[0]/BIOM_NRES; p[1]-=c[1]/BIOM_NRES; p[2]-=c[2]/BIOM_NRES; });
  return { fold, coil };
}
/* Índices de los aminoácidos que forman el sitio activo */
const BIOM_SITIO = [14, 15, 16];

function biomProteina3D(stage){
  const E = new Engine3D(stage, {
    radius:8.6, phi:1.24, theta:0.5, minR:4, maxR:26, target:[0,0,0], dark:true, exposure:1.0,
    aria:'Modelo 3D de una enzima. El deslizador de temperatura y el de pH cambian su forma. Arrastra para rotar; las flechas del teclado también giran el modelo.'
  });
  biomLuz(E);
  const { fold, coil } = biomCoordenadas();
  const pos = fold.map(p => new THREE.Vector3(p[0], p[1], p[2]));
  const esSitio = i => BIOM_SITIO.indexOf(i) >= 0;
  const bolas = [], cadena = [], sitio = [];
  for (let i=0;i<BIOM_NRES;i++){
    const hidro = (i % 3 === 0);
    const m = new THREE.Mesh(new THREE.SphereGeometry(esSitio(i) ? 0.34 : 0.26, 16, 12),
      biomMat(esSitio(i) ? 0xffd24a : (hidro ? 0xe08a4a : 0x59b6e6), { roughness:0.35, clearcoat:0.5 }));
    m.position.copy(pos[i]); bolas.push(m);
    (esSitio(i) ? sitio : cadena).push(m);
  }
  const curva = new THREE.CatmullRomCurve3(pos);
  const tubo = new THREE.Mesh(new THREE.TubeGeometry(curva, 120, 0.13, 8, false), biomMat(0x8fa4b6, { roughness:0.6 }));
  E.addPart('esqueleto', [tubo]);
  E.addPart('residuos', cadena);
  E.addPart('sitio', sitio);
  const centro0 = new THREE.Vector3();
  BIOM_SITIO.forEach(i => centro0.add(new THREE.Vector3(fold[i][0], fold[i][1], fold[i][2])));
  centro0.multiplyScalar(1/BIOM_SITIO.length);
  E.addLabel('sitio', 'Sitio activo', [centro0.x*1.6, centro0.y*1.6 + 1.1, centro0.z*1.6]);
  /* sustrato: dos esferas unidas que deben encajar en el sitio activo */
  const sA = new THREE.Mesh(new THREE.SphereGeometry(0.40, 16, 12), biomMat(0x66d98a, { roughness:0.3, clearcoat:0.6 }));
  const sB = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), biomMat(0x4bbf72, { roughness:0.3, clearcoat:0.6 }));
  const sV = biomVarilla([0,0,0],[0.7,0,0], 0x3f9e5e, 0.11);
  const sus = new THREE.Group(); sA.position.set(0,0,0); sB.position.set(0.72,0,0); sV.position.set(0.36,0,0);
  sus.add(sA, sB, sV); E.scene.add(sus);
  const centro = new THREE.Vector3();
  BIOM_SITIO.forEach(i => centro.add(pos[i]));
  centro.multiplyScalar(1/BIOM_SITIO.length);
  const dir = centro.lengthSq() > 0.01 ? centro.clone().normalize() : new THREE.Vector3(1,0,0);
  const dentro = dir.clone().multiplyScalar(3.0), fuera = dir.clone().multiplyScalar(6.2).add(new THREE.Vector3(0, 2.6, 0));
  sus.position.copy(dentro);

  E.bioAplicar = function(f){
    const t = biomSuave(clamp(f, 0, 1));
    for (let i=0;i<BIOM_NRES;i++){
      pos[i].set(biomLerp(fold[i][0], coil[i][0], t), biomLerp(fold[i][1], coil[i][1], t), biomLerp(fold[i][2], coil[i][2], t));
      bolas[i].position.copy(pos[i]);
    }
    tubo.geometry.dispose();
    tubo.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pos), 120, 0.13, 8, false);
    const encaja = t < 0.22;
    E.goal.r = biomLerp(11.5, 16.5, t);   /* la cadena extendida ocupa mucho más: la cámara se aleja */
    sus.position.lerpVectors(dentro, fuera, clamp((t-0.12)/0.4, 0, 1));
    [sA, sB].forEach(m => { m.material.opacity = encaja ? 1 : 0.45; m.material.transparent = !encaja; });
    sitio.forEach(m => m.material.color.setHex(encaja ? 0xffd24a : 0x6d7480));
    return encaja;
  };
  /* la cámara se coloca mirando de frente al sitio activo: si no, el sustrato
     queda detrás del glóbulo y el estudiante no ve si encaja o no */
  E.goal.phi = clamp(Math.acos(clamp(dir.y, -1, 1)), 0.35, Math.PI-0.35);
  E.goal.theta = Math.atan2(dir.x, dir.z);
  E.sph.phi = E.goal.phi; E.sph.theta = E.goal.theta;
  E.bioAplicar(0);
  return E;
}

/* =====================================================================
   4 · ENZIMA: LLAVE Y CERRADURA (cuatro fases)
   ===================================================================== */
const BIOM_FASES = [
  { n:'1 · Enzima y sustrato libres', d:'La enzima flota entre millones de moléculas. Solo una tiene la forma complementaria a su sitio activo: el sustrato.' },
  { n:'2 · Unión', d:'El sustrato entra en el sitio activo y la enzima se cierra un poco sobre él. No es una llave rígida: es un ajuste inducido. Se forma el complejo enzima-sustrato.' },
  { n:'3 · Catálisis', d:'La enzima tensiona el enlace y lo rompe con muchísima menos energía de la que haría falta sin ella. La enzima no cambia el resultado: cambia el camino.' },
  { n:'4 · Liberación', d:'Los productos salen y la enzima queda exactamente igual que al principio, lista para repetir miles de veces por segundo. Por eso hace falta tan poca cantidad de enzima.' }
];
function biomEnzima3D(stage){
  const E = new Engine3D(stage, {
    radius:12.5, phi:1.32, theta:0.28, minR:5, maxR:24, target:[1.7,0,0], dark:true, exposure:1.0,
    aria:'Modelo 3D del modelo llave-cerradura de una enzima. Usa los botones de fase para avanzar paso a paso sin depender de la animación.'
  });
  biomLuz(E);
  const lobulo = (y) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1.6, 30, 22), biomMat(0x3f86c0, { roughness:0.4, clearcoat:0.3 }));
    m.scale.set(1.05, 0.72, 1.0); m.position.set(-1.05, y, 0); return m;
  };
  const la = lobulo(0.98), lb = lobulo(-0.98);
  E.addPart('enzima', [la, lb]); E.addLabel('enzima', 'Enzima', [-3.4, 0, 1.6]);
  const cuna = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.17, 10, 26, Math.PI), biomMat(0xd8a017, { roughness:0.45 }));
  cuna.rotation.z = -Math.PI/2; cuna.position.set(0.62, 0, 0);
  E.addPart('sitio', [cuna]); E.addLabel('sitio', 'Sitio activo', [0.9, 1.8, 1.2]);
  /* Los átomos del sustrato se registran como parte y el motor los reparenta a la
     escena: por eso se mueven directamente, sin agruparlos. */
  const pA = new THREE.Mesh(new THREE.SphereGeometry(0.60, 22, 16), biomMat(0x3fa85f, { roughness:0.35, clearcoat:0.4 }));
  const pB = new THREE.Mesh(new THREE.SphereGeometry(0.52, 22, 16), biomMat(0x2f8a4a, { roughness:0.35, clearcoat:0.4 }));
  const enl = biomVarilla([0,-0.55,0], [0,0.55,0], 0xc03828, 0.15);   /* longitud 1,1 sobre el eje Y */
  E.addPart('sustrato', [pA, pB]); E.addLabel('sustrato', 'Sustrato', [5.4, 1.4, 0]);
  E.addPart('enlace-roto', [enl], { pickable:false });
  /* estados de cada fase: posición de las dos mitades, apertura de los lóbulos y enlace visible */
  const EST = [
    { ax:[5.0, 0.55, 0],  bx:[6.1, 0.05, 0],  abre:0.98, enlace:true  },
    { ax:[1.35, 0.42, 0], bx:[2.45,-0.02, 0], abre:0.80, enlace:true  },
    { ax:[1.15, 0.85, 0], bx:[2.80,-0.55, 0], abre:0.74, enlace:false },
    { ax:[2.2, 2.55, 0],  bx:[4.2,-2.05, 0],  abre:0.98, enlace:false }
  ];
  let fase = 0;
  const cur = { ax:EST[0].ax.slice(), bx:EST[0].bx.slice(), abre:EST[0].abre };
  const poner = (inmediato) => {
    const g = EST[fase], k = inmediato ? 1 : 0.10;
    for (let i=0;i<3;i++){ cur.ax[i] = biomLerp(cur.ax[i], g.ax[i], k); cur.bx[i] = biomLerp(cur.bx[i], g.bx[i], k); }
    cur.abre = biomLerp(cur.abre, g.abre, k);
    pA.position.set(cur.ax[0], cur.ax[1], cur.ax[2]);
    pB.position.set(cur.bx[0], cur.bx[1], cur.bx[2]);
    la.position.y = cur.abre; lb.position.y = -cur.abre;
    enl.visible = g.enlace;
    if (g.enlace){
      const A = pA.position, B = pB.position, d = new THREE.Vector3().subVectors(B, A), L = d.length() || 0.001;
      enl.position.copy(A).addScaledVector(d, 0.5);
      enl.quaternion.setFromUnitVectors(BIOM_EJE, d.clone().normalize());
      enl.scale.set(1, L/1.1, 1);
    }
  };
  poner(true);
  E.onFrame(() => { if (!biomQuieto()) poner(false); });
  E.bioFase = (n) => { fase = clamp(n, 0, 3); if (biomQuieto()) poner(true); };
  E.bioCual = () => fase;
  return E;
}

/* =====================================================================
   5 · MODELOS CUANTITATIVOS
   ===================================================================== */
/* --- velocidad de una enzima según temperatura y pH (0 a 100 %) --- */
const BIOM_ENZIMAS = [
  { id:'amilasa',  n:'Amilasa salival', sust:'Almidón',   donde:'Boca',              pHopt:6.8, w:1.5, col:'#e8a232' },
  { id:'pepsina',  n:'Pepsina',         sust:'Proteínas', donde:'Estómago',          pHopt:2.0, w:1.2, col:'#d64a3c' },
  { id:'tripsina', n:'Tripsina',        sust:'Proteínas', donde:'Intestino delgado', pHopt:8.0, w:1.3, col:'#59b6e6' }
];
const BIOM_TMAX = 1.156;   /* valor máximo de la curva de temperatura, para normalizar a 100 % */
function biomVelT(T){ return Math.pow(1.09, T-37) * (1/(1+Math.exp((T-44)/2.0))) / BIOM_TMAX; }
function biomVelPH(pH, e){ return Math.exp(-Math.pow((pH - e.pHopt)/e.w, 2)); }
function biomVel(T, pH, e){ return clamp(biomVelT(T), 0, 1) * biomVelPH(pH, e) * 100; }

/* --- glucemia tras una comida: retroalimentación negativa con insulina y glucagón --- */
function biomGlucemia(comida, modo){
  const beta = modo === 'tipo1' ? 0 : modo === 'tipo2' ? 1.1 : 1;
  const sens = modo === 'tipo2' ? 0.32 : 1;
  const glucOn = modo !== 'singlucagon';
  let G = 95, I = 0, Gl = 0;
  /* un paso de un minuto: insulina baja la glucosa, glucagón la sube, el hígado aporta un goteo */
  const paso = (entrada) => {
    const objI = beta*Math.max(0, G-95)*0.050;
    I += (objI - I)*(objI > I ? 0.090 : 0.018);          /* la insulina sube rápido y baja despacio */
    const objGl = glucOn ? Math.max(0, 90-G)*0.080 : 0;
    Gl += (objGl - Gl)*0.11;
    G += entrada - I*sens*G*0.0105 - 0.0025*(G-62) + Gl*0.95 + 0.30;
    G = clamp(G, 20, 420);
  };
  for (let t=0; t<600; t++) paso(0);   /* reposo previo: cada caso llega a SU propio valor basal */
  const basal = G;
  const g = [], ins = [], glu = [];
  let max = 0, min = 999, tmax = 0, tmin = 0;
  for (let t=0; t<=300; t++){
    if (t % 3 === 0){ g.push({x:t, y:G}); ins.push({x:t, y:I*95}); glu.push({x:t, y:Gl*95}); }
    if (t > 10 && G > max){ max = G; tmax = t; }
    if (t > 60 && G < min){ min = G; tmin = t; }
    paso(comida*0.030*Math.exp(-Math.pow((t-40)/34, 2)));
  }
  return { g, ins, glu, basal, max, tmax, min, tmin, fin:G };
}

/* --- termorregulación: el cuerpo frente al ambiente --- */
function biomTermo(Ta, ejercicio, modo){
  const set = modo === 'fiebre' ? 39.2 : 37.0;
  const sudorOn = modo !== 'deshidratado';
  const tiritOn = modo !== 'sintiritar';
  let T = 37.0, sud = 0, tir = 0, vaso = 0.3;
  const t1 = [], t2 = [], t3 = [];
  let max = -99, min = 99;
  for (let t=0; t<=180; t++){
    if (t % 2 === 0){ t1.push({x:t, y:T}); t2.push({x:t, y:sud*100}); t3.push({x:t, y:tir*100}); }
    if (t > 20){ max = Math.max(max, T); min = Math.min(min, T); }
    const err = T - set;
    vaso += (clamp(0.5 + err*4, 0, 1) - vaso)*0.25;
    sud  += ((sudorOn ? clamp((err-0.05)*6, 0, 1) : 0) - sud)*0.15;
    tir  += ((tiritOn ? clamp((-err-0.05)*6, 0, 1) : 0) - tir)*0.15;
    const prod = 1.0 + ejercicio*4.5 + tir*2.2;
    const perd = (0.055 + 0.075*vaso)*(T - Ta) + sud*3.0;
    T = clamp(T + (prod - perd)*0.030, 30, 43);
  }
  return { t1, t2, t3, max, min, fin:T, set };
}

/* =====================================================================
   6 · AFIRMACIONES DE SALUD PARA EVALUAR (destreza AO.CVT.10.03)
   ===================================================================== */
const BIOM_AFIRMA = [
  { t:'«Este jugo detox limpia las toxinas del hígado y regula el azúcar en sangre.»', ok:'marketing',
    d:'No dice qué toxina, ni cómo se mide, ni con qué estudio. El hígado y el riñón ya hacen esa función y ningún jugo mejora una glucemia que se regula por insulina y glucagón. Publicidad, no evidencia.' },
  { t:'«En un ensayo con 120 personas, quienes tomaron fibra soluble en el desayuno tuvieron un pico de glucosa menor que el grupo control.»', ok:'evidencia',
    d:'Tiene número de participantes, grupo de comparación y una variable medible. Es evidencia: limitada (120 personas, un desayuno), pero evidencia.' },
  { t:'«Como la fibra bajó el pico de glucosa en ese estudio, comer fibra cura la diabetes tipo 2.»', ok:'extrapolacion',
    d:'El dato es real, pero la conclusión salta muy lejos: de “baja un pico” a “cura una enfermedad crónica”. Eso es extrapolar más allá de lo que el estudio midió.' },
  { t:'«El azúcar moreno es saludable porque es natural.»', ok:'marketing',
    d:'“Natural” no es una categoría nutricional. El azúcar moreno aporta prácticamente la misma sacarosa y la misma energía que el blanco; la diferencia en minerales es insignificante en las cantidades que se consumen.' }
];
const BIOM_CATS = [
  { id:'evidencia',     n:'Evidencia' },
  { id:'extrapolacion', n:'Extrapolación' },
  { id:'marketing',     n:'Marketing' }
];

/* =====================================================================
   7 · PREGUNTAS DEL RETO FINAL
   ===================================================================== */
const BIOM_PREGUNTAS = [
  { q:'Comparaste los modelos de almidón y de celulosa: las mismas glucosas, la misma fórmula, y sin embargo digerimos una y la otra no. ¿Qué explica la diferencia?',
    ops:['Que la celulosa tiene más carbonos por unidad, así que es más difícil de romper',
         'Que el enlace β coloca cada glucosa girada 180°, y la amilasa —cuyo sitio activo tiene una forma fija— no puede acoplarse a esa geometría',
         'Que la celulosa es una molécula muerta de la planta y el almidón está vivo'],
    ok:1,
    fb:'Exacto. La fórmula es la misma; lo que cambia es la orientación de un enlace. Y como la enzima reconoce formas y no fórmulas, ese giro basta para que la amilasa no encaje. Por eso la fibra atraviesa el tubo digestivo casi intacta, lo cual no significa que sea inútil: retarda la absorción y alimenta la microbiota.',
    wrong:['Tienen exactamente el mismo número de carbonos por unidad: las dos son polímeros de glucosa, (C₆H₁₀O₅)ₙ. Vuelve a los dos modelos y compara las unidades una por una: son idénticas.',
           'Ni la celulosa ni el almidón están vivos; son moléculas. Lo que decide si podemos digerirlas es si tenemos una enzima con la forma adecuada para su enlace, y la celulasa nosotros no la fabricamos.'] },

  { q:'En la curva de velocidad frente a temperatura, la actividad sube hasta unos 40 °C y luego se desploma en pocos grados. ¿Por qué el descenso es tan brusco y no gradual?',
    ops:['Porque a más de 40 °C las moléculas se mueven tan rápido que ya no logran chocar entre sí',
         'Porque por encima del óptimo la proteína se desnaturaliza: pierde su forma tridimensional y el sitio activo deja de existir, tal como viste al mover el deslizador de temperatura',
         'Porque el sustrato se evapora antes de llegar al sitio activo'],
    ok:1,
    fb:'Eso es. Hasta el óptimo mandan los choques: más temperatura, más encuentros por segundo. Pasado el óptimo manda otra cosa, la pérdida de la forma, y como la forma es la función, la caída es abrupta y además irreversible. Fíjate en que las dos ramas de la curva obedecen a causas distintas: no es una sola tendencia.',
    wrong:['Es al revés: más temperatura significa más energía cinética y más choques por segundo. Ese efecto es justamente el que hace subir la primera parte de la curva; el desplome tiene otra causa.',
           'A 45 o 50 °C no se evapora nada dentro del cuerpo ni del tubo de ensayo. Lo que se pierde a esa temperatura es la estructura plegada de la proteína, no el sustrato.'] },

  { q:'En el simulador de glucemia elegiste «diabetes tipo 1» y la curva nunca regresó al valor de partida. Si describes el lazo de retroalimentación como sensor → señal → efector, ¿qué pieza está fallando?',
    ops:['El sensor: el páncreas no detecta que la glucosa subió',
         'La señal: las células beta no producen insulina, así que la orden de retirar glucosa nunca se emite y el lazo queda abierto',
         'El efector: el hígado y el músculo están dañados y no pueden captar glucosa'],
    ok:1,
    fb:'Correcto. En la diabetes tipo 1 el problema es la señal: el sistema inmunitario destruyó las células beta y no hay insulina que enviar. Compáralo con el tipo 2, donde sí hay insulina —incluso de más— pero los efectores responden poco: por eso su curva sube menos que la del tipo 1 pero baja con mucha lentitud y su valor basal queda alto. Mismo síntoma, mecanismos distintos.',
    wrong:['La detección funciona: el páncreas percibe la glucosa igual que siempre. Lo que falta son las células que fabrican la hormona con la que se responde a esa detección.',
           'Ese es el patrón del tipo 2, y aun así el músculo y el hígado no están “dañados”: responden menos a la insulina. Vuelve a comparar las dos curvas: la del tipo 1 se dispara mucho más alto justamente porque no hay nada que ordene la retirada.'] },

  { q:'Apagaste el glucagón dejando la insulina intacta. Tras la comida, la glucemia bajó del pico… y siguió bajando por debajo de 70 mg/dL. ¿Qué enseña esa curva sobre la homeostasis?',
    ops:['Que la insulina estaba defectuosa, porque una hormona normal se detendría sola en el valor correcto',
         'Que un solo lazo puede corregir en una dirección pero no frenar a tiempo: hacen falta dos señales opuestas, una que baje y otra que suba, para sostener un valor estable',
         'Que el punto de equilibrio de la glucosa en realidad es 70 mg/dL'],
    ok:1,
    fb:'Justo. La homeostasis casi nunca se sostiene con una sola señal: casi siempre hay parejas antagónicas (insulina y glucagón, sudor y tiriteo, vasodilatación y vasoconstricción). La insulina hizo su trabajo y siguió actuando un rato más; sin glucagón que respondiera a la caída, el sistema se pasó de largo. Eso también explica por qué una dosis excesiva de insulina provoca hipoglucemia.',
    wrong:['La insulina hace exactamente lo que debe: retirar glucosa. El problema es que ninguna señal se apaga instantáneamente, y sin una señal contraria que responda a la bajada, el sistema se pasa de largo. La curva del caso sano, con glucagón activo, se frena cerca de 80.',
           'El valor de referencia está alrededor de 90 mg/dL en ayunas; por debajo de 70 ya se considera hipoglucemia y el cuerpo la vive como un problema (temblor, sudor frío, confusión). La curva no muestra un equilibrio nuevo: muestra un lazo incompleto.'] },

  { q:'En el simulador de temperatura activaste «fiebre». Al principio la persona tiene escalofríos y tirita, aunque su temperatura ya está subiendo por encima de 37 °C. ¿Cómo se explica ese comportamiento aparentemente contradictorio?',
    ops:['La fiebre desactiva el termostato: el cuerpo pierde el control y la temperatura sube sin regulación',
         'Los pirógenos suben el punto de ajuste a unos 39 °C: mientras la temperatura real sea menor que ese nuevo objetivo, el cuerpo la percibe como frío y activa el tiriteo para alcanzarlo',
         'El tiriteo es un efecto secundario de la infección, sin relación con la regulación de la temperatura'],
    ok:1,
    fb:'Exacto, y es la idea más potente de toda la unidad: el sistema no se rompió, se le cambió el objetivo. Por eso la persona se abriga cuando ya tiene 38 °C. Fíjate además en que al llegar a 39 °C la curva se estabiliza: sigue habiendo regulación, solo que alrededor de otro valor. Y cuando el punto de ajuste vuelve a bajar, la misma persona empieza a sudar.',
    wrong:['Si el termostato estuviera apagado, la temperatura subiría sin freno, como en el caso de deshidratación del simulador. Observa la curva de fiebre: se estabiliza en un valor y se queda ahí. Eso es regulación funcionando, no ausencia de regulación.',
           'El tiriteo es una respuesta termorreguladora perfectamente dirigida: genera calor con contracciones musculares rápidas. Aparece precisamente porque el cuerpo cree que le falta temperatura para llegar a su objetivo.'] }
];

/* =====================================================================
   8 · VISTA
   ===================================================================== */
function biomVista(view){
  view.classList.add('wide');
  const SEC = [
    { id:'familias',    n:'1 · Las cuatro familias' },
    { id:'forma',       n:'2 · La forma manda' },
    { id:'enzimas',     n:'3 · Enzimas' },
    { id:'homeostasis', n:'4 · Homeostasis' },
    { id:'reto',        n:'5 · Reto final' }
  ];
  const St = {
    sec:0,
    fam:'carb', modelo:'glucosa', parte:null,
    temp:37, pH:7.2, cocida:false,
    enz:'amilasa', eT:37, ePH:6.8, fase:0, auto:false, optimo:false,
    comida:75, modoGlu:'sano', subHomeo:'glucosa',
    ta:22, ejer:0, modoTer:'sano',
    clasif:{}, clasifFb:null,
    marcas:{ familias:false, desnat:false, cocinada:false, optimo:false, ciclo:false, glucosa:false, romper:false, fiebre:false, afirma:false },
    vistos:{}, start:Date.now(), errs:0
  };
  const hecho0 = !!(Store.s.activities['cn-biomoleculas'] && Store.s.activities['cn-biomoleculas'].done);

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{},
      h('span',{class:'eyebrow cell'},'Ciencias Naturales · Vida y Tierra · 10.º EGB · Unidad 1'),
      h('h1',{},'Biomoléculas 3D y homeostasis'),
      h('p',{},'¿Cómo conectan la estructura molecular, la función y la regulación de los sistemas vivos? Aquí se arma la respuesta en cuatro pasos: primero las piezas, después por qué su forma decide lo que hacen, después cómo se regula esa actividad, y por último cómo el cuerpo entero se mantiene estable con lazos de retroalimentación.')),
    h('span',{class:'pill cell'},'+140 XP · 45–60 min')));

  const retoSt = h('div',{class:'notice'}, hecho0 ? 'Reto resuelto ✓ · puedes volver a recorrer todas las secciones.' : 'Pendiente: llega a la sección 5 y responde las cinco preguntas.');
  if (hecho0) retoSt.className = 'notice ok';
  view.append(purposeBanner({
    proposito:'Entender que en biología la forma de una molécula ES su función, y que un ser vivo se mantiene estable no porque nada lo perturbe, sino porque detecta la desviación y responde con señales opuestas.',
    observa:[
      'Que el almidón y la celulosa tienen la misma fórmula y distinto destino: cambia la orientación de un enlace',
      'Que al desnaturalizar la proteína el sustrato deja de encajar, y que enfriarla otra vez ya no la arregla',
      'Que la curva de velocidad de una enzima sube por una causa y baja por otra distinta',
      'Que en la curva de glucemia lo importante no es el pico, sino si el sistema vuelve al punto de partida'
    ],
    reto:'Explora los modelos de las cuatro familias, desnaturaliza una enzima, encuentra su óptimo, rompe a propósito un lazo de regulación y explica qué pieza falló. Cierra con las cinco preguntas del reto final.',
    statusEl: retoSt }));

  const nav = h('nav',{class:'bio-nav','aria-label':'Secciones del recurso'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);
  let E = null, timer = null;

  const soltar = () => {
    if (timer){ clearInterval(timer); timer = null; }
    if (E){ try { E.dispose(); } catch(err){ console.warn(err); } E = null; }
  };
  function renderNav(){
    nav.innerHTML='';
    SEC.forEach((s,i) => nav.append(h('button',{'aria-current':String(i===St.sec), onclick:()=>{ St.sec=i; render(); }}, s.n)));
  }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:8px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec=Math.max(0,St.sec-1); render(); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec=Math.min(SEC.length-1,St.sec+1); render(); }},'Siguiente →'));
  }
  const nota = (cls, titulo, txt) => h('div',{class:'notice '+cls},
    h('span',{}, h('b',{}, titulo+' '), /<[a-z/]/i.test(txt) ? h('span',{html:txt}) : txt));
  const sld = (etq, val, unidad, min, max, paso, onIn, aria) => {
    const out = h('b',{}, val);
    const inp = h('input',{type:'range', min:String(min), max:String(max), step:String(paso), value:String(val),
      'aria-label':aria||etq, oninput:e => { out.textContent = onIn(parseFloat(e.target.value)); }});
    return h('div',{class:'bio-sld'}, h('label',{}, h('span',{},etq), out), inp);
  };

  /* =================================================================
     1 · LAS CUATRO FAMILIAS DE BIOMOLÉCULAS
     ================================================================= */
  function secFamilias(){
    const stage = h('div',{class:'stage bio-stage',style:'align-self:start;height:520px;min-height:520px'});
    const panel = h('div',{class:'panel stack'});
    const chips = h('div',{class:'bio-chips',role:'group','aria-label':'Modelos de la familia'});
    const lista = h('div',{class:'bio-part',role:'group','aria-label':'Partes del modelo, seleccionables con el teclado'});
    const ficha = h('div',{class:'stack'});
    const cab = h('div',{class:'stack'});
    const btns = {};

    function pintarParte(pid){
      const M = BIOM_MODELOS[St.modelo];
      if (!M) return;
      St.parte = pid;
      Object.keys(btns).forEach(k => btns[k].setAttribute('aria-pressed', String(k===pid)));
      if (E) E.select(pid);
      const p = M.partes.filter(x => x.id===pid)[0];
      ficha.innerHTML='';
      if (!p) return;
      ficha.append(
        h('div',{class:'row',style:'gap:8px;align-items:center'},
          h('span',{style:'width:15px;height:15px;border-radius:4px;border:1px solid var(--line);background:'+p.c}),
          h('h3',{style:'margin:0;font-size:1rem'}, p.n)),
        h('p',{style:'font-size:.88rem;margin:4px 0 0'}, p.d));
      if (Store.s.a11y.tts) ficha.append(TTS.btn(()=>ficha.textContent,'Leer la ficha de la parte'));
      St.marcas.familias = true;
      St.vistos[St.modelo] = true;
      Store.log('seleccion',{recurso:'cn-biomoleculas', modelo:St.modelo, parte:pid});
    }

    function cargarModelo(id){
      St.modelo = id; St.parte = null;
      soltar();
      const M = BIOM_MODELOS[id];
      stage.innerHTML='';
      stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Arrastra para girar · rueda o + y − para acercar · toca una parte del modelo o de la lista')));
      if (webglOK){
        try { E = biomModelo3D(stage, id, pintarParte); } catch(err){ console.warn('biomoléculas 3D', err); E = null; }
      }
      if (!E) stage.append(h('div',{class:'ph'},'Sin WebGL en este equipo: la lista de partes de la derecha describe el modelo completo, con su función y su papel en la célula. No necesitas el 3D para responder el reto.'));
      /* cabecera del modelo */
      cab.innerHTML='';
      cab.append(
        h('div',{class:'row',style:'gap:8px;align-items:baseline;flex-wrap:wrap'},
          h('h3',{style:'margin:0'}, M.n), h('span',{class:'pill cell'}, M.sub), h('span',{class:'mono small muted'}, M.formula)),
        h('p',{style:'font-size:.88rem;margin:2px 0 0'}, M.d),
        nota('info','Para qué sirve:', M.funcion));
      /* lista de partes */
      lista.innerHTML='';
      Object.keys(btns).forEach(k => delete btns[k]);
      M.partes.forEach(p => {
        const b = h('button',{'aria-pressed':'false','aria-label':'Parte: '+p.n, onclick:()=>pintarParte(p.id)},
          h('i',{style:'background:'+p.c}), h('span',{}, p.n, h('small',{}, p.d.length>96 ? p.d.slice(0,93)+'…' : p.d)));
        btns[p.id] = b; lista.append(b);
      });
      ficha.innerHTML='';
      ficha.append(h('p',{class:'small muted'},'Toca una parte del modelo o de la lista para leer qué hace y por qué está donde está.'));
      Store.markSeen('biomoleculas', id);
      Store.log('modelo',{recurso:'cn-biomoleculas', modelo:id});
    }

    function pintarChips(){
      chips.innerHTML='';
      Object.keys(BIOM_MODELOS).filter(k => BIOM_MODELOS[k].fam === St.fam).forEach(k => {
        chips.append(h('button',{'aria-pressed':String(k===St.modelo), onclick:()=>{ pintarChips2(k); }}, BIOM_MODELOS[k].n));
      });
      if (St.fam === 'lip') chips.append(h('button',{'aria-pressed':String(St.modelo==='bicapa'), onclick:()=>{ pintarChips2('bicapa'); }},'Bicapa de la membrana'));
    }
    function pintarChips2(k){
      if (k === 'bicapa'){
        St.modelo='bicapa'; St.parte=null; soltar(); stage.innerHTML='';
        stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Noventa fosfolípidos organizados solos: nadie los coloca, los coloca el agua')));
        if (webglOK){ try { E = biomBicapa3D(stage); } catch(err){ console.warn(err); E=null; } }
        if (!E) stage.append(h('div',{class:'ph'},'Sin WebGL: la bicapa son dos capas de fosfolípidos con las cabezas polares hacia el agua y las colas apolares escondidas en el interior.'));
        cab.innerHTML='';
        cab.append(h('h3',{style:'margin:0'},'Bicapa lipídica'),
          h('p',{style:'font-size:.88rem;margin:2px 0 0'},'Pon muchos fosfolípidos en agua y se ordenan solos: las cabezas polares afuera, tocando el agua; las colas apolares adentro, escondidas. Nadie dirige el proceso, lo dirige la propia estructura de la molécula.'),
          nota('ok','Idea clave:','La membrana no es una pared sólida: es una lámina de moléculas que se desplazan lateralmente, como personas en una plaza llena. Esa fluidez permite que las proteínas de membrana se muevan, que la célula cambie de forma y que se cierre sola cuando se pincha.'));
        lista.innerHTML='';
        [['cabezas','Cabezas polares','#e8a232','Miran al agua de dentro y de fuera de la célula. Son las que hacen que la bicapa sea estable en un medio acuoso.'],
         ['colas','Colas apolares','#d9cfbb','El interior grasoso. Es la verdadera barrera: lo que sea soluble en agua e iónico no pasa por aquí sin ayuda de una proteína.'],
         ['agua','Agua','#59b6e6','Está a los dos lados. La bicapa existe porque existe el agua: en un medio no acuoso los fosfolípidos se ordenarían al revés.']].forEach(([id,n,c,d]) => {
          lista.append(h('button',{'aria-pressed':'false','aria-label':'Parte: '+n, onclick:()=>{ if (E) E.select(id); St.marcas.familias=true;
            ficha.innerHTML=''; ficha.append(h('h3',{style:'margin:0;font-size:1rem'},n), h('p',{style:'font-size:.88rem;margin:4px 0 0'},d)); }},
            h('i',{style:'background:'+c}), h('span',{}, n)));
        });
        ficha.innerHTML=''; ficha.append(h('p',{class:'small muted'},'Toca una parte para leer su papel.'));
        St.vistos['bicapa'] = true;
        pintarChips();
        return;
      }
      cargarModelo(k); pintarChips();
    }

    const fams = h('div',{class:'bio-fam',role:'group','aria-label':'Familias de biomoléculas'});
    BIOM_FAMILIAS.forEach(f => fams.append(h('button',{'aria-pressed':String(f.id===St.fam), onclick:()=>{
      St.fam = f.id;
      const primero = Object.keys(BIOM_MODELOS).filter(k => BIOM_MODELOS[k].fam === f.id)[0];
      $$('button', fams).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.fam === St.fam)));
      pintarChips2(primero);
      cajaFam.innerHTML=''; cajaFam.append(h('p',{style:'font-size:.88rem;margin:0'}, f.d));
    }, 'data-fam':f.id}, f.em+' '+f.n, h('small',{}, f.d.split('.')[0]+'.'))));
    const cajaFam = h('div',{class:'card'}, h('p',{style:'font-size:.88rem;margin:0'}, BIOM_FAMILIAS.filter(f=>f.id===St.fam)[0].d));

    panel.append(cab, h('div',{class:'stack'}, h('span',{class:'eyebrow cell'},'Partes del modelo'), lista), ficha);
    const box = h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow cell'},'Elige una familia y un modelo'), fams, chips),
      h('div',{class:'viewer'}, stage, panel),
      cajaFam,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow cell'},'Lo que se repite en las cuatro familias'),
        h('div',{class:'bio-cols'},
          h('div',{}, h('h4',{},'Monómeros y polímeros'), h('p',{class:'small'},'Tres de las cuatro familias se construyen igual: piezas pequeñas que se unen en cadena. Glucosa → almidón. Aminoácido → proteína. Nucleótido → ADN. Los lípidos son la excepción: no forman polímeros, se agrupan.')),
          h('div',{}, h('h4',{},'Condensación e hidrólisis'), h('p',{class:'small'},'Para unir dos piezas se saca una molécula de agua (condensación); para separarlas se mete una (hidrólisis). Eso es, literalmente, lo que hace la digestión: hidrolizar.')),
          h('div',{}, h('h4',{},'El carbono es el armazón'), h('p',{class:'small'},'Las cuatro familias son compuestos del carbono: forma cuatro enlaces estables y arma cadenas y anillos. Sobre ese esqueleto, los grupos funcionales (–OH, –COOH, –NH₂, fosfato) deciden el comportamiento.'))),
        h('p',{class:'small muted'},'Consejo: antes de leer nada, gira los modelos y toca sus partes. La explicación se entiende mucho mejor después de haber visto la forma.')),
      secNav());
    /* estado inicial */
    setTimeout(()=>{ pintarChips(); cargarModelo(St.modelo); }, 0);
    return box;
  }

  /* =================================================================
     2 · LA FORMA MANDA: DESNATURALIZACIÓN
     ================================================================= */
  function biomDesn(T, pH){
    const fT  = clamp((T - 42)/26, 0, 1);
    const fpH = clamp((Math.abs(pH - 7.2) - 1.4)/3.0, 0, 1);
    return clamp(1 - (1-fT)*(1-fpH), 0, 1);
  }
  function secForma(){
    const stage = h('div',{class:'stage bio-stage',style:'align-self:start;height:500px;min-height:500px'});
    const panel = h('div',{class:'panel stack'});
    const lec = h('div',{class:'bio-read'});
    const diag = h('div',{class:'stack'});
    const barra = h('div',{class:'bio-bar'}, h('i',{style:'width:0%;background:var(--ok)'}));

    function actualizar(){
      let f = biomDesn(St.temp, St.pH);
      if (f > 0.72) St.cocida = true;
      if (St.cocida) f = Math.max(f, 0.80);         /* desnaturalizar es irreversible */
      const encaja = E ? E.bioAplicar(f) : (f < 0.22);
      const vel = Math.round((1-f)*100);
      lec.innerHTML='';
      [['Desnaturalización', Math.round(f*100)+' %'],
       ['Sitio activo', encaja ? 'intacto' : 'deformado'],
       ['¿Encaja el sustrato?', encaja ? 'sí' : 'no'],
       ['Actividad', vel+' %']].forEach(([k,v]) => lec.append(h('div',{}, h('span',{},k), h('b',{},v))));
      const ib = $('i', barra);
      ib.style.width = Math.round(f*100)+'%';
      ib.style.background = f<0.25 ? 'var(--ok)' : f<0.7 ? 'var(--warn)' : 'var(--bad)';
      diag.innerHTML='';
      if (f < 0.12) diag.append(nota('ok','Proteína plegada y funcional.','La cadena de aminoácidos está enrollada sobre sí misma en una forma concreta. En esa forma, tres aminoácidos que en la secuencia están muy separados quedan juntos y arman el sitio activo (las bolas amarillas). El sustrato verde encaja ahí.'));
      else if (f < 0.45) diag.append(nota('warn','Empieza a perder la forma.','Los enlaces débiles que sostenían el plegamiento —puentes de hidrógeno, atracciones entre radicales— se están rompiendo. Fíjate en que el sitio activo ya no cierra bien sobre el sustrato: la actividad cae antes de que la molécula se desarme del todo.'));
      else diag.append(nota('bad','Proteína desnaturalizada.','La cadena está extendida. Ojo: los enlaces peptídicos NO se rompieron, la secuencia de aminoácidos sigue intacta. Lo que se perdió es la forma tridimensional, y con ella la función. Desnaturalizar no es lo mismo que digerir.'));
      if (St.cocida){
        St.marcas.cocinada = true;
        diag.append(nota('info','Y no vuelve atrás.','Aunque bajes la temperatura, la proteína sigue desnaturalizada: por eso puedes enfriar un huevo frito cuanto quieras y no vuelve a ser clara transparente. En el cuerpo pasa lo mismo, y es una de las razones por las que una fiebre muy alta y sostenida es peligrosa.'));
        diag.append(h('button',{class:'btn sm', onclick:()=>{ St.cocida=false; St.temp=37; St.pH=7.2; render(); }},'Empezar con una proteína nueva'));
      }
      if (f > 0.3) St.marcas.desnat = true;
      Store.log('desnaturaliza',{recurso:'cn-biomoleculas', T:St.temp, pH:St.pH, f:Math.round(f*100)});
    }

    stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Amarillo: sitio activo · verde: sustrato · naranja: aminoácidos apolares · azul: aminoácidos polares')));
    if (webglOK){ try { E = biomProteina3D(stage); } catch(err){ console.warn('proteína 3D', err); E = null; } }
    if (!E) stage.append(h('div',{class:'ph'},'Sin WebGL: usa igualmente los deslizadores. Los valores numéricos de la derecha (desnaturalización, sitio activo y actividad) describen exactamente lo que haría el modelo.'));

    const sT = sld('Temperatura', biomDec(St.temp,0)+' °C', '°C', 20, 90, 1, v => { St.temp = v; actualizar(); return biomDec(v,0)+' °C'; }, 'Temperatura en grados centígrados');
    const sP = sld('pH', biomDec(St.pH,1), '', 1, 14, 0.2, v => { St.pH = v; actualizar(); return biomDec(v,1); }, 'Valor de pH');

    panel.append(
      h('span',{class:'eyebrow cell'},'Mueve los deslizadores y mira la molécula'),
      sT, sP, barra, lec, diag,
      h('div',{class:'row'},
        h('button',{class:'btn sm', onclick:()=>{ St.temp=37; St.pH=7.2; render(); }},'Condiciones del cuerpo (37 °C · pH 7,2)'),
        h('button',{class:'btn sm', onclick:()=>{ St.temp=75; St.pH=7.2; actualizar(); $$('input[type=range]', panel)[0].value='75'; }},'Hervir (75 °C)'),
        h('button',{class:'btn sm', onclick:()=>{ St.pH=2.2; actualizar(); $$('input[type=range]', panel)[1].value='2.2'; }},'Jugo de limón (pH 2,2)')));

    setTimeout(actualizar, 30);
    return h('div',{class:'stack'},
      h('div',{class:'card'}, h('p',{style:'margin:0;font-size:.9rem'},'Esta es una enzima: una proteína plegada. Antes de leer nada, sube la temperatura y baja el pH y observa qué le pasa al sustrato verde. Después vuelve aquí.')),
      h('div',{class:'viewer'}, stage, panel),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow cell'},'Por qué la forma es la función'),
        h('div',{class:'bio-cols'},
          h('div',{}, h('h4',{},'La secuencia decide la forma'), h('p',{class:'small'},'El orden de los aminoácidos determina qué radicales quedan cerca de cuáles. Los apolares huyen del agua y se esconden en el centro; los polares y cargados se quedan afuera. La cadena se pliega sola hasta la forma más estable.')),
          h('div',{}, h('h4',{},'La forma decide la función'), h('p',{class:'small'},'El sitio activo no está escrito en la secuencia: aparece cuando la cadena se dobla y junta aminoácidos que estaban lejísimos. Por eso un cambio en un solo aminoácido puede inutilizar una proteína entera.')),
          h('div',{}, h('h4',{},'Qué rompe la forma'), h('p',{class:'small'},'Calor (agita la molécula), pH extremo (cambia las cargas de los radicales), sales concentradas, alcohol, agitación mecánica. Todos atacan los enlaces débiles, no el enlace peptídico.'))),
        nota('info','Tres cosas que se confunden siempre:','<b>Desnaturalizar</b> es perder la forma (la secuencia queda). <b>Hidrolizar</b> es cortar la cadena en pedazos (la secuencia se destruye). <b>Digerir</b> una proteína es hidrolizarla: primero el ácido del estómago la desnaturaliza y luego la pepsina la corta.')),
      secNav());
  }

  /* =================================================================
     3 · ENZIMAS: LLAVE Y CERRADURA
     ================================================================= */
  function secEnzimas(){
    const stage = h('div',{class:'stage bio-stage',style:'align-self:start;height:430px;min-height:430px'});
    const panel = h('div',{class:'panel stack'});
    const txtF = h('div',{class:'stack'});
    const cvT = h('canvas',{class:'chart',style:'height:250px'});
    const cvP = h('canvas',{class:'chart',style:'height:250px'});
    const lec = h('div',{class:'bio-read'});
    const avisoOpt = h('div',{class:'stack'});
    const fbtn = [];

    const enzActual = () => BIOM_ENZIMAS.filter(e => e.id === St.enz)[0];

    function pintarFase(){
      const f = BIOM_FASES[St.fase];
      fbtn.forEach((b,i) => b.setAttribute('aria-pressed', String(i===St.fase)));
      if (E && E.bioFase) E.bioFase(St.fase);
      txtF.innerHTML='';
      txtF.append(h('h4',{style:'margin:0;font-size:.95rem'}, f.n), h('p',{style:'font-size:.87rem;margin:4px 0 0'}, f.d));
      if (St.fase === 3) St.marcas.ciclo = true;
    }
    function pintarCurvas(){
      const e = enzActual();
      const v = biomVel(St.eT, St.ePH, e);
      lec.innerHTML='';
      [['Temperatura', biomDec(St.eT,0)+' °C'], ['pH', biomDec(St.ePH,1)],
       ['Velocidad', Math.round(v)+' %'], ['Óptimo', '40 °C · pH '+biomDec(e.pHopt,1)]]
        .forEach(([k,x]) => lec.append(h('div',{}, h('span',{},k), h('b',{},x))));
      avisoOpt.innerHTML='';
      if (v >= 92){
        St.marcas.optimo = true; St.optimo = true;
        avisoOpt.append(nota('ok','Estás en el óptimo de la '+e.n.toLowerCase()+'.','A esta temperatura y a este pH la enzima trabaja a casi toda su capacidad. Fíjate en dónde está ese óptimo: coincide con el lugar del cuerpo donde la enzima realmente actúa ('+e.donde.toLowerCase()+').'));
      } else if (St.eT > 55){
        avisoOpt.append(nota('bad','La enzima está desnaturalizada.','Por encima de unos 50 °C ya no es cuestión de ir más lento: la proteína perdió su forma. Si bajas la temperatura, la curva del gráfico sube otra vez, pero en la realidad la enzima no se recupera. El gráfico muestra la velocidad de una enzima intacta a cada temperatura, no la historia de una misma molécula.'));
      } else if (v < 25){
        avisoOpt.append(nota('warn','Actividad muy baja.','Lee los dos gráficos y decide cuál de los dos factores la está frenando: ¿estás lejos del pico de temperatura, del pico de pH, o de los dos?'));
      }
      setTimeout(()=>{
        const ptsT = [], ptsP = [];
        for (let T=0; T<=70; T+=1) ptsT.push({x:T, y: clamp(biomVelT(T),0,1)*biomVelPH(St.ePH, e)*100});
        lineChart(cvT, { series:[
            { pts:ptsT, color:e.col, label:e.n },
            { pts:[{x:St.eT, y:v}], color:'#ffffff', dots:true }
          ], xmin:0, xmax:70, ymin:0, ymax:105, xticks:7,
          xlabel:'Temperatura (°C)', ylabel:'Velocidad relativa (%)',
          xfmt:x=>Math.round(x)+'°', yfmt:y=>Math.round(y)+'%' });
        const series = BIOM_ENZIMAS.map(en => {
          const pts = [];
          for (let p=0; p<=14; p+=0.2) pts.push({x:p, y: clamp(biomVelT(St.eT),0,1)*biomVelPH(p, en)*100});
          return { pts, color: en.id===St.enz ? en.col : en.col+'55', label: en.id===St.enz ? en.n : '' };
        });
        series.push({ pts:[{x:St.ePH, y:v}], color:'#ffffff', dots:true });
        lineChart(cvP, { series, xmin:0, xmax:14, ymin:0, ymax:105, xticks:7,
          xlabel:'pH', ylabel:'Velocidad relativa (%)', xfmt:x=>biomDec(x,0), yfmt:y=>Math.round(y)+'%' });
      }, 20);
    }

    stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Azul: enzima · amarillo: sitio activo · verde: sustrato y productos · rojo: el enlace que se rompe')));
    if (webglOK){ try { E = biomEnzima3D(stage); } catch(err){ console.warn('enzima 3D', err); E = null; } }
    if (!E) stage.append(h('div',{class:'ph'},'Sin WebGL: los cuatro pasos están descritos íntegramente en el texto de la derecha; puedes recorrerlos con los botones de fase.'));

    const faseBar = h('div',{class:'bio-seg',role:'group','aria-label':'Fases de la catálisis'});
    BIOM_FASES.forEach((f,i) => { const b = h('button',{'aria-pressed':String(i===St.fase),'aria-label':f.n, onclick:()=>{ St.fase=i; pintarFase(); }}, String(i+1)); fbtn.push(b); faseBar.append(b); });
    const btnAuto = h('button',{class:'btn sm', onclick:()=>{
      St.auto = !St.auto; btnAuto.textContent = St.auto ? '⏸ Pausar ciclo' : '▶ Ver el ciclo completo';
      if (timer){ clearInterval(timer); timer=null; }
      if (St.auto) timer = setInterval(()=>{ St.fase = (St.fase+1)%4; pintarFase(); }, 2200);
    }}, '▶ Ver el ciclo completo');

    const chips = h('div',{class:'bio-chips',role:'group','aria-label':'Enzima'});
    BIOM_ENZIMAS.forEach(e => chips.append(h('button',{'aria-pressed':String(e.id===St.enz), onclick:()=>{
      St.enz = e.id; $$('button', chips).forEach(b => b.setAttribute('aria-pressed', String(b.textContent===e.n)));
      infoE.innerHTML=''; infoE.append(h('dl',{class:'bio-kv'},
        h('dt',{},'Sustrato'), h('dd',{}, e.sust),
        h('dt',{},'Dónde actúa'), h('dd',{}, e.donde),
        h('dt',{},'pH óptimo'), h('dd',{}, biomDec(e.pHopt,1))));
      pintarCurvas();
    }}, e.n)));
    const e0 = enzActual();
    const infoE = h('div',{}, h('dl',{class:'bio-kv'},
      h('dt',{},'Sustrato'), h('dd',{}, e0.sust),
      h('dt',{},'Dónde actúa'), h('dd',{}, e0.donde),
      h('dt',{},'pH óptimo'), h('dd',{}, biomDec(e0.pHopt,1))));

    panel.append(h('span',{class:'eyebrow cell'},'Recorre el ciclo paso a paso'),
      h('div',{class:'bio-fase'}, faseBar, btnAuto), txtF,
      nota('info','Ojo con la metáfora:','La llave y la cerradura explican la especificidad, pero se quedan cortas: la enzima no es rígida, se amolda al sustrato al recibirlo. Hoy se prefiere hablar de <b>ajuste inducido</b>.'));

    pintarFase();
    setTimeout(pintarCurvas, 40);

    return h('div',{class:'stack'},
      h('div',{class:'card'}, h('p',{style:'margin:0;font-size:.9rem'},'Una enzima es una proteína que acelera una reacción sin gastarse. Mira primero el ciclo en el modelo; después juega con la temperatura y el pH y observa qué le pasa a la velocidad.')),
      h('div',{class:'viewer'}, stage, panel),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow cell'},'Temperatura, pH y velocidad'),
        chips, infoE,
        sld('Temperatura', biomDec(St.eT,0)+' °C','',0,70,1, v=>{ St.eT=v; pintarCurvas(); return biomDec(v,0)+' °C'; },'Temperatura para la curva de la enzima'),
        sld('pH', biomDec(St.ePH,1),'',0,14,0.1, v=>{ St.ePH=v; pintarCurvas(); return biomDec(v,1); },'pH para la curva de la enzima'),
        lec, avisoOpt,
        h('div',{class:'grid g2'},
          h('div',{}, h('p',{class:'small muted',style:'margin:0 0 4px'},'Velocidad frente a temperatura (al pH que elegiste)'), cvT),
          h('div',{}, h('p',{class:'small muted',style:'margin:0 0 4px'},'Velocidad frente a pH (a la temperatura que elegiste): las tres enzimas'), cvP)),
        h('p',{class:'small muted'},'Tarea: lleva cada enzima a su óptimo (velocidad por encima del 92 %). Fíjate en que el óptimo de pH de cada una coincide con el lugar del cuerpo donde trabaja.'),
        nota('warn','Las dos ramas de la curva de temperatura NO tienen la misma causa.','De 0 a 40 °C sube porque hay más choques por segundo entre la enzima y el sustrato. De 45 °C en adelante se desploma porque la proteína se desnaturaliza. Es el error más frecuente de la unidad: leer toda la curva como si fuera un solo fenómeno.')),
      secNav());
  }

  /* =================================================================
     4 · HOMEOSTASIS: RETROALIMENTACIÓN NEGATIVA
     ================================================================= */
  const BIOM_MODOS_GLU = [
    { id:'sano',        n:'Regulación normal',       d:'Páncreas e hígado responden como deben.' },
    { id:'tipo1',       n:'Diabetes tipo 1',         d:'No hay insulina: las células beta fueron destruidas.' },
    { id:'tipo2',       n:'Diabetes tipo 2',         d:'Hay insulina, incluso de más, pero las células responden poco.' },
    { id:'singlucagon', n:'Sin glucagón',            d:'Solo funciona el lazo que baja la glucosa; el que la sube está apagado.' }
  ];
  const BIOM_MODOS_TER = [
    { id:'sano',         n:'Regulación normal', d:'Sudor, tiriteo y vasos sanguíneos responden con normalidad.' },
    { id:'fiebre',       n:'Fiebre',            d:'Los pirógenos suben el punto de ajuste a 39,2 °C.' },
    { id:'deshidratado', n:'Sin sudor',         d:'Deshidratación: el mecanismo principal para perder calor está anulado.' },
    { id:'sintiritar',   n:'Sin tiriteo',       d:'No hay producción extra de calor: el frío no encuentra respuesta.' }
  ];

  function secHomeostasis(){
    const cv = h('canvas',{class:'chart',style:'height:300px'});
    const lec = h('div',{class:'bio-read'});
    const diag = h('div',{class:'stack'});
    const leg = h('div',{class:'bio-leg'});
    const ctrl = h('div',{class:'stack'});

    function dibujarGlucosa(){
      const r = biomGlucemia(St.comida, St.modoGlu);
      const modo = BIOM_MODOS_GLU.filter(m => m.id === St.modoGlu)[0];
      lec.innerHTML='';
      [['Basal', Math.round(r.basal)+' mg/dL'], ['Pico', Math.round(r.max)+' mg/dL'],
       ['Hora del pico', 'min '+r.tmax], ['Mínimo después', Math.round(r.min)+' mg/dL'],
       ['A las 5 horas', Math.round(r.fin)+' mg/dL']].forEach(([k,v]) => lec.append(h('div',{}, h('span',{},k), h('b',{},v))));
      leg.innerHTML='';
      [['Glucosa en sangre','#d64a3c'],['Insulina (escala relativa)','#59b6e6'],['Glucagón (escala relativa)','#e8a232'],['Punto de referencia (90 mg/dL)','#8e9aa6']]
        .forEach(([t,c]) => leg.append(h('span',{}, h('i',{style:'border-top-color:'+c}), t)));
      diag.innerHTML='';
      const vuelve = Math.abs(r.fin - r.basal) < 12 && r.max < 200;
      if (St.modoGlu === 'sano'){
        diag.append(nota('ok','El lazo se cerró.','La glucosa subió, el páncreas lo detectó y soltó insulina; las células retiraron glucosa y el valor bajó. Cuando se pasó de la raya, el glucagón la volvió a subir. A las cinco horas el sistema está donde empezó: eso es homeostasis, y no significa que nada haya cambiado, sino que lo que cambió fue corregido.'));
      } else if (St.modoGlu === 'tipo1'){
        St.marcas.romper = true;
        diag.append(nota('bad','Lazo abierto: falta la señal.','Sin insulina no hay orden de retirar glucosa. Mira la curva azul: es plana en cero. La glucosa sube muchísimo y no vuelve. Además el valor basal ya estaba alto antes de comer, porque el lazo tampoco funcionaba en reposo. Así se entiende por qué la insulina inyectada no es un capricho: es la señal que falta.'));
      } else if (St.modoGlu === 'tipo2'){
        St.marcas.romper = true;
        diag.append(nota('warn','Lazo débil: la señal se emite, pero casi nadie la escucha.','La curva azul de insulina es alta —incluso más alta que en el caso sano— y aun así la glucosa baja con lentitud y el basal queda por encima de 100 mg/dL. El problema no es la producción, es la respuesta de las células. Compara el pico con el del tipo 1: es más bajo, porque algo de regulación sí queda.'));
      } else {
        St.marcas.romper = true;
        diag.append(nota('warn','Solo media regulación.','La insulina hace su trabajo y la glucosa baja… y sigue bajando. Sin glucagón nadie da la orden contraria, y el valor se hunde por debajo de 70 mg/dL: hipoglucemia. Para mantener algo estable no basta con poder corregirlo en una dirección.'));
      }
      if (vuelve && St.modoGlu==='sano') St.marcas.glucosa = true;
      setTimeout(()=>{
        lineChart(cv, { series:[
            { pts:[{x:0,y:90},{x:300,y:90}], color:'#8e9aa6' },
            { pts:r.ins, color:'#59b6e6', label:'Insulina' },
            { pts:r.glu, color:'#e8a232', label:'Glucagón' },
            { pts:r.g,   color:'#d64a3c', label:'Glucosa' }
          ], xmin:0, xmax:300, ymin:0, ymax: Math.max(200, Math.ceil(r.max/50)*50+30), xticks:5,
          xlabel:'Minutos desde la comida', ylabel:'mg/dL', xfmt:x=>Math.round(x)+"'", yfmt:y=>Math.round(y) });
      }, 20);
      Store.log('simula',{recurso:'cn-biomoleculas', sim:'glucemia', modo:St.modoGlu, comida:St.comida, max:Math.round(r.max)});
    }

    function dibujarTermo(){
      const r = biomTermo(St.ta, St.ejer, St.modoTer);
      lec.innerHTML='';
      [['Punto de ajuste', biomDec(r.set,1)+' °C'], ['Máxima', biomDec(r.max,2)+' °C'],
       ['Mínima', biomDec(r.min,2)+' °C'], ['A las 3 horas', biomDec(r.fin,2)+' °C']]
        .forEach(([k,v]) => lec.append(h('div',{}, h('span',{},k), h('b',{},v))));
      leg.innerHTML='';
      [['Temperatura corporal','#d64a3c'],['Sudoración (%)','#59b6e6'],['Tiriteo (%)','#e8a232'],['Punto de ajuste','#8e9aa6']]
        .forEach(([t,c]) => leg.append(h('span',{}, h('i',{style:'border-top-color:'+c}), t)));
      diag.innerHTML='';
      if (St.modoTer === 'fiebre'){
        St.marcas.fiebre = true;
        diag.append(nota('info','El termostato no se rompió: le cambiaron el número.','Al principio la temperatura real (37 °C) está por debajo del nuevo objetivo (39,2 °C), así que el cuerpo cree que tiene frío: tirita y cierra los vasos de la piel. Por eso alguien con fiebre se tapa aunque esté ardiendo. Cuando alcanza 39,2 °C la curva se estabiliza: sigue habiendo regulación, alrededor de otro valor.'));
      } else if (r.fin >= 42.9){
        St.marcas.romper = true;
        diag.append(nota('bad','Golpe de calor: la regulación se quedó sin herramientas.','Sin sudor, la única vía de perder calor es el contacto con el aire, y si el aire está casi tan caliente como el cuerpo eso no alcanza. La temperatura sube sin freno y por encima de unos 41 °C las proteínas empiezan a desnaturalizarse: exactamente lo que viste en la sección 2, pero dentro de una persona.'));
      } else if (r.fin <= 34.5){
        St.marcas.romper = true;
        diag.append(nota('bad','Hipotermia: sin tiriteo no hay cómo generar calor.','El tiriteo son contracciones musculares rápidas que producen calor sin hacer trabajo útil. Anulado ese mecanismo, en un ambiente frío la temperatura cae y no se recupera.'));
      } else if (Math.abs(r.fin - r.set) < 0.5){
        St.marcas.glucosa = St.marcas.glucosa;
        diag.append(nota('ok','Temperatura sostenida cerca del punto de ajuste.','Mira las curvas azul y naranja: el cuerpo no está quieto, está trabajando. Sudar o tiritar cuesta agua y energía; la estabilidad no es gratuita.'));
      } else {
        diag.append(nota('warn','El cuerpo se aleja de su punto de ajuste.','Las respuestas están activas pero no alcanzan a compensar la perturbación. Prueba a cambiar el ambiente o la intensidad del ejercicio y observa a partir de qué punto el sistema ya no puede.'));
      }
      setTimeout(()=>{
        lineChart(cv, { series:[
            { pts:[{x:0,y:r.set},{x:180,y:r.set}], color:'#8e9aa6' },
            { pts:r.t2.map(p=>({x:p.x, y:30 + p.y*0.10})), color:'#59b6e6', label:'Sudor' },
            { pts:r.t3.map(p=>({x:p.x, y:30 + p.y*0.10})), color:'#e8a232', label:'Tiriteo' },
            { pts:r.t1, color:'#d64a3c', label:'Temperatura' }
          ], xmin:0, xmax:180, ymin:30, ymax:44, xticks:6,
          xlabel:'Minutos', ylabel:'°C (sudor y tiriteo: 0 % abajo, 100 % arriba)', xfmt:x=>Math.round(x)+"'", yfmt:y=>biomDec(y,0) });
      }, 20);
      Store.log('simula',{recurso:'cn-biomoleculas', sim:'termo', modo:St.modoTer, ta:St.ta, ejer:St.ejer, fin:biomDec(r.fin,2)});
    }

    function pintarCtrl(){
      ctrl.innerHTML='';
      if (St.subHomeo === 'glucosa'){
        const segs = h('div',{class:'bio-seg',role:'group','aria-label':'Estado de la regulación de la glucosa'});
        BIOM_MODOS_GLU.forEach(m => segs.append(h('button',{'aria-pressed':String(m.id===St.modoGlu),'aria-label':m.n+'. '+m.d,
          onclick:()=>{ St.modoGlu = m.id; pintarCtrl(); }}, m.n)));
        ctrl.append(segs,
          h('p',{class:'small muted',style:'margin:2px 0 0'}, BIOM_MODOS_GLU.filter(m=>m.id===St.modoGlu)[0].d),
          sld('Tamaño de la comida', St.comida+' g de carbohidrato','',0,140,5, v=>{ St.comida=v; dibujarGlucosa(); return v+' g de carbohidrato'; },'Gramos de carbohidrato de la comida'));
        dibujarGlucosa();
      } else {
        const segs = h('div',{class:'bio-seg',role:'group','aria-label':'Estado de la termorregulación'});
        BIOM_MODOS_TER.forEach(m => segs.append(h('button',{'aria-pressed':String(m.id===St.modoTer),'aria-label':m.n+'. '+m.d,
          onclick:()=>{ St.modoTer = m.id; pintarCtrl(); }}, m.n)));
        ctrl.append(segs,
          h('p',{class:'small muted',style:'margin:2px 0 0'}, BIOM_MODOS_TER.filter(m=>m.id===St.modoTer)[0].d),
          sld('Temperatura del ambiente', biomDec(St.ta,0)+' °C','',0,45,1, v=>{ St.ta=v; dibujarTermo(); return biomDec(v,0)+' °C'; },'Temperatura del ambiente'),
          sld('Ejercicio', Math.round(St.ejer*100)+' %','',0,1,0.05, v=>{ St.ejer=v; dibujarTermo(); return Math.round(v*100)+' %'; },'Intensidad del ejercicio'));
        dibujarTermo();
      }
    }

    const tabs = h('div',{class:'bio-chips',role:'group','aria-label':'Sistema a simular'},
      h('button',{'aria-pressed':String(St.subHomeo==='glucosa'), onclick:()=>{ St.subHomeo='glucosa'; render(); }},'Glucosa en sangre'),
      h('button',{'aria-pressed':String(St.subHomeo==='termo'), onclick:()=>{ St.subHomeo='termo'; render(); }},'Temperatura corporal'));

    /* --- clasificación de afirmaciones de salud --- */
    const claBox = h('div',{class:'stack'});
    function pintarClas(){
      claBox.innerHTML='';
      BIOM_AFIRMA.forEach((a,i) => {
        const fila = h('div',{style:'border-bottom:1px dashed var(--line);padding:9px 0'});
        fila.append(h('p',{style:'margin:0 0 6px;font-size:.87rem'}, a.t));
        const bs = h('div',{class:'bio-seg',role:'group','aria-label':'Clasifica la afirmación '+(i+1)});
        BIOM_CATS.forEach(c => bs.append(h('button',{'aria-pressed':String(St.clasif[i]===c.id), onclick:()=>{
          St.clasif[i] = c.id;
          if (c.id !== a.ok) St.errs++;
          pintarClas();
        }}, c.n)));
        fila.append(bs);
        if (St.clasif[i]){
          const bien = St.clasif[i] === a.ok;
          fila.append(h('div',{class:'notice '+(bien?'ok':'warn'),style:'margin-top:7px'},
            h('span',{}, h('b',{}, bien ? 'Correcto. ' : 'Aún no: es «'+BIOM_CATS.filter(c=>c.id===a.ok)[0].n.toLowerCase()+'». '), a.d)));
        }
        claBox.append(fila);
      });
      const bien = BIOM_AFIRMA.filter((a,i) => St.clasif[i] === a.ok).length;
      if (bien === BIOM_AFIRMA.length){ St.marcas.afirma = true; claBox.append(nota('ok','Las cuatro clasificadas.','Distinguir evidencia, extrapolación y publicidad es parte de la destreza de esta unidad: ningún resultado de laboratorio se convierte solo en un consejo de salud.')); }
      else claBox.append(h('p',{class:'small muted'},'Llevas '+bien+' de '+BIOM_AFIRMA.length+'. Fíjate en si la frase dice cuántas personas, con qué comparación y qué se midió.'));
    }
    pintarClas();

    setTimeout(pintarCtrl, 10);

    return h('div',{class:'stack'},
      h('div',{class:'card'}, h('p',{style:'margin:0;font-size:.9rem'},'Homeostasis no es “que nada cambie”: es que el cuerpo detecte el cambio y lo corrija. Perturba el sistema, rómpelo a propósito y observa la curva: lo importante no es el pico, es si vuelve o no vuelve.')),
      h('div',{class:'card stack'}, tabs, ctrl, lec, cv, leg, diag),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow cell'},'El esquema que sirve para los dos casos'),
        h('div',{class:'bio-cols'},
          h('div',{}, h('h4',{},'1 · Sensor'), h('p',{class:'small'},'Detecta la desviación. Células beta del páncreas para la glucosa; neuronas del hipotálamo para la temperatura.')),
          h('div',{}, h('h4',{},'2 · Centro y punto de ajuste'), h('p',{class:'small'},'Compara el valor medido con el valor de referencia. Páncreas e hipotálamo. En la fiebre, lo que cambia es este número, no el mecanismo.')),
          h('div',{}, h('h4',{},'3 · Señal'), h('p',{class:'small'},'Insulina o glucagón; impulsos nerviosos hacia la piel y el músculo. Casi siempre vienen en pares opuestos.')),
          h('div',{}, h('h4',{},'4 · Efector'), h('p',{class:'small'},'Quien ejecuta: hígado, músculo y tejido adiposo; glándulas sudoríparas, vasos sanguíneos, músculos que tiritan.'))),
        nota('info','Negativa, no “mala”.','Se llama retroalimentación <b>negativa</b> porque la respuesta va en dirección contraria a la desviación: si sube, algo la baja. La positiva existe y también es útil —el parto, la coagulación—, pero amplifica en vez de estabilizar, y por eso siempre necesita un final.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow cell'},'Y ahora, el mismo criterio fuera del laboratorio'),
        h('p',{class:'small muted',style:'margin:0'},'Clasifica cada afirmación. Una misma información puede ser buena evidencia y, aun así, dar pie a una conclusión que no se sostiene.'),
        claBox),
      secNav());
  }

  /* =================================================================
     5 · RETO FINAL
     ================================================================= */
  function secReto(){
    const marcas = [
      ['familias','Exploraste partes de los modelos de las cuatro familias'],
      ['desnat','Desnaturalizaste la enzima con temperatura o con pH'],
      ['cocinada','Comprobaste que la desnaturalización no se deshace al enfriar'],
      ['optimo','Llevaste una enzima a su óptimo de temperatura y pH'],
      ['ciclo','Recorriste las cuatro fases del ciclo de la catálisis'],
      ['glucosa','Viste un lazo de retroalimentación cerrarse y volver al punto de partida'],
      ['romper','Rompiste a propósito una regulación y observaste la consecuencia'],
      ['fiebre','Entendiste la fiebre como un cambio del punto de ajuste'],
      ['afirma','Clasificaste las cuatro afirmaciones de salud']
    ];
    const lista = h('ul',{class:'checks plain'});
    marcas.forEach(([k,t]) => lista.append(h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{}, (St.marcas[k]?'✓ ':'· ')+t))));
    const wrap = h('div',{class:'card stack'});
    let ok = 0, intentos = 0;
    wrap.append(h('span',{class:'eyebrow cell'},'🎯 Reto final · cinco preguntas que se responden mirando lo que hiciste'),
      h('p',{class:'small muted'},'Ninguna se contesta de memoria: todas piden interpretar un modelo o una curva de las secciones anteriores. Si te equivocas, la retroalimentación te dice a cuál volver.'));
    BIOM_PREGUNTAS.forEach(p => wrap.append(quizBlock(p, (att) => {
      ok++; intentos += att;
      if (ok === BIOM_PREGUNTAS.length){
        const hechas = marcas.filter(m => St.marcas[m[0]]).length;
        const min = Math.round((Date.now()-St.start)/60000);
        Store.completeActivity('cn-biomoleculas', {
          score: BIOM_PREGUNTAS.length+'/'+BIOM_PREGUNTAS.length,
          attempts: St.errs + (intentos - BIOM_PREGUNTAS.length),
          duracionMin: min, tareas: hechas+'/'+marcas.length });
        retoSt.className = 'notice ok';
        retoSt.innerHTML = '<span><b>¡Reto resuelto!</b> Cinco de cinco, con '+hechas+' de '+marcas.length+' tareas del recorrido completadas.</span>';
        wrap.append(nota('ok','Actividad completada y registrada en tu progreso.','Ya puedes explicar una función biológica desde la forma de una molécula y describir una regulación nombrando sensor, señal y efector. Eso es exactamente lo que pide la unidad.'));
        toast('Actividad completada: Biomoléculas y homeostasis ✓');
      }
    })));
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow cell'},'Lo que hiciste hasta aquí'), lista,
        h('p',{class:'small muted'},'Puedes responder aunque falte alguna casilla, pero cada tarea del recorrido te da el argumento con el que se responde.')),
      wrap,
      h('div',{class:'card stack'}, h('span',{class:'eyebrow cell'},'Para llevar al cuaderno'),
        h('p',{html:'Toda la unidad cuelga de dos ideas encadenadas: <b>la forma de una molécula es su función</b> —por eso un enlace girado convierte el almidón en fibra y unos grados de más apagan una enzima— y <b>un cuerpo se mantiene estable porque mide su desviación y responde con señales opuestas</b>. Cuando algo del lazo falta, la curva ya no regresa: eso, y no el pico, es lo que hay que mirar.'}),
        h('p',{class:'small muted'},'Nada de lo que hay aquí sirve para diagnosticar a nadie. Para preguntas de salud: Ministerio de Salud Pública del Ecuador, centro de salud más cercano y guías de práctica clínica; no un anuncio.')),
      secNav());
  }

  /* =================================================================
     RENDER
     ================================================================= */
  function render(){
    soltar();
    renderNav(); body.innerHTML='';
    const f = [secFamilias, secForma, secEnzimas, secHomeostasis, secReto][St.sec];
    body.append(f());
    Store.log('seccion',{recurso:'cn-biomoleculas', seccion:SEC[St.sec].id});
  }
  render();
  return { unmount(){ soltar(); } };
}

route('/cn/biomoleculas', (view) => biomVista(view));
route('/cn/proximos/biomoleculas', () => navigate('#/cn/biomoleculas'));
</script>
