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
/* v1.9 · CALIDAD, TIEMPO Y MEDIDA (ver también src/27-calidad.js, que pone la interfaz)
   - Calidad: this.q = Engine3D.perfil() al construir (Automática/Alta/Media/Básica guardada en Store.s.settings.calidad).
     this.low refleja la calidad elegida (Básica → true, Alta → false, Media/Automática → según el equipo) y Kit lo usa
     mediante Engine3D.bajo(). En Automática (y en Básica, entre 1 y 0,75) un regulador mide los cuadros por segundo
     reales y baja o sube la resolución de render sin reconstruir la escena; lo aprendido se recuerda para la siguiente.
   - Render a demanda: si la cámara está quieta, no hay interacción y la escena no cambió (firma barata de
     transformaciones, materiales y etiquetas) no se vuelve a dibujar. Fuera de la vista (IntersectionObserver) no se
     dibuja pero los onFrame siguen corriendo (las simulaciones no se detienen); con la pestaña oculta se detiene todo.
   - Reloj de simulación: onFrame(fn) recibe (tSim, dtSim) escalados por la velocidad (×0,25 … ×2). En pausa tSim no
     avanza y dtSim vale 1e-6 (≈ 0, pero no "falso": así `dt || 0.016` tampoco anima). paso() avanza 1/30 s.
     La escena se considera ANIMADA (y muestra Pausa/Paso/Velocidad) si opts.animada === true, o si sus onFrame
     cambian la escena de forma sostenida (≥ 1,5 s) — se detecta comparando la firma antes y después de los onFrame.
     opts.animada === false la oculta siempre. Con movimiento reducido arranca en pausa (la pausa automática se levanta
     sola cuando el estudiante usa un control de la página, para no bloquear laboratorios cuyo onFrame es la física).
   - Medida: opts.escala = { unidad:'µm'|'mm'|'cm'|'km', porUnidad:n } habilita E.medir(true): dos clics sobre las partes
     (o Intro con el modelo enfocado: mide en el centro de la vista) → línea y distancia real. Esc la quita. */
class Engine3D {
  /* perfil de calidad: lo decide Calidad (27-calidad.js); sin ese módulo se comporta como antes (lowEnd) */
  static perfil(){ try { if (typeof Calidad === 'object' && Calidad && Calidad.perfil) return Calidad.perfil(); } catch(e){ console.warn('calidad', e); }
    const low = lowEnd(), prMax = Math.min(window.devicePixelRatio||1, low ? 1.25 : 2);
    return { pref:'auto', tier: low ? 'media' : 'alta', auto:false, gov:false, prMax, prMin:prMax, pr:prMax, aa:!low, env:'full', low, lblMs:0, pulse:true, sombra:128 }; }
  /* ¿construir con poca geometría? la escena viva más reciente manda; si no hay, el perfil actual */
  static bajo(){ const L = Engine3D.live; let e = null; if (L) L.forEach(x => { if (!x._disposed) e = x; }); if (e) return !!e.low; try { return !!Engine3D.perfil().low; } catch(_){ return lowEnd(); } }
  constructor(container, opts={}){
    this.opts = Object.assign({ interactive:true, autoRotate:false, radius:8, labels:true, minR:3, maxR:16, phi:1.25, theta:0.35 }, opts);
    const q = this.q = Engine3D.perfil();
    this.container = container; this.parts = new Map(); this.labels = new Map(); this.frameCbs = []; this.selected = null; this.hovered = null; this.active = true; this.low = !!q.low;
    this.escala = (opts.escala && opts.escala.porUnidad > 0) ? opts.escala : null;
    const r = this.renderer = new THREE.WebGLRenderer({ antialias: !!q.aa, alpha:true, powerPreference:'high-performance' });
    this.pr = q.pr; r.setPixelRatio(this.pr); r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = (THREE._neutralTM && this.opts.tone !== 'aces') ? THREE.CustomToneMapping : THREE.ACESFilmicToneMapping; r.toneMappingExposure = this.opts.exposure ?? 1.0; r.localClippingEnabled = true;
    const c = this.canvas = r.domElement; c.setAttribute('tabindex','0'); c.setAttribute('role','img'); c.setAttribute('aria-label', opts.aria || 'Modelo 3D interactivo. Arrastra para rotar, rueda para acercar. Usa la lista de estructuras para seleccionar con teclado.');
    container.append(c);
    this.labelsEl = h('div',{class:'labels','aria-hidden':'true'}); container.append(this.labelsEl);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.home = new THREE.Vector3(...(this.opts.target||[0,0,0])); this.target = this.home.clone(); this.sph = { r:this.opts.radius, phi:this.opts.phi, theta:this.opts.theta }; this.goal = Object.assign({}, this.sph); this.goalTarget = this.target.clone();
    try { this.scene.environment = Kit.studio(r, this.opts.dark, q.env === 'simple'); } catch(e){ console.warn('env', e); }
    const hemi = new THREE.HemisphereLight(0xf2f6ff, 0x3a2a2a, 0.35); this.scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff6ee, 1.15); key.position.set(4,7,6); this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xbcd6ff, 0.75); rim.position.set(-6,3,-7); this.scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffe2d6, 0.25); fill.position.set(-4,-3,5); this.scene.add(fill);
    if (this.opts.floor !== undefined && this.opts.floor !== null) this.scene.add(Kit.contactShadow(this.opts.floorSize ?? 9, this.opts.floor, this.opts.dark ? 0.0 : 0.32, q.sombra));
    this.ray = new THREE.Raycaster(); this.mouse = new THREE.Vector2();
    /* reloj de simulación y estado de render */
    this.tSim = 0; this.velocidad = 1; this.animada = this.opts.animada === true; this._oyentes = [];
    this.pausado = false; this._pausaAuto = false;
    try { if (!motionOK() || (Store.s.a11y && Store.s.a11y.motion)){ this.pausado = true; this._pausaAuto = true; } } catch(_){}
    this._t0 = performance.now(); this._wake = 0; this._forzar = true; this._lastSig = null; this._nRender = 0; this._prevRendered = false; this._tPrev = 0; this.fps = 0; this.enVista = true;
    this._det = { tIni:0, n:0, ult:0, f:0, miss:0 }; this._gv = { t0: performance.now() + 1200, n:0, sum:0, bajo:0, alto:0, bloq:0, subio:0, fijo:false };
    this.ro = new ResizeObserver(()=>this.resize()); this.ro.observe(container); this.resize();
    if ('IntersectionObserver' in window){ this.io = new IntersectionObserver(es => { const v = es[es.length-1].isIntersecting; if (v && !this.enVista){ this._forzar = true; } this.enVista = v; }, { rootMargin:'80px' }); this.io.observe(container); }
    if (this.opts.interactive) this.bindInput();
    this.clock = new THREE.Clock(); this.loop = this.loop.bind(this); this.raf = requestAnimationFrame(this.loop);
    this.visHandler = () => { if (!document.hidden && this.active) { this.clock.getDelta(); this._forzar = true; } }; document.addEventListener('visibilitychange', this.visHandler);
    Engine3D._global(); Engine3D.live.add(this);
    try { if (typeof Calidad === 'object' && Calidad && Calidad.montar) Calidad.montar(this); } catch(e){ console.warn('calidad ui', e); }
  }
  /* una sola vez: cualquier interacción en la página despierta el render a demanda (y levanta la pausa automática) */
  static _global(){ if (Engine3D._g) return; Engine3D._g = true; Engine3D.live = Engine3D.live || new Set();
    const wake = (ms) => () => { const t = performance.now() + ms; Engine3D.live.forEach(E => { if (E._wake < t) E._wake = t; }); };
    ['pointerdown','keydown','wheel'].forEach(ev => document.addEventListener(ev, wake(1200), { passive:true, capture:true }));
    const ctl = e => { wake(1500)(); const el = e.target; if (!el || !el.closest) return; if (el.closest('.cal-bar, .cal-menu') || !el.closest('#view')) return;
      if (e.type === 'click' && !el.closest('button, a, input, select, label, [role="button"], [role="tab"], .opt, .chip')) return;
      Engine3D.live.forEach(E => { if (E._pausaAuto && E.pausado && document.contains(E.container)) { E._pausaAuto = false; E.pausar(false); } }); };
    ['click','input','change'].forEach(ev => document.addEventListener(ev, ctl, { passive:true, capture:true }));
  }
  invalidate(ms=0){ this._forzar = true; if (ms){ const t = performance.now() + ms; if (this._wake < t) this._wake = t; } }
  alCambiar(fn){ this._oyentes.push(fn); }
  _emit(){ this._oyentes.forEach(fn => { try { fn(this); } catch(e){ console.warn(e); } }); }
  /* ---- reloj de simulación ---- */
  pausar(on){ on = !!on; if (on === this.pausado) return; this.pausado = on; if (!on){ this._pausaAuto = false; this.clock.getDelta(); } this.invalidate(300); this._emit(); }
  paso(){ if (!this.pausado) this.pausar(true); this._pasoPend = true; this.invalidate(300); }
  setVelocidad(v){ this.velocidad = clamp(+v || 1, 0.05, 8); this._emit(); }
  resize(){ const w = this.container.clientWidth||1, hgt = this.container.clientHeight||1; this.renderer.setSize(w,hgt,false); this.camera.aspect = w/hgt; this.camera.updateProjectionMatrix(); this._forzar = true; if (this._emitResize) this._emitResize(); }
  /* resolución de render dinámica (sin reconstruir) */
  setPixelRatio(pr){ pr = Math.round(clamp(pr, 0.5, 2)*100)/100; if (Math.abs(pr - this.pr) < 0.01) return; this.pr = pr; this.renderer.setPixelRatio(pr); this.resize(); this._gv.t0 = performance.now() + 600; this._gv.n = this._gv.sum = 0; this._emit(); }
  stats(){ const i = this.renderer.info; return { tris:i.render.triangles, calls:i.render.calls, points:i.render.points, lines:i.render.lines, geos:i.memory.geometries, tex:i.memory.textures, progs:(i.programs||[]).length }; }
  bindInput(){
    const c = this.canvas; let down=false, moved=0, lx=0, ly=0, pinch=0;
    c.addEventListener('pointerdown', e => { down=true; moved=0; lx=e.clientX; ly=e.clientY; this.spin=false; c.setPointerCapture(e.pointerId); });
    c.addEventListener('dblclick', e => { if (this._med && this._med.on) return; const id = this.pick(e); if (id && this.opts.onDetail) this.opts.onDetail(id); });
    c.addEventListener('pointermove', e => { const t = performance.now() + 250; if (this._wake < t) this._wake = t;
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
    c.addEventListener('keydown', e => { const k=e.key; const step=0.12; if (k==='ArrowLeft'){this.goal.theta+=step;} else if (k==='ArrowRight'){this.goal.theta-=step;} else if (k==='ArrowUp'){this.goal.phi=clamp(this.goal.phi-step,0.15,Math.PI-0.15);} else if (k==='ArrowDown'){this.goal.phi=clamp(this.goal.phi+step,0.15,Math.PI-0.15);} else if (k==='+'||k==='='){this.goal.r=clamp(this.goal.r*0.85,this.opts.minR,this.opts.maxR);} else if (k==='-'){this.goal.r=clamp(this.goal.r*1.15,this.opts.minR,this.opts.maxR);} else if (k==='0'){this.resetView();}
      else if (k===' ' || k==='Spacebar'){ if (!(this.animada || this.pausado) || e.repeat) return; this.pausar(!this.pausado); }
      else if (k==='Enter' && this._med && this._med.on){ this._medirEn(null); }
      else if (k==='Escape' && this._med && this._med.on){ this.medir(false); }
      else return; e.preventDefault(); });
  }
  pan(dx,dy){ const v = new THREE.Vector3(); const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix,0); const upv = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix,1); const k = this.sph.r*0.0016; v.addScaledVector(right,-dx*k).addScaledVector(upv,dy*k); this.goalTarget.add(v); }
  resetView(){ this.goal = { r:this.opts.radius, phi:this.opts.phi, theta:this.opts.theta }; this.goalTarget.copy(this.home); }
  focus(pos, r){ this.goalTarget.copy(pos); if (r) this.goal.r = r; }
  setPointer(e){ const rect = this.canvas.getBoundingClientRect(); this.mouse.x = ((e.clientX-rect.left)/rect.width)*2-1; this.mouse.y = -((e.clientY-rect.top)/rect.height)*2+1; }
  pick(e){ this.setPointer(e); this.ray.setFromCamera(this.mouse, this.camera); const meshes = []; this.parts.forEach(p => { if (p.visible && p.pickable!==false) meshes.push(...p.meshes); }); const hits = this.ray.intersectObjects(meshes, false); let soft=null; for (const hit of hits){ const id = hit.object.userData.id; const p = this.parts.get(id); if (!p) continue; const translucent = p.passThrough || (p.opacity!==undefined && p.opacity<0.5); if (translucent){ if (!soft) soft=id; continue; } return id; } return soft; }
  hoverAt(e){ const now = performance.now(); if (now - (this._ht||0) < 50) return; this._ht = now; const id = this.pick(e); if (id !== this.hovered){ this.hovered = id; this.canvas.style.cursor = (this._med && this._med.on) ? 'crosshair' : id ? 'pointer' : 'grab'; this.refreshEmissive(); this.opts.onHover && this.opts.onHover(id); } }
  clickAt(e){ if (this._med && this._med.on){ this._medirEn(e); return; } const id = this.pick(e); this.opts.onSelect && this.opts.onSelect(id, 'modelo'); }
  /* ---- regla de medición (solo con opts.escala) ---- */
  medir(on){ if (!this.escala) return; const M = this._med || (this._med = { on:false, pts:[] }); on = !!on; M.pts = []; M.on = on;
    if (!M.el){ M.el = h('div',{class:'cal-med','aria-live':'polite'}); M.svg = document.createElementNS('http://www.w3.org/2000/svg','svg'); M.svg.setAttribute('class','cal-med-svg'); M.svg.setAttribute('aria-hidden','true');
      M.lbl = h('div',{class:'cal-med-val'}); M.hint = h('div',{class:'cal-med-hint'}); M.mira = h('div',{class:'cal-mira','aria-hidden':'true'}); M.el.append(M.svg, M.mira, M.hint, M.lbl); this.container.append(M.el);
      M.esc = e => { if (e.key === 'Escape' && M.on){ this.medir(false); } }; document.addEventListener('keydown', M.esc); }
    M.el.classList.toggle('on', on); this.canvas.style.cursor = on ? 'crosshair' : ''; this._medPintar(); this.invalidate(200); this._emit(); }
  _medirEn(e){ const M = this._med; if (!M || !M.on) return; let hit = null;
    if (e){ this.setPointer(e); } else { this.mouse.set(0, 0); }
    this.ray.setFromCamera(this.mouse, this.camera); const meshes = []; this.parts.forEach(p => { if (p.visible && p.pickable!==false) p.meshes.forEach(m => { if (m.visible !== false) meshes.push(m); }); });
    const hits = this.ray.intersectObjects(meshes, false); let soft = null;
    for (const x of hits){ const p = this.parts.get(x.object.userData.id); if (!p) continue; const tr = p.passThrough || (p.opacity!==undefined && p.opacity<0.5); if (tr){ if (!soft) soft = x; continue; } hit = x; break; }
    hit = hit || soft;
    if (!hit){ M.aviso = performance.now() + 2600; M.hint.textContent = 'Ese punto no está sobre el modelo: toca una estructura.'; M.hint.classList.add('warn'); this.invalidate(2700); return; }
    M.aviso = 0;
    /* una malla reescalada después de registrarla (p. ej. "ampliado ×10") ya no está a escala real */
    const o = hit.object, b = o.userData.baseScale, fuera = !!(b && (Math.abs(o.scale.x/b.x - 1) > 0.03 || Math.abs(o.scale.y/b.y - 1) > 0.03 || Math.abs(o.scale.z/b.z - 1) > 0.03));
    if (M.pts.length >= 2) M.pts = [];
    M.pts.push({ p: hit.point.clone(), fuera });
    if (M.pts.length === 2){ const d = M.pts[0].p.distanceTo(M.pts[1].p) * this.escala.porUnidad; M.d = d;
      try { Store.log('medida_3d', { unidad:this.escala.unidad, valor:+d.toPrecision(3), fueraEscala: M.pts.some(x=>x.fuera) }); } catch(_){} }
    this._medPintar(); this.invalidate(200); this._emit(); }
  _medTexto(){ const M = this._med, u = this.escala.unidad, d = M.d;
    if (M.pts.some(x => x.fuera)) return 'Parte ampliada: fuera de escala, no se puede medir';
    const nf = (v, dec) => v.toLocaleString('es-EC', { minimumFractionDigits:dec, maximumFractionDigits:dec });
    const f = v => v >= 100 ? nf(Math.round(v), 0) : v >= 10 ? nf(v, 1) : v >= 1 ? nf(v, 2) : v.toLocaleString('es-EC', { maximumSignificantDigits:2 });
    let s = '≈ ' + f(d) + ' ' + u; if (u === 'µm' && d < 1) s += ' (' + f(d*1000) + ' nm)'; return s; }
  _medPintar(){ const M = this._med; if (!M || !M.el) return; const W = this.container.clientWidth, H = this.container.clientHeight, v = new THREE.Vector3();
    if (!M.on){ M.svg.innerHTML = ''; M.lbl.style.display = 'none'; M.hint.textContent = ''; return; }
    if (!(M.aviso > performance.now())){ M.hint.classList.remove('warn'); const t = M.pts.length === 0 ? 'Toca el primer punto del modelo' : M.pts.length === 1 ? 'Ahora toca el segundo punto' : 'Toca otro punto para medir de nuevo · Esc para salir'; if (M.hint.textContent !== t) M.hint.textContent = t; }
    const scr = M.pts.map(x => { v.copy(x.p).project(this.camera); return { x:(v.x+1)/2*W, y:(1-v.y)/2*H, ok:v.z<=1 }; });
    let s = ''; if (scr.length === 2 && scr[0].ok && scr[1].ok) s += `<path class="cal-med-l" d="M${scr[0].x.toFixed(1)} ${scr[0].y.toFixed(1)}L${scr[1].x.toFixed(1)} ${scr[1].y.toFixed(1)}"/>`;
    scr.forEach(p => { if (p.ok) s += `<circle class="cal-med-p" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5"/>`; });
    if (s !== M._s){ M.svg.innerHTML = s; M._s = s; }
    if (scr.length === 2 && scr[0].ok && scr[1].ok){ const t = this._medTexto(); if (M.lbl.textContent !== t) M.lbl.textContent = t; M.lbl.classList.toggle('warn', M.pts.some(x=>x.fuera)); M.lbl.style.display = '';
      const mx = (scr[0].x + scr[1].x)/2, my = (scr[0].y + scr[1].y)/2, lw = M.lbl.offsetWidth || 120; M.lbl.style.left = clamp(mx, lw/2 + 6, Math.max(lw/2 + 6, W - lw/2 - 6)) + 'px'; M.lbl.style.top = clamp(my - 22, 16, H - 16) + 'px'; }
    else M.lbl.style.display = 'none'; }
  addPart(id, meshes, info={}){ meshes.forEach(m => { m.userData.id = id; m.userData.base = m.position.clone(); m.userData.baseScale = m.scale.clone(); if (m.material){ m.userData.bo = m.material.opacity; m.userData.bt = m.material.transparent; m.userData.bd = m.material.depthWrite; } this.scene.add(m); }); const p = Object.assign({ id, meshes, visible:true, opacity:1 }, info); this.parts.set(id, p); return p; }
  addLabel(id, text, pos, anchor){ const el = h('button',{class:'lbl',type:'button',onclick:()=>this.opts.onSelect && this.opts.onSelect(id,'etiqueta')}, text);
    el.addEventListener('pointerenter', () => { if (this.hovered === id) return; this.hovered = id; this.refreshEmissive(); });
    el.addEventListener('pointerleave', () => { if (this.hovered !== id) return; this.hovered = null; this.refreshEmissive(); });
    this.labelsEl.append(el); const l = { el, pos: new THREE.Vector3(...pos), oy:0 }; this.labels.set(id, l); this.invalidate(300); if (anchor) this.setAnchor(id, anchor); return l; }
  /* punto de la estructura al que apunta la etiqueta: se dibuja una línea guía (callout) como en un atlas */
  setAnchor(id, a){ const l = this.labels.get(id); if (!l) return; l.anchor = a ? (a.isVector3 ? a.clone() : V3(a)) : null; l.el.classList.toggle('has-lead', !!l.anchor); this.invalidate(300); }
  setLabels(on){ this.labelsEl.style.display = on ? '' : 'none'; this._labelsOn = on; this.invalidate(300); }
  select(id){ this.selected = id; this.invalidate(400); this.refreshEmissive(); this.labels.forEach((l,k)=>l.el.classList.toggle('sel', k===id)); this.spotlight(id); this.outline(id); }
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
  setMarkers(list, onClick){ this.clearMarkers(); if (!this.markersEl){ this.markersEl = h('div',{class:'markers'}); this.container.append(this.markersEl); } this.markers = list.map((mk,i) => { const el = h('button',{class:'mk',type:'button',title:mk.n,'aria-label':`${i+1}. ${mk.n}`,onclick:()=>onClick && onClick(i)}, String(i+1)); this.markersEl.append(el); return { el, pos:V3(mk.at) }; }); this.invalidate(300); }
  clearMarkers(){ (this.markers||[]).forEach(m => m.el.remove()); this.markers = []; }
  highlightMarker(i){ (this.markers||[]).forEach((m,j) => m.el.classList.toggle('on', i===j)); this.invalidate(300); }
  refreshEmissive(){ this.parts.forEach(p => p.meshes.forEach(m => { if (!m.material || !m.material.emissive) return; const sel = p.id===this.selected, hov = p.id===this.hovered; m.material.emissive.set(sel||hov ? 0xffffff : 0x000000); m.material.emissiveIntensity = sel ? 0.13 : hov ? 0.08 : 0; })); }
  setVisible(id, v){ const p = this.parts.get(id); if (!p) return; p.visible = v; p.meshes.forEach(m => m.visible = v); const l = this.labels.get(id); if (l) l.el.style.display = v ? '' : 'none'; }
  setOpacity(id, o){ const p = this.parts.get(id); if (!p) return; p.opacity = o; p.meshes.forEach(m => { if (!m.material || m.userData.keepOpacity) return; const bo = m.userData.bo ?? 1; m.material.opacity = bo*o; m.material.transparent = !!m.userData.bt || o<0.99; m.material.depthWrite = o>=0.99 ? (m.userData.bd ?? true) : false; }); }
  setExplode(f){ this.parts.forEach(p => { if (!p.explodeDir) return; p.meshes.forEach(m => { m.position.copy(m.userData.base).addScaledVector(p.explodeDir, f*1.5); }); const l = this.labels.get(p.id); if (l){ l.pos.copy(l.base||(l.base=l.pos.clone())).addScaledVector(p.explodeDir, f*1.5); if (l.anchor) l.anchor.copy(l.abase||(l.abase=l.anchor.clone())).addScaledVector(p.explodeDir, f*1.5); } }); }
  onFrame(fn){ this.frameCbs.push(fn); if (!this._emitP){ this._emitP = true; Promise.resolve().then(() => { this._emitP = false; this._emit(); }); } }
  /* ¿mostrar Pausa/Paso/Velocidad? animada detectada o declarada; con la pausa automática (menos movimiento) basta con que algún onFrame reciba el tiempo */
  get conTiempo(){ if (this.opts.animada === false) return false; return !!(this.animada || (this._pausaAuto && this.frameCbs.some(f => f.length >= 1))); }
  /* Etiquetas: proyección, anti-solapamiento (relajación vertical suavizada) y líneas guía hacia la estructura */
  updateLabels(){ this.updateMarkers(); if (this._med && this._med.on) this._medPintar(); const lead = this._lead;
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
      /* zonas ocupadas por controles del escenario (barra de calidad/tiempo): la etiqueta se corre arriba o abajo */
      const obs = this.obstaculos; if (obs && obs.length) vis.forEach(o => { const hw = o.l.w/2 + 3, hh = o.l.h/2 + 3; const x = clamp(o.x, hw, Math.max(hw, W-hw));
        for (const b of obs){ if (x + hw < b.l || x - hw > b.r || o.ty + hh < b.t || o.ty - hh > b.b) continue; const up = b.t - hh, dn = b.b + hh; o.ty = (up >= hh && (Math.abs(o.ty - up) <= Math.abs(o.ty - dn) || dn > H - hh)) ? up : dn; } });
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
  /* Firma barata del estado visible (transformaciones, geometrías, materiales, luces, cámara, etiquetas): si no cambia
     y la cámara está quieta, el cuadro sería idéntico y no se dibuja (render a demanda). */
  _firma(){ let hh = 0; const q = v => { hh = (Math.imul(hh, 31) + Math.round(v*2048)) | 0; }; const mats = this._fm || (this._fm = new Set()); mats.clear();
    this.scene.traverseVisible(o => { const p = o.position, r = o.quaternion, s = o.scale; q(p.x); q(p.y); q(p.z); q(r.x); q(r.y); q(r.z); q(r.w); q(s.x); q(s.y); q(s.z); q(o.renderOrder);
      if (o.matrixAutoUpdate === false){ const e = o.matrix.elements; q(e[0]); q(e[5]); q(e[10]); q(e[12]); q(e[13]); q(e[14]); }
      const g = o.geometry; if (g){ q(g.id); const a = g.attributes; if (a.position) q(a.position.version); if (a.color) q(a.color.version); if (a.normal) q(a.normal.version); if (g.index) q(g.index.version); const dr = g.drawRange; q(dr.start); q(dr.count === Infinity ? -1 : dr.count); }
      if (o.isInstancedMesh){ q(o.count); q(o.instanceMatrix.version); if (o.instanceColor) q(o.instanceColor.version); }
      if (o.morphTargetInfluences) for (let i=0;i<o.morphTargetInfluences.length;i++) q(o.morphTargetInfluences[i]);
      if (o.isLight){ q(o.intensity); q(o.color.r); q(o.color.g); q(o.color.b); }
      const m = o.material; if (m){ if (Array.isArray(m)) m.forEach(x => { q(x.id); mats.add(x); }); else { q(m.id); mats.add(m); } } });
    const col = c => { if (c){ q(c.r); q(c.g); q(c.b); } }, tex = t => { if (t){ q(t.id); q(t.version); q(t.offset.x); q(t.offset.y); q(t.repeat.x); q(t.repeat.y); q(t.rotation); } };
    mats.forEach(m => { q(m.version); q(m.opacity); q(m.visible ? 1 : 0); q(m.side); q(m.transparent ? 1 : 0); col(m.color); col(m.emissive); if (m.emissiveIntensity !== undefined) q(m.emissiveIntensity); if (m.size !== undefined) q(m.size); if (typeof m.rotation === 'number') q(m.rotation);
      tex(m.map); tex(m.alphaMap); tex(m.emissiveMap); if (m.clippingPlanes) m.clippingPlanes.forEach(pl => { q(pl.constant); q(pl.normal.x); q(pl.normal.y); q(pl.normal.z); });
      if (m.uniforms) for (const k in m.uniforms){ const v = m.uniforms[k] && m.uniforms[k].value; if (typeof v === 'number') q(v); else if (v && (v.isVector2 || v.isVector3 || v.isVector4)){ q(v.x); q(v.y); q(v.z||0); } else if (v && v.isColor) col(v); } });
    const cam = this.camera, cp = cam.position; q(cp.x); q(cp.y); q(cp.z); q(this.target.x); q(this.target.y); q(this.target.z); q(cam.fov); q(cam.zoom); q(cam.near); q(cam.far); q(cam.aspect); q(this.renderer.toneMappingExposure);
    const bg = this.scene.background; if (bg && bg.isColor) col(bg); else if (bg) q(bg.id); const f = this.scene.fog; if (f){ col(f.color); q(f.near||0); q(f.far||0); q(f.density||0); }
    (this.renderer.clippingPlanes||[]).forEach(pl => q(pl.constant));
    this.labels.forEach(l => { q(l.pos.x); q(l.pos.y); q(l.pos.z); if (l.anchor){ q(l.anchor.x); q(l.anchor.y); q(l.anchor.z); } });
    (this.markers||[]).forEach(m => { q(m.pos.x); q(m.pos.y); q(m.pos.z); });
    return hh; }
  /* ¿los onFrame animan la escena por sí solos? (cambios sostenidos ≥ 1,5 s) → mostrar los controles de tiempo */
  _detectar(cambio, now){ const d = this._det; if (!cambio){ if (++d.miss >= 2 && now - d.ult > 450) d.n = 0; return; }
    d.miss = 0; if (!d.n){ d.tIni = now; } d.n++; d.ult = now; if (d.n >= 3 && now - d.tIni >= 1400){ this.animada = true; this._emit(); } }
  /* regulador de resolución: < 24 cps sostenidos → baja; ≥ 55 cps con margen → sube hasta el tope del nivel */
  _regular(now){ const g = this._gv, prev = this._prevRendered, tp = this._tPrev; this._tPrev = now; if (!prev || now < g.t0) return;
    const iv = now - tp; if (iv <= 0 || iv > 6000) return; const inst = 1000/iv; this.fps = this.fps ? this.fps*0.85 + inst*0.15 : inst;
    if (!this.q.gov || g.fijo) return; g.n++; g.sum += iv; if (g.sum < 1500 || g.n < 2) return;
    const fps = 1000*g.n/g.sum; g.n = g.sum = 0; this.fpsVentana = fps;
    if (fps < 24){ g.alto = 0; if (++g.bajo >= 2 || fps < 12){ g.bajo = 0; this._bajar(now); } }
    else if (fps >= 55){ g.bajo = 0; if (++g.alto >= 2 && now > g.bloq){ g.alto = 0; this._subir(now); } }
    else g.bajo = g.alto = 0; }
  _bajar(now){ const q = this.q, g = this._gv; let ev = 'bajo';
    if (this.pr > q.prMin + 0.01){ if (g.subio && now - g.subio < 12000) g.techo = true; this.setPixelRatio(Math.max(q.prMin, this.pr*0.8)); g.bloq = now + 10000; }
    else { ev = 'lento'; if (!this._lento){ this._lento = true; this.q = Object.assign({}, q, { lblMs:Math.max(q.lblMs||0, 70), pulse:false }); } g.fijo = true; }
    try { if (typeof Calidad === 'object' && Calidad.recordar) Calidad.recordar(this, ev); } catch(_){} }
  _subir(now){ const q = this.q, g = this._gv; if (g.techo) return;
    if (this.pr < q.prMax - 0.01){ this.setPixelRatio(Math.min(q.prMax, this.pr*1.2)); g.subio = now; g.bloq = now + 4000; try { Calidad.recordar(this, 'sube'); } catch(_){} }
    else if (!g.holgura){ g.holgura = true; try { if (typeof Calidad === 'object' && Calidad.recordar) Calidad.recordar(this, 'holgura'); } catch(_){} } }
  loop(){
    this.raf = requestAnimationFrame(this.loop);
    if (!this.active || document.hidden){ this._prevRendered = false; return; }
    const now = performance.now(), dt = Math.min(this.clock.getDelta(), 0.05), t = this.clock.elapsedTime;
    const rot = (this.opts.autoRotate || this.spin) && motionOK(); if (rot) this.goal.theta += dt*(this.spin ? 0.16 : 0.25);
    const S = this.sph, G = this.goal, mov = rot || Math.abs(G.r-S.r) > 1e-4*S.r || Math.abs(G.phi-S.phi) > 2e-5 || Math.abs(G.theta-S.theta) > 2e-5 || this.target.distanceToSquared(this.goalTarget) > 1e-9*S.r*S.r;
    if (mov){ const k = 1 - Math.pow(0.001, dt); S.r += (G.r-S.r)*k; S.phi += (G.phi-S.phi)*k; S.theta += (G.theta-S.theta)*k; this.target.lerp(this.goalTarget, k); const w = now + 350; if (this._wake < w) this._wake = w; }
    const {r,phi,theta} = S; this.camera.position.set(this.target.x + r*Math.sin(phi)*Math.sin(theta), this.target.y + r*Math.cos(phi), this.target.z + r*Math.sin(phi)*Math.cos(theta)); this.camera.lookAt(this.target);
    /* reloj de simulación */
    let dts; if (this._pasoPend){ this._pasoPend = false; dts = 1/30; this.tSim += dts; } else if (this.pausado) dts = 1e-6; else { dts = dt*this.velocidad; this.tSim += dts; }
    const vis = this.enVista || this._nRender === 0, cbs = this.frameCbs.length;
    const detect = vis && cbs > 0 && !this.animada && !this.pausado && this.opts.animada !== false && (this._det.f++ % (now - this._t0 > 10000 ? 6 : 2)) === 0;
    const pre = detect ? this._firma() : 0;
    for (const fn of this.frameCbs) fn(this.tSim, dts);
    if (!vis){ this._prevRendered = false; return; }   /* fuera de la vista: la simulación sigue, el dibujo no */
    if (this.outlines && this.outlines.length){ if (this._om) this._om.opacity = (this.q.pulse && motionOK()) ? 0.5 + 0.4*Math.sin(t*4.2) : 0.8; this.outlines.forEach(o => { o.src.updateMatrixWorld(); o.m.matrix.copy(o.src.matrixWorld); o.m.matrixWorldNeedsUpdate = true; o.m.visible = o.src.visible; }); }
    const must = mov || this._forzar || now < this._wake || this._nRender === 0;
    let sig = null; if (detect || !must) sig = this._firma();
    if (detect) this._detectar(pre !== sig, now);
    if (!must && sig === this._lastSig){ if (this._lblStale){ this._lblStale = false; this.updateLabels(); } this._prevRendered = false; return; }
    if (!must){ const w = now + 350; if (this._wake < w) this._wake = w; }   /* cola corta: las etiquetas terminan de acomodarse */
    this._lastSig = sig; this._forzar = false;
    this.renderer.render(this.scene, this.camera); this._nRender++;
    if (!this.q.lblMs || now - (this._lblT||0) >= this.q.lblMs){ this._lblT = now; this._lblStale = false; this.updateLabels(); } else this._lblStale = true;
    this._regular(now); this._prevRendered = true;
  }
  capture(){ this.renderer.render(this.scene, this.camera); const src = this.canvas; const out = document.createElement('canvas'); const w = 480, hh = Math.round(480*src.height/src.width); out.width=w; out.height=hh; const ctx = out.getContext('2d'); ctx.fillStyle = cssVar('--bg-2'); ctx.fillRect(0,0,w,hh); ctx.drawImage(src,0,0,w,hh); return out.toDataURL('image/jpeg', 0.72); }
  dispose(){ if (this._disposed) return; this._disposed = true; this.active=false; cancelAnimationFrame(this.raf); this.ro.disconnect(); if (this.io) this.io.disconnect(); document.removeEventListener('visibilitychange', this.visHandler);
    if (Engine3D.live) Engine3D.live.delete(this); if (this._med && this._med.esc) document.removeEventListener('keydown', this._med.esc); if (this._med && this._med.el) this._med.el.remove();
    try { if (typeof Calidad === 'object' && Calidad.recordar) Calidad.recordar(this, 'fin'); } catch(_){} (this._alDisponer||[]).forEach(fn => { try { fn(); } catch(_){} }); this.scene.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{ ['map','bumpMap','normalMap','roughnessMap','alphaMap'].forEach(k => m[k] && m[k].dispose()); m.dispose(); }); } }); if (this.scene.environment) this.scene.environment.dispose(); this.renderer.dispose(); this.canvas.remove(); this.labelsEl.remove(); }
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
