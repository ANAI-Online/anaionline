<script>
/* =====================================================================
   INICIO DE LA APLICACIÓN: barra superior, roles, avisos y bienvenida
   ===================================================================== */
function updateChips(){
  const rol = Store.ses.rol, y = Store.year();
  const hijoF = rol === 'familia' && typeof famHijoActual === 'function' ? famHijoActual() : null;
  const prog = hijoF ? BIO.progOf(+hijoF.year) : Store.prog();
  const nom = $('#chip-nombre'), cur = $('#chip-curso'), chip = $('#userchip');
  if (rol === 'admin'){ nom.textContent = 'Administración'; cur.textContent = BIO.school.institucion; chip.setAttribute('href','#/admin'); $('.avatar').textContent = 'AD'; }
  else if (rol === 'docente'){ const d = Store.ses.docenteId && (Store.s.docentes||{})[Store.ses.docenteId];
    nom.textContent = d ? d.nombre : BIO.school.docente.nombre;
    cur.textContent = 'Docente de ' + (BIO.programas[prog]||BIO.programas.bio).n;
    chip.setAttribute('href','#/docente'); $('.avatar').textContent = d ? ((d.nombres||'D')[0]+(d.apellidos||'')[0]).toUpperCase() : 'DB'; }
  else if (rol === 'familia'){ const hijo = typeof famHijoActual === 'function' ? famHijoActual() : null;
    nom.textContent = (Cloud.on && Store.s.user.nombre) ? Store.s.user.nombre : 'Representante';
    cur.textContent = hijo ? 'Representante de ' + hijo.nombre.split(' ').slice(-2).join(' ') : Store.s.user.nombre; chip.setAttribute('href','#/familia'); $('.avatar').textContent = '👪'; }
  else if (rol === 'autoridad' || rol === 'dece'){ nom.textContent = Store.s.user.nombre; cur.textContent = ROLES[rol].n + (Store.s.user.cargo ? ' · ' + Store.s.user.cargo : '');
    chip.setAttribute('href', rol === 'dece' ? '#/nee' : '#/institucion'); $('.avatar').textContent = Store.s.user.iniciales || ROLES[rol].em; }
  else { nom.textContent = Store.s.user.nombre; cur.textContent = (y ? BIO.nivel(y).n : 'Sin curso asignado') + (Store.ses.paralelo ? ' · '+Store.ses.paralelo : '') + (Store.ses.invitado ? ' · invitado' : ''); chip.setAttribute('href','#/progreso'); $('.avatar').textContent = Store.s.user.iniciales; }
  const cn = prog === 'cn';
  const mn = $('#marca-n'), ms = $('#marca-sub'), logo = $('.logo');
  if (mn) mn.textContent = cn ? 'ANAI Ciencias' : 'ANAI BioLab';
  if (ms) ms.textContent = cn ? 'Ciencias Naturales · EGB' : 'Biología · Bachillerato';
  if (logo) logo.setAttribute('href', cn ? '#/cn' : '#/');
  const si = $('#search-input');
  if (si) si.setAttribute('placeholder', cn ? 'Buscar: densidad, circuitos, red trófica…' : 'Buscar: mitocondria, ventrículo, fotosíntesis…');
  buildNav(); updateNav(parseHash().path);
}
function cerrarSesion(){
  Users.logout(); updateChips(); closeModal(); closeBell();
  toast('Sesión cerrada.'); navigate('#/');
  setTimeout(()=>openWizard('rol'), 350);
}
function roleModal(){
  const opt = (rol, em, t, d, go) => h('button',{class:'wz-role',onclick:()=>{ Store.ses.rol = rol; if (rol==='estudiante' && !Store.year()) Store.guest(2); Store.save(); updateChips(); closeModal(); navigate(go); toast(`Vista de ${t.toLowerCase()} activada.`); }},
    h('span',{class:'em'},em), h('b',{},t), h('span',{class:'small muted'},d));
  openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Cambiar de vista'), h('h3',{},'¿Cómo quieres ver la plataforma?'),
    h('p',{class:'small muted'},'En la versión con servidor, cada persona entra con su propia cuenta y solo ve lo que le corresponde. Aquí puedes alternar para conocer las tres vistas.'),
    h('div',{class:'wz-roles'}, opt('estudiante','🎒','Estudiante','Tu curso, tus retos y tu progreso.', Store.prog()==='cn' ? '#/cn' : '#/'), opt('docente','🧑‍🏫','Docente','Calificaciones, reportes y seguimiento de tus cursos.','#/docente'), opt('familia','👨‍👩‍👧','Representante','Avance y pendientes de tu representado.','#/familia'),
      Cloud.on ? null : opt('autoridad','🏛️','Autoridad','Tablero de toda la institución, solo lectura.','#/institucion'), Cloud.on ? null : opt('dece','🤝','DECE','Estudiantes con NEE y sus adaptaciones.','#/nee')),
    h('div',{class:'row'}, h('button',{class:'btn sm',onclick:()=>{ closeModal(); navigate('#/admin'); }},'Entrar como administración')),
    h('div',{class:'row'},
      h('button',{class:'btn sm ghost',onclick:()=>{ closeModal(); openWizard('rol'); }},'Volver a la bienvenida'),
      h('button',{class:'btn sm ghost',onclick:()=>{ closeModal(); openWizard('login'); }},'Iniciar sesión con usuario'),
      h('button',{class:'btn sm',onclick:cerrarSesion},'Cerrar sesión'),
      h('button',{class:'btn sm ghost',onclick:closeModal},'Cancelar'))));
}
(function init(){
  Object.assign(BIO.activities, BIO.cnActividades);   /* prevalece sobre los registros defensivos de cada laboratorio */
  /* Todo órgano que ya tenga modelo 3D deja de estar "en construcción" y pasa a ser un recurso
     disponible del área Cuerpo humano. Centralizado aquí para que añadir un órgano sea añadir un
     archivo: basta con que registre BIO.organs[id] y BIO.builders[id]. */
  Object.keys(BIO.builders || {}).forEach(id => {
    const d = BIO.organs[id]; if (!d) return;
    const i = BIO.plannedOrgans.findIndex(o => o.id === id);
    const planned = i >= 0 ? BIO.plannedOrgans[i] : null;
    if (i >= 0) BIO.plannedOrgans.splice(i, 1);
    if (!BIO.resources.some(r => r.id === id)) BIO.resources.push({
      id, tipo:'Modelo 3D', t:d.nombre, d:(planned && planned.d) || d.intro,
      href:'#/explorar/'+id, areas:['cuerpo'], em:d.em, ok:true,
      reto: d.reto && d.reto.pregunta ? d.reto.pregunta : undefined, act:'reto-'+id
    });
  });
  BIO.aplicarCurriculo();   /* fuente única: recursos, unidades, libros de calificaciones y pesos */
  applyA11y(); Store.touchVisit();
  buildNav(); updateChips();
  $('#btn-home').addEventListener('click', ()=>navigate('#/'));
  const mb = $('#btn-motion'); const syncMotion = () => mb.setAttribute('aria-pressed', !Store.s.settings.motion); syncMotion();
  mb.addEventListener('click', ()=>{ Store.s.settings.motion = !Store.s.settings.motion; Store.save(); syncMotion(); applyA11y(); toast(Store.s.settings.motion?'Animaciones activadas.':'Animaciones pausadas.'); });
  $('#btn-role').addEventListener('click', roleModal);
  $('#userchip').addEventListener('click', e => { e.preventDefault(); roleModal(); });
  $('#btn-a11y').addEventListener('click', ()=>navigate('#/accesibilidad'));
  $('#btn-help').addEventListener('click', ()=>{
    openModal(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Ayuda'), h('h3',{},'¿Necesitas orientarte?'),
      h('div',{class:'wz-tips'},
        h('button',{class:'wz-tip',onclick:()=>{ closeModal(); navigate('#/'); setTimeout(()=>startTour(),400); }}, h('span',{class:'em'},'🧭'), h('div',{}, h('b',{},'Recorrido guiado de 1 minuto'), h('p',{class:'small muted'},'Te muestro dónde está cada cosa.'))),
        h('button',{class:'wz-tip',onclick:()=>{ closeModal(); navigate('#/mapa'); }}, h('span',{class:'em'},'🗺'), h('div',{}, h('b',{},'Mapa de la plataforma'), h('p',{class:'small muted'},'Dónde estás y cuál es tu siguiente paso.'))),
        h('button',{class:'wz-tip',onclick:()=>{ closeModal(); navigate('#/accesibilidad'); }}, h('span',{class:'em'},'🅰'), h('div',{}, h('b',{},'Mi forma de aprender'), h('p',{class:'small muted'},'Letra, contraste, voz y ritmo.'))),
        h('button',{class:'wz-tip',onclick:()=>{ closeModal(); openWizard('rol'); }}, h('span',{class:'em'},'🔁'), h('div',{}, h('b',{},'Volver a empezar la bienvenida'), h('p',{class:'small muted'},'Cambiar de rol, de año o de código.')))),
      h('button',{class:'btn sm ghost',style:'align-self:flex-start',onclick:closeModal},'Cerrar')));
  });
  // avisos
  const bell = $('#btn-bell'), panel = $('#bell-panel');
  bell.addEventListener('click', e => { e.stopPropagation(); const open = panel.classList.toggle('open'); bell.setAttribute('aria-expanded', String(open)); if (open) renderBell(); });
  document.addEventListener('click', e => { if (!e.target.closest('.bell-wrap')) closeBell(); });
  renderBell();
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeBell(); });
  if (!location.hash) location.hash = '#/';
  if (Cloud.on){
    /* modo servidor: la sesión válida es la del servidor; si no hay, se vuelve a la bienvenida */
    Cloud.restaurar().then(async p => {
      if (p){ Cloud.aplicarPerfil(p); try { await Cloud.pull(); } catch(e){ console.warn(e); } updateChips(); render(); }
      else { if (Store.ses.rol !== 'estudiante' || Store.ses.userId){ Users.logout(); updateChips(); } render(); if (!Store.ses.onboarded) setTimeout(()=>openWizard(), 400); }
    });
    return;
  }
  render();
  if (!Store.ses.onboarded) setTimeout(()=>openWizard(), 600);
})();
</script>
