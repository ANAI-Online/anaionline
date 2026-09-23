<style>
/* ===== Laboratorio de energía: calor, luz y sonido (CN · EGB Superior) ===== */
.ene-wrap{display:grid;grid-template-columns:1fr 380px;gap:16px;min-height:540px;align-items:start}
.ene-2d{position:absolute;inset:0}
.ene-dia{width:100%;height:280px;display:block;background:var(--bg-3);border-radius:12px}
.ene-chart{width:100%;height:210px;display:block}
.ene-cbox{background:var(--bg-2);border:1px solid var(--line);border-radius:12px;padding:10px 10px 6px;min-width:0}
.ene-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ene-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.ene-bars .bar{grid-template-columns:150px 1fr 96px}
.ene-mats{display:grid;gap:8px}
.ene-mat{display:grid;grid-template-columns:14px 1fr auto;gap:8px;align-items:center;font-size:.8rem}
.ene-sw{width:14px;height:14px;border-radius:4px;border:1px solid var(--line-2);flex:none}
.ene-flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;gap:8px;align-items:start}
.ene-slot{background:var(--bg-2);border:1px solid var(--line);border-radius:12px;padding:9px;display:flex;flex-direction:column;gap:6px;min-width:0}
.ene-slot.ok{border-color:var(--ok);box-shadow:0 0 0 2px color-mix(in srgb,var(--ok) 26%,transparent)}
.ene-slot.bad{border-color:var(--bad)}
.ene-slot label{font-size:.7rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--ink-3)}
.ene-slot select{width:100%;font:inherit;font-size:.78rem}
.ene-slot .ene-fb{font-size:.74rem;color:var(--ink-2);line-height:1.3}
.ene-arrow{align-self:center;text-align:center;color:var(--ink-3);font-size:1.1rem}
.ene-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.ene-legend{display:flex;gap:10px;flex-wrap:wrap;font-size:.72rem;color:var(--ink-2)}
.ene-legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px;vertical-align:-1px}
.ene-err{display:grid;gap:8px}
.ene-err button{text-align:left;font:inherit;background:var(--bg-2);border:1px solid var(--line);border-radius:10px;padding:9px 11px;color:var(--ink);cursor:pointer}
.ene-err button:hover{border-color:var(--accent)}
.ene-err .ene-errbody{font-size:.8rem;color:var(--ink-2);line-height:1.4;margin-top:6px;display:none}
.ene-err button[aria-expanded="true"] .ene-errbody{display:block}
.ene-db{height:14px;border-radius:7px;background:linear-gradient(90deg,#1E8449 0%,#1E8449 45%,#B7791F 62%,#C0392B 100%);position:relative;border:1px solid var(--line-2)}
.ene-db i{position:absolute;top:-4px;width:3px;height:20px;background:var(--ink);border-radius:2px}
.ene-left{display:flex;flex-direction:column;gap:14px;min-width:0}
.ene-left .stage{min-height:460px}
@media (max-width:1000px){.ene-wrap{grid-template-columns:1fr}.ene-grid2,.ene-grid3,.ene-flow{grid-template-columns:1fr}.ene-arrow{display:none}}
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · CIENCIAS FÍSICAS
   Laboratorio virtual 3D: energía y transferencia — calor, luz y sonido
   8.º CF U3 (AO.CF.8.07–09) · apoyo a 10.º CF U3 (ondas)
   ===================================================================== */
Object.assign(BIO.activities, {
  'cn-lab-energia': { t:'Laboratorio: calor, luz y sonido', unidad:null, peso:0, xp:120 }
});

/* número con coma decimal, como se escribe en Ecuador */
const eneN = (v, d) => (typeof v === 'number' && isFinite(v) ? v : 0).toFixed(d === undefined ? 1 : d).replace('.', ',');
/* miles separados por espacio fino, como recomienda el SI */
const eneMil = (v, d) => { const t = eneN(v, d === undefined ? 0 : d).split(','); t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F'); return t.join(','); };
/* menos animación si la persona lo pidió en accesibilidad */
const eneMotion = () => motionOK() && !Store.s.a11y.motion;

/* escala térmica azul → cian → ámbar → rojo (nunca pasa por el verde) */
const ENE_RAMPA = [[0, 46, 100, 193], [35, 53, 183, 201], [65, 232, 163, 61], [100, 192, 57, 43]];
function eneColT(T){
  const t = clamp(T, 0, 100);
  for (let i = 1; i < ENE_RAMPA.length; i++) {
    const a = ENE_RAMPA[i - 1], b = ENE_RAMPA[i];
    if (t <= b[0]) {
      const k = (t - a[0]) / (b[0] - a[0]);
      return [Math.round(a[1] + (b[1] - a[1]) * k), Math.round(a[2] + (b[2] - a[2]) * k), Math.round(a[3] + (b[3] - a[3]) * k)];
    }
  }
  return ENE_RAMPA[ENE_RAMPA.length - 1].slice(1);
}
const eneRGB = T => 'rgb(' + eneColT(T).join(',') + ')';

const ENE_C_AGUA = 4180;      // calor específico del agua, en J/(kg·°C)
const ENE_TAMB   = 22;        // temperatura ambiente del laboratorio, en °C

/* Materiales: k = conductividad térmica (W/(m·K)); alfa = difusividad (m²/s);
   b = efusividad √(k·ρ·c) (W·s^½/(m²·K)), que explica la sensación al tacto. */
const ENE_MAT = [
  { id:'metal',   n:'Aluminio (metal)', k:205,  alfa:9.7e-5, b:24000, col:'#9AA7B4' },
  { id:'vidrio',  n:'Vidrio',           k:1.0,  alfa:3.4e-7, b:1400,  col:'#9FD3E3' },
  { id:'plastico',n:'Plástico',         k:0.19, alfa:1.2e-7, b:520,   col:'#E2574C' },
  { id:'madera',  n:'Madera',           k:0.15, alfa:1.5e-7, b:400,   col:'#B98A56' }
];
const ENE_MEDIO = [
  { id:'aire',  n:'Aire (20 °C)', v:343,  d:'Las moléculas están separadas: la vibración se transmite con lentitud.' },
  { id:'agua',  n:'Agua',         v:1480, d:'Más densa y menos compresible que el aire: la onda avanza más rápido.' },
  { id:'acero', n:'Acero (sólido)', v:5120, d:'Las partículas están unidas con fuerza: la vibración pasa casi de inmediato.' },
  { id:'vacio', n:'Vacío',        v:0,    d:'No hay partículas que vibren: el sonido no se propaga. Solo pasa la luz.' }
];
const ENE_PARED = [
  { id:'concreto', n:'Concreto liso', a:0.02 },
  { id:'madera',   n:'Madera',        a:0.15 },
  { id:'cortina',  n:'Cortina gruesa',a:0.55 },
  { id:'espuma',   n:'Espuma acústica', a:0.85 }
];
/* Índices de refracción usados en la estación de luz */
const ENE_NCOL = [
  { n:'Violeta', idx:1.532, col:'#7B4FB5' },
  { n:'Azul',    idx:1.528, col:'#2E6FD4' },
  { n:'Verde',   idx:1.519, col:'#1E8449' },
  { n:'Amarillo',idx:1.517, col:'#D4AC0D' },
  { n:'Naranja', idx:1.514, col:'#D35400' },
  { n:'Rojo',    idx:1.513, col:'#C0392B' }
];

route('/cn/proximos/energia', () => navigate('#/cn/lab/energia'));

route('/cn/lab/energia', (view) => {
  view.classList.add('wide');

  /* ================= estado ================= */
  const S = {
    est:'calor',
    /* --- calor --- */
    mA:0.60, TA:40, mB:0.10, TB:90,
    contacto:false, tC:0, TAe:20, TBe:85, Tf:null,
    pred:null, predDone:false,
    matSel:'metal', calentando:false, tCal:0,
    conv:true, lampD:0.4,
    aisl:false,
    /* --- luz --- */
    modo:'espejo', ang:40, nMedio:1.33,
    filtro:'ninguno', objeto:'rojo',
    fuenteW:0, distObj:0.60, distPant:0.60, anchoObj:0.10,
    /* --- sonido --- */
    amp:20, frec:440, medio:'aire', pared:'concreto', dPared:30,
    /* --- transversal --- */
    flujo:{ calor:false, luz:false, sonido:false },
    quiz:0, intentos:0,
    solved: !!Store.s.activities['cn-lab-energia']?.done
  };
  const matDe = id => ENE_MAT.find(m => m.id === id) || ENE_MAT[0];
  const medio = () => ENE_MEDIO.find(m => m.id === S.medio) || ENE_MEDIO[0];
  const pared = () => ENE_PARED.find(p => p.id === S.pared) || ENE_PARED[0];

  /* energía térmica del agua referida a 0 °C: E = m·c·T (en joules) */
  const energiaTermica = (m, T) => m * ENE_C_AGUA * T;
  /* temperatura de equilibrio de dos masas de agua (sin pérdidas) */
  const tEquilibrio = () => (S.mA * S.TA + S.mB * S.TB) / (S.mA + S.mB);
  /* nivel sonoro: p = amplitud · 0,002 Pa ; L = 20·log10(p / 20 µPa) */
  const presion = () => S.amp * 0.002;
  const nivelDb = () => 20 * Math.log10(Math.max(presion(), 1e-9) / 2e-5);
  /* tiempo de exposición seguro (criterio referencial NIOSH: 85 dB → 8 h, +3 dB → la mitad) */
  const tiempoSeguro = L => 8 * 60 * Math.pow(2, (85 - L) / 3);   // en minutos

  /* ================= cabecera y franja de propósito ================= */
  view.append(h('div', { class:'page-head', style:'margin-bottom:14px' },
    h('div', {},
      h('span', { class:'eyebrow lab' }, 'Laboratorio · Ciencias Naturales · Ciencias Físicas · 8.º EGB · U3'),
      h('h1', {}, 'Energía y transferencia: calor, luz y sonido'),
      h('p', {}, 'Una sola mesa de laboratorio con tres estaciones. Mezcla agua a distinta temperatura, compara materiales, traza rayos de luz con ángulos medibles y observa una onda sonora con amplitud y frecuencia regulables. Todas las lecturas están en unidades del SI.')),
    h('span', { class:'pill lab' }, '+120 XP')));

  const retoSt = h('div', { class: S.solved ? 'notice ok' : 'notice' },
    S.solved ? 'Reto resuelto ✓' : 'Todavía no: completa el diagrama de flujo de energía de las tres estaciones (más abajo).');
  view.append(purposeBanner({
    proposito:'Distinguir temperatura de energía térmica, reconocer conducción, convección y radiación, y explicar con diagramas qué entra, qué se transforma, qué sirve y qué se pierde en montajes de calor, luz y sonido.',
    observa:[
      'Que un vaso grande y tibio puede tener más energía térmica que uno pequeño y muy caliente',
      'Que el metal y la madera están a la misma temperatura aunque el metal se sienta más frío',
      'Que el ángulo de reflexión es igual al de incidencia y que el de refracción no lo es',
      'Que en el vacío la onda sonora desaparece, mientras la luz sigue pasando'
    ],
    reto:'Completa el diagrama de flujo de energía (entrada → transformación → efecto útil → pérdidas) de las tres estaciones: la del calor, la de la luz y la del sonido.',
    statusEl: retoSt, done: S.solved
  }));

  /* ================= pestañas de estación ================= */
  const EST = [
    { id:'calor',  t:'🔥 Calor y temperatura' },
    { id:'luz',    t:'💡 Luz' },
    { id:'sonido', t:'🔊 Sonido' }
  ];
  const segBtns = [];
  const seg = h('div', { class:'segmented', role:'tablist', 'aria-label':'Estaciones del laboratorio' });
  EST.forEach(e => {
    const b = h('button', { role:'tab', type:'button', id:'ene-tab-' + e.id,
      'aria-selected': String(e.id === S.est), 'aria-controls':'ene-panel-' + e.id,
      onclick:() => setEst(e.id) }, e.t);
    segBtns.push(b); seg.append(b);
  });
  seg.addEventListener('keydown', ev => {
    const i = segBtns.indexOf(document.activeElement); if (i < 0) return;
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      ev.preventDefault();
      const j = (i + (ev.key === 'ArrowRight' ? 1 : EST.length - 1)) % EST.length;
      segBtns[j].focus(); setEst(EST[j].id);
    }
  });
  view.append(h('div', { class:'row', style:'margin:14px 0 10px' }, seg));

  /* ================= escenario + panel ================= */
  const stage = h('div', { class:'stage' });
  const panel = h('div', { class:'panel' });
  const leftCol = h('div', { class:'ene-left' }, stage);
  view.append(h('div', { class:'ene-wrap' }, leftCol, panel));
  const hudPhase = h('span', { class:'phase' }, 'Estación de calor');
  stage.append(h('div', { class:'stage-top' }, hudPhase));
  const hudNote = h('div', { class:'stage-note' }, 'Mesa de laboratorio · vista 3D');
  stage.append(h('div', { class:'stage-bottom' }, hudNote));

  /* esquema 2D con las medidas exactas (siempre visible, con o sin WebGL) */
  const dia = h('canvas', { class:'ene-dia', role:'img', 'aria-label':'Esquema del montaje con las medidas numéricas' });
  const diaTxt = h('p', { class:'small mono', 'aria-live':'polite', style:'min-height:2.4em' }, '');
  const diaBox = h('div', { class:'card stack', style:'margin-top:14px' },
    h('span', { class:'eyebrow lab' }, 'Esquema con medidas'),
    h('p', { class:'small muted' }, 'El esquema repite el montaje en dos dimensiones con los valores numéricos. Debajo, la misma información en texto, para leerla sin depender de la imagen.'),
    dia, diaTxt);

  /* ================= utilidades de interfaz ================= */
  function slider(id, label, min, max, step, val, unit, dec, onCh){
    const inp = h('input', { type:'range', id, min, max, step, value:val, 'aria-label':label });
    const out = h('output', { for:id }, eneN(val, dec) + (unit ? ' ' + unit : ''));
    inp.addEventListener('input', () => { const x = +inp.value; out.value = eneN(x, dec) + (unit ? ' ' + unit : ''); onCh(x); });
    return { el: h('div', { class:'slider' }, h('label', { for:id }, label), out, inp), inp, out,
      set(x){ inp.value = x; out.value = eneN(x, dec) + (unit ? ' ' + unit : ''); } };
  }
  function selector(id, label, opciones, val, onCh){
    const sel = h('select', { id, 'aria-label':label });
    opciones.forEach(([v, n]) => sel.append(h('option', { value:v }, n)));
    sel.value = val;
    sel.addEventListener('change', () => onCh(sel.value));
    return { el: h('div', { class:'field' }, h('label', { for:id }, label), sel), sel };
  }
  function barra(l, val, ref, col, txt){
    return h('div', { class:'bar' }, h('span', {}, l),
      h('span', { class:'track' }, h('i', { style:`width:${clamp(val / (ref || 1) * 100, 0, 100)}%;background:${col}` })),
      h('span', { class:'v' }, txt));
  }

  /* =====================================================================
     ESTACIÓN 1 · CALOR Y TEMPERATURA
     ===================================================================== */
  const pCalor = h('div', { class:'stack', id:'ene-panel-calor', role:'tabpanel', 'aria-labelledby':'ene-tab-calor' });

  /* --- 1.1 equilibrio térmico --- */
  const boxEq = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '1 · Equilibrio térmico'));
  const sMA = slider('ene-ma', 'Masa de agua del vaso A', 0.05, 1.0, 0.05, S.mA, 'kg', 2, x => { S.mA = x; resetContacto(); });
  const sTA = slider('ene-ta', 'Temperatura del vaso A', 5, 95, 1, S.TA, '°C', 0, x => { S.TA = x; resetContacto(); });
  const sMB = slider('ene-mb', 'Masa de agua del vaso B', 0.05, 1.0, 0.05, S.mB, 'kg', 2, x => { S.mB = x; resetContacto(); });
  const sTB = slider('ene-tb', 'Temperatura del vaso B', 5, 95, 1, S.TB, '°C', 0, x => { S.TB = x; resetContacto(); });
  const predFb = h('div', { class:'notice', style:'display:none' });
  const PRED = [
    'Los dos quedan justo en el punto medio de las dos temperaturas.',
    'Los dos quedan en una temperatura intermedia, más cerca de la del vaso que tiene más masa.',
    'El vaso frío sube hasta la temperatura del caliente y el caliente no cambia.'
  ];
  const predBtns = PRED.map((t, i) => h('button', { class:'opt', type:'button', onclick:() => elegirPred(i) },
    h('span', { class:'k' }, String.fromCharCode(65 + i)), t));
  const btnContacto = h('button', { class:'btn primary', onclick:() => ponerEnContacto() }, '▶ Poner los vasos en contacto');
  const btnSep = h('button', { class:'btn ghost', onclick:() => resetContacto() }, '↺ Separar y reiniciar');
  const barsT = h('div', { class:'bars ene-bars' });
  const barsE = h('div', { class:'bars ene-bars' });
  const eqTxt = h('p', { class:'small', 'aria-live':'polite', style:'min-height:2.4em' }, '');
  boxEq.append(
    h('div', { class:'ene-grid2' },
      h('div', { class:'stack' }, h('span', { class:'eyebrow' }, 'Vaso A'), sMA.el, sTA.el),
      h('div', { class:'stack' }, h('span', { class:'eyebrow' }, 'Vaso B'), sMB.el, sTB.el)),
    h('p', { style:'font-weight:600;margin-top:4px' }, 'Antes de juntarlos, predice: ¿en qué temperatura terminan?'),
    ...predBtns, predFb,
    h('div', { class:'ene-tools' }, btnContacto, btnSep),
    h('span', { class:'eyebrow' }, 'Termómetros · temperatura en °C'), barsT,
    h('span', { class:'eyebrow' }, 'Energía térmica del agua · E = m·c·T, en kJ'), barsE,
    h('p', { class:'small muted' }, 'Se usa c = 4 180 J/(kg·°C) para el agua y se mide la energía respecto de 0 °C. La temperatura dice qué tan intensa es la agitación de las partículas; la energía térmica depende además de cuántas partículas hay, es decir, de la masa.'),
    eqTxt);
  pCalor.append(boxEq);

  function elegirPred(i){
    if (S.predDone) return;
    S.pred = i;
    predBtns.forEach((b, j) => b.classList.toggle('picked', i === j));
    predFb.style.display = 'none';
    Store.log('lab_energia', { accion:'prediccion_equilibrio', opcion:i });
  }
  function revelarPred(){
    if (S.pred === null || S.predDone) return;
    S.predDone = true;
    const iguales = Math.abs(S.mA - S.mB) < 1e-6;
    const ok = 1;
    predBtns.forEach((b, j) => { b.classList.remove('picked'); if (j === ok) b.classList.add('ok'); else if (j === S.pred) b.classList.add('bad'); });
    let msg;
    if (S.pred === ok) msg = `<b>Así es.</b> La temperatura final es el promedio <i>ponderado por la masa</i>: T<sub>f</sub> = (m<sub>A</sub>·T<sub>A</sub> + m<sub>B</sub>·T<sub>B</sub>) / (m<sub>A</sub> + m<sub>B</sub>) = ${eneN(tEquilibrio(), 1)} °C. El vaso con más masa "manda" más porque tiene más partículas que ceder o recibir energía.`;
    else if (S.pred === 0) msg = `<b>Solo sería el punto medio si las dos masas fueran iguales.</b> ${iguales ? 'Aquí las masas sí son iguales, por eso te dio parecido; prueba ahora con masas distintas y vuelve a mirar.' : `Con ${eneN(S.mA, 2)} kg y ${eneN(S.mB, 2)} kg el resultado se corre hacia el vaso de más masa: T<sub>f</sub> = ${eneN(tEquilibrio(), 1)} °C, no ${eneN((S.TA + S.TB) / 2, 1)} °C.`}`;
    else msg = '<b>Cuidado con una idea muy común.</b> El frío no es una sustancia que viaje: lo que se transfiere es <i>energía</i>, y siempre del cuerpo de mayor temperatura al de menor temperatura. Por eso el caliente baja y el frío sube, hasta que los dos marcan lo mismo.';
    predFb.className = 'notice ' + (S.pred === ok ? 'ok' : 'warn');
    predFb.innerHTML = '<span>' + msg + '</span>';
    predFb.style.display = 'flex';
  }
  function ponerEnContacto(){
    if (S.pred === null && !S.predDone) { toast('Primero elige tu predicción (A, B o C).'); return; }
    S.contacto = true; S.tC = 0; S.TAe = S.TA; S.TBe = S.TB; S.Tf = tEquilibrio();
    revelarPred();
    Store.log('lab_energia', { accion:'contacto_termico', mA:S.mA, TA:S.TA, mB:S.mB, TB:S.TB, Tf:S.Tf });
    actualizarCalor();
  }
  function resetContacto(){
    S.contacto = false; S.tC = 0; S.TAe = S.TA; S.TBe = S.TB; S.Tf = null;
    actualizarCalor();
  }

  /* --- 1.2 conducción --- */
  const boxCond = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '2 · Conducción: varillas de cuatro materiales'),
    h('p', { class:'small muted' }, 'Cuatro varillas iguales de 3,0 cm, con una gota de cera en el extremo libre. Se calienta el otro extremo y se mide cuánto tarda en derretirse la cera. Es el mismo montaje clásico, con los valores de conductividad a la vista. El reloj de la simulación corre acelerado 60 veces: el tiempo que se muestra es el tiempo real del experimento.'));
  const condLista = h('div', { class:'ene-mats' });
  const btnCal = h('button', { class:'btn primary', onclick:() => { S.calentando = !S.calentando; if (!S.calentando) S.tCal = 0; btnCal.textContent = S.calentando ? '⏸ Apagar el mechero' : '🔥 Encender el mechero'; } }, '🔥 Encender el mechero');
  const condTxt = h('p', { class:'small mono', 'aria-live':'polite', style:'min-height:1.4em' }, '');
  boxCond.append(condLista, h('div', { class:'ene-tools' }, btnCal, h('button', { class:'btn ghost', onclick:() => { S.tCal = 0; S.calentando = false; btnCal.textContent = '🔥 Encender el mechero'; actualizarCalor(); } }, '↺ Reiniciar')), condTxt);

  /* la sensación al tacto: efusividad térmica */
  const tactoSel = selector('ene-tacto', 'Material que tocas', ENE_MAT.map(m => [m.id, m.n]), S.matSel, v => { S.matSel = v; actualizarCalor(); });
  const tactoFb = h('div', { class:'notice info' }, '');
  boxCond.append(h('span', { class:'eyebrow' }, 'Tócalo: ¿está más frío el metal?'), tactoSel.el, tactoFb);
  pCalor.append(boxCond);

  /* --- 1.3 convección y radiación --- */
  const boxCR = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '3 · Convección y radiación'));
  const chkConv = h('input', { type:'checkbox', id:'ene-conv', checked:'checked', 'aria-label':'Encender la hornilla de la olla' });
  chkConv.addEventListener('change', () => { S.conv = chkConv.checked; actualizarCalor(); });
  const convTxt = h('p', { class:'small' }, '');
  const sLamp = slider('ene-lamp', 'Distancia de la lámpara a la placa', 0.15, 1.5, 0.05, S.lampD, 'm', 2, x => { S.lampD = x; actualizarCalor(); });
  const radTxt = h('p', { class:'small mono', 'aria-live':'polite' }, '');
  boxCR.append(
    h('label', { class:'toggle', for:'ene-conv' }, chkConv, h('span', {}, 'Encender la hornilla bajo la olla (convección)')),
    convTxt,
    h('span', { class:'eyebrow' }, 'Lámpara de 60 W: radiación'), sLamp.el, radTxt,
    h('p', { class:'small muted' }, 'La irradiancia se estima con I = P / (4πd²) y el calentamiento de la placa con un modelo simplificado y proporcional a I: sirve para comparar distancias, no para predecir una temperatura real.'));
  pCalor.append(boxCR);

  /* --- 1.4 aislamiento --- */
  const boxAis = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, 'Aislamiento: ¿cuánto tarda en enfriarse?'),
    h('p', { class:'small muted' }, 'Dos termos iguales con 0,30 kg de agua a 80,0 °C en un laboratorio a 22,0 °C. Uno va desnudo y el otro forrado con aislante. Modelo de enfriamiento de Newton: T(t) = 22,0 °C + (80,0 °C − 22,0 °C) · e^(−t/τ), con τ = 10 min sin aislante y τ = 45 min con aislante.'));
  const cvAis = h('canvas', { class:'ene-chart', role:'img', 'aria-label':'Gráfico del enfriamiento del agua con y sin aislante' });
  const tabAis = h('div', { class:'tablewrap' });
  boxAis.append(h('div', { class:'ene-cbox' }, h('span', { class:'eyebrow' }, 'Temperatura contra tiempo'), cvAis), tabAis);

  const enfria = (t, tau) => ENE_TAMB + (80 - ENE_TAMB) * Math.exp(-t / tau);
  function dibujarAislamiento(){
    const pts1 = [], pts2 = [];
    for (let t = 0; t <= 60; t += 1) { pts1.push({ x:t, y:enfria(t, 10) }); pts2.push({ x:t, y:enfria(t, 45) }); }
    lineChart(cvAis, {
      series:[{ pts:pts1, color:'#C0392B', label:'Sin aislante' }, { pts:pts2, color:'#2E86C1', label:'Con aislante' }],
      xmin:0, xmax:60, ymin:20, ymax:85, xticks:6,
      xlabel:'t (min)', ylabel:'T (°C)', xfmt:v => eneN(v, 0), yfmt:v => eneN(v, 0) });
    const filas = [0, 5, 10, 20, 30, 45, 60];
    tabAis.innerHTML = '';
    const tb = h('table', { class:'data' },
      h('thead', {}, h('tr', {}, h('th', {}, 'Tiempo (min)'), h('th', {}, 'Sin aislante (°C)'), h('th', {}, 'Con aislante (°C)'), h('th', {}, 'Diferencia (°C)'))),
      h('tbody', {}, filas.map(t => h('tr', {},
        h('td', {}, eneN(t, 0)),
        h('td', { class:'mono' }, eneN(enfria(t, 10), 1)),
        h('td', { class:'mono' }, eneN(enfria(t, 45), 1)),
        h('td', { class:'mono' }, eneN(enfria(t, 45) - enfria(t, 10), 1))))));
    tabAis.append(tb);
  }

  function actualizarCalor(){
    /* barras de temperatura y de energía */
    const TA = S.contacto ? S.TAe : S.TA, TB = S.contacto ? S.TBe : S.TB;
    barsT.innerHTML = '';
    barsT.append(barra('Vaso A · ' + eneN(S.mA, 2) + ' kg', TA, 100, '#2E86C1', eneN(TA, 1) + ' °C'));
    barsT.append(barra('Vaso B · ' + eneN(S.mB, 2) + ' kg', TB, 100, '#C0392B', eneN(TB, 1) + ' °C'));
    const EA = energiaTermica(S.mA, TA), EB = energiaTermica(S.mB, TB), ref = Math.max(EA, EB, 1);
    barsE.innerHTML = '';
    barsE.append(barra('Vaso A · energía', EA, ref, '#2E86C1', eneN(EA / 1000, 1) + ' kJ'));
    barsE.append(barra('Vaso B · energía', EB, ref, '#C0392B', eneN(EB / 1000, 1) + ' kJ'));
    const masCal = TA > TB ? 'A' : (TB > TA ? 'B' : '—');
    const masEne = EA > EB ? 'A' : (EB > EA ? 'B' : '—');
    let t1 = `Vaso A: ${eneN(S.mA, 2)} kg a ${eneN(TA, 1)} °C → ${eneN(EA / 1000, 1)} kJ. Vaso B: ${eneN(S.mB, 2)} kg a ${eneN(TB, 1)} °C → ${eneN(EB / 1000, 1)} kJ. `;
    if (masCal !== '—' && masEne !== '—' && masCal !== masEne)
      t1 += `Fíjate: el vaso ${masCal} está más caliente, pero el vaso ${masEne} guarda más energía térmica, porque tiene más masa. Temperatura y energía no son lo mismo.`;
    else if (S.contacto && S.Tf !== null && Math.abs(TA - TB) < 0.15)
      t1 += `Los dos termómetros marcan ${eneN(S.Tf, 1)} °C: llegaron al equilibrio térmico. La energía que perdió el caliente es la que ganó el frío.`;
    else if (S.contacto) t1 += 'La energía está pasando del agua más caliente a la más fría…';
    else t1 += 'Pulsa «Poner los vasos en contacto» para ver la transferencia.';
    eqTxt.textContent = t1;

    /* conducción */
    condLista.innerHTML = '';
    const tiempos = ENE_MAT.map(m => ({ m, t: 0.03 * 0.03 / (4 * m.alfa) }));
    const tmax = Math.max(...tiempos.map(o => o.t));
    tiempos.forEach(({ m, t }) => {
      const avance = S.calentando ? clamp(S.tCal / t, 0, 1) : 0;
      condLista.append(h('div', { class:'ene-mat' },
        h('span', { class:'ene-sw', style:'background:' + m.col, 'aria-hidden':'true' }),
        h('span', {}, h('b', {}, m.n), h('span', { class:'small muted', style:'display:block' },
          `k = ${eneN(m.k, 2)} W/(m·K) · cera derretida a los ${eneN(t, 1)} s`)),
        h('span', { class:'mono small' }, avance >= 1 ? '✓ derretida' : eneN(avance * 100, 0) + ' %')));
    });
    const derretidas = tiempos.filter(o => S.calentando && S.tCal >= o.t).length;
    condTxt.textContent = S.calentando
      ? `Mechero encendido · t = ${eneN(S.tCal, 1)} s · ${derretidas} de 4 ceras derretidas. El aluminio conduce ${eneN(matDe('metal').k / matDe('madera').k, 0)} veces mejor que la madera.`
      : `Mechero apagado. La varilla más rápida tarda ${eneN(Math.min(...tiempos.map(o => o.t)), 1)} s y la más lenta, ${eneN(tmax, 1)} s.`;

    /* tacto: efusividad */
    const mm = matDe(S.matSel), Tpiel = 33;
    const Tcont = (mm.b * ENE_TAMB + 1500 * Tpiel) / (mm.b + 1500);
    tactoFb.innerHTML = `<span>El termómetro marca <b>${eneN(ENE_TAMB, 1)} °C</b> en las cuatro varillas: <b>todas están a la misma temperatura</b>. Pero al tocar ${mm.n.toLowerCase()} tu piel (a 33 °C) baja en el punto de contacto hasta <b>${eneN(Tcont, 1)} °C</b>. ${mm.b > 5000 ? 'Por eso el metal se siente frío: te quita calor muy rápido. No está más frío, conduce mejor.' : 'Como conduce poco, casi no te quita calor: se siente tibio, aunque esté a la misma temperatura que el metal.'}</span>`;

    /* convección */
    convTxt.textContent = S.conv
      ? 'Hornilla encendida: el agua del fondo se calienta, se dilata, pierde densidad y sube; la de arriba, más fría y densa, baja. Ese circuito de subida y bajada es la convección, y solo ocurre en fluidos (líquidos y gases).'
      : 'Hornilla apagada: sin diferencia de temperatura no hay diferencia de densidad, así que las corrientes se detienen.';

    /* radiación */
    const I = 60 / (4 * Math.PI * S.lampD * S.lampD);
    const Tplaca = ENE_TAMB + I * 0.25;
    radTxt.textContent = `d = ${eneN(S.lampD, 2)} m → irradiancia I = 60 W / (4π·(${eneN(S.lampD, 2)} m)²) = ${eneN(I, 1)} W/m² · temperatura estimada de la placa: ${eneN(Tplaca, 1)} °C. Al duplicar la distancia, la irradiancia cae a la cuarta parte.`;

    if (S.est === 'calor') { dibujarEsquema(); }
  }

  /* =====================================================================
     ESTACIÓN 2 · LUZ
     ===================================================================== */
  const pLuz = h('div', { class:'stack', id:'ene-panel-luz', role:'tabpanel', 'aria-labelledby':'ene-tab-luz' });
  const MODOS = [
    ['espejo', 'Espejo plano · reflexión'],
    ['refrac', 'Aire → agua · refracción'],
    ['prisma', 'Prisma · descomposición'],
    ['color',  'Filtros y color de los objetos'],
    ['sombra', 'Sombra y penumbra']
  ];
  const selModo = selector('ene-modo', 'Montaje óptico', MODOS, S.modo, v => { S.modo = v; refrescarLuz(); });
  const sAng = slider('ene-ang', 'Ángulo de incidencia (respecto de la normal)', 0, 80, 1, S.ang, '°', 0, x => { S.ang = x; refrescarLuz(); });
  const selN = selector('ene-n', 'Segundo medio', [['1.33', 'Agua · n = 1,33'], ['1.52', 'Vidrio · n = 1,52'], ['1.00', 'Aire · n = 1,00']], String(S.nMedio), v => { S.nMedio = +v; refrescarLuz(); });
  const selFiltro = selector('ene-filtro', 'Filtro delante de la lámpara', [['ninguno', 'Sin filtro (luz blanca)'], ['rojo', 'Filtro rojo'], ['verde', 'Filtro verde'], ['azul', 'Filtro azul']], S.filtro, v => { S.filtro = v; refrescarLuz(); });
  const selObj = selector('ene-obj', 'Color del objeto iluminado', [['rojo', 'Objeto rojo'], ['verde', 'Objeto verde'], ['blanco', 'Objeto blanco'], ['negro', 'Objeto negro']], S.objeto, v => { S.objeto = v; refrescarLuz(); });
  const sFW = slider('ene-fw', 'Ancho de la fuente de luz', 0, 0.20, 0.01, S.fuenteW, 'm', 2, x => { S.fuenteW = x; refrescarLuz(); });
  const sDO = slider('ene-do', 'Distancia fuente → objeto', 0.20, 1.50, 0.05, S.distObj, 'm', 2, x => { S.distObj = x; refrescarLuz(); });
  const sDP = slider('ene-dp', 'Distancia objeto → pantalla', 0.20, 1.50, 0.05, S.distPant, 'm', 2, x => { S.distPant = x; refrescarLuz(); });
  const luzCtrl = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '1 · Banco óptico'), selModo.el);
  const luzVars = h('div', { class:'stack' });
  luzCtrl.append(luzVars);
  const luzTxt = h('div', { class:'notice info', 'aria-live':'polite' }, '');
  const luzTabla = h('div', { class:'tablewrap', style:'display:none' });
  luzCtrl.append(luzTxt);
  pLuz.append(luzCtrl);
  const boxPrisma = h('div', { class:'card stack', style:'display:none' }, h('span', { class:'eyebrow lab' }, 'Cada color, su propio ángulo'), luzTabla);

  const boxOjo = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, 'Y esto, ¿qué tiene que ver con el ojo?'),
    h('p', { class:'small' }, 'Todo lo que acabas de manipular ocurre dentro del ojo. La córnea y el cristalino son medios transparentes con n ≈ 1,38 y 1,41: refractan la luz igual que el agua del tanque y la desvían hasta formar una imagen en la retina. La pupila hace de diafragma y regula cuánta luz entra, como el ancho de la fuente del montaje de sombras. Los conos de la retina responden a distintos intervalos de longitud de onda, así que el color que percibes depende de qué luz llega, no de una propiedad mágica del objeto.'),
    h('p', { class:'small muted' }, 'Por eso, si iluminas con luz roja un cuaderno verde, el cuaderno se ve casi negro: no hay luz verde que reflejar.'));

  function refrescarLuz(){
    luzVars.innerHTML = '';
    luzTabla.style.display = 'none';
    boxPrisma.style.display = 'none';
    if (S.modo === 'espejo') luzVars.append(sAng.el);
    else if (S.modo === 'refrac') luzVars.append(sAng.el, selN.el);
    else if (S.modo === 'prisma') luzVars.append(sAng.el);
    else if (S.modo === 'color') luzVars.append(selFiltro.el, selObj.el);
    else if (S.modo === 'sombra') luzVars.append(sFW.el, sDO.el, sDP.el);
    /* textos y cálculos */
    const r = Math.PI / 180;
    if (S.modo === 'espejo') {
      luzTxt.innerHTML = `<span>Ángulo de incidencia <b>i = ${eneN(S.ang, 0)}°</b> medido desde la <b>normal</b> (la perpendicular al espejo). Ángulo de reflexión <b>r = ${eneN(S.ang, 0)}°</b>. Se cumple siempre <b>i = r</b>, y el rayo incidente, la normal y el rayo reflejado están en el mismo plano. Respecto de la superficie del espejo, el rayo forma ${eneN(90 - S.ang, 0)}°: por eso conviene decir siempre desde dónde se mide el ángulo.</span>`;
    } else if (S.modo === 'refrac') {
      const s2 = Math.sin(S.ang * r) / S.nMedio;
      const crit = Math.asin(Math.min(1, S.nMedio >= 1 ? 1 / S.nMedio : 1)) / r;
      if (S.nMedio === 1) luzTxt.innerHTML = '<span>Con el mismo medio a los dos lados (n = 1,00) el rayo no se desvía: la refracción aparece cuando <b>cambia la rapidez de la luz</b> al pasar de un medio a otro.</span>';
      else luzTxt.innerHTML = `<span>Ley de Snell: n₁·sen i = n₂·sen R, con n₁ = 1,00 (aire) y n₂ = ${eneN(S.nMedio, 2)}. Con i = ${eneN(S.ang, 0)}° resulta <b>R = ${eneN(Math.asin(clamp(s2, -1, 1)) / r, 1)}°</b>: el rayo se <b>acerca a la normal</b> porque entra a un medio donde la luz va más lento (v = c/n = ${eneMil(300000 / S.nMedio, 0)} km/s). Si el rayo saliera del agua al aire, a partir de <b>${eneN(crit, 1)}°</b> ya no saldría: es la reflexión total interna, la que usan las fibras ópticas.<br>Por eso el lápiz metido en el vaso se ve “quebrado”: los rayos que vienen de la parte sumergida se desvían al salir y tu cerebro los prolonga en línea recta.</span>`;
    } else if (S.modo === 'prisma') {
      luzTabla.style.display = '';
      boxPrisma.style.display = '';
      luzTabla.innerHTML = '';
      const tb = h('table', { class:'data' },
        h('thead', {}, h('tr', {}, h('th', {}, 'Color'), h('th', {}, 'n del vidrio'), h('th', {}, 'Ángulo refractado'), h('th', {}, 'Rapidez en el vidrio'))),
        h('tbody', {}, ENE_NCOL.map(c => h('tr', {},
          h('td', {}, h('span', { class:'ene-sw', style:'background:' + c.col + ';display:inline-block;vertical-align:-2px;margin-right:6px', 'aria-hidden':'true' }), c.n),
          h('td', { class:'mono' }, eneN(c.idx, 3)),
          h('td', { class:'mono' }, eneN(Math.asin(clamp(Math.sin(S.ang * r) / c.idx, -1, 1)) / r, 2) + '°'),
          h('td', { class:'mono' }, eneMil(300000 / c.idx, 0) + ' km/s')))));
      luzTabla.append(tb);
      const dv = Math.asin(clamp(Math.sin(S.ang * r) / 1.513, -1, 1)) / r - Math.asin(clamp(Math.sin(S.ang * r) / 1.532, -1, 1)) / r;
      luzTxt.innerHTML = `<span>La luz blanca no es un color: es la suma de todos. Cada color tiene una longitud de onda distinta y el vidrio le ofrece un índice de refracción ligeramente distinto, así que <b>cada color se desvía un ángulo diferente</b>. Con i = ${eneN(S.ang, 0)}° la diferencia entre el rojo y el violeta es de apenas <b>${eneN(dv, 2)}°</b>; parece poca, pero tras las dos caras del prisma y unos centímetros de recorrido basta para separar el abanico de colores. Es el mismo mecanismo del arcoíris, con gotas de agua en vez de vidrio.</span>`;
    } else if (S.modo === 'color') {
      const luzC = S.filtro === 'ninguno' ? ['rojo', 'verde', 'azul'] : [S.filtro];
      const reflejaObj = { rojo:['rojo'], verde:['verde'], blanco:['rojo', 'verde', 'azul'], negro:[] }[S.objeto];
      const salen = luzC.filter(c => reflejaObj.indexOf(c) >= 0);
      const nombre = { rojo:'rojo', verde:'verde', azul:'azul' };
      const vistos = salen.map(c => nombre[c]).join(' y ');
      const resultado = S.objeto === 'blanco' && S.filtro === 'ninguno' ? 'blanco'
        : salen.length === 3 ? 'blanco' : salen.length ? vistos : 'negro (no llega luz a tus ojos desde él)';
      luzTxt.innerHTML = `<span><b>Qué le llega al objeto:</b> ${S.filtro === 'ninguno' ? 'luz blanca (rojo + verde + azul)' : 'solo luz ' + nombre[S.filtro] + ', porque el filtro <b>absorbe</b> los demás colores'}.<br><b>Qué hace el objeto ${S.objeto}:</b> ${S.objeto === 'negro' ? 'absorbe prácticamente toda la luz que le llega y casi no refleja nada; por eso se calienta más.' : S.objeto === 'blanco' ? 'refleja todos los colores por igual.' : 'refleja el ' + S.objeto + ' y absorbe los demás colores.'}<br><b>Qué ves:</b> ${resultado}. Un objeto rojo se ve rojo porque <b>absorbe</b> el verde y el azul y <b>refleja</b> el rojo hacia tus ojos: el color no está “dentro” del objeto, está en la luz que sale de él.</span>`;
    } else {
      const a = S.distObj, b = S.distPant, O = S.anchoObj, F = S.fuenteW;
      const umbra = O * (a + b) / a - F * b / a;
      const penum = O * (a + b) / a + F * b / a;
      const anillo = (penum - Math.max(umbra, 0)) / 2;
      luzTxt.innerHTML = `<span>Objeto de ${eneN(O * 100, 1)} cm, fuente de ${eneN(F * 100, 1)} cm de ancho, a ${eneN(a, 2)} m del objeto; pantalla a ${eneN(b, 2)} m.<br><b>Umbra</b> (sombra total, no le llega luz de ninguna parte de la fuente): ${umbra > 0 ? eneN(umbra * 100, 1) + ' cm' : 'no hay umbra: toda la sombra es penumbra'}.<br><b>Sombra total con penumbra incluida</b>: ${eneN(penum * 100, 1)} cm, con un borde difuso de ${eneN(anillo * 100, 1)} cm a cada lado.<br>${F < 0.005 ? 'Con una fuente casi puntual el borde es nítido: no hay penumbra.' : 'Cuanto más ancha es la fuente, más ancha es la penumbra y más borroso el borde: por eso la sombra al sol es más nítida que bajo una lámpara de tubo.'}</span>`;
    }
    if (S.est === 'luz') dibujarEsquema();
  }

  /* =====================================================================
     ESTACIÓN 3 · SONIDO
     ===================================================================== */
  const pSon = h('div', { class:'stack', id:'ene-panel-sonido', role:'tabpanel', 'aria-labelledby':'ene-tab-sonido' });
  const boxOnda = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '1 · La onda'),
    h('p', { class:'small muted' }, 'Esta simulación no reproduce sonido: representa la onda de forma visual y numérica, para que puedas medirla con calma y sin molestar a nadie.'));
  const sAmp = slider('ene-amp', 'Amplitud de la vibración', 1, 100, 1, S.amp, 'u.a.', 0, x => { S.amp = x; actualizarSonido(); });
  const sFrec = slider('ene-frec', 'Frecuencia de la vibración', 20, 5000, 10, S.frec, 'Hz', 0, x => { S.frec = x; actualizarSonido(); });
  const dbBar = h('div', { class:'ene-db' }, h('i', { style:'left:0%' }));
  const sonRead = h('div', { class:'readouts' });
  const sonTxt = h('p', { class:'small', 'aria-live':'polite', style:'min-height:2.4em' }, '');
  boxOnda.append(sAmp.el, sFrec.el, sonRead,
    h('div', { class:'stack', style:'gap:4px' }, h('span', { class:'eyebrow' }, 'Nivel sonoro · 20 a 120 dB'), dbBar),
    sonTxt);
  pSon.append(boxOnda);

  const boxMedio = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '2 · Medio de propagación'));
  const selMedio = selector('ene-medio', 'Medio en el que se propaga', ENE_MEDIO.map(m => [m.id, m.n]), S.medio, v => { S.medio = v; actualizarSonido(); });
  const medioTxt = h('div', { class:'notice', 'aria-live':'polite' }, '');
  const medioTab = h('div', { class:'tablewrap' });
  boxMedio.append(selMedio.el, medioTxt);
  pSon.append(boxMedio);
  const boxMedioTab = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, 'Rapidez del sonido en cada medio'), medioTab);

  const boxEco = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, '3 · Eco y absorción'));
  const sDP2 = slider('ene-dpared', 'Distancia a la pared', 5, 100, 1, S.dPared, 'm', 0, x => { S.dPared = x; actualizarSonido(); });
  const selPared = selector('ene-pared', 'Material de las paredes', ENE_PARED.map(p => [p.id, `${p.n} · α = ${eneN(p.a, 2)}`]), S.pared, v => { S.pared = v; actualizarSonido(); });
  const ecoTxt = h('div', { class:'notice info', 'aria-live':'polite' }, '');
  boxEco.append(sDP2.el, selPared.el, ecoTxt);
  pSon.append(boxEco);

  const boxSalud = h('div', { class:'card stack' }, h('span', { class:'eyebrow lab' }, 'Salud auditiva'),
    h('p', { class:'small muted', html:'Los valores de esta tabla son <b>referenciales</b> y siguen un criterio de higiene laboral (85 dB durante 8 h; cada 3 dB más, la mitad de tiempo). No son un diagnóstico ni una norma escolar: sirven para razonar sobre el riesgo.' }));
  const saludTab = h('div', { class:'tablewrap' });
  const saludAviso = h('div', { class:'notice', 'aria-live':'polite' }, '');
  boxSalud.append(saludTab, saludAviso);

  function fmtTiempo(min){
    if (min >= 60) return eneN(min / 60, 1) + ' h';
    if (min >= 1) return eneN(min, 0) + ' min';
    return eneN(min * 60, 0) + ' s';
  }
  function actualizarSonido(){
    const L = nivelDb(), me = medio(), lam = me.v > 0 ? me.v / S.frec : 0;
    sonRead.innerHTML = '';
    [[eneN(S.amp, 0), 'u.a.', 'Amplitud'],
     [eneN(presion() * 1000, 1), 'mPa', 'Presión sonora'],
     [eneN(L, 1), 'dB', 'Nivel sonoro'],
     [eneN(S.frec, 0), 'Hz', 'Frecuencia'],
     [me.v ? eneN(lam, 3) : '—', 'm', 'Longitud de onda']]
      .forEach(([v, u, l]) => sonRead.append(h('div', { class:'readout' },
        h('div', { class:'v' }, v, ' ', h('span', { class:'u' }, u)), h('div', { class:'l' }, l))));
    $('i', dbBar).style.left = clamp((L - 20) / 100 * 100, 0, 100) + '%';
    const tono = S.frec < 250 ? 'grave' : S.frec < 1200 ? 'medio' : 'agudo';
    sonTxt.innerHTML = `Si duplicas la amplitud, el nivel sube <b>6,0 dB</b> (porque L = 20·log₁₀(p/p₀) con p₀ = 20 µPa) y el sonido se percibe más fuerte, pero <b>el tono no cambia</b>. Si cambias la frecuencia, cambia el <b>tono</b>: ${eneN(S.frec, 0)} Hz es un tono ${tono}. El oído humano sano percibe aproximadamente de 20 Hz a 20\u202F000 Hz.`;

    medioTxt.className = 'notice ' + (me.v ? 'ok' : 'bad');
    medioTxt.innerHTML = me.v
      ? `<span><b>${me.n}:</b> la onda avanza a <b>${eneMil(me.v, 0)} m/s</b>. Recorrer 100 m le toma <b>${eneN(100 / me.v, 3)} s</b>. A ${eneN(S.frec, 0)} Hz, la longitud de onda es λ = v/f = <b>${eneN(lam, 3)} m</b>. ${me.d}</span>`
      : '<span><b>En el vacío no hay sonido.</b> El sonido es una vibración que necesita partículas para transmitirse: sin materia, no hay nada que empujar. La campana suena dentro de la campana de vacío hasta que se extrae el aire; entonces la ves vibrar pero no la oyes. La luz, en cambio, sí atraviesa el vacío: por eso vemos el Sol pero no lo escuchamos.</span>';
    medioTab.innerHTML = '';
    medioTab.append(h('table', { class:'data' },
      h('thead', {}, h('tr', {}, h('th', {}, 'Medio'), h('th', {}, 'Rapidez (m/s)'), h('th', {}, 'Tiempo en 100 m (s)'), h('th', {}, 'Longitud de onda (m)'))),
      h('tbody', {}, ENE_MEDIO.map(m => h('tr', { style: m.id === S.medio ? 'font-weight:700' : '' },
        h('td', {}, m.n),
        h('td', { class:'mono' }, m.v ? eneMil(m.v, 0) : '0'),
        h('td', { class:'mono' }, m.v ? eneN(100 / m.v, 3) : 'no llega'),
        h('td', { class:'mono' }, m.v ? eneN(m.v / S.frec, 3) : '—'))))));

    const pa = pared();
    if (!me.v) ecoTxt.innerHTML = '<span>En el vacío tampoco hay eco: sin medio, no hay onda que rebote.</span>';
    else {
      const t = 2 * S.dPared / me.v;
      const perdDist = 20 * Math.log10(Math.max(2 * S.dPared, 1));
      const perdAbs = -10 * Math.log10(Math.max(1 - pa.a, 1e-3));
      const Leco = L - perdDist - perdAbs;
      ecoTxt.innerHTML = `<span>La onda va y vuelve 2 × ${eneN(S.dPared, 0)} m = ${eneN(2 * S.dPared, 0)} m a ${eneMil(me.v, 0)} m/s: el eco regresa a los <b>${eneN(t, 3)} s</b>. ${t >= 0.1 ? 'Como supera los 0,1 s, lo oirías como un <b>eco</b> separado del sonido original.' : 'Como es menor que 0,1 s, el oído no lo separa del sonido original: se percibe como <b>reverberación</b>, no como eco.'}<br>Con paredes de ${pa.n.toLowerCase()} (coeficiente de absorción α = ${eneN(pa.a, 2)}) se pierden ${eneN(perdAbs, 1)} dB en cada rebote y ${eneN(perdDist, 1)} dB por la distancia recorrida: el eco vuelve con unos <b>${eneN(Leco, 1)} dB</b>. ${pa.a > 0.5 ? 'Un material muy absorbente convierte la energía sonora en un poquito de calor dentro de sus poros: por eso los estudios de grabación son “sordos”.' : 'Un material liso y duro refleja casi toda la energía: por eso una cancha techada retumba.'}</span>`;
    }

    const niveles = [
      [30, 'Biblioteca en silencio'], [50, 'Conversación tranquila'], [70, 'Tráfico en la calle'],
      [85, 'Licuadora, tráfico intenso'], [95, 'Motosierra, moto sin escape'],
      [100, 'Audífonos a volumen alto'], [110, 'Concierto cerca del parlante'], [120, 'Sirena a un metro']
    ];
    saludTab.innerHTML = '';
    saludTab.append(h('table', { class:'data' },
      h('thead', {}, h('tr', {}, h('th', {}, 'Nivel (dB)'), h('th', {}, 'Situación típica'), h('th', {}, 'Tiempo de exposición seguro (referencial)'))),
      h('tbody', {}, niveles.map(([n, d]) => h('tr', { style: Math.abs(n - L) < 5 ? 'font-weight:700' : '' },
        h('td', { class:'mono' }, eneN(n, 0)),
        h('td', {}, d),
        h('td', { class:'mono' }, n < 85 ? 'sin límite práctico' : fmtTiempo(tiempoSeguro(n))))))));
    if (L < 85) { saludAviso.className = 'notice ok'; saludAviso.innerHTML = `<span>Tu montaje está en <b>${eneN(L, 1)} dB</b>: por debajo de 85 dB no se considera riesgo para la audición en exposiciones cotidianas.</span>`; }
    else { saludAviso.className = 'notice ' + (L >= 100 ? 'bad' : 'warn'); saludAviso.innerHTML = `<span>Tu montaje está en <b>${eneN(L, 1)} dB</b>. Con ese nivel, el tiempo de exposición seguro estimado baja a <b>${fmtTiempo(tiempoSeguro(L))}</b>. El daño auditivo por ruido es <b>acumulativo e irreversible</b>: no duele, no avisa y no distingue si lo que suena es una motosierra o tu canción favorita. Baja el volumen o usa protección.</span>`; }

    if (S.est === 'sonido') dibujarEsquema();
  }

  panel.append(pCalor, pLuz, pSon);
  const wCalor = h('div', { class:'stack' }, boxAis);
  const wLuz   = h('div', { class:'stack' }, boxPrisma, boxOjo);
  const wSon   = h('div', { class:'stack' }, boxMedioTab, boxSalud);
  leftCol.append(diaBox, wCalor, wLuz, wSon);

  /* =====================================================================
     TRANSVERSAL · DIAGRAMA DE FLUJO DE ENERGÍA
     ===================================================================== */
  const FLUJO = {
    calor: { t:'Estación de calor: el mechero calienta el agua de la olla', slots:[
      { l:'Entrada', ops:['Energía química del combustible del mechero', 'El frío que sale del agua', 'La temperatura del agua'], ok:0,
        fb:['El frío no es una forma de energía ni entra ni sale: lo que se transfiere es energía, del cuerpo caliente al frío.',
            'La temperatura es una medida del estado del agua, no la energía que entra al sistema. La entrada es lo que alimenta el montaje.'] },
      { l:'Transformación', ops:['La energía química se transforma en energía térmica y se transfiere por conducción y convección', 'La energía se destruye al calentar', 'El calor se convierte en temperatura'], ok:0,
        fb:['La energía no se crea ni se destruye: se transforma y se transfiere. Lo que ocurre es que una parte deja de ser útil.',
            'La temperatura no es una forma de energía, es una magnitud que mide la agitación media de las partículas.'] },
      { l:'Efecto útil', ops:['El agua sube de temperatura y cocina el alimento', 'El mango de la olla se calienta', 'El aire de la cocina se calienta'], ok:0,
        fb:['El mango caliente es una pérdida (y un riesgo), no el efecto que buscamos.',
            'Calentar el aire de la cocina es energía que se va del sistema: es una pérdida.'] },
      { l:'Pérdidas', ops:['Calor que escapa por las paredes de la olla y por el vapor al ambiente', 'La energía que absorbió el agua', 'La luz azul de la llama, que es el efecto útil'], ok:0,
        fb:['La energía que absorbió el agua es justamente el efecto útil, no una pérdida.',
            'La luz de la llama sí es energía que se va sin cocinar nada: es una pérdida, pero no el efecto útil.'] } ] },
    luz: { t:'Estación de luz: la lámpara ilumina el banco óptico', slots:[
      { l:'Entrada', ops:['Energía eléctrica que llega a la lámpara', 'La claridad del ambiente', 'El color blanco de la luz'], ok:0,
        fb:['La claridad es el resultado, no la fuente. Pregúntate: ¿qué alimenta el montaje?',
            'El color blanco describe la luz que sale, no la energía que entra por el enchufe.'] },
      { l:'Transformación', ops:['La energía eléctrica se transforma en energía luminosa (radiante) y en calor', 'La luz se transforma en oscuridad al reflejarse', 'La energía eléctrica se convierte en velocidad'], ok:0,
        fb:['La oscuridad es ausencia de luz, no una forma de energía a la que algo se transforme.',
            'En este montaje nada gana rapidez: lo que cambia es la forma de la energía, de eléctrica a radiante.'] },
      { l:'Efecto útil', ops:['El haz ilumina, se refleja y se refracta, y llega al ojo o a la pantalla', 'La lámpara se pone caliente', 'El filtro absorbe dos colores'], ok:0,
        fb:['El calor de la lámpara es energía que no ilumina: es una pérdida.',
            'La absorción del filtro es justamente energía que se queda en el filtro: pérdida, no efecto útil.'] },
      { l:'Pérdidas', ops:['Calor de la lámpara y luz absorbida por el filtro y por los objetos oscuros', 'La luz que llega a la pantalla', 'La reflexión en el espejo'], ok:0,
        fb:['La luz que llega a la pantalla es lo que buscábamos: es el efecto útil.',
            'La reflexión en el espejo conserva casi toda la energía del haz y es parte del efecto útil del montaje.'] } ] },
    sonido: { t:'Estación de sonido: el parlante hace vibrar el aire de la sala', slots:[
      { l:'Entrada', ops:['Energía eléctrica que llega al parlante', 'El silencio previo de la sala', 'La frecuencia de 440 Hz'], ok:0,
        fb:['El silencio no aporta energía: es el estado inicial del sistema.',
            'La frecuencia describe cómo vibra la onda, no la energía que entra al parlante.'] },
      { l:'Transformación', ops:['La energía eléctrica se transforma en vibración mecánica del cono y del aire', 'El sonido se transforma en luz', 'El aire se transforma en sonido'], ok:0,
        fb:['En este montaje no aparece luz: la transformación es eléctrica → mecánica.',
            'El aire no se transforma: es el medio que transmite la vibración. Lo que se transforma es la energía.'] },
      { l:'Efecto útil', ops:['La onda de presión viaja por el aire y llega al oído: se escucha el mensaje', 'El cono del parlante se calienta', 'La pared devuelve un eco'], ok:0,
        fb:['El calentamiento de la bobina y del cono es energía que no llega a ningún oído: es una pérdida.',
            'El eco es una reflexión que suele estorbar a la comunicación; no es el efecto que buscamos.'] },
      { l:'Pérdidas', ops:['Calor por la absorción de las paredes y por el rozamiento con el aire', 'La onda que llega al oyente', 'La vibración del cono del parlante'], ok:0,
        fb:['La onda que llega al oyente es exactamente el efecto útil.',
            'La vibración del cono es el paso intermedio de la transformación, no una pérdida.'] } ] }
  };
  const flujoBox = h('div', { class:'card stack', style:'margin-top:14px' },
    h('span', { class:'eyebrow lab' }, '🎯 Reto de la unidad · Diagrama de flujo de energía'),
    h('p', { class:'small', html:'Este es el indicador oficial de la unidad: <b>identificar entrada, transformación, efecto útil y pérdidas</b>. Complétalo para cada una de las tres estaciones. Cada flecha significa «se convierte en» o «se transfiere a».' }));
  const flujoSt = h('div', { class:'notice' }, 'Faltan los tres montajes.');
  Object.keys(FLUJO).forEach(k => {
    const F = FLUJO[k];
    const fila = h('div', { class:'ene-flow' });
    const slots = [];
    F.slots.forEach((sl, i) => {
      const id = 'ene-fl-' + k + '-' + i;
      const orden = sl.ops.map((o, j) => j);
      const sel = h('select', { id, 'aria-label': F.t + ' · ' + sl.l });
      sel.append(h('option', { value:'' }, '— elige —'));
      orden.forEach(j => sel.append(h('option', { value:String(j) }, sl.ops[j])));
      const fb = h('div', { class:'ene-fb' }, '');
      const box = h('div', { class:'ene-slot' }, h('label', { for:id }, sl.l), sel, fb);
      slots.push({ sel, fb, box, sl });
      fila.append(box);
      if (i < F.slots.length - 1) fila.append(h('div', { class:'ene-arrow', 'aria-hidden':'true' }, '→'));
    });
    const st = h('div', { class:'notice', style:'display:none' });
    const btn = h('button', { class:'btn sm primary', onclick:() => {
      let bien = 0, faltan = 0;
      slots.forEach(o => {
        o.box.classList.remove('ok', 'bad');
        if (o.sel.value === '') { faltan++; o.fb.textContent = ''; return; }
        const v = +o.sel.value;
        if (v === o.sl.ok) { bien++; o.box.classList.add('ok'); o.fb.textContent = '✓ Correcto.'; }
        else { o.box.classList.add('bad'); o.fb.textContent = o.sl.fb[v < o.sl.ok ? v : v - 1] || 'Revisa qué función cumple ese elemento en el montaje.'; }
      });
      S.intentos++;
      if (faltan) { st.className = 'notice warn'; st.textContent = `Faltan ${faltan} casilla(s) por elegir.`; }
      else if (bien === 4) { st.className = 'notice ok'; st.textContent = 'Diagrama completo y correcto ✓ La energía entra, se transforma, una parte hace el trabajo que queremos y otra se degrada en calor: esa parte degradada nunca es cero.'; S.flujo[k] = true; revisarReto(); }
      else { st.className = 'notice warn'; st.textContent = `${bien} de 4 correctas. Lee la observación de cada casilla marcada en rojo y corrígela.`; }
      st.style.display = 'flex';
      Store.log('lab_energia', { accion:'flujo', estacion:k, correctas:bien });
    } }, 'Comprobar el diagrama');
    flujoBox.append(h('div', { class:'stack', style:'margin-top:6px' },
      h('span', { class:'eyebrow' }, F.t), fila, h('div', { class:'ene-tools' }, btn), st));
  });
  flujoBox.append(flujoSt);
  view.append(flujoBox);

  function revisarReto(){
    const listos = Object.keys(S.flujo).filter(k => S.flujo[k]);
    if (listos.length < 3) {
      flujoSt.className = 'notice';
      flujoSt.textContent = `Completados ${listos.length} de 3 montajes.`;
      return;
    }
    flujoSt.className = 'notice ok';
    flujoSt.textContent = 'Los tres diagramas están completos ✓';
    if (!S.solved) {
      S.solved = true;
      Store.completeActivity('cn-lab-energia', { score:'3 de 3 diagramas de flujo', attempts:S.intentos });
      const rb = $('.reto', view); if (rb) rb.classList.add('done');
    }
    retoSt.className = 'notice ok';
    retoSt.innerHTML = '<span><b>¡Reto resuelto!</b> Explicaste las tres transferencias con el mismo esquema: entrada → transformación → efecto útil → pérdidas. En los tres casos las pérdidas terminan como energía térmica repartida en el ambiente, y por eso ningún montaje aprovecha el 100 % de lo que entra.</span>';
    quizBox.style.display = '';
  }

  /* =====================================================================
     ERRORES TÍPICOS
     ===================================================================== */
  const ERRORES = [
    ['«El frío pasa del hielo a mi mano.»',
     'No existe una sustancia llamada frío. Lo que se transfiere es energía, y siempre en un solo sentido: del cuerpo de mayor temperatura al de menor temperatura. Tu mano (a unos 33 °C) le entrega energía al hielo (a 0 °C); al perder esa energía, tu mano se enfría y tú lo interpretas como "me llegó frío".'],
    ['«El metal está más frío que la madera.»',
     'Pon el termómetro sobre las cuatro varillas de la estación 1: todas marcan la misma temperatura ambiente. Lo que cambia es la rapidez con que cada material te quita energía. El aluminio conduce más de mil veces mejor que la madera, así que te baja la temperatura de la piel en el punto de contacto y lo sientes frío. Lo que mides es la conducción, no la temperatura.'],
    ['«La luz se ve a sí misma viajando por el aire.»',
     'Solo vemos la luz que entra a nuestro ojo. Un haz que cruza una habitación se hace visible únicamente si algo lo dispersa hacia nosotros: polvo, humo o gotitas de agua. En aire perfectamente limpio verías el punto iluminado de la pared, no el rayo. Por eso en esta simulación los rayos se dibujan: son un modelo, no una fotografía.'],
    ['«En el vacío el sonido viaja mejor, porque no hay obstáculos.»',
     'El sonido no es algo que atraviese la materia a pesar de ella: es la materia misma vibrando y empujando a la de al lado. Sin partículas no hay nada que empujar, así que no hay onda: el vacío no es un camino libre, es la ausencia de camino. Compruébalo en la estación 3 eligiendo "vacío". La luz sí atraviesa el vacío porque no necesita medio.'],
    ['«Subir el volumen no daña si es música que me gusta.»',
     'El oído interno no distingue géneros musicales: responde a la energía que le llega. Las células ciliadas de la cóclea no se regeneran, y el daño es acumulativo, indoloro y silencioso durante años. A 100 dB, un nivel normal de audífonos "al tope", el tiempo seguro estimado baja a unos 15 minutos al día. La música se disfruta igual 10 dB más abajo.']
  ];
  const errBox = h('div', { class:'card stack', style:'margin-top:14px' },
    h('span', { class:'eyebrow lab' }, 'Cinco frases que conviene desmontar'),
    h('p', { class:'small muted' }, 'Toca cada frase para ver por qué no se sostiene. Son errores frecuentes, no tonterías: casi todos nacen de una observación real mal interpretada.'));
  const errLista = h('div', { class:'ene-err' });
  ERRORES.forEach(([q, a], i) => {
    const body = h('div', { class:'ene-errbody' }, a);
    const b = h('button', { type:'button', 'aria-expanded':'false', onclick:() => {
      const on = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!on));
      if (!on) Store.log('lab_energia', { accion:'error_tipico', i });
    } }, h('b', {}, q), body);
    errLista.append(b);
  });
  errBox.append(errLista);
  view.append(errBox);

  /* =====================================================================
     CIERRE
     ===================================================================== */
  const quizBox = h('div', { class:'card stack', style:'margin-top:14px;display:' + (S.solved ? '' : 'none') },
    h('span', { class:'eyebrow lab' }, 'Cierre · comprueba lo que entendiste'));
  const doneQ = () => { S.quiz++; if (S.quiz >= 3) Store.completeActivity('cn-lab-energia', { score:'reto + cierre', attempts:S.intentos }); };
  quizBox.append(quizBlock({
    q:'Un vaso con 0,60 kg de agua a 40 °C y un vasito con 0,10 kg de agua a 90 °C. ¿Cuál tiene más energía térmica?',
    ops:['El vasito de 90 °C, porque está más caliente', 'El vaso de 0,60 kg, aunque esté a menor temperatura', 'Los dos tienen la misma, porque es la misma agua'],
    ok:1,
    fb:'E = m·c·T. Vaso grande: 0,60 kg × 4 180 J/(kg·°C) × 40 °C = 100 320 J ≈ 100,3 kJ. Vasito: 0,10 × 4 180 × 90 = 37 620 J ≈ 37,6 kJ. La temperatura mide qué tan intensa es la agitación de cada partícula; la energía térmica depende además de cuántas partículas hay.',
    wrong:['Estar más caliente significa mayor temperatura, no más energía. Una chispa de bengala está a más de 1 000 °C y no calienta una taza: casi no tiene masa.',
           'La sustancia es la misma, sí, pero la energía depende de la masa y de la temperatura: 0,60 kg a 40 °C guardan casi el triple de energía que 0,10 kg a 90 °C.']
  }, doneQ));
  quizBox.append(quizBlock({
    q:'Un rayo pasa del aire al agua con un ángulo de incidencia de 40° respecto de la normal. ¿Qué ocurre?',
    ops:['Se refleja con 40° y no entra al agua', 'Se acerca a la normal: el ángulo refractado es menor que 40°', 'Se aleja de la normal: el ángulo refractado es mayor que 40°'],
    ok:1,
    fb:'Por la ley de Snell, 1,00·sen 40° = 1,33·sen R, así que sen R = 0,483 y R ≈ 28,9°. Al entrar a un medio donde la luz viaja más lento (v = c/n ≈ 225 000 km/s en el agua) el rayo se acerca a la normal. Parte de la luz sí se refleja en la superficie, pero la mayor parte entra.',
    wrong:['Parte de la luz se refleja, pero la mayor parte entra al agua. La reflexión total solo ocurre saliendo del agua hacia el aire y por encima del ángulo crítico de 48,8°.',
           'Alejarse de la normal ocurre al pasar de un medio más denso ópticamente a uno menos denso (de agua a aire). Aquí es al revés.']
  }, doneQ));
  quizBox.append(quizBlock({
    q:'Duplicas la amplitud de la vibración de un parlante sin tocar la frecuencia. ¿Qué cambia?',
    ops:['El tono se vuelve el doble de agudo', 'El nivel sonoro sube unos 6 dB y el tono no cambia', 'La onda viaja el doble de rápido por el aire'],
    ok:1,
    fb:'La amplitud está ligada al volumen: L = 20·log₁₀(p/p₀), y duplicar p añade 20·log₁₀2 ≈ 6,0 dB. El tono lo fija la frecuencia, que no tocaste. Y la rapidez del sonido depende del medio y su temperatura (343 m/s en aire a 20 °C), no de lo fuerte que suene.',
    wrong:['El tono depende de la frecuencia (Hz), no de la amplitud. Para que suene el doble de agudo habría que duplicar la frecuencia.',
           'La rapidez del sonido la fija el medio: 343 m/s en el aire, 1 480 m/s en el agua, 5 120 m/s en el acero. Gritar más fuerte no acelera la onda.']
  }, doneQ));
  view.append(quizBox);

  /* =====================================================================
     ESCENA 3D
     ===================================================================== */
  let E = null;
  const G = { calor:null, luz:null, sonido:null };
  const anim = { aguaA:null, aguaB:null, burbujas:[], cono:null, lamp:null, parts:[], rayos:[] };
  const Y0 = -0.85;                       /* cara superior de la mesada */
  const ENE_VISTA = {
    calor:  { t:[0.35, -0.2, 0.15], r:9.2, phi:1.2, th:0.3 },
    luz:    { t:[0.25, -0.7, 0.1], r:5.9, phi:0.86, th:0.2 },
    sonido: { t:[0.05, -0.15, 0.1], r:9.0, phi:1.22, th:0.26 }
  };
  const eneR = v => (E && E._fit ? v * E._fit : v);

  if (webglOK) {
    try {
      const K0 = cnLabKit;
      const fit = K0.fitR(stage, 1, 1.6, 0.9);
      if (stage.clientWidth < stage.clientHeight) ENE_VISTA.calor.t = [0.6, -0.2, 0.15];
      E = new Engine3D(stage, { radius:9.2 * fit, phi:1.2, theta:0.3, minR:3, maxR:26, target:ENE_VISTA.calor.t, floor:Y0 + 0.004, floorSize:10,
        aria:'Mesa de laboratorio en 3D con tres estaciones: calor, luz y sonido. Los controles y todas las lecturas numéricas están en el panel de la derecha.' });
      E._fit = fit;
      construirEscena();
    } catch (e) { console.warn(e); if (E) { try { E.dispose(); } catch (e2) {} } E = null; }
  }
  const colorAgua = T => { const c = eneColT(T); return new THREE.Color(c[0] / 255, c[1] / 255, c[2] / 255); };

  function construirEscena(){
    const K = cnLabKit, low = E.low, dk = K.dark();
    const B = K.bench({ w:12.4, d:4.6, y:Y0, z:-0.1, t:0.16, wall:{ z:-2.4, h:5, w:24 }, cabH:2.2 });
    E.scene.add(B.group);
    const lbl = (id, txt, pos, anchor) => { E.addPart(id, [], { pickable:false }); E.addLabel(id, txt, pos, anchor); };
    anim.lbls = { calor:[], luz:[], sonido:[] };
    const L3 = (est, id, txt, pos, anchor) => { lbl(id, txt, pos, anchor); anim.lbls[est].push(id); };

    /* =============== estación de calor =============== */
    const gc = new THREE.Group(); E.scene.add(gc); G.calor = gc;
    /* --- vasos de precipitados de 1 000 mL: el nivel del agua es proporcional a su masa --- */
    const vaso = (x, z, nombre) => {
      const bk = K.beaker({ r:0.5, h:1.08, cap:1000, step:50, major:200, unit:'mL', yFor:V => 0.03 + V/1000*0.9, face:0.3, arc:0.9 });
      const g2 = new THREE.Group(); g2.position.set(x, Y0, z); g2.add(bk.group); gc.add(g2);
      const lq = K.liquid(bk.inner - 0.004, { color:0x3498DB, opacity:0.84, men:0.025 });
      [lq.body, lq.bot, lq.surf].forEach(m => { m.position.y += 0.03; g2.add(m); });
      const th = K.thermometer({ len:1.25, min:0, max:100 }); th.group.position.set(0.2, 0.08, -0.12); th.group.rotation.z = -0.1; th.group.rotation.y = 0.3; g2.add(th.group);
      return { g:g2, lq, th, x0:x };
    };
    anim.vA = vaso(-3.25, 0.75, 'A'); anim.vB = vaso(-2.02, 0.75, 'B');
    L3('calor', 'e-vasoA', 'Vaso A', [-3.25, Y0 + 1.75, 0.75]);
    L3('calor', 'e-vasoB', 'Vaso B', [-2.02, Y0 + 1.75, 0.75]);
    /* --- conducción: cuatro varillas en abanico sobre un mechero Bunsen --- */
    const hub = new THREE.Vector3(-0.55, Y0 + 1.02, -0.75);
    const tri = K.metal(0x4A525A, { rough:0.5, metal:0.7 });
    const aro = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.025, 8, 28), tri); aro.rotation.x = Math.PI / 2; aro.position.set(hub.x, hub.y - 0.14, hub.z); gc.add(aro);
    [0, 2.09, 4.19].forEach(a => { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.92, 8), tri); leg.position.set(hub.x + Math.cos(a) * 0.36, Y0 + 0.44, hub.z + Math.sin(a) * 0.36); leg.rotation.set(Math.sin(a) * 0.08, 0, -Math.cos(a) * 0.08); gc.add(leg); });
    const bloque = new THREE.Mesh(K.lathe([[0, -0.1], [0.2, -0.1], [0.22, -0.08], [0.22, 0.08], [0.2, 0.1], [0, 0.1]], 24), K.metal(0xB08D57, { rough:0.35 })); bloque.position.copy(hub); gc.add(bloque);
    anim.varillas = [];
    const matVar = {
      metal: K.metal(0xC4CBD2, { rough:0.3, brushed:true }),
      vidrio: new THREE.MeshPhysicalMaterial({ color:0xCFEFF6, roughness:0.04, clearcoat:1, transparent:true, opacity:0.55, envMapIntensity:2 }),
      plastico: K.plastic(0xD9493E, { rough:0.3, coat:0.7 }),
      madera: K.wood({ base:[190,138,86], strips:1, seed:23, coat:0.2 })
    };
    const ceraM = new THREE.MeshPhysicalMaterial({ color:0xF3E3A2, roughness:0.35, clearcoat:0.5, transmission:0 });
    ENE_MAT.forEach((m, i) => {
      const a = 2.4 + i * 0.4, len = 1.35;       /* abanico de lado, para ver las cuatro varillas enteras */
      const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      const v = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, len, 14), matVar[m.id]);
      v.rotation.z = Math.PI / 2; v.rotation.y = -a; const mid = hub.clone().addScaledVector(dir, 0.2 + len / 2); v.position.copy(mid); gc.add(v);
      const tip = hub.clone().addScaledVector(dir, 0.2 + len - 0.08);
      const gota = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 10), ceraM); gota.scale.y = 0.8; gota.position.set(tip.x, tip.y + 0.09, tip.z); gc.add(gota);
      const charco = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.012, 16), ceraM); charco.position.set(tip.x, Y0 + 0.008, tip.z); charco.visible = false; gc.add(charco);
      anim.varillas.push({ m, gota, charco, tip });
    });
    /* mechero Bunsen con llama visible solo cuando está encendido */
    const bun = new THREE.Group(); bun.position.set(hub.x, Y0, hub.z); gc.add(bun);
    bun.add(new THREE.Mesh(K.lathe([[0, 0], [0.24, 0], [0.25, 0.03], [0.2, 0.07], [0.06, 0.08], [0, 0.08]], 24), K.metal(0x2F353B, { rough:0.45, metal:0.7 })));
    const canon = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.62, 16), K.metal(0xC9CED3, { rough:0.25 })); canon.position.y = 0.39; bun.add(canon);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.1, 16), K.metal(0x8C949B, { rough:0.35 })); collar.position.y = 0.2; bun.add(collar);
    const manguera = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0.05, 0.12, 0), new THREE.Vector3(0.3, 0.05, -0.15), new THREE.Vector3(0.55, 0.02, -0.7), new THREE.Vector3(0.7, 0.02, -1.5)]), 24, 0.03, 8, false), K.plastic(0xD5793A, { rough:0.6 })); bun.add(manguera);
    const llama = new THREE.Group(); llama.position.y = 0.7; bun.add(llama);
    const flOut = new THREE.Mesh(K.lathe([[0, 0], [0.05, 0.03], [0.06, 0.12], [0.035, 0.26], [0, 0.34]], 16), new THREE.MeshBasicMaterial({ color:0x6FB6FF, transparent:true, opacity:0.45, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false }));
    const flIn = new THREE.Mesh(K.lathe([[0, 0], [0.03, 0.02], [0.032, 0.07], [0, 0.14]], 12), new THREE.MeshBasicMaterial({ color:0x2F7BFF, transparent:true, opacity:0.8, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false }));
    llama.add(flOut, flIn); const flH = K.halo(0x7FB8FF, 0.6, 0.5); flH.position.y = 0.16; llama.add(flH);
    anim.llama = llama;
    L3('calor', 'e-var', 'Varillas con cera', [hub.x - 0.7, hub.y + 0.6, hub.z + 0.2], [hub.x - 0.75, hub.y + 0.06, hub.z + 0.05]);
    L3('calor', 'e-mech', 'Mechero', [hub.x - 0.9, Y0 + 0.5, hub.z + 0.1], [hub.x - 0.06, Y0 + 0.45, hub.z]);
    /* --- convección: olla de acero en corte sobre una hornilla eléctrica --- */
    const oX = 1.2, oZ = 0.55, oY = Y0 + 0.34;
    const horn = new THREE.Mesh(K.rbox(1.25, 0.3, 1.2, 0.08, 0.04), K.plastic(dk ? 0xC9CED4 : 0xEEF0F2, { rough:0.35, coat:0.6 })); horn.position.set(oX, Y0 + 0.15, oZ); gc.add(horn);
    const disco = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.04, 36), K.metal(0x2A2D31, { rough:0.6, metal:0.5 })); disco.position.set(oX, Y0 + 0.31, oZ); gc.add(disco);
    const espM = new THREE.MeshStandardMaterial({ color:0x3A2A26, emissive:0xFF4A1C, emissiveIntensity:0, roughness:0.6 });
    [0.16, 0.26, 0.36].forEach(r => { const e2 = new THREE.Mesh(new THREE.TorusGeometry(r, 0.014, 6, 36), espM); e2.rotation.x = Math.PI / 2; e2.position.set(oX, Y0 + 0.332, oZ); gc.add(e2); });
    const perilla = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 16), K.plastic(0x2B2F36)); perilla.rotation.x = Math.PI / 2; perilla.position.set(oX + 0.4, Y0 + 0.15, oZ + 0.61); gc.add(perilla);
    const luzPil = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), new THREE.MeshBasicMaterial({ color:0xFF5A2A, toneMapped:false })); luzPil.position.set(oX + 0.2, Y0 + 0.16, oZ + 0.605); gc.add(luzPil);
    anim.espiral = espM; anim.piloto = luzPil;
    /* olla: corte de 100° hacia la cámara para ver el interior */
    const cut = 1.75, ph0 = 0.3 + cut / 2, phL = Math.PI * 2 - cut;
    const perfilOlla = [[0.001, 0], [0.56, 0], [0.6, 0.03], [0.62, 0.08], [0.62, 0.72], [0.66, 0.75], [0.66, 0.77], [0.595, 0.77], [0.595, 0.08], [0.56, 0.035], [0.001, 0.035]].map(p => new THREE.Vector2(p[0], p[1]));
    const ollaG = new THREE.LatheGeometry(perfilOlla, low ? 28 : 48, ph0, phL);
    const aceroM = K.metal(0xB9C1C8, { rough:0.28, brushed:true }); aceroM.side = THREE.DoubleSide;
    const olla = new THREE.Mesh(ollaG, aceroM); olla.position.set(oX, oY, oZ); gc.add(olla);
    /* tapas de las caras cortadas */
    const shp = new THREE.Shape(); perfilOlla.forEach((p, i) => i ? shp.lineTo(p.x, p.y) : shp.moveTo(p.x, p.y));
    const corteM = K.metal(0x8E979F, { rough:0.45 }); corteM.side = THREE.DoubleSide;
    [ph0, ph0 + phL].forEach(a => { const c = new THREE.Mesh(new THREE.ShapeGeometry(shp), corteM); c.position.set(oX, oY, oZ); c.rotation.y = a - Math.PI / 2; gc.add(c); });
    /* asas */
    [-1, 1].forEach(s => { const a2 = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 8, 16, Math.PI), K.plastic(0x23272C, { rough:0.5 })); a2.position.set(oX + s * 0.74 * Math.cos(0.3 - Math.PI / 2 + Math.PI / 2), oY + 0.66, oZ); a2.rotation.set(Math.PI / 2, 0, s > 0 ? -Math.PI / 2 : Math.PI / 2); gc.add(a2); });
    /* agua en corte */
    const aguaPerf = [[0.001, 0.04], [0.59, 0.04], [0.59, 0.56], [0.001, 0.56]].map(p => new THREE.Vector2(p[0], p[1]));
    const aguaM = new THREE.MeshPhysicalMaterial({ color:0x4AA3DF, roughness:0.08, clearcoat:1, transparent:true, opacity:0.5, depthWrite:false, side:THREE.DoubleSide });
    const aguaO = new THREE.Mesh(new THREE.LatheGeometry(aguaPerf, low ? 28 : 48, ph0, phL), aguaM); aguaO.position.set(oX, oY, oZ); gc.add(aguaO);
    const ashp = new THREE.Shape(); ashp.moveTo(0, 0.04); ashp.lineTo(0.59, 0.04); ashp.lineTo(0.59, 0.56); ashp.lineTo(0, 0.56); ashp.lineTo(0, 0.04);
    [ph0, ph0 + phL].forEach(a => { const c = new THREE.Mesh(new THREE.ShapeGeometry(ashp), aguaM); c.position.set(oX, oY, oZ); c.rotation.y = a - Math.PI / 2; gc.add(c); });
    /* trazadores (permanganato) que dibujan las corrientes de convección */
    const trzM = new THREE.MeshStandardMaterial({ color:0x7B2D8E, roughness:0.4, emissive:0x3A0F45, emissiveIntensity:0.3 });
    const nT = low ? 16 : 26, trzG = new THREE.SphereGeometry(0.028, 8, 6);
    anim.burbujas = [];
    for (let i = 0; i < nT; i++) { const b = new THREE.Mesh(trzG, trzM); b.userData.s = i / nT; b.userData.az = 0.3 + ((i % 5) - 2) * 0.28 + (i % 2 ? 0.07 : -0.07); gc.add(b); anim.burbujas.push(b); }
    anim.olla = { x:oX, y:oY, z:oZ };
    /* vapor */
    anim.vapor = []; for (let i = 0; i < (low ? 4 : 7); i++) { const v = K.halo(0xFFFFFF, 0.5, 0); v.userData.k = i / 7; gc.add(v); anim.vapor.push(v); }
    L3('calor', 'e-olla', 'Olla en corte', [oX + 0.2, oY + 1.25, oZ], [oX + 0.3, oY + 0.62, oZ + 0.3]);
    L3('calor', 'e-horn', 'Hornilla', [oX + 1.05, Y0 + 0.3, oZ + 0.7], [oX + 0.55, Y0 + 0.2, oZ + 0.55]);
    /* --- radiación: lámpara de escritorio sobre una placa negra --- */
    const lX = 2.9, lZ = -0.65;
    const placa = new THREE.Mesh(K.rbox(0.95, 0.05, 0.65, 0.03, 0.015), new THREE.MeshPhysicalMaterial({ color:0x16191C, roughness:0.75, clearcoat:0.1 })); placa.position.set(lX, Y0 + 0.14, lZ); gc.add(placa);
    [[-0.4, -0.26], [0.4, -0.26], [-0.4, 0.26], [0.4, 0.26]].forEach(([dx, dz]) => { const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8), tri); p2.position.set(lX + dx, Y0 + 0.06, lZ + dz); gc.add(p2); });
    anim.placa = placa;
    const pieL = new THREE.Mesh(K.lathe([[0, 0], [0.3, 0], [0.31, 0.03], [0.26, 0.07], [0, 0.08]], 28), K.metal(0x33393F, { rough:0.4 })); pieL.position.set(lX - 0.75, Y0, lZ); gc.add(pieL);
    const poste = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.55, 12), K.metal(0xAEB6BD, { rough:0.3 })); poste.position.set(lX - 0.75, Y0 + 1.3, lZ); gc.add(poste);
    const cab = new THREE.Group(); gc.add(cab); anim.lamp = cab;
    const brazoL = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.75, 10), K.metal(0xAEB6BD, { rough:0.3 })); brazoL.rotation.z = Math.PI / 2; brazoL.position.set(-0.375, 0.05, -0.15 * 0); cab.add(brazoL);
    const pinza = new THREE.Mesh(K.rbox(0.1, 0.12, 0.1, 0.02), K.metal(0x4A525A, { rough:0.4 })); pinza.position.set(-0.75, 0.05, 0); cab.add(pinza);
    const pant = new THREE.Mesh(K.lathe([[0.05, 0.3], [0.09, 0.29], [0.13, 0.22], [0.17, 0.08], [0.24, -0.08], [0.3, -0.17], [0.31, -0.2], [0.29, -0.2], [0.28, -0.17], [0.22, -0.08], [0.15, 0.08], [0.11, 0.2], [0.04, 0.26]], 36), K.metal(0x39424C, { rough:0.3, metal:0.85 }));
    const aroL = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.012, 6, 32), K.metal(0xC9CED3, { rough:0.25 })); aroL.rotation.x = Math.PI / 2; aroL.position.y = -0.2; cab.add(aroL); pant.material.side = THREE.DoubleSide; cab.add(pant);
    const bomb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), new THREE.MeshBasicMaterial({ color:0xFFF1C4, toneMapped:false })); bomb.position.y = 0.02; cab.add(bomb);
    const hL = K.halo(0xFFE3A0, 1.1, 0.7); hL.position.y = -0.02; cab.add(hL);
    const conoM = new THREE.MeshBasicMaterial({ color:0xFFE7A8, transparent:true, opacity:0.12, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide, toneMapped:false });
    const conoG = new THREE.CylinderGeometry(0.3, 0.62, 1, 32, 1, true); conoG.translate(0, -0.5, 0);
    const conoL = new THREE.Mesh(conoG, conoM); conoL.position.y = -0.2; cab.add(conoL); anim.conoLuz = conoL;
    anim.lampBase = { x:lX, z:lZ };
    /* termómetro digital de contacto sobre la placa */
    const tdig = new THREE.Mesh(K.rbox(0.36, 0.1, 0.22, 0.04, 0.02), K.plastic(0xF2F4F5, { rough:0.4 })); tdig.position.set(lX + 0.75, Y0 + 0.05, lZ + 0.35); gc.add(tdig);
    anim.tLCD = K.lcd({ w:220, h:90, text:'22,0 °C' });
    const tpl = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.1), anim.tLCD.mat); tpl.rotation.x = -Math.PI / 2 + 0.25; tpl.position.set(lX + 0.75, Y0 + 0.103, lZ + 0.35); gc.add(tpl);
    const sonda = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(lX + 0.6, Y0 + 0.06, lZ + 0.3), new THREE.Vector3(lX + 0.45, Y0 + 0.05, lZ + 0.2), new THREE.Vector3(lX + 0.3, Y0 + 0.17, lZ + 0.1)]), 16, 0.012, 6, false), K.plastic(0x2B2F36)); gc.add(sonda);
    L3('calor', 'e-lamp', 'Lámpara 60 W', [lX - 0.2, Y0 + 2.3, lZ], [lX, Y0 + 1.2, lZ]);
    L3('calor', 'e-placa', 'Placa negra', [lX + 0.95, Y0 + 0.55, lZ - 0.1], [lX + 0.3, Y0 + 0.17, lZ]);
    /* --- aislamiento: dos termos iguales, uno forrado --- */
    const termo = (x, z, forro) => {
      const g2 = new THREE.Group(); g2.position.set(x, Y0, z); gc.add(g2);
      const cuerpo = new THREE.Mesh(K.lathe([[0, 0], [0.27, 0], [0.29, 0.03], [0.29, 1.0], [0.25, 1.08], [0.16, 1.14], [0.16, 1.2], [0, 1.2]], 32), K.metal(0xC9D0D6, { rough:0.22, brushed:true })); g2.add(cuerpo);
      const tapa = new THREE.Mesh(K.lathe([[0, 1.18], [0.19, 1.18], [0.2, 1.22], [0.2, 1.36], [0.17, 1.4], [0, 1.4]], 24), K.plastic(0x23272C, { rough:0.45 })); g2.add(tapa);
      if (forro) { const f = new THREE.Mesh(K.lathe([[0.3, 0.06], [0.36, 0.08], [0.37, 0.25], [0.36, 0.3], [0.37, 0.5], [0.36, 0.55], [0.37, 0.75], [0.36, 0.8], [0.37, 0.95], [0.3, 1.0]], 32), K.plastic(0xC9482F, { rough:0.8, coat:0 })); g2.add(f);
        [0.3, 0.55, 0.8].forEach(y => { const c = new THREE.Mesh(new THREE.TorusGeometry(0.365, 0.012, 6, 36), K.plastic(0x8E2E1E, { rough:0.8 })); c.rotation.x = Math.PI / 2; c.position.y = y; g2.add(c); }); }
      return g2;
    };
    termo(3.7, 0.95, false); termo(4.5, 0.95, true);
    L3('calor', 'e-t1', 'Sin aislante', [3.7, Y0 + 1.75, 0.95]);
    L3('calor', 'e-t2', 'Con aislante', [4.5, Y0 + 1.75, 0.95]);

    /* =============== estación de luz: mesa de óptica con papel y transportador =============== */
    const gl = new THREE.Group(); E.scene.add(gl); G.luz = gl; gl.visible = false;
    const Cx = 0.25, Cz = 0.1, yP = Y0 + 0.006;
    const papel = K.printed(K.low() ? 512 : 1024, K.low() ? 352 : 704, (x, w, hh) => {
      x.fillStyle = '#FBFAF6'; x.fillRect(0, 0, w, hh);
      const cx = w / 2, cy = hh / 2, R = hh * 0.42;
      x.strokeStyle = 'rgba(40,60,90,0.25)'; x.lineWidth = 1; for (let i = 0; i < w; i += w / 36) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, hh); x.stroke(); } for (let j = 0; j < hh; j += w / 36) { x.beginPath(); x.moveTo(0, j); x.lineTo(w, j); x.stroke(); }
      x.strokeStyle = '#34495E'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.stroke();
      x.fillStyle = '#34495E'; x.font = `600 ${Math.round(hh * 0.028)}px "IBM Plex Sans", Arial`; x.textAlign = 'center'; x.textBaseline = 'middle';
      for (let d = 0; d < 360; d += 5) { const a = d * Math.PI / 180, big = d % 10 === 0, r1 = R - (big ? hh * 0.035 : hh * 0.018); x.lineWidth = big ? 2 : 1; x.beginPath(); x.moveTo(cx + Math.sin(a) * R, cy - Math.cos(a) * R); x.lineTo(cx + Math.sin(a) * r1, cy - Math.cos(a) * r1); x.stroke();
        if (big && d % 30 === 0) { const ang = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d; x.fillText(ang + '°', cx + Math.sin(a) * (R - hh * 0.07), cy - Math.cos(a) * (R - hh * 0.07)); } }
      x.setLineDash([10, 8]); x.strokeStyle = '#7F8C8D'; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, cy - R * 1.08); x.lineTo(cx, cy + R * 1.08); x.stroke(); x.setLineDash([]);
      x.strokeStyle = '#34495E'; x.lineWidth = 3; x.beginPath(); x.moveTo(cx - R * 1.1, cy); x.lineTo(cx + R * 1.1, cy); x.stroke();
      x.fillStyle = '#7F8C8D'; x.textAlign = 'left'; x.fillText('normal', cx + hh * 0.015, cy + R * 1.02);
    });
    const PW = 3.9, PD = 2.68;
    const hoja = new THREE.Mesh(new THREE.PlaneGeometry(PW, PD), new THREE.MeshPhysicalMaterial({ map:papel, roughness:0.85, clearcoat:0 })); hoja.rotation.x = -Math.PI / 2; hoja.position.set(Cx, yP, Cz); gl.add(hoja);
    const R0 = PD * 0.42;                 /* radio del transportador en unidades de escena */
    anim.luz = { Cx, Cz, yP, R0, key:'' , tiras:new THREE.Group() }; gl.add(anim.luz.tiras);
    /* caja de rayos */
    const cajaR = new THREE.Group(); gl.add(cajaR); anim.luz.caja = cajaR;
    const cjM = K.plastic(0x23272C, { rough:0.45, coat:0.4 });
    const cj = new THREE.Mesh(K.rbox(0.62, 0.34, 0.4, 0.05, 0.03), cjM); cj.position.set(-0.31, 0.17, 0); cajaR.add(cj);
    const rej = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.3), K.metal(0x8E979F, { rough:0.4 })); rej.position.set(-0.45, 0.36, 0); cajaR.add(rej);
    const rendija = new THREE.Mesh(new THREE.PlaneGeometry(0.03, 0.18), new THREE.MeshBasicMaterial({ color:0xFFF4CC, toneMapped:false })); rendija.rotation.y = Math.PI / 2; rendija.position.set(0.003, 0.14, 0); cajaR.add(rendija);
    const filtroM = new THREE.MeshPhysicalMaterial({ color:0xC0392B, transparent:true, opacity:0.6, roughness:0.2, depthWrite:false, side:THREE.DoubleSide });
    const filtro = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.34), filtroM); filtro.position.set(0.05, 0.17, 0); cajaR.add(filtro); anim.luz.filtro = filtro;
    /* espejo plano vertical */
    const espejo = new THREE.Group(); gl.add(espejo); anim.luz.espejo = espejo;
    const vidEsp = new THREE.Mesh(K.rbox(1.5, 0.5, 0.04, 0.02, 0.01), new THREE.MeshPhysicalMaterial({ color:0xE9F1F5, metalness:1, roughness:0.04, envMapIntensity:1.6 })); vidEsp.position.set(Cx, yP + 0.3, Cz - 0.03); espejo.add(vidEsp);
    const baseE = new THREE.Mesh(K.rbox(1.6, 0.08, 0.2, 0.03), cjM); baseE.position.set(Cx, yP + 0.04, Cz - 0.08); espejo.add(baseE);
    /* cubeta semicircular (el segundo medio) */
    const cub = new THREE.Group(); gl.add(cub); anim.luz.cubeta = cub;
    const semi = r => { const s = new THREE.Shape(); s.moveTo(-r, 0); s.absarc(0, 0, r, Math.PI, 2 * Math.PI, false); s.lineTo(-r, 0); return s; };
    const cubG = new THREE.ExtrudeGeometry(semi(0.9), { depth:0.34, bevelEnabled:false, curveSegments:low ? 20 : 40 }); cubG.rotateX(Math.PI / 2); cubG.translate(0, 0.34, 0);
    const cubM = K.glass({ opacity:0.3 });
    const cubeta = new THREE.Mesh(cubG, cubM); cubeta.position.set(Cx, yP, Cz); cub.add(cubeta);
    const llenoG = new THREE.ExtrudeGeometry(semi(0.86), { depth:0.26, bevelEnabled:false, curveSegments:low ? 20 : 40 }); llenoG.rotateX(Math.PI / 2); llenoG.translate(0, 0.28, 0);
    const llenoM = new THREE.MeshPhysicalMaterial({ color:0x5DADE2, roughness:0.05, clearcoat:1, transparent:true, opacity:0.45, depthWrite:false });
    const lleno = new THREE.Mesh(llenoG, llenoM); lleno.position.set(Cx, yP + 0.01, Cz); cub.add(lleno); anim.luz.lleno = lleno;
    /* prisma de vidrio y pantalla */
    const pri = new THREE.Group(); gl.add(pri); anim.luz.prisma = pri;
    const trian = new THREE.Shape(); const Lp = 0.8; trian.moveTo(-Lp / 2, -Lp * 0.289); trian.lineTo(Lp / 2, -Lp * 0.289); trian.lineTo(0, Lp * 0.577); trian.lineTo(-Lp / 2, -Lp * 0.289);
    const priG = new THREE.ExtrudeGeometry(trian, { depth:0.4, bevelEnabled:true, bevelSize:0.012, bevelThickness:0.012, bevelSegments:1 }); priG.rotateX(Math.PI / 2); priG.translate(0, 0.41, 0);
    const prisma = new THREE.Mesh(priG, K.glass({ opacity:0.46, color:0xCFEAF4 })); prisma.position.set(Cx, yP, Cz); prisma.rotation.y = Math.PI; pri.add(prisma);
    const pantP = new THREE.Mesh(K.rbox(0.06, 0.8, 1.2, 0.02), K.plastic(0xF4F4F0, { rough:0.8, coat:0 })); pantP.position.set(Cx + 1.55, yP + 0.4, Cz - 0.3); pantP.rotation.y = 0.8; pri.add(pantP);
    const espec = K.printed(256, 64, (x, w, hh) => { const g3 = x.createLinearGradient(0, 0, w, 0); ['#7B4FB5', '#2E6FD4', '#1E8449', '#D4AC0D', '#D35400', '#C0392B'].forEach((c, i) => g3.addColorStop(i / 5, c)); x.fillStyle = g3; x.fillRect(0, 0, w, hh); });
    const bandaE = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.2), new THREE.MeshBasicMaterial({ map:espec, toneMapped:false, transparent:true, opacity:0.95 })); bandaE.position.set(Cx + 1.55 - 0.04 * 0.7, yP + 0.16, Cz - 0.3 + 0.04 * 0.7); bandaE.rotation.y = -0.785; pri.add(bandaE);
    /* objeto de color iluminado */
    const obj = new THREE.Group(); gl.add(obj); anim.luz.obj = obj;
    const cuboM = K.plastic(0xC0392B, { rough:0.5, coat:0.3 });
    const cubo = new THREE.Mesh(K.rbox(0.5, 0.5, 0.5, 0.05, 0.03), cuboM); cubo.position.set(Cx + 0.35, yP + 0.25, Cz); obj.add(cubo); anim.luz.cuboM = cuboM;
    /* sombra: foco extenso, tarjeta y pantalla con umbra y penumbra */
    const som = new THREE.Group(); gl.add(som); anim.luz.som = som;
    const fuenteS = new THREE.Mesh(new THREE.BoxGeometry(1, 0.26, 0.05), new THREE.MeshBasicMaterial({ color:0xFFF2C0, toneMapped:false })); som.add(fuenteS); anim.luz.fuenteS = fuenteS;
    const marcoS = new THREE.Mesh(K.rbox(0.36, 0.5, 0.2, 0.04), cjM); som.add(marcoS); anim.luz.marcoS = marcoS;
    const tarjeta = new THREE.Mesh(new THREE.BoxGeometry(1, 0.34, 0.015), K.plastic(0x1B1E22, { rough:0.8 })); som.add(tarjeta); anim.luz.tarjeta = tarjeta;
    const vTar = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 6), K.metal(0x8E979F)); som.add(vTar); anim.luz.vTar = vTar;
    const sombraC = document.createElement('canvas'); sombraC.width = 512; sombraC.height = 128; const sombraT = K.tex(sombraC);
    const pantS = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.9), new THREE.MeshBasicMaterial({ map:sombraT })); som.add(pantS); anim.luz.pantS = pantS; anim.luz.sombraC = sombraC; anim.luz.sombraT = sombraT;
    const marcoP = new THREE.Mesh(K.rbox(2.7, 1.0, 0.04, 0.02), K.plastic(0x5B6670, { rough:0.6 })); som.add(marcoP); anim.luz.marcoP = marcoP;
    L3('luz', 'e-caja', 'Caja de rayos', [0, 0, 0]);
    L3('luz', 'e-elem', 'Espejo plano', [Cx, yP + 0.95, Cz - 0.2]);

    /* =============== estación de sonido =============== */
    const gs = new THREE.Group(); E.scene.add(gs); G.sonido = gs; gs.visible = false;
    const sx0 = -3.9, sy = Y0 + 0.75;
    const bafle = new THREE.Mesh(K.rbox(0.9, 1.5, 0.9, 0.06, 0.03), K.wood({ base:[70,52,40], dark:[30,20,14], strips:3, seed:31, coat:0.3 })); bafle.position.set(sx0, Y0 + 0.75, 0); gs.add(bafle);
    const aroP = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.035, 10, 36), K.metal(0x2B2F36, { rough:0.4 })); aroP.rotation.y = Math.PI / 2; aroP.position.set(sx0 + 0.46, sy, 0); gs.add(aroP);
    const cono = new THREE.Group(); cono.position.set(sx0 + 0.45, sy, 0); gs.add(cono); anim.cono = cono;
    const parlM = K.plastic(0x2C3036, { rough:0.75, coat:0.05 }); parlM.side = THREE.DoubleSide;
    const cg = new THREE.Mesh(K.lathe([[0.07, 0.0], [0.2, -0.05], [0.33, -0.11], [0.37, -0.12], [0.39, -0.1]], 36), parlM); cg.rotation.z = Math.PI / 2; cono.add(cg);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), K.plastic(0x3A3F46, { rough:0.4 })); cap.rotation.z = -Math.PI / 2; cap.position.x = -0.0; cono.add(cap);
    const tw = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 20), K.metal(0x7C868F, { rough:0.3 })); tw.rotation.z = Math.PI / 2; tw.position.set(sx0 + 0.45, sy + 0.55, 0); gs.add(tw);
    /* conducto transparente con las partículas del medio */
    const ductM = K.glass({ opacity:0.14 });
    const duct = new THREE.Mesh(K.rbox(7.1, 1.1, 1.1, 0.08, 0.03), ductM); duct.position.set(0.13, sy, 0); gs.add(duct); anim.duct = duct;
    const fillM = new THREE.MeshPhysicalMaterial({ color:0x5DADE2, transparent:true, opacity:0, roughness:0.1, depthWrite:false }); const fill = new THREE.Mesh(new THREE.BoxGeometry(6.95, 0.98, 0.98), fillM); fill.position.copy(duct.position); gs.add(fill); anim.fill = fill;
    const nX = low ? 44 : 60, rowsY = [-0.3, 0, 0.3], rowsZ = low ? [-0.25, 0.25] : [-0.3, 0, 0.3];
    const pG = new THREE.SphereGeometry(0.055, 8, 6);
    const pM = new THREE.MeshStandardMaterial({ color:0xffffff, roughness:0.45, metalness:0.05 });
    const inst = new THREE.InstancedMesh(pG, pM, nX * rowsY.length * rowsZ.length); gs.add(inst);
    anim.inst = inst; anim.parts = [];
    rowsY.forEach((yy, a) => rowsZ.forEach((zz, b) => { for (let i = 0; i < nX; i++) anim.parts.push({ x0:-3.3 + i / (nX - 1) * 6.9 + ((a + b) % 2) * 0.03, y:sy + yy, z:zz }); }));
    const cTmp = new THREE.Color(); anim.parts.forEach((p, i) => inst.setColorAt(i, cTmp.set(0x7FB3D5)));
    anim.mTmp = new THREE.Matrix4();
    /* pared de fondo del recorrido: su material cambia con la elección */
    const paredM = new THREE.MeshPhysicalMaterial({ color:0xffffff, roughness:0.9, clearcoat:0 });
    const paredS = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.3, 2.4), paredM); paredS.position.set(3.85, Y0 + 1.15, 0); gs.add(paredS); anim.paredM = paredM; anim.paredKey = '';
    /* sonómetro sobre trípode */
    const sonG = new THREE.Group(); sonG.position.set(2.55, Y0, 1.2); gs.add(sonG);
    [0, 2.09, 4.19].forEach(a => { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.1, 6), K.metal(0x2B2F36, { rough:0.5 })); leg.position.set(Math.cos(a) * 0.2, 0.5, Math.sin(a) * 0.2); leg.rotation.set(Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35); sonG.add(leg); });
    const cuerpoS = new THREE.Mesh(K.rbox(0.3, 0.7, 0.12, 0.05, 0.03), K.plastic(0x2F3A44, { rough:0.45, coat:0.5 })); cuerpoS.position.set(0, 1.35, 0); cuerpoS.rotation.x = -0.25; sonG.add(cuerpoS);
    const mic = new THREE.Mesh(K.lathe([[0, 0], [0.03, 0], [0.035, 0.2], [0.06, 0.25], [0.06, 0.3], [0, 0.33]], 16), K.metal(0x9AA3AB, { rough:0.3 })); mic.position.set(0, 1.68, -0.08); mic.rotation.x = -0.25; sonG.add(mic);
    const bola = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 10), K.plastic(0x3A3F46, { rough:0.95, coat:0 })); bola.position.set(0, 2.02, -0.16); sonG.add(bola);
    anim.dbLCD = K.lcd({ w:220, h:96, text:'0,0 dB' });
    const dpl = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.1), anim.dbLCD.mat); dpl.position.set(0, 1.47, 0.065 - 0.03); dpl.rotation.x = -0.25; sonG.add(dpl);
    L3('sonido', 'e-parl', 'Parlante', [sx0, Y0 + 1.85, 0]);
    L3('sonido', 'e-pared', 'Pared', [3.85, Y0 + 2.6, 0]);
    L3('sonido', 'e-sonom', 'Sonómetro', [2.55, Y0 + 2.4, 1.2]);
    L3('sonido', 'e-medio', 'Partículas del medio', [-0.6, sy + 0.95, 0], [-0.6, sy + 0.32, 0]);

    E.onFrame((t, dt) => tick(t, dt));
  }

  let tAcum = 0;
  function tick(t, dt){
    /* equilibrio térmico: relajación exponencial hacia Tf */
    if (S.contacto && S.Tf !== null) {
      const k = 1 - Math.exp(-dt / 2.5);
      S.TAe += (S.Tf - S.TAe) * k;
      S.TBe += (S.Tf - S.TBe) * k;
      S.tC += dt;
      if (S.tC < 12) actualizarCalorLigero();
    }
    if (S.calentando) { S.tCal += dt * 60; if (S.tCal > 2200) S.tCal = 2200; actualizarCalorLigero(); }
    tAcum += dt;
    if (E) animar3D(tAcum, dt);
    if (S.est === 'sonido' && eneMotion()) dibujarEsquema();
  }
  let ligeroT = 0;
  function actualizarCalorLigero(){
    ligeroT++;
    if (ligeroT % 4 === 0) actualizarCalor();
  }
  function eneEtiquetas(){
    if (!anim.lbls) return;
    Object.keys(anim.lbls).forEach(k => anim.lbls[k].forEach(id => E.setVisible(id, k === S.est)));
  }
  function animar3D(t, dt){
    if (!E) return;
    G.calor.visible = S.est === 'calor';
    G.luz.visible = S.est === 'luz';
    G.sonido.visible = S.est === 'sonido';
    if (anim._est !== S.est) { anim._est = S.est; eneEtiquetas(); }
    const mov = eneMotion();
    if (S.est === 'calor') {
      const TA = S.contacto ? S.TAe : S.TA, TB = S.contacto ? S.TBe : S.TB;
      /* vasos: nivel según la masa, color según la temperatura, termómetros */
      [[anim.vA, S.mA, TA], [anim.vB, S.mB, TB]].forEach(([v, m, T]) => { v.lq.setLevel(0.9 * m); v.lq.setColor(colorAgua(T), 0.84); v.th.set(T); v.lq.tick(t, false); });
      /* en contacto, el vaso B se acerca hasta tocar al vaso A */
      const xB = S.contacto ? anim.vA.x0 + 1.07 : anim.vB.x0;
      anim.vB.g.position.x += (xB - anim.vB.g.position.x) * (mov ? Math.min(1, dt * 4) : 1);
      /* conducción: la cera se derrite en el orden de los tiempos calculados */
      anim.llama.visible = S.calentando;
      if (S.calentando && mov) { const f = 1 + 0.06 * Math.sin(t * 31) + 0.04 * Math.sin(t * 17); anim.llama.scale.set(1, f, 1); }
      anim.varillas.forEach(o => {
        const tt = 0.03 * 0.03 / (4 * o.m.alfa), av = S.calentando ? clamp(S.tCal / tt, 0, 1) : 0;
        const k = av < 0.85 ? 1 : 1 - (av - 0.85) / 0.15;
        o.gota.visible = av < 1; o.gota.scale.set(1 + (1 - k) * 0.3, 0.8 * Math.max(0.15, k), 1 + (1 - k) * 0.3); o.gota.position.y = o.tip.y + 0.09 * Math.max(0.3, k);
        o.charco.visible = av >= 1;
      });
      /* convección: la espiral se pone al rojo y los trazadores circulan */
      anim.espiral.emissiveIntensity += ((S.conv ? 1.6 : 0) - anim.espiral.emissiveIntensity) * Math.min(1, dt * 2);
      anim.piloto.visible = S.conv;
      const O = anim.olla;
      anim.burbujas.forEach((b, i) => {
        if (!S.conv) { const s0 = b.userData.s; b.position.set(O.x + Math.sin(b.userData.az) * (0.12 + 0.42 * ((i * 37) % 11) / 11), O.y + 0.06, O.z + Math.cos(b.userData.az) * (0.12 + 0.42 * ((i * 37) % 11) / 11)); return; }
        const s = (b.userData.s + (mov ? t * 0.12 : 0)) % 1, th = s * Math.PI * 2;
        const rho = 0.3 - 0.22 * Math.cos(th), y = O.y + 0.3 + 0.2 * Math.sin(th), az = b.userData.az;
        b.position.set(O.x + Math.sin(az) * rho, y, O.z + Math.cos(az) * rho);
      });
      anim.vapor.forEach((v, i) => { if (!S.conv) { v.material.opacity = 0; return; } const k = ((mov ? t * 0.25 : 0) + v.userData.k) % 1; v.position.set(O.x + Math.sin(i * 2.3) * 0.25, O.y + 0.85 + k * 1.0, O.z + Math.cos(i * 2.3) * 0.15); v.scale.setScalar(0.3 + k * 0.7); v.material.opacity = 0.28 * Math.sin(k * Math.PI); });
      /* radiación: la lámpara sube o baja con la distancia; el cono de luz se atenúa */
      if (anim.lamp) {
        const yL = -0.8 + clamp(S.lampD * 1.6, 0.25, 2.4);
        anim.lamp.position.set(anim.lampBase.x, yL, anim.lampBase.z);
        const hgt = Math.max(0.05, yL - (Y0 + 0.17) - 0.2); anim.conoLuz.scale.set(1 + hgt * 0.35, hgt, 1 + hgt * 0.35);
        const I = 60 / (4 * Math.PI * S.lampD * S.lampD); anim.conoLuz.material.opacity = clamp(0.05 + I / 212 * 0.2, 0.05, 0.28);
        anim.tLCD.set(eneN(ENE_TAMB + I * 0.25, 1) + ' °C');
      }
    } else if (S.est === 'luz') {
      luz3D();
    } else if (S.est === 'sonido') {
      const me = medio();
      if (anim.cono) { const amp = me.v ? S.amp / 100 : 0; anim.cono.position.x = -3.9 + 0.45 + (mov ? amp * 0.07 * Math.sin(t * 12) : 0); }
      const A = me.v ? S.amp / 100 * 0.24 : 0;
      const kk = clamp(S.frec / 700, 0.6, 7);
      const base = new THREE.Color(me.id === 'agua' ? 0x2E86C1 : me.id === 'acero' ? 0x9AA7B4 : 0x7FB3D5), dens = new THREE.Color(me.id === 'acero' ? 0x3C4650 : 0x154360), rare = new THREE.Color(0xE8F4FB), cl = new THREE.Color();
      anim.inst.visible = !!me.v;
      anim.fill.material.opacity = me.id === 'agua' ? 0.22 : me.id === 'acero' ? 0.3 : 0;
      anim.fill.material.color.set(me.id === 'acero' ? 0x9AA7B4 : 0x5DADE2);
      if (me.v) {
        const ph = mov ? t * 5 : 0;
        anim.parts.forEach((p, i) => {
          const arg = (p.x0 + 2.7) * kk - ph;
          const x = p.x0 + A * Math.sin(arg);
          anim.mTmp.makeTranslation(x, p.y, p.z); anim.inst.setMatrixAt(i, anim.mTmp);
          const comp = -Math.cos(arg) * clamp(A * kk * 12, 0.3, 1);   /* compresión (+) o enrarecimiento (−) */
          cl.copy(base).lerp(comp > 0 ? dens : rare, Math.abs(comp) * 0.8); anim.inst.setColorAt(i, cl);
        });
        anim.inst.instanceMatrix.needsUpdate = true; if (anim.inst.instanceColor) anim.inst.instanceColor.needsUpdate = true;
      }
      /* material de la pared */
      if (anim.paredKey !== S.pared) {
        anim.paredKey = S.pared; const K = cnLabKit, pm = anim.paredM;
        if (pm.map) pm.map.dispose();
        const c = S.pared === 'concreto' ? K.poreC({ base:[168,168,164], pores:0.8, pr:2, seed:5 }) : S.pared === 'madera' ? K.woodC({ base:[176,128,80], strips:5, seed:14, w:512, h:512 }) : S.pared === 'cortina' ? K.clothC({ base:[138,40,48] }) : K.foamC();
        pm.map = K.tex(c, { wrap:true, rep:S.pared === 'espuma' ? [2, 2] : [1, 1] }); pm.roughness = S.pared === 'concreto' ? 0.95 : S.pared === 'madera' ? 0.55 : 1; pm.needsUpdate = true;
      }
      anim.dbLCD.set(me.v ? eneN(nivelDb(), 1) + ' dB' : '--,- dB');
    }
  }
  /* banco óptico: se muestran solo las piezas del montaje elegido y los rayos se recalculan al cambiar un valor */
  function luz3D(){
    const Lz = anim.luz, K = cnLabKit; if (!Lz) return;
    const key = [S.modo, S.ang, S.nMedio, S.filtro, S.objeto, S.fuenteW, S.distObj, S.distPant].join('|');
    if (Lz.key === key) return; Lz.key = key;
    const r = Math.PI / 180, C = new THREE.Vector3(Lz.Cx, Lz.yP + 0.03, Lz.Cz), R = Lz.R0 * 1.02;
    /* limpiar rayos anteriores */
    while (Lz.tiras.children.length) { const o = Lz.tiras.children[0]; Lz.tiras.remove(o); o.geometry.dispose(); o.material.dispose(); }
    const rayo = (a, b, col, w, op) => {
      const d = b.clone().sub(a), len = d.length(); if (len < 1e-3) return;
      [[w || 0.03, op ?? 0.95], [(w || 0.03) * 4, (op ?? 0.95) * 0.22]].forEach(([ww, oo]) => {
        const g = new THREE.PlaneGeometry(len, ww); const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color:col, transparent:true, opacity:oo, depthWrite:false, toneMapped:false, side:THREE.DoubleSide }));
        m.rotation.x = -Math.PI / 2; m.rotation.z = Math.atan2(-d.z, d.x); m.position.copy(a).addScaledVector(d, 0.5); m.position.y += 0.002; Lz.tiras.add(m); });
    };
    ['espejo', 'cubeta', 'prisma', 'obj', 'som'].forEach(k => Lz[k].visible = false);
    Lz.caja.visible = S.modo !== 'sombra'; Lz.filtro.visible = false;
    const ponerCaja = (p, dir) => { Lz.caja.position.set(p.x, Lz.yP, p.z); Lz.caja.rotation.y = Math.atan2(-dir.z, dir.x); };
    const lblC = E.labels.get('e-caja'), lblE = E.labels.get('e-elem');
    const setL = (l, txt, pos) => { if (!l) return; l.el.textContent = txt; l.pos.set(pos.x, pos.y, pos.z); };
    const blanco = 0xF2A900;   /* haz de la caja de rayos: ámbar, para que se lea sobre el papel blanco */
    if (S.modo === 'espejo' || S.modo === 'refrac') {
      const ai = S.ang * r, dIn = new THREE.Vector3(Math.sin(ai), 0, -Math.cos(ai));
      const P0 = C.clone().addScaledVector(dIn, -R); ponerCaja(P0.clone().addScaledVector(dIn, -0.05), dIn);
      rayo(P0, C, blanco);
      if (S.modo === 'espejo') { Lz.espejo.visible = true; rayo(C, C.clone().add(new THREE.Vector3(Math.sin(ai), 0, Math.cos(ai)).multiplyScalar(R)), blanco); setL(lblE, 'Espejo plano', new THREE.Vector3(Lz.Cx, Lz.yP + 0.95, Lz.Cz - 0.2)); }
      else {
        Lz.cubeta.visible = true;
        const n2 = S.nMedio, aR = Math.asin(clamp(Math.sin(ai) / n2, -1, 1));
        Lz.lleno.visible = n2 > 1.001; Lz.lleno.material.color.set(n2 > 1.4 ? 0xD6EEF4 : 0x5DADE2); Lz.lleno.material.opacity = n2 > 1.4 ? 0.55 : 0.45;
        rayo(C, C.clone().add(new THREE.Vector3(Math.sin(aR), 0, -Math.cos(aR)).multiplyScalar(R * 0.98)), blanco);
        rayo(C, C.clone().add(new THREE.Vector3(Math.sin(ai), 0, Math.cos(ai)).multiplyScalar(R * 0.6)), blanco, 0.02, 0.3);   /* parte reflejada */
        setL(lblE, n2 > 1.4 ? 'Bloque de vidrio' : n2 > 1.001 ? 'Cubeta con agua' : 'Cubeta vacía (aire)', new THREE.Vector3(Lz.Cx, Lz.yP + 0.8, Lz.Cz - 0.55));
      }
      setL(lblC, 'Caja de rayos', P0.clone().setY(Lz.yP + 0.7));
    } else if (S.modo === 'prisma') {
      Lz.prisma.visible = true;
      const P0 = new THREE.Vector3(Lz.Cx - 1.7, C.y, Lz.Cz + 0.12), hit = new THREE.Vector3(Lz.Cx - 0.2, C.y, Lz.Cz + 0.05);
      ponerCaja(P0.clone().addScaledVector(hit.clone().sub(P0).normalize(), -0.05), hit.clone().sub(P0).normalize());
      rayo(P0, hit, blanco);
      const sal = new THREE.Vector3(Lz.Cx + 0.18, C.y, Lz.Cz - 0.02), scr = new THREE.Vector3(Lz.Cx + 1.52, C.y, Lz.Cz - 0.27);
      rayo(hit, sal, blanco, 0.04, 0.5);
      ENE_NCOL.forEach((c, i) => { const off = (i - 2.5) * 0.09; rayo(sal, scr.clone().add(new THREE.Vector3(off * 0.72, 0, off * 0.7)), new THREE.Color(c.col).getHex(), 0.022, 0.95); });
      setL(lblC, 'Caja de rayos', P0.clone().setY(Lz.yP + 0.7)); setL(lblE, 'Prisma de vidrio', new THREE.Vector3(Lz.Cx, Lz.yP + 0.95, Lz.Cz));
    } else if (S.modo === 'color') {
      Lz.obj.visible = true;
      const HEX = { rojo:0xE74C3C, verde:0x2ECC71, azul:0x3498DB };
      const luzC = S.filtro === 'ninguno' ? ['rojo', 'verde', 'azul'] : [S.filtro];
      const refleja = { rojo:['rojo'], verde:['verde'], blanco:['rojo', 'verde', 'azul'], negro:[] }[S.objeto];
      const salen = luzC.filter(x => refleja.indexOf(x) >= 0);
      const P0 = new THREE.Vector3(Lz.Cx - 1.6, C.y, Lz.Cz), hit = new THREE.Vector3(Lz.Cx + 0.1, C.y, Lz.Cz);
      ponerCaja(P0, new THREE.Vector3(1, 0, 0));
      Lz.filtro.visible = S.filtro !== 'ninguno'; if (S.filtro !== 'ninguno') Lz.filtro.material.color.set(HEX[S.filtro]);
      rayo(P0.clone().add(new THREE.Vector3(0.08, 0, 0)), hit, S.filtro === 'ninguno' ? blanco : HEX[S.filtro], 0.05);
      /* el color con que se ve el objeto es la suma de lo que refleja */
      const col = new THREE.Color(0, 0, 0); salen.forEach(c => col.add(new THREE.Color(HEX[c])));
      if (!salen.length) col.set(0x1A1C1F); Lz.cuboM.color.copy(col); if (Lz.cuboM.userData.c0) Lz.cuboM.userData.c0.copy(col);
      salen.forEach((c, i) => rayo(new THREE.Vector3(Lz.Cx + 0.35, C.y, Lz.Cz + 0.26), new THREE.Vector3(Lz.Cx + 0.35 + (i - (salen.length - 1) / 2) * 0.25, C.y, Lz.Cz + 1.2), HEX[c], 0.03, 0.8));
      setL(lblC, 'Lámpara con filtro', P0.clone().setY(Lz.yP + 0.7)); setL(lblE, 'Objeto ' + S.objeto, new THREE.Vector3(Lz.Cx + 0.35, Lz.yP + 0.85, Lz.Cz));
    } else {
      Lz.som.visible = true;
      const k = 1.15, a = S.distObj, b = S.distPant, F = S.fuenteW, O = S.anchoObj;
      const zF = Lz.Cz + (a + b) * k / 2, zO = zF - a * k, zP = zO - b * k, y = Lz.yP + 0.45;
      Lz.fuenteS.visible = F > 0.004; Lz.fuenteS.scale.set(Math.max(0.01, F * k), 1, 1); Lz.fuenteS.position.set(Lz.Cx, y, zF - 0.1);
      Lz.marcoS.position.set(Lz.Cx, y, zF + 0.02); Lz.marcoS.scale.set(Math.max(1, (F * k + 0.1) / 0.36), 1, 1);
      Lz.tarjeta.scale.set(O * k, 1, 1); Lz.tarjeta.position.set(Lz.Cx, y, zO); Lz.vTar.position.set(Lz.Cx, Lz.yP + 0.14, zO);
      Lz.pantS.position.set(Lz.Cx, y, zP); Lz.marcoP.position.set(Lz.Cx, y, zP - 0.03);
      /* pantalla: umbra (negra) y penumbra (degradado), con la escala real de 2,6 unidades */
      const cv = Lz.sombraC, x = cv.getContext('2d'), W = cv.width, H = cv.height, pxm = W / (2.6 / k);
      const umbra = O * (a + b) / a - F * b / a, penum = O * (a + b) / a + F * b / a;
      x.fillStyle = '#FFF7DC'; x.fillRect(0, 0, W, H);
      const cx = W / 2, hp = penum * pxm / 2, hu = Math.max(0, umbra) * pxm / 2;
      const gr = x.createLinearGradient(cx - hp, 0, cx + hp, 0); const e = hp > 0 ? (hp - hu) / (2 * hp) : 0;
      gr.addColorStop(0, 'rgba(40,40,40,0)'); gr.addColorStop(Math.max(0.001, e), 'rgba(24,24,24,' + (umbra > 0 ? 0.92 : 0.75) + ')'); gr.addColorStop(Math.min(0.999, 1 - e), 'rgba(24,24,24,' + (umbra > 0 ? 0.92 : 0.75) + ')'); gr.addColorStop(1, 'rgba(40,40,40,0)');
      x.fillStyle = gr; x.fillRect(cx - hp, H * 0.2, 2 * hp, H * 0.6);
      Lz.sombraT.needsUpdate = true;
      const yR = y;
      [-1, 1].forEach(sg => [-1, 1].forEach(s2 => { const fx = Lz.Cx + sg * F * k / 2, ox = Lz.Cx + s2 * O * k / 2; const t2 = (zF - zP) / (zF - zO); rayo(new THREE.Vector3(fx, yR - 0.4, zF - 0.1), new THREE.Vector3(fx + (ox - fx) * t2, yR - 0.4, zP), 0xFFE9A8, 0.012, 0.5); }));
      setL(lblC, 'Fuente de luz', new THREE.Vector3(Lz.Cx, y + 0.45, zF)); setL(lblE, 'Pantalla', new THREE.Vector3(Lz.Cx, y + 0.6, zP));
    }
  }

  /* ---- alternativa 2D si no hay WebGL ---- */
  let cv2 = null, raf2 = 0;
  if (!E) {
    stage.append(h('div', { class:'ph', style:'position:absolute;top:46px;left:12px;right:12px;z-index:2' },
      'Tu equipo no tiene WebGL disponible, así que la vista 3D no se puede mostrar. En su lugar aparece el esquema del montaje en dos dimensiones: los controles, los cálculos, las tablas, el diagrama de flujo y el reto funcionan exactamente igual.'));
    cv2 = h('canvas', { class:'ene-2d', style:'top:156px', role:'img', 'aria-label':'Esquema del montaje en dos dimensiones' });
    stage.append(cv2);
    let last = performance.now(), ult = 0;
    const loop = now => {
      raf2 = requestAnimationFrame(loop);
      if (document.hidden) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      tick(now / 1000, dt);
      if (now - ult > 55) { ult = now; dibujarEsquema(); }   // ~18 cuadros por segundo: suficiente y menos carga
    };
    raf2 = requestAnimationFrame(loop);
  }

  /* =====================================================================
     ESQUEMA 2D CON MEDIDAS (calor, luz, sonido)
     ===================================================================== */
  function prep(cv){
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = cv.clientWidth || 600, H = cv.clientHeight || 280;
    if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
    const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
    return { c, W, H };
  }
  function txt(c, s, x, y, col, size, align){
    c.fillStyle = col || (cssVar('--ink-2') || '#444');
    c.font = (size || 11) + 'px "IBM Plex Mono", monospace';
    c.textAlign = align || 'left';
    c.fillText(s, x, y);
  }
  function flecha(c, x1, y1, x2, y2, col, w){
    const a = Math.atan2(y2 - y1, x2 - x1);
    c.strokeStyle = col; c.fillStyle = col; c.lineWidth = w || 2; c.lineCap = 'round';
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 - Math.cos(a) * 7, y2 - Math.sin(a) * 7); c.stroke();
    c.beginPath(); c.moveTo(x2, y2);
    c.lineTo(x2 - Math.cos(a - 0.4) * 9, y2 - Math.sin(a - 0.4) * 9);
    c.lineTo(x2 - Math.cos(a + 0.4) * 9, y2 - Math.sin(a + 0.4) * 9);
    c.closePath(); c.fill();
  }

  function dibujarEsquema(){
    [dia, cv2].forEach(cv => { if (cv) pintar(cv); });
  }
  function pintar(cv){
    const { c, W, H } = prep(cv);
    if (S.est === 'calor') pintarCalor(c, W, H);
    else if (S.est === 'luz') pintarLuz(c, W, H);
    else pintarSonido(c, W, H);
  }

  function pintarCalor(c, W, H){
    const TA = S.contacto ? S.TAe : S.TA, TB = S.contacto ? S.TBe : S.TB;
    const col = T => eneRGB(T);
    const baseY = H - 46;
    function vaso(x, m, T, nombre){
      const w = 34 + m * 60, hh = 30 + m * 70;
      c.strokeStyle = cssVar('--ink-3') || '#888'; c.lineWidth = 2;
      c.strokeRect(x - w / 2, baseY - hh, w, hh);
      c.fillStyle = col(T);
      c.globalAlpha = 0.85; c.fillRect(x - w / 2 + 2, baseY - hh * 0.72, w - 4, hh * 0.72 - 2); c.globalAlpha = 1;
      txt(c, nombre, x, baseY + 16, cssVar('--ink'), 12, 'center');
      txt(c, eneN(T, 1) + ' °C', x, baseY - hh - 20, cssVar('--ink'), 13, 'center');
      txt(c, eneN(m, 2) + ' kg', x, baseY - hh - 6, cssVar('--ink-3'), 10, 'center');
      return { x, w, hh };
    }
    const a = vaso(W * 0.20, S.mA, TA, 'Vaso A');
    const b = vaso(W * 0.44, S.mB, TB, 'Vaso B');
    if (S.contacto) {
      const dir = S.TA > S.TB ? 1 : -1;
      const y = baseY - 30;
      flecha(c, dir > 0 ? a.x + a.w / 2 + 4 : b.x - b.w / 2 - 4, y, dir > 0 ? b.x - b.w / 2 - 4 : a.x + a.w / 2 + 4, y, '#C0392B', 3);
      txt(c, 'energía', (a.x + b.x) / 2, y - 8, '#C0392B', 11, 'center');
    }
    /* barras de energía */
    const EA = energiaTermica(S.mA, TA), EB = energiaTermica(S.mB, TB), ref = Math.max(EA, EB, 1);
    const bx = W * 0.62, bw = W * 0.32;
    txt(c, 'Energía térmica (E = m·c·T)', bx, 26, cssVar('--ink-2'), 12);
    [[EA, '#2E86C1', 'A'], [EB, '#C0392B', 'B']].forEach(([v, cc, l], i) => {
      const y = 44 + i * 30;
      c.fillStyle = cssVar('--bg-2') || '#eee'; c.fillRect(bx, y, bw, 18);
      c.fillStyle = cc; c.fillRect(bx, y, bw * (v / ref), 18);
      txt(c, l + ': ' + eneN(v / 1000, 1) + ' kJ', bx + 6, y + 13, '#fff', 11);
    });
    /* conducción */
    txt(c, 'Conducción · avance del calor', bx, 126, cssVar('--ink-2'), 12);
    ENE_MAT.forEach((m, i) => {
      const y = 142 + i * 22, t = 0.03 * 0.03 / (4 * m.alfa);
      const av = S.calentando ? clamp(S.tCal / t, 0, 1) : 0;
      c.fillStyle = cssVar('--bg-2') || '#eee'; c.fillRect(bx, y, bw, 14);
      c.fillStyle = m.col; c.fillRect(bx, y, bw * av, 14);
      txt(c, m.n.split(' ')[0] + ' · ' + eneN(t, 1) + ' s', bx + 4, y + 11, cssVar('--ink'), 10);
    });
    /* radiación */
    const lx = W * 0.32, ly = 40;
    c.fillStyle = '#FFE9A8'; c.beginPath(); c.arc(lx, ly, 12, 0, Math.PI * 2); c.fill();
    for (let i = -2; i <= 2; i++) flecha(c, lx, ly + 12, lx + i * 16, ly + 12 + 44 * S.lampD, '#D4AC0D', 1.4);
    txt(c, 'lámpara 60 W · d = ' + eneN(S.lampD, 2) + ' m · I = ' + eneN(60 / (4 * Math.PI * S.lampD * S.lampD), 1) + ' W/m²', lx, ly - 18, cssVar('--ink-2'), 10, 'center');

    const mm = matDe(S.matSel);
    const Tcont = (mm.b * ENE_TAMB + 1500 * 33) / (mm.b + 1500);
    diaTxt.textContent = `Vaso A: ${eneN(S.mA, 2)} kg a ${eneN(TA, 1)} °C, energía ${eneN(EA / 1000, 1)} kJ. Vaso B: ${eneN(S.mB, 2)} kg a ${eneN(TB, 1)} °C, energía ${eneN(EB / 1000, 1)} kJ. ${S.contacto ? 'En contacto: la energía va del más caliente al más frío; temperatura de equilibrio ' + eneN(tEquilibrio(), 1) + ' °C.' : 'Sin contacto todavía.'} Al tocar ${mm.n.toLowerCase()} (a ${eneN(ENE_TAMB, 1)} °C) el punto de contacto con tu piel queda en ${eneN(Tcont, 1)} °C. Lámpara a ${eneN(S.lampD, 2)} m: irradiancia ${eneN(60 / (4 * Math.PI * S.lampD * S.lampD), 1)} W/m².`;
  }

  function pintarLuz(c, W, H){
    const r = Math.PI / 180;
    const cx = W * 0.5, cy = S.modo === 'espejo' ? H * 0.80 : H * 0.42, L = Math.min(W, H) * (S.modo === 'espejo' ? 0.52 : 0.34);
    const ink = cssVar('--ink') || '#222', ink3 = cssVar('--ink-3') || '#888';
    if (S.modo === 'espejo' || S.modo === 'refrac' || S.modo === 'prisma') {
      /* superficie horizontal y normal vertical */
      c.strokeStyle = ink3; c.lineWidth = 3;
      c.beginPath(); c.moveTo(W * 0.12, cy); c.lineTo(W * 0.88, cy); c.stroke();
      c.setLineDash([5, 4]); c.lineWidth = 1.5; c.strokeStyle = ink3;
      c.beginPath(); c.moveTo(cx, cy - L * 1.2); c.lineTo(cx, Math.min(H - 4, cy + L * 0.6)); c.stroke(); c.setLineDash([]);
      txt(c, 'normal', cx + 6, cy - L * 1.25 + 12, ink3, 10);
      const ai = S.ang * r;
      const ix = cx - Math.sin(ai) * L, iy = cy - Math.cos(ai) * L;
      flecha(c, ix, iy, cx, cy, '#D4AC0D', 2.5);
      txt(c, 'i = ' + eneN(S.ang, 0) + '°', ix - 8, iy - 8, '#B7791F', 12, 'right');
      /* arco del ángulo de incidencia */
      c.strokeStyle = '#B7791F'; c.lineWidth = 1.2;
      c.beginPath(); c.arc(cx, cy, 34, -Math.PI / 2 - ai, -Math.PI / 2, false); c.stroke();
      if (S.modo === 'espejo') {
        const rx = cx + Math.sin(ai) * L, ry = cy - Math.cos(ai) * L;
        flecha(c, cx, cy, rx, ry, '#1E8449', 2.5);
        txt(c, 'r = ' + eneN(S.ang, 0) + '°', rx + 8, ry - 8, '#1E8449', 12);
        c.strokeStyle = '#1E8449'; c.beginPath(); c.arc(cx, cy, 44, -Math.PI / 2, -Math.PI / 2 + ai, false); c.stroke();
        txt(c, 'espejo plano · i = r siempre', W * 0.12, cy + 22, ink3, 11);
        diaTxt.textContent = `Rayo incidente a ${eneN(S.ang, 0)}° de la normal; rayo reflejado a ${eneN(S.ang, 0)}° al otro lado de la normal. Respecto de la superficie del espejo, ambos forman ${eneN(90 - S.ang, 0)}°.`;
      } else if (S.modo === 'refrac') {
        c.fillStyle = 'rgba(52,152,219,.18)'; c.fillRect(W * 0.12, cy, W * 0.76, H - cy - 4);
        txt(c, 'aire · n = 1,00', W * 0.13, cy - 8, ink3, 11);
        txt(c, S.nMedio === 1 ? 'aire · n = 1,00' : (S.nMedio === 1.33 ? 'agua · n = 1,33' : 'vidrio · n = 1,52'), W * 0.13, cy + 16, ink3, 11);
        const sR = Math.sin(ai) / S.nMedio, aR = Math.asin(clamp(sR, -1, 1));
        const tx = cx + Math.sin(aR) * L, ty = cy + Math.cos(aR) * L * 0.85;
        flecha(c, cx, cy, tx, ty, '#2E86C1', 2.5);
        txt(c, 'R = ' + eneN(aR / r, 1) + '°', tx + 6, ty - 4, '#2E86C1', 12);
        c.strokeStyle = '#2E86C1'; c.lineWidth = 1.2;
        c.beginPath(); c.arc(cx, cy, 34, Math.PI / 2 - aR, Math.PI / 2, false); c.stroke();
        /* lápiz que se "quiebra" */
        const px = W * 0.76;
        c.strokeStyle = '#D4AC0D'; c.lineWidth = 5; c.lineCap = 'round';
        c.beginPath(); c.moveTo(px - 30, cy - 46); c.lineTo(px, cy); c.stroke();
        c.beginPath(); c.moveTo(px, cy); c.lineTo(px + 18, cy + 46); c.stroke();
        txt(c, 'el lápiz se ve quebrado', px - 60, cy + 66, ink3, 10);
        diaTxt.textContent = `Ángulo de incidencia ${eneN(S.ang, 0)}° en el aire (n = 1,00); ángulo de refracción ${eneN(aR / r, 1)}° en el segundo medio (n = ${eneN(S.nMedio, 2)}). El rayo se acerca a la normal porque la luz viaja más lento en ese medio.`;
      } else {
        c.fillStyle = 'rgba(200,220,240,.25)'; c.fillRect(W * 0.12, cy, W * 0.76, H - cy - 4);
        const aMid = Math.asin(clamp(Math.sin(ai) / 1.5225, -1, 1));
        ENE_NCOL.forEach((co, i) => {
          const aR = Math.asin(clamp(Math.sin(ai) / co.idx, -1, 1));
          /* el dibujo abre el abanico para que se distinga; los ángulos escritos son los reales */
          const aV = aMid + (i - 2.5) * 0.075;
          const tx = cx + Math.sin(aV) * L, ty = cy + Math.cos(aV) * L * 0.9;
          flecha(c, cx, cy, tx, ty, co.col, 2);
          txt(c, co.n + ' · ' + eneN(aR / r, 2) + '°', W * 0.70, cy + 26 + i * 15, co.col, 11);
        });
        txt(c, 'vidrio del prisma · el abanico del dibujo está exagerado para que se distinga', W * 0.13, H - 8, ink3, 10);
        diaTxt.textContent = `Con i = ${eneN(S.ang, 0)}°, cada color se refracta un ángulo distinto: violeta ${eneN(Math.asin(clamp(Math.sin(ai) / 1.532, -1, 1)) / r, 2)}° y rojo ${eneN(Math.asin(clamp(Math.sin(ai) / 1.513, -1, 1)) / r, 2)}°. Esa diferencia, repetida en las dos caras del prisma, separa la luz blanca en el abanico de colores.`;
      }
    } else if (S.modo === 'color') {
      const luzC = S.filtro === 'ninguno' ? ['rojo', 'verde', 'azul'] : [S.filtro];
      const HEX = { rojo:'#C0392B', verde:'#1E8449', azul:'#2E6FD4' };
      const y0 = H * 0.30;
      c.fillStyle = '#FFF4CC'; c.beginPath(); c.arc(W * 0.10, y0 + 34, 16, 0, Math.PI * 2); c.fill();
      txt(c, 'lámpara', W * 0.10, y0 + 66, ink3, 10, 'center');
      ['rojo', 'verde', 'azul'].forEach((cc, i) => {
        const yy = y0 + i * 34;
        flecha(c, W * 0.14, yy, W * 0.32, yy, HEX[cc], 3);
      });
      /* filtro */
      if (S.filtro !== 'ninguno') {
        c.fillStyle = HEX[S.filtro]; c.globalAlpha = 0.5; c.fillRect(W * 0.32, y0 - 16, 14, 100); c.globalAlpha = 1;
        c.strokeStyle = ink3; c.strokeRect(W * 0.32, y0 - 16, 14, 100);
        txt(c, 'filtro ' + S.filtro, W * 0.34, y0 - 24, ink3, 10, 'center');
      }
      ['rojo', 'verde', 'azul'].forEach((cc, i) => {
        const yy = y0 + i * 34;
        if (luzC.indexOf(cc) >= 0) flecha(c, W * 0.36, yy, W * 0.56, yy, HEX[cc], 3);
        else { txt(c, '✗ absorbido', W * 0.38, yy + 4, ink3, 10); }
      });
      /* objeto */
      const OBJ = { rojo:'#C0392B', verde:'#1E8449', blanco:'#F2F2F2', negro:'#22262A' };
      c.fillStyle = OBJ[S.objeto]; c.fillRect(W * 0.56, y0 - 16, 46, 100);
      c.strokeStyle = ink3; c.strokeRect(W * 0.56, y0 - 16, 46, 100);
      txt(c, 'objeto ' + S.objeto, W * 0.56 + 23, y0 + 100, ink3, 10, 'center');
      const refleja = { rojo:['rojo'], verde:['verde'], blanco:['rojo', 'verde', 'azul'], negro:[] }[S.objeto];
      const salen = luzC.filter(x => refleja.indexOf(x) >= 0);
      ['rojo', 'verde', 'azul'].forEach((cc, i) => {
        const yy = y0 + i * 34;
        if (salen.indexOf(cc) >= 0) flecha(c, W * 0.64, yy, W * 0.86, yy, HEX[cc], 3);
        else if (luzC.indexOf(cc) >= 0) txt(c, '✗ absorbido por el objeto', W * 0.64, yy + 4, ink3, 10);
      });
      txt(c, '👁 lo que ves: ' + (salen.length === 3 ? 'blanco' : salen.length ? salen.join(' + ') : 'negro'), W * 0.86, y0 + 110, ink, 12, 'right');
      diaTxt.textContent = `Llega al objeto: ${luzC.join(', ')}. El objeto ${S.objeto} refleja ${refleja.length ? refleja.join(', ') : 'nada'} y absorbe el resto. Sale hacia tus ojos: ${salen.length ? salen.join(' + ') : 'nada, por eso se ve negro'}.`;
    } else {
      const a = S.distObj, b = S.distPant, O = S.anchoObj, F = S.fuenteW;
      const esc = (W * 0.56) / (a + b);
      const x0 = W * 0.10, xo = x0 + a * esc, xp = xo + b * esc, cy2 = H * 0.5;
      const pxm = (H * 0.30) / 0.30;   // 0,30 m de alto útil
      /* fuente */
      c.strokeStyle = '#D4AC0D'; c.lineWidth = 4;
      c.beginPath(); c.moveTo(x0, cy2 - F * pxm / 2); c.lineTo(x0, cy2 + F * pxm / 2 + 1); c.stroke();
      txt(c, 'fuente ' + eneN(F * 100, 1) + ' cm', x0, cy2 - F * pxm / 2 - 10, ink3, 10, 'center');
      /* objeto */
      c.fillStyle = cssVar('--ink') || '#222';
      c.fillRect(xo - 4, cy2 - O * pxm / 2, 8, O * pxm);
      txt(c, 'objeto ' + eneN(O * 100, 1) + ' cm', xo, cy2 + O * pxm / 2 + 16, ink3, 10, 'center');
      /* pantalla */
      c.strokeStyle = ink3; c.lineWidth = 3;
      c.beginPath(); c.moveTo(xp, 16); c.lineTo(xp, H - 16); c.stroke();
      const umbra = O * (a + b) / a - F * b / a;
      const penum = O * (a + b) / a + F * b / a;
      if (penum > 0) {
        c.fillStyle = 'rgba(120,120,120,.35)';
        c.fillRect(xp + 2, cy2 - penum * pxm / 2, 16, penum * pxm);
      }
      if (umbra > 0) {
        c.fillStyle = 'rgba(20,20,20,.8)';
        c.fillRect(xp + 2, cy2 - umbra * pxm / 2, 16, umbra * pxm);
      }
      /* rayos desde los bordes de la fuente */
      [-1, 1].forEach(sgn => {
        const fy = cy2 + sgn * F * pxm / 2;
        [-1, 1].forEach(s2 => {
          const oy = cy2 + s2 * O * pxm / 2;
          const k = (xp - x0) / (xo - x0);
          c.strokeStyle = 'rgba(212,172,13,.6)'; c.lineWidth = 1;
          c.beginPath(); c.moveTo(x0, fy); c.lineTo(x0 + (xp - x0), fy + (oy - fy) * k); c.stroke();
        });
      });
      txt(c, 'umbra ' + (umbra > 0 ? eneN(umbra * 100, 1) + ' cm' : 'no hay'), xp + 24, cy2 - 6, ink, 11);
      txt(c, 'con penumbra ' + eneN(penum * 100, 1) + ' cm', xp + 24, cy2 + 10, ink3, 11);
      txt(c, 'd₁ = ' + eneN(a, 2) + ' m', (x0 + xo) / 2, H - 10, ink3, 10, 'center');
      txt(c, 'd₂ = ' + eneN(b, 2) + ' m', (xo + xp) / 2, H - 10, ink3, 10, 'center');
      diaTxt.textContent = `Fuente de ${eneN(F * 100, 1)} cm a ${eneN(a, 2)} m del objeto (${eneN(O * 100, 1)} cm) y pantalla a ${eneN(b, 2)} m. Umbra: ${umbra > 0 ? eneN(umbra * 100, 1) + ' cm' : 'no hay umbra, toda la sombra es penumbra'}. Sombra total con penumbra: ${eneN(penum * 100, 1)} cm.`;
    }
  }

  function pintarSonido(c, W, H){
    const me = medio(), L = nivelDb();
    const ink3 = cssVar('--ink-3') || '#888';
    const cy = H * 0.46, x0 = W * 0.16, x1 = W * 0.80;
    /* parlante */
    c.fillStyle = '#2C3E50'; c.fillRect(x0 - 40, cy - 28, 26, 56);
    c.fillStyle = '#9AA7B4'; c.beginPath(); c.moveTo(x0 - 14, cy - 20); c.lineTo(x0, cy - 12); c.lineTo(x0, cy + 12); c.lineTo(x0 - 14, cy + 20); c.closePath(); c.fill();
    txt(c, 'fuente que vibra', x0 - 26, cy + 42, ink3, 10, 'center');
    /* pared */
    c.fillStyle = '#B98A56'; c.fillRect(x1, cy - 70, 16, 140);
    txt(c, pared().n, x1 + 8, cy + 86, ink3, 10, 'center');
    txt(c, 'α = ' + eneN(pared().a, 2), x1 + 8, cy + 98, ink3, 10, 'center');
    if (!me.v) {
      c.setLineDash([6, 5]); c.strokeStyle = ink3; c.lineWidth = 2;
      c.beginPath(); c.moveTo(x0, cy); c.lineTo(x1, cy); c.stroke(); c.setLineDash([]);
      txt(c, 'VACÍO: no hay partículas, no hay onda', (x0 + x1) / 2, cy - 30, '#C0392B', 14, 'center');
      txt(c, 'La luz sí pasa; el sonido no.', (x0 + x1) / 2, cy - 12, ink3, 11, 'center');
      diaTxt.textContent = 'Medio: vacío. El sonido no se propaga: no hay partículas que vibren. Nivel en la fuente ' + eneN(L, 1) + ' dB, pero no llega nada al oyente.';
      return;
    }
    /* onda */
    const A = S.amp / 100 * (H * 0.30);
    const ciclos = clamp(S.frec / 260, 1, 26);
    c.strokeStyle = '#1E8449'; c.lineWidth = 2.2; c.beginPath();
    for (let x = x0; x <= x1; x += 2) {
      const u = (x - x0) / (x1 - x0);
      const y = cy - A * Math.sin(u * ciclos * Math.PI * 2 - (eneMotion() ? tAcum * 4 : 0));
      if (x === x0) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.stroke();
    /* eje y medidas */
    c.strokeStyle = ink3; c.lineWidth = 1; c.setLineDash([3, 4]);
    c.beginPath(); c.moveTo(x0, cy); c.lineTo(x1, cy); c.stroke(); c.setLineDash([]);
    const lamPx = (x1 - x0) / ciclos;
    c.strokeStyle = '#2E86C1'; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(x0 + 10, cy + H * 0.34); c.lineTo(x0 + 10 + lamPx, cy + H * 0.34); c.stroke();
    txt(c, 'λ = ' + eneN(me.v / S.frec, 3) + ' m', x0 + 12 + lamPx / 2, cy + H * 0.34 - 6, '#2E86C1', 11, 'center');
    c.strokeStyle = '#C0392B'; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(x0 + 6, cy); c.lineTo(x0 + 6, cy - A); c.stroke();
    txt(c, 'amplitud', x0 + 12, cy - A / 2, '#C0392B', 10);
    txt(c, `${eneMil(S.frec, 0)} Hz · ${eneN(L, 1)} dB · v = ${eneMil(me.v, 0)} m/s en ${me.n.toLowerCase()}`, W * 0.5, 20, cssVar('--ink'), 12, 'center');
    /* eco */
    const tEco = 2 * S.dPared / me.v;
    flecha(c, x1 - 60, 42, x1 - 8, 42, '#B7791F', 2);
    flecha(c, x1 - 8, 56, x1 - 60, 56, '#B7791F', 2);
    txt(c, 'eco a los ' + eneN(tEco, 3) + ' s · pared a ' + eneN(S.dPared, 0) + ' m', x0, H - 8, '#B7791F', 11);
    diaTxt.textContent = `Onda de ${eneMil(S.frec, 0)} Hz y amplitud ${eneN(S.amp, 0)} u.a. (${eneN(L, 1)} dB) en ${me.n.toLowerCase()}: v = ${eneMil(me.v, 0)} m/s y λ = ${eneN(me.v / S.frec, 3)} m. El eco desde una pared a ${eneN(S.dPared, 0)} m regresa en ${eneN(tEco, 3)} s.`;
  }

  /* =====================================================================
     CAMBIO DE ESTACIÓN Y ARRANQUE
     ===================================================================== */
  function setEst(id){
    S.est = id;
    segBtns.forEach((b, i) => b.setAttribute('aria-selected', String(EST[i].id === id)));
    pCalor.style.display = id === 'calor' ? '' : 'none';
    pLuz.style.display = id === 'luz' ? '' : 'none';
    pSon.style.display = id === 'sonido' ? '' : 'none';
    wCalor.style.display = id === 'calor' ? '' : 'none';
    wLuz.style.display = id === 'luz' ? '' : 'none';
    wSon.style.display = id === 'sonido' ? '' : 'none';
    hudPhase.textContent = id === 'calor' ? 'Estación de calor y temperatura' : id === 'luz' ? 'Estación de luz' : 'Estación de sonido';
    hudNote.textContent = id === 'calor' ? 'Vasos, varillas, olla y lámpara' : id === 'luz' ? 'Banco óptico: fuente, espejo, tanque, prisma y pantalla' : 'Parlante, onda visible y pared reflectante';
    if (E) { const v = ENE_VISTA[id]; E.focus(new THREE.Vector3(v.t[0], v.t[1], v.t[2]), eneR(v.r)); E.goal.phi = v.phi; E.goal.theta = v.th; }
    Store.log('lab_energia', { accion:'estacion', estacion:id });
    if (id === 'calor') actualizarCalor();
    else if (id === 'luz') refrescarLuz();
    else actualizarSonido();
    dibujarEsquema();
  }

  const onResize = () => { dibujarAislamiento(); dibujarEsquema(); };
  window.addEventListener('resize', onResize);

  dibujarAislamiento();
  actualizarCalor();
  refrescarLuz();
  actualizarSonido();
  setEst('calor');
  revisarReto();

  return { unmount(){
    if (raf2) cancelAnimationFrame(raf2);
    window.removeEventListener('resize', onResize);
    E && E.dispose();
  } };
});
</script>
