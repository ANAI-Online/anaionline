<style>
/* ===== Microscopio virtual (prefijo mic-) ===== */
.mic-lay{display:grid;grid-template-columns:1fr 380px;gap:16px;align-items:start}
@media (max-width:980px){ .mic-lay{grid-template-columns:1fr} }
.mic-stage{position:sticky;top:76px;background:#0b0d11;border:1px solid var(--line);border-radius:var(--r-l);overflow:hidden;height:min(76vh,700px);min-height:380px;display:flex}
@media (max-width:980px){ .mic-stage{position:relative;top:0;height:min(64vh,520px)} }
.mic-stage canvas{width:100%;height:100%;display:block;touch-action:none;outline:none;cursor:crosshair}
.mic-stage canvas:focus-visible{outline:2px solid var(--accent);outline-offset:-3px}
.mic-top{position:absolute;top:10px;left:10px;right:10px;display:flex;flex-wrap:wrap;gap:6px;pointer-events:none;z-index:2}
.mic-bot{position:absolute;bottom:10px;left:10px;right:10px;display:flex;flex-wrap:wrap;gap:6px;pointer-events:none;z-index:2}
.mic-tag{background:rgba(10,12,16,.78);color:#eef2f6;border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:4px 10px;font-size:.74rem;font-family:var(--font-m);font-variant-numeric:tabular-nums}
.mic-tag b{color:#fff;font-weight:700}
.mic-tag.warn{background:rgba(120,60,10,.88);border-color:rgba(255,190,120,.45)}
.mic-tag.ok{background:rgba(16,80,50,.85);border-color:rgba(130,230,180,.4)}
.mic-panel{display:flex;flex-direction:column;gap:12px;min-width:0}
.mic-panel .card{padding:14px 16px}
.mic-objs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.mic-obj{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:10px;border:1px solid var(--line-2);background:var(--bg-2);font-weight:700;font-size:.9rem;line-height:1.1}
.mic-obj .u{font-size:.66rem;font-weight:600;color:var(--ink-3)}
.mic-obj[aria-pressed="true"]{background:var(--cell-soft,var(--accent-soft));border-color:var(--cell,var(--accent));color:var(--ink)}
.mic-obj:disabled{opacity:.5}
.mic-knob{display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center}
.mic-knob input[type=range]{width:100%}
.mic-knob .btn{padding:4px 9px;font-size:.85rem}
.mic-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.mic-pad{display:grid;grid-template-columns:repeat(3,36px);grid-template-rows:repeat(3,32px);gap:4px;justify-content:center}
.mic-pad button{border:1px solid var(--line-2);border-radius:8px;background:var(--bg-2);font-size:.85rem;font-weight:700}
.mic-pad button:disabled{visibility:hidden}
.mic-samples{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.mic-samp{display:flex;flex-direction:column;gap:2px;text-align:left;padding:8px 10px;border:1px solid var(--line-2);border-radius:10px;background:var(--bg-2);font-size:.8rem;font-weight:600}
.mic-samp small{font-weight:500;color:var(--ink-3);font-size:.7rem;line-height:1.25}
.mic-samp[aria-pressed="true"]{border-color:var(--cell,var(--accent));background:var(--cell-soft,var(--accent-soft))}
.mic-tabs{display:flex;gap:4px;flex-wrap:wrap}
.mic-tabs button{padding:6px 10px;border-radius:999px;border:1px solid var(--line-2);background:var(--bg-2);font-size:.8rem;font-weight:600}
.mic-tabs button[aria-selected="true"]{background:var(--cell,var(--accent));border-color:var(--cell,var(--accent));color:#fff}
.mic-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}
.mic-list li{display:flex;gap:8px;align-items:flex-start;font-size:.82rem;padding:5px 8px;border-radius:8px;background:var(--bg-2);border:1px solid var(--line)}
.mic-list li.ok{border-color:var(--ok)}
.mic-list li.bad{border-color:var(--bad)}
.mic-mini{font-size:.76rem;color:var(--ink-3);font-family:var(--font-m);font-variant-numeric:tabular-nums}
.mic-legend{display:flex;flex-wrap:wrap;gap:6px}
.mic-legend span{font-size:.72rem;padding:3px 8px;border-radius:999px;border:1px solid var(--line-2);background:var(--bg-2)}
.mic-help{font-size:.78rem;color:var(--ink-3);line-height:1.45}
</style>
<script>
/* =====================================================================
   MICROSCOPIO VIRTUAL · transversal
   Biología BGU (mundo celular, cuerpo humano, biodiversidad) y
   Ciencias Naturales EGB: 8.º U1 · 9.º U2 · 10.º U1
   Todo el contenido del campo visual se dibuja de forma procedimental.
   ===================================================================== */
try {
  if (typeof BIO !== 'undefined' && BIO.activities)
    Object.assign(BIO.activities, { 'reto-microscopio': { t:'Reto: microscopio virtual', unidad:null, peso:0, xp:100 } });
  if (typeof ACT_HREF !== 'undefined') ACT_HREF['reto-microscopio'] = '#/microscopio';
} catch(e){ console.warn('microscopio: registro de actividad', e); }

/* ---------- utilidades numéricas y de azar determinista ---------- */
const micFmt = (v, d=0) => {
  const neg = v < 0; const s = Math.abs(v).toFixed(d); const p = s.split('.');
  return (neg?'−':'') + p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (p[1] ? ','+p[1] : '');
};
function micRng(i, j, k){
  let s = (Math.imul(i|0, 374761393) ^ Math.imul(j|0, 668265263) ^ Math.imul(k|0, 1442695041)) >>> 0;
  return () => { s = (Math.imul(s ^ (s>>>15), 2246822519) + 374761393) >>> 0; return s / 4294967296; };
}
/* recorre la rejilla de celdas visibles */
function micEach(g, sp, fn, spy){
  const sy = spy || sp;
  const i0 = Math.floor(g.x0/sp)-1, i1 = Math.floor(g.x1/sp)+1, j0 = Math.floor(g.y0/sy)-1, j1 = Math.floor(g.y1/sy)+1;
  for (let j=j0; j<=j1; j++) for (let i=i0; i<=i1; i++) fn(i, j);
}
/* recorre las 9 celdas alrededor de un punto (para saber qué hay bajo el cursor) */
function micNear(x, y, sp, fn, spy){
  const i0 = Math.floor(x/sp), j0 = Math.floor(y/(spy || sp));
  for (let j=j0-1; j<=j0+1; j++) for (let i=i0-1; i<=i0+1; i++) fn(i, j);
}
/* nivel de detalle: agranda la rejilla cuando cada celda mediría menos de ~2 px */
function micLod(g, sp){ const k = Math.max(1, Math.ceil(2.2/(sp*g.s))); return sp*k; }
function micEll(c, x, y, rx, ry, rot, fill, stroke, lw){
  c.beginPath(); c.ellipse(x, y, Math.max(rx,0.01), Math.max(ry,0.01), rot||0, 0, Math.PI*2);
  if (fill){ c.fillStyle = fill; c.fill(); }
  if (stroke){ c.strokeStyle = stroke; c.lineWidth = lw||1; c.stroke(); }
}
function micBlob(c, x, y, r, n, rng, wob){
  const pts = [];
  for (let a=0; a<n; a++){ const th = a/n*Math.PI*2, rr = r*(1 + (rng(a)-0.5)*wob);
    pts.push([x + Math.cos(th)*rr, y + Math.sin(th)*rr]); }
  /* contorno suave: curvas cuadráticas por los puntos medios */
  const mid = (a,b) => [(a[0]+b[0])/2, (a[1]+b[1])/2];
  c.beginPath(); let m0 = mid(pts[n-1], pts[0]); c.moveTo(m0[0], m0[1]);
  for (let a=0; a<n; a++){ const p = pts[a], m = mid(p, pts[(a+1)%n]); c.quadraticCurveTo(p[0], p[1], m[0], m[1]); }
  c.closePath();
}
function micRect(c, x, y, w, hg, r){
  const rr = Math.min(r, w/2, hg/2);
  c.beginPath(); c.moveTo(x+rr,y); c.lineTo(x+w-rr,y); c.quadraticCurveTo(x+w,y,x+w,y+rr); c.lineTo(x+w,y+hg-rr);
  c.quadraticCurveTo(x+w,y+hg,x+w-rr,y+hg); c.lineTo(x+rr,y+hg); c.quadraticCurveTo(x,y+hg,x,y+hg-rr); c.lineTo(x,y+rr);
  c.quadraticCurveTo(x,y,x+rr,y); c.closePath();
}

/* =====================================================================
   v1.7 · TEXTURAS EN CACHÉ, SPRITES Y ÓPTICA DEL CAMPO
   Todo lo que se repite (núcleos, glóbulos, cloroplastos, gránulos,
   manchas de tinción, grano) se pinta una sola vez por tamaño y se
   reutiliza con drawImage o como patrón. El desenfoque se calcula a baja
   resolución (es borroso por definición), con halo y pérdida de contraste.
   ===================================================================== */
const MIC_LOW = () => (typeof lowEnd === 'function') && lowEnd();
const MIC_BG = [241,239,233,1];               /* luz del condensador (halógena, apenas cálida) */
const MIC_CACHE = new Map();
function micCache(key, w, hg, paint){
  let cv = MIC_CACHE.get(key); if (cv) return cv;
  if (MIC_CACHE.size > 420) MIC_CACHE.clear();
  cv = document.createElement('canvas'); cv.width = Math.max(1, Math.ceil(w)); cv.height = Math.max(1, Math.ceil(hg));
  const c = cv.getContext('2d'); try { paint(c, cv.width, cv.height); } catch(e){ console.warn('microscopio: textura', key, e); }
  MIC_CACHE.set(key, cv); return cv;
}
/* ---------- color ---------- */
const MIC_COLC = {};
function micC(s){
  if (Array.isArray(s)) return s; let v = MIC_COLC[s]; if (v) return v; let m;
  if (s && s[0] === '#'){ let hx = s.slice(1); if (hx.length === 3) hx = hx.split('').map(ch => ch+ch).join('');
    v = [parseInt(hx.slice(0,2),16), parseInt(hx.slice(2,4),16), parseInt(hx.slice(4,6),16), 1]; }
  else if (s && (m = s.match(/rgba?\(([^)]+)\)/))){ const p = m[1].split(',').map(Number); v = [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
  else v = [128,128,128,1];
  return (MIC_COLC[s] = v);
}
function micMix(a, b, t){ a = micC(a); b = micC(b); return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t, a[3]+(b[3]-a[3])*t]; }
function micCss(col, al){ const c = micC(col); return `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${al == null ? c[3] : al})`; }
function micShade(col, k){ const c = micC(col); return k > 0 ? micMix(c, [255,255,255,c[3]], k) : micMix(c, [0,0,0,c[3]], -k); }
function micOver(col, bg){ const c = micC(col), b = micC(bg || MIC_BG); return [b[0]+(c[0]-b[0])*c[3], b[1]+(c[1]-b[1])*c[3], b[2]+(c[2]-b[2])*c[3], 1]; }
/* paleta opaca de una tinción, calculada sobre la luz del fondo */
const MIC_PALC = {};
function micPal(T){
  const k = T.n; if (MIC_PALC[k]) return MIC_PALC[k];
  return (MIC_PALC[k] = { nuc:micOver(T.nuc), nucV:micOver(T.nucV || T.nuc), pared:micOver(T.pared), cito:micOver(T.cito),
    det:micOver(T.det), mem:micOver(T.mem), citoA:micC(T.cito) });
}
function micGrad(c, x0, y0, r0, x1, y1, r1, stops){
  const g = c.createRadialGradient(x0, y0, r0, x1, y1, r1);
  stops.forEach(s => g.addColorStop(s[0], typeof s[1] === 'string' ? s[1] : micCss(s[1], s[2]))); return g;
}
function micPoly(c, pts, r){
  const n = pts.length; c.beginPath();
  const m0 = [(pts[n-1][0]+pts[0][0])/2, (pts[n-1][1]+pts[0][1])/2]; c.moveTo(m0[0], m0[1]);
  for (let k=0;k<n;k++){ const p = pts[k], q = pts[(k+1)%n]; c.arcTo(p[0], p[1], (p[0]+q[0])/2, (p[1]+q[1])/2, r); }
  c.closePath();
}
/* ---------- sprites: se pintan una vez por tamaño en píxeles ---------- */
function micQ(px, lo, hi){ return Math.min(hi, Math.max(lo, Math.round(Math.pow(2, Math.round(Math.log2(Math.max(px,1))*3)/3)))); }
/* paint(c, r, rng, px1): dibuja centrado en 0,0 con radio r en µm; px1 = µm por píxel del sprite */
function micSpr(g, kind, v, diam, paint, pad){
  pad = pad || 1.3;
  const q = micQ(diam*pad*g.s*g.dpr, 6, g.low ? 256 : 420);
  return micCache('s|'+kind+'|'+v+'|'+q+'|'+(g.tk||''), q, q, (c, w) => {
    const k = w/(diam*pad); c.translate(w/2, w/2); c.scale(k, k); paint(c, diam/2, micRng(v+1, 0, 7), 1/k); });
}
function micPut(c, spr, x, y, dw, dh, rot, pad){
  pad = pad || 1.3; const w = dw*pad, hh = (dh || dw)*pad;
  if (rot){ c.save(); c.translate(x, y); c.rotate(rot); c.drawImage(spr, -w/2, -hh/2, w, hh); c.restore(); }
  else c.drawImage(spr, x-w/2, y-hh/2, w, hh);
}
/* igual que micPut con giro, pero sin save/restore: para dibujar cientos de sprites por cuadro */
function micPutRot(c, M, spr, x, y, dw, dh, rot, pad){
  pad = pad || 1.3; const w = dw*pad, hh = (dh || dw)*pad, co = Math.cos(rot), si = Math.sin(rot);
  c.setTransform(M.a*co + M.c*si, M.b*co + M.d*si, -M.a*si + M.c*co, -M.b*si + M.d*co, M.a*x + M.c*y + M.e, M.b*x + M.d*y + M.f);
  c.drawImage(spr, -w/2, -hh/2, w, hh);
}
/* ---------- patrones en coordenadas del mundo (µm) ---------- */
function micPat(c, g, key, world, paint){
  const q = micQ(world*g.s*g.dpr, 8, g.low ? 512 : 1024);
  const tile = micCache('p|'+key+'|'+q+'|'+(g.tk||''), q, q, (tc, w) => { const k = w/world; tc.scale(k, k); paint(tc, world, 1/k); });
  let p = null; try { p = c.createPattern(tile, 'repeat'); p.setTransform(new DOMMatrix([world/q,0,0,world/q,0,0])); } catch(e){ return null; }
  return p;
}
/* dibuja fn(x,y) y sus copias al otro lado del borde para que el mosaico no tenga costuras */
function micWrap(world, x, y, r, fn){
  for (let dy=-1; dy<=1; dy++) for (let dx=-1; dx<=1; dx++){
    const xx = x+dx*world, yy = y+dy*world;
    if (xx+r < 0 || xx-r > world || yy+r < 0 || yy-r > world) continue; fn(xx, yy); }
}
/* ruido de valor periódico (0..1) */
function micNoise(n, per, seed, oct){
  const rnd = micRng(seed, per, 5), L = [];
  for (let o=0;o<oct;o++){ const P = per<<o, a = new Float32Array(P*P); for (let i=0;i<P*P;i++) a[i] = rnd(); L.push([P, a]); }
  const out = new Float32Array(n*n); let tot = 0;
  for (let o=0;o<oct;o++){ const P = L[o][0], a = L[o][1], amp = Math.pow(0.5, o); tot += amp;
    for (let y=0;y<n;y++){ const fy = y/n*P, y0 = Math.floor(fy), ty = fy-y0, sy = ty*ty*(3-2*ty), y1 = (y0+1)%P;
      for (let x=0;x<n;x++){ const fx = x/n*P, x0 = Math.floor(fx), tx = fx-x0, sx = tx*tx*(3-2*tx), x1 = (x0+1)%P;
        out[y*n+x] += amp*((a[y0*P+x0]*(1-sx)+a[y0*P+x1]*sx)*(1-sy) + (a[y1*P+x0]*(1-sx)+a[y1*P+x1]*sx)*sy); } } }
  for (let i=0;i<n*n;i++) out[i] /= tot; return out;
}
/* manchas amplias de tinción o de grosor del preparado (sobreviven al desenfoque) */
function micBlotch(c, g, seed, col, alpha, world){
  const cc = micC(col);
  const tile = micCache('b|'+seed+'|'+cc.join(','), 128, 128, (tc) => {
    const nz = micNoise(128, 5, seed, 3), id = tc.createImageData(128, 128);
    for (let i=0;i<128*128;i++){ const v = Math.max(0, Math.min(1, (nz[i]-0.32)*1.9));
      id.data[i*4] = cc[0]; id.data[i*4+1] = cc[1]; id.data[i*4+2] = cc[2]; id.data[i*4+3] = Math.round(255*v*v); }
    tc.putImageData(id, 0, 0); });
  let p = null; try { p = c.createPattern(tile, 'repeat'); p.setTransform(new DOMMatrix([world/128,0,0,world/128,seed*37%world,seed*53%world])); } catch(e){ return; }
  c.save(); c.globalAlpha = alpha; c.fillStyle = p; c.fillRect(g.x0, g.y0, g.x1-g.x0, g.y1-g.y0); c.restore();
}
/* gránulos finos (citoplasma, sustancia de Nissl…) como patrón */
function micGranPat(c, g, key, world, n, rmin, rmax, col, alMin, alMax){
  return micPat(c, g, key, world, (tc, w) => { const r = micRng(n, Math.round(world*10), 3);
    for (let k=0;k<n;k++){ const x = r()*w, y = r()*w, rr = rmin + (rmax-rmin)*r(), al = alMin + (alMax-alMin)*r();
      tc.fillStyle = micCss(col, al); micWrap(w, x, y, rr, (xx, yy) => { tc.beginPath(); tc.arc(xx, yy, rr, 0, Math.PI*2); tc.fill(); }); } });
}
/* restos del preparado: fibras y motas sueltas, dan pistas de foco a cualquier aumento */
function micRestos(c, g, seed, col, dens){
  const sp = 620;
  micEach(g, sp, (i,j) => { const r = micRng(i,j,seed); if (r() > (dens || 0.3)) return;
    const x = (i+r())*sp, y = (j+r())*sp, al = 0.22 + 0.25*r();
    if (r() < 0.5){ const L = 40 + 110*r(), a0 = r()*6.28, bend = (r()-0.5)*L*0.6, w = 1.4 + 2.4*r();
      c.strokeStyle = micCss(col, al); c.lineWidth = w; c.lineCap = 'round';
      c.beginPath(); c.moveTo(x, y);
      c.quadraticCurveTo(x+Math.cos(a0)*L/2 - Math.sin(a0)*bend, y+Math.sin(a0)*L/2 + Math.cos(a0)*bend, x+Math.cos(a0)*L, y+Math.sin(a0)*L); c.stroke(); }
    else { const n = 3 + Math.floor(r()*5);
      for (let k=0;k<n;k++) micEll(c, x+(r()-0.5)*26, y+(r()-0.5)*26, 1.2+3*r(), 1+2.4*r(), r()*3, micCss(col, al)); }
  });
}

/* ---------- pintores de células (compartidos con las misiones) ---------- */
/* glóbulo rojo bicóncavo: borde con más hemoglobina, centro pálido */
function micPaintRBC(c, r, rng, px, st){
  const ex = 1 + (rng()-0.5)*0.09; c.save(); c.scale(ex, 1/ex);
  const rim = st.rim, mid = st.mid, ctr = st.ctr, pal = st.pal;
  c.beginPath(); c.arc(0, 0, r, 0, Math.PI*2);
  c.fillStyle = micGrad(c, 0, 0, 0, 0, 0, r, [[0, ctr], [pal*0.72, ctr], [pal, micMix(ctr, mid, 0.6)], [Math.min(0.88, pal+0.28), rim], [0.95, rim], [1, micMix(rim, ctr, 0.3)]]);
  c.fill();
  c.lineWidth = Math.max(px*1.1, r*0.07); c.strokeStyle = micCss(micShade(rim, -0.28), 0.55); c.stroke();
  c.fillStyle = micGrad(c, -r*0.42, -r*0.46, 0, -r*0.42, -r*0.46, r*0.6, [[0, 'rgba(255,255,255,.12)'], [1, 'rgba(255,255,255,0)']]); c.fill();
  c.restore();
}
const MIC_RBC = {
  normal:{ rim:[204,110,114,1], mid:[222,150,148,1], ctr:[244,218,212,1], pal:0.46 },
  hipo:  { rim:[214,138,138,1], mid:[232,184,180,1], ctr:[249,234,230,1], pal:0.64 },
  plano: { rim:[210,124,126,1], mid:[222,150,150,1], ctr:[236,188,184,1], pal:0.3 }
};
function micRBC(c, g, x, y, rad, v, tipo){
  const st = MIC_RBC[tipo || 'normal'];
  const spr = micSpr(g, 'rbc-'+(tipo||'normal'), v & 7, rad*2, (cc, r, rng, px) => micPaintRBC(cc, r, rng, px, st), 1.18);
  micPut(c, spr, x, y, rad*2, rad*2, 0, 1.18);
}
/* núcleo con cromatina granular y nucléolo(s) */
function micPaintNuc(c, r, rng, px, col, o){
  o = o || {};
  const base = micC(col), dark = micShade(base, -0.28), lite = micMix(base, o.claro || [255,250,240,1], o.aclara == null ? 0.3 : o.aclara);
  c.beginPath(); c.arc(0, 0, r, 0, Math.PI*2);
  c.fillStyle = micGrad(c, -r*0.2, -r*0.25, 0, 0, 0, r, [[0, lite], [0.6, base], [1, dark]]); c.fill();
  c.save(); c.clip();
  const n = o.gran || 38;
  for (let k=0;k<n;k++){ const a = rng()*6.283, d = r*Math.sqrt(rng())*0.95, rr = r*(0.04 + 0.06*rng());
    c.fillStyle = rng() < 0.62 ? micCss(dark, 0.35 + 0.3*rng()) : micCss(lite, 0.35);
    c.beginPath(); c.arc(Math.cos(a)*d, Math.sin(a)*d, rr, 0, Math.PI*2); c.fill(); }
  c.restore();
  c.lineWidth = Math.max(px, r*0.06); c.strokeStyle = micCss(micShade(base, -0.4), 0.7); c.stroke();
  const nn = o.nucleolos || 0;
  for (let k=0;k<nn;k++){ const nx = k === 0 ? r*0.2 : -r*0.3, ny = k === 0 ? -r*0.15 : r*0.25, nr = r*(k === 0 ? 0.26 : 0.17);
    c.beginPath(); c.arc(nx, ny, nr, 0, Math.PI*2);
    c.fillStyle = micGrad(c, nx-nr*0.3, ny-nr*0.3, 0, nx, ny, nr, [[0, micShade(base, -0.2)], [1, micShade(base, -0.55)]]); c.fill();
    c.beginPath(); c.arc(nx-nr*0.35, ny-nr*0.35, nr*0.28, 0, Math.PI*2); c.fillStyle = 'rgba(255,255,255,.28)'; c.fill(); }
}
/* leucocitos teñidos: el núcleo toma el colorante (violeta con azul de metileno) */
function micPaintLeuco(c, r, rng, px, P, tipo){
  const nuc = P.nucV, nd = micShade(nuc, -0.25), nl = micShade(nuc, 0.22);
  const cyto = tipo === 'linfo' ? [160,190,232,1] : tipo === 'mono' ? [190,196,222,1] : [222,204,228,1];
  const cy = micMix(cyto, P.cito, 0.25);
  /* citoplasma */
  c.beginPath(); c.arc(0, 0, r, 0, Math.PI*2);
  c.fillStyle = micGrad(c, -r*0.2, -r*0.2, 0, 0, 0, r, [[0, micShade(cy, 0.2)], [0.8, cy], [1, micShade(cy, -0.08)]]); c.fill();
  c.lineWidth = Math.max(px, r*0.05); c.strokeStyle = micCss(micShade(cy, -0.35), 0.55); c.stroke();
  if (tipo === 'neutro' || tipo === 'banda'){ c.save(); c.clip();
    for (let k=0;k<70;k++){ const a = rng()*6.283, d = r*Math.sqrt(rng())*0.95;
      c.fillStyle = `rgba(${170+Math.round(40*rng())},120,170,${0.25+0.3*rng()})`; c.beginPath(); c.arc(Math.cos(a)*d, Math.sin(a)*d, r*0.035, 0, Math.PI*2); c.fill(); }
    c.restore(); }
  if (tipo === 'mono'){ for (let k=0;k<5;k++){ const a = rng()*6.283, d = r*(0.55+0.3*rng());
    c.beginPath(); c.arc(Math.cos(a)*d, Math.sin(a)*d, r*(0.05+0.05*rng()), 0, Math.PI*2); c.fillStyle = 'rgba(255,255,255,.7)'; c.fill(); } }
  const lob = (x, y, rx, ry, rot) => { c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, Math.PI*2);
    c.fillStyle = micGrad(c, x-rx*0.3, y-ry*0.3, 0, x, y, Math.max(rx, ry), [[0, nl], [0.55, nuc], [1, nd]]); c.fill(); };
  const chrom = (x, y, rr, n) => { for (let k=0;k<n;k++){ const a = rng()*6.283, d = rr*Math.sqrt(rng());
    c.fillStyle = micCss(micShade(nuc, -0.45), 0.25 + 0.3*rng()); c.beginPath(); c.arc(x+Math.cos(a)*d, y+Math.sin(a)*d, rr*(0.08+0.1*rng()), 0, Math.PI*2); c.fill(); } };
  if (tipo === 'neutro'){ /* 3 a 5 lóbulos unidos por hebras finas de cromatina */
    const n = 3 + (rng() < 0.45 ? 1 : 0) + (rng() < 0.12 ? 1 : 0), a0 = rng()*6.283, pts = [];
    for (let k=0;k<n;k++){ const a = a0 + k*(4.4/n) + (rng()-0.5)*0.3, d = r*(0.36 + 0.1*rng()); pts.push([Math.cos(a)*d, Math.sin(a)*d, a]); }
    c.strokeStyle = micCss(nuc, 0.95); c.lineWidth = r*0.08; c.lineCap = 'round';
    c.beginPath(); pts.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
    pts.forEach(p => { lob(p[0], p[1], r*(0.25+0.06*rng()), r*(0.2+0.05*rng()), p[2]); chrom(p[0], p[1], r*0.22, 7); });
  } else if (tipo === 'banda'){ /* núcleo en banda: herradura sin lobular */
    const a0 = rng()*6.283; c.lineCap = 'round';
    c.strokeStyle = micCss(nd, 1); c.lineWidth = r*0.46; c.beginPath(); c.arc(0, 0, r*0.5, a0, a0 + Math.PI*1.45); c.stroke();
    c.strokeStyle = micCss(nuc, 1); c.lineWidth = r*0.36; c.stroke();
    c.strokeStyle = micCss(nl, 0.5); c.lineWidth = r*0.12; c.beginPath(); c.arc(-r*0.03, -r*0.03, r*0.5, a0+0.2, a0 + Math.PI*1.3); c.stroke();
    for (let k=0;k<14;k++){ const a = a0 + rng()*Math.PI*1.45; chrom(Math.cos(a)*r*0.5, Math.sin(a)*r*0.5, r*0.12, 1); }
  } else if (tipo === 'linfo'){ /* núcleo redondo, denso, casi llena la célula */
    const ox = (rng()-0.5)*r*0.16, oy = (rng()-0.5)*r*0.16;
    lob(ox, oy, r*0.8, r*0.77, rng()*3); chrom(ox, oy, r*0.72, 30);
  } else { /* monocito: núcleo arriñonado, cromatina laxa */
    const a0 = rng()*6.283, pts = [];
    for (let k=0;k<28;k++){ const th = k/28*6.283, dd = Math.abs(((th - a0 + 9.42) % 6.283) - 3.14);
      const rr = r*0.6*(1 - 0.42*Math.exp(-(dd*dd)/0.35)); pts.push([Math.cos(th)*rr*1.08 + Math.cos(a0)*r*0.08, Math.sin(th)*rr*0.9 + Math.sin(a0)*r*0.08]); }
    c.beginPath(); pts.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath();
    const lm = micShade(nuc, 0.12);
    c.fillStyle = micGrad(c, 0, 0, 0, 0, 0, r*0.7, [[0, micShade(lm, 0.15)], [1, lm]]); c.fill();
    chrom(0, 0, r*0.55, 26);
  }
}
const MIC_LEU_R = { neutro:6.5, banda:6.4, linfo:4.8, mono:8.4 };
function micLeuco(c, g, x, y, tipo, v, rad){
  const P = micPal(g.tin), rr = rad || MIC_LEU_R[tipo];
  const spr = micSpr(g, 'leu-'+tipo, v & 7, rr*2, (cc, r, rng, px) => micPaintLeuco(cc, r, rng, px, P, tipo));
  micPut(c, spr, x, y, rr*2, rr*2, 0);
}
function micPlaq(c, g, x, y, v, rot){
  const P = micPal(g.tin);
  const spr = micSpr(g, 'plaq', v & 5, 3.2, (cc, r, rng, px) => {
    micBlob(cc, 0, 0, r*0.85, 9, () => rng(), 0.5); cc.fillStyle = micCss(micMix([214,196,232,1], P.nucV, 0.15), 0.9); cc.fill();
    for (let k=0;k<7;k++){ const a = rng()*6.283, d = r*0.35*rng(); cc.beginPath(); cc.arc(Math.cos(a)*d, Math.sin(a)*d, r*0.14, 0, Math.PI*2);
      cc.fillStyle = micCss(micShade(P.nucV, -0.1), 0.85); cc.fill(); } });
  micPut(c, spr, x, y, 3.2, 3.2, rot);
}
/* película de sangre vista con poco aumento: glóbulos diminutos y apretados, grosor desigual */
function micFilm(c, g, key, sp, rad, col, extra){
  const p = micPat(c, g, 'film-'+key, sp*24, (tc, w) => { const r = micRng(sp*7, rad*10, 13), n = 24*24;
    for (let k=0;k<n;k++){ const x = r()*w, y = r()*w, rr = rad*(0.9+0.2*r()), al = 0.28 + 0.3*r();
      tc.fillStyle = micCss(col, al); micWrap(w, x, y, rr, (xx, yy) => { tc.beginPath(); tc.arc(xx, yy, rr, 0, Math.PI*2); tc.fill(); }); } });
  c.fillStyle = micCss(col, extra == null ? 0.16 : extra); c.fillRect(g.x0, g.y0, g.x1-g.x0, g.y1-g.y0);
  if (p){ c.fillStyle = p; c.fillRect(g.x0, g.y0, g.x1-g.x0, g.y1-g.y0); }
  micBlotch(c, g, 71, micShade(col, -0.05), 0.22, 4600);
}

/* ---------- óptica: desenfoque con halo, luz, contraste, grano y viñeteado ---------- */
const MIC_TMP = {};
function micTmp(k, w, hg){ let cv = MIC_TMP[k]; if (!cv) cv = MIC_TMP[k] = document.createElement('canvas');
  if (cv.width !== w || cv.height !== hg){ cv.width = w; cv.height = hg; } return cv; }
let MIC_FA = null, MIC_FB = null, MIC_FT = null;
/* desenfoque de caja separable (n canales intercalados), con bordes replicados */
function micBox(a, t, w, hg, r, n){
  const iw = 1/(2*r+1), Wn = w*n;
  for (let y=0;y<hg;y++){ const row = y*Wn;
    for (let ch=0;ch<n;ch++){ let s = 0;
      for (let k=-r;k<=r;k++) s += a[row + Math.min(w-1, Math.max(0,k))*n + ch];
      for (let x=0;x<w;x++){ t[row+x*n+ch] = s*iw; s += a[row + Math.min(w-1, x+r+1)*n + ch] - a[row + Math.max(0, x-r)*n + ch]; } } }
  for (let x=0;x<w;x++){ for (let ch=0;ch<n;ch++){ const col = x*n+ch; let s = 0;
      for (let k=-r;k<=r;k++) s += t[Math.min(hg-1, Math.max(0,k))*Wn + col];
      for (let y=0;y<hg;y++){ a[y*Wn+col] = s*iw; s += t[Math.min(hg-1, y+r+1)*Wn + col] - t[Math.max(0, y-r)*Wn + col]; } } }
}
function micBufs(n){ if (!MIC_FA || MIC_FA.length < n){ MIC_FA = new Float32Array(n); MIC_FB = new Float32Array(n); MIC_FT = new Float32Array(n); } }
const MIC_FILTRO = (() => { try { return typeof CanvasRenderingContext2D !== 'undefined' && 'filter' in CanvasRenderingContext2D.prototype; } catch(e){ return false; } })();
/* copia reducida del campo (para cálculos a baja resolución) */
function micReduce(src, W, H, R, dpr, k, key){
  const cx = W/2, cy = H/2, Rb = R*1.12, side = Math.max(16, Math.round(2*Rb*k));
  const sm = micTmp(key, side, side), sc = sm.getContext('2d');
  sc.imageSmoothingEnabled = true; try { sc.imageSmoothingQuality = 'high'; } catch(e){}
  sc.clearRect(0, 0, side, side);
  sc.drawImage(src, Math.round((cx-Rb)*dpr), Math.round((cy-Rb)*dpr), Math.round(2*Rb*dpr), Math.round(2*Rb*dpr), 0, 0, side, side);
  return { sm, sc, side, Rb };
}
/* halo del desenfoque: diferencia de dos desenfoques (luminancia) calculada a baja resolución;
   la parte positiva aclara ('lighter') y la negativa oscurece ('multiply') */
function micHalo(c, src, W, H, R, dpr, blur, h){
  const kh = clamp(1.6/blur, 0.07, 0.3), q = micReduce(src, W, H, R, dpr, kh, 'hl'), side = q.side, n = side*side;
  const id = q.sc.getImageData(0, 0, side, side), d = id.data; micBufs(n*3);
  const A = MIC_FA, B = MIC_FB, T = MIC_FT;
  for (let i=0;i<n;i++) A[i] = 0.3*d[i*4] + 0.59*d[i*4+1] + 0.11*d[i*4+2];
  const r1 = Math.max(1, Math.round(blur*kh*0.62)), r2 = Math.max(r1+1, Math.round(r1*1.8));
  micBox(A, T, side, side, r1, 1); micBox(A, T, side, side, r1, 1);
  for (let i=0;i<n;i++) B[i] = A[i];
  micBox(B, T, side, side, r2, 1); micBox(B, T, side, side, r2, 1);
  const pos = q.sc.createImageData(side, side), neg = micTmp('hn', side, side).getContext('2d').createImageData(side, side), p = pos.data, m = neg.data;
  for (let i=0;i<n;i++){ const D = h*(A[i] - B[i]), j = i*4;
    const dp = D > 0 ? Math.min(255, D) : 0, dn = D < 0 ? Math.min(255, -D) : 0;
    p[j] = p[j+1] = p[j+2] = dp; p[j+3] = 255; m[j] = m[j+1] = m[j+2] = 255 - dn; m[j+3] = 255; }
  q.sc.putImageData(pos, 0, 0); const nc = micTmp('hn', side, side), ncx = nc.getContext('2d'); ncx.putImageData(neg, 0, 0);
  const cx = W/2, cy = H/2, Rb = q.Rb;
  c.save(); c.beginPath(); c.arc(cx, cy, R+2, 0, Math.PI*2); c.clip(); c.imageSmoothingEnabled = true;
  c.globalCompositeOperation = 'lighter'; c.drawImage(q.sm, 0, 0, side, side, cx-Rb, cy-Rb, 2*Rb, 2*Rb);
  c.globalCompositeOperation = 'multiply'; c.drawImage(nc, 0, 0, side, side, cx-Rb, cy-Rb, 2*Rb, 2*Rb);
  c.restore();
}
/* marco del ocular precalculado: interior oscuro del tubo, borde suave del diafragma de campo,
   viñeteado, aberración cromática leve y grano. Una sola capa por tamaño: un drawImage por cuadro. */
const MIC_MARCO = [];     /* pocas entradas: son lienzos del tamaño del escenario */
function micMarco(W, H, R){
  const w = Math.max(1, Math.round(W)), hh = Math.max(1, Math.round(H)), key = w+'|'+hh+'|'+R.toFixed(1);
  const hit = MIC_MARCO.find(m => m.key === key); if (hit) return hit.cv;
  const cv = document.createElement('canvas'); cv.width = w; cv.height = hh;
  MIC_MARCO.unshift({ key, cv }); if (MIC_MARCO.length > 3) MIC_MARCO.length = 3;
  const c = cv.getContext('2d');
  { 
    const id = c.createImageData(w, hh), d = id.data, cx = W/2, cy = H/2, Rf = Math.max(W, H)*0.75, rnd = micRng(w, hh, 9);
    const sIn = [25,28,34], sOut = [7,8,10], e0 = R-2.6, e1 = R+0.6;
    for (let y=0;y<hh;y++) for (let x=0;x<w;x++){
      const rr = Math.hypot(x+0.5-cx, y+0.5-cy), j = (y*w+x)*4;
      /* tubo oscuro */
      const tt = clamp((rr-R)/(Rf-R), 0, 1), sr = sIn[0]+(sOut[0]-sIn[0])*tt, sg = sIn[1]+(sOut[1]-sIn[1])*tt, sb = sIn[2]+(sOut[2]-sIn[2])*tt;
      if (rr >= e1){ const hl = Math.max(0, 1 - Math.abs(rr-(R+1.8))/1.2)*22;
        d[j] = sr+hl; d[j+1] = sg+hl; d[j+2] = sb+hl; d[j+3] = 255; continue; }
      /* viñeteado: oscurece hacia el borde */
      const u = rr/R, v = u < 0.6 ? 0 : u < 0.84 ? (u-0.6)/0.24*0.1 : u < 0.95 ? 0.1 + (u-0.84)/0.11*0.12 : 0.22 + (u-0.95)/0.05*0.12;
      /* grano: motas claras y oscuras de muy baja opacidad */
      const g = (rnd() + rnd() - 1)*0.075;
      let a, cr, cg, cb;
      if (g < 0){ a = v - g; cr = cg = cb = 0; }
      else { a = v + g; const k = a > 0 ? 255*g/a : 0; cr = cg = cb = k; }
      /* aberración cromática leve en el borde del campo */
      const ab = Math.max(0, 1 - Math.abs(rr-(R-1.4))/1.4)*0.3, ao = Math.max(0, 1 - Math.abs(rr-(R-4.2))/1.6)*0.1;
      if (ab > 0){ const na = a + ab*(1-a); cr = (cr*a + 70*ab)/na; cg = (cg*a + 120*ab)/na; cb = (cb*a + 255*ab)/na; a = na; }
      if (ao > 0){ const na = a + ao*(1-a); cr = (cr*a + 255*ao)/na; cg = (cg*a + 150*ao)/na; cb = (cb*a + 60*ao)/na; a = na; }
      /* borde suave hacia el tubo */
      if (rr > e0){ const t = (rr-e0)/(e1-e0); cr += (sr-cr)*t; cg += (sg-cg)*t; cb += (sb-cb)*t; a += (1-a)*t; }
      d[j] = cr; d[j+1] = cg; d[j+2] = cb; d[j+3] = Math.round(clamp(a, 0, 1)*255);
    }
    c.putImageData(id, 0, 0); }
  return cv;
}
/* src: lienzo con la escena nítida (campo de radio R*1.12 lleno); c: lienzo visible con transformación dpr */
function micOptica(c, src, W, H, R, dpr, o){
  const cx = W/2, cy = H/2;
  c.clearRect(0, 0, W, H);
  if (o.blur > 0.3){
    if (MIC_FILTRO){ c.save(); c.filter = `blur(${o.blur.toFixed(2)}px)`; c.drawImage(src, 0, 0, W, H); c.restore(); }
    else { /* sin filtros de lienzo: desenfoque de caja a baja resolución */
      const k = clamp(2.2/o.blur, o.low ? 0.1 : 0.13, 0.5), q = micReduce(src, W, H, R, dpr, k, 'sm'), side = q.side, n = side*side;
      const id = q.sc.getImageData(0, 0, side, side), d = id.data; micBufs(n*3);
      const A = MIC_FA, T = MIC_FT;
      for (let i=0;i<n;i++){ A[i*3] = d[i*4]; A[i*3+1] = d[i*4+1]; A[i*3+2] = d[i*4+2]; }
      const rb = Math.max(1, Math.round(o.blur*k*0.62));
      micBox(A, T, side, side, rb, 3); micBox(A, T, side, side, rb, 3);
      for (let i=0;i<n;i++){ d[i*4] = A[i*3]; d[i*4+1] = A[i*3+1]; d[i*4+2] = A[i*3+2]; d[i*4+3] = 255; }
      q.sc.putImageData(id, 0, 0); c.imageSmoothingEnabled = true;
      c.drawImage(q.sm, 0, 0, side, side, cx-q.Rb, cy-q.Rb, 2*q.Rb, 2*q.Rb);
    }
    if (o.halo > 0 && !o.low) micHalo(c, src, W, H, R, dpr, o.blur, o.halo*Math.min(1, o.blur/3));
  } else c.drawImage(src, 0, 0, W, H);

  /* luz y contraste (operaciones de composición: funcionan en todos los navegadores) */
  if (o.sat < 1 || o.con < 1 || o.bri < 1 || o.wash > 0){
    c.save(); c.beginPath(); c.arc(cx, cy, R+2, 0, Math.PI*2); c.clip();
    const box = [cx-R-2, cy-R-2, 2*R+4, 2*R+4];
    if (o.sat < 1){ c.globalCompositeOperation = 'saturation'; c.globalAlpha = 1-o.sat; c.fillStyle = '#808080'; c.fillRect(...box); }
    if (o.con < 1){ c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1-o.con; c.fillStyle = 'rgb(214,211,204)'; c.fillRect(...box); }
    if (o.bri < 1){ c.globalCompositeOperation = 'multiply'; c.globalAlpha = 1; const v = Math.round(255*o.bri);
      c.fillStyle = `rgb(${v},${Math.round(v*0.985)},${Math.round(v*0.95)})`; c.fillRect(...box); }
    if (o.wash > 0){ c.globalCompositeOperation = 'screen'; c.globalAlpha = Math.min(0.85, o.wash); c.fillStyle = '#fffef8'; c.fillRect(...box); }
    c.restore();
  }
  /* ocular: viñeteado, borde suave, aberración, grano y tubo oscuro en una sola capa */
  c.drawImage(micMarco(W, H, R), 0, 0, W, H);
}
/* fondo del condensador en el lienzo de escena */
function micFondo(bc, W, H, R, bg){
  const cx = W/2, cy = H/2, Rb = R*1.12, b = micC(bg || MIC_BG);
  bc.fillStyle = micGrad(bc, cx - R*0.12, cy - R*0.14, 0, cx, cy, Rb, [[0, micShade(b, 0.25)], [0.7, b], [1, micShade(b, -0.035)]]);
  bc.fillRect(cx-Rb-2, cy-Rb-2, 2*Rb+4, 2*Rb+4);
  bc.save(); bc.beginPath(); bc.arc(cx, cy, Rb, 0, Math.PI*2); bc.clip();
}
/* cambio de objetivo: la imagen anterior se amplía (o reduce) y se funde mientras gira el revólver */
function micSnap(cv){ if (!cv.width || !cv.height) return null; const s = document.createElement('canvas'); s.width = cv.width; s.height = cv.height;
  try { s.getContext('2d').drawImage(cv, 0, 0); } catch(e){ return null; } return s; }
function micTrans(c, tr, W, H, R){
  const p = clamp((performance.now() - tr.t0)/tr.dur, 0, 1); if (p >= 1) return false;
  const e = 1 - Math.pow(1-p, 3), cx = W/2, cy = H/2;
  c.save(); c.beginPath(); c.arc(cx, cy, R+1, 0, Math.PI*2); c.clip();
  c.globalAlpha = Math.pow(1-p, 1.3); const sc = 1 + (tr.ratio - 1)*e;
  c.translate(cx, cy); c.scale(sc, sc); c.rotate((tr.ratio > 1 ? 1 : -1)*0.05*e); c.drawImage(tr.img, -cx, -cy, W, H);
  c.restore();
  c.save(); c.beginPath(); c.arc(cx, cy, R+1, 0, Math.PI*2); c.clip();
  c.fillStyle = `rgba(8,9,12,${(0.55*Math.sin(Math.PI*Math.min(1, p*1.25))).toFixed(3)})`; c.fillRect(cx-R-2, cy-R-2, 2*R+4, 2*R+4);
  c.restore();
  return true;
}

/* ---------- tinciones ---------- */
const MIC_TIN = {
  ninguna: { n:'Sin tinción', d:'Solo agua. Las estructuras internas casi no se distinguen: falta contraste.',
             nuc:'rgba(150,156,166,.55)', pared:'rgba(160,168,178,.85)', cito:'rgba(232,238,244,.30)', det:'rgba(150,158,168,.5)', mem:'rgba(150,160,172,.7)' },
  azul:    { n:'Azul de metileno', d:'Colorante básico: tiñe de azul los núcleos y el material con carga negativa (ADN). Es el de uso corriente para células animales, levaduras y bacterias.',
             nuc:'#25409a', nucV:'#4a3196', pared:'#6e86c8', cito:'rgba(198,216,244,.55)', det:'#3a58ad', mem:'#4a63b4' },
  lugol:   { n:'Lugol (yodo-yoduro)', d:'Tiñe de ámbar el citoplasma y de azul violáceo el almidón. Es el habitual para la epidermis de cebolla y los tejidos vegetales.',
             nuc:'#6b3a12', pared:'#b07b3d', cito:'rgba(240,215,170,.60)', det:'#8a5a20', mem:'#9a6a2c' }
};

/* ---------- objetivos del revólver (ocular fijo de 10x) ---------- */
const MIC_OBJ = [
  { m:4,   fov:4500, dof:70,  na:0.10, n:'Objetivo de exploración' },
  { m:10,  fov:1800, dof:28,  na:0.25, n:'Objetivo de mediano aumento' },
  { m:40,  fov:450,  dof:5,   na:0.65, n:'Objetivo de gran aumento (seco)' },
  { m:100, fov:180,  dof:1.4, na:1.25, n:'Objetivo de inmersión', aceite:true }
];

/* =====================================================================
   MUESTRAS
   Cada muestra define: att(i,j) → atributos deterministas de cada célula,
   draw(g) → dibujo por aumento, hit(x,y,g) → estructura bajo el punto.
   ===================================================================== */
const MIC_MUESTRAS = [
/* ---------------------------------------------------------------- cebolla */
{ id:'cebolla', n:'Epidermis de cebolla', corto:'Cebolla', grupo:'vegetal', em:'🧅',
  tin:'lugol', plano:-118, escala:'Cada célula mide entre 200 y 400 µm de largo.',
  prep:'Con una pinza se levanta la finísima película transparente de la cara interna de una hoja de cebolla y se extiende sin dobleces sobre el portaobjetos.',
  obs:{ 4:'Un tejido en forma de ladrillos alineados, sin espacios entre ellos.', 10:'Se distinguen las paredes rectas de cada célula.', 40:'En cada célula aparece un núcleo ovalado pegado a la pared.', 100:'Dentro del núcleo se ve el nucléolo y en el citoplasma, granulación fina.' },
  labels:[ {id:'pared', n:'Pared celular', fb:'La pared celular es la línea gruesa y recta que separa una célula de su vecina. Es rígida y exclusiva de la célula vegetal: por eso las células parecen ladrillos.'},
           {id:'nucleo', n:'Núcleo', fb:'El núcleo es el cuerpo ovalado más oscuro por la tinción. En la cebolla queda arrimado a la pared porque la vacuola ocupa el centro.'},
           {id:'cito', n:'Citoplasma', fb:'El citoplasma es la franja granulada y clara que queda entre la pared y el núcleo.'},
           {id:'vacuola', n:'Vacuola central', fb:'La vacuola central es el espacio amplio y casi transparente del centro de la célula; se aprecia mejor a 400 aumentos o más.'} ],
  att(i,j){ const r = micRng(i,j,11); const w = 320*(0.98+0.04*r()), hg = 78;
    return { x:(i+(j&1?0.5:0))*320, y:j*78, w, h:hg, nx:0.18+0.62*r(), ny:0.22+0.5*r(), nr:11+5*r(), gr:r() }; },
  cel(x,y){ const j = Math.floor(y/78); const i = Math.floor(x/320 - (j&1?0.5:0)); return { i, j, a:this.att(i,j) }; },
  draw(g){ const c = g.ctx, P = micPal(g.tin), mg = g.mag;
    const minW = 0.6/g.s;                               /* la pared nunca baja de ~0,6 px por lado */
    const pared = mg >= 40 ? micShade(P.pared, -0.04) : micMix(P.pared, P.cito, 0.35), vac = micMix(P.cito, MIC_BG, 0.55), cito = P.cito;
    c.fillStyle = micCss(pared, 1); c.fillRect(g.x0, g.y0, g.x1-g.x0, g.y1-g.y0);
    const gran = mg >= 40 ? micGranPat(c, g, 'ceb-gran', 30, g.low ? 30 : 46, 0.3, 0.85, micShade(P.det, 0.05), 0.2, 0.55) : null;
    const nucCol = micMix(P.nuc, cito, 0.38);
    micEach(g, 320, (i,j) => { const a = this.att(i,j), v = micRng(i,j,211);
      /* contorno interior de la celda: el grosor de la pared varía de un tramo a otro */
      const ins = () => Math.max(minW, 1.1 + 2.8*v()), X = a.x, Y = a.y, CW = 320, CH = 78;
      const pts = [[X+ins(), Y+ins()], [X+CW*(0.35+0.3*v()), Y+ins()+(v()-0.5)*2.4], [X+CW-ins(), Y+ins()],
                   [X+CW-ins(), Y+CH-ins()], [X+CW*(0.35+0.3*v()), Y+CH-ins()+(v()-0.5)*2.4], [X+ins(), Y+CH-ins()]];
      const tono = v(), cel = micMix(vac, cito, 0.08 + 0.5*tono);
      micPoly(c, pts, 5 + 3*v());
      c.fillStyle = micCss(cel, 1); c.fill();
      const nx = a.x+a.w*a.nx, ny = a.y+a.h*a.ny;
      if (mg >= 40){
        c.save(); c.clip(); c.lineJoin = 'round';
        /* citoplasma parietal: más denso junto a la pared y alrededor del núcleo; la vacuola ocupa el centro */
        const cd = micShade(micMix(cel, cito, 0.7), -0.05);
        [[34, 0.16], [22, 0.2], [11, 0.28]].forEach(([w, al]) => { c.lineWidth = w*(0.8 + 0.4*v()); c.strokeStyle = micCss(cd, al); c.stroke(); });
        c.fillStyle = micGrad(c, nx, ny, a.nr*0.6, nx, ny, a.nr*2.6, [[0, cd, 0.55], [1, cd, 0]]); c.fillRect(nx-a.nr*3, ny-a.nr*3, a.nr*6, a.nr*6);
        if (gran){ c.fillStyle = gran; c.globalAlpha = 0.45; micPoly(c, pts, 5); c.fill(); c.globalAlpha = 1; c.lineWidth = 16; c.strokeStyle = gran; c.stroke(); }
        if (mg >= 100){ micRect(c, X+CW*0.14, Y+CH*0.3, CW*0.72, CH*0.4, 16); c.fillStyle = 'rgba(255,253,246,.2)'; c.fill(); }
        /* borde de la pared: línea oscura fina y reflejo claro por dentro (refracción) */
        micPoly(c, pts, 5); c.lineWidth = Math.max(0.8, minW); c.strokeStyle = micCss(micShade(pared, -0.28), 0.4); c.stroke();
        c.lineWidth = Math.max(2.2, minW*3); c.strokeStyle = 'rgba(255,250,236,.22)'; c.stroke();
        c.restore();
        const vv = (i*5 + j*3) & 7;
        const spr = micSpr(g, 'nceb', vv, a.nr*2, (cc, r, rng, px) => micPaintNuc(cc, r, rng, px, nucCol, { nucleolos: 1 + ((vv >> 2) & 1), gran: 60, aclara: 0.4 }));
        micPut(c, spr, nx, ny, a.nr*2, a.nr*2*0.78, 0);
      } else micEll(c, nx, ny, a.nr*0.8, a.nr*0.64, 0, micCss(P.nuc, mg === 10 ? 0.34 : 0.22));
    }, 78);
    micRestos(c, g, 17, micShade(P.pared, -0.35), 0.28);
    micBlotch(c, g, 23, micShade(P.pared, -0.12), 0.2, 2600); },
  hit(x,y,g){ const { a } = this.cel(x,y); if (x<a.x||x>a.x+a.w||y<a.y||y>a.y+a.h) return 'pared';
    const nx = a.x+a.w*a.nx, ny = a.y+a.h*a.ny;
    if (g.mag>=40 && Math.hypot((x-nx), (y-ny)/0.78) < a.nr) return 'nucleo';
    const d = Math.min(x-a.x, a.x+a.w-x, y-a.y, a.y+a.h-y);
    if (d < 7) return 'pared';
    if (g.mag>=100 && d > a.h*0.22) return 'vacuola';
    return 'cito'; } },

/* ---------------------------------------------------------------- elodea */
{ id:'elodea', n:'Hoja de Elodea (ciclosis)', corto:'Elodea', grupo:'vegetal', em:'🌿', anim:true,
  tin:'ninguna', plano:64, escala:'Cada célula mide unos 100 µm de largo; cada cloroplasto, unos 5 µm.',
  prep:'La hoja de Elodea es tan delgada que se monta entera entre porta y cubre con una gota de agua del acuario. No conviene teñirla: el colorante mata la célula y detiene la ciclosis.',
  obs:{ 4:'Una lámina verde con nervadura central.', 10:'Se insinúa la cuadrícula de células.', 40:'Cada célula está llena de cloroplastos verdes que se desplazan en círculo: eso es la ciclosis.', 100:'Se ve la pared, el núcleo y cada cloroplasto por separado girando con la corriente citoplasmática.' },
  labels:[ {id:'cloro', n:'Cloroplasto', fb:'Los cloroplastos son los cuerpos verdes ovalados que se mueven arrimados a la pared; contienen la clorofila y allí ocurre la fotosíntesis.'},
           {id:'pared', n:'Pared celular', fb:'La pared es el contorno rectangular que encierra a cada célula y la mantiene rígida.'},
           {id:'nucleo', n:'Núcleo', fb:'El núcleo es un cuerpo claro y algo mayor que un cloroplasto; cuesta verlo porque los cloroplastos lo tapan.'},
           {id:'cito', n:'Citoplasma en movimiento', fb:'El citoplasma es el medio transparente que arrastra a los cloroplastos: el movimiento en círculo se llama ciclosis.'} ],
  att(i,j){ const r = micRng(i,j,23); return { x:i*112, y:j*46, w:104, h:40, ph:r()*Math.PI*2, v:0.16+0.1*r(), nx:0.3+0.4*r(), ny:0.3+0.4*r(), n:34 }; },
  path(a, u, ins){ const m = 7 + (ins||0), w = a.w-2*m, hg = a.h-2*m, per = 2*(w+hg), d = ((u%1)+1)%1*per;
    if (d < w) return [a.x+m+d, a.y+m];
    if (d < w+hg) return [a.x+m+w, a.y+m+(d-w)];
    if (d < 2*w+hg) return [a.x+m+w-(d-w-hg), a.y+m+hg];
    return [a.x+m, a.y+m+hg-(d-2*w-hg)]; },
  animMin:40,
  draw(g){ const c = g.ctx, mg = g.mag, minW = 0.6/g.s;
    c.fillStyle = mg >= 40 ? 'rgb(178,202,166)' : 'rgb(120,164,104)'; c.fillRect(g.x0, g.y0, g.x1-g.x0, g.y1-g.y0);
    const clo = [0,1].map(an => micSpr(g, 'clor'+(mg >= 100 ? 'd' : ''), an, 5.8, (cc, r, rng, px) => {
      cc.save(); cc.scale(1, 0.8); cc.beginPath(); cc.arc(0, 0, r, 0, Math.PI*2);
      const base = an ? [58,128,56,1] : [48,120,52,1];
      cc.fillStyle = micGrad(cc, -r*0.3, -r*0.3, 0, 0, 0, r, [[0, micShade(base, 0.35)], [0.65, base], [1, micShade(base, -0.35)]]); cc.fill();
      if (mg >= 100) for (let k=0;k<9;k++){ const a = rng()*6.28, d = r*0.6*Math.sqrt(rng()); cc.beginPath(); cc.arc(Math.cos(a)*d, Math.sin(a)*d, r*0.12, 0, Math.PI*2); cc.fillStyle = 'rgba(20,70,26,.45)'; cc.fill(); }
      cc.beginPath(); cc.arc(-r*0.35, -r*0.35, r*0.3, 0, Math.PI*2); cc.fillStyle = 'rgba(210,245,190,.35)'; cc.fill(); cc.restore(); }));
    let M = null; try { M = c.getTransform(); } catch(e){ M = null; }
    micEach(g, 112, (i,j) => { const a = this.att(i,j), v = micRng(i,j,223);
      const m = Math.max(minW, 1.4);
      micRect(c, a.x+m, a.y+m, a.w-2*m, a.h-2*m, 7);
      if (mg < 40){ const t = v(); c.fillStyle = `rgb(${Math.round(92+40*t)},${Math.round(150+34*t)},${Math.round(78+22*t)})`; c.fill(); return; }
      c.fillStyle = micGrad(c, a.x+a.w/2, a.y+a.h/2, 0, a.x+a.w/2, a.y+a.h/2, a.w*0.6, [[0, [226,238,214,1]], [1, [206,226,194,1]]]); c.fill();
      c.lineWidth = Math.max(0.8, minW); c.strokeStyle = 'rgba(92,128,82,.55)'; c.stroke();
      for (let k=0;k<a.n;k++){ const anillo = k % 2, u = a.ph/(Math.PI*2) + k/a.n + g.t*a.v*(g.anim?1:0)*(anillo?0.86:1);
        const p = this.path(a, u, anillo ? 6 : 0);
        if (M) micPutRot(c, M, clo[anillo], p[0], p[1], 5.8, 5.8, u*6); else micPut(c, clo[anillo], p[0], p[1], 5.8, 5.8, u*6); }
      if (M) c.setTransform(M);
      const nx = a.x+a.w*a.nx, ny = a.y+a.h*a.ny;
      micEll(c, nx, ny, 7, 6, 0, micGrad(c, nx-2, ny-2, 0, nx, ny, 7, [[0, 'rgba(240,244,232,.95)'], [1, 'rgba(210,222,200,.9)']]), 'rgba(110,132,100,.55)', 0.9);
      if (mg >= 100) micEll(c, nx+1, ny-1, 2.2, 2, 0, 'rgba(110,130,100,.6)');
    }, 46);
    /* nervadura central: células largas, más verdes y apretadas */
    const yN = 1900; if (g.y1 > yN-120 && g.y0 < yN+120){ c.fillStyle = 'rgba(40,96,40,.22)'; c.fillRect(g.x0, yN-92, g.x1-g.x0, 184); }
    micBlotch(c, g, 29, [40,90,40,1], mg >= 40 ? 0.1 : 0.22, 2400); },
  hit(x,y,g){ const i = Math.floor(x/112), j = Math.floor(y/46), a = this.att(i,j);
    const d = Math.min(x-a.x, a.x+a.w-x, y-a.y, a.y+a.h-y);
    if (d < 5) return 'pared';
    if (g.mag>=40){
      if (Math.hypot(x-(a.x+a.w*a.nx), y-(a.y+a.h*a.ny)) < 8) return 'nucleo';
      for (let k=0;k<a.n;k++){ const anillo = k % 2, u = a.ph/(Math.PI*2)+k/a.n+g.t*a.v*(g.anim?1:0)*(anillo?0.86:1);
        const p = this.path(a, u, anillo ? 6 : 0);
        if (Math.hypot(x-p[0], y-p[1]) < 4) return 'cloro'; } }
    return 'cito'; } },

/* ---------------------------------------------------------------- sangre */
{ id:'sangre', n:'Sangre humana (extendido)', corto:'Sangre', grupo:'animal', em:'🩸',
  tin:'azul', plano:-46, escala:'Un glóbulo rojo mide 7,5 µm de diámetro: sirve como regla natural.',
  prep:'Una gota se extiende en capa finísima con el borde de otro portaobjetos y se deja secar antes de teñir. Si la capa queda gruesa, las células se amontonan y no se pueden contar.',
  obs:{ 4:'Una película rosada uniforme.', 10:'La película se resuelve en puntitos.', 40:'Miles de glóbulos rojos redondos y, entre ellos, algún glóbulo blanco con núcleo teñido.', 100:'Cada glóbulo rojo muestra su centro más pálido (es bicóncavo) y se ven las plaquetas como fragmentos diminutos.' },
  labels:[ {id:'eritro', n:'Glóbulo rojo (eritrocito)', fb:'Los glóbulos rojos son los discos rosados, todos del mismo tamaño y sin núcleo, con el centro más pálido.'},
           {id:'leuco', n:'Glóbulo blanco (leucocito)', fb:'Los glóbulos blancos son mucho más grandes y escasos, y tienen un núcleo teñido de azul intenso (lobulado o redondo).'},
           {id:'plaq', n:'Plaqueta', fb:'Las plaquetas son fragmentos diminutos y violáceos, de un tamaño muy inferior al de un glóbulo rojo.'},
           {id:'plasma', n:'Plasma (fondo)', fb:'El plasma es el fondo claro entre las células; no tiene forma propia.'} ],
  count:{ tag:'eritro', n:'glóbulos rojos', dil:200, real:'entre 4,5 y 5,5 millones por µL en una persona sana' },
  draw(g){ const c = g.ctx, P = micPal(g.tin), mg = g.mag;
    micBlotch(c, g, 31, [224,170,166,1], 0.12, 5200);                 /* plasma y grosor desigual del extendido */
    if (mg <= 4) micFilm(c, g, 'sangre', 20, 3.75, [206,112,116,1]);
    else {
      /* glóbulos rojos en sus posiciones reales (las mismas que se cuentan); se multiplican donde se apilan */
      c.globalCompositeOperation = 'multiply';
      micEach(g, 20, (i,j) => { const r = micRng(i,j,31); const x = (i+0.5+(r()-0.5)*0.75)*20, y = (j+0.5+(r()-0.5)*0.75)*20;
        const rad = 3.75*(0.92+0.16*r());
        if (mg === 10) micEll(c, x, y, rad, rad, 0, 'rgba(212,122,124,.75)');
        else micRBC(c, g, x, y, rad, (i*7 + j*13) & 7);
      });
      c.globalCompositeOperation = 'source-over';
    }
    if (mg >= 10) micEach(g, 70, (i,j) => { const r = micRng(i,j,37); const x = (i+0.5+(r()-0.5)*0.8)*70, y = (j+0.5+(r()-0.5)*0.8)*70;
      if (r() < 0.55) return; const rot = r()*3;
      if (mg >= 40) micPlaq(c, g, x, y, (i+j*3) & 5, rot); else micEll(c, x, y, 1.5, 1.1, rot, micCss(P.nucV, 0.55)); });
    micEach(g, 230, (i,j) => { const r = micRng(i,j,41); const x = (i+0.5+(r()-0.5)*0.8)*230, y = (j+0.5+(r()-0.5)*0.8)*230;
      if (r() < 0.45) return; const v = micRng(i,j,43); let tipo = r() < 0.62 ? 'neutro' : 'linfo';
      if (tipo === 'linfo' && v() < 0.24) tipo = 'mono';               /* algún monocito entre los agranulocitos */
      if (mg <= 4){ const rr = Math.max(4.6, 0.95/g.s); micEll(c, x, y, rr*1.5, rr*1.5, 0, 'rgba(242,238,248,.6)'); micEll(c, x, y, rr, rr, 0, micCss(micShade(P.nucV, 0.25), 0.6)); return; }
      micLeuco(c, g, x, y, tipo, (i*3 + j*5) & 7);
    }); },
  targets(g){ const out = []; const sp = 20;
    micEach(g, sp, (i,j) => { const r = micRng(i,j,31); const x = (i+0.5+(r()-0.5)*0.75)*sp, y = (j+0.5+(r()-0.5)*0.75)*sp;
      if (Math.hypot(x-g.cx, y-g.cy) < g.rad) out.push({ x, y, r:3.75 }); });
    return out; },
  hit(x,y,g){ let res = 'plasma';
    micNear(x,y,230,(i,j)=>{ const r = micRng(i,j,41); const cx=(i+0.5+(r()-0.5)*0.8)*230, cy=(j+0.5+(r()-0.5)*0.8)*230;
      if (r() < 0.45) return; if (Math.hypot(x-cx,y-cy) < 8.2) res = 'leuco'; });
    if (res !== 'plasma') return res;
    micNear(x,y,70,(i,j)=>{ const r = micRng(i,j,37); const cx=(i+0.5+(r()-0.5)*0.8)*70, cy=(j+0.5+(r()-0.5)*0.8)*70;
      if (r() < 0.55) return; if (Math.hypot(x-cx,y-cy) < 2.6) res = 'plaq'; });
    if (res !== 'plasma') return res;
    micNear(x,y,20,(i,j)=>{ const r = micRng(i,j,31); const cx=(i+0.5+(r()-0.5)*0.75)*20, cy=(j+0.5+(r()-0.5)*0.75)*20;
      if (Math.hypot(x-cx,y-cy) < 4.2) res = 'eritro'; });
    return res; } },

/* ------------------------------------------------------------- epitelial */
{ id:'epitelial', n:'Epitelio de mucosa bucal', corto:'Epitelio', grupo:'animal', em:'👄',
  tin:'azul', plano:28, escala:'Cada célula epitelial plana mide unos 60 µm de ancho.',
  prep:'Se raspa con suavidad el interior de la mejilla con un palillo limpio, se extiende sobre el porta y se tiñe con azul de metileno.',
  obs:{ 4:'Escamas sueltas dispersas sobre el vidrio.', 10:'Cada escama es una célula aislada, no un tejido compacto.', 40:'Célula plana, de contorno irregular, con un núcleo redondo y central.', 100:'La membrana se ve como una línea finísima, sin pared rígida, y el citoplasma aparece granulado.' },
  labels:[ {id:'nucleo', n:'Núcleo', fb:'El núcleo es el cuerpo redondo y azul intenso que ocupa el centro de la célula.'},
           {id:'mem', n:'Membrana celular', fb:'La membrana es el contorno finísimo y ondulado de la célula. A diferencia de la pared vegetal, no es rígida: por eso la célula se ve aplastada y de forma irregular.'},
           {id:'cito', n:'Citoplasma', fb:'El citoplasma es la zona amplia y clara entre la membrana y el núcleo.'},
           {id:'flora', n:'Bacterias de la boca', fb:'Sobre la célula suelen verse bastoncitos diminutos: son bacterias de la flora bucal, visibles solo a 1000 aumentos.'} ],
  att(i,j){ const r = micRng(i,j,53); return { x:(i+0.5+(r()-0.5)*0.7)*92, y:(j+0.5+(r()-0.5)*0.7)*92, rad:26+8*r(), rot:r()*6.28, nx:(r()-0.5)*10, ny:(r()-0.5)*10, sk:r() }; },
  draw(g){ const c = g.ctx, T = g.tin, P = micPal(T), mg = g.mag;
    micBlotch(c, g, 53, micShade(P.cito, -0.1), 0.12, 2000);
    micRestos(c, g, 57, micShade(P.det, -0.1), 0.22);
    const gran = mg >= 40 ? micGranPat(c, g, 'epi-gran', 26, g.low ? 30 : 55, 0.3, 0.8, P.det, 0.18, 0.5) : null;
    micEach(g, 92, (i,j) => { const a = this.att(i,j); if (a.sk < 0.18) return;
      const v = micRng(i,j,59), cx = a.x+a.nx, cy = a.y+a.ny;
      micBlob(c, a.x, a.y, a.rad, 14, (k)=> micRng(i+k,j,61)(), 0.26);
      /* célula plana: algo más teñida alrededor del núcleo, bordes finos y translúcidos */
      c.fillStyle = micGrad(c, cx, cy, 0, a.x, a.y, a.rad*1.15, [[0, micShade(P.cito, -0.06), 0.9], [0.55, P.cito, 0.8], [1, micShade(P.cito, 0.1), 0.55]]); c.fill();
      c.save(); c.globalAlpha = 0.6; c.strokeStyle = micCss(micShade(P.mem, 0.1)); c.lineWidth = Math.max(mg>=40 ? 0.9 : 0.8, 0.5/g.s); c.stroke(); c.restore();
      if (mg >= 40){ c.save(); c.clip();
        if (gran){ c.fillStyle = gran; c.fill(); }
        /* pliegues: la célula es tan delgada que se arruga al extenderla */
        c.strokeStyle = micCss(micShade(P.mem, 0.2), 0.3); c.lineCap = 'round';
        for (let k=0;k<3;k++){ const an = v()*6.28, d0 = a.rad*(0.2+0.5*v()), L = a.rad*(0.5+0.7*v());
          const px = a.x+Math.cos(an)*d0, py = a.y+Math.sin(an)*d0, dir = an + 1.2 + v();
          c.lineWidth = 0.6 + 0.9*v(); c.beginPath(); c.moveTo(px, py);
          c.quadraticCurveTo(px+Math.cos(dir)*L*0.5+(v()-0.5)*8, py+Math.sin(dir)*L*0.5+(v()-0.5)*8, px+Math.cos(dir)*L, py+Math.sin(dir)*L); c.stroke(); }
        c.restore(); }
      if (mg >= 40){ const vv = (i*3 + j*7) & 7;
        const spr = micSpr(g, 'nepi', vv, 17, (cc, r, rng, px) => micPaintNuc(cc, r, rng, px, micMix(P.nuc, P.cito, 0.2), { nucleolos: vv & 1, gran: 40, aclara: 0.22 }));
        micPut(c, spr, cx, cy, 17, 15.2, a.rot);
        if (mg >= 100){ const r3 = micRng(i,j,71);
          for (let k=0;k<9;k++) micEll(c, cx+(r3()-0.5)*11, cy+(r3()-0.5)*10, 1.2, 1, 0, 'rgba(255,255,255,.14)'); } }
      else micEll(c, cx, cy, 7, 6.5, 0, micCss(P.nuc, 0.45));
      if (mg >= 100){ const r2 = micRng(i,j,67); c.fillStyle = micCss(micShade(P.det, -0.15), 0.85);
        for (let k=0;k<12;k++){ const ang = r2()*6.28, dd = a.rad*(0.3+0.6*r2());
          const bx = a.x+Math.cos(ang)*dd, by = a.y+Math.sin(ang)*dd;
          c.save(); c.translate(bx,by); c.rotate(r2()*6.28); micRect(c,-1.2,-0.35,2.4,0.7,0.35); c.fill(); c.restore(); } }
    }); },
  hit(x,y,g){ let res = 'cito', dentro = false;
    micNear(x,y,92,(i,j)=>{ const a = this.att(i,j); if (a.sk < 0.18) return;
      const d = Math.hypot(x-a.x, y-a.y);
      if (d < a.rad*1.05){ dentro = true;
        if (Math.hypot(x-(a.x+a.nx), y-(a.y+a.ny)) < 9) res = 'nucleo';
        else if (d > a.rad*0.86) res = 'mem'; } });
    return dentro ? res : 'cito'; } },

/* -------------------------------------------------------------- muscular */
{ id:'muscular', n:'Músculo esquelético estriado', corto:'Músculo', grupo:'animal', em:'💪',
  tin:'azul', plano:-72, escala:'Cada fibra muscular mide entre 40 y 80 µm de ancho y puede medir centímetros de largo.',
  prep:'Corte longitudinal finísimo hecho con micrótomo, fijado y teñido. Un corte grueso no deja pasar la luz y se ve todo negro.',
  obs:{ 4:'Bandas paralelas larguísimas: el tejido está organizado en una sola dirección.', 10:'Las fibras se separan unas de otras.', 40:'Aparecen las estrías transversales, claras y oscuras, y los núcleos en el borde de la fibra.', 100:'Las estrías se resuelven en el patrón repetido de los sarcómeros.' },
  labels:[ {id:'fibra', n:'Fibra muscular', fb:'Cada fibra es una célula gigante y alargada; todo el tejido está formado por fibras paralelas.'},
           {id:'estria', n:'Estría transversal', fb:'Las estrías son las líneas claras y oscuras perpendiculares a la fibra: son los sarcómeros alineados. Por eso este músculo se llama estriado.'},
           {id:'nucleo', n:'Núcleo periférico', fb:'Los núcleos son alargados y están pegados al borde de la fibra: cada fibra tiene muchos núcleos.'},
           {id:'endo', n:'Tejido conectivo (endomisio)', fb:'Entre fibra y fibra hay una franja delgada de tejido conectivo que las envuelve y las une.'} ],
  draw(g){ const c = g.ctx, P = micPal(g.tin), FH = 62, mg = g.mag;
    const fib0 = mg >= 40 ? [226,180,184,1] : [212,162,168,1];
    const j0 = Math.floor(g.y0/FH)-1, j1 = Math.floor(g.y1/FH)+1;
    const per = mg >= 100 ? 2.4 : 3.2;
    /* sarcómero como patrón: banda A oscura (donde el hit dice «estría»), banda I clara, línea Z */
    const sarc = mg >= 40 ? micPat(c, g, 'sarc'+per, per*4, (tc, w) => {
      for (let k=0;k<4;k++){ const x = k*per;
        tc.fillStyle = 'rgba(146,82,104,.46)'; tc.fillRect(x, 0, per*0.45, w);
        tc.fillStyle = 'rgba(255,240,240,.18)'; tc.fillRect(x+per*0.17, 0, per*0.1, w);          /* zona H */
        if (mg >= 100){ tc.fillStyle = 'rgba(100,50,70,.45)'; tc.fillRect(x+per*0.715, 0, per*0.07, w); } } }) : null;
    for (let j=j0;j<=j1;j++){ const r = micRng(0,j,71); const y = j*FH, hg = FH*(0.78+0.14*r()), fib = micShade(fib0, (r()-0.5)*0.12);
      /* endomisio entre fibras: tejido conectivo laxo, más claro */
      c.fillStyle = 'rgb(230,208,214)'; c.fillRect(g.x0, y+hg, g.x1-g.x0, FH-hg);
      /* fibra cilíndrica: bordes más oscuros, centro iluminado */
      const lg = c.createLinearGradient(0, y, 0, y+hg);
      lg.addColorStop(0, micCss(micShade(fib, -0.16))); lg.addColorStop(0.16, micCss(fib)); lg.addColorStop(0.45, micCss(micShade(fib, 0.1)));
      lg.addColorStop(0.84, micCss(fib)); lg.addColorStop(1, micCss(micShade(fib, -0.18)));
      c.fillStyle = lg; c.fillRect(g.x0, y, g.x1-g.x0, hg);
      if (sarc){ c.fillStyle = sarc; c.fillRect(g.x0, y+0.6, g.x1-g.x0, hg-1.2); }
      /* fibroblastos aplanados del endomisio */
      if (mg >= 10){ const sp2 = 260; const i0 = Math.floor(g.x0/sp2)-1, i1 = Math.floor(g.x1/sp2)+1;
        for (let i=i0;i<=i1;i++){ const rq = micRng(i,j,81); if (rq() < 0.6) continue;
          micEll(c, (i+rq())*sp2, y+hg+(FH-hg)/2, 6, Math.max(0.9, (FH-hg)*0.25), 0, micCss(micShade(P.nucV, 0.1), 0.6)); } }
      const sp = 140; const i0 = Math.floor(g.x0/sp)-1, i1 = Math.floor(g.x1/sp)+1;
      for (let i=i0;i<=i1;i++){ const rr = micRng(i,j,73); if (rr() < 0.35) continue;
        const nx = (i+0.5+(rr()-0.5)*0.7)*sp, arriba = rr() < 0.5, ny = y + (arriba ? hg*0.12 : hg*0.88);
        if (mg >= 40){ const vv = (i*3 + j) & 7;
          const spr = micSpr(g, 'nmus', vv, 15, (cc, rad, rng, px) => micPaintNuc(cc, rad, rng, px, micMix(micMix(P.nucV, P.nuc, 0.5), [150,140,200,1], 0.3), { gran: 30, aclara: 0.35 }));
          micPut(c, spr, nx, ny, 15, 6, 0); }
        else micEll(c, nx, ny, 7.5, 3, 0, micCss(P.nuc, 0.5)); }
    }
    micBlotch(c, g, 77, [150,90,110,1], 0.12, 2200); },
  hit(x,y,g){ const FH = 62, j = Math.floor(y/FH), r = micRng(0,j,71); const yy = j*FH, hg = FH*(0.78+0.14*r());
    if (y > yy+hg) return 'endo';
    let res = null; const sp = 140;
    micNear(x,y,sp,(i,jj)=>{ if (jj!==j) return; const rr = micRng(i,j,73); if (rr()<0.35) return;
      const nx = (i+0.5+(rr()-0.5)*0.7)*sp, arriba = rr()<0.5, ny = yy + (arriba?hg*0.12:hg*0.88);
      if (Math.hypot((x-nx)/2.5, y-ny) < 4) res = 'nucleo'; });
    if (res) return res;
    if (g.mag>=40){ const per = g.mag>=100?2.4:3.2; const f = ((x % per)+per)%per; if (f < per*0.45) return 'estria'; }
    return 'fibra'; } },

/* -------------------------------------------------------------- nervioso */
{ id:'nervioso', n:'Tejido nervioso (médula espinal)', corto:'Nervioso', grupo:'animal', em:'🧠',
  tin:'azul', plano:96, escala:'El cuerpo de una neurona motora mide entre 30 y 60 µm.',
  prep:'Corte teñido con azul de toluidina o técnica de Nissl, que resalta el cuerpo de la neurona y sus prolongaciones.',
  obs:{ 4:'Un fondo grisáceo con puntos más oscuros repartidos.', 10:'Los puntos oscuros resultan ser cuerpos celulares grandes.', 40:'Cada neurona muestra un cuerpo estrellado con varias prolongaciones y un núcleo con nucléolo muy marcado.', 100:'Se distinguen las dendritas cortas y ramificadas frente al axón, único y largo, y las células de la glía alrededor.' },
  labels:[ {id:'soma', n:'Cuerpo celular (soma)', fb:'El soma es la parte ancha y estrellada de la neurona: de allí salen todas las prolongaciones.'},
           {id:'dendrita', n:'Dendrita', fb:'Las dendritas son las prolongaciones cortas y muy ramificadas que reciben información.'},
           {id:'axon', n:'Axón', fb:'El axón es la prolongación única, larga y de grosor uniforme que sale del soma y conduce el impulso hacia otras células.'},
           {id:'nucleo', n:'Núcleo con nucléolo', fb:'El núcleo de la neurona es grande, claro y con un nucléolo muy visible en el centro.'},
           {id:'glia', n:'Célula de la glía', fb:'Las células de la glía son núcleos pequeños y oscuros sin prolongaciones visibles; son mucho más numerosas que las neuronas.'} ],
  att(i,j){ const r = micRng(i,j,79); return { x:(i+0.5+(r()-0.5)*0.7)*210, y:(j+0.5+(r()-0.5)*0.7)*210, rad:17+8*r(), nd:5+Math.floor(r()*3), rot:r()*6.28, ax:r()*6.28, sk:r() }; },
  draw(g){ const c = g.ctx, P = micPal(g.tin), mg = g.mag;
    const nissl = micMix([112,120,196,1], P.nucV, 0.35), pale = micMix(nissl, MIC_BG, 0.35);
    c.fillStyle = 'rgba(206,212,228,.42)'; c.fillRect(g.x0, g.y0, g.x1-g.x0, g.y1-g.y0);
    micBlotch(c, g, 83, [120,130,180,1], 0.16, 2000);
    /* neurópilo: maraña de fibras finas */
    if (mg >= 10){ const fp = micPat(c, g, 'neuropilo', 160, (tc, w) => { const r = micRng(4,4,85);
        for (let k=0;k<70;k++){ const x = r()*w, y = r()*w, a0 = r()*6.28, L = 30 + 60*r();
          tc.strokeStyle = `rgba(110,122,176,${0.1 + 0.16*r()})`; tc.lineWidth = 0.35 + 0.6*r();
          micWrap(w, x, y, L, (xx, yy) => { tc.beginPath(); tc.moveTo(xx, yy);
            tc.quadraticCurveTo(xx+Math.cos(a0+0.5)*L*0.5, yy+Math.sin(a0+0.5)*L*0.5, xx+Math.cos(a0)*L, yy+Math.sin(a0)*L); tc.stroke(); }); } });
      if (fp){ c.fillStyle = fp; c.fillRect(g.x0, g.y0, g.x1-g.x0, g.y1-g.y0); } }
    micEach(g, 34, (i,j) => { const r = micRng(i,j,83); if (r() < 0.42) return;
      const x = (i+0.5+(r()-0.5)*0.8)*34, y = (j+0.5+(r()-0.5)*0.8)*34;
      if (mg >= 40){ const vv = (i*3+j*5) & 7;
        const spr = micSpr(g, 'glia', vv, 5.4, (cc, rad, rng, px) => micPaintNuc(cc, rad, rng, px, micShade(P.nucV, -0.1), { gran: 18, aclara: 0.18 }));
        micPut(c, spr, x, y, 5.4, 4.6, vv*0.7); }
      else micEll(c, x, y, 2.6, 2.2, 0, micCss(P.nucV, 0.5)); });
    /* prolongación ahusada: gruesa en el soma, fina en la punta */
    const rama = (x0, y0, ang, L, w0, w1, curva) => { const nx = -Math.sin(ang), ny = Math.cos(ang);
      const x1 = x0+Math.cos(ang)*L, y1 = y0+Math.sin(ang)*L, mx = (x0+x1)/2 + nx*curva, my = (y0+y1)/2 + ny*curva;
      c.beginPath(); c.moveTo(x0+nx*w0/2, y0+ny*w0/2); c.quadraticCurveTo(mx+nx*(w0+w1)/4, my+ny*(w0+w1)/4, x1+nx*w1/2, y1+ny*w1/2);
      c.lineTo(x1-nx*w1/2, y1-ny*w1/2); c.quadraticCurveTo(mx-nx*(w0+w1)/4, my-ny*(w0+w1)/4, x0-nx*w0/2, y0-ny*w0/2); c.closePath(); c.fill();
      return [x1, y1]; };
    const nisPat = mg >= 40 ? micGranPat(c, g, 'nissl', 24, g.low ? 30 : 60, 0.5, 1.3, micShade(nissl, -0.35), 0.35, 0.75) : null;
    micEach(g, 210, (i,j) => { const a = this.att(i,j); if (a.sk < 0.42) return;
      const v = micRng(i,j,87);
      if (mg >= 40){
        c.fillStyle = micCss(nissl, 0.82);
        for (let k=0;k<a.nd;k++){ const ang = a.rot + k/a.nd*6.28, L = a.rad*(2.2+1.6*((k*7)%5)/5);
          const tip = rama(a.x, a.y, ang, L, a.rad*0.55, 1.1, (v()-0.5)*L*0.25);
          if (mg >= 100) for (let b=0;b<2;b++){ const a2 = ang+(b?0.5:-0.5); rama(tip[0], tip[1], a2, L*0.42, 1.3, 0.45, (v()-0.5)*6); } }
        /* axón: cono de arranque pálido (sin Nissl) y luego calibre uniforme */
        c.fillStyle = micCss(pale, 0.9); rama(a.x, a.y, a.ax, a.rad*1.4, a.rad*0.5, 2.4, 0);
        c.fillStyle = micCss(micShade(pale, -0.05), 0.85);
        rama(a.x+Math.cos(a.ax)*a.rad*1.3, a.y+Math.sin(a.ax)*a.rad*1.3, a.ax, a.rad*7.7, 2.4, 2.1, 0); }
      micBlob(c, a.x, a.y, a.rad, 12, (k)=>micRng(i+k,j,89)(), 0.22);
      c.fillStyle = mg >= 40 ? micGrad(c, a.x, a.y, 0, a.x, a.y, a.rad*1.1, [[0, micShade(nissl, 0.1), 0.95], [1, micShade(nissl, -0.08), 0.95]]) : micCss(nissl, 0.8);
      c.fill();
      if (nisPat){ c.save(); c.clip(); c.fillStyle = nisPat; c.fill(); c.restore(); }
      if (mg >= 40){ const vv = (i+j) & 3;
        const spr = micSpr(g, 'nneu', vv, a.rad*0.84, (cc, rad, rng, px) => micPaintNuc(cc, rad, rng, px, [236,238,248,1], { gran: 16, aclara: 0.2 }), 1.2);
        micPut(c, spr, a.x, a.y, a.rad*0.84, a.rad*0.8, 0, 1.2);
        micEll(c, a.x, a.y, a.rad*0.16, a.rad*0.15, 0, micGrad(c, a.x-1, a.y-1, 0, a.x, a.y, a.rad*0.16, [[0, micShade(P.nucV, 0.1)], [1, micShade(P.nucV, -0.3)]])); }
    }); },
  hit(x,y,g){ let res = null;
    micNear(x,y,210,(i,j)=>{ const a = this.att(i,j); if (a.sk < 0.42) return;
      const d = Math.hypot(x-a.x, y-a.y);
      if (d < a.rad*0.45 && g.mag>=40){ res = 'nucleo'; return; }
      if (d < a.rad*1.1){ res = 'soma'; return; }
      if (g.mag>=40){ const ang = Math.atan2(y-a.y, x-a.x);
        const dif = Math.abs(((ang - a.ax + Math.PI*3) % (Math.PI*2)) - Math.PI);
        if (dif < 0.12 && d < a.rad*9.4){ res = 'axon'; return; }
        for (let k=0;k<a.nd;k++){ const an = a.rot + k/a.nd*6.28;
          const df = Math.abs(((ang - an + Math.PI*3) % (Math.PI*2)) - Math.PI);
          if (df < 0.18 && d < a.rad*4.2){ res = 'dendrita'; return; } } } });
    if (res) return res;
    micNear(x,y,34,(i,j)=>{ const r = micRng(i,j,83); if (r()<0.42) return;
      if (Math.hypot(x-(i+0.5+(r()-0.5)*0.8)*34, y-(j+0.5+(r()-0.5)*0.8)*34) < 3.4) res = 'glia'; });
    return res || 'glia'; } },

/* -------------------------------------------------------------- levadura */
{ id:'levadura', n:'Levadura en gemación', corto:'Levadura', grupo:'microorganismo', em:'🍞',
  tin:'azul', plano:-24, escala:'Cada levadura mide entre 5 y 10 µm: es algo mayor que un glóbulo rojo.',
  prep:'Se diluye una pizca de levadura de panadería en agua tibia con azúcar, se espera unos minutos y se monta una gota con azul de metileno.',
  obs:{ 4:'Una turbidez sin forma definida.', 10:'Se adivinan puntitos agrupados.', 40:'Células ovaladas, muchas con una protuberancia: la gema o yema.', 100:'Se distingue la pared gruesa, la vacuola clara y la cicatriz que deja cada gemación.' },
  labels:[ {id:'madre', n:'Célula madre', fb:'La célula madre es la unidad ovalada mayor; de ella brota la gema.'},
           {id:'gema', n:'Gema (yema)', fb:'La gema es la protuberancia más pequeña unida a la célula madre: así se reproduce la levadura de forma asexual.'},
           {id:'pared', n:'Pared celular', fb:'La levadura es un hongo y sí tiene pared celular: es el borde grueso y nítido que rodea a la célula.'},
           {id:'vacuola', n:'Vacuola', fb:'La vacuola es el espacio claro del interior, que se ve como un hueco redondo sin teñir.'} ],
  count:{ tag:'madre', n:'levaduras', dil:1, real:'un cultivo activo tiene del orden de 10 millones de levaduras por mL' },
  att(i,j){ const r = micRng(i,j,97); return { x:(i+0.5+(r()-0.5)*0.8)*24, y:(j+0.5+(r()-0.5)*0.8)*24, rad:3.2+1.4*r(), rot:r()*6.28, gema:r()<0.55, gr:0.4+0.25*r(), sk:r() }; },
  draw(g){ const c = g.ctx, P = micPal(g.tin), mg = g.mag;
    micBlotch(c, g, 97, micShade(P.cito, -0.12), 0.16, 2200);
    if (mg <= 4){ micFilm(c, g, 'levadura', 24, 4.2, micShade(P.cito, -0.25), 0.1); return; }
    const det = mg >= 100 ? 'd' : mg >= 40 ? 'm' : 'b';
    /* célula ovalada con pared refringente; la vacuola se resuelve a 1000 aumentos */
    const pinta = (cc, r0, rng, px) => { const r = r0/1.15; cc.save(); cc.scale(1.15, 1);
      cc.beginPath(); cc.arc(0, 0, r, 0, Math.PI*2);
      cc.fillStyle = micGrad(cc, -r*0.25, -r*0.25, 0, 0, 0, r, [[0, micShade(P.cito, 0.12)], [0.75, micShade(P.cito, -0.04)], [1, micShade(P.cito, -0.12)]]); cc.fill();
      if (det !== 'b'){
        cc.lineWidth = r*0.16; cc.strokeStyle = micCss(micShade(P.mem, -0.1), 0.85); cc.stroke();
        cc.beginPath(); cc.arc(0, 0, r*0.86, 0, Math.PI*2); cc.lineWidth = r*0.07; cc.strokeStyle = 'rgba(255,255,255,.45)'; cc.stroke();
        for (let k=0;k<(det === 'd' ? 18 : 8);k++){ const a = rng()*6.28, d = r*0.7*Math.sqrt(rng()); cc.beginPath(); cc.arc(Math.cos(a)*d, Math.sin(a)*d, r*0.05, 0, Math.PI*2); cc.fillStyle = micCss(P.det, 0.35); cc.fill(); } }
      else { cc.lineWidth = r*0.14; cc.strokeStyle = micCss(P.mem, 0.5); cc.stroke(); }
      if (det === 'd'){ cc.beginPath(); cc.arc(-r*0.18, -r*0.12, r*0.4, 0, Math.PI*2);
        cc.fillStyle = micGrad(cc, -r*0.25, -r*0.2, 0, -r*0.18, -r*0.12, r*0.4, [[0, 'rgba(255,255,255,.75)'], [1, 'rgba(236,244,252,.45)']]); cc.fill();
        cc.lineWidth = r*0.04; cc.strokeStyle = micCss(P.mem, 0.35); cc.stroke();
        cc.beginPath(); cc.arc(r*0.48, r*0.42, r*0.14, 0, Math.PI*2); cc.fillStyle = micCss(P.det, 0.8); cc.fill(); }
      else if (det === 'm'){ cc.beginPath(); cc.arc(0, 0, r*0.3, 0, Math.PI*2); cc.fillStyle = micCss(P.det, 0.7); cc.fill(); }
      cc.restore(); };
    micEach(g, 24, (i,j) => { const a = this.att(i,j); if (a.sk < 0.25) return;
      const vv = (i*5 + j*3) & 7, spr = micSpr(g, 'lev'+det, vv, a.rad*2.3, pinta);
      micPut(c, spr, a.x, a.y, a.rad*2.3, a.rad*2.3, a.rot);
      if (a.gema){ const gs = micSpr(g, 'lev'+(det === 'd' ? 'm' : det), (vv+3) & 7, a.rad*a.gr*2.3, pinta);
        micPut(c, gs, a.x+Math.cos(a.rot)*a.rad*1.3, a.y+Math.sin(a.rot)*a.rad*1.3, a.rad*a.gr*2.3, a.rad*a.gr*2.3, a.rot); }
    }); },
  targets(g){ const out = [];
    micEach(g, 24, (i,j) => { const a = this.att(i,j); if (a.sk < 0.25) return;
      if (Math.hypot(a.x-g.cx, a.y-g.cy) < g.rad) out.push({ x:a.x, y:a.y, r:a.rad }); });
    return out; },
  hit(x,y,g){ let res = 'pared', found = false;
    micNear(x,y,24,(i,j)=>{ const a = this.att(i,j); if (a.sk < 0.25) return;
      const gx = a.x+Math.cos(a.rot)*a.rad*1.3, gy = a.y+Math.sin(a.rot)*a.rad*1.3;
      if (a.gema && Math.hypot(x-gx, y-gy) < a.rad*a.gr*1.1){ res = 'gema'; found = true; return; }
      const d = Math.hypot((x-a.x)/1.15, y-a.y);
      if (d < a.rad){ found = true; res = (g.mag>=100 && d < a.rad*0.45) ? 'vacuola' : (d > a.rad*0.82 ? 'pared' : 'madre'); } });
    return found ? res : 'madre'; } },

/* ------------------------------------------------------------- bacterias */
{ id:'bacterias', n:'Bacterias: bacilos y cocos', corto:'Bacterias', grupo:'microorganismo', em:'🦠',
  tin:'azul', plano:52, escala:'Un bacilo mide unos 3 µm de largo y un coco, menos de 1 µm: son las células más pequeñas de este microscopio.',
  prep:'Se hace un frotis de yogur natural o de sarro dental, se fija al calor y se tiñe. Sin tinción, las bacterias son prácticamente invisibles.',
  obs:{ 4:'Nada reconocible: el campo se ve limpio.', 10:'Apenas una suciedad azulada.', 40:'Puntos y bastoncitos en el límite de lo visible.', 100:'Con aceite de inmersión se distinguen los bacilos alargados y los cocos redondos en parejas y cadenas.' },
  labels:[ {id:'bacilo', n:'Bacilo (bacteria alargada)', fb:'Los bacilos son los bastoncitos rectos; a menudo aparecen en cadenas cortas.'},
           {id:'coco', n:'Coco (bacteria redonda)', fb:'Los cocos son los puntos redondos, muchas veces agrupados en parejas o en racimos.'},
           {id:'fondo', n:'Fondo del preparado', fb:'El fondo es el campo claro entre bacterias; a este aumento cualquier partícula suelta es un resto del frotis, no una célula.'} ],
  count:{ tag:'bacilo', n:'bacilos', dil:1, real:'un mililitro de yogur puede contener más de mil millones de bacterias' },
  att(i,j){ const r = micRng(i,j,101); return { x:(i+0.5+(r()-0.5)*0.85)*14, y:(j+0.5+(r()-0.5)*0.85)*14, rot:r()*6.28, tipo:r()<0.5?'bacilo':'coco', L:2.4+1.4*r(), sk:r() }; },
  draw(g){ const c = g.ctx, T = g.tin, P = micPal(T), mg = g.mag;
    /* matriz del frotis (proteínas del yogur) y restos: lo único visible con poco aumento */
    micBlotch(c, g, 101, micShade(P.det, 0.35), mg <= 10 ? 0.16 : 0.1, 1600);
    micRestos(c, g, 103, micShade(P.det, 0.1), 0.35);
    if (mg <= 10){ c.fillStyle = 'rgba(120,140,190,.08)'; c.fillRect(g.x0,g.y0,g.x1-g.x0,g.y1-g.y0); return; }
    const sp = micLod(g, 14);
    const bac = mg >= 100 ? micSpr(g, 'bacilo', 0, 4, (cc, r, rng, px) => { const L = r*1.9, w = r*0.55;
        micRect(cc, -L/2, -w/2, L, w, w/2); cc.fillStyle = micGrad(cc, -L*0.15, -w*0.2, 0, 0, 0, L*0.55, [[0, micShade(P.nuc, 0.25)], [1, micShade(P.nuc, -0.15)]]); cc.fill();
        cc.lineWidth = px; cc.strokeStyle = micCss(micShade(P.nuc, -0.4), 0.6); cc.stroke();
        micRect(cc, -L*0.32, -w*0.28, L*0.5, w*0.2, w*0.1); cc.fillStyle = 'rgba(255,255,255,.2)'; cc.fill(); }, 1.1) : null;
    const coc = mg >= 100 ? micSpr(g, 'coco', 0, 1.1, (cc, r, rng, px) => { cc.beginPath(); cc.arc(0, 0, r*0.92, 0, Math.PI*2);
        cc.fillStyle = micGrad(cc, -r*0.3, -r*0.3, 0, 0, 0, r, [[0, micShade(P.nuc, 0.3)], [1, micShade(P.nuc, -0.2)]]); cc.fill(); }, 1.2) : null;
    micEach(g, sp, (i,j) => { const a = this.att(i,j); if (a.sk < 0.35) return;
      const x = (i+0.5+((a.sk*7)%1-0.5)*0.85)*sp, y = a.y*sp/14;
      const px = sp===14 ? a.x : x, py = sp===14 ? a.y : y;
      if (a.tipo === 'bacilo'){
        if (bac) micPut(c, bac, px, py, a.L*1.053, a.L*1.053, a.rot, 1.1);
        else { c.save(); c.translate(px, py); c.rotate(a.rot); micRect(c, -a.L/2, -0.55, a.L, 1.1, 0.55); c.fillStyle = micCss(P.det, 0.85); c.fill(); c.restore(); } }
      else if (coc){ micPut(c, coc, px, py, 1.1, 1.1, 0, 1.2); micPut(c, coc, px+1.2, py+0.4, 1.1, 1.1, 0, 1.2); }
      else micEll(c, px, py, 0.5, 0.5, 0, micCss(P.det, 0.85));
    }); },
  targets(g){ const out = [];
    micEach(g, 14, (i,j) => { const a = this.att(i,j); if (a.sk<0.35 || a.tipo!=='bacilo') return;
      if (Math.hypot(a.x-g.cx, a.y-g.cy) < g.rad) out.push({ x:a.x, y:a.y, r:1.6 }); });
    return out; },
  hit(x,y,g){ let res = 'fondo';
    if (g.mag <= 10) return 'fondo';
    micNear(x,y,14,(i,j)=>{ const a = this.att(i,j); if (a.sk < 0.35) return;
      const d = Math.hypot(x-a.x, y-a.y);
      if (a.tipo==='bacilo' && d < a.L*0.7) res = 'bacilo';
      else if (a.tipo==='coco' && d < 1.6) res = 'coco'; });
    return res; } },

/* ------------------------------------------------------------- protozoos */
{ id:'protozoos', n:'Agua estancada: protozoos', corto:'Protozoos', grupo:'microorganismo', em:'💧', anim:true,
  tin:'ninguna', plano:-160, escala:'Un paramecio mide unos 200 µm y una ameba puede superar los 300 µm.',
  prep:'Se deja reposar agua de charco con hojas secas durante varios días y se monta una gota sin teñir: los colorantes matarían a los organismos y no se vería cómo se desplazan.',
  obs:{ 4:'Puntos claros que se desplazan por el campo.', 10:'Se distinguen formas alargadas que nadan y masas que fluyen.', 40:'El paramecio tiene forma de zapatilla y nada girando; la ameba cambia de forma emitiendo pseudópodos.', 100:'Se ven los cilios del paramecio, su macronúcleo y las vacuolas.' },
  labels:[ {id:'paramecio', n:'Paramecio', fb:'El paramecio tiene forma fija de zapatilla, se desplaza rápido y en línea y está cubierto de cilios.'},
           {id:'ameba', n:'Ameba', fb:'La ameba no tiene forma fija: emite pseudópodos y avanza lentamente, como si se derramara.'},
           {id:'cilios', n:'Cilios', fb:'Los cilios son los filamentos cortísimos del borde del paramecio que baten y lo impulsan.'},
           {id:'vacuola', n:'Vacuola', fb:'Las vacuolas son los círculos claros del interior; unas digieren el alimento y otras expulsan el agua sobrante.'},
           {id:'detrito', n:'Detrito', fb:'Los detritos son restos vegetales sin vida: no se mueven por sí mismos ni tienen contorno celular.'} ],
  att(i,j){ const r = micRng(i,j,103); return { hx:(i+0.5+(r()-0.5)*0.7)*150, hy:(j+0.5+(r()-0.5)*0.7)*150, tipo:r()<0.55?'paramecio':'ameba', v:26+30*r(), dir:r()*6.28, ph:r()*6.28, rad:26+16*r(), sk:r() }; },
  pos(a, t){ if (a.tipo === 'paramecio'){ const ang = a.dir + Math.sin(t*0.35+a.ph)*0.6;
      return { x:a.hx + Math.cos(ang)*Math.sin(t*0.22+a.ph)*110, y:a.hy + Math.sin(ang)*Math.sin(t*0.22+a.ph)*110, ang }; }
    return { x:a.hx + Math.sin(t*0.09+a.ph)*46, y:a.hy + Math.cos(t*0.07+a.ph)*46, ang:a.dir }; },
  draw(g){ const c = g.ctx; const t = g.anim ? g.t : 0, mg = g.mag;
    c.fillStyle = 'rgba(222,236,230,.35)'; c.fillRect(g.x0,g.y0,g.x1-g.x0,g.y1-g.y0);
    micBlotch(c, g, 105, [150,160,110,1], 0.14, 2600);
    /* algas y bacterias sueltas en el agua */
    if (mg >= 10) micEach(g, 70, (i,j) => { const r = micRng(i,j,139); if (r() < 0.7) return;
      const x = (i+r())*70, y = (j+r())*70, rr = 2.5 + 3*r();
      micEll(c, x, y, rr, rr, 0, micGrad(c, x-rr*0.3, y-rr*0.3, 0, x, y, rr, [[0, 'rgba(150,200,110,.85)'], [1, 'rgba(70,130,60,.85)']]), 'rgba(50,90,40,.5)', 0.5); });
    const detr = micSpr(g, 'detrito'+(mg >= 40 ? 'd' : ''), 0, 22, (cc, r, rng, px) => {
      micBlob(cc, 0, 0, r*0.62, 11, () => rng(), 0.7); cc.fillStyle = micGrad(cc, -r*0.2, -r*0.2, 0, 0, 0, r*0.7, [[0, 'rgba(170,150,100,.9)'], [1, 'rgba(118,96,62,.9)']]); cc.fill();
      cc.lineWidth = px*1.2; cc.strokeStyle = 'rgba(80,64,40,.6)'; cc.stroke();
      if (mg >= 40) for (let k=0;k<5;k++){ cc.beginPath(); cc.moveTo(-r*0.5+rng()*r*0.2, (rng()-0.5)*r*0.6); cc.lineTo(r*0.4, (rng()-0.5)*r*0.6); cc.lineWidth = px; cc.strokeStyle = 'rgba(90,72,44,.4)'; cc.stroke(); } });
    micEach(g, 130, (i,j) => { const r = micRng(i,j,107); if (r() < 0.55) return;
      const x = (i+0.5+(r()-0.5)*0.8)*130, y = (j+0.5+(r()-0.5)*0.8)*130, rot = r()*6.28;
      micPut(c, detr, x, y, 22, 10, rot); });
    micEach(g, 150, (i,j) => { const a = this.att(i,j); if (a.sk < 0.45) return; const p = this.pos(a, t);
      if (a.tipo === 'paramecio'){ c.save(); c.translate(p.x,p.y); c.rotate(p.ang);
        const L = a.rad*2.6, Wd = a.rad*0.95;
        /* zapatilla: un lado algo aplanado por el surco oral */
        c.beginPath(); c.ellipse(0, 0, L, Wd, 0, 0, Math.PI*2);
        c.fillStyle = micGrad(c, -L*0.2, -Wd*0.3, 0, 0, 0, L, [[0, 'rgba(240,246,238,.96)'], [0.7, 'rgba(222,234,222,.95)'], [1, 'rgba(196,214,200,.95)']]); c.fill();
        c.lineWidth = mg>=40 ? 2.2 : 1.4; c.strokeStyle = 'rgba(80,112,94,.95)'; c.stroke();
        if (mg >= 40){ c.beginPath(); c.ellipse(0, 0, L-2.5, Wd-2.2, 0, 0, Math.PI*2); c.lineWidth = 1; c.strokeStyle = 'rgba(255,255,255,.55)'; c.stroke();
          /* surco oral */
          c.beginPath(); c.moveTo(L*0.35, -Wd*0.85); c.quadraticCurveTo(-L*0.05, -Wd*0.1, -L*0.1, Wd*0.15); c.lineWidth = 1.4; c.strokeStyle = 'rgba(96,126,106,.6)'; c.stroke();
          const rv = micRng(i,j,141);
          for (let k=0;k<6;k++){ const vx = (rv()-0.5)*L*1.2, vy = (rv()-0.5)*Wd*0.9, vr = a.rad*(0.1+0.08*rv());
            micEll(c, vx, vy, vr, vr, 0, `rgba(${150+Math.round(40*rv())},${150+Math.round(30*rv())},96,.55)`, 'rgba(110,120,80,.5)', 0.5); }
          micEll(c, -a.rad*0.5, 0, a.rad*0.34, a.rad*0.3, 0, 'rgba(118,146,126,.9)');
          /* vacuolas contráctiles: a 1000 aumentos se ven sus canales radiales */
          [[a.rad*1.1, -a.rad*0.2, a.rad*0.26], [-a.rad*1.5, a.rad*0.2, a.rad*0.22]].forEach(([vx, vy, vr], q) => {
            if (mg >= 100){ c.strokeStyle = 'rgba(150,180,160,.7)'; c.lineWidth = 0.9;
              for (let k=0;k<7;k++){ const th = k/7*6.28 + q + t*0.3; c.beginPath(); c.moveTo(vx+Math.cos(th)*vr, vy+Math.sin(th)*vr);
                c.lineTo(vx+Math.cos(th)*vr*2.3, vy+Math.sin(th)*vr*2.3*0.8); c.stroke(); } }
            const pul = 1 + (g.anim ? 0.12*Math.sin(t*1.6 + q*2) : 0);
            micEll(c, vx, vy, vr*pul, vr*pul, 0, micGrad(c, vx-vr*0.3, vy-vr*0.3, 0, vx, vy, vr, [[0, 'rgba(255,255,255,.95)'], [1, 'rgba(236,246,240,.85)']]), 'rgba(110,140,120,.7)', 0.8); });
          const rg2 = micRng(i,j,137);
          for (let k=0;k<26;k++){ const u = (rg2()*2-1), v = (rg2()*2-1); if (u*u+v*v > 0.85) continue;
            micEll(c, u*a.rad*2.3, v*a.rad*0.8, a.rad*0.06, a.rad*0.06, 0, 'rgba(120,148,128,.55)'); } }
        if (g.mag >= 100){ c.strokeStyle = 'rgba(120,150,130,.85)'; c.lineWidth = 0.8;
          for (let k=0;k<58;k++){ const th = k/58*Math.PI*2, ex = Math.cos(th)*a.rad*2.6, ey = Math.sin(th)*a.rad*0.95;
            const nx = Math.cos(th)/2.6, ny = Math.sin(th)/0.95, L = Math.hypot(nx,ny);
            const w = Math.sin(t*6 + k*0.8)*1.6;
            c.beginPath(); c.moveTo(ex,ey); c.lineTo(ex+nx/L*4.5+w, ey+ny/L*4.5); c.stroke(); } }
        c.restore(); }
      else { const rg = (k)=> micRng(i+k,j,109)();
        c.save(); c.translate(p.x,p.y);
        const pts = [];
        for (let k=0;k<16;k++){ const th = k/16*Math.PI*2;
          const rr = a.rad*1.5*(1 + 0.42*Math.sin(th*2 + t*0.5 + a.ph) + (rg(k)-0.5)*0.3);
          pts.push([Math.cos(th)*rr, Math.sin(th)*rr]); }
        const md = (u,v) => [(u[0]+v[0])/2, (u[1]+v[1])/2];
        let m0 = md(pts[15], pts[0]); c.beginPath(); c.moveTo(m0[0], m0[1]);
        for (let k=0;k<16;k++){ const q = pts[k], mm = md(q, pts[(k+1)%16]); c.quadraticCurveTo(q[0], q[1], mm[0], mm[1]); }
        c.closePath();
        c.fillStyle = micGrad(c, 0, 0, 0, 0, 0, a.rad*2, [[0, 'rgba(214,226,214,.96)'], [0.7, 'rgba(228,238,230,.95)'], [1, 'rgba(242,248,244,.95)']]); c.fill();
        c.strokeStyle = 'rgba(86,118,100,.95)'; c.lineWidth = g.mag>=40?2.2:1.2; c.stroke();
        if (mg >= 40){ /* ectoplasma hialino en el borde, endoplasma granuloso dentro */
          c.save(); c.clip(); c.lineWidth = a.rad*0.35; c.strokeStyle = 'rgba(250,253,250,.55)'; c.stroke();
          const gp = micGranPat(c, g, 'ameba', 30, 50, 0.4, 1.1, [110,136,116,1], 0.2, 0.55);
          if (gp){ c.fillStyle = gp; c.globalAlpha = 0.8; c.fill(); c.globalAlpha = 1; }
          c.restore(); }
        if (g.mag >= 40){ micEll(c, a.rad*0.2, 0, a.rad*0.3, a.rad*0.26, 0, 'rgba(126,152,132,.9)');
          for (let k=0;k<4;k++) micEll(c, Math.cos(k*1.9)*a.rad*0.7, Math.sin(k*1.9)*a.rad*0.7, a.rad*0.2, a.rad*0.2, 0, 'rgba(255,255,255,.8)', 'rgba(120,150,130,.5)', 0.6);
          for (let k=0;k<30;k++){ const u = (rg(k+40)*2-1), v = (rg(k+70)*2-1); if (u*u+v*v > 0.8) continue;
            micEll(c, u*a.rad*1.2, v*a.rad*1.2, a.rad*0.055, a.rad*0.055, 0, 'rgba(120,148,128,.5)'); } }
        c.restore(); }
    }); },
  hit(x,y,g){ const t = g.anim ? g.t : 0; let res = null;
    micNear(x,y,150,(i,j)=>{ const a = this.att(i,j); if (a.sk<0.45) return; const p = this.pos(a,t);
      if (a.tipo==='paramecio'){ const dx = (x-p.x)*Math.cos(-p.ang) - (y-p.y)*Math.sin(-p.ang), dy = (x-p.x)*Math.sin(-p.ang) + (y-p.y)*Math.cos(-p.ang);
        const d = Math.hypot(dx/(a.rad*2.6), dy/(a.rad*0.95));
        if (d < 1.28 && d > 1 && g.mag>=100) res = 'cilios';
        else if (d < 1){ res = 'paramecio';
          if (g.mag>=40 && (Math.hypot(dx-a.rad*1.1, dy+a.rad*0.2) < a.rad*0.3 || Math.hypot(dx+a.rad*1.5, dy-a.rad*0.2) < a.rad*0.26)) res = 'vacuola'; } }
      else { const d = Math.hypot(x-p.x, y-p.y); if (d < a.rad*1.6) res = 'ameba'; } });
    if (res) return res;
    micNear(x,y,130,(i,j)=>{ const r = micRng(i,j,107); if (r()<0.55) return;
      if (Math.hypot(x-(i+0.5+(r()-0.5)*0.8)*130, y-(j+0.5+(r()-0.5)*0.8)*130) < 11) res = 'detrito'; });
    return res || 'detrito'; } },

/* --------------------------------------------------------------- estomas */
{ id:'estomas', n:'Estomas de una hoja', corto:'Estomas', grupo:'vegetal', em:'🍃',
  tin:'ninguna', plano:136, escala:'Un estoma completo mide unos 40 µm; el ostiolo abierto, unos 8 µm.',
  prep:'Se pinta el envés de la hoja con esmalte transparente, se deja secar y se despega con cinta adhesiva: queda un molde exacto de la epidermis.',
  obs:{ 4:'Una superficie verdosa con puntitos repartidos.', 10:'Los puntitos se distribuyen sin orden entre las demás células.', 40:'Cada estoma es un par de células con forma de frijol que dejan una abertura entre ellas.', 100:'Las células oclusivas tienen cloroplastos; las células epidérmicas vecinas no.' },
  labels:[ {id:'oclusiva', n:'Célula oclusiva', fb:'Las células oclusivas son las dos células arriñonadas que forman el estoma; al llenarse de agua se curvan y abren el poro.'},
           {id:'ostiolo', n:'Ostiolo (poro)', fb:'El ostiolo es la abertura alargada entre las dos células oclusivas: por allí entra el CO₂ y sale el vapor de agua.'},
           {id:'epidermica', n:'Célula epidérmica', fb:'Las células epidérmicas son las grandes, de contorno irregular como piezas de rompecabezas, y no tienen cloroplastos.'},
           {id:'cloro', n:'Cloroplasto de la oclusiva', fb:'Los cloroplastos son los gránulos verdes que solo aparecen dentro de las células oclusivas.'} ],
  att(i,j){ const r = micRng(i,j,113); return { x:(i+0.5+(r()-0.5)*0.7)*150, y:(j+0.5+(r()-0.5)*0.7)*150, rot:r()*6.28, ab:0.35+0.65*r(), sk:r() }; },
  draw(g){ const c = g.ctx, mg = g.mag, minW = 0.6/g.s;
    c.fillStyle = 'rgb(206,226,196)'; c.fillRect(g.x0, g.y0, g.x1-g.x0, g.y1-g.y0);
    /* células epidérmicas en rompecabezas: contorno lobulado y paredes onduladas */
    micEach(g, 62, (i,j) => { const rg = (k)=>micRng(i+k,j,127)();
      const r = micRng(i,j,119); const x = (i+0.5+(r()-0.5)*0.5)*62, y = (j+0.5+(r()-0.5)*0.5)*62;
      const v = micRng(i,j,131), ph = v()*6.28, lob = 4 + Math.floor(v()*3), n = g.low || mg <= 4 ? 16 : 26, pts = [];
      for (let k=0;k<n;k++){ const th = k/n*6.283, rr = 35*(1 + 0.12*Math.sin(th*lob + ph) + (rg(k)-0.5)*0.26); pts.push([x+Math.cos(th)*rr, y+Math.sin(th)*rr]); }
      c.beginPath(); pts.forEach((p, k) => { const q = pts[(k+1)%n], m = [(p[0]+q[0])/2, (p[1]+q[1])/2]; k ? c.quadraticCurveTo(p[0], p[1], m[0], m[1]) : c.moveTo(m[0], m[1]); }); c.closePath();
      const t = v();
      c.fillStyle = `rgba(${Math.round(210+12*t)},${Math.round(230+8*t)},${Math.round(200+10*t)},.9)`; c.fill();
      c.strokeStyle = 'rgba(104,146,96,.85)'; c.lineWidth = Math.max(mg>=40 ? 1.8 : 1.2, minW*1.6); c.stroke();
      if (mg >= 40){ c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 0.6; c.stroke(); } });
    const clo = mg >= 100 ? micSpr(g, 'clor-est', 0, 3.4, (cc, r) => { cc.beginPath(); cc.ellipse(0, 0, r, r*0.8, 0, 0, Math.PI*2);
      cc.fillStyle = micGrad(cc, -r*0.3, -r*0.3, 0, 0, 0, r, [[0, [110,176,90,1]], [1, [34,104,40,1]]]); cc.fill(); }) : null;
    micEach(g, 150, (i,j) => { const a = this.att(i,j); if (a.sk < 0.35) return;
      c.save(); c.translate(a.x, a.y); c.rotate(a.rot); const sep = 3.5 + 5*a.ab, gy = 7.5+3*(1-a.ab);
      /* halo de células anexas */
      micEll(c, 0, 0, 25, sep*0.55+gy+5, 0, 'rgba(200,226,190,.55)', 'rgba(110,150,100,.5)', 1);
      [-1,1].forEach(s => { const cy = s*sep*0.55;
        c.beginPath(); c.ellipse(0, cy, 18, gy, 0, 0, Math.PI*2);
        c.fillStyle = micGrad(c, -5, cy - s*gy*0.3, 0, 0, cy, 18, [[0, [206,234,194,1]], [0.7, [176,214,164,1]], [1, [146,190,134,1]]]); c.fill();
        c.lineWidth = mg>=40 ? 1.6 : 1; c.strokeStyle = 'rgba(80,128,74,.9)'; c.stroke(); });
      /* ostiolo con la pared interna engrosada */
      const ox = 9*a.ab+2, oy = sep*0.5;
      micEll(c, 0, 0, ox+1.6, oy+1.6, 0, 'rgba(70,110,64,.85)');
      micEll(c, 0, 0, ox, oy, 0, micGrad(c, 0, 0, 0, 0, 0, ox, [[0, '#18222a'], [1, '#2c3a40']]));
      if (clo){ for (let k=0;k<14;k++){ const s2 = k<7?-1:1, u = (k%7)/7;
        micPut(c, clo, -13+u*26, s2*(sep*0.55 + (u-0.5)*2), 3.4, 3.4, u*2); } }
      else if (mg >= 40){ [-1,1].forEach(s => micEll(c, 0, s*sep*0.55, 12, 4, 0, 'rgba(90,160,84,.4)')); }
      c.restore(); });
    micBlotch(c, g, 137, [60,100,50,1], 0.12, 2400); },
  hit(x,y,g){ let res = 'epidermica';
    micNear(x,y,150,(i,j)=>{ const a = this.att(i,j); if (a.sk<0.35) return;
      const dx = (x-a.x)*Math.cos(-a.rot) - (y-a.y)*Math.sin(-a.rot), dy = (x-a.x)*Math.sin(-a.rot) + (y-a.y)*Math.cos(-a.rot);
      const sep = 3.5+5*a.ab;
      if (Math.hypot(dx/(9*a.ab+2), dy/(sep*0.5)) < 1){ res = 'ostiolo'; return; }
      if (Math.abs(dx) < 19 && Math.abs(dy) < sep*0.55+11){
        res = (g.mag>=100 && Math.abs(Math.abs(dy)-sep*0.55) < 3) ? 'cloro' : 'oclusiva'; } });
    return res; } }
];
const MIC_BY_ID = Object.fromEntries(MIC_MUESTRAS.map(m => [m.id, m]));

/* ---------- retos de identificación ---------- */
const MIC_RETOS = [
  { muestra:'cebolla',
    q:{ q:'Observa la muestra sin nombre. ¿Qué estás viendo?',
        ops:['Epidermis de cebolla: tejido vegetal','Epitelio de mucosa bucal: tejido animal','Una colonia de levaduras','Tejido muscular estriado'],
        ok:0, fb:'Las células forman un mosaico compacto, con contornos rectos y una pared gruesa común entre vecinas: es tejido vegetal.',
        wrong:['Fíjate en la organización: aquí las células están unidas, con contornos rectos y una pared rígida compartida. Las células del epitelio bucal aparecen sueltas, aplastadas y de contorno irregular, porque solo tienen membrana.',
               'Las levaduras son células sueltas, ovaladas y unas cien veces más pequeñas que estas; además, muchas llevarían una gema.',
               'El músculo estriado se ve como fibras larguísimas y paralelas con estrías transversales, no como un mosaico de celdas cerradas.'] },
    q2:{ q:'¿Qué rasgo confirma que es una célula vegetal y no animal?',
        ops:['El tamaño grande de las células','La pared celular rígida y la disposición en mosaico, sin espacios','La presencia de núcleo'],
        ok:1, fb:'La pared celular es exclusiva de vegetales, hongos y bacterias; en el tejido vegetal obliga a las células a encajar como ladrillos.',
        wrong:['Hay células animales aún mayores, como el óvulo o las neuronas: el tamaño no decide.','El núcleo lo tienen las dos: todas las células eucariotas, vegetales y animales, lo poseen.'] } },
  { muestra:'levadura',
    q:{ q:'Muestra sin nombre a 400 aumentos. ¿Qué organismo es?',
        ops:['Glóbulos rojos humanos','Levaduras en gemación','Bacterias cocáceas','Protozoos'],
        ok:1, fb:'Son ovaladas, de tamaño desigual y varias llevan una protuberancia unida: la gema. La levadura es un hongo unicelular que se reproduce por gemación.',
        wrong:['Los glóbulos rojos son todos iguales, perfectamente redondos, con el centro más pálido y nunca presentan protuberancias ni se dividen: carecen de núcleo.',
               'Los cocos son diez veces más pequeños (menos de 1 µm) y a 400 aumentos apenas serían puntos; además, no forman gemas.',
               'Los protozoos son mucho mayores (cientos de micrómetros), se desplazan y tienen estructuras internas visibles.'] },
    q2:{ q:'¿Qué observación permite descartar que sean glóbulos rojos?',
        ops:['Que algunas células tienen una yema pegada y los tamaños son desiguales','Que el color es azulado','Que están muy juntas'],
        ok:0, fb:'La gemación deja células madre e hijas de distinto tamaño unidas; un glóbulo rojo jamás se divide porque no tiene núcleo.',
        wrong:['El color depende del colorante que usaste, no del organismo: no sirve para identificar.','Los glóbulos rojos también aparecen muy juntos en un extendido.'] } },
  { muestra:'bacterias',
    q:{ q:'Muestra sin nombre observada a 1000 aumentos con aceite. ¿Qué son estos cuerpos diminutos?',
        ops:['Protozoos','Bacterias (bacilos y cocos)','Cloroplastos sueltos','Plaquetas'],
        ok:1, fb:'Miden entre 0,5 y 3 µm, no tienen estructuras internas visibles ni se desplazan con forma propia: son células procariotas.',
        wrong:['Un protozoo es entre cincuenta y doscientas veces más grande, se ve entero a 100 aumentos y muestra vacuolas y cilios o pseudópodos. Compara el tamaño con la escala del campo.',
               'Los cloroplastos son verdes y están siempre dentro de una célula vegetal; aquí no hay célula que los contenga.',
               'Las plaquetas aparecen en sangre, entre glóbulos rojos, y aquí no hay ni un solo glóbulo rojo en el campo.'] },
    q2:{ q:'¿Qué criterio de tamaño usaste para separar bacteria de protozoo?',
        ops:['La bacteria ocupa una fracción diminuta del campo de 180 µm; el protozoo ocuparía buena parte de él','La bacteria es más oscura','La bacteria se mueve más rápido'],
        ok:0, fb:'Comparar con el diámetro del campo visual es la forma más segura de estimar tamaños al microscopio.',
        wrong:['El tono depende de la tinción, no del organismo.','Algunas bacterias se mueven, pero eso no se aprecia en un frotis fijado y teñido.'] } },
  { muestra:'muscular',
    q:{ q:'Muestra sin nombre. ¿De qué tejido se trata?',
        ops:['Tejido nervioso','Tejido muscular estriado','Epidermis de cebolla','Tejido epitelial'],
        ok:1, fb:'Fibras larguísimas y paralelas, con estrías transversales y núcleos pegados al borde: es músculo esquelético.',
        wrong:['El tejido nervioso muestra cuerpos celulares estrellados con prolongaciones que salen en varias direcciones, no bandas paralelas.',
               'La cebolla forma un mosaico de celdas cerradas con pared; aquí las células se extienden en una sola dirección y no hay paredes rectas transversales.',
               'El epitelio está formado por células planas y compactas de contorno irregular, sin estrías.'] },
    q2:{ q:'¿Qué significan las estrías transversales?',
        ops:['Que el corte quedó rayado al prepararlo','Que las proteínas contráctiles están alineadas en sarcómeros repetidos','Que hay muchas células apiladas'],
        ok:1, fb:'La alternancia de bandas claras y oscuras corresponde a la disposición ordenada de actina y miosina dentro de cada fibra.',
        wrong:['Las rayas de un corte mal hecho serían irregulares y no se repetirían con una separación constante.','No son células apiladas: cada fibra es una sola célula con muchos núcleos.'] } }
];

/* =====================================================================
   VISTA
   ===================================================================== */
function micView(view, params){
  const micAnim = () => (typeof motionOK === 'function' ? motionOK() : true) && !Store.s.a11y.motion;
  view.classList.add('wide');

  const St = {
    muestraId: (params && params.muestra && MIC_BY_ID[params.muestra]) ? params.muestra : 'cebolla',
    obj:0, macro:0, micro:0, x:0, y:0, luz:55, aceite:false, tincion:'lugol',
    prep:{ paso:0, burbujas:false, hecha:false },
    modo:'observar', tab:'prep', regla:false, ciego:false,
    medA:null, medB:null, contados:[], etiquetas:[], aciertos:0, fallos:0,
    manejo:[], retoIdx:0, retoOk:0, retoIntentos:0, t0:performance.now()
  };
  const M = () => MIC_BY_ID[St.muestraId];
  const O = () => MIC_OBJ[St.obj];
  const fov = () => O().fov;
  const foco = () => St.macro + St.micro;
  const desenf = () => foco() - M().plano;
  const sinAceite = () => O().aceite && !St.aceite;
  const nitido = () => Math.abs(desenf()) <= O().dof*0.6 && !sinAceite();

  /* -------------------- encabezado y franja de propósito -------------------- */
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'},
    h('div',{},
      h('span',{class:'eyebrow cell'},'Recurso transversal · Mundo celular · Cuerpo humano · Biodiversidad · CN 8.º U1 · 9.º U2 · 10.º U1'),
      h('h1',{},'Microscopio virtual'),
      h('p',{},'Prepara la muestra, enciende la luz, enfoca y recorre la platina. El microscopio responde como el del laboratorio: si el diafragma está casi cerrado no hay contraste, si el objetivo no está enfocado la imagen se ve borrosa y el objetivo de inmersión no sirve sin una gota de aceite.')),
    h('span',{class:'pill cell'},'+100 XP · 20–30 min')));

  const retoSt = h('div',{class:'notice'},'Pendiente: todavía no has identificado ninguna muestra a ciegas.');
  const retoHecho = () => !!(Store.s.activities && Store.s.activities['reto-microscopio'] && Store.s.activities['reto-microscopio'].done);
  if (retoHecho()){ retoSt.className = 'notice ok'; retoSt.textContent = 'Reto resuelto ✓'; }
  view.append(h('section',{class:'reto static'+(retoHecho()?' done':'')}, h('div',{class:'reto-body'},
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'Propósito'),
      h('p',{},'Manejar correctamente el microscopio óptico y reconocer células y microorganismos por su forma, su tamaño y la manera en que se organizan, no por el nombre que trae la etiqueta.')),
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'Observa'),
      h('ul',{class:'checks plain'}, [
        'Cómo cambia lo que se ve al pasar de 40 a 1000 aumentos en la misma muestra',
        'Qué le ocurre al contraste cuando cierras o abres demasiado el diafragma',
        'Cuánto se reduce el campo visual y la profundidad de foco al subir de objetivo',
        'Qué diferencia la organización de un tejido vegetal de la de uno animal'
      ].map(t => h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), t)))),
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'🎯 Reto'),
      h('p',{style:'font-weight:600'},'Identifica tres muestras presentadas sin nombre y justifica cada identificación por la forma y la organización de las células.'),
      retoSt))));

  /* -------------------- escenario -------------------- */
  const stage = h('div',{class:'mic-stage'});
  const cv = h('canvas',{tabindex:'0',role:'img','aria-label':'Campo visual del microscopio'});
  const topBar = h('div',{class:'mic-top'}), botBar = h('div',{class:'mic-bot'});
  stage.append(cv, topBar, botBar);
  const panel = h('div',{class:'mic-panel'});
  view.append(h('div',{class:'mic-lay'}, stage, panel));

  const buf = document.createElement('canvas');
  let raf = null, alive = true, W = 0, H = 0, R = 0, dpr = 1;

  /* estado geométrico del campo */
  function geom(){
    const f = fov(), s = (2*R)/f;
    const m = f*0.58 + 10;   /* margen: el desenfoque lee un poco más allá del borde del campo */
    return { s, f, cx:St.x, cy:St.y, rad:f/2,
             x0:St.x - m, x1:St.x + m, y0:St.y - m, y1:St.y + m };
  }
  function w2s(x, y){ const gg = geom(); return [ W/2 + (x-gg.cx)*gg.s, H/2 + (y-gg.cy)*gg.s ]; }
  function s2w(px, py){ const gg = geom(); return [ gg.cx + (px - W/2)/gg.s, gg.cy + (py - H/2)/gg.s ]; }

  /* -------------------- dibujo -------------------- */
  let trans = null;           /* transición al girar el revólver */
  const low = MIC_LOW();
  function draw(){
    raf = null;
    if (!alive || !cv.isConnected) return;
    const cw = stage.clientWidth || 640, ch = stage.clientHeight || 520;
    dpr = Math.min(window.devicePixelRatio || 1, low ? 1.5 : 2);
    if (cv.width !== Math.round(cw*dpr) || cv.height !== Math.round(ch*dpr)){
      cv.width = Math.round(cw*dpr); cv.height = Math.round(ch*dpr);
      buf.width = cv.width; buf.height = cv.height;
    }
    W = cw; H = ch; R = Math.min(cw, ch)*0.44;
    const gg = geom(), m = M();
    const bc = buf.getContext('2d');
    bc.setTransform(dpr,0,0,dpr,0,0); bc.clearRect(0,0,W,H);
    /* escena nítida: fondo del condensador y muestra (un poco más allá del borde para el desenfoque) */
    micFondo(bc, W, H, R);
    bc.translate(W/2, H/2); bc.scale(gg.s, gg.s); bc.translate(-gg.cx, -gg.cy);
    const g = Object.assign({}, gg, { ctx:bc, mag:O().m, tin:MIC_TIN[St.tincion], tk:St.tincion, dpr, low, t:(performance.now()-St.t0)/1000, anim:micAnim() });
    try { m.draw(g); } catch(e){ console.warn('microscopio: dibujo', e); }
    if (St.prep.burbujas){
      /* burbujas de aire: anillo grueso y oscuro por refracción, centro brillante */
      micEach(g, 520, (i,j) => { const r = micRng(i,j,131); if (r() < 0.55) return;
        const x = (i+0.5+(r()-0.5)*0.7)*520, y = (j+0.5+(r()-0.5)*0.7)*520, rr = 60+70*r();
        bc.beginPath(); bc.arc(x, y, rr, 0, Math.PI*2);
        bc.fillStyle = micGrad(bc, x, y, 0, x, y, rr, [[0, 'rgba(255,255,255,.55)'], [0.72, 'rgba(250,250,250,.4)'], [0.8, 'rgba(90,96,104,.55)'], [0.93, 'rgba(34,40,48,.85)'], [1, 'rgba(70,76,84,.6)']]);
        bc.fill();
        micEll(bc, x - rr*0.28, y - rr*0.3, rr*0.16, rr*0.1, -0.6, 'rgba(255,255,255,.7)'); });
    }
    bc.restore();

    /* óptica: enfoque, luz, contraste, grano, viñeteado */
    const c = cv.getContext('2d');
    c.setTransform(dpr,0,0,dpr,0,0);
    const d = desenf(), u = Math.abs(d)/O().dof;
    /* el desenfoque escala con el tamaño del campo en pantalla (la imagen es la misma, más chica o más grande) */
    let blur = nitido() || u <= 0.6 ? 0 : Math.min(R*0.055, (0.9 + (u-0.6)*2.4)*clamp(R/300, 0.45, 1.3));
    if (sinAceite()) blur += 7;
    let con = clamp(1 - Math.abs(St.luz-55)/95 - (St.luz > 82 ? (St.luz-82)/60 : 0), 0.3, 1);
    if (blur > 0) con *= clamp(1/(1 + 0.1*Math.max(0, u-0.6)), 0.6, 1);
    if (sinAceite()) con *= 0.75;
    const bri = (St.luz < 55 ? 0.28 + 0.72*(St.luz/55) : 1) * (sinAceite() ? 0.5 : 1);
    const wash = St.luz > 62 ? Math.pow((St.luz-62)/38, 1.3)*0.62 : 0;
    const halo = blur > 0 ? clamp(0.35 + 0.1*u, 0.35, 0.9) * (d > 0 ? 1 : 0.6) : 0;
    micOptica(c, buf, W, H, R, dpr, { blur, halo, con, bri, wash, sat: St.tincion === 'ninguna' ? 0.6 : 1, low, grain: 0.1 });

    overlay(c, gg);
    if (trans && !micTrans(c, trans, W, H, R)) trans = null;
    if (alive && (needsAnim() || trans)) raf = requestAnimationFrame(draw);
  }
  function needsAnim(){ const m = M(); return !!(m.anim && micAnim() && !document.hidden && O().m >= (m.animMin || 0)); }
  function redraw(){ if (raf) return; raf = requestAnimationFrame(draw); }

  /* -------------------- capa de dibujo propia (regla, marcas, retículo) ---- */
  function overlay(c, gg){
    const cx = W/2, cy = H/2;
    /* retículo central: es donde actúan todas las acciones con teclado */
    c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(cx-11, cy); c.lineTo(cx-3, cy); c.moveTo(cx+3, cy); c.lineTo(cx+11, cy);
    c.moveTo(cx, cy-11); c.lineTo(cx, cy-3); c.moveTo(cx, cy+3); c.lineTo(cx, cy+11); c.stroke();
    /* regla micrométrica */
    if (St.regla){
      const pasos = [1,2,5,10,20,50,100,200,500,1000];
      let paso = pasos.find(p => p*gg.s > 34) || 1000;
      const largo = Math.min(10, Math.floor((R*1.6)/(paso*gg.s)));
      const y = cy + R*0.72, x0 = cx - (largo*paso*gg.s)/2;
      c.fillStyle = 'rgba(10,12,16,.55)'; c.fillRect(x0-10, y-26, largo*paso*gg.s+20, 40);
      c.strokeStyle = '#fff'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x0, y); c.lineTo(x0+largo*paso*gg.s, y);
      for (let k=0;k<=largo;k++){ const px = x0 + k*paso*gg.s; c.moveTo(px, y-7); c.lineTo(px, y+7); }
      c.stroke();
      c.fillStyle = '#fff'; c.font = '11px ui-monospace,monospace'; c.textAlign = 'center';
      c.fillText(`${micFmt(largo*paso)} µm`, x0 + largo*paso*gg.s/2, y - 12);
      c.textAlign = 'left'; c.fillText(`cada división: ${micFmt(paso)} µm`, x0, y + 20);
    }
    /* marcas de conteo */
    if (St.contados.length){ c.strokeStyle = '#36d17a'; c.lineWidth = 1.6;
      St.contados.forEach(p => { const q = w2s(p.x, p.y); c.beginPath(); c.arc(q[0], q[1], 7, 0, Math.PI*2); c.stroke(); }); }
    /* medición A–B */
    const pintaPunto = (p, et) => { const q = w2s(p.x, p.y); c.strokeStyle = '#ffd166'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(q[0]-8,q[1]); c.lineTo(q[0]+8,q[1]); c.moveTo(q[0],q[1]-8); c.lineTo(q[0],q[1]+8); c.stroke();
      c.fillStyle = '#ffd166'; c.font = 'bold 12px ui-monospace,monospace'; c.fillText(et, q[0]+10, q[1]-8); };
    if (St.medA) pintaPunto(St.medA, 'A');
    if (St.medB) pintaPunto(St.medB, 'B');
    if (St.medA && St.medB){ const a = w2s(St.medA.x, St.medA.y), b = w2s(St.medB.x, St.medB.y);
      c.strokeStyle = '#ffd166'; c.setLineDash([5,4]); c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); c.setLineDash([]);
      const d = Math.hypot(St.medA.x-St.medB.x, St.medA.y-St.medB.y);
      c.fillStyle = '#ffd166'; c.font = 'bold 12px ui-monospace,monospace';
      c.fillText(`≈ ${micFmt(d, d<10?1:0)} µm`, (a[0]+b[0])/2 + 8, (a[1]+b[1])/2 - 6); }
    /* etiquetas puestas por el estudiante */
    St.etiquetas.forEach(e => { const q = w2s(e.x, e.y);
      if (Math.hypot(q[0]-W/2, q[1]-H/2) > R) return;
      c.strokeStyle = e.ok ? '#36d17a' : '#ff8f6b'; c.fillStyle = e.ok ? '#36d17a' : '#ff8f6b'; c.lineWidth = 1.6;
      c.beginPath(); c.arc(q[0], q[1], 6, 0, Math.PI*2); c.stroke();
      c.beginPath(); c.moveTo(q[0]+6, q[1]-6); c.lineTo(q[0]+20, q[1]-18); c.stroke();
      c.font = '11px system-ui,sans-serif'; const t = e.n;
      const w = c.measureText(t).width; c.fillStyle = 'rgba(10,12,16,.72)';
      c.fillRect(q[0]+20, q[1]-30, w+10, 16); c.fillStyle = e.ok ? '#36d17a' : '#ff8f6b';
      c.fillText(t, q[0]+25, q[1]-18); });
  }

  /* -------------------- lecturas en texto -------------------- */
  const readObj = h('span',{class:'mic-tag'}), readFoco = h('span',{class:'mic-tag'}), readLuz = h('span',{class:'mic-tag'}),
        readPos = h('span',{class:'mic-tag'}), readCampo = h('span',{class:'mic-tag'}), readMuestra = h('span',{class:'mic-tag'});
  const avisoTag = h('span',{class:'mic-tag warn',style:'display:none'});
  topBar.append(readMuestra, readObj, readCampo);
  botBar.append(readFoco, readLuz, readPos, avisoTag);
  const vivo = h('div',{class:'small muted','aria-live':'polite',style:'min-height:1em'});

  function lecturas(){
    const m = M(), o = O(), d = desenf();
    readMuestra.innerHTML = St.ciego ? '<b>Muestra sin identificar</b>' : `<b>${esc(m.n)}</b> · ${esc(MIC_TIN[St.tincion].n)}`;
    readObj.innerHTML = `Objetivo <b>${o.m}x</b> · ocular 10x · aumento total <b>${micFmt(o.m*10)}×</b>`;
    readCampo.textContent = `Campo visual: ${micFmt(o.fov)} µm de diámetro`;
    readFoco.textContent = nitido() ? 'Enfoque: imagen nítida' : `Enfoque: fuera de foco (${d>0?'+':'−'}${micFmt(Math.abs(d),1)} µm)`;
    readFoco.className = 'mic-tag' + (nitido() ? ' ok' : '');
    readLuz.textContent = `Diafragma: ${micFmt(St.luz)} % · ${St.luz<25?'poca luz, falta contraste':St.luz>82?'demasiada luz, imagen lavada':'contraste adecuado'}`;
    readPos.textContent = `Platina X: ${micFmt(St.x/1000,2)} mm · Y: ${micFmt(St.y/1000,2)} mm`;
    let aviso = '';
    if (sinAceite()) aviso = '⚠ Objetivo de 100x sin aceite de inmersión: la luz se desvía al pasar del cubre al aire y la imagen queda oscura y sin definición.';
    else if (St.prep.burbujas) aviso = '⚠ Hay burbujas de aire en el preparado: círculos de borde oscuro que no son células.';
    avisoTag.textContent = aviso; avisoTag.style.display = aviso ? '' : 'none';
    cv.setAttribute('aria-label', `Campo visual. Muestra: ${St.ciego?'sin identificar':m.n}. Aumento total ${o.m*10} aumentos. Campo de ${o.fov} micrómetros. ${nitido()?'Imagen nítida':'Imagen fuera de foco'}. Luz al ${St.luz} por ciento.`);
  }
  function di(txt){ vivo.textContent = txt; }

  /* -------------------- controles -------------------- */
  const cardCtrl = h('div',{class:'card stack'});
  /* revólver */
  const objsEl = h('div',{class:'mic-objs',role:'group','aria-label':'Revólver de objetivos'});
  MIC_OBJ.forEach((o, i) => objsEl.append(h('button',{class:'mic-obj','aria-pressed':String(i===St.obj),
    'aria-label':`${o.n}, ${o.m} aumentos, aumento total ${o.m*10}`,
    onclick:()=>setObj(i)}, `${o.m}x`, h('span',{class:'u'},`${o.m*10}× total`))));
  /* enfoque */
  const macroIn = h('input',{type:'range',min:-320,max:320,step:2,value:'0',id:'mic-macro','aria-label':'Tornillo macrométrico, en micrómetros'});
  const microIn = h('input',{type:'range',min:-30,max:30,step:'0.5',value:'0',id:'mic-micro','aria-label':'Tornillo micrométrico, en micrómetros'});
  const macroOut = h('output',{},'0 µm'), microOut = h('output',{},'0,0 µm');
  macroIn.addEventListener('input', () => setFoco('macro', +macroIn.value));
  microIn.addEventListener('input', () => setFoco('micro', +microIn.value));
  const knob = (lbl, inp, out, paso) => h('div',{class:'mic-knob'},
    h('button',{class:'btn sm','aria-label':`Bajar ${lbl}`,onclick:()=>{ inp.value = clamp(+inp.value-paso, +inp.min, +inp.max); inp.dispatchEvent(new Event('input')); }},'−'),
    h('div',{class:'stack',style:'gap:2px'}, h('label',{for:inp.id,style:'font-size:.78rem;font-weight:600'}, lbl, ' ', out), inp),
    h('button',{class:'btn sm','aria-label':`Subir ${lbl}`,onclick:()=>{ inp.value = clamp(+inp.value+paso, +inp.min, +inp.max); inp.dispatchEvent(new Event('input')); }},'+'));
  /* platina */
  const pasoPlat = () => Math.round(fov()/6);
  const pad = h('div',{class:'mic-pad',role:'group','aria-label':'Desplazamiento de la platina'});
  const padBtn = (txt, dx, dy, lab) => h('button',{'aria-label':lab,onclick:()=>mover(dx,dy)}, txt);
  pad.append(h('button',{disabled:true}), padBtn('↑',0,-1,'Mover la platina hacia arriba'), h('button',{disabled:true}),
             padBtn('←',-1,0,'Mover la platina a la izquierda'), h('button',{'aria-label':'Centrar la platina',onclick:()=>{ St.x=0; St.y=0; lecturas(); redraw(); di('Platina centrada.'); }},'⌖'), padBtn('→',1,0,'Mover la platina a la derecha'),
             h('button',{disabled:true}), padBtn('↓',0,1,'Mover la platina hacia abajo'), h('button',{disabled:true}));
  /* diafragma */
  const luzIn = h('input',{type:'range',min:0,max:100,value:'55',id:'mic-luz','aria-label':'Apertura del diafragma, en por ciento'});
  const luzOut = h('output',{},'55 %');
  luzIn.addEventListener('input', () => { St.luz = +luzIn.value; luzOut.value = micFmt(St.luz)+' %'; lecturas(); redraw();
    Store.log('microscopio',{accion:'diafragma', valor:St.luz}); });
  /* aceite */
  const aceiteBtn = h('button',{class:'btn sm','aria-pressed':'false',onclick:()=>{
    St.aceite = !St.aceite; aceiteBtn.setAttribute('aria-pressed', String(St.aceite));
    aceiteBtn.textContent = St.aceite ? 'Quitar el aceite de inmersión' : 'Poner una gota de aceite de inmersión';
    di(St.aceite ? 'Aceite de inmersión colocado sobre el cubreobjetos.' : 'Aceite retirado.');
    avisos(); lecturas(); redraw(); }},'Poner una gota de aceite de inmersión');
  const ayudaFoco = h('button',{class:'btn sm ghost',onclick:()=>{
    St.macro = Math.round(M().plano/2)*2; St.micro = clamp(M().plano - St.macro, -30, 30);
    macroIn.value = St.macro; microIn.value = St.micro; macroOut.value = micFmt(St.macro)+' µm'; microOut.value = micFmt(St.micro,1)+' µm';
    di('Enfoque asistido aplicado: la imagen quedó nítida.'); lecturas(); redraw();
    Store.log('microscopio',{accion:'enfoque_asistido', muestra:St.muestraId}); }},'Enfocar por mí (ayuda)');
  const avisoEl = h('div',{class:'notice warn',style:'display:none'});

  cardCtrl.append(
    h('span',{class:'eyebrow cell'},'Controles del microscopio'),
    h('span',{class:'small muted'},'Revólver de objetivos'), objsEl,
    knob('Macrométrico', macroIn, macroOut, 10),
    knob('Micrométrico', microIn, microOut, 1),
    h('div',{class:'mic-row'}, ayudaFoco),
    h('span',{class:'small muted'},'Platina'), pad,
    h('div',{class:'slider'}, h('label',{for:'mic-luz'},'Diafragma (luz)'), luzOut, luzIn),
    h('div',{class:'mic-row'}, aceiteBtn,
      h('button',{class:'btn sm','aria-pressed':'false',onclick:function(){ St.regla = !St.regla; this.setAttribute('aria-pressed', String(St.regla)); redraw(); di(St.regla?'Regla micrométrica activada.':'Regla desactivada.'); }},'Regla micrométrica')),
    avisoEl, vivo,
    h('p',{class:'mic-help'},'Con el teclado: las flechas mueven la platina, las teclas + y − giran el micrométrico, AvPág y RePág cambian de objetivo y Intro ejecuta la acción del modo activo en el centro del campo (el retículo).'));

  function avisos(){
    let t = '';
    if (sinAceite()) t = 'El objetivo de 100x es de inmersión: solo forma imagen si hay una gota de aceite entre el cubreobjetos y la lente. Coloca el aceite antes de observar.';
    else if (St.manejo.includes('macro40')) t = 'Con los objetivos de 40x y 100x el enfoque se hace únicamente con el tornillo micrométrico: el macrométrico puede hacer chocar la lente con el cubreobjetos y romperlo.';
    avisoEl.textContent = t; avisoEl.style.display = t ? 'flex' : 'none';
  }
  function setObj(i){
    const sube = i > St.obj;
    if (i !== St.obj && micAnim()){ const img = micSnap(cv);
      if (img) trans = { img, t0: performance.now(), dur: 480, ratio: clamp(MIC_OBJ[i].m/MIC_OBJ[St.obj].m, 0.4, 2.6) }; }
    St.obj = i; $$('.mic-obj', objsEl).forEach((b,k) => b.setAttribute('aria-pressed', String(k===i)));
    if (sube) di(`Objetivo de ${MIC_OBJ[i].m}x. Los objetivos son parafocales: la imagen queda casi enfocada, ahora se afina solo con el micrométrico.`);
    else di(`Objetivo de ${MIC_OBJ[i].m}x.`);
    if (MIC_OBJ[i].aceite && !St.aceite) di('Objetivo de inmersión sin aceite: la imagen está oscura y borrosa.');
    St.medA = null; St.medB = null;
    avisos(); lecturas(); redraw();
    Store.log('microscopio',{accion:'objetivo', valor:MIC_OBJ[i].m, muestra:St.muestraId});
  }
  function setFoco(cual, v){
    if (cual === 'macro'){
      if (O().m >= 40 && Math.abs(v - St.macro) >= 8 && !St.manejo.includes('macro40')){
        St.manejo.push('macro40');
        toast('Cuidado: con 40x y 100x se enfoca solo con el micrométrico.');
        Store.log('microscopio',{accion:'error_manejo', tipo:'macro_en_gran_aumento'});
      }
      St.macro = v; macroOut.value = micFmt(v)+' µm';
    } else { St.micro = v; microOut.value = micFmt(v,1)+' µm'; }
    avisos(); lecturas(); redraw();
  }
  function mover(dx, dy){
    const p = pasoPlat();
    St.x = clamp(St.x + dx*p, -4000, 4000); St.y = clamp(St.y + dy*p, -4000, 4000);
    lecturas(); redraw();
    di(`Platina en X ${micFmt(St.x/1000,2)} mm, Y ${micFmt(St.y/1000,2)} mm.`);
  }

  /* -------------------- acciones sobre el campo -------------------- */
  function estructuraEn(x, y){
    const gg = geom();
    const g = Object.assign({}, gg, { mag:O().m, t:(performance.now()-St.t0)/1000, anim:micAnim() });
    try { return M().hit(x, y, g); } catch(e){ console.warn('microscopio: hit', e); return null; }
  }
  function accion(x, y){
    if (!nitido() && St.modo !== 'observar'){ toast('Primero enfoca la imagen: no se puede medir ni etiquetar lo que está borroso.'); return; }
    if (St.modo === 'medir') medir(x, y);
    else if (St.modo === 'contar') contar(x, y);
    else if (St.modo === 'etiquetar') etiquetar(x, y);
    else { const e = estructuraEn(x, y); const lab = M().labels.find(l => l.id === e);
      di(lab ? `Bajo el retículo: ${lab.n}.` : 'Campo libre.'); toast(lab ? lab.n : 'Campo libre'); }
  }
  cv.addEventListener('click', ev => { const r = cv.getBoundingClientRect();
    const p = s2w(ev.clientX - r.left, ev.clientY - r.top);
    if (Math.hypot(p[0]-St.x, p[1]-St.y) > fov()/2) return;
    accion(p[0], p[1]); });
  cv.addEventListener('keydown', ev => {
    const k = ev.key;
    if (k === 'ArrowLeft'){ mover(-1,0); ev.preventDefault(); }
    else if (k === 'ArrowRight'){ mover(1,0); ev.preventDefault(); }
    else if (k === 'ArrowUp'){ mover(0,-1); ev.preventDefault(); }
    else if (k === 'ArrowDown'){ mover(0,1); ev.preventDefault(); }
    else if (k === '+' || k === '='){ microIn.value = clamp(+microIn.value+1, -30, 30); microIn.dispatchEvent(new Event('input')); ev.preventDefault(); }
    else if (k === '-'){ microIn.value = clamp(+microIn.value-1, -30, 30); microIn.dispatchEvent(new Event('input')); ev.preventDefault(); }
    else if (k === 'PageUp'){ setObj(Math.min(3, St.obj+1)); ev.preventDefault(); }
    else if (k === 'PageDown'){ setObj(Math.max(0, St.obj-1)); ev.preventDefault(); }
    else if (k === 'Enter' || k === ' '){ accion(St.x, St.y); ev.preventDefault(); }
  });

  /* ---- medir ---- */
  const medTxt = h('div',{class:'notice'},'Marca el punto A en un extremo de la estructura y el punto B en el otro.');
  function medir(x, y){
    if (!St.medA || (St.medA && St.medB)){ St.medA = {x,y}; St.medB = null; di('Punto A marcado.'); }
    else { St.medB = {x,y}; di('Punto B marcado.'); }
    if (St.medA && St.medB){
      const d = Math.hypot(St.medA.x-St.medB.x, St.medA.y-St.medB.y);
      medTxt.className = 'notice ok';
      medTxt.innerHTML = `<span>Distancia A–B: <b>≈ ${esc(micFmt(d, d<10?1:0))} µm</b> (${esc(micFmt(d/1000,3))} mm). Es una <b>estimación</b>: depende de dónde pusiste cada punto y del grosor de la marca.<br><span class="small muted">Referencia: ${esc(M().escala)}</span></span>`;
      Store.log('microscopio',{accion:'medicion', muestra:St.muestraId, um:Math.round(d)});
    } else { medTxt.className = 'notice'; medTxt.textContent = 'Punto A marcado. Ahora marca el punto B en el otro extremo (mueve la platina si hace falta y pulsa Intro con el retículo encima).'; }
    redraw();
  }
  /* ---- contar ---- */
  const contTxt = h('div',{class:'notice'},'Activa el modo contar y marca los glóbulos rojos que veas dentro del campo.');
  function contar(x, y){
    const m = M(); if (!m.count){ toast('En esta muestra no se hace conteo.'); return; }
    const gg = geom();
    const g = Object.assign({}, gg, { mag:O().m, t:0, anim:false });
    let objetivo = null;
    try { (m.targets(g)||[]).forEach(p => { if (Math.hypot(p.x-x, p.y-y) < Math.max(p.r*2.6, fov()*0.018)) objetivo = p; }); } catch(e){ console.warn(e); }
    if (!objetivo){ di('Ahí no hay ninguna célula que contar.'); toast('Ahí no hay ninguna célula que contar.'); return; }
    const ya = St.contados.findIndex(p => Math.hypot(p.x-objetivo.x, p.y-objetivo.y) < 1);
    if (ya >= 0){ St.contados.splice(ya,1); di('Marca retirada.'); }
    else { St.contados.push(objetivo); di(`Llevas ${St.contados.length} ${m.count.n} contados.`); }
    contCount.textContent = String(St.contados.length);
    redraw();
  }
  const contCount = h('b',{},'0');
  function calcularConcentracion(){
    const m = M(); if (!m.count) return;
    if (St.contados.length < 5){ toast('Marca al menos 5 células antes de calcular.'); return; }
    const d = fov(), areaMm2 = Math.PI*Math.pow(d/2000, 2), prof = 0.1;      /* cámara de recuento: 0,1 mm */
    const volMm3 = areaMm2*prof;                                             /* 1 mm³ = 1 µL */
    const porUl = St.contados.length/volMm3*m.count.dil;
    const gg = geom(); const g = Object.assign({}, gg, { mag:O().m, t:0, anim:false });
    let reales = 0; try { reales = (m.targets(g)||[]).length; } catch(e){}
    contTxt.className = 'notice ok';
    contTxt.innerHTML = `<span>Contaste <b>${St.contados.length}</b> ${esc(m.count.n)} en un campo de ${esc(micFmt(d))} µm de diámetro.<br>`
      + `Área del campo ≈ ${esc(micFmt(areaMm2,4))} mm² · profundidad de la cámara 0,1 mm → volumen ≈ ${esc(micFmt(volMm3,4))} µL.<br>`
      + `Concentración <b>aproximada</b>: ${esc(micFmt(St.contados.length))} ÷ ${esc(micFmt(volMm3,4))}`
      + (m.count.dil>1 ? ` × ${esc(micFmt(m.count.dil))} (dilución)` : '')
      + ` ≈ <b>${esc(micFmt(porUl))} por µL</b>${porUl>1e6?` (${esc(micFmt(porUl/1e6,2))} millones por µL)`:''}.<br>`
      + `<span class="small muted">En el campo hay ${esc(micFmt(reales))} en total: si contaste menos, tu estimación queda por debajo. El valor de referencia es ${esc(m.count.real)}. Toda cifra obtenida así es aproximada.</span></span>`;
    Store.log('microscopio',{accion:'conteo', muestra:St.muestraId, contadas:St.contados.length, reales});
    Store.addNote('resultado', `Microscopio · ${m.n}: conté ${St.contados.length} ${m.count.n} en un campo de ${micFmt(d)} µm; concentración aproximada ${micFmt(porUl)} por µL.`);
  }
  /* ---- etiquetar ---- */
  const etiqBox = h('div',{class:'stack'});
  const etiqFb = h('div',{class:'notice',style:'display:none'});
  let pendiente = null;
  function etiquetar(x, y){
    const real = estructuraEn(x, y);
    pendiente = { x, y, real };
    etiqFb.style.display = 'none';
    di('Punto marcado. Elige el nombre de la estructura en la lista.');
    renderEtiq();
    redraw();
  }
  function renderEtiq(){
    etiqBox.innerHTML = '';
    const m = M();
    etiqBox.append(h('p',{class:'small muted'}, pendiente
      ? 'Marcaste un punto. ¿Qué estructura es?'
      : 'Activa el modo etiquetar, marca una estructura en la imagen (clic o Intro sobre el retículo) y luego dale nombre.'));
    const g = h('div',{class:'mic-row'});
    m.labels.forEach(l => g.append(h('button',{class:'chip',disabled: !pendiente, onclick:()=>elegirEtiqueta(l)}, l.n)));
    etiqBox.append(g, etiqFb);
    if (St.etiquetas.length){
      const ul = h('ul',{class:'mic-list'});
      St.etiquetas.slice(0,6).forEach(e => ul.append(h('li',{class:e.ok?'ok':'bad'}, h('span',{},e.ok?'✓':'✗'), h('span',{}, e.n))));
      etiqBox.append(h('span',{class:'eyebrow'},'Tus etiquetas'), ul,
        h('span',{class:'mic-mini'},`Aciertos: ${St.aciertos} · Errores: ${St.fallos}`));
    }
  }
  function elegirEtiqueta(l){
    if (!pendiente) return;
    const m = M(), real = pendiente.real, rl = m.labels.find(x => x.id === real);
    const ok = real === l.id;
    if (ok){ St.aciertos++; etiqFb.className = 'notice ok';
      etiqFb.innerHTML = `<span><b>Correcto: ${esc(l.n)}.</b> ${esc(l.fb)}</span>`; }
    else { St.fallos++; etiqFb.className = 'notice warn';
      etiqFb.innerHTML = `<span><b>Ahí no.</b> El punto que marcaste corresponde a <b>${esc(rl ? rl.n : 'el fondo del preparado')}</b>. ${esc(rl ? rl.fb : '')} <br>Y esto es lo que buscabas: ${esc(l.fb)}</span>`; }
    etiqFb.style.display = 'flex';
    St.etiquetas.unshift({ x:pendiente.x, y:pendiente.y, n:(ok?'':'≠ ')+l.n, ok });
    Store.log('microscopio',{accion:'etiqueta', muestra:St.muestraId, elegida:l.id, real, correcto:ok});
    pendiente = null; renderEtiq(); redraw();
  }
  /* ---- captura ---- */
  function capturar(){
    const m = M();
    let img = null;
    try { img = cv.toDataURL('image/jpeg', 0.72); } catch(e){ console.warn('microscopio: captura', e); }
    const partes = [`Microscopio virtual · ${m.n}`,
      `aumento total ${micFmt(O().m*10)}× (objetivo ${O().m}x, ocular 10x)`,
      `campo de ${micFmt(fov())} µm`,
      `tinción: ${MIC_TIN[St.tincion].n}`,
      `diafragma al ${micFmt(St.luz)} %`,
      nitido() ? 'imagen enfocada' : 'imagen fuera de foco'];
    if (St.medA && St.medB) partes.push(`medición A–B ≈ ${micFmt(Math.hypot(St.medA.x-St.medB.x, St.medA.y-St.medB.y))} µm (aproximada)`);
    if (St.contados.length) partes.push(`${St.contados.length} ${m.count?m.count.n:'células'} marcadas`);
    if (St.etiquetas.length) partes.push('etiquetas: ' + St.etiquetas.filter(e=>e.ok).map(e=>e.n).join(', '));
    Store.addNote('captura', partes.join(' · ') + '.', img ? { img } : {});
    toast('Captura guardada en tu cuaderno de campo.');
    Store.log('microscopio',{accion:'captura', muestra:St.muestraId, aumento:O().m*10});
  }

  /* -------------------- panel con pestañas -------------------- */
  const tabsEl = h('div',{class:'mic-tabs',role:'tablist'});
  const cardTab = h('div',{class:'card stack'});
  const TABS = [['prep','1 · Preparar'],['obs','2 · Observar'],['medir','3 · Medir y contar'],['etiq','4 · Etiquetar'],['reto','5 · Reto']];
  TABS.forEach(([id, t]) => tabsEl.append(h('button',{role:'tab','aria-selected':String(St.tab===id),onclick:()=>{ St.tab = id; renderTab(); }}, t)));
  panel.append(h('div',{class:'card stack'}, tabsEl, cardTab), cardCtrl);

  function setModo(mo){ St.modo = mo; di(`Modo ${mo}.`); renderTab(); }

  function renderTab(){
    $$('button', tabsEl).forEach((b,i) => b.setAttribute('aria-selected', String(TABS[i][0] === St.tab)));
    cardTab.innerHTML = '';
    const m = M();
    if (St.tab === 'prep') tabPrep(m);
    else if (St.tab === 'obs') tabObs(m);
    else if (St.tab === 'medir') tabMedir(m);
    else if (St.tab === 'etiq') tabEtiq(m);
    else tabReto();
  }

  /* --- 1 · preparar --- */
  function tabPrep(m){
    cardTab.append(h('span',{class:'eyebrow lab'},'Buenas prácticas · preparación de la muestra'));
    if (St.ciego){ cardTab.append(h('div',{class:'notice info'},'Estás en el reto de identificación: la muestra ya viene preparada por el laboratorio.')); return; }
    cardTab.append(h('p',{class:'small'}, m.prep));
    const pasos = [
      { t:'Colocar la muestra sobre el portaobjetos con una gota de agua',
        ops:[['Poner la muestra con una gota de agua y extenderla sin dobleces', true, 'La gota de agua evita que la muestra se seque y permite que la luz la atraviese.'],
             ['Poner la muestra seca directamente sobre el vidrio', false, 'Sin agua la muestra se arruga y se seca: la luz no la atraviesa bien y las células se deforman.']] },
      { t:'Bajar el cubreobjetos',
        ops:[['Apoyarlo en un borde a 45° y bajarlo lentamente', true, 'Así el agua avanza empujando el aire y no quedan burbujas.'],
             ['Dejarlo caer plano sobre la gota', false, 'Al caer plano atrapa aire: aparecen burbujas, círculos de borde oscuro que se confunden con células.']] },
      { t:'Teñir la muestra',
        ops:[['Azul de metileno', 'azul', 'Tiñe el ADN de los núcleos: es el indicado para células animales, levaduras y bacterias.'],
             ['Lugol', 'lugol', 'Da un tono ámbar al citoplasma y azul violáceo al almidón: es el indicado para tejidos vegetales.'],
             ['Sin tinción', 'ninguna', 'Sirve cuando hay que ver los organismos vivos moverse, pero el contraste es muy bajo.']] }
    ];
    const lista = h('ul',{class:'steps'});
    pasos.forEach((p, i) => lista.append(h('li',{}, h('button',{'aria-current': St.prep.paso===i?'step':null, class: St.prep.paso>i?'done':'', onclick:()=>{ St.prep.paso = i; renderTab(); }},
      h('span',{class:'n'}, St.prep.paso>i ? '✓' : String(i+1)), p.t))));
    cardTab.append(lista);
    const p = pasos[Math.min(St.prep.paso, 2)];
    const box = h('div',{class:'stack'}, h('p',{style:'font-weight:600'}, p.t));
    const fb = h('div',{class:'notice',style:'display:none'});
    p.ops.forEach((o, k) => box.append(h('button',{class:'opt',onclick:()=>{
      const esTin = St.prep.paso === 2;
      if (esTin){
        St.tincion = o[1];
        const rec = m.tin;
        fb.className = 'notice ' + (o[1]===rec ? 'ok' : 'warn');
        fb.innerHTML = o[1]===rec
          ? `<span><b>Buena elección.</b> ${esc(o[2])}</span>`
          : `<span><b>Se puede observar, pero no es lo recomendable aquí.</b> ${esc(o[2])} Para esta muestra conviene ${esc(MIC_TIN[rec].n.toLowerCase())}: ${esc(MIC_TIN[rec].d)}</span>`;
        fb.style.display = 'flex';
        St.prep.hecha = true;
        setTimeout(() => { St.tab = 'obs'; renderTab(); }, 900);
      } else {
        const ok = o[1] === true;
        if (St.prep.paso === 1) St.prep.burbujas = !ok;
        fb.className = 'notice ' + (ok ? 'ok' : 'warn');
        fb.innerHTML = `<span><b>${ok?'Correcto.':'Ojo.'}</b> ${esc(o[2])}</span>`;
        fb.style.display = 'flex';
        St.prep.paso++;
        setTimeout(() => renderTab(), 700);
      }
      lecturas(); redraw();
      Store.log('microscopio',{accion:'preparacion', paso:St.prep.paso, opcion:k});
    }}, h('span',{class:'k'}, String.fromCharCode(65+k)), o[0])));
    box.append(fb);
    cardTab.append(box);
    cardTab.append(h('p',{class:'mic-help'},'Por qué importa: el portaobjetos sostiene la muestra, el cubreobjetos la aplana para que todas las células queden en el mismo plano de foco (si no, unas se ven nítidas y otras no) y el colorante da el contraste que la célula viva no tiene, porque es casi transparente.'));
  }

  /* --- 2 · observar --- */
  function tabObs(m){
    cardTab.append(h('span',{class:'eyebrow cell'},'Observación'));
    if (!St.ciego){
      cardTab.append(h('h3',{style:'margin:0'}, m.n), h('p',{class:'small muted'}, m.escala));
      const ul = h('ul',{class:'mic-list'});
      [4,10,40,100].forEach(k => ul.append(h('li',{class: O().m===k ? 'ok' : ''}, h('b',{},`${k*10}×`), h('span',{}, m.obs[k]))));
      cardTab.append(ul);
    } else cardTab.append(h('div',{class:'notice info'},'Muestra sin identificar: descríbela tú antes de elegir una respuesta en el reto.'));
    cardTab.append(h('div',{class:'mic-row'},
      h('button',{class:'btn sm primary',onclick:capturar},'Capturar al cuaderno'),
      h('button',{class:'btn sm',onclick:()=>setModo('observar')},'Modo identificar al tacto')));
    if (!St.ciego){
      cardTab.append(h('span',{class:'eyebrow'},'Cambiar de muestra'));
      const gsel = h('div',{class:'mic-samples'});
      MIC_MUESTRAS.forEach(mu => gsel.append(h('button',{class:'mic-samp','aria-pressed':String(mu.id===St.muestraId),
        onclick:()=>cambiarMuestra(mu.id)}, `${mu.em} ${mu.corto}`, h('small',{}, mu.grupo === 'vegetal' ? 'Célula vegetal' : mu.grupo === 'animal' ? 'Célula animal' : 'Microorganismo'))));
      cardTab.append(gsel);
    }
  }
  function cambiarMuestra(id){
    St.muestraId = id; St.medA = St.medB = null; St.contados = []; St.etiquetas = []; pendiente = null;
    St.prep = { paso:0, burbujas:false, hecha:false };
    St.macro = 0; St.micro = 0; macroIn.value = 0; microIn.value = 0; macroOut.value = '0 µm'; microOut.value = '0,0 µm';
    St.tincion = MIC_BY_ID[id].tin; St.obj = 0; St.x = 0; St.y = 0;
    $$('.mic-obj', objsEl).forEach((b,k) => b.setAttribute('aria-pressed', String(k===0)));
    if (!St.ciego && location.hash.indexOf('/microscopio') >= 0 && location.hash !== '#/microscopio/'+id){
      history.replaceState(null, '', '#/microscopio/'+id);
    }
    St.tab = St.ciego ? 'obs' : 'prep';
    contCount.textContent = '0'; contTxt.className = 'notice';
    medTxt.className = 'notice'; medTxt.textContent = 'Marca el punto A en un extremo de la estructura y el punto B en el otro.';
    di(`Muestra cambiada: ${MIC_BY_ID[id].n}. Empieza por prepararla y enfoca con el macrométrico.`);
    avisos(); lecturas(); renderTab(); redraw();
    Store.log('microscopio',{accion:'muestra', muestra:id});
  }

  /* --- 3 · medir y contar --- */
  function tabMedir(m){
    cardTab.append(h('span',{class:'eyebrow lab'},'Medir y contar'),
      h('p',{class:'small muted'},'La regla micrométrica del campo te da la escala. Toda medida tomada así es aproximada.'),
      h('div',{class:'mic-row'},
        h('button',{class:'btn sm','aria-pressed':String(St.modo==='medir'),onclick:()=>setModo('medir')},'Modo medir'),
        h('button',{class:'btn sm','aria-pressed':String(St.regla),onclick:()=>{ St.regla = !St.regla; renderTab(); redraw(); }}, St.regla?'Ocultar regla':'Mostrar regla'),
        h('button',{class:'btn sm ghost',onclick:()=>{ St.medA = St.medB = null; medTxt.className='notice'; medTxt.textContent='Marca el punto A en un extremo de la estructura y el punto B en el otro.'; redraw(); }},'Borrar medición')),
      h('div',{class:'mic-row'},
        h('button',{class:'btn sm',onclick:()=>accion(St.x, St.y)},'Marcar en el centro del campo')),
      medTxt);
    if (m.count){
      cardTab.append(h('span',{class:'eyebrow'},'Contador de células'),
        h('p',{class:'small muted'},`Marca los ${m.count.n} del campo, uno por uno. Vuelve a marcar uno para quitarlo.`),
        h('div',{class:'mic-row'},
          h('button',{class:'btn sm','aria-pressed':String(St.modo==='contar'),onclick:()=>setModo('contar')},'Modo contar'),
          h('span',{class:'mic-mini'},'Contados: ', contCount),
          h('button',{class:'btn sm ghost',onclick:()=>{ St.contados = []; contCount.textContent='0'; redraw(); }},'Reiniciar conteo'),
          h('button',{class:'btn sm primary',onclick:calcularConcentracion},'Calcular concentración')),
        contTxt);
    } else {
      cardTab.append(h('div',{class:'notice info'},'Esta muestra no se presta para un recuento: elige la sangre, la levadura o las bacterias para contar y estimar concentración.'));
    }
  }

  /* --- 4 · etiquetar --- */
  function tabEtiq(m){
    cardTab.append(h('span',{class:'eyebrow anat'},'Etiquetar estructuras'),
      h('div',{class:'mic-row'},
        h('button',{class:'btn sm','aria-pressed':String(St.modo==='etiquetar'),onclick:()=>setModo('etiquetar')},'Modo etiquetar'),
        h('button',{class:'btn sm',onclick:()=>accion(St.x, St.y)},'Marcar en el centro del campo'),
        h('button',{class:'btn sm ghost',onclick:()=>{ St.etiquetas = []; pendiente = null; renderEtiq(); redraw(); }},'Borrar etiquetas'),
        h('button',{class:'btn sm primary',onclick:capturar},'Capturar al cuaderno')),
      etiqBox);
    renderEtiq();
  }

  /* --- 5 · reto --- */
  const retoBox = h('div',{class:'stack'});
  function tabReto(){
    cardTab.append(h('span',{class:'eyebrow mis'},'Reto de identificación'), retoBox);
    renderReto();
  }
  function renderReto(){
    retoBox.innerHTML = '';
    if (St.retoIdx >= 3){
      retoBox.append(h('div',{class:'notice ok'}, `Reto terminado: ${St.retoOk} de 3 identificaciones correctas.`),
        h('button',{class:'btn sm',onclick:()=>{ St.ciego = false; cambiarMuestra('cebolla'); St.tab='obs'; renderTab(); }},'Volver a la observación libre'));
      return;
    }
    const r = MIC_RETOS[St.retoIdx];
    retoBox.append(h('p',{class:'small muted'}, `Muestra ${St.retoIdx+1} de 3. Obsérvala con los controles del microscopio antes de responder: cambia de aumento, enfoca y mide si hace falta.`));
    const iniciar = h('button',{class:'btn sm primary',onclick:()=>{
      St.ciego = true; const id = r.muestra;
      St.muestraId = id; St.tincion = MIC_BY_ID[id].tin; St.contados = []; St.etiquetas = []; St.medA = St.medB = null;
      St.obj = 2; St.x = 0; St.y = 0; St.macro = Math.round(MIC_BY_ID[id].plano/2)*2; St.micro = clamp(MIC_BY_ID[id].plano - St.macro, -30, 30);
      macroIn.value = St.macro; microIn.value = St.micro; macroOut.value = micFmt(St.macro)+' µm'; microOut.value = micFmt(St.micro,1)+' µm';
      if (MIC_OBJ[St.obj].aceite) St.aceite = true;
      $$('.mic-obj', objsEl).forEach((b,k) => b.setAttribute('aria-pressed', String(k===St.obj)));
      di('Muestra sin identificar cargada a 400 aumentos y enfocada. Obsérvala.');
      avisos(); lecturas(); redraw(); renderReto();
    }},'Cargar la muestra sin nombre');
    if (!St.ciego){ retoBox.append(iniciar); return; }
    let paso2 = null;
    const seg = h('div',{class:'stack'});
    seg.append(quizBlock(r.q, (intentos) => {
      St.retoIntentos += intentos;
      if (intentos === 1) St.retoOk++;
      paso2 = quizBlock(r.q2, () => {
        St.retoIdx++;
        Store.log('microscopio',{accion:'reto', muestra:r.muestra, intentos});
        if (St.retoIdx >= 3){
          const score = Math.max(6, Math.round((10 - (St.retoIntentos-3)*0.8)*10)/10);
          Store.completeActivity('reto-microscopio', { score, attempts:St.retoIntentos });
          Store.addNote('conclusion', `Microscopio virtual: identifiqué tres muestras a ciegas (${St.retoOk} de 3 a la primera) justificando por la forma y la organización de las células.`);
          retoSt.className = 'notice ok'; retoSt.textContent = 'Reto resuelto ✓';
          toast('Reto del microscopio completado.');
          St.ciego = false;
        }
        renderReto();
      });
      seg.append(h('div',{class:'notice info'},'Ahora justifica tu identificación.'), paso2);
    }));
    retoBox.append(seg);
  }

  /* -------------------- cierre: pregunta de comprensión -------------------- */
  const cierre = h('div',{class:'card stack',style:'margin-top:16px'},
    h('span',{class:'eyebrow'},'Para cerrar'),
    quizBlock({
      q:'Has observado la misma muestra a 40, 100, 400 y 1000 aumentos. ¿Por qué se empieza siempre por el objetivo de menor aumento?',
      ops:['Porque el objetivo de 4x es el que da mejor calidad de imagen',
           'Porque con 4x el campo visual es mucho más amplio y la profundidad de foco mucho mayor: así se localiza y se centra la muestra antes de ampliarla',
           'Porque los objetivos grandes solo funcionan si antes se usó el pequeño'],
      ok:1,
      fb:'A 4x el campo mide unos 4.500 µm y el enfoque tolera decenas de micrómetros de error; a 100x el campo baja a unos 180 µm y la profundidad de foco es de apenas un micrómetro. Buscar directamente con el objetivo de inmersión es casi imposible y arriesga el cubreobjetos.',
      wrong:['El de 4x da menos detalle: resuelve menos. Su ventaja es otra: lo que abarca y lo fácil que resulta enfocarlo.',
             'Cada objetivo funciona por su cuenta; el orden es una cuestión de método, no un requisito mecánico del aparato.']
    }),
    quizBlock({
      q:'¿Para qué sirve la gota de aceite del objetivo de 100x?',
      ops:['Para lubricar el movimiento del revólver',
           'Para limpiar el cubreobjetos antes de observar',
           'Porque su índice de refracción es parecido al del vidrio: evita que la luz se desvíe al pasar al aire y conserva la nitidez'],
      ok:2,
      fb:'Sin aceite, buena parte de los rayos se desvía al salir del cubreobjetos hacia el aire y no entra en la lente: la imagen pierde luz y definición. Con aceite se recupera la resolución del objetivo de inmersión.',
      wrong:['El revólver gira en seco; el aceite jamás se pone en sus piezas móviles.','La limpieza se hace después, con papel especial: el aceite se usa durante la observación, entre el cubre y la lente.']
    }, () => { Store.log('microscopio',{accion:'quiz_cierre'}); }));
  view.append(cierre);

  /* -------------------- arranque -------------------- */
  St.tincion = M().tin;
  luzIn.value = St.luz; luzOut.value = micFmt(St.luz)+' %';
  avisos(); lecturas(); renderTab(); redraw();
  const onResize = () => redraw();
  window.addEventListener('resize', onResize);
  let ro = null; try { ro = new ResizeObserver(onResize); ro.observe(stage); } catch(e){ ro = null; }
  const onVis = () => { if (!document.hidden) redraw(); };
  document.addEventListener('visibilitychange', onVis);
  di('Microscopio listo. Empieza preparando la muestra.');

  return { unmount(){ alive = false; if (raf) cancelAnimationFrame(raf); raf = null;
    window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); ro && ro.disconnect(); } };
}

route('/microscopio', (view, params) => micView(view, params));
route('/microscopio/:muestra', (view, params) => micView(view, params));
</script>
