<style>
/* ---------- Familias (v1.8) ---------- */
.fam-form{display:grid;grid-template-columns:1fr 1fr;gap:10px 14px}
.fam-form label{display:flex;flex-direction:column;gap:5px;font-size:.82rem;font-weight:600;color:var(--ink-2)}
.fam-form .full{grid-column:1/-1}
.fam-form input,.fam-form select,.fam-in{width:100%;padding:9px 11px;border:1px solid var(--line-2);border-radius:9px;background:var(--bg-2);color:var(--ink);font:inherit;min-height:42px}
.fam-form .opc{font-weight:500;color:var(--ink-3)}
.fam-cod{font-family:var(--font-m);letter-spacing:.08em;text-transform:uppercase;font-size:1.05rem}
.fam-consent{display:flex!important;flex-direction:row!important;gap:10px!important;align-items:flex-start;font-weight:500!important;color:var(--ink)!important;padding:12px;border:1px solid var(--line);border-radius:12px;background:var(--bg-3)}
.fam-consent input{width:20px;height:20px;min-height:0;flex:none;margin-top:2px;accent-color:var(--accent)}
.fam-hijos{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:-4px 0 14px}
.fam-tabs{margin-bottom:16px}
.fam-stat .q{margin-top:6px;align-self:flex-start}
.fam-uni{display:flex;flex-direction:column;gap:4px}
.fam-uni .row{justify-content:space-between;gap:8px;flex-wrap:nowrap}
.fam-uni .t{font-size:.86rem;font-weight:600}
.fam-bar{height:7px;border-radius:5px;background:var(--bg-3);overflow:hidden}
.fam-bar i{display:block;height:100%;background:var(--accent)}
.fam-list{display:flex;flex-direction:column;gap:8px}
.fam-list .act .pill{margin-left:auto}
.fam-com{border-left:4px solid var(--accent);padding:10px 14px;border-radius:0 10px 10px 0;background:var(--bg-3)}
.fam-com h4{margin:0 0 4px;font-size:.96rem}
.fam-com p{margin:6px 0 0;white-space:pre-wrap;font-size:.9rem}
.fam-sem{max-width:860px}
.fam-sem h2{margin:0}
.fam-sem ul{margin:6px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:4px}
.fam-vacio{color:var(--ink-3);font-size:.9rem}
.fam-empty{max-width:640px}
/* panel docente */
.fam-reps{display:flex;flex-direction:column;gap:4px;font-size:.84rem}
.fam-codebox{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.fam-codebox b{font-family:var(--font-m);letter-spacing:.05em}
.fam-texto{min-height:230px;font-size:.88rem;line-height:1.5}
/* fichas y hojas imprimibles */
.fam-fichas{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.fam-ficha{border:1px dashed var(--line-2);border-radius:14px;padding:16px;display:grid;grid-template-columns:1fr auto;gap:8px 14px;background:var(--bg-2);break-inside:avoid}
.fam-ficha .cab{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid var(--line);padding-bottom:6px;gap:8px}
.fam-ficha .cod{font-family:var(--font-m);font-size:1.25rem;font-weight:800;letter-spacing:.08em}
.fam-ficha ol{margin:4px 0 0;padding-left:18px;font-size:.8rem;display:flex;flex-direction:column;gap:2px}
.fam-ficha .qr{align-self:center;justify-self:center;background:#fff;padding:4px;border-radius:8px;line-height:0}
.fam-ficha .qr svg{width:124px;height:124px}
.fam-hoja{max-width:820px;margin:0 auto 18px}
.fam-hoja pre{white-space:pre-wrap;font-family:inherit;font-size:.95rem;line-height:1.55;margin:0}
@media (max-width:720px){ .grid.fam-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px} .fam-stat{padding:14px} .fam-form{grid-template-columns:1fr} .fam-fichas{grid-template-columns:1fr} .fam-ficha{grid-template-columns:1fr} .fam-ficha .qr{justify-self:start} }
@media print{
  .fam-fichas{grid-template-columns:repeat(2,1fr);gap:8px}
  .fam-ficha{border:1px dashed #999;background:#fff;color:#000;grid-template-columns:1fr auto}
  .fam-hoja{break-after:page;border:0;box-shadow:none;max-width:none}
  .fam-hoja:last-child{break-after:auto}
  .fam-sem{max-width:none}
}
</style>
<script>
/* =====================================================================
   FAMILIAS Y REPRESENTANTES (v1.8)
   ---------------------------------------------------------------------
   · Acceso: paso "Soy representante" del asistente de bienvenida
     (famWizard). Con cuenta, o con el código de un solo uso que entrega
     la institución (FAM-XXXX-XXXX) y la aceptación del aviso de privacidad.
   · Vista #/familia con datos reales del representado: resumen, semana,
     comunicados y datos/consentimiento. Nunca muestra fichas NEE.
   · Pestaña "Familias" del panel docente: vínculos, códigos, fichas
     imprimibles con QR y resumen semanal listo para enviar.
   · Modo servidor: Cloud.* y RLS. Modo local: Store.s.famCodigos,
     Store.s.famVinculos y Store.s.familias (cuentas en este navegador).
   ===================================================================== */
const FAM_DEMO = 'demo-mateo';          /* estudiante de demostración del navegador */
const FAM_PARENTESCOS = ['Madre','Padre','Abuela','Abuelo','Tía','Tío','Hermana','Hermano','Representante legal','Otro'];
const FAM_DIA = 86400000;
if (typeof CRUMB_NAMES !== 'undefined') CRUMB_NAMES.familias = 'Familias';

/* ---------- datos ---------- */
/* normaliza lo que escribe la persona: "fam abcd 2345" → "FAM-ABCD-2345" */
function famNormCodigo(v){
  const t = String(v||'').toUpperCase().replace(/[^A-Z0-9-]/g,'');
  if (t === String(BIO.familyCode||'').toUpperCase()) return t;
  const s = t.replace(/-/g,'');
  return /^FAM[A-Z0-9]{8}$/.test(s) ? `FAM-${s.slice(3,7)}-${s.slice(7)}` : t;
}
function famNuevoCodigo(){ return `FAM-${codigoLegible(4)}-${codigoLegible(4)}`; }
function famCodigos(){ return Store.s.famCodigos = Store.s.famCodigos || []; }
function famVinculosTodos(){ return Store.s.famVinculos = Store.s.famVinculos || []; }
function famCodigoActivo(estCodigo){ return famCodigos().filter(c => c.estCodigo === estCodigo && c.activo && !c.usadoEn).sort((a,b)=>(b.creado||0)-(a.creado||0))[0] || null; }
/* vínculos de la cuenta de representante conectada */
function famVinculosMios(){
  if (Cloud.on) return ((Store.s.familia || {}).vinculos || []);
  const id = Store.ses.famId; return id ? famVinculosTodos().filter(v => v.familiaId === id) : [];
}
/* estudiante en modo local: listado cargado, estudiante demo del navegador o curso de ejemplo */
function famEstudianteLocal(codigo){
  if (codigo === FAM_DEMO){ const y = Store.ses.year || 2;
    return { codigo:FAM_DEMO, uid:null, nombre:'Mateo Andrade', nombres:'Mateo', apellidos:'Andrade', year:y, paralelo:Store.ses.paralelo || 'A', tel:'', rep:'', demo:true }; }
  const u = Users.get(codigo); if (u) return u;
  const r = BIO.getRoster().find(e => e.id === codigo);
  return r ? { codigo:r.id, uid:null, nombre:r.nombre, year:r.year, paralelo:r.paralelo, tel:r.repTel || '', rep:r.rep || '', notas:r.notas, ficticio:true } : null;
}
function famHijos(){
  if (Store.ses.rol !== 'familia') return [];
  if (Cloud.on) return ((Store.s.familia || {}).hijos || []);
  return [...new Set(famVinculosMios().map(v => v.estCodigo))].map(famEstudianteLocal).filter(Boolean);
}
/* gancho del núcleo: representado que se está mirando (lo usa la barra superior) */
function famHijoActual(){
  if (Store.ses.rol !== 'familia') return null;
  const hs = famHijos(); return hs.find(u => u.codigo === Store.ses.famHijo) || hs[0] || null;
}
/* notas y fechas del representado */
function famDatos(u){
  const year = +u.year, prog = BIO.progOf(year);
  const items = prog === 'cn' ? BIO.cnItemsDe(year) : BIO.gradeItemsOf(year);
  let notas = {}, fechas = {};
  if (Cloud.on){ const F = Store.s.familia || {}; notas = Object.assign({}, (F.notas||{})[u.codigo] || {}); fechas = Object.assign({}, (F.fechas||{})[u.codigo] || {}); }
  else if (u.codigo === FAM_DEMO){
    items.forEach(i => { const g = Store.gradeDemo(i.id); if (g != null) notas[i.id] = g; });
    Object.entries(Store.s.activities || {}).forEach(([k,a]) => { if (!a || !a.done) return; if (notas[k] == null){ const g = Store.gradeOf(k); if (g != null) notas[k] = g; } if (a.at) fechas[k] = a.at; });
  } else { notas = Object.assign({}, u.notas || {}, (Store.s.docente.notas || {})[u.codigo] || {}); fechas = Object.assign({}, (Store.s.docente.fechas || {})[u.codigo] || {}); }
  Object.keys(notas).forEach(k => { if (notas[k] == null) delete notas[k]; });
  return { year, prog, items, notas, fechas };
}
const famTitulo = id => { const it = (typeof itemDe === 'function' && itemDe(id)) || null; return it ? it.t : (Tareas.recurso(id).t || (BIO.activities[id]||{}).t || id); };
const famNum = n => n == null ? '–' : fmtNota(n).replace('.', ',');
const famDiaTxt = ms => new Date(ms).toLocaleDateString('es-EC', { weekday:'long', day:'numeric', month:'long' });
/* resumen de una semana (lo usan la familia y el docente) */
function famSemana(u, d){
  const ahora = Date.now(), desde = ahora - 7*FAM_DIA, hasta = ahora + 7*FAM_DIA;
  const hechas = Object.entries(d.fechas).filter(([k,f]) => f >= desde && d.notas[k] != null).sort((a,b)=>b[1]-a[1]).map(([k,f]) => ({ act:k, t:famTitulo(k), nota:d.notas[k], f }));
  const ts = Tareas.de(u.year, u.paralelo);
  const pend = ts.filter(t => d.notas[t.act] == null);
  const vencen = pend.filter(t => t.vence >= ahora - FAM_DIA/2 && t.vence <= hasta);
  const vencidas = pend.filter(t => t.vence < ahora - FAM_DIA/2);
  const res = Periodos.resumen(u.codigo, d.items, d.notas, d.fechas);
  const q = Periodos.actual();
  return { desde, ahora, hechas, vencen, vencidas, pend, res, q, qn:(Periodos.q(q)||{}).n || 'Quimestre actual' };
}
/* texto listo para enviar a la familia (docente) */
function famResumenTexto(u, d, opts={}){
  const s = famSemana(u, d), asig = (BIO.programas[d.prog] || BIO.programas.bio).n;
  const cual = x => { const c = Periodos.cualitativa(x); return c ? ` (${c.k}: ${c.n.toLowerCase()})` : ''; };
  const L = [];
  L.push(`${BIO.school.institucion} · ${asig} · ${BIO.nivel(u.year).corto} ${u.paralelo}`);
  L.push(`Resumen semanal de ${u.nombre}`);
  L.push(`Del ${fechaCorta(s.desde)} al ${fechaCorta(s.ahora)}`);
  L.push('');
  L.push('Lo que hizo esta semana:');
  if (s.hechas.length) s.hechas.slice(0,8).forEach(x => L.push(`• ${x.t}: ${famNum(x.nota)} sobre 10`)); else L.push('• No registró actividades en la plataforma esta semana.');
  L.push('');
  L.push('Lo que tiene pendiente:');
  if (s.vencidas.length) s.vencidas.forEach(t => L.push(`• ${Tareas.recurso(t.act).t}: se venció el ${tarFecha(t.vence)}`));
  if (s.vencen.length) s.vencen.forEach(t => L.push(`• ${Tareas.recurso(t.act).t}: entrega ${tarFecha(t.vence)}`));
  if (!s.vencidas.length && !s.vencen.length) L.push('• Nada pendiente para los próximos siete días.');
  L.push('');
  L.push(s.res[s.q] != null ? `Promedio del ${s.qn.toLowerCase()}: ${famNum(s.res[s.q])}${cual(s.res[s.q])}` : `Promedio del ${s.qn.toLowerCase()}: todavía no tiene actividades calificadas.`);
  if (s.res.anual != null) L.push(`Promedio del año hasta hoy: ${famNum(s.res.anual)}`);
  L.push('');
  L.push(opts.firma || 'Gracias por acompañar su aprendizaje desde casa. Si tiene preguntas, puede responder este mensaje.');
  return L.join('\n');
}

/* ---------- cuentas locales de representantes (solo modo local) ---------- */
function famCuentaLocal(email){ const e = String(email||'').trim().toLowerCase(); return Object.values(Store.s.familias || {}).find(f => f.email === e && !f.eliminado) || null; }
function famEntrarLocal(f, estCodigo){
  f.ultimoAcceso = Date.now();
  Object.assign(Store.ses, { rol:'familia', famId:f.id, famHijo: estCodigo || (famVinculosTodos().find(v => v.familiaId === f.id) || {}).estCodigo || null, onboarded:true, userId:null, docenteId:null, programa:null, famNombre:f.nombre });
  Store.save(); Store.log('inicio_sesion', { rol:'familia' });
}
async function famLoginLocal(email, pass){
  const f = famCuentaLocal(email); if (!f) return null;
  if (await hashPass(pass) !== f.hash) return { ok:false, msg:'La contraseña no coincide. Si la olvidó, comuníquese con la institución.' };
  famEntrarLocal(f); return { ok:true, rol:'familia' };
}
/* canje del código en modo local: valida contra los códigos de este navegador (o el de demostración) */
async function famCanjearLocal(d){
  const codigo = famNormCodigo(d.codigo);
  let est = null, cod = null;
  if (codigo === String(BIO.familyCode).toUpperCase()) est = FAM_DEMO;
  else { cod = famCodigos().find(c => c.codigo === codigo);
    if (!cod || !cod.activo || cod.usadoEn) return { ok:false, msg:'Ese código no existe o ya fue usado. Pida uno nuevo a la docente o a la institución.' };
    est = cod.estCodigo; }
  if (!famEstudianteLocal(est)) return { ok:false, msg:'El estudiante de ese código ya no está activo.' };
  const F = Store.s.familias = Store.s.familias || {};
  let fam = (Store.ses.rol === 'familia' && Store.ses.famId && F[Store.ses.famId]) ? F[Store.ses.famId] : null;
  if (!fam){
    const ya = famCuentaLocal(d.email);
    if (ya){ if (await hashPass(d.password) !== ya.hash) return { ok:false, msg:'Ese correo ya tiene cuenta de representante y la contraseña no coincide.' }; fam = ya; }
    else { const id = 'f' + Date.now().toString(36);
      fam = F[id] = { id, nombres:capital(d.nombres), apellidos:capital(d.apellidos), nombre:(capital(d.nombres)+' '+capital(d.apellidos)).trim(), email:String(d.email).trim().toLowerCase(), tel:String(d.tel||'').trim(), hash:await hashPass(d.password), creado:Date.now(), ultimoAcceso:null, privacidad:Date.now() }; }
  }
  const V = Store.s.famVinculos = famVinculosTodos().filter(v => !(v.familiaId === fam.id && v.estCodigo === est));
  V.push({ familiaId:fam.id, estUid:null, estCodigo:est, parentesco:String(d.parentesco||'').slice(0,40), consentimiento:Date.now(), version:String(d.version||'1.0'), creado:Date.now() });
  if (cod) Object.assign(cod, { activo:false, usadoEn:Date.now(), usadoPor:fam.id });
  Store.save();
  Auditoria.local('vincular_representante', { codigo, estudiante:(famEstudianteLocal(est)||{}).nombre }, { tabla:'familia_vinculos', registro:fam.id+':'+est });
  famEntrarLocal(fam, est);
  return { ok:true, estudiante:(famEstudianteLocal(est)||{}).nombre, estCodigo:est };
}

/* ---------- asistente: "Soy representante" ---------- */
/* cierra el asistente y muestra #/familia (aunque ya se esté en esa ruta) */
function famIrAFamilia(close){ close(); if (location.hash === '#/familia') render(); else navigate('#/familia'); }
function famWizard(box, head, close, irA, pend){
  const conectado = Store.ses.rol === 'familia' && (Cloud.on ? !!(Cloud.ses && Cloud.perfil && Cloud.perfil.rol === 'familia') : !!Store.ses.famId);
  const modo = pend.famModo || ((pend.famCodigo || conectado) ? 'codigo' : null);
  const add = (...xs) => box.append(...xs.filter(Boolean));   /* append del DOM convierte null en texto */
  const ir = m => { pend.famModo = m; irA('familia'); };
  const aviso = (el, txt, cls='warn') => { el.className = 'notice ' + cls; el.textContent = txt; el.style.display = 'flex'; };
  const atras = h('button',{class:'btn sm ghost',onclick:()=>{ pend.famModo = null; pend.famCodigo = null; if (modo && !(conectado && modo === 'codigo')) ir(null); else irA('rol'); }},'← Atrás');

  if (!modo){
    add(head('Representantes','¿Cómo va a entrar?','Aquí usted ve el avance, lo pendiente y los comunicados de su representado. Solo lectura: nada de lo que haga cambia sus calificaciones.'),
      h('div',{class:'wz-roles',style:'grid-template-columns:repeat(2,1fr)'},
        h('button',{class:'wz-role',onclick:()=>ir('cuenta')}, h('span',{class:'em'},'🔑'), h('b',{},'Ya tengo cuenta'), h('span',{class:'small muted'},'Entre con el correo y la contraseña que creó la primera vez.')),
        h('button',{class:'wz-role',onclick:()=>ir('codigo')}, h('span',{class:'em'},'🎫'), h('b',{},'Tengo un código'), h('span',{class:'small muted'},'El código FAM-XXXX-XXXX que le entregó la institución. Sirve una sola vez.'))),
      Cloud.on ? null : h('p',{class:'small muted'},`Demostración: el código ${BIO.familyCode} vincula al estudiante de ejemplo de este navegador.`),
      h('div',{class:'row'}, atras));
    return;
  }

  if (modo === 'cuenta'){
    const em = h('input',{type:'email',class:'fam-in','aria-label':'Correo electrónico',autocomplete:'username',placeholder:'su.correo@ejemplo.com'});
    const pw = h('input',{type:'password',class:'fam-in','aria-label':'Contraseña',autocomplete:'current-password',placeholder:'Su contraseña'});
    const msg = h('div',{class:'notice',role:'alert',style:'display:none'});
    const btn = h('button',{class:'btn primary'},'Entrar');
    const entrar = async () => {
      msg.style.display = 'none'; if (!em.value.trim() || !pw.value){ aviso(msg, 'Escriba su correo y su contraseña.'); return; }
      btn.disabled = true; btn.textContent = 'Entrando…';
      let r = null; try { r = (!Cloud.on && await famLoginLocal(em.value, pw.value)) || await Users.login(em.value, pw.value); } catch(e){ r = { ok:false, msg:'No se pudo entrar: '+e.message }; }
      btn.disabled = false; btn.textContent = 'Entrar';
      if (!r.ok){ aviso(msg, r.msg || 'No se pudo entrar.'); return; }
      Store.ses.onboarded = true; Store.save(); updateChips();
      if (r.rol === 'familia'){ toast('Bienvenida. Ya puede ver el avance de su representado.'); famIrAFamilia(close); return; }
      toast(`Entró como ${(ROLES[r.rol]||{}).n || r.rol}.`);
      close({ admin:'#/admin', docente:'#/docente', autoridad:'#/institucion', dece:'#/nee' }[r.rol] || (Store.prog()==='cn' ? '#/cn' : '#/'));
    };
    btn.onclick = entrar; pw.addEventListener('keydown', e => { if (e.key === 'Enter') entrar(); });
    add(head('Representantes','Entre con su cuenta','Use el correo y la contraseña que registró al canjear el código de su representado.'),
      h('div',{class:'stack',style:'gap:8px;max-width:420px'}, em, pw, msg, btn),
      h('p',{class:'small muted'},'¿Olvidó su contraseña? Comuníquese con la institución. ¿Aún no tiene cuenta? Use el código que le entregaron.'),
      h('div',{class:'row'}, h('button',{class:'btn sm ghost',onclick:()=>ir('codigo')},'Tengo un código'), atras));
    setTimeout(() => em.focus(), 50);
    return;
  }

  /* modo código: cuenta nueva o representado adicional */
  const pv = Inst.privacidad();
  const f = {
    codigo: h('input',{type:'text',class:'fam-cod',value:pend.famCodigo ? famNormCodigo(pend.famCodigo) : '',placeholder:'FAM-XXXX-XXXX','aria-label':'Código de representante',autocomplete:'off',autocapitalize:'characters',spellcheck:'false',maxlength:'16'}),
    nombres: h('input',{type:'text',autocomplete:'given-name'}), apellidos: h('input',{type:'text',autocomplete:'family-name'}),
    email: h('input',{type:'email',autocomplete:'email',placeholder:'su.correo@ejemplo.com'}),
    p1: h('input',{type:'password',autocomplete:'new-password',placeholder:'Mínimo 8 caracteres'}), p2: h('input',{type:'password',autocomplete:'new-password'}),
    parentesco: h('select',{}, h('option',{value:''},'Elija…'), FAM_PARENTESCOS.map(p => h('option',{value:p},p))),
    tel: h('input',{type:'tel',autocomplete:'tel',placeholder:'0991234567'}),
    ok: h('input',{type:'checkbox'})
  };
  f.codigo.addEventListener('input', () => { const p = f.codigo.selectionStart; f.codigo.value = f.codigo.value.toUpperCase(); try { f.codigo.setSelectionRange(p,p); } catch(e){} });
  const msg = h('div',{class:'notice',role:'alert',style:'display:none'});
  const btn = h('button',{class:'btn primary'}, conectado ? 'Vincular representado' : 'Crear mi cuenta y entrar');
  const enviar = async () => {
    msg.style.display = 'none';
    const codigo = famNormCodigo(f.codigo.value);
    const esDemo = !Cloud.on && codigo === String(BIO.familyCode).toUpperCase();
    if (!/^FAM-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(codigo) && !esDemo){ aviso(msg, 'El código tiene la forma FAM-XXXX-XXXX (letras y números). Revíselo en la ficha que le entregaron.'); f.codigo.focus(); return; }
    if (!conectado){
      if (!f.nombres.value.trim() || !f.apellidos.value.trim()){ aviso(msg, 'Escriba sus nombres y apellidos.'); f.nombres.focus(); return; }
      if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(f.email.value.trim())){ aviso(msg, 'Escriba un correo válido: lo usará para entrar.'); f.email.focus(); return; }
      if (f.p1.value.length < 8){ aviso(msg, 'La contraseña debe tener al menos 8 caracteres.'); f.p1.focus(); return; }
      if (f.p1.value !== f.p2.value){ aviso(msg, 'Las dos contraseñas no coinciden.'); f.p2.focus(); return; }
      if (f.tel.value.trim() && !/^[0-9 +()-]{7,16}$/.test(f.tel.value.trim())){ aviso(msg, 'El teléfono solo puede tener números (por ejemplo 0991234567).'); f.tel.focus(); return; }
    }
    if (!f.parentesco.value){ aviso(msg, 'Indique su parentesco con el estudiante.'); f.parentesco.focus(); return; }
    if (!f.ok.checked){ aviso(msg, 'Para continuar debe leer y aceptar el aviso de privacidad.'); f.ok.focus(); return; }
    const datos = { codigo, parentesco:f.parentesco.value, consentimiento:true, version:pv.version };
    if (!conectado) Object.assign(datos, { nombres:f.nombres.value.trim(), apellidos:f.apellidos.value.trim(), email:f.email.value.trim().toLowerCase(), password:f.p1.value, tel:f.tel.value.trim() });
    btn.disabled = true; btn.textContent = 'Verificando…';
    try {
      if (!Cloud.on){
        const r = await famCanjearLocal(datos); if (!r.ok) throw new Error(r.msg);
        updateChips(); toast(`Listo. Ya puede ver el avance de ${r.estudiante}.`); famIrAFamilia(close); return;
      }
      const r = await Cloud.canjearCodigo(datos);
      if (conectado){
        await Cloud.pull(); const hijo = ((Store.s.familia||{}).hijos||[]).find(u => u.nombre === r.estudiante);
        if (hijo) Store.ses.famHijo = hijo.codigo; Store.save(); updateChips();
        toast(`Listo. Se agregó a ${r.estudiante || 'su representado'}.`); famIrAFamilia(close); return;
      }
      btn.textContent = 'Entrando…';
      const l = await Users.login(datos.email, datos.password);
      if (!l.ok) throw new Error('Su cuenta quedó creada, pero no se pudo entrar: ' + l.msg);
      Store.ses.onboarded = true; Store.save(); updateChips();
      toast(`Bienvenida. Ya puede ver el avance de ${r.estudiante || 'su representado'}.`); famIrAFamilia(close);
    } catch(e){ aviso(msg, e.message || 'No se pudo vincular.'); btn.disabled = false; btn.textContent = conectado ? 'Vincular representado' : 'Crear mi cuenta y entrar'; }
  };
  btn.onclick = enviar;
  const L = (t, el, cls, opc) => h('label',{class:cls||''}, h('span',{}, t, opc ? h('span',{class:'opc'},' (opcional)') : null), el);
  const privUrl = location.pathname + location.search + '#/privacidad';
  add(
    conectado ? head('Representantes','Agregar otro representado',`Escriba el código de su otro representado. Quedará vinculado a su cuenta${Store.s.user && Cloud.on ? ' ('+Store.s.user.nombre+')' : ''}.`)
              : head('Representantes','Cree su cuenta con el código','El código vincula su cuenta con su representado y deja de servir al usarse. Si ya tiene cuenta con otro representado, escriba el mismo correo y contraseña.'),
    h('div',{class:'fam-form'},
      L('Código de representante', f.codigo, 'full'),
      conectado ? null : L('Nombres', f.nombres), conectado ? null : L('Apellidos', f.apellidos),
      conectado ? null : L('Correo electrónico', f.email, 'full'),
      conectado ? null : L('Contraseña', f.p1), conectado ? null : L('Repita la contraseña', f.p2),
      L('Parentesco', f.parentesco), conectado ? null : L('Teléfono', f.tel, '', true),
      h('label',{class:'fam-consent full'}, f.ok,
        h('span',{class:'small'}, 'Leí y acepto el ', h('a',{href:privUrl,target:'_blank',rel:'noopener'},'aviso de privacidad'), ` (versión ${pv.version}) de ${pv.responsable}. Entiendo que veré las calificaciones, tareas y comunicados de mi representado, y que puedo retirar este consentimiento cuando quiera desde "Mis datos".`))),
    msg, h('div',{class:'row'}, btn, conectado ? h('button',{class:'btn sm ghost',onclick:()=>close()},'Cancelar') : atras),
    Cloud.on ? null : h('p',{class:'small muted'},`Demostración: el código ${BIO.familyCode} vincula al estudiante de ejemplo de este navegador. Los datos se guardan solo aquí.`));
  setTimeout(() => (f.codigo.value ? (conectado ? f.parentesco : f.nombres) : f.codigo).focus(), 50);
}

/* ---------- vista #/familia ---------- */
route('/familia', (view, q) => {
  if (Store.ses.rol !== 'familia'){ famGate(view); return; }
  const hijos = famHijos(), u = famHijoActual();
  const tab = ['resumen','semana','comunicados','datos'].includes(q.t) ? q.t : 'resumen';
  const act = h('div',{class:'row noprint'},
    Cloud.on ? h('button',{class:'btn sm ghost',onclick:async function(){ this.disabled = true; this.textContent = 'Actualizando…'; try { await Cloud.pull(); toast('Datos actualizados.'); } catch(e){ toast('No se pudo actualizar: '+e.message); } render(); }},'↻ Actualizar') : null,
    h('button',{class:'btn sm',onclick:()=>openWizard('familia')},'＋ Agregar otro representado'),
    h('button',{class:'btn sm ghost',onclick:cerrarSesion},'Cerrar sesión'));
  if (!u){
    view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Representante'), h('h1',{},'Todavía no tiene representados vinculados'),
      h('p',{},'Para ver el avance de un estudiante necesita el código de representante que entrega la institución. Cada código sirve una sola vez.')), act));
    view.append(h('div',{class:'card stack fam-empty'}, h('span',{class:'eyebrow'},'Qué hacer'),
      h('ol',{class:'small',style:'margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px'},
        h('li',{},'Pida a la docente o a la institución el código de su representado (FAM-XXXX-XXXX).'),
        h('li',{},'Pulse "Tengo un código", escríbalo y acepte el aviso de privacidad.'),
        h('li',{},'Si retiró su consentimiento antes, necesitará un código nuevo.')),
      h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>openWizard('familia')},'Tengo un código')));
    avisoV18() && view.prepend(avisoV18());
    return;
  }
  const d = famDatos(u), primer = (u.nombres || u.nombre.split(' ').slice(-1)[0] || u.nombre).split(' ')[0];
  const prog = BIO.programas[d.prog] || BIO.programas.bio;
  view.append(h('div',{class:'page-head noprint'}, h('div',{}, h('span',{class:'eyebrow'},'Representante · solo lectura'), h('h1',{},`Avance de ${primer}`),
      h('p',{},`${u.nombre} · ${BIO.nivel(u.year).n}${u.paralelo ? ' "'+u.paralelo+'"' : ''} · ${prog.n} · ${BIO.school.institucion}. Aquí ve lo que su representado está aprendiendo, lo que tiene pendiente y cómo acompañarlo en casa.`)), act));
  const aV = avisoV18(); if (aV) view.append(aV);
  if (hijos.length > 1) view.append(h('div',{class:'fam-hijos noprint',role:'group','aria-label':'Representado'}, h('span',{class:'small muted'},'Representado:'),
    hijos.map(x => h('button',{class:'chip'+(x.codigo === u.codigo ? ' picked' : ''),'aria-pressed':String(x.codigo === u.codigo),onclick:()=>{ Store.ses.famHijo = x.codigo; Store.save(); updateChips(); render(); }}, x.nombre))));
  const tabs = h('div',{class:'tabs fam-tabs noprint',role:'tablist'},
    [['resumen','Resumen'],['semana','Semana'],['comunicados','Comunicados'],['datos','Mis datos y consentimiento']].map(([id,t]) =>
      h('button',{role:'tab','aria-selected':String(id===tab),onclick:()=>navigate(id==='resumen' ? '#/familia' : '#/familia?t='+id)}, t)));
  view.append(tabs);
  ({ resumen:famTabResumen, semana:famTabSemana, comunicados:famTabComunicados, datos:famTabDatos })[tab](view, u, d);
});

function famStat(v, l, extra){ return h('div',{class:'card stat fam-stat'}, h('span',{class:'v'}, String(v)), h('span',{class:'l'}, l), extra || null); }
function famCualPill(n){ const c = Periodos.cualitativa(n); return c ? h('span',{class:'pill q '+(c.k==='DAR'||c.k==='AAR' ? 'ok' : c.k==='PAAR' ? 'warn' : 'bad'),title:c.n}, c.k) : null; }
function famComunicadosDe(u){ return (typeof comGestor !== 'undefined') ? comGestor.de(u.year, u.paralelo, ['familias','todos']) : []; }
function famComNodo(c){ return h('article',{class:'fam-com'}, h('h4',{}, c.titulo), h('span',{class:'small muted'}, `${fechaHora(c.creado)} · ${typeof comParaTxt === 'function' ? comParaTxt(c.para) : c.para}`), c.texto ? h('p',{}, c.texto) : null); }

function famTabResumen(view, u, d){
  const res = Periodos.resumen(u.codigo, d.items, d.notas, d.fechas), qa = Periodos.actual(), qn = (Periodos.q(qa)||{}).n || 'Quimestre actual';
  const hechas = d.items.filter(i => d.notas[i.id] != null).length;
  const ts = Tareas.de(u.year, u.paralelo), pend = ts.filter(t => d.notas[t.act] == null).sort((a,b)=>a.vence-b.vence);
  const venc = pend.filter(t => t.vence < Date.now());
  view.append(h('div',{class:'grid g4 fam-stats'},
    famStat(famNum(res[qa]), `promedio del ${qn.toLowerCase()} (sobre 10)`, famCualPill(res[qa])),
    famStat(famNum(res.anual), 'promedio del año hasta hoy', famCualPill(res.anual)),
    famStat(`${hechas}/${d.items.length}`, 'actividades del año completadas'),
    famStat(pend.length, venc.length ? `pendientes · ${venc.length} vencida${venc.length===1?'':'s'}` : 'tareas pendientes')));
  const c = Periodos.cualitativa(res[qa] ?? res.anual);
  view.append(h('p',{class:'small muted',style:'margin:8px 0 0'}, c ? `Escala del Ministerio de Educación: ${c.k} = ${c.n.toLowerCase()}. Los promedios incluyen solo las actividades ya resueltas.` : 'Todavía no hay actividades calificadas este quimestre. El promedio aparecerá cuando resuelva sus primeros retos.'));

  /* pendientes */
  const pb = h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},'Lo que tiene pendiente'));
  if (!pend.length) pb.append(h('div',{class:'notice ok'},'No tiene tareas pendientes. Todo lo asignado está entregado.'));
  else pb.append(h('div',{class:'fam-list'}, pend.map(t => { const r = Tareas.recurso(t.act), dias = Math.ceil((t.vence - Date.now())/FAM_DIA);
    return h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--bg-3)','aria-hidden':'true'}, dias < 0 ? '⏰' : '📌'),
      h('span',{}, h('div',{class:'t'}, r.t), h('div',{class:'d'}, (dias < 0 ? `Se venció hace ${-dias} día${dias===-1?'':'s'}` : dias === 0 ? 'Vence hoy' : dias === 1 ? 'Vence mañana' : `Faltan ${dias} días`) + (t.nota ? ' · ' + t.nota : ''))),
      h('span',{class:'pill '+(dias < 0 ? 'bad' : dias <= 2 ? 'warn' : '')}, tarFecha(t.vence))); })));
  view.append(pb);

  /* qué estudia y últimas actividades */
  const g = h('div',{class:'grid g2',style:'margin-top:16px'});
  const unis = d.prog === 'cn'
    ? BIO.cnUnidadesDe(u.year).map(x => ({ id:x.id, t:`${x.dom==='cvt' ? 'Vida y Tierra' : 'Ciencias Físicas'} · U${x.n}: ${x.t}` }))
    : BIO.unitsOf(u.year).map(n => { const x = BIO.units.find(y => y.n === n) || { n, t:'' }; return { id:n, t:`Unidad ${n}: ${x.t}` }; });
  g.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},`Qué estudia en ${BIO.nivel(u.year).corto}`),
    unis.length ? unis.map(x => { const its = d.items.filter(i => i.unidad === x.id), n = its.filter(i => d.notas[i.id] != null).length, pc = its.length ? Math.round(n/its.length*100) : 0;
      return h('div',{class:'fam-uni'}, h('div',{class:'row'}, h('span',{class:'t'}, x.t), h('span',{class:'small muted',style:'white-space:nowrap'}, `${n} de ${its.length}`)),
        h('div',{class:'fam-bar',role:'img','aria-label':`${pc} % de las actividades de esta unidad`}, h('i',{style:`width:${pc}%`}))); }) : h('p',{class:'fam-vacio'},'Sin unidades registradas para este año.')));
  const ult = Object.entries(d.fechas).filter(([k]) => d.notas[k] != null).sort((a,b)=>b[1]-a[1]).slice(0,5);
  g.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Últimas actividades completadas'),
    ult.length ? h('div',{class:'fam-list'}, ult.map(([k,f]) => h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--bg-3)','aria-hidden':'true'},'✓'),
      h('span',{}, h('div',{class:'t'}, famTitulo(k)), h('div',{class:'d'}, `${fechaCorta(f)} · ${timeAgo(f)}`)),
      h('span',{class:'pill '+(d.notas[k] >= 7 ? 'ok' : d.notas[k] >= 4.01 ? 'warn' : 'bad')}, famNum(d.notas[k])))))
      : h('p',{class:'fam-vacio'}, hechas ? 'Sus actividades aparecerán aquí con la fecha en que las resolvió.' : 'Todavía no ha completado actividades en la plataforma.')));
  view.append(g);

  /* logros y comunicados */
  const g2 = h('div',{class:'grid g2',style:'margin-top:16px'});
  const logros = [];
  if (u.codigo === FAM_DEMO && !Cloud.on) BIO.badges.filter(b => (Store.s.badges||[]).includes(b.id)).forEach(b => logros.push([b.em, b.n, b.d]));
  const altas = d.items.filter(i => d.notas[i.id] >= 9);
  if (altas.length) logros.push(['⭐', `${altas.length} actividad${altas.length===1?'':'es'} con 9 o más`, altas.slice(0,3).map(i => i.t).join(' · ') + (altas.length > 3 ? '…' : '')]);
  const aTiempo = ts.filter(t => d.notas[t.act] != null && (!d.fechas[t.act] || d.fechas[t.act] <= t.vence));
  if (aTiempo.length) logros.push(['📅', `${aTiempo.length} tarea${aTiempo.length===1?'':'s'} entregada${aTiempo.length===1?'':'s'} a tiempo`, 'Cumplió con las fechas que puso su docente.']);
  const unCompleta = unis.find(x => { const its = d.items.filter(i => i.unidad === x.id); return its.length && its.every(i => d.notas[i.id] != null); });
  if (unCompleta) logros.push(['🏁', 'Completó una unidad entera', unCompleta.t]);
  g2.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Logros'),
    logros.length ? h('div',{class:'fam-list'}, logros.map(([em,t,dd]) => h('div',{class:'act'}, h('span',{class:'ico',style:'background:var(--bg-3)','aria-hidden':'true'}, em), h('span',{}, h('div',{class:'t'}, t), h('div',{class:'d'}, dd)))))
      : h('p',{class:'fam-vacio'},'Los logros aparecen al obtener notas altas, entregar a tiempo o completar una unidad.')));
  const coms = famComunicadosDe(u).slice(0,2);
  g2.append(h('div',{class:'card stack'}, h('div',{class:'row',style:'justify-content:space-between'}, h('span',{class:'eyebrow'},'Comunicados recientes'), h('a',{class:'btn sm ghost',href:'#/familia?t=comunicados'},'Ver todos')),
    coms.length ? coms.map(famComNodo) : h('p',{class:'fam-vacio'},'La docente todavía no ha enviado comunicados a las familias de este curso.')));
  view.append(g2);

  /* cómo acompañar */
  const cn = d.prog === 'cn';
  view.append(h('div',{class:'card stack',style:'margin-top:16px'}, h('span',{class:'eyebrow'},`Cómo acompañar en casa (sin ser experto en ${cn ? 'Ciencias' : 'Biología'})`),
    h('div',{class:'grid g3'},
      [['🗣','Pregúntele qué exploró', cn ? '"¿Qué experimento hiciste hoy? ¿Qué pasó cuando cambiaste la variable?" Explicar en voz alta consolida lo aprendido.' : '"¿Qué parte del corazón viste hoy? ¿Para qué sirve?" Explicar en voz alta consolida lo aprendido.'],
       ['⏱','20 minutos bastan','Es mejor entrar tres veces por semana un rato corto que una sola vez por mucho tiempo.'],
       ['🎯','Revise el reto','Cada recurso plantea un reto. Pregúntele si ya lo resolvió y qué respondió.']]
      .map(([em,t,dd]) => h('div',{class:'stack',style:'gap:4px'}, h('span',{style:'font-size:1.4rem','aria-hidden':'true'},em), h('b',{},t), h('p',{class:'small muted'},dd))))));
  view.append(h('p',{class:'small muted',style:'margin-top:14px'},'Vista de solo lectura: usted no puede modificar calificaciones ni actividades. ' + (Cloud.on ? 'Los datos vienen del servidor de la institución.' : 'Modo de demostración: los datos se guardan solo en este navegador.')));
}

function famTabSemana(view, u, d){
  const s = famSemana(u, d);
  const lista = (arr, fn, vacio) => arr.length ? h('ul',{}, arr.map(fn)) : h('p',{class:'fam-vacio'}, vacio);
  const coms = famComunicadosDe(u).filter(c => c.creado >= s.desde);
  view.append(h('div',{class:'row noprint',style:'justify-content:space-between;margin-bottom:12px'},
    h('p',{class:'small muted',style:'margin:0'},'Resumen listo para imprimir o guardar en PDF.'),
    h('button',{class:'btn sm primary',onclick:()=>window.print()},'Imprimir')));
  view.append(h('div',{class:'card stack fam-sem'},
    h('div',{}, h('span',{class:'eyebrow'}, `${BIO.school.institucion} · ${(BIO.programas[d.prog]||BIO.programas.bio).n}`), h('h2',{}, `Semana de ${u.nombre}`),
      h('p',{class:'small muted',style:'margin:4px 0 0'}, `${BIO.nivel(u.year).n}${u.paralelo ? ' "'+u.paralelo+'"' : ''} · del ${famDiaTxt(s.desde)} al ${famDiaTxt(s.ahora)}`)),
    h('div',{class:'grid g3 fam-stats'},
      famStat(s.hechas.length, 'actividades resueltas en 7 días'),
      famStat(s.vencen.length + s.vencidas.length, 'tareas por entregar'),
      famStat(famNum(s.res[s.q]), `promedio del ${s.qn.toLowerCase()}`, famCualPill(s.res[s.q]))),
    h('div',{class:'stack',style:'gap:4px'}, h('b',{},'Lo que hizo en los últimos 7 días'),
      lista(s.hechas, x => h('li',{}, `${x.t} · ${famNum(x.nota)} sobre 10 · ${fechaCorta(x.f)}`), 'No registró actividades en la plataforma en estos días.')),
    h('div',{class:'stack',style:'gap:4px'}, h('b',{},'Lo que vence en los próximos 7 días'),
      lista(s.vencen, t => h('li',{}, `${Tareas.recurso(t.act).t} · ${famDiaTxt(t.vence)}` + (t.nota ? ` · ${t.nota}` : '')), 'Nada vence en los próximos siete días.')),
    s.vencidas.length ? h('div',{class:'stack',style:'gap:4px'}, h('b',{},'Tareas vencidas sin entregar'),
      lista(s.vencidas, t => h('li',{}, `${Tareas.recurso(t.act).t} · venció el ${famDiaTxt(t.vence)}`), '')) : null,
    coms.length ? h('div',{class:'stack',style:'gap:4px'}, h('b',{},'Comunicados de la semana'), lista(coms, c => h('li',{}, `${c.titulo} (${fechaCorta(c.creado)})`), '')) : null,
    h('p',{class:'small muted',style:'margin:0'}, `Generado el ${fechaHora(Date.now())}. Vista de solo lectura para la familia.`)));
}

function famTabComunicados(view, u){
  const cs = famComunicadosDe(u);
  view.append(h('p',{class:'small muted',style:'margin:0 0 12px'}, `Mensajes de la docente para las familias de ${BIO.nivel(u.year).corto}${u.paralelo ? ' "'+u.paralelo+'"' : ''}. Los más recientes primero.`));
  if (!cs.length){ view.append(h('div',{class:'ph'},'Todavía no hay comunicados para las familias de este curso.')); return; }
  view.append(h('div',{class:'stack',style:'max-width:820px'}, cs.map(famComNodo)));
}

function famTabDatos(view, u, d){
  const v = famVinculosMios().find(x => x.estCodigo === u.codigo) || null;
  const pv = Inst.privacidad();
  const cuenta = Cloud.on ? { nombre:Store.s.user.nombre, email:(Cloud.perfil||{}).email || (Cloud.ses||{}).email || '' } : ((Store.s.familias||{})[Store.ses.famId] || { nombre:'Representante de demostración', email:'—' });
  const card = h('div',{class:'card stack',style:'max-width:820px'}, h('span',{class:'eyebrow'},'Su vínculo con ' + u.nombre),
    h('dl',{class:'kv'},
      h('dt',{},'Cuenta'), h('dd',{}, `${cuenta.nombre || '—'}${cuenta.email ? ' · ' + cuenta.email : ''}`),
      h('dt',{},'Representado'), h('dd',{}, `${u.nombre} · ${BIO.nivel(u.year).corto}${u.paralelo ? ' "'+u.paralelo+'"' : ''}`),
      h('dt',{},'Parentesco'), h('dd',{}, (v && v.parentesco) || '—'),
      h('dt',{},'Consentimiento'), h('dd',{}, v && v.consentimiento ? `Otorgado el ${fechaHora(v.consentimiento)}` : '—'),
      h('dt',{},'Versión del aviso'), h('dd',{}, v && v.version ? `${v.version}${String(v.version) !== String(pv.version) ? ` (el aviso vigente es la versión ${pv.version})` : ' (vigente)'}` : '—')),
    (v && v.version && String(v.version) !== String(pv.version)) ? h('div',{class:'notice info'}, h('span',{},'El aviso de privacidad se actualizó después de que usted dio su consentimiento. Le recomendamos leer la versión vigente.')) : null,
    h('p',{class:'small'}, 'Con este vínculo usted ve el perfil, las calificaciones, las tareas y los comunicados del curso de su representado. No ve fichas del DECE ni información de otros estudiantes. ',
      h('a',{href:'#/privacidad'},'Leer el aviso de privacidad')));
  view.append(card);
  const bajar = h('button',{class:'btn sm'}, `Descargar los datos de ${u.nombre.split(' ').slice(-2).join(' ')}`);
  bajar.onclick = async () => { bajar.disabled = true;
    try {
      if (typeof privExportarEstudiante === 'function') await privExportarEstudiante(u.codigo);
      else { const datos = { generado:new Date().toISOString(), institucion:BIO.school.institucion, estudiante:{ codigo:u.codigo, nombre:u.nombre, nivel:BIO.nivel(u.year).n, paralelo:u.paralelo },
          vinculo: v ? { parentesco:v.parentesco, consentimiento: v.consentimiento ? new Date(v.consentimiento).toISOString() : null, version:v.version } : null,
          calificaciones: d.items.filter(i => d.notas[i.id] != null).map(i => ({ actividad:i.t, nota:d.notas[i.id], fecha: d.fechas[i.id] ? new Date(d.fechas[i.id]).toISOString() : null })),
          otras_actividades: Object.keys(d.notas).filter(k => !d.items.some(i => i.id === k)).map(k => ({ actividad:famTitulo(k), nota:d.notas[k] })),
          resumen: Periodos.resumen(u.codigo, d.items, d.notas, d.fechas),
          tareas: Tareas.de(u.year, u.paralelo).map(t => ({ recurso:Tareas.recurso(t.act).t, vence:new Date(t.vence).toISOString(), entregada:d.notas[t.act] != null })),
          comunicados: famComunicadosDe(u).map(c => ({ titulo:c.titulo, texto:c.texto, fecha:new Date(c.creado).toISOString() })) };
        descargarTexto(`datos-${u.codigo}.json`, JSON.stringify(datos, null, 2), 'application/json;charset=utf-8');
        await Auditoria.registrar('descargar_datos_estudiante', { codigo:u.codigo, por:'familia' }); }
    } catch(e){ toast('No se pudo descargar: ' + e.message); }
    bajar.disabled = false; };
  const retirar = h('button',{class:'btn sm danger',onclick:()=>confirmar({ peligro:true, escribir:'RETIRAR', boton:'Retirar mi consentimiento',
    titulo:`¿Retirar su consentimiento sobre ${u.nombre}?`,
    texto:`Su cuenta dejará de estar vinculada a ${u.nombre}: ya no verá sus calificaciones, tareas ni comunicados, y la institución ya no le enviará resúmenes. Las calificaciones y la cuenta del estudiante no cambian. Para volver a vincularse necesitará un código nuevo de la institución.`,
    accion: async () => { await famRetirarVinculo(u); toast('Consentimiento retirado. Ya no verá los datos de ' + u.nombre + '.'); navigate('#/familia'); render(); } })}, 'Retirar mi consentimiento');
  view.append(h('div',{class:'card stack',style:'max-width:820px;margin-top:16px'}, h('span',{class:'eyebrow'},'Sus derechos sobre los datos'),
    h('p',{class:'small'},'Puede descargar una copia de los datos de su representado que usted ve en la plataforma (calificaciones, tareas y comunicados) en un archivo que se abre con cualquier editor de texto. La descarga queda registrada.'),
    h('div',{class:'row'}, bajar),
    h('p',{class:'small'},'Retirar su consentimiento elimina el vínculo entre su cuenta y su representado. Es inmediato y lo puede hacer usted mismo; para otros pedidos (rectificar o eliminar datos) escriba a ', h('b',{}, pv.correo || 'la institución'), '.'),
    h('div',{class:'row'}, retirar)));
}
async function famRetirarVinculo(u){
  if (Cloud.on){ const uid = u.uid; if (!uid || !Cloud.ses) throw new Error('No se encontró el vínculo.');
    await Cloud.retirarVinculo(Cloud.ses.uid, uid);
    try { await Cloud.pull(); } catch(e){ const F = Store.s.familia || {}; F.hijos = (F.hijos||[]).filter(x => x.codigo !== u.codigo); F.vinculos = (F.vinculos||[]).filter(x => x.estCodigo !== u.codigo); }
  } else {
    Store.s.famVinculos = famVinculosTodos().filter(v => !(v.familiaId === Store.ses.famId && v.estCodigo === u.codigo));
    Auditoria.local('retirar_consentimiento', { estudiante:u.nombre }, { tabla:'familia_vinculos', registro:Store.ses.famId+':'+u.codigo });
  }
  const resto = famHijos(); Store.ses.famHijo = resto[0] ? resto[0].codigo : null; Store.save(); updateChips();
}

/* quien no entró como representante */
function famGate(view){
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Representantes'), h('h1',{},'Avance de su representado'),
    h('p',{},'Las familias entran con su propia cuenta y ven únicamente a su representado: qué está estudiando, sus calificaciones, lo pendiente y los comunicados del curso.'))));
  view.append(h('div',{class:'card stack',style:'max-width:620px'},
    h('div',{class:'row'}, h('button',{class:'btn primary',onclick:()=>openWizard('familia')},'Entrar como representante')),
    Cloud.on ? h('p',{class:'small muted'},'La primera vez necesitará el código FAM-XXXX-XXXX que entrega la docente o la institución.')
      : h('div',{class:'stack',style:'gap:6px'}, h('p',{class:'small muted'},`Demostración: puede entrar con el código ${BIO.familyCode} o ver directamente la vista de un representante del estudiante de ejemplo.`),
          h('button',{class:'btn sm',style:'align-self:flex-start',onclick:()=>{
            const F = Store.s.familias = Store.s.familias || {};
            F['fam-demo'] = F['fam-demo'] || { id:'fam-demo', nombre:'Representante de demostración', email:'familia.demo@ejemplo.com', tel:'', hash:null, creado:Date.now(), demo:true };
            if (!famVinculosTodos().some(v => v.familiaId === 'fam-demo' && v.estCodigo === FAM_DEMO)) famVinculosTodos().push({ familiaId:'fam-demo', estUid:null, estCodigo:FAM_DEMO, parentesco:'Madre', consentimiento:Date.now(), version:Inst.privacidad().version, creado:Date.now() });
            famEntrarLocal(F['fam-demo'], FAM_DEMO); updateChips(); render(); }},'Ver la demostración'))));
}

/* =====================================================================
   PANEL DOCENTE · pestaña "Familias"
   ===================================================================== */
async function famGenerarCodigo(e){
  const L = famCodigos();
  for (let i = 0; i < 3; i++){
    const codigo = famNuevoCodigo(); if (L.some(c => c.codigo === codigo)) continue;
    if (Cloud.on){ const uid = Cloud.uidDe(e.id); if (!uid) throw new Error('Este estudiante no tiene cuenta en el servidor.');
      try { const row = await Cloud.crearCodigoFamilia(uid, codigo) || {};
        L.push({ codigo:row.codigo || codigo, estUid:uid, estCodigo:e.id, activo:row.activo !== false, creado:row.creado ? Date.parse(row.creado) : Date.now(), usadoEn:null }); Store.save(); return codigo; }
      catch(er){ if (/duplicate|23505|409/i.test(er.message + ' ' + (er.status||''))) continue; throw er; } }
    L.push({ codigo, estUid:null, estCodigo:e.id, activo:true, creado:Date.now(), usadoEn:null }); Store.save();
    Auditoria.local('crear_codigo_familia', { codigo:e.id, nombre:e.nombre }, { tabla:'familia_codigos', registro:e.id }); return codigo;
  }
  throw new Error('No se pudo generar un código único. Intente de nuevo.');
}
async function famDesactivarCodigo(c){
  if (Cloud.on) await Cloud.desactivarCodigoFamilia(c.codigo);
  c.activo = false; Store.save();
  if (!Cloud.on) Auditoria.local('desactivar_codigo_familia', { codigo:c.estCodigo }, { tabla:'familia_codigos', registro:c.estCodigo });
}
/* fila del panel docente → datos de la semana */
function famDatosDocente(e){
  const items = DOC.items(); const notas = Object.assign({}, e.notas || {}); Object.keys(notas).forEach(k => { if (notas[k] == null) delete notas[k]; });
  let fechas = Object.assign({}, (Store.s.docente.fechas || {})[e.id] || {});
  if (e.demo && !e.real) Object.entries(Store.s.activities || {}).forEach(([k,a]) => { if (a && a.done && a.at) fechas[k] = a.at; });
  return { year:+e.year, prog:BIO.progOf(e.year), items, notas, fechas };
}
function famUDe(e){ return { codigo:e.id, nombre:e.nombre.replace(/ \((demo en vivo|en vivo)\)$/,''), year:e.year, paralelo:e.paralelo }; }
function famTelDe(e){
  const vs = famVinculosTodos().filter(v => v.estCodigo === e.id);
  for (const v of vs){ const f = (Store.s.familias || {})[v.familiaId]; if (f && f.tel) return String(f.tel); }
  const u = Users.get(e.id); return String((u && u.tel) || e.repTel || '').trim();
}
const famWa = (tel, txt) => { const t = String(tel||'').replace(/\D/g,'').replace(/^593/,'').replace(/^0/,''); return t.length >= 8 ? `https://wa.me/593${t}?text=${encodeURIComponent(txt)}` : null; };
function famFirmaDocente(){ const d = Store.ses.docenteId && (Store.s.docentes || {})[Store.ses.docenteId]; return `Saludos cordiales,\n${d ? d.nombre : (Store.ses.rol === 'admin' ? 'Coordinación académica' : BIO.school.docente.nombre)}\n${BIO.school.institucion}`; }

function famResumenModal(e){
  const txt = famResumenTexto(famUDe(e), famDatosDocente(e), { firma:famFirmaDocente() });
  const ta = h('textarea',{class:'fam-texto','aria-label':'Texto del resumen semanal'}, txt);
  const tel = famTelDe(e);
  const wa = h('a',{class:'btn primary sm',target:'_blank',rel:'noopener'},'Enviar por WhatsApp');
  const setWa = () => { const u = famWa(tel, ta.value); if (u){ wa.href = u; wa.removeAttribute('aria-disabled'); } else { wa.removeAttribute('href'); wa.setAttribute('aria-disabled','true'); wa.title = 'No hay un teléfono registrado del representante.'; wa.style.opacity = '.5'; } };
  ta.addEventListener('input', setWa); setWa();
  wa.addEventListener('click', ev => { if (!wa.href){ ev.preventDefault(); toast('No hay un teléfono registrado del representante.'); return; } Store.log('resumen_familia', { canal:'whatsapp' }); });
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Resumen semanal para la familia'), h('h3',{}, famUDe(e).nombre),
    h('p',{class:'small muted'}, tel ? `Teléfono del representante: ${tel}. Puede editar el texto antes de enviarlo.` : 'No hay un teléfono registrado: copie el texto y envíelo por el medio que use con la familia.'),
    ta,
    h('div',{class:'row'}, wa, h('button',{class:'btn sm',onclick:()=>copiarTexto(ta.value,'Resumen copiado.')},'Copiar'),
      h('button',{class:'btn sm ghost',onclick:()=>{ closeModal(); navigate(`#/docente/familias/resumen/${DOC.year}/${DOC.par}?e=${encodeURIComponent(e.id)}`); }},'Imprimir'),
      h('button',{class:'btn sm ghost',onclick:closeModal},'Cerrar')),
    h('p',{class:'small muted'},'El envío automático por correo llegará en una fase posterior. Por ahora, usted lo envía desde su propio teléfono o cuenta, sin costo.')));
}

function famTabDocente(body, rerender){
  const aV = avisoV18(); if (aV) body.append(aV);
  const r = DOC.roster().slice().sort((a,b)=>a.nombre.localeCompare(b.nombre));
  const curso = `${BIO.nivel(DOC.year).corto} ${DOC.par}`;
  body.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},'Cómo funciona. '),
    'Cada estudiante recibe un código de un solo uso (FAM-XXXX-XXXX). Su representante lo canjea en "Soy representante", crea su cuenta y acepta el aviso de privacidad; desde ahí ve solo a su representado. Si hay dos representantes, genere un código para cada uno.')));
  if (!r.length){ body.append(h('div',{class:'ph',style:'margin-top:12px'}, `No hay estudiantes en ${curso}.`)); return; }
  const sinCodigo = r.filter(e => !famCodigoActivo(e.id) && !famVinculosTodos().some(v => v.estCodigo === e.id));
  const bGen = h('button',{class:'btn sm primary',disabled:!sinCodigo.length},'Generar códigos para todo el curso');
  bGen.onclick = async () => { bGen.disabled = true; bGen.textContent = 'Generando…'; let n = 0; const err = [];
    for (const e of sinCodigo){ try { await famGenerarCodigo(e); n++; } catch(er){ err.push(e.nombre + ': ' + er.message); } }
    toast(err.length ? `Se generaron ${n} códigos; ${err.length} con problema (${err[0]}).` : `Se generaron ${n} códigos.`); rerender(); };
  body.append(h('div',{class:'row',style:'justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:14px'},
    h('div',{class:'stack',style:'gap:2px'}, h('b',{}, `Familias · ${curso}`),
      h('span',{class:'small muted'}, `${r.filter(e => famVinculosTodos().some(v => v.estCodigo === e.id)).length} de ${r.length} estudiantes con representante vinculado · ${r.filter(e => famCodigoActivo(e.id)).length} códigos sin usar`)),
    h('div',{class:'row',style:'gap:6px'}, bGen,
      h('a',{class:'btn sm',href:`#/docente/familias/fichas/${DOC.year}/${DOC.par}`},'Imprimir fichas para las familias'),
      h('a',{class:'btn sm',href:`#/docente/familias/resumen/${DOC.year}/${DOC.par}`},'Imprimir resúmenes semanales'))));
  if (!sinCodigo.length) bGen.title = 'Todos los estudiantes tienen un código activo o un representante vinculado.';
  const tbl = h('table',{class:'data'},
    h('thead',{}, h('tr',{}, h('th',{scope:'col'},'Estudiante'), h('th',{scope:'col'},'Representantes vinculados'), h('th',{scope:'col'},'Código para la familia'), h('th',{scope:'col'},'Resumen semanal'))),
    h('tbody',{}, r.map(e => {
      const vs = famVinculosTodos().filter(v => v.estCodigo === e.id);
      const c = famCodigoActivo(e.id);
      const usados = famCodigos().filter(x => x.estCodigo === e.id && x.usadoEn).length;
      const bG = h('button',{class:'btn sm'},'Generar código');
      bG.onclick = async () => { bG.disabled = true; try { const k = await famGenerarCodigo(e); toast(`Código ${k} generado para ${e.nombre}.`); } catch(er){ toast('No se pudo generar: ' + er.message); } rerender(); };
      return h('tr',{},
        h('td',{}, h('b',{}, e.nombre), h('div',{class:'small muted'}, e.email || '')),
        h('td',{}, vs.length ? h('div',{class:'fam-reps'}, vs.map(v => { const f = (Store.s.familias || {})[v.familiaId];
            return h('div',{}, h('span',{class:'pill ok'}, v.parentesco || 'Representante'), ' ', f && f.nombre ? h('b',{}, f.nombre + ' ') : null,
              h('span',{class:'small muted'}, v.consentimiento ? `consintió el ${fechaCorta(v.consentimiento)}${v.version ? ' · aviso v' + v.version : ''}` : 'sin consentimiento registrado')); }))
          : h('span',{class:'small muted'}, 'Sin representante vinculado')),
        h('td',{}, c ? h('div',{class:'fam-codebox'}, h('b',{}, c.codigo),
            h('button',{class:'btn sm ghost','aria-label':`Copiar el código de ${e.nombre}`,onclick:()=>copiarTexto(c.codigo,'Código copiado.')},'Copiar'),
            h('button',{class:'btn sm ghost danger-text','aria-label':`Desactivar el código de ${e.nombre}`,onclick:()=>confirmar({ titulo:`¿Desactivar el código ${c.codigo}?`, texto:`Dejará de servir para vincular a la familia de ${e.nombre}. Los representantes ya vinculados no se ven afectados. Puede generar otro cuando quiera.`, boton:'Desactivar', peligro:true, accion: async () => { await famDesactivarCodigo(c); toast('Código desactivado.'); rerender(); } })},'Desactivar'))
          : h('div',{class:'stack',style:'gap:4px;align-items:flex-start'}, bG, usados ? h('span',{class:'small muted'}, `${usados} código${usados===1?'':'s'} ya usado${usados===1?'':'s'}`) : null)),
        h('td',{}, h('button',{class:'btn sm ghost',onclick:()=>famResumenModal(e)},'Resumen semanal')));
    })));
  body.append(h('div',{class:'tablewrap',style:'margin-top:12px'}, tbl));
  body.append(h('div',{class:'notice',style:'margin-top:14px'}, h('span',{}, h('b',{},'Resumen semanal. '),
    'El texto (lo hecho, lo pendiente y el promedio) queda listo para copiar, enviar por WhatsApp desde su teléfono o imprimir todos los del curso, uno por hoja. El envío automático por correo llegará en una fase posterior.')));
}
DOC_TABS_EXTRA.push({ id:'familias', t:'Familias', roles:['docente','admin'], antes:'codigos', fn:famTabDocente });

/* ---------- fichas imprimibles para las familias (código + QR) ---------- */
function famSoloPersonal(view){ if (esRol('docente','admin')) return false; view.append(h('div',{class:'ph'},'Esta página es para el personal docente.')); return true; }
function famRosterDe(year, par){ DOC.year = +year; DOC.par = par; return DOC.roster().slice().sort((a,b)=>a.nombre.localeCompare(b.nombre)); }
route('/docente/familias/fichas/:year/:par', (view, p) => {
  if (famSoloPersonal(view)) return;
  view.classList.add('wide');
  const r = famRosterDe(p.year, p.par), curso = `${BIO.nivel(p.year).corto} · Paralelo ${p.par}`;
  const faltan = r.filter(e => !famCodigoActivo(e.id) && !famVinculosTodos().some(v => v.estCodigo === e.id));
  const bGen = faltan.length ? h('button',{class:'btn sm'}, `Generar los ${faltan.length} códigos que faltan`) : null;
  if (bGen) bGen.onclick = async () => { bGen.disabled = true; bGen.textContent = 'Generando…'; for (const e of faltan){ try { await famGenerarCodigo(e); } catch(er){ toast('No se pudo generar: ' + er.message); break; } } render(); };
  view.append(h('div',{class:'row noprint',style:'gap:8px;margin-bottom:12px'},
    h('a',{class:'btn sm',href:'#/docente?t=familias'},'← Volver a Familias'),
    h('button',{class:'btn sm primary',onclick:()=>window.print()},'Imprimir fichas'), bGen));
  view.append(h('div',{class:'page-head noprint'}, h('div',{}, h('span',{class:'eyebrow'},'Fichas para las familias'), h('h1',{}, curso),
    h('p',{},'Una ficha por estudiante con su código de un solo uso y un QR que abre el registro con el código ya escrito. Imprima, recorte y entregue a cada representante.'))));
  const con = r.map(e => ({ e, c:famCodigoActivo(e.id) })).filter(x => x.c);
  if (!con.length){ view.append(h('div',{class:'ph'},'Ningún estudiante de este curso tiene un código activo. Genérelos arriba o desde la pestaña Familias.')); return; }
  const base = `${location.origin}${location.pathname}`;
  const marca = BIO.progOf(+p.year) === 'cn' ? 'ANAI Ciencias' : 'ANAI BioLab';
  view.append(h('div',{class:'fam-fichas'}, con.map(({e,c}) => h('div',{class:'fam-ficha'},
    h('div',{class:'cab'}, h('b',{}, `${marca} · Representantes`), h('span',{class:'small muted'}, curso)),
    h('div',{class:'stack',style:'gap:6px'},
      h('span',{class:'small muted'},'Estudiante'), h('b',{}, famUDe(e).nombre),
      h('span',{class:'small muted'},'Código de representante (sirve una vez)'), h('span',{class:'cod'}, c.codigo),
      h('ol',{}, h('li',{}, 'Escanee el QR o entre a ', h('b',{}, base.replace(/^https?:\/\//,''))), h('li',{},'Elija "Soy representante" → "Tengo un código".'), h('li',{},'Cree su cuenta, acepte el aviso de privacidad y listo.'))),
    h('div',{class:'qr',html:qrSVG(`${base}#/entrar?fam=${c.codigo}`, 3)})))));
});

/* ---------- resúmenes semanales imprimibles (uno por hoja) ---------- */
route('/docente/familias/resumen/:year/:par', (view, p) => {
  if (famSoloPersonal(view)) return;
  let r = famRosterDe(p.year, p.par); if (p.e) r = r.filter(e => e.id === p.e);
  view.append(h('div',{class:'row noprint',style:'gap:8px;margin-bottom:12px'},
    h('a',{class:'btn sm',href:'#/docente?t=familias'},'← Volver a Familias'),
    h('button',{class:'btn sm primary',onclick:()=>window.print()}, r.length > 1 ? `Imprimir los ${r.length} resúmenes` : 'Imprimir')));
  view.append(h('div',{class:'page-head noprint'}, h('div',{}, h('span',{class:'eyebrow'},'Resumen semanal para las familias'), h('h1',{}, `${BIO.nivel(p.year).corto} · Paralelo ${p.par}`),
    h('p',{},'Cada resumen se imprime en su propia hoja. El envío automático por correo llegará en una fase posterior.'))));
  if (!r.length){ view.append(h('div',{class:'ph'},'No hay estudiantes en este curso.')); return; }
  const firma = famFirmaDocente();
  r.forEach(e => view.append(h('article',{class:'card fam-hoja'}, h('pre',{}, famResumenTexto(famUDe(e), famDatosDocente(e), { firma })))));
});
</script>
