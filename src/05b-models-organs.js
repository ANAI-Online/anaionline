<script>
/* =====================================================================
   MODELOS DETALLADOS: CEREBRO · PULMONES (procedimentales, simplificados)
   Contrato: build(E) → { anims, setSpeed, phaseText, legend, observa, [colorModes] }
   ===================================================================== */
const smooth01 = v => v<0?0:v>1?1:v*v*(3-2*v);
const lin = v => Math.pow(Math.max(0,v), 2.2);
const gauss = (d,w) => Math.exp(-(d*d)/(w*w));

/* ============================== CEREBRO ============================== */
function buildBrain(E){
  orgvFrame(E, 1.15);
  const low = E.low; const D = BIO.brain; const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s=S[id]; const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, interno:s.interno, explodeDir:V3(s.pos).sub(new THREE.Vector3(-0.3,-0.3,0)).normalize() }, extra)); E.addLabel(id, s.nombre, s.lbl); return p; };
  const LOBE = { 'lobulo-frontal':[0.86,0.52,0.47], 'lobulo-parietal':[0.86,0.68,0.40], 'lobulo-temporal':[0.52,0.66,0.80], 'lobulo-occipital':[0.58,0.74,0.52] };
  const GYR = [0.90,0.71,0.65], SUL = [0.56,0.33,0.32];
  const yS = x => -0.35 + (1.2 - x)*0.33, xC = y => -0.1 + (1.65 - y)*0.36, xO = y => -1.6 + 0.22*(y - 0.3);
  const lobeOf = (x,y) => (y < yS(x) && x > -1.55 && x < 1.45) ? 'lobulo-temporal' : x > xC(y) ? 'lobulo-frontal' : x < xO(y) ? 'lobulo-occipital' : 'lobulo-parietal';
  /* Circunvoluciones: el mismo ruido simplex (Ashima) en la CPU —relieve de gran escala, visible en la silueta— y en la GPU
     —surcos finos por fragmento con sombreado y relieve—, así los surcos quedan nítidos sin multiplicar los triángulos */
  const m289 = x => x - Math.floor(x/289)*289, perm = x => m289((x*34+1)*x);
  const snz = (vx,vy,vz) => { const s = (vx+vy+vz)/3; const ix = Math.floor(vx+s), iy = Math.floor(vy+s), iz = Math.floor(vz+s); const t = (ix+iy+iz)/6;
    const x0 = [vx-ix+t, vy-iy+t, vz-iz+t]; const g = [x0[0]>=x0[1]?1:0, x0[1]>=x0[2]?1:0, x0[2]>=x0[0]?1:0]; const l = g.map(v=>1-v);
    const i1 = [Math.min(g[0],l[2]), Math.min(g[1],l[0]), Math.min(g[2],l[1])], i2 = [Math.max(g[0],l[2]), Math.max(g[1],l[0]), Math.max(g[2],l[1])];
    const X = [x0, [x0[0]-i1[0]+1/6, x0[1]-i1[1]+1/6, x0[2]-i1[2]+1/6], [x0[0]-i2[0]+1/3, x0[1]-i2[1]+1/3, x0[2]-i2[2]+1/3], [x0[0]-0.5, x0[1]-0.5, x0[2]-0.5]];
    const a = m289(ix), b = m289(iy), c = m289(iz); const oz = [0,i1[2],i2[2],1], oy = [0,i1[1],i2[1],1], ox = [0,i1[0],i2[0],1]; let sum = 0;
    for (let k=0;k<4;k++){ const p = perm(perm(perm(c+oz[k]) + b+oy[k]) + a+ox[k]); const j = p - 49*Math.floor(p/49); const xx = Math.floor(j/7), yy = Math.floor(j - 7*xx);
      let gx = xx*(2/7) - 13/14, gy = yy*(2/7) - 13/14; const gz = 1 - Math.abs(gx) - Math.abs(gy); if (gz <= 0){ const sx = Math.floor(gx)*2+1, sy = Math.floor(gy)*2+1; gx -= sx; gy -= sy; }
      const nr = 1.79284291400159 - 0.85373472095314*(gx*gx+gy*gy+gz*gz); gx*=nr; gy*=nr; const gzz = gz*nr; const xk = X[k]; let m = Math.max(0.6 - (xk[0]*xk[0]+xk[1]*xk[1]+xk[2]*xk[2]), 0); m*=m; sum += m*m*(gx*xk[0]+gy*xk[1]+gzz*xk[2]); }
    return 42*sum; };
  const gyN = (x,y,z) => snz(x*1.5+3, y*1.5, z*1.5) + 0.42*snz(x*3.1+7, y*3.1, z*3.1);
  const GLSL = `varying vec3 vGyP;
  vec3 gyM3(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; } vec4 gyM4(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; } vec4 gyPm(vec4 x){ return gyM4(((x*34.0)+1.0)*x); }
  float gySn(vec3 v){ const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0,0.5,1.0,2.0); vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy); vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + C.yyy; vec3 x3 = x0 - D.yyy; i = gyM3(i);
    vec4 p = gyPm(gyPm(gyPm(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    vec3 ns = 0.142857142857 * D.wyz - D.xzx; vec4 j = p - 49.0*floor(p*ns.z*ns.z); vec4 x_ = floor(j*ns.z); vec4 y_ = floor(j - 7.0*x_); vec4 x = x_*ns.x + ns.yyyy; vec4 y = y_*ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw); vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0)); vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w); vec4 nr = 1.79284291400159 - 0.85373472095314*vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)); p0*=nr.x; p1*=nr.y; p2*=nr.z; p3*=nr.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m*m; return 42.0*dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3))); }
  float gyN(vec3 q){ return gySn(q*1.5 + vec3(3.0,0.0,0.0)) + 0.42*gySn(q*3.1 + vec3(7.0,0.0,0.0)); }`;
  const gyrify = (m, med) => { m.onBeforeCompile = sh => {
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vGyP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvGyP = position;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\n' + GLSL)
        .replace('#include <color_fragment>', `#include <color_fragment>
        float gyn = gyN(vGyP); float gyw = max(0.075, fwidth(gyn)*1.3); float gyS = exp(-gyn*gyn/(gyw*gyw)); float gyW = exp(-gyn*gyn/0.045);
        diffuseColor.rgb *= mix(1.0, 0.5, gyS) * mix(1.0, 0.86, gyW);`)
        .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        { float hh = -0.009*gyS - 0.02*gyW; vec3 spx = dFdx(-vViewPosition), spy = dFdy(-vViewPosition); float dhx = dFdx(hh), dhy = dFdy(hh);
          vec3 R1 = cross(spy, normal), R2 = cross(normal, spx); float det = dot(spx, R1); vec3 grd = sign(det)*(dhx*R1 + dhy*R2); normal = normalize(abs(det)*normal - grd); }`); };
    m.customProgramCacheKey = () => 'gyri'; return m; };
  const hemis = {}; const natural = {}, coded = {};
  [1,-1].forEach(sg => {
    const cz = sg*0.2; const info = [];
    const g = Kit.sculpt({ w: low?112:168, h: low?84:126,
      shape: d => { const lat = d.z*sg; let x = 2.45*d.x, y = d.y>0 ? 1.62*d.y : 1.08*d.y; let z = lat>0 ? 1.5*d.z : 0.14*d.z; z *= 0.86 + 0.16*smooth01((0.7 - d.x)/1.2);
        if (d.y<0.15 && lat>-0.2) y -= 0.55*gauss(d.x-0.12,0.42)*smooth01((0.15-d.y)/0.5)*smooth01((lat+0.2)/0.5);
        if (d.x>0.35 && d.y<0) y += 0.3*smooth01((d.x-0.35)/0.45)*(-d.y);
        if (d.x<-0.45 && d.y<0) y += 0.22*smooth01((-d.x-0.45)/0.4)*(-d.y);
        return new THREE.Vector3(x, y+0.35, z+cz); },
      disp: (p,d) => { const lat = d.z*sg, med = lat<0.1 ? 0.55 : 1; const n = gyN(p.x, p.y, p.z);
        const sul = gauss(n, 0.2); const yy = p.y-0.35; let b = 0;
        if (p.x>-1.5 && p.x<1.35) b = Math.max(b, 1.9*gauss(yy - yS(p.x), 0.07)*(lat>-0.1?1:0.3));
        if (yy > yS(p.x)) b = Math.max(b, 1.1*gauss(p.x - xC(yy), 0.055));
        b = Math.max(b, 0.8*gauss(p.x - xO(yy), 0.06));
        const dz = med*(-0.075*sul + 0.022*(1-sul)) - 0.1*b; info.push(Math.min(1, Math.pow(0.35*sul*med + b, 0.8))); return dz; },
      store: (p,d) => lobeOf(p.x, p.y-0.35) });
    const t = info; const nat = new Float32Array(g.attributes.position.count*3), cod = new Float32Array(nat.length);
    for (let i=0;i<g.attributes.position.count;i++){ const k = t[i], L = LOBE[g.userData.extra[i]]; const sh = 1 - 0.55*k; for (let c=0;c<3;c++){ nat[i*3+c] = lin(GYR[c]+(SUL[c]-GYR[c])*k); cod[i*3+c] = lin(L[c]*sh); } }
    g.setAttribute('color', new THREE.BufferAttribute(nat.slice(),3)); g.userData.nat = nat; g.userData.cod = cod;
    hemis[sg] = Kit.split(g, i => g.userData.extra[i]);
    // copias de color por región
    Object.entries(hemis[sg]).forEach(([id, sub]) => { sub.userData = { nat: sub.attributes.color.array.slice() }; });
    // recalcular codificado por región: color del lóbulo * sombreado
    Object.entries(hemis[sg]).forEach(([id, sub]) => { const a = sub.userData.nat, L = LOBE[id]; const c = new Float32Array(a.length); for (let i=0;i<a.length;i+=3){ const k = (GYR[0]-Math.pow(a[i],1/2.2))/(GYR[0]-SUL[0]); const sh = 1-0.55*Math.max(0,Math.min(1,k)); c[i]=lin(L[0]*sh); c[i+1]=lin(L[1]*sh); c[i+2]=lin(L[2]*sh); } sub.userData.cod = c; });
  });
  const cortexMat = () => gyrify(Kit.tissue({ vc:true, rough:0.5, coat:0.5, coatRough:0.3, tex:'tissue', rep:[6,6], bump:0.008, env:0.8 }));
  const lobeMeshes = {};
  Object.keys(LOBE).forEach(id => { const m = cortexMat(); lobeMeshes[id] = [1,-1].filter(sg => hemis[sg][id]).map(sg => new THREE.Mesh(hemis[sg][id], m)); add(id, lobeMeshes[id]); });

  /* cerebelo con folias */
  const cbMat = Kit.tissue({ vc:true, rough:0.5, coat:0.35, coatRough:0.4 });
  const cb = [1,-1].map(sg => { const g = Kit.sculpt({ w: low?64:104, h: low?48:78, shape: d => new THREE.Vector3(1.0*d.x, 0.6*d.y*(d.y>0?1:1.1), 0.82*d.z + (d.z*sg<0 ? 0.35*d.z : 0)),
      disp: (p) => { const a = Math.atan2(p.y+0.1, p.x+0.25); const f = Math.sin(a*30 + 1.8*Kit.n3(p.x*2,p.y*2,p.z*2)); return 0.03*f; },
      color: (p,d,dz,o) => { const k = Math.max(0,Math.min(1,0.5 - dz/0.06)); o[0]=lin(0.88-0.3*k); o[1]=lin(0.68-0.32*k); o[2]=lin(0.62-0.28*k); } });
    const m = new THREE.Mesh(g, cbMat); m.position.set(-1.55,-1.12,sg*0.6); return m; });
  add('cerebelo', cb);
  const stemMat = Kit.tissue({ color:0xE4C3AE, rough:0.48, coat:0.4, tex:'tissue', rep:[2,6], bump:0.008 });
  add('tronco', [new THREE.Mesh(Kit.taper([[-0.1,-0.15,0],[-0.3,-0.9,0],[-0.5,-1.75,0],[-0.6,-2.35,0]], 0, 0, { rfn:u => 0.3 + 0.17*gauss(u-0.45,0.16) - 0.06*u }), stemMat)]);
  const cordMat = Kit.tissue({ color:0xE4C3AE, rough:0.48, coat:0.4, tex:'tissue', rep:[2,6], bump:0.008 }); const cord = [new THREE.Mesh(Kit.taper([[-0.6,-2.3,0],[-0.66,-3.2,0],[-0.72,-4.15,0]], 0.23, 0.18), cordMat)]; cord[0].userData.sub = 'cordon';
  [-2.65,-3.05,-3.45,-3.85].forEach((y,i) => [1,-1].forEach(sg => { const x = -0.64 - 0.02*i; const nv = new THREE.Mesh(Kit.taper([[x,y,sg*0.15],[x+0.05,y-0.12,sg*0.5],[x+0.12,y-0.35,sg*0.95]], 0.045, 0.03, { seg:12, rad:6 }), cordMat); nv.userData.sub = 'nervios'; cord.push(nv); }));
  add('medula', cord);

  /* estructuras profundas */
  const cc = new THREE.Mesh(Kit.taper([[1.1,0.3,0],[0.75,0.72,0],[0,0.88,0],[-0.8,0.7,0],[-1.12,0.38,0]], 0, 0, { rfn:u => 0.1 + 0.08*gauss(u,0.15) + 0.1*gauss(u-1,0.14) }), Kit.tissue({ color:0xF3EBDD, rough:0.4, coat:0.45 })); cc.scale.set(1,1,2.6);
  add('cuerpo-calloso', [cc]);
  const deep = (c, r, col, rot) => { const m = new THREE.Mesh(Kit.sculpt({ radii:r, w:40, h:30, disp:(p)=>0.012*Kit.n3(p.x*6,p.y*6,p.z*6) }), Kit.tissue({ color:col, rough:0.42, coat:0.5 })); m.position.set(...c); if (rot) m.rotation.set(...rot); return m; };
  add('talamo', [deep([-0.1,0.05,0.3],[0.5,0.3,0.25],0x9B6FB5), deep([-0.1,0.05,-0.3],[0.5,0.3,0.25],0x9B6FB5)]);
  add('hipotalamo', [deep([0.3,-0.36,0],[0.3,0.19,0.28],0xE0A040)]);
  { const a = deep([0.46,-1.0,0],[0.2,0.16,0.2],0xE8B890), b = deep([0.3,-1.0,0],[0.12,0.12,0.14],0xD8A07A), c = new THREE.Mesh(Kit.taper([[0.3,-0.5,0],[0.36,-0.72,0],[0.4,-0.9,0]], 0.06, 0.045, { seg:12, rad:8 }), Kit.tissue({ color:0xE0B08A, rough:0.45 })); a.userData.sub='adeno'; b.userData.sub='neuro'; c.userData.sub='tallo'; add('hipofisis', [a,b,c]); }
  const hipM = Kit.tissue({ color:0x5F9DB0, rough:0.4, coat:0.5 });
  add('hipocampo', [1,-1].map(sg => new THREE.Mesh(Kit.taper([[-0.95,-0.2,sg*0.72],[-0.55,-0.5,sg*0.84],[0.05,-0.62,sg*0.9],[0.5,-0.55,sg*0.86],[0.62,-0.42,sg*0.8]], 0, 0, { rfn:u => 0.07 + 0.1*u*u }), hipM)));

  /* impulso nervioso */
  const route = Kit.curve([[3.0,-4.3,1.8],[1.3,-4.0,0.9],[-0.66,-3.6,0.1],[-0.5,-1.8,0.05],[-0.2,-0.3,0.1],[-0.1,0.1,0.35],[-0.3,1.45,1.0],[0.35,1.55,1.0],[1.0,1.3,1.1],[0.3,0.2,0.3],[-0.4,-1.6,0.05],[-0.66,-3.5,0.1],[1.0,-4.1,1.0],[3.0,-4.5,2.1]]);
  const imp = { on:false, t:0, speed:1, parts:[] }; const pm = new THREE.MeshBasicMaterial({ color:0xFFE38A, toneMapped:false }); const pg = new THREE.SphereGeometry(0.075,10,8);
  for (let i=0;i<10;i++){ const m = new THREE.Mesh(pg, pm); m.visible=false; m.userData.off = -i*0.01; m.scale.setScalar(1-i*0.07); E.scene.add(m); imp.parts.push(m); }
  const handG = Kit.sculpt({ radii:[0.42,0.14,0.3], w:32, h:24 }); const hand = new THREE.Mesh(handG, Kit.tissue({ color:0xE2B597, rough:0.55, coat:0.2 })); hand.position.set(3.2,-4.45,1.95); hand.visible=false; E.scene.add(hand);
  const stim = new THREE.Mesh(new THREE.SphereGeometry(0.16,16,12), new THREE.MeshBasicMaterial({ color:0xFF6A3D, toneMapped:false })); stim.position.set(3.45,-4.2,2.2); stim.visible=false; E.scene.add(stim);
  const pulse = { ids:[], t:0 };
  let mode = 'natural';
  const model = {
    anims:[ { id:'impulso', label:'Impulso nervioso: estímulo → percepción → respuesta', get on(){ return imp.on; }, set(on){ imp.on=on; imp.t=0; imp.parts.forEach(p=>p.visible=on); hand.visible=on; stim.visible=on; if (on) E.focus(new THREE.Vector3(0.6,-1.2,0.5), 13); }, needsOpacity:0.45, focus:true } ],
    setSpeed(k){ imp.speed=k; },
    phaseText(){ if (!imp.on) return ''; const t = imp.t; return t<0.16 ? 'Receptor de la piel → médula espinal (neurona sensitiva)' : t<0.3 ? 'Vía ascendente: tronco encefálico → tálamo' : t<0.46 ? 'Corteza somatosensorial (parietal): percibes el estímulo' : t<0.6 ? 'Corteza motora (frontal): decides la respuesta' : t<0.85 ? 'Vía descendente: tronco → médula (neurona motora)' : 'Músculo: retiras la mano'; },
    legend:[{color:'#FFE38A',txt:'Impulso nervioso (potenciales de acción)'},{color:'#FF6A3D',txt:'Estímulo (calor) en la mano'}],
    observa:'el reflejo medular retira la mano antes de que la señal llegue a la corteza; la percepción consciente del dolor llega después. La vía se cruza: la mano derecha se procesa en el hemisferio izquierdo.',
    highlight(ids){ pulse.ids = ids; pulse.t = 0; },
    colorModes:[{id:'natural',n:'Color natural'},{id:'lobulos',n:'Color por lóbulos'}],
    get colorMode(){ return mode; },
    setColorMode(m){ mode = m; Object.values(lobeMeshes).flat().forEach(me => { const a = me.geometry.attributes.color; a.array.set(m==='lobulos' ? me.geometry.userData.cod : me.geometry.userData.nat); a.needsUpdate = true; }); }
  };
  E.onFrame((t,dt) => {
    if (imp.on && motionOK()){ imp.t = (imp.t + dt*0.085*imp.speed) % 1; imp.parts.forEach(p => { const k = ((imp.t + p.userData.off) % 1 + 1) % 1; p.position.copy(route.getPointAt(k)); }); stim.scale.setScalar(1+0.25*Math.sin(t*8)); }
    if (pulse.ids.length){ pulse.t += dt; const k = 0.5+0.5*Math.sin(pulse.t*5); E.parts.forEach(p => { if (!pulse.ids.includes(p.id)) return; p.meshes.forEach(m => { if (!m.material || !m.material.emissive) return; m.material.emissive.set(0xffd27a); m.material.emissiveIntensity = 0.12+0.3*k; }); }); if (pulse.t>4){ pulse.ids=[]; E.refreshEmissive(); } }
  });
  return model;
}

/* ============================== PULMONES ============================== */
function buildLungs(E){
  orgvFrame(E, 1.1);
  const low = E.low; const D = BIO.lungs; const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s=S[id]; const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, explodeDir:V3(s.pos).sub(new THREE.Vector3(0,0.3,0)).normalize() }, extra)); E.addLabel(id, s.nombre, s.lbl); return p; };
  const R = Kit.rng(5);
  const cart = () => Kit.tissue({ tex:'cartilage', rep:[3,1], bump:0.01, coat:0.55, coatRough:0.3, rough:0.4 });

  /* --- laringe --- */
  const lm = cart();
  const thy = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.38, 0.72, 28, 6, true, -0.66*Math.PI, 1.32*Math.PI), lm); { const p = thy.geometry.attributes.position; for (let i=0;i<p.count;i++){ const x=p.getX(i), z=p.getZ(i), y=p.getY(i); let nz = z, ny = y;
    /* dos láminas que se unen delante en quilla (prominencia laríngea) con la escotadura tiroidea arriba */
    if (z>0){ nz = z + 0.2*Math.pow(Math.max(0, 1 - Math.abs(x)/0.46), 1.6)*(0.75 + 0.35*(y+0.36)/0.72) + 0.06*Math.exp(-x*x/0.012)*(0.6+y); }
    if (y > 0.2 && z > 0) ny = y - 0.13*Math.max(0, 1 - Math.abs(x)/0.13);
    p.setXYZ(i, x, ny, nz); } thy.geometry.computeVertexNormals(); } thy.material.side = THREE.DoubleSide; thy.position.set(0,4.0,0.05);
  const cri = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.08, 10, 32), lm); cri.rotation.x = Math.PI/2; cri.position.set(0,3.55,0);
  const epi = new THREE.Mesh(Kit.sculpt({ radii:[0.24,0.36,0.05], w:28, h:20 }), cart()); epi.position.set(0,4.45,-0.2); epi.rotation.x = -0.35;
  const hyo = new THREE.Mesh(Kit.taper([[-0.5,4.58,-0.25],[-0.38,4.62,0.28],[0,4.62,0.44],[0.38,4.62,0.28],[0.5,4.58,-0.25]], 0.05, 0.05, { seg:30, rad:8 }), Kit.tissue({ color:0xEDE4D2, rough:0.35, coat:0.4 }));
  thy.userData.sub='tiroides'; cri.userData.sub='cricoides'; epi.userData.sub='epiglotis'; hyo.userData.sub='hioides'; add('laringe', [thy, cri, epi, hyo]);

  /* --- tráquea con anillos en C --- */
  const ringGeos = []; const ringArc = 1.62*Math.PI;
  const cRing = (pos, dir, r) => { const g = new THREE.TorusGeometry(r, 0.052, 8, 26, ringArc); g.rotateX(Math.PI/2); const gc = new THREE.Vector3(Math.cos(ringArc+ (2*Math.PI-ringArc)/2), 0, Math.sin(ringArc+(2*Math.PI-ringArc)/2)); const phi = Math.atan2(0,-1) - Math.atan2(gc.x, gc.z); g.rotateY(phi); const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize()); g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q)); g.translate(pos.x,pos.y,pos.z); ringGeos.push(g); };
  for (let y=3.35; y>1.75; y-=0.2) cRing(new THREE.Vector3(0,y,0), new THREE.Vector3(0,1,0), 0.31);
  const trM = new THREE.Mesh(Kit.merge(ringGeos.splice(0)), cart());
  const memb = new THREE.Mesh(Kit.taper([[0,3.48,0],[0,2.5,0],[0,1.62,0]], 0.29, 0.29), Kit.tissue({ color:0xD9A79C, rough:0.5, coat:0.4, tex:'tissue', rep:[3,1], bump:0.006 }));
  trM.userData.sub = 'anillos'; memb.userData.sub = 'membranosa'; add('traquea', [trM, memb]);

  /* --- pulmones: forma real, cisuras, lóbulos --- */
  const lungs = {}; const C = { R:new THREE.Vector3(-1.75,-0.25,0.05), L:new THREE.Vector3(1.75,-0.3,0.05) };
  const yO = Z => -0.35 - 0.72*Z;
  const lungMesh = (side, W, Hh) => { const s = side==='R' ? -1 : 1; const info = [];
    const g = Kit.sculpt({ w: W || (low?72:112), h: Hh || (low?56:88),
      shape: d => { const dl = d.x*s; const k = d.y>0 ? 1 - 0.45*Math.pow(d.y,1.3) : 1; let X = (dl>0 ? 1.2 : 0.8)*dl*k, Z = (d.z>0 ? 1.22 : 1.42)*d.z*k; let y = d.y>0 ? 2.25*d.y : 2.3*d.y;
        if (d.y<-0.15) y += 1.15*Math.exp(-((X+0.05)*(X+0.05)/0.45 + Z*Z/0.7))*smooth01((-d.y-0.15)/0.5);
        if (dl<0) X += 0.22*Math.exp(-((y-0.15)*(y-0.15)/0.35 + Z*Z/0.22));
        if (s>0 && dl<0 && y<0.7) X += 0.5*Math.exp(-((y+0.55)*(y+0.55)/0.55 + (Z-0.65)*(Z-0.65)/0.45));
        if (s<0 && dl<0 && y<0.4) X += 0.18*Math.exp(-((y+0.7)*(y+0.7)/0.5 + (Z-0.5)*(Z-0.5)/0.5));
        return new THREE.Vector3(s*X, y, Z); },
      disp: (p) => { let b = 0.9*gauss(p.y - yO(p.z), 0.06); if (s<0 && p.y > yO(p.z)) b = Math.max(b, 0.8*gauss(p.y-0.35, 0.05)*smooth01((p.z+0.6)/0.4)); info.push(b); return 0.018*Kit.fbm(p.x*2.2+s, p.y*2.2, p.z*2.2, 3) - 0.1*b; },
      store: (p) => p.y < yO(p.z) ? 'inf' : (s<0 && p.y < 0.35 ? 'med' : 'sup') });
    return { g, parts: Kit.split(g, i => g.userData.extra[i]) }; };
  const lungMat = (tint) => Kit.tissue({ tex:'lung', rep:[4,3], bump:0.024, coat:0.55, coatRough:0.28, rough:0.52, color:tint, env:0.75 });
  ['R','L'].forEach(side => { const { g, parts } = lungMesh(side); const m = lungMat(orgvTex.lin(side==='R' ? 0xF6CCC2 : 0xF4C8BE)); lungs[side] = { g, meshes: Object.entries(parts).map(([k,pg]) => { const me = new THREE.Mesh(pg, m); me.position.copy(C[side]); me.userData.sub = k; return me; }) }; });
  add('pulmon-derecho', lungs.R.meshes); add('pulmon-izquierdo', lungs.L.meshes);
  const plM = () => new THREE.MeshPhysicalMaterial({ color:0xA9D2E6, transparent:true, opacity:0.08, roughness:0.12, clearcoat:1, depthWrite:false, side:THREE.DoubleSide });
  const pleura = ['R','L'].map(side => { const me = new THREE.Mesh(lungMesh(side, low?40:60, low?30:46).g, plM()); me.position.copy(C[side]); me.scale.setScalar(1.045); return me; });
  add('pleura', pleura, { passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });

  /* --- árbol bronquial ramificado --- */
  const inside = (p, side) => { const c = C[side]; const dx = (p.x-c.x)/1.05, dy = (p.y-c.y)/(p.y>c.y?2.0:1.7), dz = (p.z-c.z)/1.15; return dx*dx+dy*dy+dz*dz < 0.82; };
  const bigGeos = [], smallGeos = [], jointGeos = [], airPaths = [], vesselA = [], vesselV = [];
  const tubeSeg = (a, b, r0, r1, list, bend) => { const mid = a.clone().lerp(b, 0.5).add(bend || new THREE.Vector3()); list.push(Kit.taper([a, mid, b], r0, r1, { seg: 6, rad: 6 })); const j = new THREE.SphereGeometry(r1*1.02, 6, 4); j.translate(b.x,b.y,b.z); jointGeos.push(j); };
  const maxGen = low ? 3 : 4;
  const branch = (side, start, dir, len, r, gen, path) => {
    let end = start.clone().addScaledVector(dir, len); let tries = 0; while (!inside(end, side) && tries < 6){ dir.lerp(C[side].clone().sub(start).normalize(), 0.35).normalize(); len *= 0.8; end = start.clone().addScaledVector(dir, len); tries++; }
    tubeSeg(start, end, r, r*0.86, gen<=0 ? bigGeos : smallGeos, new THREE.Vector3((R()-0.5)*0.06,(R()-0.5)*0.06,(R()-0.5)*0.06));
    if (gen <= 1){ const perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0,0,1)).normalize().multiplyScalar(r*1.6 + 0.03); vesselA.push(Kit.taper([start.clone().add(perp), end.clone().add(perp)], r*0.95, r*0.8, { seg:8, rad:6 })); }
    const p2 = path.concat([end]);
    if (gen >= maxGen){ airPaths.push(p2); return; }
    for (let k=0;k<2;k++){ const axis = new THREE.Vector3(R()-0.5,R()-0.5,R()-0.5).cross(dir).normalize(); const nd = dir.clone().applyAxisAngle(axis, (k? -1:1)*(0.45+R()*0.3)).normalize(); branch(side, end, nd, len*0.74, r*0.7, gen+1, p2); }
  };
  const carina = new THREE.Vector3(0,1.6,0);
  const mainR = new THREE.Vector3(-0.85,1.02,0), mainL = new THREE.Vector3(1.0,0.82,0);
  const bronchi = [];
  bronchi.push(Kit.taper([carina, carina.clone().lerp(mainR,0.5).add(new THREE.Vector3(0,0.05,0)), mainR], 0.2, 0.17), Kit.taper([carina, carina.clone().lerp(mainL,0.5).add(new THREE.Vector3(0,0.08,0)), mainL], 0.19, 0.16));
  for (let t=0.25;t<0.9;t+=0.3){ cRing(carina.clone().lerp(mainR,t), mainR.clone().sub(carina), 0.2); cRing(carina.clone().lerp(mainL,t), mainL.clone().sub(carina), 0.19); }
  const lobar = { R:[[-1.8,1.35,0.0],[-1.9,-0.35,0.75],[-1.85,-1.05,-0.45]], L:[[1.8,1.05,0.1],[1.75,-0.3,0.75],[1.8,-1.1,-0.45]] };
  ['R','L'].forEach(side => { const from = side==='R' ? mainR : mainL; lobar[side].forEach(tp => { const to = V3(tp); const dir = to.clone().sub(from).normalize(); const len = from.distanceTo(to)*0.62; const end = from.clone().addScaledVector(dir, len); bronchi.push(Kit.taper([from, end], 0.12, 0.105, { seg:8, rad:10 })); const j = new THREE.SphereGeometry(0.11, 10, 8); j.translate(end.x,end.y,end.z); bronchi.push(j);
    const perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0,0,1)).normalize().multiplyScalar(0.2); vesselA.push(Kit.taper([from.clone().add(perp), end.clone().add(perp)], 0.1, 0.09, { seg:8, rad:8 }));
    branch(side, end, dir.clone(), len*0.72, 0.085, 0, [carina, from, end]); }); });
  const bM = new THREE.Mesh(Kit.merge([...bronchi, ...bigGeos, ...ringGeos]), cart());
  add('bronquios', [bM]);
  const bl = new THREE.Mesh(Kit.merge([...smallGeos, ...jointGeos]), Kit.tissue({ color:0xEBCFBF, rough:0.42, coat:0.5 }));
  add('bronquiolos', [bl]);

  /* --- vasos pulmonares --- */
  const vA = [...vesselA]; vA.push(Kit.taper([[0,1.5,0.45],[-0.45,1.35,0.45],[-0.9,1.15,0.35]], 0.17, 0.15), Kit.taper([[0,1.5,0.45],[0.5,1.4,0.45],[1.0,1.2,0.35]], 0.17, 0.15), Kit.taper([[0,1.2,0.6],[0,1.5,0.45]], 0.2, 0.18));
  const vV = []; [[-1,0.55,-0.3,[-1.9,0.6,-0.5]],[-1,0.15,-0.3,[-1.85,-0.9,-0.6]],[1,0.5,-0.3,[1.85,0.4,-0.5]],[1,0.1,-0.3,[1.8,-0.95,-0.6]]].forEach(([s,y,z,to]) => { vV.push(Kit.taper([[s*0.45,y,z],[s*0.95,y-0.05,z-0.15],to], 0.13, 0.08)); });
  const vaM = new THREE.Mesh(Kit.merge(vA), Kit.tissue({ tex:'vein', rep:[4,1], bump:0.006, coat:0.7, rough:0.35 })), vvM = new THREE.Mesh(Kit.merge(vV), Kit.tissue({ tex:'artery', rep:[4,1], bump:0.006, coat:0.7, rough:0.35 })); vaM.userData.sub='art'; vvM.userData.sub='ven';
  add('vasos-pulmonares', [vaM, vvM]);

  /* --- ácino ampliado: alvéolos + red capilar (lupa) --- */
  const AC = V3(S.alveolos.pos);
  const loupe = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.025, 8, 64), new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:false })); loupe.position.copy(AC); loupe.lookAt(AC.clone().add(new THREE.Vector3(0.3,0.1,1)));
  const leaderTo = new THREE.Vector3(-2.55,-1.15,0.55); const ldir = leaderTo.clone().sub(AC).normalize(); const lstart = AC.clone().addScaledVector(ldir, 0.95);
  const leader = new THREE.Mesh(Kit.taper([lstart, leaderTo], 0.012, 0.012, { seg:4, rad:6 }), loupe.material);
  E.scene.add(loupe, leader);
  const alvM = Kit.tissue({ color:0xF4BDB3, rough:0.4, coat:0.75, coatRough:0.2, tex:'tissue', rep:[1,1], bump:0.004 });
  const alvGeos = [], capGeos = []; const tb = [AC.clone().add(new THREE.Vector3(0.75,0.55,-0.1)), AC.clone().add(new THREE.Vector3(0.25,0.2,0))];
  const sacs = [new THREE.Vector3(-0.25,0.2,0.05), new THREE.Vector3(0.05,-0.3,0.1), new THREE.Vector3(-0.35,-0.25,-0.1)];
  const bro = [Kit.taper([tb[0], tb[1]], 0.07, 0.055)]; sacs.forEach(sc => bro.push(Kit.taper([tb[1], AC.clone().add(sc)], 0.05, 0.04, { seg:8, rad:8 })));
  const alvCenters = [];
  sacs.forEach((sc, si) => { const cc = AC.clone().add(sc); for (let i=0;i<9;i++){ const dir = new THREE.Vector3(R()-0.5,R()-0.5,R()-0.5).normalize(); const r = 0.12 + R()*0.04; const c = cc.clone().addScaledVector(dir, 0.16); alvCenters.push(c); const g = new THREE.SphereGeometry(r, low?12:16, low?9:12); g.translate(c.x,c.y,c.z); alvGeos.push(g);
      for (let k=0;k<3;k++){ const ax = new THREE.Vector3(R()-0.5,R()-0.5,R()-0.5).normalize(); const u = new THREE.Vector3().crossVectors(ax, new THREE.Vector3(0,1,0.3)).normalize(); const v = new THREE.Vector3().crossVectors(ax, u); const a0 = R()*6, pts = []; for (let j=0;j<=10;j++){ const a = a0 + j/10*3.6; pts.push(c.clone().addScaledVector(u, Math.cos(a)*(r+0.012)).addScaledVector(v, Math.sin(a)*(r+0.012))); }
        const cg = Kit.taper(pts, 0.011, 0.011, { seg:12, rad:4 }); const col = new Float32Array(cg.attributes.position.count*3); for (let q=0;q<cg.attributes.position.count;q++){ const x = cg.attributes.position.getX(q); const t = smooth01((x - (AC.x-0.6))/1.0); col[q*3] = lin(0.27+0.6*t); col[q*3+1] = lin(0.36-0.16*t); col[q*3+2] = lin(0.78-0.6*t); } cg.setAttribute('color', new THREE.BufferAttribute(col,3)); capGeos.push(cg); } } });
  const alvMesh = new THREE.Mesh(Kit.merge(alvGeos), alvM), broMesh = new THREE.Mesh(Kit.merge(bro), Kit.tissue({ color:0xEBCFBF, rough:0.42, coat:0.5 })); alvMesh.userData.sub='alveolos'; broMesh.userData.sub='bronquiolo';
  add('alveolos', [alvMesh, broMesh], { explodeDir:new THREE.Vector3(-1,-0.4,0.6).normalize() });
  const capA = Kit.taper([AC.clone().add(new THREE.Vector3(-0.8,0.6,0.2)), AC.clone().add(new THREE.Vector3(-0.45,0.25,0.15))], 0.045, 0.035); const capVn = Kit.taper([AC.clone().add(new THREE.Vector3(0.35,-0.45,0.15)), AC.clone().add(new THREE.Vector3(0.75,-0.75,0.2))], 0.035, 0.045);
  [capA].forEach(g => { const c = new Float32Array(g.attributes.position.count*3); for (let i=0;i<c.length;i+=3){ c[i]=0.27; c[i+1]=0.36; c[i+2]=0.78; } g.setAttribute('color', new THREE.BufferAttribute(c,3)); });
  [capVn].forEach(g => { const c = new Float32Array(g.attributes.position.count*3); for (let i=0;i<c.length;i+=3){ c[i]=0.87; c[i+1]=0.2; c[i+2]=0.18; } g.setAttribute('color', new THREE.BufferAttribute(c,3)); });
  add('capilares', [new THREE.Mesh(Kit.merge([...capGeos, capA, capVn]), Kit.tissue({ vc:true, rough:0.35, coat:0.7 }))], { explodeDir:new THREE.Vector3(-1,-0.6,0.8).normalize() });

  /* --- diafragma: dos cúpulas, centro tendinoso, fibras radiales --- */
  const dg = new THREE.RingGeometry(0.001, 2.55, low?60:96, low?20:32); dg.rotateX(-Math.PI/2); { const p = dg.attributes.position; for (let i=0;i<p.count;i++){ const x=p.getX(i), z=p.getZ(i)*0.56; const r = Math.hypot(x, p.getZ(i))/2.55; const h = -2.5 + 1.1*Math.exp(-((x+1.75)*(x+1.75)/1.2 + z*z/1.6)) + 1.0*Math.exp(-((x-1.65)*(x-1.65)/1.2 + z*z/1.6)) + 0.45*Math.exp(-(x*x/0.8 + z*z/1.2)) - 0.08*Math.pow(r,4); p.setXYZ(i, x, h, z); } dg.computeVertexNormals(); }
  const dia = new THREE.Mesh(dg, orgvTex.mat({ tex:'dia', bump:0.014, coat:0.35, coatRough:0.34, rough:0.62, env:0.6, side:THREE.DoubleSide }));
  add('diafragma', [dia]);
  /* --- aire y gases --- */
  const curves = airPaths.filter((_,i) => i % Math.max(1, Math.floor(airPaths.length/10)) === 0).map(p => Kit.curve([new THREE.Vector3(0,4.7,0.05), new THREE.Vector3(0,3.6,0), ...p]));
  const air = { on:false, phase:0, speed:1, parts:[] }; const inMat = new THREE.MeshBasicMaterial({ color:0x7FD6E4, toneMapped:false }), outMat = new THREE.MeshBasicMaterial({ color:0xA7B0BA, toneMapped:false }); const pg = new THREE.SphereGeometry(0.05,8,6);
  curves.forEach(c => { for (let i=0;i<6;i++){ const m = new THREE.Mesh(pg, inMat); m.userData = { curve:c, t:i/6 }; m.visible=false; E.scene.add(m); air.parts.push(m); } });
  const gx = { on:false, t:0, parts:[] }; const o2m = new THREE.MeshBasicMaterial({ color:0xFF5A4E, toneMapped:false }), co2m = new THREE.MeshBasicMaterial({ color:0x6F8CFF, toneMapped:false });
  for (let i=0;i<14;i++){ const c = alvCenters[Math.floor(R()*alvCenters.length)]; const o = new THREE.Mesh(new THREE.SphereGeometry(0.03,8,6), o2m); const out = c.clone().add(c.clone().sub(AC).normalize().multiplyScalar(0.16)); o.userData = { from:c.clone(), to:out, off:i/14 }; o.visible=false; E.scene.add(o); gx.parts.push(o);
    const c2 = alvCenters[Math.floor(R()*alvCenters.length)]; const q = new THREE.Mesh(new THREE.SphereGeometry(0.03,8,6), co2m); q.userData = { from:c2.clone().add(c2.clone().sub(AC).normalize().multiplyScalar(0.16)), to:c2.clone(), off:i/14 }; q.visible=false; E.scene.add(q); gx.parts.push(q); }
  const lungMeshes = [...lungs.R.meshes, ...lungs.L.meshes, ...pleura]; const base = lungMeshes.map(m => m.userData.baseScale ? m.userData.baseScale.clone() : m.scale.clone());
  const model = {
    anims:[
      { id:'respiracion', label:'Respiración (diafragma y volumen pulmonar)', get on(){ return air.on; }, set(on){ air.on=on; air.parts.forEach(p=>p.visible=on); if (!on){ lungMeshes.forEach((m,i)=>m.scale.copy(m.userData.baseScale || base[i])); dia.position.y=0; dia.scale.y=1; } }, needsOpacity:0.5 },
      { id:'intercambio', label:'Intercambio gaseoso en los alvéolos (lupa)', get on(){ return gx.on; }, set(on){ gx.on=on; gx.parts.forEach(p=>p.visible=on); if (on) E.focus(AC, 4); }, focus:true }
    ],
    setSpeed(k){ air.speed=k; },
    phaseText(){ if (gx.on && !air.on) return 'O₂: alvéolo → sangre · CO₂: sangre → alvéolo (difusión) · la sangre pasa de azul a roja en la red capilar'; if (!air.on) return ''; const p = air.phase; return p<0.4 ? 'Inspiración · el diafragma se contrae y baja, el tórax se expande, la presión cae y el aire entra' : 'Espiración · el diafragma se relaja y sube, el volumen disminuye y el aire sale'; },
    legend:[{color:'#7FD6E4',txt:'Aire inspirado (rico en O₂)'},{color:'#A7B0BA',txt:'Aire espirado (más CO₂)'},{color:'var(--oxy)',txt:'O₂ pasando a la sangre'},{color:'var(--deoxy)',txt:'CO₂ saliendo de la sangre'}],
    observa:'los pulmones no se mueven solos: siguen al diafragma y a las costillas gracias a la pleura. En la lupa, observa cómo los capilares cambian de azul (sangre pobre en O₂) a rojo (sangre oxigenada) al rodear los alvéolos.'
  };
  E.onFrame((t,dt) => {
    if (!motionOK()) return;
    if (air.on){ air.phase = (air.phase + dt*0.2*air.speed) % 1; const p = air.phase; const f = p<0.4 ? (1-Math.cos(Math.PI*p/0.4))/2 : (1+Math.cos(Math.PI*(p-0.4)/0.6))/2; const insp = p<0.4;
      lungMeshes.forEach((m,i) => { const b = m.userData.baseScale || base[i]; m.scale.set(b.x*(1+0.06*f), b.y*(1+0.08*f), b.z*(1+0.06*f)); }); dia.position.y = -0.4*f; dia.scale.y = 1 - 0.12*f;
      const dir = insp ? 1 : -1; air.parts.forEach(m => { m.userData.t = ((m.userData.t + dir*dt*0.3*air.speed) % 1 + 1) % 1; m.position.copy(m.userData.curve.getPointAt(m.userData.t)); m.material = insp ? inMat : outMat; }); }
    if (gx.on){ gx.t += dt*0.35; gx.parts.forEach(p => { const k = (gx.t + p.userData.off) % 1; p.position.lerpVectors(p.userData.from, p.userData.to, k); p.scale.setScalar(0.6+0.6*Math.sin(k*Math.PI)); }); }
  });
  return model;
}
BIO.builders = { corazon: buildHeart, cerebro: buildBrain, pulmones: buildLungs };
</script>
