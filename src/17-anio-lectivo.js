<style>
.anio-nav{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px}
.anio-sec{scroll-margin-top:80px}
.anio-sec h2{font-size:1.05rem;margin:0}
.anio-f{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;align-items:end}
.anio-f label{min-width:0;display:flex;flex-direction:column;gap:4px;font-size:.8rem;font-weight:600;color:var(--ink-2)}
.anio-f input,.anio-f select,.anio-in{padding:8px 10px;border-radius:9px;border:1px solid var(--line-2);background:var(--bg-2);color:var(--ink);font:inherit;font-size:.9rem;width:100%;min-width:0}
.anio-f input:disabled{opacity:.6}
.anio-q{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
.anio-q .card{border:1px solid var(--line)}
.anio-q .anio-est{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
.anio-pct{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.anio-pct label{display:flex;flex-direction:column;gap:4px;font-size:.8rem;font-weight:600;color:var(--ink-2)}
.anio-pct small{font-weight:400;color:var(--ink-3)}
.anio-suma{font-family:var(--font-m);font-weight:700}
.anio-suma.bad{color:var(--bad)}
.anio-ej{font-family:var(--font-m);font-size:.82rem;background:var(--bg-3);border-radius:10px;padding:10px 12px;line-height:1.6;overflow-wrap:anywhere}
.anio-mob{display:none}
.anio-radio{display:flex;gap:8px;align-items:flex-start;font-size:.9rem;cursor:pointer}
.anio-radio input{margin-top:3px;accent-color:var(--accent)}
.anio-pasos{display:flex;gap:6px;flex-wrap:wrap;counter-reset:paso}
.anio-pasos span{padding:5px 11px;border-radius:999px;background:var(--bg-3);font-size:.8rem;font-weight:600;color:var(--ink-3)}
.anio-pasos span.on{background:var(--accent-soft);color:var(--ink);outline:1px solid var(--accent)}
.anio-pasos span.ok{color:var(--ok)}
.anio-grupo{border:1px solid var(--line);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px}
.anio-grupo h3{font-size:.95rem;margin:0;display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.anio-rep{display:inline-flex;gap:6px;align-items:center;font-size:.85rem;cursor:pointer;white-space:nowrap}
.anio-rep input{accent-color:var(--bad);width:16px;height:16px}
.anio-tabla td,.anio-tabla th{vertical-align:middle}
.anio-tabla td.num{font-family:var(--font-m);text-align:center;font-variant-numeric:tabular-nums}
.anio-hist summary{cursor:pointer;font-weight:700;padding:6px 0}
.anio-psel{gap:6px;flex-wrap:wrap;align-items:center;margin:8px 0 4px}
.anio-psel .chip .pill{font-size:.66rem;padding:1px 7px}
.grades th.anio-c,.grades td.anio-c{width:64px !important;text-align:center;font-size:.72rem}
.grades td.anio-c{font-family:var(--font-m);font-size:.85rem}
.grades td.nota.ro{cursor:default}
.anio-esc{font-weight:700}
.anio-cat td.num{text-align:center;font-family:var(--font-m)}
@media (max-width:600px){ .anio-f{grid-template-columns:repeat(2,minmax(0,1fr))} .anio-q{grid-template-columns:1fr} .anio-tabla .anio-opt{display:none} .anio-tabla .anio-mob{display:block} .tablewrap table.data.anio-tabla{min-width:0} .anio-tabla th,.anio-tabla td{padding:8px 6px} .anio-pct{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media print{ .anio-psel,.anio-nav{display:none} }
</style>
<script>
/* =====================================================================
   AÑO LECTIVO POR QUIMESTRES (v1.8)
   ---------------------------------------------------------------------
   · Cada nota pertenece al quimestre en cuyas fechas se registró
     (fecha en hora de Ecuador, igual que en el servidor).
   · Al cerrar un quimestre la administración congela sus notas
     (tabla calificaciones_cierre); desde ahí se leen las del cierre.
   · Promedio del quimestre: por el peso de cada actividad (como hasta
     ahora) o por categorías, con los porcentajes que fije la institución.
   · Nota anual: promedio de los dos quimestres.
   · Escala cualitativa del Reglamento General a la LOEI.
   · Pestaña de administración "Año lectivo": calendario, cierre de
     quimestres, ponderación, libreta en Excel (.xlsx real), cierre del
     año con promoción e historial de años anteriores.
   ===================================================================== */
const CATEGORIAS = {
  exploracion:  { n:'Exploración y modelos', c:'Exploración', d:'Modelos 3D, animaciones y microscopio', tipos:['Modelo 3D','Animación','Microscopio'] },
  laboratorios: { n:'Laboratorios y simuladores', c:'Laboratorios', d:'Laboratorios, simuladores y tableros de datos', tipos:['Laboratorio','Laboratorio 3D','Simulador','Simulador 3D','Tablero de datos'] },
  misiones:     { n:'Misiones y casos', c:'Misiones', d:'Misiones y casos que integran varias áreas', tipos:['Misión','Caso'] },
  evaluaciones: { n:'Evaluaciones', c:'Evaluaciones', d:'Evaluaciones interactivas', tipos:['Evaluación'] }
};
const ESCALA = [
  { min:9,    k:'DAR',  n:'Domina los aprendizajes requeridos' },
  { min:7,    k:'AAR',  n:'Alcanza los aprendizajes requeridos' },
  { min:4.01, k:'PAAR', n:'Está próximo a alcanzar los aprendizajes requeridos' },
  { min:0,    k:'NAAR', n:'No alcanza los aprendizajes requeridos' }
];
const r2 = n => Math.round(n * 100) / 100;
const Periodos = {
  lista(){ return Inst.calendario().quimestres; },
  q(id){ return this.lista().find(q => q.id === id) || null; },
  /* fecha (ms) → 'YYYY-MM-DD' en hora de Ecuador (UTC−5, sin horario de verano), como el servidor */
  dia(ms){ return new Date(ms - 5*3600000).toISOString().slice(0,10); },
  de(ms){ if (!ms) return null; const d = this.dia(ms); const q = this.lista().find(q => d >= q.inicio && d <= q.fin); return q ? q.id : null; },
  actual(){ const L = this.lista(); const hoy = this.dia(Date.now()); const q = L.find(q => hoy >= q.inicio && hoy <= q.fin);
    if (q) return q.id; if (L.length && hoy > L[L.length-1].fin) return L[L.length-1].id;
    /* entre quimestres (vacaciones): el último que ya empezó */
    const ya = L.filter(q => hoy >= q.inicio); if (ya.length) return ya[ya.length-1].id;
    return L.length ? L[0].id : 'Q1'; },
  cerrado(id){ const q = this.q(id); return !!(q && q.cerrado); },
  /* periodo que se está mirando en el libro de calificaciones: 'Q1' | 'Q2' | 'anual' */
  get vista(){ const ui = Store.s.ui = Store.s.ui || {}; const v = ui.periodo; return (v === 'anual' || this.q(v)) ? v : this.actual(); },
  set vista(v){ (Store.s.ui = Store.s.ui || {}).periodo = v; Store.save(); },
  vistaCerrada(){ const v = this.vista; return v !== 'anual' && this.cerrado(v); },
  nombreVista(v = this.vista){ return v === 'anual' ? 'Año completo' : ((this.q(v) || {}).n || v); },
  /* notas de un quimestre sin mirar el cierre (lo que hay hoy en la tabla de notas) */
  notasCrudas(codigo, notas, fechas, periodo){
    const actual = this.actual(), out = {};
    Object.entries(notas || {}).forEach(([act, n]) => { if (n == null) return; const f = (fechas||{})[act]; const q = f ? this.de(f) : actual; if ((q || actual) === periodo) out[act] = n; });
    return out;
  },
  /* notas de un estudiante en un quimestre. notas: {act:nota}; fechas: {act:ms}. Si está cerrado, las del cierre */
  notasPeriodo(codigo, notas, fechas, periodo){
    if (this.cerrado(periodo)){ const C = ((Store.s.cierres||{})[Inst.anio()]||{})[periodo]; if (C) return Object.assign({}, C[codigo] || {}); }
    return this.notasCrudas(codigo, notas, fechas, periodo);
  },
  categoria(item){ const t = item && item.tipo; for (const [k, c] of Object.entries(CATEGORIAS)) if (c.tipos.includes(t)) return k; return 'exploracion'; },
  /* promedio de un conjunto de notas sobre los ítems del curso */
  promedio(items, notas){
    const conNota = items.filter(i => notas[i.id] != null); if (!conNota.length) return null;
    const P = Inst.ponderacion();
    if (P.modo !== 'categoria'){ const w = conNota.reduce((a,i)=>a+i.peso,0); return r2(conNota.reduce((a,i)=>a+notas[i.id]*i.peso,0)/w); }
    const cats = this.porCategoria(items, notas); let s = 0, w = 0;
    Object.entries(cats).forEach(([k, v]) => { if (v == null) return; const pc = +(P.categorias[k] || 0); s += v*pc; w += pc; });
    if (!w){ const vs = Object.values(cats).filter(v => v != null); return vs.length ? r2(vs.reduce((a,b)=>a+b,0)/vs.length) : null; }
    return r2(s/w);
  },
  porCategoria(items, notas){ const out = {};
    Object.keys(CATEGORIAS).forEach(k => { const its = items.filter(i => this.categoria(i) === k && notas[i.id] != null);
      out[k] = its.length ? r2(its.reduce((a,i)=>a+notas[i.id]*i.peso,0)/its.reduce((a,i)=>a+i.peso,0)) : null; });
    return out; },
  /* resumen completo de un estudiante: Q1, Q2, anual y por categoría */
  resumen(codigo, items, notas, fechas){
    const out = { porCategoria:{} };
    this.lista().forEach(q => { const n = this.notasPeriodo(codigo, notas, fechas, q.id); out[q.id] = this.promedio(items, n); out.porCategoria[q.id] = this.porCategoria(items, n); });
    const qs = this.lista().map(q => out[q.id]).filter(v => v != null);
    out.anual = qs.length ? r2(qs.reduce((a,b)=>a+b,0)/qs.length) : null;
    out.cualitativa = this.cualitativa(out.anual);
    return out;
  },
  cualitativa(n){ if (n == null) return null; return ESCALA.find(e => n >= e.min) || ESCALA[ESCALA.length-1]; },
  /* notas que se ven en el libro según la vista actual (quimestre o anual) */
  notasVista(codigo, notas, fechas){ const v = this.vista; return v === 'anual' ? Object.assign({}, notas||{}) : this.notasPeriodo(codigo, notas, fechas, v); },

  /* ---------- utilidades para vistas y exportaciones ---------- */
  num(n, d=2){ return n == null ? '–' : (+n).toFixed(d).replace('.', ','); },
  fechaTxt(iso){ if (!iso) return '—'; const d = new Date(String(iso).slice(0,10) + 'T12:00:00-05:00'); return isNaN(d) ? String(iso) : d.toLocaleDateString('es-EC', { day:'numeric', month:'short', year:'numeric' }); },
  rango(q){ return q ? `${this.fechaTxt(q.inicio)} – ${this.fechaTxt(q.fin)}` : ''; },
  /* libro de calificaciones de un nivel (CN usa su catálogo; Biología, el suyo) */
  itemsDe(nivel){ return BIO.progOf(nivel) === 'cn' ? BIO.cnItemsDe(nivel) : BIO.gradeItemsOf(nivel); },
  notasDe(codigo){ const u = (Store.s.usuarios||{})[codigo] || (Store.s.egresados||{})[codigo] || {}; return Object.assign({}, u.notas || {}, ((Store.s.docente||{}).notas||{})[codigo] || {}); },
  fechasDe(codigo){ return ((Store.s.docente||{}).fechas||{})[codigo] || {}; },
  resumenDe(codigo, nivel){ return this.resumen(codigo, this.itemsDe(nivel), this.notasDe(codigo), this.fechasDe(codigo)); },
  /* cuántas notas caen en un quimestre (todas las de la institución que están cargadas) */
  contar(id){ let n = 0; Users.all().forEach(u => { n += Object.values(this.notasPeriodo(u.codigo, this.notasDe(u.codigo), this.fechasDe(u.codigo), id)).filter(x => x != null).length; }); return n; },
  /* fecha (ms) con la que se registra una nota nueva para que caiga en ese quimestre; null si aún no empieza */
  fechaNueva(id){ const q = this.q(id); if (!q) return Date.now(); const hoy = this.dia(Date.now());
    if (hoy >= q.inicio && hoy <= q.fin) return Date.now();
    if (hoy > q.fin) return Date.parse(q.fin + 'T12:00:00-05:00');
    return null; },
  /* ¿se puede registrar o cambiar esta nota desde el libro? → { ok, msg, periodo, fecha } */
  puedeEditar(fechaExistente, existeCruda){
    const v = this.vista; let destino, fecha;
    if (existeCruda && fechaExistente){ destino = this.de(fechaExistente) || this.actual(); fecha = fechaExistente; }
    else if (existeCruda || v === 'anual'){ destino = v === 'anual' || existeCruda ? (this.de(Date.now()) || this.actual()) : v; fecha = this.fechaNueva(destino) ?? Date.now(); }
    else { destino = v; fecha = this.fechaNueva(v);
      if (fecha == null){ const q = this.q(v); return { ok:false, periodo:v, msg:`El ${q.n.toLowerCase()} empieza el ${this.fechaTxt(q.inicio)}. Todavía no se registran notas en él.` }; } }
    const q = this.q(destino);
    if (this.cerrado(destino)) return { ok:false, cerrado:true, periodo:destino, msg:`El ${(q||{n:'quimestre'}).n.toLowerCase()} está cerrado: la nota quedó fija. Solo la administración puede reabrirlo.` };
    return { ok:true, periodo:destino, fecha };
  },
  /* ---------- calendario ---------- */
  validar(qs){
    for (const q of qs){ if (!/^\d{4}-\d{2}-\d{2}$/.test(q.inicio||'') || !/^\d{4}-\d{2}-\d{2}$/.test(q.fin||'')) return `Escribe las dos fechas del ${q.n.toLowerCase()}.`;
      if (q.fin < q.inicio) return `En el ${q.n.toLowerCase()}, la fecha de fin es anterior a la de inicio.`; }
    for (let i = 1; i < qs.length; i++) if (qs[i].inicio <= qs[i-1].fin) return `El ${qs[i].n.toLowerCase()} debe empezar después de que termine el ${qs[i-1].n.toLowerCase()} (${this.fechaTxt(qs[i-1].fin)}).`;
    return null;
  },
  SIG: { 8:9, 9:10, 10:1, 1:2, 2:3 },
  siguienteNivel(n){ return this.SIG[+n] ?? null; },
  anioSiguiente(a){ const m = String(a||'').match(/(\d{4})\D+(\d{4})/); if (m) return `${+m[1]+1}-${+m[2]+1}`; const y = String(a||'').match(/(\d{4})/); return y ? `${+y[1]+1}-${+y[1]+2}` : ''; },
  masUnAnio(iso){ const [y, m, d] = String(iso).split('-').map(Number); const dd = (m === 2 && d === 29) ? 28 : d; return `${y+1}-${String(m).padStart(2,'0')}-${String(dd).padStart(2,'0')}`; },
  calendarioSiguiente(anioNuevo){ return { anio:anioNuevo, quimestres:this.lista().map(q => ({ id:q.id, n:q.n, inicio:this.masUnAnio(q.inicio), fin:this.masUnAnio(q.fin), cerrado:false })) }; },

  /* ---------- cerrar y reabrir un quimestre ---------- */
  async cerrar(id){
    const q = this.q(id); if (!q) throw new Error('Quimestre no válido.');
    if (Cloud.on){
      if (!Inst.s.calendario) await Inst.guardar('calendario', Inst.calendario());   /* el servidor marca el calendario guardado */
      const n = await Cloud.rpc('cerrar_periodo', { p_periodo:id, p_inicio:q.inicio, p_fin:q.fin });
      await Cloud.pull(); return +n || 0;
    }
    const anio = Inst.anio(), C = Store.s.cierres = Store.s.cierres || {}, A = C[anio] = C[anio] || {}, fr = A[id] = {};
    const F = Store.s.docente.fechas = Store.s.docente.fechas || {}; let n = 0;
    const sello = this.fechaNueva(id) ?? Date.parse(q.inicio + 'T12:00:00-05:00');
    Users.all().forEach(u => { const notas = this.notasDe(u.codigo), f = this.fechasDe(u.codigo);
      const qn = this.notasCrudas(u.codigo, notas, f, id);
      Object.entries(qn).forEach(([act, nota]) => { (fr[u.codigo] = fr[u.codigo] || {})[act] = nota; n++;
        /* las notas sin fecha quedan fechadas dentro del quimestre, para que no "salten" al siguiente */
        if (!f[act]) (F[u.codigo] = F[u.codigo] || {})[act] = sello; }); });
    const cal = JSON.parse(JSON.stringify(Inst.calendario()));
    cal.quimestres = cal.quimestres.map(x => x.id === id ? Object.assign(x, { cerrado:true, cerradoEn:new Date().toISOString() }) : x);
    await Inst.guardar('calendario', cal);
    Auditoria.local('cerrar_quimestre', { anio, periodo:id, notas:n, inicio:q.inicio, fin:q.fin });
    return n;
  },
  async reabrir(id){
    if (Cloud.on){ await Cloud.rpc('reabrir_periodo', { p_periodo:id }); await Cloud.pull(); return; }
    const anio = Inst.anio(); if (Store.s.cierres && Store.s.cierres[anio]) delete Store.s.cierres[anio][id];
    const cal = JSON.parse(JSON.stringify(Inst.calendario()));
    cal.quimestres = cal.quimestres.map(x => { if (x.id !== id) return x; const c = Object.assign(x, { cerrado:false }); delete c.cerradoEn; return c; });
    await Inst.guardar('calendario', cal);
    Auditoria.local('reabrir_quimestre', { anio, periodo:id });
  },

  /* ---------- cierre del año: historial, promoción y año nuevo ---------- */
  async promover({ anioNuevo, repiten, calendario }){
    const de = Inst.anio(), nuevo = String(anioNuevo||'').trim(); const rep = new Set(repiten || []);
    if (!nuevo || nuevo === de) throw new Error('Escribe el nuevo año lectivo.');
    if (Cloud.on){
      const resumen = {}; Users.all().forEach(u => { if (u.uid) resumen[u.uid] = this.resumenDe(u.codigo, u.year); });
      const r = await Cloud.rpc('promover_anio', { p_anio_nuevo:nuevo, p_repiten:[...rep].map(c => (Users.get(c)||{}).uid).filter(Boolean), p_resumen:resumen, p_calendario:calendario });
      await Cloud.pull(); return Object.assign({ de, a:nuevo }, r || {});
    }
    const H = Store.s.historial = Store.s.historial || {}, HA = H[de] = H[de] || {}; const E = Store.s.egresados = Store.s.egresados || {};
    const r = { promovidos:0, repiten:0, egresados:0 };
    Users.all().forEach(u => { if (u.estado && u.estado !== 'activo') return;
      const resultado = rep.has(u.codigo) ? 'repite' : +u.year === 3 ? 'egresado' : 'promovido';
      r[resultado === 'repite' ? 'repiten' : resultado === 'egresado' ? 'egresados' : 'promovidos']++;
      const notas = {}; Object.entries(this.notasDe(u.codigo)).forEach(([k, v]) => { if (v != null) notas[k] = v; });
      HA[u.codigo] = { anio:de, codigo:u.codigo, nombre:u.nombre, nivel:+u.year, paralelo:u.paralelo, prog:BIO.progOf(u.year), resultado, resumen:this.resumenDe(u.codigo, u.year), notas, creado:Date.now() };
      u.notas = {};
      if (resultado === 'egresado'){ u.estado = 'egresado'; E[u.codigo] = u; delete Store.s.usuarios[u.codigo]; }
      else if (resultado === 'promovido') u.year = this.siguienteNivel(u.year);
      const D = Store.s.docente; ['notas','fechas','intentos'].forEach(k => { if (D[k]) delete D[k][u.codigo]; }); });
    Store.s.tareas = []; Store.s.comunicados = [];
    Admin.cursos().forEach(c => { c.anio = nuevo; });
    Admin.s.anio = nuevo; Store.save();
    await Inst.guardar('calendario', calendario);
    Auditoria.local('promover_anio', Object.assign({ de, a:nuevo }, r));
    return Object.assign({ de, a:nuevo }, r);
  },
  /* historial de años anteriores → [{ anio, codigo, nombre, nivel, paralelo, resultado, resumen }] */
  async historial(){
    if (Cloud.on){ const rows = await Cloud.historial();
      return rows.map(x => { const u = (Cloud.porUid||{})[x.estudiante_id] || {}; const res = Cloud.jsonDe(x.resumen) || {};
        return { anio:x.anio, codigo:u.codigo || '—', nombre:u.nombre || '(cuenta eliminada)', nivel:x.nivel, paralelo:x.paralelo, prog:x.prog, resultado:x.resultado, resumen:res }; }); }
    const out = []; Object.entries(Store.s.historial || {}).forEach(([anio, M]) => Object.values(M).forEach(x => out.push(Object.assign({ anio }, x))));
    return out;
  }
};

/* =====================================================================
   XLSX mínimo (Office Open XML) sin librerías: ZIP sin compresión con
   CRC-32, una hoja por curso, estilos básicos, anchos y fila fija.
   ===================================================================== */
const Xlsx = (() => {
  const T = new Uint32Array(256);
  for (let n = 0; n < 256; n++){ let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; T[n] = c >>> 0; }
  const crc32 = u8 => { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = T[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  const enc = new TextEncoder();
  function zip(files){
    const partes = [], central = []; let off = 0;
    const d = new Date(), hora = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), dia = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    files.forEach(f => {
      const nom = enc.encode(f.name), data = typeof f.data === 'string' ? enc.encode(f.data) : f.data, crc = crc32(data);
      const L = new DataView(new ArrayBuffer(30));
      L.setUint32(0, 0x04034b50, true); L.setUint16(4, 20, true); L.setUint16(6, 0x0800, true); L.setUint16(8, 0, true);
      L.setUint16(10, hora, true); L.setUint16(12, dia, true); L.setUint32(14, crc, true); L.setUint32(18, data.length, true); L.setUint32(22, data.length, true);
      L.setUint16(26, nom.length, true); L.setUint16(28, 0, true);
      partes.push(new Uint8Array(L.buffer), nom, data);
      const C = new DataView(new ArrayBuffer(46));
      C.setUint32(0, 0x02014b50, true); C.setUint16(4, 20, true); C.setUint16(6, 20, true); C.setUint16(8, 0x0800, true); C.setUint16(10, 0, true);
      C.setUint16(12, hora, true); C.setUint16(14, dia, true); C.setUint32(16, crc, true); C.setUint32(20, data.length, true); C.setUint32(24, data.length, true);
      C.setUint16(28, nom.length, true); C.setUint32(42, off, true);
      central.push(new Uint8Array(C.buffer), nom);
      off += 30 + nom.length + data.length;
    });
    const tam = central.reduce((a, b) => a + b.length, 0);
    const E = new DataView(new ArrayBuffer(22)); E.setUint32(0, 0x06054b50, true); E.setUint16(8, files.length, true); E.setUint16(10, files.length, true); E.setUint32(12, tam, true); E.setUint32(16, off, true);
    const todo = [...partes, ...central, new Uint8Array(E.buffer)]; const out = new Uint8Array(todo.reduce((a, b) => a + b.length, 0)); let p = 0; todo.forEach(b => { out.set(b, p); p += b.length; });
    return out;
  }
  const x = s => String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const col = i => { let s = ''; i++; while (i > 0){ const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };
  /* estilos: 0 normal · 1 encabezado · 2 número 0,00 · 3 título · 4 número 0,00 en negrita · 5 negrita · 6 nota pequeña · 7 texto con borde · 8 sigla centrada en negrita */
  const S = { normal:0, enc:1, num:2, titulo:3, numB:4, b:5, peq:6, txt:7, sigla:8 };
  const STYLES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
    + '<numFmts count="1"><numFmt numFmtId="164" formatCode="0.00"/></numFmts>'
    + '<fonts count="4"><font><sz val="11"/><name val="Calibri"/><family val="2"/></font><font><b/><sz val="11"/><name val="Calibri"/><family val="2"/></font><font><b/><sz val="14"/><name val="Calibri"/><family val="2"/></font><font><i/><sz val="9"/><color rgb="FF595959"/><name val="Calibri"/><family val="2"/></font></fonts>'
    + '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFDCE9F5"/><bgColor indexed="64"/></patternFill></fill></fills>'
    + '<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFBFBFBF"/></left><right style="thin"><color rgb="FFBFBFBF"/></right><top style="thin"><color rgb="FFBFBFBF"/></top><bottom style="thin"><color rgb="FFBFBFBF"/></bottom><diagonal/></border></borders>'
    + '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
    + '<cellXfs count="9">'
    + '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
    + '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>'
    + '<xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center"/></xf>'
    + '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>'
    + '<xf numFmtId="164" fontId="1" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center"/></xf>'
    + '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>'
    + '<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1"/>'
    + '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/>'
    + '<xf numFmtId="0" fontId="1" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center"/></xf>'
    + '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
  /* celda: null | texto | número | { v, s } */
  function celda(v, ref){
    if (v == null || v === '') return '';
    const o = (typeof v === 'object') ? v : { v };
    if (o.v == null || o.v === '') return o.s ? `<c r="${ref}" s="${o.s}"/>` : '';
    const s = o.s != null ? ` s="${o.s}"` : '';
    if (typeof o.v === 'number' && isFinite(o.v)) return `<c r="${ref}"${s}><v>${o.v}</v></c>`;
    return `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${x(o.v)}</t></is></c>`;
  }
  /* hoja: { nombre, filas:[[celda]], anchos:[n], fijar:{ filas, columnas }, alto:{ fila:pt }, unir:['A1:F1'] } */
  function hojaXML(hj){
    const fr = (hj.fijar||{}).filas || 0, fc = (hj.fijar||{}).columnas || 0;
    let vista = '<sheetViews><sheetView workbookViewId="0">';
    if (fr || fc){ const pane = fr && fc ? 'bottomRight' : fr ? 'bottomLeft' : 'topRight';
      vista += `<pane${fc ? ` xSplit="${fc}"` : ''}${fr ? ` ySplit="${fr}"` : ''} topLeftCell="${col(fc)}${fr + 1}" activePane="${pane}" state="frozen"/><selection pane="${pane}" activeCell="${col(fc)}${fr + 1}" sqref="${col(fc)}${fr + 1}"/>`; }
    vista += '</sheetView></sheetViews>';
    const cols = (hj.anchos||[]).length ? '<cols>' + hj.anchos.map((w, i) => `<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join('') + '</cols>' : '';
    const filas = hj.filas.map((f, i) => { const r = i + 1, alto = (hj.alto||{})[r];
      const cs = (f||[]).map((v, j) => celda(v, col(j) + r)).join('');
      return `<row r="${r}"${alto ? ` ht="${alto}" customHeight="1"` : ''}>${cs}</row>`; }).join('');
    const unir = (hj.unir||[]).length ? `<mergeCells count="${hj.unir.length}">` + hj.unir.map(u => `<mergeCell ref="${u}"/>`).join('') + '</mergeCells>' : '';
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
      + '<sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>' + vista + '<sheetFormatPr defaultRowHeight="15"/>' + cols + `<sheetData>${filas}</sheetData>` + unir
      + '<pageMargins left="0.4" right="0.4" top="0.6" bottom="0.6" header="0.3" footer="0.3"/><pageSetup orientation="landscape" fitToWidth="1" fitToHeight="0"/></worksheet>';
  }
  function nombreHoja(n, usados){ let b = String(n).replace(/[\[\]:*?\/\\]/g, ' ').replace(/^'+|'+$/g, '').trim().slice(0, 31) || 'Hoja'; let s = b, k = 2;
    while (usados.has(s.toLowerCase())){ const suf = ` (${k++})`; s = b.slice(0, 31 - suf.length) + suf; } usados.add(s.toLowerCase()); return s; }
  function libro(hojas, titulo='Libreta'){
    const usados = new Set(); const nombres = hojas.map(hj => nombreHoja(hj.nombre, usados));
    const files = [];
    files.push({ name:'[Content_Types].xml', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
      + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'
      + '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
      + hojas.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')
      + '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
      + '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
      + '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>' });
    files.push({ name:'_rels/.rels', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
      + '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
      + '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
      + '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>' });
    const ahora = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    files.push({ name:'docProps/core.xml', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
      + `<dc:title>${x(titulo)}</dc:title><dc:creator>ANAI BioLab</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${ahora}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${ahora}</dcterms:modified></cp:coreProperties>` });
    files.push({ name:'docProps/app.xml', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>ANAI BioLab</Application></Properties>' });
    files.push({ name:'xl/workbook.xml', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
      + '<bookViews><workbookView/></bookViews><sheets>' + nombres.map((n, i) => `<sheet name="${x(n)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('') + '</sheets></workbook>' });
    files.push({ name:'xl/_rels/workbook.xml.rels', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
      + hojas.map((_, i) => `<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')
      + `<Relationship Id="rId${hojas.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` });
    files.push({ name:'xl/styles.xml', data:STYLES });
    hojas.forEach((hj, i) => files.push({ name:`xl/worksheets/sheet${i+1}.xml`, data:hojaXML(hj) }));
    return zip(files);
  }
  return { S, col, zip, crc32, libro, nombreHoja,
    descargar(nombre, hojas, titulo){ const bytes = libro(hojas, titulo);
      const blob = new Blob([bytes], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const a = h('a', { href:URL.createObjectURL(blob), download:nombre }); document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000); return bytes; } };
})();

/* =====================================================================
   LIBRETA DE CALIFICACIONES (una hoja por curso; detalle opcional)
   ===================================================================== */
const Libreta = {
  nombreEst(u){ return (u.apellidos && u.nombres) ? `${u.apellidos} ${u.nombres}` : String(u.nombre || '').replace(/ \(en vivo\)$/, ''); },
  /* filas de un curso a partir de los usuarios cargados (administración) */
  filasCurso(nivel, par){ return Users.ofCourse(+nivel, par).map(u => ({ codigo:u.codigo, nombre:this.nombreEst(u), notas:Periodos.notasDe(u.codigo), fechas:Periodos.fechasDe(u.codigo) })); },
  /* filas a partir del listado del panel docente */
  filasRoster(r){ return r.map(e => { const u = (Store.s.usuarios||{})[e.id]; return { codigo:e.id, nombre:u ? this.nombreEst(u) : String(e.nombre).replace(/ \(en vivo\)$/, ''), notas:e.notas || {}, fechas:Periodos.fechasDe(e.id) }; }); },
  cursoTxt(c){ return `${BIO.nivel(c.nivel).corto} "${c.paralelo}"`; },
  docenteDe(c){ const d = c && c.docenteId && (Store.s.docentes||{})[c.docenteId]; return d ? d.nombre : (Store.ses.rol === 'docente' ? (Store.s.user||{}).nombre || 'Sin asignar' : 'Sin asignar'); },
  ponderacionTxt(){ const P = Inst.ponderacion(); return P.modo === 'categoria' ? 'por categorías (' + Object.keys(CATEGORIAS).map(k => `${CATEGORIAS[k].c} ${P.categorias[k]||0} %`).join(', ') + ')' : 'por el peso de cada actividad'; },
  hojas(c, filas, detalle){
    const S = Xlsx.S, items = Periodos.itemsDe(c.nivel), Q = Periodos.lista(), cats = Object.keys(CATEGORIAS);
    const orden = filas.slice().sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    const res = orden.map(f => Periodos.resumen(f.codigo, items, f.notas, f.fechas));
    const enc = ['Nº', 'Código', 'Apellidos y nombres'];
    Q.forEach(q => { cats.forEach(k => enc.push(`${q.id} · ${CATEGORIAS[k].c}`)); enc.push(`Promedio ${q.id}`); });
    enc.push('Promedio anual', 'Escala', 'Descripción de la escala');
    const ultima = Xlsx.col(enc.length - 1);
    const asig = (BIO.programas[c.prog || BIO.progOf(c.nivel)] || {}).n || '';
    const estadoQ = Q.map(q => `${q.n}: ${Periodos.rango(q)}${q.cerrado ? ' · cerrado' + (q.cerradoEn ? ' el ' + fechaCorta(Date.parse(q.cerradoEn)) : '') : ' · abierto'}`).join('   |   ');
    const F = [
      [{ v:`Libreta de calificaciones · ${BIO.school.institucion}`, s:S.titulo }],
      [{ v:`Año lectivo: ${Inst.anio()}`, s:S.b }],
      [{ v:`Curso: ${BIO.nivel(c.nivel).n} "${c.paralelo}"`, s:S.b }],
      [{ v:`Asignatura: ${asig}`, s:S.b }],
      [{ v:`Docente: ${this.docenteDe(c)}`, s:S.b }],
      [{ v:`Generado el ${new Date().toLocaleString('es-EC', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })} · Promedio ${this.ponderacionTxt()} · Escala sobre 10`, s:S.peq }],
      [{ v:estadoQ, s:S.peq }],
      enc.map(t => ({ v:t, s:S.enc }))
    ];
    const n0 = F.length;
    orden.forEach((f, i) => { const R = res[i]; const fila = [{ v:i+1, s:S.txt }, { v:String(f.codigo), s:S.txt }, { v:f.nombre, s:S.txt }];
      Q.forEach(q => { cats.forEach(k => fila.push({ v:(R.porCategoria[q.id]||{})[k] ?? null, s:S.num })); fila.push({ v:R[q.id], s:S.numB }); });
      fila.push({ v:R.anual, s:S.numB }, { v:R.cualitativa ? R.cualitativa.k : '', s:S.sigla }, { v:R.cualitativa ? R.cualitativa.n : 'Sin notas', s:S.txt });
      F.push(fila); });
    if (!orden.length) F.push([null, null, { v:'Este curso no tiene estudiantes cargados.', s:S.peq }]);
    /* promedio del curso */
    const prom = arr => { const v = arr.filter(x => x != null); return v.length ? r2(v.reduce((a, b) => a + b, 0) / v.length) : null; };
    const pie = [null, null, { v:'Promedio del curso', s:S.b }];
    Q.forEach(q => { cats.forEach(k => pie.push({ v:prom(res.map(R => (R.porCategoria[q.id]||{})[k])), s:S.num })); pie.push({ v:prom(res.map(R => R[q.id])), s:S.numB }); });
    const pa = prom(res.map(R => R.anual)); const pc = Periodos.cualitativa(pa);
    pie.push({ v:pa, s:S.numB }, { v:pc ? pc.k : '', s:S.sigla }, { v:pc ? pc.n : '', s:S.txt });
    F.push([], pie, [], [{ v:'Escala cualitativa (Reglamento General a la LOEI)', s:S.b }]);
    const f2 = n => n.toFixed(2).replace('.', ',');
    ESCALA.forEach((e, i) => { const hasta = i === 0 ? '10,00' : f2(ESCALA[i-1].min - 0.01); F.push([null, { v:e.k, s:S.sigla }, { v:`${e.n} (${f2(e.min)} a ${hasta})`, s:S.normal }]); });
    F.push([], [{ v:'Promedio anual = promedio de los dos quimestres. Las celdas vacías indican que no hay notas en ese periodo.', s:S.peq }]);
    const anchos = [5, 11, 34, ...Q.flatMap(() => [...cats.map(() => 12), 11]), 11, 8, 44];
    const unir = [1,2,3,4,5,6,7].map(r => `A${r}:${ultima}${r}`);
    const hojas = [{ nombre:`${BIO.nivel(c.nivel).corto} ${c.paralelo}`, filas:F, anchos, fijar:{ filas:n0, columnas:3 }, alto:{ [n0]:42 }, unir }];
    if (detalle){
      const cols = []; Q.forEach(q => items.forEach(it => { if (orden.some(f => Periodos.notasPeriodo(f.codigo, f.notas, f.fechas, q.id)[it.id] != null)) cols.push({ q, it }); }));
      const D = [
        [{ v:`Detalle por actividad · ${BIO.nivel(c.nivel).n} "${c.paralelo}" · ${asig} · ${Inst.anio()}`, s:S.titulo }],
        [{ v:'Nota de cada actividad (sobre 10) en el quimestre en que se registró. Solo se muestran las actividades con al menos una nota.', s:S.peq }],
        ['Nº', 'Código', 'Apellidos y nombres', ...cols.map(x => `${x.q.id} · ${x.it.t} (peso ${x.it.peso})`)].map(t => ({ v:t, s:S.enc }))
      ];
      const notasQ = orden.map(f => { const o = {}; Q.forEach(q => o[q.id] = Periodos.notasPeriodo(f.codigo, f.notas, f.fechas, q.id)); return o; });
      orden.forEach((f, i) => D.push([{ v:i+1, s:S.txt }, { v:String(f.codigo), s:S.txt }, { v:f.nombre, s:S.txt }, ...cols.map(x => ({ v:notasQ[i][x.q.id][x.it.id] ?? null, s:S.num }))]));
      if (!cols.length) D.push([null, null, { v:'Todavía no hay notas registradas en este año lectivo.', s:S.peq }]);
      hojas.push({ nombre:`${BIO.nivel(c.nivel).corto} ${c.paralelo} · detalle`, filas:D, anchos:[5, 11, 34, ...cols.map(() => 16)], fijar:{ filas:3, columnas:3 }, alto:{ 3:78 }, unir:[`A1:${Xlsx.col(Math.max(5, cols.length + 2))}1`, `A2:${Xlsx.col(Math.max(5, cols.length + 2))}2`] });
    }
    return hojas;
  },
  /* grupos: [{ curso:{nivel, paralelo, prog, docenteId}, filas }] */
  descargar(grupos, { detalle=false, nombre } = {}){
    const hojas = grupos.flatMap(g => this.hojas(g.curso, g.filas, detalle));
    if (!hojas.length){ toast('No hay cursos para exportar.'); return null; }
    const anio = Inst.anio().replace(/[^\w-]/g, '');
    const archivo = nombre || (grupos.length === 1 ? `libreta-${anio}-${BIO.nivel(grupos[0].curso.nivel).corto.replace(/\W/g, '')}-${grupos[0].curso.paralelo}.xlsx` : `libreta-${anio}-todos-los-cursos.xlsx`);
    const bytes = Xlsx.descargar(archivo, hojas, `Libreta ${Inst.anio()}`);
    Auditoria.registrar('exportar_libreta', { anio:Inst.anio(), cursos:grupos.map(g => this.cursoTxt(g.curso)), estudiantes:grupos.reduce((a, g) => a + g.filas.length, 0), detalle:!!detalle, formato:'xlsx' });
    toast('Libreta descargada: ' + archivo);
    return bytes;
  }
};

/* =====================================================================
   ADMINISTRACIÓN → pestaña "Año lectivo"
   ===================================================================== */
let anioAsist = null;   /* estado del asistente de cierre del año (sobrevive a los repintados) */
const anioOrden = n => [8, 9, 10, 1, 2, 3].indexOf(+n);
function anioSeccion(id, titulo, ...kids){ return h('section',{class:'card stack anio-sec',id:'anio-'+id,'aria-labelledby':'anio-h-'+id,style:'margin-top:16px'}, h('h2',{id:'anio-h-'+id}, titulo), ...kids); }

function anioTab(body, rerender){
  const av = avisoV18(); if (av) body.append(av);
  const cal = Inst.calendario(), Q = cal.quimestres;
  body.append(h('div',{class:'page-head',style:'margin:0'}, h('div',{},
    h('span',{class:'eyebrow'},'Año lectivo ' + Inst.anio()),
    h('p',{class:'small muted',style:'margin:4px 0 0'},'Calendario por quimestres, cierre de notas, forma de calcular el promedio, libreta en Excel y paso al año siguiente.'))));
  body.append(h('nav',{class:'anio-nav','aria-label':'Secciones del año lectivo'},
    ...[['cal','Calendario'],['est','Estado de quimestres'],['pond','Ponderación'],['lib','Libreta Excel'],['fin','Cierre del año'],['hist','Historial']].map(([id, t]) =>
      h('button',{class:'chip',onclick:()=>{ const s = document.getElementById('anio-'+id); if (s){ s.scrollIntoView({ behavior:(Store.s.a11y||{}).motion ? 'auto' : 'smooth' }); const t = s.querySelector('h2'); t && t.setAttribute('tabindex','-1'); t && t.focus({ preventScroll:true }); } }}, t))));
  anioCalendario(body, rerender, cal);
  anioEstado(body, rerender, Q);
  anioPonderacion(body, rerender);
  anioLibreta(body);
  anioCierre(body, rerender);
  anioHistorial(body);
}

/* ---------- a. Año lectivo y calendario ---------- */
function anioCalendario(body, rerender, cal){
  const nom = h('input',{type:'text',value:Inst.anio(),'aria-label':'Nombre del año lectivo',placeholder:'2026-2027'});
  const ins = cal.quimestres.map(q => ({ q, ini:h('input',{type:'date',value:q.inicio,disabled:q.cerrado,'aria-label':`Inicio del ${q.n.toLowerCase()}`}), fin:h('input',{type:'date',value:q.fin,disabled:q.cerrado,'aria-label':`Fin del ${q.n.toLowerCase()}`}) }));
  const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
  const guardar = h('button',{class:'btn sm primary'},'Guardar calendario');
  guardar.onclick = async () => {
    msg.textContent = '';
    const anio = nom.value.trim().replace('–','-');
    if (!/^\d{4}\s*-\s*\d{4}$/.test(anio)) { msg.textContent = 'Escribe el año lectivo como 2026-2027.'; nom.focus(); return; }
    const qs = ins.map(({ q, ini, fin }) => Object.assign({}, q, { inicio:ini.value, fin:fin.value }));
    const err = Periodos.validar(qs); if (err){ msg.textContent = err; return; }
    guardar.disabled = true;
    try {
      if (anio !== Inst.anio()){ Admin.s.anio = anio; Store.save(); if (Cloud.on) await Cloud.guardarAnio(anio); Auditoria.local('cambiar_anio_lectivo', { anio }); }
      await Inst.guardar('calendario', { anio, quimestres:qs });
      toast('Calendario guardado.'); rerender();
    } catch(e){ msg.textContent = 'No se guardó en el servidor: ' + e.message; guardar.disabled = false; }
  };
  body.append(anioSeccion('cal', 'Año lectivo y calendario',
    h('p',{class:'small muted'},'Cada nota cuenta en el quimestre en cuyas fechas se registró. Las fechas de un quimestre cerrado no se pueden cambiar: reábrelo primero.'),
    h('div',{class:'anio-f'},
      h('label',{},'Año lectivo', nom),
      ...ins.flatMap(({ q, ini, fin }) => [h('label',{}, `${q.n} · inicio`, ini), h('label',{}, `${q.n} · fin`, fin)])),
    msg,
    h('div',{class:'row'}, guardar, h('span',{class:'small muted'}, Cloud.on ? 'Se guarda en el servidor para toda la institución.' : 'Modo local: se guarda en este navegador.'))));
}

/* ---------- b. Estado de cada quimestre ---------- */
function anioEstado(body, rerender, Q){
  const hoy = Periodos.actual();
  const tarjetas = Q.map(q => {
    const n = Periodos.contar(q.id);
    const estado = q.cerrado ? h('span',{class:'pill bad'},'🔒 Cerrado') : h('span',{class:'pill ok'}, q.id === hoy ? 'Abierto · en curso' : 'Abierto');
    const acciones = q.cerrado
      ? h('button',{class:'btn sm',onclick:()=>confirmar({ titulo:`¿Reabrir el ${q.n.toLowerCase()}?`, boton:'Reabrir quimestre',
          texto:`Los docentes podrán volver a registrar y cambiar las notas de este quimestre. Las notas que quedaron fijas se descartan y se vuelven a leer las que estén registradas hoy.`,
          accion:async()=>{ await Periodos.reabrir(q.id); toast(`${q.n} reabierto.`); rerender(); } })},'Reabrir')
      : Periodos.dia(Date.now()) < q.inicio ? h('span',{class:'small muted'}, `Se podrá cerrar desde que empiece (${Periodos.fechaTxt(q.inicio)}).`)
      : h('button',{class:'btn sm primary',onclick:()=>confirmar({ titulo:`¿Cerrar el ${q.n.toLowerCase()}?`, boton:'Cerrar quimestre', peligro:true, escribir:'CERRAR',
          texto:`Se fijarán las notas registradas entre el ${Periodos.fechaTxt(q.inicio)} y el ${Periodos.fechaTxt(q.fin)} (${n} ${n === 1 ? 'nota' : 'notas'} ahora mismo). Desde ese momento ningún docente podrá cambiarlas; la libreta y los reportes usarán esas notas. Si hace falta corregir algo, la administración puede reabrirlo.`,
          accion:async()=>{ const k = await Periodos.cerrar(q.id); toast(`${q.n} cerrado: ${k} ${k === 1 ? 'nota quedó fija' : 'notas quedaron fijas'}.`); rerender(); } })},'Cerrar quimestre');
    return h('div',{class:'card stack'},
      h('div',{class:'anio-est'}, h('b',{}, q.n), estado),
      h('dl',{class:'kv'}, h('dt',{},'Fechas'), h('dd',{}, Periodos.rango(q)),
        h('dt',{},'Notas'), h('dd',{}, `${n} ${n === 1 ? 'nota registrada' : 'notas registradas'}${q.cerrado ? ' (fijas)' : ''}`),
        q.cerrado ? h('dt',{},'Cerrado') : null, q.cerrado ? h('dd',{}, q.cerradoEn ? fechaHora(Date.parse(q.cerradoEn)) : 'sí') : null),
      h('div',{class:'row'}, acciones));
  });
  body.append(anioSeccion('est', 'Estado de cada quimestre',
    h('div',{class:'notice info'}, h('span',{}, h('b',{},'¿Qué significa cerrar un quimestre? '),
      'Las notas de ese quimestre quedan fijas, como en una libreta firmada: el docente ya no puede cambiarlas y la libreta, los reportes y el historial usan esas notas. Ciérralo cuando termine el quimestre y los docentes hayan revisado sus libros. Si hubo un error, puedes reabrirlo.')),
    h('div',{class:'anio-q'}, ...tarjetas)));
}

/* ---------- c. Ponderación ---------- */
function anioPonderacion(body, rerender){
  const P = JSON.parse(JSON.stringify(Inst.ponderacion())); let modo = P.modo === 'categoria' ? 'categoria' : 'actividad';
  const radio = (v, t, d) => h('label',{class:'anio-radio'}, h('input',{type:'radio',name:'anio-modo',value:v,checked:modo === v,onchange:()=>{ modo = v; pintar(); }}), h('span',{}, h('b',{}, t), h('br'), h('span',{class:'small muted'}, d)));
  const pcts = {}; Object.keys(CATEGORIAS).forEach(k => pcts[k] = h('input',{type:'number',min:'0',max:'100',step:'1',value:String(P.categorias[k] ?? 0),class:'anio-in','aria-label':`Porcentaje de ${CATEGORIAS[k].n}`,oninput:()=>pintar()}));
  const suma = h('span',{class:'anio-suma'}), ej = h('div',{class:'anio-ej','aria-live':'polite'}), boxCat = h('div',{class:'stack'});
  const guardar = h('button',{class:'btn sm primary'},'Guardar ponderación');
  const EJ = { exploracion:9, laboratorios:7.5, misiones:8, evaluaciones:6 };
  function pintar(){
    const tot = Object.values(pcts).reduce((a, i) => a + (+i.value || 0), 0);
    boxCat.style.display = modo === 'categoria' ? '' : 'none';
    suma.textContent = `Suma: ${tot} %`; suma.classList.toggle('bad', tot !== 100);
    guardar.disabled = modo === 'categoria' && tot !== 100;
    ej.innerHTML = '';
    if (modo === 'actividad'){
      ej.append(h('div',{}, 'Ejemplo: Modelo 3D (peso 1) = 9,0 · Laboratorio (peso 2) = 7,5 · Evaluación (peso 3) = 6,0'),
        h('div',{}, '(9,0 × 1 + 7,5 × 2 + 6,0 × 3) ÷ (1 + 2 + 3) = 42,0 ÷ 6 = ', h('b',{},'7,00')),
        h('div',{class:'small muted'}, 'Las actividades sin entregar no promedian.'));
    } else {
      const ks = Object.keys(CATEGORIAS); const s = ks.reduce((a, k) => a + EJ[k] * (+pcts[k].value || 0), 0);
      ej.append(h('div',{}, 'Ejemplo de promedios por categoría: ' + ks.map(k => `${CATEGORIAS[k].c} ${Periodos.num(EJ[k], 1)}`).join(' · ')),
        h('div',{}, '(' + ks.map(k => `${Periodos.num(EJ[k], 1)} × ${+pcts[k].value || 0} %`).join(' + ') + ') = ', h('b',{}, tot ? Periodos.num(s / tot) : '–')),
        h('div',{class:'small muted'}, 'Dentro de cada categoría las actividades se promedian por su peso. Si una categoría no tiene notas, las demás se reparten su porcentaje.'));
    }
  }
  guardar.onclick = async () => { guardar.disabled = true;
    const cats = {}; Object.keys(pcts).forEach(k => cats[k] = Math.max(0, Math.round(+pcts[k].value || 0)));
    try { await Inst.guardar('ponderacion', { modo, categorias:cats }); toast('Ponderación guardada. Los promedios se recalculan en todos los libros.'); rerender(); }
    catch(e){ toast('No se guardó en el servidor: ' + e.message); guardar.disabled = false; } };
  boxCat.append(h('div',{class:'anio-pct'}, ...Object.keys(CATEGORIAS).map(k => h('label',{}, h('span',{}, CATEGORIAS[k].n, ' (%)'), pcts[k], h('small',{}, CATEGORIAS[k].d)))), h('div',{}, suma, h('span',{class:'small muted'},' · deben sumar 100 %')));
  body.append(anioSeccion('pond', 'Ponderación del promedio',
    h('p',{class:'small muted'},'Define cómo se calcula el promedio de cada quimestre en todos los libros de calificaciones, reportes y en la libreta.'),
    h('div',{class:'stack',role:'radiogroup','aria-label':'Forma de calcular el promedio'},
      radio('actividad','Por el peso de cada actividad','Cada actividad pesa lo que indica su peso (1, 2 o 3). Es la forma actual.'),
      radio('categoria','Por categorías','La institución fija un porcentaje para cada tipo de actividad.')),
    boxCat, ej, h('div',{class:'row'}, guardar)));
  pintar();
}

/* ---------- d. Libreta en Excel ---------- */
function anioLibreta(body){
  const cursos = Admin.cursos().slice().sort((a, b) => anioOrden(a.nivel) - anioOrden(b.nivel) || String(a.paralelo).localeCompare(b.paralelo));
  const sel = h('select',{'aria-label':'Curso para la libreta'}, h('option',{value:''},`Todos los cursos (${cursos.length})`),
    ...cursos.map(c => h('option',{value:c.id}, `${Libreta.cursoTxt(c)} · ${(BIO.programas[c.prog]||{}).n || c.prog}`)));
  const det = h('input',{type:'checkbox',id:'anio-det'});
  const btn = h('button',{class:'btn sm primary',disabled:!cursos.length,onclick:()=>{
    const lista = sel.value ? cursos.filter(c => c.id === sel.value) : cursos;
    Libreta.descargar(lista.map(c => ({ curso:c, filas:Libreta.filasCurso(c.nivel, c.paralelo) })), { detalle:det.checked }); }},'Descargar libreta (.xlsx)');
  body.append(anioSeccion('lib', 'Libreta de calificaciones en Excel',
    h('p',{class:'small muted'},'Archivo de Excel con una hoja por curso: promedios por categoría de cada quimestre, promedio de cada quimestre, promedio anual y escala cualitativa. Se abre en Excel, LibreOffice y Google Sheets.'),
    cursos.length ? h('div',{class:'anio-f'}, h('label',{},'Curso', sel)) : h('div',{class:'notice warn'},'Todavía no hay cursos creados.'),
    h('label',{class:'anio-radio',for:'anio-det'}, det, h('span',{}, 'Incluir una hoja de detalle por curso (nota de cada actividad y quimestre)')),
    h('div',{class:'row'}, btn, h('span',{class:'small muted'},'La descarga queda registrada en la auditoría.'))));
}

/* ---------- e. Cierre del año y promoción ---------- */
function anioGrupos(){
  const g = {};
  Users.all().filter(u => !u.estado || u.estado === 'activo').forEach(u => { const k = `${u.year}|${u.paralelo}`; (g[k] = g[k] || { nivel:+u.year, paralelo:u.paralelo, est:[] }).est.push(u); });
  return Object.values(g).sort((a, b) => anioOrden(a.nivel) - anioOrden(b.nivel) || String(a.paralelo).localeCompare(b.paralelo))
    .map(x => Object.assign(x, { est:x.est.sort((a, b) => Libreta.nombreEst(a).localeCompare(Libreta.nombreEst(b), 'es')).map(u => ({ u, R:Periodos.resumenDe(u.codigo, u.year) })) }));
}
function anioCierre(body, rerender){
  const box = anioSeccion('fin', 'Cierre del año lectivo y promoción');
  body.append(box);
  const A = anioAsist = anioAsist || { paso:1, repiten:new Set(), anio:'', cal:null, hecho:null };
  if (A.hecho){ const r = A.hecho;
    box.append(h('div',{class:'notice ok'}, h('span',{}, h('b',{},`Año ${r.de} cerrado. `), `Ahora trabajas en el año lectivo ${r.a}.`)),
      h('div',{class:'grid g3'}, ...[[r.promovidos,'promovidos al curso siguiente'],[r.repiten,'repiten el curso'],[r.egresados,'egresaron de 3.º BGU']].map(([v, l]) => h('div',{class:'card stat'}, h('span',{class:'v'}, String(v ?? 0)), h('span',{class:'l'}, l)))),
      h('ul',{class:'small'}, h('li',{},'El historial de cada estudiante (promedios de Q1, Q2 y anual) quedó guardado: lo ves abajo, en "Historial de años anteriores".'),
        h('li',{},'Los libros de calificaciones empiezan vacíos; las tareas y comunicados del año anterior se borraron.'),
        h('li',{},'Los estudiantes que egresaron ya no pueden entrar; su historial se conserva.')),
      h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Revisa ahora la asignación de docentes. '), 'Los estudiantes cambiaron de curso, pero cada docente sigue asignado a los mismos cursos. Revisa en la pestaña Cursos quién dicta cada curso este año y crea los cursos que falten.')),
      h('div',{class:'row'}, h('a',{class:'btn sm primary',href:'#/admin?t=cursos',onclick:()=>{ anioAsist = null; }},'Revisar cursos y docentes'), h('button',{class:'btn sm ghost',onclick:()=>{ anioAsist = null; rerender(); }},'Listo')));
    return; }
  const pasos = h('div',{class:'anio-pasos','aria-label':'Pasos del cierre del año'}, ...['1. Quién pasa y quién repite','2. Nuevo año y fechas','3. Confirmar'].map((t, i) => h('span',{class:(A.paso === i+1 ? 'on' : A.paso > i+1 ? 'ok' : ''),'aria-current':A.paso === i+1 ? 'step' : null}, (A.paso > i+1 ? '✓ ' : '') + t)));
  box.append(h('p',{class:'small muted'},'Al terminar el año: se guarda el historial de cada estudiante, se vacían los libros de calificaciones, los estudiantes pasan al curso siguiente (8.º → 9.º → 10.º → 1.º BGU → 2.º → 3.º), los de 3.º BGU egresan y los cursos pasan al año nuevo. Quienes repiten se quedan en su curso.'), pasos);
  const G = anioGrupos(); const abiertos = Periodos.lista().filter(q => !q.cerrado);
  const destino = (u) => A.repiten.has(u.codigo) ? `Repite ${BIO.nivel(u.year).corto}` : +u.year === 3 ? 'Egresa' : `Pasa a ${BIO.nivel(Periodos.siguienteNivel(u.year)).corto}`;
  if (A.paso === 1){
    if (abiertos.length) box.append(h('div',{class:'notice warn'}, h('span',{}, h('b',{}, abiertos.map(q => q.n).join(' y ') + (abiertos.length > 1 ? ' siguen abiertos. ' : ' sigue abierto. ')), 'Conviene cerrarlos antes (sección "Estado de cada quimestre"), para que las notas del historial queden fijas y revisadas.')));
    if (!G.length){ box.append(h('div',{class:'ph'},'No hay estudiantes activos. Carga los estudiantes antes de cerrar el año.')); return; }
    const sugeridos = G.flatMap(g => g.est.filter(x => x.R.anual != null && x.R.anual < 7).map(x => x.u.codigo));
    box.append(h('div',{class:'notice info'}, h('span',{}, 'Marca solo a quienes ', h('b',{},'repiten'), ' el curso. La plataforma sugiere a quienes tienen promedio anual bajo 7 (', String(sugeridos.length), '), pero no marca a nadie por ti: la decisión es de la junta de curso.')),
      sugeridos.length ? h('div',{class:'row'}, h('button',{class:'btn sm ghost',onclick:()=>{ sugeridos.forEach(c => A.repiten.add(c)); rerender(); setTimeout(()=>document.getElementById('anio-fin')?.scrollIntoView(),0); }},`Marcar los ${sugeridos.length} sugeridos`),
        A.repiten.size ? h('button',{class:'btn sm ghost',onclick:()=>{ A.repiten.clear(); rerender(); setTimeout(()=>document.getElementById('anio-fin')?.scrollIntoView(),0); }},'Quitar todas las marcas') : null) : null);
    G.forEach(g => {
      const sig = Periodos.siguienteNivel(g.nivel);
      const cuenta = h('span',{class:'small muted'});
      const pintaCuenta = () => { const r = g.est.filter(x => A.repiten.has(x.u.codigo)).length; cuenta.textContent = `${g.est.length} estudiantes${r ? ` · ${r} repite${r > 1 ? 'n' : ''}` : ''}`; };
      const tb = h('tbody',{}, g.est.map(({ u, R }) => { const dest = h('td',{class:'anio-opt'}, destino(u)), destM = h('div',{class:'small anio-mob'}, destino(u));
        const chk = h('input',{type:'checkbox',checked:A.repiten.has(u.codigo),'aria-label':`${u.nombre} repite ${BIO.nivel(u.year).corto}`,onchange:ev=>{ ev.target.checked ? A.repiten.add(u.codigo) : A.repiten.delete(u.codigo); dest.textContent = destM.textContent = destino(u); pintaCuenta(); }});
        return h('tr',{}, h('td',{}, h('b',{}, Libreta.nombreEst(u)), h('div',{class:'small muted mono'}, u.codigo), destM),
          h('td',{class:'num anio-opt'}, Periodos.num(R.Q1)), h('td',{class:'num anio-opt'}, Periodos.num(R.Q2)), h('td',{class:'num '+notaClass(R.anual)}, h('b',{}, Periodos.num(R.anual))),
          h('td',{class:'anio-opt'}, R.cualitativa ? h('span',{class:'anio-esc',title:R.cualitativa.n}, R.cualitativa.k) : h('span',{class:'small muted'},'Sin notas')),
          dest,
          h('td',{}, h('label',{class:'anio-rep'}, chk, 'Repite'), (R.anual != null && R.anual < 7) ? h('span',{class:'pill warn',style:'margin-left:6px',title:'Promedio anual bajo 7'},'Sugerido') : null)); }));
      pintaCuenta();
      box.append(h('div',{class:'anio-grupo'},
        h('h3',{}, `${BIO.nivel(g.nivel).corto} "${g.paralelo}"`, h('span',{'aria-hidden':'true'},'→'), sig ? `${BIO.nivel(sig).corto} "${g.paralelo}"` : h('span',{class:'pill'},'Egresan'), cuenta),
        h('div',{class:'tablewrap'}, h('table',{class:'data anio-tabla'}, h('thead',{}, h('tr',{}, ...[['Estudiante'],['Q1',1],['Q2',1],['Anual'],['Escala',1],['Resultado',1],['Repite']].map(([t, o]) => h('th',{scope:'col',class:o?'anio-opt':null}, t)))), tb))));
    });
    box.append(h('div',{class:'row'}, h('button',{class:'btn primary',onclick:()=>{ A.paso = 2; rerender(); setTimeout(()=>document.getElementById('anio-fin')?.scrollIntoView(),0); }},'Siguiente: nuevo año')));
    return;
  }
  if (A.paso === 2){
    const sugerido = Periodos.anioSiguiente(Inst.anio());
    if (!A.anio) A.anio = sugerido;
    if (!A.cal) A.cal = Periodos.calendarioSiguiente(A.anio).quimestres;
    const nom = h('input',{type:'text',value:A.anio,'aria-label':'Nombre del nuevo año lectivo'});
    const ins = A.cal.map(q => ({ q, ini:h('input',{type:'date',value:q.inicio,'aria-label':`Inicio del ${q.n.toLowerCase()} del nuevo año`}), fin:h('input',{type:'date',value:q.fin,'aria-label':`Fin del ${q.n.toLowerCase()} del nuevo año`}) }));
    const msg = h('div',{class:'small',role:'alert',style:'color:var(--bad)'});
    const leer = () => { A.anio = nom.value.trim().replace('–','-'); A.cal = ins.map(({ q, ini, fin }) => Object.assign({}, q, { inicio:ini.value, fin:fin.value, cerrado:false })); };
    box.append(h('p',{class:'small'}, `Año que se cierra: `, h('b',{}, Inst.anio()), `. Sugerimos ${sugerido} con las mismas fechas un año después; ajústalas al cronograma del Ministerio de Educación.`),
      h('div',{class:'anio-f'}, h('label',{},'Nuevo año lectivo', nom), ...ins.flatMap(({ q, ini, fin }) => [h('label',{}, `${q.n} · inicio`, ini), h('label',{}, `${q.n} · fin`, fin)])),
      msg,
      h('div',{class:'row'}, h('button',{class:'btn ghost',onclick:()=>{ leer(); A.paso = 1; rerender(); setTimeout(()=>document.getElementById('anio-fin')?.scrollIntoView(),0); }},'← Atrás'),
        h('button',{class:'btn primary',onclick:()=>{ leer();
          if (!/^\d{4}\s*-\s*\d{4}$/.test(A.anio)){ msg.textContent = 'Escribe el nuevo año como 2027-2028.'; nom.focus(); return; }
          if (A.anio === Inst.anio()){ msg.textContent = 'El nuevo año debe ser distinto del actual.'; nom.focus(); return; }
          const err = Periodos.validar(A.cal); if (err){ msg.textContent = err; return; }
          A.paso = 3; rerender(); setTimeout(()=>document.getElementById('anio-fin')?.scrollIntoView(),0); }},'Siguiente: revisar y confirmar')));
    return;
  }
  /* paso 3 */
  const todos = G.flatMap(g => g.est.map(x => x.u));
  const rep = todos.filter(u => A.repiten.has(u.codigo)), egr = todos.filter(u => +u.year === 3 && !A.repiten.has(u.codigo)), pro = todos.filter(u => +u.year !== 3 && !A.repiten.has(u.codigo));
  const faltan = [...new Set(pro.map(u => `${Periodos.siguienteNivel(u.year)}|${u.paralelo}`))].map(k => k.split('|')).filter(([n, p]) => !Admin.cursoDe(+n, p));
  box.append(h('div',{class:'grid g3'}, ...[[pro.length,'pasan al curso siguiente'],[rep.length,'repiten'],[egr.length,'egresan de 3.º BGU']].map(([v, l]) => h('div',{class:'card stat'}, h('span',{class:'v'}, String(v)), h('span',{class:'l'}, l)))),
    h('dl',{class:'kv',style:'margin-top:6px'}, h('dt',{},'Año que se cierra'), h('dd',{}, Inst.anio()), h('dt',{},'Año nuevo'), h('dd',{}, A.anio),
      ...A.cal.flatMap(q => [h('dt',{}, q.n), h('dd',{}, Periodos.rango(q))]),
      h('dt',{},'Repiten'), h('dd',{}, rep.length ? rep.map(u => `${u.nombre} (${BIO.nivel(u.year).corto} ${u.paralelo})`).join(', ') : 'nadie')),
    h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Esto no se puede deshacer. '), 'Se guardará el historial y luego se borrarán las notas de este año, las tareas y los comunicados; los estudiantes cambiarán de curso y los de 3.º BGU dejarán de tener acceso. Te sugerimos descargar antes la libreta de todos los cursos.')),
    faltan.length ? h('div',{class:'notice info'}, h('span',{}, 'Después tendrás que crear estos cursos para que un docente vea a sus estudiantes: ', h('b',{}, faltan.map(([n, p]) => `${BIO.nivel(n).corto} "${p}"`).join(', ')), '.')) : null,
    abiertos.length ? h('div',{class:'notice warn'}, h('span',{}, abiertos.map(q => q.n).join(' y ') + (abiertos.length > 1 ? ' siguen abiertos' : ' sigue abierto') + ': el historial usará las notas registradas hoy.')) : null,
    h('div',{class:'row'},
      h('button',{class:'btn ghost',onclick:()=>{ A.paso = 2; rerender(); setTimeout(()=>document.getElementById('anio-fin')?.scrollIntoView(),0); }},'← Atrás'),
      h('button',{class:'btn sm',onclick:()=>Libreta.descargar(Admin.cursos().map(c => ({ curso:c, filas:Libreta.filasCurso(c.nivel, c.paralelo) })), { detalle:true })},'Descargar libreta de todos los cursos'),
      h('button',{class:'btn danger',onclick:()=>confirmar({ titulo:`¿Cerrar el año ${Inst.anio()} y pasar a ${A.anio}?`, boton:'Cerrar el año y promover', peligro:true, escribir:'PROMOVER',
        texto:`${pro.length} estudiantes pasan al curso siguiente, ${rep.length} repiten y ${egr.length} egresan. Las notas del año se guardan en el historial y los libros quedan vacíos.`,
        accion:async()=>{ const r = await Periodos.promover({ anioNuevo:A.anio, repiten:[...A.repiten], calendario:{ anio:A.anio, quimestres:A.cal } });
          anioAsist = { hecho:r }; if (Periodos.vista !== 'anual') (Store.s.ui = Store.s.ui || {}).periodo = null; Store.save(); toast(`Año ${r.a} iniciado.`); rerender();
          setTimeout(()=>document.getElementById('anio-fin')?.scrollIntoView(),0); } })},'Cerrar el año lectivo')));
}

/* ---------- f. Historial de años anteriores ---------- */
function anioHistorial(body){
  const box = anioSeccion('hist', 'Historial de años anteriores', h('p',{class:'small muted'},'Resultado y promedio anual de cada estudiante en los años ya cerrados.'));
  const cont = h('div',{class:'stack'}, h('p',{class:'small muted'},'Cargando…')); box.append(cont); body.append(box);
  Periodos.historial().then(rows => {
    cont.innerHTML = '';
    if (!rows.length){ cont.append(h('div',{class:'ph'},'Todavía no hay años cerrados. El historial se guarda al cerrar el año lectivo.')); return; }
    const RES = { promovido:['ok','Promovido'], repite:['warn','Repite'], egresado:['','Egresado'] };
    const anios = [...new Set(rows.map(r => r.anio))].sort().reverse();
    cont.append(h('div',{class:'row'}, h('button',{class:'btn sm',onclick:()=>{
      const L = ['Año lectivo;Curso;Código;Estudiante;Resultado;Promedio Q1;Promedio Q2;Promedio anual;Escala'];
      rows.slice().sort((a, b) => String(b.anio).localeCompare(a.anio) || anioOrden(a.nivel) - anioOrden(b.nivel) || String(a.paralelo).localeCompare(b.paralelo) || String(a.nombre).localeCompare(b.nombre, 'es'))
        .forEach(r => { const R = r.resumen || {}; const esc = Periodos.cualitativa(R.anual);
          L.push([r.anio, `${BIO.nivel(r.nivel).corto} ${r.paralelo}`, r.codigo, r.nombre, (RES[r.resultado]||[,r.resultado])[1], Periodos.num(R.Q1), Periodos.num(R.Q2), Periodos.num(R.anual), esc ? esc.k : ''].map(v => String(v ?? '').replace(/–/, '').replace(/;/g, ',')).join(';')); });
      descargarTexto('historial-anios-anteriores.csv', L.join('\n'));
      Auditoria.registrar('exportar_historial', { anios, registros:rows.length }); }},'Descargar CSV'), h('span',{class:'small muted'}, `${rows.length} registros en ${anios.length} ${anios.length === 1 ? 'año' : 'años'}`)));
    anios.forEach((an, i) => {
      const deA = rows.filter(r => r.anio === an); const cursos = {};
      deA.forEach(r => { const k = `${r.nivel}|${r.paralelo}`; (cursos[k] = cursos[k] || []).push(r); });
      const det = h('details',{class:'anio-hist',open:i === 0}, h('summary',{}, `Año lectivo ${an} · ${deA.length} estudiantes`));
      Object.entries(cursos).sort(([a], [b]) => anioOrden(a.split('|')[0]) - anioOrden(b.split('|')[0]) || a.localeCompare(b)).forEach(([k, L]) => { const [n, p] = k.split('|');
        det.append(h('div',{class:'tablewrap',style:'margin-bottom:10px'}, h('table',{class:'data anio-tabla'},
          h('caption',{style:'text-align:left;font-weight:700;padding:6px 0'}, `${BIO.nivel(n).corto} "${p}"`),
          h('thead',{}, h('tr',{}, ...['Estudiante','Resultado','Q1','Q2','Anual','Escala'].map(t => h('th',{scope:'col'}, t)))),
          h('tbody',{}, L.sort((a, b) => String(a.nombre).localeCompare(b.nombre, 'es')).map(r => { const R = r.resumen || {}; const esc = Periodos.cualitativa(R.anual); const [cl, tx] = RES[r.resultado] || ['', r.resultado];
            return h('tr',{}, h('td',{}, h('b',{}, r.nombre), h('div',{class:'small muted mono'}, r.codigo)), h('td',{}, h('span',{class:'pill '+cl}, tx)),
              h('td',{class:'num'}, Periodos.num(R.Q1)), h('td',{class:'num'}, Periodos.num(R.Q2)), h('td',{class:'num'}, h('b',{}, Periodos.num(R.anual))),
              h('td',{}, esc ? h('span',{class:'anio-esc',title:esc.n}, esc.k) : '–')); }))))); });
      cont.append(det);
    });
  }).catch(e => { cont.innerHTML = ''; cont.append(h('div',{class:'notice warn'}, 'No se pudo leer el historial: ' + e.message)); });
}

ADM_TABS_EXTRA.push({ id:'anio', t:'Año lectivo', fn:anioTab, antes:'credenciales' });

</script>
