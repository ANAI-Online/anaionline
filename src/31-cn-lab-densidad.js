<style>
/* Laboratorio de densidad y flotación (Ciencias Naturales · 8.º EGB) */
.dl-objs{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.dl-obj{display:flex;gap:9px;align-items:center;padding:8px 10px;border:1px solid var(--line-2);border-radius:10px;background:var(--bg-2);text-align:left;width:100%;font-size:.84rem;font-weight:600}
.dl-obj:hover{background:var(--bg-3)}
.dl-obj.picked{border-color:var(--accent);background:var(--accent-soft)}
.dl-obj .sw{width:16px;height:16px;border-radius:5px;border:1px solid var(--line-2);flex:none}
.dl-obj .st{display:block;font-size:.7rem;font-weight:500;color:var(--ink-3);font-family:var(--font-m)}
.dl-liqs{display:flex;flex-wrap:wrap;gap:6px}
.dl-read{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.dl-read .readout{padding:9px 10px}
.dl-read .readout .v{font-size:1.1rem}
.dl-svg{width:100%;height:auto;display:block;border-radius:12px;background:var(--bg-2)}
.dl-svg [data-id]{cursor:pointer}
.dl-svg [data-id]:hover{opacity:.82}
.dl-hint{font-size:.78rem;color:var(--ink-3);font-family:var(--font-m)}
.dl-pred{display:flex;gap:6px;flex-wrap:wrap}
.dl-viewer .stage{height:600px;min-height:0}
.dl-viewer .panel{align-self:start}
@media (max-width:860px){.dl-viewer .stage{height:420px}}
@media (max-width:900px){.dl-objs{grid-template-columns:1fr}}
</style>
<script>
/* =====================================================================
   cnLabKit · utilidades visuales compartidas por los laboratorios 3D de
   Ciencias Naturales (densidad, circuitos, movimiento, energía).
   Solo aspecto: mesadas, azulejos, vidriería, termómetros, pantallas LCD.
   Todo procedimental (CanvasTexture); respeta lowEnd() con texturas 256.
   ===================================================================== */
const cnLabKit = (() => {
  const low = () => (typeof lowEnd === 'function' && lowEnd());
  const cache = {};
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const rgb = (a, k = 1, al) => `rgba(${Math.round(clamp(a[0] * k, 0, 255))},${Math.round(clamp(a[1] * k, 0, 255))},${Math.round(clamp(a[2] * k, 0, 255))},${al === undefined ? 1 : al})`;
  /* ¿tema oscuro? se lee de la variable --bg de la interfaz */
  function dark(){ const v = (cssVar('--bg') || '#ffffff').replace('#', ''); if (v.length < 6) return false; const n = parseInt(v.slice(0, 6), 16); const l = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; return l < 0.35; }
  function tex(c, o = {}){ const t = new THREE.CanvasTexture(c); if (o.srgb !== false) t.encoding = THREE.sRGBEncoding; t.anisotropy = low() ? 2 : 8; if (o.wrap) t.wrapS = t.wrapT = THREE.RepeatWrapping; if (o.rep) t.repeat.set(o.rep[0], o.rep[1]); return t; }
  const S = n => low() ? n / 2 : n;

  /* ---------- texturas ---------- */
  /* madera en listones (mesada tipo butcher block) */
  function woodC(o = {}){
    const key = 'wood' + JSON.stringify(o) + low(); if (cache[key]) return cache[key];
    const W = S(o.w || 1024), H = S(o.h || 512), c = mk(W, H), x = c.getContext('2d'), R = Kit.rng(o.seed || 11);
    const base = o.base || [196, 150, 98], dk = o.dark || [104, 64, 32], n = o.strips || 7, sh = H / n;
    for (let i = 0; i < n; i++){
      const y0 = i * sh, k = 0.84 + R() * 0.26;
      x.save(); x.beginPath(); x.rect(0, y0, W, sh + 1); x.clip();
      const gr = x.createLinearGradient(0, y0, 0, y0 + sh); gr.addColorStop(0, rgb(base, k * 1.04)); gr.addColorStop(1, rgb(base, k * 0.95));
      x.fillStyle = gr; x.fillRect(0, y0, W, sh + 1);
      const ph = R() * 50, lines = Math.round(sh / (low() ? 2.2 : 2.6));
      for (let j = 0; j < lines; j++){
        const yy0 = y0 + R() * sh, a = 0.035 + R() * 0.13, amp = sh * (0.03 + 0.1 * R()), fq = 0.002 + R() * 0.006;
        x.strokeStyle = rgb(dk, 1, a); x.lineWidth = 0.5 + R() * (low() ? 1.2 : 2.2); x.beginPath();
        for (let px = 0; px <= W; px += 10){ const yy = yy0 + Math.sin(px * fq + ph + j) * amp + Kit.n3(px * 0.003, yy0 * 0.03, ph) * sh * 0.1; if (px) x.lineTo(px, yy); else x.moveTo(px, yy); }
        x.stroke();
      }
      /* uniones de los listones (finger joints) */
      const js = 1 + Math.floor(R() * 2); for (let j = 0; j < js; j++){ const jx = (0.15 + R() * 0.7) * W; x.fillStyle = rgb(dk, 1, 0.32); x.fillRect(jx, y0, 1.2, sh); }
      x.restore();
      x.fillStyle = rgb(dk, 1, 0.38); x.fillRect(0, y0, W, 1.2);
    }
    return (cache[key] = c);
  }
  /* azulejos de pared */
  function tileC(o = {}){
    const key = 'tile' + JSON.stringify(o) + low(); if (cache[key]) return cache[key];
    const N = S(512), c = mk(N, N), x = c.getContext('2d'), R = Kit.rng(o.seed || 5), n = o.n || 4, s = N / n, g = Math.max(2, N / 160);
    const base = o.base || [236, 240, 242], grout = o.grout || [196, 202, 206];
    x.fillStyle = rgb(grout); x.fillRect(0, 0, N, N);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++){
      const k = 0.97 + R() * 0.05, px = i * s + g / 2, py = j * s + g / 2, w = s - g;
      const gr = x.createLinearGradient(px, py, px + w, py + w); gr.addColorStop(0, rgb(base, k * 1.03)); gr.addColorStop(1, rgb(base, k * 0.95));
      x.fillStyle = gr; x.fillRect(px, py, w, w);
      x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(px, py, w, w * 0.05);
    }
    return (cache[key] = c);
  }
  /* superficie fenólica / laminado moteado */
  function speckC(o = {}){
    const key = 'speck' + JSON.stringify(o) + low(); if (cache[key]) return cache[key];
    const N = S(512), c = mk(N, N), x = c.getContext('2d'), R = Kit.rng(o.seed || 3), base = o.base || [60, 66, 72];
    x.fillStyle = rgb(base); x.fillRect(0, 0, N, N);
    const im = x.getImageData(0, 0, N, N), d = im.data;
    for (let i = 0; i < N * N; i++){ const v = (R() - 0.5) * (o.noise || 14) + Kit.n3((i % N) * 0.02, Math.floor(i / N) * 0.02, 1) * (o.cloud || 10); d[i * 4] = clamp(d[i * 4] + v, 0, 255); d[i * 4 + 1] = clamp(d[i * 4 + 1] + v, 0, 255); d[i * 4 + 2] = clamp(d[i * 4 + 2] + v, 0, 255); }
    x.putImageData(im, 0, 0);
    const fl = o.flecks || 0; for (let i = 0; i < fl; i++){ x.fillStyle = rgb(o.fleck || [200, 200, 200], 0.8 + R() * 0.4, 0.5 + R() * 0.5); x.fillRect(R() * N, R() * N, 1 + R() * 1.6, 1 + R() * 1.6); }
    return (cache[key] = c);
  }
  /* metal cepillado (vetas finas en una dirección) */
  function brushedC(){
    const key = 'brushed' + low(); if (cache[key]) return cache[key];
    const N = S(256), c = mk(N, N), x = c.getContext('2d'), R = Kit.rng(21);
    x.fillStyle = '#8a8a8a'; x.fillRect(0, 0, N, N);
    for (let i = 0; i < N * 3; i++){ const y = R() * N, v = 110 + R() * 60; x.fillStyle = `rgba(${v},${v},${v},${0.25 + R() * 0.35})`; x.fillRect(0, y, N, 0.6 + R()); }
    return (cache[key] = c);
  }
  /* corcho: gránulos */
  function corkC(){
    const key = 'cork' + low(); if (cache[key]) return cache[key];
    const N = S(256), c = mk(N, N), x = c.getContext('2d'), R = Kit.rng(33);
    x.fillStyle = '#B8834F'; x.fillRect(0, 0, N, N);
    for (let i = 0; i < N * 9; i++){ const r = 0.6 + R() * 2.4, k = R(); x.fillStyle = k < 0.45 ? `rgba(122,76,38,${0.35 + R() * 0.5})` : k < 0.8 ? `rgba(214,168,112,${0.3 + R() * 0.5})` : `rgba(70,40,18,${0.5 + R() * 0.4})`; x.beginPath(); x.arc(R() * N, R() * N, r, 0, Math.PI * 2); x.fill(); }
    return (cache[key] = c);
  }
  /* piedra pómez / concreto: poros */
  function poreC(o = {}){
    const key = 'pore' + JSON.stringify(o) + low(); if (cache[key]) return cache[key];
    const N = S(256), c = mk(N, N), x = c.getContext('2d'), R = Kit.rng(o.seed || 41), base = o.base || [176, 170, 158];
    x.fillStyle = rgb(base); x.fillRect(0, 0, N, N);
    for (let i = 0; i < N * 5; i++){ x.fillStyle = rgb(base, 0.9 + R() * 0.2, 0.5); x.fillRect(R() * N, R() * N, 2 + R() * 3, 2 + R() * 3); }
    for (let i = 0; i < N * (o.pores || 1.4); i++){ const r = 0.6 + Math.pow(R(), 2) * (o.pr || 4); x.fillStyle = rgb(base, 0.45 + R() * 0.15, 0.85); x.beginPath(); x.arc(R() * N, R() * N, r, 0, Math.PI * 2); x.fill(); }
    return (cache[key] = c);
  }
  /* espuma acústica: pirámides sombreadas */
  function foamC(){
    const key = 'foam' + low(); if (cache[key]) return cache[key];
    const N = S(256), c = mk(N, N), x = c.getContext('2d'), n = 4, s = N / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++){ const px = i * s, py = j * s, cx = px + s / 2, cy = py + s / 2;
      [[[px, py], [px + s, py], '#5b6068'], [[px + s, py], [px + s, py + s], '#3d4148'], [[px + s, py + s], [px, py + s], '#2c2f35'], [[px, py + s], [px, py], '#4b5058']].forEach(([a, b, col]) => { x.fillStyle = col; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.lineTo(cx, cy); x.closePath(); x.fill(); }); }
    return (cache[key] = c);
  }
  /* tela con pliegues verticales */
  function clothC(o = {}){
    const key = 'cloth' + JSON.stringify(o) + low(); if (cache[key]) return cache[key];
    const N = S(256), c = mk(N, N), x = c.getContext('2d'), base = o.base || [132, 38, 44];
    for (let px = 0; px < N; px++){ const k = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(px / N * Math.PI * 2 * 6)) + 0.05 * Math.sin(px * 0.9); x.fillStyle = rgb(base, k); x.fillRect(px, 0, 1, N); }
    return (cache[key] = c);
  }
  /* degradado radial para halos (brillo de bombillas y llamas) */
  function haloC(){
    if (cache.halo) return cache.halo; const N = 128, c = mk(N, N), x = c.getContext('2d');
    const g = x.createRadialGradient(N / 2, N / 2, 0, N / 2, N / 2, N / 2); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.18, 'rgba(255,255,255,0.55)'); g.addColorStop(0.5, 'rgba(255,255,255,0.14)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, N, N); return (cache.halo = c);
  }
  function halo(color, size, op){ const m = new THREE.SpriteMaterial({ map:tex(haloC()), color, transparent:true, opacity:op ?? 0.8, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false }); const s = new THREE.Sprite(m); s.scale.set(size, size, 1); return s; }

  /* ---------- pantalla LCD dinámica ---------- */
  function lcd(o = {}){
    const W = o.w || 256, H = o.h || 96, c = mk(W, H), x = c.getContext('2d'), t = tex(c);
    const bg = o.bg || '#0E1E17', fg = o.fg || '#8CF2B4', ghost = o.ghost || 'rgba(140,242,180,0.07)';
    let last = null;
    function set(txt, sub){ const k = txt + '|' + (sub || ''); if (k === last) return; last = k;
      x.fillStyle = bg; x.fillRect(0, 0, W, H);
      const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(255,255,255,0.07)'); gr.addColorStop(1, 'rgba(0,0,0,0.12)'); x.fillStyle = gr; x.fillRect(0, 0, W, H);
      let fs = Math.round(H * (sub ? 0.5 : 0.62)); x.font = `700 ${fs}px "IBM Plex Mono", ui-monospace, monospace`; x.textAlign = 'right'; x.textBaseline = 'middle';
      const tw = x.measureText(txt).width; if (tw > W * 0.88){ fs = Math.floor(fs * W * 0.88 / tw); x.font = `700 ${fs}px "IBM Plex Mono", ui-monospace, monospace`; }
      const yy = sub ? H * 0.42 : H * 0.54;
      if (o.ghostTxt !== false){ x.fillStyle = ghost; x.fillText(String(txt).replace(/[0-9]/g, '8'), W - W * 0.06, yy); }
      x.fillStyle = fg; x.shadowColor = fg; x.shadowBlur = o.glow ?? 6; x.fillText(txt, W - W * 0.06, yy); x.shadowBlur = 0;
      if (sub){ x.font = `600 ${Math.round(H * 0.2)}px "IBM Plex Mono", ui-monospace, monospace`; x.textAlign = 'left'; x.fillStyle = fg; x.globalAlpha = 0.75; x.fillText(sub, W * 0.06, H * 0.82); x.globalAlpha = 1; }
      t.needsUpdate = true; }
    set(o.text || '0', o.sub);
    const m = new THREE.MeshBasicMaterial({ map:t, toneMapped:false });
    return { tex:t, mat:m, set };
  }
  /* etiqueta impresa (para pilas, instrumentos, cinta métrica…) */
  function printed(w, h, draw){ const c = mk(w, h); draw(c.getContext('2d'), w, h); return tex(c); }

  /* ---------- geometría ---------- */
  function rrShape(w, h, r){ const s = new THREE.Shape(), x = -w / 2, y = -h / 2; r = Math.min(r, w / 2, h / 2);
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; }
  /* normaliza UV de las tapas al rectángulo (0..1) */
  function normUV(g, w, h){ const p = g.attributes.position, uv = g.attributes.uv; for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / w + 0.5, p.getY(i) / h + 0.5); uv.needsUpdate = true; return g; }
  /* caja con aristas redondeadas y biselado; centrada en el origen */
  function rbox(w, h, d, r, bev){ const b = Math.min(bev ?? r * 0.6, d * 0.3, w * 0.2, h * 0.2); const g = new THREE.ExtrudeGeometry(rrShape(w - 2 * b, h - 2 * b, Math.max(0.001, r - b)), { depth:Math.max(0.001, d - 2 * b), bevelEnabled:true, bevelThickness:b, bevelSize:b, bevelSegments:low() ? 2 : 3, curveSegments:low() ? 4 : 8 });
    g.translate(0, 0, -(d - 2 * b) / 2); normUV(g, w, h); g.computeVertexNormals(); return g; }
  /* losa horizontal (mesada) con canto redondeado; cara superior en y = 0 */
  function slab(w, d, t, r, bev){ const g = rbox(w, d, t, r, bev); g.rotateX(-Math.PI / 2); g.translate(0, -t / 2, 0);
    /* rotateX(-90°): la cara "frontal" del extruido queda arriba; UV ya normalizadas en XY → ahora XZ */
    return g; }
  function lathe(pts, seg){ return new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(Math.max(0, p[0]), p[1])), seg || (low() ? 28 : 56)); }

  /* ---------- materiales ---------- */
  function glass(o = {}){ return new THREE.MeshPhysicalMaterial({ color:o.color ?? 0xEAF6FA, roughness:o.rough ?? 0.04, metalness:0, transparent:true, opacity:o.opacity ?? 0.26, clearcoat:1, clearcoatRoughness:0.03, envMapIntensity:o.env ?? 2.2, side:o.side ?? THREE.DoubleSide, depthWrite:false, reflectivity:0.9 }); }
  function metal(color, o = {}){ const m = new THREE.MeshPhysicalMaterial({ color, metalness:o.metal ?? 0.9, roughness:o.rough ?? 0.32, clearcoat:o.coat ?? 0.2, clearcoatRoughness:0.3, envMapIntensity:o.env ?? 1.3 }); if (o.brushed){ m.bumpMap = tex(brushedC(), { srgb:false, wrap:true, rep:o.rep || [1, 1] }); m.bumpScale = 0.0035; m.roughnessMap = m.bumpMap; } return m; }
  function plastic(color, o = {}){ return new THREE.MeshPhysicalMaterial({ color, metalness:0, roughness:o.rough ?? 0.42, clearcoat:o.coat ?? 0.35, clearcoatRoughness:0.25, envMapIntensity:o.env ?? 1 }); }
  function wood(o = {}){ const c = woodC(o); const m = new THREE.MeshPhysicalMaterial({ map:tex(c, { wrap:!!o.rep, rep:o.rep }), roughness:o.rough ?? 0.55, metalness:0, clearcoat:o.coat ?? 0.35, clearcoatRoughness:0.35 }); if (!low()){ m.bumpMap = tex(c, { srgb:false, wrap:!!o.rep, rep:o.rep }); m.bumpScale = 0.004; } return m; }

  /* ---------- mesada de laboratorio + mueble + pared de azulejos ---------- */
  /* o: {w, d, y (cara superior), x, z, t, top:'wood'|'phenolic', wall:{z, h, w}, cabinet:true} */
  function bench(o = {}){
    const g = new THREE.Group(), w = o.w || 7, d = o.d || 3.4, t = o.t || 0.16, y = o.y ?? 0, dk = dark();
    let topMat;
    if (o.top === 'phenolic') { topMat = new THREE.MeshPhysicalMaterial({ map:tex(speckC({ base: dk ? [44, 48, 54] : [58, 64, 70], flecks:400, fleck:[150, 156, 162] }), { wrap:true, rep:[w / 2.4, d / 2.4] }), roughness:0.5, clearcoat:0.5, clearcoatRoughness:0.25 }); }
    else topMat = wood({ base: dk ? [168, 124, 80] : (o.base || [206, 162, 110]), dark:[96, 58, 28], strips: Math.max(5, Math.round(d / 0.42)), seed:o.seed || 11, coat:0, rough:0.72 });
    topMat.envMapIntensity = 0.38; topMat.reflectivity = 0.1;   /* sin brillo lechoso en ángulos rasantes */
    const top = new THREE.Mesh(slab(w, d, t, 0.06, 0.035), topMat); top.position.set(o.x || 0, y, o.z || 0); g.add(top);
    if (o.cabinet !== false){
      /* superficies grandes con material estándar (más liviano que el físico con barniz) */
      const ch = o.cabH || 2.4, cm = new THREE.MeshStandardMaterial({ color: dk ? 0x55606C : 0xDCE1E6, roughness:0.8, metalness:0, envMapIntensity:0.45 });
      const front = new THREE.Mesh(rbox(w - 0.16, ch, d - 0.35, 0.03, 0.02), cm); front.position.set(o.x || 0, y - t - ch / 2, (o.z || 0) - 0.1); g.add(front);
      /* puertas y tiradores */
      const nd = Math.max(2, Math.round(w / 1.6)), dw = (w - 0.3) / nd, hm = metal(0xB8C0C8, { rough:0.3 }), lineM = plastic(dk ? 0x3B444E : 0xB9C1C9, { rough:0.7 });
      for (let i = 0; i < nd; i++){ const cx = (o.x || 0) - (w - 0.3) / 2 + dw * (i + 0.5);
        const gap = new THREE.Mesh(new THREE.BoxGeometry(0.02, ch - 0.16, 0.01), lineM); gap.position.set(cx - dw / 2, y - t - ch / 2, (o.z || 0) + (d - 0.35) / 2 - 0.1 + 0.005); if (i) g.add(gap);
        const hd = new THREE.Mesh(rbox(0.36, 0.05, 0.05, 0.02), hm); hd.position.set(cx, y - t - 0.28, (o.z || 0) + (d - 0.35) / 2 - 0.07); g.add(hd); }
      const kick = new THREE.Mesh(new THREE.BoxGeometry(w - 0.3, 0.14, 0.02), plastic(dk ? 0x2A3038 : 0x9AA3AD, { rough:0.8 })); kick.position.set(o.x || 0, y - t - ch + 0.07, (o.z || 0) + (d - 0.35) / 2 - 0.12); g.add(kick);
    }
    if (o.wall){
      const wz = o.wall.z, wh = o.wall.h || 4, ww = o.wall.w || w + 6;
      const tm = new THREE.MeshStandardMaterial({ map:tex(tileC({ base: dk ? [70, 82, 96] : [238, 241, 243], grout: dk ? [52, 62, 74] : [200, 206, 210] }), { wrap:true, rep:[ww / 1.2, wh / 1.2] }), roughness:0.45, metalness:0, envMapIntensity:0.6 });
      const wall = new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), tm); wall.position.set(o.x || 0, y - 0.02 + wh / 2 - (o.wall.below || 0), wz); g.add(wall);
      /* zócalo de la mesada contra la pared */
      const spl = new THREE.Mesh(rbox(w, 0.12, 0.05, 0.02), topMat); spl.position.set(o.x || 0, y + 0.06, wz + 0.03); g.add(spl);
    }
    return { group:g, top, mat:topMat };
  }

  /* ---------- vaso de precipitados (con pico y graduación) ----------
     o: { r, h, t, spout:true, cap (mL), step (mL entre rayas), major (mL entre números), yFor(V) → altura interna, face (ángulo hacia la cámara) } */
  function beaker(o){
    const g = new THREE.Group(), r = o.r, h = o.h, t = o.t || Math.max(0.016, r * 0.035), rr = Math.min(0.05, r * 0.12);
    const pts = [[0, 0], [r - rr, 0], [r - rr * 0.3, rr * 0.3], [r, rr], [r, h - 0.01], [r + t * 0.7, h + t * 0.2], [r + t * 0.55, h + t * 1.1], [r - t * 0.35, h + t * 0.9], [r - t, h - t * 0.2], [r - t, t + rr], [r - t - rr * 0.7, t + rr * 0.3], [r - t - rr, t], [0, t]];
    const geo = lathe(pts, o.seg);
    if (o.spout !== false){ const p = geo.attributes.position, s0 = h - r * 0.45, face = (o.spoutAng ?? Math.PI * 0.5);
      for (let i = 0; i < p.count; i++){ const y = p.getY(i); if (y < s0) continue; const x = p.getX(i), z = p.getZ(i), a = Math.atan2(x, z) - face, w = Math.pow(Math.max(0, Math.cos(a)), 10), k = Math.pow((y - s0) / (h + t - s0), 2) * r * 0.2 * w; const rad = Math.hypot(x, z) || 1; p.setXYZ(i, x + x / rad * k, y + k * 0.25, z + z / rad * k); }
      geo.computeVertexNormals(); }
    const gm = glass(Object.assign({ opacity:0.2, env:1.7 }, o.glass)); const shell = new THREE.Mesh(geo, gm); shell.renderOrder = 2; g.add(shell);
    /* borde más opaco: se lee como vidrio grueso */
    const rim = new THREE.Mesh(new THREE.TorusGeometry(r + t * 0.1, t * 0.75, 6, low() ? 28 : 56), glass({ opacity:0.55 })); rim.rotation.x = Math.PI / 2; rim.position.y = h + t * 0.5; rim.renderOrder = 2; g.add(rim);
    if (o.cap){ const decal = gradDecal(Object.assign({ r:r + 0.003, y0:0, y1:h * 0.94 }, o)); decal.renderOrder = 3; g.add(decal); }
    return { group:g, shell, inner:r - t, t };
  }
  /* graduación impresa (esmalte blanco) sobre un sector de cilindro que mira a la cámara */
  function gradDecal(o){
    const cap = o.cap, step = o.step || cap / 10, major = o.major || cap / 5, H = S(1024), W = S(256), c = mk(W, H), x = c.getContext('2d');
    const y0 = o.y0, y1 = o.y1, yFor = o.yFor || (V => V / cap * (y1 - y0) + y0);
    const pxFor = yy => H - (yy - y0) / (y1 - y0) * H;
    const ink = o.ink || 'rgba(255,255,255,0.95)', sh = o.shadow || 'rgba(20,34,48,0.55)';
    x.textBaseline = 'middle'; x.font = `700 ${Math.round(H * 0.032)}px "IBM Plex Sans", Arial, sans-serif`;
    const draw = (col, dx, dy) => { x.fillStyle = col; x.strokeStyle = col;
      for (let V = step; V <= cap + 1e-6; V += step){ const py = pxFor(yFor(V)) + dy, isM = Math.abs(V / major - Math.round(V / major)) < 1e-6, half = Math.abs((V / (major / 2)) - Math.round(V / (major / 2))) < 1e-6;
        const len = isM ? W * 0.34 : half ? W * 0.24 : W * 0.14; x.fillRect(W * 0.1 + dx, py - H * 0.0025, len, H * 0.005);
        if (isM){ x.textAlign = 'left'; x.fillText(String(Math.round(V)), W * 0.1 + len + W * 0.05 + dx, py); } }
      if (o.unit){ x.textAlign = 'left'; x.font = `700 ${Math.round(H * 0.028)}px "IBM Plex Sans", Arial, sans-serif`; x.fillText(o.unit, W * 0.1 + dx, pxFor(yFor(cap)) - H * 0.05 + dy); x.font = `700 ${Math.round(H * 0.032)}px "IBM Plex Sans", Arial, sans-serif`; } };
    draw(sh, 1.5, 1.5); draw(ink, 0, 0);
    const arc = o.arc || 0.9, face = o.face ?? 0;
    const g = new THREE.CylinderGeometry(o.r, o.r, y1 - y0, low() ? 12 : 20, 1, true, face - arc / 2, arc); g.translate(0, (y0 + y1) / 2, 0);
    const m = new THREE.MeshBasicMaterial({ map:tex(c), transparent:true, depthWrite:false, toneMapped:false, side:THREE.FrontSide });
    return new THREE.Mesh(g, m);
  }
  /* ---------- líquido con menisco (cóncavo el agua, convexo el mercurio) ---------- */
  function liquid(r, o = {}){
    const col = o.color ?? 0x5BB7D6;
    const mt = new THREE.MeshPhysicalMaterial({ color:col, roughness:0.06, metalness:0, transparent:true, opacity:o.opacity ?? 0.55, clearcoat:1, clearcoatRoughness:0.05, depthWrite:false, side:THREE.DoubleSide, envMapIntensity:1.4 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, low() ? 28 : 48, 1, true), mt); body.geometry.translate(0, 0.5, 0); body.renderOrder = 1;
    const bot = new THREE.Mesh(new THREE.CircleGeometry(r, low() ? 28 : 48), mt); bot.rotation.x = -Math.PI / 2; bot.position.y = 0.002;
    /* superficie: anillos concéntricos para poder ondularla */
    const NR = low() ? 10 : 16, NS = low() ? 28 : 48, pts = [];
    for (let i = 0; i <= NR; i++){ const u = i / NR; pts.push(new THREE.Vector2(u * r, 0)); }
    const sg = new THREE.LatheGeometry(pts.slice().reverse(), NS); const P = sg.attributes.position; const base = new Float32Array(P.count), rad = new Float32Array(P.count);
    for (let i = 0; i < P.count; i++){ rad[i] = Math.hypot(P.getX(i), P.getZ(i)) / r; }
    const surfM = mt.clone(); surfM.opacity = Math.min(1, (o.opacity ?? 0.55) + 0.15); surfM.clearcoat = 1; surfM.roughness = 0.03;
    const surf = new THREE.Mesh(sg, surfM); surf.renderOrder = 1;
    const men = o.men ?? 0.035;
    let amp = 0, t0 = 0, convex = false;
    function shape(tt, idle){ for (let i = 0; i < P.count; i++){ const u = rad[i]; const m = (convex ? -1.4 : 1) * men * Math.pow(Math.max(0, (u - 0.8) / 0.2), 2); const rip = amp * Math.sin(u * 22 - (tt - t0) * 9) * Math.exp(-(tt - t0) * 1.2) * (1 - u * 0.5) + idle * Math.sin(u * 9 + tt * 1.7 + Math.atan2(P.getZ(i), P.getX(i)) * 2) * u; P.setY(i, m + rip); } P.needsUpdate = true; sg.computeVertexNormals(); }
    shape(0, 0);
    return { body, bot, surf, mat:mt, surfMat:surfM,
      setLevel(y){ body.scale.y = Math.max(0.001, y); surf.position.y = y; },
      setColor(c, opa, metal){ [mt, surfM].forEach((m, i) => { m.color.set(c); if (opa !== undefined) m.opacity = i ? Math.min(1, opa + 0.12) : opa; m.metalness = metal ? 0.9 : 0; m.roughness = metal ? 0.15 : (i ? 0.03 : 0.06); }); convex = !!metal; },
      splash(tt, a){ amp = a; t0 = tt; },
      tick(tt, moving){ const active = amp > 0 && (tt - t0) < 4; if (!active && !moving && this._still) return; shape(tt, moving ? 0.004 : 0); this._still = !active && !moving; if (!active) amp = 0; } };
  }
  /* ---------- termómetro de vidrio con columna de alcohol ---------- */
  function thermometer(o = {}){
    const g = new THREE.Group(), L = o.len || 1.4, r = o.r || 0.028, tmin = o.min ?? 0, tmax = o.max ?? 100;
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 12, 1, true), glass({ opacity:0.4 })); tube.position.y = L / 2 + r * 1.6; g.add(tube);
    const capT = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), glass({ opacity:0.4 })); capT.position.y = L + r * 1.6; g.add(capT);
    const redM = new THREE.MeshPhysicalMaterial({ color:o.color ?? 0xD1362B, roughness:0.2, clearcoat:0.8, emissive:o.color ?? 0xD1362B, emissiveIntensity:0.12 });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(r * 1.55, 16, 12), redM); bulb.scale.y = 1.35; bulb.position.y = r * 1.6; g.add(bulb);
    const bulbG = new THREE.Mesh(new THREE.SphereGeometry(r * 1.75, 16, 12), glass({ opacity:0.3 })); bulbG.scale.y = 1.35; bulbG.position.y = r * 1.6; g.add(bulbG);
    const colG = new THREE.CylinderGeometry(r * 0.38, r * 0.38, 1, 8); colG.translate(0, 0.5, 0);
    const col = new THREE.Mesh(colG, redM); col.position.y = r * 1.6; g.add(col);
    /* escala esmaltada detrás del capilar */
    const y0 = r * 1.6 + L * 0.1, y1 = r * 1.6 + L * 0.95;
    const sc = printed(S(64), S(512), (x, W, H) => { x.fillStyle = 'rgba(250,250,246,0.94)'; x.fillRect(0, 0, W, H); x.fillStyle = '#2a3440'; const n = Math.round((tmax - tmin) / 10); for (let i = 0; i <= n * 2; i++){ const py = H - i / (n * 2) * H * 0.98 - H * 0.01; x.fillRect(i % 2 ? W * 0.6 : W * 0.35, py - 1, i % 2 ? W * 0.4 : W * 0.65, i % 2 ? 1.5 : 2.5); } });
    const scale = new THREE.Mesh(new THREE.PlaneGeometry(r * 2.6, y1 - y0 + L * 0.02), new THREE.MeshBasicMaterial({ map:sc, toneMapped:false, transparent:true, opacity:0.92 })); scale.position.set(0, (y0 + y1) / 2, -r * 1.2); g.add(scale);
    return { group:g, set(T){ const f = clamp((T - tmin) / (tmax - tmin), 0, 1); col.scale.y = Math.max(0.001, (y0 - r * 1.6) + f * (y1 - y0)); }, top: L + r * 2 };
  }
  /* ---------- tornillo / borne de laboratorio (binding post) ---------- */
  function post(color, s = 1){ const g = new THREE.Group();
    const base = new THREE.Mesh(lathe([[0, 0], [0.11 * s, 0], [0.12 * s, 0.02 * s], [0.12 * s, 0.06 * s], [0.1 * s, 0.07 * s], [0, 0.07 * s]], 20), plastic(color, { rough:0.35, coat:0.6 })); g.add(base);
    const cap = new THREE.Mesh(lathe([[0, 0.07 * s], [0.085 * s, 0.07 * s], [0.09 * s, 0.1 * s], [0.085 * s, 0.2 * s], [0.07 * s, 0.22 * s], [0, 0.22 * s]], 16), plastic(color, { rough:0.3, coat:0.7 })); g.add(cap);
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03 * s, 0.03 * s, 0.08 * s, 10), metal(0xD4B26A, { rough:0.25 })); pin.position.y = 0.26 * s; g.add(pin);
    return g; }
  /* ---------- radio de cámara según la proporción del escenario ---------- */
  function fitR(stage, r0, a0, k){ const w = stage.clientWidth || 800, hh = stage.clientHeight || 600, a = w / hh; return a >= a0 ? r0 : r0 * Math.pow(a0 / a, k ?? 0.8); }

  return { dark, tex, printed, woodC, tileC, speckC, brushedC, corkC, poreC, foamC, clothC, halo, lcd, rrShape, rbox, slab, lathe, glass, metal, plastic, wood, bench, beaker, gradDecal, liquid, thermometer, post, fitR, low };
})();

/* =====================================================================
   CIENCIAS NATURALES · CIENCIAS FÍSICAS · 8.º EGB Superior
   Unidad 1 · Medir la materia: masa, volumen, densidad y presión
   LABORATORIO VIRTUAL: densidad y flotación
   ===================================================================== */
(function(){

/* ---------- datos con valores reales ---------- */
/* v en mL (cm³), m en g → densidad = m/v en g/mL */
const DL_MAT = [
  { id:'corcho',   n:'Corcho',            em:'🟤', v:25, m:6.0,  rho:0.24, col:0xC08B5C, forma:'cil',    nota:'Corteza del alcornoque: hasta la mitad de su volumen es aire atrapado.' },
  { id:'balsa',    n:'Madera de balsa',   em:'🪵', v:40, m:6.4,  rho:0.16, col:0xE0CDA0, forma:'caja',  g:'f',   nota:'La balsa es ecuatoriana: el Ecuador es el principal productor del mundo.' },
  { id:'hielo',    n:'Hielo',             em:'🧊', v:50, m:46.0, rho:0.92, col:0xBFE3EF, forma:'caja',   tr:0.55, nota:'El agua es rarísima: al congelarse se expande, por eso el hielo flota.' },
  { id:'pet',      n:'Plástico PET',      em:'🥤', v:20, m:27.6, rho:1.38, col:0x6FB6D6, forma:'cil',    tr:0.6,  nota:'El PET de las botellas se hunde; por eso se separa del polietileno en agua.' },
  { id:'vidrio',   n:'Vidrio',            em:'🔵', v:16, m:40.0, rho:2.50, col:0xA8CBD2, forma:'esfera', tr:0.62, nota:'Canica de vidrio común (sílice fundida con sosa y cal).' },
  { id:'aluminio', n:'Aluminio',          em:'⬜', v:30, m:81.0, rho:2.70, col:0xC6CBD2, forma:'caja',   met:0.75, nota:'Metal liviano: por eso se usa en aviones, latas y ventanas.' },
  { id:'hierro',   n:'Hierro',            em:'⬛', v:10, m:78.7, rho:7.87, col:0x62676E, forma:'cil',    met:0.8,  nota:'Aunque la pieza es pequeña, pesa más que el bloque de aluminio.' },
  { id:'pomez',    n:'Piedra pómez',      em:'🪨', v:25, m:16.0, rho:0.64, col:0x9C968B, forma:'blob',  g:'f',   nota:'Roca volcánica llena de burbujas de gas: es piedra y, aun así, flota.' }
];
const DL_LIQ = [
  { id:'agua',      n:'Agua dulce',            rho:1.00, col:0x5BB7D6, nota:'Referencia universal: 1 mL de agua tiene una masa de 1 g.' },
  { id:'mar',       n:'Agua de mar',           rho:1.03, col:0x3F97B8, nota:'La sal disuelta añade masa sin añadir casi volumen: por eso flotamos mejor en el mar.' },
  { id:'aceite',    n:'Aceite de cocina',      rho:0.92, col:0xD9B441, nota:'Menos denso que el agua: por eso queda encima en el sartén.' },
  { id:'alcohol',   n:'Alcohol antiséptico',   rho:0.79, col:0xCFE0E8, nota:'Etanol: el líquido menos denso de esta mesa.' },
  { id:'glicerina', n:'Glicerina',             rho:1.26, col:0xCBD79A, nota:'Espesa y densa; se usa en jarabes y jabones.' },
  { id:'salmuera',  n:'Salmuera saturada',     rho:1.20, col:0x9FC8CE, nota:'Agua con toda la sal que puede disolver, como en las salinas de Salinas de Guaranda.' },
  { id:'mercurio',  n:'Mercurio (simulación)', rho:13.53, col:0xB9BEC6, nota:'Metal líquido, tóxico: jamás se manipula en el aula. Aquí solo es una simulación.' }
];
const DL_M = Object.fromEntries(DL_MAT.map(m=>[m.id,m]));
const DL_L = Object.fromEntries(DL_LIQ.map(l=>[l.id,l]));

/* ---------- escala y geometría coherentes ---------- */
const CM_U = 5;                 // 1 unidad de mundo = 5 cm
const U = cm => cm/CM_U;
const TK = { x:-1.8, z:0.55, w:1.6, d:1.0, h:2.4, t:0.055 };   // pecera: 8 cm × 5 cm × 12 cm útiles
const ML_U = (TK.w*CM_U)*(TK.d*CM_U)*CM_U;              // mL por unidad de altura (= 200)
const CAP = ML_U*TK.h;                                  // capacidad (480 mL)
const V0 = 250;                                         // líquido inicial
const BAL = { x:1.3, z:0.55 };                         // balanza
const REP = { z:-1.45, y:2.70 };                        // repisa

/* dimensiones reales de cada pieza a partir de su volumen */
DL_MAT.forEach(o => {
  if (o.forma==='caja'){ const s = Math.cbrt(o.v); o.wid = U(s); o.hgt = U(s); o.dep = U(s); }
  else if (o.forma==='cil'){ const hc = 1.25*Math.cbrt(o.v), rc = Math.sqrt(o.v/(Math.PI*hc)); o.wid = U(2*rc); o.hgt = U(hc); o.dep = o.wid; o.r = U(rc); }
  else { const rc = Math.cbrt(3*o.v/(4*Math.PI)); o.wid = U(2*rc); o.hgt = U(2*rc); o.dep = o.wid; o.r = U(rc); }
});
/* posiciones en la repisa */
(function(){ let x = 0; const gap = 0.16; DL_MAT.forEach(o => { x += o.wid/2; o.rx = x; x += o.wid/2 + gap; }); const tot = x - gap; DL_MAT.forEach(o => { o.rx -= tot/2; o.ry = REP.y + o.hgt/2; }); })();

const dl2 = v => v.toFixed(2).replace('.', ',');
const dl1 = v => v.toFixed(1).replace('.', ',');
const dlEl  = o => (o.g==='f' ? 'la ' : 'el ') + o.n.toLowerCase();      // "el corcho", "la piedra pómez"
const dlDel = o => (o.g==='f' ? 'de la ' : 'del ') + o.n.toLowerCase();  // "del corcho", "de la piedra pómez"
const dlCap = t => t.charAt(0).toUpperCase() + t.slice(1);

route('/cn/lab/densidad', (view) => {
  view.classList.add('wide');
  const ACT = 'cn-lab-densidad';
  const suave = () => motionOK() && !Store.s.a11y.motion;   // ¿se permite animación?

  /* ---------------- estado ---------------- */
  const L = {
    liq: 'agua',
    sel: DL_MAT[0].id,
    ob: Object.fromEntries(DL_MAT.map(o=>[o.id,{ est:'estante', m:null, v:null, dens:false, pred:null }])),
    filas: [],            // {mat, m, v, rho, liq, flota}
    prof: 3,              // profundidad del manómetro en cm
    retoLiq: false,
    retoQuiz: false,
    intentos: 0
  };
  const liq = () => DL_L[L.liq];
  const sel = () => DL_M[L.sel];
  const enLiquido = () => DL_MAT.filter(o => L.ob[o.id].est==='liquido' || L.ob[o.id].est==='midiendo');

  /* resultado físico de un objeto en el líquido actual */
  function frac(o){ return clamp(o.rho/liq().rho, 0, 1); }
  function resultado(o, lq){ const r = (lq||liq()).rho; if (o.rho < r*0.985) return 'flota'; if (o.rho > r*1.015) return 'hunde'; return 'entre'; }
  function desplazado(o){ const st = L.ob[o.id].est; if (st==='midiendo') return o.v; if (st!=='liquido') return 0; return resultado(o)==='flota' ? frac(o)*o.v : o.v; }
  function nivelML(){ return V0 + DL_MAT.reduce((s,o)=>s+desplazado(o), 0); }
  function nivelU(){ return Math.min(nivelML(), CAP)/ML_U; }
  function derrama(){ return nivelML() > CAP; }

  /* posición objetivo de cada objeto (coordenadas de mundo) */
  function posDe(o){
    const st = L.ob[o.id].est;
    if (st==='balanza') return [BAL.x, 0.37 + o.hgt/2, BAL.z];
    if (st==='estante') return [o.rx, o.ry, REP.z];
    const lvl = nivelU(); const dentro = enLiquido(); const i = dentro.indexOf(o), n = dentro.length;
    let dx = 0; if (n>1){ const paso = Math.min(0.5, (TK.w-0.25)/n); dx = (i-(n-1)/2)*paso; }
    /* la probeta es cilíndrica: las piezas se acomodan sin atravesar el vidrio (solo cambia x, z) */
    let dz = (n>2 && i%2) ? 0.16 : 0; const lim = Math.max(0, Math.sqrt(TK.w*TK.d/Math.PI) - 0.05 - Math.hypot(o.wid, o.dep)/2), rr = Math.hypot(dx, dz); if (rr > lim && rr > 0){ dx *= lim/rr; dz *= lim/rr; }
    const x = TK.x + dx, z = TK.z + dz;
    if (st==='midiendo') return [x, Math.max(o.hgt/2+0.03, lvl*0.5), z];
    const res = resultado(o);
    if (res==='hunde') return [x, o.hgt/2 + 0.03, z];
    if (res==='entre') return [x, Math.max(o.hgt/2+0.03, lvl*0.55), z];
    return [x, lvl - frac(o)*o.hgt + o.hgt/2, z];
  }

  /* ---------------- encabezado ---------------- */
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'},
    h('div',{},
      h('span',{class:'eyebrow lab'},'Ciencias Naturales · Ciencias Físicas · 8.º EGB · Unidad 1'),
      h('h1',{},'¿Por qué un barco de acero flota y una canica se hunde?'),
      h('p',{},'Mide la masa en la balanza, mide el volumen por desplazamiento de agua, calcula la densidad y pon a prueba tu predicción. Después cambia el líquido: vas a descubrir que flotar no es una propiedad del objeto.')),
    h('span',{class:'pill lab'},'Laboratorio virtual')));

  /* ---------------- franja propósito · observa · reto ---------------- */
  const retoSt = h('div',{class:'notice'},'Pendiente: hasta ahora el bloque de aluminio se ha hundido en todos los líquidos que probaste.');
  const retoQ = h('div',{});
  view.append(h('section',{class:'reto static'}, h('div',{class:'reto-body'},
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'Propósito'),
      h('p',{},'Comprender que la densidad es una propiedad de cada material (masa dividida para volumen) y que un cuerpo flota cuando su densidad es menor que la del líquido, no cuando “pesa poco”.')),
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'Observa'),
      h('ul',{class:'checks plain'}, [
        'Cuánto sube el nivel del líquido al sumergir cada pieza',
        'Qué parte del objeto queda bajo la superficie cuando flota',
        'Qué le pasa al mismo objeto cuando cambias de líquido',
        'Cómo cambia el manómetro al bajar a más profundidad'
      ].map(t => h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), t)))),
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'🎯 Reto'),
      h('p',{style:'font-weight:600'},'Encuentra un líquido en el que el bloque de aluminio flote y explica por qué no basta con que el objeto sea liviano.'),
      retoSt, retoQ))));

  /* ---------------- escenario ---------------- */
  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'viewer dl-viewer'}, stage, panel));

  const nivelTxt = h('span',{class:'stage-note'},'—');
  const balTxt = h('span',{class:'stage-note'},'Balanza: 0,0 g');
  const desTxt = h('span',{class:'stage-note'},'Volumen desplazado: —');
  stage.append(h('div',{class:'stage-top'}, h('span',{class:'pill lab'},'Mesa de laboratorio'), nivelTxt, balTxt, desTxt));
  const avisoEl = h('div',{class:'notice warn',style:'display:none;max-width:420px'});
  stage.append(h('div',{class:'stage-bottom'}, avisoEl));

  /* ---------------- 3D ---------------- */
  let E = null, mallas = {}, aguaMesh = null, manoMesh = null, svg2D = null, liq3 = null, balLCD = null, presLCD = null;
  const anim = {};   // id → {from, to, t, dur, luego}
  const cola = {};   // id → pasos pendientes

  function crearEscena(){
    const K = cnLabKit, dk = K.dark(), estrecho = stage.clientWidth < stage.clientHeight;   /* en el celular el encuadre baja para dejar libre la franja de lecturas */
    E = new Engine3D(stage, {
      radius:K.fitR(stage, 9.6, 1.3, 0.62), phi:1.27, theta:0.3, minR:3.2, maxR:22, target:[-0.2, estrecho ? 2.1 : 1.42, -0.15], exposure:0.95, floor:0.006, floorSize:6.5,
      aria:'Mesa de laboratorio en 3D: pecera con líquido, balanza digital y repisa con ocho objetos. Arrastra para rotar. También puedes usar la lista de objetos y los botones del panel.',
      onSelect:(id)=>{ if (id && DL_M[id]) elegir(id, 'modelo'); }
    });
    const low = E.low, face = 0.3;
    /* mesada de madera, mueble y pared de azulejos */
    const B = K.bench({ w:6.8, d:3.3, y:0, z:-0.13, t:0.16, wall:{ z:-1.78, h:4.6, w:14 }, cabH:2.6 });
    E.addPart('mesa', [B.group], {pickable:false});
    /* repisa de pared con escuadras metálicas */
    const tabla = new THREE.Mesh(K.slab(5.5, 0.62, 0.09, 0.03, 0.02), K.wood({ base:[182,136,90], strips:2, seed:4, coat:0.3 }));
    tabla.position.set(0, REP.y, REP.z);
    const esc = K.metal(0x8E979F, { rough:0.4, metal:0.8 }), rep = [tabla];
    [-2.35, 2.35].forEach(x => { const v = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 0.04), esc); v.position.set(x, REP.y - 0.34, -1.74); const hz = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.5), esc); hz.position.set(x, REP.y - 0.11, REP.z - 0.05);
      const dg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.58, 0.035), esc); dg.position.set(x, REP.y - 0.3, REP.z - 0.1); dg.rotation.x = 0.78; rep.push(v, hz, dg); });
    E.addPart('repisa', rep, {pickable:false});
    E.addLabel('repisa', 'Repisa de materiales', [0, REP.y+0.95, REP.z]);
    /* probeta de vidrio: misma sección que el modelo (40 cm²), con base, pico y escala en mL */
    const Rin = Math.sqrt(TK.w*TK.d/Math.PI);
    const bk = K.beaker({ r:Rin+0.03, h:TK.h+0.05, t:0.03, cap:CAP, step:10, major:100, unit:'mL', yFor:v => v/ML_U + 0.03, face, arc:1.05, spoutAng:Math.PI*0.5+0.3 });
    bk.group.position.set(TK.x, -0.03, TK.z);
    const pie = new THREE.Mesh(K.lathe([[0,0],[Rin+0.15,0],[Rin+0.16,0.03],[Rin+0.12,0.06],[Rin+0.04,0.07],[0,0.07]], low?24:40), K.glass({ opacity:0.3 }));
    pie.position.set(TK.x, -0.005, TK.z); pie.scale.y = 0.6;
    const liga = new THREE.Mesh(new THREE.TorusGeometry(Rin+0.035, 0.022, 8, low?28:48), K.plastic(0xD9542E, { rough:0.6, coat:0 }));
    liga.rotation.x = Math.PI/2; liga.position.set(TK.x, V0/ML_U, TK.z);
    E.addPart('pecera', [bk.group, pie], {pickable:false, passThrough:true});
    E.addPart('marca-inicial', [liga], {pickable:false});
    E.addLabel('pecera', 'Probeta graduada', [TK.x, TK.h+0.3, TK.z]);
    /* líquido con menisco y superficie que se ondula */
    liq3 = K.liquid(Rin-0.004, { color:liq().col, opacity:0.5, men:0.04 });
    [liq3.body, liq3.bot, liq3.surf].forEach(m => m.position.set(TK.x, m.position.y, TK.z));
    E.addPart('liquido', [liq3.body, liq3.bot, liq3.surf], {pickable:false, passThrough:true});
    aguaMesh = liq3.body;
    /* balanza digital: carcasa, plato de acero y pantalla LCD */
    const car = K.plastic(dk ? 0x3A4652 : 0x2F3A44, { rough:0.45, coat:0.5 });
    const cuerpo = new THREE.Mesh(K.rbox(1.34, 0.26, 1.46, 0.09, 0.05), car); cuerpo.position.set(BAL.x, 0.13, BAL.z + 0.17);
    const plato = new THREE.Mesh(K.lathe([[0,0],[0.5,0],[0.52,0.015],[0.525,0.04],[0.505,0.05],[0,0.045]], low?32:56), K.metal(0xD8DEE3, { rough:0.22, brushed:true }));
    plato.position.set(BAL.x, 0.32, BAL.z);
    const eje = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.07, 16), K.metal(0x7C868F, { rough:0.4 })); eje.position.set(BAL.x, 0.29, BAL.z);
    const caja = new THREE.Mesh(K.rbox(0.96, 0.16, 0.3, 0.05, 0.03), car); caja.position.set(BAL.x, 0.26, BAL.z + 0.74); caja.rotation.x = 0.52;
    balLCD = K.lcd({ w:256, h:88, text:'0,0 g' });
    const pant = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.17), balLCD.mat); pant.position.set(BAL.x - 0.1, 0.334, BAL.z + 0.782); pant.rotation.x = -1.05;
    const btnM = K.plastic(0xC9D1D8, { rough:0.5 }), btns = [];
    [0.3, 0.4].forEach(dx => { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 12), btnM); b.position.set(BAL.x + dx, 0.336, BAL.z + 0.78); b.rotation.x = 0.52; btns.push(b); });
    const patas = [[-0.55,-0.5],[0.55,-0.5],[-0.55,0.75],[0.55,0.75]].map(([dx,dz]) => { const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 10), K.plastic(0x1C232A)); p2.position.set(BAL.x+dx, 0.01, BAL.z+dz); return p2; });
    E.addPart('balanza', [cuerpo, plato, eje, caja, pant, ...btns, ...patas], {pickable:false});
    E.addLabel('balanza', 'Balanza: 0,0 g', [BAL.x, 0.95, BAL.z]);
    /* sensor de presión: sonda sumergible colgada de un soporte universal */
    const acero = K.metal(0xA9B2BA, { rough:0.3 });
    const sx = TK.x + 0.34, sz = TK.z - 0.28, topY = 2.86, st = [];
    const basePl = new THREE.Mesh(K.rbox(0.62, 0.05, 0.4, 0.04, 0.02), K.metal(0x3C4650, { rough:0.5, metal:0.6 })); basePl.position.set(-0.5, 0.025, -0.35); st.push(basePl);
    const varilla = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.1, 12), acero); varilla.position.set(-0.5, 1.57, -0.42); st.push(varilla);
    const brazo = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1, 10), acero); brazo.rotation.z = Math.PI/2; const bx0 = -0.5, bx1 = sx; brazo.scale.y = Math.hypot(bx0-bx1, -0.42-sz); brazo.position.set((bx0+bx1)/2, topY+0.08, (-0.42+sz)/2); brazo.rotation.y = Math.atan2(-(sz+0.42), bx1-bx0); st.push(brazo);
    const nuez = new THREE.Mesh(K.rbox(0.1, 0.1, 0.1, 0.02), K.metal(0x5A646E, { rough:0.45 })); nuez.position.set(-0.5, topY+0.08, -0.42); st.push(nuez);
    const cabeza = new THREE.Mesh(K.rbox(0.36, 0.2, 0.14, 0.04, 0.02), K.plastic(0x2A6FB0, { rough:0.4, coat:0.6 })); cabeza.position.set(sx, topY, sz); st.push(cabeza);
    presLCD = K.lcd({ w:200, h:80, text:'0,0 kPa' });
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.11), presLCD.mat); pl.position.set(sx, topY, sz + 0.072); st.push(pl);
    const varaG = new THREE.CylinderGeometry(0.022, 0.022, 1, 10); varaG.translate(0, 0.5, 0);
    const vara = new THREE.Mesh(varaG, acero);
    const disco = new THREE.Mesh(K.lathe([[0,0],[0.13,0],[0.15,0.02],[0.15,0.05],[0.06,0.07],[0.03,0.09],[0,0.09]], 24), K.plastic(0xE06C4A, { rough:0.35 }));
    E.addPart('soporte', st, {pickable:false});
    E.addPart('manometro', [vara, disco], {pickable:false});
    manoMesh = { vara, disco, x:sx, z:sz, top:topY - 0.1 };
    E.addLabel('manometro', 'Manómetro', [sx, topY + 0.42, sz]);
    /* objetos con sus materiales reales */
    DL_MAT.forEach(o => {
      const m2 = dlPieza(o, low);
      m2.position.set(o.rx, o.ry, REP.z);
      E.addPart(o.id, [m2], { pickable:true });
      E.addLabel(o.id, o.n, [o.rx, o.ry + o.hgt/2 + 0.2, REP.z]);
      mallas[o.id] = m2;
    });
    /* etiquetas siguen a las piezas en movimiento; pantallas y superficie del líquido */
    let nivelPrev = null;
    E.onFrame((t2, dt) => {
      DL_MAT.forEach(o => { const l = E.labels.get(o.id), m2 = mallas[o.id]; if (l && m2) l.pos.set(m2.position.x, m2.position.y + o.hgt/2 + 0.2, m2.position.z); });
      pasoAnimacion(dt);
      const nv = nivelML(); if (nivelPrev !== null && Math.abs(nv - nivelPrev) > 0.5 && suave()) liq3.splash(t2, 0.03); nivelPrev = nv;
      liq3.tick(t2, suave());
      const bt = balTxt.textContent.split(': ')[1] || ''; balLCD.set(bt.indexOf('pesando') >= 0 ? '- - -' : bt);
      if (presA) presLCD.set(presA.textContent.trim());
    });
    sincronizar(true);
  }

  /* pieza con el material que le corresponde (tamaño exacto a partir de su volumen) */
  function dlPieza(o, low){
    const K = cnLabKit, seg = low ? 24 : 40;
    let g, m;
    if (o.id === 'corcho'){ g = new THREE.CylinderGeometry(o.r, o.r, o.hgt, seg); const t = K.tex(K.corkC(), { wrap:true, rep:[2,1] }); m = new THREE.MeshPhysicalMaterial({ map:t, bumpMap:K.tex(K.corkC(), { srgb:false, wrap:true, rep:[2,1] }), bumpScale:0.01, roughness:0.92, clearcoat:0 }); }
    else if (o.id === 'balsa'){ g = K.rbox(o.wid, o.hgt, o.dep, 0.025, 0.018); m = K.wood({ base:[228,208,164], dark:[150,118,74], strips:3, seed:9, coat:0.05, rough:0.8 }); }
    else if (o.id === 'hielo'){ g = K.rbox(o.wid, o.hgt, o.dep, 0.08, 0.06); m = new THREE.MeshPhysicalMaterial({ color:0xDDF1F8, roughness:0.12, clearcoat:1, clearcoatRoughness:0.1, transparent:true, opacity:0.62, envMapIntensity:1.8, bumpMap:K.tex(K.poreC({ base:[180,180,180], pores:0.5, pr:3, seed:7 }), { srgb:false }), bumpScale:0.006 }); }
    else if (o.id === 'pet'){ const pts = []; const n = 14; pts.push([0, -o.hgt/2], [o.r*0.9, -o.hgt/2], [o.r, -o.hgt/2 + 0.02]); for (let i = 1; i < n; i++){ const y = -o.hgt/2 + 0.02 + (o.hgt - 0.04)*i/n; pts.push([o.r*(0.965 + 0.035*Math.cos(i*Math.PI*0.5)), y]); } pts.push([o.r, o.hgt/2 - 0.02], [o.r*0.9, o.hgt/2], [0, o.hgt/2]); g = K.lathe(pts, seg); m = new THREE.MeshPhysicalMaterial({ color:0x86C8E2, roughness:0.08, clearcoat:1, transparent:true, opacity:0.62, envMapIntensity:1.8 }); }
    else if (o.id === 'vidrio'){ g = new THREE.SphereGeometry(o.r, seg, Math.round(seg*0.7)); m = new THREE.MeshPhysicalMaterial({ color:0xC6E9F0, roughness:0.02, clearcoat:1, clearcoatRoughness:0.02, transparent:true, opacity:0.5, envMapIntensity:2.4 }); }
    else if (o.id === 'aluminio'){ g = K.rbox(o.wid, o.hgt, o.dep, 0.035, 0.025); m = K.metal(0xCBD1D8, { rough:0.34, brushed:true, metal:0.9 }); }
    else if (o.id === 'hierro'){ const c = 0.02; g = K.lathe([[0,-o.hgt/2],[o.r-c,-o.hgt/2],[o.r,-o.hgt/2+c],[o.r,o.hgt/2-c],[o.r-c,o.hgt/2],[0,o.hgt/2]], seg); m = new THREE.MeshPhysicalMaterial({ color:0x6A7078, metalness:0.75, roughness:0.46, clearcoat:0.1, map:K.tex(K.speckC({ base:[150,152,156], noise:26, cloud:18, flecks:260, fleck:[150,92,54], seed:8 })) }); }
    else { g = Kit.sculpt({ w:low?28:40, h:low?20:28, radii:[o.r,o.r,o.r], disp:(p,d)=>o.r*0.16*Kit.fbm(d.x*3.1, d.y*3.1, d.z*3.1, 3) }); const pc = K.poreC({ base:[196,190,176], pores:1.8, pr:3.5, seed:12 }); m = new THREE.MeshPhysicalMaterial({ map:K.tex(pc), bumpMap:K.tex(pc, { srgb:false }), bumpScale:0.02, roughness:0.96, clearcoat:0 }); }
    const mesh = new THREE.Mesh(g, m);
    if (o.id === 'vidrio'){ /* canica: aletas de color en su interior */
      const vm = new THREE.MeshPhysicalMaterial({ color:0x1F8FB0, roughness:0.3, clearcoat:0.6, side:THREE.DoubleSide });
      [0, 1, 2].forEach(i => { const f = new THREE.Mesh(new THREE.CircleGeometry(o.r*0.74, 20), vm); f.scale.set(1, 0.34, 1); f.rotation.set(0.5, i*Math.PI/3, 0); mesh.add(f); }); }
    return mesh;
  }

  /* ---- animación: cola de pasos por objeto ---- */
  function irA(id, to, dur, luego){
    const m2 = mallas[id]; if (!m2){ luego && luego(); return; }
    anim[id] = { from:m2.position.clone(), to:new THREE.Vector3(to[0],to[1],to[2]), t:0, dur: suave() ? dur : 0.001, luego };
  }
  function correr(id, pasos){ cola[id] = pasos.slice(); siguiente(id); }
  function siguiente(id){
    const p = cola[id] && cola[id].shift(); if (!p) return;
    if (typeof p === 'function'){ p(); siguiente(id); }
    else if (p.espera !== undefined){ anim[id] = { espera: suave() ? p.espera : 0.01, t:0, luego:()=>siguiente(id) }; }
    else irA(id, p.to, p.dur, ()=>siguiente(id));
  }
  function pasoAnimacion(dt){
    Object.keys(anim).forEach(id => {
      const a = anim[id]; if (!a) return;
      a.t += dt;
      if (a.espera !== undefined){ if (a.t >= a.espera){ delete anim[id]; a.luego && a.luego(); } return; }
      if (!mallas[id]){ delete anim[id]; a.luego && a.luego(); return; }
      const k = Math.min(1, a.t/a.dur), e = k<0.5 ? 2*k*k : 1-Math.pow(-2*k+2,2)/2;
      mallas[id].position.lerpVectors(a.from, a.to, e);
      if (k>=1){ delete anim[id]; a.luego && a.luego(); }
    });
  }

  /* ---- sincronizar la escena con el estado ---- */
  function sincronizar(inmediato){
    const lvl = nivelU();
    if (liq3){ const hg = L.liq==='mercurio'; liq3.setLevel(lvl); liq3.setColor(liq().col, hg ? 0.96 : 0.5, hg); }
    if (manoMesh){ const y = Math.max(0.05, lvl - U(L.prof)); manoMesh.disco.position.set(manoMesh.x, y - 0.045, manoMesh.z); manoMesh.vara.position.set(manoMesh.x, y + 0.04, manoMesh.z); manoMesh.vara.scale.y = Math.max(0.01, manoMesh.top - y - 0.04); }
    DL_MAT.forEach(o => { if (!mallas[o.id]) return; if (inmediato || (!anim[o.id] && !(cola[o.id]||[]).length)) { const p = posDe(o); if (inmediato) mallas[o.id].position.set(p[0],p[1],p[2]); else irA(o.id, p, 0.5); } });
    const ml = nivelML();
    nivelTxt.textContent = `Nivel: ${dl1(Math.min(ml,CAP))} mL de ${liq().n.toLowerCase()}`;
    avisoEl.style.display = derrama() ? 'flex' : 'none';
    if (derrama()) avisoEl.textContent = `Se derramaría: la probeta solo tiene ${CAP} mL. Devuelve alguna pieza a la repisa.`;
    dibujar2D(); actualizarPresion(); renderTabla();
  }

  /* ---------------- alternativa 2D (sin WebGL) ---------------- */
  function crear2D(){
    const box = h('div',{class:'ph',style:'padding:10px'});
    box.append(h('p',{class:'small muted',style:'margin-bottom:8px'},'Tu dispositivo no puede mostrar gráficos 3D. Este esquema en 2D hace exactamente lo mismo: los datos, las mediciones, el cálculo y la tabla son idénticos.'));
    const ns = 'http://www.w3.org/2000/svg';
    const el = document.createElementNS(ns,'svg'); el.setAttribute('viewBox','0 0 640 400'); el.setAttribute('class','dl-svg'); el.setAttribute('role','img'); el.setAttribute('aria-label','Esquema de la mesa de laboratorio con la probeta, la balanza y la repisa de materiales');
    box.append(el); stage.append(box); svg2D = el;
    dibujar2D();
    el.addEventListener('click', e => { const t2 = e.target.closest('[data-id]'); if (t2) elegir(t2.dataset.id, 'esquema'); });
  }
  function dibujar2D(){
    if (!svg2D) return;
    const lvl = Math.min(nivelML(), CAP)/CAP;            // 0..1 de la altura útil
    const TX=40, TY=110, TW=150, TH=250;                 // probeta
    const px = v => TX + v, py = v => TY + v;
    let s = '';
    s += `<rect x="0" y="0" width="640" height="400" fill="var(--bg-2)"/>`;
    s += `<rect x="10" y="360" width="620" height="18" rx="4" fill="var(--line-2)"/>`;
    /* probeta */
    s += `<rect x="${TX}" y="${TY}" width="${TW}" height="${TH}" fill="none" stroke="var(--ink-3)" stroke-width="3"/>`;
    const hAgua = TH*lvl;
    s += `<rect x="${TX+2}" y="${TY+TH-hAgua}" width="${TW-4}" height="${hAgua}" fill="${'#'+liq().col.toString(16).padStart(6,'0')}" opacity="0.55"/>`;
    s += `<line x1="${TX+2}" y1="${TY+TH-hAgua}" x2="${TX+TW-2}" y2="${TY+TH-hAgua}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/>`;
    s += `<text x="${TX+TW+8}" y="${TY+TH-hAgua+4}" font-size="13" fill="var(--ink-2)">${dl1(Math.min(nivelML(),CAP))} mL</text>`;
    s += `<text x="${TX}" y="${TY-10}" font-size="13" font-weight="700" fill="var(--ink)">Probeta · ${liq().n}</text>`;
    /* objetos dentro */
    const dentro = enLiquido();
    dentro.forEach((o,i) => {
      const w = 22 + o.v*0.5, res = resultado(o), f = frac(o);
      const cx = TX + TW/2 + (i-(dentro.length-1)/2)*36;
      const alto = 20 + o.v*0.35;
      let top;
      if (L.ob[o.id].est==='midiendo') top = TY+TH-hAgua + hAgua*0.4;
      else if (res==='hunde') top = TY+TH-alto-3;
      else if (res==='entre') top = TY+TH-hAgua+hAgua*0.45;
      else top = TY+TH-hAgua - alto*(1-f);
      s += `<rect data-id="${o.id}" x="${cx-w/2}" y="${top}" width="${w}" height="${alto}" rx="4" fill="#${o.col.toString(16).padStart(6,'0')}" stroke="var(--ink)" stroke-width="${L.sel===o.id?3:1}"><title>${esc(o.n)} · ${esc(NOMBRE_RES[res])}</title></rect>`;
    });
    /* balanza */
    s += `<rect x="260" y="300" width="130" height="30" rx="6" fill="var(--ink-3)"/><rect x="275" y="288" width="100" height="12" rx="3" fill="var(--line-2)"/>`;
    const B = DL_MAT.find(o=>L.ob[o.id].est==='balanza');
    s += `<rect x="285" y="255" width="80" height="26" rx="4" fill="#0F2A22"/><text x="325" y="273" font-size="15" font-family="monospace" fill="#8FE9BE" text-anchor="middle">${B?dl1(B.m):'0,0'} g</text>`;
    if (B) s += `<rect x="300" y="282" width="50" height="6" rx="3" fill="#${B.col.toString(16).padStart(6,'0')}"/>`;
    s += `<text x="325" y="348" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Balanza digital</text>`;
    /* repisa */
    s += `<rect x="255" y="120" width="370" height="8" rx="3" fill="var(--line-2)"/><text x="255" y="108" font-size="13" font-weight="700" fill="var(--ink)">Repisa de materiales</text>`;
    let ex = 262;
    DL_MAT.forEach(o => {
      if (L.ob[o.id].est!=='estante'){ ex += 44; return; }
      const w = 30, alto = 22 + o.v*0.2;
      s += `<rect data-id="${o.id}" x="${ex}" y="${120-alto}" width="${w}" height="${alto}" rx="4" fill="#${o.col.toString(16).padStart(6,'0')}" stroke="var(--ink)" stroke-width="${L.sel===o.id?3:1}"><title>${esc(o.n)}</title></rect>`;
      ex += 44;
    });
    /* manómetro */
    const my = TY + TH - hAgua + (TH*U(L.prof)/TK.h);
    s += `<line x1="${TX+TW-26}" y1="${TY-6}" x2="${TX+TW-26}" y2="${Math.min(my,TY+TH-4)}" stroke="var(--ink-3)" stroke-width="3"/>`;
    s += `<circle cx="${TX+TW-26}" cy="${Math.min(my,TY+TH-4)}" r="7" fill="var(--bad)"/>`;
    svg2D.innerHTML = s;
  }

  /* ---------------- acciones ---------------- */
  function elegir(id, origen){ if (!DL_M[id]) return; L.sel = id; densInp.value = ''; densFB.style.display = 'none'; if (E) E.select(id); Store.log('laboratorio',{lab:'densidad', accion:'seleccionar', material:id, origen:origen||'panel'}); sincronizar(); renderPanel(); }

  function pesar(){
    const o = sel(), st = L.ob[o.id];
    if (st.est==='midiendo') return toast('Espera a que termine la medición de volumen.');
    const previo = DL_MAT.find(x => x.id!==o.id && L.ob[x.id].est==='balanza');
    if (previo){ L.ob[previo.id].est = 'estante'; const p = posDe(previo); correr(previo.id, [{to:[previo.rx, previo.ry+0.5, previo.z||REP.z], dur:0.35},{to:p, dur:0.35}]); }
    st.est = 'balanza'; st.m = o.m;
    balTxt.textContent = 'Balanza: pesando…';
    const destino = posDe(o);
    correr(o.id, [ {to:[mallas[o.id]?mallas[o.id].position.x:0, 1.9, mallas[o.id]?mallas[o.id].position.z:0], dur:0.4}, {to:[destino[0], 1.9, destino[2]], dur:0.5}, {to:destino, dur:0.5}, ()=>{ balTxt.textContent = `Balanza: ${dl1(o.m)} g`; const lb = E && E.labels.get('balanza'); if (lb) lb.el.textContent = `Balanza: ${dl1(o.m)} g`; toast(`La balanza marca ${dl1(o.m)} g.`); sincronizar(); renderPanel(); } ]);
    Store.log('laboratorio',{lab:'densidad', accion:'pesar', material:o.id, masa:o.m});
    sincronizar(); renderPanel();
  }

  function medirVolumen(){
    const o = sel(), st = L.ob[o.id];
    if (st.est==='midiendo') return;
    if (nivelML() + o.v > CAP) return toast('No cabe: el líquido se derramaría. Devuelve alguna pieza a la repisa.');
    const antes = nivelML();
    st.est = 'midiendo';
    const dentroPos = posDe(o);
    desTxt.textContent = 'Midiendo…';
    correr(o.id, [
      {to:[mallas[o.id]?mallas[o.id].position.x:0, TK.h+0.5, mallas[o.id]?mallas[o.id].position.z:0], dur:0.4},
      {to:[TK.x, TK.h+0.5, TK.z], dur:0.5},
      {to:dentroPos, dur:0.7},
      ()=>{ st.v = o.v; const despues = nivelML();
        desTxt.textContent = `Volumen desplazado: ${dl1(despues-antes)} mL (de ${dl1(antes)} a ${dl1(despues)} mL)`;
        toast(`El nivel subió de ${dl1(antes)} a ${dl1(despues)} mL: el volumen del objeto es ${dl1(o.v)} mL.`);
        Store.log('laboratorio',{lab:'densidad', accion:'medir_volumen', material:o.id, volumen:o.v});
        sincronizar(); renderPanel(); },
      {espera:1.6},
      ()=>{ st.est='estante'; sincronizar(); renderPanel(); },
      {to:[TK.x, TK.h+0.5, TK.z], dur:0.6},
      {to:[o.rx, o.ry+0.35, REP.z], dur:0.5},
      {to:[o.rx, o.ry, REP.z], dur:0.3},
      ()=>{ sincronizar(); renderPanel(); }
    ]);
    sincronizar();
  }

  function soltar(){
    const o = sel(), st = L.ob[o.id];
    if (st.est==='liquido') return toast('Esta pieza ya está en el líquido.');
    if (!st.pred) return toast('Antes de soltar, escribe tu predicción: ¿flota, se hunde o queda entre dos aguas?');
    if (nivelML() + o.v > CAP) return toast('No cabe: el líquido se derramaría. Devuelve alguna pieza a la repisa.');
    st.est = 'liquido';
    const destino = posDe(o);
    correr(o.id, [
      {to:[mallas[o.id]?mallas[o.id].position.x:0, TK.h+0.5, mallas[o.id]?mallas[o.id].position.z:0], dur:0.35},
      {to:[destino[0], TK.h+0.5, destino[2]], dur:0.45},
      {to:[destino[0], destino[1]-0.35, destino[2]], dur:0.55},   // se hunde de más por la inercia
      {to:destino, dur:0.5},
      ()=>{ evaluarPrediccion(o); sincronizar(); renderPanel(); }
    ]);
    sincronizar();
  }

  function devolver(){
    const o = sel(), st = L.ob[o.id];
    if (st.est==='estante') return toast('Esta pieza ya está en la repisa.');
    st.est = 'estante'; st.pred = null;
    if (balTxt.textContent.indexOf(dl1(o.m))>=0){ balTxt.textContent = 'Balanza: 0,0 g'; const lb = E && E.labels.get('balanza'); if (lb) lb.el.textContent = 'Balanza: 0,0 g'; }
    correr(o.id, [{to:[mallas[o.id]?mallas[o.id].position.x:0, TK.h+0.5, mallas[o.id]?mallas[o.id].position.z:0], dur:0.45}, {to:[o.rx, o.ry, REP.z], dur:0.55}, ()=>{ sincronizar(); renderPanel(); }]);
    sincronizar();
  }

  const NOMBRE_RES = { flota:'flota', hunde:'se hunde', entre:'queda entre dos aguas' };
  function evaluarPrediccion(o){
    const st = L.ob[o.id], res = resultado(o), lq = liq(), f = frac(o);
    const acerto = st.pred === res;
    const detalle = res==='flota'
      ? `${dlCap(dlEl(o))} tiene una densidad de ${dl2(o.rho)} g/mL y el líquido ${dl2(lq.rho)} g/mL. Como el objeto es menos denso, flota con el ${Math.round(f*100)} % de su volumen sumergido y el ${Math.round((1-f)*100)} % fuera.`
      : res==='hunde'
        ? `${dlCap(dlEl(o))} tiene ${dl2(o.rho)} g/mL y el líquido ${dl2(lq.rho)} g/mL. Al ser más denso, el empuje no alcanza a sostenerlo y se va al fondo.`
        : `Las densidades son prácticamente iguales (${dl2(o.rho)} g/mL y ${dl2(lq.rho)} g/mL): el objeto queda suspendido, ni sube ni baja. A esto se le dice flotabilidad neutra.`;
    predFB.className = 'notice ' + (acerto ? 'ok' : 'warn');
    predFB.innerHTML = `<span><b>${acerto ? 'Tu predicción se cumplió: ' : 'Tu predicción decía “'+NOMBRE_RES[st.pred]+'”, pero '}</b>${acerto?'':'el resultado es que '}<b>${NOMBRE_RES[res]}</b>. ${esc(detalle)}</span>`;
    predFB.style.display = 'flex';
    L.filas.push({ mat:o.n, id:o.id, m:o.m, v:o.v, rho:o.rho, liq:lq.n, res });
    Store.log('laboratorio',{lab:'densidad', accion:'soltar', material:o.id, liquido:L.liq, prediccion:st.pred, resultado:res, acerto});
    if (o.id==='aluminio' && res!=='hunde' && !L.retoLiq){
      L.retoLiq = true;
      retoSt.className = 'notice ok';
      retoSt.innerHTML = `<span><b>¡Lo encontraste!</b> El aluminio (${dl2(o.rho)} g/mL) flota en ${lq.n.toLowerCase()} (${dl2(lq.rho)} g/mL). No cambió el objeto: cambió con qué lo comparamos. Ahora responde la pregunta para cerrar el reto.</span>`;
      mostrarQuiz();
    }
    renderTabla();
  }

  /* ---------------- panel ---------------- */
  const cardLiq = h('div',{class:'card stack'}), cardObj = h('div',{class:'card stack'}), cardAcc = h('div',{class:'card stack'}), cardDens = h('div',{class:'card stack'}), cardPres = h('div',{class:'card stack'});
  panel.append(cardLiq, cardObj, cardAcc, cardDens, cardPres);
  const predFB = h('div',{class:'notice',style:'display:none'});
  const densFB = h('div',{class:'notice',style:'display:none'});
  const densInp = h('input',{type:'text',inputmode:'decimal',id:'dl-dens',placeholder:'por ejemplo 2,70','aria-label':'Densidad calculada en gramos por mililitro'});
  let presProf = null, presOut = null, presA = null, presB = null;
  function actualizarPresion(){
    if (!presA) return;
    const maxProf = Math.max(1, Math.round(Math.min(nivelML(),CAP)/ML_U*CM_U));
    if (+presProf.max !== maxProf) presProf.max = maxProf;
    const prof = Math.min(L.prof, maxProf);
    presOut.value = dl1(prof)+' cm';
    const p = liq().rho*1000 * 9.8 * (prof/100);
    presA.innerHTML = ''; presA.append(dl1(p/1000), ' ', h('span',{class:'u'},'kPa'));
    presB.innerHTML = ''; presB.append(dl1(p/1000 + 72), ' ', h('span',{class:'u'},'kPa'));
  }

  function renderPanel(){
    /* líquidos */
    cardLiq.innerHTML = '';
    const chips = h('div',{class:'dl-liqs'});
    DL_LIQ.forEach(q => chips.append(h('button',{class:'chip'+(L.liq===q.id?' picked':''),'aria-pressed':L.liq===q.id,'aria-label':`Cambiar a ${q.n}, densidad ${dl2(q.rho)} gramos por mililitro`,onclick:()=>cambiarLiquido(q.id)}, q.n, ' ', h('span',{class:'mono small'},dl2(q.rho)))));
    cardLiq.append(h('span',{class:'eyebrow lab'},'1 · Líquido de la probeta'), chips, h('p',{class:'small muted'}, liq().nota), h('div',{class:'dl-read'},
      h('div',{class:'readout'}, h('div',{class:'v'}, dl2(liq().rho), ' ', h('span',{class:'u'},'g/mL')), h('div',{class:'l'},'Densidad del líquido')),
      h('div',{class:'readout'}, h('div',{class:'v'}, dl1(Math.min(nivelML(),CAP)), ' ', h('span',{class:'u'},'mL')), h('div',{class:'l'},'Nivel actual'))));

    /* objetos */
    cardObj.innerHTML = '';
    const lista = h('div',{class:'dl-objs',role:'group','aria-label':'Objetos disponibles'});
    DL_MAT.forEach(o => {
      const st = L.ob[o.id];
      const etiqueta = st.est==='balanza' ? 'en la balanza' : st.est==='liquido' ? (resultado(o)==='flota'?'flota':resultado(o)==='hunde'?'al fondo':'suspendido') : st.est==='midiendo' ? 'midiendo volumen' : 'en la repisa';
      lista.append(h('button',{class:'dl-obj'+(L.sel===o.id?' picked':''),'aria-pressed':L.sel===o.id,'aria-label':`${o.n}, ${etiqueta}. Seleccionar.`,onclick:()=>elegir(o.id,'lista')},
        h('span',{class:'sw',style:`background:#${o.col.toString(16).padStart(6,'0')}`}), h('span',{}, o.em+' '+o.n, h('span',{class:'st'}, etiqueta))));
    });
    cardObj.append(h('span',{class:'eyebrow lab'},'2 · Elige un objeto'), lista, h('p',{class:'small muted'}, sel().nota));

    /* acciones */
    cardAcc.innerHTML = '';
    const o = sel(), st = L.ob[o.id];
    const pred = h('div',{class:'dl-pred'});
    [['flota','Flotará'],['entre','Quedará entre dos aguas'],['hunde','Se hundirá']].forEach(([k,t]) => pred.append(h('button',{class:'chip'+(st.pred===k?' picked':''),'aria-pressed':st.pred===k,'aria-label':`Predecir que ${t.toLowerCase()}`,onclick:()=>{ st.pred=k; Store.log('laboratorio',{lab:'densidad',accion:'predecir',material:o.id,liquido:L.liq,prediccion:k}); renderPanel(); }}, t)));
    cardAcc.append(h('span',{class:'eyebrow lab'},'3 · Mide y predice'),
      h('div',{class:'row'},
        h('button',{class:'btn sm','aria-label':`Pesar ${dlEl(o)} en la balanza`,onclick:pesar}, '⚖️ Pesar'),
        h('button',{class:'btn sm','aria-label':`Medir el volumen ${dlDel(o)} por desplazamiento de agua`,onclick:medirVolumen}, '💧 Medir volumen'),
        h('button',{class:'btn sm','aria-label':`Devolver ${dlEl(o)} a la repisa`,onclick:devolver}, '↩︎ Devolver')),
      h('div',{class:'dl-read'},
        h('div',{class:'readout'}, h('div',{class:'v'}, st.m===null?'—':dl1(st.m), ' ', h('span',{class:'u'},'g')), h('div',{class:'l'},'Masa medida')),
        h('div',{class:'readout'}, h('div',{class:'v'}, st.v===null?'—':dl1(st.v), ' ', h('span',{class:'u'},'mL')), h('div',{class:'l'},'Volumen medido'))),
      h('p',{class:'small',style:'font-weight:600;margin-top:2px'},'Antes de soltarlo, ¿qué va a pasar en ', liq().n.toLowerCase(), '?'),
      pred,
      h('button',{class:'btn primary sm',style:'align-self:flex-start','aria-label':`Soltar ${dlEl(o)} en el líquido`,onclick:soltar}, '🫳 Soltar en el líquido'),
      predFB);

    /* densidad */
    cardDens.innerHTML = '';
    cardDens.append(h('span',{class:'eyebrow lab'},'4 · Calcula la densidad'),
      h('p',{class:'small muted'},'Densidad = masa dividida para volumen. Escribe el resultado en g/mL con coma decimal; se acepta un margen del 5 %.'),
      h('div',{class:'field'}, h('label',{for:'dl-dens'}, `Densidad ${dlDel(o)} (g/mL)`), densInp),
      h('button',{class:'btn sm',style:'align-self:flex-start','aria-label':'Comprobar la densidad calculada',onclick:comprobarDensidad},'Comprobar'),
      densFB);
    if (L.ob[o.id].dens){ densFB.className='notice ok'; densFB.innerHTML = `<span><b>Correcto.</b> La densidad ${esc(dlDel(o))} es ${dl2(o.rho)} g/mL.</span>`; densFB.style.display='flex'; }

    /* presión */
    cardPres.innerHTML = '';
    const maxProf = Math.max(1, Math.round(Math.min(nivelML(),CAP)/ML_U*CM_U));
    presProf = h('input',{type:'range',min:0,max:maxProf,step:0.5,value:Math.min(L.prof,maxProf),id:'dl-prof','aria-label':'Profundidad del manómetro en centímetros'});
    presOut = h('output',{}, dl1(Math.min(L.prof,maxProf))+' cm');
    presProf.addEventListener('input',()=>{ L.prof = +presProf.value; sincronizar(); });
    presA = h('div',{class:'v'}); presB = h('div',{class:'v'});
    cardPres.append(h('span',{class:'eyebrow lab'},'5 · Presión en el líquido'),
      h('div',{class:'slider'}, h('label',{for:'dl-prof'},'Profundidad del manómetro'), presOut, presProf),
      h('div',{class:'dl-read'},
        h('div',{class:'readout'}, presA, h('div',{class:'l'},'Presión del líquido')),
        h('div',{class:'readout'}, presB, h('div',{class:'l'},'Total con la atmósfera de Quito'))),
      h('p',{class:'dl-hint'},'p = densidad × gravedad × profundidad  ·  g = 9,8 m/s²  ·  atmósfera en Quito ≈ 72 kPa'),
      h('p',{class:'small muted'},'La presión no depende de la forma del recipiente ni de cuánta agua haya: solo de la profundidad y de la densidad del líquido.'));
    actualizarPresion();
  }

  function cambiarLiquido(id){
    if (L.liq===id) return;
    L.liq = id;
    predFB.style.display = 'none';
    Store.log('laboratorio',{lab:'densidad', accion:'cambiar_liquido', liquido:id});
    const reacomoda = enLiquido();
    sincronizar(); renderPanel();
    if (reacomoda.length){
      const resumen = reacomoda.map(o => `${dlEl(o)} ${NOMBRE_RES[resultado(o)]}`).join('; ');
      toast(`En ${DL_L[id].n.toLowerCase()}: ${resumen}.`);
      reacomoda.forEach(o => { if (L.ob[o.id].est!=='liquido') return; const fila = L.filas.find(f2 => f2.id===o.id && f2.liq===DL_L[id].n); if (!fila) L.filas.push({ mat:o.n, id:o.id, m:o.m, v:o.v, rho:o.rho, liq:DL_L[id].n, res:resultado(o) }); });
      const al = reacomoda.find(o=>o.id==='aluminio');
      if (al && resultado(al)!=='hunde' && !L.retoLiq){ L.retoLiq = true; retoSt.className='notice ok'; retoSt.innerHTML = `<span><b>¡Lo encontraste!</b> El aluminio (2,70 g/mL) flota en ${DL_L[id].n.toLowerCase()} (${dl2(DL_L[id].rho)} g/mL). No cambió el objeto: cambió con qué lo comparamos.</span>`; mostrarQuiz(); }
      renderTabla();
    }
  }

  function comprobarDensidad(){
    const o = sel(), st = L.ob[o.id];
    if (st.m===null || st.v===null) return toast('Primero pesa el objeto y mide su volumen.');
    const txt = String(densInp.value).trim().replace(',', '.');
    const d = parseFloat(txt);
    if (!isFinite(d)) { densFB.className='notice warn'; densFB.innerHTML='<span><b>Escribe un número.</b> Por ejemplo 2,70 (con coma decimal).</span>'; densFB.style.display='flex'; return; }
    const ok = st.m/st.v, inv = st.v/st.m;
    L.intentos++;
    const cerca = (a,b) => Math.abs(a-b) <= 0.05*Math.abs(b);
    let clase='warn', msg;
    if (cerca(d, ok)){
      clase='ok'; st.dens = true;
      msg = `<b>Correcto.</b> ${dl1(st.m)} g ÷ ${dl1(st.v)} mL = ${dl2(ok)} g/mL. Esa es la densidad ${esc(dlDel(o))} y no cambia aunque cortes la pieza en dos: es una propiedad del material.`;
      Store.log('laboratorio',{lab:'densidad', accion:'densidad_ok', material:o.id, intentos:L.intentos});
    } else if (cerca(d, inv)){
      msg = `<b>Dividiste al revés.</b> Pusiste volumen ÷ masa (${dl1(st.v)} ÷ ${dl1(st.m)}). La densidad responde “¿cuántos gramos hay en cada mililitro?”, así que va masa ÷ volumen: ${dl1(st.m)} ÷ ${dl1(st.v)}.`;
    } else if (cerca(d, ok*1000)){
      msg = `<b>Ese valor está en otras unidades.</b> ${dl1(ok*1000)} es la densidad en kg/m³. Aquí la balanza da gramos y la probeta mililitros, así que el resultado va en g/mL: divide y quedará ${dl2(ok)}.`;
    } else if (cerca(d, ok/1000)){
      msg = `<b>Te sobró una división entre mil.</b> No hace falta convertir: los datos ya están en g y en mL, así que el resultado sale directo en g/mL (${dl2(ok)}).`;
    } else if (cerca(d, st.m-st.v) && Math.abs(st.m-st.v)>0.5){
      msg = `<b>Restaste en lugar de dividir.</b> La densidad no es “masa menos volumen”: es cuántos gramos caben en cada mililitro, o sea una división.`;
    } else if (cerca(d, st.m)){
      msg = `<b>Ese es el valor de la masa, no de la densidad.</b> Falta dividir esa masa para los ${dl1(st.v)} mL que ocupa.`;
    } else {
      msg = `<b>Revisa la operación.</b> Tienes ${dl1(st.m)} g y ${dl1(st.v)} mL. Haz ${dl1(st.m)} ÷ ${dl1(st.v)} y redondea a dos decimales; recuerda escribirlo con coma decimal.`;
    }
    densFB.className = 'notice '+clase; densFB.innerHTML = '<span>'+msg+'</span>'; densFB.style.display='flex';
    Store.log('laboratorio',{lab:'densidad', accion:'densidad_intento', material:o.id, valor:d, correcto:clase==='ok'});
  }

  /* ---------------- tabla, gráfico y cuaderno ---------------- */
  const tablaWrap = h('div',{class:'tablewrap'});
  const chartWrap = h('div',{class:'card',style:'padding:12px'});
  const chart = h('canvas',{class:'chart',style:'height:260px'});
  chartWrap.append(h('span',{class:'eyebrow lab'},'Masa (g) frente a volumen (mL): cada material es una recta y su pendiente es su densidad'), chart);
  const guardar = h('button',{class:'btn sm',style:'align-self:flex-start','aria-label':'Guardar la tabla de datos en el cuaderno de campo',onclick:()=>{
    if (!L.filas.length) return toast('Todavía no has soltado ninguna pieza en el líquido.');
    const txt = 'Lab densidad y flotación · ' + L.filas.map(f2 => `${f2.mat}: ${dl1(f2.m)} g, ${dl1(f2.v)} mL, ${dl2(f2.rho)} g/mL, en ${f2.liq.toLowerCase()} ${NOMBRE_RES[f2.res]}`).join(' | ');
    Store.addNote('resultado', txt);
    toast('Tabla guardada en tu cuaderno de campo.');
    Store.log('laboratorio',{lab:'densidad', accion:'guardar_tabla', filas:L.filas.length});
  }},'📓 Guardar la tabla en el cuaderno');

  function renderTabla(){
    tablaWrap.innerHTML = '';
    if (!L.filas.length){ tablaWrap.append(h('div',{class:'ph'},'Aún no hay datos. Pesa una pieza, mide su volumen, predice y suéltala: cada ensayo se registra aquí.')); dibujarChart(); return; }
    const t2 = h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'#'), h('th',{},'Material'), h('th',{},'Masa (g)'), h('th',{},'Volumen (mL)'), h('th',{},'Densidad (g/mL)'), h('th',{},'Líquido'), h('th',{},'¿Qué pasó?'))),
      h('tbody',{}, L.filas.map((f2,i) => h('tr',{},
        h('td',{class:'num'}, i+1), h('td',{}, f2.mat),
        h('td',{class:'num'}, f2.m===null?'—':dl1(f2.m)), h('td',{class:'num'}, f2.v===null?'—':dl1(f2.v)),
        h('td',{class:'num'}, h('b',{}, dl2(f2.rho))), h('td',{}, f2.liq),
        h('td',{}, h('span',{class:'pill '+(f2.res==='flota'?'ok':f2.res==='hunde'?'bad':'warn')}, f2.res==='flota'?'▲ flotó':f2.res==='hunde'?'▼ se hundió':'◆ entre dos aguas'))))));
    tablaWrap.append(t2);
    dibujarChart();
  }
  const COLS = ['--lab','--accent','--eco','--gen','--mis','--anat','--cell','--warn'];
  function dibujarChart(){
    const usados = [];
    L.filas.forEach(f2 => { if (f2.m===null || f2.v===null) return; if (!usados.some(u=>u.id===f2.id)) usados.push(f2); });
    const series = usados.map((f2,i) => { const xf = Math.min(60, 100/f2.rho); return { label:f2.mat, color:cssVar(COLS[i%COLS.length])||'#4A90A4', dots:true, pts:[{x:0,y:0},{x:f2.v,y:f2.m},{x:xf,y:f2.rho*xf}].sort((a,b)=>a.x-b.x) }; });
    series.push({ label:'Agua (1,00 g/mL)', color:cssVar('--ink-3')||'#8A8A8A', pts:[{x:0,y:0},{x:60,y:60}] });
    lineChart(chart, { series, xmin:0, xmax:60, ymin:0, ymax:100, xlabel:'volumen (mL)', ylabel:'masa (g)', xfmt:v=>Math.round(v), yfmt:v=>Math.round(v), xticks:6 });
  }

  /* ---------------- reto: pregunta ---------------- */
  let quizPuesto = false;
  function mostrarQuiz(){
    if (quizPuesto) return; quizPuesto = true;
    retoQ.append(quizBlock({
      q:'El mismo bloque de aluminio se hunde en el agua y flota en el mercurio. ¿Por qué?',
      ops:[
        'Porque los metales siempre se hunden en el agua y el mercurio es la única excepción, ya que también es metal',
        'Porque flotar depende de comparar densidades: el aluminio (2,70 g/mL) es más denso que el agua (1,00 g/mL) pero menos denso que el mercurio (13,53 g/mL)',
        'Porque el bloque de aluminio es liviano y el mercurio es un líquido muy pesado que lo empuja hacia arriba'
      ],
      ok:1,
      fb:'Flotar no es una propiedad del objeto: es una relación entre dos densidades. Si la densidad del objeto es menor que la del líquido, flota; si es mayor, se hunde; si son iguales, queda entre dos aguas. Por eso un barco de acero flota: su casco encierra aire y la densidad promedio del conjunto baja por debajo de 1,00 g/mL.',
      wrong:[
        'No es cuestión de ser metal: la piedra pómez no es metal y flota, y el vidrio tampoco lo es y se hunde. Además el aluminio también flota en un líquido no metálico si este fuera más denso que 2,70 g/mL. Lo que decide es la comparación de densidades.',
        'Cuidado con “liviano”: el bloque de aluminio (81,0 g) es más pesado que el trozo de hielo (46,0 g) y aun así el hielo flota en agua y el aluminio no. Lo que importa no es la masa sola, sino cuánta masa hay en cada mililitro.'
      ]
    }, (intentos) => {
      L.retoQuiz = true;
      Store.completeActivity(ACT, { score: intentos===1 ? '1.er intento' : `${intentos} intentos`, attempts: intentos });
      Store.log('laboratorio',{lab:'densidad', accion:'reto_resuelto', intentos});
      retoQ.append(h('div',{class:'notice ok'},'Reto resuelto y guardado en tu progreso. Prueba ahora con el hielo en aceite: las densidades son casi iguales.'));
    }));
  }

  /* ---------------- montaje final ---------------- */
  view.append(h('div',{style:'height:16px'}),
    h('div',{class:'grid g2'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow lab'},'Tabla de datos'), tablaWrap, guardar),
      chartWrap));

  let raf2D = null;
  if (webglOK){ try { crearEscena(); } catch(e){ console.warn('lab densidad 3D', e); if (E){ try{E.dispose();}catch(e2){} } E = null; mallas = {}; } }
  if (!E) {
    crear2D(); sincronizar(true);
    let ult = performance.now();
    const tic = (ahora) => { raf2D = requestAnimationFrame(tic); const dt = Math.min((ahora-ult)/1000, 0.05); ult = ahora; if (!document.hidden) pasoAnimacion(dt); };
    raf2D = requestAnimationFrame(tic);
  }
  renderPanel(); renderTabla();
  if (Store.s.activities[ACT]?.done){ L.retoLiq = true; retoSt.className='notice ok'; retoSt.textContent='Reto resuelto ✓ Puedes repetirlo con otros materiales y líquidos.'; }

  return { unmount(){ if (raf2D) cancelAnimationFrame(raf2D); if (E) { try { E.dispose(); } catch(e){} } E = null; } };
});

})();
</script>
