<style>
/* ---------- 21 · Estudiantes con NEE (DECE) ---------- */
.nee-kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.nee-kpi .card{padding:14px 16px}
.nee-kpi .stat .v{font-variant-numeric:normal}
.nee-filtros{display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center}
.nee-filtros input[type=search]{flex:1 1 220px;min-width:0;padding:9px 11px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);color:var(--ink);font:inherit}
.nee-filtros select{width:auto;min-width:150px;max-width:100%}
.nee-grados{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;border:0;padding:0;margin:0}
.nee-grados legend{font-size:.8rem;font-weight:600;color:var(--ink-2);margin-bottom:6px;padding:0}
.nee-grado{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border:1px solid var(--line-2);border-radius:12px;background:var(--bg-2);cursor:pointer}
.nee-grado:has(input:checked){border-color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--bg-2))}
.nee-grado input{margin-top:4px;flex:none}
.nee-grado b{display:block;font-size:.9rem}
.nee-grado span{font-size:.8rem;color:var(--ink-2);line-height:1.4}
.nee-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px 16px}
.nee-form .full{grid-column:1/-1}
.nee-form label.f{display:flex;flex-direction:column;gap:6px;font-size:.84rem;font-weight:600;color:var(--ink-2)}
.nee-form label.f small{font-weight:400;color:var(--ink-3)}
.nee-form textarea{min-height:92px;font:inherit;font-weight:400;color:var(--ink)}
.nee-form input{font-weight:400}
.nee-form input[type=date]{padding:9px 11px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);color:var(--ink);font:inherit;min-height:42px}
.nee-adapt{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:6px 14px}
.nee-adapt label{display:flex;gap:8px;align-items:center;font-size:.86rem;font-weight:500;color:var(--ink)}
.nee-grado-pill{white-space:nowrap}
.nee-ficha-doc{max-width:820px}
.nee-ficha-doc h2{font-size:1.25rem}
.nee-ficha-doc .kv{margin-top:6px}
.nee-bloque{display:flex;flex-direction:column;gap:4px;padding:10px 0;border-top:1px solid var(--line)}
.nee-bloque:first-of-type{border-top:0}
.nee-bloque h4{font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);font-family:var(--font-b);font-weight:600}
.nee-bloque p{margin:0;white-space:pre-line}
.nee-firmas{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:40px}
.nee-firmas div{border-top:1px solid var(--ink-3);padding-top:6px;font-size:.8rem;color:var(--ink-2)}
.nee-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.nee-card{border:1px solid var(--line);border-left:4px solid var(--gen);border-radius:12px;padding:12px 14px;background:var(--bg-2);display:flex;flex-direction:column;gap:6px}
.nee-card .t{font-weight:700}
.nee-card dl{margin:0;display:grid;gap:6px}
.nee-card dt{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);font-weight:600}
.nee-card dd{margin:0;font-size:.86rem;white-space:pre-line}
.nee-aviso{margin:0 0 14px}
.nee-aviso details summary{cursor:pointer;font-weight:600}
.nee-aviso ul{margin:6px 0 0;padding-left:18px}
.nee-print-only{display:none}
@media (max-width:760px){ .nee-grados{grid-template-columns:1fr} .nee-form{grid-template-columns:1fr} .nee-firmas{grid-template-columns:1fr} }
@media print{
  .nee-noprint{display:none!important}
  .nee-print-only{display:block}
  .nee-ficha-doc{max-width:none;border:0!important;padding:0!important}
  .nee-card{break-inside:avoid;border-left-width:2px}
}
</style>
<script>
/* =====================================================================
   21 · ESTUDIANTES CON NEE (v1.8)
   ---------------------------------------------------------------------
   · Ruta #/nee: el DECE y la administración registran la ficha de
     adaptación curricular de cada estudiante (una por estudiante);
     las autoridades la leen; el docente la ve en su panel (solo sus
     cursos, lo garantiza RLS); estudiantes y familias nunca.
   · La ficha es FUNCIONAL: qué necesita el estudiante y qué hace el
     docente. No admite diagnósticos médicos.
   · Ganchos: neeBloqueDocente(roster, rerender) y neeAvisoTareas(nivel, par).
   ===================================================================== */
const NEE_GRADOS = {
  1:{ n:'Grado 1', t:'De acceso', d:'Ajustes de acceso al currículo: espacio, materiales, recursos y formas de comunicación. Los objetivos, las destrezas y los criterios de evaluación no cambian.' },
  2:{ n:'Grado 2', t:'No significativa', d:'Además del acceso, se ajustan la metodología y la evaluación (tiempos, formatos, apoyos). Se mantienen los objetivos y las destrezas imprescindibles del nivel.' },
  3:{ n:'Grado 3', t:'Significativa', d:'Se modifican objetivos, destrezas con criterios de desempeño y criterios de evaluación, según el documento individual de adaptación curricular (DIAC).' }
};
/* palabras que delatan un diagnóstico médico: la ficha debe describir necesidades, no diagnósticos */
const NEE_DIAG = /\b(diagn[oó]stic\w*|tdah|tda|tea|autis\w*|asperger|dislexi\w*|discalcul\w*|disgraf\w*|disortograf\w*|s[ií]ndrome\w*|trastorno\w*|epilep\w*|medicaci[oó]n|medicad[oa]s?|medicament\w*|f[aá]rmaco\w*|psiqui[aá]tr\w*|neurol[oó]g\w*|cie-?1[01]|dsm|down|par[aá]lisis|bipolar|depresi[oó]n|esquizofren\w*|coeficiente intelectual|discapacidad intelectual)\b/gi;
const NEE_DIA = 86400000;
const neeFichas = {
  todas(){ return Store.s.nee || {}; },
  de(codigo){ return (Store.s.nee || {})[codigo] || null; },
  adapt(codigo){ return (((Store.s.docente || {}).adapt || {})[codigo]) || []; },
  editar(){ return esRol('dece','admin'); },
  ver(){ return esRol('dece','admin','autoridad'); },
  diagnosticos(...txts){ const s = new Set(); txts.forEach(t => (String(t || '').match(NEE_DIAG) || []).forEach(w => s.add(w.toLowerCase()))); return [...s]; },
  hoy(){ return Periodos.dia(Date.now()); },
  /* estado de la próxima revisión */
  revision(f){
    if (!f || !f.revision) return { k:'sin', t:'Sin fecha de revisión', cls:'warn' };
    const d = Math.round((Date.parse(f.revision + 'T12:00') - Date.parse(this.hoy() + 'T12:00')) / NEE_DIA);
    if (d < 0) return { k:'vencida', t:`Vencida hace ${-d} día${d === -1 ? '' : 's'}`, cls:'bad', d };
    if (d === 0) return { k:'proxima', t:'Revisar hoy', cls:'warn', d };
    if (d <= 30) return { k:'proxima', t:`En ${d} día${d === 1 ? '' : 's'}`, cls:'warn', d };
    return { k:'ok', t:'Al día', cls:'ok', d };
  },
  async guardar(codigo, ficha, adapt){
    const u = Users.get(codigo); if (!u) throw new Error('No existe ese estudiante.');
    const antes = this.de(codigo), adaptAntes = this.adapt(codigo);
    const f = { grado:+ficha.grado, necesidad:String(ficha.necesidad || '').trim(), estrategias:String(ficha.estrategias || '').trim(), evaluacion:String(ficha.evaluacion || '').trim(),
      revision:ficha.revision || '', responsable:String(ficha.responsable || '').trim(), actualizado:Date.now() };
    const cambiaAdapt = adapt && (adapt.length !== adaptAntes.length || adapt.some(k => !adaptAntes.includes(k)));
    if (Cloud.on){ const uid = Cloud.uidDe(codigo); if (!uid) throw new Error('El estudiante no tiene cuenta en el servidor.');
      await Cloud.pushNee(uid, f); if (cambiaAdapt) await Cloud.pushAdapt(uid, adapt); }
    (Store.s.nee = Store.s.nee || {})[codigo] = f;
    if (cambiaAdapt){ const d = Store.s.docente = Store.s.docente || {}; (d.adapt = d.adapt || {})[codigo] = adapt.slice(); }
    Store.save();
    Auditoria.local(antes ? 'actualizar_ficha_nee' : 'crear_ficha_nee', { codigo, estudiante:u.nombre, grado:f.grado }, { tabla:'nee', registro:codigo });
    if (cambiaAdapt) Auditoria.local('cambiar_adaptacion_acceso', { codigo, estudiante:u.nombre, antes:adaptAntes, despues:adapt }, { tabla:'adaptaciones', registro:codigo });
    return f;
  },
  async quitar(codigo){
    const u = Users.get(codigo);
    if (Cloud.on){ const uid = Cloud.uidDe(codigo); if (!uid) throw new Error('El estudiante no tiene cuenta en el servidor.'); await Cloud.borrarNee(uid); }
    delete (Store.s.nee || {})[codigo]; Store.save();
    Auditoria.local('quitar_ficha_nee', { codigo, estudiante:u ? u.nombre : codigo }, { tabla:'nee', registro:codigo });
  }
};
const neeCursoTxt = u => `${(BIO.nivel(u.year) || {}).corto || u.year} ${u.paralelo || ''}`.trim();
const neeFecha = s => s ? new Date(s + 'T12:00').toLocaleDateString('es-EC', { day:'2-digit', month:'long', year:'numeric' }) : '—';
const neeGradoPill = g => g && NEE_GRADOS[g] ? h('span',{class:'pill gen nee-grado-pill',title:NEE_GRADOS[g].d}, `${NEE_GRADOS[g].n} · ${NEE_GRADOS[g].t}`) : h('span',{class:'pill'},'Sin grado');
const neeRevPill = f => { const r = neeFichas.revision(f); return h('span',{class:'pill ' + r.cls}, (r.cls === 'bad' ? '⚠ ' : r.cls === 'warn' ? '◷ ' : '✓ ') + r.t); };
const neeAdaptTxt = lista => (lista || []).map(k => BIO.adaptaciones[k] || k);
const neeAviso = () => h('div',{class:'notice info'}, h('span',{}, h('b',{},'Información confidencial. '), 'Solo la ven el DECE, la administración, las autoridades (en lectura) y el docente de cada curso (en lectura). Estudiantes y familias nunca. La ficha describe necesidades y apoyos en el aula; no registre diagnósticos médicos.'));

/* ---------- fichas de ejemplo (solo modo local) ---------- */
function neeCargarEjemplos(){
  const cursos = Admin.cursos().slice().sort((a,b) => (+a.nivel >= 8 ? a.nivel - 20 : a.nivel) - (+b.nivel >= 8 ? b.nivel - 20 : b.nivel));
  const elegir = []; cursos.forEach((c, i) => { const us = Users.ofCourse(+c.nivel, c.paralelo); const u = us[i % Math.max(1, us.length)]; if (u && elegir.length < 3) elegir.push(u); });
  if (!elegir.length) Users.all().slice(0, 3).forEach(u => elegir.push(u));
  const suma = d => Periodos.dia(Date.now() + d * NEE_DIA);
  const EJ = [
    { grado:1, necesidad:'[EJEMPLO FICTICIO] Necesita más tiempo para leer textos largos y se orienta mejor con instrucciones cortas y apoyo visual.', estrategias:'Dar las instrucciones por pasos y por escrito.\nActivar "Lectura en voz alta" en la plataforma.\nUbicarlo cerca de la pizarra.', evaluacion:'Tiempo adicional (hasta 50 %).\nLeerle en voz alta los enunciados si lo pide.', revision:suma(-5), adapt:['voz','tiempo','letra-grande'] },
    { grado:2, necesidad:'[EJEMPLO FICTICIO] Le cuesta sostener la atención en tareas largas; trabaja mejor en bloques breves con metas claras.', estrategias:'Dividir los laboratorios en etapas cortas con una meta visible en cada una.\nConfirmar que entendió la consigna antes de empezar.\nRefuerzo positivo al completar cada etapa.', evaluacion:'Evaluar por etapas en lugar de una sola prueba larga.\nPermitir intentos adicionales en los retos.\nPriorizar las destrezas imprescindibles de la unidad.', revision:suma(12), adapt:['pistas','intentos','menos-movimiento'] },
    { grado:1, necesidad:'[EJEMPLO FICTICIO] Se fatiga con letra pequeña y animaciones rápidas; necesita un entorno visual tranquilo.', estrategias:'Usar letra grande y tipografía legible.\nReducir las animaciones.\nEntregar el material con anticipación.', evaluacion:'Mismos criterios del curso, con formato de letra ampliada.', revision:suma(75), adapt:['letra-grande','tipografia','menos-movimiento'] }
  ];
  const resp = Store.s.user.nombre || 'DECE';
  elegir.forEach((u, i) => { const e = EJ[i]; (Store.s.nee = Store.s.nee || {})[u.codigo] = { grado:e.grado, necesidad:e.necesidad, estrategias:e.estrategias, evaluacion:e.evaluacion, revision:e.revision, responsable:resp, actualizado:Date.now(), ejemplo:true };
    const d = Store.s.docente = Store.s.docente || {}; (d.adapt = d.adapt || {})[u.codigo] = e.adapt.slice(); });
  Store.save(); Auditoria.local('cargar_fichas_ejemplo', { total:elegir.length }, { tabla:'nee' });
  return elegir.length;
}

/* ---------- ruta ---------- */
route('/nee', (view, q) => {
  view.classList.add('wide');
  const eyebrow = h('span',{class:'eyebrow'},'DECE · Consejería Estudiantil');
  if (!neeFichas.ver()){
    view.append(h('div',{class:'page-head'}, h('div',{}, eyebrow, h('h1',{},'Estudiantes con NEE'))));
    const card = h('div',{class:'card stack',style:'max-width:640px'});
    if (esRol('docente')) card.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},'Esta sección es del DECE. '), 'Las fichas de adaptación curricular de los estudiantes de tus cursos las encuentras en tu panel, en la pestaña "Adaptaciones NEE", en modo de lectura.')),
      h('div',{class:'row'}, h('a',{class:'btn primary sm',href:'#/docente?t=nee'},'Ir a Adaptaciones NEE')));
    else card.append(h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Acceso restringido. '), 'Esta sección es exclusiva del DECE, la administración y las autoridades de la institución.')),
      h('div',{class:'row'}, h('button',{class:'btn sm ghost',onclick:()=>openWizard('login', {})},'Entrar con otra cuenta')));
    view.append(card); return;
  }
  if (q.e) return neeVistaFicha(view, String(q.e), q.v === 'ficha' || !neeFichas.editar());
  if (q.v === 'resumen') return neeVistaResumen(view, q.curso);
  neeVistaLista(view);
});

/* ---------- lista ---------- */
function neeVistaLista(view){
  const ui = Store.s.ui = Store.s.ui || {};
  const est = { q:'', prog: ui.neeProg || 'todos', curso: ui.neeCurso || '', modo: ui.neeModo || 'con' };
  const head = h('div',{class:'page-head'},
    h('div',{}, h('span',{class:'eyebrow'},'DECE · Consejería Estudiantil'), h('h1',{},'Estudiantes con NEE'),
      h('p',{}, esRol('autoridad') ? 'Fichas de adaptación curricular registradas por el DECE, en modo de solo lectura.' : 'Fichas de adaptación curricular: grado, necesidad funcional, estrategias para el aula y ajustes de evaluación. El docente de cada curso las ve en su panel.')),
    h('div',{class:'row nee-noprint'}, Cloud.on ? h('button',{class:'btn sm ghost',onclick:async function(){ this.disabled = true; try { await Cloud.pull(); toast('Datos actualizados.'); } catch(e){ toast('No se pudo actualizar: ' + e.message); } pintar(); this.disabled = false; }},'↻ Actualizar') : null,
      esRol('dece','admin') ? h('a',{class:'btn sm',href:'#/docente?t=nee'},'Adaptaciones de acceso por curso') : null));
  const body = h('div',{class:'stack'});
  view.append(head, body);
  function pintar(){
    body.innerHTML = '';
    if (avisoV18()) body.append(avisoV18());
    body.append(neeAviso());
    const F = neeFichas.todas(), us = Users.all();
    const fichas = Object.keys(F).filter(c => Users.get(c)).map(c => ({ u:Users.get(c), f:F[c] }));
    const venc = fichas.filter(x => neeFichas.revision(x.f).k === 'vencida'), prox = fichas.filter(x => neeFichas.revision(x.f).k === 'proxima');
    body.append(h('div',{class:'nee-kpi'},
      h('div',{class:'card stat'}, h('span',{class:'v'}, String(fichas.length)), h('span',{class:'l'},'Fichas registradas')),
      ...[1,2,3].map(g => h('div',{class:'card stat'}, h('span',{class:'v'}, String(fichas.filter(x => +x.f.grado === g).length)), h('span',{class:'l'}, `${NEE_GRADOS[g].n} · ${NEE_GRADOS[g].t.toLowerCase()}`))),
      h('div',{class:'card stat'}, h('span',{class:'v'}, String(venc.length)), h('span',{class:'l'}, venc.length ? '⚠ Revisiones vencidas' : 'Revisiones vencidas')),
      h('div',{class:'card stat'}, h('span',{class:'v'}, String(prox.length)), h('span',{class:'l'},'Revisiones en los próximos 30 días'))));
    if (venc.length || prox.length) body.append(h('div',{class:'notice ' + (venc.length ? 'warn' : 'info')}, h('span',{},
      h('b',{}, venc.length ? `${venc.length} ficha${venc.length === 1 ? '' : 's'} con la revisión vencida` : 'Revisiones próximas'), venc.length && prox.length ? ` y ${prox.length} por revisar en los próximos 30 días` : '', ': ',
      ...[...venc, ...prox].slice(0, 8).flatMap((x, i) => [i ? ', ' : '', h('a',{href:'#/nee?e=' + x.u.codigo}, x.u.nombre), ` (${neeFechaCorta(x.f.revision)})`]), [...venc, ...prox].length > 8 ? '…' : '')));
    /* demostración */
    if (!Cloud.on && !fichas.length && neeFichas.editar()){
      if (us.length) body.append(h('div',{class:'card stack'}, h('b',{},'Demostración'), h('p',{class:'small muted'},'Todavía no hay fichas. Puedes cargar tres fichas de ejemplo, claramente marcadas como ficticias, para ver cómo las recibe cada docente.'),
        h('div',{class:'row'}, h('button',{class:'btn sm',onclick:()=>{ const n = neeCargarEjemplos(); toast(`${n} fichas de ejemplo cargadas.`); pintar(); }},'Cargar fichas de ejemplo'))));
      else body.append(h('div',{class:'ph'}, h('b',{},'Aún no hay estudiantes cargados. '), esRol('admin') ? 'Cárgalos en la consola de administración o usa los datos de ejemplo.' : 'La administración debe cargarlos primero.',
        esRol('admin') ? h('div',{style:'margin-top:10px'}, h('button',{class:'btn sm',onclick:async()=>{ await admDemo(); pintar(); }},'Cargar datos de ejemplo')) : null));
    }
    /* filtros */
    const cursos = Admin.cursos().filter(c => est.prog === 'todos' || c.prog === est.prog).sort((a,b) => (+a.nivel >= 8 ? a.nivel - 20 : a.nivel) - (+b.nivel >= 8 ? b.nivel - 20 : b.nivel) || String(a.paralelo).localeCompare(b.paralelo));
    if (est.curso && !cursos.some(c => c.id === est.curso)) est.curso = '';
    const buscar = h('input',{type:'search',placeholder:'Buscar por nombre o código…','aria-label':'Buscar estudiante',value:est.q});
    const selCurso = h('select',{'aria-label':'Filtrar por curso'}, h('option',{value:''},'Todos los cursos'), cursos.map(c => h('option',{value:c.id, selected:c.id === est.curso}, `${BIO.nivel(c.nivel).corto} ${c.paralelo}`)));
    const tabla = h('div');
    const guardarUI = () => { ui.neeProg = est.prog; ui.neeCurso = est.curso; ui.neeModo = est.modo; Store.save(); };
    buscar.oninput = () => { est.q = buscar.value; pintarTabla(); };
    selCurso.onchange = () => { est.curso = selCurso.value; guardarUI(); pintarTabla(); };
    const chipsProg = h('span',{class:'row',style:'gap:6px',role:'group','aria-label':'Entorno'}, [['todos','Ambos'],['cn',BIO.programas.cn.n],['bio',BIO.programas.bio.n]].map(([k,t]) =>
      h('button',{class:'chip' + (est.prog === k ? ' picked' : ''),'aria-pressed':String(est.prog === k),onclick:()=>{ est.prog = k; guardarUI(); pintar(); }}, t)));
    const chipsModo = h('span',{class:'row',style:'gap:6px',role:'group','aria-label':'Qué estudiantes mostrar'}, [['con',`Con ficha (${fichas.length})`],['todos','Todos los estudiantes']].map(([k,t]) =>
      h('button',{class:'chip' + (est.modo === k ? ' picked' : ''),'aria-pressed':String(est.modo === k),onclick:()=>{ est.modo = k; guardarUI(); pintar(); }}, t)));
    body.append(h('section',{class:'card stack','aria-labelledby':'nee-h-lista'},
      h('div',{class:'row',style:'justify-content:space-between;gap:10px;flex-wrap:wrap'}, h('h2',{id:'nee-h-lista',style:'font-size:1.1rem'},'Estudiantes'), chipsModo),
      h('div',{class:'nee-filtros nee-noprint'}, buscar, selCurso, chipsProg), tabla));
    function pintarTabla(){
      tabla.innerHTML = '';
      const txt = sinTildes(est.q.trim().toLowerCase());
      const c = cursos.find(x => x.id === est.curso);
      let L = us.filter(u => (est.prog === 'todos' || BIO.progOf(u.year) === est.prog) && (!c || (+u.year === +c.nivel && u.paralelo === c.paralelo)));
      if (est.modo === 'con') L = L.filter(u => F[u.codigo]);
      if (txt) L = L.filter(u => sinTildes(u.nombre.toLowerCase()).includes(txt) || String(u.codigo).includes(txt));
      L.sort((a,b) => (+a.year >= 8 ? a.year - 20 : a.year) - (+b.year >= 8 ? b.year - 20 : b.year) || String(a.paralelo).localeCompare(b.paralelo) || a.nombre.localeCompare(b.nombre));
      if (!L.length){ tabla.append(h('p',{class:'small muted'}, est.modo === 'con' && !txt ? 'No hay fichas con estos filtros. Elige "Todos los estudiantes" para crear una.' : 'Ningún estudiante coincide con la búsqueda.')); return; }
      tabla.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
        h('thead',{}, h('tr',{}, ...['Estudiante','Curso','Ficha','Adaptaciones de acceso','Próxima revisión','Responsable',''].map(t => h('th',{scope:'col'}, t)))),
        h('tbody',{}, L.slice(0, 400).map(u => { const f = F[u.codigo], ad = neeAdaptTxt(neeFichas.adapt(u.codigo));
          return h('tr',{},
            h('td',{}, h('b',{}, u.nombre), h('div',{class:'small muted mono'}, u.codigo)),
            h('td',{}, neeCursoTxt(u)),
            h('td',{}, f ? neeGradoPill(f.grado) : h('span',{class:'small muted'},'Sin ficha'), f && f.ejemplo ? h('div',{class:'small muted'},'Ejemplo ficticio') : null),
            h('td',{class:'small'}, ad.length ? ad.join(', ') : '—'),
            h('td',{}, f ? h('div',{}, h('div',{class:'small'}, neeFechaCorta(f.revision)), neeRevPill(f)) : '—'),
            h('td',{class:'small'}, f ? (f.responsable || '—') : '—'),
            h('td',{style:'white-space:nowrap'}, f ? h('a',{class:'btn sm' + (neeFichas.editar() ? '' : ' ghost'),href:'#/nee?e=' + u.codigo,'aria-label':`${neeFichas.editar() ? 'Abrir' : 'Ver'} la ficha de ${u.nombre}`}, neeFichas.editar() ? 'Abrir ficha' : 'Ver ficha')
              : neeFichas.editar() ? h('a',{class:'btn sm ghost',href:'#/nee?e=' + u.codigo,'aria-label':`Crear ficha para ${u.nombre}`},'Crear ficha') : null)); })))));
      if (L.length > 400) tabla.append(h('p',{class:'small muted'}, `Se muestran 400 de ${L.length}. Usa la búsqueda o el filtro de curso.`));
    }
    pintarTabla();
    /* resumen por curso */
    const porCurso = cursos.map(c => ({ c, n:Users.ofCourse(+c.nivel, c.paralelo).filter(u => F[u.codigo]).length, d:c.docenteId ? (Store.s.docentes || {})[c.docenteId] : null })).filter(x => x.n);
    body.append(h('section',{class:'card stack','aria-labelledby':'nee-h-cursos'},
      h('div',{}, h('h2',{id:'nee-h-cursos',style:'font-size:1.1rem'},'Resumen por curso para el docente'), h('p',{class:'small muted'},'Una hoja por curso con lo que el docente necesita para el aula: grado, estrategias, ajustes de evaluación y adaptaciones de acceso. El docente también la ve en su panel.')),
      porCurso.length ? h('div',{class:'stack',style:'gap:8px'}, porCurso.map(x => h('div',{class:'act'},
        h('span',{class:'ico',style:'background:var(--gen-soft)'},'🤝'),
        h('span',{}, h('div',{class:'t'}, `${BIO.nivel(x.c.nivel).corto} ${x.c.paralelo} · ${BIO.programas[x.c.prog].n}`), h('div',{class:'d'}, `${x.n} estudiante${x.n === 1 ? '' : 's'} con ficha · Docente: ${x.d ? x.d.nombre : 'sin asignar'}`)),
        h('a',{class:'btn sm',style:'margin-left:auto',href:`#/nee?v=resumen&curso=${encodeURIComponent(x.c.id)}`},'Abrir resumen'))))
        : h('p',{class:'small muted'},'Aparecerá cuando haya fichas en algún curso.')));
  }
  pintar();
  if (Cloud.on && Cloud.ses && Date.now() - (Cloud.ultimoPull || 0) > 60000)
    Cloud.pull().then(() => { if (document.body.contains(body)) pintar(); }).catch(e => console.warn('actualizar', e));
}
const neeFechaCorta = s => s ? new Date(s + 'T12:00').toLocaleDateString('es-EC', { day:'2-digit', month:'short', year:'numeric' }) : 'sin fecha';

/* ---------- ficha: documento de lectura (imprimible) ---------- */
function neeDocumento(u, f){
  const ad = neeAdaptTxt(neeFichas.adapt(u.codigo)), g = NEE_GRADOS[f.grado];
  const bloque = (t, x) => h('div',{class:'nee-bloque'}, h('h4',{}, t), h('p',{}, x || '—'));
  return h('article',{class:'card stack nee-ficha-doc','aria-labelledby':'nee-h-doc'},
    h('div',{}, h('span',{class:'eyebrow'}, `${BIO.school.institucion || 'ANAI'} · DECE · Año lectivo ${Inst.anio()}`), h('h2',{id:'nee-h-doc'},'Ficha de adaptación curricular'),
      f.ejemplo ? h('div',{class:'notice warn',style:'margin-top:8px'}, h('span',{}, h('b',{},'Ejemplo ficticio '), 'cargado para la demostración.')) : null),
    h('dl',{class:'kv'}, h('dt',{},'Estudiante'), h('dd',{}, u.nombre), h('dt',{},'Código'), h('dd',{class:'mono'}, u.codigo), h('dt',{},'Curso'), h('dd',{}, `${(BIO.nivel(u.year) || {}).n || u.year} "${u.paralelo}" · ${BIO.programas[BIO.progOf(u.year)].n}`),
      h('dt',{},'Grado'), h('dd',{}, g ? `${g.n} · ${g.t}` : '—'), h('dt',{},'Próxima revisión'), h('dd',{}, neeFecha(f.revision)), h('dt',{},'Responsable'), h('dd',{}, f.responsable || '—'),
      h('dt',{},'Actualizada'), h('dd',{}, f.actualizado ? fechaHora(f.actualizado) : '—')),
    g ? h('p',{class:'small muted',style:'margin:0'}, g.d) : null,
    h('div',{}, bloque('Necesidad educativa (descripción funcional)', f.necesidad), bloque('Estrategias en el aula', f.estrategias), bloque('Ajustes de evaluación', f.evaluacion),
      bloque('Adaptaciones de acceso en la plataforma', ad.length ? ad.join(' · ') : 'Ninguna')),
    h('div',{class:'nee-firmas'}, h('div',{}, 'Responsable del DECE', h('br'), f.responsable || ''), h('div',{},'Recibido por el docente del curso')),
    h('p',{class:'small muted',style:'margin-top:10px'},'Documento confidencial para el archivo del DECE. No contiene diagnósticos médicos. No se entrega a otros estudiantes ni a terceros.'));
}

function neeVistaFicha(view, codigo, soloVer){
  const u = Users.get(codigo);
  const volver = h('a',{class:'btn sm ghost nee-noprint',href:'#/nee'},'← Volver a la lista');
  if (!u){ view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'DECE'), h('h1',{},'Ficha no encontrada'))), h('div',{class:'card stack'}, h('p',{},'No existe un estudiante activo con ese código.'), h('div',{class:'row'}, volver))); return; }
  const f = neeFichas.de(codigo);
  view.append(h('div',{class:'page-head nee-noprint'},
    h('div',{}, h('span',{class:'eyebrow'},'DECE · Ficha de adaptación curricular'), h('h1',{}, u.nombre), h('p',{}, `${neeCursoTxt(u)} · ${BIO.programas[BIO.progOf(u.year)].n} · código ${u.codigo}`)),
    h('div',{class:'row'}, volver)));
  if (soloVer){
    if (!f){ view.append(h('div',{class:'card stack'}, h('p',{},'Este estudiante no tiene ficha de adaptación curricular.'), neeFichas.editar() ? h('div',{class:'row'}, h('a',{class:'btn primary sm',href:'#/nee?e=' + codigo},'Crear ficha')) : null)); return; }
    view.append(h('div',{class:'row nee-noprint',style:'margin-bottom:14px;gap:8px'},
      h('button',{class:'btn primary sm',onclick:()=>{ Auditoria.registrar('imprimir_ficha_nee', { codigo }); window.print(); }},'Imprimir ficha'),
      neeFichas.editar() ? h('a',{class:'btn sm',href:'#/nee?e=' + codigo},'Editar') : null,
      esRol('autoridad') ? h('span',{class:'small muted'},'Vista de solo lectura.') : null));
    view.append(neeDocumento(u, f)); return;
  }
  /* editor (DECE y administración) */
  view.append(neeAviso(), h('div',{style:'height:12px'}));
  const grados = h('fieldset',{class:'nee-grados full'}, h('legend',{},'Grado de adaptación curricular *'),
    [1,2,3].map(g => h('label',{class:'nee-grado'}, h('input',{type:'radio',name:'nee-grado',value:String(g),checked:f && +f.grado === g}), h('div',{}, h('b',{}, `${NEE_GRADOS[g].n} · ${NEE_GRADOS[g].t}`), h('span',{}, NEE_GRADOS[g].d)))));
  const ta = (v, ph, lab) => h('textarea',{placeholder:ph,'aria-label':lab}, v || '');
  const necesidad = ta(f && f.necesidad, 'Ej.: Necesita más tiempo para leer textos largos y apoyo visual para seguir instrucciones de varios pasos.', 'Necesidad educativa, descripción funcional');
  const estrategias = ta(f && f.estrategias, 'Ej.: Dar las instrucciones por pasos y por escrito. Ubicarlo cerca de la pizarra. Activar la lectura en voz alta.', 'Estrategias en el aula');
  const evaluacion = ta(f && f.evaluacion, 'Ej.: Tiempo adicional. Leer en voz alta los enunciados. Evaluar por etapas.', 'Ajustes de evaluación');
  const qa = Periodos.q(Periodos.actual()), hoy = neeFichas.hoy(), en200 = Periodos.dia(Date.now() + 200 * NEE_DIA);
  const revDef = qa && qa.fin >= hoy && qa.fin <= en200 ? qa.fin : Periodos.dia(Date.now() + 90 * NEE_DIA);
  const revision = h('input',{type:'date','aria-label':'Fecha de la próxima revisión',value:(f && f.revision) || revDef});
  const responsable = h('input',{type:'text','aria-label':'Responsable',value:(f && f.responsable) || Store.s.user.nombre || '',placeholder:'Nombre y cargo'});
  const adaptAct = new Set(neeFichas.adapt(codigo));
  const adapt = h('div',{class:'nee-adapt'}, Object.entries(BIO.adaptaciones).map(([k, t]) => h('label',{}, h('input',{type:'checkbox',value:k,checked:adaptAct.has(k)}), t)));
  const alerta = h('div',{class:'notice bad full',role:'alert',style:'display:none'});
  const revisar = () => { const w = neeFichas.diagnosticos(necesidad.value, estrategias.value, evaluacion.value);
    alerta.style.display = w.length ? '' : 'none'; alerta.innerHTML = ''; if (w.length) alerta.append(h('span',{}, h('b',{},'Parece que el texto incluye un diagnóstico médico '), `(${w.join(', ')}). La ficha solo admite descripciones funcionales: escriba qué observa en el aula y qué apoyos necesita el estudiante.`));
    return w; };
  [necesidad, estrategias, evaluacion].forEach(x => x.addEventListener('input', revisar));
  const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
  const guardar = h('button',{class:'btn primary',onclick:async function(){
    msg.textContent = '';
    const g = (grados.querySelector('input:checked') || {}).value;
    if (!g){ msg.textContent = 'Elige el grado de adaptación.'; grados.querySelector('input').focus(); return; }
    if (!necesidad.value.trim()){ msg.textContent = 'Describe la necesidad en términos funcionales.'; necesidad.focus(); return; }
    if (!estrategias.value.trim()){ msg.textContent = 'Escribe al menos una estrategia para el aula.'; estrategias.focus(); return; }
    if (revisar().length){ msg.textContent = 'Quita los términos médicos antes de guardar.'; alerta.scrollIntoView({ block:'center' }); return; }
    this.disabled = true; this.textContent = 'Guardando…';
    try { await neeFichas.guardar(codigo, { grado:g, necesidad:necesidad.value, estrategias:estrategias.value, evaluacion:evaluacion.value, revision:revision.value, responsable:responsable.value },
        $$('input[type=checkbox]', adapt).filter(x => x.checked).map(x => x.value));
      toast(f ? 'Ficha actualizada.' : 'Ficha creada. El docente del curso ya puede verla.'); location.hash = '#/nee?e=' + codigo + '&v=ficha';
    } catch(e){ msg.textContent = 'No se guardó: ' + e.message; this.disabled = false; this.textContent = 'Guardar ficha'; } }},'Guardar ficha');
  view.append(h('section',{class:'card stack','aria-label':'Editar ficha'},
    h('div',{class:'nee-form'}, grados,
      h('div',{class:'notice warn full'}, h('span',{}, h('b',{},'No registre diagnósticos médicos. '), 'Ni nombres de trastornos, síndromes o medicación. Describa lo que se observa en el aula y lo que el estudiante necesita para aprender. La documentación clínica, si existe, se archiva aparte en el DECE.')),
      h('label',{class:'f full'}, h('span',{}, 'Necesidad educativa (descripción funcional) * ', h('small',{},'qué le cuesta y qué le ayuda')), necesidad),
      h('label',{class:'f'}, h('span',{}, 'Estrategias en el aula * ', h('small',{},'qué hace el docente')), estrategias),
      h('label',{class:'f'}, h('span',{}, 'Ajustes de evaluación ', h('small',{},'tiempos, formatos, apoyos')), evaluacion),
      alerta,
      h('label',{class:'f'}, 'Próxima revisión', revision),
      h('label',{class:'f'}, 'Responsable', responsable),
      h('div',{class:'full stack',style:'gap:6px'}, h('span',{style:'font-size:.84rem;font-weight:600;color:var(--ink-2)'},'Adaptaciones de acceso en la plataforma'),
        h('p',{class:'small muted',style:'margin:0'},'Se aplican solas cuando el estudiante entra (letra grande, lectura en voz alta, sin límite de tiempo…).'), adapt)),
    msg,
    h('div',{class:'row',style:'gap:8px;flex-wrap:wrap'}, guardar,
      f ? h('a',{class:'btn',href:'#/nee?e=' + codigo + '&v=ficha'},'Ver para imprimir') : null,
      h('a',{class:'btn ghost',href:'#/nee'},'Cancelar'),
      f ? h('button',{class:'btn ghost danger-text',style:'margin-left:auto',onclick:()=>confirmar({ peligro:true, titulo:`¿Quitar la ficha de ${u.nombre}?`, texto:'La ficha se elimina y el docente deja de verla. Las adaptaciones de acceso en la plataforma se conservan (puedes desmarcarlas antes). El cambio queda en el registro de auditoría.', boton:'Quitar ficha',
        accion: async()=>{ await neeFichas.quitar(codigo); toast('Ficha quitada.'); location.hash = '#/nee'; } })},'Quitar ficha') : null),
    f && f.actualizado ? h('p',{class:'small muted',style:'margin:0'}, `Última actualización: ${fechaHora(f.actualizado)}${f.responsable ? ' · ' + f.responsable : ''}.`) : null));
  revisar();
}

/* ---------- resumen de un curso para compartir con el docente ---------- */
function neeVistaResumen(view, cursoId){
  const c = Admin.curso(cursoId);
  const volver = h('a',{class:'btn sm ghost nee-noprint',href:'#/nee'},'← Volver a la lista');
  if (!c){ view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'DECE'), h('h1',{},'Curso no encontrado'))), h('div',{class:'row'}, volver)); return; }
  const d = c.docenteId ? (Store.s.docentes || {})[c.docenteId] : null, nomCurso = `${BIO.nivel(c.nivel).corto} ${c.paralelo}`;
  const L = Users.ofCourse(+c.nivel, c.paralelo).filter(u => neeFichas.de(u.codigo)).map(u => ({ u, f:neeFichas.de(u.codigo) }));
  const texto = () => [`Resumen de adaptaciones curriculares · ${nomCurso} (${BIO.programas[c.prog].n}) · Año lectivo ${Inst.anio()}`, 'Documento confidencial del DECE: no lo comparta con estudiantes ni familias.', '',
    ...L.flatMap(({u, f}) => [`■ ${u.nombre} — ${NEE_GRADOS[f.grado] ? NEE_GRADOS[f.grado].n + ' (' + NEE_GRADOS[f.grado].t.toLowerCase() + ')' : ''}`, `  Qué necesita: ${f.necesidad || '—'}`, `  En clase: ${String(f.estrategias || '—').trim().replace(/\.?\s*\n\s*/g, '; ')}`,
      `  Al evaluar: ${String(f.evaluacion || '—').trim().replace(/\.?\s*\n\s*/g, '; ')}`, `  Acceso en la plataforma: ${neeAdaptTxt(neeFichas.adapt(u.codigo)).join(', ') || 'ninguna'}`, `  Próxima revisión: ${neeFecha(f.revision)}`, ''])].join('\n');
  const registrar = modo => Auditoria.registrar('compartir_resumen_nee', { curso:nomCurso, estudiantes:L.length, modo });
  view.append(h('div',{class:'page-head nee-noprint'},
    h('div',{}, h('span',{class:'eyebrow'},'DECE · Resumen para el docente'), h('h1',{}, nomCurso), h('p',{}, `${BIO.programas[c.prog].n} · Docente: ${d ? d.nombre : 'sin asignar'} · ${L.length} estudiante${L.length === 1 ? '' : 's'} con ficha`)),
    h('div',{class:'row'}, volver)));
  if (!L.length){ view.append(h('div',{class:'card'}, h('p',{},'Ningún estudiante de este curso tiene ficha.'))); return; }
  view.append(h('div',{class:'row nee-noprint',style:'gap:8px;margin-bottom:14px;flex-wrap:wrap'},
    h('button',{class:'btn primary sm',onclick:()=>{ registrar('imprimir'); window.print(); }},'Imprimir'),
    h('button',{class:'btn sm',onclick:()=>{ registrar('copiar'); copiarTexto(texto(), 'Resumen copiado. Compártalo solo con el docente del curso.'); }},'Copiar texto'),
    d && d.email ? h('a',{class:'btn sm',href:`mailto:${d.email}?subject=${encodeURIComponent('Adaptaciones curriculares · ' + nomCurso + ' (confidencial)')}&body=${encodeURIComponent(texto())}`,onclick:()=>registrar('correo')},'Enviar al docente por correo') : null,
    h('span',{class:'small muted'},'El docente también lo ve en su panel, pestaña "Adaptaciones NEE".')));
  view.append(h('div',{class:'nee-print-only'}, h('h2',{}, `Adaptaciones curriculares · ${nomCurso}`), h('p',{class:'small'}, `${BIO.programas[c.prog].n} · Docente: ${d ? d.nombre : '—'} · Año lectivo ${Inst.anio()} · ${fechaCorta(Date.now())}`)));
  view.append(neeAviso(), h('div',{style:'height:12px'}), neeTarjetas(L, true));
}

/* tarjetas de lectura para el aula */
function neeTarjetas(L, conNecesidad){
  return h('div',{class:'nee-cards'}, L.map(({u, f}) => { const ad = neeAdaptTxt(neeFichas.adapt(u.codigo)), g = NEE_GRADOS[f.grado];
    return h('article',{class:'nee-card','aria-label':`Ficha de ${u.nombre}`},
      h('div',{class:'row',style:'justify-content:space-between;gap:8px;flex-wrap:wrap'}, h('span',{class:'t'}, u.nombre), neeGradoPill(f.grado)),
      g ? h('span',{class:'small muted'}, g.d) : null,
      h('dl',{},
        conNecesidad && f.necesidad ? [h('dt',{},'Qué necesita'), h('dd',{}, f.necesidad)] : null,
        h('dt',{},'En clase'), h('dd',{}, f.estrategias || '—'),
        h('dt',{},'Al evaluar'), h('dd',{}, f.evaluacion || 'Mismos criterios del curso.'),
        ad.length ? [h('dt',{},'Acceso en la plataforma'), h('dd',{}, ad.join(' · '))] : null),
      h('div',{class:'small muted'}, `Próxima revisión: ${neeFecha(f.revision)}${f.responsable ? ' · DECE: ' + f.responsable : ''}`),
      f.ejemplo ? h('span',{class:'small muted'},'Ejemplo ficticio.') : null); }));
}

/* =====================================================================
   Ganchos que llama el núcleo
   ===================================================================== */
/* pestaña "Adaptaciones NEE" del panel docente: fichas del curso visible, en modo de lectura */
function neeBloqueDocente(roster, rerender){
  if (!esRol('docente','admin','dece','autoridad')) return null;
  const L = (roster || []).map(e => ({ e, u:Users.get(e.id) || { codigo:e.id, nombre:e.nombre, year:e.year, paralelo:e.paralelo }, f:neeFichas.de(e.id) })).filter(x => x.f)
    .map(x => ({ u:Object.assign({}, x.u, { nombre:x.e.nombre || x.u.nombre }), f:x.f }));
  const box = h('section',{class:'card stack','aria-labelledby':'nee-h-doc-bloque',style:'margin-bottom:16px'},
    h('div',{class:'row',style:'justify-content:space-between;gap:10px;flex-wrap:wrap'},
      h('div',{}, h('span',{class:'eyebrow',id:'nee-h-doc-bloque'},'Fichas de adaptación curricular · DECE'),
        h('p',{class:'small muted',style:'margin:4px 0 0'}, esRol('docente') ? 'Las registra el DECE. Úsalas para planificar la clase y la evaluación; no las compartas con otros estudiantes ni con familias.' : 'Registradas por el DECE para los estudiantes de este curso.')),
      neeFichas.editar() ? h('a',{class:'btn sm',href:'#/nee'},'Gestionar fichas') : null));
  if (!L.length){ box.append(h('p',{class:'small muted',style:'margin:0'},'Ningún estudiante de este curso tiene ficha de adaptación curricular registrada por el DECE.')); return box; }
  box.append(neeTarjetas(L, true));
  return box;
}
/* aviso compacto al asignar tareas: estudiantes del curso con ajustes de evaluación */
function neeAvisoTareas(nivel, paralelo){
  if (!esRol('docente','admin','dece','autoridad')) return null;
  const L = Users.ofCourse(+nivel, paralelo).map(u => ({ u, f:neeFichas.de(u.codigo) })).filter(x => x.f && String(x.f.evaluacion || '').trim());
  if (!L.length) return null;
  const corto = t => { const s = String(t).trim().replace(/\.?\s*\n\s*/g, '; '); return s.length > 140 ? s.slice(0, 137) + '…' : s; };
  return h('div',{class:'notice info nee-aviso'}, h('div',{},
    h('details',{}, h('summary',{}, `🤝 ${L.length} estudiante${L.length === 1 ? '' : 's'} de este curso tiene${L.length === 1 ? '' : 'n'} ajustes de evaluación del DECE`),
      h('ul',{}, L.map(({u, f}) => h('li',{}, h('b',{}, u.nombre), ` (${NEE_GRADOS[f.grado] ? NEE_GRADOS[f.grado].n : ''}): ${corto(f.evaluacion)}`))),
      h('a',{href:'#/docente?t=nee',class:'small'},'Ver las fichas completas en Adaptaciones NEE'))));
}
</script>
