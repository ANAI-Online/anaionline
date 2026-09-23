<style>
/* =====================================================================
   CIENCIAS NATURALES · EGB SUPERIOR · estilos propios (prefijo cn-)
   Reutilizan las variables y el sistema visual de la plataforma.
   ===================================================================== */
.cn-hero{display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;padding:20px 22px;border-radius:var(--r-l);border:1px solid var(--line);background:linear-gradient(180deg,color-mix(in srgb,var(--eco-soft) 55%,var(--bg-2)),var(--bg-2));margin-bottom:16px}
.cn-hero .cn-em{font-size:2.1rem;line-height:1}
.cn-hero{position:relative;overflow:hidden}
.cn-orbe{flex:none;width:132px;height:132px;margin:-4px 0 -8px -4px}
.cn-orbe .o-rot{transform-origin:66px 66px;animation:cnOrb 38s linear infinite}
.cn-orbe .o-rot.r2{animation-duration:26s;animation-direction:reverse}
.cn-orbe .o-rot.r3{animation-duration:54s}
.cn-orbe .o-spin{transform-box:fill-box;transform-origin:center;animation:cnOrb 9s linear infinite reverse}
.cn-orbe .o-drift{animation:cnDrift 30s linear infinite}
@keyframes cnDrift{to{transform:translateX(60px)}}
.cn-orbe .o-glow{animation:cnPulse 4.5s ease-in-out infinite}
@keyframes cnOrb{to{transform:rotate(360deg)}}
@keyframes cnPulse{0%,100%{opacity:.55}50%{opacity:.9}}
@media (max-width:560px){.cn-orbe{width:96px;height:96px}}
.cn-hero h1{font-size:1.9rem;letter-spacing:-.02em}
.cn-hero p{font-size:.92rem;color:var(--ink-2);max-width:72ch}
.cn-grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-bottom:20px}
.cn-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:22px}
.cn-comp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(215px,1fr));gap:10px;margin-bottom:24px}
.cn-comp{display:flex;flex-direction:column;gap:4px;padding:13px 15px;border-radius:12px;border:1px solid var(--line);background:var(--bg-2)}
.cn-comp .c{font-family:var(--font-m);font-size:.68rem;color:var(--ink-3);letter-spacing:.04em}
.cn-comp b{font-size:.94rem}
.cn-comp span.d{font-size:.82rem;color:var(--ink-2);line-height:1.45}
.cn-prog{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:24px}
.cn-step{position:relative;padding:16px 16px 14px;border-radius:var(--r-l);border:1px solid var(--line);background:var(--bg-2)}
.cn-step .n{font-family:var(--font-m);font-size:.72rem;color:var(--ink-3)}
.cn-step b{display:block;font-family:var(--font-d);font-size:1.08rem;margin:3px 0 5px}
.cn-step p{font-size:.84rem;color:var(--ink-2);line-height:1.5}
.cn-step .tag{display:inline-block;margin-top:9px;font-size:.66rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--ink-3)}
.cn-step.on{border-color:var(--eco);box-shadow:0 0 0 3px var(--eco-soft)}
.cn-step.on .tag{color:var(--eco)}
.cn-destrezas{display:flex;flex-direction:column;gap:9px}
.cn-destreza{display:flex;flex-direction:column;gap:6px;padding:12px 14px;border-radius:10px;background:var(--bg-2);border:1px solid var(--line);border-left:5px solid var(--ink-3)}
.cn-destreza.imp{border-left-style:solid}
.cn-destreza.imp.eco{border-left-color:var(--eco)} .cn-destreza.imp.gen{border-left-color:var(--gen)}
.cn-destreza.des{border-left-color:var(--ink-3);border-left-style:dashed}
.cn-instr{white-space:normal;line-height:1.45;align-self:flex-start}
.cn-pct{font-family:var(--font-m);font-size:.74rem;color:var(--ink-3);flex:none;margin-left:12px;white-space:nowrap}
.cn-destreza .meta{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
.cn-destreza .cod{font-family:var(--font-m);font-size:.72rem;color:var(--ink-3)}
.cn-destreza p{font-size:.88rem;line-height:1.5}
.cn-fold{border:1px solid var(--line);border-radius:var(--r-l);background:var(--bg-2);padding:0 18px;margin-top:10px}
.cn-fold>summary{cursor:pointer;padding:15px 0;font-family:var(--font-d);font-weight:800;font-size:1.04rem;list-style:none;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.cn-fold>summary::-webkit-details-marker{display:none}
.cn-fold>summary::before{content:"\25B8";color:var(--ink-3);font-size:.9rem}
.cn-fold[open]>summary::before{content:"\25BE"}
.cn-fold .cn-body{padding:0 0 18px;display:flex;flex-direction:column;gap:16px}
.cn-block{display:flex;flex-direction:column;gap:7px}
.cn-block h4{font-size:.78rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--ink-3)}
.cn-block p,.cn-block li{font-size:.88rem;color:var(--ink-2);line-height:1.55}
.cn-block ul{padding-left:20px;display:flex;flex-direction:column;gap:5px}
.cn-traza{font-size:.74rem;color:var(--ink-3);font-family:var(--font-m);line-height:1.55}
.cn-itemrow{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);font-size:.87rem}
.cn-itemrow:last-child{border-bottom:none}
.cn-itemrow .t{flex:1}
@media(max-width:860px){.cn-grid2,.cn-grid3,.cn-prog{grid-template-columns:1fr}}
</style>
<script>
/* =====================================================================
   VISTAS DEL ESTUDIANTE · CIENCIAS NATURALES (EGB Superior)
   Rutas: #/cn, #/cn/dominio/:dom, #/cn/unidad/:id, #/cn/progreso,
          #/cn/proximos/:id
   Funciones globales: cnNivelActual, cnProgresoUnidad, cnProgresoGrado,
          cnSiguientePaso
   ===================================================================== */

/* ---------- Grado del estudiante ---------- */
function cnNivelActual(){
  const ses = (Store && Store.ses) || {};
  const n = +ses.nivel; if (n===8 || n===9 || n===10) return n;
  const y = +ses.year;  if (y===8 || y===9 || y===10) return y;
  return 8;
}
function cnNivelDeclarado(){
  const ses = (Store && Store.ses) || {};
  return [8,9,10].includes(+ses.nivel) || [8,9,10].includes(+ses.year);
}

/* ---------- Progreso ---------- */
const cnHecho = id => !!(Store.s.activities[id] && Store.s.activities[id].done);
function cnPct(items){
  if (!items || !items.length) return 0;
  const tot = items.reduce((a,i)=>a+(i.peso||1),0);
  const got = items.reduce((a,i)=>a+(cnHecho(i.id)?(i.peso||1):0),0);
  return Math.round(got/tot*100);
}
function cnProgresoUnidad(unidadId){ const u = BIO.cnUnidad(unidadId); if (!u) return 0;
  const vistos = new Set(), items = [];
  (u.recursos||[]).forEach(id => { const r = BIO.cnRecurso(id); if (r.act && !vistos.has(r.act)){ vistos.add(r.act); items.push({ id:r.act, peso:(BIO.cnGradeItems.find(i=>i.id===r.act)||{}).peso || 2 }); } });
  return cnPct(items); }
function cnProgresoGrado(grado){ return cnPct(BIO.cnItemsDe(grado)); }
function cnProgresoDominio(grado, dom){
  const us = BIO.cnUnidadesDe(grado, dom);
  const ids = us.map(u=>u.id);
  const items = BIO.cnGradeItems.filter(i=>ids.includes(i.unidad));
  return items.length ? cnPct(items) : 0;
}

/* ---------- Siguiente paso recomendado ---------- */
function cnSiguientePaso(){
  /* primero, la tarea pendiente que vence antes */
  if (typeof Tareas !== 'undefined'){ const t = Tareas.mias().find(x => !Store.s.activities[x.act]?.done);
    if (t){ const r = Tareas.recurso(t.act); return { em:r.em||'📌', t:'Tarea: '+r.t, d:`Entrega: ${tarFecha(t.vence)} · ${tarFaltan(t.vence)}.` + (t.nota ? ' '+t.nota : ''), href:r.href }; } }
  const g = cnNivelActual(), us = BIO.cnUnidadesDe(g);
  for (const u of us) for (const rid of (u.recursos||[])){
    const r = BIO.cnRecurso(rid);
    if (r.ok && r.act && !cnHecho(r.act))
      return { em:r.em||'🔬', t:r.t, d:r.reto || r.d || '', href:r.href };
  }
  for (const u of us) for (const rid of (u.recursos||[])){
    const r = BIO.cnRecurso(rid);
    if (r.ok) return { em:r.em||'🔬', t:'Vuelve a '+r.t, d:'Ya resolviste todos los retos disponibles de tu grado. Repetir un laboratorio con otros datos afina tu explicación.', href:r.href };
  }
  return { em:'🗺', t:'Abre tu primera unidad', d:'Empieza por el reto de la unidad y luego revisa lo que dice el currículo.', href:'#/cn/dominio/cvt' };
}

/* ---------- Ayudantes de presentación ---------- */
const cnDominio = id => BIO.cn.dominios.find(d=>d.id===id);
const CN_ETIQUETA = { actual:'Tu grado', repaso:'Repaso', proximo:'Más adelante' };
function cnEstadoUnidad(u){ const g = cnNivelActual(); return u.grado===g ? 'actual' : u.grado<g ? 'repaso' : 'proximo'; }
function cnRecursosDe(u){ return (u.recursos||[]).map(BIO.cnRecurso).filter(r=>r.t); }
function cnHrefRecurso(r){ return r.ok ? r.href : '#/cn/proximos/'+r.id; }
function cnBarra(pct, dom, etiqueta){
  return h('div',{class:'progress '+dom, role:'img', 'aria-label':(etiqueta||'Avance')+': '+pct+' %'}, h('i',{style:'width:'+pct+'%'}));
}

/* Tarjeta de recurso: propósito y reto primero, estado siempre con texto */
function cnResTile(r, dom){
  if (!r || !r.t) return null;
  const done = !!(r.act && cnHecho(r.act));
  return h('a',{class:'tile res '+dom+(r.ok?'':' planned'), href:cnHrefRecurso(r)},
    h('span',{class:'ico'}, r.em||'🔬'),
    h('span',{class:'tipo'}, r.tipo||'Recurso'),
    h('h3',{}, r.t),
    h('p',{}, r.d||''),
    r.reto ? h('div',{class:'res-reto'}, h('b',{}, done ? '✓ Reto resuelto' : (r.ok ? '🎯 Tu reto' : '🎯 Propósito')), h('span',{}, r.reto)) : null,
    done ? h('span',{class:'pill ok soon'},'Completado')
         : r.ok ? h('span',{class:'pill '+dom+' soon'},'Disponible')
                : h('span',{class:'pill soon'},'Próximamente'));
}

/* Tarjeta de unidad */
function cnUnidadTile(u){
  const d = cnDominio(u.dom), st = cnEstadoUnidad(u), pct = cnProgresoUnidad(u.id);
  const rs = cnRecursosDe(u), ok = rs.filter(r=>r.ok).length;
  return h('a',{class:'tile area-tile '+d.dom+' '+st, href:'#/cn/unidad/'+u.id},
    h('span',{class:'yeartag '+st}, CN_ETIQUETA[st]),
    h('div',{class:'row',style:'justify-content:space-between;align-items:flex-start'},
      h('span',{class:'ico'}, d.em),
      h('span',{class:'mono small muted'}, BIO.nivel(u.grado).corto+' · U'+u.n)),
    h('h3',{}, u.t),
    h('p',{}, u.reto),
    h('span',{class:'small muted',style:'margin-top:auto'}, ok+' recurso'+(ok===1?'':'s')+' disponible'+(ok===1?'':'s')+((rs.length-ok)>0 ? ' · '+(rs.length-ok)+' en construcción' : '')),
    h('div',{class:'row',style:'gap:10px;align-items:center'}, h('div',{style:'flex:1'}, cnBarra(pct, d.dom, 'Avance de la unidad')), h('span',{class:'mono small muted'}, pct+' %')));
}

/* Tarjeta de dominio (inicio de Ciencias Naturales) */
function cnDominioTile(dom, grado){
  const us = BIO.cnUnidadesDe(grado, dom.id), pct = cnProgresoDominio(grado, dom.id);
  const rs = us.flatMap(cnRecursosDe), ok = rs.filter(r=>r.ok).length;
  return h('a',{class:'tile area-tile '+dom.dom+' actual', href:'#/cn/dominio/'+dom.id},
    h('span',{class:'yeartag actual'}, BIO.nivel(grado).corto),
    h('div',{class:'row',style:'justify-content:space-between;align-items:flex-start'},
      h('span',{class:'ico'}, dom.em),
      h('span',{class:'mono small muted'}, us.map(u=>'U'+u.n).join(' · '))),
    h('h3',{}, dom.n),
    h('p',{}, dom.d),
    h('ul',{class:'small muted',style:'padding-left:18px;display:flex;flex-direction:column;gap:3px;margin:0'},
      us.map(u => h('li',{}, u.t+' · '+cnProgresoUnidad(u.id)+' %'))),
    h('span',{class:'small muted',style:'margin-top:auto'}, ok+' recurso'+(ok===1?'':'s')+' disponible'+(ok===1?'':'s')+' en este grado'),
    h('div',{class:'row',style:'gap:10px;align-items:center'}, h('div',{style:'flex:1'}, cnBarra(pct, dom.dom, 'Avance del dominio')), h('span',{class:'mono small muted'}, pct+' %')));
}

/* Franja de competencias del área */
function cnCompetencias(){
  return h('div',{class:'cn-comp-grid'}, BIO.cn.competencias.map(c =>
    h('div',{class:'cn-comp'}, h('span',{class:'c'}, c.c), h('b',{}, c.n), h('span',{class:'d'}, c.d))));
}

/* Progresión Fundamenta → Conecta → Transfiere */
function cnProgresion(grado){
  return h('div',{class:'cn-prog'}, BIO.cn.progresion.map((p,i) => {
    const on = p.id===grado;
    return h('div',{class:'cn-step'+(on?' on':''), 'aria-current': on ? 'step' : 'false'},
      h('span',{class:'n'}, 'Paso '+(i+1)+' de 3 · '+BIO.nivel(p.id).corto),
      h('b',{}, p.t),
      h('p',{}, p.d),
      h('span',{class:'tag'}, on ? '● Aquí estás tú' : (p.id<grado ? 'Ya lo recorriste' : 'Viene después')));
  }));
}

/* Laboratorios y simuladores disponibles del grado */
function cnRecursosDisponibles(grado){
  const vistos = {}, out = [];
  BIO.cnUnidadesDe(grado).forEach(u => cnRecursosDe(u).forEach(r => {
    if (r.ok && !vistos[r.id]){ vistos[r.id]=1; out.push([r, cnDominio(u.dom).dom]); }
  }));
  return out;
}

/* =====================================================================
   INICIO DE CIENCIAS NATURALES
   ===================================================================== */
/* Emblema ilustrado de Ciencias Naturales: la Tierra al centro y tres órbitas (vida, materia, energía) */
function cnOrbe(){
  const svg = `<svg class="cn-orbe" viewBox="0 0 132 132" role="img" aria-label="Emblema de Ciencias Naturales: la Tierra con tres órbitas que representan la vida, la materia y la energía">
  <defs>
    <radialGradient id="cnoMar" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#6FC3E8"/><stop offset=".55" stop-color="#2479B5"/><stop offset="1" stop-color="#123C6B"/></radialGradient>
    <radialGradient id="cnoHalo" cx="50%" cy="50%" r="50%"><stop offset=".62" stop-color="#7FD6F0" stop-opacity=".0"/><stop offset=".78" stop-color="#7FD6F0" stop-opacity=".35"/><stop offset="1" stop-color="#7FD6F0" stop-opacity="0"/></radialGradient>
    <radialGradient id="cnoSom" cx="70%" cy="72%" r="60%"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <linearGradient id="cnoHoja" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8ED66B"/><stop offset="1" stop-color="#2F8A45"/></linearGradient>
    <radialGradient id="cnoSol" cx="40%" cy="35%" r="65%"><stop offset="0" stop-color="#FFF4C2"/><stop offset=".6" stop-color="#FFC43D"/><stop offset="1" stop-color="#E8891C"/></radialGradient>
    <clipPath id="cnoClip"><circle cx="66" cy="66" r="25"/></clipPath>
  </defs>
  <circle class="o-glow" cx="66" cy="66" r="36" fill="url(#cnoHalo)"/>
  <g fill="none" stroke="currentColor" stroke-opacity=".22" stroke-width="1"><ellipse cx="66" cy="66" rx="58" ry="58"/><ellipse cx="66" cy="66" rx="45" ry="45" stroke-dasharray="2 4"/><ellipse cx="66" cy="66" rx="34" ry="34"/></g>
  <circle cx="66" cy="66" r="25" fill="url(#cnoMar)"/>
  <g clip-path="url(#cnoClip)"><g class="o-drift"><g id="cnoCont">
    <path d="M52 44c5-3 11-2 13 2 1 4-3 5-2 9 1 5 7 6 6 12-1 5-6 9-9 13-2 3-5 1-5-3 0-5-4-7-5-12-1-6-3-9-1-14 1-3 2-5 3-7z" fill="#5FAE5A"/>
    <path d="M74 42c6 0 11 4 12 9-3 1-6-1-9 1-2 2 1 6-2 8-4 2-7-2-8-6-1-5 1-10 7-12z" fill="#7DBE5E"/>
    <path d="M79 70c4-1 8 2 8 6s-4 8-8 7-5-4-4-7 1-5 4-6z" fill="#C8B26A"/>
    <path d="M40 80c3 0 5 3 4 5s-4 3-6 1 0-6 2-6z" fill="#6FB35C"/>
  </g><use href="#cnoCont" x="-60"/></g>
    <ellipse cx="60" cy="47" rx="12" ry="3" fill="#fff" opacity=".55"/><ellipse cx="78" cy="80" rx="9" ry="2.4" fill="#fff" opacity=".45"/>
    <circle cx="66" cy="66" r="25" fill="url(#cnoSom)"/></g>
  <circle cx="66" cy="66" r="25" fill="none" stroke="#fff" stroke-opacity=".35"/>
  <g class="o-rot"><g transform="translate(66 8)"><g class="o-spin">
    <path d="M-9 4C-9-6 0-11 9-10 10-1 5 8-5 8z" fill="url(#cnoHoja)" stroke="#256E37" stroke-width=".8"/><path d="M-7 6C-2 1 3-4 8-9" stroke="#E9F7DF" stroke-width="1" fill="none"/></g></g></g>
  <g class="o-rot r2"><g transform="translate(111 66)"><g class="o-spin" fill="none" stroke="#7B6BDA" stroke-width="1.4">
    <ellipse rx="10" ry="4"/><ellipse rx="10" ry="4" transform="rotate(60)"/><ellipse rx="10" ry="4" transform="rotate(-60)"/><circle r="2.6" fill="#7B6BDA" stroke="none"/></g></g></g>
  <g class="o-rot r3"><g transform="translate(32 42)"><circle r="7.5" fill="url(#cnoSol)"/><g stroke="#F2A93B" stroke-width="1.4" stroke-linecap="round"><path d="M0-12v-2.5M0 12v2.5M-12 0h-2.5M12 0h2.5M-8.5-8.5l-1.8-1.8M8.5 8.5l1.8 1.8M-8.5 8.5l-1.8 1.8M8.5-8.5l1.8-1.8"/></g></g></g>
</svg>`;
  return h('div',{class:'cn-em', style:'color:var(--ink-3);font-size:0', html:svg});
}
route('/cn', (view) => {
  const g = cnNivelActual(), niv = BIO.nivel(g), prog = BIO.programas.cn;
  const hr = new Date().getHours(), saludo = hr<12 ? 'Buenos días' : hr<19 ? 'Buenas tardes' : 'Buenas noches';
  const nombre = (Store.s.user.nombre||'').split(' ')[0] || 'estudiante';
  const pct = cnProgresoGrado(g);

  view.append(h('section',{class:'cn-hero'},
    cnOrbe(),
    h('div',{class:'stack',style:'gap:6px;flex:1;min-width:260px'},
      h('span',{class:'eyebrow eco'},'ANAI Online · Ciencias Naturales · EGB Superior'),
      h('h1',{}, saludo+', '+nombre),
      h('p',{}, 'Estás en '+niv.n+'. Aquí se aprende como trabajan las ciencias: primero exploras y manipulas, después explicas con evidencia. '+niv.d),
      h('div',{class:'row',style:'gap:8px;flex-wrap:wrap'},
        h('span',{class:'pill eco'}, niv.corto + (Store.ses.paralelo ? ' · paralelo '+Store.ses.paralelo : '')),
        h('span',{class:'pill'},'Avance del grado: '+pct+' %'),
        h('a',{class:'btn sm',href:'#/cn/progreso'},'Ver mi progreso'))),
    h('div',{class:'ring',style:'--p:'+pct}, h('i',{}, pct+' %'))));

  if (!cnNivelDeclarado()) view.append(h('div',{class:'notice info',style:'margin-bottom:16px'},
    h('span',{},'Todavía no registras tu grado, así que te mostramos 8.º de EGB. Cuando tu docente te entregue el código del curso, la plataforma cambiará sola a tu grado.')));

  const next = cnSiguientePaso();
  view.append(h('section',{class:'nextstep'},
    h('span',{class:'em','aria-hidden':'true'}, next.em),
    h('div',{class:'stack',style:'gap:4px;flex:1;min-width:230px'},
      h('span',{class:'eyebrow'},'Tu siguiente paso'),
      h('b',{}, next.t),
      h('span',{class:'small muted'}, next.d)),
    h('a',{class:'btn primary',href:next.href},'Continuar')));

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{}, h('span',{class:'eyebrow'},'Dos dominios, una sola área'), h('h2',{},'¿Qué vas a estudiar este año?'),
      h('p',{},'Ciencias Naturales se mantiene como una sola asignatura; desde 8.º de EGB se hace visible su especialización. Cada dominio tiene tres unidades en tu grado.'))));
  view.append(h('div',{class:'cn-grid2'}, BIO.cn.dominios.map(d => cnDominioTile(d, g))));

  view.append(h('div',{class:'page-head',style:'margin-bottom:10px'},
    h('div',{}, h('span',{class:'eyebrow'},'Competencias del área'), h('h2',{},'Lo que se espera que sepas hacer'),
      h('p',{},'Las cinco competencias se trabajan en todas las unidades; cada reto te acerca a una o varias.'))));
  view.append(cnCompetencias());

  view.append(h('div',{class:'page-head',style:'margin-bottom:10px'},
    h('div',{}, h('span',{class:'eyebrow'},'Progresión de EGB Superior'), h('h2',{},'Fundamenta → Conecta → Transfiere'),
      h('p',{},'Los tres grados forman una sola ruta que termina con los prerrequisitos de Física y Biología de Bachillerato.'))));
  view.append(cnProgresion(g));

  const disp = cnRecursosDisponibles(g);
  view.append(h('div',{class:'area-sec-head'},
    h('span',{class:'secn eco'},'▶'),
    h('div',{}, h('h2',{},'Laboratorios y simuladores disponibles'),
      h('span',{class:'small muted'},'Laboratorios, simuladores y modelos 3D de tu grado: se manipulan, se miden y se comprueban. Cada uno trae su propósito y un reto concreto.'))));
  view.append(disp.length
    ? h('div',{class:'grid g3',style:'margin-bottom:22px'}, disp.map(([r,dom]) => cnResTile(r, dom)))
    : h('div',{class:'ph',style:'margin-bottom:22px'},'Los recursos de este grado se habilitarán muy pronto.'));

  view.append(h('div',{class:'row',style:'gap:8px;flex-wrap:wrap'},
    h('span',{class:'small muted'},'Ir a:'),
    BIO.cn.dominios.map(d => h('a',{class:'btn sm',href:'#/cn/dominio/'+d.id}, d.em+' '+d.corto)),
    h('a',{class:'btn sm',href:'#/cn/progreso'},'↗ Mi progreso'),
    h('a',{class:'btn sm ghost',href:'#/'},'Ir a Biología (Bachillerato)')));
  view.append(h('p',{class:'small muted',style:'margin-top:22px;max-width:72ch'},
    'Prototipo educativo. Los modelos y simuladores son representaciones simplificadas con fines de aprendizaje; los datos de estudiantes son ficticios.'));
});

/* =====================================================================
   DOMINIO
   ===================================================================== */
route('/cn/dominio/:dom', (view, p) => {
  const d = cnDominio(p.dom);
  if (!d){ navigate('#/cn'); return; }
  const g = cnNivelActual(), pct = cnProgresoDominio(g, d.id);
  view.append(h('div',{class:'page-head'},
    h('div',{}, h('span',{class:'eyebrow '+d.dom},'Ciencias Naturales · '+BIO.nivel(g).n),
      h('h1',{}, d.em+' '+d.n), h('p',{}, d.d)),
    h('div',{class:'ring',style:'--p:'+pct}, h('i',{}, pct+' %'))));
  view.append(h('div',{class:'guide-q '+d.dom},
    h('span',{class:'eyebrow'},'Cómo se trabaja en este dominio'),
    h('b',{}, BIO.cn.enfoque),
    h('span',{class:'small muted'},'Entra por el reto de cada unidad: primero exploras y mides, después explicas y argumentas con los datos que obtuviste.')));

  const sec = (num, titulo, sub, unidades, vacio) => {
    view.append(h('div',{class:'area-sec-head'},
      h('span',{class:'secn '+d.dom}, num),
      h('div',{}, h('h2',{}, titulo), h('span',{class:'small muted'}, sub))));
    view.append(unidades.length
      ? h('div',{class:'cn-grid3'}, unidades.map(cnUnidadTile))
      : h('div',{class:'ph',style:'margin-bottom:22px'}, vacio));
  };
  sec('1','Las unidades de tu grado','Tres unidades de '+BIO.nivel(g).corto+'. Empieza por la primera y avanza en orden.',
    BIO.cnUnidadesDe(g, d.id), 'Aún no hay unidades registradas para tu grado.');

  const repaso = BIO.niveles.filter(n=>n.prog==='cn' && n.id<g).flatMap(n => BIO.cnUnidadesDe(n.id, d.id));
  if (repaso.length) sec('2','Repaso de grados anteriores','Ya las estudiaste: úsalas para recordar lo que necesitas ahora.', repaso, '');
  const luego = BIO.niveles.filter(n=>n.prog==='cn' && n.id>g).flatMap(n => BIO.cnUnidadesDe(n.id, d.id));
  if (luego.length) sec(repaso.length?'3':'2','Más adelante','Se estudian en los siguientes grados. Puedes mirarlas, pero tu docente aún no las asignó.', luego, '');

  view.append(h('div',{class:'row',style:'gap:8px;flex-wrap:wrap;margin-top:6px'},
    h('span',{class:'small muted'},'Otro dominio:'),
    BIO.cn.dominios.filter(x=>x.id!==d.id).map(x => h('a',{class:'btn sm',href:'#/cn/dominio/'+x.id}, x.em+' '+x.n)),
    h('a',{class:'btn sm ghost',href:'#/cn'},'← Inicio de Ciencias Naturales')));
});

/* =====================================================================
   FICHA DE UNIDAD
   ===================================================================== */
route('/cn/unidad/:id', (view, p) => {
  const u = BIO.cnUnidad(p.id);
  if (!u){ navigate('#/cn'); return; }
  const d = cnDominio(u.dom), niv = BIO.nivel(u.grado), st = cnEstadoUnidad(u), pct = cnProgresoUnidad(u.id);
  const rs = cnRecursosDe(u), listos = rs.filter(r=>r.ok), pronto = rs.filter(r=>!r.ok);

  view.append(h('div',{class:'page-head'},
    h('div',{}, h('span',{class:'eyebrow '+d.dom}, niv.n+' · '+d.n+' · Unidad '+u.n),
      h('h1',{}, u.t),
      h('p',{},'Todo lo que hagas en esta unidad sirve para responder una sola pregunta. Empieza por el reto.')),
    h('div',{class:'ring',style:'--p:'+pct}, h('i',{}, pct+' %'))));

  if (st==='repaso') view.append(h('div',{class:'notice info',style:'margin-bottom:12px'},
    h('span',{},'Esta unidad corresponde a '+niv.n+' y la tienes disponible como repaso.')));
  if (st==='proximo') view.append(h('div',{class:'notice warn',style:'margin-bottom:12px'},
    h('span',{},'Esta unidad se estudia en '+niv.n+'. Puedes mirarla, pero tu docente aún no la asignó a tu curso.')));

  /* 1 · El reto de la unidad */
  view.append(h('div',{class:'guide-q '+d.dom},
    h('span',{class:'eyebrow'},'Reto de la unidad'),
    h('b',{}, u.reto),
    h('span',{class:'small muted'},'Vas a responderla con datos que tú mismo obtengas en los recursos de abajo, no copiando una definición.'),
    TTS.on ? h('div',{class:'row'}, TTS.btn(u.reto, 'Escuchar el reto')) : null));

  /* 2 · Recursos */
  view.append(h('div',{class:'area-sec-head'},
    h('span',{class:'secn '+d.dom},'1'),
    h('div',{}, h('h2',{},'Explora y experimenta'),
      h('span',{class:'small muted'},'Manipula, mide y registra. Cada recurso te dice qué observar y qué debes resolver.'))));
  /* agrupados por lo que el estudiante hace con ellos, en el orden sugerido */
  const grupos = [
    ['Observa y explora', 'Modelos 3D, animaciones y microscopio.', r => /^(Modelo|Animación|Microscopio)/.test(r.tipo)],
    ['Experimenta', 'Laboratorios, simuladores y datos reales: cambia variables y mide.', r => /^(Laboratorio|Simulador|Tablero)/.test(r.tipo)],
    ['Aplica', 'Misiones y casos: usa lo aprendido para resolver un problema.', r => /^(Misión|Caso)/.test(r.tipo)]
  ];
  const usados = new Set();
  grupos.forEach(([t, sub, f]) => { const lista = listos.filter(r => !usados.has(r.id) && f(r)); lista.forEach(r => usados.add(r.id)); if (!lista.length) return;
    view.append(h('div',{class:'row',style:'align-items:baseline;gap:10px;margin:4px 0 10px'}, h('h3',{style:'margin:0'},t), h('span',{class:'small muted'},sub)));
    view.append(h('div',{class:'grid g3',style:'margin-bottom:20px'}, lista.map(r => cnResTile(r, d.dom)))); });
  const resto = listos.filter(r => !usados.has(r.id));
  if (resto.length) view.append(h('div',{class:'grid g3',style:'margin-bottom:20px'}, resto.map(r => cnResTile(r, d.dom))));
  if (!listos.length) view.append(h('div',{class:'ph',style:'margin-bottom:20px'},'Esta unidad se trabaja con el reto y la evidencia que se describen abajo.'));
  if (pronto.length){
    view.append(h('h3',{style:'margin:0 0 10px'},'Próximamente en esta unidad'));
    view.append(h('div',{class:'grid g3',style:'margin-bottom:22px'}, pronto.map(r => cnResTile(r, d.dom))));
  }

  /* 3 · Evidencia que se te pide */
  view.append(h('div',{class:'area-sec-head'},
    h('span',{class:'secn '+d.dom},'2'),
    h('div',{}, h('h2',{},'Lo que vas a entregar'),
      h('span',{class:'small muted'},'Una sola evidencia por unidad, evaluada con un instrumento conocido desde el primer día.'))));
  view.append(h('div',{class:'grid g2',style:'margin-bottom:8px'},
    h('div',{class:'card stack'}, h('span',{class:'eyebrow '+d.dom},'Evidencia principal'), h('p',{}, u.evidencia),
      h('span',{class:'pill cn-instr '+d.dom}, 'Instrumento: '+u.instrumento)),
    h('div',{class:'card stack'}, h('span',{class:'eyebrow '+d.dom},'Para qué te sirve fuera de clase'), h('p',{}, u.apv),
      h('span',{class:'small muted'},'Esto se llama aprendizaje para la vida: la unidad termina cuando puedes usarlo en una situación real.'))));

  /* 4 · Lo curricular, plegado */
  const pri = x => x==='IMPRESCINDIBLE'
    ? h('span',{class:'pill warn'}, '◆ Imprescindible')
    : h('span',{class:'pill'}, '◇ Deseable');
  const fold = h('details',{class:'cn-fold'},
    h('summary',{}, 'Lo que dice el currículo', h('span',{class:'small muted',style:'font-weight:500'},'· destrezas, indicadores y trazabilidad · para docentes y familias')),
    h('div',{class:'cn-body'},
      h('p',{class:'small muted'},'Esta sección traduce la unidad al lenguaje del currículo institucional. El estudiante no necesita memorizarla: le basta con el reto y los recursos de arriba.'),
      h('div',{class:'cn-block'},
        h('h4',{},'Destrezas institucionales'),
        h('p',{class:'small muted'},'Prioridad: ◆ imprescindible (se garantiza para todos) · ◇ deseable (profundización). Nivel N1 reconocer, N2 explicar y relacionar, N3 evaluar y transferir.'),
        h('div',{class:'cn-destrezas'}, u.destrezas.map(x =>
          h('div',{class:'cn-destreza '+d.dom+' '+(x.pri==='IMPRESCINDIBLE'?'imp':'des')},
            h('div',{class:'meta'}, h('span',{class:'cod'}, x.c), pri(x.pri), h('span',{class:'pill '+d.dom}, 'Nivel '+x.niv)),
            h('p',{}, x.d)))) ),
      h('div',{class:'cn-block'},
        h('h4',{},'Indicadores de logro'),
        h('ul',{}, u.indicadores.map(i => h('li',{}, i)))),
      h('div',{class:'cn-block'},
        h('h4',{},'Saberes de apoyo'),
        h('p',{}, u.saberes)),
      h('div',{class:'cn-block'},
        h('h4',{},'Evidencia e instrumento'),
        h('p',{}, u.evidencia+' Se evalúa con: '+u.instrumento+'.')),
      h('div',{class:'cn-block'},
        h('h4',{},'APV · aprendizaje para la vida'),
        h('p',{}, u.apv)),
      h('div',{class:'cn-block'},
        h('h4',{},'Trazabilidad con el currículo nacional'),
        h('p',{class:'cn-traza'}, u.traza))));
  view.append(fold);

  /* 5 · Navegación entre unidades */
  const hermanas = BIO.cnUnidadesDe(u.grado, u.dom).filter(x=>x.id!==u.id);
  view.append(h('div',{class:'row',style:'gap:8px;flex-wrap:wrap;margin-top:18px'},
    h('span',{class:'small muted'},'Otras unidades de '+d.corto+' en '+niv.corto+':'),
    hermanas.map(x => h('a',{class:'btn sm',style:'white-space:normal;text-align:left;max-width:100%',href:'#/cn/unidad/'+x.id}, 'U'+x.n+' · '+x.t))));
  view.append(h('div',{class:'row',style:'gap:8px;flex-wrap:wrap;margin-top:8px'},
    h('a',{class:'btn sm ghost',href:'#/cn/dominio/'+d.id},'← '+d.n),
    h('a',{class:'btn sm ghost',href:'#/cn'},'Inicio de Ciencias Naturales')));
});

/* =====================================================================
   PROGRESO EN CIENCIAS NATURALES
   ===================================================================== */
const CN_LOGROS = [
  { em:'⚖️', n:'Metrología básica', d:'Resolviste el laboratorio de densidad y flotación.', ok:()=>cnHecho('cn-lab-densidad') },
  { em:'🛷', n:'Lector de gráficas', d:'Modelaste un movimiento con datos propios.', ok:()=>cnHecho('cn-lab-movimiento') },
  { em:'💡', n:'Circuitos seguros', d:'Comparaste serie y paralelo con mediciones.', ok:()=>cnHecho('cn-lab-circuitos') },
  { em:'🌳', n:'Pensamiento sistémico', d:'Predijiste el efecto de una perturbación en una red trófica.', ok:()=>cnHecho('cn-eco-red') },
  { em:'🪐', n:'Escalas del universo', d:'Relacionaste gravedad, órbitas y espectro.', ok:()=>cnHecho('cn-sim-espacio') },
  { em:'🏅', n:'Grado completo', d:'Completaste todas las actividades registradas de tu grado.', ok:()=>cnProgresoGrado(cnNivelActual())===100 }
];

route('/cn/progreso', (view) => {
  const g = cnNivelActual(), niv = BIO.nivel(g), pct = cnProgresoGrado(g);
  const items = BIO.cnItemsDe(g), hechos = items.filter(i=>cnHecho(i.id));
  const eventosCN = Store.s.events.filter(e => String(e.ruta||'').indexOf('/cn')>=0).length;
  const tiempo = Store.s.timeMin + Math.round(eventosCN*0.6);
  const logros = CN_LOGROS.filter(l => { try { return l.ok(); } catch(e){ return false; } });

  view.append(h('div',{class:'page-head'},
    h('div',{}, h('span',{class:'eyebrow eco'},'Ciencias Naturales · mi progreso'),
      h('h1',{}, Store.s.user.nombre),
      h('p',{}, niv.n+(Store.ses.paralelo?' · paralelo '+Store.ses.paralelo:'')+' · '+pct+' % de avance en el grado')),
    h('div',{class:'ring',style:'--p:'+pct}, h('i',{}, pct+' %'))));

  const top = h('div',{class:'grid g4'});
  [[hechos.length+'/'+items.length,'actividades completadas de tu grado'],
   [fmtMin(tiempo),'tiempo en Ciencias Naturales'],
   [logros.length+'/'+CN_LOGROS.length,'logros conseguidos'],
   [String(BIO.cnUnidadesDe(g).length),'unidades de '+niv.corto]]
    .forEach(([v,l]) => top.append(h('div',{class:'card stat'}, h('span',{class:'v'}, v), h('span',{class:'l'}, l))));
  view.append(top, h('div',{style:'height:16px'}));

  const g2 = h('div',{class:'grid g2'});

  /* por dominio y unidad */
  const porDom = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Avance por dominio y unidad'));
  BIO.cn.dominios.forEach(d => {
    const dp = cnProgresoDominio(g, d.id);
    porDom.append(h('a',{href:'#/cn/dominio/'+d.id, class:'row', style:'justify-content:space-between;text-decoration:none;color:inherit;margin-top:8px'},
      h('span',{class:'row',style:'gap:8px'}, h('span',{class:'navdot '+d.dom}), h('b',{}, d.n)),
      h('span',{class:'mono small'}, dp+' %')));
    BIO.cnUnidadesDe(g, d.id).forEach(u => {
      const up = cnProgresoUnidad(u.id);
      porDom.append(h('div',{style:'padding-left:16px'},
        h('div',{class:'row',style:'justify-content:space-between;font-size:.84rem;flex-wrap:nowrap'},
          h('a',{href:'#/cn/unidad/'+u.id}, 'U'+u.n+' · '+u.t),
          h('span',{class:'cn-pct'}, up+' %')),
        cnBarra(up, d.dom, 'Avance de la unidad U'+u.n)));
    });
  });

  /* actividades del grado */
  const acts = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Actividades de '+niv.corto));
  if (!items.length) acts.append(h('p',{class:'muted small'},'Este grado todavía no tiene actividades calificables registradas.'));
  items.forEach(i => {
    const u = BIO.cnUnidad(i.unidad), dom = u ? cnDominio(u.dom).dom : 'eco';
    acts.append(h('div',{class:'cn-itemrow'},
      h('span',{class:'navdot '+dom,'aria-hidden':'true'}),
      h('span',{class:'t'}, h('b',{}, i.t), h('span',{class:'small muted',style:'display:block'}, i.tipo+' · '+(u?u.t:i.unidad))),
      cnHecho(i.id) ? h('span',{class:'pill ok'},'✓ Completada') : h('span',{class:'pill'},'Pendiente')));
  });

  /* logros */
  const bd = h('div',{class:'card'}, h('span',{class:'eyebrow'},'Logros de Ciencias Naturales'),
    h('div',{class:'grid',style:'grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin-top:10px'},
      CN_LOGROS.map(l => { let on=false; try { on = l.ok(); } catch(e){ on=false; }
        return h('div',{class:'badge-tile'+(on?'':' locked'), title:l.d},
          h('span',{class:'em'}, l.em), h('span',{class:'n'}, l.n), h('span',{class:'d'}, (on?'Conseguido · ':'Pendiente · ')+l.d)); })));

  /* siguiente paso */
  const next = cnSiguientePaso();
  const sig = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Tu siguiente paso'),
    h('h3',{}, next.t), h('p',{class:'small muted'}, next.d),
    h('a',{class:'btn primary sm',href:next.href,style:'align-self:flex-start'},'Continuar'));

  g2.append(h('div',{class:'stack'}, porDom, acts), h('div',{class:'stack'}, sig, bd));
  view.append(g2);
  view.append(h('p',{class:'small muted',style:'margin-top:18px'},
    'El avance se calcula con las actividades registradas de tu grado; cada una pesa según su tipo. Los retos de repaso de otros grados no bajan tu porcentaje.'));
  view.append(h('div',{class:'row',style:'gap:8px;flex-wrap:wrap;margin-top:10px'},
    h('a',{class:'btn sm ghost',href:'#/cn'},'← Inicio de Ciencias Naturales'),
    h('a',{class:'btn sm ghost',href:'#/cuaderno'},'Mi cuaderno de campo')));
});

/* =====================================================================
   RECURSO EN CONSTRUCCIÓN
   ===================================================================== */
route('/cn/proximos/:id', (view, p) => {
  const r = BIO.cnRecurso(p.id);
  if (!r.t){ navigate('#/cn'); return; }
  if (r.ok){ navigate(r.href); return; }
  const unidades = BIO.cn.unidades.filter(u => (u.recursos||[]).includes(r.id));
  const u0 = unidades[0], dom = u0 ? cnDominio(u0.dom) : BIO.cn.dominios[0];
  const g = cnNivelActual();

  view.append(h('div',{class:'page-head'},
    h('div',{}, h('span',{class:'eyebrow '+dom.dom}, (r.tipo||'Recurso')+' · en construcción'),
      h('h1',{}, (r.em||'🔧')+' '+r.t),
      h('p',{}, r.d||''))));
  view.append(h('div',{class:'notice warn',style:'margin-bottom:14px'},
    h('span',{},'Este recurso todavía no está disponible. Preferimos decírtelo con claridad antes que mostrarte una pantalla vacía: aquí tienes qué tendrá, a qué unidad pertenece y qué puedes hacer mientras tanto.')));

  view.append(h('div',{class:'grid g2',style:'margin-bottom:18px'},
    h('div',{class:'card stack'}, h('span',{class:'eyebrow '+dom.dom},'Qué tendrá'),
      h('p',{}, r.d||''),
      r.reto ? h('div',{class:'res-reto'}, h('b',{},'🎯 Propósito'), h('span',{}, r.reto)) : null),
    h('div',{class:'card stack'}, h('span',{class:'eyebrow '+dom.dom},'A qué unidad pertenece'),
      unidades.length
        ? h('ul',{style:'padding-left:18px;display:flex;flex-direction:column;gap:6px;margin:0'},
            unidades.map(u => h('li',{}, h('a',{href:'#/cn/unidad/'+u.id}, BIO.nivel(u.grado).corto+' · '+cnDominio(u.dom).corto+' · U'+u.n+': '+u.t))))
        : h('p',{class:'small muted'},'Es un recurso transversal: se usará en varias unidades.'),
      unidades.length ? h('p',{class:'small muted'},'Mientras tanto, en esa unidad ya puedes revisar el reto, la evidencia que se te pedirá y los recursos que sí están listos.') : null)));

  const alt = [];
  const vistos = {};
  unidades.forEach(u => cnRecursosDe(u).forEach(x => { if (x.ok && !vistos[x.id]){ vistos[x.id]=1; alt.push([x, cnDominio(u.dom).dom]); } }));
  cnRecursosDisponibles(g).forEach(([x,d]) => { if (!vistos[x.id]){ vistos[x.id]=1; alt.push([x,d]); } });

  view.append(h('div',{class:'area-sec-head'},
    h('span',{class:'secn '+dom.dom},'▶'),
    h('div',{}, h('h2',{},'Mientras tanto, esto sí puedes hacer'),
      h('span',{class:'small muted'},'Recursos disponibles de esta unidad y de tu grado.'))));
  view.append(alt.length
    ? h('div',{class:'grid g3',style:'margin-bottom:18px'}, alt.slice(0,6).map(([x,d]) => cnResTile(x, d)))
    : h('div',{class:'ph',style:'margin-bottom:18px'},'Todavía no hay recursos disponibles para tu grado.'));

  view.append(h('div',{class:'row',style:'gap:8px;flex-wrap:wrap'},
    u0 ? h('a',{class:'btn',href:'#/cn/unidad/'+u0.id},'Ver la unidad completa') : null,
    h('a',{class:'btn ghost',href:'#/cn'},'← Inicio de Ciencias Naturales')));
});
</script>
