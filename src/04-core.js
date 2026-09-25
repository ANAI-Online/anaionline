<script>
/* =====================================================================
   NÚCLEO: store persistente, analítica, router, utilidades, búsqueda
   ===================================================================== */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const h = (tag, attrs={}, ...kids) => {
  const el = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined && v !== false) el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) if (kid !== null && kid !== undefined && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
  return el;
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
const fmtMin = m => m < 60 ? `${Math.round(m)} min` : `${Math.floor(m/60)} h ${Math.round(m%60)} min`;
const timeAgo = ts => { const d = (Date.now()-ts)/60000; if (d<1) return 'ahora'; if (d<60) return `hace ${Math.round(d)} min`; if (d<1440) return `hace ${Math.round(d/60)} h`; return `hace ${Math.round(d/1440)} d`; };

/* ---------- Rutas de cada actividad (avisos, tareas, reportes) ---------- */
const ACT_HREF = {
  'explorar-corazon':'#/explorar/corazon', 'guiada-corazon':'#/explorar/corazon?modo=guiada', 'reto-corazon':'#/explorar/corazon',
  'reto-cerebro':'#/explorar/cerebro', 'reto-pulmones':'#/explorar/pulmones', 'explorar-celula':'#/explorar/celula',
  'reto-celula':'#/explorar/celula', 'mision-globulo':'#/mision/globulo-rojo', 'lab-fotosintesis':'#/laboratorio/fotosintesis',
  'sim-circulacion':'#/simuladores/circulacion', 'eval-corazon':'#/evaluacion/corazon'
};

/* ---------- Accesibilidad: se aplica al documento completo ---------- */
function applyA11y(){
  const a = Store.s.a11y, r = document.documentElement;
  r.style.setProperty('--text-scale', a.text || 1);
  r.style.setProperty('--line-extra', (a.spacing || 0) + 'em');
  r.dataset.font = a.font || '';
  r.dataset.contrast = a.contrast ? 'alto' : '';
  r.dataset.focusMode = a.focus ? 'on' : '';
  r.dataset.motion = (a.motion || !Store.s.settings.motion) ? 'reducido' : '';
}
/* Lectura en voz alta con la voz del propio navegador (sin servicios externos) */
const TTS = {
  get on(){ return !!Store.s.a11y.tts; },
  speak(txt){ if (!('speechSynthesis' in window)) return toast('Tu navegador no admite la lectura en voz alta.');
    const sp = window.speechSynthesis; if (sp.speaking){ sp.cancel(); return; }
    const u = new SpeechSynthesisUtterance(String(txt).replace(/\s+/g,' ').trim());
    const v = sp.getVoices().find(x=>/es/i.test(x.lang)); if (v) u.voice = v; u.lang = v?.lang || 'es-ES'; u.rate = 0.98;
    sp.speak(u); Store.log('lectura_voz',{caracteres:String(txt).length}); },
  stop(){ if ('speechSynthesis' in window) window.speechSynthesis.cancel(); },
  btn(getText, label='Escuchar'){ return h('button',{class:'btn sm ghost tts-btn',title:'Leer en voz alta','aria-label':label,onclick:()=>TTS.speak(typeof getText==='function'?getText():getText)}, '🔊 ', label); }
};

/* ---------- STORE ---------- */
const DEFAULT_STATE = () => ({
  version: 1,
  user: { id:"demo-mateo", nombre:"Mateo Andrade", iniciales:"MA", curso:"2.º de Bachillerato", rol:"estudiante" },
  /* sesión: rol, año matriculado y código usado (con servidor, esto lo valida el backend) */
  session: { rol:"estudiante", programa:null, nivel:null, year:null, paralelo:null, code:null, docenteId:null, onboarded:false, tour:false, invitado:false, repaso:true },
  /* accesibilidad: "Mi forma de aprender" */
  a11y: { text:1, font:"", spacing:0, contrast:false, motion:false, focus:false, tts:false, level:1, hints:false },
  visitas: { last:null, prev:null, total:0 },
  avisos: { leidos:[], prefs:{ inactividad:true, vencimientos:true, logros:true } },
  usuarios: {},             // listado cargado por la docente: código → usuario, contraseña temporal (hash) y curso
  yearUnits: null,          // reasignación de unidades por año hecha por la docente
  docente: { adapt:{}, notas:{}, codes:null },
  xp: 740,
  badges: ["explorador-celular"],
  // progreso base por unidad (datos ficticios de demostración → 37 %)
  unitBase: {1:100, 2:90, 3:60, 4:30, 5:0, 6:60, 7:30, 8:0, 9:0, 10:0},
  activities: {},          // id → {done, score, at}
  seen: { corazon: [], "celula-animal": [] },
  notebook: [
    { id:"n1", k:"observacion", at: Date.now()-86400000*3, txt:"Las células de la epidermis de cebolla se ven como ladrillos alineados; la pared celular es muy evidente y el núcleo aparece como un punto oscuro en cada una." },
    { id:"n2", k:"hipotesis", at: Date.now()-86400000*2, txt:"Si aumenta la temperatura, la levadura producirá más CO₂ porque sus enzimas trabajan más rápido, hasta un límite en el que se desnaturalizan." }
  ],
  events: [],
  settings: { motion: true },
  lastActivity: { t:"Explorar la célula animal", at: Date.now()-86400000*4, href:"#/explorar/celula" },
  timeMin: 0
});
const KEY = 'anai-biolab-v1';
try { window.addEventListener('storage', e => { if (e.key !== KEY || !e.newValue || typeof Store === 'undefined' || !Store.s) return;
  try { const o = JSON.parse(e.newValue); if (o && o.perfilDe && o.perfilDe === Store.s.perfilDe) Store.fusionar(o); } catch(_){} }); } catch(e){}
const Store = {
  s: null,
  load(){ try { const raw = localStorage.getItem(KEY); this.s = raw ? Object.assign(DEFAULT_STATE(), JSON.parse(raw)) : DEFAULT_STATE(); } catch(e){ this.s = DEFAULT_STATE(); } return this.s; },
  /* Guardar fusionando: si el mismo estudiante trabaja en dos pestañas, ninguna borra el avance de la otra. */
  save(){ try { const raw = localStorage.getItem(KEY); if (raw){ const o = JSON.parse(raw); if (o && o.perfilDe && o.perfilDe === this.s.perfilDe) this.fusionar(o); }
    localStorage.setItem(KEY, JSON.stringify(this.s)); } catch(e){} },
  fusionar(o){
    /* una copia guardada de OTRO año lectivo (antes del cambio de año) no se fusiona: el avance del año anterior quedó archivado */
    if (o && o.anioAlumno && this.s.anioAlumno && o.anioAlumno !== this.s.anioAlumno) return;
    const A = this.s.activities = this.s.activities || {};
    Object.entries(o.activities || {}).forEach(([k,v]) => { const m = A[k]; if (!v) return; if (!m || (v.done && !m.done)) A[k] = v; else if (v.enviado) m.enviado = true; });
    const q = this.s.syncPend = this.s.syncPend || {};
    Object.entries(o.syncPend || {}).forEach(([k,v]) => { if (!(k in q) && A[k] && A[k].done && !A[k].enviado) q[k] = v; });
    const S = this.s.seen = this.s.seen || {}; Object.entries(o.seen || {}).forEach(([k,arr]) => { const t = S[k] = S[k] || []; (arr||[]).forEach(x => { if (!t.includes(x)) t.push(x); }); });
    this.s.xp = Math.max(this.s.xp || 0, o.xp || 0);
    this.s.badges = this.s.badges || []; (o.badges || []).forEach(b => { if (!this.s.badges.includes(b)) this.s.badges.push(b); });
  },
  reset(){ try { localStorage.removeItem(KEY); } catch(e){} this.s = DEFAULT_STATE(); },
  /* Analítica: esquema de eventos exportable (usuario, actividad, modelo, estructura, fecha, duración, intentos, resultado) */
  log(type, data={}){
    const ev = Object.assign({ id: Math.random().toString(36).slice(2,9), usuario:this.s.user.id, tipo:type, fecha:new Date().toISOString(), ruta:location.hash }, data);
    this.s.events.push(ev); if (this.s.events.length > 600) this.s.events.splice(0, this.s.events.length-600);
    this.save(); return ev;
  },
  addXP(n, why){ this.s.xp += n; this.save(); if (n>0) toast(`+${n} XP · ${why}`); },
  completeActivity(id, extra={}){
    const a = BIO.activities[id]; if (!a) return;
    const first = !this.s.activities[id]?.done;
    this.s.activities[id] = Object.assign({}, this.s.activities[id]||{}, {done:true, at:Date.now()}, extra);
    this.s.lastActivity = { t:a.t, at:Date.now(), href:location.hash };
    this.log('actividad_completada', { actividad:id, resultado:extra.score ?? null, intentos: extra.attempts ?? null });
    if (first) this.addXP(a.xp, a.t);
    this.save();
    if (typeof Cloud !== 'undefined' && Cloud.on && this.ses.rol === 'estudiante' && this.ses.userId){
      /* se encola y se envía; si falla (red, sesión), queda pendiente y se reintenta sola */
      (this.s.syncPend = this.s.syncPend || {})[id] = Date.now(); this.save();
      Cloud.enviarPendientes();
      if (Cloud.ses) Cloud.evento('actividad_completada', { actividad:id, resultado:extra.score ?? null });
    }
  },
  markSeen(model, id){
    const arr = this.s.seen[model] = this.s.seen[model] || [];
    if (!arr.includes(id)) { arr.push(id); this.save(); }
  },
  grantBadge(id){
    if (this.s.badges.includes(id)) return false;
    this.s.badges.push(id); this.save();
    const b = BIO.badges.find(x=>x.id===id); toast(`${b.em} Insignia obtenida: ${b.n}`); this.log('insignia', {insignia:id}); return true;
  },
  addNote(k, txt, extra={}){ const e = Object.assign({ id:Math.random().toString(36).slice(2,9), k, at:Date.now(), txt }, extra); this.s.notebook.unshift(e); this.save(); this.log('cuaderno', {clase:k}); return e; },
  /* ---- sesión y año ---- */
  get ses(){ return this.s.session; },
  yearUnits(){ return this.s.yearUnits || Object.fromEntries(BIO.years.map(y=>[y.id,y.unidades])); },
  year(){ return this.ses.year; },
  enroll(code, opts={}){
    const c = (this.s.docente.codes || BIO.accessCodes).find(x => x.code.toUpperCase() === String(code||'').trim().toUpperCase());
    if (!c) return { ok:false, msg:'Ese código no existe. Revisa las letras y los guiones, o pídeselo a tu docente.' };
    if (!c.activo) return { ok:false, msg:'Ese código ya no está activo. Tu docente puede darte el código vigente.' };
    Object.assign(this.ses, { rol:'estudiante', year:c.year, nivel:c.year, programa:BIO.progOf(c.year), paralelo:c.paralelo, code:c.code, invitado:false });
    this.s.user.curso = BIO.nivel(c.year).n;
    this.save(); this.log('matricula',{year:c.year, paralelo:c.paralelo, codigo:c.code});
    return { ok:true, year:c.year, paralelo:c.paralelo };
  },
  guest(year){ Object.assign(this.ses, { rol:'estudiante', year, nivel:year, programa:BIO.progOf(year), paralelo:null, code:null, invitado:true }); this.s.user.curso = BIO.nivel(year).n; this.save(); this.log('acceso_invitado',{year}); },
  prog(){ return this.ses.programa || (this.ses.nivel ? BIO.progOf(this.ses.nivel) : 'bio'); },
  /* estado de una unidad para el estudiante: de su año, de repaso o de un año posterior */
  unitStatus(u){ const y = this.year(); if (!y) return 'actual'; const yu = BIO.yearOfUnit(u); return yu===y ? 'actual' : yu<y ? 'repaso' : 'proximo'; },
  areaStatus(a){ const st = a.unidades.map(u => this.unitStatus(u)); return st.includes('actual') ? 'actual' : st.includes('repaso') ? 'repaso' : 'proximo'; },
  canSee(u){ const st = this.unitStatus(u); return st==='actual' || (st==='repaso' && this.ses.repaso!==false); },
  /* ---- perfil limpio: una cuenta real empieza en cero, sin los datos de demostración ---- */
  perfilLimpio(id){
    if (this.s.perfilDe === id) return;          // ya está inicializado para esta persona
    this.s.perfilDe = id;
    this.s.unitBase = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};
    this.s.xp = 0; this.s.badges = []; this.s.activities = {}; this.s.seen = {};
    this.s.notebook = []; this.s.events = []; this.s.timeMin = 0;
    this.s.lastActivity = { t:'', at:Date.now(), href:'#/' };
    this.s.visitas = { last:Date.now(), prev:null, total:1 };
    this.s.avisos = { leidos:[], prefs:{ inactividad:true, vencimientos:true, logros:true } };
    this.s.docente = { adapt:{}, notas:{}, codes:null }; this.s.syncPend = {};
    this.save();
  },
  esDemo(){ return this.s.user.id === 'demo-mateo'; },
  /* ---- accesibilidad ---- */
  setA11y(patch){ Object.assign(this.s.a11y, patch); this.save(); applyA11y(); this.log('accesibilidad', patch); },
  /* ---- visitas y avisos ---- */
  touchVisit(){ const v = this.s.visitas; const now = Date.now();
    if (!v.last){ if (this.esDemo()){ v.prev = now - 86400000*4; v.total = 6; } else { v.prev = null; v.total = 0; } }
    else if (now - v.last > 1800000) v.prev = v.last;
    v.last = now; v.total++; this.save(); },
  daysAway(){ const v = this.s.visitas; return v.prev ? Math.floor((Date.now()-v.prev)/86400000) : 0; },
  avisos(){
    const out = [], p = this.s.avisos.prefs, ses = this.ses;
    const push = (id, em, t, d, href, tipo) => out.push({ id, em, t, d, href, tipo, leido: this.s.avisos.leidos.includes(id) });
    const d = this.daysAway();
    if (p.inactividad && d >= 2 && this.s.lastActivity.t) push('inact-'+d, '👋', `Hace ${d} días que no entrabas`, `Te quedaste en "${this.s.lastActivity.t}". Retomar toma menos de 10 minutos.`, this.s.lastActivity.href, 'inactividad');
    if (p.vencimientos && typeof Tareas !== 'undefined') Tareas.mias().forEach(t => {
      if (this.s.activities[t.act]?.done) return;
      const rec = Tareas.recurso(t.act), dias = Math.ceil((t.vence - Date.now())/86400000);
      const nueva = t.creado && Date.now() - t.creado < 4*86400000;
      if (dias > 3 && nueva){ push('nueva-'+t.id, '🆕', `Nueva tarea: ${rec.t}`, `Entrega: ${new Date(t.vence).toLocaleDateString('es-EC',{weekday:'long',day:'numeric',month:'long'})}.` + (t.nota ? ' '+t.nota : ''), rec.href, 'vencimiento'); return; }
      if (dias > 3) return;
      push('venc-'+t.id+'-'+Math.min(dias,3), dias<0?'⏰':'📌', dias<0 ? `Tarea vencida: ${rec.t}` : `Tarea: ${rec.t} · ${dias<=0?'vence hoy':dias===1?'vence mañana':'vence en '+dias+' días'}`, t.nota || 'Asignada por tu docente. Se entrega sola cuando resuelves el reto.', rec.href, 'vencimiento');
    });
    if (typeof comAvisos === 'function') try { comAvisos().forEach(a => push(a.id, a.em, a.t, a.d, a.href, a.tipo || 'comunicado')); } catch(e){ console.warn('comunicados', e); }
    const reto = ['corazon','cerebro','pulmones'].map(o => ({o, R:(BIO.organs[o]||{}).reto})).find(x => x.R && !this.s.activities['reto-'+x.o]?.done && (this.s.seen[x.o]||[]).length);
    if (reto){ const got = reto.R.observa.filter(o=>(this.s.seen[reto.o]||[]).includes(o.id)).length;
      if (got && got < reto.R.observa.length) push('reto-'+reto.o, '🎯', 'Tienes un reto a medias', `Te faltan ${reto.R.observa.length-got} observaciones para desbloquear el reto.`, '#/explorar/'+reto.o, 'reto'); }
    if (p.logros){ const falt = BIO.badges.filter(b=>!this.s.badges.includes(b.id)).length; if (falt && this.s.xp) push('logro-xp','⭐','Estás cerca del siguiente nivel', `Nivel ${this.level()} · ${400 - this.s.xp%400} XP para el nivel ${this.level()+1}.`, '#/progreso','logro'); }
    return out;
  },
  leerAviso(id){ if (!this.s.avisos.leidos.includes(id)){ this.s.avisos.leidos.push(id); this.save(); } },
  leerTodos(){ this.s.avisos.leidos = this.avisos().map(a=>a.id); this.save(); },
  /* ---- calificación del estudiante demo (sobre 10) ---- */
  gradeOf(id){ const a = this.s.activities[id]; if (!a?.done) return null;
    if (typeof a.score === 'string'){ const m = a.score.match(/^(\d+)\s*\/\s*(\d+)$/); if (m) return Math.round(+m[1]/+m[2]*100)/10; }
    const at = a.attempts || 1; return Math.max(6, Math.round((10 - (at-1)*1.2)*10)/10); },
  /* nota mostrada en el panel docente y en la vista de familia: la real si ya hizo la actividad, si no la de demostración */
  gradeDemo(id){ const g = this.gradeOf(id); if (g!=null) return g; return this.esDemo() ? (BIO.demoNotas[id] ?? null) : null; },
  unitProgress(u){
    let p = this.s.unitBase[u] || 0;
    for (const [id,a] of Object.entries(BIO.activities)) if (a.unidad===u && this.s.activities[id]?.done) p += a.peso;
    return clamp(Math.round(p), 0, 100);
  },
  overall(){ let t=0; for (const u of BIO.units) t += this.unitProgress(u.n); return Math.round(t/BIO.units.length); },
  level(){ return Math.floor(this.s.xp/400)+1; },
  export(){ return { usuario:this.s.user, generado:new Date().toISOString(), xp:this.s.xp, insignias:this.s.badges, actividades:this.s.activities, progresoUnidades:Object.fromEntries(BIO.units.map(u=>[u.n,this.unitProgress(u.n)])), eventos:this.s.events }; }
};
Store.load();

/* ---------- UI helpers ---------- */
let toastT;
function toast(msg, ms=2600){ const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(()=>t.classList.remove('show'), ms); }
function openModal(node){ const m=$('#modal'); m.innerHTML=''; m.append(node); $('#modal-bg').classList.add('open'); const f=m.querySelector('button,input,textarea,a'); if(f) f.focus(); }
function closeModal(){ $('#modal-bg').classList.remove('open'); }
$('#modal-bg').addEventListener('click', e => { if (e.target.id==='modal-bg') closeModal(); });
document.addEventListener('keydown', e => { if (e.key==='Escape') { closeModal(); $('#search-results').classList.remove('open'); } });
const motionOK = () => Store.s.settings.motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowEnd = () => (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4) || window.innerWidth < 700;
const webglOK = (() => { try { const c=document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl')||c.getContext('experimental-webgl'))); } catch(e){ return false; } })();
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* Bloque de niveles de profundidad 1/2/3 */
function depthBlock(s, key='n'){
  const levels=[['1','En 30 segundos',s[key+'1']],['2','Comprender',s[key+'2']],['3','Profundizar',s[key+'3']]].filter(l=>l[2]);
  const tabs = h('div',{class:'level-tabs',role:'tablist'});
  const body = h('p',{style:'margin-top:8px'});
  const setL = i => { $$('button',tabs).forEach((b,j)=>b.setAttribute('aria-selected', i===j)); body.textContent = levels[i][2]; Store.log('nivel_profundidad',{estructura:s.id,nivel:levels[i][0]}); };
  levels.forEach((l,i)=>tabs.append(h('button',{role:'tab','aria-selected':i===0,onclick:()=>setL(i)},`Nivel ${l[0]} · ${l[1]}`)));
  const start = Math.min((Store.s.a11y.level||1)-1, levels.length-1);
  body.textContent = levels[start][2];
  $$('button',tabs).forEach((b,j)=>b.setAttribute('aria-selected', start===j));
  return h('div',{}, tabs, body, Store.s.a11y.tts ? h('div',{class:'row',style:'margin-top:6px'}, TTS.btn(()=>body.textContent)) : null);
}

/* Pregunta de opción con retroalimentación específica */
function quizBlock(q, onDone){
  const wrap = h('div',{class:'stack'}, h('p',{style:'font-weight:600'},q.q));
  const fb = h('div',{class:'notice',style:'display:none'});
  let attempts=0, solved=false;
  q.ops.forEach((o,i)=>{
    const b = h('button',{class:'opt',onclick:()=>{
      if (solved) return; attempts++;
      if (i===q.ok){ solved=true; b.classList.add('ok'); fb.className='notice ok'; fb.innerHTML=`<b>Correcto.</b> ${esc(q.fb)}`; fb.style.display='flex'; onDone && onDone(attempts); }
      else { b.classList.add('bad'); fb.className='notice warn'; fb.innerHTML=`<b>Aún no.</b> ${esc(q.wrong?.[i<q.ok?i:i-1] || 'Revisa la estructura y su relación con el flujo de sangre, e inténtalo de nuevo.')}`; fb.style.display='flex'; }
      Store.log('respuesta',{pregunta:q.q,opcion:i,correcto:i===q.ok,intento:attempts});
    }}, h('span',{class:'k'},String.fromCharCode(65+i)), o);
    wrap.append(b);
  });
  wrap.append(fb); return wrap;
}

/* ---------- ROUTER ---------- */
const Routes = {};
/* v1.8: funciones que los módulos registran para añadir algo a cualquier vista ya pintada: fn(view, path, query) */
const POST_RENDER = [];
let currentView = null;
function route(path, fn){ Routes[path]=fn; }
function navigate(hash){ location.hash = hash; }
function parseHash(){ const hsh = location.hash.replace(/^#\/?/, ''); const [p, q] = hsh.split('?'); const parts = p.split('/').filter(Boolean); return { parts, path:'/'+parts.join('/'), query:Object.fromEntries(new URLSearchParams(q||'')) }; }
function render(){
  const r = parseHash();
  /* cada entorno tiene su propio inicio */
  if (r.path === '/' && Store.prog() === 'cn' && Store.ses.rol === 'estudiante'){ location.hash = '#/cn'; return; }
  if (currentView?.unmount) { try { currentView.unmount(); } catch(e){ console.warn(e); } }
  currentView = null;
  const view = $('#view'); view.innerHTML=''; view.className='view'; $('#search-results').classList.remove('open'); $('#search-input').value='';
  // match: exact, then prefix with param
  let fn = Routes[r.path] , params = {};
  if (!fn) { for (const key of Object.keys(Routes)) { if (key.includes(':')) { const kp=key.split('/'); if (kp.length===r.parts.length+1) { let ok=true; kp.slice(1).forEach((seg,i)=>{ if (seg.startsWith(':')) params[seg.slice(1)]=r.parts[i]; else if (seg!==r.parts[i]) ok=false; }); if (ok){ fn=Routes[key]; break; } } } } }
  if (!fn) fn = Routes['/'];
  Store.log('vista',{vista:r.path});
  currentView = fn(view, Object.assign(params, r.query)) || {};
  if (typeof contextualizar === 'function') { try { contextualizar(view, r.path); } catch(e){ console.warn('contexto', e); } }
  if (typeof tarPostRender === 'function') { try { tarPostRender(view, r.path); } catch(e){ console.warn('tareas', e); } }
  POST_RENDER.forEach(fn => { try { fn(view, r.path, r.query); } catch(e){ console.warn('post-render', e); } });
  window.scrollTo({top:0, behavior:'instant'});
  updateNav(r.path);
  if (typeof updateCrumbs === 'function') updateCrumbs(r.path);
  if (typeof renderBell === 'function') renderBell();
}
window.addEventListener('hashchange', render);

/* ---------- NAV ---------- */
function navItems(){
  const rol = Store.ses.rol, prog = Store.prog();
  const salir = [{g:'Sesión'}, {action:'logout', t:'Cerrar sesión', ico:'⎋'}];
  const privacidad = {href:'#/privacidad', t:'Aviso de privacidad', ico:'🔒'};
  const entornos = [{g:'Entornos'}, {href:'#/cn', t:'Ciencias Naturales', dot:'eco'}, {href:'#/', t:'Biología', dot:'anat'}];
  if (rol === 'admin') return [
    {g:'Administración'},
    {href:'#/admin', t:'Consola', ico:'▤'},
    {href:'#/admin?t=cursos', t:'Cursos', ico:'▦'},
    {href:'#/admin?t=estudiantes', t:'Estudiantes', ico:'👪'},
    {href:'#/admin?t=docentes', t:'Docentes', ico:'🎓'},
    {href:'#/admin?t=personal', t:'DECE y autoridades', ico:'🏛'},
    {href:'#/admin?t=anio', t:'Año lectivo y quimestres', ico:'📅'},
    {g:'Seguimiento institucional'},
    {href:'#/institucion', t:'Tablero institucional', ico:'🏛'},
    {href:'#/docente', t:'Notas y seguimiento (todos los cursos)', ico:'▤'},
    {href:'#/nee', t:'Estudiantes con NEE', ico:'🤝'},
    {href:'#/docente?t=diagnostico', t:'Diagnóstico', ico:'◎'},
    {g:'Control y datos'},
    {href:'#/admin?t=papelera', t:'Papelera', ico:'🗑'},
    {href:'#/admin?t=auditoria', t:'Registro de auditoría', ico:'📜'},
    {href:'#/admin?t=privacidad', t:'Privacidad y datos', ico:'🔒'},
    ...entornos,
    ...salir
  ];
  if (rol === 'autoridad') return [
    {g:'Autoridades · solo lectura'},
    {href:'#/institucion', t:'Tablero institucional', ico:'🏛'},
    {href:'#/docente', t:'Notas y seguimiento', ico:'▤'},
    {href:'#/auditoria', t:'Registro de auditoría', ico:'📜'},
    ...entornos, privacidad,
    ...salir
  ];
  if (rol === 'dece') return [
    {g:'DECE'},
    {href:'#/nee', t:'Estudiantes con NEE', ico:'🤝'},
    {href:'#/docente?t=nee', t:'Adaptaciones de acceso', ico:'🅰'},
    {href:'#/docente', t:'Notas y seguimiento', ico:'▤'},
    ...entornos, privacidad,
    ...salir
  ];
  if (rol === 'familia') return [
    {g:'Representante'},
    {href:'#/familia', t:'Avance de mi representado', ico:'▦'},
    {href:'#/familia?t=semana', t:'Resumen de la semana', ico:'📅'},
    {href:'#/familia?t=comunicados', t:'Comunicados', ico:'📣'},
    {href:'#/accesibilidad', t:'Accesibilidad', ico:'🅰'},
    privacidad,
    {g:'Conocer la plataforma'},
    {href:'#/', t:'Inicio', ico:'⌂'},
    {href:'#/mapa', t:'Mapa', ico:'🗺'},
    ...salir
  ];
  /* ---- Ciencias Naturales (EGB Superior) ---- */
  const baseCN = (() => {
    const g = typeof cnNivelActual === 'function' ? cnNivelActual() : 8;
    const us = BIO.cn.unidades.filter(u => u.grado === g);
    const labs = []; const vistos = new Set();
    us.forEach(u => (u.recursos||[]).forEach(id => { const r = BIO.cn.recursos[id]; if (!r || vistos.has(r.href)) return;
      if (/^(Laboratorio|Simulador|Tablero|Caso|Microscopio)/.test(r.tipo)) { vistos.add(r.href); labs.push({ href:r.href, t:(x => x.charAt(0).toUpperCase()+x.slice(1))(r.t.replace(/^(Laboratorio|Simulador|Misión): /,'')), ico: /Misión/.test(r.tipo) ? '◈' : /Simulador|Tablero/.test(r.tipo) ? '∿' : /Microscopio/.test(r.tipo) ? '◉' : '⚗' }); } }));
    return [
      {g:'Estudiante'},
      {href:'#/cn', t:'Inicio', ico:'⌂'},
      {href:'#/mapa', t:'Mapa', ico:'🗺'},
      {g:`Mis unidades · ${g}.º EGB`},
      ...us.map(u => ({ href:'#/cn/unidad/'+u.id, t:`${u.dom==='cvt'?'Vida':'Física'} U${u.n} · ${u.t.split(/[:,]/)[0]}`, dot: u.dom==='cvt' ? 'eco' : 'gen' })),
      {g:'Laboratorios y simuladores'},
      ...labs,
      {g:'Otros grados'},
      {href:'#/cn/dominio/cvt', t:'Vida y Tierra (8.º a 10.º)', dot:'eco'},
      {href:'#/cn/dominio/cf', t:'Ciencias Físicas (8.º a 10.º)', dot:'gen'},
      {g:'Mi espacio'},
      {href:'#/cn/progreso', t:'Mi progreso', ico:'↗'},
      {href:'#/cuaderno', t:'Cuaderno', ico:'✎'},
      {href:'#/accesibilidad', t:'Mi forma de aprender', ico:'🅰'}
    ];
  })();
  /* ---- Biología (Bachillerato) ---- */
  const baseBio = [
    {g:'Estudiante'},
    {href:'#/', t:'Inicio', ico:'⌂'},
    {href:'#/panel', t:'Mi panel', ico:'▦'},
    {href:'#/mapa', t:'Mapa', ico:'🗺'},
    {g:'Áreas de Biología'},
    ...BIO.areas.map(a => ({href:'#/area/'+a.id, t:a.n, dot:a.dom, area:a.id, tag: Store.areaStatus(a)==='repaso' ? 'repaso' : Store.areaStatus(a)==='proximo' ? 'luego' : null})),
    {g:'Transversal · conecta las áreas'},
    {href:'#/misiones', t:'Misiones', ico:'◈'},
    {href:'#/laboratorio', t:'Laboratorios', ico:'⚗'},
    {href:'#/simuladores', t:'Simuladores', ico:'∿'},
    {href:'#/microscopio', t:'Microscopio', ico:'◉'},
    {href:'#/evaluacion', t:'Evaluación', ico:'✓'},
    {g:'Mi espacio'},
    {href:'#/progreso', t:'Mi progreso', ico:'↗'},
    {href:'#/cuaderno', t:'Cuaderno', ico:'✎'},
    {href:'#/accesibilidad', t:'Mi forma de aprender', ico:'🅰'}
  ];
  const base = prog === 'cn' ? baseCN : baseBio;
  if (rol === 'docente') return [
    {g:'Docente · '+(BIO.programas[prog]||BIO.programas.bio).n},
    {href:'#/docente', t:'Panel docente', ico:'▤'},
    {href:'#/familia', t:'Vista de familia', ico:'👪'},
    ...base, ...salir
  ];
  return [...base, ...salir];
}
/* Qué rutas pertenecen a cada área (para marcar la navegación) */
const AREA_PATHS = {
  cuerpo:['/explorar/corazon','/explorar/cerebro','/explorar/pulmones','/explorar/organo'],
  celular:['/explorar/celula'],
  genetica:['/explorar/genetica'],
  biodiversidad:['/explorar/ecosistemas']
};
const ICONS = {
  '⌂':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 3l9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>',
  '▦':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>',
  '◎':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>',
  '⚗':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/><path d="M7 15h10"/></svg>',
  '∿':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
  '◉':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21h12M9 21v-3M14 4l-4 4M10 4l4 4M12 8v5M8 13h8l-2 5H10z"/></svg>',
  '◈':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  '✓':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>',
  '↗':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>',
  '✎':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16M5 16 16 5l3 3L8 19l-4 1z"/></svg>',
  '⎋':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"/><path d="m15 16 4-4-4-4"/><path d="M19 12H10"/></svg>',
  '🗺':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
  '🅰':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 10 5l6 15M6.5 15h7"/><path d="M18 11v9M18 8h.01"/></svg>',
  '🎓':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5"/></svg>',
  '⚡':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  '👪':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3 2.2-5 5-5s5 2 5 5"/><path d="M14 20c0-2.3 1.4-4 3-4s3 1.7 3 4"/></svg>',
  '▤':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 20v-10"/></svg>',
  '🔒':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  '🏛':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/></svg>',
  '🗑':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  '📜':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h11v15a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2h13"/><path d="M8 3a3 3 0 0 0-3 3v10M11 8h5M11 12h5"/></svg>',
  '📅':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2"/></svg>',
  '🤝':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/><path d="M12 12v4"/></svg>',
  '📣':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>'
};
function buildNav(){
  const nav = $('#nav-main'); nav.innerHTML='';
  navItems().forEach(n => { if (n.g) nav.append(h('div',{class:'nav-group'},n.g));
    else if (n.action === 'logout') nav.append(h('button',{class:'navout',onclick:()=>cerrarSesion()}, h('span',{class:'ico',html:ICONS[n.ico]}), n.t));
    else nav.append(h('a',{href:n.href, 'data-area':n.area||null}, n.dot ? h('span',{class:'ico'}, h('span',{class:'navdot '+n.dot})) : h('span',{class:'ico',html:ICONS[n.ico]}), n.t, n.tag ? h('span',{class:'tag'},n.tag):null)); });
  const bn = $('#nav-bottom'); bn.innerHTML='';
  const rolB = Store.ses.rol;
  const abajo = rolB === 'estudiante' ? (Store.prog() === 'cn'
      ? [['#/cn','Inicio','⌂'],['#/mapa','Mapa','🗺'],['#/cn/progreso','Progreso','↗'],['#/cuaderno','Cuaderno','✎'],['#/accesibilidad','Lectura','🅰']]
      : [['#/','Inicio','⌂'],['#/explorar','Áreas','◎'],['#/misiones','Misiones','◈'],['#/laboratorio','Lab','⚗'],['#/progreso','Progreso','↗']])
    : navItems().filter(n => n.href && n.ico).slice(0, 5).map(n => [n.href, n.t.split(/[ (]/).slice(0, 2).join(' '), n.ico]);
  abajo.forEach(([href,t,i]) => bn.append(h('a',{href}, h('span',{class:'ico',html:ICONS[i]||ICONS['▦'],style:'width:20px;height:20px;display:inline-block'}), t)));
}
function updateNav(path){
  const inArea = id => (AREA_PATHS[id]||[]).some(p => path.startsWith(p));
  const cn = Store.prog()==='cn';
  const hashAct = location.hash || '#/'; const conQuery = $$('#nav-main a').filter(a => a.getAttribute('href').includes('?')).map(a => a.getAttribute('href'));
  const set = a => { const href = a.getAttribute('href'), p = href.replace('#','').split('?')[0]; const ar = a.dataset.area;
    let cur = (p==='/' ? path==='/' : path.startsWith(p)) || (ar && inArea(ar));
    /* enlaces con ?t=…: solo el que coincide; el enlace sin consulta se apaga si otro con consulta coincide */
    if (href.includes('?')) cur = hashAct === href || hashAct.startsWith(href + '&');
    else if (cur && conQuery.some(q => hashAct === q || hashAct.startsWith(q + '&'))) cur = false;
    if (p==='/explorar' && path.startsWith('/area/')) cur = true;
    if (cn && p==='/cn' && path !== '/cn') cur = false;
    if (cur) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); };
  $$('#nav-main a').forEach(set); $$('#nav-bottom a').forEach(set);
}

/* ---------- BÚSQUEDA UNIVERSAL ---------- */
function searchIndex(){
  const idx = [];
  Object.values(BIO.organs).forEach(o => o.structures.forEach(s => { idx.push({k:'Modelo 3D', t:`${s.nombre} · ${o.nombre}`, d:s.n1, href:`#/explorar/${o.id}?s=${s.id}`, dom:'anat'}); idx.push({k:'Quiz', t:`Comprueba: ${s.nombre}`, d:s.quiz.q, href:`#/explorar/${o.id}?s=${s.id}&quiz=1`, dom:'anat'}); }));
  idx.push({k:'Proceso', t:'Impulso nervioso', d:'Receptor → médula → tronco → tálamo → corteza → respuesta motora.', href:'#/explorar/cerebro?s=medula', dom:'anat'});
  idx.push({k:'Proceso', t:'Mecánica de la respiración', d:'Diafragma, presión y volumen: inspiración y espiración.', href:'#/explorar/pulmones?s=diafragma', dom:'anat'});
  BIO.cell.structures.forEach(s => { idx.push({k:'Modelo 3D', t:s.nombre, d:s.funcion, href:`#/explorar/celula?s=${s.id}`, dom:'cell'}); idx.push({k:'Proceso', t:s.accion.t, d:s.accion.d + ' · ' + s.nombre, href:`#/explorar/celula?s=${s.id}&accion=1`, dom:'cell'}); });
  BIO.missions.forEach(m => idx.push({k:'Misión', t:m.t, d:m.d, href: m.disponible ? `#/mision/${m.id}` : '#/misiones', dom:m.dominio}));
  idx.push({k:'Laboratorio', t:'Fotosíntesis: luz, CO₂, temperatura y agua', d:'Experimento con variables manipulables y registro de datos.', href:'#/laboratorio/fotosintesis', dom:'lab'});
  idx.push({k:'Simulador', t:'Sistema cardiorrespiratorio', d:'Frecuencia cardíaca, ventilación, gasto cardíaco y transporte de O₂.', href:'#/simuladores/circulacion', dom:'anat'});
  idx.push({k:'Simulador', t:'Respiración celular', d:'Glucosa + O₂ → ATP. Relación con la mitocondria y el ejercicio.', href:'#/simuladores/circulacion', dom:'cell'});
  idx.push({k:'Evaluación', t:'Evaluación interactiva: el corazón', d:'Selección visual, ordenamiento, verdadero/falso argumentado.', href:'#/evaluacion/corazon', dom:'anat'});
  BIO.areas.forEach(a => idx.push({k:'Área', t:a.n, d:a.d, href:'#/area/'+a.id, dom:a.dom}));
  BIO.units.forEach(u => { const a = BIO.areas.find(x => x.unidades.includes(u.n)); idx.push({k:'Unidad', t:`Unidad ${u.n}: ${u.t}`, d:(a ? a.n+' · ' : 'Transversal · ')+u.d, href: a ? '#/area/'+a.id : '#/misiones', dom:''}); });
  BIO.resources.filter(r => !r.ok).forEach(r => idx.push({k:r.tipo, t:r.t+' (en construcción)', d:r.d, href:r.href, dom:''}));
  idx.push({k:'Definición', t:'Intercambio gaseoso', d:'Difusión de O₂ y CO₂ entre alvéolos y capilares.', href:'#/mision/globulo-rojo', dom:'anat'});
  idx.push({k:'Definición', t:'Homeostasis', d:'Mantenimiento del equilibrio interno; los sistemas circulatorio y respiratorio la sostienen.', href:'#/simuladores/circulacion', dom:'anat'});
  idx.push({k:'Definición', t:'Hemoglobina', d:'Proteína de los glóbulos rojos que transporta O₂ (cuatro moléculas por hemoglobina).', href:'#/mision/globulo-rojo', dom:'anat'});
  BIO.cn.unidades.forEach(u => { const d = BIO.cn.dominios.find(x=>x.id===u.dom);
    idx.push({k:'CCNN · '+BIO.nivel(u.grado).corto, t:`U${u.n} · ${u.t}`, d:`${d.n}. Reto: ${u.reto}`, href:'#/cn/unidad/'+u.id, dom:d.dom}); });
  Object.entries(BIO.cn.recursos).forEach(([id,r]) => idx.push({k:'CCNN · '+r.tipo, t:r.t + (r.ok?'':' (en construcción)'), d:r.d, href:r.href, dom:'eco'}));
  idx.push({k:'Orientación', t:'Mapa de la plataforma', d:'Dónde estoy, qué áreas me tocan este año y cuál es mi siguiente paso.', href:'#/mapa', dom:''});
  idx.push({k:'Accesibilidad', t:'Mi forma de aprender', d:'Tamaño de letra, tipografía legible, contraste, voz, ritmo y pistas.', href:'#/accesibilidad', dom:''});
  idx.push({k:'Docente', t:'Panel docente: calificaciones y reportes', d:'Libro de calificaciones sobre 10, reportes imprimibles, códigos por año y adaptaciones NEE.', href:'#/docente', dom:''});
  idx.push({k:'Familia', t:'Avance de mi representado', d:'Vista de solo lectura para representantes con pendientes y comentarios.', href:'#/familia', dom:''});
  BIO.years.forEach(y => idx.push({k:'Año', t:y.n, d:y.d, href:'#/mapa', dom:''}));
  idx.push({k:'Escala', t:'Del ADN a la biosfera', d:'Niveles de organización biológica.', href:'#/?escala=1', dom:''});
  return idx;
}
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
function search(q){ q = norm(q.trim()); if (q.length<2) return []; return searchIndex().filter(i => norm(i.t+' '+i.d+' '+i.k).includes(q)).slice(0,12); }
(function initSearch(){
  const inp = $('#search-input'), res = $('#search-results');
  const show = () => { const r = search(inp.value); res.innerHTML=''; if (!r.length){ if (inp.value.trim().length>=2) { res.append(h('div',{class:'sr-item muted'},'Sin resultados. Prueba con: corazón, mitocondria, fotosíntesis…')); res.classList.add('open'); } else res.classList.remove('open'); return; }
    r.forEach(i => res.append(h('a',{class:'sr-item',href:i.href,onclick:()=>{res.classList.remove('open'); inp.value=''; Store.log('busqueda',{consulta:inp.value,resultado:i.t});}}, h('span',{class:'k'},i.k), h('span',{}, h('div',{class:'t'},i.t), h('div',{class:'d'},i.d.slice(0,90)))))); res.classList.add('open'); };
  inp.addEventListener('input', show); inp.addEventListener('focus', show);
  document.addEventListener('click', e => { if (!e.target.closest('.search')) res.classList.remove('open'); });
  inp.addEventListener('keydown', e => { if (e.key==='Enter'){ const f = res.querySelector('a'); if (f) f.click(); } });
})();

/* ---------- Gráficos (canvas, un solo eje, marcas finas) ----------
   lineChart(canvas, {series:[{pts:[{x,y}], color, label, dots, dash, width, fill}], xlabel, ylabel, xfmt, yfmt, xmin, xmax, ymin, ymax, xticks, fill})
   Lo nuevo es opcional y está documentado en src/26-graficos.js (lectura con guía y teclado, leyenda, menú con PNG y tabla,
   barras de error, tendencia, anotaciones, comparar y «dibuja tu predicción»). Devuelve la geometría {X, Y, pad, …}. */
function lineChart(canvas, opts){
  if (!canvas || !opts) return null;
  const st = grafEstado(canvas); st.dentro = true; st.externo = false;
  try {
    const dpr = Math.min(window.devicePixelRatio||1, 2);
    const W = canvas.clientWidth||600, H = canvas.clientHeight||280; canvas.width=W*dpr; canvas.height=H*dpr;
    const ctx = canvas.getContext('2d'); ctx.scale(dpr,dpr);
    st.opts = opts; st.W = W; st.H = H;
    const geo = st.geo = grafPintar(ctx, W, H, opts, st);
    canvas._opts = Object.assign({}, opts, { X:geo.X, Y:geo.Y });
    try { grafMontar(canvas, opts, geo, st); } catch(e){ console.warn('gráfico: interacción', e); }
    return geo;
  } finally { st.dentro = false; }
}
</script>
