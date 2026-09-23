<style>
/* ===== Misiones del mundo celular (prefijo mis2-) ===== */
.mis2-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
.mis2-steps{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:4px}
.mis2-steps span{font-size:.7rem;font-weight:700;padding:3px 9px;border-radius:999px;border:1px solid var(--line-2);background:var(--bg-2);color:var(--ink-3)}
.mis2-steps span.now{background:var(--mis,var(--accent));border-color:var(--mis,var(--accent));color:#fff}
.mis2-steps span.done{border-color:var(--ok);color:var(--ok)}
.mis2-ev{display:flex;flex-direction:column;gap:6px;list-style:none;margin:0;padding:0}
.mis2-ev li{border:1px solid var(--line);border-radius:10px;padding:8px 10px;background:var(--bg-2);font-size:.82rem;line-height:1.4}
.mis2-ev li.pend{opacity:.55;border-style:dashed}
.mis2-ev li b{display:block;font-size:.76rem;text-transform:uppercase;letter-spacing:.03em;color:var(--ink-3)}
.mis2-ev li .val{font-family:var(--font-m);font-variant-numeric:tabular-nums}
.mis2-org{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.mis2-org button{display:flex;align-items:center;gap:6px;text-align:left;padding:7px 9px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);font-size:.79rem;font-weight:600}
.mis2-org button[data-hit="1"]{border-color:var(--ok)}
.mis2-org button[aria-pressed="true"]{background:var(--cell-soft,var(--accent-soft));border-color:var(--cell,var(--accent))}
.mis2-org .sw{width:11px;height:11px;border-radius:3px;flex:none}
.mis2-pick{display:flex;flex-direction:column;gap:5px}
.mis2-pick label{display:flex;gap:8px;align-items:flex-start;padding:7px 9px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);font-size:.82rem;line-height:1.35}
.mis2-pick label.on{border-color:var(--mis,var(--accent));background:var(--accent-soft,var(--bg-3))}
.mis2-pick input{margin-top:2px;flex:none}
.mis2-lay{display:grid;grid-template-columns:1fr 400px;gap:16px;align-items:start}
@media (max-width:980px){ .mis2-lay{grid-template-columns:1fr} }
.mis2-scope{position:relative;background:#0b0d11;border:1px solid var(--line);border-radius:var(--r-l,14px);overflow:hidden;height:min(70vh,620px);min-height:360px;display:flex}
.mis2-scope canvas{width:100%;height:100%;display:block;touch-action:none;outline:none;cursor:crosshair}
.mis2-scope canvas:focus-visible{outline:2px solid var(--accent);outline-offset:-3px}
.mis2-bar{position:absolute;left:10px;right:10px;display:flex;flex-wrap:wrap;gap:6px;pointer-events:none;z-index:2}
.mis2-bar.top{top:10px} .mis2-bar.bot{bottom:10px}
.mis2-tag{background:rgba(10,12,16,.78);color:#eef2f6;border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:4px 10px;font-size:.73rem;font-family:var(--font-m);font-variant-numeric:tabular-nums}
.mis2-tag b{color:#fff}
.mis2-tag.ok{background:rgba(16,80,50,.85);border-color:rgba(130,230,180,.4)}
.mis2-tag.warn{background:rgba(120,60,10,.88);border-color:rgba(255,190,120,.45)}
.mis2-objs{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
.mis2-objs button{display:flex;flex-direction:column;align-items:center;gap:1px;padding:7px 3px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);font-weight:700;font-size:.86rem;line-height:1.1}
.mis2-objs button .u{font-size:.63rem;font-weight:600;color:var(--ink-3)}
.mis2-objs button[aria-pressed="true"]{background:var(--cell-soft,var(--accent-soft));border-color:var(--cell,var(--accent))}
.mis2-pad{display:grid;grid-template-columns:repeat(3,34px);grid-template-rows:repeat(3,30px);gap:4px}
.mis2-pad button{border:1px solid var(--line-2);border-radius:8px;background:var(--bg-2);font-weight:700}
.mis2-pad button:disabled{visibility:hidden}
.mis2-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.mis2-mini{font-size:.76rem;color:var(--ink-3);font-family:var(--font-m);font-variant-numeric:tabular-nums}
.mis2-note{max-width:min(52%,300px);line-height:1.3}
</style>
<script>
/* =====================================================================
   MISIONES DEL MUNDO CELULAR · Unidad 2
   1) Salva la célula        → #/mision/salva-celula
   2) Diagnóstico celular    → #/mision/diagnostico-celular
   Reutiliza el modelo 3D de la célula (buildCell) y la maquinaria de
   dibujo procedimental del microscopio virtual (micEll, micBlob, micRng,
   micEach, micLod, MIC_TIN, MIC_OBJ).
   ===================================================================== */
try {
  if (typeof BIO !== 'undefined' && BIO.activities)
    Object.assign(BIO.activities, {
      'mision-salva-celula':      { t:'Misión: Salva la célula',       unidad:2, peso:25, xp:120 },
      'mision-diagnostico-celular':{ t:'Misión: Diagnóstico celular',  unidad:2, peso:25, xp:120 }
    });
  if (typeof ACT_HREF !== 'undefined' && ACT_HREF){
    ACT_HREF['mision-salva-celula'] = '#/mision/salva-celula';
    ACT_HREF['mision-diagnostico-celular'] = '#/mision/diagnostico-celular';
  }
  if (typeof BIO !== 'undefined' && Array.isArray(BIO.missions))
    ['salva-celula','diagnostico-celular'].forEach(id => {
      const m = BIO.missions.find(x => x.id === id); if (m) m.disponible = true;
    });
} catch(e){ console.warn('misiones celulares: registro', e); }

/* =====================================================================
   MISIÓN 1 · SALVA LA CÉLULA
   Caso: un fibroblasto en cultivo no produce suficiente energía.
   El estudiante recoge evidencias tocando organelos, descarta sospechosos
   y emite un diagnóstico justificado con las evidencias decisivas.
   ===================================================================== */

/* tipo: 'sintoma' (confirma el problema, no localiza) ·
         'clave'   (señala directamente al organelo que falla) ·
         'consec'  (parece acusar a otro organelo, pero es consecuencia) */
const MIS2_EVIDENCIAS = [
  { id:'atp', org:'citoplasma', tipo:'sintoma',
    t:'Sensor de ATP en el citosol',
    v:'ATP = 2,1 mM · referencia 4,5–5,5 mM',
    d:'La célula dispone de menos de la mitad de la energía que necesita. El problema existe y es grave.',
    nota:'Confirma el problema, pero por sí sola no dice dónde está la falla: cualquier sospechoso encaja.' },
  { id:'piruvato', org:'citoplasma', tipo:'clave',
    t:'Metabolitos del citosol',
    v:'Piruvato = 0,52 mM (ref. 0,05–0,10) · lactato = 8,4 mM (ref. < 2,0) · consumo de glucosa 2,3 veces el normal',
    d:'La glucólisis no solo funciona: está acelerada y el piruvato se acumula sin consumirse; el exceso se desvía a lactato.',
    nota:'Si el piruvato se produce de más y nadie lo consume, el bloqueo está después de la glucólisis, en el organelo que recibe el piruvato.' },
  { id:'oxigeno', org:'mitocondria', tipo:'clave',
    t:'Consumo de oxígeno',
    v:'Consumo de O₂ = 22 % de lo esperado · O₂ disuelto en el medio: normal',
    d:'Hay oxígeno de sobra alrededor de la célula y la célula no lo usa. No es un problema de suministro.',
    nota:'El oxígeno solo se consume al final de la cadena respiratoria. Si sobra oxígeno y no se gasta, la respiración aeróbica está detenida.' },
  { id:'crestas', org:'mitocondria', tipo:'clave',
    t:'Membrana interna mitocondrial',
    v:'Potencial de membrana interna = −62 mV · referencia ≈ −160 mV',
    d:'Al microscopio electrónico las crestas se ven fragmentadas y la membrana interna aparece permeable: el gradiente de protones se escapa.',
    nota:'Sin gradiente de protones la ATP sintasa no puede girar. Es el daño estructural que explica todo lo demás.' },
  { id:'lisosoma', org:'lisosomas', tipo:'consec',
    t:'pH del interior del lisosoma',
    v:'pH = 5,9 · referencia 4,5',
    d:'El lisosoma está poco ácido y digiere a medias. Sin embargo, sus hidrolasas están presentes, completas y en cantidad normal.',
    nota:'La bomba de protones del lisosoma (V-ATPasa) se mueve gastando ATP. Con poco ATP no acidifica: el lisosoma es víctima, no culpable.' },
  { id:'plegado', org:'rer', tipo:'consec',
    t:'Control de calidad del retículo rugoso',
    v:'Proteínas mal plegadas: 4,6 veces lo normal · ARN mensajero, ribosomas y chaperonas: cantidad normal',
    d:'Se acumulan proteínas mal plegadas, pero la maquinaria de síntesis y las chaperonas están intactas y en cantidad correcta.',
    nota:'Las chaperonas plegadoras consumen ATP en cada ciclo de plegamiento. Con ATP bajo se pliega mal aunque el retículo esté sano.' }
];

/* respuestas de la sonda en organelos donde no hay nada anómalo: también son información */
const MIS2_SONDA_LIMPIA = {
  nucleo:'Sonda en el núcleo: cromatina normal, sin roturas del ADN. La transcripción de los genes mitocondriales y nucleares es normal. Aquí no hay avería.',
  nucleolo:'Sonda en el nucléolo: ensamblaje de subunidades ribosómicas dentro de lo esperado. Aquí no hay avería.',
  ribosomas:'Sonda en los ribosomas libres: velocidad de traducción normal (≈ 5 aminoácidos por segundo) y polirribosomas bien formados. Aquí no hay avería.',
  golgi:'Sonda en el Golgi: cisternas bien apiladas y enzimas de glucosilación normales. Salen menos vesículas, pero el Golgi trabaja con lo que le llega. Aquí no hay avería propia.',
  rel:'Sonda en el retículo liso: síntesis de lípidos y reserva de calcio normales. Aquí no hay avería.',
  membrana:'Sonda en la membrana plasmática: bicapa íntegra, sin fugas. Los transportadores de glucosa incluso trabajan más de lo normal. Aquí no hay avería.',
  centriolos:'Sonda en los centríolos: estructura 9×3 intacta. La célula no está dividiéndose, así que no intervienen en este caso.'
};

const MIS2_SOSPECHOSOS = [
  { id:'mitocondria', ok:true },
  { id:'lisosomas', fb:'El lisosoma está alterado, es cierto: su pH subió de 4,5 a 5,9. Pero sus enzimas están completas y en cantidad normal, y un lisosoma poco ácido no explica ni el piruvato acumulado ni el oxígeno sin consumir. Además, la bomba que acidifica el lisosoma funciona con ATP: lo que ves es el efecto de la falta de energía, no su causa.' },
  { id:'rer', fb:'El retículo rugoso acumula proteínas mal plegadas, pero su maquinaria está intacta: ARN mensajero, ribosomas y chaperonas en cantidad normal. Las chaperonas gastan ATP para plegar; sin ATP, pliegan mal aunque estén sanas. Es una consecuencia, no la causa. Y un retículo averiado no elevaría el piruvato del citosol.' },
  { id:'golgi', fb:'El Golgi envía menos vesículas, pero sus cisternas y sus enzimas están normales: solo procesa menos porque le llega menos. El Golgi no participa en la producción de ATP ni en el consumo de piruvato, así que no puede explicar las evidencias centrales.' },
  { id:'ribosomas', fb:'Los ribosomas traducen a velocidad normal y forman polirribosomas correctos. Los ribosomas no producen ATP: lo gastan. Si fallaran, verías proteínas nuevas escasas, no piruvato acumulado con oxígeno sin consumir.' },
  { id:'nucleo', fb:'El núcleo está intacto: cromatina normal y transcripción normal. Si el problema fuera genético verías falta de alguna proteína; aquí las proteínas están presentes y lo que falta es la energía para hacerlas funcionar.' }
];

route('/mision/salva-celula', (view) => {
  const S = Object.fromEntries(BIO.cell.structures.map(s => [s.id, s]));
  const ACT = 'mision-salva-celula';
  const PASOS = ['Caso','Evidencias','Razonamiento','Diagnóstico','Veredicto'];
  view.classList.add('wide');
  view.append(h('div',{class:'page-head mis2-head',style:'margin-bottom:14px'},
    h('div',{}, h('span',{class:'eyebrow mis'},'Misión biológica · Unidad 2 · Mundo celular'),
      h('h1',{},'Salva la célula'),
      h('p',{},'Un fibroblasto en cultivo dejó de producir energía suficiente. Tienes una sonda molecular para medir dentro de cada organelo: recoge las evidencias, descarta a los sospechosos que no encajan y emite un diagnóstico que puedas sostener.')),
    h('span',{class:'pill mis'},'+120 XP · 12 min')));
  view.append(purposeBanner({
    proposito:'Relacionar la función de cada organelo con las pruebas que deja al fallar, y distinguir la causa de sus consecuencias.',
    observa:['Qué mide la sonda en cada organelo y qué valores están fuera de la referencia',
             'Qué evidencias apuntan a un organelo y cuáles encajarían con varios',
             'Qué organelos parecen averiados pero solo están sufriendo la falta de ATP'],
    reto:'Acusa a un organelo y sostén la acusación con las tres evidencias que de verdad la demuestran, no con las que solo describen el problema.',
    done: !!Store.s.activities[ACT]?.done }));

  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'mission'}, stage, panel));

  let E = null, M = null;
  let paso = 0, errores = 0, score = 0, acusado = null, veredictoDado = false;
  const halladas = new Set();
  const justif = new Set();
  const startAt = Date.now();
  const total = 3;

  if (webglOK){
    try {
      /* encuadre: en pantallas angostas la cámara se aleja para que la célula entre completa */
      const ancho = stage.clientWidth || window.innerWidth, estrecho = ancho < 600;
      E = new Engine3D(stage, { radius: estrecho ? 15.5 : 11.6, phi:1.25, theta:0.4, minR:3, maxR:22, floor:-3.35, floorSize:9, target:[0,-0.45,0],
        onSelect:(id) => { if (id) sonda(id, 'modelo'); } });
      M = buildCell(E); E.setOpacity('membrana', 0.34);
    } catch(e){ console.warn('salva-celula: 3D', e); E = null; }
  }
  if (!E) stage.append(h('div',{class:'ph',style:'margin:60px 24px'},'WebGL no disponible. Usa la lista de organelos del panel para colocar la sonda: la misión se resuelve igual.'));
  stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note mis2-note'},'Modelo simplificado con fines educativos · datos del caso ficticios pero realistas')));

  const pasosEl = h('div',{class:'mis2-steps'});
  const body = h('div',{class:'stack'});
  const vivo = h('div',{class:'small muted','aria-live':'polite',style:'min-height:1em'});
  panel.append(h('div',{class:'card stack'}, pasosEl, body, vivo));

  function renderPasos(){
    pasosEl.innerHTML = '';
    PASOS.forEach((n,i) => pasosEl.append(h('span',{class: i < paso ? 'done' : i === paso ? 'now' : ''}, n)));
  }
  function decir(t){ vivo.textContent = t; }

  /* --- sonda sobre un organelo --- */
  function sonda(id, origen){
    if (paso !== 1){ if (paso < 1) toast('Primero lee el caso y pulsa “Empezar la inspección”.'); return; }
    E && E.select(id);
    const ev = MIS2_EVIDENCIAS.find(e => e.org === id && !halladas.has(e.id));
    if (ev){
      halladas.add(ev.id);
      Store.log('evidencia',{ mision:'salva-celula', evidencia:ev.id, organelo:id, origen });
      toast(`Evidencia registrada: ${ev.t}.`);
      decir(`${ev.t}. ${ev.v}. ${ev.d}`);
      render(); return;
    }
    const otra = MIS2_EVIDENCIAS.find(e => e.org === id);
    if (otra){ decir(`Ya registraste todas las medidas de ${S[id].nombre.toLowerCase()}. Prueba en otro organelo.`); toast('Ya tomaste esa medida.'); return; }
    const txt = MIS2_SONDA_LIMPIA[id] || `Sonda en ${S[id].nombre.toLowerCase()}: sin valores fuera de referencia.`;
    decir(txt); toast('Sin anomalías aquí. Descartar también es avanzar.', 4200);
    Store.log('evidencia',{ mision:'salva-celula', organelo:id, resultado:'sin_anomalia', origen });
    render();
  }

  function listaOrganelos(){
    const box = h('div',{class:'mis2-org'});
    BIO.cell.structures.forEach(s => {
      const pend = MIS2_EVIDENCIAS.some(e => e.org === s.id && !halladas.has(e.id));
      const hecho = MIS2_EVIDENCIAS.some(e => e.org === s.id && halladas.has(e.id));
      box.append(h('button',{ 'data-hit': hecho ? '1' : '0',
        'aria-label':`Colocar la sonda en ${s.nombre}${pend?'':' (ya inspeccionado)'}`,
        onclick:() => sonda(s.id,'lista') },
        h('span',{class:'sw',style:`background:${s.color}`}), s.nombre, hecho ? h('span',{class:'small',style:'margin-left:auto;color:var(--ok)'},'✓') : null));
    });
    return box;
  }
  function listaEvidencias(interactiva){
    const ul = h('ul',{class:'mis2-ev'});
    MIS2_EVIDENCIAS.forEach(e => {
      if (!halladas.has(e.id)){ if (!interactiva) ul.append(h('li',{class:'pend'}, h('b',{},'Evidencia sin recoger'), 'Coloca la sonda en los organelos para revelarla.')); return; }
      ul.append(h('li',{}, h('b',{},`${e.t} · ${S[e.org].nombre}`), h('span',{class:'val'},e.v), h('div',{},e.d)));
    });
    return ul;
  }

  /* --- pasos --- */
  function render(){
    renderPasos(); body.innerHTML = '';
    if (paso === 0) return pasoCaso();
    if (paso === 1) return pasoEvidencias();
    if (paso === 2) return pasoRazonamiento();
    if (paso === 3) return pasoDiagnostico();
    return pasoVeredicto();
  }

  function pasoCaso(){
    body.append(
      h('span',{class:'eyebrow mis'},'Paso 1 de 5 · El caso'),
      h('h3',{},'Fibroblasto 7-B, cultivo del laboratorio'),
      h('p',{style:'font-size:.92rem'},'La célula sigue viva y sigue tomando glucosa del medio —de hecho, toma más glucosa que sus vecinas—, pero se mueve poco, no se divide y el medio de cultivo se acidifica muy rápido. Las mediciones de energía están por el suelo.'),
      h('div',{class:'notice info'}, h('span',{}, h('b',{},'Tu tarea: '),'averiguar qué organelo está fallando. Tienes una sonda molecular que mide dentro de cualquier organelo. Cada medida cuenta: seis de ellas darán valores fuera de referencia.')),
      h('p',{class:'small muted'},'Recuerda antes de empezar: la glucólisis ocurre en el citosol y produce piruvato; el piruvato entra a la mitocondria, donde el ciclo de Krebs y la cadena respiratoria consumen oxígeno y fabrican la mayor parte del ATP.'),
      h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ paso = 1; render(); decir('Inspección iniciada. Coloca la sonda en un organelo.'); }},'Empezar la inspección →'));
  }

  function pasoEvidencias(){
    const n = halladas.size;
    body.append(
      h('div',{class:'row',style:'justify-content:space-between'},
        h('span',{class:'eyebrow mis'},'Paso 2 de 5 · Recoger evidencias'),
        h('span',{class:'mono small muted'},`${n}/${MIS2_EVIDENCIAS.length} evidencias`)),
      h('p',{style:'font-size:.9rem'},'Haz clic sobre un organelo en el modelo 3D o elige uno de la lista para colocar la sonda. Donde no haya nada anómalo, la sonda te lo dirá: eso también sirve para descartar.'),
      listaOrganelos(),
      h('span',{class:'eyebrow',style:'margin-top:6px'},'Informe de evidencias'),
      listaEvidencias(false));
    if (n >= MIS2_EVIDENCIAS.length)
      body.append(h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ paso = 2; render(); }},'Tengo todas las evidencias →'));
    else
      body.append(h('div',{class:'notice'},`Faltan ${MIS2_EVIDENCIAS.length-n} evidencias. Las medidas anómalas están repartidas en cuatro organelos.`));
  }

  function pasoRazonamiento(){
    body.append(h('span',{class:'eyebrow mis'},'Paso 3 de 5 · Razonar con las evidencias'),
      h('p',{style:'font-size:.9rem'},'Antes de acusar a nadie, ordena el razonamiento. Dos preguntas.'));
    const q2box = h('div',{class:'stack',style:'display:none'});
    const sig = h('button',{class:'btn primary',style:'align-self:flex-start;display:none',onclick:()=>{ paso = 3; render(); }},'Ir al diagnóstico →');
    body.append(quizBlock({
      q:'La glucólisis consume 2,3 veces más glucosa de lo normal y el piruvato se acumula en el citosol. ¿Qué te dice eso?',
      ops:['Que la glucólisis está averiada y produce piruvato defectuoso',
           'Que el bloqueo está después de la glucólisis: el piruvato se fabrica pero nadie lo consume',
           'Que a la célula le falta oxígeno en el medio de cultivo'],
      ok:1,
      fb:'El citosol hace su parte y de sobra. El piruvato se acumula porque el organelo que debía recibirlo y oxidarlo no lo está haciendo; por eso el exceso se desvía a lactato y acidifica el medio.',
      wrong:['Si la glucólisis estuviera averiada, habría menos piruvato, no más. Fíjate en que el piruvato está seis veces por encima de la referencia.',
             'La evidencia del consumo de oxígeno dice justo lo contrario: el O₂ disuelto en el medio es normal y la célula solo usa el 22 %. Hay oxígeno y no se gasta.']
    }, (intentos) => { errores += intentos - 1; if (intentos === 1) score++; q2box.style.display = ''; }));
    body.append(q2box);
    q2box.append(quizBlock({
      q:'El lisosoma tiene pH 5,9 en lugar de 4,5 y el retículo rugoso acumula proteínas mal plegadas. ¿Cómo interpretas esas dos evidencias?',
      ops:['Son dos averías independientes: hay tres organelos rotos a la vez',
           'Son consecuencias de la falta de ATP: acidificar el lisosoma y plegar proteínas son procesos que gastan ATP',
           'Son errores de medición y conviene ignorarlas'],
      ok:1,
      fb:'La bomba de protones del lisosoma y las chaperonas del retículo funcionan gastando ATP. Con el ATP a la mitad, ambos trabajan a medias aunque estén estructuralmente intactos: por eso sus enzimas aparecen completas y en cantidad normal.',
      wrong:['Es improbable y, sobre todo, innecesario: una sola causa —la falta de ATP— explica las dos observaciones. Fíjate en que en ambos casos las enzimas están completas y en cantidad normal.',
             'No son errores: son datos reales y útiles. Lo que hay que decidir es si son la causa o el efecto del problema.']
    }, (intentos) => { errores += intentos - 1; if (intentos === 1) score++; sig.style.display = ''; sig.focus(); }));
    body.append(sig);
  }

  function pasoDiagnostico(){
    body.append(h('span',{class:'eyebrow mis'},'Paso 4 de 5 · Tu diagnóstico'),
      h('p',{style:'font-weight:600'},'1. ¿Qué organelo está fallando?'));
    const fb = h('div',{class:'notice',style:'display:none'});
    const just = h('div',{class:'stack',style:'display:none'});
    const opts = h('div',{class:'stack'});
    MIS2_SOSPECHOSOS.forEach((sp,i) => opts.append(h('button',{class:'opt',onclick:function(){
      if (acusado) return;
      if (sp.ok){
        acusado = sp.id; this.classList.add('ok');
        fb.className = 'notice ok'; fb.innerHTML = '<b>Acusación registrada: la mitocondria.</b> Ahora debes sostenerla con las evidencias.';
        fb.style.display = 'flex'; E && E.select('mitocondria'); just.style.display = '';
      } else {
        errores++; this.classList.add('bad');
        fb.className = 'notice warn'; fb.innerHTML = `<b>Aún no.</b> ${esc(sp.fb)}`; fb.style.display = 'flex';
      }
      Store.log('respuesta',{ pregunta:'acusacion-organelo', opcion:sp.id, correcto:!!sp.ok });
    }}, h('span',{class:'k'},String.fromCharCode(65+i)), S[sp.id].nombre)));
    body.append(opts, fb, just);

    just.append(h('p',{style:'font-weight:600;margin-top:6px'},'2. Justifica: elige las TRES evidencias que demuestran que la falla está en la mitocondria.'),
      h('p',{class:'small muted'},'No todas las evidencias sirven como prueba: algunas solo describen el problema y otras son consecuencias de él.'));
    const pick = h('div',{class:'mis2-pick'});
    const cuenta = h('div',{class:'small muted'},'0 de 3 seleccionadas');
    MIS2_EVIDENCIAS.forEach(e => {
      const cb = h('input',{type:'checkbox','aria-label':`${e.t}: ${e.v}`});
      const lab = h('label',{}, cb, h('span',{}, h('b',{},`${e.t} · ${S[e.org].nombre}`), h('br'), h('span',{class:'small'},e.v)));
      cb.addEventListener('change',()=>{
        if (cb.checked && justif.size >= 3){ cb.checked = false; toast('Solo tres evidencias: elige las decisivas.'); return; }
        cb.checked ? justif.add(e.id) : justif.delete(e.id);
        lab.classList.toggle('on', cb.checked);
        cuenta.textContent = `${justif.size} de 3 seleccionadas`;
      });
      pick.append(lab);
    });
    just.append(pick, cuenta, h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{
      if (justif.size !== 3) return toast('Debes elegir exactamente tres evidencias.');
      paso = 4; render();
    }},'Emitir el diagnóstico →'));
  }

  function pasoVeredicto(){
    const claves = MIS2_EVIDENCIAS.filter(e => e.tipo === 'clave').map(e => e.id);
    const buenas = [...justif].filter(id => claves.includes(id));
    const consec = [...justif].filter(id => MIS2_EVIDENCIAS.find(e => e.id === id).tipo === 'consec');
    const sintomas = [...justif].filter(id => MIS2_EVIDENCIAS.find(e => e.id === id).tipo === 'sintoma');
    const solida = buenas.length === 3;
    if (solida && !veredictoDado) score++;
    const nombre = id => { const e = MIS2_EVIDENCIAS.find(x => x.id === id); return `${e.t} (${S[e.org].nombre})`; };

    body.append(h('span',{class:'eyebrow mis'},'Paso 5 de 5 · Veredicto'),
      h('h3',{},'La mitocondria: membrana interna permeable'),
      h('div',{class:'notice '+(solida?'ok':'warn')}, h('span',{},
        solida
          ? h('span',{}, h('b',{},'Diagnóstico sostenido. '),'Elegiste las tres evidencias decisivas: el piruvato acumulado con la glucólisis acelerada, el oxígeno disponible que no se consume y el potencial de membrana interna caído de −160 mV a −62 mV. Las tres, juntas, localizan la avería en la mitocondria y en ningún otro sitio.')
          : h('span',{}, h('b',{},'Acertaste el organelo, pero la justificación no se sostiene del todo. '),
              'Las tres evidencias decisivas eran: el piruvato acumulado con la glucólisis acelerada, el oxígeno disponible sin consumir y el potencial de membrana interna caído. '
              + (consec.length ? `Usaste como prueba ${consec.map(nombre).join(' y ')}: eso es una consecuencia de la falta de ATP, no una prueba de dónde está la avería. ` : '')
              + (sintomas.length ? 'Usaste el ATP bajo del citosol: confirma que hay un problema, pero encaja con cualquier sospechoso, así que no demuestra nada por sí solo. ' : '')))));

    body.append(h('div',{class:'card stack',style:'padding:14px'},
      h('b',{},'Qué estaba pasando'),
      h('p',{class:'small'},'La membrana interna de la mitocondria perdió su impermeabilidad a los protones. La cadena respiratoria bombea protones al espacio intermembrana, pero se filtran de vuelta sin pasar por la ATP sintasa: el gradiente se disipa como calor y la ATP sintasa casi no gira. Como el ciclo de Krebs se frena por acumulación de NADH, el piruvato no entra y se acumula en el citosol; la célula compensa acelerando la glucólisis (efecto Pasteur) y desviando el piruvato a lactato, que acidifica el medio. Todo lo demás —el lisosoma poco ácido, las proteínas mal plegadas, la secreción reducida— son organelos sanos que no pueden pagar el ATP que su trabajo cuesta.'),
      h('p',{class:'small muted'},'Este mecanismo existe de verdad: las proteínas desacoplantes (UCP1) del tejido adiposo pardo hacen exactamente esto a propósito, para generar calor en vez de ATP. Algunos tóxicos, como el 2,4-dinitrofenol, lo provocan de forma descontrolada y resultan mortales.')));

    if (!veredictoDado){
      veredictoDado = true;
      const min = Math.max(1, Math.round((Date.now()-startAt)/60000));
      const first = !Store.s.activities[ACT]?.done;
      Store.addNote('conclusion', `Misión Salva la célula: organelo acusado = mitocondria (membrana interna permeable). Evidencias usadas: ${[...justif].map(nombre).join('; ')}.`);
      Store.completeActivity(ACT, { score:`${score}/${total}`, attempts:errores, duracionMin:min });
      Store.log('mision_completada',{ mision:'salva-celula', score, errores });
      body.append(h('div',{class:'notice ok'}, h('span',{}, h('b',{},`Misión completada · ${score}/${total} · ${errores === 1 ? '1 error' : errores + ' errores'}.`), first ? ' Has ganado 120 XP.' : '')));
    } else {
      body.append(h('div',{class:'notice ok'},`Misión completada · ${score}/${total}.`));
    }
    body.append(h('div',{class:'row'},
      h('a',{class:'btn primary',href:'#/mision/diagnostico-celular'},'Siguiente misión: Diagnóstico celular'),
      h('a',{class:'btn',href:'#/explorar/celula?s=mitocondria&accion=1'},'Ver la mitocondria en acción'),
      h('a',{class:'btn ghost',href:'#/progreso'},'Ver mi progreso')));
  }

  render();
  return { unmount(){ E && E.dispose(); } };
});

/* =====================================================================
   MISIÓN 2 · DIAGNÓSTICO CELULAR
   Cuatro casos clínicos reales observados al microscopio virtual.
   Las muestras se dibujan de forma procedimental con las mismas
   utilidades del microscopio (micEll, micBlob, micRng, micEach, micLod).
   ===================================================================== */

/* eritrocito en forma de hoz (drepanocito): rígido, más oscuro, sin palidez central */
function mis2Hoz(c, g, x, y, r, rot, v){
  const k = v & 3, cur = 1.25 + 0.12*k, gro = 0.3 + 0.05*((k+1)&3);
  const spr = micSpr(g, 'hoz', k, r*3.8, (cc, rr) => { const R0 = rr/1.9;
    cc.beginPath(); cc.moveTo(-R0*1.7, 0);
    cc.quadraticCurveTo(0, -R0*cur*1.2, R0*1.7, 0);
    cc.quadraticCurveTo(0, -R0*gro, -R0*1.7, 0); cc.closePath();
    cc.fillStyle = micGrad(cc, -R0*0.3, -R0*0.55, 0, 0, -R0*0.3, R0*1.8, [[0, [214,118,120,1]], [0.6, [190,84,92,1]], [1, [160,64,74,1]]]); cc.fill();
    cc.lineWidth = Math.max(0.2, R0*0.1); cc.strokeStyle = 'rgba(120,40,52,.6)'; cc.stroke(); }, 1);
  micPut(c, spr, x, y, r*3.8, r*3.8, rot, 1);
}
/* disco bicóncavo: 'normal' o 'hipo' (microcítico e hipocrómico, palidez central amplia) */
function mis2Disco(c, g, x, y, r, tipo, v){ micRBC(c, g, x, y, r, v, tipo); }
/* leucocito: tipo 'neutro' (núcleo lobulado o en banda) o 'linfo' (núcleo redondo grande) */
function mis2Leuco(c, g, x, y, tipo, banda, v){
  if (g.mag < 40){ const rr = Math.max(tipo === 'neutro' ? 6.6 : 4.9, 1.1/g.s);
    micEll(c, x, y, rr, rr, 0, 'rgba(236,230,244,.85)'); micEll(c, x, y, rr*0.62, rr*0.62, 0, micCss(micPal(g.tin).nucV, 0.9)); return; }
  micLeuco(c, g, x, y, banda ? 'banda' : tipo, v, tipo === 'neutro' ? 6.6 : 4.9);
}
/* poco aumento: película a 40× y puntitos a 100×, en las posiciones reales de cada célula */
function mis2Bajo(c, g, key, sp, rad, col, cada){
  if (g.mag <= 4){ micFilm(c, g, key, sp, rad, col); return; }
  c.globalCompositeOperation = 'multiply'; cada((x, y, r) => micEll(c, x, y, r, r, 0, micCss(col, 0.8))); c.globalCompositeOperation = 'source-over';
}

const MIS2_MUESTRAS = {
  /* --------------------------------------------------- 1. drepanocitosis */
  falciforme: {
    tin:'azul',
    att(i,j){ const r = micRng(i,j,211); const sp = 15;
      return { x:(i+0.5+(r()-0.5)*0.7)*sp, y:(j+0.5+(r()-0.5)*0.7)*sp, hoz:r() < 0.27, rad:3.7*(0.93+0.14*r()), rot:r()*6.283 }; },
    draw(g){ const c = g.ctx;
      micBlotch(c, g, 211, [224,170,166,1], 0.12, 5200);
      if (g.mag < 40) mis2Bajo(c, g, 'falci', 15, 3.7, [206,112,116,1], (f) => micEach(g, 15, (i,j) => { const a = this.att(i,j); f(a.x, a.y, a.rad); }));
      else { c.globalCompositeOperation = 'multiply';
        micEach(g, 15, (i,j) => { const a = this.att(i,j), v = (i*7 + j*13) & 7;
          if (a.hoz) mis2Hoz(c, g, a.x, a.y, a.rad, a.rot, v); else mis2Disco(c, g, a.x, a.y, a.rad, 'normal', v); });
        c.globalCompositeOperation = 'source-over'; }
      micEach(g, 240, (i,j) => { const r = micRng(i,j,217); if (r() < 0.5) return;
        mis2Leuco(c, g, (i+0.5+(r()-0.5)*0.8)*240, (j+0.5+(r()-0.5)*0.8)*240, r()<0.7?'neutro':'linfo', false, (i*3+j*5) & 7); }); },
    hit(x, y, g){ let res = null, best = 1e9;
      micNear(x, y, 15, (i,j) => { const a = this.att(i,j); const d = Math.hypot(x-a.x, y-a.y);
        if (d < a.rad*(a.hoz?1.9:1.25) && d < best){ best = d; res = { tag: a.hoz ? 'hoz' : 'eritro', x:a.x, y:a.y, rad:a.rad }; } });
      return res; },
    censo(g){ const t = { hoz:0, eritro:0 };
      micEach(g, 15, (i,j) => { const a = this.att(i,j);
        if (Math.hypot(a.x-g.cx, a.y-g.cy) < g.rad*0.92) t[a.hoz?'hoz':'eritro']++; });
      return t; }
  },
  /* ------------------------------------------------ 2. anemia ferropénica */
  ferropenica: {
    tin:'azul',
    att(i,j){ const r = micRng(i,j,311); const sp = 11;
      return { x:(i+0.5+(r()-0.5)*0.7)*sp, y:(j+0.5+(r()-0.5)*0.7)*sp, rad:2.85*(0.94+0.12*r()), pal:0.66+0.06*r() }; },
    draw(g){ const c = g.ctx;
      micBlotch(c, g, 311, [226,180,176,1], 0.1, 5200);
      if (g.mag < 40) mis2Bajo(c, g, 'ferro', 11, 2.85, [220,150,150,1], (f) => micEach(g, 11, (i,j) => { const a = this.att(i,j); f(a.x, a.y, a.rad); }));
      else { c.globalCompositeOperation = 'multiply';
        micEach(g, 11, (i,j) => { const a = this.att(i,j); mis2Disco(c, g, a.x, a.y, a.rad, 'hipo', (i*7 + j*13) & 7); });
        c.globalCompositeOperation = 'source-over'; }
      micEach(g, 260, (i,j) => { const r = micRng(i,j,317); if (r() < 0.5) return;
        mis2Leuco(c, g, (i+0.5+(r()-0.5)*0.8)*260, (j+0.5+(r()-0.5)*0.8)*260, r()<0.65?'neutro':'linfo', false, (i*3+j*5) & 7); }); },
    hit(x, y, g){ let res = null, best = 1e9;
      micNear(x, y, 11, (i,j) => { const a = this.att(i,j); const d = Math.hypot(x-a.x, y-a.y);
        if (d < a.rad*1.25 && d < best){ best = d; res = { tag:'eritro', x:a.x, y:a.y, rad:a.rad }; } });
      return res; },
    censo(){ return {}; }
  },
  /* -------------------------------------------------------- 3. paludismo */
  malaria: {
    tin:'azul',
    att(i,j){ const r = micRng(i,j,411); const sp = 15;
      return { x:(i+0.5+(r()-0.5)*0.7)*sp, y:(j+0.5+(r()-0.5)*0.7)*sp, par:r() < 0.12, rad:3.75*(0.94+0.12*r()), ang:r()*6.283, gr:r() }; },
    draw(g){ const c = g.ctx;
      micBlotch(c, g, 411, [224,170,166,1], 0.12, 5200);
      if (g.mag < 40) mis2Bajo(c, g, 'malaria', 15, 3.75, [206,112,116,1], (f) => micEach(g, 15, (i,j) => { const a = this.att(i,j); f(a.x, a.y, a.rad); }));
      else { const par = [];
        c.globalCompositeOperation = 'multiply';
        micEach(g, 15, (i,j) => { const a = this.att(i,j); mis2Disco(c, g, a.x, a.y, a.rad, 'normal', (i*7 + j*13) & 7); if (a.par) par.push([a, i, j]); });
        c.globalCompositeOperation = 'source-over';
        par.forEach(([a, i, j]) => {
          const px = a.x + Math.cos(a.ang)*a.rad*0.35, py = a.y + Math.sin(a.ang)*a.rad*0.35;
          if (g.mag >= 100){ /* trofozoíto en anillo: anillo fino de citoplasma azul + punto de cromatina rojo violáceo */
            const rv = micRng(i,j,419);
            for (let k=0;k<10;k++){ const an = rv()*6.28, dd = a.rad*(0.25+0.6*rv());   /* granulación de Schüffner (P. vivax) */
              micEll(c, a.x+Math.cos(an)*dd, a.y+Math.sin(an)*dd, 0.22, 0.22, 0, 'rgba(200,90,120,.45)'); }
            c.beginPath(); c.ellipse(px, py, a.rad*0.42, a.rad*0.40, 0, 0.35, 6.1);
            c.strokeStyle = 'rgba(52,70,168,.92)'; c.lineWidth = a.rad*0.17; c.lineCap = 'round'; c.stroke();
            c.strokeStyle = 'rgba(120,140,220,.45)'; c.lineWidth = a.rad*0.06; c.stroke();
            micEll(c, px + a.rad*0.34, py - a.rad*0.16, a.rad*0.18, a.rad*0.17, 0, micGrad(c, px + a.rad*0.3, py - a.rad*0.2, 0, px + a.rad*0.34, py - a.rad*0.16, a.rad*0.18, [[0, '#b0306a'], [1, '#6e1438']]));
            micEll(c, a.x - a.rad*0.4, a.y + a.rad*0.42, 0.55, 0.5, 0, 'rgba(120,60,140,.7)');
          } else micEll(c, px, py, a.rad*0.26, a.rad*0.26, 0, 'rgba(60,70,150,.55)'); }); }
      micEach(g, 250, (i,j) => { const r = micRng(i,j,417); if (r() < 0.5) return;
        mis2Leuco(c, g, (i+0.5+(r()-0.5)*0.8)*250, (j+0.5+(r()-0.5)*0.8)*250, r()<0.6?'neutro':'linfo', false, (i*3+j*5) & 7); }); },
    hit(x, y, g){ let res = null, best = 1e9;
      micNear(x, y, 15, (i,j) => { const a = this.att(i,j); const d = Math.hypot(x-a.x, y-a.y);
        if (d < a.rad*1.25 && d < best){ best = d; res = { tag: a.par ? 'parasito' : 'eritro', x:a.x, y:a.y, rad:a.rad }; } });
      return res; },
    censo(g){ const t = { parasito:0, eritro:0 };
      micEach(g, 15, (i,j) => { const a = this.att(i,j);
        if (Math.hypot(a.x-g.cx, a.y-g.cy) < g.rad*0.92) t[a.par?'parasito':'eritro']++; });
      return t; }
  },
  /* ------------------------------------------- 4. fórmula leucocitaria */
  leucocitos: {
    tin:'azul',
    att(i,j){ const r = micRng(i,j,511); const sp = 78;
      const hay = r() > 0.28;
      /* la proporción se fija por posición para que todo campo tenga ~17 % de linfocitos */
      const linfo = (((i*3 + j*5) % 6) + 6) % 6 === 0;
      return { x:(i+0.5+(r()-0.5)*0.72)*sp, y:(j+0.5+(r()-0.5)*0.72)*sp, hay,
               tipo: linfo ? 'linfo' : 'neutro', banda: r() < 0.35, r }; },
    draw(g){ const c = g.ctx;
      micBlotch(c, g, 511, [224,170,166,1], 0.12, 5200);
      const cada = (f) => micEach(g, 15, (i,j) => { const r = micRng(i,j,513); f((i+0.5+(r()-0.5)*0.72)*15, (j+0.5+(r()-0.5)*0.72)*15, 3.7); });
      if (g.mag < 40) mis2Bajo(c, g, 'leuco', 15, 3.7, [206,112,116,1], cada);
      else { c.globalCompositeOperation = 'multiply';
        cada((x, y, r) => mis2Disco(c, g, x, y, r, 'normal', (Math.round(x*3) + Math.round(y*7)) & 7));
        c.globalCompositeOperation = 'source-over'; }
      micEach(g, 78, (i,j) => { const a = this.att(i,j); if (!a.hay) return;
        mis2Leuco(c, g, a.x, a.y, a.tipo, a.tipo==='neutro' && a.banda, (i*3 + j*5) & 7); }); },
    hit(x, y, g){ let res = null;
      micNear(x, y, 78, (i,j) => { const a = this.att(i,j); if (!a.hay) return;
        if (Math.hypot(x-a.x, y-a.y) < (a.tipo==='neutro'?8.4:7)) res = { tag:a.tipo, x:a.x, y:a.y, banda:a.banda }; });
      return res; },
    censo(g){ const t = { neutro:0, linfo:0, banda:0 };
      micEach(g, 78, (i,j) => { const a = this.att(i,j); if (!a.hay) return;
        if (Math.hypot(a.x-g.cx, a.y-g.cy) > g.rad*0.92) return;
        t[a.tipo]++; if (a.tipo==='neutro' && a.banda) t.banda++; });
      return t; }
  }
};

const MIS2_CASOS = [
  { id:'falciforme', muestra:'falciforme', em:'🩸',
    pac:'Kevin, 14 años · Esmeraldas',
    clin:'Llega por crisis de dolor intenso en los huesos largos, que ya ha tenido otras veces. Está pálido y con el blanco de los ojos algo amarillento. Hemoglobina 7,8 g/dL (referencia 13–16). Su hermana mayor tiene el mismo cuadro.',
    obj:2, objTxt:'400 aumentos: suficiente para ver la forma de cada eritrocito.',
    objFbBajo:'A ese aumento el extendido se ve como una película rosada uniforme: no puedes juzgar la forma de cada célula. Sube de objetivo.',
    tarea:'marcar', tag:'hoz', min:6,
    tareaTxt:'Activa el modo “Marcar” y señala todos los eritrocitos con forma anómala que veas en el campo. Marca al menos seis.',
    tareaFbMal:'Ese eritrocito es un disco redondo normal, con su palidez central. Busca los que han perdido la forma de disco: son alargados, puntiagudos en los extremos y curvados como una hoz o una luna.',
    medida:(st, censo) => { const marc = st.marcas.length, tot = censo.hoz + censo.eritro;
      return { txt:`Has marcado ${marc} células de forma anómala. En este campo hay ${tot} eritrocitos: eso es aproximadamente ${Math.round(censo.hoz/tot*100)} % de drepanocitos.`,
               dato:`≈ ${Math.round(censo.hoz/tot*100)} % de eritrocitos falciformes` }; },
    dx:[ { t:'Anemia de células falciformes (drepanocitosis)', ok:true },
         { t:'Anemia ferropénica', fb:'En la anemia ferropénica los eritrocitos son redondos pero pequeños y con una palidez central enorme. Aquí el tamaño es normal (7,5 µm) y lo que cambió es la forma: células alargadas en hoz.' },
         { t:'Paludismo (malaria)', fb:'En la malaria verías parásitos dentro de los eritrocitos —anillos azules con un punto rojo de cromatina—, y la forma del glóbulo se mantiene. Aquí no hay nada dentro de las células: lo que cambió es el contorno.' },
         { t:'Leucemia aguda', fb:'En una leucemia el hallazgo estaría en los leucocitos: verías muchísimos, inmaduros y todos parecidos. Aquí los leucocitos son escasos y normales; la anomalía está en la forma de los glóbulos rojos.' } ],
    just:[ { t:'Hay eritrocitos alargados y curvados en hoz, con los extremos puntiagudos, junto a otros de forma normal', ok:true },
           { t:'Los eritrocitos son más pequeños de lo normal', fb:'No: si los mides, siguen midiendo unos 7,5 µm. Lo que se alteró es la forma, no el tamaño.' },
           { t:'Hay muchos más leucocitos de lo normal', fb:'No: los leucocitos aparecen en cantidad y aspecto normales en el campo. La prueba está en los glóbulos rojos.' } ],
    expl:'La hemoglobina S polimeriza cuando cede el oxígeno y deforma el eritrocito en hoz. Esas células rígidas obstruyen los capilares —de ahí las crisis de dolor óseo— y se destruyen antes de tiempo, lo que causa la anemia y el tinte amarillento (ictericia) por exceso de bilirrubina. Es una enfermedad hereditaria autosómica recesiva, frecuente en poblaciones afrodescendientes como la de Esmeraldas.' },

  { id:'ferropenica', muestra:'ferropenica', em:'🧲',
    pac:'Sofía, 12 años · Riobamba',
    clin:'Cansancio desde hace meses, le falta el aire al subir gradas, uñas quebradizas y palidez en la conjuntiva. Hemoglobina 9,1 g/dL. Dieta escasa en carne y sin fuente de vitamina C en las comidas.',
    obj:3, aceite:true, objTxt:'1000 aumentos con aceite de inmersión: el único aumento con el que una diferencia de 2 µm se mide con confianza.',
    objFbBajo:'A ese aumento no puedes medir con precisión una célula de micras: cada división de la regla vale más que la diferencia que buscas. Sube de objetivo.',
    objFbAceite:'El objetivo de inmersión sin aceite da una imagen oscura y borrosa: la luz se desvía al pasar del vidrio al aire. Pon la gota de aceite.',
    tarea:'medir', min:3,
    tareaTxt:'Activa el modo “Medir” y mide el diámetro de tres eritrocitos: un clic en un borde de la célula y otro en el borde opuesto. La mira se ajusta sola al contorno. Compara con el valor de referencia (7,5 µm).',
    tareaFbMal:'Esa medida no cruza un eritrocito completo. Los dos puntos deben caer en la misma célula y en bordes opuestos, pasando por su centro.',
    medida:(st) => { const prom = st.medidas.reduce((a,b)=>a+b,0)/st.medidas.length;
      return { txt:`Diámetro promedio medido: ${micFmt(prom,1)} µm (referencia 7,5 µm). Las células son ${prom < 6.8 ? 'más pequeñas de lo normal: microcitosis' : 'de tamaño normal'}.`,
               dato:`diámetro promedio ${micFmt(prom,1)} µm · palidez central ampliada` }; },
    dx:[ { t:'Anemia ferropénica (por falta de hierro)', ok:true },
         { t:'Anemia de células falciformes', fb:'En la drepanocitosis verías eritrocitos deformados en hoz junto a otros normales. Aquí todos conservan la forma de disco redondo: lo que cambió es el tamaño y la cantidad de hemoglobina.' },
         { t:'Policitemia (exceso de glóbulos rojos)', fb:'En la policitemia habría más eritrocitos de lo normal y la hemoglobina estaría alta, no en 9,1 g/dL. Además las células tendrían tamaño y color normales.' },
         { t:'Infección bacteriana aguda', fb:'Una infección bacteriana se ve en los leucocitos (muchos neutrófilos), no en el tamaño de los glóbulos rojos. Aquí los leucocitos son escasos y normales.' } ],
    just:[ { t:'Los eritrocitos miden menos de 6,5 µm y su palidez central ocupa más de un tercio de la célula', ok:true },
           { t:'Los eritrocitos tienen forma de hoz', fb:'No: todos conservan la forma redonda de disco. Lo que observaste fue tamaño reducido y palidez aumentada.' },
           { t:'Hay parásitos dentro de los eritrocitos', fb:'No hay ninguna estructura dentro de las células: el centro pálido no es un parásito, es la zona delgada del disco bicóncavo, que aquí se ve más amplia porque falta hemoglobina.' } ],
    expl:'Sin hierro la médula ósea no puede fabricar suficiente hemoglobina, así que produce eritrocitos pequeños (microcíticos) y con poco pigmento (hipocrómicos): por eso la palidez central ocupa más de un tercio de la célula. En el Ecuador es la carencia nutricional más frecuente en niños y adolescentes. El hierro de origen vegetal se absorbe mejor acompañado de vitamina C, y peor con té o café en la misma comida.' },

  { id:'malaria', muestra:'malaria', em:'🦟',
    pac:'Wilson, 27 años · Taisha, Morona Santiago',
    clin:'Hace ocho días volvió de trabajar en la selva. Fiebre alta que sube y baja cada 48 horas, con escalofríos intensos seguidos de sudoración. Bazo aumentado de tamaño. La gota gruesa se tomó durante el pico febril.',
    obj:3, aceite:true, objTxt:'1000 aumentos con aceite de inmersión: es el único que resuelve el interior del eritrocito.',
    objFbBajo:'A ese aumento se ven puntitos dentro de algunos glóbulos rojos, pero no puedes afirmar qué son. Para identificar un parásito hace falta el objetivo de inmersión.',
    objFbAceite:'El objetivo de inmersión sin aceite da una imagen oscura y borrosa: la luz se desvía al pasar del vidrio al aire. Pon la gota de aceite.',
    tarea:'marcar', tag:'parasito', min:3,
    tareaTxt:'Activa el modo “Marcar” y señala los eritrocitos que tengan algo en su interior. Marca al menos tres.',
    tareaFbMal:'Ese eritrocito está vacío: su centro pálido es solo la zona delgada del disco. Busca los que tienen dentro un anillo azul finito con un punto rojo violáceo pegado a él.',
    medida:(st, censo) => { const tot = censo.parasito + censo.eritro;
      return { txt:`Has marcado ${st.marcas.length} eritrocitos parasitados. En el campo hay ${tot} eritrocitos y ${censo.parasito} están parasitados: parasitemia ≈ ${(censo.parasito/tot*100).toFixed(1).replace('.',',')} %.`,
               dato:`parasitemia ≈ ${(censo.parasito/tot*100).toFixed(1).replace('.',',')} % · trofozoítos en anillo` }; },
    dx:[ { t:'Paludismo (malaria) por Plasmodium', ok:true },
         { t:'Anemia de células falciformes', fb:'En la drepanocitosis el eritrocito cambia de forma pero está vacío por dentro. Aquí la forma del glóbulo es normal y lo anómalo está en su interior: un anillo con un punto de cromatina.' },
         { t:'Infección bacteriana', fb:'Las bacterias, cuando aparecen en sangre, se ven como bastoncitos o cocos en el plasma, entre las células, no dentro de los eritrocitos. Además habría una gran neutrofilia, y aquí los leucocitos son normales.' },
         { t:'Dengue', fb:'El dengue no deja parásitos visibles en el extendido: se reconoce por la caída de plaquetas y por la clínica, no por estructuras dentro del eritrocito. Lo que observaste está dentro de las células.' } ],
    just:[ { t:'Dentro de varios eritrocitos hay un anillo de citoplasma azul con un punto de cromatina rojo violáceo: son trofozoítos', ok:true },
           { t:'Los eritrocitos parasitados tienen forma de hoz', fb:'No: los eritrocitos conservan su forma de disco. Lo decisivo es lo que hay dentro de ellos, no su contorno.' },
           { t:'Hay muchos neutrófilos con núcleo en banda', fb:'No: la fórmula leucocitaria de este campo es normal. El hallazgo diagnóstico está dentro de los glóbulos rojos.' } ],
    expl:'El mosquito Anopheles inocula esporozoítos que, tras pasar por el hígado, invaden los eritrocitos. Dentro de ellos el parásito adopta la forma de anillo (trofozoíto joven), se multiplica y rompe la célula: esa ruptura sincronizada de todos los eritrocitos infectados a la vez produce el pico de fiebre cada 48 horas de Plasmodium vivax. En el Ecuador la transmisión se concentra en la Amazonía y en la costa norte; la confirmación por gota gruesa es obligatoria antes de tratar.' },

  { id:'leucocitos', muestra:'leucocitos', em:'🌡️',
    pac:'Ana, 9 años · Quito',
    clin:'Fiebre de 39 °C desde hace dos días, dolor de garganta intenso con placas blanquecinas en las amígdalas y ganglios del cuello dolorosos. Leucocitos totales: 18 400/µL (referencia 4 500–11 000).',
    obj:2, objTxt:'400 aumentos: permite reconocer el núcleo de cada leucocito.',
    objFbBajo:'A ese aumento los leucocitos se ven como manchas: no puedes distinguir si el núcleo es lobulado o redondo. Sube de objetivo.',
    tarea:'formula', min:8,
    tareaTxt:'Este campo se eligió con los leucocitos concentrados para facilitar el recuento (en un extendido real están mucho más dispersos). Activa el modo “Contar neutrófilos” y el modo “Contar linfocitos” y clasifica al menos ocho leucocitos haciendo clic en cada uno. El neutrófilo tiene núcleo dividido en lóbulos (o en banda) y citoplasma amplio con granulación fina; el linfocito es más pequeño, con un núcleo redondo y oscuro que casi llena la célula.',
    tareaFbMal:'Ese leucocito no es del tipo que estás contando: fíjate en el núcleo antes de hacer clic.',
    medida:(st, censo) => { const n = st.cuenta.neutro.length, l = st.cuenta.linfo.length;
      const N = censo.neutro || 0, L = censo.linfo || 0, T = (N + L) || 1;
      return { txt:`Has clasificado ${n} neutrófilos y ${l} linfocitos. El campo completo tiene ${N} neutrófilos y ${L} linfocitos: la fórmula es ${Math.round(N/T*100)} % de neutrófilos frente a ${Math.round(L/T*100)} % de linfocitos (referencia en un niño sano: 35–50 % de neutrófilos). Además, ${censo.banda} de esos neutrófilos tienen el núcleo sin lobular, en forma de banda.`,
               dato:`${Math.round(N/T*100)} % de neutrófilos, ${censo.banda} de ellos en banda` }; },
    dx:[ { t:'Infección bacteriana aguda', ok:true },
         { t:'Infección vírica', fb:'En una infección vírica predominarían los linfocitos (núcleo redondo y oscuro, célula pequeña) y el recuento total de leucocitos sería normal o bajo. Aquí ocurre lo contrario: mayoría de neutrófilos y 18 400 leucocitos/µL.' },
         { t:'Parasitosis intestinal', fb:'Una parasitosis se manifiesta con eosinofilia: leucocitos con núcleo en dos lóbulos y granulación gruesa de color anaranjado intenso. No es lo que predomina en este campo.' },
         { t:'Anemia ferropénica', fb:'La anemia ferropénica se diagnostica por el tamaño y el color de los glóbulos rojos, no por los leucocitos. Aquí los eritrocitos son de tamaño y palidez normales.' } ],
    just:[ { t:'Predominan los neutrófilos (más del 75 %) y varios tienen el núcleo en banda, sin lobular: es una desviación a la izquierda', ok:true },
           { t:'Predominan los linfocitos, con núcleo redondo y oscuro', fb:'Cuenta otra vez: la mayoría de los leucocitos del campo tienen el núcleo dividido en lóbulos o en forma de banda, propio del neutrófilo.' },
           { t:'Los eritrocitos están deformados', fb:'Los glóbulos rojos de este campo son discos normales. El hallazgo está en los leucocitos.' } ],
    expl:'Ante una infección bacteriana la médula ósea libera neutrófilos de forma masiva y urgente; al no darles tiempo a madurar, salen con el núcleo todavía sin lobular, en forma de banda. Ese aumento de formas jóvenes se llama desviación a la izquierda y, junto con la neutrofilia y la leucocitosis, apoya el origen bacteriano. En las infecciones víricas, en cambio, mandan los linfocitos. Este dato orienta al médico, pero no reemplaza al cultivo ni justifica por sí solo un antibiótico.' }
];

/* ---------- microscopio compacto para la misión ---------- */
function mis2Scope(host, opts){
  const cv = h('canvas',{ tabindex:'0', role:'img', 'aria-label':'Campo visual del microscopio' });
  const top = h('div',{class:'mis2-bar top'}), bot = h('div',{class:'mis2-bar bot'});
  host.append(cv, top, bot);
  const buf = document.createElement('canvas');
  const St = { caso:null, obj:1, x:0, y:0, aceite:false, modo:'observar',
               marcas:[], medidas:[], medA:null, cuenta:{ neutro:[], linfo:[] } };
  let raf = null, alive = true, W = 0, H = 0, R = 0, dpr = 1;
  const M = () => MIS2_MUESTRAS[St.caso.muestra];
  const O = () => MIC_OBJ[St.obj];
  const sinAceite = () => O().aceite && !St.aceite;

  function geom(){ const f = O().fov, s = (2*R)/f, m = f*0.58 + 10;
    return { s, f, cx:St.x, cy:St.y, rad:f/2, x0:St.x-m, x1:St.x+m, y0:St.y-m, y1:St.y+m }; }
  function w2s(x, y){ const g = geom(); return [ W/2 + (x-g.cx)*g.s, H/2 + (y-g.cy)*g.s ]; }
  function s2w(px, py){ const g = geom(); return [ g.cx + (px-W/2)/g.s, g.cy + (py-H/2)/g.s ]; }

  const low = MIC_LOW(), anim = () => (typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion);
  let trans = null;
  function draw(){
    raf = null; if (!alive || !St.caso || !cv.isConnected) return;
    const cw = host.clientWidth || 640, ch = host.clientHeight || 520;
    dpr = Math.min(window.devicePixelRatio || 1, low ? 1.5 : 2);
    if (cv.width !== Math.round(cw*dpr)){ cv.width = Math.round(cw*dpr); buf.width = cv.width; }
    if (cv.height !== Math.round(ch*dpr)){ cv.height = Math.round(ch*dpr); buf.height = cv.height; }
    W = cw; H = ch; R = Math.min(cw, ch)*0.44;
    const gg = geom(), bc = buf.getContext('2d');
    bc.setTransform(dpr,0,0,dpr,0,0); bc.clearRect(0,0,W,H);
    micFondo(bc, W, H, R);
    bc.translate(W/2, H/2); bc.scale(gg.s, gg.s); bc.translate(-gg.cx, -gg.cy);
    const g = Object.assign({}, gg, { ctx:bc, mag:O().m, tin:MIC_TIN[M().tin], tk:M().tin, dpr, low });
    try { M().draw(g); } catch(e){ console.warn('diagnostico-celular: dibujo', e); }
    bc.restore();

    /* misma óptica que el microscopio virtual: sin aceite a 1000× la imagen queda oscura y borrosa */
    const c = cv.getContext('2d');
    c.setTransform(dpr,0,0,dpr,0,0);
    const sa = sinAceite();
    micOptica(c, buf, W, H, R, dpr, { blur: sa ? 7 : 0, halo: sa ? 0.4 : 0, con: sa ? 0.72 : 1, bri: sa ? 0.5 : 1, wash: 0, sat: 1, low, grain: 0.1 });
    overlay(c, gg);
    if (trans && !micTrans(c, trans, W, H, R)) trans = null;
    if (trans && alive) raf = requestAnimationFrame(draw);
  }

  function overlay(c, gg){
    const cx = W/2, cy = H/2;
    c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(cx-11,cy); c.lineTo(cx-3,cy); c.moveTo(cx+3,cy); c.lineTo(cx+11,cy);
    c.moveTo(cx,cy-11); c.lineTo(cx,cy-3); c.moveTo(cx,cy+3); c.lineTo(cx,cy+11); c.stroke();
    /* regla micrométrica cuando se mide */
    if (St.modo === 'medir'){
      const pasos = [1,2,5,10,20,50,100];
      const paso = pasos.find(p => p*gg.s > 34) || 100;
      const largo = Math.min(10, Math.max(2, Math.floor((R*1.4)/(paso*gg.s))));
      const y = cy + R*0.74, x0 = cx - (largo*paso*gg.s)/2;
      c.fillStyle = 'rgba(10,12,16,.55)'; c.fillRect(x0-10, y-24, largo*paso*gg.s+20, 38);
      c.strokeStyle = '#fff'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x0,y); c.lineTo(x0+largo*paso*gg.s,y);
      for (let k=0;k<=largo;k++){ const px = x0 + k*paso*gg.s; c.moveTo(px,y-6); c.lineTo(px,y+6); }
      c.stroke();
      c.fillStyle = '#fff'; c.font = '11px ui-monospace,monospace'; c.textAlign = 'center';
      c.fillText(`${micFmt(largo*paso)} µm · cada división ${micFmt(paso)} µm`, x0 + largo*paso*gg.s/2, y - 10);
      c.textAlign = 'left';
    }
    const marca = (p, col) => { const q = w2s(p.x, p.y);
      c.strokeStyle = col; c.lineWidth = 1.8; c.beginPath(); c.arc(q[0], q[1], 9, 0, Math.PI*2); c.stroke(); };
    St.marcas.forEach(p => marca(p, '#36d17a'));
    St.cuenta.neutro.forEach(p => { marca(p, '#ffd166'); const q = w2s(p.x,p.y); c.fillStyle = '#ffd166'; c.font = 'bold 10px ui-monospace,monospace'; c.fillText('N', q[0]+10, q[1]-8); });
    St.cuenta.linfo.forEach(p => { marca(p, '#7fd4ff'); const q = w2s(p.x,p.y); c.fillStyle = '#7fd4ff'; c.font = 'bold 10px ui-monospace,monospace'; c.fillText('L', q[0]+10, q[1]-8); });
    if (St.medA){ const q = w2s(St.medA.x, St.medA.y); c.strokeStyle = '#ffd166'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(q[0]-7,q[1]); c.lineTo(q[0]+7,q[1]); c.moveTo(q[0],q[1]-7); c.lineTo(q[0],q[1]+7); c.stroke(); }
    (St.pares||[]).forEach(par => { const a = w2s(par.a.x, par.a.y), b = w2s(par.b.x, par.b.y);
      c.strokeStyle = '#ffd166'; c.lineWidth = 1.4; c.setLineDash([5,4]);
      c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); c.setLineDash([]);
      const et = `${micFmt(par.d,1)} µm`, tx = (a[0]+b[0])/2 + 9, ty = (a[1]+b[1])/2 - 7;
      c.font = 'bold 11px ui-monospace,monospace';
      const w = c.measureText(et).width;
      c.fillStyle = 'rgba(10,12,16,.8)'; c.fillRect(tx-4, ty-11, w+8, 15);
      c.fillStyle = '#ffd166'; c.fillText(et, tx, ty); });
  }

  function redraw(){ if (!raf) raf = requestAnimationFrame(draw); }

  /* --- acción sobre un punto del mundo --- */
  function actuar(wx, wy){
    const gg = geom();
    if (Math.hypot(wx-gg.cx, wy-gg.cy) > gg.rad) return;
    const g = Object.assign({}, gg, { mag:O().m });
    const c = St.caso;
    if (sinAceite()) return opts.aviso(c.objFbAceite || 'Necesitas aceite de inmersión para este objetivo.', false);
    if (O().m < MIC_OBJ[c.obj].m) return opts.aviso(c.objFbBajo, false);
    if (St.modo === 'marcar'){
      const hit = M().hit(wx, wy, g);
      if (!hit) return opts.aviso('Ahí no hay ninguna célula: has marcado el plasma. Apunta al centro de una célula.', false);
      if (hit.tag !== c.tag) return opts.aviso(c.tareaFbMal, false);
      if (St.marcas.some(p => Math.hypot(p.x-hit.x, p.y-hit.y) < 2)) return opts.aviso('Esa célula ya estaba marcada.', false);
      St.marcas.push({ x:hit.x, y:hit.y });
      opts.aviso(`Marcada. Llevas ${St.marcas.length} de ${c.min}.`, true);
    } else if (St.modo === 'medir'){
      const hit = M().hit(wx, wy, g);
      if (!hit) return opts.aviso('Ahí no hay ninguna célula: has puesto el punto en el plasma. Apunta al borde de un eritrocito.', false);
      /* la mira se ajusta al contorno de la célula señalada */
      let dx = wx - hit.x, dy = wy - hit.y, m = Math.hypot(dx, dy);
      if (m < hit.rad*0.55){   /* señalado el centro: se mide el diámetro completo de una vez */
        St.medA = null;
        const a = { x:hit.x-hit.rad, y:hit.y }, b = { x:hit.x+hit.rad, y:hit.y }, d = hit.rad*2;
        St.pares = St.pares || []; St.pares.push({ a, b, d }); St.medidas.push(d);
        opts.aviso(`Diámetro medido de borde a borde: ${micFmt(d,1)} µm. Llevas ${St.medidas.length} de ${c.min}.`, true);
        redraw(); opts.cambio && opts.cambio(); return;
      }
      const p = { x:hit.x + dx/m*hit.rad, y:hit.y + dy/m*hit.rad, cx:hit.x, cy:hit.y, ux:dx/m, uy:dy/m };
      if (!St.medA){ St.medA = p; opts.aviso('Primer punto ajustado al borde de la célula. Marca ahora el borde opuesto de la MISMA célula.', true); }
      else {
        const a = St.medA; St.medA = null;
        if (Math.hypot(a.cx-p.cx, a.cy-p.cy) > 0.5) return opts.aviso('Los dos puntos cayeron en células distintas. Mide una sola célula: un borde y el borde de enfrente.', false);
        if (a.ux*p.ux + a.uy*p.uy > -0.5) return opts.aviso(c.tareaFbMal, false);
        const d = Math.hypot(a.x-p.x, a.y-p.y);
        St.pares = St.pares || []; St.pares.push({ a, b:p, d });
        St.medidas.push(d);
        opts.aviso(`Diámetro medido: ${micFmt(d,1)} µm. Llevas ${St.medidas.length} de ${c.min}.`, true);
      }
    } else if (St.modo === 'neutro' || St.modo === 'linfo'){
      const hit = M().hit(wx, wy, g);
      if (!hit || (hit.tag !== 'neutro' && hit.tag !== 'linfo'))
        return opts.aviso('Ahí no hay ningún leucocito: los glóbulos rojos no tienen núcleo y no se cuentan en la fórmula.', false);
      const ya = St.cuenta.neutro.concat(St.cuenta.linfo).some(p => Math.hypot(p.x-hit.x, p.y-hit.y) < 3);
      if (ya) return opts.aviso('Ese leucocito ya lo clasificaste.', false);
      if (hit.tag !== St.modo)
        return opts.aviso(hit.tag === 'linfo'
          ? 'Ese leucocito tiene un núcleo redondo y oscuro que casi llena la célula, con un borde finísimo de citoplasma: es un linfocito, no un neutrófilo.'
          : 'Ese leucocito tiene el núcleo dividido en lóbulos (o en forma de banda) y bastante citoplasma granulado alrededor: es un neutrófilo, no un linfocito.', false);
      St.cuenta[St.modo].push({ x:hit.x, y:hit.y });
      opts.aviso(`Clasificado. Neutrófilos: ${St.cuenta.neutro.length} · linfocitos: ${St.cuenta.linfo.length}.`, true);
    } else {
      const hit = M().hit(wx, wy, g);
      opts.aviso(hit ? `Célula observada en la posición (${micFmt(wx)}, ${micFmt(wy)}) µm.` : 'Plasma: fondo sin células.', true);
      return;
    }
    redraw(); opts.cambio && opts.cambio();
  }

  /* --- entradas --- */
  let drag = null;
  cv.addEventListener('pointerdown', ev => { drag = { px:ev.clientX, py:ev.clientY, x:St.x, y:St.y, moved:0 }; cv.setPointerCapture(ev.pointerId); });
  cv.addEventListener('pointermove', ev => { if (!drag) return;
    const gg = geom(); const dx = (ev.clientX-drag.px)/gg.s, dy = (ev.clientY-drag.py)/gg.s;
    drag.moved = Math.max(drag.moved, Math.hypot(ev.clientX-drag.px, ev.clientY-drag.py));
    St.x = drag.x - dx; St.y = drag.y - dy; redraw(); });
  cv.addEventListener('pointerup', ev => {
    if (drag && drag.moved < 5){ const r = cv.getBoundingClientRect(); const p = s2w(ev.clientX-r.left, ev.clientY-r.top); actuar(p[0], p[1]); }
    drag = null; });
  cv.addEventListener('pointercancel', () => { drag = null; });
  cv.addEventListener('keydown', ev => {
    const paso = O().fov*0.16; let used = true;
    if (ev.key === 'ArrowLeft') St.x -= paso; else if (ev.key === 'ArrowRight') St.x += paso;
    else if (ev.key === 'ArrowUp') St.y -= paso; else if (ev.key === 'ArrowDown') St.y += paso;
    else if (ev.key === 'Enter' || ev.key === ' ') actuar(St.x, St.y);
    else used = false;
    if (used){ ev.preventDefault(); redraw(); }
  });

  const tagObj = h('span',{class:'mis2-tag'}), tagCampo = h('span',{class:'mis2-tag'}),
        tagPos = h('span',{class:'mis2-tag'}), tagModo = h('span',{class:'mis2-tag'}), tagAviso = h('span',{class:'mis2-tag warn',style:'display:none'});
  top.append(tagObj, tagCampo); bot.append(tagModo, tagPos, tagAviso);
  function lecturas(){
    const o = O();
    tagObj.innerHTML = `Objetivo <b>${o.m}x</b> · ocular 10x · <b>${micFmt(o.m*10)}×</b>`;
    tagCampo.textContent = `Campo: ${micFmt(o.fov)} µm`;
    tagPos.textContent = `Platina X ${micFmt(St.x)} · Y ${micFmt(St.y)} µm`;
    tagModo.textContent = 'Modo: ' + ({ observar:'observar', marcar:'marcar células', medir:'medir', neutro:'contar neutrófilos', linfo:'contar linfocitos' })[St.modo];
    if (sinAceite()){ tagAviso.style.display = ''; tagAviso.textContent = 'Falta el aceite de inmersión'; }
    else tagAviso.style.display = 'none';
  }

  const api = {
    St, el:cv,
    setCaso(c){ St.caso = c; St.obj = 0; St.x = 0; St.y = 0; St.aceite = false; St.modo = 'observar';
      St.marcas = []; St.medidas = []; St.pares = []; St.medA = null; St.cuenta = { neutro:[], linfo:[] };
      lecturas(); redraw(); },
    setObj(i){
      if (i !== St.obj && anim()){ const img = micSnap(cv); if (img) trans = { img, t0: performance.now(), dur: 480, ratio: clamp(MIC_OBJ[i].m/MIC_OBJ[St.obj].m, 0.4, 2.6) }; }
      St.obj = i; lecturas(); redraw(); },
    setAceite(v){ St.aceite = v; lecturas(); redraw(); },
    setModo(m){ St.modo = m; St.medA = null; lecturas(); redraw(); },
    mover(dx, dy){ const p = O().fov*0.16; St.x += dx*p; St.y += dy*p; lecturas(); redraw(); },
    centrar(){ St.x = 0; St.y = 0; lecturas(); redraw(); },
    censo(){ const gg = geom(); return M().censo(Object.assign({}, gg, { mag:O().m })); },
    redraw(){ lecturas(); redraw(); },
    focus(){ cv.focus(); },
    dispose(){ alive = false; if (raf) cancelAnimationFrame(raf); }
  };
  window.addEventListener('resize', api.redraw);
  let ro = null; try { ro = new ResizeObserver(() => api.redraw()); ro.observe(host); } catch(e){ ro = null; }
  api._off = () => { window.removeEventListener('resize', api.redraw); ro && ro.disconnect(); };
  host._scope = api;   /* referencia para depuración y pruebas automatizadas */
  return api;
}

route('/mision/diagnostico-celular', (view) => {
  const ACT = 'mision-diagnostico-celular';
  view.classList.add('wide');
  view.append(h('div',{class:'page-head mis2-head',style:'margin-bottom:14px'},
    h('div',{}, h('span',{class:'eyebrow mis'},'Misión biológica · Unidad 2 · Mundo celular'),
      h('h1',{},'Diagnóstico celular'),
      h('p',{},'Cuatro pacientes reales del sistema de salud ecuatoriano esperan el resultado de su extendido de sangre. En cada caso eliges el aumento, observas, mides o cuentas lo que corresponda, y propones un diagnóstico que debes poder justificar con lo que se ve en la imagen.')),
    h('span',{class:'pill mis'},'+120 XP · 10 min')));
  view.append(purposeBanner({
    proposito:'Reconocer alteraciones celulares en un extendido de sangre y relacionar cada hallazgo con un cuadro clínico.',
    observa:['Qué se pierde y qué se gana al cambiar de objetivo en la misma muestra',
             'La forma, el tamaño y la palidez central de los eritrocitos',
             'El núcleo de cada leucocito: lobulado, en banda o redondo'],
    reto:'Resuelve los cuatro casos y justifica cada diagnóstico con la observación concreta que lo sostiene.',
    done: !!Store.s.activities[ACT]?.done }));

  const scopeHost = h('div',{class:'mis2-scope'});
  const panel = h('div',{class:'stack'});
  view.append(h('div',{class:'mis2-lay'}, scopeHost, panel));

  const pasosEl = h('div',{class:'mis2-steps'});
  const body = h('div',{class:'stack'});
  const vivo = h('div',{class:'small muted','aria-live':'polite',style:'min-height:1.2em'});
  const ctrl = h('div',{class:'card stack'});
  panel.append(h('div',{class:'card stack'}, pasosEl, body, vivo), ctrl);

  let idx = 0, score = 0, errores = 0, resuelto = false, finBody = null;
  let fase = 'clinica';   /* clinica → observar → tarea → diagnostico → cierre */
  let aciertoCaso = true;
  const startAt = Date.now();
  const hechos = [];

  const scope = mis2Scope(scopeHost, {
    aviso(txt, ok){ vivo.textContent = txt; if (!ok){ errores++; toast(txt, 5200); } },
    cambio(){ if (fase === 'tarea') renderTarea(); }
  });

  function C(){ return MIS2_CASOS[idx]; }
  function renderPasos(){ pasosEl.innerHTML = '';
    MIS2_CASOS.forEach((c,i) => pasosEl.append(h('span',{class: i < idx ? 'done' : i === idx && !resuelto ? 'now' : ''}, `${c.em} Caso ${i+1}`))); }

  function renderCtrl(){
    ctrl.innerHTML = '';
    const objs = h('div',{class:'mis2-objs'});
    MIC_OBJ.forEach((o,i) => objs.append(h('button',{ 'aria-pressed': scope.St.obj === i,
      'aria-label':`Objetivo de ${o.m} aumentos: ${o.n}`,
      onclick:()=>{ scope.setObj(i); Store.log('microscopio',{ mision:'diagnostico-celular', caso:C().id, objetivo:o.m }); renderCtrl(); if (fase === 'tarea') renderTarea(); } },
      `${o.m}x`, h('span',{class:'u'},`${o.m*10}×`))));
    ctrl.append(h('span',{class:'eyebrow'},'Revólver de objetivos'), objs);
    const aceite = h('label',{class:'toggle'}, h('input',{ type:'checkbox', checked:scope.St.aceite,
      onchange:e => { scope.setAceite(e.target.checked); } }), 'Gota de aceite de inmersión (necesaria a 1000×)');
    ctrl.append(aceite);
    const modos = [['observar','Observar']];
    if (C().tarea === 'marcar') modos.push(['marcar','Marcar células']);
    if (C().tarea === 'medir') modos.push(['medir','Medir']);
    if (C().tarea === 'formula') modos.push(['neutro','Contar neutrófilos'],['linfo','Contar linfocitos']);
    const mrow = h('div',{class:'mis2-row'});
    modos.forEach(([m,t]) => mrow.append(h('button',{ class:'chip'+(scope.St.modo===m?' picked':''), 'aria-pressed':scope.St.modo===m,
      onclick:()=>{ scope.setModo(m); renderCtrl(); } }, t)));
    ctrl.append(h('span',{class:'eyebrow'},'Herramientas'), mrow);
    const pad = h('div',{class:'mis2-pad'});
    [[0,0],[0,-1],[0,0],[-1,0],'c',[1,0],[0,0],[0,1],[0,0]].forEach(d => {
      if (d === 'c') return pad.append(h('button',{ 'aria-label':'Centrar la platina', onclick:()=>scope.centrar() },'•'));
      if (d[0] === 0 && d[1] === 0) return pad.append(h('button',{ disabled:'' },''));
      const et = d[1] === -1 ? '↑' : d[1] === 1 ? '↓' : d[0] === -1 ? '←' : '→';
      pad.append(h('button',{ 'aria-label':`Mover la platina hacia ${d[1]===-1?'arriba':d[1]===1?'abajo':d[0]===-1?'la izquierda':'la derecha'}`, onclick:()=>scope.mover(d[0], d[1]) }, et));
    });
    ctrl.append(h('div',{class:'mis2-row',style:'justify-content:space-between;align-items:flex-start'},
      h('div',{}, h('span',{class:'eyebrow'},'Platina'), pad),
      h('p',{class:'mis2-mini',style:'flex:1;min-width:120px'},'Con el campo enfocado puedes usar las flechas del teclado para recorrer la platina y Enter para actuar en el centro de la mira.')));
  }

  function render(){
    renderPasos(); body.innerHTML = ''; renderCtrl();
    if (fase === 'clinica') return renderClinica();
    if (fase === 'observar') return renderObservar();
    if (fase === 'tarea') return renderTarea();
    if (fase === 'diagnostico') return renderDiagnostico();
    return renderCierre();
  }

  function renderClinica(){
    const c = C();
    body.append(h('span',{class:'eyebrow mis'},`Caso ${idx+1} de ${MIS2_CASOS.length}`),
      h('h3',{},`${c.em} ${c.pac}`),
      h('p',{style:'font-size:.9rem'},c.clin),
      h('div',{class:'notice info'},'Tienes el extendido de sangre en la platina. Elige el objetivo adecuado y observa antes de decidir nada.'),
      h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ fase = 'observar'; render(); scope.focus(); }},'Observar la muestra →'));
  }

  function renderObservar(){
    const c = C();
    const ok = scope.St.obj >= c.obj && (!c.aceite || scope.St.aceite);
    body.append(h('span',{class:'eyebrow mis'},`Caso ${idx+1} · Elegir el aumento`),
      h('p',{style:'font-size:.9rem'},'Recorre la muestra con la platina y prueba los objetivos. Cuando tengas el aumento con el que de verdad se puede juzgar la muestra, continúa.'),
      h('div',{class:'notice '+(ok?'ok':'')}, ok ? `Aumento adecuado: ${c.objTxt}` : 'Todavía no estás en el aumento adecuado para este caso.'),
      h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{
        if (scope.St.obj < c.obj){ errores++; aciertoCaso = false; return toast(c.objFbBajo, 5200); }
        if (c.aceite && !scope.St.aceite){ errores++; aciertoCaso = false; return toast(c.objFbAceite, 5200); }
        fase = 'tarea'; scope.setModo(c.tarea === 'formula' ? 'neutro' : c.tarea); render(); scope.focus();
      }},'Tengo el aumento correcto →'));
  }

  function renderTarea(){
    const c = C(); body.innerHTML = '';
    const st = scope.St;
    const n = c.tarea === 'marcar' ? st.marcas.length : c.tarea === 'medir' ? st.medidas.length : st.cuenta.neutro.length + st.cuenta.linfo.length;
    body.append(h('span',{class:'eyebrow mis'},`Caso ${idx+1} · Recoger el dato`),
      h('p',{style:'font-size:.9rem'},c.tareaTxt),
      h('div',{class:'row',style:'justify-content:space-between'},
        h('span',{class:'mis2-mini'},`Registrados: ${n} de ${c.min}`),
        h('button',{class:'btn sm ghost',onclick:()=>{ scope.setCaso(c); scope.setObj(c.obj); if (c.aceite) scope.setAceite(true); scope.setModo(c.tarea === 'formula' ? 'neutro' : c.tarea); render(); }},'Reiniciar el conteo')));
    if (n >= c.min){
      let m; try { m = c.medida(st, scope.censo()); } catch(e){ console.warn(e); m = { txt:'Dato registrado.', dato:'' }; }
      body.append(h('div',{class:'notice ok'}, m.txt),
        h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ C()._dato = m.dato; fase = 'diagnostico'; render(); }},'Ya tengo el dato: diagnosticar →'));
    } else body.append(h('div',{class:'notice'},'Sigue recogiendo el dato en el campo visual. Si te equivocas de célula, el microscopio te explicará por qué.'));
  }

  function renderDiagnostico(){
    const c = C();
    body.append(h('span',{class:'eyebrow mis'},`Caso ${idx+1} · Diagnóstico`),
      c._dato ? h('div',{class:'notice info'}, h('span',{}, h('b',{},'Tu dato: '), c._dato)) : null,
      h('p',{style:'font-weight:600'},'1. ¿Qué tiene este paciente?'));
    const fb = h('div',{class:'notice',style:'display:none'});
    const paso2 = h('div',{class:'stack',style:'display:none'});
    let dxOk = false;
    c.dx.forEach((o,i) => body.append(h('button',{class:'opt',onclick:function(){
      if (dxOk) return;
      if (o.ok){ dxOk = true; this.classList.add('ok'); fb.className = 'notice ok';
        fb.innerHTML = '<b>Diagnóstico correcto.</b> Ahora justifícalo con lo que viste en la imagen.'; fb.style.display = 'flex'; paso2.style.display = ''; }
      else { errores++; aciertoCaso = false; this.classList.add('bad'); fb.className = 'notice warn'; fb.innerHTML = `<b>Aún no.</b> ${esc(o.fb)}`; fb.style.display = 'flex'; }
      Store.log('respuesta',{ pregunta:`diagnostico-${c.id}`, opcion:i, correcto:!!o.ok });
    }}, h('span',{class:'k'},String.fromCharCode(65+i)), o.t)));
    body.append(fb, paso2);
    paso2.append(h('p',{style:'font-weight:600;margin-top:6px'},'2. ¿Qué observación de la imagen sostiene ese diagnóstico?'));
    const fb2 = h('div',{class:'notice',style:'display:none'});
    let jOk = false;
    c.just.forEach((o,i) => paso2.append(h('button',{class:'opt',onclick:function(){
      if (jOk) return;
      if (o.ok){ jOk = true; this.classList.add('ok'); fb2.className = 'notice ok';
        fb2.innerHTML = `<b>Justificación correcta.</b> ${esc(c.expl)}`; fb2.style.display = 'flex';
        if (aciertoCaso) score++;
        hechos.push({ caso:c.id, limpio:aciertoCaso });
        Store.addNote('conclusion', `Diagnóstico celular · ${c.pac}: ${c.dx.find(d=>d.ok).t}. Observación: ${o.t}.`);
        paso2.append(h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{
          if (idx < MIS2_CASOS.length-1){ idx++; aciertoCaso = true; fase = 'clinica'; scope.setCaso(C()); render(); }
          else { fase = 'cierre'; render(); }
        }}, idx < MIS2_CASOS.length-1 ? 'Siguiente caso →' : 'Ver el informe final →'));
      } else { errores++; aciertoCaso = false; this.classList.add('bad'); fb2.className = 'notice warn'; fb2.innerHTML = `<b>Aún no.</b> ${esc(o.fb)}`; fb2.style.display = 'flex'; }
      Store.log('respuesta',{ pregunta:`justificacion-${c.id}`, opcion:i, correcto:!!o.ok });
    }}, h('span',{class:'k'},String.fromCharCode(65+i)), o.t)));
    paso2.append(fb2);
  }

  function renderCierre(){
    resuelto = true; renderPasos();
    const total = MIS2_CASOS.length;
    body.append(h('span',{class:'eyebrow mis'},'Informe final'), h('h3',{},'Los cuatro casos resueltos'));
    body.append(h('ul',{class:'mis2-ev'}, MIS2_CASOS.map(c => {
      const r = hechos.find(x => x.caso === c.id), limpio = !!(r && r.limpio);
      return h('li',{}, h('b',{},`${c.em} ${c.pac}`),
        h('div',{style:'font-weight:600'}, c.dx.find(d => d.ok).t),
        h('span',{class:'pill '+(limpio?'ok':'warn'),style:'margin-top:4px;display:inline-block'},
          limpio ? 'Resuelto sin errores' : 'Resuelto con correcciones'));
    })));
    body.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},'La idea que une los cuatro casos: '),'la célula deja huellas visibles de lo que le pasa. Un cambio de forma, de tamaño, de color o de proporción entre tipos celulares no es un detalle estético: es la manifestación de un mecanismo. Diagnosticar es leer esa huella y poder decir, con la imagen delante, por qué.')));
    if (!finBody){
      finBody = true;
      const min = Math.max(1, Math.round((Date.now()-startAt)/60000));
      const first = !Store.s.activities[ACT]?.done;
      Store.completeActivity(ACT, { score:`${score}/${total}`, attempts:errores, duracionMin:min });
      Store.log('mision_completada',{ mision:'diagnostico-celular', score, errores });
      body.append(h('div',{class:'notice ok'}, h('span',{}, h('b',{},`Misión completada · ${score}/${total} casos resueltos sin errores · ${errores === 1 ? '1 corrección' : errores + ' correcciones'}.`), first ? ' Has ganado 120 XP.' : '')));
    } else body.append(h('div',{class:'notice ok'},`Misión completada · ${score}/${total}.`));
    body.append(h('div',{class:'row'},
      h('a',{class:'btn primary',href:'#/microscopio'},'Ir al microscopio virtual'),
      h('a',{class:'btn',href:'#/mision/salva-celula'},'Misión: Salva la célula'),
      h('a',{class:'btn ghost',href:'#/progreso'},'Ver mi progreso')));
  }

  scope.setCaso(C());
  render();
  return { unmount(){ scope.dispose(); scope._off(); } };
});
</script>
