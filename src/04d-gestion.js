<script>
/* =====================================================================
   GESTIÓN INSTITUCIONAL (v1.8) · núcleo compartido
   ---------------------------------------------------------------------
   · Inst: ajustes de la institución (calendario por quimestres,
     ponderación de la libreta y datos del aviso de privacidad).
   · Auditoria: registro de acciones. Con servidor, los cambios en tablas
     los registra la base de datos sola (disparadores); aquí solo se
     anotan acciones con nombre propio (exportar libreta, descargar datos…).
     En modo local todo queda en este navegador.
   · Roles: autoridad (solo lectura de toda la institución) y DECE (NEE).
   · Registros de pestañas para que cada módulo sume las suyas a la
     consola de administración y al panel docente sin tocar esos archivos.
   ===================================================================== */
const ROLES = {
  admin:{ n:'Administración', em:'🛠️' }, docente:{ n:'Docente', em:'🧑‍🏫' }, estudiante:{ n:'Estudiante', em:'🎒' },
  familia:{ n:'Representante', em:'👨‍👩‍👧' }, autoridad:{ n:'Autoridad', em:'🏛️', d:'Rectorado, vicerrectorado o coordinación: ve toda la institución, sin modificar nada.' },
  dece:{ n:'DECE', em:'🤝', d:'Departamento de Consejería Estudiantil: registra las adaptaciones de estudiantes con NEE.' }
};
const esRol = (...r) => r.includes(Store.ses.rol);
/* solo lectura en el panel docente: autoridades y DECE ven notas pero no las cambian */
const soloLectura = () => esRol('autoridad','dece');

/* ---------- ajustes de la institución ---------- */
const ANIO_DEF = (() => { const d = new Date(), y = d.getFullYear(); return d.getMonth() >= 7 ? `${y}-${y+1}` : `${y-1}-${y}`; })();
const Inst = {
  get s(){ const i = Store.s.inst = Store.s.inst || {}; return i; },
  anio(){ return String((Store.s.admin && Store.s.admin.anio) || ANIO_DEF).replace('–','-'); },
  calendario(){
    const c = this.s.calendario;
    if (c && Array.isArray(c.quimestres) && c.quimestres.length) return c;
    const [y0] = this.anio().split('-').map(Number); const y = y0 || new Date().getFullYear();
    return { anio:this.anio(), quimestres:[
      { id:'Q1', n:'Primer quimestre', inicio:`${y}-09-01`, fin:`${y+1}-01-29`, cerrado:false },
      { id:'Q2', n:'Segundo quimestre', inicio:`${y+1}-02-01`, fin:`${y+1}-06-30`, cerrado:false } ] };
  },
  ponderacion(){ const p = this.s.ponderacion; return (p && p.categorias) ? p : { modo:'actividad', categorias:{ exploracion:25, laboratorios:35, misiones:20, evaluaciones:20 } }; },
  privacidad(){ return Object.assign({ responsable:BIO.school.institucion || 'ANAI Online', correo:'', version:'1.0' }, this.s.privacidad || {}); },
  async guardar(clave, valor){
    this.s[clave] = valor; Store.save();
    if (Cloud.on) await Cloud.guardarAjuste(clave, valor);
    Auditoria.local('ajuste_'+clave, {});
  }
};

/* ---------- auditoría ---------- */
const Auditoria = {
  /* acción con nombre propio: en servidor va a la tabla auditoria; en local, a este navegador */
  async registrar(accion, detalle={}){
    if (Cloud.on) return Cloud.auditar(accion, detalle);
    this.local(accion, detalle);
  },
  /* en modo local también se anotan los cambios de datos (con servidor los anota la base de datos) */
  local(accion, detalle={}, extra={}){
    if (Cloud.on) return;
    const L = Store.s.auditoriaLocal = Store.s.auditoriaLocal || [];
    L.unshift(Object.assign({ id:L.length ? L[0].id + 1 : 1, fecha:new Date().toISOString(), actor:Store.s.user.id, actor_rol:Store.ses.rol, actor_nombre:Store.s.user.nombre, accion, tabla:null, registro:null, detalle }, extra));
    if (L.length > 3000) L.length = 3000;
    Store.save();
  },
  async lista(){ return Cloud.on ? await Cloud.auditoria() : (Store.s.auditoriaLocal || []).slice(); }
};

/* ---------- personal: DECE y autoridades (los docentes siguen en Admin) ---------- */
const Personal = {
  todos(){ return Object.values(Store.s.personal || {}); },
  de(rol){ return this.todos().filter(p => p.rol === rol); },
  async crear({ nombres, apellidos, email, rol, cargo }){
    if (!['dece','autoridad'].includes(rol)) return { ok:false, msg:'Rol no válido.' };
    const P = Store.s.personal = Store.s.personal || {};
    const base = { nombres:capital(nombres), apellidos:capital(apellidos), nombre:(capital(nombres)+' '+capital(apellidos)).trim(), rol, cargo:String(cargo||'').trim(), cambiar:true, entregada:false, creado:Date.now(), ultimoAcceso:null };
    if (Cloud.on){ const r = await Cloud.crearPersonal({ nombres:base.nombres, apellidos:base.apellidos, email, rol, cargo:base.cargo });
      P[r.id] = Object.assign({ id:r.id, email:r.email, temp:r.temp, hash:null }, base); Store.save(); return { ok:true, p:P[r.id] }; }
    const pass = generarPass(), id = rol[0]+Date.now().toString(36);
    P[id] = Object.assign({ id, email:String(email).trim().toLowerCase(), temp:pass, hash:await hashPass(pass) }, base);
    Store.save(); Auditoria.local('crear_'+rol, { email:P[id].email }); return { ok:true, p:P[id] };
  },
  async resetear(id){ const p = (Store.s.personal||{})[id]; if (!p) return null;
    if (Cloud.on){ const t = await Cloud.resetPassword(id); Object.assign(p, { temp:t, cambiar:true, entregada:false }); Store.save(); return t; }
    const t = generarPass(); Object.assign(p, { temp:t, hash:await hashPass(t), cambiar:true, entregada:false }); Store.save(); return t; }
};

/* ---------- papelera (eliminar con posibilidad de restaurar durante 30 días) ---------- */
const DIAS_PAPELERA = 30;
const Papelera = {
  get s(){ const p = Store.s.papelera = Store.s.papelera || {}; p.usuarios = p.usuarios || {}; p.docentes = p.docentes || {}; p.personal = p.personal || {}; p.cursos = p.cursos || []; return p; },
  diasRestantes(ts){ return Math.max(0, DIAS_PAPELERA - Math.floor((Date.now() - ts) / 86400000)); },
  total(){ const p = this.s; return Object.keys(p.usuarios).length + Object.keys(p.docentes).length + Object.keys(p.personal).length + p.cursos.length; },
  /* estudiantes */
  async estudiante(codigo){
    const u = Users.get(codigo); if (!u) return { ok:false, msg:'No existe ese estudiante.' };
    if (Cloud.on && u.uid){ try { await Cloud.aPapelera(u.uid); } catch(e){ return { ok:false, msg:'El servidor no lo movió a la papelera: '+e.message }; } }
    u.eliminado = Date.now(); this.s.usuarios[codigo] = u; delete Store.s.usuarios[codigo];
    Store.save(); Auditoria.local('enviar_a_papelera', { codigo, nombre:u.nombre }, { tabla:'perfiles', registro:codigo }); return { ok:true };
  },
  async restaurarEstudiante(codigo){
    const u = this.s.usuarios[codigo]; if (!u) return { ok:false, msg:'No está en la papelera.' };
    if (Cloud.on && u.uid){ try { await Cloud.restaurarUsuario(u.uid); } catch(e){ return { ok:false, msg:'El servidor no lo restauró: '+e.message }; } }
    delete u.eliminado; Store.s.usuarios[codigo] = u; delete this.s.usuarios[codigo];
    Store.save(); Auditoria.local('restaurar_de_papelera', { codigo, nombre:u.nombre }, { tabla:'perfiles', registro:codigo }); return { ok:true };
  },
  async borrarEstudiante(codigo){
    const u = this.s.usuarios[codigo]; if (!u) return { ok:false, msg:'No está en la papelera.' };
    if (Cloud.on && u.uid){ try { await Cloud.borrarUsuario(u.uid); } catch(e){ return { ok:false, msg:'El servidor no lo eliminó: '+e.message }; } }
    delete this.s.usuarios[codigo]; if (Store.s.docente){ delete (Store.s.docente.notas||{})[codigo]; delete (Store.s.docente.adapt||{})[codigo]; } if (Store.s.nee) delete Store.s.nee[codigo];
    Store.save(); Auditoria.local('eliminar_definitivamente', { codigo, nombre:u.nombre }, { tabla:'perfiles', registro:codigo }); return { ok:true };
  },
  /* docentes y personal */
  async cuenta(id){
    const d = (Store.s.docentes||{})[id] || (Store.s.personal||{})[id]; if (!d) return { ok:false, msg:'No existe esa cuenta.' };
    const esDoc = !!(Store.s.docentes||{})[id];
    if (Cloud.on){ try { await Cloud.aPapelera(id); } catch(e){ return { ok:false, msg:'El servidor no la movió a la papelera: '+e.message }; } }
    d.eliminado = Date.now(); d.cursosAntes = esDoc ? (typeof Admin !== 'undefined' ? Admin.cursosDeDocente(id).map(c => c.id) : []) : [];
    if (esDoc){ this.s.docentes[id] = d; delete Store.s.docentes[id]; if (typeof Admin !== 'undefined') Admin.cursos().forEach(c => { if (c.docenteId === id){ c.docenteId = null; if (Cloud.on) Cloud.asignarCurso(c.id, null).catch(()=>{}); } }); }
    else { this.s.personal[id] = d; delete Store.s.personal[id]; }
    Store.save(); Auditoria.local('enviar_a_papelera', { email:d.email, nombre:d.nombre }, { tabla:'perfiles', registro:id }); return { ok:true };
  },
  async restaurarCuenta(id){
    const esDoc = !!this.s.docentes[id], d = this.s.docentes[id] || this.s.personal[id]; if (!d) return { ok:false, msg:'No está en la papelera.' };
    if (Cloud.on){ try { await Cloud.restaurarUsuario(id); } catch(e){ return { ok:false, msg:'El servidor no la restauró: '+e.message }; } }
    delete d.eliminado;
    if (esDoc){ Store.s.docentes = Store.s.docentes || {}; Store.s.docentes[id] = d; delete this.s.docentes[id]; d.cursos = [];
      (d.cursosAntes||[]).forEach(cid => { const c = typeof Admin !== 'undefined' && Admin.curso(cid); if (c && !c.docenteId) Admin.asignar(id, cid, true); }); }
    else { Store.s.personal = Store.s.personal || {}; Store.s.personal[id] = d; delete this.s.personal[id]; }
    delete d.cursosAntes; Store.save(); Auditoria.local('restaurar_de_papelera', { email:d.email }, { tabla:'perfiles', registro:id }); return { ok:true };
  },
  async borrarCuenta(id){
    const d = this.s.docentes[id] || this.s.personal[id]; if (!d) return { ok:false, msg:'No está en la papelera.' };
    if (Cloud.on){ try { await Cloud.borrarUsuario(id); } catch(e){ return { ok:false, msg:'El servidor no la eliminó: '+e.message }; } }
    delete this.s.docentes[id]; delete this.s.personal[id]; Store.save(); Auditoria.local('eliminar_definitivamente', { email:d.email }, { tabla:'perfiles', registro:id }); return { ok:true };
  },
  /* cursos */
  async curso(id){
    const c = typeof Admin !== 'undefined' && Admin.curso(id); if (!c) return { ok:false, msg:'No existe ese curso.' };
    if (Cloud.on){ try { await Cloud.cursoAPapelera(id); } catch(e){ return { ok:false, msg:'El servidor no lo movió: '+e.message }; } }
    c.eliminado = Date.now(); this.s.cursos.push(c); Admin.s.cursos = Admin.cursos().filter(x => x.id !== id);
    Object.values(Store.s.docentes||{}).forEach(d => { d.cursos = (d.cursos||[]).filter(x => x !== id); });
    Store.save(); Auditoria.local('enviar_a_papelera', { curso:`${c.nivel} ${c.paralelo}` }, { tabla:'cursos', registro:id }); return { ok:true };
  },
  async restaurarCurso(id){
    const c = this.s.cursos.find(x => x.id === id); if (!c) return { ok:false, msg:'No está en la papelera.' };
    if (Admin.cursoDe(c.nivel, c.paralelo)) return { ok:false, msg:`Ya existe otro curso ${BIO.nivel(c.nivel).corto} ${c.paralelo}. Elimínalo o cámbiale el paralelo antes de restaurar este.` };
    if (Cloud.on){ try { await Cloud.restaurarCurso(id); } catch(e){ return { ok:false, msg:'El servidor no lo restauró: '+e.message }; } }
    delete c.eliminado; this.s.cursos = this.s.cursos.filter(x => x.id !== id); Admin.cursos().push(c);
    if (c.docenteId){ const d = (Store.s.docentes||{})[c.docenteId]; if (d && !(d.cursos||[]).includes(id)) (d.cursos = d.cursos || []).push(id); }
    Store.save(); Auditoria.local('restaurar_de_papelera', { curso:`${c.nivel} ${c.paralelo}` }, { tabla:'cursos', registro:id }); return { ok:true };
  },
  async borrarCurso(id){
    const c = this.s.cursos.find(x => x.id === id); if (!c) return { ok:false, msg:'No está en la papelera.' };
    if (Cloud.on){ try { await Cloud.borrarCurso(id); } catch(e){ return { ok:false, msg:'El servidor no lo eliminó: '+e.message }; } }
    this.s.cursos = this.s.cursos.filter(x => x.id !== id); Store.save(); Auditoria.local('eliminar_definitivamente', { curso:`${c.nivel} ${c.paralelo}` }, { tabla:'cursos', registro:id }); return { ok:true };
  },
  /* lo que lleva más de 30 días se elimina de verdad (lo hace la administración al abrir la papelera) */
  async vaciarVencidos(){
    const lim = Date.now() - DIAS_PAPELERA*86400000; let n = 0;
    if (Cloud.on){ try { const r = await Cloud.purgarVencidos(); n = (r.cuentas||0) + (r.cursos||0); } catch(e){ console.warn('papelera', e.message); return 0; }
      const p = this.s; Object.keys(p.usuarios).forEach(k => { if (p.usuarios[k].eliminado < lim) delete p.usuarios[k]; });
      ['docentes','personal'].forEach(g => Object.keys(p[g]).forEach(k => { if (p[g][k].eliminado < lim) delete p[g][k]; }));
      p.cursos = p.cursos.filter(c => c.eliminado >= lim); Store.save(); return n; }
    const p = this.s;
    for (const k of Object.keys(p.usuarios)) if (p.usuarios[k].eliminado < lim){ await this.borrarEstudiante(k); n++; }
    for (const g of ['docentes','personal']) for (const k of Object.keys(p[g])) if (p[g][k].eliminado < lim){ await this.borrarCuenta(k); n++; }
    for (const c of p.cursos.slice()) if (c.eliminado < lim){ await this.borrarCurso(c.id); n++; }
    return n;
  }
};

/* ---------- registros de pestañas (los módulos suman las suyas) ----------
   ADM_TABS_EXTRA.push({ id, t, fn(body, rerender), antes:'ajustes' })
   DOC_TABS_EXTRA.push({ id, t, fn(body, rerender), roles:['docente','admin'] }) */
const ADM_TABS_EXTRA = [];
const DOC_TABS_EXTRA = [];

/* ---------- aviso de la migración pendiente ---------- */
const AVISO_V18 = 'El servidor todavía no tiene las tablas de la versión 1.8. La administración debe ejecutar una sola vez el archivo backend/supabase/migracion-v1.8-gestion.sql en Supabase (SQL Editor).';
function avisoV18(){ return (Cloud.on && Cloud.sinV18) ? h('div',{class:'notice warn'}, h('span',{}, AVISO_V18)) : null; }

/* ---------- utilidades compartidas ---------- */
const fechaCorta = ms => ms ? new Date(ms).toLocaleDateString('es-EC', { day:'2-digit', month:'short', year:'numeric' }) : '—';
const fechaHora = ms => ms ? new Date(ms).toLocaleString('es-EC', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—';
/* código legible sin letras que se confunden (sin 0/O, 1/I/L) */
function codigoLegible(n=4){ const A = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; const r = new Uint32Array(n); (window.crypto||{}).getRandomValues ? crypto.getRandomValues(r) : r.forEach((_,i)=>r[i]=Math.random()*1e9); return [...r].map(x => A[x % A.length]).join(''); }
</script>
