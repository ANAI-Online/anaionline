<script>
/* =====================================================================
   MOTOR 3D — Three.js. Controles orbitales propios, picking, etiquetas,
   capas, transparencia, separación, animaciones. Reutilizable por modelo.
   ===================================================================== */
/* Mapeo tonal "PBR Neutral" (Khronos): conserva el color base de los materiales
   (ACES los desatura y los aclara: por eso todo se veía lavado). Se registra como
   CustomToneMapping para que r128 lo compile en todos los materiales. */
(function(){ if (!window.THREE || !THREE.ShaderChunk) return; const k = 'tonemapping_pars_fragment'; const src = THREE.ShaderChunk[k]; const stub = 'vec3 CustomToneMapping( vec3 color ) { return color; }'; if (!src || src.indexOf(stub) < 0) return;
  THREE.ShaderChunk[k] = src.replace(stub, `vec3 CustomToneMapping( vec3 color ) {
    color *= toneMappingExposure;
    const float SC = 0.76; const float DS = 0.15;
    float x = min( color.r, min( color.g, color.b ) );
    float off = x < 0.08 ? x - 6.25 * x * x : 0.04;
    color -= off;
    float peak = max( color.r, max( color.g, color.b ) );
    if ( peak < SC ) return color;
    float d = 1. - SC; float np = 1. - d * d / ( peak + d - SC );
    color *= np / peak;
    float g = 1. - 1. / ( DS * ( peak - np ) + 1. );
    return mix( color, vec3( np ), g );
  }`); THREE._neutralTM = true; })();
class Engine3D {
  constructor(container, opts={}){
    this.opts = Object.assign({ interactive:true, autoRotate:false, radius:8, labels:true, minR:3, maxR:16, phi:1.25, theta:0.35 }, opts);
    this.container = container; this.parts = new Map(); this.labels = new Map(); this.frameCbs = []; this.selected = null; this.hovered = null; this.active = true; this.low = lowEnd();
    const r = this.renderer = new THREE.WebGLRenderer({ antialias: !this.low, alpha:true, powerPreference:'high-performance' });
    r.setPixelRatio(Math.min(window.devicePixelRatio||1, this.low ? 1.25 : 2)); r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = (THREE._neutralTM && this.opts.tone !== 'aces') ? THREE.CustomToneMapping : THREE.ACESFilmicToneMapping; r.toneMappingExposure = this.opts.exposure ?? 1.0; r.localClippingEnabled = true;
    const c = this.canvas = r.domElement; c.setAttribute('tabindex','0'); c.setAttribute('role','img'); c.setAttribute('aria-label', opts.aria || 'Modelo 3D interactivo. Arrastra para rotar, rueda para acercar. Usa la lista de estructuras para seleccionar con teclado.');
    container.append(c);
    this.labelsEl = h('div',{class:'labels','aria-hidden':'true'}); container.append(this.labelsEl);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.home = new THREE.Vector3(...(this.opts.target||[0,0,0])); this.target = this.home.clone(); this.sph = { r:this.opts.radius, phi:this.opts.phi, theta:this.opts.theta }; this.goal = Object.assign({}, this.sph); this.goalTarget = this.target.clone();
    try { this.scene.environment = Kit.studio(r, this.opts.dark); } catch(e){ console.warn('env', e); }
    const hemi = new THREE.HemisphereLight(0xf2f6ff, 0x3a2a2a, 0.35); this.scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff6ee, 1.15); key.position.set(4,7,6); this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xbcd6ff, 0.75); rim.position.set(-6,3,-7); this.scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffe2d6, 0.25); fill.position.set(-4,-3,5); this.scene.add(fill);
    if (this.opts.floor !== undefined && this.opts.floor !== null) this.scene.add(Kit.contactShadow(this.opts.floorSize ?? 9, this.opts.floor, this.opts.dark ? 0.0 : 0.32));
    this.ray = new THREE.Raycaster(); this.mouse = new THREE.Vector2();
    this.ro = new ResizeObserver(()=>this.resize()); this.ro.observe(container); this.resize();
    if (this.opts.interactive) this.bindInput();
    this.clock = new THREE.Clock(); this.loop = this.loop.bind(this); this.raf = requestAnimationFrame(this.loop);
    this.visHandler = () => { if (!document.hidden && this.active) { this.clock.getDelta(); } }; document.addEventListener('visibilitychange', this.visHandler);
  }
  resize(){ const w = this.container.clientWidth||1, hgt = this.container.clientHeight||1; this.renderer.setSize(w,hgt,false); this.camera.aspect = w/hgt; this.camera.updateProjectionMatrix(); }
  bindInput(){
    const c = this.canvas; let down=false, moved=0, lx=0, ly=0, pinch=0;
    c.addEventListener('pointerdown', e => { down=true; moved=0; lx=e.clientX; ly=e.clientY; this.spin=false; c.setPointerCapture(e.pointerId); });
    c.addEventListener('dblclick', e => { const id = this.pick(e); if (id && this.opts.onDetail) this.opts.onDetail(id); });
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
  addPart(id, meshes, info={}){ meshes.forEach(m => { m.userData.id = id; m.userData.base = m.position.clone(); m.userData.baseScale = m.scale.clone(); if (m.material){ m.userData.bo = m.material.opacity; m.userData.bt = m.material.transparent; m.userData.bd = m.material.depthWrite; } this.scene.add(m); }); const p = Object.assign({ id, meshes, visible:true, opacity:1 }, info); this.parts.set(id, p); return p; }
  addLabel(id, text, pos, anchor){ const el = h('button',{class:'lbl',type:'button',onclick:()=>this.opts.onSelect && this.opts.onSelect(id,'etiqueta')}, text);
    el.addEventListener('pointerenter', () => { if (this.hovered === id) return; this.hovered = id; this.refreshEmissive(); });
    el.addEventListener('pointerleave', () => { if (this.hovered !== id) return; this.hovered = null; this.refreshEmissive(); });
    this.labelsEl.append(el); const l = { el, pos: new THREE.Vector3(...pos), oy:0 }; this.labels.set(id, l); if (anchor) this.setAnchor(id, anchor); return l; }
  /* punto de la estructura al que apunta la etiqueta: se dibuja una línea guía (callout) como en un atlas */
  setAnchor(id, a){ const l = this.labels.get(id); if (!l) return; l.anchor = a ? (a.isVector3 ? a.clone() : V3(a)) : null; l.el.classList.toggle('has-lead', !!l.anchor); }
  setLabels(on){ this.labelsEl.style.display = on ? '' : 'none'; this._labelsOn = on; }
  select(id){ this.selected = id; this.refreshEmissive(); this.labels.forEach((l,k)=>l.el.classList.toggle('sel', k===id)); this.spotlight(id); this.outline(id); }
  /* ---- selección notoria: contorno luminoso pulsante + atenuación del resto ---- */
  outline(id, sub){ (this.outlines||[]).forEach(o => this.scene.remove(o.m)); this.outlines = []; if (this._om){ this._om.dispose(); this._om = null; } (this._sided||[]).forEach(mt => { mt.side = THREE.FrontSide; mt.needsUpdate = true; }); this._sided = []; const p = id && this.parts.get(id); if (!p || p.passThrough) return;
    const box = new THREE.Box3(); p.meshes.forEach(m => { if (m.geometry && !m.isInstancedMesh){ if (!m.geometry.boundingBox) m.geometry.computeBoundingBox(); m.updateMatrixWorld(); box.union(m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld)); } });
    const size = box.isEmpty() ? 1 : box.getSize(new THREE.Vector3()).length(); const thick = clamp(size*0.012, 0.012, 0.045);
    const om = this._om = new THREE.MeshBasicMaterial({ color:0x3FE0F0, side:THREE.BackSide, transparent:true, opacity:0.85, depthWrite:false, toneMapped:false });
    om.onBeforeCompile = sh => { sh.uniforms.thick = { value:thick }; sh.vertexShader = 'uniform float thick;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n\ttransformed += normalize(normal) * thick;'); };
    p.meshes.forEach(src => { if (!src.isMesh || src.isInstancedMesh || !src.geometry || !src.geometry.attributes.normal) return; if (sub && src.userData.sub !== sub) return; if (src.material && src.material.opacity < 0.3 && !sub) return; const mt = src.material; if (mt && mt.side === THREE.FrontSide && !src.userData.bt){ mt.side = THREE.DoubleSide; mt.needsUpdate = true; this._sided.push(mt); } /* mallas abiertas (cortes): el interior tapa el contorno */ const m = new THREE.Mesh(src.geometry, om); m.matrixAutoUpdate = false; m.renderOrder = 3; this.scene.add(m); this.outlines.push({ m, src }); }); }
  spotlight(id){ this.parts.forEach(p => p.meshes.forEach(m => { const mat = m.material; if (!mat || !mat.color) return; if (!mat.userData.c0) mat.userData.c0 = mat.color.clone(); mat.color.copy(mat.userData.c0); if (id && p.id !== id && !p.passThrough && !this.detail) mat.color.multiplyScalar(0.55); })); }
  /* ---- vista en detalle: aislar, ampliar, girar, marcadores numerados ---- */
  fitPoints(pts, k=2.4){ const b = new THREE.Box3(); pts.forEach(q => b.expandByPoint(V3(q))); this.goalTarget.copy(b.getCenter(new THREE.Vector3())); this.goal.r = clamp(Math.max(b.getSize(new THREE.Vector3()).length()*k, 2.2), this.opts.minR, this.opts.maxR); }
  partSize(id){ const p = this.parts.get(id); if (!p) return 0; const box = new THREE.Box3(); p.meshes.forEach(m => { if (!m.geometry || m.isPoints) return; if (!m.geometry.boundingBox) m.geometry.computeBoundingBox(); m.updateMatrixWorld(); box.union(m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld)); }); return box.isEmpty() ? 0 : box.getSize(new THREE.Vector3()).length(); }
  fit(id, k=1.5){ const p = this.parts.get(id); if (!p) return; const box = new THREE.Box3(); p.meshes.forEach(m => { if (!m.geometry || m.isInstancedMesh || m.isPoints) return; if (!m.geometry.boundingBox) m.geometry.computeBoundingBox(); m.updateMatrixWorld(); box.union(m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld)); }); if (box.isEmpty()) return; this.goalTarget.copy(box.getCenter(new THREE.Vector3())); this.goal.r = clamp(box.getSize(new THREE.Vector3()).length()*k, this.opts.minR, this.opts.maxR); }
  enterDetail(id, pts){ if (this.detail) this.exitDetail(); this.detail = id; this._sv = { minR:this.opts.minR, labels:this._labelsOn!==false, r:this.goal.r, t:this.goalTarget.clone() }; this.opts.minR = 0.7;
    this.parts.forEach(p => { p._go = p.opacity ?? 1; if (p.id !== id) this.setOpacity(p.id, Math.min(p._go, 0.07)); }); this.spotlight(id); this.setLabels(false); this.fitDetail(id, pts); this.spin = true; }
  /* si la estructura tiene varias copias repartidas (p. ej. mitocondrias), se amplía la zona donde están sus partes numeradas */
  fitDetail(id, pts){ if (pts && pts.length > 1){ const b = new THREE.Box3(); pts.forEach(q => b.expandByPoint(V3(q))); const ps = b.getSize(new THREE.Vector3()).length(); if (ps < 0.45*this.partSize(id)) return this.fitPoints(pts); } this.fit(id); }
  exitDetail(){ if (!this.detail) return; this.parts.forEach(p => { if (p._go !== undefined){ this.setOpacity(p.id, p._go); delete p._go; } }); this.detail = null; this.opts.minR = this._sv.minR; this.setLabels(this._sv.labels); this.goal.r = this._sv.r; this.goalTarget.copy(this._sv.t); this.clearMarkers(); this.spin = false; this.spotlight(this.selected); }
  setMarkers(list, onClick){ this.clearMarkers(); if (!this.markersEl){ this.markersEl = h('div',{class:'markers'}); this.container.append(this.markersEl); } this.markers = list.map((mk,i) => { const el = h('button',{class:'mk',type:'button',title:mk.n,'aria-label':`${i+1}. ${mk.n}`,onclick:()=>onClick && onClick(i)}, String(i+1)); this.markersEl.append(el); return { el, pos:V3(mk.at) }; }); }
  clearMarkers(){ (this.markers||[]).forEach(m => m.el.remove()); this.markers = []; }
  highlightMarker(i){ (this.markers||[]).forEach((m,j) => m.el.classList.toggle('on', i===j)); }
  refreshEmissive(){ this.parts.forEach(p => p.meshes.forEach(m => { if (!m.material || !m.material.emissive) return; const sel = p.id===this.selected, hov = p.id===this.hovered; m.material.emissive.set(sel||hov ? 0xffffff : 0x000000); m.material.emissiveIntensity = sel ? 0.13 : hov ? 0.08 : 0; })); }
  setVisible(id, v){ const p = this.parts.get(id); if (!p) return; p.visible = v; p.meshes.forEach(m => m.visible = v); const l = this.labels.get(id); if (l) l.el.style.display = v ? '' : 'none'; }
  setOpacity(id, o){ const p = this.parts.get(id); if (!p) return; p.opacity = o; p.meshes.forEach(m => { if (!m.material || m.userData.keepOpacity) return; const bo = m.userData.bo ?? 1; m.material.opacity = bo*o; m.material.transparent = !!m.userData.bt || o<0.99; m.material.depthWrite = o>=0.99 ? (m.userData.bd ?? true) : false; }); }
  setExplode(f){ this.parts.forEach(p => { if (!p.explodeDir) return; p.meshes.forEach(m => { m.position.copy(m.userData.base).addScaledVector(p.explodeDir, f*1.5); }); const l = this.labels.get(p.id); if (l){ l.pos.copy(l.base||(l.base=l.pos.clone())).addScaledVector(p.explodeDir, f*1.5); if (l.anchor) l.anchor.copy(l.abase||(l.abase=l.anchor.clone())).addScaledVector(p.explodeDir, f*1.5); } }); }
  onFrame(fn){ this.frameCbs.push(fn); }
  /* Etiquetas: proyección, anti-solapamiento (relajación vertical suavizada) y líneas guía hacia la estructura */
  updateLabels(){ this.updateMarkers(); const lead = this._lead;
    if (this._labelsOn===false){ if (lead) lead.style.display='none'; return; }
    const W = this.container.clientWidth, H = this.container.clientHeight; const cam = this.camera.position.clone().sub(this.target).normalize(); const v = new THREE.Vector3(); const vis = [];
    const remeasure = ((this._lf = (this._lf||0)+1) % 45) === 1;
    this.labels.forEach((l,id) => { const p = this.parts.get(id); if (p && !p.visible){ l.el.style.display='none'; return; } v.copy(l.pos).project(this.camera); const dir = l.pos.clone().sub(this.target).normalize(); const front = dir.dot(cam) > -0.35; if (v.z>1 || !front){ l.el.style.display='none'; l.shown=false; return; }
      if (!l.shown){ l.el.style.display=''; l.shown=true; l.w = 0; }
      if (!l.w || remeasure){ l.w = l.el.offsetWidth || 60; l.h = l.el.offsetHeight || 18; }
      vis.push({ l, id, x:(v.x+1)/2*W, y:(1-v.y)/2*H }); });
    const declutter = this.opts.declutter !== false && vis.length > 1 && vis.length <= 40;
    if (declutter){ const pad = 3; vis.forEach(o => o.ty = o.y);
      for (let it=0; it<6; it++){ let moved = false;
        for (let i=0;i<vis.length;i++) for (let j=i+1;j<vis.length;j++){ const a = vis[i], b = vis[j];
          if (Math.abs(a.x-b.x) >= (a.l.w+b.l.w)/2 + pad) continue; const need = (a.l.h+b.l.h)/2 + pad, d = b.ty - a.ty; if (Math.abs(d) >= need) continue;
          const push = (need - Math.abs(d))/2 + 0.2, s = d > 0 || (d === 0 && a.y <= b.y) ? 1 : -1; a.ty -= s*push; b.ty += s*push; moved = true; }
        if (!moved) break; }
      vis.forEach(o => { const hh = o.l.h/2 + 2; o.ty = clamp(o.ty, hh, Math.max(hh, H-hh)); const k = this._lblInit ? 0.25 : 1; o.l.oy += ((o.ty - o.y) - o.l.oy)*k; });
      this._lblInit = true; }
    else vis.forEach(o => o.l.oy = 0);
    let paths = ''; const sel = this.selected;
    vis.forEach(o => { const l = o.l, hw = l.w/2 + 2; const x = declutter ? clamp(o.x, hw, Math.max(hw, W-hw)) : o.x, y = o.y + l.oy; l.el.style.left = x+'px'; l.el.style.top = y+'px';
      let ax = null, ay = null; if (l.anchor){ v.copy(l.anchor).project(this.camera); if (v.z <= 1){ ax = (v.x+1)/2*W; ay = (1-v.y)/2*H; } } else if (Math.abs(l.oy) > 7){ ax = o.x; ay = o.y; }
      if (ax === null) return; const dx = ax - x, dy = ay - y; if (Math.hypot(dx,dy) < l.h*0.9) return;
      /* sale del borde de la etiqueta más cercano al punto */ const tx = Math.abs(dx) > 1e-3 ? (l.w/2)/Math.abs(dx) : 1e9, ty = Math.abs(dy) > 1e-3 ? (l.h/2)/Math.abs(dy) : 1e9, t = Math.min(tx, ty, 1); const sx = x + dx*t, sy = y + dy*t;
      paths += `<path class="${id2cls(o.id, sel)}" d="M${sx.toFixed(1)} ${sy.toFixed(1)}L${ax.toFixed(1)} ${ay.toFixed(1)}"/><circle class="${id2cls(o.id, sel)}" cx="${ax.toFixed(1)}" cy="${ay.toFixed(1)}" r="${o.id===sel?3.4:2.4}"/>`; });
    if (paths || lead){ if (!this._lead){ this._lead = document.createElementNS('http://www.w3.org/2000/svg','svg'); this._lead.setAttribute('class','lbl-lead'); this.labelsEl.prepend(this._lead); }
      this._lead.style.display = ''; if (paths !== this._leadPaths){ this._lead.innerHTML = paths; this._leadPaths = paths; } }
    function id2cls(id, s){ return id === s ? 'on' : ''; } }
  updateMarkers(){ if (!this.markers || !this.markers.length) return; const W = this.container.clientWidth, H = this.container.clientHeight, v = new THREE.Vector3(); this.markers.forEach(m => { v.copy(m.pos).project(this.camera); if (v.z>1){ m.el.style.display='none'; return; } m.el.style.display=''; m.el.style.left = ((v.x+1)/2*W)+'px'; m.el.style.top = ((1-v.y)/2*H)+'px'; }); }
  loop(){
    this.raf = requestAnimationFrame(this.loop);
    if (!this.active || document.hidden) return;
    const dt = Math.min(this.clock.getDelta(), 0.05); const t = this.clock.elapsedTime;
    if ((this.opts.autoRotate || this.spin) && motionOK()) this.goal.theta += dt*(this.spin ? 0.16 : 0.25);
    const k = 1 - Math.pow(0.001, dt); this.sph.r += (this.goal.r-this.sph.r)*k; this.sph.phi += (this.goal.phi-this.sph.phi)*k; this.sph.theta += (this.goal.theta-this.sph.theta)*k; this.target.lerp(this.goalTarget, k);
    const {r,phi,theta} = this.sph; this.camera.position.set(this.target.x + r*Math.sin(phi)*Math.sin(theta), this.target.y + r*Math.cos(phi), this.target.z + r*Math.sin(phi)*Math.cos(theta)); this.camera.lookAt(this.target);
    for (const fn of this.frameCbs) fn(t, dt);
    if (this.outlines && this.outlines.length){ if (this._om) this._om.opacity = motionOK() ? 0.5 + 0.4*Math.sin(t*4.2) : 0.8; this.outlines.forEach(o => { o.src.updateMatrixWorld(); o.m.matrix.copy(o.src.matrixWorld); o.m.matrixWorldNeedsUpdate = true; o.m.visible = o.src.visible; }); }
    this.renderer.render(this.scene, this.camera); this.updateLabels();
  }
  capture(){ this.renderer.render(this.scene, this.camera); const src = this.canvas; const out = document.createElement('canvas'); const w = 480, hh = Math.round(480*src.height/src.width); out.width=w; out.height=hh; const ctx = out.getContext('2d'); ctx.fillStyle = cssVar('--bg-2'); ctx.fillRect(0,0,w,hh); ctx.drawImage(src,0,0,w,hh); return out.toDataURL('image/jpeg', 0.72); }
  dispose(){ this.active=false; cancelAnimationFrame(this.raf); this.ro.disconnect(); document.removeEventListener('visibilitychange', this.visHandler); this.scene.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{ ['map','bumpMap','normalMap','roughnessMap','alphaMap'].forEach(k => m[k] && m[k].dispose()); m.dispose(); }); } }); if (this.scene.environment) this.scene.environment.dispose(); this.renderer.dispose(); this.canvas.remove(); this.labelsEl.remove(); }
}

/* ---------- utilidades geométricas ---------- */
const mat = (color, extra={}) => new THREE.MeshPhysicalMaterial(Object.assign({ color, roughness:0.5, metalness:0, clearcoat:0.35, clearcoatRoughness:0.35 }, extra));
const V3 = a => new THREE.Vector3(a[0],a[1],a[2]);
const curveOf = pts => new THREE.CatmullRomCurve3(pts.map(V3), false, 'catmullrom', 0.4);
function tube(pts, radius, color, low){ const c = curveOf(pts); const g = new THREE.TubeGeometry(c, low?32:64, radius, low?8:14, false); const m = new THREE.Mesh(g, mat(color)); m.userData.curve = c; return m; }
function blob(radius, scale, pos, color, low){ const g = new THREE.SphereGeometry(radius, low?28:48, low?20:36); const m = new THREE.Mesh(g, mat(color)); m.scale.set(...scale); m.position.set(...pos); return m; }

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
