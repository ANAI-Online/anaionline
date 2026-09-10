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

/* ---------- STORE ---------- */
const DEFAULT_STATE = () => ({
  version: 1,
  user: { id:"demo-mateo", nombre:"Mateo Andrade", iniciales:"MA", curso:"1.º de Bachillerato", rol:"estudiante" },
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
  lastActivity: { t:"Explorar la célula animal", at: Date.now()-86400000, href:"#/explorar/celula" },
  timeMin: 0
});
const KEY = 'anai-biolab-v1';
const Store = {
  s: null,
  load(){ try { const raw = localStorage.getItem(KEY); this.s = raw ? Object.assign(DEFAULT_STATE(), JSON.parse(raw)) : DEFAULT_STATE(); } catch(e){ this.s = DEFAULT_STATE(); } return this.s; },
  save(){ try { localStorage.setItem(KEY, JSON.stringify(this.s)); } catch(e){} },
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
  body.textContent = levels[0][2];
  return h('div',{},tabs,body);
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
let currentView = null;
function route(path, fn){ Routes[path]=fn; }
function navigate(hash){ location.hash = hash; }
function parseHash(){ const hsh = location.hash.replace(/^#\/?/, ''); const [p, q] = hsh.split('?'); const parts = p.split('/').filter(Boolean); return { parts, path:'/'+parts.join('/'), query:Object.fromEntries(new URLSearchParams(q||'')) }; }
function render(){
  const r = parseHash();
  if (currentView?.unmount) { try { currentView.unmount(); } catch(e){ console.warn(e); } }
  currentView = null;
  const view = $('#view'); view.innerHTML=''; view.className='view'; $('#search-results').classList.remove('open'); $('#search-input').value='';
  // match: exact, then prefix with param
  let fn = Routes[r.path] , params = {};
  if (!fn) { for (const key of Object.keys(Routes)) { if (key.includes(':')) { const kp=key.split('/'); if (kp.length===r.parts.length+1) { let ok=true; kp.slice(1).forEach((seg,i)=>{ if (seg.startsWith(':')) params[seg.slice(1)]=r.parts[i]; else if (seg!==r.parts[i]) ok=false; }); if (ok){ fn=Routes[key]; break; } } } } }
  if (!fn) fn = Routes['/'];
  Store.log('vista',{vista:r.path});
  currentView = fn(view, Object.assign(params, r.query)) || {};
  window.scrollTo({top:0, behavior:'instant'});
  updateNav(r.path);
}
window.addEventListener('hashchange', render);

/* ---------- NAV ---------- */
const NAV = [
  {g:'Estudiante'},
  {href:'#/', t:'Inicio', ico:'⌂'},
  {href:'#/panel', t:'Mi panel', ico:'▦'},
  {href:'#/explorar', t:'Explorar', ico:'◎'},
  {href:'#/laboratorio', t:'Laboratorio', ico:'⚗'},
  {href:'#/simuladores', t:'Simuladores', ico:'∿'},
  {href:'#/microscopio', t:'Microscopio', ico:'◉', tag:'pronto'},
  {href:'#/misiones', t:'Misiones', ico:'◈'},
  {href:'#/evaluacion', t:'Evaluación', ico:'✓'},
  {href:'#/progreso', t:'Mi progreso', ico:'↗'},
  {href:'#/cuaderno', t:'Cuaderno', ico:'✎'},
  {g:'Docente'},
  {href:'#/docente', t:'Panel docente', ico:'▤'}
];
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
  '▤':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 20v-10"/></svg>'
};
function buildNav(){
  const nav = $('#nav-main'); nav.innerHTML='';
  NAV.forEach(n => { if (n.g) nav.append(h('div',{class:'nav-group'},n.g)); else nav.append(h('a',{href:n.href}, h('span',{class:'ico',html:ICONS[n.ico]}), n.t, n.tag ? h('span',{class:'tag'},n.tag):null)); });
  const bn = $('#nav-bottom'); bn.innerHTML='';
  [['#/','Inicio','⌂'],['#/explorar','Explorar','◎'],['#/misiones','Misiones','◈'],['#/laboratorio','Lab','⚗'],['#/progreso','Progreso','↗']].forEach(([href,t,i]) => bn.append(h('a',{href}, h('span',{class:'ico',html:ICONS[i],style:'width:20px;height:20px;display:inline-block'}), t)));
}
function updateNav(path){
  const set = a => { const p = a.getAttribute('href').replace('#',''); const cur = (p==='/' ? path==='/' : path.startsWith(p)); if (cur) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); };
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
  BIO.units.forEach(u => idx.push({k:'Unidad', t:`Unidad ${u.n}: ${u.t}`, d:u.d, href:'#/explorar', dom:''}));
  idx.push({k:'Definición', t:'Intercambio gaseoso', d:'Difusión de O₂ y CO₂ entre alvéolos y capilares.', href:'#/mision/globulo-rojo', dom:'anat'});
  idx.push({k:'Definición', t:'Homeostasis', d:'Mantenimiento del equilibrio interno; los sistemas circulatorio y respiratorio la sostienen.', href:'#/simuladores/circulacion', dom:'anat'});
  idx.push({k:'Definición', t:'Hemoglobina', d:'Proteína de los glóbulos rojos que transporta O₂ (cuatro moléculas por hemoglobina).', href:'#/mision/globulo-rojo', dom:'anat'});
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

/* ---------- Gráficos (canvas, un solo eje, marcas finas, tooltip) ---------- */
function lineChart(canvas, opts){
  const dpr = Math.min(window.devicePixelRatio||1, 2);
  const W = canvas.clientWidth||600, H = canvas.clientHeight||280; canvas.width=W*dpr; canvas.height=H*dpr;
  const ctx = canvas.getContext('2d'); ctx.scale(dpr,dpr);
  const ink = cssVar('--ink'), ink3 = cssVar('--ink-3'), grid = cssVar('--chart-grid');
  const pad = {l:48,r:16,t:16,b:36}; const pw=W-pad.l-pad.r, ph=H-pad.t-pad.b;
  const series = opts.series; const xs = series.flatMap(s=>s.pts.map(p=>p.x)), ys = series.flatMap(s=>s.pts.map(p=>p.y));
  const nice = v => { const p = Math.pow(10, Math.floor(Math.log10(Math.max(v,1)))); const m = v/p; const k = m<=1?1:m<=2?2:m<=2.5?2.5:m<=4?4:m<=5?5:m<=8?8:10; return k*p; };
  const xmin = opts.xmin ?? Math.min(...xs), xmax = opts.xmax ?? Math.max(...xs); const ymin = opts.ymin ?? 0, ymax = opts.ymax ?? nice(Math.max(...ys,1)*1.2);
  const X = x => pad.l + (x-xmin)/((xmax-xmin)||1)*pw, Y = y => pad.t + ph - (y-ymin)/((ymax-ymin)||1)*ph;
  ctx.clearRect(0,0,W,H); ctx.font = '11px "IBM Plex Mono", monospace'; ctx.fillStyle = ink3; ctx.strokeStyle = grid; ctx.lineWidth = 1;
  const yt = 4; for (let i=0;i<=yt;i++){ const v = ymin + (ymax-ymin)*i/yt; const y = Y(v); ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke(); ctx.textAlign='right'; ctx.fillText(opts.yfmt ? opts.yfmt(v) : Math.round(v), pad.l-8, y+4); }
  const xt = opts.xticks || 5; for (let i=0;i<=xt;i++){ const v = xmin + (xmax-xmin)*i/xt; ctx.textAlign='center'; ctx.fillText(opts.xfmt ? opts.xfmt(v) : Math.round(v), X(v), H-pad.b+18); }
  ctx.fillStyle = ink3; ctx.textAlign='left'; if (opts.ylabel) ctx.fillText(opts.ylabel, pad.l, pad.t-4); if (opts.xlabel){ ctx.textAlign='right'; ctx.fillText(opts.xlabel, W-pad.r, H-6); }
  series.forEach(s => { ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.lineJoin='round'; ctx.beginPath(); s.pts.forEach((p,i)=> i?ctx.lineTo(X(p.x),Y(p.y)):ctx.moveTo(X(p.x),Y(p.y))); ctx.stroke();
    if (s.dots) s.pts.forEach(p => { ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(X(p.x),Y(p.y),4,0,Math.PI*2); ctx.fill(); ctx.strokeStyle=cssVar('--bg-2'); ctx.lineWidth=2; ctx.stroke(); });
    if (s.label && s.pts.length){ const last = s.pts[s.pts.length-1]; ctx.fillStyle = ink; ctx.font='600 11px "IBM Plex Sans", sans-serif'; ctx.textAlign='right'; ctx.fillText(s.label, X(last.x), Y(last.y)-8); }
  });
  // hover
  if (!canvas._hover){ canvas._hover = true; const tip = h('div',{class:'phase',style:'position:absolute;pointer-events:none;display:none'}); canvas.parentElement.style.position='relative'; canvas.parentElement.append(tip);
    canvas.addEventListener('mousemove', e => { const o = canvas._opts; if (!o) return; const r = canvas.getBoundingClientRect(); const mx = e.clientX-r.left; let best=null; o.series.forEach(s=>s.pts.forEach(p=>{ const d=Math.abs(o.X(p.x)-mx); if(!best||d<best.d) best={d,p,s}; })); if (best && best.d<24){ tip.style.display='block'; tip.style.left=(o.X(best.p.x)+10)+'px'; tip.style.top=(o.Y(best.p.y)-28)+'px'; tip.textContent = `${best.s.label||''} ${o.xfmt?o.xfmt(best.p.x):best.p.x} → ${o.yfmt?o.yfmt(best.p.y):Math.round(best.p.y*10)/10}`; } else tip.style.display='none'; });
    canvas.addEventListener('mouseleave', ()=> tip.style.display='none'); }
  canvas._opts = Object.assign({}, opts, {X, Y});
}
</script>
