<script>
/* =====================================================================
   VISTAS: Inicio, Panel del estudiante, Explorar (hub)
   ===================================================================== */
const DOM = { anat:{n:'Anatomía',em:'🫀'}, cell:{n:'Célula',em:'🔬'}, gen:{n:'Genética',em:'🧬'}, eco:{n:'Ecología',em:'🌎'}, lab:{n:'Laboratorio',em:'🧪'}, mis:{n:'Misión',em:'🎯'} };
const SCALE = [['🧬','ADN','Molécula de ~2 nm de ancho que almacena la información genética.'],['🧩','Gen','Fragmento de ADN que codifica una proteína o un ARN funcional (cientos a miles de nucleótidos).'],['🎗️','Cromosoma','ADN muy compactado con proteínas; un ser humano tiene 46 (~µm).'],['⚡','Organelo','Estructura especializada dentro de la célula, como la mitocondria (~1 µm).'],['🔬','Célula','Unidad básica de la vida (10–100 µm).'],['🧱','Tejido','Grupo de células similares que cumplen una función (mm).'],['🫀','Órgano','Conjunto de tejidos con una función común, como el corazón (cm).'],['🫁','Sistema','Órganos que trabajan juntos: circulatorio, respiratorio…'],['🧍','Organismo','Un ser vivo completo (m).'],['👥','Población','Individuos de la misma especie en un lugar y tiempo.'],['🦜','Comunidad','Todas las poblaciones que conviven en un área.'],['🌳','Ecosistema','Comunidad + ambiente físico: Amazonía, manglar, páramo (km).'],['🌎','Biosfera','Todos los ecosistemas de la Tierra (miles de km).']];

route('/', (view, q) => {
  const p = Store.overall();
  view.innerHTML = '';
  const hero = h('section',{class:'hero'},
    h('div',{class:'grid-bg'}),
    h('div',{class:'hero-text'},
      h('span',{class:'eyebrow'},'ANAI Online · Bachillerato'),
      h('h1',{},'ANAI BioLab'),
      h('p',{class:'sub'},'Laboratorio Virtual de Biología'),
      h('p',{class:'msg'},'Explora la vida. Desde una molécula hasta un ecosistema.'),
      h('div',{class:'row',style:'margin-top:8px'},
        h('a',{class:'btn primary lg',href:'#/explorar/corazon'},'Comenzar a explorar'),
        h('a',{class:'btn lg',href:'#/mision/globulo-rojo',style:'background:transparent;color:var(--hero-ink);border-color:rgba(159,179,204,.4)'},'Misión: el glóbulo rojo')),
      h('p',{class:'small',style:'color:var(--hero-ink-2)'},'No estudiar Biología solamente. Explorar la vida.')),
    h('div',{class:'hero-3d',id:'hero-3d'}, h('span',{class:'cap'},'corazón · modelo simplificado · arrastra para rotar')));
  view.append(hero);
  const access = h('div',{class:'access'});
  [['anat','🫀','Cuerpo humano','Corazón · cerebro · pulmones 3D','#/explorar'],['cell','🔬','Mundo celular','Célula animal 3D','#/explorar/celula'],['gen','🧬','Genética','Constructor de cruces','#/explorar/genetica'],['eco','🌎','Ecosistemas','Redes tróficas','#/explorar/ecosistemas'],['lab','🧪','Laboratorios','Fotosíntesis','#/laboratorio'],['mis','🎯','Misiones','El viaje de un glóbulo rojo','#/misiones']].forEach(([d,em,t,s,href]) => access.append(h('a',{class:`tile ${d}`,href}, h('span',{class:'ico'},em), h('h3',{},t), h('p',{},s))));
  view.append(access);
  view.append(h('div',{class:'page-head',style:'margin-bottom:6px'}, h('div',{}, h('span',{class:'eyebrow'},'Cómo se aprende aquí'), h('h2',{},'Primero se explora; después se explica'))));
  const loop = h('div',{class:'loop'}); [['OBSERVAR','un corazón que late'],['EXPLORAR','rota, separa, transparenta'],['PREGUNTAR','¿por qué esta pared es más gruesa?'],['MANIPULAR','cambia variables'],['COMPRENDER','tres niveles de profundidad'],['APLICAR','resuelve un caso'],['COMPROBAR','retroalimentación inmediata']].forEach(([b,s]) => loop.append(h('div',{}, h('b',{},b), h('span',{},s))));
  view.append(loop);
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
  // Unidades
  view.append(h('div',{class:'page-head',style:'margin-bottom:10px'}, h('div',{}, h('span',{class:'eyebrow'},'Currículo · Biología BGU'), h('h2',{},'Diez unidades, un solo laboratorio')), h('span',{class:'pill'},`Progreso general ${p} %`)));
  const units = h('div',{class:'units'}); BIO.units.forEach(u => { const pr = Store.unitProgress(u.n); units.append(h('div',{class:'unit'}, h('span',{class:'n'},'U'+u.n), h('span',{class:'t'},u.t), h('div',{class:'progress'},h('i',{style:`width:${pr}%`})), h('span',{class:'pct'},pr+'%'))); });
  view.append(units);
  view.append(h('p',{class:'small muted',style:'margin-top:26px;max-width:70ch'},'Prototipo MVP. Los modelos 3D son representaciones simplificadas con fines educativos, creadas para este proyecto y sustituibles por modelos anatómicos definitivos. Los datos de estudiantes son ficticios.'));
  // hero 3D
  let E=null;
  if (webglOK){ try { E = new Engine3D($('#hero-3d'), { interactive:true, autoRotate:true, radius:12.5, phi:1.35, theta:0.5, target:[0,0.5,0], aria:'Corazón 3D decorativo en rotación' }); const m = buildHeart(E); m.setFlow(true); m.setBeat(true); m.setOpacity(0.55); E.setLabels(false); } catch(e){ console.warn(e); } }
  else $('#hero-3d').append(h('div',{class:'ph',style:'margin:24px'},'Tu navegador no admite WebGL: el modelo 3D se sustituye por esquemas 2D en toda la plataforma.'));
  return { unmount(){ E && E.dispose(); } };
});

/* ---------- PANEL DEL ESTUDIANTE ---------- */
route('/panel', (view) => {
  const s = Store.s, p = Store.overall(); const hr = new Date().getHours(); const saludo = hr<12?'Buenos días':hr<19?'Buenas tardes':'Buenas noches';
  const pendientes = BIO.missions.filter(m=>m.disponible && !s.activities['mision-globulo']?.done);
  const sug = [['explorar-corazon','🫀','Explorar el corazón','Atlas 3D · 10 min','#/explorar/corazon','anat'],['mision-globulo','🩸','Misión: Sigue al glóbulo rojo','Misión · 15–20 min','#/mision/globulo-rojo','mis'],['lab-fotosintesis','🧪','Laboratorio: Fotosíntesis','Laboratorio · 20 min','#/laboratorio/fotosintesis','lab'],['reto-genetica','🧬','Reto de genética','Próximamente','#/explorar/genetica','gen']];
  const timeMin = s.timeMin + Math.round(s.events.length*0.4) + 186;
  const descubrimientos = Object.values(s.seen).reduce((a,arr)=>a+arr.length,0);
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Mi panel'), h('h1',{},`${saludo}, ${s.user.nombre.split(' ')[0]}`), h('p',{},'Tu laboratorio te espera. Continúa donde lo dejaste o elige una actividad recomendada.'))));
  const left = h('div',{class:'stack'}), right = h('div',{class:'stack'});
  left.append(h('div',{class:'card',style:'display:flex;gap:22px;align-items:center;flex-wrap:wrap'},
    h('div',{class:'ring',style:`--p:${p}`}, h('i',{},p+'%')),
    h('div',{class:'stack',style:'flex:1;min-width:200px;gap:6px'}, h('span',{class:'eyebrow'},'Biología · progreso general'), h('h3',{},'Unidad actual: Anatomía y fisiología humana'), h('p',{class:'small muted'},`Última actividad: ${s.lastActivity.t} · ${timeAgo(s.lastActivity.at)}`), h('a',{class:'btn sm',href:s.lastActivity.href,style:'align-self:flex-start'},'Continuar')),
    h('div',{class:'grid',style:'grid-template-columns:repeat(3,auto);gap:18px'}, h('div',{class:'stat'},h('span',{class:'v'},s.xp),h('span',{class:'l'},'XP · nivel '+Store.level())), h('div',{class:'stat'},h('span',{class:'v'},fmtMin(timeMin)),h('span',{class:'l'},'tiempo de actividad')), h('div',{class:'stat'},h('span',{class:'v'},descubrimientos),h('span',{class:'l'},'descubrimientos')))));
  left.append(h('h3',{style:'margin-top:8px'},'Actividades sugeridas'));
  sug.forEach(([id,em,t,d,href,dom]) => { const done = s.activities[id]?.done; left.append(h('a',{class:'act',href}, h('span',{class:'ico',style:`background:var(--${dom}-soft)`},em), h('span',{}, h('div',{class:'t'},t), h('div',{class:'d'},d)), done ? h('span',{class:'pill ok',style:'margin-left:auto'},'Completada') : h('span',{class:'go'},'→'))); });
  left.append(h('h3',{style:'margin-top:8px'},'Misiones pendientes'));
  if (pendientes.length) pendientes.forEach(m => left.append(h('a',{class:'act',href:`#/mision/${m.id}`}, h('span',{class:'ico',style:'background:var(--mis-soft)'},m.em), h('span',{}, h('div',{class:'t'},m.t), h('div',{class:'d'},`${m.dur} · +${m.xp} XP`)), h('span',{class:'go'},'→'))));
  else left.append(h('div',{class:'notice ok'},'No tienes misiones pendientes. Nuevas misiones se publicarán en las próximas unidades.'));
  right.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Laboratorio recomendado'), h('h3',{},'Fotosíntesis: ¿qué limita la producción de oxígeno?'), h('p',{class:'small muted'},'Formula una hipótesis, manipula luz, CO₂, temperatura y agua, y registra datos reales del modelo.'), h('a',{class:'btn primary sm',href:'#/laboratorio/fotosintesis',style:'align-self:flex-start'},'Abrir laboratorio')));
  const ub = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Progreso por unidad'));
  BIO.units.filter(u=>[1,2,3,4,6,7].includes(u.n)).forEach(u => { const pr = Store.unitProgress(u.n); ub.append(h('div',{}, h('div',{class:'row',style:'justify-content:space-between;font-size:.84rem'}, h('span',{},`U${u.n} · ${u.t}`), h('span',{class:'mono muted small'},pr+'%')), h('div',{class:'progress'},h('i',{style:`width:${pr}%`})))); });
  right.append(ub);
  const bd = h('div',{class:'card'}, h('span',{class:'eyebrow'},'Insignias'), h('div',{class:'grid',style:'grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px'}, BIO.badges.slice(0,6).map(b => h('div',{class:'badge-tile'+(s.badges.includes(b.id)?'':' locked'),title:b.d}, h('span',{class:'em'},b.em), h('span',{class:'n'},b.n)))));
  right.append(bd);
  view.append(h('div',{class:'dash'}, left, right));
});

/* ---------- EXPLORAR (hub) ---------- */
route('/explorar', (view) => {
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Explorar'), h('h1',{},'Atlas biológico interactivo'), h('p',{},'Modelos que se rotan, se separan, se transparentan y responden. Los entornos marcados como "en construcción" muestran el alcance previsto de la plataforma.'))));
  const mk = (dom, em, t, d, href, ok, extra) => h('a',{class:`tile ${dom}`,href}, h('span',{class:'ico'},em), h('h3',{},t), h('p',{},d), ok ? h('span',{class:`pill ${dom} soon`},'Disponible') : h('span',{class:'pill soon'},'En construcción'), extra||null);
  view.append(h('h3',{style:'margin-bottom:10px'},'Cuerpo humano'));
  const body = h('div',{class:'grid g4'});
  body.append(mk('anat','🫀','Corazón','14 estructuras · latido y flujo sanguíneo · exploración guiada · evaluación.','#/explorar/corazon',true));
  body.append(mk('anat','🧠','Cerebro','12 estructuras · impulso nervioso · ¿qué se activa cuando…? · exploración guiada.','#/explorar/cerebro',true));
  body.append(mk('anat','🫁','Pulmones y vía aérea','10 estructuras · respiración con diafragma · intercambio gaseoso · exploración guiada.','#/explorar/pulmones',true));
  BIO.plannedOrgans.forEach(o => body.append(mk('anat',o.em,o.t,o.d,'#/explorar/organo/'+o.id,false)));
  view.append(body);
  view.append(h('h3',{style:'margin:24px 0 10px'},'Células'));
  const cells = h('div',{class:'grid g4'});
  cells.append(mk('cell','🔬','Célula animal','11 componentes seleccionables con función, estructura, analogía y "ver en acción".','#/explorar/celula',true));
  cells.append(mk('cell','🌿','Célula vegetal','Cloroplastos, pared celular y vacuola central.','#/explorar/celula',false));
  cells.append(mk('cell','🦠','Célula procariota','Sin núcleo: nucleoide, plásmidos, flagelo.','#/explorar/celula',false));
  cells.append(mk('cell','🔁','Procesos celulares','Mitosis, meiosis, replicación, transcripción, traducción, ósmosis.','#/explorar/celula',false));
  view.append(cells);
  view.append(h('h3',{style:'margin:24px 0 10px'},'Genética, ecosistemas y microbiología'));
  const more = h('div',{class:'grid g4'});
  more.append(mk('gen','🧬','ADN 3D y Edita el ADN','Doble hélice manipulable; nucleótidos; mutaciones.','#/explorar/genetica',false));
  more.append(mk('gen','🟪','Constructor de cruces','Genotipos parentales → gametos → Punnett → fenotipos. Modo aprender / modo reto.','#/explorar/genetica',false));
  more.append(mk('eco','🌎','Ecosistemas del Ecuador','Amazonía, manglar, páramo, Galápagos. Redes tróficas interactivas.','#/explorar/ecosistemas',false));
  more.append(mk('cell','🦠','Microscopio virtual','4x · 10x · 40x · 100x. Enfoque, desplazamiento, capturas y etiquetas.','#/microscopio',false));
  view.append(more);
});
route('/explorar/genetica', v => placeholderView(v,'gen','🧬','Laboratorio de genética','Constructor de cruces con generación de gametos, cuadro de Punnett, probabilidades y fenotipos; ADN 3D con separación de cadenas; herramienta Edita el ADN. Módulo planificado para la fase 2.'));
route('/explorar/ecosistemas', v => placeholderView(v,'eco','🌎','Explorador de ecosistemas','Bosque, océano, manglar, agua dulce, desierto, Amazonía y Galápagos con redes alimentarias interactivas y simulación de poblaciones. Módulo planificado para la fase 2.'));
route('/microscopio', v => placeholderView(v,'cell','🔬','Microscopio virtual','Selección de muestras (epidermis de cebolla, sangre, bacterias, tejidos), aumentos 4x–100x, enfoque, desplazamiento, capturas y preguntas dentro de la observación. Módulo planificado para la fase 2.'));
function placeholderView(view, dom, em, t, d){
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:`eyebrow ${dom}`},'En construcción'), h('h1',{},`${em} ${t}`), h('p',{},d))));
  view.append(h('div',{class:'ph'}, h('b',{},'Placeholder profesional. '), 'La arquitectura de la plataforma (registro de contenidos, motor 3D, motor pedagógico, analítica) ya admite este módulo. Mientras tanto, explora los entornos disponibles:'), h('div',{class:'row',style:'margin-top:14px'}, h('a',{class:'btn primary',href:'#/explorar/corazon'},'Corazón 3D'), h('a',{class:'btn',href:'#/explorar/celula'},'Célula animal 3D'), h('a',{class:'btn',href:'#/mision/globulo-rojo'},'Misión del glóbulo rojo'), h('a',{class:'btn',href:'#/laboratorio/fotosintesis'},'Laboratorio de fotosíntesis')));
}
</script>
