<style>
.tar-form{display:grid;grid-template-columns:minmax(260px,2fr) minmax(150px,1fr);gap:12px 16px;align-items:end}
.tar-form label{display:flex;flex-direction:column;gap:6px;font-weight:600;font-size:.86rem}
.tar-form .full{grid-column:1/-1}
.tar-prev{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border:1px dashed var(--line);border-radius:12px;background:var(--bg-2)}
.tar-prev .em{font-size:1.5rem;line-height:1}
.tar-prev[hidden]{display:none}
.tar-par{display:inline-flex!important;flex-direction:row!important;align-items:center;gap:6px;padding:6px 12px;border:1px solid var(--line);border-radius:999px;cursor:pointer;font-weight:700}
.tar-par:has(input:checked){border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent)}
.tar-fecha{padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);font:inherit;min-height:42px}
.tar-pars{display:flex;gap:6px;flex-wrap:wrap}
.tar-item{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--bg)}
.tar-item .em{font-size:1.4rem}
.tar-item .t{font-weight:700}
.tar-item .d{font-size:.84rem;color:var(--ink-2)}
.tar-bar{height:6px;border-radius:4px;background:var(--bg-3);overflow:hidden;margin-top:6px;max-width:320px}
.tar-bar i{display:block;height:100%;background:var(--ok)}
.tar-det{grid-column:1/-1;border-top:1px solid var(--line);padding-top:10px}
.tar-mias .act .pill{margin-left:auto}
.tar-aviso{margin:0 0 14px}
@media (max-width:720px){ .tar-form{grid-template-columns:1fr} .tar-item{grid-template-columns:auto 1fr} .tar-item > .row{grid-column:1/-1} }
</style>
<script>
/* =====================================================================
   TAREAS: el docente asigna recursos del mapa de su curso con fecha
   ---------------------------------------------------------------------
   · Solo se pueden asignar recursos de las unidades del curso
     (Ciencias: las 6 unidades del grado; Biología: las unidades del año),
     tomados del catálogo curricular (BIO.curriculo).
   · Una tarea se da por entregada sola cuando el estudiante completa la
     actividad del recurso; no hay archivos que subir.
   · En modo servidor se guardan en la tabla `tareas` de Supabase.
   ===================================================================== */
const TAR_DIA = 86400000;
const Tareas = {
  /* tareas de ejemplo: solo en la demostración local, nunca junto a datos reales */
  demo(){ return (!Cloud.on && !Users.all().length) ? (BIO.assignments||[]).map(a => ({ id:a.id, act:a.item, nivel:a.year, paralelo:a.paralelo, vence:a.vence, nota:a.nota, demo:true })) : []; },
  lista(){ return [...(Store.s.tareas || []), ...this.demo()]; },
  de(nivel, par){ return this.lista().filter(t => +t.nivel === +nivel && (!par || t.paralelo === par)).sort((a,b) => a.vence - b.vence); },
  mias(){ const s = Store.ses; if (s.rol !== 'estudiante' || !s.year) return []; return this.de(s.year, s.paralelo || null); },
  recurso(act){ const e = Object.entries(BIO.curriculo || {}).find(([k,r]) => r.act === act); return e ? Object.assign({ id:e[0] }, e[1]) : { id:null, t:(BIO.activities[act]||{}).t || act, em:'📌', href:(typeof ACT_HREF!=='undefined' && ACT_HREF[act]) || '#/', tipo:'Actividad' }; },
  titulo(t){ return this.recurso(t.act).t; },
  /* Mapa del curso: los recursos que se pueden asignar, agrupados por unidad */
  mapa(nivel){
    const C = BIO.curriculo || {}, grupos = [], vistos = new Set();
    if (+nivel >= 8){
      BIO.cn.unidades.filter(u => u.grado === +nivel).forEach(u => {
        const items = (u.recursos||[]).map(id => Object.assign({ id }, C[id])).filter(r => r.act && !vistos.has(r.act));
        items.forEach(r => vistos.add(r.act));
        if (items.length) grupos.push({ t:`${u.dom==='cvt'?'Vida y Tierra':'Ciencias Físicas'} · U${u.n}: ${u.t}`, unidad:u.id, items }); });
    } else {
      (BIO.unitsOf(+nivel) || []).forEach(n => { const u = BIO.units.find(x => x.n === n) || { n, t:'' };
        const items = Object.entries(C).filter(([k,r]) => r.bio === n && r.act && !vistos.has(r.act)).map(([k,r]) => Object.assign({ id:k }, r));
        items.forEach(r => vistos.add(r.act));
        if (items.length) grupos.push({ t:`Unidad ${n}: ${u.t}`, unidad:n, items }); });
    }
    return grupos;
  },
  enMapa(nivel, act){ return this.mapa(nivel).some(g => g.items.some(r => r.act === act)); },
  /* ---- escrituras ---- */
  async crear({ act, nivel, paralelos, vence, nota }){
    if (!this.enMapa(nivel, act)) return { ok:false, msg:'Ese recurso no pertenece al mapa de este curso.' };
    if (!paralelos || !paralelos.length) return { ok:false, msg:'Elige al menos un paralelo.' };
    if (!vence || isNaN(vence)) return { ok:false, msg:'Elige la fecha de entrega.' };
    if (vence < Date.now() - TAR_DIA) return { ok:false, msg:'La fecha de entrega ya pasó.' };
    const creadas = [], repetidas = [];
    Store.s.tareas = Store.s.tareas || [];
    for (const par of paralelos){
      if (Store.s.tareas.some(t => t.act === act && +t.nivel === +nivel && t.paralelo === par)){ repetidas.push(par); continue; }
      const t = { id:'t'+Date.now().toString(36)+Math.random().toString(36).slice(2,6), act, recurso:this.recurso(act).id, nivel:+nivel, paralelo:par,
        vence, nota:String(nota||'').trim(), docenteId:Store.ses.docenteId || null, creado:Date.now() };
      if (Cloud.on){
        const curso = typeof Admin !== 'undefined' && Admin.cursoDe(nivel, par);
        if (!curso) return { ok:false, msg:`El curso ${BIO.nivel(nivel).corto} ${par} no existe en el servidor.` };
        if (Store.ses.rol === 'docente' && curso.docenteId && curso.docenteId !== Store.ses.docenteId) return { ok:false, msg:`El curso ${BIO.nivel(nivel).corto} ${par} está asignado a otro docente.` };
        if (Store.ses.rol === 'docente' && !curso.docenteId) return { ok:false, msg:`La administración todavía no te asignó el curso ${BIO.nivel(nivel).corto} ${par}. Pídele que lo haga en Administración → Docentes.` };
        try { const row = await Cloud.crearTarea(Object.assign({}, t, { cursoId:curso.id })); Object.assign(t, { id:row.id, cursoId:curso.id }); }
        catch(e){ return { ok:false, msg: Cloud.sinTareas ? TAR_SIN_TABLA : 'El servidor no guardó la tarea: '+e.message }; }
      }
      Store.s.tareas.push(t); creadas.push(t);
    }
    Store.save(); Store.log('tarea_asignada', { act, nivel, paralelos:creadas.map(t=>t.paralelo) });
    if (creadas.length) Auditoria.local('asignar_tarea', { actividad:this.recurso(act).t, nivel, paralelos:creadas.map(t=>t.paralelo) }, { tabla:'tareas' });
    return { ok:true, creadas, repetidas };
  },
  async editar(id, { vence, nota }){
    const t = (Store.s.tareas||[]).find(x => x.id === id); if (!t) return { ok:false, msg:'No se encontró la tarea.' };
    if (!vence || isNaN(vence)) return { ok:false, msg:'Elige la fecha de entrega.' };
    if (Cloud.on){ try { await Cloud.editarTarea(id, { vence, nota }); } catch(e){ return { ok:false, msg:'El servidor no guardó el cambio: '+e.message }; } }
    Object.assign(t, { vence, nota:String(nota||'').trim() }); Store.save(); return { ok:true };
  },
  async borrar(id){
    if (Cloud.on) await Cloud.borrarTarea(id);
    Store.s.tareas = (Store.s.tareas||[]).filter(x => x.id !== id); Store.save();
  },
  /* ---- estado ---- */
  /* para el docente: e es una fila de DOC.roster() */
  estadoDe(t, e){
    const hecha = e.notas && e.notas[t.act] != null;
    const f = ((Store.s.docente.fechas || {})[e.id] || {})[t.act] || null;
    if (hecha) return f && f > t.vence ? { k:'tarde', txt:'Entregó tarde', cls:'warn', f } : { k:'ok', txt:'Entregó', cls:'ok', f };
    return t.vence < Date.now() ? { k:'vencida', txt:'No entregó', cls:'bad' } : { k:'pend', txt:'Pendiente', cls:'' };
  },
  /* para el estudiante conectado */
  miEstado(t){
    const a = Store.s.activities[t.act];
    if (a && a.done) return a.at && a.at > t.vence ? { k:'tarde', txt:'Entregada tarde', cls:'warn' } : { k:'ok', txt:'Entregada', cls:'ok' };
    return t.vence < Date.now() ? { k:'vencida', txt:'Vencida', cls:'bad' } : { k:'pend', txt:'Pendiente', cls:'' };
  }
};
const TAR_SIN_TABLA = 'El servidor todavía no tiene la tabla de tareas. La administración debe ejecutar una sola vez el archivo backend/supabase/migracion-v1.5-tareas.sql en Supabase (SQL Editor).';
const tarFecha = ms => new Date(ms).toLocaleDateString('es-EC', { weekday:'short', day:'numeric', month:'short' });
const tarFaltan = ms => { const d = Math.ceil((ms - Date.now()) / TAR_DIA); return d < 0 ? `venció hace ${-d} día${d===-1?'':'s'}` : d === 0 ? 'vence hoy' : d === 1 ? 'vence mañana' : `vence en ${d} días`; };
const tarDeInput = v => { if (!v) return NaN; const [y,m,d] = v.split('-').map(Number); return new Date(y, m-1, d, 23, 59, 0).getTime(); };
const tarAInput = ms => { const x = new Date(ms); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`; };

/* ---------- Pestaña del docente ---------- */
function tabTareas(body, rerender){
  const nivel = +DOC.year, par = DOC.par, curso = `${BIO.nivel(nivel).corto} ${par}`;
  const grupos = Tareas.mapa(nivel);
  if (Cloud.on && Cloud.sinTareas) body.append(h('div',{class:'notice warn'}, h('span',{}, TAR_SIN_TABLA)));
  if (typeof neeAvisoTareas === 'function') try { const n = neeAvisoTareas(nivel, par); if (n) body.append(n); } catch(e){ console.warn('nee', e); }
  /* formulario */
  const sel = h('select',{'aria-label':'Recurso a asignar'}, h('option',{value:''},'Elige un recurso del mapa del curso…'),
    grupos.map(g => h('optgroup',{label:g.t}, g.items.map(r => h('option',{value:r.act}, `${r.em} ${r.t} · ${r.tipo}`)))));
  const prev = h('div',{class:'tar-prev full',hidden:true});
  const fecha = h('input',{type:'date',class:'tar-fecha','aria-label':'Fecha de entrega',value:tarAInput(Date.now() + 7*TAR_DIA),min:tarAInput(Date.now())});
  const pars = DOC.paralelosDe(nivel);
  const cbs = pars.map(p => { const c = h('input',{type:'checkbox',value:p}); c.checked = p === par; return h('label',{class:'tar-par'}, c, p); });
  const nota = h('textarea',{placeholder:'Indicación para los estudiantes (opcional). Ej.: "Formula tu hipótesis antes de experimentar."',style:'min-height:64px'});
  const msg = h('div',{class:'small',role:'alert'});
  const pintarPrev = () => { const r = grupos.flatMap(g=>g.items).find(x => x.act === sel.value); prev.hidden = !r; prev.innerHTML = '';
    if (r) prev.append(h('span',{class:'em'}, r.em), h('div',{class:'stack',style:'gap:4px'}, h('b',{}, r.t), h('span',{class:'small muted'}, `${r.tipo} · ${r.d}`),
      h('span',{class:'small'}, h('b',{},'Reto que resolverán: '), r.reto), h('a',{class:'small',href:r.href,target:'_blank',rel:'noopener'},'Abrir el recurso en otra pestaña ↗'))); };
  sel.onchange = pintarPrev;
  const btn = h('button',{class:'btn primary'},'Asignar tarea');
  btn.onclick = async () => { msg.textContent = ''; msg.style.color = 'var(--bad)';
    if (!sel.value){ msg.textContent = 'Elige un recurso.'; sel.focus(); return; }
    btn.disabled = true;
    const r = await Tareas.crear({ act:sel.value, nivel, paralelos:cbs.map(l=>l.querySelector('input')).filter(c=>c.checked).map(c=>c.value), vence:tarDeInput(fecha.value), nota:nota.value });
    btn.disabled = false;
    if (!r.ok){ msg.textContent = r.msg; return; }
    toast(r.creadas.length ? `Tarea asignada a ${r.creadas.map(t=>BIO.nivel(t.nivel).corto+' '+t.paralelo).join(', ')}.` : 'No se creó ninguna tarea nueva.');
    if (r.repetidas.length) toast(`Ya estaba asignada en ${r.repetidas.join(', ')}: edita su fecha en la lista.`);
    rerender(); };
  body.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},`Asignar una actividad · mapa de ${BIO.nivel(nivel).n}`),
    h('p',{class:'small muted'},'Solo aparecen los recursos de las unidades de este curso. La tarea se marca entregada sola cuando el estudiante resuelve el reto del recurso.'),
    grupos.length ? h('div',{class:'tar-form'},
      h('label',{class:'full'},'Recurso', sel), prev,
      h('label',{},'Fecha de entrega', fecha),
      h('div',{class:'stack',style:'gap:6px'}, h('span',{style:'font-weight:600;font-size:.86rem'},'Paralelos'), h('div',{class:'tar-pars'}, cbs)),
      h('label',{class:'full'},'Indicación', nota),
      h('div',{class:'full row'}, btn, msg))
    : h('p',{class:'small'},'Este curso aún no tiene recursos en su mapa.')));
  /* lista */
  const r = DOC.roster(); const ts = Tareas.de(nivel, par);
  const actualizar = Cloud.on ? h('button',{class:'btn sm ghost',onclick:async function(){ this.disabled = true; this.textContent = 'Actualizando…';
      try { await Cloud.pull(); toast('Entregas actualizadas.'); } catch(e){ toast('No se pudo actualizar: '+e.message); } rerender(); }},'↻ Actualizar entregas') : null;
  const lista = h('div',{class:'card stack',style:'margin-top:16px'}, h('div',{class:'row',style:'justify-content:space-between'}, h('span',{class:'eyebrow'},`Tareas de ${curso} (${ts.length})`), actualizar));
  if (!ts.length) lista.append(h('p',{class:'small muted'},'Todavía no hay tareas para este paralelo.'));
  ts.forEach(t => {
    const rec = Tareas.recurso(t.act), est = r.map(e => ({ e, s:Tareas.estadoDe(t, e) }));
    const ok = est.filter(x => x.s.k==='ok' || x.s.k==='tarde').length, tarde = est.filter(x=>x.s.k==='tarde').length;
    const vencida = t.vence < Date.now();
    const det = h('div',{class:'tar-det',hidden:true});
    const item = h('div',{class:'tar-item'},
      h('span',{class:'em'}, rec.em || '📌'),
      h('div',{}, h('div',{class:'t'}, rec.t), h('div',{class:'d'}, `${rec.tipo} · entrega ${tarFecha(t.vence)} (${tarFaltan(t.vence)})` + (t.nota ? ` · “${t.nota}”` : '')),
        r.length ? h('div',{class:'small',style:'margin-top:4px'}, `${ok} de ${r.length} entregaron` + (tarde ? ` · ${tarde} tarde` : '')) : null,
        r.length ? h('div',{class:'tar-bar'}, h('i',{style:`width:${Math.round(ok/Math.max(1,r.length)*100)}%`})) : null,
        t.demo ? h('span',{class:'pill',style:'margin-top:6px'},'Ejemplo de demostración') : null),
      h('div',{class:'row',style:'gap:6px;flex-wrap:wrap;justify-content:flex-end'},
        h('span',{class:'pill '+(vencida?'bad':Math.ceil((t.vence-Date.now())/TAR_DIA)<=2?'warn':'')}, tarFecha(t.vence)),
        r.length ? h('button',{class:'btn sm ghost','aria-expanded':'false',onclick:function(){ det.hidden = !det.hidden; this.setAttribute('aria-expanded', String(!det.hidden)); this.textContent = det.hidden ? 'Ver estudiantes' : 'Ocultar'; }},'Ver estudiantes') : null,
        t.demo ? null : h('button',{class:'btn sm ghost',onclick:()=>tarEditarModal(t, rerender)},'Editar'),
        t.demo ? null : h('button',{class:'btn sm ghost danger-text',onclick:()=>confirmar({ peligro:true, titulo:`¿Quitar la tarea "${rec.t}"?`, texto:`Deja de aparecer para ${curso}. Lo que los estudiantes ya resolvieron se conserva en el libro de calificaciones.`, boton:'Quitar tarea', accion: async()=>{ await Tareas.borrar(t.id); toast('Tarea quitada.'); rerender(); } })},'Quitar')),
      det);
    const orden = { vencida:0, pend:1, tarde:2, ok:3 };
    det.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Estudiante'), h('th',{},'Estado'), h('th',{},'Fecha'), h('th',{},''))),
      h('tbody',{}, est.sort((a,b) => orden[a.s.k]-orden[b.s.k] || a.e.nombre.localeCompare(b.e.nombre)).map(({e,s}) => h('tr',{},
        h('td',{}, e.nombre), h('td',{}, h('span',{class:'pill '+s.cls}, s.txt)), h('td',{class:'small muted'}, s.f ? tarFecha(s.f) : '–'),
        h('td',{}, (s.k==='pend'||s.k==='vencida') ? h('button',{class:'btn sm ghost',onclick:()=>msgModal(e)},'Recordar') : null)))))));
    lista.append(item);
  });
  body.append(lista);
}
function tarEditarModal(t, despues){
  const rec = Tareas.recurso(t.act);
  const fecha = h('input',{type:'date',class:'tar-fecha',value:tarAInput(t.vence),'aria-label':'Fecha de entrega'});
  const nota = h('textarea',{style:'min-height:70px'}, t.nota || '');
  const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
  const ok = h('button',{class:'btn primary sm'},'Guardar cambios');
  ok.onclick = async () => { ok.disabled = true; const r = await Tareas.editar(t.id, { vence:tarDeInput(fecha.value), nota:nota.value }); ok.disabled = false;
    if (!r.ok){ msg.textContent = r.msg; return; } closeModal(); toast('Tarea actualizada.'); despues && despues(); };
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Editar tarea'), h('h3',{}, `${rec.em} ${rec.t}`),
    h('label',{class:'stack',style:'gap:6px'},'Fecha de entrega', fecha), h('label',{class:'stack',style:'gap:6px'},'Indicación', nota), msg,
    h('div',{class:'row'}, ok, h('button',{class:'btn sm ghost',onclick:closeModal},'Cancelar'))));
}

/* ---------- Estudiante: "Mis tareas" en su inicio y aviso en el recurso asignado ---------- */
function tarBloqueMias(){
  const ts = Tareas.mias(); if (!ts.length) return null;
  const conEstado = ts.map(t => ({ t, s:Tareas.miEstado(t), r:Tareas.recurso(t.act) }));
  const pend = conEstado.filter(x => x.s.k==='pend' || x.s.k==='vencida');
  const hechas = conEstado.filter(x => x.s.k==='ok' || x.s.k==='tarde').slice(-3).reverse();
  const box = h('section',{class:'card stack tar-mias',style:'margin-bottom:16px','aria-label':'Mis tareas'},
    h('div',{class:'row',style:'justify-content:space-between;align-items:baseline'}, h('span',{class:'eyebrow'},'Mis tareas'),
      h('span',{class:'small muted'}, pend.length ? `${pend.length} pendiente${pend.length===1?'':'s'}` : 'Todo entregado ✓')));
  if (!pend.length) box.append(h('div',{class:'notice ok'},'No tienes tareas pendientes. Buen trabajo.'));
  [...pend, ...hechas].forEach(({t,s,r}) => box.append(h('a',{class:'act',href:r.href},
    h('span',{class:'ico',style:'background:var(--bg-3)'}, r.em || '📌'),
    h('span',{}, h('div',{class:'t'}, r.t), h('div',{class:'d'}, (s.k==='pend'||s.k==='vencida' ? `Entrega: ${tarFecha(t.vence)} · ${tarFaltan(t.vence)}` : `Entregada · era para el ${tarFecha(t.vence)}`) + (t.nota ? ` · ${t.nota}` : ''))),
    h('span',{class:'pill '+s.cls}, s.txt))));
  return box;
}
function tarAvisoRecurso(view, path){
  if (Store.ses.rol !== 'estudiante' || typeof currRecursoDe !== 'function') return;
  const id = currRecursoDe(path); const act = id && BIO.curriculo[id] && BIO.curriculo[id].act; if (!act) return;
  const t = Tareas.mias().find(x => x.act === act); if (!t) return;
  const s = Tareas.miEstado(t);
  const el = h('div',{class:'notice tar-aviso '+(s.k==='ok'?'ok':s.k==='vencida'?'warn':'info'),role:'status'},
    h('span',{}, h('b',{}, s.k==='ok' ? '✓ Tarea entregada. ' : s.k==='tarde' ? 'Tarea entregada tarde. ' : '📌 Tarea asignada por tu docente. '),
      s.k==='ok'||s.k==='tarde' ? 'Tu docente ya ve tu resultado.' : `Entrega: ${tarFecha(t.vence)} (${tarFaltan(t.vence)}). Se entrega sola cuando resuelves el reto de este recurso.`,
      t.nota ? h('span',{}, ' Indicación: ', h('i',{}, t.nota)) : null));
  const head = view.querySelector('.page-head'); if (head) head.after(el); else view.prepend(el);
}
function tarPostRender(view, path){
  if (Store.ses.rol !== 'estudiante') return;
  if (path === '/cn' || path === '/' || path === '/panel'){
    const poner = () => { view.querySelector('.tar-mias')?.remove(); const b = tarBloqueMias(); if (b){ const first = view.firstElementChild; if (first) first.after(b); else view.prepend(b); } };
    poner();
    if (Cloud.on && Cloud.ses && Date.now() - (Cloud.ultimoPull || 0) > 60000)
      Cloud.pull().then(() => { if (document.body.contains(view) && location.hash.replace('#','').split('?')[0] === path) poner(); }).catch(e => console.warn('tareas', e));
    return; }
  tarAvisoRecurso(view, path);
}
</script>
