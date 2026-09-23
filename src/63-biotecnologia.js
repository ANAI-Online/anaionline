<style>
/* ===== Biotecnología (BGU 3.º · Unidad 9) — CSS propio, prefijo btc- ===== */
.btc-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.btc-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.btc-nav button:hover{border-color:var(--gen,var(--accent))}
.btc-nav button:focus-visible,.btc-seg button:focus-visible,.btc-nt:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.btc-nav button[aria-current="true"]{background:var(--gen,var(--accent));border-color:var(--gen,var(--accent));color:#fff}
.btc-links{display:flex;flex-wrap:wrap;gap:6px}
.btc-cv{width:100%;display:block;border:1px solid var(--line);border-radius:12px;background:var(--bg-3)}
.btc-gel{width:100%;display:block;border-radius:12px;border:1px solid var(--line);background:#1a1030}
.btc-chart{position:relative}
.btc-chart canvas{width:100%;height:260px;display:block}
.btc-grp{display:flex;flex-direction:column;gap:5px}
.btc-grp>.btc-lab{font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);font-weight:600}
.btc-seg{display:flex;flex-wrap:wrap;gap:4px}
.btc-seg button{flex:1 1 auto;min-width:64px;border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:9px;padding:6px 8px;font:600 .78rem/1.15 "IBM Plex Sans",sans-serif;cursor:pointer}
.btc-seg button[aria-pressed="true"]{background:color-mix(in srgb,var(--gen,var(--accent)) 18%,var(--bg-2));border-color:var(--gen,var(--accent));color:var(--ink)}
.btc-seg button:disabled{opacity:.45;cursor:not-allowed}
.btc-sl{display:grid;grid-template-columns:1fr auto;gap:3px 10px;align-items:center;font-size:.82rem}
.btc-sl input{grid-column:1/-1;width:100%}
.btc-sl b{font-family:var(--font-m,"IBM Plex Mono",monospace);font-variant-numeric:tabular-nums}
.btc-kv{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:.84rem;margin:0}
.btc-kv dt{color:var(--ink-3)}
.btc-kv dd{margin:0;font-family:var(--font-m,"IBM Plex Mono",monospace);font-variant-numeric:tabular-nums;color:var(--ink);font-weight:600}
.btc-two{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.btc-lg{display:flex;flex-wrap:wrap;gap:12px;font-size:.76rem;color:var(--ink-2);align-items:center}
.btc-lg span{display:inline-flex;align-items:center;gap:5px}
.btc-lg i{width:18px;height:4px;border-radius:2px;display:inline-block;font-style:normal}
.btc-lg i.dash{background:repeating-linear-gradient(90deg,var(--ink-3) 0 4px,transparent 4px 7px)!important}
.btc-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.btc-steps li{border:1px solid var(--line);border-radius:12px;padding:9px 11px;background:var(--bg-2);display:flex;flex-direction:column;gap:6px}
.btc-steps li.on{border-color:var(--gen,var(--accent));box-shadow:inset 3px 0 0 var(--gen,var(--accent))}
.btc-steps li.done{opacity:.92}
.btc-steps li.todo{opacity:.55}
.btc-steps .btc-sh{display:flex;gap:8px;align-items:baseline;font-weight:600;font-size:.9rem}
.btc-steps .btc-num{font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.72rem;color:var(--ink-3)}
.btc-mol{font-size:.84rem;color:var(--ink-2);border-left:3px solid var(--gen,var(--accent));padding-left:9px}
.btc-mol b{color:var(--ink)}
.btc-tools{display:flex;flex-wrap:wrap;gap:6px}
.btc-tools button{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;border:1px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:10px;padding:7px 10px;cursor:pointer;font:600 .8rem/1.2 "IBM Plex Sans",sans-serif;min-width:150px;flex:1 1 150px}
.btc-tools button small{font-weight:500;color:var(--ink-3);font-size:.7rem}
.btc-tools button.used{opacity:.5}
.btc-tools button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.btc-svg{width:100%;height:auto;display:block;color:var(--ink)}
.btc-svg text{font-family:"IBM Plex Sans",sans-serif;fill:currentColor}
.btc-seq{display:flex;flex-wrap:wrap;gap:18px 2px;font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.82rem;padding:18px 2px 4px;position:relative}
.btc-nt{width:17px;height:24px;display:grid;place-items:center;border-radius:4px;background:var(--bg-3);color:var(--ink-2);border:1px solid transparent;position:relative}
.btc-nt.win{background:color-mix(in srgb,var(--accent) 22%,var(--bg-3));color:var(--ink);border-color:color-mix(in srgb,var(--accent) 60%,transparent)}
.btc-nt.pam{background:color-mix(in srgb,var(--ok) 28%,var(--bg-3));color:var(--ink);border-color:var(--ok);font-weight:700}
.btc-nt.nopam{border:1px dashed var(--bad);color:var(--ink)}
.btc-nt.mut{text-decoration:underline 2px var(--bad);font-weight:700;color:var(--bad)}
.btc-nt.cut::after{content:"";position:absolute;right:-3px;top:-6px;bottom:-6px;width:2px;background:var(--bad)}
.btc-nt.atg{font-weight:700;color:var(--ink)}
.btc-nt .btc-ix{position:absolute;top:-15px;left:0;font-size:.58rem;color:var(--ink-3)}
.btc-prot{display:flex;flex-wrap:wrap;gap:3px;align-items:center;font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.74rem}
.btc-prot span{border:1px solid var(--line);border-radius:6px;padding:2px 5px;background:var(--bg-2)}
.btc-prot span.dif{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 14%,var(--bg-2));font-weight:700}
.btc-prot span.stop{border-color:var(--bad);color:#fff;background:var(--bad);font-weight:700}
.btc-prot span.fix{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 16%,var(--bg-2));font-weight:700}
.btc-arg{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.btc-arg>div{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--bg-2)}
.btc-arg h4{margin:0 0 6px;font-size:.92rem}
.btc-arg ul{margin:0;padding-left:18px;font-size:.85rem;display:flex;flex-direction:column;gap:5px}
.btc-quote{border-left:4px solid var(--gen,var(--accent));background:var(--bg-2);padding:10px 13px;border-radius:0 10px 10px 0;font-size:.9rem;margin:0}
.btc-quote cite{display:block;font-size:.74rem;color:var(--ink-3);margin-top:6px;font-style:normal}
.btc-cls{display:flex;flex-direction:column;gap:8px}
.btc-cls>div{border:1px solid var(--line);border-radius:12px;padding:9px 11px;background:var(--bg-2);display:flex;flex-direction:column;gap:6px}
.btc-cls>div.ok{border-color:var(--ok)}
.btc-cls p{margin:0;font-size:.88rem}
.btc-cls .btc-fb{font-size:.8rem;color:var(--ink-2)}
.btc-runs{width:100%}
.btc-note{width:100%;min-height:90px;border:1px solid var(--line);border-radius:10px;background:var(--bg-2);color:var(--ink);padding:9px;font:inherit;font-size:.88rem;resize:vertical}
.btc-stage{height:440px;min-height:440px;align-self:start}
.btc-2d svg{max-width:440px;margin:0 auto}
.btc-two>*,.btc-arg>*{min-width:0}
.btc-cv,.btc-gel{max-width:100%}
.btc-steps .btn{white-space:normal;text-align:left;max-width:100%;height:auto}
.btc-2d{padding:14px;display:flex;flex-direction:column;gap:8px;height:100%;box-sizing:border-box;justify-content:center}
@media(max-width:820px){.btc-two,.btc-arg{grid-template-columns:1fr}.btc-stage{height:340px;min-height:340px}}
</style>
<script>
/* =====================================================================
   BIOTECNOLOGÍA
   Biología BGU · 3.º de Bachillerato · Unidad 9
   Ruta: #/explorar/biotecnologia · Actividad: reto-biotecnologia
   Todo lo nuevo de este archivo lleva el prefijo btc- / btc / BTC_.
   ===================================================================== */
try { if (typeof BIO === 'object' && BIO && BIO.activities && !BIO.activities['reto-biotecnologia'])
  BIO.activities['reto-biotecnologia'] = { t:'Reto: biotecnología', unidad:9, peso:0, xp:150 };
} catch(e){ console.warn('btc activities', e); }
try { if (typeof ACT_HREF === 'object' && ACT_HREF) ACT_HREF['reto-biotecnologia'] = '#/explorar/biotecnologia'; } catch(e){}
try { if (typeof BIO === 'object' && BIO && Array.isArray(BIO.resources) && !BIO.resources.some(r => r.href === '#/explorar/biotecnologia'))
  BIO.resources.push({ id:'biotecnologia', tipo:'Laboratorio', t:'Biotecnología', d:'Extracción de ADN, PCR, electroforesis, insulina recombinante, CRISPR y bioética.',
    href:'#/explorar/biotecnologia', areas:['genetica'], em:'🧫', ok:true,
    reto:'Lee un gel de electroforesis y una curva de PCR, y explica cómo se fabrica insulina humana en bacterias.', act:'reto-biotecnologia' });
} catch(e){ console.warn('btc resources', e); }

/* ------------------------------------------------------------- formato */
const btcN = (v, d) => (typeof v === 'number' && isFinite(v) ? v : 0).toFixed(d === undefined ? 1 : d).replace('.', ',');
const BTC_SUP = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻' };
const btcSup = n => String(n).split('').map(c => BTC_SUP[c] || c).join('');
const btcMiles = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
function btcCopias(n){
  if (!isFinite(n) || n < 1e5) return btcMiles(n || 0);
  const e = Math.floor(Math.log10(n)), m = n / Math.pow(10, e);
  return btcN(m, 2) + ' × 10' + btcSup(e);
}
const btcQuieto = () => !((typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion));
function btcRng(seed){
  let a = (seed >>> 0) || 1;
  return function(){ a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const btcNota = (cls, titulo, txt) => h('div',{class:'notice '+cls},
  h('span',{}, h('b',{}, titulo+' '), /<[a-z/]/i.test(txt) ? h('span',{html:txt}) : txt));
/* selector accesible (botones con aria-pressed) */
function btcSeg(label, ops, valor, onPick){
  const seg = h('div',{class:'btc-seg',role:'group','aria-label':label});
  const btns = {};
  ops.forEach(o => {
    const b = h('button',{ type:'button', 'aria-pressed':String(String(o.v)===String(valor())), title:o.t||o.n,
      onclick:()=>{ onPick(o.v); Object.entries(btns).forEach(([k,e]) => e.setAttribute('aria-pressed', String(k===String(o.v)))); } }, o.n);
    btns[String(o.v)] = b; seg.append(b);
  });
  return h('div',{class:'btc-grp'}, h('span',{class:'btc-lab'}, label), seg);
}
/* deslizador con etiqueta y valor visible */
function btcSlider(label, min, max, step, valor, fmt, onInput){
  const out = h('b',{}, fmt(valor));
  const inp = h('input',{ type:'range', min, max, step, value:String(valor), 'aria-label':label,
    oninput:e => { const v = parseFloat(e.target.value); out.textContent = fmt(v); inp.setAttribute('aria-valuetext', fmt(v)); onInput(v); } });
  inp.setAttribute('aria-valuetext', fmt(valor));
  return h('label',{class:'btc-sl'}, h('span',{}, label), out, inp);
}
/* color sRGB → lineal para r128 */
function btcCol(hex){ const c = new THREE.Color(hex); return c.convertSRGBToLinear ? c.convertSRGBToLinear() : c; }
/* lienzo con resolución de pantalla */
function btcLienzo(cv, H){
  const W = cv.clientWidth || cv.parentElement && cv.parentElement.clientWidth || 600;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(W*dpr), hh = Math.round(H*dpr);
  if (cv.width !== w || cv.height !== hh){ cv.width = w; cv.height = hh; }   /* no realocar en cada cuadro de una animación */
  cv.style.height = H+'px';
  const x = cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0); x.clearRect(0, 0, W, H);
  x.setLineDash([]); x.globalAlpha = 1; x.shadowBlur = 0; x.shadowColor = 'rgba(0,0,0,0)'; x.lineCap = 'butt'; x.lineJoin = 'miter'; x.textAlign = 'start'; x.textBaseline = 'alphabetic'; x.lineDashOffset = 0;
  return { x, W, H };
}
function btcRRect(x, X, Y, W, H, r){ x.beginPath(); x.moveTo(X+r,Y); x.arcTo(X+W,Y,X+W,Y+H,r); x.arcTo(X+W,Y+H,X,Y+H,r); x.arcTo(X,Y+H,X,Y,r); x.arcTo(X,Y,X+W,Y,r); x.closePath(); }

/* =====================================================================
   1 · EXTRACCIÓN DE ADN — pasos y modelo de rendimiento
   ===================================================================== */
const BTC_FRUTAS = {
  fresa:  { n:'Fresa',  pulpa:'#C8283A', liq:'#E78A96', base:1.0,  d:'La fresa cultivada es octoploide: cada célula guarda 8 juegos de cromosomas. Además es blanda y se machaca con facilidad.' },
  banano: { n:'Banano', pulpa:'#EFE1A6', liq:'#F3EBCB', base:0.72, d:'El banano de exportación (Cavendish) es triploide: 3 juegos de cromosomas. El Ecuador es el mayor exportador de banano del mundo, así que casi cualquier casa tiene uno a mano.' }
};
const BTC_PASOS = [
  { id:'machacar', n:'Machacar la fruta', ops:[{ v:1, n:'Machacar dentro de una bolsa con cierre (2 min)' }],
    mol:'Con la presión rompes la <b>pared celular</b> (celulosa y pectina) y separas las células unas de otras. Las membranas todavía siguen enteras: el ADN sigue encerrado en cada núcleo.' },
  { id:'det', n:'Solución de extracción: agua y detergente', ops:[{ v:true, n:'Añadir agua con detergente de platos' },{ v:false, n:'Solo agua, sin detergente' }],
    mol:'El detergente tiene una cola que evita el agua y una cabeza que la busca, igual que los fosfolípidos. Por eso se mete entre ellos y <b>deshace la membrana plasmática y la envoltura nuclear</b>. Sin detergente, casi todo el ADN se queda dentro de núcleos intactos.' },
  { id:'sal', n:'Sal de cocina', ops:[{ v:true, n:'Añadir una cucharadita de sal' },{ v:false, n:'No añadir sal' }],
    mol:'Cada nucleótido tiene un grupo fosfato con <b>carga negativa</b>, así que las moléculas de ADN se repelen. Los iones Na⁺ de la sal neutralizan esas cargas: las hebras dejan de repelerse y pueden juntarse. La sal también ayuda a soltar las proteínas pegadas al ADN.' },
  { id:'filtrar', n:'Filtrar', ops:[{ v:1, n:'Pasar por un colador o una tela limpia' }],
    mol:'Separas la pulpa, las semillas y los restos de pared. El ADN está <b>disuelto</b> en el líquido que pasa: no lo ves todavía porque cada molécula mide unos 2 nanómetros de ancho.' },
  { id:'alc', n:'Alcohol', ops:[{ v:'frio', n:'Verter alcohol helado por la pared del vaso' },{ v:'tibio', n:'Verter alcohol a temperatura ambiente' }],
    mol:'El ADN se disuelve en agua porque es polar, pero <b>no se disuelve en alcohol</b>. En la frontera entre las dos capas deja de estar disuelto y precipita. El frío baja todavía más su solubilidad y frena a las enzimas (nucleasas) que lo cortan.' },
  { id:'recoger', n:'Recoger el ADN', ops:[{ v:'suave', n:'Esperar 5 min y enrollar suavemente con un palillo' },{ v:'fuerte', n:'Agitar fuerte el vaso para mezclar' }],
    mol:'Las moléculas de ADN son larguísimas y frágiles. Si agitas, las <b>rompes en trozos cortos</b> (y mezclas otra vez las capas): obtienes grumos que no se enrollan. Con calma se forman hebras blancas largas que se pueden levantar con el palillo.' }
];
function btcRendimiento(r){
  const F = BTC_FRUTAS[r.fruta];
  let y = F.base * (r.det ? 1 : 0.12) * (r.sal ? 1 : 0.45) * (r.alc === 'frio' ? 1 : 0.6);
  return clamp(y, 0, 1);
}
function btcVeredicto(r){
  const y = btcRendimiento(r);
  if (y > 0.8) return 'Abundante: una nube blanca de hebras largas';
  if (y > 0.5) return 'Buena: hebras visibles';
  if (y > 0.2) return 'Escasa: unos pocos filamentos';
  return 'Casi nada: la frontera entre capas queda limpia';
}
/* ---------------------------------------------------------------------
   Ilustración de la extracción: mesa de laboratorio, fruta real, bolsa
   con cierre, tampón de lisis, filtro y embudo, vaso con alcohol frío y
   ADN que precipita y se enrolla en un palillo. `fase` 0→1 anima el paso.
   --------------------------------------------------------------------- */
function btcOscuro(){
  const c = (cssVar('--bg') || '#ffffff').trim(), m = c.match(/^#([0-9a-f]{6})$/i);
  if (!m) return false; const n = parseInt(m[1], 16);
  return ((n>>16&255)*0.3 + (n>>8&255)*0.59 + (n&255)*0.11) < 90;
}
const btcEase = v => { v = clamp(v, 0, 1); return v*v*(3-2*v); };
function btcMesa(x, W, H, yB, osc){
  const g = x.createLinearGradient(0, 0, 0, yB);
  g.addColorStop(0, osc ? '#15253C' : '#F1F5F9'); g.addColorStop(1, osc ? '#0F1C2F' : '#DEE6EE');
  x.fillStyle = g; x.fillRect(0, 0, W, yB);
  /* azulejos de la pared */
  x.strokeStyle = osc ? 'rgba(255,255,255,.035)' : 'rgba(40,70,110,.07)'; x.lineWidth = 1;
  for (let yy = yB - 34, r = 0; yy > -34; yy -= 34, r++){
    x.beginPath(); x.moveTo(0, yy + .5); x.lineTo(W, yy + .5); x.stroke();
    for (let xx = (r % 2) * 26; xx < W; xx += 52){ x.beginPath(); x.moveTo(xx + .5, yy); x.lineTo(xx + .5, yy + 34); x.stroke(); }
  }
  const lz = x.createRadialGradient(W*0.35, -20, 10, W*0.35, -20, W*0.9);
  lz.addColorStop(0, osc ? 'rgba(140,180,255,.10)' : 'rgba(255,255,255,.55)'); lz.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = lz; x.fillRect(0, 0, W, yB);
  /* mesada */
  const m = x.createLinearGradient(0, yB, 0, H);
  m.addColorStop(0, osc ? '#3A4D67' : '#FFFFFF'); m.addColorStop(0.06, osc ? '#2C3D55' : '#EEF2F6'); m.addColorStop(1, osc ? '#1B2839' : '#CCD6E1');
  x.fillStyle = m; x.fillRect(0, yB, W, H - yB);
  x.fillStyle = osc ? 'rgba(255,255,255,.12)' : 'rgba(16,35,58,.10)'; x.fillRect(0, yB - 1, W, 1);
}
function btcSombra(x, cx, y, rx, ry, a){
  const g = x.createRadialGradient(cx, y, 0, cx, y, rx);
  g.addColorStop(0, `rgba(10,20,35,${a||.28})`); g.addColorStop(1, 'rgba(10,20,35,0)');
  x.save(); x.translate(cx, y); x.scale(1, ry/rx); x.translate(-cx, -y);
  x.fillStyle = g; x.beginPath(); x.arc(cx, y, rx, 0, 6.2832); x.fill(); x.restore();
}
function btcRotulo(x, W, H, txt, osc){
  x.font = '600 12px "IBM Plex Sans",sans-serif';
  const tw = x.measureText(txt).width, pw = Math.min(W - 16, tw + 24), ph = 24, px = W/2 - pw/2, py = H - ph - 7;
  x.fillStyle = osc ? 'rgba(8,16,28,.78)' : 'rgba(255,255,255,.92)'; btcRRect(x, px, py, pw, ph, 12); x.fill();
  x.strokeStyle = osc ? 'rgba(255,255,255,.14)' : 'rgba(16,35,58,.14)'; x.lineWidth = 1; x.stroke();
  x.fillStyle = cssVar('--ink') || '#10233A'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(txt, W/2, py + ph/2 + .5, pw - 14); x.textBaseline = 'alphabetic';
}
/* fresa: cuerpo cónico, aquenios en hoyitos, sépalos y pedúnculo */
function btcFresa(x, cx, cy, s, rot, sq){
  x.save(); x.translate(cx, cy); x.rotate(rot || 0); if (sq) x.scale(1 + sq*0.35, 1 - sq*0.55);
  const b = new Path2D();
  b.moveTo(-0.44*s, -0.30*s);
  b.bezierCurveTo(-0.64*s, 0.04*s, -0.30*s, 0.47*s, 0, 0.57*s);
  b.bezierCurveTo(0.30*s, 0.47*s, 0.64*s, 0.04*s, 0.44*s, -0.30*s);
  b.bezierCurveTo(0.30*s, -0.47*s, -0.30*s, -0.47*s, -0.44*s, -0.30*s);
  const g = x.createRadialGradient(-0.17*s, -0.14*s, 0.03*s, 0.02*s, 0.06*s, 0.66*s);
  g.addColorStop(0, '#FF8A80'); g.addColorStop(0.3, '#E8283F'); g.addColorStop(0.75, '#B5122B'); g.addColorStop(1, '#6E0716');
  x.fillStyle = g; x.fill(b);
  x.save(); x.clip(b);
  for (let j=0;j<9;j++){
    const v = -0.30 + (j + 0.5)*0.095, yy = v*s;
    const half = 0.55*Math.pow(Math.max(0, Math.sin(Math.PI*(v + 0.45)/1.03)), 0.75)*s;
    const n = Math.max(1, Math.round(half*2/(0.13*s)));
    for (let i=0;i<n;i++){
      const u = ((i + 0.5 + (j%2)*0.5)/n)*2 - 1; if (Math.abs(u) > 0.96) continue;
      const xx = u*half*0.93, f = Math.sqrt(1 - u*u);
      x.fillStyle = 'rgba(90,4,18,.5)'; x.beginPath(); x.ellipse(xx, yy, 0.038*s*f + 0.008*s, 0.046*s, u*0.5, 0, 6.2832); x.fill();
      x.fillStyle = '#F3D774'; x.beginPath(); x.ellipse(xx + 0.004*s, yy - 0.008*s, 0.017*s*f + 0.005*s, 0.026*s, u*0.5, 0, 6.2832); x.fill();
      x.fillStyle = 'rgba(255,255,255,.55)'; x.fillRect(xx - 0.004*s, yy - 0.022*s, 0.006*s, 0.006*s);
    }
  }
  const hl = x.createRadialGradient(-0.24*s, -0.10*s, 0, -0.24*s, -0.10*s, 0.2*s);
  hl.addColorStop(0, 'rgba(255,255,255,.38)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = hl; x.fillRect(-0.5*s, -0.4*s, 0.6*s, 0.6*s);
  x.restore();
  /* sépalos */
  const A = [Math.PI*0.93, Math.PI*1.1, Math.PI*1.3, Math.PI*1.5, Math.PI*1.7, Math.PI*1.9, Math.PI*0.07];
  A.forEach((a, k) => {
    const L = (k === 3 ? 0.2 : 0.34)*s, w = 0.085*s, ox = 0, oy = -0.37*s;
    const tx = ox + Math.cos(a)*L, ty = oy + Math.sin(a)*L*0.55 + (Math.abs(Math.cos(a)) > 0.7 ? 0.05*s : 0);
    const nx = -Math.sin(a)*w, ny = Math.cos(a)*w*0.55;
    const lg = x.createLinearGradient(ox, oy, tx, ty); lg.addColorStop(0, '#2F6B22'); lg.addColorStop(1, '#6DB33F');
    x.fillStyle = lg; x.beginPath(); x.moveTo(ox, oy);
    x.quadraticCurveTo((ox + tx)/2 + nx, (oy + ty)/2 + ny, tx, ty);
    x.quadraticCurveTo((ox + tx)/2 - nx, (oy + ty)/2 - ny, ox, oy); x.fill();
    x.strokeStyle = 'rgba(20,60,15,.5)'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(ox, oy); x.lineTo(tx*0.8, ty*0.8 + oy*0.2); x.stroke();
  });
  x.strokeStyle = '#4E8A2E'; x.lineWidth = Math.max(1.5, 0.055*s); x.lineCap = 'round';
  x.beginPath(); x.moveTo(0, -0.38*s); x.quadraticCurveTo(0.02*s, -0.52*s, 0.09*s, -0.62*s); x.stroke();
  x.restore();
}
/* banano maduro: cáscara con aristas, pedúnculo y punta oscura */
function btcBanano(x, cx, cy, s, rot){
  x.save(); x.translate(cx, cy); x.rotate(rot || 0);
  const p = new Path2D();
  p.moveTo(-0.86*s, -0.10*s);
  p.quadraticCurveTo(-0.1*s, 0.62*s, 0.80*s, -0.12*s);
  p.quadraticCurveTo(0.84*s, -0.22*s, 0.74*s, -0.22*s);
  p.quadraticCurveTo(-0.05*s, 0.24*s, -0.80*s, -0.22*s);
  p.quadraticCurveTo(-0.9*s, -0.2*s, -0.86*s, -0.10*s);
  const g = x.createLinearGradient(0, -0.2*s, 0, 0.45*s);
  g.addColorStop(0, '#FFF0A0'); g.addColorStop(0.35, '#F5D042'); g.addColorStop(0.8, '#D9A922'); g.addColorStop(1, '#A87A12');
  x.fillStyle = g; x.fill(p);
  x.save(); x.clip(p);
  x.strokeStyle = 'rgba(140,100,15,.45)'; x.lineWidth = 1;
  [0.1, 0.22].forEach(k => { x.beginPath(); x.moveTo(-0.84*s, -0.12*s + k*0.2*s); x.quadraticCurveTo(-0.08*s, (0.3 + k)*s, 0.78*s, -0.15*s + k*0.1*s); x.stroke(); });
  const R = btcRng(12);
  for (let i=0;i<14;i++){ x.fillStyle = 'rgba(95,60,15,.45)'; x.beginPath(); x.arc((-0.6 + R()*1.2)*s, (0.02 + R()*0.18)*s, 0.8 + R()*1.8, 0, 6.2832); x.fill(); }
  x.restore();
  x.fillStyle = '#6B5424'; btcRRect(x, 0.74*s, -0.30*s, 0.2*s, 0.09*s, 0.03*s); x.fill();
  x.fillStyle = '#3B2B12'; x.beginPath(); x.ellipse(-0.86*s, -0.15*s, 0.05*s, 0.06*s, 0.4, 0, 6.2832); x.fill();
  x.restore();
}
/* pulpa machacada dentro de un recipiente (ya recortado) */
function btcPulpa(x, x0, x1, yTop, yBot, F, fruta, seed, a){
  x.save(); x.globalAlpha = a === undefined ? 1 : a;
  const g = x.createLinearGradient(0, yTop, 0, yBot);
  if (fruta === 'fresa'){ g.addColorStop(0, '#D2334A'); g.addColorStop(1, '#8E1426'); } else { g.addColorStop(0, '#F3E7B8'); g.addColorStop(1, '#D8C27E'); }
  x.fillStyle = g; x.beginPath(); x.moveTo(x0, yBot);
  for (let i=0;i<=12;i++){ const xx = x0 + (x1 - x0)*i/12; x.lineTo(xx, yTop + Math.sin(i*1.7 + seed)*3); }
  x.lineTo(x1, yBot); x.closePath(); x.fill();
  const R = btcRng(seed);
  for (let i=0;i<70;i++){
    const px = x0 + R()*(x1 - x0), py = yTop + 4 + R()*(yBot - yTop - 4), r = 2 + R()*6;
    x.fillStyle = fruta === 'fresa' ? (R() < 0.5 ? 'rgba(255,120,130,.35)' : 'rgba(90,5,20,.35)') : (R() < 0.5 ? 'rgba(255,255,230,.45)' : 'rgba(160,130,60,.30)');
    x.beginPath(); x.ellipse(px, py, r, r*0.7, R()*3, 0, 6.2832); x.fill();
  }
  for (let i=0;i<46;i++){
    const px = x0 + R()*(x1 - x0), py = yTop + 3 + R()*(yBot - yTop - 3);
    x.fillStyle = fruta === 'fresa' ? '#F0CF63' : '#3A2A14';
    x.beginPath(); x.ellipse(px, py, fruta === 'fresa' ? 1.3 : 0.9, fruta === 'fresa' ? 1.9 : 0.9, R()*3, 0, 6.2832); x.fill();
  }
  if (fruta === 'fresa') for (let i=0;i<4;i++){ x.fillStyle = 'rgba(80,140,50,.7)'; x.beginPath(); x.ellipse(x0 + R()*(x1 - x0), yTop + 6 + R()*16, 5, 2, R()*3, 0, 6.2832); x.fill(); }
  x.restore();
}
/* bolsa con cierre hermético: devuelve la forma para recortar el contenido */
function btcBolsaForma(cx, yb, bw, bh, lado){
  const yt = yb - bh, zw = bw*0.9, l = cx - zw/2, r = cx + zw/2, p = new Path2D();
  const bl = cx - bw/2 - lado, br = cx + bw/2 + lado;
  p.moveTo(l, yt + 15);
  p.bezierCurveTo(l - 2, yt + bh*0.35, bl, yt + bh*0.6, bl + 2, yb - 14);
  p.quadraticCurveTo(bl + 4, yb + 1, bl + 22, yb + 1);
  p.quadraticCurveTo(cx, yb + 7, br - 22, yb + 1);
  p.quadraticCurveTo(br - 4, yb + 1, br - 2, yb - 14);
  p.bezierCurveTo(br, yt + bh*0.6, r + 2, yt + bh*0.35, r, yt + 15);
  p.closePath();
  return { p, yt, l, r, bl, br, yb, cx, bh };
}
function btcBolsaFrente(x, B, osc){
  x.fillStyle = osc ? 'rgba(200,225,255,.06)' : 'rgba(235,245,255,.14)'; x.fill(B.p);
  x.save(); x.clip(B.p);
  /* pliegues del plástico: esquinas bajo el cierre y fuelle del fondo */
  x.lineWidth = 1;
  [[B.l + 6, 1], [B.r - 6, -1]].forEach(([x0, d]) => {
    x.strokeStyle = osc ? 'rgba(220,235,255,.18)' : 'rgba(255,255,255,.85)';
    x.beginPath(); x.moveTo(x0, B.yt + 16); x.quadraticCurveTo(x0 + d*10, B.yt + 34, x0 + d*4, B.yt + 58); x.stroke();
    x.strokeStyle = osc ? 'rgba(0,0,0,.2)' : 'rgba(40,60,90,.10)';
    x.beginPath(); x.moveTo(x0 + d*2, B.yt + 16); x.quadraticCurveTo(x0 + d*12, B.yt + 34, x0 + d*6, B.yt + 58); x.stroke();
  });
  x.strokeStyle = osc ? 'rgba(220,235,255,.16)' : 'rgba(40,60,90,.10)';
  x.beginPath(); x.moveTo(B.bl + 16, B.yb - 10); x.quadraticCurveTo(B.cx, B.yb - 2, B.br - 16, B.yb - 10); x.stroke();
  const s = x.createLinearGradient(B.bl, 0, B.br, 0);
  s.addColorStop(0, osc ? 'rgba(210,230,255,.18)' : 'rgba(255,255,255,.5)'); s.addColorStop(0.1, 'rgba(255,255,255,0)'); s.addColorStop(0.2, osc ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.42)'); s.addColorStop(0.27, 'rgba(255,255,255,0)');
  s.addColorStop(0.86, 'rgba(255,255,255,0)'); s.addColorStop(0.93, osc ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.3)'); s.addColorStop(1, osc ? 'rgba(210,230,255,.18)' : 'rgba(255,255,255,.5)');
  x.fillStyle = s; x.fillRect(B.bl - 10, B.yt, B.br - B.bl + 20, B.bh + 10);
  x.restore();
  x.strokeStyle = osc ? 'rgba(210,225,245,.5)' : 'rgba(40,60,90,.30)'; x.lineWidth = 1.2; x.stroke(B.p);
  /* cierre de presión */
  const zg = x.createLinearGradient(0, B.yt, 0, B.yt + 15);
  zg.addColorStop(0, osc ? 'rgba(220,232,248,.55)' : 'rgba(255,255,255,.95)'); zg.addColorStop(1, osc ? 'rgba(180,200,225,.35)' : 'rgba(220,230,242,.9)');
  x.fillStyle = zg; btcRRect(x, B.l - 2, B.yt, B.r - B.l + 4, 15, 3); x.fill();
  x.strokeStyle = osc ? 'rgba(210,225,245,.5)' : 'rgba(40,60,90,.3)'; x.lineWidth = 1; x.stroke();
  x.fillStyle = '#3F7FD8'; x.fillRect(B.l + 2, B.yt + 5, B.r - B.l - 4, 2.2);
  x.fillStyle = '#D94A4A'; x.fillRect(B.l + 2, B.yt + 8.5, B.r - B.l - 4, 1.6);
}
/* vaso de vidrio (ligeramente cónico) */
function btcVasoGeo(cx, yb, gw, gh){
  const yt = yb - gh, tw = gw/2, bw = gw*0.44;
  const hw = y => bw + (tw - bw)*(yb - y)/gh;
  const inner = new Path2D(), th = 3.5, base = 11;
  inner.moveTo(cx - hw(yt) + th, yt);
  inner.lineTo(cx - hw(yb - base) + th, yb - base - 6);
  inner.quadraticCurveTo(cx - hw(yb - base) + th, yb - base, cx - hw(yb - base) + th + 8, yb - base);
  inner.lineTo(cx + hw(yb - base) - th - 8, yb - base);
  inner.quadraticCurveTo(cx + hw(yb - base) - th, yb - base, cx + hw(yb - base) - th, yb - base - 6);
  inner.lineTo(cx + hw(yt) - th, yt); inner.closePath();
  return { cx, yt, yb, gh, hw, inner, th, fondo: yb - base, L:y => cx - hw(y) + th, R:y => cx + hw(y) - th };
}
function btcCapa(x, V, yTop, yBot, fill, top){
  x.fillStyle = fill; x.fillRect(V.cx - 200, yTop, 400, yBot - yTop);
  if (top){ const rx = V.R(yTop) - V.cx; x.fillStyle = top; x.beginPath(); x.ellipse(V.cx, yTop, rx, Math.max(2, rx*0.09), 0, 0, 6.2832); x.fill(); }
}
function btcVasoAtras(x, V, osc){
  const rx = V.hw(V.yt);
  x.fillStyle = osc ? 'rgba(200,220,255,.05)' : 'rgba(255,255,255,.28)'; x.fill(V.inner);
  x.strokeStyle = osc ? 'rgba(200,220,255,.25)' : 'rgba(60,85,120,.22)'; x.lineWidth = 1.2;
  x.beginPath(); x.ellipse(V.cx, V.yt, rx, rx*0.09, 0, Math.PI, 2*Math.PI); x.stroke();
}
function btcVasoFrente(x, V, osc){
  const { cx, yt, yb, hw } = V, rx = hw(yt);
  const edge = osc ? 'rgba(210,228,255,.62)' : 'rgba(45,70,105,.50)';
  x.strokeStyle = edge; x.lineWidth = 2;
  x.beginPath(); x.moveTo(cx - rx, yt); x.lineTo(cx - hw(yb) , yb - 4); x.quadraticCurveTo(cx - hw(yb), yb, cx - hw(yb) + 6, yb);
  x.lineTo(cx + hw(yb) - 6, yb); x.quadraticCurveTo(cx + hw(yb), yb, cx + hw(yb), yb - 4); x.lineTo(cx + rx, yt); x.stroke();
  /* fondo grueso */
  const fb = x.createLinearGradient(0, V.fondo, 0, yb);
  fb.addColorStop(0, osc ? 'rgba(200,225,255,.20)' : 'rgba(210,230,245,.55)'); fb.addColorStop(1, osc ? 'rgba(200,225,255,.35)' : 'rgba(170,200,225,.7)');
  x.fillStyle = fb; x.beginPath(); x.moveTo(cx - hw(V.fondo) + 2, V.fondo); x.lineTo(cx + hw(V.fondo) - 2, V.fondo); x.lineTo(cx + hw(yb) - 3, yb - 1); x.lineTo(cx - hw(yb) + 3, yb - 1); x.closePath(); x.fill();
  /* borde superior */
  x.lineWidth = 2.2; x.beginPath(); x.ellipse(cx, yt, rx, rx*0.09, 0, 0, Math.PI); x.stroke();
  x.strokeStyle = osc ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.9)'; x.lineWidth = 1; x.beginPath(); x.ellipse(cx, yt + 1.5, rx - 2, rx*0.08, 0, 0.2, Math.PI - 0.2); x.stroke();
  /* reflejos verticales */
  const s = x.createLinearGradient(cx - rx, 0, cx + rx, 0);
  s.addColorStop(0.05, 'rgba(255,255,255,0)'); s.addColorStop(0.12, osc ? 'rgba(255,255,255,.30)' : 'rgba(255,255,255,.75)'); s.addColorStop(0.2, 'rgba(255,255,255,0)');
  s.addColorStop(0.83, 'rgba(255,255,255,0)'); s.addColorStop(0.88, osc ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.45)'); s.addColorStop(0.92, 'rgba(255,255,255,0)');
  x.fillStyle = s; x.fill(V.inner);
  /* graduación */
  x.strokeStyle = osc ? 'rgba(220,235,255,.45)' : 'rgba(40,65,100,.35)'; x.lineWidth = 1; x.fillStyle = x.strokeStyle; x.font = '8px "IBM Plex Mono",monospace'; x.textAlign = 'right';
  for (let k=1;k<=4;k++){ const y = V.fondo - k*(V.fondo - yt - 18)/4.4, xr = cx + hw(y) - 6; x.beginPath(); x.moveTo(xr - (k%2 ? 12 : 7), y); x.lineTo(xr, y); x.stroke(); if (k%2 === 0) x.fillText(String(k*50), xr - 14, y + 3); }
}
/* frascos y utensilios */
function btcFrasco(x, cx, yb, w, h, cuerpo, tapa, liq, nivel, rot, osc){
  x.save(); x.translate(cx, yb); x.rotate(rot || 0);
  const g = x.createLinearGradient(-w/2, 0, w/2, 0);
  g.addColorStop(0, cuerpo[0]); g.addColorStop(0.35, cuerpo[1]); g.addColorStop(1, cuerpo[2]);
  x.fillStyle = g; btcRRect(x, -w/2, -h, w, h, w*0.22); x.fill();
  if (liq){ x.save(); btcRRect(x, -w/2 + 3, -h*nivel, w - 6, h*nivel - 3, w*0.18); x.clip(); x.fillStyle = liq; x.fillRect(-w/2, -h, w, h); x.restore(); }
  x.fillStyle = 'rgba(255,255,255,.4)'; x.fillRect(-w/2 + w*0.16, -h + 6, w*0.1, h - 12);
  x.fillStyle = tapa; btcRRect(x, -w*0.2, -h - w*0.34, w*0.4, w*0.36, 3); x.fill();
  x.fillStyle = tapa; x.beginPath(); x.moveTo(-w*0.07, -h - w*0.34); x.lineTo(w*0.07, -h - w*0.34); x.lineTo(w*0.03, -h - w*0.62); x.lineTo(-w*0.03, -h - w*0.62); x.fill();
  x.fillStyle = osc ? 'rgba(255,255,255,.75)' : 'rgba(255,255,255,.85)'; btcRRect(x, -w/2 + 4, -h*0.62, w - 8, h*0.26, 3); x.fill();
  x.restore();
}
function btcCuchara(x, cx, cy, rot, sal){
  x.save(); x.translate(cx, cy); x.rotate(rot);
  const g = x.createLinearGradient(0, -8, 0, 8); g.addColorStop(0, '#E9EDF2'); g.addColorStop(0.5, '#AEB7C2'); g.addColorStop(1, '#6F7985');
  x.fillStyle = g; btcRRect(x, 10, -2.2, 56, 4.4, 2.2); x.fill();
  x.beginPath(); x.ellipse(0, 0, 14, 8.5, 0, 0, 6.2832); x.fill();
  if (sal){ x.fillStyle = '#FFFFFF'; x.beginPath(); x.ellipse(0, -2, 11, 5, 0, Math.PI, 2*Math.PI); x.fill(); x.fillStyle = 'rgba(190,200,210,.8)'; for (let i=0;i<8;i++) x.fillRect(-8 + i*2.2, -4 + (i%3), 1.5, 1.5); }
  x.restore();
}
function btcPalillo(x, x0, y0, x1, y1, osc){
  const g = x.createLinearGradient(x0, y0, x0 + 4, y0 + 4);
  x.strokeStyle = '#C9A06A'; x.lineWidth = 4; x.lineCap = 'round'; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke();
  x.strokeStyle = 'rgba(255,240,210,.55)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(x0 - 1, y0); x.lineTo(x1 - 1, y1); x.stroke();
  x.strokeStyle = 'rgba(110,75,35,.45)'; x.lineWidth = 1; x.beginPath(); x.moveTo(x0 + 1.5, y0); x.lineTo(x1 + 1.5, y1); x.stroke();
}
/* ADN que precipita: nube blanca y fibrosa en la interfase, hebras que
   suben al alcohol y (si se recoge con calma) se enrollan en el palillo */
function btcHebras(x, V, yI, yTopAl, cant, prog, t, recoger, eje){
  const R = btcRng(77), L = V.L(yI) + 8, Rr = V.R(yI) - 8, k = btcEase(prog*1.25)*cant;
  if (k <= 0.01) return;
  /* velo gelatinoso en la frontera */
  for (let i=0;i<Math.round(6 + 14*k);i++){
    const px = L + R()*(Rr - L), py = yI - 3 - R()*10*k, rr = 6 + R()*14*k;
    const g = x.createRadialGradient(px, py, 0, px, py, rr);
    g.addColorStop(0, `rgba(255,255,250,${0.32*k + 0.06})`); g.addColorStop(1, 'rgba(255,255,250,0)');
    x.fillStyle = g; x.beginPath(); x.arc(px, py, rr, 0, 6.2832); x.fill();
  }
  /* hebras */
  x.lineCap = 'round';
  const n = Math.round(4 + cant*26);
  for (let i=0;i<n;i++){
    const sx = L + R()*(Rr - L), va = eje && R() < 0.55;
    const alto = (10 + R()*(yI - yTopAl - 16)*0.8)*btcEase(prog*1.4 - R()*0.35)*Math.max(0.3, cant);
    const w = 0.7 + R()*1.4, c1 = (R() - 0.5)*22, c2 = (R() - 0.5)*22, fase = R()*6;
    if (alto < 3) continue;
    const ex = va ? eje.x + (R() - 0.5)*6 : sx + (R() - 0.5)*18, ey = va ? Math.max(eje.y - 8, yI - alto - 10) : Math.max(yTopAl + 6, yI - alto);
    x.beginPath(); x.moveTo(sx, yI + 1);
    x.bezierCurveTo(sx + c1, yI - (yI - ey)*0.35, ex + c2 + Math.sin(t*1.5 + fase)*2, yI - (yI - ey)*0.72, ex, ey);
    x.strokeStyle = 'rgba(255,255,250,.22)'; x.lineWidth = w + 3; x.stroke();
    x.strokeStyle = 'rgba(255,255,250,.85)'; x.lineWidth = w; x.stroke();
  }
  /* burbujas atrapadas en el ADN */
  for (let i=0;i<Math.round(12*k);i++){ const px = L + R()*(Rr - L), py = yI - 4 - R()*(yI - yTopAl)*0.6*k;
    x.strokeStyle = 'rgba(255,255,255,.8)'; x.lineWidth = 0.8; x.beginPath(); x.arc(px, py, 1 + R()*1.8, 0, 6.2832); x.stroke(); }
  if (eje){
    /* ovillo enrollado en la punta del palillo */
    const m = btcEase(prog*1.3 - 0.3)*cant, cx = eje.x, cy = eje.y;
    if (m > 0.02){
      const rr = 8 + 12*m;
      const g = x.createRadialGradient(cx - 3, cy - 4, 1, cx, cy, rr + 4);
      g.addColorStop(0, 'rgba(255,255,252,.85)'); g.addColorStop(0.6, 'rgba(250,250,245,.55)'); g.addColorStop(1, 'rgba(250,250,245,0)');
      x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy, rr, rr*1.25, -0.35, 0, 6.2832); x.fill();
      x.lineWidth = 1.1;
      for (let i=0;i<Math.round(4 + 10*m);i++){ const yy = cy - rr + (i + 0.5)*(2*rr/(4 + 10*m))*1.1, ww = Math.sqrt(Math.max(0, 1 - Math.pow((yy - cy)/(rr*1.3), 2)))*rr;
        x.strokeStyle = `rgba(255,255,250,${0.5 + 0.35*((i + Math.floor(t*3))%2)})`;
        x.beginPath(); x.ellipse(cx, yy, Math.max(1.5, ww), 2.4, -0.35, 0.2, Math.PI*1.8); x.stroke(); }
    }
  }
}
/* escena completa de la extracción (misma firma de antes) */
function btcVaso(cv, r, paso, fase){
  const { x, W, H } = btcLienzo(cv, 320);
  const F = BTC_FRUTAS[r.fruta], fresa = r.fruta === 'fresa', osc = btcOscuro();
  const f = fase === undefined ? 1 : clamp(fase, 0, 1), e = btcEase(f);
  const yB = H - 46, cx = W/2, lado = Math.max(40, Math.min(64, W*0.12));
  btcMesa(x, W, H, yB, osc);
  const liqCol = fresa ? 'rgba(232,120,140,.78)' : 'rgba(240,226,178,.82)';
  const liqTop = fresa ? 'rgba(248,170,184,.9)' : 'rgba(250,242,210,.95)';
  const alcCol = osc ? 'rgba(170,205,250,.24)' : 'rgba(190,215,248,.5)';
  if (paso <= 0){
    /* tabla de picar con la fruta entera */
    const tw = Math.min(270, W*0.66), ty = yB - 16;
    btcSombra(x, cx, yB + 6, tw*0.55, 10, 0.3);
    const wg = x.createLinearGradient(0, ty, 0, yB + 8); wg.addColorStop(0, '#E9C996'); wg.addColorStop(1, '#C9975A');
    x.fillStyle = wg; btcRRect(x, cx - tw/2, ty, tw, 18, 7); x.fill();
    x.fillStyle = '#A8773F'; btcRRect(x, cx - tw/2, ty + 12, tw, 8, 5); x.fill();
    x.strokeStyle = 'rgba(140,95,45,.3)'; x.lineWidth = 1;
    for (let k=0;k<4;k++){ x.beginPath(); x.moveTo(cx - tw/2 + 10, ty + 3 + k*3); x.bezierCurveTo(cx - 30, ty + 1 + k*3, cx + 40, ty + 6 + k*3, cx + tw/2 - 10, ty + 3 + k*2.6); x.stroke(); }
    x.fillStyle = 'rgba(0,0,0,.18)'; x.beginPath(); x.arc(cx + tw/2 - 14, ty + 7, 4, 0, 6.2832); x.fill();
    if (fresa){
      const s = Math.min(66, W*0.15);
      [[-0.95, -0.36, 0.86, -0.35], [0.12, -0.62, 1, 0.15], [1.05, -0.3, 0.8, 0.55]].forEach(([dx, dy, k, rot]) => {
        btcSombra(x, cx + dx*s, ty + 4, s*0.42*k, 5, 0.35); btcFresa(x, cx + dx*s, ty + dy*s*0.9 - 4, s*k, rot); });
    } else {
      const s = Math.min(80, W*0.19);
      btcSombra(x, cx, ty + 4, s*0.8, 6, 0.35); btcBanano(x, cx, ty - s*0.2, s, -0.05);
    }
  } else if (paso <= 3){
    /* bolsa con cierre hermético */
    const bw = Math.min(172, W*0.42), bh = 178, bx = cx - (W > 380 ? 18 : 10), wob = Math.sin(f*Math.PI*6)*3*(1 - f)*(paso === 1 ? 1 : 0.4);
    const B = btcBolsaForma(bx + wob, yB + 2, bw, bh, paso === 1 ? 2 + 4*e : 6);
    btcSombra(x, bx, yB + 4, bw*0.55, 7, 0.3);
    const yPul = yB - (paso === 1 ? 26 + 44*e : 70), yLiq = paso >= 2 ? yB - 70 - 46*(paso === 2 ? e : 1) : yB;
    x.save(); x.clip(B.p);
    if (paso >= 2){ x.fillStyle = r.det || paso === 2 ? liqCol : liqCol; x.fillRect(B.l - 20, yLiq, bw + 40, yB - yLiq + 4);
      x.fillStyle = liqTop; x.fillRect(B.l - 20, yLiq, bw + 40, 2); }
    btcPulpa(x, B.l - 10, B.r + 10, yPul, yB + 4, F, r.fruta, 31, paso === 1 ? 0.35 + 0.65*e : 0.85);
    if (paso === 1 && f < 1){
      const s = 40;
      [[-0.45, 0.1], [0.05, -0.2], [0.42, 0.15]].forEach(([dx, dy], i) => {
        x.save(); x.globalAlpha = 1 - e;
        if (fresa) btcFresa(x, bx + dx*bw, yB - 44 + dy*30, s, i - 1, e); else btcBanano(x, bx + dx*bw*0.6, yB - 44 + dy*20, s*0.8, 0.2*(i - 1));
        x.restore(); });
    }
    if (paso >= 2 && r.det){
      /* espuma del detergente */
      const R = btcRng(44), nb = Math.round((paso === 2 ? e : 0.85)*44);
      for (let i=0;i<nb;i++){ const px = B.l + 6 + R()*(bw - 12), py = yLiq - 2 - R()*14*(1 - Math.abs(px - bx)/bw), rr = 2.5 + R()*6;
        const gb = x.createRadialGradient(px - rr*0.3, py - rr*0.3, 0, px, py, rr);
        gb.addColorStop(0, 'rgba(255,255,255,.95)'); gb.addColorStop(0.7, 'rgba(255,255,255,.35)'); gb.addColorStop(1, 'rgba(200,220,240,.7)');
        x.fillStyle = gb; x.beginPath(); x.arc(px, py, rr, 0, 6.2832); x.fill(); }
    }
    if (paso === 3 && r.sal){
      const R = btcRng(55);
      for (let i=0;i<26;i++){ const fall = btcEase(f*1.6 - R()*0.6), px = bx - 10 + R()*44, py = B.yt + 10 + fall*(yLiq - B.yt - 4);
        if (fall >= 1){ x.globalAlpha = Math.max(0, 1 - (f - 0.7)*3); } x.fillStyle = '#FFFFFF'; x.fillRect(px, py, 2.4, 2.4); x.globalAlpha = 1; }
    }
    x.restore();
    btcBolsaFrente(x, B, osc);
    /* utensilios a un lado */
    const sx = W - lado - 4;
    if (paso === 2){
      const verter = f < 0.62 && !btcQuieto();
      const col = r.det ? ['#2F9E8F','#57C3B2','#1E6E63'] : ['rgba(200,225,250,.55)','rgba(230,242,255,.7)','rgba(160,190,220,.6)'];
      const liq = r.det ? null : 'rgba(170,205,240,.55)';
      if (verter){ const px = bx + bw*0.2, py = B.yt - 26;
        btcFrasco(x, px + 30, py, 30, 58, col, r.det ? '#E9ECEF' : '#9FB4C8', liq, 0.8, -2.3, osc);
        x.strokeStyle = r.det ? 'rgba(120,220,200,.85)' : 'rgba(170,205,240,.85)'; x.lineWidth = 3; x.beginPath(); x.moveTo(px + 6, py + 4); x.quadraticCurveTo(px + 4, py + 40, px + 2, yLiq); x.stroke(); }
      else { btcSombra(x, sx, yB + 3, 22, 4, 0.3); btcFrasco(x, sx, yB + 2, 32, 62, col, r.det ? '#E9ECEF' : '#9FB4C8', liq, 0.7, 0, osc); }
    } else if (paso === 3){
      btcSombra(x, sx, yB + 3, 26, 5, 0.3);
      const dg = x.createLinearGradient(0, yB - 12, 0, yB + 2); dg.addColorStop(0, osc ? '#DDE4EC' : '#FFFFFF'); dg.addColorStop(1, '#AEB9C6');
      x.fillStyle = dg; x.beginPath(); x.ellipse(sx, yB - 6, 24, 8, 0, 0, Math.PI); x.lineTo(sx - 24, yB - 8); x.ellipse(sx, yB - 8, 24, 5, 0, Math.PI, 0); x.fill();
      x.fillStyle = '#FFFFFF'; x.beginPath(); x.ellipse(sx, yB - 9, 16, r.sal ? 3 : 5, 0, Math.PI, 2*Math.PI); x.fill();
      if (r.sal && f < 0.6 && !btcQuieto()) btcCuchara(x, bx + 16, B.yt - 8, 0.5, true);
      else btcCuchara(x, sx - 6, yB - 16, -0.25, !r.sal);
    } else if (paso === 1){
      /* la tabla vacía queda a un lado */
      btcSombra(x, sx, yB + 3, lado*0.9, 5, 0.25);
      x.fillStyle = '#C9975A'; btcRRect(x, sx - lado*0.9, yB - 10, lado*1.8, 12, 5); x.fill();
      x.fillStyle = fresa ? 'rgba(200,30,50,.35)' : 'rgba(230,200,120,.5)'; x.beginPath(); x.ellipse(sx - 6, yB - 8, 10, 2.5, 0, 0, 6.2832); x.fill();
    }
  } else {
    /* vaso con filtrado, alcohol y ADN */
    const gw = Math.min(150, W*0.36), gh = 196, vx = paso === 4 ? cx + (W > 380 ? 22 : 14) : cx;
    const V = btcVasoGeo(vx, yB + 2, gw, gh);
    const nivel = V.fondo - 88, espAl = 62;
    const lleno = paso === 4 ? e : 1;
    const yF = V.fondo - (V.fondo - nivel)*lleno;
    const yA = paso >= 5 ? yF - espAl*(paso === 5 ? btcEase(f*1.25) : 1) : yF;
    btcSombra(x, vx, yB + 4, gw*0.62, 7, 0.32);
    btcVasoAtras(x, V, osc);
    if (paso >= 6 && r.recoger !== 'fuerte' && btcRendimiento(r) > 0.2)
      btcPalillo(x, V.cx + gw*0.5 + 14, V.yt - 46, V.cx + 6, yA + 26 + (yF - yA)*0.35, osc);
    x.save(); x.clip(V.inner);
    const agit = paso >= 6 && r.recoger === 'fuerte';
    if (lleno > 0.01){
      const lg = x.createLinearGradient(0, yF, 0, V.fondo);
      lg.addColorStop(0, fresa ? 'rgba(236,128,146,.82)' : 'rgba(243,230,186,.86)'); lg.addColorStop(1, fresa ? 'rgba(196,60,86,.88)' : 'rgba(220,196,128,.9)');
      btcCapa(x, V, yF, V.fondo + 2, lg, yA === yF ? liqTop : null);
    }
    if (paso >= 5 && yA < yF - 0.5){
      btcCapa(x, V, yA, yF, alcCol, osc ? 'rgba(210,230,255,.30)' : 'rgba(235,245,255,.75)');
      /* interfase: leve turbidez */
      const ig = x.createLinearGradient(0, yF - 6, 0, yF + 4); ig.addColorStop(0, 'rgba(255,255,255,0)'); ig.addColorStop(0.6, 'rgba(255,255,255,.35)'); ig.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = ig; x.fillRect(V.cx - 100, yF - 6, 200, 10);
    }
    if (agit){
      const mg = x.createLinearGradient(0, yA, 0, yF + 20);
      mg.addColorStop(0, fresa ? 'rgba(236,150,165,.25)' : 'rgba(240,228,190,.3)'); mg.addColorStop(1, fresa ? 'rgba(236,128,146,.55)' : 'rgba(243,230,186,.6)');
      x.fillStyle = mg; x.fillRect(V.cx - 100, yA, 200, yF - yA + 20);
    }
    if (paso >= 6){
      const y = btcRendimiento(r), prog = f, t = f*4;
      if (agit){
        const R = btcRng(91), n = Math.round(y*90*btcEase(f*1.4));
        for (let i=0;i<n;i++){ const a = R()*6.28 + f*3*(R() - 0.5), rr = R()*(V.R(yF) - V.cx - 6);
          const px = V.cx + Math.cos(a)*rr, py = yA + 8 + R()*(yF - yA + 16);
          x.fillStyle = 'rgba(255,255,250,.85)'; x.beginPath(); x.ellipse(px, py, 1 + R()*2, 0.8 + R()*1.2, R()*3, 0, 6.2832); x.fill(); }
      } else {
        const eje = y > 0.2 ? { x:V.cx + 9, y:yA + 16 + (yF - yA)*0.35 } : null;
        btcHebras(x, V, yF, yA, y, prog, t, r.recoger, eje);
        if (eje){
          /* ovillo de ADN enrollado en el palillo */
          const k = btcEase(f*1.2 - 0.25)*y;
          for (let i=0;i<Math.round(k*9);i++){ const yy = eje.y - 16 + i*3.2, rw = 5 + k*6 - Math.abs(i - 4)*0.6;
            x.strokeStyle = `rgba(255,255,250,${0.55 + 0.4*((i + Math.round(f*12))%2)})`; x.lineWidth = 1.6;
            x.beginPath(); x.ellipse(eje.x - 1, yy, Math.max(2, rw), 2.2, -0.35, 0, 6.2832); x.stroke(); }
          const og = x.createRadialGradient(eje.x, eje.y - 4, 0, eje.x, eje.y - 4, 10 + k*10);
          og.addColorStop(0, `rgba(255,255,250,${0.35*k + 0.1})`); og.addColorStop(1, 'rgba(255,255,250,0)');
          x.fillStyle = og; x.beginPath(); x.arc(eje.x, eje.y - 4, 10 + k*10, 0, 6.2832); x.fill();
        }
      }
    }
    x.restore();
    btcVasoFrente(x, V, osc);
    if (paso === 4){
      /* embudo con filtro de tela que retiene la pulpa */
      const fw = gw*0.95, fy = V.yt - 64, ft = V.yt + 16;
      const fg = x.createLinearGradient(vx - fw/2, 0, vx + fw/2, 0);
      fg.addColorStop(0, osc ? 'rgba(200,220,245,.35)' : 'rgba(220,235,248,.75)'); fg.addColorStop(0.3, osc ? 'rgba(230,240,255,.18)' : 'rgba(255,255,255,.5)'); fg.addColorStop(1, osc ? 'rgba(170,195,225,.35)' : 'rgba(190,210,230,.8)');
      const cono = new Path2D(); cono.moveTo(vx - fw/2, fy); cono.lineTo(vx - 6, ft - 26); cono.lineTo(vx - 4, ft + 12); cono.lineTo(vx + 4, ft + 12); cono.lineTo(vx + 6, ft - 26); cono.lineTo(vx + fw/2, fy); cono.closePath();
      x.fillStyle = fg; x.fill(cono);
      /* tela del filtro y pulpa retenida */
      const tela = new Path2D(); tela.moveTo(vx - fw/2 + 6, fy - 6); tela.lineTo(vx, ft - 30); tela.lineTo(vx + fw/2 - 6, fy - 6); tela.quadraticCurveTo(vx, fy + 6, vx - fw/2 + 6, fy - 6);
      x.fillStyle = osc ? '#D8DCE2' : '#F7F5EF'; x.fill(tela);
      x.save(); x.clip(tela); x.strokeStyle = 'rgba(120,110,90,.18)'; x.lineWidth = 0.7;
      for (let k=-12;k<12;k++){ x.beginPath(); x.moveTo(vx + k*7, fy - 10); x.lineTo(vx + k*7 + 30, ft); x.stroke(); x.beginPath(); x.moveTo(vx + k*7, fy - 10); x.lineTo(vx + k*7 - 30, ft); x.stroke(); }
      const pr = btcRng(8), yRes = fy + 4 + 22*e;
      btcPulpa(x, vx - fw/2, vx + fw/2, fy - 4 + 8*e, ft, F, r.fruta, 17, 0.95);
      x.restore();
      x.strokeStyle = osc ? 'rgba(210,228,255,.6)' : 'rgba(45,70,105,.45)'; x.lineWidth = 1.6; x.stroke(cono);
      x.beginPath(); x.ellipse(vx, fy, fw/2, 6, 0, 0, 6.2832); x.stroke();
      /* gotas del filtrado */
      const tip = ft + 12;
      for (let k=0;k<2;k++){ const u = f >= 1 ? (k ? 0.25 : 0.7) : ((f*5 + k*0.5) % 1), gy = tip + u*(yF - tip - 4);
        if (gy > yF - 3) continue; x.fillStyle = liqCol; x.beginPath(); x.moveTo(vx, gy - 5); x.quadraticCurveTo(vx + 3.2, gy + 1, vx, gy + 3); x.quadraticCurveTo(vx - 3.2, gy + 1, vx, gy - 5); x.fill(); }
      /* bolsa vacía a un lado */
      const bxx = Math.max(lado*0.8, vx - gw*0.5 - lado*1.2);
      btcSombra(x, bxx, yB + 3, lado*0.8, 4, 0.22);
      const B = btcBolsaForma(bxx, yB + 1, lado*1.4, 40, -4);
      x.save(); x.clip(B.p); btcPulpa(x, B.l, B.r, yB - 8, yB + 2, F, r.fruta, 5, 0.6); x.restore();
      btcBolsaFrente(x, B, osc);
    }
    if (paso >= 5){
      const frio = r.alc === 'frio', sx = W - lado - 2;
      const verter = paso === 5 && f < 0.8 && !btcQuieto();
      const col = ['rgba(215,232,250,.55)','rgba(240,248,255,.8)','rgba(170,195,225,.65)'];
      if (verter){
        const px = V.R(V.yt) - 6, py = V.yt - 34;
        btcFrasco(x, px + 24, py, 34, 72, col, '#2E6BD8', 'rgba(215,235,255,.55)', 0.7, -2.0, osc);
        x.strokeStyle = osc ? 'rgba(210,230,255,.6)' : 'rgba(170,200,235,.9)'; x.lineWidth = 2.4;
        x.beginPath(); x.moveTo(px - 2, py + 8); x.quadraticCurveTo(px - 4, V.yt + 10, V.R(V.yt + 20) - 2, V.yt + 24); x.lineTo(V.R(yA) - 2, yA); x.stroke();
      } else {
        if (frio){
          /* baño de hielo */
          x.fillStyle = osc ? 'rgba(180,210,240,.22)' : 'rgba(210,230,248,.9)'; btcRRect(x, sx - 30, yB - 22, 60, 24, 7); x.fill();
          x.strokeStyle = osc ? 'rgba(200,225,250,.4)' : 'rgba(90,130,170,.4)'; x.lineWidth = 1; x.stroke();
        }
        btcSombra(x, sx, yB + 3, 24, 4, 0.3);
        btcFrasco(x, sx, yB - (frio ? 6 : -2), 34, 74, col, '#2E6BD8', 'rgba(215,235,255,.55)', paso >= 6 ? 0.28 : 0.3, 0, osc);
        if (frio){
          const R = btcRng(3);
          for (let i=0;i<5;i++){ const ix = sx - 26 + i*12, iy = yB - 22 + (i%2)*3; x.fillStyle = 'rgba(235,248,255,.9)'; btcRRect(x, ix, iy, 11, 10, 2.5); x.fill(); x.strokeStyle = 'rgba(120,170,210,.6)'; x.stroke(); }
          x.fillStyle = 'rgba(255,255,255,.75)'; for (let i=0;i<14;i++) x.fillRect(sx - 14 + R()*28, yB - 70 + R()*50, 1.4, 1.4);
        }
      }
      if (frio && !verter){
        /* condensación en el vaso por el alcohol helado */
        const R = btcRng(29);
        for (let i=0;i<22;i++){ const yy = yA + R()*(yF - yA), side = R() < 0.5, xx = side ? V.L(yy) - 2 + R()*8 : V.R(yy) - 6 + R()*8;
          x.fillStyle = osc ? 'rgba(220,235,255,.45)' : 'rgba(255,255,255,.85)'; x.beginPath(); x.arc(xx, yy, 0.8 + R()*1.6, 0, 6.2832); x.fill(); }
      }
    }
  }
  const leyenda = paso <= 0 ? 'Fruta entera' : paso === 1 ? 'Pulpa machacada' : paso === 2 ? (r.det ? 'Pulpa + detergente (espuma)' : 'Pulpa + agua') : paso === 3 ? (r.sal ? 'Con sal disuelta' : 'Sin sal') : paso === 4 ? 'Filtrado' : paso === 5 ? 'Alcohol encima del filtrado' : btcVeredicto(r);
  btcRotulo(x, W, H, leyenda, osc);
  cv.setAttribute('role','img'); cv.setAttribute('aria-label','Vaso de la extracción. Estado: '+leyenda+'.');
}

/* =====================================================================
   2 · PCR — modelo de un ciclo
   ===================================================================== */
const BTC_NMAX = 3e9;        /* tope por agotamiento de cebadores y nucleótidos */
function btcPcrFactores(st){
  const d = clamp((st.Td - 85)/9, 0, 1);                          /* ¿se separan las hebras? */
  const a = st.Ta <= 60 ? 1 : clamp(1 - (st.Ta - 60)/8, 0, 1);    /* ¿se pegan los cebadores? */
  const f = clamp((50 - st.Ta)/12, 0, 0.6);                        /* pegado inespecífico */
  const e = clamp(1 - Math.max(0, Math.abs(st.Te - 72) - 3)/10, 0.1, 1); /* velocidad de la polimerasa */
  return { d, a, f, e };
}
function btcPcrCiclo(st){
  const F = btcPcrFactores(st);
  /* primero se calienta: aquí se decide si la enzima sobrevive */
  if (st.enz === 'ecoli'){
    if (st.Td >= 80) st.act = 0;
    if (st.fresca){ st.act = 1; st.aperturas++; }
  } else {
    st.act *= st.Td > 97 ? 0.97 : 0.995;
  }
  const N = st.Ns + st.Nn;
  const p = clamp(1 - N/BTC_NMAX, 0, 1);
  const E = F.d * F.a * F.e * st.act * p;
  const nuevas = st.Ns * E;
  st.Ns += nuevas * (1 - F.f);
  st.Nn = st.Nn * (1 + F.d * F.e * st.act * p) + nuevas * F.f;
  st.ciclo++;
  st.ultE = E;
  st.serie.push({ c:st.ciclo, ns:st.Ns, nn:st.Nn });
  return F;
}
function btcPcrDiagnostico(st){
  const F = btcPcrFactores(st);
  const m = [];
  if (F.d < 0.95) m.push({ k:'bad', t:'Desnaturalización baja ('+st.Td+' °C): las dos hebras del ADN siguen unidas por sus puentes de hidrógeno. Sin hebras sueltas no hay molde que copiar.' });
  if (st.enz === 'ecoli' && !st.fresca && st.Td >= 80) m.push({ k:'bad', t:'La ADN polimerasa de E. coli se desnaturaliza al primer calentamiento: pierde su forma y deja de funcionar. En los ciclos siguientes no queda enzima activa.' });
  if (st.enz === 'ecoli' && st.fresca) m.push({ k:'warn', t:'Funciona, pero hay que abrir el tubo y añadir enzima nueva en cada ciclo (llevas '+st.aperturas+'). Así se hacía en 1983: lento, caro y con alto riesgo de contaminar la muestra.' });
  if (F.a < 0.95) m.push({ k:'bad', t:'Alineamiento demasiado caliente ('+st.Ta+' °C): los cebadores no logran quedarse pegados a su secuencia, se sueltan antes de que llegue la polimerasa.' });
  if (F.f > 0.05) m.push({ k:'warn', t:'Alineamiento demasiado frío ('+st.Ta+' °C): los cebadores se pegan también a secuencias parecidas. Aparecen productos inespecíficos que se amplifican junto con el correcto.' });
  if (F.e < 0.95) m.push({ k:'warn', t:'Extensión a '+st.Te+' °C: la Taq trabaja mejor cerca de 72 °C. Más lejos copia más despacio y no alcanza a terminar en cada ciclo.' });
  if (st.Td > 97) m.push({ k:'warn', t:'A '+st.Td+' °C incluso la Taq se desgasta más rápido: pierde un poco de actividad en cada ciclo.' });
  if (!m.length) m.push({ k:'ok', t:'Condiciones correctas: en cada ciclo casi todas las moléculas se duplican. La curva crece como 2ⁿ hasta que se agotan los cebadores y los nucleótidos.' });
  return m;
}
/* termociclador ilustrado (bloque con tubos que brilla según el paso) */
function btcTermociclador(x, X0, Y0, w, h, st, marca, osc){
  const k = marca === undefined || marca === null ? null : marca % 3;
  const T = k === null ? null : [st.Td, st.Ta, st.Te][k];
  const glow = k === 0 ? '216,69,47' : k === 1 ? '46,107,216' : k === 2 ? '224,137,26' : '140,150,165';
  btcSombra(x, X0 + w/2, Y0 + h + 2, w*0.6, 5, 0.3);
  const g = x.createLinearGradient(X0, Y0, X0 + w, Y0 + h);
  g.addColorStop(0, osc ? '#4A5B73' : '#F4F6F9'); g.addColorStop(1, osc ? '#26344A' : '#BCC6D2');
  x.fillStyle = g; btcRRect(x, X0, Y0, w, h, 10); x.fill();
  x.strokeStyle = osc ? 'rgba(255,255,255,.14)' : 'rgba(16,35,58,.18)'; x.lineWidth = 1; x.stroke();
  /* tapa calefactada */
  const lh = h*0.30;
  const lg = x.createLinearGradient(0, Y0, 0, Y0 + lh); lg.addColorStop(0, osc ? '#5C6F8A' : '#FFFFFF'); lg.addColorStop(1, osc ? '#3A4A61' : '#D7DEE6');
  x.fillStyle = lg; btcRRect(x, X0 + 3, Y0 + 3, w - 6, lh, 8); x.fill();
  x.strokeStyle = osc ? 'rgba(0,0,0,.35)' : 'rgba(16,35,58,.18)'; x.beginPath(); x.moveTo(X0 + 6, Y0 + lh + 4); x.lineTo(X0 + w - 6, Y0 + lh + 4); x.stroke();
  for (let i=0;i<6;i++){ x.fillStyle = osc ? 'rgba(0,0,0,.35)' : 'rgba(16,35,58,.16)'; btcRRect(x, X0 + 12 + i*((w - 24)/6), Y0 + 10, (w - 24)/6 - 4, 3, 1.5); x.fill(); }
  /* pantalla */
  const dy = Y0 + lh + 10, dh = 30;
  x.fillStyle = '#0C1F2A'; btcRRect(x, X0 + 8, dy, w - 16, dh, 5); x.fill();
  x.fillStyle = k === null ? '#6FE3C1' : `rgb(${glow})`;
  x.fillStyle = k === 0 ? '#FF9A7A' : k === 1 ? '#8FB8FF' : k === 2 ? '#FFC46B' : '#6FE3C1';
  x.font = '700 15px "IBM Plex Mono",monospace'; x.textAlign = 'center';
  x.fillText(T === null ? 'listo' : T + ' °C', X0 + w/2, dy + 16);
  x.font = '9px "IBM Plex Mono",monospace'; x.fillStyle = 'rgba(180,230,215,.85)';
  x.fillText('ciclo ' + (st.ciclo || 0), X0 + w/2, dy + 26);
  /* ventana con el bloque térmico y los tubos */
  const by = dy + dh + 8, bh = Y0 + h - by - 8;
  x.fillStyle = osc ? '#10192A' : '#2B3646'; btcRRect(x, X0 + 8, by, w - 16, bh, 5); x.fill();
  if (k !== null){ const gg = x.createRadialGradient(X0 + w/2, by + bh, 2, X0 + w/2, by + bh, w*0.6); gg.addColorStop(0, `rgba(${glow},.75)`); gg.addColorStop(1, `rgba(${glow},0)`); x.fillStyle = gg; x.fillRect(X0 + 8, by, w - 16, bh); }
  const nt = 6, tw = (w - 28)/nt;
  for (let i=0;i<nt;i++){
    const tx = X0 + 14 + i*tw + tw/2, ty = by + 6;
    x.fillStyle = 'rgba(245,247,250,.95)'; btcRRect(x, tx - tw*0.36, ty, tw*0.72, 4, 1.5); x.fill();
    x.fillStyle = 'rgba(230,236,244,.8)'; x.beginPath(); x.moveTo(tx - tw*0.3, ty + 4); x.lineTo(tx + tw*0.3, ty + 4); x.lineTo(tx + tw*0.1, ty + bh - 10); x.lineTo(tx - tw*0.1, ty + bh - 10); x.closePath(); x.fill();
    x.fillStyle = 'rgba(232,120,160,.75)'; x.beginPath(); x.moveTo(tx - tw*0.2, ty + bh*0.45); x.lineTo(tx + tw*0.2, ty + bh*0.45); x.lineTo(tx + tw*0.1, ty + bh - 10); x.lineTo(tx - tw*0.1, ty + bh - 10); x.closePath(); x.fill();
  }
  const mg = x.createLinearGradient(0, by + bh - 12, 0, by + bh); mg.addColorStop(0, '#C3CBD5'); mg.addColorStop(1, '#7D8896');
  x.fillStyle = mg; x.fillRect(X0 + 10, by + bh - 12, w - 20, 10);
  x.fillStyle = k === null ? '#6FE3C1' : `rgb(${glow})`; x.beginPath(); x.arc(X0 + w - 16, Y0 + h - 6, 2.5, 0, 6.2832); x.fill();
}
/* perfil de temperaturas del termociclador */
function btcPerfil(cv, st, marca){
  const { x, W, H } = btcLienzo(cv, 200);
  const osc = btcOscuro();
  x.fillStyle = cssVar('--bg-3') || '#f3f3f3'; x.fillRect(0,0,W,H);
  const dev = W >= 440, dw = dev ? Math.min(124, W*0.24) : 0;
  if (dev) btcTermociclador(x, 10, 12, dw, H - 26, st, marca, osc);
  const pl = (dev ? dw + 18 : 0) + 44, pr = 12, pt = 28, pb = 26, pw = W-pl-pr, ph = H-pt-pb;
  const Y = T => pt + ph - (T-20)/(100-20)*ph;
  x.strokeStyle = cssVar('--chart-grid') || 'rgba(0,0,0,.08)'; x.fillStyle = cssVar('--ink-3') || '#777';
  x.font = '11px "IBM Plex Mono",monospace'; x.textAlign = 'right'; x.lineWidth = 1;
  [20,40,60,80,100].forEach(T => { x.beginPath(); x.moveTo(pl, Y(T)); x.lineTo(W-pr, Y(T)); x.stroke(); x.fillText(T+' °C', pl-5, Y(T)+4); });
  /* dos ciclos: rampa - meseta */
  const seg = [ ['Desnat.', st.Td, 'd'], ['Alin.', st.Ta, 'a'], ['Ext.', st.Te, 'e'] ];
  const pts = [[0, 25]], dur = [1, 1.3, 1.6], ramp = 0.35;
  let t = 0.3; pts.push([t, 25]);
  const mesetas = [];
  for (let c=0;c<2;c++) seg.forEach((s,i) => { t += ramp; pts.push([t, s[1]]); mesetas.push([t, t + dur[i], i]); t += dur[i]; pts.push([t, s[1]]); });
  const tmax = t + 0.3; pts.push([tmax, st.Te]);
  const X = tt => pl + tt/tmax*pw;
  /* franjas de cada paso */
  const tinte = ['rgba(216,69,47,', 'rgba(46,107,216,', 'rgba(224,137,26,'];
  mesetas.forEach(([a, b, i]) => { const yy = Y(seg[i][1]), gr = x.createLinearGradient(0, yy, 0, pt + ph);
    gr.addColorStop(0, tinte[i] + (osc ? '.22)' : '.16)')); gr.addColorStop(1, tinte[i] + '0)'); x.fillStyle = gr; x.fillRect(X(a), yy, X(b) - X(a), pt + ph - yy); });
  /* líneas recomendadas */
  x.setLineDash([4,4]); x.strokeStyle = cssVar('--ink-3') || '#999';
  [95, 55, 72].forEach(T => { x.beginPath(); x.moveTo(pl, Y(T)); x.lineTo(W-pr, Y(T)); x.stroke(); });
  x.setLineDash([]);
  /* relleno bajo la curva */
  const gen = cssVar('--gen') || '#8E5BD0';
  x.strokeStyle = gen; x.lineWidth = 2.5; x.lineJoin = 'round'; x.beginPath();
  pts.forEach((p,i) => i ? x.lineTo(X(p[0]), Y(p[1])) : x.moveTo(X(p[0]), Y(p[1]))); x.stroke();
  /* mesetas resaltadas con el color de su paso */
  const solido = ['#D8452F', '#2E6BD8', '#E0891A'];
  mesetas.forEach(([a, b, i]) => { x.strokeStyle = solido[i]; x.lineWidth = 4; x.lineCap = 'round'; x.beginPath(); x.moveTo(X(a) + 2, Y(seg[i][1])); x.lineTo(X(b) - 2, Y(seg[i][1])); x.stroke(); });
  x.lineCap = 'butt';
  /* etiquetas del primer ciclo */
  x.fillStyle = cssVar('--ink') || '#222'; x.font = '600 11px "IBM Plex Sans",sans-serif'; x.textAlign = 'center';
  let tt = 0.3; seg.forEach((s,i) => { tt += ramp; const cx = X(tt + dur[i]/2); x.fillText(s[0]+' '+s[1]+' °C', cx, Y(s[1]) - 8); tt += dur[i]; });
  x.fillStyle = cssVar('--ink-3') || '#777'; x.font = '11px "IBM Plex Sans",sans-serif';
  x.fillText('ciclo 1', X(0.3 + (tmax-0.6)/4), H-8); x.fillText('ciclo 2', X(0.3 + 3*(tmax-0.6)/4), H-8);
  x.textAlign = 'right'; x.font = '10px "IBM Plex Sans",sans-serif'; x.fillText('líneas punteadas: 95 · 72 · 55 °C recomendados', W - pr, 13);
  if (marca !== undefined && marca !== null){
    const k = marca % 3; let t0 = 0.3; for (let i=0;i<k;i++) t0 += ramp + dur[i];
    const mx = X(t0 + ramp + dur[k]/2), my = Y(seg[k][1]);
    const hg = x.createRadialGradient(mx, my, 0, mx, my, 14); hg.addColorStop(0, 'rgba(255,255,255,.7)'); hg.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = hg; x.beginPath(); x.arc(mx, my, 14, 0, 6.283); x.fill();
    x.fillStyle = cssVar('--accent') || '#2E6BD8'; x.beginPath(); x.arc(mx, my, 6, 0, 6.283); x.fill();
    x.strokeStyle = '#fff'; x.lineWidth = 2; x.stroke();
  }
  cv.setAttribute('role','img');
  cv.setAttribute('aria-label', `Perfil del termociclador: desnaturalización a ${st.Td} °C, alineamiento a ${st.Ta} °C, extensión a ${st.Te} °C, repetido en cada ciclo.`);
}
/* una hebra de ADN con su esqueleto y sus bases */
function btcHebra(x, x0, x1, y, col, dir, n, largo, par){
  const g = x.createLinearGradient(0, y - 3, 0, y + 3); g.addColorStop(0, col[0]); g.addColorStop(1, col[1]);
  x.strokeStyle = g; x.lineWidth = 5; x.lineCap = 'round'; x.beginPath(); x.moveTo(x0, y); x.lineTo(x1, y); x.stroke();
  x.strokeStyle = 'rgba(255,255,255,.45)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(x0 + 2, y - 1.3); x.lineTo(x1 - 2, y - 1.3); x.stroke();
  const B = ['#E4574A', '#F2B233', '#4FA36A', '#4B8BE0'];
  for (let i=0;i<n;i++){ const px = x0 + (i + 0.5)*(x1 - x0)/n; x.strokeStyle = B[(i*7 + (par ? 0 : 2)) % 4]; x.lineWidth = 2.2; x.beginPath(); x.moveTo(px, y + dir*3); x.lineTo(px, y + dir*(3 + largo)); x.stroke(); }
}
function btcPrimer(x, a, b, y, col, dir){
  x.strokeStyle = col; x.lineWidth = 5; x.lineCap = 'round'; x.beginPath(); x.moveTo(a, y); x.lineTo(b, y); x.stroke();
  const tip = dir > 0 ? Math.max(a, b) : Math.min(a, b);
  x.fillStyle = col; x.beginPath(); x.moveTo(tip + dir*7, y); x.lineTo(tip, y - 4.5); x.lineTo(tip, y + 4.5); x.closePath(); x.fill();
}
function btcPolimerasa(x, px, py, viva, dir){
  if (!viva){
    x.strokeStyle = '#9AA3AE'; x.lineWidth = 2.4; x.lineCap = 'round'; x.beginPath();
    for (let i=0;i<=24;i++){ const t = i/24; const xx = px - 14 + t*28, yy = py - 10 + Math.sin(t*14)*4 + Math.cos(t*5)*3; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke();
    return;
  }
  x.save(); x.translate(px, py); x.scale(dir, 1);
  const g = x.createRadialGradient(-4, -6, 1, 0, -2, 16); g.addColorStop(0, '#C9B2F2'); g.addColorStop(0.55, '#8E5BD0'); g.addColorStop(1, '#5A3496');
  x.fillStyle = g; x.beginPath();
  x.moveTo(-11, 5); x.bezierCurveTo(-16, -6, -8, -17, 2, -15); x.bezierCurveTo(12, -13, 15, -4, 12, 2);
  x.lineTo(7, 2); x.bezierCurveTo(8, -3, 4, -6, 0, -5); x.bezierCurveTo(-5, -4, -6, 0, -4, 5); x.closePath(); x.fill();
  x.beginPath(); x.moveTo(-10, 6); x.bezierCurveTo(-8, 13, 6, 13, 10, 7); x.lineTo(5, 7); x.bezierCurveTo(2, 9, -3, 9, -5, 6); x.closePath(); x.fill();
  x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.ellipse(-5, -10, 4, 2.2, -0.4, 0, 6.2832); x.fill();
  x.restore();
}
/* qué pasa con las moléculas en cada paso, según las temperaturas elegidas */
function btcMolec(cv, st, pasoActivo){
  const { x, W, H } = btcLienzo(cv, 186);
  const osc = btcOscuro();
  x.fillStyle = cssVar('--bg-3') || '#f3f3f3'; x.fillRect(0,0,W,H);
  const F = btcPcrFactores(st);
  const enzViva = st.enz === 'taq' || st.fresca || st.Td < 80;
  const pw = W/3, azul = ['#5B92EE', '#2455B8'], nar = ['#F2A650', '#C06A0E'], verde = '#2E9E5B', rojo = '#D8452F';
  const tit = ['1 · Desnaturalización','2 · Alineamiento','3 · Extensión'], temps = [st.Td, st.Ta, st.Te], tcol = ['#D8452F', '#2E6BD8', '#E0891A'];
  const chica = pw < 150;
  for (let k=0;k<3;k++){
    const ox = k*pw, cx = ox + pw/2, L = pw*0.74, x0 = cx - L/2, x1 = cx + L/2;
    if (pasoActivo === k){ x.fillStyle = osc ? 'rgba(111,168,255,.14)' : 'rgba(46,107,216,.09)'; btcRRect(x, ox+3, 3, pw-6, H-6, 10); x.fill(); x.strokeStyle = 'rgba(46,107,216,.45)'; x.lineWidth = 1.2; x.stroke(); }
    if (k){ x.strokeStyle = cssVar('--line') || '#ddd'; x.lineWidth = 1; x.beginPath(); x.moveTo(ox + 0.5, 12); x.lineTo(ox + 0.5, H - 12); x.stroke(); }
    x.fillStyle = cssVar('--ink') || '#222'; x.font = '600 ' + (chica ? 10.5 : 12) + 'px "IBM Plex Sans",sans-serif'; x.textAlign = 'center'; x.fillText(tit[k], cx, 18);
    /* temperatura del paso */
    x.font = '700 10px "IBM Plex Mono",monospace'; const ttx = temps[k] + ' °C', tw = x.measureText(ttx).width + 12;
    x.fillStyle = tcol[k]; btcRRect(x, cx - tw/2, 25, tw, 15, 7.5); x.fill(); x.fillStyle = '#fff'; x.fillText(ttx, cx, 36);
    const sep = F.d > 0.5;
    const yA = sep ? 70 : 92, yB = sep ? 128 : 108;
    /* nucleótidos libres */
    if (k === 2){ const R = btcRng(5 + k); const NB = ['#E4574A', '#F2B233', '#4FA36A', '#4B8BE0'];
      for (let i=0;i<16;i++){ x.fillStyle = NB[i%4]; x.globalAlpha = 0.55; x.beginPath(); x.arc(ox + 10 + R()*(pw - 20), 52 + R()*(H - 80), 1.8, 0, 6.2832); x.fill(); } x.globalAlpha = 1; }
    const nb = chica ? 9 : 13;
    if (!sep){
      btcHebra(x, x0, x1, yA, azul, 1, nb, (yB - yA)/2 - 3, true);
      btcHebra(x, x0, x1, yB, nar, -1, nb, (yB - yA)/2 - 3, false);
    } else {
      btcHebra(x, x0, x1, yA, azul, 1, nb, 5, true);
      btcHebra(x, x0, x1, yB, nar, -1, nb, 5, false);
    }
    x.font = '9px "IBM Plex Mono",monospace'; x.fillStyle = cssVar('--ink-3') || '#888';
    x.textAlign = 'right'; x.fillText('5′', x0 - 5, yA + 3); x.fillText('3′', x0 - 5, yB + 3);
    x.textAlign = 'left'; x.fillText('3′', x1 + 5, yA + 3); x.fillText('5′', x1 + 5, yB + 3);
    x.textAlign = 'center';
    x.font = (chica ? '10px' : '11px') + ' "IBM Plex Sans",sans-serif'; x.fillStyle = cssVar('--ink-2') || '#444';
    if (k === 0){
      if (sep){ x.strokeStyle = 'rgba(216,69,47,.55)'; x.lineWidth = 1.4; [x0 + L*0.3, x1 - L*0.3].forEach(ax => { x.beginPath(); x.moveTo(ax, yA + 14); x.lineTo(ax, yA + 24); x.moveTo(ax - 3, yA + 18); x.lineTo(ax, yA + 13); x.lineTo(ax + 3, yA + 18); x.stroke(); x.beginPath(); x.moveTo(ax, yB - 14); x.lineTo(ax, yB - 24); x.moveTo(ax - 3, yB - 18); x.lineTo(ax, yB - 13); x.lineTo(ax + 3, yB - 18); x.stroke(); }); }
      x.fillText(sep ? 'hebras separadas ✓' : 'siguen unidas ✗', cx, H-12);
    } else {
      const pl = L*0.2;
      const pega = F.a > 0.5 && sep;
      if (pega){
        btcPrimer(x, x1 - pl, x1, yA + 11, verde, -1);
        btcPrimer(x, x0, x0 + pl, yB - 11, verde, 1);
        if (F.f > 0.05) btcPrimer(x, cx - pl/2, cx + pl/2, yA + 11, rojo, -1);
      } else {
        x.globalAlpha = 0.6;
        x.save(); x.translate(x1 - pl/2, yA - 20); x.rotate(-0.15); btcPrimer(x, -pl/2, pl/2, 0, verde, -1); x.restore();
        x.save(); x.translate(x0 + pl/2 + 4, yB + 18); x.rotate(-0.12); btcPrimer(x, -pl/2, pl/2, 0, verde, 1); x.restore();
        x.globalAlpha = 1;
      }
      if (k === 1) x.fillText(!sep ? 'sin hebras libres ✗' : !pega ? 'cebadores sueltos ✗' : F.f > 0.05 ? 'pegados, y también mal ⚠' : 'cebadores pegados ✓', cx, H-12);
      if (k === 2){
        const copia = pega && enzViva && F.e > 0.3;
        if (copia){
          const frac = F.e;
          x.setLineDash([5,3]); x.lineWidth = 4; x.strokeStyle = verde;
          x.beginPath(); x.moveTo(x1-pl, yA+11); x.lineTo(x1 - pl - (L-pl)*frac, yA+11); x.stroke();
          x.beginPath(); x.moveTo(x0+pl, yB-11); x.lineTo(x0 + pl + (L-pl)*frac, yB-11); x.stroke(); x.setLineDash([]);
        }
        const ex = copia ? x0 + pl + (L-pl)*F.e : x0 + pl + 8;
        btcPolimerasa(x, ex, yB - 11, enzViva, 1);
        if (copia) btcPolimerasa(x, x1 - pl - (L-pl)*F.e, yA + 11, true, -1);
        if (!enzViva){ x.strokeStyle = rojo; x.lineWidth = 2; x.beginPath(); x.moveTo(ex-7,yB-26); x.lineTo(ex+7,yB-12); x.moveTo(ex+7,yB-26); x.lineTo(ex-7,yB-12); x.stroke(); }
        x.fillStyle = cssVar('--ink-2') || '#444';
        x.fillText(!enzViva ? 'polimerasa desnaturalizada ✗' : !copia ? 'no hay nada que extender ✗' : F.e < 0.95 ? 'copia incompleta ⚠' : 'copia completa ✓', cx, H-12);
      }
    }
  }
  cv.setAttribute('role','img');
  cv.setAttribute('aria-label','Esquema de las moléculas en los tres pasos del ciclo con las temperaturas elegidas. ' + btcPcrDiagnostico(st).map(m=>m.t).join(' '));
}

/* =====================================================================
   3 · ELECTROFORESIS — gel procedural
   ===================================================================== */
const BTC_AGAR = { '0.8':{ A:2.25, B:0.60, n:'0,8 %' }, '1.5':{ A:2.20, B:0.65, n:'1,5 %' }, '2':{ A:2.10, B:0.65, n:'2 %' } };
const btcMob = (bp, ag) => { const g = BTC_AGAR[ag] || BTC_AGAR['1.5']; return Math.max(0.05, g.A - g.B*Math.log10(bp)); };
const BTC_ESCALERA = [100,200,300,400,500,600,700,800,900,1000];
const BTC_GEL_A = [
  { id:'M', n:'Marcador', bands:BTC_ESCALERA, ladder:true },
  { id:'X', n:'Muestra X', bands:[450] },
  { id:'Y', n:'Muestra Y', bands:[250, 800] },
  { id:'Z', n:'Muestra Z', bands:[180, 320, 450, 610], smear:true }
];
/* caso de filiación: cada persona, 4 marcadores × 2 alelos */
const BTC_CASO = [
  { id:'M', n:'Marcador', bands:BTC_ESCALERA, ladder:true },
  { id:'Ma', n:'Madre',  bands:[180,240,330,410,520,640,760,900] },
  { id:'Hi', n:'Hijo',   bands:[180,210,330,370,560,640,760,840] },
  { id:'A',  n:'A',      bands:[150,210,370,450,480,700,900,980] },
  { id:'B',  n:'B',      bands:[210,270,290,370,560,700,840,980] },
  { id:'C',  n:'C',      bands:[180,270,330,450,640,700,760,980] }
];
function btcGel(cv, cfg){
  const { x, W, H } = btcLienzo(cv, cfg.H || 340);
  const lanes = cfg.lanes, nL = lanes.length;
  const ml = 54, mr = 14, top = 30, y0 = top + 16, yEnd = H - 14, L = yEnd - y0 - 6;
  const lw = (W - ml - mr) / nL;
  const pol = cfg.pol === 'inv' ? -1 : 1;
  /* transiluminador: caja oscura con la luz que hace brillar el colorante */
  const g = x.createLinearGradient(0,0,0,H); g.addColorStop(0,'#24163F'); g.addColorStop(1,'#110A22');
  x.fillStyle = g; btcRRect(x, 0, 0, W, H, 12); x.fill();
  const uv = x.createRadialGradient(W*0.55, H*0.45, 10, W*0.55, H*0.45, Math.max(W, H)*0.7);
  uv.addColorStop(0, 'rgba(120,80,220,.22)'); uv.addColorStop(1, 'rgba(120,80,220,0)'); x.fillStyle = uv; x.fillRect(0, 0, W, H);
  /* bloque de gel de agarosa */
  const gx0 = ml - 6, gx1 = W - mr + 4, gy0 = y0 - 14, gy1 = yEnd + 6;
  const gg = x.createLinearGradient(0, gy0, 0, gy1); gg.addColorStop(0, 'rgba(190,160,255,.13)'); gg.addColorStop(1, 'rgba(150,120,230,.08)');
  x.fillStyle = gg; btcRRect(x, gx0, gy0, gx1 - gx0, gy1 - gy0, 6); x.fill();
  x.strokeStyle = 'rgba(210,190,255,.22)'; x.lineWidth = 1; x.stroke();
  x.fillStyle = 'rgba(255,255,255,.06)'; x.fillRect(gx0 + 3, gy0 + 2, gx1 - gx0 - 6, 1.5);
  const rg = btcRng(4); x.fillStyle = 'rgba(220,200,255,.05)';
  for (let i=0;i<120;i++) x.fillRect(gx0 + rg()*(gx1 - gx0), gy0 + rg()*(gy1 - gy0), 1.2, 1.2);
  /* hilos de platino de los electrodos (negro = −, rojo = +) */
  const hilo = (yy, c) => { x.strokeStyle = c; x.lineWidth = 3; x.lineCap = 'round'; x.beginPath(); x.moveTo(78, yy); x.lineTo(W - 12, yy); x.stroke();
    x.strokeStyle = 'rgba(230,230,240,.7)'; x.lineWidth = 0.8; x.beginPath(); x.moveTo(80, yy - 0.8); x.lineTo(W - 14, yy - 0.8); x.stroke(); };
  hilo(10, pol > 0 ? '#2B2B33' : '#C8342C'); hilo(H - 5, pol > 0 ? '#C8342C' : '#2B2B33');
  /* electrodos */
  x.font = '700 14px "IBM Plex Mono",monospace'; x.textAlign = 'left';
  x.fillStyle = pol > 0 ? '#bfc6d6' : '#ff8a8a'; x.fillText(pol > 0 ? '−' : '+', 8, 18);
  x.fillStyle = pol > 0 ? '#ff8a8a' : '#bfc6d6'; x.fillText(pol > 0 ? '+' : '−', 8, H-8);
  x.font = '10px "IBM Plex Sans",sans-serif'; x.fillStyle = '#b9aed4';
  x.fillText(pol > 0 ? 'cátodo' : 'ánodo', 20, 17); x.fillText(pol > 0 ? 'ánodo' : 'cátodo', 20, H-8);
  const pos = [];
  const recorrido = (cfg.V * cfg.t) / (100*40);
  const yOf = bp => y0 + pol * recorrido * btcMob(bp, cfg.agar) * L;
  let perdidas = 0, visibles = 0, ultEt = -99;
  lanes.forEach((ln, i) => {
    const cx = ml + (i+0.5)*lw, bw = Math.min(58, lw*0.62);
    pos.push(cx);
    /* etiqueta y pozo */
    x.fillStyle = cfg.sel === ln.id ? '#ffe38a' : '#e9e3f5'; x.font = '600 12px "IBM Plex Sans",sans-serif'; x.textAlign = 'center';
    x.fillText(ln.n, cx, top - 10 + 8);
    x.fillStyle = '#07040F'; btcRRect(x, cx - bw/2, y0 - 8, bw, 7, 1.5); x.fill();
    x.fillStyle = 'rgba(255,255,255,.14)'; x.fillRect(cx - bw/2 + 1, y0 - 1.6, bw - 2, 1);
    if (!cfg.t){ const dg = x.createLinearGradient(0, y0 - 7, 0, y0 - 2); dg.addColorStop(0, 'rgba(120,130,255,.95)'); dg.addColorStop(1, 'rgba(70,60,200,.95)'); x.fillStyle = dg; x.fillRect(cx - bw/2 + 1.5, y0 - 6, bw - 3, 4); }
    if (cfg.sel === ln.id){ x.strokeStyle = 'rgba(255,227,138,.55)'; x.setLineDash([4,4]); x.lineWidth = 1; x.strokeRect(cx - lw/2 + 3, y0 - 10, lw - 6, H - y0 - 2); x.setLineDash([]); }
    if (ln.smear && recorrido > 0.05 && pol > 0){
      const gs = x.createLinearGradient(0, y0, 0, yOf(120));
      gs.addColorStop(0, 'rgba(255,160,214,.05)'); gs.addColorStop(0.5, 'rgba(255,160,214,.28)'); gs.addColorStop(1, 'rgba(255,160,214,.04)');
      x.fillStyle = gs; x.fillRect(cx - bw/2, y0, bw, Math.max(0, Math.min(yEnd, yOf(120)) - y0));
    }
    ln.bands.forEach(bp => {
      const y = yOf(bp);
      if (y > yEnd || y < y0 - 4){ perdidas++; return; }
      visibles++;
      const thick = cfg.V >= 150 ? 8 : 5;
      x.save(); x.shadowColor = 'rgba(255,150,210,.9)'; x.shadowBlur = cfg.V >= 150 ? 14 : 8;
      const bg = x.createLinearGradient(cx - bw/2, 0, cx + bw/2, 0), c0 = ln.ladder ? '247,198,230' : '255,168,217';
      bg.addColorStop(0, `rgba(${c0},.55)`); bg.addColorStop(0.12, `rgba(${c0},1)`); bg.addColorStop(0.88, `rgba(${c0},1)`); bg.addColorStop(1, `rgba(${c0},.55)`);
      x.fillStyle = bg;
      if (cfg.V >= 150){ /* bandas en "sonrisa" por el calor */
        x.beginPath(); x.moveTo(cx - bw/2, y - 2); x.quadraticCurveTo(cx, y + 5, cx + bw/2, y - 2); x.lineTo(cx + bw/2, y - 2 + thick); x.quadraticCurveTo(cx, y + 5 + thick, cx - bw/2, y - 2 + thick); x.closePath(); x.fill();
      } else { btcRRect(x, cx - bw/2, y - thick/2, bw, thick, thick/2); x.fill(); }
      x.restore();
      if (cfg.V < 150){ x.fillStyle = 'rgba(255,240,250,.75)'; x.fillRect(cx - bw/2 + 4, y - 0.6, bw - 8, 1.2); }
      if (ln.ladder && i === 0 && Math.abs(y - ultEt) >= 11){ ultEt = y; x.fillStyle = '#d8cff0'; x.font = '10px "IBM Plex Mono",monospace'; x.textAlign = 'right'; x.fillText(String(bp), ml - 6, y + 3); }
    });
  });
  if (!cfg.t){ x.fillStyle = '#d8cff0'; x.font = '12px "IBM Plex Sans",sans-serif'; x.textAlign = 'center'; x.fillText('Muestras cargadas en los pozos. Enciende la fuente.', W/2, H/2); }
  const geo = { pos, yOf, lw, yEnd, y0 };
  if (cfg.overlay) cfg.overlay(x, geo);
  cv.setAttribute('role','img');
  cv.setAttribute('aria-label', 'Gel de agarosa con ' + nL + ' carriles. ' + lanes.map(ln => ln.n + ': ' + ln.bands.filter(bp => { const y = yOf(bp); return y <= yEnd && y >= y0-4; }).length + ' bandas visibles').join('; ') + '. La tabla de abajo da los tamaños.');
  return { perdidas, visibles, geo };
}

/* =====================================================================
   4 · ADN RECOMBINANTE — esquema SVG (alternativa y apoyo del 3D)
   ===================================================================== */
const BTC_HERR = [
  { id:'enzima',  n:'Enzima de restricción EcoRI', d:'Reconoce GAATTC y corta' },
  { id:'gen',     n:'Gen de la insulina humana', d:'ADNc cortado con EcoRI' },
  { id:'ligasa',  n:'ADN ligasa', d:'Sella el esqueleto de azúcar-fosfato' },
  { id:'choque',  n:'Choque térmico', d:'Bacterias en CaCl₂: 0 °C → 42 °C → 0 °C' },
  { id:'placa',   n:'Placa con ampicilina', d:'Medio de cultivo con antibiótico' },
  { id:'ferm',    n:'Fermentador', d:'Cultivo grande, extracción y purificación' }
];
const BTC_PASOS_REC = [
  { t:'El plásmido', d:'Un plásmido es un anillo pequeño de ADN que las bacterias llevan aparte de su cromosoma. Este tiene un gen de resistencia a la ampicilina (ampR), un origen de replicación (ori) y un único sitio GAATTC que reconoce la enzima EcoRI.' },
  { t:'1 · Cortar', d:'EcoRI corta las dos hebras en G↓AATTC, de forma escalonada: deja en cada extremo cuatro bases sueltas (AATT). Son <b>extremos cohesivos</b>: pegajosos, porque pueden aparearse con cualquier otro extremo AATT.' },
  { t:'2 · Insertar el gen', d:'El gen de la insulina se cortó con <b>la misma enzima</b>, así que tiene los mismos extremos AATT. Sus bases se aparean con las del plásmido abierto. Se usa ADNc (copiado del ARNm con transcriptasa inversa) porque las bacterias no saben quitar los intrones.' },
  { t:'3 · Sellar', d:'El apareamiento solo une las bases con puentes de hidrógeno, que son débiles. La <b>ADN ligasa</b> forma los enlaces fosfodiéster que faltan en el esqueleto y cierra el anillo: ya es un plásmido <b>recombinante</b>.' },
  { t:'4 · Transformar', d:'Las bacterias tratadas con cloruro de calcio y un choque de calor dejan entrar ADN del medio. Es poco eficiente: solo una pequeña fracción de las bacterias acaba llevando el plásmido.' },
  { t:'5 · Seleccionar', d:'En una placa con ampicilina solo crecen las bacterias que tienen el plásmido, porque el gen ampR las protege. Las demás mueren. Cada colonia sale de una sola bacteria transformada.' },
  { t:'6 · Producir', d:'Las bacterias seleccionadas se cultivan en fermentadores de miles de litros. Leen el gen humano con su propia maquinaria y fabrican la proteína, que luego se purifica. Así se aprobó en 1982 la primera insulina humana recombinante.' }
];
const BTC_ERR_REC = {
  0:{ gen:'El gen no tiene dónde entrar: el plásmido sigue siendo un anillo cerrado. Primero hay que abrirlo.', ligasa:'La ligasa une extremos sueltos, pero el plásmido todavía no tiene ningún corte.', choque:'Meterías en la bacteria un plásmido sin el gen: fabricaría resistencia a la ampicilina, pero nada de insulina.', placa:'Aún no hay bacterias con el plásmido: en la placa con ampicilina morirían todas.', ferm:'No hay todavía ninguna bacteria que lleve el gen humano.' },
  1:{ enzima:'El plásmido ya está cortado. Cortarlo más no ayuda: fíjate en los extremos AATT que quedaron sueltos.', ligasa:'Si sellas ahora, el plásmido se vuelve a cerrar vacío, sin el gen. Primero hay que meter el inserto.', choque:'Un plásmido abierto casi no se mantiene en la bacteria: se degrada. Falta el gen y el sellado.', placa:'Aún no hay bacterias transformadas.', ferm:'Todavía no hay ninguna bacteria que lleve el gen.' },
  2:{ enzima:'Volverías a cortar justo donde el gen se unió al plásmido.', gen:'El gen ya está en su sitio. Mira los dos puntos de unión: ¿qué les falta?', choque:'Los extremos solo están unidos por puentes de hidrógeno débiles: el anillo se abriría. Falta formar los enlaces del esqueleto.', placa:'Aún no hay bacterias transformadas.', ferm:'Todavía no hay ninguna bacteria que lleve el gen.' },
  3:{ enzima:'Cortarías el plásmido recombinante que acabas de armar.', gen:'El gen ya está dentro y sellado.', ligasa:'Ya está sellado: los dos puntos de unión están cerrados.', placa:'El plásmido sigue en el tubo, fuera de las bacterias.', ferm:'Aún no hay bacterias que lleven el plásmido.' },
  4:{ enzima:'El plásmido ya está dentro de la bacteria.', gen:'El gen ya está dentro de la bacteria.', ligasa:'El plásmido ya está sellado.', choque:'Ya transformaste. El problema ahora es otro: ¿cómo distinguir las pocas bacterias que lo recibieron?', ferm:'Si cultivas todo, la mayoría serán bacterias sin el plásmido. Primero hay que seleccionar.' },
  5:{ enzima:'No hace falta cortar nada más.', gen:'El gen ya está en las bacterias seleccionadas.', ligasa:'El plásmido ya está sellado.', choque:'Ya están transformadas y seleccionadas.', placa:'Ya seleccionaste: las colonias que crecieron llevan el plásmido.' }
};
function btcArco(cx, cy, r, a0, a1){
  const p = a => [cx + r*Math.cos(a), cy - r*Math.sin(a)];
  const [x0,y0] = p(a0), [x1,y1] = p(a1);
  const large = (a1 - a0) % (2*Math.PI) > Math.PI ? 1 : 0;
  return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 0 ${x1.toFixed(1)},${y1.toFixed(1)}`;
}
function btcPlasmidoSVG(paso){
  const dentro = paso >= 4;
  const cx = dentro ? 206 : 150, cy = 112, r = dentro ? 36 : 70, sw = dentro ? 6 : 9;
  const top = Math.PI/2, gap = paso === 1 ? 0.35 : paso >= 2 ? 0.8 : 0;
  const o = [];
  o.push(`<defs><radialGradient id="btc-gb" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#DDF3E4"/><stop offset=".7" stop-color="#A9DDBB"/><stop offset="1" stop-color="#6FBF8C"/></radialGradient>
    <linearGradient id="btc-gi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7B35A"/><stop offset="1" stop-color="#C86F12"/></linearGradient>
    <filter id="btc-sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#10233A" flood-opacity=".22"/></filter></defs>`);
  if (dentro){
    /* bacteria: pared, pili y flagelo */
    o.push(`<path d="M34,160 C18,172 32,186 16,198 S22,212 8,218" fill="none" stroke="#8C6A3F" stroke-width="2" opacity=".85"/>`);
    for (let i=0;i<16;i++){ const a = i/16*Math.PI*2, px = 150 + Math.cos(a)*134, py = 112 + Math.sin(a)*84;
      const qx = 150 + Math.cos(a)*146, qy = 112 + Math.sin(a)*94; o.push(`<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${qx.toFixed(1)}" y2="${qy.toFixed(1)}" stroke="#5E9E74" stroke-width="1.2" stroke-linecap="round"/>`); }
    o.push(`<rect x="18" y="30" width="264" height="164" rx="80" fill="url(#btc-gb)" stroke="#2E9E5B" stroke-width="3" filter="url(#btc-sh)"/>`);
    o.push(`<rect x="25" y="37" width="250" height="150" rx="74" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/>`);
    const R = btcRng(9); for (let i=0;i<60;i++){ const px = 40 + R()*220, py = 50 + R()*124; if (((px-150)/120)**2 + ((py-112)/72)**2 < 1) o.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="1.6" fill="#4F8F66" opacity=".45"/>`); }
    o.push(`<path d="M60,90 C80,60 110,140 95,112 S70,150 120,130 S140,80 110,92 S72,120 88,146" fill="none" stroke="#6D7480" stroke-width="3" stroke-linecap="round"/>`);
    o.push(`<text x="60" y="176" font-size="11" style="fill:#1E4A2E">cromosoma bacteriano</text>`);
  }
  const base = gap ? btcArco(cx, cy, r, top + gap/2, top + 2*Math.PI - gap/2) : `M${cx},${cy-r} a${r},${r} 0 1,0 0.01,0`;
  o.push(`<path d="${base}" fill="none" stroke="#6FA8DC" stroke-width="${sw}" stroke-linecap="butt" ${dentro ? '' : 'filter="url(#btc-sh)"'}/>`);
  o.push(`<path d="${btcArco(cx, cy, r, 3.6, 4.8)}" fill="none" stroke="#E0891A" stroke-width="${sw+1}"/>`);
  o.push(`<path d="${btcArco(cx, cy, r, 5.3, 5.9)}" fill="none" stroke="#8E5BD0" stroke-width="${sw+1}"/>`);
  /* doble hebra: línea clara entre las dos cadenas */
  o.push(`<path d="${base}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="${Math.max(1, sw*0.2)}"/>`);
  if (!dentro){
    o.push(`<text x="${cx - r - 8}" y="${cy + r*0.72}" font-size="12" text-anchor="end">ampR</text>`);
    o.push(`<text x="${cx + r*0.95}" y="${cy + r*0.72}" font-size="12">ori</text>`);
  }
  if (paso === 0){ o.push(`<line x1="${cx}" y1="${cy-r-10}" x2="${cx}" y2="${cy-r+10}" stroke="#D8452F" stroke-width="2"/><text x="${cx}" y="${cy-r-14}" font-size="12" text-anchor="middle">sitio EcoRI (GAATTC)</text>`); }
  if (paso === 1){ o.push(`<text x="${cx}" y="${cy-r-16}" font-size="12" text-anchor="middle">extremos cohesivos AATT</text>`); }
  if (paso >= 2){
    const dy = paso === 2 ? -10 : 0;
    o.push(`<path d="${btcArco(cx, cy + dy, r, top - gap/2, top + gap/2)}" fill="none" stroke="#2E9E5B" stroke-width="${sw+1}"/>`);
    o.push(`<path d="${btcArco(cx, cy + dy, r, top - gap/2, top + gap/2)}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="${Math.max(1, sw*0.2)}"/>`);
    if (!dentro) o.push(`<text x="${cx}" y="${cy - r - 16 + dy}" font-size="12" text-anchor="middle">gen de la insulina humana</text>`);
    const jc = paso >= 3 ? '#2E9E5B' : '#D8452F';
    [top - gap/2, top + gap/2].forEach(a => o.push(`<circle cx="${(cx + r*Math.cos(a)).toFixed(1)}" cy="${(cy - r*Math.sin(a)).toFixed(1)}" r="${dentro?3:5}" fill="${jc}" stroke="#fff" stroke-width="1.5"/>`));
  }
  if (paso >= 6){
    for (let i=0;i<5;i++){ const ix = 250 + (i%2)*16, iy = 50 + i*26;
      o.push(`<path d="M${ix-6},${iy-3} q6,-5 12,0" fill="none" stroke="url(#btc-gi)" stroke-width="3.2" stroke-linecap="round"/><path d="M${ix-7},${iy+4} q7,5 14,0" fill="none" stroke="url(#btc-gi)" stroke-width="3.2" stroke-linecap="round"/><line x1="${ix-2}" y1="${iy-2}" x2="${ix-2}" y2="${iy+4}" stroke="#E9C23A" stroke-width="1.4"/><line x1="${ix+3}" y1="${iy-2}" x2="${ix+3}" y2="${iy+4}" stroke="#E9C23A" stroke-width="1.4"/>`); }
    o.push(`<text x="286" y="206" font-size="11" text-anchor="end">insulina</text>`);
  }
  return `<svg class="btc-svg" viewBox="0 0 300 220" role="img" aria-label="Esquema del plásmido. Paso ${paso} de 6: ${BTC_PASOS_REC[paso].t}.">${o.join('')}</svg>`;
}
/* placas de Petri: sin y con antibiótico */
function btcPlaca(x, cx, cy, r, n, grande, seed){
  btcSombra(x, cx + 3, cy + r*0.9, r*1.05, r*0.22, 0.28);
  /* base de vidrio */
  const vb = x.createRadialGradient(cx - r*0.3, cy - r*0.4, r*0.2, cx, cy, r*1.08);
  vb.addColorStop(0, 'rgba(235,242,248,.95)'); vb.addColorStop(1, 'rgba(170,188,205,.95)');
  x.fillStyle = vb; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fill();
  /* agar */
  const ag = x.createRadialGradient(cx - r*0.25, cy - r*0.3, r*0.1, cx, cy, r*0.95);
  ag.addColorStop(0, '#F7E7B4'); ag.addColorStop(0.7, '#EDD58E'); ag.addColorStop(1, '#D6B868');
  x.fillStyle = ag; x.beginPath(); x.arc(cx, cy, r - 5, 0, 6.2832); x.fill();
  const bo = x.createRadialGradient(cx, cy, r*0.78, cx, cy, r - 5); bo.addColorStop(0, 'rgba(120,90,30,0)'); bo.addColorStop(1, 'rgba(120,90,30,.28)');
  x.fillStyle = bo; x.beginPath(); x.arc(cx, cy, r - 5, 0, 6.2832); x.fill();
  /* colonias: pequeñas cúpulas de color crema */
  const R = btcRng(seed);
  for (let i=0;i<n;i++){ const a = R()*6.283, d = Math.sqrt(R())*(r - 14), rr = grande ? 4.2 + R()*2.2 : 2 + R()*1.6;
    const px = cx + Math.cos(a)*d, py = cy + Math.sin(a)*d;
    x.fillStyle = 'rgba(110,80,20,.22)'; x.beginPath(); x.arc(px + 0.8, py + 1, rr, 0, 6.2832); x.fill();
    const cg = x.createRadialGradient(px - rr*0.35, py - rr*0.4, 0, px, py, rr);
    cg.addColorStop(0, '#FFFFFB'); cg.addColorStop(0.6, '#F4EEDB'); cg.addColorStop(1, '#D9CCA6');
    x.fillStyle = cg; x.beginPath(); x.arc(px, py, rr, 0, 6.2832); x.fill(); }
  /* borde y reflejo de la tapa */
  x.strokeStyle = 'rgba(120,140,160,.8)'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.stroke();
  x.strokeStyle = 'rgba(255,255,255,.9)'; x.lineWidth = 1.2; x.beginPath(); x.arc(cx, cy, r - 2.5, 3.5, 5.0); x.stroke();
  x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy, r*0.72, 3.7, 4.4); x.stroke();
}
function btcPlacas(cv){
  const { x, W, H } = btcLienzo(cv, 210);
  const osc = btcOscuro();
  const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, osc ? '#1A2A42' : '#EEF2F6'); bg.addColorStop(1, osc ? '#13203A' : '#DCE3EB');
  x.fillStyle = bg; x.fillRect(0,0,W,H);
  const r = Math.min(80, W/4 - 12);
  [[W*0.27, 'Sin ampicilina', 150, 1], [W*0.73, 'Con ampicilina', 7, 2]].forEach(([cx, t, n, s]) => {
    btcPlaca(x, cx, 94, r, n, s === 2, s*101);
    x.fillStyle = cssVar('--ink') || '#222'; x.font = '600 12px "IBM Plex Sans",sans-serif'; x.textAlign = 'center';
    if (W >= 440) x.fillText(t + ' · ' + n + ' colonias', cx, H-10);
    else { x.font = '600 11px "IBM Plex Sans",sans-serif'; x.fillText(t, cx, H-20); x.font = '11px "IBM Plex Sans",sans-serif'; x.fillText(n + ' colonias', cx, H-6); }
  });
  cv.setAttribute('role','img');
  cv.setAttribute('aria-label','Dos placas de Petri tras la transformación. Sin ampicilina crecen unas 150 colonias, la mayoría sin plásmido. Con ampicilina crecen solo 7: las que recibieron el plásmido con el gen de resistencia.');
}

/* =====================================================================
   ESCENA 3D: plásmido de doble hélice, corte, inserto, ligasa y bacteria
   ===================================================================== */
function btcArcoADN(R, a0, a1, o){
  const K = o.K || 11, rr = o.r || 0.30, g = new THREE.Group();
  const P = (th, ph) => {
    const u = new THREE.Vector3(Math.cos(th), Math.sin(th), 0);
    const c = u.clone().multiplyScalar(R);
    const ps = K*th + ph;
    return c.add(u.multiplyScalar(rr*Math.cos(ps))).add(new THREE.Vector3(0,0,rr*Math.sin(ps)));
  };
  const hebra = (b0, b1, ph, col) => {
    const n = Math.max(8, Math.ceil((b1-b0)*K*5));
    const pts = []; for (let i=0;i<=n;i++) pts.push(P(b0 + (b1-b0)*i/n, ph));
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n*2, 0.07, 6, false);
    return new THREE.Mesh(geo, mat(btcCol(col), { roughness:0.38, clearcoat:0.4 }));
  };
  g.add(hebra(a0 - (o.ovA||0), a1, 0, o.colA || '#D6DEEA'));
  g.add(hebra(a0, a1 + (o.ovB||0), Math.PI, o.colB || '#C9D3E2'));
  const paso = (2*Math.PI/10)/K, nR = Math.max(1, Math.floor((a1-a0)/paso));
  const cil = new THREE.CylinderGeometry(0.045, 0.045, 1, 6, 1); cil.rotateX(Math.PI/2);
  const im = new THREE.InstancedMesh(cil, new THREE.MeshStandardMaterial({ roughness:0.55 }), nR);
  const d = new THREE.Object3D(), col = new THREE.Color();
  for (let i=0;i<nR;i++){
    const th = a0 + (i+0.5)*paso, A = P(th, 0), B = P(th, Math.PI);
    d.position.copy(A).add(B).multiplyScalar(0.5); d.lookAt(A); d.scale.set(1,1,A.distanceTo(B)); d.updateMatrix();
    im.setMatrixAt(i, d.matrix);
    col.copy(btcCol(o.rung ? o.rung(th) : '#6FA8DC'));
    if (im.setColorAt) im.setColorAt(i, col);
  }
  if (im.instanceColor) im.instanceColor.needsUpdate = true;
  g.add(im);
  return g;
}
function btcTirar(obj){
  if (!obj) return;
  if (obj.parent) obj.parent.remove(obj);
  obj.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(m => m.dispose()); } });
}
/* fondo del tubo de reacción: degradado envolvente y partículas en suspensión */
function btcFondo3D(E, osc, low){
  const g = new THREE.SphereGeometry(40, 32, 16), col = [], pos = g.attributes.position;
  const a = new THREE.Color(osc ? '#0E1A2E' : '#F1EFF9'), b = new THREE.Color(osc ? '#22305A' : '#CCD6EA'), c = new THREE.Color();
  for (let i=0;i<pos.count;i++){ const y = pos.getY(i)/40; c.copy(a).lerp(b, clamp(0.5 - y*0.6, 0, 1)); if (c.convertSRGBToLinear) c.convertSRGBToLinear(); col.push(c.r, c.g, c.b); }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const fondo = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors:true, side:THREE.BackSide, depthWrite:false, toneMapped:false }));
  E.scene.add(fondo);
  const R = btcRng(606), n = low ? 160 : 360, P = new Float32Array(n*3);
  for (let i=0;i<n;i++){ P[i*3] = (R()*2 - 1)*14; P[i*3+1] = (R()*2 - 1)*8; P[i*3+2] = -3 - R()*12; }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(P, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: osc ? 0x8FA8D8 : 0x9A8FC8, size:0.07, transparent:true, opacity: osc ? 0.55 : 0.5, depthWrite:false }));
  E.scene.add(pts);
  return pts;
}
/* proteína globular esculpida (superficie grumosa, como en los modelos de superficie) */
function btcProteina(radii, seed, low){
  return Kit.sculpt({ w: low ? 28 : 44, h: low ? 20 : 32, radii,
    disp:(p) => 0.10*Kit.fbm(p.x*1.7 + seed, p.y*1.7, p.z*1.7, 3) + 0.035*Kit.fbm(p.x*5 + seed, p.y*5, p.z*5, 2) });
}
function btcEscena(stage){
  const osc = btcOscuro();
  const E = new Engine3D(stage, {
    radius:13.5, phi:1.45, theta:0.0, minR:4, maxR:24, target:[0,0,0], exposure:0.95,
    aria:'Plásmido en 3D: un anillo de ADN de doble hebra. Los peldaños naranjas son el gen de resistencia a la ampicilina, los morados el origen de replicación y los verdes el gen de la insulina. Arrastra para girar o usa las flechas del teclado.'
  });
  const low = E.low;
  const polvo = btcFondo3D(E, osc, low);
  const R = 3.2, TOP = Math.PI/2;
  const norm = th => ((th % (2*Math.PI)) + 2*Math.PI) % (2*Math.PI);
  const rung = th => { const t = norm(th); return (t > 3.6 && t < 4.8) ? '#E0891A' : (t > 5.3 && t < 5.9) ? '#8E5BD0' : '#6FA8DC'; };
  const raiz = new THREE.Group(); E.scene.add(raiz);
  let plas = null, ins = null, bact = null, insulinas = null;
  const juntas = [];
  const esfera = new THREE.SphereGeometry(1, 18, 12);
  /* EcoRI: dímero de dos lóbulos que abraza el ADN */
  const enz = new THREE.Group();
  const mEnz = Kit.tissue({ color:btcCol('#8E5BD0'), rough:0.55, coat:0.35 });
  const lob = btcProteina([0.62, 0.5, 0.5], 3, low);
  [[-0.42, 0.05, 0, 1], [0.42, 0.05, 0, -1]].forEach(([x, y, z, sgn]) => { const m = new THREE.Mesh(lob, mEnz); m.position.set(x, y, z); m.rotation.set(0, 0, sgn*0.35); enz.add(m); });
  const pinza = new THREE.Mesh(btcProteina([0.34, 0.28, 0.3], 7, low), mEnz); pinza.position.set(0, 0.46, 0.18); enz.add(pinza);
  enz.visible = false; E.scene.add(enz);
  /* ADN ligasa: proteína en forma de C */
  const lig = new THREE.Group();
  const mLig = Kit.tissue({ color:btcCol('#2E9E5B'), rough:0.55, coat:0.35 });
  const cuerpoL = new THREE.Mesh(btcProteina([0.55, 0.46, 0.44], 11, low), mLig); lig.add(cuerpoL);
  const brazo = new THREE.Mesh(btcProteina([0.34, 0.26, 0.28], 13, low), mLig); brazo.position.set(0.42, 0.34, 0.05); lig.add(brazo);
  const brazo2 = new THREE.Mesh(btcProteina([0.3, 0.24, 0.26], 17, low), mLig); brazo2.position.set(-0.34, 0.36, 0.1); lig.add(brazo2);
  lig.visible = false; E.scene.add(lig);
  const tweens = [];
  const anim = (obj, from, to, dur, fin) => {
    if (btcQuieto()){ obj.position.copy(to); fin && fin(); return; }
    tweens.push({ obj, from:from.clone(), to:to.clone(), t:0, dur, fin });
  };
  let reloj = 0;
  E.onFrame((t, dt) => {
    reloj = t;
    for (let i = tweens.length-1; i >= 0; i--){
      const w = tweens[i]; w.t += dt || 0.016;
      const k = clamp(w.t / w.dur, 0, 1), s = k*k*(3-2*k);
      w.obj.position.lerpVectors(w.from, w.to, s);
      if (k >= 1){ tweens.splice(i,1); w.fin && w.fin(); }
    }
    if (!btcQuieto()){
      raiz.rotation.z = Math.sin(t*0.25)*0.05;
      polvo.rotation.y = Math.sin(t*0.05)*0.08; polvo.position.y = Math.sin(t*0.3)*0.15;
      if (enz.visible) enz.rotation.y = Math.sin(t*2)*0.25;
      if (lig.visible) lig.rotation.z = Math.sin(t*2.4)*0.2;
      if (bact) bact.children.forEach(c => { if (c.userData.flagelo) c.rotation.x += (dt || 0.016)*6; });
      if (insulinas) insulinas.children.forEach((m, i) => { const f = ((t*0.12 + i*0.17) % 1); m.position.set(4.2 + f*4.2, -2.2 + i*0.9 + Math.sin(t+i)*0.2, 0.6); m.rotation.z = t*0.5 + i; });
    }
  });
  const lbl = (id, texto, p) => {
    const l = E.labels.get(id);
    if (l){ l.el.remove(); E.labels.delete(id); }
    if (texto && p) E.addLabel(id, texto, p);
  };
  function construir(paso){
    btcTirar(plas); btcTirar(ins); btcTirar(bact); btcTirar(insulinas); plas = ins = bact = insulinas = null;
    juntas.forEach(j => btcTirar(j)); juntas.length = 0;
    const gap = paso === 1 ? 0.35 : paso >= 2 ? 0.8 : 0;
    plas = gap ? btcArcoADN(R, TOP + gap/2, TOP + 2*Math.PI - gap/2, { rung, ovA: paso === 1 ? 0.09 : 0, ovB: paso === 1 ? 0.09 : 0 })
               : btcArcoADN(R, TOP, TOP + 2*Math.PI, { rung });
    raiz.add(plas);
    if (paso >= 2){
      ins = btcArcoADN(R, TOP - gap/2, TOP + gap/2, { rung:()=>'#2E9E5B', colA:'#BFE6CC', colB:'#AEDDBE' });
      raiz.add(ins);
      const mJ = mat(btcCol(paso >= 3 ? '#2E9E5B' : '#D8452F'), { roughness:0.4, emissive:btcCol(paso >= 3 ? '#0c3a1f' : '#4a0f08') });
      [TOP - gap/2, TOP + gap/2].forEach(a => { const j = new THREE.Mesh(esfera, mJ); j.scale.setScalar(0.2); j.position.set(R*Math.cos(a), R*Math.sin(a), 0.45); raiz.add(j); juntas.push(j); });
    }
    raiz.scale.setScalar(paso >= 4 ? 0.34 : 1);
    raiz.position.set(paso >= 4 ? 2.4 : 0, paso >= 4 ? -0.2 : 0, 0);
    if (paso >= 4){
      bact = new THREE.Group();
      /* bacilo con pared, membrana, ribosomas, nucleoide, pili y flagelos */
      const capsula = (r, L, seg) => { const pts = [];
        for (let i=0;i<=10;i++){ const a = -Math.PI/2 + (i/10)*(Math.PI/2); pts.push(new THREE.Vector2(Math.max(0.0001, r*Math.cos(a)), -L + r*Math.sin(a))); }
        for (let i=0;i<=10;i++){ const a = (i/10)*(Math.PI/2); pts.push(new THREE.Vector2(Math.max(0.0001, r*Math.cos(a)), L + r*Math.sin(a))); }
        const g = new THREE.LatheGeometry(pts, seg); g.rotateZ(-Math.PI/2); return g; };
      const seg = low ? 32 : 56;
      const mPared = Kit.tissue({ color:btcCol('#86C79A'), rough:0.35, coat:0.8, transparent:true, opacity:0.32, side:THREE.DoubleSide, depthWrite:false, env:1.3 });
      const mMemb = Kit.tissue({ color:btcCol('#E3B27A'), rough:0.5, coat:0.3, transparent:true, opacity:0.20, side:THREE.DoubleSide, depthWrite:false });
      const pared = new THREE.Mesh(capsula(2.3, 3.5, seg), mPared); pared.renderOrder = 3; bact.add(pared);
      const memb = new THREE.Mesh(capsula(2.12, 3.5, seg), mMemb); memb.renderOrder = 2; bact.add(memb);
      const rng = btcRng(21), pts = [];
      for (let i=0;i<26;i++) pts.push(new THREE.Vector3(-2.6 + rng()*3.4, -1.4 + rng()*2.8, -1.1 + rng()*2.2));
      const crom = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), low ? 200 : 320, 0.07, 6, true), mat(btcCol('#8A8F99'), { roughness:0.6 }));
      bact.add(crom);
      /* ribosomas */
      const nr = low ? 140 : 260, rib = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.075, 1), mat(btcCol('#7A48B0'), { roughness:0.6 }), nr);
      const d3 = new THREE.Object3D();
      for (let i=0;i<nr;i++){ let px, py, pz; do { px = (rng()*2 - 1)*5.3; py = (rng()*2 - 1)*1.9; pz = (rng()*2 - 1)*1.9; } while (py*py + pz*pz > 3.4 || (Math.abs(px) > 3.5 && (Math.abs(px) - 3.5)**2 + py*py + pz*pz > 3.4));
        d3.position.set(px, py, pz); d3.rotation.set(rng()*3, rng()*3, 0); d3.updateMatrix(); rib.setMatrixAt(i, d3.matrix); }
      bact.add(rib);
      /* pili: filamentos cortos repartidos por la pared */
      const pg = [];
      for (let i=0;i<(low ? 26 : 44);i++){
        const u = rng()*2 - 1, a = rng()*Math.PI*2, px = u*3.4, n = new THREE.Vector3(0, Math.cos(a), Math.sin(a));
        const base = new THREE.Vector3(px, 0, 0).addScaledVector(n, 2.28), L = 0.5 + rng()*0.5;
        const c = new THREE.CylinderGeometry(0.018, 0.022, L, 4, 1); c.translate(0, L/2, 0);
        c.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), n)));
        c.translate(base.x, base.y, base.z); pg.push(c);
      }
      bact.add(new THREE.Mesh(Kit.merge(pg), mat(btcCol('#6E9C7C'), { roughness:0.6 })));
      /* flagelos helicoidales desde el polo izquierdo */
      [[0.45, 0.3], [-0.5, -0.35]].forEach(([oy, oz], k) => {
        const fp = []; for (let i=0;i<=90;i++){ const t = i/90, amp = 0.32*Math.min(1, t*5);
          fp.push(new THREE.Vector3(-5.6 - t*4.6, amp*Math.sin(t*11 + k*2), amp*Math.cos(t*11 + k*2))); }
        const fl = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(fp), low ? 110 : 200, 0.045, 5, false), mat(btcCol('#8C6A3F'), { roughness:0.55 }));
        fl.position.set(0, oy, oz); fl.userData.flagelo = true; bact.add(fl); });
      E.scene.add(bact);
    }
    if (paso >= 6){
      insulinas = new THREE.Group();
      const cadA = [], cadB = [];
      for (let k=0;k<=10;k++) cadA.push(new THREE.Vector3(k*0.13, 0.34 + Math.sin(k*0.9)*0.1, Math.cos(k*0.9)*0.08));
      for (let k=0;k<=14;k++) cadB.push(new THREE.Vector3(-0.1 + k*0.12, -0.02 + Math.sin(k*0.8 + 1)*0.09, Math.cos(k*0.8)*0.08));
      const gA = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cadA), 40, 0.075, 7, false);
      const gB = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cadB), 50, 0.08, 7, false);
      const ss = []; [[0.3, 0.8], [0.95, 1.1]].forEach(([xa]) => { const c = new THREE.CylinderGeometry(0.03, 0.03, 0.34, 6); c.translate(xa, 0.16, 0); ss.push(c); });
      const gS = Kit.merge(ss);
      const mA = mat(btcCol('#E0891A'), { roughness:0.4, clearcoat:0.4 }), mB2 = mat(btcCol('#F2B25C'), { roughness:0.4, clearcoat:0.4 }), mS = mat(btcCol('#E9C23A'), { roughness:0.35, metalness:0.2 });
      for (let i=0;i<5;i++){
        const mol = new THREE.Group();
        mol.add(new THREE.Mesh(gA, mA), new THREE.Mesh(gB, mB2), new THREE.Mesh(gS, mS));
        mol.scale.setScalar(1.3);
        mol.position.set(3.6 + i*1.2, -2.2 + i*0.9, 0.6);
        insulinas.add(mol);
      }
      E.scene.add(insulinas);
    }
    /* etiquetas */
    const L = (id, t, th, k) => lbl(id, t, paso >= 4 ? null : [R*1.25*Math.cos(th)*(k||1), R*1.25*Math.sin(th)*(k||1), 0]);
    L('btc-amp', 'ampR', 4.2, 0.62); L('btc-ori', 'ori', 5.6, 0.62);
    lbl('btc-site', paso === 0 ? 'sitio EcoRI' : paso === 1 ? 'extremos AATT' : paso <= 3 ? 'gen de la insulina' : null, [0, R + 0.9, 0]);
    lbl('btc-bact', paso >= 4 ? 'bacteria E. coli' : null, [-3.2, 3.1, 0]);
    lbl('btc-pl', paso >= 4 ? 'plásmido recombinante' : null, [2.4, 1.9, 0]);
    if (paso >= 4){ E.setAnchor('btc-bact', [-3.2, 2.2, 0.4]); E.setAnchor('btc-pl', [2.4, 0.9, 0]); }
    lbl('btc-ins', paso >= 6 ? 'insulina' : null, [7.5, 2.2, 0.6]);
    const asp = (stage.clientWidth || 600)/(stage.clientHeight || 440), kAsp = Math.max(1, (paso >= 4 ? 1.45 : 1.15)/asp);  /* pantallas angostas: alejar para no cortar */
    E.goal.r = (paso >= 4 ? 19.5 : 13.5)*kAsp; E.goalTarget.set(paso >= 4 ? (paso >= 6 ? 0.6 : 0) : 0, 0.2, 0);
  }
  return {
    E,
    ir(paso){
      construir(paso);
      enz.visible = false; lig.visible = false;
      if (paso === 1){
        enz.visible = true;
        anim(enz, new THREE.Vector3(0, R + 3.4, 1.4), new THREE.Vector3(0, R + 0.1, 0.7), 1.0,
          () => anim(enz, new THREE.Vector3(0, R + 0.1, 0.7), new THREE.Vector3(2.5, R + 2.4, 1.6), 1.0, () => { enz.visible = false; }));
      }
      if (paso === 2 && ins){ anim(ins, new THREE.Vector3(0, 2.4, 0), new THREE.Vector3(0, 0, 0), 1.4); }
      if (paso === 3){
        lig.visible = true;
        const a = new THREE.Vector3(R*Math.cos(TOP-0.4), R*Math.sin(TOP-0.4), 0.9), b = new THREE.Vector3(R*Math.cos(TOP+0.4), R*Math.sin(TOP+0.4), 0.9);
        anim(lig, new THREE.Vector3(3.5, R + 3, 1.5), a, 0.9, () => anim(lig, a, b, 0.9, () => anim(lig, b, new THREE.Vector3(-3.5, R + 3, 1.5), 0.9, () => { lig.visible = false; })));
      }
    },
    dispose(){ try { E.dispose(); } catch(e){} }
  };
}

/* =====================================================================
   5 · CRISPR — secuencia didáctica del inicio del gen HBB (β-globina)
   con la mutación de la anemia falciforme (GAG → GTG en el codón 6)
   ===================================================================== */
const BTC_SEQ = 'CAGACACCATGGTGCACCTGACTCCTGTGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTG';
const BTC_ATG = 8, BTC_MUT = 27;
const BTC_AA = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const BTC_AA3 = { F:'Phe',L:'Leu',S:'Ser',Y:'Tyr',C:'Cys',W:'Trp',P:'Pro',H:'His',Q:'Gln',R:'Arg',I:'Ile',M:'Met',T:'Thr',N:'Asn',K:'Lys',V:'Val',A:'Ala',D:'Asp',E:'Glu',G:'Gly','*':'ALTO' };
function btcTraducir(seq){
  const B = 'TCAG', out = [];
  for (let i = BTC_ATG; i + 3 <= seq.length; i += 3){
    const c = seq.substr(i,3), k = B.indexOf(c[0])*16 + B.indexOf(c[1])*4 + B.indexOf(c[2]);
    const aa = BTC_AA[k] || '?'; out.push(aa); if (aa === '*') break;
  }
  return out;
}
function btcGuia(i){
  const pam = BTC_SEQ.substr(i+20, 3), ok = /^.GG$/.test(pam);
  const corte = i + 17;                           /* corta entre i+16 e i+17: 3 nt antes del PAM */
  const dist = Math.abs(BTC_MUT - corte + 0.5);
  return { i, pam, ok, corte, dist, cerca: ok && dist <= 10 };
}

/* preguntas del reto final */
const BTC_PREGUNTAS = [
  { q:'En el simulador de PCR pusiste la desnaturalización en 85 °C y dejaste lo demás como estaba. Después de 30 ciclos seguías prácticamente con la copia inicial. ¿Qué explica la curva plana?',
    ops:['El calor de 85 °C destruyó la Taq polimerasa.',
         'A 85 °C las dos hebras siguen unidas: sin hebras sueltas, los cebadores no tienen dónde pegarse y no hay molde que copiar.',
         'Faltaron nucleótidos desde el primer ciclo.',
         'A 85 °C la polimerasa copia tan rápido que comete errores y destruye las copias.'],
    ok:1, fb:'La desnaturalización necesita unos 94–95 °C para romper los puentes de hidrógeno entre las bases. Por debajo de eso el ADN sigue siendo una doble hélice cerrada y el ciclo entero se detiene en el paso 1.',
    wrong:['La Taq resiste 95 °C durante horas; 85 °C es menos calor, no más. Revisa el esquema de moléculas: la polimerasa sigue morada, pero las hebras siguen unidas.',
           'Los nucleótidos solo se agotan al final, cuando la curva ya subió y se aplana arriba (la meseta). Aquí la curva nunca despegó.',
           'La temperatura de desnaturalización no hace copiar a la polimerasa: en ese paso no se copia nada, solo se separan las hebras.'] },
  { q:'Con la polimerasa de E. coli la curva no despega; si activas «añadir enzima fresca en cada ciclo», sí sube. ¿Qué te dice esa comparación?',
    ops:['Que la enzima de E. coli no sabe copiar ADN humano.',
         'Que la enzima se gasta como un reactivo y hay que reponerla.',
         'Que la enzima de E. coli se desnaturaliza en cada calentamiento a 95 °C; la Taq, que viene de una bacteria de aguas termales, conserva su forma y sirve para todos los ciclos.',
         'Que los cebadores solo funcionan con la Taq.'],
    ok:2, fb:'Por eso la PCR se volvió automática cuando se empezó a usar la polimerasa de Thermus aquaticus: una sola dosis dura los 30 ciclos. Antes había que abrir el tubo y añadir enzima después de cada desnaturalización.',
    wrong:['Cuando le añades enzima fresca, la de E. coli sí copia el ADN. El problema no es qué copia, sino que no sobrevive al calor.',
           'Las enzimas son catalizadores: no se consumen en la reacción. Lo que la deja inservible es el calor, que la despliega (la desnaturaliza).',
           'Los cebadores son trocitos de ADN que se aparean con el molde; funcionan igual con cualquier polimerasa.'] },
  { q:'En tu gel, la banda de la muestra X quedó entre las bandas de 400 y 500 pb del marcador. La muestra Y tiene una banda más cerca de los pozos que X. ¿Qué concluyes de esa banda de Y?',
    ops:['Es un fragmento más grande que X: los fragmentos grandes avanzan más despacio por la malla de agarosa.',
         'Es un fragmento más pequeño que X, porque pesa menos y se quedó arriba.',
         'Tiene menos carga eléctrica que X y por eso casi no se movió.',
         'Es la misma molécula que X, solo que más concentrada.'],
    ok:0, fb:'Todos los fragmentos de ADN tienen la misma carga por nucleótido, así que la fuerza que los empuja es proporcional a su tamaño, igual que su freno. Lo que los separa es la malla del gel: los cortos se escurren rápido, los largos se enredan. Más cerca del pozo = más grande.',
    wrong:['Es al revés: lo pequeño se escurre por la malla y llega más lejos. Mira el marcador: 100 pb está abajo del todo y 1000 pb arriba.',
           'Cada nucleótido aporta un fosfato con una carga negativa: la carga crece con el tamaño en la misma proporción. La diferencia la hace la malla, no la carga.',
           'La concentración cambia el brillo de la banda, no su posición. Una banda de otra altura es un fragmento de otro tamaño.'] },
  { q:'En el caso de filiación, el candidato C comparte cuatro bandas con el hijo, igual que el candidato B. ¿Por qué C queda excluido?',
    ops:['No queda excluido: cuatro bandas compartidas bastan para ser compatible.',
         'Porque C tiene bandas que el hijo no tiene.',
         'Porque las cuatro bandas que comparte también están en la madre; las del hijo que no vienen de ella (210, 370, 560 y 840 pb) tienen que venir del padre, y C no tiene ninguna.',
         'Porque las bandas de C están más arriba en el gel.'],
    ok:2, fb:'El razonamiento correcto empieza por la madre: cada banda del hijo que ella no tiene, la aportó el padre biológico. B tiene las cuatro; A y C no. Excluir es seguro cuando fallan varios marcadores; incluir solo da una probabilidad, que los laboratorios calculan con 15 a 24 marcadores.',
    wrong:['Contar bandas compartidas engaña: C comparte justo las que el hijo heredó de la madre. Hay que preguntarse qué bandas del hijo no pudo darle ella.',
           'Todos tenemos bandas que nuestros hijos no heredan: cada padre transmite solo uno de sus dos alelos en cada marcador. B también tiene bandas que el hijo no tiene.',
           'La altura solo indica el tamaño del fragmento. Lo que importa es si las bandas coinciden, a la misma altura, con las del hijo.'] },
  { q:'Para fabricar insulina en bacterias, ¿por qué se cortan el plásmido y el gen humano con la MISMA enzima de restricción?',
    ops:['Porque la enzima de restricción también pega los fragmentos después de cortarlos.',
         'Porque así los dos quedan con los mismos extremos cohesivos (AATT con EcoRI), que se aparean entre sí; después la ligasa sella el esqueleto.',
         'Para que la bacteria reconozca el gen humano como si fuera suyo.',
         'Porque solo existe una enzima de restricción.'],
    ok:1, fb:'Extremos iguales = extremos complementarios. El apareamiento de bases los junta, pero solo con puentes de hidrógeno; por eso hace falta la ligasa, que forma los enlaces fosfodiéster.',
    wrong:['La enzima de restricción solo corta. El sellado es trabajo de otra enzima, la ADN ligasa: probaste a saltártela en la sección 4.',
           'La bacteria lee cualquier gen que tenga las señales adecuadas; no distingue "propio" de "ajeno". Lo que importa aquí es que los extremos encajen.',
           'Se conocen cientos de enzimas de restricción, cada una con su secuencia. Justamente por eso hay que elegir la misma para los dos.'] },
  { q:'En el editor CRISPR pusiste la guía de ARN sobre una zona del gen que coincidía perfectamente con la secuencia, pero Cas9 no cortó. ¿Qué faltaba?',
    ops:['Que la guía fuera de ADN y no de ARN.',
         'Un PAM (NGG) justo después de la secuencia elegida: sin él, Cas9 no se engancha al ADN aunque la guía coincida.',
         'Que la zona tuviera una mutación: Cas9 solo corta ADN mutado.',
         'Una guía de al menos 100 nucleótidos.'],
    ok:1, fb:'Cas9 primero busca PAM y solo entonces abre el ADN para comprobar si la guía coincide. Por eso no se puede cortar en cualquier sitio: hay que encontrar un NGG a la distancia correcta.',
    wrong:['La guía de Cas9 es un ARN; así funciona el sistema natural de las bacterias. El problema estaba en lo que venía después de la guía.',
           'Cas9 corta cualquier secuencia que coincida con la guía y tenga PAM, mutada o no. Por eso preocupan los cortes fuera de objetivo.',
           'La guía de Cas9 mide 20 nucleótidos. Con 20 bases ya es muy improbable que la secuencia se repita al azar en el genoma.'] }
];

/* afirmaciones para separar datos de valoraciones */
const BTC_AFIRM = [
  { t:'La Constitución del Ecuador de 2008 declara al país libre de cultivos y semillas transgénicas, con una excepción por interés nacional.', k:'dato', fb:'Se comprueba leyendo el artículo 401 de la Constitución.' },
  { t:'Los transgénicos son antinaturales y por eso deberían prohibirse.', k:'valor', fb:'Es una postura. Lo que es "natural" y si eso basta para prohibir algo se discute con argumentos, no se mide en un laboratorio.' },
  { t:'El maíz Bt produce una proteína de la bacteria Bacillus thuringiensis que es tóxica para las larvas de ciertos insectos.', k:'dato', fb:'Se puede comprobar con experimentos y está documentado en la literatura científica.' },
  { t:'Las empresas que patentan semillas no deberían poder cobrar regalías a los agricultores.', k:'valor', fb:'Es un juicio sobre lo justo. Puede apoyarse en datos (precios, ingresos), pero la conclusión es una valoración.' },
  { t:'El polen del maíz puede fecundar plantas de maíz vecinas, incluidas variedades nativas.', k:'dato', fb:'Es un hecho de la biología reproductiva del maíz, que se poliniza por el viento. Es la base del argumento sobre el flujo de genes.' },
  { t:'Editar embriones humanos es aceptable si con eso se evita una enfermedad grave.', k:'valor', fb:'Es una postura ética. Hay argumentos serios a favor y en contra, pero ningún experimento puede decidir si es aceptable.' },
  { t:'Casgevy, aprobada en 2023, usa CRISPR para tratar la anemia falciforme editando células madre de la sangre del propio paciente.', k:'dato', fb:'Se comprueba en las resoluciones de las agencias que la aprobaron (Reino Unido y Estados Unidos, 2023).' },
  { t:'El Ecuador debería aprovechar su biodiversidad para desarrollar medicamentos propios.', k:'valor', fb:'Es una propuesta de política. Se puede defender o criticar, pero no es un dato: dice lo que alguien cree que se debería hacer.' }
];

/* =====================================================================
   VISTA PRINCIPAL
   ===================================================================== */
function btcVista(view){
  view.classList.add('wide');
  const SEC = [
    { id:'extraccion',   n:'1 · Extraer ADN' },
    { id:'pcr',          n:'2 · PCR' },
    { id:'gel',          n:'3 · Electroforesis' },
    { id:'recombinante', n:'4 · Insulina recombinante' },
    { id:'crispr',       n:'5 · CRISPR-Cas9' },
    { id:'bioetica',     n:'6 · Bioética y Ecuador' },
    { id:'reto',         n:'7 · Reto final' }
  ];
  const St = {
    sec:0, start:Date.now(),
    ext:{ fruta:'fresa', paso:0, r:{}, runs:[] },
    pcr:{ Td:95, Ta:55, Te:72, enz:'taq', fresca:false, previas:[], log:false },
    gel:{ V:100, t:0, pol:'ok', agar:'1.5', medida:false, sel:null, madre:false },
    rec:{ paso:0 },
    cr:{ i:0, cortado:false, rep:null, reps:{} },
    et:{ resp:{} },
    marcas:{ extraccion:false, variantes:false, pcr:false, pcrTemp:false, pcrEcoli:false, gel:false, gelMedida:false, caso:false, recombinante:false, crispr:false, reparacion:false, etica:false }
  };
  const hecho0 = !!(Store.s.activities['reto-biotecnologia'] && Store.s.activities['reto-biotecnologia'].done);

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{},
      h('span',{class:'eyebrow gen'},'Biotecnología · 3.º BGU · Unidad 9'),
      h('h1',{},'Biotecnología: leer, copiar, cortar y pegar ADN'),
      h('p',{},'Extraes ADN de una fruta, lo multiplicas mil millones de veces, lo separas por tamaño en un gel, pones un gen humano dentro de una bacteria y lo editas con CRISPR. Primero haces cada cosa; después entiendes qué pasó dentro de las moléculas.')),
    h('div',{class:'stack',style:'gap:6px;align-items:flex-end'},
      h('span',{class:'pill gen'},'+150 XP · 60–90 min'),
      h('div',{class:'btc-links'},
        h('a',{class:'btn sm',href:'#/explorar/adn'},'ADN 3D'),
        h('a',{class:'btn sm',href:'#/explorar/cruces'},'Cruces'),
        h('a',{class:'btn sm',href:'#/explorar/pancreas'},'Páncreas'),
        h('a',{class:'btn sm',href:'#/explorar/evolucion'},'Evolución')))));

  const retoSt = h('div',{class:'notice'+(hecho0?' ok':'')},
    hecho0 ? 'Reto resuelto ✓ · puedes volver a recorrer todas las secciones.' : 'Pendiente: llega a la sección 7 y responde las seis preguntas.');
  view.append(purposeBanner({
    proposito:'Explicar las técnicas básicas de la biotecnología —extracción de ADN, PCR, electroforesis, ADN recombinante y edición con CRISPR— a partir de lo que ocurre en las moléculas, y valorar con argumentos sus usos en salud, justicia y agricultura, incluido el debate ecuatoriano.',
    observa:[
      'Qué hace cada ingrediente de la extracción: detergente, sal y alcohol frío',
      'Cómo crece el número de copias en la PCR y qué la frena si una temperatura está mal',
      'Qué fragmentos llegan más lejos en el gel y cómo se deduce un parentesco',
      'Por qué el plásmido y el gen se cortan con la misma enzima, y qué necesita Cas9 para cortar'
    ],
    reto:'Haz la extracción virtual, lleva la PCR a la meseta, lee un gel y resuelve el caso de filiación, fabrica insulina en bacterias, corta con CRISPR y responde las seis preguntas del reto final.',
    statusEl: retoSt }));

  const nav = h('nav',{class:'btc-nav','aria-label':'Secciones del recurso'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);
  let Esc = null;
  const limpiezas = [];
  function soltar(){
    while (limpiezas.length){ try { limpiezas.pop()(); } catch(e){ console.warn(e); } }
    if (Esc){ try { Esc.dispose(); } catch(e){ console.warn(e); } Esc = null; }
  }
  function renderNav(){
    nav.innerHTML = '';
    SEC.forEach((s,i) => nav.append(h('button',{ type:'button', 'aria-current':String(i===St.sec), onclick:()=>{ St.sec = i; render(); } }, s.n)));
  }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:8px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec = Math.max(0, St.sec-1); render(); window.scrollTo({top:0}); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec = Math.min(SEC.length-1, St.sec+1); render(); window.scrollTo({top:0}); }},'Siguiente →'));
  }
  /* redibuja lienzos cuando cambia el ancho */
  function alRedimensionar(fn){
    let tm = null; const cb = () => { clearTimeout(tm); tm = setTimeout(fn, 120); };
    window.addEventListener('resize', cb); limpiezas.push(() => { window.removeEventListener('resize', cb); clearTimeout(tm); });
  }

  /* =================================================================
     1 · EXTRACCIÓN DE ADN
     ================================================================= */
  function secExtraccion(){
    const X = St.ext;
    const cv = h('canvas',{class:'btc-cv'});
    const lista = h('ol',{class:'btc-steps'});
    const res = h('div',{class:'stack'});
    const tabla = h('div',{class:'tablewrap'});
    let raf = 0;
    const r = () => Object.assign({ fruta:X.fruta }, X.r);
    function dibujar(fijo){
      cancelAnimationFrame(raf);
      const dur = X.paso === 0 ? 0 : X.paso >= 6 ? 2600 : X.paso >= 4 ? 2000 : 1500;
      if (!fijo && dur && !btcQuieto()){
        const t0 = performance.now();
        const loop = now => { if (!cv.isConnected) return; const f = clamp((now - t0)/dur, 0, 1); btcVaso(cv, r(), X.paso, f); if (f < 1) raf = requestAnimationFrame(loop); };
        btcVaso(cv, r(), X.paso, 0); raf = requestAnimationFrame(loop);
      } else btcVaso(cv, r(), X.paso, 1);
    }
    limpiezas.push(() => cancelAnimationFrame(raf));
    function pintarLista(){
      lista.innerHTML = '';
      BTC_PASOS.forEach((p, i) => {
        const estado = i < X.paso ? 'done' : i === X.paso ? 'on' : 'todo';
        const li = h('li',{class:estado},
          h('div',{class:'btc-sh'}, h('span',{class:'btc-num'}, String(i+1).padStart(2,'0')), h('span',{}, p.n),
            i < X.paso ? h('span',{class:'small muted',style:'font-weight:500'}, '· ' + (p.ops.find(o => o.v === X.r[p.id]) || p.ops[0]).n.toLowerCase()) : null));
        if (i === X.paso){
          const bt = h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'});
          p.ops.forEach((o, k) => bt.append(h('button',{ class:'btn sm'+(k===0?' primary':''), type:'button', onclick:()=>hacer(p, o.v) }, o.n)));
          li.append(bt);
        }
        if (i < X.paso) li.append(h('div',{class:'btc-mol',html:p.mol}));
        lista.append(li);
      });
    }
    function hacer(p, v){
      X.r[p.id] = v; X.paso++;
      if (X.paso >= 6) terminar();
      pintarLista(); dibujar();
      const act = lista.querySelector('li.on button'); if (act) act.focus();
    }
    function terminar(){
      const run = Object.assign({ fruta:X.fruta }, X.r);
      run.y = btcRendimiento(run);
      X.runs.push(run);
      St.marcas.extraccion = true;
      const distintas = new Set(X.runs.map(u => [u.det,u.sal,u.alc,u.recoger].join('|'))).size;
      if (X.runs.length >= 2 && distintas >= 2) St.marcas.variantes = true;
      Store.log('simulacion',{ recurso:'biotecnologia', parte:'extraccion', fruta:run.fruta, det:run.det, sal:run.sal, alc:run.alc, recoger:run.recoger, y:Math.round(run.y*100)/100 });
      pintarRes();
    }
    function pintarRes(){
      res.innerHTML = '';
      if (X.paso < 6){ res.append(btcNota('info','Tu turno.','Elige una opción en cada paso. Puedes hacerlo "bien" o saltarte algo a propósito para ver qué pasa: después comparas.')); }
      else {
        const u = X.runs[X.runs.length-1];
        const causas = [];
        if (!u.det) causas.push('sin detergente, las membranas siguieron enteras y casi todo el ADN se quedó dentro de los núcleos');
        if (!u.sal) causas.push('sin sal, las cargas negativas de los fosfatos mantuvieron separadas las moléculas y costó que se agruparan');
        if (u.alc === 'tibio') causas.push('con alcohol tibio precipitó menos ADN y las nucleasas siguieron trabajando');
        if (u.recoger === 'fuerte') causas.push('al agitar rompiste las hebras largas en trozos cortos que ya no se enrollan');
        res.append(btcNota(u.y > 0.5 && u.recoger !== 'fuerte' ? 'ok' : 'warn', btcVeredicto(u) + '.',
          causas.length ? 'Qué pasó: ' + causas.join('; ') + '.' : 'Seguiste los seis pasos completos. Lo blanco que sube al alcohol son millones de moléculas de ADN enredadas (con algo de ARN y proteína). Una sola doble hélice mide 2 nanómetros: nunca la verías a simple vista.'),
          h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'},
            h('button',{class:'btn primary sm', onclick:()=>{ X.paso = 0; X.r = {}; pintarLista(); pintarRes(); dibujar(); }},'Repetir con otras decisiones'),
            h('button',{class:'btn sm ghost', onclick:()=>{ X.fruta = X.fruta === 'fresa' ? 'banano' : 'fresa'; X.paso = 0; X.r = {}; render(); }}, 'Probar con ' + (X.fruta === 'fresa' ? 'banano' : 'fresa'))));
      }
      tabla.innerHTML = '';
      if (X.runs.length){
        const si = v => v ? 'sí' : 'no';
        tabla.append(h('table',{class:'data btc-runs','aria-label':'Comparación de tus extracciones'},
          h('thead',{}, h('tr',{}, h('th',{},'#'), h('th',{},'Fruta'), h('th',{},'Detergente'), h('th',{},'Sal'), h('th',{},'Alcohol'), h('th',{},'Recogida'), h('th',{},'ADN obtenido'))),
          h('tbody',{}, X.runs.map((u,i) => h('tr',{}, h('td',{},String(i+1)), h('td',{},BTC_FRUTAS[u.fruta].n), h('td',{},si(u.det)), h('td',{},si(u.sal)), h('td',{},u.alc==='frio'?'helado':'ambiente'), h('td',{},u.recoger==='suave'?'palillo':'agitado'),
            h('td',{}, h('b',{}, btcN(u.y*100,0) + ' %'), ' · ' + btcVeredicto(u).split(':')[0] + (u.recoger === 'fuerte' ? ' (fragmentado)' : '')))))));
        if (X.runs.length === 1) tabla.append(h('p',{class:'small muted'},'Repite la extracción saltándote a propósito un ingrediente: así descubres qué hace cada uno.'));
      }
    }
    pintarLista(); pintarRes();
    setTimeout(() => dibujar(true), 0);
    alRedimensionar(() => dibujar(true));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Práctica virtual · se puede hacer en casa'),
        btcSeg('Fruta', [{ v:'fresa', n:'🍓 Fresa' },{ v:'banano', n:'🍌 Banano' }], ()=>X.fruta, v => { X.fruta = v; X.paso = 0; X.r = {}; pintarLista(); pintarRes(); dibujar(); }),
        h('p',{class:'small muted'}, BTC_FRUTAS[X.fruta].d)),
      h('div',{class:'btc-two'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'El vaso'), cv, res),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Los seis pasos · lo molecular aparece al hacerlos'), lista)),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Tus extracciones'), tabla),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Hazlo de verdad en tu casa o en el laboratorio del colegio'),
        h('div',{class:'grid g2'},
          h('div',{}, h('h3',{style:'margin:0 0 6px'},'Materiales'),
            h('ul',{class:'small',style:'margin:0;padding-left:18px'},
              h('li',{},'2 o 3 fresas, o medio banano maduro'),
              h('li',{},'Una bolsa con cierre hermético'),
              h('li',{},'Media taza de agua, 2 cucharadas de detergente líquido de platos y 1 cucharadita de sal'),
              h('li',{},'Alcohol antiséptico (etílico o isopropílico, del más concentrado posible) guardado 30 min en el congelador'),
              h('li',{},'Un colador o una tela limpia, un vaso transparente y un palillo de madera'))),
          h('div',{}, h('h3',{style:'margin:0 0 6px'},'Seguridad'),
            h('ul',{class:'small',style:'margin:0;padding-left:18px'},
              h('li',{},'El alcohol es inflamable: trabaja lejos de cocinas encendidas y velas.'),
              h('li',{},'Nada de lo que uses se come ni se bebe después.'),
              h('li',{},'Hazlo con una persona adulta y ventila el lugar.'),
              h('li',{},'Lávate las manos al terminar y desecha los restos en la basura común.')))),
        btcNota('info','Pregunta para tu cuaderno:','¿Por qué una receta de extracción de ADN de fruta funciona casi igual con hígado de pollo o con células de tu mejilla? Piensa en qué tienen en común todas las células eucariotas.')),
      secNav());
  }

  /* =================================================================
     2 · PCR
     ================================================================= */
  function secPCR(){
    const P = St.pcr;
    const cvPerfil = h('canvas',{class:'btc-cv'}), cvMol = h('canvas',{class:'btc-cv'});
    const cvChart = h('canvas',{}), chartWrap = h('div',{class:'btc-chart'}, cvChart);
    const lect = h('dl',{class:'btc-kv'});
    const diag = h('div',{class:'stack',style:'gap:6px'});
    const tareas = h('ul',{class:'checks plain'});
    let corriendo = false, cancelado = false;
    limpiezas.push(() => { cancelado = true; });
    function nuevo(){
      if (P.serie && P.serie.length > 3){ P.previas.push({ serie:P.serie.slice(), et:P.Td+'/'+P.Ta+'/'+P.Te+' '+(P.enz==='taq'?'Taq':'E. coli') }); if (P.previas.length > 4) P.previas.shift(); }
      Object.assign(P, { ciclo:0, Ns:1, Nn:0, act:1, aperturas:0, ultE:0, serie:[{ c:0, ns:1, nn:0 }] });
    }
    if (!P.serie) nuevo();
    function pintarTareas(){
      tareas.innerHTML = '';
      [['pcr','Corre 30 ciclos o más con las condiciones correctas (95 · 55 · 72 °C y Taq) y mira dónde se aplana'],
       ['pcrTemp','Equivócate a propósito con una temperatura y mira qué paso falla'],
       ['pcrEcoli','Cambia a la polimerasa de E. coli y descubre por qué hace falta la Taq']]
        .forEach(([k,t]) => tareas.append(h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{}, (St.marcas[k]?'✓ ':'· ')+t))));
    }
    function pintar(marca){
      btcPerfil(cvPerfil, P, marca);
      btcMolec(cvMol, P, marca === undefined || marca === null ? null : marca % 3);
      const tot = P.Ns + P.Nn;
      lect.innerHTML = '';
      lect.append(
        h('dt',{},'Ciclo'), h('dd',{}, String(P.ciclo)),
        h('dt',{},'Copias del fragmento correcto'), h('dd',{}, btcCopias(P.Ns)),
        h('dt',{},'Si fuera perfecto (2ⁿ)'), h('dd',{}, btcCopias(Math.pow(2, P.ciclo))),
        h('dt',{},'Productos inespecíficos'), h('dd',{}, P.Nn < 0.5 ? '0' : btcCopias(P.Nn)),
        h('dt',{},'Eficiencia del último ciclo'), h('dd',{}, P.ciclo ? btcN(P.ultE*100,0) + ' % (se ' + (P.ultE > 0.95 ? 'duplicó' : P.ultE < 0.02 ? 'quedó igual' : 'multiplicó por ' + btcN(1+P.ultE,2)) + ')' : '—'),
        h('dt',{},'Polimerasa activa'), h('dd',{}, btcN(P.act*100,0) + ' %'));
      diag.innerHTML = '';
      btcPcrDiagnostico(P).forEach(m => diag.append(h('div',{class:'notice '+m.k}, m.t)));
      const xmax = Math.max(10, P.ciclo, ...P.previas.map(v => v.serie.length-1));
      const ymaxRaw = Math.max(10, ...P.serie.map(d => d.ns + d.nn), ...P.previas.flatMap(v => v.serie.map(d => d.ns))) * 1.1;
      const kEsc = !P.log && ymaxRaw >= 1e5 ? Math.floor(Math.log10(ymaxRaw)) : 0, div = Math.pow(10, kEsc);
      const Y = v => P.log ? Math.log10(Math.max(1, v)) : v / div;
      const gris = cssVar('--ink-3') || '#888';
      const series = [];
      P.previas.forEach(pv => series.push({ pts:pv.serie.map(d => ({ x:d.c, y:Y(d.ns) })), color:gris, label:'' }));
      const ideal = []; for (let c=0;c<=xmax;c++){ const v = Math.pow(2,c); if (v > ymaxRaw*1.05 && !P.log) break; ideal.push({ x:c, y:Y(Math.min(v, 1e10)) }); }
      series.push({ pts:ideal, color:cssVar('--line-2') || '#bbb', label:'' });
      if (P.Nn > 0.5) series.push({ pts:P.serie.map(d => ({ x:d.c, y:Y(d.nn) })), color:cssVar('--warn') || '#E0891A', label:'' });
      series.push({ pts:P.serie.map(d => ({ x:d.c, y:Y(d.ns) })), color:cssVar('--gen') || '#8E5BD0', label:'', dots:P.serie.length <= 42 });
      try {
        lineChart(cvChart, { series, xlabel:'ciclo', ylabel: P.log ? 'copias (escala logarítmica)' : kEsc ? 'copias (× 10' + btcSup(kEsc) + ')' : 'copias', xmin:0, xmax, ymin:0, ymax: P.log ? 12 : ymaxRaw/div,
          xfmt:v => String(Math.round(v)), yfmt: P.log ? (v => '10' + btcSup(Math.round(v))) : (v => kEsc ? btcN(v, 1) : btcMiles(v)) });
      } catch(e){ console.warn('pcr chart', e); }
      cvChart.setAttribute('role','img');
      cvChart.setAttribute('aria-label', `Copias frente a ciclos. Ciclo ${P.ciclo}: ${btcCopias(P.Ns)} copias del fragmento correcto; si cada ciclo duplicara, serían ${btcCopias(Math.pow(2,P.ciclo))}.`);
      pintarTareas();
    }
    function marcar(){
      const F = btcPcrFactores(P);
      if (P.enz === 'ecoli') St.marcas.pcrEcoli = true;
      if (F.d < 0.95 || F.a < 0.95 || F.f > 0.05 || F.e < 0.95) St.marcas.pcrTemp = true;
      if (P.enz === 'taq' && F.d >= 0.95 && F.a >= 0.95 && F.f <= 0.05 && F.e >= 0.95 && P.ciclo >= 30) St.marcas.pcr = true;
    }
    async function correr(n, btn){
      if (corriendo) return; corriendo = true; if (btn) btn.disabled = true;
      for (let k=0;k<n && P.ciclo < 45;k++){
        if (cancelado) return;
        if (!btcQuieto() && n <= 40){
          for (let s=0;s<3;s++){ pintar(s); await new Promise(r => setTimeout(r, 55)); if (cancelado) return; }
        }
        btcPcrCiclo(P);
      }
      marcar(); pintar(); corriendo = false; if (btn) btn.disabled = false;
      Store.log('simulacion',{ recurso:'biotecnologia', parte:'pcr', Td:P.Td, Ta:P.Ta, Te:P.Te, enz:P.enz, fresca:P.fresca, ciclo:P.ciclo, copias:Math.round(Math.log10(Math.max(1,P.Ns))*10)/10 });
    }
    const cambio = () => { if (P.ciclo > 0) nuevo(); pintar(); };
    const bt30 = h('button',{class:'btn primary', onclick:e => correr(30, e.currentTarget)},'Correr 30 ciclos');
    const ctr = h('div',{class:'stack',style:'gap:10px'},
      btcSlider('1 · Desnaturalización', 80, 100, 1, P.Td, v => v+' °C', v => { P.Td = v; cambio(); }),
      btcSlider('2 · Alineamiento de los cebadores', 40, 72, 1, P.Ta, v => v+' °C', v => { P.Ta = v; cambio(); }),
      btcSlider('3 · Extensión', 55, 85, 1, P.Te, v => v+' °C', v => { P.Te = v; cambio(); }),
      btcSeg('ADN polimerasa', [
        { v:'taq', n:'Taq (Thermus aquaticus)', t:'Bacteria de aguas termales: su enzima resiste 95 °C' },
        { v:'ecoli', n:'De E. coli', t:'Bacteria del intestino: su enzima trabaja a 37 °C' }
      ], ()=>P.enz, v => { P.enz = v; if (v === 'taq') P.fresca = false; if (P.ciclo > 0) nuevo(); render(); }),
      P.enz === 'ecoli' ? h('label',{style:'display:flex;gap:8px;align-items:flex-start;font-size:.85rem'},
        h('input',{ type:'checkbox', checked: P.fresca || null, onchange:e => { P.fresca = e.target.checked; cambio(); } }),
        'Añadir enzima fresca después de cada desnaturalización (como en 1983)') : null,
      h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
        bt30,
        h('button',{class:'btn sm', onclick:e => correr(1, e.currentTarget)},'+1 ciclo'),
        h('button',{class:'btn sm ghost', onclick:()=>{ nuevo(); pintar(); }},'Reiniciar el tubo'),
        h('button',{class:'btn sm ghost', onclick:()=>{ P.Td = 95; P.Ta = 55; P.Te = 72; P.enz = 'taq'; P.fresca = false; nuevo(); render(); }},'Valores recomendados')));

    setTimeout(() => pintar(), 0);
    alRedimensionar(() => pintar());

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Reacción en cadena de la polimerasa'),
        h('p',{},'Tienes un tubo con una sola molécula del fragmento de ADN que te interesa, cebadores, nucleótidos y una ADN polimerasa. El termociclador repite tres temperaturas una y otra vez. Tu trabajo: programarlo y ver qué pasa con el número de copias.'),
        h('div',{class:'btc-two'},
          h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Programa del termociclador'), cvPerfil),
          h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Qué pasa con las moléculas en cada paso'), cvMol))),
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Controles'), ctr),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Lecturas'), lect, diag)),
      h('div',{class:'card stack'},
        h('div',{class:'row',style:'justify-content:space-between;flex-wrap:wrap;gap:8px'},
          h('span',{class:'eyebrow gen'},'Copias del fragmento, ciclo a ciclo'),
          btcSeg('Escala del eje vertical', [{ v:'lin', n:'Lineal' },{ v:'log', n:'Logarítmica' }], ()=>P.log?'log':'lin', v => { P.log = v === 'log'; pintar(); })),
        chartWrap,
        h('div',{class:'btc-lg'},
          h('span',{}, h('i',{style:'background:'+(cssVar('--gen')||'#8E5BD0')}),'Tu reacción'),
          h('span',{}, h('i',{style:'background:'+(cssVar('--line-2')||'#bbb')}),'Duplicación perfecta: 2ⁿ'),
          h('span',{}, h('i',{style:'background:'+(cssVar('--warn')||'#E0891A')}),'Productos inespecíficos'),
          h('span',{}, h('i',{style:'background:'+(cssVar('--ink-3')||'#888')}),'Corridas anteriores')),
        btcNota('info','Cómo leer la curva:','En escala lineal parece que no pasa nada durante 20 ciclos y de pronto se dispara: así es el crecimiento exponencial. En escala logarítmica la duplicación perfecta es una recta. Después de 30 ciclos, una molécula se vuelve más de mil millones (2³⁰ = 1 073 741 824). Al final la curva se aplana: se acabaron los cebadores y los nucleótidos.')),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Tres pruebas antes de seguir'), tareas),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Ahora, la explicación'),
        h('div',{class:'grid g3'},
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'95 °C · separar'), h('p',{},'El calor rompe los puentes de hidrógeno entre las bases complementarias. La doble hélice se abre en dos hebras sueltas, que sirven de molde.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'55 °C · alinear'), h('p',{},'Al enfriar, los cebadores —dos trozos de unas 20 bases— se aparean con los extremos de la región a copiar. Si está muy caliente no se quedan; si está muy frío se pegan también donde no deben.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'72 °C · extender'), h('p',{},'La polimerasa parte del cebador y va añadiendo nucleótidos complementarios de 5′ a 3′. Cada hebra molde queda con su pareja nueva: el número de copias se duplica.'))),
        btcNota('ok','El truco que hizo posible la PCR:','Kary Mullis la ideó en 1983 (Premio Nobel de Química de 1993). Al principio había que añadir polimerasa nueva después de cada calentamiento. Todo cambió con la Taq, la polimerasa de Thermus aquaticus, una bacteria que vive en aguas termales a más de 70 °C: sus proteínas no se desnaturalizan a 95 °C.'),
        h('p',{class:'small muted'},'La PCR se usa para diagnosticar infecciones (las pruebas PCR de COVID-19 detectaban el ARN del virus tras copiarlo a ADN), identificar personas por su ADN, detectar mutaciones y rastrear especies a partir de restos de ADN en el agua o el suelo.')),
      secNav());
  }

  /* =================================================================
     3 · ELECTROFORESIS Y HUELLA GENÉTICA
     ================================================================= */
  function secGel(){
    const G = St.gel;
    const cvA = h('canvas',{class:'btc-gel'}), cvB = h('canvas',{class:'btc-gel'});
    const estA = h('div',{class:'stack',style:'gap:6px'});
    const medida = h('div',{class:'stack',style:'gap:6px'});
    const lectB = h('div',{class:'stack',style:'gap:6px'});
    const quizCaso = h('div',{});
    let raf = 0; limpiezas.push(() => cancelAnimationFrame(raf));
    let tSlider = null;
    function dibA(){
      const r = btcGel(cvA, { lanes:BTC_GEL_A, V:G.V, t:G.t, pol:G.pol, agar:G.agar, H:340 });
      estA.innerHTML = '';
      if (G.pol === 'inv' && G.t > 0) estA.append(btcNota('bad','Electrodos al revés.','El ADN tiene carga negativa por sus grupos fosfato y viaja siempre hacia el polo positivo (ánodo). Con los cables invertidos las muestras salieron por arriba del pozo y se perdieron en el tampón.'));
      else if (r.perdidas > 0) estA.append(btcNota('warn','Se salieron ' + r.perdidas + ' bandas por el fondo del gel.','Corriste demasiado tiempo o con demasiado voltaje: los fragmentos más pequeños, que son los más rápidos, ya salieron del gel. Baja el tiempo.'));
      else if (G.t > 0 && G.t < 20) estA.append(btcNota('info','Todavía muy juntas.','Las bandas empezaron a separarse, pero aún no se pueden leer bien. Deja correr más tiempo.'));
      else if (G.t >= 20) estA.append(btcNota('ok','Gel legible.','Ya se distinguen las bandas del marcador. Compara las alturas: ¿qué muestra llegó más lejos?'));
      if (G.V >= 150 && G.t > 0) estA.append(btcNota('warn','150 V:','el gel se calienta, las bandas se deforman en "sonrisa" y se ven borrosas. Más rápido no siempre es mejor.'));
      if (G.t >= 20 && G.pol === 'ok') St.marcas.gel = true;
    }
    function encender(btn){
      if (G.pol === 'ok' && G.t >= 40) G.t = 0;
      const meta = 40;
      if (btcQuieto()){ G.t = meta; if (tSlider) tSlider.value = String(G.t); dibA(); return; }
      btn.disabled = true;
      const t0 = performance.now(), ini = G.t;
      const loop = now => { const f = clamp((now - t0)/1800, 0, 1); G.t = Math.round(ini + (meta - ini)*f);
        if (tSlider){ tSlider.value = String(G.t); tSlider.dispatchEvent(new Event('sync')); }
        dibA(); if (f < 1) raf = requestAnimationFrame(loop); else btn.disabled = false; };
      raf = requestAnimationFrame(loop);
    }
    const sl = btcSlider('Tiempo de corrida', 0, 90, 5, G.t, v => v+' min', v => { G.t = v; dibA(); });
    tSlider = sl.querySelector('input');
    tSlider.addEventListener('sync', () => { sl.querySelector('b').textContent = G.t + ' min'; });
    const btnOn = h('button',{class:'btn primary', onclick:e => encender(e.currentTarget)},'⚡ Encender la fuente 40 min');

    /* medir la muestra X */
    const inp = h('input',{ type:'number', min:'50', max:'1500', step:'10', placeholder:'pb', 'aria-label':'Tamaño estimado de la muestra X en pares de bases', style:'width:110px;padding:6px 8px;border:1px solid var(--line);border-radius:8px;background:var(--bg-2);color:var(--ink)' });
    const fbM = h('div',{});
    function comprobar(){
      const v = parseFloat(String(inp.value).replace(',', '.'));
      fbM.innerHTML = '';
      if (!(G.t >= 20 && G.pol === 'ok')){ fbM.append(btcNota('warn','Primero corre el gel.','Con las bandas todavía en el pozo no hay nada que medir: enciende la fuente con los electrodos bien puestos.')); return; }
      if (!isFinite(v)){ fbM.append(btcNota('warn','Escribe un número.','Da tu estimación en pares de bases (pb), por ejemplo 350.')); return; }
      if (v >= 400 && v <= 500){ St.marcas.gelMedida = true; fbM.append(btcNota('ok','Bien leído.','La banda de X cae entre las bandas de 400 y 500 pb del marcador: mide unos 450 pb. Así se mide cualquier fragmento: comparándolo con una escalera de tamaños conocidos que corrió en el mismo gel.')); }
      else if (v > 500 && v <= 1000) fbM.append(btcNota('warn','Te pasaste.','Una banda más grande estaría más cerca de los pozos. Busca la banda del marcador que está justo encima de X y la que está justo debajo.'));
      else if (v < 400 && v >= 100) fbM.append(btcNota('warn','Te quedaste corto.','Una banda más pequeña habría llegado más abajo. Compara X con las bandas del marcador de su misma altura.'));
      else fbM.append(btcNota('warn','Fuera del rango del marcador.','El marcador va de 100 a 1000 pb y X está dentro de ese rango. Lee las etiquetas de la izquierda.'));
    }
    medida.append(h('p',{class:'small'},'La muestra X es el producto de una PCR. ¿Cuántos pares de bases (pb) mide? Estímalo con el marcador.'),
      h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'}, inp, h('button',{class:'btn sm primary', onclick:comprobar},'Comprobar')), fbM);

    /* caso de filiación */
    const madre = BTC_CASO[1], hijo = BTC_CASO[2];
    const paternas = hijo.bands.filter(b => !madre.bands.includes(b));
    function dibB(){
      btcGel(cvB, { lanes:BTC_CASO, V:100, t:40, pol:'ok', agar:'1.5', H:370, sel:G.sel,
        overlay:(x, geo) => {
          const ix = id => BTC_CASO.findIndex(l => l.id === id);
          const xH = geo.pos[ix('Hi')], xM = geo.pos[ix('Ma')], half = Math.min(58, geo.lw*0.62)/2;
          x.font = '700 10px "IBM Plex Sans",sans-serif'; x.textAlign = 'right';
          if (G.madre){
            hijo.bands.forEach(b => { if (!madre.bands.includes(b)) return; const y = geo.yOf(b);
              x.strokeStyle = 'rgba(140,200,255,.8)'; x.lineWidth = 1.2; x.setLineDash([3,3]);
              x.beginPath(); x.moveTo(xM + half, y); x.lineTo(xH - half, y); x.stroke(); x.setLineDash([]);
              x.fillStyle = '#9fd3ff'; x.fillText('M', xH - half - 3, y - 3); });
          }
          if (G.sel && G.sel !== 'Ma'){
            const c = BTC_CASO[ix(G.sel)], xc = geo.pos[ix(G.sel)];
            paternas.forEach(b => { const y = geo.yOf(b);
              if (c.bands.includes(b)){
                x.strokeStyle = 'rgba(140,255,180,.85)'; x.lineWidth = 1.4; x.setLineDash([4,3]);
                x.beginPath(); x.moveTo(xH + half, y); x.lineTo(xc - half, y); x.stroke(); x.setLineDash([]);
                x.fillStyle = '#8cffb4'; x.textAlign = 'left'; x.font = '700 12px "IBM Plex Sans",sans-serif'; x.fillText('✓', xc + half + 3, y + 4);
              } else {
                x.strokeStyle = '#ff7a7a'; x.lineWidth = 1.5; x.setLineDash([3,3]); x.strokeRect(xc - half, y - 4, half*2, 8); x.setLineDash([]);
                x.fillStyle = '#ff7a7a'; x.textAlign = 'left'; x.font = '700 12px "IBM Plex Sans",sans-serif'; x.fillText('✗', xc + half + 3, y + 4);
              }
            });
          }
        } });
      lectB.innerHTML = '';
      if (G.madre) lectB.append(btcNota('info','Lo que vino de la madre:','Las bandas marcadas con «M» (180, 330, 640 y 760 pb) están también en ella. Las otras cuatro bandas del hijo —' + paternas.join(', ') + ' pb— no pueden venir de la madre: <b>tienen que venir del padre biológico</b>.'));
      if (G.sel && G.sel !== 'Ma'){
        const c = BTC_CASO.find(l => l.id === G.sel);
        const tiene = paternas.filter(b => c.bands.includes(b)), falta = paternas.filter(b => !c.bands.includes(b));
        const comp = hijo.bands.filter(b => c.bands.includes(b));
        lectB.append(h('div',{class:'notice '+(falta.length ? 'warn' : 'ok')}, h('span',{},
          h('b',{}, 'Candidato ' + c.n + ': '),
          'comparte ' + comp.length + ' bandas con el hijo en total. De las cuatro que el hijo no heredó de la madre, tiene ' + tiene.length + (tiene.length ? ' (' + tiene.join(', ') + ' pb)' : '') + (falta.length ? ' y le faltan ' + falta.length + ' (' + falta.join(', ') + ' pb).' : '.'))));
        if (!G.madre) lectB.append(h('p',{class:'small muted'},'Pista: activa «Marcar lo que vino de la madre» antes de sacar conclusiones.'));
      }
    }
    const ctrB = h('div',{class:'stack',style:'gap:8px'},
      h('label',{class:'row',style:'gap:8px;font-size:.88rem'},
        h('input',{ type:'checkbox', checked:G.madre || null, onchange:e => { G.madre = e.target.checked; dibB(); } }), 'Marcar las bandas del hijo que también tiene la madre'),
      btcSeg('Comparar el hijo con…', [{ v:'', n:'Nadie' },{ v:'A', n:'Candidato A' },{ v:'B', n:'Candidato B' },{ v:'C', n:'Candidato C' }], ()=>G.sel||'', v => { G.sel = v || null; dibB(); }));
    const tablaB = h('div',{class:'tablewrap'}, h('table',{class:'data','aria-label':'Tamaños de las bandas de cada persona, en pares de bases'},
      h('thead',{}, h('tr',{}, h('th',{},'Carril'), h('th',{},'Bandas (pb), de mayor a menor'))),
      h('tbody',{}, BTC_CASO.slice(1).map(l => h('tr',{}, h('td',{}, l.n === 'A' || l.n === 'B' || l.n === 'C' ? 'Candidato ' + l.n : l.n), h('td',{class:'mono'}, l.bands.slice().reverse().join(' · ')))))));
    quizCaso.append(quizBlock({
      q:'Según el gel, ¿quién puede ser el padre biológico?',
      ops:['El candidato A, porque comparte con el hijo las bandas de 210 y 370 pb.',
           'El candidato B: tiene las cuatro bandas que el hijo no recibió de la madre (210, 370, 560 y 840 pb).',
           'El candidato C, porque comparte cuatro bandas con el hijo.',
           'No se puede saber nada sin analizar a los abuelos.'],
      ok:1, fb:'B es compatible en los cuatro marcadores y A y C quedan excluidos. Ojo con el lenguaje: el ADN excluye con certeza, pero incluir es una probabilidad. Con 4 marcadores sería una probabilidad baja; un laboratorio acreditado analiza de 15 a 24 marcadores antes de informar.',
      wrong:['A tiene dos de las bandas paternas, pero le faltan 560 y 840 pb. Si fuera el padre, el hijo tendría que haber recibido de él un alelo en cada marcador.',
             'Las cuatro bandas que C comparte con el hijo son justamente las que el hijo heredó de la madre. Activa «Marcar lo que vino de la madre» y vuelve a comparar.',
             'Con la madre y el hijo ya se deduce qué bandas aportó el padre. Los abuelos solo se usan cuando el presunto padre no está disponible.'] }, () => { St.marcas.caso = true; }));

    setTimeout(() => { dibA(); dibB(); }, 0);
    alRedimensionar(() => { dibA(); dibB(); });

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Parte A · Corre tu propio gel'),
        h('p',{},'Cargaste cuatro muestras en un gel de agarosa sumergido en un tampón: un marcador de tamaños conocidos (100 a 1000 pb), el producto de una PCR (X), un ADN cortado con una enzima (Y) y una PCR hecha con el alineamiento a 42 °C (Z). Enciende la fuente y observa.'),
        h('div',{class:'btc-two'},
          h('div',{class:'stack'}, cvA, estA),
          h('div',{class:'stack',style:'gap:10px'},
            btnOn, sl,
            btcSeg('Voltaje', [{ v:60, n:'60 V' },{ v:100, n:'100 V' },{ v:150, n:'150 V' }], ()=>G.V, v => { G.V = v; dibA(); }),
            btcSeg('Electrodos', [{ v:'ok', n:'Negro arriba (−), rojo abajo (+)' },{ v:'inv', n:'Invertidos' }], ()=>G.pol, v => { G.pol = v; dibA(); }),
            btcSeg('Agarosa', [{ v:'0.8', n:'0,8 %' },{ v:'1.5', n:'1,5 %' },{ v:'2', n:'2 %' }], ()=>G.agar, v => { G.agar = v; dibA(); }),
            h('p',{class:'small muted'},'Una agarosa más concentrada es una malla más cerrada: separa mejor los fragmentos pequeños, pero todo avanza más despacio.'),
            medida))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Lo que acabas de ver'),
        h('div',{class:'grid g3'},
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'¿Por qué se mueve?'), h('p',{},'Cada nucleótido lleva un grupo fosfato con carga negativa. En el campo eléctrico, todo el ADN viaja hacia el polo positivo.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'¿Por qué se separa?'), h('p',{},'La carga por nucleótido es la misma en todos los fragmentos. Lo que los diferencia es la malla de agarosa: los cortos se escurren y los largos se enredan.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'¿Y la muestra Z?'), h('p',{},'Con los cebadores pegándose donde no deben, la PCR produjo muchos fragmentos de tamaños distintos: bandas extra y un "barrido" difuso. Así se ve en un gel un error de temperatura.')))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Parte B · Caso: una prueba de filiación'),
        h('p',{},'Un juzgado de la familia pide una prueba de ADN para resolver una demanda de pensión alimenticia. El laboratorio analiza cuatro marcadores —regiones del ADN con repeticiones cuya longitud varía mucho entre personas— de la madre, del hijo y de tres candidatos. Cada persona tiene dos versiones (alelos) de cada marcador: una heredada de su madre y otra de su padre.'),
        h('div',{class:'btc-two'},
          h('div',{class:'stack'}, cvB, h('p',{class:'small muted'},'Sobre el gel: «M» = banda que el hijo comparte con la madre; ✓ = el candidato tiene esa banda paterna; ✗ = le falta.')),
          h('div',{class:'stack'}, ctrB, lectB, tablaB)),
        quizCaso,
        btcNota('info','Con cuidado y con derechos:','Las pruebas de ADN solo se hacen con consentimiento o por orden judicial, en laboratorios acreditados, con cadena de custodia de las muestras y con confidencialidad de los resultados. La misma técnica sirve para identificar a personas desaparecidas y devolverlas a sus familias, y ha permitido liberar a cientos de personas condenadas injustamente en otros países.')),
      secNav());
  }

  /* =================================================================
     4 · ADN RECOMBINANTE E INSULINA
     ================================================================= */
  function secRecombinante(){
    const R = St.rec;
    const stage = h('div',{class:'stage btc-stage'});
    const panel = h('div',{class:'panel stack'});
    const esquema = h('div',{});
    const texto = h('div',{class:'stack',style:'gap:6px'});
    const fb = h('div',{});
    const herr = h('div',{class:'btc-tools',role:'group','aria-label':'Herramientas del laboratorio'});
    const cvPl = h('canvas',{class:'btc-cv'});
    const placaWrap = h('div',{class:'stack',style:'display:none'});
    placaWrap.append(h('span',{class:'eyebrow gen'},'Selección en placas de Petri'), cvPl,
      h('p',{class:'small muted'},'Las colonias de la placa sin antibiótico son sobre todo bacterias que no recibieron el plásmido: son la mayoría. La ampicilina deja vivas solo a las transformadas.'));

    const ORDEN = ['enzima','gen','ligasa','choque','placa','ferm'];
    if (webglOK){ try { Esc = btcEscena(stage); } catch(e){ console.warn('btc 3D', e); Esc = null; } }
    if (!Esc){
      stage.classList.remove('btc-stage'); stage.style.minHeight = '0'; stage.style.height = 'auto';
    }
    const esquema2d = h('div',{class:'btc-2d'});
    if (!Esc) stage.append(h('div',{class:'ph',style:'padding:10px'},'Sin WebGL: el mismo proceso en un esquema 2D.'), esquema2d);
    else stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Arrastra para girar · rueda para acercar · flechas del teclado')));

    function pintar(){
      esquema.innerHTML = btcPlasmidoSVG(R.paso);
      if (!Esc) esquema2d.innerHTML = btcPlasmidoSVG(R.paso);
      texto.innerHTML = '';
      const P = BTC_PASOS_REC[R.paso];
      texto.append(h('h3',{style:'margin:0'}, P.t), h('p',{class:'small',html:P.d}));
      if (R.paso === 1) texto.append(h('pre',{class:'mono small',style:'margin:0;background:var(--bg-3);padding:8px;border-radius:8px;overflow:auto','aria-label':'Corte de EcoRI: la hebra de arriba G, AATTC; la de abajo CTTAA, G'},
        "5′ …G       AATTC… 3′\n3′ …CTTAA       G… 5′"));
      herr.innerHTML = '';
      BTC_HERR.forEach((t, k) => herr.append(h('button',{ type:'button', class: k < R.paso ? 'used' : '', disabled: R.paso >= 6 || null,
        'aria-label': t.n + '. ' + t.d, onclick:()=>usar(t.id) }, t.n, h('small',{}, t.d))));
      placaWrap.style.display = R.paso >= 5 ? '' : 'none';
      if (R.paso >= 5) setTimeout(() => btcPlacas(cvPl), 0);
    }
    function usar(id){
      fb.innerHTML = '';
      if (R.paso >= 6) return;
      if (ORDEN[R.paso] === id){
        R.paso++;
        if (Esc) try { Esc.ir(R.paso); } catch(e){ console.warn(e); }
        if (R.paso >= 6){ St.marcas.recombinante = true;
          fb.append(btcNota('ok','¡Insulina humana fabricada por bacterias!','Recorriste el mismo camino que siguió la primera insulina recombinante, aprobada en 1982. Hoy casi toda la insulina que usan las personas con diabetes se produce así, en bacterias o levaduras.')); }
        Store.log('paso',{ recurso:'biotecnologia', parte:'recombinante', paso:R.paso });
      } else {
        const m = (BTC_ERR_REC[R.paso] || {})[id] || 'Ese no es el paso que sigue. Mira el esquema: ¿qué le falta al plásmido ahora?';
        fb.append(btcNota('warn','Todavía no.', m));
      }
      pintar();
    }
    if (Esc) Esc.ir(R.paso);
    pintar();

    panel.append(
      h('span',{class:'eyebrow gen'},'Elige la herramienta del paso que sigue'),
      herr, fb, texto,
      h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'},
        h('button',{class:'btn sm ghost', onclick:()=>{ R.paso = 0; fb.innerHTML = ''; if (Esc) Esc.ir(0); pintar(); }},'Empezar de nuevo')));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'El problema'),
        h('p',{html:'En la diabetes tipo 1 el páncreas deja de producir <b>insulina</b>, la hormona que permite a las células tomar glucosa de la sangre. Hasta 1982 la insulina se extraía de páncreas de cerdos y vacas: hacían falta toneladas de órganos y algunas personas reaccionaban contra la proteína animal. La idea: que una bacteria fabrique la insulina humana leyendo el gen humano.'}),
        h('div',{class:'row',style:'gap:6px'}, h('a',{class:'btn sm',href:'#/explorar/pancreas'},'Ver el páncreas y los islotes en 3D'))),
      h('div',{class:'viewer'}, stage, panel),
      h('div',{class:'grid g2'},
        Esc ? h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Esquema del paso actual'), esquema) : null,
        h('div',{class:'card stack'}, placaWrap,
          h('span',{class:'eyebrow gen'},'Transgénico: qué significa'),
          h('p',{class:'small'},'Un organismo transgénico (u organismo genéticamente modificado, OGM) es el que lleva un gen de otra especie introducido por ingeniería genética. La bacteria que fabrica insulina humana lo es. También lo son el maíz Bt, que produce una proteína insecticida de la bacteria Bacillus thuringiensis, y la papaya resistente al virus de la mancha anular, cultivada en Hawái.'),
          h('p',{class:'small muted'},'El mismo método da la hormona del crecimiento, factores de coagulación para la hemofilia, vacunas como la de la hepatitis B y el cuajo que se usa en muchos quesos.'))),
      secNav());
  }

  /* =================================================================
     5 · CRISPR-Cas9
     ================================================================= */
  function secCRISPR(){
    const C = St.cr;
    const seqEl = h('div',{class:'btc-seq','aria-hidden':'true'});
    const estado = h('div',{class:'stack',style:'gap:6px'});
    const guiaEl = h('div',{class:'mono small'});
    const repEl = h('div',{class:'stack',style:'gap:8px'});
    const maxI = BTC_SEQ.length - 23;
    const rango = h('input',{ type:'range', min:'0', max:String(maxI), step:'1', value:String(C.i), 'aria-label':'Posición de la guía de ARN sobre el gen',
      oninput:e => { C.i = parseInt(e.target.value, 10); C.cortado = false; C.rep = null; pintar(); } });
    const mover = d => { C.i = clamp(C.i + d, 0, maxI); rango.value = String(C.i); C.cortado = false; C.rep = null; pintar(); };
    const btCortar = h('button',{class:'btn primary', onclick:()=>{ const g = btcGuia(C.i); if (!g.ok) return; C.cortado = true; C.rep = null; if (g.cerca) St.marcas.crispr = true; pintar(); }},'✂ Enviar Cas9 con esta guía');

    function pintar(){
      const g = btcGuia(C.i);
      seqEl.innerHTML = '';
      for (let k=0;k<BTC_SEQ.length;k++){
        let cls = 'btc-nt';
        if (k >= g.i && k < g.i + 20) cls += ' win';
        if (k >= g.i + 20 && k < g.i + 23) cls += g.ok ? ' pam' : ' nopam';
        if (k === BTC_MUT) cls += ' mut';
        if (k >= BTC_ATG && k < BTC_ATG + 3) cls += ' atg';
        if (C.cortado && g.ok && k === g.corte - 1) cls += ' cut';
        const sp = h('span',{class:cls}, BTC_SEQ[k]);
        if (k % 10 === 0) sp.append(h('span',{class:'btc-ix'}, String(k+1)));
        seqEl.append(sp);
      }
      guiaEl.textContent = 'ARN guía (5′→3′): ' + BTC_SEQ.substr(g.i, 20).replace(/T/g, 'U') + '   ·   siguientes 3 bases: ' + g.pam;
      estado.innerHTML = '';
      if (!g.ok) estado.append(btcNota('warn','Cas9 no se engancha aquí.','Justo después de tu guía viene «' + g.pam + '». Cas9 solo se une al ADN donde hay un PAM con la forma NGG (cualquier base seguida de dos G). Sin PAM no abre la doble hélice, aunque la guía coincida perfectamente.'));
      else if (!g.cerca) estado.append(btcNota('info','Hay PAM (' + g.pam + '): Cas9 cortaría aquí.','Pero el corte queda a unos ' + Math.round(g.dist) + ' nucleótidos de la mutación. Para corregirla con una plantilla, el corte tiene que quedar muy cerca: a más de 10 nucleótidos la corrección casi nunca ocurre. Busca otro PAM.'));
      else estado.append(btcNota('ok','Guía válida y bien ubicada.','PAM ' + g.pam + ' justo después, y Cas9 corta 3 nucleótidos antes del PAM: a ' + Math.round(g.dist) + ' nucleótidos de la mutación. Fíjate en un detalle real: esta secuencia se parece mucho a la del gen vecino HBD (globina delta). Una guía así podría cortar también allí; por eso se revisan los posibles cortes fuera de objetivo con programas y secuenciando.'));
      btCortar.disabled = !g.ok;
      repEl.innerHTML = '';
      if (C.cortado && g.ok){
        if (!g.cerca){ repEl.append(btcNota('warn','Cortaste, pero lejos.','La célula reparará el corte, pero la mutación queda igual. Mueve la guía hasta un PAM cercano a la base subrayada en rojo.')); }
        else {
          repEl.append(h('p',{style:'margin:0'},'La doble hélice está cortada. La célula tiene dos maneras de repararla. Elige una:'),
            h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'},
              h('button',{class:'btn'+(C.rep==='nhej'?' primary':''), onclick:()=>{ C.rep = 'nhej'; C.reps.nhej = true; if (C.reps.nhej && C.reps.hdr) St.marcas.reparacion = true; pintar(); }},'Unir los extremos sin molde (NHEJ)'),
              h('button',{class:'btn'+(C.rep==='hdr'?' primary':''), onclick:()=>{ C.rep = 'hdr'; C.reps.hdr = true; if (C.reps.nhej && C.reps.hdr) St.marcas.reparacion = true; pintar(); }},'Dar una plantilla de ADN corregida (HDR)')));
          const normal = BTC_SEQ.slice(0, BTC_MUT) + 'A' + BTC_SEQ.slice(BTC_MUT+1);
          const ref = btcTraducir(normal), falc = btcTraducir(BTC_SEQ);
          const fila = (titulo, aas, marca) => h('div',{class:'stack',style:'gap:3px'}, h('span',{class:'small muted'}, titulo),
            h('div',{class:'btc-prot'}, aas.map((a, k) => h('span',{ class: a === '*' ? 'stop' : marca(a, k) }, BTC_AA3[a] || a))));
          repEl.append(fila('β-globina normal (primeros aminoácidos)', ref, () => ''),
                       fila('Gen con la mutación falciforme (antes de editar)', falc, (a,k) => a !== ref[k] ? 'dif' : ''));
          if (C.rep === 'nhej'){
            const ed = BTC_SEQ.slice(0, g.corte - 1) + BTC_SEQ.slice(g.corte + 1);
            const p = btcTraducir(ed);
            repEl.append(fila('Tras NHEJ: se perdieron 2 nucleótidos en el corte', p, (a,k) => a !== ref[k] ? 'dif' : ''),
              btcNota('bad','El gen quedó roto, no corregido.','Al unir los extremos a la carrera, la célula suele perder o ganar unas pocas bases. Aquí se perdieron dos: se corre el marco de lectura, todos los codones siguientes cambian y aparece un codón de alto prematuro. NHEJ sirve para <b>apagar</b> un gen, no para arreglarlo.'));
          } else if (C.rep === 'hdr'){
            let ed = BTC_SEQ.slice(0, BTC_MUT) + 'A' + BTC_SEQ.slice(BTC_MUT+1);
            ed = ed.slice(0, 25) + 'C' + ed.slice(26);
            const p = btcTraducir(ed);
            repEl.append(fila('Tras HDR con la plantilla', p, (a,k) => a !== falc[k] ? 'fix' : ''),
              btcNota('ok','Mutación corregida.','La célula copió la plantilla: el codón 6 volvió a ser GAG (ácido glutámico). La plantilla trae además un cambio silencioso (CCT → CCC, sigue siendo prolina) para que Cas9 no reconozca el gen ya corregido y lo vuelva a cortar. En la vida real, HDR es mucho menos frecuente que NHEJ y casi solo ocurre en células que se están dividiendo.'));
          }
        }
      }
    }
    pintar();

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Editor CRISPR · el inicio del gen de la β-globina (HBB)'),
        h('p',{html:'En la <b>anemia falciforme</b> una sola base del gen de la β-globina cambió: el codón 6 dice GTG (valina) en lugar de GAG (ácido glutámico). La hemoglobina forma fibras, los glóbulos rojos se deforman en hoz y tapan los capilares. Tu misión: colocar una guía de ARN de 20 bases para que Cas9 corte cerca de esa base y la célula pueda corregirla.'}),
        seqEl,
        h('p',{class:'small muted',style:'margin:0'},'Azul: la zona que reconoce tu guía. Verde: PAM válido (NGG). Borde rojo punteado: no hay PAM. Base roja subrayada: la mutación. En negrita, el codón de inicio ATG. La línea roja vertical marca el corte.'),
        guiaEl,
        h('div',{class:'row',style:'gap:6px;flex-wrap:wrap;align-items:center'},
          h('button',{class:'btn sm', 'aria-label':'Mover la guía una base a la izquierda', onclick:()=>mover(-1)},'◀'),
          h('div',{style:'flex:1;min-width:180px'}, rango),
          h('button',{class:'btn sm', 'aria-label':'Mover la guía una base a la derecha', onclick:()=>mover(1)},'▶'),
          btCortar),
        h('div',{'aria-live':'polite'}, estado),
        h('p',{class:'small muted',style:'margin:0'},'Secuencia didáctica basada en el inicio del gen HBB. Para simplificar, aquí solo se busca PAM en la hebra de arriba; Cas9 también puede usar un PAM en la hebra complementaria.'),
        repEl),
      h('div',{class:'grid g3'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Cómo funciona'),
          h('p',{class:'small'},'CRISPR-Cas9 viene del sistema inmunitario de las bacterias: guardan trocitos del ADN de los virus que las atacaron y los usan como "fotos de búsqueda". Cas9 es una enzima que corta las dos hebras del ADN; el ARN guía le dice dónde. Jennifer Doudna y Emmanuelle Charpentier lo convirtieron en herramienta de edición en 2012 y recibieron el Premio Nobel de Química en 2020.')),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Uso real: Casgevy'),
          h('p',{class:'small'},'En noviembre de 2023 el Reino Unido, y en diciembre Estados Unidos, aprobaron Casgevy, la primera terapia con CRISPR, para la anemia falciforme (desde los 12 años); después también para la β-talasemia. No corrige la mutación: se extraen células madre de la sangre del paciente, se corta un regulador del gen BCL11A para que vuelvan a fabricar hemoglobina fetal, y se devuelven al paciente tras una quimioterapia.')),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Límites'),
          h('ul',{class:'small',style:'margin:0;padding-left:18px'},
            h('li',{},'Cortes fuera de objetivo en secuencias parecidas.'),
            h('li',{},'Hacer llegar Cas9 a las células correctas del cuerpo es difícil.'),
            h('li',{},'La quimioterapia previa es dura y puede causar infertilidad.'),
            h('li',{},'Precio: más de 2 millones de dólares por paciente en EE. UU.'),
            h('li',{},'Solo sirve para enfermedades causadas por pocos genes conocidos.')))),
      btcNota('info','Cerca de casa:','La anemia falciforme es una enfermedad hereditaria recesiva (repasa los cruces de la unidad de genética). En el Ecuador se presenta sobre todo en familias afrodescendientes, por ejemplo en Esmeraldas y en el valle del Chota. Ser portador de un solo alelo protege en parte contra la malaria: un ejemplo de selección natural en humanos.'),
      h('div',{class:'row',style:'gap:6px'}, h('a',{class:'btn sm',href:'#/explorar/cruces'},'Constructor de cruces'), h('a',{class:'btn sm ghost',href:'#/explorar/adn'},'ADN 3D y mutaciones')),
      secNav());
  }

  /* =================================================================
     6 · BIOÉTICA Y CONTEXTO ECUATORIANO
     ================================================================= */
  function secBioetica(){
    const E = St.et;
    const cls = h('div',{class:'btc-cls'});
    const resumen = h('div',{});
    function pintarCls(){
      cls.innerHTML = '';
      BTC_AFIRM.forEach((a, i) => {
        const r = E.resp[i];
        const box = h('div',{class: r === a.k ? 'ok' : ''},
          h('p',{}, a.t),
          h('div',{class:'btc-seg',role:'group','aria-label':'Clasificar la afirmación ' + (i+1)},
            ...[['dato','Dato verificable'],['valor','Valoración o postura']].map(([k,n]) => h('button',{ type:'button', 'aria-pressed':String(r===k),
              onclick:()=>{ E.resp[i] = k; pintarCls(); } }, n))));
        if (r) box.append(h('p',{class:'btc-fb'}, (r === a.k ? '✓ ' : '✗ ' + (a.k === 'dato' ? 'Es un dato: ' : 'Es una valoración: ')) + a.fb));
        cls.append(box);
      });
      const bien = BTC_AFIRM.filter((a,i) => E.resp[i] === a.k).length;
      resumen.innerHTML = '';
      resumen.append(h('div',{class:'notice ' + (bien === BTC_AFIRM.length ? 'ok' : 'info')},
        bien === BTC_AFIRM.length ? '8 de 8. Separar lo que se comprueba de lo que se opina es la base de cualquier debate honesto: los datos no deciden solos, pero una postura que los ignora no se sostiene.' : 'Clasificadas bien: ' + bien + ' de ' + BTC_AFIRM.length + '.'));
      if (bien === BTC_AFIRM.length) St.marcas.etica = true;
    }
    pintarCls();
    const nota = h('textarea',{class:'btc-note','aria-label':'Tu postura argumentada','placeholder':'Mi postura sobre los cultivos transgénicos en el Ecuador es… porque… Reconozco que quien piensa distinto tiene razón en que…'});

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Antes de opinar: ¿dato o valoración?'),
        h('p',{},'En los debates sobre biotecnología se mezclan afirmaciones que se pueden comprobar con otras que expresan lo que alguien considera justo, deseable o peligroso. Las dos cuentan, pero se discuten de manera distinta. Clasifica cada una.'),
        cls, resumen),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'1 · Transgénicos: qué dice la ley en el Ecuador'),
        h('blockquote',{class:'btc-quote'},
          '«Se declara al Ecuador libre de cultivos y semillas transgénicas. Excepcionalmente, y sólo en caso de interés nacional debidamente fundamentado por la Presidencia de la República y aprobado por la Asamblea Nacional, se podrán introducir semillas y cultivos genéticamente modificados. El Estado regulará bajo estrictas normas de bioseguridad, el uso y el desarrollo de la biotecnología moderna y sus productos, así como su experimentación, uso y comercialización. Se prohíbe la aplicación de biotecnologías riesgosas o experimentales.»',
          h('cite',{},'Constitución de la República del Ecuador (2008), artículo 401')),
        h('ul',{class:'small',style:'margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px'},
          h('li',{},'La excepción existe, pero exige dos cosas a la vez: que la Presidencia fundamente el interés nacional y que la Asamblea Nacional lo apruebe.'),
          h('li',{},'La Ley Orgánica de Agrobiodiversidad, Semillas y Fomento de la Agricultura Sustentable (2017) permitía en su artículo 56 el ingreso de semillas transgénicas con fines de investigación. En enero de 2022 la Corte Constitucional declaró inconstitucional esa excepción (sentencia 22-17-IN/22) porque no seguía el procedimiento del artículo 401.'),
          h('li',{},'La norma habla de cultivos y semillas. Es otra discusión la de los productos importados que contienen ingredientes transgénicos, como parte de la harina de soya para alimento balanceado; para los alimentos, la ley exige indicarlo en la etiqueta.')),
        h('div',{class:'btc-arg'},
          h('div',{}, h('h4',{},'Argumentos de quienes piden abrir la puerta'),
            h('ul',{},
              h('li',{},'Algunas variedades reducen el uso de insecticidas (maíz Bt) o resisten virus que arruinan cosechas (papaya de Hawái).'),
              h('li',{},'Las academias científicas que revisaron la evidencia, como las Academias Nacionales de EE. UU. en 2016, no encontraron más riesgo para la salud en los transgénicos aprobados que en los cultivos convencionales.'),
              h('li',{},'Prohibir la investigación impide que el país evalúe con datos propios variedades adaptadas a sus plagas y a su clima.'),
              h('li',{},'La mejora genética convencional también cambia el ADN de los cultivos, solo que de forma menos precisa.'))),
          h('div',{}, h('h4',{},'Argumentos de quienes defienden la prohibición'),
            h('ul',{},
              h('li',{},'El Ecuador guarda una gran diversidad de maíces, papas y fréjoles nativos; el polen transgénico puede cruzarse con ellos y es muy difícil de revertir.'),
              h('li',{},'Las semillas patentadas se compran cada temporada y pueden aumentar la dependencia de pocas empresas: es un tema de soberanía alimentaria (artículo 281 de la Constitución).'),
              h('li',{},'Algunos cultivos tolerantes a herbicidas se asociaron con más uso de glifosato y con malezas resistentes.'),
              h('li',{},'Ser un país libre de transgénicos puede ser una ventaja en mercados que pagan más por productos no modificados, como el cacao fino de aroma o los orgánicos.'))))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'2 · Bioprospección y biopiratería'),
        h('p',{},'El Ecuador es uno de los países con más especies por kilómetro cuadrado del planeta. Buscar en esa biodiversidad moléculas útiles para medicamentos, cosméticos o alimentos se llama bioprospección. Se vuelve biopiratería cuando se toman organismos o saberes de los pueblos sin permiso, se patentan y nadie comparte los beneficios con el país ni con las comunidades.'),
        h('div',{class:'grid g2'},
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'La rana y el analgésico'), h('p',{},'De la piel de una pequeña rana venenosa del suroccidente del Ecuador (Epipedobates) se aisló en los años setenta la epibatidina, un analgésico mucho más potente que la morfina. Las muestras salieron del país y la molécula dio lugar a patentes y compuestos derivados en el extranjero. El caso se cita a menudo como ejemplo de por qué hacen falta acuerdos de acceso.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'La patente de la ayahuasca'), h('p',{},'En 1986 un ciudadano estadounidense obtuvo en su país una patente sobre una variedad de ayahuasca, planta sagrada de los pueblos amazónicos. Las organizaciones indígenas de la cuenca amazónica la impugnaron; se anuló en 1999, se restableció en 2001 y expiró en 2003. El caso abrió el debate sobre patentar saberes ancestrales.'))),
        h('p',{class:'small'},'La Constitución prohíbe la apropiación de los conocimientos colectivos y de los recursos genéticos (artículo 322) y los derechos de propiedad intelectual sobre productos obtenidos a partir de conocimientos colectivos asociados a la biodiversidad nacional (artículo 402). A escala internacional, el Protocolo de Nagoya (2010) regula el acceso a los recursos genéticos y el reparto justo de los beneficios.'),
        btcNota('info','Las dos caras:','La bioprospección con permiso, consentimiento de las comunidades y reparto de beneficios puede financiar la conservación y la ciencia nacional. Sin reglas, la biodiversidad se vuelve una materia prima que otros aprovechan. La pregunta no es si investigar, sino en qué condiciones.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'3 · Editar genes humanos'),
        h('div',{class:'grid g2'},
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Edición somática'), h('p',{},'Se editan células del cuerpo de un paciente, como en Casgevy. El cambio no pasa a los hijos. Se discute sobre todo el precio, el acceso y la seguridad, como en cualquier tratamiento nuevo.')),
          h('div',{class:'tile',style:'cursor:default'}, h('h3',{},'Edición germinal'), h('p',{},'Se editan embriones, óvulos o espermatozoides: el cambio pasa a todas las generaciones siguientes. En 2018 un investigador chino anunció el nacimiento de dos niñas con embriones editados; fue condenado a prisión en su país y la comunidad científica lo rechazó. Hoy está prohibida o restringida en la mayoría de países.'))),
        h('div',{class:'btc-arg'},
          h('div',{}, h('h4',{},'Quienes ven posible la edición germinal en el futuro'),
            h('ul',{}, h('li',{},'Podría evitar enfermedades hereditarias graves en familias que no tienen otra alternativa.'),
              h('li',{},'Si se demuestra segura, negarla también sería una decisión con consecuencias para esas familias.'))),
          h('div',{}, h('h4',{},'Quienes piden no cruzar esa línea'),
            h('ul',{}, h('li',{},'Las personas futuras no pueden dar su consentimiento y los errores serían heredables.'),
              h('li',{},'Abre la puerta a "mejorar" rasgos no médicos y a nuevas desigualdades entre quienes puedan pagarlo y quienes no.'))))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Tu postura, con argumentos'),
        h('p',{class:'small'},'Escribe tu opinión sobre uno de los tres debates. Usa al menos un dato verificable y reconoce el mejor argumento de la postura contraria. No hay respuesta correcta: se evalúa la calidad del argumento.'),
        nota,
        h('div',{class:'row',style:'gap:6px'},
          h('button',{class:'btn sm primary', onclick:()=>{ const t = (nota.value || '').trim(); if (t.length < 40){ toast('Escribe un poco más: una postura y al menos un argumento.'); return; }
            try { Store.addNote('gen', 'Mi postura (biotecnología): ' + t, { recurso:'biotecnologia' }); toast('Guardado en tu cuaderno.'); } catch(e){ console.warn(e); } }},'Guardar en mi cuaderno'))),
      secNav());
  }

  /* =================================================================
     7 · RETO FINAL
     ================================================================= */
  function secReto(){
    const marcas = [
      ['extraccion','Hiciste una extracción de ADN completa'],
      ['variantes','Comparaste extracciones con decisiones distintas'],
      ['pcr','Corriste 30 ciclos de PCR con las condiciones correctas'],
      ['pcrTemp','Probaste una temperatura equivocada en la PCR'],
      ['pcrEcoli','Probaste la polimerasa de E. coli'],
      ['gel','Corriste un gel legible'],
      ['gelMedida','Mediste un fragmento con el marcador'],
      ['caso','Resolviste el caso de filiación'],
      ['recombinante','Fabricaste insulina en bacterias'],
      ['crispr','Colocaste una guía CRISPR válida junto a la mutación'],
      ['reparacion','Comparaste las dos formas de reparación'],
      ['etica','Separaste datos de valoraciones']
    ];
    const lista = h('ul',{class:'checks plain'});
    marcas.forEach(([k,t]) => lista.append(h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{}, (St.marcas[k]?'✓ ':'· ')+t))));
    const wrap = h('div',{class:'card stack'});
    let ok = 0, intentos = 0;
    wrap.append(
      h('span',{class:'eyebrow gen'},'🎯 Reto final · seis preguntas sobre lo que hiciste'),
      h('p',{class:'small muted'},'Todas se responden mirando un gel, una curva o un proceso de las secciones anteriores. Si te equivocas, la retroalimentación te dice a dónde volver.'));
    BTC_PREGUNTAS.forEach(p => wrap.append(quizBlock(p, (att) => {
      ok++; intentos += att;
      if (ok === BTC_PREGUNTAS.length){
        const hechas = marcas.filter(([k]) => St.marcas[k]).length;
        const min = Math.round((Date.now() - St.start)/60000);
        try {
          Store.completeActivity('reto-biotecnologia', {
            score: BTC_PREGUNTAS.length + '/' + BTC_PREGUNTAS.length,
            attempts: intentos - BTC_PREGUNTAS.length,
            duracionMin: min,
            tareas: hechas + '/' + marcas.length });
        } catch(e){ console.warn('completeActivity', e); }
        retoSt.className = 'notice ok';
        retoSt.innerHTML = '<span><b>¡Reto resuelto!</b> Seis de seis, con ' + hechas + ' de ' + marcas.length + ' tareas del recorrido completadas.</span>';
        wrap.append(btcNota('ok','Actividad completada y registrada en tu progreso.','Ya puedes explicar qué ocurre con las moléculas en una extracción, una PCR, un gel y una clonación, leer un perfil de ADN con cuidado y discutir los usos de la biotecnología distinguiendo datos de valoraciones.'));
        toast('Actividad completada: Reto de biotecnología ✓');
      }
    })));
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Lo que hiciste hasta aquí'), lista,
        h('p',{class:'small muted'},'Puedes responder aunque falte alguna casilla, pero cada tarea te da el argumento para una de las preguntas.')),
      wrap,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow gen'},'Para llevar al cuaderno'),
        h('p',{html:'<b>Extraer</b>: detergente rompe membranas, sal neutraliza los fosfatos, alcohol frío precipita el ADN. <b>Copiar</b>: la PCR repite 95 · 55 · 72 °C y duplica el fragmento en cada ciclo gracias a una polimerasa termoestable. <b>Separar</b>: en el gel el ADN va hacia el polo positivo y los fragmentos pequeños llegan más lejos. <b>Cortar y pegar</b>: enzima de restricción, extremos cohesivos, ligasa, transformación y selección. <b>Editar</b>: Cas9 corta donde el ARN guía coincide y hay un PAM; la célula repara con NHEJ (rompe) o HDR (corrige).'}),
        h('div',{class:'row',style:'flex-wrap:wrap;gap:6px'},
          h('button',{class:'btn sm', onclick:()=>{
            try { Store.addNote('gen','Biotecnología: extracción (detergente, sal, alcohol frío) · PCR 95/55/72 °C, 2ⁿ copias, Taq termoestable · gel: ADN al polo +, lo pequeño llega más lejos · insulina: EcoRI, extremos AATT, ligasa, choque térmico, ampicilina · CRISPR: guía de 20 nt + PAM NGG; NHEJ rompe, HDR corrige.', { recurso:'biotecnologia' });
              toast('Guardado en tu cuaderno.'); } catch(e){ console.warn(e); } }},'Guardar resumen en el cuaderno'),
          h('a',{class:'btn sm ghost', href:'#/explorar/evolucion'},'Seguir con selección natural'))),
      secNav());
  }

  /* =================================================================
     RENDER
     ================================================================= */
  function render(){
    soltar();
    renderNav(); body.innerHTML = '';
    const f = [secExtraccion, secPCR, secGel, secRecombinante, secCRISPR, secBioetica, secReto][St.sec];
    body.append(f());
    Store.log('seccion',{ recurso:'biotecnologia', seccion:SEC[St.sec].id });
  }
  render();
  return { unmount(){ soltar(); } };
}

route('/explorar/biotecnologia', (view) => btcVista(view));
</script>
