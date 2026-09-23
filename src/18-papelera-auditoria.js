<style>
.pap-grupo{display:flex;flex-direction:column;gap:10px}
.pap-grupo h3{display:flex;align-items:center;gap:8px;margin:0;font-size:1rem}
.pap-grupo h3 .pill{font-size:.72rem}
.pap-item{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px 14px;align-items:center;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--bg-2)}
.pap-item.sel{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,var(--bg-2))}
.pap-item input[type=checkbox]{width:18px;height:18px;accent-color:var(--accent)}
.pap-item .pap-n{font-weight:600}
.pap-item .pap-m{font-size:.8rem;color:var(--ink-3);display:flex;flex-wrap:wrap;gap:4px 12px}
.pap-acc{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.pap-como{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.pap-como > div{padding:12px 14px;border-radius:12px;background:var(--bg-3);font-size:.85rem;color:var(--ink-2)}
.pap-como b{display:block;color:var(--ink);margin-bottom:4px}
.aud-filtros{display:grid;grid-template-columns:minmax(0,2fr) repeat(4,minmax(0,1fr)) auto;gap:10px;align-items:end}
.aud-filtros label{display:flex;flex-direction:column;gap:4px;font-size:.78rem;font-weight:600;color:var(--ink-2)}
.aud-filtros input,.aud-filtros select{padding:8px 10px;border-radius:9px;border:1px solid var(--line-2,var(--line));background:var(--bg-2);color:var(--ink);min-width:0}
.aud-tabla td{vertical-align:top}
.aud-tabla td.aud-f{white-space:nowrap;font-size:.8rem;color:var(--ink-2)}
.aud-tabla .aud-q{font-weight:600}
.aud-tabla .aud-r{font-size:.74rem;color:var(--ink-3)}
.aud-tabla .aud-t{max-width:560px}
.aud-tabla tr.aud-fila{cursor:pointer}
.aud-tabla tr.aud-fila:hover td{background:var(--bg-3)}
.aud-cat{display:inline-block;font-size:.68rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--ink-3);margin-right:6px}
.aud-pie{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}
.aud-dif{width:100%;border-collapse:collapse;font-size:.84rem}
.aud-dif th,.aud-dif td{text-align:left;padding:7px 8px;border-bottom:1px solid var(--line);vertical-align:top;word-break:break-word}
.aud-dif th{font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3)}
.aud-dif tr.cambio td{background:color-mix(in srgb,var(--warn) 12%,transparent)}
.aud-dif tr.cambio td:first-child{font-weight:700}
.aud-dif td.antes{color:var(--ink-3)}
.aud-modal{max-width:760px}
.aud-modal .tablewrap table{min-width:0}
@media (max-width:900px){ .aud-filtros{grid-template-columns:repeat(2,minmax(0,1fr))} .aud-filtros label.aud-txt{grid-column:1/-1} .pap-como{grid-template-columns:1fr} }
@media (max-width:560px){ .pap-item{grid-template-columns:auto minmax(0,1fr)} .pap-acc{grid-column:1/-1;justify-content:flex-start} }
</style>
<script>
/* =====================================================================
   18 · PAPELERA Y REGISTRO DE AUDITORÍA (v1.8)
   ---------------------------------------------------------------------
   · Papelera (Administración → Papelera): lo que se "elimina" queda aquí
     30 días. Se restaura (uno o varios) o se elimina definitivamente.
   · Registro de auditoría (Administración → Auditoría y #/auditoria para
     autoridades): quién hizo qué y cuándo, en lenguaje humano, con
     filtros, detalle antes/después y descarga CSV. En servidor lo
     escriben los disparadores de la base de datos; en local, el navegador.
   ===================================================================== */

/* ---------- utilidades comunes ---------- */
const audNum = n => (n == null || n === '' || isNaN(+n)) ? '—' : String(Math.round(+n * 100) / 100).replace('.', ',');
const audCursoTxt = (nivel, par) => { if (nivel == null || nivel === '') return 'un curso'; const n = BIO.niveles.find(x => +x.id === +nivel); return `${n ? n.corto : nivel + '.º'} ${par || ''}`.trim(); };
/* "8 A" (formato de la auditoría local) → "8.º EGB A" */
const audCursoDe = s => { const m = /^(\d+)\s+([A-Z]{1,2})$/.exec(String(s || '').trim()); return m ? audCursoTxt(m[1], m[2]) : String(s || ''); };
function audCursoId(id){ const c = (Admin.cursos() || []).find(x => x.id === id) || (Papelera.s.cursos || []).find(x => x.id === id); return c ? audCursoTxt(c.nivel, c.paralelo) : null; }
function audActividad(id){ if (!id) return 'una actividad';
  const it = (typeof itemDe === 'function') ? itemDe(id) : null; if (it && it.t) return it.t;
  const a = (BIO.activities || {})[id]; if (a && a.t) return a.t;
  try { const r = Tareas.recurso(id); if (r && r.t && r.t !== id) return r.t; } catch(e){}
  return id; }
const audEsUuid = s => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(s || ''));
/* nombres conocidos por identificador (uuid en servidor; código o id en local) */
const audNombres = {};
function audNombre(id){
  if (!id) return null; if (id === 'admin') return 'Administración';
  if (audNombres[id]) return audNombres[id];
  const P = Papelera.s;
  const u = (Cloud.porUid || {})[id]; if (u) return u.nombre;
  const d = (Store.s.docentes || {})[id] || (Store.s.personal || {})[id] || P.docentes[id] || P.personal[id] || (Store.s.familias || {})[id];
  if (d) return d.nombre;
  const e = (Store.s.usuarios || {})[id] || (Store.s.egresados || {})[id] || P.usuarios[id]; if (e) return e.nombre;
  if (Cloud.ses && id === Cloud.ses.uid) return Store.s.user.nombre;
  return null;
}
const audQuien = id => audNombre(id) || (audEsUuid(id) ? 'una cuenta ya eliminada' : (id || 'alguien'));
/* aprende nombres de las propias filas (útil para cuentas ya eliminadas) */
function audAprender(rows){
  rows.forEach(r => {
    if (r.actor && r.actor_nombre) audNombres[r.actor] = audNombres[r.actor] || r.actor_nombre;
    [r.antes, r.despues].forEach(o => { if (o && typeof o === 'object' && o.id && o.nombre && r.tabla === 'perfiles') audNombres[o.id] = audNombres[o.id] || o.nombre; });
    const d = r.detalle || {}; if (r.registro && d.nombre && !audNombres[r.registro]) audNombres[r.registro] = d.nombre;
  });
}
const AUD_ROL = r => r === 'sistema' ? 'Sistema' : (ROLES[r] ? ROLES[r].n : (r || '—'));

/* ---------- categorías (filtro "tipo de acción") ---------- */
const AUD_TIPOS = {
  notas:'Notas', cierres:'Año lectivo y quimestres', cuentas:'Cuentas y perfiles', claves:'Contraseñas', cursos:'Cursos', tareas:'Tareas',
  adaptaciones:'Adaptaciones de acceso', nee:'Fichas NEE', familias:'Familias y representantes', comunicados:'Comunicados',
  ajustes:'Ajustes de la institución', papelera:'Papelera', exportaciones:'Descargas y exportaciones', privacidad:'Privacidad y datos', otras:'Otras acciones'
};
const AUD_TABLA_TIPO = { notas:'notas', perfiles:'cuentas', cursos:'cursos', tareas:'tareas', adaptaciones:'adaptaciones', nee:'nee', familia_codigos:'familias', familia_vinculos:'familias', comunicados:'comunicados', ajustes:'ajustes', calificaciones_cierre:'cierres', historial:'cierres' };
function audTipo(r){
  const a = String(r.accion || '');
  if (/^ajuste_/.test(a)) return 'ajustes';
  if (/papelera|eliminar_definitivamente|vaciar_papelera/.test(a)) return 'papelera';
  if (/exportar|descargar|respaldo|imprimir/.test(a)) return 'exportaciones';
  if (/contrasena|password|clave/.test(a)) return 'claves';
  if (/quimestre|periodo|promover|anio|cierre/.test(a) && !r.tabla) return 'cierres';
  if (/purgar_eventos|privacidad|consentimiento/.test(a)) return 'privacidad';
  if (/nota/.test(a) && !r.tabla) return 'notas';
  if (r.tabla === 'cursos' && a === 'delete') return 'papelera';
  if (r.tabla && AUD_TABLA_TIPO[r.tabla]) return (r.tabla === 'cursos' && r.despues && r.antes && (r.antes.eliminado || null) !== (r.despues.eliminado || null)) ? 'papelera' : AUD_TABLA_TIPO[r.tabla];
  if (/nee/.test(a)) return 'nee'; if (/adaptacion/.test(a)) return 'adaptaciones'; if (/tarea/.test(a)) return 'tareas';
  if (/comunicado/.test(a)) return 'comunicados'; if (/familia|representante|vincul|codigo/.test(a)) return 'familias';
  if (/curso/.test(a)) return 'cursos'; if (/crear_|editar_|correo|estudiante|docente|dece|autoridad/.test(a)) return 'cuentas';
  if (/^ajuste/.test(a)) return 'ajustes';
  return 'otras';
}

/* ---------- traducción a lenguaje humano ---------- */
const AUD_CAMPOS = { nombres:'nombres', apellidos:'apellidos', nombre:'nombre', nivel:'año', paralelo:'paralelo', rep:'representante', tel:'teléfono', email:'correo',
  entregada:'credenciales entregadas', estado:'estado', cargo:'cargo', prog:'entorno', rol:'rol', codigo:'código', eliminado:'papelera', eliminado_por:'enviado a la papelera por',
  docente_id:'docente', anio:'año lectivo', vence:'fecha de entrega', nota:'nota', actividad:'actividad', recurso:'recurso', lista:'adaptaciones', grado:'grado',
  necesidad:'necesidad', estrategias:'estrategias', evaluacion:'evaluación', revision:'próxima revisión', responsable:'responsable', activo:'activo', usado_en:'usado el',
  usado_por:'usado por', parentesco:'parentesco', consentimiento:'consentimiento', version_aviso:'versión del aviso', titulo:'título', texto:'texto', para:'para', valor:'valor',
  intentos:'intentos', resultado:'resultado', origen:'origen', fecha:'fecha', curso_id:'curso', estudiante_id:'estudiante', familia_id:'representante', creado:'creado',
  creado_por:'creado por', actualizado:'actualizado', antes:'antes', despues:'después', estudiante:'estudiante', adaptacion:'adaptación', activa:'activa', campos:'campos', nuevos:'nuevos', actualizados:'actualizados', docente:'docente', curso:'curso', filas:'filas', filtros:'filtros', meses:'meses', borrados:'borrados', cuentas:'cuentas', cursos:'cursos', periodo:'quimestre', notas:'notas', inicio:'inicio', fin:'fin', eventos:'incluye registros de uso', actualizado_por:'actualizado por', autor:'autor', ultimo_acceso:'último acceso', privacidad:'vio el aviso de privacidad', cambiar:'debe cambiar la contraseña' };
const AUD_AJUSTES = { anio_lectivo:'año lectivo', calendario:'calendario de quimestres', ponderacion:'ponderación de la libreta', privacidad:'aviso de privacidad' };
const AUD_IGNORAR = ['ultimo_acceso','privacidad','cambiar','creado','actualizado','actualizado_por','id'];
function audCambios(antes, despues){
  if (!antes || !despues) return [];
  return Object.keys(Object.assign({}, antes, despues)).filter(k => !AUD_IGNORAR.includes(k) && JSON.stringify(antes[k] ?? null) !== JSON.stringify(despues[k] ?? null));
}
const audLista = arr => { arr = arr.filter(Boolean); return arr.length <= 1 ? (arr[0] || '') : arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1]; };
const audQ = s => '«' + s + '»';
function audValorCorto(k, v){
  if (v == null || v === '') return 'vacío';
  if (k === 'nivel') return audCursoTxt(v, '').trim();
  if (k === 'entregada' || k === 'activo') return v ? 'sí' : 'no';
  if (k === 'docente_id' || k === 'estudiante_id' || k === 'familia_id') return audQuien(v);
  if (k === 'vence' || k === 'revision') return fechaCorta(Date.parse(v));
  if (k === 'prog') return (BIO.programas[v] || {}).n || v;
  if (k === 'lista') return Array.isArray(v) && v.length ? v.map(x => BIO.adaptaciones[x] || x).join(', ') : 'ninguna';
  if (typeof v === 'object') return 'otro valor';
  const s = String(v); return s.length > 60 ? s.slice(0, 57) + '…' : s;
}
/* texto de una fila: devuelve una frase */
function audDescribir(r){
  const a = String(r.accion || ''), t = r.tabla, A = r.antes || null, D = r.despues || null, F = D || A || {}, d = r.detalle || {};
  const op = ['insert','update','delete'].includes(a) ? a : null;
  const est = id => audQuien(id);
  if (op && t === 'notas'){
    const al = est(F.estudiante_id), act = audActividad(F.actividad);
    if (op === 'insert') return `Registró la nota de ${al} en ${audQ(act)}: ${audNum(D.nota)}`;
    if (op === 'delete') return `Borró la nota de ${al} en ${audQ(act)} (era ${audNum(A.nota)})`;
    if ((A.nota ?? null) !== (D.nota ?? null)) return `Cambió la nota de ${al} en ${audQ(act)} (de ${audNum(A.nota)} a ${audNum(D.nota)})`;
    return `Actualizó el registro de la nota de ${al} en ${audQ(act)}`;
  }
  if (op && t === 'perfiles'){
    const nom = F.nombre || audQuien(F.id), rol = F.rol ? ' (' + AUD_ROL(F.rol).toLowerCase() + ')' : '';
    if (op === 'insert') return `Creó la cuenta de ${nom}${rol}`;
    if (op === 'delete') return `Eliminó la cuenta de ${nom}${rol}`;
    const c = audCambios(A, D);
    if (c.includes('eliminado')) return D.eliminado ? `Envió a la papelera la cuenta de ${nom}` : `Restauró de la papelera la cuenta de ${nom}`;
    if (c.length === 1 && c[0] === 'entregada') return D.entregada ? `Marcó como entregadas las credenciales de ${nom}` : `Marcó como pendientes las credenciales de ${nom}`;
    if (c.includes('estado')) return `Cambió el estado de ${nom} a ${audQ(D.estado)}`;
    const vis = c.filter(k => !(k === 'nombre' && (c.includes('nombres') || c.includes('apellidos'))) && k !== 'eliminado_por');
    if (!vis.length) return `Actualizó el perfil de ${nom}`;
    return `Cambió ${audLista(vis.map(k => `${AUD_CAMPOS[k] || k} (de ${audValorCorto(k, A[k])} a ${audValorCorto(k, D[k])})`))} de ${nom}`;
  }
  if (op && t === 'cursos'){
    const cu = audCursoTxt(F.nivel, F.paralelo);
    if (op === 'insert') return `Creó el curso ${cu}` + (D.docente_id ? ` con ${audQuien(D.docente_id)}` : '');
    if (op === 'delete') return `Eliminó definitivamente el curso ${cu}`;
    const c = audCambios(A, D);
    if (c.includes('eliminado')) return D.eliminado ? `Envió a la papelera el curso ${cu}` : `Restauró de la papelera el curso ${cu}`;
    if (c.includes('docente_id')) return D.docente_id ? `Asignó el curso ${cu} a ${audQuien(D.docente_id)}` : `Dejó sin docente el curso ${cu}` + (A.docente_id ? ` (antes: ${audQuien(A.docente_id)})` : '');
    if (c.includes('anio')) return `Pasó el curso ${cu} al año lectivo ${D.anio}`;
    return `Cambió ${audLista(c.map(k => AUD_CAMPOS[k] || k))} del curso ${cu}`;
  }
  if (op && t === 'tareas'){
    const act = audActividad(F.actividad), cu = audCursoTxt(F.nivel, F.paralelo);
    if (op === 'insert') return `Asignó la tarea ${audQ(act)} a ${cu}` + (D.vence ? `, para el ${fechaCorta(Date.parse(D.vence))}` : '');
    if (op === 'delete') return `Quitó la tarea ${audQ(act)} de ${cu}`;
    const c = audCambios(A, D);
    if (c.includes('vence')) return `Cambió la fecha de la tarea ${audQ(act)} de ${cu} (del ${fechaCorta(Date.parse(A.vence))} al ${fechaCorta(Date.parse(D.vence))})`;
    return `Cambió las indicaciones de la tarea ${audQ(act)} de ${cu}`;
  }
  if (op && t === 'adaptaciones'){
    const al = est(F.estudiante_id), ant = (A && A.lista) || [], nue = (D && D.lista) || [];
    const on = nue.filter(x => !ant.includes(x)).map(x => BIO.adaptaciones[x] || x), off = ant.filter(x => !nue.includes(x)).map(x => BIO.adaptaciones[x] || x);
    if (op === 'delete') return `Quitó todas las adaptaciones de acceso de ${al}`;
    const partes = []; if (on.length) partes.push('activó ' + audLista(on.map(x => x.toLowerCase()))); if (off.length) partes.push('desactivó ' + audLista(off.map(x => x.toLowerCase())));
    return `Adaptaciones de acceso de ${al}: ` + (partes.join('; ') || 'sin cambios');
  }
  if (op && t === 'nee'){
    const al = est(F.estudiante_id);
    if (op === 'insert') return `Registró la ficha NEE de ${al}` + (D.grado ? ` (grado ${D.grado})` : '');
    if (op === 'delete') return `Borró la ficha NEE de ${al}`;
    const c = audCambios(A, D); return `Actualizó la ficha NEE de ${al}` + (c.length ? ` (${audLista(c.map(k => AUD_CAMPOS[k] || k))})` : '');
  }
  if (op && t === 'familia_codigos'){
    const al = est(F.estudiante_id), cod = F.codigo ? ' ' + F.codigo : '';
    if (op === 'insert') return `Generó el código de familia${cod} para ${al}`;
    if (op === 'delete') return `Borró el código de familia${cod} de ${al}`;
    if (D.usado_en && !A.usado_en) return `Se usó el código de familia${cod} de ${al}`;
    if (A.activo && !D.activo) return `Desactivó el código de familia${cod} de ${al}`;
    return `Actualizó el código de familia${cod} de ${al}`;
  }
  if (op && t === 'familia_vinculos'){
    const al = est(F.estudiante_id), fam = audQuien(F.familia_id);
    if (op === 'insert') return `Vinculó a ${fam} como representante de ${al}` + (F.parentesco ? ` (${F.parentesco.toLowerCase()})` : '');
    if (op === 'delete') return `Retiró el vínculo de ${fam} con ${al}`;
    return `Actualizó el vínculo de ${fam} con ${al}`;
  }
  if (op && t === 'comunicados'){
    const ti = F.titulo ? audQ(F.titulo) : 'un comunicado', cu = audCursoTxt(F.nivel, F.paralelo), para = { estudiantes:'estudiantes', familias:'familias', todos:'estudiantes y familias' }[F.para] || F.para || '';
    if (op === 'insert') return `Publicó el comunicado ${ti} para ${cu}` + (para ? ` (${para})` : '');
    if (op === 'delete') return `Borró el comunicado ${ti} de ${cu}`;
    return `Editó el comunicado ${ti} de ${cu}`;
  }
  if (op && t === 'ajustes'){ const k = F.clave || r.registro; return `${op === 'delete' ? 'Borró' : 'Cambió'} el ajuste: ${AUD_AJUSTES[k] || k}` + (k === 'anio_lectivo' && D ? ` (${String(D.valor).replace(/"/g,'')})` : ''); }
  if (op) return `${{ insert:'Creó', update:'Cambió', delete:'Borró' }[op]} un registro de ${t || 'datos'}`;

  /* ---- acciones con nombre propio ---- */
  const obj = () => d.nombre || (d.curso ? 'el curso ' + audCursoDe(d.curso) : null) || (r.tabla === 'cursos' ? 'el curso ' + (audCursoId(r.registro) || '') : null) || audQuien(r.registro) || d.email || d.codigo || 'un registro';
  const Q = d.periodo === 'Q1' ? 'primer quimestre' : d.periodo === 'Q2' ? 'segundo quimestre' : (d.periodo || 'quimestre');
  switch (a){
    case 'registrar_nota': return `Registró la nota de ${d.estudiante || audQuien(d.codigo)} en ${audQ(d.actividad || '')}: ${audNum(d.despues)}`;
    case 'cambiar_nota': return `Cambió la nota de ${d.estudiante || audQuien(d.codigo)} en ${audQ(d.actividad || '')} (de ${audNum(d.antes)} a ${audNum(d.despues)})`;
    case 'borrar_nota': return `Borró la nota de ${d.estudiante || audQuien(d.codigo)} en ${audQ(d.actividad || '')}`;
    case 'cerrar_quimestre': return `Cerró el ${Q} ${d.anio || ''}`.trim() + (d.notas != null ? `: congeló ${d.notas} nota${d.notas == 1 ? '' : 's'}` : '');
    case 'reabrir_quimestre': return `Reabrió el ${Q} ${d.anio || ''}`.trim();
    case 'promover_anio': return `Cerró el año lectivo ${d.de || ''} y abrió ${d.a || 'el siguiente'}` + (d.promovidos != null ? ` (${d.promovidos} promovidos, ${d.repiten || 0} repiten, ${d.egresados || 0} egresados)` : '');
    case 'enviar_a_papelera': return `Envió a la papelera ${d.curso ? 'el curso ' + audCursoDe(d.curso) : 'a ' + obj()}`;
    case 'restaurar_de_papelera': return `Restauró de la papelera ${d.curso ? 'el curso ' + audCursoDe(d.curso) : 'a ' + obj()}`;
    case 'eliminar_definitivamente': return `Eliminó definitivamente ${d.curso ? 'el curso ' + audCursoDe(d.curso) : 'a ' + obj()}` + (d.rol ? ` (${AUD_ROL(d.rol).toLowerCase()})` : '');
    case 'vaciar_papelera': return `Se vació la papelera: ${d.cuentas || 0} cuenta${d.cuentas == 1 ? '' : 's'} y ${d.cursos || 0} curso${d.cursos == 1 ? '' : 's'} con más de 30 días`;
    case 'restablecer_contrasena': return `Restableció la contraseña de ${obj()}`;
    case 'cambiar_correo': return `Cambió el correo de ${audQuien(r.registro)} a ${d.email || '—'}`;
    case 'vincular_representante': return `${r.actor_nombre || 'Un representante'} se vinculó como representante` + (r.registro && r.registro.includes(':') ? ` de ${audQuien(r.registro.split(':')[1])}` : '') + (d.codigo ? ` con el código ${d.codigo}` : '');
    case 'crear_estudiantes': return `Cargó estudiantes: ${d.nuevos || 0} nuevo${d.nuevos == 1 ? '' : 's'}` + (d.actualizados ? `, ${d.actualizados} actualizado${d.actualizados == 1 ? '' : 's'}` : '');
    case 'crear_docente': return `Creó la cuenta docente ${d.email || audQuien(r.registro)}`;
    case 'crear_dece': return `Creó la cuenta del DECE ${d.email || audQuien(r.registro)}`;
    case 'crear_autoridad': return `Creó la cuenta de autoridad ${d.email || audQuien(r.registro)}`;
    case 'editar_estudiante': return `Editó los datos de ${d.nombre || audQuien(d.codigo)}` + (d.campos && d.campos.length ? ` (${audLista(d.campos.filter(k => k !== 'nombre').map(k => AUD_CAMPOS[k === 'year' ? 'nivel' : k] || k))})` : '');
    case 'crear_curso': return `Creó el curso ${audCursoDe(d.curso)}`;
    case 'asignar_curso': return `Asignó el curso ${audCursoDe(d.curso)} a ${d.docente || 'un docente'}`;
    case 'quitar_curso': return `Quitó el curso ${audCursoDe(d.curso)} a ${d.docente || 'un docente'}`;
    case 'asignar_tarea': return `Asignó la tarea ${audQ(d.actividad || '')} a ${audCursoTxt(d.nivel, (d.paralelos || []).join(', '))}`;
    case 'cambiar_adaptacion_acceso': return `${d.activa ? 'Activó' : 'Desactivó'} ${String(d.adaptacion || 'una adaptación').toLowerCase()} para ${d.estudiante || audQuien(d.codigo)}`;
    case 'exportar_auditoria': return `Descargó el registro de auditoría` + (d.filas != null ? ` (${d.filas} fila${d.filas == 1 ? '' : 's'})` : '');
    case 'exportar_datos_estudiante': return `Descargó los datos personales de ${d.nombre || audQuien(d.codigo) || d.codigo}` + (d.codigo ? ` (código ${d.codigo})` : '');
    case 'respaldo_completo': return 'Descargó un respaldo completo de la plataforma';
    case 'exportar_consentimientos': return 'Descargó el estado de consentimientos de las familias';
    case 'exportar_libreta': return `Descargó la libreta` + (d.curso ? ` de ${audCursoDe(d.curso)}` : d.codigo ? ` de ${audQuien(d.codigo)}` : '');
    case 'purgar_eventos': return `Borró los registros de uso con más de ${d.meses} mes${d.meses == 1 ? '' : 'es'}` + (d.borrados != null ? ` (${d.borrados} eliminado${d.borrados == 1 ? '' : 's'})` : '');
  }
  if (/^ajuste_/.test(a)){ const k = a.slice(7); return `Cambió el ajuste: ${AUD_AJUSTES[k] || k.replace(/_/g,' ')}`; }
  /* acción desconocida: se humaniza el nombre y se resume el detalle */
  const base = a.replace(/_/g, ' '); const txt = base.charAt(0).toUpperCase() + base.slice(1);
  const extra = Object.entries(d).filter(([k, v]) => v != null && typeof v !== 'object' && String(v).length < 60).slice(0, 3).map(([k, v]) => `${k}: ${audEsUuid(v) ? audQuien(v) : v}`);
  return txt + (extra.length ? ` (${extra.join(' · ')})` : '');
}

/* ---------- datos: local o servidor ---------- */
const AUD_LOTE = 200;
function audFechaMs(r){ const f = r.fecha; return typeof f === 'number' ? f : Date.parse(f); }
async function audCargar(st, mas){
  if (!Cloud.on){ st.rows = (Store.s.auditoriaLocal || []).slice(); st.fin = true; return; }
  const q = ['order=fecha.desc', 'limit=' + AUD_LOTE, 'offset=' + (mas ? st.rows.length : 0)];
  if (st.f.rol) q.push('actor_rol=eq.' + encodeURIComponent(st.f.rol));
  if (st.f.desde) q.push('fecha=gte.' + new Date(st.f.desde + 'T00:00:00').toISOString());
  if (st.f.hasta) q.push('fecha=lte.' + new Date(st.f.hasta + 'T23:59:59').toISOString());
  const rows = await Cloud.auditoria(q.join('&'));
  st.rows = mas ? st.rows.concat(rows) : rows; st.fin = rows.length < AUD_LOTE;
}
function audFiltrar(st){
  const f = st.f, txt = sinTildes(String(f.texto || '').toLowerCase().trim());
  const d0 = f.desde ? Date.parse(f.desde + 'T00:00:00') : null, d1 = f.hasta ? Date.parse(f.hasta + 'T23:59:59') : null;
  return st.rows.map(r => r._t ? r : Object.assign(r, { _t:audDescribir(r), _tipo:audTipo(r) })).filter(r => {
    if (f.tipo && r._tipo !== f.tipo) return false;
    if (f.rol && r.actor_rol !== f.rol) return false;
    const ms = audFechaMs(r); if (d0 && ms < d0) return false; if (d1 && ms > d1) return false;
    if (txt && !sinTildes(`${r._t} ${r.actor_nombre || ''} ${AUD_ROL(r.actor_rol)} ${r.accion} ${AUD_TIPOS[r._tipo] || ''}`.toLowerCase()).includes(txt)) return false;
    return true;
  });
}

/* ---------- detalle: antes / después campo por campo ---------- */
function audValorLargo(k, v){
  if (v == null || v === '') return h('span',{class:'muted'},'—');
  if (typeof v === 'boolean') return v ? 'sí' : 'no';
  if (['estudiante_id','familia_id','docente_id','autor','creado_por','usado_por','eliminado_por','actualizado_por','actor'].includes(k) && audEsUuid(v)) return h('span',{}, audQuien(v), h('div',{class:'small muted mono'}, v));
  if (k === 'actividad'){ const n = audActividad(v); return n === v ? String(v) : h('span',{}, n, h('div',{class:'small muted mono'}, v)); }
  if (k === 'curso_id') return audCursoId(v) || v;
  if (k === 'lista' && Array.isArray(v)) return v.length ? v.map(x => BIO.adaptaciones[x] || x).join(', ') : 'ninguna';
  if (typeof v === 'number') return v > 1e11 ? fechaHora(v) : (k === 'nivel' ? audCursoTxt(v, '') : audNum(v));
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) return fechaHora(Date.parse(v));
  if (typeof v === 'object') return h('code',{class:'small',style:'white-space:pre-wrap;word-break:break-word'}, JSON.stringify(v, null, 1).slice(0, 1500));
  return String(v);
}
function audDetalle(r){
  const A = r.antes || null, D = r.despues || null, det = r.detalle || null;
  const box = h('div',{class:'stack aud-modal'},
    h('span',{class:'eyebrow'}, AUD_TIPOS[r._tipo || audTipo(r)] || 'Auditoría'),
    h('h3',{}, r._t || audDescribir(r)),
    h('dl',{class:'kv'},
      h('dt',{},'Fecha'), h('dd',{}, fechaHora(audFechaMs(r))),
      h('dt',{},'Quién'), h('dd',{}, `${r.actor_nombre || audQuien(r.actor)} · ${AUD_ROL(r.actor_rol)}`),
      h('dt',{},'Acción registrada'), h('dd',{class:'mono'}, r.accion),
      r.tabla ? h('dt',{},'Tabla') : null, r.tabla ? h('dd',{class:'mono'}, r.tabla) : null,
      r.registro ? h('dt',{},'Registro') : null, r.registro ? h('dd',{}, String(r.registro).split(':').map(x => audEsUuid(x) ? audQuien(x) : (r.tabla === 'notas' ? audActividad(x) : x)).join(' · ')) : null));
  if (A || D){
    const keys = Object.keys(Object.assign({}, A || {}, D || {}));
    const cambia = k => JSON.stringify((A || {})[k] ?? null) !== JSON.stringify((D || {})[k] ?? null);
    const orden = keys.filter(k => A && D ? cambia(k) : true).concat(A && D ? keys.filter(k => !cambia(k)) : []);
    const soloCambios = A && D;
    const tb = h('tbody',{});
    const pintar = (todos) => { tb.innerHTML = ''; orden.filter(k => todos || !soloCambios || cambia(k)).forEach(k => tb.append(h('tr',{class:soloCambios && cambia(k) ? 'cambio' : ''},
      h('td',{}, AUD_CAMPOS[k] || k), h('td',{class:'antes'}, A ? audValorLargo(k, A[k]) : h('span',{class:'muted'},'(no existía)')), h('td',{}, D ? audValorLargo(k, D[k]) : h('span',{class:'muted'},'(se borró)'))))); };
    pintar(false);
    const nCambios = soloCambios ? keys.filter(cambia).length : keys.length;
    box.append(h('p',{class:'small muted'}, soloCambios ? `${nCambios} campo${nCambios === 1 ? '' : 's'} cambiado${nCambios === 1 ? '' : 's'} (resaltado${nCambios === 1 ? '' : 's'}).` : A ? 'Datos que tenía el registro antes de borrarse.' : 'Datos con los que se creó el registro.'),
      h('div',{class:'tablewrap'}, h('table',{class:'aud-dif'}, h('thead',{}, h('tr',{}, h('th',{scope:'col'},'Campo'), h('th',{scope:'col'},'Antes'), h('th',{scope:'col'},'Después'))), tb)));
    if (soloCambios && nCambios < keys.length){ const b = h('button',{class:'btn sm ghost'},'Ver también los campos sin cambios'); b.onclick = () => { pintar(true); b.remove(); }; box.append(b); }
  }
  if (det && Object.keys(det).length){
    box.append(h('div',{class:'tablewrap'}, h('table',{class:'aud-dif'}, h('thead',{}, h('tr',{}, h('th',{scope:'col'},'Dato'), h('th',{scope:'col'},'Valor'))),
      h('tbody',{}, Object.entries(det).map(([k, v]) => h('tr',{}, h('td',{}, AUD_CAMPOS[k] || k), h('td',{}, audValorLargo(k, v))))))));
  }
  if (!A && !D && !(det && Object.keys(det).length)) box.append(h('p',{class:'small muted'},'Esta acción no guarda más datos.'));
  box.append(h('p',{class:'small muted'},'El registro de auditoría no se puede editar ni borrar.'), h('div',{class:'row'}, h('button',{class:'btn sm primary',onclick:closeModal},'Cerrar')));
  openModal(box);
}

/* ---------- CSV ---------- */
function audCSV(rows){
  const q = v => { const s = String(v ?? '').replace(/\r?\n/g, ' '); return /[;"]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const l = ['Fecha;Quién;Rol;Tipo;Qué hizo;Acción;Tabla;Registro'];
  rows.forEach(r => l.push([new Date(audFechaMs(r)).toLocaleString('es-EC'), r.actor_nombre || audQuien(r.actor), AUD_ROL(r.actor_rol), AUD_TIPOS[r._tipo] || '', r._t, r.accion, r.tabla || '', r.registro || ''].map(q).join(';')));
  return l.join('\n');
}

/* ---------- vista del registro (pestaña y ruta) ---------- */
function audVista(body){
  const st = { rows:[], fin:false, pag:0, f:{ texto:'', tipo:'', rol:'', desde:'', hasta:'' } };
  const POR_PAG = 25;
  const texto = h('input',{type:'search',placeholder:'Nombre, estudiante, actividad…','aria-label':'Buscar en el registro'});
  const tipo = h('select',{'aria-label':'Tipo de acción'}, h('option',{value:''},'Todas'), Object.entries(AUD_TIPOS).map(([k, v]) => h('option',{value:k}, v)));
  const rol = h('select',{'aria-label':'Rol de quien lo hizo'}, h('option',{value:''},'Todos'), Object.entries(ROLES).map(([k, v]) => h('option',{value:k}, v.n)));
  const desde = h('input',{type:'date','aria-label':'Desde'}), hasta = h('input',{type:'date','aria-label':'Hasta'});
  const limpiar = h('button',{class:'btn sm ghost',type:'button'},'Limpiar');
  const info = h('p',{class:'small muted',role:'status','aria-live':'polite'});
  const tabla = h('div',{}), pie = h('div',{class:'aud-pie'});
  const csv = h('button',{class:'btn sm'},'Descargar CSV');
  body.append(
    h('div',{class:'card stack'},
      h('div',{class:'row',style:'justify-content:space-between;align-items:flex-start;gap:12px'},
        h('div',{class:'stack',style:'gap:4px;max-width:720px'}, h('span',{class:'eyebrow'},'Registro de auditoría'),
          h('p',{class:'small muted',style:'margin:0'}, Cloud.on
            ? 'Cada cambio en notas, cuentas, cursos, tareas, adaptaciones, fichas NEE, códigos y vínculos de familia, comunicados y ajustes queda anotado por el servidor, con quién lo hizo y cuándo. Nadie puede editarlo ni borrarlo. Toca una fila para ver el antes y el después.'
            : 'Modo de demostración: el registro se guarda solo en este navegador. Con el servidor, lo escribe la base de datos y nadie puede editarlo ni borrarlo. Toca una fila para ver el detalle.')),
        csv),
      avisoV18(),
      h('div',{class:'aud-filtros'}, h('label',{class:'aud-txt'},'Buscar', texto), h('label',{},'Tipo de acción', tipo), h('label',{},'Rol', rol), h('label',{},'Desde', desde), h('label',{},'Hasta', hasta), limpiar),
      info),
    h('div',{style:'height:12px'}), tabla, h('div',{style:'height:10px'}), pie);

  const pintar = () => {
    const L = audFiltrar(st); const paginas = Math.max(1, Math.ceil(L.length / POR_PAG)); st.pag = Math.min(st.pag, paginas - 1);
    const vis = L.slice(st.pag * POR_PAG, (st.pag + 1) * POR_PAG);
    info.textContent = st.rows.length ? `${L.length} de ${st.rows.length} registro${st.rows.length === 1 ? '' : 's'} cargado${st.rows.length === 1 ? '' : 's'}${Cloud.on && !st.fin ? ' (hay más en el servidor)' : ''}.` : '';
    tabla.innerHTML = ''; pie.innerHTML = '';
    if (!st.rows.length){ tabla.append(h('div',{class:'ph'}, Cloud.on ? 'Todavía no hay registros de auditoría con estos filtros.' : 'Todavía no hay acciones registradas en este navegador. Cuando se creen cursos, se registren notas o se use la papelera, aparecerán aquí.')); return; }
    if (!L.length){ tabla.append(h('div',{class:'ph'}, 'Ningún registro coincide con los filtros. ', h('button',{class:'btn sm ghost',onclick:()=>limpiar.click()},'Quitar filtros'))); }
    else tabla.append(h('div',{class:'tablewrap',style:'position:relative'}, h('table',{class:'data aud-tabla'},
      h('caption',{class:'sr-only'},'Registro de auditoría'),
      h('thead',{}, h('tr',{}, h('th',{scope:'col'},'Fecha'), h('th',{scope:'col'},'Quién'), h('th',{scope:'col'},'Qué hizo'), h('th',{scope:'col'},h('span',{class:'sr-only'},'Detalle')))),
      h('tbody',{}, vis.map(r => { const ms = audFechaMs(r);
        const ver = h('button',{class:'btn sm ghost','aria-label':'Ver detalle: '+r._t},'Detalle'); ver.onclick = e => { e.stopPropagation(); audDetalle(r); };
        return h('tr',{class:'aud-fila',onclick:()=>audDetalle(r)},
          h('td',{class:'aud-f'}, fechaCorta(ms), h('div',{class:'aud-r'}, new Date(ms).toLocaleTimeString('es-EC',{hour:'2-digit',minute:'2-digit'}))),
          h('td',{}, h('div',{class:'aud-q'}, r.actor_nombre || audQuien(r.actor)), h('div',{class:'aud-r'}, AUD_ROL(r.actor_rol))),
          h('td',{class:'aud-t'}, h('span',{class:'aud-cat'}, AUD_TIPOS[r._tipo]), h('div',{}, r._t)),
          h('td',{style:'text-align:right'}, ver)); })))));
    const nav = h('div',{class:'row',style:'gap:6px'});
    if (paginas > 1){
      nav.append(h('button',{class:'btn sm ghost',disabled:st.pag === 0 ? true : null,onclick:()=>{ st.pag--; pintar(); }},'← Anteriores'),
        h('span',{class:'small muted'}, `Página ${st.pag + 1} de ${paginas}`),
        h('button',{class:'btn sm ghost',disabled:st.pag >= paginas - 1 ? true : null,onclick:()=>{ st.pag++; pintar(); }},'Siguientes →'));
    }
    pie.append(nav);
    if (Cloud.on && !st.fin){ const b = h('button',{class:'btn sm'},`Cargar ${AUD_LOTE} más antiguos`);
      b.onclick = async () => { b.disabled = true; b.textContent = 'Cargando…'; try { await audCargar(st, true); audAprender(st.rows); } catch(e){ toast('No se pudo cargar: ' + e.message); } pintar(); };
      pie.append(b); }
  };
  const recargar = async () => { tabla.innerHTML = ''; tabla.append(h('div',{class:'ph'},'Cargando el registro…'));
    try { await audCargar(st, false); } catch(e){ tabla.innerHTML = ''; tabla.append(h('div',{class:'notice bad'}, 'No se pudo leer el registro de auditoría: ' + e.message)); return; }
    audAprender(st.rows); st.pag = 0; pintar(); };
  let tt = null;
  texto.addEventListener('input', () => { clearTimeout(tt); tt = setTimeout(() => { st.f.texto = texto.value; st.pag = 0; pintar(); }, 180); });
  tipo.addEventListener('change', () => { st.f.tipo = tipo.value; st.pag = 0; pintar(); });
  /* rol y fechas: en servidor se piden de nuevo (filtran en la base de datos); en local se filtra aquí */
  const srv = () => { st.f.rol = rol.value; st.f.desde = desde.value; st.f.hasta = hasta.value; st.pag = 0; Cloud.on ? recargar() : pintar(); };
  [rol, desde, hasta].forEach(x => x.addEventListener('change', srv));
  limpiar.onclick = () => { texto.value = ''; tipo.value = ''; const recarga = Cloud.on && (st.f.rol || st.f.desde || st.f.hasta); rol.value = ''; desde.value = ''; hasta.value = ''; st.f = { texto:'', tipo:'', rol:'', desde:'', hasta:'' }; st.pag = 0; recarga ? recargar() : pintar(); };
  csv.onclick = async () => {
    const L = audFiltrar(st); if (!L.length) return toast('No hay filas para descargar con estos filtros.');
    descargarTexto(`auditoria-${new Date().toISOString().slice(0,10)}.csv`, audCSV(L));
    await Auditoria.registrar('exportar_auditoria', { filas:L.length, filtros:Object.fromEntries(Object.entries(st.f).filter(([k, v]) => v)) });
    if (!Cloud.on){ st.rows = (Store.s.auditoriaLocal || []).slice(); pintar(); }
  };
  recargar();
}

ADM_TABS_EXTRA.push({ id:'auditoria', t:'Auditoría', antes:'ajustes', fn:(body) => audVista(body) });
route('/auditoria', (view) => {
  view.classList.add('wide');
  const puede = esRol('admin','autoridad');
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'}, puede ? (ROLES[Store.ses.rol].n + ' · ' + BIO.school.institucion) : 'Acceso restringido'),
    h('h1',{},'Registro de auditoría'),
    h('p',{}, puede ? 'Quién hizo qué y cuándo en la plataforma: notas, cuentas, cursos, tareas, adaptaciones, comunicados y ajustes. Sirve para rendir cuentas y para aclarar dudas sobre un cambio.' : 'Este registro solo lo pueden ver la administración y las autoridades de la institución.'))));
  if (!puede){
    view.append(h('div',{class:'card stack',style:'max-width:620px'},
      h('div',{class:'notice info'}, h('span',{}, h('b',{},'No tienes acceso a esta sección. '), 'Si necesitas saber quién cambió una nota o un dato, pídelo a la administración o a las autoridades de la institución.')),
      h('div',{class:'row'}, h('a',{class:'btn sm',href:'#/'},'Volver al inicio'), Store.ses.rol === 'estudiante' && !Store.ses.userId ? h('button',{class:'btn sm ghost',onclick:()=>openWizard('login')},'Entrar con otra cuenta') : null)));
    return;
  }
  audVista(view);
});

/* =====================================================================
   PAPELERA
   ===================================================================== */
let papVaciadoSesion = false;
/* quién envió cada elemento a la papelera (según la auditoría) */
async function papQuienes(){
  const out = {};
  try {
    let rows = [];
    if (Cloud.on){
      const [a, b] = await Promise.all([ Cloud.auditoria('accion=eq.enviar_a_papelera&order=fecha.desc&limit=500'), Cloud.auditoria('tabla=eq.cursos&accion=eq.update&order=fecha.desc&limit=500') ]);
      rows = a.concat(b.filter(r => r.despues && r.despues.eliminado && !(r.antes && r.antes.eliminado)));
    } else rows = (Store.s.auditoriaLocal || []).filter(r => r.accion === 'enviar_a_papelera');
    rows.forEach(r => { if (r.registro && !out[r.registro]) out[r.registro] = { nombre:r.actor_nombre || audQuien(r.actor), rol:r.actor_rol }; });
  } catch(e){ console.warn('papelera: quién', e.message); }
  return out;
}
function papGrupos(){
  const P = Papelera.s;
  const rol = d => d.rol === 'dece' ? 'DECE' : d.rol === 'autoridad' ? 'Autoridad' : '';
  return [
    { id:'usuarios', t:'Estudiantes', em:'🎒', items:Object.values(P.usuarios).map(u => ({ key:'u:'+u.codigo, reg:[u.codigo, u.uid], n:u.nombre, sub:`Código ${u.codigo} · ${audCursoTxt(u.year, u.paralelo)}`, ts:u.eliminado,
        restaurar:() => Papelera.restaurarEstudiante(u.codigo), borrar:() => Papelera.borrarEstudiante(u.codigo),
        efecto:`Se borran su cuenta, sus notas, notas congeladas, historial, adaptaciones, ficha NEE, códigos y vínculos con representantes. No se puede deshacer.` })) },
    { id:'docentes', t:'Docentes', em:'🧑‍🏫', items:Object.values(P.docentes).map(d => ({ key:'d:'+d.id, reg:[d.id], n:d.nombre, sub:`${d.email || ''}${d.prog && BIO.programas[d.prog] ? ' · ' + BIO.programas[d.prog].n : ''}`, ts:d.eliminado,
        restaurar:() => Papelera.restaurarCuenta(d.id), borrar:() => Papelera.borrarCuenta(d.id),
        efecto:'Se borra su cuenta de acceso. Las notas que registró se conservan porque pertenecen a los estudiantes.' })) },
    { id:'personal', t:'DECE y autoridades', em:'🏛️', items:Object.values(P.personal).map(d => ({ key:'p:'+d.id, reg:[d.id], n:d.nombre, sub:[rol(d), d.cargo, d.email].filter(Boolean).join(' · '), ts:d.eliminado,
        restaurar:() => Papelera.restaurarCuenta(d.id), borrar:() => Papelera.borrarCuenta(d.id),
        efecto:'Se borra su cuenta de acceso. Las fichas NEE que registró se conservan.' })) },
    { id:'cursos', t:'Cursos', em:'▦', items:P.cursos.map(c => ({ key:'c:'+c.id, reg:[c.id], n:`${audCursoTxt(c.nivel, c.paralelo)}`, sub:`${(BIO.programas[c.prog] || {}).n || ''}${c.anio ? ' · año ' + c.anio : ''}${c.docenteId && audNombre(c.docenteId) ? ' · ' + audNombre(c.docenteId) : ''}`, ts:c.eliminado,
        restaurar:() => Papelera.restaurarCurso(c.id), borrar:() => Papelera.borrarCurso(c.id),
        efecto:'Se borran el curso, sus tareas y sus comunicados. Los estudiantes de ese año y paralelo, y sus notas, no se tocan.' })) }
  ];
}
function papVista(body, rerender){
  const sel = new Set();
  const cab = h('div',{class:'card stack'},
    h('span',{class:'eyebrow'},'Papelera'),
    h('p',{style:'margin:0'}, 'Cuando eliminas un estudiante, un docente, una cuenta del DECE o de autoridades, o un curso, no se borra de inmediato: queda aquí ', h('b',{},'30 días'), ' por si fue un error.'),
    h('div',{class:'pap-como'},
      h('div',{}, h('b',{},'Mientras está en la papelera'), Cloud.on ? 'La cuenta queda bloqueada: no puede iniciar sesión y no aparece en listas, libros de calificaciones ni reportes. Sus notas se guardan intactas.' : 'No aparece en listas, libros de calificaciones ni reportes. Sus notas se guardan intactas.'),
      h('div',{}, h('b',{},'Si lo restauras'), 'Vuelve tal como estaba: la cuenta con su misma contraseña, sus notas, adaptaciones y ficha. Un docente recupera sus cursos si siguen sin docente.'),
      h('div',{}, h('b',{},'Después de 30 días'), 'Se elimina definitivamente junto con sus datos. También puedes hacerlo antes con "Eliminar definitivamente". El registro de auditoría conserva constancia de la acción.')));
  const aviso = h('div',{role:'status','aria-live':'polite'});
  const lista = h('div',{class:'stack',style:'gap:18px'});
  const bulk = h('div',{class:'adm-bulk',style:'display:none',role:'region','aria-label':'Acciones con los seleccionados'});
  body.append(...[avisoV18(), cab, aviso, bulk, lista].filter(Boolean));

  const pintarBulk = () => {
    bulk.innerHTML = ''; bulk.style.display = sel.size ? 'flex' : 'none'; if (!sel.size) return;
    const todos = papGrupos().flatMap(g => g.items), elegidos = todos.filter(i => sel.has(i.key));
    const b = h('button',{class:'btn sm primary'},`Restaurar ${sel.size} seleccionado${sel.size === 1 ? '' : 's'}`);
    b.onclick = async () => { b.disabled = true; b.textContent = 'Restaurando…'; let ok = 0; const err = [];
      /* primero los cursos, luego las personas (un docente recupera así sus cursos) */
      const orden = elegidos.slice().sort((x, y) => (x.key[0] === 'c' ? 0 : 1) - (y.key[0] === 'c' ? 0 : 1));
      for (const i of orden){ const r = await i.restaurar(); r.ok ? ok++ : err.push(`${i.n}: ${r.msg}`); }
      sel.clear(); toast(`${ok} restaurado${ok === 1 ? '' : 's'}.`);
      pintar(); if (err.length){ aviso.innerHTML = ''; aviso.append(h('div',{class:'notice warn'}, h('span',{}, h('b',{},'No se pudieron restaurar algunos: '), err.join(' · ')))); } };
    bulk.append(h('b',{}, `${sel.size} seleccionado${sel.size === 1 ? '' : 's'}`), b, h('button',{class:'btn sm ghost',onclick:()=>{ sel.clear(); pintar(); }},'Quitar selección'));
  };
  let quienes = {};
  const pintar = () => {
    lista.innerHTML = ''; const G = papGrupos(), total = G.reduce((a, g) => a + g.items.length, 0);
    [...sel].forEach(k => { if (!G.some(g => g.items.some(i => i.key === k))) sel.delete(k); });
    pintarBulk();
    if (!total){ lista.append(h('div',{class:'ph',style:'text-align:center;padding:36px 18px'}, h('div',{style:'font-size:2rem','aria-hidden':'true'},'🗑'), h('b',{},'La papelera está vacía. '), h('div',{class:'small muted',style:'margin-top:6px'},'Nada eliminado en los últimos 30 días. Cuando elimines a alguien o un curso, lo verás aquí y podrás recuperarlo.'))); return; }
    G.filter(g => g.items.length).forEach(g => {
      const items = g.items.slice().sort((a, b) => (a.ts || 0) - (b.ts || 0));
      const todos = h('input',{type:'checkbox','aria-label':`Seleccionar todos: ${g.t}`}); todos.checked = items.every(i => sel.has(i.key));
      todos.onchange = () => { items.forEach(i => todos.checked ? sel.add(i.key) : sel.delete(i.key)); pintar(); };
      lista.append(h('section',{class:'pap-grupo','aria-label':g.t},
        h('h3',{}, h('span',{'aria-hidden':'true'}, g.em), g.t, h('span',{class:'pill'}, String(items.length)),
          h('label',{class:'small muted',style:'margin-left:auto;display:flex;gap:6px;align-items:center;font-weight:500'}, todos, 'Todos')),
        ...items.map(i => {
          const dias = Papelera.diasRestantes(i.ts || Date.now()); const q = i.reg.map(r => quienes[r]).find(Boolean);
          const cb = h('input',{type:'checkbox','aria-label':'Seleccionar '+i.n}); cb.checked = sel.has(i.key);
          cb.onchange = () => { cb.checked ? sel.add(i.key) : sel.delete(i.key); pintar(); };
          const rest = h('button',{class:'btn sm'},'Restaurar');
          rest.onclick = async () => { rest.disabled = true; rest.textContent = 'Restaurando…'; const r = await i.restaurar();
            if (!r.ok){ rest.disabled = false; rest.textContent = 'Restaurar'; aviso.innerHTML = ''; aviso.append(h('div',{class:'notice warn'}, h('span',{}, r.msg))); return; }
            sel.delete(i.key); toast(`${i.n} se restauró.`); aviso.innerHTML = ''; pintar(); };
          const del = h('button',{class:'btn sm ghost danger-text'},'Eliminar definitivamente');
          del.onclick = () => confirmar({ titulo:`¿Eliminar definitivamente ${g.id === 'cursos' ? 'el curso ' + i.n : 'a ' + i.n}?`, texto:i.efecto, boton:'Eliminar definitivamente', peligro:true, escribir:'ELIMINAR',
            accion: async () => { const r = await i.borrar(); if (!r.ok) throw new Error(r.msg); sel.delete(i.key); toast(`${i.n} se eliminó definitivamente.`); pintar(); } });
          return h('div',{class:'pap-item'+(sel.has(i.key) ? ' sel' : '')}, cb,
            h('div',{}, h('div',{class:'pap-n'}, i.n), h('div',{class:'pap-m'},
              i.sub ? h('span',{}, i.sub) : null,
              h('span',{}, 'Enviado el ' + fechaCorta(i.ts)),
              h('span',{}, q ? `por ${q.nombre}${q.rol ? ' (' + AUD_ROL(q.rol).toLowerCase() + ')' : ''}` : 'por: no registrado'))),
            h('div',{class:'pap-acc'},
              h('span',{class:'pill ' + (dias <= 5 ? 'bad' : dias <= 10 ? 'warn' : ''),title:'Días que quedan para restaurarlo'}, dias === 0 ? 'Se elimina hoy' : `${dias} día${dias === 1 ? '' : 's'} para restaurar`),
              rest, del));
        })));
    });
  };
  const cargar = async () => {
    lista.innerHTML = ''; lista.append(h('div',{class:'ph'},'Revisando la papelera…'));
    if (!papVaciadoSesion){
      papVaciadoSesion = true;
      let n = 0; try { n = await Papelera.vaciarVencidos(); } catch(e){ console.warn('papelera', e.message); }
      aviso.innerHTML = '';
      aviso.append(h('div',{class:'notice ' + (n ? 'info' : 'ok')}, h('span',{}, n
        ? h('span',{}, h('b',{},n === 1 ? 'Se eliminó definitivamente 1 elemento ' : `Se eliminaron definitivamente ${n} elementos `), `que llevaba${n === 1 ? '' : 'n'} más de 30 días en la papelera.`)
        : 'Revisamos la papelera: nada había cumplido los 30 días.')));
    }
    quienes = await papQuienes();
    pintar();
  };
  cargar();
}
ADM_TABS_EXTRA.push({ id:'papelera', t:'Papelera', antes:'ajustes', fn:papVista });
</script>
