<script>
/* =====================================================================
   VISTAS: Inicio, Panel del estudiante, Áreas de Ciencias Naturales
   ===================================================================== */
const DOM = { anat:{n:'Cuerpo humano y salud',em:'🫀'}, cell:{n:'Mundo celular',em:'🔬'}, gen:{n:'Genética y evolución',em:'🧬'}, eco:{n:'Biodiversidad y ecosistemas',em:'🌎'}, lab:{n:'Laboratorio',em:'🧪'}, mis:{n:'Misión',em:'🎯'} };
const SCALE = [['🧬','ADN','Molécula de ~2 nm de ancho que almacena la información genética.'],['🧩','Gen','Fragmento de ADN que codifica una proteína o un ARN funcional (cientos a miles de nucleótidos).'],['🎗️','Cromosoma','ADN muy compactado con proteínas; un ser humano tiene 46 (~µm).'],['⚡','Organelo','Estructura especializada dentro de la célula, como la mitocondria (~1 µm).'],['🔬','Célula','Unidad básica de la vida (10–100 µm).'],['🧱','Tejido','Grupo de células similares que cumplen una función (mm).'],['🫀','Órgano','Conjunto de tejidos con una función común, como el corazón (cm).'],['🫁','Sistema','Órganos que trabajan juntos: circulatorio, respiratorio…'],['🧍','Organismo','Un ser vivo completo (m).'],['👥','Población','Individuos de la misma especie en un lugar y tiempo.'],['🦜','Comunidad','Todas las poblaciones que conviven en un área.'],['🌳','Ecosistema','Comunidad + ambiente físico: Amazonía, manglar, páramo (km).'],['🌎','Biosfera','Todos los ecosistemas de la Tierra (miles de km).']];

/* ---------- utilidades de áreas ---------- */
const areaById = id => BIO.areas.find(a => a.id===id);
const areaPct = a => Math.round(a.unidades.reduce((t,u)=>t+Store.unitProgress(u),0)/a.unidades.length);
const areaRes = id => BIO.resources.filter(r => r.areas.includes(id));
const areaTags = (ids, skip) => h('span',{class:'area-tags'}, ids.filter(i=>i!==skip).map(i => { const a = areaById(i); return a ? h('span',{class:'pill '+a.dom},a.n) : null; }));
const retoDone = r => !!(r.act && Store.s.activities[r.act]?.done);
function resTile(r, ctxArea){
  const a = areaById(ctxArea && r.areas.includes(ctxArea) ? ctxArea : r.areas[0]); const dom = r.transversal ? (r.tipo==='Laboratorio'?'lab':a.dom) : a.dom;
  const done = retoDone(r);
  return h('a',{class:`tile res ${dom}`+(r.ok?'':' planned'), href:r.href, onclick: r.ok ? null : (e)=>{ if (r.href.includes('/explorar/celula')) { e.preventDefault(); toast(`${r.t}: en construcción. Por ahora explora la célula animal.`); } }},
    h('span',{class:'ico'},r.em),
    h('span',{class:'tipo'}, r.transversal ? r.tipo+' · transversal' : r.tipo),
    h('h3',{},r.t), h('p',{},r.d),
    r.reto ? h('div',{class:'res-reto'}, h('b',{}, done ? '✓ Reto resuelto' : (r.ok ? '🎯 Tu reto' : '🎯 Propósito')), h('span',{},r.reto)) : null,
    r.areas.length>1 ? areaTags(r.areas, ctxArea) : null,
    done ? h('span',{class:'pill ok soon'},'Completado') : r.ok ? h('span',{class:`pill ${dom} soon`},'Disponible') : h('span',{class:'pill soon'},'En construcción'));
}
const YEAR_TAG = { actual:'Tu año', repaso:'Repaso', proximo:'Más adelante' };
function areaTile(a){
  const rs = areaRes(a.id), ok = rs.filter(r=>r.ok).length, pr = areaPct(a); const st = Store.areaStatus(a);
  return h('a',{class:`tile area-tile ${a.dom} ${st}`, href:'#/area/'+a.id},
    h('span',{class:'yeartag '+st}, YEAR_TAG[st]),
    h('div',{class:'row',style:'justify-content:space-between;align-items:flex-start'}, h('span',{class:'ico'},a.em), h('span',{class:'mono small muted'}, a.unidades.map(u=>'U'+u).join(' · '))),
    h('h3',{},a.n), h('p',{},a.d),
    h('span',{class:'small muted',style:'margin-top:auto'}, `${ok} recurso${ok===1?'':'s'} disponible${ok===1?'':'s'}${rs.length-ok>0 ? ` · ${rs.length-ok} en construcción` : ''}`),
    h('div',{class:'row',style:'gap:10px;align-items:center'}, h('div',{class:`progress ${a.dom}`,style:'flex:1'}, h('i',{style:`width:${pr}%`})), h('span',{class:'mono small muted'},pr+'%')));
}
const ORDEN_ST = { actual:0, repaso:1, proximo:2 };
const areasOrdenadas = () => BIO.areas.slice().sort((a,b)=>ORDEN_ST[Store.areaStatus(a)]-ORDEN_ST[Store.areaStatus(b)]);
const TRANSV = [
  ['mis','🎯','Misiones','Casos que cruzan varias áreas: sigue a un glóbulo rojo, salva una célula…','#/misiones',['cuerpo','celular','genetica','biodiversidad']],
  ['lab','🧪','Laboratorios','Hipótesis, variables y datos. La fotosíntesis une célula y ecosistema.','#/laboratorio',['celular','biodiversidad']],
  ['anat','∿','Simuladores','Cambia una variable y observa el sistema completo responder.','#/simuladores',['cuerpo','celular']],
  ['cell','✓','Evaluación','Selección visual en 3D, ordenar, relacionar y argumentar.','#/evaluacion',['cuerpo']]
];
function transversalBand(){
  return h('section',{class:'transv'},
    h('div',{class:'transv-head'}, h('span',{class:'eyebrow'},'Transversal'), h('b',{},'Conecta las áreas'), h('span',{class:'small muted'},'Las misiones, los laboratorios y los simuladores no pertenecen a un solo tema: integran lo aprendido en varias áreas.')),
    h('div',{class:'transv-grid'}, TRANSV.map(([dom,em,t,d,href,ids]) => h('a',{class:'transv-item',href}, h('span',{class:'ico',style:`background:var(--${dom}-soft)`},em), h('span',{}, h('b',{},t), h('span',{class:'d'},d), h('span',{class:'dots'}, ids.map(i=>h('i',{class:'navdot '+areaById(i).dom,title:areaById(i).n}))))))));
}

/* ---------- Progresión pedagógica: primero se explora, después se explica ---------- */
const PROG = [
  {v:'Observar', s:'un corazón que late', d:'Antes de leer una sola definición, miras el corazón latir y la sangre moverse. La curiosidad aparece primero.', where:'Atlas 3D · vista general', href:'#/explorar/corazon'},
  {v:'Explorar', s:'rota, separa, amplía', d:'Rotas el modelo, separas capas y abres cada estructura "en detalle" para ver sus partes numeradas.', where:'Ver en detalle · capas', href:'#/explorar/corazon?s=ventriculo-izquierdo&detalle=1'},
  {v:'Preguntar', s:'¿por qué esta pared es más gruesa?', d:'Al comparar, surge una pregunta real. Cada recurso te plantea un propósito y un reto concreto que resolver.', where:'Propósito y reto del recurso', href:'#/explorar/corazon'},
  {v:'Manipular', s:'cambia variables', d:'Modificas la actividad física, la respiración o la altitud y observas cómo responde todo el sistema.', where:'Simulador cardiorrespiratorio', href:'#/simuladores/circulacion'},
  {v:'Comprender', s:'tres niveles de profundidad', d:'Recién ahora llega la explicación: básica, intermedia y avanzada, con conexiones a otros sistemas.', where:'Ficha de la estructura · niveles 1-2-3', href:'#/explorar/corazon?s=ventriculo-izquierdo'},
  {v:'Aplicar', s:'resuelve un caso', d:'Usas lo aprendido en una situación nueva: sigues a un glóbulo rojo por todo el cuerpo.', where:'Misión transversal', href:'#/mision/globulo-rojo'},
  {v:'Comprobar', s:'retroalimentación inmediata', d:'Demuestras lo que entendiste. Si fallas, recibes una pista específica, no solo "incorrecto".', where:'Reto y evaluación', href:'#/evaluacion/corazon'}
];
function progression(){
  let cur = 0, timer = null, user = false;
  const fill = h('div',{class:'prog-fill','aria-hidden':'true'}), track = h('ol',{class:'prog-track'}), rail = h('div',{class:'prog-rail'}, fill, track);
  const steps = PROG.map((p,i) => { const b = h('button',{class:'prog-step',onclick:()=>{ user=true; stop(); set(i); }}, h('span',{class:'dot'},String(i+1)), h('b',{},p.v), h('span',{class:'s'},p.s)); track.append(h('li',{},b)); return b; });
  const dN = h('span',{class:'eyebrow'}), dT = h('h3',{}), dD = h('p',{}), dW = h('span',{class:'pill'}), dA = h('a',{class:'btn sm primary'},'Verlo en el corazón →');
  const prev = h('button',{class:'btn sm ghost','aria-label':'Paso anterior',onclick:()=>{ user=true; stop(); set((cur+6)%7); }},'←'), next = h('button',{class:'btn sm ghost','aria-label':'Paso siguiente',onclick:()=>{ user=true; stop(); set((cur+1)%7); }},'→');
  const detail = h('div',{class:'prog-detail',role:'region','aria-label':'Detalle del paso','aria-live':'off'}, h('div',{class:'stack',style:'gap:6px;flex:1;min-width:220px'}, dN, dT, dD, h('div',{class:'row'}, dW, dA)), h('div',{class:'row',style:'gap:6px'}, prev, next));
  function set(i){ cur = i; const p = PROG[i];
    steps.forEach((b,j) => { b.classList.toggle('on', j===i); b.classList.toggle('past', j<i); b.setAttribute('aria-current', j===i ? 'step' : 'false'); });
    fill.style.setProperty('--f', (i/(PROG.length-1)));
    dN.textContent = `Paso ${i+1} de 7 · ${i<4 ? 'se explora' : 'se explica y se aplica'}`; dT.textContent = p.v; dD.textContent = p.d; dW.textContent = p.where; dA.href = p.href; }
  function stop(){ if (timer){ clearInterval(timer); timer = null; } if (user) detail.setAttribute('aria-live','polite'); }
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = h('section',{class:'prog'},
    h('div',{class:'prog-phases','aria-hidden':'true'}, h('span',{class:'ph1'},'Se explora'), h('span',{class:'ph2'},'Se explica y se aplica')),
    rail, detail);
  el.addEventListener('mouseenter', ()=>{ if (!user) stop(); });
  set(0); if (!reduce) timer = setInterval(()=>{ if (!document.hidden) set((cur+1)%7); }, 4200);
  return { el, stop };
}

route('/', (view, q) => {
  const p = Store.overall();
  view.innerHTML = '';
  const hero = h('section',{class:'hero'},
    h('div',{class:'grid-bg'}),
    h('div',{class:'hero-text'},
      h('span',{class:'eyebrow'},'ANAI Online · Ciencias Naturales · Bachillerato'),
      h('h1',{},'ANAI BioLab'),
      h('p',{class:'sub'},'Laboratorio Virtual de Biología'),
      h('p',{class:'msg'},'Explora la vida. Desde una molécula hasta un ecosistema.'),
      h('div',{class:'row',style:'margin-top:8px'},
        h('a',{class:'btn primary lg',href:'#/area/'+areasOrdenadas()[0].id},'Comenzar a explorar'),
        h('a',{class:'btn lg',href:'#/mision/globulo-rojo',style:'background:transparent;color:var(--hero-ink);border-color:rgba(159,179,204,.4)'},'Misión: el glóbulo rojo')),
      h('p',{class:'small',style:'color:var(--hero-ink-2)'},'No estudiar Biología solamente. Explorar la vida.')),
    h('div',{class:'hero-3d',id:'hero-3d'}, h('span',{class:'cap'},'corazón · modelo simplificado · arrastra para rotar')));
  view.append(hero);
  const wb = welcomeBack(view); if (wb) view.append(wb);
  // Áreas
  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'}, h('div',{}, h('span',{class:'eyebrow'},'Áreas de Biología · Bachillerato'), h('h2',{},'Cuatro grandes temas, todo el currículo')), h('a',{class:'btn sm',href:'#/explorar'},'Ver todos los recursos')));
  view.append(h('div',{class:'areas-grid'}, areasOrdenadas().map(areaTile)));
  view.append(transversalBand());
  // Progresión
  view.append(h('div',{class:'page-head',style:'margin-bottom:6px'}, h('div',{}, h('span',{class:'eyebrow'},'Cómo se aprende aquí'), h('h2',{},'Primero se explora; después se explica'), h('p',{},'Cada recurso sigue la misma progresión de siete pasos. Toca un paso para ver cómo se vive con el corazón.'))));
  const prog = progression(); view.append(prog.el);
  // Escala biológica
  const sc = h('section',{class:'scale',id:'escala'});
  let si = q.escala ? 4 : 0;
  const viz = h('div',{class:'scale-viz'}); const core = h('div',{class:'core'}); viz.append(core); [150,190,230].forEach((d,i)=>viz.append(h('div',{class:'ring',style:`width:${d}px;height:${d}px`})));
  const title = h('h3',{}), desc = h('p',{class:'muted',style:'font-size:.9rem'}), stepsEl = h('div',{class:'scale-steps'}), meta = h('div',{class:'mono small muted'});
  const setS = i => { si = i; const [em,t,d] = SCALE[i]; core.textContent = em; core.style.transform = `scale(${0.8 + i*0.035})`; title.textContent = `${i+1}. ${t}`; desc.textContent = d; meta.textContent = `nivel ${i+1} de 13`; $$('button',stepsEl).forEach((b,j)=>b.setAttribute('aria-pressed', j===i)); };
  SCALE.forEach((s,i)=>stepsEl.append(h('button',{'aria-pressed':false,onclick:()=>setS(i)},s[1])));
  const range = h('input',{type:'range',min:0,max:12,value:si,'aria-label':'Nivel de organización'}); range.addEventListener('input', ()=>setS(+range.value));
  sc.append(viz, h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Del ADN a la biosfera'), title, desc, range, stepsEl, meta));
  view.append(sc); setS(si);
  // Currículo por área
  view.append(h('div',{class:'page-head',style:'margin-bottom:10px'}, h('div',{}, h('span',{class:'eyebrow'},'Currículo · Biología BGU'), h('h2',{},'Diez unidades organizadas por área')), h('span',{class:'pill'},`Progreso general ${p} %`)));
  view.append(curriculum());
  view.append(h('p',{class:'small muted',style:'margin-top:26px;max-width:70ch'},'Prototipo MVP. Los modelos 3D son representaciones simplificadas con fines educativos, creadas para este proyecto y sustituibles por modelos anatómicos definitivos. Los datos de estudiantes son ficticios.'));
  // hero 3D
  let E=null;
  if (webglOK){ try { E = new Engine3D($('#hero-3d'), { interactive:true, autoRotate:true, radius:11.5, phi:1.38, theta:0.45, target:[0.2,0.5,0], dark:true, exposure:1.1, aria:'Corazón 3D decorativo en rotación' }); const m = buildHeart(E); m.setBeat(true); E.setLabels(false); } catch(e){ console.warn(e); } }
  else $('#hero-3d').append(h('div',{class:'ph',style:'margin:24px'},'Tu navegador no admite WebGL: el modelo 3D se sustituye por esquemas 2D en toda la plataforma.'));
  return { unmount(){ prog.stop(); E && E.dispose(); } };
});
function curriculum(){
  const unitRow = u => { const pr = Store.unitProgress(u.n); return h('div',{class:'unit'}, h('span',{class:'n'},'U'+u.n), h('span',{class:'t'},u.t), h('div',{class:'progress'},h('i',{style:`width:${pr}%`})), h('span',{class:'pct'},pr+'%')); };
  const box = h('div',{class:'curr'});
  BIO.areas.forEach(a => box.append(h('div',{class:`curr-area ${a.dom}`},
    h('a',{class:'curr-head',href:'#/area/'+a.id}, h('span',{class:'navdot '+a.dom}), h('b',{},a.n), h('span',{class:'pill'}, BIO.year(BIO.yearOfUnit(a.unidades[0])).corto), h('span',{class:'mono small muted',style:'margin-left:auto'},areaPct(a)+'%')),
    BIO.units.filter(u=>a.unidades.includes(u.n)).map(unitRow))));
  box.append(h('div',{class:'curr-area transversal'},
    h('a',{class:'curr-head',href:'#/misiones'}, h('span',{class:'navdot mis'}), h('b',{},'Transversal · problemas contemporáneos'), h('span',{class:'small muted',style:'margin-left:auto'},'misiones · laboratorios · simuladores')),
    BIO.units.filter(u=>BIO.transversalUnits.includes(u.n)).map(unitRow)));
  return box;
}

/* ---------- PANEL DEL ESTUDIANTE ---------- */
route('/panel', (view) => {
  if (Store.prog() === 'cn') { navigate('#/cn/progreso'); return; }   /* el panel es de Biología; Ciencias tiene el suyo */
  const s = Store.s, p = Store.overall(); const hr = new Date().getHours(); const saludo = hr<12?'Buenos días':hr<19?'Buenas tardes':'Buenas noches';
  const misAct = m => m.id==='globulo-rojo' ? 'mision-globulo' : 'mision-'+m.id;
  const pendientes = BIO.missions.filter(m => m.disponible && !s.activities[misAct(m)]?.done && (BIO.unitsOf(Store.year() || 1) || []).includes(m.unidad));
  /* Sugerencias del año del estudiante, en orden de unidad, sin las que ya resolvió */
  const unidadesAnio = BIO.unitsOf(Store.year() || 1) || [];
  const sug = Object.values(BIO.curriculo).filter(r => r.bio && r.act && r.tipo !== 'Misión' && unidadesAnio.includes(r.bio) && !s.activities[r.act]?.done)
    .sort((a,b) => a.bio - b.bio).slice(0,5)
    .map(r => [r.act, r.em, r.t, `Unidad ${r.bio} · ${r.tipo}`, r.href, (BIO.areas.find(a => a.unidades.includes(r.bio)) || {dom:'cell'}).dom]);
  const timeMin = s.timeMin + Math.round(s.events.length*0.4) + (Store.esDemo() ? 186 : 0);
  const descubrimientos = Object.values(s.seen).reduce((a,arr)=>a+arr.length,0);
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Mi panel'), h('h1',{},`${saludo}, ${s.user.nombre.split(' ')[0]}`), h('p',{},'Tu laboratorio te espera. Continúa donde lo dejaste o elige una actividad recomendada.')),
    h('div',{class:'row'}, h('span',{class:'pill'}, Store.year() ? BIO.year(Store.year()).corto + (Store.ses.paralelo?' · '+Store.ses.paralelo:'') : 'Sin año'), h('button',{class:'btn sm ghost',onclick:()=>openWizard('anio')},'Cambiar de año o código'))));
  const wb = welcomeBack(view); if (wb) view.append(wb);
  const left = h('div',{class:'stack'}), right = h('div',{class:'stack'});
  left.append(h('div',{class:'card',style:'display:flex;gap:22px;align-items:center;flex-wrap:wrap'},
    h('div',{class:'ring',style:`--p:${p}`}, h('i',{},p+'%')),
    h('div',{class:'stack',style:'flex:1;min-width:200px;gap:6px'}, h('span',{class:'eyebrow'},'Biología · progreso general'), h('h3',{},'Área actual: '+((BIO.areas.filter(a=>Store.areaStatus(a)==='actual')[0]||BIO.areas[1]).n)), h('p',{class:'small muted'}, s.lastActivity.t ? `Última actividad: ${s.lastActivity.t} · ${timeAgo(s.lastActivity.at)}` : 'Todavía no registras actividad: empieza por el área de tu año.'), h('a',{class:'btn sm',href: s.lastActivity.t ? s.lastActivity.href : '#/explorar',style:'align-self:flex-start'}, s.lastActivity.t ? 'Continuar' : 'Empezar')),
    h('div',{class:'grid',style:'grid-template-columns:repeat(3,auto);gap:18px'}, h('div',{class:'stat'},h('span',{class:'v'},s.xp),h('span',{class:'l'},'XP · nivel '+Store.level())), h('div',{class:'stat'},h('span',{class:'v'},fmtMin(timeMin)),h('span',{class:'l'},'tiempo de actividad')), h('div',{class:'stat'},h('span',{class:'v'},descubrimientos),h('span',{class:'l'},'descubrimientos')))));
  left.append(h('h3',{style:'margin-top:8px'},'Actividades sugeridas'));
  sug.forEach(([id,em,t,d,href,dom]) => { const done = s.activities[id]?.done; left.append(h('a',{class:'act',href}, h('span',{class:'ico',style:`background:var(--${dom}-soft)`},em), h('span',{}, h('div',{class:'t'},t), h('div',{class:'d'},d)), done ? h('span',{class:'pill ok',style:'margin-left:auto'},'Completada') : h('span',{class:'go'},'→'))); });
  left.append(h('h3',{style:'margin-top:8px'},'Misiones pendientes'));
  if (pendientes.length) pendientes.forEach(m => left.append(h('a',{class:'act',href:`#/mision/${m.id}`}, h('span',{class:'ico',style:'background:var(--mis-soft)'},m.em), h('span',{}, h('div',{class:'t'},m.t), h('div',{class:'d'},`${m.dur} · +${m.xp} XP · conecta: ${m.areas.map(i=>areaById(i).n).join(' + ')}`)), h('span',{class:'go'},'→'))));
  else left.append(h('div',{class:'notice ok'},'No tienes misiones pendientes en las unidades de tu año. Puedes repasar las de otros años desde Misiones.'));
  const ab = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Progreso por área'));
  BIO.areas.forEach(a => { const pr = areaPct(a); ab.append(h('a',{href:'#/area/'+a.id,style:'text-decoration:none;color:inherit'}, h('div',{class:'row',style:'justify-content:space-between;font-size:.86rem'}, h('span',{class:'row',style:'gap:8px'}, h('span',{class:'navdot '+a.dom}), h('b',{},a.n), h('span',{class:'pill'}, YEAR_TAG[Store.areaStatus(a)])), h('span',{class:'mono muted small'},pr+'%')), h('div',{class:`progress ${a.dom}`,style:'margin-top:5px'},h('i',{style:`width:${pr}%`})), h('span',{class:'small muted'}, a.unidades.map(u=>`U${u} ${Store.unitProgress(u)}%`).join(' · ')))); });
  right.append(ab);
  right.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Laboratorio recomendado · transversal'), h('h3',{},'Fotosíntesis: ¿qué limita la producción de oxígeno?'), h('p',{class:'small muted'},'Formula una hipótesis, manipula luz, CO₂, temperatura y agua, y registra datos reales del modelo.'), areaTags(['celular','biodiversidad']), h('a',{class:'btn primary sm',href:'#/laboratorio/fotosintesis',style:'align-self:flex-start'},'Abrir laboratorio')));
  const bd = h('div',{class:'card'}, h('span',{class:'eyebrow'},'Insignias'), h('div',{class:'grid',style:'grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px'}, BIO.badges.slice(0,6).map(b => h('div',{class:'badge-tile'+(s.badges.includes(b.id)?'':' locked'),title:b.d}, h('span',{class:'em'},b.em), h('span',{class:'n'},b.n)))));
  right.append(bd);
  view.append(h('div',{class:'dash'}, left, right));
});

/* ---------- EXPLORAR: vista general de las áreas ---------- */
route('/explorar', (view) => {
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Áreas de Biología · Bachillerato'), h('h1',{},'Todo el laboratorio, por área'), h('p',{},'Cada área reúne sus modelos 3D, animaciones y actividades. Cada recurso tiene un propósito y un reto: sabrás qué observar y qué resolver.'))));
  view.append(h('div',{class:'areas-grid',style:'margin-bottom:26px'}, areasOrdenadas().map(areaTile)));
  BIO.areas.forEach(a => {
    const rs = areaRes(a.id).filter(r => r.areas[0]===a.id && !r.transversal && r.tipo!=='Evaluación').sort((x,y)=>(y.ok-x.ok));
    view.append(h('div',{class:'area-sec-head'}, h('span',{class:'navdot '+a.dom}), h('h3',{},a.n), h('span',{class:'mono small muted'},a.unidades.map(u=>'U'+u).join(' · ')), h('a',{class:'btn sm ghost',href:'#/area/'+a.id,style:'margin-left:auto'},'Abrir el área →')));
    const g = h('div',{class:'grid g4',style:'margin-bottom:24px'}, rs.map(r => resTile(r, a.id)));
    if (a.id==='cuerpo') BIO.plannedOrgans.slice(0,1).forEach(o => g.append(plannedOrganTile(o)));
    view.append(g);
  });
  view.append(transversalBand());
});
function plannedOrganTile(o){
  return h('a',{class:'tile res anat planned',href:'#/explorar/organo/'+o.id}, h('span',{class:'ico'},o.em), h('span',{class:'tipo'},'Modelo 3D'), h('h3',{},o.t), h('p',{},o.d), h('div',{class:'res-reto'}, h('b',{},'🎯 Propósito'), h('span',{},'Descubre cómo su estructura le permite cumplir su función y cómo se conecta con los demás sistemas.')), h('span',{class:'pill soon'},'En construcción'));
}

/* ---------- ÁREA ---------- */
route('/area/:id', (view, p) => {
  const a = areaById(p.id); if (!a) { navigate('#/explorar'); return; }
  const pr = areaPct(a), rs = areaRes(a.id);
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow '+a.dom},`Área de Biología · ${a.unidades.length>1 ? 'Unidades '+a.unidades.slice(0,-1).join(', ')+' y '+a.unidades.slice(-1) : 'Unidad '+a.unidades[0]}`), h('h1',{},`${a.em} ${a.n}`), h('p',{},a.d)), h('div',{class:'ring',style:`--p:${pr}`}, h('i',{},pr+'%'))));
  const st = Store.areaStatus(a);
  if (st==='repaso') view.append(h('div',{class:'notice info',style:'margin-bottom:12px'}, h('span',{},`Esta área corresponde a ${BIO.year(BIO.yearOfUnit(a.unidades[0])).n} y la tienes disponible como repaso. Úsala para recordar lo que ya estudiaste.`)));
  if (st==='proximo') view.append(h('div',{class:'notice warn',style:'margin-bottom:12px'}, h('span',{},`Esta área se estudia en ${BIO.year(BIO.yearOfUnit(a.unidades[0])).n}. Puedes mirarla, pero tu docente aún no la asignó a tu curso.`)));
  view.append(h('div',{class:`guide-q ${a.dom}`}, h('span',{class:'eyebrow'},'Pregunta guía del área'), h('b',{},a.pregunta), h('span',{class:'small muted'},'Cada recurso de esta área tiene un propósito y un reto que te acercan a responderla. Avanza en orden: explora, experimenta, aplica y comprueba.')));
  view.append(h('div',{class:'unit-chips'}, BIO.units.filter(u=>a.unidades.includes(u.n)).map(u => { const up = Store.unitProgress(u.n); return h('div',{class:'unit'}, h('span',{class:'n'},'U'+u.n), h('span',{class:'t'},u.t), h('div',{class:`progress ${a.dom}`},h('i',{style:`width:${up}%`})), h('span',{class:'pct'},up+'%')); })));
  const sec = (n, t, sub, items, empty) => { view.append(h('div',{class:'area-sec-head'}, h('span',{class:'secn '+a.dom},n), h('div',{}, h('h3',{},t), h('span',{class:'small muted'},sub)))); view.append(items.length ? h('div',{class:'grid g3',style:'margin-bottom:26px'}, items) : h('div',{class:'ph',style:'margin-bottom:26px'},empty)); };
  const sortOk = arr => arr.sort((x,y)=>(y.ok-x.ok) || ((x.areas[0]===a.id?0:1) - (y.areas[0]===a.id?0:1)));
  const explora = sortOk(rs.filter(r => ['Modelo 3D','Animación','Microscopio'].includes(r.tipo) && !r.transversalOnly)).map(r => resTile(r, a.id));
  if (a.id==='cuerpo') BIO.plannedOrgans.forEach(o => explora.push(plannedOrganTile(o)));
  sec('1','Explora','Modelos 3D y animaciones: observa, rota, amplía cada estructura y cumple su reto.', explora, 'Esta área no tiene modelos 3D propios: empieza por los laboratorios.');
  sec('2','Experimenta','Laboratorios y simuladores: manipula variables y comprueba tus hipótesis.', sortOk(rs.filter(r => /^(Laboratorio|Simulador|Tablero|Caso)/.test(r.tipo))).map(r => resTile(r, a.id)), 'Esta área se trabaja con modelos y misiones.');
  const mis = BIO.missions.filter(m => m.areas.includes(a.id));
  sec('3','Aplica en una misión','Las misiones son transversales: conectan esta área con otras en un caso real.', mis.map(m => h('a',{class:'tile res mis'+(m.disponible?'':' planned'),href: m.disponible ? `#/mision/${m.id}` : '#/misiones'}, h('span',{class:'ico'},m.em), h('span',{class:'tipo'},'Misión · transversal'), h('h3',{},m.t), h('p',{},m.d), areaTags(m.areas, a.id), m.disponible ? h('span',{class:'pill mis soon'}, Store.s.activities['mision-globulo']?.done ? 'Completada' : 'Disponible') : h('span',{class:'pill soon'},'En construcción'))), 'Pronto habrá misiones que conecten esta área con las demás.');
  sec('4','Comprueba','Evaluaciones interactivas con retroalimentación inmediata.', rs.filter(r => r.tipo==='Evaluación').map(r => resTile(r, a.id)), 'Cada reto resuelto en los recursos de arriba cuenta como evaluación formativa y aparece en el libro de calificaciones de tu docente.');
  view.append(h('div',{class:'row',style:'margin-top:6px;gap:8px;flex-wrap:wrap'}, h('span',{class:'small muted'},'Otras áreas:'), BIO.areas.filter(x=>x.id!==a.id).map(x => h('a',{class:'btn sm',href:'#/area/'+x.id}, h('span',{class:'navdot '+x.dom}), x.n))));
});

route('/explorar/genetica', v => placeholderView(v,'gen','🧬','Laboratorio de genética','Constructor de cruces con generación de gametos, cuadro de Punnett, probabilidades y fenotipos; ADN 3D con separación de cadenas; herramienta Edita el ADN. Módulo planificado para la fase 2.','genetica'));
route('/explorar/ecosistemas', v => placeholderView(v,'eco','🌎','Explorador de ecosistemas','Bosque, océano, manglar, agua dulce, desierto, Amazonía y Galápagos con redes alimentarias interactivas y simulación de poblaciones. Módulo planificado para la fase 2.','biodiversidad'));
route('/microscopio', v => placeholderView(v,'cell','🔬','Microscopio virtual','Selección de muestras (epidermis de cebolla, sangre, bacterias, tejidos), aumentos 4x–100x, enfoque, desplazamiento, capturas y preguntas dentro de la observación. Módulo planificado para la fase 2.', null));
function placeholderView(view, dom, em, t, d, areaId){
  const a = areaId ? areaById(areaId) : null;
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:`eyebrow ${dom}`}, a ? `${a.n} · en construcción` : 'Recurso transversal · en construcción'), h('h1',{},`${em} ${t}`), h('p',{},d))));
  view.append(h('div',{class:'ph'}, h('b',{},'Placeholder profesional. '), 'La arquitectura de la plataforma (registro de contenidos, motor 3D, motor pedagógico, analítica) ya admite este módulo. Mientras tanto, explora los entornos disponibles:'), h('div',{class:'row',style:'margin-top:14px'}, a ? h('a',{class:'btn primary',href:'#/area/'+a.id},`Volver a ${a.n}`) : null, h('a',{class:'btn'+(a?'':' primary'),href:'#/explorar/corazon'},'Corazón 3D'), h('a',{class:'btn',href:'#/explorar/celula'},'Célula animal 3D'), h('a',{class:'btn',href:'#/mision/globulo-rojo'},'Misión del glóbulo rojo'), h('a',{class:'btn',href:'#/laboratorio/fotosintesis'},'Laboratorio de fotosíntesis')));
}
</script>
