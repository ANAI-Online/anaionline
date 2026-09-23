<script>
/* =====================================================================
   KIT DE RENDER — ruido, texturas procedurales, materiales de tejido,
   geometría esculpida, tubos cónicos con lumen, fusión y división de mallas.
   Todo determinista (semillas fijas) para que los hotspots sean estables.
   ===================================================================== */
const Kit = (() => {
  /* ---------- aleatorio con semilla ---------- */
  const rng = (seed=1) => { let s = seed >>> 0 || 1; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };

  /* ---------- ruido simplex 3D ---------- */
  const grad3 = [1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1];
  const perm = new Uint8Array(512); (() => { const p = []; for (let i=0;i<256;i++) p.push(i); const R = rng(1337); for (let i=255;i>0;i--){ const j = Math.floor(R()*(i+1)); [p[i],p[j]]=[p[j],p[i]]; } for (let i=0;i<512;i++) perm[i]=p[i&255]; })();
  const F3 = 1/3, G3 = 1/6;
  function n3(x,y,z){
    const s=(x+y+z)*F3, i=Math.floor(x+s), j=Math.floor(y+s), k=Math.floor(z+s), t=(i+j+k)*G3;
    const x0=x-(i-t), y0=y-(j-t), z0=z-(k-t); let i1,j1,k1,i2,j2,k2;
    if (x0>=y0){ if (y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0;} else if (x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1;} else {i1=0;j1=0;k1=1;i2=1;j2=0;k2=1;} }
    else { if (y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1;} else if (x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1;} else {i1=0;j1=1;k1=0;i2=1;j2=1;k2=0;} }
    const x1=x0-i1+G3, y1=y0-j1+G3, z1=z0-k1+G3, x2=x0-i2+2*G3, y2=y0-j2+2*G3, z2=z0-k2+2*G3, x3=x0-1+3*G3, y3=y0-1+3*G3, z3=z0-1+3*G3;
    const ii=i&255, jj=j&255, kk=k&255;
    const c = (tt, gi, a, b, d) => { if (tt<0) return 0; tt*=tt; const g=gi*3; return tt*tt*(grad3[g]*a+grad3[g+1]*b+grad3[g+2]*d); };
    return 32*( c(0.6-x0*x0-y0*y0-z0*z0, perm[ii+perm[jj+perm[kk]]]%12, x0,y0,z0)
              + c(0.6-x1*x1-y1*y1-z1*z1, perm[ii+i1+perm[jj+j1+perm[kk+k1]]]%12, x1,y1,z1)
              + c(0.6-x2*x2-y2*y2-z2*z2, perm[ii+i2+perm[jj+j2+perm[kk+k2]]]%12, x2,y2,z2)
              + c(0.6-x3*x3-y3*y3-z3*z3, perm[ii+1+perm[jj+1+perm[kk+1]]]%12, x3,y3,z3) );
  }
  const fbm = (x,y,z,o=4) => { let a=0.5,f=1,s=0; for (let i=0;i<o;i++){ s+=a*n3(x*f,y*f,z*f); f*=2.03; a*=0.5; } return s; };

  /* ---------- ruido de valor periódico (texturas sin costuras) ---------- */
  function pnoise(P, seed){ const g = new Float32Array(P*P); const R = rng(seed); for (let i=0;i<g.length;i++) g[i] = R()*2-1;
    return (x,y) => { const fx=x*P, fy=y*P, x0=Math.floor(fx), y0=Math.floor(fy), tx=fx-x0, ty=fy-y0, sx=tx*tx*(3-2*tx), sy=ty*ty*(3-2*ty);
      const i0=((x0%P)+P)%P, i1=(i0+1)%P, j0=((y0%P)+P)%P, j1=(j0+1)%P, a=g[j0*P+i0], b=g[j0*P+i1], c=g[j1*P+i0], d=g[j1*P+i1];
      return a+(b-a)*sx+(c-a)*sy+(a-b-c+d)*sx*sy; }; }
  const pf = (seed, base=4, oct=5) => { const L = []; for (let i=0;i<oct;i++) L.push(pnoise(base<<i, seed+i*97)); return (u,v) => { let s=0,a=0.5; for (const n of L){ s+=a*n(u,v); a*=0.5; } return s; }; };

  /* ---------- texturas procedurales (color + relieve), cacheadas ---------- */
  const cache = {};
  const SZ = () => (lowEnd() ? 256 : 512);
  function paint(key, fn){
    if (cache[key]) return cache[key];
    const N = SZ(); const cc = document.createElement('canvas'), bc = document.createElement('canvas'); cc.width=cc.height=bc.width=bc.height=N;
    const cx = cc.getContext('2d'), bx = bc.getContext('2d'); const ci = cx.createImageData(N,N), bi = bx.createImageData(N,N);
    const out = { c:[0,0,0], h:0 };
    for (let y=0;y<N;y++) for (let x=0;x<N;x++){ fn(x/N, y/N, out); const k=(y*N+x)*4; ci.data[k]=out.c[0]; ci.data[k+1]=out.c[1]; ci.data[k+2]=out.c[2]; ci.data[k+3]=255; const hv = Math.max(0,Math.min(255,out.h*255)); bi.data[k]=bi.data[k+1]=bi.data[k+2]=hv; bi.data[k+3]=255; }
    cx.putImageData(ci,0,0); bx.putImageData(bi,0,0);
    return (cache[key] = { color:cc, bump:bc });
  }
  const mix = (a,b,t) => a+(b-a)*t;
  const mixc = (A,B,t,o) => { o[0]=mix(A[0],B[0],t); o[1]=mix(A[1],B[1],t); o[2]=mix(A[2],B[2],t); return o; };
  const hex = h => [(h>>16)&255,(h>>8)&255,h&255];
  const cl = v => v<0?0:v>1?1:v;

  const TEX = {
    myocardium(){ const n = pf(11,4,5), f = pf(23,8,3); return paint('myo', (u,v,o) => { const fib = 0.5+0.5*Math.sin((u*38+v*22)*Math.PI*2/2 + f(u,v)*6); const nn = n(u,v); const t = cl(0.5+nn*0.9); mixc(hex(0x6E1E1C), hex(0xA8403A), t, o.c); const k = 0.9+0.12*fib; o.c[0]*=k; o.c[1]*=k; o.c[2]*=k; o.h = 0.5+0.25*nn+0.12*fib; }); },
    atrium(){ const n = pf(31,6,5), w = pf(37,16,3); return paint('atr', (u,v,o) => { const nn=n(u,v), ww=w(u,v); mixc(hex(0x5E1A22), hex(0x94383A), cl(0.5+nn), o.c); o.h = 0.5+0.35*ww+0.2*nn; }); },
    fat(){ const n = pf(41,8,4), m = pf(43,24,2); return paint('fat', (u,v,o) => { const nn=n(u,v), mm=m(u,v); const lob = Math.abs(mm); mixc(hex(0xC9993F), hex(0xF0D48A), cl(0.55+nn*0.8), o.c); const k = 0.85+0.3*Math.min(1,lob*4); o.c[0]*=k; o.c[1]*=k; o.c[2]*=k; o.h = 0.5+0.4*Math.min(1,lob*3)+0.1*nn; }); },
    artery(){ const n = pf(51,4,4), s = pf(53,16,2); return paint('art', (u,v,o) => { const nn=n(u,v); mixc(hex(0xA42A26), hex(0xC4453C), cl(0.55+nn*0.6), o.c); o.h = 0.5+0.12*nn+0.08*s(u,v); }); },
    vein(){ const n = pf(61,4,4); return paint('vein', (u,v,o) => { const nn=n(u,v); mixc(hex(0x34489A), hex(0x5670BE), cl(0.55+nn*0.6), o.c); o.h = 0.5+0.12*nn; }); },
    lung(){ const n = pf(71,4,5), cell = pf(73,20,2), sp = pf(79,64,1); return paint('lung', (u,v,o) => { const nn=n(u,v), cc=cell(u,v), ss=sp(u,v); const lobule = 1-Math.min(1,Math.abs(cc)*9); mixc(hex(0xC06A66), hex(0xF0B0A6), cl(0.55+nn*0.9), o.c); const d = 1-0.18*lobule - (ss>0.42?0.25:0); o.c[0]*=d; o.c[1]*=d; o.c[2]*=d; o.h = 0.55+0.2*nn-0.25*lobule+0.15*ss; }); },
    diaphragm(){ const n = pf(81,6,4); return paint('dia', (u,v,o) => { const x=u-0.5, y=v-0.5, r=Math.hypot(x,y)*2, a=Math.atan2(y,x); const fib = 0.5+0.5*Math.sin(a*140 + n(u,v)*6); const tendon = cl((0.4 - r)*5 + n(u,v)*1.4); mixc(mixc(hex(0x6A221E), hex(0x7C2E28), 0.5+0.5*n(u*2,v*2), [0,0,0]), hex(0xD9D2C6), tendon, o.c); o.h = 0.5 + 0.12*fib*(1-tendon) + 0.1*n(u*4,v*4); }); },
    cartilage(){ const n = pf(91,6,4); return paint('cart', (u,v,o) => { const nn=n(u,v); mixc(hex(0xCDBB9E), hex(0xF2E8D6), cl(0.6+nn), o.c); o.h = 0.5+0.2*nn; }); },
    membrane(){ const n = pf(101,32,3); return paint('memb', (u,v,o) => { const nn=n(u,v); mixc(hex(0x8FD3DC), hex(0xD6F1F4), cl(0.5+nn), o.c); o.h = 0.5+0.45*nn; }); },
    granular(){ const n = pf(111,48,2), m = pf(113,6,3); return paint('gran', (u,v,o) => { const nn=n(u,v), mm=m(u,v); const g = 0.5+0.5*Math.sign(nn)*Math.min(1,Math.abs(nn)*3); mixc([200,200,200],[255,255,255], g*0.7+0.3*cl(0.5+mm), o.c); o.h = g; }); },
    tissue(){ const n = pf(121,8,5); return paint('tis', (u,v,o) => { const nn=n(u,v); mixc([215,215,215],[255,255,255], cl(0.6+nn), o.c); o.h = 0.5+0.3*nn; }); }
  };
  const texCache = new WeakMap();
  function texFrom(canvas, srgb, rep){ const t = new THREE.CanvasTexture(canvas); t.wrapS = t.wrapT = THREE.RepeatWrapping; if (srgb) t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; if (rep) t.repeat.set(rep[0], rep[1]); return t; }

  /* ---------- materiales ---------- */
  function tissue(o={}){
    const m = new THREE.MeshPhysicalMaterial({ color: o.color ?? 0xffffff, roughness: o.rough ?? 0.46, metalness: 0, clearcoat: o.coat ?? 0.5, clearcoatRoughness: o.coatRough ?? 0.32, side: o.side ?? THREE.FrontSide, vertexColors: !!o.vc, transparent: !!o.transparent, opacity: o.opacity ?? 1, depthWrite: o.depthWrite ?? !o.transparent, envMapIntensity: o.env ?? 1 });
    if (o.tex){ const T = TEX[o.tex](); m.map = texFrom(T.color, true, o.rep); if (o.bump !== 0){ m.bumpMap = texFrom(T.bump, false, o.rep); m.bumpScale = o.bump ?? 0.02; } if (o.color === undefined) m.color.set(0xffffff); }
    return m;
  }

  /* ---------- geometría ---------- */
  function weldNormals(g){ const pos = g.attributes.position, nor = g.attributes.normal, map = new Map(); const key = i => `${Math.round(pos.getX(i)*1e4)},${Math.round(pos.getY(i)*1e4)},${Math.round(pos.getZ(i)*1e4)}`;
    for (let i=0;i<pos.count;i++){ const k = key(i); const a = map.get(k); if (a){ a[0]+=nor.getX(i); a[1]+=nor.getY(i); a[2]+=nor.getZ(i); a.push(i); } else map.set(k, [nor.getX(i),nor.getY(i),nor.getZ(i), i]); }
    map.forEach(a => { if (a.length<5) return; const l = Math.hypot(a[0],a[1],a[2])||1; for (let j=3;j<a.length;j++) nor.setXYZ(a[j], a[0]/l, a[1]/l, a[2]/l); }); nor.needsUpdate = true; return g; }
  /* Esfera esculpida: shape(d) → posición; disp(p,d) → desplazamiento a lo largo de d; color(p,d,disp,out) opcional */
  function sculpt(o){
    const low = lowEnd(); const g = new THREE.SphereGeometry(1, o.w ?? (low?56:96), o.h ?? (low?40:72), o.phiStart ?? 0, o.phiLength ?? Math.PI*2, o.thetaStart ?? 0, o.thetaLength ?? Math.PI);
    const pos = g.attributes.position, d = new THREE.Vector3(), p = new THREE.Vector3(); const cols = o.color ? new Float32Array(pos.count*3) : null; const out = [1,1,1];
    const extra = o.store ? [] : null;
    for (let i=0;i<pos.count;i++){ d.fromBufferAttribute(pos,i).normalize(); if (o.shape) p.copy(o.shape(d.clone())); else p.copy(d).multiply(o.radii ? V3(o.radii) : new THREE.Vector3(1,1,1));
      const dz = o.disp ? o.disp(p, d) : 0; if (dz) { const nrm = o.dispDir ? o.dispDir(p,d) : d; p.addScaledVector(nrm, dz); }
      pos.setXYZ(i, p.x, p.y, p.z); if (cols){ o.color(p, d, dz, out, i); cols[i*3]=out[0]; cols[i*3+1]=out[1]; cols[i*3+2]=out[2]; } if (extra) extra.push(o.store(p,d,dz)); }
    if (cols) g.setAttribute('color', new THREE.BufferAttribute(cols,3));
    g.computeVertexNormals(); weldNormals(g); if (extra) g.userData.extra = extra; return g;
  }
  const curve = pts => pts.isCurve ? pts : new THREE.CatmullRomCurve3(pts.map(p => p.isVector3 ? p : V3(p)), false, 'catmullrom', 0.5);
  /* Tubo cónico: radio r0→r1 o función rfn(u) */
  function taper(pts, r0, r1, o={}){ const low = lowEnd(); const c = curve(pts); const T = o.seg ?? (low?28:56), R = o.rad ?? (low?10:18); const g = new THREE.TubeGeometry(c, T, 1, R, false);
    const pos = g.attributes.position, P = new THREE.Vector3(), v = new THREE.Vector3();
    for (let i=0;i<=T;i++){ const u=i/T; c.getPointAt(u,P); const rr = o.rfn ? o.rfn(u) : r0+(r1-r0)*u; for (let j=0;j<=R;j++){ const k=i*(R+1)+j; v.fromBufferAttribute(pos,k).sub(P); if (o.bumpy){ const b = 1 + o.bumpy*n3(u*o.bf, j/R*4, o.seed||0); v.multiplyScalar(b); } v.multiplyScalar(rr).add(P); pos.setXYZ(k,v.x,v.y,v.z); } }
    g.userData.curve = c; g.userData.r0 = o.rfn ? o.rfn(0) : r0; g.userData.r1 = o.rfn ? o.rfn(1) : r1; return g; }
  /* Tapa de vaso cortado: pared + lumen oscuro */
  function cap(c, atEnd, r, wallMat, lumenColor){ const u = atEnd ? 1 : 0; const p = c.getPointAt(u), t = c.getTangentAt(u).normalize(); if (!atEnd) t.negate();
    const g = new THREE.RingGeometry(r*0.7, r*1.0, 28, 1), l = new THREE.CircleGeometry(r*0.7, 28);
    const m1 = new THREE.Mesh(g, wallMat), m2 = new THREE.Mesh(l, new THREE.MeshStandardMaterial({ color:lumenColor, roughness:0.9 }));
    [m1,m2].forEach(m => { m.position.copy(p).addScaledVector(t, 0.002); m.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), t); }); return [m1, m2]; }
  /* Fusionar geometrías (para mallas con muchas piezas) */
  function merge(geos){ let vc=0, ic=0; const uv = geos.every(g=>g.attributes.uv), col = geos.every(g=>g.attributes.color);
    geos.forEach(g => { if (!g.attributes.normal) g.computeVertexNormals(); vc += g.attributes.position.count; ic += g.index ? g.index.count : g.attributes.position.count; });
    const P = new Float32Array(vc*3), N = new Float32Array(vc*3), U = uv ? new Float32Array(vc*2) : null, C = col ? new Float32Array(vc*3) : null, I = new Uint32Array(ic); let vo=0, io=0;
    geos.forEach(g => { const n = g.attributes.position.count; P.set(g.attributes.position.array, vo*3); N.set(g.attributes.normal.array, vo*3); if (U) U.set(g.attributes.uv.array, vo*2); if (C) C.set(g.attributes.color.array, vo*3);
      if (g.index){ const a = g.index.array; for (let i=0;i<a.length;i++) I[io+i] = a[i]+vo; io += a.length; } else { for (let i=0;i<n;i++) I[io+i] = vo+i; io += n; } vo += n; g.dispose(); });
    const out = new THREE.BufferGeometry(); out.setAttribute('position', new THREE.BufferAttribute(P,3)); out.setAttribute('normal', new THREE.BufferAttribute(N,3)); if (U) out.setAttribute('uv', new THREE.BufferAttribute(U,2)); if (C) out.setAttribute('color', new THREE.BufferAttribute(C,3)); out.setIndex(new THREE.BufferAttribute(I,1)); return out; }
  /* Dividir una geometría indexada por regiones (lóbulos, cisuras) */
  function split(g, regionOfVertex){ const pos=g.attributes.position, nor=g.attributes.normal, col=g.attributes.color, uv=g.attributes.uv, idx=g.index.array; const reg = new Array(pos.count); for (let i=0;i<pos.count;i++) reg[i] = regionOfVertex(i);
    const buckets = {}; for (let t=0;t<idx.length;t+=3){ const a=idx[t],b=idx[t+1],c=idx[t+2]; const r = (reg[a]===reg[b]||reg[a]===reg[c]) ? reg[a] : reg[b]===reg[c] ? reg[b] : reg[a]; (buckets[r] ||= []).push(a,b,c); }
    const out = {}; for (const [r,list] of Object.entries(buckets)){ const map = new Map(), Pp=[], Nn=[], Cc=[], Uu=[], Ii=[]; for (const vi of list){ let ni = map.get(vi); if (ni===undefined){ ni = map.size; map.set(vi,ni); Pp.push(pos.getX(vi),pos.getY(vi),pos.getZ(vi)); Nn.push(nor.getX(vi),nor.getY(vi),nor.getZ(vi)); if (col) Cc.push(col.getX(vi),col.getY(vi),col.getZ(vi)); if (uv) Uu.push(uv.getX(vi),uv.getY(vi)); } Ii.push(ni); }
      const ng = new THREE.BufferGeometry(); ng.setAttribute('position', new THREE.Float32BufferAttribute(Pp,3)); ng.setAttribute('normal', new THREE.Float32BufferAttribute(Nn,3)); if (col) ng.setAttribute('color', new THREE.Float32BufferAttribute(Cc,3)); if (uv) ng.setAttribute('uv', new THREE.Float32BufferAttribute(Uu,2)); ng.setIndex(Ii); out[r] = ng; }
    return out; }
  /* Dividir una malla por una superficie implícita (valor con signo por vértice) recortando los triángulos: borde limpio, sin dientes de sierra */
  function splitPlane(g, sval, negName, posName){ const pos=g.attributes.position, nor=g.attributes.normal, col=g.attributes.color, uv=g.attributes.uv, idx=g.index.array;
    const S = new Float32Array(pos.count); for (let i=0;i<pos.count;i++) S[i] = sval(i);
    const out = { [negName]:{P:[],N:[],C:[],U:[]}, [posName]:{P:[],N:[],C:[],U:[]} };
    const V = i => ({ p:[pos.getX(i),pos.getY(i),pos.getZ(i)], n:[nor.getX(i),nor.getY(i),nor.getZ(i)], c: col?[col.getX(i),col.getY(i),col.getZ(i)]:null, u: uv?[uv.getX(i),uv.getY(i)]:null, s:S[i] });
    const L = (a,b,t) => { const n = a.n.map((v,k)=>v+(b.n[k]-v)*t), l = Math.hypot(...n)||1; return { p:a.p.map((v,k)=>v+(b.p[k]-v)*t), n:n.map(v=>v/l), c:a.c?a.c.map((v,k)=>v+(b.c[k]-v)*t):null, u:a.u?a.u.map((v,k)=>v+(b.u[k]-v)*t):null, s:0 }; };
    const push = (side, ...vs) => { const o = out[side]; vs.forEach(a => { o.P.push(...a.p); o.N.push(...a.n); if (a.c) o.C.push(...a.c); if (a.u) o.U.push(...a.u); }); };
    const side = v => v.s > 0 ? posName : negName;
    for (let t=0;t<idx.length;t+=3){ const a=V(idx[t]), b=V(idx[t+1]), c=V(idx[t+2]); const A=a.s>0, B=b.s>0, C=c.s>0;
      if (A===B && B===C){ push(side(a), a,b,c); continue; }
      const [l,m,n] = (A!==B && A!==C) ? [a,b,c] : (B!==A && B!==C) ? [b,c,a] : [c,a,b];
      const x = L(l,m, l.s/(l.s-m.s)), y = L(l,n, l.s/(l.s-n.s));
      push(side(l), l,x,y); push(side(m), x,m,n, x,n,y); }
    const res = {}; for (const [k,o] of Object.entries(out)){ const ng = new THREE.BufferGeometry(); ng.setAttribute('position', new THREE.Float32BufferAttribute(o.P,3)); ng.setAttribute('normal', new THREE.Float32BufferAttribute(o.N,3)); if (col) ng.setAttribute('color', new THREE.Float32BufferAttribute(o.C,3)); if (uv) ng.setAttribute('uv', new THREE.Float32BufferAttribute(o.U,2)); res[k] = ng; }
    return res; }
  /* Pegar puntos a una superficie mediante rayos desde fuera */
  function snap(points, meshes, center, lift=0.03){ const ray = new THREE.Raycaster(); meshes.forEach(m=>m.updateMatrixWorld(true)); const out = [];
    for (const q of points){ const p = q.isVector3 ? q.clone() : V3(q); const dir = p.clone().sub(center).normalize(); ray.set(center.clone().addScaledVector(dir, 12), dir.clone().negate()); const hit = ray.intersectObjects(meshes, false)[0]; if (hit){ const nrm = hit.face ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld) : dir; out.push(hit.point.clone().addScaledVector(nrm, lift)); } }
    return out; }
  function densify(pts, n){ const c = curve(pts); const out = []; for (let i=0;i<=n;i++) out.push(c.getPointAt(i/n)); return out; }

  /* ---------- entorno de estudio (reflejos) ---------- */
  function studio(renderer, dark){ const pm = new THREE.PMREMGenerator(renderer); const sc = new THREE.Scene();
    const g = new THREE.SphereGeometry(20, 32, 16); const cols = []; const pos = g.attributes.position; for (let i=0;i<pos.count;i++){ const y = pos.getY(i)/20; const c = new THREE.Color().setHSL(0.58, 0.18, (dark?0.05:0.14) + (dark?0.18:0.34)*Math.max(0,y) + 0.05*Math.max(0,-y)); cols.push(c.r,c.g,c.b); }
    g.setAttribute('color', new THREE.Float32BufferAttribute(cols,3)); sc.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors:true, side:THREE.BackSide })));
    const panel = (w,h,p,k,col) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w,h), new THREE.MeshBasicMaterial({ color:new THREE.Color(col).multiplyScalar(k), side:THREE.DoubleSide })); m.position.set(...p); m.lookAt(0,0,0); sc.add(m); };
    panel(14,7,[2,15,7],3.4,0xffffff); panel(7,11,[-15,4,5],1.7,0xe3edff); panel(7,11,[15,2,-5],1.3,0xffeadc); panel(12,4,[0,-7,15],0.7,0xffffff); panel(5,5,[0,6,-16],1.6,0xcfe4ff);
    const rt = pm.fromScene(sc, 0.035); pm.dispose(); sc.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); return rt.texture; }
  function contactShadow(size, y, opacity=0.35){ const c = document.createElement('canvas'); c.width=c.height=128; const x = c.getContext('2d'); const gr = x.createRadialGradient(64,64,4,64,64,64); gr.addColorStop(0,'rgba(10,20,35,1)'); gr.addColorStop(0.45,'rgba(10,20,35,0.45)'); gr.addColorStop(1,'rgba(10,20,35,0)'); x.fillStyle=gr; x.fillRect(0,0,128,128);
    const t = new THREE.CanvasTexture(c); const m = new THREE.Mesh(new THREE.PlaneGeometry(size,size), new THREE.MeshBasicMaterial({ map:t, transparent:true, opacity, depthWrite:false, toneMapped:false })); m.rotation.x = -Math.PI/2; m.position.y = y; m.renderOrder = -1; return m; }

  return { rng, n3, fbm, TEX, tissue, sculpt, taper, cap, merge, split, splitPlane, snap, densify, curve, studio, contactShadow, weldNormals };
})();
</script>
