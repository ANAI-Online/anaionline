<style>
.priv-doc{max-width:860px;display:flex;flex-direction:column;gap:18px}
.priv-doc section{display:flex;flex-direction:column;gap:8px}
.priv-doc h2{font-size:1.15rem;margin:6px 0 0;display:flex;gap:10px;align-items:baseline}
.priv-doc h2 .priv-num{font-family:var(--font-m);font-size:.8rem;color:var(--ink-3);font-weight:600}
.priv-doc p,.priv-doc li{line-height:1.6;color:var(--ink-2)}
.priv-doc ul{margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:4px}
.priv-doc b{color:var(--ink)}
.priv-resumen{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.priv-resumen > div{padding:12px 14px;border-radius:12px;background:var(--bg-2);border:1px solid var(--line);font-size:.88rem;color:var(--ink-2)}
.priv-resumen b{display:block;margin-bottom:2px}
.priv-quien{width:100%;border-collapse:collapse;font-size:.88rem}
.priv-quien th,.priv-quien td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top;color:var(--ink-2)}
.priv-quien th[scope=row]{color:var(--ink);font-weight:600;white-space:nowrap}
.priv-quien thead th{font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3)}
.priv-borrador{border:2px dashed var(--warn);border-radius:14px;padding:14px 16px;background:color-mix(in srgb,var(--warn) 10%,var(--bg-2));display:flex;flex-direction:column;gap:6px}
.priv-borrador b{color:var(--ink)}
.priv-pie{font-size:.8rem;color:var(--ink-3);border-top:1px solid var(--line);padding-top:12px}
.priv-franja{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:10px 14px;margin:0 0 14px;border-radius:12px;border:1px solid var(--line);border-left:4px solid var(--accent);background:var(--bg-2);font-size:.88rem;color:var(--ink-2)}
.priv-franja .priv-em{font-size:1.2rem}
.priv-franja .priv-tx{flex:1;min-width:200px}
.priv-franja .priv-tx b{color:var(--ink)}
.priv-franja .row{gap:8px;flex-wrap:wrap}
.priv-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;align-items:end}
.priv-form label{display:flex;flex-direction:column;gap:4px;font-size:.8rem;font-weight:600;color:var(--ink-2)}
.priv-form input,.priv-form select,.priv-busca input{padding:8px 10px;border-radius:9px;border:1px solid var(--line-2,var(--line));background:var(--bg-2);color:var(--ink);min-width:0}
.priv-busca{display:flex;flex-direction:column;gap:8px}
.priv-res{display:flex;flex-direction:column;gap:6px}
.priv-res .act{cursor:default}
.priv-kpi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.priv-kpi .stat{padding:12px 14px}
.priv-sec{scroll-margin-top:80px}
.priv-indice{display:flex;flex-wrap:wrap;gap:6px}
@media (max-width:760px){ .priv-resumen{grid-template-columns:1fr} .priv-kpi{grid-template-columns:repeat(2,minmax(0,1fr))} .priv-quien th[scope=row]{white-space:normal} }
@media print{ .priv-borrador,.priv-franja{display:none!important} }
</style>
<script>
/* =====================================================================
   22 · PRIVACIDAD Y DATOS PERSONALES (v1.8)
   ---------------------------------------------------------------------
   · #/privacidad: aviso de privacidad público, en lenguaje sencillo,
     adaptado a la LOPDP del Ecuador y a una institución educativa.
   · Administración → Privacidad y datos: datos del aviso y su versión,
     estado de consentimientos, exportar datos de un estudiante,
     respaldo completo, retención de la analítica y eliminación.
   · Franja "Cómo cuidamos tus datos" para estudiantes (y representantes)
     que aún no vieron la versión vigente del aviso.
   · privExportarEstudiante(codigo): reutilizable por el módulo de familias.
   ===================================================================== */
const PRIV_RETENCION_DEF = 12;
function privDatos(){ return Object.assign({ retencionMeses:PRIV_RETENCION_DEF, fecha:null }, Inst.privacidad()); }
const privFecha = iso => { const t = typeof iso === 'number' ? iso : Date.parse(iso); return t ? new Date(t).toLocaleDateString('es-EC', { day:'numeric', month:'long', year:'numeric' }) : null; };
const privIso = ms => ms ? new Date(ms).toISOString() : null;
const privCurso = (n, p) => { const x = BIO.niveles.find(v => +v.id === +n); return x ? `${x.corto} ${p || ''}`.trim() : '—'; };
/* sube la versión: 1.0 → 1.1; 1.9 → 1.10; "2026-A" → "2026-A.1" */
function privSiguienteVersion(v){ const m = /^(.*?)(\d+)$/.exec(String(v || '1.0')); return m ? m[1] + (+m[2] + 1) : String(v) + '.1'; }

/* =====================================================================
   AVISO DE PRIVACIDAD (#/privacidad)
   ===================================================================== */
function privPendiente(){
  const rol = Store.ses.rol; let yo = null;
  if (rol === 'estudiante') yo = Store.ses.userId;
  else if (rol === 'familia') yo = Cloud.on ? (Cloud.ses && Cloud.ses.uid) : Store.ses.famId;
  if (!yo) return false;
  if (Cloud.on && !Cloud.perfil) return false;            /* sin perfil del servidor no se sabe: no molestar */
  const P = privDatos();
  if (Store.s.privVisto === P.version && (Store.s.privVistoDe || yo) === yo) return false;
  const desde = P.fecha ? Date.parse(P.fecha) : 0;
  if (Cloud.on){ const t = Cloud.perfil.privacidad ? Date.parse(Cloud.perfil.privacidad) : 0; return !(t && t >= desde); }
  if (rol === 'estudiante'){ const u = Users.get(yo); if (u && u.privacidad && u.privVersion === P.version) return false; }
  return true;
}
async function privMarcarVisto(){
  const P = privDatos(), rol = Store.ses.rol, yo = rol === 'estudiante' ? Store.ses.userId : (Cloud.on ? (Cloud.ses && Cloud.ses.uid) : Store.ses.famId);
  Store.s.privVisto = P.version; Store.s.privVistoDe = yo || null;
  if (!Cloud.on && rol === 'estudiante'){ const u = Users.get(yo); if (u){ u.privacidad = Date.now(); u.privVersion = P.version; } }
  Store.save();
  if (Cloud.on){ try { await Cloud.marcarPrivacidad(); } catch(e){ console.warn('privacidad', e.message); } }
}

function privAviso(view){
  const P = privDatos(), fam = Store.ses.rol === 'familia', est = Store.ses.rol === 'estudiante' && !!Store.ses.userId;
  const inst = P.responsable || BIO.school.institucion, correo = String(P.correo || '').trim();
  const contacto = () => correo ? h('a',{href:'mailto:' + correo}, correo) : h('span',{}, 'la secretaría de la institución');
  const meses = +P.retencionMeses || PRIV_RETENCION_DEF;
  const sec = (n, t, ...kids) => h('section',{id:'priv-s' + n,'aria-labelledby':'priv-h' + n}, h('h2',{id:'priv-h' + n}, h('span',{class:'priv-num'}, String(n).padStart(2,'0')), t), ...kids);
  const doc = h('article',{class:'priv-doc'});

  if (esRol('admin')){
    const faltan = [!correo && 'el correo de contacto', !P.fecha && 'la fecha de publicación (se fija al publicar una versión)'].filter(Boolean);
    doc.append(h('div',{class:'priv-borrador',role:'note'},
      h('b',{},'Borrador: revísalo con asesoría legal antes de publicarlo.'),
      h('span',{class:'small'},'Este texto es una base preparada para una institución educativa del Ecuador según la Ley Orgánica de Protección de Datos Personales. Debe revisarlo una persona con formación jurídica y ajustarlo a los contratos reales con los proveedores. Este recuadro solo lo ve la administración.'),
      faltan.length ? h('span',{class:'small'}, h('b',{},'Falta completar: '), faltan.join(' y '), '.') : null,
      h('div',{class:'row'}, h('a',{class:'btn sm',href:'#/admin?t=privacidad'},'Editar datos del aviso'))));
  }
  if (!Cloud.on) doc.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},'Versión de demostración. '), 'En este modo todos los datos se guardan solo en este navegador y no se envían a ningún servidor. El aviso describe cómo funciona la plataforma cuando la institución la usa con su servidor.')));

  if (est) doc.append(h('div',{class:'card stack',style:'gap:6px'}, h('span',{class:'eyebrow'},'Para ti, en pocas palabras'),
    h('ul',{},
      h('li',{},'Guardamos tu nombre, tu curso, lo que haces en la plataforma y tus notas para que tu docente pueda enseñarte y calificarte.'),
      h('li',{},'Tus notas las ven tu docente, el DECE, las autoridades, la administración y tu representante. Tus compañeros no.'),
      h('li',{},'Si tienes adaptaciones (letra grande, lectura en voz alta…), sirven para que aprendas mejor. No se muestran a nadie más de tu curso.'),
      h('li',{},'No usamos tu cámara, tu micrófono ni tu ubicación, y no mostramos publicidad.'),
      h('li',{},'Si algo de tus datos está mal o tienes dudas, díselo a tu docente o a tu representante.'))));

  doc.append(h('div',{class:'priv-resumen','aria-label':'Resumen'},
    h('div',{}, h('b',{},'Para qué'), 'Para enseñar, calificar, acompañar a cada estudiante e informar a su familia. Nunca para publicidad ni para vender datos.'),
    h('div',{}, h('b',{},'Quién los ve'), 'Solo quien lo necesita por su función: docentes de su curso, DECE, autoridades, administración y los representantes vinculados.'),
    h('div',{}, h('b',{},'Cuánto tiempo'), `Durante el año lectivo y el historial académico. Lo eliminado se borra a los 30 días; los registros de uso, a los ${meses} meses como máximo.`),
    h('div',{}, h('b',{},'Sus derechos'), 'Puede pedir ver, corregir, eliminar, llevarse u oponerse al uso de sus datos escribiendo a ', contacto(), '.')));

  doc.append(
    sec(1, 'Quién es responsable de sus datos',
      h('p',{}, 'El responsable del tratamiento es ', h('b',{}, inst), ', que usa esta plataforma educativa (ANAI BioLab y ANAI Ciencias) con sus estudiantes. Para cualquier consulta o solicitud sobre datos personales puede escribir a ', contacto(), '.')),
    sec(2, 'Qué datos tratamos',
      h('ul',{},
        h('li',{}, h('b',{},'Del estudiante: '), 'nombres y apellidos, código de estudiante, año y paralelo, correo institucional y, si la institución los registra, el nombre o correo del representante y un teléfono de contacto.'),
        h('li',{}, h('b',{},'Del representante: '), 'nombres y apellidos, correo, teléfono si lo entrega, parentesco con el estudiante, y la fecha y la versión de este aviso que aceptó al vincularse.'),
        h('li',{}, h('b',{},'Actividad y calificaciones: '), 'actividades realizadas, resultados, intentos, notas registradas por la plataforma o por el docente, notas cerradas de cada quimestre, historial de años anteriores y tareas del curso.'),
        h('li',{}, h('b',{},'Accesibilidad y necesidades educativas: '), 'las adaptaciones de acceso que tenga activas (por ejemplo, letra grande o lectura en voz alta) y, solo para estudiantes con necesidades educativas específicas, una ficha pedagógica del DECE con la necesidad, las estrategias y la forma de evaluar. ', h('b',{},'La ficha no incluye diagnósticos médicos ni informes clínicos.')),
        h('li',{}, h('b',{},'Registros de uso: '), 'páginas visitadas, inicios de sesión y actividades realizadas, con fecha y hora.'),
        h('li',{}, h('b',{},'Registro de auditoría: '), 'quién cambió notas, cuentas, cursos o ajustes, y cuándo.')),
      h('p',{}, 'La plataforma no usa la cámara, el micrófono ni la ubicación del equipo, y no guarda fotografías. En el navegador se guardan la sesión y las preferencias (por ejemplo, el tamaño de letra); no hay cookies de publicidad.')),
    sec(3, 'Para qué los usamos',
      h('ul',{},
        h('li',{},'Dar las clases y actividades de la plataforma y registrar el avance de cada estudiante.'),
        h('li',{},'Registrar, calcular y comunicar las calificaciones. La plataforma calcula algunas notas y los promedios de forma automática; el docente las revisa y puede corregirlas.'),
        h('li',{},'Acompañar a cada estudiante: seguimiento del docente y del DECE, y adaptaciones para quienes las necesitan.'),
        h('li',{},'Informar a los representantes sobre el avance, las tareas y los comunicados del curso.'),
        h('li',{},'Proteger la plataforma y rendir cuentas: saber quién hizo cada cambio.'),
        h('li',{},'Mejorar la enseñanza con estadísticas del curso o de la institución.')),
      h('p',{}, h('b',{},'No usamos los datos para publicidad, no los vendemos y no hacemos perfiles comerciales.'))),
    sec(4, 'Con qué base lo hacemos',
      h('p',{}, 'Tratamos los datos porque son necesarios para la relación educativa entre la institución y el estudiante, y para cumplir las obligaciones que la normativa educativa impone a la institución (registrar y comunicar calificaciones y acompañar a los estudiantes). Como la mayoría de estudiantes son menores de edad, el acceso de la familia a la plataforma se hace con el ', h('b',{},'consentimiento del representante'), ', que acepta este aviso al vincularse. Las y los adolescentes pueden ejercer sus derechos de forma progresiva, acompañados por su representante.'),
      h('p',{}, 'La información sobre necesidades educativas se trata con cuidado especial: solo para ajustar la enseñanza y con acceso restringido.')),
    sec(5, 'Quién puede ver los datos',
      h('div',{class:'tablewrap'}, h('table',{class:'priv-quien'},
        h('thead',{}, h('tr',{}, h('th',{scope:'col'},'Quién'), h('th',{scope:'col'},'Qué puede ver'))),
        h('tbody',{},
          h('tr',{}, h('th',{scope:'row'},'El estudiante'), h('td',{},'Su propio avance, sus notas, sus tareas y los comunicados de su curso.')),
          h('tr',{}, h('th',{scope:'row'},'Docentes'), h('td',{},'Solo los estudiantes de sus cursos: avance, notas, adaptaciones y, si existe, la ficha del DECE para aplicar sus estrategias.')),
          h('tr',{}, h('th',{scope:'row'},'DECE'), h('td',{},'Las fichas de necesidades educativas, las adaptaciones y las notas, para acompañar a los estudiantes.')),
          h('tr',{}, h('th',{scope:'row'},'Autoridades'), h('td',{},'La información de toda la institución, solo para consulta, y el registro de auditoría.')),
          h('tr',{}, h('th',{scope:'row'},'Administración'), h('td',{},'Las cuentas, los cursos y los datos necesarios para mantener la plataforma, los respaldos y el registro de auditoría.')),
          h('tr',{}, h('th',{scope:'row'},'Representantes vinculados'), h('td',{},'El avance, las notas, las tareas y los comunicados de su representado. Nunca la ficha de necesidades educativas.')),
          h('tr',{}, h('th',{scope:'row'},'Proveedor de infraestructura'), h('td',{}, h('b',{},'Supabase'), ' aloja la base de datos y las cuentas por encargo de la institución, que es quien decide sobre los datos. Sus servidores pueden estar fuera del Ecuador.')),
          h('tr',{}, h('th',{scope:'row'},'Servicios de la página'), h('td',{},'Para mostrar las tipografías y el motor 3D, el navegador descarga archivos de Google Fonts y de cdnjs (Cloudflare). Esos servicios reciben la dirección IP del equipo, como ocurre con cualquier sitio web, pero no reciben datos de la plataforma.'))))),
      h('p',{}, 'No entregamos datos a otras personas o empresas, salvo cuando una autoridad competente los solicite conforme a la ley.')),
    sec(6, 'Cuánto tiempo los guardamos',
      h('ul',{},
        h('li',{}, h('b',{},'Avance y notas: '), 'durante el año lectivo. Al cerrarlo, un resumen de las calificaciones pasa al historial académico del estudiante, que se conserva mientras la normativa educativa lo requiera.'),
        h('li',{}, h('b',{},'Cuentas eliminadas: '), 'quedan 30 días en la papelera (bloqueadas y ocultas) por si fue un error; después se borran definitivamente junto con sus datos.'),
        h('li',{}, h('b',{},'Registros de uso: '), `como máximo ${meses} meses. La administración borra periódicamente los más antiguos.`),
        h('li',{}, h('b',{},'Estudiantes que terminan el Bachillerato: '), 'su cuenta queda archivada (ya no puede entrar) y se conserva su historial académico.'),
        h('li',{}, h('b',{},'Registro de auditoría: '), 'se conserva para rendir cuentas; nadie puede editarlo ni borrarlo.'))),
    sec(7, 'Cómo los protegemos',
      h('ul',{},
        h('li',{},'Cada persona entra con su propia cuenta; las contraseñas temporales deben cambiarse en el primer ingreso.'),
        h('li',{},'Reglas en la base de datos hacen que cada rol vea solo lo que necesita.'),
        h('li',{},'La conexión con el servidor va cifrada.'),
        h('li',{},'Cada cambio importante queda en el registro de auditoría.')),
      h('p',{}, 'Ningún sistema es infalible. Si ocurriera un incidente de seguridad, la institución informará a las personas afectadas y a la autoridad de protección de datos, como exige la ley.')),
    sec(8, 'Sus derechos y cómo ejercerlos',
      h('p',{}, 'El estudiante y su representante pueden pedir:'),
      h('ul',{},
        h('li',{}, h('b',{},'Acceso: '), 'saber qué datos tenemos y recibir una copia.'),
        h('li',{}, h('b',{},'Rectificación: '), 'corregir o actualizar datos equivocados o incompletos.'),
        h('li',{}, h('b',{},'Eliminación: '), 'que se borren los datos que ya no sean necesarios.'),
        h('li',{}, h('b',{},'Oposición: '), 'que dejemos de usar sus datos para un fin determinado, por ejemplo las estadísticas.'),
        h('li',{}, h('b',{},'Portabilidad: '), 'recibir sus datos en un archivo que se pueda leer en una computadora (formato JSON).')),
      h('p',{}, 'Para ejercerlos, escriba a ', contacto(), ' indicando el nombre del estudiante, su curso y lo que solicita. La institución verificará su identidad y le responderá dentro del plazo que fija la ley (15 días). Una copia de los datos se entrega en un archivo descargable. Una eliminación se hace con la papelera: la cuenta se bloquea de inmediato y sus datos se borran a los 30 días. Si la normativa educativa obliga a conservar algún registro académico, se lo explicaremos al responder.'),
      h('p',{}, 'Si considera que no atendimos bien su solicitud, puede presentar un reclamo ante la Superintendencia de Protección de Datos Personales.')),
    sec(9, 'Cambios a este aviso',
      h('p',{}, 'Si cambiamos este aviso, publicaremos una nueva versión con su fecha. Estudiantes y representantes verán un aviso al entrar a la plataforma para que conozcan los cambios.')),
    h('p',{class:'priv-pie'}, `Versión ${P.version}` + (P.fecha ? ` · vigente desde el ${privFecha(P.fecha)}` : '') + ` · ${inst}. Referencia: Ley Orgánica de Protección de Datos Personales del Ecuador.`)
  );

  if (privPendiente()){
    const b = h('button',{class:'btn primary'},'Entendido');
    b.onclick = async () => { b.disabled = true; await privMarcarVisto(); b.replaceWith(h('span',{class:'pill ok'}, fam ? 'Gracias. Registramos que leyó el aviso.' : 'Gracias. Ya lo leíste.')); };
    doc.append(h('div',{class:'row'}, b, h('span',{class:'small muted'}, fam ? 'Pulse "Entendido" para no volver a ver el aviso de esta versión.' : 'Pulsa "Entendido" para no volver a ver el aviso de esta versión.')));
  }

  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'}, 'Privacidad · ' + inst), h('h1',{},'Aviso de privacidad'),
    h('p',{}, 'Cómo cuidamos los datos de estudiantes y familias en la plataforma, para qué los usamos y cómo ejercer sus derechos.')),
    h('div',{class:'row noprint'}, h('button',{class:'btn sm',onclick:()=>window.print()},'Imprimir'))), doc);
}
route('/privacidad', (view) => { privAviso(view); });

/* ---------- franja "Cómo cuidamos tus datos" ---------- */
POST_RENDER.push((view, path) => {
  if (path === '/privacidad' || !view || view.querySelector('.priv-franja')) return;
  if (!privPendiente()) return;
  const fam = Store.ses.rol === 'familia';
  const el = h('div',{class:'priv-franja noprint',role:'region','aria-label':'Aviso de privacidad'},
    h('span',{class:'priv-em','aria-hidden':'true'},'🔒'),
    h('span',{class:'priv-tx'}, h('b',{}, fam ? 'Cómo cuidamos sus datos. ' : 'Cómo cuidamos tus datos. '),
      fam ? 'Actualizamos el aviso de privacidad. Le contamos qué datos usamos, para qué y cuáles son sus derechos.' : 'Te contamos qué datos usamos, para qué y quién puede verlos.'),
    h('span',{class:'row'}, h('a',{class:'btn sm',href:'#/privacidad'}, fam ? 'Leer el aviso' : 'Leer el aviso'),
      h('button',{class:'btn sm ghost',onclick:async (e) => { e.currentTarget.disabled = true; await privMarcarVisto(); el.remove(); toast(fam ? 'Listo. Puede volver a leer el aviso desde el menú.' : 'Listo. Puedes volver a leerlo desde el menú.'); }},'Entendido')));
  view.prepend(el);
});

/* =====================================================================
   EXPORTAR LOS DATOS DE UN ESTUDIANTE (derecho de acceso y portabilidad)
   privExportarEstudiante(codigo, { descargar:true }) → objeto con los datos
   Lo usa la administración y puede usarlo el módulo de familias.
   ===================================================================== */
function privBuscarEst(codigo){
  const c = String(codigo || '').trim(); if (!c) return null;
  const P = Papelera.s, F = Store.s.familia;
  const u = (Store.s.usuarios || {})[c] || (Store.s.egresados || {})[c] || P.usuarios[c] || (F && (F.hijos || []).find(x => x.codigo === c));
  if (!u) return null;
  const estado = (Store.s.usuarios || {})[c] ? 'activo' : (Store.s.egresados || {})[c] ? 'archivado (egresado)' : P.usuarios[c] ? 'en la papelera' : (u.estado || 'activo');
  return Object.assign({}, u, { _estado:estado });
}
/* ¿puede quien está en sesión descargar los datos de ese estudiante? */
function privPuedeExportar(codigo){
  if (esRol('admin')) return true;
  if (esRol('familia')){
    if (Cloud.on) return !!(Store.s.familia && (Store.s.familia.hijos || []).some(x => x.codigo === codigo));
    const yo = Store.ses.famId; return (Store.s.famVinculos || []).some(v => v.estCodigo === codigo && (!yo || v.familiaId === yo)) || (typeof famHijoActual === 'function' && (famHijoActual() || {}).codigo === codigo);
  }
  return false;
}
async function privExportarEstudiante(codigo, opts = {}){
  const descargar = opts.descargar !== false;
  const u = privBuscarEst(codigo);
  if (!u){ toast('No encontramos a ese estudiante.'); return null; }
  if (!privPuedeExportar(u.codigo)){ toast('No tienes permiso para descargar esos datos.'); return null; }
  const fam = esRol('familia'), P = privDatos(), avisos = [];
  const actividad = id => { const it = typeof itemDe === 'function' ? itemDe(id) : null; return (it && it.t) || ((BIO.activities || {})[id] || {}).t || id; };
  const nota = n => n == null ? null : +n;
  const out = {
    documento: 'Datos personales del estudiante',
    institucion: P.responsable || BIO.school.institucion,
    generado: new Date().toISOString(),
    generadoPor: { nombre:Store.s.user.nombre, rol:(ROLES[Store.ses.rol] || {}).n || Store.ses.rol },
    avisoDePrivacidad: { version:P.version, contacto:P.correo || null },
    explicacion: 'Este archivo reúne los datos que la plataforma guarda sobre el estudiante. Las fechas están en formato internacional (año-mes-día y hora UTC). Las notas son sobre 10.',
    perfil: null, calificaciones: [], notasCerradas: [], historialAcademico: [], tareasDelCurso: [], adaptacionesDeAcceso: [],
    fichaNEE: null, representantes: [], registrosDeUso: null
  };
  out.perfil = { codigo:u.codigo, nombres:u.nombres || null, apellidos:u.apellidos || null, nombreCompleto:u.nombre, curso:privCurso(u.year, u.paralelo), nivel:u.year ?? null, paralelo:u.paralelo || null,
    correoInstitucional:u.email || null, representanteRegistrado:u.rep || null, telefonoDeContacto:u.tel || null, estado:u._estado,
    cuentaCreada:privIso(u.creado), ultimoAcceso:privIso(u.ultimoAcceso), vioElAvisoDePrivacidad:privIso(u.privacidad) };
  const leer = async (etq, fn) => { try { return await fn(); } catch(e){ avisos.push(`${etq}: no se pudo leer (${e.message})`); return null; } };

  if (Cloud.on && u.uid){
    const id = 'estudiante_id=eq.' + u.uid;
    const [notas, cierres, hist, tareas, adapt, nee, vin, ev] = await Promise.all([
      leer('calificaciones', () => Cloud.leer('notas', id + '&select=actividad,nota,intentos,resultado,origen,fecha&order=fecha')),
      leer('notas cerradas', () => Cloud.leer('calificaciones_cierre', id + '&select=anio,periodo,actividad,nota,fecha,cerrado')),
      leer('historial', () => Cloud.historial(id + '&order=anio.desc')),
      leer('tareas', () => (u.year && u.paralelo) ? Cloud.leer('tareas', `nivel=eq.${u.year}&paralelo=eq.${encodeURIComponent(u.paralelo)}&select=actividad,vence,nota,creado&order=vence`) : []),
      leer('adaptaciones', () => Cloud.leer('adaptaciones', id + '&select=lista,actualizado')),
      fam ? null : leer('ficha NEE', () => Cloud.leer('nee', id + '&select=grado,necesidad,estrategias,evaluacion,revision,responsable,actualizado')),
      leer('representantes', () => Cloud.leer('familia_vinculos', id + '&select=familia_id,parentesco,consentimiento,version_aviso,creado')),
      fam ? null : leer('registros de uso', () => Cloud.leer('eventos', 'usuario_id=eq.' + u.uid + '&select=tipo,fecha'))
    ]);
    out.calificaciones = (notas || []).map(n => ({ actividad:n.actividad, nombre:actividad(n.actividad), nota:nota(n.nota), fecha:n.fecha || null, intentos:n.intentos ?? null, resultado:n.resultado ?? null, registradaPor:n.origen === 'docente' ? 'docente' : 'plataforma' }));
    out.notasCerradas = (cierres || []).map(c => ({ anioLectivo:c.anio, quimestre:c.periodo, actividad:c.actividad, nombre:actividad(c.actividad), nota:nota(c.nota), cerrado:c.cerrado || null }));
    out.historialAcademico = (hist || []).map(x => ({ anioLectivo:x.anio, curso:privCurso(x.nivel, x.paralelo), resultado:x.resultado || null, resumen:x.resumen || {}, notas:x.notas || {} }));
    out.tareasDelCurso = (tareas || []).map(t => ({ actividad:t.actividad, nombre:actividad(t.actividad), vence:t.vence || null, indicaciones:t.nota || '' }));
    const ad = (adapt || [])[0]; out.adaptacionesDeAcceso = ((ad && ad.lista) || []).map(k => BIO.adaptaciones[k] || k);
    if (!fam){ const f = (nee || [])[0]; out.fichaNEE = f ? { grado:f.grado ?? null, necesidad:f.necesidad || '', estrategias:f.estrategias || '', evaluacion:f.evaluacion || '', proximaRevision:f.revision || null, responsable:f.responsable || '', actualizada:f.actualizado || null } : 'Sin ficha registrada'; }
    out.representantes = (vin || []).map(v => ({ nombre:privNombreFamilia(v.familia_id), parentesco:v.parentesco || '', consentimiento:v.consentimiento || null, versionDelAviso:v.version_aviso || null, vinculadoDesde:v.creado || null }));
    if (!fam && ev) out.registrosDeUso = privConteo(ev);
  } else {
    const D = Store.s.docente || {}, notas = Object.assign({}, u.notas || {}, (D.notas || {})[u.codigo] || {}), fechas = (D.fechas || {})[u.codigo] || {}, intentos = (D.intentos || {})[u.codigo] || {};
    out.calificaciones = Object.entries(notas).filter(([k, v]) => v != null).map(([k, v]) => ({ actividad:k, nombre:actividad(k), nota:nota(v), fecha:privIso(fechas[k]), intentos:intentos[k] ?? null }));
    Object.entries(Store.s.cierres || {}).forEach(([anio, Q]) => Object.entries(Q || {}).forEach(([q, porEst]) => Object.entries((porEst || {})[u.codigo] || {}).forEach(([k, v]) =>
      out.notasCerradas.push({ anioLectivo:anio, quimestre:q, actividad:k, nombre:actividad(k), nota:nota(v) }))));
    const H = Store.s.historial; const hs = Array.isArray(H) ? H : H && typeof H === 'object' ? Object.values(H).flat() : [];
    out.historialAcademico = hs.filter(x => x && (x.estCodigo === u.codigo || x.codigo === u.codigo)).map(x => ({ anioLectivo:x.anio, curso:privCurso(x.nivel, x.paralelo), resultado:x.resultado || null, resumen:x.resumen || {}, notas:x.notas || {} }));
    try { out.tareasDelCurso = Tareas.de(u.year, u.paralelo).map(t => ({ actividad:t.act, nombre:actividad(t.act), vence:privIso(t.vence), indicaciones:t.nota || '' })); } catch(e){ avisos.push('tareas: no se pudieron leer'); }
    out.adaptacionesDeAcceso = ((D.adapt || {})[u.codigo] || u.adapt || []).map(k => BIO.adaptaciones[k] || k);
    if (!fam){ const f = (Store.s.nee || {})[u.codigo]; out.fichaNEE = f ? { grado:f.grado ?? null, necesidad:f.necesidad || '', estrategias:f.estrategias || '', evaluacion:f.evaluacion || '', proximaRevision:f.revision || null, responsable:f.responsable || '', actualizada:privIso(f.actualizado) } : 'Sin ficha registrada'; }
    out.representantes = (Store.s.famVinculos || []).filter(v => v.estCodigo === u.codigo).map(v => ({ nombre:privNombreFamilia(v.familiaId), parentesco:v.parentesco || '', consentimiento:privIso(v.consentimiento), versionDelAviso:v.version || null, vinculadoDesde:privIso(v.creado) }));
    if (!fam) out.registrosDeUso = privConteo((Store.s.events || []).filter(e => e.usuario === u.codigo || e.codigo === u.codigo));
  }
  if (fam){ delete out.fichaNEE; delete out.registrosDeUso;
    out.nota = 'La ficha de necesidades educativas la custodia el DECE y no se incluye en esta descarga. Puede solicitar información sobre ella directamente a la institución.'; }
  if (avisos.length) out.avisos = avisos;
  await Auditoria.registrar('exportar_datos_estudiante', { codigo:u.codigo, nombre:u.nombre });
  if (descargar) descargarTexto(`datos-${u.codigo}-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify(out, null, 2), 'application/json');
  return out;
}
function privNombreFamilia(id){
  if (!id) return 'Representante';
  if ((Cloud.ses && id === Cloud.ses.uid) || id === Store.ses.famId) return Store.s.user.nombre || 'Representante';
  const f = (Store.s.familias || {})[id]; return (f && f.nombre) || 'Representante';
}
function privConteo(evs){ const porTipo = {}; (evs || []).forEach(e => { const t = e.tipo || 'otro'; porTipo[t] = (porTipo[t] || 0) + 1; });
  const fs = (evs || []).map(e => Date.parse(e.fecha)).filter(Boolean).sort((a, b) => a - b);
  return { total:(evs || []).length, porTipo, desde:privIso(fs[0]), hasta:privIso(fs[fs.length - 1]) }; }

/* =====================================================================
   ADMINISTRACIÓN → PRIVACIDAD Y DATOS
   ===================================================================== */
function privEstadoConsentimiento(u, P){
  const vs = (Store.s.famVinculos || []).filter(v => v.estCodigo === u.codigo || (u.uid && v.estUid === u.uid));
  if (!vs.length) return { k:'sin', t:'Sin representante vinculado', vs };
  const vig = vs.filter(v => v.consentimiento && String(v.version) === String(P.version));
  if (vig.length) return { k:'ok', t:'Con consentimiento vigente', vs };
  if (vs.some(v => v.consentimiento)) return { k:'ant', t:'Aceptó una versión anterior', vs };
  return { k:'falta', t:'Vinculado sin consentimiento', vs };
}
const PRIV_PILL = { ok:'ok', ant:'warn', falta:'bad', sin:'' };

function privTab(body, rerender){
  const P = privDatos();
  { const v18 = avisoV18(); if (v18) body.append(v18); }
  const indice = h('nav',{class:'priv-indice','aria-label':'Secciones'},
    [['priv-a','Datos del aviso'],['priv-b','Consentimientos'],['priv-c','Datos de un estudiante'],['priv-d','Respaldo completo'],['priv-e','Registros de uso'],['priv-f','Derecho de eliminación']]
      .map(([id, t]) => h('button',{class:'chip',type:'button',onclick:()=>{ const el = document.getElementById(id); if (el){ el.scrollIntoView({ behavior:'smooth', block:'start' }); const f = el.querySelector('h3'); if (f){ f.setAttribute('tabindex','-1'); f.focus({ preventScroll:true }); } } }}, t)));
  body.append(indice);

  /* (a) datos del aviso */
  const resp = h('input',{type:'text',value:P.responsable || ''}), correo = h('input',{type:'email',value:P.correo || '',placeholder:'privacidad@institucion.edu.ec'});
  const version = h('input',{type:'text',value:P.version || '1.0',maxlength:'16'}), ret = h('input',{type:'number',min:'1',max:'60',value:String(P.retencionMeses || PRIV_RETENCION_DEF)});
  const msg = h('div',{class:'small',role:'status','aria-live':'polite'});
  const guardar = async (nuevaVersion) => {
    const r = String(resp.value).trim(), c = String(correo.value).trim().toLowerCase(), m = Math.round(+ret.value);
    if (!r){ msg.textContent = 'Escribe el nombre del responsable (la institución).'; return; }
    if (c && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(c)){ msg.textContent = 'El correo de contacto no parece válido.'; return; }
    if (!(m >= 1 && m <= 60)){ msg.textContent = 'La retención de los registros de uso debe estar entre 1 y 60 meses.'; return; }
    const v = String(nuevaVersion || version.value).trim() || '1.0';
    const cambia = v !== String(P.version);
    const val = { responsable:r, correo:c, version:v, retencionMeses:m, fecha: cambia || !P.fecha ? new Date().toISOString() : P.fecha };
    try { await Inst.guardar('privacidad', val); }
    catch(e){ msg.textContent = 'No se pudo guardar: ' + e.message; return; }
    toast(cambia ? `Versión ${v} publicada. Estudiantes y familias verán el aviso al entrar.` : 'Datos del aviso guardados.');
    rerender();
  };
  const sig = privSiguienteVersion(P.version);
  body.append(h('div',{class:'card stack priv-sec',id:'priv-a'},
    h('h3',{},'Datos del aviso de privacidad'),
    h('p',{class:'small muted',style:'margin:0'}, 'Aparecen en el ', h('a',{href:'#/privacidad'},'aviso de privacidad'), '. Si cambias el contenido de forma importante, publica una versión nueva: estudiantes y familias volverán a ver el aviso al entrar.'),
    h('div',{class:'priv-form'},
      h('label',{},'Responsable (institución)', resp), h('label',{},'Correo de contacto', correo),
      h('label',{},'Versión', version), h('label',{},'Registros de uso: guardar hasta (meses)', ret)),
    msg,
    h('div',{class:'row'},
      h('button',{class:'btn primary sm',onclick:()=>guardar()},'Guardar'),
      h('button',{class:'btn sm',onclick:()=>confirmar({ titulo:`Publicar la versión ${sig}`, texto:`El aviso pasará a la versión ${sig} desde hoy. Estudiantes y familias verán una franja para leerlo otra vez, y los consentimientos anteriores quedarán marcados como "versión anterior".`, boton:'Publicar',
        accion: async () => { version.value = sig; await guardar(sig); } })}, `Publicar nueva versión (${sig})`),
      h('a',{class:'btn sm ghost',href:'#/privacidad'},'Ver el aviso')),
    h('p',{class:'small muted',style:'margin:0'}, `Versión vigente: ${P.version}` + (P.fecha ? ` · publicada el ${privFecha(P.fecha)}` : ' · aún sin fecha de publicación') + (P.correo ? '' : ' · falta el correo de contacto'))));

  /* (b) consentimientos */
  const cons = h('div',{class:'card stack priv-sec',id:'priv-b'}); body.append(cons);
  privConsentimientos(cons, P);

  /* (c) exportar datos de un estudiante */
  const q = h('input',{type:'search',placeholder:'Código o nombre del estudiante','aria-label':'Buscar estudiante por código o nombre'});
  const res = h('div',{class:'priv-res','aria-live':'polite'});
  const todos = () => { const P2 = Papelera.s; const L = []; const vistos = new Set();
    [[Store.s.usuarios, 'activo'], [Store.s.egresados, 'egresado'], [P2.usuarios, 'papelera']].forEach(([m, e]) => Object.values(m || {}).forEach(u => { if (!vistos.has(u.codigo)){ vistos.add(u.codigo); L.push({ u, e }); } }));
    return L; };
  const buscar = () => {
    res.innerHTML = ''; const t = sinTildes(q.value.toLowerCase().trim()); if (!t) return;
    const L = todos().filter(({ u }) => String(u.codigo).toLowerCase().includes(t) || sinTildes(String(u.nombre || '').toLowerCase()).includes(t)).slice(0, 8);
    if (!L.length){ res.append(h('p',{class:'small muted'},'No hay estudiantes con ese código o nombre (se buscan activos, egresados y en la papelera).')); return; }
    L.forEach(({ u, e }) => { const b = h('button',{class:'btn sm','aria-label':'Descargar los datos de ' + u.nombre},'Descargar datos (JSON)');
      b.onclick = async () => { b.disabled = true; b.textContent = 'Preparando…'; try { await privExportarEstudiante(u.codigo); } finally { b.disabled = false; b.textContent = 'Descargar datos (JSON)'; } };
      res.append(h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--bg-3)','aria-hidden':'true'},'🎒'),
        h('span',{style:'flex:1;min-width:0'}, h('div',{class:'t'}, u.nombre), h('div',{class:'d'}, `Código ${u.codigo} · ${privCurso(u.year, u.paralelo)}` + (e === 'papelera' ? ' · en la papelera' : e === 'egresado' ? ' · egresado' : ''))), b)); });
  };
  let tq = null; q.addEventListener('input', () => { clearTimeout(tq); tq = setTimeout(buscar, 150); });
  body.append(h('div',{class:'card stack priv-sec',id:'priv-c'},
    h('h3',{},'Exportar los datos de un estudiante'),
    h('p',{class:'small muted',style:'margin:0'}, 'Para atender una solicitud de acceso o de portabilidad. Se descarga un archivo JSON legible con el perfil, las notas, las notas cerradas, el historial, las tareas de su curso, las adaptaciones de acceso, la ficha NEE, los vínculos con representantes y el número de registros de uso. La descarga queda en el registro de auditoría.'),
    h('div',{class:'priv-busca'}, q, res),
    h('p',{class:'small muted',style:'margin:0'}, 'Entrega el archivo solo al estudiante o a su representante, después de verificar su identidad. Cuando la descarga la hace una familia, la ficha NEE nunca se incluye.')));

  /* (d) respaldo completo */
  const conEv = h('input',{type:'checkbox'}); const est = h('div',{class:'small',role:'status','aria-live':'polite'});
  const bR = h('button',{class:'btn sm primary'},'Descargar respaldo completo');
  bR.onclick = async () => { bR.disabled = true; try { await privRespaldo(conEv.checked, t => est.textContent = t); } catch(e){ est.textContent = 'No se pudo generar el respaldo: ' + e.message; } bR.disabled = false; };
  body.append(h('div',{class:'card stack priv-sec',id:'priv-d'},
    h('h3',{},'Respaldo completo'),
    h('p',{class:'small muted',style:'margin:0'}, Cloud.on
      ? 'Descarga en un archivo JSON todas las tablas que la administración puede leer: perfiles, cursos, notas, notas cerradas, historial, tareas, adaptaciones, fichas NEE, códigos y vínculos de familia, comunicados y ajustes. Sirve como copia de seguridad propia de la institución.'
      : 'Descarga en un archivo JSON todo lo que la plataforma guarda en este navegador: cursos, docentes, estudiantes, notas, notas cerradas, papelera, fichas NEE, familias, comunicados, tareas, ajustes y registro de auditoría. El botón "Restaurar respaldo" de Ajustes recupera cursos, docentes y estudiantes.'),
    h('label',{class:'small',style:'display:flex;gap:8px;align-items:center'}, conEv, 'Incluir también los registros de uso (analítica)'),
    h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Contiene datos personales de toda la institución. '), 'Guárdalo en un lugar protegido, no lo envíes por correo ni por mensajería, y bórralo cuando ya no lo necesites. La descarga queda en el registro de auditoría.')),
    h('div',{class:'row'}, bR), est));

  /* (e) retención de la analítica */
  const mesesIn = h('input',{type:'number',min:'1',max:'60',value:String(P.retencionMeses || PRIV_RETENCION_DEF),'aria-label':'Meses que se conservan','style':'width:90px'});
  const infoEv = h('span',{class:'small muted'});
  const pintarInfo = () => { if (Cloud.on){ infoEv.textContent = ''; return; } const m = Math.max(1, +mesesIn.value || 1), lim = Date.now() - m * 30 * 86400000;
    const n = (Store.s.events || []).filter(e => Date.parse(e.fecha) < lim).length; infoEv.textContent = `En este navegador hay ${(Store.s.events || []).length} registros de uso; ${n} tienen más de ${m} mes${m === 1 ? '' : 'es'}.`; };
  mesesIn.addEventListener('input', pintarInfo); pintarInfo();
  body.append(h('div',{class:'card stack priv-sec',id:'priv-e'},
    h('h3',{},'Retención de los registros de uso'),
    h('p',{class:'small muted',style:'margin:0'}, `Los registros de uso (páginas visitadas, inicios de sesión, actividades) solo se necesitan un tiempo. El aviso de privacidad promete conservarlos como máximo ${P.retencionMeses || PRIV_RETENCION_DEF} meses: bórralos con regularidad, por ejemplo al cerrar cada quimestre. Las notas, el historial y la auditoría no se tocan.`),
    h('div',{class:'row',style:'align-items:center'}, h('label',{class:'small',style:'display:flex;gap:8px;align-items:center;font-weight:600'},'Borrar los de más de', mesesIn, 'meses'),
      h('button',{class:'btn sm danger',onclick:()=>{ const m = Math.round(+mesesIn.value);
        if (!(m >= 1 && m <= 60)) return toast('Indica entre 1 y 60 meses.');
        confirmar({ titulo:`¿Borrar los registros de uso de más de ${m} mes${m === 1 ? '' : 'es'}?`, texto:'Se eliminan de forma definitiva. Las notas, el avance de los estudiantes, el historial y el registro de auditoría no se tocan.', boton:'Borrar registros', peligro:true,
          accion: async () => { let n = 0;
            if (Cloud.on){ n = await Cloud.rpc('purgar_eventos', { p_meses:m }); n = +n || 0; }
            else { const lim = Date.now() - m * 30 * 86400000, antes = (Store.s.events || []).length; Store.s.events = (Store.s.events || []).filter(e => !(Date.parse(e.fecha) < lim)); n = antes - Store.s.events.length; Store.save(); Auditoria.local('purgar_eventos', { meses:m, borrados:n }); }
            toast(`${n} registro${n === 1 ? '' : 's'} de uso eliminado${n === 1 ? '' : 's'}.`); pintarInfo(); } }); }},'Borrar registros antiguos')),
    infoEv));

  /* (f) derecho de eliminación */
  body.append(h('div',{class:'card stack priv-sec',id:'priv-f'},
    h('h3',{},'Derecho de eliminación'),
    h('p',{class:'small',style:'margin:0'}, 'Cuando un estudiante o su representante piden que se borren sus datos, se usa la ', h('b',{},'papelera'), ':'),
    h('ol',{class:'small',style:'margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:4px'},
      h('li',{}, 'Verifica la identidad de quien lo pide y, si corresponde, descarga antes una copia de sus datos (sección anterior) para entregársela.'),
      h('li',{}, 'En ', h('a',{href:'#/admin?t=estudiantes'},'Estudiantes'), ', elimina al estudiante: su cuenta se bloquea de inmediato y desaparece de listas y reportes.'),
      h('li',{}, 'A los 30 días se borra definitivamente con sus notas, historial, adaptaciones, ficha NEE y vínculos. Si la solicitud lo exige, puedes hacerlo antes desde la ', h('a',{href:'#/admin?t=papelera'},'Papelera'), ' con "Eliminar definitivamente".'),
      h('li',{}, 'Si la normativa educativa obliga a conservar algún registro académico (por ejemplo, actas de calificaciones), explícalo en la respuesta.')),
    h('div',{class:'row'}, h('a',{class:'btn sm',href:'#/admin?t=papelera'},'Abrir la papelera'), h('a',{class:'btn sm ghost',href:'#/admin?t=auditoria'},'Ver el registro de auditoría'))));
}

function privConsentimientos(box, P){
  const est = Users.all ? Users.all() : Object.values(Store.s.usuarios || {});
  const grupos = {}; est.forEach(u => { const k = `${u.year}|${u.paralelo}`; (grupos[k] = grupos[k] || []).push(u); });
  const claves = Object.keys(grupos).sort((a, b) => { const [ya, pa] = a.split('|'), [yb, pb] = b.split('|'); const o = y => +y >= 8 ? +y - 100 : +y; return o(ya) - o(yb) || pa.localeCompare(pb); });
  const tot = { ok:0, ant:0, falta:0, sin:0 }; const filas = [];
  claves.forEach(k => grupos[k].forEach(u => { const s = privEstadoConsentimiento(u, P); tot[s.k]++; filas.push({ k, u, s }); }));
  box.append(h('h3',{},'Estado de los consentimientos'),
    h('p',{class:'small muted',style:'margin:0'}, 'Qué estudiantes tienen un representante vinculado que aceptó el aviso de privacidad, y de qué versión. El representante acepta el aviso al vincularse con el código de familia.'));
  if (!est.length){ box.append(h('div',{class:'ph'},'Todavía no hay estudiantes activos.')); return; }
  box.append(h('div',{class:'priv-kpi'},
    [[tot.ok,'con consentimiento vigente'],[tot.ant,'aceptaron una versión anterior'],[tot.falta,'vinculados sin consentimiento'],[tot.sin,'sin representante vinculado']]
      .map(([v, l]) => h('div',{class:'card stat'}, h('span',{class:'v'}, String(v)), h('span',{class:'l'}, l)))));
  const sel = h('select',{'aria-label':'Curso',style:'width:auto;max-width:100%;min-width:200px'}, h('option',{value:''},'Resumen por curso'), claves.map(k => { const [y, p] = k.split('|'); return h('option',{value:k}, privCurso(y, p)); }));
  const csv = h('button',{class:'btn sm'},'Descargar CSV');
  const cont = h('div',{});
  const pintar = () => {
    cont.innerHTML = '';
    if (!sel.value){
      cont.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
        h('thead',{}, h('tr',{}, h('th',{scope:'col'},'Curso'), h('th',{scope:'col'},'Estudiantes'), h('th',{scope:'col'},'Vigente'), h('th',{scope:'col'},'Versión anterior'), h('th',{scope:'col'},'Sin consentimiento'), h('th',{scope:'col'},'Sin representante'), h('th',{scope:'col'},''))),
        h('tbody',{}, claves.map(k => { const [y, p] = k.split('|'); const fs = filas.filter(f => f.k === k); const c = x => fs.filter(f => f.s.k === x).length;
          return h('tr',{}, h('td',{}, h('b',{}, privCurso(y, p))), h('td',{class:'mono'}, String(fs.length)), h('td',{class:'mono'}, String(c('ok'))), h('td',{class:'mono'}, String(c('ant'))), h('td',{class:'mono'}, String(c('falta'))), h('td',{class:'mono'}, String(c('sin'))),
            h('td',{}, h('button',{class:'btn sm ghost',onclick:()=>{ sel.value = k; pintar(); }},'Ver curso'))); })))));
      return;
    }
    const fs = filas.filter(f => f.k === sel.value).sort((a, b) => String(a.u.nombre).localeCompare(String(b.u.nombre)));
    cont.append(h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{scope:'col'},'Estudiante'), h('th',{scope:'col'},'Representante'), h('th',{scope:'col'},'Consentimiento'), h('th',{scope:'col'},'Estado'), h('th',{scope:'col'},'El estudiante vio el aviso'))),
      h('tbody',{}, fs.map(({ u, s }) => h('tr',{},
        h('td',{}, h('b',{}, u.nombre), h('div',{class:'small muted'}, 'Código ' + u.codigo)),
        h('td',{}, s.vs.length ? s.vs.map(v => h('div',{}, privNombreFamilia(v.familiaId), v.parentesco ? h('span',{class:'small muted'}, ' · ' + v.parentesco) : null)) : h('span',{class:'muted'},'—')),
        h('td',{}, s.vs.length ? s.vs.map(v => h('div',{class:'small'}, v.consentimiento ? `${fechaCorta(v.consentimiento)} · versión ${v.version || '—'}` : 'No registrado')) : h('span',{class:'muted'},'—')),
        h('td',{}, h('span',{class:'pill ' + PRIV_PILL[s.k]}, s.t)),
        h('td',{class:'small'}, u.privacidad ? fechaCorta(u.privacidad) : h('span',{class:'muted'},'Todavía no'))))))));
  };
  sel.addEventListener('change', pintar);
  csv.onclick = async () => {
    const q = v => { const x = String(v ?? ''); return /[;"\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x; };
    const l = ['Curso;Código;Estudiante;Representante;Parentesco;Consentimiento;Versión aceptada;Estado;El estudiante vio el aviso'];
    filas.forEach(({ k, u, s }) => { const [y, p] = k.split('|'); const cur = privCurso(y, p);
      if (!s.vs.length) l.push([cur, u.codigo, u.nombre, '', '', '', '', s.t, u.privacidad ? new Date(u.privacidad).toLocaleDateString('es-EC') : ''].map(q).join(';'));
      else s.vs.forEach(v => l.push([cur, u.codigo, u.nombre, privNombreFamilia(v.familiaId), v.parentesco || '', v.consentimiento ? new Date(v.consentimiento).toLocaleDateString('es-EC') : '', v.version || '', s.t, u.privacidad ? new Date(u.privacidad).toLocaleDateString('es-EC') : ''].map(q).join(';'))); });
    descargarTexto(`consentimientos-${new Date().toISOString().slice(0,10)}.csv`, l.join('\n'));
    await Auditoria.registrar('exportar_consentimientos', { filas:l.length - 1 });
  };
  box.append(h('div',{class:'row',style:'justify-content:space-between'}, sel, csv), cont);
  pintar();
}

/* respaldo completo: servidor (tablas) o local (Store.s) */
const PRIV_TABLAS = [['perfiles','id'],['cursos','id'],['notas','id'],['calificaciones_cierre','id'],['historial','id'],['tareas','id'],['adaptaciones','estudiante_id'],['nee','estudiante_id'],
  ['familia_codigos','codigo'],['familia_vinculos','familia_id'],['comunicados','id'],['ajustes','clave']];
async function privRespaldo(conEventos, avance = () => {}){
  const hoy = new Date().toISOString().slice(0,10); let datos;
  if (Cloud.on){
    const tablas = PRIV_TABLAS.concat(conEventos ? [['eventos','id']] : []), out = {}, conteo = {}, faltan = [];
    for (const [t, ord] of tablas){
      avance(`Leyendo ${t}…`); const filas = []; let off = 0;
      try { for (;;){ const r = await Cloud.leer(t, `select=*&order=${ord}&limit=1000&offset=${off}`); filas.push(...(r || [])); if (!r || r.length < 1000) break; off += 1000; } }
      catch(e){ faltan.push(`${t}: ${e.message}`); }
      out[t] = filas; conteo[t] = filas.length;
    }
    datos = { tipo:'Respaldo completo de ANAI BioLab', modo:'servidor', generado:new Date().toISOString(), institucion:privDatos().responsable, anioLectivo:Inst.anio(), conteo, tablas:out };
    if (faltan.length) datos.noSeLeyeron = faltan;
  } else {
    const base = JSON.parse(Admin.respaldo()); const S = Store.s;
    datos = Object.assign({ tipo:'Respaldo completo de ANAI BioLab', modo:'local (este navegador)' }, base, {
      personal:S.personal || {}, egresados:S.egresados || {}, familias:S.familias || {}, papelera:S.papelera || {},
      calificaciones:{ notas:(S.docente || {}).notas || {}, fechas:(S.docente || {}).fechas || {}, intentos:(S.docente || {}).intentos || {}, adaptaciones:(S.docente || {}).adapt || {} },
      nee:S.nee || {}, cierres:S.cierres || {}, historial:S.historial || null, famCodigos:S.famCodigos || [], famVinculos:S.famVinculos || [], comunicados:S.comunicados || [],
      tareas:S.tareas || [], ajustes:S.inst || {}, auditoria:S.auditoriaLocal || [] });
    if (conEventos) datos.eventos = S.events || [];
  }
  await Auditoria.registrar('respaldo_completo', { eventos:!!conEventos });
  descargarTexto(`respaldo-completo-${hoy}.json`, JSON.stringify(datos, null, 2), 'application/json');
  avance(Cloud.on ? `Respaldo descargado: ${Object.values(datos.conteo).reduce((a, b) => a + b, 0)} filas de ${Object.keys(datos.conteo).length} tablas.` + (datos.noSeLeyeron ? ' Algunas tablas no se pudieron leer: ' + datos.noSeLeyeron.join(' · ') : '') : 'Respaldo descargado.');
  return datos;
}
ADM_TABS_EXTRA.push({ id:'privacidad', t:'Privacidad y datos', antes:'ajustes', fn:privTab });
</script>
