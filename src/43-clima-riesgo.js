<style>
/* ===== Tablero de clima, tiempo atmosférico y riesgo del Ecuador ===== */
.cli-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.cli-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.cli-nav button[aria-current="true"]{background:var(--eco);border-color:var(--eco);color:#fff}
.cli-nav button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.cli-rows{display:grid;gap:8px}
.cli-row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:9px 12px;background:var(--bg-2)}
.cli-row p{margin:0;font-size:.88rem;line-height:1.35}
.cli-row .opts{display:flex;gap:5px;flex-wrap:wrap}
.cli-row .fbk{grid-column:1/-1;font-size:.82rem;color:var(--ink-2);border-top:1px dashed var(--line);padding-top:7px;margin:0}
.cli-row.ok{border-color:var(--ok)}
.cli-row.bad{border-color:var(--bad)}
.cli-row .cli-mk{font-weight:700;font-size:.8rem;margin-right:5px}
.cli-opt{border:1.5px solid var(--line);background:var(--bg-3);color:var(--ink-2);border-radius:999px;padding:5px 11px;font:600 .76rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.cli-opt[aria-pressed="true"]{border-color:var(--eco);background:var(--eco);color:#fff}
.cli-opt:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.cli-art{width:100%;height:auto;background:var(--bg-3);border:1px solid var(--line);border-radius:14px;display:block}
.cli-legend{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;font-size:.76rem;color:var(--ink-3)}
.cli-legend span{display:inline-flex;align-items:center;gap:5px}
.cli-calc{display:grid;gap:3px;font-family:"IBM Plex Mono",monospace;font-size:.8rem;color:var(--ink-2);background:var(--bg-3);border:1px solid var(--line);border-radius:12px;padding:10px 12px}
.cli-calc b{font-family:"IBM Plex Sans",sans-serif}
.cli-calc .tot{border-top:1px solid var(--line);margin-top:4px;padding-top:5px;color:var(--ink);font-weight:700}
.cli-gauge{height:16px;border-radius:999px;background:var(--bg-3);border:1px solid var(--line);position:relative;overflow:hidden}
.cli-gauge i{position:absolute;inset:0 auto 0 0;display:block;background:var(--ok);transition:width .35s ease}
.cli-gauge b{position:absolute;top:0;bottom:0;width:2px;background:var(--ink);opacity:.55}
.cli-meas{display:grid;gap:7px}
.cli-meas label{display:grid;grid-template-columns:auto 1fr;gap:9px;align-items:start;border:1px solid var(--line);border-radius:11px;padding:8px 11px;background:var(--bg-2);cursor:pointer;font-size:.85rem}
.cli-meas label:focus-within{border-color:var(--accent)}
.cli-meas input{margin-top:3px}
.cli-meas small{display:block;color:var(--ink-3);font-size:.75rem;margin-top:2px}
.cli-bol{border:2px solid var(--line);border-radius:14px;background:var(--bg-2);overflow:hidden}
.cli-bol .hd{background:var(--bg-3);border-bottom:1px solid var(--line);padding:9px 13px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}
.cli-bol .sim{background:var(--bad);color:#fff;border-radius:6px;padding:2px 8px;font:700 .68rem/1.5 "IBM Plex Mono",monospace;letter-spacing:.06em}
.cli-bol .bd{padding:11px 13px;font-size:.87rem;line-height:1.45}
.cli-bol dl{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;margin:0 0 8px;font-size:.8rem}
.cli-bol dt{font-weight:600;color:var(--ink-2)}
.cli-bol dd{margin:0;color:var(--ink-2)}
.cli-chip{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--line);border-radius:999px;padding:1px 9px;font:600 .7rem/1.6 "IBM Plex Sans",sans-serif;color:var(--ink-2);background:var(--bg-3)}
.cli-err li{list-style:none;border-left:3px solid var(--bad);padding:2px 0 2px 11px;margin-bottom:9px;font-size:.86rem}
.cli-err b{display:block;color:var(--ink)}
.cli-flow{stroke-dasharray:9 7;animation:cli-flow 1.5s linear infinite}
@keyframes cli-flow{to{stroke-dashoffset:-32}}
.cli-bob{animation:cli-bob 3.4s ease-in-out infinite}
@keyframes cli-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
[data-motion="reducido"] .cli-flow,[data-motion="reducido"] .cli-bob{animation:none}
@media (max-width:640px){.cli-row{grid-template-columns:1fr}.cli-artw>svg.cli-art{min-width:600px}}
.cli-artw{overflow-x:auto;-webkit-overflow-scrolling:touch}
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · TABLERO DE CLIMA, TIEMPO ATMOSFÉRICO Y RIESGO
   8.º EGB · CVT U3 "Tierra, atmósfera, clima y riesgo"
   (AO.CVT.8.07 · AO.CVT.8.08 · AO.CVT.8.09)
   Apoya además 10.º CVT U2 (Tierra dinámica, océanos y cambio climático)
   y Biología U10.
   Ruta: #/cn/clima · Actividad: cn-clima
   ===================================================================== */

/* La actividad se registra aquí para no tocar src/03-data.js */
if (typeof BIO !== 'undefined' && BIO.activities && !BIO.activities['cn-clima'])
  Object.assign(BIO.activities, { 'cn-clima': { t:'Tablero de clima y riesgo', unidad:null, peso:0, xp:120 } });
if (typeof ACT_HREF !== 'undefined') ACT_HREF['cn-clima'] = '#/cn/clima';

/* ---------- Utilidades de formato (español de Ecuador: coma decimal) ---------- */
const cliN   = (v, d = 1) => Number(v).toFixed(d).replace('.', ',');
const cliMil = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const cliMotion = () => (typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion);
const CLI_MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const CLI_MESL = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

/* =====================================================================
   DATOS CLIMÁTICOS APROXIMADOS
   Valores redondeados con fines didácticos, construidos a partir de
   promedios climáticos publicados para cada localidad. NO son datos
   oficiales: la fuente oficial en el Ecuador es el INAMHI.
   ===================================================================== */
const CLI_CIUDADES = {
  guayaquil: { id:'guayaquil', n:'Guayaquil', reg:'Costa', em:'🌴', alt:4, mar:55,
    d:'Llanura del Guayas, casi al nivel del mar y a unos 55 km del océano abierto.',
    t:[27.0,27.4,27.6,27.4,26.8,25.8,25.0,24.8,25.1,25.2,25.6,26.5],
    p:[220,270,250,150,50,15,5,3,4,6,10,45],
    nota:'Dos estaciones muy marcadas: lluviosa de enero a mayo, seca de junio a diciembre.' },
  quito: { id:'quito', n:'Quito', reg:'Sierra', em:'⛰️', alt:2850, mar:230,
    d:'Valle interandino a 2.850 m, entre la cordillera Occidental y la Oriental.',
    t:[13.6,13.5,13.5,13.5,13.5,13.4,13.4,13.8,13.9,13.8,13.6,13.6],
    p:[110,125,155,180,115,50,25,30,80,130,110,100],
    nota:'La temperatura casi no cambia entre meses, pero sí entre el día y la noche. Dos periodos de lluvia: febrero–abril y octubre–noviembre.' },
  puyo: { id:'puyo', n:'Puyo', reg:'Amazonía', em:'🌳', alt:950, mar:320,
    d:'Piedemonte amazónico, en la vertiente oriental de los Andes, a 950 m.',
    t:[21.0,20.9,20.8,21.0,20.9,20.5,20.1,20.4,21.0,21.3,21.4,21.2],
    p:[340,360,400,450,440,430,390,330,340,400,420,390],
    nota:'Llueve los doce meses del año: no hay una verdadera estación seca.' },
  ayora: { id:'ayora', n:'Puerto Ayora', reg:'Galápagos', em:'🐢', alt:6, mar:0,
    d:'Isla Santa Cruz, en pleno océano Pacífico, a unos 1.000 km del continente.',
    t:[26.5,27.3,27.5,27.4,26.3,24.8,23.6,23.0,23.1,23.4,24.1,25.5],
    p:[40,70,90,70,35,20,15,10,8,10,12,25],
    nota:'Estación cálida y lluviosa de enero a mayo; de junio a diciembre domina la garúa, con mar frío y cielo cubierto pero poca lluvia acumulada.' }
};
const CLI_REGION = {
  Costa:     { color:'--warn', d:'Franja entre el océano Pacífico y la cordillera Occidental. Calurosa todo el año y con dos estaciones de lluvia muy contrastadas.' },
  Sierra:    { color:'--eco',  d:'Callejón interandino y páramos. La altitud manda: cuanto más alto, más frío, sin importar el mes.' },
  Amazonía:  { color:'--lab',  d:'Llanura y piedemonte al oriente de los Andes. Cálida y húmeda todo el año, alimentada por el aire que llega desde la cuenca amazónica.' },
  Galápagos: { color:'--cell', d:'Archipiélago en medio del océano: el mar decide su clima, y por eso es mucho más seco de lo que se esperaría en la línea equinoccial.' }
};
const cliSumP = c => c.p.reduce((a,b)=>a+b,0);
const cliMedT = c => c.t.reduce((a,b)=>a+b,0)/12;
const cliAmpT = c => Math.max(...c.t) - Math.min(...c.t);

/* ---------- Serie diaria simulada (30 días de octubre en Quito) ---------- */
function cliRnd(seed){ let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const CLI_DIARIA = (() => {
  const r = cliRnd(20261003), prom = 13.8, dias = [];
  for (let i = 1; i <= 30; i++){
    let v = prom + (r()*2-1)*2.4 + (r()*2-1)*1.2;
    if (i === 18) v = 9.6;          /* día atípico: frente frío y granizo */
    if (i === 7)  v = 17.4;         /* día despejado y muy soleado */
    dias.push({ d:i, v: Math.round(v*10)/10, prom });
  }
  return dias;
})();

/* =====================================================================
   1 · AFIRMACIONES: ¿TIEMPO ATMOSFÉRICO O CLIMA?
   ===================================================================== */
const CLI_AFIRMA = [
  { t:'«Mañana llueve en Guayaquil: se esperan unos 20 mm entre las 14:00 y las 17:00.»', k:'tiempo',
    fb:'Es tiempo atmosférico: describe qué va a ocurrir en un lugar concreto durante unas pocas horas. La escala es de horas o días.' },
  { t:'«La Costa ecuatoriana tiene dos estaciones marcadas: lluviosa de enero a mayo y seca el resto del año.»', k:'clima',
    fb:'Es clima: describe el comportamiento habitual, repetido año tras año. Para afirmarlo hacen falta series de 30 años, no la lluvia de una semana.' },
  { t:'«Hoy en Quito la temperatura máxima llegó a 21,3 °C y por la noche bajó a 8,4 °C.»', k:'tiempo',
    fb:'Es tiempo atmosférico: es la medición de un día. Un solo día no define el clima de Quito, igual que una sola nota no define tu promedio del año.' },
  { t:'«En Quito la temperatura media anual ronda los 13,6 °C y casi no cambia entre meses.»', k:'clima',
    fb:'Es clima: es un promedio calculado sobre muchos años. Fíjate en la palabra "media anual": ningún día concreto marcó exactamente 13,6 °C.' },
  { t:'«Se prevé una noche fría en Riobamba, con posible helada de madrugada.»', k:'tiempo',
    fb:'Es tiempo atmosférico: un pronóstico para las próximas horas. Que haya heladas frecuentes en julio y agosto sí sería una afirmación de clima.' },
  { t:'«Puyo recibe más de 4.000 mm de lluvia al año, repartidos en los doce meses.»', k:'clima',
    fb:'Es clima: un acumulado anual típico. Describe el patrón, no lo que pasa el martes que viene.' },
  { t:'«Esta semana el oleaje frente a Manta será más fuerte de lo habitual.»', k:'tiempo',
    fb:'Es tiempo atmosférico (y estado del mar): una desviación puntual respecto de lo habitual, en la escala de días.' },
  { t:'«En Galápagos, de junio a diciembre predomina la garúa y el mar está más frío.»', k:'clima',
    fb:'Es clima: es una estación que se repite todos los años. Está causada por la corriente fría de Humboldt, que refuerza su influencia en esos meses.' }
];

/* =====================================================================
   2 · MODELO DIDÁCTICO DE FACTORES DEL CLIMA
   Es un modelo simplificado: acierta la TENDENCIA, no el valor exacto.
   ===================================================================== */
const CLI_T0 = 27.0;           /* temperatura media al nivel del mar en la línea equinoccial */
const CLI_LAPSE = 6.0;         /* °C que se pierden por cada 1.000 m (gradiente de referencia) */
function cliModelo(st){
  const kMar = Math.max(0, 1 - st.dist/150);                       /* influencia del mar: se apaga a 150 km */
  const dAlt = -CLI_LAPSE * st.alt/1000;
  const dCor = st.cor === 'fria' ? -2.0*kMar : st.cor === 'calida' ? 1.6*kMar : 0;
  const dCont = 0.8 * Math.min(1, st.dist/300);                    /* continentalidad */
  const T = CLI_T0 + dAlt + dCor + dCont;
  const amp = 8 + 4*Math.min(1, st.dist/300) + 3*Math.min(1, st.alt/3000) - 3*kMar;
  const fLado = st.lado === 'barlo' ? 2.1 : st.lado === 'sota' ? 0.32 : 1.0;
  const fCor  = st.cor === 'fria' ? (1 - 0.50*kMar) : st.cor === 'calida' ? (1 + 1.00*kMar) : 1;
  const fAlt  = 1 + 0.45*Math.exp(-Math.pow((st.alt-1300)/1100, 2)) - 0.45*Math.min(1, st.alt/4000);
  const P = 1500 * fLado * fCor * fAlt;
  return { T, amp, P, kMar, dAlt, dCor, dCont, fLado, fCor, fAlt };
}
const CLI_PRESET = {
  guayaquil: { n:'Guayaquil (Costa)',        st:{ alt:0,    dist:55,  cor:'fria',   lado:'llano' }, realT:26.2, realP:900,  nota:'El modelo se queda algo frío: frente a Guayaquil el agua no es tan fría como en la costa del Perú, y el golfo de Guayaquil atempera.' },
  quito:     { n:'Quito (Sierra)',           st:{ alt:2850, dist:230, cor:'fria',   lado:'llano' }, realT:13.6, realP:1200, nota:'El modelo predice unos 3 °C menos que la realidad: en un valle interandino abrigado el suelo se calienta con el sol del mediodía y las montañas frenan el viento. La regla de los 6 °C por cada 1.000 m vale para el aire libre, no para un valle protegido.' },
  puyo:      { n:'Puyo (Amazonía)',          st:{ alt:950,  dist:320, cor:'ninguna',lado:'barlo' }, realT:20.8, realP:4400, nota:'Aquí el modelo acierta bien: el aire húmedo de la Amazonía choca contra la cordillera Oriental, sube, se enfría y descarga lluvia casi todos los días.' },
  seco:      { n:'Valle seco a sotavento',   st:{ alt:1600, dist:200, cor:'ninguna',lado:'sota'  }, realT:20.0, realP:500,  nota:'Valles como el del Chota o partes del valle del Patate reciben muy poca lluvia: el aire ya descargó su humedad en la ladera de enfrente y baja seco y templado.' }
};

/* =====================================================================
   3 · EL NIÑO Y LA NIÑA (esquema del Pacífico ecuatorial)
   ===================================================================== */
const CLI_ENSO = {
  normal: { id:'normal', n:'Condiciones normales', pill:'',
    oceano:'Los vientos alisios soplan de este a oeste y arrastran el agua caliente hacia Asia y Oceanía. Frente al Ecuador y al Perú el agua empujada se repone con agua fría que sube desde el fondo (afloramiento).',
    atmos:'El aire caliente y húmedo asciende sobre el Pacífico occidental y forma allí las grandes tormentas; sobre el Pacífico oriental el aire desciende y se seca.',
    ecuador:'Las lluvias siguen su calendario habitual: temporada lluviosa en la Costa de enero a mayo y seca el resto del año.',
    pesca:'El agua fría que aflora trae nutrientes: hay mucho plancton y la pesca es abundante.',
    wind:-1, term:[237,152], nube:0.18, lluviaEc:0.35, aflor:true, sst:'≈ 24 °C frente a la Costa' },
  nino: { id:'nino', n:'El Niño', pill:'bad',
    oceano:'Los alisios se debilitan o incluso se invierten. El agua caliente acumulada al oeste regresa hacia el este y se apila frente a la costa de Sudamérica. La capa caliente se hace tan gruesa que el afloramiento ya no alcanza el agua fría.',
    atmos:'Como el mar caliente está ahora frente al Ecuador, es aquí donde el aire asciende y se forman las tormentas. La circulación de la atmósfera se desplaza hacia el este.',
    ecuador:'Lluvias muy por encima de lo normal en la Costa, con inundaciones; en cambio, buena parte de la Sierra puede quedar con déficit de lluvia, porque la circulación que lleva humedad a la sierra se altera.',
    pesca:'Sin afloramiento no llegan nutrientes: el plancton escasea, los peces se van a aguas más profundas o más al sur y la pesca cae.',
    wind:0, term:[202,217], nube:0.62, lluviaEc:0.95, aflor:false, sst:'2 a 4 °C más caliente de lo normal' },
  nina: { id:'nina', n:'La Niña', pill:'ok',
    oceano:'Los alisios soplan con más fuerza que de costumbre y empujan aún más agua caliente hacia el oeste. El afloramiento de agua fría frente al Ecuador se intensifica.',
    atmos:'El ascenso de aire y las tormentas se concentran todavía más al oeste; sobre el Pacífico oriental el aire desciende con más fuerza y reseca la atmósfera.',
    ecuador:'Temporada lluviosa más débil o más corta en la Costa y, en algunos episodios, más lluvia de lo normal en la vertiente amazónica. Puede haber déficit de agua para el riego.',
    pesca:'El afloramiento es más intenso: mucho alimento, buenas capturas, pero el agua fría también estresa a otras especies.',
    wind:-1.6, term:[250,134], nube:0.10, lluviaEc:0.12, aflor:true, sst:'1 a 2 °C más frío de lo normal' }
};

function cliEnsoSVG(k){
  const E = CLI_ENSO[k], mov = cliMotion(), fl = mov ? ' cli-flow' : '', bob = mov ? ' cli-bob' : '';
  const W = 660, H = 352, x0 = 70, x1 = 590, surf = 130, fondo = 292;
  const [tw, te] = E.term;
  const term = `M ${x0} ${tw} C ${x0+170} ${tw+6}, ${x1-190} ${te-10}, ${x1} ${te}`;
  let s = `<svg class="cli-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`Corte del océano Pacífico ecuatorial en ${E.n}. ${E.oceano} ${E.atmos}`)}">`;
  s += `<defs><linearGradient id="cliCal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EC7A45" stop-opacity=".95"/><stop offset="1" stop-color="#E8804F" stop-opacity=".35"/></linearGradient>
        <linearGradient id="cliFrio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3C79B8" stop-opacity=".55"/><stop offset="1" stop-color="#173A60" stop-opacity=".95"/></linearGradient>
        <linearGradient id="cliCielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E9BD0" stop-opacity=".30"/><stop offset="1" stop-color="#9CC7E8" stop-opacity=".06"/></linearGradient>
        <linearGradient id="cliTierra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7E9A58"/><stop offset=".45" stop-color="#8C7A58"/><stop offset="1" stop-color="#5E4E3A"/></linearGradient>
        <radialGradient id="cliNube" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#C9D3DE"/><stop offset="1" stop-color="#8E9CAC"/></radialGradient>
        <linearGradient id="cliBrillo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <marker id="cliAr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink-2)"/></marker>
        <marker id="cliArB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#E0663A"/></marker></defs>`;
  /* cielo y océano */
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="var(--bg-3)"/><rect x="0" y="0" width="${W}" height="${surf}" fill="url(#cliCielo)"/>`;
  s += `<rect x="${x0}" y="${surf}" width="${x1-x0}" height="${fondo-surf}" fill="url(#cliFrio)"/>`;
  s += `<path d="${term} L ${x1} ${surf} L ${x0} ${surf} Z" fill="url(#cliCal)"/>`;
  /* oleaje de superficie y un brillo suave */
  let ola = `M ${x0} ${surf}`; for (let x = x0; x < x1; x += 20) ola += ` q 5 -3 10 0 t 10 0`;
  s += `<path d="${ola}" fill="none" stroke="#FFFFFF" stroke-width="1.4" opacity=".55"/><rect x="${x0}" y="${surf}" width="${x1-x0}" height="10" fill="url(#cliBrillo)" opacity=".6"/>`;
  s += `<path d="${term}" fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-dasharray="7 5" opacity=".8"/>`;
  s += `<text x="${x0+12}" y="${Math.min(tw+15, fondo-34)}" font-size="10" font-family="IBM Plex Mono, monospace" fill="#DCE9F6">termoclina (límite agua caliente / agua fría)</text>`;
  s += `<text x="${x0+12}" y="${surf+18}" font-size="11" font-family="IBM Plex Sans, sans-serif" font-weight="600" fill="#6E2A10">agua caliente</text>`;
  s += `<text x="${x0+12}" y="${fondo-12}" font-size="11" font-family="IBM Plex Sans, sans-serif" font-weight="600" fill="#DCE9F6">agua fría, rica en nutrientes</text>`;
  /* tierras: islas del Pacífico occidental y los Andes ecuatorianos */
  s += `<path d="M ${x0} ${surf} L ${x0} ${fondo} L 8 ${fondo} L 8 ${surf-30} C 22 ${surf-44} 34 ${surf-36} 44 ${surf-26} C 54 ${surf-18} 62 ${surf-8} ${x0} ${surf} Z" fill="url(#cliTierra)"/>`;
  s += `<path d="M 12 ${surf-30} C 20 ${surf-40} 30 ${surf-40} 40 ${surf-30}" fill="none" stroke="#5E8A44" stroke-width="5" stroke-linecap="round" opacity=".8"/>`;
  s += `<text x="14" y="${surf-50}" font-size="11" font-family="IBM Plex Sans, sans-serif" fill="var(--ink-2)">Asia y Oceanía</text>`;
  s += `<path d="M ${x1} ${surf} L ${x1} ${fondo} L ${W-6} ${fondo} L ${W-6} ${surf-40} L ${W-18} ${surf-74} L ${W-30} ${surf-52} L ${W-38} ${surf-82} L ${W-50} ${surf-46} C ${W-58} ${surf-26} ${x1+8} ${surf-10} ${x1} ${surf} Z" fill="url(#cliTierra)"/>`;
  s += `<path d="M ${W-44} ${surf-68} L ${W-38} ${surf-82} L ${W-32} ${surf-66} Z M ${W-24} ${surf-62} L ${W-18} ${surf-74} L ${W-13} ${surf-62} Z" fill="#F2F5F7"/>`;
  s += `<text x="${W-8}" y="26" text-anchor="end" font-size="11" font-family="IBM Plex Sans, sans-serif" font-weight="600" fill="var(--ink-2)">Ecuador</text>`;
  /* vientos alisios */
  const cx = x0 + (x1-x0)*E.nube;          /* centro de la nube de tormenta */
  s += `<text x="${x0+6}" y="20" font-size="11" font-family="IBM Plex Sans, sans-serif" font-weight="600" fill="var(--ink-2)">${E.wind===0?'alisios debilitados o invertidos':(E.wind<-1.2?'alisios más fuertes de lo normal':'vientos alisios (del este al oeste)')}</text>`;
  const nW = E.wind === 0 ? 1 : Math.round(Math.abs(E.wind)*3);
  for (let i = 0; i < nW; i++){
    const y = 38 + i*16, len = E.wind === 0 ? 90 : 320*Math.min(1, Math.abs(E.wind));
    const xa = E.wind === 0 ? x0+200 : x1-60;
    /* la flecha se detiene antes de la nube: nada se dibuja encima de otra cosa */
    const xb = E.wind === 0 ? x0+200+len : Math.max(cx+104, x1-60-len);
    s += `<line class="${fl.trim()}" x1="${xa}" y1="${y}" x2="${xb}" y2="${y}" stroke="var(--ink-2)" stroke-width="${E.wind===0?2:3}" stroke-linecap="round" marker-end="url(#cliAr)"/>`;
  }
  /* aire que desciende y se seca del lado opuesto a la tormenta */
  if (cx < x1 - 170) s += `<path d="M ${x1-34} 70 C ${x1-30} 88, ${x1-30} 104, ${x1-34} ${surf-8}" fill="none" stroke="#E0663A" stroke-width="2.2" stroke-dasharray="5 4" marker-end="url(#cliArB)" opacity=".85"/><text x="${x1-42}" y="84" text-anchor="end" font-size="9.5" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)">aire seco que desciende</text>`;
  /* nube de tormenta (cumulonimbo con yunque): su posición es la del ascenso de aire */
  s += `<g class="${bob.trim()}"><path d="M ${cx-66} 62 C ${cx-40} 50 ${cx+40} 50 ${cx+70} 60 C ${cx+40} 66 ${cx-40} 66 ${cx-66} 62 Z" fill="url(#cliNube)" opacity=".75"/>`
    + [[-30,104,22],[-8,96,26],[20,100,24],[42,108,18],[-50,110,16],[4,78,22],[-14,84,18],[20,82,17]].map(([dx,cy2,r]) => `<circle cx="${cx+dx}" cy="${cy2}" r="${r}" fill="url(#cliNube)"/>`).join('')
    + `<ellipse cx="${cx}" cy="116" rx="60" ry="9" fill="#7A8898" opacity=".55"/></g>`;
  for (let i=0;i<7;i++) s += `<line class="${fl.trim()}" x1="${cx-46+i*15}" y1="${surf-8}" x2="${cx-52+i*15}" y2="${surf+2+((i%3)*3)}" stroke="#3C79B8" stroke-width="2" stroke-linecap="round"/>`;
  s += `<text x="${cx}" y="50" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">ascenso de aire y tormentas</text>`;
  /* lluvia sobre el Ecuador */
  const lv = E.lluviaEc, nL = Math.round(2 + lv*8);
  s += `<g opacity="${0.35 + lv*0.55}">` + [[x1+18,50,13],[x1+40,46,12]].map(([nx,ny,r]) => `<circle cx="${nx}" cy="${ny}" r="${r}" fill="url(#cliNube)"/>`).join('') + `</g>`;
  for (let i=0;i<nL;i++) s += `<line class="${fl.trim()}" x1="${x1+10+ (i%4)*14}" y1="${64+Math.floor(i/4)*13}" x2="${x1+6+(i%4)*14}" y2="${74+Math.floor(i/4)*13}" stroke="#3C79B8" stroke-width="${1+lv*2}" stroke-linecap="round" opacity="${0.35+lv*0.6}"/>`;
  const lvTxt = `lluvia en la Costa: ${lv>0.7?'muy alta':lv>0.25?'normal':'escasa'}`;
  s += `<rect x="${W-14-lvTxt.length*6.1}" y="${fondo-22}" width="${lvTxt.length*6.1+12}" height="20" rx="7" fill="var(--bg-2)" stroke="var(--line)"/>`;
  s += `<text x="${W-8}" y="${fondo-8}" text-anchor="end" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink)">${lvTxt}</text>`;
  /* afloramiento */
  if (E.aflor){
    s += `<path class="${fl.trim()}" d="M ${x1-34} ${fondo-14} C ${x1-40} ${surf+70}, ${x1-26} ${surf+40}, ${x1-30} ${surf+14}" fill="none" stroke="#7FC4E8" stroke-width="${k==='nina'?5:3.4}" stroke-linecap="round" marker-end="url(#cliAr)"/>`;
    s += `<text x="${x1-44}" y="${surf+90}" text-anchor="end" font-size="10" font-family="IBM Plex Mono, monospace" fill="#DCE9F6">afloramiento${k==='nina'?' intenso':''}</text>`;
    /* nutrientes y plancton que suben con el agua fría */
    for (let i=0;i<9;i++) s += `<circle cx="${x1-60+(i%3)*12+((i*7)%5)}" cy="${surf+22+Math.floor(i/3)*12}" r="2" fill="#B6E3A8" opacity=".85"/>`;
  } else {
    s += `<text x="${x1-44}" y="${fondo-38}" text-anchor="end" font-size="10" font-family="IBM Plex Mono, monospace" fill="#DCE9F6">sin afloramiento: el agua fría no llega a la superficie</text>`;
  }
  const pie = `${E.n} · ${E.sst}`;
  s += `<rect x="${x0+8}" y="${H-32}" width="${Math.round(pie.length*6.3 + 22)}" height="22" rx="7" fill="var(--bg-2)" stroke="var(--line)"/><text x="${x0+18}" y="${H-17}" font-size="11" font-family="IBM Plex Sans, sans-serif" font-weight="600" fill="var(--ink)">${esc(E.n)} · ${esc(E.sst)}</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- Corte oeste–este del Ecuador (relieve y sombra orográfica) ---------- */
function cliPerfilSVG(){
  const mov = cliMotion(), fl = mov ? ' cli-flow' : '';
  const W = 680, H = 300;
  const suelo = 'M 120 300 L 120 250 L 190 238 L 300 108 L 345 96 L 400 160 L 448 152 L 500 92 L 545 104 L 610 200 L 680 226 L 680 300 L 120 300 Z';
  let s = `<svg class="cli-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="Corte del Ecuador del océano Pacífico, a la izquierda, a la Amazonía, a la derecha. El aire húmedo del Pacífico sube por la ladera occidental y descarga lluvia; el aire húmedo de la Amazonía sube por la ladera oriental y descarga aún más lluvia en Puyo; el valle interandino, donde está Quito, queda entre las dos cordilleras, a la sombra de ambas, y recibe mucha menos lluvia.">`;
  s += `<defs><marker id="cliAr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink-2)"/></marker>
    <linearGradient id="cliPcielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E9BD0" stop-opacity=".28"/><stop offset="1" stop-color="#9CC7E8" stop-opacity=".04"/></linearGradient>
    <linearGradient id="cliPmon" gradientUnits="userSpaceOnUse" x1="0" y1="90" x2="0" y2="300"><stop offset="0" stop-color="#F2F5F7"/><stop offset=".07" stop-color="#E4E8EA"/><stop offset=".1" stop-color="#9C9282"/><stop offset=".3" stop-color="#8A8A5E"/><stop offset=".5" stop-color="#6A904C"/><stop offset="1" stop-color="#3E6A34"/></linearGradient>
    <linearGradient id="cliPmar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4C8CC8"/><stop offset="1" stop-color="#1E4A7A"/></linearGradient>
    <radialGradient id="cliPnube" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#C9D3DE"/><stop offset="1" stop-color="#8E9CAC"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="var(--bg-3)"/><rect width="${W}" height="250" fill="url(#cliPcielo)"/>`;
  s += `<rect x="0" y="250" width="120" height="50" fill="url(#cliPmar)" opacity=".85"/><path d="M0 250 q6 -3 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#fff" stroke-width="1.2" opacity=".6"/><text x="8" y="268" font-size="11" font-family="IBM Plex Sans, sans-serif" font-weight="600" fill="#F2F7FC">Océano Pacífico</text>`;
  s += `<line class="${fl.trim()}" x1="104" y1="284" x2="16" y2="284" stroke="#7FC4E8" stroke-width="4" stroke-linecap="round" marker-end="url(#cliAr)"/><text x="8" y="296" font-size="9.5" font-family="IBM Plex Mono, monospace" fill="#E6F0FA">corriente fría de Humboldt</text>`;
  s += `<path d="${suelo}" fill="url(#cliPmon)"/>`;
  /* sombreado de las laderas (luz desde la izquierda) y bosques */
  s += `<g fill="#3E6A34" opacity=".9">` + [[560,178],[576,190],[592,198],[616,206],[634,212],[652,218],[668,222],[196,236],[214,226],[232,210],[250,190]].map(([x,y],i) => `<circle cx="${x}" cy="${y}" r="${5 + (i%3)}"/>`).join('') + `</g>`;
  s += `<g fill="#F2F5F7">` + `<path d="M 330 100 L 345 96 L 352 105 L 340 108 Z"/><path d="M 490 96 L 500 92 L 512 97 L 502 102 Z"/>` + `</g>`;
  s += `<path d="${suelo}" fill="none" stroke="var(--ink-3)" stroke-width="1.2" opacity=".7"/>`;
  /* aire húmedo del Pacífico */
  s += `<path class="${fl.trim()}" d="M 20 200 C 110 196, 180 176, 280 112" fill="none" stroke="var(--eco)" stroke-width="3" stroke-linecap="round" marker-end="url(#cliAr)"/>`;
  s += `<text x="24" y="190" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)">aire húmedo del Pacífico</text>`;
  const nube = (x, y, k) => `<g class="${mov?'cli-bob':''}">` + [[-26,6,14],[-8,-2,18],[14,2,16],[30,8,12],[0,10,14]].map(([dx,dy,r]) => `<circle cx="${x+dx*k}" cy="${y+dy*k}" r="${r*k}" fill="url(#cliPnube)"/>`).join('') + `<ellipse cx="${x}" cy="${y+14*k}" rx="${40*k}" ry="${5*k}" fill="#7A8898" opacity=".5"/></g>`;
  s += nube(280, 72, 1.05);
  for (let i=0;i<5;i++) s += `<line class="${fl.trim()}" x1="${248+i*16}" y1="92" x2="${244+i*16}" y2="${104+(i%2)*6}" stroke="#3C79B8" stroke-width="2" stroke-linecap="round"/>`;
  /* aire húmedo de la Amazonía */
  s += `<path class="${fl.trim()}" d="M 668 214 C 610 210, 570 176, 520 106" fill="none" stroke="var(--lab)" stroke-width="3" stroke-linecap="round" marker-end="url(#cliAr)"/>`;
  s += `<text x="${W-8}" y="240" text-anchor="end" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">aire húmedo de la Amazonía</text>`;
  s += nube(540, 68, 1.2);
  for (let i=0;i<6;i++) s += `<line class="${fl.trim()}" x1="${504+i*16}" y1="88" x2="${500+i*16}" y2="${102+(i%2)*6}" stroke="#3C79B8" stroke-width="2.4" stroke-linecap="round"/>`;
  /* aire seco que baja hacia el valle */
  s += `<path d="M 352 110 C 372 130, 386 146, 398 166" fill="none" stroke="var(--warn)" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#cliAr)"/>`;
  s += `<path d="M 494 108 C 470 128, 452 144, 436 162" fill="none" stroke="var(--warn)" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#cliAr)"/>`;
  s += `<text x="424" y="192" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">aire ya seco: baja y se calienta</text>`;
  /* ciudades */
  const ciu = [[150,250,'Guayaquil','4 m · 900 mm'],[424,160,'Quito','2.850 m · 1.200 mm'],[586,160,'Puyo','950 m · 4.400 mm']];
  ciu.forEach(([x,y,n,d]) => {
    s += `<circle cx="${x}" cy="${y}" r="5" fill="var(--bg-2)" stroke="var(--ink)" stroke-width="2"/>`;
    s += `<text x="${x}" y="${y-12}" text-anchor="middle" font-size="11.5" font-family="IBM Plex Sans, sans-serif" font-weight="700" fill="var(--ink)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">${n}</text>`;
    s += `<text x="${x}" y="${y+18}" text-anchor="middle" font-size="9.5" font-family="IBM Plex Mono, monospace" fill="var(--ink)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">${d}</text>`;
  });
  s += `<text x="322" y="90" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">cordillera Occidental</text>`;
  s += `<text x="522" y="86" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">cordillera Oriental</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- La Ramada vista en corte: amenaza, exposición y vulnerabilidad dibujadas ---------- */
function cliRamadaSVG(ame, med){
  const W = 680, H = 280, mov = cliMotion();
  const nivel = ame >= 5 ? 180 : ame >= 3 ? 200 : 214;   /* altura del agua: dentro del cauce, en la orilla o sobre la llanura */
  const casa = (x, y, k, col, fantasma) => `<g ${fantasma ? 'opacity=".35" stroke-dasharray="3 3"' : ''}><path d="M${x-11*k} ${y} v${-12*k} l${11*k} ${-9*k} l${11*k} ${9*k} v${12*k} z" fill="${fantasma ? 'none' : col}" stroke="${fantasma ? 'var(--ink-3)' : '#6B4A34'}" stroke-width="1.4"/>`
    + (fantasma ? '' : `<path d="M${x-13*k} ${y-12*k} l${13*k} ${-11*k} l${13*k} ${11*k}" fill="none" stroke="#9C3A2A" stroke-width="${3*k}" stroke-linejoin="round"/><rect x="${x-3*k}" y="${y-7*k}" width="${6*k}" height="${7*k}" fill="#5A3A26"/>`) + `</g>`;
  let s = `<svg class="cli-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`Corte de La Ramada a orillas del río Chila. Nivel del agua: ${ame>=5?'desborda y cubre la llanura de inundación':ame>=3?'llega a la orilla':'dentro del cauce'}. ${med.reubicar?'Las viviendas de la orilla fueron reubicadas en la zona alta. ':'Hay viviendas en la llanura de inundación. '}${med.alerta?'Hay sistema de alerta temprana. ':''}${med.via?'El puente y la vía de evacuación están reforzados. ':''}`)}">`;
  s += `<defs><linearGradient id="cliRcielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E9BD0" stop-opacity="${ame>=5?.12:.26}"/><stop offset="1" stop-color="#9CC7E8" stop-opacity=".04"/></linearGradient>
    <linearGradient id="cliRtierra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7E9A58"/><stop offset=".25" stop-color="#8C7A58"/><stop offset="1" stop-color="#5E4E3A"/></linearGradient>
    <linearGradient id="cliRagua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6E96A8"/><stop offset="1" stop-color="#3A5A6A"/></linearGradient>
    <radialGradient id="cliRnube" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#E6EAEE"/><stop offset="1" stop-color="#7E8C9C"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="var(--bg-3)"/><rect width="${W}" height="200" fill="url(#cliRcielo)"/>`;
  /* nubes y lluvia según el tipo de año */
  const nN = ame >= 5 ? 5 : ame >= 3 ? 3 : 1;
  for (let i=0;i<nN;i++){ const x = 120 + i*110; s += `<g class="${mov?'cli-bob':''}">` + [[-20,4,14],[0,-4,18],[20,4,14]].map(([dx,dy,r]) => `<circle cx="${x+dx}" cy="${38+dy}" r="${r}" fill="url(#cliRnube)"/>`).join('') + `</g>`;
    for (let k=0;k<(ame>=5?6:ame>=3?4:2);k++) s += `<line class="${mov?'cli-flow':''}" x1="${x-18+k*8}" y1="58" x2="${x-22+k*8}" y2="${72+(k%2)*8}" stroke="#3C79B8" stroke-width="1.8" stroke-linecap="round"/>`; }
  /* relieve: zona alta a la izquierda, llanura de inundación, cauce y orilla derecha con la vía */
  const suelo = 'M0 150 C40 146 70 140 100 142 C130 144 150 170 180 196 L330 204 C350 206 360 214 372 232 L430 234 C440 216 452 206 470 204 L680 200 L680 280 L0 280 Z';
  s += `<path d="${suelo}" fill="url(#cliRtierra)"/>`;
  s += `<text x="16" y="${med.reubicar ? 96 : 116}" font-size="11" font-weight="700" font-family="IBM Plex Sans, sans-serif" fill="var(--ink-2)">zona alta segura</text>`;
  s += `<text x="186" y="258" font-size="10.5" font-family="IBM Plex Mono, monospace" fill="#F2EEE6">llanura de inundación</text>`;
  /* viviendas: las 30 de la orilla (cada icono representa unas cinco) */
  const orilla = [200, 232, 264, 296, 322];
  orilla.forEach((x, i) => { const y = i < 4 ? 198 + i*1.2 : 203; s += med.reubicar ? casa(x, y, 1, '#E8D6B0', true) : casa(x, y, 1, '#E8D6B0'); });
  const alta = [28, 56, 84];
  alta.forEach(x => { s += casa(x, 148, 1, '#E8D6B0'); });
  if (med.reubicar) [40, 70, 98, 124].forEach((x, i) => { s += casa(x, 132 - (i%2)*4, 0.85, '#F2E2C0'); });
  /* agua del río Chila: sube con la amenaza (solo se ve por encima del terreno) */
  s += `<clipPath id="cliRclip"><path d="M0 0 H680 V200 L470 204 C452 206 440 216 430 234 L372 232 C360 214 350 206 330 204 L180 196 C150 170 130 144 100 142 C70 140 40 146 0 150 Z"/></clipPath>`;
  s += `<rect x="0" y="${nivel}" width="${W}" height="${240-nivel}" fill="url(#cliRagua)" opacity="${ame>=5?.82:.92}" clip-path="url(#cliRclip)"/>`;
  s += `<path class="${mov?'cli-flow':''}" d="M${ame>=5?184:ame>=3?336:358} ${nivel+3} h${ame>=5?284:ame>=3?128:84}" stroke="#D8CBB0" stroke-width="1.4" opacity=".7"/>`;
  s += `<text x="400" y="${nivel-8}" text-anchor="middle" font-size="11" font-weight="700" font-family="IBM Plex Sans, sans-serif" fill="var(--ink)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">río Chila</text>`;
  s += `<text x="${med.reubicar?20:196}" y="${med.reubicar?112:166}" font-size="10.5" font-family="IBM Plex Mono, monospace" fill="var(--ink)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">${med.reubicar?'viviendas reubicadas':'30 viviendas en la orilla'}</text>`;
  if (med.ordenar) s += `<g><line x1="344" y1="204" x2="344" y2="176" stroke="#6B4A34" stroke-width="2.4"/><rect x="316" y="160" width="56" height="18" rx="3" fill="#F6E7B8" stroke="#8A6A2A"/><text x="344" y="173" text-anchor="middle" font-size="8.5" font-weight="700" font-family="IBM Plex Sans, sans-serif" fill="#5A3A10">NO CONSTRUIR</text></g>`;
  /* puente: único camino de salida */
  const pv = med.via;
  s += `<path d="M352 ${pv?196:204} Q400 ${pv?176:192} 452 ${pv?196:204}" fill="none" stroke="${pv?'#5E6A74':'#8A7A6A'}" stroke-width="${pv?6:3.5}" stroke-linecap="round"/>`;
  if (pv) s += `<path d="M376 186 V236 M424 186 V236" stroke="#5E6A74" stroke-width="4"/><path d="M470 190 h60" stroke="#2E8B57" stroke-width="4" stroke-linecap="round"/><path d="M522 182 l12 8 l-12 8z" fill="#2E8B57"/><text x="500" y="178" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink)">vía de evacuación</text>`;
  else s += `<path d="M390 188 l6 6 M410 188 l-5 7" stroke="#8A7A6A" stroke-width="1.6" opacity=".8"/>`;
  s += `<text x="402" y="${pv?168:184}" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="3">puente</text>`;
  s += `<path d="M470 200 L680 196" stroke="#6A6A6A" stroke-width="5" opacity=".7"/>`;
  /* alerta temprana: sirena con ondas y ruta de subida */
  if (med.alerta) s += `<g><line x1="150" y1="176" x2="150" y2="128" stroke="#5E6A74" stroke-width="3"/><rect x="142" y="118" width="16" height="12" rx="3" fill="#C0392B"/>`
    + `<path class="${mov?'cli-bob':''}" d="M162 116 q8 8 0 16 M168 110 q14 14 0 28" fill="none" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>`
    + `<path d="M230 188 C200 176 160 160 110 150" fill="none" stroke="#2E8B57" stroke-width="2.4" stroke-dasharray="6 4"/><path d="M108 150 l10 -2 l-4 8z" fill="#2E8B57"/>`
    + `<text x="170" y="108" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink)">alerta temprana</text></g>`;
  /* fondo comunitario */
  if (med.fondo) s += `<g><rect x="596" y="170" width="30" height="22" rx="4" fill="#E6B84A" stroke="#8A6A1A"/><path d="M596 178 h30" stroke="#8A6A1A"/><circle cx="611" cy="184" r="2.5" fill="#8A6A1A"/><text x="611" y="162" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink)">fondo comunitario</text></g>`;
  s += `</svg>`;
  return s;
}

/* =====================================================================
   4 · CASO DE RIESGO (comunidad ficticia) y BOLETÍN SIMULADO
   ===================================================================== */
const CLI_AMENAZA = [
  { v:2, n:'Año de lluvias normales',            d:'El río Chila sube en marzo, pero se mantiene dentro de su cauce.' },
  { v:3, n:'Año lluvioso',                       d:'Dos o tres crecidas por temporada; el agua llega a la orilla.' },
  { v:5, n:'Año de El Niño fuerte',              d:'Lluvias muy por encima de lo normal durante semanas; crecidas grandes y repetidas.' }
];
const CLI_MEDIDAS = [
  { id:'reubicar', f:'E', r:2, n:'Reubicar las 30 viviendas construidas sobre la orilla', d:'Es la medida más cara y la más difícil de acordar, pero saca a las familias del lugar por donde pasa el agua.' },
  { id:'ordenar',  f:'E', r:1, n:'Ordenanza que prohíbe construir en la llanura de inundación', d:'No cambia lo que ya está construido, pero evita que la exposición vuelva a crecer.' },
  { id:'alerta',   f:'V', r:1, n:'Sistema de alerta temprana comunitario y simulacros', d:'Con dos horas de aviso, una familia alcanza a subir lo esencial y salir.' },
  { id:'via',      f:'V', r:1, n:'Reforzar el puente y señalizar la vía de evacuación', d:'Si la única salida se corta, la comunidad queda aislada aunque haya avisado a tiempo.' },
  { id:'fondo',    f:'V', r:1, n:'Fondo comunitario de emergencia y seguro de cosecha', d:'No evita la inundación: evita que una familia quede arruinada después de ella.' }
];
const CLI_BOLETIN = [
  { t:'En las últimas 24 horas la estación de La Ramada registró 68 mm de lluvia acumulada.', k:'dato',
    fb:'Es un dato observado: ya ocurrió y fue medido por un instrumento. Tiene unidad (mm) y un periodo definido (24 horas).' },
  { t:'El nivel del río Chila subió 1,2 m entre las 18:00 y las 24:00 de ayer.', k:'dato',
    fb:'Es un dato observado: una medición de limnímetro con hora de inicio y hora de fin. Ya pasó.' },
  { t:'Para las próximas 48 horas se esperan lluvias de moderadas a fuertes en toda la cuenca.', k:'pronostico',
    fb:'Es un pronóstico: habla del futuro. "Se esperan" es la marca lingüística; no es una medición, es el resultado de un modelo.' },
  { t:'Se prevé que el caudal alcance su valor máximo el martes, entre las 02:00 y las 08:00.', k:'pronostico',
    fb:'Es un pronóstico. Fíjate en que da una franja de seis horas y no una hora exacta: eso ya es una forma de expresar la incertidumbre.' },
  { t:'Existe una probabilidad estimada del 60 % de que el río supere el nivel de desborde.', k:'incertidumbre',
    fb:'Es una expresión de incertidumbre: el 60 % significa que también hay un 40 % de que no ocurra. Un pronóstico honesto dice cuánta confianza tiene.' },
  { t:'El modelo no puede precisar la hora del pico de crecida: podría adelantarse o retrasarse varias horas.', k:'incertidumbre',
    fb:'Es una declaración explícita de incertidumbre. Que un boletín reconozca sus límites no lo hace menos confiable: lo hace más honesto.' }
];

/* =====================================================================
   VISTA
   ===================================================================== */
route('/cn/proximos/clima', () => { navigate('#/cn/clima'); });

route('/cn/clima', (view) => {
  view.classList.add('wide');
  const SEC = [
    { id:'tiempo',   n:'1 · ¿Tiempo o clima?' },
    { id:'regiones', n:'2 · Las cuatro regiones' },
    { id:'porque',   n:'3 · ¿Por qué aquí sí y allá no?' },
    { id:'factores', n:'4 · Simulador de factores' },
    { id:'enso',     n:'5 · El Niño y La Niña' },
    { id:'riesgo',   n:'6 · Riesgo = A × E × V' },
    { id:'alerta',   n:'7 · Leer una alerta' },
    { id:'boletin',  n:'8 · Tu boletín' },
    { id:'reto',     n:'9 · Reto final' }
  ];
  const St = {
    sec: 0,
    clas: {}, clasRev: false,                       /* 1 · afirmaciones */
    cA: 'guayaquil', cB: 'quito', mag: 't',          /* 2 · regiones */
    sim: { alt:0, dist:55, cor:'fria', lado:'llano' },
    pred: {}, predRun: {},                           /* 4 · predicciones antes de mover */
    enso: 'normal',
    ame: 5, med: {},                                 /* 6 · riesgo */
    bol: {}, bolRev: false, resp: null,              /* 7 · alerta */
    bolCiudad: 'guayaquil', bolCausa: '', bolProto: '',
    marks: { clas:false, comparo:false, sim:false, enso:false, riesgo:false, alerta:false, boletin:false, reto:false },
    errs: 0, start: Date.now()
  };
  const done0 = !!(Store.s.activities['cn-clima'] && Store.s.activities['cn-clima'].done);

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{},
      h('span',{class:'eyebrow eco'},'Ciencias Naturales · Ciencias de la Vida y de la Tierra · 8.º U3 (apoya 10.º U2 y Biología U10)'),
      h('h1',{},'Clima, tiempo atmosférico y riesgo en el Ecuador'),
      h('p',{},'Un país diminuto con cuatro climas muy distintos. Aquí vas a separar el tiempo del clima con datos reales aproximados, entender por qué Guayaquil, Quito, Puyo y Puerto Ayora no se parecen en nada, mover los factores que producen esas diferencias y terminar leyendo una alerta como la leería alguien que tiene que decidir qué hacer.')),
    h('span',{class:'pill eco'},'+120 XP · 40–50 min')));

  const retoSt = h('div',{class:'notice'}, done0
    ? 'Reto resuelto ✓ · puedes volver a explorar el tablero cuantas veces quieras.'
    : 'Pendiente: llega a la sección 9 con tu boletín de clima y riesgo guardado en el cuaderno.');
  if (done0) retoSt.className = 'notice ok';
  view.append(purposeBanner({
    proposito:'Distinguir el tiempo atmosférico del clima, explicar con más de una causa por qué el Ecuador tiene cuatro climas en un territorio pequeño y evaluar un riesgo separando la amenaza, la exposición y la vulnerabilidad.',
    observa:[
      'La diferencia de escala: un día de datos frente a un promedio de 30 años',
      'Cómo cambian la temperatura y la lluvia al mover la altitud, la distancia al mar, la corriente oceánica y el lado de la cordillera',
      'Qué se puede reducir de un riesgo y qué no se puede reducir nunca'],
    reto:'Arma un boletín de clima y riesgo con tu serie de datos, tu explicación causal y un protocolo de actuación proporcional a la alerta.',
    statusEl: retoSt }));

  const nav = h('nav',{class:'cli-nav','aria-label':'Secciones del tablero'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);

  function renderNav(){
    nav.innerHTML = '';
    SEC.forEach((s,i) => nav.append(h('button',{'aria-current': String(i===St.sec), onclick:()=>{ St.sec=i; render(); }}, s.n)));
  }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:6px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec=Math.max(0,St.sec-1); render(); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec=Math.min(SEC.length-1,St.sec+1); render(); }},'Siguiente →'));
  }
  /* Vuelve a dibujar la sección y devuelve el foco al control que se usó:
     quien navega con el teclado no queda perdido al principio de la página. */
  function renderFoco(etiqueta){
    render();
    if (!etiqueta) return;
    const b = $$('[aria-label]', body).find(x => x.getAttribute('aria-label') === etiqueta);
    if (b && b.focus) b.focus();
  }
  const fuente = txt => h('p',{class:'small muted'}, txt);
  const FUENTE_DATOS = 'Datos climáticos aproximados y redondeados, elaborados con fines didácticos a partir de promedios publicados de cada localidad. No son datos oficiales: en el Ecuador la información meteorológica oficial la produce el INAMHI.';

  /* =============== 1 · ¿Tiempo o clima? =============== */
  function secTiempo(){
    const wrap = h('div',{class:'cli-rows'});
    const aciertos = CLI_AFIRMA.filter((a,i)=>St.clas[i]===a.k).length;
    const accion = St.clasRev
      ? h('div',{class:'row'},
          h('span',{class:'pill '+(aciertos>=6?'ok':'warn')}, `${aciertos} de 8 correctas`),
          h('button',{class:'btn sm', onclick:()=>{ St.clas={}; St.clasRev=false; render(); }},'Intentar de nuevo'))
      : h('button',{class:'btn primary sm',style:'align-self:flex-start',
          onclick:()=>{ if (Object.keys(St.clas).length < 8) return toast('Todavía te faltan afirmaciones por clasificar.');
            St.clasRev=true; const ac = CLI_AFIRMA.filter((a,i)=>St.clas[i]===a.k).length; St.marks.clas = ac>=6; St.errs += (8-ac);
            Store.log('clasificacion',{recurso:'cn-clima', ejercicio:'tiempo_vs_clima', aciertos:ac}); render(); }}, '');
    /* el botón se actualiza en el sitio: así el foco del teclado no se pierde al clasificar */
    function pintaAccion(){
      if (St.clasRev) return;
      const n = Object.keys(St.clas).length;
      accion.textContent = n < 8 ? `Clasifica las 8 afirmaciones (${n}/8)` : 'Comprobar mis 8 respuestas';
      accion.disabled = n < 8;
    }
    CLI_AFIRMA.forEach((a,i) => {
      const elegido = St.clas[i];
      const fila = h('div',{class:'cli-row' + (St.clasRev ? (elegido===a.k ? ' ok' : ' bad') : '')});
      fila.append(h('p',{}, St.clasRev ? h('span',{class:'cli-mk'}, elegido===a.k ? '✓' : '✗') : null, a.t));
      const opts = h('div',{class:'opts'});
      [['tiempo','Tiempo atmosférico'],['clima','Clima']].forEach(([k,n]) => opts.append(
        h('button',{ class:'cli-opt', 'aria-pressed':String(elegido===k), 'aria-label':n+' · afirmación '+(i+1), 'data-k':k,
          disabled: St.clasRev || null,
          onclick:()=>{ St.clas[i]=k; $$('.cli-opt',opts).forEach(x => x.setAttribute('aria-pressed', String(x.getAttribute('data-k')===k))); pintaAccion(); } }, n)));
      fila.append(opts);
      if (St.clasRev) fila.append(h('p',{class:'fbk'}, elegido===a.k ? '' : 'Lo clasificaste como '+(elegido==='clima'?'clima':'tiempo atmosférico')+'. ', a.fb));
      wrap.append(fila);
    });
    pintaAccion();

    /* serie diaria vs promedio de 30 años */
    const chartWrap = h('div',{class:'card',style:'padding:12px'});
    const chart = h('canvas',{class:'chart',style:'height:250px'});
    chartWrap.append(h('span',{class:'eyebrow eco'},'Quito · temperatura media de cada día durante 30 días, frente al promedio de 30 años'), chart);
    setTimeout(()=>{ lineChart(chart, {
      series:[
        { label:'Cada día', color:cssVar('--warn'), pts: CLI_DIARIA.map(d=>({x:d.d, y:d.v})), dots:true },
        { label:'Promedio de 30 años', color:cssVar('--eco'), pts: CLI_DIARIA.map(d=>({x:d.d, y:d.prom})) } ],
      xmin:1, xmax:30, ymin:6, ymax:20, xticks:6,
      xlabel:'día del mes de octubre', ylabel:'°C',
      xfmt:v=>'día '+Math.round(v), yfmt:v=>cliN(v,0) }); }, 30);

    const min = Math.min(...CLI_DIARIA.map(d=>d.v)), max = Math.max(...CLI_DIARIA.map(d=>d.v));
    const tabla = h('details',{}, h('summary',{class:'small'},'Ver los 30 valores diarios en texto'),
      h('p',{class:'small mono',style:'line-height:1.7'}, CLI_DIARIA.map(d=>cliN(d.v,1)).join(' · ') + ' °C'));

    const q = quizBlock({
      q:'Mira la gráfica: la línea recta vale 13,8 °C todos los días. ¿Qué representa esa línea?',
      ops:[
        'La temperatura que hizo realmente cada día, medida por el termómetro',
        'El clima: el promedio de muchos años para esos mismos días del calendario',
        'El pronóstico del INAMHI para el mes que viene'],
      ok:1,
      fb:'Exacto. El clima es un resumen estadístico de muchos años: por eso es una línea suave. El tiempo atmosférico es la línea quebrada, con un día de 9,6 °C y otro de 17,4 °C. Ningún día concreto marcó exactamente 13,8 °C, y aun así 13,8 °C describe bien el clima de Quito en octubre.',
      wrong:[
        'Esa es la línea quebrada, la que sube y baja: son los datos diarios. La línea recta no puede ser una medición, porque sería imposible que hiciera exactamente la misma temperatura 30 días seguidos.',
        'Un pronóstico mira hacia el futuro y dura días. Aquí estamos mirando hacia atrás: un promedio construido con tres décadas de mediciones.']
    }, () => { St.marks.clas = true; });

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Antes de leer nada: clasifica'),
        h('p',{},'Ocho afirmaciones sobre el Ecuador. Unas hablan del ',h('b',{},'tiempo atmosférico'),' (lo que pasa en un lugar durante horas o días) y otras del ',h('b',{},'clima'),' (el comportamiento habitual de la atmósfera en ese lugar, calculado sobre 30 años o más). Decide una por una y comprueba al final.'),
        wrap, accion),
      chartWrap,
      h('div',{class:'card stack'},
        h('p',{style:'font-size:.92rem;margin:0'},`En estos 30 días el valor más bajo fue ${cliN(min,1)} °C y el más alto ${cliN(max,1)} °C: una diferencia de ${cliN(max-min,1)} °C entre dos días del mismo mes. Y, sin embargo, el promedio de 30 años apenas se mueve de un mes a otro en Quito. Esa es la diferencia de escala: el tiempo cambia de un día para otro, el clima solo cambia a lo largo de décadas.`),
        tabla, fuente('Serie diaria generada por el modelo del recurso para que puedas compararla con el promedio; el promedio de 30 años corresponde al orden de magnitud real de Quito en octubre.')),
      h('div',{class:'card stack'}, q),
      secNav());
  }

  /* =============== 2 · Las cuatro regiones =============== */
  function secRegiones(){
    const A = CLI_CIUDADES[St.cA], B = CLI_CIUDADES[St.cB];
    const selector = (cual, valor) => {
      const sel = h('select',{'aria-label':'Ciudad '+cual});
      Object.values(CLI_CIUDADES).forEach(c => sel.append(h('option',{ value:c.id, selected: c.id===valor || null }, `${c.em} ${c.n} · ${c.reg}`)));
      sel.addEventListener('change', () => { St[cual==='A'?'cA':'cB'] = sel.value; St.marks.comparo = true;
        Store.log('comparacion',{recurso:'cn-clima', a:St.cA, b:St.cB}); renderFoco('Ciudad '+cual); });
      return h('div',{class:'field'}, h('label',{}, 'Ciudad '+cual), sel);
    };
    const segT = h('div',{class:'row'},
      [['t','Temperatura media mensual (°C)'],['p','Lluvia mensual (mm)']].map(([k,n]) =>
        h('button',{ class:'cli-opt','aria-pressed':String(St.mag===k),'aria-label':n,
          onclick:()=>{ St.mag=k; renderFoco(n); } }, n)));

    const chartWrap = h('div',{class:'card',style:'padding:12px'});
    const chart = h('canvas',{class:'chart',style:'height:270px'});
    chartWrap.append(h('span',{class:'eyebrow eco'}, St.mag==='t' ? 'Temperatura media mes a mes' : 'Lluvia acumulada mes a mes'), chart,
      h('p',{class:'small muted',style:'margin:6px 0 0'}, `Cada línea lleva escrito el nombre de su ciudad en el extremo derecho: ${A.n} es la línea naranja y ${B.n} la azul. Todos los valores están también en la tabla de abajo.`));
    setTimeout(()=>{ lineChart(chart, {
      series:[
        { label:A.n, color:cssVar('--warn'), pts: (St.mag==='t'?A.t:A.p).map((v,i)=>({x:i+1,y:v})), dots:true },
        { label:B.n, color:cssVar('--accent'), pts: (St.mag==='t'?B.t:B.p).map((v,i)=>({x:i+1,y:v})), dots:true } ],
      xmin:1, xmax:12, ymin:0, ymax: St.mag==='t' ? 32 : 500, xticks:11,
      xlabel:'mes', ylabel: St.mag==='t' ? '°C' : 'mm',
      xfmt:v=>CLI_MES[Math.round(v)-1]||'', yfmt:v=> St.mag==='t' ? cliN(v,0)+' °C' : cliMil(v)+' mm' }); }, 30);

    const tabla = h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Mes'),
        h('th',{}, A.n+' · °C'), h('th',{}, A.n+' · mm'),
        h('th',{}, B.n+' · °C'), h('th',{}, B.n+' · mm'))),
      h('tbody',{}, CLI_MES.map((m,i) => h('tr',{},
        h('td',{}, m),
        h('td',{class:'num'}, cliN(A.t[i],1)), h('td',{class:'num'}, cliMil(A.p[i])),
        h('td',{class:'num'}, cliN(B.t[i],1)), h('td',{class:'num'}, cliMil(B.p[i])))))));

    const fichas = h('div',{class:'grid g2'});
    [A,B].forEach(c => fichas.append(h('div',{class:'card stack'},
      h('span',{class:'eyebrow eco'}, c.em+' '+c.n+' · '+c.reg),
      h('p',{style:'font-size:.9rem;margin:0'}, c.d),
      h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'},
        h('span',{class:'cli-chip'},'altitud '+cliMil(c.alt)+' m'),
        h('span',{class:'cli-chip'},'media anual '+cliN(cliMedT(c),1)+' °C'),
        h('span',{class:'cli-chip'},'lluvia anual '+cliMil(cliSumP(c))+' mm'),
        h('span',{class:'cli-chip'},'diferencia entre el mes más cálido y el más frío: '+cliN(cliAmpT(c),1)+' °C')),
      h('p',{class:'small',style:'margin:0'}, c.nota),
      h('p',{class:'small muted',style:'margin:0'}, CLI_REGION[c.reg].d))));

    const comparacion = (() => {
      const dT = Math.abs(cliMedT(A)-cliMedT(B)), dP = Math.abs(cliSumP(A)-cliSumP(B));
      return `Entre ${A.n} y ${B.n} hay ${cliN(dT,1)} °C de diferencia en la temperatura media anual y ${cliMil(dP)} mm de diferencia en la lluvia anual. Y las dos ciudades están en el mismo país, casi en la misma latitud. Lo que las separa no es el mes del año: son la altitud, el mar y la cordillera.`;
    })();

    const q = quizBlock({
      q:'Guayaquil y Quito están casi en la misma latitud, a menos de 300 km una de otra. ¿Por qué Quito es unos 13 °C más fría durante todo el año?',
      ops:[
        'Porque Quito está más lejos de la línea equinoccial y recibe menos sol',
        'Porque Quito está a 2.850 m de altitud: el aire, al estar más alto, tiene menos presión, se expande y se enfría, unos 6 °C menos por cada 1.000 m',
        'Porque en Quito es invierno cuando en Guayaquil es verano'],
      ok:1,
      fb:'La altitud es el factor que manda en la Sierra. La radiación solar que reciben las dos ciudades es prácticamente la misma; lo que cambia es la columna de aire. Por eso en el Ecuador los climas no se ordenan de norte a sur, como en los países templados, sino de abajo hacia arriba: se llaman pisos climáticos.',
      wrong:[
        'Quito está incluso más cerca de la línea equinoccial que Guayaquil. La latitud casi no las diferencia: el Ecuador entero recibe radiación solar alta y parecida todo el año.',
        'No hay invierno y verano térmicos en la línea equinoccial. Fíjate en la tabla: en Quito el mes más cálido y el más frío se diferencian en menos de 1 °C. Lo que sí cambia entre meses es la lluvia, no la temperatura.']
    }, () => { St.marks.comparo = true; });

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Cuatro regiones, cuatro climas'),
        h('p',{},'Elige dos ciudades y compáralas mes a mes. Cambia entre temperatura y lluvia: verás que lo que distingue a las regiones del Ecuador no es tanto el calor como el agua.'),
        h('div',{class:'grid g2'}, selector('A', St.cA), selector('B', St.cB)),
        segT),
      chartWrap,
      h('div',{class:'card stack'}, h('p',{style:'margin:0;font-size:.92rem'}, comparacion), tabla, fuente(FUENTE_DATOS)),
      fichas,
      h('div',{class:'card stack'}, q),
      secNav());
  }

  /* =============== 3 · ¿Por qué aquí sí y allá no? =============== */
  function secPorque(){
    const causas = [
      ['🌞','Latitud cero','El Ecuador recibe los rayos del sol casi perpendiculares todo el año y los días duran siempre unas 12 horas. Por eso no tenemos las cuatro estaciones térmicas: la temperatura de un lugar apenas cambia entre enero y julio. Lo que sí cambia entre meses es la lluvia. Ojo: eso no significa que haga calor en todas partes, porque la radiación que llega arriba de la atmósfera es la misma, pero lo que pasa después depende de la altitud, del mar y del relieve.'],
      ['⛰️','Altitud','Al subir, la presión baja y el aire se expande y se enfría: alrededor de 6 °C menos por cada 1.000 m. Del nivel del mar al páramo hay unos 25 °C de diferencia. Esta es la razón de que el Ecuador tenga, a la vez, manglares, bosque nublado, páramo y nieve.'],
      ['🧊','Corriente fría de Humboldt','Sube desde el sur con agua fría. Enfría el aire que está justo encima del mar, y ese aire frío y denso queda debajo del aire más cálido: se forma una capa estable, una inversión térmica, que impide que el aire suba y forme nubes de lluvia. Resultado: mucha humedad, garúa y neblina, pero poca lluvia. Es lo que hace que la península de Santa Elena y Galápagos sean secas.'],
      ['🌡️','Aguas cálidas y corriente de El Niño','De enero a mayo, aguas más cálidas se acercan a la costa ecuatoriana. El aire sobre un mar caliente se calienta, sube, se enfría en altura y descarga: por eso la Costa tiene su temporada lluviosa justamente en esos meses. Cuando ese calentamiento es mucho mayor de lo normal, hablamos de un evento de El Niño.'],
      ['⛰️','Cordillera y sombra orográfica','Cuando el aire húmedo choca contra una montaña, no le queda más remedio que subir. Al subir se enfría, el vapor de agua se condensa y llueve en esa ladera: es el lado de barlovento. Al pasar la cumbre, el aire ya descargó su agua; baja por el otro lado, se comprime, se calienta y reseca el terreno: es el lado de sotavento, la sombra orográfica. El valle interandino está a la sombra de dos cordilleras a la vez, la Occidental y la Oriental: por eso Quito recibe 1.200 mm y Puyo, a menos de 200 km, recibe 4.400 mm.']
    ];
    const cards = h('div',{class:'stack'});
    causas.forEach(([em,t,d]) => cards.append(h('div',{class:'card stack'},
      h('div',{class:'row',style:'gap:8px;align-items:baseline'}, h('span',{style:'font-size:1.3rem','aria-hidden':'true'},em), h('h3',{style:'margin:0;font-size:1rem'},t)),
      h('p',{style:'font-size:.9rem;margin:0'}, d))));

    const q = quizBlock({
      q:'Puyo (950 m) recibe unos 4.400 mm de lluvia al año y Quito (2.850 m) unos 1.200 mm. Puyo está más bajo y más caliente. ¿Cuál es la mejor explicación?',
      ops:[
        'Porque Puyo está más cerca de la línea equinoccial y allí llueve más',
        'Porque el aire húmedo de la Amazonía choca contra la cordillera Oriental, sube y descarga su agua en el piedemonte, mientras que a Quito le llega ya seco por los dos lados',
        'Porque en Puyo hace más calor y el calor produce lluvia'],
      ok:1,
      fb:'Es el efecto orográfico. Puyo está en barlovento del aire amazónico; Quito está en un valle a sotavento de la cordillera Occidental (para el aire del Pacífico) y a sotavento de la Oriental (para el aire amazónico). Dos sombras de lluvia superpuestas explican por qué un valle en plena línea equinoccial puede ser relativamente seco.',
      wrong:[
        'Las dos ciudades están prácticamente a la misma latitud, a menos de 1,5 grados de la línea equinoccial. La latitud no las diferencia: el relieve sí.',
        'El calor ayuda a que se evapore agua, pero para que llueva el aire tiene que subir y enfriarse. En el desierto hace mucho calor y no llueve. Lo que hace subir el aire aquí es la montaña.']
    }, () => { St.marks.comparo = true; });

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Un corte del país, del Pacífico a la Amazonía'),
        h('div',{class:'cli-artw', html: cliPerfilSVG()}),
        h('div',{class:'cli-legend'},
          h('span',{},'▬ verde: aire húmedo que llega del Pacífico'),
          h('span',{},'▬ azul claro: corriente fría de Humboldt'),
          h('span',{},'▬ naranja discontinuo: aire ya seco que baja hacia el valle')),
        h('p',{class:'small'},'Lee el esquema de izquierda a derecha: océano Pacífico, llanura de la Costa con Guayaquil, cordillera Occidental, valle interandino con Quito, cordillera Oriental y piedemonte amazónico con Puyo. Las dos corrientes de aire húmedo suben por las laderas exteriores y descargan allí su agua; al valle del centro le llega el aire ya seco desde los dos lados.'),
        fuente('Esquema esquemático y no a escala, dibujado en este mismo recurso. Las cifras de lluvia son los acumulados anuales aproximados de la sección 2.')),
      cards,
      h('div',{class:'card stack'}, q),
      secNav());
  }

  /* =============== 4 · Simulador de factores =============== */
  const CLI_CTRL = {
    alt:   { n:'Altitud', u:'m', min:0, max:4000, step:100, tipo:'rango',
             pregunta:'Antes de moverlo: si subes la altitud y dejas todo lo demás igual, ¿qué le pasará a la temperatura media?',
             ops:[['sube','Subirá'],['baja','Bajará'],['igual','Se quedará igual']], ok:'baja',
             fb:'Correcto: unos 6 °C menos por cada 1.000 m. Es el factor que más pesa en el Ecuador.',
             mal:'Al subir, la presión disminuye, el aire se expande y al expandirse se enfría. Por eso hay nieve en el Chimborazo aunque esté en la línea equinoccial.' },
    dist:  { n:'Distancia al mar', u:'km', min:0, max:400, step:10, tipo:'rango',
             pregunta:'Antes de moverlo: si te alejas del mar hacia el interior, ¿qué le pasará a la diferencia de temperatura entre el día y la noche?',
             ops:[['sube','Aumentará'],['baja','Disminuirá'],['igual','Se quedará igual']], ok:'sube',
             fb:'Correcto: el mar es un termostato. Cerca de la costa, el agua tarda mucho en calentarse y en enfriarse, así que amortigua los cambios. Tierra adentro esa amortiguación desaparece.',
             mal:'El agua necesita mucha más energía que la tierra para cambiar de temperatura. Junto al mar los días son menos calurosos y las noches menos frías; tierra adentro, la diferencia entre el día y la noche crece.' },
    cor:   { n:'Corriente oceánica', tipo:'opciones',
             ops2:[['fria','Fría (tipo Humboldt)'],['calida','Cálida (tipo El Niño)'],['ninguna','Sin influencia del mar']],
             pregunta:'Antes de elegir: frente a una costa bañada por una corriente fría, ¿qué esperas que ocurra con la lluvia?',
             ops:[['sube','Lloverá más'],['baja','Lloverá menos'],['igual','No cambiará']], ok:'baja',
             fb:'Correcto: el agua fría enfría el aire de abajo y lo vuelve estable. Sin aire que suba no hay nubes de lluvia, solo neblina y garúa.',
             mal:'Parece contradictorio, pero el agua fría produce costas secas: el aire frío pegado al mar es denso y no sube. Los desiertos costeros del Perú y del norte de Chile están junto al océano y son de los lugares más secos del planeta.' },
    lado:  { n:'Lado de la cordillera', tipo:'opciones',
             ops2:[['barlo','Barlovento (el aire húmedo choca y sube)'],['sota','Sotavento (sombra orográfica)'],['llano','Llanura o valle sin ladera']],
             pregunta:'Antes de elegir: en el lado de sotavento de una montaña, ¿qué esperas que ocurra con la lluvia?',
             ops:[['sube','Lloverá más'],['baja','Lloverá mucho menos'],['igual','Igual que en el otro lado']], ok:'baja',
             fb:'Correcto: a sotavento el aire ya descargó su humedad en la ladera de enfrente, y al bajar se comprime y se calienta. Es la sombra orográfica.',
             mal:'La montaña obliga al aire a subir por un lado, y es allí donde llueve. Al otro lado el aire baja seco: por eso hay valles secos en pleno trópico húmedo.' }
  };

  function secFactores(){
    const card = h('div',{class:'card stack'});
    card.append(h('span',{class:'eyebrow eco'},'Mueve un factor a la vez'),
      h('p',{},'Cada control está bloqueado hasta que hagas tu predicción. Predice, desbloquea, mueve y compara con lo que pensabas. Cambia un solo factor cada vez: si mueves dos, no sabrás cuál produjo el cambio.'));

    Object.entries(CLI_CTRL).forEach(([k,c]) => {
      const abierto = !!St.predRun[k];
      const box = h('div',{class:'stack',style:'border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--bg-2)'});
      box.append(h('div',{class:'row',style:'gap:8px;align-items:baseline'},
        h('b',{style:'font-size:.92rem'}, c.n),
        abierto ? h('span',{class:'pill '+(St.pred[k]===c.ok?'ok':'warn')}, St.pred[k]===c.ok ? 'predicción acertada' : 'predicción revisada') : null));
      if (!abierto){
        box.append(h('p',{class:'small',style:'margin:0;font-weight:600'}, c.pregunta));
        const opts = h('div',{class:'row',style:'gap:5px;flex-wrap:wrap'});
        c.ops.forEach(([v,n]) => opts.append(h('button',{ class:'cli-opt', 'aria-label':n+' · '+c.n,
          onclick:()=>{ St.pred[k]=v; St.predRun[k]=true; if (v!==c.ok) St.errs++;
            Store.log('prediccion',{recurso:'cn-clima', control:k, valor:v, correcto:v===c.ok}); render(); } }, n)));
        box.append(opts);
      } else {
        box.append(h('div',{class:'notice '+(St.pred[k]===c.ok?'ok':'warn')}, h('span',{}, h('b',{}, St.pred[k]===c.ok ? 'Tu predicción era correcta. ' : 'Tu predicción no era la esperada. '), St.pred[k]===c.ok ? c.fb : c.mal)));
        if (c.tipo === 'rango'){
          const inp = h('input',{ type:'range', min:c.min, max:c.max, step:c.step, value:St.sim[k], id:'cli-'+k, 'aria-label':c.n+' en '+c.u });
          const out = h('output',{}, cliMil(St.sim[k])+' '+c.u);
          inp.addEventListener('input', () => { St.sim[k] = +inp.value; out.value = cliMil(inp.value)+' '+c.u; St.marks.sim = true; refresh();
            Store.log('simulador',{ modelo:'cn-clima', variable:k, valor:+inp.value }); });
          box.append(h('div',{class:'slider'}, h('label',{for:'cli-'+k}, c.n), out, inp));
          box.append(h('p',{class:'small muted',style:'margin:0'},'Con el control enfocado puedes usar las flechas del teclado para cambiar el valor de '+cliMil(c.step)+' en '+cliMil(c.step)+' '+c.u+'.'));
        } else {
          const opts = h('div',{class:'row',style:'gap:5px;flex-wrap:wrap'});
          c.ops2.forEach(([v,n]) => opts.append(h('button',{ class:'cli-opt', 'aria-pressed':String(St.sim[k]===v), 'aria-label':n, 'data-v':v,
            onclick:()=>{ St.sim[k]=v; St.marks.sim = true; $$('.cli-opt',opts).forEach(x => x.setAttribute('aria-pressed', String(x.getAttribute('data-v')===v)));
              Store.log('simulador',{modelo:'cn-clima', variable:k, valor:v}); refresh(); } }, n)));
          box.append(opts);
        }
      }
      card.append(box);
    });

    /* presets */
    const presets = h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'});
    Object.entries(CLI_PRESET).forEach(([id,p]) => presets.append(h('button',{ class:'btn sm',
      onclick:()=>{ Object.assign(St.sim, p.st); Object.keys(CLI_CTRL).forEach(k => { St.predRun[k]=true; St.pred[k] = St.pred[k] || CLI_CTRL[k].ok; });
        St.presetId = id; St.marks.sim = true; Store.log('simulador',{modelo:'cn-clima', preset:id}); render(); } }, p.n)));

    /* Lectura de resultados: se actualiza EN EL SITIO, sin reconstruir los
       controles, para no perder el foco del teclado mientras se mueve un mando. */
    const read = h('div',{class:'readouts','aria-live':'polite'});
    const calc = h('div',{class:'cli-calc'});
    const clasif = h('p',{style:'margin:0;font-size:.92rem'});
    const presetNota = h('div',{style:'display:none'});

    function pintaRes(){
      const R = cliModelo(St.sim);
      read.innerHTML = '';
      [[cliN(R.T,1),'°C','Temperatura media estimada'],
       [cliMil(R.P),'mm/año','Lluvia anual estimada'],
       [cliN(R.amp,1),'°C','Diferencia estimada entre el día y la noche']].forEach(([v,u,l]) =>
        read.append(h('div',{class:'readout'}, h('div',{class:'v'}, v, ' ', h('span',{class:'u'},u)), h('div',{class:'l'}, l))));

      calc.innerHTML = '';
      calc.append(h('div',{}, h('b',{},'Temperatura: '), `parte de ${cliN(CLI_T0,1)} °C al nivel del mar en la línea equinoccial`));
      calc.append(h('div',{}, `− ${cliN(Math.abs(R.dAlt),1)} °C por la altitud (${cliMil(St.sim.alt)} m × 6 °C por cada 1.000 m)`));
      calc.append(h('div',{}, `${R.dCor>=0?'+':'−'} ${cliN(Math.abs(R.dCor),1)} °C por la corriente ${St.sim.cor==='fria'?'fría':St.sim.cor==='calida'?'cálida':'(sin influencia del mar a esta distancia)'}`));
      calc.append(h('div',{}, `+ ${cliN(R.dCont,1)} °C por estar tierra adentro (menos brisa marina)`));
      calc.append(h('div',{class:'tot'}, `= ${cliN(R.T,1)} °C de temperatura media`));
      calc.append(h('div',{style:'margin-top:7px'}, h('b',{},'Lluvia: '), 'parte de 1.500 mm al año'));
      calc.append(h('div',{}, `× ${cliN(R.fLado,2)} por el lado de la cordillera (${St.sim.lado==='barlo'?'barlovento':St.sim.lado==='sota'?'sotavento':'llanura'})`));
      calc.append(h('div',{}, `× ${cliN(R.fCor,2)} por la corriente oceánica`));
      calc.append(h('div',{}, `× ${cliN(R.fAlt,2)} por la altitud (la lluvia es máxima hacia los 1.300 m y disminuye en el páramo)`));
      calc.append(h('div',{class:'tot'}, `= ${cliMil(R.P)} mm de lluvia al año`));

      const t = R.T, p = R.P;
      const piso = t>=24?'cálido (tierra caliente)':t>=18?'templado (tierra templada)':t>=12?'frío templado (tierra fría)':t>=6?'frío de altura':'gélido (páramo alto y nieves)';
      const hum = p>=3000?'muy lluvioso':p>=1800?'lluvioso':p>=1000?'húmedo':p>=600?'subhúmedo':'seco';
      clasif.textContent = `Con estos valores tendrías un clima ${piso} y ${hum}. En el Ecuador se parecería a ${
        t>=24 && p<1000 ? 'la llanura seca de la península de Santa Elena' :
        t>=24 ? 'la llanura del Guayas o el norte de Esmeraldas' :
        t>=18 && p>=3000 ? 'el piedemonte amazónico de Puyo o Tena' :
        t>=18 ? 'un valle abrigado como el del Chota o Catamayo' :
        t>=12 ? 'el callejón interandino: Quito, Ambato, Loja' :
        t>=6 ? 'el páramo de El Ángel o de Papallacta' : 'las cumbres nevadas del Cayambe o el Chimborazo'}.`;

      presetNota.innerHTML = '';
      if (St.presetId){
        const P = CLI_PRESET[St.presetId];
        presetNota.style.display = '';
        presetNota.className = 'notice info';
        presetNota.append(h('span',{}, h('b',{}, 'Modelo frente a realidad · '+P.n+'. '),
          `El modelo estima ${cliN(R.T,1)} °C y ${cliMil(R.P)} mm; los valores reales aproximados son ${cliN(P.realT,1)} °C y ${cliMil(P.realP)} mm. ${P.nota} Un modelo sencillo sirve para entender la tendencia, no para sustituir la medición.`));
      } else { presetNota.style.display = 'none'; presetNota.className = ''; }
    }
    function refresh(){ pintaRes(); }
    pintaRes();

    return h('div',{class:'stack'},
      card,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Resultado del modelo'),
        read,
        h('p',{style:'margin:0;font-size:.92rem'}, clasif),
        calc,
        presetNota,
        h('p',{class:'small muted',style:'margin:0'},'Modelo didáctico simplificado, construido en este recurso para razonar sobre las causas. No reproduce el clima real de ningún punto concreto; para eso están las estaciones del INAMHI.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Compara con lugares reales'),
        h('p',{class:'small',style:'margin:0'},'Cada botón coloca los cuatro controles en la configuración aproximada de un lugar y te muestra en cuánto se equivoca el modelo.'),
        presets),
      secNav());
  }

  /* =============== 5 · El Niño y La Niña =============== */
  function secEnso(){
    const seg = h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'});
    const svgBox = h('div',{class:'cli-artw'});
    const detTit = h('span',{class:'eyebrow eco'});
    const detDl  = h('dl',{style:'display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:.88rem;margin:0'});
    const ttsBox = h('div',{class:'row'});
    const tbody  = h('tbody',{});

    function pintaE(){
      const E = CLI_ENSO[St.enso];
      $$('.cli-opt',seg).forEach(b => b.setAttribute('aria-pressed', String(b.getAttribute('data-v')===St.enso)));
      svgBox.innerHTML = cliEnsoSVG(St.enso);
      detTit.textContent = E.n;
      detDl.innerHTML = '';
      [['En el océano',E.oceano],['En la atmósfera',E.atmos],['En el Ecuador',E.ecuador],['En la pesca',E.pesca]]
        .forEach(([k,v]) => detDl.append(h('dt',{style:'font-weight:600'},k), h('dd',{style:'margin:0'},v)));
      ttsBox.innerHTML = '';
      if (Store.s.a11y.tts) ttsBox.append(TTS.btn(`${E.n}. En el océano: ${E.oceano} En la atmósfera: ${E.atmos} En el Ecuador: ${E.ecuador} En la pesca: ${E.pesca}`,'Escuchar esta explicación'));
      $$('tr',tbody).forEach(tr => $$('td',tr).forEach((td,i) => {
        const marca = (i===1&&St.enso==='normal')||(i===2&&St.enso==='nino')||(i===3&&St.enso==='nina');
        td.style.cssText = marca ? 'font-weight:700;color:var(--ink)' : '';
      }));
    }
    Object.values(CLI_ENSO).forEach(x => seg.append(h('button',{ class:'cli-opt', 'aria-pressed':String(x.id===St.enso), 'data-v':x.id,
      onclick:()=>{ St.enso=x.id; St.vistos = Object.assign({}, St.vistos||{}, {[x.id]:true});
        if (St.vistos.normal && St.vistos.nino && St.vistos.nina) St.marks.enso = true;
        Store.log('enso',{recurso:'cn-clima', estado:x.id}); pintaE(); } }, x.n)));

    const tabla = h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Qué cambia'), h('th',{},'Condiciones normales'), h('th',{},'El Niño'), h('th',{},'La Niña'))),
      tbody));
    [
        ['Vientos alisios','Soplan de este a oeste con fuerza normal','Se debilitan o se invierten','Soplan con más fuerza de lo normal'],
        ['Agua caliente','Acumulada en el Pacífico occidental','Se desplaza hacia el este, frente a nuestras costas','Empujada aún más hacia el oeste'],
        ['Afloramiento frente al Ecuador','Normal: sube agua fría con nutrientes','Se interrumpe','Se intensifica'],
        ['Temperatura del mar','≈ 24 °C','2 a 4 °C por encima de lo normal','1 a 2 °C por debajo de lo normal'],
        ['Lluvia en la Costa','Temporada lluviosa de enero a mayo','Muy por encima de lo normal: inundaciones','Por debajo de lo normal: déficit de agua'],
        ['Lluvia en la Sierra','Dos periodos lluviosos','Varias zonas con déficit; no llueve más en todas partes','Variable; en algunas zonas más seco'],
        ['Pesca','Abundante','Cae: sin nutrientes no hay plancton','Abundante, pero con agua muy fría']
    ].forEach(f => tbody.append(h('tr',{}, h('td',{}, f[0]), ...f.slice(1).map(c => h('td',{}, c)))));

    const q = quizBlock({
      q:'Durante un evento fuerte de El Niño, una persona en Cuenca dice: «Si El Niño es lluvia, aquí también va a llover muchísimo». ¿Qué le responderías?',
      ops:[
        'Que tiene razón: El Niño significa más lluvia en todo el Ecuador',
        'Que El Niño desplaza la lluvia, no la multiplica en todas partes: la Costa puede inundarse mientras varias zonas de la Sierra tienen déficit de lluvia',
        'Que El Niño solo afecta al mar y no cambia nada en tierra'],
      ok:1,
      fb:'El Niño reorganiza dónde llueve. El agua caliente se acerca a nuestra costa, el aire sube allí y descarga allí; la circulación que normalmente lleva humedad a otras zonas se altera. Por eso un mismo evento puede dejar inundaciones en Manabí y problemas de riego en la sierra centro y sur al mismo tiempo.',
      wrong:[
        'Ese es justamente el error más frecuente. El Niño no añade lluvia al país entero: cambia el lugar donde el aire asciende, y hay regiones que salen perdiendo agua.',
        'Cambia mucho en tierra: lluvias, temperatura, cosechas, caudales de los ríos y hasta enfermedades transmitidas por mosquitos. Lo que ocurre en el océano no se queda en el océano.']
    }, () => { St.marks.enso = true; });

    pintaE();
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'El Pacífico ecuatorial visto de lado'),
        h('p',{},'A la izquierda, Asia y Oceanía; a la derecha, el Ecuador. Cambia entre los tres estados y observa tres cosas: hacia dónde soplan los alisios, dónde está el agua caliente y dónde se forman las tormentas.'),
        seg,
        svgBox,
        h('div',{class:'cli-legend'},
          h('span',{},'Línea discontinua: termoclina, el límite entre el agua caliente de arriba y la fría de abajo'),
          h('span',{},'Flechas horizontales arriba: vientos alisios'),
          h('span',{},'Flecha vertical junto a la costa: afloramiento de agua fría'))),
      h('div',{class:'card stack','aria-live':'polite'}, detTit, detDl, ttsBox),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Las tres situaciones, una al lado de la otra'), tabla,
        fuente('Descripción cualitativa del fenómeno El Niño–Oscilación del Sur. Los rangos de temperatura del mar son órdenes de magnitud habituales; el seguimiento oficial del fenómeno en el Ecuador lo realizan el INAMHI y el Instituto Oceanográfico de la Armada junto al Comité ERFEN.')),
      h('div',{class:'card stack'}, q),
      secNav());
  }

  /* =============== 6 · Riesgo = amenaza × exposición × vulnerabilidad =============== */
  function secRiesgo(){
    const base = { E:5, V:4 };
    /* Todo el bloque de resultado se repinta en el sitio: los mandos no se
       reconstruyen, así que el foco del teclado permanece donde estaba. */
    const ameSel = h('div',{class:'row',style:'gap:6px;flex-wrap:wrap'});
    CLI_AMENAZA.forEach(a => ameSel.append(h('button',{ class:'cli-opt', 'aria-pressed':String(St.ame===a.v), 'aria-label':a.n+'. '+a.d, 'data-v':String(a.v),
      onclick:()=>{ St.ame=a.v; $$('.cli-opt',ameSel).forEach(x => x.setAttribute('aria-pressed', String(+x.getAttribute('data-v')===a.v)));
        Store.log('riesgo',{recurso:'cn-clima', amenaza:a.v}); pintaR(); } }, a.n)));
    const ameTxt = h('p',{class:'small',style:'margin:0'});

    const meas = h('div',{class:'cli-meas'});
    CLI_MEDIDAS.forEach(m => {
      const inp = h('input',{ type:'checkbox', id:'cli-m-'+m.id, checked: !!St.med[m.id] || null });
      inp.addEventListener('change', () => { St.med[m.id] = inp.checked; St.marks.riesgo = Object.values(St.med).filter(Boolean).length >= 2;
        Store.log('riesgo',{recurso:'cn-clima', medida:m.id, activa:inp.checked}); pintaR(); });
      meas.append(h('label',{ for:'cli-m-'+m.id }, inp, h('span',{},
        h('b',{}, m.n), ' ', h('span',{class:'cli-chip'}, m.f==='E' ? 'baja la exposición −'+m.r : 'baja la vulnerabilidad −'+m.r),
        h('small',{}, m.d))));
    });

    const falsoFb = h('div',{style:'display:none'});
    const falso = h('button',{ class:'btn sm', 'aria-label':'Intentar bajar la amenaza',
      onclick:()=>{ toast('No se puede: nadie decide cuánto llueve.');
        falsoFb.style.display=''; falsoFb.className='notice warn'; falsoFb.innerHTML='';
        falsoFb.append(h('span',{}, h('b',{},'Este es el punto clave de la unidad. '),'La amenaza es el fenómeno natural: la lluvia intensa, la crecida, el sismo, la erupción. No se puede negociar, ni prohibir, ni reducir por ordenanza. Lo único que podemos decidir es dónde nos ponemos (exposición) y en qué condiciones estamos cuando llega (vulnerabilidad). Gestionar el riesgo no es controlar la naturaleza: es cambiar nuestra relación con ella.'));
        St.falso = true; } }, 'Intentar bajar la amenaza');
    if (St.falso) falso.onclick();

    const barra = h('i',{style:'width:3%'});
    const gauge = h('div',{class:'cli-gauge'}, barra, h('b',{style:'left:25%'}), h('b',{style:'left:45%'}));
    const pillR = h('span',{class:'pill'});
    const detalle = h('div',{class:'cli-calc'});
    const explicEl = h('div',{class:'notice'});

    const ramadaBox = h('div',{class:'cli-artw'});
    function pintaR(){
      ramadaBox.innerHTML = cliRamadaSVG(St.ame, St.med);
      let E = base.E, V = base.V;
      CLI_MEDIDAS.forEach(m => { if (St.med[m.id]) { if (m.f==='E') E -= m.r; else V -= m.r; } });
      E = Math.max(1, E); V = Math.max(1, V);
      const A = St.ame, R = A*E*V, idx = Math.round(R/125*100);
      const cat = idx < 10 ? ['ok','bajo'] : idx < 25 ? ['warn','moderado'] : idx < 45 ? ['warn','alto'] : ['bad','muy alto'];
      const ameAct = CLI_AMENAZA.find(a => a.v === St.ame);
      ameTxt.textContent = ameAct.d;
      barra.style.width = Math.max(3, idx) + '%';
      barra.style.background = 'var(--' + cat[0] + ')';
      pillR.className = 'pill ' + cat[0];
      pillR.textContent = `Índice ${idx} de 100 · riesgo ${cat[1]}`;
      detalle.innerHTML = '';
      detalle.append(
        h('div',{}, h('b',{},'Amenaza (A) = '+A), ' · ', ameAct.n.toLowerCase()),
        h('div',{}, h('b',{},'Exposición (E) = '+E), ` · empezaba en ${base.E}: cuánta gente y cuántos bienes están en el lugar por donde pasa el agua`),
        h('div',{}, h('b',{},'Vulnerabilidad (V) = '+V), ` · empezaba en ${base.V}: qué tan mal les va si el agua llega`),
        h('div',{class:'tot'}, `Riesgo = ${A} × ${E} × ${V} = ${R} de un máximo de 125 → índice ${idx} de 100 · riesgo ${cat[1]}`));
      const explic = (E === 1 && V === 1)
        ? 'Has llevado la exposición y la vulnerabilidad a su mínimo. Fíjate en que el riesgo NO llega a cero: mientras el río siga creciendo, siempre queda algo. A eso se le llama riesgo residual, y por eso los simulacros no se dejan de hacer nunca.'
        : !Object.values(St.med).some(Boolean)
        ? 'Todavía no has aplicado ninguna medida. Prueba a activar una de exposición y una de vulnerabilidad, y observa cuál de las dos hace bajar más el índice.'
        : 'Observa qué medida hace bajar más el índice. Reubicar viviendas actúa sobre la exposición y es lo que más reduce el riesgo, pero también es lo más caro y lo más difícil de acordar con la comunidad. El sistema de alerta temprana cuesta mucho menos y salva vidas, aunque no evita que el agua entre en las casas.';
      explicEl.innerHTML = ''; explicEl.append(h('span',{}, explic));
    }
    pintaR();

    const q = quizBlock({
      q:'La comunidad de La Ramada nunca ha sufrido una inundación grande en los últimos 20 años. Un vecino concluye: «Aquí no hay riesgo». ¿Qué error está cometiendo?',
      ops:[
        'Ninguno: si no ha pasado en 20 años, la amenaza no existe',
        'Confunde "no ha ocurrido todavía" con "no puede ocurrir": 20 años son pocos para una crecida grande, y además la exposición creció porque se construyó en la orilla',
        'Se equivoca porque el riesgo depende solo de la vulnerabilidad de las familias'],
      ok:1,
      fb:'Un evento que ocurre en promedio cada 50 años puede no aparecer en 20 años de memoria y presentarse el año que viene. Además, el riesgo cambia aunque la amenaza no cambie: cada casa nueva en la llanura de inundación aumenta la exposición. Por eso los mapas de amenaza se hacen con registros largos y no con recuerdos.',
      wrong:[
        'La ausencia de un evento no es prueba de que no pueda ocurrir. Es el mismo razonamiento de quien dice que nunca se ha caído de la moto y por eso no necesita casco.',
        'La vulnerabilidad importa, pero el riesgo es el producto de los tres factores. Si la exposición fuera cero (nadie vive allí), el riesgo sería cero aunque las familias fueran muy vulnerables.']
    }, () => { St.marks.riesgo = true; });

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Caso: La Ramada, a orillas del río Chila'),
        h('p',{},'Comunidad ficticia de 180 familias en la cuenca baja de un río de la Costa interior. Treinta viviendas están construidas sobre la orilla, en la llanura de inundación. Hay un solo puente de salida. La mayoría de las familias vive de la agricultura y no tiene seguro de cosecha.'),
        h('div',{class:'notice info'}, h('span',{}, h('b',{},'La fórmula: '), 'Riesgo = amenaza × exposición × vulnerabilidad. Es una multiplicación, no una suma: si cualquiera de los tres factores fuera cero, el riesgo sería cero. Y por eso reducir un solo factor ya hace bajar el resultado entero.')),
        ramadaBox,
        h('p',{style:'font-weight:600;margin:0'},'1 · Amenaza: ¿qué tipo de año climático es?'),
        ameSel,
        ameTxt,
        h('div',{class:'row',style:'gap:8px;align-items:center;flex-wrap:wrap'}, falso,
          h('span',{class:'small muted'},'Puedes elegir el escenario para explorar, pero nadie decide cuánto llueve.')),
        falsoFb),
      h('div',{class:'card stack'},
        h('p',{style:'font-weight:600;margin:0'},'2 · Lo que sí está en nuestras manos: elige las medidas'),
        meas),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Riesgo resultante'),
        h('div',{class:'row',style:'gap:8px;align-items:center','aria-live':'polite'}, pillR),
        gauge,
        h('p',{class:'small muted',style:'margin:0'},'Las dos marcas verticales de la barra separan el riesgo moderado del alto y el alto del muy alto. El valor numérico y la palabra están escritos: no dependas del color.'),
        detalle,
        explicEl),
      h('div',{class:'card stack'}, q),
      secNav());
  }

  /* =============== 7 · Leer una alerta oficial =============== */
  function secAlerta(){
    const CATS = [['dato','Dato observado'],['pronostico','Pronóstico'],['incertidumbre','Incertidumbre']];
    const filas = h('div',{class:'cli-rows'});
    const acb = CLI_BOLETIN.filter((b,i)=>St.bol[i]===b.k).length;
    const accion = St.bolRev
      ? h('div',{class:'row'}, h('span',{class:'pill '+(acb>=5?'ok':'warn')}, `${acb} de 6 correctas`),
          h('button',{class:'btn sm', onclick:()=>{ St.bol={}; St.bolRev=false; render(); }},'Intentar de nuevo'))
      : h('button',{class:'btn primary sm',style:'align-self:flex-start',
          onclick:()=>{ if (Object.keys(St.bol).length < 6) return toast('Todavía te faltan frases por clasificar.');
            St.bolRev=true; const ac = CLI_BOLETIN.filter((b,i)=>St.bol[i]===b.k).length; St.errs += (6-ac); St.marks.alerta = St.marks.alerta || ac>=5;
            Store.log('clasificacion',{recurso:'cn-clima', ejercicio:'boletin', aciertos:ac}); render(); }}, '');
    function pintaAccionB(){
      if (St.bolRev) return;
      const nb = Object.keys(St.bol).length;
      accion.textContent = nb < 6 ? `Clasifica las 6 frases (${nb}/6)` : 'Comprobar mis 6 respuestas';
      accion.disabled = nb < 6;
    }
    CLI_BOLETIN.forEach((b,i) => {
      const el = St.bol[i];
      const fila = h('div',{class:'cli-row' + (St.bolRev ? (el===b.k ? ' ok' : ' bad') : '')});
      fila.append(h('p',{}, St.bolRev ? h('span',{class:'cli-mk'}, el===b.k ? '✓' : '✗') : null, b.t));
      const opts = h('div',{class:'opts'});
      CATS.forEach(([k,n]) => opts.append(h('button',{ class:'cli-opt', 'aria-pressed':String(el===k), 'aria-label':n+' · frase '+(i+1), 'data-k':k,
        disabled: St.bolRev || null,
        onclick:()=>{ St.bol[i]=k; $$('.cli-opt',opts).forEach(x => x.setAttribute('aria-pressed', String(x.getAttribute('data-k')===k))); pintaAccionB(); } }, n)));
      fila.append(opts);
      if (St.bolRev) fila.append(h('p',{class:'fbk'}, el===b.k ? '' : 'Lo clasificaste como '+CATS.find(c=>c[0]===el)[1].toLowerCase()+'. ', b.fb));
      filas.append(fila);
    });
    pintaAccionB();

    const RESP = [
      { id:'indif', ok:false, n:'No hacer nada: ya han avisado otras veces y no pasó nada.',
        fb:'Es la respuesta indiferente. Que una alerta anterior no terminara en desastre no significa que esta tampoco: precisamente porque a veces no ocurre, el boletín habla de un 60 % y no de un 100 %. Ignorar la alerta convierte la incertidumbre en excusa.' },
      { id:'alarm', ok:false, n:'Difundir por redes que «viene una inundación histórica» y salir esta misma noche sin avisar a nadie.',
        fb:'Es la respuesta alarmista. El boletín no dice «inundación histórica»: dice 60 % de probabilidad de superar el nivel de desborde. Exagerar tiene un costo real: satura las vías, desinforma y hace que la próxima alerta se tome menos en serio. Además, salir de noche y sin coordinación es más peligroso que quedarse.' },
      { id:'prop', ok:true, n:'Revisar la ruta de evacuación, preparar la mochila de emergencia, subir lo esencial a la parte alta de la casa, acordar un punto de encuentro familiar y mantenerse pendiente del siguiente boletín oficial.',
        fb:'Es la respuesta proporcional: alistarse sin entrar en pánico. El boletín da una franja de seis horas para el pico de crecida y una probabilidad del 60 %: lo razonable es estar listo para salir en minutos y seguir escuchando la fuente oficial, no decidir con un rumor.' },
      { id:'fatal', ok:false, n:'Aceptar que si pasa, pasa: contra la naturaleza no se puede hacer nada.',
        fb:'Es la respuesta fatalista. La amenaza no se puede reducir, cierto, pero la exposición y la vulnerabilidad sí: con dos horas de aviso una familia alcanza a poner a salvo a las personas, los documentos y los animales. La diferencia entre un susto y una tragedia casi siempre está en lo que se hizo antes.' }
    ];
    const respBox = h('div',{class:'stack'});
    RESP.forEach(r => respBox.append(h('button',{ class:'opt' + (St.resp === r.id ? (r.ok ? ' ok' : ' bad') : ''),
      onclick:()=>{ if (St.resp) return; St.resp = r.id; if (r.ok) St.marks.alerta = true; else St.errs++;
        Store.log('respuesta',{recurso:'cn-clima', pregunta:'respuesta_proporcional', opcion:r.id, correcto:r.ok}); render(); } },
      h('span',{class:'k'}, r.ok ? 'C' : (r.id==='indif'?'A':r.id==='alarm'?'B':'D')), r.n)));
    if (St.resp){
      const r = RESP.find(x => x.id === St.resp);
      respBox.append(h('div',{class:'notice '+(r.ok?'ok':'warn')}, h('span',{}, h('b',{}, r.ok ? 'Respuesta proporcional. ' : 'Aún no. '), r.fb)));
      if (!r.ok) respBox.append(h('button',{class:'btn sm',style:'align-self:flex-start',onclick:()=>{ St.resp=null; render(); }},'Volver a elegir'));
    }

    const bol = h('div',{class:'cli-bol'},
      h('div',{class:'hd'},
        h('div',{}, h('b',{},'Aviso hidrometeorológico N.º 014'), h('div',{class:'small muted'},'Cuenca baja del río Chila · cantón ficticio de Sanjuanes')),
        h('span',{class:'sim'},'EJERCICIO ESCOLAR · BOLETÍN SIMULADO')),
      h('div',{class:'bd'},
        h('dl',{},
          h('dt',{},'Vigencia'), h('dd',{},'desde las 07:00 del lunes hasta las 07:00 del miércoles'),
          h('dt',{},'Nivel del aviso'), h('dd',{},'amarillo (prepararse y seguir informado)'),
          h('dt',{},'Emitido por'), h('dd',{},'entidad ficticia, con el formato que usan el INAMHI y el Servicio Nacional de Gestión de Riesgos y Emergencias')),
        h('ol',{style:'padding-left:20px;display:flex;flex-direction:column;gap:5px;margin:0'},
          CLI_BOLETIN.map(b => h('li',{}, b.t)))));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Un boletín para leer con lupa'),
        h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Atención: '),'este boletín es inventado para este ejercicio. Los lugares, los números y la entidad que lo firma no existen. Sirve para practicar la lectura, nunca para tomar decisiones reales.')),
        bol),
      h('div',{class:'card stack'},
        h('p',{style:'font-weight:600;margin:0'},'1 · Separa lo que ya se midió, lo que se espera y lo que no se sabe'),
        h('p',{class:'small',style:'margin:0'},'Un boletín mezcla tres cosas distintas en el mismo texto. Distinguirlas es lo que te permite decidir bien: los datos son hechos, los pronósticos son estimaciones y la incertidumbre te dice cuánta confianza tener.'),
        filas, accion),
      h('div',{class:'card stack'},
        h('p',{style:'font-weight:600;margin:0'},'2 · Elige una respuesta proporcional'),
        h('p',{class:'small',style:'margin:0'},'Eres parte de una familia que vive a 300 m del río, fuera de la orilla pero dentro de la zona baja. Acabas de leer el boletín. ¿Qué haces?'),
        respBox),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'¿Dónde se busca la información verdadera?'),
        h('p',{style:'font-size:.92rem;margin:0'},'En el Ecuador, la información meteorológica e hidrológica oficial la produce el ',h('b',{},'INAMHI'),' (Instituto Nacional de Meteorología e Hidrología), y la gestión de alertas, evacuaciones y respuesta a emergencias corresponde al ',h('b',{},'Servicio Nacional de Gestión de Riesgos y Emergencias'),', junto con los comités de operaciones de emergencia de cada cantón. El seguimiento del fenómeno El Niño se coordina además con el Instituto Oceanográfico de la Armada.'),
        h('ul',{class:'checks plain',style:'margin:0'}, [
          'Antes de reenviar un mensaje, busca la misma información en la fuente oficial.',
          'Un audio de voz reenviado no es una alerta: una alerta tiene número, vigencia, zona y entidad que la firma.',
          'Si un mensaje no dice cuándo empieza y cuándo termina su vigencia, desconfía.',
          'Si un mensaje asegura una hora exacta y una magnitud exacta, desconfía: ningún pronóstico serio elimina la incertidumbre.'
        ].map(t => h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), t))),
        h('p',{class:'small muted',style:'margin:0'},'Este recurso no reproduce cifras, enlaces ni boletines reales de esas instituciones: te indica dónde buscarlos.')),
      secNav());
  }

  /* =============== 8 · Tu boletín de clima y riesgo =============== */
  function secBoletin(){
    const sel = h('select',{'aria-label':'Ciudad para tu serie de datos'});
    Object.values(CLI_CIUDADES).forEach(c => sel.append(h('option',{ value:c.id, selected: c.id===St.bolCiudad || null }, `${c.n} · ${c.reg}`)));
    sel.addEventListener('change', () => { St.bolCiudad = sel.value; render(); });
    const C = CLI_CIUDADES[St.bolCiudad];
    const serie = `${C.n} (${C.reg}, ${cliMil(C.alt)} m). Temperatura media anual ${cliN(cliMedT(C),1)} °C; diferencia entre el mes más cálido y el más frío ${cliN(cliAmpT(C),1)} °C. Lluvia anual ${cliMil(cliSumP(C))} mm. Mes más lluvioso: ${CLI_MESL[C.p.indexOf(Math.max(...C.p))]} con ${cliMil(Math.max(...C.p))} mm. Mes menos lluvioso: ${CLI_MESL[C.p.indexOf(Math.min(...C.p))]} con ${cliMil(Math.min(...C.p))} mm.`;

    const taC = h('textarea',{ placeholder:'El clima de esta ciudad se explica por… (menciona al menos dos causas: latitud, altitud, corriente oceánica, distancia al mar o lado de la cordillera)', 'aria-label':'Explicación causal', style:'min-height:120px' });
    taC.value = St.bolCausa;
    const taP = h('textarea',{ placeholder:'Si el INAMHI emite un aviso amarillo por lluvias intensas en mi zona, antes haré… durante haré… después haré… La fuente que consultaré es…', 'aria-label':'Protocolo de actuación', style:'min-height:120px' });
    taP.value = St.bolProto;

    const guardar = h('button',{ class:'btn primary', style:'align-self:flex-start', onclick:()=>{
      if (taC.value.trim().length < 80) return toast('Desarrolla la explicación causal: menciona al menos dos causas (mínimo 80 caracteres).');
      if (taP.value.trim().length < 80) return toast('Desarrolla el protocolo: qué harás antes, durante y después (mínimo 80 caracteres).');
      St.bolCausa = taC.value.trim(); St.bolProto = taP.value.trim();
      Store.addNote('resultado', 'Boletín de clima y riesgo · serie de datos: ' + serie, { recurso:'cn-clima', ciudad:C.id });
      Store.addNote('conclusion',
        `Boletín de clima y riesgo (${C.n}, ${C.reg}). 1) Serie de datos: ${serie} 2) Explicación causal: ${St.bolCausa} 3) Protocolo de actuación: ${St.bolProto}`,
        { recurso:'cn-clima', ciudad:C.id, unidad:'8-cvt-3' });
      St.marks.boletin = true;
      toast('Boletín guardado en tu cuaderno. Tu docente podrá revisarlo.');
      Store.log('respuesta_abierta',{ actividad:'cn-clima', ciudad:C.id, longitud: St.bolCausa.length + St.bolProto.length });
      render();
    }}, 'Guardar mi boletín en el cuaderno');

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Evidencia de la unidad'),
        h('p',{},'Esta es la evidencia principal de la unidad: un boletín de clima y riesgo con tres partes. Ninguna sobra: los datos sin explicación no enseñan nada, y una explicación sin protocolo no sirve para decidir.'),
        h('div',{class:'field'}, h('label',{},'1 · Tu serie de datos: elige la localidad'), sel),
        h('div',{class:'notice info'}, h('span',{}, h('b',{},'Serie que se guardará: '), serie)),
        fuente(FUENTE_DATOS)),
      h('div',{class:'card stack'},
        h('div',{class:'field'}, h('label',{},'2 · Explicación causal (mínimo 80 caracteres)'),
          h('p',{class:'small muted',style:'margin:0'},'Usa lo de las secciones 3 y 4. Un buen texto nombra la causa y dice cómo actúa: no basta con escribir «por la altitud».'), taC),
        h('div',{class:'field'}, h('label',{},'3 · Protocolo de actuación (mínimo 80 caracteres)'),
          h('p',{class:'small muted',style:'margin:0'},'Piensa en antes, durante y después, y en qué fuente oficial consultarás. Recuerda: la amenaza no se reduce; la exposición y la vulnerabilidad sí.'), taP),
        guardar,
        St.marks.boletin ? h('div',{class:'notice ok'}, h('span',{}, h('b',{},'Boletín guardado. '),'Puedes verlo en tu cuaderno de campo y editarlo volviendo a guardar.')) : null,
        St.marks.boletin ? h('div',{class:'row'}, h('a',{class:'btn sm',href:'#/cuaderno'},'Ver mi cuaderno')) : null),
      secNav());
  }

  /* =============== 9 · Reto final =============== */
  function secReto(){
    const hechos = [
      ['clas',    'Separaste el tiempo atmosférico del clima'],
      ['comparo', 'Comparaste dos ciudades del Ecuador con sus datos'],
      ['sim',     'Usaste el simulador y lo contrastaste con un lugar real'],
      ['enso',    'Comparaste las condiciones normales, El Niño y La Niña'],
      ['riesgo',  'Distinguiste amenaza, exposición y vulnerabilidad'],
      ['alerta',  'Leíste una alerta y elegiste una respuesta proporcional'],
      ['boletin', 'Guardaste tu boletín de clima y riesgo']
    ];
    const lista = h('ul',{class:'checks'});
    hechos.forEach(([k,t]) => lista.append(h('li',{class: St.marks[k] ? 'ok' : ''},
      h('span',{class:'ck','aria-hidden':'true'}, St.marks[k] ? '✓' : ''), h('span',{}, t, St.marks[k] ? '' : ' · pendiente'))));

    const errores = h('ul',{class:'cli-err',style:'padding:0;margin:0'});
    [['«En la mitad del mundo hace calor en todas partes.»',
      'La radiación que llega es alta en todo el país, pero lo que se hace con ella depende de la altitud, del mar y del relieve. A 2.850 m Quito promedia 13,6 °C, y en el Chimborazo hay hielo permanente: la línea equinoccial pasa por allí igual.'],
     ['«Clima y tiempo son lo mismo.»',
      'El tiempo atmosférico es lo que ocurre hoy en un lugar; el clima es el resumen de 30 años o más. Un día frío en Guayaquil no cambia el clima de Guayaquil, igual que una nota baja no cambia tu promedio del año.'],
     ['«El Niño siempre significa lluvia.»',
      'El Niño desplaza el lugar donde el aire asciende. Trae lluvias excepcionales a la Costa y, al mismo tiempo, puede dejar déficit de lluvia en zonas de la Sierra. Además cambia el mar: sin afloramiento, la pesca cae.'],
     ['«Si nunca ha pasado aquí, no hay riesgo.»',
      'Una crecida que ocurre en promedio cada 50 años puede no haberse visto en 20 años de memoria. Y el riesgo aumenta aunque la amenaza no cambie: cada casa nueva en la llanura de inundación suma exposición.']
    ].forEach(([e,r]) => errores.append(h('li',{}, h('b',{}, e), r)));

    const q = quizBlock({
      q:'Se anuncia un evento fuerte de El Niño para la próxima temporada. Tu comunidad está en la cuenca baja de un río de la Costa. ¿Cuál es el análisis correcto?',
      ops:[
        'Lloverá más en todo el Ecuador, porque El Niño es sinónimo de lluvia en el país entero',
        'Sube la amenaza de inundación en la Costa y puede haber a la vez déficit de lluvia en zonas de la Sierra; como la amenaza no se puede reducir, hay que trabajar sobre la exposición y la vulnerabilidad',
        'No hay nada que hacer: la comunidad está donde está y contra la naturaleza no se puede',
        'Bajará la temperatura del mar frente a la Costa, así que además mejorará la pesca'],
      ok:1,
      fb:'Ese es el razonamiento completo de la unidad: identificar cómo cambia la amenaza, reconocer que no está en nuestras manos y actuar sobre los dos factores que sí lo están. Reubicar lo que está en la llanura de inundación reduce la exposición; alertas tempranas, vías de evacuación y fondos de emergencia reducen la vulnerabilidad.',
      wrong:[
        'El Niño no suma lluvia en todo el país: la desplaza. Mientras la Costa se inunda, varias zonas de la Sierra pueden quedarse sin agua suficiente para el riego. Revisa la sección 5.',
        'Es la respuesta fatalista. Es verdad que la amenaza no se negocia, pero la exposición y la vulnerabilidad sí se pueden reducir, y eso es exactamente lo que hace la gestión de riesgos. Revisa la sección 6.',
        'Es al revés: durante El Niño el mar frente al Ecuador se calienta 2 a 4 °C por encima de lo normal y el afloramiento se interrumpe, así que la pesca cae. El agua más fría de lo normal corresponde a La Niña.']
    }, (att) => {
      if (hecho) return;
      hecho = true;
      const score = hechos.filter(([k]) => St.marks[k]).length + 1;
      const min = Math.round((Date.now() - St.start)/60000);
      St.marks.reto = true;
      Store.completeActivity('cn-clima', { score:`${score}/8`, attempts: St.errs + (att-1), duracionMin:min });
      if (typeof Store.grantBadge === 'function') { try { Store.grantBadge('investigador'); } catch(e){} }
      retoSt.className = 'notice ok'; retoSt.textContent = 'Reto resuelto ✓';
      toast('Actividad completada: tablero de clima y riesgo.');
      /* se añade el cierre sin volver a dibujar la sección: así no se borra
         la retroalimentación del propio quiz */
      cierre.className = 'notice ok'; cierre.innerHTML = '';
      cierre.append(h('span',{}, h('b',{},'Actividad completada. '),'Vuelve cuando quieras: el simulador de factores y el esquema de El Niño te servirán también en 10.º, cuando estudies océanos y cambio climático, y en Biología cuando analices cómo el clima delimita los ecosistemas.'));
    });
    let hecho = !!St.marks.reto;
    const cierre = h('div',{});
    if (hecho){ cierre.className = 'notice ok';
      cierre.append(h('span',{}, h('b',{},'Actividad completada. '),'Vuelve cuando quieras: el simulador de factores y el esquema de El Niño te servirán también en 10.º, cuando estudies océanos y cambio climático, y en Biología cuando analices cómo el clima delimita los ecosistemas.')); }

    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Lo que hiciste hasta aquí'),
        lista,
        h('p',{class:'small muted',style:'margin:0'},'Puedes resolver el reto aunque falte alguna casilla, pero tu resultado será mejor si antes guardas el boletín, que es la evidencia de la unidad.')),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Cuatro frases que conviene desmontar'),
        errores),
      h('div',{class:'card stack'}, q, cierre),
      secNav());
  }

  /* ---------- render ---------- */
  function render(){
    renderNav(); body.innerHTML = '';
    const f = [secTiempo, secRegiones, secPorque, secFactores, secEnso, secRiesgo, secAlerta, secBoletin, secReto][St.sec];
    body.append(f());
    Store.log('seccion',{ recurso:'cn-clima', seccion: SEC[St.sec].id });
  }
  render();
});
</script>
