<script>
/* =====================================================================
   VISTAS: Atlas 3D genérico por órgano (corazón, cerebro, pulmones)
   ===================================================================== */
function stageChrome(stage, E, opts){
  const top = h('div',{class:'stage-top'}), bottom = h('div',{class:'stage-bottom'});
  const lblBtn = h('button',{class:'btn sm','aria-pressed':'true',onclick:()=>{ const on = lblBtn.getAttribute('aria-pressed')!=='true'; lblBtn.setAttribute('aria-pressed',on); E && E.setLabels(on); }},'Etiquetas');
  const reset = h('button',{class:'btn sm',onclick:()=>E && E.resetView(),title:'Restablecer vista','aria-label':'Restablecer vista'},'↺ Vista');
  const cap = h('button',{class:'btn sm',onclick:()=>{ if (!E) return toast('La captura requiere el modelo 3D.'); const img = E.capture(); Store.addNote('captura', opts.captureTxt(), {img}); Store.log('captura',{modelo:opts.model}); toast('Captura guardada en tu cuaderno de campo.'); }},'Capturar');
  const fs = h('button',{class:'btn sm',title:'Pantalla completa','aria-label':'Pantalla completa',onclick:()=>{ if (document.fullscreenElement) document.exitFullscreen(); else stage.requestFullscreen && stage.requestFullscreen(); }},'⛶');
  top.append(opts.left || h('span'), h('span',{class:'grow'}), lblBtn, reset, cap, fs);
  const phase = h('span',{class:'phase',style:'display:none'});
  bottom.append(phase, h('span',{class:'stage-note'},'Modelo simplificado con fines educativos'));
  stage.append(top, bottom);
  return { phase };
}

function organView(view, q, D, build){
  const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{}, h('span',{class:'eyebrow anat'},D.eyebrow), h('h1',{},D.nombre), h('p',{},D.intro)), h('div',{class:'row'}, D.related.map(r => h('a',{class:'btn sm',href:r.href},r.t)))));
  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'viewer'}, stage, panel));
  let E=null, M=null, mode='libre', guideIdx=0, guideDone=false, selected=null, hidden=new Set(), tab='explorar', opacity=D.opacityDefault ?? 1;
  const modeSeg = h('div',{class:'segmented',role:'tablist'}, h('button',{role:'tab','aria-selected':'true',onclick:()=>setMode('libre')},'Exploración libre'), h('button',{role:'tab','aria-selected':'false',onclick:()=>setMode('guiada')},'Exploración guiada'));
  if (webglOK){ try { E = new Engine3D(stage, { radius:D.radius, phi:D.phi, theta:D.theta, target:D.target, minR:2.5, maxR:22, onSelect:(id,src)=>{ if (id) select(id, src); } }); M = build(E); } catch(e){ console.warn(e); E=null; } }
  const chrome = stageChrome(stage, E, { left:modeSeg, model:D.id, captureTxt:()=>`Captura · ${D.nombre}${selected?` · ${S[selected].nombre}`:''}` });
  if (E && M) E.onFrame(()=>{ const t = M.phaseText ? M.phaseText() : ''; if (chrome.phase.textContent!==t) chrome.phase.textContent=t; chrome.phase.style.display = t ? '' : 'none'; });
  if (!E){ if (D.id==='corazon') stage.append(heart2D((id)=>select(id,'esquema'))); stage.append(h('div',{class:'notice info',style:'position:absolute;left:12px;right:12px;top:56px'},'WebGL no disponible: usa la lista de estructuras para explorar el contenido.')); }
  const applyOpacity = o => { opacity=o; if (M && M.setOpacity) M.setOpacity(o); else if (E) D.structures.forEach(s => { if (D.opacityCapas.includes(s.capa) && !s.interno) E.setOpacity(s.id, o); }); if (M) M.opacity = o; };
  if (E && opacity<1) applyOpacity(opacity);
  const setLayer = (capa,on) => { if (M && M.setLayer && D.id==='corazon') M.setLayer(capa,on); else D.structures.filter(s=>s.capa===capa).forEach(s => E && E.setVisible(s.id,on)); };

  const tabs = h('div',{class:'tabs',role:'tablist'}); const tabBody = h('div',{class:'stack'});
  const TABS = [['explorar','Explorar'],['capas','Capas'],['animacion','Animación'],['quiz','Quiz']];
  TABS.forEach(([id,t]) => tabs.append(h('button',{role:'tab','aria-selected':id===tab,onclick:()=>{ tab=id; renderTab(); }},t)));
  panel.append(h('div',{class:'card'},tabs,h('div',{style:'height:12px'}),tabBody));
  const listEl = h('ul',{class:'struct-list','aria-label':'Estructuras'});
  const seen = () => Store.s.seen[D.id] || [];
  function renderList(){ listEl.innerHTML=''; const sn = seen(); D.structures.forEach(s => listEl.append(h('li',{}, h('button',{'aria-pressed':selected===s.id,onclick:()=>select(s.id,'lista')}, h('span',{class:'sw',style:`background:${s.color}`}), s.nombre, sn.includes(s.id)?h('span',{class:'seen'},'✓'):null)))); }
  function renderTab(){ $$('button',tabs).forEach((b,i)=>b.setAttribute('aria-selected', TABS[i][0]===tab)); tabBody.innerHTML='';
    if (tab==='explorar'){ if (mode==='guiada') tabBody.append(guideBox()); tabBody.append(selected ? hotspotCard(S[selected]) : h('div',{class:'notice'},'Selecciona una estructura en el modelo, en una etiqueta o en la lista. Arrastra para rotar · rueda para acercar · Shift + arrastrar para desplazar · teclado: flechas, + y −.')); tabBody.append(h('div',{}, h('span',{class:'eyebrow'},'Estructuras'), listEl)); renderList(); }
    else if (tab==='capas') tabBody.append(layersBox());
    else if (tab==='animacion') tabBody.append(animBox());
    else tabBody.append(quizBox());
  }
  function hotspotCard(s){
    const capaN = (D.capas.find(c=>c.id===s.capa)||{}).n || '';
    return h('div',{class:'hcard stack',style:'gap:4px'},
      h('div',{class:'row',style:'justify-content:space-between'}, h('span',{class:'pill anat'},capaN), h('span',{class:'mono small muted'},`${seen().length}/${D.structures.length} exploradas`)),
      h('h3',{},s.nombre),
      h('div',{class:'q'},'¿Qué es? · ¿Qué hace?'), depthBlock(s),
      h('div',{class:'q'},'Dato importante'), h('p',{},s.dato),
      h('div',{class:'q'},'Conecta con'), h('div',{class:'conecta'}, s.conecta.map(id => S[id] ? h('button',{onclick:()=>select(id,'conecta')},'→ '+S[id].nombre) : null), (s.temas||[]).map(t => h('button',{style:'border-style:dashed',onclick:()=>toast(`Tema transversal: ${t}. Se relaciona con ${s.nombre}.`)},t))),
      h('div',{class:'ctrl-row',style:'margin-top:10px'},
        h('button',{class:'btn sm primary',onclick:()=>{ if (!M) return toast('Requiere el modelo 3D.'); const a = M.anims[0]; M.anims.forEach(x=>x.set(x===a || x.id==='flujo')); if (a.needsOpacity && opacity>a.needsOpacity+0.1) applyOpacity(a.needsOpacity); tab='animacion'; renderTab(); if (!a.focus) E.focus(V3(s.pos), D.focusR); Store.log('animacion',{modelo:D.id,estructura:s.id}); }},'Ver funcionamiento'),
        h('button',{class:'btn sm',onclick:()=>{ tab='quiz'; renderTab(); }},'Comprueba lo aprendido'),
        h('button',{class:'btn sm',onclick:()=>{ if(!E) return; D.structures.forEach(x=>E.setVisible(x.id, x.id===s.id)); hidden = new Set(D.structures.filter(x=>x.id!==s.id).map(x=>x.id)); toast(`Aislado: ${s.nombre}. Usa Capas → Mostrar todo para volver.`); }},'Aislar'),
        h('button',{class:'btn sm',onclick:()=>{ if(!E) return; E.setVisible(s.id,false); hidden.add(s.id); toast(`${s.nombre}: oculta.`); }},'Ocultar'),
        h('button',{class:'btn sm ghost',onclick:()=>{ Store.addNote('observacion', `${s.nombre}: ${s.n1} Dato: ${s.dato}`); toast('Guardado en tu cuaderno.'); }},'Guardar en cuaderno')));
  }
  function layersBox(){
    const box = h('div',{class:'stack'});
    const lay = h('div',{class:'layers'}); D.capas.forEach(c => { const on = D.structures.filter(s=>s.capa===c.id).some(s=>!hidden.has(s.id)); lay.append(h('label',{class:'toggle'}, h('input',{type:'checkbox',checked:on,onchange:e=>{ if(!E) return; setLayer(c.id, e.target.checked); D.structures.filter(s=>s.capa===c.id).forEach(s=> e.target.checked?hidden.delete(s.id):hidden.add(s.id)); const inner = D.structures.some(s=>s.capa===c.id && s.interno); if (inner && e.target.checked && opacity>0.6){ applyOpacity(0.35); op.value=35; opOut.value='35 %'; toast('Se activó la transparencia para ver las estructuras internas.'); } }}), c.n)); });
    box.append(h('span',{class:'eyebrow'},'Capas visibles'), lay);
    const op = h('input',{type:'range',min:10,max:100,value:Math.round(opacity*100),id:'op-range'}); const opOut = h('output',{},op.value+' %'); op.addEventListener('input',()=>{ opOut.value=op.value+' %'; applyOpacity(op.value/100); });
    const ex = h('input',{type:'range',min:0,max:100,value:0,id:'ex-range'}); const exOut = h('output',{},'0 %'); ex.addEventListener('input',()=>{ exOut.value=ex.value+' %'; E && E.setExplode(ex.value/100); });
    box.append(h('div',{class:'slider'}, h('label',{for:'op-range'},D.opacityLabel), opOut, op), h('div',{class:'slider'}, h('label',{for:'ex-range'},'Separar estructuras (vista explosionada)'), exOut, ex));
    box.append(h('div',{class:'ctrl-row'}, h('button',{class:'btn sm',onclick:()=>{ op.value=30; opOut.value='30 %'; applyOpacity(0.3); }},'Ver interior'), h('button',{class:'btn sm',onclick:()=>{ op.value=100; opOut.value='100 %'; applyOpacity(1); ex.value=0; exOut.value='0 %'; E && E.setExplode(0); }},'Vista sólida'), h('button',{class:'btn sm',onclick:()=>{ D.structures.forEach(s=>E&&E.setVisible(s.id,true)); hidden.clear(); renderTab(); }},'Mostrar todo')));
    if (hidden.size) box.append(h('p',{class:'small muted'},`Ocultas: ${[...hidden].map(id=>S[id].nombre).join(', ')}`));
    box.append(h('div',{class:'notice'},D.id==='corazon' ? 'Sugerencia: activa solo "Vasos" y separa las estructuras para ver por dónde entra y sale la sangre.' : D.id==='cerebro' ? 'Sugerencia: baja la transparencia de la corteza para ver el tálamo, el hipotálamo y el hipocampo.' : 'Sugerencia: oculta "Pulmones y pleura" para ver el árbol bronquial completo.'));
    return box;
  }
  function animBox(){
    const box = h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Procesos dinámicos'));
    if (!M){ box.append(h('div',{class:'notice'},'Las animaciones requieren el modelo 3D.')); return box; }
    M.anims.forEach(a => { const inp = h('input',{type:'checkbox',checked:a.on}); inp.addEventListener('change',()=>{ a.set(inp.checked); if (inp.checked && a.needsOpacity && opacity>a.needsOpacity+0.1){ applyOpacity(a.needsOpacity); toast('Transparencia ajustada para ver el proceso dentro del órgano.'); } if (mode==='guiada' && !guideDone && D.guiada[guideIdx]?.tipo==='anim' && D.guiada[guideIdx].target===a.id && inp.checked) guideAdvance(true); Store.log('animacion',{modelo:D.id,animacion:a.id,activa:inp.checked}); }); box.append(h('label',{class:'toggle'},inp,a.label)); });
    const sp = h('input',{type:'range',min:25,max:250,value:100,id:'sp-range'}); const spOut = h('output',{},'1.0×'); sp.addEventListener('input',()=>{ spOut.value=(sp.value/100).toFixed(1)+'×'; M.setSpeed && M.setSpeed(sp.value/100); });
    box.append(h('div',{class:'slider'}, h('label',{for:'sp-range'},'Velocidad'), spOut, sp));
    (M.legend||[]).forEach(l => box.append(h('div',{class:'row small',style:'flex-wrap:nowrap'}, h('span',{class:'dot',style:`background:${l.color};flex:none`}), h('span',{},l.txt))));
    if (D.funciones && M.highlight){ const fx = h('div',{class:'conecta'}); D.funciones.forEach(f => fx.append(h('button',{onclick:()=>{ M.highlight(f.ids); toast(`${f.t}: intervienen ${f.ids.map(id=>S[id].nombre).join(', ')}.`, 4500); Store.log('funcion_cerebral',{funcion:f.t}); }},f.t))); box.append(h('span',{class:'eyebrow',style:'margin-top:6px'},'¿Qué se activa cuando…?'), fx); }
    if (M.observa) box.append(h('div',{class:'notice'},h('span',{},h('b',{},'Observa: '),M.observa)));
    if (!motionOK()) box.append(h('div',{class:'notice warn'},'Las animaciones están pausadas (botón ⏸ de la barra superior o preferencia del sistema).'));
    return box;
  }
  function quizBox(){
    const box = h('div',{class:'stack'});
    if (!selected) box.append(h('div',{class:'notice'},'Selecciona una estructura para responder su pregunta de comprobación.'));
    else { const s = S[selected]; box.append(h('span',{class:'eyebrow'},'Comprueba · '+s.nombre), quizBlock(s.quiz, attempts => { Store.addXP(attempts===1?10:5, 'Comprobación: '+s.nombre); })); }
    if (D.id==='corazon') box.append(h('a',{class:'btn primary',href:'#/evaluacion/corazon'},'Evaluación interactiva del corazón'));
    return box;
  }
  function guideBox(){
    if (guideDone) return h('div',{class:'guide-step'}, h('b',{},'Exploración guiada completada.'), h('p',{class:'small'},'Puedes continuar con la exploración libre, una misión o la evaluación.'));
    const st = D.guiada[guideIdx]; const box = h('div',{class:'guide-step stack',style:'gap:8px'}, h('div',{class:'row',style:'justify-content:space-between'}, h('b',{},`Paso ${guideIdx+1} de ${D.guiada.length}`), h('span',{class:'mono small muted'},'guiada')), h('p',{class:'small',html:st.txt}));
    if (st.tipo==='text'){ const ta = h('textarea',{placeholder:'Escribe tu explicación…','aria-label':'Explicación'}); box.append(ta, h('button',{class:'btn sm primary',onclick:()=>{ if (ta.value.trim().length<40) return toast('Desarrolla un poco más tu explicación (mínimo 40 caracteres).'); Store.addNote('conclusion',`${D.nombre} · exploración guiada: `+ta.value.trim()); Store.log('respuesta_abierta',{actividad:D.guidedActivity,longitud:ta.value.length}); guideAdvance(); }},'Guardar y terminar')); }
    if (st.tipo==='anim') box.append(h('button',{class:'btn sm',onclick:()=>{ tab='animacion'; renderTab(); }},'Ir a Animación'));
    return box;
  }
  function guideAdvance(stay){ guideIdx++; if (guideIdx>=D.guiada.length){ guideDone=true; Store.completeActivity(D.guidedActivity); toast('Exploración guiada completada.'); } else if (stay) toast('Paso completado. Vuelve a Explorar para ver el siguiente.'); if (!stay) { tab='explorar'; renderTab(); } }
  function setMode(m){ mode=m; $$('button',modeSeg).forEach((b,i)=>b.setAttribute('aria-selected', (i===0)===(m==='libre'))); tab='explorar'; renderTab(); Store.log('modo_exploracion',{modelo:D.id,modo:m}); }
  function select(id, src){
    selected=id; E && E.select(id); Store.markSeen(D.id, id); Store.log('seleccion_estructura',{modelo:D.id,estructura:id,origen:src});
    if (E && src!=='modelo') E.focus(V3(S[id].pos), Math.min(E.goal.r, D.focusR));
    if (E && S[id].interno && opacity>0.6){ applyOpacity(0.35); toast('Transparencia ajustada: esta estructura está en el interior.'); }
    if (mode==='guiada' && !guideDone){ const st = D.guiada[guideIdx]; if (st.tipo==='select'){ if (st.target===id){ toast('Correcto. Siguiente paso.'); guideAdvance(); return; } else { toast(`Aún no. Has seleccionado ${S[id].nombre}. ${hint(st.target, id)}`, 5200); Store.log('respuesta',{pregunta:'guiada:'+st.target,opcion:id,correcto:false}); } } }
    const n = seen().length; if (n>=D.seenThreshold) Store.completeActivity(D.activity); if (n>=D.structures.length) Store.grantBadge(D.badge);
    if (tab!=='explorar' && tab!=='quiz') tab='explorar'; renderTab();
  }
  function hint(target, picked){ const t=S[target], p=S[picked];
    if (D.id==='corazon' && t.capa==='camaras' && p.capa==='camaras'){ const tv = t.id.startsWith('ventriculo'), pv = p.id.startsWith('ventriculo'); if (tv!==pv) return tv ? 'Los ventrículos se encuentran en la región inferior del corazón.' : 'Las aurículas se encuentran en la región superior del corazón.'; return 'Recuerda que en la vista frontal el lado derecho del corazón queda a tu izquierda.'; }
    if (D.id==='corazon' && t.capa==='vasos') return 'Busca entre los vasos: los azules traen o llevan sangre pobre en oxígeno; los rojos, sangre rica en oxígeno.';
    if (t.capa!==p.capa) return `La estructura buscada está en la capa "${(D.capas.find(c=>c.id===t.capa)||{}).n}". ${p.nombre}: ${p.n1}`;
    return `${p.nombre}: ${p.n1} Observa de nuevo la posición y la función que buscas.`; }
  renderTab();
  if (q.s && S[q.s]) { select(q.s,'busqueda'); if (q.quiz){ tab='quiz'; renderTab(); } }
  return { unmount(){ E && E.dispose(); } };
}
route('/explorar/corazon', (view,q) => organView(view, q, BIO.heart, buildHeart));
route('/explorar/cerebro', (view,q) => organView(view, q, BIO.brain, buildBrain));
route('/explorar/pulmones', (view,q) => organView(view, q, BIO.lungs, buildLungs));
route('/explorar/organo/:id', (view, p) => {
  const o = BIO.plannedOrgans.find(x=>x.id===p.id) || { em:'🫀', t:'Órgano', d:'' };
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow anat'},'Cuerpo humano · en construcción'), h('h1',{},`${o.em} ${o.t}`), h('p',{},o.d))));
  view.append(h('div',{class:'ph stack'}, h('b',{},'Este órgano aún no tiene modelo 3D.'), h('span',{},'Cuando esté disponible tendrá la misma experiencia que el corazón, el cerebro y los pulmones: Vista general → Anatomía → Funcionamiento → Explorar → ¿Qué pasaría si…? → Caso → Comprueba. El registro de contenidos y el visor ya lo admiten; solo falta el modelo y sus hotspots.')));
  view.append(h('h3',{style:'margin:20px 0 10px'},'Mientras tanto, explora'), h('div',{class:'grid g3'}, [['corazon','🫀','Corazón'],['cerebro','🧠','Cerebro'],['pulmones','🫁','Pulmones y vía aérea']].map(([id,em,t]) => h('a',{class:'tile anat',href:'#/explorar/'+id}, h('span',{class:'ico'},em), h('h3',{},t), h('p',{},`${BIO.organs[id].structures.length} estructuras · animaciones · exploración guiada`), h('span',{class:'pill anat soon'},'Disponible')))));
});
</script>
