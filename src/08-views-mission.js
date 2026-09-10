<script>
/* =====================================================================
   MISIONES · MISIÓN: EL VIAJE DE UN GLÓBULO ROJO
   ===================================================================== */
route('/misiones', (view) => {
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow mis'},'Misiones biológicas'), h('h1',{},'Usa lo que sabes para resolver algo'), h('p',{},'Cada misión exige aplicar conocimientos: seguir un recorrido, diagnosticar, predecir. No basta con recordar.'))));
  const g = h('div',{class:'grid g3'});
  BIO.missions.forEach(m => { const done = m.id==='globulo-rojo' && Store.s.activities['mision-globulo']?.done; g.append(h('a',{class:`tile ${m.dominio}`,href: m.disponible?`#/mision/${m.id}`:'#/misiones',onclick: m.disponible?null:(e)=>{e.preventDefault(); toast('Misión planificada para la fase 2.');}}, h('span',{class:'ico'},m.em), h('h3',{},m.t), h('p',{},m.d), h('div',{class:'row small muted',style:'margin-top:auto'}, h('span',{},m.dur), h('span',{},'·'), h('span',{},`+${m.xp} XP`), h('span',{},'·'), h('span',{},`Unidad ${m.unidad}`)), done ? h('span',{class:'pill ok soon'},'Completada') : m.disponible ? h('span',{class:'pill mis soon'},'Disponible') : h('span',{class:'pill soon'},'Fase 2'))); });
  view.append(g);
});

const RBC_STATIONS = [
  { id:'tejidos', n:'Tejidos', sat:75, view:'tissue', t:'Estás dentro de un glóbulo rojo en un capilar del músculo de la pierna. Acabas de entregar oxígeno a las células musculares y has recogido el dióxido de carbono que producen sus mitocondrias. Tu hemoglobina lleva ahora poco O₂: la sangre es oscura.', q:{ q:'¿De dónde proviene el CO₂ que acaba de recoger el glóbulo rojo?', ops:['Del aire que entra por la piel','De la respiración celular en las mitocondrias','De la digestión de los alimentos en el intestino'], ok:1, fb:'Las mitocondrias oxidan la glucosa para obtener ATP y liberan CO₂ como producto; ese CO₂ difunde a la sangre.', wrong:['La piel humana no realiza intercambio gaseoso significativo. Piensa en qué proceso celular produce CO₂.','La digestión no produce CO₂ directamente; el CO₂ aparece cuando la célula usa los nutrientes para obtener energía.'] } },
  { id:'venas', n:'Venas', sat:75, focus:'vena-cava-inferior', r:7, t:'Los capilares se reúnen en vénulas y luego en venas cada vez más grandes. La presión es muy baja aquí; las válvulas venosas y la contracción de los músculos de la pierna te empujan hacia arriba, contra la gravedad.', q:{ q:'¿Qué impide que la sangre de las venas de las piernas retroceda hacia abajo?', ops:['La fuerza de bombeo directa del corazón','Las válvulas venosas y la compresión de los músculos','La gravedad'], ok:1, fb:'La presión que llega a las venas es mínima. Las válvulas solo permiten el flujo hacia el corazón y los músculos actúan como una bomba al contraerse.', wrong:['El corazón bombea, pero la presión ya casi se ha agotado cuando la sangre llega a las venas de las piernas.','La gravedad empuja la sangre hacia abajo: es justo el problema que las válvulas resuelven.'] } },
  { id:'vena-cava', n:'Vena cava', sat:75, focus:'vena-cava-inferior', r:6, t:'Entras en la vena cava inferior, la vena más ancha del cuerpo. Aquí se junta toda la sangre desoxigenada de la mitad inferior del cuerpo. La vena cava superior trae la de la cabeza y los brazos. Ambas desembocan en la misma cámara.' },
  { id:'ad', n:'Aurícula derecha', sat:75, focus:'auricula-derecha', r:6, t:'Llegas a la aurícula derecha. Sus paredes son delgadas. Sientes un pequeño impulso: el nodo sinoauricular acaba de disparar y la aurícula se contrae.', dec:{ q:'La aurícula se contrae. ¿Hacia dónde continúa el glóbulo rojo?', ops:[ {t:'Al ventrículo derecho, atravesando la válvula tricúspide', ok:true}, {t:'A la aurícula izquierda, a través del tabique', fb:'Aún no. El tabique interauricular separa por completo ambas aurículas después del nacimiento: la sangre pobre en oxígeno nunca pasa directamente al lado izquierdo. Observa que debajo de la aurícula hay un ventrículo.'}, {t:'Directamente a la arteria pulmonar', fb:'Todavía no. La aurícula no tiene fuerza para enviar la sangre a los pulmones; esa tarea corresponde al ventrículo derecho, que está justo debajo.'} ] } },
  { id:'vd', n:'Ventrículo derecho', sat:75, focus:'ventriculo-derecho', r:6, t:'Estás en el ventrículo derecho. La válvula tricúspide se cierra detrás de ti (primer ruido cardíaco) y la pared muscular se contrae con fuerza moderada: los pulmones están muy cerca y no hace falta mucha presión.', dec:{ q:'El ventrículo derecho se contrae. ¿Por qué vaso sale el glóbulo rojo?', ops:[ {t:'Por la aorta', fb:'No. La aorta nace del ventrículo izquierdo. El tabique interventricular impide el paso entre ventrículos; el derecho tiene su propia salida.'}, {t:'Por la arteria pulmonar', ok:true}, {t:'De regreso por la vena cava', fb:'No. Las venas cavas traen sangre hacia el corazón y la válvula tricúspide se cierra durante la contracción justamente para evitar el retroceso.'} ] } },
  { id:'ap', n:'Arteria pulmonar', sat:75, focus:'arteria-pulmonar', r:6, t:'Atraviesas la válvula pulmonar y entras en el tronco pulmonar, que se divide en dos: una arteria para cada pulmón. Sigues llevando poco oxígeno.', q:{ q:'La arteria pulmonar transporta sangre…', ops:['rica en oxígeno, como todas las arterias','pobre en oxígeno, aunque es una arteria'], ok:1, fb:'Arteria significa "sale del corazón", no "lleva oxígeno". La arteria pulmonar es la excepción que confirma la regla: sale del corazón con sangre desoxigenada rumbo a los pulmones.', wrong:['Revisa el color con que se representa este vaso en el modelo: sale del ventrículo derecho con la misma sangre que llegó por las venas cavas.'] } },
  { id:'pulmones', n:'Pulmones · intercambio gaseoso', sat:75, view:'lung', t:'Estás en un capilar pulmonar, pegado a un alvéolo. Solo una capa de células te separa del aire recién inspirado, rico en O₂ y pobre en CO₂. Los gases se mueven por difusión: de donde hay más hacia donde hay menos.' },
  { id:'vp', n:'Venas pulmonares', sat:98, focus:'venas-pulmonares', r:6, t:'Sales del pulmón por una de las cuatro venas pulmonares con la hemoglobina casi saturada (≈98 %). La sangre es ahora de color rojo brillante. Son las únicas venas que transportan sangre oxigenada.' },
  { id:'ai', n:'Aurícula izquierda', sat:98, focus:'auricula-izquierda', r:6, t:'Llegas a la aurícula izquierda. Se contrae a la vez que la derecha: ambos lados del corazón laten sincronizados, aunque manejan sangre distinta.', dec:{ q:'¿Qué válvula debe atravesar el glóbulo rojo para llegar al ventrículo izquierdo?', ops:[ {t:'La válvula tricúspide', fb:'No. La tricúspide está en el lado derecho (truco: "tri" y "derecha" comparten la letra r… y la tricúspide siempre está a la derecha). En el lado izquierdo la válvula tiene dos valvas.'}, {t:'La válvula mitral (bicúspide)', ok:true}, {t:'La válvula aórtica', fb:'No. La aórtica está a la salida del ventrículo izquierdo, no a su entrada. Primero hay que entrar al ventrículo.'} ] } },
  { id:'vi', n:'Ventrículo izquierdo', sat:98, focus:'ventriculo-izquierdo', r:6, t:'Estás en la cámara más poderosa. Su pared es hasta tres veces más gruesa que la del ventrículo derecho. Cuando se contrae genera unos 120 mmHg: suficiente para llevarte hasta los dedos de los pies o al cerebro.', q:{ q:'¿Por qué el ventrículo izquierdo necesita una pared tan gruesa?', ops:['Porque bombea más sangre por latido que el derecho','Porque debe generar más presión: el circuito hacia todo el cuerpo es largo y resistente','Porque el ventrículo izquierdo late más rápido'], ok:1, fb:'Ambos ventrículos expulsan el mismo volumen por latido y laten al mismo ritmo; la diferencia es la presión necesaria para recorrer todo el cuerpo.', wrong:['Ambos ventrículos bombean el mismo volumen; si no, la sangre se acumularía en un circuito.','Ambos ventrículos laten simultáneamente y al mismo ritmo.'] } },
  { id:'aorta', n:'Aorta', sat:98, focus:'aorta', r:7, t:'La válvula aórtica se abre y sales disparado a la aorta. Sus paredes elásticas se distienden con cada latido y se retraen después, manteniendo el flujo continuo. Desde el arco aórtico salen ramas hacia la cabeza y los brazos; la aorta descendente reparte el resto.' },
  { id:'tejidos2', n:'Tejidos', sat:98, view:'tissue2', t:'Regresas a un capilar del músculo. Las células están usando O₂ en sus mitocondrias y produciendo CO₂. Entregas el oxígeno y recoges el CO₂. El ciclo empieza otra vez: el recorrido completo dura menos de un minuto en reposo.' }
];

route('/mision/globulo-rojo', (view) => {
  const S = Object.fromEntries(BIO.heart.structures.map(s=>[s.id,s]));
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{}, h('span',{class:'eyebrow mis'},'Misión biológica · Unidad 6'), h('h1',{},'El viaje de un glóbulo rojo'), h('p',{},'Objetivo: comprender cómo interactúan los sistemas circulatorio y respiratorio siguiendo a un eritrocito por la circulación doble.')), h('span',{class:'pill mis'},'+150 XP · 15–20 min')));
  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'mission'}, stage, panel));
  let E=null, M=null, idx=0, errors=0, answered=false, finished=false, quizSel=null, startAt=Date.now();
  const overlay = h('div',{style:'position:absolute;inset:0;display:none;padding:18px;background:var(--bg-2);overflow:auto;z-index:2'});
  if (webglOK){ try { E = new Engine3D(stage, { radius:11, phi:1.3, theta:0.35, target:[0,0.5,0], onSelect:(id)=>{ if (quizSel && id) quizSel(id); } }); M = buildHeart(E); M.setOpacity(0.5); M.setFlow(true); M.setBeat(true); } catch(e){ E=null; } }
  stage.append(overlay);
  if (!E) stage.append(heart2D((id)=>{ if (quizSel) quizSel(id); }));
  stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Modelo simplificado con fines educativos')));
  const routeEl = h('div',{class:'route'}); const body = h('div',{class:'stack'});
  panel.append(h('div',{class:'card stack'}, routeEl, body));
  function rbcBox(sat){ const col = sat>90 ? 'var(--oxy)' : 'var(--deoxy)'; return h('div',{class:'rbc',style:`--rbc:${col}`}, h('div',{class:'cell3'}), h('div',{style:'flex:1'}, h('div',{class:'row',style:'justify-content:space-between'}, h('b',{},'Glóbulo rojo'), h('span',{class:'sat'},`Saturación de O₂: ${sat} %`)), h('div',{class:'o2bar'}, h('i',{style:`left:${sat}%`})), h('div',{class:'small muted'},sat>90?'Hemoglobina cargada de O₂ · sangre rojo brillante':'Hemoglobina con poco O₂ · transporta CO₂ · sangre oscura'))); }
  function renderRoute(){ routeEl.innerHTML=''; RBC_STATIONS.forEach((s,i)=>routeEl.append(h('span',{class: i<idx?'done': i===idx&&!finished?'now':''},s.n.split(' ·')[0]))); }
  function show(){
    renderRoute(); body.innerHTML=''; answered=false; quizSel=null;
    if (finished) return final();
    const st = RBC_STATIONS[idx]; Store.log('mision_paso',{mision:'globulo-rojo',paso:st.id,indice:idx});
    if (st.view){ overlay.style.display=''; overlay.innerHTML=''; overlay.append(st.view==='lung'?lungPanel():tissuePanel(st.view==='tissue2')); if (E) E.select(null); }
    else { overlay.style.display='none'; if (E){ E.select(st.focus); E.focus(V3(S[st.focus].pos), st.r||6); } }
    body.append(h('div',{class:'row',style:'justify-content:space-between'}, h('span',{class:'eyebrow mis'},`Estación ${idx+1} de ${RBC_STATIONS.length}`), h('span',{class:'mono small muted'},`${errors} errores`)), h('h3',{},st.n), rbcBox(st.sat), h('p',{style:'font-size:.92rem'},st.t));
    const next = h('button',{class:'btn primary',style:'align-self:flex-start;display:none',onclick:()=>{ idx++; if (idx>=RBC_STATIONS.length) finished=true; show(); }}, idx===RBC_STATIONS.length-1?'Ver esquema global':'Continuar →');
    const ready = () => { next.style.display=''; next.focus(); };
    if (st.dec){ const box = h('div',{class:'stack'}, h('p',{style:'font-weight:600'},st.dec.q)); const fb = h('div',{class:'notice',style:'display:none'}); let done=false;
      st.dec.ops.forEach((o,i)=>box.append(h('button',{class:'opt',onclick:function(){ if (done) return; if (o.ok){ done=true; this.classList.add('ok'); fb.className='notice ok'; fb.innerHTML='<b>Correcto.</b> Continúa el recorrido.'; fb.style.display='flex'; ready(); } else { errors++; this.classList.add('bad'); fb.className='notice warn'; fb.innerHTML=esc(o.fb); fb.style.display='flex'; renderRoute(); } Store.log('respuesta',{pregunta:st.dec.q,opcion:i,correcto:!!o.ok}); }}, h('span',{class:'k'},String.fromCharCode(65+i)), o.t)));
      box.append(fb); body.append(box); }
    else if (st.q){ body.append(quizBlock(st.q, attempts => { errors += attempts-1; renderRoute(); ready(); })); }
    else if (st.view==='lung'){ body.append(h('div',{class:'notice info'},'Completa el intercambio gaseoso en el panel del alvéolo (izquierda) para continuar.')); overlay._ready = ready; }
    else if (st.view==='tissue2'){ body.append(h('div',{class:'notice info'},'Entrega el O₂ y recoge el CO₂ en el panel del tejido para continuar.')); overlay._ready = ready; }
    else ready();
    body.append(next);
  }
  function alveoloSVG(){ return `<svg viewBox="0 0 420 240" role="img" aria-label="Alvéolo y capilar pulmonar">
    <defs><clipPath id="cap"><rect x="0" y="150" width="420" height="60"/></clipPath></defs>
    <circle cx="210" cy="80" r="70" fill="var(--bg-3)" stroke="var(--line-2)" stroke-width="2"/>
    <text x="210" y="60" text-anchor="middle" font-size="12" fill="var(--ink-2)" font-weight="600">Alvéolo (aire)</text>
    <text x="210" y="80" text-anchor="middle" font-size="11" fill="var(--ink-3)">O₂ alto · CO₂ bajo</text>
    <text x="210" y="98" text-anchor="middle" font-size="10" fill="var(--ink-3)">pared de 1 célula</text>
    <rect x="0" y="150" width="420" height="60" rx="30" fill="var(--anat-soft)" stroke="var(--line-2)"/>
    <text x="14" y="200" font-size="11" fill="var(--ink-3)">capilar →</text>
    <g id="mo2" style="opacity:0"><text x="150" y="130" font-size="12" fill="var(--oxy)" font-weight="700">O₂ ↓</text><text x="172" y="130" font-size="12" fill="var(--oxy)" font-weight="700">O₂ ↓</text><text x="194" y="130" font-size="12" fill="var(--oxy)" font-weight="700">O₂ ↓</text></g>
    <g id="mco2" style="opacity:0"><text x="230" y="130" font-size="12" fill="var(--deoxy)" font-weight="700">CO₂ ↑</text><text x="262" y="130" font-size="12" fill="var(--deoxy)" font-weight="700">CO₂ ↑</text></g>
    <circle id="rbc-svg" cx="210" cy="180" r="20" fill="var(--deoxy)" stroke="var(--ink)" stroke-width="2" style="transition:fill .6s"/>
    <text x="210" y="228" text-anchor="middle" font-size="11" fill="var(--ink-3)">glóbulo rojo</text>
  </svg>`; }
  function lungPanel(){
    let o2=false, co2=false, predicted=false;
    const wrap = h('div',{class:'alveolo stack'}, h('div',{html:alveoloSVG()}));
    const pred = h('div',{class:'stack'}, h('p',{style:'font-weight:600'},'Antes de actuar, predice: ¿en qué dirección se moverá el O₂?'));
    const pfb = h('div',{class:'notice',style:'display:none'});
    [['Del alvéolo hacia la sangre, porque en el alvéolo hay más O₂',true],['De la sangre hacia el alvéolo, porque la sangre lo bombea',false],['En ambas direcciones por igual',false]].forEach(([t,ok],i)=>pred.append(h('button',{class:'opt',onclick:function(){ if (predicted) return; predicted=true; this.classList.add(ok?'ok':'bad'); pfb.className='notice '+(ok?'ok':'warn'); pfb.innerHTML = ok ? '<b>Correcto.</b> La difusión va de mayor a menor concentración. Ahora ejecútalo.' : '<b>Aún no.</b> Los gases no se bombean: difunden desde donde hay más hacia donde hay menos. En el alvéolo hay más O₂ que en la sangre venosa. Compruébalo ahora.'; pfb.style.display='flex'; if(!ok) errors++; btns.style.display=''; Store.log('prediccion',{escenario:'difusion-o2',correcto:ok}); }}, h('span',{class:'k'},String.fromCharCode(65+i)), t)));
    pred.append(pfb);
    const b1 = h('button',{class:'gas-btn',onclick:()=>{ if (o2) return; o2=true; b1.classList.add('done'); $('#mo2',wrap).style.opacity=1; if (co2) $('#rbc-svg',wrap).setAttribute('fill','var(--oxy)'); check(); }},'Captar O₂ ← alvéolo');
    const b2 = h('button',{class:'gas-btn',onclick:()=>{ if (co2) return; co2=true; b2.classList.add('done'); $('#mco2',wrap).style.opacity=1; if (o2) $('#rbc-svg',wrap).setAttribute('fill','var(--oxy)'); check(); }},'Liberar CO₂ → alvéolo');
    const btns = h('div',{class:'row',style:'display:none'}, b1, b2);
    const res = h('div',{class:'notice ok',style:'display:none'}, h('span',{}, h('b',{},'Intercambio completo. '),'La hemoglobina pasó de ~75 % a ~98 % de saturación. El CO₂ liberado saldrá en la próxima espiración. Esto ocurre en ~0,25 s, en cada uno de los ~300 millones de alvéolos.'));
    function check(){ if (o2 && co2){ $('#rbc-svg',wrap).setAttribute('fill','var(--oxy)'); res.style.display='flex'; Store.log('mision_evento',{evento:'intercambio_gaseoso_completo'}); overlay._ready && overlay._ready(); } }
    wrap.append(pred, btns, res);
    return wrap;
  }
  function tissuePanel(deliver){
    const wrap = h('div',{class:'stack'});
    wrap.append(h('div',{html:`<svg viewBox="0 0 420 220" role="img" aria-label="Capilar y célula muscular">
      <rect x="0" y="20" width="420" height="56" rx="28" fill="var(--anat-soft)" stroke="var(--line-2)"/><text x="14" y="55" font-size="11" fill="var(--ink-3)">capilar →</text>
      <circle id="rbc-t" cx="210" cy="48" r="20" fill="${deliver?'var(--oxy)':'var(--deoxy)'}" stroke="var(--ink)" stroke-width="2" style="transition:fill .6s"/>
      <rect x="60" y="110" width="300" height="90" rx="14" fill="var(--bg-3)" stroke="var(--line-2)"/><text x="210" y="135" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink-2)">Célula muscular</text>
      <ellipse cx="150" cy="168" rx="26" ry="12" fill="#E07A4F"/><ellipse cx="270" cy="168" rx="26" ry="12" fill="#E07A4F"/><text x="210" y="172" text-anchor="middle" font-size="10" fill="var(--ink-3)">mitocondrias</text>
      <g id="t-o2" style="opacity:${deliver?0:1}"><text x="170" y="98" font-size="12" fill="var(--oxy)" font-weight="700">O₂ ↓</text></g>
      <g id="t-co2" style="opacity:${deliver?0:1}"><text x="235" y="98" font-size="12" fill="var(--deoxy)" font-weight="700">CO₂ ↑</text></g></svg>`}));
    if (!deliver){ wrap.append(h('div',{class:'notice'},'Las mitocondrias de la célula muscular consumen O₂ y producen CO₂ y ATP (respiración celular). El glóbulo rojo entrega O₂ y recoge CO₂.')); return wrap; }
    let a=false,b=false;
    const b1 = h('button',{class:'gas-btn',onclick:()=>{ a=true; b1.classList.add('done'); $('#t-o2',wrap).style.opacity=1; done(); }},'Entregar O₂ → célula');
    const b2 = h('button',{class:'gas-btn',onclick:()=>{ b=true; b2.classList.add('done'); $('#t-co2',wrap).style.opacity=1; done(); }},'Recoger CO₂ ← célula');
    const res = h('div',{class:'notice ok',style:'display:none'}, h('span',{}, h('b',{},'Ciclo completo. '),'La saturación baja a ~75 % y el glóbulo rojo vuelve a las venas. Durante el ejercicio el músculo extrae más O₂ y la saturación venosa puede bajar mucho más.'));
    function done(){ if (a&&b){ $('#rbc-t',wrap).setAttribute('fill','var(--deoxy)'); res.style.display='flex'; overlay._ready && overlay._ready(); } }
    wrap.append(h('p',{class:'small',style:'font-weight:600'},'¿Qué hace aquí el glóbulo rojo?'), h('div',{class:'row'},b1,b2), res, h('a',{class:'btn sm',href:'#/explorar/celula?s=mitocondria&accion=1'},'Ver la mitocondria en acción'));
    return wrap;
  }
  function schemeSVG(){
    const nodes = RBC_STATIONS.slice(0,11).map(s=>s.n.split(' ·')[0]); const cx=230, cy=200, R=150; const N = nodes.length;
    let paths='', labels='';
    for (let i=0;i<N;i++){ const a0 = -Math.PI/2 + i/N*Math.PI*2, a1 = -Math.PI/2 + (i+1)/N*Math.PI*2; const x0=cx+R*Math.cos(a0), y0=cy+R*Math.sin(a0), x1=cx+R*Math.cos(a1), y1=cy+R*Math.sin(a1); const oxy = i>=7; paths += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${oxy?'var(--oxy)':'var(--deoxy)'}" stroke-width="10" stroke-linecap="butt"/>`;
      const lx = cx + (R+34)*Math.cos(a0), ly = cy + (R+34)*Math.sin(a0); const anchor = Math.cos(a0) > 0.3 ? 'start' : Math.cos(a0) < -0.3 ? 'end' : 'middle'; labels += `<circle cx="${x0.toFixed(1)}" cy="${y0.toFixed(1)}" r="7" fill="var(--bg-2)" stroke="var(--ink)" stroke-width="2"/><text x="${lx.toFixed(1)}" y="${(ly+4).toFixed(1)}" text-anchor="${anchor}" font-size="11" font-weight="600" fill="var(--ink)">${i+1}. ${nodes[i]}</text>`; }
    return `<svg viewBox="0 0 460 400" role="img" aria-label="Esquema global de la circulación doble">${paths}${labels}<text x="${cx}" y="${cy-14}" text-anchor="middle" font-size="12" fill="var(--ink-3)">circuito pulmonar (1–7)</text><text x="${cx}" y="${cy+6}" text-anchor="middle" font-size="12" fill="var(--ink-3)">circuito sistémico (8–11)</text><text x="${cx}" y="${cy+28}" text-anchor="middle" font-size="10" fill="var(--ink-3)">azul: pobre en O₂ · rojo: rico en O₂</text></svg>`;
  }
  function final(){
    overlay.style.display='none'; if (E){ E.select(null); E.resetView(); }
    body.append(h('span',{class:'eyebrow mis'},'Recorrido completo'), h('h3',{},'Esquema global del viaje'), h('div',{class:'scheme',html:schemeSVG()}), h('p',{class:'small muted'},'La circulación es doble (pulmonar y sistémica) y completa: la sangre pasa dos veces por el corazón en cada vuelta y nunca se mezcla la oxigenada con la desoxigenada.'));
    body.append(h('h3',{style:'margin-top:8px'},'Evaluación breve'));
    let score=0; const total=3;
    // 1. Ordenar
    const order = ['Vena cava','Aurícula derecha','Ventrículo derecho','Arteria pulmonar','Pulmones','Venas pulmonares','Aurícula izquierda','Ventrículo izquierdo','Aorta'];
    const why = {'Aurícula derecha':'las venas cavas desembocan en la aurícula derecha','Ventrículo derecho':'la aurícula derecha envía la sangre al ventrículo derecho','Arteria pulmonar':'el ventrículo derecho impulsa la sangre a la arteria pulmonar','Pulmones':'la arteria pulmonar lleva la sangre a los pulmones','Venas pulmonares':'la sangre oxigenada sale de los pulmones por las venas pulmonares','Aurícula izquierda':'las venas pulmonares desembocan en la aurícula izquierda','Ventrículo izquierdo':'la aurícula izquierda pasa la sangre al ventrículo izquierdo','Aorta':'el ventrículo izquierdo expulsa la sangre a la aorta'};
    let pos=0, oErr=0; const chips = h('div',{class:'row'}), seq = h('div',{class:'row small mono muted'},'→ '); const q1fb = h('div',{class:'notice',style:'display:none'});
    order.slice().sort(()=>Math.random()-0.5).forEach(n => chips.append(h('button',{class:'chip',onclick:function(){ if (this.classList.contains('ok')) return; if (n===order[pos]){ this.classList.add('ok'); seq.append(document.createTextNode(n+' → ')); pos++; if (pos===order.length){ q1fb.className='notice ok'; q1fb.textContent = oErr===0 ? 'Secuencia perfecta.' : `Secuencia completada con ${oErr} error(es).`; q1fb.style.display='flex'; if (oErr===0) score++; q2(); } } else { oErr++; this.classList.add('bad'); setTimeout(()=>this.classList.remove('bad'),700); q1fb.className='notice warn'; q1fb.textContent = `Aún no. Después de "${order[pos-1]||'los tejidos'}" viene "${order[pos]}", porque ${why[order[pos]]||'la sangre regresa al corazón por las venas cavas'}.`; q1fb.style.display='flex'; } Store.log('respuesta',{pregunta:'ordenar-recorrido',opcion:n,correcto:n===order[pos-1]}); }}, n)));
    body.append(h('div',{class:'stack card',style:'padding:14px'}, h('b',{},'1. Ordena el recorrido'), h('p',{class:'small muted'},'Selecciona las estaciones en el orden correcto, empezando por la que sigue a los tejidos.'), chips, seq, q1fb));
    const q2box = h('div',{class:'stack card',style:'padding:14px;display:none'}); const q3box = h('div',{class:'stack card',style:'padding:14px;display:none'}); body.append(q2box, q3box);
    function q2(){ q2box.style.display=''; let att=0; const fb = h('div',{class:'notice',style:'display:none'}); q2box.append(h('b',{},'2. Selecciona en el modelo'), h('p',{},'Haz clic en el modelo 3D sobre la cámara que recibe la sangre de las venas pulmonares.'), fb);
      quizSel = id => { att++; if (id==='auricula-izquierda'){ fb.className='notice ok'; fb.textContent='Correcto: la aurícula izquierda.'; fb.style.display='flex'; if (att===1) score++; quizSel=null; E && E.select(id); q3(); } else { fb.className='notice warn'; fb.textContent=`Aún no. Has seleccionado ${S[id].nombre}. Las venas pulmonares traen sangre oxigenada desde los pulmones y desembocan en una cámara superior del lado izquierdo.`; fb.style.display='flex'; } Store.log('respuesta',{pregunta:'seleccion-3d-auricula-izquierda',opcion:id,correcto:id==='auricula-izquierda',intento:att}); }; }
    function q3(){ q3box.style.display=''; let picked=null; const ta = h('textarea',{placeholder:'Argumenta tu respuesta (mínimo 30 caracteres)…','aria-label':'Argumento'}); const fb = h('div',{class:'notice',style:'display:none'});
      const vf = h('div',{class:'row'}, ['Verdadero','Falso'].map((t,i)=>h('button',{class:'chip',onclick:function(){ picked=i; $$('button',vf).forEach(b=>b.classList.remove('picked')); this.classList.add('picked'); }},t)));
      q3box.append(h('b',{},'3. Verdadero o falso, con argumento'), h('p',{},'"La sangre que sale del ventrículo derecho es rica en oxígeno."'), vf, ta, h('button',{class:'btn sm primary',style:'align-self:flex-start',onclick:()=>{ if (picked===null) return toast('Elige verdadero o falso.'); if (ta.value.trim().length<30) return toast('Desarrolla tu argumento (mínimo 30 caracteres).'); const ok = picked===1; if (ok) score++; fb.className='notice '+(ok?'ok':'warn'); fb.innerHTML = (ok?'<b>Correcto: es falso.</b> ':'<b>Aún no: es falso.</b> ') + 'El ventrículo derecho recibe la sangre que regresó de los tejidos por las venas cavas, pobre en O₂, y la envía a los pulmones para oxigenarla. Compara tu argumento: ¿mencionaste las venas cavas, los pulmones o el intercambio gaseoso?'; fb.style.display='flex'; Store.addNote('conclusion','V/F argumentado (misión glóbulo rojo): "'+ta.value.trim()+'"'); Store.log('respuesta_abierta',{actividad:'mision-globulo',longitud:ta.value.length,vf:picked,correcto:ok}); finish(); }},'Comprobar'), fb); }
    function finish(){ const min = Math.round((Date.now()-startAt)/60000); const first = !Store.s.activities['mision-globulo']?.done; Store.completeActivity('mision-globulo',{score:`${score}/${total}`, attempts:errors, duracionMin:min}); Store.grantBadge('viajero'); body.append(h('div',{class:'notice ok'}, h('span',{}, h('b',{},`Misión completada · ${score}/${total} en la evaluación · ${errors} errores durante el recorrido.`), first?' Has ganado 150 XP y la insignia Viajero sanguíneo.':'', ' Continúa con el simulador cardiorrespiratorio para ver qué ocurre durante el ejercicio.')), h('div',{class:'row'}, h('a',{class:'btn primary',href:'#/simuladores/circulacion'},'Ir al simulador'), h('a',{class:'btn',href:'#/progreso'},'Ver mi progreso'))); }
  }
  show();
  return { unmount(){ E && E.dispose(); } };
});
</script>
