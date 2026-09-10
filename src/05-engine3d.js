<script>
/* =====================================================================
   MOTOR 3D — Three.js. Controles orbitales propios, picking, etiquetas,
   capas, transparencia, separación, animaciones. Reutilizable por modelo.
   ===================================================================== */
class Engine3D {
  constructor(container, opts={}){
    this.opts = Object.assign({ interactive:true, autoRotate:false, radius:8, labels:true, minR:3, maxR:16, phi:1.25, theta:0.35 }, opts);
    this.container = container; this.parts = new Map(); this.labels = new Map(); this.frameCbs = []; this.selected = null; this.hovered = null; this.active = true; this.low = lowEnd();
    const r = this.renderer = new THREE.WebGLRenderer({ antialias: !this.low, alpha:true, powerPreference:'high-performance' });
    r.setPixelRatio(Math.min(window.devicePixelRatio||1, this.low ? 1.25 : 2)); r.outputEncoding = THREE.sRGBEncoding;
    const c = this.canvas = r.domElement; c.setAttribute('tabindex','0'); c.setAttribute('role','img'); c.setAttribute('aria-label', opts.aria || 'Modelo 3D interactivo. Arrastra para rotar, rueda para acercar. Usa la lista de estructuras para seleccionar con teclado.');
    container.append(c);
    this.labelsEl = h('div',{class:'labels','aria-hidden':'true'}); container.append(this.labelsEl);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.home = new THREE.Vector3(...(this.opts.target||[0,0,0])); this.target = this.home.clone(); this.sph = { r:this.opts.radius, phi:this.opts.phi, theta:this.opts.theta }; this.goal = Object.assign({}, this.sph); this.goalTarget = this.target.clone();
    const hemi = new THREE.HemisphereLight(0xffffff, 0x6b7f94, 0.45); this.scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 0.75); key.position.set(4,6,6); this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xbfd8e6, 0.25); fill.position.set(-5,-2,-4); this.scene.add(fill);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    this.ray = new THREE.Raycaster(); this.mouse = new THREE.Vector2();
    this.ro = new ResizeObserver(()=>this.resize()); this.ro.observe(container); this.resize();
    if (this.opts.interactive) this.bindInput();
    this.clock = new THREE.Clock(); this.loop = this.loop.bind(this); this.raf = requestAnimationFrame(this.loop);
    this.visHandler = () => { if (!document.hidden && this.active) { this.clock.getDelta(); } }; document.addEventListener('visibilitychange', this.visHandler);
  }
  resize(){ const w = this.container.clientWidth||1, hgt = this.container.clientHeight||1; this.renderer.setSize(w,hgt,false); this.camera.aspect = w/hgt; this.camera.updateProjectionMatrix(); }
  bindInput(){
    const c = this.canvas; let down=false, moved=0, lx=0, ly=0, pinch=0;
    c.addEventListener('pointerdown', e => { down=true; moved=0; lx=e.clientX; ly=e.clientY; c.setPointerCapture(e.pointerId); });
    c.addEventListener('pointermove', e => {
      if (down){ const dx=e.clientX-lx, dy=e.clientY-ly; lx=e.clientX; ly=e.clientY; moved += Math.abs(dx)+Math.abs(dy);
        if (e.shiftKey || e.buttons===4 || e.buttons===2){ this.pan(dx,dy); } else { this.goal.theta -= dx*0.008; this.goal.phi = clamp(this.goal.phi - dy*0.008, 0.15, Math.PI-0.15); } }
      else this.hoverAt(e);
    });
    const up = e => { if (down && moved < 6) this.clickAt(e); down=false; };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', ()=>down=false);
    c.addEventListener('wheel', e => { e.preventDefault(); this.goal.r = clamp(this.goal.r * (1 + Math.sign(e.deltaY)*0.08), this.opts.minR, this.opts.maxR); }, {passive:false});
    c.addEventListener('contextmenu', e => e.preventDefault());
    c.addEventListener('touchstart', e => { if (e.touches.length===2) pinch = Math.hypot(e.touches[0].clientX-e.touches[1].clientX, e.touches[0].clientY-e.touches[1].clientY); }, {passive:true});
    c.addEventListener('touchmove', e => { if (e.touches.length===2){ const d = Math.hypot(e.touches[0].clientX-e.touches[1].clientX, e.touches[0].clientY-e.touches[1].clientY); if (pinch) this.goal.r = clamp(this.goal.r * (pinch/d), this.opts.minR, this.opts.maxR); pinch=d; } }, {passive:true});
    c.addEventListener('keydown', e => { const k=e.key; const step=0.12; if (k==='ArrowLeft'){this.goal.theta+=step;} else if (k==='ArrowRight'){this.goal.theta-=step;} else if (k==='ArrowUp'){this.goal.phi=clamp(this.goal.phi-step,0.15,Math.PI-0.15);} else if (k==='ArrowDown'){this.goal.phi=clamp(this.goal.phi+step,0.15,Math.PI-0.15);} else if (k==='+'||k==='='){this.goal.r=clamp(this.goal.r*0.85,this.opts.minR,this.opts.maxR);} else if (k==='-'){this.goal.r=clamp(this.goal.r*1.15,this.opts.minR,this.opts.maxR);} else if (k==='0'){this.resetView();} else return; e.preventDefault(); });
  }
  pan(dx,dy){ const v = new THREE.Vector3(); const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix,0); const upv = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix,1); const k = this.sph.r*0.0016; v.addScaledVector(right,-dx*k).addScaledVector(upv,dy*k); this.goalTarget.add(v); }
  resetView(){ this.goal = { r:this.opts.radius, phi:this.opts.phi, theta:this.opts.theta }; this.goalTarget.copy(this.home); }
  focus(pos, r){ this.goalTarget.copy(pos); if (r) this.goal.r = r; }
  setPointer(e){ const rect = this.canvas.getBoundingClientRect(); this.mouse.x = ((e.clientX-rect.left)/rect.width)*2-1; this.mouse.y = -((e.clientY-rect.top)/rect.height)*2+1; }
  pick(e){ this.setPointer(e); this.ray.setFromCamera(this.mouse, this.camera); const meshes = []; this.parts.forEach(p => { if (p.visible && p.pickable!==false) meshes.push(...p.meshes); }); const hits = this.ray.intersectObjects(meshes, false); let soft=null; for (const hit of hits){ const id = hit.object.userData.id; const p = this.parts.get(id); if (!p) continue; const translucent = p.passThrough || (p.opacity!==undefined && p.opacity<0.5); if (translucent){ if (!soft) soft=id; continue; } return id; } return soft; }
  hoverAt(e){ const now = performance.now(); if (now - (this._ht||0) < 50) return; this._ht = now; const id = this.pick(e); if (id !== this.hovered){ this.hovered = id; this.canvas.style.cursor = id ? 'pointer' : 'grab'; this.refreshEmissive(); this.opts.onHover && this.opts.onHover(id); } }
  clickAt(e){ const id = this.pick(e); this.opts.onSelect && this.opts.onSelect(id, 'modelo'); }
  addPart(id, meshes, info={}){ meshes.forEach(m => { m.userData.id = id; m.userData.base = m.position.clone(); m.userData.baseScale = m.scale.clone(); this.scene.add(m); }); const p = Object.assign({ id, meshes, visible:true, opacity:1 }, info); this.parts.set(id, p); return p; }
  addLabel(id, text, pos){ const el = h('button',{class:'lbl',type:'button',onclick:()=>this.opts.onSelect && this.opts.onSelect(id,'etiqueta')}, text); this.labelsEl.append(el); this.labels.set(id, { el, pos: new THREE.Vector3(...pos) }); }
  setLabels(on){ this.labelsEl.style.display = on ? '' : 'none'; this._labelsOn = on; }
  select(id){ this.selected = id; this.refreshEmissive(); this.labels.forEach((l,k)=>l.el.classList.toggle('sel', k===id)); }
  refreshEmissive(){ this.parts.forEach(p => p.meshes.forEach(m => { if (!m.material.emissive) return; const sel = p.id===this.selected, hov = p.id===this.hovered; m.material.emissive.set(sel||hov ? 0xffffff : 0x000000); m.material.emissiveIntensity = sel ? 0.28 : hov ? 0.14 : 0; })); }
  setVisible(id, v){ const p = this.parts.get(id); if (!p) return; p.visible = v; p.meshes.forEach(m => m.visible = v); const l = this.labels.get(id); if (l) l.el.style.display = v ? '' : 'none'; }
  setOpacity(id, o){ const p = this.parts.get(id); if (!p) return; p.opacity = o; p.meshes.forEach(m => { m.material.transparent = o<1; m.material.opacity = o; m.material.depthWrite = o>=0.99; }); }
  setExplode(f){ this.parts.forEach(p => { if (!p.explodeDir) return; p.meshes.forEach(m => { m.position.copy(m.userData.base).addScaledVector(p.explodeDir, f*1.5); }); const l = this.labels.get(p.id); if (l) l.pos.copy(l.base||(l.base=l.pos.clone())).addScaledVector(p.explodeDir, f*1.5); }); }
  onFrame(fn){ this.frameCbs.push(fn); }
  updateLabels(){ if (this._labelsOn===false) return; const W = this.container.clientWidth, H = this.container.clientHeight; const cam = this.camera.position.clone().sub(this.target).normalize(); const v = new THREE.Vector3();
    this.labels.forEach((l,id) => { const p = this.parts.get(id); if (p && !p.visible){ l.el.style.display='none'; return; } v.copy(l.pos).project(this.camera); const dir = l.pos.clone().sub(this.target).normalize(); const front = dir.dot(cam) > -0.35; if (v.z>1 || !front){ l.el.style.display='none'; return; } l.el.style.display=''; l.el.style.left = ((v.x+1)/2*W)+'px'; l.el.style.top = ((1-v.y)/2*H)+'px'; }); }
  loop(){
    this.raf = requestAnimationFrame(this.loop);
    if (!this.active || document.hidden) return;
    const dt = Math.min(this.clock.getDelta(), 0.05); const t = this.clock.elapsedTime;
    if (this.opts.autoRotate && motionOK()) this.goal.theta += dt*0.25;
    const k = 1 - Math.pow(0.001, dt); this.sph.r += (this.goal.r-this.sph.r)*k; this.sph.phi += (this.goal.phi-this.sph.phi)*k; this.sph.theta += (this.goal.theta-this.sph.theta)*k; this.target.lerp(this.goalTarget, k);
    const {r,phi,theta} = this.sph; this.camera.position.set(this.target.x + r*Math.sin(phi)*Math.sin(theta), this.target.y + r*Math.cos(phi), this.target.z + r*Math.sin(phi)*Math.cos(theta)); this.camera.lookAt(this.target);
    for (const fn of this.frameCbs) fn(t, dt);
    this.renderer.render(this.scene, this.camera); this.updateLabels();
  }
  capture(){ this.renderer.render(this.scene, this.camera); const src = this.canvas; const out = document.createElement('canvas'); const w = 480, hh = Math.round(480*src.height/src.width); out.width=w; out.height=hh; const ctx = out.getContext('2d'); ctx.fillStyle = cssVar('--bg-2'); ctx.fillRect(0,0,w,hh); ctx.drawImage(src,0,0,w,hh); return out.toDataURL('image/jpeg', 0.72); }
  dispose(){ this.active=false; cancelAnimationFrame(this.raf); this.ro.disconnect(); document.removeEventListener('visibilitychange', this.visHandler); this.scene.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose()); } }); this.renderer.dispose(); this.canvas.remove(); this.labelsEl.remove(); }
}

/* ---------- utilidades geométricas ---------- */
const mat = (color, extra={}) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness:0.55, metalness:0.05 }, extra));
const V3 = a => new THREE.Vector3(a[0],a[1],a[2]);
const curveOf = pts => new THREE.CatmullRomCurve3(pts.map(V3), false, 'catmullrom', 0.4);
function tube(pts, radius, color, low){ const c = curveOf(pts); const g = new THREE.TubeGeometry(c, low?32:64, radius, low?8:14, false); const m = new THREE.Mesh(g, mat(color)); m.userData.curve = c; return m; }
function blob(radius, scale, pos, color, low){ const g = new THREE.SphereGeometry(radius, low?28:48, low?20:36); const m = new THREE.Mesh(g, mat(color)); m.scale.set(...scale); m.position.set(...pos); return m; }

/* =====================================================================
   MODELO: CORAZÓN (procedimental, simplificado). Sustituible por glTF.
   ===================================================================== */
function buildHeart(E, opts={}){
  const low = E.low; const S = Object.fromEntries(BIO.heart.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s = S[id]; const center = V3(s.pos); const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, interno:s.interno, explodeDir: center.clone().normalize() }, extra)); E.addLabel(id, s.nombre, s.lbl); return p; };
  add('auricula-derecha', [blob(0.85,[1,0.95,0.9],S['auricula-derecha'].pos,S['auricula-derecha'].color,low)]);
  add('auricula-izquierda', [blob(0.75,[1,0.9,0.9],S['auricula-izquierda'].pos,S['auricula-izquierda'].color,low)]);
  add('ventriculo-derecho', [blob(1.0,[0.95,1.35,0.85],S['ventriculo-derecho'].pos,S['ventriculo-derecho'].color,low)]);
  add('ventriculo-izquierdo', [blob(1.05,[1.05,1.55,1.0],S['ventriculo-izquierdo'].pos,S['ventriculo-izquierdo'].color,low)]);
  const tab = new THREE.Mesh(new THREE.BoxGeometry(0.18,2.1,1.2), mat(S.tabique.color)); tab.position.set(...S.tabique.pos); tab.rotation.z = -0.12;
  add('tabique', [tab], { explodeDir:new THREE.Vector3(0,0,1) });
  add('vena-cava-superior', [tube([[-1.1,3.3,0.1],[-1.1,2.4,0.12],[-1.05,1.55,0.15]],0.27,S['vena-cava-superior'].color,low)]);
  add('vena-cava-inferior', [tube([[-1.05,0.35,0.35],[-1.15,-1.0,0.5],[-1.2,-2.5,0.7]],0.29,S['vena-cava-inferior'].color,low)]);
  add('arteria-pulmonar', [tube([[-0.5,-0.15,0.5],[-0.45,0.8,0.65],[-0.35,1.5,0.6],[-1.2,1.95,0.45],[-2.3,1.95,0.3]],0.3,S['arteria-pulmonar'].color,low), tube([[-0.35,1.5,0.6],[0.5,1.95,0.35],[1.6,2.15,0.2]],0.26,S['arteria-pulmonar'].color,low)]);
  add('aorta', [tube([[0.35,0.2,-0.1],[0.2,1.3,-0.2],[0.0,2.6,-0.35],[-0.7,3.05,-0.6],[-1.35,2.4,-0.9],[-1.35,0.5,-1.0],[-1.25,-2.5,-1.0]],0.33,S.aorta.color,low), tube([[-0.35,2.95,-0.45],[-0.3,3.7,-0.5]],0.12,S.aorta.color,low), tube([[0.0,2.7,-0.35],[0.15,3.6,-0.4]],0.12,S.aorta.color,low)]);
  const pv = S['venas-pulmonares'].color;
  add('venas-pulmonares', [tube([[0.9,1.1,-0.3],[1.6,1.35,-0.6],[2.4,1.5,-0.7]],0.15,pv,low), tube([[0.9,0.8,-0.3],[1.6,0.8,-0.7],[2.4,0.7,-0.8]],0.15,pv,low), tube([[0.7,1.0,-0.45],[0.0,1.15,-0.9],[-0.9,1.25,-1.35]],0.15,pv,low), tube([[0.7,0.8,-0.45],[0.0,0.7,-0.95],[-0.9,0.6,-1.4]],0.15,pv,low)]);
  const ring = (id, rot) => { const s=S[id]; const m = new THREE.Mesh(new THREE.TorusGeometry(0.4,0.07,10,28), mat(s.color,{roughness:0.35})); m.position.set(...s.pos); m.rotation.set(...rot); add(id,[m]); };
  ring('valvula-tricuspide',[Math.PI/2,0,0]); ring('valvula-mitral',[Math.PI/2,0,0]); ring('valvula-pulmonar',[Math.PI/2+0.3,0,0.1]); ring('valvula-aortica',[Math.PI/2+0.15,0,-0.1]);

  /* Flujo sanguíneo: partículas sobre trayectos */
  const paths = [
    { color:0x3E63B8, pts:[[-1.1,3.3,0.1],[-1.1,1.8,0.15],[-1.05,0.95,0.15],[-0.9,0.12,0.2],[-0.75,-0.7,0.25],[-0.5,-0.15,0.5],[-0.45,0.8,0.65],[-0.35,1.5,0.6],[-1.2,1.95,0.45],[-2.3,1.95,0.3]] },
    { color:0x3E63B8, pts:[[-1.2,-2.5,0.7],[-1.15,-1.0,0.5],[-1.05,0.35,0.35],[-1.05,0.95,0.15],[-0.9,0.12,0.2],[-0.75,-0.7,0.25],[-0.5,-0.15,0.5],[-0.45,0.8,0.65],[-0.35,1.5,0.6],[0.5,1.95,0.35],[1.6,2.15,0.2]] },
    { color:0xD64545, pts:[[2.4,1.5,-0.7],[1.6,1.35,-0.6],[0.85,0.95,-0.15],[0.72,0.05,-0.15],[0.7,-0.9,-0.05],[0.35,0.2,-0.1],[0.2,1.3,-0.2],[0.0,2.6,-0.35],[-0.7,3.05,-0.6],[-1.35,2.4,-0.9],[-1.35,0.5,-1.0],[-1.25,-2.5,-1.0]] },
    { color:0xD64545, pts:[[-0.9,1.25,-1.35],[0.0,1.15,-0.9],[0.85,0.95,-0.15],[0.72,0.05,-0.15],[0.7,-0.9,-0.05],[0.35,0.2,-0.1],[0.2,1.3,-0.2],[0.0,2.6,-0.35],[-0.7,3.05,-0.6],[-1.35,2.4,-0.9],[-1.35,0.5,-1.0],[-1.25,-2.5,-1.0]] }
  ];
  const flow = { on:false, speed:1, meshes:[] };
  const pg = new THREE.SphereGeometry(0.07, 8, 6);
  paths.forEach(p => { const curve = curveOf(p.pts); const n = low ? 9 : 14; const m = new THREE.MeshStandardMaterial({ color:p.color, emissive:p.color, emissiveIntensity:0.5, roughness:0.4 }); for (let i=0;i<n;i++){ const mesh = new THREE.Mesh(pg, m); mesh.userData.t = i/n; mesh.userData.curve = curve; mesh.visible=false; E.scene.add(mesh); flow.meshes.push(mesh); } });
  const model = {
    flow, beat:{ on:false, speed:1, phase:0, label:'' }, opacity:1,
    setFlow(on){ flow.on = on; flow.meshes.forEach(m => m.visible = on); },
    setBeat(on){ this.beat.on = on; if (!on){ ['auricula-derecha','auricula-izquierda','ventriculo-derecho','ventriculo-izquierdo'].forEach(id => E.parts.get(id).meshes.forEach(m=>m.scale.copy(m.userData.baseScale))); this.beat.label=''; } },
    setLayer(capa, on){ BIO.heart.structures.filter(s=>s.capa===capa).forEach(s => E.setVisible(s.id, on)); },
    setOpacity(o){ this.opacity=o; BIO.heart.structures.forEach(s => { if (s.capa==='camaras' && !s.interno) E.setOpacity(s.id, o); }); },
    phaseName(){ const p = this.beat.phase; return p<0.15 ? 'Sístole auricular · las aurículas se contraen' : p<0.45 ? 'Sístole ventricular · los ventrículos expulsan sangre' : 'Diástole · el corazón se relaja y se llena'; },
    phaseText(){ return this.beat.on ? this.phaseName() : ''; },
    setSpeed(k){ this.beat.speed=k; this.flow.speed=k; },
    legend:[{color:'var(--deoxy)',txt:'Sangre pobre en O₂ (lado derecho, arteria pulmonar)'},{color:'var(--oxy)',txt:'Sangre rica en O₂ (lado izquierdo, aorta)'}],
    observa:'el lado derecho y el izquierdo se contraen al mismo tiempo, pero la sangre de cada lado nunca se mezcla. Primero se contraen las aurículas; ~0,1 s después, los ventrículos.'
  };
  model.anims = [
    { id:'latido', label:'Latido (ciclo cardíaco)', get on(){ return model.beat.on; }, set(on){ model.setBeat(on); } },
    { id:'flujo', label:'Flujo sanguíneo', get on(){ return model.flow.on; }, set(on){ model.setFlow(on); }, needsOpacity:0.5 }
  ];
  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (flow.on) flow.meshes.forEach(m => { m.userData.t = (m.userData.t + dt*0.06*flow.speed) % 1; m.position.copy(m.userData.curve.getPointAt(m.userData.t)); });
    if (model.beat.on){ model.beat.phase = (model.beat.phase + dt*0.9*model.beat.speed) % 1; const p = model.beat.phase; const atr = p<0.15 ? 1-0.09*Math.sin(p/0.15*Math.PI) : 1; const ven = (p>=0.15 && p<0.45) ? 1-0.1*Math.sin((p-0.15)/0.3*Math.PI) : 1;
      ['auricula-derecha','auricula-izquierda'].forEach(id => E.parts.get(id).meshes.forEach(m => m.scale.copy(m.userData.baseScale).multiplyScalar(atr)));
      ['ventriculo-derecho','ventriculo-izquierdo'].forEach(id => E.parts.get(id).meshes.forEach(m => m.scale.copy(m.userData.baseScale).multiplyScalar(ven))); }
  });
  return model;
}

/* =====================================================================
   MODELO: CÉLULA ANIMAL (procedimental, simplificado)
   ===================================================================== */
function buildCell(E){
  const low = E.low; const S = Object.fromEntries(BIO.cell.structures.map(s=>[s.id,s]));
  const add = (id, meshes, lblPos, extra={}) => { const p = E.addPart(id, meshes, Object.assign({ explodeDir: V3(lblPos).normalize() }, extra)); E.addLabel(id, S[id].nombre, lblPos); return p; };
  // membrana
  const memb = new THREE.Mesh(new THREE.SphereGeometry(3.1, low?32:56, low?24:40), new THREE.MeshPhysicalMaterial({ color:0x5FB8C4, transparent:true, opacity:0.22, roughness:0.2, side:THREE.DoubleSide, depthWrite:false }));
  memb.scale.set(1.15,0.95,1.0);
  add('membrana',[memb],[1.4,2.75,1.0],{ explodeDir:new THREE.Vector3(0,0,0), passThrough:true });
  // citoplasma (invisible pickable no; usa lista) → representado por puntos tenues
  const cytoG = new THREE.BufferGeometry(); const n = low?150:320; const arr = new Float32Array(n*3); for (let i=0;i<n;i++){ const r = 1.2+Math.random()*1.7, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1); arr[i*3]=r*Math.sin(ph)*Math.cos(th)*1.15; arr[i*3+1]=r*Math.sin(ph)*Math.sin(th)*0.95; arr[i*3+2]=r*Math.cos(ph); }
  cytoG.setAttribute('position', new THREE.BufferAttribute(arr,3)); const cyto = new THREE.Points(cytoG, new THREE.PointsMaterial({ color:0x8fc7cf, size:0.05, transparent:true, opacity:0.5 }));
  add('citoplasma',[cyto],[-2.7,-1.1,1.6],{ pickable:false, explodeDir:new THREE.Vector3(0,0,0) });
  // núcleo + nucléolo
  const nuc = new THREE.Mesh(new THREE.SphereGeometry(1.05, low?28:48, low?20:36), mat(0x6A58C7,{ transparent:true, opacity:0.7, roughness:0.45 })); nuc.position.set(0.3,0.2,0);
  add('nucleo',[nuc],[0.3,1.55,0.2]);
  const nucleolo = new THREE.Mesh(new THREE.SphereGeometry(0.34, 20, 16), mat(0x4B3D9C)); nucleolo.position.set(0.45,0.3,0.15);
  add('nucleolo',[nucleolo],[1.3,0.6,0.9],{ interno:true });
  // mitocondrias
  const mitos = []; [[-1.9,0.9,0.6,0.6],[1.9,-0.9,0.4,-0.4],[-0.9,-1.9,-0.5,1.2],[1.4,1.6,-0.9,2.1],[-2.1,-0.6,-1.1,-0.8]].forEach(([x,y,z,rot]) => { const g = new THREE.SphereGeometry(0.42, low?18:28, low?12:20); const m = new THREE.Mesh(g, mat(0xE07A4F,{roughness:0.5})); m.scale.set(1.6,0.62,0.62); m.position.set(x,y,z); m.rotation.set(0.3,rot,0.2); mitos.push(m); });
  add('mitocondria',mitos,[-2.6,1.4,0.9]);
  // RER: anillos alrededor del núcleo con puntos (ribosomas)
  const rer = []; for (let i=0;i<3;i++){ const m = new THREE.Mesh(new THREE.TorusGeometry(1.45+i*0.22, 0.07, 8, 48, Math.PI*1.1), mat(0x7FA7C9)); m.position.set(0.3,0.2,0); m.rotation.set(0.4+i*0.15, 0.3, 1.6+i*0.1); rer.push(m); }
  add('rer',rer,[0.5,-1.6,1.4]);
  // REL: túbulos
  const rel = []; [[[1.6,0.9,0.9],[2.1,0.4,1.2],[2.4,-0.3,0.8]],[[1.5,1.1,1.0],[2.2,1.2,0.4],[2.6,0.6,-0.1]]].forEach(pts => rel.push(tube(pts,0.06,0x9CC1DD,low)));
  add('rel',rel,[2.7,1.1,0.9]);
  // Golgi: discos apilados
  const golgi = []; for (let i=0;i<5;i++){ const w = 0.34 + i*0.05; const m = new THREE.Mesh(new THREE.CylinderGeometry(w, w, 0.05, 28), mat(0xD9A441)); m.position.set(-1.0, -0.5 + i*0.13, 1.5); m.rotation.set(0.5, 0.2, 0.15); m.scale.set(1.35,1,1); golgi.push(m); }
  add('golgi',golgi,[-1.0,-1.4,2.3]);
  // lisosomas
  const lis = []; [[1.2,-1.9,1.1],[-2.0,1.9,-0.4],[2.3,0.4,-1.0],[-0.4,2.2,-1.1]].forEach(p => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.2,16,12), mat(0xC25B8A)); m.position.set(...p); lis.push(m); });
  add('lisosomas',lis,[1.9,-2.5,1.5]);
  // ribosomas libres
  const rg = new THREE.BufferGeometry(); const rn = low?70:140; const ra = new Float32Array(rn*3); for (let i=0;i<rn;i++){ const r = 1.4+Math.random()*1.5, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1); ra[i*3]=r*Math.sin(ph)*Math.cos(th)*1.1; ra[i*3+1]=r*Math.sin(ph)*Math.sin(th)*0.9; ra[i*3+2]=r*Math.cos(ph); }
  rg.setAttribute('position', new THREE.BufferAttribute(ra,3)); const ribo = new THREE.Points(rg, new THREE.PointsMaterial({ color:0x3A3A4A, size:0.09 }));
  add('ribosomas',[ribo],[2.4,-1.9,-0.9],{ pickable:false, explodeDir:new THREE.Vector3(0,0,0) });
  // centríolos
  const c1 = new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,0.42,12), mat(0x5B7C99)); c1.position.set(-0.3,1.25,0.8);
  const c2 = c1.clone(); c2.rotation.z = Math.PI/2; c2.position.set(-0.05,1.05,0.8);
  add('centriolos',[c1,c2],[-0.6,2.0,1.5]);

  /* "Ver en acción": partículas que viajan entre organelos */
  const anim = { active:null, parts:[], t:0 };
  const pgeo = new THREE.SphereGeometry(0.06,8,6);
  const routes = {
    mitocondria:{ from:[-1.9,0.9,0.6], to:[[-0.5,2.5,0.4],[-2.6,-0.5,1.6],[-1.0,0.3,2.4]], color:0xF2A93B, txt:'ATP saliendo de la mitocondria hacia el citoplasma' },
    nucleo:{ from:[0.3,0.2,0], to:[[2.4,-1.9,-0.9],[1.9,-1.4,1.6],[-2.0,-1.2,1.0]], color:0x9B8BE8, txt:'ARN mensajero saliendo por los poros nucleares hacia los ribosomas' },
    nucleolo:{ from:[0.45,0.3,0.15], to:[[2.4,-1.9,-0.9],[-2.2,-1.5,0.8]], color:0x4B3D9C, txt:'Subunidades ribosómicas saliendo del núcleo' },
    rer:{ from:[0.5,-1.3,1.2], to:[[-0.9,-0.3,1.5]], color:0x7FA7C9, txt:'Vesículas con proteínas viajando del retículo al Golgi' },
    rel:{ from:[2.1,0.4,1.2], to:[[0,3.0,0.9],[2.9,-1.4,1.2]], color:0x9CC1DD, txt:'Lípidos nuevos incorporándose a las membranas' },
    golgi:{ from:[-0.9,0.2,1.5], to:[[-1.6,-1.2,2.6],[0.2,-2.4,2.0]], color:0xD9A441, txt:'Vesículas de secreción viajando hacia la membrana (exocitosis)' },
    lisosomas:{ from:[1.2,-1.9,1.1], to:[[1.6,-2.6,1.7]], color:0xC25B8A, txt:'Lisosoma fusionándose con una vesícula para digerir su contenido' },
    ribosomas:{ from:[2.4,-1.9,-0.9], to:[[2.6,-1.2,-1.6],[1.6,-2.4,-1.2]], color:0x3A3A4A, txt:'Proteínas recién sintetizadas liberadas al citosol' },
    membrana:{ from:[0,3.4,0.9], to:[[0.2,2.0,0.6]], color:0x5FB8C4, txt:'Moléculas cruzando la membrana por difusión' },
    citoplasma:{ from:[-2.2,-2.2,1.0], to:[[-1.9,0.9,0.6]], color:0xA9D6DC, txt:'Piruvato (de la glucólisis) entrando a la mitocondria' },
    centriolos:{ from:[-0.2,1.15,0.8], to:[[-2.8,1.15,0.8],[2.4,1.15,0.8]], color:0x5B7C99, txt:'Microtúbulos del huso mitótico extendiéndose hacia los polos' }
  };
  const model = {
    action(id){ this.stop(); const r = routes[id]; if (!r) return null; anim.active = r; const m = new THREE.MeshStandardMaterial({ color:r.color, emissive:r.color, emissiveIntensity:0.6 }); r.to.forEach(to => { for (let i=0;i<6;i++){ const p = new THREE.Mesh(pgeo, m); p.userData = { from:V3(r.from), to:V3(to), off:i/6 }; E.scene.add(p); anim.parts.push(p); } }); return r.txt; },
    stop(){ anim.parts.forEach(p=>E.scene.remove(p)); anim.parts=[]; anim.active=null; }
  };
  E.onFrame((t,dt) => { if (!anim.active || !motionOK()) return; anim.t += dt*0.35; anim.parts.forEach(p => { const k = (anim.t + p.userData.off) % 1; p.position.lerpVectors(p.userData.from, p.userData.to, k); p.scale.setScalar(0.6+0.8*Math.sin(k*Math.PI)); }); });
  return model;
}

/* =====================================================================
   FALLBACK 2D (sin WebGL): esquema SVG con las mismas regiones seleccionables
   ===================================================================== */
function heart2D(onSelect){
  const S = Object.fromEntries(BIO.heart.structures.map(s=>[s.id,s]));
  const svg = `<svg viewBox="0 0 400 420" role="img" aria-label="Esquema 2D del corazón">
    <rect data-id="vena-cava-superior" x="88" y="20" width="34" height="90" rx="17" fill="${S['vena-cava-superior'].color}"/>
    <rect data-id="vena-cava-inferior" x="88" y="300" width="34" height="100" rx="17" fill="${S['vena-cava-inferior'].color}"/>
    <path data-id="aorta" d="M205 60 C205 20 260 20 270 60 L270 110 L250 110 L250 65 C245 45 225 45 225 70 L225 115 L205 115 Z" fill="${S.aorta.color}"/>
    <rect data-id="arteria-pulmonar" x="150" y="60" width="40" height="70" rx="20" fill="${S['arteria-pulmonar'].color}"/>
    <rect data-id="venas-pulmonares" x="300" y="120" width="80" height="22" rx="11" fill="${S['venas-pulmonares'].color}"/>
    <ellipse data-id="auricula-derecha" cx="120" cy="160" rx="62" ry="52" fill="${S['auricula-derecha'].color}"/>
    <ellipse data-id="auricula-izquierda" cx="275" cy="160" rx="58" ry="48" fill="${S['auricula-izquierda'].color}"/>
    <ellipse data-id="ventriculo-derecho" cx="135" cy="275" rx="70" ry="80" fill="${S['ventriculo-derecho'].color}"/>
    <ellipse data-id="ventriculo-izquierdo" cx="270" cy="285" rx="78" ry="92" fill="${S['ventriculo-izquierdo'].color}"/>
    <rect data-id="tabique" x="196" y="215" width="14" height="150" rx="6" fill="${S.tabique.color}"/>
    <ellipse data-id="valvula-tricuspide" cx="128" cy="210" rx="26" ry="8" fill="${S['valvula-tricuspide'].color}" stroke="#7a5a4a"/>
    <ellipse data-id="valvula-mitral" cx="272" cy="208" rx="24" ry="8" fill="${S['valvula-mitral'].color}" stroke="#7a5a4a"/>
    <ellipse data-id="valvula-pulmonar" cx="170" cy="132" rx="18" ry="7" fill="${S['valvula-pulmonar'].color}" stroke="#7a5a4a"/>
    <ellipse data-id="valvula-aortica" cx="215" cy="118" rx="16" ry="7" fill="${S['valvula-aortica'].color}" stroke="#7a5a4a"/>
  </svg>`;
  const wrap = h('div',{class:'fallback2d',html:svg});
  wrap.addEventListener('click', e => { const t = e.target.closest('[data-id]'); if (t) onSelect(t.dataset.id,'esquema'); });
  return wrap;
}
</script>
