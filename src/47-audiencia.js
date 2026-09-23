<style>
/* ===== Audiencia científica simulada · 10.º EGB · CVT U3 ===== */
.aud-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.aud-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.aud-nav button[aria-current="true"]{background:var(--mis);border-color:var(--mis);color:#fff}
.aud-nav button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.aud-nav button .aud-tick{margin-left:6px;font-weight:700}

.aud-partes{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.aud-parte{border:1px solid var(--line);border-left:4px solid var(--mis);border-radius:12px;padding:10px 12px;background:var(--bg-2)}
.aud-parte h4{margin:0 0 2px;font-size:.92rem}
.aud-parte .aud-rol{display:block;font:600 .72rem/1.5 "IBM Plex Mono",monospace;color:var(--ink-3);letter-spacing:.04em;text-transform:uppercase}
.aud-parte p{margin:5px 0 0;font-size:.84rem;line-height:1.4;color:var(--ink-2)}
.aud-parte .aud-quiere{display:block;margin-top:6px;font-size:.8rem;color:var(--ink-2);border-top:1px dashed var(--line);padding-top:5px}

.aud-pieza{border:1px solid var(--line);border-radius:14px;background:var(--bg-2);overflow:hidden;margin-bottom:10px}
.aud-pieza>.hd{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;background:var(--bg-3);border-bottom:1px solid var(--line);padding:8px 12px}
.aud-pieza>.hd b{font-size:.9rem}
.aud-pieza>.bd{padding:10px 12px;font-size:.87rem;line-height:1.45}
.aud-pieza>.bd p{margin:0 0 8px}
.aud-pieza .aud-fuente{font:.76rem/1.45 "IBM Plex Mono",monospace;color:var(--ink-3);border-top:1px dashed var(--line);padding-top:6px;margin:8px 0 0}
.aud-pieza>.ft{border-top:1px solid var(--line);padding:9px 12px;display:grid;gap:8px;background:var(--bg-3)}
.aud-pieza.aud-ok{border-color:var(--ok)}
.aud-pieza.aud-bad{border-color:var(--bad)}
.aud-cod{font:700 .72rem/1.6 "IBM Plex Mono",monospace;color:#fff;background:var(--mis);border-radius:6px;padding:1px 8px;letter-spacing:.05em}
.aud-eje{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.aud-eje>span.aud-lb{font:600 .74rem/1.6 "IBM Plex Sans",sans-serif;color:var(--ink-3);min-width:88px}
.aud-opt{border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:5px 12px;font:600 .76rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.aud-opt[aria-pressed="true"]{border-color:var(--mis);background:var(--mis);color:#fff}
.aud-opt:disabled{opacity:.7;cursor:default}
.aud-opt:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.aud-fbk{margin:0;font-size:.83rem;line-height:1.45;color:var(--ink-2);border-left:3px solid var(--line);padding-left:10px}
.aud-fbk.aud-ok{border-left-color:var(--ok)}
.aud-fbk.aud-bad{border-left-color:var(--bad)}
.aud-fbk b{color:var(--ink)}
.aud-mk{font-weight:700;margin-right:5px}

.aud-test{border-left:3px solid var(--warn);padding:2px 0 2px 12px;margin:0 0 10px;font-size:.87rem;line-height:1.45}
.aud-test i{display:block;color:var(--ink-2)}
.aud-test b{display:block;margin-top:4px;font-size:.78rem;color:var(--ink-3);font-family:"IBM Plex Mono",monospace;font-weight:600}

.aud-sel{display:grid;gap:6px}
.aud-sel label{display:grid;grid-template-columns:auto 1fr;gap:9px;align-items:start;border:1px solid var(--line);border-radius:11px;padding:8px 11px;background:var(--bg-2);cursor:pointer;font-size:.85rem;line-height:1.35}
.aud-sel label:focus-within{border-color:var(--accent)}
.aud-sel input{margin-top:3px}
.aud-sel small{display:block;color:var(--ink-3);font-size:.75rem;margin-top:2px}
.aud-sel label.aud-on{border-color:var(--mis)}

.aud-arg{display:grid;gap:9px;border:2px solid var(--line);border-radius:14px;padding:12px;background:var(--bg-2)}
.aud-arg .aud-slot{display:grid;gap:3px}
.aud-arg .aud-slot>span{font:700 .72rem/1.6 "IBM Plex Mono",monospace;color:var(--mis);letter-spacing:.06em;text-transform:uppercase}
.aud-arg .aud-slot>div{font-size:.87rem;line-height:1.45;color:var(--ink-2);border-left:3px solid var(--line);padding-left:10px;min-height:20px}

.aud-med{display:grid;gap:8px}
.aud-med .aud-card{border:1.5px solid var(--line);border-radius:14px;padding:11px 13px;background:var(--bg-2);cursor:pointer;display:grid;gap:5px}
.aud-med .aud-card[aria-pressed="true"]{border-color:var(--mis);box-shadow:inset 0 0 0 1px var(--mis)}
.aud-med .aud-card:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.aud-med h4{margin:0;font-size:.92rem;text-align:left}
.aud-med p{margin:0;font-size:.83rem;line-height:1.4;color:var(--ink-2);text-align:left}
.aud-med .aud-nums{display:flex;flex-wrap:wrap;gap:6px}
.aud-tag{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--line);border-radius:999px;padding:1px 9px;font:600 .7rem/1.7 "IBM Plex Mono",monospace;color:var(--ink-2);background:var(--bg-3)}

.aud-score{display:grid;gap:3px;font-family:"IBM Plex Mono",monospace;font-size:.8rem;color:var(--ink-2);background:var(--bg-3);border:1px solid var(--line);border-radius:12px;padding:10px 12px}
.aud-score b{font-family:"IBM Plex Sans",sans-serif}
.aud-score .tot{border-top:1px solid var(--line);margin-top:4px;padding-top:5px;color:var(--ink);font-weight:700}
.aud-bar{height:14px;border-radius:999px;background:var(--bg-3);border:1px solid var(--line);overflow:hidden}
.aud-bar i{display:block;height:100%;background:var(--mis);transition:width .35s ease}
[data-motion="reducido"] .aud-bar i{transition:none}
.aud-quad{border-collapse:collapse;width:100%;font-size:.82rem}
.aud-quad td,.aud-quad th{border:1px solid var(--line);padding:7px 9px;text-align:left;vertical-align:top}
.aud-quad th{background:var(--bg-3);font-size:.76rem;color:var(--ink-2)}
@media (max-width:640px){.aud-eje>span.aud-lb{min-width:100%}}
/* v1.7 · ilustración del caso y visualizaciones de la evidencia */
.aud-art{width:100%;height:auto;display:block;background:var(--bg-3);border:1px solid var(--line);border-radius:14px}
.aud-viz{width:100%;max-width:700px;height:auto;display:block;margin:8px 0 6px}
.aud-humo{animation:aud-humo 7s linear infinite;transform-box:fill-box;transform-origin:center}
@keyframes aud-humo{0%{transform:translate(0,0) scale(.6);opacity:0}15%{opacity:.75}55%{transform:translate(var(--dx,20px),-58px) scale(1.4);opacity:.7}100%{transform:translate(calc(var(--dx,20px)*3),-66px) scale(2.1);opacity:0}}
.aud-bus{animation:aud-bus 9s ease-in-out infinite alternate}
@keyframes aud-bus{from{transform:translateX(0)}to{transform:translateX(70px)}}
[data-motion="reducido"] .aud-humo,[data-motion="reducido"] .aud-bus{animation:none}
@media (prefers-reduced-motion:reduce){.aud-humo,.aud-bus{animation:none}}
.aud-artw{overflow-x:auto;-webkit-overflow-scrolling:touch}
@media (max-width:640px){.aud-artw>svg.aud-art{min-width:600px}.aud-artw>svg.aud-viz{min-width:520px}}
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · AUDIENCIA CIENTÍFICA SIMULADA
   10.º EGB · Ciencias de la Vida y de la Tierra · Unidad 3
   "Decisiones sociocientíficas y sostenibilidad"  (id de unidad: 10-cvt-3)
   Destrezas: AO.CVT.10.07 · AO.CVT.10.08 · AO.CVT.10.09
   Ruta: #/cn/audiencia   ·   Actividad: cn-audiencia
   Tipo de recurso: CASO de argumentación (no es un laboratorio 3D).
   ===================================================================== */

/* Registro defensivo de la actividad: no se toca src/03-data.js ni src/30-cn-data.js */
if (typeof BIO !== 'undefined' && BIO.activities && !BIO.activities['cn-audiencia'])
  Object.assign(BIO.activities, { 'cn-audiencia': { t:'Audiencia científica simulada', unidad:null, peso:0, xp:150 } });
if (typeof ACT_HREF !== 'undefined') ACT_HREF['cn-audiencia'] = '#/cn/audiencia';

/* ---------- utilidades locales (español de Ecuador: coma decimal) ---------- */
const audN   = (v, d = 1) => Number(v).toFixed(d).replace('.', ',');
const audMil = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const audMes = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

/* =====================================================================
   ILUSTRACIONES (v1.7): el valle con la inversión térmica y la evidencia en gráficos
   ===================================================================== */
const audMov = () => (typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion);
function audValleSVG(){
  const W = 720, H = 350, mov = audMov(), inv = 150;
  let s = `<svg class="aud-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ilustración del caso: San Rafael del Valle, una ciudad en el fondo de un valle andino entre dos cordilleras. Sobre la ciudad, una capa de aire más cálido, la inversión térmica, funciona como una tapa: el humo de los buses y del tráfico del Centro Histórico sube, choca con esa capa y se queda extendido sobre la ciudad en lugar de dispersarse.">`;
  s += `<defs><linearGradient id="audCielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E9BD0" stop-opacity=".32"/><stop offset="1" stop-color="#E9C99A" stop-opacity=".18"/></linearGradient>
    <linearGradient id="audMonI" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="300"><stop offset="0" stop-color="#F2F5F7"/><stop offset=".08" stop-color="#A89C8A"/><stop offset=".35" stop-color="#8E8A62"/><stop offset=".7" stop-color="#6A8A4C"/><stop offset="1" stop-color="#4E6E3C"/></linearGradient>
    <linearGradient id="audInv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0A060" stop-opacity="0"/><stop offset=".5" stop-color="#F0A060" stop-opacity=".34"/><stop offset="1" stop-color="#F0A060" stop-opacity=".08"/></linearGradient>
    <linearGradient id="audSmog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6E6A62" stop-opacity=".55"/><stop offset="1" stop-color="#8E8A80" stop-opacity=".15"/></linearGradient>
    <radialGradient id="audSol" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#FFF2C4"/><stop offset="1" stop-color="#F2B640"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="var(--bg-3)"/><rect width="${W}" height="${H}" fill="url(#audCielo)"/>`;
  s += `<circle cx="608" cy="58" r="22" fill="url(#audSol)" opacity=".9"/>`;
  /* cordilleras a los dos lados del valle */
  s += `<path d="M0 300 L0 90 L40 70 L70 44 L96 72 L130 100 L170 150 L210 212 L250 262 L250 300 Z" fill="url(#audMonI)"/>`;
  s += `<path d="M720 300 L720 96 L684 72 L652 40 L626 70 L596 96 L556 150 L516 214 L470 262 L470 300 Z" fill="url(#audMonI)"/>`;
  s += `<path d="M58 54 L70 44 L84 58 L74 60 Z M640 50 L652 40 L664 52 L652 55 Z" fill="#F2F5F7"/>`;
  s += `<text x="16" y="128" font-size="11" font-weight="600" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">cordillera</text><text x="704" y="226" text-anchor="end" font-size="11" font-weight="600" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">cordillera</text>`;
  /* fondo del valle con barrios, parque y Centro Histórico */
  s += `<path d="M150 300 L200 258 C260 248 460 248 520 258 L570 300 Z" fill="#9A8C72"/>`;
  const R = (() => { let k = 7; return () => (k = (k*9301 + 49297) % 233280) / 233280; })();
  for (let i=0; i<30; i++){ const x = 196 + i*11 + R()*4, hh = 8 + R()*10, y = 262 - hh + (Math.abs(i - 15) > 11 ? 6 : 0);
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="9" height="${hh.toFixed(1)}" fill="${['#E6D6BC','#D9C4A4','#EDE2CE'][i%3]}" stroke="#8A7458" stroke-width=".6"/><path d="M${x.toFixed(1)} ${y.toFixed(1)} h9" stroke="#B0462E" stroke-width="2"/>`; }
  /* iglesia del Centro Histórico: dos torres y cúpula */
  s += `<g><rect x="342" y="226" width="36" height="34" fill="#F2EEE4" stroke="#8A7458"/><rect x="336" y="208" width="10" height="52" fill="#F2EEE4" stroke="#8A7458"/><rect x="374" y="208" width="10" height="52" fill="#F2EEE4" stroke="#8A7458"/>`
    + `<path d="M336 208 l5 -10 l5 10z M374 208 l5 -10 l5 10z" fill="#5E7AA0"/><path d="M348 226 a12 12 0 0 1 24 0z" fill="#5E7AA0"/><rect x="356" y="244" width="8" height="16" rx="4" fill="#6B4A34"/></g>`;
  s += `<g fill="#3E7A3C">` + [[214,252,9],[228,248,11],[244,252,8]].map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('') + `</g>`;
  s += `<text x="228" y="278" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="#F7F2E8">El Parque (norte)</text>`;
  s += `<text x="360" y="292" text-anchor="middle" font-size="11.5" font-weight="700" fill="#F7F2E8">Centro Histórico</text>`;
  s += `<text x="486" y="278" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="#F7F2E8">Terminal (sur)</text>`;
  /* calle con buses diésel que echan humo */
  s += `<path d="M200 266 H520" stroke="#5A5248" stroke-width="6"/>`;
  [[236,0],[350,-3],[414,-6]].forEach(([x,d],i) => { s += `<g class="${mov?'aud-bus':''}" style="animation-delay:${-i*3}s"><rect x="${x}" y="${257+d*0}" width="26" height="11" rx="2" fill="${i===1?'#2E7DB8':'#D9A21E'}" stroke="#333" stroke-width=".8"/><rect x="${x+3}" y="259" width="18" height="4" fill="#CFE3F0"/><circle cx="${x+6}" cy="269" r="2.3" fill="#222"/><circle cx="${x+20}" cy="269" r="2.3" fill="#222"/></g>`; });
  /* humo que sube desde el tráfico y queda atrapado bajo la tapa */
  s += `<path d="M190 ${inv+26} C260 ${inv+14} 460 ${inv+14} 540 ${inv+28} L520 250 L200 250 Z" fill="url(#audSmog)"/>`;
  for (let i=0; i<12; i++){ const x = 250 + (i%6)*44, y = 246 - (i>5 ? 20 : 0), dx = (i%2 ? 1 : -1)*(12 + (i%3)*6);
    s += `<circle class="${mov?'aud-humo':''}" style="--dx:${dx}px;animation-delay:${(-i*0.6).toFixed(1)}s" cx="${x}" cy="${mov ? y : inv + 30 + (i%4)*8}" r="${mov ? 8 : 12}" fill="#6E6A62" opacity="${mov ? 0 : .45}"/>`; }
  /* la capa de inversión: aire más cálido encima del aire frío del valle */
  s += `<path d="M150 ${inv-22} C260 ${inv-34} 460 ${inv-34} 570 ${inv-22} L566 ${inv+12} C460 ${inv} 260 ${inv} 154 ${inv+12} Z" fill="url(#audInv)"/>`;
  s += `<path d="M154 ${inv+12} C260 ${inv} 460 ${inv} 566 ${inv+12}" fill="none" stroke="#D2692A" stroke-width="2.4" stroke-dasharray="8 5"/>`;
  s += `<text x="360" y="${inv-14}" text-anchor="middle" font-size="12" font-weight="700" fill="#B4501E" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">capa de inversión térmica: aire más cálido que hace de tapa</text>`;
  s += `<text x="360" y="${inv+44}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">aire frío y humo atrapados en el valle (junio–septiembre)</text>`;
  s += `<g><path d="M600 ${inv+46} V${inv-36}" stroke="var(--ink-3)" stroke-width="1.4"/><path d="M596 ${inv-30} l4 -8 l4 8z" fill="var(--ink-3)"/><text x="606" y="${inv-26}" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">más cálido</text><text x="606" y="${inv+42}" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">más frío</text></g>`;
  s += `<text x="360" y="336" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-3)">2.640 m · ciudad simulada · esquema sin escala</text>`;
  return s + `</svg>`;
}
/* P2: parte de la flota frente a parte del hollín */
function audFlotaSVG(){
  const W = 640, fila = 40, H = 36 + AUD_FLOTA.length*fila + 20, x0 = 210, ancho = 380, corto = ['Buses diésel anteriores a 2005','Camiones diésel de +12 años','Buses y camiones recientes','Autos a gasolina','Motocicletas'];
  let s = `<svg class="aud-viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de barras: porcentaje de la flota y porcentaje del hollín de cada tipo de vehículo. Los diésel anteriores a 2005 y los camiones viejos son el 7,9 % de la flota y aportan el 62 % del hollín.">`;
  s += `<rect x="${x0}" y="10" width="12" height="10" rx="2" fill="var(--ink-3)"/><text x="${x0+18}" y="19" font-size="12" fill="var(--ink-2)">% de la flota</text><rect x="${x0+130}" y="10" width="12" height="10" rx="2" fill="var(--bad)"/><text x="${x0+148}" y="19" font-size="12" fill="var(--ink-2)">% del hollín del Centro</text>`;
  AUD_FLOTA.forEach((f, i) => { const y = 34 + i*fila, viejo = i < 2;
    s += `<text x="${x0-10}" y="${y+14}" font-size="11.5" text-anchor="end" fill="var(--ink)" font-weight="${viejo?700:400}">${esc(corto[i] || f.t)}</text>`;
    s += `<rect x="${x0}" y="${y+2}" width="${(f.pct/80*ancho).toFixed(1)}" height="12" rx="3" fill="var(--ink-3)" opacity=".7"/><text x="${(x0 + f.pct/80*ancho + 6).toFixed(1)}" y="${y+12}" font-size="10.5" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)">${audN(f.pct,1)} %</text>`;
    s += `<rect x="${x0}" y="${y+17}" width="${(f.ap/80*ancho).toFixed(1)}" height="12" rx="3" fill="var(--bad)" opacity="${viejo?1:.55}"/><text x="${(x0 + f.ap/80*ancho + 6).toFixed(1)}" y="${y+27}" font-size="10.5" font-family="IBM Plex Mono, monospace" fill="var(--ink)" font-weight="${viejo?700:400}">${f.ap} %</text>`; });
  return s + `</svg>`;
}
/* P3: el feriado, antes, durante y después */
function audFeriadoSVG(){
  const W = 640, H = 230, x0 = 60, y0 = 180, alto = 140, max = 40, bw = 28, paso = 112;
  const Y = v => y0 - v/max*alto;
  let s = `<svg class="aud-viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de barras del PM2,5 en el Centro y en el parque antes, durante y después del cierre vehicular. En el Centro baja de 34,8 a 22,4 µg/m³ durante el cierre y vuelve a 33,9 al reabrir; en el parque casi no cambia.">`;
  [0,10,20,30,40].forEach(v => { s += `<line x1="${x0}" y1="${Y(v)}" x2="${W-10}" y2="${Y(v)}" stroke="var(--chart-grid, var(--line))"/><text x="${x0-8}" y="${Y(v)+4}" font-size="10.5" text-anchor="end" fill="var(--ink-3)">${v}</text>`; });
  s += `<rect x="${x0 + paso*1 - 16}" y="${Y(40)}" width="${paso*3 - 10}" height="${alto}" fill="var(--ok)" opacity=".08"/><text x="${x0 + paso*2.4}" y="${Y(40)+14}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ok)">cierre vehicular del Centro</text>`;
  AUD_FERIADO.forEach((f, i) => { const x = x0 + 18 + i*paso;
    s += `<rect x="${x}" y="${Y(f.c).toFixed(1)}" width="${bw}" height="${(y0 - Y(f.c)).toFixed(1)}" rx="4" fill="var(--bad)"/><text x="${x + bw/2}" y="${(Y(f.c) - 5).toFixed(1)}" text-anchor="middle" font-size="10.5" font-family="IBM Plex Mono, monospace" fill="var(--ink)">${audN(f.c,1)}</text>`;
    s += `<rect x="${x + bw + 4}" y="${Y(f.p).toFixed(1)}" width="${bw}" height="${(y0 - Y(f.p)).toFixed(1)}" rx="4" fill="var(--ok)"/><text x="${x + bw*1.5 + 4}" y="${(Y(f.p) - 5).toFixed(1)}" text-anchor="middle" font-size="10.5" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)">${audN(f.p,1)}</text>`;
    s += `<text x="${x + bw + 2}" y="${y0 + 16}" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">${esc(f.d.replace(' (con tráfico)','').replace('Tres días ','3 días '))}</text>`; });
  s += `<line x1="${x0}" y1="${Y(15)}" x2="${W-10}" y2="${Y(15)}" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="6 4"/>`;
  s += `<rect x="${x0}" y="${H-20}" width="11" height="10" rx="2" fill="var(--bad)"/><text x="${x0+16}" y="${H-11}" font-size="11" fill="var(--ink-2)">Centro</text><rect x="${x0+80}" y="${H-20}" width="11" height="10" rx="2" fill="var(--ok)"/><text x="${x0+96}" y="${H-11}" font-size="11" fill="var(--ink-2)">parque · PM2,5 en µg/m³</text><line x1="${x0+300}" y1="${H-15}" x2="${x0+326}" y2="${H-15}" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="6 4"/><text x="${x0+332}" y="${H-11}" font-size="11" fill="var(--ink-2)">guía OMS: 15 µg/m³</text>`;
  return s + `</svg>`;
}
/* P4: tasa de crisis asmáticas por 10.000 habitantes, año 1 → año 6 */
function audHospSVG(){
  const W = 640, fila = 34, H = 40 + AUD_HOSP.length*fila + 16, x0 = 170, x1 = 600, max = 110;
  const X = v => x0 + v/max*(x1 - x0);
  let s = `<svg class="aud-viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tasa de crisis asmáticas por cada 10.000 habitantes en el año 1 y en el año 6 en cuatro parroquias. La del Centro Histórico es la más alta y la que más sube.">`;
  [0,25,50,75,100].forEach(v => { s += `<line x1="${X(v)}" y1="22" x2="${X(v)}" y2="${H-18}" stroke="var(--chart-grid, var(--line))"/><text x="${X(v)}" y="${H-4}" font-size="10.5" text-anchor="middle" fill="var(--ink-3)">${v}</text>`; });
  s += `<circle cx="${x0}" cy="12" r="5" fill="var(--bg-2)" stroke="var(--ink-3)" stroke-width="2"/><text x="${x0+9}" y="16" font-size="11" fill="var(--ink-2)">año 1</text><circle cx="${x0+70}" cy="12" r="5" fill="var(--bad)"/><text x="${x0+79}" y="16" font-size="11" fill="var(--ink-2)">año 6 · crisis por 10.000 habitantes</text>`;
  AUD_HOSP.forEach((r, i) => { const y = 40 + i*fila, a = r.y[0]/r.pob*10000, b = r.y[5]/r.pob*10000;
    s += `<text x="${x0-12}" y="${y+4}" text-anchor="end" font-size="11.5" fill="var(--ink)" font-weight="${i===0?700:400}">${esc(r.p)}</text>`;
    s += `<line x1="${X(a)}" y1="${y}" x2="${X(b)}" y2="${y}" stroke="var(--bad)" stroke-width="4" stroke-linecap="round" opacity=".45"/>`;
    s += `<circle cx="${X(a)}" cy="${y}" r="6" fill="var(--bg-2)" stroke="var(--ink-3)" stroke-width="2"/><circle cx="${X(b)}" cy="${y}" r="6" fill="var(--bad)"/>`;
    s += `<text x="${X(Math.max(a,b)) + 12}" y="${y+4}" font-size="10.5" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)">${audN(a,1)} → ${audN(b,1)}</text>`; });
  return s + `</svg>`;
}

/* =====================================================================
   0 · EL CASO
   Ciudad simulada, construida sobre una situación muy real del Ecuador:
   una ciudad andina de tamaño medio, encajonada en un valle, con
   inversión térmica en la estación seca y una flota de diésel antiguo.
   Todos los datos son simulados con fines didácticos.
   ===================================================================== */
const AUD_CASO = {
  ciudad: 'San Rafael del Valle',
  d: 'Ciudad andina simulada de 318.000 habitantes, a 2.640 m, en un valle cerrado por dos cordilleras. Entre junio y septiembre el aire frío queda atrapado bajo una capa de aire más cálido —una inversión térmica— y lo que se emite en la mañana no se dispersa hasta la tarde. El Centro Histórico, 18 manzanas, concentra el comercio, tres mercados, doce escuelas y el paso obligado de once líneas de buses.',
  decide: 'El Concejo Cantonal debe aprobar, en esta audiencia pública, UNA medida de calidad del aire para los próximos tres años, con un presupuesto comprometido de 4,2 millones de dólares. No se decide "si hay contaminación": se decide qué se hace, con cuánta plata, y quién asume el costo del cambio.',
  nodecide: ['Si el cambio climático existe (no es el tema de esta audiencia).','Cerrar el Centro Histórico para siempre.','Prohibir los carros particulares en toda la ciudad.','Retirar la concesión a las líneas de buses.'],
  norma: 'Referencia de salud usada en la audiencia: la guía de la Organización Mundial de la Salud recomienda no superar 15 µg/m³ de PM2,5 como promedio de 24 horas. La norma nacional vigente es menos exigente. Esa diferencia también es parte de la discusión.'
};

const AUD_PARTES = [
  { n:'Nube Tenesaca', rol:'Comunidad · Comité de padres', color:'--eco',
    d:'Preside el comité de padres de la escuela Sucre, en el corazón de la zona. Tres de sus vecinas tienen hijos con asma diagnosticada.',
    quiere:'Que la decisión proteja primero a los niños que ya están enfermos, y que se tome ahora.' },
  { n:'Wilson Guamán', rol:'Transporte · Federación de transportistas', color:'--warn',
    d:'Socio de la línea 12. Su bus tiene 19 años y una deuda pendiente. La flota de la ciudad promedia 16 años.',
    quiere:'Que no se prohíba circular sin antes ofrecer una forma real de renovar o reacondicionar el bus.' },
  { n:'María Chalán', rol:'Comercio · Comité del Centro Histórico',
    d:'Representa a 640 locales, la mayoría de menos de cuatro empleados. Muchos viven de clientes que llegan en carro o en bus desde las parroquias rurales.',
    quiere:'Que cualquier restricción venga con acceso garantizado y compensación durante la transición.' },
  { n:'Ing. Paúl Ordóñez', rol:'Técnica · Empresa municipal de movilidad',
    d:'Responsable de la red de monitoreo (tres estaciones) y del inventario de emisiones. Presenta datos, no propuestas políticas.',
    quiere:'Que la decisión se apoye en lo que los datos permiten afirmar, y que se digan también sus límites.' },
  { n:'Dra. Rocío Pesántez', rol:'Academia · Salud ambiental',
    d:'Investigadora de la universidad regional. Ha publicado sobre exposición infantil a material particulado en valles andinos.',
    quiere:'Que no se confunda una asociación estadística con una relación de causa, en ninguna de las dos direcciones.' },
  { n:'Concejo Cantonal', rol:'Autoridad · decide', color:'--mis',
    d:'Siete concejales. Escuchan a las partes, revisan el expediente y votan. Deben justificar el voto por escrito.',
    quiere:'Una medida legalmente sostenible, financiable en tres años y defendible ante la ciudadanía.' }
];

/* =====================================================================
   1 · EXPEDIENTE DE EVIDENCIA · 12 piezas
   pert: true/false  ·  fuerte: true/false
   ===================================================================== */

/* Serie de PM2,5 (µg/m³, promedio mensual) en las tres estaciones, 24 meses */
const AUD_PM25 = (() => {
  const base = [18,17,16,19,23,31,36,38,33,25,20,18];
  const centro = [], parque = [], norte = [];
  for (let i = 0; i < 24; i++){
    const m = i % 12, t = i / 23;
    centro.push({ x:i, y: Math.round((base[m] * 1.32 + 2 + t * 1.6) * 10) / 10 });
    parque.push({ x:i, y: Math.round((base[m] * 0.78 + t * 0.7) * 10) / 10 });
    norte.push({ x:i, y: Math.round((base[m] * 1.02 + 1 + t * 1.1) * 10) / 10 });
  }
  return { centro, parque, norte };
})();

/* Inventario de flota y aporte estimado al carbono negro del Centro */
const AUD_FLOTA = [
  { t:'Buses urbanos diésel anteriores al año 2005', n:412,   pct:3.1,  ap:38 },
  { t:'Camiones y volquetas diésel de más de 12 años', n:640, pct:4.8,  ap:24 },
  { t:'Buses y camiones diésel recientes',           n:520,   pct:3.9,  ap:7  },
  { t:'Automóviles particulares a gasolina',         n:9880,  pct:74.3, ap:19 },
  { t:'Motocicletas',                                n:1850,  pct:13.9, ap:12 }
];

/* Experimento natural: feriado con cierre vehicular del Centro, 3 días */
const AUD_FERIADO = [
  { d:'Tres días antes (con tráfico)', c:34.8, p:21.0 },
  { d:'Día 1 de cierre',               c:26.1, p:20.4 },
  { d:'Día 2 de cierre',               c:22.9, p:20.1 },
  { d:'Día 3 de cierre',               c:22.4, p:19.8 },
  { d:'Tres días después (con tráfico)', c:33.9, p:20.6 }
];

/* Registro hospitalario: crisis asmáticas atendidas, por parroquia y año */
const AUD_HOSP = [
  { p:'Centro Histórico', pob:24100, y:[188,196,212,231,244,258] },
  { p:'El Parque (norte)', pob:31800, y:[121,118,126,130,127,133] },
  { p:'Terminal (sur)',    pob:27500, y:[166,171,180,190,199,207] },
  { p:'Rural alta',        pob:18400, y:[ 74, 71, 78, 76, 80, 77] }
];

/* Correlación estacional engañosa: consultas respiratorias y venta de calefactores */
const AUD_CONF = (() => {
  const cons = [210,198,205,221,268,352,410,428,371,288,232,214];
  const cal  = [ 90, 84, 88, 96,140,232,301,318,246,152, 98, 92];
  return { cons: cons.map((v,i)=>({x:i,y:v})), cal: cal.map((v,i)=>({x:i,y:v})) };
})();

const AUD_PIEZAS = [
  { id:'P1', cod:'P1', t:'Serie de PM2,5 en tres estaciones fijas, 24 meses seguidos',
    tipo:'Serie de datos', fuente:'Red municipal de monitoreo. Equipos con calibración semestral registrada; datos horarios publicados en el portal abierto del municipio.',
    pert:true, fuerte:true, chart:'pm25',
    d:'El promedio mensual de material particulado fino (PM2,5) en tres puntos de la ciudad. La estación del Centro supera los 15 µg/m³ de la guía de la OMS en 19 de los 24 meses; la del parque, en 6.',
    fb:'<b>Pertinente y fuerte.</b> Mide exactamente la variable del caso, con un instrumento calibrado, de forma continua y durante dos ciclos anuales completos, así que distingue la estación seca de la lluviosa y no confunde un mes raro con una tendencia. Su límite honesto: tres estaciones para 318.000 habitantes es poco, y ninguna está en el sur industrial.',
    fbPert:'Descartarla por no pertinente deja la audiencia sin la única medición directa de la variable que se discute.',
    fbFuerza:'Llamarla débil confunde "tener límites" con "ser mala evidencia": toda medición tiene límites, y esta los declara.' },

  { id:'P2', cod:'P2', t:'Inventario de flota y aporte estimado al carbono negro del Centro',
    tipo:'Tabla técnica', fuente:'Empresa municipal de movilidad. Conteo en ocho puntos durante dos semanas más factores de emisión publicados en la literatura técnica.',
    pert:true, fuerte:true, tabla:'flota',
    d:'Cuántos vehículos de cada tipo circulan por el Centro y cuánto aporta cada grupo a las partículas de hollín.',
    fb:'<b>Pertinente y fuerte.</b> Es la pieza que convierte "hay contaminación" en "esta fuente es la que más pesa": el 7,9 % de los vehículos (diésel antiguo) aporta el 62 % del hollín. Sin una pieza así, cualquier medida sería a ciegas. Los factores de emisión son estimaciones, no mediciones del tubo de escape de cada bus: eso baja la precisión del número, no su utilidad para priorizar.',
    fbPert:'Es justamente la pieza que dice sobre qué conviene actuar; sin ella no hay forma de elegir una medida proporcional.',
    fbFuerza:'Un conteo sistemático en ocho puntos durante dos semanas, con método publicado, no es una impresión: es un dato reproducible.' },

  { id:'P3', cod:'P3', t:'Feriado con cierre vehicular del Centro: medición antes, durante y después',
    tipo:'Experimento natural', fuente:'Misma red de monitoreo. El cierre lo dispuso la fiesta patronal, no el estudio.',
    pert:true, fuerte:true, tabla:'feriado',
    d:'Durante tres días sin tráfico en las 18 manzanas, el PM2,5 del Centro bajó de 34,8 a 22,4 µg/m³ (−36 %). La estación del parque, fuera de la zona, casi no cambió.',
    fb:'<b>Pertinente y fuerte.</b> Es lo más parecido a un experimento que puede ofrecer una ciudad: hubo un cambio en la causa sospechada (el tráfico), se midió antes y después, y hubo un punto de comparación que no recibió el cambio (el parque). Que el valor vuelva a subir al terminar el feriado refuerza el vínculo. Límite: tres días y una sola ocasión; además, en feriado también cambian otras cosas (menos hornos, menos actividad).',
    fbPert:'Es la pieza que más se acerca a probar causa y no solo asociación; descartarla debilita mucho cualquier argumento.',
    fbFuerza:'Tiene la estructura de un buen diseño: intervención, medición antes/después y grupo de comparación. Eso es fuerza, aunque el periodo sea corto.' },

  { id:'P4', cod:'P4', t:'Registro hospitalario de crisis asmáticas por parroquia, seis años',
    tipo:'Registro sanitario', fuente:'Hospital general del cantón. Registro administrativo completo, sin selección de casos.',
    pert:true, fuerte:true, tabla:'hosp',
    d:'Atenciones por crisis asmática en las cuatro parroquias urbanas. En el Centro Histórico pasaron de 188 a 258 al año; en la parroquia rural alta se mantuvieron.',
    fb:'<b>Pertinente y fuerte.</b> Seis años, población completa (no una muestra), y comparación entre zonas con distinta exposición. Ojo con el salto lógico: el registro muestra una <i>asociación</i> sostenida y con un patrón espacial coherente, no una prueba de causa. Por sí sola no descarta que también haya cambiado el acceso al hospital o el registro de diagnósticos.',
    fbPert:'Conecta el aire con la salud, que es el motivo por el que esta audiencia existe.',
    fbFuerza:'Es un censo de atenciones, no una muestra pequeña: seis años y cuatro parroquias dan un patrón difícil de atribuir al azar.' },

  { id:'P5', cod:'P5', t:'Estudio de cohorte revisado por pares en otra ciudad andina (8.400 personas, 5 años)',
    tipo:'Estudio publicado', fuente:'Revista con revisión por pares. Financiamiento público declarado; datos y código disponibles.',
    pert:true, fuerte:true,
    d:'En una ciudad de geografía parecida, cada aumento de 10 µg/m³ en el PM2,5 promedio se asoció con un 12 % más de consultas respiratorias en menores de 12 años, controlando por ingreso, humo de cocina y tabaquismo en el hogar.',
    fb:'<b>Pertinente y fuerte.</b> Muestra grande, seguimiento largo, control de las variables que más confunden, revisión por pares y datos abiertos. Es la pieza que permite decir "esto no es exclusivo de nuestra ciudad". Su límite es la <i>transferibilidad</i>: es otra ciudad, con otra flota. Usarla para estimar el orden de magnitud es correcto; usarla para predecir la cifra exacta de San Rafael, no.',
    fbPert:'Trata la misma pregunta (aire y salud infantil) en una geografía comparable: es pertinente aunque no sea local.',
    fbFuerza:'8.400 personas, cinco años, control de factores de confusión y revisión por pares: casi todos los criterios de calidad que existen.' },

  { id:'P6', cod:'P6', t:'Encuesta municipal de movilidad a 1.200 hogares con muestreo aleatorio',
    tipo:'Encuesta', fuente:'Municipio, con marco muestral del censo. Margen de error declarado: ±2,8 %. Cuestionario publicado.',
    pert:true, fuerte:true,
    d:'El 54 % de quienes llegan al Centro lo hace en bus; el 21 %, caminando; el 18 %, en carro particular. El 61 % de los comerciantes cree que sus clientes llegan en carro. El 46 % dice que dejaría el carro si el bus fuera más frecuente y puntual.',
    fb:'<b>Pertinente y fuerte.</b> No mide el aire: mide la <i>factibilidad</i>, que es la otra mitad de una decisión pública. Muestreo aleatorio, tamaño suficiente, margen de error declarado y cuestionario publicado. Además desmonta un supuesto muy repetido: la mayoría llega en bus o a pie, no en carro. Límite: lo que la gente <i>dice</i> que haría no siempre es lo que hace.',
    fbPert:'Una medida que la gente no puede cumplir no reduce nada: la factibilidad es parte del problema, no un adorno.',
    fbFuerza:'Muestreo aleatorio con marco censal y error declarado: es lo que distingue una encuesta seria de una consulta en redes.' },

  { id:'P7', cod:'P7', t:'Espirometría a 14 niños de una sola escuela, sin grupo de comparación',
    tipo:'Estudio local', fuente:'Trabajo de fin de carrera. Los 14 niños se ofrecieron voluntariamente tras una charla sobre asma.',
    pert:true, fuerte:false,
    d:'Once de los catorce niños de la escuela Sucre presentaron valores de función pulmonar por debajo de lo esperado para su edad y talla.',
    fb:'<b>Pertinente pero débil.</b> Falla por tres lados a la vez: <i>muestra muy pequeña</i> (14 casos, donde el azar manda), <i>sin grupo de comparación</i> (no sabemos qué habrían dado 14 niños de la parroquia rural) y <i>selección sesgada</i> (se ofrecieron quienes ya sospechaban un problema, después de una charla sobre asma). Sirve para justificar que vale la pena estudiarlo bien; no para sostener una conclusión.',
    fbPert:'Habla del efecto que preocupa a la audiencia —la función pulmonar de los niños expuestos—, así que sí es pertinente.',
    fbFuerza:'Con 14 casos autoseleccionados y sin grupo de comparación, el resultado se explicaría igual de bien por el azar y el sesgo de selección.' },

  { id:'P8', cod:'P8', t:'"Las consultas respiratorias suben cuando suben las ventas de calefactores"',
    tipo:'Correlación', fuente:'Cruce hecho por un concejal con datos abiertos del hospital y de la cámara de comercio.',
    pert:true, fuerte:false, chart:'conf',
    d:'Las dos series suben y bajan juntas casi exactamente durante los doce meses del año. Se presenta como prueba de que el problema es el frío y no el tráfico.',
    fb:'<b>Pertinente pero débil: es una correlación sin causalidad.</b> Las dos curvas suben juntas porque una tercera variable las mueve a las dos: la estación seca y fría de junio a septiembre, que además es cuando la inversión térmica atrapa el aire. Eso se llama <i>variable de confusión</i>. La correlación es real; la explicación que se le cuelga, no está probada. Para separarlas haría falta comparar meses con la misma temperatura y distinto tráfico: justo lo que hace la pieza P3.',
    fbPert:'Los datos que usa (consultas respiratorias) sí son del tema; el problema no es la pertinencia sino la inferencia.',
    fbFuerza:'Dos series que suben juntas no prueban que una cause la otra, sobre todo cuando hay una causa común evidente: la estación seca y fría.' },

  { id:'P9', cod:'P9', t:'Informe de impacto económico encargado y pagado por el Comité de Comerciantes',
    tipo:'Informe de parte', fuente:'Consultora contratada por el Comité del Centro Histórico. Metodología no publicada; no se conoce la muestra de locales.',
    pert:true, fuerte:false,
    d:'Concluye que una restricción vehicular causaría una caída del 43 % en las ventas y la pérdida de 1.900 empleos en el primer año.',
    fb:'<b>Pertinente pero débil.</b> El costo económico de la medida es real y <i>tiene que</i> pesarse: descartar el tema sería tan injusto como descartar el asma. Lo débil es este número en concreto: hay <i>conflicto de interés</i> (lo paga quien quiere un resultado), la metodología no está publicada y no se puede saber cómo se llegó al 43 %. La forma correcta de tratarlo no es ignorarlo: es pedir el método y contrastarlo con la pieza P6, que sí publica el suyo.',
    fbPert:'El impacto sobre 640 locales pequeños es parte legítima de la decisión: la audiencia no es solo sobre salud.',
    fbFuerza:'Financiamiento interesado más metodología no publicada: no se puede verificar, así que el número no se sostiene solo.' },

  { id:'P10', cod:'P10', t:'Testimonios en la audiencia pública',
    tipo:'Testimonio', fuente:'Acta de la audiencia. Intervenciones de dos comparecientes.',
    pert:true, fuerte:false, testimonios:true,
    d:'Dos intervenciones grabadas en acta, una por cada lado de la discusión.',
    fb:'<b>Pertinentes pero débiles como prueba.</b> Un testimonio no demuestra una relación de causa: es un caso, contado por quien lo vive, y el recuerdo selecciona. Pero cumplen dos funciones que ninguna tabla cumple: muestran <i>sobre quién recae el costo</i> de cada opción —y eso es un dato de equidad, no un adorno— y generan hipótesis que después hay que medir. Regla práctica: úsalos para decidir a quién proteger, nunca para afirmar qué causa qué.',
    fbPert:'Quién carga con el costo de la decisión es información necesaria para decidir; los testimonios son la vía por la que entra.',
    fbFuerza:'Dos casos narrados no permiten generalizar ni establecer causa, por más honestos y verificables que sean.' },

  { id:'P11', cod:'P11', t:'Video en redes: "las zonas de bajas emisiones fracasaron en Europa"',
    tipo:'Contenido viral', fuente:'Cuenta anónima. Sin ciudad, sin año, sin estudio citado. Una foto de una calle vacía.',
    pert:false, fuerte:false,
    d:'Tiene 180.000 reproducciones y se citó tres veces durante la audiencia.',
    fb:'<b>No pertinente y débil.</b> No es evidencia de nada: no identifica la ciudad, el año, la medida ni el indicador que habría "fracasado", y no cita ningún estudio. Que circule mucho no lo hace cierto. Además no habla de San Rafael del Valle. El número de reproducciones mide alcance, no verdad. Pedir la fuente es lo primero que debe hacer un tribunal —o una audiencia— con una afirmación así.',
    fbPert:'Sin ciudad, año, medida ni indicador, no se puede saber siquiera si habla del mismo problema que se discute aquí.',
    fbFuerza:'Una afirmación sin fuente verificable no puede ser fuerte: no hay nada que comprobar.' },

  { id:'P12', cod:'P12', t:'Estudio riguroso sobre humo de leña en cocinas rurales de la Sierra (52.000 personas)',
    tipo:'Estudio publicado', fuente:'Revisión por pares, muestra nacional, financiamiento público, datos abiertos.',
    pert:false, fuerte:true,
    d:'Documenta con mucha solidez que cocinar con leña en interiores sin chimenea multiplica por 2,6 el riesgo de enfermedad pulmonar crónica en mujeres adultas del área rural.',
    fb:'<b>Fuerte, pero no pertinente a esta decisión.</b> Es un estudio excelente: muestra enorme, revisión por pares, datos abiertos. Pero responde otra pregunta —humo de leña en interiores rurales— y la audiencia decide sobre tráfico en un centro urbano. Este es el error más elegante del expediente: <i>una evidencia puede ser de primera calidad y aun así no servir para lo que se está decidiendo</i>. Pertinencia y fuerza son dos criterios distintos, y hay que aplicar los dos.',
    fbPert:'Habla de otra fuente (leña en interiores), otra población (rural) y otro escenario: no informa qué hacer con el tráfico del Centro.',
    fbFuerza:'Metodológicamente es de las mejores piezas del expediente; el problema no es su calidad sino su tema.' }
];

const AUD_TESTIMONIOS = [
  { q:'Mi hijo Kevin tiene ocho años. En junio, julio y agosto duerme sentado. Yo lo llevo a la escuela a las siete de la mañana por la calle Bolívar, y a esa hora uno camina detrás del humo negro del bus. En vacaciones, cuando nos vamos donde mi mamá en el campo, no usa el inhalador ni una vez. Eso lo he visto yo, no me lo han contado.', a:'Nube Tenesaca, comité de padres' },
  { q:'Yo no estoy en contra del aire limpio, mi señora también tose. Pero mi bus tiene diecinueve años y todavía debo dos años de letras. Si mañana me dicen que no entro al Centro, yo no tengo cómo comprar otro. En mi línea somos ciento cuarenta socios y la mitad está igual. Que se limpie el aire, pero díganme con qué plata.', a:'Wilson Guamán, transportista de la línea 12' }
];

/* =====================================================================
   2 · AFIRMACIONES PARA CONSTRUIR EL ARGUMENTO
   Las cuatro son defendibles: lo que se evalúa es el APOYO, no el bando.
   ===================================================================== */
const AUD_AFIRMA = [
  { id:'A', t:'La flota diésel antigua es la fuente controlable que más pesa: actuar sobre ella es lo que más reduce la exposición de todos.',
    ideal:['P2','P3','P1'],
    fbOk:'Tu afirmación es de atribución de fuente, así que necesita justo lo que elegiste: el inventario que reparte el aporte (P2), el experimento natural que muestra qué pasa al quitar el tráfico (P3) y la serie que da la magnitud del problema (P1).',
    fbFalta:'Para sostener que una fuente pesa más que otra necesitas, sí o sí, el inventario de flota (P2) y, de ser posible, el feriado (P3): sin ellos estás afirmando una atribución que ninguna de tus piezas mide.' },
  { id:'B', t:'Lo urgente es la exposición de los grupos vulnerables: hay que proteger primero escuelas y centros de salud, antes que restringir a toda la ciudad.',
    ideal:['P4','P5','P1'],
    fbOk:'Es una afirmación sobre quién está más expuesto y qué efecto tiene: el registro hospitalario por parroquia (P4), la cohorte con efecto en menores (P5) y la serie por estación (P1) la sostienen sin exagerar.',
    fbFalta:'Hablas de vulnerabilidad, pero sin el registro por parroquia (P4) o la cohorte publicada (P5) tu afirmación se apoya en la impresión de que los niños están peor, no en la evidencia de que lo están.' },
  { id:'C', t:'La evidencia local todavía no alcanza para una restricción de este tamaño, y el costo caería sobre quienes menos pueden absorberlo.',
    ideal:['P6','P9','P1'],
    fbOk:'Es una afirmación sobre incertidumbre y equidad, y la sostienes bien: la encuesta con método publicado (P6) y la serie con sus límites declarados (P1) muestran qué se sabe y qué no; P9 entra como costo a considerar, no como cifra probada.',
    fbFalta:'Si tu afirmación es que la evidencia no alcanza, tienes que apoyarte en piezas que muestren el alcance real de lo que se sabe (P1, P6) y no solo en las que te dan la razón; de lo contrario estás eligiendo la evidencia por su conclusión.' },
  { id:'D', t:'Una restricción sin alternativa de transporte no resuelve el problema: lo traslada a los barrios por donde el tráfico se desvía.',
    ideal:['P6','P3','P1'],
    fbOk:'Es una afirmación sobre desplazamiento del problema y viabilidad: P6 muestra cómo se mueve realmente la gente, P3 muestra que el efecto es local a la zona cerrada y P1 permite comparar estaciones dentro y fuera.',
    fbFalta:'Para sostener que el problema se traslada necesitas datos de cómo se mueve la gente (P6) y de qué pasó fuera de la zona en el feriado (P3): sin eso es una predicción, no un argumento.' }
];

/* Contraargumento mejor defendido para cada afirmación */
const AUD_CONTRA = {
  A: { t:'La atribución no basta para justificar la medida',
    q:'Concedo que el diésel antiguo aporta el 62 % del hollín. Pero de ahí no se sigue que restringirlo sea lo correcto ahora. Los 412 buses viejos son el sustento de 412 familias que no pueden financiar un bus nuevo, y el 54 % de la gente que llega al Centro llega precisamente en esos buses. Si los sacas sin reemplazo, empeoras el acceso de los más pobres para mejorar un promedio. La pieza P2 dice de dónde viene el hollín; no dice qué es justo hacer con eso.',
    clave:'Separa el hecho (atribución) del juicio de valor (qué hacer). El hecho está bien establecido; la medida no se deduce del hecho.' },
  B: { t:'Proteger solo a las escuelas puede volverse una excusa',
    q:'Nadie se opone a cuidar a los niños. Pero una medida centrada en doce escuelas protege tres horas al día a 4.800 niños y deja doce horas de exposición al resto de la ciudad, incluidos esos mismos niños cuando salen del aula. El registro hospitalario (P4) muestra que sube toda la parroquia, no solo la cuadra de la escuela. Hay un riesgo real de que la medida barata se use para declarar el problema resuelto y no volver a tocarlo.',
    clave:'Acepta la evidencia sobre vulnerabilidad y la usa para mostrar que la medida propuesta es desproporcionada al alcance del problema.' },
  C: { t:'La incertidumbre no es neutral: esperar también tiene costo',
    q:'Es verdad que tres estaciones son pocas y que el registro hospitalario muestra asociación, no causa. Pero el principio de precaución existe justo para esto: cuando el daño posible es grave y recae sobre niños, la carga de la prueba no puede exigirse solo a quien pide actuar. Mientras esperamos la certeza, alguien sigue respirando 34 µg/m³ cada mañana. No decidir también es una decisión, y sus costos los pagan siempre los mismos.',
    clave:'No niega la incertidumbre: niega que la incertidumbre implique inacción. Introduce el principio de precaución y la asimetría de quién paga la espera.' },
  D: { t:'El desplazamiento se puede medir y corregir; la inacción no se corrige sola',
    q:'El efecto de traslado es real y hay que vigilarlo: en el feriado la estación del parque casi no cambió, pero un cierre permanente sí desviaría flujo. Ahora bien, ese es un argumento para diseñar mejor la medida —anillo de distribución, monitoreo en el borde, ajuste a los seis meses— no para no hacerla. Ninguna política urbana empieza perfecta; la diferencia está en si trae indicador y plan de corrección.',
    clave:'Concede el riesgo señalado y lo convierte en requisito de diseño, no en objeción de fondo.' }
};

const AUD_RESP = [
  { id:'concede', n:'Conceder en parte y precisar el alcance de mi afirmación',
    fb:'<b>Es la respuesta más honesta cuando el contraargumento señala algo verdadero.</b> Conceder no es perder: es delimitar. Tu afirmación pasa a ser más pequeña pero mucho más defendible, y el debate avanza porque ya no discuten sobre el punto en que coinciden. Condición: tienes que decir exactamente qué concedes y qué sigues sosteniendo.' },
  { id:'refuta', n:'Refutar con una pieza de evidencia que el contraargumento no consideró',
    fb:'<b>Es la respuesta más fuerte, pero solo si de verdad tienes la pieza.</b> Refutar exige nombrar la evidencia y explicar por qué contradice el punto contrario, no repetir tu afirmación con más énfasis. Si la pieza que citas es débil o no pertinente, la refutación se vuelve en tu contra delante de la audiencia.' },
  { id:'reencuadra', n:'Reencuadrar: mostrar que discutimos criterios distintos, no hechos distintos',
    fb:'<b>Es la respuesta correcta cuando el desacuerdo no es sobre datos sino sobre valores.</b> Buena parte de las controversias sociocientíficas son de este tipo: las dos partes aceptan los mismos números y discrepan en cuánto peso dar a la salud, al empleo o a la libertad de circular. Nombrarlo evita la trampa de creer que basta con más datos para cerrar el desacuerdo. Riesgo: usarlo para esquivar una objeción que sí era de hechos.' },
  { id:'descalifica', n:'Señalar quién financia a la parte contraria y dejar ahí el punto',
    fb:'<b>Cuidado: esto es una falacia si te quedas solo ahí.</b> Detectar un conflicto de interés es un motivo legítimo para <i>revisar con más cuidado</i> una evidencia (por eso P9 y P11 son débiles), pero el origen del dinero no demuestra que la afirmación sea falsa. Si el argumento contrario se apoya en piezas verificables, hay que responder a las piezas. Atacar a la persona en vez de al argumento se llama <i>ad hominem</i> y en una audiencia pública debilita a quien lo usa.' }
];

/* =====================================================================
   3 · MEDIDAS · ninguna es perfecta
   proy: PM2,5 proyectado en el Centro (µg/m³) a 0, 6, 12, 24 y 36 meses
   ===================================================================== */
const AUD_MEDIDAS = [
  { id:'M1', n:'Renovar y reacondicionar la flota diésel', em:'🚌',
    d:'Filtros de partículas para los 520 vehículos diésel recientes y chatarrización asistida de los 412 buses anteriores a 2005, con crédito blando a 7 años y subsidio del 45 % del municipio.',
    costo:4.2, alcance:'Toda la ciudad', vel:'Lenta: 30 meses', equidad:'Alta si el crédito llega; nula si no llega',
    proy:[34.8,33.9,31.2,26.4,23.1],
    efectos:['Ataca la fuente que más pesa (P2): 62 % del hollín viene del 7,9 % de los vehículos.','El efecto es de toda la ciudad, no solo de 18 manzanas: también baja en el sur y en las rutas de acceso.','Mantiene el servicio de bus del que depende el 54 % de quienes llegan al Centro (P6).'],
    no:['Los primeros doce meses casi no se nota nada: el aire sigue igual mientras se tramita el crédito. Políticamente es la medida más difícil de sostener.','Si el crédito no se aprueba a tiempo, 412 socios quedan con la deuda vieja y sin bus: el costo cae íntegro sobre ellos.','El presupuesto se consume completo: no queda nada para monitoreo ni para escuelas.','Los talleres informales que hoy reparan esos buses pierden trabajo y no están en ningún programa de transición.'],
    ind:'PM2,5 promedio anual en la estación del Centro y porcentaje de flota reacondicionada, con corte semestral público.',
    salv:'Si a los 12 meses menos del 30 % de la flota ha accedido al crédito, se suspende la chatarrización obligatoria y se revisa el mecanismo financiero.' },

  { id:'M2', n:'Zona de circulación restringida en el Centro, 7:00 a 19:00', em:'🚸',
    d:'Solo buses, residentes, carga en horario nocturno y vehículos de personas con discapacidad en las 18 manzanas. Anillo de distribución con paradas en el borde.',
    costo:2.6, alcance:'18 manzanas', vel:'Rápida: 6 meses', equidad:'Mixta: protege al peatón, encarece al comerciante',
    proy:[34.8,26.8,23.4,22.1,21.4],
    efectos:['Es la medida con efecto más rápido y más visible: el feriado (P3) muestra una caída cercana al 36 % dentro de la zona.','Beneficia sobre todo a quienes caminan y a las doce escuelas del Centro.','Sobra 1,6 millones del presupuesto para el anillo de distribución y el monitoreo del borde.'],
    no:['El tráfico desviado sube en el anillo periférico: la proyección da +14 a +19 % de PM2,5 en las calles del borde, donde también vive gente y hay dos escuelas.','Caída estimada de ventas del 6 al 11 % el primer año en los locales sin acceso peatonal mejorado (rango, no el 43 % de P9, que no es verificable).','No toca la flota vieja: los mismos buses siguen circulando por el resto de la ciudad.','Necesita fiscalización sostenida; sin control, en dos años la zona se vuelve papel mojado.'],
    ind:'PM2,5 en la estación del Centro y en dos estaciones nuevas del anillo, más ventas declaradas de los locales de la zona.',
    salv:'Si a los 6 meses el PM2,5 del anillo sube más del 15 %, se rediseñan los desvíos antes de ampliar la zona.' },

  { id:'M3', n:'Corredor de escuelas protegidas', em:'🏫',
    d:'Cierre de calle en horario de entrada y salida en doce escuelas, filtros y ventilación en aulas, y monitoreo con sensores escolares operados por los estudiantes.',
    costo:0.9, alcance:'12 escuelas, 3 horas al día', vel:'Muy rápida: 3 meses', equidad:'Protege al grupo más vulnerable identificado',
    proy:[34.8,33.6,33.0,32.4,31.9],
    efectos:['Actúa justo sobre el grupo que el registro hospitalario (P4) y la cohorte (P5) identifican como más afectado.','Es barata: quedan 3,3 millones libres para lo que decida el próximo concejo.','El monitoreo escolar es, además, evidencia nueva: en un año habrá datos que hoy no existen.'],
    no:['El efecto de ciudad es casi nulo: el promedio del Centro baja menos del 9 % en tres años.','Protege tres horas al día y deja doce sin cambio, incluidos esos mismos niños fuera del aula.','Riesgo político real: es la medida perfecta para declarar el problema resuelto y no volver a tocarlo. Ese es su efecto no deseado más serio.','Concentra el beneficio en las doce escuelas elegidas; las otras veintitrés de la ciudad quedan igual.'],
    ind:'PM2,5 medido por los sensores escolares en horario de clase y ausentismo por causa respiratoria.',
    salv:'La ordenanza incluye cláusula de revisión obligatoria a los 18 meses con la evidencia nueva sobre la mesa.' },

  { id:'M4', n:'Aplazar 18 meses y ampliar la evidencia', em:'🔬',
    d:'Nueve estaciones de monitoreo en lugar de tres, estudio de cohorte local con 2.000 escolares y auditoría independiente del informe económico de los comerciantes.',
    costo:1.8, alcance:'Ciudad, sin intervención', vel:'Sin efecto en 18 meses', equidad:'El costo de esperar recae en quien ya está enfermo',
    proy:[34.8,35.2,35.6,34.9,34.4],
    efectos:['Corrige la debilidad más real del expediente: tres estaciones para 318.000 habitantes y ningún estudio local de cohorte.','Un estudio local resolvería la objeción de transferibilidad de P5 y convertiría la asociación de P4 en algo mucho más firme.','Auditar el informe de los comerciantes (P9) con metodología pública es tratarlos con seriedad, no ignorarlos.'],
    no:['Durante 18 meses no cambia nada: la exposición sigue igual para todos, incluidos los niños con asma diagnosticada hoy.','Dos estaciones secas más de inversión térmica pasan sin medida alguna.','Es la opción más fácil de usar como aplazamiento indefinido: cuando llegue el estudio habrá otro concejo y otras prioridades.','Aun con evidencia perfecta, la decisión seguirá teniendo un componente de valores que ningún estudio resuelve.'],
    ind:'Cobertura de la red (estaciones operativas) y entrega del informe de cohorte en el mes 18, con fecha fija en la ordenanza.',
    salv:'La ordenanza fija la fecha de la nueva votación y prohíbe prorrogarla más de una vez: sin eso, aplazar es decidir que no.' }
];

/* =====================================================================
   4 · PREGUNTAS DE CIERRE sobre criterios de calidad de la evidencia
   ===================================================================== */
const AUD_QUIZ = [
  { q:'Las consultas respiratorias y las ventas de calefactores suben juntas los mismos meses del año. ¿Qué es lo correcto concluir?',
    ops:['Que el frío es la causa de las consultas y el tráfico no influye.',
         'Que hay una variable de confusión —la estación seca y fría— que puede mover las dos series a la vez.',
         'Que como las dos curvas coinciden casi exactamente, la relación causal está probada.',
         'Que los datos del hospital están mal tomados.'],
    ok:1,
    fb:'Dos series que se mueven juntas pueden tener una causa común. Aquí la estación seca de junio a septiembre baja la temperatura (más calefactores), y al mismo tiempo trae la inversión térmica que atrapa el aire (más contaminación). Para separar las dos explicaciones hay que comparar periodos con la misma temperatura y distinto tráfico, que es justo lo que permite el feriado con cierre vehicular.',
    wrong:['La correlación no dice qué causa qué: con esos mismos datos podrías argumentar lo contrario con igual (poca) base. Y hay una tercera variable que explica las dos series.',
           'Cuanto mejor coinciden dos curvas, más fuerte suele ser la causa común: una coincidencia alta no es prueba de causalidad, a veces es señal de estacionalidad compartida.',
           'No hay nada que indique un problema de registro. El error no está en los datos, está en el salto de "suben juntas" a "una causa la otra".'] },

  { q:'Un estudio midió la función pulmonar de 14 niños que se ofrecieron voluntariamente después de una charla sobre asma, sin grupo de comparación. ¿Cuál es su debilidad principal?',
    ops:['Que no fue publicado en una revista internacional.',
         'Que la espirometría no sirve para medir función pulmonar en niños.',
         'Que la muestra es muy pequeña y además autoseleccionada, y no hay grupo de comparación.',
         'Que lo hizo un estudiante y no un investigador con doctorado.'],
    ok:2,
    fb:'Son tres fallas que se suman: con 14 casos el azar pesa muchísimo; quienes se ofrecen tras una charla sobre asma son justamente quienes ya sospechan un problema (sesgo de selección); y sin un grupo comparable no se sabe qué habría dado un grupo sin esa exposición. Sirve para justificar un estudio serio, no para concluir.',
    wrong:['El lugar de publicación ayuda, pero no es el criterio de fondo: un estudio pequeño y sesgado sigue siéndolo aunque se publique.',
           'La espirometría es la prueba estándar de función pulmonar y sí se usa en niños. El problema está en el diseño del estudio, no en el instrumento.',
           'Quién lo firma no determina la calidad: un estudiante puede hacer un estudio impecable y un doctor uno malo. Lo que se evalúa es el diseño.'] },

  { q:'El informe que pronostica una caída del 43 % en las ventas fue pagado por el Comité de Comerciantes y no publica su metodología. ¿Qué corresponde hacer en la audiencia?',
    ops:['Excluirlo del expediente: quien paga un estudio invalida su resultado.',
         'Aceptarlo tal cual: los comerciantes son quienes mejor conocen su negocio.',
         'Registrar el conflicto de interés, pedir la metodología y, mientras no esté, tratar la cifra como no verificable sin descartar el tema del impacto económico.',
         'Reemplazarlo por el testimonio de una comerciante, que es más directo.'],
    ok:2,
    fb:'El conflicto de interés es una razón para revisar con más cuidado, no una prueba de falsedad. El impacto económico sobre 640 locales pequeños es un asunto legítimo de la decisión; lo que no se sostiene es esa cifra concreta mientras no se pueda comprobar cómo se obtuvo. La respuesta correcta es exigir el método, no cambiar de tema.',
    wrong:['Eso sería una falacia ad hominem aplicada a instituciones: el origen del dinero obliga a verificar mejor, no demuestra que el contenido sea falso. Además dejaría fuera un costo real.',
           'La experiencia directa es valiosa para plantear el problema, pero no sustituye a un método: por eso mismo el 61 % de los comerciantes cree que sus clientes llegan en carro cuando la encuesta muestra que la mayoría llega en bus o a pie.',
           'Un testimonio es todavía menos verificable que el informe: cambiar una evidencia débil por otra más débil no mejora el expediente.'] },

  { q:'El estudio sobre humo de leña en cocinas rurales tiene 52.000 participantes, revisión por pares y datos abiertos. ¿Por qué no sostiene la decisión de esta audiencia?',
    ops:['Porque su muestra, aunque grande, sigue siendo insuficiente.',
         'Porque es metodológicamente fuerte pero no es pertinente: responde a otra pregunta, otra fuente y otra población.',
         'Porque los estudios de otras provincias no valen para esta ciudad.',
         'Porque al tener datos abiertos cualquiera pudo manipularlos.'],
    ok:1,
    fb:'Pertinencia y fuerza son dos criterios independientes, y hay que aplicar los dos. Una evidencia puede ser excelente y aun así no informar la decisión que tienes delante: esta habla de humo de leña en interiores rurales, y aquí se decide sobre tráfico en un centro urbano. Al revés también ocurre: un testimonio puede ser muy pertinente y a la vez débil.',
    wrong:['52.000 participantes es una muestra enorme. El tamaño no es el problema: el problema es que responde a otra pregunta.',
           'Los estudios de otros lugares sí valen, con cuidado: la cohorte de la otra ciudad andina (P5) es pertinente porque trata la misma fuente y una geografía comparable. Lo que cambia no es la provincia, es el tema.',
           'Los datos abiertos son una garantía de calidad, no un riesgo: permiten que otros reproduzcan el análisis y detecten errores.'] },

  { q:'Después de escuchar todo el expediente, ¿cuál de estas afirmaciones describe mejor el papel de la ciencia en una decisión como esta?',
    ops:['La ciencia debería decidir sola: si los datos son buenos, la medida correcta se deduce de ellos.',
         'La ciencia no sirve aquí, porque al final todo depende de intereses y de política.',
         'Hay que esperar a tener certeza científica completa antes de tomar cualquier medida.',
         'La ciencia acota lo que es cierto y con cuánta confianza, pero elegir entre medidas exige además criterios de equidad, costo y precaución que los datos no contienen.'],
    ok:3,
    fb:'Esa es exactamente la idea central de la unidad. Los datos dicen que el diésel antiguo aporta el 62 % del hollín; no dicen si es justo que 412 socios asuman el costo, ni cuánto peso dar al asma frente al empleo. Esas son decisiones de valores, y se toman mejor con la evidencia a la vista y con los límites de esa evidencia declarados.',
    wrong:['Ese salto tiene nombre: de un "es" no se deduce un "debe". P2 dice de dónde viene el hollín, no qué es justo hacer con eso.',
           'Al contrario: sin la evidencia no se distinguiría el 62 % real del 43 % no verificable, y la discusión sería solo un choque de intereses. La ciencia acota el terreno, aunque no cierre la decisión.',
           'La certeza completa no llega nunca, y esperarla no es neutral: mientras se espera, alguien sigue expuesto. Por eso existe el principio de precaución, que ajusta la exigencia de prueba a la gravedad del daño posible.'] }
];

/* =====================================================================
   RUTAS
   ===================================================================== */
route('/cn/proximos/audiencia', () => { navigate('#/cn/audiencia'); });

route('/cn/audiencia', (view) => {
  view.classList.add('wide');

  const SEC = [
    { id:'caso',    n:'1 · El caso' },
    { id:'exp',     n:'2 · Expediente' },
    { id:'arg',     n:'3 · Tu argumento' },
    { id:'contra',  n:'4 · Contraargumento' },
    { id:'dec',     n:'5 · Deliberación' },
    { id:'cierre',  n:'6 · Cierre' }
  ];

  const St = {
    sec: 0,
    clas: {}, clasRev: false,                 /* 2 · clasificación de piezas */
    afirma: null, piezas: [], razon: '',      /* 3 · argumento */
    argRev: false, argPts: 0,
    resp: null, respTxt: '', contraRev: false,/* 4 · contraargumento */
    medida: null, just: '', decRev: false,    /* 5 · decisión */
    quizOk: {}, quizInt: 0,                   /* 6 · cierre: preguntas ya resueltas, por índice */
    marks: { clas:false, arg:false, contra:false, dec:false, quiz:false },
    start: Date.now()
  };
  const yaHecho = !!(Store.s.activities && Store.s.activities['cn-audiencia'] && Store.s.activities['cn-audiencia'].done);
  const pieza = id => AUD_PIEZAS.find(p => p.id === id);

  /* ---------- encabezado ---------- */
  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{},
      h('span',{class:'eyebrow mis'},'Ciencias Naturales · Ciencias de la Vida y de la Tierra · 10.º EGB · Unidad 3: Decisiones sociocientíficas y sostenibilidad'),
      h('h1',{},'Audiencia científica simulada'),
      h('p',{},'No es un laboratorio: es una sala de audiencias. Vas a recibir un expediente con doce piezas de evidencia de calidad muy desigual, separar las que sirven de las que no, construir un argumento con la forma afirmación + evidencia + razonamiento, responder a la mejor versión de la postura contraria y votar una medida real, con su costo y sus efectos no deseados. El caso no tiene un bando bueno.')),
    h('span',{class:'pill mis'},'+150 XP · 60–80 min')));

  const retoSt = h('div',{class: yaHecho ? 'notice ok' : 'notice'}, yaHecho
    ? 'Caso resuelto ✓ · puedes volver a entrar y defender otra postura para comparar.'
    : 'Pendiente: llega a la sección 6 con tu argumento guardado en el cuaderno y tu voto justificado.');
  view.append(purposeBanner({
    proposito:'Decidir bien cuando la ciencia informa pero no alcanza: distinguir hechos, incertidumbres, valores e intereses en una controversia sociocientífica, y sostener una recomendación proporcional a la evidencia que realmente se tiene (AO.CVT.10.07 · 10.08 · 10.09).',
    observa:[
      'Que "pertinente" y "fuerte" son dos criterios distintos: hay evidencia excelente que no sirve para esta decisión, y evidencia débil que sí importa',
      'Cómo una correlación real se convierte en una conclusión falsa cuando hay una variable de confusión',
      'Que ninguna de las cuatro medidas es buena: todas tienen costo, y alguien concreto lo paga'],
    reto:'Construye un argumento apoyado en las piezas fuertes y pertinentes, responde al contraargumento mejor defendido y vota una medida con indicador y salvaguarda.',
    statusEl: retoSt }));

  const nav = h('nav',{class:'aud-nav','aria-label':'Etapas de la audiencia'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);

  function renderNav(){
    nav.innerHTML = '';
    const hechas = [St.marks.clas, St.marks.arg, St.marks.contra, St.marks.dec, St.marks.quiz];
    SEC.forEach((s,i) => {
      const listo = i > 0 && hechas[i-1];
      nav.append(h('button',{ 'aria-current':String(i===St.sec), 'aria-label':s.n + (listo ? ' (completada)' : ''),
        onclick:()=>{ St.sec=i; render(); } }, s.n, listo ? h('span',{class:'aud-tick','aria-hidden':'true'},'✓') : null));
    });
  }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:6px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec=Math.max(0,St.sec-1); render(); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec=Math.min(SEC.length-1,St.sec+1); render(); }},'Siguiente →'));
  }
  const nota = txt => h('p',{class:'small muted',style:'margin:0'}, txt);
  const AVISO = 'San Rafael del Valle es una ciudad simulada y todos los datos del expediente están construidos con fines didácticos, a partir de patrones reales de ciudades andinas ecuatorianas. No son datos oficiales: en el Ecuador la información de calidad del aire la producen las redes de monitoreo municipales y el Ministerio del Ambiente.';

  /* =====================================================================
     SECCIÓN 1 · EL CASO
     ===================================================================== */
  function secCaso(){
    const partes = h('div',{class:'aud-partes'});
    AUD_PARTES.forEach(p => partes.append(h('div',{class:'aud-parte', style: p.color ? 'border-left-color:var('+p.color+')' : ''},
      h('span',{class:'aud-rol'}, p.rol),
      h('h4',{}, p.n),
      h('p',{}, p.d),
      h('span',{class:'aud-quiere'}, h('b',{},'Qué pide: '), p.quiere))));

    const noDecide = h('ul',{class:'small muted',style:'margin:6px 0 0;padding-left:18px'});
    AUD_CASO.nodecide.forEach(t => noDecide.append(h('li',{}, t)));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow mis'},'El caso'),
        h('h3',{style:'margin:0'}, AUD_CASO.ciudad + ' · calidad del aire y tráfico en el Centro Histórico'),
        h('div',{class:'aud-artw', html:audValleSVG()}),
        h('p',{style:'margin:0'}, AUD_CASO.d),
        h('div',{class:'notice info'}, h('span',{}, h('b',{},'Qué se decide exactamente: '), AUD_CASO.decide)),
        h('div',{},
          h('span',{class:'eyebrow'},'Qué NO se decide hoy'),
          noDecide),
        h('div',{class:'notice'}, h('span',{}, AUD_CASO.norma)),
        nota(AVISO)),

      h('div',{class:'card stack'},
        h('span',{class:'eyebrow mis'},'Las partes'),
        h('p',{class:'small muted',style:'margin:0'},'Ninguna miente. Cada una tiene un interés legítimo y ve una parte real del problema. Esa es la dificultad del caso.'),
        partes),

      h('div',{class:'card stack'},
        h('span',{class:'eyebrow mis'},'Antes de leer nada más'),
        h('p',{style:'margin:0'},'Primero explora el expediente y clasifica las piezas. Recién después construirás tu argumento: si lees primero las conclusiones, vas a elegir la evidencia que te da la razón en vez de la que sostiene lo que se puede sostener.'),
        h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{ St.sec=1; render(); }},'Abrir el expediente →')),
      secNav());
  }

  /* =====================================================================
     SECCIÓN 2 · EXPEDIENTE DE EVIDENCIA
     ===================================================================== */
  function tablaFlota(){
    const tb = h('tbody',{});
    AUD_FLOTA.forEach(f => tb.append(h('tr',{},
      h('td',{}, f.t), h('td',{class:'mono'}, audMil(f.n)),
      h('td',{class:'mono'}, audN(f.pct,1)+' %'), h('td',{class:'mono'}, f.ap+' %'))));
    tb.append(h('tr',{}, h('td',{}, h('b',{},'Diésel anterior a 2005 + camiones viejos')),
      h('td',{class:'mono'}, h('b',{},'1.052')), h('td',{class:'mono'}, h('b',{},'7,9 %')), h('td',{class:'mono'}, h('b',{},'62 %'))));
    return h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Tipo de vehículo'), h('th',{},'Unidades/día'), h('th',{},'% de la flota'), h('th',{},'% del hollín'))), tb));
  }
  function tablaFeriado(){
    const tb = h('tbody',{});
    AUD_FERIADO.forEach(f => tb.append(h('tr',{},
      h('td',{}, f.d), h('td',{class:'mono'}, audN(f.c,1)), h('td',{class:'mono'}, audN(f.p,1)))));
    return h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Momento'), h('th',{},'PM2,5 Centro (µg/m³)'), h('th',{},'PM2,5 parque (µg/m³)'))), tb));
  }
  function tablaHosp(){
    const tb = h('tbody',{});
    AUD_HOSP.forEach(r => {
      const t0 = r.y[0] / r.pob * 10000, t5 = r.y[5] / r.pob * 10000;
      tb.append(h('tr',{}, h('td',{}, r.p), h('td',{class:'mono'}, audMil(r.pob)),
        h('td',{class:'mono'}, String(r.y[0])), h('td',{class:'mono'}, String(r.y[5])),
        h('td',{class:'mono'}, audN(t0,1)+' → '+audN(t5,1))));
    });
    return h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Parroquia'), h('th',{},'Habitantes'), h('th',{},'Año 1'), h('th',{},'Año 6'), h('th',{},'Tasa por 10.000 hab.'))), tb));
  }
  function testimonios(){
    const wrap = h('div',{});
    AUD_TESTIMONIOS.forEach(t => wrap.append(h('div',{class:'aud-test'}, h('i',{}, '«'+t.q+'»'), h('b',{}, '— '+t.a))));
    return wrap;
  }
  function chartPM25(){
    const wrap = h('div',{style:'padding:4px 0'});
    const cv = h('canvas',{class:'chart',style:'height:250px','aria-label':'Serie mensual de PM2,5 durante 24 meses en tres estaciones: Centro Histórico, El Parque y zona norte. El Centro está siempre por encima y alcanza su máximo entre junio y septiembre.'});
    wrap.append(cv);
    setTimeout(()=>{ try { lineChart(cv, {
      series:[
        { label:'Centro', color:cssVar('--bad'),  pts:AUD_PM25.centro, dots:false },
        { label:'Norte',  color:cssVar('--warn'), pts:AUD_PM25.norte },
        { label:'Parque', color:cssVar('--ok'),   pts:AUD_PM25.parque } ],
      xmin:0, xmax:23, ymin:0, ymax:58, xticks:7,
      xlabel:'mes (dos años seguidos)', ylabel:'PM2,5 µg/m³',
      xfmt:v=>{ const i=Math.round(v); return audMes[i%12] + (i<12?' a1':' a2'); }, yfmt:v=>audN(v,0) }); } catch(e){ console.warn(e); } }, 30);
    wrap.append(h('p',{class:'small muted',style:'margin:6px 0 0'},'Línea de referencia de la OMS: 15 µg/m³ de promedio en 24 horas. El Centro la supera en 19 de los 24 meses.'));
    return wrap;
  }
  function chartConf(){
    const wrap = h('div',{style:'padding:4px 0'});
    const cv = h('canvas',{class:'chart',style:'height:240px','aria-label':'Dos series mensuales que suben y bajan juntas: consultas respiratorias y venta de calefactores, ambas con máximo entre junio y agosto.'});
    wrap.append(cv);
    setTimeout(()=>{ try { lineChart(cv, {
      series:[
        { label:'Consultas respiratorias', color:cssVar('--bad'),  pts:AUD_CONF.cons, dots:true },
        { label:'Calefactores vendidos',   color:cssVar('--lab'),  pts:AUD_CONF.cal,  dots:true } ],
      xmin:0, xmax:11, ymin:0, ymax:480, xticks:6,
      xlabel:'mes del año', ylabel:'casos / unidades',
      xfmt:v=>audMes[Math.round(v)%12], yfmt:v=>audN(v,0) }); } catch(e){ console.warn(e); } }, 30);
    return wrap;
  }

  function secExpediente(){
    const total = AUD_PIEZAS.length;
    const listos = AUD_PIEZAS.filter(p => St.clas[p.id] && St.clas[p.id].pert !== undefined && St.clas[p.id].fuerte !== undefined).length;
    const aciertos = AUD_PIEZAS.filter(p => { const c = St.clas[p.id]; return c && c.pert === p.pert && c.fuerte === p.fuerte; }).length;

    const accion = h('button',{class:'btn primary', style:'align-self:flex-start'});
    function pintaAccion(){
      if (St.clasRev) return;
      const n = AUD_PIEZAS.filter(p => St.clas[p.id] && St.clas[p.id].pert !== undefined && St.clas[p.id].fuerte !== undefined).length;
      accion.textContent = n < total ? `Clasifica las ${total} piezas en los dos ejes (${n}/${total})` : 'Comprobar mi clasificación';
      accion.disabled = n < total;
    }
    accion.onclick = () => {
      if (St.clasRev) return;
      St.clasRev = true;
      const ac = AUD_PIEZAS.filter(p => { const c = St.clas[p.id]; return c && c.pert === p.pert && c.fuerte === p.fuerte; }).length;
      St.marks.clas = ac >= 8;
      Store.log('clasificacion', { recurso:'cn-audiencia', ejercicio:'expediente', aciertos:ac, total:total });
      render();
    };
    pintaAccion();

    const lista = h('div',{});
    AUD_PIEZAS.forEach(p => {
      const c = St.clas[p.id] || {};
      const bien = St.clasRev && c.pert === p.pert && c.fuerte === p.fuerte;
      const box = h('div',{class:'aud-pieza' + (St.clasRev ? (bien ? ' aud-ok' : ' aud-bad') : '')});
      box.append(h('div',{class:'hd'},
        h('span',{}, h('span',{class:'aud-cod'}, p.cod), ' ', h('b',{}, p.t)),
        h('span',{class:'aud-tag'}, p.tipo)));

      const bd = h('div',{class:'bd'}, h('p',{}, p.d));
      if (p.chart === 'pm25') bd.append(chartPM25());
      if (p.chart === 'conf') bd.append(chartConf());
      if (p.tabla === 'flota') bd.append(h('div',{class:'aud-artw', html:audFlotaSVG()}), tablaFlota());
      if (p.tabla === 'feriado') bd.append(h('div',{class:'aud-artw', html:audFeriadoSVG()}), tablaFeriado());
      if (p.tabla === 'hosp') bd.append(h('div',{class:'aud-artw', html:audHospSVG()}), tablaHosp());
      if (p.testimonios) bd.append(testimonios());
      bd.append(h('p',{class:'aud-fuente'}, 'Fuente: ' + p.fuente));
      box.append(bd);

      const ft = h('div',{class:'ft'});
      const ejes = [
        { k:'pert',   lb:'¿Sirve para esta decisión?', ops:[[true,'Pertinente'],[false,'No pertinente']] },
        { k:'fuerte', lb:'¿Qué tan sólida es?',        ops:[[true,'Fuerte'],[false,'Débil']] }
      ];
      ejes.forEach(e => {
        const fila = h('div',{class:'aud-eje'}, h('span',{class:'aud-lb'}, e.lb));
        e.ops.forEach(([val, txt]) => {
          const b = h('button',{ class:'aud-opt', 'aria-pressed':String(c[e.k] === val),
            'aria-label': txt + ' · pieza ' + p.cod, 'data-v':String(val),
            disabled: St.clasRev || null,
            onclick:()=>{
              St.clas[p.id] = Object.assign({}, St.clas[p.id], { [e.k]: val });
              $$('.aud-opt', fila).forEach(x => x.setAttribute('aria-pressed', String(x.getAttribute('data-v') === String(val))));
              pintaAccion();
            } }, txt);
          fila.append(b);
        });
        ft.append(fila);
      });

      if (St.clasRev){
        const marca = h('span',{class:'aud-mk'}, bien ? '✓' : '✗');
        const correcta = (p.pert ? 'Pertinente' : 'No pertinente') + ' · ' + (p.fuerte ? 'Fuerte' : 'Débil');
        const fb = h('p',{class:'aud-fbk ' + (bien ? 'aud-ok' : 'aud-bad')});
        let html = '<b>' + esc(correcta) + '.</b> ' + p.fb;
        if (!bien){
          if (c.pert !== p.pert) html += ' <br><b>Sobre la pertinencia:</b> ' + esc(p.fbPert);
          if (c.fuerte !== p.fuerte) html += ' <br><b>Sobre la fuerza:</b> ' + esc(p.fbFuerza);
        }
        fb.innerHTML = html;
        fb.prepend(marca);
        ft.append(fb);
      }
      box.append(ft);
      lista.append(box);
    });

    const cabecera = h('div',{class:'card stack'},
      h('span',{class:'eyebrow mis'},'Expediente de evidencia · 12 piezas'),
      h('p',{style:'margin:0', html:'Cada pieza se juzga en dos ejes independientes. <b>Pertinencia</b>: ¿responde a la pregunta que esta audiencia decide? <b>Fuerza</b>: ¿cómo se obtuvo, cuánta gente mide, hay comparación, quién la paga, se puede verificar? Una pieza puede ser excelente y no pertinente, o pertinente y muy débil. Hay ejemplos de las cuatro combinaciones.'}),
      h('div',{class:'tablewrap'}, h('table',{class:'aud-quad'},
        h('thead',{}, h('tr',{}, h('th',{},''), h('th',{},'Fuerte'), h('th',{},'Débil'))),
        h('tbody',{},
          h('tr',{}, h('th',{},'Pertinente'), h('td',{},'Se usa como base del argumento.'), h('td',{},'Sirve para plantear hipótesis o ver quién paga el costo; no para concluir.')),
          h('tr',{}, h('th',{},'No pertinente'), h('td',{},'Buena ciencia, otra pregunta: no entra en esta decisión.'), h('td',{},'Ruido: se registra que se presentó y se descarta.'))))),
      nota('Sugerencia: lee la pieza completa, mira el gráfico o la tabla y fíjate en la línea de "Fuente" antes de clasificar. Ahí suele estar la clave.'));

    const pie = St.clasRev
      ? h('div',{class:'card stack'},
          h('div',{class:'row'},
            h('span',{class:'pill ' + (aciertos >= 8 ? 'ok' : 'warn')}, `${aciertos} de ${total} piezas bien clasificadas`),
            h('button',{class:'btn sm', onclick:()=>{ St.clas={}; St.clasRev=false; St.marks.clas=false; render(); }},'Volver a intentarlo')),
          h('div',{class:'aud-bar'}, h('i',{style:'width:'+Math.round(aciertos/total*100)+'%'})),
          h('p',{style:'margin:0'}, aciertos >= 8
            ? 'Con esta lectura del expediente ya puedes construir un argumento honesto: sabes cuáles son las seis piezas en las que se puede apoyar una conclusión y cuáles solo sirven para plantear preguntas o para entender quién paga el costo.'
            : 'Todavía se te escapan varias. Vuelve a leer la retroalimentación de las que fallaste, sobre todo la pieza del humo de leña (fuerte pero no pertinente) y la de los calefactores (pertinente pero con variable de confusión): son las dos que más se repiten en la vida real.'),
          h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{ St.sec=2; render(); }},'Construir mi argumento →'))
      : h('div',{class:'card stack'}, accion, nota(`Llevas ${listos} de ${total}. Puedes cambiar tus respuestas hasta que compruebes.`));

    return h('div',{class:'stack'}, cabecera, lista, pie, secNav());
  }

  /* =====================================================================
     SECCIÓN 3 · CONSTRUIR EL ARGUMENTO
     ===================================================================== */
  function evaluaArgumento(){
    const sel = St.piezas.map(pieza);
    const fp = sel.filter(p => p.pert && p.fuerte).length;
    const pd = sel.filter(p => p.pert && !p.fuerte).length;
    const np = sel.filter(p => !p.pert).length;
    const af = AUD_AFIRMA.find(a => a.id === St.afirma);
    const claves = af.ideal.filter(id => St.piezas.indexOf(id) >= 0).length;
    let pts = 0;
    pts += Math.min(fp, 4) * 12;          /* hasta 48 por piezas fuertes y pertinentes */
    pts += claves * 8;                    /* hasta 24 por usar las piezas clave de la afirmación */
    pts -= np * 10;                       /* penaliza evidencia no pertinente */
    if (fp === 0) pts -= 15;              /* argumento sin ninguna pieza sólida */
    if (St.razon.trim().length >= 160) pts += 16; else if (St.razon.trim().length >= 90) pts += 10;
    if (/porque|por (?:eso|tanto|lo tanto)|ya que|dado que|puesto que|de ahí|implica|muestra que|indica que/i.test(St.razon)) pts += 12;
    pts = clamp(Math.round(pts), 0, 100);
    return { pts, fp, pd, np, claves, af };
  }

  function secArgumento(){
    const wrap = h('div',{class:'stack'});

    wrap.append(h('div',{class:'card stack'},
      h('span',{class:'eyebrow mis'},'Cómo se arma un argumento científico'),
      h('div',{class:'aud-arg'},
        h('div',{class:'aud-slot'}, h('span',{},'Afirmación'), h('div',{},'Lo que sostienes. Una sola frase, discutible y concreta. Si nadie puede estar en desacuerdo, no es una afirmación: es una obviedad.')),
        h('div',{class:'aud-slot'}, h('span',{},'Evidencia'), h('div',{},'Las piezas del expediente en las que te apoyas. Se citan por su código, no "los estudios dicen".')),
        h('div',{class:'aud-slot'}, h('span',{},'Razonamiento'), h('div',{},'El puente: por qué esas piezas sostienen esa afirmación. Es la parte que más se olvida y la que decide si el argumento se sostiene.'))),
      nota('Se evalúa el apoyo, no el bando. Las cuatro afirmaciones son defendibles; lo que cambia es con qué evidencia se puede defender cada una.')));

    /* --- afirmación --- */
    const afBox = h('div',{class:'aud-med'});
    AUD_AFIRMA.forEach(a => {
      const b = h('button',{ class:'aud-card', 'aria-pressed':String(St.afirma===a.id), 'aria-label':'Afirmación '+a.id,
        disabled: St.argRev || null,
        onclick:()=>{ St.afirma = a.id; St.argRev=false; render(); } },
        h('h4',{}, 'Afirmación ' + a.id), h('p',{}, a.t));
      afBox.append(b);
    });
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow mis'},'1 · Elige tu afirmación'), afBox));

    if (St.afirma){
      /* --- evidencia --- */
      const sel = h('div',{class:'aud-sel'});
      AUD_PIEZAS.forEach(p => {
        const on = St.piezas.indexOf(p.id) >= 0;
        const cb = h('input',{ type:'checkbox', id:'aud-ck-'+p.id, checked: on || null, disabled: St.argRev || null,
          onchange:()=>{ const i = St.piezas.indexOf(p.id); if (i>=0) St.piezas.splice(i,1); else St.piezas.push(p.id); render(); } });
        sel.append(h('label',{ class:'aud-sel-l'+(on?' aud-on':''), for:'aud-ck-'+p.id }, cb,
          h('span',{}, h('b',{}, p.cod + ' · '), p.t, h('small',{}, p.tipo + (St.clasRev ? ' · tu clasificación: ' + (St.clas[p.id] ? ((St.clas[p.id].pert?'pertinente':'no pertinente')+', '+(St.clas[p.id].fuerte?'fuerte':'débil')) : 'sin clasificar') : '')))));
      });
      wrap.append(h('div',{class:'card stack'},
        h('span',{class:'eyebrow mis'},'2 · Elige las piezas en las que te apoyas'),
        nota('Mínimo tres. Elegir muchas no mejora el argumento: elegir las adecuadas, sí.'),
        sel));

      /* --- razonamiento --- */
      const ta = h('textarea',{ rows:'6', 'aria-label':'Razonamiento del argumento', disabled: St.argRev || null,
        placeholder:'Sostengo que… porque la pieza P__ muestra que… y la pieza P__ permite descartar que… Reconozco que no puedo afirmar… porque…',
        oninput:(e)=>{ St.razon = e.target.value; } });
      ta.value = St.razon;
      const accion = h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{
        if (St.piezas.length < 3) return toast('Elige al menos tres piezas de evidencia.');
        if (St.razon.trim().length < 90) return toast('Desarrolla el razonamiento: explica por qué esas piezas sostienen tu afirmación (mínimo 90 caracteres).');
        const r = evaluaArgumento();
        St.argPts = r.pts; St.argRev = true; St.marks.arg = r.pts >= 55;
        const af = r.af;
        Store.addNote('conclusion',
          'Audiencia científica simulada · ' + AUD_CASO.ciudad + '\n' +
          'AFIRMACIÓN (' + af.id + '): ' + af.t + '\n' +
          'EVIDENCIA CITADA: ' + St.piezas.map(id => id + ' — ' + pieza(id).t).join(' | ') + '\n' +
          'RAZONAMIENTO: ' + St.razon.trim() + '\n' +
          'Apoyo evaluado: ' + r.pts + '/100 · piezas fuertes y pertinentes usadas: ' + r.fp + ' · no pertinentes: ' + r.np,
          { actividad:'cn-audiencia', etapa:'argumento' });
        Store.log('respuesta_abierta', { actividad:'cn-audiencia', etapa:'argumento', afirmacion:af.id, piezas:St.piezas.length, apoyo:r.pts, longitud:St.razon.length });
        toast('Argumento guardado en tu cuaderno.');
        render();
      }}, 'Presentar mi argumento ante la audiencia');

      const bloque = h('div',{class:'card stack'},
        h('span',{class:'eyebrow mis'},'3 · Escribe el razonamiento'),
        nota('Un buen razonamiento nombra las piezas, dice qué muestra cada una y —esto es lo que distingue a un argumento honesto— declara qué NO puede afirmar con ellas.'),
        ta);

      if (!St.argRev) bloque.append(accion);
      wrap.append(bloque);

      if (St.argRev){
        const r = evaluaArgumento();
        const det = h('div',{class:'aud-score'},
          h('div',{}, h('b',{},'Piezas fuertes y pertinentes usadas: '), r.fp + ' × 12 = ' + Math.min(r.fp,4)*12),
          h('div',{}, h('b',{},'Piezas clave para esta afirmación: '), r.claves + ' de ' + r.af.ideal.length + ' × 8 = ' + r.claves*8),
          h('div',{}, h('b',{},'Piezas no pertinentes citadas: '), r.np + ' × (−10) = ' + (-r.np*10)),
          h('div',{}, h('b',{},'Razonamiento (extensión y conectores causales): '), 'hasta +28'),
          h('div',{class:'tot'}, 'Apoyo del argumento: ' + r.pts + ' / 100'));

        const veredicto = h('div',{class:'notice ' + (r.pts>=70?'ok':r.pts>=55?'info':'warn')});
        let txt = '';
        if (r.np > 0) txt += 'Citaste ' + r.np + ' pieza(s) que no informan esta decisión (' + St.piezas.filter(id=>!pieza(id).pert).join(', ') + '): en una audiencia real, la parte contraria empezaría por ahí y el resto de tu argumento quedaría en duda. ';
        if (r.fp === 0) txt += 'Tu argumento no se apoya en ninguna pieza fuerte y pertinente: se sostiene solo en testimonios, correlaciones o informes no verificables. ';
        else if (r.fp <= 2) txt += 'Tienes base, pero delgada: con ' + r.fp + ' pieza(s) sólida(s) el argumento resiste poco. ';
        else txt += 'Buen apoyo: ' + r.fp + ' piezas sólidas y pertinentes. ';
        txt += (r.claves >= 2 ? r.af.fbOk : r.af.fbFalta);
        if (r.pd > 0) txt += ' Las ' + r.pd + ' pieza(s) débiles que citaste no invalidan el argumento si las usas para lo que sirven —mostrar quién carga el costo, plantear una hipótesis—, pero no las presentes como prueba.';
        veredicto.append(h('span',{}, h('b',{}, r.pts>=70 ? 'Argumento bien sostenido. ' : r.pts>=55 ? 'Argumento admisible, con reparos. ' : 'Argumento frágil. '), txt));

        wrap.append(h('div',{class:'card stack'},
          h('span',{class:'eyebrow mis'},'Evaluación del apoyo'),
          h('div',{class:'aud-bar'}, h('i',{style:'width:'+r.pts+'%'})),
          det, veredicto,
          h('div',{class:'row'},
            h('button',{class:'btn sm', onclick:()=>{ St.argRev=false; render(); }},'Corregir mi argumento'),
            h('button',{class:'btn sm primary', onclick:()=>{ St.sec=3; render(); }},'Escuchar a la parte contraria →')),
          nota('Tu argumento quedó guardado en el cuaderno de campo, con la evidencia citada. Tu docente puede leerlo tal como lo escribiste.')));
      }
    }

    wrap.append(secNav());
    return wrap;
  }

  /* =====================================================================
     SECCIÓN 4 · CONTRAARGUMENTO
     ===================================================================== */
  function secContra(){
    if (!St.argRev) return h('div',{class:'stack'},
      h('div',{class:'notice warn'},'Primero presenta tu argumento en la sección 3: el contraargumento que recibirás depende de la afirmación que hayas defendido.'),
      h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{ St.sec=2; render(); }},'Ir a construir mi argumento'),
      secNav());

    const c = AUD_CONTRA[St.afirma];
    const wrap = h('div',{class:'stack'});

    wrap.append(h('div',{class:'card stack'},
      h('span',{class:'eyebrow mis'},'La postura contraria, en su mejor versión'),
      nota('No es la caricatura del adversario: es el argumento más fuerte que se puede construir contra lo que tú sostuviste. Responder a la versión débil del otro no prueba nada.'),
      h('h3',{style:'margin:0'}, c.t),
      h('div',{class:'aud-test',style:'border-left-color:var(--mis)'}, h('i',{}, '«'+c.q+'»')),
      h('div',{class:'notice info'}, h('span',{}, h('b',{},'Por qué es fuerte: '), c.clave))));

    const opts = h('div',{class:'aud-med'});
    AUD_RESP.forEach(r => opts.append(h('button',{ class:'aud-card', 'aria-pressed':String(St.resp===r.id),
      'aria-label':'Estrategia: '+r.n, disabled: St.contraRev || null,
      onclick:()=>{ St.resp = r.id; render(); } }, h('h4',{}, r.n))));

    const ta = h('textarea',{ rows:'5', 'aria-label':'Respuesta al contraargumento', disabled: St.contraRev || null,
      placeholder:'Concedo que… pero sigo sosteniendo que… / La pieza P__ responde a ese punto porque… / Estamos de acuerdo en los datos y en desacuerdo en cuánto peso dar a…',
      oninput:(e)=>{ St.respTxt = e.target.value; } });
    ta.value = St.respTxt;

    const bloque = h('div',{class:'card stack'},
      h('span',{class:'eyebrow mis'},'Tu réplica'),
      h('p',{class:'small muted',style:'margin:0'},'Elige una estrategia y desarróllala. Las cuatro se usan en audiencias reales; solo una de ellas es una falacia si se queda sola.'),
      opts, ta);

    if (!St.contraRev) bloque.append(h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{
      if (!St.resp) return toast('Elige una estrategia de respuesta.');
      if (St.respTxt.trim().length < 80) return toast('Desarrolla tu réplica (mínimo 80 caracteres).');
      St.contraRev = true; St.marks.contra = St.resp !== 'descalifica';
      Store.addNote('conclusion',
        'Audiencia científica simulada · réplica al contraargumento «' + c.t + '»\n' +
        'ESTRATEGIA: ' + AUD_RESP.find(r=>r.id===St.resp).n + '\n' +
        'RÉPLICA: ' + St.respTxt.trim(),
        { actividad:'cn-audiencia', etapa:'contraargumento' });
      Store.log('respuesta_abierta', { actividad:'cn-audiencia', etapa:'contraargumento', estrategia:St.resp, longitud:St.respTxt.length });
      render();
    }}, 'Replicar'));
    wrap.append(bloque);

    if (St.contraRev){
      const r = AUD_RESP.find(x => x.id === St.resp);
      const fb = h('div',{class:'notice ' + (St.resp==='descalifica' ? 'warn' : 'ok')});
      fb.innerHTML = r.fb;
      wrap.append(h('div',{class:'card stack'},
        h('span',{class:'eyebrow mis'},'Sobre la estrategia que elegiste'),
        fb,
        h('details',{}, h('summary',{class:'small'},'Ver qué dice la plataforma sobre las otras tres estrategias'),
          h('div',{class:'stack',style:'margin-top:8px'}, AUD_RESP.filter(x=>x.id!==St.resp).map(x => {
            const d = h('div',{class:'aud-fbk'}); d.innerHTML = '<b>' + esc(x.n) + '.</b> ' + x.fb; return d; }))),
        h('div',{class:'notice info'}, h('span',{}, h('b',{},'Lo que acabas de hacer tiene nombre. '),'Sostener una posición, recibir la mejor objeción posible y responderla sin cambiar de tema es el centro de la argumentación científica. Una conclusión que nunca se expuso a una objeción seria no está probada: solo está sin discutir.')),
        h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{ St.sec=4; render(); }},'Pasar a la deliberación →')));
    }

    wrap.append(secNav());
    return wrap;
  }

  /* =====================================================================
     SECCIÓN 5 · DELIBERACIÓN Y DECISIÓN
     ===================================================================== */
  function chartProy(m){
    const wrap = h('div',{style:'padding:4px 0'});
    const cv = h('canvas',{class:'chart',style:'height:230px','aria-label':'Proyección del PM2,5 promedio del Centro a 0, 6, 12, 24 y 36 meses para la medida elegida, comparada con no hacer nada.'});
    wrap.append(cv);
    const xs = [0,6,12,24,36];
    setTimeout(()=>{ try { lineChart(cv, {
      series:[
        { label:'Con la medida', color:cssVar('--ok'),  pts: m.proy.map((y,i)=>({x:xs[i], y})), dots:true },
        { label:'Sin hacer nada', color:cssVar('--bad'), pts: xs.map(x=>({x, y: 34.8 + x*0.03})) },
        { label:'Guía OMS',       color:cssVar('--ink-3'), pts: xs.map(x=>({x, y:15})) } ],
      xmin:0, xmax:36, ymin:0, ymax:44, xticks:6,
      xlabel:'meses desde la aprobación', ylabel:'PM2,5 µg/m³ (Centro)',
      xfmt:v=>audN(v,0)+' m', yfmt:v=>audN(v,0) }); } catch(e){ console.warn(e); } }, 30);
    return wrap;
  }

  function secDecision(){
    const wrap = h('div',{class:'stack'});
    wrap.append(h('div',{class:'card stack'},
      h('span',{class:'eyebrow mis'},'Deliberación y voto'),
      h('p',{style:'margin:0'},'Cuatro medidas, 4,2 millones de dólares comprometidos y tres años. Ninguna es buena: cada una compra algo y paga con otra cosa. Lee las cuatro completas, elige una y justifica el voto citando evidencia. Después verás la proyección y, sobre todo, los efectos que nadie pone en el folleto.'),
      nota('Criterios que el Concejo debe usar: efecto esperado sobre la exposición, equidad (quién gana y quién paga), costo y factibilidad, y proporcionalidad respecto de la evidencia disponible.')));

    const box = h('div',{class:'aud-med'});
    AUD_MEDIDAS.forEach(m => {
      const b = h('button',{ class:'aud-card', 'aria-pressed':String(St.medida===m.id), 'aria-label':'Medida '+m.id+': '+m.n,
        disabled: St.decRev || null, onclick:()=>{ St.medida = m.id; render(); } },
        h('h4',{}, m.em + ' ' + m.id + ' · ' + m.n),
        h('p',{}, m.d),
        h('div',{class:'aud-nums'},
          h('span',{class:'aud-tag'}, 'USD ' + audN(m.costo,1) + ' M'),
          h('span',{class:'aud-tag'}, m.alcance),
          h('span',{class:'aud-tag'}, m.vel),
          h('span',{class:'aud-tag'}, m.equidad)));
      box.append(b);
    });
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow mis'},'Las cuatro medidas'), box));

    const ta = h('textarea',{ rows:'5', 'aria-label':'Justificación del voto', disabled: St.decRev || null,
      placeholder:'Voto por la medida __ porque la pieza P__ muestra que… Acepto como costo que… La vigilaré con el indicador… y la retiraría si…',
      oninput:(e)=>{ St.just = e.target.value; } });
    ta.value = St.just;

    const bloque = h('div',{class:'card stack'},
      h('span',{class:'eyebrow mis'},'Tu voto razonado'),
      nota('Un voto completo dice tres cosas: en qué evidencia se apoya, qué costo acepta a sabiendas y con qué indicador lo vigilará.'),
      ta);

    if (!St.decRev) bloque.append(h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{
      if (!St.medida) return toast('Elige una de las cuatro medidas.');
      if (St.just.trim().length < 100) return toast('Justifica el voto: evidencia, costo que aceptas e indicador (mínimo 100 caracteres).');
      St.decRev = true; St.marks.dec = true;
      const m = AUD_MEDIDAS.find(x=>x.id===St.medida);
      Store.addNote('resultado',
        'Audiencia científica simulada · voto del Concejo\n' +
        'MEDIDA ELEGIDA: ' + m.id + ' — ' + m.n + ' (USD ' + audN(m.costo,1) + ' M)\n' +
        'JUSTIFICACIÓN: ' + St.just.trim() + '\n' +
        'INDICADOR COMPROMETIDO: ' + m.ind + '\n' +
        'SALVAGUARDA: ' + m.salv,
        { actividad:'cn-audiencia', etapa:'decision', medida:m.id });
      Store.log('decision', { actividad:'cn-audiencia', medida:m.id, longitud:St.just.length });
      render();
    }}, 'Emitir mi voto'));
    wrap.append(bloque);

    if (St.decRev){
      const m = AUD_MEDIDAS.find(x=>x.id===St.medida);
      const ef = h('ul',{style:'margin:0;padding-left:18px'});
      m.efectos.forEach(t => ef.append(h('li',{style:'font-size:.87rem;line-height:1.45;margin-bottom:5px'}, t)));
      const no = h('ul',{style:'margin:0;padding-left:18px'});
      m.no.forEach(t => no.append(h('li',{style:'font-size:.87rem;line-height:1.45;margin-bottom:5px'}, t)));
      const baja = Math.round((m.proy[0] - m.proy[4]) / m.proy[0] * 100);

      wrap.append(h('div',{class:'card stack'},
        h('span',{class:'eyebrow mis'},'Consecuencias proyectadas · ' + m.id + ' · ' + m.n),
        chartProy(m),
        h('div',{class:'row'},
          h('span',{class:'pill ' + (baja>=25?'ok':baja>=12?'warn':'bad')}, 'PM2,5 del Centro a 36 meses: ' + audN(m.proy[4],1) + ' µg/m³ (' + (baja>=0?'−':'+') + Math.abs(baja) + ' %)'),
          h('span',{class:'pill'}, 'Guía OMS: 15 µg/m³')),
        h('div',{},
          h('span',{class:'eyebrow ok'},'Lo que compra'), ef),
        h('div',{},
          h('span',{class:'eyebrow bad'},'Efectos no deseados y costos que alguien paga'), no),
        h('div',{class:'notice info'}, h('span',{}, h('b',{},'Indicador comprometido: '), m.ind)),
        h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Salvaguarda: '), m.salv)),
        h('div',{class:'notice'}, h('span',{}, h('b',{},'Ninguna opción llega a la guía de la OMS en tres años. '),'Eso no es un error del ejercicio: es la situación real de casi cualquier ciudad andina. Una recomendación honesta reconoce que la medida es un paso, fija cuándo se revisa y dice qué haría si el indicador no se mueve.')),
        h('details',{}, h('summary',{class:'small'},'Comparar con lo que habría pasado con las otras tres medidas'),
          h('div',{class:'tablewrap',style:'margin-top:8px'}, h('table',{class:'data'},
            h('thead',{}, h('tr',{}, h('th',{},'Medida'), h('th',{},'Costo'), h('th',{},'PM2,5 a 36 meses'), h('th',{},'Su peor efecto no deseado'))),
            h('tbody',{}, AUD_MEDIDAS.map(x => h('tr',{ style: x.id===m.id ? 'font-weight:600' : '' },
              h('td',{}, x.id + ' · ' + x.n), h('td',{class:'mono'}, 'USD ' + audN(x.costo,1) + ' M'),
              h('td',{class:'mono'}, audN(x.proy[4],1)), h('td',{}, x.no[0]))))))),
        h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{ St.sec=5; render(); }},'Ir al cierre →')));
    }

    wrap.append(secNav());
    return wrap;
  }

  /* =====================================================================
     SECCIÓN 6 · CIERRE
     ===================================================================== */
  function secCierre(){
    const wrap = h('div',{class:'stack'});

    const hechos = [
      ['Clasificaste las 12 piezas del expediente', St.marks.clas],
      ['Construiste un argumento con apoyo suficiente', St.marks.arg],
      ['Respondiste al contraargumento sin recurrir a la descalificación', St.marks.contra],
      ['Emitiste un voto razonado con indicador y salvaguarda', St.marks.dec]
    ];
    const lista = h('ul',{class:'checks'});
    hechos.forEach(([t, ok]) => lista.append(h('li',{class: ok ? 'ok' : ''}, h('span',{class:'ck','aria-hidden':'true'}, ok?'✓':'·'), t + (ok ? '' : ' — pendiente'))));
    wrap.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow mis'},'Lo que hiciste en la audiencia'), lista,
      nota('Puedes resolver las preguntas de cierre aunque falte alguna casilla, pero el argumento y el voto son la evidencia de la unidad: son lo que tu docente lee en el cuaderno.')));

    const preguntas = h('div',{class:'stack'});
    const marcador = h('div',{class:'row'});
    const cierre = h('div',{});

    const nOk = () => Object.keys(St.quizOk).length;

    function finaliza(){
      if (St.marks.quiz) return;
      if (nOk() < AUD_QUIZ.length) return;
      St.marks.quiz = true;
      const min = Math.round((Date.now() - St.start) / 60000);
      const score = nOk() + '/' + AUD_QUIZ.length;
      Store.addNote('conclusion',
        'Audiencia científica simulada · cierre. Criterios de evaluación de evidencia: ' + score +
        ' correctas con ' + St.quizInt + ' intentos. Medida votada: ' + (St.medida || '—') + '. Tiempo: ' + min + ' min.',
        { actividad:'cn-audiencia', etapa:'cierre' });
      Store.completeActivity('cn-audiencia', { score: score, attempts: St.quizInt, medida: St.medida || null, afirmacion: St.afirma || null, apoyo: St.argPts });
      cierre.className = 'notice ok';
      cierre.innerHTML = '';
      cierre.append(h('span',{}, h('b',{},'Caso cerrado. '),'Tu argumento, tu réplica y tu voto quedaron guardados en el cuaderno de campo con la evidencia citada. Vuelve cuando quieras y defiende otra de las cuatro afirmaciones con el mismo expediente: comprobarás que la evidencia sólida no siempre apunta a un solo lado, y que ahí es donde empiezan los valores.'),
        h('div',{class:'row',style:'margin-top:8px'}, h('a',{class:'btn sm',href:'#/cuaderno'},'Ver mi cuaderno'), h('a',{class:'btn sm ghost',href:'#/cn/unidad/10-cvt-3'},'Volver a la unidad')));
      retoSt.className = 'notice ok';
      retoSt.textContent = 'Caso resuelto ✓ · criterios de evidencia: ' + score + '. Puedes volver y defender otra postura con el mismo expediente.';
      renderNav();
    }

    AUD_QUIZ.forEach((q, i) => {
      preguntas.append(h('div',{class:'card stack'},
        h('span',{class:'eyebrow mis'},'Pregunta ' + (i+1) + ' de ' + AUD_QUIZ.length),
        quizBlock(q, (att) => { if (!St.quizOk[i]){ St.quizOk[i] = att; St.quizInt += att; } pintaMarcador(); finaliza(); })));
    });
    function pintaMarcador(){
      marcador.innerHTML = '';
      marcador.append(h('span',{class:'pill ' + (nOk()===AUD_QUIZ.length?'ok':'')}, nOk() + ' de ' + AUD_QUIZ.length + ' resueltas'));
    }
    pintaMarcador();

    wrap.append(h('div',{class:'card stack'},
      h('span',{class:'eyebrow mis'},'Criterios para evaluar evidencia'),
      h('p',{style:'margin:0'},'Cinco preguntas sobre lo que acabas de practicar: correlación y causa, tamaño y selección de la muestra, conflicto de interés, pertinencia frente a calidad, e incertidumbre. Cada error trae una explicación de por qué esa opción falla.'),
      marcador));
    wrap.append(preguntas);

    if (St.marks.quiz){
      cierre.className = 'notice ok';
      cierre.append(h('span',{}, h('b',{},'Caso cerrado. '),'Tu argumento, tu réplica y tu voto están en el cuaderno de campo. Puedes volver y defender otra afirmación con el mismo expediente.'),
        h('div',{class:'row',style:'margin-top:8px'}, h('a',{class:'btn sm',href:'#/cuaderno'},'Ver mi cuaderno'), h('a',{class:'btn sm ghost',href:'#/cn/unidad/10-cvt-3'},'Volver a la unidad')));
    }
    wrap.append(h('div',{class:'card stack'},
      h('span',{class:'eyebrow mis'},'Para llevarse de aquí'),
      h('ul',{style:'margin:0;padding-left:18px'},
        h('li',{style:'margin-bottom:6px'},'Pertinencia y fuerza son dos preguntas distintas. Hazlas siempre las dos, en ese orden.'),
        h('li',{style:'margin-bottom:6px'},'Antes de aceptar una cifra: quién la produjo, quién la pagó, cuánta gente mide, con qué se compara y si se puede verificar.'),
        h('li',{style:'margin-bottom:6px'},'Un testimonio no prueba una causa, pero sí muestra quién paga el costo de la decisión. Las dos cosas importan y no se mezclan.'),
        h('li',{style:'margin-bottom:6px'},'De un "es" no se deduce un "debe": los datos acotan la discusión, no la cierran.'),
        h('li',{},'No decidir también es decidir, y el costo de esperar casi nunca lo paga quien puede esperar.')),
      cierre));

    wrap.append(secNav());
    return wrap;
  }

  /* ---------- render ---------- */
  function render(){
    renderNav();
    body.innerHTML = '';
    const f = [secCaso, secExpediente, secArgumento, secContra, secDecision, secCierre][St.sec];
    body.append(f());
    Store.log('seccion', { recurso:'cn-audiencia', seccion: SEC[St.sec].id });
  }
  render();
});
</script>
