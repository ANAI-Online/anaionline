<style>
.adm-bulk{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 12px;border:1px solid var(--accent);border-radius:12px;background:var(--bg-2)}
tr.adm-sel td{background:color-mix(in srgb,var(--accent) 10%,transparent)}
.btn.danger{background:var(--bad);border-color:var(--bad);color:#fff}
.btn.danger-text{color:var(--bad)}

.adm-kpi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.adm-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;align-items:end}
.adm-form label{display:flex;flex-direction:column;gap:4px;font-size:.8rem;font-weight:600;color:var(--ink-2)}
.adm-form input,.adm-form select{padding:8px 10px;border-radius:9px;border:1px solid var(--line-2);background:var(--bg-2)}
.adm-prog{display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:999px}
.adm-prog.cn{background:var(--eco-soft);color:var(--eco)} .adm-prog.bio{background:var(--anat-soft);color:var(--anat)}
.adm-env{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.adm-envcard{padding:18px;border-radius:var(--r-l);border:1px solid var(--line);background:var(--bg-2);display:flex;flex-direction:column;gap:8px;position:relative;overflow:hidden}
.adm-envcard::before{content:"";position:absolute;inset:0 0 auto 0;height:4px}
.adm-envcard.cn::before{background:var(--eco)} .adm-envcard.bio::before{background:var(--anat)}
.adm-envcard .em{font-size:1.7rem}
@media (max-width:1100px){ .adm-kpi{grid-template-columns:repeat(2,1fr)} .adm-env{grid-template-columns:1fr} }
</style>
<script>
/* =====================================================================
   VISTA DE ADMINISTRACIÓN · potestad total sobre los dos entornos
   Crea cursos, carga estudiantes, genera usuarios institucionales y
   crea las cuentas de docentes de Ciencias Naturales y de Biología.
   ===================================================================== */
const ADMIN_EMAIL = 'admin@anai.edu.ec';
const Admin = {
  get s(){ const a = Store.s.admin = Store.s.admin || { cursos:[], anio:ANIO_DEF }; a.cursos = a.cursos || []; return a; },
  cursos(){ return this.s.cursos; },
  curso(id){ return this.cursos().find(c => c.id===id); },
  cursoDe(nivel, paralelo){ return this.cursos().find(c => +c.nivel===+nivel && c.paralelo===paralelo); },
  crearCurso({prog, nivel, paralelo, docenteId, anio}){
    if (this.cursoDe(nivel, paralelo)) return { ok:false, msg:'Ya existe un curso con ese nivel y paralelo.' };
    const c = { id:`c${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`, prog, nivel:+nivel, paralelo:String(paralelo).toUpperCase(), docenteId:docenteId||null, anio: anio || this.s.anio, creado:Date.now() };
    this.cursos().push(c); Store.save(); Store.log('admin_curso_creado', { nivel:c.nivel, paralelo:c.paralelo, prog });
    Auditoria.local('crear_curso', { curso:`${c.nivel} ${c.paralelo}`, prog }, { tabla:'cursos', registro:c.id });
    if (Cloud.on) Cloud.crearCurso(c).then(cc => { Object.assign(c, { id:cc.id }); Store.save(); }).catch(e => { this.s.cursos = this.cursos().filter(x=>x!==c); Store.save(); toast('El servidor rechazó el curso: '+e.message); });
    return { ok:true, curso:c };
  },
  /* v1.8: los cursos borrados van a la papelera (30 días) */
  async borrarCurso(id){ const r = await Papelera.curso(id); if (!r.ok) toast(r.msg); return r; },
  estudiantesDe(c){ return Users.ofCourse(+c.nivel, c.paralelo); },
  /* ---- docentes ---- */
  docentes(){ return Object.values(Store.s.docentes || {}); },
  docente(id){ return (Store.s.docentes||{})[id]; },
  docentesDe(prog){ return this.docentes().filter(d => d.prog===prog); },
  /* sugerencia según la convención institucional: inicial del nombre + primer apellido (jheredia@anai.edu.ec); siempre editable */
  emailDocente(nombres, apellidos){
    const n = sinTildes(String(nombres||'').trim()).toLowerCase().replace(/[^a-z]/g,'');
    const a = sinTildes(String(apellidos||'').trim().split(/\s+/)[0] || '').toLowerCase().replace(/[^a-z]/g,'');
    let base = (n[0]||'') + a || n || 'docente', email = `${base}@${DOMINIO_DOC}`, i = 2;
    while (this.docentes().some(d => d.email === email)) email = `${base}${i++}@${DOMINIO_DOC}`;
    return email;
  },
  validarEmail(email, idActual){
    const e = String(email||'').trim().toLowerCase();
    if (!/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e)) return { ok:false, msg:'Escribe un correo válido, por ejemplo jheredia@anai.edu.ec.' };
    if (this.docentes().some(d => d.email.toLowerCase() === e && d.id !== idActual)) return { ok:false, msg:'Ya existe un docente con ese correo.' };
    return { ok:true, email:e };
  },
  async crearDocente({nombres, apellidos, prog, cursos, email}){
    const d = Store.s.docentes = Store.s.docentes || {};
    if (Cloud.on){
      const r = await Cloud.crearDocente({ nombres:capital(nombres), apellidos:capital(apellidos), email:(email||this.emailDocente(nombres, apellidos)), prog });
      d[r.id] = { id:r.id, nombres:capital(nombres), apellidos:capital(apellidos), nombre:(capital(nombres)+' '+capital(apellidos)).trim(), email:r.email, prog, cursos:cursos||[], temp:r.temp, hash:null, cambiar:true, entregada:false, creado:Date.now(), ultimoAcceso:null };
      Store.save(); Store.log('admin_docente_creado', { prog, servidor:true }); return d[r.id];
    }
    const pass = generarPass(), id = 'd'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
    d[id] = { id, nombres:capital(nombres), apellidos:capital(apellidos), nombre:(capital(nombres)+' '+capital(apellidos)).trim(),
      email:(email && String(email).trim().toLowerCase()) || this.emailDocente(nombres, apellidos), prog, cursos:cursos||[], temp:pass, hash: await hashPass(pass),
      cambiar:true, entregada:false, creado:Date.now(), ultimoAcceso:null };
    Store.save(); Store.log('admin_docente_creado', { prog }); Auditoria.local('crear_docente', { email:d[id].email }, { tabla:'perfiles', registro:id }); return d[id];
  },
  async resetDocente(id){ const d = this.docente(id); if (!d) return null;
    if (Cloud.on){ const t = await Cloud.resetPassword(id); d.temp = t; d.cambiar = true; d.entregada = false; Store.save(); return t; }
    const p = generarPass(); d.temp = p; d.hash = await hashPass(p); d.cambiar = true; d.entregada = false; Store.save(); return p; },
  async borrarDocente(id){ const r = await Papelera.cuenta(id); if (!r.ok) throw new Error(r.msg); },
  async editarDocente(id, c){ const d = this.docente(id); if (!d) return { ok:false, msg:'No existe ese docente.' };
    const nombres = capital(String(c.nombres||'').trim()), apellidos = capital(String(c.apellidos||'').trim());
    if (!nombres || !apellidos) return { ok:false, msg:'Escribe nombres y apellidos.' };
    const prog = c.prog || d.prog, nombre = (nombres+' '+apellidos).trim();
    if (Cloud.on){ try { await Cloud.editarPerfil(id, { nombres, apellidos, nombre, prog }); } catch(e){ return { ok:false, msg:'El servidor no aceptó el cambio: '+e.message }; } }
    if (prog !== d.prog){ (d.cursos||[]).forEach(cid => this.asignar(id, cid, false)); d.cursos = []; }
    Object.assign(d, { nombres, apellidos, nombre, prog }); Store.save(); return { ok:true }; },
  asignar(docenteId, cursoId, on){
    const d = this.docente(docenteId); if (!d) return; const set = new Set(d.cursos||[]);
    on ? set.add(cursoId) : set.delete(cursoId); d.cursos = [...set];
    const c = this.curso(cursoId); if (c){ if (on) c.docenteId = docenteId; else if (c.docenteId===docenteId) c.docenteId = null; }
    Store.save(); if (c) Auditoria.local(on ? 'asignar_curso' : 'quitar_curso', { docente:d.nombre, curso:`${c.nivel} ${c.paralelo}` }, { tabla:'cursos', registro:c.id });
    if (Cloud.on && c) Cloud.asignarCurso(c.id, c.docenteId).catch(e=>toast('No se guardó la asignación: '+e.message));
  },
  cursosDeDocente(id){ const d = this.docente(id); if (!d) return []; return this.cursos().filter(c => (d.cursos||[]).includes(c.id) || c.docenteId===id); },
  /* ---- respaldo ---- */
  respaldo(){ return JSON.stringify({ generado:new Date().toISOString(), anio:this.s.anio, cursos:this.cursos(), docentes:Store.s.docentes||{}, usuarios:Store.s.usuarios||{} }, null, 2); },
  restaurar(txt){ try { const d = JSON.parse(txt); if (d.cursos) this.s.cursos = d.cursos; if (d.docentes) Store.s.docentes = d.docentes; if (d.usuarios) Store.s.usuarios = d.usuarios; if (d.anio) this.s.anio = d.anio; Store.save(); return true; } catch(e){ return false; } }
};
const progPill = p => h('span',{class:'adm-prog '+p}, BIO.programas[p].em, BIO.programas[p].n);

route('/admin', (view, q) => {
  if (Store.ses.rol !== 'admin'){ admGate(view); return; }
  view.classList.add('wide');
  let tab = q.t || 'resumen';
  view.append(h('div',{class:'page-head'},
    h('div',{}, h('span',{class:'eyebrow'},'Administración · '+BIO.school.institucion), h('h1',{},'Consola de administración'),
      h('p',{},'Control total de los dos entornos: cursos, estudiantes, usuarios institucionales y docentes de cada asignatura. Año lectivo '+Admin.s.anio+'.')),
    h('div',{class:'row'}, h('a',{class:'btn sm',href:'#/docente'},'Ver como docente'), h('button',{class:'btn sm ghost',onclick:cerrarSesion},'Cerrar sesión'))));
  const tabs = h('div',{class:'tabs',role:'tablist'});
  const TABS = [['resumen','Resumen'],['cursos','Cursos'],['estudiantes','Estudiantes'],['docentes','Docentes'],['credenciales','Credenciales'],['ajustes','Ajustes']];
  /* v1.8: pestañas que suman los módulos de gestión (año lectivo, papelera, auditoría, privacidad…) */
  ADM_TABS_EXTRA.forEach(x => { const i = x.antes ? TABS.findIndex(t => t[0] === x.antes) : -1; if (TABS.some(t => t[0] === x.id)) return; i >= 0 ? TABS.splice(i, 0, [x.id, x.t]) : TABS.push([x.id, x.t]); });
  if (!TABS.some(t => t[0] === tab)) tab = 'resumen';
  TABS.forEach(([id,t]) => tabs.append(h('button',{role:'tab','aria-selected':String(id===tab),onclick:()=>{ tab=id; render(); }},t)));
  const body = h('div',{class:'stack'});
  view.append(tabs, h('div',{style:'height:14px'}), body);
  function render(){
    $$('button',tabs).forEach((b,i)=>b.setAttribute('aria-selected', String(TABS[i][0]===tab)));
    body.innerHTML='';
    const extra = ADM_TABS_EXTRA.find(x => x.id === tab);
    if (extra) extra.fn(body, render);
    else ({ resumen:admResumen, cursos:admCursos, estudiantes:admEstudiantes, docentes:admDocentes, credenciales:admCredenciales, ajustes:admAjustes })[tab](body, render);
    Store.log('admin_tab',{tab});
  }
  render();
});
function admGate(view){
  const u = h('input',{type:'text',placeholder:ADMIN_EMAIL,'aria-label':'Usuario de administración'});
  const p = h('input',{type:'password',placeholder:'Contraseña','aria-label':'Contraseña'});
  const msg = h('div',{class:'notice',style:'display:none'});
  const entrar = async () => { const r = await Users.login(u.value || ADMIN_EMAIL, p.value);
    if (!r.ok || r.rol!=='admin'){ msg.className='notice warn'; msg.textContent = r.msg || 'Esas credenciales no corresponden a la administración.'; msg.style.display='flex'; return; }
    updateChips(); toast('Bienvenido a la consola de administración.'); render(); };
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Administración'), h('h1',{},'Consola de administración'),
    h('p',{},'Acceso restringido. Desde aquí se crean los cursos, los usuarios de los estudiantes y las cuentas de los docentes de cada asignatura.'))));
  view.append(h('div',{class:'card stack',style:'max-width:520px'}, u, p, msg,
    h('button',{class:'btn primary',onclick:entrar},'Entrar'),
    Cloud.on ? h('p',{class:'small muted'},'Entra con la cuenta de administración creada en Supabase.') : h('p',{class:'small muted'},`Para la demostración: ${ADMIN_EMAIL} · contraseña ${Store.s.adminPass || 'AnaiAdmin2026'}`)));
  p.addEventListener('keydown', e => { if (e.key==='Enter') entrar(); });
}

/* ---------- Resumen ---------- */
function admResumen(body, rerender){
  const cursos = Admin.cursos(), est = Users.all(), doc = Admin.docentes();
  const sinEntregar = est.filter(u=>!u.entregada).length;
  const kpi = h('div',{class:'adm-kpi'});
  [[cursos.length,'cursos creados'],[est.length,'estudiantes con usuario'],[doc.length,'docentes'],[sinEntregar,'credenciales por entregar']]
    .forEach(([v,l]) => kpi.append(h('div',{class:'card stat'}, h('span',{class:'v'},String(v)), h('span',{class:'l'},l))));
  body.append(kpi);
  const env = h('div',{class:'adm-env',style:'margin-top:16px'});
  Object.values(BIO.programas).forEach(pr => {
    const cs = cursos.filter(c=>c.prog===pr.id), es = est.filter(u=>BIO.progOf(u.year)===pr.id), ds = Admin.docentesDe(pr.id);
    env.append(h('div',{class:'adm-envcard '+pr.id},
      h('span',{class:'em'},pr.em), h('h3',{},pr.n), h('p',{class:'small muted'},pr.d),
      h('div',{class:'row',style:'gap:14px;margin-top:4px'},
        h('div',{class:'stat'}, h('span',{class:'v'},String(cs.length)), h('span',{class:'l'},'cursos')),
        h('div',{class:'stat'}, h('span',{class:'v'},String(es.length)), h('span',{class:'l'},'estudiantes')),
        h('div',{class:'stat'}, h('span',{class:'v'},String(ds.length)), h('span',{class:'l'},'docentes'))),
      h('div',{class:'row',style:'margin-top:6px'},
        h('a',{class:'btn sm',href:pr.home},'Abrir entorno'),
        h('span',{class:'small muted'}, BIO.nivelesDe(pr.id).map(n=>n.corto).join(' · ')))));
  });
  body.append(env);
  const pasos = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Puesta en marcha'),
    h('p',{class:'small muted'},'El orden recomendado para dejar la plataforma lista con un curso real.'));
  [['1','Crear los cursos','Un curso por nivel y paralelo, en el entorno que corresponde.', ()=>{ }],
   ['2','Cargar los estudiantes','Sube el listado con el código de cada estudiante: se generan los usuarios y las contraseñas temporales.'],
   ['3','Crear los docentes','Uno por cada docente de Ciencias Naturales y de Biología; se le asignan sus cursos.'],
   ['4','Entregar credenciales','Fichas impresas o mensaje por WhatsApp; y el CSV para que TIC cree las cuentas institucionales.']]
   .forEach(([n,t,d]) => pasos.append(h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--bg-3)'},n), h('span',{}, h('div',{class:'t'},t), h('div',{class:'d'},d)))));
  body.append(pasos);
}

/* ---------- Cursos ---------- */
function admCursos(body, rerender){
  const prog = h('select',{'aria-label':'Entorno'}, Object.values(BIO.programas).map(p=>h('option',{value:p.id},p.n+' · '+p.sub)));
  const nivel = h('select',{'aria-label':'Nivel'});
  const par = h('input',{type:'text',value:'A',maxlength:'2','aria-label':'Paralelo',style:'text-transform:uppercase'});
  const doc = h('select',{'aria-label':'Docente'});
  const pintarNiveles = () => { nivel.innerHTML=''; BIO.nivelesDe(prog.value).forEach(n => nivel.append(h('option',{value:n.id},n.n))); pintarDocentes(); };
  const pintarDocentes = () => { doc.innerHTML=''; doc.append(h('option',{value:''},'Sin docente asignado')); Admin.docentesDe(prog.value).forEach(d => doc.append(h('option',{value:d.id},d.nombre+' · '+d.email))); };
  prog.addEventListener('change', pintarNiveles); pintarNiveles();
  body.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Crear un curso'),
    h('div',{class:'adm-form'},
      h('label',{},'Entorno', prog), h('label',{},'Nivel', nivel), h('label',{},'Paralelo', par), h('label',{},'Docente', doc),
      h('button',{class:'btn primary',onclick:()=>{ const r = Admin.crearCurso({prog:prog.value, nivel:nivel.value, paralelo:par.value, docenteId:doc.value||null});
        if (!r.ok) return toast(r.msg); if (doc.value) Admin.asignar(doc.value, r.curso.id, true);
        toast(`Curso ${BIO.nivel(r.curso.nivel).corto} "${r.curso.paralelo}" creado.`); rerender(); }},'Crear curso')),
    h('p',{class:'small muted'},'El nivel define automáticamente el entorno que verá el estudiante: 8.º, 9.º y 10.º entran a Ciencias Naturales; 1.º, 2.º y 3.º de Bachillerato entran a Biología.')));
  const cursos = Admin.cursos();
  if (!cursos.length){ body.append(h('div',{class:'ph',style:'margin-top:16px'}, h('b',{},'Todavía no hay cursos. '), 'Crea el primero arriba, o usa el botón "Cargar datos de ejemplo" en Ajustes para ver la consola con información de prueba.')); return; }
  const tbl = h('table',{class:'data'}, h('thead',{},h('tr',{},h('th',{},'Curso'),h('th',{},'Entorno'),h('th',{},'Docente'),h('th',{},'Estudiantes'),h('th',{},'Credenciales entregadas'),h('th',{},''))),
    h('tbody',{}, cursos.slice().sort((a,b)=>a.prog.localeCompare(b.prog)||a.nivel-b.nivel||a.paralelo.localeCompare(b.paralelo)).map(c => {
      const es = Admin.estudiantesDe(c), d = c.docenteId ? Admin.docente(c.docenteId) : null;
      return h('tr',{},
        h('td',{}, h('b',{},`${BIO.nivel(c.nivel).corto} "${c.paralelo}"`), h('div',{class:'small muted'},'Año '+(c.anio||Admin.s.anio))),
        h('td',{}, progPill(c.prog)),
        h('td',{}, d ? h('span',{}, h('b',{},d.nombre), h('div',{class:'small muted'},d.email)) : h('span',{class:'pill warn'},'Sin asignar')),
        h('td',{class:'mono'}, String(es.length)),
        h('td',{class:'mono'}, es.length ? `${es.filter(u=>u.entregada).length}/${es.length}` : '—'),
        h('td',{style:'white-space:nowrap'}, h('div',{class:'row',style:'gap:6px;flex-wrap:nowrap'},
          h('a',{class:'btn sm ghost',href:`#/docente/credenciales/${c.nivel}/${c.paralelo}`},'Fichas'),
          h('button',{class:'btn sm ghost danger-text',onclick:()=>confirmar({ peligro:true, titulo:`¿Eliminar el curso ${BIO.nivel(c.nivel).corto} ${c.paralelo}?`, texto:'El curso va a la papelera: los docentes dejan de verlo y se puede restaurar durante 30 días. Las cuentas de los estudiantes no se borran.', boton:'Enviar a la papelera', accion: async()=>{ const r = await Admin.borrarCurso(c.id); if (r.ok){ rerender(); toast('Curso enviado a la papelera.'); } } })},'Eliminar'))));
    })));
  body.append(h('div',{class:'tablewrap',style:'margin-top:16px'}, tbl));
}

/* ---------- Estudiantes ---------- */
function admEstudiantes(body, rerender){
  const cursos = Admin.cursos();
  if (!cursos.length){ body.append(h('div',{class:'notice warn'},'Primero crea al menos un curso en la pestaña "Cursos".')); }
  const sel = h('select',{'aria-label':'Curso'}, cursos.map(c => h('option',{value:c.id}, `${BIO.nivel(c.nivel).corto} "${c.paralelo}" · ${BIO.programas[c.prog].n}`)));
  const ta = h('textarea',{placeholder:'Pega aquí el listado (código, apellidos, nombres, nivel, paralelo, correo del representante)…',style:'min-height:130px;font-family:var(--font-m);font-size:.8rem'});
  const file = h('input',{type:'file',accept:'.csv,.txt,text/csv',style:'display:none',onchange:e=>{ const f=e.target.files[0]; if(!f) return; const rd=new FileReader(); rd.onload=()=>{ ta.value=rd.result; toast(`Archivo "${f.name}" cargado.`); }; rd.readAsText(f,'utf-8'); }});
  const rev = h('div',{class:'stack'});
  let revision = null;
  const cursoActual = () => Admin.curso(sel.value) || cursos[0];
  body.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Cargar el listado de un curso'),
    h('p',{class:'small muted'},'Se reconocen las columnas en cualquier orden. Si el archivo no trae nivel ni paralelo, se usa el curso seleccionado. El usuario de cada estudiante se arma con su código: '+h('b',{}).textContent+`código@${DOMINIO_EST}.`),
    h('div',{class:'adm-form'}, h('label',{},'Curso destino', sel),
      h('div',{class:'row',style:'gap:6px'}, h('button',{class:'btn sm',onclick:()=>file.click()},'Subir CSV'), file,
        h('button',{class:'btn sm ghost',onclick:()=>descargarTexto('plantilla-estudiantes.csv', Users.plantillaCSV())},'Plantilla'),
        h('button',{class:'btn sm ghost',onclick:()=>{ const c = cursoActual(); ta.value = Users.ejemplo().replace(/;2;A;/g, `;${c.nivel};${c.paralelo};`); toast('Ejemplo cargado.'); }},'Ejemplo'))),
    ta,
    h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ const c = cursoActual(); if (!c) return toast('Crea primero un curso.');
      revision = Users.revisar(ta.value, c.nivel, c.paralelo); pintar(); }},'Revisar listado'), rev));
  function pintar(){
    rev.innerHTML=''; if (!revision) return;
    const { ok, errores, avisos=[] } = revision;
    rev.append(h('div',{class:'row'}, h('span',{class:'pill ok'},`${ok.length} listos`), errores.length?h('span',{class:'pill bad'},`${errores.length} con problemas`):null, avisos.length?h('span',{class:'pill warn'},`${avisos.length} aviso(s)`):null));
    if (avisos.length) rev.append(h('div',{class:'notice info'}, h('span',{}, avisos.slice(0,5).map(e=>e.msg).join(' · '))));
    if (errores.length) rev.append(h('div',{class:'notice warn'}, h('span',{}, errores.slice(0,6).map(e=>`fila ${e.fila}: ${e.msg}`).join(' · '))));
    if (ok.length){
      rev.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
        h('thead',{},h('tr',{},h('th',{},'Código'),h('th',{},'Estudiante'),h('th',{},'Curso'),h('th',{},'Usuario'),h('th',{},'Estado'))),
        h('tbody',{}, ok.slice(0,50).map(f => h('tr',{}, h('td',{class:'mono'},f.codigo), h('td',{},f.nombre),
          h('td',{},`${BIO.nivel(f.year).corto} ${f.paralelo}`), h('td',{class:'mono small'},Users.emailOf(f.codigo)),
          h('td',{}, f.existe?h('span',{class:'pill warn'},'Ya existe'):h('span',{class:'pill ok'},'Nuevo'))))))));
      rev.append(h('button',{class:'btn primary',style:'align-self:flex-start',onclick:async function(){ this.disabled=true;
        const r = await Users.importar(ok); toast(`${r.nuevos} usuarios creados y ${r.actualizados} actualizados.`); revision=null; rerender(); }},'Generar usuarios y contraseñas'));
    }
  }
  /* listado global: buscar, editar, eliminar y acciones en bloque */
  if (!Users.all().length) return;
  const filtro = h('select',{'aria-label':'Filtrar por curso',style:'width:auto',onchange:()=>{ sel2.clear(); pintarLista(); }}, h('option',{value:''},'Todos los cursos'),
    BIO.niveles.map(n => h('option',{value:n.id}, n.n)));
  const buscar = h('input',{type:'text',placeholder:'Buscar por código o nombre','aria-label':'Buscar estudiante',style:'width:240px;max-width:100%',oninput:()=>pintarLista()});
  const sel2 = new Set();
  const cont = h('div',{class:'stack'});
  const titulo = h('b',{});
  body.append(h('div',{class:'row',style:'justify-content:space-between;margin:20px 0 8px;flex-wrap:wrap;gap:8px'},
    titulo, h('div',{class:'row',style:'gap:6px;flex-wrap:wrap;align-items:center'}, buscar, filtro,
      h('button',{class:'btn sm',onclick:()=>descargarTexto('credenciales.csv', Users.csvCredenciales(visibles()))},'Descargar credenciales'))), cont);
  function visibles(){
    const q = sinTildes(buscar.value.trim().toLowerCase());
    return Users.all().filter(u => (!filtro.value || +u.year === +filtro.value) && (!q || String(u.codigo).includes(q) || sinTildes(u.nombre.toLowerCase()).includes(q)))
      .sort((a,b)=> a.year-b.year || String(a.paralelo).localeCompare(String(b.paralelo)) || a.nombre.localeCompare(b.nombre));
  }
  function pintarLista(){
    cont.innerHTML='';
    const l = visibles(); titulo.textContent = `Estudiantes con usuario (${Users.all().length})` + (l.length !== Users.all().length ? ` · mostrando ${l.length}` : '');
    [...sel2].forEach(c => { if (!l.some(u=>u.codigo===c)) sel2.delete(c); });
    const todos = h('input',{type:'checkbox','aria-label':'Seleccionar todos los visibles'}); todos.checked = l.length>0 && l.every(u=>sel2.has(u.codigo));
    todos.onchange = () => { l.forEach(u => todos.checked ? sel2.add(u.codigo) : sel2.delete(u.codigo)); pintarLista(); };
    if (sel2.size) cont.append(h('div',{class:'adm-bulk'},
      h('b',{}, `${sel2.size} seleccionado${sel2.size===1?'':'s'}`),
      h('button',{class:'btn sm',onclick:()=>moverModal([...sel2], ()=>{ sel2.clear(); pintarLista(); })},'Cambiar año o paralelo'),
      h('button',{class:'btn sm',onclick:()=>descargarTexto('credenciales-seleccion.csv', Users.csvCredenciales([...sel2].map(c=>Users.get(c)).filter(Boolean)))},'Descargar sus credenciales'),
      h('button',{class:'btn sm danger',onclick:()=>eliminarModal([...sel2], ()=>{ sel2.clear(); pintarLista(); })},'Eliminar seleccionados'),
      h('button',{class:'btn sm ghost',onclick:()=>{ sel2.clear(); pintarLista(); }},'Quitar selección')));
    if (!l.length){ cont.append(h('p',{class:'small muted'},'Ningún estudiante coincide con la búsqueda.')); return; }
    cont.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{},h('tr',{},h('th',{style:'width:34px'},todos),h('th',{},'Código'),h('th',{},'Estudiante'),h('th',{},'Curso'),h('th',{},'Entorno'),h('th',{},'Usuario'),h('th',{},'Estado'),h('th',{},'Acciones'))),
      h('tbody',{}, l.map(u => { const cb = h('input',{type:'checkbox','aria-label':'Seleccionar '+u.nombre}); cb.checked = sel2.has(u.codigo);
        cb.onchange = () => { cb.checked ? sel2.add(u.codigo) : sel2.delete(u.codigo); pintarLista(); };
        const parMalo = !/^[A-Z]{1,2}$/.test(String(u.paralelo||''));
        return h('tr',{class: sel2.has(u.codigo) ? 'adm-sel' : null},
        h('td',{},cb),
        h('td',{class:'mono'},u.codigo), h('td',{}, h('b',{},u.nombre), (!u.nombres || !u.apellidos) ? h('div',{class:'small',style:'color:var(--warn)'},'Revisa el nombre') : null),
        h('td',{}, `${BIO.nivel(u.year).corto} ${u.paralelo}`, parMalo ? h('div',{class:'small',style:'color:var(--warn)'},'Paralelo no válido') : null),
        h('td',{}, progPill(BIO.progOf(u.year))),
        h('td',{class:'mono small'},u.email),
        h('td',{}, u.entregada?h('span',{class:'pill ok'},'Entregada'):h('span',{class:'pill warn'},'Por entregar')),
        h('td',{style:'white-space:nowrap'}, h('div',{class:'row',style:'gap:4px;flex-wrap:nowrap'},
          h('button',{class:'btn sm ghost',onclick:()=>editarEstModal(u, pintarLista)},'Editar'),
          h('button',{class:'btn sm ghost',onclick:()=>credModal(u, pintarLista)},'Entregar'),
          h('button',{class:'btn sm ghost',onclick:()=>confirmar({ titulo:'Restablecer la contraseña de '+u.nombre, texto:'Se genera una contraseña temporal nueva y la anterior deja de funcionar.', boton:'Restablecer',
            accion: async()=>{ const p = await Users.resetPass(u.codigo); toast('Nueva contraseña: '+p); pintarLista(); } })},'Restablecer'),
          h('button',{class:'btn sm ghost danger-text',onclick:()=>eliminarModal([u.codigo], pintarLista)},'Eliminar')))); })))));
  }
  pintarLista();
}

/* ---------- Diálogos de administración ---------- */
/* Confirmación en ventana propia (no el confirm() del navegador). Con "escribir" exige teclear una palabra. */
function confirmar({ titulo, texto, boton='Confirmar', peligro=false, escribir=null, accion }){
  const inp = escribir ? h('input',{type:'text','aria-label':`Escribe ${escribir} para confirmar`,placeholder:escribir,autocomplete:'off'}) : null;
  const msg = h('div',{class:'small',role:'alert'});
  const ok = h('button',{class:'btn sm '+(peligro?'danger':'primary')}, boton);
  ok.onclick = async () => { if (inp && inp.value.trim().toUpperCase() !== escribir){ msg.textContent = `Escribe ${escribir} para confirmar.`; inp.focus(); return; }
    ok.disabled = true; ok.textContent = 'Procesando…';
    try { await accion(); closeModal(); } catch(e){ msg.textContent = 'No se pudo completar: '+e.message; ok.disabled = false; ok.textContent = boton; } };
  openModal(h('div',{class:'stack'}, h('h3',{},titulo), h('p',{},texto),
    inp ? h('label',{class:'small'}, `Para confirmar, escribe ${escribir}:`, inp) : null, msg,
    h('div',{class:'row'}, ok, h('button',{class:'btn sm ghost',onclick:closeModal},'Cancelar'))));
  (inp || ok).focus();
}
function editarEstModal(u, despues){
  const f = { nombres:h('input',{type:'text',value:u.nombres||''}), apellidos:h('input',{type:'text',value:u.apellidos||''}),
    year:h('select',{}, BIO.niveles.map(n => { const o = h('option',{value:n.id}, n.n); if (+n.id === +u.year) o.selected = true; return o; })),
    paralelo:h('input',{type:'text',value:/^[A-Z]{1,2}$/.test(String(u.paralelo||''))?u.paralelo:'',maxlength:'2',placeholder:'A',style:'text-transform:uppercase'}),
    rep:h('input',{type:'text',value:u.rep||'',placeholder:'correo o nombre del representante'}), tel:h('input',{type:'tel',value:u.tel||'',placeholder:'0991234567'}) };
  const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
  const guardar = h('button',{class:'btn primary sm'},'Guardar cambios');
  guardar.onclick = async () => { guardar.disabled = true;
    const r = await Users.editar(u.codigo, { nombres:f.nombres.value, apellidos:f.apellidos.value, year:f.year.value, paralelo:f.paralelo.value, rep:f.rep.value, tel:f.tel.value });
    guardar.disabled = false; if (!r.ok){ msg.textContent = r.msg; return; }
    closeModal(); toast('Datos actualizados.'); despues && despues(); };
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Editar estudiante'), h('h3',{},u.nombre),
    h('p',{class:'small muted'}, 'Código y usuario: ', h('b',{class:'mono'},u.email), '. El código no se cambia porque es el usuario; si está mal, elimina el registro y vuelve a cargarlo.'),
    h('div',{class:'adm-form'}, h('label',{},'Apellidos', f.apellidos), h('label',{},'Nombres', f.nombres), h('label',{},'Año', f.year), h('label',{},'Paralelo', f.paralelo),
      h('label',{},'Representante', f.rep), h('label',{},'Teléfono', f.tel)),
    msg, h('div',{class:'row'}, guardar, h('button',{class:'btn sm ghost',onclick:closeModal},'Cancelar'))));
  f.apellidos.focus();
}
function moverModal(codigos, despues){
  const year = h('select',{'aria-label':'Año'}, h('option',{value:''},'Mantener el año'), BIO.niveles.map(n => h('option',{value:n.id}, n.n)));
  const par = h('input',{type:'text',maxlength:'2',placeholder:'Mantener','aria-label':'Paralelo',style:'text-transform:uppercase'});
  const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
  const ok = h('button',{class:'btn primary sm'},'Aplicar a '+codigos.length);
  ok.onclick = async () => { const y = year.value ? +year.value : null, p = par.value.trim().toUpperCase() || null;
    if (!y && !p){ msg.textContent = 'Elige un año o escribe un paralelo.'; return; }
    if (p && !/^[A-Z]{1,2}$/.test(p)){ msg.textContent = 'El paralelo debe ser una letra, por ejemplo A.'; return; }
    ok.disabled = true; ok.textContent = 'Aplicando…';
    const r = await Users.mover(codigos, { year:y, paralelo:p });
    closeModal(); toast(`${r.ok} estudiante(s) actualizados` + (r.errores.length ? ` · ${r.errores.length} con error: ${r.errores[0]}` : '.')); despues && despues(); };
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Cambiar en bloque'), h('h3',{},`${codigos.length} estudiante(s)`),
    h('p',{class:'small muted'},'Útil para corregir una carga: por ejemplo, poner paralelo A a todo un curso. Lo que dejes vacío no cambia.'),
    h('div',{class:'adm-form'}, h('label',{},'Año', year), h('label',{},'Paralelo', par)), msg,
    h('div',{class:'row'}, ok, h('button',{class:'btn sm ghost',onclick:closeModal},'Cancelar'))));
}
function eliminarModal(codigos, despues){
  const us = codigos.map(c => Users.get(c)).filter(Boolean); if (!us.length) return;
  const uno = us.length === 1;
  confirmar({ peligro:true, boton: uno ? 'Enviar a la papelera' : `Enviar ${us.length} a la papelera`, escribir: uno ? null : 'ELIMINAR',
    titulo: uno ? `¿Eliminar a ${us[0].nombre}?` : `¿Eliminar ${us.length} estudiantes?`,
    texto: (uno ? `La cuenta ${us[0].email} va` : `Las ${us.length} cuentas van`) + ' a la papelera: dejan de entrar y de verse, pero sus notas se conservan y se pueden restaurar durante 30 días desde Administración → Papelera. Pasado ese plazo se eliminan definitivamente. Si solo hay un dato mal, usa Editar.',
    accion: async () => { const r = await Users.eliminarVarios(us.map(u=>u.codigo));
      toast(`${r.ok} enviado(s) a la papelera` + (r.errores.length ? ` · ${r.errores.length} con error: ${r.errores[0]}` : '.')); despues && despues(); } });
}
function editarDocModal(d, despues){
  const nom = h('input',{type:'text',value:d.nombres||''}), ape = h('input',{type:'text',value:d.apellidos||''});
  const prog = h('select',{}, Object.values(BIO.programas).map(p => { const o = h('option',{value:p.id},'Docente de '+p.n); if (p.id===d.prog) o.selected = true; return o; }));
  const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
  const ok = h('button',{class:'btn primary sm'},'Guardar cambios');
  ok.onclick = async () => { const r = await Admin.editarDocente(d.id, { nombres:nom.value, apellidos:ape.value, prog:prog.value });
    if (!r.ok){ msg.textContent = r.msg; return; } closeModal(); toast('Docente actualizado.'); despues && despues(); };
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Editar docente'), h('h3',{},d.nombre),
    h('p',{class:'small muted'},'El correo se cambia con "Corregir correo". Si cambias la asignatura, se le quitan los cursos de la anterior.'),
    h('div',{class:'adm-form'}, h('label',{},'Nombres', nom), h('label',{},'Apellidos', ape), h('label',{},'Asignatura', prog)), msg,
    h('div',{class:'row'}, ok, h('button',{class:'btn sm ghost',onclick:closeModal},'Cancelar'))));
}

/* ---------- Docentes ---------- */
function admDocentes(body, rerender){
  const nom = h('input',{type:'text',placeholder:'Nombres','aria-label':'Nombres'});
  const ape = h('input',{type:'text',placeholder:'Apellidos','aria-label':'Apellidos'});
  const prog = h('select',{'aria-label':'Asignatura'}, Object.values(BIO.programas).map(p=>h('option',{value:p.id},'Docente de '+p.n)));
  const mail = h('input',{type:'email',placeholder:`jheredia@${DOMINIO_DOC}`,'aria-label':'Correo institucional del docente'});
  let mailEditado = false; mail.addEventListener('input', ()=>{ mailEditado = mail.value.trim().length > 0; });
  const vista = h('span',{class:'small muted'},'El correo se sugiere con la convención institucional (inicial + apellido) y puedes corregirlo: a ese correo se envían las credenciales.');
  const actualizar = () => { if (!mailEditado) mail.value = (nom.value||ape.value) ? Admin.emailDocente(nom.value, ape.value) : ''; };
  nom.addEventListener('input', actualizar); ape.addEventListener('input', actualizar);
  body.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Crear una cuenta docente'),
    h('p',{class:'small muted'},'Puede haber tantos docentes como haga falta en cada asignatura. Cada docente entra únicamente a su entorno y a los cursos que se le asignen; no administra usuarios.'),
    h('div',{class:'adm-form'}, h('label',{},'Nombres', nom), h('label',{},'Apellidos', ape), h('label',{},'Correo institucional', mail), h('label',{},'Asignatura', prog),
      h('button',{class:'btn primary',onclick:async function(){ if (!nom.value.trim() || !ape.value.trim()) return toast('Escribe nombres y apellidos.');
        const v = Admin.validarEmail(mail.value); if (!v.ok) return toast(v.msg);
        this.disabled = true; const d = await Admin.crearDocente({nombres:nom.value, apellidos:ape.value, prog:prog.value, cursos:[], email:v.email});
        this.disabled = false; toast(`Cuenta creada: ${d.email}`); credDocenteModal(d, rerender); rerender(); }},'Crear docente')),
    vista));
  const ds = Admin.docentes();
  if (!ds.length){ body.append(h('div',{class:'ph',style:'margin-top:16px'}, h('b',{},'Todavía no hay docentes. '),'Crea la primera cuenta arriba. Recuerda: el docente no administra la plataforma, solo su asignatura y sus cursos.')); return; }
  const cursos = Admin.cursos();
  const tbl = h('table',{class:'data'}, h('thead',{},h('tr',{},h('th',{},'Docente'),h('th',{},'Asignatura'),h('th',{},'Usuario'),h('th',{},'Cursos asignados'),h('th',{},'Estado'),h('th',{},''))),
    h('tbody',{}, ds.map(d => h('tr',{},
      h('td',{}, h('b',{},d.nombre)),
      h('td',{}, progPill(d.prog)),
      h('td',{class:'mono small'},d.email),
      h('td',{}, cursos.filter(c=>c.prog===d.prog).length
        ? h('div',{class:'row',style:'gap:4px;flex-wrap:wrap'}, cursos.filter(c=>c.prog===d.prog).map(c => {
            const on = (d.cursos||[]).includes(c.id);
            return h('button',{class:'chip'+(on?' picked':''),onclick:()=>{ Admin.asignar(d.id, c.id, !on); rerender(); }}, `${BIO.nivel(c.nivel).corto} ${c.paralelo}`); }))
        : h('span',{class:'small muted'},'Sin cursos de esta asignatura')),
      h('td',{}, d.entregada?h('span',{class:'pill ok'},'Entregada'):h('span',{class:'pill warn'},'Por entregar'),
        d.ultimoAcceso ? h('div',{class:'small muted'},'Ingresó '+timeAgo(d.ultimoAcceso)) : h('div',{class:'small muted'},'Sin ingresar')),
      h('td',{style:'white-space:nowrap'}, h('div',{class:'row',style:'gap:6px;flex-wrap:nowrap'},
        h('button',{class:'btn sm ghost',onclick:()=>editarDocModal(d, rerender)},'Editar'),
        h('button',{class:'btn sm ghost',onclick:()=>credDocenteModal(d, rerender)},'Credenciales'),
        h('button',{class:'btn sm ghost',onclick:()=>{ const inp = h('input',{type:'email',value:d.email,'aria-label':'Correo'});
          openModal(h('div',{class:'stack'}, h('h3',{},'Corregir el correo de '+d.nombre), inp, h('div',{class:'row'},
            h('button',{class:'btn primary sm',onclick:async()=>{ const v = Admin.validarEmail(inp.value, d.id); if (!v.ok) return toast(v.msg);
              if (Cloud.on){ try { await Cloud.cambiarCorreo(d.id, v.email); } catch(e){ return toast('El servidor no aceptó el cambio: '+e.message); } }
              d.email = v.email; Store.save(); closeModal(); rerender(); toast('Correo actualizado.'); }},'Guardar'),
            h('button',{class:'btn sm ghost',onclick:closeModal},'Cancelar')))); }},'Corregir correo'),
        h('button',{class:'btn sm ghost',onclick:async()=>{ await Admin.resetDocente(d.id); rerender(); toast('Contraseña restablecida.'); }},'Restablecer'),
        h('button',{class:'btn sm ghost danger-text',onclick:()=>confirmar({ peligro:true, titulo:`¿Eliminar la cuenta de ${d.nombre}?`, texto:`${d.email} deja de poder entrar y sus cursos quedan sin docente asignado. Va a la papelera: se puede restaurar durante 30 días (recupera sus cursos si siguen libres). Las notas de los estudiantes se conservan.`, boton:'Enviar a la papelera', accion: async()=>{ await Admin.borrarDocente(d.id); rerender(); toast('Docente enviado a la papelera.'); } })},'Eliminar')))))));
  body.append(h('div',{class:'tablewrap',style:'margin-top:16px'}, tbl));
  body.append(h('p',{class:'small muted',style:'margin-top:10px'},'El docente de Ciencias Naturales solo ve 8.º, 9.º y 10.º de EGB; el de Biología solo ve Bachillerato. Ninguno puede crear usuarios ni cursos.'));
}
function credDocenteModal(d, rerender){
  const marca = d.prog==='cn' ? 'ANAI Ciencias' : 'ANAI BioLab';
  const txt = `Estimado/a ${d.nombres}, estas son sus credenciales de ${marca} (${BIO.programas[d.prog].n} · ${BIO.programas[d.prog].sub}):\n\nUsuario: ${d.email}\nContraseña temporal: ${d.temp || '(ya la cambió)'}\n\nAl ingresar por primera vez el sistema le pedirá crear su propia contraseña.`;
  const ta = h('textarea',{style:'min-height:130px'}, txt);
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Credenciales de docente'), h('h3',{},d.nombre),
    h('div',{class:'cred-box'}, h('div',{}, h('span',{class:'small muted'},'Usuario'), h('b',{class:'mono'},d.email)), h('div',{}, h('span',{class:'small muted'},'Contraseña temporal'), h('b',{class:'mono'},d.temp||'—'))),
    ta,
    h('div',{class:'row'}, h('a',{class:'btn primary sm',href:`mailto:${d.email}?subject=${encodeURIComponent('Acceso a ANAI BioLab')}&body=${encodeURIComponent(txt)}`,onclick:()=>{ d.entregada=true; Store.save(); }},'Enviar por correo'),
      h('button',{class:'btn sm',onclick:()=>{ copiarTexto(ta.value); d.entregada=true; Store.save(); rerender && rerender(); }},'Copiar'),
      h('button',{class:'btn sm ghost',onclick:closeModal},'Cerrar'))));
}

/* ---------- Credenciales ---------- */
function admCredenciales(body){
  const est = Users.all(), doc = Admin.docentes();
  body.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Crear las cuentas institucionales reales'),
    h('p',{class:'small'},'Estos archivos se entregan a TIC: crean las cuentas de verdad en el dominio institucional, sin retipear nada. La plataforma nunca guarda esas contraseñas.'),
    h('div',{class:'row',style:'gap:8px;flex-wrap:wrap'},
      h('button',{class:'btn primary sm',onclick:()=>descargarTexto('usuarios-google-workspace.csv', Users.csvGoogle(est))},'CSV para Google Workspace'),
      h('button',{class:'btn sm',onclick:()=>descargarTexto('usuarios-microsoft365.csv', Users.csvMicrosoft(est))},'CSV para Microsoft 365'),
      h('button',{class:'btn sm',onclick:()=>descargarTexto('credenciales-estudiantes.csv', Users.csvCredenciales(est))},'Credenciales de estudiantes'),
      h('button',{class:'btn sm',onclick:()=>{ const l = ['Nombres,Apellidos,Usuario,Contrasena temporal,Asignatura'];
        doc.forEach(d => l.push([d.nombres, d.apellidos, d.email, d.temp||'', BIO.programas[d.prog].n].join(','))); descargarTexto('credenciales-docentes.csv', l.join('\n')); }},'Credenciales de docentes'))));
  const porCurso = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Fichas para imprimir por curso'));
  const cursos = Admin.cursos().filter(c => Admin.estudiantesDe(c).length);
  if (!cursos.length) porCurso.append(h('p',{class:'small muted'},'Aún no hay cursos con estudiantes cargados.'));
  cursos.forEach(c => porCurso.append(h('div',{class:'act'},
    h('span',{class:'ico',style:'background:var(--bg-3)'},'🖨'),
    h('span',{}, h('div',{class:'t'},`${BIO.nivel(c.nivel).corto} "${c.paralelo}" · ${BIO.programas[c.prog].n}`), h('div',{class:'d'},`${Admin.estudiantesDe(c).length} estudiantes`)),
    h('a',{class:'btn sm',style:'margin-left:auto',href:`#/docente/credenciales/${c.nivel}/${c.paralelo}`},'Abrir fichas'))));
  body.append(porCurso);
}

/* ---------- Ajustes ---------- */
function admAjustes(body, rerender){
  body.append(Cloud.on
    ? h('div',{class:'notice ok'}, h('span',{}, h('b',{},'Modo servidor activo. '), `Conectado a ${Cloud.url}. Cursos, usuarios, docentes, notas y progreso se guardan en la base de datos y se ven desde cualquier computador.`))
    : h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Modo local (demostración). '), 'Todo se guarda en este navegador. Para producción, configura config.js con los datos del proyecto de Supabase (ver guía).')));
  const anio = h('input',{type:'text',value:Admin.s.anio,'aria-label':'Año lectivo'});
  const pass = h('input',{type:'text',value:Store.s.adminPass || 'AnaiAdmin2026','aria-label':'Contraseña de administración'});
  body.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Institución'),
    h('div',{class:'adm-form'},
      h('label',{},'Año lectivo', anio),
      h('label',{},'Dominio de estudiantes', h('input',{type:'text',value:DOMINIO_EST,disabled:true})),
      h('label',{},'Dominio de docentes', h('input',{type:'text',value:DOMINIO_DOC,disabled:true})),
      h('button',{class:'btn sm',onclick:()=>{ Admin.s.anio = anio.value.trim() || Admin.s.anio; Store.save(); if (Cloud.on) Cloud.guardarAnio(Admin.s.anio).catch(e=>toast('No se guardó en el servidor: '+e.message)); toast('Año lectivo actualizado.'); rerender(); }},'Guardar')),
    h('p',{class:'small muted'},'Los dominios se fijan en el código de la plataforma para evitar errores de tipeo; cámbialos solo junto con TIC.')));
  if (!Cloud.on) body.append(h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Acceso de administración'),
    h('div',{class:'adm-form'}, h('label',{},'Usuario', h('input',{type:'text',value:ADMIN_EMAIL,disabled:true})), h('label',{},'Contraseña', pass),
      h('button',{class:'btn sm',onclick:()=>{ if (pass.value.trim().length<8) return toast('Usa al menos 8 caracteres.'); Store.s.adminPass = pass.value.trim(); Store.save(); toast('Contraseña de administración actualizada.'); }},'Cambiar'))));
  body.append(h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Datos y respaldo'),
    h('div',{class:'row',style:'gap:8px;flex-wrap:wrap'},
      h('button',{class:'btn sm',onclick:()=>descargarTexto('respaldo-anai-biolab.json', Admin.respaldo(), 'application/json')},'Descargar respaldo'),
      h('button',{class:'btn sm',onclick:()=>{ const ta = h('textarea',{style:'min-height:200px',placeholder:'Pega aquí el contenido del respaldo…'});
        openModal(h('div',{class:'stack'}, h('h3',{},'Restaurar respaldo'), ta, h('div',{class:'row'},
          h('button',{class:'btn primary sm',onclick:()=>{ if (Admin.restaurar(ta.value)){ closeModal(); rerender(); toast('Respaldo restaurado.'); } else toast('El archivo no es válido.'); }},'Restaurar'),
          h('button',{class:'btn sm ghost',onclick:closeModal},'Cancelar')))); }},'Restaurar respaldo'),
      Cloud.on ? h('button',{class:'btn sm',onclick:async()=>{ try { await Cloud.pull(); toast('Datos actualizados desde el servidor.'); rerender(); } catch(e){ toast(e.message); } }},'Actualizar desde el servidor') : h('button',{class:'btn sm',onclick:async()=>{ await admDemo(); rerender(); }},'Cargar datos de ejemplo'),
      Cloud.on ? null : h('button',{class:'btn sm ghost',onclick:()=>{ if (confirm('¿Borrar cursos, docentes y usuarios cargados? El progreso de demostración no se toca.')){ Admin.s.cursos = []; Store.s.docentes = {}; Users.borrarTodo(); rerender(); toast('Datos borrados.'); } }},'Borrar todo')),
    h('p',{class:'small muted'},'En esta versión de demostración todo se guarda en este navegador. Con el servidor de la fase 2, cursos, usuarios y calificaciones se sincronizan entre dispositivos y el respaldo deja de ser necesario.')));
}
/* datos de ejemplo: dos cursos por entorno con estudiantes y docentes */
async function admDemo(){
  const base = [ {prog:'cn', nivel:8, par:'A'}, {prog:'cn', nivel:9, par:'A'}, {prog:'bio', nivel:2, par:'A'} ];
  for (const b of base){ if (!Admin.cursoDe(b.nivel,b.par)) Admin.crearCurso({prog:b.prog, nivel:b.nivel, paralelo:b.par}); }
  const d1 = Admin.docentes().find(d=>d.prog==='cn') || await Admin.crearDocente({nombres:'Paola', apellidos:'Villacís', prog:'cn', cursos:[]});
  const d2 = Admin.docentes().find(d=>d.prog==='bio') || await Admin.crearDocente({nombres:'Jonathan', apellidos:'Heredia', prog:'bio', cursos:[], email:'jheredia@'+DOMINIO_DOC});
  Admin.cursos().filter(c=>c.prog==='cn').forEach(c => Admin.asignar(d1.id, c.id, true));
  Admin.cursos().filter(c=>c.prog==='bio').forEach(c => Admin.asignar(d2.id, c.id, true));
  const filas = [];
  const nombres = [['Andrade Mora','Mateo Sebastián'],['Cobo Vera','Valentina Isabel'],['Ríos Salas','Sebastián Andrés'],['Ortiz Palacios','Camila Doménica'],['Paredes Jaramillo','Nicolás'],['Mora Cedeño','Isabella'],['Vaca Espinoza','Emilio José'],['Salas Noboa','Doménica']];
  let cod = 215440;
  Admin.cursos().forEach(c => nombres.forEach(([ap,no]) => filas.push({ codigo:String(cod++), nombres:no, apellidos:ap, nombre:`${ap} ${no}`, year:c.nivel, paralelo:c.paralelo, rep:'', tel:'' })));
  await Users.importar(filas);
  toast('Datos de ejemplo cargados: 3 cursos, 2 docentes y 24 estudiantes.');
}
</script>
