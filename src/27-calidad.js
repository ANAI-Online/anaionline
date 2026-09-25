<style>
/* ===== 27-calidad · barra del escenario 3D (calidad, tiempo, medida) ===== */
.cal-bar{position:absolute;z-index:4;display:flex;align-items:center;gap:2px;padding:3px;background:color-mix(in srgb,var(--bg-2) 90%,transparent);border:1px solid var(--line);border-radius:11px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);box-shadow:0 1px 3px rgba(12,24,40,.10),0 6px 18px -10px rgba(12,24,40,.35);pointer-events:auto;max-width:calc(100% - 20px)}
.cal-bar[data-pos=""]{visibility:hidden}
.cal-grp{display:inline-flex;align-items:center;gap:2px}
.cal-grp[hidden]{display:none}
.cal-sep{width:1px;align-self:stretch;margin:4px 3px;background:var(--line)}
.cal-sep[hidden]{display:none}
.cal-b{display:inline-flex;align-items:center;justify-content:center;gap:5px;height:30px;min-width:30px;padding:0 7px;border:0;border-radius:8px;background:transparent;color:var(--ink-2);font-family:var(--font-d,inherit);font-size:.76rem;font-weight:700;letter-spacing:.01em;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s}
.cal-b:hover{background:color-mix(in srgb,var(--ink) 9%,transparent);color:var(--ink)}
.cal-b:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.cal-b[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.cal-b svg{width:15px;height:15px;flex:none;display:block}
.cal-vel{min-width:44px;font-family:var(--font-m,monospace);font-size:.74rem}
.cal-b.cal-flash{animation:cal-flash .45s ease-in-out 3}
@keyframes cal-flash{50%{background:var(--accent);color:#fff}}
html[data-motion="reducido"] .cal-b.cal-flash{animation:none;background:var(--accent);color:#fff}
.cal-q .cal-niv{display:inline-flex;align-items:flex-end;gap:1.5px;height:12px}
.cal-q .cal-niv i{display:block;width:3px;border-radius:1px;background:currentColor;opacity:.28}
.cal-q .cal-niv i:nth-child(1){height:5px}.cal-q .cal-niv i:nth-child(2){height:8px}.cal-q .cal-niv i:nth-child(3){height:12px}
.cal-q .cal-niv i.on{opacity:1}
.cal-menu{position:absolute;z-index:6;width:min(300px,calc(100% - 20px));max-height:calc(100% - 20px);overflow:auto;background:var(--bg-2);border:1px solid var(--line);border-radius:14px;padding:12px;box-shadow:0 18px 40px -18px rgba(12,24,40,.55),0 2px 6px rgba(12,24,40,.12);display:flex;flex-direction:column;gap:8px}
.cal-menu[hidden]{display:none}
.cal-m-t{font-weight:800;font-size:.9rem;color:var(--ink);display:flex;justify-content:space-between;align-items:center;gap:8px}
.cal-m-x{border:0;background:transparent;color:var(--ink-3);font-size:1.1rem;line-height:1;width:26px;height:26px;border-radius:7px;cursor:pointer}
.cal-m-x:hover{background:var(--bg-3);color:var(--ink)}
.cal-m-ops{display:flex;flex-direction:column;gap:4px}
.cal-op{display:grid;grid-template-columns:18px 1fr;gap:2px 8px;text-align:left;border:1px solid var(--line);background:var(--bg);border-radius:10px;padding:8px 10px;cursor:pointer;color:var(--ink)}
.cal-op:hover{border-color:var(--accent)}
.cal-op:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.cal-op .cal-rd{grid-row:span 2;width:14px;height:14px;margin-top:2px;border-radius:50%;border:2px solid var(--ink-3);box-sizing:border-box}
.cal-op[aria-checked="true"]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 9%,var(--bg))}
.cal-op[aria-checked="true"] .cal-rd{border:4px solid var(--accent)}
.cal-op b{font-size:.84rem}
.cal-op small{font-size:.72rem;color:var(--ink-3);line-height:1.35}
.cal-m-est{font-size:.74rem;color:var(--ink-2);margin:2px 0 0;line-height:1.45}
.cal-m-nota{font-size:.7rem;color:var(--ink-3);margin:0;line-height:1.4}
/* regla */
.cal-med{position:absolute;inset:0;pointer-events:none;z-index:3;display:none}
.cal-med.on{display:block}
.cal-med-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 0 1.5px rgba(0,0,0,.55))}
.cal-med-l{stroke:#FFD23F;stroke-width:2.5;stroke-linecap:round;fill:none;stroke-dasharray:7 4}
.cal-med-p{fill:#FFD23F;stroke:#1d1d1d;stroke-width:1.5}
.cal-med-val{position:absolute;transform:translate(-50%,-50%);background:#1d2530;color:#fff;border:1.5px solid #FFD23F;font-family:var(--font-m,monospace);font-size:.8rem;font-weight:700;padding:4px 10px;border-radius:999px;white-space:nowrap;box-shadow:0 4px 14px -6px rgba(0,0,0,.6)}
.cal-med-val.warn{background:#5a3b00;border-color:var(--warn)}
.cal-med-hint{position:absolute;max-width:calc(100% - 24px);background:color-mix(in srgb,var(--bg-2) 94%,transparent);border:1px solid var(--line);color:var(--ink);font-size:.74rem;font-weight:600;padding:5px 11px;border-radius:999px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 4px 14px -8px rgba(12,24,40,.45)}
.cal-med-hint:empty{display:none}
.cal-med-hint.warn{border-color:var(--warn);color:var(--ink)}
.cal-mira{display:none;position:absolute;left:50%;top:50%;width:24px;height:24px;margin:-12px 0 0 -12px;border:2px solid #FFD23F;border-radius:50%;box-shadow:0 0 0 1px rgba(0,0,0,.45)}
.cal-mira::after{content:"";position:absolute;left:50%;top:50%;width:4px;height:4px;margin:-2px 0 0 -2px;border-radius:50%;background:#FFD23F}
.stage canvas:focus-visible ~ .cal-med .cal-mira{display:block}
/* tarjeta en "Mi forma de aprender" */
.cal-card .cal-card-est{margin-top:8px}
@media (max-width:560px){ .cal-b{height:32px;min-width:32px;padding:0 6px} .cal-tx-l{display:none} }
</style>
<script>
/* =====================================================================
   27-calidad (v1.9) · Preferencia de calidad del 3D y barra del escenario
   - Store.s.settings.calidad: 'auto' (por defecto) | 'alta' | 'media' | 'basica'
   - Store.s.settings.calAuto: lo que la opción automática aprendió en este equipo { gpu, tier, esc, ok }
   - Calidad.perfil() lo usa Engine3D al construir (ver la cabecera de src/05-engine3d.js).
   - Calidad.montar(E) pone en cada .stage con 3D: Pausa/Paso/Velocidad (si la escena se anima),
     Medir (si la escena declara opts.escala) y el indicador de calidad con su menú.
   ===================================================================== */
const CAL_NIV = {
  auto:   { t:'Automática', c:'Auto', d:'Se ajusta sola: mide la fluidez y baja o sube la resolución.' },
  alta:   { t:'Alta',       c:'Alta', d:'Máxima nitidez y bordes suavizados. Para equipos con buena tarjeta gráfica.' },
  media:  { t:'Media',      c:'Media', d:'Un poco menos de resolución: casi igual de bonito y más fluido.' },
  basica: { t:'Básica',     c:'Básica', d:'Modelos más simples y menos resolución. Para equipos modestos o con poca batería.' }
};
const CAL_VEL = [0.25, 0.5, 1, 2];
const CAL_ICO = {
  pausa: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="3.2" height="11" rx="1" fill="currentColor"/><rect x="9.3" y="2.5" width="3.2" height="11" rx="1" fill="currentColor"/></svg>',
  play:  '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.6v10.8c0 .6.6.9 1.1.6l8.2-5.4c.4-.3.4-.9 0-1.2L5.6 2c-.5-.3-1.1 0-1.1.6z" fill="currentColor"/></svg>',
  paso:  '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3.2v9.6c0 .5.6.8 1 .5l6.6-4.8c.3-.3.3-.7 0-1L4 2.7c-.4-.3-1 0-1 .5z" fill="currentColor"/><rect x="11.4" y="2.8" width="2.3" height="10.4" rx=".9" fill="currentColor"/></svg>',
  regla: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.2" y="5" width="13.6" height="6" rx="1.3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 5v2.6M6.7 5v1.6M9.4 5v2.6M12 5v1.6" stroke="currentColor" stroke-width="1.3"/></svg>'
};
const Calidad = {
  pref(){ try { const v = Store.s.settings && Store.s.settings.calidad; return CAL_NIV[v] ? v : 'auto'; } catch(e){ return 'auto'; } },
  set(v){ if (!CAL_NIV[v]) return; Store.s.settings = Store.s.settings || { motion:true }; Store.s.settings.calidad = v; Store.save(); try { Store.log('calidad_3d', { calidad:v }); } catch(_){} },
  /* perfil de la tarjeta gráfica (una sola vez por carga) */
  gpu(){ if (this._gpu) return this._gpu; let n = '';
    try { const c = document.createElement('canvas'); const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (gl){ const ext = gl.getExtension('WEBGL_debug_renderer_info'); n = String((ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) || gl.getParameter(gl.RENDERER) || ''); const lc = gl.getExtension('WEBGL_lose_context'); if (lc) lc.loseContext(); } } catch(e){}
    const s = n.toLowerCase(); let clase = 'ok';
    if (/swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen/.test(s)) clase = 'soft';
    else if (/mali-(4|t[678])|mali-g(31|51|52)|powervr|sgx|videocore|intel.*gma|adreno\D*(3\d\d|4\d\d|50\d|51\d)\b/.test(s)) clase = 'debil';
    else { const m = s.match(/intel.*hd graphics\s*(\d+)?/); if (m && !/uhd|iris/.test(s) && (!m[1] || (+m[1] >= 1000 && +m[1] < 6000))) clase = 'debil'; }
    return (this._gpu = { nombre:n, clase, id:(n || 'desconocida').slice(0, 90) }); },
  memo(crear){ try { const S = Store.s.settings = Store.s.settings || { motion:true }; const g = this.gpu(); let m = S.calAuto;
      if (m && m.gpu !== g.id) m = null; if (!m && crear) m = S.calAuto = { gpu:g.id }; return m || null; } catch(e){ return null; } },
  /* nivel con el que empieza "Automática" en este equipo */
  tierAuto(){ const g = this.gpu(), m = this.memo(false); if (m && CAL_NIV[m.tier] && m.tier !== 'auto') return m.tier;
    return g.clase === 'soft' ? 'basica' : (lowEnd() || g.clase === 'debil') ? 'media' : 'alta'; },
  perfil(){ const pref = this.pref(), auto = pref === 'auto', dpr = window.devicePixelRatio || 1, g = this.gpu(), le = lowEnd();
    const tier = auto ? this.tierAuto() : pref; const m = auto ? this.memo(false) : null; const esc = (m && m.tier === tier && m.esc > 0) ? clamp(m.esc, 0.3, 1) : 1;
    const T = { alta:{ max:2, aa:true, env:'full', low:false, lbl:0, pulse:true, sombra:128 },
                media:{ max:1.25, aa:!le && g.clase === 'ok', env:'full', low:le, lbl:0, pulse:true, sombra:128 },
                basica:{ max:1, aa:false, env:'simple', low:true, lbl:70, pulse:false, sombra:64 } }[tier];
    const prMax = Math.min(dpr, T.max), prMin = Math.min(prMax, 0.75);
    return { pref, tier, auto, gov: auto || tier === 'basica', prMax, prMin, pr: Math.max(prMin, Math.round(prMax*esc*100)/100), aa:T.aa, env:T.env, low:T.low, lblMs:T.lbl, pulse:T.pulse, sombra:T.sombra }; },
  /* lo que aprende la opción automática, para la próxima escena */
  recordar(E, ev){ if (!E.q || !E.q.auto) return; const m = this.memo(true); if (!m) return; const TI = ['basica','media','alta'], i = TI.indexOf(E.q.tier);
    if (!m.tier) m.tier = E.q.tier;
    if (ev === 'lento'){ m.tier = TI[Math.max(0, i-1)]; m.esc = 1; m.ok = 0; }
    else if (ev === 'holgura'){ m.ok = (m.ok||0) + 1; const tope = this.gpu().clase === 'soft' ? 1 : 2; if (m.ok >= 2 && m.tier === E.q.tier && i < tope){ m.tier = TI[i+1]; m.esc = 1; m.ok = 0; } }
    else if (m.tier === E.q.tier && E.q.prMax > 0){ m.esc = Math.round(clamp(E.pr / E.q.prMax, 0.3, 1)*100)/100; }
    clearTimeout(this._gt); this._gt = setTimeout(() => { try { Store.save(); } catch(_){} }, 1500); },
  nombreEfectivo(E){ const q = E ? E.q : this.perfil(); return CAL_NIV[q.tier].t; },
  /* cambiar la calidad reconstruye la vista actual (conserva el desplazamiento y devuelve el foco al indicador) */
  reconstruir(){ const y = window.scrollY; render(); window.scrollTo(0, y);
    requestAnimationFrame(() => { const b = document.querySelector('#view .cal-q'); if (b) try { b.focus({ preventScroll:true }); } catch(_){} }); },
  cambiar(v){ if (v === this.pref()) return false; this.set(v); toast('Calidad del 3D: ' + CAL_NIV[v].t + '. La escena se vuelve a dibujar.'); this.reconstruir(); return true; },
  estadoTexto(E){ const q = E.q, nf = v => v.toLocaleString('es-EC', { maximumFractionDigits:2 });
    let s = 'Ahora: ' + CAL_NIV[q.tier].t + (q.auto ? ' (elegida automáticamente)' : '') + ' · resolución ×' + nf(E.pr);
    if (E.pr < q.prMax - 0.01) s += ' (reducida para ir fluido)';
    if (E.fps > 0.5 && E._nRender > 3) s += ' · ' + Math.round(E.fps) + ' cuadros/s';
    if (E.low) s += ' · geometría simplificada';
    return s + '.'; },
  /* ---------- barra del escenario ---------- */
  montar(E){ const st = E.container; if (E.opts.controles === false || !(E.opts.controles === true || (st.classList && st.classList.contains('stage')))) return;
    const btn = (cls, attrs, ...kids) => h('button', Object.assign({ class:'cal-b ' + cls, type:'button' }, attrs), ...kids);
    const bPausa = btn('cal-pausa', { onclick:() => E.pausar(!E.pausado) });
    const bPaso = btn('cal-paso', { 'aria-label':'Avanzar un paso de 1/30 de segundo', title:'Avanzar un paso (1/30 s)', html:CAL_ICO.paso, onclick:() => E.paso() });
    const bVel = btn('cal-vel', { onclick:() => { const i = CAL_VEL.indexOf(E.velocidad); E.setVelocidad(CAL_VEL[(i + 1) % CAL_VEL.length]); } });
    const gT = h('div', { class:'cal-grp cal-tiempo', role:'group', 'aria-label':'Tiempo de la animación' }, bPausa, bPaso, bVel);
    const sep1 = h('span', { class:'cal-sep', 'aria-hidden':'true' });
    const bMed = E.escala ? btn('cal-medir', { 'aria-pressed':'false', onclick:() => E.medir(!(E._med && E._med.on)) }) : null;
    if (bMed){ bMed.innerHTML = CAL_ICO.regla; bMed.append(h('span', { class:'cal-tx-l' }, 'Medir')); }
    const sep2 = bMed ? h('span', { class:'cal-sep', 'aria-hidden':'true' }) : null;
    const niv = h('span', { class:'cal-niv', 'aria-hidden':'true' }, h('i'), h('i'), h('i')), qTx = h('span', { class:'cal-tx' });
    const bQ = btn('cal-q', { 'aria-haspopup':'dialog', 'aria-expanded':'false', onclick:(e) => { e.stopPropagation(); menu.hidden ? abrir() : cerrar(); } }, niv, qTx);
    const bar = h('div', { class:'cal-bar', role:'toolbar', 'aria-label':'Controles de la vista 3D', 'data-pos':'' }, gT, sep1, bMed, sep2, bQ);
    /* menú de calidad */
    const ops = Object.keys(CAL_NIV).map(k => h('button', { class:'cal-op', type:'button', role:'radio', 'data-v':k, onclick:() => { if (!Calidad.cambiar(k)) cerrar(true); },
      onkeydown:(e) => { const L = [...ops]; const i = L.indexOf(e.currentTarget); if (e.key === 'ArrowDown' || e.key === 'ArrowRight'){ e.preventDefault(); L[(i+1)%L.length].focus(); } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft'){ e.preventDefault(); L[(i-1+L.length)%L.length].focus(); } } },
      h('span', { class:'cal-rd', 'aria-hidden':'true' }), h('b', {}, CAL_NIV[k].t), h('small', {}, CAL_NIV[k].d)));
    const est = h('p', { class:'cal-m-est' });
    const menu = h('div', { class:'cal-menu', role:'dialog', 'aria-label':'Calidad de la vista 3D', hidden:'' },
      h('div', { class:'cal-m-t' }, h('span', {}, 'Calidad del 3D'), h('button', { class:'cal-m-x', type:'button', 'aria-label':'Cerrar', onclick:() => cerrar(true) }, '×')),
      h('div', { class:'cal-m-ops', role:'radiogroup', 'aria-label':'Calidad' }, ops), est,
      h('p', { class:'cal-m-nota' }, 'Al cambiarla, la escena se vuelve a construir desde el inicio. Se guarda en este dispositivo; también está en «Mi forma de aprender».'));
    st.append(bar, menu);
    let tEst = 0;
    const fuera = e => { if (!menu.hidden && !menu.contains(e.target) && !bQ.contains(e.target)) cerrar(); };
    const escK = e => { if (e.key === 'Escape' && !menu.hidden){ e.stopPropagation(); cerrar(true); } };
    function abrir(){ const p = Calidad.pref(); ops.forEach(o => { const on = o.dataset.v === p; o.setAttribute('aria-checked', String(on)); o.tabIndex = on ? 0 : -1; });
      est.textContent = Calidad.estadoTexto(E); menu.hidden = false; bQ.setAttribute('aria-expanded', 'true'); ponerMenu();
      clearInterval(tEst); tEst = setInterval(() => { if (!menu.hidden) est.textContent = Calidad.estadoTexto(E); }, 1000);
      document.addEventListener('pointerdown', fuera, true); document.addEventListener('keydown', escK, true);
      const f = ops.find(o => o.getAttribute('aria-checked') === 'true'); if (f) f.focus({ preventScroll:true }); }
    function cerrar(foco){ if (menu.hidden) return; menu.hidden = true; bQ.setAttribute('aria-expanded', 'false'); clearInterval(tEst);
      document.removeEventListener('pointerdown', fuera, true); document.removeEventListener('keydown', escK, true); if (foco) bQ.focus({ preventScroll:true }); }
    function ponerMenu(){ const W = st.clientWidth, H = st.clientHeight, x = bar.offsetLeft, y = bar.offsetTop, bw = bar.offsetWidth, bh = bar.offsetHeight, s = menu.style;
      s.left = s.right = s.top = s.bottom = '';
      if (x + bw/2 > W/2) s.right = Math.max(10, W - x - bw) + 'px'; else s.left = Math.max(10, x) + 'px';
      if (y + bh/2 > H/2) s.bottom = (H - y + 6) + 'px'; else s.top = (y + bh + 6) + 'px'; }
    /* ubicación: la primera esquina libre de otros controles del escenario */
    function obstaculos(cr){ const out = [], A = cr.width*cr.height, skip = new Set([bar, menu, E.canvas, E.labelsEl, E.markersEl, E._med && E._med.el].filter(Boolean));
      const visita = (el, d) => { for (const c of el.children){ if (skip.has(c)) continue; const cs = getComputedStyle(c); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
        if (d === 0 && !/absolute|fixed|sticky/.test(cs.position)) continue;
        if (cs.pointerEvents === 'none' && c.children.length && d < 3){ visita(c, d+1); continue; }
        const r = c.getBoundingClientRect(); if (r.width < 2 || r.height < 2 || r.width*r.height > A*0.45) continue;
        out.push({ l:r.left-cr.left, t:r.top-cr.top, r:r.right-cr.left, b:r.bottom-cr.top }); } };
      visita(st, 0); return out; }
    function colocar(){ if (!bar.isConnected) return; const cr = st.getBoundingClientRect(); if (cr.width < 40) return;
      const W = cr.width, H = cr.height, bw = bar.offsetWidth, bh = bar.offsetHeight, M = 10, obs = obstaculos(cr);
      const cand = [['br', W-M-bw, H-M-bh], ['bl', M, H-M-bh], ['tr', W-M-bw, M], ['tl', M, M], ['br2', W-M-bw, H-M-bh-46], ['tr2', W-M-bw, M+46], ['bl2', M, H-M-bh-46], ['tl2', M, M+46], ['bc', (W-bw)/2, H-M-bh]];
      const solape = (x, y) => obs.reduce((a, o) => a + Math.max(0, Math.min(x+bw, o.r) - Math.max(x, o.l)) * Math.max(0, Math.min(y+bh, o.b) - Math.max(y, o.t)), 0);
      let best = null, ba = Infinity; for (const [id, x, y] of cand){ const a = solape(x, y) + (x < 0 ? 1e6 : 0); if (a < ba - 1){ best = { id, x, y }; ba = a; if (a === 0) break; } }
      if (!best) return; if (bar.dataset.pos !== best.id || bar.style.left !== Math.round(best.x) + 'px' || bar.style.top !== Math.round(best.y) + 'px'){ bar.style.left = Math.round(best.x) + 'px'; bar.style.top = Math.round(best.y) + 'px'; bar.dataset.pos = best.id; E.invalidate(300); }
      E.obstaculos = [{ l:best.x - 4, t:best.y - 4, r:best.x + bw + 4, b:best.y + bh + 4 }];
      /* la indicación de la regla va junto a la barra */
      if (E._med && E._med.hint){ const hs = E._med.hint.style, abajo = best.y + bh/2 > H/2, der = best.x + bw/2 > W/2; hs.left = hs.right = hs.top = hs.bottom = '';
        if (der) hs.right = (W - best.x - bw) + 'px'; else hs.left = best.x + 'px'; if (abajo) hs.bottom = (H - best.y + 6) + 'px'; else hs.top = (best.y + bh + 6) + 'px'; }
      if (!menu.hidden) ponerMenu(); }
    const fmtV = v => '×' + String(v).replace('.', ',');
    function sync(){ if (!bar.isConnected) return; const q = E.q, conT = E.conTiempo;
      gT.hidden = !conT; sep1.hidden = !conT;
      bPausa.innerHTML = E.pausado ? CAL_ICO.play : CAL_ICO.pausa; bPausa.setAttribute('aria-pressed', String(!!E.pausado));
      const lp = E.pausado ? 'Reanudar la animación' : 'Pausar la animación'; bPausa.setAttribute('aria-label', lp + ' (barra espaciadora con el modelo enfocado)'); bPausa.title = (E._pausaAuto ? 'En pausa por la preferencia de menos movimiento. ' : '') + lp + ' (Espacio)';
      bVel.textContent = fmtV(E.velocidad); bVel.setAttribute('aria-label', 'Velocidad de la animación: ' + fmtV(E.velocidad) + '. Pulsa para cambiarla'); bVel.title = 'Velocidad ' + fmtV(E.velocidad) + ' (×0,25 · ×0,5 · ×1 · ×2)';
      if (bMed){ const on = !!(E._med && E._med.on); bMed.setAttribute('aria-pressed', String(on)); const u = E.escala; const ayuda = `Medir distancias en el modelo (1 unidad = ${String(u.porUnidad.toLocaleString('es-EC', { maximumFractionDigits:2 }))} ${u.unidad})`;
        bMed.setAttribute('aria-label', on ? 'Quitar la regla (Esc)' : ayuda + '. Toca dos puntos; con teclado, enfoca el modelo y pulsa Intro para medir en el centro'); bMed.title = on ? 'Quitar la regla (Esc)' : 'Medir: toca dos puntos del modelo'; }
      const n = { alta:3, media:2, basica:1 }[q.tier]; [...niv.children].forEach((i, k) => i.classList.toggle('on', k < n));
      const ancho = st.clientWidth >= 560; qTx.textContent = q.auto ? (ancho ? 'Auto · ' + CAL_NIV[q.tier].t : 'Auto') : CAL_NIV[q.tier].t;
      bQ.setAttribute('aria-label', 'Calidad del 3D: ' + CAL_NIV[q.pref].t + (q.auto ? ' (ahora ' + CAL_NIV[q.tier].t + ')' : '') + '. Cambiar'); bQ.title = 'Calidad del 3D';
      colocar(); }
    E._calUI = { bar, flash(){ if (bPausa.isConnected && !gT.hidden){ bPausa.classList.remove('cal-flash'); void bPausa.offsetWidth; bPausa.classList.add('cal-flash'); setTimeout(() => bPausa.classList.remove('cal-flash'), 1500); } } };
    E.alCambiar(sync); E._emitResize = () => { clearTimeout(E._calRz); E._calRz = setTimeout(sync, 60); };
    requestAnimationFrame(sync);
    const tm = setInterval(() => { if (E.enVista && !document.hidden) colocar(); }, 1800);
    (E._alDisponer ||= []).push(() => { clearInterval(tm); clearInterval(tEst); cerrar(); bar.remove(); menu.remove(); });
  }
};
/* si está en pausa (elegida por el estudiante) y usa un control de la página, se lo recuerda con un destello en ▶ */
document.addEventListener('click', e => { const el = e.target && e.target.closest ? e.target.closest('#view button, #view input, #view select, #view .opt') : null; if (!el || el.closest('.cal-bar, .cal-menu')) return;
  setTimeout(() => { if (typeof Engine3D === 'undefined' || !Engine3D.live) return; Engine3D.live.forEach(E => { if (E.pausado && E.conTiempo && E._calUI && !E._pausaAuto) E._calUI.flash(); }); }, 0); }, true);

/* ---------- "Mi forma de aprender": preferencia global ---------- */
POST_RENDER.push((view, path) => {
  if (path !== '/accesibilidad' || !view) return;
  const grid = view.querySelector('.a11y-grid'); if (!grid || grid.querySelector('.cal-card')) return;
  const g = Calidad.gpu(), est = h('p', { class:'small muted cal-card-est' });
  const pintaEst = () => { const p = Calidad.pref(); const ta = Calidad.tierAuto();
    est.textContent = p === 'auto' ? `En este equipo empieza en ${CAL_NIV[ta].t}${g.clase === 'soft' ? ' (se detectaron gráficos por software, sin aceleración)' : g.clase === 'debil' ? ' (tarjeta gráfica modesta)' : ''} y se ajusta mientras usas cada modelo.`
      : p === 'basica' ? 'Los modelos se construyen con menos detalle; la resolución baja un poco más si hace falta.' : p === 'alta' ? 'Si notas saltos o el equipo se calienta, prueba Media o Automática.' : 'Resolución moderada con todo el detalle que tu equipo permita.'; };
  const row = h('div', { class:'segbtns', role:'group', 'aria-label':'Calidad de los modelos 3D' }, Object.keys(CAL_NIV).map(k => h('button', { 'aria-pressed':String(Calidad.pref() === k), 'data-v':k, title:CAL_NIV[k].d,
    onclick:() => { Calidad.set(k); [...row.children].forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === k))); pintaEst(); toast('Calidad del 3D: ' + CAL_NIV[k].t + '.'); } }, CAL_NIV[k].t)));
  pintaEst();
  grid.append(h('div', { class:'a11y-card cal-card' }, h('h3', {}, 'Calidad de los modelos 3D'),
    h('p', { class:'small' }, 'Si los modelos 3D van lentos o la batería se gasta rápido, baja la calidad. «Automática» mide la fluidez y se ajusta sola. También puedes cambiarla desde el indicador de cada escenario 3D.'), row, est));
  const at = [...view.querySelectorAll('.card')].find(c => /Atajos de teclado/.test(c.textContent)), ul = at && at.querySelector('ul');
  if (ul && !ul.querySelector('.cal-li')) [['Espacio','Pausar o reanudar la animación 3D (con el modelo enfocado)'], ['Intro','Con la regla activa, medir en el centro del modelo'], ['Esc','Quitar la regla de medición']].forEach(([k, d]) => ul.append(h('li', { class:'cal-li' }, h('b', { class:'mono' }, k), ' — ', d)));
});
</script>
