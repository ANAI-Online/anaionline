<script>
/* =====================================================================
   USUARIOS: carga del listado de estudiantes, generación de correos y
   contraseñas temporales, entrega de credenciales e inicio de sesión.
   En el prototipo todo ocurre en el navegador; los CSV generados sirven
   para crear las cuentas reales (Google Workspace o Microsoft 365).
   ===================================================================== */
const DOMINIO_EST = 'estudiantes.anai.edu.ec';
const DOMINIO_DOC = 'anai.edu.ec';

/* ---------- utilidades de texto ---------- */
const capital = s => String(s||'').toLowerCase().replace(/(^|[\s'-])([a-záéíóúñü])/g, (m,a,b)=>a+b.toUpperCase()).trim();
const sinTildes = s => String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'');
/* Separa un texto tabular (CSV con , o ; , o pegado desde Excel con tabulaciones) */
function parseTabular(txt){
  const lineas = String(txt||'').split(/\r?\n/).filter(l => l.trim().length);
  if (!lineas.length) return [];
  const conteo = s => ({ ';': (s.match(/;/g)||[]).length, ',': (s.match(/,/g)||[]).length, '\t': (s.match(/\t/g)||[]).length });
  const c = conteo(lineas[0]); const sep = c['\t'] >= Math.max(c[';'],c[',']) && c['\t']>0 ? '\t' : c[';'] >= c[','] ? ';' : ',';
  return lineas.map(l => {
    const out = []; let cur = '', q = false;
    for (let i=0;i<l.length;i++){ const ch = l[i];
      if (ch === '"'){ if (q && l[i+1] === '"'){ cur += '"'; i++; } else q = !q; }
      else if (ch === sep && !q){ out.push(cur); cur = ''; }
      else cur += ch; }
    out.push(cur); return out.map(x => x.trim());
  });
}
/* Reconoce las columnas por su encabezado, en cualquier orden */
const COLS = {
  codigo:['codigo','código','cod','cedula','cédula','id','matricula','matrícula','codigo de alumno','código de alumno','codigo del estudiante'],
  nombres:['nombres','nombre','nombres del estudiante','first name','primer nombre'],
  apellidos:['apellidos','apellido','last name','apellidos del estudiante'],
  nombre_completo:['estudiante','nombre completo','apellidos y nombres','nombres y apellidos','alumno'],
  year:['año','ano','anio','curso','nivel','year','grado'],
  paralelo:['paralelo','par','seccion','sección'],
  rep:['representante','correo representante','email representante','correo del representante','contacto'],
  tel:['telefono','teléfono','celular','whatsapp','tel']
};
function mapearEncabezado(fila){
  const map = {}; const norm = v => sinTildes(String(v).toLowerCase()).replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  /* 1) coincidencia exacta con los alias */
  fila.forEach((h0,i) => { const k = norm(h0);
    for (const [campo,alias] of Object.entries(COLS)) if (alias.some(a => norm(a) === k)) { if (map[campo]===undefined) map[campo] = i; } });
  /* 2) coincidencia por palabra clave, para encabezados como "CÓDIGO ALUMNO", "APELLIDOS DEL ALUMNO", "Paralelo/Sección" */
  const claves = [['codigo',/\b(cod|codigo|matricula|cedula)\b/],['apellidos',/apellido/],['nombres',/^nombres?\b(?!.*apellido)/],
    ['nombre_completo',/(estudiante|alumno|nombre completo|apellidos y nombres|nombres y apellidos)/],['paralelo',/(paralelo|seccion)/],
    ['year',/\b(ano|anio|curso|nivel|grado|year)\b/],['rep',/(representante|correo)/],['tel',/(telefono|celular|whatsapp)/]];
  fila.forEach((h0,i) => { const k = norm(h0); if (!k || Object.values(map).includes(i)) return;
    for (const [campo,re] of claves) if (map[campo]===undefined && re.test(k)){ map[campo] = i; break; } });
  if (map.apellidos!==undefined && map.nombres!==undefined) delete map.nombre_completo;
  return map;
}
/* ¿Parece un paralelo? Una o dos letras (A, B, AB). "8º" o "Octavo" no lo son. */
const esParalelo = v => /^[A-Za-z]{1,2}$/.test(String(v||'').trim());
const yearDe = v => { const s = sinTildes(String(v||'').toLowerCase()).trim();
  if (/10|decimo/.test(s)) return 10;
  if (/(^|\D)9(\D|$)|noveno/.test(s)) return 9;
  if (/(^|\D)8(\D|$)|octavo/.test(s)) return 8;
  if (/3|tercero|tercer/.test(s)) return 3;
  if (/2|segundo/.test(s)) return 2;
  if (/1|primero|primer/.test(s)) return 1;
  return null; };

/* ---------- contraseñas ---------- */
const PWORDS = ['Celula','Neurona','Mitocondria','Alveolo','Ribosoma','Cloroplasto','Enzima','Nucleo','Arteria','Sinapsis','Genoma','Manglar','Paramo','Galapagos','Osmosis','Cromosoma','Bosque','Nectar','Polen','Coral'];
function generarPass(){ const w = PWORDS[Math.floor(Math.random()*PWORDS.length)]; const n = 100 + Math.floor(Math.random()*900); return `${w}${n}`; }
async function hashPass(p){
  try { const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('anai::'+p));
    return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join(''); }
  catch(e){ let h = 5381; const s = 'anai::'+p; for (let i=0;i<s.length;i++) h = ((h*33) ^ s.charCodeAt(i)) >>> 0; return 'x'+h.toString(16); }
}

/* ---------- API de usuarios ---------- */
const Users = {
  all(){ return Object.values(Store.s.usuarios || {}); },
  get(codigo){ return (Store.s.usuarios||{})[String(codigo)]; },
  byEmail(email){ const e = String(email||'').trim().toLowerCase(); return this.all().find(u => u.email.toLowerCase() === e || String(u.codigo) === e); },
  ofCourse(year, par){ return this.all().filter(u => u.year===year && (!par || u.paralelo===par)).sort((a,b)=>a.nombre.localeCompare(b.nombre)); },
  years(){ return [...new Set(this.all().map(u=>u.year))].sort(); },
  emailOf(codigo){ return `${String(codigo).trim()}@${DOMINIO_EST}`; },
  /* Revisa un listado pegado o cargado y devuelve filas listas + errores */
  revisar(txt, yearPorDefecto, parPorDefecto){
    const filas = parseTabular(txt); if (!filas.length) return { ok:[], errores:[{ fila:0, msg:'El listado está vacío.' }] };
    let map = mapearEncabezado(filas[0]); let inicio = 1;
    if (map.codigo === undefined && map.nombre_completo === undefined && map.nombres === undefined){
      /* Sin encabezados: se deduce el orden mirando los datos. Si la 3.ª columna no es un año
         pero la 4.ª sí, el archivo es código · apellidos · nombres · año · paralelo (la plantilla). */
      const f0 = filas[0] || [];
      map = (f0.length >= 4 && !yearDe(f0[2]) && yearDe(f0[3])) ? { codigo:0, apellidos:1, nombres:2, year:3, paralelo:4 } : { codigo:0, nombre_completo:1, year:2, paralelo:3 };
      inicio = 0; }
    const ok = [], errores = [], avisos = [], vistos = new Set();
    for (let i = inicio; i < filas.length; i++){
      const f = filas[i]; if (!f.join('').trim()) continue;
      const codigo = String(f[map.codigo] ?? '').trim();
      let nombres = map.nombres!==undefined ? f[map.nombres] : '', apellidos = map.apellidos!==undefined ? f[map.apellidos] : '';
      if ((!nombres || !apellidos) && map.nombre_completo!==undefined){ const partes = String(f[map.nombre_completo]||'').trim().split(/\s+/);
        if (partes.length >= 3){ apellidos = partes.slice(0,2).join(' '); nombres = partes.slice(2).join(' '); }
        else { apellidos = partes[0]||''; nombres = partes.slice(1).join(' '); } }
      const year = yearDe(map.year!==undefined ? f[map.year] : '') || yearPorDefecto;
      const fila = i+1;
      const parCrudo = map.paralelo!==undefined ? String(f[map.paralelo]||'').trim() : '';
      const paralelo = (esParalelo(parCrudo) ? parCrudo : (parPorDefecto || 'A')).toUpperCase();
      if (parCrudo && !esParalelo(parCrudo)) avisos.push({ fila, msg:`Paralelo "${parCrudo}" no reconocido para ${codigo || 'la fila'}: se usó ${paralelo}.` });
      if (!codigo) { errores.push({ fila, msg:'Falta el código del estudiante.' }); continue; }
      if (!/^[A-Za-z0-9._-]{3,14}$/.test(codigo)) { errores.push({ fila, msg:`Código "${codigo}" no válido (usa 3 a 14 letras o números, sin espacios).` }); continue; }
      if (!nombres && !apellidos) { errores.push({ fila, msg:`Sin nombre para el código ${codigo}.` }); continue; }
      if (!year) { errores.push({ fila, msg:`No se reconoce el año del estudiante ${codigo}. Usa 1, 2 o 3.` }); continue; }
      if (vistos.has(codigo)) { errores.push({ fila, msg:`Código repetido en el archivo: ${codigo}.` }); continue; }
      vistos.add(codigo);
      ok.push({ codigo, nombres:capital(nombres), apellidos:capital(apellidos), nombre:(capital(apellidos)+' '+capital(nombres)).trim(), year, paralelo,
        rep: map.rep!==undefined ? String(f[map.rep]||'').trim() : '', tel: map.tel!==undefined ? String(f[map.tel]||'').trim() : '',
        existe: !!Users.get(codigo) });
    }
    if (inicio === 0 && ok.length) avisos.unshift({ fila:1, msg:'No reconocí los encabezados del archivo y usé el orden código · nombre · año · paralelo. Revisa la vista previa: si los datos no calzan, añade una fila de encabezados (código, apellidos, nombres, año, paralelo).' });
    return { ok, errores, avisos };
  },
  /* Crea o actualiza los usuarios y genera contraseñas temporales para los nuevos */
  async importar(filas, opts={}){
    const u = Store.s.usuarios = Store.s.usuarios || {}; let nuevos = 0, actualizados = 0;
    if (Cloud.on){
      const r = await Cloud.crearEstudiantes(filas);
      r.creados.forEach(c => { const f = filas.find(x => String(x.codigo)===String(c.codigo)); if (!f) return;
        if (c.actualizado){ const prev = u[f.codigo]; if (prev) Object.assign(prev, { nombres:f.nombres, apellidos:f.apellidos, nombre:f.nombre, year:f.year, paralelo:f.paralelo }); actualizados++; return; }
        u[f.codigo] = { id:f.codigo, uid:c.id, codigo:f.codigo, nombres:f.nombres, apellidos:f.apellidos, nombre:f.nombre, year:f.year, paralelo:f.paralelo, email:c.email, rep:f.rep||'', tel:f.tel||'', temp:c.temp, hash:null, cambiar:true, entregada:false, creado:Date.now(), ultimoAcceso:null, notas:{}, adapt:[] }; nuevos++; });
      if (r.errores && r.errores.length) toast(`${r.errores.length} fila(s) no se pudieron crear: ${r.errores[0].codigo} (${r.errores[0].msg})`);
      Store.save(); Store.log('usuarios_importados', { nuevos, actualizados, servidor:true }); return { nuevos, actualizados, errores:r.errores };
    }
    for (const f of filas){
      const prev = u[f.codigo];
      if (prev && !opts.regenerar){ Object.assign(prev, { nombres:f.nombres, apellidos:f.apellidos, nombre:f.nombre, year:f.year, paralelo:f.paralelo, rep:f.rep||prev.rep, tel:f.tel||prev.tel }); actualizados++; continue; }
      const pass = generarPass();
      u[f.codigo] = { codigo:f.codigo, nombres:f.nombres, apellidos:f.apellidos, nombre:f.nombre, year:f.year, paralelo:f.paralelo,
        email: Users.emailOf(f.codigo), rep:f.rep||'', tel:f.tel||'', temp:pass, hash: await hashPass(pass), cambiar:true, entregada:false,
        creado: Date.now(), ultimoAcceso:null, notas:(prev&&prev.notas)||{}, adapt:(prev&&prev.adapt)||[] };
      prev ? actualizados++ : nuevos++;
    }
    Store.save(); Store.log('usuarios_importados', { nuevos, actualizados, total:Object.keys(u).length });
    Auditoria.local('crear_estudiantes', { nuevos, actualizados });
    return { nuevos, actualizados };
  },
  /* Edita los datos de un estudiante. El código no cambia: es su usuario. */
  async editar(codigo, c){
    const u = this.get(codigo); if (!u) return { ok:false, msg:'No existe ese estudiante.' };
    const nombres = capital(String(c.nombres ?? u.nombres).trim()), apellidos = capital(String(c.apellidos ?? u.apellidos).trim());
    if (!nombres && !apellidos) return { ok:false, msg:'Escribe al menos nombres o apellidos.' };
    const year = +(c.year ?? u.year); if (!BIO.niveles.some(n => +n.id === year)) return { ok:false, msg:'Elige un año válido.' };
    const paralelo = String(c.paralelo ?? u.paralelo).trim().toUpperCase();
    if (!/^[A-Z]{1,2}$/.test(paralelo)) return { ok:false, msg:'El paralelo debe ser una letra, por ejemplo A.' };
    const nuevo = { nombres, apellidos, nombre:(apellidos+' '+nombres).trim(), year, paralelo, rep:String(c.rep ?? u.rep ?? '').trim(), tel:String(c.tel ?? u.tel ?? '').trim() };
    if (Cloud.on && u.uid){
      try { await Cloud.editarPerfil(u.uid, { nombres, apellidos, nombre:nuevo.nombre, nivel:year, paralelo, prog:BIO.progOf(year), rep:nuevo.rep, tel:nuevo.tel }); }
      catch(e){ return { ok:false, msg:'El servidor no aceptó el cambio: '+e.message }; }
    }
    const cambios = Object.keys(nuevo).filter(k => String(nuevo[k]) !== String(u[k]));
    Object.assign(u, nuevo); Store.save(); Store.log('usuario_editado', { codigo });
    if (cambios.length) Auditoria.local('editar_estudiante', { codigo, nombre:u.nombre, campos:cambios }, { tabla:'perfiles', registro:codigo });
    return { ok:true, u };
  },
  /* Cambia año y/o paralelo de varios estudiantes a la vez (sirve para corregir una importación). */
  async mover(codigos, { year, paralelo }){
    let ok = 0; const errores = [];
    for (const cod of codigos){ const r = await this.editar(cod, { year: year ?? undefined, paralelo: paralelo ?? undefined }); r.ok ? ok++ : errores.push(cod+': '+r.msg); }
    return { ok, errores };
  },
  /* v1.8: "eliminar" envía a la papelera; se restaura durante 30 días y después se borra de verdad. */
  async eliminar(codigo){ return Papelera.estudiante(codigo); },
  async eliminarVarios(codigos){
    let ok = 0; const errores = [];
    for (const cod of codigos){ const r = await this.eliminar(cod); r.ok ? ok++ : errores.push(cod+': '+r.msg); }
    return { ok, errores };
  },
  async resetPass(codigo){ const u = Users.get(codigo); if (!u) return null;
    if (Cloud.on){ const t = await Cloud.resetPassword(u.uid); u.temp = t; u.cambiar = true; u.entregada = false; Store.save(); return t; }
    const p = generarPass(); u.temp = p; u.hash = await hashPass(p); u.cambiar = true; u.entregada = false; Store.save(); Store.log('password_restablecida',{codigo});
    Auditoria.local('restablecer_contrasena', { codigo, nombre:u.nombre }, { tabla:'perfiles', registro:codigo }); return p; },
  async cambiarPass(codigo, nueva){
    if (Cloud.on){ try { await Cloud.setPassword(nueva); } catch(e){ toast('No se pudo cambiar la contraseña: '+e.message); return false; }
      const u = Users.get(codigo); if (u){ u.cambiar=false; u.temp=null; } const d = (Store.s.docentes||{})[codigo] || (Store.s.personal||{})[codigo]; if (d){ d.cambiar=false; d.temp=null; } Store.save(); return true; }
    const doc = (Store.s.docentes||{})[codigo] || (Store.s.personal||{})[codigo];
    if (doc){ doc.hash = await hashPass(nueva); doc.temp = null; doc.cambiar = false; Store.save(); Store.log('password_cambiada',{rol:'docente'}); return true; }
    const u = Users.get(codigo); if (!u) return false; u.hash = await hashPass(nueva); u.temp = null; u.cambiar = false; Store.save(); Store.log('password_cambiada',{codigo}); return true; },
  entregar(codigo, v=true){ const u = Users.get(codigo); if (u){ u.entregada = v; Store.save(); if (Cloud.on && u.uid) Cloud.entregada(u.uid, v).catch(e=>toast('No se guardó en el servidor: '+e.message)); } },
  borrarTodo(){ Store.s.usuarios = {}; Store.save(); },
  /* inicio de sesión */
  async login(usuario, pass){
    const id = String(usuario||'').trim().toLowerCase();
    /* modo servidor: Supabase valida usuario y contraseña */
    if (Cloud.on){
      const email = id.includes('@') ? id : (/^[a-z0-9._-]+$/.test(id) ? `${id}@${DOMINIO_EST}` : id);
      const r = await Cloud.login(email, pass); if (!r.ok) return r;
      const p = r.perfil;
      if (p.rol === 'estudiante') Store.perfilLimpio(p.codigo || p.id);
      Cloud.aplicarPerfil(p);
      try { await Cloud.pull(); } catch(e){ console.warn('pull', e); toast('Sesión iniciada, pero no se pudieron descargar todos los datos: '+e.message); }
      Store.log('inicio_sesion',{rol:p.rol, prog:p.prog||null}); Cloud.evento('inicio_sesion',{rol:p.rol});
      const out = { ok:true, rol:p.rol, cambiar:!!p.cambiar };
      if (p.rol==='docente') out.docente = Store.s.docentes[p.id] || { id:p.id, nombre:p.nombre };
      if (p.rol==='autoridad' || p.rol==='dece') out.docente = (Store.s.personal||{})[p.id] || { id:p.id, nombre:p.nombre };
      if (p.rol==='estudiante') out.user = Store.s.usuarios[p.codigo] || { codigo:p.codigo, nombre:p.nombre };
      return out;
    }
    /* administración */
    if (id === 'admin@anai.edu.ec' || id === 'admin'){
      if (pass !== (Store.s.adminPass || 'AnaiAdmin2026')) return { ok:false, msg:'La contraseña de administración no coincide.' };
      Object.assign(Store.ses, { rol:'admin', onboarded:true, programa:null, docenteId:null, userId:null });
      Store.s.user = Object.assign({}, Store.s.user, { id:'admin', nombre:'Administración', iniciales:'AD' });
      Store.save(); Store.log('inicio_sesion',{rol:'admin'}); return { ok:true, rol:'admin' };
    }
    /* docentes creados desde la consola de administración */
    const doc = Object.values(Store.s.docentes || {}).find(d => d.email.toLowerCase() === id);
    if (doc){
      if (await hashPass(pass) !== doc.hash) return { ok:false, msg:'La contraseña no coincide. La administración puede restablecerla.' };
      doc.ultimoAcceso = Date.now();
      Object.assign(Store.ses, { rol:'docente', programa:doc.prog, docenteId:doc.id, onboarded:true, userId:null, year:null, nivel:null });
      Store.s.user = Object.assign({}, Store.s.user, { id:doc.id, nombre:doc.nombre, iniciales:((doc.nombres||'D')[0]+(doc.apellidos||'')[0]).toUpperCase() });
      Store.save(); Store.log('inicio_sesion',{rol:'docente', prog:doc.prog});
      return { ok:true, rol:'docente', cambiar:doc.cambiar, docente:doc };
    }
    /* DECE y autoridades creados desde la consola de administración, y sus cuentas de demostración */
    const per = Object.values(Store.s.personal || {}).find(d => d.email.toLowerCase() === id);
    const demoPer = { 'rectorado@anai.edu.ec':{ rol:'autoridad', pass:'AnaiRector2026', nombre:'Rectorado (demostración)', cargo:'Rectorado' }, 'dece@anai.edu.ec':{ rol:'dece', pass:'AnaiDece2026', nombre:'DECE (demostración)', cargo:'Psicología educativa' } }[id];
    if (per || demoPer){
      if (per){ if (await hashPass(pass) !== per.hash) return { ok:false, msg:'La contraseña no coincide. La administración puede restablecerla.' }; per.ultimoAcceso = Date.now(); }
      else if (pass !== demoPer.pass) return { ok:false, msg:'La contraseña no coincide.' };
      const q = per || demoPer, pid = per ? per.id : demoPer.rol+'-demo';
      Object.assign(Store.ses, { rol:q.rol, onboarded:true, programa:null, docenteId:pid, userId:null, year:null, nivel:null });
      const nom = q.nombre; Store.s.user = Object.assign({}, Store.s.user, { id:pid, nombre:nom, iniciales:nom.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(), cargo:q.cargo||'' });
      Store.save(); Store.log('inicio_sesion',{rol:q.rol}); return { ok:true, rol:q.rol, cambiar: per ? per.cambiar : false, docente: per || null };
    }
    /* docente de demostración */
    if (id === BIO.school.docente.email || id === 'docente'){
      if (pass !== (Store.s.docentePass || 'BioLab2026')) return { ok:false, msg:'La contraseña de la docente no coincide.' };
      Object.assign(Store.ses, { rol:'docente', programa:'bio', docenteId:null, onboarded:true });
      Store.save(); return { ok:true, rol:'docente' };
    }
    const u = Users.byEmail(id);
    if (!u) return { ok:false, msg:'No encontramos ese usuario. Revisa tu correo institucional o pídeselo a tu docente.' };
    if (await hashPass(pass) !== u.hash) return { ok:false, msg:'La contraseña no coincide. Si la olvidaste, tu docente puede restablecerla.' };
    u.ultimoAcceso = Date.now();
    Store.perfilLimpio(u.codigo);
    Object.assign(Store.ses, { rol:'estudiante', year:u.year, nivel:u.year, programa:BIO.progOf(u.year), paralelo:u.paralelo, code:null, invitado:false, userId:u.codigo, docenteId:null });
    const display = ((u.nombres||'') + ' ' + (u.apellidos||'')).trim() || u.nombre;
    const ini = ((u.nombres||u.nombre)[0] || 'E') + ((u.apellidos||'')[0] || '');
    Store.s.user = Object.assign({}, Store.s.user, { id:u.codigo, nombre:display, iniciales:ini.toUpperCase(), curso:BIO.year(u.year).n });
    /* si la docente le asignó adaptaciones, se activan al entrar */
    const ad = (Store.s.docente.adapt||{})[u.codigo] || u.adapt || [];
    if (ad.length){ const a = {}; if (ad.includes('letra-grande')) a.text = 1.15; if (ad.includes('tipografia')) a.font = 'hyper';
      if (ad.includes('voz')) a.tts = true; if (ad.includes('menos-movimiento')) a.motion = true; if (ad.includes('pistas')) a.hints = true;
      Object.assign(Store.s.a11y, a); applyA11y(); }
    Store.save(); Store.log('inicio_sesion',{codigo:u.codigo, year:u.year});
    return { ok:true, rol:'estudiante', cambiar:u.cambiar, user:u };
  },
  logout(){ if (Cloud.on) Cloud.logout(); Object.assign(Store.ses, { rol:'estudiante', userId:null, docenteId:null, programa:null, nivel:null, invitado:false, year:null, paralelo:null, code:null, onboarded:false, famId:null, famHijo:null });
    if (Cloud.on){ Store.s.familia = null; }
    Store.s.user = Object.assign({}, Store.s.user, { id:'demo-mateo', nombre:'Mateo Andrade', iniciales:'MA', curso:'2.º de Bachillerato' });
    Store.save(); Store.log('cierre_sesion',{}); },
  /* ---------- exportaciones ---------- */
  csvCredenciales(list){
    const l = ['Codigo;Estudiante;Curso;Usuario;Contrasena temporal;Entregada'];
    list.forEach(u => l.push([u.codigo, u.nombre, `${BIO.year(u.year).corto} ${u.paralelo}`, u.email, u.temp || '(ya la cambió)', u.entregada?'si':'no'].join(';')));
    return l.join('\n');
  },
  csvGoogle(list){   /* formato de carga masiva de la consola de administración de Google Workspace */
    const l = ['First Name [Required],Last Name [Required],Email Address [Required],Password [Required],Org Unit Path [Required],Change Password at Next Sign-In'];
    list.forEach(u => l.push([`"${u.nombres||u.nombre}"`, `"${u.apellidos||'Estudiante'}"`, u.email, u.temp || '', `"/Estudiantes/${BIO.nivel(u.year).corto.replace(/[^0-9A-Za-z]/g,'')}"`, 'True'].join(',')));
    return l.join('\n');
  },
  csvMicrosoft(list){ /* formato de carga masiva de Microsoft 365 */
    const l = ['Username,First name,Last name,Display name,Job title,Department,Office number,Office phone,Mobile phone,Fax,Alternate email address,Address,City,State or province,ZIP or postal code,Country or region'];
    list.forEach(u => l.push([u.email, u.nombres, u.apellidos, u.nombre, 'Estudiante', `${BIO.year(u.year).corto} ${u.paralelo}`, '', '', u.tel||'', '', u.rep||'', '', '', '', '', 'EC'].join(',')));
    return l.join('\n');
  },
  plantillaCSV(){ return 'codigo;apellidos;nombres;año;paralelo;correo representante\n215444;Andrade Mora;Mateo Sebastián;2;A;familia.andrade@gmail.com\n215445;Cobo Vera;Valentina;2;A;\n215446;Ríos Salas;Sebastián;2;B;'; },
  ejemplo(){ return `codigo;apellidos;nombres;año;paralelo;correo representante
215444;Andrade Mora;Mateo Sebastián;2;A;familia.andrade@gmail.com
215445;Cobo Vera;Valentina Isabel;2;A;m.cobo@gmail.com
215446;Ríos Salas;Sebastián Andrés;2;A;
215447;Ortiz Palacios;Camila Doménica;2;A;ortiz.familia@gmail.com
215448;Paredes Jaramillo;Nicolás;2;A;
215449;Mora Cedeño;Isabella;2;A;
215450;Vaca Espinoza;Emilio José;2;A;
215451;Salas Noboa;Doménica;2;A;`; }
};
function descargarTexto(nombre, texto, tipo='text/csv;charset=utf-8'){
  const blob = new Blob(['﻿'+texto], { type:tipo });
  const a = h('a',{ href:URL.createObjectURL(blob), download:nombre }); document.body.append(a); a.click(); a.remove();
  toast('Archivo descargado: '+nombre);
}
function copiarTexto(t, msg='Copiado al portapapeles.'){
  if (navigator.clipboard) navigator.clipboard.writeText(t).then(()=>toast(msg), ()=>openModal(h('div',{class:'stack'}, h('h3',{},'Copia manualmente'), h('textarea',{style:'min-height:240px',readonly:true},t))));
  else openModal(h('div',{class:'stack'}, h('h3',{},'Copia manualmente'), h('textarea',{style:'min-height:240px',readonly:true},t)));
}
</script>
