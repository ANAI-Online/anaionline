<style>
/* ===== Apendicectomía: una cirugía por dentro (prefijo apx-) ===== */
.apx-aviso{display:flex;gap:12px;align-items:flex-start;border:1px solid color-mix(in srgb,var(--warn) 55%,var(--line));border-left:5px solid var(--warn);border-radius:12px;padding:11px 14px;background:color-mix(in srgb,var(--warn) 9%,var(--bg-2));margin:0 0 14px}
.apx-aviso .apx-ico{font-size:1.4rem;line-height:1;flex:none}
.apx-aviso p{margin:0;font-size:.88rem;line-height:1.45;color:var(--ink)}
.apx-aviso p+p{margin-top:4px;color:var(--ink-2);font-size:.82rem}
.apx-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.apx-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 var(--font-b,"IBM Plex Sans"),sans-serif;cursor:pointer}
.apx-nav button:hover{border-color:var(--anat)}
.apx-nav button[aria-current="true"]{background:var(--anat);border-color:var(--anat);color:#fff}
.apx-nav button .apx-ok{margin-left:5px;font-size:.72rem}
.apx-nav button:focus-visible,.apx-seg button:focus-visible,.apx-card:focus-visible,.apx-pick:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.apx-stage{height:500px;min-height:500px;align-self:start}
.apx-stage .apx-marca{position:absolute;left:12px;bottom:10px;z-index:3;font-size:.7rem;color:var(--ink-3);background:color-mix(in srgb,var(--bg-2) 82%,transparent);border:1px solid var(--line);border-radius:7px;padding:3px 8px;pointer-events:none}
.apx-stage .apx-hud{position:absolute;left:12px;right:12px;top:12px;z-index:3;display:flex;flex-wrap:wrap;gap:6px;pointer-events:none}
.apx-stage .apx-hud>*{pointer-events:auto}
.apx-stage .apx-tip{position:absolute;right:12px;bottom:10px;z-index:3;max-width:min(62%,340px);font-size:.76rem;line-height:1.35;color:var(--ink);background:color-mix(in srgb,var(--bg-2) 90%,transparent);border:1px solid var(--line-2);border-radius:10px;padding:6px 10px;pointer-events:none}
.apx-stage .apx-tip:empty{display:none}
.apx-seg{display:flex;flex-wrap:wrap;gap:4px}
.apx-seg button{flex:1 1 auto;min-width:64px;border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:9px;padding:7px 9px;font:600 .78rem/1.2 var(--font-b,"IBM Plex Sans"),sans-serif;cursor:pointer;white-space:normal}
.apx-seg button[aria-pressed="true"]{background:color-mix(in srgb,var(--anat) 16%,var(--bg-2));border-color:var(--anat);color:var(--ink)}
.apx-lab{font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);font-weight:700}
.apx-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.apx-card{display:flex;flex-direction:column;gap:4px;text-align:left;border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:12px;padding:10px 11px;cursor:pointer;font:500 .8rem/1.35 var(--font-b,"IBM Plex Sans"),sans-serif}
.apx-card b{font-size:.86rem}
.apx-card small{color:var(--ink-3);font-size:.74rem}
.apx-card[aria-pressed="true"]{border-color:var(--anat);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--anat) 22%,transparent)}
.apx-seq{display:flex;flex-direction:column;gap:6px}
.apx-seq .apx-slot{display:flex;gap:9px;align-items:center;min-height:40px;border:1.5px dashed var(--line-2);border-radius:10px;padding:7px 10px;font-size:.86rem;color:var(--ink-3)}
.apx-seq .apx-slot.full{border-style:solid;color:var(--ink);background:var(--bg-2)}
.apx-seq .apx-slot.ok{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 10%,var(--bg-2))}
.apx-seq .apx-slot.bad{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 8%,var(--bg-2))}
.apx-seq .apx-n{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;flex:none;font:700 .72rem/1 var(--font-m);background:var(--bg-3);color:var(--ink-2);border:1px solid var(--line-2)}
.apx-pool{display:flex;flex-wrap:wrap;gap:6px}
.apx-pool .chip{white-space:normal;text-align:left;line-height:1.3;cursor:pointer}
.apx-pool .chip[disabled]{opacity:.35;cursor:default}
.apx-checks{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.apx-checks label{display:flex;gap:9px;align-items:flex-start;padding:8px 10px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);font-size:.84rem;line-height:1.35;cursor:pointer}
.apx-checks label.on{border-color:var(--anat);background:color-mix(in srgb,var(--anat) 8%,var(--bg-2))}
.apx-checks label.ok{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 10%,var(--bg-2))}
.apx-checks label.bad{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 8%,var(--bg-2))}
.apx-checks input{margin-top:3px;flex:none}
.apx-checks .apx-why{display:block;font-size:.76rem;color:var(--ink-2);margin-top:3px}
.apx-two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.apx-two>*,.apx-cards>*,.apx-checks>*{min-width:0}
.apx-fig{border:1px solid var(--line);border-radius:12px;background:var(--bg-3);overflow:hidden}
.apx-fig svg{display:block;width:100%;height:auto}
.apx-fig figcaption{font-size:.78rem;color:var(--ink-2);padding:7px 11px;border-top:1px solid var(--line);background:var(--bg-2)}
.apx-steps{display:flex;flex-wrap:wrap;gap:5px}
.apx-steps button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:8px;padding:5px 9px;font:600 .76rem/1.1 var(--font-b,"IBM Plex Sans"),sans-serif;cursor:pointer}
.apx-steps button[aria-current="true"]{background:var(--anat);border-color:var(--anat);color:#fff}
.apx-bar{height:10px;border-radius:999px;background:var(--bg-2);border:1px solid var(--line-2);overflow:hidden}
.apx-bar i{display:block;height:100%;border-radius:999px;transition:width .5s,background .5s}
.apx-plan{display:flex;flex-direction:column;gap:4px;margin:0;padding:0;list-style:none}
.apx-plan li{display:flex;gap:9px;align-items:center;font-size:.84rem;padding:5px 8px;border-radius:8px;color:var(--ink-3)}
.apx-plan li.done{color:var(--ink)}
.apx-plan li.cur{background:color-mix(in srgb,var(--anat) 10%,var(--bg-2));color:var(--ink);font-weight:600}
.apx-plan li .apx-n{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;flex:none;font:700 .72rem/1 var(--font-m);border:1.5px solid var(--line-2)}
.apx-plan li.done .apx-n{background:var(--ok);border-color:var(--ok);color:#fff}
.apx-plan li.cur .apx-n{background:var(--anat);border-color:var(--anat);color:#fff}
.apx-pick{white-space:normal!important;text-align:left;line-height:1.3;justify-content:flex-start!important}
.apx-kv{display:grid;grid-template-columns:auto 1fr;gap:3px 12px;font-size:.84rem;margin:0}
.apx-kv dt{color:var(--ink-3)}
.apx-kv dd{margin:0;font-weight:600;color:var(--ink)}
.apx-roles{display:flex;flex-direction:column;gap:7px}
.apx-roles .apx-role{display:grid;grid-template-columns:minmax(120px,1fr) 2fr;gap:8px;align-items:center;font-size:.84rem}
.apx-roles .apx-role b{font-size:.86rem}
.apx-roles select{font-size:.82rem;padding:7px 9px}
.apx-roles .apx-role.ok select{border-color:var(--ok)}
.apx-roles .apx-role.bad select{border-color:var(--bad)}
.apx-oms{display:flex;flex-direction:column;gap:8px}
.apx-oms .apx-item{border:1px solid var(--line);border-radius:10px;padding:8px 10px;background:var(--bg-2);display:flex;flex-direction:column;gap:6px}
.apx-oms .apx-item.ok{border-color:var(--ok)}
.apx-oms .apx-item.bad{border-color:var(--bad)}
.apx-oms .apx-item p{margin:0;font-size:.85rem;font-weight:600}
.apx-oms .apx-item small{font-size:.76rem;color:var(--ink-2)}
.apx-tabla{width:100%;border-collapse:collapse;font-size:.82rem}
.apx-tabla th,.apx-tabla td{border-bottom:1px solid var(--line);padding:6px 8px;text-align:left;vertical-align:top}
.apx-tabla th{color:var(--ink-3);font-weight:600;font-size:.74rem;text-transform:uppercase;letter-spacing:.04em}
.apx-alarma{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.apx-alarma>div{border:1px solid var(--line);border-left:4px solid var(--bad);border-radius:10px;padding:8px 10px;background:var(--bg-2);font-size:.84rem}
.apx-alarma b{display:block;margin-bottom:2px}
.apx-info{border:1px solid var(--line);border-radius:10px;padding:9px 11px;background:var(--bg-2);font-size:.84rem;line-height:1.45}
.apx-info b{color:var(--ink)}
.apx-info:empty{display:none}
.apx-fall{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:10px}
.apx-fall svg{width:100%;height:100%;max-height:100%}
.apx-wrap{white-space:normal!important;text-align:left;height:auto;line-height:1.3}
@media(max-width:900px){.apx-cards{grid-template-columns:1fr}.apx-alarma{grid-template-columns:1fr 1fr}}
@media(max-width:760px){.apx-two,.apx-checks{grid-template-columns:1fr}.apx-stage{height:380px;min-height:380px}.apx-roles .apx-role{grid-template-columns:1fr}.apx-alarma{grid-template-columns:1fr}.apx-stage .apx-tip{max-width:calc(100% - 24px);left:12px;right:12px;bottom:34px}}
</style>
<script>
/* =====================================================================
   APENDICECTOMÍA: UNA CIRUGÍA POR DENTRO  (v2.0)
   Simulación educativa de divulgación anatómica y de salud. NO es formación
   quirúrgica: explica qué ocurre en la operación, no enseña a operar.
   v2.0: escenas 3D con realismo de atlas (texturas propias de piel, grasa,
   aponeurosis, músculo, peritoneo y serosa; paño quirúrgico y antiséptico;
   lámpara con sombras suaves; instrumental metálico; monitor con viñeteado).
   Sin sangre: tejidos limpios, como en un atlas.
   Biología BGU · Unidad 6 (anatomía y fisiología humana, sistema digestivo
   y salud) · Ciencias Naturales 9.º EGB.
   Ruta: #/simuladores/apendicectomia · Actividad: reto-apendicectomia
   Todo lo nuevo de este archivo lleva el prefijo apx / APX_ / .apx-
   Escalas: torso 1 u = 5 cm · campo quirúrgico 1 u = 2 cm (modelo estilizado).
   ===================================================================== */
try { if (typeof BIO === 'object' && BIO && BIO.activities && !BIO.activities['reto-apendicectomia'])
  BIO.activities['reto-apendicectomia'] = { t:'Reto: apendicectomía', unidad:6, peso:0, xp:180 };
} catch(e){ console.warn('apx activities', e); }
try { if (typeof ACT_HREF === 'object' && ACT_HREF) ACT_HREF['reto-apendicectomia'] = '#/simuladores/apendicectomia'; } catch(e){}

/* Línea para el catálogo curricular (la suma el integrador en src/90-curriculo.js) */
const APX_CURR = { href:'#/simuladores/apendicectomia', act:'reto-apendicectomia', tipo:'Simulador 3D', em:'🩺',
  t:'Apendicectomía: una cirugía por dentro',
  d:'Del dolor que migra al punto de McBurney: planos de la pared, técnica abierta y laparoscópica en un modelo 3D estilizado, sin sangre.',
  reto:'Ordena los síntomas, ubica el punto de McBurney, atraviesa los planos en orden y elige cada paso de la operación explicando por qué.',
  bio:6, cn:['9-cvt-2'] };

const APX_AVISO = 'Esta simulación explica qué ocurre en la operación; no enseña a operar. Ante dolor abdominal intenso, acuda de inmediato a un servicio de salud; no se automedique ni use laxantes o analgésicos que enmascaren el dolor.';

/* ------------------------------------------------------------- utilidades */
const apxQuieto = () => !((typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion));
const apxCol = (v, fb) => { try { return cssVar(v) || fb; } catch(e){ return fb; } };
function apxCol3(hex){ const c = new THREE.Color(hex); return c.convertSRGBToLinear ? c.convertSRGBToLinear() : c; }
function apxOscuro(){
  const c = (apxCol('--bg', '#ffffff') || '#ffffff').trim(), m = c.match(/^#([0-9a-f]{6})$/i);
  if (!m) return false; const n = parseInt(m[1], 16);
  return ((n>>16&255)*0.3 + (n>>8&255)*0.59 + (n&255)*0.11) < 90;
}
const apxN = (v, d) => (typeof v === 'number' && isFinite(v) ? v : 0).toFixed(d === undefined ? 1 : d).replace('.', ',');
const apxNota = (cls, titulo, txt) => h('div',{class:'notice '+cls},
  h('span',{}, titulo ? h('b',{}, titulo+' ') : null, /<[a-z/]/i.test(txt) ? h('span',{html:txt}) : txt));
const apxSmooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x-a)/(b-a))); return t*t*(3-2*t); };
const apxEase = k => k<0.5 ? 2*k*k : 1 - Math.pow(-2*k+2, 2)/2;
function apxShuffle(arr, seed){ const a = arr.slice(); let s = seed || 7; for (let i=a.length-1;i>0;i--){ s = (s*9301 + 49297) % 233280; const j = Math.floor(s/233280*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
/* interpolación suave de una tabla [[x,y],…] (Catmull-Rom 1D) */
function apxKeys(K){ return x => { if (x <= K[0][0]) return K[0][1]; if (x >= K[K.length-1][0]) return K[K.length-1][1];
  let i = 0; while (x > K[i+1][0]) i++; const p0 = K[Math.max(0,i-1)][1], p1 = K[i][1], p2 = K[i+1][1], p3 = K[Math.min(K.length-1,i+2)][1];
  const t = (x-K[i][0])/(K[i+1][0]-K[i][0]), t2 = t*t, t3 = t2*t;
  return 0.5*((2*p1) + (-p0+p2)*t + (2*p0-5*p1+4*p2-p3)*t2 + (-p0+3*p1-3*p2+p3)*t3); }; }
/* malla de rejilla paramétrica f(u,v,out) */
function apxGrid(nu, nv, f, flip){
  const n = (nu+1)*(nv+1), P = new Float32Array(n*3), U = new Float32Array(n*2), I = []; const p = new THREE.Vector3();
  for (let j=0;j<=nv;j++) for (let i=0;i<=nu;i++){ const k = j*(nu+1)+i; f(i/nu, j/nv, p); P[k*3]=p.x; P[k*3+1]=p.y; P[k*3+2]=p.z; U[k*2]=i/nu; U[k*2+1]=j/nv; }
  for (let j=0;j<nv;j++) for (let i=0;i<nu;i++){ const a = j*(nu+1)+i, b = a+1, c = a+nu+1, d = c+1; if (flip) I.push(a,c,b, b,c,d); else I.push(a,b,c, b,d,c); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(P,3)); g.setAttribute('uv', new THREE.BufferAttribute(U,2)); g.setIndex(I); g.computeVertexNormals(); return g;
}
/* animaciones sencillas (tweens) que corren en el bucle del motor */
function apxTweens(E){
  const L = [];
  E.onFrame((t, dt) => { for (let i=L.length-1;i>=0;i--){ const w = L[i]; w.t += dt; const k = Math.min(1, w.t/w.d); w.fn(apxEase(k)); if (k >= 1){ L.splice(i,1); w.done && w.done(); } } });
  return {
    run(d, fn, done){ if (apxQuieto() || d <= 0){ fn(1); done && done(); return; } L.push({ t:0, d, fn, done }); },
    get busy(){ return L.length > 0; },
    clear(){ L.length = 0; }
  };
}
/* intercambio de materiales: realista ↔ esquemático (colores planos de atlas) */
function apxDual(mesh, esqHex, extra){
  const real = mesh.material;
  const esq = new THREE.MeshStandardMaterial(Object.assign({ color:apxCol3(esqHex), roughness:0.72, metalness:0, side:real.side, transparent:real.transparent, opacity:real.opacity, depthWrite:real.depthWrite }, extra||{}));
  mesh.userData.apxM = { real, esq }; return mesh;
}
function apxSetEsq(meshes, on){
  meshes.forEach(m => { const d = m.userData.apxM; if (!d) return; const next = on ? d.esq : d.real, cur = m.material; if (next === cur) return;
    next.opacity = cur.opacity; next.transparent = cur.transparent; next.depthWrite = cur.depthWrite; m.material = next; });
}
/* raycast propio (el motor solo devuelve el id de la parte) */
function apxRayAt(E, ev, meshes){
  const r = E.canvas.getBoundingClientRect(); const m = new THREE.Vector2(((ev.clientX-r.left)/r.width)*2-1, -((ev.clientY-r.top)/r.height)*2+1);
  const ray = new THREE.Raycaster(); ray.setFromCamera(m, E.camera); return ray.intersectObjects(meshes, false)[0] || null;
}
/* clic corto sobre el lienzo (sin arrastre) */
function apxOnTap(E, fn){
  let x0 = 0, y0 = 0, down = false; const c = E.canvas;
  const d = e => { down = true; x0 = e.clientX; y0 = e.clientY; };
  const u = e => { if (!down) return; down = false; if (Math.hypot(e.clientX-x0, e.clientY-y0) < 6) fn(e); };
  c.addEventListener('pointerdown', d); c.addEventListener('pointerup', u);
}
/* encuadre en escenarios angostos */
function apxFrame(E, need){ const c = E.container; const asp = (c.clientWidth || 1) / (c.clientHeight || 1); const k = Math.min(1.75, Math.max(1, need / asp));
  if (k > 1.01){ E.opts.radius *= k; E.sph.r = E.goal.r = E.opts.radius; E.opts.maxR = Math.max(E.opts.maxR, E.opts.radius*1.3); } }
/* telón de fondo suave (evita objetos flotando en el vacío) */
function apxFondo(E, osc, c1, c2){
  const g = new THREE.SphereGeometry(60, 32, 16), col = [], pos = g.attributes.position;
  const a = new THREE.Color(osc ? c1[1] : c1[0]), b = new THREE.Color(osc ? c2[1] : c2[0]), c = new THREE.Color();
  for (let i=0;i<pos.count;i++){ const y = pos.getY(i)/60; c.copy(a).lerp(b, clamp(0.5 - y*0.9, 0, 1)); if (c.convertSRGBToLinear) c.convertSRGBToLinear(); col.push(c.r, c.g, c.b); }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors:true, side:THREE.BackSide, depthWrite:false, toneMapped:false })); E.scene.add(m); return m;
}

/* =====================================================================
   TEXTURAS DE ATLAS (v2.0): piel con poros, paño quirúrgico, gasa, grasa
   lobulada, aponeurosis nacarada, músculo estriado, peritoneo, serosa con
   red vascular, apéndice hiperémico, metal cepillado. Ruido periódico (sin
   costuras), 512 px (256 en calidad Básica), pintadas una sola vez y
   cacheadas. Cada textura da color + relieve (bump).
   ===================================================================== */
const apxTex = (() => {
  const cache = {}, texCache = {};
  const LOW = () => { try { return Engine3D.bajo(); } catch(e){ return (typeof lowEnd === 'function') ? lowEnd() : false; } };
  const SZ = () => (LOW() ? 256 : 512);
  const cl = v => v<0?0:v>1?1:v, mix = (a,b,t) => a+(b-a)*t, hx = h => [(h>>16)&255,(h>>8)&255,h&255];
  const mixc = (A,B,t,o) => { o[0]=mix(A[0],B[0],t); o[1]=mix(A[1],B[1],t); o[2]=mix(A[2],B[2],t); return o; };
  const mul = (o,k) => { o[0]*=k; o[1]*=k; o[2]*=k; return o; };
  /* ruido de valor periódico */
  const pn = (P, seed) => { const g = new Float32Array(P*P); const R = Kit.rng(seed); for (let i=0;i<g.length;i++) g[i] = R()*2-1;
    return (x,y) => { const fx=x*P, fy=y*P, x0=Math.floor(fx), y0=Math.floor(fy), tx=fx-x0, ty=fy-y0, sx=tx*tx*(3-2*tx), sy=ty*ty*(3-2*ty);
      const i0=((x0%P)+P)%P, i1=(i0+1)%P, j0=((y0%P)+P)%P, j1=(j0+1)%P, a=g[j0*P+i0], b=g[j0*P+i1], c=g[j1*P+i0], d=g[j1*P+i1];
      return a+(b-a)*sx+(c-a)*sy+(a-b-c+d)*sx*sy; }; };
  const fb = (seed, base=4, oct=4) => { const L = []; for (let i=0;i<oct;i++) L.push(pn(base<<i, seed+i*131)); return (u,v) => { let s=0,a=0.5; for (const n of L){ s+=a*n(u,v); a*=0.5; } return s; }; };
  /* Worley periódico: f1, f2, r (aleatorio de la celda) y dirección al centro (para «domos») */
  const worley = (G, seed) => { const R = Kit.rng(seed); const pts = new Float32Array(G*G*2), rnd = new Float32Array(G*G); for (let i=0;i<G*G;i++){ pts[i*2]=R(); pts[i*2+1]=R(); rnd[i]=R(); }
    return (u,v,o) => { const fx=u*G, fy=v*G, cx=Math.floor(fx), cy=Math.floor(fy); let f1=9, f2=9, id=0;
      for (let j=-1;j<=1;j++) for (let i=-1;i<=1;i++){ const gx=((cx+i)%G+G)%G, gy=((cy+j)%G+G)%G, k=gy*G+gx; const dx = cx+i+pts[k*2]-fx, dy = cy+j+pts[k*2+1]-fy; const d = dx*dx+dy*dy; if (d<f1){ f2=f1; f1=d; id=k; } else if (d<f2) f2=d; }
      o.f1 = Math.sqrt(f1); o.f2 = Math.sqrt(f2); o.r = rnd[id]; return o; }; };
  /* red vascular: bordes finos de celdas Worley a dos escalas */
  const vasos = (G1, G2, s) => { const w1 = worley(G1, s), w2 = worley(G2, s+7); return (u,v,W) => { w1(u,v,W); const e1 = 1 - cl((W.f2-W.f1)/0.06); w2(u,v,W); const e2 = 1 - cl((W.f2-W.f1)/0.045); return { a:e1*e1*e1, b:e2*e2*e2*e2 }; }; };
  function paint(key, fn){ const n = SZ(); const k = key+n; if (cache[k]) return cache[k];
    const cc = document.createElement('canvas'), bc = document.createElement('canvas'); cc.width=cc.height=bc.width=bc.height=n;
    const cx = cc.getContext('2d'), bx = bc.getContext('2d'); const ci = cx.createImageData(n,n), bi = bx.createImageData(n,n); const out = { c:[0,0,0], h:0.5 }, W = {};
    for (let y=0;y<n;y++) for (let x=0;x<n;x++){ fn(x/n, y/n, out, W); const q=(y*n+x)*4; ci.data[q]=cl(out.c[0]/255)*255; ci.data[q+1]=cl(out.c[1]/255)*255; ci.data[q+2]=cl(out.c[2]/255)*255; ci.data[q+3]=255; const hv = cl(out.h)*255; bi.data[q]=bi.data[q+1]=bi.data[q+2]=hv; bi.data[q+3]=255; }
    cx.putImageData(ci,0,0); bx.putImageData(bi,0,0); return (cache[k] = { color:cc, bump:bc }); }
  const T = {
    /* piel: tono con variación suave, leve moteado rosado, poros finos y microlíneas; sin vello */
    skin(){ const tone = fb(501,3,4), mott = fb(503,10,3), pore = worley(70, 507), fine = fb(509,40,2), fine2 = fb(513,64,2);
      return paint('skin', (u,v,o,W) => { pore(u,v,W); const nn = tone(u,v), mm = mott(u,v); const pr = Math.pow(1 - cl(W.f1/0.075), 2)*(0.35+0.65*W.r);
        const l1 = 1 - cl(Math.abs(fine(u,v))/0.05), l2 = 1 - cl(Math.abs(fine2(u,v))/0.06);
        mixc(hx(0xDDB194), hx(0xF1D0B6), cl(0.55 + 0.45*nn + 0.12*mm), o.c); mixc(o.c, hx(0xD8968C), cl(0.05 + 0.1*mm), o.c);
        mul(o.c, 1 - 0.09*pr - 0.035*l1 - 0.02*l2); o.h = 0.55 + 0.1*mm - 0.3*pr - 0.1*l1 - 0.06*l2 + 0.05*nn; }); },
    /* paño quirúrgico: tela tejida verde azulada, mate, con sombreado de fibras */
    drape(){ const n = fb(521,4,3), m = fb(523,24,2); return paint('drape', (u,v,o) => { const wx = 0.5+0.5*Math.sin(u*Math.PI*2*170), wy = 0.5+0.5*Math.sin(v*Math.PI*2*170); const weave = 0.5*(wx+wy) - 0.5*wx*wy; const nn = n(u,v), mm = m(u,v);
        mixc(hx(0x3F7F79), hx(0x6AA8A1), cl(0.42 + 0.5*weave + 0.35*nn + 0.12*mm), o.c); o.h = 0.35 + 0.5*weave + 0.15*mm; }); },
    /* gasa / compresa: algodón blanco tejido, hilos gruesos */
    gauze(){ const n = fb(531,6,3), m = fb(533,30,2); return paint('gauze', (u,v,o) => { const wx = 0.5+0.5*Math.sin(u*Math.PI*2*48), wy = 0.5+0.5*Math.sin(v*Math.PI*2*48); const t = Math.max(wx, wy); const nn = n(u,v);
        mixc(hx(0xD7D3C8), hx(0xFCFBF6), cl(0.35 + 0.6*t + 0.3*nn + 0.1*m(u,v)), o.c); o.h = 0.25 + 0.6*t + 0.15*nn; }); },
    /* grasa subcutánea / epiplón: lobulillos amarillos con tabiques finos, húmeda */
    fat(){ const w = worley(13, 541), w2 = worley(34, 543), n = fb(547,6,3); return paint('fat', (u,v,o,W) => { w(u,v,W); const edge = cl((W.f2-W.f1)*5); const dome = cl(1 - W.f1*2.2); const r1 = W.r; w2(u,v,W); const e2 = cl((W.f2-W.f1)*7); const nn = n(u,v);
        mixc(hx(0xD39C3E), hx(0xF7DF95), cl(0.3 + 0.45*r1 + 0.35*nn), o.c); mixc(o.c, hx(0xFBF2DE), 0.55*(1-edge) + 0.25*(1-e2), o.c); mul(o.c, 0.9 + 0.12*dome); o.h = 0.3 + 0.5*dome*edge + 0.15*e2 + 0.05*nn; }); },
    /* aponeurosis: lámina nacarada con fibras tendinosas paralelas (a lo largo de u) */
    apon(){ const n = fb(551,4,3), j = fb(553,10,2), s = fb(557,48,1); return paint('apon', (u,v,o) => { const q = v*30 + 0.5*j(u,v); const f = q - Math.floor(q); const band = 1 - Math.abs(2*f-1); const fine = 0.5+0.5*Math.sin((v*160 + 3*n(u,v))*Math.PI*2); const nn = n(u,v);
        mixc(hx(0xE6E0D3), hx(0xFFFDF8), cl(0.45 + 0.35*band + 0.2*fine + 0.4*nn), o.c); mixc(o.c, hx(0xF4E8DA), 0.2*cl(s(u,v)*2), o.c); o.h = 0.4 + 0.3*band + 0.2*fine + 0.05*nn; }); },
    /* músculo esquelético: fascículos paralelos (u), perimisio claro, estriación fina y brillo húmedo */
    muscle(){ const n = fb(561,4,4), j = fb(563,8,3), s = fb(567,20,2); return paint('muscle', (u,v,o) => { const q = v*26 + 0.4*j(u,v); const f = q - Math.floor(q); const fasc = Math.sin(f*Math.PI); const per = 1 - cl(Math.min(f, 1-f)/0.07); const fine = Math.sin(v*520*Math.PI*2)*0.5+0.5; const nn = n(u,v), ss = s(u,v);
        mixc(hx(0x7A2622), hx(0xB7463F), cl(0.5 + 0.9*nn + 0.25*fasc), o.c); mul(o.c, 0.94 + 0.08*fine + 0.06*ss); mixc(o.c, hx(0xE0B4AB), 0.5*per, o.c); o.h = 0.35 + 0.35*fasc - 0.25*per + 0.05*fine + 0.08*nn; }); },
    /* peritoneo / fascia: membrana pálida, lisa, con vasos muy finos */
    perit(){ const n = fb(571,5,3), vs = vasos(9, 22, 573); return paint('perit', (u,v,o,W) => { const nn = n(u,v); const V = vs(u,v,W);
        mixc(hx(0xE4D6DC), hx(0xF8F3F5), cl(0.55 + 0.8*nn), o.c); mixc(o.c, hx(0xB86A74), 0.35*V.a + 0.18*V.b, o.c); o.h = 0.5 + 0.12*nn + 0.12*V.a; }); },
    /* serosa intestinal: rosa salmón húmedo con red vascular fina (dos calibres) */
    serosa(){ const n = fb(581,4,4), m = fb(583,12,2), vs = vasos(8, 24, 587); return paint('serosa', (u,v,o,W) => { const nn = n(u,v), mm = m(u,v); const V = vs(u,v,W);
        mixc(hx(0xD2867A), hx(0xF2C1AF), cl(0.55 + 0.85*nn + 0.2*mm), o.c); mixc(o.c, hx(0x9E3238), 0.55*V.a, o.c); mixc(o.c, hx(0xB5464A), 0.35*V.b, o.c); o.h = 0.5 + 0.12*nn + 0.06*mm + 0.14*V.a + 0.08*V.b; }); },
    /* apéndice inflamado: serosa hiperémica, vasos congestivos, engrosada, con zonas mates */
    apend(){ const n = fb(591,4,4), m = fb(593,9,3), vs = vasos(7, 20, 597), p = fb(599,16,2); return paint('apend', (u,v,o,W) => { const nn = n(u,v), mm = m(u,v); const V = vs(u,v,W); const mate = cl((p(u,v)-0.12)*4);
        mixc(hx(0xBF4B47), hx(0xE38F82), cl(0.5 + 0.85*nn + 0.25*mm), o.c); mixc(o.c, hx(0x8A2028), 0.5*V.a, o.c); mixc(o.c, hx(0xA43038), 0.32*V.b, o.c); mixc(o.c, hx(0xE9C7B8), 0.22*mate, o.c); o.h = 0.5 + 0.12*nn + 0.18*V.a + 0.1*V.b + 0.08*mate; }); },
    /* colon: serosa algo más pálida y moteada (para haustras) */
    colon(){ const n = fb(601,3,4), m = fb(603,14,2), vs = vasos(7, 26, 607); return paint('colon', (u,v,o,W) => { const nn = n(u,v), mm = m(u,v); const V = vs(u,v,W);
        mixc(hx(0xD99E90), hx(0xF5D3C4), cl(0.55 + 0.85*nn + 0.15*mm), o.c); mixc(o.c, hx(0xA33A3C), 0.45*V.a, o.c); mixc(o.c, hx(0xBA5052), 0.3*V.b, o.c); o.h = 0.5 + 0.12*nn + 0.12*V.a + 0.06*V.b; }); },
    /* metal cepillado (instrumental) */
    metal(){ const n = fb(611,6,2), s = fb(613,64,1); return paint('metal', (u,v,o) => { const line = 0.5+0.5*Math.sin((v*700 + 4*s(u,v))*Math.PI*2); const nn = n(u,v);
        mixc(hx(0xC3CAD1), hx(0xEEF2F5), cl(0.55 + 0.25*line + 0.4*nn), o.c); o.h = 0.5 + 0.12*line + 0.04*nn; }); },
    /* hueso: marfil con poros y láminas */
    bone(){ const n = fb(621,4,4), w = worley(40, 623), s = fb(627,2,3); return paint('bone', (u,v,o,W) => { w(u,v,W); const pore = 1 - cl(W.f1/0.12); const nn = n(u,v); const lam = Math.sin((v*18 + 3*s(u,v))*Math.PI*2);
        mixc(hx(0xD8CBAE), hx(0xF3ECDC), cl(0.55 + nn*0.9 + 0.025*lam), o.c); mul(o.c, 1 - 0.18*pore*pore); o.h = 0.55 + 0.2*nn - 0.3*pore*pore + 0.012*lam; }); }
  };
  function tex(key, which, rep){ const k = key+which+SZ()+(rep ? rep.join('x') : ''); let t = texCache[k]; if (!t){ const P = T[key](); t = new THREE.CanvasTexture(which === 'c' ? P.color : P.bump); t.wrapS = t.wrapT = THREE.RepeatWrapping; if (which === 'c') t.encoding = THREE.sRGBEncoding; t.anisotropy = LOW() ? 2 : 4; if (rep) t.repeat.set(rep[0], rep[1]); texCache[k] = t; }
    return t; }
  /* material físico de tejido: o.tex (clave), rep, bump, color, rough, coat, coatRough, env, sss:[hex, k, pow] */
  function mat(o={}){
    const m = new THREE.MeshPhysicalMaterial({ color: o.color === undefined ? 0xffffff : (typeof o.color === 'string' ? apxCol3(o.color) : o.color), roughness: o.rough ?? 0.45, metalness: o.metal ?? 0, clearcoat: o.coat ?? 0.7, clearcoatRoughness: o.coatRough ?? 0.22, side: o.side ?? THREE.FrontSide, vertexColors: !!o.vc, transparent: !!o.transparent, opacity: o.opacity ?? 1, depthWrite: o.depthWrite ?? !o.transparent, envMapIntensity: o.env ?? 1 });
    if (o.tex){ m.map = tex(o.tex, 'c', o.rep); if (o.bump !== 0){ m.bumpMap = tex(o.tex, 'b', o.rep); m.bumpScale = o.bump ?? 0.02; } }
    if (o.sss) apxRim(m, o.sss[0], o.sss[1], o.sss[2]);
    return m;
  }
  return { T, tex, mat, paint, fb, worley };
})();
/* Subsuperficie simulada: luz que «atraviesa» el borde del tejido (término de Fresnel en el color propio). */
function apxRim(m, hex, k, pw){
  const col = apxCol3(hex || '#FF7A5A');
  m.onBeforeCompile = sh => {
    sh.uniforms.apxRimC = { value: col }; sh.uniforms.apxRimK = { value: k === undefined ? 0.35 : k }; sh.uniforms.apxRimP = { value: pw === undefined ? 2.5 : pw };
    sh.fragmentShader = sh.fragmentShader.replace('uniform vec3 emissive;', 'uniform vec3 emissive;\nuniform vec3 apxRimC; uniform float apxRimK; uniform float apxRimP;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n{ float apxF = pow(1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0), apxRimP); totalEmissiveRadiance += apxRimC * diffuseColor.rgb * (apxF * apxRimK); }');
  };
  m.customProgramCacheKey = () => 'apxrim';
  return m;
}
/* Luz cenital de quirófano (lámpara) con sombras suaves; en calidad Básica solo la luz. */
function apxLampara(E, pos, target, o={}){
  const low = E.low;
  const sp = new THREE.SpotLight(0xFFF6EA, o.int ?? 1.1, 0, o.angle ?? 0.62, 0.55, 1.2);
  sp.position.set(pos[0], pos[1], pos[2]); sp.target.position.set(target[0], target[1], target[2]); E.scene.add(sp); E.scene.add(sp.target);
  if (!low && !o.noShadow){ E.renderer.shadowMap.enabled = true; E.renderer.shadowMap.type = THREE.VSMShadowMap; sp.castShadow = true; sp.shadow.mapSize.set(1024, 1024); sp.shadow.radius = o.radius ?? 5; sp.shadow.bias = -0.0004; sp.shadow.normalBias = o.nbias ?? 0.02; sp.shadow.camera.near = 2; sp.shadow.camera.far = o.far ?? 40; }
  return sp;
}
function apxSombra(m, cast, recv){ (Array.isArray(m) ? m : [m]).forEach(x => { if (!x) return; x.castShadow = !!cast; x.receiveShadow = !!recv; }); }
/* Tubo con radio y color dependientes del punto (u) y del ángulo (a): haustras, tenias, vasos */
function apxTubo(pts, o={}){
  const c = Kit.curve(pts); const T = o.seg ?? 40, R = o.rad ?? 16; const g = new THREE.TubeGeometry(c, T, 1, R, !!o.closed);
  const pos = g.attributes.position, P = new THREE.Vector3(), v = new THREE.Vector3(); const cols = o.color ? new Float32Array(pos.count*3) : null; const out = [1,1,1];
  for (let i=0;i<=T;i++){ const u = i/T; c.getPointAt(u, P); for (let j=0;j<=R;j++){ const k = i*(R+1)+j, a = j/R*Math.PI*2; v.fromBufferAttribute(pos, k).sub(P); const rr = o.rfn(u, a); v.multiplyScalar(rr).add(P); pos.setXYZ(k, v.x, v.y, v.z);
    if (cols){ o.color(u, a, out); cols[k*3]=out[0]; cols[k*3+1]=out[1]; cols[k*3+2]=out[2]; } } }
  if (cols) g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  g.computeVertexNormals(); g.userData.curve = c; return g;
}
/* cinta (tenia) sobre una superficie: banda blanca ligeramente elevada, con suavizado */
const apxBanda = (a, a0, w) => { let d = Math.abs(((a - a0) % (Math.PI*2) + Math.PI*3) % (Math.PI*2) - Math.PI); return d < w ? 1 : Math.max(0, 1 - (d-w)/(w*0.6)); };
/* etiqueta de frasco (texto en canvas) */
function apxEtiqueta(lineas){ const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d'); x.fillStyle = '#FFFFFF'; x.fillRect(0,0,256,128); x.strokeStyle = '#2F6FD6'; x.lineWidth = 6; x.strokeRect(6,6,244,116);
  x.fillStyle = '#1F2D3D'; x.font = 'bold 26px sans-serif'; x.fillText(lineas[0] || '', 18, 44); x.font = '18px sans-serif'; x.fillStyle = '#4A5A6A'; (lineas.slice(1)).forEach((l, i) => x.fillText(l, 18, 72 + i*24));
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t; }

/* =====================================================================
   DATOS DE REFERENCIA
   Torso (1 u = 5 cm): x hacia la IZQUIERDA del paciente (la derecha del
   paciente queda a la izquierda de quien lo mira de frente), y hacia la
   cabeza, z hacia delante. Ombligo en el origen.
   ===================================================================== */
const APX_T = { umb:[0,0], eiasD:[-2.5,-1.2], eiasI:[2.5,-1.2], cm:5 };
APX_T.mcb = [APX_T.eiasD[0] + (APX_T.umb[0]-APX_T.eiasD[0])/3, APX_T.eiasD[1] + (APX_T.umb[1]-APX_T.eiasD[1])/3];

const APX_INFO = {
  ombligo:['Ombligo','Cicatriz del cordón umbilical. Es una referencia fija de la pared abdominal: está más o menos a la altura de la tercera o cuarta vértebra lumbar. En la laparoscopía, el primer puerto (el de la cámara) suele entrar por aquí porque la pared es delgada y la cicatriz queda escondida.'],
  'eias-d':['Espina ilíaca anterosuperior derecha','Saliente del hueso de la cadera que se palpa bajo la piel, al frente y a los lados. Es el extremo externo de la línea que lleva al ombligo y en cuyo tercio externo está el punto de McBurney.'],
  'eias-i':['Espina ilíaca anterosuperior izquierda','La misma referencia ósea del lado izquierdo del paciente. En la laparoscopía, uno de los puertos de trabajo suele colocarse en la fosa ilíaca izquierda, lejos del apéndice, para que los instrumentos lleguen en ángulo cómodo.'],
  ciego:['Ciego','Primer segmento del intestino grueso, un saco en la fosa ilíaca derecha. Recibe el contenido del íleon a través de la válvula ileocecal. Del ciego cuelga el apéndice.'],
  apendice:['Apéndice vermiforme (inflamado)','Tubo ciego de unos 6 a 10 cm con pared rica en tejido linfático. Aquí se muestra inflamado: más grueso y más rojizo que uno sano, que mide unos 6 mm de diámetro o menos. Su base es casi constante; su punta cambia mucho de posición entre personas.'],
  colon:['Colon (marco cólico)','Ascendente, transverso, descendente y sigmoide. Se reconoce a simple vista por sus tres tenias, sus haustras (saquitos) y sus apéndices epiploicos de grasa.'],
  ileon:['Íleon terminal','Último tramo del intestino delgado. Entra en el ciego por la válvula ileocecal. Es más delgado y liso que el colon: no tiene tenias ni haustras.'],
  delgado:['Intestino delgado','Asas del yeyuno y el íleon, que ocupan el centro del abdomen (aquí, casi transparentes para no tapar el ciego).'],
  hueso:['Pelvis (hueso coxal)','Las crestas ilíacas y las espinas ilíacas anterosuperiores son relieves óseos que se palpan: por eso sirven como puntos de referencia en la piel.'],
  lig:['Ligamento inguinal','Banda fibrosa que va de la espina ilíaca anterosuperior al tubérculo del pubis. Marca el límite entre el abdomen y el muslo.'],
  mcb:['Punto de McBurney','Unión del tercio externo con los dos tercios internos de la línea que va de la espina ilíaca anterosuperior derecha al ombligo. Es la proyección aproximada en la piel de la base del apéndice. Si al presionar aquí duele mucho, se habla de «signo de McBurney» positivo.'],
  linea:['Línea espino-umbilical','Une la espina ilíaca anterosuperior derecha con el ombligo. Mide unos 12 a 15 cm en un adolescente; dividida en tres tercios, sirve para ubicar el punto de McBurney.'],
  clic:['Tu punto','El lugar que marcaste. Compáralo con el punto de McBurney.'],
  'inc-mcb':['Incisión de McBurney (oblicua)','Oblicua, perpendicular a la línea espino-umbilical y centrada en el punto de McBurney: casi paralela a las fibras del músculo oblicuo externo.'],
  'inc-rd':['Incisión de Rocky-Davis (transversa)','Transversa, siguiendo los pliegues naturales de la piel sobre el punto de McBurney: la cicatriz suele quedar más discreta.'],
  puertos:['Puertos de la laparoscopía','Tres incisiones de alrededor de 0,5 a 1,2 cm: en el ombligo (cámara), sobre el pubis y en la fosa ilíaca izquierda (instrumentos).'],
  trocares:['Trócares','Tubos con válvula que atraviesan la pared en cada puerto. Por ellos entran la cámara y los instrumentos sin que escape el gas.'],
  co2:['Dióxido de carbono (CO₂)','Se insufla dentro del abdomen para levantar la pared y crear espacio de trabajo (neumoperitoneo). Se usa CO₂ porque no arde y el cuerpo lo absorbe y lo elimina con la respiración; la presión se vigila todo el tiempo.'],
  piel:['Piel','Epidermis y dermis. Se abre con una incisión limpia siguiendo la dirección elegida.'],
  subcutaneo:['Tejido subcutáneo','Grasa con dos láminas fibrosas (fascias de Camper y de Scarpa). Su grosor cambia mucho de una persona a otra.'],
  apon:['Aponeurosis del oblicuo externo','Lámina tendinosa blanca y brillante. Sus fibras corren hacia abajo y hacia la línea media, como las manos metidas en los bolsillos delanteros. Se abre en la dirección de sus fibras.'],
  oblint:['Músculo oblicuo interno','Músculo carnoso bajo la aponeurosis. Sus fibras corren casi perpendiculares a las del oblicuo externo: no se cortan, se separan en su propio sentido.'],
  transv:['Músculo transverso del abdomen','La capa muscular más profunda. Sus fibras son casi horizontales. También se separa sin cortarla.'],
  peritoneo:['Fascia transversal y peritoneo','La fascia transversal y el peritoneo parietal, una membrana fina, brillante y translúcida que tapiza la cavidad abdominal. Al abrirla se entra en la cavidad.'],
  tenias:['Tenias del colon','Tres cintas de músculo longitudinal a lo largo del colon. Convergen en la base del apéndice: seguirlas es la forma segura de encontrarlo.'],
  meso:['Mesoapéndice','Pliegue de peritoneo con grasa que une el apéndice al mesenterio del íleon. En su borde libre lleva la arteria apendicular.'],
  aapend:['Arteria apendicular','Irriga el apéndice. Es una rama de la arteria ileocólica (que viene de la mesentérica superior). Es una arteria terminal: si el apéndice se hincha y la comprime, el tejido se queda sin riego.'],
  ileocol:['Arteria ileocólica','Rama de la arteria mesentérica superior que irriga el final del íleon, el ciego, el inicio del colon ascendente y, a través de la arteria apendicular, el apéndice.'],
  munon:['Muñón apendicular','Lo que queda de la base del apéndice, cerrado con ligaduras. Se revisa que esté bien cerrado antes de terminar.'],
  borde:['Bordes de la incisión','Las capas de la pared, separadas con separadores. Están limpias y protegidas durante la operación.'],
  frasco:['Frasco para patología','El apéndice se envía al laboratorio de patología: confirma el diagnóstico y descarta hallazgos poco frecuentes.'],
  pinza:['Pinza de agarre','Instrumento largo y delgado con mandíbulas en la punta. Sujeta los tejidos con suavidad.'],
  camara:['Cámara (laparoscopio)','Tubo óptico con luz que transmite la imagen al monitor. Quien la sostiene decide qué ve el equipo.'],
  sellador:['Instrumento de sellado y corte','Cierra los vasos pequeños del mesoapéndice (con energía o con grapas y clips) y corta entre los cierres.'],
  monitor:['Monitor','Muestra lo que ve la cámara dentro del abdomen. Todo el equipo trabaja mirando la pantalla, no el abdomen.'],
  pared:['Pared abdominal (levantada)','Con el neumoperitoneo, la pared se eleva como una carpa y deja espacio para mover la cámara y los instrumentos.'],
  bolsa:['Bolsa de extracción','El apéndice se retira dentro de una bolsa para que no toque la pared al salir por el puerto.'],
  cierre:['Cierre por planos','Cada capa se vuelve a unir, de la más profunda a la más superficial. Los músculos separados regresan a su lugar.']
};

/* =====================================================================
   ESCENA 3D · TORSO: RELIEVES, PUNTO DE McBURNEY Y ABORDAJES
   ===================================================================== */
const APX_Y0 = -3.6, APX_Y1 = 3.3;
const apxAT = apxKeys([[-3.6,2.72],[-2.7,3.02],[-1.5,3.0],[-0.5,2.74],[0.7,2.6],[1.9,2.7],[3.3,2.92]]);
const apxBT = apxKeys([[-3.6,1.66],[-2.6,1.8],[-1.0,1.94],[0.0,1.98],[1.3,1.88],[2.4,1.92],[3.3,2.02]]);
const apxBelly = y => 1 + 0.08*Math.exp(-Math.pow((y+0.6)/1.5, 2));
function apxSegD(px, py, ax, ay, bx, by){ const vx = bx-ax, vy = by-ay, t = clamp(((px-ax)*vx + (py-ay)*vy)/(vx*vx+vy*vy), 0, 1); return Math.hypot(px-ax-vx*t, py-ay-vy*t); }
/* relieve de la pared anterior (desplazamiento a lo largo de la normal) */
function apxRelieve(x, y){
  const g = (d, s) => Math.exp(-(d*d)/(s*s)); const ax = Math.abs(x);
  const r = Math.hypot(x, y);
  let d = -0.16*g(r, 0.1) + 0.04*g(r-0.17, 0.06) + 0.03*g(Math.hypot(x, y-0.12), 0.11)*apxSmooth(0.02, 0.14, y) - 0.015*g(x, 0.045)*g(y+0.04, 0.09);   /* ombligo: fosa, reborde y capuchón superior */
  d += 0.1*g(Math.hypot(ax-2.5, y+1.2), 0.3);                               /* espinas ilíacas anterosuperiores */
  d -= 0.045*g(apxSegD(ax, y, 2.35, -1.45, 0.45, -3.2), 0.13);              /* surco inguinal */
  d -= 0.028*g(x, 0.09)*apxSmooth(0.25, 0.6, r)*(1 - apxSmooth(2.9, 3.3, y))*(y > 0 ? 1 : 0.45);   /* línea alba */
  d += 0.035*g(ax-0.85, 0.5)*apxSmooth(-2.7, -1.6, y)*(1 - apxSmooth(2.6, 3.2, y));  /* rectos del abdomen */
  d += 0.045*g(Math.min(apxSegD(ax, y, 0, 3.15, 1.35, 2.6), apxSegD(ax, y, 1.35, 2.6, 2.7, 2.05)), 0.18); /* reborde costal */
  d += 0.07*g(x, 0.9)*g(y+3.25, 0.35);                                      /* pubis */
  return d;
}
function apxTorsoPt(th, y, out){
  const a = apxAT(y), b = apxBT(y), s = Math.sin(th), c = Math.cos(th), e = 0.83;
  const x = a*Math.sign(s)*Math.pow(Math.abs(s), e);
  const z = b*Math.sign(c)*Math.pow(Math.abs(c), e)*(c < 0 ? 0.9 : apxBelly(y));
  const nx = x/(a*a), nz = z/(b*b), nl = Math.hypot(nx, nz) || 1;
  const front = apxSmooth(0.05, 0.55, c);
  const d = apxRelieve(x, y)*front;
  out.set(x + nx/nl*d, y, z + nz/nl*d); return out;
}
/* z de la superficie anterior (sin relieve) para una x,y dadas */
function apxTorsoZ(x, y){ const a = apxAT(y), b = apxBT(y), s = Math.min(0.999, Math.pow(Math.abs(x)/a, 1/0.83)); const c = Math.sqrt(1-s*s); return b*Math.pow(c, 0.83)*apxBelly(y); }

function apxEscenaTorso(stage, hooks){
  const osc = apxOscuro();
  const E = new Engine3D(stage, {
    radius:12.2, phi:1.45, theta:0.0, minR:4.5, maxR:22, target:[0,-0.3,0], floor:APX_Y0-0.32, floorSize:10, dark:osc, exposure:1.0,
    onSelect:(id) => { if (id && hooks.onInfo) hooks.onInfo(id); if (id && APX_INFO[id]) E.select(id); else E.select(null); },
    aria:'Modelo 3D realista del abdomen de un adolescente delgado, del borde de las costillas al pubis, visto de frente y preparado para cirugía: paños verdes que enmarcan la zona operatoria y piel pintada con antiséptico ámbar. Se reconocen el ombligo y las dos espinas ilíacas anterosuperiores. La derecha del paciente está a la izquierda de la pantalla. Arrastra para girar y usa la rueda para acercar. Los botones del panel ofrecen las mismas acciones con el teclado.'
  });
  stage._apxE = E; apxFrame(E, 0.95);
  const low = E.low, tw = apxTweens(E), meshes = [], hid = [];
  apxFondo(E, osc, ['#EEF0F2','#1B2433'], ['#D9DEE3','#0E1522']);
  /* lámpara cenital de quirófano: cálida, con penumbra y sombras suaves */
  apxLampara(E, [1.6, 9.5, 7.5], [0, -0.7, 1.2], { int: osc ? 1.15 : 1.0, angle:0.6, far:40 });
  const add = (id, list, extra, lbl, anchor) => { list.forEach(m => meshes.push(m)); E.addPart(id, list, extra || {}); if (lbl) E.addLabel(id, lbl[0], lbl[1], anchor); };

  /* ---------- piel del torso (con antiséptico pintado por vértice) ---------- */
  const NU = low ? 110 : 168, NV = low ? 96 : 150;
  const thOf = u => { const w = 2*u - 1; return Math.PI*(0.34*w + 0.66*w*w*w); };
  const skinG = apxGrid(NU, NV, (u, v, p) => apxTorsoPt(thOf(u), APX_Y0 + (APX_Y1-APX_Y0)*v, p));
  Kit.weldNormals(skinG);
  /* rectángulo redondeado con signo (ventana del paño) */
  const sdRect = (x, y, x0, x1, y0, y1, r) => { const cx = (x0+x1)/2, cy = (y0+y1)/2, hx = (x1-x0)/2 - r, hy = (y1-y0)/2 - r; const dx = Math.abs(x-cx) - hx, dy = Math.abs(y-cy) - hy; return Math.hypot(Math.max(dx,0), Math.max(dy,0)) + Math.min(Math.max(dx,dy),0) - r; };
  const VENT = { amplia:(x, y) => sdRect(x, y, -3.0, 3.0, -3.0, 2.35, 0.8), fid:(x, y) => sdRect(x, y, -3.1, 0.55, -2.75, 0.8, 0.55) };
  /* zona pintada con antiséptico: todo el abdomen expuesto, más intenso en la fosa ilíaca derecha, con trazos de la torunda */
  const pos = skinG.attributes.position, nor = skinG.attributes.normal, base = pos.array.slice(), bn = nor.array.slice();
  const amber = apxCol3('#D98F2E'), white = new THREE.Color(1,1,1), tmpC = new THREE.Color(); const skinCol = new Float32Array(pos.count*3);
  for (let i=0;i<pos.count;i++){ const x = base[i*3], y = base[i*3+1], z = base[i*3+2]; const front = apxSmooth(0.15, 0.9, z);
    const nz = 0.22*Kit.fbm(x*1.7+2, y*1.7, 0, 2); const sd = VENT.amplia(x, y) + nz + 0.35; const r = Math.hypot(x+1.4, y+0.9);
    let w = (1 - apxSmooth(-0.5, 0.15, sd))*front; w *= 0.3 + 0.62*Math.exp(-r*r/5.0); w *= 0.84 + 0.16*Math.sin(r*8 + 2.5*Kit.fbm(x*2.2, y*2.2, 1, 2));
    tmpC.copy(white).lerp(amber, clamp(w*0.8, 0, 0.8)); skinCol[i*3] = tmpC.r; skinCol[i*3+1] = tmpC.g; skinCol[i*3+2] = tmpC.b; }
  skinG.setAttribute('color', new THREE.BufferAttribute(skinCol, 3));
  const skinM = apxTex.mat({ tex:'skin', rep:[7,7], bump: low ? 0.006 : 0.009, color:0xffffff, rough:0.5, coat:0.42, coatRough:0.42, env:0.75, vc:true, sss:['#FF8A62', 0.3, 2.6] });
  const skin = apxDual(new THREE.Mesh(skinG, skinM), '#EFCDB5'); apxSombra(skin, true, true);
  add('piel', [skin], { pickable:false });

  /* punto de la piel (sin inflar) por rayo frontal */
  const rc = new THREE.Raycaster();
  function piel(x, y){ skin.updateMatrixWorld(); rc.set(new THREE.Vector3(x, y, 8), new THREE.Vector3(0,0,-1)); const hh = rc.intersectObject(skin, false)[0];
    if (!hh) return { p:new THREE.Vector3(x, y, apxTorsoZ(x, y)), n:new THREE.Vector3(0,0,1) };
    return { p:hh.point.clone(), n:hh.face ? hh.face.normal.clone() : new THREE.Vector3(0,0,1) }; }
  const inflW = (x, y, z) => apxSmooth(0.2, 1.2, z)*apxSmooth(-3.25, -2.3, y)*(1 - apxSmooth(1.5, 2.7, y))*Math.exp(-Math.pow(x/2.3, 4));
  /* datos de la pared para el neumoperitoneo */
  const wgt = new Float32Array(pos.count);
  for (let i=0;i<pos.count;i++) wgt[i] = inflW(base[i*3], base[i*3+1], base[i*3+2]);

  /* ---------- paño quirúrgico (dos ventanas: amplia y de fosa ilíaca derecha) ----------
     Malla derivada de la piel (misma rejilla), desplazada por la normal con arrugas de tela.
     Los triángulos dentro de la ventana se descartan y los vértices del borde se proyectan
     sobre la curva de la ventana para que el borde sea limpio. Ambas ventanas comparten
     los vértices; cada una tiene su propio índice. */
  const drapeM = apxTex.mat({ tex:'drape', rep:[9,9], bump: low ? 0.012 : 0.02, color:0xffffff, rough:0.95, coat:0, env:0.35, vc:true });
  const dB = base.slice(), dN = bn.slice(), dW = wgt.slice();
  const sdA = key => (x, y) => Math.max(VENT[key](x, y), (0.55 - apxTorsoZ(x, y))*1.3);
  const drapeSD = {}; ['amplia','fid'].forEach(key => { const sd = new Float32Array(pos.count); for (let i=0;i<pos.count;i++){ const x = base[i*3], y = base[i*3+1], z = base[i*3+2]; sd[i] = Math.max(VENT[key](x, y), (0.55 - z)*1.3); } drapeSD[key] = sd; });
  const proyectar = (i, sdf) => { let x = base[i*3], y = base[i*3+1]; for (let it=0; it<5; it++){ const v = sdf(x, y); if (Math.abs(v) < 0.002) break; const e = 0.01; const gx = (sdf(x+e, y)-sdf(x-e, y))/(2*e), gy = (sdf(x, y+e)-sdf(x, y-e))/(2*e); const gl = gx*gx + gy*gy || 1; x -= v*gx/gl; y -= v*gy/gl; }
    const sp = piel(x, y); dB[i*3] = sp.p.x; dB[i*3+1] = sp.p.y; dB[i*3+2] = sp.p.z; dN[i*3] = sp.n.x; dN[i*3+1] = sp.n.y; dN[i*3+2] = sp.n.z; dW[i] = inflW(sp.p.x, sp.p.y, sp.p.z); };
  const drapeIdx = key => { const I = [], sd = drapeSD[key], src = skinG.index.array, sdf = sdA(key), done = new Set(); for (let t=0;t<src.length;t+=3){ const a = src[t], b = src[t+1], c = src[t+2]; const ins = (sd[a] < 0) + (sd[b] < 0) + (sd[c] < 0); if (ins === 3) continue; I.push(a, b, c);
      if (ins){ [a, b, c].forEach(v => { if (sd[v] < 0 && !done.has(v)){ done.add(v); proyectar(v, sdf); } }); } } return I; };
  const drapeP = new Float32Array(pos.count*3), drapeC = new Float32Array(pos.count*3), drapeOff = new Float32Array(pos.count);
  const drapeG = {}; ['amplia','fid'].forEach(key => { const g = new THREE.BufferGeometry(); g.setIndex(drapeIdx(key)); drapeG[key] = g; });
  const drapePA = new THREE.BufferAttribute(drapeP, 3);
  for (let i=0;i<pos.count;i++){ const x = dB[i*3], y = dB[i*3+1], z = dB[i*3+2];
    const dE = Math.min(Math.max(drapeSD.amplia[i], 0), Math.max(drapeSD.fid[i], 0)); const flat = apxSmooth(0.05, 0.9, dE);
    const wr = (0.1*Kit.fbm(x*0.9+3, y*1.0, 0.5, 3) + 0.035*Kit.fbm(x*2.6, y*2.9, 2, 2) + 0.05*Math.sin(y*1.7 + 1.3*Kit.fbm(x*0.7, y*0.5, 4, 2)))*flat + 0.06*apxSmooth(-0.2, -1.2, z)*Math.sin(y*2.1 + x);
    drapeOff[i] = 0.012 + 0.06*apxSmooth(0, 0.7, dE) + wr;
    const k = 1 - 0.12*apxSmooth(0.4, 0.05, dE) - 0.2*clamp(-wr*5, 0, 1); drapeC[i*3] = k; drapeC[i*3+1] = k; drapeC[i*3+2] = k; }
  ['amplia','fid'].forEach(key => { const g = drapeG[key]; g.setAttribute('position', drapePA); g.setAttribute('uv', skinG.attributes.uv); g.setAttribute('color', new THREE.BufferAttribute(drapeC, 3)); });
  const drape = { amplia:new THREE.Mesh(drapeG.amplia, drapeM), fid:new THREE.Mesh(drapeG.fid, drapeM) };
  apxSombra([drape.amplia, drape.fid], true, true);
  /* tapas de los extremos: también cubiertas por el paño (el paciente sigue tapado por encima y por debajo) */
  const capM = apxTex.mat({ tex:'drape', rep:[4,4], bump:0.012, color:0xF2F2F2, rough:0.95, coat:0, env:0.35 });
  const capG = (y, up) => { const P = [], U = [], I = [], n = NU; P.push(0, y, 0); U.push(0.5, 0.5); const q = new THREE.Vector3();
    for (let i=0;i<=n;i++){ apxTorsoPt(thOf(i/n), y, q); const off = 0.05 + 0.03*Math.sin(i*0.9); P.push(q.x*(1+off/3), y + (up ? off : -off), q.z*(1+off/3)); U.push(0.5 + q.x*0.16, 0.5 + q.z*0.16); }
    for (let i=1;i<=n;i++){ if (up) I.push(0, i+1, i); else I.push(0, i, i+1); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P,3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(U,2)); g.setIndex(I); g.computeVertexNormals(); return g; };
  const tapas = apxDual(new THREE.Mesh(Kit.merge([capG(APX_Y1, true), capG(APX_Y0, false)]), capM), '#DCCFC4'); apxSombra(tapas, true, true);
  add('tapas', [tapas], { pickable:false });
  add('pano', [drape.amplia, drape.fid], { pickable:false, passThrough:true });
  [drape.amplia, drape.fid].forEach(m => apxDual(m, '#5E9A93', { vertexColors:true }));
  let ventana = 'amplia';
  function setVentana(v){ ventana = v; const vis = E.parts.get('pano').visible; drape.amplia.visible = vis && v === 'amplia'; drape.fid.visible = vis && v === 'fid'; E.invalidate(300); }
  /* pedestal (mesa) */
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.3, 0.18, low ? 36 : 64), mat(apxCol3(osc ? '#3A4658' : '#5B6778'), { roughness:0.35, metalness:0.2, clearcoat:0.6 }));
  ped.position.set(0, APX_Y0-0.1, -0.1); E.scene.add(ped); apxSombra(ped, false, true);

  let inflado = 0;
  function colocarPano(){ const A = 0.42*inflado; for (let i=0;i<pos.count;i++){ const o = drapeOff[i] + dW[i]*A; drapeP[i*3] = dB[i*3] + dN[i*3]*o; drapeP[i*3+1] = dB[i*3+1] + dN[i*3+1]*o; drapeP[i*3+2] = dB[i*3+2] + dN[i*3+2]*o; }
    drapePA.needsUpdate = true; drapeG.amplia.computeVertexNormals(); drapeG.fid.computeVertexNormals(); drapeG.amplia.computeBoundingSphere(); drapeG.fid.computeBoundingSphere(); }
  function inflar(k){ inflado = k; const A = 0.42*k; for (let i=0;i<pos.count;i++){ const w = wgt[i]*A; pos.array[i*3] = base[i*3] + bn[i*3]*w; pos.array[i*3+1] = base[i*3+1] + bn[i*3+1]*w; pos.array[i*3+2] = base[i*3+2] + bn[i*3+2]*w; }
    pos.needsUpdate = true; skinG.computeVertexNormals(); Kit.weldNormals(skinG); skinG.computeBoundingSphere(); skinG.computeBoundingBox(); colocarPano();
    pegados.forEach(o => o.upd()); }
  colocarPano();

  /* objetos pegados a la piel que suben con el neumoperitoneo */
  const pegados = [];
  /* punto de la piel con normal promediada en el entorno (evita que un objeto se incline en el ombligo o en un surco) */
  function pielSuave(x, y){ const c = piel(x, y); const n = c.n.clone(); [[0.3,0],[-0.3,0],[0,0.3],[0,-0.3]].forEach(([dx, dy]) => n.add(piel(x+dx, y+dy).n)); n.normalize(); return { p:c.p, n }; }
  function pegar(obj, x, y, lift){ const s = pielSuave(x, y); const w = inflW(s.p.x, s.p.y, s.p.z); const o = { upd(){ obj.position.copy(s.p).addScaledVector(s.n, (lift||0) + w*0.42*inflado); } };
    obj.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), s.n); o.upd(); pegados.push(o); return s; }

  /* ---------- órganos (visibles con «ver por dentro») ---------- */
  const serosa = (tex, tint, rep, extra) => apxTex.mat(Object.assign({ tex:tex || 'serosa', rep:rep || [6,2], bump: low ? 0.012 : 0.02, color:tint, rough:0.42, coat:0.85, coatRough:0.18, env:1.0, sss:['#FF7A5A', 0.28, 2.4] }, extra || {}));
  const inner = [];
  /* ciego: saco con tres tenias que convergen hacia la base del apéndice y haustras entre ellas */
  const dBc = new THREE.Vector3(0.4, -0.42, 0.34).normalize(), e1c = new THREE.Vector3(0,1,0).cross(dBc).normalize(), e2c = dBc.clone().cross(e1c);
  const cecG = Kit.sculpt({ radii:[0.74,0.8,0.64], w: low?36:64, h: low?26:46,
    disp:(p, d) => { const a = Math.atan2(d.dot(e2c), d.dot(e1c)), lat = Math.acos(clamp(d.dot(dBc), -1, 1)); const ten = Math.max(apxBanda(a, 0.4, 0.14), apxBanda(a, 0.4+2.094, 0.14), apxBanda(a, 0.4+4.189, 0.14))*apxSmooth(0.15, 0.5, lat)*(1 - apxSmooth(2.5, 3.0, lat));
      const haus = (1 - ten)*0.05*Math.max(0, Math.sin(lat*4.2 + 0.3))*(0.55 + 0.45*Math.cos(3*(a - 0.4) + Math.PI)); return 0.02*ten + haus + 0.012*Kit.fbm(p.x*3, p.y*3, p.z*3, 2); },
    color:(p, d, dz, out) => { const a = Math.atan2(d.dot(e2c), d.dot(e1c)), lat = Math.acos(clamp(d.dot(dBc), -1, 1)); const ten = Math.max(apxBanda(a, 0.4, 0.13), apxBanda(a, 0.4+2.094, 0.13), apxBanda(a, 0.4+4.189, 0.13))*apxSmooth(0.15, 0.5, lat)*(1 - apxSmooth(2.5, 3.0, lat)); const k = 1 + 0.35*ten; out[0] = k; out[1] = k*(1+0.1*ten); out[2] = k*(1+0.22*ten); } });
  const cec = apxDual(new THREE.Mesh(cecG, serosa('colon', 0xffffff, [3,2], { vc:true })), '#E9A28C');
  cec.position.set(-1.95, -0.78, 0.3); add('ciego', [cec], {}, ['Ciego', [-3.7,-0.2,1.2]], [-2.35,-0.75,0.8]);
  /* marco cólico: haustras (radio según ángulo y avance) y tenias claras */
  const colTubo = (pts, r0, n, seg) => apxTubo(pts, { seg: low ? Math.round(seg*0.6) : seg, rad: low ? 12 : 18,
    rfn:(u, a) => { const ten = Math.max(apxBanda(a, 0.3, 0.16), apxBanda(a, 0.3+2.094, 0.16), apxBanda(a, 0.3+4.189, 0.16)); const haus = Math.abs(Math.sin(u*Math.PI*n))*(0.5 + 0.5*Math.cos(3*(a-0.3) + Math.PI)); return r0*(0.84 + 0.17*haus*(1-ten) + 0.03*ten); },
    color:(u, a, out) => { const ten = Math.max(apxBanda(a, 0.3, 0.15), apxBanda(a, 0.3+2.094, 0.15), apxBanda(a, 0.3+4.189, 0.15)); const k = 1 + 0.45*ten; out[0] = k; out[1] = k*(1+0.1*ten); out[2] = k*(1+0.24*ten); } });
  const colG = [
    colTubo([[-2.0,-0.3,0.2],[-2.12,0.6,-0.05],[-2.02,1.9,0.0],[-1.8,2.38,0.3]], 0.5, 5, 40),
    colTubo([[-1.8,2.38,0.3],[-0.9,1.72,0.95],[0,1.32,1.12],[1.0,1.62,0.98],[1.92,2.48,0.4]], 0.44, 7, 52),
    colTubo([[1.95,2.5,0.3],[2.18,1.2,-0.1],[2.22,-0.4,-0.1],[2.02,-1.3,0.1]], 0.4, 5, 40),
    colTubo([[2.02,-1.3,0.1],[1.3,-2.05,0.62],[0.45,-1.85,0.7],[0.02,-2.5,0.3],[0,-3.05,-0.4]], 0.34, 4, 40)
  ];
  const colon = apxDual(new THREE.Mesh(Kit.merge(colG), serosa('colon', 0xffffff, [6,2], { vc:true })), '#EDB39F');
  add('colon', [colon], {}, ['Colon', [3.6,2.4,1.2]], [1.95,2.0,0.7]);
  const ile = apxDual(new THREE.Mesh(Kit.taper([[0.4,-1.0,0.35],[-0.4,-0.62,0.55],[-1.05,-0.42,0.52],[-1.42,-0.5,0.46]], 0.24, 0.25, { seg: low?16:28, rad: low?10:14 }), serosa('serosa', 0xF6E4DC, [4,1])), '#F2C3B3');
  add('ileon', [ile], {}, ['Íleon terminal', [1.2,0.3,1.7]], [-0.4,-0.62,0.8]);
  const apPts = [[-1.55,-1.18,0.62],[-1.3,-1.58,0.66],[-1.02,-1.95,0.52],[-0.84,-2.22,0.36]];
  const apM = serosa('apend', 0xffffff, [2,1], { bump: low ? 0.016 : 0.024, sss:['#FF6A4A', 0.32, 2.2] });
  const apG = apxTubo(apPts, { seg: low?16:28, rad: low?10:16, rfn:(u, a) => 0.135 + 0.03*Math.sin(u*Math.PI) - 0.05*Math.pow(u, 8) + 0.008*Math.sin(a*3 + u*14) });
  const tipG = new THREE.SphereGeometry(0.105, 14, 12); tipG.translate(-0.84,-2.22,0.36);
  const apx = apxDual(new THREE.Mesh(Kit.merge([apG, tipG]), apM), '#D9534F');
  add('apendice', [apx], {}, ['Apéndice (inflamado)', [-3.4,-2.6,1.4]], [-1.2,-1.75,0.8]);
  /* asas del intestino delgado, casi transparentes */
  const sb = []; for (let k=0;k<9;k++){ const t = k/8; sb.push([ (k%2 ? 1.2 : -0.8) + 0.25*Math.sin(k*1.7), 0.7 - 2.5*t, 0.15 + 0.25*Math.cos(k)]); }
  const del = apxDual(new THREE.Mesh(Kit.taper(sb, 0.24, 0.22, { seg: low?60:110, rad: low?8:12 }), apxTex.mat({ tex:'serosa', rep:[8,1], bump:0.01, color:0xF6D6CC, rough:0.42, coat:0.7, transparent:true, opacity:0.4, depthWrite:false })), '#F4CDC2', { transparent:true, opacity:0.4, depthWrite:false });
  add('delgado', [del], { pickable:false, passThrough:true }, ['Intestino delgado', [2.8,-0.4,1.6]], [0.9,-0.6,0.5]);
  /* pelvis ósea estilizada */
  const boneM = apxTex.mat({ tex:'bone', rep:[2,2], bump:0.01, color:0xF4EEE2, rough:0.55, coat:0.25 });
  const boneG = [];
  [-1, 1].forEach(sx => { const zA = apxTorsoZ(2.5, -1.2) - 0.22;
    const crest = [[2.5*sx,-1.2,zA],[2.86*sx,-0.55,zA-0.55],[2.98*sx,-0.3,-0.1],[2.72*sx,-0.4,-0.95],[1.95*sx,-0.95,-1.4]];
    boneG.push(Kit.taper(crest, 0.1, 0.12, { seg: low?16:28, rad: low?8:12 }));
    const cc = Kit.curve(crest), A = new THREE.Vector3(1.95*sx, -2.35, 0.05), tmp = new THREE.Vector3();
    boneG.push(apxGrid(low?14:24, low?5:8, (u, v, p) => { cc.getPointAt(u, tmp); const q = tmp.clone().lerp(A, v*0.86); q.z += 0.12*Math.sin(v*Math.PI); p.copy(q); }, sx > 0));
    boneG.push(Kit.taper([[1.95*sx,-2.35,0.3],[1.15*sx,-2.78,0.84],[0.14*sx,-3.0,0.95]], 0.13, 0.11, { seg: low?10:18, rad: low?8:12 }));
    const kb = new THREE.SphereGeometry(0.15, 14, 10); kb.translate(2.5*sx, -1.2, zA); boneG.push(kb);
  });
  boneG.forEach(g => { if (g.attributes.uv === undefined){ const n = g.attributes.position.count; g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n*2), 2)); } });
  const hueso = apxDual(new THREE.Mesh(Kit.merge(boneG), boneM), '#EFE6D2'); hueso.material.side = THREE.DoubleSide; hueso.userData.apxM.esq.side = THREE.DoubleSide;
  add('hueso', [hueso], {}, ['Pelvis (hueso coxal)', [-3.9,0.4,0.2]], [-2.9,-0.4,0.0]);
  const ligG = [-1, 1].map(sx => Kit.taper([[2.45*sx,-1.3,apxTorsoZ(2.45,-1.3)-0.12],[1.5*sx,-2.25,apxTorsoZ(1.5,-2.25)-0.14],[0.38*sx,-3.02,apxTorsoZ(0.38,-3.02)-0.12]], 0.035, 0.035, { seg:14, rad:6 }));
  const lig = apxDual(new THREE.Mesh(Kit.merge(ligG), apxTex.mat({ tex:'apon', rep:[1,6], bump:0.01, color:0xF8F3EA, rough:0.35, coat:0.7 })), '#F8F3EA');
  add('lig', [lig], {}, ['Ligamento inguinal', [3.8,-2.9,1.0]], [1.5,-2.25,1.6]);
  inner.push('ciego','colon','ileon','apendice','delgado','hueso','lig');

  /* ---------- referencias de superficie ---------- */
  const U = piel(0, 0), ED = piel(APX_T.eiasD[0], APX_T.eiasD[1]), EI = piel(APX_T.eiasI[0], APX_T.eiasI[1]), MC = piel(APX_T.mcb[0], APX_T.mcb[1]);
  E.addLabel('ombligo', 'Ombligo', [1.1, 0.75, U.p.z+0.4], U.p.clone());
  E.addLabel('eias-d', 'Espina ilíaca anterosup. derecha', [-3.6, -2.1, ED.p.z+0.5], ED.p.clone().addScaledVector(ED.n, 0.04));
  E.addLabel('eias-i', 'Espina ilíaca anterosup. izquierda', [3.6, -2.1, EI.p.z+0.5], EI.p.clone().addScaledVector(EI.n, 0.04));
  E.addLabel('lado-d', '← Derecha del paciente', [-2.9, 3.85, 0.6]);
  E.addLabel('lado-i', 'Izquierda del paciente →', [2.9, 3.85, 0.6]);

  const violeta = Kit.tissue({ color:apxCol3('#6C4FB0'), rough:0.5, coat:0.2 });
  /* marcador del clic del estudiante */
  const clicM = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 12), Kit.tissue({ color:apxCol3('#7A55D6'), rough:0.35, coat:0.8 }));
  const clicR = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.022, 8, 32), violeta); clicR.rotation.x = Math.PI/2;
  const clicG = new THREE.Group(); clicG.add(clicM, clicR);
  E.addPart('clic', [clicM, clicR], { pickable:false }); clicG.add(clicM, clicR); E.scene.add(clicG);
  E.addLabel('clic', 'Tu punto', [0,0,0]); E.setVisible('clic', false);
  /* respuesta: punto de McBurney y línea espino-umbilical dividida en tercios */
  const verde = new THREE.MeshBasicMaterial({ color:apxCol3('#2FB37A'), toneMapped:false });
  const mcbR = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 8, 40), verde); const mcbD = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), verde);
  const mcbG = new THREE.Group(); mcbG.add(mcbR, mcbD); mcbR.rotation.x = Math.PI/2; pegar(mcbG, APX_T.mcb[0], APX_T.mcb[1], 0.03);
  E.addPart('mcb', [mcbR, mcbD], { pickable:false }); mcbG.add(mcbR, mcbD); E.scene.add(mcbG);
  E.addLabel('mcb', 'Punto de McBurney', [-3.3, 0.9, MC.p.z+0.6], MC.p.clone().addScaledVector(MC.n, 0.05)); E.setVisible('mcb', false);
  const lineaPts = []; for (let i=0;i<=24;i++){ const t = i/24; const s = piel(APX_T.eiasD[0]*(1-t), APX_T.eiasD[1]*(1-t)); lineaPts.push(s.p.clone().addScaledVector(s.n, 0.03)); }
  const dash = []; for (let i=0;i<24;i+=2) dash.push(Kit.taper([lineaPts[i], lineaPts[i].clone().lerp(lineaPts[i+1], 0.5), lineaPts[i+1]], 0.018, 0.018, { seg:3, rad:6 }));
  [0, 8, 16, 24].forEach(i => { const g = new THREE.SphereGeometry(i === 8 ? 0.0 : 0.045, 10, 8); g.translate(lineaPts[i].x, lineaPts[i].y, lineaPts[i].z); dash.push(g); });
  dash.forEach(g => { if (!g.attributes.uv){ g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2), 2)); } });
  const linea = new THREE.Mesh(Kit.merge(dash), new THREE.MeshBasicMaterial({ color:apxCol3('#1F8A5C'), toneMapped:false }));
  add('linea', [linea], { pickable:false }, ['Tercios de la línea espino-umbilical', [-0.9, -2.5, MC.p.z+0.9]], lineaPts[16].clone());
  E.setVisible('linea', false);
  /* candidatos para elegir con el teclado */
  const CANDS = [['A', [-1.25,-0.6]], ['B', APX_T.mcb], ['C', [-1.55, 2.05]], ['D', [1.67,-0.8]]];
  const candMeshes = CANDS.map(([k, xy]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), Kit.tissue({ color:apxCol3('#2F6FD6'), rough:0.4, coat:0.7 })); const s = pegar(m, xy[0], xy[1], 0.05);
    E.addPart('cand-'+k, [m], { pickable:false }); E.addLabel('cand-'+k, k, [s.p.x, s.p.y+0.34, s.p.z+0.2], s.p.clone()); E.setVisible('cand-'+k, false); return m; });

  /* ---------- marcas de los abordajes (rotulador quirúrgico violeta) ---------- */
  function trazo(pts2, w){ const pts = pts2.map(q => { const s = piel(q[0], q[1]); return { s, w:inflW(s.p.x, s.p.y, s.p.z) }; });
    const mk = () => { const P = pts.map(o => o.s.p.clone().addScaledVector(o.s.n, 0.025 + o.w*0.42*inflado)); return Kit.taper(P, w, w, { seg: Math.max(6, pts.length*3), rad:6 }); };
    const m = new THREE.Mesh(mk(), violeta); return m; }
  const perp = (() => { const dx = APX_T.umb[0]-APX_T.eiasD[0], dy = APX_T.umb[1]-APX_T.eiasD[1], l = Math.hypot(dx, dy); return [-dy/l, dx/l]; })();
  const incM = []; for (let i=0;i<=8;i++){ const t = -0.42 + i/8*1.26; incM.push([APX_T.mcb[0] + perp[0]*t, APX_T.mcb[1] + perp[1]*t]); }
  const incR = []; for (let i=0;i<=8;i++){ const t = -0.62 + i/8*1.24; incR.push([APX_T.mcb[0] + t, APX_T.mcb[1] - 0.06*t*t]); }
  const incMcb = trazo(incM.reverse(), 0.03), incRd = trazo(incR, 0.03);
  add('inc-mcb', [incMcb], { pickable:false }, ['Incisión de McBurney', [-3.6, 0.5, 1.6]], piel(incM[2][0], incM[2][1]).p);
  add('inc-rd', [incRd], { pickable:false }, ['Incisión de Rocky-Davis', [-3.6, 0.5, 1.6]], piel(APX_T.mcb[0]-0.45, APX_T.mcb[1]).p);
  E.setVisible('inc-mcb', false); E.setVisible('inc-rd', false);
  const PORTS = [['Ombligo · cámara', [0, 0.03]], ['Sobre el pubis', [0.05, -2.85]], ['Fosa ilíaca izquierda', [1.75, -1.15]]];
  const portMs = [], trocMs = [], trocGs = [];
  const metalT = apxTex.mat({ tex:'metal', rep:[2,1], bump:0.004, color:0xE4E9EE, rough:0.24, metal:0.92, coat:0.25, env:1.4 });
  PORTS.forEach(([n, xy], i) => { const r = new THREE.Mesh(new THREE.TorusGeometry(i ? 0.09 : 0.13, 0.022, 8, 28), violeta); r.geometry.rotateX(Math.PI/2); pegar(r, xy[0], xy[1], 0.02); portMs.push(r);
    /* trócar: cánula metálica, cabezal con válvula y llave de gas */
    const tg = new THREE.Group(); const rr = i ? 0.075 : 0.105;
    const cuerpo = new THREE.Mesh(new THREE.CylinderGeometry(rr, rr*0.9, 0.62, 20), metalT); cuerpo.position.y = 0.3;
    const cabezal = new THREE.Mesh(new THREE.CylinderGeometry(rr*1.75, rr*1.55, 0.2, 22), mat(apxCol3('#2E3A48'), { roughness:0.45, clearcoat:0.5 })); cabezal.position.y = 0.66;
    const tapa = new THREE.Mesh(new THREE.CylinderGeometry(rr*1.55, rr*1.75, 0.06, 22), mat(apxCol3(i ? '#2F6FD6' : '#E0A526'), { roughness:0.35, clearcoat:0.6 })); tapa.position.y = 0.79;
    const llave = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.26, 10), metalT); llave.rotation.z = Math.PI/2; llave.position.set(rr*1.7 + 0.1, 0.66, 0);
    const parts = [cuerpo, cabezal, tapa, llave]; apxSombra(parts, true, false);
    parts.forEach(m => tg.add(m)); pegar(tg, xy[0], xy[1], 0.0); E.scene.add(tg); trocMs.push(...parts); trocGs.push([tg, ...parts]); });
  add('puertos', portMs, { pickable:false }, ['Puertos', [2.9, 0.9, 1.6]], piel(0.05, 0.03).p);
  E.addPart('trocares', trocMs, { pickable:true }); trocGs.forEach(([g, ...ms]) => ms.forEach(m => g.add(m))); E.addLabel('trocares', 'Trócares', [3.3, -1.4, 1.7], piel(1.75, -1.15).p.clone().add(new THREE.Vector3(0,0,0.4)));
  E.setVisible('puertos', false); E.setVisible('trocares', false);
  /* CO₂: partículas dentro del espacio creado */
  const nCO2 = low ? 40 : 90, co2P = new Float32Array(nCO2*3), co2S = [];
  const R = Kit.rng(66);
  for (let i=0;i<nCO2;i++){ const x = -1.9 + R()*3.8, y = -2.3 + R()*3.8; co2S.push({ x, y, ph:R()*6.28 }); }
  const co2G = new THREE.BufferGeometry(); co2G.setAttribute('position', new THREE.BufferAttribute(co2P, 3));
  const co2 = new THREE.Points(co2G, new THREE.PointsMaterial({ color:apxCol3('#8FC9E8'), size: 0.09, transparent:true, opacity:0.75, depthWrite:false }));
  E.addPart('co2', [co2], { pickable:false }); E.addLabel('co2', 'CO₂ (neumoperitoneo)', [-3.3, 1.9, 1.8], new THREE.Vector3(-0.8, 0.8, 1.6)); E.setVisible('co2', false);
  E.onFrame((t) => { if (!co2.visible) return; const q = apxQuieto(); for (let i=0;i<nCO2;i++){ const s = co2S[i]; const z0 = apxTorsoZ(s.x, s.y); const zz = z0 - 0.05 - (0.1 + 0.28*(0.5 + 0.5*Math.sin((q ? 0 : t*1.3) + s.ph)))*inflado*inflW(s.x, s.y, z0);
    co2P[i*3] = s.x; co2P[i*3+1] = s.y + (q ? 0 : 0.05*Math.sin(t + s.ph)); co2P[i*3+2] = zz; } co2G.attributes.position.needsUpdate = true; });
  /* los trazos se regeneran solo al terminar de inflar (sin geometría por cuadro) */
  function rehacerTrazos(){ [[incMcb, incM], [incRd, incR]].forEach(([m, p]) => { const g = trazo(p, 0.03).geometry; m.geometry.dispose(); m.geometry = g; }); }

  /* ---------- estado ---------- */
  let dentro = false, esq = false;
  function setInside(on){ dentro = on; E.setOpacity('piel', on ? 0.26 : 1); E.setOpacity('pano', on ? 0.08 : 1); E.setOpacity('tapas', on ? 0.3 : 1); inner.forEach(id => E.setVisible(id, on)); setVentana(ventana);
    /* la piel translúcida no debe proyectar sombra sobre los órganos */ [skin, drape.amplia, drape.fid, tapas].forEach(m => { m.castShadow = !on; }); }
  setInside(false);
  apxOnTap(E, ev => { if (!hooks.onSkin) return; const hit = apxRayAt(E, ev, [skin]); if (!hit) return; hooks.onSkin(hit.point.clone()); });

  const ctrl = {
    E, piel, MC,
    setInside, get inside(){ return dentro; },
    setEsq(on){ esq = on; apxSetEsq(meshes, on); E.select(E.selected); },
    marcar(p){ clicG.position.copy(p); const s = piel(p.x, p.y); clicG.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), s.n); clicG.visible = true; E.setVisible('clic', true);
      const l = E.labels.get('clic'); if (l){ l.pos.copy(p).add(new THREE.Vector3(p.x < 0 ? -0.9 : 0.9, 0.55, 0.4)); l.anchor = p.clone(); l.el.classList.add('has-lead'); } },
    respuesta(on){ E.setVisible('mcb', on); E.setVisible('linea', on); mcbG.visible = on; },
    candidatos(on){ CANDS.forEach(([k]) => E.setVisible('cand-'+k, on)); },
    CANDS,
    tecnica(t){ E.setVisible('inc-mcb', t === 'mcb'); E.setVisible('inc-rd', t === 'rd'); E.setVisible('puertos', t === 'lap'); E.setVisible('trocares', t === 'lap' && inflado > 0.5); setVentana(t === 'mcb' || t === 'rd' ? 'fid' : 'amplia');
      if (t !== 'lap' && inflado > 0){ ctrl.neumo(false); } },
    neumo(on, done){ const k0 = inflado, k1 = on ? 1 : 0; E.setVisible('co2', true); tw.run(1.6, k => inflar(k0 + (k1-k0)*k), () => { rehacerTrazos(); E.setVisible('co2', on); E.setVisible('trocares', on && E.parts.get('puertos').visible); done && done(); }); },
    get inflado(){ return inflado; },
    enfocar(id){ if (id === 'mcb'){ E.focus(MC.p.clone(), 7.5); } else E.resetView(); },
    dispose(){ tw.clear(); E.dispose(); }
  };
  return ctrl;
}

/* =====================================================================
   ESCENA 3D · PLANOS DE LA PARED ABDOMINAL (técnica abierta)
   Bloque circular de la pared en la fosa ilíaca derecha, capa por capa.
   Coordenadas de la placa: X hacia la línea media (el ombligo), Y hacia la
   cabeza. Grosores exagerados para que se lean todas las capas.
   Cada capa son dos mitades (a cada lado de la línea de apertura) que se
   deforman en el plano: se abren en forma de ojal, como con separadores.
   ===================================================================== */
const APX_CAPAS = [
  { id:'piel',       n:'Piel',                               t:0.16, ang:-64, gap:1.5,  ls:1.95, tex:'skin',   tint:0xF3D6C0, side:'#E9B9A3', esq:'#EFCDB5', rep:2.2, lift:0.14, rough:0.52, coat:0.35, bump:0.014 },
  { id:'subcutaneo', n:'Tejido subcutáneo',                  t:0.5,  ang:-64, gap:1.45, ls:1.85, tex:'fat',    tint:0xFFFFFF, side:'#F1CE7E', esq:'#F6D77E', rep:0.9, lift:0.16, rough:0.36, coat:0.95, bump:0.035 },
  { id:'apon',       n:'Aponeurosis del oblicuo externo',    t:0.08, ang:-50, gap:1.32, ls:1.75, tex:'apon',   tint:0xFFFFFF, side:'#EDE7DA', esq:'#F4F1EA', rep:0.8, lift:0.12, rough:0.25, coat:1.0,  bump:0.02, fib:-50 },
  { id:'oblint',     n:'Músculo oblicuo interno',            t:0.34, ang:22,  gap:1.22, ls:1.45, tex:'muscle', tint:0xFFFFFF, side:'#A9443D', esq:'#C8544B', rep:0.6, lift:0.12, rough:0.4,  coat:0.85, bump:0.025, fib:22 },
  { id:'transv',     n:'Músculo transverso del abdomen',     t:0.26, ang:8,   gap:1.12, ls:1.35, tex:'muscle', tint:0xEFDCDC, side:'#9A3D37', esq:'#B04A43', rep:0.6, lift:0.1,  rough:0.4,  coat:0.85, bump:0.025, fib:8 },
  { id:'peritoneo',  n:'Fascia transversal y peritoneo',     t:0.06, ang:8,   gap:1.02, ls:1.15, tex:'perit',  tint:0xF3E9EE, side:'#D9C3CD', esq:'#CFE3EA', rep:1,   lift:0.1,  rough:0.15, coat:1.0,  bump:0.008 }
];
/* instrumental metálico estilizado (v2.0) */
const apxMetal = (extra) => apxTex.mat(Object.assign({ tex:'metal', rep:[3,1], bump:0.003, color:0xF6F8FA, rough:0.2, metal:0.88, coat:0.4, coatRough:0.12, env:2.2 }, extra || {}));
/* separador de Farabeuf: lámina en L (mango horizontal, valva vertical de longitud 1 que se escala) */
function apxFarabeuf(material){ const g = new THREE.Group(); const w = 0.62, th = 0.05;
  /* lámina con cantos biselados (atrapa los reflejos), en dos tramos: mango inclinado y valva vertical */
  const lamina = (L, W) => { const sh = new THREE.Shape(); const r = 0.12; sh.moveTo(r, 0); sh.lineTo(L - r, 0); sh.quadraticCurveTo(L, 0, L, r); sh.lineTo(L, W - r); sh.quadraticCurveTo(L, W, L - r, W); sh.lineTo(r, W); sh.quadraticCurveTo(0, W, 0, W - r); sh.lineTo(0, r); sh.quadraticCurveTo(0, 0, r, 0);
    const gg = new THREE.ExtrudeGeometry(sh, { depth:th, bevelEnabled:true, bevelThickness:0.014, bevelSize:0.014, bevelSegments:2, curveSegments:4 }); gg.translate(0, -W/2, -th/2); return gg; };
  const tilt = 0.55, ml = 2.6;
  const mango = new THREE.Mesh(lamina(ml, w), material); mango.rotation.set(Math.PI/2, 0, tilt, 'ZYX');
  const codo = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, w, 12), material); codo.rotation.x = Math.PI/2; codo.position.set(0, -0.05, 0);
  const valva = new THREE.Mesh(lamina(1, w*0.92), material); valva.rotation.set(Math.PI/2, 0, -Math.PI/2, 'ZYX');
  const punta = new THREE.Mesh(new THREE.BoxGeometry(0.16, th, w*0.9), material); punta.position.set(0.08, -1, 0);
  const valvaG = new THREE.Group(); valvaG.add(valva, punta); valvaG.position.y = -0.05;
  g.add(mango, codo, valvaG); g.userData.valva = valvaG; apxSombra([mango, codo, valva, punta], true, false); return { g, meshes:[mango, codo, valva, punta] }; }
/* pinza hemostática (Kelly) o de Babcock: dos ramas que se cruzan, mandíbulas finas y anillos */
function apxPinza(material, o={}){ const g = new THREE.Group(); const L = o.L ?? 3.4, r = o.r ?? 0.045; const ms = [];
  [1, -1].forEach(sg => { const rama = new THREE.Mesh(Kit.taper([[0,0,0],[0.05*sg,L*0.32,0],[-0.12*sg,L*0.62,0],[-0.22*sg,L,0]], r, r*1.1, { seg:10, rad:8 }), material); ms.push(rama);
    const anillo = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.035, 8, 20), material); anillo.position.set(-0.33*sg, L + 0.15, 0); ms.push(anillo);
    if (!o.babcock){ const mand = new THREE.Mesh(Kit.taper([[0,0,0],[0.02*sg,-0.32,0],[0.0,-0.62,0]], r*0.9, r*0.45, { seg:6, rad:8 }), material); ms.push(mand); }
    else { const mand = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 8, 16, Math.PI), material); mand.rotation.set(0, Math.PI/2, 0); mand.position.set(sg*0.08, -0.34, 0); mand.scale.set(1, 1.7, 1); ms.push(mand); } });
  const eje = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 10), material); eje.rotation.x = Math.PI/2; eje.position.y = L*0.48; ms.push(eje);
  ms.forEach(m => { g.add(m); if (!m.geometry.attributes.uv) m.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(m.geometry.attributes.position.count*2), 2)); }); apxSombra(ms, true, false); return { g, meshes:ms }; }
/* ligadura anudada alrededor de una curva: lazo, nudo y dos cabos cortos */
function apxLigadura(curve, u, r, material){ const p = curve.getPointAt(u), t = curve.getTangentAt(u).normalize(); const g = new THREE.Group(); g.position.copy(p); g.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), t);
  const lazo = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 8, 30), material); const nudo = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 10), material); nudo.position.set(0, r+0.02, 0); nudo.scale.set(1.3, 0.9, 1.1);
  const cabo1 = new THREE.Mesh(Kit.taper([[0, r+0.05, 0],[0.18, r+0.22, 0.08],[0.3, r+0.3, 0.2]], 0.03, 0.03, { seg:6, rad:6 }), material), cabo2 = new THREE.Mesh(Kit.taper([[0, r+0.05, 0],[-0.16, r+0.24, -0.06],[-0.26, r+0.34, -0.16]], 0.03, 0.03, { seg:6, rad:6 }), material);
  const ms = [lazo, nudo, cabo1, cabo2]; ms.forEach(m => { g.add(m); if (!m.geometry.attributes.uv) m.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(m.geometry.attributes.position.count*2), 2)); });
  /* se devuelve con la transformación horneada en cada malla (coordenadas del mundo), para registrarlas como parte */
  g.updateMatrixWorld(true); ms.forEach(m => { m.updateMatrixWorld(true); const M = m.matrixWorld.clone(); g.remove(m); M.decompose(m.position, m.quaternion, m.scale); }); return { g, meshes:ms }; }
function apxEscenaPlanos(stage, hooks){
  const osc = apxOscuro();
  const E = new Engine3D(stage, {
    radius:10.5, phi:0.98, theta:0.42, minR:3.5, maxR:18, target:[0.2,-0.9,0], floor:-3.6, floorSize:9, dark:osc, exposure:1.0,
    onSelect:(id) => { if (id && hooks.onInfo) hooks.onInfo(id); E.select(id && APX_INFO[id] ? id : null); },
    aria:'Modelo 3D realista de un bloque circular de la pared abdominal de la fosa ilíaca derecha, con sus capas apiladas: piel, tejido subcutáneo (grasa amarilla), aponeurosis nacarada del oblicuo externo, músculo oblicuo interno, músculo transverso y peritoneo translúcido. Debajo asoma el ciego con sus tenias. Cada capa se abre en forma de ojal y sus bordes se levantan, sostenidos por separadores metálicos, cuando eliges el plano correcto. Usa los botones del panel para hacerlo con el teclado.'
  });
  stage._apxE = E; apxFrame(E, 1.1);
  const low = E.low, tw = apxTweens(E), meshes = [];
  apxFondo(E, osc, ['#EEF0F2','#1A2332'], ['#D9DEE3','#0E1522']);
  apxLampara(E, [2.5, 9.5, 5.5], [0.2, -1, 0], { int: osc ? 1.15 : 1.0, angle:0.55, far:30, radius:4 });
  const R = 2.6, N = low ? 36 : 60, M = low ? 10 : 16, DOME = 0.035;
  let top = 0; const capas = {};
  const toW = (X, Y, z) => new THREE.Vector3(X, z - DOME*(X*X + Y*Y), -Y);
  const metal = apxMetal();
  APX_CAPAS.forEach((C, li) => {
    const a = C.ang*Math.PI/180, d = [Math.cos(a), Math.sin(a)], zt = top, zb = top - C.t;
    const fa = (C.fib !== undefined ? C.fib : C.ang)*Math.PI/180, f = [Math.cos(fa), Math.sin(fa)];
    const memb = C.tex === 'perit';
    /* material de las caras (con textura orientada a las fibras) y de los bordes de corte */
    const capM = apxTex.mat({ tex:C.tex, rep:[1,1], bump: low ? C.bump*0.7 : C.bump, color:C.tint, rough:C.rough, coat:C.coat, coatRough: memb ? 0.08 : 0.2, env: memb ? 1.4 : 1.0, side:THREE.DoubleSide,
      transparent: memb, opacity: memb ? 0.62 : 1, depthWrite: !memb, sss: memb ? null : ['#FF7A5A', C.tex === 'skin' ? 0.22 : C.tex === 'apon' ? 0.12 : 0.3, 2.4] });
    const sideM = memb ? capM : apxTex.mat({ tex: C.tex === 'skin' ? 'fat' : C.tex, rep:[3,0.6], bump: C.tex === 'skin' ? 0.02 : C.bump, color: C.tex === 'skin' ? 0xF7D9A6 : C.tint, rough: C.rough + 0.08, coat: C.coat*0.8, side:THREE.DoubleSide, sss:['#FF7A5A', 0.3, 2.4] });
    const halves = [1, -1].map(sg => {
      const n = [-d[1]*sg, d[0]*sg];
      const nC = (N+1)*(M+1), nW = (N+1)*2;
      const capP = new Float32Array(nC*2*3), capU = new Float32Array(nC*2*2), wallP = new Float32Array(nW*2*3), wallU = new Float32Array(nW*2*2);
      const S = i => -R + 2*R*i/N, TM = s => Math.sqrt(Math.max(0, R*R - s*s));
      /* UV: a lo largo de las fibras (la textura de músculo y de aponeurosis tiene las fibras en u) */
      for (let i=0;i<=N;i++) for (let j=0;j<=M;j++){ const s = S(i), t = TM(s)*j/M; const X = s*d[0] + t*n[0], Y = s*d[1] + t*n[1];
        const u = (X*f[0] + Y*f[1])*C.rep, v = (-X*f[1] + Y*f[0])*C.rep, k = i*(M+1)+j; capU[k*2] = u; capU[k*2+1] = v; capU[(nC+k)*2] = u; capU[(nC+k)*2+1] = v; }
      for (let i=0;i<=N;i++){ for (let w=0; w<2; w++){ const k = (w*(N+1) + i)*2; wallU[k*2] = i/N*3; wallU[k*2+1] = 0; wallU[(k+1)*2] = i/N*3; wallU[(k+1)*2+1] = 0.6; } }
      const idxC = [], idxW = [];
      for (let i=0;i<N;i++) for (let j=0;j<M;j++){ const a0 = i*(M+1)+j, b0 = a0+M+1; idxC.push(a0, b0, a0+1, a0+1, b0, b0+1); idxC.push(nC+a0, nC+a0+1, nC+b0, nC+a0+1, nC+b0+1, nC+b0); }
      for (let w=0; w<2; w++) for (let i=0;i<N;i++){ const k0 = (w*(N+1)+i)*2, k1 = k0+2; idxW.push(k0, k1, k0+1, k0+1, k1, k1+1); }
      const gC = new THREE.BufferGeometry(), gW = new THREE.BufferGeometry();
      gC.setAttribute('position', new THREE.BufferAttribute(capP, 3)); gC.setAttribute('uv', new THREE.BufferAttribute(capU, 2)); gC.setIndex(idxC);
      gW.setAttribute('position', new THREE.BufferAttribute(wallP, 3)); gW.setAttribute('uv', new THREE.BufferAttribute(wallU, 2)); gW.setIndex(idxW);
      const env = s => Math.sqrt(Math.max(0, 1 - (s/C.ls)*(s/C.ls)));
      /* apertura: las mitades se separan en el plano (ojal) y el borde de corte se levanta y se curva hacia fuera (retraído por el separador) */
      function place(kk){
        const lift = kk*C.lift;
        for (let i=0;i<=N;i++){ const s = S(i), tm = TM(s), e = env(s);
          for (let j=0;j<=M;j++){ const t = tm*j/M; const q = tm > 1e-6 ? t/tm : 1; const near = Math.pow(Math.max(0, 1 - q), 1.6); const del = kk*C.gap*0.5*e*near; const zl = lift*e*Math.pow(Math.max(0, 1 - q), 2.4);
            const X = s*d[0] + (t+del)*n[0], Y = s*d[1] + (t+del)*n[1], k = i*(M+1)+j;
            const p1 = toW(X, Y, zt + zl), p2 = toW(X, Y, zb + zl*0.8); capP.set([p1.x,p1.y,p1.z], k*3); capP.set([p2.x,p2.y,p2.z], (nC+k)*3); }
          /* pared exterior (t = tm) y pared de corte (t = 0) */
          [[tm, 0, 0], [0, kk*C.gap*0.5*e, lift*e]].forEach(([t, del, zl], w) => { const X = s*d[0] + (t+del)*n[0], Y = s*d[1] + (t+del)*n[1];
            const p1 = toW(X, Y, zt + zl), p2 = toW(X, Y, zb + zl*0.8), k = (w*(N+1)+i)*2; wallP.set([p1.x,p1.y,p1.z], k*3); wallP.set([p2.x,p2.y,p2.z], (k+1)*3); }); }
        gC.attributes.position.needsUpdate = true; gW.attributes.position.needsUpdate = true; gC.computeVertexNormals(); gW.computeVertexNormals(); gC.computeBoundingSphere(); gW.computeBoundingSphere();
      }
      place(0);
      /* orientación: la tapa superior mira hacia arriba; si no, se invierten los triángulos */
      const fix = (g, want) => { const nn = g.attributes.normal, P = g.attributes.position; const i0 = g.index.array[0]; const got = want(i0, nn, P); if (got < 0){ const a = g.index.array; for (let q=0;q<a.length;q+=3){ const tmp = a[q+1]; a[q+1] = a[q+2]; a[q+2] = tmp; } g.index.needsUpdate = true; g.computeVertexNormals(); } };
      fix(gC, (i, nn) => nn.getY(i));
      fix(gW, (i, nn, P) => nn.getX(i)*P.getX(i) + nn.getZ(i)*P.getZ(i));
      const mc = apxDual(new THREE.Mesh(gC, capM), C.esq, memb ? { transparent:true, opacity:0.62, depthWrite:false, side:THREE.DoubleSide } : { side:THREE.DoubleSide });
      const mw = apxDual(new THREE.Mesh(gW, sideM), C.side, memb ? { transparent:true, opacity:0.62, depthWrite:false, side:THREE.DoubleSide } : { side:THREE.DoubleSide });
      if (memb){ mc.renderOrder = 2; mw.renderOrder = 2; } else apxSombra([mc, mw], true, true);
      return { mc, mw, place };
    });
    const list = []; halves.forEach(hv => list.push(hv.mc, hv.mw)); list.forEach(m => meshes.push(m));
    E.addPart(C.id, list, { passThrough: memb });
    const anc = toW(R*0.74, -R*0.67, (zt+zb)/2);
    E.addLabel(C.id, C.n, [anc.x + 2.0, anc.y + 0.1, anc.z + 0.9], anc);
    capas[C.id] = { C, halves, k:0, zt, zb };
    top = zb - 0.012;
  });
  const fondo = top;
  /* debajo: el ciego con sus tenias y haustras, visto a través del ojal */
  const ax = new THREE.Vector3(1, 0.25, 0.35).normalize(), e1 = new THREE.Vector3(0,1,0).cross(ax).normalize(), e2 = ax.clone().cross(e1);
  const tenF = (d, w) => { const a = Math.atan2(d.dot(e2), d.dot(e1)); return Math.max(apxBanda(a, 1.2, w), apxBanda(a, 1.2+2.094, w), apxBanda(a, 1.2+4.189, w)); };
  const cecG = Kit.sculpt({ radii:[2.3,1.15,1.8], w: low?40:64, h: low?28:48,
    disp:(p, d) => { const ten = tenF(d, 0.1); const lat = Math.acos(clamp(d.dot(ax), -1, 1)); const a = Math.atan2(d.dot(e2), d.dot(e1)); const haus = (1-ten)*0.09*Math.max(0, Math.sin(lat*4 + 0.4))*(0.5 + 0.5*Math.cos(3*(a-1.2) + Math.PI)); return 0.03*ten + haus + 0.02*Kit.fbm(p.x*1.6, p.y*1.6, p.z*1.6, 2); },
    color:(p, d, dz, out) => { const ten = tenF(d, 0.09); const k = 1 + 0.32*ten; out[0] = k; out[1] = k*(1+0.08*ten); out[2] = k*(1+0.2*ten); } });
  const cecM = apxTex.mat({ tex:'colon', rep:[3,2], bump: low ? 0.012 : 0.02, color:0xffffff, rough:0.4, coat:0.9, coatRough:0.16, env:1.0, vc:true, sss:['#FF7A5A', 0.28, 2.4] });
  const cec = apxDual(new THREE.Mesh(cecG, cecM), '#E9A28C'); apxSombra(cec, false, true);
  cec.position.set(0.1, fondo - 1.45, 0.15); cec.userData.sub = 'ciego';
  /* vasos finos sobre la serosa (rama de la ileocólica) */
  const vasM = Kit.tissue({ color:apxCol3('#B93B36'), rough:0.4, coat:0.7 });
  const vasG = [Kit.taper([[-2.1, fondo-0.9, -0.6],[-1.2, fondo-0.42, -0.2],[-0.3, fondo-0.3, 0.5],[0.7, fondo-0.45, 1.1]], 0.045, 0.03, { seg: low?12:22, rad:7 }), Kit.taper([[-1.2, fondo-0.42, -0.2],[-0.9, fondo-0.35, 0.6],[-0.4, fondo-0.5, 1.2]], 0.03, 0.02, { seg: low?8:14, rad:6 })];
  vasG.forEach(g => { if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2), 2)); });
  const vas = apxDual(new THREE.Mesh(Kit.merge(vasG), vasM), '#C8443E');
  E.addPart('ciego', [cec, vas], {}); E.addLabel('ciego', 'Ciego (bajo el peritoneo)', [-3.4, fondo-1.2, 1.6], new THREE.Vector3(-0.6, fondo-0.45, 0.6));
  meshes.push(cec, vas);
  /* orientación */
  E.addLabel('o-cab', '↑ Hacia la cabeza', [0, 0.5, -R-0.7]);
  E.addLabel('o-med', 'Hacia el ombligo →', [R+0.9, 0.3, -0.4]);

  /* ---------- instrumental: dos separadores de Farabeuf y una pinza de Kelly ---------- */
  const a0 = APX_CAPAS[0].ang*Math.PI/180, n0 = [-Math.sin(a0), Math.cos(a0)];
  const seps = [1, -1].map(sg => { const F = apxFarabeuf(metal); E.scene.add(F.g); F.g.visible = false; F.sg = sg; F.meshes.forEach(m => meshes.push(m)); return F; });
  E.addPart('separadores', seps.flatMap(F => F.meshes), { pickable:false }); seps.forEach(F => F.meshes.forEach(m => F.g.add(m)));
  const kelly = apxPinza(metal, { L:3.2 }); E.scene.add(kelly.g); kelly.g.visible = false; kelly.meshes.forEach(m => meshes.push(m));
  E.addPart('pinza-k', kelly.meshes, { pickable:false }); kelly.meshes.forEach(m => kelly.g.add(m));
  function colocarInstr(){
    const kp = capas.piel.k; let prof = 0; APX_CAPAS.forEach(C => { const c = capas[C.id]; if (c.k > 0.05) prof = Math.max(prof, -c.zb*c.k); });
    seps.forEach(F => { const on = kp > 0.03; F.g.visible = on; if (!on) return; const off = kp*APX_CAPAS[0].gap*0.5 + 0.04 + 0.35*(1-kp);
      const X = n0[0]*off*F.sg, Y = n0[1]*off*F.sg; const w = toW(X, Y, 0.02 + APX_CAPAS[0].lift*kp);
      F.g.position.copy(w); F.g.rotation.set(0, Math.atan2(-(-n0[1]*F.sg), n0[0]*F.sg), 0.06); F.g.userData.valva.scale.y = Math.max(0.15, prof + 0.05); });
    const kper = capas.peritoneo.k; const on = kper > 0.05; kelly.g.visible = on;
    if (on){ const C = APX_CAPAS[5], a = C.ang*Math.PI/180, n = [-Math.sin(a), Math.cos(a)]; const off = kper*C.gap*0.5 + 0.02; const w = toW(-n[0]*off + 0.3*Math.cos(a), -n[1]*off + 0.3*Math.sin(a), capas.peritoneo.zt + 0.08);
      kelly.g.position.copy(w); kelly.g.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), new THREE.Vector3(-n[0]*0.55 - 0.15, 0.85, n[1]*0.55).normalize()); kelly.g.scale.setScalar(0.85); }
    E.invalidate(200);
  }
  colocarInstr();
  /* línea de sutura (cierre) en la piel */
  const sutM = Kit.tissue({ color:apxCol3('#6C4FB0'), rough:0.45, coat:0.3 });
  const sutG = [];
  for (let i=-5;i<=5;i++){ const s = i*0.32; const X = s*Math.cos(a0), Y = s*Math.sin(a0); const nx = -Math.sin(a0), ny = Math.cos(a0);
    const pA = toW(X - nx*0.16, Y - ny*0.16, 0.012), pB = toW(X + nx*0.16, Y + ny*0.16, 0.012); sutG.push(Kit.taper([pA, pA.clone().lerp(pB, 0.5).add(new THREE.Vector3(0, 0.035, 0)), pB], 0.018, 0.018, { seg:4, rad:5 })); }
  const sut = new THREE.Mesh(Kit.merge(sutG), sutM); E.addPart('cierre', [sut], { pickable:false }); E.setVisible('cierre', false);

  let esq = false;
  const ctrl = {
    E,
    abrir(id, done){ const c = capas[id]; if (!c) return done && done(); const k0 = c.k; tw.run(1.0, k => { c.k = k0 + (1-k0)*k; c.halves.forEach(hv => hv.place(c.k)); colocarInstr(); }, done); },
    cerrarTodo(done){ const ids = APX_CAPAS.map(c => c.id).reverse(); let i = 0;
      const next = () => { if (i >= ids.length){ E.setVisible('cierre', true); done && done(); return; } const c = capas[ids[i++]]; const k0 = c.k; tw.run(0.55, k => { c.k = k0*(1-k); c.halves.forEach(hv => hv.place(c.k)); colocarInstr(); }, next); };
      next(); },
    reiniciar(){ tw.clear(); Object.values(capas).forEach(c => { c.k = 0; c.halves.forEach(hv => hv.place(0)); }); colocarInstr(); E.setVisible('cierre', false); E.select(null); },
    resaltar(id){ E.select(id); },
    setEsq(on){ esq = on; apxSetEsq(meshes, on); E.select(E.selected); },
    dispose(){ tw.clear(); E.dispose(); }
  };
  return ctrl;
}

/* =====================================================================
   ESCENA 3D · CAMPO QUIRÚRGICO: CIEGO, TENIAS, APÉNDICE Y MESOAPÉNDICE
   Coordenadas (1 u = 2 cm): x hacia la línea media, y hacia la cabeza,
   z hacia delante (hacia quien opera). Técnica 'abierta' o 'lap'.
   Sin sangre: capas limpias, ligaduras violetas y clips metálicos.
   ===================================================================== */
function apxEscenaCampo(stage, tec, hooks){
  const osc = apxOscuro(), lap = tec === 'lap';
  const E = new Engine3D(stage, {
    radius: lap ? 24 : 17, phi: lap ? 1.1 : 1.2, theta: lap ? 0.8 : 0.45, minR:4, maxR:34, target: lap ? [1.6,-0.4,1.6] : [0.7,-0.9,0.9], floor: lap ? -8.2 : -6.6, floorSize: lap ? 20 : 15, dark:osc, exposure:1.0,
    onSelect:(id) => { if (id && hooks.onInfo) hooks.onInfo(id); E.select(id && APX_INFO[id] ? id : null); },
    aria: lap ? 'Modelo 3D realista de una apendicectomía laparoscópica: la pared abdominal levantada por el gas, tres trócares con una cámara y dos instrumentos largos que llegan al ciego y al apéndice inflamado. A la izquierda, un monitor muestra lo que ve la cámara, con la iluminación de la óptica. Sin sangre. Las acciones se eligen con los botones del panel.'
      : 'Modelo 3D realista de una apendicectomía abierta: la incisión como una ventana en la piel, con los bordes protegidos por compresas y dos separadores de Farabeuf; dentro, el ciego con sus tenias y haustras, el íleon terminal, el apéndice inflamado sostenido por una pinza de Babcock, el mesoapéndice con la arteria apendicular y el epiplón. Sin sangre. Las acciones se eligen con los botones del panel.'
  });
  stage._apxE = E; apxFrame(E, lap ? 1.45 : 1.15);
  const low = E.low, tw = apxTweens(E), meshes = [];
  const fondoM = apxFondo(E, osc, ['#EEF0F2','#1C2230'], ['#D8DDE2','#0F1420']);
  /* lámpara de quirófano sobre el campo (sombras suaves de instrumentos y bordes) */
  const lamp = apxLampara(E, lap ? [4, 16, 18] : [3, 12, 16], lap ? [1.5, -1, 1] : [0.6, -1.2, 1.5], { int: osc ? 1.2 : 1.05, angle:0.5, far:60, radius:4 });
  /* pared posterior del abdomen (retroperitoneo), telón del campo */
  const post = new THREE.Mesh(apxGrid(low?20:32, low?20:32, (u, v, p) => { const x = -9 + 21*u, y = -9.5 + 18*v; p.set(x, y, -2.5 - 0.035*((x-1)*(x-1) + (y+1)*(y+1)) + 0.12*Math.sin(x*0.9)*Math.cos(y*0.7)); }),
    apxTex.mat({ tex:'perit', rep:[5,5], bump:0.015, color: osc ? 0xB0908A : 0xE9D2C8, rough:0.5, coat:0.6, coatRough:0.3, env:0.7 }));
  apxDual(post, osc ? '#6E5552' : '#EBD3CA'); meshes.push(post); apxSombra(post, false, true); E.addPart('fondo', [post], { pickable:false });
  const anat = new THREE.Group(); E.scene.add(anat);
  const hinge = new THREE.Group(); anat.add(hinge);
  const segs = { onLbl:[] };
  /* registra una parte y la cuelga de un grupo; la etiqueta la sigue */
  function add(id, list, grp, extra, lbl, anchor){
    list.forEach(m => meshes.push(m)); E.addPart(id, list, extra || {});
    if (grp){ grp.updateMatrixWorld(true); list.forEach(m => { const p = m.position.clone(); grp.worldToLocal(p); m.position.copy(p); grp.add(m); }); }
    if (lbl){ E.addLabel(id, lbl[0], lbl[1], anchor); if (grp){ const l = E.labels.get(id); const lp = grp.worldToLocal(l.pos.clone()); const la = l.anchor ? grp.worldToLocal(l.anchor.clone()) : null; segs.onLbl.push({ l, lp, la, grp }); } }
  }
  E.onFrame(() => { segs.onLbl.forEach(o => { o.grp.updateMatrixWorld(true); o.l.pos.copy(o.lp).applyMatrix4(o.grp.matrixWorld); if (o.la && o.l.anchor) o.l.anchor.copy(o.la).applyMatrix4(o.grp.matrixWorld); }); });
  const serosa = (tex, tint, rep, extra) => apxTex.mat(Object.assign({ tex:tex || 'serosa', rep:rep || [6,2], bump: low ? 0.014 : 0.024, color:tint === undefined ? 0xffffff : tint, rough:0.4, coat:0.9, coatRough:0.16, env:1.05, sss:['#FF7A5A', 0.3, 2.4] }, extra || {}));
  const Rn = Kit.rng(1994);
  const sombraT = m => apxSombra(m, true, true);

  /* ---------- ciego y colon ascendente (haustras entre las tenias) ---------- */
  const C0 = new THREE.Vector3(0, -0.4, 0);
  const PHIS = [0, 2.25, -2.25];
  const cec = apxDual(new THREE.Mesh(Kit.sculpt({ radii:[1.55,1.72,1.35], w: low?40:64, h: low?28:48,
    disp:(p, d) => { const a = Math.atan2(d.x, d.z); const ten = Math.max(...PHIS.map(ph => apxBanda(a, ph, 0.2))); const haus = (1 - ten)*0.1*Math.max(0, Math.sin(p.y*3.2 + 0.9))*(1 - Math.abs(d.y)*0.6); return haus + 0.02*Kit.fbm(p.x*2, p.y*2, p.z*2, 2); } }), serosa('colon', 0xffffff, [4,3])), '#E9A28C');
  cec.position.copy(C0); sombraT(cec);
  const ascPts = [[-0.2,0.6,-0.05],[-0.35,2.8,-0.25],[-0.45,5.2,-0.45],[-0.5,6.6,-0.6]];
  const ascC = Kit.curve(ascPts); const fr = ascC.computeFrenetFrames(8, false); const Nf = fr.normals[4], Bf = fr.binormals[4];
  const angDe = ph => { const dir = new THREE.Vector3(Math.sin(ph), 0, Math.cos(ph)); return Math.atan2(dir.dot(Bf), dir.dot(Nf)); };
  const ANGS = PHIS.map(angDe);
  const asc = apxDual(new THREE.Mesh(apxTubo(ascPts, { seg: low?26:44, rad: low?16:24, rfn:(u, a) => { const ten = Math.max(...ANGS.map(t => apxBanda(a, t, 0.2))); const haus = Math.abs(Math.sin(u*Math.PI*3.4 + 0.4)); return 1.28*(0.86 + 0.16*haus*(1 - ten) + 0.02*ten); } }), serosa('colon', 0xffffff, [6,3])), '#EDB39F');
  sombraT(asc);
  const ascCap = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), Kit.tissue({ color:apxCol3(osc ? '#6B3B3B' : '#C98A80'), rough:0.8 }));
  ascCap.position.set(-0.5, 6.6, -0.6); ascCap.rotation.x = -Math.PI/2 + 0.08;
  add('ciego', [cec], anat, {}, ['Ciego', [-3.9,-2.2,1.8]], new THREE.Vector3(-1.2,-1.2,0.9));
  add('colon', [asc, ascCap], anat, {}, ['Colon ascendente', [-3.9,4.4,0.9]], new THREE.Vector3(-1.4,4.0,0.6));
  /* apéndices epiploicos (identificación del colon) */
  const fatM = apxTex.mat({ tex:'fat', rep:[1,1], bump: low ? 0.02 : 0.035, rough:0.34, coat:0.95, coatRough:0.15, sss:['#FFB060', 0.22, 2.6] });
  const epG = []; [[0.9,3.2,0.9],[-1.5,4.6,0.6],[1.0,5.6,0.4]].forEach((p, i) => { const g = Kit.sculpt({ radii:[0.28,0.4,0.24], w:14, h:12, disp:(q, d) => 0.04*Kit.fbm(q.x*6+i, q.y*6, q.z*6, 2) }); g.translate(p[0], p[1], p[2]); epG.push(g); });
  const epi = apxDual(new THREE.Mesh(Kit.merge(epG), fatM), '#F2D27A'); sombraT(epi);
  add('epiploicos', [epi], anat, { pickable:false });
  /* epiplón mayor: lámina grasa, lobulada y algo translúcida, que asoma por arriba del campo */
  const epiG = apxGrid(low?16:26, low?10:16, (u, v, p) => { const x = -3.6 + 8.4*u, y = 5.2 + 3.6*v; p.set(x, y + 0.6*Math.sin(u*Math.PI*2.2), 1.2 + 0.4*Math.sin(u*7 + v*3)*Math.sin(v*Math.PI) - 1.1*v + 0.25*Kit.fbm(x*0.8, y*0.8, 2, 2)); });
  const epiplon = apxDual(new THREE.Mesh(epiG, apxTex.mat({ tex:'fat', rep:[2.5,1.2], bump: low ? 0.02 : 0.035, rough:0.36, coat:0.95, coatRough:0.15, side:THREE.DoubleSide, transparent:true, opacity:0.92, sss:['#FFB060', 0.2, 2.6] })), '#F2D27A', { side:THREE.DoubleSide, transparent:true, opacity:0.92 });
  sombraT(epiplon); add('epiplon', [epiplon], anat, { pickable:false, passThrough:true });

  /* ---------- íleon terminal ---------- */
  const ile = apxDual(new THREE.Mesh(apxTubo([[7.2,1.5,-0.9],[4.8,0.9,-0.35],[2.6,0.45,0.2],[1.3,0.2,0.3]], { seg: low?22:38, rad: low?12:18, rfn:(u, a) => 0.56 + 0.04*Math.sin(u*Math.PI*5) + 0.02*Math.sin(a*2 + u*9) }), serosa('serosa', 0xFAECE6, [5,1])), '#F2C3B3');
  sombraT(ile); add('ileon', [ile], anat, {}, ['Íleon terminal', [6.8,3.2,1.2]], new THREE.Vector3(4.6,1.3,0.1));

  /* ---------- apéndice (base fija + cuerpo en la bisagra) ---------- */
  const dB = new THREE.Vector3(0.42,-0.8,0.44).normalize();
  const B = C0.clone().add(new THREE.Vector3(dB.x*1.5, dB.y*1.68, dB.z*1.3));
  const apC = Kit.curve([B.clone().addScaledVector(dB, -0.25), B.clone().add(new THREE.Vector3(0.55,-0.95,0.35)), new THREE.Vector3(1.95,-3.6,0.95), new THREE.Vector3(2.45,-4.55,0.72)]);
  const apR = u => 0.32 + 0.09*Math.sin(Math.min(1, u*1.3)*Math.PI*0.9) + 0.02*Math.sin(u*9);
  const sub = (u0, u1, n) => { const P = []; for (let i=0;i<=n;i++) P.push(apC.getPointAt(u0 + (u1-u0)*i/n)); return P; };
  const apMat = serosa('apend', 0xffffff, [2.2,1], { bump: low ? 0.02 : 0.03, rough:0.38, coat:0.95, coatRough:0.14, sss:['#FF5A3A', 0.36, 2.2] });
  const U0 = 0.15;
  const munG = apxTubo(sub(0, U0+0.02, 6), { seg:10, rad: low?12:18, rfn:(u, a) => apR(u*(U0+0.02)) + 0.006*Math.sin(a*4) });
  const mun = apxDual(new THREE.Mesh(munG, apMat), '#D9534F'); sombraT(mun);
  add('munon', [mun], anat, {}, ['Base del apéndice', [-2.9,-4.3,2.2]], B.clone().add(new THREE.Vector3(0.15,-0.2,0.35)));
  const cuerpoG = apxTubo(sub(U0, 1, 22), { seg: low?22:40, rad: low?12:18, rfn:(u, a) => apR(U0 + u*(1-U0)) + 0.012*Math.sin(a*3 + u*16) + 0.008*Math.sin(u*31) });
  const tipP = apC.getPointAt(1), tipG = new THREE.SphereGeometry(apR(1)*0.98, 18, 14); tipG.translate(tipP.x, tipP.y, tipP.z);
  const cuerpo = apxDual(new THREE.Mesh(Kit.merge([cuerpoG, tipG]), apMat.clone()), '#D9534F'); sombraT(cuerpo);
  hinge.position.copy(B); hinge.updateMatrixWorld(true);
  add('apendice', [cuerpo], hinge, {}, ['Apéndice inflamado', [-1.4,-6.0,2.4]], new THREE.Vector3(1.8,-3.3,1.3));

  /* ---------- mesoapéndice y arterias ---------- */
  const Mp = new THREE.Vector3(3.4,-1.5,-0.4);
  const Fe = u => Mp.clone().lerp(tipP, u).add(new THREE.Vector3(0.35, -0.2, -0.25).multiplyScalar(Math.sin(u*Math.PI)));
  const tmpA = new THREE.Vector3();
  const mesoG = apxGrid(low?18:30, low?5:8, (u, v, p) => { const uu = 0.04 + u*0.94; apC.getPointAt(uu, tmpA); const F = Fe(uu); const dir = F.clone().sub(tmpA).normalize();
    const A = tmpA.clone().addScaledVector(dir, apR(uu)*0.55); p.copy(A.lerp(F, v)).add(new THREE.Vector3(0, -0.06, -0.12).multiplyScalar(Math.sin(v*Math.PI)*Math.sin(u*Math.PI)*3)); });
  const mesoM = apxTex.mat({ tex:'fat', rep:[3,3], bump: low ? 0.02 : 0.03, rough:0.36, coat:0.9, coatRough:0.16, color:0xFFF3D8, transparent:true, opacity:0.88, side:THREE.DoubleSide, depthWrite:true, sss:['#FFB060', 0.2, 2.6] });
  const meso = apxDual(new THREE.Mesh(mesoG, mesoM), '#F2D27A', { side:THREE.DoubleSide, transparent:true, opacity:0.88 });
  add('meso', [meso], hinge, {}, ['Mesoapéndice', [6.0,-3.9,1.6]], new THREE.Vector3(3.0,-2.8,-0.1));
  const artM = Kit.tissue({ color:apxCol3('#C8372F'), rough:0.38, coat:0.75, coatRough:0.2, tex:'artery', rep:[4,1], bump:0.006 });
  const Pb = new THREE.Vector3(3.3, 1.0, -1.1);
  const ileocol = [
    Kit.taper([[5.8,7.0,-1.6],[4.5,3.6,-1.4],[Pb.x,Pb.y,Pb.z]], 0.17, 0.15, { seg: low?14:24, rad: low?8:12 }),
    Kit.taper([[Pb.x,Pb.y,Pb.z],[1.8,2.0,-1.25],[0.9,3.3,-1.2]], 0.12, 0.1, { seg: low?10:18, rad: low?8:10 }),
    Kit.taper([[Pb.x,Pb.y,Pb.z],[4.8,0.35,-1.15],[6.6,0.5,-1.2]], 0.12, 0.1, { seg: low?10:18, rad: low?8:10 })
  ];
  const aIC = apxDual(new THREE.Mesh(Kit.merge(ileocol), artM), '#D23C35');
  add('ileocol', [aIC], anat, {}, ['Arteria ileocólica', [7.0,5.4,0.2]], new THREE.Vector3(4.6,3.9,-1.3));
  const fe = u => Fe(u).lerp(apC.getPointAt(u), 0.1);
  const aProxPts = [Pb, new THREE.Vector3(3.6,-0.3,-0.9), Mp.clone(), fe(0.12)];
  const aProx = apxDual(new THREE.Mesh(Kit.taper(aProxPts, 0.1, 0.09, { seg: low?12:22, rad: low?8:10 }), artM.clone()), '#D23C35');
  const distPts = []; for (let i=0;i<=10;i++) distPts.push(fe(0.12 + 0.84*i/10));
  const aDist = apxDual(new THREE.Mesh(Kit.taper(distPts, 0.085, 0.05, { seg: low?16:28, rad: low?8:10 }), artM.clone()), '#D23C35');
  add('aapend', [aProx], anat, {}, ['Arteria apendicular', [6.6,-1.0,1.4]], new THREE.Vector3(3.55,-0.75,-0.8));
  add('aapend-d', [aDist], hinge, { pickable:false });

  /* ---------- tenias: tres cintas que convergen en la base ---------- */
  anat.updateMatrixWorld(true);
  const rc = new THREE.Raycaster(), tenP = [];
  const onSurf = (from, to, list) => { const dir = to.clone().sub(from).normalize(); rc.set(from, dir); const hh = rc.intersectObjects(list, false)[0]; return hh ? hh.point.clone().addScaledVector(hh.face.normal.clone().transformDirection(hh.object.matrixWorld), 0.04) : null; };
  PHIS.forEach((phi, k) => { const pts = []; const nS = low ? 14 : 22;
    for (let i=0;i<=nS;i++){ const t = i/nS; let p;
      if (t < 0.5){ const y = 6.4 - 5.8*(t/0.5); const ax = new THREE.Vector3(-0.2 - 0.3*(y/6.6), y, -0.05 - 0.55*(y/6.6)); const out = ax.clone().add(new THREE.Vector3(Math.sin(phi), 0, Math.cos(phi)).multiplyScalar(6)); p = onSurf(out, ax, [asc, cec]); }
      else { const w = (t - 0.5)/0.5; const d0 = new THREE.Vector3(Math.sin(phi)*0.9, 0.45, Math.cos(phi)*0.9).normalize(); const dd = d0.clone().lerp(dB, Math.pow(w, 0.85)).normalize();
        const out = C0.clone().addScaledVector(dd, 6); p = onSurf(out, C0, [cec]); }
      if (p) pts.push(p); }
    pts.push(B.clone().addScaledVector(dB, 0.05));
    tenP.push(apxTubo(pts, { seg: low?40:70, rad:10, rfn:(u, a) => 0.13*(0.7 + 0.3*Math.abs(Math.cos(a))) })); });
  const ten = apxDual(new THREE.Mesh(Kit.merge(tenP), apxTex.mat({ tex:'apon', rep:[1,10], bump:0.012, color:0xFBF6EC, rough:0.35, coat:0.8, coatRough:0.2 })), '#FFF3D6');
  add('tenias', [ten], anat, {}, ['Tenias (convergen en la base)', lap ? [-4.6,1.3,2.6] : [-4.6,0.2,2.8]], lap ? new THREE.Vector3(-0.05,1.0,1.4) : new THREE.Vector3(0.05,-1.0,1.35));

  /* ---------- ligaduras (con nudo) y clips ---------- */
  const lig = Kit.tissue({ color:apxCol3('#6C4FB0'), rough:0.4, coat:0.5 });
  const metal = apxMetal();
  const clip = (curve, u, r) => { const p = curve.getPointAt(u), t = curve.getTangentAt(u).normalize(); const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 8, 24, Math.PI*1.25), metal); m.position.copy(p); m.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), t); return m; };
  const aCurve = Kit.curve(aProxPts);
  const ligArt = lap ? [clip(aCurve, 0.62, 0.16), clip(aCurve, 0.76, 0.16)] : [apxLigadura(aCurve, 0.62, 0.15, lig), apxLigadura(aCurve, 0.76, 0.15, lig)].flatMap(L => L.meshes);
  add('lig-art', ligArt, anat, { pickable:false }); E.setVisible('lig-art', false);
  /* base: en la abierta, ligaduras anudadas; en la laparoscópica, lazos preanudados (endoloop) */
  const ligBase = [apxLigadura(apC, 0.07, apR(0.07)+0.05, lig), apxLigadura(apC, 0.12, apR(0.12)+0.05, lig)].flatMap(L => L.meshes);
  add('lig-base', ligBase, anat, { pickable:false }); E.setVisible('lig-base', false);

  /* ---------- técnica abierta: pared con la incisión, compresas, separadores, pinza de Babcock y frasco ---------- */
  const FC = new THREE.Vector3(0.9,-1.9,3.1), HA = -0.95;
  let marco = null, cerrado = null, babcock = null;
  if (!lap){
    const hx = 2.5, hy = 1.75, OW = 4.9, OH = 4.0, OR = 1.5;
    const capasB = [['piel',0.16,'#E8C2A6','skin',0xF6DCC8],['subcutaneo',0.34,'#F2D27A','fat',0xffffff],['apon',0.06,'#F4F1EA','apon',0xffffff],['oblint',0.3,'#C0544B','muscle',0xffffff],['peritoneo',0.05,'#E6D3DB','perit',0xF3E9EE]];
    const outer = sh => { const rr = OR; sh.moveTo(-OW + rr, -OH); sh.lineTo(OW - rr, -OH); sh.quadraticCurveTo(OW, -OH, OW, -OH + rr); sh.lineTo(OW, OH - rr); sh.quadraticCurveTo(OW, OH, OW - rr, OH); sh.lineTo(-OW + rr, OH); sh.quadraticCurveTo(-OW, OH, -OW, OH - rr); sh.lineTo(-OW, -OH + rr); sh.quadraticCurveTo(-OW, -OH, -OW + rr, -OH); return sh; };
    let z = FC.z; const bordeMs = [];
    capasB.forEach(([id, t, col, tex, tint], li) => { const sh = outer(new THREE.Shape()); const O = 48;
      const hole = new THREE.Path(); const ex = 1 + 0.06*li, ey = 1 + 0.05*li; for (let i=0;i<=O;i++){ const a = -i/O*Math.PI*2; const x = Math.cos(a)*hx*ex*(1 - 0.04*Math.cos(2*a)), y = Math.sin(a)*hy*ey; if (i) hole.lineTo(x, y); else hole.moveTo(x, y); } sh.holes.push(hole);
      const g = new THREE.ExtrudeGeometry(sh, { depth:t, bevelEnabled: li === 0, bevelThickness:0.05, bevelSize:0.05, bevelSegments:2, curveSegments:6 }); g.rotateZ(HA); g.translate(FC.x, FC.y, z - t);
      /* UV planas (ExtrudeGeometry usa coordenadas del contorno) */
      const uv = g.attributes.uv; for (let i=0;i<uv.count;i++) uv.setXY(i, uv.getX(i)*0.35, uv.getY(i)*0.35);
      const mm = tex === 'skin' ? apxTex.mat({ tex:'skin', rep:[1,1], bump: low ? 0.006 : 0.01, color:tint, rough:0.5, coat:0.4, coatRough:0.4, sss:['#FF8A62', 0.22, 2.6] })
        : tex === 'perit' ? apxTex.mat({ tex:'perit', rep:[1,1], bump:0.006, color:tint, rough:0.15, coat:1, coatRough:0.08, transparent:true, opacity:0.7, depthWrite:false })
        : apxTex.mat({ tex, rep:[1,1], bump: low ? 0.015 : 0.025, color:tint, rough: tex === 'apon' ? 0.25 : 0.4, coat: tex === 'apon' ? 1 : 0.9, coatRough:0.18, sss:['#FF7A5A', 0.28, 2.4] });
      const m = apxDual(new THREE.Mesh(g, mm), col); if (tex !== 'perit') sombraT(m); bordeMs.push(m); z -= t + 0.01; });
    /* compresas húmedas que protegen los bordes (dos rollos de gasa siguiendo el óvalo) */
    const gasaM = apxTex.mat({ tex:'gauze', rep:[7,1.4], bump: low ? 0.025 : 0.045, color:0xFFFFFF, rough:0.85, coat:0.12, coatRough:0.6, env:0.7 });
    const gasaG = []; [[0.12, 0.88], [1.12, 1.88]].forEach(([a0, a1], k) => { const pts = []; for (let i=0;i<=14;i++){ const a = (a0 + (a1-a0)*i/14)*Math.PI; const x = Math.cos(a)*(hx+0.02), y = Math.sin(a)*(hy+0.02); const c = Math.cos(HA), s2 = Math.sin(HA); pts.push([FC.x + x*c - y*s2, FC.y + x*s2 + y*c, FC.z + 0.1 + 0.05*Math.sin(i*1.7)]); }
      gasaG.push(apxTubo(pts, { seg: low?20:36, rad: low?10:14, rfn:(u, a) => 0.3*(0.82 + 0.1*Math.sin(u*23 + k) + 0.08*Math.sin(a*3 + u*9))*Math.sqrt(Math.sin(u*Math.PI)*0.7 + 0.3) })); });
    const gasa = new THREE.Mesh(Kit.merge(gasaG), gasaM); sombraT(gasa);
    /* separadores de Farabeuf en los extremos del eje menor de la incisión */
    const seps = [1, -1].map(sg => { const F = apxFarabeuf(metal); const ax = [Math.cos(HA + Math.PI/2)*sg, Math.sin(HA + Math.PI/2)*sg]; const e0 = FC.clone().add(new THREE.Vector3(ax[0]*(hy+0.05), ax[1]*(hy+0.05), 0.05));
      F.g.position.copy(e0); const X = new THREE.Vector3(ax[0], ax[1], 0), Y = new THREE.Vector3(0, 0, 1), Z = X.clone().cross(Y); F.g.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z)); F.g.scale.setScalar(1.1); F.g.userData.valva.scale.y = 1.0; E.scene.add(F.g); return F; });
    add('borde', bordeMs, null, {}, ['Bordes de la incisión', [-3.6,-6.2,3.6]], FC.clone().add(new THREE.Vector3(-2.3,-1.9,0.1)));
    E.addPart('separadores', seps.flatMap(F => F.meshes), { pickable:false }); seps.forEach(F => F.meshes.forEach(m => F.g.add(m)));
    E.addPart('compresas', [gasa], { pickable:false });
    marco = bordeMs.concat([gasa], seps.flatMap(F => F.meshes));
    /* pinza de Babcock sujetando el apéndice (sigue a la bisagra) */
    babcock = apxPinza(metal, { babcock:true, L:5.2, r:0.055 }); hinge.updateMatrixWorld(true);
    const grip = apC.getPointAt(0.58); babcock.g.position.copy(grip); babcock.g.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), new THREE.Vector3(0.8, -0.55, 0.62).normalize());
    E.scene.add(babcock.g); E.addPart('pinza', babcock.meshes, {}); babcock.meshes.forEach(m => { babcock.g.add(m); meshes.push(m); }); hinge.attach(babcock.g);
    E.addLabel('pinza', 'Pinza de Babcock', [7.4,-6.6,3.0], grip.clone().add(new THREE.Vector3(0.6,-0.5,1.1)));
    segs.onLbl.push({ l:E.labels.get('pinza'), lp:hinge.worldToLocal(E.labels.get('pinza').pos.clone()), la:hinge.worldToLocal(E.labels.get('pinza').anchor.clone()), grp:hinge });
    /* frasco para patología: vidrio, formol, tapa y etiqueta */
    const fr = new THREE.Group(); fr.position.set(7.6,-5.4,1.6);
    const vidrio = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.0, 2.3, 36, 1, true), new THREE.MeshPhysicalMaterial({ color:0xEAF3F8, transparent:true, opacity:0.3, roughness:0.04, clearcoat:1, clearcoatRoughness:0.05, side:THREE.DoubleSide, depthWrite:false, envMapIntensity:1.8 }));
    const formol = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.94, 1.55, 32), new THREE.MeshPhysicalMaterial({ color:0xF3E6B8, transparent:true, opacity:0.42, roughness:0.1, clearcoat:0.8, depthWrite:false })); formol.position.y = -0.35;
    const fondoF = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.98, 0.12, 32), new THREE.MeshPhysicalMaterial({ color:0xDDE8F0, transparent:true, opacity:0.55, roughness:0.1 })); fondoF.position.y = -1.15;
    const tapa = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.12, 0.32, 36), mat(apxCol3('#2F6FD6'), { roughness:0.35, clearcoat:0.7 })); tapa.position.set(0, 1.9, 0);
    const rosca = new THREE.Mesh(new THREE.CylinderGeometry(1.06, 1.06, 0.12, 36), mat(apxCol3('#244F9A'), { roughness:0.4 })); rosca.position.set(0, 1.7, 0);
    const etq = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7), new THREE.MeshBasicMaterial({ map:apxEtiqueta(['PATOLOGÍA', 'Apéndice cecal', 'formol 10 %']), toneMapped:false })); etq.position.set(0, 0.25, 1.07);
    const frM = [vidrio, formol, fondoF, tapa, rosca, etq]; frM.forEach(m => fr.add(m)); E.scene.add(fr); apxSombra([tapa, rosca], true, false);
    E.addPart('frasco', frM, { passThrough:true }); frM.forEach(m => fr.add(m));
    E.addLabel('frasco', 'Frasco para patología', [8.6,-2.2,2.4], fr.position.clone().add(new THREE.Vector3(0,1.9,0)));
    /* cierre: la misma pared, sin ventana, con la sutura y el portaagujas al lado */
    const sh2 = outer(new THREE.Shape());
    const g2 = new THREE.ExtrudeGeometry(sh2, { depth:0.3, bevelEnabled:true, bevelThickness:0.06, bevelSize:0.06, bevelSegments:2, curveSegments:6 }); g2.rotateZ(HA); g2.translate(FC.x, FC.y, FC.z - 0.3);
    { const uv = g2.attributes.uv; for (let i=0;i<uv.count;i++) uv.setXY(i, uv.getX(i)*0.35, uv.getY(i)*0.35); }
    const parche = new THREE.Mesh(g2, apxTex.mat({ tex:'skin', rep:[1,1], bump: low ? 0.006 : 0.01, color:0xF6DCC8, rough:0.5, coat:0.4, coatRough:0.4, sss:['#FF8A62', 0.22, 2.6] })); sombraT(parche);
    const sutG = []; const ax = [Math.cos(HA), Math.sin(HA)], nx = [-ax[1], ax[0]];
    for (let i=-4;i<=4;i++){ const c = FC.clone().add(new THREE.Vector3(ax[0]*i*0.45, ax[1]*i*0.45, 0.07)); const pa = c.clone().add(new THREE.Vector3(nx[0]*0.26, nx[1]*0.26, 0)), pb = c.clone().add(new THREE.Vector3(-nx[0]*0.26, -nx[1]*0.26, 0));
      sutG.push(Kit.taper([pa, pa.clone().lerp(pb, 0.5).add(new THREE.Vector3(0,0,0.07)), pb], 0.04, 0.04, { seg:4, rad:6 })); const nudo = new THREE.SphereGeometry(0.055, 8, 6); nudo.translate(pa.x, pa.y, pa.z + 0.05); sutG.push(nudo); }
    const sutL = Kit.taper([FC.clone().add(new THREE.Vector3(-ax[0]*2.1, -ax[1]*2.1, 0.02)), FC.clone().add(new THREE.Vector3(ax[0]*2.1, ax[1]*2.1, 0.02))], 0.025, 0.025, { seg:4, rad:6 }); sutG.push(sutL);
    sutG.forEach(g => { if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2), 2)); });
    const sut = new THREE.Mesh(Kit.merge(sutG), lig);
    const porta = apxPinza(metal, { L:4.2, r:0.05 }); porta.g.position.copy(FC.clone().add(new THREE.Vector3(-1.3, 2.4, 0.16))); porta.g.rotation.set(0.12, 0, HA + 0.35); E.scene.add(porta.g); apxSombra(porta.meshes, true, false);
    E.addPart('cierre', [parche, sut].concat(porta.meshes), {}); porta.meshes.forEach(m => porta.g.add(m)); E.addLabel('cierre', 'Cierre por planos', [-3.4,-6.4,3.6], FC.clone().add(new THREE.Vector3(-1.2,-0.7,0.1)));
    cerrado = [parche, sut]; E.setVisible('cierre', false);
  }

  /* ---------- técnica laparoscópica: pared levantada, trócares, instrumentos y monitor ---------- */
  const inst = {}; let rt = null, scopeCam = null, monitor = null, pared = null, frameN = 0, luzOptica = null;
  const PT = { cam:new THREE.Vector3(4.6,0.6,6.2), sup:new THREE.Vector3(4.4,-5.4,5.6), fii:new THREE.Vector3(9.6,-2.2,5.4) };
  if (lap){
    const pg = apxGrid(low?30:48, low?24:36, (u, v, p) => { const x = -4.5 + 16*u, y = -8 + 14*v; const r2 = Math.pow((x-4)/8.5, 2) + Math.pow((y+1)/7.5, 2); p.set(x, y, 2.6 + 3.8*Math.max(0, 1 - r2)); });
    pared = new THREE.Mesh(pg, apxTex.mat({ tex:'skin', rep:[3,3], bump:0.006, color:0xF6DCC8, rough:0.5, coat:0.3, transparent:true, opacity:0.18, depthWrite:false, side:THREE.DoubleSide }));
    pared.renderOrder = 3; add('pared', [pared], null, { passThrough:true, pickable:false }, ['Pared abdominal levantada por el CO₂', [-3.6,5.8,5.2]], new THREE.Vector3(1.2,4.2,5.4));
    /* instrumento: punta en el origen, eje hacia +Y */
    const mkInst = (kind) => { const g = new THREE.Group(); const L = 13; const partes = [];
      const eje = new THREE.Mesh(new THREE.CylinderGeometry(kind==='cam' ? 0.2 : 0.11, kind==='cam' ? 0.2 : 0.11, L, 18), metal); eje.position.y = L/2 + 0.3; partes.push(eje);
      const mango = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.3, 1.9, 18), mat(apxCol3(kind==='cam' ? '#2B3440' : kind==='sel' ? '#2F6FD6' : '#E0A526'), { roughness:0.45, clearcoat:0.5 })); mango.position.y = L + 1.15; partes.push(mango);
      if (kind === 'cam'){ const lente = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.3, 18), new THREE.MeshBasicMaterial({ color:0xFFFBEA, toneMapped:false })); lente.position.y = 0.15; partes.push(lente);
        const cable = new THREE.Mesh(Kit.taper([[0.3, L+0.6, 0],[1.4, L+1.2, 0.3],[2.6, L+1.0, 0.9]], 0.09, 0.09, { seg:10, rad:8 }), mat(apxCol3('#3A4350'), { roughness:0.7 })); partes.push(cable); }
      else if (kind === 'sel'){ /* endograpadora estilizada: cabezal articulado con yunque */
        const cab = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.2, 0.36), mat(apxCol3('#8A96A6'), { metalness:0.85, roughness:0.3 })); cab.position.set(0, 0.6, 0.1); partes.push(cab);
        const yunque = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.2, 0.3), metal); yunque.position.set(0, 0.6, -0.16); yunque.rotation.x = 0.28; partes.push(yunque);
        const gat = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.7, 0.28), mat(apxCol3('#2F6FD6'), { roughness:0.45 })); gat.position.set(0, L + 0.5, 0.5); partes.push(gat); }
      else { [1, -1].forEach(s => { const j = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 8, 14, Math.PI), metal); j.rotation.set(0, Math.PI/2, 0); j.position.set(s*0.05, 0.28, 0); j.scale.set(1, 2.2, 1); partes.push(j); }); }
      partes.forEach(m => g.add(m)); apxSombra(partes, true, false); return { g, partes }; };
    const kinds = [['camara','cam',PT.cam,'Cámara (laparoscopio)'],['pinza','pin',PT.fii,'Pinza de agarre'],['sellador','sel',PT.sup,'Instrumento de sellado']];
    kinds.forEach(([id, kind, port, nom]) => { const o = mkInst(kind); E.scene.add(o.g); E.addPart(id, o.partes, {}); o.partes.forEach(m => o.g.add(m));
      o.port = port; o.tip = port.clone().lerp(new THREE.Vector3(1,-1.5,0.5), 0.35); o.id = id;
      o.put = () => { const dir = o.port.clone().sub(o.tip).normalize(); o.g.position.copy(o.tip); o.g.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir); };
      o.put(); inst[id] = o; E.addLabel(id, nom, [0,0,0]); o.lbl = E.labels.get(id); meshes.push(...o.partes); });
    E.onFrame(() => { Object.values(inst).forEach(o => { const dir = o.port.clone().sub(o.tip).normalize(); o.lbl.pos.copy(o.tip).addScaledVector(dir, o.id==='camara' ? 9.5 : 8.5); }); });
    /* trócares en la pared: cánula, cabezal con válvula y llave de gas */
    const trM = []; const diana = new THREE.Vector3(1,-1.5,0.5);
    Object.values(PT).forEach(p => { const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), p.clone().sub(diana).normalize()); const g = new THREE.Group(); g.position.copy(p); g.quaternion.copy(q);
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.28, 1.6, 20), metal); can.position.y = -0.2;
      const cab = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.42, 0.55, 22), mat(apxCol3('#2E3A48'), { roughness:0.45, clearcoat:0.5 })); cab.position.y = 0.85;
      const tapa = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.14, 22), mat(apxCol3('#E0A526'), { roughness:0.35, clearcoat:0.6 })); tapa.position.y = 1.19;
      const llave = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.7, 10), metal); llave.rotation.z = Math.PI/2; llave.position.set(0.72, 0.85, 0);
      [can, cab, tapa, llave].forEach(m => { g.add(m); trM.push(m); }); apxSombra([can, cab, tapa], true, false); E.scene.add(g); g.userData.ms = [can, cab, tapa, llave]; g.userData.tro = g; PT[p === PT.cam ? '_gc' : p === PT.sup ? '_gs' : '_gf'] = g; });
    E.addPart('trocares', trM, {}); [PT._gc, PT._gs, PT._gf].forEach(g => g.userData.ms.forEach(m => g.add(m)));
    /* monitor con la vista de la cámara: viñeteado, gran angular y luz de la óptica */
    const RW = low ? 384 : 640, RH = low ? 240 : 400;
    rt = new THREE.WebGLRenderTarget(RW, RH, { minFilter:THREE.LinearFilter, magFilter:THREE.LinearFilter }); rt.texture.encoding = THREE.sRGBEncoding;
    scopeCam = new THREE.PerspectiveCamera(70, RW/RH, 0.05, 60);
    luzOptica = new THREE.SpotLight(0xFFF9EC, 1.6, 22, 0.75, 0.6, 1.4); E.scene.add(luzOptica); E.scene.add(luzOptica.target);
    monitor = new THREE.Group(); monitor.position.set(-6.6, 2.4, 3.6); monitor.rotation.y = 0.62;
    const caja = new THREE.Mesh(new THREE.BoxGeometry(6.0, 3.9, 0.3), mat(apxCol3('#1E2530'), { roughness:0.4, clearcoat:0.6 }));
    const pantM = new THREE.ShaderMaterial({ uniforms:{ map:{ value:rt.texture }, k:{ value:0.18 } }, transparent:false, depthWrite:true,
      vertexShader:'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader:'uniform sampler2D map; uniform float k; varying vec2 vUv; void main(){ vec2 c = vUv - 0.5; float r2 = dot(c, c); vec2 uv = 0.5 + c*(1.0 + k*r2*2.0); vec3 col = texture2D(map, uv).rgb; float v = smoothstep(0.62, 0.2, sqrt(r2)); col *= 0.35 + 0.65*v; col += 0.05*(1.0 - r2*3.0); gl_FragColor = vec4(col, 1.0); }' });
    const pant = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 3.5), pantM); pant.position.z = 0.16;
    const pie = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 7.4, 12), mat(apxCol3('#6B7684'), { metalness:0.7, roughness:0.35 })); pie.position.y = -5.6;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 0.2, 24), mat(apxCol3('#4A5462'), { metalness:0.5, roughness:0.4 })); base.position.y = -9.3;
    [caja, pant, pie, base].forEach(m => monitor.add(m)); E.scene.add(monitor);
    E.addPart('monitor', [caja, pant, pie, base], {}); [caja, pant, pie, base].forEach(m => monitor.add(m));
    E.addLabel('monitor', 'Monitor: lo que ve la cámara', [-6.6, 5.2, 3.8], monitor.position.clone().add(new THREE.Vector3(0, 1.95, 0)));
    let mira = new THREE.Vector3(1.2,-1.6,0.4), miraGoal = mira.clone();
    segs.mira = v => { miraGoal.copy(v); };
    E.onFrame((t, dt) => {
      if (!rt) return; frameN++; if (low && frameN % 2) return;
      mira.lerp(miraGoal, Math.min(1, dt*3));
      const cam = inst.camara; scopeCam.position.copy(cam.tip); scopeCam.lookAt(mira); cam.tip.copy(cam.port).lerp(mira, 0.62); cam.put();
      luzOptica.position.copy(cam.tip); luzOptica.target.position.copy(mira);
      const vis = monitor.visible; monitor.visible = false; const pv = pared.visible; pared.visible = false; inst.camara.g.visible = false; fondoM.visible = false;
      const r = E.renderer, cc = r.getClearColor(new THREE.Color()), ca = r.getClearAlpha();
      r.setRenderTarget(rt); r.setClearColor(apxCol3('#2A1414'), 1); r.clear(); r.render(E.scene, scopeCam); r.setRenderTarget(null); r.setClearColor(cc, ca);
      monitor.visible = vis; pared.visible = pv; inst.camara.g.visible = true; fondoM.visible = true;
    });
    /* bolsa de extracción */
    const bolsa = new THREE.Mesh(Kit.sculpt({ radii:[1.1,1.9,0.9], w:28, h:20, disp:(p, d) => 0.05*Kit.fbm(p.x*4, p.y*4, p.z*4, 2) }), new THREE.MeshPhysicalMaterial({ color:0xDCEBF5, transparent:true, opacity:0.35, roughness:0.12, clearcoat:1, side:THREE.DoubleSide, depthWrite:false }));
    bolsa.position.copy(tipP).add(new THREE.Vector3(0.4, 1.6, 0.9)); E.scene.add(bolsa); E.addPart('bolsa', [bolsa], { passThrough:true, pickable:false });
    E.addLabel('bolsa', 'Bolsa de extracción', [8.2,-4.6,3.2], bolsa.position.clone()); E.setVisible('bolsa', false);
  }

  /* ---------- pasos ---------- */
  const est = { ext:0, lift:0, sep:0 };
  function aplicar(){ anat.position.set(0, 0.25*est.ext, 3.4*est.ext); hinge.setRotationFromAxisAngle(Mp.clone().sub(B).normalize(), -est.lift); hinge.updateMatrixWorld(true); }
  function mover(obj, prop, to, d, done){ const from = est[prop]; tw.run(d, k => { est[prop] = from + (to-from)*k; aplicar(); }, done); }
  function instA(id, to, d, done){ const o = inst[id]; if (!o) return done && done(); const from = o.tip.clone(); tw.run(d, k => { o.tip.copy(from).lerp(to, k); o.put(); }, done); }
  const mundo = v => v.clone().applyMatrix4(anat.matrixWorld);
  /* coloca el centro del apéndice (cuerpo en la bisagra) en un punto del mundo con una escala dada */
  const cL = tipP.clone().sub(B).multiplyScalar(0.5);
  function ponerCentro(T, s){ hinge.scale.setScalar(s); const off = cL.clone().multiplyScalar(s).applyQuaternion(hinge.quaternion); const w = T.clone().sub(off); anat.updateMatrixWorld(true); anat.worldToLocal(w); hinge.position.copy(w); hinge.updateMatrixWorld(true); }
  function centroMundo(){ hinge.updateMatrixWorld(true); return cL.clone().applyMatrix4(hinge.matrixWorld); }
  const pinzaSigue = () => { if (!lap) return; const o = inst.pinza; hinge.updateMatrixWorld(true); o.tip.copy(tipP.clone().sub(B).applyMatrix4(hinge.matrixWorld)); o.put(); };
  const PASOS = {
    tenias(done){ E.select('tenias'); if (lap){ segs.mira(C0.clone().add(new THREE.Vector3(0.2, 0.4, 1))); instA('pinza', C0.clone().add(new THREE.Vector3(0.9, 0.2, 1.4)), 1.2, done); } else { anat.updateMatrixWorld(true); E.focus(mundo(B), 14); done && done(); } },
    exteriorizar(done){ E.select(null); mover(null, 'ext', 1, 1.6, () => { mover(null, 'lift', 0.5, 0.9, () => { anat.updateMatrixWorld(true); E.focus(mundo(B.clone().add(new THREE.Vector3(1,-1.2,0))), 14); done && done(); }); }); },
    exponer(done){ E.select(null); segs.mira(B.clone().add(new THREE.Vector3(1.2,-1.4,0.2))); instA('pinza', tipP.clone(), 1.0, () => { tw.run(1.0, k => { est.lift = 0.7*k; aplicar(); pinzaSigue(); }, done); }); },
    meso(done){ E.setVisible('lig-art', true); E.select('aapend');
      const go = () => { tw.run(0.9, k => { E.setOpacity('meso', 1 - 0.7*k); E.setOpacity('aapend-d', 1 - 0.65*k); }, done); };
      if (lap){ segs.mira(Mp.clone().add(new THREE.Vector3(-0.4, -0.4, 0.5))); instA('sellador', Mp.clone().add(new THREE.Vector3(-0.1, -0.35, 0.35)), 1.1, go); } else go(); },
    base(done){ E.setVisible('lig-base', true); E.select('munon');
      const separar = (fin) => { const c0 = centroMundo(); const dir = new THREE.Vector3(0.7, -0.8, 0.9).normalize(); tw.run(1.1, k => { ponerCentro(c0.clone().addScaledVector(dir, 1.1*k), 1); pinzaSigue(); }, fin); };
      if (lap){ segs.mira(B.clone().add(new THREE.Vector3(0.6,-0.6,0.4))); instA('sellador', B.clone().add(new THREE.Vector3(0.45,-0.55,0.5)), 1.0, () => separar(done)); }
      else separar(() => { if (babcock){ E.scene.attach(babcock.g); } const c0 = centroMundo(); const to = new THREE.Vector3(7.6,-5.3,1.6); tw.run(1.6, k => { const p = c0.clone().lerp(to, k); p.y += Math.sin(k*Math.PI)*2.4; ponerCentro(p, 1 - 0.66*k); if (babcock){ const bp = babcock.g.position; bp.lerp(new THREE.Vector3(6.2, -8.2, 2.6), 0.08); } }, () => { E.scene.attach(hinge); if (babcock) E.setVisible('pinza', false); done && done(); }); }); },
    revisar(done){ E.select('munon'); anat.updateMatrixWorld(true); E.focus(mundo(B), 11);
      if (!lap){ mover(null, 'ext', 0, 1.5, () => { E.focus(mundo(B), 12); done && done(); }); }
      else { segs.mira(B.clone().add(new THREE.Vector3(0.3,-0.3,0.4)));
        tw.run(1.0, () => {}, () => { instA('pinza', PT.fii.clone(), 0.9, () => { instA('sellador', PT.sup.clone(), 0.9, () => {
          ['pinza','sellador','trocares'].forEach(id => E.setVisible(id, false)); tw.run(1.4, k => { pared.scale.z = 1 - 0.3*k; }, () => { E.select(null); E.resetView(); done && done(); }); }); }); }); } },
    extraer(done){ E.setVisible('bolsa', true); E.select(null); const bol = E.parts.get('bolsa').meshes[0]; const b0 = bol.position.clone(); const c0 = centroMundo();
      tw.run(1.2, k => { ponerCentro(c0.clone().lerp(b0, k), 1 - 0.5*k); pinzaSigue(); }, () => {
        const to = PT.cam.clone().add(new THREE.Vector3(0.3, 0.5, 2.4));
        tw.run(1.6, k => { const p = b0.clone().lerp(to, k); bol.position.copy(p); bol.scale.setScalar(1 - 0.75*k); ponerCentro(p, 0.5*(1 - 0.75*k)); inst.pinza.tip.copy(p); inst.pinza.put(); },
          () => { E.setVisible('bolsa', false); ['apendice','meso','aapend-d'].forEach(id => E.setVisible(id, false)); segs.mira(B.clone().add(new THREE.Vector3(0.3,-0.3,0.4))); instA('pinza', PT.fii.clone().lerp(B, 0.5), 0.6, done); }); }); },
    cerrar(done){ E.select(null);
      const fin = () => { if (marco){ marco.forEach(m => m.visible = false); E.setVisible('borde', false); E.setVisible('separadores', false); E.setVisible('compresas', false); E.setVisible('cierre', true); E.select('cierre'); } E.resetView(); done && done(); };
      if (est.ext > 0.01) mover(null, 'ext', 0, 1.2, fin); else fin(); }
  };
  if (lap){ segs.mira(C0.clone().add(new THREE.Vector3(0.6,-0.8,1))); }
  let esq = false;
  const ctrl = {
    E, tec,
    paso(id, done){ const f = PASOS[id]; if (!f) return done && done(); try { f(done); } catch(e){ console.warn('apx paso', e); done && done(); } },
    get busy(){ return tw.busy; },
    setEsq(on){ esq = on; apxSetEsq(meshes, on); E.select(E.selected); },
    dispose(){ tw.clear(); try { rt && rt.dispose(); } catch(e){} rt = null; E.dispose(); }
  };
  return ctrl;
}

/* =====================================================================
   CONTENIDOS
   ===================================================================== */
const APX_ORDEN = [
  { id:'ombligo', t:'Dolor sordo y difuso alrededor del ombligo' },
  { id:'apetito', t:'Pérdida del apetito y náusea (a veces, un vómito)' },
  { id:'fid',     t:'El dolor se desplaza y se concentra abajo a la derecha; aumenta al caminar o al toser' },
  { id:'fiebre',  t:'Fiebre moderada, alrededor de 38 °C' }
];
const APX_HALLAZGOS = [
  { t:'Dolor intenso al presionar el punto de McBurney', ok:true, why:'Es el signo de McBurney: la inflamación irrita el peritoneo justo sobre la base del apéndice.' },
  { t:'Dolor al soltar de golpe la presión sobre el abdomen (rebote o signo de Blumberg)', ok:true, why:'Indica irritación del peritoneo: al soltar, el peritoneo inflamado se mueve y duele.' },
  { t:'Glóbulos blancos elevados, sobre todo neutrófilos (leucocitosis con neutrofilia)', ok:true, why:'Muestra una respuesta inflamatoria aguda. Por sí sola no confirma la apendicitis, pero la apoya.' },
  { t:'Ecografía: apéndice engrosado (más de 6 mm) que no se aplasta con la sonda', ok:true, why:'La ecografía es el primer estudio de imagen en niños, adolescentes y embarazadas porque no usa radiación.' },
  { t:'Diarrea abundante desde el inicio y varios familiares con lo mismo', ok:false, why:'Sugiere una gastroenteritis contagiosa. Ojo: una apendicitis puede dar algo de diarrea; por eso nunca se decide con un solo dato.' },
  { t:'Dolor que empezó abajo a la izquierda', ok:false, why:'El apéndice está a la derecha en casi todas las personas. La fosa ilíaca izquierda orienta hacia otros órganos, como el colon sigmoide.' },
  { t:'Tos con flema y congestión nasal', ok:false, why:'Son síntomas respiratorios: no apoyan un problema del apéndice.' },
  { t:'Dolor que mejora al comer', ok:false, why:'La apendicitis quita el apetito y comer no la alivia. El dolor que mejora con la comida se asocia más con úlceras del duodeno.' }
];
const APX_FISIO = [
  { n:'Apéndice sano', p:0.1, t:'La luz del apéndice es estrecha (unos milímetros) y está abierta: el moco que produce su pared sale hacia el ciego. Su pared tiene mucho tejido linfático.' },
  { n:'1 · Obstrucción', p:0.25, t:'Algo tapa la salida: con frecuencia un fecalito (una piedrita de heces endurecidas) o el crecimiento del tejido linfoide de la pared, común en niños y adolescentes, por ejemplo después de una infección. Con menos frecuencia, parásitos u otras causas.' },
  { n:'2 · Sube la presión', p:0.55, t:'La pared sigue fabricando moco, pero ya no puede salir. Las bacterias que viven allí se multiplican. La presión dentro del tubo sube y el apéndice se hincha. Es la etapa del dolor difuso alrededor del ombligo.' },
  { n:'3 · Inflamación y falta de riego', p:0.8, t:'La presión aplasta primero las venas y después las arterias. La pared inflamada se engrosa, se enrojece y las bacterias la invaden. Cuando la inflamación toca el peritoneo de la pared, el dolor se concentra en la fosa ilíaca derecha.' },
  { n:'4 · Riesgo de perforación', p:1, t:'Sin riego, una zona de la pared muere y se debilita. Si se rompe, el contenido infectado sale a la cavidad: puede formarse un absceso o una peritonitis (inflamación de todo el peritoneo), una emergencia grave. El riesgo aumenta con las horas: por eso no hay que esperar.' }
];
const APX_ROLES = [
  { id:'principal', n:'Cirujana o cirujano principal', ok:'dirige', bad:'Quien dirige es quien hace los pasos principales y toma las decisiones durante la operación.' },
  { id:'ayudante', n:'Cirujano ayudante', ok:'expone', bad:'La persona ayudante trabaja dentro del campo estéril: expone, sostiene la cámara o los separadores y colabora en cada paso.' },
  { id:'anest', n:'Anestesióloga o anestesiólogo', ok:'duerme', bad:'Es el especialista que duerme al paciente, lo mantiene sin dolor y vigila su respiración y su corazón durante toda la cirugía.' },
  { id:'instr', n:'Instrumentista', ok:'entrega', bad:'La instrumentista está vestida de forma estéril junto a la mesa de instrumentos: los prepara, los entrega y lleva el recuento.' },
  { id:'circ', n:'Enfermera o enfermero circulante', ok:'circula', bad:'La circulante no está vestida de forma estéril: se mueve por el quirófano, trae lo que falte, registra y suele coordinar la lista de verificación.' }
];
const APX_TAREAS = [
  { v:'', t:'Elige una función…' },
  { v:'dirige', t:'Dirige la operación y realiza los pasos principales' },
  { v:'expone', t:'Expone el campo: sostiene la cámara o los separadores' },
  { v:'duerme', t:'Duerme al paciente y vigila sus signos vitales' },
  { v:'entrega', t:'Prepara y entrega el instrumental estéril; cuenta gasas' },
  { v:'circula', t:'Trabaja fuera de la zona estéril: trae material y registra' }
];
const APX_OMS = [
  { t:'Confirmar la identidad del paciente, el sitio y el procedimiento, y que exista el consentimiento', m:'entrada' },
  { t:'Preguntar por alergias y por el riesgo de dificultad para respirar con la anestesia', m:'entrada' },
  { t:'Cada integrante del equipo dice su nombre y su función', m:'pausa' },
  { t:'Confirmar que se administró el antibiótico preventivo, si está indicado', m:'pausa' },
  { t:'Contar instrumentos, gasas y agujas: deben coincidir con el recuento inicial', m:'salida' },
  { t:'Etiquetar la muestra (el apéndice) con los datos del paciente para enviarla a patología', m:'salida' }
];
const APX_MOM = [ { v:'entrada', n:'Entrada', d:'antes de la anestesia' }, { v:'pausa', n:'Pausa quirúrgica', d:'antes de la incisión' }, { v:'salida', n:'Salida', d:'antes de salir del quirófano' } ];
const APX_CAPA_SUB = {
  apon:     { q:'¿Cómo se abre la aponeurosis del oblicuo externo?', ops:[['En la dirección de sus fibras', true, 'Así las fibras tendinosas se separan en vez de cortarse de lado a lado, y el cierre es más firme.'], ['De través, perpendicular a sus fibras, para abrir más rápido', false, 'Cortar a través de las fibras debilita la aponeurosis, que es la capa que más resiste. Se abre siguiendo sus fibras.']] },
  oblint:   { q:'¿Cómo se atraviesa el músculo oblicuo interno?', ops:[['Se separan sus fibras en su propio sentido, sin cortarlas', true, 'Las fibras se abren como una cortina y quedan intactas. Al terminar, vuelven a su lugar.'], ['Se cortan las fibras de lado a lado', false, 'Cortar el músculo lo debilita, duele más y aumenta el riesgo de hernia. En la incisión de McBurney los músculos no se cortan: se separan.']] },
  transv:   { q:'¿Y el músculo transverso?', ops:[['También se separa en el sentido de sus fibras', true, 'Mira el ojal: la abertura de los músculos profundos se cruza con la de la aponeurosis, como una parrilla. Por eso se llama incisión «en parrilla».'], ['Este sí se corta, porque es el último músculo', false, 'Ningún músculo se corta en esta técnica. Separar en vez de cortar es lo que permite una recuperación rápida.']] },
  peritoneo:{ q:'¿Qué cuidado se tiene al abrir el peritoneo?', ops:[['Se levanta con pinzas antes de abrirlo, para no lesionar el intestino que está justo debajo', true, 'Justo debajo están el ciego y las asas intestinales. Levantar el peritoneo crea un espacio seguro para abrirlo.'], ['Se abre con un solo corte profundo y rápido', false, 'Un corte profundo podría lesionar el intestino, que está pegado al otro lado de esta membrana fina.']] }
};
const APX_CAPA_TXT = {
  piel:'Piel abierta con una incisión limpia, oblicua, centrada en el punto de McBurney. Debajo aparece la grasa amarilla del tejido subcutáneo.',
  subcutaneo:'La grasa se separa hasta llegar a una lámina blanca y brillante: la aponeurosis del músculo oblicuo externo. Su grosor varía mucho entre personas.',
  apon:'La aponeurosis se abrió siguiendo sus fibras (hacia abajo y hacia la línea media, como las manos en los bolsillos). Debajo aparece músculo rojo: el oblicuo interno, con fibras que corren en otra dirección.',
  oblint:'El oblicuo interno se separó sin cortarlo, en el sentido de sus fibras, casi perpendicular a la abertura anterior. Debajo está el músculo transverso.',
  transv:'El transverso también se separó. Mira el ojal desde arriba: las aberturas se cruzan como una parrilla. Al cerrar, cada capa vuelve a su lugar y las capas cruzadas se refuerzan entre sí.',
  peritoneo:'Al abrir la fascia transversal y el peritoneo se entra en la cavidad abdominal: ya se ve el ciego, con una de sus tenias. Continúa en la sección 5.'
};
const APX_PASOS = {
  abierta: [
    { id:'tenias', n:'Identificar el ciego', q:'Con la cavidad abierta aparece un asa de intestino. ¿Cómo se confirma que es el ciego y se llega a la base del apéndice?',
      ops:[['Seguir las tenias (las tres cintas blancas del colon) hasta el punto donde convergen', true, 'Las tres tenias convergen justo en la base del apéndice. Es la referencia más fiable, porque la punta puede estar en muchas posiciones: detrás del ciego, hacia la pelvis…'],
           ['Buscar la estructura más roja', false, 'El color engaña: un asa de intestino delgado irritada también se enrojece. La anatomía (las tenias) es más fiable que el color.'],
           ['Tomar la primera asa que aparezca: siempre es el ciego', false, 'Bajo la incisión puede aparecer intestino delgado o epiplón. El ciego se reconoce por sus tenias, haustras y apéndices epiploicos; el delgado no los tiene.']] },
    { id:'exteriorizar', n:'Exteriorizar el apéndice', q:'Ya localizado, ¿qué se hace para trabajar con seguridad?',
      ops:[['Llevar con suavidad el ciego y el apéndice hacia la herida, para verlos bien y proteger el resto de la cavidad', true, 'Trabajar en la entrada de la herida da buena visión y evita que el contenido inflamado toque otras asas. Los bordes se protegen durante todo el procedimiento.'],
           ['Cortar el apéndice dentro del abdomen, sin verlo bien, para terminar antes', false, 'Sin buena visión se puede lesionar el ciego, el íleon o un vaso. La prisa nunca reemplaza una visión clara.'],
           ['Agrandar la incisión hasta el ombligo desde el principio', false, 'La incisión solo se amplía si hace falta. La ventaja de la incisión en parrilla es que es pequeña y respeta los músculos.']] },
    { id:'meso', n:'Ligar el mesoapéndice', q:'El apéndice está unido por el mesoapéndice, que lleva la arteria apendicular. ¿Cuál es el paso correcto?',
      ops:[['Ligar el mesoapéndice con la arteria apendicular y dividirlo entre las ligaduras', true, 'Primero se controla la irrigación: así el apéndice queda libre sin sangrado. La arteria apendicular es una rama terminal de la ileocólica.'],
           ['Cortar primero la base del apéndice y ocuparse del mesoapéndice después', false, 'Si la arteria no está controlada, al manipular el apéndice podría sangrar. El orden seguro es: irrigación primero, base después.'],
           ['Ligar la arteria ileocólica completa, que es más grande y fácil de ver', false, 'La ileocólica irriga también el final del íleon, el ciego y el colon ascendente. Ligarla dejaría sin sangre tejido sano: solo se liga la rama del apéndice.']] },
    { id:'base', n:'Ligar la base y seccionar', q:'Con el mesoapéndice dividido, ¿cómo se retira el apéndice?',
      ops:[['Ligar la base, justo donde nace del ciego, y seccionar el apéndice por encima de la ligadura', true, 'La ligadura cierra el muñón y evita que salga contenido intestinal. El apéndice va al frasco para patología, que confirmará el diagnóstico.'],
           ['Seccionarlo por la mitad, dejando un buen trozo pegado al ciego', false, 'Un muñón largo puede volver a inflamarse («apendicitis del muñón»). Se secciona cerca de la base, bien cerrada.'],
           ['Seccionarlo sin ligar la base: el ciego se cierra solo', false, 'El ciego no se cierra solo: saldría contenido del intestino y causaría una peritonitis. La base siempre se cierra.']] },
    { id:'revisar', n:'Revisar y devolver', q:'El apéndice ya está en el frasco. ¿Qué sigue antes de cerrar?',
      ops:[['Revisar que el muñón esté bien cerrado y no sangre, retirar el líquido inflamatorio si lo hay y devolver el ciego a su lugar', true, 'La revisión final evita complicaciones: se comprueba el muñón, que no haya sangrado y que la zona quede limpia.'],
           ['Cerrar enseguida para acortar la anestesia', false, 'Un minuto de revisión puede evitar una reintervención. La lista de la OMS también pide comprobar y contar antes de terminar.'],
           ['Dejar el ciego fuera de la herida para que «respire»', false, 'El ciego debe volver a la cavidad: fuera se enfría, se seca y se lesiona.']] },
    { id:'cerrar', n:'Cierre por planos', q:'¿Cómo se cierra la pared?',
      ops:[['Por planos, del más profundo al más superficial: peritoneo, músculos, aponeurosis, tejido subcutáneo y piel', true, 'Cada capa vuelve a su lugar. Como los músculos solo se separaron, recuperan su posición y la pared queda firme. Antes se confirma el recuento de gasas e instrumentos.'],
           ['Solo la piel: lo de adentro se une solo', false, 'Si no se cierra la aponeurosis, la pared queda débil y puede formarse una hernia. La piel sola no resiste la presión del abdomen.'],
           ['De afuera hacia adentro: primero la piel', false, 'Es imposible: la piel cerrada taparía las capas profundas. Se cierra en orden inverso al de la apertura.']] }
  ],
  lap: [
    { id:'tenias', n:'Identificar el ciego en el monitor', q:'La cámara entra por el ombligo y todo el equipo mira el monitor. ¿Cómo se encuentra el apéndice?',
      ops:[['Buscar el ciego en la fosa ilíaca derecha y seguir sus tenias hasta donde convergen', true, 'La lógica es la misma que en la técnica abierta: las tenias llevan a la base. Además, la cámara permite revisar el resto del abdomen si el diagnóstico era dudoso.'],
           ['Mover la cámara al azar hasta ver algo rojo', false, 'El abdomen se recorre con orden: primero una vista general y luego la fosa ilíaca derecha. El color no identifica los órganos.'],
           ['Retirar el CO₂ para que los intestinos se acomoden solos', false, 'Sin gas no hay espacio para ver ni para mover los instrumentos: la pared vuelve a caer sobre los órganos.']] },
    { id:'exponer', n:'Exponer el apéndice', q:'¿Cómo se deja a la vista el mesoapéndice?',
      ops:[['Tomar el apéndice con una pinza de agarre y levantarlo con suavidad', true, 'Al levantar el apéndice, el mesoapéndice se despliega como una vela y se ve la arteria apendicular.'],
           ['Tirar con fuerza del ciego hasta sacarlo por el ombligo', false, 'En la laparoscopía se trabaja dentro, con tracción suave. Tirar fuerte puede romper un apéndice inflamado y frágil.'],
           ['Empujar las asas con la cámara', false, 'La cámara solo mira: si toca los órganos se ensucia la lente y se pierde la visión.']] },
    { id:'meso', n:'Sellar el mesoapéndice', q:'¿Qué se hace con el mesoapéndice y su arteria?',
      ops:[['Sellarlo con energía o con clips y cortarlo entre los cierres', true, 'Es el mismo principio de la técnica abierta: controlar la arteria apendicular antes de soltar el apéndice. Solo cambian las herramientas.'],
           ['Cortarlo sin sellar, porque es muy delgado', false, 'Aunque sea fino, lleva la arteria apendicular. Siempre se sella o se liga antes de cortar.'],
           ['Poner un clip en la arteria ileocólica', false, 'Es la arteria madre: irriga también el íleon terminal y el ciego. Solo se cierra la rama del apéndice.']] },
    { id:'base', n:'Asegurar la base y seccionar', q:'¿Cómo se cierra la base del apéndice en la laparoscopía?',
      ops:[['Con lazos preanudados (o con grapas) en la base, y se secciona por encima', true, 'Los lazos violetas cierran el muñón como una ligadura. Luego el apéndice queda libre.'],
           ['Se deja abierta y se lava con suero', false, 'Una base abierta deja escapar contenido intestinal: sería una peritonitis provocada. La base siempre se cierra.'],
           ['Se quema la base con energía hasta que desaparece', false, 'La energía sirve para vasos pequeños, no para cerrar el intestino. La base necesita un cierre mecánico: lazo, ligadura o grapas.']] },
    { id:'extraer', n:'Extraer en una bolsa', q:'¿Cómo sale el apéndice del abdomen?',
      ops:[['Dentro de una bolsa, por el puerto del ombligo', true, 'La bolsa evita que el apéndice inflamado toque la pared al salir, y así baja el riesgo de infección de la herida.'],
           ['Directamente por el puerto más pequeño, apretándolo', false, 'Apretarlo podría romperlo y contaminar el trayecto. Se usa una bolsa y el puerto más amplio.'],
           ['Se deja dentro: el cuerpo lo reabsorbe', false, 'El cuerpo no reabsorbe un órgano inflamado: se formaría un absceso. Además, debe ir a patología.']] },
    { id:'revisar', n:'Revisar, retirar el CO₂ y cerrar', q:'Para terminar, ¿qué se hace?',
      ops:[['Revisar el muñón, retirar los instrumentos y el gas mirando por la cámara, y cerrar los puertos', true, 'Se comprueba que no haya sangrado y se evacúa el CO₂; el poco que queda se absorbe en horas y a veces causa dolor en el hombro, porque irrita el diafragma.'],
           ['Retirar primero la cámara y después los instrumentos, a ciegas', false, 'Los instrumentos se retiran mirando por la cámara, para comprobar que no se lesiona nada al salir.'],
           ['Dejar el gas dentro para que el abdomen quede protegido', false, 'El gas se retira: dejarlo solo aumenta las molestias. No protege nada.']] }
  ]
};
const APX_RETO = [
  { q:'Mateo sintió primero un dolor difuso alrededor del ombligo y, horas después, un dolor localizado abajo a la derecha. ¿Cómo se explica ese cambio?',
    ops:['Al inicio, el apéndice «avisa» por nervios viscerales que el cerebro ubica alrededor del ombligo; luego la inflamación alcanza el peritoneo de la pared, cuyo dolor sí se localiza con precisión','El apéndice se desplaza desde el ombligo hasta la fosa ilíaca derecha','La infección viaja por la sangre desde el ombligo hacia la derecha'], ok:0,
    fb:'Dolor visceral, mal localizado y en la línea media → dolor somático del peritoneo parietal, bien localizado. Es la clave clínica de la apendicitis.',
    wrong:['El apéndice no cambia de sitio: lo que cambia es qué nervios detectan la inflamación. Repasa la sección 1.','No hay tal viaje: el dolor alrededor del ombligo es un dolor referido, no una infección en ese lugar.'] },
  { q:'¿Dónde está el punto de McBurney?',
    ops:['En la unión del tercio externo con los dos tercios internos de la línea entre la espina ilíaca anterosuperior derecha y el ombligo','En el punto medio exacto entre la espina ilíaca derecha y el ombligo','Bajo el borde de las costillas derechas','En el mismo lugar, pero del lado izquierdo del paciente'], ok:0,
    fb:'Es la proyección en la piel de la base del apéndice, la parte más constante de su anatomía.',
    wrong:['Está más cerca de la espina: a un tercio del camino, no a la mitad.','Bajo las costillas derechas está la vesícula biliar; allí se explora otro signo (el de Murphy).','Error clásico de orientación: al mirar al paciente de frente, su derecha queda a tu izquierda.'] },
  { q:'Durante la operación, ¿cuál es la forma más segura de llegar a la base del apéndice?',
    ops:['Seguir las tenias del colon hasta el punto donde convergen','Buscar la estructura más roja','Seguir el íleon hacia arriba, hacia el estómago'], ok:0,
    fb:'Las tres tenias convergen en la base del apéndice, sin importar dónde esté su punta.',
    wrong:['El color engaña: otras asas irritadas también se enrojecen.','El íleon llega al ciego por un costado, pero seguirlo hacia arriba te aleja del apéndice.'] },
  { q:'¿Por qué la incisión «en parrilla» de McBurney suele recuperarse bien?',
    ops:['Porque los músculos oblicuo interno y transverso se separan en el sentido de sus fibras, sin cortarlos, y luego vuelven a su lugar','Porque no se cierra ninguna capa y el cuerpo las une solo','Porque la piel se corta en vertical, siguiendo la línea alba'], ok:0,
    fb:'Separar en vez de cortar conserva la fuerza de la pared: menos dolor y menos riesgo de hernia.',
    wrong:['Sí se cierran las capas, por planos; si no, podría formarse una hernia.','La incisión de McBurney es oblicua (y la de Rocky-Davis, transversa), no vertical.'] },
  { q:'¿De dónde viene la arteria apendicular?',
    ops:['De la arteria ileocólica, rama de la mesentérica superior','De la arteria mesentérica inferior','De la arteria ilíaca externa, que pasa cerca'], ok:0,
    fb:'Por eso se liga solo la rama del apéndice y no la ileocólica, que también irriga el íleon, el ciego y el colon ascendente.',
    wrong:['La mesentérica inferior irriga el colon izquierdo (descendente, sigmoide y recto), no el ciego.','La ilíaca externa va hacia la pierna; aunque pasa cerca, no irriga el apéndice.'] },
  { q:'¿Por qué la obstrucción de la luz del apéndice puede terminar en una perforación?',
    ops:['Se acumulan moco y bacterias, sube la presión, se comprimen las venas y luego las arterias, y la pared sin riego se debilita','Porque el fecalito es cortante y atraviesa la pared','Porque el ácido del estómago llega hasta el apéndice'], ok:0,
    fb:'Obstrucción → presión → falta de riego → pared débil → perforación. El tiempo juega en contra.',
    wrong:['El fecalito tapa, no corta. El daño viene de la presión y de la falta de riego.','El ácido gástrico se neutraliza en el duodeno; al apéndice no llega ácido.'] },
  { q:'¿Por qué la lista de verificación de cirugía segura de la OMS reduce complicaciones y muertes?',
    ops:['Porque obliga al equipo a comprobar en voz alta paciente, sitio, riesgos, antibiótico y recuentos en tres momentos clave, y a comunicarse','Porque reemplaza a la anestesia general','Porque es un requisito administrativo para el seguro'], ok:0,
    fb:'En su estudio original, en ocho hospitales de países muy distintos, las muertes bajaron casi a la mitad.',
    wrong:['No tiene relación con la anestesia, que sigue siendo necesaria.','Su fin no es administrativo: es evitar errores prevenibles, como una gasa olvidada o el lado equivocado.'] },
  { q:'Una prima de Mateo dice: «Mejor que tome antibióticos en casa y listo». ¿Qué es lo correcto?',
    ops:['En algunos casos no complicados, confirmados con imagen, el equipo médico puede considerar antibióticos en el hospital y con controles; no es un tratamiento casero ni se decide sin receta','Es igual de eficaz y más cómodo: nunca hace falta operar','Los antibióticos nunca se usan en la apendicitis'], ok:0,
    fb:'Es una decisión médica y compartida con el paciente y su familia, no una alternativa casera.',
    wrong:['Entre 3 y 4 de cada 10 personas tratadas solo con antibióticos terminan necesitando la operación en los años siguientes, y no sirve en los casos complicados. Tomarlos en casa puede disimular una perforación.','Sí se usan: como prevención antes de la cirugía, como tratamiento si hubo perforación y, en casos elegidos, como alternativa bajo control médico.'] },
  { q:'En la laparoscopía, ¿para qué se introduce CO₂ en el abdomen?',
    ops:['Para levantar la pared y crear espacio donde mover la cámara y los instrumentos (neumoperitoneo)','Para dormir al paciente','Para matar a las bacterias del apéndice'], ok:0,
    fb:'El CO₂ no arde y el cuerpo lo absorbe y lo elimina al respirar; la presión se vigila todo el tiempo.',
    wrong:['La anestesia se administra por la vena y por la vía respiratoria; el CO₂ del abdomen no duerme a nadie.','El CO₂ no es un antiséptico: su función es mecánica, crear espacio.'] },
  { q:'Cinco días después de la operación, Mateo tiene fiebre y la herida está roja, caliente y con secreción. ¿Qué debe hacer?',
    ops:['Volver pronto al servicio de salud: puede ser una infección de la herida o un absceso','Tomar un antibiótico que sobró en casa','Esperar una semana más: es normal'], ok:0,
    fb:'La recuperación normal va a mejor, no a peor. Fiebre y una herida así son signos de alarma.',
    wrong:['Automedicarse puede ocultar el problema y favorece la resistencia bacteriana; una infección o un absceso necesitan evaluación.','Es un signo de alarma: esperar puede agravar la infección.'] }
];

/* ---------- ilustraciones 2D (SVG, colores del tema) ---------- */
function apxSvgFisio(k){
  /* Ilustración anatómica de la región ileocecal (como en un atlas: íleon → ciego, apéndice que cuelga
     de la base donde convergen las tenias, con su mesoapéndice y su arteria) y, al lado, un corte
     transversal del apéndice con las capas de la pared. Todo lo que cambia con la etapa (presión, moco,
     bacterias, fecalito, riego, perforación) se muestra en el corte, con leyenda. */
  const P = APX_FISIO[k];
  const wall  = ['#E8B4AA','#E5A79B','#DC8A7E','#CF6A61','#C25A54'][k];      // serosa/muscular
  const muc   = ['#F2CDC4','#EFC2B6','#E9A99B','#E08A7C','#D67A6E'][k];      // mucosa
  const lum   = ['#FBF3EE','#F6E7E1','#DCEAF2','#CFE3EE','#C9DEEA'][k];      // luz (moco celeste desde 2)
  const rIn   = [14, 12, 15, 14, 13][k];                                      // radio de la luz
  const rMuc  = rIn + [8, 8, 9, 12, 14][k];                                   // mucosa + submucosa
  const rOut  = rMuc + [9, 9, 10, 13, 15][k];                                 // muscular + serosa
  const wAp   = [11, 11, 13, 16, 18][k];                                      // grosor del apéndice en la vista general
  const nb    = [3, 4, 12, 20, 24][k];
  const cx = 342, cy = 104;
  const bact = []; let sd = 7 + k*13; const rnd = () => { sd = (sd*9301 + 49297) % 233280; return sd/233280; };
  for (let i=0;i<nb;i++){ const a = rnd()*Math.PI*2, r = rnd()*(rIn-3); const x = cx + Math.cos(a)*r, y = cy + Math.sin(a)*r;
    bact.push(`<rect x="${(x-2.8).toFixed(1)}" y="${(y-1.2).toFixed(1)}" width="5.6" height="2.4" rx="1.2" fill="#5E9F4E" transform="rotate(${(rnd()*180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`); }
  const capa = (r, fill, stroke) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
  const isq = k >= 3 ? `<path d="${apxSector(cx, cy, rMuc-1, rOut+0.5, -35, 40)}" fill="#8E6BA0" opacity=".55"/>` : '';
  const perf = k === 4 ? `<path d="${apxSector(cx, cy, rIn-1, rOut+3, -6, 12)}" fill="var(--bg-3)"/><g fill="#5E9F4E"><rect x="${cx+rOut+5}" y="${cy-5}" width="5.6" height="2.4" rx="1.2" transform="rotate(20 ${cx+rOut+7} ${cy-4})"/><rect x="${cx+rOut+13}" y="${cy+4}" width="5.6" height="2.4" rx="1.2" transform="rotate(-30 ${cx+rOut+15} ${cy+5})"/></g><g fill="#D9E8F0"><circle cx="${cx+rOut+9}" cy="${cy+1}" r="2.6"/><circle cx="${cx+rOut+17}" cy="${cy-3}" r="2"/></g>` : '';
  const feca = k >= 1 ? `<ellipse cx="${cx}" cy="${cy}" rx="${Math.min(rIn-2, 7+k)}" ry="${Math.min(rIn-2, 6+k*0.8)}" fill="#8A6A4E" stroke="#5F4632" stroke-width=".8"/>` : '';
  const vasos = k >= 2 ? `<g stroke="#B33A3A" stroke-width=".9" fill="none" opacity="${k>=3?0.9:0.6}">${[20,80,140,200,260,320].map(a => { const r0 = rMuc+1, r1 = rOut-1.5, t = a*Math.PI/180; return `<path d="M${(cx+Math.cos(t)*r0).toFixed(1)} ${(cy+Math.sin(t)*r0).toFixed(1)} Q${(cx+Math.cos(t+0.25)*(r0+r1)/2).toFixed(1)} ${(cy+Math.sin(t+0.25)*(r0+r1)/2).toFixed(1)} ${(cx+Math.cos(t)*r1).toFixed(1)} ${(cy+Math.sin(t)*r1).toFixed(1)}"/>`; }).join('')}</g>` : '';
  const edema = k >= 3 ? `<circle cx="${cx}" cy="${cy}" r="${rOut+4}" fill="none" stroke="#E7B7B0" stroke-width="6" opacity=".55"/>` : '';
  const ang = -120 + 240*P.p;
  const gx = 436, gy = 176, gr = 20;
  const aguja = `<line x1="${gx}" y1="${gy}" x2="${(gx+Math.sin(ang*Math.PI/180)*gr*0.85).toFixed(1)}" y2="${(gy-Math.cos(ang*Math.PI/180)*gr*0.85).toFixed(1)}" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>`;
  const AP = 'M58 134 Q70 168 108 176 Q148 184 178 166';   // eje del apéndice: nace en la base del ciego y cuelga curvado
  return `<svg viewBox="0 0 470 210" role="img" aria-label="Región ileocecal y corte transversal del apéndice en la etapa: ${P.n}">
  <defs>
    <linearGradient id="apx-gcol" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E4B2A4"/><stop offset=".5" stop-color="#F0C9BC"/><stop offset="1" stop-color="#DDA898"/></linearGradient>
    <linearGradient id="apx-gil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFC6B8"/><stop offset=".5" stop-color="#F6DACF"/><stop offset="1" stop-color="#E4AE9E"/></linearGradient>
    <linearGradient id="apx-gmes" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3DFA8"/><stop offset="1" stop-color="#E4C67E"/></linearGradient>
  </defs>
  <!-- colon ascendente (arriba) y ciego (fondo de saco), con haustras y las tres tenias que convergen en la base del apéndice -->
  <path d="M104 6 L104 68 Q104 118 74 132 Q44 146 24 128 Q10 114 12 90 L12 62 Q12 6 44 6 Z" fill="url(#apx-gcol)" stroke="#B98676" stroke-width="1.2"/>
  <path d="M14 40 Q58 30 102 40 M14 76 Q58 66 102 76 M20 108 Q58 100 100 108" fill="none" stroke="#C99483" stroke-width="1" opacity=".8"/>
  <path d="M62 6 Q66 80 58 134 M36 6 Q30 80 58 134 M94 8 Q98 96 58 134" fill="none" stroke="#F7E7DF" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M62 6 Q66 80 58 134 M36 6 Q30 80 58 134 M94 8 Q98 96 58 134" fill="none" stroke="#C48E7C" stroke-width=".9"/>
  <!-- íleon terminal, que desemboca en el ciego por la izquierda (válvula ileocecal) -->
  <path d="M-2 76 Q40 68 72 84 L72 102 Q40 116 -2 104 Z" fill="url(#apx-gil)" stroke="#B98676" stroke-width="1.2"/>
  <path d="M8 84 Q30 80 60 90 M8 96 Q30 94 60 98" fill="none" stroke="#D3A090" stroke-width=".8"/>
  <!-- mesoapéndice (pliegue de peritoneo) con la arteria apendicular -->
  <path d="M30 128 Q80 146 128 158 Q156 164 176 156 L178 166 Q148 184 108 176 Q70 168 58 134 Z" fill="url(#apx-gmes)" stroke="#C7A85C" stroke-width=".9" opacity=".92"/>
  <path d="M60 128 Q92 150 128 160 Q150 166 170 160" fill="none" stroke="#B83A3A" stroke-width="1.9" stroke-linecap="round"/>
  <path d="M100 152 Q104 160 106 166 M134 162 Q136 168 136 174 M156 166 Q158 172 157 178" fill="none" stroke="#B83A3A" stroke-width="1" stroke-linecap="round"/>
  <!-- apéndice: tubo que nace en la base del ciego y cuelga curvado hacia abajo y adentro -->
  <path d="${AP}" fill="none" stroke="#9E4B45" stroke-width="${wAp+2.4}" stroke-linecap="round"/>
  <path d="${AP}" fill="none" stroke="${wall}" stroke-width="${wAp}" stroke-linecap="round"/>
  <path d="${AP}" fill="none" stroke="${muc}" stroke-width="${Math.max(2, wAp*0.3)}" stroke-linecap="round" opacity=".8"/>
  <!-- línea del corte -->
  <path d="M118 154 L108 194" stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="112" y="204" font-size="8" fill="var(--ink-2)">línea de corte</text>
  <path d="M124 170 Q220 150 ${cx-rOut-4} ${cy+rOut*0.4}" fill="none" stroke="var(--ink-3)" stroke-width=".9" stroke-dasharray="3 2"/>
  <!-- rótulos anatómicos -->
  <text x="40" y="28" font-size="8.5" fill="#6B3F33" font-weight="600">colon ascendente</text>
  <text x="8" y="124" font-size="8.5" fill="#6B3F33" font-weight="600">ciego</text>
  <text x="4" y="70" font-size="8" fill="#6B3F33">íleon</text>
  <text x="66" y="118" font-size="7.5" fill="#6B3F33">tenias</text>
  <text x="132" y="150" font-size="8" fill="#7A5A1E">mesoapéndice</text>
  <text x="184" y="176" font-size="8.5" fill="#6B3F33" font-weight="600">apéndice</text>
  <!-- corte transversal ampliado -->
  ${edema}
  ${capa(rOut, wall, '#9E4B45')}
  ${vasos}
  ${capa(rMuc, muc, '#C98A80')}
  ${capa(rIn, lum, k>=2 ? '#8FC3D6' : '#D6ABA1')}
  ${isq}
  ${bact.join('')}
  ${feca}
  ${perf}
  <text x="${cx}" y="30" text-anchor="middle" font-size="9" fill="var(--ink-2)" font-weight="600">corte transversal (ampliado)</text>
  <g font-size="7.5" fill="var(--ink-2)">
    <line x1="${cx+rOut*0.72}" y1="${cy-rOut*0.72}" x2="${cx+rOut+18}" y2="${cy-rOut-12}" stroke="var(--ink-3)" stroke-width=".7"/><text x="${cx+rOut+20}" y="${cy-rOut-14}">serosa y muscular</text>
    <line x1="${cx-rMuc*0.7}" y1="${cy-rMuc*0.7}" x2="${cx-rOut-24}" y2="${cy-rOut-6}" stroke="var(--ink-3)" stroke-width=".7"/><text x="${cx-rOut-56}" y="${cy-rOut-8}">mucosa</text>
    <line x1="${cx-rIn*0.4}" y1="${cy+rIn*0.6}" x2="${cx-34}" y2="${cy+rOut+16}" stroke="var(--ink-3)" stroke-width=".7"/><text x="${cx-52}" y="${cy+rOut+25}">luz${k>=2?' con moco':''}</text>
    ${k>=1 ? `<text x="${cx+rOut+6}" y="${cy+rOut+14}">fecalito</text>` : ''}
    ${k>=3 ? `<text x="${cx+rOut+8}" y="${cy-8}" fill="#6E4A80" font-weight="600">sin riego</text>` : ''}
    ${k===4 ? `<text x="${cx+rOut+8}" y="${cy+12}" fill="var(--bad)" font-weight="600">perforación</text>` : ''}
  </g>
  <!-- manómetro de presión en la luz -->
  <path d="${apxSector(gx, gy, gr-4, gr, -120, 120)}" fill="var(--bg-2)" stroke="var(--line-2)" stroke-width=".8"/>
  <path d="${apxSector(gx, gy, gr-4, gr, -120, ang)}" fill="${P.p>0.7?'var(--bad)':P.p>0.4?'var(--warn)':'var(--ok)'}"/>
  ${aguja}<circle cx="${gx}" cy="${gy}" r="2.2" fill="var(--ink)"/>
  <text x="${gx}" y="${gy+16}" text-anchor="middle" font-size="7.5" fill="var(--ink-2)">presión en la luz</text>
</svg>`;
}
/* sector de anillo entre dos radios y dos ángulos (grados, 0 = arriba) */
function apxSector(cx, cy, r0, r1, a0, a1){
  const P = (r, a) => { const t = (a-90)*Math.PI/180; return `${(cx+Math.cos(t)*r).toFixed(1)} ${(cy+Math.sin(t)*r).toFixed(1)}`; };
  const big = (a1-a0) > 180 ? 1 : 0;
  return `M${P(r1,a0)} A${r1} ${r1} 0 ${big} 1 ${P(r1,a1)} L${P(r0,a1)} A${r0} ${r0} 0 ${big} 0 ${P(r0,a0)} Z`;
}
function apxSvgDolor(){
  return `<svg viewBox="0 0 300 250" role="img" aria-label="Silueta del abdomen: una banda alrededor del ombligo marca el dolor visceral inicial y una flecha lleva a un punto en la fosa ilíaca derecha, donde se localiza el dolor somático después.">
  <path d="M70 10 Q60 70 64 120 Q58 170 80 240 L220 240 Q242 170 236 120 Q240 70 230 10 Z" fill="#EFCDB5" stroke="#C99F86"/>
  <ellipse cx="150" cy="112" rx="58" ry="26" fill="#6FA8DC" opacity=".35"/>
  <circle cx="150" cy="112" r="5" fill="#8E6A55"/>
  <circle cx="108" cy="168" r="11" fill="#D9534F" opacity=".85"/>
  <path d="M138 124 Q118 140 112 154" fill="none" stroke="var(--ink)" stroke-width="2.4" marker-end="url(#apx-ar)"/>
  <defs><marker id="apx-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ink)"/></marker></defs>
  <text x="150" y="84" text-anchor="middle" font-size="12" fill="var(--ink)" font-weight="600">1 · visceral (ombligo)</text>
  <text x="120" y="200" text-anchor="middle" font-size="12" fill="var(--ink)" font-weight="600">2 · somático (FID)</text>
  <text x="44" y="236" font-size="10.5" fill="var(--ink-3)">derecha del paciente</text>
</svg>`;
}

/* =====================================================================
   VISTA
   ===================================================================== */
function apxVista(view){
  view.classList.add('wide');
  const SEC = [
    { id:'caso', n:'1 · El caso' }, { id:'antes', n:'2 · Antes de operar' }, { id:'abordaje', n:'3 · Anatomía y abordaje' },
    { id:'planos', n:'4 · Planos de la pared' }, { id:'extirpar', n:'5 · Localizar y extirpar' }, { id:'despues', n:'6 · Después y reto' }
  ];
  const St = { sec:0, start:Date.now(), limpiar:[], post:[], esq:false, labels:true,
    orden:[], ordenOk:false, fisio:0, hall:new Set(), hallOk:false,
    roles:{}, oms:{}, mcbTries:0, mcbBest:null, mcbOk:false, tecnica:null, neumo:false,
    capaIdx:0, capaSub:null, planosOk:false, campoTec:'abierta', paso:{ abierta:0, lap:0 }, pasoFb:null, hecho:{ abierta:false, lap:false },
    marcas:{ orden:false, hallazgos:false, roles:false, oms:false, mcb:false, tecnica:false, planos:false, abierta:false, lap:false } };
  const hecho0 = !!(Store.s.activities['reto-apendicectomia'] && Store.s.activities['reto-apendicectomia'].done);

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{}, h('span',{class:'eyebrow anat'},'Simulador 3D · Salud'),
      h('h1',{},'Apendicectomía: una cirugía por dentro'),
      h('p',{},'Acompaña a Mateo, un adolescente con apendicitis, desde el primer dolor hasta la recuperación. Ubica el punto de McBurney, atraviesa la pared capa por capa y decide cada paso de la operación, en técnica abierta y laparoscópica.')),
    h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
      h('span',{class:'pill anat'},'+180 XP · 50–70 min'),
      h('a',{class:'btn sm ghost',href:'#/explorar/intestino-grueso'},'Intestino grueso en 3D'),
      h('a',{class:'btn sm ghost',href:'#/explorar/inmunidad'},'Inmunidad'))));
  view.append(h('div',{class:'apx-aviso',role:'note'}, h('span',{class:'apx-ico','aria-hidden':'true'},'⚕️'),
    h('div',{}, h('p',{}, h('b',{},'Aviso. '), APX_AVISO), h('p',{},'Modelo simplificado con fines educativos: los colores son de atlas, las capas se ven limpias y sin sangre, y los grosores están exagerados para que se lean.'))));
  const retoSt = h('div',{class:'notice'+(hecho0?' ok':'')}, hecho0 ? 'Reto resuelto ✓ · puedes volver a recorrer todas las secciones.' : 'Pendiente: recorre las secciones y responde el reto final de la sección 6.');
  view.append(purposeBanner({
    proposito:'Comprender qué es la apendicitis, por qué se opera y qué ocurre en una apendicectomía: la anatomía de la fosa ilíaca derecha, las capas de la pared abdominal y la lógica de cada paso, en técnica abierta y laparoscópica. Es divulgación anatómica y de salud, no formación quirúrgica.',
    observa:['Cómo migra el dolor y qué hallazgos apoyan el diagnóstico','Dónde está el punto de McBurney y por qué','Que los músculos se separan en el sentido de sus fibras, no se cortan','Que las tres tenias convergen en la base del apéndice'],
    reto:'Ordena los síntomas, ubica el punto de McBurney, atraviesa los planos en orden, decide cada paso en las dos técnicas y resuelve el reto final.',
    statusEl: retoSt }));
  const nav = h('nav',{class:'apx-nav','aria-label':'Secciones del simulador'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);

  const tras = fn => St.post.push(fn);
  function soltar(){ St.limpiar.forEach(f => { try { f(); } catch(e){ console.warn(e); } }); St.limpiar = []; }
  const marcaSec = [ () => St.marcas.orden && St.marcas.hallazgos, () => St.marcas.roles && St.marcas.oms, () => St.marcas.mcb && St.marcas.tecnica, () => St.marcas.planos, () => St.marcas.abierta && St.marcas.lap, () => hecho0 || !!(Store.s.activities['reto-apendicectomia'] && Store.s.activities['reto-apendicectomia'].done) ];
  function renderNav(){ nav.innerHTML = ''; SEC.forEach((s,i) => nav.append(h('button',{ type:'button', 'aria-current':String(i===St.sec), onclick:()=>{ St.sec = i; render(); } }, s.n, marcaSec[i]() ? h('span',{class:'apx-ok','aria-label':'completada'},'✓') : null))); }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:8px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec = Math.max(0, St.sec-1); render(); view.scrollIntoView({block:'start'}); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec = Math.min(SEC.length-1, St.sec+1); render(); view.scrollIntoView({block:'start'}); }},'Siguiente →'));
  }
  const infoBox = () => h('div',{class:'apx-info','aria-live':'polite'});
  const mostrarInfo = (box, id) => { const I = APX_INFO[id]; if (!I) return; box.innerHTML = ''; box.append(h('b',{}, I[0]+'. '), I[1]); };
  /* escenario 3D con alternativa 2D */
  function escenario(build, fall){
    const stage = h('div',{class:'stage apx-stage'}); const tip = h('div',{class:'apx-tip','aria-live':'polite'});
    stage.append(h('div',{class:'apx-marca'},'Modelo simplificado con fines educativos'), tip);
    const o = { stage, tip, ctrl:null };
    tras(() => { let c = null; if (webglOK){ try { c = build(stage); } catch(e){ console.warn('apx 3D', e); c = null; try { stage._apxE && stage._apxE.dispose(); } catch(e2){} } }
      if (!c){ try { c = fall(stage); } catch(e){ console.warn('apx 2D', e); } }
      o.ctrl = c; if (c) St.limpiar.push(() => c.dispose && c.dispose()); o.ready && o.ready(c); });
    return o;
  }
  const herramientas = (o, extra) => h('div',{class:'apx-hud'},
    h('button',{class:'btn sm', 'aria-pressed':String(St.esq), onclick:e => { St.esq = !St.esq; e.currentTarget.setAttribute('aria-pressed', String(St.esq)); e.currentTarget.textContent = St.esq ? 'Vista de atlas' : 'Vista esquemática'; o.ctrl && o.ctrl.setEsq && o.ctrl.setEsq(St.esq); }}, St.esq ? 'Vista de atlas' : 'Vista esquemática'),
    h('button',{class:'btn sm', 'aria-pressed':String(St.labels), onclick:e => { St.labels = !St.labels; e.currentTarget.setAttribute('aria-pressed', String(St.labels)); o.ctrl && o.ctrl.E && o.ctrl.E.setLabels(St.labels); }}, 'Etiquetas'),
    h('button',{class:'btn sm', 'aria-label':'Restablecer la vista', onclick:() => o.ctrl && o.ctrl.E && o.ctrl.E.resetView() }, '↺ Vista'),
    extra || null);
  const aplicarPrefs = c => { if (!c) return; if (St.esq && c.setEsq) c.setEsq(true); if (c.E && !St.labels) c.E.setLabels(false); };

  /* =================================================================
     1 · EL CASO
     ================================================================= */
  function secCaso(){
    const wrap = h('div',{class:'stack'});
    wrap.append(h('div',{class:'card stack'},
      h('span',{class:'eyebrow anat'},'Caso ficticio'),
      h('h2',{style:'margin:0'},'Mateo, 15 años, Latacunga'),
      h('p',{},'Un martes por la tarde, Mateo empezó a sentirse mal durante el entrenamiento de fútbol. Esa noche no quiso cenar. A la mañana siguiente le costaba caminar erguido y su mamá lo llevó al centro de salud, donde lo refirieron al hospital. En urgencias le preguntan qué sintió y en qué orden.'),
      apxNota('info','Antes de leer la explicación, razona:','¿en qué orden suelen aparecer los síntomas de una apendicitis típica? Toca las tarjetas en el orden que creas correcto.')));
    /* --- ordenar síntomas --- */
    const pool = h('div',{class:'apx-pool'}), seq = h('div',{class:'apx-seq'}), fb = h('div',{'aria-live':'polite'});
    const mezcla = apxShuffle(APX_ORDEN, 5);
    function pintar(){
      pool.innerHTML = ''; seq.innerHTML = '';
      mezcla.forEach(o => pool.append(h('button',{class:'chip', type:'button', disabled: St.orden.includes(o.id) || St.ordenOk || null, onclick:()=>{ if (St.orden.length < 4){ St.orden.push(o.id); pintar(); } }}, o.t)));
      for (let i=0;i<4;i++){ const id = St.orden[i], o = APX_ORDEN.find(x => x.id === id);
        const cls = 'apx-slot' + (id ? ' full' : '') + (St.ordenOk ? ' ok' : '');
        seq.append(h('div',{class:cls}, h('span',{class:'apx-n'}, String(i+1)), o ? o.t : 'Toca una tarjeta…')); }
    }
    function comprobar(){
      if (St.orden.length < 4){ fb.innerHTML = ''; fb.append(apxNota('warn','Faltan tarjetas.','Coloca los cuatro síntomas antes de comprobar.')); return; }
      const ok = St.orden.every((id, i) => id === APX_ORDEN[i].id);
      fb.innerHTML = '';
      if (ok){ St.ordenOk = true; St.marcas.orden = true; pintar(); renderNav();
        fb.append(apxNota('ok','¡Correcto!','Es la secuencia clásica descrita por el cirujano John B. Murphy a inicios del siglo XX: dolor → náusea y falta de apetito → dolor localizado → fiebre. Así lo vivió Mateo: dolor alrededor del ombligo en el entrenamiento, sin apetito en la cena, dolor abajo a la derecha al despertar y 38,2 °C en urgencias.'));
        explicacion.style.display = ''; Store.log('apx',{ paso:'orden', ok:true }); return; }
      const pos = id => St.orden.indexOf(id); const msgs = [];
      if (pos('fid') < pos('ombligo')) msgs.push('El dolor localizado llega después. Al principio el apéndice solo «avisa» por nervios viscerales, y el cerebro ubica ese dolor alrededor del ombligo.');
      if (pos('apetito') < pos('ombligo')) msgs.push('En la apendicitis típica, primero aparece el dolor y después la náusea. Si el vómito llega antes que el dolor, se piensa más en una gastroenteritis.');
      if (pos('fiebre') < pos('fid')) msgs.push('La fiebre suele llegar tarde, cuando la inflamación ya avanzó. Una fiebre alta desde el inicio orienta hacia otras infecciones.');
      if (!msgs.length) msgs.push('Revisa el orden de los dos primeros: el dolor difuso inicia el cuadro.');
      Store.log('apx',{ paso:'orden', ok:false });
      fb.append(apxNota('warn','Aún no.', msgs.join(' ')));
    }
    pintar();
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Ordena los síntomas'),
      h('div',{class:'apx-two'}, h('div',{class:'stack'}, h('span',{class:'apx-lab'},'Tarjetas'), pool), h('div',{class:'stack'}, h('span',{class:'apx-lab'},'Tu secuencia'), seq)),
      h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'},
        h('button',{class:'btn sm primary', onclick:comprobar},'Comprobar orden'),
        h('button',{class:'btn sm', onclick:()=>{ if (St.ordenOk) return; St.orden.pop(); pintar(); fb.innerHTML=''; }},'Quitar la última'),
        h('button',{class:'btn sm ghost', onclick:()=>{ if (St.ordenOk) return; St.orden = []; pintar(); fb.innerHTML=''; }},'Empezar de nuevo')), fb));
    /* --- por qué migra el dolor --- */
    const explicacion = h('div',{class:'card stack', style: St.ordenOk ? '' : 'display:none'},
      h('span',{class:'eyebrow anat'},'¿Por qué el dolor cambia de lugar?'),
      h('div',{class:'apx-two'},
        h('figure',{class:'apx-fig',style:'margin:0', html: apxSvgDolor() + '<figcaption>Del dolor visceral (mal localizado) al dolor somático (preciso).</figcaption>'}),
        h('div',{class:'stack'},
          h('p',{html:'<b>Primero, dolor visceral.</b> Los nervios que salen del apéndice entran en la médula espinal a la altura del décimo segmento torácico (T10), el mismo que recibe la sensibilidad de la piel del ombligo. El cerebro no distingue bien el origen y «ubica» el dolor alrededor del ombligo: es un <b>dolor referido</b>, sordo y difuso.'}),
          h('p',{html:'<b>Después, dolor somático.</b> Cuando la inflamación alcanza el <b>peritoneo parietal</b>, la membrana que tapiza la pared, entran en juego nervios que sí localizan con precisión: el dolor se concentra en la <b>fosa ilíaca derecha</b> y aumenta al moverse, toser o saltar.'}),
          apxNota('warn','Por eso no hay que automedicarse:','los laxantes aumentan el movimiento y la presión del intestino, y los analgésicos tomados en casa pueden disimular el dolor y retrasar la consulta. En el hospital, en cambio, el equipo sí puede calmar el dolor mientras hace el diagnóstico.'))));
    wrap.append(explicacion);
    /* --- fisiopatología --- */
    const figF = h('figure',{class:'apx-fig',style:'margin:0'}), txtF = h('p',{'aria-live':'polite'}), stepsF = h('div',{class:'apx-steps',role:'group','aria-label':'Etapas de la apendicitis'});
    const pintarF = () => { figF.innerHTML = apxSvgFisio(St.fisio) + `<figcaption>${esc(APX_FISIO[St.fisio].n)}</figcaption>`; txtF.textContent = APX_FISIO[St.fisio].t;
      stepsF.innerHTML = ''; APX_FISIO.forEach((p,i) => stepsF.append(h('button',{type:'button','aria-current':String(i===St.fisio), onclick:()=>{ St.fisio = i; pintarF(); }}, p.n))); };
    pintarF();
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Qué pasa dentro del apéndice'), stepsF, figF, txtF,
      h('p',{class:'small muted',style:'margin:0'},'A la izquierda, la región ileocecal como en un atlas: el íleon entra al ciego y el apéndice cuelga de su base, donde convergen las tres tenias. A la derecha, un corte transversal ampliado del apéndice. Colores convencionales: rosado, pared sana; rojo, pared inflamada; violeta, zona sin riego; celeste, moco acumulado; verde, bacterias; café, fecalito.')));
    /* --- hallazgos --- */
    const cirBox = h('div',{class:'stack'});
    const lista = h('div',{class:'apx-checks'}), fbH = h('div',{'aria-live':'polite'});
    const orden2 = apxShuffle(APX_HALLAZGOS.map((x,i) => i), 11);
    function pintarH(rev){ lista.innerHTML = '';
      orden2.forEach(i => { const o = APX_HALLAZGOS[i], on = St.hall.has(i);
        const cls = rev ? ((on === o.ok) ? (on ? 'ok' : '') : 'bad') : (on ? 'on' : '');
        const cb = h('input',{type:'checkbox', checked: on || null, disabled: St.hallOk || null, onchange:e => { if (e.target.checked) St.hall.add(i); else St.hall.delete(i); pintarH(false); fbH.innerHTML=''; }});
        lista.append(h('label',{class:cls}, cb, h('span',{}, o.t, rev && (on || o.ok) ? h('span',{class:'apx-why'}, (o.ok ? '✓ Apoya: ' : '✗ No apoya: ') + o.why) : null))); }); }
    pintarH(St.hallOk);
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'En urgencias: ¿qué hallazgos apoyan el diagnóstico?'),
      h('p',{class:'small'},'La médica examina a Mateo, pide un análisis de sangre y una ecografía. Marca todos los hallazgos que apoyan una apendicitis y deja sin marcar los que orientan a otra cosa.'),
      lista,
      h('div',{class:'row',style:'gap:6px'}, h('button',{class:'btn sm primary', onclick:()=>{
        const bien = APX_HALLAZGOS.every((o,i) => St.hall.has(i) === o.ok); pintarH(true); fbH.innerHTML = '';
        if (bien){ St.hallOk = true; St.marcas.hallazgos = true; renderNav(); pintarH(true);
          fbH.append(apxNota('ok','¡Muy bien!','Ningún dato aislado confirma la apendicitis: el diagnóstico combina la historia, la exploración, la sangre y la imagen. Por eso existen escalas, como la de Alvarado, que suman puntos por cada hallazgo. En adultos con dudas se usa también la tomografía.'));
          cirBox.append(cirugia); }
        else { const falt = APX_HALLAZGOS.filter((o,i) => o.ok && !St.hall.has(i)).length, sob = APX_HALLAZGOS.filter((o,i) => !o.ok && St.hall.has(i)).length;
          fbH.append(apxNota('warn','Revisa las marcadas en rojo.', (falt ? `Te falta${falt>1?'n':''} ${falt} hallazgo${falt>1?'s':''} que sí apoya${falt>1?'n':''} el diagnóstico. ` : '') + (sob ? `Marcaste ${sob} que no lo apoya${sob>1?'n':''}. ` : '') + 'Lee la explicación de cada una y vuelve a intentarlo.')); } }},'Comprobar')), fbH));
    /* --- ¿por qué operar? --- */
    const cirugia = h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'La decisión'),
      quizBlock({ q:'El equipo confirma una apendicitis aguda. ¿Por qué, en la mayoría de los casos, se recomienda operar pronto?',
        ops:['Porque un apéndice obstruido e inflamado puede perforarse y provocar una peritonitis, una infección grave de la cavidad abdominal','Porque el apéndice es un órgano inútil y conviene quitarlo siempre','Porque los analgésicos no sirven para ese dolor'], ok:0,
        fb:'Quitar el apéndice elimina el foco antes de que se perfore. Cuanto más tiempo pasa, mayor es el riesgo.',
        wrong:['El apéndice tiene funciones (tejido linfoide, microbiota). Solo se quita cuando está enfermo: no se extirpa uno sano «por si acaso».','En el hospital sí se usan analgésicos mientras se diagnostica. La razón de operar es otra: evitar la perforación.'] }, () => {}),
      apxNota('info','¿Y los antibióticos solos?','En algunos casos de apendicitis no complicada, confirmada con imagen, grandes estudios (como APPAC, en Finlandia, y CODA, en Estados Unidos) encontraron que un tratamiento con antibióticos en el hospital, bajo control médico, puede ser una alternativa: muchas personas mejoran, pero entre 3 y 4 de cada 10 terminan necesitando la operación en los años siguientes, y funciona peor si hay un fecalito. No se usa si hay perforación o absceso, y nunca es un tratamiento casero ni sin receta. La decisión la toman el equipo médico, el paciente y su familia. En el caso de Mateo, el equipo recomendó operar.'));
    if (St.hallOk) cirBox.append(cirugia);
    wrap.append(cirBox, secNav());
    return wrap;
  }

  /* =================================================================
     2 · ANTES DE OPERAR
     ================================================================= */
  function secAntes(){
    const wrap = h('div',{class:'stack'});
    const tarjeta = (em, t, txt, por) => h('div',{class:'tile',style:'cursor:default'}, h('h3',{}, em+' '+t), h('p',{class:'small'}, txt), h('p',{class:'small',html:'<b>Por qué importa:</b> '+por}));
    wrap.append(h('div',{class:'grid g2'},
      tarjeta('📝','Consentimiento informado','El equipo explica con palabras claras qué se va a hacer y por qué, qué beneficios y riesgos tiene y qué alternativas existen. Como Mateo es menor de edad, firma su mamá como representante legal; a él también se le explica y se le escucha (asentimiento).','consentir no es solo firmar: es entender, poder preguntar y decidir con información.'),
      tarjeta('🚫🍽️','Ayuno','Se pide no comer ni beber antes de la anestesia. En una urgencia, si la persona comió hace poco, el equipo de anestesia toma precauciones especiales.','con la anestesia general se pierden los reflejos que protegen las vías respiratorias: el contenido del estómago podría pasar a los pulmones (broncoaspiración).'),
      tarjeta('🧼','Asepsia y antisepsia','Asepsia: impedir que lleguen microbios a la herida (instrumental esterilizado, lavado quirúrgico de manos, bata, guantes, gorro, mascarilla y campos estériles). Antisepsia: reducir los microbios que ya hay sobre la piel, con soluciones como la clorhexidina o la povidona yodada. Además, suele darse un antibiótico preventivo antes de la incisión.','la infección de la herida es la complicación más frecuente de esta cirugía; estas medidas la reducen mucho.'),
      tarjeta('😴','Anestesia general','Medicamentos que producen tres efectos: inconsciencia, ausencia de dolor y relajación muscular. Como también se relajan los músculos de la respiración, se asegura la vía aérea con un tubo o un dispositivo, y una máquina ayuda a respirar. En algunas apendicectomías abiertas se usa anestesia raquídea, que adormece solo la mitad inferior del cuerpo.','la anestesióloga o el anestesiólogo vigila sin pausa el corazón (electrocardiograma), la presión arterial, el oxígeno de la sangre (pulsioxímetro) y el CO₂ que se exhala, y despierta al paciente al terminar.')));
    /* --- roles --- */
    const fbR = h('div',{'aria-live':'polite'}), filas = h('div',{class:'apx-roles'});
    const pintarR = rev => { filas.innerHTML = ''; APX_ROLES.forEach(r => { const sel = h('select',{'aria-label':'Función de: '+r.n, onchange:e => { St.roles[r.id] = e.target.value; fbR.innerHTML=''; pintarR(false); }});
      APX_TAREAS.forEach(t => sel.append(h('option',{value:t.v}, t.t))); sel.value = St.roles[r.id] || '';
      const cls = 'apx-role' + (rev ? (St.roles[r.id] === r.ok ? ' ok' : ' bad') : '');
      filas.append(h('div',{class:cls}, h('b',{}, r.n), sel)); }); };
    pintarR(St.marcas.roles);
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'El equipo quirúrgico: ¿quién hace qué?'), filas,
      h('div',{class:'row'}, h('button',{class:'btn sm primary', onclick:()=>{ pintarR(true); fbR.innerHTML = '';
        const mal = APX_ROLES.filter(r => St.roles[r.id] !== r.ok);
        if (!mal.length){ St.marcas.roles = true; renderNav(); fbR.append(apxNota('ok','¡Equipo completo!','Cada función es indispensable. La instrumentista y la circulante llevan juntas el recuento de gasas e instrumentos, y cualquier integrante puede detener la operación si algo no está bien.')); }
        else fbR.append(apxNota('warn','Revisa las funciones en rojo.', mal.map(r => r.bad).join(' '))); }},'Comprobar')), fbR));
    /* --- lista OMS --- */
    const fbO = h('div',{'aria-live':'polite'}), items = h('div',{class:'apx-oms'});
    const pintarO = rev => { items.innerHTML = ''; APX_OMS.forEach((it, i) => { const seg = h('div',{class:'apx-seg',role:'group','aria-label':'Momento de: '+it.t});
      APX_MOM.forEach(m => seg.append(h('button',{type:'button','aria-pressed':String(St.oms[i] === m.v), onclick:()=>{ St.oms[i] = m.v; fbO.innerHTML=''; pintarO(false); }}, m.n)));
      items.append(h('div',{class:'apx-item' + (rev ? (St.oms[i] === it.m ? ' ok' : ' bad') : '')}, h('p',{}, it.t), seg)); }); };
    pintarO(St.marcas.oms);
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Lista de verificación de cirugía segura (OMS)'),
      h('p',{class:'small'},'Es una lista breve que el equipo recorre en voz alta en tres momentos: ', h('b',{},'Entrada'),' (antes de la anestesia), ', h('b',{},'Pausa quirúrgica'),' (antes de la incisión) y ', h('b',{},'Salida'),' (antes de que el paciente salga del quirófano). ¿En qué momento va cada comprobación?'),
      items,
      h('div',{class:'row'}, h('button',{class:'btn sm primary', onclick:()=>{ pintarO(true); fbO.innerHTML = '';
        const mal = APX_OMS.filter((it,i) => St.oms[i] !== it.m).length;
        if (!mal){ St.marcas.oms = true; renderNav(); fbO.append(apxNota('ok','¡Correcto!','La lista se probó en ocho hospitales de países con ingresos altos, medios y bajos: las complicaciones graves bajaron del 11 % al 7 % y las muertes del 1,5 % al 0,8 % (Haynes y colaboradores, 2009). Funciona porque obliga a comprobar en voz alta y da permiso a cualquiera del equipo para detenerse si algo no cuadra.')); }
        else fbO.append(apxNota('warn', mal + (mal>1 ? ' comprobaciones están' : ' comprobación está') + ' en otro momento.','Pista: lo que protege de la anestesia va antes de dormir al paciente; lo que exige a todo el equipo presente y listo, justo antes de cortar; lo que cuenta y etiqueta, al final.')); }},'Comprobar')), fbO));
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Comprueba'),
      quizBlock({ q:'La enfermera limpia la piel del abdomen de Mateo con una solución de clorhexidina. ¿Qué medida es esa?',
        ops:['Antisepsia: reduce los microbios que ya hay sobre un tejido vivo','Asepsia: esteriliza la piel por completo','Anestesia local'], ok:0,
        fb:'La piel viva no se puede esterilizar: se usa un antiséptico. Lo estéril (asepsia) es el instrumental, los guantes y los campos.',
        wrong:['La piel no se puede esterilizar como un instrumento: siempre quedan microbios en poros y folículos. Por eso se habla de antisepsia.','La clorhexidina no adormece: es un antiséptico.'] }, () => {})));
    wrap.append(secNav());
    return wrap;
  }

  /* =================================================================
     3 · ANATOMÍA Y ABORDAJE (torso 3D)
     ================================================================= */
  function apxEvalMcb(x, y, dcm){
    const Ex = APX_T.eiasD[0], Ey = APX_T.eiasD[1], vx = -Ex, vy = -Ey, L2 = vx*vx + vy*vy;
    const t = ((x-Ex)*vx + (y-Ey)*vy)/L2, perp = ((x-Ex)*vy - (y-Ey)*vx)/Math.sqrt(L2);
    if (x > 0.3) return { n:'lado', d:dcm, msg:'Marcaste el lado izquierdo del paciente. Recuerda: al mirar a una persona de frente, su derecha queda a tu izquierda.' };
    if (dcm <= 2.5) return { n:'ok', d:dcm, msg:`¡Muy bien! Estás a ${apxN(dcm,1)} cm del punto de McBurney.` };
    let pista = '';
    if (y > 1.2) pista = 'Estás muy arriba: bajo las costillas derechas está la vesícula biliar, no el apéndice.';
    else if (t > 0.5) pista = 'Estás demasiado cerca del ombligo: el punto está a un tercio del camino desde la espina ilíaca, no a la mitad.';
    else if (t < 0.15) pista = 'Estás demasiado cerca de la espina ilíaca: avanza un tercio del camino hacia el ombligo.';
    else if (Math.abs(perp) > 0.3) pista = perp > 0 ? 'Te saliste de la línea hacia abajo: busca sobre la recta que une la espina ilíaca con el ombligo.' : 'Te saliste de la línea hacia arriba: busca sobre la recta que une la espina ilíaca con el ombligo.';
    return { n: dcm <= 4 ? 'cerca' : 'lejos', d:dcm, msg:(dcm <= 4 ? `Cerca: a ${apxN(dcm,1)} cm. ` : `A ${apxN(dcm,1)} cm del punto. `) + pista };
  }
  function secAbordaje(){
    const wrap = h('div',{class:'stack'});
    const sc = escenario(stage => apxEscenaTorso(stage, { onSkin:p => evaluar(p), onInfo:id => mostrarInfo(info, id) }), stage => apxFallTorso(stage, { onPick:(x,y) => evaluar(new THREE.Vector3(x, y, 0), true) }));
    const info = infoBox(), fb = h('div',{'aria-live':'polite'}), expl = h('div',{class:'stack'}), tecBox = h('div',{class:'stack'});
    const dentroT = h('label',{class:'toggle'}, h('input',{type:'checkbox', 'aria-label':'Ver por dentro', onchange:e => { sc.ctrl && sc.ctrl.setInside && sc.ctrl.setInside(e.target.checked); if (e.target.checked) mostrarInfo(info, 'apendice'); }}), 'Ver por dentro (piel translúcida)');
    sc.stage.append(herramientas(sc));
    let pideClic = true;
    function evaluar(p, plano){
      if (!pideClic || !sc.ctrl) return;
      if (sc.ctrl.marcar) sc.ctrl.marcar(p);
      const d = plano ? Math.hypot(p.x - APX_T.mcb[0], p.y - APX_T.mcb[1])*APX_T.cm : p.distanceTo(sc.ctrl.MC.p)*APX_T.cm;
      const r = apxEvalMcb(p.x, p.y, d); St.mcbTries++; St.mcbBest = St.mcbBest === null ? d : Math.min(St.mcbBest, d);
      fb.innerHTML = ''; fb.append(apxNota(r.n === 'ok' ? 'ok' : r.n === 'cerca' ? 'info' : 'warn', r.n === 'ok' ? 'Punto encontrado.' : 'Intento ' + St.mcbTries + '.', r.msg));
      Store.log('apx',{ paso:'mcburney', cm:Math.round(d*10)/10, nivel:r.n });
      if (r.n === 'ok'){ if (!St.mcbOk) acierto(); } else if (St.mcbTries >= 3 && !$('.apx-rev', fb)) fb.append(h('button',{class:'btn sm apx-rev', onclick:()=>acierto(true)},'Mostrar la respuesta'));
    }
    function acierto(mostrado){
      St.mcbOk = true; if (!mostrado) St.marcas.mcb = true; else St.marcas.mcb = true; renderNav();
      if (sc.ctrl){ sc.ctrl.respuesta && sc.ctrl.respuesta(true); sc.ctrl.candidatos && sc.ctrl.candidatos(false); }
      sc.tip.textContent = 'Verde: punto de McBurney y tercios de la línea espino-umbilical.';
      expl.innerHTML = '';
      expl.append(apxNota('ok', mostrado ? 'Así se ubica:' : '¿Por qué ahí?', 'Traza la línea entre la espina ilíaca anterosuperior derecha y el ombligo y divídela en tres: el punto de McBurney está en la unión del tercio externo con los dos tercios internos. Es la proyección aproximada de la base del apéndice, que casi no cambia de lugar; la punta, en cambio, puede estar detrás del ciego, hacia la pelvis o cerca del íleon. Si al presionar aquí el dolor es intenso, el «signo de McBurney» es positivo. Charles McBurney lo describió en 1889.'),
        h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'}, h('button',{class:'btn sm', onclick:()=>{ const t = $('input', dentroT); t.checked = true; t.dispatchEvent(new Event('change')); }},'Ver qué hay debajo')));
      pintarTec(); }
    /* candidatos accesibles */
    const candBox = h('div',{class:'stack',style:'display:none'});
    const candBtns = h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'});
    [['A','A'],['B','B'],['C','C'],['D','D']].forEach(([k]) => candBtns.append(h('button',{class:'btn sm', 'aria-label':'Probar el punto '+k, onclick:()=>{ const c = (sc.ctrl && sc.ctrl.CANDS || APX_FALL_CANDS).find(q => q[0] === k); if (!c) return;
      const p = sc.ctrl && sc.ctrl.piel ? sc.ctrl.piel(c[1][0], c[1][1]).p : new THREE.Vector3(c[1][0], c[1][1], 0); evaluar(p, !(sc.ctrl && sc.ctrl.piel)); }}, 'Punto '+k)));
    candBox.append(h('p',{class:'small muted',style:'margin:0'},'Cuatro puntos marcados en azul sobre la piel. Elige el que corresponde al punto de McBurney.'), candBtns);
    /* técnica */
    const TEC = [
      { v:'mcb', n:'Abierta · incisión de McBurney', d:'Oblicua, perpendicular a la línea espino-umbilical, centrada en el punto.' },
      { v:'rd', n:'Abierta · incisión de Rocky-Davis', d:'Transversa, en el pliegue natural de la piel sobre el mismo punto.' },
      { v:'lap', n:'Laparoscópica · tres puertos', d:'Ombligo (cámara), sobre el pubis y fosa ilíaca izquierda (instrumentos).' }
    ];
    const TECTXT = {
      mcb:'Incisión de unos 5 a 7 cm, con un tercio por encima de la línea espino-umbilical y dos tercios por debajo. Casi paralela a las fibras del oblicuo externo: por eso la pared se abre con poco daño. En la sección 4 atravesarás sus planos.',
      rd:'Pasa por el mismo punto pero sigue los pliegues de la piel (líneas de tensión): la cicatriz suele quedar más discreta. Los planos profundos se abren igual que en la de McBurney.',
      lap:'Tres incisiones pequeñas. Primero se insufla dióxido de carbono (CO₂) para levantar la pared y crear espacio: es el neumoperitoneo. Los puertos de trabajo se colocan lejos del apéndice para que los instrumentos lleguen en ángulo y no choquen con la cámara.'
    };
    function pintarTec(){
      tecBox.innerHTML = '';
      if (!St.mcbOk){ tecBox.append(h('p',{class:'small muted'},'Primero ubica el punto de McBurney: todas las técnicas se orientan con él.')); return; }
      const cards = h('div',{class:'apx-cards',role:'group','aria-label':'Técnica'});
      TEC.forEach(t => cards.append(h('button',{type:'button', class:'apx-card', 'aria-pressed':String(St.tecnica === t.v), onclick:()=>{ St.tecnica = t.v; St.marcas.tecnica = true; renderNav(); if (sc.ctrl && sc.ctrl.tecnica) sc.ctrl.tecnica(t.v); St.neumo = false; pintarTec(); if (sc.ctrl && sc.ctrl.E){ sc.ctrl.E.focus(new THREE.Vector3(-0.6,-0.9,1.6), 8.8); }
        sc.tip.textContent = t.v === 'lap' ? 'Violeta: los tres puertos. Pulsa «Insuflar CO₂» para ver el neumoperitoneo.' : 'Violeta: la marca de la incisión sobre la piel.'; }}, h('b',{}, t.n), h('small',{}, t.d))));
      tecBox.append(cards);
      if (St.tecnica){ tecBox.append(h('p',{class:'small'}, TECTXT[St.tecnica]));
        if (St.tecnica === 'lap') tecBox.append(h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'}, h('button',{class:'btn sm primary', onclick:e => { St.neumo = !St.neumo; if (sc.ctrl && sc.ctrl.neumo) sc.ctrl.neumo(St.neumo); e.currentTarget.textContent = St.neumo ? 'Retirar el CO₂' : 'Insuflar CO₂'; if (St.neumo) mostrarInfo(info, 'co2'); }}, St.neumo ? 'Retirar el CO₂' : 'Insuflar CO₂'))); }
      tecBox.append(h('div',{class:'tablewrap'}, h('table',{class:'apx-tabla'},
        h('thead',{}, h('tr',{}, h('th',{},''), h('th',{},'Abierta'), h('th',{},'Laparoscópica'))),
        h('tbody',{},
          h('tr',{}, h('td',{}, h('b',{},'Incisiones')), h('td',{},'Una, de unos 5 a 7 cm'), h('td',{},'Tres, de 0,5 a 1,2 cm')),
          h('tr',{}, h('td',{}, h('b',{},'Visión')), h('td',{},'Directa, de la zona del apéndice'), h('td',{},'Por monitor; permite revisar todo el abdomen si el diagnóstico es dudoso')),
          h('tr',{}, h('td',{}, h('b',{},'Recuperación')), h('td',{},'Buena; algo más de dolor en la herida'), h('td',{},'Suele ser algo más rápida, con menos infección de herida')),
          h('tr',{}, h('td',{}, h('b',{},'Necesita')), h('td',{},'Instrumental básico'), h('td',{},'Torre de laparoscopía, CO₂ y entrenamiento'))))),
        h('p',{class:'small muted',style:'margin:0'},'Las dos son seguras y se usan en el Ecuador. La elección depende del caso, del hospital y del equipo; no hay una «mejor» para todos.'));
    }
    sc.ready = c => { aplicarPrefs(c); if (St.mcbOk){ c.respuesta && c.respuesta(true); } if (St.tecnica && c.tecnica) c.tecnica(St.tecnica); };
    pintarTec();
    if (St.mcbOk) acierto(!St.marcas.mcb);
    wrap.append(h('div',{class:'viewer'}, sc.stage, h('div',{class:'panel'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Paso 1 · Reconoce los relieves'),
        h('p',{class:'small',style:'margin:0'},'Gira el torso y busca el ombligo y las dos espinas ilíacas anterosuperiores, los «huesitos» que se palpan al frente de la cadera. Al mirar al paciente de frente, su derecha queda a tu izquierda.'), dentroT, info),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Paso 2 · Ubica el punto de McBurney'),
        h('p',{class:'small',style:'margin:0'},'Haz clic (o toca) sobre la piel donde creas que está. Se mide la distancia al punto real.'),
        h('button',{class:'btn sm ghost apx-wrap', onclick:()=>{ const on = candBox.style.display === 'none'; candBox.style.display = on ? '' : 'none'; sc.ctrl && sc.ctrl.candidatos && sc.ctrl.candidatos(on && !St.mcbOk); }},'¿Prefieres el teclado? Elegir entre puntos marcados'),
        candBox, fb, expl))));
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Paso 3 · Elige la técnica y mira el abordaje'), tecBox));
    wrap.append(secNav());
    return wrap;
  }

  /* =================================================================
     4 · PLANOS DE LA PARED
     ================================================================= */
  function secPlanos(){
    const wrap = h('div',{class:'stack'});
    const info = infoBox();
    const sc = escenario(stage => apxEscenaPlanos(stage, { onInfo:id => mostrarInfo(info, id) }), stage => apxFallPlanos(stage));
    sc.stage.append(herramientas(sc));
    const plan = h('ol',{class:'apx-plan'}), pool = h('div',{class:'apx-pool'}), fb = h('div',{'aria-live':'polite'}), sub = h('div',{class:'stack'}), fin = h('div',{class:'stack'});
    const mezcla = apxShuffle(APX_CAPAS.map(c => c.id), 3);
    function pintar(){
      plan.innerHTML = ''; APX_CAPAS.forEach((c, i) => plan.append(h('li',{class: i < St.capaIdx ? 'done' : i === St.capaIdx && !St.planosOk ? 'cur' : ''}, h('span',{class:'apx-n'}, i < St.capaIdx ? '✓' : String(i+1)), i < St.capaIdx ? c.n : i === St.capaIdx && !St.planosOk ? '¿Qué capa sigue?' : '…')));
      pool.innerHTML = '';
      mezcla.forEach(id => { const c = APX_CAPAS.find(x => x.id === id), i = APX_CAPAS.indexOf(c);
        pool.append(h('button',{class:'chip', type:'button', disabled: (i < St.capaIdx || St.capaSub || St.planosOk) || null, onclick:()=>elegir(id)}, c.n)); });
    }
    function elegir(id){
      const esp = APX_CAPAS[St.capaIdx], i = APX_CAPAS.findIndex(c => c.id === id); fb.innerHTML = '';
      if (id !== esp.id){
        const extra = { peritoneo:' El peritoneo es lo último: al abrirlo se entra en la cavidad, donde están los intestinos.', piel:' La piel es la capa más superficial: fue la primera.', subcutaneo:' La grasa subcutánea está justo bajo la piel, por encima de toda la musculatura.' }[id] || '';
        fb.append(apxNota('warn','Aún no.', `${APX_CAPAS[i].n} está ${i > St.capaIdx ? 'más abajo' : 'más arriba'}. Ahora toca atravesar la capa que está justo debajo de la última que abriste.${extra}`));
        sc.ctrl && sc.ctrl.resaltar && sc.ctrl.resaltar(id); Store.log('apx',{ paso:'plano', elegido:id, esperado:esp.id }); return; }
      sc.ctrl && sc.ctrl.resaltar && sc.ctrl.resaltar(id);
      if (APX_CAPA_SUB[id]){ St.capaSub = id; pintar(); pintarSub(); } else abrir(id);
    }
    function pintarSub(){
      sub.innerHTML = ''; if (!St.capaSub) return; const S = APX_CAPA_SUB[St.capaSub]; const fbS = h('div',{'aria-live':'polite'});
      sub.append(h('p',{style:'font-weight:600;margin:0'}, S.q));
      S.ops.forEach((o, i) => sub.append(h('button',{class:'opt', onclick:e => { fbS.innerHTML = '';
        if (o[1]){ e.currentTarget.classList.add('ok'); const id = St.capaSub; St.capaSub = null; sub.innerHTML = ''; fb.innerHTML = ''; fb.append(apxNota('ok','Correcto.', o[2])); abrir(id, true); }
        else { e.currentTarget.classList.add('bad'); fbS.append(apxNota('warn','Aún no.', o[2])); } }}, h('span',{class:'k'}, String.fromCharCode(65+i)), o[0])));
      sub.append(fbS);
    }
    function abrir(id, yaFb){
      const c = APX_CAPAS[St.capaIdx]; St.capaIdx++;
      if (!yaFb){ fb.innerHTML = ''; }
      fb.append(apxNota('info', c.n + ':', APX_CAPA_TXT[id]));
      sc.tip.textContent = c.n + ' abierta.';
      if (sc.ctrl && sc.ctrl.abrir) sc.ctrl.abrir(id);
      mostrarInfo(info, id);
      if (St.capaIdx >= APX_CAPAS.length){ St.planosOk = true; St.marcas.planos = true; renderNav(); pintarFin(); }
      pintar();
    }
    function pintarFin(){ fin.innerHTML = ''; if (!St.planosOk) return;
      fin.append(apxNota('ok','¡Llegaste a la cavidad!','Seis planos atravesados en orden. Ningún músculo se cortó: se separaron siguiendo sus fibras. En la laparoscopía se atraviesan las mismas capas, pero solo en tres puntos pequeños, donde entran los trócares.'),
        h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'},
          h('button',{class:'btn sm', onclick:()=>{ sc.tip.textContent = 'Cierre por planos: del peritoneo a la piel.'; sc.ctrl && sc.ctrl.cerrarTodo && sc.ctrl.cerrarTodo(() => { sc.tip.textContent = 'Pared cerrada: la sutura violeta une la piel.'; }); mostrarInfo(info, 'cierre'); }},'Ver el cierre por planos'),
          h('button',{class:'btn sm ghost', onclick:()=>{ St.capaIdx = 0; St.planosOk = false; St.capaSub = null; sc.ctrl && sc.ctrl.reiniciar && sc.ctrl.reiniciar(); fb.innerHTML = ''; sub.innerHTML = ''; sc.tip.textContent = ''; pintarFin(); pintar(); }},'Repetir'))); }
    sc.ready = c => { aplicarPrefs(c); for (let i=0;i<St.capaIdx;i++) c.abrir && c.abrir(APX_CAPAS[i].id); };
    pintar(); pintarFin();
    wrap.append(h('div',{class:'viewer'}, sc.stage, h('div',{class:'panel'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Atraviesa la pared en orden'),
        h('p',{class:'small',style:'margin:0'},'Estás sobre el punto de McBurney. Elige, una por una, la capa que hay que atravesar a continuación, de la piel hacia la cavidad.'),
        plan, pool, sub, fb, fin),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Estructura seleccionada'), info.childNodes.length ? info : (mostrarInfo(info, 'piel'), info)))));
    wrap.append(apxNota('info','En el modelo:','los grosores están exagerados para que se lean todas las capas. En un adolescente delgado, toda la pared puede medir apenas 2 o 3 cm; el tejido subcutáneo es la capa que más varía de una persona a otra.'));
    wrap.append(secNav());
    return wrap;
  }

  /* =================================================================
     5 · LOCALIZAR Y EXTIRPAR
     ================================================================= */
  function secExtirpar(){
    const wrap = h('div',{class:'stack'});
    const tec = St.campoTec, P = APX_PASOS[tec];
    const info = infoBox();
    const sc = escenario(stage => apxEscenaCampo(stage, tec, { onInfo:id => mostrarInfo(info, id) }), stage => apxFallCampo(stage, tec));
    sc.stage.append(herramientas(sc));
    St.paso[tec] = 0;
    const seg = h('div',{class:'apx-seg',role:'group','aria-label':'Técnica'});
    [['abierta','Técnica abierta'],['lap','Técnica laparoscópica']].forEach(([v, n]) => seg.append(h('button',{type:'button','aria-pressed':String(tec === v), onclick:()=>{ if (St.campoTec === v) return; St.campoTec = v; render(); }}, n, St.hecho[v] ? ' ✓' : '')));
    const plan = h('ol',{class:'apx-plan'}), preg = h('div',{class:'stack'}), fb = h('div',{'aria-live':'polite'});
    let ocupado = false;
    function pintar(){
      plan.innerHTML = ''; P.forEach((p, i) => plan.append(h('li',{class: i < St.paso[tec] ? 'done' : i === St.paso[tec] ? 'cur' : ''}, h('span',{class:'apx-n'}, i < St.paso[tec] ? '✓' : String(i+1)), p.n)));
      preg.innerHTML = '';
      if (St.paso[tec] >= P.length){ preg.append(apxNota('ok', tec === 'lap' ? 'Apendicectomía laparoscópica completa.' : 'Apendicectomía abierta completa.', tec === 'lap' ? 'Misma lógica que la técnica abierta —encontrar la base por las tenias, controlar la arteria, cerrar la base y retirar el apéndice—, pero vista desde la cámara y con instrumentos largos que entran por puertos pequeños.' : 'El apéndice va a patología, el muñón quedó cerrado y la pared se cerró por planos. En un caso no complicado, la operación suele durar menos de una hora.'),
        h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'}, h('button',{class:'btn sm primary', onclick:()=>{ St.campoTec = tec === 'lap' ? 'abierta' : 'lap'; render(); }}, tec === 'lap' ? 'Ver la técnica abierta' : 'Ver la técnica laparoscópica'), h('button',{class:'btn sm', onclick:()=>{ render(); }},'Repetir')));
        return; }
      const p = P[St.paso[tec]];
      const orden = apxShuffle(p.ops.map((o, i) => i), 17 + St.paso[tec]*3 + (tec === 'lap' ? 5 : 0));
      preg.append(h('p',{style:'font-weight:600;margin:0'}, p.q));
      orden.forEach((i, k) => { const o = p.ops[i]; preg.append(h('button',{class:'opt', onclick:e => { if (ocupado) return; fb.innerHTML = '';
        Store.log('apx',{ paso:'extirpar', tec, id:p.id, opcion:i, ok:o[1] });
        if (!o[1]){ e.currentTarget.classList.add('bad'); fb.append(apxNota('warn','Aún no.', o[2])); return; }
        e.currentTarget.classList.add('ok'); ocupado = true; fb.append(apxNota('ok','Correcto.', o[2]));
        sc.tip.textContent = p.n + '…';
        const seguir = () => { ocupado = false; sc.tip.textContent = p.n + ' ✓'; St.paso[tec]++; if (St.paso[tec] >= P.length){ St.hecho[tec] = true; St.marcas[tec] = true; renderNav(); seg.querySelectorAll('button').forEach(b => { if (b.getAttribute('aria-pressed') === 'true' && !/✓/.test(b.textContent)) b.append(' ✓'); }); } pintar(); };
        if (sc.ctrl && sc.ctrl.paso) sc.ctrl.paso(p.id, seguir); else seguir(); }}, h('span',{class:'k'}, String.fromCharCode(65+k)), o[0])); });
    }
    sc.ready = c => { aplicarPrefs(c); };
    pintar();
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Elige la técnica'), seg,
      h('p',{class:'small muted',style:'margin:0'}, tec === 'lap' ? 'Vista exterior: la pared levantada por el CO₂, tres trócares y el monitor con la imagen de la cámara. Gira la escena para ver cómo entran los instrumentos.' : 'Vista del campo a través de la incisión en parrilla, con los bordes protegidos y dos separadores.')));
    wrap.append(h('div',{class:'viewer'}, sc.stage, h('div',{class:'panel'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'}, tec === 'lap' ? 'Pasos · laparoscópica' : 'Pasos · abierta'), plan),
      h('div',{class:'card stack'}, preg, fb),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Estructura seleccionada'), (mostrarInfo(info, 'tenias'), info)))));
    wrap.append(secNav());
    return wrap;
  }

  /* =================================================================
     6 · DESPUÉS Y RETO
     ================================================================= */
  function secDespues(){
    const wrap = h('div',{class:'stack'});
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'La recuperación típica (casos no complicados)'),
      h('div',{class:'tablewrap'}, h('table',{class:'apx-tabla'},
        h('thead',{}, h('tr',{}, h('th',{},''), h('th',{},'Abierta'), h('th',{},'Laparoscópica'))),
        h('tbody',{},
          h('tr',{}, h('td',{}, h('b',{},'Levantarse y caminar')), h('td',{colspan:'2'},'El mismo día o al siguiente: moverse pronto ayuda a que el intestino se reactive y previene coágulos')),
          h('tr',{}, h('td',{}, h('b',{},'Comer')), h('td',{colspan:'2'},'Primero líquidos y luego la dieta habitual, poco a poco, según indique el equipo')),
          h('tr',{}, h('td',{}, h('b',{},'Alta del hospital')), h('td',{},'En general, de 1 a 3 días'), h('td',{},'En general, de 1 a 2 días')),
          h('tr',{}, h('td',{}, h('b',{},'Volver al colegio')), h('td',{},'Alrededor de 1 a 2 semanas'), h('td',{},'Alrededor de 1 semana')),
          h('tr',{}, h('td',{}, h('b',{},'Deporte intenso y cargar peso')), h('td',{colspan:'2'},'Después de varias semanas, cuando el equipo de salud lo autorice'))))),
      h('p',{class:'small',style:'margin:0'},'Si el apéndice estaba perforado, la hospitalización es más larga y el tratamiento antibiótico dura más días. Los analgésicos y los antibióticos después de la operación son los que indica el equipo médico, en la forma y el tiempo que indique.')));
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow',style:'color:var(--bad)'},'Signos de alarma: volver al servicio de salud'),
      h('div',{class:'apx-alarma'},
        h('div',{}, h('b',{},'Fiebre'),'que aparece o no baja después de los primeros días'),
        h('div',{}, h('b',{},'Dolor que aumenta'),'en lugar de disminuir, o un dolor nuevo e intenso'),
        h('div',{}, h('b',{},'Herida roja, caliente'),'hinchada, que supura o se abre'),
        h('div',{}, h('b',{},'Vómitos que no ceden'),'o no poder comer ni beber'),
        h('div',{}, h('b',{},'Abdomen hinchado'),'sin expulsar gases ni hacer deposiciones'),
        h('div',{}, h('b',{},'Falta de aire'),'o dolor e hinchazón en una pierna')),
      h('p',{class:'small',style:'margin:0'},'Ante cualquiera de ellos: acudir al servicio de salud o llamar al ECU 911. No automedicarse.')));
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'¿Vivimos bien sin apéndice?'),
      h('p',{html:'<b>Sí.</b> Millones de personas viven sin apéndice con total normalidad: otros tejidos linfoides del intestino, como las placas de Peyer, cumplen funciones parecidas. Pero el apéndice no es un «resto inútil». Esto es lo que se sabe, con la cautela que merece:'}),
      h('div',{class:'grid g3'},
        h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Tejido linfoide'), h('p',{class:'small'},'Su pared tiene muchos folículos linfoides, sobre todo en la niñez y la adolescencia. Allí se entrenan linfocitos y se produce IgA, un anticuerpo que protege las mucosas. Es un hecho bien establecido.')),
        h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'¿Reserva de microbiota?'), h('p',{class:'small'},'En 2007, un equipo de la Universidad Duke propuso que el apéndice guarda bacterias beneficiosas en una biopelícula, que podrían repoblar el colon después de una diarrea intensa. Hay datos a favor, pero sigue siendo una hipótesis en estudio.')),
        h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Una pista evolutiva'), h('p',{class:'small'},'Estructuras parecidas al apéndice aparecieron de forma independiente más de 30 veces en la evolución de los mamíferos y casi nunca desaparecieron después. Eso sugiere que aporta alguna ventaja.'))),
      h('p',{class:'small muted',style:'margin:0'},'Algunos estudios observan pequeñas diferencias en la microbiota o en el riesgo de ciertas enfermedades en personas sin apéndice, pero los resultados no coinciden entre sí. Nada de eso justifica quitar un apéndice sano ni dejar uno inflamado.')));
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'En el Ecuador'),
      h('p',{style:'margin:0'},'La apendicitis aguda figura desde hace años entre las primeras causas de egreso hospitalario en las estadísticas del INEC, y es la urgencia quirúrgica abdominal más frecuente en adolescentes y adultos jóvenes. Alrededor de 7 a 9 de cada 100 personas la tendrán en algún momento de su vida. Llegar a tiempo cambia el pronóstico: con dolor abdominal intenso, lo correcto es acudir al centro de salud, no esperar ni automedicarse.')));
    /* --- lo recorrido --- */
    const marcas = [['orden','Ordenaste los síntomas'],['hallazgos','Elegiste los hallazgos que apoyan el diagnóstico'],['roles','Armaste el equipo quirúrgico'],['oms','Clasificaste la lista de la OMS'],['mcb','Ubicaste el punto de McBurney'],['tecnica','Elegiste una técnica y viste el abordaje'],['planos','Atravesaste los seis planos'],['abierta','Completaste la técnica abierta'],['lap','Completaste la técnica laparoscópica']];
    const lista = h('ul',{class:'checks plain'});
    marcas.forEach(([k,t]) => lista.append(h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{}, (St.marcas[k]?'✓ ':'· ')+t))));
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Lo que hiciste hasta aquí'), lista, h('p',{class:'small muted',style:'margin:0'},'Puedes responder el reto aunque falte alguna casilla, pero cada tarea te da el argumento de una pregunta.')));
    /* --- reto --- */
    const reto = h('div',{class:'card stack'});
    let resueltas = 0, primera = 0, intentos = 0; const total = APX_RETO.length;
    reto.append(h('span',{class:'eyebrow anat'},'🎯 Reto final · ' + total + ' preguntas'),
      h('p',{class:'small muted',style:'margin:0'},'Cada respuesta incorrecta te explica por qué y a qué sección volver. Cuentan como aciertos las que resuelvas al primer intento.'));
    APX_RETO.forEach(q => reto.append(quizBlock(q, att => {
      resueltas++; intentos += att; if (att === 1) primera++;
      if (resueltas === total){
        const hechas = marcas.filter(([k]) => St.marcas[k]).length;
        try { Store.completeActivity('reto-apendicectomia', { score: primera + '/' + total, attempts: intentos, duracionMin: Math.round((Date.now() - St.start)/60000), tareas: hechas + '/' + marcas.length }); } catch(e){ console.warn('completeActivity', e); }
        retoSt.className = 'notice ok'; retoSt.textContent = 'Reto resuelto ✓ · ' + primera + ' de ' + total + ' al primer intento.';
        reto.append(apxNota('ok','¡Reto resuelto!', primera + ' de ' + total + ' preguntas al primer intento, con ' + hechas + ' de ' + marcas.length + ' tareas del recorrido. Actividad registrada en tu progreso.'));
        renderNav(); toast('Actividad completada: Reto de apendicectomía ✓');
      }
    })));
    wrap.append(reto);
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow anat'},'Para llevar al cuaderno'),
      h('p',{html:'<b>Apendicitis</b>: obstrucción de la luz → presión → falta de riego → inflamación → riesgo de perforación y peritonitis. Dolor visceral periumbilical que migra a la fosa ilíaca derecha. <b>Punto de McBurney</b>: unión del tercio externo con los dos tercios internos de la línea espina ilíaca anterosuperior derecha–ombligo.'}),
      h('p',{html:'<b>Apendicectomía</b>: planos de la pared (piel, subcutáneo, aponeurosis del oblicuo externo, oblicuo interno, transverso, peritoneo; los músculos se separan, no se cortan) → las <b>tenias</b> llevan a la base → ligar el <b>mesoapéndice</b> (arteria apendicular, rama de la ileocólica) → ligar la base y seccionar → revisar → cerrar por planos.'}),
      h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
        h('button',{class:'btn sm', onclick:()=>{ try { Store.addNote('anat','Apendicitis: obstrucción → presión → isquemia → perforación. Dolor periumbilical (visceral, T10) que migra a FID (peritoneo parietal). McBurney: 1/3 externo de la línea EIAS derecha–ombligo. Planos: piel, subcutáneo, aponeurosis oblicuo externo, oblicuo interno y transverso (se separan), peritoneo. Tenias → base. Arteria apendicular (de la ileocólica). No automedicarse ante dolor abdominal.', { recurso:'apendicectomia' }); toast('Guardado en tu cuaderno.'); } catch(e){ console.warn(e); } }},'Guardar resumen en el cuaderno'),
        h('a',{class:'btn sm ghost', href:'#/explorar/intestino-grueso'},'Intestino grueso en 3D'),
        h('a',{class:'btn sm ghost', href:'#/explorar/inmunidad'},'Microbios e inmunidad'))));
    wrap.append(h('div',{class:'apx-aviso',role:'note'}, h('span',{class:'apx-ico','aria-hidden':'true'},'⚕️'),
      h('div',{}, h('p',{}, h('b',{},'Recuerda. '), APX_AVISO), h('p',{},'Fuentes consultadas para el contenido: guías de la World Society of Emergency Surgery sobre apendicitis aguda (2020), ensayos APPAC (2015) y CODA (2020), lista de verificación de cirugía segura de la OMS (2009) y su evaluación (Haynes y col., 2009), y textos clásicos de anatomía (Gray, Moore).'))));
    wrap.append(secNav());
    return wrap;
  }

  /* =================================================================
     RENDER
     ================================================================= */
  function render(){
    soltar();
    renderNav(); body.innerHTML = ''; St.post = [];
    const f = [secCaso, secAntes, secAbordaje, secPlanos, secExtirpar, secDespues][St.sec];
    body.append(f());
    St.post.forEach(fn => { try { fn(); } catch(e){ console.warn('apx', e); } }); St.post = [];
    Store.log('seccion',{ recurso:'apendicectomia', seccion:SEC[St.sec].id });
  }
  render();
  return { unmount(){ soltar(); } };
}

/* =====================================================================
   ALTERNATIVAS 2D (sin WebGL): mismas acciones, esquema SVG
   ===================================================================== */
const APX_FALL_CANDS = [['A', [-1.25,-0.6]], ['B', APX_T.mcb], ['C', [-1.55, 2.05]], ['D', [1.67,-0.8]]];
const apxNS = 'http://www.w3.org/2000/svg';
function apxS(tag, a, txt){ const e = document.createElementNS(apxNS, tag); if (a) for (const k in a) e.setAttribute(k, String(a[k])); if (txt) e.textContent = txt; return e; }
function apxFallTorso(stage, hooks){
  const box = h('div',{class:'apx-fall'}); stage.append(box);
  const svg = apxS('svg', { viewBox:'-4.2 -4.3 8.4 8.4', role:'img', 'aria-label':'Esquema frontal del abdomen con el ombligo y las dos espinas ilíacas anterosuperiores. Toca la piel para marcar un punto.' });
  const fy = y => -y; let d = '';
  for (let i=0;i<=40;i++){ const y = APX_Y1 - (APX_Y1-APX_Y0)*i/40; d += (i ? 'L' : 'M') + (-apxAT(y)).toFixed(2) + ' ' + fy(y).toFixed(2); }
  for (let i=0;i<=40;i++){ const y = APX_Y0 + (APX_Y1-APX_Y0)*i/40; d += 'L' + apxAT(y).toFixed(2) + ' ' + fy(y).toFixed(2); }
  const piel = apxS('path', { d:d+'Z', fill:'#EFCDB5', stroke:'#C99F86', 'stroke-width':0.04, style:'cursor:crosshair' }); svg.append(piel);
  svg.append(apxS('circle', { cx:0, cy:0, r:0.12, fill:'#9A6E58' }));
  [APX_T.eiasD, APX_T.eiasI].forEach(p => svg.append(apxS('circle', { cx:p[0], cy:fy(p[1]), r:0.12, fill:'#E9DFC8', stroke:'#A89878', 'stroke-width':0.03 })));
  const tx = (x, y, t, a) => svg.append(apxS('text', { x, y, 'font-size':0.28, fill:'currentColor', 'text-anchor':a || 'middle' }, t));
  tx(0, -0.3, 'ombligo'); tx(-2.5, 1.6, 'EIAS derecha'); tx(2.5, 1.6, 'EIAS izquierda'); tx(-3.0, -3.7, '← derecha del paciente'); tx(3.0, -3.7, 'izquierda →');
  const capa = apxS('g'); svg.append(capa);
  box.append(svg); box.style.color = 'var(--ink)';
  svg.addEventListener('click', e => { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const q = pt.matrixTransform(svg.getScreenCTM().inverse()); hooks.onPick && hooks.onPick(q.x, -q.y); });
  let clic = null, resp = null, cands = null, marcas = null;
  return {
    marcar(p){ if (clic) clic.remove(); clic = apxS('circle', { cx:p.x, cy:fy(p.y), r:0.13, fill:'#7A55D6', stroke:'#fff', 'stroke-width':0.03 }); capa.append(clic); },
    respuesta(on){ if (resp){ resp.remove(); resp = null; } if (!on) return; resp = apxS('g');
      resp.append(apxS('line', { x1:APX_T.eiasD[0], y1:fy(APX_T.eiasD[1]), x2:0, y2:0, stroke:'#1F8A5C', 'stroke-width':0.04, 'stroke-dasharray':'0.15 0.1' }));
      resp.append(apxS('circle', { cx:APX_T.mcb[0], cy:fy(APX_T.mcb[1]), r:0.2, fill:'none', stroke:'#2FB37A', 'stroke-width':0.06 })); capa.append(resp); },
    candidatos(on){ if (cands){ cands.remove(); cands = null; } if (!on) return; cands = apxS('g'); APX_FALL_CANDS.forEach(([k, p]) => { cands.append(apxS('circle', { cx:p[0], cy:fy(p[1]), r:0.1, fill:'#2F6FD6' })); cands.append(apxS('text', { x:p[0], y:fy(p[1])-0.2, 'font-size':0.3, 'text-anchor':'middle', fill:'#2F6FD6', 'font-weight':700 }, k)); }); capa.append(cands); },
    tecnica(t){ if (marcas){ marcas.remove(); marcas = null; } marcas = apxS('g', { stroke:'#6C4FB0', 'stroke-width':0.06, fill:'none' });
      const [mx, my] = APX_T.mcb;
      if (t === 'mcb') marcas.append(apxS('line', { x1:mx-0.25, y1:fy(my+0.52), x2:mx+0.5, y2:fy(my-1.04) }));
      if (t === 'rd') marcas.append(apxS('line', { x1:mx-0.62, y1:fy(my), x2:mx+0.62, y2:fy(my) }));
      if (t === 'lap') [[0,0],[0.05,-2.85],[1.75,-1.15]].forEach(p => marcas.append(apxS('circle', { cx:p[0], cy:fy(p[1]), r:0.14 })));
      capa.append(marcas); },
    dispose(){ box.remove(); }
  };
}
function apxFallPlanos(stage){
  const box = h('div',{class:'apx-fall'}); stage.append(box);
  const svg = apxS('svg', { viewBox:'0 0 400 300', role:'img', 'aria-label':'Corte de la pared abdominal con sus seis capas apiladas. Cada capa se abre en el centro cuando eliges el plano correcto.' });
  const cols = { piel:'#EFCDB5', subcutaneo:'#F6D77E', apon:'#F4F1EA', oblint:'#C8544B', transv:'#B04A43', peritoneo:'#CFE3EA' };
  const g = {}; let y = 30;
  APX_CAPAS.forEach(C => { const hgt = Math.max(8, C.t*70); const grp = apxS('g'); g[C.id] = { grp, y, hgt };
    grp.append(apxS('rect', { x:20, y, width:360, height:hgt, fill:cols[C.id], stroke:'#8A7A6E', 'stroke-width':0.6 }));
    grp.append(apxS('text', { x:24, y:y+hgt/2+4, 'font-size':10, fill:'#2B2B2B' }, C.n)); svg.append(grp); y += hgt + 3; });
  svg.append(apxS('ellipse', { cx:200, cy:y+50, rx:120, ry:36, fill:'#E9A28C', stroke:'#B06B58' }));
  svg.append(apxS('text', { x:200, y:y+54, 'font-size':11, 'text-anchor':'middle', fill:'#4A2A20' }, 'ciego'));
  box.append(svg);
  return {
    abrir(id){ const o = g[id]; if (!o || o.gap) return; o.gap = apxS('rect', { x:170, y:o.y-1, width:60, height:o.hgt+2, fill:'var(--bg-2)' }); o.grp.append(o.gap); },
    cerrarTodo(done){ Object.values(g).forEach(o => { if (o.gap){ o.gap.remove(); o.gap = null; } }); done && done(); },
    reiniciar(){ Object.values(g).forEach(o => { if (o.gap){ o.gap.remove(); o.gap = null; } }); },
    dispose(){ box.remove(); }
  };
}
function apxFallCampo(stage, tec){
  const box = h('div',{class:'apx-fall'}); stage.append(box);
  box.innerHTML = `<svg viewBox="0 0 400 320" role="img" aria-label="Esquema del ciego con sus tenias, el apéndice inflamado, el mesoapéndice y la arteria apendicular.">
    <rect x="130" y="0" width="90" height="120" rx="30" fill="#EDB39F" stroke="#B06B58"/>
    <circle cx="170" cy="150" r="62" fill="#E9A28C" stroke="#B06B58"/>
    <path d="M400 110 Q300 120 228 140" stroke="#F2C3B3" stroke-width="34" fill="none" stroke-linecap="round"/>
    <g class="apx-f-ten" stroke="#FFF3D6" stroke-width="7" fill="none"><path d="M175 0 L175 150 Q182 190 196 204"/><path d="M145 0 Q128 120 196 204"/><path d="M205 0 Q222 120 196 204"/></g>
    <path class="apx-f-meso" d="M200 208 L300 200 L262 300 Z" fill="#F2D27A" opacity=".85"/>
    <path class="apx-f-art" d="M320 90 Q306 160 300 200 L262 296" stroke="#D23C35" stroke-width="5" fill="none"/>
    <path class="apx-f-ap" d="M196 204 Q232 250 258 300" stroke="#D9534F" stroke-width="22" fill="none" stroke-linecap="round"/>
    <g class="apx-f-lig" fill="none" stroke="#6C4FB0" stroke-width="4" style="display:none"><ellipse cx="305" cy="176" rx="9" ry="4"/><ellipse cx="302" cy="190" rx="9" ry="4"/></g>
    <g class="apx-f-lb" fill="none" stroke="#6C4FB0" stroke-width="4" style="display:none"><ellipse cx="202" cy="212" rx="14" ry="5"/><ellipse cx="207" cy="220" rx="14" ry="5"/></g>
    <text x="110" y="160" font-size="13" fill="#4A2A20">ciego</text><text x="300" y="150" font-size="12" fill="var(--ink)">a. apendicular</text><text x="150" y="300" font-size="12" fill="var(--ink)">apéndice</text>
  </svg>`;
  const q = s => box.querySelector(s);
  return {
    paso(id, done){ if (id === 'tenias') q('.apx-f-ten').setAttribute('stroke', '#E0A526');
      if (id === 'meso'){ q('.apx-f-lig').style.display = ''; q('.apx-f-meso').setAttribute('opacity', '.3'); }
      if (id === 'base'){ q('.apx-f-lb').style.display = ''; q('.apx-f-ap').setAttribute('opacity', '.15'); }
      done && done(); },
    dispose(){ box.remove(); }
  };
}

route('/simuladores/apendicectomia', (view) => apxVista(view));
</script>
