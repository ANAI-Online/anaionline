<script>
/* ---------- EXPLORADOR CELULAR ---------- */
/* ---------- CÉLULA ANIMAL ---------- */
route('/explorar/celula', (view, q) => {
  const D = BIO.cell; const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{}, h('span',{class:'eyebrow cell'},'Mundo celular · Unidad 2 · Biología celular'), h('h1',{},'Célula animal'), h('p',{},'Cada organelo muestra su nombre, función, estructura, relaciones, una analogía y un botón "ver en acción".')), h('div',{class:'row'}, h('a',{class:'pill cell',href:'#/explorar/celula-vegetal'},'Célula vegetal →'), h('a',{class:'pill cell',href:'#/explorar/celula-procariota'},'Célula procariota →'), h('a',{class:'pill cell',href:'#/explorar/celula-comparar'},'Comparar las tres →'))));
  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  const reto = retoBanner(D.reto, 'celula-animal', 'reto-celula', id => { select(id,'reto'); stage.scrollIntoView({behavior:'smooth', block:'nearest'}); }); view.append(reto.el);
  view.append(h('div',{class:'viewer cel-viewer'}, stage, panel));
  let E=null, M=null, selected=null, tab='explorar', actionTxt='';
  if (webglOK){ try { E = new Engine3D(stage, { radius:11.2, phi:1.25, theta:0.4, minR:3, maxR:20, floor:-3.35, floorSize:9, onSelect:(id,src)=>{ if(id) select(id,src); }, onDetail:(id)=>{ if (selected!==id) select(id,'modelo'); detail.enter(id); } }); M = buildCell(E); celFitAspect(E, stage); if (D.anchors !== false) D.structures.forEach(st => { const a = st.anchor || st.pos; if (a && !st.noLead) E.setAnchor(st.id, a); }); } catch(e){ console.warn(e); E=null; } }
  const detail = makeDetail(E, stage, S, () => renderTab());
  stageChrome(stage, E, { left:h('span',{class:'pill cell'},'Célula animal'), model:'celula-animal', captureTxt:()=>`Captura de la célula animal 3D${selected?` · ${S[selected].nombre}`:''}` });
  if (!E) stage.append(h('div',{class:'ph',style:'margin:60px 24px'},'WebGL no disponible. Usa la lista de componentes para explorar la célula.'));
  const tabs = h('div',{class:'tabs',role:'tablist'}); const tabBody = h('div',{class:'stack'});
  [['explorar','Explorar'],['capas','Capas'],['quiz','Quiz visual']].forEach(([id,t]) => tabs.append(h('button',{role:'tab','aria-selected':id===tab,onclick:()=>{ tab=id; renderTab(); }},t)));
  panel.append(h('div',{class:'card'},tabs,h('div',{style:'height:12px'}),tabBody));
  const listEl = h('ul',{class:'struct-list','aria-label':'Componentes de la célula'});
  function renderList(){ listEl.innerHTML=''; const seen = Store.s.seen['celula-animal']||[]; D.structures.forEach(s => listEl.append(h('li',{}, h('button',{'aria-pressed':selected===s.id,onclick:()=>select(s.id,'lista')}, h('span',{class:'sw',style:`background:${s.color}`}), s.nombre, seen.includes(s.id)?h('span',{class:'seen'},'✓'):null)))); }
  function card(s){
    const seenN = (Store.s.seen['celula-animal']||[]).length;
    const more = h('div',{class:'stack',style:'display:none'}, h('div',{class:'q'},'Nivel 3 · Profundizar'), h('p',{},s.n3));
    const act = h('div',{class:'notice info',style:actionTxt?'':'display:none'}, actionTxt);
    return h('div',{class:'hcard stack',style:'gap:4px'},
      h('div',{class:'row',style:'justify-content:space-between'}, h('span',{class:'pill cell'},'Organelo / componente'), h('span',{class:'mono small muted'},`${seenN}/${D.structures.length} explorados`)),
      h('div',{class:'row',style:'justify-content:space-between;align-items:flex-start;flex-wrap:nowrap'}, h('h3',{},s.nombre), h('button',{class:'btn sm primary',style:'flex:none',onclick:()=>detail.enter(s.id)},'🔍 Ver en detalle')),
      s.partes ? h('p',{class:'small muted'},`${s.partes.length} partes para descubrir en la vista en detalle · también con doble clic`) : null,
      h('div',{class:'q'},'Función'), h('p',{},s.funcion),
      h('div',{class:'q'},'Estructura'), h('p',{},s.estructura),
      h('div',{class:'q'},'Relaciones'), h('p',{},s.relaciones),
      h('div',{class:'q'},'Analogía'), h('p',{style:'font-style:italic'},s.analogia),
      more,
      h('div',{class:'ctrl-row',style:'margin-top:10px'},
        h('button',{class:'btn sm',onclick:()=>{ if (!M) return toast('Requiere el modelo 3D.'); actionTxt = `${s.accion.t}: ${s.accion.d} ` + (M.action(s.id)||''); act.textContent = actionTxt; act.style.display=''; Store.log('animacion',{modelo:'celula-animal',estructura:s.id,accion:s.accion.t}); }},'Ver en acción'),
        h('button',{class:'btn sm',onclick:()=>{ more.style.display = more.style.display==='none'?'':'none'; Store.log('nivel_profundidad',{estructura:s.id,nivel:'3'}); }},'Profundizar'),
        h('button',{class:'btn sm',onclick:()=>{ if(!E) return; D.structures.forEach(x=>E.setVisible(x.id, x.id===s.id || x.id==='membrana')); toast(`Aislado: ${s.nombre}. Capas → Mostrar todo para volver.`); }},'Aislar'),
        h('button',{class:'btn sm ghost',onclick:()=>{ Store.addNote('observacion', `${s.nombre}: ${s.funcion} Analogía: ${s.analogia}`); toast('Guardado en tu cuaderno.'); }},'Guardar en cuaderno')),
      act);
  }
  function layersBox(){
    const box = h('div',{class:'stack'});
    const mo = E && E.parts.get('membrana') ? Math.round((E.parts.get('membrana').opacity ?? 1)*100) : 100; const op = h('input',{type:'range',min:0,max:100,value:mo,id:'memb-op'}); const opOut = h('output',{},mo+' %'); op.addEventListener('input',()=>{ opOut.value=op.value+' %'; E && E.setOpacity('membrana', op.value/100); });
    const ex = h('input',{type:'range',min:0,max:100,value:0,id:'cell-ex'}); const exOut = h('output',{},'0 %'); ex.addEventListener('input',()=>{ exOut.value=ex.value+' %'; E && E.setExplode(ex.value/100); });
    if (M && M.setCutaway){ const cutIn = h('input',{type:'checkbox',checked:M.cutaway}); cutIn.addEventListener('change',()=>{ M.setCutaway(cutIn.checked); Store.log('vista_corte',{modelo:'celula-animal',activa:cutIn.checked}); }); box.append(h('label',{class:'toggle'},cutIn,'Vista en corte (se retira una cuña para ver el interior)')); }
    box.append(h('div',{class:'slider'}, h('label',{for:'memb-op'},'Opacidad de la membrana'), opOut, op), h('div',{class:'slider'}, h('label',{for:'cell-ex'},'Separar organelos'), exOut, ex));
    const lay = h('div',{class:'layers'}); D.structures.forEach(s => lay.append(h('label',{class:'toggle'}, h('input',{type:'checkbox',checked:E?E.parts.get(s.id).visible:true,onchange:e=>E&&E.setVisible(s.id,e.target.checked)}), s.nombre)));
    box.append(h('span',{class:'eyebrow'},'Componentes visibles'), lay, h('button',{class:'btn sm',onclick:()=>{ D.structures.forEach(s=>E&&E.setVisible(s.id,true)); renderTab(); }},'Mostrar todo'));
    return box;
  }
  const VQ = [ {target:'mitocondria', q:'Selecciona en el modelo el organelo que produce la mayor parte del ATP.'}, {target:'nucleo', q:'Selecciona la estructura que contiene el ADN y controla la actividad celular.'}, {target:'golgi', q:'Selecciona el organelo que empaqueta y envía proteínas en vesículas.'}, {target:'lisosomas', q:'Selecciona los organelos encargados de la digestión celular.'} ];
  let vq=0, vqAttempts=0, vqScore=0, vqActive=false;
  function quizBox(){
    const box = h('div',{class:'stack'});
    if (vq>=VQ.length){ box.append(h('div',{class:'notice ok'},`Quiz visual completado: ${vqScore}/${VQ.length} al primer intento.`)); vqActive=false; return box; }
    vqActive=true; box.append(h('span',{class:'eyebrow'},`Quiz visual · ${vq+1} de ${VQ.length}`), h('p',{style:'font-weight:600'},VQ[vq].q), h('p',{class:'small muted'},'Haz clic directamente sobre el organelo en el modelo 3D (o usa la lista de componentes).'));
    return box;
  }
  function renderTab(){ $$('button',tabs).forEach((b,i)=>b.setAttribute('aria-selected', ['explorar','capas','quiz'][i]===tab)); tabBody.innerHTML='';
    if (tab==='explorar' && detail.id){ tabBody.append(h('h3',{},S[detail.id].nombre), detail.panel()); return; }
    if (tab==='explorar'){ tabBody.append(selected ? card(S[selected]) : h('div',{class:'notice'},'Selecciona un organelo en el modelo o en la lista. La membrana es translúcida: haz clic a través de ella.')); tabBody.append(h('div',{}, h('span',{class:'eyebrow'},'Componentes'), listEl)); renderList(); }
    else if (tab==='capas') tabBody.append(layersBox()); else tabBody.append(quizBox()); }
  function select(id, src){
    if (vqActive && tab==='quiz'){ vqAttempts++; const t = VQ[vq].target; if (id===t){ if (vqAttempts===1) vqScore++; toast(`Correcto: ${S[id].nombre}.`); Store.log('respuesta',{pregunta:VQ[vq].q,opcion:id,correcto:true,intento:vqAttempts}); vq++; vqAttempts=0; if (vq>=VQ.length){ Store.addXP(40,'Quiz visual de la célula'); } renderTab(); } else { toast(`Aún no. Has seleccionado ${S[id].nombre}, cuya función es: ${S[id].funcion.split('.')[0].toLowerCase()}. Inténtalo nuevamente.`, 5500); Store.log('respuesta',{pregunta:VQ[vq].q,opcion:id,correcto:false,intento:vqAttempts}); } E && E.select(id); return; }
    if (detail.id && detail.id !== id) detail.exit();
    selected=id; actionTxt=''; M && M.stop(); E && E.select(id); Store.markSeen('celula-animal', id); reto.render(); Store.log('seleccion_estructura',{modelo:'celula-animal',estructura:id,origen:src});
    const seen = Store.s.seen['celula-animal'].length; if (seen>=6) Store.completeActivity('explorar-celula'); if (seen>=D.structures.length) Store.grantBadge('explorador-celular');
    tab='explorar'; renderTab();
  }
  renderTab();
  if (q.s && S[q.s]){ select(q.s,'busqueda'); if (q.accion && M){ actionTxt = `${S[q.s].accion.t}: ${S[q.s].accion.d} ` + (M.action(q.s)||''); renderTab(); } }
  return { unmount(){ E && E.dispose(); } };
});
</script>
