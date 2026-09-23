<script>
/* =====================================================================
   MODO SERVIDOR (Supabase): inicio de sesión real, cursos, usuarios,
   docentes, notas y progreso sincronizados entre dispositivos.
   Si no hay configuración (window.ANAI_CONFIG vacío) todo sigue en modo local.
   Estrategia: caché de paso. Al iniciar sesión se descargan los datos a
   Store.s (usuarios, docentes, cursos, notas) y cada cambio se escribe en
   el servidor y en la caché, de modo que las vistas existentes no cambian.
   ===================================================================== */
const Cloud = {
  cfg: (typeof window !== 'undefined' && window.ANAI_CONFIG) || {},
  get on(){ return !!(this.cfg.supabaseUrl && this.cfg.supabaseAnonKey); },
  get url(){ return String(this.cfg.supabaseUrl||'').replace(/\/$/,''); },
  ses: null,                       // { access_token, refresh_token, uid, email, exp }
  perfil: null,
  KEY: 'anai-cloud-session',
  init(){ try { this.ses = JSON.parse(localStorage.getItem(this.KEY) || 'null'); } catch(e){ this.ses = null; }
    /* Todas las pestañas comparten la misma sesión: si una la renueva, las demás adoptan la nueva al instante. */
    try { window.addEventListener('storage', e => { if (e.key === this.KEY){ try { const s = JSON.parse(e.newValue || 'null'); if (s) { this.ses = s; this.caida = false; } } catch(_){} } }); } catch(e){}
    try { window.addEventListener('online', () => this.enviarPendientes()); document.addEventListener('visibilitychange', () => { if (!document.hidden) this.enviarPendientes(); }); } catch(e){}
  },
  /* adopta la sesión guardada si otra pestaña la renovó */
  sync(){ try { const s = JSON.parse(localStorage.getItem(this.KEY) || 'null'); if (s && (!this.ses || (s.exp||0) > (this.ses.exp||0) || s.refresh_token !== this.ses.refresh_token && (s.exp||0) >= (this.ses.exp||0))) this.ses = s; } catch(e){} },
  saveSes(s){ this.ses = s; try { s ? localStorage.setItem(this.KEY, JSON.stringify(s)) : localStorage.removeItem(this.KEY); } catch(e){} },

  /* ---------- HTTP ---------- */
  headers(auth=true){ const hd = { 'apikey': this.cfg.supabaseAnonKey, 'Content-Type':'application/json' };
    hd['Authorization'] = 'Bearer ' + ((auth && this.ses && this.ses.access_token) || this.cfg.supabaseAnonKey); return hd; },
  async req(path, opts={}, retry=true){
    if (opts.auth !== false){ this.sync(); if (retry && this.ses && Date.now() > (this.ses.exp||0) - this.margen()) await this.refresh(); }
    const r = await fetch(this.url + path, { method: opts.method || 'GET', headers: Object.assign(this.headers(opts.auth!==false), opts.headers||{}), body: opts.body ? JSON.stringify(opts.body) : undefined });
    if (r.status === 401 && retry && opts.auth !== false && this.ses && this.ses.refresh_token){ const ok = await this.refresh(true); if (ok) return this.req(path, opts, false); }
    const txt = await r.text(); let data = null; try { data = txt ? JSON.parse(txt) : null; } catch(e){ data = txt; }
    if (!r.ok){ const msg = (data && (data.msg || data.message || data.error_description || data.error)) || `Error ${r.status}`; const err = new Error(msg); err.status = r.status; err.data = data; throw err; }
    return data;
  },
  rest(table, q='', opts={}){ return this.req(`/rest/v1/${table}${q?'?'+q:''}`, Object.assign({ headers:{ 'Prefer': opts.prefer || 'return=representation' } }, opts)); },
  async fn(accion, payload={}){ return this.req('/functions/v1/admin-usuarios', { method:'POST', body: Object.assign({ accion }, payload) }); },

  /* ---------- autenticación ---------- */
  async login(email, password){
    let d; try { d = await this.req('/auth/v1/token?grant_type=password', { method:'POST', auth:false, body:{ email:String(email).trim().toLowerCase(), password } }); }
    catch(e){ return { ok:false, msg: /banned/i.test(e.message) ? 'Esta cuenta está desactivada. Si crees que es un error, comunícate con la administración de la institución.' : /invalid/i.test(e.message) ? 'Usuario o contraseña incorrectos.' : 'No se pudo conectar con el servidor: '+e.message }; }
    this.saveSes({ access_token:d.access_token, refresh_token:d.refresh_token, uid:d.user.id, email:d.user.email, exp: Date.now() + (d.expires_in||3600)*1000, dur:(d.expires_in||3600)*1000 }); this.caida = false;
    const p = await this.miPerfil(); if (!p) return { ok:false, msg:'Tu cuenta existe pero no tiene perfil asignado. Pide a administración que lo revise.' };
    if (p.eliminado){ await this.logout(); return { ok:false, msg:'Esta cuenta está desactivada. Si crees que es un error, comunícate con la administración de la institución.' }; }
    if (p.rol === 'estudiante' && p.estado && p.estado !== 'activo'){ await this.logout(); return { ok:false, msg:'Tu cuenta quedó archivada al terminar el Bachillerato. Si necesitas tu historial de calificaciones, pídelo a la institución.' }; }
    return { ok:true, perfil:p };
  },
  /* Renovación a prueba de varias pestañas: solo una renueva a la vez; las demás esperan y adoptan el resultado.
     Antes, dos pestañas renovando a la vez hacían que el servidor anulara la sesión y las notas dejaban de enviarse. */
  async refresh(forzar){
    this.sync(); if (!this.ses) return false;
    const usado = this.ses.refresh_token;
    const hacer = async () => {
      this.sync(); if (!this.ses) return false;
      if (this.ses.refresh_token !== usado && Date.now() < (this.ses.exp||0)) return true;      /* otra pestaña ya la renovó */
      if (!forzar && Date.now() < (this.ses.exp||0) - this.margen()) return true;
      const rt = this.ses.refresh_token;
      try {
        const d = await this.req('/auth/v1/token?grant_type=refresh_token', { method:'POST', auth:false, body:{ refresh_token:rt } }, false);
        this.saveSes({ access_token:d.access_token, refresh_token:d.refresh_token, uid:d.user.id, email:d.user.email, exp: Date.now() + (d.expires_in||3600)*1000, dur:(d.expires_in||3600)*1000 });
        this.caida = false; return true;
      } catch(e){
        this.sync(); if (this.ses && this.ses.refresh_token !== rt && Date.now() < (this.ses.exp||0)) return true;
        this.saveSes(null); this.sesionCaida(); return false;
      }
    };
    /* Un solo renovador a la vez entre todas las pestañas. Web Locks es atómico; si el navegador no lo tiene, cerrojo en localStorage. */
    try { if (typeof navigator !== 'undefined' && navigator.locks && navigator.locks.request) return await navigator.locks.request('anai-renovar-sesion', hacer); } catch(e){}
    const LK = this.KEY + '-renovando', espera = ms => new Promise(r => setTimeout(r, ms));
    for (let i = 0; i < 6; i++){ const l = +(localStorage.getItem(LK) || 0); if (!l || Date.now() - l > 8000) break; await espera(700); }
    try { localStorage.setItem(LK, String(Date.now())); } catch(e){}
    try { return await hacer(); } finally { try { localStorage.removeItem(LK); } catch(e){} }
  },
  /* se renueva un poco antes de vencer: 1 minuto (o un cuarto de la duración si el permiso es corto) */
  margen(){ return Math.min(60000, ((this.ses && this.ses.dur) || 3600000) / 4); },
  sesionCaida(){ this.caida = true; try { if (typeof avisoSesionCaida === 'function') avisoSesionCaida(); } catch(e){} },
  /* Envía al servidor las actividades completadas que aún no llegaron (fallos de red o de sesión). */
  async enviarPendientes(){
    if (this._enviando || !this.on || typeof Store === 'undefined' || Store.ses.rol !== 'estudiante') return;
    const q = Store.s.syncPend || {}; const ids = Object.keys(q); if (!ids.length) return;
    this.sync(); if (!this.ses){ if (Store.ses.userId) this.sesionCaida(); return; }
    this._enviando = true;
    try {
      for (const id of ids){ const a = Store.s.activities[id]; if (!a || !a.done){ delete q[id]; continue; }
        const int = Number.isFinite(+a.attempts) ? Math.max(0, Math.round(+a.attempts)) : null;
        try { await this.pushNota(this.ses.uid, id, Store.gradeOf(id), { intentos:int, resultado: a.score != null ? String(a.score).slice(0,200) : null, origen:'plataforma', fecha:a.at });
          a.enviado = true; delete q[id]; }
        catch(e){ console.warn('pendiente', id, e.message); if (e.status === 401 || !this.ses) break; }
      }
    } finally { this._enviando = false; Store.s.syncPend = q; Store.save(); if (typeof renderSync === 'function') renderSync(); }
  },
  async miPerfil(){ const rows = await this.rest('perfiles', `id=eq.${this.ses.uid}&select=*`); this.perfil = rows[0] || null;
    if (this.perfil) this.rest('perfiles', `id=eq.${this.ses.uid}`, { method:'PATCH', body:{ ultimo_acceso:new Date().toISOString() }, prefer:'return=minimal' }).catch(()=>{});
    return this.perfil; },
  async setPassword(nueva){ await this.req('/auth/v1/user', { method:'PUT', body:{ password:nueva } });
    await this.rest('perfiles', `id=eq.${this.ses.uid}`, { method:'PATCH', body:{ cambiar:false }, prefer:'return=minimal' }); if (this.perfil) this.perfil.cambiar = false; },
  async logout(){ const tok = this.ses && this.ses.access_token; this.saveSes(null); this.perfil = null;
    if (tok) try { await fetch(this.url + '/auth/v1/logout', { method:'POST', headers:{ apikey:this.cfg.supabaseAnonKey, Authorization:'Bearer '+tok } }); } catch(e){} },
  async restaurar(){ if (!this.on || !this.ses) return null; if (Date.now() > (this.ses.exp||0) - 60000){ if (!await this.refresh()) return null; }
    try { const p = await this.miPerfil(); if (p && (p.eliminado || (p.rol === 'estudiante' && p.estado && p.estado !== 'activo'))){ await this.logout(); return null; } return p; } catch(e){ return null; } },

  /* ---------- lectura en caché ---------- */
  mapUsuario(p){ return { id:p.codigo || p.id, uid:p.id, codigo:p.codigo || p.id, nombres:p.nombres, apellidos:p.apellidos, nombre:p.nombre, year:p.nivel, paralelo:p.paralelo, email:p.email,
    rep:p.rep||'', tel:p.tel||'', temp:(Store.s.usuarios||{})[p.codigo]?.temp || null, hash:null, cambiar:p.cambiar, entregada:p.entregada, creado:Date.parse(p.creado), ultimoAcceso:p.ultimo_acceso?Date.parse(p.ultimo_acceso):null, notas:{}, adapt:[],
    estado:p.estado||'activo', eliminado:p.eliminado?Date.parse(p.eliminado):null, privacidad:p.privacidad?Date.parse(p.privacidad):null }; },
  mapDocente(p){ return { id:p.id, nombres:p.nombres, apellidos:p.apellidos, nombre:p.nombre, email:p.email, prog:p.prog, cursos:[], temp:(Store.s.docentes||{})[p.id]?.temp || null, cambiar:p.cambiar, entregada:p.entregada, creado:Date.parse(p.creado), ultimoAcceso:p.ultimo_acceso?Date.parse(p.ultimo_acceso):null,
    rol:p.rol, cargo:p.cargo||'', eliminado:p.eliminado?Date.parse(p.eliminado):null }; },
  mapCurso(c){ return { id:c.id, prog:c.prog, nivel:c.nivel, paralelo:c.paralelo, docenteId:c.docente_id, anio:c.anio, creado:Date.parse(c.creado), eliminado:c.eliminado?Date.parse(c.eliminado):null }; },
  /* v1.8: tablas de gestión. Si el servidor aún no tiene la migración, se marca y todo sigue funcionando como antes. */
  sinV18: false,
  async v18(tabla, q){ try { const r = await this.rest(tabla, q); return r || []; } catch(e){ if (/42P01|does not exist|relation|404/i.test(String(e.message)+' '+(e.status||''))){ this.sinV18 = true; return []; } throw e; } },
  jsonDe(v){ if (v == null) return null; if (typeof v === 'string'){ try { return JSON.parse(v); } catch(e){ return v; } } return v; },
  async pull(){
    const rol = this.perfil.rol, staff = ['admin','docente','autoridad','dece'].includes(rol);
    const [perfiles, cursos, ajustes] = await Promise.all([ this.rest('perfiles','select=*&order=nombre'), this.rest('cursos','select=*&order=nivel,paralelo'), this.rest('ajustes','select=*').catch(()=>[]) ]);
    const a = Store.s.admin = Store.s.admin || { cursos:[], anio:ANIO_DEF };
    const todosCursos = cursos.map(this.mapCurso);
    a.cursos = todosCursos.filter(c => !c.eliminado);
    const aj = k => { const x = (ajustes||[]).find(y => y.clave === k); return x ? this.jsonDe(x.valor) : null; };
    const an = aj('anio_lectivo'); if (an) a.anio = String(an).replace(/"/g,'');
    const inst = Store.s.inst = Store.s.inst || {};
    ['calendario','ponderacion','privacidad'].forEach(k => { const v = aj(k); if (v && typeof v === 'object') inst[k] = v; });
    Store.s.usuarios = {}; Store.s.docentes = {}; Store.s.personal = {}; Store.s.familias = {}; Store.s.egresados = {};
    const pap = Store.s.papelera = { usuarios:{}, docentes:{}, personal:{}, cursos: todosCursos.filter(c => c.eliminado) };
    perfiles.forEach(p => {
      if (p.rol==='estudiante'){ const u = this.mapUsuario(p); if (u.eliminado) pap.usuarios[u.codigo] = u; else if (u.estado !== 'activo') Store.s.egresados[u.codigo] = u; else Store.s.usuarios[u.codigo] = u; }
      else if (p.rol==='docente'){ const d = this.mapDocente(p); (d.eliminado ? pap.docentes : Store.s.docentes)[p.id] = d; }
      else if (p.rol==='dece' || p.rol==='autoridad'){ const d = this.mapDocente(p); (d.eliminado ? pap.personal : Store.s.personal)[p.id] = d; }
      else if (p.rol==='familia' && p.id !== this.ses.uid) Store.s.familias[p.id] = { id:p.id, nombre:p.nombre, email:p.email, tel:p.tel||'', creado:Date.parse(p.creado), ultimoAcceso:p.ultimo_acceso?Date.parse(p.ultimo_acceso):null, eliminado:p.eliminado?Date.parse(p.eliminado):null };
    });
    a.cursos.forEach(c => { const d = c.docenteId && Store.s.docentes[c.docenteId]; if (d && !d.cursos.includes(c.id)) d.cursos.push(c.id); });
    const porUid = {}; [...Object.values(Store.s.usuarios), ...Object.values(pap.usuarios), ...Object.values(Store.s.egresados)].forEach(u => porUid[u.uid] = u);
    this.porUid = porUid;
    const cod = uid => (porUid[uid] || {}).codigo;
    if (staff){
      const [notas, adapt, nee, cierres, famcod, famvin, comun] = await Promise.all([
        this.rest('notas','select=estudiante_id,actividad,nota,intentos,resultado,origen,fecha'),
        this.rest('adaptaciones','select=*').catch(()=>[]),
        this.v18('nee','select=*'), this.v18('calificaciones_cierre','select=*'),
        rol==='dece' ? [] : this.v18('familia_codigos','select=*'), this.v18('familia_vinculos','select=*'), this.v18('comunicados','select=*&order=creado.desc') ]);
      Store.s.docente.notas = {}; Store.s.docente.adapt = Store.s.docente.adapt || {};
      Store.s.docente.fechas = {}; Store.s.docente.intentos = {}; Store.s.docente.nNotas = notas.length;
      notas.forEach(n => { const u = porUid[n.estudiante_id]; if (!u) return; (Store.s.docente.notas[u.codigo] = Store.s.docente.notas[u.codigo] || {})[n.actividad] = n.nota==null ? null : +n.nota;
        if (n.fecha) (Store.s.docente.fechas[u.codigo] = Store.s.docente.fechas[u.codigo] || {})[n.actividad] = Date.parse(n.fecha);
        if (n.intentos != null) (Store.s.docente.intentos[u.codigo] = Store.s.docente.intentos[u.codigo] || {})[n.actividad] = +n.intentos; });
      adapt.forEach(x => { const u = porUid[x.estudiante_id]; if (u) Store.s.docente.adapt[u.codigo] = x.lista || []; });
      Store.s.nee = {}; nee.forEach(x => { const c = cod(x.estudiante_id); if (c) Store.s.nee[c] = this.mapNee(x); });
      Store.s.cierres = this.mapCierres(cierres);
      Store.s.famCodigos = famcod.map(x => ({ codigo:x.codigo, estUid:x.estudiante_id, estCodigo:cod(x.estudiante_id), activo:x.activo, creado:Date.parse(x.creado), usadoEn:x.usado_en?Date.parse(x.usado_en):null }));
      Store.s.famVinculos = famvin.map(x => this.mapVinculo(x, cod));
      Store.s.comunicados = comun.map(x => this.mapComunicado(x));
    }
    if (rol==='estudiante'){
      const [notas, adapt, comun] = await Promise.all([ this.rest('notas',`estudiante_id=eq.${this.ses.uid}&select=actividad,nota,intentos,resultado,fecha`), this.rest('adaptaciones',`estudiante_id=eq.${this.ses.uid}&select=lista`).catch(()=>[]), this.v18('comunicados','select=*&order=creado.desc') ]);
      /* v1.8: si la administración cerró el año, el avance del año anterior se archiva en este equipo y no se reenvía */
      const anioSrv = a.anio;
      if (Store.s.anioAlumno && anioSrv && Store.s.anioAlumno !== anioSrv){
        (Store.s.historialLocal = Store.s.historialLocal || {})[Store.s.anioAlumno] = Store.s.activities;
        Store.s.activities = {}; Store.s.syncPend = {}; Store.s.seen = {}; Store.s.unitBase = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};
        this.anioNuevo = anioSrv;
      }
      Store.s.anioAlumno = anioSrv;
      notas.forEach(n => { if (!Store.s.activities[n.actividad]?.done) Store.s.activities[n.actividad] = { done:true, at:Date.parse(n.fecha), score:n.resultado || null, attempts:n.intentos || null, remoto:true }; });
      /* Recuperación: lo que este estudiante completó en este equipo y no está en el servidor se vuelve a enviar. */
      const enServidor = new Set(notas.map(n => n.actividad)); const q = Store.s.syncPend = Store.s.syncPend || {};
      Object.entries(Store.s.activities).forEach(([id, a]) => { if (a && a.done && !a.remoto && !enServidor.has(id) && BIO.activities[id]) q[id] = q[id] || a.at || Date.now(); });
      if (adapt[0]) (Store.s.docente.adapt = Store.s.docente.adapt || {})[this.perfil.codigo] = adapt[0].lista || [];
      Store.s.comunicados = comun.map(x => this.mapComunicado(x));
    }
    if (rol==='familia'){
      const [notas, vin, cierres, hist, comun] = await Promise.all([ this.rest('notas','select=estudiante_id,actividad,nota,intentos,resultado,origen,fecha'), this.v18('familia_vinculos','select=*'),
        this.v18('calificaciones_cierre','select=*'), this.v18('historial','select=*&order=anio.desc'), this.v18('comunicados','select=*&order=creado.desc') ]);
      const hijos = perfiles.filter(p => p.rol==='estudiante').map(p => this.mapUsuario(p));
      const F = Store.s.familia = { hijos, notas:{}, fechas:{}, vinculos: vin.map(x => this.mapVinculo(x, cod)), historial: hist.map(x => Object.assign({}, x, { estCodigo:cod(x.estudiante_id) })) };
      notas.forEach(n => { const c = cod(n.estudiante_id); if (!c) return; (F.notas[c] = F.notas[c] || {})[n.actividad] = n.nota==null ? null : +n.nota; if (n.fecha) (F.fechas[c] = F.fechas[c] || {})[n.actividad] = Date.parse(n.fecha); });
      Store.s.cierres = this.mapCierres(cierres); Store.s.comunicados = comun.map(x => this.mapComunicado(x));
      if (!Store.ses.famHijo || !hijos.some(u => u.codigo === Store.ses.famHijo)) Store.ses.famHijo = hijos[0] ? hijos[0].codigo : null;
    }
    await this.pullTareas();
    this.ultimoPull = Date.now();
    Store.save();
    if (rol === 'estudiante') await this.enviarPendientes();
  },
  mapNee(x){ return { grado:x.grado, necesidad:x.necesidad||'', estrategias:x.estrategias||'', evaluacion:x.evaluacion||'', revision:x.revision||'', responsable:x.responsable||'', actualizado:x.actualizado?Date.parse(x.actualizado):null }; },
  mapCierres(rows){ const out = {}; (rows||[]).forEach(r => { const c = (this.porUid[r.estudiante_id]||{}).codigo; if (!c) return;
    const A = out[r.anio] = out[r.anio] || {}; const Q = A[r.periodo] = A[r.periodo] || {}; (Q[c] = Q[c] || {})[r.actividad] = r.nota==null ? null : +r.nota; }); return out; },
  mapVinculo(x, cod){ return { familiaId:x.familia_id, estUid:x.estudiante_id, estCodigo:cod(x.estudiante_id), parentesco:x.parentesco||'', consentimiento:x.consentimiento?Date.parse(x.consentimiento):null, version:x.version_aviso||'', creado:Date.parse(x.creado) }; },
  mapComunicado(r){ return { id:r.id, cursoId:r.curso_id, nivel:r.nivel, paralelo:r.paralelo, titulo:r.titulo, texto:r.texto||'', para:r.para, autor:r.autor, creado:Date.parse(r.creado) }; },

  /* ---------- escrituras ---------- */
  async crearCurso(c){ const rows = await this.rest('cursos','', { method:'POST', body:{ prog:c.prog, nivel:+c.nivel, paralelo:c.paralelo, docente_id:c.docenteId||null, anio:Inst.anio() } }); return this.mapCurso(rows[0]); },
  async borrarCurso(id){ await this.rest('cursos', `id=eq.${id}`, { method:'DELETE', prefer:'return=minimal' }); },
  async asignarCurso(cursoId, docenteId){ await this.rest('cursos', `id=eq.${cursoId}`, { method:'PATCH', body:{ docente_id:docenteId }, prefer:'return=minimal' }); },
  async crearEstudiantes(filas){ const r = await this.fn('crear_estudiantes', { filas: filas.map(f => ({ codigo:f.codigo, nombres:f.nombres, apellidos:f.apellidos, nivel:+f.year, paralelo:f.paralelo, rep:f.rep||'', tel:f.tel||'' })) });
    if (!r.ok) throw new Error(r.msg||'Error al crear'); return r; },
  async crearDocente(d){ const r = await this.fn('crear_docente', d); if (!r.ok) throw new Error(r.msg||'Error al crear'); return r; },
  async resetPassword(uid){ const r = await this.fn('reset_password', { id:uid }); if (!r.ok) throw new Error(r.msg); return r.temp; },
  async editarPerfil(uid, campos){ await this.rest('perfiles', `id=eq.${uid}`, { method:'PATCH', body:campos, prefer:'return=minimal' }); },
  mapTarea(r){ return { id:r.id, act:r.actividad, recurso:r.recurso, nivel:r.nivel, paralelo:r.paralelo, cursoId:r.curso_id, vence:Date.parse(r.vence), nota:r.nota||'', docenteId:r.docente_id, creado:Date.parse(r.creado) }; },
  async crearTarea(t){ try { const rows = await this.rest('tareas','', { method:'POST', body:{ curso_id:t.cursoId, nivel:+t.nivel, paralelo:t.paralelo, actividad:t.act, recurso:t.recurso, vence:new Date(t.vence).toISOString(), nota:t.nota||'' } }); this.sinTareas = false; return rows[0]; }
    catch(e){ if (/tareas|404|42P01|relation/i.test(String(e.message))) this.sinTareas = true; throw e; } },
  async editarTarea(id, c){ await this.rest('tareas', `id=eq.${id}`, { method:'PATCH', body:{ vence:new Date(c.vence).toISOString(), nota:c.nota||'' }, prefer:'return=minimal' }); },
  async borrarTarea(id){ await this.rest('tareas', `id=eq.${id}`, { method:'DELETE', prefer:'return=minimal' }); },
  async pullTareas(){ try { const rows = await this.rest('tareas','select=*&order=vence'); Store.s.tareas = rows.map(r => this.mapTarea(r)); this.sinTareas = false; }
    catch(e){ this.sinTareas = true; console.warn('tareas', e.message); } },
  async borrarUsuario(uid){ const r = await this.fn('borrar_usuario', { id:uid }); if (!r.ok) throw new Error(r.msg); },
  async cambiarCorreo(uid, email){ const r = await this.fn('cambiar_correo', { id:uid, email }); if (!r.ok) throw new Error(r.msg); },
  async entregada(uid, v){ await this.rest('perfiles', `id=eq.${uid}`, { method:'PATCH', body:{ entregada:!!v }, prefer:'return=minimal' }); },
  async pushNota(uid, actividad, nota, extra={}){ await this.rest('notas','on_conflict=estudiante_id,actividad', { method:'POST', headers:{ 'Prefer':'resolution=merge-duplicates,return=minimal' }, body:{ estudiante_id:uid, actividad, nota, intentos:extra.intentos??null, resultado:extra.resultado??null, origen:extra.origen||'docente', fecha:new Date(extra.fecha || Date.now()).toISOString() } }); },
  async pushAdapt(uid, lista){ await this.rest('adaptaciones','on_conflict=estudiante_id', { method:'POST', headers:{ 'Prefer':'resolution=merge-duplicates,return=minimal' }, body:{ estudiante_id:uid, lista, actualizado:new Date().toISOString() } }); },
  async evento(tipo, datos){ if (!this.ses) return; try { await this.rest('eventos','', { method:'POST', prefer:'return=minimal', body:{ usuario_id:this.ses.uid, tipo, datos, ruta:location.hash } }); } catch(e){} },
  async guardarAnio(v){ await this.rest('ajustes','on_conflict=clave', { method:'POST', headers:{ 'Prefer':'resolution=merge-duplicates,return=minimal' }, body:{ clave:'anio_lectivo', valor:JSON.stringify(v) } }); },
  /* ---------- v1.8: gestión institucional ---------- */
  async rpc(fn, args={}){ return this.req('/rest/v1/rpc/'+fn, { method:'POST', body:args }); },
  async auditar(accion, detalle={}){ if (!this.on || !this.ses) return; try { await this.rpc('registrar_auditoria', { p_accion:accion, p_detalle:detalle }); } catch(e){ console.warn('auditoría', e.message); } },
  async guardarAjuste(clave, valor){ await this.rest('ajustes','on_conflict=clave', { method:'POST', headers:{ 'Prefer':'resolution=merge-duplicates,return=minimal' }, body:{ clave, valor } }); },
  async crearPersonal(d){ const r = await this.fn('crear_personal', d); if (!r.ok) throw new Error(r.msg||'Error al crear'); return r; },
  async aPapelera(uid){ const r = await this.fn('papelera', { id:uid }); if (!r.ok) throw new Error(r.msg); },
  async restaurarUsuario(uid){ const r = await this.fn('restaurar', { id:uid }); if (!r.ok) throw new Error(r.msg); },
  async purgarVencidos(){ const r = await this.fn('purgar_vencidos', {}); if (!r.ok) throw new Error(r.msg); return r; },
  async cursoAPapelera(id){ await this.rest('cursos', `id=eq.${id}`, { method:'PATCH', body:{ eliminado:new Date().toISOString() }, prefer:'return=minimal' }); },
  async restaurarCurso(id){ await this.rest('cursos', `id=eq.${id}`, { method:'PATCH', body:{ eliminado:null }, prefer:'return=minimal' }); },
  async pushNee(uid, f){ await this.rest('nee','on_conflict=estudiante_id', { method:'POST', headers:{ 'Prefer':'resolution=merge-duplicates,return=minimal' },
    body:{ estudiante_id:uid, grado:f.grado ? +f.grado : null, necesidad:f.necesidad||'', estrategias:f.estrategias||'', evaluacion:f.evaluacion||'', revision:f.revision||null, responsable:f.responsable||'', actualizado:new Date().toISOString() } }); },
  async borrarNee(uid){ await this.rest('nee', `estudiante_id=eq.${uid}`, { method:'DELETE', prefer:'return=minimal' }); },
  async crearCodigoFamilia(estUid, codigo){ const rows = await this.rest('familia_codigos','', { method:'POST', body:{ codigo, estudiante_id:estUid } }); return rows[0]; },
  async desactivarCodigoFamilia(codigo){ await this.rest('familia_codigos', `codigo=eq.${encodeURIComponent(codigo)}`, { method:'PATCH', body:{ activo:false }, prefer:'return=minimal' }); },
  async canjearCodigo(d){ const r = await this.fn('canjear_codigo', Object.assign({}, d)); if (!r.ok) throw new Error(r.msg || 'No se pudo vincular.'); return r; },
  async retirarVinculo(familiaId, estUid){ await this.rest('familia_vinculos', `familia_id=eq.${familiaId}&estudiante_id=eq.${estUid}`, { method:'DELETE', prefer:'return=minimal' }); },
  async crearComunicado(c){ const rows = await this.rest('comunicados','', { method:'POST', body:{ curso_id:c.cursoId, nivel:+c.nivel, paralelo:c.paralelo, titulo:c.titulo, texto:c.texto||'', para:c.para||'todos' } }); return this.mapComunicado(rows[0]); },
  async borrarComunicado(id){ await this.rest('comunicados', `id=eq.${id}`, { method:'DELETE', prefer:'return=minimal' }); },
  async auditoria(q='order=fecha.desc&limit=500'){ return this.v18('auditoria', 'select=*&'+q); },
  async historial(q='order=anio.desc'){ return this.v18('historial', 'select=*&'+q); },
  async leer(tabla, q='select=*'){ return this.v18(tabla, q); },
  async marcarPrivacidad(){ if (!this.ses) return; await this.rest('perfiles', `id=eq.${this.ses.uid}`, { method:'PATCH', body:{ privacidad:new Date().toISOString() }, prefer:'return=minimal' }); if (this.perfil) this.perfil.privacidad = new Date().toISOString(); },
  uidDe(codigo){ const u = (Store.s.usuarios||{})[codigo]; return u ? u.uid : (Store.ses.userId===codigo ? this.ses.uid : null); },
  /* aplicar el perfil a la sesión local */
  aplicarPerfil(p){
    if (p.rol==='admin'){ Object.assign(Store.ses, { rol:'admin', onboarded:true, programa:null, docenteId:null, userId:null }); Store.s.user = Object.assign({}, Store.s.user, { id:'admin', nombre:'Administración', iniciales:'AD' }); }
    else if (p.rol==='docente'){ Object.assign(Store.ses, { rol:'docente', programa:p.prog, docenteId:p.id, onboarded:true, userId:null, year:null, nivel:null });
      Store.s.user = Object.assign({}, Store.s.user, { id:p.id, nombre:p.nombre, iniciales:((p.nombres||'D')[0]+(p.apellidos||'')[0]).toUpperCase() }); }
    else if (p.rol==='estudiante'){ Object.assign(Store.ses, { rol:'estudiante', year:p.nivel, nivel:p.nivel, programa:BIO.progOf(p.nivel), paralelo:p.paralelo, code:null, invitado:false, userId:p.codigo, docenteId:null, onboarded:true });
      Store.s.user = Object.assign({}, Store.s.user, { id:p.codigo, nombre:((p.nombres||'')+' '+(p.apellidos||'')).trim() || p.nombre, iniciales:(((p.nombres||p.nombre)[0]||'E')+((p.apellidos||'')[0]||'')).toUpperCase(), curso:BIO.nivel(p.nivel).n }); }
    else if (p.rol==='autoridad' || p.rol==='dece'){ Object.assign(Store.ses, { rol:p.rol, onboarded:true, programa:null, docenteId:p.id, userId:null, year:null, nivel:null });
      Store.s.user = Object.assign({}, Store.s.user, { id:p.id, nombre:p.nombre, iniciales:(((p.nombres||p.nombre||'A')[0])+((p.apellidos||'')[0]||'')).toUpperCase(), cargo:p.cargo||'' }); }
    else { Object.assign(Store.ses, { rol:'familia', onboarded:true, programa:null, docenteId:null, userId:null, famId:p.id });
      Store.s.user = Object.assign({}, Store.s.user, { id:p.id, nombre:p.nombre, iniciales:(((p.nombres||p.nombre||'R')[0])+((p.apellidos||'')[0]||'')).toUpperCase() }); }
    Store.save();
  }
};
Cloud.init();

/* Aviso visible cuando la sesión del servidor se pierde: lo hecho queda guardado en el equipo
   y se envía solo al volver a entrar con el mismo usuario. */
function avisoSesionCaida(){
  if (typeof document === 'undefined' || document.getElementById('aviso-sesion')) return;
  const rol = Store.ses.rol; if (rol !== 'estudiante' && rol !== 'docente' && rol !== 'admin') return;
  if (rol === 'estudiante' && !Store.ses.userId) return;
  const pend = Object.keys(Store.s.syncPend || {}).length;
  const el = h('div',{id:'aviso-sesion',role:'alert',style:'position:fixed;left:50%;transform:translateX(-50%);top:12px;z-index:9999;max-width:640px;width:calc(100% - 24px);background:#fff4e0;border:1px solid #e0a23a;border-left:6px solid #b86e00;border-radius:12px;padding:12px 16px;box-shadow:0 8px 28px rgba(0,0,0,.18);display:flex;gap:12px;align-items:center;flex-wrap:wrap'},
    h('span',{style:'flex:1;min-width:220px'}, h('b',{},'Tu sesión se cerró. '),
      rol === 'estudiante' ? `Vuelve a entrar para que tu docente reciba tu avance.${pend ? ` Tienes ${pend} actividad${pend===1?'':'es'} guardada${pend===1?'':'s'} en este equipo que se enviará${pend===1?'':'n'} al volver a entrar.` : ' Lo que hagas se guarda en este equipo y se enviará al volver a entrar.'}`
                           : 'Vuelve a entrar para seguir viendo los datos actualizados del servidor.'),
    h('button',{class:'btn primary sm',onclick:()=>{ el.remove(); Users.logout(); updateChips(); openWizard('login'); }},'Volver a entrar'));
  document.body.append(el);
}
</script>
