<style>
/* ---------- 19 · Tablero institucional (autoridades y administración) ---------- */
:root{ --inst-s1:#2a78d6; --inst-s2:#eb6834;
  --inst-q-dar:#104281; --inst-q-aar:#256abf; --inst-q-paar:#5598e7; --inst-q-naar:#86b6ef;
  --inst-q-dar-t:#FFFFFF; --inst-q-aar-t:#FFFFFF; --inst-q-paar-t:#0E1F33; --inst-q-naar-t:#0E1F33; }
@media (prefers-color-scheme:dark){ :root:not([data-theme="light"]){ --inst-s1:#3987e5; --inst-s2:#d95926;
  --inst-q-dar:#9ec5f4; --inst-q-aar:#5598e7; --inst-q-paar:#256abf; --inst-q-naar:#184f95;
  --inst-q-dar-t:#0B1524; --inst-q-aar-t:#0B1524; --inst-q-paar-t:#FFFFFF; --inst-q-naar-t:#FFFFFF; } }
:root[data-theme="dark"]{ --inst-s1:#3987e5; --inst-s2:#d95926;
  --inst-q-dar:#9ec5f4; --inst-q-aar:#5598e7; --inst-q-paar:#256abf; --inst-q-naar:#184f95;
  --inst-q-dar-t:#0B1524; --inst-q-aar-t:#0B1524; --inst-q-paar-t:#FFFFFF; --inst-q-naar-t:#FFFFFF; }
.inst-kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}
.inst-kpi .card{padding:16px 18px}
.inst-kpi .stat .v{font-variant-numeric:normal}
.inst-kpi .stat .s{font-size:.78rem;color:var(--ink-2);margin-top:4px}
.inst-filtros{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:16px}
.inst-g2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.inst-sec{margin-top:16px}
.inst-sec h2{font-size:1.1rem}
.inst-sub{font-size:.84rem;color:var(--ink-2);margin:2px 0 0}
.inst-chart{position:relative;display:flex;flex-direction:column;gap:12px;margin-top:6px}
.inst-legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:.8rem;color:var(--ink-2)}
.inst-legend span{display:inline-flex;align-items:center;gap:6px}
.inst-legend i{width:12px;height:12px;border-radius:3px;display:inline-block;flex:none}
.inst-grow{display:grid;grid-template-columns:118px minmax(0,1fr);gap:10px;align-items:center}
.inst-glab{font-size:.84rem;font-weight:600;color:var(--ink);line-height:1.2}
.inst-glab small{display:block;font-weight:500;color:var(--ink-3);font-size:.72rem}
.inst-gplot{display:flex;flex-direction:column;gap:2px;border-left:1px solid var(--line-2);padding:3px 0}
.inst-gbar{display:flex;align-items:center;gap:6px;min-height:14px;border-radius:0 4px 4px 0;outline-offset:2px}
.inst-gbar i{display:block;height:12px;flex:none;border-radius:0 4px 4px 0;min-width:0}
.inst-gbar span{font-size:.74rem;color:var(--ink-2);font-variant-numeric:tabular-nums;white-space:nowrap}
.inst-gbar:focus-visible{outline:2px solid var(--accent)}
.inst-axis{display:grid;grid-template-columns:118px minmax(0,1fr);gap:10px;font-size:.7rem;color:var(--ink-3)}
.inst-axis div{display:flex;justify-content:space-between;margin-right:52px}
.inst-stack{display:flex;height:22px;gap:2px;border-radius:4px;overflow:hidden;background:var(--bg-3)}
.inst-stack > button{all:unset;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;cursor:default;min-width:0}
.inst-stack > button:focus-visible{outline:2px solid var(--ink);outline-offset:-2px}
.inst-stack .vacio{flex:1;color:var(--ink-3);font-weight:500;font-size:.74rem;justify-content:flex-start;padding-left:8px}
.inst-tip{position:absolute;z-index:5;pointer-events:none;background:var(--bg-2);color:var(--ink);border:1px solid var(--line-2);box-shadow:var(--shadow);border-radius:8px;padding:6px 9px;font-size:.78rem;line-height:1.35;max-width:260px;white-space:pre-line}
.inst-tip[hidden]{display:none}
.inst-meter{display:flex;align-items:center;gap:8px;min-width:120px}
.inst-meter b{display:block;height:8px;border-radius:4px;background:var(--bg-3);flex:1;overflow:hidden;min-width:60px}
.inst-meter b i{display:block;height:100%;background:var(--inst-s1);border-radius:0 4px 4px 0}
.inst-meter span{font-size:.78rem;font-variant-numeric:tabular-nums;min-width:40px;text-align:right}
.inst-riesgo td .pill{white-space:nowrap}
.inst-print-head{display:none}
.inst-roles{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.inst-roles .card{padding:14px 16px}
.inst-roles ul{margin:6px 0 0;padding-left:18px;font-size:.84rem;color:var(--ink-2)}
.inst-roles li{margin:2px 0}
details.inst-det > summary{cursor:pointer;font-weight:600;font-size:.86rem;color:var(--ink-2);padding:4px 0}
@media (max-width:900px){ .inst-g2{grid-template-columns:1fr} }
@media (max-width:560px){ .inst-grow,.inst-axis{grid-template-columns:84px minmax(0,1fr)} .inst-glab{font-size:.78rem} }
@media print{
  .inst-noprint{display:none!important}
  .inst-print-head{display:block;margin-bottom:10px}
  .inst-g2{grid-template-columns:1fr 1fr}
  .inst-chart,.inst-stack,.inst-gbar i,.inst-meter,.inst-legend i{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  details.inst-det{display:block} details.inst-det > *{display:block}
}
</style>
<script>
/* =====================================================================
   19 · TABLERO INSTITUCIONAL (v1.8)
   ---------------------------------------------------------------------
   · Ruta #/institucion: administración y autoridades (rectorado,
     vicerrectorado, coordinación). Solo lectura: nada aquí escribe datos.
     Todo se calcula con lo que ya está en Store.s (en servidor lo
     descarga Cloud.pull(); RLS garantiza qué puede leer cada rol).
   · Pestaña "DECE y autoridades" en la consola de administración:
     crear cuentas, credenciales, restablecer y enviar a la papelera.
   ===================================================================== */
const INST_DIA = 86400000;
const INST_ESCALA_COL = { DAR:'dar', AAR:'aar', PAAR:'paar', NAAR:'naar' };
const instNum = (n, d=2) => n == null || isNaN(n) ? '—' : Number(n).toFixed(d).replace('.', ',');
const instPct = p => p == null || isNaN(p) ? '—' : `${Math.round(p)} %`;
const instCurso = c => `${BIO.nivel(c.nivel).corto} ${c.paralelo}`;
const instProgN = p => (BIO.programas[p] || {}).n || p;
const instItems = nivel => BIO.progOf(nivel) === 'cn' ? BIO.cnItemsDe(nivel) : BIO.gradeItemsOf(nivel);
const instOrden = c => (+c.nivel >= 8 ? +c.nivel - 20 : +c.nivel) * 10 + String(c.paralelo).charCodeAt(0) / 100;
const instHace = ms => ms ? timeAgo(ms) : 'Nunca';

/* ---------- notas registradas a mano (origen docente) ----------
   Servidor: se leen de la tabla notas (origen = 'docente').
   Local: se toman del registro de auditoría de este navegador. */
const instManual = { set:null, pull:0, cargando:false,
  local(){ const s = new Set(), N = (Store.s.docente||{}).notas || {};
    (Store.s.auditoriaLocal || []).forEach(a => { if (a.tabla === 'notas' && /^(registrar|cambiar)_nota$/.test(a.accion) && a.registro){
      const i = String(a.registro).indexOf(':'); const cod = a.registro.slice(0, i), act = a.registro.slice(i+1); if ((N[cod]||{})[act] != null) s.add(a.registro); } });
    return s; },
  /* devuelve el conjunto 'codigo:actividad' o null mientras se carga desde el servidor */
  obtener(alListo){
    if (!Cloud.on) return this.local();
    if (this.set && this.pull === (Cloud.ultimoPull || 0)) return this.set;
    if (!this.cargando){ this.cargando = true;
      Cloud.leer('notas', 'select=estudiante_id,actividad&origen=eq.docente').then(rows => {
        const s = new Set(); (rows || []).forEach(r => { const u = (Cloud.porUid || {})[r.estudiante_id]; if (u) s.add(u.codigo + ':' + r.actividad); });
        this.set = s; this.pull = Cloud.ultimoPull || 0; }).catch(e => { console.warn('notas a mano', e); this.set = new Set(); this.pull = Cloud.ultimoPull || 0; })
        .finally(() => { this.cargando = false; if (alListo) alListo(); }); }
    return this.set;
  }
};

/* ---------- cálculo ---------- */
function instEstudiante(u, q, ahora){
  const notas = Object.assign({}, u.notas || {}, ((Store.s.docente||{}).notas || {})[u.codigo] || {});
  const fechas = ((Store.s.docente||{}).fechas || {})[u.codigo] || {};
  const items = instItems(u.year), ids = new Set(items.map(i => i.id));
  const nq = Periodos.notasPeriodo(u.codigo, notas, fechas, q);
  Object.keys(nq).forEach(k => { if (!ids.has(k) || nq[k] == null) delete nq[k]; });
  const prom = Periodos.promedio(items, nq);
  const dias = u.ultimoAcceso ? Math.floor((ahora - u.ultimoAcceso) / INST_DIA) : null;
  const motivos = [];
  if (prom != null && prom < 7) motivos.push(`Promedio ${instNum(prom)}`);
  if (dias == null) motivos.push('Nunca ha entrado'); else if (dias >= 14) motivos.push(`Sin entrar ${dias} días`);
  return { u, notas, nNotasQ:Object.keys(nq).length, prom, cual:Periodos.cualitativa(prom), dias, activo7: dias != null && dias < 7, motivos };
}
function instCalcular(prog){
  const ahora = Date.now(), q = Periodos.actual();
  const deProg = p => prog === 'todos' || p === prog;
  const cursos = Admin.cursos().filter(c => deProg(c.prog)).sort((a,b) => instOrden(a) - instOrden(b));
  const alumnos = Users.all().filter(u => deProg(BIO.progOf(u.year)));
  const E = {}; alumnos.forEach(u => E[u.codigo] = instEstudiante(u, q, ahora));
  const manual = instManual.obtener(instCalcular.alListo);
  const tareasDe = (nivel, par) => Tareas.de(nivel, par).filter(t => !t.demo);
  const filas = cursos.map(c => {
    const est = Users.ofCourse(+c.nivel, c.paralelo).map(u => E[u.codigo]).filter(Boolean);
    const d = c.docenteId ? (Store.s.docentes || {})[c.docenteId] : null;
    const T = tareasDe(c.nivel, c.paralelo);
    const esperadas = T.length * est.length, hechas = T.reduce((a, t) => a + est.filter(e => e.notas[t.act] != null).length, 0);
    const proms = est.map(e => e.prom).filter(v => v != null);
    const escala = { DAR:0, AAR:0, PAAR:0, NAAR:0 }; est.forEach(e => { if (e.cual) escala[e.cual.k]++; });
    return { c, d, est, n:est.length, activos7:est.filter(e => e.activo7).length, T, esperadas, hechas,
      pctEntregas: esperadas ? hechas / esperadas * 100 : null, prom: proms.length ? r2(proms.reduce((a,b)=>a+b,0) / proms.length) : null,
      conProm:proms.length, notasQ:est.reduce((a, e) => a + e.nNotasQ, 0), riesgo:est.filter(e => e.motivos.length), escala,
      manual: manual ? est.reduce((a, e) => a + [...manual].filter(k => k.startsWith(e.u.codigo + ':')).length, 0) : null };
  });
  const todos = Object.values(E);
  const proms = todos.map(e => e.prom).filter(v => v != null);
  const enCurso = new Set(filas.flatMap(f => f.est.map(e => e.u.codigo)));
  const docentes = Admin.docentes().filter(d => deProg(d.prog)).map(d => {
    const cs = Admin.cursosDeDocente(d.id), fs = filas.filter(f => cs.some(c => c.id === f.c.id));
    return { d, cursos:cs, tareas:cs.reduce((a, c) => a + tareasDe(c.nivel, c.paralelo).length, 0), manual: manual ? fs.reduce((a, f) => a + f.manual, 0) : null };
  }).sort((a,b) => a.d.nombre.localeCompare(b.d.nombre));
  const niveles = [...new Set(cursos.map(c => +c.nivel))].sort((a,b) => instOrden({nivel:a, paralelo:'A'}) - instOrden({nivel:b, paralelo:'A'}));
  const cobertura = niveles.map(nivel => {
    const recursos = [], vistos = new Set(); Tareas.mapa(nivel).forEach(g => g.items.forEach(r => { if (!vistos.has(r.act)){ vistos.add(r.act); recursos.push(r); } }));
    const T = tareasDe(nivel), asignadas = new Set(T.map(t => t.act));
    const est = Users.ofCourse(nivel).map(u => E[u.codigo]).filter(Boolean);
    const asig = recursos.filter(r => asignadas.has(r.act)), conEnt = asig.filter(r => est.some(e => e.notas[r.act] != null));
    return { nivel, prog:BIO.progOf(nivel), total:recursos.length, asig:asig.length, conEnt:conEnt.length, paralelos:cursos.filter(c => +c.nivel === nivel).map(c => c.paralelo) };
  });
  return { q, qn:(Periodos.q(q) || {}).n || q, cursos, filas, docentes, cobertura, todos,
    activos7:todos.filter(e => e.activo7).length, notasQ:todos.reduce((a, e) => a + e.nNotasQ, 0),
    prom: proms.length ? r2(proms.reduce((a,b)=>a+b,0) / proms.length) : null, conProm:proms.length,
    riesgo:todos.filter(e => e.motivos.length), sinCurso:todos.filter(e => !enCurso.has(e.u.codigo)), manualListo: !!manual };
}

/* ---------- piezas visuales ---------- */
function instTooltip(chart){
  const tip = h('div',{class:'inst-tip',hidden:true,role:'status'}); chart.append(tip);
  const mostrar = el => { tip.textContent = el.dataset.tip; tip.hidden = false;
    const r = el.getBoundingClientRect(), R = chart.getBoundingClientRect();
    let x = r.left - R.left + Math.min(r.width, 200) / 2, y = r.top - R.top - tip.offsetHeight - 8;
    if (y < 0) y = r.bottom - R.top + 8; x = Math.max(0, Math.min(x - tip.offsetWidth / 2, R.width - tip.offsetWidth));
    tip.style.left = x + 'px'; tip.style.top = y + 'px'; };
  const ocultar = () => { tip.hidden = true; };
  chart.addEventListener('pointerover', e => { const el = e.target.closest('[data-tip]'); if (el && chart.contains(el)) mostrar(el); });
  chart.addEventListener('pointerout', e => { if (!e.relatedTarget || !chart.contains(e.relatedTarget) || !e.relatedTarget.closest('[data-tip]')) ocultar(); });
  chart.addEventListener('focusin', e => { const el = e.target.closest('[data-tip]'); if (el) mostrar(el); });
  chart.addEventListener('focusout', ocultar);
}
/* barras horizontales agrupadas (dos medidas en la misma escala 0–100 %) */
function instBarrasPct(filas, series){
  const chart = h('div',{class:'inst-chart'});
  chart.append(h('div',{class:'inst-legend','aria-hidden':'true'}, series.map(s => h('span',{}, h('i',{style:`background:var(${s.col})`}), s.n))));
  filas.forEach(f => {
    const plot = h('div',{class:'inst-gplot'});
    series.forEach(s => { const v = s.v(f), txt = v == null ? s.vacio : instPct(v);
      plot.append(h('div',{class:'inst-gbar',tabindex:'0','data-tip':`${f.t}\n${s.n}: ${txt}${v != null && s.det ? '\n' + s.det(f) : ''}`,'aria-label':`${f.t}, ${s.n}: ${txt}`},
        h('i',{style:`width:calc((100% - 52px) * ${v == null ? 0 : Math.max(0, Math.min(100, v)) / 100});background:var(${s.col})`}), h('span',{}, txt))); });
    chart.append(h('div',{class:'inst-grow'}, h('div',{class:'inst-glab'}, f.t, h('small',{}, f.sub)), plot));
  });
  chart.append(h('div',{class:'inst-axis','aria-hidden':'true'}, h('span'), h('div',{}, h('span',{},'0 %'), h('span',{},'50 %'), h('span',{},'100 %'))));
  instTooltip(chart); return chart;
}
/* barra apilada al 100 % con la escala cualitativa */
function instBarraEscala(f){
  const bar = h('div',{class:'inst-stack',role:'group','aria-label':`Escala cualitativa de ${instCurso(f.c)}`});
  const tot = f.conProm;
  if (!tot){ bar.append(h('button',{class:'vacio',tabindex:'0','data-tip':`${instCurso(f.c)}\nTodavía no hay promedios en este quimestre.`,'aria-label':`${instCurso(f.c)}: sin promedios en este quimestre`},'Sin notas en el quimestre')); return bar; }
  ESCALA.forEach(es => { const n = f.escala[es.k]; if (!n) return; const pc = n / tot * 100, k = INST_ESCALA_COL[es.k];
    bar.append(h('button',{tabindex:'0',style:`flex:${n} 1 0;background:var(--inst-q-${k});color:var(--inst-q-${k}-t)`,
      'data-tip':`${instCurso(f.c)} · ${es.k}\n${es.n}\n${n} de ${tot} estudiante${tot === 1 ? '' : 's'} (${instPct(pc)})`,
      'aria-label':`${instCurso(f.c)}, ${es.k} (${es.n}): ${n} de ${tot}`}, pc >= 12 ? `${es.k} ${n}` : '')); });
  return bar;
}
const instStat = (v, l, s) => h('div',{class:'card stat'}, h('span',{class:'v'}, v), h('span',{class:'l'}, l), s ? h('span',{class:'s'}, s) : null);

/* ---------- CSV ---------- */
function instCSV(D){
  const L = [['Curso','Entorno','Docente','Estudiantes','Activos 7 días','% activos 7 días','% entregas de tareas','Tareas asignadas',`Notas ${D.q}`,`Promedio ${D.q}`,'Escala','Notas a mano','Última conexión del docente','En riesgo'].join(';')];
  D.filas.forEach(f => L.push([instCurso(f.c), instProgN(f.c.prog), f.d ? f.d.nombre : 'Sin asignar', f.n, f.activos7, f.n ? Math.round(f.activos7 / f.n * 100) : '',
    f.pctEntregas == null ? '' : Math.round(f.pctEntregas), f.T.length, f.notasQ, f.prom == null ? '' : instNum(f.prom), f.prom == null ? '' : Periodos.cualitativa(f.prom).k,
    f.manual == null ? '' : f.manual, f.d && f.d.ultimoAcceso ? new Date(f.d.ultimoAcceso).toISOString().slice(0,10) : 'Nunca', f.riesgo.length].join(';')));
  return L.join('\n');
}

/* ---------- vista ---------- */
route('/institucion', (view) => {
  if (!esRol('admin','autoridad')){
    view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Seguimiento institucional'), h('h1',{},'Tablero institucional'))),
      h('div',{class:'card stack',style:'max-width:620px'}, h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Acceso restringido. '), 'Este tablero es para la administración y las autoridades de la institución (rectorado, vicerrectorado y coordinación).')),
        h('div',{class:'row'}, esRol('docente','dece') ? h('a',{class:'btn sm',href:'#/docente'},'Ir al panel docente') : null, esRol('dece') ? h('a',{class:'btn sm',href:'#/nee'},'Estudiantes con NEE') : null,
          h('button',{class:'btn sm ghost',onclick:()=>openWizard('login', {})},'Entrar con otra cuenta'))));
    return;
  }
  view.classList.add('wide');
  const ui = Store.s.ui = Store.s.ui || {};
  let prog = ['cn','bio','todos'].includes(ui.instProg) ? ui.instProg : 'todos';
  const body = h('div',{class:'stack'});
  const head = h('div',{class:'page-head'},
    h('div',{}, h('span',{class:'eyebrow'}, 'Seguimiento institucional · ' + (BIO.school.institucion || 'ANAI')), h('h1',{},'Tablero institucional'),
      h('p',{}, esRol('autoridad') ? 'Vista de toda la institución en modo de solo lectura: participación, calificaciones del quimestre y estudiantes que necesitan acompañamiento.'
        : 'Vista de toda la institución: participación, calificaciones del quimestre, cobertura curricular y estudiantes que necesitan acompañamiento.')),
    h('div',{class:'row inst-noprint'},
      h('button',{class:'btn sm',onclick:()=>{ const D = instCalcular(prog); descargarTexto(`tablero-institucional-${Inst.anio()}-${D.q}.csv`, instCSV(D)); Auditoria.registrar('exportar_tablero', { entorno:prog, quimestre:D.q }); }},'Exportar CSV'),
      h('button',{class:'btn sm',onclick:()=>window.print()},'Imprimir'),
      Cloud.on ? h('button',{class:'btn sm ghost',onclick:async function(){ this.disabled = true; this.textContent = 'Actualizando…'; try { await Cloud.pull(); toast('Datos actualizados.'); } catch(e){ toast('No se pudo actualizar: '+e.message); } pintar(); this.disabled = false; this.textContent = '↻ Actualizar'; }},'↻ Actualizar') : null));
  const filtros = h('div',{class:'inst-filtros inst-noprint',role:'group','aria-label':'Filtrar por entorno'});
  view.append(head, filtros, body);
  const pintarFiltros = () => { filtros.innerHTML = '';
    filtros.append(h('span',{class:'small muted'},'Entorno:'), ...[['todos','Ambos entornos'],['cn',instProgN('cn')],['bio',instProgN('bio')]].map(([k,t]) =>
      h('button',{class:'chip'+(prog === k ? ' picked' : ''),'aria-pressed':String(prog === k),onclick:()=>{ prog = k; ui.instProg = k; Store.save(); pintar(); }}, t))); };
  instCalcular.alListo = () => { if (document.body.contains(body)) pintar(); };

  function pintar(){
    pintarFiltros(); body.innerHTML = '';
    const D = instCalcular(prog), n = D.todos.length;
    body.append(h('div',{class:'inst-print-head'}, h('b',{}, `Tablero institucional · ${prog === 'todos' ? 'ambos entornos' : instProgN(prog)} · Año lectivo ${Inst.anio()} · ${D.qn}`), h('div',{class:'small muted'}, 'Generado el ' + fechaHora(Date.now()))));
    if (avisoV18()) body.append(avisoV18());
    if (Cloud.on) body.append(h('p',{class:'small muted inst-noprint',style:'margin:-6px 0 0'}, Cloud.ultimoPull ? `Datos del servidor, actualizados ${timeAgo(Cloud.ultimoPull)}.` : 'Datos del servidor.'));
    if (!D.cursos.length && !n){
      body.append(h('div',{class:'ph'}, h('b',{},'Todavía no hay cursos ni estudiantes en este entorno. '), esRol('admin') ? 'Créalos en la consola de administración (Cursos y Estudiantes) o carga los datos de ejemplo en Ajustes.' : 'La administración aún no ha cargado cursos ni estudiantes.'));
      if (esRol('admin') && !Cloud.on) body.append(h('div',{class:'row'}, h('button',{class:'btn sm',onclick:async()=>{ await admDemo(); pintar(); }},'Cargar datos de ejemplo')));
      return;
    }
    /* indicadores */
    body.append(h('div',{class:'inst-kpi'},
      instStat(String(n), 'Estudiantes activos', D.sinCurso.length ? `${D.sinCurso.length} sin curso asignado` : `En ${D.cursos.length} curso${D.cursos.length === 1 ? '' : 's'}`),
      instStat(n ? instPct(D.activos7 / n * 100) : '—', 'Entraron en los últimos 7 días', `${D.activos7} de ${n} estudiantes`),
      instStat(String(D.notasQ), `Notas registradas · ${D.qn.toLowerCase()}`, 'En las actividades de cada curso'),
      instStat(instNum(D.prom), `Promedio institucional · ${D.q}`, D.prom == null ? 'Aún no hay notas en el quimestre' : `${Periodos.cualitativa(D.prom).k} · ${D.conProm} estudiante${D.conProm === 1 ? '' : 's'} con notas`),
      instStat(String(D.riesgo.length), 'Estudiantes en riesgo', n ? `${instPct(D.riesgo.length / n * 100)} · promedio bajo 7 o sin entrar 14 días o más` : 'Promedio bajo 7 o sin entrar 14 días o más')));

    /* por curso */
    const tabla = h('table',{class:'data'},
      h('thead',{}, h('tr',{}, ...['Curso','Entorno','Docente','Estudiantes','Activos 7 días','Entregas de tareas',`Promedio ${D.q}`,'Tareas','Última conexión del docente','En riesgo',''].map(t => h('th',{scope:'col'}, t)))),
      h('tbody',{}, D.filas.map(f => h('tr',{},
        h('th',{scope:'row',style:'text-transform:none;letter-spacing:0;font-size:.86rem;color:var(--ink)'}, instCurso(f.c)),
        h('td',{}, h('span',{class:'pill '+(f.c.prog === 'cn' ? 'eco' : 'anat')}, instProgN(f.c.prog))),
        h('td',{}, f.d ? f.d.nombre : h('span',{class:'pill warn'},'⚠ Sin docente')),
        h('td',{class:'num'}, String(f.n)),
        h('td',{class:'num'}, f.n ? `${f.activos7} (${instPct(f.activos7 / f.n * 100)})` : '—'),
        h('td',{class:'num',title: f.esperadas ? `${f.hechas} de ${f.esperadas} entregas esperadas` : 'Sin tareas asignadas'}, f.esperadas ? instPct(f.pctEntregas) : '—'),
        h('td',{class:'num'}, f.prom == null ? '—' : h('span',{}, instNum(f.prom), ' ', h('span',{class:'small muted'}, Periodos.cualitativa(f.prom).k))),
        h('td',{class:'num'}, String(f.T.length)),
        h('td',{class:'small'}, f.d ? instHace(f.d.ultimoAcceso) : '—'),
        h('td',{}, f.riesgo.length ? h('span',{class:'pill warn'}, `⚠ ${f.riesgo.length}`) : h('span',{class:'pill ok'},'✓ 0')),
        h('td',{class:'inst-noprint'}, h('button',{class:'btn sm ghost','aria-label':`Ver notas de ${instCurso(f.c)}`,onclick:()=>{ ui.admProg = f.c.prog; DOC.year = +f.c.nivel; DOC.par = f.c.paralelo; Store.save(); location.hash = '#/docente?t=calificaciones&e=' + f.c.prog; }},'Ver notas'))))));
    body.append(h('section',{class:'card stack inst-sec','aria-labelledby':'inst-h-cursos'},
      h('div',{}, h('h2',{id:'inst-h-cursos'},'Por curso'), h('p',{class:'inst-sub'}, `Promedio del ${D.qn.toLowerCase()} con la ponderación institucional; "en riesgo" = promedio bajo 7 o sin entrar 14 días o más (incluye a quien nunca entró).`)),
      D.filas.length ? h('div',{class:'tablewrap'}, tabla) : h('p',{class:'small muted'},'No hay cursos creados en este entorno.')));

    /* gráficos */
    if (D.filas.length){
      const gf = D.filas.map(f => Object.assign({ t:instCurso(f.c), sub:instProgN(f.c.prog) }, f));
      body.append(h('div',{class:'inst-g2 inst-sec'},
        h('section',{class:'card stack','aria-labelledby':'inst-h-part'},
          h('div',{}, h('h2',{id:'inst-h-part'},'Participación por curso'), h('p',{class:'inst-sub'},'Porcentaje de estudiantes que entraron en los últimos 7 días y de tareas entregadas sobre las esperadas.')),
          instBarrasPct(gf, [
            { n:'Entraron en 7 días', col:'--inst-s1', v:f => f.n ? f.activos7 / f.n * 100 : null, vacio:'sin estudiantes', det:f => `${f.activos7} de ${f.n} estudiantes` },
            { n:'Tareas entregadas', col:'--inst-s2', v:f => f.pctEntregas, vacio:'sin tareas', det:f => `${f.hechas} de ${f.esperadas} entregas` }]),
          h('details',{class:'inst-det inst-noprint'}, h('summary',{},'Ver como tabla'), h('div',{class:'tablewrap'}, h('table',{class:'data'},
            h('thead',{}, h('tr',{}, h('th',{},'Curso'), h('th',{},'Entraron en 7 días'), h('th',{},'Tareas entregadas'))),
            h('tbody',{}, gf.map(f => h('tr',{}, h('td',{}, f.t), h('td',{class:'num'}, f.n ? `${f.activos7}/${f.n} · ${instPct(f.activos7 / f.n * 100)}` : '—'), h('td',{class:'num'}, f.esperadas ? `${f.hechas}/${f.esperadas} · ${instPct(f.pctEntregas)}` : 'Sin tareas')))))))),
        h('section',{class:'card stack','aria-labelledby':'inst-h-esc'},
          h('div',{}, h('h2',{id:'inst-h-esc'},'Escala cualitativa por curso'), h('p',{class:'inst-sub'}, `Estudiantes según su promedio del ${D.qn.toLowerCase()} (Reglamento General a la LOEI).`)),
          (() => { const chart = h('div',{class:'inst-chart'});
            chart.append(h('div',{class:'inst-legend'}, ESCALA.map(es => h('span',{title:es.n}, h('i',{style:`background:var(--inst-q-${INST_ESCALA_COL[es.k]})`}), h('b',{}, es.k), ' ' + es.n.replace('los aprendizajes requeridos','').trim()))));
            gf.forEach(f => chart.append(h('div',{class:'inst-grow'}, h('div',{class:'inst-glab'}, f.t, h('small',{}, `${f.conProm} de ${f.n} con notas`)), instBarraEscala(f))));
            instTooltip(chart); return chart; })(),
          h('details',{class:'inst-det inst-noprint'}, h('summary',{},'Ver como tabla'), h('div',{class:'tablewrap'}, h('table',{class:'data'},
            h('thead',{}, h('tr',{}, h('th',{},'Curso'), ...ESCALA.map(es => h('th',{title:es.n}, es.k)), h('th',{},'Sin notas'))),
            h('tbody',{}, gf.map(f => h('tr',{}, h('td',{}, f.t), ...ESCALA.map(es => h('td',{class:'num'}, String(f.escala[es.k]))), h('td',{class:'num'}, String(f.n - f.conProm)))))))))));
    }

    /* por docente y cobertura */
    const tDoc = D.docentes.length ? h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, ...['Docente','Entorno','Cursos','Tareas asignadas','Notas registradas a mano','Última conexión'].map(t => h('th',{scope:'col'}, t)))),
      h('tbody',{}, D.docentes.map(x => h('tr',{},
        h('th',{scope:'row',style:'text-transform:none;letter-spacing:0;font-size:.86rem;color:var(--ink)'}, x.d.nombre),
        h('td',{}, instProgN(x.d.prog)),
        h('td',{}, x.cursos.length ? x.cursos.map(instCurso).join(', ') : h('span',{class:'pill warn'},'Sin cursos')),
        h('td',{class:'num'}, String(x.tareas)),
        h('td',{class:'num'}, x.manual == null ? '…' : String(x.manual)),
        h('td',{class:'small'}, instHace(x.d.ultimoAcceso))))))) : h('p',{class:'small muted'},'No hay docentes en este entorno.');
    const tCob = D.cobertura.length ? h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, ...['Nivel','Recursos del mapa','Asignados como tarea','Con al menos una entrega'].map(t => h('th',{scope:'col'}, t)))),
      h('tbody',{}, D.cobertura.map(c => { const m = (v) => h('div',{class:'inst-meter',role:'img','aria-label':`${v} de ${c.total} (${instPct(c.total ? v / c.total * 100 : 0)})`},
          h('b',{}, h('i',{style:`width:${c.total ? v / c.total * 100 : 0}%`})), h('span',{}, instPct(c.total ? v / c.total * 100 : 0)), h('span',{class:'small muted',style:'min-width:auto'}, `${v}/${c.total}`));
        return h('tr',{}, h('th',{scope:'row',style:'text-transform:none;letter-spacing:0;font-size:.86rem;color:var(--ink)'}, BIO.nivel(c.nivel).corto, h('div',{class:'small muted',style:'font-weight:500'}, `Paralelo${c.paralelos.length === 1 ? '' : 's'} ${c.paralelos.join(', ')}`)),
          h('td',{class:'num'}, String(c.total)), h('td',{}, m(c.asig)), h('td',{}, m(c.conEnt))); })))) : h('p',{class:'small muted'},'No hay niveles con cursos en este entorno.');
    body.append(h('div',{class:'stack inst-sec'},
      h('section',{class:'card stack','aria-labelledby':'inst-h-doc'}, h('div',{}, h('h2',{id:'inst-h-doc'},'Por docente'), h('p',{class:'inst-sub'},'Las notas "a mano" son las que el docente registró en el libro de calificaciones; las demás llegan solas cuando el estudiante resuelve el reto.')), tDoc),
      h('section',{class:'card stack','aria-labelledby':'inst-h-cob'}, h('div',{}, h('h2',{id:'inst-h-cob'},'Cobertura curricular por nivel'), h('p',{class:'inst-sub'},'Recursos del mapa del curso que ya se asignaron como tarea en algún paralelo y, de esos, los que tienen al menos una entrega.')), tCob)));

    /* estudiantes en riesgo */
    const R = D.riesgo.slice().sort((a,b) => (a.u.year - b.u.year) || String(a.u.paralelo).localeCompare(b.u.paralelo) || a.u.nombre.localeCompare(b.u.nombre));
    const cursoTxt = u => `${(BIO.nivel(u.year) || {}).corto || u.year} ${u.paralelo}`;
    body.append(h('section',{class:'card stack inst-sec','aria-labelledby':'inst-h-riesgo'},
      h('div',{class:'row',style:'justify-content:space-between;align-items:flex-end;gap:10px;flex-wrap:wrap'},
        h('div',{}, h('h2',{id:'inst-h-riesgo'}, `Estudiantes en riesgo (${R.length})`), h('p',{class:'inst-sub'},'Para coordinar el acompañamiento con cada docente y, si hace falta, con el DECE.')),
        R.length ? h('button',{class:'btn sm inst-noprint',onclick:()=>{ const L = ['Código;Estudiante;Curso;Promedio;Última conexión;Motivo'];
          R.forEach(e => L.push([e.u.codigo, e.u.nombre, cursoTxt(e.u), e.prom == null ? '' : instNum(e.prom), e.u.ultimoAcceso ? new Date(e.u.ultimoAcceso).toISOString().slice(0,10) : 'Nunca', e.motivos.join(' y ')].join(';')));
          descargarTexto(`estudiantes-en-riesgo-${D.q}.csv`, L.join('\n')); Auditoria.registrar('exportar_estudiantes_en_riesgo', { total:R.length, entorno:prog }); }},'Exportar lista') : null),
      !R.length ? h('div',{class:'notice ok'}, h('span',{},'Ningún estudiante cumple hoy los criterios de riesgo.')) :
        h('details',{class:'inst-det',open:R.length <= 12}, h('summary',{}, R.length <= 12 ? 'Lista' : `Ver los ${R.length} estudiantes`),
          h('div',{class:'tablewrap'}, h('table',{class:'data inst-riesgo'},
            h('thead',{}, h('tr',{}, ...['Estudiante','Curso',`Promedio ${D.q}`,'Última conexión','Motivo'].map(t => h('th',{scope:'col'}, t)))),
            h('tbody',{}, R.slice(0, 300).map(e => h('tr',{},
              h('td',{}, esRol('admin') ? h('a',{href:'#/docente/reporte/' + e.u.codigo}, e.u.nombre) : e.u.nombre, h('div',{class:'small muted mono'}, e.u.codigo)),
              h('td',{}, cursoTxt(e.u)), h('td',{class:'num'}, instNum(e.prom)), h('td',{class:'small'}, instHace(e.u.ultimoAcceso)),
              h('td',{}, e.motivos.map(m => h('span',{class:'pill warn',style:'margin:0 4px 4px 0'}, '⚠ ' + m)))))))))));
    body.append(h('p',{class:'small muted'}, `Año lectivo ${Inst.anio()} · ${D.qn} (${Periodos.q(D.q) ? fechaCorta(Date.parse(Periodos.q(D.q).inicio + 'T12:00')) + ' – ' + fechaCorta(Date.parse(Periodos.q(D.q).fin + 'T12:00')) : ''}). `,
      esRol('autoridad') ? 'Vista de solo lectura: para corregir datos, comuníquese con la administración.' : ''));
  }
  pintar();
  if (Cloud.on && Cloud.ses && Date.now() - (Cloud.ultimoPull || 0) > 60000)
    Cloud.pull().then(() => { if (document.body.contains(body)) pintar(); }).catch(e => console.warn('actualizar', e));
});

/* =====================================================================
   Pestaña de administración: DECE y autoridades
   ===================================================================== */
const INST_CARGOS = { autoridad:['Rector','Rectora','Vicerrector','Vicerrectora','Coordinador académico','Coordinadora académica','Inspector general','Inspectora general'], dece:['Psicólogo educativo','Psicóloga educativa','Coordinador del DECE','Coordinadora del DECE','Trabajador social','Trabajadora social','Orientador vocacional','Orientadora vocacional'] };
function instCredModal(p, rerender){
  const que = p.rol === 'dece' ? 'registrar las fichas de adaptación curricular de estudiantes con NEE y consultar las notas en modo de solo lectura' : 'consultar el tablero institucional y las notas de todos los cursos en modo de solo lectura';
  const txt = `Estimado/a ${p.nombres || p.nombre}, estas son sus credenciales de ANAI BioLab (${ROLES[p.rol].n}${p.cargo ? ' · ' + p.cargo : ''}):\n\nUsuario: ${p.email}\nContraseña temporal: ${p.temp || '(ya la cambió)'}\n\nCon esta cuenta podrá ${que}.\nAl ingresar por primera vez el sistema le pedirá crear su propia contraseña. Por favor, no la comparta: da acceso a datos personales de estudiantes.`;
  const ta = h('textarea',{style:'min-height:170px','aria-label':'Texto para enviar las credenciales'}, txt);
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'}, `Credenciales · ${ROLES[p.rol].n}`), h('h3',{}, p.nombre),
    h('div',{class:'cred-box'}, h('div',{}, h('span',{class:'small muted'},'Usuario'), h('b',{class:'mono'}, p.email)), h('div',{}, h('span',{class:'small muted'},'Contraseña temporal'), h('b',{class:'mono'}, p.temp || '—'))),
    ta,
    h('div',{class:'row'}, h('a',{class:'btn primary sm',href:`mailto:${p.email}?subject=${encodeURIComponent('Acceso a ANAI BioLab')}&body=${encodeURIComponent(txt)}`,onclick:()=>{ p.entregada = true; Store.save(); }},'Enviar por correo'),
      h('button',{class:'btn sm',onclick:()=>{ copiarTexto(ta.value); p.entregada = true; Store.save(); rerender && rerender(); }},'Copiar'),
      h('button',{class:'btn sm ghost',onclick:closeModal},'Cerrar'))));
}
function instTabPersonal(body, rerender){
  if (avisoV18()) body.append(avisoV18());
  const nom = h('input',{type:'text',placeholder:'Nombres','aria-label':'Nombres',autocomplete:'off'});
  const ape = h('input',{type:'text',placeholder:'Apellidos','aria-label':'Apellidos',autocomplete:'off'});
  const mail = h('input',{type:'email',placeholder:'rectorado@' + DOMINIO_DOC,'aria-label':'Correo institucional',autocomplete:'off'});
  const rol = h('select',{'aria-label':'Rol'}, h('option',{value:'autoridad'},'Autoridad (solo lectura)'), h('option',{value:'dece'},'DECE'));
  const lista = h('datalist',{id:'inst-cargos'});
  const cargo = h('input',{type:'text',placeholder:'Rector, Vicerrectora, Psicóloga educativa…','aria-label':'Cargo',list:'inst-cargos',autocomplete:'off'});
  const pintarCargos = () => { lista.innerHTML = ''; INST_CARGOS[rol.value].forEach(c => lista.append(h('option',{value:c}))); };
  rol.onchange = pintarCargos; pintarCargos();
  const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
  const crear = h('button',{class:'btn primary',onclick:async function(){
    msg.textContent = '';
    if (!nom.value.trim() || !ape.value.trim()) { msg.textContent = 'Escribe nombres y apellidos.'; return; }
    const email = mail.value.trim().toLowerCase();
    if (!/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) { msg.textContent = 'Escribe un correo válido, por ejemplo vicerrectorado@' + DOMINIO_DOC + '.'; return; }
    if ([...Admin.docentes(), ...Personal.todos()].some(x => String(x.email||'').toLowerCase() === email) || Users.byEmail(email) || email === ADMIN_EMAIL) { msg.textContent = 'Ya existe una cuenta con ese correo.'; return; }
    if (!cargo.value.trim()) { msg.textContent = 'Escribe el cargo (por ejemplo, Rector o Psicóloga educativa).'; return; }
    this.disabled = true; this.textContent = 'Creando…';
    try { const r = await Personal.crear({ nombres:nom.value, apellidos:ape.value, email, rol:rol.value, cargo:cargo.value });
      if (!r.ok) { msg.textContent = r.msg || 'No se pudo crear la cuenta.'; return; }
      toast(`Cuenta creada: ${r.p.email}`); rerender(); instCredModal(r.p, rerender);
    } catch(e){ msg.textContent = 'El servidor no creó la cuenta: ' + e.message; }
    finally { this.disabled = false; this.textContent = 'Crear cuenta'; } }},'Crear cuenta');
  body.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Crear una cuenta de DECE o de autoridad'),
    h('p',{class:'small muted'},'Las autoridades ven toda la institución sin poder modificar nada. El DECE registra las fichas de adaptación curricular. Ninguno de los dos administra usuarios ni cursos.'),
    h('div',{class:'adm-form'}, h('label',{},'Nombres', nom), h('label',{},'Apellidos', ape), h('label',{},'Correo institucional', mail), h('label',{},'Rol', rol), h('label',{},'Cargo', cargo, lista), crear), msg));

  const ps = Personal.todos().sort((a,b) => a.rol.localeCompare(b.rol) || a.nombre.localeCompare(b.nombre));
  const box = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'}, `Cuentas activas (${ps.length})`));
  if (!ps.length) box.append(h('div',{class:'ph'}, h('b',{},'Todavía no hay cuentas de DECE ni de autoridades. '), Cloud.on ? 'Crea la primera arriba.' : 'Crea la primera arriba. Para la demostración también existen rectorado@anai.edu.ec (AnaiRector2026) y dece@anai.edu.ec (AnaiDece2026).'));
  else box.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
    h('thead',{}, h('tr',{}, ...['Nombre','Rol y cargo','Usuario','Estado',''].map(t => h('th',{scope:'col'}, t)))),
    h('tbody',{}, ps.map(p => h('tr',{},
      h('td',{}, h('b',{}, p.nombre)),
      h('td',{}, h('span',{class:'pill ' + (p.rol === 'dece' ? 'gen' : 'cell')}, `${ROLES[p.rol].em} ${ROLES[p.rol].n}`), p.cargo ? h('div',{class:'small muted'}, p.cargo) : null),
      h('td',{class:'mono small'}, p.email),
      h('td',{}, p.entregada ? h('span',{class:'pill ok'},'Entregada') : h('span',{class:'pill warn'},'Por entregar'),
        h('div',{class:'small muted'}, p.ultimoAcceso ? 'Ingresó ' + timeAgo(p.ultimoAcceso) : 'Sin ingresar')),
      h('td',{style:'white-space:nowrap'}, h('div',{class:'row',style:'gap:6px;flex-wrap:nowrap'},
        h('button',{class:'btn sm ghost',onclick:()=>instCredModal(p, rerender)},'Credenciales'),
        h('button',{class:'btn sm ghost',onclick:()=>confirmar({ titulo:`¿Restablecer la contraseña de ${p.nombre}?`, texto:'Se genera una contraseña temporal nueva y la anterior deja de funcionar. Al entrar, la persona deberá crear la suya.', boton:'Restablecer',
          accion: async()=>{ const t = await Personal.resetear(p.id); if (!t) throw new Error('No existe esa cuenta.'); Auditoria.local('restablecer_contrasena', { email:p.email }, { tabla:'perfiles', registro:p.id }); rerender(); setTimeout(() => instCredModal(p, rerender), 0); } })},'Restablecer'),
        h('button',{class:'btn sm ghost danger-text',onclick:()=>confirmar({ peligro:true, titulo:`¿Enviar a la papelera la cuenta de ${p.nombre}?`, texto:`${p.email} deja de poder entrar de inmediato. Se puede restaurar durante 30 días desde la papelera; después se elimina definitivamente. Las fichas del DECE y los datos de los estudiantes no se borran.`, boton:'Enviar a la papelera',
          accion: async()=>{ const r = await Papelera.cuenta(p.id); if (!r.ok) throw new Error(r.msg); rerender(); toast('Cuenta enviada a la papelera.'); } })},'Eliminar')))))))));
  body.append(box);
  body.append(h('div',{class:'inst-roles',style:'margin-top:16px'},
    h('div',{class:'card'}, h('b',{}, `${ROLES.autoridad.em} Autoridades: qué ven`), h('ul',{},
      h('li',{},'Tablero institucional: participación, promedios del quimestre, escala cualitativa, cobertura y estudiantes en riesgo.'),
      h('li',{},'Notas y seguimiento de todos los cursos de ambos entornos, sin poder cambiar nada.'),
      h('li',{},'Fichas de NEE en modo de lectura y el registro de auditoría.'),
      h('li',{},'No crean usuarios, no registran notas ni ven los datos de contacto de las familias.'))),
    h('div',{class:'card'}, h('b',{}, `${ROLES.dece.em} DECE: qué ve y qué hace`), h('ul',{},
      h('li',{},'Registra y actualiza las fichas de adaptación curricular (grado 1, 2 o 3) y las adaptaciones de acceso.'),
      h('li',{},'Consulta notas y seguimiento de todos los cursos, en modo de solo lectura.'),
      h('li',{},'La ficha es funcional: nunca contiene diagnósticos médicos.'))),
    h('div',{class:'card'}, h('b',{},'🔒 Quién ve las fichas de NEE'), h('ul',{},
      h('li',{},'DECE y administración: ven y editan todas.'),
      h('li',{},'Docente: solo las de sus cursos, sin poder editarlas.'),
      h('li',{},'Autoridades: todas, en modo de lectura.'),
      h('li',{},'Estudiantes y familias: nunca.')))));
}
ADM_TABS_EXTRA.push({ id:'personal', t:'DECE y autoridades', fn:instTabPersonal, antes:'credenciales' });
</script>
