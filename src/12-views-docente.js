<script>
/* =====================================================================
   PANEL DOCENTE: resumen, libro de calificaciones, estudiantes,
   códigos por año y paralelo, adaptaciones NEE, seguimiento y reportes
   ===================================================================== */
const DOC = {
  year: 2, par: 'A',
  prog(){ if (['admin','autoridad','dece'].includes(Store.ses.rol)){ const ui = Store.s.ui = Store.s.ui || {}; return ui.admProg || 'cn'; }
    const p = Store.prog(); return (Store.ses.rol==='docente' && Store.ses.programa) ? Store.ses.programa : p; },
  /* cursos que puede ver: los asignados por la administración o, si no hay, todos los de su asignatura */
  cursosVisibles(){
    const prog = DOC.prog();
    if (['autoridad','dece'].includes(Store.ses.rol)){ const cs = (typeof Admin !== 'undefined' ? Admin.cursos() : []).filter(c => c.prog === prog); if (cs.length || Cloud.on) return cs; }
    const asign = (Store.ses.rol === 'docente' && Store.ses.docenteId && typeof Admin !== 'undefined') ? Admin.cursosDeDocente(Store.ses.docenteId) : [];
    if (asign.length) return asign;
    const cursos = (typeof Admin !== 'undefined' ? Admin.cursos() : []).filter(c => c.prog === prog);
    if (cursos.length) return cursos;
    if (Cloud.on) return [];
    return BIO.nivelesDe(prog).flatMap(n => ['A','B'].map(p => ({ id:'v'+n.id+p, prog, nivel:n.id, paralelo:p, virtual:true })));
  },
  nivelesVisibles(){ return [...new Set(DOC.cursosVisibles().map(c => +c.nivel))].sort((a,b)=>a-b); },
  paralelosDe(nivel){ return [...new Set(DOC.cursosVisibles().filter(c=>+c.nivel===+nivel).map(c=>c.paralelo))].sort(); },
  sincronizar(){ const ns = DOC.nivelesVisibles(); if (!ns.length) return;
    if (!ns.includes(+DOC.year)) DOC.year = ns[0];
    const ps = DOC.paralelosDe(DOC.year); if (!ps.includes(DOC.par)) DOC.par = ps[0] || 'A'; },
  codes(){ return Store.s.docente.codes || BIO.accessCodes; },
  /* fila del estudiante de demostración con su actividad real en este navegador */
  demoRow(){ const notas = {}; BIO.gradeItems.forEach(i => { const g = Store.gradeDemo(i.id); if (g!=null) notas[i.id] = g; });
    return { id:Store.s.user.id, nombre:Store.s.user.nombre+' (demo en vivo)', year:2, paralelo:'A', email:'mateo.andrade@anai.edu.ec',
      rep:'Sra. Andrade', repTel:'0998765432', notas, dias:Store.daysAway(), min: Store.s.timeMin + Math.round(Store.s.events.length*0.4) + 186,
      adapt:(Store.s.docente.adapt||{})[Store.s.user.id] || [], demo:true }; },
  /* Si la docente cargó su listado, ese curso reemplaza al de demostración */
  importados(){ return Users.ofCourse(DOC.year, DOC.par); },
  /* fila del libro para un usuario cargado (la usan el listado y el reporte individual) */
  fila(u){
    const vivo = Store.ses.userId === u.codigo;
    const notas = Object.assign({}, u.notas || {}, (Store.s.docente.notas||{})[u.codigo] || {});
    if (vivo) BIO.gradeItems.forEach(i => { const g = Store.gradeOf(i.id); if (g!=null) notas[i.id] = g; });
    const dias = vivo ? Store.daysAway() : (u.ultimoAcceso ? Math.floor((Date.now()-u.ultimoAcceso)/86400000) : null);
    return { id:u.codigo, nombre:u.nombre + (vivo?' (en vivo)':''), year:u.year, paralelo:u.paralelo, email:u.email,
      rep:u.rep || 'Representante', repTel:(u.tel||'0990000000').replace(/\D/g,'') || '0990000000',
      notas, dias, min: vivo ? Store.s.timeMin + Math.round(Store.s.events.length*0.4) : 0,
      adapt:(Store.s.docente.adapt||{})[u.codigo] || u.adapt || [], demo:vivo, real:true };
  },
  roster(){
    const imp = DOC.importados();
    if (imp.length) return imp.map(u => DOC.fila(u));
    if (DOC.prog()==='cn' || Cloud.on) return [];
    const r = BIO.rosterOf(DOC.year, DOC.par).map(e => Object.assign({}, e, { adapt:(Store.s.docente.adapt||{})[e.id] || e.adapt }));
    if (DOC.year===2 && DOC.par==='A' && DOC.prog()==='bio') r.push(DOC.demoRow()); return r; },
  items(){ return BIO.progOf(DOC.year)==='cn' ? BIO.cnItemsDe(DOC.year) : BIO.gradeItemsOf(DOC.year); },
  /* v1.8: promedio del periodo que se ve en el libro (quimestre o año completo) con la ponderación de la institución */
  prom(e){
    if (typeof Periodos === 'undefined'){ const its = DOC.items().filter(i => e.notas[i.id]!=null); if (!its.length) return null;
      const w = its.reduce((a,i)=>a+i.peso,0); return Math.round(its.reduce((a,i)=>a+e.notas[i.id]*i.peso,0)/w*10)/10; }
    const items = DOC.items(), f = DOC.fechas(e);
    return Periodos.vista === 'anual' ? Periodos.resumen(e.id, items, e.notas || {}, f).anual : Periodos.promedio(items, DOC.notasVista(e));
  },
  fechas(e){ return ((Store.s.docente||{}).fechas||{})[e.id] || {}; },
  /* notas del estudiante en el periodo visible (las del cierre si el quimestre está cerrado) */
  notasVista(e){ return typeof Periodos === 'undefined' ? (e.notas || {}) : Periodos.notasVista(e.id, e.notas || {}, DOC.fechas(e)); },
  entregadas(e){ return DOC.items().filter(i => e.notas[i.id]!=null).length; },
  tareasVencidas(e){ return Tareas.de(e.year, e.paralelo).filter(t => t.vence < Date.now() && e.notas[t.act]==null).length; },
  /* v1.8: el módulo de año lectivo (17) define el quimestre que se está viendo */
  periodoCerrado(){ if (typeof Periodos === 'undefined') return false; if (Periodos.vistaCerrada()) return true;
    return Periodos.vista === 'anual' && Periodos.cerrado(Periodos.de(Date.now()) || Periodos.actual()); }
};
const notaClass = n => n==null ? 'na' : n>=8 ? 'ok' : n>=6 ? 'mid' : 'low';
const fmtNota = n => n==null ? '–' : n.toFixed(1).replace('.0','');
const diasTxt = d => d===0 ? 'hoy' : d===1 ? 'ayer' : `hace ${d} días`;

route('/docente', (view, q) => {
  view.classList.add('wide');
  let tab = q.t || 'resumen';
  const vistaGlobal = ['admin','autoridad','dece'].includes(Store.ses.rol);
  if (vistaGlobal && (q.e === 'cn' || q.e === 'bio')) (Store.s.ui = Store.s.ui || {}).admProg = q.e;
  const head = h('div',{class:'page-head'},
    h('div',{}, h('span',{class:'eyebrow'},'Panel docente · '+(BIO.programas[DOC.prog()]||BIO.programas.bio).n),
      h('h1',{}, (BIO.programas[DOC.prog()]||BIO.programas.bio).n + ' · ' + (BIO.programas[DOC.prog()]||BIO.programas.bio).sub),
      h('p',{}, Store.ses.rol==='admin' ? 'Vista de administración: todos los cursos de ambos entornos, con las mismas herramientas del docente.'
        : soloLectura() ? `Vista de ${ROLES[Store.ses.rol].n}: todos los cursos de ambos entornos, en modo de solo lectura.`
        : Users.all().length ? 'Cursos y estudiantes cargados por la administración.' : 'Datos de demostración ficticios, salvo la fila del estudiante demo, que refleja la actividad real registrada en este navegador.')),
    h('div',{class:'row'}, soloLectura() ? null : h('a',{class:'btn sm',href:'#/familia'},'Ver como familia'), soloLectura() ? null : h('a',{class:'btn sm ghost',href: DOC.prog()==='cn' ? '#/cn' : '#/panel'},'Ver como estudiante'), h('button',{class:'btn sm ghost',onclick:cerrarSesion},'Cerrar sesión')));
  DOC.sincronizar();
  const esAdmin = vistaGlobal;
  const selProg = esAdmin ? h('span',{class:'row',style:'gap:6px;margin-right:10px'}, h('span',{class:'small muted'},'Entorno:'),
    ...['cn','bio'].map(pg => h('button',{class:'chip'+(DOC.prog()===pg?' picked':''),onclick:()=>{ (Store.s.ui = Store.s.ui || {}).admProg = pg; Store.save(); location.hash = '#/docente?t='+tab+'&e='+pg; }}, (BIO.programas[pg]||{}).n || pg))) : null;
  const sync = Cloud.on ? h('div',{class:'small muted',style:'margin:-6px 0 12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap'}) : null;
  const pintarSync = () => { if (!sync) return; sync.innerHTML='';
    sync.append(h('span',{}, Cloud.ultimoPull ? `Datos del servidor · actualizados ${timeAgo(Cloud.ultimoPull)}` : 'Datos del servidor'),
      h('button',{class:'btn sm ghost',onclick:async function(){ this.disabled=true; this.textContent='Actualizando…'; try { await Cloud.pull(); toast('Datos actualizados.'); } catch(e){ toast('No se pudo actualizar: '+e.message); } render(); }},'↻ Actualizar')); };
  const picker = h('div',{class:'row',style:'gap:8px;flex-wrap:wrap;margin-bottom:14px'},
    selProg,
    h('span',{class:'small muted'},'Curso:'),
    h('span',{class:'small muted',style:'margin-left:8px'},'Paralelo:'),
    h('span',{id:'pars',class:'row',style:'gap:6px'}));
  const tabs = h('div',{class:'tabs',role:'tablist'});
  /* pestañas según el rol; los módulos de gestión suman las suyas en DOC_TABS_EXTRA */
  const rolAct = Store.ses.rol;
  const TABS = (soloLectura()
      ? [['resumen','Resumen'],['calificaciones','Calificaciones'],['estudiantes','Estudiantes'],['seguimiento','Seguimiento'],['nee','Adaptaciones NEE']]
      : [['resumen','Resumen'],['calificaciones','Calificaciones'],['tareas','Tareas'],['estudiantes','Estudiantes'],['seguimiento','Seguimiento'],['codigos','Mis cursos'],['nee','Adaptaciones NEE']]
        .concat(rolAct==='admin' ? [['diagnostico','Diagnóstico'],['usuarios','Usuarios y contraseñas']] : []));
  DOC_TABS_EXTRA.forEach(x => { if (x.roles && !x.roles.includes(rolAct)) return; if (TABS.some(t => t[0] === x.id)) return;
    const i = x.antes ? TABS.findIndex(t => t[0] === x.antes) : -1; i >= 0 ? TABS.splice(i, 0, [x.id, x.t]) : TABS.push([x.id, x.t]); });
  if (!TABS.some(t => t[0] === tab)) tab = 'resumen';
  TABS.forEach(([id,t]) => tabs.append(h('button',{role:'tab','aria-selected':String(id===tab),'data-tab':id,onclick:()=>{ tab=id; render(); }},t)));
  const body = h('div',{class:'stack'});
  view.append(head, picker, ...(sync ? [sync] : []), tabs, h('div',{style:'height:14px'}), body);

  function render(){
    $$('button',tabs).forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
    DOC.sincronizar(); pintarSync();
    if (selProg) $$('button',selProg).forEach((b,i) => b.classList.toggle('picked', ['cn','bio'][i]===DOC.prog()));
    const nv = DOC.nivelesVisibles();
    $$('.curso-chip',picker).forEach(c => c.remove());
    const ancla = [...picker.children].find(x => x.textContent === 'Curso:');
    nv.slice().reverse().forEach(n => ancla.after(h('button',{class:'chip curso-chip'+(+DOC.year===+n?' picked':''),onclick:()=>{ DOC.year=n; DOC.sincronizar(); render(); }}, BIO.nivel(n).corto)));
    if (!nv.length) ancla.after(h('span',{class:'small muted curso-chip'}, 'Sin cursos en este entorno'));
    const pars = $('#pars'); pars.innerHTML='';
    DOC.paralelosDe(DOC.year).forEach(p => pars.append(h('button',{class:'chip'+(DOC.par===p?' picked':''),onclick:()=>{ DOC.par=p; render(); }}, p)));
    body.innerHTML='';
    const extra = DOC_TABS_EXTRA.find(x => x.id === tab);
    if (extra) extra.fn(body, render);
    else ({ resumen:tabResumen, calificaciones:tabNotas, tareas:tabTareas, diagnostico:tabDiagnostico, estudiantes:tabEstudiantes, usuarios:tabUsuarios, seguimiento:tabSeguimiento, codigos:tabCodigos, nee:tabNEE })[tab](body, render);
    Store.log('docente_tab',{tab, year:DOC.year, paralelo:DOC.par});
  }
  render();
  if (Cloud.on && Cloud.ses && Date.now() - (Cloud.ultimoPull || 0) > 60000)
    Cloud.pull().then(() => { if (document.body.contains(body)) render(); }).catch(e => console.warn('actualizar', e));
});

/* ---------- Diagnóstico (solo administración) ---------- */
function tabDiagnostico(body){
  const cursos = (typeof Admin !== 'undefined' ? Admin.cursos() : []).slice().sort((a,b) => a.nivel - b.nivel || String(a.paralelo).localeCompare(b.paralelo));
  const us = Users.all(), notas = Store.s.docente.notas || {}, fechas = Store.s.docente.fechas || {};
  const nNotas = u => Object.values(notas[u.codigo] || {}).filter(x => x != null).length;
  const ult = u => Math.max(0, ...Object.values(fechas[u.codigo] || {}));
  const totNotas = us.reduce((a,u) => a + nNotas(u), 0);
  body.append(h('div',{class:'grid g4'},
    [[cursos.length,'cursos'],[us.length,'estudiantes con cuenta'],[us.filter(u=>u.ultimoAcceso).length,'estudiantes que ya entraron'],[totNotas,'notas en el servidor']]
      .map(([v,l]) => h('div',{class:'card stat'}, h('span',{class:'v'},String(v)), h('span',{class:'l'},l)))));
  if (Cloud.on) body.append(h('p',{class:'small muted'}, Cloud.ultimoPull ? `Leído del servidor ${timeAgo(Cloud.ultimoPull)}. Pulse "↻ Actualizar" para ver lo más reciente.` : ''));
  /* curso por curso */
  const filas = cursos.map(c => { const est = us.filter(u => +u.year === +c.nivel && u.paralelo === c.paralelo);
    const d = c.docenteId && (Store.s.docentes||{})[c.docenteId];
    const entraron = est.filter(u => u.ultimoAcceso).length, conNotas = est.filter(u => nNotas(u) > 0).length, n = est.reduce((a,u)=>a+nNotas(u),0);
    const ultima = Math.max(0, ...est.map(ult));
    const alertas = [];
    if (!d) alertas.push('Sin docente asignado: el docente no puede ver a estos estudiantes ni sus notas.');
    if (!est.length) alertas.push('Sin estudiantes en este curso.');
    if (est.length && entraron && !n) alertas.push('Hay estudiantes que entraron pero ninguna nota llegó al servidor.');
    return { c, d, est, entraron, conNotas, n, ultima, alertas }; });
  body.append(h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Estado por curso'),
    h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, ...['Curso','Entorno','Docente','Estudiantes','Ya entraron','Con notas','Notas','Última nota',''].map(t => h('th',{},t)))),
      h('tbody',{}, filas.map(f => h('tr',{},
        h('td',{}, h('b',{}, `${BIO.nivel(f.c.nivel).corto} ${f.c.paralelo}`)),
        h('td',{}, (BIO.programas[f.c.prog]||{}).n || f.c.prog),
        h('td',{}, f.d ? f.d.nombre : h('span',{class:'pill bad'},'Sin asignar')),
        h('td',{}, String(f.est.length)), h('td',{}, String(f.entraron)), h('td',{}, String(f.conNotas)), h('td',{}, String(f.n)),
        h('td',{class:'small muted'}, f.ultima ? timeAgo(f.ultima) : '–'),
        h('td',{}, f.alertas.length ? h('span',{class:'pill warn',title:f.alertas.join(' ')}, '⚠ '+f.alertas[0]) : h('span',{class:'pill ok'},'Bien'),
          h('button',{class:'btn sm ghost',style:'margin-left:6px',onclick:()=>{ (Store.s.ui = Store.s.ui || {}).admProg = f.c.prog; DOC.year = f.c.nivel; DOC.par = f.c.paralelo; Store.save(); location.hash = '#/docente?t=calificaciones&e='+f.c.prog; }},'Ver notas')))))))));
  /* estudiantes que no coinciden con ningún curso */
  const huerfanos = us.filter(u => !cursos.some(c => +c.nivel === +u.year && c.paralelo === u.paralelo));
  const box = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Estudiantes que no coinciden con ningún curso'),
    h('p',{class:'small muted'},'Su año y paralelo no corresponden a un curso creado. Ningún docente los ve. Corrígelos en Administración → Estudiantes (Editar o "Cambiar año o paralelo"), o crea el curso que falta.'));
  if (!huerfanos.length) box.append(h('div',{class:'notice ok'},'Todos los estudiantes están en un curso existente.'));
  else box.append(h('div',{class:'tablewrap'}, h('table',{class:'data'}, h('thead',{}, h('tr',{}, h('th',{},'Código'), h('th',{},'Estudiante'), h('th',{},'Año y paralelo registrados'))),
    h('tbody',{}, huerfanos.slice(0,60).map(u => h('tr',{}, h('td',{class:'mono'},u.codigo), h('td',{},u.nombre), h('td',{}, `${(BIO.nivel(u.year)||{}).corto || u.year} "${u.paralelo}"`)))))));
  body.append(box);
  body.append(h('div',{class:'notice info',style:'margin-top:16px'}, h('span',{}, h('b',{},'Cómo leer esta página. '),
    'Para que un docente vea las notas de un estudiante hacen falta tres cosas: que el curso exista con el mismo año y paralelo del estudiante, que el curso tenga ese docente asignado, y que el estudiante haya entrado con su usuario al resolver los retos. Si un curso dice "Hay estudiantes que entraron pero ninguna nota llegó", pídeles que vuelvan a entrar con su usuario en el mismo equipo donde trabajaron: la plataforma reenvía sola lo que tenga guardado.')));
}

/* ---------- Resumen ---------- */
function tabResumen(body, rerender){
  const r = DOC.roster(), items = DOC.items();
  /* v1.8: todo el resumen mira el periodo elegido (quimestre o año completo), igual que el libro */
  if (typeof Periodos !== 'undefined' && rerender) body.append(docPeriodoSel(rerender));
  const perTxt = typeof Periodos !== 'undefined' ? Periodos.nombreVista().toLowerCase() : '';
  const vis = new Map(r.map(e => [e, DOC.notasVista(e)]));
  const proms = r.map(e => DOC.prom(e)).filter(x=>x!=null);
  const avg = proms.length ? Math.round(proms.reduce((a,b)=>a+b,0)/proms.length*10)/10 : 0;
  const inact = r.filter(e=>e.dias>=4);
  const entregas = r.reduce((a,e)=>a+items.filter(i => vis.get(e)[i.id]!=null).length,0), total = r.length*items.length;
  const top = h('div',{class:'grid g4'});
  [[r.length,'estudiantes'],[proms.length ? avg.toFixed(1).replace('.0','') : '–',`promedio del curso · ${perTxt || 'sobre 10'}`],[Math.round(entregas/Math.max(1,total)*100)+' %',`actividades entregadas · ${perTxt || 'año'}`],[inact.length,'sin entrar hace 4+ días']]
    .forEach(([v,l]) => top.append(h('div',{class:'card stat'}, h('span',{class:'v'},String(v)), h('span',{class:'l'},l))));
  body.append(top);
  const g = h('div',{class:'grid g2',style:'margin-top:16px'});
  // promedio por actividad
  const porItem = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Promedio por actividad' + (perTxt ? ' · ' + perTxt : '')),
    h('div',{class:'bars'}, items.map(i => { const ns = r.map(e=>vis.get(e)[i.id]).filter(x=>x!=null); const m = ns.length ? ns.reduce((a,b)=>a+b,0)/ns.length : 0;
      return h('div',{class:'bar'}, h('span',{title:i.t},i.corto), h('div',{class:'track'},h('i',{class: m<6?'bad':'', style:`width:${m*10}%`})), h('span',{class:'v'}, m?m.toFixed(1):'–')); })),
    h('p',{class:'small muted'},'Las actividades sin entregar no promedian. Toca "Calificaciones" para ver estudiante por estudiante.'));
  // dificultades: con estudiantes reales se calculan de sus intentos; el bloque de ejemplo solo en la demostración
  let errs;
  if (r.some(e => e.real)){
    const it = Store.s.docente.intentos || {}; const stats = items.map(i => { const xs = r.map(e => (it[e.id]||{})[i.id]).filter(x => x != null);
      return { i, n:xs.length, m: xs.length ? xs.reduce((a,b)=>a+b,0)/xs.length : 0 }; }).filter(x => x.n).sort((a,b)=>b.m-a.m).slice(0,6);
    const bajas = items.map(i => { const ns = r.map(e=>vis.get(e)[i.id]).filter(x=>x!=null); return { i, n:ns.length, bajo: ns.filter(x=>x<7).length }; }).filter(x=>x.bajo).sort((a,b)=>b.bajo-a.bajo).slice(0,5);
    errs = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Retos que más intentos piden'),
      stats.length ? h('div',{class:'bars'}, stats.map(x => h('div',{class:'bar'}, h('span',{title:x.i.t},x.i.corto), h('div',{class:'track'},h('i',{class:x.m>=3?'bad':'',style:`width:${Math.min(100,x.m/5*100)}%`})), h('span',{class:'v'}, x.m.toFixed(1).replace('.',',')))))
        : h('p',{class:'small muted'},'Aparecerá cuando los estudiantes resuelvan sus primeros retos.'),
      h('span',{class:'eyebrow',style:'margin-top:6px'},'Conviene retomar en clase'),
      bajas.length ? h('div',{class:'row'}, bajas.map(x => h('span',{class:'pill warn',title:`${x.bajo} de ${x.n} bajo 7`}, `${x.i.corto} · ${x.bajo} bajo 7`)))
        : h('p',{class:'small muted'},'Todavía no hay actividades con notas bajo 7.'),
      h('p',{class:'small muted'},'Promedio de intentos hasta resolver cada reto: más intentos indican un concepto que cuesta.'));
  } else {
    const T = BIO.teacherClass;
    errs = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Preguntas con mayor porcentaje de error · ejemplo'),
      h('div',{class:'bars'}, T.preguntasError.slice(0,5).map(q => h('div',{class:'bar'}, h('span',{title:q.q,style:'overflow:hidden;text-overflow:ellipsis;white-space:nowrap'},q.q), h('div',{class:'track'},h('i',{class:q.err>=35?'bad':'',style:`width:${q.err}%`})), h('span',{class:'v'},q.err+'%')))),
      h('span',{class:'eyebrow',style:'margin-top:6px'},'Conceptos que conviene retomar'),
      h('div',{class:'row'}, [...new Set(T.preguntasError.map(q=>q.concepto))].slice(0,5).map(c => h('span',{class:'pill'},c))));
  }
  g.append(porItem, errs); body.append(g);
  // acompañamiento
  const list = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Necesitan acompañamiento'),
    h('p',{class:'small muted'},'Promedio bajo 7, tareas vencidas sin entregar o varios días sin entrar.'));
  const sev = e => (DOC.prom(e)==null?3:0) + ((DOC.prom(e)??10)<7?2:0) + (e.dias>=7?2:e.dias>=4?1:0) + (DOC.tareasVencidas(e)>=2?1:0);
  const need = r.filter(e => sev(e) > 0).sort((a,b)=>sev(b)-sev(a) || (DOC.prom(a)??0)-(DOC.prom(b)??0)).slice(0,6);
  if (!need.length) list.append(h('div',{class:'notice ok'},'Ningún estudiante en esta situación. Buen momento para proponer un reto adicional.'));
  need.forEach(e => list.append(h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--bg-3)'}, e.nombre[0]),
    h('span',{}, h('div',{class:'t'},e.nombre), h('div',{class:'d'},`Promedio ${fmtNota(DOC.prom(e))} · ${DOC.tareasVencidas(e)} tarea(s) vencida(s) · última conexión ${diasTxt(e.dias)}`)),
    h('div',{class:'row',style:'margin-left:auto;gap:6px'}, h('a',{class:'btn sm',href:'#/docente/reporte/'+e.id},'Reporte'), soloLectura() ? null : h('button',{class:'btn sm ghost',onclick:()=>msgModal(e)},'Escribir')))));
  body.append(list);
}

/* ---------- Libro de calificaciones ---------- */
/* v1.8: selector de periodo (quimestres y año completo) con su estado */
function docPeriodoSel(rerender){
  const v = Periodos.vista, hoy = Periodos.actual();
  const ops = [...Periodos.lista().map(q => [q.id, q.n, q]), ['anual', 'Año completo', null]];
  return h('div',{class:'row anio-psel',role:'group','aria-label':'Periodo del libro de calificaciones'},
    h('span',{class:'small muted'},'Periodo:'),
    ...ops.map(([id, n, q]) => h('button',{class:'chip'+(v===id?' picked':''),'aria-pressed':String(v===id),
      title: q ? `${Periodos.rango(q)}${q.cerrado ? ' · cerrado' : ''}` : 'Promedio de los dos quimestres',
      onclick:()=>{ Periodos.vista = id; rerender(); }},
      n, q ? h('span',{class:'pill '+(q.cerrado ? 'bad' : q.id===hoy ? 'ok' : '')}, q.cerrado ? '🔒 cerrado' : q.id===hoy ? 'en curso' : 'abierto') : null)));
}
/* pastilla NEE: adaptaciones de acceso o ficha del DECE (solo personal de la institución) */
function docPillNEE(e){
  if (!esRol('admin','docente','autoridad','dece')) return null;
  const nee = (Store.s.nee||{})[e.id]; const GR = { 1:'grado 1 (de acceso)', 2:'grado 2 (no significativa)', 3:'grado 3 (significativa)' };
  const t = [nee ? `Ficha del DECE: adaptación curricular de ${GR[nee.grado] || 'grado '+nee.grado}` : null, e.adapt.length ? 'Adaptaciones de acceso: '+e.adapt.map(k=>BIO.adaptaciones[k]).join(', ') : null].filter(Boolean).join(' · ');
  return t ? h('span',{class:'pill'+(nee ? ' warn' : ''),style:'margin-left:6px',title:t,'aria-label':'NEE. '+t}, 'NEE') : null;
}
function tabNotas(body, rerender){
  const r = DOC.roster(), items = DOC.items();
  const v = Periodos.vista, anual = v === 'anual', q = anual ? null : Periodos.q(v);
  const cerradoVista = DOC.periodoCerrado(), ro = soloLectura();
  const filas = r.slice().sort((a,b)=>a.nombre.localeCompare(b.nombre)).map(e => ({ e, n:DOC.notasVista(e), R: anual ? Periodos.resumen(e.id, items, e.notas || {}, DOC.fechas(e)) : null }));
  const P = Inst.ponderacion();
  const modoTxt = P.modo === 'categoria' ? 'El promedio se calcula por categorías, con los porcentajes que fijó la institución.' : 'El promedio pondera cada actividad según su peso (entre paréntesis en el encabezado).';
  body.append(h('div',{class:'row',style:'justify-content:space-between;flex-wrap:wrap;gap:8px'},
    h('div',{class:'stack',style:'gap:2px'}, h('b',{},`Libro de calificaciones · ${BIO.year(DOC.year).corto} ${DOC.par} · ${Periodos.nombreVista(v)}`),
      h('span',{class:'small muted'}, `Escala sobre 10. ${modoTxt}` + (q ? ` Fechas: ${Periodos.rango(q)}.` : ' Anual = promedio de los dos quimestres.'))),
    h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'},
      h('button',{class:'btn sm primary',onclick:()=>copiarCSV(r,items)},'Copiar para Excel/Sheets'),
      h('button',{class:'btn sm',onclick:()=>descargarCSV(r,items)},'Descargar CSV'),
      h('button',{class:'btn sm',onclick:()=>{ const c = (typeof Admin !== 'undefined' && Admin.cursoDe(DOC.year, DOC.par)) || { nivel:DOC.year, paralelo:DOC.par, prog:BIO.progOf(DOC.year) };
        Libreta.descargar([{ curso:c, filas:Libreta.filasRoster(r) }], { detalle:true }); }},'Libreta Excel'),
      h('button',{class:'btn sm ghost',onclick:()=>window.print()},'Imprimir'))));
  body.append(docPeriodoSel(rerender));
  if (q && q.cerrado) body.append(h('div',{class:'notice warn'}, h('span',{}, h('b',{},`🔒 ${q.n} cerrado${q.cerradoEn ? ' el '+fechaCorta(Date.parse(q.cerradoEn)) : ''}. `), 'Se muestran las notas que quedaron fijas al cerrarlo; ya no se pueden cambiar. Si hay un error, pide a la administración que lo reabra.')));
  else if (anual && cerradoVista && !ro) body.append(h('div',{class:'notice info'}, h('span',{}, `El ${Periodos.nombreVista(Periodos.de(Date.now()) || Periodos.actual()).toLowerCase()} está cerrado: en la vista del año completo las notas son de solo consulta.`)));
  else if (q && !ro && Periodos.fechaNueva(v) == null) body.append(h('div',{class:'notice info'}, h('span',{}, `El ${q.n.toLowerCase()} empieza el ${Periodos.fechaTxt(q.inicio)}. Todavía no tiene notas.`)));
  const qCols = anual ? [...Periodos.lista().map(x => [x.id, x.id]), ['anual','Anual'], ['esc','Escala']] : [['prom','Promedio '+v]];
  const thead = h('tr',{}, h('th',{class:'sticky'},'Estudiante'), ...items.map(i => h('th',{class:'rot',title:`${i.t} · peso ${i.peso}`}, i.corto, h('span',{class:'small muted'},` (${i.peso})`))),
    h('th',{class:anual?'anio-c':''},'Entregadas'), ...qCols.map(([k,t]) => h('th',{class:anual?'anio-c':''}, t)));
  const bloqueado = ro || cerradoVista;
  const rows = filas.map(({ e, n, R }) => h('tr',{},
    h('td',{class:'sticky'}, h('a',{href:'#/docente/reporte/'+e.id}, e.nombre), docPillNEE(e)),
    ...items.map(i => { const x = n[i.id];
      return h('td',{class:'nota '+notaClass(x)+(bloqueado?' ro':''),title:`${e.nombre} · ${i.t}`,tabindex:'0',role:'button','aria-label':`${e.nombre}, ${i.t}: ${x==null?'sin nota':fmtNota(x)}`,
        onclick:()=>notaModal(e,i,x,rerender), onkeydown:ev=>{ if (ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); notaModal(e,i,x,rerender); } }}, fmtNota(x)); }),
    h('td',{class:'mono'+(anual?' anio-c':'')}, items.filter(i=>n[i.id]!=null).length+'/'+items.length),
    ...(anual
      ? [...Periodos.lista().map(x => h('td',{class:'mono anio-c '+notaClass(R[x.id])}, fmtNota(R[x.id]))),
         h('td',{class:'mono anio-c '+notaClass(R.anual),style:'font-weight:700'}, fmtNota(R.anual)),
         h('td',{class:'anio-c',title:R.cualitativa ? R.cualitativa.n : 'Sin notas'}, R.cualitativa ? h('b',{},R.cualitativa.k) : '–')]
      : [h('td',{class:'mono '+notaClass(DOC.prom(e)),style:'font-weight:700'}, fmtNota(DOC.prom(e)))])));
  const media = xs => { const ns = xs.filter(x=>x!=null); return ns.length ? Math.round(ns.reduce((a,b)=>a+b,0)/ns.length*10)/10 : null; };
  const prom = items.map(i => media(filas.map(f=>f.n[i.id])));
  const pieQ = anual ? [...Periodos.lista().map(x => media(filas.map(f=>f.R[x.id]))), media(filas.map(f=>f.R.anual))] : [media(filas.map(f=>DOC.prom(f.e)))];
  const pa = anual ? Periodos.cualitativa(pieQ[pieQ.length-1]) : null;
  const foot = h('tr',{class:'foot'}, h('td',{class:'sticky'},'Promedio del curso'), ...prom.map(p => h('td',{class:'mono '+notaClass(p)}, fmtNota(p))), h('td',{class:anual?'anio-c':''}),
    ...pieQ.map(p => h('td',{class:'mono '+notaClass(p)+(anual?' anio-c':'')}, fmtNota(p))), anual ? h('td',{class:'anio-c'}, pa ? h('b',{},pa.k) : '') : null);
  body.append(h('div',{class:'tablewrap'}, h('table',{class:'data grades'}, h('thead',{},thead), h('tbody',{},rows), h('tfoot',{},foot))));
  if (anual) body.append(h('p',{class:'small muted',style:'margin-top:10px'}, 'Escala: ' + ESCALA.map(x => `${x.k} = ${x.n.toLowerCase()}`).join(' · ') + '.'));
  body.append(h('p',{class:'small muted',style:'margin-top:10px'}, bloqueado ? 'Toca cualquier nota para ver el detalle.' : 'Toca cualquier nota para ver el detalle o registrarla a mano. Cada actividad tiene una sola nota en el año: cuenta en el quimestre en que se registró.'));
}
function notaModal(e, item, n, rerender){
  const cruda = (e.notas||{})[item.id], f0 = DOC.fechas(e)[item.id];
  const vista = typeof Periodos !== 'undefined' ? Periodos.vista : 'anual';
  const qNota = (cruda != null && typeof Periodos !== 'undefined') ? (Periodos.de(f0) || Periodos.actual()) : null;
  /* ¿se puede editar desde aquí? */
  let ed = { ok:true, fecha:Date.now() };
  if (soloLectura()) ed = { ok:false, msg:'Vista de solo lectura.' };
  else if (typeof Periodos !== 'undefined'){
    if (vista !== 'anual' && n == null && cruda != null && qNota !== vista) ed = { ok:false, msg:`Esta actividad ya tiene nota (${fmtNota(cruda)}) en el ${Periodos.nombreVista(qNota).toLowerCase()}. Cada actividad tiene una sola nota en el año; para verla o cambiarla, elige ese quimestre.` };
    else if (DOC.periodoCerrado() && !(vista === 'anual' && cruda != null && !Periodos.cerrado(qNota))) ed = { ok:false, msg:'Este quimestre está cerrado: la nota quedó fija. Solo la administración puede reabrirlo.' };
    else ed = Periodos.puedeEditar(f0, cruda != null);
  }
  const inp = h('input',{type:'number',min:'0',max:'10',step:'0.1',value:n!=null?n:'','aria-label':'Nota sobre 10',style:'max-width:120px'});
  const dondeTxt = typeof Periodos === 'undefined' ? '' : (n != null || cruda != null)
    ? ` · ${Periodos.nombreVista(qNota || Periodos.actual())}${f0 ? ' · registrada el '+fechaCorta(f0) : ''}`
    : (ed.ok && ed.periodo ? ` · se registrará en el ${Periodos.nombreVista(ed.periodo).toLowerCase()}` : '');
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},e.nombre), h('h3',{},item.t),
    h('p',{class:'small muted'},`Unidad ${item.unidad} · ${item.tipo} · peso ${item.peso} · ${BIO.year(DOC.year).corto} ${DOC.par}${dondeTxt}`),
    n==null ? h('div',{class:'notice warn'}, (soloLectura() || !ed.ok) ? 'Sin nota en este periodo.' : 'Sin entregar. Puedes registrar una nota manualmente o recordarle al estudiante.') : h('div',{class:'notice ok'},`Registrada: ${fmtNota(n)} sobre 10.`),
    !ed.ok ? h('p',{class:'small muted'}, ed.msg) :
    h('div',{class:'row'}, inp, h('button',{class:'btn primary sm',onclick:()=>{ const v = parseFloat(String(inp.value).replace(',','.')); if (isNaN(v) || v < 0 || v > 10) return toast('Escribe una nota entre 0 y 10.');
      const val = Math.round(Math.max(0,Math.min(10,v))*10)/10;
      const nn = Store.s.docente.notas; const antes = (nn[e.id]||{})[item.id]; (nn[e.id] = nn[e.id] || {})[item.id] = val;
      const F = Store.s.docente.fechas = Store.s.docente.fechas || {}; (F[e.id] = F[e.id] || {})[item.id] = ed.fecha || Date.now();
      Store.save();
      Auditoria.local(antes == null ? 'registrar_nota' : 'cambiar_nota', { estudiante:e.nombre, codigo:e.id, actividad:item.t, antes:antes ?? null, despues:val, periodo:ed.periodo || null }, { tabla:'notas', registro:e.id+':'+item.id });
      if (Cloud.on){ const uid = Cloud.uidDe(e.id); if (uid) Cloud.pushNota(uid, item.id, val, { origen:'docente', fecha:ed.fecha || Date.now() }).catch(er=>toast('No se guardó en el servidor: '+er.message)); }
      const st = BIO.getRoster().find(x=>x.id===e.id); if (st) st.notas[item.id] = val;
      closeModal(); rerender(); toast('Nota registrada.'); }},'Guardar nota')),
    h('div',{class:'row'}, h('a',{class:'btn sm',href:'#/docente/reporte/'+e.id,onclick:closeModal},'Ver reporte del estudiante'), h('button',{class:'btn sm ghost',onclick:closeModal},'Cerrar'))));
  if (ed.ok && !soloLectura()) setTimeout(() => inp.focus(), 30);
}
function csvOf(r, items){
  const conP = typeof Periodos !== 'undefined', v = conP ? Periodos.vista : null, anual = v === 'anual', q = conP && !anual ? Periodos.q(v) : null;
  const num = x => x!=null ? String(x).replace('.',',') : '';
  const qs = conP ? Periodos.lista() : [];
  const head = ['Estudiante','Correo', ...items.map(i=>i.corto), 'Entregadas', ...(anual ? [...qs.map(x=>'Promedio '+x.id), 'Promedio anual', 'Escala'] : [q ? 'Promedio '+q.id : 'Promedio'])];
  const lines = [];
  if (conP){ lines.push(['Libro de calificaciones', `${BIO.year(DOC.year).corto} ${DOC.par}`, 'Año lectivo '+Inst.anio()].join(';'));
    lines.push(['Periodo', Periodos.nombreVista(v) + (q ? ` (${Periodos.rango(q)})${q.cerrado ? ' · cerrado' : ''}` : ' (promedio de los dos quimestres)')].join(';'));
    lines.push(['Ponderación', Libreta.ponderacionTxt()].join(';')); lines.push(''); }
  lines.push(head.join(';'));
  r.slice().sort((a,b)=>a.nombre.localeCompare(b.nombre)).forEach(e => { const n = DOC.notasVista(e);
    const R = anual ? Periodos.resumen(e.id, items, e.notas || {}, DOC.fechas(e)) : null;
    lines.push([e.nombre, e.email, ...items.map(i => num(n[i.id])), items.filter(i=>n[i.id]!=null).length,
      ...(anual ? [...qs.map(x => num(R[x.id])), num(R.anual), R.cualitativa ? R.cualitativa.k : ''] : [num(DOC.prom(e))])].map(x => String(x ?? '').replace(/;/g, ',')).join(';')); });
  return lines.join('\n');
}
function docAuditarCSV(r, formato){ Auditoria.registrar('exportar_calificaciones', { curso:`${BIO.year(DOC.year).corto} ${DOC.par}`, periodo: typeof Periodos !== 'undefined' ? Periodos.vista : null, estudiantes:r.length, formato }); }
function copiarCSV(r, items){ const t = csvOf(r,items); docAuditarCSV(r, 'portapapeles'); navigator.clipboard?.writeText(t).then(()=>toast('Copiado. Pégalo en Excel o en Google Sheets.'), ()=>openModal(h('div',{class:'stack'}, h('h3',{},'Copia manualmente'), h('textarea',{style:'min-height:240px',readonly:true},t)))); }
function descargarCSV(r, items){
  const blob = new Blob(['﻿'+csvOf(r,items)], {type:'text/csv;charset=utf-8'});
  const per = typeof Periodos !== 'undefined' ? '-' + Periodos.vista : '';
  const a = h('a',{href:URL.createObjectURL(blob), download:`calificaciones-${BIO.year(DOC.year).corto.replace(/\W/g,'')}-${DOC.par}${per}.csv`});
  document.body.append(a); a.click(); a.remove(); docAuditarCSV(r, 'csv'); toast('CSV descargado.');
}

/* ---------- Estudiantes ---------- */
function tabEstudiantes(body, rerender){
  const r = DOC.roster().sort((a,b)=>a.nombre.localeCompare(b.nombre));
  body.append(h('p',{class:'small muted'},`${r.length} estudiantes en ${BIO.year(DOC.year).corto} paralelo ${DOC.par}. Toca un nombre para abrir su reporte imprimible.`));
  const tbl = h('table',{class:'data'},
    h('thead',{},h('tr',{},h('th',{},'Estudiante'),h('th',{},'Promedio'),h('th',{},'Entregadas'),h('th',{},'Tiempo'),h('th',{},'Última conexión'),h('th',{},'Adaptaciones'),h('th',{},''))),
    h('tbody',{}, r.map(e => h('tr',{},
      h('td',{}, h('a',{href:'#/docente/reporte/'+e.id}, h('b',{},e.nombre)), h('div',{class:'small muted'},e.email)),
      h('td',{class:'mono '+notaClass(DOC.prom(e))}, fmtNota(DOC.prom(e))),
      h('td',{class:'mono'}, DOC.entregadas(e)+'/'+DOC.items().length),
      h('td',{class:'mono'}, fmtMin(e.min)),
      h('td',{}, h('span',{class:'pill '+(e.dias>=7?'bad':e.dias>=4?'warn':'ok')}, diasTxt(e.dias))),
      h('td',{}, e.adapt.length ? e.adapt.map(k=>h('span',{class:'pill'},BIO.adaptaciones[k])) : h('span',{class:'small muted'},'—')),
      h('td',{}, h('div',{class:'row',style:'gap:6px'}, h('a',{class:'btn sm',href:'#/docente/reporte/'+e.id},'Reporte'), soloLectura() ? null : h('button',{class:'btn sm ghost',onclick:()=>msgModal(e)},'Escribir'),
        ...DOC_ACCIONES_ESTUDIANTE.map(f => { try { return f(e, rerender); } catch(er){ console.warn(er); return null; } }).filter(Boolean)))))));
  body.append(h('div',{class:'tablewrap'}, tbl));
}
/* v1.8: acciones extra por estudiante (restablecer contraseña en clase, código de familia…): f(e, rerender) → nodo o null */
const DOC_ACCIONES_ESTUDIANTE = [];

/* ---------- Seguimiento y mensajes ---------- */
/* Busca un ítem de calificación en el libro del programa activo (CN o Biología). */
function itemDe(id){ return BIO.cnGradeItems.find(i=>i.id===id) || BIO.gradeItems.find(i=>i.id===id) || null; }
function tabSeguimiento(body){
  const r = DOC.roster(); const inact = r.filter(e=>e.dias>=4).sort((a,b)=>b.dias-a.dias);
  const venc = Tareas.de(DOC.year, DOC.par);
  body.append(h('div',{class:'card stack'}, h('div',{class:'row',style:'justify-content:space-between'}, h('span',{class:'eyebrow'},'Tareas asignadas a este curso'), h('a',{class:'btn sm',href:'#/docente?t=tareas'},'Asignar o editar')),
    venc.length ? h('div',{class:'stack',style:'gap:8px'}, venc.map(t => { const rec = Tareas.recurso(t.act); const d = Math.ceil((t.vence-Date.now())/86400000);
      const faltan = r.filter(e=>e.notas[t.act]==null).length;
      return h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--bg-3)'}, d<0?'⏰':'📌'),
        h('span',{}, h('div',{class:'t'},rec.t), h('div',{class:'d'}, tarFaltan(t.vence)+` · faltan ${faltan} de ${r.length}`)),
        h('span',{class:'pill '+(d<0?'bad':d<=2?'warn':'')}, tarFecha(t.vence))); }))
      : h('p',{class:'small muted'},'Sin tareas asignadas a este curso. Asígnalas desde la pestaña Tareas.'),
    h('p',{class:'small muted'},'Las fechas de entrega alimentan los avisos del estudiante y el resumen de la familia.')));
  const box = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Sin entrar hace 4 días o más'),
    h('p',{class:'small muted'},'Sin costo: la plataforma prepara el mensaje y tú lo envías por WhatsApp o correo desde tu propio teléfono o cuenta.'));
  if (!inact.length) box.append(h('div',{class:'notice ok'},'Todo el curso se conectó en los últimos días.'));
  inact.forEach(e => box.append(h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--warn-soft,var(--bg-3))'},'👋'),
    h('span',{}, h('div',{class:'t'},e.nombre), h('div',{class:'d'},`Última conexión ${diasTxt(e.dias)} · promedio ${fmtNota(DOC.prom(e))} · representante: ${e.rep}`)),
    h('div',{class:'row',style:'margin-left:auto;gap:6px'}, h('button',{class:'btn sm primary',onclick:()=>msgModal(e)},'Preparar mensaje')))));
  body.append(box);
  /* Trabajo hecho fuera de los contenidos del año: se registra igual y aquí se ve, para que
     nada de lo que hace el estudiante quede invisible para su docente. */
  const delAnio = new Set(DOC.items().map(i=>i.id));
  const fuera = [];
  r.forEach(e => Object.keys(e.notas||{}).forEach(id => { if (delAnio.has(id) || e.notas[id]==null) return;
    const it = itemDe(id) || (BIO.activities[id] ? { t:BIO.activities[id].t } : null); if (!it) return;
    fuera.push({ nombre:e.nombre, t:it.t, nota:e.notas[id] }); }));
  const fb = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Exploró por su cuenta, fuera de su año'),
    h('p',{class:'small muted'},'No promedia en su año, pero cuenta como iniciativa: la plataforma es abierta y el estudiante puede adelantarse o repasar.'));
  if (!fuera.length) fb.append(h('p',{class:'small muted'},'Todavía nadie ha explorado contenidos de otro año.'));
  fuera.slice(0,12).forEach(f => fb.append(h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--bg-3)'},'✦'),
    h('span',{}, h('div',{class:'t'},f.nombre), h('div',{class:'d'},f.t)),
    h('span',{class:'pill',style:'margin-left:auto'}, fmtNota(f.nota)))));
  body.append(fb);
  body.append(h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Con el servidor de la fase 2'),
    h('p',{class:'small'},'Se puede programar un resumen semanal automático por correo para estudiantes y representantes, sin costo, usando la cuenta institucional. Hoy, el envío lo haces tú desde aquí en dos toques.')));
}
function msgModal(e){
  const item = Tareas.de(e.year, e.paralelo).filter(t => e.notas[t.act]==null)[0];
  const it = item && Tareas.recurso(item.act);
  const cn = DOC.prog()==='cn';
  const asig = cn ? 'Ciencias Naturales' : 'Biología', marca = cn ? 'ANAI Ciencias' : 'ANAI BioLab';
  const txt = `Hola ${e.nombre.split(' ')[0]}, te saluda tu docente de ${asig}. Vi que hace ${e.dias} días no entras a ${marca}${it?` y que aún tienes pendiente "${it.t}"`:''}. ¿Necesitas ayuda con algo? Puedes retomar desde donde te quedaste: son 10 minutos. Un abrazo.`;
  const ta = h('textarea',{style:'min-height:130px'}, txt);
  const wa = () => `https://wa.me/593${e.repTel.replace(/^0/,'')}?text=${encodeURIComponent(ta.value)}`;
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Mensaje para '+e.nombre), h('h3',{},'Acompañamiento'),
    h('p',{class:'small muted'},`Representante: ${e.rep} · ${e.repTel} · ${e.email}`),
    ta,
    h('div',{class:'row'},
      h('a',{class:'btn primary sm',href:wa(),target:'_blank',rel:'noopener',onclick:()=>{ Store.log('mensaje_docente',{canal:'whatsapp'}); }},'Enviar por WhatsApp'),
      h('a',{class:'btn sm',href:`mailto:${e.email}?subject=${encodeURIComponent(asig+' · '+marca)}&body=${encodeURIComponent(txt)}`,onclick:()=>{ Store.log('mensaje_docente',{canal:'correo'}); }},'Enviar por correo'),
      h('button',{class:'btn sm ghost',onclick:()=>{ navigator.clipboard?.writeText(ta.value).then(()=>toast('Mensaje copiado.')); }},'Copiar'),
      h('button',{class:'btn sm ghost',onclick:closeModal},'Cerrar'))));
}

/* ---------- Códigos y años ---------- */
function tabCodigos(body, rerender){
  if (Store.ses.rol !== 'admin'){ return tabMisCursos(body); }
  const codes = DOC.codes();
  body.append(h('div',{class:'notice info'}, h('span',{},'En esta versión de demostración los códigos se validan en el propio navegador: sirven para organizar, no para restringir. Cuando conectemos el servidor gratuito, el código matriculará de verdad al estudiante y quedará ligado a su cuenta institucional.')));
  const gen = () => { const y = DOC.year, p = DOC.par; const rnd = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,4);
    const nuevo = { code:`${y}BGU-${p}-${rnd}`, year:y, paralelo:p, activo:true, usos:0 };
    const list = (Store.s.docente.codes || BIO.accessCodes.slice()).map(c => (c.year===y && c.paralelo===p) ? Object.assign({},c,{activo:false}) : c);
    list.unshift(nuevo); Store.s.docente.codes = list; Store.save(); toast('Código nuevo generado. El anterior quedó inactivo.'); rerender(); };
  body.append(h('div',{class:'row',style:'justify-content:space-between;margin:14px 0 8px;flex-wrap:wrap;gap:8px'},
    h('b',{},`Códigos de acceso · ${BIO.year(DOC.year).corto} ${DOC.par}`),
    h('div',{class:'row',style:'gap:6px'}, h('button',{class:'btn sm primary',onclick:gen},'Generar código nuevo'),
      h('button',{class:'btn sm ghost',onclick:()=>{ Store.s.docente.codes = null; Store.save(); toast('Códigos restablecidos.'); rerender(); }},'Restablecer'))));
  const tbl = h('table',{class:'data'}, h('thead',{},h('tr',{},h('th',{},'Código'),h('th',{},'Año'),h('th',{},'Paralelo'),h('th',{},'Estado'),h('th',{},'Usos'),h('th',{},''))),
    h('tbody',{}, codes.map(c => h('tr',{},
      h('td',{}, h('b',{class:'mono'},c.code)), h('td',{}, BIO.year(c.year).corto), h('td',{},c.paralelo),
      h('td',{}, h('span',{class:'pill '+(c.activo?'ok':'')}, c.activo?'Activo':'Inactivo')), h('td',{class:'mono'},String(c.usos)),
      h('td',{}, h('div',{class:'row',style:'gap:6px'},
        h('button',{class:'btn sm ghost',onclick:()=>{ navigator.clipboard?.writeText(c.code).then(()=>toast('Código copiado. Compártelo con tu curso.')); }},'Copiar'),
        h('button',{class:'btn sm ghost',onclick:()=>{ const list = (Store.s.docente.codes || BIO.accessCodes.slice()).map(x => x.code===c.code ? Object.assign({},x,{activo:!x.activo}) : x); Store.s.docente.codes = list; Store.save(); rerender(); }}, c.activo?'Desactivar':'Activar')))))));
  body.append(h('div',{class:'tablewrap'}, tbl));
  body.append(h('div',{class:'card stack',style:'margin-top:18px'}, h('span',{class:'eyebrow'},'Código para representantes'),
    h('p',{class:'small muted'},'Un código por estudiante da acceso de solo lectura a su familia.'),
    h('div',{class:'row'}, h('b',{class:'mono'},BIO.familyCode), h('span',{class:'small muted'},'· Mateo Andrade (demostración)'),
      h('button',{class:'btn sm ghost',onclick:()=>{ navigator.clipboard?.writeText(BIO.familyCode).then(()=>toast('Código copiado.')); }},'Copiar'))));
  // plan del año
  const plan = h('div',{class:'card stack',style:'margin-top:18px'}, h('span',{class:'eyebrow'},'Plan del año: qué unidades ve cada año'),
    h('p',{class:'small muted'},'Toca una unidad para moverla de año. Los estudiantes ven las unidades de su año y las de años anteriores como repaso.'));
  const yu = Store.yearUnits();
  BIO.years.forEach(y => {
    const row = h('div',{class:'row',style:'gap:6px;flex-wrap:wrap;align-items:center'}, h('b',{style:'min-width:76px'},y.corto));
    BIO.units.forEach(u => { const on = (yu[y.id]||[]).includes(u.n);
      row.append(h('button',{class:'chip'+(on?' picked':''),title:u.t,onclick:()=>{ const map = JSON.parse(JSON.stringify(Store.yearUnits()));
        BIO.years.forEach(z => map[z.id] = (map[z.id]||[]).filter(x=>x!==u.n)); map[y.id] = [...(map[y.id]||[]), u.n].sort((a,b)=>a-b);
        Store.s.yearUnits = map; Store.save(); toast(`Unidad ${u.n} asignada a ${y.corto}.`); rerender(); }}, 'U'+u.n)); });
    plan.append(row);
  });
  plan.append(h('button',{class:'btn sm ghost',style:'align-self:flex-start',onclick:()=>{ Store.s.yearUnits=null; Store.save(); toast('Plan restablecido.'); rerender(); }},'Restablecer plan sugerido'));
  body.append(plan);
}

/* ---------- Mis cursos (vista del docente, sin privilegios de administración) ---------- */
function tabMisCursos(body){
  const cursos = DOC.cursosVisibles();
  body.append(h('div',{class:'notice info'}, h('span',{}, 'Los cursos, los usuarios de los estudiantes y las contraseñas los administra la coordinación desde la consola de administración. Aquí ves lo que te fue asignado; si falta un curso o un estudiante, solicítalo a administración.')));
  if (!cursos.length){ body.append(h('div',{class:'ph',style:'margin-top:16px'},'Todavía no tienes cursos asignados.')); return; }
  const tbl = h('table',{class:'data'}, h('thead',{},h('tr',{},h('th',{},'Curso'),h('th',{},'Estudiantes'),h('th',{},'Credenciales entregadas'),h('th',{},'Código de aula'),h('th',{},''))),
    h('tbody',{}, cursos.map(c => { const es = Users.ofCourse(+c.nivel, c.paralelo);
      const code = (Store.s.docente.codes || BIO.accessCodes).find(x => +x.year===+c.nivel && x.paralelo===c.paralelo && x.activo);
      return h('tr',{},
        h('td',{}, h('b',{}, `${BIO.nivel(c.nivel).corto} "${c.paralelo}"`)),
        h('td',{class:'mono'}, String(es.length)),
        h('td',{class:'mono'}, es.length ? `${es.filter(u=>u.entregada).length}/${es.length}` : '—'),
        h('td',{class:'mono small'}, code ? code.code : '—'),
        h('td',{}, h('button',{class:'btn sm ghost',onclick:()=>{ DOC.year = +c.nivel; DOC.par = c.paralelo; navigate('#/docente?t=calificaciones'); render(); }},'Ver calificaciones'))); })));
  body.append(h('div',{class:'tablewrap',style:'margin-top:16px'}, tbl));
}

/* ---------- Adaptaciones NEE ---------- */
function tabNEE(body, rerender){
  const r = DOC.roster().sort((a,b)=>a.nombre.localeCompare(b.nombre));
  /* v1.8: fichas de adaptación curricular que registra el DECE (módulo 21) */
  if (typeof neeBloqueDocente === 'function') try { const b = neeBloqueDocente(r, rerender); if (b) body.append(b); } catch(e){ console.warn('nee', e); }
  body.append(h('span',{class:'eyebrow',style:'margin-top:8px'},'Adaptaciones de acceso en la plataforma'));
  body.append(h('div',{class:'notice info'}, h('span',{},'Se registran únicamente las adaptaciones de acceso (cómo lee y trabaja el estudiante), nunca diagnósticos ni información médica. La información sensible se maneja en el DECE.')));
  const tbl = h('table',{class:'data'}, h('thead',{},h('tr',{},h('th',{},'Estudiante'), ...Object.values(BIO.adaptaciones).map(t=>h('th',{class:'rot'},t)))),
    h('tbody',{}, r.map(e => h('tr',{}, h('td',{},e.nombre), ...Object.keys(BIO.adaptaciones).map(k => h('td',{style:'text-align:center'},
      h('input',{type:'checkbox',checked:e.adapt.includes(k),disabled:esRol('autoridad'),'aria-label':`${BIO.adaptaciones[k]} para ${e.nombre}`,onchange:ev=>{
        const map = Store.s.docente.adapt; const cur = new Set(map[e.id] || e.adapt);
        ev.target.checked ? cur.add(k) : cur.delete(k); map[e.id] = [...cur]; Store.save();
        Auditoria.local('cambiar_adaptacion_acceso', { estudiante:e.nombre, codigo:e.id, adaptacion:BIO.adaptaciones[k], activa:ev.target.checked }, { tabla:'adaptaciones', registro:e.id });
        if (Cloud.on){ const uid = Cloud.uidDe(e.id); if (uid) Cloud.pushAdapt(uid, map[e.id]).catch(er=>toast('No se guardó en el servidor: '+er.message)); }
        if (e.demo){ const a = Store.s.a11y; if (k==='letra-grande') Store.setA11y({text: ev.target.checked?1.15:1});
          if (k==='tipografia') Store.setA11y({font: ev.target.checked?'hyper':''});
          if (k==='voz') Store.setA11y({tts: ev.target.checked}); if (k==='menos-movimiento') Store.setA11y({motion: ev.target.checked});
          if (k==='pistas') Store.setA11y({hints: ev.target.checked}); }
        toast('Adaptación actualizada.'); }})))))));
  body.append(h('div',{class:'tablewrap'}, tbl));
  body.append(h('p',{class:'small muted',style:'margin-top:10px'},'Al activar una adaptación del estudiante de demostración, la plataforma se ajusta de inmediato en este navegador para que puedas ver el efecto.'));
}

/* ---------- Usuarios y contraseñas ---------- */
function tabUsuarios(body, rerender){
  const lista = Users.ofCourse(DOC.year, DOC.par), todos = Users.all();
  let revision = null;
  body.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},'Cómo funciona. '),
    'Cargas el listado del curso, la plataforma arma el usuario de cada estudiante con su código y el dominio institucional (por ejemplo ',
    h('b',{class:'mono'},'215444@'+DOMINIO_EST), ') y genera una contraseña temporal. Con el CSV que se descarga aquí, TIC crea las cuentas reales en un solo paso.')));

  /* --- Paso 1: cargar --- */
  const ta = h('textarea',{placeholder:'Pega aquí el listado (puedes copiarlo directamente desde Excel)…',style:'min-height:130px;font-family:var(--font-m);font-size:.8rem'});
  const file = h('input',{type:'file',accept:'.csv,.txt,text/csv',style:'display:none',onchange:e=>{ const f = e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => { ta.value = rd.result; toast(`Archivo "${f.name}" cargado. Revisa el listado.`); }; rd.readAsText(f, 'utf-8'); }});
  const paso1 = h('div',{class:'card stack',style:'margin-top:16px'},
    h('span',{class:'eyebrow'},'Paso 1 · Cargar el listado del curso'),
    h('p',{class:'small muted'},'Columnas reconocidas: código, apellidos, nombres (o "estudiante" con el nombre completo), año, paralelo y correo del representante. El año y el paralelo se toman del curso seleccionado arriba si el archivo no los trae.'),
    h('div',{class:'row',style:'gap:8px;flex-wrap:wrap'},
      h('button',{class:'btn sm',onclick:()=>file.click()},'Subir archivo CSV'), file,
      h('button',{class:'btn sm ghost',onclick:()=>descargarTexto('plantilla-estudiantes.csv', Users.plantillaCSV())},'Descargar plantilla'),
      h('button',{class:'btn sm ghost',onclick:()=>{ ta.value = Users.ejemplo(); toast('Ejemplo cargado: 8 estudiantes de 2.º A.'); }},'Cargar un ejemplo')),
    ta,
    h('div',{class:'row',style:'gap:8px'},
      h('button',{class:'btn primary',onclick:()=>{ revision = Users.revisar(ta.value, DOC.year, DOC.par); pintarRevision(); }},'Revisar listado'),
      h('span',{class:'small muted'},`Se cargará en ${BIO.year(DOC.year).corto} paralelo ${DOC.par} si el archivo no indica otro.`)));
  body.append(paso1);

  /* --- Paso 2: revisión --- */
  const paso2 = h('div',{class:'stack',style:'margin-top:16px'});
  body.append(paso2);
  function pintarRevision(){
    paso2.innerHTML='';
    if (!revision) return;
    const { ok, errores, avisos=[] } = revision;
    const box = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Paso 2 · Revisión'),
      h('div',{class:'row'}, h('span',{class:'pill ok'},`${ok.length} estudiantes listos`), errores.length ? h('span',{class:'pill bad'},`${errores.length} con problemas`) : null,
        ok.filter(x=>x.existe).length ? h('span',{class:'pill warn'},`${ok.filter(x=>x.existe).length} ya existían (se actualizan)`) : null));
    if (avisos.length) box.append(h('div',{class:'notice info'}, h('span',{}, avisos.slice(0,5).map(e=>e.msg).join(' · '))));
    if (errores.length) box.append(h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Revisa estas filas: '), errores.slice(0,6).map(e => `fila ${e.fila}: ${e.msg}`).join(' · '))));
    if (ok.length){
      box.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
        h('thead',{},h('tr',{},h('th',{},'Código'),h('th',{},'Estudiante'),h('th',{},'Curso'),h('th',{},'Usuario que se creará'),h('th',{},'Estado'))),
        h('tbody',{}, ok.slice(0,60).map(f => h('tr',{}, h('td',{class:'mono'},f.codigo), h('td',{},f.nombre), h('td',{},`${BIO.year(f.year).corto} ${f.paralelo}`),
          h('td',{class:'mono'},Users.emailOf(f.codigo)), h('td',{}, f.existe ? h('span',{class:'pill warn'},'Ya existe') : h('span',{class:'pill ok'},'Nuevo'))))))));
      if (ok.length > 60) box.append(h('p',{class:'small muted'},`Se muestran los primeros 60 de ${ok.length}.`));
      box.append(h('div',{class:'row',style:'gap:8px'},
        h('button',{class:'btn primary',onclick:async function(){ this.disabled = true; const r = await Users.importar(ok);
          toast(`${r.nuevos} usuarios creados y ${r.actualizados} actualizados.`); revision = null; rerender(); }},'Generar usuarios y contraseñas'),
        h('button',{class:'btn ghost',onclick:()=>{ revision = null; paso2.innerHTML=''; }},'Cancelar')));
    }
    paso2.append(box);
  }

  /* --- Paso 3: credenciales --- */
  const paso3 = h('div',{class:'stack',style:'margin-top:16px'});
  body.append(paso3);
  function pintarLista(){
    paso3.innerHTML='';
    const l = Users.ofCourse(DOC.year, DOC.par);
    if (!l.length){ paso3.append(h('div',{class:'ph'}, h('b',{},'Todavía no hay usuarios en este curso. '), 'Carga el listado arriba: en menos de un minuto tendrás el usuario y la contraseña de cada estudiante, listos para entregar.')); return; }
    paso3.append(h('div',{class:'row',style:'justify-content:space-between;flex-wrap:wrap;gap:8px'},
      h('div',{class:'stack',style:'gap:2px'}, h('b',{},`Credenciales · ${BIO.year(DOC.year).corto} ${DOC.par}`),
        h('span',{class:'small muted'},`${l.length} usuarios · ${l.filter(u=>u.entregada).length} entregadas · dominio ${DOMINIO_EST}`)),
      h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'},
        h('button',{class:'btn sm primary',onclick:()=>descargarTexto(`credenciales-${BIO.year(DOC.year).corto.replace(/\W/g,'')}-${DOC.par}.csv`, Users.csvCredenciales(l))},'Credenciales CSV'),
        h('button',{class:'btn sm',onclick:()=>descargarTexto('usuarios-google-workspace.csv', Users.csvGoogle(l), 'text/csv')},'CSV para Google Workspace'),
        h('button',{class:'btn sm',onclick:()=>descargarTexto('usuarios-microsoft365.csv', Users.csvMicrosoft(l), 'text/csv')},'CSV para Microsoft 365'),
        h('a',{class:'btn sm',href:`#/docente/credenciales/${DOC.year}/${DOC.par}`},'Fichas para imprimir'))));
    let visible = false;
    const tabla = h('div',{class:'tablewrap'});
    const pintarTabla = () => { tabla.innerHTML='';
      tabla.append(h('table',{class:'data'},
        h('thead',{},h('tr',{},h('th',{},'Código'),h('th',{},'Estudiante'),h('th',{},'Usuario'),h('th',{},'Contraseña temporal'),h('th',{},'Estado'),h('th',{},''))),
        h('tbody',{}, l.map(u => h('tr',{},
          h('td',{class:'mono'},u.codigo),
          h('td',{}, h('b',{},u.nombre), u.rep ? h('div',{class:'small muted'},'Rep.: '+u.rep) : null),
          h('td',{class:'mono small'},u.email),
          h('td',{class:'mono'}, u.temp ? (visible ? u.temp : '••••••••') : h('span',{class:'small muted'},'la cambió el estudiante')),
          h('td',{}, u.entregada ? h('span',{class:'pill ok'},'Entregada') : h('span',{class:'pill warn'},'Por entregar'),
            u.ultimoAcceso ? h('div',{class:'small muted'},'Ingresó '+timeAgo(u.ultimoAcceso)) : h('div',{class:'small muted'},'Sin ingresar')),
          h('td',{style:'white-space:nowrap'}, h('div',{class:'row',style:'gap:6px;flex-wrap:nowrap'},
            h('button',{class:'btn sm ghost',onclick:()=>credModal(u, pintarLista)},'Entregar'),
            h('button',{class:'btn sm ghost',onclick:async()=>{ const p = await Users.resetPass(u.codigo); toast('Nueva contraseña: '+p); pintarLista(); }},'Restablecer')))))))); };
    paso3.append(h('div',{class:'row',style:'gap:8px;margin:10px 0'},
      h('button',{class:'btn sm ghost',onclick:function(){ visible = !visible; this.textContent = visible ? 'Ocultar contraseñas' : 'Mostrar contraseñas'; pintarTabla(); }},'Mostrar contraseñas'),
      h('button',{class:'btn sm ghost',onclick:()=>{ l.forEach(u=>Users.entregar(u.codigo,true)); toast('Todas marcadas como entregadas.'); pintarLista(); }},'Marcar todas como entregadas'),
      h('button',{class:'btn sm ghost',onclick:()=>{ if (confirm(`¿Borrar los ${Users.all().length} usuarios cargados? Esta acción no se puede deshacer.`)){ Users.borrarTodo(); rerender(); toast('Listado borrado.'); } }},'Borrar listado completo')));
    pintarTabla(); paso3.append(tabla);
    paso3.append(h('div',{class:'notice warn',style:'margin-top:12px'}, h('span',{}, h('b',{},'Sobre la seguridad. '),
      'En esta versión de demostración las contraseñas viven solo en este navegador y sirven para probar la experiencia. Las cuentas reales se crean con el CSV en Google Workspace o Microsoft 365; a partir de ahí, la contraseña la administra el colegio y la plataforma nunca la guarda.')));
    paso3.append(h('p',{class:'small muted',style:'margin-top:10px'},`Usuarios cargados en total: ${Users.all().length} (${Users.years().map(y=>BIO.year(y).corto+': '+Users.ofCourse(y).length).join(' · ') || 'ninguno'}).`));
  }
  pintarLista();
  /* acceso de la docente */
  const pInp = h('input',{type:'text',value:Store.s.docentePass || 'BioLab2026','aria-label':'Contraseña de la docente',style:'max-width:200px'});
  body.append(h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Acceso de la docente'),
    h('p',{class:'small muted'},'Con estos datos entras desde la pantalla de inicio de sesión, en cualquier computador.'),
    h('div',{class:'cred-box'}, h('div',{}, h('span',{class:'small muted'},'Usuario'), h('b',{class:'mono'},BIO.school.docente.email)), h('div',{}, h('span',{class:'small muted'},'Contraseña'), h('b',{class:'mono'}, Store.s.docentePass || 'BioLab2026'))),
    h('div',{class:'row'}, pInp, h('button',{class:'btn sm',onclick:()=>{ if (pInp.value.trim().length<8) return toast('Usa al menos 8 caracteres.'); Store.s.docentePass = pInp.value.trim(); Store.save(); toast('Contraseña de la docente actualizada.'); rerender(); }},'Cambiar contraseña'))));
}
function credModal(u, rerender){
  const txt = `Hola ${u.nombres||u.nombre}. Estos son tus datos para entrar a ANAI BioLab (Biología):\n\nUsuario: ${u.email}\nContraseña temporal: ${u.temp || '(ya la cambiaste)'}\n\nEntra a ${location.origin}${location.pathname} y cambia tu contraseña la primera vez. Guarda este mensaje.`;
  const ta = h('textarea',{style:'min-height:140px'}, txt);
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Entregar credenciales'), h('h3',{},u.nombre),
    h('div',{class:'cred-box'}, h('div',{}, h('span',{class:'small muted'},'Usuario'), h('b',{class:'mono'},u.email)), h('div',{}, h('span',{class:'small muted'},'Contraseña temporal'), h('b',{class:'mono'},u.temp||'—'))),
    ta,
    h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
      u.tel ? h('a',{class:'btn primary sm',target:'_blank',rel:'noopener',href:`https://wa.me/593${String(u.tel).replace(/\D/g,'').replace(/^0/,'')}?text=${encodeURIComponent(ta.value)}`,onclick:()=>{ Users.entregar(u.codigo); }},'Enviar por WhatsApp') : null,
      u.rep && u.rep.includes('@') ? h('a',{class:'btn sm',href:`mailto:${u.rep}?subject=${encodeURIComponent('Acceso a ANAI BioLab · '+u.nombre)}&body=${encodeURIComponent(ta.value)}`,onclick:()=>{ Users.entregar(u.codigo); }},'Enviar al representante') : null,
      h('button',{class:'btn sm',onclick:()=>{ copiarTexto(ta.value); Users.entregar(u.codigo); }},'Copiar'),
      h('button',{class:'btn sm ghost',onclick:()=>{ Users.entregar(u.codigo, !u.entregada); rerender && rerender(); closeModal(); }}, u.entregada ? 'Marcar como no entregada' : 'Marcar como entregada'),
      h('button',{class:'btn sm ghost',onclick:closeModal},'Cerrar'))));
}

/* ---------- Fichas de credenciales para imprimir y recortar ---------- */
route('/docente/credenciales/:year/:par', (view, p) => {
  const year = +p.year, par = p.par; const l = Users.ofCourse(year, par);
  view.classList.add('wide');
  view.append(h('div',{class:'row noprint',style:'gap:8px;margin-bottom:12px'},
    h('a',{class:'btn sm',href:'#/docente'},'← Volver al panel'),
    h('button',{class:'btn sm primary',onclick:()=>window.print()},'Imprimir fichas'),
    h('button',{class:'btn sm ghost',onclick:()=>{ l.forEach(u=>Users.entregar(u.codigo,true)); toast('Marcadas como entregadas.'); }},'Marcar todas como entregadas')));
  if (!l.length){ view.append(h('div',{class:'ph'},'Este curso todavía no tiene usuarios cargados.')); return; }
  view.append(h('div',{class:'page-head noprint'}, h('div',{}, h('span',{class:'eyebrow'},'Credenciales para recortar'), h('h1',{},`${BIO.year(year).corto} · Paralelo ${par}`), h('p',{},'Una ficha por estudiante. Imprime, recorta y entrega. Cada estudiante debe cambiar su contraseña la primera vez que entre.'))));
  view.append(h('div',{class:'cred-grid'}, l.map(u => h('div',{class:'cred-card'},
    h('div',{class:'cred-head'}, h('b',{},'ANAI BioLab'), h('span',{class:'small muted'},'Biología · '+BIO.year(u.year).corto+' '+u.paralelo)),
    h('div',{class:'cred-name'}, u.nombre),
    h('div',{class:'cred-row'}, h('span',{class:'small muted'},'Usuario'), h('b',{class:'mono'},u.email)),
    h('div',{class:'cred-row'}, h('span',{class:'small muted'},'Contraseña temporal'), h('b',{class:'mono'},u.temp || '(ya la cambió)')),
    h('p',{class:'small muted'},'Entra a la plataforma, escribe estos datos y crea tu propia contraseña. No la compartas con nadie.')))));
});

/* ---------- Reporte individual imprimible ---------- */
route('/docente/reporte/:id', (view, p) => {
  const u = Users.get(p.id);
  const e = (p.id===Store.s.user.id) ? DOC.demoRow() : u ? DOC.fila(u) : BIO.getRoster().find(x=>x.id===p.id);
  if (!e){ view.append(h('div',{class:'ph'},'No se encontró ese estudiante.')); return; }
  /* el docente solo ve los reportes de sus cursos */
  if (Store.ses.rol === 'docente' && u && !DOC.cursosVisibles().some(c => +c.nivel === +e.year && c.paralelo === e.paralelo)){
    view.append(h('div',{class:'ph'},'Este estudiante no pertenece a tus cursos.')); return; }
  const prog = BIO.progOf(e.year), items = typeof Periodos !== 'undefined' ? Periodos.itemsDe(e.year) : BIO.gradeItemsOf(e.year);
  const fechas = DOC.fechas(e);
  const conP = typeof Periodos !== 'undefined';
  const R = conP ? Periodos.resumen(e.id, items, e.notas || {}, fechas) : null;
  const Q = conP ? Periodos.lista() : [];
  /* nota que cuenta de cada actividad (la del cierre si su quimestre está cerrado) y su quimestre */
  const porQ = {}; Q.forEach(q => porQ[q.id] = Periodos.notasPeriodo(e.id, e.notas || {}, fechas, q.id));
  const notaDe = i => { for (const q of Q) if (porQ[q.id][i.id] != null) return { n:porQ[q.id][i.id], q }; return { n:(e.notas||{})[i.id] ?? null, q:null }; };
  const entregadas = items.filter(i => notaDe(i).n != null).length;
  const promedio = conP ? R.anual : (() => { const its = items.filter(i=>e.notas[i.id]!=null); const w = its.reduce((a,i)=>a+i.peso,0); return its.length ? Math.round(its.reduce((a,i)=>a+e.notas[i.id]*i.peso,0)/w*10)/10 : null; })();
  const esc = conP ? R.cualitativa : null;
  view.append(h('div',{class:'row noprint',style:'gap:8px;margin-bottom:12px'}, h('a',{class:'btn sm',href:'#/docente'},'← Volver al panel'),
    h('button',{class:'btn sm primary',onclick:()=>window.print()},'Imprimir o guardar en PDF'),
    soloLectura() ? null : h('button',{class:'btn sm ghost',onclick:()=>msgModal(e)},'Escribir a la familia')));
  const P = conP ? Inst.ponderacion() : null;
  view.append(h('div',{class:'report'},
    h('div',{class:'report-head'}, h('div',{}, h('span',{class:'eyebrow'},`${BIO.school.institucion} · ${(BIO.programas[prog]||BIO.programas.bio).n} · ${BIO.year(e.year).n} "${e.paralelo}"${conP ? ' · Año lectivo '+Inst.anio() : ''}`), h('h1',{},e.nombre), h('p',{class:'small muted'},`${e.email} · representante: ${e.rep} · informe generado el ${new Date().toLocaleDateString('es-EC',{day:'2-digit',month:'long',year:'numeric'})}`)),
      h('div',{class:'ring',style:`--p:${(promedio||0)*10}`,'aria-label':`Promedio anual ${fmtNota(promedio)}`}, h('i',{}, fmtNota(promedio)))),
    conP ? h('div',{class:'grid g4',style:'margin:14px 0 0'},
      [...Q.map(q => [fmtNota(R[q.id]), `${q.n.toLowerCase()}${q.cerrado ? ' · cerrado' : ''}`]), [fmtNota(R.anual),'promedio anual (sobre 10)'], [esc ? esc.k : '–', esc ? esc.n.toLowerCase() : 'escala cualitativa: sin notas']]
        .map(([v,l]) => h('div',{class:'card stat'}, h('span',{class:'v'},String(v)), h('span',{class:'l'},l)))) : null,
    h('div',{class:'grid g4',style:'margin:14px 0'},
      [[entregadas+'/'+items.length,'actividades entregadas'],[fmtMin(e.min),'tiempo en la plataforma'],[e.dias==null?'—':diasTxt(e.dias),'última conexión'],[conP ? (P.modo==='categoria' ? 'Por categorías' : 'Por actividad') : '—','forma del promedio']]
        .map(([v,l]) => h('div',{class:'card stat'}, h('span',{class:'v',style:'font-size:1.15rem'},String(v)), h('span',{class:'l'},l)))),
    conP ? h('h3',{},'Promedios por categoría') : null,
    conP ? h('div',{class:'tablewrap'}, h('table',{class:'data anio-cat'}, h('thead',{},h('tr',{}, h('th',{},'Categoría'), ...(P.modo==='categoria' ? [h('th',{},'Porcentaje')] : []), ...Q.map(q => h('th',{}, q.n)))),
      h('tbody',{}, Object.keys(CATEGORIAS).map(k => h('tr',{}, h('td',{}, h('b',{},CATEGORIAS[k].n), h('div',{class:'small muted'},CATEGORIAS[k].d)),
        ...(P.modo==='categoria' ? [h('td',{class:'num'}, (P.categorias[k]||0)+' %')] : []),
        ...Q.map(q => { const v = R.porCategoria[q.id][k]; return h('td',{class:'num mono '+notaClass(v)}, fmtNota(v)); })))))) : null,
    h('h3',{},'Detalle por actividad'),
    h('div',{class:'tablewrap'}, h('table',{class:'data'}, h('thead',{},h('tr',{},h('th',{},'Actividad'),h('th',{},'Tipo'),h('th',{},'Unidad'),h('th',{},'Peso'), conP ? h('th',{},'Quimestre') : null, h('th',{},'Nota'))),
      h('tbody',{}, items.map(i => { const d = notaDe(i); return h('tr',{}, h('td',{},i.t), h('td',{},i.tipo), h('td',{},'U'+i.unidad), h('td',{class:'mono'},String(i.peso)),
        conP ? h('td',{}, d.q ? d.q.id + (d.q.cerrado ? ' 🔒' : '') : '–') : null, h('td',{class:'mono '+notaClass(d.n)}, fmtNota(d.n))); })))),
    e.adapt.length ? h('div',{class:'stack',style:'margin-top:14px'}, h('h3',{},'Adaptaciones activas'), h('div',{class:'row'}, e.adapt.map(k=>h('span',{class:'pill'},BIO.adaptaciones[k])))) : null,
    h('div',{class:'stack',style:'margin-top:14px'}, h('h3',{},'Observaciones'),
      h('p',{class:'small'}, promedio==null ? 'Aún no registra actividades calificadas. Conviene acompañar su primer ingreso.' :
        promedio>=8 ? 'Desempeño sólido: comprende las relaciones entre estructura y función, y argumenta con evidencia. Puede avanzar a retos de mayor profundidad.' :
        promedio>=6 ? 'Avance adecuado. Conviene reforzar los retos donde necesitó varios intentos y retomar las observaciones antes de responder.' :
        'Requiere acompañamiento cercano: sugerimos repetir la exploración guiada y resolver el reto junto a un compañero o en tutoría.'),
      conP ? h('p',{class:'small muted'},'Promedio anual = promedio de los dos quimestres. Escala: ' + ESCALA.map(x => `${x.k} (${x.n.toLowerCase()})`).join(' · ') + '.') : null,
      h('p',{class:'small muted'},'Informe generado automáticamente por ANAI BioLab con la actividad registrada en la plataforma.'))));
});
</script>
