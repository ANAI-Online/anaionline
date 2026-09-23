<script>
/* =====================================================================
   MODELO: CÉLULA ANIMAL DETALLADA (vista en corte, simplificada)
   Membrana de doble capa con proteínas, envoltura nuclear con poros,
   cromatina y nucléolo, mitocondrias abiertas con crestas, cisternas del
   RER con ribosomas, red del REL, Golgi con vesículas, lisosomas,
   centríolos 9×3 y citoesqueleto.
   ===================================================================== */
/* ---------- utilidades visuales compartidas (prefijo cel: también las usa 40-celula-ampliada) ---------- */
/* Membrana translúcida "de atlas": casi transparente de frente y más densa en el contorno (efecto Fresnel),
   así se lee el interior sin perder la silueta. min = fracción de opacidad que queda de frente. */
function celFresnel(mat, min=0.3, pw=1.7){
  const prev = mat.userData.celPrev, key = 'celFr' + (mat.userData.celKey || '');
  mat.onBeforeCompile = (sh, r) => { if (prev) prev(sh, r); sh.uniforms.uFrMin = { value:min }; sh.uniforms.uFrPw = { value:pw };
    sh.fragmentShader = 'uniform float uFrMin;\nuniform float uFrPw;\n' + sh.fragmentShader.replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
      'float celFr = 1.0 - abs(dot(normalize(normal), normalize(vViewPosition)));\n\tdiffuseColor.a *= mix(uFrMin, 1.0, pow(clamp(celFr,0.0,1.0), uFrPw));\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );'); };
  mat.customProgramCacheKey = () => key;
  return mat;
}
/* Envoltura que se disuelve (profase) y se vuelve a formar (telofase): descarta los fragmentos cuyo ruido
   queda por debajo de uDiss (0 = intacta, 1 = desaparecida) y aclara el borde de cada rotura.
   La geometría necesita el atributo aN (0..1); celNoiseAttr lo calcula. Devuelve el uniforme. */
function celDissolve(mat){
  const u = { value:0 };
  const fn = sh => { sh.uniforms.uDiss = u;
    sh.vertexShader = 'attribute float aN;\nvarying float vCelN;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n\tvCelN = aN;');
    sh.fragmentShader = 'uniform float uDiss;\nvarying float vCelN;\n' + sh.fragmentShader.replace('void main() {', 'void main() {\n\tif (vCelN < uDiss) discard;')
      .replace('#include <color_fragment>', '#include <color_fragment>\n\tdiffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.96,0.93,1.0), 0.65*step(0.001,uDiss)*smoothstep(uDiss+0.07, uDiss, vCelN));'); };
  mat.onBeforeCompile = fn; mat.userData.celPrev = fn; mat.userData.celKey = 'diss'; mat.customProgramCacheKey = () => 'celDiss';
  return u;
}
function celNoiseAttr(g, f=2.3, seed=0){ const p = g.attributes.position, a = new Float32Array(p.count);
  for (let i=0;i<p.count;i++){ const x = p.getX(i), y = p.getY(i), z = p.getZ(i), l = Math.hypot(x,y,z) || 1; a[i] = Math.min(1, Math.max(0, 0.5 + 1.15*Kit.fbm(x/l*f + seed, y/l*f, z/l*f, 3))); }
  g.setAttribute('aN', new THREE.BufferAttribute(a, 1)); return g; }
/* Cresta mitocondrial: lámina con volumen (extrusión biselada) pegada a la membrana interna.
   Plano local XZ (normal Y); se apoya en el círculo de radio rho por el lado -X y avanza hasta x = tip·rho. */
/* En escenarios angostos (móvil) aleja la cámara para que la célula entera quepa a lo ancho */
function celFitAspect(E, stage, k0=1.35, kmax=1.7){ if (!E) return; const w = stage.clientWidth || 800, hh = stage.clientHeight || 560, k = Math.min(kmax, Math.max(1, k0/(w/hh)));
  if (k > 1){ E.opts.radius *= k; E.goal.r = E.sph.r = E.opts.radius; E.opts.maxR = Math.max(E.opts.maxR, E.opts.radius*1.3); } }
/* Malla "instanciada" de una sola copia: el contorno de selección del motor la omite (evita halos sobre detalles finos) */
function celInst1(g, mat){ const m = new THREE.InstancedMesh(g, mat, 1); m.setMatrixAt(0, new THREE.Matrix4()); m.instanceMatrix.needsUpdate = true; return m; }
function celTongue(rho, hw, tip, thick, low){
  const b = Math.min(thick*0.45, 0.03), R = Math.max(rho - b, 0.05), w = Math.min(hw, R*0.92), c = Math.sqrt(R*R - w*w), tx = Math.max(tip*R, -c + w*1.2);
  const s = new THREE.Shape(); const a = Math.asin(w/R);
  s.moveTo(-c, -w); s.lineTo(tx - w, -w); s.absarc(tx - w, 0, w, -Math.PI/2, Math.PI/2, false); s.lineTo(-c, w); s.absarc(0, 0, R, Math.PI - a, Math.PI + a, false);
  const g = new THREE.ExtrudeGeometry(s, { depth:thick, bevelEnabled:true, bevelThickness:b, bevelSize:b*0.8, bevelSegments:low?1:2, curveSegments:low?5:9 });
  g.translate(0, 0, -thick/2); g.rotateX(Math.PI/2); g.deleteAttribute('uv'); return g;
}

function buildCell(E){
  const low = E.low; const S = Object.fromEntries(BIO.cell.structures.map(s=>[s.id,s]));
  const add = (id, meshes, lblPos, extra={}) => { const p = E.addPart(id, meshes, Object.assign({ explodeDir: V3(lblPos).normalize() }, extra)); E.addLabel(id, S[id].nombre, lblPos); return p; };
  const R = Kit.rng(17);
  const CAM = new THREE.Vector3(0.37,0.32,0.87).normalize();
  const phiC = Math.atan2(CAM.z, -CAM.x);          // ángulo φ de la esfera que mira a la cámara
  const cutStart = (len) => phiC + (Math.PI*2 - len)/2;   // la cuña retirada queda centrada hacia la cámara
  const org = (color, o={}) => Kit.tissue(Object.assign({ color, rough:0.38, coat:0.7, coatRough:0.22 }, o));
  const xf = (g, pos, quat, scale) => { const m = new THREE.Matrix4().compose(pos, quat || new THREE.Quaternion(), scale || new THREE.Vector3(1,1,1)); g.applyMatrix4(m); return g; };
  const randDir = () => new THREE.Vector3(R()*2-1, R()*2-1, R()*2-1).normalize();
  const inCut = (p, c, ang=0.8) => { const d = p.clone().sub(c); d.y *= 0.4; return d.normalize().dot(CAM) > Math.cos(ang); };

  /* --- membrana plasmática: doble capa, corte en cuña, proteínas --- */
  const MS = [3.55, 2.95, 3.1];
  const mDisp = d => 0.07*Kit.fbm(d.x*1.6+3, d.y*1.6, d.z*1.6, 3);
  const shell = (k, cut) => Kit.sculpt({ w: low?64:110, h: low?44:80, phiStart: cut ? cutStart(1.5*Math.PI) : 0, phiLength: cut ? 1.5*Math.PI : Math.PI*2, shape: d => new THREE.Vector3(d.x*MS[0]*k, d.y*MS[1]*k, d.z*MS[2]*k), disp: (p,d) => mDisp(d)*k });
  const geo = { outCut: shell(1, true), outFull: shell(1, false), inCut: shell(0.975, true), inFull: shell(0.975, false) };
  const mOut = celFresnel(Kit.tissue({ tex:'membrane', rep:[8,5], bump:0.035, color:0x74C2D2, transparent:true, opacity:0.66, rough:0.22, coat:1, coatRough:0.12, side:THREE.DoubleSide, depthWrite:false, env:1.3 }), 0.26, 1.5);
  const mIn = celFresnel(Kit.tissue({ color:0xBFE6EC, transparent:true, opacity:0.34, rough:0.3, coat:0.6, side:THREE.DoubleSide, depthWrite:false }), 0.22, 1.8);
  const outer = new THREE.Mesh(geo.outCut, mOut), inner = new THREE.Mesh(geo.inCut, mIn); outer.renderOrder = 2; inner.renderOrder = 1;
  // borde del corte: franja que muestra el grosor de la bicapa
  const rimGeo = (() => { const P = [], I = []; const edges = [cutStart(1.5*Math.PI), cutStart(1.5*Math.PI)+1.5*Math.PI]; let base = 0;
    edges.forEach(phi => { const N = 40; for (let i=0;i<=N;i++){ const th = i/N*Math.PI; const d = new THREE.Vector3(-Math.cos(phi)*Math.sin(th), Math.cos(th), Math.sin(phi)*Math.sin(th)); const e = 1 + mDisp(d)/Math.max(0.01, 1); [1,0.975].forEach(k => { const dd = mDisp(d)*k; P.push(d.x*(MS[0]*k)+d.x*dd, d.y*(MS[1]*k)+d.y*dd, d.z*(MS[2]*k)+d.z*dd); }); }
      for (let i=0;i<N;i++){ const a = base+i*2; I.push(a, a+1, a+2, a+1, a+3, a+2); } base += (N+1)*2; });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P,3)); g.setIndex(I); g.computeVertexNormals(); return g; })();
  const rim = new THREE.Mesh(rimGeo, Kit.tissue({ color:0x4FAFBF, rough:0.4, coat:0.5, side:THREE.DoubleSide }));
  // proteínas de membrana (mosaico fluido)
  const protG = THREE.CapsuleGeometry ? new THREE.CapsuleGeometry(0.04, 0.08, 4, 8) : new THREE.CylinderGeometry(0.042, 0.042, 0.13, 10);
  const nProt = low ? 70 : 150; const prot = new THREE.InstancedMesh(protG, org(0x8C7CC4), nProt); const prot2 = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 10, 8), org(0xD6B06A), Math.floor(nProt*0.6));
  const dm = new THREE.Object3D(); let pi = 0, pj = 0;
  for (let i=0;i<nProt*2 && (pi<nProt || pj<prot2.count);i++){ const d = randDir(); const p = new THREE.Vector3(d.x*MS[0], d.y*MS[1], d.z*MS[2]).addScaledVector(d, mDisp(d)); if (inCut(p, new THREE.Vector3(), 0.78)) continue; dm.position.copy(p); dm.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), d); dm.updateMatrix(); if (i%3 && pi<nProt) prot.setMatrixAt(pi++, dm.matrix); else if (pj<prot2.count) prot2.setMatrixAt(pj++, dm.matrix); }
  prot.count = pi; prot2.count = pj;
  [outer, inner, rim].forEach(m => m.userData.sub='bicapa'); prot.userData.sub = prot2.userData.sub = 'prot';
  add('membrana', [outer, inner, rim, prot, prot2], [2.7,2.7,1.0], { explodeDir:new THREE.Vector3(0,0,0), passThrough:true }); E.setAnchor('membrana', [2.2,2.18,-0.78]);

  /* --- citoplasma: citoesqueleto (microtúbulos desde el centrosoma) y gránulos --- */
  const CS = new THREE.Vector3(-0.35,1.3,0.75);
  const mts = []; for (let i=0;i<(low?26:48);i++){ const d = randDir(); const end = new THREE.Vector3(d.x*MS[0]*0.9, d.y*MS[1]*0.9, d.z*MS[2]*0.9); const mid = CS.clone().lerp(end, 0.5).add(randDir().multiplyScalar(0.35)); mts.push(Kit.taper([CS.clone().addScaledVector(d,0.2), mid, end], 0.012, 0.01, { seg:16, rad:4 })); }
  const cyto = new THREE.Mesh(Kit.merge(mts), new THREE.MeshStandardMaterial({ color:0x8FD8B0, transparent:true, opacity:0.55, roughness:0.5, depthWrite:false }));
  const gr = new THREE.BufferGeometry(); const gn = low?160:360; const ga = new Float32Array(gn*3); for (let i=0;i<gn;i++){ const d = randDir(), r = 0.35+R()*0.55; ga[i*3]=d.x*MS[0]*r; ga[i*3+1]=d.y*MS[1]*r; ga[i*3+2]=d.z*MS[2]*r; } gr.setAttribute('position', new THREE.BufferAttribute(ga,3));
  const gran = new THREE.Points(gr, new THREE.PointsMaterial({ color:0x9CCFD6, size:0.045, transparent:true, opacity:0.6, depthWrite:false }));
  add('citoplasma', [cyto, gran], [-3.0,-1.2,1.7], { pickable:false, explodeDir:new THREE.Vector3(0,0,0) }); E.setAnchor('citoplasma', [-2.15,-1.3,0.95]);

  /* --- núcleo: doble envoltura con poros, cromatina --- */
  const NC = new THREE.Vector3(0.3,0.2,0), NR = 1.1;
  const nShell = (k, cut) => { const g = Kit.sculpt({ w: low?48:80, h: low?34:60, phiStart: cut ? cutStart(1.5*Math.PI) : 0, phiLength: cut ? 1.5*Math.PI : Math.PI*2, radii:[NR*k, NR*0.95*k, NR*k], disp:(p,d) => 0.03*Kit.fbm(d.x*2+9, d.y*2, d.z*2, 2) }); g.translate(NC.x,NC.y,NC.z); return g; };
  const ngeo = { outCut:nShell(1,true), outFull:nShell(1,false), inCut:nShell(0.94,true), inFull:nShell(0.94,false) };
  const nOut = new THREE.Mesh(ngeo.outCut, Kit.tissue({ tex:'membrane', rep:[4,3], bump:0.015, color:0x7E66CC, rough:0.35, coat:0.7, side:THREE.DoubleSide }));
  const nIn = new THREE.Mesh(ngeo.inCut, Kit.tissue({ color:0x5E4AA6, rough:0.5, coat:0.3, side:THREE.BackSide }));
  const poreN = low?50:110; const pores = new THREE.InstancedMesh(new THREE.TorusGeometry(0.05, 0.018, 6, 14), org(0xC9B8F2), poreN); let pc = 0;
  for (let i=0;i<poreN*3 && pc<poreN;i++){ const d = randDir(); if (d.dot(CAM) > 0.55) continue; dm.position.copy(NC).add(new THREE.Vector3(d.x*NR*1.005, d.y*NR*0.95*1.005, d.z*NR*1.005)); dm.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), d); dm.updateMatrix(); pores.setMatrixAt(pc++, dm.matrix); } pores.count = pc;
  const chrom = []; for (let i=0;i<(low?10:18);i++){ let p = NC.clone().add(randDir().multiplyScalar(R()*0.6)); const pts = [p.clone()]; for (let j=0;j<7;j++){ p = p.clone().add(randDir().multiplyScalar(0.28)); if (p.distanceTo(NC) > 0.9) p.sub(NC).multiplyScalar(0.8).add(NC); pts.push(p); } chrom.push(Kit.taper(pts, 0.035, 0.03, { seg:30, rad:5, bumpy:0.4, bf:20, seed:i })); }
  const chromM = new THREE.Mesh(Kit.merge(chrom), org(0x4B3490, { rough:0.5, coat:0.3 }));
  nOut.userData.sub = nIn.userData.sub = 'env'; pores.userData.sub = 'poros'; chromM.userData.sub = 'crom';
  add('nucleo', [nOut, nIn, pores, chromM], [0.1,1.75,0.6]); E.setAnchor('nucleo', [0.15,1.18,0.32]);
  const nuc = new THREE.Mesh(Kit.sculpt({ radii:[0.36,0.33,0.35], w:40, h:30, disp:(p)=>0.04*Kit.n3(p.x*9,p.y*9,p.z*9) }), Kit.tissue({ tex:'granular', rep:[3,2], bump:0.02, color:0x3A2478, rough:0.55, coat:0.3 }));
  nuc.position.copy(NC).add(new THREE.Vector3(0.28,0.12,0.38));
  add('nucleolo', [nuc], [1.55,0.85,1.2], { interno:true }); E.setAnchor('nucleolo', nuc.position);

  /* --- retículo endoplasmático rugoso: cisternas + ribosomas --- */
  const rerM = Kit.tissue({ color:0x5E93D6, rough:0.32, coat:0.75, coatRough:0.2, side:THREE.DoubleSide });
  const sheets = [], riboPts = [];
  /* cisternas apiladas alrededor del núcleo (detrás) y una pila frente al Golgi, en la cara que mira al observador */
  [[1.35,4.3,1.9,0.34],[1.5,4.0,2.1,0.4],[1.66,4.5,1.8,0.3],[1.82,4.1,2.0,0.42],[1.98,4.4,1.7,0.36],[1.3,0.12,0.9,0.4,0.3],[1.45,0.08,0.98,0.38,0.32],[1.6,0.16,0.86,0.41,0.28]].forEach(([r,ps,pl,ts,tl],k) => {
    const g = new THREE.SphereGeometry(r, low?30:54, low?10:18, ps, pl, ts*Math.PI, (tl||0.46)*Math.PI); const p = g.attributes.position; const v = new THREE.Vector3();
    for (let i=0;i<p.count;i++){ v.fromBufferAttribute(p,i); const n = v.clone().normalize(); v.addScaledVector(n, 0.06*Math.sin(v.x*5+k)+0.05*Math.sin(v.y*6+v.z*4)); p.setXYZ(i,v.x,v.y,v.z); } g.computeVertexNormals(); g.translate(NC.x,NC.y,NC.z); sheets.push(g);
    for (let i=0;i<(low?45:100);i++){ const vi = Math.floor(R()*p.count); riboPts.push(new THREE.Vector3(p.getX(vi)+NC.x, p.getY(vi)+NC.y, p.getZ(vi)+NC.z).add(randDir().multiplyScalar(0.045))); } });
  const rerMesh = new THREE.Mesh(Kit.merge(sheets), rerM);
  const rrib = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.034, low?0:1), org(0x2A2345, { rough:0.55, coat:0.25 }), riboPts.length); riboPts.forEach((p,i) => { dm.position.copy(p); dm.quaternion.identity(); dm.updateMatrix(); rrib.setMatrixAt(i, dm.matrix); });
  rerMesh.userData.sub = 'cist'; rrib.userData.sub = 'ribo';
  add('rer', [rerMesh, rrib], [-1.2,-1.75,1.6]); E.setAnchor('rer', [-0.92,-0.03,0.75]);

  /* --- retículo endoplasmático liso: red tubular --- */
  const relC = new THREE.Vector3(2.05,0.35,0.55); const rel = []; for (let i=0;i<(low?9:16);i++){ const pts = []; let p = relC.clone().add(randDir().multiplyScalar(0.55)); for (let j=0;j<5;j++){ pts.push(p.clone()); p = p.clone().add(randDir().multiplyScalar(0.32)); if (p.distanceTo(relC) > 0.85) p.sub(relC).multiplyScalar(0.7).add(relC); } rel.push(Kit.taper(pts, 0.05, 0.045, { seg:24, rad:7 })); }
  add('rel', [new THREE.Mesh(Kit.merge(rel), org(0x8DB9E8, { rough:0.34 }))], [3.0,1.2,1.0]); E.setAnchor('rel', relC);

  /* --- aparato de Golgi: cisternas curvas con bordes dilatados y vesículas --- */
  const GC = new THREE.Vector3(-1.2,-0.55,1.45); const gAxis = NC.clone().sub(GC).normalize(); const gq = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), gAxis.clone().negate());
  const gg = [], vesG = [];
  for (let i=0;i<5;i++){ const rr = 0.66 - i*0.07, SR = 0.95; const cap = new THREE.SphereGeometry(SR, low?28:44, 8, 0, Math.PI*2, 0, Math.asin(Math.min(0.99,rr/SR))); cap.translate(0,-SR,0); cap.scale(1.45,1,0.75); const off = new THREE.Vector3(0, i*0.15, 0); xf(cap, GC.clone().add(off.clone().applyQuaternion(gq)), gq); gg.push(cap);
    const ring = new THREE.TorusGeometry(rr, 0.028, 8, 40); ring.rotateX(Math.PI/2); ring.translate(0, -SR + Math.sqrt(SR*SR-rr*rr), 0); ring.scale(1.45,1,0.75); xf(ring, GC.clone().add(off.clone().applyQuaternion(gq)), gq); gg.push(ring); }
  for (let i=0;i<14;i++){ const d = randDir(); const p = GC.clone().add(gAxis.clone().multiplyScalar(-0.7 - R()*0.35)).add(d.multiplyScalar(0.25+R()*0.35)); const s = new THREE.SphereGeometry(0.06+R()*0.04, 12, 10); s.translate(p.x,p.y,p.z); vesG.push(s); }
  { const a = new THREE.Mesh(Kit.merge(gg), org(0xE0AC45, { side:THREE.DoubleSide })), b = new THREE.Mesh(Kit.merge(vesG), org(0xF0C66A, { transparent:true, opacity:0.85 })); a.userData.sub='cist'; b.userData.sub='ves'; add('golgi', [a,b], [-1.85,-1.05,2.55]); E.setAnchor('golgi', GC); }

  /* --- mitocondrias abiertas: membrana externa lisa, interna con crestas laminares y matriz densa --- */
  const mitoOut = [], mitoIn = [], mitoMat = [], mitoCr = [];
  const capsule = (L, r, n) => { const pts = []; for (let i=0;i<=n;i++){ const a = -Math.PI/2 + i/n*Math.PI; pts.push(new THREE.Vector2(r*Math.cos(a), (L/2)*Math.sin(a))); } return pts; };
  [[-1.95,0.95,0.55],[1.95,-0.95,0.45],[-0.9,-1.95,-0.35],[1.4,1.65,-0.8],[-2.15,-0.55,-1.05],[0.9,-2.1,0.9]].forEach((c,k) => {
    const Z = CAM.clone().add(randDir().multiplyScalar(0.35)).normalize(); const Y = new THREE.Vector3().crossVectors(Z, randDir()).normalize(); const X = new THREE.Vector3().crossVectors(Y, Z); const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
    const L = 1.25 + R()*0.35, r = 0.3; const pos = V3(c);
    const o = new THREE.LatheGeometry(capsule(L, r, 16), low?20:32, 0.28*Math.PI, 1.44*Math.PI); xf(o, pos, q); mitoOut.push(o);
    const inn = new THREE.LatheGeometry(capsule(L*0.93, r*0.84, 16), low?20:32, 0.3*Math.PI, 1.4*Math.PI); xf(inn, pos, q); mitoIn.push(inn);
    const mtx = new THREE.LatheGeometry(capsule(L*0.9, r*0.8, 14), low?16:28, 0.31*Math.PI, 1.38*Math.PI); xf(mtx, pos, q); mitoMat.push(mtx);
    /* crestas: láminas alternas que nacen de la membrana interna (vista en corte, como en una micrografía) */
    const nC = low ? 5 : 7; for (let j=0;j<nC;j++){ const y = -L*0.36 + j/(nC-1)*L*0.72; const rho = r*0.84*Math.sqrt(Math.max(0.05, 1 - Math.pow(y/(L*0.465),2)));
      const t = celTongue(rho, rho*0.36, 0.42 + 0.18*R(), 0.05, low); t.rotateY((j%2 ? Math.PI : 0) + (R()-0.5)*0.35); t.translate(0, y, -0.02); xf(t, pos, q); mitoCr.push(t); } });
  { const a = new THREE.Mesh(Kit.merge(mitoOut), org(0xE06A3A, { side:THREE.DoubleSide, rough:0.34 })),
      b = new THREE.Mesh(Kit.merge(mitoIn), org(0xF08E5C, { side:THREE.FrontSide, transparent:true, opacity:1, depthWrite:true })),
      m = celInst1(Kit.merge(mitoMat), org(0xB94A2E, { side:THREE.BackSide, rough:0.6, coat:0.2 })),
      cr = celInst1(Kit.merge(mitoCr), org(0xFFC79A, { rough:0.42, coat:0.5 }));
    a.userData.sub='ext'; b.userData.sub = m.userData.sub = cr.userData.sub = 'int'; add('mitocondria', [a,b,m,cr], [-2.75,1.55,1.1]); E.setAnchor('mitocondria', [-1.95,0.95,0.55]); }

  /* --- lisosomas: membrana + contenido denso --- */
  const lisO = [], lisI = []; [[1.25,-1.95,1.15],[-2.0,1.95,-0.4],[2.35,0.9,-0.95],[-0.4,2.25,-1.1],[1.9,-0.2,1.9]].forEach(p => { const a = new THREE.SphereGeometry(0.22,18,14); a.translate(...p); lisO.push(a); const b = Kit.sculpt({ radii:[0.16,0.16,0.16], w:20, h:14, disp:(q)=>0.03*Kit.n3(q.x*20,q.y*20,q.z*20) }); b.translate(...p); lisI.push(b); });
  { const a = new THREE.Mesh(Kit.merge(lisO), org(0xD27AA6, { transparent:true, opacity:0.55, depthWrite:false })), b = new THREE.Mesh(Kit.merge(lisI), org(0x8E2E62)); a.userData.sub='memb'; b.userData.sub='cont'; add('lisosomas', [a,b], [2.1,-2.6,1.6]); E.setAnchor('lisosomas', [1.25,-1.95,1.15]); }

  /* --- ribosomas libres y polirribosomas --- */
  const fr = []; for (let i=0;i<(low?140:320);i++){ const d = randDir(), r = 0.45+R()*0.45; const p = new THREE.Vector3(d.x*MS[0]*r, d.y*MS[1]*r, d.z*MS[2]*r); if (p.distanceTo(NC) < 1.35) continue; fr.push(p); }
  for (let k=0;k<(low?6:14);k++){ let p = fr[Math.floor(R()*fr.length)].clone(); const dir = randDir(); for (let j=0;j<6;j++){ p = p.clone().addScaledVector(dir.clone().add(randDir().multiplyScalar(0.4)).normalize(), 0.07); fr.push(p); } }
  const frib = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.032, low?0:1), org(0x2A2345, { rough:0.55, coat:0.25 }), fr.length); fr.forEach((p,i) => { dm.position.copy(p); dm.updateMatrix(); frib.setMatrixAt(i, dm.matrix); });
  add('ribosomas', [frib], [2.6,-1.95,-0.6], { pickable:false, explodeDir:new THREE.Vector3(0,0,0) }); { const L0 = new THREE.Vector3(2.6,-1.95,-0.6); let best = fr[0]; fr.forEach(q => { if (q.distanceTo(L0) < best.distanceTo(L0)) best = q; }); E.setAnchor('ribosomas', best); }

  /* --- centríolos: 9 tripletes de microtúbulos, perpendiculares --- */
  const rods = []; const centriole = (pos, axisQ) => { for (let k=0;k<9;k++){ const a = k/9*Math.PI*2; for (let t=0;t<3;t++){ const rr = 0.1 + t*0.028; const aa = a + t*0.16; const c = new THREE.CylinderGeometry(0.014, 0.014, 0.42, 6); c.translate(Math.cos(aa)*rr, 0, Math.sin(aa)*rr); xf(c, pos, axisQ); rods.push(c); } } };
  centriole(CS.clone(), new THREE.Quaternion()); centriole(CS.clone().add(new THREE.Vector3(0.3,-0.2,0)), new THREE.Quaternion().setFromEuler(new THREE.Euler(0,0,Math.PI/2)));
  const pcm = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 16), new THREE.MeshStandardMaterial({ color:0x8FA8C6, transparent:true, opacity:0.18, depthWrite:false })); pcm.position.copy(CS).add(new THREE.Vector3(0.15,-0.1,0));
  { const a = new THREE.Mesh(Kit.merge(rods), org(0x4E6F92)); a.userData.sub='rods'; pcm.userData.sub='pcm'; add('centriolos', [a, pcm], [-0.9,2.25,1.5]); E.setAnchor('centriolos', CS); }

  /* "Ver en acción": partículas que viajan entre organelos */
  const anim = { active:null, parts:[], t:0 };
  const pgeo = new THREE.SphereGeometry(0.06,10,8);
  const routes = {
    mitocondria:{ from:[-1.95,0.95,0.55], to:[[-0.5,2.4,0.4],[-2.6,-0.5,1.6],[-1.0,0.3,2.3]], color:0xFFC24A, txt:'ATP saliendo de la mitocondria hacia el citoplasma' },
    nucleo:{ from:[0.3,0.2,0], to:[[2.4,-1.9,-0.9],[1.9,-1.4,1.6],[-2.0,-1.2,1.0]], color:0xB8A8FF, txt:'ARN mensajero saliendo por los poros nucleares hacia los ribosomas' },
    nucleolo:{ from:[0.58,0.32,0.38], to:[[2.4,-1.9,-0.9],[-2.2,-1.5,0.8]], color:0x8E78E0, txt:'Subunidades ribosómicas saliendo del núcleo' },
    rer:{ from:[-0.9,-0.6,0.9], to:[[-1.2,-0.55,1.45]], color:0x9CC4EA, txt:'Vesículas con proteínas viajando del retículo al Golgi' },
    rel:{ from:[2.05,0.35,0.55], to:[[0.2,3.0,0.9],[3.0,-1.4,1.2]], color:0xBFDDF2, txt:'Lípidos nuevos incorporándose a las membranas' },
    golgi:{ from:[-1.2,-0.55,1.45], to:[[-2.0,-1.4,2.5],[-0.2,-2.3,2.1]], color:0xFFD27A, txt:'Vesículas de secreción viajando hacia la membrana (exocitosis)' },
    lisosomas:{ from:[1.25,-1.95,1.15], to:[[1.7,-2.6,1.8]], color:0xF08CC0, txt:'Lisosoma fusionándose con una vesícula para digerir su contenido' },
    ribosomas:{ from:[2.4,-1.9,-0.9], to:[[2.6,-1.2,-1.6],[1.6,-2.4,-1.2]], color:0x6A6488, txt:'Proteínas recién sintetizadas liberadas al citosol' },
    membrana:{ from:[0.6,3.6,0.9], to:[[0.3,2.1,0.6]], color:0x7FE0EC, txt:'Moléculas cruzando la membrana por difusión y por proteínas de transporte' },
    citoplasma:{ from:[-2.2,-2.2,1.0], to:[[-1.95,0.95,0.55]], color:0xB5E3E8, txt:'Piruvato (de la glucólisis) entrando a la mitocondria' },
    centriolos:{ from:[-0.2,1.2,0.75], to:[[-3.0,1.2,0.8],[2.6,1.2,0.8]], color:0x7FA0C8, txt:'Microtúbulos del huso mitótico extendiéndose hacia los polos' }
  };
  let cut = true;
  const model = {
    action(id){ this.stop(); const r = routes[id]; if (!r) return null; anim.active = r; const m = new THREE.MeshBasicMaterial({ color:r.color, toneMapped:false }); r.to.forEach(to => { for (let i=0;i<7;i++){ const p = new THREE.Mesh(pgeo, m); p.userData = { from:V3(r.from), to:V3(to), off:i/7 }; E.scene.add(p); anim.parts.push(p); } }); return r.txt; },
    stop(){ anim.parts.forEach(p=>E.scene.remove(p)); anim.parts=[]; anim.active=null; },
    get cutaway(){ return cut; },
    setCutaway(on){ cut = on; outer.geometry = on ? geo.outCut : geo.outFull; inner.geometry = on ? geo.inCut : geo.inFull; rim.visible = on && E.parts.get('membrana').visible; nOut.geometry = on ? ngeo.outCut : ngeo.outFull; nIn.geometry = on ? ngeo.inCut : ngeo.inFull; rim.userData.hiddenByCut = !on; }
  };
  E.onFrame((t,dt) => { if (!anim.active || !motionOK()) return; anim.t += dt*0.35; anim.parts.forEach(p => { const k = (anim.t + p.userData.off) % 1; p.position.lerpVectors(p.userData.from, p.userData.to, k); p.scale.setScalar(0.6+0.8*Math.sin(k*Math.PI)); }); });
  return model;
}
</script>
