<script>
/* =====================================================================
   MODELO: CORAZÓN DETALLADO (procedimental, simplificado con fines educativos)
   Ventrículos con ápex, orejuelas, surcos con grasa, vasos coronarios pegados
   a la superficie, grandes vasos cónicos con lumen, válvulas con valvas que
   se abren y cierran según el ciclo cardíaco. Sustituible por un glTF.
   ===================================================================== */
/* ---------------------------------------------------------------------
   orgvTex · texturas procedurales de tejidos para los órganos del Atlas
   (miocardio con fibras, grasa lobulada, músculo estriado, hueso, hígado,
   serosa con capilares…). Ruido periódico: se repiten sin costuras.
   Todo cacheado por clave; tamaño 256 en equipos modestos, 512 si no.
   --------------------------------------------------------------------- */
const orgvTex = (() => {
  const cache = {};
  const N = () => (lowEnd() ? 256 : 512);
  const pn = (P, seed) => { const g = new Float32Array(P*P); const R = Kit.rng(seed); for (let i=0;i<g.length;i++) g[i] = R()*2-1;
    return (x,y) => { const fx=x*P, fy=y*P, x0=Math.floor(fx), y0=Math.floor(fy), tx=fx-x0, ty=fy-y0, sx=tx*tx*(3-2*tx), sy=ty*ty*(3-2*ty);
      const i0=((x0%P)+P)%P, i1=(i0+1)%P, j0=((y0%P)+P)%P, j1=(j0+1)%P, a=g[j0*P+i0], b=g[j0*P+i1], c=g[j1*P+i0], d=g[j1*P+i1];
      return a+(b-a)*sx+(c-a)*sy+(a-b-c+d)*sx*sy; }; };
  const fb = (seed, base=4, oct=4) => { const L = []; for (let i=0;i<oct;i++) L.push(pn(base<<i, seed+i*97)); return (u,v) => { let s=0,a=0.5; for (const n of L){ s+=a*n(u,v); a*=0.5; } return s; }; };
  /* Worley periódico (F1, F2 e índice de celda): lobulillos de grasa, lobulillos hepáticos, poros */
  const worley = (G, seed) => { const R = Kit.rng(seed); const pts = new Float32Array(G*G*2), rnd = new Float32Array(G*G); for (let i=0;i<G*G;i++){ pts[i*2]=R(); pts[i*2+1]=R(); rnd[i]=R(); }
    return (u,v,o) => { const fx=u*G, fy=v*G, cx=Math.floor(fx), cy=Math.floor(fy); let f1=9, f2=9, id=0;
      for (let j=-1;j<=1;j++) for (let i=-1;i<=1;i++){ const gx=((cx+i)%G+G)%G, gy=((cy+j)%G+G)%G, k=gy*G+gx; const dx = cx+i+pts[k*2]-fx, dy = cy+j+pts[k*2+1]-fy; const d = dx*dx+dy*dy; if (d<f1){ f2=f1; f1=d; id=k; } else if (d<f2) f2=d; }
      o.f1 = Math.sqrt(f1); o.f2 = Math.sqrt(f2); o.r = rnd[id]; return o; }; };
  const cl = v => v<0?0:v>1?1:v, mix = (a,b,t) => a+(b-a)*t;
  const hx = h => [(h>>16)&255,(h>>8)&255,h&255];
  const mixc = (A,B,t,o) => { o[0]=mix(A[0],B[0],t); o[1]=mix(A[1],B[1],t); o[2]=mix(A[2],B[2],t); return o; };
  const mul = (o,k) => { o[0]*=k; o[1]*=k; o[2]*=k; return o; };
  function paint(key, fn){ if (cache[key]) return cache[key]; const n = N(); const cc = document.createElement('canvas'), bc = document.createElement('canvas'); cc.width=cc.height=bc.width=bc.height=n;
    const cx = cc.getContext('2d'), bx = bc.getContext('2d'); const ci = cx.createImageData(n,n), bi = bx.createImageData(n,n); const out = { c:[0,0,0], h:0 }, W = {};
    for (let y=0;y<n;y++) for (let x=0;x<n;x++){ fn(x/n, y/n, out, W); const k=(y*n+x)*4; ci.data[k]=out.c[0]; ci.data[k+1]=out.c[1]; ci.data[k+2]=out.c[2]; ci.data[k+3]=255; const hv = cl(out.h)*255; bi.data[k]=bi.data[k+1]=bi.data[k+2]=hv; bi.data[k+3]=255; }
    cx.putImageData(ci,0,0); bx.putImageData(bi,0,0); return (cache[key] = { color:cc, bump:bc }); }
  const T = {
    /* miocardio vivo: rojo pardo con fibras oblicuas finas, moteado y vasitos subepicárdicos */
    myo(){ const n = fb(211,4,5), w = fb(223,3,3), ves = fb(229,6,4), sp = fb(233,32,2); return paint('myo', (u,v,o) => { const nn = n(u,v); const fib = Math.sin((u*52 + v*30 + 1.6*w(u,v))*Math.PI*2); const vv = Math.abs(ves(u,v)); const vl = 1 - cl(vv/0.035);
      mixc(hx(0x6A1D1A), hx(0xA23B31), cl(0.52+nn*1.1), o.c); mul(o.c, 0.93+0.07*fib); const s = sp(u,v); if (s > 0.3) mul(o.c, 1 - 0.12*cl((s-0.3)*6));
      mixc(o.c, hx(0x521421), 0.45*vl, o.c); o.h = 0.5 + 0.16*fib + 0.2*nn - 0.25*vl; }); },
    /* aurícula: pared fina, más oscura y con arrugas */
    atr(){ const n = fb(241,5,5), r = fb(251,12,3); return paint('atr2', (u,v,o) => { const nn = n(u,v), rr = r(u,v); const wr = Math.abs(rr); mixc(hx(0x5C1820), hx(0x923436), cl(0.5+nn), o.c); mul(o.c, 0.9 + 0.2*cl(wr*4)); o.h = 0.5 + 0.35*cl(wr*3) + 0.15*nn; }); },
    /* grasa epicárdica / subserosa: lobulillos amarillos con septos finos */
    fat(){ const w = worley(18, 263), n = fb(269,6,3); return paint('fat2', (u,v,o,W) => { w(u,v,W); const edge = cl((W.f2-W.f1)*6); const nn = n(u,v); mixc(hx(0xC9953E), hx(0xF1D286), cl(0.35 + 0.5*W.r + 0.4*nn), o.c); mul(o.c, 0.78 + 0.22*edge); o.h = 0.25 + 0.7*Math.sqrt(edge) + 0.05*nn; }); },
    /* músculo esquelético: fascículos paralelos (a lo largo de u) con perimisio claro y estrías finas */
    muscle(){ const n = fb(281,4,4), j = fb(283,8,3); return paint('musc', (u,v,o) => { const q = v*34 + 0.35*j(u,v); const f = q - Math.floor(q); const per = 1 - cl(Math.min(f, 1-f)/0.09); const fine = Math.sin(v*420*Math.PI*2);
      const nn = n(u,v); mixc(hx(0x7C231F), hx(0xB0403A), cl(0.55 + 0.9*nn), o.c); mul(o.c, 0.95 + 0.05*fine); mixc(o.c, hx(0xD9A9A0), 0.35*per, o.c); o.h = 0.55 - 0.35*per + 0.06*fine + 0.1*nn; }); },
    /* tendón / aponeurosis: blanco nacarado con fibras */
    tendon(){ const n = fb(291,4,3); return paint('tend', (u,v,o) => { const f = Math.sin((v*90 + 2*n(u,v))*Math.PI*2); mixc(hx(0xD9D2C4), hx(0xF4F0E6), cl(0.5+0.5*f*0.6+n(u,v)), o.c); o.h = 0.5+0.2*f; }); },
    /* hueso: marfil con poros finos y vetas de las láminas */
    bone(){ const n = fb(301,4,5), w = worley(40, 307), s = fb(311,2,3); return paint('bone', (u,v,o,W) => { w(u,v,W); const pore = 1 - cl(W.f1/0.12); const nn = n(u,v); const lam = Math.sin((v*18 + 3*s(u,v))*Math.PI*2);
      mixc(hx(0xD8CBAE), hx(0xF3ECDC), cl(0.55 + nn*0.9 + 0.025*lam), o.c); mul(o.c, 1 - 0.18*pore*pore); o.h = 0.55 + 0.2*nn - 0.3*pore*pore + 0.012*lam; }); },
    /* hígado: pardo rojizo con lobulillos diminutos visibles bajo la cápsula */
    liver(){ const w = worley(46, 321), n = fb(331,4,5), m = fb(337,16,2); return paint('liv', (u,v,o,W) => { w(u,v,W); const edge = 1 - cl((W.f2-W.f1)*9); const nn = n(u,v);
      mixc(hx(0x5E2016), hx(0x93402C), cl(0.5 + nn*1.1 + 0.15*m(u,v)), o.c); mul(o.c, 1 - 0.16*edge + 0.05*(W.r-0.5)); o.h = 0.5 - 0.2*edge + 0.15*nn; }); },
    /* serosa digestiva: rosa salmón con red capilar fina */
    serosa(){ const n = fb(341,4,5), a = fb(347,5,4), b = fb(349,9,3); return paint('ser', (u,v,o) => { const nn = n(u,v); const c1 = 1 - cl(Math.abs(a(u,v))/0.022), c2 = 1 - cl(Math.abs(b(u,v))/0.016);
      mixc(hx(0xC77866), hx(0xE7A993), cl(0.5 + nn), o.c); mixc(o.c, hx(0x9C2C2E), 0.55*c1 + 0.3*c2, o.c); o.h = 0.5 + 0.2*nn + 0.12*c1 + 0.08*c2; }); },
    /* riñón: pardo rojizo liso con leve moteado bajo la cápsula brillante */
    kidney(){ const n = fb(351,4,5), s = fb(353,24,2); return paint('kid', (u,v,o) => { const nn = n(u,v); mixc(hx(0x6E2620), hx(0x9E4436), cl(0.5 + nn), o.c); mul(o.c, 0.94 + 0.08*s(u,v)); o.h = 0.5 + 0.14*nn + 0.06*s(u,v); }); },
    /* páncreas: lobulillos glandulares color crema rosado */
    gland(){ const w = worley(30, 361), n = fb(367,4,4); return paint('gla', (u,v,o,W) => { w(u,v,W); const edge = cl((W.f2-W.f1)*5); mixc(hx(0xC99A72), hx(0xEBC7A0), cl(0.35 + 0.45*W.r + 0.5*n(u,v)), o.c); mul(o.c, 0.8 + 0.2*edge); o.h = 0.2 + 0.75*Math.sqrt(edge); }); },
    /* diafragma: fibras radiales pardo rojizas y centro tendinoso nacarado en trébol */
    dia(){ const n = fb(381,6,4); return paint('dia2', (u,v,o) => { const x=u-0.5, y=v-0.5, r=Math.hypot(x,y)*2, a=Math.atan2(y,x); const nn = n(u,v); const fib = Math.sin(a*150 + nn*5); const tre = 0.4 + 0.09*Math.cos(3*a+0.6); const tendon = cl((tre - r)*7 + nn*0.8);
      mixc(hx(0x5A2522), hx(0x7E3A33), cl(0.5+0.9*n(u*2,v*2)), o.c); mul(o.c, 0.92+0.08*fib); mixc(o.c, hx(0xE4DDD0), tendon, o.c); o.h = 0.5 + 0.14*fib*(1-tendon) + 0.1*nn; }); },
    /* sustancia nerviosa / nervio: blanco amarillento con fascículos */
    nerve(){ const n = fb(371,4,3); return paint('nerv', (u,v,o) => { const q = v*16 + 0.4*n(u,v); const f = q - Math.floor(q); const e = 1 - cl(Math.min(f,1-f)/0.12); mixc(hx(0xE8D6A8), hx(0xF7ECCF), cl(0.5 + n(u,v)), o.c); mul(o.c, 1 - 0.14*e); o.h = 0.6 - 0.3*e; }); }
  };
  function texFrom(canvas, srgb, rep){ const t = new THREE.CanvasTexture(canvas); t.wrapS = t.wrapT = THREE.RepeatWrapping; if (srgb) t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; if (rep) t.repeat.set(rep[0], rep[1]); return t; }
  /* material de tejido: o.tex = clave de T; resto como Kit.tissue */
  function mat(o={}){ const m = new THREE.MeshPhysicalMaterial({ color: o.color ?? 0xffffff, roughness: o.rough ?? 0.5, metalness: 0, clearcoat: o.coat ?? 0.5, clearcoatRoughness: o.coatRough ?? 0.3, side: o.side ?? THREE.FrontSide, vertexColors: !!o.vc, transparent: !!o.transparent, opacity: o.opacity ?? 1, depthWrite: o.depthWrite ?? !o.transparent, envMapIntensity: o.env ?? 1 });
    if (o.tex){ const P = T[o.tex](); m.map = texFrom(P.color, true, o.rep); if (o.bump !== 0){ m.bumpMap = texFrom(P.bump, false, o.rep); m.bumpScale = o.bump ?? 0.02; } }
    return m; }
  /* hex sRGB → color lineal (el material trata el color como lineal) */
  const lin = hex => { const c = new THREE.Color(hex); return c.setRGB(Math.pow(c.r,2.2), Math.pow(c.g,2.2), Math.pow(c.b,2.2)); };
  return { T, mat, lin, paint, fb, worley };
})();

/* Encuadre adaptable: en escenarios estrechos (móvil) aleja la cámara inicial para que el órgano y sus lupas
   quepan a lo ancho; «need» es la proporción ancho/alto que ocupa el contenido en la vista inicial. */
function orgvFrame(E, need){ const c = E.container; const asp = (c.clientWidth || 1) / (c.clientHeight || 1); const k = Math.min(1.6, Math.max(1, (need || 1.42) / asp));
  if (k > 1.01){ E.opts.radius *= k; E.sph.r = E.goal.r = E.opts.radius; E.opts.maxR = Math.max(E.opts.maxR, E.opts.radius*1.25); } }
function buildHeart(E){
  orgvFrame(E, 1.0); const low = E.low; const D = BIO.heart; const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s = S[id]; const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, interno:s.interno, explodeDir: V3(s.pos).sub(new THREE.Vector3(0,-0.2,0)).normalize() }, extra)); E.addLabel(id, s.nombre, s.lbl); return p; };
  /* miocardio vivo: fibras oblicuas, epicardio húmedo (barniz), aurículas más finas y arrugadas */
  const muscle = (tint, tex='myo') => orgvTex.mat({ tex, rep: tex==='myo' ? [3,2] : [4,3], bump: tex==='myo' ? 0.022 : 0.028, coat:0.85, coatRough:0.2, rough:0.46, color:tint, env:0.9 });
  const Q = (a,b) => low ? a : b;
  const chamber = o => { const g = Kit.sculpt({ w:o.w, h:o.h, shape: d => { const p = d.clone(); if (o.apex && d.y<0){ const k = 1 - o.apex*Math.pow(-d.y,1.7); p.x*=k; p.z*=k; } if (o.flatBack && d.z<0) p.z*=o.flatBack; if (o.flatTop && d.y>0) p.y*=o.flatTop; p.x*=o.r[0]; p.y*=o.r[1]; p.z*=o.r[2]; return p; },
      disp: p => o.amp*Kit.fbm(p.x*o.f+o.seed, p.y*o.f, p.z*o.f, 3) });
    const m = new THREE.Mesh(g, o.mat); m.position.set(...o.c); if (o.rot) m.rotation.set(...o.rot); return m; };
  /* orejuela: lámina muscular aplanada y curvada, con borde festoneado (músculos pectíneos) */
  const auricle = o => { const g = Kit.sculpt({ w:Q(40,64), h:Q(28,44), shape: d => { const tip = smooth01((d.x+0.2)/1.2); let x = d.x*o.len, y = d.y*o.th*(1-0.45*tip), z = d.z*o.wid*(1-0.55*tip);
        y += o.curl*x*x; z += o.sweep*x*x; return new THREE.Vector3(x, y, z); },
      disp: (p,d) => { const a = Math.atan2(d.z, d.x); const rim = Math.pow(1-Math.abs(d.y), 3); return 0.045*rim*Math.sin(a*o.lobes + o.seed) + 0.018*Kit.fbm(p.x*6+o.seed, p.y*6, p.z*6, 2); } });
    const m = new THREE.Mesh(g, o.mat); m.position.set(...o.c); m.rotation.set(...o.rot); return m; };

  /* --- cámaras --- */
  /* Masa ventricular única, dividida por el plano del tabique: surcos interventriculares sin costuras */
  const VR = [1.45,1.72,1.22], VC = [0.25,-0.9,0.05], VROT = [-0.25,0,0.4];
  const sIV = (x,y,z) => 0.75*z - 0.62*x + 0.38*y;   // coordenadas normalizadas; >0.05 → ventrículo derecho
  const vg = Kit.sculpt({ w:Q(72,128), h:Q(54,96), shape: d => { const p = d.clone(); if (d.y<0){ const k = 1 - 0.6*Math.pow(-d.y,1.6); p.x*=k; p.z*=k; } if (d.y>0) p.y*=0.72; if (d.z<0) p.z*=0.85; return p.multiply(V3(VR)); },
    disp: (p,d) => { const n = d; const sv = sIV(n.x, n.y, n.z) - 0.05; const base = smooth01((d.y-0.45)/0.35);
      return 0.022*Kit.fbm(p.x*2+1, p.y*2, p.z*2, 3) + 0.006*Kit.n3(p.x*9, p.y*9, p.z*9) - 0.075*Math.exp(-Math.pow(sv/0.06,2)) - 0.05*base; }, store: (p,d) => sIV(d.x,d.y,d.z) - 0.05 });
  const vParts = Kit.splitPlane(vg, i => vg.userData.extra[i], 'lv', 'rv');
  const lv = new THREE.Mesh(vParts.lv, muscle(0xffffff)), rv = new THREE.Mesh(vParts.rv, muscle(0xfff0ec));
  [lv, rv].forEach(m => { m.position.set(...VC); m.rotation.set(...VROT); });
  const conus = chamber({ w:Q(36,56), h:Q(26,40), r:[0.4,0.66,0.38], c:[0.04,0.12,0.66], rot:[-0.15,0,-0.5], amp:0.022, f:2.4, seed:5, mat:rv.material });
  const raM = muscle(0xffffff,'atr'), laM = muscle(0xfff4f2,'atr');
  const ra = chamber({ w:Q(44,72), h:Q(32,54), r:[0.74,0.98,0.72], c:[-1.12,0.62,-0.05], amp:0.026, f:3.2, seed:7, mat:raM });
  /* orejuela derecha: ancha y triangular, abraza la raíz de la aorta */
  const raA = auricle({ len:0.66, th:0.2, wid:0.36, curl:-0.18, sweep:0.25, lobes:9, seed:1, c:[-0.62,1.06,0.52], rot:[0.25,-0.85,0.45], mat:raM });
  const la = chamber({ w:Q(44,72), h:Q(32,54), r:[0.8,0.6,0.66], c:[0.7,0.8,-0.72], amp:0.026, f:3.0, seed:11, mat:laM });
  /* orejuela izquierda: estrecha y en gancho, asoma junto al tronco pulmonar */
  const laA = auricle({ len:0.6, th:0.17, wid:0.26, curl:-0.28, sweep:-0.2, lobes:11, seed:3, c:[1.27,0.86,0.28], rot:[0.2,0.55,-0.55], mat:laM });
  const tag = (arr, sub) => { arr.forEach(m => m.userData.sub = sub); return arr; };
  raA.userData.sub = 'orejuela'; laA.userData.sub = 'orejuela'; conus.userData.sub = 'cono';
  add('ventriculo-izquierdo', [lv]); add('ventriculo-derecho', [rv, conus]); add('auricula-derecha', [ra, raA]); add('auricula-izquierda', [la, laA]);
  const sep = chamber({ w:36, h:28, r:[0.07,0.95,0.62], c:[0,0,0], amp:0.01, f:3, seed:15, mat:muscle(0xE8C4C0) });
  { const nl = new THREE.Vector3(-0.62/VR[0], 0.38/VR[1], 0.75/VR[2]).normalize(); const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(...VROT)); const nw = nl.clone().applyQuaternion(q);
    const cl = new THREE.Vector3(0.0, -0.1*VR[1], (0.05+0.38*0.25)/0.75*VR[2]).applyQuaternion(q).add(V3(VC)); sep.position.copy(cl); sep.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0), nw).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), 0)); }
  add('tabique', [sep], { explodeDir:new THREE.Vector3(0,0,1) });

  /* --- grandes vasos --- */
  const artMat = () => Kit.tissue({ tex:'artery', rep:[5,1], bump:0.012, coat:0.3, coatRough:0.34, rough:0.55, env:0.8 });
  const veinMat = () => Kit.tissue({ tex:'vein', rep:[5,1], bump:0.012, coat:0.3, coatRough:0.34, rough:0.55, env:0.8 });
  const vessel = (pts, r0, r1, m, caps, lumen, o={}) => { const g = Kit.taper(pts, r0, r1, Object.assign({ seg:Q(28,48), rad:Q(12,20) }, o)); const c = g.userData.curve; const out = [new THREE.Mesh(g, m)]; if (caps.includes(1)) out.push(...Kit.cap(c, true, g.userData.r1, m, lumen)); if (caps.includes(0)) out.push(...Kit.cap(c, false, g.userData.r0, m, lumen)); return out; };
  const LA_ = 0x3a0d0c, LV_ = 0x141a36;
  const aM = artMat();
  const aorta = [
    ...tag(vessel([[0.1,0.35,-0.1],[-0.2,1.4,0.1],[-0.3,2.3,0.05],[0.0,3.05,-0.3],[0.75,3.0,-0.85],[1.05,2.3,-1.25],[1.05,1.0,-1.35],[1.0,-1.0,-1.4],[0.95,-2.45,-1.4]], 0, 0, aM, [1], LA_, { rfn:u => 0.27 + 0.07*Math.exp(-Math.pow((u-0.03)/0.04,2)) + 0.04*(1-u), seg: Q(60,110) }),'main'),
    ...tag(vessel([[-0.05,2.95,-0.2],[-0.3,3.55,-0.2],[-0.47,3.95,-0.15]], 0.17, 0.14, aM, [1], LA_, { seg:Q(12,20) }),'bt'),
    ...tag(vessel([[0.32,3.08,-0.45],[0.36,3.6,-0.47],[0.38,3.92,-0.48]], 0.12, 0.11, aM, [1], LA_, { seg:Q(12,20) }),'cci'),
    ...tag(vessel([[0.6,3.02,-0.72],[0.8,3.5,-0.8],[0.93,3.85,-0.82]], 0.13, 0.12, aM, [1], LA_, { seg:Q(12,20) }),'sci')
  ];
  add('aorta', aorta);
  const pM = veinMat();
  add('arteria-pulmonar', [
    ...tag(vessel([[0.3,0.62,0.72],[0.42,1.3,0.52],[0.45,1.9,0.12]], 0.35, 0.31, pM, [], LV_),'tronco'),
    ...tag(vessel([[0.45,1.9,0.12],[1.1,2.05,-0.25],[1.95,2.0,-0.35]], 0.28, 0.22, pM, [1], LV_),'izq'),
    ...tag(vessel([[0.45,1.9,0.12],[-0.1,1.95,-0.6],[-1.2,1.9,-0.68],[-2.3,1.85,-0.6]], 0.27, 0.22, pM, [1], LV_),'der')
  ]);
  const cM = veinMat();
  add('vena-cava-superior', vessel([[-1.05,3.4,0.0],[-1.12,2.4,0.05],[-1.15,1.45,0.02]], 0.27, 0.28, cM, [0], LV_));
  add('vena-cava-inferior', vessel([[-1.15,0.2,-0.15],[-1.2,-0.9,-0.4],[-1.25,-2.35,-0.45]], 0.3, 0.3, veinMat(), [1], LV_));
  const pvM = artMat();
  add('venas-pulmonares', [
    ...tag(vessel([[0.2,1.0,-1.05],[-0.7,1.15,-1.25],[-1.7,1.25,-1.2]], 0.15, 0.13, pvM, [1], LA_, { rad:Q(10,14) }),'der'),
    ...tag(vessel([[0.25,0.62,-1.05],[-0.7,0.58,-1.3],[-1.7,0.52,-1.25]], 0.15, 0.13, pvM, [1], LA_, { rad:Q(10,14) }),'der'),
    ...tag(vessel([[1.3,1.0,-0.8],[1.9,1.2,-0.9],[2.5,1.35,-0.85]], 0.15, 0.13, pvM, [1], LA_, { rad:Q(10,14) }),'izq'),
    ...tag(vessel([[1.3,0.62,-0.85],[1.9,0.58,-0.95],[2.5,0.52,-0.9]], 0.15, 0.13, pvM, [1], LA_, { rad:Q(10,14) }),'izq')
  ]);

  /* --- vasos coronarios y grasa epicárdica, pegados a la superficie ---
     Grasa amarilla lobulada que rellena el surco coronario (auriculoventricular) y el interventricular anterior;
     encima, medio hundidas en ella, las arterias con sus ramas y las venas cardíacas. */
  const surf = [lv, rv, ra, la, raA, laA, conus]; const ctr = new THREE.Vector3(0.1,-0.4,0.1);
  const RW = Kit.rng(41);
  /* recorrido tortuoso: ondula el trazo antes de pegarlo a la superficie */
  const wig = (pts, n, amp) => { const d = Kit.densify(pts, n); const k = RW()*10; return d.map((p,i) => { const w = amp*Math.sin(i*0.9 + k)*(i>0 && i<d.length-1 ? 1 : 0); return p.clone().add(new THREE.Vector3(w*0.7, w*0.4, -w*0.5)); }); };
  const onSurf = (pts, n, lift, amp=0) => Kit.snap(amp ? wig(pts, n, amp) : Kit.densify(pts, n), surf, ctr, lift);
  const corA = orgvTex.mat({ color:orgvTex.lin(0xA8322A), rough:0.34, coat:0.9, coatRough:0.16, env:0.9 }), corV = orgvTex.mat({ color:orgvTex.lin(0x3C4A86), rough:0.36, coat:0.9, coatRough:0.16, env:0.9 });
  const fatM = orgvTex.mat({ tex:'fat', rep:[10,1], bump:0.03, coat:0.75, coatRough:0.22, rough:0.4, env:0.85 });
  const cor = []; const route = (pts, n, r0, r1, m, lift, amp=0.03) => { if (lift === undefined) lift = r0*0.55 + 0.012; const s = onSurf(pts, n, lift, amp); if (s.length>3){ const me = new THREE.Mesh(Kit.taper(s, r0, r1, { seg: Q(20,40), rad:Q(7,10) }), m); me.userData.sub = m===corA ? 'art' : 'ven'; cor.push(me); } return s; };
  const fat = (pts, n, r, r1) => { const s = onSurf(pts, n, -0.07); if (s.length>3) { const g = Kit.taper(s, r, r1 ?? r*0.6, { seg: Q(28,56), rad:Q(10,14), bumpy:0.16, bf:16, seed:3 }); const me = new THREE.Mesh(g, fatM); me.userData.sub = 'grasa'; cor.push(me); } };
  /* grasa: surco coronario derecho e izquierdo, interventricular anterior, borde agudo y base de los grandes vasos */
  fat([[-0.25,0.42,1.12],[-1.0,0.27,1.02],[-1.6,-0.03,0.57],[-1.76,-0.6,-0.1],[-1.3,-1.02,-0.7]], 26, 0.23, 0.15);
  fat([[0.78,0.4,0.98],[1.45,0.32,0.42],[1.76,0.16,-0.3],[1.45,0.05,-1.0]], 22, 0.21, 0.14);
  fat([[0.5,0.36,1.3],[0.4,-0.4,1.36],[0.36,-1.1,1.26],[0.6,-1.8,1.06],[0.95,-2.2,0.72]], 26, 0.2, 0.07);
  fat([[-1.58,-0.1,0.6],[-1.42,-0.8,0.86],[-1.05,-1.42,0.92]], 12, 0.1, 0.05);
  fat([[-0.28,0.5,1.12],[0.05,0.4,1.22],[0.32,0.42,1.24],[0.6,0.46,1.18]], 12, 0.15, 0.13);
  /* coronaria derecha y sus ramas (conal, ventriculares anteriores, marginal aguda) */
  route([[-0.3,0.44,1.12],[-1.0,0.28,1.02],[-1.6,-0.04,0.57],[-1.76,-0.6,-0.1],[-1.25,-1.1,-0.65]], 30, 0.072, 0.045, corA, 0.13, 0.02);
  route([[-0.34,0.42,1.13],[-0.05,0.3,1.2],[0.18,0.14,1.18]], 10, 0.032, 0.018, corA);
  route([[-0.85,0.28,1.04],[-0.8,-0.2,1.1],[-0.7,-0.75,1.12]], 12, 0.034, 0.018, corA);
  route([[-1.3,0.14,0.85],[-1.25,-0.45,0.98],[-1.12,-0.95,1.0]], 12, 0.03, 0.016, corA);
  route([[-1.6,-0.05,0.6],[-1.45,-0.8,0.86],[-1.05,-1.45,0.92]], 14, 0.045, 0.022, corA, undefined, 0.035);
  /* descendente anterior con diagonales hacia el ventrículo izquierdo y ramas cortas hacia el derecho */
  route([[0.52,0.38,1.3],[0.4,-0.4,1.36],[0.35,-1.1,1.26],[0.6,-1.8,1.06],[1.02,-2.35,0.6]], 34, 0.07, 0.028, corA, 0.13, 0.025);
  route([[0.42,-0.05,1.36],[0.9,-0.4,1.16],[1.35,-0.78,0.82],[1.62,-1.1,0.46]], 16, 0.04, 0.018, corA, undefined, 0.04);
  route([[0.38,-0.72,1.32],[0.8,-1.08,1.13],[1.22,-1.45,0.8]], 14, 0.034, 0.016, corA, undefined, 0.04);
  route([[0.45,-1.45,1.2],[0.8,-1.76,0.96],[1.05,-1.95,0.72]], 10, 0.026, 0.014, corA);
  route([[0.37,-0.5,1.35],[0.1,-0.78,1.3],[-0.1,-1.0,1.24]], 10, 0.024, 0.013, corA);
  /* circunfleja por el surco coronario izquierdo, con ramas marginales obtusas */
  route([[0.8,0.42,0.96],[1.45,0.33,0.42],[1.76,0.17,-0.3],[1.45,0.06,-1.0]], 24, 0.06, 0.036, corA, 0.13, 0.02);
  route([[1.5,0.3,0.36],[1.7,-0.4,0.32],[1.76,-1.1,0.22],[1.6,-1.62,0.1]], 16, 0.04, 0.018, corA, undefined, 0.04);
  route([[1.72,0.13,-0.24],[1.95,-0.7,-0.1],[1.82,-1.4,0.0]], 12, 0.036, 0.016, corA, undefined, 0.04);
  /* venas cardíacas: magna (junto a la descendente anterior y luego por el surco izquierdo) y anteriores */
  route([[0.68,0.3,1.3],[0.58,-0.4,1.36],[0.54,-1.1,1.27],[0.78,-1.75,1.05]], 26, 0.05, 0.028, corV, undefined, 0.03);
  route([[0.7,0.36,1.26],[1.0,0.44,0.9],[1.55,0.38,0.34],[1.82,0.26,-0.36]], 18, 0.05, 0.045, corV, 0.12, 0.015);
  route([[-0.25,-0.9,1.1],[-0.5,-1.4,0.96]], 8, 0.034, 0.02, corV);
  route([[-0.98,-0.35,1.06],[-1.05,0.18,1.02]], 8, 0.03, 0.022, corV);
  route([[1.2,-0.3,0.95],[1.3,-0.95,0.72],[1.25,-1.5,0.5]], 10, 0.03, 0.016, corV, undefined, 0.03);
  if (cor.length) add('vasos-coronarios', cor);

  /* --- válvulas con valvas --- */
  const leafMat = () => Kit.tissue({ color:0xEFE2D2, rough:0.35, coat:0.6, side:THREE.DoubleSide, tex:'tissue', rep:[1,1], bump:0.004 });
  const X = new THREE.Vector3(1,0,0);
  const valves = [];
  const valve = (id, c, axis, r, n, semilunar) => { const C = V3(c), A = V3(axis).normalize(); const U = new THREE.Vector3().crossVectors(A, Math.abs(A.y)<0.9 ? new THREE.Vector3(0,1,0) : new THREE.Vector3(1,0,0)).normalize(); const W = new THREE.Vector3().crossVectors(A, U).normalize();
    const m0 = leafMat(); const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 10, 40), Kit.tissue({ color:0xE6D3BE, rough:0.4, coat:0.5 })); ring.position.copy(C); ring.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), A);
    ring.userData.sub = 'anillo'; const meshes = [ring]; const span = Math.PI*2/n, gap = 0.05;
    for (let k=0;k<n;k++){ const th = k*span + span/2; const rd = U.clone().multiplyScalar(Math.cos(th)).addScaledVector(W, Math.sin(th)); const td = U.clone().multiplyScalar(-Math.sin(th)).addScaledVector(W, Math.cos(th)); const H = C.clone().addScaledVector(rd, r);
      const Q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(td, rd.clone().negate(), A)); const Qi = Q.clone().invert();
      const NS = 7, NT = 9, P = [], I = []; for (let i=0;i<=NS;i++){ const s = i/NS; for (let j=0;j<=NT;j++){ const t = j/NT*2-1; const ang = th + t*(span/2-gap)*(1-0.35*s); const dir = U.clone().multiplyScalar(Math.cos(ang)).addScaledVector(W, Math.sin(ang)); const w = C.clone().addScaledVector(dir, r*(1-s*0.96)).addScaledVector(A, (semilunar?-1:1)*0.22*r*Math.sin(Math.PI*s*0.9)*(1-Math.abs(t)*0.3)); w.sub(H).applyQuaternion(Qi); P.push(w.x,w.y,w.z); } }
      for (let i=0;i<NS;i++) for (let j=0;j<NT;j++){ const a=i*(NT+1)+j, b=a+1, cc=a+NT+1, d=cc+1; I.push(a,cc,b, b,cc,d); }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P,3)); g.setIndex(I); g.computeVertexNormals(); const uv = []; for (let i=0;i<=NS;i++) for (let j=0;j<=NT;j++) uv.push(j/NT, i/NS); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv,2));
      const leaf = new THREE.Mesh(g, m0); leaf.position.copy(H); leaf.quaternion.copy(Q); leaf.userData.q0 = Q.clone(); leaf.userData.leaf = true; leaf.userData.sub = 'valvas'; meshes.push(leaf); }
    add(id, meshes); valves.push({ id, meshes, semilunar, open:0 }); };
  valve('valvula-tricuspide', S['valvula-tricuspide'].pos, [0.25,-1,0.25], 0.32, 3, false);
  valve('valvula-mitral', S['valvula-mitral'].pos, [-0.1,-1,0.35], 0.31, 2, false);
  valve('valvula-pulmonar', S['valvula-pulmonar'].pos, [0.15,1,-0.25], 0.3, 3, true);
  valve('valvula-aortica', S['valvula-aortica'].pos, [-0.25,1,0.2], 0.3, 3, true);

  /* --- flujo sanguíneo: glóbulos rojos (discos bicóncavos simplificados) --- */
  const paths = [
    { oxy:false, pts:[[-1.05,3.4,0.0],[-1.12,2.4,0.05],[-1.15,1.45,0.02],[-1.1,0.75,0.0],[-0.85,0.15,0.2],[-0.5,-0.5,0.45],[-0.3,-0.9,0.55],[-0.1,-0.3,0.72],[0.3,0.62,0.72],[0.42,1.3,0.52],[0.45,1.9,0.12],[-0.1,1.95,-0.6],[-1.2,1.9,-0.68],[-2.3,1.85,-0.6]] },
    { oxy:false, pts:[[-1.25,-2.4,-0.45],[-1.2,-0.9,-0.4],[-1.15,0.2,-0.15],[-1.1,0.7,0.0],[-0.85,0.15,0.2],[-0.45,-0.55,0.45],[-0.2,-0.8,0.6],[-0.05,-0.2,0.74],[0.3,0.62,0.72],[0.42,1.3,0.52],[0.45,1.9,0.12],[1.1,2.05,-0.25],[1.95,2.0,-0.35]] },
    { oxy:true, pts:[[-1.7,1.25,-1.2],[-0.7,1.15,-1.25],[0.2,1.0,-1.05],[0.7,0.8,-0.65],[0.62,0.05,-0.35],[0.8,-0.9,-0.1],[1.0,-1.6,0.05],[0.6,-0.8,-0.05],[0.1,0.38,-0.1],[-0.2,1.4,0.1],[-0.3,2.3,0.05],[0.0,3.05,-0.3],[0.75,3.0,-0.85],[1.05,2.3,-1.25],[1.05,1.0,-1.35],[0.95,-2.6,-1.4]] },
    { oxy:true, pts:[[2.5,1.35,-0.85],[1.9,1.2,-0.9],[1.3,1.0,-0.8],[0.7,0.8,-0.65],[0.62,0.05,-0.35],[0.9,-1.0,-0.05],[0.55,-0.7,-0.1],[0.1,0.38,-0.1],[-0.2,1.4,0.1],[-0.3,2.3,0.05],[-0.05,2.95,-0.2],[-0.35,3.6,-0.2],[-0.5,4.05,-0.15]] }
  ];
  const flow = { on:false, speed:1, meshes:[] };
  const rbcG = new THREE.SphereGeometry(0.075, low?10:12, low?7:8); { const p = rbcG.attributes.position; for (let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i); const rr = Math.hypot(x,z)/0.075; p.setY(i, y*0.42*(0.55+0.6*rr*rr)); } rbcG.computeVertexNormals(); }
  const oxyM = new THREE.MeshPhysicalMaterial({ color:0xE0342E, emissive:0x8a1010, emissiveIntensity:0.35, roughness:0.35, clearcoat:0.8 }), deoM = new THREE.MeshPhysicalMaterial({ color:0x4660C8, emissive:0x1a2a70, emissiveIntensity:0.35, roughness:0.35, clearcoat:0.8 });
  const RR = Kit.rng(21);
  paths.forEach(p => { const curve = Kit.curve(p.pts); const n = low ? 12 : 22; for (let i=0;i<n;i++){ const m = new THREE.Mesh(rbcG, p.oxy ? oxyM : deoM); m.userData = { t:i/n, curve, spin:new THREE.Vector3(RR()*2-1,RR()*2-1,RR()*2-1).normalize(), off:new THREE.Vector3(RR()-0.5,RR()-0.5,RR()-0.5).multiplyScalar(0.12) }; m.rotation.set(RR()*3,RR()*3,RR()*3); m.visible=false; E.scene.add(m); flow.meshes.push(m); } });

  const beatParts = { atr:['auricula-derecha','auricula-izquierda'], ven:['ventriculo-derecho','ventriculo-izquierdo','tabique'] };
  const model = {
    flow, beat:{ on:false, speed:1, phase:0.6 }, opacity:1,
    setFlow(on){ flow.on = on; flow.meshes.forEach(m => m.visible = on); },
    setBeat(on){ this.beat.on = on; if (!on){ [...beatParts.atr, ...beatParts.ven, 'vasos-coronarios'].forEach(id => { const p = E.parts.get(id); p && p.meshes.forEach(m=>m.scale.copy(m.userData.baseScale)); }); valves.forEach(v => { v.open = 0; setLeaves(v, 0); }); } },
    setLayer(capa, on){ D.structures.filter(s=>s.capa===capa).forEach(s => E.setVisible(s.id, on)); },
    setOpacity(o){ this.opacity=o; D.structures.forEach(s => { if (s.capa==='camaras' && !s.interno) E.setOpacity(s.id, o); }); E.setOpacity('vasos-coronarios', o<0.6 ? Math.max(o,0.25) : 1); },
    phaseName(){ const p = this.beat.phase; return p<0.15 ? 'Sístole auricular · las aurículas se contraen; tricúspide y mitral abiertas' : p<0.45 ? 'Sístole ventricular · se cierran tricúspide y mitral ("lub"); se abren pulmonar y aórtica' : 'Diástole · se cierran pulmonar y aórtica ("dub"); el corazón se relaja y se llena'; },
    phaseText(){ return this.beat.on ? this.phaseName() : ''; },
    setSpeed(k){ this.beat.speed=k; this.flow.speed=k; },
    legend:[{color:'var(--deoxy)',txt:'Glóbulos rojos con poco O₂ (lado derecho, arteria pulmonar)'},{color:'var(--oxy)',txt:'Glóbulos rojos cargados de O₂ (lado izquierdo, aorta)'},{color:'#EFE2D2',txt:'Valvas: se abren y cierran con cada fase'}],
    observa:'el lado derecho y el izquierdo se contraen al mismo tiempo, pero la sangre de cada lado nunca se mezcla. Mira las valvas: cuando los ventrículos se contraen, la tricúspide y la mitral se cierran y la pulmonar y la aórtica se abren.'
  };
  model.anims = [
    { id:'latido', label:'Latido y válvulas (ciclo cardíaco)', get on(){ return model.beat.on; }, set(on){ model.setBeat(on); } },
    { id:'flujo', label:'Flujo sanguíneo (glóbulos rojos)', get on(){ return model.flow.on; }, set(on){ model.setFlow(on); }, needsOpacity:0.5 }
  ];
  const qT = new THREE.Quaternion();
  function setLeaves(v, open){ v.meshes.forEach(m => { if (!m.userData.leaf) return; m.quaternion.copy(m.userData.q0).multiply(qT.setFromAxisAngle(X, open*(v.semilunar?1.05:1.2))); }); }
  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (flow.on) flow.meshes.forEach(m => { const u = m.userData; u.t = (u.t + dt*0.055*flow.speed) % 1; m.position.copy(u.curve.getPointAt(u.t)).add(u.off); m.rotateOnAxis(u.spin, dt*2); });
    if (model.beat.on){ model.beat.phase = (model.beat.phase + dt*0.9*model.beat.speed) % 1; const p = model.beat.phase;
      const atr = p<0.15 ? 1-0.08*Math.sin(p/0.15*Math.PI) : 1; const ven = (p>=0.15 && p<0.45) ? 1-0.085*Math.sin((p-0.15)/0.3*Math.PI) : 1;
      beatParts.atr.forEach(id => E.parts.get(id).meshes.forEach(m => m.scale.copy(m.userData.baseScale).multiplyScalar(atr)));
      beatParts.ven.forEach(id => E.parts.get(id).meshes.forEach(m => m.scale.copy(m.userData.baseScale).multiplyScalar(ven)));
      const cp = E.parts.get('vasos-coronarios'); if (cp) cp.meshes.forEach(m => m.scale.setScalar(0.35+0.65*ven));
      valves.forEach(v => { const target = v.semilunar ? ((p>0.17 && p<0.43) ? 1 : 0) : ((p<0.15 || p>0.47) ? 1 : 0); v.open += (target - v.open)*Math.min(1, dt*14); setLeaves(v, v.open); }); }
  });
  return model;
}
</script>
