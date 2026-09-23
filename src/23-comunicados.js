<style>
/* ---------- Comunicados (v1.8) ---------- */
.com-form{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}
.com-form label{display:flex;flex-direction:column;gap:6px;font-weight:600;font-size:.86rem}
.com-form input[type=text]{min-height:42px}
.com-form textarea{min-height:120px}
.com-opts{display:flex;gap:6px;flex-wrap:wrap}
.com-opt{display:inline-flex!important;flex-direction:row!important;align-items:center;gap:6px;padding:7px 12px;border:1px solid var(--line);border-radius:999px;cursor:pointer;font-weight:600;font-size:.85rem;background:var(--bg-2)}
.com-opt:has(input:checked){border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent)}
.com-opt input{accent-color:var(--accent);margin:0}
.com-opt:focus-within{outline:2px solid var(--accent);outline-offset:2px}
.com-cuenta{font-size:.78rem;color:var(--ink-3);text-align:right;margin-top:-6px}
.com-item{display:grid;grid-template-columns:1fr auto;gap:6px 12px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--bg)}
.com-item h4{margin:0;font-size:.98rem}
.com-item .meta{display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:.8rem;color:var(--ink-3)}
.com-item p{grid-column:1/-1;margin:0;white-space:pre-wrap;font-size:.9rem;color:var(--ink-2)}
.com-tarjeta{margin-bottom:16px;padding:14px 16px}
.com-tarjeta .com-mini{display:flex;flex-direction:column;gap:2px;padding:8px 0;border-top:1px solid var(--line)}
.com-tarjeta .com-mini:first-of-type{border-top:0}
.com-tarjeta .com-mini b{font-size:.92rem}
.com-tarjeta .com-mini span{font-size:.82rem;color:var(--ink-3)}
.com-lista{display:flex;flex-direction:column;gap:10px;max-width:820px}
@media (max-width:720px){ .com-item{grid-template-columns:1fr} }
</style>
<script>
/* =====================================================================
   COMUNICADOS (v1.8): el docente escribe a su curso
   ---------------------------------------------------------------------
   · Destinatarios: estudiantes, familias o ambos ('todos'), por paralelo
     del nivel visible (como en Tareas).
   · Servidor: tabla comunicados (Cloud.crearComunicado por curso; la RLS
     decide quién lo lee). Local: Store.s.comunicados.
   · Estudiante: aviso en la campana (14 días) y tarjeta discreta en su
     inicio con los 3 últimos. Familia: pestaña en #/familia.
   ===================================================================== */
const COM_PARA = { estudiantes:'Estudiantes', familias:'Familias', todos:'Estudiantes y familias' };
const COM_DIAS_AVISO = 14;
const comParaTxt = p => ({ estudiantes:'para estudiantes', familias:'para familias', todos:'para estudiantes y familias' })[p] || '';
const comRecorte = (t, n) => { const s = String(t||'').replace(/\s+/g,' ').trim(); return s.length > n ? s.slice(0, n-1).trimEnd() + '…' : s; };
if (typeof CRUMB_NAMES !== 'undefined') CRUMB_NAMES.comunicados = 'Comunicados';

const comGestor = {
  lista(){ return (Store.s.comunicados || []).slice().sort((a,b) => (b.creado||0) - (a.creado||0)); },
  de(nivel, par, paras){ return this.lista().filter(c => +c.nivel === +nivel && (!par || c.paralelo === par) && (!paras || paras.includes(c.para))); },
  /* comunicados que le tocan al estudiante conectado */
  delEstudiante(){ const s = Store.ses; if (s.rol !== 'estudiante' || !s.year || !s.paralelo || s.invitado) return []; return this.de(s.year, s.paralelo, ['estudiantes','todos']); },
  autor(c){ if (c.autorNombre) return c.autorNombre; const d = c.autor && ((Store.s.docentes || {})[c.autor] || (Store.s.personal || {})[c.autor]); return d ? d.nombre : null; },
  async crear({ titulo, texto, para, nivel, paralelos }){
    titulo = String(titulo||'').trim(); texto = String(texto||'').trim();
    if (!titulo) return { ok:false, msg:'Escribe un título.' };
    if (titulo.length > 120) return { ok:false, msg:'El título es muy largo (máximo 120 caracteres).' };
    if (texto.length > 2000) return { ok:false, msg:'El texto es muy largo (máximo 2000 caracteres).' };
    if (!COM_PARA[para]) return { ok:false, msg:'Elige a quién va dirigido.' };
    if (!paralelos || !paralelos.length) return { ok:false, msg:'Elige al menos un paralelo.' };
    const L = Store.s.comunicados = Store.s.comunicados || []; const creados = [];
    const docNombre = (() => { const d = Store.ses.docenteId && (Store.s.docentes || {})[Store.ses.docenteId]; return d ? d.nombre : Store.ses.rol === 'admin' ? 'Coordinación académica' : BIO.school.docente.nombre; })();
    for (const par of paralelos){
      const curso = typeof Admin !== 'undefined' ? Admin.cursoDe(nivel, par) : null;
      if (Cloud.on){
        if (!curso) return { ok:false, msg:`El curso ${BIO.nivel(nivel).corto} ${par} no existe en el servidor.`, creados };
        if (Store.ses.rol === 'docente' && curso.docenteId !== Store.ses.docenteId) return { ok:false, msg:`El curso ${BIO.nivel(nivel).corto} ${par} no está asignado a ti.`, creados };
        try { const c = await Cloud.crearComunicado({ cursoId:curso.id, nivel:+nivel, paralelo:par, titulo, texto, para }); L.unshift(Object.assign(c, { autorNombre:docNombre })); creados.push(c); }
        catch(e){ return { ok:false, msg: Cloud.sinV18 ? AVISO_V18 : 'El servidor no guardó el comunicado: ' + e.message, creados }; }
      } else {
        const c = { id:'c' + Date.now().toString(36) + Math.random().toString(36).slice(2,5), cursoId:curso ? curso.id : null, nivel:+nivel, paralelo:par, titulo, texto, para,
          autor:Store.ses.docenteId || Store.ses.rol, autorNombre:docNombre, creado:Date.now() };
        L.unshift(c); creados.push(c);
      }
    }
    Store.save(); Store.log('comunicado_enviado', { nivel, paralelos, para });
    Auditoria.local('crear_comunicado', { titulo, nivel, paralelos, para }, { tabla:'comunicados' });
    return { ok:true, creados };
  },
  async borrar(id){
    const c = (Store.s.comunicados || []).find(x => x.id === id);
    if (Cloud.on) await Cloud.borrarComunicado(id);
    Store.s.comunicados = (Store.s.comunicados || []).filter(x => x.id !== id); Store.save();
    if (c) Auditoria.local('borrar_comunicado', { titulo:c.titulo, nivel:c.nivel, paralelo:c.paralelo }, { tabla:'comunicados', registro:id });
  }
};

/* ---------- gancho del núcleo: campana del estudiante ---------- */
function comAvisos(){
  const lim = Date.now() - COM_DIAS_AVISO * 86400000;
  return comGestor.delEstudiante().filter(c => (c.creado || 0) >= lim)
    .map(c => ({ id:'com-' + c.id, em:'📣', t:'Comunicado: ' + c.titulo, d: comRecorte(c.texto, 110) || 'De tu docente.', href:'#/comunicados', tipo:'comunicado' }));
}

/* ---------- pestaña del panel docente ---------- */
function comTab(body, rerender){
  const aV = avisoV18(); if (aV) body.append(aV);
  const nivel = +DOC.year, par = DOC.par;
  const titulo = h('input',{type:'text',maxlength:'120',placeholder:'Ej.: Salida de campo al parque el viernes','aria-label':'Título del comunicado'});
  const texto = h('textarea',{maxlength:'2000',placeholder:'Escribe el mensaje. Sé breve y claro: qué, cuándo y qué deben hacer.','aria-label':'Texto del comunicado'});
  const cuenta = h('div',{class:'com-cuenta','aria-live':'polite'}, '0 / 2000');
  texto.addEventListener('input', () => { cuenta.textContent = `${texto.value.length} / 2000`; });
  const nombreRadio = 'com-para-' + Date.now();
  const paras = Object.entries(COM_PARA).map(([k,t]) => { const i = h('input',{type:'radio',name:nombreRadio,value:k}); if (k === 'todos') i.checked = true; return h('label',{class:'com-opt'}, i, t); });
  const pars = DOC.paralelosDe(nivel);
  const cbs = pars.map(p => { const c = h('input',{type:'checkbox',value:p}); c.checked = p === par; return h('label',{class:'com-opt'}, c, p); });
  const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
  const btn = h('button',{class:'btn primary'},'Publicar comunicado');
  btn.onclick = async () => { msg.textContent = '';
    const para = (paras.map(l => l.querySelector('input')).find(i => i.checked) || {}).value;
    const sel = cbs.map(l => l.querySelector('input')).filter(c => c.checked).map(c => c.value);
    if (!titulo.value.trim()){ msg.textContent = 'Escribe un título.'; titulo.focus(); return; }
    btn.disabled = true; btn.textContent = 'Publicando…';
    const r = await comGestor.crear({ titulo:titulo.value, texto:texto.value, para, nivel, paralelos:sel });
    btn.disabled = false; btn.textContent = 'Publicar comunicado';
    if (!r.ok){ msg.textContent = r.msg; if (r.creados && r.creados.length) rerender(); return; }
    toast(`Comunicado publicado ${comParaTxt(para)} de ${sel.map(p => BIO.nivel(nivel).corto + ' ' + p).join(', ')}.`); rerender(); };
  body.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},`Nuevo comunicado · ${BIO.nivel(nivel).n}`),
    h('p',{class:'small muted'},'Los estudiantes lo ven en su inicio y en sus avisos durante 14 días; las familias, en su vista de representante. Nadie de otros cursos lo ve.'),
    h('div',{class:'com-form'},
      h('label',{},'Título', titulo),
      h('label',{},'Mensaje', texto), cuenta,
      h('div',{class:'stack',style:'gap:6px'}, h('span',{style:'font-weight:600;font-size:.86rem',id:'com-para-l'},'Para'), h('div',{class:'com-opts',role:'radiogroup','aria-labelledby':'com-para-l'}, paras)),
      h('div',{class:'stack',style:'gap:6px'}, h('span',{style:'font-weight:600;font-size:.86rem',id:'com-par-l'},'Paralelos'), pars.length ? h('div',{class:'com-opts',role:'group','aria-labelledby':'com-par-l'}, cbs) : h('span',{class:'small muted'},'Este nivel no tiene paralelos asignados.')),
      h('div',{class:'row'}, btn, msg))));
  /* lista del nivel visible */
  const cs = comGestor.de(nivel, null);
  const lista = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},`Comunicados de ${BIO.nivel(nivel).corto} (${cs.length})`));
  if (!cs.length) lista.append(h('p',{class:'small muted'},'Todavía no hay comunicados para este nivel.'));
  else lista.append(h('div',{class:'stack',style:'gap:10px'}, cs.map(c => h('article',{class:'com-item'},
    h('div',{class:'stack',style:'gap:4px'}, h('h4',{}, c.titulo),
      h('div',{class:'meta'}, h('span',{class:'pill'}, `${BIO.nivel(c.nivel).corto} ${c.paralelo}`), h('span',{class:'pill '+(c.para==='familias'?'warn':c.para==='estudiantes'?'':'ok')}, COM_PARA[c.para] || c.para),
        h('span',{}, fechaHora(c.creado)), comGestor.autor(c) ? h('span',{}, '· ' + comGestor.autor(c)) : null)),
    h('div',{}, h('button',{class:'btn sm ghost danger-text','aria-label':`Borrar el comunicado ${c.titulo}`,onclick:()=>confirmar({ peligro:true, boton:'Borrar comunicado', titulo:`¿Borrar "${c.titulo}"?`,
      texto:'Deja de verse para estudiantes y familias de inmediato. Esta acción no se puede deshacer.', accion: async () => { await comGestor.borrar(c.id); toast('Comunicado borrado.'); rerender(); } })},'Borrar')),
    c.texto ? h('p',{}, c.texto) : null))));
  body.append(lista);
}
DOC_TABS_EXTRA.push({ id:'comunicados', t:'Comunicados', roles:['docente','admin'], antes:'codigos', fn:comTab });

/* ---------- estudiante: tarjeta discreta en su inicio ---------- */
function comTarjeta(){
  const cs = comGestor.delEstudiante().slice(0,3); if (!cs.length) return null;
  return h('section',{class:'card stack com-tarjeta','aria-label':'Comunicados de tu docente'},
    h('div',{class:'row',style:'justify-content:space-between;align-items:baseline'}, h('span',{class:'eyebrow'},'📣 Comunicados de tu docente'), h('a',{class:'small',href:'#/comunicados'},'Ver todos')),
    ...cs.map(c => h('a',{class:'com-mini',href:'#/comunicados',style:'text-decoration:none;color:inherit'}, h('b',{}, c.titulo),
      h('span',{}, `${timeAgo(c.creado)}${c.texto ? ' · ' + comRecorte(c.texto, 120) : ''}`))));
}
POST_RENDER.push((view, path) => {
  if (Store.ses.rol !== 'estudiante' || (path !== '/' && path !== '/cn')) return;
  view.querySelector('.com-tarjeta')?.remove();
  const t = comTarjeta(); if (!t) return;
  const tar = view.querySelector('.tar-mias');
  if (tar) tar.after(t); else { const first = view.firstElementChild; if (first) first.after(t); else view.prepend(t); }
});

/* ---------- #/comunicados: lista completa para el estudiante ---------- */
route('/comunicados', (view) => {
  const rol = Store.ses.rol;
  if (rol === 'familia'){ location.replace('#/familia?t=comunicados'); return; }
  if (['docente','admin'].includes(rol)){ location.replace('#/docente?t=comunicados'); return; }
  const cs = comGestor.delEstudiante();
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Comunicados'), h('h1',{},'Mensajes de tu docente'),
    h('p',{}, Store.ses.year && Store.ses.paralelo ? `Para ${BIO.nivel(Store.ses.year).corto} "${Store.ses.paralelo}". Los más recientes primero.` : 'Entra con tu usuario para ver los comunicados de tu curso.'))));
  if (!cs.length){ view.append(h('div',{class:'ph'}, Store.ses.paralelo ? 'Tu docente todavía no ha enviado comunicados a tu curso.' : 'Los comunicados llegan a los estudiantes que entran con su usuario o con el código de su curso.')); return; }
  view.append(h('div',{class:'com-lista'}, cs.map(c => h('article',{class:'com-item'},
    h('div',{class:'stack',style:'gap:4px'}, h('h4',{}, c.titulo), h('div',{class:'meta'}, h('span',{}, fechaHora(c.creado)), c.para === 'todos' ? h('span',{class:'pill'},'También para tu familia') : null)),
    h('span',{}), c.texto ? h('p',{}, c.texto) : null))));
  cs.forEach(c => Store.leerAviso('com-' + c.id));
});
</script>
