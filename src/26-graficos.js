<style>
/* ===== 26-graficos (prefijo graf-) · lectura interactiva, menú, tabla y predicción para lineChart ===== */
.graf-capa{position:absolute;left:0;top:0;pointer-events:none;z-index:2}
.graf-guia{position:absolute;top:0;width:0;border-left:1px solid var(--ink-3);display:none}
.graf-pt{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;box-shadow:0 0 0 2px var(--bg-2);display:none}
.graf-tip{position:absolute;display:none;min-width:128px;max-width:260px;background:var(--bg-2);border:1px solid var(--line-2);border-radius:10px;box-shadow:var(--shadow);padding:7px 10px 8px;font-size:.76rem;line-height:1.35;color:var(--ink-2)}
.graf-tip .gx{font-family:var(--font-m);font-size:.7rem;color:var(--ink-3);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.graf-tip .gr{display:flex;align-items:center;gap:7px;white-space:nowrap}
.graf-tip .gk{width:14px;height:0;border-top:2px solid;flex:none}
.graf-tip .gk.d{border-top-style:dashed}
.graf-tip .gr b{color:var(--ink);font-family:var(--font-m);font-weight:600;font-variant-numeric:tabular-nums}
.graf-tip .gr span{overflow:hidden;text-overflow:ellipsis}
.graf-mb{position:absolute;top:1px;right:0;pointer-events:auto;width:30px;height:24px;border-radius:7px;border:1px solid transparent;background:transparent;color:var(--ink-3);font-size:1.05rem;font-weight:700;line-height:1;padding:0 0 4px;cursor:pointer;display:grid;place-items:center}
.graf-mb:hover,.graf-mb:focus-visible,.graf-mb[aria-expanded="true"]{background:var(--bg-3);border-color:var(--line-2);color:var(--ink)}
.graf-menu{position:absolute;top:28px;right:0;pointer-events:auto;background:var(--bg-2);border:1px solid var(--line-2);border-radius:10px;box-shadow:var(--shadow-lg);padding:4px;display:none;min-width:212px;z-index:6}
.graf-menu.open{display:block}
.graf-menu button{display:flex;align-items:center;gap:9px;width:100%;text-align:left;padding:8px 10px;border:0;background:none;border-radius:7px;font-size:.84rem;font-weight:500;color:var(--ink);cursor:pointer;white-space:nowrap}
.graf-menu button:hover,.graf-menu button:focus-visible{background:var(--bg-3);outline:none}
.graf-menu button span{width:18px;text-align:center;color:var(--ink-3)}
.graf-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}
canvas.graf-cv{outline:none;touch-action:pan-y pinch-zoom}
canvas.graf-cv:focus-visible{box-shadow:0 0 0 2px var(--bg-2),0 0 0 4px var(--accent);border-radius:6px}
canvas.graf-cv.graf-dib{touch-action:none;cursor:crosshair}
.graf-pred{display:flex;flex-direction:column;gap:8px;padding:12px 14px;border-radius:12px;border:1px dashed color-mix(in srgb,var(--gen) 55%,var(--line-2));background:color-mix(in srgb,var(--gen-soft) 45%,var(--bg-2));margin-top:8px}
.graf-pred.ok{border-style:solid;border-color:var(--line-2);background:var(--bg-2)}
.graf-pred h4{margin:0;font-size:.95rem;display:flex;align-items:center;gap:8px}
.graf-pred p{margin:0;font-size:.88rem;color:var(--ink-2)}
.graf-pred ul{margin:0;padding-left:18px;font-size:.88rem;color:var(--ink-2);display:flex;flex-direction:column;gap:3px}
.graf-pred .row{gap:8px}
.graf-pred .graf-msg:empty{display:none}
.graf-pred .graf-msg{font-size:.84rem;color:var(--warn)}
.graf-marca{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--gen);color:#fff;font-size:.8rem;flex:none}
.graf-tabla h3{margin:0}
.graf-tabla table.data td,.graf-tabla table.data th{white-space:nowrap}
.graf-tabla .gnota{font-size:.84rem;color:var(--ink-2)}
.graf-tabla .gcierra{align-self:flex-end}
</style>
<script>
/* =====================================================================
   26-graficos · v1.9
   lineChart(canvas, opts) (src/04-core.js) delega aquí:
     grafPintar(ctx, W, H, opts, estado, modo) → dibuja y devuelve la geometría
     grafMontar(canvas, opts, geo, estado)     → lectura interactiva, menú, predicción
   Opciones NUEVAS (todas opcionales; las antiguas no cambian):
     por serie: s.tendencia ('lineal' | 'exp' | true), s.linea:false (solo puntos), s.r (radio del punto),
                puntos con barras de error {x, y, lo, hi} o {x, y, sd}
     por gráfico: anotaciones:[{x, texto} | {y, texto} | {x, y, texto}], comparar:{pts, label} (gris punteado),
                prediccion:{estado:{}, id, nota, pregunta, unidadX, unidadY, onFin(estado)},
                tipfmt (formato del valor en la lectura), titulo (para la imagen), leyenda:true|false, menu:false
   ===================================================================== */

/* ---------- utilidades ---------- */
function grafNum(v, d){
  if (v == null || !isFinite(v)) return '—';
  if (d == null){ const a = Math.abs(v); d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : a >= 0.01 ? 3 : 4; }
  const s = Number(v).toLocaleString('es-EC', { maximumFractionDigits:d, minimumFractionDigits:0 });
  return s.replace(/^-/, '−');
}
function grafR2(v){ return Number(v).toLocaleString('es-EC', { minimumFractionDigits:2, maximumFractionDigits:2 }); }
function grafTok(){
  const cs = getComputedStyle(document.documentElement), g = n => cs.getPropertyValue(n).trim();
  return { ink:g('--ink'), ink2:g('--ink-2'), ink3:g('--ink-3'), grid:g('--chart-grid'), line2:g('--line-2') || g('--chart-grid'),
    bg2:g('--bg-2') || '#fff', pred:g('--gen') || '#6A58C7', font:g('--font-b') || 'sans-serif' };
}
function grafRgb(c){
  const k = grafRgb._c || (grafRgb._c = document.createElement('canvas').getContext('2d', { willReadFrequently:true }));
  k.clearRect(0,0,1,1); k.fillStyle = '#000'; k.fillStyle = c; k.fillRect(0,0,1,1);
  const d = k.getImageData(0,0,1,1).data; return [d[0],d[1],d[2]];
}
function grafRR(ctx, x, y, w, h, r){ ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); }
function grafUnidad(lbl){ const m = /\(([^()]{1,16})\)\s*$/.exec(lbl || ''); return m ? m[1] : ''; }
function grafMotion(){ try { return typeof motionOK === 'function' ? motionOK() : true; } catch(e){ return true; } }

/* ---------- estadística ---------- */
/* ajuste por mínimos cuadrados: 'lineal' y = m·x + b ; 'exp' y = a·e^(k·x) (solo con y > 0) */
function grafRegresion(pts, tipo){
  tipo = tipo === 'exp' ? 'exp' : 'lineal';
  const P = (pts || []).filter(p => p && isFinite(p.x) && isFinite(p.y) && (tipo !== 'exp' || p.y > 0));
  const n = P.length; if (n < 2) return null;
  const tx = P.map(p => p.x), ty = P.map(p => tipo === 'exp' ? Math.log(p.y) : p.y);
  const mx = tx.reduce((a,b)=>a+b,0)/n, my = ty.reduce((a,b)=>a+b,0)/n;
  let sxy = 0, sxx = 0; for (let i = 0; i < n; i++){ sxy += (tx[i]-mx)*(ty[i]-my); sxx += (tx[i]-mx)*(tx[i]-mx); }
  if (!sxx) return null;
  const m = sxy/sxx, b = my - m*mx;
  const f = tipo === 'exp' ? (x => Math.exp(b)*Math.exp(m*x)) : (x => m*x + b);
  const yb = P.reduce((a,p)=>a+p.y,0)/n;
  let ssr = 0, sst = 0; P.forEach(p => { ssr += (p.y - f(p.x))**2; sst += (p.y - yb)**2; });
  const r2 = sst ? Math.max(0, 1 - ssr/sst) : 1;
  return { tipo, n, m, b, a: tipo === 'exp' ? Math.exp(b) : null, k: tipo === 'exp' ? m : null, r2, f,
    x0: tipo === 'lineal' && m ? -b/m : null, xmin: Math.min(...tx), xmax: Math.max(...tx) };
}
function grafCalidad(r2){
  return r2 >= 0.9 ? 'los puntos siguen muy bien la tendencia' : r2 >= 0.7 ? 'los puntos siguen bastante bien la tendencia'
       : r2 >= 0.4 ? 'relación débil: los puntos se dispersan bastante' : 'no hay una relación clara de ese tipo';
}
function grafEcuacion(fit){
  if (!fit) return '';
  const sig = v => { const a = Math.abs(v); return a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3; };
  if (fit.tipo === 'exp') return `y = ${grafNum(fit.a, sig(fit.a))} · e^(${grafNum(fit.k, sig(fit.k))}·x)`;
  const b = fit.b, sb = b < 0 ? ' − ' : ' + ';
  return `y = ${grafNum(fit.m, sig(fit.m))}·x${Math.abs(b) < 1e-9 ? '' : sb + grafNum(Math.abs(b), sig(b))}`;
}
/* texto de tendencia para personas: ecuación, R² y qué significa */
function grafTendenciaTexto(fit){
  if (!fit) return '';
  const q = fit.tipo === 'exp' ? 'curva exponencial' : 'recta';
  const pend = fit.tipo === 'lineal' ? (Math.abs(fit.m) < 1e-9 ? ' La recta es horizontal: y no cambia con x.'
      : ` Por cada unidad que aumenta x, y ${fit.m > 0 ? 'sube' : 'baja'} ${grafNum(Math.abs(fit.m))}.`) : '';
  return `${q[0].toUpperCase()+q.slice(1)} de tendencia: ${grafEcuacion(fit)}. R² = ${grafR2(fit.r2)} (${grafCalidad(fit.r2)}).${pend}`;
}

/* ---------- series normalizadas ---------- */
function grafSeries(o, pred, T){
  const out = [];
  const cmp = o.comparar ? (Array.isArray(o.comparar) ? o.comparar : [o.comparar]) : [];
  cmp.forEach(c => { if (c && Array.isArray(c.pts) && c.pts.length) out.push({ pts:c.pts, label:c.label || 'corrida anterior', color:c.color || T.ink3, dash:c.dash || [5,4], width:c.width || 1.8, fill:false, dots:!!c.dots, _k:'comparar' }); });
  (o.series || []).forEach((s, i) => { if (s) out.push(Object.assign({}, s, { pts:Array.isArray(s.pts) ? s.pts : [], color:s.color || T.ink3, _k:'dato', _i:i })); });
  if (pred && pred.pts && pred.pts.length && (pred.fase !== 'confirmada' || pred.ver !== false) && pred.fase !== 'omitida')
    out.push({ pts:pred.pts, label:'tu predicción', color:T.pred, dash:pred.fase === 'confirmada' ? [7,5] : null, width:2.4, fill:false, _k:'pred' });
  return out;
}

/* ---------- dibujo ---------- */
function grafPintar(ctx, W, H, o, st, modo){
  modo = modo || {}; st = st || {};
  const T = grafTok();
  const pred = o.prediccion && o.prediccion.estado ? o.prediccion.estado : null;
  if (pred && !pred.fase) pred.fase = 'dibujar';
  const dib = !!(pred && pred.fase === 'dibujar');
  const S = grafSeries(o, pred, T);
  const vis = s => s._k === 'pred' || !dib;
  const fin = v => typeof v === 'number' && isFinite(v);
  /* extensión de los ejes: igual que antes (datos + extremos de error), sin contar la predicción */
  const base = S.filter(s => s._k !== 'pred');
  const xs = [], ys = [];
  base.forEach(s => s.pts.forEach(p => { if (!p) return; if (fin(p.x)) xs.push(p.x); if (fin(p.y)) ys.push(p.y);
    if (fin(p.hi)) ys.push(p.hi); else if (fin(p.sd) && fin(p.y)) ys.push(p.y + Math.abs(p.sd)); }));
  const nice = v => { const p = Math.pow(10, Math.floor(Math.log10(Math.max(v,1)))); const m = v/p; const k = m<=1?1:m<=2?2:m<=2.5?2.5:m<=4?4:m<=5?5:m<=8?8:10; return k*p; };
  const xmin = o.xmin ?? (xs.length ? Math.min(...xs) : 0), xmax = o.xmax ?? (xs.length ? Math.max(...xs) : 1);
  const ymin = o.ymin ?? 0, ymax = o.ymax ?? nice(Math.max(...ys, 1)*1.2);
  const fontM = '11px "IBM Plex Mono", monospace', fontS = '600 11px "IBM Plex Sans", sans-serif', fontL = '11px "IBM Plex Sans", sans-serif';

  /* franja superior: rótulo del eje Y, leyenda y botón de opciones */
  const menu = o.menu !== false && !modo.export && !dib;
  const ent = [], vistos = new Set();
  S.forEach(s => { if (!vis(s) || !s.label || !s.pts.length) return; const k = s.label + '|' + s.color; if (vistos.has(k)) return; vistos.add(k); ent.push(s); });
  if (dib && ent.length) ent.length = 0;          /* mientras dibuja, solo su trazo: no hace falta leyenda */
  const conExtra = ent.some(s => s._k !== 'dato');
  const conLey = o.leyenda === true ? ent.length >= 1 : (o.leyenda !== false && ent.length >= 2 && (!st.leyExt || conExtra || modo.export));
  ctx.font = fontL;
  const items = conLey ? ent.map(s => ({ s, w: 14 + 5 + ctx.measureText(s.label).width + 12 })) : [];
  ctx.font = fontM;
  const ylw = o.ylabel ? ctx.measureText(o.ylabel).width : 0;
  const pad = { l:48, r:16, t:16, b:36 };
  let filas = [], ylY;
  const finFila = W - pad.r - (menu ? 36 : 0);
  if (!items.length){ if (menu){ pad.t = 26; ylY = pad.t - 6; } else ylY = pad.t - 4; }
  else {
    const tot = items.reduce((a,it)=>a+it.w, 0) - 12;
    const ini = pad.l + (ylw ? ylw + 18 : 0);
    if (tot <= finFila - ini){ pad.t = 26; ylY = 20; filas = [{ y:20, its:items, x0: finFila - tot }]; }
    else {
      let fila = { its:[], w:0 }; const rows = [fila];
      items.forEach(it => { const lim = (rows.length === 1 ? finFila : W - pad.r) - pad.l; if (fila.its.length && fila.w + it.w - 12 > lim){ fila = { its:[], w:0 }; rows.push(fila); } fila.its.push(it); fila.w += it.w; });
      rows.forEach((r, i) => { r.y = 14 + i*16; r.x0 = pad.l; });
      filas = rows; pad.t = 26 + rows.length*16; ylY = pad.t - 6;
    }
  }
  const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b;
  const X = x => pad.l + (x-xmin)/((xmax-xmin)||1)*pw, Y = y => pad.t + ph - (y-ymin)/((ymax-ymin)||1)*ph;

  if (modo.export){ ctx.fillStyle = T.bg2; ctx.fillRect(0,0,W,H); } else ctx.clearRect(0,0,W,H);
  ctx.font = fontM; ctx.fillStyle = T.ink3; ctx.strokeStyle = T.grid; ctx.lineWidth = 1;
  const yt = 4; for (let i=0;i<=yt;i++){ const v = ymin + (ymax-ymin)*i/yt; const y = Y(v); ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke(); ctx.textAlign='right'; ctx.fillText(o.yfmt ? o.yfmt(v) : Math.round(v), pad.l-8, y+4); }
  const xt = o.xticks || 5; for (let i=0;i<=xt;i++){ const v = xmin + (xmax-xmin)*i/xt; ctx.textAlign='center'; ctx.fillText(o.xfmt ? o.xfmt(v) : Math.round(v), X(v), H-pad.b+18); }
  ctx.fillStyle = T.ink3; ctx.textAlign='left'; if (o.ylabel) ctx.fillText(o.ylabel, pad.l, ylY); if (o.xlabel){ ctx.textAlign='right'; ctx.fillText(o.xlabel, W-pad.r, H-6); }
  /* eje base más marcado */ ctx.strokeStyle = T.line2; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(pad.l, Y(ymin)); ctx.lineTo(W-pad.r, Y(ymin)); ctx.stroke();

  /* leyenda: trazo corto del color de la serie + texto en tinta (nunca texto de color) */
  filas.forEach(r => { let x = r.x0; r.its.forEach(it => { const s = it.s; ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.setLineDash(s.dash ? [4,3] : []);
    ctx.beginPath(); ctx.moveTo(x, r.y-4); ctx.lineTo(x+14, r.y-4); ctx.stroke(); ctx.setLineDash([]);
    if (s.dots || s.linea === false){ ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(x+7, r.y-4, 3, 0, Math.PI*2); ctx.fill(); }
    ctx.font = fontL; ctx.fillStyle = T.ink2; ctx.textAlign = 'left'; ctx.fillText(s.label, x+19, r.y); x += it.w; }); });

  /* anotaciones (líneas de referencia con rótulo) */
  const anot = dib ? [] : (o.anotaciones || []);
  const pill = (txt, x, y, al) => { ctx.font = '600 10.5px "IBM Plex Sans", sans-serif'; const tw = ctx.measureText(txt).width; let lx = al === 'right' ? x - tw - 8 : x;
    lx = clamp(lx, pad.l + 2, W - pad.r - tw - 8); ctx.fillStyle = T.bg2; ctx.globalAlpha = 0.9; grafRR(ctx, lx, y-10, tw+8, 15, 7); ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = T.ink2; ctx.textAlign = 'left'; ctx.fillText(txt, lx+4, y+1); ocupado.push([lx, y-10, tw+8, 15]); };
  const ocupado = [];
  anot.forEach(a => { if (!a) return; ctx.save(); ctx.strokeStyle = a.color || T.ink3; ctx.lineWidth = 1; ctx.setLineDash(a.dash || [4,4]);
    if (fin(a.x) && fin(a.y)){ ctx.setLineDash([]); ctx.beginPath(); ctx.arc(X(a.x), Y(a.y), 7, 0, Math.PI*2); ctx.lineWidth = 1.4; ctx.stroke(); ctx.restore();
      if (a.texto){ const up = Y(a.y) - pad.t > 26; pill(a.texto, X(a.x) + 10, up ? Y(a.y) - 12 : Y(a.y) + 20, X(a.x) > pad.l + pw*0.7 ? 'right' : 'left'); } return; }
    if (fin(a.x) && a.x >= xmin && a.x <= xmax){ const x = X(a.x); ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t+ph); ctx.stroke(); ctx.restore();
      if (a.texto){ const der = x > pad.l + pw*0.7; pill(a.texto, der ? x - 5 : x + 5, pad.t + 12, der ? 'right' : 'left'); } return; }
    if (fin(a.y) && a.y >= ymin && a.y <= ymax){ const y = Y(a.y); ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W-pad.r, y); ctx.stroke(); ctx.restore();
      if (a.texto) pill(a.texto, W - pad.r - 4, y - 7 < pad.t + 10 ? y + 16 : y - 6, 'right'); return; }
    ctx.restore(); });

  /* series */
  const nDatos = (o.series || []).length;
  const fillOK = o.fill !== false && nDatos <= 3;
  const rev = (st.revelar == null || modo.export) ? 1 : st.revelar;
  const etiquetas = [];
  S.forEach(s => {
    if (!vis(s) || !s.pts.length) return;
    const P = s.pts.filter(p => p && fin(p.x) && fin(p.y));
    if (!P.length) return;
    const pts = P.map(p => [X(p.x), Y(p.y)]);
    const revela = s._k === 'dato' && rev < 1;
    ctx.save(); if (revela){ ctx.beginPath(); ctx.rect(0, 0, pad.l + pw*rev + 6, H); ctx.clip(); }
    if (s._k === 'dato' && fillOK && s.fill !== false && !s.dash && s.linea !== false && pts.length > 1){ const [r,g,b] = grafRgb(s.color); const gr = ctx.createLinearGradient(0, pad.t, 0, pad.t+ph); gr.addColorStop(0, `rgba(${r},${g},${b},0.20)`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(pts[0][0], Y(ymin)); pts.forEach(q => ctx.lineTo(q[0], q[1])); ctx.lineTo(pts[pts.length-1][0], Y(ymin)); ctx.closePath(); ctx.fill(); }
    if (s.linea !== false){ ctx.save(); ctx.beginPath(); ctx.rect(pad.l-6, pad.t-6, pw+12, ph+12); ctx.clip();
      ctx.strokeStyle = s.color; ctx.lineWidth = s.width || 2.4; ctx.lineJoin='round'; ctx.lineCap='round'; if (s.dash) ctx.setLineDash(s.dash); ctx.beginPath(); pts.forEach((q,i)=> i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    /* barras de error: trazo fino y tapas cortas del color de la serie */
    P.forEach(p => { let lo = null, hi = null;
      if (fin(p.lo) || fin(p.hi)){ lo = fin(p.lo) ? p.lo : p.y; hi = fin(p.hi) ? p.hi : p.y; }
      else if (fin(p.sd) && p.sd > 0){ lo = p.y - p.sd; hi = p.y + p.sd; }
      if (lo == null || hi - lo <= 0) return;
      const x = X(p.x), y1 = Y(lo), y2 = Y(hi), c = 5;
      ctx.strokeStyle = s.color; ctx.globalAlpha = 0.85; ctx.lineWidth = 1.4; ctx.lineCap = 'butt';
      ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.moveTo(x-c, y1); ctx.lineTo(x+c, y1); ctx.moveTo(x-c, y2); ctx.lineTo(x+c, y2); ctx.stroke(); ctx.globalAlpha = 1; });
    if (s.dots || s.linea === false){ const rr = s.r || 4.2; pts.forEach(q => { ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(q[0],q[1],rr,0,Math.PI*2); ctx.fill(); ctx.strokeStyle=T.bg2; ctx.lineWidth=2; ctx.stroke(); }); }
    ctx.restore();
    if (s.label && s._k === 'dato' && s.linea !== false) etiquetas.push({ s, q: pts[pts.length-1] });
  });

  /* líneas de tendencia (mínimos cuadrados) con ecuación y R² */
  const tends = [];
  if (!dib && rev >= 1){
    const pedidas = [];
    S.forEach(s => { if (s._k === 'dato' && s.tendencia) pedidas.push({ s, tipo:s.tendencia }); });
    if (o.tendencia){ const t = o.tendencia === true ? {} : o.tendencia; const s = S.find(z => z._k === 'dato' && z._i === (t.serie || 0)); if (s && !s.tendencia) pedidas.push({ s, tipo:t.tipo }); }
    pedidas.slice(0, 2).forEach(({ s, tipo }) => {
      const fit = grafRegresion(s.pts, tipo === 'exp' ? 'exp' : 'lineal'); if (!fit) return;
      tends.push({ s, fit });
      ctx.save(); ctx.beginPath(); ctx.rect(pad.l, pad.t, pw, ph); ctx.clip();
      ctx.strokeStyle = s.color; ctx.globalAlpha = 0.9; ctx.lineWidth = 1.6; ctx.setLineDash([6,4]); ctx.beginPath();
      const N = fit.tipo === 'exp' ? 40 : 1; for (let i = 0; i <= N; i++){ const x = fit.xmin + (fit.xmax - fit.xmin)*i/N; const px = X(x), py = Y(fit.f(x)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke(); ctx.restore();
    });
    /* recuadro de la ecuación: en la esquina con menos datos */
    const usadas = [];
    tends.forEach(t => {
      const l1 = (tends.length > 1 && t.s.label ? t.s.label + ': ' : '') + grafEcuacion(t.fit), l2 = 'R² = ' + grafR2(t.fit.r2) + ' · ' + (t.fit.r2 >= 0.9 ? 'ajuste muy bueno' : t.fit.r2 >= 0.7 ? 'ajuste bueno' : t.fit.r2 >= 0.4 ? 'ajuste débil' : 'sin relación clara');
      ctx.font = '600 11px "IBM Plex Sans", sans-serif'; const w1 = ctx.measureText(l1).width; ctx.font = fontL; const w2 = ctx.measureText(l2).width;
      const bw = Math.min(pw - 8, Math.max(w1, w2) + 30), bh = 36;
      const cands = [[pad.l+8, pad.t+6], [W-pad.r-bw-8, pad.t+6], [pad.l+8, pad.t+ph-bh-8], [W-pad.r-bw-8, pad.t+ph-bh-8]];
      const dentro = ([x,y]) => { let n = 0; S.forEach(s => { if (!vis(s)) return; s.pts.forEach(p => { if (!p) return; const px = X(p.x), py = Y(p.y); if (px > x-6 && px < x+bw+6 && py > y-6 && py < y+bh+6) n++; }); });
        ocupado.forEach(([ox, oy, ow, oh]) => { if (ox < x+bw && ox+ow > x && oy < y+bh && oy+oh > y) n += 6; });
        const f = t.fit; for (let i = 0; i <= 20; i++){ const xx = f.xmin + (f.xmax-f.xmin)*i/20, px = X(xx), py = Y(f.f(xx)); if (px > x && px < x+bw && py > y && py < y+bh) n += 0.5; } return n; };
      let best = null, bn = Infinity, bi = 0; cands.forEach((c, i) => { if (usadas.includes(i)) return; const n = dentro(c); if (n < bn){ bn = n; best = c; bi = i; } }); if (!best) return; usadas.push(bi); ocupado.push([best[0], best[1], bw, bh]);
      const [bx, by] = best;
      ctx.fillStyle = T.bg2; ctx.globalAlpha = 0.93; grafRR(ctx, bx, by, bw, bh, 8); ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = T.line2; ctx.lineWidth = 1; ctx.stroke();
      ctx.strokeStyle = t.s.color; ctx.lineWidth = 1.6; ctx.setLineDash([6,4]); ctx.beginPath(); ctx.moveTo(bx+8, by+13); ctx.lineTo(bx+22, by+13); ctx.stroke(); ctx.setLineDash([]);
      ctx.textAlign = 'left'; ctx.fillStyle = T.ink; ctx.font = '600 11px "IBM Plex Sans", sans-serif'; ctx.fillText(l1, bx+27, by+16, bw-32);
      ctx.fillStyle = T.ink2; ctx.font = fontL; ctx.fillText(l2, bx+8, by+30, bw-14);
    });
  }

  /* rótulos directos al final de cada serie (con trazo de color; texto en tinta) */
  const puestos = [];
  if (!dib) etiquetas.forEach(({ s, q }) => {
    ctx.font = fontS; const tw = ctx.measureText(s.label).width, ww = tw + 18;
    const lx = Math.min(q[0], W-pad.r) - ww - 6; let ly = clamp(q[1]-10, pad.t+8, pad.t+ph-4);
    if (conLey && etiquetas.length === 1) return;          /* una sola serie de datos: la leyenda ya la nombra */
    const tapa = y => S.some(z => vis(z) && (z.dots || z.linea === false) && z.pts.some(p => p && Math.abs(Y(p.y) - (y - 2.5)) < 10 && X(p.x) > lx - 8 && X(p.x) < lx + ww + 6));
    const choca = y => tapa(y) || puestos.some(r => Math.abs(r.y - y) < 15 && lx < r.x + r.w && lx + ww + 8 > r.x);
    if (choca(ly)){ if (conLey) return; const alt = [ly - 16, ly + 16, ly - 32, ly + 32].find(y => y > pad.t + 6 && y < pad.t + ph - 2 && !choca(y)); if (alt == null) return; ly = alt; }
    puestos.push({ x:lx-4, y:ly, w:ww+8 });
    ctx.fillStyle = T.bg2; ctx.globalAlpha = 0.85; grafRR(ctx, lx-4, ly-10, ww+8, 15, 7); ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.setLineDash(s.dash ? [4,3] : []); ctx.beginPath(); ctx.moveTo(lx+1, ly-2.5); ctx.lineTo(lx+12, ly-2.5); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = T.ink2; ctx.textAlign='left'; ctx.fillText(s.label, lx+17, ly+1);
  });

  /* modo «dibuja tu predicción»: pista y cursor de teclado */
  if (dib){
    if (!pred.pts || !pred.pts.length){ ctx.font = '600 13px "IBM Plex Sans", sans-serif'; ctx.fillStyle = T.ink3; ctx.textAlign = 'center';
      ctx.fillText('✎ Dibuja aquí tu predicción', pad.l + pw/2, pad.t + ph/2); ctx.font = fontL; ctx.fillText('con el dedo, el ratón o las flechas del teclado', pad.l + pw/2, pad.t + ph/2 + 18); }
    if (st.predK != null && st.predAnc && st.predAnc.length){ const ax = st.predAnc[clamp(st.predK, 0, st.predAnc.length-1)];
      ctx.strokeStyle = T.pred; ctx.globalAlpha = 0.5; ctx.lineWidth = 1; ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(X(ax), pad.t); ctx.lineTo(X(ax), pad.t+ph); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      const yv = grafPredEn(pred.pts, ax); if (yv != null){ ctx.fillStyle = T.pred; ctx.beginPath(); ctx.arc(X(ax), Y(yv), 5.5, 0, Math.PI*2); ctx.fill(); ctx.strokeStyle = T.bg2; ctx.lineWidth = 2; ctx.stroke(); } }
  }
  return { X, Y, pad, pw, ph, W, H, xmin, xmax, ymin, ymax, S, tends, dib, leyenda:conLey,
    Xinv: px => xmin + (px - pad.l)/(pw||1)*(xmax-xmin), Yinv: py => ymin + (pad.t + ph - py)/(ph||1)*(ymax-ymin) };
}

/* ---------- estado por lienzo ---------- */
const GRAF_RO = (typeof ResizeObserver === 'function') ? new ResizeObserver(ents => ents.forEach(e => {
  const c = e.target, st = c._graf;
  if (!c.isConnected){ GRAF_RO.unobserve(c); return; }
  if (!st || !st.opts || st.externo || st.dentro) return;
  const w = c.clientWidth, hh = c.clientHeight, dpr = Math.min(window.devicePixelRatio||1, 2);
  if (!w || !hh) return;
  if (dpr > 1 && (Math.abs(w - c.width) < 1 || Math.abs(hh - c.height) < 1)) return;     /* lienzo sin tamaño CSS: no redibujar en bucle */
  if (Math.abs(w - st.W) < 2 && Math.abs(hh - st.H) < 2) return;
  cancelAnimationFrame(st.rafRO);
  st.rafRO = requestAnimationFrame(() => { try { if (c.isConnected && !st.externo) lineChart(c, st.opts); } catch(err){ console.warn('gráfico: redimensionar', err); } });
})) : null;

function grafEstado(canvas){
  const st = canvas._graf || grafEstadoNuevo(canvas);
  /* ¿el módulo ya dibuja su leyenda en HTML? (se revisa en los primeros dibujos y al cambiar el ancho) */
  if ((st.nDib = (st.nDib || 0) + 1) <= 3 || st.leyW !== canvas.clientWidth){ st.leyExt = grafLeyendaExterna(canvas); st.leyW = canvas.clientWidth; }
  return st;
}
function grafEstadoNuevo(canvas){
  const st = canvas._graf = { cur:null, dentro:false, externo:false };
  /* si otro módulo dibuja encima del gráfico después de lineChart, lo recordamos:
     así no borramos su dibujo al redimensionar y la imagen exportada lo incluye */
  const orig = canvas.getContext;
  canvas.getContext = function(){ if (!st.dentro) st.externo = true; return orig.apply(this, arguments); };
  if (GRAF_RO) try { GRAF_RO.observe(canvas); } catch(e){}
  return st;
}

/* ¿el módulo que llama ya pinta su propia leyenda junto al gráfico? */
function grafLeyendaExterna(canvas){
  let n = canvas.parentElement;
  for (let i = 0; i < 3 && n && n !== document.body; i++, n = n.parentElement){
    const l = n.querySelector('[class*="leg"]:not(.graf-capa *)');
    if (l && !canvas.contains(l)) return true;
    if (n.classList && (n.classList.contains('card') || n.classList.contains('lb2-body'))) break;
  }
  return false;
}
function grafDescribir(o){
  const lbs = (o.series || []).map(s => s && s.label).filter(Boolean);
  const que = o.ylabel ? o.ylabel + (o.xlabel ? ' según ' + o.xlabel : '') : 'Gráfico de líneas';
  return 'Gráfico: ' + que + (lbs.length ? '. Series: ' + lbs.join(', ') : '') + '. Usa las flechas izquierda y derecha para leer los valores; el botón de opciones permite ver los datos como tabla.';
}

/* ---------- lectura: valores de todas las series en una x ---------- */
function grafFilas(geo){
  const S = geo.S.filter(s => s.pts.length && (s._k === 'pred' || !geo.dib));
  const conNombre = S.filter(s => s.label);
  const R = (conNombre.length ? conNombre : S).slice(0, 8);
  return R.map((s, i) => ({ s, nombre: s.label || (R.length === 1 ? '' : 'serie ' + (i+1)), ord: s._ord || (s._ord = s.pts.filter(p => p && isFinite(p.x) && isFinite(p.y)).slice().sort((a,b)=>a.x-b.x)) }));
}
function grafXs(geo){
  if (geo._xs) return geo._xs;
  const F = grafFilas(geo), soloPred = F.every(f => f.s._k === 'pred');
  const set = new Set(); F.forEach(f => { if (soloPred || f.s._k !== 'pred') f.ord.forEach(p => set.add(p.x)); });   /* se lee en las x medidas, no en cada punto del trazo */
  return (geo._xs = Array.from(set).filter(x => x >= geo.xmin - 1e-9 && x <= geo.xmax + 1e-9).sort((a,b)=>a-b));
}
function grafValorEn(ord, x, geo){
  if (!ord.length) return null;
  let lo = 0, hi = ord.length - 1;
  if (x < ord[0].x - 1e-9 || x > ord[hi].x + 1e-9){ const q = x < ord[0].x ? ord[0] : ord[hi]; return Math.abs(geo.X(q.x) - geo.X(x)) <= 3 ? { p:q, y:q.y } : null; }
  while (hi - lo > 1){ const m = (lo + hi) >> 1; if (ord[m].x <= x) lo = m; else hi = m; }
  const a = ord[lo], b = ord[hi];
  if (Math.abs(geo.X(a.x) - geo.X(x)) <= 3) return { p:a, y:a.y };
  if (Math.abs(geo.X(b.x) - geo.X(x)) <= 3) return { p:b, y:b.y };
  const f = (x - a.x)/((b.x - a.x)||1); return { p:null, y: a.y + (b.y - a.y)*f, aprox:true };
}
function grafFmtY(o){ return o.tipfmt || o.yfmt || (v => grafNum(v)); }
function grafFmtX(o){ return o.xfmt || (v => grafNum(v)); }

function grafCursor(canvas, x, anunciar){
  const st = canvas._graf, geo = st && st.geo; if (!geo || !st.capa) return;
  if (x == null || geo.dib){ st.cur = null; st.guia.style.display = 'none'; st.tip.style.display = 'none'; st.marcas.forEach(m => m.style.display = 'none'); return; }
  st.cur = x;
  const o = st.opts, fy = grafFmtY(o), fx = grafFmtX(o);
  const filas = grafFilas(geo).map(f => ({ f, v: grafValorEn(f.ord, x, geo) })).filter(r => r.v && isFinite(r.v.y));
  const px = geo.X(x);
  st.guia.style.display = 'block'; st.guia.style.left = px + 'px'; st.guia.style.top = geo.pad.t + 'px'; st.guia.style.height = geo.ph + 'px';
  while (st.marcas.length < filas.length){ const m = h('div',{class:'graf-pt'}); st.marcas.push(m); st.capa.insertBefore(m, st.tip); }
  st.marcas.forEach((m, i) => { const r = filas[i]; if (!r){ m.style.display = 'none'; return; } const py = geo.Y(r.v.y);
    if (py < geo.pad.t - 4 || py > geo.pad.t + geo.ph + 4){ m.style.display = 'none'; return; }
    m.style.display = 'block'; m.style.left = px + 'px'; m.style.top = py + 'px'; m.style.background = r.f.s.color; });
  const tip = st.tip; tip.textContent = '';
  const xl = o.xlabel && o.xlabel.length <= 34 ? o.xlabel + ': ' : '';
  tip.append(h('div',{class:'gx'}, xl + fx(x)));
  const txt = [xl + fx(x)];
  filas.forEach(r => {
    const p = r.v.p; let val = (r.v.aprox ? '≈ ' : '') + fy(r.v.y);
    if (p && isFinite(p.sd) && p.sd > 0) val += ' ± ' + fy(p.sd);
    else if (p && (isFinite(p.lo) || isFinite(p.hi))) val += ' (' + fy(isFinite(p.lo) ? p.lo : p.y) + ' a ' + fy(isFinite(p.hi) ? p.hi : p.y) + ')';
    tip.append(h('div',{class:'gr'}, h('i',{class:'gk'+(r.f.s.dash?' d':''), style:'border-top-color:'+r.f.s.color}), h('b',{}, val), r.f.nombre ? h('span',{}, r.f.nombre) : null));
    txt.push((r.f.nombre ? r.f.nombre + ': ' : '') + val);
  });
  if (!filas.length) tip.append(h('div',{class:'gr'}, h('span',{}, 'Sin datos en este punto')));
  tip.style.display = 'block';
  const tw = tip.offsetWidth, th = tip.offsetHeight;
  let lx = px + 14; if (lx + tw > geo.W - 2) lx = px - 14 - tw; if (lx < 2) lx = Math.max(2, Math.min(geo.W - tw - 2, px - tw/2));
  let ty = geo.pad.t + 4; if (lx < px && lx + tw > px) ty = geo.pad.t + geo.ph - th - 4;
  tip.style.left = lx + 'px'; tip.style.top = Math.max(0, ty) + 'px';
  if (anunciar) st.vivo.textContent = txt.join('. ');
}
function grafMasCercano(xs, x){
  if (!xs.length) return null; let lo = 0, hi = xs.length - 1;
  while (hi - lo > 1){ const m = (lo + hi) >> 1; if (xs[m] <= x) lo = m; else hi = m; }
  return Math.abs(xs[lo] - x) <= Math.abs(xs[hi] - x) ? xs[lo] : xs[hi];
}

/* ---------- montaje: capa, eventos y menú ---------- */
function grafMontar(canvas, o, geo, st){
  const par = canvas.parentElement; if (!par) return;
  if (!st.capa || st.capa.parentElement !== par){
    try { if (getComputedStyle(par).position === 'static') par.style.position = 'relative'; } catch(e){}
    if (st.capa) st.capa.remove(); st.capaW = st.capaH = null;
    st.guia = h('div',{class:'graf-guia'}); st.tip = h('div',{class:'graf-tip'}); st.vivo = h('div',{class:'graf-sr','aria-live':'polite'}); st.marcas = [];
    st.menuB = h('button',{type:'button', class:'graf-mb', 'aria-label':'Opciones del gráfico', 'aria-haspopup':'true', 'aria-expanded':'false', title:'Opciones del gráfico'}, '⋯');
    st.menu = h('div',{class:'graf-menu', role:'menu'},
      h('button',{type:'button', role:'menuitem', onclick:()=>{ grafMenu(canvas, false); grafExportarPNG(canvas); }}, h('span',{'aria-hidden':'true'},'⤓'), 'Descargar imagen (PNG)'),
      h('button',{type:'button', role:'menuitem', onclick:()=>{ grafMenu(canvas, false); grafTabla(canvas); }}, h('span',{'aria-hidden':'true'},'▦'), 'Ver datos como tabla'));
    st.menuB.addEventListener('click', e => { e.stopPropagation(); grafMenu(canvas, !st.menu.classList.contains('open')); });
    st.menu.addEventListener('keydown', e => { const bs = $$('button', st.menu), i = bs.indexOf(document.activeElement);
      if (e.key === 'Escape'){ e.preventDefault(); grafMenu(canvas, false); st.menuB.focus(); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp'){ e.preventDefault(); bs[(i + (e.key === 'ArrowDown' ? 1 : bs.length - 1)) % bs.length].focus(); } });
    st.capa = h('div',{class:'graf-capa'}, st.guia, st.tip, st.menuB, st.menu, st.vivo);
    par.append(st.capa);
  }
  if (!st.eventos){ st.eventos = true; grafEventos(canvas, st); }
  /* la capa cubre exactamente el lienzo (se recoloca al cambiar de tamaño o al empezar a leer) */
  if (st.capaW !== geo.W || st.capaH !== geo.H) grafColocar(canvas);
  const mOn = !(o.menu === false || geo.dib); if (st.mOn !== mOn){ st.mOn = mOn; st.menuB.style.display = mOn ? '' : 'none'; }
  if (geo.dib) grafMenu(canvas, false);
  /* accesibilidad del lienzo */
  canvas.classList.add('graf-cv'); canvas.classList.toggle('graf-dib', !!geo.dib);
  const oculto = canvas.getAttribute('aria-hidden') === 'true';      /* el módulo lo declaró decorativo: no lo hacemos enfocable (la tabla sigue en el menú) */
  if (!oculto && !canvas.hasAttribute('tabindex')) canvas.setAttribute('tabindex', '0');
  if (!oculto && !canvas.hasAttribute('role')) canvas.setAttribute('role', 'img');
  if (!oculto && (!canvas.hasAttribute('aria-label') || st.autoLbl)){ st.autoLbl = true; canvas.setAttribute('aria-label', geo.dib ? 'Zona para dibujar tu predicción. Usa las flechas izquierda y derecha para elegir un punto y arriba y abajo para mover tu predicción.' : grafDescribir(o)); }
  if (o.prediccion && o.prediccion.estado) grafPredPanel(canvas);
  else if (st.predPanel){ st.predPanel.remove(); st.predPanel = null; }
  if (st.cur != null) grafCursor(canvas, grafMasCercano(grafXs(geo), st.cur), false);
}
function grafColocar(canvas){
  const st = canvas._graf, par = canvas.parentElement; if (!st || !st.capa || !par || !st.geo) return;
  const cr = canvas.getBoundingClientRect(), pr = par.getBoundingClientRect(), cs = st.capa.style;
  cs.left = (cr.left - pr.left - par.clientLeft + par.scrollLeft) + 'px'; cs.top = (cr.top - pr.top - par.clientTop + par.scrollTop) + 'px';
  cs.width = st.geo.W + 'px'; cs.height = st.geo.H + 'px'; st.capaW = st.geo.W; st.capaH = st.geo.H;
}
function grafMenu(canvas, abrir){
  const st = canvas._graf; if (!st || !st.menu) return;
  if (abrir){ document.querySelectorAll('.graf-menu.open').forEach(m => { m.classList.remove('open'); const b = m.previousElementSibling; if (b) b.setAttribute('aria-expanded','false'); }); }
  st.menu.classList.toggle('open', !!abrir); st.menuB.setAttribute('aria-expanded', abrir ? 'true' : 'false');
  if (abrir){ grafCursor(canvas, null); setTimeout(() => { const b = st.menu.querySelector('button'); if (b) b.focus(); }, 0); }
}
/* un solo oyente global: cerrar menús y lecturas táctiles al tocar fuera */
document.addEventListener('pointerdown', e => {
  document.querySelectorAll('.graf-menu.open').forEach(m => { if (!m.parentElement.contains(e.target)){ m.classList.remove('open'); const b = m.previousElementSibling; if (b) b.setAttribute('aria-expanded','false'); } });
  document.querySelectorAll('canvas.graf-cv').forEach(c => { const st = c._graf; if (st && st.tactil && e.target !== c){ st.tactil = false; grafCursor(c, null); } });
}, true);

function grafEventos(canvas, st){
  const pos = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const leer = e => { const g = st.geo; if (!g || g.dib) return; const [mx] = pos(e);
    if (mx < g.pad.l - 12 || mx > g.W - g.pad.r + 12){ grafCursor(canvas, null); return; }
    const x = grafMasCercano(grafXs(g), g.Xinv(mx)); grafCursor(canvas, x, false); };
  canvas.addEventListener('pointerenter', () => grafColocar(canvas));
  canvas.addEventListener('focus', () => grafColocar(canvas));
  canvas.addEventListener('pointermove', e => { const g = st.geo; if (!g) return;
    if (g.dib){ if (st.trazo){ e.preventDefault(); grafPredTrazo(canvas, pos(e)); } return; }
    if (e.pointerType === 'mouse' || e.pointerType === 'pen' || st.tactil) leer(e); });
  canvas.addEventListener('pointerdown', e => { const g = st.geo; if (!g) return;
    if (g.dib){ e.preventDefault(); st.trazo = { ultimo:null }; try { canvas.setPointerCapture(e.pointerId); } catch(_){} grafPredTrazo(canvas, pos(e)); return; }
    if (e.pointerType === 'touch'){ grafColocar(canvas); st.tactil = true; leer(e); } });
  const fin = () => { if (st.trazo){ st.trazo = null; grafPredCambio(canvas); } };
  canvas.addEventListener('pointerup', fin); canvas.addEventListener('pointercancel', fin);
  canvas.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !st.trazo && document.activeElement !== canvas) grafCursor(canvas, null); });
  canvas.addEventListener('blur', () => { if (!st.tactil) grafCursor(canvas, null); if (st.predK != null){ st.predK = null; lineChart(canvas, st.opts); } });
  canvas.addEventListener('keydown', e => {
    const g = st.geo; if (!g) return;
    if (g.dib){ grafPredTecla(canvas, e); return; }
    const xs = grafXs(g); if (!xs.length) return;
    let i = st.cur == null ? -1 : xs.indexOf(grafMasCercano(xs, st.cur));
    const paso = Math.max(1, Math.round(xs.length/10));
    if (e.key === 'ArrowRight') i = i < 0 ? 0 : Math.min(xs.length-1, i+1);
    else if (e.key === 'ArrowLeft') i = i < 0 ? xs.length-1 : Math.max(0, i-1);
    else if (e.key === 'PageUp') i = Math.min(xs.length-1, Math.max(0, i) + paso);
    else if (e.key === 'PageDown') i = Math.max(0, i - paso);
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = xs.length-1;
    else if (e.key === 'Escape'){ if (st.cur != null){ e.preventDefault(); grafCursor(canvas, null); } return; }
    else return;
    e.preventDefault(); grafCursor(canvas, xs[i], true);
  });
}

/* ---------- exportar imagen (PNG a 2x, fondo del tema, título, ejes y leyenda) ---------- */
function grafTitulo(canvas, o){
  if (o && o.titulo) return o.titulo;
  let n = canvas;
  for (let k = 0; k < 4 && n && n !== document.body; k++, n = n.parentElement){
    for (let s = n.previousElementSibling, j = 0; s && j < 6; s = s.previousElementSibling, j++){
      if (s.classList && (s.classList.contains('graf-capa') || s.classList.contains('graf-pred'))) continue;
      const t = s.matches('h1,h2,h3,h4,.eyebrow,p[style*="font-weight"]') ? s : (s.querySelector ? s.querySelector('h2,h3,h4') : null);
      if (t && t.textContent.trim()) return t.textContent.trim().replace(/\s+/g,' ').slice(0, 140);
    }
  }
  return o && o.ylabel ? o.ylabel + (o.xlabel ? ' según ' + o.xlabel : '') : 'Gráfico';
}
function grafExportarPNG(canvas){
  const st = canvas._graf; if (!st || !st.opts) return;
  const o = st.opts, W = st.W, H = st.H, k = 2, T = grafTok();
  const titulo = grafTitulo(canvas, o);
  const c = document.createElement('canvas'), x = c.getContext('2d');
  x.font = '700 15px "IBM Plex Sans", sans-serif';
  const pal = titulo.split(' '), lin = []; let l = '';
  pal.forEach(p => { const t = l ? l + ' ' + p : p; if (x.measureText(t).width > W - 28 && l){ lin.push(l); l = p; } else l = t; }); if (l) lin.push(l);
  const cab = 18 + lin.slice(0, 3).length*20, pie = 26, M = 4;
  c.width = W*k; c.height = (cab + H + pie)*k; x.scale(k, k);
  x.fillStyle = T.bg2; x.fillRect(0, 0, W, cab + H + pie);
  x.fillStyle = T.ink; x.font = '700 15px "IBM Plex Sans", sans-serif'; x.textAlign = 'left';
  lin.slice(0, 3).forEach((t, i) => x.fillText(t, 14, 26 + i*20));
  x.save(); x.translate(0, cab - M);
  if (st.externo){ x.drawImage(canvas, 0, 0, W, H); }
  else { const r = st.revelar; st.revelar = 1; try { grafPintar(x, W, H, o, st, { export:true }); } finally { st.revelar = r; } }
  x.restore();
  x.fillStyle = T.ink3; x.font = '10px "IBM Plex Mono", monospace'; x.textAlign = 'right';
  x.fillText('ANAI BioLab · ' + new Date().toLocaleDateString('es-EC'), W - 14, cab - M + H + 16);
  const nombre = 'grafico-' + (titulo.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0, 48) || 'datos') + '.png';
  const bajar = href => { const a = h('a',{href, download:nombre, style:'display:none'}); document.body.append(a); a.click(); setTimeout(() => { a.remove(); if (href.startsWith('blob:')) URL.revokeObjectURL(href); }, 4000); };
  try { c.toBlob(b => { if (b) bajar(URL.createObjectURL(b)); else bajar(c.toDataURL('image/png')); }, 'image/png'); } catch(e){ try { bajar(c.toDataURL('image/png')); } catch(e2){ toast('No se pudo generar la imagen.'); return; } }
  toast('Imagen del gráfico descargada.');
  try { Store.log('grafico', { accion:'png', titulo }); } catch(e){}
}

/* ---------- tabla accesible alternativa ---------- */
function grafTabla(canvas){
  const st = canvas._graf; if (!st || !st.geo) return;
  const o = st.opts, g = st.geo, fy = grafFmtY(o), fx = grafFmtX(o);
  const F = grafFilas(g).filter(f => f.ord.length);
  const titulo = grafTitulo(canvas, o);
  const set = new Set(); F.forEach(f => { if (f.s._k !== 'pred' || F.length === 1) f.ord.forEach(p => set.add(p.x)); });
  let xs = Array.from(set).sort((a,b)=>a-b); const total = xs.length; let paso = 1;
  if (total > 240){ paso = Math.ceil(total/240); xs = xs.filter((_, i) => i % paso === 0 || i === total-1); }
  const celda = (f, x) => { if (f.s._k === 'pred' && F.length > 1){ const v = grafPredEn(f.ord, x); return v == null ? '—' : '≈ ' + fy(v); }
    const p = f.ord.find(q => Math.abs(q.x - x) < 1e-9); if (!p) return '—';
    let t = fy(p.y); if (isFinite(p.sd) && p.sd > 0) t += ' ± ' + fy(p.sd); else if (isFinite(p.lo) || isFinite(p.hi)) t += ' (' + fy(isFinite(p.lo)?p.lo:p.y) + ' a ' + fy(isFinite(p.hi)?p.hi:p.y) + ')'; return t; };
  const nom = (f, i) => f.nombre || (F.length === 1 ? (o.ylabel || 'Valor') : 'Serie ' + (i+1));
  const tabla = h('table',{class:'data'},
    h('caption',{class:'graf-sr'}, titulo),
    h('thead',{}, h('tr',{}, h('th',{scope:'col'}, o.xlabel || 'x'), ...F.map((f,i) => h('th',{scope:'col'}, nom(f,i) + (F.length > 1 && o.ylabel && f.nombre ? ' (' + o.ylabel + ')' : ''))))),
    h('tbody',{}, xs.map(x => h('tr',{}, h('th',{scope:'row', class:'num'}, String(fx(x))), ...F.map(f => h('td',{class:'num'}, celda(f, x)))))));
  const notas = [];
  if (paso > 1) notas.push(`La serie tiene ${total} valores: se muestra 1 de cada ${paso} filas.`);
  if (F.some(f => f.ord.some(p => isFinite(p.sd) && p.sd > 0))) notas.push('«±» indica la desviación típica de las réplicas: cuánto variaron las mediciones repetidas.');
  (g.tends || []).forEach(t => notas.push((t.s.label ? t.s.label + ' · ' : '') + grafTendenciaTexto(t.fit)));
  (o.anotaciones || []).forEach(a => { if (a && a.texto) notas.push('Marca en el gráfico: «' + a.texto + '»' + (isFinite(a.x) ? ' en ' + fx(a.x) : '') + (isFinite(a.y) && !isFinite(a.x) ? ' en ' + fy(a.y) : '') + '.'); });
  const cerrar = h('button',{type:'button', class:'btn sm gcierra', onclick:()=>{ closeModal(); if (st.menuB) st.menuB.focus(); }}, 'Cerrar');
  openModal(h('div',{class:'stack graf-tabla', role:'dialog', 'aria-label':'Datos del gráfico: ' + titulo},
    cerrar, h('span',{class:'eyebrow'}, 'Datos del gráfico'), h('h3',{}, titulo),
    h('div',{class:'tablewrap'}, tabla),
    notas.length ? h('div',{class:'stack',style:'gap:4px'}, notas.map(t => h('p',{class:'gnota'}, t))) : null));
  try { Store.log('grafico', { accion:'tabla', titulo }); } catch(e){}
}

/* =====================================================================
   PREDICCIÓN: «Dibuja tu predicción» antes de ver los datos
   estado = { fase:'dibujar'|'confirmada'|'omitida', pts:[{x,y}], ev, ver }
   ===================================================================== */
function grafPredEn(pts, x){
  if (!pts || !pts.length) return null;
  const P = pts, tol = Math.max(1e-9, (P[P.length-1].x - P[0].x)*0.04);
  if (x < P[0].x) return P[0].x - x <= tol ? P[0].y : null;
  if (x > P[P.length-1].x) return x - P[P.length-1].x <= tol ? P[P.length-1].y : null;
  for (let i = 1; i < P.length; i++) if (P[i].x >= x){ const a = P[i-1], b = P[i]; const f = (x - a.x)/((b.x - a.x)||1); return a.y + (b.y - a.y)*f; }
  return P[P.length-1].y;
}
/* x de los datos (sin revelar sus valores): sirven de anclas para el teclado y para evaluar */
function grafPredAnclas(o){
  const s = (o.series || [])[0]; if (!s || !s.pts) return [];
  return Array.from(new Set(s.pts.filter(p => p && isFinite(p.x)).map(p => p.x))).sort((a,b)=>a-b);
}
function grafPredTrazo(canvas, [px, py]){
  const st = canvas._graf, g = st.geo, est = st.opts.prediccion.estado;
  if (px < g.pad.l + 10) px = g.pad.l; if (px > g.W - g.pad.r - 10) px = g.W - g.pad.r;      /* cerca del borde: llega al extremo del eje */
  const x = clamp(g.Xinv(px), g.xmin, g.xmax), y = clamp(g.Yinv(py), g.ymin, g.ymax);
  const P = est.pts || (est.pts = []);
  /* el trazo se comporta como una función: lo nuevo reemplaza lo que había entre el punto anterior y el actual */
  const u = st.trazo.ultimo, eps = (g.xmax - g.xmin)/400;
  const lo = u == null ? x - eps : Math.min(u, x), hi = u == null ? x + eps : Math.max(u, x);
  est.pts = P.filter(p => !(Math.abs(p.x - x) < eps || (p.x > lo + 1e-9 && p.x < hi - 1e-9)) || (u != null && Math.abs(p.x - u) < 1e-9 && Math.abs(p.x - x) >= eps));
  est.pts.push({ x, y }); est.pts.sort((p, q) => p.x - q.x);
  st.trazo.ultimo = x;
  if (!st.rafP) st.rafP = requestAnimationFrame(() => { st.rafP = 0; lineChart(canvas, st.opts); });
}
function grafPredTecla(canvas, e){
  const st = canvas._graf, g = st.geo, o = st.opts, est = o.prediccion.estado;
  const A = st.predAnc = grafPredAnclas(o); if (!A.length) return;
  const k = e.key; if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(k)) return;
  e.preventDefault();
  if (st.predK == null) st.predK = 0;
  else if (k === 'ArrowRight') st.predK = Math.min(A.length-1, st.predK+1);
  else if (k === 'ArrowLeft') st.predK = Math.max(0, st.predK-1);
  else if (k === 'Home') st.predK = 0; else if (k === 'End') st.predK = A.length-1;
  const ax = A[st.predK], d = (g.ymax - g.ymin)/20;
  if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'PageUp' || k === 'PageDown'){
    const act = grafPredEn(est.pts, ax), paso = (k.startsWith('Page') ? 3 : 1)*d*(k === 'ArrowUp' || k === 'PageUp' ? 1 : -1);
    const nuevo = clamp(act == null ? (g.ymin + g.ymax)/2 : act + paso, g.ymin, g.ymax);
    est.pts = (est.pts || []).filter(p => Math.abs(p.x - ax) > (g.xmax - g.xmin)/400); est.pts.push({ x:ax, y:nuevo }); est.pts.sort((p, q) => p.x - q.x);
    grafPredCambio(canvas);
  }
  lineChart(canvas, o);
  const yv = grafPredEn(est.pts, ax);
  st.vivo.textContent = 'Tu predicción en ' + grafFmtX(o)(ax) + ': ' + (yv == null ? 'sin dibujar; usa la flecha arriba para marcarla' : grafFmtY(o)(yv));
}
function grafPredCambio(canvas){ const st = canvas._graf; if (st.predBtn) st.predBtn.disabled = !grafPredValida(canvas).ok; if (st.predMsg) st.predMsg.textContent = ''; }
function grafPredValida(canvas){
  const st = canvas._graf, o = st.opts, est = o.prediccion.estado, A = grafPredAnclas(o);
  const P = est.pts || []; if (P.length < 2) return { ok:false, msg:'Traza una línea que atraviese el gráfico de izquierda a derecha.' };
  const cub = A.filter(x => grafPredEn(P, x) != null).length;
  const need = Math.max(2, Math.ceil(A.length*0.6));
  if (A.length && cub < Math.min(need, A.length)) return { ok:false, msg:`Tu curva cubre ${cub} de los ${A.length} valores que mediste. Alárgala para que llegue a casi todo el eje horizontal.` };
  return { ok:true };
}
/* compara la predicción con los datos: dirección tramo a tramo y mayor distancia */
function grafEvaluarPrediccion(pred, datos, o, rg){
  const g = { ymin: rg ? rg.ymin : (o.ymin ?? 0), ymax: rg ? rg.ymax : o.ymax };
  const D = (datos || []).filter(p => p && isFinite(p.x) && isFinite(p.y)).slice().sort((a,b)=>a.x-b.x);
  if (g.ymax == null) g.ymax = Math.max(...D.map(p=>p.y), 1);
  const rango = (g.ymax - g.ymin) || 1, tol = rango*0.04;
  const fx = grafFmtX(o), fy = grafFmtY(o), pr = o.prediccion || {};
  const ux = pr.unidadX != null ? pr.unidadX : grafUnidad(o.xlabel), uy = pr.unidadY != null ? pr.unidadY : (o.ylabel && o.ylabel.length <= 14 ? o.ylabel : '');
  const X = v => String(fx(v)) + (ux && !/[a-zA-Z°%]/.test(String(fx(v))) ? ' ' + ux : ''), Yf = v => String(fy(v)) + (uy ? ' ' + uy : '');
  const dir = d => Math.abs(d) < tol ? 0 : Math.sign(d);
  const esperado = d => d > 0 ? 'subiera' : d < 0 ? 'bajara' : 'se mantuviera casi igual', real = d => d > 0 ? 'suben' : d < 0 ? 'bajan' : 'se mantienen casi iguales';
  const esp = D.map(p => ({ p, yp: grafPredEn(pred, p.x) }));
  const tramos = [], fallos = [];
  for (let i = 1; i < esp.length; i++){ const a = esp[i-1], b = esp[i]; if (a.yp == null || b.yp == null) continue;
    const r = dir(b.p.y - a.p.y), e = dir(b.yp - a.yp); tramos.push(r === e);
    if (r !== e) fallos.push(`Entre ${X(a.p.x)} y ${X(b.p.x)} esperabas que el valor ${esperado(e)}, pero los datos ${real(r)}.`); }
  const conP = esp.filter(q => q.yp != null);
  let peor = null; conP.forEach(q => { const d = Math.abs(q.yp - q.p.y); if (!peor || d > peor.d) peor = { d, q }; });
  const errRel = conP.length ? conP.reduce((a,q)=>a+Math.abs(q.yp - q.p.y), 0)/conP.length/rango : 1;
  const ac = tramos.filter(Boolean).length, n = tramos.length;
  const lineas = [];
  let titulo;
  if (!n) titulo = 'Tu predicción ya está junto a tus datos.';
  else if (ac === n) titulo = `Acertaste la dirección de la tendencia en todos los tramos (${ac} de ${n}).`;
  else titulo = `Acertaste la dirección de la tendencia en ${ac} de ${n} tramos.`;
  fallos.slice(0, 2).forEach(t => lineas.push(t));
  if (peor && peor.d > tol) lineas.push(`Donde más te alejaste fue en ${X(peor.q.p.x)}: esperabas unos ${Yf(peor.q.yp)} y el valor medido fue ${Yf(peor.q.p.y)}.`);
  lineas.push(errRel < 0.1 && ac < n ? 'En conjunto, los valores quedaron cerca, pero la forma cambia donde no lo esperabas: ese cambio de pendiente es lo que hay que explicar.'
    : errRel < 0.1 ? 'En conjunto, tu curva quedó muy cerca de los datos: tu modelo mental del fenómeno funciona.'
    : errRel < 0.25 ? 'En conjunto, la forma se parece, pero los valores que esperabas difieren de los medidos. Revisa de qué depende el tamaño del efecto.'
    : 'En conjunto, los valores que esperabas están lejos de los medidos. Busca qué supuesto de tu hipótesis no se cumplió: eso es lo que más enseña un experimento.');
  const resumen = titulo + ' ' + lineas.join(' ');
  return { aciertos:ac, tramos:n, errRel:Math.round(errRel*1000)/1000, titulo, lineas, resumen, peorX: peor ? peor.q.p.x : null };
}
function grafPredConfirmar(canvas, omitir){
  const st = canvas._graf, o = st.opts, pr = o.prediccion, est = pr.estado;
  if (!omitir){ const v = grafPredValida(canvas); if (!v.ok){ if (st.predMsg) st.predMsg.textContent = v.msg; toast(v.msg); return; } }
  est.fase = omitir ? 'omitida' : 'confirmada'; est.ver = true; st.predK = null;
  if (!omitir){
    const datos = ((o.series || [])[0] || {}).pts || [];
    est.ev = grafEvaluarPrediccion(est.pts, datos, o, st.geo);
    const que = pr.que || ((o.ylabel || 'la variable') + (o.xlabel ? ' según ' + o.xlabel : ''));
    const txt = (pr.nota ? pr.nota + ' · ' : '') + 'Predicción dibujada antes de ver el gráfico (' + que + '). ' + est.ev.resumen;
    const comp = est.pts.filter((_, i, a) => a.length <= 40 || i % Math.ceil(a.length/40) === 0).map(p => ({ x:Math.round(p.x*1000)/1000, y:Math.round(p.y*1000)/1000 }));
    try { Store.addNote('prediccion', txt, { lab:pr.id || null, pred:comp, aciertos:est.ev.aciertos, tramos:est.ev.tramos }); } catch(e){ console.warn(e); }
    try { Store.log('prediccion', { lab:pr.id || null, accion:'confirmada', aciertos:est.ev.aciertos, tramos:est.ev.tramos, errRel:est.ev.errRel }); } catch(e){}
  } else { try { Store.log('prediccion', { lab:pr.id || null, accion:'omitida' }); } catch(e){} }
  /* revelar los datos de izquierda a derecha */
  if (grafMotion()){
    const t0 = performance.now(); st.revelar = 0;
    const paso = t => { if (!canvas.isConnected){ st.revelar = null; return; } st.revelar = Math.min(1, (t - t0)/900); lineChart(canvas, o); if (st.revelar < 1) requestAnimationFrame(paso); else { st.revelar = null; lineChart(canvas, o); } };
    requestAnimationFrame(paso);
  } else { st.revelar = null; lineChart(canvas, o); }
  try { if (pr.onFin) pr.onFin(est); } catch(e){ console.warn(e); }
  setTimeout(() => { if (st.predPanel){ const f = st.predPanel.querySelector('button, [tabindex]'); if (f && !omitir) f.focus({ preventScroll:true }); } }, 30);
}
function grafPredPanel(canvas){
  const st = canvas._graf, o = st.opts, pr = o.prediccion, est = pr.estado;
  const clave = est.fase + '|' + (est.ver !== false);
  if (st.predPanel && st.predPanel.isConnected && st.predClave === clave) return;
  const nuevo = h('div',{class:'graf-pred', role:'region', 'aria-label':'Tu predicción'});
  st.predClave = clave;
  if (est.fase === 'dibujar'){
    const msg = h('div',{class:'graf-msg', 'aria-live':'polite'});
    const ok = h('button',{type:'button', class:'btn primary sm', onclick:()=>grafPredConfirmar(canvas, false)}, 'Confirmar mi predicción y ver los datos');
    const borrar = h('button',{type:'button', class:'btn sm', onclick:()=>{ est.pts = []; grafPredCambio(canvas); lineChart(canvas, o); canvas.focus({ preventScroll:true }); }}, 'Borrar');
    const omitir = h('button',{type:'button', class:'btn sm ghost', onclick:()=>grafPredConfirmar(canvas, true)}, 'Omitir y ver los datos');
    st.predBtn = ok; st.predMsg = msg;
    const q = pr.pregunta || `¿Cómo crees que cambiará «${o.ylabel || 'la variable medida'}» a lo largo de «${o.xlabel || 'el eje horizontal'}»?`;
    nuevo.append(h('h4',{}, h('span',{class:'graf-marca','aria-hidden':'true'},'✎'), 'Antes de ver el gráfico: dibuja tu predicción'),
      h('p',{}, q + ' Traza la curva con el dedo o con el ratón sobre el gráfico. Tus datos aparecerán cuando confirmes.'),
      h('p',{class:'small muted'}, 'Con teclado: enfoca el gráfico con Tab, usa ← → para elegir un valor medido y ↑ ↓ para subir o bajar tu predicción.'),
      h('div',{class:'row'}, ok, borrar, omitir), msg);
    grafPredCambio(canvas);
  } else if (est.fase === 'confirmada' && est.ev){
    nuevo.classList.add('ok');
    const ver = h('button',{type:'button', class:'btn sm', 'aria-pressed': est.ver !== false ? 'true' : 'false', onclick:()=>{ est.ver = est.ver === false; lineChart(canvas, o); }}, est.ver !== false ? 'Ocultar mi predicción' : 'Mostrar mi predicción');
    nuevo.append(h('h4',{}, h('span',{class:'graf-marca','aria-hidden':'true'},'✎'), est.ev.titulo),
      est.ev.lineas.length ? h('ul',{}, est.ev.lineas.map(t => h('li',{}, t))) : null,
      h('p',{class:'small muted'}, 'Tu predicción (línea punteada violeta) quedó guardada en tu cuaderno. ¿Qué explica la diferencia con tus datos? Úsalo en el análisis.'),
      h('div',{class:'row'}, ver));
  } else { if (st.predPanel) st.predPanel.remove(); st.predPanel = null; return; }
  const ref = canvas.parentElement;
  if (st.predPanel && st.predPanel.isConnected) st.predPanel.replaceWith(nuevo); else ref.after(nuevo);
  st.predPanel = nuevo;
}
</script>
