<style>
/* Laboratorio de fotosíntesis: escena ilustrada (v1.7, prefijo lab-esc) */
.lab-esc{border-radius:12px;overflow:hidden;border:1px solid var(--line);background:var(--bg-2);line-height:0}
</style>
<script>
/* =====================================================================
   SIMULADORES · SIMULADOR CARDIORRESPIRATORIO
   ===================================================================== */
route('/simuladores', (view) => {
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow anat'},'Simuladores · transversal'), h('h1',{},'Cambia una variable. Observa el sistema.'), h('p',{},'Modelos cuantitativos simplificados que responden en tiempo real. Son transversales: un mismo simulador integra conceptos de varias áreas. Cada uno te plantea un reto concreto.'))));
  const g = h('div',{class:'grid g3'});
  const sim = BIO.resources.find(r=>r.id==='sim-circulacion'); g.append(resTile(sim));
  [['lab','🌿','Fotosíntesis','Luz, CO₂, temperatura y agua sobre la tasa fotosintética.','#/laboratorio/fotosintesis',true,['celular','biodiversidad'],'Encuentra el factor que limita la fotosíntesis.'],['eco','🌎','Ecosistema','Productores, consumidores, depredadores y recursos: dinámica de poblaciones.','#/explorar/poblaciones',true,['biodiversidad','genetica'],'Encuentra las condiciones que llevan a una población al equilibrio o al colapso.'],['cell','💧','Ósmosis','Concentración de soluciones y movimiento de agua a través de la membrana.','#/explorar/procesos',true,['celular','cuerpo'],'Predice qué le pasa a un glóbulo rojo en agua pura y en agua de mar.']].forEach(([d,em,t,s2,href,ok,ids,reto]) => g.append(h('a',{class:`tile res ${d}`+(ok?'':' planned'),href}, h('span',{class:'ico'},em), h('span',{class:'tipo'},'Simulador · transversal'), h('h3',{},t), h('p',{},s2), h('div',{class:'res-reto'}, h('b',{},ok?'🎯 Tu reto':'🎯 Propósito'), h('span',{},reto)), areaTags(ids), ok?h('span',{class:`pill ${d} soon`},'Disponible (laboratorio)'):h('span',{class:'pill soon'},'Fase 2'))));
  view.append(g);
});

route('/simuladores/circulacion', (view) => {
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{}, h('span',{class:'eyebrow anat'},'Simulador transversal · Cuerpo humano y salud · Mundo celular'), h('h1',{},'¿Le llega suficiente oxígeno al cuerpo?'), h('p',{},'Ajusta la actividad física y la respiración. El modelo calcula la frecuencia cardíaca, el gasto cardíaco, la ventilación y compara el oxígeno que llega con el que los tejidos demandan.')), h('span',{class:'pill'},'Modelo cuantitativo simplificado')));
  const retoSt = h('div',{class:'notice'},'Pendiente: sube la actividad a 80 % o más y ajusta la frecuencia respiratoria.');
  const simDone = () => !!Store.s.activities['reto-simulador']?.done; if (simDone()){ retoSt.className='notice ok'; retoSt.textContent='Reto resuelto ✓'; }
  view.append(purposeBanner({ proposito:'Comprender cómo el corazón y los pulmones se ajustan juntos a la demanda de oxígeno de los tejidos.', observa:['Qué cambia en el corazón y en la respiración al subir la actividad física','Cómo afectan la anemia o la altitud al aporte de O₂'], reto:'Con 80 % de actividad física, encuentra la frecuencia respiratoria mínima con la que la ventilación deja de ser insuficiente.', statusEl:retoSt }));
  const state = { act:0, fr:12, cond:'normal' };
  const COND = { normal:{n:'Condición normal', hb:15, sat:98, d:'Hemoglobina 15 g/dL · saturación 98 %'}, anemia:{n:'Anemia (menos glóbulos rojos)', hb:8, sat:98, d:'Hemoglobina 8 g/dL: la sangre transporta casi la mitad de O₂'}, altitud:{n:'Altitud 3.000 m (Quito)', hb:15, sat:90, d:'Menos presión de O₂ en el aire: saturación 90 %'}, alveolos:{n:'Alvéolos dañados', hb:15, sat:84, d:'Intercambio gaseoso deficiente: saturación 84 %'} };
  function calc(){ const c = COND[state.cond]; const fc = Math.round(65 + 1.15*state.act); const vs = Math.min(105, 70 + 0.35*state.act); const gc = fc*vs/1000; const vo2 = 250 + 28*state.act; const cao2 = 1.34*c.hb*c.sat/100; const do2 = gc*10*cao2; const vc = 500 + 20*state.act; const vm = state.fr*vc/1000; const vmReq = vo2*0.022; return { fc, vs, gc, vo2, do2, vm, vmReq, vc, ratio: do2/vo2, vent: vm/vmReq, sat:c.sat }; }
  const ctrls = h('div',{class:'card stack'}), viz = h('div',{class:'simviz'}), read = h('div',{class:'readouts'}), status = h('div',{class:'stack'}), chartWrap = h('div',{class:'card',style:'padding:12px'}), chart = h('canvas',{class:'chart',style:'height:220px'});
  const mk = (id,label,min,max,val,unit,fmt) => { const inp = h('input',{type:'range',min,max,value:val,id}); const out = h('output',{},(fmt||(v=>v))(val)+unit); inp.addEventListener('input',()=>{ out.value=(fmt||(v=>v))(inp.value)+unit; state[id==='s-act'?'act':'fr']=+inp.value; update(); Store.log('simulador',{modelo:'circulacion',variable:id,valor:+inp.value}); }); return { el:h('div',{class:'slider'}, h('label',{for:id},label), out, inp), inp, out }; };
  const sAct = mk('s-act','Actividad física',0,100,0,' %'), sFr = mk('s-fr','Frecuencia respiratoria',8,45,12,' resp/min');
  const sel = h('select',{id:'s-cond','aria-label':'Condición'}); Object.entries(COND).forEach(([k,c])=>sel.append(h('option',{value:k},c.n))); sel.addEventListener('change',()=>{ state.cond=sel.value; update(); Store.log('simulador',{modelo:'circulacion',variable:'condicion',valor:sel.value}); });
  ctrls.append(h('span',{class:'eyebrow'},'Variables'), sAct.el, sFr.el, h('div',{class:'field'}, h('label',{for:'s-cond'},'Condición'), sel), h('p',{class:'small muted',id:'cond-d'}), h('div',{class:'notice'},'Sugerencia: sube la actividad al 80 % sin cambiar la respiración. ¿Qué ocurre? Luego ajusta la respiración hasta equilibrar.'));
  // Escenario ¿Qué pasaría si…?
  const wi = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'¿Qué pasaría si…?'), h('p',{style:'font-weight:600'},'…disminuyera la cantidad de glóbulos rojos y la persona hiciera ejercicio moderado?'));
  let predicted=null; const wfb = h('div',{class:'notice',style:'display:none'});
  const preds = [['El corazón tendría que latir más rápido para compensar y aun así podría faltar O₂ en esfuerzo',true],['No cambiaría nada, porque los pulmones seguirían funcionando bien',false],['Aumentaría la cantidad de O₂ por la sangre para compensar',false]];
  preds.forEach(([t,ok],i)=>wi.append(h('button',{class:'opt',onclick:function(){ if (predicted!==null) return; predicted=ok; $$('.opt',wi).forEach(b=>b.disabled=true); this.classList.add(ok?'ok':'bad'); runBtn.style.display=''; Store.log('prediccion',{escenario:'anemia',correcto:ok}); }}, h('span',{class:'k'},String.fromCharCode(65+i)), t)));
  const runBtn = h('button',{class:'btn primary sm',style:'display:none;align-self:flex-start',onclick:()=>{ state.cond='anemia'; state.act=70; state.fr=28; sel.value='anemia'; sAct.inp.value=70; sAct.out.value='70 %'; sFr.inp.value=28; sFr.out.value='28 resp/min'; update(); const r = calc(); wfb.className='notice '+(predicted?'ok':'warn'); wfb.innerHTML = `<span><b>Resultado del escenario:</b> con hemoglobina de 8 g/dL, al 70 % de actividad el aporte de O₂ es ${Math.round(r.do2)} mL/min frente a una demanda de ${Math.round(r.vo2)} mL/min (${(r.ratio*100).toFixed(0)} %). La frecuencia cardíaca sube a ${r.fc} lpm, pero cada litro de sangre lleva menos O₂. ${predicted ? 'Tu predicción fue correcta.' : 'Compara con tu predicción: los pulmones funcionan, pero el transporte (hemoglobina) es el límite; la sangre no puede "llevar más O₂" sin más hemoglobina.'} Síntomas típicos: fatiga, palpitaciones, falta de aire.</span>`; wfb.style.display='flex'; caseDone.s=true; checkComplete(); }},'Ejecutar escenario');
  wi.append(runBtn, wfb);
  // Caso
  const caseDone = { s:false, c:false };
  const cs = h('div',{class:'card stack'}, h('span',{class:'eyebrow'},'Caso'), h('p',{},'Un estudiante realiza actividad física intensa. Su frecuencia cardíaca y respiratoria aumentan considerablemente.'));
  cs.append(quizBlock({ q:'¿Por qué aumentan ambas frecuencias a la vez?', ops:['Porque el ejercicio calienta el cuerpo y los órganos se aceleran','Porque los músculos consumen más O₂ y producen más CO₂; el sistema nervioso ajusta corazón y pulmones para mantener el equilibrio interno','Porque el corazón necesita más oxígeno para sí mismo'], ok:1, fb:'Sensores detectan el aumento de CO₂ (y la caída del pH) en la sangre; el centro respiratorio y el sistema nervioso autónomo aumentan la ventilación y el gasto cardíaco. Es homeostasis en acción: intervienen los sistemas muscular, circulatorio, respiratorio y nervioso.', wrong:['La temperatura influye, pero la señal principal es química: CO₂ y pH en sangre.','El corazón sí consume más O₂, pero el gran aumento de demanda viene de los músculos esqueléticos.'] }, ()=>{ caseDone.c=true; checkComplete(); }));
  const ta = h('textarea',{placeholder:'A nivel celular, ¿qué está ocurriendo en las fibras musculares? Menciona la mitocondria, el O₂, el CO₂ y el ATP…','aria-label':'Respuesta abierta'});
  cs.append(h('div',{class:'field'}, h('label',{},'¿Qué está ocurriendo a nivel celular?'), ta, h('button',{class:'btn sm',style:'align-self:flex-start',onclick:()=>{ if (ta.value.trim().length<40) return toast('Desarrolla tu respuesta (mínimo 40 caracteres).'); Store.addNote('conclusion','Caso ejercicio intenso, nivel celular: '+ta.value.trim()); toast('Guardado en tu cuaderno. Tu docente podrá revisarlo.'); Store.log('respuesta_abierta',{actividad:'sim-circulacion',longitud:ta.value.length}); }},'Guardar en cuaderno')));
  function checkComplete(){ if (caseDone.s && caseDone.c) Store.completeActivity('sim-circulacion'); }
  const layout = h('div',{class:'sim'}, h('div',{class:'stack'}, ctrls, wi), h('div',{class:'stack'}, viz, read, status, chartWrap));
  chartWrap.append(h('span',{class:'eyebrow'},'Aporte de O₂ vs. demanda · últimos 60 s'), chart);
  view.append(layout, h('div',{style:'height:16px'}), cs);
  // canvas viz
  const cv = h('canvas',{role:'img','aria-label':'Circuito de la sangre: los pulmones oxigenan la sangre (mitad derecha, roja), los tejidos consumen el O₂ (abajo) y la sangre vuelve con menos oxígeno (mitad izquierda, azul). El corazón late a la frecuencia calculada; los valores exactos están en las lecturas.'}); viz.append(cv); const ctx = cv.getContext('2d'); let raf, t0=performance.now(), last=t0, parts=[]; for (let i=0;i<40;i++) parts.push({ t:i/40 });
  const history = []; let histT = 0;
  let cssW = 1, cssH = 1;                                   /* tamaño CSS del lienzo (el recorrido se calcula en px CSS, no en px del dispositivo) */
  function loopPath(u){ // figura: pulmones arriba (y=60), corazón centro, tejidos abajo; recorrido en "8" simplificado a un óvalo
    const W = cssW, H = cssH; const cx=W/2, cy=H/2; const a = (u*Math.PI*2); return { x: cx + Math.sin(a)*(W*0.34), y: cy - Math.cos(a)*(H*0.36), oxy: u<0.5 }; }
  /* --- piezas ilustradas del circuito (solo dibujo) --- */
  const circLung = (x, y, k, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s*k, k);
    const g = ctx.createRadialGradient(10,-10,3,14,2,34); g.addColorStop(0,'#FBD3CB'); g.addColorStop(.6,'#EC9C92'); g.addColorStop(1,'#C9665D');
    ctx.fillStyle = g; ctx.strokeStyle = '#A9534B'; ctx.lineWidth = 1.3/k;
    ctx.beginPath(); ctx.moveTo(5,-30); ctx.bezierCurveTo(20,-30,34,-6,35,16); ctx.bezierCurveTo(36,27,27,31,14,27); ctx.bezierCurveTo(6,25,3,17,4,7); ctx.bezierCurveTo(5,-6,0,-18,5,-30); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(255,255,255,.22)'; for (let i=0;i<22;i++){ const px = 8 + (i*37%26), py = -22 + (i*53%46); ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI*2); ctx.fill(); } ctx.restore();
    ctx.strokeStyle = 'rgba(160,70,62,.55)'; ctx.lineWidth = 1/k; ctx.beginPath(); ctx.moveTo(8,-4); ctx.bezierCurveTo(16,0,24,4,32,6); ctx.stroke();
    ctx.strokeStyle = '#E9DCCB'; ctx.lineWidth = 2.6/k; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1,-14); ctx.quadraticCurveTo(8,-8,12,2); ctx.moveTo(8,-6); ctx.lineTo(18,-10); ctx.moveTo(11,0); ctx.lineTo(20,6); ctx.moveTo(12,2); ctx.lineTo(14,14); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(16,-12,4,9,-0.5,0,Math.PI*2); ctx.fill();
    ctx.restore(); };
  const circHeart = (x, y, k) => { ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.lineCap = 'round';
    ctx.strokeStyle = '#C0392F'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-2,-18); ctx.bezierCurveTo(-3,-32,8,-38,18,-35); ctx.bezierCurveTo(25,-33,28,-27,27,-22); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(2,-22); ctx.bezierCurveTo(4,-31,10,-34,17,-33); ctx.stroke();
    ctx.strokeStyle = '#4C6DBE'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-15,-14); ctx.lineTo(-16,-33); ctx.stroke();
    ctx.strokeStyle = '#5E7DCC'; ctx.lineWidth = 6.5; ctx.beginPath(); ctx.moveTo(6,-17); ctx.bezierCurveTo(4,-26,-2,-29,-8,-28); ctx.stroke();
    const hg = ctx.createRadialGradient(-8,-8,2,0,0,32); hg.addColorStop(0,'#F07A6E'); hg.addColorStop(.55,'#C4362D'); hg.addColorStop(1,'#7A1A16');
    ctx.fillStyle = hg; ctx.strokeStyle = '#661310'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-1,-17); ctx.bezierCurveTo(14,-24,30,-12,27,4); ctx.bezierCurveTo(25,18,12,26,3,33); ctx.bezierCurveTo(-8,26,-26,15,-27,-1); ctx.bezierCurveTo(-28,-14,-15,-21,-1,-17); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#EDC26A'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(5,-15); ctx.bezierCurveTo(10,-3,8,14,4,28); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-19,-9); ctx.bezierCurveTo(-22,-3,-22,4,-19,9); ctx.stroke();
    ctx.restore(); };
  const circTissue = (tx, ty, w, hh, oxy, deoxy) => { ctx.save();
    const sh = ctx.createRadialGradient(tx+w/2, ty+hh+4, 2, tx+w/2, ty+hh+4, w*0.6); sh.addColorStop(0,'rgba(0,0,0,.22)'); sh.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle = sh; ctx.fillRect(tx-10, ty+hh-6, w+20, 18);
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(tx,ty,w,hh,12) : ctx.rect(tx,ty,w,hh); ctx.clip();
    const mg = ctx.createLinearGradient(0,ty,0,ty+hh); mg.addColorStop(0,'#D8746B'); mg.addColorStop(1,'#9E3D38'); ctx.fillStyle = mg; ctx.fillRect(tx,ty,w,hh);
    ctx.strokeStyle = 'rgba(90,20,20,.35)'; ctx.lineWidth = 1; for (let i=4;i<hh;i+=5){ ctx.beginPath(); ctx.moveTo(tx, ty+i); ctx.bezierCurveTo(tx+w*0.3, ty+i-2, tx+w*0.7, ty+i+2, tx+w, ty+i); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(255,255,255,.12)'; for (let i=0;i<w;i+=7){ ctx.beginPath(); ctx.moveTo(tx+i, ty); ctx.lineTo(tx+i, ty+hh); ctx.stroke(); }
    const cg = ctx.createLinearGradient(tx+w, 0, tx, 0); cg.addColorStop(0, oxy); cg.addColorStop(1, deoxy);
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 4.2; ctx.lineCap = 'round';
    for (let j=0;j<3;j++){ const yy = ty + hh*(0.28 + j*0.22); ctx.beginPath(); ctx.moveTo(tx+w, yy); for (let x=w; x>=0; x-=6) ctx.lineTo(tx+x, yy + Math.sin(x*0.16 + j*1.7)*3.2); ctx.stroke(); }
    ctx.strokeStyle = cg; ctx.lineWidth = 2.4;
    for (let j=0;j<3;j++){ const yy = ty + hh*(0.28 + j*0.22); ctx.beginPath(); ctx.moveTo(tx+w, yy); for (let x=w; x>=0; x-=6) ctx.lineTo(tx+x, yy + Math.sin(x*0.16 + j*1.7)*3.2); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(tx, ty, w, hh*0.3);
    ctx.restore();
    ctx.strokeStyle = 'rgba(100,30,28,.6)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(tx,ty,w,hh,12) : ctx.rect(tx,ty,w,hh); ctx.stroke(); };
  const circRBC = (x, y, ang, col, alpha) => { ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y); ctx.rotate(ang);
    ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0,0,7,5,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(0.4,0.3,3.2,2.1,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.ellipse(-2.8,-2,2.1,1.2,-0.3,0,Math.PI*2); ctx.fill();
    ctx.restore(); };
  function draw(now){
    raf = requestAnimationFrame(draw); if (document.hidden) return; const dt = Math.min((now-last)/1000, 0.05); last = now;
    const r = calc(); const dpr = Math.min(devicePixelRatio||1,2); const W = viz.clientWidth; const H = Math.round(Math.min(460, Math.max(340, W*0.6)));
    if (cv.width!==Math.round(W*dpr) || cv.height!==Math.round(H*dpr)){ cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr); cv.style.height = H+'px'; }
    cssW = W; cssH = H;
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,W,H);
    const ink=cssVar('--ink'), ink3=cssVar('--ink-3'), line=cssVar('--line-2'), oxy=cssVar('--oxy'), deoxy=cssVar('--deoxy'), bg3=cssVar('--bg-3');
    const cx=W/2, cy=H/2, rx=W*0.34, ry=H*0.36;
    // fondo: interior del circuito
    ctx.globalAlpha=.55; ctx.beginPath(); ctx.ellipse(cx,cy,rx-10,ry-10,0,0,Math.PI*2); ctx.fillStyle=bg3; ctx.fill(); ctx.globalAlpha=1;
    // pista: vaso sanguíneo con pared, luz translúcida y brillo (mitad arterial derecha, mitad venosa izquierda)
    ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.strokeStyle=line; ctx.lineWidth=22; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.strokeStyle=cssVar('--bg-2'); ctx.lineWidth=17; ctx.stroke();
    ctx.globalAlpha=.34; ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,-Math.PI/2,Math.PI/2); ctx.strokeStyle=oxy; ctx.lineWidth=17; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,Math.PI/2,Math.PI*1.5); ctx.strokeStyle=deoxy; ctx.stroke();
    ctx.globalAlpha=.16; ctx.beginPath(); ctx.ellipse(cx,cy,rx+5,ry+5,0,0,Math.PI*2); ctx.strokeStyle='#000'; ctx.lineWidth=4; ctx.stroke();
    ctx.globalAlpha=.5; ctx.beginPath(); ctx.ellipse(cx,cy,rx-5,ry-5,0,0,Math.PI*2); ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke(); ctx.globalAlpha=1;
    // flechas del sentido del flujo
    ctx.fillStyle=ink3; [0.12,0.37,0.62,0.87].forEach(u => { const p0 = loopPath(u), p1 = loopPath(u+0.01); const a = Math.atan2(p1.y-p0.y, p1.x-p0.x); ctx.save(); ctx.translate(p0.x,p0.y); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(5,0); ctx.lineTo(-3,-4.5); ctx.lineTo(-1,0); ctx.lineTo(-3,4.5); ctx.closePath(); ctx.fill(); ctx.restore(); });
    // pulmones (arriba) y tejidos (abajo), corazón centro
    const breath = 1 + 0.08*Math.sin((now-t0)/1000*r.fc/60*Math.PI*2*(state.fr/r.fc)); const beat = 1 + 0.1*Math.max(0,Math.sin((now-t0)/1000*r.fc/60*Math.PI*2));
    const bk = motionOK() ? breath : 1;
    // tráquea con anillos de cartílago
    ctx.lineCap='round'; ctx.strokeStyle='#DCCBB6'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(cx,cy-ry-30); ctx.lineTo(cx,cy-ry-6); ctx.stroke();
    ctx.strokeStyle='#B9A58D'; ctx.lineWidth=1.2; for (let i=0;i<5;i++){ const yy = cy-ry-28+i*4.5; ctx.beginPath(); ctx.moveTo(cx-3,yy); ctx.lineTo(cx+3,yy); ctx.stroke(); }
    circLung(cx-6, cy-ry+6, bk, -1); circLung(cx+6, cy-ry+6, bk, 1);
    { const hk = motionOK()?beat:1; const gl = ctx.createRadialGradient(cx,cy-2,4,cx,cy-2,46*hk); gl.addColorStop(0,'rgba(230,80,70,.28)'); gl.addColorStop(1,'rgba(230,80,70,0)'); ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(cx,cy-2,46*hk,0,Math.PI*2); ctx.fill(); circHeart(cx, cy-2, hk); }
    circTissue(cx-66, cy+ry-20, 132, 40, oxy, deoxy);
    ctx.fillStyle=ink; ctx.font='600 12px "IBM Plex Sans", sans-serif'; ctx.textAlign='center'; ctx.fillText('Pulmones · '+state.fr+' resp/min', cx, cy-ry-36); ctx.fillText('Tejidos · demanda '+Math.round(r.vo2)+' mL O₂/min', cx, cy+ry+38);
    ctx.font='700 11px "IBM Plex Sans", sans-serif'; ctx.lineWidth=3; ctx.strokeStyle='rgba(90,15,12,.8)'; ctx.lineJoin='round'; ctx.strokeText(r.fc+' lpm', cx, cy+4); ctx.fillStyle='#fff'; ctx.fillText(r.fc+' lpm', cx, cy+4);
    ctx.fillStyle=ink3; ctx.font='11px "IBM Plex Mono", monospace'; ctx.fillText('gasto cardíaco '+r.gc.toFixed(1)+' L/min', cx, cy+50);
    if (W >= 560){ ctx.textAlign='left'; ctx.fillText('sat. '+r.sat+' %', cx+rx+14, cy-ry*0.5); ctx.textAlign='right'; ctx.fillText('O₂ entregado', cx-rx-14, cy+ry*0.5); }
    else { ctx.textAlign='right'; ctx.fillText('sat. '+r.sat+' %', W-10, 22); ctx.textAlign='left'; ctx.fillText('O₂ entregado', 10, H-34); }
    // partículas: glóbulos rojos con forma bicóncava y brillo
    const speed = motionOK() ? r.gc/5*0.08 : 0; parts.forEach(p => { p.t = (p.t + speed*dt) % 1; const q = loopPath(p.t); const inOxy = (p.t<0.5); const deliver = r.ratio<1 && p.t>0.5 && Math.random()<0.5; const q2 = loopPath(p.t+0.004); circRBC(q.x, q.y, Math.atan2(q2.y-q.y, q2.x-q.x), inOxy ? oxy : deoxy, inOxy ? (0.5+0.5*Math.min(1,r.ratio)) : 0.85); }); ctx.globalAlpha=1;
    // historial
    histT += dt; if (histT>0.5){ histT=0; history.push({ t:Date.now(), do2:r.do2, vo2:r.vo2 }); if (history.length>120) history.shift(); drawHist(); }
  }
  function drawHist(){ const now = Date.now(); lineChart(chart, { series:[ { label:'Aporte de O₂', color:cssVar('--oxy'), pts: history.map(p=>({x:(p.t-now)/1000, y:p.do2})) }, { label:'Demanda de O₂', color:cssVar('--ink-3'), pts: history.map(p=>({x:(p.t-now)/1000, y:p.vo2})) } ], xmin:-60, xmax:0, ymin:0, ymax:4200, xfmt:v=>Math.round(v)+' s', yfmt:v=>Math.round(v), tipfmt:v=>Math.round(v)+' mL O₂/min', ylabel:'mL O₂/min', xticks:6 }); }
  function checkReto(r){ if (simDone()) return; if (state.act>=80 && state.cond==='normal'){ if (r.vent>=0.85 && r.vent<=0.96){ Store.completeActivity('reto-simulador',{score:`${state.fr} resp/min`}); retoSt.className='notice ok'; retoSt.innerHTML=`<span><b>¡Reto resuelto!</b> Con ${state.act} % de actividad necesitas al menos ~${state.fr} resp/min: el volumen de cada respiración ya aumentó, pero no basta; la frecuencia también debe subir para expulsar el CO₂ extra que producen los músculos.</span>`; } else if (r.vent>0.96){ retoSt.className='notice warn'; retoSt.textContent='La ventilación ya es suficiente, pero ¿es la frecuencia mínima? Baja de una en una hasta el límite.'; } else { retoSt.className='notice'; retoSt.textContent='Todavía hay hipoventilación: sube la frecuencia respiratoria.'; } } }
  function update(){ const r = calc(); checkReto(r); $('#cond-d',ctrls).textContent = COND[state.cond].d; read.innerHTML='';
    [[r.fc,'lpm','Frecuencia cardíaca'],[r.gc.toFixed(1),'L/min','Gasto cardíaco'],[r.vm.toFixed(1),'L/min','Ventilación pulmonar'],[Math.round(r.do2),'mL/min','O₂ que llega a los tejidos']].forEach(([v,u,l]) => read.append(h('div',{class:'readout'}, h('div',{class:'v'},v,' ',h('span',{class:'u'},u)), h('div',{class:'l'},l))));
    status.innerHTML='';
    const o2 = r.ratio>=1.05 ? ['ok','Aporte de O₂ suficiente',`Llega ${(r.ratio*100).toFixed(0)} % de lo que demandan los tejidos.`] : r.ratio>=0.9 ? ['warn','Aporte de O₂ al límite',`Llega ${(r.ratio*100).toFixed(0)} % de la demanda. Los músculos empezarán a usar fermentación láctica.`] : ['bad','Déficit de O₂',`Solo llega ${(r.ratio*100).toFixed(0)} % de la demanda: fatiga, ácido láctico, disnea. El cuerpo no puede sostener esta intensidad.`];
    const vt = r.vent<0.85 ? ['warn','Hipoventilación',`Ventilas ${r.vm.toFixed(1)} L/min y necesitas ~${r.vmReq.toFixed(1)}. El CO₂ se acumula y el pH baja: sentirás una urgencia intensa por respirar más.`] : r.vent>1.7 ? ['warn','Hiperventilación',`Ventilas más de lo necesario (~${r.vmReq.toFixed(1)} L/min): expulsas demasiado CO₂, lo que puede producir mareo y hormigueo.`] : ['ok','Ventilación adecuada',`Ventilas ${r.vm.toFixed(1)} L/min frente a ~${r.vmReq.toFixed(1)} necesarios.`];
    [o2,vt].forEach(([k,t,d]) => status.append(h('div',{class:'notice '+k}, h('span',{}, h('b',{},t+'. '), d))));
  }
  update(); raf = requestAnimationFrame(draw); drawHist();
  return { unmount(){ cancelAnimationFrame(raf); } };
});

/* =====================================================================
   LABORATORIOS · FOTOSÍNTESIS
   ===================================================================== */
route('/laboratorio', (view) => {
  view.append(h('div',{class:'page-head'}, h('div',{}, h('span',{class:'eyebrow lab'},'Laboratorios · transversal'), h('h1',{},'Experimenta como un investigador'), h('p',{},'Pregunta → hipótesis → materiales → procedimiento → variables → experimentación → resultados → representación → análisis → conclusión. Cada laboratorio conecta varias áreas y parte de una pregunta que debes resolver.'))));
  const g = h('div',{class:'grid g3'});
  g.append(resTile(BIO.resources.find(r=>r.id==='lab-fotosintesis')));
  (BIO.labsFase2 || []).forEach(L => g.append(h('a',{class:'tile res lab',href:L.href},
    h('span',{class:'ico'},L.em), h('span',{class:'tipo'},'Laboratorio · transversal'),
    h('h3',{},L.t), h('p',{},L.d),
    h('div',{class:'res-reto'}, h('b',{},'🎯 Tu reto'), h('span',{},L.reto)),
    areaTags(L.areas),
    h('span',{class:`pill lab soon`}, Store.s.activities[L.id]?.done ? 'Completado' : 'Disponible'))));
  view.append(g);
});

/* =====================================================================
   FOTOSÍNTESIS · escena ilustrada del paso «Experimentación» (v1.7)
   Vaso con Elodea bajo un embudo invertido, tubo colector de O₂, lámpara a
   una distancia que depende de la intensidad de luz, bicarbonato disuelto y
   termómetro. Las burbujas salen a la tasa del modelo rate() del laboratorio.
   Usa el kit SVG común de los laboratorios (lb2Base, lb2Vessel, lb2Thermo…).
   ===================================================================== */
function labFotoEscena(){
  const W = 640, H = 340, B = lb2Base(W, H, 'Montaje de fotosíntesis con Elodea', {benchY:300});
  const { svg } = B;
  const RAP = 4;                                         /* cámara rápida: 1 s de animación = 4 s reales */
  B.lin('agua', [[0,'#BFE6F2',.3],[1,'#7CC3E0',.48]]);
  B.lin('beam', [[0,'#FFE58A',.9],[1,'#FFE58A',0]], 0,0,1,0);
  B.rad('bulb', [[0,'#FFFBE0',1],[.4,'#FFE27A',.85],[1,'#FFD24A',0]]);
  B.lin('shade', [[0,'#3F7F6B'],[.5,'#5FA58C'],[1,'#2D5E4F']]);
  B.lin('leaf', [[0,'#6CC05A'],[1,'#2F7D34']], 0,0,1,1);
  B.lin('ruler', [[0,'#E9C98E'],[1,'#C9A263']]);
  /* regla sobre la mesada */
  const ruler = lb2S('g');
  ruler.append(lb2S('rect',{x:40, y:303, width:300, height:12, rx:2, fill:B.url('ruler'), stroke:'#9C7B45', 'stroke-width':.8}));
  for (let i = 0; i <= 30; i++) ruler.append(lb2S('line',{x1:40 + i*10, x2:40 + i*10, y1:303, y2:303 + (i%5 ? 4 : 7), stroke:'#6B4F22', 'stroke-width':1}));
  svg.append(ruler);
  /* haz de luz (se dibuja antes que el vaso) */
  const beam = lb2S('path',{fill:B.url('beam')});
  svg.append(beam);
  /* vaso de precipitados con agua y bicarbonato */
  const V = lb2Vessel(B, 330, 96, 172, 202, {r:16, liquid:B.url('agua')});
  const rng = lb2Rng(21), co2 = [];
  for (let i = 0; i < 46; i++){ const x = 342 + rng()*148, y = 150 + rng()*140; const el = lb2S('circle',{cx:x, cy:y, r:1.4 + rng()*0.8, fill:'#FFFFFF', stroke:'#7FA8C4', 'stroke-width':.5}); V.inner.append(el); co2.push({el, x, y, k:rng()*6.28}); }
  /* plastilina y ramas de Elodea */
  V.inner.append(lb2S('ellipse',{cx:416, cy:291, rx:26, ry:6, fill:'#6A8F3C'}), lb2S('ellipse',{cx:414, cy:289, rx:16, ry:3, fill:'#8DB35A'}));
  const plant = lb2S('g'), leaves = [], tips = [];
  [[398, -0.22, 62], [416, 0.02, 70], [434, 0.25, 60]].forEach(([bx, bend, len], si) => {
    const pts = []; for (let i = 0; i <= 10; i++){ const t = i/10; pts.push([bx + Math.sin(t*1.6)*bend*40, 290 - t*len]); }
    plant.append(lb2S('path',{d:'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L'), fill:'none', stroke:'#3E8A3A', 'stroke-width':2.4, 'stroke-linecap':'round'}));
    for (let i = 1; i <= 10; i++){ const [x, y] = pts[i]; const sz = 1 - i/16;
      [-1, 0, 1].forEach(k => { const a = (k*55 + (i%2 ? 20 : -20))*(k === 0 ? 0.3 : 1) + (k === 0 ? (i%2 ? 70 : -70) : 0);
        const L = lb2S('path',{d:`M0,0 C3,-3 ${(10*sz).toFixed(1)},-3 ${(13*sz).toFixed(1)},0 C${(10*sz).toFixed(1)},3 3,3 0,0Z`, fill:B.url('leaf'), stroke:'#2A6B2E', 'stroke-width':.5, transform:`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(a - 90).toFixed(0)})`});
        plant.append(L); leaves.push(L); }); }
    tips.push(pts[10]);
  });
  V.inner.append(plant);
  /* embudo invertido y tubo colector */
  const FX = 416;
  const funnel = `M${FX-58},288 L${FX-9},230 L${FX-9},196 L${FX+9},196 L${FX+9},230 L${FX+58},288`;
  V.over.append(lb2S('path',{d:funnel, fill:'#FFFFFF', opacity:.1}), lb2S('path',{d:funnel, class:'lb2-edge', 'stroke-width':2.2, 'stroke-linejoin':'round'}),
    lb2S('path',{d:`M${FX-50},282 L${FX-12},236`, stroke:'#FFFFFF', 'stroke-width':3, opacity:.35, 'stroke-linecap':'round'}));
  const TX = FX - 13, TW = 26, TT = 30, TB = 206;
  const tubeBody = `M${TX},${TB} L${TX},${TT+13} A13,13 0 0 1 ${TX+TW},${TT+13} L${TX+TW},${TB}`;
  const tubeWater = lb2S('path',{fill:'#9FD4EA', opacity:.4}), gas = lb2S('path',{fill:'#FFFFFF', opacity:.28}), gasLine = lb2S('path',{fill:'none', stroke:'#FFFFFF', 'stroke-width':1.6, opacity:.85});
  const bubG = lb2S('g');
  const bubs = lb2Pool(bubG, 30, () => lb2S('circle',{r:2.4, fill:B.url('bub'), stroke:'#FFFFFF', 'stroke-width':.8}));
  svg.append(V.g);
  const tube = lb2S('g');
  tube.append(tubeWater, gas, gasLine, bubG, lb2S('path',{d:tubeBody, fill:B.url('glass')}), lb2S('path',{d:tubeBody, class:'lb2-edge', 'stroke-width':2.2}),
    lb2S('rect',{x:TX+4, y:TT+10, width:3.5, height:TB-TT-24, rx:1.7, fill:'#FFFFFF', opacity:.45}));
  for (let i = 1; i <= 7; i++){ const y = TT + 16 + i*18; tube.append(lb2S('line',{x1:TX+TW-9, x2:TX+TW-2, y1:y, y2:y, class:'lb2-edge', 'stroke-width':1.2})); }
  svg.append(tube);
  /* termómetro dentro del vaso */
  const th = lb2Thermo(B, 482, 84, 284, 5, 55);
  svg.append(th.g);
  /* lámpara articulada (se desplaza según la luz) */
  const lamp = lb2S('g'), glow = lb2S('circle',{cx:16, cy:0, r:36, fill:B.url('bulb')}), bulb = lb2S('circle',{cx:9, cy:0, r:10}), rim = lb2S('ellipse',{cx:15, cy:0, rx:5, ry:23});
  const lampHead = lb2S('g');
  lampHead.append(glow,
    lb2S('path',{d:'M-24,-10 L12,-25 Q22,0 12,25 L-24,10 Q-31,0 -24,-10Z', fill:B.url('shade'), stroke:'#1F4538', 'stroke-width':1.2}),
    lb2S('path',{d:'M-20,-7 L8,-19', stroke:'#FFFFFF', 'stroke-width':2.5, 'stroke-linecap':'round', opacity:.35}),
    rim, bulb, lb2S('rect',{x:-34, y:-6, width:12, height:12, rx:3, fill:'#2D5E4F'}));
  lamp.append(B.shadow(0, 300, 44, 6), lb2S('ellipse',{cx:0, cy:294, rx:36, ry:9, fill:'#2D5E4F'}), lb2S('ellipse',{cx:0, cy:291, rx:30, ry:6, fill:'#4F957C'}),
    lb2S('path',{d:'M0,290 L-26,214 L-28,152', fill:'none', stroke:B.url('metal'), 'stroke-width':6, 'stroke-linecap':'round', 'stroke-linejoin':'round'}),
    lb2S('path',{d:'M0,290 L-26,214 L-28,152', fill:'none', stroke:'#56606B', 'stroke-width':1, opacity:.6}),
    lb2S('circle',{cx:-26, cy:214, r:5, fill:'#56606B'}), lb2S('circle',{cx:-28, cy:152, r:5, fill:'#56606B'}));
  const headWrap = lb2S('g',{transform:'translate(0 150)'}); headWrap.append(lampHead);
  lamp.append(headWrap);
  svg.append(lamp);
  /* frasco de bicarbonato */
  const jar = lb2S('g'), jarT = lb2S('text',{x:572, y:281, 'text-anchor':'middle', 'font-size':15, 'font-weight':700, fill:'#1F2A36', 'font-family':'var(--font-m)'}, '');
  jar.append(B.shadow(572, 300, 36, 5), lb2S('rect',{x:536, y:230, width:72, height:70, rx:8, fill:'#FFFFFF', opacity:.9}),
    lb2S('path',{d:'M540,296 L540,272 Q572,262 604,272 L604,296Z', fill:'#F4F4F0'}),
    lb2S('rect',{x:536, y:230, width:72, height:70, rx:8, fill:B.url('glass')}), lb2S('rect',{x:536, y:230, width:72, height:70, rx:8, class:'lb2-edge', 'stroke-width':1.6}),
    lb2S('rect',{x:533, y:220, width:78, height:12, rx:3, fill:'#C05A3B'}),
    lb2S('rect',{x:540, y:240, width:64, height:48, rx:3, fill:'#FFFFFF', stroke:'#C9C2AE', 'stroke-width':.8}),
    lb2S('text',{x:572, y:260, 'text-anchor':'middle', 'font-size':14, 'font-weight':700, fill:'#1F2A36', 'font-family':'var(--font-b)'}, 'NaHCO₃'), jarT);
  svg.append(jar);
  const rapT = lb2S('text',{x:18, y:32, 'font-size':17, class:'lb2-tx2'}, 'cámara rápida ×' + RAP);
  svg.append(rapT);

  const S = { rate:0, luz:50, gas:0, acc:0, key:'', LX:200 };
  const GMAX = 118;                                          /* altura útil del tubo para el gas */
  function drawGas(){
    const gy = TT + 4 + S.gas;
    tubeWater.setAttribute('d', `M${TX+1.5},${gy} Q${FX},${gy+4} ${TX+TW-1.5},${gy} L${TX+TW-1.5},${TB} L${TX+1.5},${TB} Z`);
    gas.setAttribute('d', `M${TX+1.5},${TT+13} A11.5,11.5 0 0 1 ${TX+TW-1.5},${TT+13} L${TX+TW-1.5},${gy} Q${FX},${gy+4} ${TX+1.5},${gy} Z`);
    gasLine.setAttribute('d', S.gas > 1 ? `M${TX+2},${gy} Q${FX},${gy+4} ${TX+TW-2},${gy}` : '');
  }
  function place(b, u){                                       /* u: 0 = punta de la rama, 1 = interfaz del gas */
    const t = b.tip, gy = TT + 6 + S.gas;
    const pts = [[t[0], t[1]], [FX + (t[0]-FX)*0.6, 238], [FX, 222], [FX, 196], [FX, gy]];
    const seg = [0, 0.3, 0.42, 0.55, 1]; let i = 1; while (i < seg.length - 1 && u > seg[i]) i++;
    const f = (u - seg[i-1])/(seg[i] - seg[i-1]); const a = pts[i-1], c = pts[i];
    return [a[0] + (c[0]-a[0])*f + Math.sin(b.p)*1.2*(i < 2 ? 1 : 0.4), a[1] + (c[1]-a[1])*f];
  }
  return {
    el: svg,
    upd(v, r){
      const key = JSON.stringify(v); if (key !== S.key){ S.key = key; S.gas = 0; }
      S.rate = r; S.luz = v.luz;
      const f = v.luz/100, d = 90 + (1 - f)*170;             /* más luz = lámpara más cerca */
      S.LX = 330 - d;
      lamp.setAttribute('transform', `translate(${S.LX.toFixed(1)} 0)`);
      const hx = S.LX + 14, hy = 150;
      beam.setAttribute('d', `M${hx},${hy-22} L${330+86},96 L${330+172},210 L${330+120},298 L${hx},${hy+22} Z`);
      beam.setAttribute('opacity', (0.1 + 0.55*f*f).toFixed(2));
      glow.setAttribute('opacity', (0.15 + 0.85*f).toFixed(2));
      bulb.setAttribute('fill', f > 0.02 ? lb2Mix('#8A8470', '#FFF6C8', Math.min(1, f*1.5)) : '#6C6A60');
      rim.setAttribute('fill', f > 0.02 ? lb2Mix('#7E8B72', '#FFF1B8', Math.min(1, f*1.4)) : '#5E6B63');
      const n = Math.round(clamp(v.co2, 0, 1)*co2.length);
      co2.forEach((c, i) => c.el.setAttribute('visibility', i < n ? 'visible' : 'hidden'));
      jarT.textContent = lb2N(v.co2, 2) + ' %';
      th.set(v.temp);
      const dano = clamp((v.temp - 42)/12, 0, 1), seca = clamp((60 - v.agua)/60, 0, 1)*0.5;
      B.recolor('leaf', [lb2Mix(lb2Mix('#6CC05A', '#A7A24A', dano), '#B7C98A', seca), lb2Mix(lb2Mix('#2F7D34', '#7A6A2E', dano), '#7F9A5A', seca)]);
      V.setLevel(152 - (v.agua - 10)/90*38);
      B.recolor('agua', [lb2Ramp([[5,'#B4DDF4'],[25,'#BFE6F2'],[55,'#E9D3B0']], v.temp), lb2Ramp([[5,'#6FB3E3'],[25,'#7CC3E0'],[55,'#D9B585']], v.temp)]);
      svg.setAttribute('aria-label', `Rama de Elodea en un vaso con agua a ${lb2N(v.temp,0)} °C y bicarbonato al ${lb2N(v.co2,2)} %, bajo un embudo invertido con un tubo colector. La lámpara está ${f > 0.75 ? 'muy cerca' : f > 0.4 ? 'a media distancia' : f > 0.05 ? 'lejos' : 'apagada'} (luz ${lb2N(v.luz,0)} %). Salen unas ${Math.round(r)} burbujas de O₂ por minuto que se acumulan en el tubo.`);
    },
    tick(T, dt){
      if (T == null){
        bubs.forEach(lb2Kill);
        S.gas = clamp(S.rate/60, 0, 1)*GMAX*0.55; drawGas();
        const n = Math.round(clamp(S.rate/60, 0, 1)*12), r2 = lb2Rng(4);
        for (let i = 0; i < n; i++) lb2Spawn(bubs, b => { b.tip = tips[i % 3]; b.p = 0; const [x, y] = place(b, r2()*0.95); lb2At(b.el, {cx:x, cy:y, r:1.8 + r2()*1.4}); });
        co2.forEach(c => lb2At(c.el, {cx:c.x, cy:c.y}));
        return;
      }
      S.acc += dt*S.rate/60*RAP;
      while (S.acc >= 1){ S.acc -= 1; lb2Spawn(bubs, b => { b.tip = tips[Math.floor(Math.random()*3)]; b.u = 0; b.v = 0.28 + Math.random()*0.1; b.r = 2.4 + Math.random()*1.8; b.p = Math.random()*6; }); }
      bubs.forEach(b => { if (!b.on) return; b.u += b.v*dt; b.p += dt*5;
        if (b.u >= 1){ lb2Kill(b); S.gas += 1.3; if (S.gas > GMAX) S.gas = 0; return; }
        const [x, y] = place(b, b.u); lb2At(b.el, {cx:x, cy:y, r:b.r}); });
      drawGas();
      co2.forEach(c => { if (c.el.getAttribute('visibility') === 'hidden') return; lb2At(c.el, {cx:c.x + Math.sin(T*0.7 + c.k)*2, cy:c.y + Math.cos(T*0.5 + c.k)*1.5}); });
      const fl = S.luz > 2 ? 1 + 0.03*Math.sin(T*9) : 1; glow.setAttribute('r', (36*fl).toFixed(1));
    }
  };
}

route('/laboratorio/fotosintesis', (view) => {
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{}, h('span',{class:'eyebrow lab'},'Laboratorio transversal · Mundo celular · Biodiversidad y ecosistemas'), h('h1',{},'Fotosíntesis: ¿qué limita la producción de oxígeno?'), h('p',{},'Una rama de Elodea sumergida libera burbujas de O₂ cuando fotosintetiza. Contar burbujas por minuto es una forma clásica de medir la tasa fotosintética.')), h('span',{class:'pill lab'},'+120 XP')));
  view.append(purposeBanner({ proposito:'Descubrir qué factores limitan la fotosíntesis y por qué la tasa no puede aumentar sin límite.', observa:['Cómo cambian las burbujas de O₂ al variar un solo factor','Qué pasa con tus datos si cambias dos variables a la vez'], reto:'Encuentra el valor a partir del cual aumentar el factor ya casi no aumenta la tasa (la meseta) y explica qué otro factor pasa a limitarla.', done: !!Store.s.activities['lab-fotosintesis']?.done }));
  const STEPS = ['Pregunta','Hipótesis','Materiales','Procedimiento','Variables','Experimentación','Resultados','Representación','Análisis','Conclusión'];
  const L = { step:0, done:new Set(), hip:'', indep:'', vars:{luz:50,co2:0.3,temp:25,agua:80}, runs:[], analysis:{}, concl:'' };
  const VARS = { luz:{n:'Intensidad de luz',u:'%',min:0,max:100,step:5}, co2:{n:'CO₂ (bicarbonato)',u:'%',min:0,max:1,step:0.05}, temp:{n:'Temperatura',u:'°C',min:5,max:55,step:1}, agua:{n:'Agua disponible',u:'%',min:10,max:100,step:5} };
  function rate(v){ const fL = v.luz/(v.luz+25); const fC = v.co2/(v.co2+0.2); let fT = Math.exp(-Math.pow((v.temp-30)/12,2)); if (v.temp>45) fT *= Math.max(0, 1-(v.temp-45)/10); const fW = Math.pow(v.agua/100, 0.5); return 60*fL*fC*fT*fW; }
  const stepsEl = h('ul',{class:'steps'}), body = h('div',{class:'card stack'});
  view.append(h('div',{class:'lab-layout'}, h('div',{class:'card',style:'align-self:start'}, h('span',{class:'eyebrow lab'},'Secuencia del experimento'), stepsEl), body));
  function renderSteps(){ stepsEl.innerHTML=''; STEPS.forEach((s,i)=>stepsEl.append(h('li',{}, h('button',{class:L.done.has(i)?'done':'','aria-current':L.step===i?'step':null,onclick:()=>{ if (i<=Math.max(...L.done,-1)+1) { L.step=i; render(); } else toast('Completa primero el paso anterior.'); }}, h('span',{class:'n'},L.done.has(i)?'✓':i+1), s)))); }
  const next = (i) => h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ L.done.add(L.step); L.step=Math.min(L.step+1,STEPS.length-1); render(); Store.log('laboratorio',{lab:'fotosintesis',paso:STEPS[i]}); }}, 'Continuar →');
  function render(){ renderSteps(); body.innerHTML=''; const i=L.step; body.append(h('span',{class:'eyebrow lab'},`Paso ${i+1} · ${STEPS[i]}`));
    if (i===0){ body.append(h('h3',{},'¿Qué queremos descubrir?'), h('p',{},'Las plantas necesitan luz, CO₂, agua y una temperatura adecuada para fotosintetizar. Pero ¿cualquiera de estos factores puede aumentar la tasa sin límite? ¿Cuál la limita antes?'), h('div',{class:'notice info'},'Pregunta de investigación: ¿cómo afecta un factor ambiental (luz, CO₂, temperatura o agua) a la tasa de fotosíntesis de Elodea, medida en burbujas de O₂ por minuto?'), next(i)); }
    else if (i===1){ const ta = h('textarea',{placeholder:'Si aumento ___, entonces la tasa de fotosíntesis ___, porque ___','aria-label':'Hipótesis'}); ta.value = L.hip; body.append(h('h3',{},'Escribe tu hipótesis'), h('p',{class:'small muted'},'Una hipótesis es una predicción comprobable con la forma "si… entonces… porque…". Elige un solo factor.'), ta, h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ if (ta.value.trim().length<25) return toast('Formula la hipótesis con la estructura si… entonces… porque…'); L.hip=ta.value.trim(); Store.addNote('hipotesis','Lab fotosíntesis: '+L.hip); L.done.add(1); L.step=2; render(); }},'Guardar hipótesis →')); }
    else if (i===2){ const m = h('div',{class:'materials'}); [['🌿','Rama de Elodea'],['🧪','Tubo de ensayo con agua'],['💡','Lámpara regulable'],['🧂','Bicarbonato (fuente de CO₂)'],['🌡️','Termómetro y baño'],['⏱️','Cronómetro'],['📏','Regla (distancia lámpara)'],['📓','Tabla de registro']].forEach(([em,t])=>m.append(h('div',{}, h('span',{},em), t))); body.append(h('h3',{},'Materiales'), m, h('p',{class:'small muted'},'En el laboratorio real, la intensidad de luz se controla acercando o alejando la lámpara; aquí se expresa como porcentaje.'), next(i)); }
    else if (i===3){ body.append(h('h3',{},'Procedimiento'), h('ol',{style:'padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:.92rem'}, ['Coloca la rama de Elodea con el corte hacia arriba dentro del tubo con agua y bicarbonato.','Deja que la planta se adapte 2 minutos a las condiciones iniciales.','Cuenta las burbujas que salen del tallo durante 1 minuto y registra el valor.','Cambia solamente la variable independiente elegida y repite la medición.','Mantén constantes las demás variables (controladas).','Repite con al menos cinco valores distintos para obtener una curva.'].map(t=>h('li',{},t))), next(i)); }
    else if (i===4){ const sel = h('select',{'aria-label':'Variable independiente'}); sel.append(h('option',{value:''},'Elige la variable que vas a manipular…')); Object.entries(VARS).forEach(([k,v])=>sel.append(h('option',{value:k},v.n))); sel.value=L.indep; const fb = h('div',{class:'notice',style:'display:none'});
      body.append(h('h3',{},'Identifica las variables'), h('div',{class:'field'}, h('label',{},'Variable independiente (la que tú cambias)'), sel), h('div',{class:'kv'}, h('dt',{},'Variable dependiente'), h('dd',{},'Tasa de fotosíntesis (burbujas de O₂ por minuto)'), h('dt',{},'Variables controladas'), h('dd',{id:'ctrl-list'},'—')), fb, h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ if (!sel.value) return toast('Elige la variable independiente.'); L.indep=sel.value; L.done.add(4); L.step=5; render(); Store.log('laboratorio',{lab:'fotosintesis',independiente:sel.value}); }},'Continuar →'));
      sel.addEventListener('change',()=>{ $('#ctrl-list',body).textContent = Object.entries(VARS).filter(([k])=>k!==sel.value).map(([,v])=>v.n).join(', ')||'—'; }); if (sel.value) sel.dispatchEvent(new Event('change')); }
    else if (i===5){ body.append(h('h3',{},'Experimentación'), h('p',{class:'small muted'},`Variable independiente: ${VARS[L.indep].n}. Cambia solo esa variable entre mediciones. Necesitas al menos 5 mediciones.`));
      const sl = h('div',{class:'grid g2'}); const outs={}; Object.entries(VARS).forEach(([k,v])=>{ const inp = h('input',{type:'range',min:v.min,max:v.max,step:v.step,value:L.vars[k],id:'lv-'+k}); const out = h('output',{},L.vars[k]+' '+v.u); outs[k]=out; inp.addEventListener('input',()=>{ L.vars[k]=+inp.value; out.value=inp.value+' '+v.u; bubbles(); }); sl.append(h('div',{class:'slider'}, h('label',{for:'lv-'+k}, v.n, k===L.indep?h('span',{class:'pill lab',style:'margin-left:6px'},'independiente'):h('span',{class:'pill',style:'margin-left:6px'},'controlada')), out, inp)); });
      let esc = null; try { esc = (typeof labFotoEscena === 'function' && typeof lb2Base === 'function') ? labFotoEscena() : null; } catch(e){ console.warn('lab: escena fotosíntesis', e); esc = null; }
      const jar = esc ? h('div',{class:'lab-esc'}, esc.el) : h('div',{style:'height:120px;border-radius:12px;background:linear-gradient(180deg,var(--bg-3),var(--lab-soft));position:relative;overflow:hidden;border:1px solid var(--line)'}); const bub = h('div',{class:'mono small',style: esc ? 'color:var(--ink-2)' : 'position:absolute;left:12px;bottom:8px;color:var(--ink-2)'}); if (esc) lb2Run(esc, jar); else jar.append(h('div',{style:'position:absolute;left:50%;bottom:0;width:8px;height:70px;background:var(--eco);border-radius:4px 4px 0 0;transform:translateX(-50%)'}), bub);
      function bubbles(){ const r = rate(L.vars); bub.textContent = `≈ ${r.toFixed(0)} burbujas/min (estimación visual)`; if (esc){ try { esc.upd(L.vars, r); esc._static = false; if (!lb2Anim()){ esc.tick(null); esc._static = true; } } catch(e){ console.warn(e); } return; } jar.querySelectorAll('.bb').forEach(b=>b.remove()); const n = Math.round(r/6); for (let k=0;k<n;k++){ jar.append(h('span',{class:'bb',style:`position:absolute;left:${46+Math.random()*8}%;bottom:${10+Math.random()*90}px;width:${4+Math.random()*5}px;height:${4+Math.random()*5}px;border-radius:50%;background:rgba(255,255,255,.8);border:1px solid var(--line-2)`})); } }
      const fb = h('div',{class:'notice',style:'display:none'}); const tbl = h('div',{class:'tablewrap'});
      function renderRuns(){ tbl.innerHTML=''; if (!L.runs.length) return; const t = h('table',{class:'data'}, h('thead',{},h('tr',{},h('th',{},'#'),...Object.values(VARS).map(v=>h('th',{},v.n)),h('th',{},'Burbujas/min'))), h('tbody',{},L.runs.map((r,k)=>h('tr',{},h('td',{class:'num'},k+1),...Object.keys(VARS).map(x=>h('td',{class:'num'},r.v[x]+' '+VARS[x].u)),h('td',{class:'num'},h('b',{},r.y)))))); tbl.append(t); }
      const measure = h('button',{class:'btn primary',onclick:()=>{ const prev = L.runs[L.runs.length-1]; if (prev){ const changed = Object.keys(VARS).filter(k=>prev.v[k]!==L.vars[k]); const bad = changed.filter(k=>k!==L.indep); if (bad.length){ fb.className='notice warn'; fb.innerHTML=`<span><b>Cambiaste ${bad.length>1?'varias variables controladas':'una variable controlada'} (${bad.map(k=>VARS[k].n).join(', ')}).</b> Si cambias dos variables a la vez no podrás saber cuál causó el cambio. Devuélvela al valor anterior (${bad.map(k=>prev.v[k]+' '+VARS[k].u).join(', ')}) o reinicia la serie.</span>`; fb.style.display='flex'; Store.log('laboratorio',{lab:'fotosintesis',error:'variable_no_controlada'}); return; } if (!changed.length){ fb.className='notice'; fb.textContent='Esta medición repite las mismas condiciones: sirve como réplica, pero para obtener la curva cambia la variable independiente.'; fb.style.display='flex'; } else fb.style.display='none'; }
        const y = Math.round(rate(L.vars)*(0.95+Math.random()*0.1)); L.runs.push({ v:Object.assign({},L.vars), y }); renderRuns(); Store.log('laboratorio',{lab:'fotosintesis',medicion:L.runs.length,valor:y,independiente:L.indep,x:L.vars[L.indep]}); if (L.runs.length>=5) cont.style.display=''; }},'⏱ Medir 1 minuto');
      const reset = h('button',{class:'btn',onclick:()=>{ L.runs=[]; renderRuns(); cont.style.display='none'; fb.style.display='none'; }},'Reiniciar serie');
      const cont = h('button',{class:'btn',style:'display:none',onclick:()=>{ L.done.add(5); L.step=6; render(); }},'Ver resultados →');
      body.append(sl, jar, ...(esc ? [bub] : []), h('div',{class:'row'}, measure, reset, cont), fb, tbl); bubbles(); renderRuns(); if (L.runs.length>=5) cont.style.display=''; }
    else if (i===6){ const t = h('table',{class:'data'}, h('thead',{},h('tr',{},h('th',{},'Medición'),h('th',{},VARS[L.indep].n+' (independiente)'),h('th',{},'Burbujas de O₂/min (dependiente)'))), h('tbody',{},L.runs.map((r,k)=>h('tr',{},h('td',{class:'num'},k+1),h('td',{class:'num'},r.v[L.indep]+' '+VARS[L.indep].u),h('td',{class:'num'},r.y))))); body.append(h('h3',{},'Resultados'), h('p',{class:'small muted'},'Datos generados por el modelo con una variación aleatoria de ±5 %, como en una medición real.'), h('div',{class:'tablewrap'},t), next(i)); }
    else if (i===7){
      /* promedio por valor de la variable (con la desviación típica si hubo réplicas), cada medición y predicción previa */
      const c = h('canvas',{class:'chart'}), wrap = h('div',{style:'position:relative'},c);
      const pk = L.indep + '|' + L.runs.length; if (!L.pred || L.pred.k !== pk) L.pred = { k:pk };
      const grupos = {}; L.runs.forEach(r => { const x = r.v[L.indep]; (grupos[x] = grupos[x] || []).push(r.y); });
      const media = a => a.reduce((s,v)=>s+v,0)/a.length, desv = a => { if (a.length<2) return 0; const m = media(a); return Math.sqrt(a.reduce((s,v)=>s+(v-m)*(v-m),0)/(a.length-1)); };
      const prom = Object.keys(grupos).map(Number).sort((a,b)=>a-b).map(x => ({ x, y:media(grupos[x]), sd:desv(grupos[x]), n:grupos[x].length }));
      const hayRep = prom.some(p => p.n > 1);
      const notas = h('div',{class:'stack',style:'gap:8px'},
        h('div',{class:'notice info'}, h('span',{}, h('b',{},'Cómo leerlo: '), hayRep
          ? 'la línea une los promedios de cada valor que probaste; los puntos pequeños grises son cada medición y la barra vertical es la desviación típica de las réplicas (cuánto variaron al repetir). Busca dónde la curva deja de subir: esa es la meseta del reto.'
          : 'la línea une tus mediciones. Si repites alguna condición verás además su barra de error (la desviación típica). Busca dónde la curva deja de subir: esa es la meseta del reto.')));
      const fx = v => L.indep==='co2' ? grafNum(v, 2) : String(Math.round(v));
      body.append(h('h3',{},'Representación gráfica'), wrap,
        h('p',{class:'small muted'},'Pasa el cursor o el dedo por el gráfico (o usa las flechas del teclado) para leer los valores. El botón ⋯ permite descargar la imagen o ver los datos como tabla.'), notas, next(i));
      const pendiente = !L.pred.fase || L.pred.fase === 'dibujar'; if (pendiente) notas.style.display = 'none';
      setTimeout(()=>{ const mx = prom.reduce((a,b)=> b.y > a.y ? b : a, prom[0]);
        lineChart(c,{ series:[ {label:hayRep ? 'Promedio (burbujas de O₂/min)' : 'Burbujas de O₂/min',color:cssVar('--lab'),pts:prom,dots:true},
            ...(hayRep ? [{label:'cada medición', color:cssVar('--ink-3'), pts:L.runs.map(r=>({x:r.v[L.indep], y:r.y})), linea:false, dots:true, r:2.6}] : []) ],
          xmin:VARS[L.indep].min, xmax:VARS[L.indep].max, ymin:0, xlabel:VARS[L.indep].n+' ('+VARS[L.indep].u+')', ylabel:'burbujas/min', xfmt:fx, xticks:5,
          tipfmt:v=>grafNum(v,1), titulo:'Tasa de fotosíntesis según '+VARS[L.indep].n.toLowerCase(),
          anotaciones: mx ? [{ x:mx.x, y:mx.y, texto:'máximo medido' }] : [],
          prediccion:{ estado:L.pred, id:'fotosintesis', nota:'Lab fotosíntesis', que:'burbujas de O₂ por minuto según '+VARS[L.indep].n[0].toLowerCase()+VARS[L.indep].n.slice(1), unidadX:VARS[L.indep].u, unidadY:'burbujas/min',
            pregunta:`¿Cómo crees que cambiarán las burbujas de O₂ por minuto al aumentar ${VARS[L.indep].n[0].toLowerCase()+VARS[L.indep].n.slice(1)}?`, onFin:()=>{ notas.style.display=''; } } }); },30); }
    else if (i===8){ const pts = L.runs.map(r=>({x:r.v[L.indep],y:r.y})).sort((a,b)=>a.x-b.x); const first=pts[0], lastp=pts[pts.length-1]; const mid = pts[Math.floor(pts.length/2)]; const slope1 = (mid.y-first.y)/Math.max(1e-6,(mid.x-first.x)), slope2 = (lastp.y-mid.y)/Math.max(1e-6,(lastp.x-mid.x)); const plateau = Math.abs(slope2) < Math.abs(slope1)*0.5 && lastp.y>first.y; const decreases = lastp.y < first.y*0.8; const trend = decreases ? 2 : plateau ? 0 : 1;
      const q1 = { q:`Según tus datos, al aumentar ${VARS[L.indep].n.toLowerCase()} la tasa de fotosíntesis…`, ops:['aumenta hasta un límite y luego se estabiliza','aumenta de forma proporcional en todo el rango medido','disminuye o alcanza un máximo y después cae'], ok:trend, fb: trend===0 ? 'Tus datos muestran una meseta: a partir de cierto valor, otro factor pasa a ser el limitante (ley del factor limitante de Blackman).' : trend===1 ? 'En el rango que mediste la relación es casi lineal. Si ampliaras el rango, encontrarías una meseta cuando otro factor se vuelva limitante.' : 'A partir de cierto valor la tasa cae: las enzimas de la fotosíntesis se desnaturalizan con el calor (o la planta cierra estomas por estrés).', wrong:['Revisa la pendiente entre tus primeros y tus últimos puntos: ¿sigue subiendo igual?','Observa si los últimos puntos son mayores o menores que los primeros.','Compara la diferencia entre los primeros puntos con la diferencia entre los últimos.'] };
      const q2 = { q:'¿Cuál fue la variable dependiente en tu experimento?', ops:[VARS[L.indep].n,'Las burbujas de O₂ por minuto','La temperatura del agua'], ok:1, fb:'La variable dependiente es la que mides para ver el efecto: el número de burbujas por minuto.', wrong:['Esa fue la variable independiente: la que tú manipulaste.','Esa fue una variable controlada (a menos que la hayas elegido como independiente).'] };
      const q3 = { q:'¿Por qué es importante mantener constantes las demás variables?', ops:['Para que el experimento sea más rápido','Para poder atribuir cualquier cambio en la tasa únicamente a la variable independiente','Porque las plantas se estresan si cambian varias cosas'], ok:1, fb:'Solo con las demás variables constantes puedes establecer una relación causa-efecto válida.', wrong:['La rapidez no es el objetivo; la validez de la relación causa-efecto sí.','El estrés puede influir, pero la razón metodológica es aislar el efecto de una sola variable.'] };
      let n=0; const chk = () => { n++; if (n===3){ L.done.add(8); c.style.display=''; } }; const c = h('button',{class:'btn primary',style:'display:none;align-self:flex-start',onclick:()=>{ L.step=9; render(); }},'Ir a la conclusión →');
      body.append(h('h3',{},'Análisis guiado'), quizBlock(q1,chk), quizBlock(q2,chk), quizBlock(q3,chk), c); }
    else if (i===9){ const ta = h('textarea',{placeholder:'Mi hipótesis fue… Los datos muestran que… Por lo tanto, la hipótesis se… porque…','aria-label':'Conclusión',style:'min-height:120px'}); ta.value=L.concl; let ver=null; const vs = h('div',{class:'row'}, ['Confirmada','Refutada','Parcialmente confirmada'].map((t,k)=>h('button',{class:'chip',onclick:function(){ ver=t; $$('button',vs).forEach(b=>b.classList.remove('picked')); this.classList.add('picked'); }},t)));
      body.append(h('h3',{},'Conclusión'), h('div',{class:'notice'}, h('span',{}, h('b',{},'Tu hipótesis: '), L.hip)), h('p',{class:'small',style:'font-weight:600'},'Tu hipótesis quedó…'), vs, ta, h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ if (!ver) return toast('Indica si tu hipótesis quedó confirmada, refutada o parcialmente confirmada.'); if (ta.value.trim().length<60) return toast('Redacta una conclusión más completa (mínimo 60 caracteres) que cite tus datos.'); L.concl=ta.value.trim(); const resumen = L.runs.map(r=>`${r.v[L.indep]} ${VARS[L.indep].u} → ${r.y}`).join(' | '); Store.addNote('resultado',`Lab fotosíntesis · independiente: ${VARS[L.indep].n}. Datos: ${resumen}`); Store.addNote('conclusion',`Lab fotosíntesis (${ver.toLowerCase()}): ${L.concl}`); Store.completeActivity('lab-fotosintesis',{score:ver, mediciones:L.runs.length}); Store.grantBadge('investigador'); L.done.add(9); renderSteps(); body.append(h('div',{class:'notice ok'},'Laboratorio completado y guardado en tu cuaderno de campo. Puedes repetir el experimento con otra variable independiente para comparar factores limitantes.'), h('div',{class:'row'}, h('a',{class:'btn',href:'#/cuaderno'},'Ver cuaderno'), h('button',{class:'btn',onclick:()=>{ L.runs=[]; L.done=new Set([0,1,2,3]); L.step=4; render(); }},'Repetir con otra variable'))); }},'Guardar conclusión')); }
  }
  render();
});
</script>
