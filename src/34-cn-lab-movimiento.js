<style>
/* ===== Laboratorio de movimiento, fuerzas y energía (CN · EGB Superior) ===== */
.mov-wrap{display:grid;grid-template-columns:1fr 360px;gap:16px;min-height:560px;align-items:start}
.mov-charts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
.mov-cbox{background:var(--bg-2);border:1px solid var(--line);border-radius:12px;padding:10px 10px 6px;position:relative;min-width:0}
.mov-cbox .eyebrow{display:block;margin-bottom:4px}
.mov-chart{width:100%;height:170px;display:block}
.mov-slopeinfo{font-family:var(--font-m);font-size:.74rem;color:var(--ink-2);margin-top:4px;min-height:1.2em}
.mov-fd{width:100%;height:230px;display:block;border-radius:10px;background:var(--bg-3)}
.mov-pred{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.mov-pred button{display:flex;flex-direction:column;gap:6px;align-items:stretch;background:var(--bg-2);border:1px solid var(--line);border-radius:12px;padding:8px;font:inherit;color:var(--ink);cursor:pointer;text-align:left}
.mov-pred button:hover{border-color:var(--accent)}
.mov-pred button.picked{border-color:var(--accent);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 30%,transparent)}
.mov-pred button.ok{border-color:var(--ok);box-shadow:0 0 0 2px color-mix(in srgb,var(--ok) 30%,transparent)}
.mov-pred button.bad{border-color:var(--bad)}
.mov-pred canvas{width:100%;height:78px;display:block;background:var(--bg-3);border-radius:8px}
.mov-pred span{font-size:.76rem;color:var(--ink-2);line-height:1.25}
.mov-gates{display:grid;gap:8px}
.mov-gate{display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;font-size:.8rem}
.mov-gate input[type=range]{grid-column:1/-1}
.mov-dot{width:10px;height:10px;border-radius:50%;background:var(--ink-3);flex:none}
.mov-dot.on{background:var(--ok)}
.mov-2d{position:absolute;inset:0}
.mov-bars .bar{grid-template-columns:132px 1fr 66px}
.mov-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.mov-legend{display:flex;gap:10px;flex-wrap:wrap;font-size:.72rem;color:var(--ink-2)}
.mov-legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px;vertical-align:-1px}
@media (max-width:1000px){.mov-wrap{grid-template-columns:1fr}.mov-charts{grid-template-columns:1fr}}
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · CIENCIAS FÍSICAS
   Laboratorio virtual 3D: movimiento, fuerzas y energía
   8.º U2 · 9.º U1 · 10.º U1–U2
   ===================================================================== */
Object.assign(BIO.activities, {
  'cn-lab-movimiento': { t:'Laboratorio: movimiento, fuerzas y energía', unidad:1, peso:5, xp:140 }
});

const MOV_G  = { tierra:{ n:'Tierra', g:9.8 }, luna:{ n:'Luna', g:1.62 }, marte:{ n:'Marte', g:3.71 } };
const MOV_MU = { ideal:{ n:'Ideal (sin fricción)', k:0 }, hielo:{ n:'Hielo', k:0.05 }, madera:{ n:'Madera', k:0.30 }, caucho:{ n:'Caucho', k:0.70 } };
const MOV_L  = 3.0;            // longitud útil del riel, en metros
const MOV_U  = 3.0;            // unidades de escena por metro
/* número con coma decimal, como se escribe en Ecuador */
const movN = (v, d) => (typeof v === 'number' && isFinite(v) ? v : 0).toFixed(d === undefined ? 2 : d).replace('.', ',');
/* menos animación si la persona lo pidió en accesibilidad */
const movMotion = () => motionOK() && !Store.s.a11y.motion;

route('/cn/lab/movimiento', (view) => {
  view.classList.add('wide');

  /* ---------------- estado del laboratorio ---------------- */
  const S = {
    m:1.0, F:5.0, muKey:'madera', ang:0, gKey:'tierra',
    cutOn:false, cutAt:1.5, speed:1,
    t:0, s:0, v:0, running:false, ended:'',
    Edis:0, Wap:0, Jap:0, rec:[], runs:0, tAt2:null,
    gates:[{ pos:1.0, t:null }, { pos:2.0, t:null }],
    pred:null, predDone:false, solved: !!Store.s.activities['cn-lab-movimiento']?.done,
    quiz:0
  };
  const th   = () => S.ang * Math.PI / 180;
  const gg   = () => MOV_G[S.gKey].g;
  const muk  = () => MOV_MU[S.muKey].k;
  const mus  = () => MOV_MU[S.muKey].k * 1.2;

  /* ---------------- modelo físico (SI) ----------------
     Eje +s: a lo largo del riel, hacia adelante (subiendo la rampa).
     Peso W = m·g (vertical).  Normal N = W·cos θ.
     Componente del peso sobre el riel: -W·sen θ  (tira hacia abajo de la rampa).
     Fricción cinética: -sgn(v)·μk·N.  Estática: equilibra hasta μs·N.
     a = ΣF/m.                                                          */
  function forces(st){
    const g = gg(), a = th(), W = S.m * g, N = W * Math.cos(a), Wpar = -W * Math.sin(a);
    const Fap = (S.cutOn && st.s >= S.cutAt) ? 0 : S.F;
    const mot = Fap + Wpar;                 // fuerzas motrices sin fricción
    let Ff, quieto = false;
    if (Math.abs(st.v) < 1e-4) {
      if (Math.abs(mot) <= mus() * N) { Ff = -mot; quieto = true; }   // fricción estática: equilibra
      else Ff = -Math.sign(mot) * muk() * N;
    } else Ff = -Math.sign(st.v) * muk() * N;
    const net = mot + Ff;
    return { g, ang:a, W, N, Wpar, Fap, Ff, net, a: net / S.m, quieto };
  }

  function substep(dt){
    const f = forces(S);
    let v2 = S.v + f.a * dt;
    if (S.v * v2 < 0 && Math.abs(f.Fap + f.Wpar) <= mus() * f.N) v2 = 0;  // la fricción frena, no invierte
    const ds = v2 * dt;
    let s2 = S.s + ds, vPre = v2, tope = false;
    if (s2 >= MOV_L) { s2 = MOV_L; tope = true; S.ended = 'tope'; S.running = false; }  // fin del riel: se detiene la medición
    if (s2 <= 0 && v2 < 0) { s2 = 0; v2 = 0; S.ended = 'inicio'; S.running = false; }
    // energías y magnitudes acumuladas
    S.Edis += muk() * f.N * Math.abs(ds);
    S.Wap  += f.Fap * ds;
    S.Jap  += f.Fap * dt;
    // sensores fotoeléctricos
    S.gates.forEach(G2 => { if (G2.t === null && S.s < G2.pos && s2 >= G2.pos && v2 > 0) G2.t = S.t + dt * (G2.pos - S.s) / Math.max(ds, 1e-9); });
    if (S.tAt2 === null && S.s < 2.0 && s2 >= 2.0) S.tAt2 = S.t + dt * (2.0 - S.s) / Math.max(ds, 1e-9);
    S.s = s2; S.v = v2; S.t += dt;
    // último punto de la medición, justo al llegar al final del riel
    if (tope) { S.rec.push({ t:S.t, x:MOV_L, v:vPre, a:f.a }); lastRec = S.t; }
  }

  let lastRec = -1;
  function tick(dtReal){
    if (S.running) {
      const total = Math.min(dtReal, 0.05) * S.speed;
      const n = Math.max(1, Math.min(120, Math.ceil(total / 0.002)));
      const dt = total / n;
      for (let i = 0; i < n && S.running; i++) {
        substep(dt);
        if (S.running && S.t - lastRec >= 0.02) { lastRec = S.t; const f = forces(S); S.rec.push({ t:S.t, x:S.s, v:S.v, a:f.a }); if (S.rec.length > 1500) S.rec.shift(); }
      }
      if (S.running && S.t > 0.3 && Math.abs(S.v) < 1e-4 && Math.abs(forces(S).a) < 1e-4) { S.ended = 'quieto'; S.running = false; }
      if (!S.running) finishRun();
    }
    drawStage(dtReal); drawForceDiagram(); updateReadouts();
    chartT += dtReal; if (chartT > 0.08) { chartT = 0; drawCharts(); }
  }
  let chartT = 0;

  /* ---------------- cabecera y franja de propósito ---------------- */
  view.append(h('div', { class:'page-head', style:'margin-bottom:14px' },
    h('div', {},
      h('span', { class:'eyebrow lab' }, 'Laboratorio · Ciencias Naturales · Ciencias Físicas · 8.º, 9.º y 10.º EGB'),
      h('h1', {}, 'Pista de movimiento: fuerzas, gráficas y energía'),
      h('p', {}, 'Un riel con marcas cada 0,5 m, un carrito y sensores fotoeléctricos, igual que en el laboratorio real. Cambia la masa, la fuerza, la fricción, la inclinación y hasta la gravedad del planeta, y observa qué le ocurre al movimiento.')),
    h('span', { class:'pill lab' }, '+140 XP')));

  const retoSt = h('div', { class: S.solved ? 'notice ok' : 'notice' },
    S.solved ? 'Reto resuelto ✓' : 'Todavía no: suelta el carrito desde el reposo y ajusta la fuerza hasta cruzar la marca de 2,0 m a los 2,0 s.');
  view.append(purposeBanner({
    proposito:'Relacionar las fuerzas que actúan sobre un cuerpo con su aceleración, leer las gráficas del movimiento y seguir la energía mientras el carrito se mueve.',
    observa:[
      'Qué le pasa a la pendiente de la gráfica v-t cuando cambias la fuerza o la masa',
      'Qué hace el carrito cuando apagas la fuerza a mitad del recorrido',
      'Cómo la energía cinética, la potencial y la disipada por fricción suman siempre lo mismo'
    ],
    reto:'Consigue que el carrito recorra 2,0 m en exactamente 2,0 s partiendo del reposo. ¿Qué aceleración necesitas y con qué fuerza la logras?',
    statusEl: retoSt, done: S.solved
  }));

  /* ---------------- escenario (3D o 2D) y panel ---------------- */
  const stage = h('div', { class:'stage' });
  const panel = h('div', { class:'panel' });
  const layout = h('div', { class:'mov-wrap' }, stage, panel);
  view.append(layout);

  const hud = h('div', { class:'stage-top' },
    h('span', { class:'phase', id:'mov-hud' }, 'Listo para soltar'));
  stage.append(hud);
  const hudNote = h('div', { class:'stage-note' }, 'Riel de 3,0 m · marcas cada 0,5 m');
  stage.append(h('div', { class:'stage-bottom' }, hudNote));

  /* ---------------- controles ---------------- */
  const ctrl = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '1 · Prepara el experimento'));
  function slider(id, label, min, max, step, val, unit, dec, onCh){
    const inp = h('input', { type:'range', id, min, max, step, value:val, 'aria-label':label });
    const out = h('output', { for:id }, movN(val, dec) + ' ' + unit);
    inp.addEventListener('input', () => { const x = +inp.value; out.value = movN(x, dec) + ' ' + unit; onCh(x); });
    return { el: h('div', { class:'slider' }, h('label', { for:id }, label), out, inp), inp, out, set(x){ inp.value = x; out.value = movN(x, dec) + ' ' + unit; } };
  }
  const sM = slider('mov-m', 'Masa del carrito', 0.5, 3, 0.1, S.m, 'kg', 1, x => { S.m = x; reset(false); });
  const sF = slider('mov-f', 'Fuerza aplicada', 0, 20, 0.1, S.F, 'N', 1, x => { S.F = x; reset(false); });
  const sA = slider('mov-a', 'Ángulo de la rampa', 0, 25, 1, S.ang, '°', 0, x => { S.ang = x; reset(false); });
  const sC = slider('mov-c', 'Apagar la fuerza a los', 0.2, 3, 0.1, S.cutAt, 'm', 1, x => { S.cutAt = x; reset(false); });

  const selMu = h('select', { id:'mov-mu', 'aria-label':'Superficie del riel (coeficiente de fricción)' });
  Object.entries(MOV_MU).forEach(([k, m2]) => selMu.append(h('option', { value:k }, `${m2.n} · μ = ${movN(m2.k, 2)}`)));
  selMu.value = S.muKey;
  selMu.addEventListener('change', () => { S.muKey = selMu.value; reset(false); });

  const selG = h('select', { id:'mov-g', 'aria-label':'Gravedad del planeta' });
  Object.entries(MOV_G).forEach(([k, o]) => selG.append(h('option', { value:k }, `${o.n} · g = ${movN(o.g, 2)} m/s²`)));
  selG.value = S.gKey;
  selG.addEventListener('change', () => { S.gKey = selG.value; reset(false); });

  const chkCut = h('input', { type:'checkbox', id:'mov-cut', 'aria-label':'Apagar la fuerza a mitad del recorrido' });
  chkCut.addEventListener('change', () => { S.cutOn = chkCut.checked; sC.inp.disabled = !S.cutOn; reset(false); });

  const selSpeed = h('select', { id:'mov-sp', 'aria-label':'Velocidad de la simulación' });
  [[1, 'Tiempo real (1×)'], [0.5, 'Cámara lenta (0,5×)'], [0.25, 'Cámara muy lenta (0,25×)']].forEach(([v2, n2]) => selSpeed.append(h('option', { value:v2 }, n2)));
  selSpeed.addEventListener('change', () => { S.speed = +selSpeed.value; });

  ctrl.append(sM.el, sF.el,
    h('div', { class:'field' }, h('label', { for:'mov-mu' }, 'Superficie del riel'), selMu),
    sA.el,
    h('div', { class:'field' }, h('label', { for:'mov-g' }, 'Gravedad'), selG),
    h('label', { class:'toggle', for:'mov-cut' }, chkCut, h('span', {}, 'Apagar la fuerza durante el recorrido')),
    sC.el,
    h('div', { class:'field' }, h('label', { for:'mov-sp' }, 'Velocidad de la simulación'), selSpeed));
  sC.inp.disabled = true;

  /* sensores fotoeléctricos */
  const gatesEl = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '2 · Sensores fotoeléctricos'),
    h('p', { class:'small muted' }, 'Coloca los dos sensores sobre el riel. Cada uno marca el instante en que el carrito corta su haz; con los dos calculas la velocidad media del tramo.'));
  const gatesBox = h('div', { class:'mov-gates' });
  const gDots = [], gTimes = [];
  S.gates.forEach((G2, i) => {
    const id = 'mov-gate' + i;
    const dot = h('span', { class:'mov-dot', 'aria-hidden':'true' }); gDots.push(dot);
    const tv = h('span', { class:'mono small' }, '— s'); gTimes.push(tv);
    const inp = h('input', { type:'range', id, min:0.2, max:3, step:0.1, value:G2.pos, 'aria-label':`Posición del sensor ${i + 1} en metros` });
    const out = h('output', { for:id }, movN(G2.pos, 1) + ' m');
    inp.addEventListener('input', () => { G2.pos = +inp.value; out.value = movN(G2.pos, 1) + ' m'; reset(false); });
    gatesBox.append(h('div', { class:'mov-gate' }, dot, h('label', { for:id }, `Sensor ${i + 1}`), h('span', { class:'row', style:'gap:8px' }, out, tv), inp));
  });
  const gInfo = h('p', { class:'small mono' }, 'Δt = — · velocidad media = —');
  gatesEl.append(gatesBox, gInfo);

  /* diagrama de fuerzas */
  const fdCv = h('canvas', { class:'mov-fd', role:'img', 'aria-label':'Diagrama de las fuerzas que actúan sobre el carrito' });
  const fdRead = h('div', { class:'bars mov-bars' });
  const fdBox = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '3 · Diagrama de fuerzas'), fdCv,
    h('div', { class:'mov-legend' },
      h('span', {}, h('i', { style:'background:#C0392B' }), 'Peso'),
      h('span', {}, h('i', { style:'background:#2E86C1' }), 'Normal'),
      h('span', {}, h('i', { style:'background:#B7791F' }), 'Fricción'),
      h('span', {}, h('i', { style:'background:#6C3483' }), 'Fuerza aplicada'),
      h('span', {}, h('i', { style:'background:#1E8449' }), 'Fuerza neta')),
    fdRead);

  /* energía */
  const enBox = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '4 · Energía'));
  const enBars = h('div', { class:'bars mov-bars' });
  const enNote = h('p', { class:'small muted' }, 'La suma de cinética + potencial + disipada es igual al trabajo de la fuerza aplicada (más la energía que ya tenía el carrito).');
  const wiBox = h('div', { class:'notice info', style:'display:none' });
  const wiBtn = h('button', { class:'btn sm', onclick:() => {
    const on = wiBox.style.display === 'none';
    wiBox.style.display = on ? 'flex' : 'none';
    wiBtn.textContent = on ? 'Ocultar trabajo e impulso' : 'Ver trabajo (W = F·d) e impulso (F·t) · 10.º';
    if (on) Store.log('lab_movimiento', { accion:'ver_trabajo_impulso' });
  } }, 'Ver trabajo (W = F·d) e impulso (F·t) · 10.º');
  enBox.append(enBars, enNote, wiBtn, wiBox);

  panel.append(ctrl, gatesEl, fdBox, enBox);

  /* ---------------- lecturas numéricas y botones ---------------- */
  const read = h('div', { class:'readouts' });
  const live = h('p', { class:'small', 'aria-live':'polite', style:'min-height:1.2em' }, '');
  const btnGo = h('button', { class:'btn primary', onclick:() => start() }, '▶ Soltar el carrito');
  const btnStop = h('button', { class:'btn', onclick:() => { S.running = false; S.ended = 'pausa'; setHud(); } }, '⏸ Pausar');
  const btnReset = h('button', { class:'btn ghost', onclick:() => reset(true) }, '↺ Reiniciar');
  const tools = h('div', { class:'mov-tools' }, btnGo, btnStop, btnReset);
  view.append(h('div', { class:'card stack', style:'margin-top:14px' },
    h('span', { class:'eyebrow lab' }, 'Medidas en vivo'), read, tools, live));

  /* ---------------- gráficas ---------------- */
  const cvX = h('canvas', { class:'mov-chart', role:'img', 'aria-label':'Gráfica de posición contra tiempo' });
  const cvV = h('canvas', { class:'mov-chart', role:'img', 'aria-label':'Gráfica de velocidad contra tiempo' });
  const cvA = h('canvas', { class:'mov-chart', role:'img', 'aria-label':'Gráfica de aceleración contra tiempo' });
  const infX = h('div', { class:'mov-slopeinfo' }), infV = h('div', { class:'mov-slopeinfo' }), infA = h('div', { class:'mov-slopeinfo' });
  const charts = h('div', { class:'mov-charts' },
    h('div', { class:'mov-cbox' }, h('span', { class:'eyebrow' }, 'Posición · x-t'), cvX, infX),
    h('div', { class:'mov-cbox' }, h('span', { class:'eyebrow' }, 'Velocidad · v-t'), cvV, infV),
    h('div', { class:'mov-cbox' }, h('span', { class:'eyebrow' }, 'Aceleración · a-t'), cvA, infA));

  /* herramienta de pendiente */
  const sl1 = h('input', { type:'range', min:0, max:1, step:0.01, value:0, id:'mov-p1', 'aria-label':'Primer instante para medir la pendiente' });
  const sl2 = h('input', { type:'range', min:0, max:1, step:0.01, value:1, id:'mov-p2', 'aria-label':'Segundo instante para medir la pendiente' });
  const slOut = h('div', { class:'notice' }, 'Suelta el carrito y después mide la pendiente entre dos instantes.');
  const slChk = h('input', { type:'checkbox', id:'mov-slope', 'aria-label':'Activar la herramienta de medir pendiente' });
  slChk.addEventListener('change', () => { sl1.disabled = sl2.disabled = !slChk.checked; drawCharts(); });
  sl1.disabled = sl2.disabled = true;
  [sl1, sl2].forEach(s2 => s2.addEventListener('input', () => drawCharts()));
  const slopeBox = h('div', { class:'card stack', style:'margin-top:12px' },
    h('span', { class:'eyebrow lab' }, '5 · Medir la pendiente'),
    h('p', { class:'small muted' }, 'La pendiente de la gráfica x-t es la velocidad (Δx/Δt) y la pendiente de la gráfica v-t es la aceleración (Δv/Δt). Elige dos instantes y compruébalo con tus propios datos.'),
    h('label', { class:'toggle', for:'mov-slope' }, slChk, h('span', {}, 'Mostrar la recta entre dos puntos')),
    h('div', { class:'slider' }, h('label', { for:'mov-p1' }, 'Instante t₁'), h('output', { id:'mov-o1' }, '0,00 s'), sl1),
    h('div', { class:'slider' }, h('label', { for:'mov-p2' }, 'Instante t₂'), h('output', { id:'mov-o2' }, '0,00 s'), sl2),
    slOut);

  view.append(charts, slopeBox);

  /* ---------------- predicción antes de ejecutar ---------------- */
  const predBox = h('div', { class:'card stack', style:'margin-top:12px' },
    h('span', { class:'eyebrow lab' }, '6 · Predice antes de soltar'),
    h('p', { style:'font-weight:600' }, 'Con la configuración actual, ¿cuál de estas gráficas de velocidad-tiempo esperas obtener?'));
  const predGrid = h('div', { class:'mov-pred' });
  const predFb = h('div', { class:'notice', style:'display:none' });
  const PRED = [
    { t:'A · Recta horizontal', d:'La velocidad se mantiene igual todo el recorrido.' },
    { t:'B · Recta que sube', d:'La velocidad crece de forma constante: pendiente constante.' },
    { t:'C · Sube y luego se aplana o baja', d:'Primero crece y después deja de crecer (o disminuye).' }
  ];
  const predBtns = PRED.map((p, i) => {
    const cv = h('canvas', { 'aria-hidden':'true' });
    const b = h('button', { type:'button', 'aria-label':p.t + '. ' + p.d, onclick:() => choosePred(i) },
      cv, h('b', { style:'font-size:.82rem' }, p.t), h('span', {}, p.d));
    predGrid.append(b);
    setTimeout(() => drawMini(cv, i), 0);
    return b;
  });
  predBox.append(predGrid, predFb);
  view.append(predBox);

  function drawMini(cv, kind){
    const dpr = Math.min(devicePixelRatio || 1, 2), W = cv.clientWidth || 160, H = cv.clientHeight || 78;
    cv.width = W * dpr; cv.height = H * dpr; const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    c.strokeStyle = cssVar('--line-2') || '#ccc'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(14, 6); c.lineTo(14, H - 12); c.lineTo(W - 6, H - 12); c.stroke();
    c.strokeStyle = cssVar('--lab') || '#2E86C1'; c.lineWidth = 2.5; c.beginPath();
    if (kind === 0) { c.moveTo(16, H * 0.45); c.lineTo(W - 8, H * 0.45); }
    else if (kind === 1) { c.moveTo(16, H - 14); c.lineTo(W - 8, 10); }
    else { c.moveTo(16, H - 14); c.lineTo(W * 0.55, H * 0.32); c.lineTo(W - 8, H * 0.45); }
    c.stroke();
    c.fillStyle = cssVar('--ink-3') || '#888'; c.font = '9px "IBM Plex Mono", monospace';
    c.fillText('v', 3, 12); c.fillText('t', W - 10, H - 2);
  }
  function expectedShape(){
    const f0 = forces({ s:0, v:0 });
    if (Math.abs(f0.net) < 1e-6) return -1;
    return (S.cutOn && S.cutAt < MOV_L) ? 2 : 1;
  }
  function choosePred(i){
    if (S.predDone) return;
    S.pred = i;
    predBtns.forEach((b, j) => b.classList.toggle('picked', i === j));
    predFb.style.display = 'none';
    Store.log('lab_movimiento', { accion:'prediccion', opcion:i });
  }
  function revealPred(){
    if (S.pred === null || S.predDone) return;
    const exp = expectedShape();
    S.predDone = true;
    predBtns.forEach((b, j) => { b.classList.remove('picked'); if (j === exp) b.classList.add('ok'); else if (j === S.pred) b.classList.add('bad'); });
    let msg;
    if (exp === -1) msg = '<b>El carrito no se movió.</b> La fuerza aplicada no alcanzó a vencer la fricción estática (o la componente del peso). Sube la fuerza o baja el coeficiente de fricción y vuelve a predecir.';
    else if (S.pred === exp) msg = '<b>Tu predicción coincide con el experimento.</b> ' + (exp === 1
      ? 'Con una fuerza neta constante la aceleración es constante, así que la velocidad crece en línea recta: la pendiente de v-t es justamente la aceleración.'
      : 'Al apagar la fuerza cambia la aceleración: la recta deja de subir. Con fricción baja poco a poco; sin fricción se mantiene horizontal.');
    else if (S.pred === 0) msg = '<b>Cuidado con una confusión muy común.</b> «Ir más rápido» no es lo mismo que «acelerar». Una gráfica v-t horizontal significa velocidad constante, es decir, fuerza neta cero. Aquí la fuerza neta no es cero: la velocidad cambia y por eso la recta sube.';
    else if (S.pred === 1 && exp === 2) msg = '<b>Revisa qué pasa al apagar la fuerza.</b> El carrito no se detiene de inmediato: por inercia sigue moviéndose. Sin fricción mantendría su velocidad (recta horizontal) y con fricción frena poco a poco. Por eso la gráfica sube y después se aplana o baja.';
    else msg = '<b>Revisa la fuerza.</b> En esta configuración la fuerza actúa durante todo el recorrido, así que la aceleración se mantiene y la gráfica v-t sube con la misma pendiente hasta el final.';
    predFb.className = 'notice ' + (S.pred === exp ? 'ok' : 'warn');
    predFb.innerHTML = '<span>' + msg + '</span>';
    predFb.style.display = 'flex';
  }

  /* ---------------- control del ensayo ---------------- */
  function start(){
    if (S.pred === null && !S.predDone) { toast('Antes de soltar, elige en el paso 6 qué gráfica v-t esperas.'); predBox.scrollIntoView({ behavior: movMotion() ? 'smooth' : 'auto', block:'center' }); return; }
    if (S.running) return;
    if (S.t > 0) reset(false);
    S.running = true; S.ended = ''; S.runs++;
    Store.log('lab_movimiento', { accion:'soltar', m:S.m, F:S.F, mu:S.muKey, ang:S.ang, g:S.gKey, corte:S.cutOn ? S.cutAt : null });
    setHud();
  }
  function reset(hard){
    S.running = false; S.t = 0; S.s = 0; S.v = 0; S.Edis = 0; S.Wap = 0; S.Jap = 0;
    S.rec = []; lastRec = -1; S.ended = ''; S.tAt2 = null;
    S.gates.forEach(G2 => G2.t = null);
    if (hard) { S.pred = null; S.predDone = false; predBtns.forEach(b => b.className = ''); predFb.style.display = 'none'; }
    setHud(); drawCharts(); updateReadouts();
  }
  function finishRun(){
    revealPred();
    setHud();
    const tt = S.tAt2;
    if (tt !== null) {
      if (Math.abs(tt - 2.0) <= 0.1) {
        if (!S.solved) {
          S.solved = true;
          Store.completeActivity('cn-lab-movimiento', { score: movN(tt, 2) + ' s para 2,0 m', attempts: S.runs });
          $('.reto', view) && $('.reto', view).classList.add('done');
        }
        retoSt.className = 'notice ok';
        retoSt.innerHTML = `<span><b>¡Reto resuelto!</b> El carrito cruzó la marca de 2,0 m a los ${movN(tt, 2)} s. Partiendo del reposo con aceleración constante, x = ½·a·t², así que a = 2x/t² = 2·2,0/2,0² = <b>1,0 m/s²</b>. Con m = ${movN(S.m, 1)} kg la fuerza neta necesaria es F = m·a = ${movN(S.m * 1.0, 2)} N; a esa fuerza hay que sumarle la fricción y, si inclinaste el riel, la componente del peso.</span>`;
        quizBox.style.display = '';
      } else if (tt < 1.9) {
        retoSt.className = 'notice warn';
        retoSt.innerHTML = `<span>Cruzaste los 2,0 m a los <b>${movN(tt, 2)} s</b>: vas demasiado rápido. Baja la fuerza aplicada (o sube la masa) para que la aceleración sea menor.</span>`;
      } else {
        retoSt.className = 'notice warn';
        retoSt.innerHTML = `<span>Cruzaste los 2,0 m a los <b>${movN(tt, 2)} s</b>: vas demasiado lento. Sube la fuerza aplicada (o baja la masa) para que la aceleración sea mayor.</span>`;
      }
    } else if (!S.solved) {
      retoSt.className = 'notice';
      retoSt.textContent = S.ended === 'quieto'
        ? 'El carrito no llegó a los 2,0 m: la fuerza no alcanza para vencer la fricción. Súbela o cambia la superficie.'
        : 'El carrito no llegó a la marca de 2,0 m. Revisa la fuerza, la fricción y el ángulo de la rampa.';
    }
    // rangos de la herramienta de pendiente
    const tmax = S.rec.length ? S.rec[S.rec.length - 1].t : 1;
    [sl1, sl2].forEach(s2 => { s2.min = 0; s2.max = tmax.toFixed(2); s2.step = 0.02; });
    sl1.value = 0; sl2.value = tmax.toFixed(2);
    if (!slChk.checked) slOut.textContent = 'Activa «Mostrar la recta entre dos puntos» para medir las pendientes de tus gráficas.';
    drawCharts();
    live.textContent = `Ensayo terminado a los ${movN(S.t, 2)} s. Recorrido ${movN(S.s, 2)} m, velocidad final ${movN(S.v, 2)} m/s.`;
  }
  function setHud(){
    const el = $('#mov-hud', stage); if (!el) return;
    el.textContent = S.running ? 'En movimiento…' :
      S.ended === 'tope' ? 'El carrito llegó al final del riel · medición terminada' :
      S.ended === 'quieto' ? 'El carrito quedó en reposo' :
      S.ended === 'inicio' ? 'El carrito volvió al inicio de la rampa' :
      S.ended === 'pausa' ? 'Simulación en pausa' : 'Listo para soltar';
  }

  /* ---------------- lecturas numéricas ---------------- */
  function updateReadouts(){
    const f = forces(S);
    read.innerHTML = '';
    [[movN(S.t, 2), 's', 'Tiempo'], [movN(S.s, 2), 'm', 'Posición'], [movN(S.v, 2), 'm/s', 'Velocidad'], [movN(f.a, 2), 'm/s²', 'Aceleración']]
      .forEach(([v2, u, l]) => read.append(h('div', { class:'readout' }, h('div', { class:'v' }, v2, ' ', h('span', { class:'u' }, u)), h('div', { class:'l' }, l))));
    // fuerzas
    fdRead.innerHTML = '';
    const Fref = Math.max(1, Math.abs(f.W), Math.abs(f.N), Math.abs(f.Fap), Math.abs(f.Ff), Math.abs(f.net));
    [['Peso (m·g)', f.W, '#C0392B'], ['Normal', f.N, '#2E86C1'], ['Fuerza aplicada', f.Fap, '#6C3483'], ['Fricción', f.Ff, '#B7791F'], ['Fuerza neta', f.net, '#1E8449']]
      .forEach(([l, val, col]) => fdRead.append(h('div', { class:'bar' },
        h('span', {}, l),
        h('span', { class:'track' }, h('i', { style:`width:${Math.min(100, Math.abs(val) / Fref * 100)}%;background:${col}` })),
        h('span', { class:'v' }, movN(val, 2) + ' N'))));
    // energía
    const hgt = S.s * Math.sin(th());
    const Ec = 0.5 * S.m * S.v * S.v, Ep = S.m * gg() * hgt, Ed = S.Edis, tot = Ec + Ep + Ed;
    const ref = Math.max(0.5, tot);
    enBars.innerHTML = '';
    [['Cinética · ½mv²', Ec, 'var(--ok)'], ['Potencial · mgh', Ep, 'var(--accent)'], ['Disipada por fricción', Ed, 'var(--bad)']]
      .forEach(([l, val, col]) => enBars.append(h('div', { class:'bar' },
        h('span', {}, l),
        h('span', { class:'track' }, h('i', { style:`width:${Math.min(100, val / ref * 100)}%;background:${col}` })),
        h('span', { class:'v' }, movN(val, 2) + ' J'))));
    enBars.append(h('div', { class:'bar' }, h('span', {}, h('b', {}, 'Suma')), h('span', { class:'track' }, h('i', { style:'width:100%;background:var(--ink-3)' })), h('span', { class:'v' }, h('b', {}, movN(tot, 2) + ' J'))));
    if (wiBox.style.display !== 'none') {
      const Jnet = S.m * S.v;
      wiBox.innerHTML = `<span><b>Trabajo e impulso.</b> Trabajo de la fuerza aplicada: W = F·d = <b>${movN(S.Wap, 2)} J</b>. Energía disipada por la fricción: ${movN(S.Edis, 2)} J. Variación de energía mecánica: ${movN(Ec + Ep, 2)} J (W − E<sub>disipada</sub> = ${movN(S.Wap - S.Edis, 2)} J: son iguales, ese es el teorema del trabajo y la energía).<br>Impulso de la fuerza aplicada: J = F·t = <b>${movN(S.Jap, 2)} N·s</b>. Cantidad de movimiento actual: p = m·v = <b>${movN(Jnet, 2)} kg·m/s</b>. El impulso de la fuerza <i>neta</i> es igual al cambio de la cantidad de movimiento.</span>`;
    }
    // sensores
    S.gates.forEach((G2, i) => { gDots[i].classList.toggle('on', G2.t !== null); gTimes[i].textContent = G2.t === null ? '— s' : movN(G2.t, 3) + ' s'; });
    const g0 = S.gates[0], g1 = S.gates[1];
    if (g0.t !== null && g1.t !== null && Math.abs(g1.t - g0.t) > 1e-6) {
      const dt2 = g1.t - g0.t, dx = g1.pos - g0.pos;
      gInfo.textContent = `Δt = ${movN(Math.abs(dt2), 3)} s · Δx = ${movN(Math.abs(dx), 2)} m · velocidad media = ${movN(Math.abs(dx / dt2), 2)} m/s`;
    } else gInfo.textContent = 'Δt = — · velocidad media = —';
  }

  /* ---------------- diagrama de fuerzas (canvas 2D) ---------------- */
  function drawForceDiagram(){
    const dpr = Math.min(devicePixelRatio || 1, 2), W = fdCv.clientWidth || 320, H = fdCv.clientHeight || 230;
    if (fdCv.width !== W * dpr || fdCv.height !== H * dpr) { fdCv.width = W * dpr; fdCv.height = H * dpr; }
    const c = fdCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
    const f = forces(S), a = th();
    const ux = Math.cos(a), uy = -Math.sin(a);     // a lo largo del riel, hacia adelante
    const nx = Math.sin(a), ny = -Math.cos(a);     // normal a la superficie
    const cx = W / 2, cy = H / 2 + 14;
    // superficie
    c.strokeStyle = cssVar('--line-2') || '#bbb'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(cx - ux * W * 0.45 - nx * 14, cy - uy * W * 0.45 - ny * 14); c.lineTo(cx + ux * W * 0.45 - nx * 14, cy + uy * W * 0.45 - ny * 14); c.stroke();
    // carrito
    c.save(); c.translate(cx, cy); c.rotate(-a);
    c.fillStyle = cssVar('--lab') || '#2E86C1'; c.globalAlpha = 0.85;
    c.fillRect(-20, -12, 40, 20); c.globalAlpha = 1;
    c.fillStyle = cssVar('--ink-3') || '#777';
    [-12, 12].forEach(dx => { c.beginPath(); c.arc(dx, 10, 4, 0, Math.PI * 2); c.fill(); });
    c.restore();
    const Fref = Math.max(1, Math.abs(f.W), Math.abs(f.N), Math.abs(f.Fap), Math.abs(f.Ff), Math.abs(f.net));
    const k = Math.min(H * 0.34, W * 0.30) / Fref;
    function arrow(dx, dy, col, label){
      const len = Math.hypot(dx, dy); if (len < 1.5) return;
      const ex = cx + dx, ey = cy + dy, ang = Math.atan2(dy, dx);
      c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 3; c.lineCap = 'round';
      c.beginPath(); c.moveTo(cx, cy); c.lineTo(ex - Math.cos(ang) * 8, ey - Math.sin(ang) * 8); c.stroke();
      c.beginPath(); c.moveTo(ex, ey);
      c.lineTo(ex - Math.cos(ang - 0.4) * 11, ey - Math.sin(ang - 0.4) * 11);
      c.lineTo(ex - Math.cos(ang + 0.4) * 11, ey - Math.sin(ang + 0.4) * 11);
      c.closePath(); c.fill();
      c.font = '600 10px "IBM Plex Sans", sans-serif'; c.textAlign = 'center';
      c.fillText(label, ex + Math.cos(ang) * 12, ey + Math.sin(ang) * 12 + 3);
    }
    arrow(0, f.W * k, '#C0392B', 'P');                       // peso: siempre vertical hacia abajo
    arrow(nx * f.N * k, ny * f.N * k, '#2E86C1', 'N');
    arrow(ux * f.Fap * k, uy * f.Fap * k, '#6C3483', 'F');
    arrow(ux * f.Ff * k, uy * f.Ff * k, '#B7791F', 'fr');
    c.globalAlpha = 0.95; arrow(ux * f.net * k, uy * f.net * k, '#1E8449', 'Fneta'); c.globalAlpha = 1;
    c.fillStyle = cssVar('--ink-3') || '#888'; c.font = '10px "IBM Plex Mono", monospace'; c.textAlign = 'left';
    c.fillText(`θ = ${movN(S.ang, 0)}°  ·  g = ${movN(gg(), 2)} m/s²  ·  μ = ${movN(muk(), 2)}`, 10, 16);
  }

  /* ---------------- gráficas x-t, v-t, a-t + pendiente ---------------- */
  function sampleAt(t){
    if (!S.rec.length) return null;
    let best = S.rec[0];
    for (const r of S.rec) { if (Math.abs(r.t - t) < Math.abs(best.t - t)) best = r; }
    return best;
  }
  function drawCharts(){
    const tmax = Math.max(1, S.rec.length ? S.rec[S.rec.length - 1].t : 1);
    const def = [
      { cv:cvX, key:'x', col:cssVar('--accent') || '#2E86C1', lab:'x (m)', inf:infX },
      { cv:cvV, key:'v', col:cssVar('--ok') || '#1E8449', lab:'v (m/s)', inf:infV },
      { cv:cvA, key:'a', col:cssVar('--warn') || '#B7791F', lab:'a (m/s²)', inf:infA }
    ];
    const t1 = Math.min(+sl1.value, +sl2.value), t2 = Math.max(+sl1.value, +sl2.value);
    const p1 = sampleAt(t1), p2 = sampleAt(t2);
    const show = slChk.checked && S.rec.length > 2 && p1 && p2 && Math.abs(p2.t - p1.t) > 1e-3;
    $('#mov-o1', slopeBox).value = movN(t1, 2) + ' s'; $('#mov-o2', slopeBox).value = movN(t2, 2) + ' s';
    def.forEach(d => {
      const pts = S.rec.map(r => ({ x:r.t, y:r[d.key] }));
      if (!pts.length) pts.push({ x:0, y:0 });
      const ys = pts.map(p => p.y);
      let lo = Math.min(0, ...ys), hi = Math.max(...ys, 0.1);
      const pad = (hi - lo) * 0.15 + 0.05; lo -= pad; hi += pad;
      lineChart(d.cv, { series:[{ pts, color:d.col }], xmin:0, xmax:tmax, ymin:lo, ymax:hi, xticks:4,
        xfmt:v2 => movN(v2, 1), yfmt:v2 => movN(v2, 1), ylabel:d.lab, xlabel:'t (s)' });
      if (show) {
        const o = d.cv._opts, c = d.cv.getContext('2d');
        const y1 = p1[d.key], y2 = p2[d.key];
        c.save(); c.strokeStyle = cssVar('--bad') || '#C0392B'; c.lineWidth = 1.8; c.setLineDash([5, 4]);
        c.beginPath(); c.moveTo(o.X(p1.t), o.Y(y1)); c.lineTo(o.X(p2.t), o.Y(y2)); c.stroke();
        c.setLineDash([]); c.fillStyle = cssVar('--bad') || '#C0392B';
        [[p1.t, y1], [p2.t, y2]].forEach(([tx, ty]) => { c.beginPath(); c.arc(o.X(tx), o.Y(ty), 4, 0, Math.PI * 2); c.fill(); });
        c.restore();
        const sl = (y2 - y1) / (p2.t - p1.t);
        d.inf.textContent = d.key === 'x' ? `pendiente = ${movN(sl, 2)} m/s (velocidad media)` :
          d.key === 'v' ? `pendiente = ${movN(sl, 2)} m/s² (aceleración media)` :
          `variación = ${movN(sl, 2)} m/s³`;
      } else d.inf.textContent = '';
    });
    if (show) {
      const vx = (p2.x - p1.x) / (p2.t - p1.t), av = (p2.v - p1.v) / (p2.t - p1.t);
      slOut.className = 'notice ok';
      slOut.innerHTML = `<span>Entre t₁ = ${movN(p1.t, 2)} s y t₂ = ${movN(p2.t, 2)} s: <b>Δx/Δt = ${movN(vx, 2)} m/s</b> (la pendiente de x-t <b>es</b> la velocidad media) y <b>Δv/Δt = ${movN(av, 2)} m/s²</b> (la pendiente de v-t <b>es</b> la aceleración media). Compáralos con las lecturas del carrito en esos instantes.</span>`;
    } else if (S.rec.length > 2) {
      slOut.className = 'notice';
      slOut.textContent = 'Activa «Mostrar la recta entre dos puntos» y mueve los dos instantes con el teclado o el ratón.';
    }
  }

  /* ---------------- escena 3D ---------------- */
  let E = null, cart = null, tiltG = null, gateMesh = [], wheels = [], beam = [], movX = {};
  const MOV_Y0 = -0.36;                    /* cara superior de la mesada */
  if (webglOK) {
    try {
      /* en pantallas angostas la pista se mira algo más desde arriba y desde el inicio (sin pasar de θ ≈ −0,42: más allá el motor oculta las etiquetas del extremo lejano) */
      const estrecho = stage.clientWidth < stage.clientHeight * 1.1;
      E = new Engine3D(stage, { declutter:false, radius:estrecho ? cnLabKit.fitR(stage, 11.0, 1.45, 0.92) : cnLabKit.fitR(stage, 11.2, 1.45, 0.85), phi:estrecho ? 1.0 : 1.1, theta:estrecho ? -0.4 : -0.34, minR:5, maxR:30, target:estrecho ? [-0.25, 0.1, 0.3] : [-0.75, 0.2, 0.1], floor:MOV_Y0 + 0.004, floorSize:12,
        aria:'Pista de movimiento en 3D: riel con marcas cada 0,5 metros, carrito y sensores fotoeléctricos. Usa los controles del panel para experimentar.' });
      buildScene();
    } catch (e) { console.warn(e); if (E) { try { E.dispose(); } catch (e2) {} } E = null; }
  }
  function buildScene(){
    const K = cnLabKit, low = E.low, RL = MOV_L * MOV_U;
    const root = new THREE.Group(); E.scene.add(root);
    /* mesada de laboratorio, mueble y pared */
    const B = K.bench({ w:RL + 2.8, d:3.2, y:MOV_Y0, x:0.2, z:-0.1, t:0.16, top:'wood', base:[200,160,112], wall:{ z:-1.7, h:5, w:30 }, cabH:2.3, seed:29 });
    root.add(B.group);
    /* grupo inclinable: pivote en el inicio del riel */
    tiltG = new THREE.Group(); tiltG.position.set(-RL / 2, 0, 0); root.add(tiltG);
    /* riel de aluminio extruido (perfil con ranuras y guías laterales) */
    const pr = new THREE.Shape(); const hw = 0.56;
    pr.moveTo(-hw, -0.16); pr.lineTo(hw, -0.16); pr.lineTo(hw, 0.05); pr.lineTo(hw - 0.07, 0.05); pr.lineTo(hw - 0.07, 0); pr.lineTo(-hw + 0.07, 0); pr.lineTo(-hw + 0.07, 0.05); pr.lineTo(-hw, 0.05); pr.lineTo(-hw, -0.16);
    const rielG = new THREE.ExtrudeGeometry(pr, { depth:RL + 1.5, bevelEnabled:true, bevelSize:0.01, bevelThickness:0.01, bevelSegments:1, curveSegments:2 });
    rielG.rotateY(Math.PI / 2); rielG.translate(-0.7, 0, 0);
    const alu = K.metal(0xC3CAD1, { rough:0.32, brushed:true, rep:[8, 1] });
    tiltG.add(new THREE.Mesh(rielG, alu));
    const ranM = K.metal(0x5A636C, { rough:0.5 });
    [-0.09, -0.05].forEach(y => { const r2 = new THREE.Mesh(new THREE.BoxGeometry(RL + 1.5, 0.012, 0.01), ranM); r2.position.set(RL / 2 + 0.05, y, -hw - 0.004); tiltG.add(r2); });
    /* cinta métrica impresa en el frente del riel */
    const cinta = K.printed(K.low() ? 2048 : 4096, K.low() ? 48 : 96, (x, w, hh) => {
      x.fillStyle = '#F7E27A'; x.fillRect(0, 0, w, hh); x.fillStyle = '#1F2328';
      const px = w / 300;
      for (let cm = 0; cm <= 300; cm++) { const big = cm % 50 === 0, mid = cm % 10 === 0; const lh = big ? hh * 0.75 : mid ? hh * 0.5 : hh * 0.28; x.fillRect(cm * px - (big ? 1.5 : 0.5), 0, big ? 3 : mid ? 1.6 : 1, lh);
        if (mid && cm < 300 && !big) { x.font = `600 ${Math.round(hh * 0.3)}px "IBM Plex Mono", monospace`; x.textAlign = 'left'; x.fillText(String(cm % 100), cm * px + 3, hh * 0.9); }
        if (big) { x.font = `800 ${Math.round(hh * 0.42)}px "IBM Plex Sans", Arial`; x.textAlign = 'left'; x.fillStyle = '#C0392B'; x.fillText(movN(cm / 100, 1) + ' m', cm * px + 5, hh * 0.9); x.fillStyle = '#1F2328'; } }
    });
    const cintaM = new THREE.Mesh(new THREE.PlaneGeometry(RL, 0.13), new THREE.MeshPhysicalMaterial({ map:cinta, roughness:0.5, clearcoat:0.3 })); cintaM.position.set(RL / 2, -0.075, hw + 0.012); tiltG.add(cintaM);
    /* marcas cada 0,5 m sobre la guía (las de metro entero, más altas y claras) */
    for (let i = 0; i <= MOV_L / 0.5; i++) {
      const met = (i % 2 === 0);
      const tk = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.012, met ? 0.12 : 0.08), new THREE.MeshBasicMaterial({ color: met ? 0xC0392B : 0x2B2F36 }));
      tk.position.set(i * 0.5 * MOV_U, 0.057, hw - 0.035); tiltG.add(tk);
      if (met) E.addLabel('mk' + i, movN(i * 0.5, 1) + ' m', [-RL / 2 + i * 0.5 * MOV_U, 0.45, 0.62]);
    }
    /* topes de los extremos */
    const topeM = K.plastic(0x2B2F36, { rough:0.5 });
    const t1 = new THREE.Mesh(K.rbox(0.18, 0.3, 0.9, 0.04), topeM); t1.position.set(-0.64, 0.15, 0); tiltG.add(t1);
    const t2 = new THREE.Mesh(K.rbox(0.18, 0.3, 0.9, 0.04), topeM); t2.position.set(RL + 0.66, 0.15, 0); tiltG.add(t2);
    const amort = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.08, 16), K.plastic(0xE0B42A, { rough:0.6 })); amort.rotation.z = Math.PI / 2; amort.position.set(RL + 0.54, 0.2, 0); tiltG.add(amort);
    /* pata regulable junto al pivote y soporte universal en el extremo (sostiene la rampa) */
    const pata = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.22, 12), topeM); pata.position.set(0.2, -0.27, 0); tiltG.add(pata);
    const sop = new THREE.Group(); root.add(sop); movX.sop = sop;
    const bp = new THREE.Mesh(K.rbox(0.7, 0.06, 0.5, 0.04), K.metal(0x3C4650, { rough:0.5, metal:0.6 })); bp.position.set(0, MOV_Y0 + 0.03, -0.9); sop.add(bp);
    const vr = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 4.7, 12), K.metal(0xA9B2BA, { rough:0.3 })); vr.position.set(0, MOV_Y0 + 2.35, -0.9); sop.add(vr); movX.vr = vr;
    const nuez = new THREE.Mesh(K.rbox(0.16, 0.16, 0.16, 0.03), K.metal(0x5A646E, { rough:0.45 })); sop.add(nuez); movX.nuez = nuez;
    const brazo = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.72, 10), K.metal(0xA9B2BA, { rough:0.3 })); brazo.rotation.x = Math.PI / 2; sop.add(brazo); movX.brazo = brazo;
    /* carrito dinámico */
    cart = new THREE.Group(); tiltG.add(cart);
    const body = new THREE.Mesh(K.rbox(1.0, 0.24, 0.72, 0.07, 0.04), K.plastic(0xD64541, { rough:0.32, coat:0.8 })); body.position.y = 0.3; cart.add(body);
    const bandeja = new THREE.Mesh(K.rbox(0.86, 0.05, 0.6, 0.03, 0.015), K.plastic(0x23272C, { rough:0.5 })); bandeja.position.y = 0.44; cart.add(bandeja);
    [-0.52, 0.52].forEach(x => { const bm = new THREE.Mesh(K.rbox(0.06, 0.16, 0.5, 0.025), K.plastic(0x1C1F23, { rough:0.6 })); bm.position.set(x, 0.3, 0); cart.add(bm); });
    const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.14, 10), K.metal(0xC9CED3, { rough:0.25 })); piston.rotation.z = Math.PI / 2; piston.position.set(0.61, 0.32, 0); cart.add(piston);
    /* bandera que corta el haz de los sensores */
    const bandera = new THREE.Mesh(K.rbox(0.1, 0.3, 0.02, 0.02, 0.008), K.plastic(0x1C1F23, { rough:0.5 })); bandera.position.set(0, 0.62, 0); cart.add(bandera);
    /* pesas de latón de 0,5 kg: se ven tantas como masa extra lleva el carrito */
    movX.pesas = [];
    const laton = K.metal(0xC9A55A, { rough:0.3 });
    for (let i = 0; i < 5; i++) { const ps = new THREE.Mesh(K.rbox(0.3, 0.075, 0.5, 0.02, 0.012), laton); ps.position.set(i % 2 ? 0.22 : -0.22, 0.505 + Math.floor(i / 2) * 0.08, 0); cart.add(ps); movX.pesas.push(ps); }
    /* ruedas: neumático de goma, llanta y eje */
    const llM = K.metal(0xB7BEC5, { rough:0.3 }), gomaM = K.plastic(0x1C1E21, { rough:0.8, coat:0.05 });
    const ruedaG = K.lathe([[0.001, -0.045], [0.12, -0.045], [0.145, -0.035], [0.152, 0], [0.145, 0.035], [0.12, 0.045], [0.001, 0.045]], low ? 18 : 28);
    const llantaG = new THREE.CylinderGeometry(0.1, 0.1, 0.095, low ? 14 : 20);
    [[-0.32, -0.41], [-0.32, 0.41], [0.32, -0.41], [0.32, 0.41]].forEach(([x, z]) => {
      const w = new THREE.Group(); w.rotation.x = Math.PI / 2; w.position.set(x, 0.152, z); cart.add(w);
      w.add(new THREE.Mesh(ruedaG, gomaM)); const ll = new THREE.Mesh(llantaG, llM); w.add(ll);
      [-1, 1].forEach(sd => [0, 1, 2].forEach(k => { const rayo = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.012, 0.03), K.metal(0x5E6770, { rough:0.4 })); rayo.rotation.y = k * Math.PI / 3; rayo.position.y = sd * 0.049; w.add(rayo); }));
      wheels.push(w);
    });
    /* flecha de la fuerza aplicada (violeta, como en el diagrama) */
    const fM = new THREE.MeshStandardMaterial({ color:0x6C3483, emissive:0x6C3483, emissiveIntensity:0.25, roughness:0.4 });
    const fl = new THREE.Group(); fl.position.set(0.7, 0.32, 0); cart.add(fl); movX.flecha = fl;
    const cuerpoF = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1, 10), fM); cuerpoF.geometry.translate(0, 0.5, 0); cuerpoF.rotation.z = -Math.PI / 2; fl.add(cuerpoF); movX.fCuerpo = cuerpoF;
    const puntaF = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 14), fM); puntaF.rotation.z = -Math.PI / 2; fl.add(puntaF); movX.fPunta = puntaF;
    /* sensores fotoeléctricos en forma de U con su LED */
    S.gates.forEach((G2, i) => {
      const g2 = new THREE.Group(); tiltG.add(g2);
      const cm = K.plastic(i ? 0x27AE60 : 0x2E86C1, { rough:0.4, coat:0.6 });
      [-0.74, 0.74].forEach(z => { const brazo2 = new THREE.Mesh(K.rbox(0.2, 0.95, 0.14, 0.05, 0.02), cm); brazo2.position.set(0, 0.47, z); g2.add(brazo2);
        const lente = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 12), K.plastic(0x111316, { rough:0.2, coat:1 })); lente.rotation.x = Math.PI / 2; lente.position.set(0, 0.6, z - Math.sign(z) * 0.075); g2.add(lente); });
      const puente = new THREE.Mesh(K.rbox(0.2, 0.14, 1.62, 0.05, 0.02), cm); puente.position.set(0, 1.0, 0); g2.add(puente);
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), new THREE.MeshBasicMaterial({ color:0x3DDC84, toneMapped:false })); led.position.set(0, 1.08, 0.5); g2.add(led); g2.userData.led = led;
      const ab = new THREE.Mesh(K.rbox(0.28, 0.06, 0.2, 0.02), K.metal(0x5A636C, { rough:0.5 })); ab.position.set(0, 0.0, -0.74); g2.add(ab);
      const bm = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1.33, 6), new THREE.MeshBasicMaterial({ color:0xE74C3C, transparent:true, opacity:0.55, toneMapped:false })); bm.rotation.x = Math.PI / 2; bm.position.set(0, 0.6, 0); g2.add(bm); beam.push(bm);
      gateMesh.push(g2);
      E.addLabel('gate' + i, 'Sensor ' + (i + 1), [0, 0, 0]);
    });
    /* cronómetro digital conectado a los sensores */
    const cr = new THREE.Group(); cr.position.set(-RL / 2 + 1.9, MOV_Y0, 1.12); root.add(cr);
    const crb = new THREE.Mesh(K.rbox(1.0, 0.32, 0.5, 0.06, 0.03), K.plastic(0x2F3A44, { rough:0.45, coat:0.5 })); crb.position.y = 0.16; crb.rotation.x = 0.0; cr.add(crb);
    movX.lcd = K.lcd({ w:320, h:96, text:'0,00 s' });
    const crl = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.2), movX.lcd.mat); crl.position.set(-0.1, 0.2, 0.252); cr.add(crl);
    [[0.36, 0x3DDC84], [0.36, 0xE74C3C]].forEach(([x, c], k) => { const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 12), K.plastic(c)); b2.rotation.x = Math.PI / 2; b2.position.set(x, 0.26 - k * 0.12, 0.26); cr.add(b2); });
    const cab = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0.5, 0.15, -0.1), new THREE.Vector3(0.8, 0.02, -0.4), new THREE.Vector3(1.0, 0.02, -0.7), new THREE.Vector3(1.1, 0.1, -0.95)]), 30, 0.018, 6, false), K.plastic(0x1C1F23)); cr.add(cab);
    E.addLabel('crono', 'Cronómetro', [-RL / 2 + 1.9, MOV_Y0 + 0.7, 1.12]);
    E.onFrame((t, dt) => tick(dt));
  }

  /* ---------------- alternativa 2D (sin WebGL) ---------------- */
  let cv2 = null, raf2 = 0;
  if (!E) {
    stage.append(h('div', { class:'ph', style:'position:absolute;top:46px;left:12px;right:12px;z-index:2' },
      'Sin WebGL: se muestra la vista lateral de la pista en 2D. La simulación, las gráficas, la energía y el reto funcionan igual.'));
    cv2 = h('canvas', { class:'mov-2d', role:'img', 'aria-label':'Vista lateral de la pista de movimiento con el carrito y los sensores' });
    stage.append(cv2);
    let last = performance.now();
    const loop = now => { raf2 = requestAnimationFrame(loop); if (document.hidden) { last = now; return; } const dt = Math.min((now - last) / 1000, 0.05); last = now; tick(dt); };
    raf2 = requestAnimationFrame(loop);
  }

  function drawStage(dtR){
    if (E) {
      const a = th();
      tiltG.rotation.z = a;
      cart.position.set(S.s * MOV_U, 0, 0);
      /* las ruedas giran lo que avanza el carrito (sin deslizar): ángulo = distancia / radio */
      if (movMotion() && S.running) { const dw = S.v * MOV_U * S.speed * Math.min(dtR || 0.016, 0.05) / 0.152; wheels.forEach(w => w.rotation.y -= dw); }
      const ca = Math.cos(a), sa = Math.sin(a), x0 = -MOV_L * MOV_U / 2;
      const aMundo = (xl, yl, z) => [x0 + xl * ca - yl * sa, xl * sa + yl * ca, z];
      S.gates.forEach((G2, i) => { gateMesh[i].position.x = G2.pos * MOV_U; const corta = G2.t !== null && Math.abs(S.s - G2.pos) < 0.12; beam[i].material.opacity = corta ? 1 : 0.5;
        gateMesh[i].userData.led.material.color.set(G2.t !== null ? 0xFF4B3A : 0x3DDC84);
        const l = E.labels.get('gate' + i); if (l) l.pos.set(...aMundo(G2.pos * MOV_U, 1.38, 0)); });
      /* masa extra en pesas de 0,5 kg, flecha de la fuerza aplicada y soporte del extremo elevado */
      const nP = clamp(Math.round((S.m - 0.5) / 0.5), 0, 5); movX.pesas.forEach((p, i) => p.visible = i < nP);
      const fa = forces(S).Fap; movX.flecha.visible = fa > 0.05; const lf = 0.2 + fa / 20 * 1.8; movX.fCuerpo.scale.y = lf; movX.fPunta.position.x = lf + 0.1;
      const ext = aMundo(MOV_L * MOV_U + 0.5, -0.08, 0); movX.sop.position.x = ext[0]; movX.nuez.position.set(0, ext[1], -0.9); movX.brazo.position.set(0, ext[1], -0.54);
      const hv = Math.max(1.2, ext[1] - MOV_Y0 + 0.45); movX.vr.scale.y = hv / 4.7; movX.vr.position.y = MOV_Y0 + hv / 2;
      movX.lcd.set(movN(S.t, 2) + ' s');
      // las etiquetas de las marcas acompañan la inclinación del riel
      for (let i = 0; i <= MOV_L / 0.5; i += 2) {
        const l = E.labels.get('mk' + i); if (!l) continue;
        const d = i * 0.5 * MOV_U;
        l.pos.set(x0 + d * ca - 0.45 * sa, d * sa + 0.45 * ca, 0.62);
      }
      return;
    }
    if (!cv2) return;
    const dpr = Math.min(devicePixelRatio || 1, 2), W = stage.clientWidth || 600, H = stage.clientHeight || 520;
    if (cv2.width !== W * dpr || cv2.height !== H * dpr) { cv2.width = W * dpr; cv2.height = H * dpr; }
    const c = cv2.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
    const a = th(), m2px = (W - 120) / MOV_L, x0 = 60, y0 = H * 0.68;
    c.save(); c.translate(x0, y0); c.rotate(-a);
    c.fillStyle = cssVar('--ink-3') || '#7a7a7a'; c.fillRect(0, 0, MOV_L * m2px, 8);
    for (let i = 0; i <= MOV_L / 0.5; i++) {
      const met = (i % 2 === 0), px = i * 0.5 * m2px;
      c.fillStyle = met ? (cssVar('--ink') || '#222') : (cssVar('--ink-3') || '#999');
      c.fillRect(px - 1, met ? -16 : -10, 2, met ? 16 : 10);
      if (met) { c.save(); c.font = '10px "IBM Plex Mono", monospace'; c.textAlign = 'center'; c.fillText(movN(i * 0.5, 1) + ' m', px, -22); c.restore(); }
    }
    S.gates.forEach((G2, i) => {
      const px = G2.pos * m2px;
      c.fillStyle = i ? '#27AE60' : '#2E86C1'; c.fillRect(px - 2, -58, 4, 46);
      c.fillStyle = G2.t !== null ? '#E74C3C' : 'rgba(231,76,60,.35)'; c.fillRect(px - 10, -46, 20, 3);
    });
    const cxp = S.s * m2px;
    c.fillStyle = '#E2574C'; c.fillRect(cxp - 22, -30, 44, 22);
    c.fillStyle = '#2C3E50'; c.fillRect(cxp - 10, -40, 22, 10);
    c.fillStyle = '#2B2B2B';
    [-13, 13].forEach(d => { c.beginPath(); c.arc(cxp + d, -5, 6, 0, Math.PI * 2); c.fill(); });
    c.restore();
    c.fillStyle = cssVar('--ink-2') || '#444'; c.font = '600 12px "IBM Plex Sans", sans-serif';
    c.fillText(`t = ${movN(S.t, 2)} s · x = ${movN(S.s, 2)} m · v = ${movN(S.v, 2)} m/s · a = ${movN(forces(S).a, 2)} m/s²`, 16, H - 16);
  }

  /* ---------------- cierre: preguntas ---------------- */
  const quizBox = h('div', { class:'card stack', style:'margin-top:12px;display:' + (S.solved ? '' : 'none') },
    h('span', { class:'eyebrow lab' }, '7 · Cierre'));
  const doneQ = () => { S.quiz++; if (S.quiz >= 2) Store.completeActivity('cn-lab-movimiento', { score:'reto + cierre', attempts:S.runs }); };
  quizBox.append(quizBlock({
    q:'Partiendo del reposo, ¿qué aceleración se necesita para recorrer 2,0 m en 2,0 s?',
    ops:['0,5 m/s²', '1,0 m/s²', '2,0 m/s²'],
    ok:1,
    fb:'Con aceleración constante y velocidad inicial cero, x = ½·a·t². Despejando: a = 2x/t² = 2·2,0 m ÷ (2,0 s)² = 1,0 m/s². La velocidad media del recorrido fue 1,0 m/s y la velocidad final, 2,0 m/s.',
    wrong:['0,5 m/s es la rapidez media dividida entre el tiempo, no la aceleración. Usa x = ½·a·t² y despeja a.',
           '2,0 m/s² sale de dividir la distancia entre el tiempo al cuadrado sin el factor ½. Recuerda: x = ½·a·t².']
  }, doneQ));
  quizBox.append(quizBlock({
    q:'Apoyas el mismo carrito sobre una cara más ancha, sin cambiar su masa ni la superficie del riel. ¿Qué pasa con la fuerza de fricción?',
    ops:['Aumenta, porque hay más superficie en contacto', 'Se mantiene prácticamente igual', 'Disminuye, porque el peso se reparte en más superficie'],
    ok:1,
    fb:'La fricción de deslizamiento depende del coeficiente μ y de la fuerza normal (fr = μ·N), no del área de contacto. Al apoyarlo sobre otra cara, N sigue siendo el mismo y la fricción no cambia. Compruébalo en la simulación: solo cambia si cambias la masa, el ángulo o la superficie.',
    wrong:['Más área de contacto reparte la misma fuerza normal entre más puntos: la presión baja, pero la fricción total sigue siendo μ·N.',
           'El peso se reparte, sí, pero la fuerza normal total es la misma, así que fr = μ·N tampoco cambia.']
  }, doneQ));
  view.append(quizBox);

  /* ---------------- arranque ---------------- */
  chkCut.checked = false; selSpeed.value = '1';
  updateReadouts(); drawCharts(); drawForceDiagram(); setHud();
  if (!E) drawStage();
  window.addEventListener('resize', drawCharts);

  return { unmount(){
    if (raf2) cancelAnimationFrame(raf2);
    window.removeEventListener('resize', drawCharts);
    E && E.dispose();
  } };
});
</script>
