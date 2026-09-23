<style>
/* ---------- Operación diaria (v1.8) ---------- */
.ope-pass{display:flex;flex-direction:column;gap:10px;padding:18px;border-radius:14px;background:var(--bg-3);border:1px solid var(--line)}
.ope-pass .l{font-size:.78rem;font-weight:600;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em}
.ope-pass .u{font-family:var(--font-m);font-size:1rem;word-break:break-all}
.ope-pass .p{font-family:var(--font-m);font-size:clamp(1.8rem,7vw,2.6rem);font-weight:800;letter-spacing:.06em;line-height:1.1;color:var(--ink);word-break:break-all;user-select:all}
.ope-deletreo{font-size:.84rem;color:var(--ink-2)}
.ope-qr{display:flex;gap:12px;align-items:center}
.ope-qr .qr{background:#fff;padding:4px;border-radius:8px;line-height:0;flex:none}
.ope-qr .qr svg{width:92px;height:92px}
.cred-card.ope-card{display:grid;grid-template-columns:1fr auto;gap:6px 12px;align-items:start}
.ope-card .cred-head,.ope-card .cred-name,.ope-card > p{grid-column:1/-1}
.ope-card .ope-datos{display:flex;flex-direction:column;gap:6px;min-width:0}
.ope-card .qr{background:#fff;padding:3px;border-radius:6px;line-height:0;align-self:center}
.ope-card .qr svg{width:88px;height:88px}
@media print{ .cred-card.ope-card{background:#fff;color:#000} }
</style>
<script>
/* =====================================================================
   OPERACIÓN DIARIA (v1.8)
   ---------------------------------------------------------------------
   · "Nueva contraseña" en la pestaña Estudiantes del panel docente:
     temporal grande para dictarla o mostrarla, copiar y marcar entregada.
   · Ruta #/entrar?u=CODIGO o #/entrar?fam=CODIGO (los QR impresos):
     abre la bienvenida con el usuario o el código ya escrito.
   · Fichas de credenciales imprimibles con QR por estudiante (el QR
     lleva al inicio de sesión; nunca contiene la contraseña).
   ===================================================================== */
if (typeof CRUMB_NAMES !== 'undefined') CRUMB_NAMES.entrar = 'Entrar';
const opeUrlEntrar = codigo => `${location.origin}${location.pathname}#/entrar?u=${encodeURIComponent(codigo)}`;
/* "Celula482" → "C mayúscula · e · l · u · l · a · 4 · 8 · 2" para dictarla sin confusiones */
const opeDeletreo = p => String(p).split('').map(ch => /[A-ZÁÉÍÓÚÑ]/.test(ch) ? `${ch} mayúscula` : /[0-9]/.test(ch) ? ch : ch.toLowerCase()).join(' · ');

/* ---------- botón por estudiante (docente y administración) ---------- */
DOC_ACCIONES_ESTUDIANTE.push((e) => {
  if (!esRol('docente','admin') || !e.real || !Users.get(e.id)) return null;
  return h('button',{class:'btn sm ghost','aria-label':`Crear una contraseña nueva para ${e.nombre}`,onclick:()=>opeNuevaPass(e.id)},'Nueva contraseña');
});
function opeNuevaPass(codigo){
  const u = Users.get(codigo); if (!u) return toast('No se encontró al estudiante.');
  confirmar({ titulo:`¿Crear una contraseña nueva para ${u.nombre}?`, boton:'Crear contraseña nueva',
    texto:'La contraseña actual dejará de funcionar de inmediato. Se generará una temporal para que se la dictes o se la muestres; al entrar, el estudiante creará la suya.',
    accion: async () => { const t = await Users.resetPass(codigo); if (!t) throw new Error('No se pudo generar la contraseña.');
      setTimeout(() => opeMostrarPass(codigo, t), 0); } });
}
function opeMostrarPass(codigo, temp){
  const u = Users.get(codigo); if (!u) return;
  const marcar = h('button',{class:'btn sm'}, u.entregada ? 'Entregada ✓' : 'Marcar como entregada');
  marcar.onclick = () => { Users.entregar(codigo, true); marcar.textContent = 'Entregada ✓'; marcar.disabled = true; toast('Marcada como entregada.'); };
  if (u.entregada) marcar.disabled = true;
  const qr = qrSVG(opeUrlEntrar(codigo), 3);
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Contraseña temporal'), h('h3',{}, u.nombre),
    h('div',{class:'ope-pass'},
      h('span',{class:'l'},'Usuario'), h('span',{class:'u'}, u.email),
      h('span',{class:'l'},'Contraseña temporal'), h('span',{class:'p','aria-label':'Contraseña temporal: ' + opeDeletreo(temp)}, temp),
      h('span',{class:'ope-deletreo'}, 'Para dictarla: ', opeDeletreo(temp))),
    qr ? h('div',{class:'ope-qr'}, h('div',{class:'qr',html:qr}), h('p',{class:'small muted',style:'margin:0'},'El estudiante puede escanear este QR con su celular para abrir el inicio de sesión con su usuario ya escrito. El QR no contiene la contraseña.')) : null,
    h('p',{class:'small muted',style:'margin:0'},'Al entrar, la plataforma le pedirá crear su propia contraseña.'),
    h('div',{class:'row'},
      h('button',{class:'btn sm primary',onclick:()=>copiarTexto(`Usuario: ${u.email}\nContraseña temporal: ${temp}\nEntra a ${location.origin}${location.pathname} y crea tu propia contraseña.`, 'Datos copiados.')},'Copiar'),
      marcar,
      h('button',{class:'btn sm ghost',onclick:()=>{ closeModal(); if (location.hash.startsWith('#/docente')) render(); }},'Cerrar'))));
}

/* ---------- #/entrar: enlaces de los QR ---------- */
route('/entrar', (view, q) => {
  const u = String(q.u || '').trim(), fam = String(q.fam || '').trim().toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0, 20);
  const usuario = /^[A-Za-z0-9._-]{3,14}$/.test(u) ? Users.emailOf(u) : /^[^@\s]+@[^@\s]+$/.test(u) ? u.toLowerCase() : '';
  /* quien llega por un QR no necesita la bienvenida general: se abre directo el paso que corresponde */
  Store.ses.onboarded = true; Store.save();
  view.append(h('div',{class:'ph'},'Abriendo el acceso…'));
  setTimeout(() => {
    try { history.replaceState(null, '', location.pathname + location.search + '#/'); } catch(e){ location.hash = '#/'; }
    render();
    setTimeout(() => {
      if (fam) openWizard('familia', { famCodigo:fam });
      else if (usuario){
        if (Store.ses.rol === 'estudiante' && Store.ses.userId && Users.emailOf(Store.ses.userId) === usuario) toast('Ya entraste con tu usuario.');
        else openWizard('login', { usuario });
      }
      else openWizard('rol');
    }, 60);
  }, 0);
});

/* ---------- fichas de credenciales con QR (reemplaza la de 12) ---------- */
route('/docente/credenciales/:year/:par', (view, p) => {
  const year = +p.year, par = p.par; const l = Users.ofCourse(year, par);
  view.classList.add('wide');
  view.append(h('div',{class:'row noprint',style:'gap:8px;margin-bottom:12px'},
    h('a',{class:'btn sm',href:'#/docente'},'← Volver al panel'),
    h('button',{class:'btn sm primary',onclick:()=>window.print()},'Imprimir fichas'),
    h('button',{class:'btn sm ghost',onclick:()=>{ l.forEach(u=>Users.entregar(u.codigo,true)); toast('Marcadas como entregadas.'); }},'Marcar todas como entregadas')));
  if (!l.length){ view.append(h('div',{class:'ph'},'Este curso todavía no tiene usuarios cargados.')); return; }
  view.append(h('div',{class:'page-head noprint'}, h('div',{}, h('span',{class:'eyebrow'},'Credenciales para recortar'), h('h1',{},`${BIO.year(year).corto} · Paralelo ${par}`), h('p',{},'Una ficha por estudiante. Imprime, recorta y entrega. Cada estudiante debe cambiar su contraseña la primera vez que entre. El QR abre el inicio de sesión con el usuario ya escrito; no contiene la contraseña.'))));
  const prog = BIO.progOf(year), marca = prog === 'cn' ? 'ANAI Ciencias' : 'ANAI BioLab', asig = (BIO.programas[prog] || BIO.programas.bio).n;
  view.append(h('div',{class:'cred-grid'}, l.map(u => h('div',{class:'cred-card ope-card'},
    h('div',{class:'cred-head'}, h('b',{},marca), h('span',{class:'small muted'}, asig+' · '+BIO.year(u.year).corto+' '+u.paralelo)),
    h('div',{class:'cred-name'}, u.nombre),
    h('div',{class:'ope-datos'},
      h('div',{class:'cred-row'}, h('span',{class:'small muted'},'Usuario'), h('b',{class:'mono'},u.email)),
      h('div',{class:'cred-row'}, h('span',{class:'small muted'},'Contraseña temporal'), h('b',{class:'mono'},u.temp || '(ya la cambió)'))),
    h('div',{class:'qr','aria-label':`Código QR para entrar como ${u.email}`,html:qrSVG(opeUrlEntrar(u.codigo), 2)}),
    h('p',{class:'small muted'},'Entra a la plataforma, escribe estos datos y crea tu propia contraseña. No la compartas con nadie.')))));
});
</script>
