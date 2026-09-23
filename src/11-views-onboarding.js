<script>
/* =====================================================================
   BIENVENIDA (rol, año y código, accesibilidad), RECORRIDO GUIADO,
   MAPA DE ORIENTACIÓN, "MI FORMA DE APRENDER" Y AVISOS
   ===================================================================== */

/* ---------- ¿dónde estoy?: ruta de navegación ---------- */
const CRUMB_NAMES = { cn:'Ciencias Naturales', dominio:'Dominio', unidad:'Unidad', lab:'Laboratorio', sim:'Simulador', eco:'Ecosistemas', proximos:'En construcción', admin:'Administración', explorar:'Áreas', area:'Área', mision:'Misión', misiones:'Misiones', laboratorio:'Laboratorios', simuladores:'Simuladores', evaluacion:'Evaluación', progreso:'Mi progreso', cuaderno:'Cuaderno', docente:'Panel docente', familia:'Familia', panel:'Mi panel', mapa:'Mapa', accesibilidad:'Mi forma de aprender', microscopio:'Microscopio', organo:'Órgano', reporte:'Reporte', credenciales:'Credenciales', institucion:'Tablero institucional', nee:'Estudiantes con NEE', privacidad:'Aviso de privacidad', auditoria:'Registro de auditoría', entrar:'Entrar' };
function crumbFor(path){
  const parts = path.split('/').filter(Boolean); if (!parts.length) return [];
  const cc = typeof crumbsContexto === 'function' ? crumbsContexto(path) : null; if (cc) return cc;
  const cn = Store.prog()==='cn';
  const out = [{ t:'Inicio', href: cn ? '#/cn' : '#/' }];
  if (parts[0]==='cn'){
    if (parts.length===1) return [];
    if (parts[1]==='unidad'){ const u = BIO.cnUnidad(parts[2]); const d = u && BIO.cn.dominios.find(x=>x.id===u.dom);
      return [...out, { t:d?d.n:'Dominio', href:u?'#/cn/dominio/'+u.dom:null }, { t:u?`U${u.n} · ${u.t}`:'Unidad' }]; }
    if (parts[1]==='dominio'){ const d = BIO.cn.dominios.find(x=>x.id===parts[2]); return [...out, { t:d?d.n:'Dominio' }]; }
    if (parts[1]==='progreso') return [...out, { t:'Mi progreso' }];
    const rec = Object.entries(BIO.cn.recursos).find(([k,r]) => r.href === '#'+path);
    return [...out, { t: rec ? rec[1].t : 'Recurso' }];
  }
  const res = BIO.resources.find(r => r.href === '#'+path);
  const area = parts[0]==='area' && areaById(parts[1]);
  const organ = (parts[0]==='explorar' && BIO.organs[parts[1]]) || (parts[1]==='celula' ? BIO.cell : null);
  if (area) out.push({ t:'Áreas', href:'#/explorar' }, { t:area.n });
  else if (organ){ const a = areaById(organ.id==='celula-animal'||parts[1]==='celula' ? 'celular' : 'cuerpo'); out.push({ t:'Áreas', href:'#/explorar' }, { t:a.n, href:'#/area/'+a.id }, { t: organ.nombre || 'Modelo 3D' }); }
  else if (parts[0]==='mision' ) out.push({ t:'Misiones', href:'#/misiones' }, { t:(BIO.missions.find(m=>m.id===parts[1])||{}).t || 'Misión' });
  else if (parts[0]==='docente' && parts.length>1) out.push({ t:'Panel docente', href:'#/docente' }, { t: CRUMB_NAMES[parts[1]] || 'Detalle' });
  else out.push({ t: CRUMB_NAMES[parts[0]] || (res && res.t) || parts[0], href: parts.length>1 ? '#/'+parts[0] : null }, ...(parts.length>1 ? [{ t:(res && res.t) || CRUMB_NAMES[parts[1]] || parts[1] }] : []));
  return out;
}
function updateCrumbs(path){
  const el = $('#crumbs'); if (!el) return; el.innerHTML='';
  const items = crumbFor(path);
  if (items.length < 2){ el.hidden = true; return; }
  el.hidden = false;
  items.forEach((c,i) => { if (i) el.append(h('span',{class:'sep','aria-hidden':'true'},'›'));
    el.append(c.href ? h('a',{href:c.href},c.t) : h('span',{'aria-current':'page'},c.t)); });
  el.append(h('a',{class:'crumb-map',href:'#/mapa',title:'Ver el mapa de la plataforma'},'🗺 Mapa'));
}

/* ---------- Bienvenida ---------- */
const YEAR_EM = {8:'🔬',9:'⚛️',10:'🌍',1:'🌱',2:'🫀',3:'🌎'};
function openWizard(step, opts={}){
  const wz = $('#wizard'), box = $('#wizard-box'); let st = step || 'rol', pend = { year:null, codigo:null, sugerido:opts.usuario || null, destino:null, famCodigo:opts.famCodigo || null };
  const close = (goHash) => { wz.hidden = true; document.body.style.overflow=''; if (goHash) navigate(goHash); };
  pend.codigo = null;
  const head = (eyebrow, title, sub) => h('div',{class:'stack',style:'gap:6px'}, h('span',{class:'eyebrow'},eyebrow), h('h2',{},title), sub?h('p',{class:'muted'},sub):null);
  function render(){
    box.innerHTML=''; box.append(h('div',{class:'wz-brand'}, h('span',{class:'logo-mark'},'🧬'), h('b',{},'ANAI Ciencias'), h('span',{class:'muted small'},'Laboratorio virtual de Ciencias Naturales y Biología')));
    if (st==='rol'){
      box.append(head('Bienvenida','¿Cómo vas a entrar?','Puedes cambiar de vista cuando quieras desde el botón de la esquina superior derecha.'),
        h('div',{class:'wz-roles'},
          [['estudiante','🎒','Soy estudiante','Explora tu año, de 8.º de EGB a 3.º de Bachillerato, y resuelve los retos.'],
           ['docente','🧑‍🏫','Soy docente','Calificaciones, reportes, códigos por año y adaptaciones.'],
           ['familia','👨‍👩‍👧','Soy representante','Mira el avance y lo pendiente de tu representado.'],
           ['admin','🛠️','Soy administración','Crea cursos, carga estudiantes y genera las cuentas de docentes.'],
           ['personal','🏛️','Soy autoridad o DECE','Tablero institucional (rectorado, vicerrectorado) o seguimiento de NEE.']].map(([id,em,t,d]) =>
            h('button',{class:'wz-role',onclick:()=>{ if (id==='estudiante'){ st='acceso'; render(); }
              else if (id==='docente'){ st='login'; pend.sugerido = BIO.school.docente.email; render(); }
              else if (id==='admin'){ st='login'; pend.sugerido = 'admin@anai.edu.ec'; render(); }
              else if (id==='personal'){ st='login'; pend.sugerido = ''; pend.personal = true; render(); }
              else { st='familia'; render(); } }},
              h('span',{class:'em'},em), h('b',{},t), h('span',{class:'small muted'},d)))),
        h('button',{class:'btn ghost sm',onclick:()=>{ Store.ses.onboarded=true; Store.save(); close(); }},'Ahora no, solo quiero mirar'));
    }
    else if (st==='acceso'){
      box.append(head('Estudiantes','¿Cómo vas a entrar?','Si tu docente ya te entregó tu usuario institucional, entra con él. Si todavía no lo tienes, puedes usar el código del curso.'),
        h('div',{class:'wz-roles',style:'grid-template-columns:repeat(2,1fr)'},
          h('button',{class:'wz-role',onclick:()=>{ st='login'; render(); }}, h('span',{class:'em'},'🔑'), h('b',{},'Tengo usuario y contraseña'), h('span',{class:'small muted'},`Tu correo institucional, por ejemplo 215444@${DOMINIO_EST}.`)),
          Cloud.on ? h('button',{class:'wz-role',onclick:()=>{ Store.guest(8); updateChips(); st='aprender'; render(); }}, h('span',{class:'em'},'👀'), h('b',{},'Solo quiero mirar'), h('span',{class:'small muted'},'Explora los laboratorios como invitado; tu avance no se guarda.'))
                   : h('button',{class:'wz-role',onclick:()=>{ st='anio'; render(); }}, h('span',{class:'em'},'🎫'), h('b',{},'Tengo el código del curso'), h('span',{class:'small muted'},'El código que la docente comparte con todo el paralelo.'))),
        h('button',{class:'btn ghost sm',onclick:()=>{ st='rol'; render(); }},'← Atrás'));
    }
    else if (st==='login'){
      const usr = h('input',{type:'text',value:pend.sugerido||'',placeholder:`215444@${DOMINIO_EST}`,'aria-label':'Usuario','autocomplete':'username'});
      const pas = h('input',{type:'password',placeholder:'Tu contraseña','aria-label':'Contraseña','autocomplete':'current-password'});
      const msg = h('div',{class:'notice',style:'display:none'});
      const entrar = async () => { msg.style.display='none'; const r = await Users.login(usr.value, pas.value);
        if (!r.ok){ msg.className='notice warn'; msg.textContent = r.msg; msg.style.display='flex'; return; }
        updateChips();
        if (r.rol==='admin'){ Store.ses.onboarded = true; Store.save(); toast('Bienvenido a la consola de administración.'); close('#/admin'); return; }
        if (r.rol==='docente' || r.rol==='autoridad' || r.rol==='dece'){ Store.ses.onboarded = true; Store.save();
          const dest = { docente:'#/docente', autoridad:'#/institucion', dece:'#/nee' }[r.rol];
          toast(r.rol==='docente' ? 'Bienvenida, docente.' : `Bienvenida. Entraste como ${ROLES[r.rol].n}.`);
          if (r.cambiar && r.docente){ pend.codigo = r.docente.id; st='nueva-pass'; pend.destino = dest; render(); return; }
          close(dest); return; }
        if (r.rol==='familia'){ Store.ses.onboarded = true; Store.save(); toast('Bienvenida.'); close('#/familia'); return; }
        toast(`Hola, ${Store.s.user.nombre.split(' ')[0]}.`);
        if (r.cambiar){ pend.codigo = r.user.codigo; st='nueva-pass'; } else st='aprender';
        render(); };
      box.append(head('Iniciar sesión','Entra con tu usuario institucional','Tu usuario es tu código de estudiante seguido de @'+DOMINIO_EST+'. La primera vez usarás la contraseña temporal que te entregó tu docente.'),
        h('div',{class:'stack',style:'gap:8px;max-width:420px'}, usr, pas, msg,
          h('button',{class:'btn primary',onclick:entrar},'Entrar')),
        h('p',{class:'small muted'},'¿Olvidaste tu contraseña? Tu docente puede restablecerla desde su panel.'),
        (pend.personal && !Cloud.on) ? h('p',{class:'small muted'},'Demostración: rectorado@anai.edu.ec · AnaiRector2026 — dece@anai.edu.ec · AnaiDece2026') : null,
        h('div',{class:'row'}, Cloud.on ? null : h('button',{class:'btn sm ghost',onclick:()=>{ st='anio'; render(); }},'Entrar con el código del curso'), h('button',{class:'btn sm ghost',onclick:()=>{ st='acceso'; render(); }},'← Atrás')));
      pas.addEventListener('keydown', e => { if (e.key==='Enter') entrar(); });
      setTimeout(()=>usr.focus(),50);
    }
    else if (st==='nueva-pass'){
      const p1 = h('input',{type:'password',placeholder:'Nueva contraseña (mínimo 8 caracteres)','aria-label':'Nueva contraseña','autocomplete':'new-password'});
      const p2 = h('input',{type:'password',placeholder:'Repite la nueva contraseña','aria-label':'Repetir contraseña','autocomplete':'new-password'});
      const msg = h('div',{class:'notice',style:'display:none'});
      box.append(head('Seguridad','Crea tu propia contraseña','Estás usando la contraseña temporal que te dio tu docente. Cámbiala por una que solo tú conozcas.'),
        h('div',{class:'stack',style:'gap:8px;max-width:420px'}, p1, p2, msg,
          h('div',{class:'row'},
            h('button',{class:'btn primary',onclick:async()=>{ const a = p1.value.trim();
              if (a.length < 8){ msg.className='notice warn'; msg.textContent='Usa al menos 8 caracteres.'; msg.style.display='flex'; return; }
              if (a !== p2.value.trim()){ msg.className='notice warn'; msg.textContent='Las dos contraseñas no coinciden.'; msg.style.display='flex'; return; }
              await Users.cambiarPass(pend.codigo, a); toast('Contraseña actualizada.');
              if (pend.destino){ Store.ses.onboarded = true; Store.save(); close(pend.destino); return; }
              st='aprender'; render(); }},'Guardar contraseña'),
            h('button',{class:'btn sm ghost',onclick:()=>{ st='aprender'; render(); }},'Ahora no'))));
      setTimeout(()=>p1.focus(),50);
    }
    else if (st==='anio'){
      const inp = h('input',{type:'text',placeholder:'Ej.: 2BGU-A-R9TX','aria-label':'Código de acceso',style:'text-transform:uppercase'});
      const msg = h('div',{class:'notice',style:'display:none'});
      const tryCode = () => { const r = Store.enroll(inp.value); if (!r.ok){ msg.className='notice warn'; msg.textContent=r.msg; msg.style.display='flex'; return; }
        updateChips(); toast(`Te matriculaste en ${BIO.year(r.year).n} · paralelo ${r.paralelo}.`); st='aprender'; render(); };
      box.append(head('Paso 1 de 3','¿En qué año estás?','Elige tu año y escribe el código que te dio tu docente. Así verás el contenido que te corresponde.'),
        h('div',{class:'stack',style:'gap:10px'},
          h('span',{class:'eyebrow'},'Ciencias Naturales · EGB Superior'),
          h('div',{class:'wz-years'}, BIO.nivelesDe('cn').map(y => h('button',{class:'wz-year'+(pend.year===y.id?' on':''),onclick:()=>{ pend.year=y.id; render2(); }},
            h('span',{class:'em'},YEAR_EM[y.id]), h('b',{},y.corto), h('span',{class:'small muted'},y.d)))),
          h('span',{class:'eyebrow'},'Biología · Bachillerato'),
          h('div',{class:'wz-years'}, BIO.nivelesDe('bio').map(y => h('button',{class:'wz-year'+(pend.year===y.id?' on':''),onclick:()=>{ pend.year=y.id; render2(); }},
            h('span',{class:'em'},YEAR_EM[y.id]), h('b',{},y.corto), h('span',{class:'small muted'},y.d))))),
        h('div',{class:'stack',style:'gap:8px'}, h('label',{class:'small',style:'font-weight:600'},'Código de tu curso'), h('div',{class:'row'}, inp, h('button',{class:'btn primary',onclick:tryCode},'Entrar')), msg,
          h('p',{class:'small muted'},'¿No tienes código todavía? Puedes mirar la plataforma como invitado y escribirlo después.')),
        h('div',{class:'row'}, h('button',{class:'btn sm',onclick:()=>{ Store.guest(pend.year||1); updateChips(); st='aprender'; render(); }},'Explorar como invitado'), h('button',{class:'btn sm ghost',onclick:()=>{ st='rol'; render(); }},'← Atrás')));
      function render2(){ const ns = [...BIO.nivelesDe('cn'), ...BIO.nivelesDe('bio')]; $$('.wz-year',box).forEach((b,i)=>b.classList.toggle('on', ns[i] && ns[i].id===pend.year)); inp.focus(); }
      setTimeout(()=>inp.focus(),50);
    }
    else if (st==='familia' && typeof famWizard === 'function'){ famWizard(box, head, close, x => { st = x; render(); }, pend); }
    else if (st==='familia'){
      const inp = h('input',{type:'text',placeholder:'Ej.: FAM-2K9P','aria-label':'Código de representante',style:'text-transform:uppercase'});
      const msg = h('div',{class:'notice',style:'display:none'});
      box.append(head('Representantes','Código de tu representado','La docente te entrega un código por estudiante. Solo verás el avance de tu representado.'),
        h('div',{class:'row'}, inp, h('button',{class:'btn primary',onclick:()=>{ if (inp.value.trim().toUpperCase()!==BIO.familyCode){ msg.className='notice warn'; msg.textContent='Ese código no corresponde a ningún estudiante. Revísalo con la docente.'; msg.style.display='flex'; return; }
          Store.ses.rol='familia'; Store.ses.onboarded=true; Store.save(); updateChips(); close('#/familia'); }},'Entrar')), msg,
        Cloud.on ? h('p',{class:'small muted'},'El acceso de representantes con cuenta propia se habilita en la siguiente fase; por ahora la docente comparte el reporte impreso.') : h('p',{class:'small muted'},`Para la demostración, el código es ${BIO.familyCode}.`),
        h('button',{class:'btn sm ghost',onclick:()=>{ st='rol'; render(); }},'← Atrás'));
      setTimeout(()=>inp.focus(),50);
    }
    else if (st==='aprender'){
      const a = Store.s.a11y;
      const seg = (label, opts, get, set) => h('div',{class:'stack',style:'gap:6px'}, h('span',{class:'small',style:'font-weight:600'},label),
        h('div',{class:'segbtns'}, opts.map(([v,t]) => h('button',{'aria-pressed':String(get()===v),onclick:function(){ set(v); $$('button',this.parentElement).forEach((b,i)=>b.setAttribute('aria-pressed', String(opts[i][0]===get()))); }},t))));
      box.append(head('Paso 2 de 3','¿Cómo prefieres leer?','Esto ayuda a quien necesita letra más grande, más contraste o escuchar los textos. Puedes cambiarlo cuando quieras.'),
        h('div',{class:'stack',style:'gap:14px'},
          seg('Tamaño de la letra', [[1,'Normal'],[1.15,'Grande'],[1.3,'Muy grande']], ()=>a.text, v=>Store.setA11y({text:v})),
          seg('Tipografía', [['','Predeterminada'],['hyper','Legible'],['lexend','Fácil lectura']], ()=>a.font, v=>Store.setA11y({font:v})),
          seg('Contraste', [[false,'Normal'],[true,'Alto contraste']], ()=>!!a.contrast, v=>Store.setA11y({contrast:v})),
          seg('Lectura en voz alta', [[false,'No'],[true,'Sí, mostrar el botón 🔊']], ()=>!!a.tts, v=>Store.setA11y({tts:v})),
          seg('Movimiento', [[false,'Normal'],[true,'Menos movimiento']], ()=>!!a.motion, v=>Store.setA11y({motion:v})),
          h('p',{class:'sample'},'Así se verá el texto de la plataforma: el corazón bombea sangre a todo el cuerpo.')),
        h('div',{class:'row'}, h('button',{class:'btn primary',onclick:()=>{ st='listo'; render(); }},'Continuar'), h('a',{class:'btn sm ghost',href:'#/accesibilidad',onclick:()=>{ Store.ses.onboarded=true; Store.save(); close(); }},'Ver todas las opciones')));
    }
    else {
      const y = Store.year() || 1;
      box.append(head('Paso 3 de 3','Listo. Así te vas a mover','Tres lugares para no perderte: tu año, el mapa y el botón de ayuda.'),
        h('div',{class:'wz-tips'},
          [['🗂','Tus áreas','Las cuatro áreas de Ciencias Naturales están en el menú de la izquierda; verás primero las de tu año.'],
           ['🗺','El mapa','Si te pierdes, el mapa te muestra dónde estás y cuál es tu siguiente paso.'],
           ['❓','Ayuda','El botón de ayuda vuelve a abrir el recorrido cuando lo necesites.']].map(([em,t,d]) => h('div',{class:'wz-tip'}, h('span',{class:'em'},em), h('div',{}, h('b',{},t), h('p',{class:'small muted'},d))))),
        h('div',{class:'row'},
          h('button',{class:'btn primary lg',onclick:()=>{ Store.ses.onboarded=true; Store.save(); close(Store.prog()==='cn'?'#/cn':'#/'); setTimeout(()=>startTour(), 400); }},'Hacer el recorrido de 1 minuto'),
          h('button',{class:'btn lg',onclick:()=>{ Store.ses.onboarded=true; Store.save(); close('#/mapa'); }},'Ir al mapa'),
          h('button',{class:'btn sm ghost',onclick:()=>{ Store.ses.onboarded=true; Store.save(); close(Store.prog()==='cn'?'#/cn':'#/'); }},'Empezar sin recorrido')));
    }
  }
  render(); wz.hidden = false; document.body.style.overflow='hidden';
}

/* ---------- Recorrido guiado (globos sobre la interfaz) ---------- */
const TOUR = [
  { sel:'#nav-main', t:'Tus áreas de Ciencias Naturales', d:'Mundo celular, Cuerpo humano y salud, Genética y evolución, Biodiversidad y ecosistemas. Debajo están las actividades transversales.', pos:'right' },
  { sel:'.areas-grid', t:'Entra por tu área', d:'Cada tarjeta muestra cuántos recursos tienes disponibles y tu avance en ese tema.', pos:'bottom', go:'#/' },
  { sel:'.prog', t:'Primero se explora; después se explica', d:'Todos los recursos siguen estos 7 pasos. Toca cualquiera para ver cómo se vive con el corazón.', pos:'top' },
  { sel:'#btn-bell', t:'Tus avisos', d:'Aquí aparecen los recordatorios amables: lo que quedó a medias y lo que está por vencer. Sin alarmas ni castigos.', pos:'bottom' },
  { sel:'#btn-a11y', t:'Mi forma de aprender', d:'Letra más grande, tipografía legible, alto contraste, menos movimiento y lectura en voz alta.', pos:'bottom' },
  { sel:'#search-input', t:'Busca cualquier cosa', d:'Escribe "mitocondria", "ventrículo" o "fotosíntesis" y llegas directo.', pos:'bottom' },
  { sel:'#crumbs, .view', t:'Si te pierdes, mira el mapa', d:'Arriba siempre sabrás dónde estás y tendrás un enlace al mapa de la plataforma.', pos:'bottom' }
];
function startTour(i){
  const coach = $('#coach'), hole = $('#coach-hole'), card = $('#coach-card');
  let idx = i || 0;
  const end = () => { coach.hidden = true; Store.ses.tour = true; Store.save(); window.removeEventListener('resize', place); window.removeEventListener('scroll', place); };
  function place(){
    const st = TOUR[idx]; const el = st.sel.split(',').map(s=>$(s.trim())).find(Boolean);
    if (!el) return next();
    const r = el.getBoundingClientRect();
    const pad = 6, top = Math.max(4, r.top-pad), left = Math.max(4, r.left-pad);
    Object.assign(hole.style, { top:top+'px', left:left+'px', width:(r.width+pad*2)+'px', height:(r.height+pad*2)+'px' });
    const cw = Math.min(340, window.innerWidth-24);
    let ct = r.bottom + 14, cl = Math.min(Math.max(12, r.left), window.innerWidth-cw-12);
    if (st.pos==='right' && window.innerWidth>900){ ct = Math.max(12, r.top+16); cl = Math.min(r.right+16, window.innerWidth-cw-12); }
    if (st.pos==='top' || ct + 190 > window.innerHeight) ct = Math.max(12, r.top - 180);
    Object.assign(card.style, { top:ct+'px', left:cl+'px', width:cw+'px' });
  }
  function render(){
    const st = TOUR[idx];
    if (st.go && !location.hash.startsWith(st.go.replace('#',''))) { if (location.hash !== st.go) { navigate(st.go); } }
    card.innerHTML='';
    card.append(h('span',{class:'eyebrow'},`Paso ${idx+1} de ${TOUR.length}`), h('h3',{},st.t), h('p',{},st.d),
      h('div',{class:'row',style:'justify-content:space-between;margin-top:6px'},
        h('button',{class:'btn sm ghost',onclick:end},'Saltar'),
        h('div',{class:'row',style:'gap:6px'},
          idx>0 ? h('button',{class:'btn sm',onclick:()=>{ idx--; render(); }},'←') : null,
          h('button',{class:'btn sm primary',onclick:next}, idx===TOUR.length-1 ? 'Terminar' : 'Siguiente →'))));
    const el = TOUR[idx].sel.split(',').map(s=>$(s.trim())).find(Boolean);
    if (el) el.scrollIntoView({ block:'center', behavior: Store.s.a11y.motion ? 'auto':'smooth' });
    setTimeout(place, 220);
  }
  function next(){ if (idx >= TOUR.length-1) return end(); idx++; render(); }
  coach.hidden = false; render();
  window.addEventListener('resize', place); window.addEventListener('scroll', place, { passive:true });
  coach.onclick = e => { if (e.target === coach) end(); };
  document.addEventListener('keydown', function esc(e){ if (e.key==='Escape'){ end(); document.removeEventListener('keydown', esc); } });
}

/* ---------- Avisos (campana) ---------- */
function renderBell(){
  const panel = $('#bell-panel'), dot = $('#bell-dot'); const items = Store.avisos();
  const nuevos = items.filter(a=>!a.leido).length;
  dot.hidden = !nuevos; $('#btn-bell').setAttribute('aria-label', nuevos ? `Avisos: ${nuevos} sin leer` : 'Avisos');
  panel.innerHTML='';
  panel.append(h('div',{class:'bell-head'}, h('b',{},'Avisos'), h('button',{class:'btn sm ghost',onclick:()=>{ Store.leerTodos(); renderBell(); }},'Marcar como leídos')));
  if (!items.length) panel.append(h('div',{class:'bell-empty'},'Todo al día. Cuando algo quede a medias o se acerque una fecha, aparecerá aquí.'));
  items.forEach(a => panel.append(h('a',{class:'bell-item'+(a.leido?' leido':''),href:a.href,onclick:()=>{ Store.leerAviso(a.id); setTimeout(renderBell,50); closeBell(); }},
    h('span',{class:'em'},a.em), h('span',{}, h('b',{},a.t), h('span',{class:'small muted'},a.d)))));
  panel.append(h('a',{class:'bell-foot',href:'#/accesibilidad'},'Ajustar mis avisos y preferencias'));
}
function closeBell(){ $('#bell-panel').classList.remove('open'); $('#btn-bell').setAttribute('aria-expanded','false'); }

/* ---------- Banner amable de reencuentro ---------- */
function welcomeBack(view){
  const d = Store.daysAway(); const pend = Store.avisos().filter(a=>a.tipo==='vencimiento');
  if ((d < 2 || !Store.s.lastActivity.t) && !pend.length) return null;
  const el = h('section',{class:'welcome'},
    h('span',{class:'em'},'👋'),
    h('div',{class:'stack',style:'gap:4px;flex:1;min-width:200px'},
      h('b',{}, d>=2 ? `Hace ${d} días que no entrabas, ${Store.s.user.nombre.split(' ')[0]}` : `Hola de nuevo, ${Store.s.user.nombre.split(' ')[0]}`),
      h('span',{class:'small'}, d>=2 ? `Te quedaste en "${Store.s.lastActivity.t}". Puedes retomar justo ahí; nada se perdió.` : 'Tienes actividades por entregar esta semana.'),
      pend.length ? h('span',{class:'small muted'}, pend.slice(0,2).map(p=>p.t).join(' · ')) : null),
    h('div',{class:'row'}, Store.s.lastActivity.t ? h('a',{class:'btn primary sm',href:Store.s.lastActivity.href},'Retomar') : null, h('button',{class:'btn sm ghost',onclick:()=>el.remove()},'Ahora no')));
  return el;
}

/* ---------- MAPA DE ORIENTACIÓN ---------- */
route('/mapa', (view) => {
  if (Store.prog()==='cn') return mapaCN(view);
  const y = Store.year(); const mine = BIO.areas.filter(a => Store.areaStatus(a)==='actual');
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Mapa de la plataforma'), h('h1',{},'¿Dónde estoy y qué sigue?'), h('p',{},'Todo BioLab en una sola pantalla: tus áreas, lo transversal y tu espacio personal. Lo resaltado es lo que te toca este año.')),
    h('a',{class:'btn sm',href:'#/',onclick:()=>setTimeout(startTour,300)},'Repetir el recorrido')));
  // siguiente paso sugerido
  const next = nextStep();
  view.append(h('section',{class:'nextstep'}, h('span',{class:'em'},next.em),
    h('div',{class:'stack',style:'gap:4px;flex:1;min-width:220px'}, h('span',{class:'eyebrow'},'Tu siguiente paso'), h('b',{},next.t), h('span',{class:'small muted'},next.d)),
    h('a',{class:'btn primary',href:next.href},'Continuar')));
  const mapEl = h('div',{class:'map'});
  BIO.areas.forEach(a => {
    const st = Store.areaStatus(a), pr = areaPct(a), rs = areaRes(a.id).filter(r=>r.ok).length;
    mapEl.append(h('a',{class:`map-area ${a.dom} ${st}`,href:'#/area/'+a.id},
      h('span',{class:'ico'},a.em), h('b',{},a.n),
      h('span',{class:'small muted'}, a.unidades.map(u=>'U'+u).join(' · ') + ' · ' + rs + ' disponibles'),
      h('div',{class:`progress ${a.dom}`},h('i',{style:`width:${pr}%`})),
      h('span',{class:'map-tag'}, st==='actual' ? 'Tu año' : st==='repaso' ? 'Repaso' : 'Más adelante')));
  });
  view.append(h('h3',{style:'margin:6px 0 10px'},'Las cuatro áreas'), mapEl);
  view.append(h('h3',{style:'margin:24px 0 10px'},'Transversal: conecta las áreas'), h('div',{class:'map-row'},
    [['#/misiones','🎯','Misiones'],['#/laboratorio','🧪','Laboratorios'],['#/simuladores','∿','Simuladores'],['#/evaluacion','✓','Evaluación']].map(([href,em,t]) =>
      h('a',{class:'map-chip',href}, h('span',{},em), t))));
  view.append(h('h3',{style:'margin:24px 0 10px'},'Mi espacio'), h('div',{class:'map-row'},
    [['#/panel','▦','Mi panel'],['#/progreso','↗','Mi progreso'],['#/cuaderno','✎','Cuaderno de campo'],['#/accesibilidad','🅰','Mi forma de aprender']].map(([href,em,t]) =>
      h('a',{class:'map-chip',href}, h('span',{},em), t))));
  view.append(h('h3',{style:'margin:24px 0 10px'},'Cómo se aprende aquí'),
    h('div',{class:'map-path'}, PROG.map((p,i) => h('a',{class:'map-step',href:p.href}, h('span',{class:'n'},String(i+1)), h('b',{},p.v)))));
  if (y) view.append(h('p',{class:'small muted',style:'margin-top:20px'}, `Estás matriculado en ${BIO.year(y).n}${Store.ses.paralelo?' · paralelo '+Store.ses.paralelo:''}. Los temas de años anteriores quedan disponibles como repaso.`));
});
/* ---------- Mapa del entorno de Ciencias Naturales ---------- */
function mapaCN(view){
  const g = cnNivelActual();
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Mapa de Ciencias Naturales'), h('h1',{},'¿Dónde estoy y qué sigue?'),
    h('p',{},`Estás en ${BIO.nivel(g).n}. Ciencias Naturales es una sola área con dos dominios; cada dominio tiene tres unidades en tu grado.`)),
    h('a',{class:'btn sm',href:'#/cn'},'Ir al inicio')));
  const nx = cnSiguientePaso();
  if (nx) view.append(h('section',{class:'nextstep'}, h('span',{class:'em'},nx.em),
    h('div',{class:'stack',style:'gap:4px;flex:1;min-width:220px'}, h('span',{class:'eyebrow'},'Tu siguiente paso'), h('b',{},nx.t), h('span',{class:'small muted'},nx.d)),
    h('a',{class:'btn primary',href:nx.href},'Continuar')));
  BIO.cn.dominios.forEach(d => {
    view.append(h('div',{class:'area-sec-head'}, h('span',{class:'navdot '+d.dom}), h('h3',{},d.n), h('a',{class:'btn sm ghost',style:'margin-left:auto',href:'#/cn/dominio/'+d.id},'Abrir dominio →')));
    view.append(h('div',{class:'map',style:'margin-bottom:18px'}, BIO.cnUnidadesDe(g, d.id).map(u => {
      const pr = cnProgresoUnidad(u.id);
      return h('a',{class:`map-area ${d.dom} actual`,href:'#/cn/unidad/'+u.id},
        h('span',{class:'ico'},d.em), h('b',{},`U${u.n} · ${u.t}`),
        h('span',{class:'small muted'}, (u.recursos||[]).filter(r=>(BIO.cn.recursos[r]||{}).ok).length + ' recursos disponibles'),
        h('div',{class:`progress ${d.dom}`},h('i',{style:`width:${pr}%`})), h('span',{class:'map-tag'}, pr+' %'));
    })));
  });
  view.append(h('h3',{style:'margin:6px 0 10px'},'Laboratorios y simuladores'), h('div',{class:'map-row'},
    Object.entries(BIO.cn.recursos).filter(([k,r])=>r.ok && /Laborator|Simulador/.test(r.tipo)).map(([k,r]) => h('a',{class:'map-chip',href:r.href}, h('span',{},r.em), r.t))));
  view.append(h('h3',{style:'margin:24px 0 10px'},'Mi espacio'), h('div',{class:'map-row'},
    [['#/cn/progreso','↗','Mi progreso'],['#/cuaderno','✎','Cuaderno de campo'],['#/accesibilidad','🅰','Mi forma de aprender']].map(([href,em,t]) =>
      h('a',{class:'map-chip',href}, h('span',{},em), t))));
  view.append(h('h3',{style:'margin:24px 0 10px'},'La ruta de EGB Superior'), h('div',{class:'map-path'},
    BIO.cn.progresion.map((p,i) => h('a',{class:'map-step',href:'#/cn'}, h('span',{class:'n'},String(i+1)), h('b',{}, BIO.nivel(p.id).corto+' · '+p.t)))));
}

/* sugerencia de siguiente paso: primero lo vencido, luego el reto a medias, luego lo no empezado */
function nextStep(){
  const av = Store.avisos();
  const venc = av.find(a=>a.tipo==='vencimiento'); if (venc) return { em:'📌', t:venc.t, d:venc.d || 'Tarea asignada por tu docente.', href:venc.href };
  const reto = av.find(a=>a.tipo==='reto'); if (reto) return { em:'🎯', t:reto.t, d:reto.d, href:reto.href };
  const mine = BIO.areas.filter(a=>Store.areaStatus(a)==='actual');
  const res = mine.flatMap(a=>areaRes(a.id)).find(r => r.ok && r.act && !Store.s.activities[r.act]?.done);
  if (res) return { em:res.em, t:res.t, d:res.reto || res.d, href:res.href };
  return { em:'🗺', t:'Explora tu área', d:'Abre un modelo 3D y cumple su reto.', href: mine[0] ? '#/area/'+mine[0].id : '#/explorar' };
}

/* ---------- MI FORMA DE APRENDER (accesibilidad) ---------- */
route('/accesibilidad', (view) => {
  const a = Store.s.a11y;
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow'},'Accesibilidad'), h('h1',{},'Mi forma de aprender'), h('p',{},'Ajusta la plataforma a como tú lees y te concentras mejor. Se guarda en este dispositivo y se aplica a todas las pantallas. Si tienes una adaptación asignada por tu docente, aparecerá activada.'))));
  const adapt = (Store.s.docente.adapt||{})[Store.s.user.id] || [];
  if (adapt.length) view.append(h('div',{class:'notice ok',style:'margin-bottom:14px'}, h('span',{},'Tu docente activó para ti: '+adapt.map(k=>BIO.adaptaciones[k]).join(', ')+'.')));
  const card = (t, d, ctrl) => h('div',{class:'a11y-card'}, h('h3',{},t), h('p',{class:'small'},d), ctrl);
  const seg = (opts, get, set) => { const row = h('div',{class:'segbtns'}, opts.map(([v,txt]) => h('button',{'aria-pressed':String(get()===v),onclick:()=>{ set(v); $$('button',row).forEach((b,i)=>b.setAttribute('aria-pressed', String(opts[i][0]===get()))); }},txt))); return row; };
  view.append(h('div',{class:'a11y-grid'},
    card('Tamaño de la letra','Aumenta el texto de toda la plataforma sin romper el diseño.', seg([[1,'Normal'],[1.15,'Grande'],[1.3,'Muy grande'],[1.45,'Máximo']], ()=>a.text, v=>Store.setA11y({text:v}))),
    card('Tipografía','"Legible" (Atkinson Hyperlegible) distingue mejor letras parecidas; "Fácil lectura" (Lexend) ayuda a leer de corrido.', seg([['','Predeterminada'],['hyper','Legible'],['lexend','Fácil lectura']], ()=>a.font||'', v=>Store.setA11y({font:v}))),
    card('Espacio entre líneas','Más aire entre renglones para no perder la línea al leer.', seg([[0,'Normal'],[0.25,'Amplio'],[0.5,'Muy amplio']], ()=>a.spacing||0, v=>Store.setA11y({spacing:v}))),
    card('Contraste','Colores más fuertes y bordes más marcados.', seg([[false,'Normal'],[true,'Alto contraste']], ()=>!!a.contrast, v=>Store.setA11y({contrast:v}))),
    card('Movimiento','Reduce animaciones y transiciones. Los modelos 3D se pueden pausar con el botón de la barra superior.', seg([[false,'Normal'],[true,'Menos movimiento']], ()=>!!a.motion, v=>Store.setA11y({motion:v}))),
    card('Modo enfoque','Oculta el menú lateral para dejar solo el contenido.', seg([[false,'Desactivado'],[true,'Activado']], ()=>!!a.focus, v=>Store.setA11y({focus:v}))),
    card('Lectura en voz alta','Muestra un botón 🔊 en las fichas y los retos para escuchar el texto con la voz del navegador.', seg([[false,'Desactivada'],[true,'Activada']], ()=>!!a.tts, v=>Store.setA11y({tts:v}))),
    card('Nivel de explicación','Con qué profundidad se abren las fichas: en 30 segundos, comprender o profundizar.', seg([[1,'Nivel 1'],[2,'Nivel 2'],[3,'Nivel 3']], ()=>a.level||1, v=>Store.setA11y({level:v}))),
    card('Pistas','Mantén visibles las pistas de los retos y las exploraciones guiadas.', seg([[false,'Al fallar'],[true,'Siempre visibles']], ()=>!!a.hints, v=>Store.setA11y({hints:v})))));
  view.append(h('div',{class:'card stack',style:'margin-top:18px'}, h('span',{class:'eyebrow'},'Prueba de lectura'),
    h('p',{class:'sample'},'El ventrículo izquierdo tiene la pared más gruesa porque debe impulsar la sangre hacia todo el cuerpo, mientras que el derecho solo la envía a los pulmones.'),
    h('div',{class:'row'}, TTS.btn('El ventrículo izquierdo tiene la pared más gruesa porque debe impulsar la sangre hacia todo el cuerpo, mientras que el derecho solo la envía a los pulmones.','Escuchar el ejemplo'), h('button',{class:'btn sm ghost',onclick:()=>TTS.stop()},'Detener'))));
  // avisos
  const p = Store.s.avisos.prefs;
  const chk = (k, t, d) => h('label',{class:'toggle'}, h('input',{type:'checkbox',checked:p[k],onchange:e=>{ p[k]=e.target.checked; Store.save(); renderBell(); }}), h('span',{}, h('b',{},t), h('span',{class:'small muted',style:'display:block'},d)));
  view.append(h('div',{class:'card stack',style:'margin-top:18px'}, h('span',{class:'eyebrow'},'Mis avisos'),
    h('p',{class:'small muted'},'Avisos amables dentro de la plataforma: nunca más de uno por tema y sin rachas que presionen.'),
    chk('inactividad','Recordarme si llevo días sin entrar','Aparece un saludo con el punto donde te quedaste.'),
    chk('vencimientos','Avisarme de las tareas por vencer','Solo las que asignó tu docente para tu curso.'),
    chk('logros','Avisarme de mis logros','Insignias y niveles alcanzados.')));
  view.append(h('div',{class:'card stack',style:'margin-top:18px'}, h('span',{class:'eyebrow'},'Atajos de teclado'),
    h('ul',{class:'checks plain'}, [['Tab / Shift+Tab','Moverse entre elementos'],['Flechas','Rotar el modelo 3D'],['+ / −','Acercar y alejar'],['0','Restablecer la vista'],['Esc','Cerrar ventanas y el recorrido']].map(([k,d]) => h('li',{}, h('b',{class:'mono'},k), ' — ', d)))));
});
</script>
