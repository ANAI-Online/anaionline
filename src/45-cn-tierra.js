<style>
/* ===== CN · 10.º CVT U2 · Tierra dinámica: placas, sismos, volcanes, rocas y océanos ===== */
.tie-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.tie-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.tie-nav button[aria-current="true"]{background:var(--eco);border-color:var(--eco);color:#fff}
.tie-stage{background:radial-gradient(ellipse at 50% 40%,#2a2016 0%,#150f0a 64%,#0c0806 100%)!important}
.tie-stage .lbl{background:rgba(18,12,8,.76);border-color:#5b4632;color:#ffeedd}
.tie-svg{width:100%;height:auto;display:block;background:var(--bg-3);border:1px solid var(--line);border-radius:14px}
.tie-mapa{width:100%;height:auto;display:block;background:#16233a;border:1px solid var(--line);border-radius:14px}
.tie-mapa text{font-family:"IBM Plex Sans",sans-serif}
.tie-leg{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;font-size:.78rem;color:var(--ink-3)}
.tie-leg span{display:inline-flex;align-items:center;gap:6px}
.tie-leg i{width:26px;height:0;border-top-width:3px;border-top-style:solid;display:inline-block}
.tie-chips{display:flex;flex-wrap:wrap;gap:7px}
.tie-chips button{border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:11px;padding:8px 12px;font:600 .84rem/1.15 "IBM Plex Sans",sans-serif;cursor:pointer;text-align:left}
.tie-chips button[aria-pressed="true"]{border-color:var(--eco);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--eco) 24%,transparent)}
.tie-chips button small{display:block;font-weight:400;font-size:.72rem;color:var(--ink-3);margin-top:2px}
.tie-kv{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:.85rem;margin:6px 0 0}
.tie-kv dt{font-weight:600;color:var(--ink-2)}
.tie-kv dd{margin:0;color:var(--ink-2)}
.tie-est{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;border-bottom:1px dashed var(--line);padding:8px 0}
.tie-est input{width:110px}
.tie-cands{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.tie-ciclo{width:100%;height:auto;background:var(--bg-3);border:1px solid var(--line);border-radius:14px}
.tie-ciclo .nd{cursor:default}
.tie-ciclo .nd.on rect,.tie-ciclo .nd.on ellipse{stroke-width:3.5}
.tie-proc{display:grid;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));gap:8px}
.tie-proc button{border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:11px;padding:9px 11px;font:600 .82rem/1.2 "IBM Plex Sans",sans-serif;cursor:pointer;text-align:left}
.tie-proc button:hover{border-color:var(--eco)}
.tie-proc button small{display:block;font-weight:400;font-size:.74rem;line-height:1.3;color:var(--ink-3);margin-top:4px}
.tie-ruta{display:flex;flex-wrap:wrap;gap:5px;align-items:center;font-family:"IBM Plex Mono",monospace;font-size:.75rem;color:var(--ink-3)}
.tie-ruta b{color:var(--ink);font-family:"IBM Plex Sans",sans-serif}
.tie-abc{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}
.tie-abc>div{border:1px solid var(--line);border-radius:12px;padding:11px 13px;background:var(--bg-2)}
.tie-abc h4{margin:0 0 6px;font-size:.92rem}
.tie-abc li{font-size:.84rem;margin-bottom:5px}
.tie-mat{font-size:.82rem}
.tie-mat td,.tie-mat th{vertical-align:middle}
.tie-seg{display:flex;gap:4px}
.tie-seg button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:8px;padding:4px 9px;font:600 .74rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.tie-seg button[aria-pressed="true"]{background:var(--eco);border-color:var(--eco);color:#fff}
.tie-sld{display:grid;grid-template-columns:1fr;gap:4px;margin-bottom:10px}
.tie-sld input[type=range]{width:100%}
.tie-bar{height:14px;border-radius:7px;background:linear-gradient(90deg,#4fa3d1 0%,#e0a94f 52%,#d1584f 100%);position:relative;border:1px solid var(--line)}
.tie-bar i{position:absolute;top:-4px;width:4px;height:22px;background:var(--ink);border-radius:2px;transform:translateX(-2px)}
[data-motion="reducido"] .tie-bar i{transition:none}
@media(max-width:700px){.tie-est{grid-template-columns:1fr}.tie-abc{grid-template-columns:1fr}}
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · 10.º EGB Superior · Ciencias de la Vida y la Tierra
   Unidad 2: Tierra dinámica, océanos y cambio climático
   (apoya también 8.º CVT U3: Tierra, atmósfera, clima y riesgo)

   Destrezas: AO.CVT.10.04 (placas, bordes, sismos, vulcanismo, ciclo de
   rocas), AO.CVT.10.05 (ciclos, datos climáticos y oceánicos: variabilidad
   frente a tendencia), AO.CVT.10.06 (mitigación y adaptación por impacto,
   equidad, costo y factibilidad).

   Ruta: #/cn/tierra   ·   Actividad: cn-tierra
   Todas las cifras son APROXIMADAS y redondeadas para el aula.
   ===================================================================== */

/* Registro defensivo de la actividad (no se toca src/30-cn-data.js) */
if (typeof BIO !== 'undefined' && BIO.activities)
  Object.assign(BIO.activities, {'cn-tierra':{t:'Tierra dinámica: placas, sismos y volcanes', unidad:null, peso:0, xp:140}});
if (typeof ACT_HREF !== 'undefined') ACT_HREF['cn-tierra'] = '#/cn/tierra';

/* ---------- utilidades de formato (español de Ecuador) ---------- */
const tieDec = (v, d=1) => Number(v).toFixed(d).replace('.', ',');
const tieMil = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const tieQuieto = () => !!Store.s.a11y.motion || (typeof motionOK === 'function' && !motionOK());

/* =====================================================================
   DATOS · 1. Capas de la Tierra (radios en km, valores aproximados)
   ===================================================================== */
const TIE_R = 6371;
const TIE_CAPAS = [
  { id:'nucleo-interno', n:'Núcleo interno', r0:0, r1:1216, hex:'#ffe9a8', col:0xffe9a8,
    estado:'Sólido', temp:'≈ 5.200 °C', comp:'Hierro y níquel',
    d:'Está tan caliente como la superficie del Sol y, aun así, es sólido: la presión (unos 3,6 millones de veces la atmosférica) aprieta tanto los átomos que no pueden separarse. El estado de la materia no depende solo de la temperatura, también de la presión.',
    evid:'Se descubrió en 1936 gracias a Inge Lehmann: ciertas ondas P llegaban a lugares donde no deberían llegar, como si rebotaran en una esfera interior más rápida.' },
  { id:'nucleo-externo', n:'Núcleo externo', r0:1216, r1:3486, hex:'#ff9b4d', col:0xff9b4d,
    estado:'Líquido', temp:'de ≈ 4.000 °C a ≈ 5.000 °C', comp:'Hierro y níquel fundidos',
    d:'Es la única capa verdaderamente líquida del planeta. Sus corrientes de metal fundido, cargadas eléctricamente, generan el campo magnético terrestre: por eso la brújula apunta al norte.',
    evid:'Las ondas S no lo atraviesan. Como las ondas S son transversales y los líquidos no resisten ese tipo de deformación, su ausencia al otro lado del planeta prueba que esta capa es líquida.' },
  { id:'manto', n:'Manto', r0:3486, r1:6341, hex:'#c4603f', col:0xc4603f,
    estado:'Sólido, pero fluye muy lentamente', temp:'de ≈ 500 °C a ≈ 4.000 °C', comp:'Rocas ricas en silicatos de hierro y magnesio (peridotita)',
    d:'Ocupa unos 2.855 km: es, con diferencia, la capa más voluminosa (alrededor del 84 % del volumen del planeta). Es sólido, pero a esa presión y temperatura se deforma como un plástico y circula en corrientes lentísimas, de unos pocos centímetros por año. Ese movimiento arrastra a las placas.',
    evid:'Las ondas P y S lo atraviesan (luego es sólido) y su rapidez cambia en escalones a ciertas profundidades: son cambios en la estructura de los minerales.' },
  { id:'corteza', n:'Corteza', r0:6341, r1:6371, hex:'#9fb0bd', col:0x9fb0bd,
    estado:'Sólida y rígida', temp:'de ≈ 0 °C a ≈ 1.000 °C en su base', comp:'Oceánica: basalto (densidad ≈ 3,0 g/cm³). Continental: granito (densidad ≈ 2,7 g/cm³)',
    d:'Es la capa más delgada: de 5 a 10 km bajo los océanos y de 30 a 70 km bajo los continentes (lo más grueso, bajo cordilleras como los Andes). Comparada con el planeta entero es como la cáscara de una manzana. Ojo: la corteza NO es la placa.',
    evid:'La discontinuidad de Mohorovičić: a esa profundidad las ondas sísmicas aceleran de golpe. Ahí termina la corteza y empieza el manto.' }
];
const TIE_LITO = { r0:6271, r1:6371, hex:'#5fd3e0',
  d:'La litosfera es la capa rígida que se rompe en placas: incluye TODA la corteza y además la parte superior del manto, hasta unos 100 km de profundidad (más bajo los continentes). Debajo está la astenosfera, un manto más caliente y dúctil sobre el que la litosfera se desliza.' };

/* =====================================================================
   DATOS · 2. Mapa de placas (proyección equirectangular simplificada)
   ===================================================================== */
const TIE_MW = 920, TIE_MH = 470;
const tieX = lon => ((lon+180)/360*TIE_MW);
const tieY = lat => ((90-lat)/180*TIE_MH);
const tiePath = (pts, cerrar) => pts.map((p,i)=>(i?'L':'M')+tieX(p[0]).toFixed(1)+' '+tieY(p[1]).toFixed(1)).join(' ') + (cerrar?' Z':'');
/* línea abierta que cruza el meridiano de 180°: se corta en el borde del mapa en vez de atravesarlo entero */
const tieLinea = pts => { let d = ''; pts.forEach((p,i) => { const q = pts[i-1];
  if (q && Math.abs(p[0]-q[0]) > 180){ const s = q[0] > 0 ? 1 : -1, t = (180*s - q[0])/((p[0]+360*s) - q[0]), lat = q[1] + (p[1]-q[1])*t;
    d += ' L'+tieX(180*s).toFixed(1)+' '+tieY(lat).toFixed(1)+' M'+tieX(-180*s).toFixed(1)+' '+tieY(lat).toFixed(1); }
  d += (i?' L':'M')+tieX(p[0]).toFixed(1)+' '+tieY(p[1]).toFixed(1); }); return d; };

const TIE_TIERRAS = [
  [[-168,66],[-155,71],[-130,70],[-110,69],[-95,70],[-80,73],[-64,62],[-56,51],[-67,45],[-74,39],[-81,26],[-97,26],[-105,20],[-110,24],[-117,32],[-124,41],[-124,48],[-136,58],[-152,59],[-168,66]],
  [[-92,17],[-84,10],[-78,9],[-77,7],[-81,2],[-80,-5],[-75,-15],[-71,-20],[-70,-32],[-73,-42],[-75,-52],[-68,-55],[-64,-48],[-62,-40],[-57,-35],[-53,-33],[-48,-25],[-39,-16],[-35,-6],[-44,-1],[-51,4],[-60,9],[-71,12],[-77,9],[-83,9],[-88,15],[-92,17]],
  [[-45,60],[-25,70],[-20,77],[-30,83],[-55,83],[-58,75],[-53,66],[-45,60]],
  [[-17,15],[-8,5],[3,6],[9,4],[13,-5],[12,-17],[15,-28],[20,-35],[27,-33],[33,-27],[40,-15],[41,-2],[51,12],[44,12],[38,18],[33,24],[32,31],[22,33],[10,37],[-2,36],[-6,36],[-13,28],[-17,21],[-17,15]],
  [[-10,43],[-2,49],[4,58],[18,70],[32,70],[60,72],[80,74],[105,77],[130,73],[160,70],[172,66],[160,60],[143,54],[135,44],[130,43],[123,39],[121,30],[110,20],[103,10],[97,16],[88,22],[80,12],[72,20],[62,25],[56,27],[48,30],[36,36],[28,41],[18,44],[8,44],[-10,43]],
  [[114,-22],[121,-18],[130,-12],[136,-12],[142,-11],[146,-19],[151,-24],[153,-28],[150,-37],[143,-39],[135,-35],[129,-32],[118,-34],[114,-30],[114,-22]],
  [[-180,-72],[-120,-74],[-60,-64],[-20,-71],[20,-70],[70,-67],[120,-66],[170,-72],[180,-78],[180,-90],[-180,-90],[-180,-72]],
  [[166,-46],[174,-41],[178,-38],[173,-34],[172,-40],[166,-46]],
  [[95,6],[105,-6],[116,-9],[130,-8],[141,-8],[134,-3],[120,-3],[110,1],[100,6],[95,6]]
];
/* Bordes de placa: tipo div (divergente), conv (convergente), trans (transformante) */
const TIE_BORDES = [
  { tipo:'div', n:'Dorsal mesoatlántica', pts:[[-27,68],[-32,58],[-30,45],[-28,30],[-25,12],[-18,2],[-12,-12],[-14,-28],[-13,-42],[-4,-52],[10,-55],[25,-57]] },
  { tipo:'div', n:'Dorsal del Pacífico oriental', pts:[[-104,22],[-102,10],[-97,-2],[-101,-14],[-110,-26],[-115,-38],[-118,-50],[-128,-58]] },
  { tipo:'div', n:'Dorsal índica', pts:[[42,12],[52,-2],[58,-16],[66,-28],[76,-38],[90,-48],[105,-52],[130,-56],[155,-60]] },
  { tipo:'div', n:'Dorsal de Galápagos', pts:[[-101,2],[-95,2],[-89,2],[-85,2]] },
  { tipo:'div', n:'Rift de África oriental', pts:[[33,12],[36,4],[36,-4],[34,-12]] },
  { tipo:'conv', n:'Fosa de Perú-Chile (Nazca bajo Sudamérica)', pts:[[-79,3],[-81,-6],[-80,-14],[-73,-24],[-72,-34],[-75,-44],[-76,-50]] },
  { tipo:'conv', n:'Fosa de América Central (Cocos bajo el Caribe)', pts:[[-105,18],[-98,15],[-90,12],[-85,9],[-82,7]] },
  { tipo:'conv', n:'Fosa de las Aleutianas', pts:[[160,52],[175,51],[-178,51],[-168,53],[-158,56],[-150,58]] },
  { tipo:'conv', n:'Fosa de Japón y de las Marianas', pts:[[152,54],[146,44],[142,36],[142,28],[146,20],[147,12],[144,5]] },
  { tipo:'conv', n:'Fosa de Java-Sonda', pts:[[92,14],[94,4],[100,-6],[112,-11],[124,-12],[132,-8]] },
  { tipo:'conv', n:'Cinturón alpino-himalayo', pts:[[0,36],[16,38],[30,38],[44,36],[58,30],[70,32],[82,30],[95,26]] },
  { tipo:'conv', n:'Fosa de Tonga-Kermadec', pts:[[-175,-16],[-176,-24],[-178,-32],[177,-39]] },
  { tipo:'trans', n:'Falla de San Andrés', pts:[[-114,31],[-118,34],[-122,37],[-125,41]] },
  { tipo:'trans', n:'Falla norte de Anatolia', pts:[[27,41],[34,41],[41,39]] },
  { tipo:'trans', n:'Falla de la Reina Carlota', pts:[[-129,50],[-133,54],[-137,58]] },
  { tipo:'trans', n:'Falla del Caribe septentrional', pts:[[-86,19],[-76,19],[-68,19],[-61,16]] },
  { tipo:'trans', n:'Falla Alpina de Nueva Zelanda', pts:[[167,-45],[172,-42],[175,-40]] }
];
const TIE_PLACAS = [
  ['Placa del Pacífico',-160,-10],['Placa de Nazca',-95,-18],['Placa Sudamericana',-58,-18],
  ['Placa Norteamericana',-100,48],['Placa Africana',18,6],['Placa Euroasiática',75,52],
  ['Placa Indoaustraliana',122,-28],['Placa Antártica',10,-80],['Placa de Cocos',-96,6],
  ['Placa del Caribe',-72,14],['Placa Filipina',132,18],['Placa Arábiga',48,22]
];
const TIE_TIPOS = {
  div:   { n:'Borde divergente', col:'#4fd3a8', dash:'12 5', em:'↔',
           d:'Las placas se separan. El manto asciende, se funde por descompresión y crea corteza oceánica nueva.',
           forma:'Dorsal oceánica (una cordillera submarina) y, en los continentes, un rift con valle hundido.',
           sismos:'Sismos superficiales (menos de 30 km) y en general de magnitud moderada.',
           volc:'Volcanismo efusivo: lava basáltica muy fluida, con poca explosividad.',
           ej:'Dorsal mesoatlántica; dorsal de Galápagos, que construyó las islas; rift de África oriental.' },
  conv:  { n:'Borde convergente', col:'#ff8f5a', dash:'0', em:'→←',
           d:'Las placas chocan. Si una es oceánica (más densa), se hunde bajo la otra: es la subducción. Si chocan dos continentes, se arrugan y levantan una cordillera.',
           forma:'Fosa oceánica profunda, cordillera y arco de volcanes; o gran cadena montañosa sin volcanes si chocan dos continentes.',
           sismos:'Los más grandes del planeta. Van de superficiales junto a la fosa hasta 600 o 700 km bajo el continente, siguiendo la placa que baja (zona de Wadati-Benioff).',
           volc:'Volcanismo explosivo: el agua que baja con la placa hace fundir el manto y produce magmas viscosos y ricos en gases.',
           ej:'La placa de Nazca bajo la Sudamericana (Ecuador, Perú, Chile); los Himalayas, por el choque de India con Asia.' },
  trans: { n:'Borde transformante', col:'#c08ee8', dash:'5 6', em:'⇄',
           d:'Las placas se deslizan una junto a la otra, en sentidos opuestos. No se crea ni se destruye litosfera.',
           forma:'Una falla larga y visible en el paisaje: ríos y caminos aparecen cortados y desplazados.',
           sismos:'Superficiales pero pueden ser muy destructivos, porque el foco está cerca de la superficie y de las ciudades.',
           volc:'Prácticamente no hay volcanes: no hay material que ascienda ni que se funda.',
           ej:'La falla de San Andrés en California; la falla norte de Anatolia en Turquía.' }
};

/* =====================================================================
   DATOS · 3. Sismos
   ===================================================================== */
/* Triangulación: estaciones ficticias con nombres de ciudades ecuatorianas.
   Regla de aula: distancia (km) ≈ (t_S − t_P) en segundos × 8 km/s.       */
const TIE_VP = 6.2, TIE_VS = 3.6;          /* km/s, aproximados en la corteza */
const TIE_K  = 1/(1/TIE_VS - 1/TIE_VP);    /* ≈ 8,6 km por segundo de diferencia */
const TIE_EPI = { x:262, y:214, n:'frente a la costa de Manabí' };
const TIE_ESTACIONES = [
  { id:'e1', n:'Estación Portoviejo', x:318, y:238 },
  { id:'e2', n:'Estación Quito',      x:392, y:196 },
  { id:'e3', n:'Estación Guayaquil',  x:352, y:316 }
];
const TIE_CANDIDATOS = [
  { id:'c1', x:262, y:214, n:'Mar frente a la costa de Manabí', ok:true },
  { id:'c2', x:392, y:196, n:'Bajo la ciudad de Quito', ok:false },
  { id:'c3', x:430, y:300, n:'En la Amazonía, cerca del Puyo', ok:false },
  { id:'c4', x:300, y:360, n:'En el golfo de Guayaquil', ok:false }
];
const TIE_MERCALLI = [
  ['I–III','Casi nadie lo siente; en pisos altos parece el paso de un camión.'],
  ['IV–V','Lo sienten casi todos; se mueven puertas y lámparas, y se derrama el agua de los vasos.'],
  ['VI–VII','Se camina con dificultad; caen objetos de los estantes y se agrietan paredes mal construidas.'],
  ['VIII–IX','Daño serio: caen chimeneas, se desploman construcciones sin refuerzo, aparecen grietas en el suelo.'],
  ['X–XII','Destrucción generalizada: puentes, vías y edificaciones colapsan; el terreno se deforma.']
];

/* =====================================================================
   DATOS · 4. Volcanes
   ===================================================================== */
const TIE_FORMAS = [
  { id:'escudo', n:'Volcán en escudo', magma:'Basáltico', sil:'Poca sílice (≈ 50 %)', visc:'Muy poco viscoso',
    gas:'Poco gas disuelto', erup:'Efusiva: la lava sale y corre, casi sin explosiones',
    forma:'Ancho y bajo, con laderas suaves de 5° a 10°, como un escudo apoyado en el suelo.',
    ej:'Fernandina y Sierra Negra, en Galápagos; Mauna Loa, en Hawái.' },
  { id:'estrato', n:'Estratovolcán (volcán compuesto)', magma:'Andesítico o dacítico', sil:'Sílice intermedia a alta (55–65 %)', visc:'Viscoso',
    gas:'Bastante gas disuelto', erup:'Alterna erupciones efusivas y explosivas, según cuánto gas quede atrapado',
    forma:'Cono alto y empinado (laderas de 25° a 35°) formado por capas alternadas de lava y de material piroclástico. De ahí viene lo de "estrato".',
    ej:'Cotopaxi, Tungurahua, Sangay y El Reventador, en el Ecuador continental.' },
  { id:'caldera', n:'Caldera', magma:'Riolítico o dacítico', sil:'Mucha sílice (más del 68 %)', visc:'Extremadamente viscoso',
    gas:'Mucho gas atrapado', erup:'Explosiva: la cámara se vacía de golpe y el techo se hunde',
    forma:'Una gran depresión circular, a veces de varios kilómetros, que suele llenarse de agua y formar una laguna.',
    ej:'Quilotoa y Cuicocha, en el Ecuador; el Cráter del Lago (Estados Unidos).' }
];
const TIE_VOLCANES = [
  { n:'Cotopaxi', tipo:'Estratovolcán', alt:'≈ 5.897 m s. n. m.', mag:'Andesítico',
    prov:'Entre Cotopaxi, Pichincha y Napo, en la Cordillera Real',
    pel:'Tiene casquete glaciar: el peligro principal son los lahares, flujos de lodo y bloques que bajan a gran velocidad por los valles de los ríos Cutuchi, Pita y Santa Clara, donde hoy vive mucha gente.' },
  { n:'Tungurahua', tipo:'Estratovolcán', alt:'≈ 5.023 m s. n. m.', mag:'Andesítico',
    prov:'Provincia de Tungurahua, junto a Baños de Agua Santa',
    pel:'Caída de ceniza hacia el occidente, flujos piroclásticos por las quebradas y lahares. Es uno de los volcanes mejor vigilados del país.' },
  { n:'El Reventador', tipo:'Estratovolcán', alt:'≈ 3.562 m s. n. m.', mag:'Andesítico-basáltico',
    prov:'Entre Napo y Sucumbíos, en la vertiente amazónica',
    pel:'Crece dentro de una caldera de avalancha en una zona poco poblada; su ceniza puede llegar hasta Quito según el viento.' },
  { n:'Sangay', tipo:'Estratovolcán', alt:'≈ 5.286 m s. n. m.', mag:'Andesítico-basáltico',
    prov:'Provincia de Morona Santiago, dentro del parque nacional Sangay',
    pel:'Caída de ceniza sobre las provincias vecinas y aporte de material a la cuenca del río Upano, que puede generar represamientos y lahares.' },
  { n:'Quilotoa', tipo:'Caldera', alt:'≈ 3.914 m s. n. m. en el borde', mag:'Riolítico-dacítico',
    prov:'Provincia de Cotopaxi',
    pel:'Su laguna ocupa una caldera formada por una erupción explosiva muy grande. El peligro asociado sería explosivo, con caída de ceniza a larga distancia.' },
  { n:'Fernandina', tipo:'Volcán en escudo', alt:'≈ 1.476 m s. n. m.', mag:'Basáltico',
    prov:'Islas Galápagos',
    pel:'Coladas de lava fluidas que pueden llegar al mar. La isla no está habitada; el riesgo mayor es para la fauna endémica.' }
];
const TIE_PRODUCTOS = [
  ['Lava','Roca fundida que sale a la superficie. Es lenta: casi nunca mata gente, pero arrasa lo que encuentra.'],
  ['Ceniza','Fragmentos de roca y vidrio de menos de 2 mm. Daña los pulmones, contamina el agua, colapsa techos por su peso y apaga los motores de los aviones.'],
  ['Flujos piroclásticos','Avalanchas de gas, ceniza y bloques a cientos de grados que bajan a más de 100 km/h. Son el producto volcánico más letal: no se puede correr más rápido que ellos.'],
  ['Lahares','Mezcla de agua, lodo y bloques con la consistencia del hormigón fresco. Se forman al derretirse un glaciar o al llover sobre la ceniza, y siguen los cauces de los ríos, muy lejos del cráter.'],
  ['Gases','Vapor de agua, CO₂ y compuestos de azufre. Se acumulan en hondonadas y pueden asfixiar; el azufre además genera lluvia ácida.']
];

/* =====================================================================
   DATOS · 5. Ciclo de las rocas (grafo de estados y procesos)
   ===================================================================== */
const TIE_NODOS = {
  magma:      { n:'Magma', tipo:'fundido', x:300, y:70,  col:'#ff8a4d',
                d:'Roca fundida bajo la superficie, entre unos 700 °C y 1.300 °C. Si sale, se la llama lava.' },
  ignea:      { n:'Roca ígnea', tipo:'roca', x:520, y:180, col:'#b06a5a',
                d:'Se forma al enfriarse el magma o la lava. Si enfría lento y en profundidad, cristales grandes (granito); si enfría rápido en la superficie, cristales diminutos (basalto).' },
  sedimentos: { n:'Sedimentos sueltos', tipo:'material', x:520, y:340, col:'#d6b271',
                d:'Granos de todos los tamaños producidos al romperse una roca: arena, limo, arcilla, gravas.' },
  deposito:   { n:'Sedimentos depositados', tipo:'material', x:300, y:410, col:'#c9a05c',
                d:'Los granos llegan a una cuenca —el mar, un lago, una llanura— y se van acumulando en capas horizontales.' },
  sedimentaria:{ n:'Roca sedimentaria', tipo:'roca', x:80, y:340, col:'#a8b06a',
                d:'Capas compactadas y pegadas por cementos naturales: arenisca, lutita, caliza. Es la única que suele guardar fósiles.' },
  metamorfica:{ n:'Roca metamórfica', tipo:'roca', x:80, y:180, col:'#7a8ec2',
                d:'Una roca que cambió en estado sólido por calor y presión, sin llegar a fundirse: mármol (de la caliza), pizarra (de la lutita), gneis (del granito).' }
};
const TIE_PROCESOS = [
  { id:'enfriamiento', n:'Enfriamiento y solidificación', de:['magma'], a:'ignea',
    d:'El magma pierde calor y sus minerales cristalizan.' },
  { id:'meteorizacion', n:'Meteorización y erosión', de:['ignea','sedimentaria','metamorfica'], a:'sedimentos',
    d:'El agua, el hielo, el viento, los cambios de temperatura y los seres vivos rompen la roca en pedazos.' },
  { id:'transporte', n:'Transporte', de:['sedimentos'], a:'deposito',
    d:'Los ríos, el viento, los glaciares y las olas llevan los granos hasta una cuenca donde se acumulan.' },
  { id:'compactacion', n:'Compactación y cementación', de:['deposito'], a:'sedimentaria',
    d:'El peso de las capas de arriba aprieta los granos y las sales disueltas los pegan: es la litificación.' },
  { id:'calorpresion', n:'Calor y presión (sin fundir)', de:['ignea','sedimentaria'], a:'metamorfica',
    d:'A varios kilómetros de profundidad, la roca se recristaliza en estado sólido y sus minerales se alinean.' },
  { id:'fusion', n:'Fusión', de:['metamorfica','ignea','sedimentaria'], a:'magma',
    d:'Si la temperatura sube lo suficiente (o baja el punto de fusión porque entra agua), la roca se funde y vuelve a ser magma.' }
];
/* Corrección específica cuando el proceso elegido no sale del nodo actual */
const TIE_CICLO_FB = {
  'magma:meteorizacion':'La meteorización rompe rocas sólidas. El magma no es una roca sólida: primero tiene que enfriarse y solidificarse.',
  'magma:transporte':'El transporte mueve granos sueltos. Todavía no hay granos: el magma ni siquiera se ha solidificado.',
  'magma:compactacion':'No hay nada que compactar: la compactación aprieta capas de sedimentos ya depositados.',
  'magma:calorpresion':'El metamorfismo transforma una roca en estado sólido. El magma ya está fundido: aplicarle más calor no lo convierte en roca metamórfica.',
  'magma:fusion':'El magma ya está fundido; no puede fundirse otra vez.',
  'ignea:enfriamiento':'La roca ígnea ya se formó al enfriarse: ese paso está cumplido. Para seguir el ciclo debe ser atacada por el agua y el viento, o enterrarse.',
  'ignea:transporte':'Todavía no hay granos que transportar. Primero la meteorización tiene que romper la roca ígnea en pedazos.',
  'ignea:compactacion':'Solo se compacta lo que ya está suelto y depositado en capas. Una roca ígnea entera no se compacta.',
  'sedimentos:enfriamiento':'Los sedimentos están fríos: no hay nada que solidificar por enfriamiento.',
  'sedimentos:meteorizacion':'Los sedimentos ya son producto de la meteorización. El siguiente paso es que algo los mueva hasta una cuenca.',
  'sedimentos:compactacion':'Falta un paso: los granos tienen que llegar y acumularse en una cuenca. Sin transporte y depósito no hay capas que compactar.',
  'sedimentos:calorpresion':'Los granos sueltos en la ladera no están enterrados ni sometidos a presión. Primero deben depositarse y litificarse.',
  'sedimentos:fusion':'Para fundirse hace falta muchísima profundidad y temperatura. Unos granos en la superficie no llegan ni de cerca.',
  'deposito:enfriamiento':'No hay material fundido: los sedimentos depositados ya están fríos.',
  'deposito:meteorizacion':'Ya fueron meteorizados. Enterrados en la cuenca, lo que les toca es ser apretados y cementados.',
  'deposito:transporte':'Ya llegaron a la cuenca. Si los vuelves a transportar, sigues dando vueltas sin formar roca.',
  'deposito:calorpresion':'Todavía no son roca: primero la compactación y la cementación los convierten en roca sedimentaria.',
  'deposito:fusion':'Están en la superficie de una cuenca, muy lejos de la temperatura necesaria para fundirse.',
  'sedimentaria:enfriamiento':'No hay magma que enfriar: la roca sedimentaria se formó por compactación, no por enfriamiento.',
  'sedimentaria:transporte':'Es una roca entera, no granos sueltos. Para transportarla, la meteorización debe romperla antes.',
  'sedimentaria:compactacion':'Ya está compactada: ese fue justamente el proceso que la formó.',
  'metamorfica:enfriamiento':'No hay magma: la roca metamórfica se formó en estado sólido, sin llegar a fundirse.',
  'metamorfica:transporte':'Es una roca entera. Para que haya transporte antes debe romperse en granos.',
  'metamorfica:compactacion':'La compactación actúa sobre sedimentos sueltos, no sobre una roca ya recristalizada.',
  'metamorfica:calorpresion':'Ya pasó por el metamorfismo. Si le sigues subiendo la temperatura, lo siguiente no es más metamorfismo: es la fusión.'
};

/* =====================================================================
   DATOS · 6. Océanos y clima
   ===================================================================== */
const TIE_CORRIENTES = [
  { n:'Corriente de Humboldt (fría)', t:'sup', frio:true, pts:[[-72,-42],[-74,-30],[-79,-18],[-81,-8],[-82,-2],[-86,1]],
    d:'Sube fría desde el sur por la costa de Chile y Perú. Frente al Ecuador provoca afloramiento: agua profunda rica en nutrientes que sostiene una de las pesquerías más productivas del mundo. También explica por qué el mar de la costa sur es más frío que el de Esmeraldas.' },
  { n:'Corriente del Golfo (cálida)', t:'sup', frio:false, pts:[[-80,26],[-75,33],[-65,40],[-50,44],[-35,48],[-20,52],[-10,55]],
    d:'Lleva agua cálida del Caribe hacia el Atlántico norte. Es la razón de que Europa occidental sea mucho más templada que Canadá, que está a la misma latitud.' },
  { n:'Corriente Ecuatorial del Sur (cálida)', t:'sup', frio:false, pts:[[-10,-4],[-40,-4],[-70,-4],[-90,-3],[-120,-2],[-150,-2]],
    d:'Empujada por los vientos alisios, mueve agua cálida de este a oeste a lo largo del ecuador y la acumula en el Pacífico occidental.' },
  { n:'Corriente de Kuroshio (cálida)', t:'sup', frio:false, pts:[[122,22],[130,30],[140,36],[150,40],[165,42]],
    d:'El equivalente asiático de la Corriente del Golfo: transporta calor hacia el norte por la costa de Japón.' },
  { n:'Corriente Circumpolar Antártica (fría)', t:'sup', frio:true, pts:[[-170,-58],[-120,-58],[-70,-57],[-20,-56],[30,-56],[90,-58],[150,-59],[178,-58]],
    d:'Da la vuelta completa al continente antártico sin encontrar tierra. Es la corriente que más agua mueve del planeta y aísla térmicamente la Antártida.' },
  { n:'Circulación profunda (cinta transportadora)', t:'prof', frio:true, pts:[[-30,60],[-28,30],[-25,0],[-20,-40],[20,-58],[80,-55],[120,-40],[150,-10],[170,20],[-170,35]],
    d:'En el Atlántico norte el agua fría y salada se hunde (es más densa) y viaja por el fondo durante unos 1.000 años hasta aflorar en el Pacífico e Índico. Ese circuito reparte calor entre los océanos y guarda carbono en la profundidad.' }
];
/* Serie de demostración: tendencia + variabilidad de tipo El Niño / La Niña.
   NO son datos medidos: se construye para que el estudiante separe ambas partes. */
const TIE_ENSO = { /* índice de demostración, inspirado en los años conocidos */
  1982:1.3,1983:1.6,1984:-0.6,1985:-0.5,1986:0.5,1987:1.2,1988:-1.5,1989:-1.2,1990:0.3,1991:1.0,
  1992:1.2,1993:0.4,1994:0.7,1995:-0.6,1996:-0.4,1997:1.8,1998:2.1,1999:-1.4,2000:-1.2,2001:-0.3,
  2002:0.9,2003:0.6,2004:0.5,2005:0.2,2006:0.6,2007:-1.2,2008:-1.3,2009:0.7,2010:1.2,2011:-1.3,
  2012:-0.6,2013:-0.3,2014:0.3,2015:1.8,2016:2.0,2017:-0.3,2018:0.2,2019:0.6,2020:0.3,2021:-0.9,
  2022:-1.0,2023:1.0,2024:1.4
};
const TIE_A0 = 0.16, TIE_PEND = 0.019;   /* °C en 1982 y °C por año, valores de demostración */
const tieSerie = () => Object.keys(TIE_ENSO).map(Number).sort((a,b)=>a-b).map(y => ({
  x:y,
  tend: TIE_A0 + TIE_PEND*(y-1982),
  var:  0.09*TIE_ENSO[y],
  y:    TIE_A0 + TIE_PEND*(y-1982) + 0.09*TIE_ENSO[y]
}));

/* =====================================================================
   DATOS · 7. Decisión (APV) · cantón ficticio
   ===================================================================== */
const TIE_MEDIDAS = [
  { id:'m1', n:'Sistema de alerta temprana y rutas de evacuación señalizadas', cat:'adapta',
    d:'Sirenas, mensajes al celular, señalización de rutas hacia terreno alto y simulacros dos veces al año.',
    imp:5, eq:5, cos:4, fac:5,
    fb:'Es adaptación: no reduce las emisiones ni cambia la amenaza, reduce el daño que la amenaza provoca.' },
  { id:'m2', n:'Reforzamiento sísmico de escuelas y del centro de salud', cat:'adapta',
    d:'Revisión estructural y refuerzo de las edificaciones públicas que deben seguir funcionando después de un sismo.',
    imp:5, eq:5, cos:2, fac:3,
    fb:'Es adaptación: el sismo va a ocurrir igual; lo que cambia es que el edificio no se caiga encima de las personas.' },
  { id:'m3', n:'Reubicación de las viviendas de la quebrada', cat:'adapta',
    d:'Traslado de 240 familias asentadas en el cauce de la quebrada, con vivienda equivalente y cerca de sus fuentes de trabajo.',
    imp:5, eq:2, cos:1, fac:2,
    fb:'Es adaptación. Es la medida más eficaz frente al lahar y al deslizamiento, y también la más difícil: si no se garantiza trabajo y servicios en el nuevo sitio, la gente regresa.' },
  { id:'m4', n:'Restauración del manglar de la desembocadura', cat:'ambas',
    d:'Recuperar 80 hectáreas de manglar que hoy son piscinas camaroneras abandonadas.',
    imp:4, eq:4, cos:3, fac:4,
    fb:'Cuenta como las dos cosas: el manglar amortigua el oleaje y la inundación (adaptación) y, al mismo tiempo, almacena mucho carbono en su suelo (mitigación).' },
  { id:'m5', n:'Alumbrado eficiente y flota municipal eléctrica', cat:'mitiga',
    d:'Cambio de luminarias y reemplazo progresivo de los vehículos municipales, con energía de la red.',
    imp:2, eq:3, cos:2, fac:3,
    fb:'Es mitigación: reduce las emisiones del cantón. Su impacto sobre el riesgo local es bajo, porque el clima no depende de un solo cantón; su valor está en sumarse a un esfuerzo global.' },
  { id:'m6', n:'Ordenanza que prohíbe construir bajo la cota de 5 m y en la faja de la quebrada', cat:'adapta',
    d:'Regulación del uso del suelo, con catastro actualizado y control municipal efectivo.',
    imp:4, eq:3, cos:5, fac:2,
    fb:'Es adaptación. Cuesta muy poco dinero y evita que el problema siga creciendo, pero su factibilidad depende de que el municipio realmente controle; una ordenanza que no se hace cumplir no protege a nadie.' }
];
const TIE_CRIT = [
  ['imp','Impacto','¿Cuánto reduce realmente el daño esperado?'],
  ['eq','Equidad','¿Protege también a quienes tienen menos recursos, o los perjudica?'],
  ['cos','Costo','5 = barato para el presupuesto del cantón; 1 = muy caro.'],
  ['fac','Factibilidad','¿Se puede ejecutar con la capacidad técnica y política que hay?']
];

/* =====================================================================
   DIBUJOS SVG (todo procedimental, sin imágenes externas)
   ===================================================================== */

/* ---------- Mapa mundial de placas ---------- */
function tieMapaSVG(destacado, extra){
  const tierras = TIE_TIERRAS.map(p => `<path d="${tiePath(p,true)}" fill="url(#tieGTierra)" stroke="#a9bccb" stroke-width="0.8" stroke-linejoin="round"/>`).join('');
  const bordes = TIE_BORDES.map((b,i) => {
    const T = TIE_TIPOS[b.tipo], on = !destacado || destacado === b.tipo;
    return (on ? `<path d="${tieLinea(b.pts)}" fill="none" stroke="#0b1424" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>` : '')
      + `<path d="${tieLinea(b.pts)}" fill="none" stroke="${T.col}" stroke-width="${on?3.4:2}" stroke-linejoin="round" `
      + `stroke-dasharray="${T.dash==='0'?'':T.dash}" stroke-linecap="round" opacity="${on?1:0.22}">`
      + `<title>${esc(b.n)} · ${esc(T.n)}</title></path>`;
  }).join('');
  const nombres = TIE_PLACAS.map(([n,lon,lat]) =>
    `<text x="${tieX(lon).toFixed(1)}" y="${tieY(lat).toFixed(1)}" font-size="11" fill="#eef4fb" text-anchor="middle" stroke="#0e1829" stroke-width="3" stroke-opacity=".55" paint-order="stroke">${esc(n)}</text>`).join('');
  const ec = `<g><circle cx="${tieX(-78.5).toFixed(1)}" cy="${tieY(-0.2).toFixed(1)}" r="5" fill="#ffd34d" stroke="#1b2a3f" stroke-width="1.5"/>`
    + `<text x="${(tieX(-78.5)+9).toFixed(1)}" y="${(tieY(-0.2)+4).toFixed(1)}" font-size="12" font-weight="700" fill="#ffd34d">Ecuador</text></g>`
    + `<g><circle cx="${tieX(-90.5).toFixed(1)}" cy="${tieY(-0.5).toFixed(1)}" r="3.4" fill="#ffd34d"/>`
    + `<text x="${(tieX(-90.5)-7).toFixed(1)}" y="${(tieY(-0.5)+16).toFixed(1)}" font-size="10" fill="#ffd34d" text-anchor="end">Galápagos</text></g>`;
  const lab = TIE_TIPOS[destacado] ? TIE_TIPOS[destacado].n.toLowerCase() : 'los tres tipos de borde';
  return `<svg class="tie-mapa" viewBox="0 0 ${TIE_MW} ${TIE_MH}" role="img" aria-label="Mapa mundial de las placas tectónicas con ${esc(lab)} resaltados. Los datos de cada tipo de borde están en el texto que sigue.">`
    + `<defs><radialGradient id="tieGMar" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#1d3556"/><stop offset="1" stop-color="#101b2e"/></radialGradient>`
    + `<linearGradient id="tieGTierra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9a86"/><stop offset=".5" stop-color="#6f8a64"/><stop offset="1" stop-color="#8f8f78"/></linearGradient>`
    + `<filter id="tieGSombra" x="-5%" y="-5%" width="110%" height="110%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.6" flood-color="#000" flood-opacity=".45"/></filter></defs>`
    + `<rect width="${TIE_MW}" height="${TIE_MH}" fill="url(#tieGMar)"/>`
    + `<g opacity=".25" stroke="#7d93ad" stroke-width="0.6">`
    + [-60,-30,0,30,60].map(l=>`<line x1="0" y1="${tieY(l).toFixed(1)}" x2="${TIE_MW}" y2="${tieY(l).toFixed(1)}"/>`).join('')
    + [-120,-60,0,60,120].map(l=>`<line x1="${tieX(l).toFixed(1)}" y1="0" x2="${tieX(l).toFixed(1)}" y2="${TIE_MH}"/>`).join('')
    + `</g>`
    + `<line x1="0" y1="${tieY(0).toFixed(1)}" x2="${TIE_MW}" y2="${tieY(0).toFixed(1)}" stroke="#ffd34d" stroke-width="1" stroke-dasharray="6 6" opacity=".6"/>`
    + `<g filter="url(#tieGSombra)">${tierras}</g>` + bordes + nombres + ec + (extra||'') + `</svg>`;
}

/* ---------- Corte transversal esquemático de un borde (alternativa 2D) ---------- */
function tieCorteSVG(tipo){
  const W=640,H=330, mar='#2f6ea8', lit='#6f7c8c', litO='#4c5765', ast='#8f4534', mag='#ff8a3d';
  const cab = t => `<svg class="tie-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t)}">`
    + `<rect width="${W}" height="${H}" fill="#101722"/>`;
  const txt = (x,y,s,col,an) => `<text x="${x}" y="${y}" font-size="12" font-weight="600" fill="${col||'#e8eef7'}" text-anchor="${an||'start'}" font-family="IBM Plex Sans,sans-serif">${esc(s)}</text>`;
  const sismo = (x,y,r) => `<circle cx="${x}" cy="${y}" r="${r||5}" fill="#ffe14d" stroke="#8a6a00" stroke-width="1.2"/>`;
  const flecha = (x1,y,x2,col) => { const d = x2>x1?1:-1;
    return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${col}" stroke-width="3"/>`
      + `<polygon points="${x2},${y} ${x2-10*d},${y-6} ${x2-10*d},${y+6}" fill="${col}"/>`; };
  if (tipo==='div'){
    return cab('Corte de un borde divergente: dos placas se separan, el manto asciende por el centro y forma una dorsal con corteza nueva')
      + `<rect y="0" width="${W}" height="120" fill="${mar}" opacity=".55"/>`
      + `<rect y="190" width="${W}" height="${H-190}" fill="${ast}"/>`
      + `<path d="M0 150 L250 150 L300 118 L340 118 L390 150 L${W} 150 L${W} 190 L0 190 Z" fill="${litO}"/>`
      + `<path d="M300 330 L320 190 L300 118 L340 118 L320 190 L340 330 Z" fill="${mag}" opacity=".85"/>`
      + sismo(312,140,5)+sismo(296,158,4)+sismo(334,160,4)
      + flecha(230,100,150,'#4fd3a8') + flecha(410,100,490,'#4fd3a8')
      + txt(150,90,'Se aleja','#4fd3a8') + txt(420,90,'Se aleja','#4fd3a8')
      + txt(268,110,'Dorsal oceánica','#ffe8b0') + txt(348,250,'Manto que asciende y se funde','#ffd0a0')
      + txt(30,175,'Corteza oceánica nueva','#e8eef7') + txt(360,180,'Litosfera','#e8eef7')
      + txt(30,215,'Astenosfera','#ffd0a0') + txt(30,40,'Océano','#cfe6ff')
      + txt(400,144,'Sismos superficiales','#ffe14d') + `</svg>`;
  }
  if (tipo==='conv'){
    return cab('Corte de un borde convergente con subducción: la placa oceánica se hunde bajo la continental, forma una fosa, una cordillera y un arco de volcanes; los sismos se hacen más profundos hacia el continente')
      + `<rect y="0" width="300" height="118" fill="${mar}" opacity=".55"/>`
      + `<rect y="150" width="${W}" height="${H-150}" fill="${ast}"/>`
      + `<path d="M0 118 L250 118 L268 150 L286 118 L300 118 L300 150 L0 150 Z" fill="${litO}"/>`
      + `<path d="M268 150 L300 150 L560 330 L520 330 Z" fill="${litO}"/>`
      + `<path d="M286 118 L340 96 L370 112 L420 84 L460 110 L520 100 L${W} 106 L${W} 200 L300 200 L286 118 Z" fill="${lit}"/>`
      + `<polygon points="410,84 396,112 424,112" fill="#c14b2e"/><polygon points="470,92 456,118 484,118" fill="#c14b2e"/>`
      + `<path d="M430 200 Q 418 150 412 112" stroke="${mag}" stroke-width="5" fill="none" opacity=".9"/>`
      + `<path d="M486 200 Q 476 158 470 118" stroke="${mag}" stroke-width="5" fill="none" opacity=".9"/>`
      + sismo(272,140,4)+sismo(300,158,4)+sismo(350,192,5)+sismo(410,232,5)+sismo(470,272,6)+sismo(520,310,6)
      + flecha(180,70,250,'#ff8f5a') + flecha(600,70,530,'#ff8f5a')
      + txt(120,62,'Placa oceánica (Nazca)','#ff8f5a') + txt(596,62,'Placa continental','#ff8f5a',"end")
      + txt(214,110,'Fosa','#cfe6ff','end') + txt(330,78,'Cordillera y arco volcánico','#ffe8b0')
      + txt(24,40,'Océano','#cfe6ff') + txt(24,180,'Astenosfera','#ffd0a0')
      + txt(540,300,'Sismos profundos (hasta 600–700 km)','#ffe14d','end')
      + txt(300,146,'Sismos superficiales','#ffe14d') + `</svg>`;
  }
  return cab('Corte de un borde transformante: dos bloques se deslizan uno junto al otro en sentidos opuestos a lo largo de una falla vertical; no se crea ni se destruye litosfera')
    + `<rect y="190" width="${W}" height="${H-190}" fill="${ast}"/>`
    + `<path d="M0 110 L310 110 L310 190 L0 190 Z" fill="${lit}"/>`
    + `<path d="M330 110 L${W} 110 L${W} 190 L330 190 Z" fill="${lit}"/>`
    + `<rect x="310" y="60" width="20" height="150" fill="#2a3340"/>`
    + `<path d="M0 96 L200 96 L200 74 L310 74" stroke="#7fd0ff" stroke-width="3" fill="none"/>`
    + `<path d="M330 118 L420 118 L420 96 L${W} 96" stroke="#7fd0ff" stroke-width="3" fill="none"/>`
    + sismo(318,120,5)+sismo(318,150,4)+sismo(318,180,4)
    + flecha(120,44,240,'#c08ee8') + flecha(520,44,400,'#c08ee8')
    + txt(60,36,'Se mueve hacia allá','#c08ee8') + txt(560,36,'Se mueve hacia acá','#c08ee8','end')
    + txt(320,54,'Falla','#e8eef7','middle') + txt(24,168,'Litosfera','#e8eef7') + txt(24,215,'Astenosfera','#ffd0a0')
    + txt(30,88,'Un río cortado y desplazado por la falla','#7fd0ff')
    + txt(360,176,'Sismos superficiales, muy cerca de las ciudades','#ffe14d') + `</svg>`;
}

/* ---------- Sombra de las ondas S: la evidencia del núcleo externo líquido ---------- */
function tieSombraSVG(modo){
  const cx=210, cy=200, R=165, Rc=R*3486/TIE_R, Ri=R*1216/TIE_R;
  const F = { x:cx, y:cy-R };                       /* foco en la superficie superior */
  const pt = (a,r) => [cx + r*Math.sin(a), cy - r*Math.cos(a)];
  const arco = (a1,a2,r,col,w,op) => {
    const [x1,y1]=pt(a1,r), [x2,y2]=pt(a2,r), grande = Math.abs(a2-a1)>Math.PI?1:0;
    return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${grande} ${a2>a1?1:0} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${op||1}"/>`;
  };
  /* rayo: marcha numérica desde el foco; se detiene en el núcleo (S) o se refracta (P) */
  const rayo = (ang, esS) => {
    let x=F.x, y=F.y, dx=Math.sin(ang), dy=Math.cos(ang), d='M'+x.toFixed(1)+' '+y.toFixed(1), dentro=false;
    for (let i=0;i<900;i++){
      x+=dx*1.2; y+=dy*1.2;
      const rx=x-cx, ry=y-cy, r=Math.hypot(rx,ry);
      if (r>R){ d+=' L'+x.toFixed(1)+' '+y.toFixed(1); break; }
      if (!dentro && r<Rc){
        if (esS) { d+=' L'+x.toFixed(1)+' '+y.toFixed(1); return {d, tope:[x,y]}; }
        dentro = true;                                 /* refracción hacia el centro */
        const nx=rx/r, ny=ry/r, k=0.34;
        const nxv = dx - k*(dx - (-nx)), nyv = dy - k*(dy - (-ny)), m=Math.hypot(nxv,nyv);
        dx=nxv/m; dy=nyv/m;
      } else if (dentro && r>Rc){
        dentro = false;
        const nx=rx/r, ny=ry/r, k=0.34;
        const nxv = dx + k*(dx - nx), nyv = dy + k*(dy - ny), m=Math.hypot(nxv,nyv);
        dx=nxv/m; dy=nyv/m;
      }
      if (i%3===0) d+=' L'+x.toFixed(1)+' '+y.toFixed(1);
    }
    return {d, tope:null};
  };
  const esS = modo==='s';
  let rayos='', topes='';
  const angs = esS ? [0.25,0.5,0.75,1.0,1.25,1.5,1.75] : [0.2,0.45,0.7,0.95,1.2,1.5,1.8,2.1];
  angs.forEach(a => { [1,-1].forEach(s => {
    const r = rayo(a*s, esS);
    rayos += `<path d="${r.d}" fill="none" stroke="${esS?'#7fd0ff':'#ffd34d'}" stroke-width="1.6" opacity=".85"/>`;
    if (r.tope) topes += `<circle cx="${r.tope[0].toFixed(1)}" cy="${r.tope[1].toFixed(1)}" r="3" fill="#ff6a5a"/>`;
  }); });
  const sombra = esS
    ? arco(103*Math.PI/180, 257*Math.PI/180, R+9, '#ff6a5a', 9, .9)
    : arco(103*Math.PI/180, 143*Math.PI/180, R+9, '#ff6a5a', 9, .9) + arco(-103*Math.PI/180, -143*Math.PI/180, R+9, '#ff6a5a', 9, .9);
  const aria = esS
    ? 'Esquema: las ondas S salen del foco en todas direcciones pero se detienen al llegar al núcleo externo. Más allá de los 103 grados de distancia angular no se registra ninguna onda S: es la zona de sombra de las ondas S, y prueba que el núcleo externo es líquido.'
    : 'Esquema: las ondas P atraviesan todo el planeta, pero al entrar y salir del núcleo externo se desvían. Eso deja una franja entre los 103 y los 143 grados donde casi no llegan ondas P directas: la zona de sombra de las ondas P.';
  return `<svg class="tie-svg" viewBox="0 0 420 400" role="img" aria-label="${esc(aria)}">`
    + `<defs><radialGradient id="tieGManto"><stop offset="${(Rc/R).toFixed(2)}" stop-color="#e0683e"/><stop offset=".86" stop-color="#b8533a"/><stop offset="1" stop-color="#8f3f2c"/></radialGradient>`
    + `<radialGradient id="tieGNE"><stop offset="${(Ri/Rc).toFixed(2)}" stop-color="#ffc062"/><stop offset="1" stop-color="#f28a3e"/></radialGradient>`
    + `<radialGradient id="tieGNI" cx="45%" cy="42%"><stop offset="0" stop-color="#fffbe8"/><stop offset="1" stop-color="#ffdf88"/></radialGradient></defs>`
    + `<rect width="420" height="400" fill="#101722"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${R+4}" fill="none" stroke="#7fb4e8" stroke-width="3" opacity=".35"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#tieGManto)" stroke="#9fb0bd" stroke-width="1.5"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${Rc.toFixed(1)}" fill="url(#tieGNE)"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${Ri.toFixed(1)}" fill="url(#tieGNI)"/>`
    + sombra + rayos + topes
    + `<circle cx="${F.x}" cy="${F.y}" r="6" fill="#ffffff" stroke="#101722" stroke-width="2"/>`
    + `<text x="${F.x}" y="${(F.y-12).toFixed(1)}" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">Sismo</text>`
    + `<text x="210" y="392" font-size="12" fill="#ff9c8f" text-anchor="middle">${esS?'Zona de sombra de las ondas S (más de 103°): no llega ninguna':'Zona de sombra de las ondas P (de 103° a 143°)'}</text>`
    + `</svg>`;
}

/* ---------- Foco (hipocentro) y epicentro ---------- */
function tieFocoSVG(){
  return `<svg class="tie-svg" viewBox="0 0 560 300" role="img" aria-label="Esquema: el foco o hipocentro es el punto en profundidad donde se rompe la roca; el epicentro es el punto de la superficie situado justo encima. La profundidad del foco se mide en la vertical entre los dos.">`
  + `<rect width="560" height="300" fill="#101722"/>`
  + `<path d="M0 80 L120 72 L210 86 L320 66 L430 82 L560 74 L560 300 L0 300 Z" fill="#6f7c8c"/>`
  + `<path d="M0 80 L120 72 L210 86 L320 66 L430 82 L560 74" stroke="#9fb0bd" stroke-width="3" fill="none"/>`
  + `<path d="M180 300 L300 74" stroke="#2a3340" stroke-width="7"/>`
  + `<circle cx="252" cy="172" r="9" fill="#ff5a4d"/>`
  + `<circle cx="252" cy="172" r="22" fill="none" stroke="#ff5a4d" stroke-width="2" opacity=".65"/>`
  + `<circle cx="252" cy="172" r="38" fill="none" stroke="#ff5a4d" stroke-width="2" opacity=".4"/>`
  + `<circle cx="252" cy="172" r="56" fill="none" stroke="#ff5a4d" stroke-width="2" opacity=".22"/>`
  + `<line x1="252" y1="172" x2="252" y2="80" stroke="#ffd34d" stroke-width="2" stroke-dasharray="6 5"/>`
  + `<circle cx="252" cy="80" r="8" fill="#ffd34d" stroke="#101722" stroke-width="2"/>`
  + `<text x="266" y="62" font-size="13" font-weight="700" fill="#ffd34d">Epicentro (en la superficie)</text>`
  + `<text x="276" y="176" font-size="13" font-weight="700" fill="#ff8a80">Foco o hipocentro</text>`
  + `<text x="276" y="194" font-size="11" fill="#e8eef7">donde la roca se rompe de verdad</text>`
  + `<text x="196" y="130" font-size="11" fill="#ffd34d" text-anchor="end">profundidad</text>`
  + `<text x="120" y="250" font-size="12" fill="#cfd8e4">Falla: la fractura por la que se deslizan los bloques</text>`
  + `<text x="420" y="118" font-size="11" fill="#ff8a80">las ondas salen en todas direcciones</text>`
  + `</svg>`;
}

/* ---------- Perfiles de los tres tipos de volcán, a escala relativa ---------- */
function tiePerfilesSVG(){
  return `<svg class="tie-svg" viewBox="0 0 660 230" role="img" aria-label="Perfiles comparados: el volcán en escudo es ancho y bajo con laderas suaves; el estratovolcán es un cono alto y empinado formado por capas; la caldera es una gran depresión circular ocupada por una laguna. Sus datos están en la tabla siguiente.">`
  + `<rect width="660" height="230" fill="#101722"/><line x1="0" y1="190" x2="660" y2="190" stroke="#6f7c8c" stroke-width="2"/>`
  + `<path d="M10 190 Q 110 142 210 190 Z" fill="#4a6a4f" stroke="#8fd3a0" stroke-width="2"/>`
  + `<text x="110" y="212" font-size="12" fill="#8fd3a0" text-anchor="middle" font-weight="600">Escudo · lava fluida</text>`
  + `<path d="M248 190 L330 52 L412 190 Z" fill="#6a5a4a" stroke="#e0a94f" stroke-width="2"/>`
  + `<path d="M280 136 L330 82 L380 136" stroke="#c9b18a" stroke-width="1.6" fill="none"/>`
  + `<path d="M296 160 L330 122 L364 160" stroke="#c9b18a" stroke-width="1.6" fill="none"/>`
  + `<path d="M322 52 L330 40 L338 52" fill="#ff8a3d"/>`
  + `<text x="330" y="212" font-size="12" fill="#e0a94f" text-anchor="middle" font-weight="600">Estratovolcán · capas alternadas</text>`
  + `<path d="M450 190 L488 132 L520 146 L560 132 L600 146 L640 190 Z" fill="#5a4a5a" stroke="#c08ee8" stroke-width="2"/>`
  + `<path d="M488 132 L520 146 L560 132 L600 146 L600 152 L488 152 Z" fill="#2f6ea8"/>`
  + `<text x="545" y="212" font-size="12" fill="#c08ee8" text-anchor="middle" font-weight="600">Caldera · hundimiento y laguna</text>`
  + `<text x="14" y="26" font-size="11" fill="#9fb0bd">Los tres perfiles están dibujados en la misma escala horizontal y vertical.</text>`
  + `</svg>`;
}

/* ---------- Corte del Ecuador: Nazca bajo la Sudamericana ---------- */
function tieEcuadorSVG(){
  const t=(x,y,s,c,a)=>`<text x="${x}" y="${y}" font-size="12" font-weight="600" fill="${c}" text-anchor="${a||'start'}" font-family="IBM Plex Sans,sans-serif" stroke="#0d131c" stroke-width="3" stroke-opacity=".6" paint-order="stroke">${esc(s)}</text>`;
  const sis=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r+3}" fill="#ffe14d" opacity=".25"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ffe14d" stroke="#8a6a00" stroke-width="1"/>`;
  /* volcán con cráter y, en los más altos, casquete de hielo */
  const volcan=(x,y,h,w,nieve)=>`<path d="M${x-w} ${y+h} Q${x-w*0.35} ${y+h*0.55} ${x-4} ${y} L${x+4} ${y} Q${x+w*0.35} ${y+h*0.55} ${x+w} ${y+h} Z" fill="url(#tieEVol)" stroke="#2b2320" stroke-width="1"/>`
    + (nieve ? `<path d="M${x-9} ${y+10} Q${x-6} ${y+3} ${x-4} ${y} L${x+4} ${y} Q${x+6} ${y+3} ${x+9} ${y+10} Q${x+3} ${y+7} ${x} ${y+11} Q${x-3} ${y+7} ${x-9} ${y+10} Z" fill="#eef3f6"/>` : '')
    + `<ellipse cx="${x}" cy="${y}" rx="4" ry="1.6" fill="#ff8a3d"/>`;
  return `<svg class="tie-svg" viewBox="0 0 720 360" role="img" aria-label="Corte oeste-este del Ecuador a la altura del ecuador: la placa de Nazca se hunde bajo la placa Sudamericana en la fosa, frente a la costa; hacia el oriente aparecen la llanura costera, la Cordillera Occidental con sus volcanes, el valle interandino, la Cordillera Real y la llanura amazónica. Los sismos se hacen más profundos hacia el este.">`
  + `<defs><linearGradient id="tieEMar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b8fd0"/><stop offset="1" stop-color="#1b4f86"/></linearGradient>`
  + `<linearGradient id="tieECielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1624"/><stop offset="1" stop-color="#1a2638"/></linearGradient>`
  + `<linearGradient id="tieEAst" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f4534"/><stop offset="1" stop-color="#c25a34"/></linearGradient>`
  + `<linearGradient id="tieEOce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a616b"/><stop offset=".25" stop-color="#3f454e"/><stop offset="1" stop-color="#4d5a44"/></linearGradient>`
  + `<linearGradient id="tieECon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a39488"/><stop offset=".5" stop-color="#7f7770"/><stop offset="1" stop-color="#57604a"/></linearGradient>`
  + `<linearGradient id="tieEVol" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a7866"/><stop offset=".55" stop-color="#6a5a4c"/><stop offset="1" stop-color="#4a3e36"/></linearGradient>`
  + `<linearGradient id="tieEMag" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e0501a"/><stop offset="1" stop-color="#ffd060"/></linearGradient></defs>`
  + `<rect width="720" height="360" fill="url(#tieECielo)"/>`
  + `<rect y="0" width="210" height="96" fill="url(#tieEMar)" opacity=".85"/>`
  + `<rect y="132" width="720" height="228" fill="url(#tieEAst)"/>`
  + `<path d="M0 96 L150 96 L176 132 L196 96 L210 96 L210 132 L0 132 Z" fill="url(#tieEOce)"/>`
  + `<path d="M176 132 L210 132 L640 360 L594 360 Z" fill="url(#tieEOce)"/>`
  + `<path d="M176 132 L640 360" stroke="#232a33" stroke-width="2" opacity=".6"/>`
  + `<path d="M196 96 L280 92 L340 60 L380 74 L430 44 L470 70 L520 56 L580 84 L720 88 L720 206 L210 206 L196 96 Z" fill="url(#tieECon)"/>`
  + `<path d="M196 96 L280 92 L340 60 L380 74 L430 44 L470 70 L520 56 L580 84 L720 88" fill="none" stroke="#6f8a4a" stroke-width="3" stroke-linejoin="round"/>`
  + `<path d="M452 206 Q 440 130 432 78" stroke="url(#tieEMag)" stroke-width="6" fill="none" stroke-linecap="round"/>`
  + `<path d="M540 206 Q 530 140 522 88" stroke="url(#tieEMag)" stroke-width="6" fill="none" stroke-linecap="round"/>`
  + volcan(430,46,34,18,true) + volcan(520,58,32,16,true) + volcan(340,62,30,15,false)
  + sis(182,124,4)+sis(212,140,4)+sis(268,170,5)+sis(330,202,5)+sis(400,238,5)+sis(470,274,6)+sis(540,310,6)+sis(600,344,6)
  + `<line x1="40" y1="44" x2="146" y2="44" stroke="#ff8f5a" stroke-width="3.5" stroke-linecap="round"/><polygon points="154,44 140,36 140,52" fill="#ff8f5a"/>`
  + t(40,34,'Placa de Nazca → unos 5 a 6 cm por año','#ffb08a')
  + t(150,90,'Fosa','#cfe6ff','end') + t(236,88,'Llanura costera','#e8eef7')
  + t(300,30,'Cordillera Occidental','#ffe8b0') + t(474,26,'Volcanes activos','#ffb08a')
  + t(560,44,'Cordillera Real','#ffe8b0') + t(700,80,'Oriente','#e8eef7','end')
  + t(24,72,'Océano Pacífico','#cfe6ff') + t(24,176,'Astenosfera','#ffd0a0')
  + t(620,336,'Sismos profundos bajo el Oriente','#ffe14d','end')
  + t(222,128,'Sismos superficiales frente a la costa','#ffe14d')
  + `</svg>`;
}

/* =====================================================================
   MODELOS 3D
   ===================================================================== */
const TIE_CORTE = Math.PI*2 - 1.5;   /* ángulo de esfera que SÍ se dibuja: falta un gajo */

/* ---------- ruido de valor periódico en u (texturas sin costura en longitud) ---------- */
function tieRuido(seed, gx, gy){
  const R = Kit.rng(seed), g = new Float32Array(gx*gy);
  for (let i=0;i<g.length;i++) g[i] = R()*2-1;
  return (u,v) => { const x=u*gx, y=v*gy, x0=Math.floor(x), y0=Math.floor(y), tx=x-x0, ty=y-y0;
    const sx=tx*tx*(3-2*tx), sy=ty*ty*(3-2*ty), i0=((x0%gx)+gx)%gx, i1=(i0+1)%gx;
    const j0=((y0%gy)+gy)%gy, j1=(j0+1)%gy;
    const A=g[j0*gx+i0], B=g[j0*gx+i1], C=g[j1*gx+i0], D=g[j1*gx+i1];
    return A+(B-A)*sx+(C-A)*sy+(A-B-C+D)*sx*sy; };
}
function tieFbm(seed, gx, gy, oct){
  const L = []; for (let k=0;k<oct;k++) L.push(tieRuido(seed+k*131, gx<<k, gy<<k));
  return (u,v) => { let s=0, a=0.5; for (const n of L){ s+=a*n(u,v); a*=0.5; } return s; };
}
const tieLow = () => (typeof lowEnd === 'function') && lowEnd();
const tieHex = (hx) => [(hx>>16)&255, (hx>>8)&255, hx&255];
const tieMix = (A,B,t) => { t = t<0?0:t>1?1:t; return [A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t, A[2]+(B[2]-A[2])*t]; };
const TIE_TEX = {};   /* lienzos ya pintados (se reutilizan al volver a la sección) */
function tieTextura(canvas, srgb, o){
  const t = new THREE.CanvasTexture(canvas); if (srgb) t.encoding = THREE.sRGBEncoding;
  t.anisotropy = 4; if (o && o.wrap){ t.wrapS = THREE.RepeatWrapping; } if (o && o.flip === false) t.flipY = false;
  return t;
}

/* Islas y penínsulas que el mapa esquemático de placas omite (solo para la textura del globo) */
const TIE_ISLAS = [
  [[-9.5,43.5],[-9,37],[-6,36.2],[-2,36.7],[0.5,38.7],[3.2,42],[-1.5,43.4]],            /* península ibérica */
  [[7.5,44],[12.5,44.6],[16,41.5],[18.5,40.2],[16,38],[15.6,40],[12,41.8],[10,43.5]],    /* Italia */
  [[-5.7,50],[1.6,51],[0.2,53.2],[-2,57],[-5,58.6],[-6.2,56],[-3,54],[-5.2,52]],        /* Gran Bretaña */
  [[-10,51.6],[-6,52],[-6,55.2],[-8.5,55],[-10,53.5]],                                    /* Irlanda */
  [[-24,64],[-18,63.4],[-13.5,65],[-16,66.5],[-22,66.4]],                                 /* Islandia */
  [[130,31],[135,33.6],[140,35],[141.5,38.5],[141,41.5],[145,43.5],[141.5,45.5],[139.5,40],[136,36.5],[131,34.5]], /* Japón */
  [[43.5,-12],[50.5,-15.5],[49,-24],[45,-25.5],[43.5,-21],[44.2,-16]],                   /* Madagascar */
  [[35,28],[39,21],[43,13],[45,12.8],[52,16],[58,18.8],[60,22.5],[56.5,26],[51,24.2],[48,30],[36,33]], /* Arabia */
  [[131,-1],[141,-2.6],[150,-6],[147,-10],[141,-9],[137,-5.4]],                           /* Nueva Guinea */
  [[-85,22],[-80,23.2],[-74,20.2],[-77.5,19.8],[-82,22]],                                 /* Cuba */
  [[-73.8,19.9],[-68.5,18.8],[-71,17.8],[-74.4,18.4]],                                    /* La Española */
  [[120,18.5],[122.5,18.4],[124,12.5],[126.4,7],[122,7],[121,13]],                         /* Filipinas */
  [[79.8,9.6],[81.8,7.5],[80.5,6],[79.8,7.5]],                                            /* Sri Lanka */
  [[-91.6,-0.2],[-90.2,0.4],[-89.3,-0.9],[-90.6,-1.3],[-91.5,-1]]                         /* Galápagos (agrandadas) */
];
/* Cordilleras para el relieve de la textura: [lon,lat] y ancho aproximado en grados */
const TIE_RELIEVE = [
  { w:3.2, a:1, pts:[[-72,11],[-76.5,6],[-77.8,2],[-78.6,-1],[-79,-4],[-77,-9],[-73,-15],[-69.5,-18],[-68,-23],[-69,-30],[-70.4,-37],[-71.6,-44],[-73,-51]] },
  { w:4, a:0.8, pts:[[-150,63],[-136,60],[-124,53],[-116,46],[-110,40],[-107,34],[-104,27],[-100,20]] },
  { w:6, a:1, pts:[[68,37],[75,35.5],[81,32],[87,29.5],[93,29],[99,31]] },
  { w:9, a:0.55, pts:[[80,35],[90,34],[98,35]] },
  { w:2, a:0.6, pts:[[6,45],[10,46.6],[14.5,47]] },
  { w:3, a:0.5, pts:[[38,10],[37.5,3],[36.5,-3],[35,-9]] },
  { w:2, a:0.45, pts:[[59,68],[59.5,60],[58.6,52]] },
  { w:2.5, a:0.5, pts:[[42,42.5],[46,41],[50,40]] },
  { w:4, a:0.6, pts:[[-40,64],[-45,70],[-40,76],[-38,80]] }
];

/* Mapa de la Tierra (equirectangular) pintado a partir de los contornos simplificados del módulo */
function tieMapaTierra(){
  if (TIE_TEX.tierra) return TIE_TEX.tierra;
  const W = tieLow() ? 512 : 1024, H = W/2;
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  const X = lon => (lon+180)/360*W, Y = lat => (90-lat)/180*H;
  const poly = (ctx, pts) => { ctx.beginPath(); pts.forEach((p,i) => i ? ctx.lineTo(X(p[0]),Y(p[1])) : ctx.moveTo(X(p[0]),Y(p[1]))); ctx.closePath(); ctx.fill(); };
  /* 1. máscara de tierra firme y de hielo continental */
  const cm = mk(), xm = cm.getContext('2d'); xm.fillStyle = '#000'; xm.fillRect(0,0,W,H); xm.fillStyle = '#fff';
  TIE_TIERRAS.forEach(p => poly(xm, p)); TIE_ISLAS.forEach(p => poly(xm, p));
  const ci = mk(), xi = ci.getContext('2d'); xi.fillStyle = '#000'; xi.fillRect(0,0,W,H); xi.fillStyle = '#fff';
  poly(xi, TIE_TIERRAS[2]); poly(xi, TIE_TIERRAS[6]);
  /* 2. plataforma continental (máscara difuminada) y relieve (líneas gruesas difuminadas) */
  const cb = mk(), xb = cb.getContext('2d'); xb.filter = `blur(${W/180}px)`; xb.drawImage(cm,0,0);
  const cr = mk(), xr = cr.getContext('2d'); xr.fillStyle = '#000'; xr.fillRect(0,0,W,H);
  xr.filter = `blur(${W/260}px)`; xr.lineCap = 'round'; xr.lineJoin = 'round';
  TIE_RELIEVE.forEach(m => { xr.strokeStyle = `rgba(255,255,255,${m.a})`; xr.lineWidth = m.w/360*W; xr.beginPath();
    m.pts.forEach((p,i) => i ? xr.lineTo(X(p[0]),Y(p[1])) : xr.moveTo(X(p[0]),Y(p[1]))); xr.stroke(); });
  const cms = mk(), xms = cms.getContext('2d'); xms.filter = `blur(${Math.max(0.8, W/800)}px)`; xms.drawImage(cm,0,0);
  const M = xms.getImageData(0,0,W,H).data, I = xi.getImageData(0,0,W,H).data, B = xb.getImageData(0,0,W,H).data, Rl = xr.getImageData(0,0,W,H).data;
  const bil = (A, fx, fy) => { const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx-x0, ty = fy-y0;
    const xa = ((x0%W)+W)%W, xb2 = (xa+1)%W, ya = Math.max(0,Math.min(H-1,y0)), yb = Math.min(H-1,ya+1);
    const a0 = A[(ya*W+xa)*4], a1 = A[(ya*W+xb2)*4], b0 = A[(yb*W+xa)*4], b1 = A[(yb*W+xb2)*4];
    return ((a0+(a1-a0)*tx)*(1-ty) + (b0+(b1-b0)*tx)*ty)/255; };
  const warp = tieFbm(7, 16, 8, 4), warp2 = tieFbm(19, 16, 8, 4), hum = tieFbm(31, 8, 4, 5), det = tieFbm(43, 32, 16, 4), oc = tieFbm(57, 8, 4, 4);
  const cc = mk(), xc = cc.getContext('2d'), img = xc.createImageData(W,H), D = img.data;
  const cs = mk(), xs = cs.getContext('2d'), ims = xs.createImageData(W,H), S = ims.data;
  const ch = mk(), xh = ch.getContext('2d'), imh = xh.createImageData(W,H), HH = imh.data;
  const C = { selva:tieHex(0x1f4a24), bosque:tieHex(0x3d6a33), pradera:tieHex(0x6f8a45), sabana:tieHex(0xa39a58), desierto:tieHex(0xd2b27a),
    boreal:tieHex(0x2c4630), tundra:tieHex(0x7a7a66), roca:tieHex(0x80705c), nieve:tieHex(0xf1f5f8),
    hondo:tieHex(0x0a2552), medio:tieHex(0x123f78), somero:tieHex(0x2a82b2) };
  /* desiertos y zonas secas principales [lon, lat, radio lon, radio lat, peso] */
  const SECOS = [[10,23,26,8,1.25],[47,22,12,8,1.15],[60,30,10,5,0.85],[71,27,4,3,0.7],[95,42,20,5,0.9],[60,43,12,5,0.65],[20,-24,7,6,0.85],
    [133,-25,15,8,1.15],[-70,-23,2.5,9,1.1],[-68,-45,4,6,0.65],[-112,33,7,5,0.75],[45,8,4,4,0.55]];
  const ss = (e0,e1,x) => { const t = Math.max(0,Math.min(1,(x-e0)/(e1-e0))); return t*t*(3-2*t); };
  for (let y=0;y<H;y++){
    const v = y/H, lat = 90 - v*180, al = Math.abs(lat);
    for (let x=0;x<W;x++){
      const u = x/W, k = (y*W+x)*4, lon = u*360-180;
      /* costa fractal y suavizada: se desplaza el punto de muestreo con ruido */
      const wx = x + warp(u,v)*W/80, wy = y + warp2(u,v)*W/80;
      const m = bil(M, wx, wy), tierraT = ss(0.38, 0.62, m);
      const kk = ((Math.max(0,Math.min(H-1,Math.round(wy)))*W) + (((Math.round(wx)%W)+W)%W))*4;
      const hielo = I[kk] > 127, rel = Rl[k]/255, shelf = B[k]/255, d = det(u,v);
      let cT = C.selva, cO;
      if (tierraT > 0){
        const h1 = hum(u,v);
        /* bandas climáticas aproximadas, con transiciones suaves */
        cT = tieMix(C.selva, C.bosque, ss(8, 30, al) + h1*0.5);
        cT = tieMix(cT, C.pradera, ss(38, 50, al)*0.5 - h1*0.4);
        cT = tieMix(cT, C.boreal, ss(48, 60, al));
        cT = tieMix(cT, C.tundra, ss(62, 72, al));
        let A = 0; SECOS.forEach(([l0,b0,rl,rb,w]) => { let dl = lon-l0; if (dl>180) dl-=360; if (dl<-180) dl+=360; A += w*Math.exp(-1*((dl/rl)**2 + ((lat-b0)/rb)**2)); });
        A *= 1 + h1*0.9 + d*0.5;
        cT = tieMix(cT, C.sabana, A*1.7); cT = tieMix(cT, C.desierto, (A-0.45)*2.2);
        if (rel > 0.06) cT = tieMix(cT, C.roca, rel*1.5 + d*0.4);
        if (rel > 0.78 + d*0.3) cT = tieMix(cT, C.nieve, (rel-0.78-d*0.3)*3);
        if (hielo || al > 72) cT = tieMix(C.nieve, [200,212,224], 0.25 + d*0.8);
        const f = 0.93 + d*0.22; cT = cT.map(q=>q*f);
      }
      const o = oc(u,v);
      cO = tieMix(tieMix(C.hondo, C.medio, 0.45 + o*0.9), C.somero, shelf*1.1);
      if (al > 76) cO = tieMix(cO, [226,234,240], (al-76)/5 + o);
      const c = tieMix(cO, cT, tierraT);
      const rough = (al > 76 ? 200 : 64) + (235-64)*tierraT, hgt = 0.12 + shelf*0.1 + tierraT*(0.2 + rel*0.6 + d*0.12);
      D[k]=c[0]; D[k+1]=c[1]; D[k+2]=c[2]; D[k+3]=255;
      S[k]=S[k+1]=S[k+2]=rough; S[k+3]=255;
      const hv = Math.max(0,Math.min(255,hgt*255)); HH[k]=HH[k+1]=HH[k+2]=hv; HH[k+3]=255;
    }
  }
  xc.putImageData(img,0,0); xs.putImageData(ims,0,0); xh.putImageData(imh,0,0);
  /* 3. nubes: franja de la zona de convergencia intertropical y tormentas de latitudes medias */
  const cn = mk(), xn = cn.getContext('2d'), imn = xn.createImageData(W,H), N = imn.data;
  const nb = tieFbm(71, 16, 5, 5), nd = tieFbm(83, 48, 20, 3), nw = tieFbm(89, 6, 3, 3);
  for (let y=0;y<H;y++){ const v=y/H, lat=90-v*180;
    const banda = 0.55*Math.exp(-Math.pow((lat-6)/7,2)) + 0.45*Math.exp(-Math.pow((Math.abs(lat)-55)/12,2)) - 0.25*Math.exp(-Math.pow((Math.abs(lat)-25)/8,2));
    for (let x=0;x<W;x++){ const u=x/W, k=(y*W+x)*4;
      const n = nb(u + nw(u,v)*0.08, v + nd(u,v)*0.02) + banda*0.5 + nd(u,v)*0.3;
      const a = Math.max(0, Math.min(1, (n-0.2)*2.4));
      N[k]=N[k+1]=N[k+2]=255; N[k+3]=a*225; } }
  xn.putImageData(imn,0,0);
  return (TIE_TEX.tierra = { color:cc, spec:cs, bump:ch, nubes:cn });
}

/* Corte: gradiente térmico con textura (núcleo interno incandescente → manto con plumas → corteza) */
function tieMapaCorte(){
  if (TIE_TEX.corte) return TIE_TEX.corte;
  const N = tieLow() ? 384 : 768, c = document.createElement('canvas'); c.width = c.height = N;
  const x = c.getContext('2d'), img = x.createImageData(N,N), D = img.data, h = N/2;
  const ri = 1216/TIE_R, rc = 3486/TIE_R, rm = 6341/TIE_R;
  const flujo = tieFbm(5, 24, 8, 4), grano = tieFbm(9, 96, 64, 3), pluma = tieFbm(13, 10, 4, 4);
  const NI = [tieHex(0xfffbe6), tieHex(0xffe79a), tieHex(0xffcf5c)];
  const NE = [tieHex(0xffc24a), tieHex(0xff8a2a), tieHex(0xe0561c)];
  const MA = [tieHex(0xe0582e), tieHex(0xb8432a), tieHex(0x8a3222), tieHex(0x6e2a1e)];
  for (let j=0;j<N;j++) for (let i=0;i<N;i++){
    const dx = (i+0.5-h)/h, dy = (h-j-0.5)/h, r = Math.hypot(dx,dy), k = (j*N+i)*4;
    if (r > 1.01){ D[k+3]=0; continue; }
    const ang = (Math.atan2(dy,dx)/(Math.PI*2)+1)%1, g = grano(dx*0.5+0.5, dy*0.5+0.5);
    let col;
    if (r < ri){ const t = r/ri; col = t<0.55 ? tieMix(NI[0],NI[1],t/0.55) : tieMix(NI[1],NI[2],(t-0.55)/0.45);
      const f = 1 + g*0.18; col = col.map(v=>v*f); }
    else if (r < rc){ const t = (r-ri)/(rc-ri), fl = flujo(ang + r*0.35, t*0.8);
      col = t<0.5 ? tieMix(NE[0],NE[1],t/0.5) : tieMix(NE[1],NE[2],(t-0.5)/0.5);
      col = tieMix(col, NE[0], Math.max(0, fl*1.6)); const f = 1 + g*0.12; col = col.map(v=>v*f); }
    else { const t = (r-rc)/(rm-rc), pl = pluma(ang, t*0.9);
      col = t<0.35 ? tieMix(MA[0],MA[1],t/0.35) : t<0.8 ? tieMix(MA[1],MA[2],(t-0.35)/0.45) : tieMix(MA[2],MA[3],(t-0.8)/0.2);
      /* corrientes de convección: plumas calientes que suben desde el límite con el núcleo */
      col = tieMix(col, tieHex(0xf2803c), Math.max(0, pl*2.6 - t*0.6));      /* material caliente que asciende */
      col = tieMix(col, tieHex(0x4e1f18), Math.max(0, -pl*1.8 - (1-t)*0.3));  /* material más frío que desciende */
      const f = 1 + g*0.14; col = col.map(v=>v*f); }
    D[k]=Math.min(255,col[0]); D[k+1]=Math.min(255,col[1]); D[k+2]=Math.min(255,col[2]); D[k+3]=255;
  }
  x.putImageData(img,0,0);
  return (TIE_TEX.corte = c);
}

/* Una capa = casquete esférico recortado + las dos caras planas del corte */
function tieCapaMeshes(r0, r1, color, opts){
  /* color plano de diagrama: sin tone mapping, para que el rojo del manto siga siendo rojo */
  const o = opts || {}, low = tieLow();
  const lin = k => new THREE.Color(color).convertSRGBToLinear().multiplyScalar(k);
  const base = { toneMapped:false, transparent:!!o.transparent, opacity:o.opacity ?? 1, depthWrite:o.transparent ? false : true };
  if (o.transparent) Object.assign(base, { polygonOffset:true, polygonOffsetFactor:-2, polygonOffsetUnits:-2 });
  const mExt = o.ext || new THREE.MeshBasicMaterial(Object.assign({ color:lin(0.82) }, base));
  const mCar = new THREE.MeshBasicMaterial(Object.assign({ color:o.map ? new THREE.Color(0xffffff) : lin(1.0), side:THREE.DoubleSide, map:o.map || null }, base));
  const esf = new THREE.Mesh(new THREE.SphereGeometry(r1, low?64:96, low?40:64, 0, TIE_CORTE), mExt);
  const anillo = () => { const g = new THREE.RingGeometry(Math.max(r0,0.0001), r1, low?72:128, o.map ? 6 : 1, Math.PI/2, Math.PI);
    if (o.map && o.R){ const P = g.attributes.position, U = g.attributes.uv;   /* UV comunes a todo el planeta: el mismo lienzo sirve para las cuatro capas */
      for (let i=0;i<P.count;i++) U.setXY(i, P.getX(i)/o.R*0.5+0.5, P.getY(i)/o.R*0.5+0.5); U.needsUpdate = true; }
    return g; };
  const c0 = new THREE.Mesh(anillo(), mCar);
  const c1 = new THREE.Mesh(anillo(), mCar.clone());
  c1.rotation.y = TIE_CORTE;
  return [esf, c0, c1];
}

/* Sprite de halo (brillo aditivo) con degradado radial */
function tieHalo(stops, size){
  const n = size || 256, c = document.createElement('canvas'); c.width = c.height = n;
  const x = c.getContext('2d'), g = x.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);
  stops.forEach(([o,col]) => g.addColorStop(o,col)); x.fillStyle = g; x.fillRect(0,0,n,n);
  const t = new THREE.CanvasTexture(c);
  return new THREE.Sprite(new THREE.SpriteMaterial({ map:t, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, toneMapped:false }));
}

/* Encuadre según el ancho del escenario: en pantallas angostas la cámara se aleja para que el modelo no quede cortado */
function tieEncuadre(E, semiAncho){
  /* el escenario todavía puede no estar en el documento: se ajusta en el primer cuadro con tamaño real */
  if (!E.container.clientWidth){ let ok = false; E.onFrame(() => { if (!ok && E.container.clientWidth){ ok = true; tieEncuadre(E, semiAncho); } }); return; }
  const w = E.container.clientWidth, hh = E.container.clientHeight || 1, asp = w/hh;
  const r = clamp(Math.max(E.opts.radius, semiAncho/(Math.tan(19*Math.PI/180)*asp)), E.opts.minR, E.opts.maxR);
  E.opts.radius = r; E.sph.r = E.goal.r = r;
}

/* Escena 1 · interior de la Tierra a escala relativa */
const TIE_LON_VISTA = 0.36;   /* ángulo del modelo donde se centra el Ecuador (lon −78,5°) en la vista inicial */
function tieInterior3D(stage, onSel){
  const E = new Engine3D(stage, {
    radius:11.2, phi:1.2, theta:-1.74, minR:5, maxR:22, target:[0,0,0], dark:true, exposure:1.0,
    aria:'Modelo 3D de la Tierra cortada en gajo. Arrastra para rotar, rueda del ratón para acercar, flechas del teclado para girar. Usa la lista de capas para seleccionar cada una con el teclado.',
    onSelect:(id)=>{ if (id) onSel(id); }
  });
  /* las caras del corte son de diagrama (sin luz); solo la superficie del planeta recibe la luz de una "estrella" que acompaña a la cámara */
  E.scene.traverse(o => { if (o.isDirectionalLight) o.intensity *= 0.35; if (o.isHemisphereLight) o.intensity = 0.22; });
  const sol = new THREE.DirectionalLight(0xfff4e6, 2.1); E.scene.add(sol);
  const K = 3.1/TIE_R, RT = TIE_R*K, low = tieLow();
  const T = tieMapaTierra(), corte = tieTextura(tieMapaCorte(), true);
  const rep = TIE_CORTE/(Math.PI*2), off = (101.5/360) - TIE_LON_VISTA/(Math.PI*2);
  const mapa = (cv, srgb) => { const t = tieTextura(cv, srgb, { wrap:true }); t.repeat.set(rep, 1); t.offset.set(off, 0); return t; };
  const superficie = new THREE.MeshStandardMaterial({ map:mapa(T.color,true), roughnessMap:mapa(T.spec,false), bumpMap:mapa(T.bump,false),
    bumpScale:0.035, roughness:1, metalness:0, envMapIntensity:0.55 });
  const guardar = [];   /* mallas que no se atenúan al seleccionar otra capa (la superficie del planeta es contexto) */
  TIE_CAPAS.forEach((c,i) => {
    const esCort = c.id==='corteza';
    const ms = tieCapaMeshes(c.r0*K, c.r1*K, c.col, esCort ? { ext:superficie } : { map:corte, R:RT });
    if (esCort){ guardar.push(ms[0]); ms[1].material.color.set(0x8a939c).convertSRGBToLinear(); ms[2].material.color.copy(ms[1].material.color); }
    E.addPart(c.id, ms);
    const a = TIE_CORTE + 0.75;
    const rm = (esCort ? c.r1 : (c.r0+c.r1)/2)*K, f = esCort ? 1.02 : 0.9;
    E.addLabel(c.id, c.n, [-Math.cos(a)*rm*f, (i-1.35)*0.92, Math.sin(a)*rm*f]);
  });
  /* nubes (capa aparte, no seleccionable) */
  const nubes = new THREE.Mesh(new THREE.SphereGeometry(RT*1.012, low?64:96, low?40:64, 0, TIE_CORTE),
    new THREE.MeshStandardMaterial({ map:mapa(T.nubes,true), transparent:true, opacity:0.85, depthWrite:false, roughness:1, metalness:0 }));
  nubes.renderOrder = 2;
  E.addPart('nubes', [nubes], { passThrough:true, pickable:false });
  /* atmósfera: halo azul que siempre queda detrás del planeta */
  const atm = tieHalo([[0,'rgba(90,160,255,0)'],[0.8,'rgba(90,160,255,0)'],[0.87,'rgba(120,185,255,.55)'],[0.93,'rgba(80,140,255,.18)'],[1,'rgba(60,120,255,0)']]);
  atm.renderOrder = -1; E.scene.add(atm);
  /* brillo del núcleo: el hierro a más de 5.000 °C resplandece */
  const brillo = tieHalo([[0,'rgba(255,240,190,.75)'],[0.25,'rgba(255,200,110,.38)'],[0.6,'rgba(255,140,60,.1)'],[1,'rgba(255,120,40,0)']]);
  brillo.scale.setScalar(1216*K*4.2); brillo.renderOrder = 5; E.scene.add(brillo);
  const sp = E.spotlight.bind(E);
  E.spotlight = id => { sp(id); guardar.forEach(m => { const mt = m.material; if (mt.userData.c0) mt.color.copy(mt.userData.c0); }); };
  const lit = tieCapaMeshes(TIE_LITO.r0*K, TIE_LITO.r1*K, 0x5fd3e0, { transparent:true, opacity:0.6 });
  lit.forEach(m => m.renderOrder = 3);
  E.addPart('litosfera', lit, { passThrough:true });
  E.setVisible('litosfera', false);
  tieEncuadre(E, RT*1.2);
  const vdir = new THREE.Vector3(), der = new THREE.Vector3(), arr = new THREE.Vector3();
  E.onFrame((t, dt) => {
    const cam = E.camera;
    vdir.copy(cam.position).sub(E.target); const d = vdir.length(); vdir.normalize();
    der.setFromMatrixColumn(cam.matrixWorld, 0); arr.setFromMatrixColumn(cam.matrixWorld, 1);
    sol.position.copy(cam.position).addScaledVector(der, -d*0.55).addScaledVector(arr, d*0.6);
    const s = (d+RT*1.1)*RT/Math.sqrt(Math.max(d*d-RT*RT, 0.01));
    atm.position.copy(vdir).multiplyScalar(-RT*1.1); atm.scale.setScalar(2*s*1.16);
    if (!tieQuieto()) nubes.material.map.offset.x += dt*0.0006;   /* las nubes derivan (sin girar la malla: el gajo sigue abierto) */
  });
  return E;
}

/* Escena 2 · corte transversal de un borde de placa */

/* Bloque de roca deformable: F(u,v,w) → [x,y,z] con u a lo largo de la placa, v de la superficie (0) a la base (1)
   y w de atrás (0) hacia adelante (1). Grupos de material: 0 = caras del corte (estratos), 1 = superficie, 2 = base. */
function tieBloque(F, nu, nv, nw, o){
  o = o || {};
  const P = [], UV = [], CO = [], I = [], G = [];
  const sub = (a,b) => [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
  const cara = (Gf, na, nb, uvf, fuera, grp, colf) => {
    const s0 = P.length/3, i0 = I.length;
    for (let j=0;j<=nb;j++) for (let i=0;i<=na;i++){ const a=i/na, b=j/nb, p=Gf(a,b), t=uvf(a,b), c=colf ? colf(p,a,b) : null;
      P.push(p[0],p[1],p[2]); UV.push(t[0],t[1]); if (c) CO.push(c[0],c[1],c[2]); else CO.push(1,1,1); }
    const p0 = Gf(0.5,0.5), e1 = sub(Gf(0.51,0.5),p0), e2 = sub(Gf(0.5,0.51),p0), ou = fuera(0.5,0.5);
    const n = [e1[1]*e2[2]-e1[2]*e2[1], e1[2]*e2[0]-e1[0]*e2[2], e1[0]*e2[1]-e1[1]*e2[0]];
    const flip = n[0]*ou[0]+n[1]*ou[1]+n[2]*ou[2] < 0;
    for (let j=0;j<nb;j++) for (let i=0;i<na;i++){ const a=s0+j*(na+1)+i, b=a+1, c=a+na+1, d=c+1;
      if (flip) I.push(a,c,b, b,c,d); else I.push(a,b,c, b,d,c); }
    G.push([i0, I.length-i0, grp]);
  };
  const ru = o.ru || 1, rw = o.rw || 1;
  cara((a,b)=>F(a,b,1), nu, nv, (a,b)=>[a*ru,b], (a,b)=>sub(F(a,b,1),F(a,b,0)), 0);
  cara((a,b)=>F(a,b,0), nu, nv, (a,b)=>[a*ru,b], (a,b)=>sub(F(a,b,0),F(a,b,1)), 0);
  cara((a,c)=>F(a,0,c), nu, nw, (a,c)=>[a*ru,c*rw], (a,c)=>sub(F(a,0,c),F(a,1,c)), 1, o.colTop);
  cara((a,c)=>F(a,1,c), nu, 2, (a,c)=>[a*ru,c*rw], (a,c)=>sub(F(a,1,c),F(a,0,c)), 2);
  cara((b,c)=>F(0,b,c), nv, 2, (b,c)=>[c*rw*0.3,b], (b,c)=>sub(F(0,b,c),F(0.02,b,c)), 0);
  cara((b,c)=>F(1,b,c), nv, 2, (b,c)=>[c*rw*0.3,b], (b,c)=>sub(F(1,b,c),F(0.98,b,c)), 0);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(P,3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(UV,2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(CO,3));
  g.setIndex(I); G.forEach(([s,c,m]) => g.addGroup(s,c,m)); g.computeVertexNormals();
  return g;
}
/* color sRGB → lineal (los colores por vértice se guardan en espacio lineal) */
const tieLin = hx => { const c = new THREE.Color(hx).convertSRGBToLinear(); return [c.r,c.g,c.b]; };
const tieLmix = (a,b,t) => { t = t<0?0:t>1?1:t; return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]; };
const tieSS = (e0,e1,x) => { const t = Math.max(0,Math.min(1,(x-e0)/(e1-e0))); return t*t*(3-2*t); };

/* Estratos de un corte: capas [hasta (0–1, desde la superficie), color, grano] con límites ondulados */
function tieEstratos(clave, capas, o){
  const k = 'est-'+clave; if (TIE_TEX[k]) return TIE_TEX[k];
  o = o || {}; const low = tieLow(), W = low ? 128 : 256, H = low ? 256 : 512;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d'), img = x.createImageData(W,H), D = img.data;
  const ond = tieFbm(o.seed||3, 6, 3, 3), gr = tieFbm((o.seed||3)+11, 64, 96, 2), ve = tieFbm((o.seed||3)+23, 24, 40, 3);
  const cols = capas.map(q => tieHex(q[1]));
  for (let j=0;j<H;j++) for (let i=0;i<W;i++){
    const u = i/W, v = j/H, vv = v + ond(u,v)*(o.onda ?? 0.03), kk = (j*W+i)*4;
    let n = 0; while (n < capas.length-1 && vv > capas[n][0]) n++;
    const lo = n ? capas[n-1][0] : 0, hi = capas[n][0], t = (vv-lo)/Math.max(0.001, hi-lo);
    let col = cols[n].slice();
    const g = gr(u,v)*(capas[n][2] ?? 0.2) + ve(u,v)*0.12;
    const f = 1.06 - t*0.14 + g;
    col = col.map(q => q*f);
    if (o.calor) col = tieMix(col, tieHex(0x96412a), Math.pow(v, 3)*o.calor);
    const borde = Math.min(Math.abs(vv-lo), Math.abs(vv-hi));
    if (n && borde < 0.006) col = col.map(q => q*0.72);
    D[kk]=Math.min(255,col[0]); D[kk+1]=Math.min(255,col[1]); D[kk+2]=Math.min(255,col[2]); D[kk+3]=255;
  }
  x.putImageData(img,0,0);
  return (TIE_TEX[k] = c);
}
/* Astenosfera: roca caliente y dúctil, más caliente hacia abajo, con celdas de convección */
function tieMapaAstenosfera(){
  if (TIE_TEX.ast) return TIE_TEX.ast;
  const N = tieLow() ? 128 : 256, c = document.createElement('canvas'); c.width = c.height = N;
  const x = c.getContext('2d'), img = x.createImageData(N,N), D = img.data;
  const f1 = tieFbm(61, 6, 4, 4), f2 = tieFbm(67, 32, 32, 2);
  const A = tieHex(0x8e3a26), B = tieHex(0xc2522c), Cc = tieHex(0xe4743a);
  for (let j=0;j<N;j++) for (let i=0;i<N;i++){ const u=i/N, v=j/N, k=(j*N+i)*4;
    const w = f1(u + f1(u,v)*0.2, v);
    let col = tieMix(A, B, v*0.9 + w*0.5); col = tieMix(col, Cc, Math.max(0, w*1.4 + v*0.5 - 0.45));
    const g = 1 + f2(u,v)*0.12; D[k]=Math.min(255,col[0]*g); D[k+1]=Math.min(255,col[1]*g); D[k+2]=Math.min(255,col[2]*g); D[k+3]=255; }
  x.putImageData(img,0,0);
  return (TIE_TEX.ast = c);
}
/* Magma incandescente: franjas de flujo que se desplazan hacia arriba */
function tieMapaMagma(){
  if (TIE_TEX.mag) return TIE_TEX.mag;
  const W = 64, H = 256, c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d'), img = x.createImageData(W,H), D = img.data, f = tieFbm(71, 4, 8, 4);
  const A = tieHex(0xfff0a0), B = tieHex(0xffb03a), Cc = tieHex(0xe0501a);
  for (let j=0;j<H;j++) for (let i=0;i<W;i++){ const u=i/W, v=j/H, k=(j*W+i)*4, n = f(u, v);
    const col = n > 0.05 ? tieMix(B, A, (n-0.05)*4) : tieMix(Cc, B, (n+0.35)*2.2);
    D[k]=col[0]; D[k+1]=col[1]; D[k+2]=col[2]; D[k+3]=255; }
  x.putImageData(img,0,0);
  return (TIE_TEX.mag = c);
}
/* Detalle de superficie (grano de roca / suelo) en escala de grises, repetible */
function tieMapaGrano(){
  if (TIE_TEX.grano) return TIE_TEX.grano;
  const N = tieLow() ? 128 : 256, c = document.createElement('canvas'); c.width = c.height = N;
  const x = c.getContext('2d'), img = x.createImageData(N,N), D = img.data, f = tieFbm(91, 16, 16, 4);
  for (let j=0;j<N;j++) for (let i=0;i<N;i++){ const k=(j*N+i)*4, g = Math.max(0, Math.min(255, 222 + f(i/N, j/N)*120));
    D[k]=D[k+1]=D[k+2]=g; D[k+3]=255; }
  x.putImageData(img,0,0);
  return (TIE_TEX.grano = c);
}
/* Ondas del agua para el mapa de relieve de la superficie del mar */
function tieMapaOlas(){
  if (TIE_TEX.olas) return TIE_TEX.olas;
  const N = 128, c = document.createElement('canvas'); c.width = c.height = N;
  const x = c.getContext('2d'), img = x.createImageData(N,N), D = img.data, f = tieFbm(97, 8, 8, 3);
  for (let j=0;j<N;j++) for (let i=0;i<N;i++){ const k=(j*N+i)*4, g = 128 + 90*Math.sin((i/N)*Math.PI*2*6 + f(i/N,j/N)*6);
    D[k]=D[k+1]=D[k+2]=g; D[k+3]=255; }
  x.putImageData(img,0,0);
  return (TIE_TEX.olas = c);
}
const TIE_OCEANICA = [[0.07,0x6a6356,0.25],[0.22,0x353a41,0.35],[0.46,0x55605a,0.25],[1,0x566043,0.2]];      /* sedimentos · basalto · gabro · manto litosférico */
const TIE_CONTINENTAL = [[0.05,0xa58c66,0.2],[0.36,0xa39488,0.35],[0.6,0x6f6c73,0.25],[1,0x566043,0.2]];   /* sedimentos · corteza superior · inferior · manto litosférico */
const TIE_SEDIMENTARIA = [[0.06,0x6b5436,0.2],[0.16,0xc9a978,0.25],[0.24,0x8a7f70,0.2],[0.36,0xd8c7a0,0.25],[0.47,0x9a6d4f,0.2],[0.58,0xbfae8a,0.25],[0.72,0x7d7a74,0.25],[1,0x68666a,0.3]];

function tieBorde3D(stage, tipo){
  const low = tieLow();
  const E = new Engine3D(stage, {
    radius:19.5, phi:1.10, theta:0.46, minR:8, maxR:36, target:[0,-1.1,0], dark:true, exposure:1.0,
    aria:'Modelo 3D del corte transversal de un borde de placa. Arrastra para rotar y usa los botones para cambiar el tipo de borde. La misma información está en el esquema y en la tabla de abajo.'
  });
  E.scene.traverse(o => { if (o.isHemisphereLight) o.intensity = 0.5; });
  const colT = { div:0x4fd3a8, conv:0xff8f5a, trans:0xc08ee8 }[tipo];
  const Q = (a,b) => low ? a : b;                          /* resolución según el equipo */
  const grano = () => { const t = tieTextura(tieMapaGrano(), false, { wrap:true }); t.wrapT = THREE.RepeatWrapping; t.repeat.set(5,2); return t; };
  const corteMat = (capas, clave, o) => { const t = tieTextura(tieEstratos(clave, capas, o), true, { wrap:true, flip:false }); t.wrapT = THREE.ClampToEdgeWrapping;
    return new THREE.MeshStandardMaterial({ map:t, roughness:0.92, metalness:0 }); };
  const supMat = () => new THREE.MeshStandardMaterial({ vertexColors:true, map:grano(), roughness:0.88, metalness:0 });
  const rocas = (capas, clave, o) => { const m = corteMat(capas, clave, o); return [m, supMat(), m]; };
  /* material plano de diagrama (sin tone mapping): para marcas y magma, que deben leerse tal cual */
  const flat = (c, o) => { const op = Object.assign({}, o||{});
    return new THREE.MeshBasicMaterial({ color:new THREE.Color(c).convertSRGBToLinear().multiplyScalar(op.k ?? 1), map:op.map || null,
      toneMapped:false, transparent:!!op.transparent, opacity:op.opacity ?? 1, depthWrite: op.transparent ? false : true, side: op.side || THREE.FrontSide }); };
  const magTex = tieTextura(tieMapaMagma(), true, { wrap:true }); magTex.wrapT = THREE.RepeatWrapping;
  const magMat = () => flat(0xffffff, { map:magTex });
  const glowTex = (() => { const h = tieHalo([[0,'rgba(255,245,160,1)'],[0.3,'rgba(255,215,80,.5)'],[1,'rgba(255,200,60,0)']], 64); return h.material.map; })();
  const puntos = [], anim = [];   /* marcadores que se desplazan y elementos animados */
  const marca = (x,y,z,c,dir,yf) => {
    const g = new THREE.Group();
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), new THREE.MeshStandardMaterial({ color:c, roughness:0.35, metalness:0.1 }));
    const aro = new THREE.Mesh(new THREE.RingGeometry(0.26, 0.36, 28), flat(c, { transparent:true, opacity:0.7, side:THREE.DoubleSide }));
    aro.rotation.x = -Math.PI/2; aro.position.y = -0.14; m.add(aro);
    m.position.set(x, yf ? yf(x,z)+0.2 : y, z); m.userData.b = [x, m.position.y, z]; m.userData.dir = dir; m.userData.yf = yf; puntos.push(m); return m;
  };
  const sismo = (x,y,z,r) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r||0.19, 16, 12), flat(0xffe14d));
    m.position.set(x,y,z); m.renderOrder = 4;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, toneMapped:false, opacity:0.85 }));
    s.scale.setScalar((r||0.19)*5.5); m.add(s); s.userData.fase = Math.random()*6; anim.push(t => { s.material.opacity = tieQuieto() ? 0.8 : 0.55 + 0.35*Math.sin(t*3 + s.userData.fase); });
    return m; };
  /* flecha de movimiento: extruida y biselada, flota sobre la placa */
  const flecha = (x,y,z,dir,largo) => {
    const L = largo || 2.6, sh = new THREE.Shape();
    sh.moveTo(0,-0.2); sh.lineTo(L-0.75,-0.2); sh.lineTo(L-0.75,-0.52); sh.lineTo(L,0); sh.lineTo(L-0.75,0.52); sh.lineTo(L-0.75,0.2); sh.lineTo(0,0.2); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth:0.16, bevelEnabled:true, bevelThickness:0.05, bevelSize:0.05, bevelSegments:2 });
    g.translate(-L/2, 0, -0.08); g.rotateX(-Math.PI/2);
    const m = new THREE.Mesh(g, flat(colT, { transparent:true, opacity:0.95 }));
    m.rotation.y = Math.atan2(-dir[2], dir[0]); m.position.set(x,y,z); m.userData.b = [x,y,z]; m.userData.dir = dir; m.renderOrder = 6;
    return m; };
  /* agua: caja transparente con degradado de profundidad y superficie con ondas */
  const agua = (x0,x1,y0,y1,z0,z1) => {
    const g = new THREE.BoxGeometry(x1-x0, y1-y0, z1-z0, 1, 4, 1); g.translate((x0+x1)/2, (y0+y1)/2, (z0+z1)/2);
    const P = g.attributes.position, cs = []; const A = tieLin(0x0b3a6e), B = tieLin(0x3aa0e0);
    for (let i=0;i<P.count;i++){ const c = tieLmix(A, B, (P.getY(i)-y0)/(y1-y0)); cs.push(c[0],c[1],c[2]); }
    g.setAttribute('color', new THREE.Float32BufferAttribute(cs,3));
    const m = new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({ vertexColors:true, transparent:true, opacity:0.5, roughness:0.08, metalness:0,
      clearcoat:1, clearcoatRoughness:0.1, envMapIntensity:1.4, depthWrite:false }));
    m.renderOrder = 3;
    const ol = tieTextura(tieMapaOlas(), false, { wrap:true }); ol.wrapT = THREE.RepeatWrapping; ol.repeat.set(3,1);
    const top = new THREE.Mesh(new THREE.PlaneGeometry(x1-x0, z1-z0), new THREE.MeshPhysicalMaterial({ color:0x4aa8e8, transparent:true, opacity:0.32,
      roughness:0.12, metalness:0, clearcoat:1, bumpMap:ol, bumpScale:0.02, envMapIntensity:1.6, depthWrite:false }));
    top.rotation.x = -Math.PI/2; top.position.set((x0+x1)/2, y1+0.004, (z0+z1)/2); top.renderOrder = 4;
    anim.push(t => { if (!tieQuieto()) ol.offset.x = t*0.02; });
    return [m, top];
  };
  /* astenosfera: bloque traslúcido, techo que sigue la base de la litosfera */
  const astenosfera = (x0,x1,techo,z0,z1) => {
    const t = tieTextura(tieMapaAstenosfera(), true, { wrap:true }); t.wrapT = THREE.RepeatWrapping; t.repeat.set(2,1);
    const g = tieBloque((u,v,w) => { const x = x0+(x1-x0)*u, yt = techo(x)-0.012; return [x, yt + (-5.4-yt)*v, z0+(z1-z0)*w]; }, Q(40,80), 6, 2, {});
    const m = flat(0xffffff, { map:t, transparent:true, opacity:0.8 });
    const me = new THREE.Mesh(g, m); me.renderOrder = 1; return me;
  };
  const detalle = tieFbm(tipo==='conv'?5:tipo==='div'?15:25, 16, 4, 4);   /* relieve fino (u = x, v = z) */
  const nx = x => ((x+8)/16), nz = z => ((z+5)/10);

  let techoAst = () => -1.4, astX = [-8,8], astZ = [-2.5,2.5];

  if (tipo==='div'){
    /* fondo oceánico: dorsal con valle de rift en el eje; la placa se hunde y se engrosa al envejecer (lejos del eje) */
    const fondo = (x,z) => { const ax = Math.min(Math.abs(x),8);
      return 0.22 - 0.95*Math.sqrt(ax/8) - 0.3*Math.exp(-1*(x/0.32)**2) + 0.16*Math.exp(-1*((ax-0.62)/0.3)**2)
        + 0.09*detalle(nx(x)*3, nz(z)*0.5)*Math.min(1, ax*1.5) + 0.02*detalle(nx(x)*14, nz(z)*6); };
    const base = x => { const ax = Math.min(Math.abs(x),8); return 0.22 - 0.95*Math.sqrt(ax/8) - (0.3 + 1.05*Math.sqrt(ax/8)); };
    const colFondo = (p) => { const ax = Math.abs(p[0]); return tieLmix(tieLin(0x24272c), tieLin(0x6c6a60), tieSS(0.2, 5, ax) + 0.15*detalle(nx(p[0])*6, nz(p[2])*3)); };
    const placa = (xa, xb) => tieBloque((u,v,w) => { const x = xa+(xb-xa)*u, z = -2.5+5*w, yt = fondo(x,z), yb = base(x); return [x, yt+(yb-yt)*v, z]; },
      Q(60,120), Q(12,24), Q(20,40), { ru:3, rw:1, colTop:colFondo });
    const izq = new THREE.Mesh(placa(-8,-0.05), rocas(TIE_OCEANICA,'oce',{seed:3, calor:0.5}));
    const der = new THREE.Mesh(placa(0.05,8), rocas(TIE_OCEANICA,'oce',{seed:3, calor:0.5}));
    E.addPart('placas',[izq,der]); E.addLabel('placas','Litosfera oceánica',[-4.6,-1.0,2.6]);
    techoAst = base;
    /* magma: zona de fusión parcial bajo el eje + dique que alimenta la corteza nueva */
    const zona = tieBloque((u,v,w) => { const yt = base(0)-0.02, y = yt + (-4.6-yt)*v, hw = 0.1 + 1.45*Math.pow(v,0.85);
        return [(u-0.5)*2*hw, y, -2.4+4.93*w]; }, 16, Q(12,20), 2, {});
    const dique = tieBloque((u,v,w) => { const yt = fondo(0,-2.5+5*w)+0.02, yb = base(0)-0.05, hw = 0.06 + 0.1*v;
        return [(u-0.5)*2*hw, yt+(yb-yt)*v, -2.46+4.99*w]; }, 2, 6, 8, {});
    const mz = new THREE.Mesh(zona, magMat()), md = new THREE.Mesh(dique, magMat());
    mz.renderOrder = 2;
    E.addPart('magma',[mz,md],{passThrough:true}); E.addLabel('magma','Manto que asciende y se funde',[0,-3.4,2.4]);
    E.addPart('oceano', agua(-8,8,-1.6,1.9,-2.48,2.48), {passThrough:true,pickable:false}); E.addLabel('oceano','Océano',[-6.4,1.2,2.4]);
    const ss = [[-0.6,1.4],[0.7,-1.1],[0.2,0.4],[-1.3,-0.6]].map(([x,z]) => sismo(x, fondo(x,z)-0.18, z));
    ss.push(sismo(0.45, fondo(0.45,2.5)-0.2, 2.56, 0.16), sismo(-0.3, fondo(-0.3,2.5)-0.3, 2.56, 0.14));
    E.addPart('sismos',ss); E.addLabel('sismos','Sismos superficiales',[1.6,-0.4,1.8]);
    E.addPart('marcas',[marca(-2.2,0,1.8,colT,[-1,0,0],fondo),marca(-4.4,0,-1.6,colT,[-1,0,0],fondo),
                        marca(2.2,0,1.8,colT,[1,0,0],fondo),marca(4.4,0,-1.6,colT,[1,0,0],fondo)],{pickable:false});
    E.addPart('flechas',[flecha(-3.6,2.5,0,[-1,0,0]), flecha(3.6,2.5,0,[1,0,0])],{passThrough:true,pickable:false});
  } else if (tipo==='conv'){
    /* placa de Nazca: plana, abombada antes de la fosa, y luego se dobla y se hunde con un ángulo creciente (~33°) */
    const XT = -2.1, TH = 0.75, TAN = Math.tan(33*Math.PI/180);
    const techo = x => { const d = Math.max(0, x-XT), dob = TAN*(d < 2.6 ? d*d/5.2 : 1.3 + (d-2.6));
      return -0.45 + 0.12*Math.exp(-1*((x+3.2)/1.1)**2) - dob - 0.22*tieSS(-2.3,-1.4,x); };
    const dtecho = x => (techo(x+0.01)-techo(x-0.01))/0.02;
    const rugo = (x,z) => x < -1.4 ? 0.06*detalle(nx(x)*3, nz(z)*0.8)*tieSS(-1.2,-2.2,x) + 0.018*detalle(nx(x)*12, nz(z)*5) : 0;
    const losa = tieBloque((u,v,w) => { const x0 = -8 + u*14.4, z = -2.5+5*w, yt = techo(x0) + rugo(x0,z), s = dtecho(x0), l = Math.hypot(1,s);
        return [x0 + (s/l)*TH*v, yt - (1/l)*TH*v, z]; }, Q(80,160), Q(8,14), Q(18,36),
      { ru:3, colTop:(p) => tieLmix(tieLin(0x4a4d4f), tieLin(0x6b675c), 0.5 + 0.5*detalle(nx(p[0])*5, nz(p[2])*3)) });
    const mo = new THREE.Mesh(losa, rocas(TIE_OCEANICA,'oce',{seed:3, calor:0.5}));
    E.addPart('oceanica',[mo]); E.addLabel('oceanica','Placa de Nazca (se hunde)',[-5.4,-1.0,2.6]);
    /* placa Sudamericana: talud continental, llanura costera, altiplano andino y llanura amazónica */
    const XP = -1.35, MAR = 1.4;
    const tierra = (x,z) => { const yb = techo(XP)+0.02;
      let y = x < 0.6 ? yb + (MAR+0.15-yb)*Math.pow(tieSS(XP, 0.6, x), 0.9) : MAR+0.15 + 0.1*tieSS(0.6,1.6,x);
      y += 0.62*tieSS(1.4,2.6,x)*(1-tieSS(6.9,7.7,x));
      return y + 0.05*detalle(nx(x)*6, nz(z)*3)*tieSS(XP, 0, x); };
    const baseC = x => Math.max(techo(x)+0.004, -1.75);
    const colTierra = (p) => { const y = p[1], x = p[0], n = detalle(nx(x)*8, nz(p[2])*4);
      if (y < MAR) return tieLmix(tieLin(0x3d4446), tieLin(0x6b6a5e), (y-techo(XP))/(MAR-techo(XP)));
      let c = tieLmix(tieLin(0x5f7f3c), tieLin(0x8a8054), tieSS(1.9, 2.1, y) + n*0.3);   /* costa verde → páramo */
      if (x > 6.8) c = tieLmix(c, tieLin(0x2c5a2c), tieSS(6.8, 7.6, x));                    /* Amazonía */
      return c; };
    const cont = tieBloque((u,v,w) => { const x = XP + u*(8-XP), z = -2.5+5*w, yt = tierra(x,z), yb = baseC(x); return [x, yt+(yb-yt)*v, z]; },
      Q(70,140), Q(10,20), Q(18,36), { ru:2.5, colTop:colTierra });
    const mc = new THREE.Mesh(cont, rocas(TIE_CONTINENTAL,'con',{seed:9, calor:0.5}));
    E.addPart('continental',[mc]); E.addLabel('continental','Placa Sudamericana',[6.0,-0.9,2.6]);
    /* cordilleras: crestas con relieve de aristas (ruido de crestas) */
    const cordillera = (xc, H, hw, seed) => { const rn = tieFbm(seed, 6, 3, 4);
      return tieBloque((u,v,w) => { const x = xc + (u-0.5)*2*hw, z = -2.5+5*w, b = tierra(x,z)-0.02;
          const g = Math.exp(-1*((x-xc)/(hw*0.42))**2), r = 1 - Math.abs(rn(u*0.9, w*0.7))*1.6;
          const yt = b + H*g*(0.72 + 0.34*r) + 0.04*detalle(nx(x)*10, nz(z)*6)*g; return [x, yt + (b-0.02-yt)*v, z]; },
        Q(24,40), 3, Q(24,48), { ru:1, colTop:(p) => { const hgt = p[1]-tierra(p[0],p[2]);
          let c = tieLmix(tieLin(0x7c7a52), tieLin(0x7a6a5a), tieSS(0.25,0.7,hgt)); return tieLmix(c, tieLin(0xeef3f6), tieSS(H*0.82, H*0.95, hgt)); } }); };
    const c1 = new THREE.Mesh(cordillera(2.6, 1.25, 1.1, 101), rocas(TIE_CONTINENTAL,'con',{seed:9, calor:0.5}));
    const c2 = new THREE.Mesh(cordillera(6.5, 1.05, 1.0, 107), rocas(TIE_CONTINENTAL,'con',{seed:9, calor:0.5}));
    E.addPart('cordillera',[c1,c2]); E.addLabel('cordillera','Cordillera',[7.5,3.4,2.0],[6.5,3.0,1.4]);
    /* arco volcánico: estratovolcanes con cráter, casquete glaciar y lava incandescente */
    const volcan = (x, z, H, R, nieve) => { const pts = [], n = 18, b = tierra(x,z)-0.05;
      for (let i=0;i<=n;i++){ const t = i/n; pts.push(new THREE.Vector2(R*0.12 + R*0.88*Math.pow(1-t,2.1), H*t)); }   /* laderas cóncavas: base ancha, cono empinado */
      pts.push(new THREE.Vector2(R*0.07, H-0.14)); pts.push(new THREE.Vector2(0.001, H-0.16));
      const g = new THREE.LatheGeometry(pts, Q(28,48)); const P = g.attributes.position, cs = [], rr = tieFbm(seed0++, 8, 4, 3);
      for (let i=0;i<P.count;i++){ const px = P.getX(i), py = P.getY(i), pz = P.getZ(i), a = (Math.atan2(pz,px)/(Math.PI*2)+1)%1, f = py/H;
        const k = 1 + 0.05*rr(a, f)*(1-f); P.setX(i, px*k); P.setZ(i, pz*k);
        let c = tieLmix(tieLin(0x6e6153), tieLin(0x3f3a37), f*1.2 + rr(a*3,f)*0.3);
        if (nieve) c = tieLmix(c, tieLin(0xf2f6f8), tieSS(0.66, 0.74, f + rr(a*4, f)*0.08));
        if (f > 0.97 && Math.hypot(px,pz) < R*0.11) c = tieLin(0x2a2220);
        cs.push(c[0],c[1],c[2]); }
      g.setAttribute('color', new THREE.Float32BufferAttribute(cs,3)); g.computeVertexNormals();
      const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors:true, map:grano(), roughness:0.9, metalness:0 }));
      m.position.set(x, b, z); return m; };
    let seed0 = 211;
    const VH = 1.5, v1 = volcan(4.2, 1.0, VH, 1.25, true), v2 = volcan(5.4, 0.2, 1.2, 1.0, false);
    const lava = new THREE.Mesh(new THREE.CircleGeometry(0.11, 20), magMat()); lava.rotation.x = -Math.PI/2;
    lava.position.set(4.2, v1.position.y + VH - 0.13, 1.0);
    const brilloL = tieHalo([[0,'rgba(255,200,90,.9)'],[0.35,'rgba(255,120,40,.35)'],[1,'rgba(255,90,20,0)']], 64);
    brilloL.scale.setScalar(0.9); brilloL.position.copy(lava.position).add(new THREE.Vector3(0,0.08,0)); E.scene.add(brilloL);
    E.addPart('arco',[v1,v2,lava]); E.addLabel('arco','Arco volcánico',[4.6,4.4,0.6]);
    /* columna de gases y ceniza (sprites que suben y se desvanecen) */
    const humoTex = tieHalo([[0,'rgba(190,185,180,.55)'],[0.6,'rgba(150,145,140,.2)'],[1,'rgba(120,120,120,0)']], 64).material.map;
    for (let i=0;i<Q(4,7);i++){ const s = new THREE.Sprite(new THREE.SpriteMaterial({ map:humoTex, transparent:true, depthWrite:false, toneMapped:false }));
      E.scene.add(s); const f0 = i/Q(4,7);
      anim.push(t => { const f = tieQuieto() ? f0 : (t*0.12 + f0) % 1; s.position.set(4.2 + f*0.9, lava.position.y + 0.2 + f*1.6, 1.0 - f*0.3);
        s.scale.setScalar(0.35 + f*1.1); s.material.opacity = 0.75*(1-f)*Math.min(1, f*6); }); }
    /* fusión: el agua que libera la placa baja el punto de fusión del manto; el magma sube hacia los volcanes */
    const conducto = (pts, r0) => new THREE.Mesh(Kit.taper(pts, r0, r0*0.55, { seg:Q(24,48), rad:Q(8,12) }), magMat());
    const con1 = conducto([[3.05,techo(3.05)+0.08,2.5],[3.35,-2.2,2.5],[3.8,-1.1,2.5],[4.1,0.6,2.3],[4.2,1.9,1.0]], 0.15);
    const con2 = conducto([[3.75,techo(3.75)+0.08,2.5],[4.3,-2.4,2.5],[5.0,-1.1,2.5],[5.35,0.6,2.1],[5.4,1.8,0.2]], 0.12);
    const camara = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), magMat()); camara.scale.set(0.6,0.22,0.5); camara.position.set(4.2,0.6,1.3);
    const gotas = [];
    for (let i=0;i<Q(5,8);i++){ const g = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), flat(0x7fd0ff)); gotas.push(g);
      const x0 = 2.1 + i*0.22, f0 = i/Q(5,8);
      anim.push(t => { const f = tieQuieto() ? 0.4 : (t*0.18 + f0) % 1; g.position.set(x0 + f*0.35, techo(x0) + 0.1 + f*0.9, 2.56); g.visible = f < 0.92; }); }
    E.addPart('fusion',[con1,con2,camara,...gotas],{passThrough:true}); E.addLabel('fusion','El agua hace fundir el manto',[1.4,-2.9,2.2]);
    const fosa = tieBloque((u,v,w) => { const x = -1.75 + u*0.55, z = -2.5+5*w, y = techo(x) + rugo(x,z) + 0.012; return [x, y - 0.03*v, z]; }, 8, 1, Q(12,24), {});
    E.addPart('fosa',[new THREE.Mesh(fosa, new THREE.MeshStandardMaterial({ color:0x122238, roughness:0.8 }))]); E.addLabel('fosa','Fosa',[-1.5,0.9,2.2]);
    E.addPart('oceano', agua(-8,0.7,-1.3,MAR,-2.48,2.48), {passThrough:true,pickable:false}); E.addLabel('oceano','Océano',[-6.6,1.1,2.4]);
    const ss = [];
    for (let i=0;i<8;i++){ const u=i/7, x = -1.2+u*7.6; ss.push(sismo(x, techo(x) - 0.12 - (i%2)*0.22, 2.56, 0.16+u*0.12)); }
    E.addPart('sismos',ss); E.addLabel('sismos','Sismos: más profundos hacia el continente',[3.0,-5.4,2.2]);
    E.addPart('marcas',[marca(-3.0,0,1.8,colT,[1,0,0],(x,z)=>techo(x)+rugo(x,z)),marca(-5.4,0,-1.6,colT,[1,0,0],(x,z)=>techo(x)+rugo(x,z)),
                        marca(7.2,0,1.8,colT,[-1,0,0],tierra),marca(7.9,0,-1.6,colT,[-1,0,0],tierra)],{pickable:false});
    E.addPart('flechas',[flecha(-5.2,2.3,0,[1,0,0]), flecha(6.7,4.25,-1.6,[-1,0,0],2.0)],{passThrough:true,pickable:false});
    techoAst = x => { const a = techo(x)-TH; return a > -1.755 ? a : -1.755; };
  } else {
    /* borde transformante: dos bloques que se deslizan en sentidos opuestos a lo largo de una falla vertical (z = 0) */
    const relieve = (x,z) => 0.1 + 0.14*detalle(nx(x)*1.2, nz(z)*1.2) + 0.03*detalle(nx(x)*8, nz(z)*8);
    const rioX = (z, x0) => x0 + 0.35*Math.sin(z*1.3) + 0.15*Math.sin(z*3.1+1);
    const RA = -2.2, RB = 1.1;                        /* el mismo río, desplazado por la falla */
    const cauce = (x,z) => { const x0 = z < 0 ? RA : RB; return -0.12*Math.exp(-1*((x-rioX(z,x0))/0.32)**2); };
    const sup = (x,z) => relieve(x,z) + cauce(x,z);
    const colSup = (p) => { const n = detalle(nx(p[0])*6, nz(p[2])*6); let c = tieLmix(tieLin(0x5d7a3a), tieLin(0x8b8a55), 0.4 + n*0.9);
      const x0 = p[2] < 0 ? RA : RB, d = Math.abs(p[0]-rioX(p[2],x0)); return tieLmix(tieLin(0x8a7a5a), c, tieSS(0.18, 0.4, d)); };
    const bloque = (z0, z1) => tieBloque((u,v,w) => { const x = -6+12*u, z = z0+(z1-z0)*w, yt = sup(x,z); return [x, yt + (-1.3-yt)*v, z]; },
      Q(60,120), Q(8,14), Q(24,48), { ru:2, colTop:colSup });
    const a = new THREE.Mesh(bloque(-4.7,-0.12), rocas(TIE_SEDIMENTARIA,'sed',{seed:17, onda:0.015}));
    const b = new THREE.Mesh(bloque(0.12,4.7), rocas(TIE_SEDIMENTARIA,'sed',{seed:17, onda:0.015}));
    E.addPart('bloqueA',[a]); E.addLabel('bloqueA','Bloque que se mueve hacia allá',[-1.5,2.2,-2.0],[-3.4,0.35,-2.4]);
    E.addPart('bloqueB',[b]); E.addLabel('bloqueB','Bloque que se mueve hacia acá',[3.4,0.3,3.4]);
    const falla = new THREE.Mesh(new THREE.BoxGeometry(12,1.36,0.2), new THREE.MeshStandardMaterial({ color:0x1e252e, roughness:0.95, transparent:true, opacity:0.55, depthWrite:false }));
    falla.position.set(0,-0.62,0); falla.renderOrder = 2;
    E.addPart('falla',[falla]); E.addLabel('falla','Falla transformante',[0,0.6,0]);
    /* río: cinta de agua que sigue el cauce; de un bloque al otro aparece cortada y desplazada */
    const cinta = (z0, z1, x0) => { const n = Q(40,80), P = [], I = [];
      for (let i=0;i<=n;i++){ const z = z0 + (z1-z0)*i/n, xc = rioX(z,x0); [-0.13,0.13].forEach(dx => P.push(xc+dx, sup(xc+dx,z)+0.035, z)); }
      for (let i=0;i<n;i++){ const k=i*2; I.push(k,k+1,k+2, k+1,k+3,k+2); }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P,3)); g.setIndex(I); g.computeVertexNormals();
      return new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({ color:0x3f9ee0, roughness:0.1, clearcoat:1, envMapIntensity:1.5, side:THREE.DoubleSide })); };
    E.addPart('rio',[cinta(-4.7,-0.12,RA), cinta(0.12,4.7,RB)],{pickable:false}); E.addLabel('rio','Un río cortado y desplazado',[-4.8,1.3,-0.4],[rioX(-1.2,RA),0.12,-1.2]);
    const ss = [sismo(-2.0,-0.5,0),sismo(0.4,-0.9,0),sismo(2.6,-0.4,0),sismo(-4.4,-0.7,0),sismo(4.6,-1.0,0)];
    E.addPart('sismos',ss); E.addLabel('sismos','Sismos superficiales a lo largo de la falla',[4.8,-1.7,1.4]);
    E.addPart('marcas',[marca(-3.4,0,-2.2,colT,[-1,0,0],sup),marca(2.6,0,-2.2,colT,[-1,0,0],sup),
                        marca(-2.4,0,2.2,colT,[1,0,0],sup),marca(3.6,0,2.2,colT,[1,0,0],sup)],{pickable:false});
    E.addPart('flechas',[flecha(0.6,1.25,-2.6,[-1,0,0]), flecha(-0.6,1.25,2.6,[1,0,0])],{passThrough:true,pickable:false});
    techoAst = () => -1.3; astX = [-6.4,6.4]; astZ = [-4.9,4.9];
  }
  const ast = astenosfera(astX[0], astX[1], techoAst, astZ[0]+(tipo==='trans'?0:0.05), astZ[1]-(tipo==='trans'?0:0.05));
  E.addPart('astenosfera',[ast],{passThrough:true}); E.addLabel('astenosfera','Astenosfera',[-6.4,-3.4,2.6]);

  tieEncuadre(E, 6.8);
  const fl = E.parts.get('flechas').meshes;
  E.onFrame((t) => {
    anim.forEach(f => f(t));
    if (tieQuieto()) return;
    magTex.offset.y = -t*0.08;                         /* el magma fluye hacia arriba */
    const u = (t*0.22) % 1;
    puntos.forEach(m => { const b = m.userData.b, d = m.userData.dir, x = b[0]+d[0]*u*1.8, z = b[2]+d[2]*u*1.8;
      m.position.set(x, m.userData.yf ? m.userData.yf(x,z)+0.2 : b[1], z);
      m.visible = u < 0.88; });
    const k = (t*0.35) % 1;
    fl.forEach(m => { const b = m.userData.b, d = m.userData.dir; m.position.set(b[0]+d[0]*k*0.7, b[1], b[2]+d[2]*k*0.7);
      m.material.opacity = 0.55 + 0.4*Math.min(1, (1-k)*4, k*4); });
  });
  return E;
}

/* =====================================================================
   VISTA PRINCIPAL
   ===================================================================== */
function tierraView(view){
  view.classList.add('wide');
  const SEC = [
    { id:'interior', n:'1 · Dentro de la Tierra' },
    { id:'placas',   n:'2 · Placas y bordes' },
    { id:'bordes',   n:'3 · Qué pasa en cada borde' },
    { id:'sismos',   n:'4 · Sismos' },
    { id:'volcanes', n:'5 · Volcanes' },
    { id:'rocas',    n:'6 · Ciclo de las rocas' },
    { id:'oceano',   n:'7 · Océanos y clima' },
    { id:'decision', n:'8 · Decisión del cantón' },
    { id:'reto',     n:'9 · Reto final' }
  ];
  const St = {
    sec:0, capa:'manto', lito:false, sombra:'s',
    tipoMapa:null, borde:'conv',
    radios:{}, cand:null, triOK:false, mag:[6,7], merc:null,
    forma:'estrato', volSil:58, volGas:2.5, vol:0,
    roca:'magma', ruta:['magma'], rocaErr:0, rocaFb:null, visit:{magma:true},
    corr:0, serieModo:'suma', yA:1998, yB:2012,
    clas:{}, clasFb:null, prio:[], notaOK:false,
    marcas:{ capas:false, bordes:false, triangula:false, volcan:false, ciclo:false, cherry:false, decision:false },
    start:Date.now(), errs:0
  };
  TIE_ESTACIONES.forEach(e => St.radios[e.id] = '');
  const hecho0 = !!Store.s.activities['cn-tierra']?.done;

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{},
      h('span',{class:'eyebrow eco'},'Ciencias Naturales · Vida y Tierra · 10.º EGB U2 (apoya 8.º U3)'),
      h('h1',{},'Tierra dinámica: placas, sismos, volcanes, rocas y océanos'),
      h('p',{},'¿Cómo conectan los procesos internos, los ciclos planetarios y los océanos con los riesgos y los cambios que sí podemos medir? Aquí se arma la respuesta pieza por pieza, y se termina decidiendo qué haría un cantón con su presupuesto.')),
    h('span',{class:'pill eco'},'+140 XP · 45–60 min')));

  const retoSt = h('div',{class:'notice'}, hecho0 ? 'Reto resuelto ✓ · puedes volver a recorrer todas las secciones.' : 'Pendiente: llega a la sección 9 y responde las cinco preguntas.');
  if (hecho0) retoSt.className = 'notice ok';
  view.append(purposeBanner({
    proposito:'Explicar los sismos, los volcanes, las montañas y las rocas del Ecuador como consecuencias de un mismo motor —el calor interno que mueve las placas— y distinguir, en datos del océano y del clima, lo que varía de año en año de lo que cambia de forma sostenida.',
    observa:[
      'Que la sombra de las ondas S es lo que nos dice que el núcleo externo es líquido: nadie ha bajado a verlo',
      'Que la corteza es solo una parte de la placa: la placa incluye también manto rígido',
      'Que los sismos son más profundos cuanto más al oriente, siguiendo la placa de Nazca que se hunde',
      'Que en una misma serie de datos conviven una oscilación (El Niño) y una tendencia'
    ],
    reto:'Ubica un epicentro por triangulación, recorre el ciclo de las rocas sin equivocarte, distingue variabilidad de tendencia y defiende dos medidas para el cantón. Cierra con las cinco preguntas del reto final.',
    statusEl: retoSt }));

  const nav = h('nav',{class:'tie-nav','aria-label':'Secciones del recurso'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);
  let E = null;   /* motor 3D vivo (se libera en cada cambio de sección) */

  function renderNav(){
    nav.innerHTML='';
    SEC.forEach((s,i) => nav.append(h('button',{'aria-current':String(i===St.sec), onclick:()=>{ St.sec=i; render(); }}, s.n)));
  }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:8px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec=Math.max(0,St.sec-1); render(); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec=Math.min(SEC.length-1,St.sec+1); render(); }},'Siguiente →'));
  }
  /* aviso con título en negrita; si el texto trae etiquetas, se inserta como HTML */
  const nota = (cls, titulo, txt) => h('div',{class:'notice '+cls},
    h('span',{}, h('b',{}, titulo+' '), /<[a-z/]/i.test(txt) ? h('span',{html:txt}) : txt));

  /* =================================================================
     1 · DENTRO DE LA TIERRA
     ================================================================= */
  function secInterior(){
    const stage = h('div',{class:'stage tie-stage',style:'align-self:start;height:520px;min-height:520px'});
    const panel = h('div',{class:'panel'});
    const lista = h('div',{class:'tie-chips',style:'flex-direction:column',role:'group','aria-label':'Capas de la Tierra, seleccionables con el teclado'});
    const ficha = h('div',{class:'stack'});
    const btns = {};
    function pintar(id){
      St.capa = id;
      Object.entries(btns).forEach(([k,b]) => b.setAttribute('aria-pressed', String(k===id)));
      if (E) E.select(id);
      const c = TIE_CAPAS.find(x=>x.id===id);
      ficha.innerHTML='';
      if (!c) return;
      const esp = c.r1 - c.r0, pct = (Math.pow(c.r1,3)-Math.pow(c.r0,3))/Math.pow(TIE_R,3)*100;
      ficha.append(
        h('div',{class:'row',style:'gap:8px;align-items:center'}, h('span',{style:`width:16px;height:16px;border-radius:4px;border:1px solid var(--line);background:${c.hex}`}), h('h3',{style:'margin:0'}, c.n)),
        h('dl',{class:'tie-kv'},
          h('dt',{},'Espesor'), h('dd',{}, tieMil(esp)+' km (aprox.)'),
          h('dt',{},'Profundidad'), h('dd',{}, c.id==='corteza' ? 'de 0 a '+tieMil(TIE_R-c.r0)+' km' : 'de '+tieMil(TIE_R-c.r1)+' km a '+tieMil(TIE_R-c.r0)+' km'),
          h('dt',{},'Estado'), h('dd',{}, c.estado),
          h('dt',{},'Temperatura'), h('dd',{}, c.temp),
          h('dt',{},'De qué está hecha'), h('dd',{}, c.comp),
          h('dt',{},'Parte del volumen'), h('dd',{}, tieDec(pct,1)+' % del planeta (aprox.)')),
        h('p',{style:'font-size:.9rem'}, c.d),
        nota('info','Evidencia indirecta:', c.evid));
      if (Store.s.a11y.tts) ficha.append(TTS.btn(()=>ficha.textContent,'Leer la ficha de la capa'));
      St.marcas.capas = true;
      Store.log('seleccion',{recurso:'cn-tierra', capa:id});
    }
    TIE_CAPAS.forEach(c => { btns[c.id] = h('button',{'aria-pressed':'false','aria-label':'Capa '+c.n, onclick:()=>pintar(c.id)},
      h('span',{style:`display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:7px;background:${c.hex}`}), c.n,
      h('small',{}, c.estado)); lista.append(btns[c.id]); });

    const chkLito = h('input',{type:'checkbox','aria-label':'Marcar la litosfera sobre el modelo', onchange:e=>{ St.lito = e.target.checked; if (E) E.setVisible('litosfera', St.lito); }});
    chkLito.checked = St.lito;
    const toggleLito = h('label',{class:'toggle',style:'background:color-mix(in srgb,var(--bg-2) 85%,transparent);padding:5px 10px;border-radius:10px;border:1px solid var(--line)'}, chkLito, 'Marcar la litosfera');
    stage.append(h('div',{class:'stage-top'}, toggleLito));
    stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Gajo cortado a escala relativa correcta: la corteza es esa línea finísima del borde.')));

    if (webglOK){
      try { E = tieInterior3D(stage, pintar); } catch(err){ console.warn('tierra interior 3D', err); E = null; }
    }
    if (!E){
      const K = 150/TIE_R;
      const anillos = TIE_CAPAS.slice().reverse().map(c => `<circle cx="170" cy="170" r="${(c.r1*K).toFixed(1)}" fill="${c.hex}" stroke="#101722" stroke-width="1"/>`).join('');
      stage.append(h('div',{style:'position:absolute;inset:0;display:grid;place-items:center;padding:10px'},
        h('div',{style:'width:100%;max-width:360px',html:
          `<svg class="tie-svg" viewBox="0 0 340 360" role="img" aria-label="Alternativa sin 3D: corte circular de la Tierra a escala relativa, con el núcleo interno en el centro, el núcleo externo, el manto y una corteza tan delgada que apenas se distingue. Los datos numéricos están en la lista de capas.">`
          + `<rect width="340" height="360" fill="#101722"/>${anillos}`
          + `<text x="170" y="348" font-size="12" fill="#9fb0bd" text-anchor="middle">Sin WebGL: corte 2D con los mismos datos</text></svg>`})));
    }
    if (E) E.setVisible('litosfera', St.lito);
    pintar(St.capa);
    panel.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Elige una capa'), lista,
        h('p',{class:'small muted'},'También puedes tocar la capa en el modelo. Con el teclado: Tab para recorrer la lista y Enter para elegir.')),
      h('div',{class:'card stack'}, ficha));

    const svgSombra = h('div',{html: tieSombraSVG(St.sombra)});
    const seg = h('div',{class:'tie-seg',role:'group','aria-label':'Tipo de onda sísmica que se muestra'});
    const bS = h('button',{'aria-pressed':String(St.sombra==='s'), onclick:()=>{ St.sombra='s'; svgSombra.innerHTML=tieSombraSVG('s'); bS.setAttribute('aria-pressed','true'); bP.setAttribute('aria-pressed','false'); }},'Ondas S');
    const bP = h('button',{'aria-pressed':String(St.sombra==='p'), onclick:()=>{ St.sombra='p'; svgSombra.innerHTML=tieSombraSVG('p'); bP.setAttribute('aria-pressed','true'); bS.setAttribute('aria-pressed','false'); }},'Ondas P');
    seg.append(bS,bP);

    const tabla = h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Onda'), h('th',{},'Cómo vibra'), h('th',{},'Rapidez aprox.'), h('th',{},'¿Atraviesa líquidos?'), h('th',{},'Qué nos revela'))),
      h('tbody',{},
        h('tr',{}, h('td',{},h('b',{},'P (primaria)')), h('td',{},'De compresión: el material se aprieta y se estira en la misma dirección en que avanza'), h('td',{class:'num'},'6 a 13 km/s'), h('td',{},'Sí'), h('td',{},'Llegan primero. Su desvío al entrar y salir del núcleo delata que ahí cambia el material.')),
        h('tr',{}, h('td',{},h('b',{},'S (secundaria)')), h('td',{},'Transversal: el material se sacude de lado, perpendicular al avance'), h('td',{class:'num'},'3,5 a 7 km/s'), h('td',{},'No'), h('td',{},'Su ausencia más allá de 103° dibuja la sombra que prueba el núcleo externo líquido.')))));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Antes de leer: gira el modelo'),
        h('p',{},'Nadie ha bajado nunca al manto. La perforación más profunda jamás hecha (el pozo de Kola, en Rusia) llegó a unos 12,3 km: ni siquiera atravesó la corteza continental. Todo lo que sabemos del interior vino de las ondas sísmicas. Rota el gajo, toca cada capa y fíjate en el grosor real de la corteza.')),
      h('div',{class:'viewer'}, stage, panel),
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'La evidencia: la sombra de las ondas'),
          h('p',{class:'small muted'},'Un sismo grande manda ondas en todas direcciones. Al comparar qué estaciones del mundo las registran y cuáles no, se dibuja el interior del planeta sin abrirlo.'),
          seg, svgSombra,
          nota('ok','El razonamiento clave:','Las ondas S son transversales y un líquido no resiste el corte: no puede transmitirlas. Si a partir de 103° de distancia angular ninguna estación del planeta registra ondas S, es porque en el camino hay una capa líquida que las detuvo. Esa capa es el núcleo externo. Es evidencia indirecta, pero es evidencia.')),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Ondas P y ondas S'), tabla,
          nota('warn','Error frecuente:','“La corteza es lo mismo que la placa”. No: la placa (litosfera) incluye toda la corteza y además los primeros kilómetros del manto, hasta unos 100 km. Activa la casilla “Marcar la litosfera” sobre el modelo y compara el grosor de la franja celeste con el de la corteza gris.'),
          h('p',{class:'small'}, TIE_LITO.d))),
      secNav());
  }

  /* =================================================================
     2 · PLACAS Y BORDES
     ================================================================= */
  function secPlacas(){
    const mapa = h('div',{html: tieMapaSVG(St.tipoMapa)});
    const ficha = h('div',{class:'stack'});
    const chips = h('div',{class:'tie-chips',role:'group','aria-label':'Tipos de borde de placa'});
    const bs = {};
    function elegir(t){
      St.tipoMapa = (St.tipoMapa===t) ? null : t;
      Object.entries(bs).forEach(([k,b]) => b.setAttribute('aria-pressed', String(k===St.tipoMapa)));
      mapa.innerHTML = tieMapaSVG(St.tipoMapa);
      ficha.innerHTML = '';
      if (!St.tipoMapa){ ficha.append(h('p',{class:'small muted'},'Elige un tipo de borde para resaltarlo en el mapa y leer qué forma, qué sismos y qué volcanes produce.')); return; }
      const T = TIE_TIPOS[St.tipoMapa];
      ficha.append(h('h3',{style:'margin:0'}, T.em+' '+T.n),
        h('p',{style:'font-size:.9rem'}, T.d),
        h('dl',{class:'tie-kv'},
          h('dt',{},'Qué forma'), h('dd',{}, T.forma),
          h('dt',{},'Sismos'), h('dd',{}, T.sismos),
          h('dt',{},'Volcanes'), h('dd',{}, T.volc),
          h('dt',{},'Ejemplos'), h('dd',{}, T.ej)),
        h('p',{class:'small muted'},'Bordes de este tipo en el mapa: '+TIE_BORDES.filter(b=>b.tipo===St.tipoMapa).map(b=>b.n).join('; ')+'.'),
        h('button',{class:'btn sm primary',style:'align-self:flex-start', onclick:()=>{ St.borde=St.tipoMapa; St.sec=2; render(); }},'Ver este borde en corte 3D →'));
      St.marcas.bordes = true;
      Store.log('seleccion',{recurso:'cn-tierra', borde:St.tipoMapa});
    }
    Object.entries(TIE_TIPOS).forEach(([k,T]) => { bs[k] = h('button',{'aria-pressed':String(St.tipoMapa===k),'aria-label':T.n, onclick:()=>elegir(k)},
      T.em+' '+T.n, h('small',{}, T.forma)); chips.append(bs[k]); });
    elegir(St.tipoMapa); Object.entries(bs).forEach(([k,b]) => b.setAttribute('aria-pressed', String(k===St.tipoMapa)));

    const leyenda = h('div',{class:'tie-leg'},
      Object.values(TIE_TIPOS).map(T => h('span',{}, h('i',{style:`border-top-color:${T.col};border-top-style:${T.dash==='0'?'solid':'dashed'}`}), T.n)),
      h('span',{}, h('b',{},'●'),' Ecuador y Galápagos'),
      h('span',{},'Línea punteada amarilla: el ecuador terrestre'));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Mapa de placas'),
        h('p',{},'La litosfera está rota en una docena de placas grandes y varias pequeñas, que se mueven unos pocos centímetros por año: más o menos lo que crecen tus uñas. Todo el movimiento ocurre en los bordes. Elige un tipo de borde para verlo resaltado.'),
        chips, mapa, leyenda,
        h('p',{class:'small muted'},'Mapa esquemático y simplificado, dibujado a propósito para esta actividad: sirve para ubicar los bordes y su tipo, no para medir distancias. Cada línea tiene un patrón distinto además del color.')),
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, ficha),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Por qué se mueven'),
          h('p',{html:'El motor es el <b>calor interno</b> del planeta, que viene del calor que quedó de su formación y de la desintegración de elementos radiactivos en el manto. Ese calor genera corrientes lentísimas en el manto, y esas corrientes, junto con el propio peso de la placa que se hunde en la fosa, arrastran a las placas.'}),
          nota('warn','Error frecuente:','“El magma viene del núcleo”. No. El núcleo externo es hierro y níquel líquidos, no magma, y está a casi 3.000 km de profundidad. El magma de los volcanes se genera en el manto superior y en la base de la corteza, entre unos 60 y 200 km: muchísimo más arriba. Las rocas del núcleo ni siquiera son del mismo tipo.'),
          nota('info','Dato para dimensionar:','Si las placas se mueven unos 5 cm por año, en la vida de un estudiante de 15 años el Ecuador se ha acercado unos 75 cm al Pacífico. En 200 millones de años, esa misma velocidad separó África de Sudamérica por completo.'))),
      secNav());
  }

  /* =================================================================
     3 · QUÉ PASA EN CADA BORDE
     ================================================================= */
  function secBordes(){
    const stage = h('div',{class:'stage tie-stage',style:'align-self:start;height:500px;min-height:500px'});
    const panel = h('div',{class:'panel'});
    const seg = h('div',{class:'tie-chips',role:'group','aria-label':'Tipo de borde a simular'});
    Object.entries(TIE_TIPOS).forEach(([k,T]) => seg.append(h('button',{'aria-pressed':String(St.borde===k),'aria-label':'Simular un '+T.n,
      onclick:()=>{ St.borde=k; St.marcas.bordes=true; Store.log('simulador',{recurso:'cn-tierra', borde:k}); render(); }}, T.em+' '+T.n)));
    const T = TIE_TIPOS[St.borde];
    if (webglOK){
      try { E = tieBorde3D(stage, St.borde); } catch(err){ console.warn('tierra borde 3D', err); E = null; }
    }
    if (!E) stage.append(h('div',{style:'position:absolute;inset:0;display:grid;place-items:center;padding:10px'},
      h('div',{style:'width:100%',html: tieCorteSVG(St.borde)})));
    stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},
      tieQuieto() ? 'Animación reducida por tu preferencia de accesibilidad: los puntos de referencia están quietos y las flechas indican el sentido del movimiento.'
                  : 'Los puntos de colores marcan el movimiento relativo de cada placa.')));
    panel.append(
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Elige el borde'), seg),
      h('div',{class:'card stack'}, h('h3',{style:'margin:0'}, T.n),
        h('p',{style:'font-size:.9rem'}, T.d),
        h('dl',{class:'tie-kv'},
          h('dt',{},'Qué se forma'), h('dd',{}, T.forma),
          h('dt',{},'Dónde hay sismos'), h('dd',{}, T.sismos),
          h('dt',{},'Volcanes'), h('dd',{}, T.volc),
          h('dt',{},'Ejemplos'), h('dd',{}, T.ej)),
        Store.s.a11y.tts ? TTS.btn(()=>`${T.n}. ${T.d} Se forma: ${T.forma} Sismos: ${T.sismos} Volcanes: ${T.volc}`,'Leer la descripción') : null));

    const ec = h('div',{class:'card stack'},
      h('span',{class:'eyebrow eco'},'🇪🇨 El caso ecuatoriano: Nazca bajo la Sudamericana'),
      h('p',{html:'Frente a nuestras costas, la <b>placa de Nazca</b> (oceánica, densa y delgada) choca con la <b>placa Sudamericana</b> (continental, gruesa y menos densa) y se hunde debajo de ella a unos 5 o 6 cm por año. Una sola causa explica tres cosas que solemos estudiar por separado:'}),
      h('ul',{class:'checks plain'},
        h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{html:'<b>La cordillera.</b> El choque comprime y engrosa el borde del continente: por eso los Andes tienen dos ramas, la Cordillera Occidental y la Cordillera Real, con el valle interandino en medio.'})),
        h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{html:'<b>Los volcanes.</b> La placa que baja arrastra agua en sus minerales. A unos 100 o 150 km de profundidad esa agua se libera, baja el punto de fusión del manto de encima y lo hace fundirse. Ese magma sube y construye el arco volcánico: la avenida de los volcanes.'})),
        h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{html:'<b>Los sismos.</b> Se producen tanto en el contacto entre placas, frente a la costa, como dentro de la placa que se hunde. Por eso son superficiales en el mar y cada vez más profundos hacia el oriente.'}))),
      h('div',{html: tieEcuadorSVG()}),
      nota('warn','Error frecuente:','“Los sismos ocurren solo en la costa”. Frente a la costa están los de mayor magnitud, porque ahí es donde se traban las dos placas. Pero también hay fallas activas dentro del continente, debajo de la Sierra y del valle interandino: son sismos más pequeños y mucho más superficiales, y un sismo superficial bajo una ciudad puede causar más daño que uno grande y lejano. La historia sísmica de Ibarra, Riobamba, Ambato y Quito lo demuestra.'),
      h('p',{class:'small muted'},'Corte esquemático, con la vertical exagerada para que se distingan las capas. Las profundidades son aproximadas.'));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Primero manipula: cambia el tipo de borde y observa'),
        h('p',{},'En los tres casos hay dos placas y movimiento. Lo que cambia es el sentido de ese movimiento, y de ahí sale todo lo demás: qué se construye, qué se destruye, dónde tiembla y si hay volcanes o no.')),
      h('div',{class:'viewer'}, stage, panel),
      ec, secNav());
  }

  /* =================================================================
     4 · SISMOS
     ================================================================= */
  function secSismos(){
    /* --- triangulación --- */
    const dist = e => Math.hypot(e.x-TIE_EPI.x, e.y-TIE_EPI.y) * 2;   /* 1 px del mapa = 2 km */
    const filas = h('div',{});
    const inputs = {};
    TIE_ESTACIONES.forEach(e => {
      const dk = dist(e), sp = dk/TIE_K;
      const inp = h('input',{type:'number',min:'0',max:'900',step:'5',value:St.radios[e.id],
        'aria-label':'Radio en kilómetros para la '+e.n, oninput:ev=>{ St.radios[e.id]=ev.target.value; dibujar(); }});
      inputs[e.id] = inp;
      filas.append(h('div',{class:'tie-est'},
        h('div',{}, h('b',{}, e.n), h('span',{class:'small muted',style:'display:block'},
          'Llegada de la onda P: '+tieDec(12.0,1)+' s · llegada de la onda S: '+tieDec(12.0+sp,1)+' s · diferencia S−P: '+tieDec(sp,1)+' s')),
        h('div',{class:'small muted',style:'text-align:right'},'radio (km)'), inp));
    });
    const mapaTri = h('div',{});
    function dibujar(){
      const circ = TIE_ESTACIONES.map(e => {
        const r = parseFloat(St.radios[e.id]);
        if (!isFinite(r) || r<=0) return '';
        const rp = r/2, real = dist(e), bien = Math.abs(r-real) <= 28;
        return `<circle cx="${e.x}" cy="${e.y}" r="${rp.toFixed(1)}" fill="none" stroke="${bien?'#4fd3a8':'#ff8f5a'}" stroke-width="2" stroke-dasharray="${bien?'':'6 5'}" opacity=".9"/>`;
      }).join('');
      const est = TIE_ESTACIONES.map(e => `<g><polygon points="${e.x},${e.y-8} ${e.x+8},${e.y+6} ${e.x-8},${e.y+6}" fill="#ffd34d" stroke="#101722" stroke-width="1.5"/>`
        + `<text x="${e.x}" y="${e.y+22}" font-size="11" fill="#ffd34d" text-anchor="middle">${esc(e.n.replace('Estación ',''))}</text></g>`).join('');
      const cands = TIE_CANDIDATOS.map(c => `<g><circle cx="${c.x}" cy="${c.y}" r="6" fill="${St.cand===c.id?(c.ok?'#4fd3a8':'#ff6a5a'):'#cfd8e4'}" stroke="#101722" stroke-width="1.5"/>`
        + `<text x="${c.x}" y="${c.y-12}" font-size="10" fill="#cfd8e4" text-anchor="middle">${esc(c.id.toUpperCase())}</text></g>`).join('');
      const tierras = TIE_TIERRAS.map(p => `<path d="${tiePath(p,true)}" fill="#5d6f85" stroke="#8ea2b8" stroke-width="0.7"/>`).join('');
      mapaTri.innerHTML = `<svg class="tie-mapa" viewBox="150 120 380 260" role="img" aria-label="Mapa del occidente de Sudamérica con tres estaciones sismológicas (triángulos) y cuatro lugares candidatos para el epicentro, marcados C1 a C4. Al escribir un radio en kilómetros se dibuja el círculo correspondiente alrededor de cada estación.">`
        + `<rect x="150" y="120" width="380" height="260" fill="#16233a"/>${tierras}${circ}${est}${cands}</svg>`;
    }
    dibujar();
    const triFb = h('div',{});
    const candBtns = h('div',{class:'tie-cands',role:'group','aria-label':'Lugares candidatos para el epicentro'});
    TIE_CANDIDATOS.forEach(c => candBtns.append(h('button',{class:'chip'+(St.cand===c.id?(c.ok?' ok':' bad'):''),'aria-pressed':String(St.cand===c.id),
      onclick:()=>{
        St.cand = c.id; dibujar();
        const listos = TIE_ESTACIONES.filter(e => Math.abs(parseFloat(St.radios[e.id]) - dist(e)) <= 28).length;
        triFb.innerHTML = '';
        if (c.ok && listos===3){
          St.triOK = true; St.marcas.triangula = true;
          triFb.append(nota('ok','¡Correcto!','Los tres círculos se cortan en un solo punto, y ese punto es el epicentro: mar afuera, frente a la costa de Manabí. Con dos estaciones habrías tenido dos puntos posibles; hace falta la tercera para decidir. Por eso se llama triangulación y por eso una red sismológica necesita muchas estaciones repartidas.'));
        } else if (c.ok){
          triFb.append(nota('warn','Vas bien, pero comprueba los radios:',`Acertaste el lugar, aunque ${3-listos} de los tres círculos todavía no tienen el radio correcto. Calcula cada radio como (t_S − t_P) × ${tieDec(TIE_K,1)} km/s y vuelve a escribirlo: el resultado debe cuadrar solo, sin adivinar.`));
        } else {
          const e = TIE_ESTACIONES[0];
          triFb.append(nota('warn','Todavía no:',`Ese punto no está a la distancia que marcan los tres círculos. Fíjate: el epicentro tiene que estar en el borde del círculo de cada estación, no dentro ni fuera. Si un lugar te queda dentro del círculo de ${e.n.replace('Estación ','')}, entonces está más cerca de lo que dice la diferencia S−P de esa estación y no puede ser.`));
          St.errs++;
        }
        Store.log('respuesta',{recurso:'cn-tierra', tarea:'triangulacion', opcion:c.id, correcto:c.ok});
        $$('button', candBtns).forEach((b,i) => { b.className = 'chip'+(St.cand===TIE_CANDIDATOS[i].id?(TIE_CANDIDATOS[i].ok?' ok':' bad'):''); b.setAttribute('aria-pressed', String(St.cand===TIE_CANDIDATOS[i].id)); });
      }}, c.id.toUpperCase()+' · '+c.n)));
    const btnPista = h('button',{class:'btn sm ghost',style:'align-self:flex-start', onclick:()=>{
      TIE_ESTACIONES.forEach(e => { St.radios[e.id] = String(Math.round(dist(e)/10)*10); inputs[e.id].value = St.radios[e.id]; });
      dibujar(); toast('Radios calculados. Ahora decide cuál de los cuatro lugares es el epicentro.');
    }},'Calcular los radios por mí (si ya practicaste el cálculo)');

    /* --- magnitud vs intensidad --- */
    const salida = h('div',{class:'stack'});
    const sldA = h('input',{type:'range',min:'3',max:'9',step:'0.1',value:String(St.mag[0]),'aria-label':'Magnitud del primer sismo', oninput:e=>{ St.mag[0]=parseFloat(e.target.value); calc(); }});
    const sldB = h('input',{type:'range',min:'3',max:'9',step:'0.1',value:String(St.mag[1]),'aria-label':'Magnitud del segundo sismo', oninput:e=>{ St.mag[1]=parseFloat(e.target.value); calc(); }});
    function calc(){
      const [a,b] = St.mag, d = Math.abs(b-a);
      const energia = Math.pow(10, 1.5*d), amplitud = Math.pow(10, d);
      salida.innerHTML = '';
      salida.append(
        h('div',{class:'readouts',style:'grid-template-columns:repeat(2,1fr)'},
          h('div',{class:'readout'}, h('div',{class:'v'}, tieDec(a,1)), h('div',{class:'l'},'Magnitud del sismo A')),
          h('div',{class:'readout'}, h('div',{class:'v'}, tieDec(b,1)), h('div',{class:'l'},'Magnitud del sismo B'))),
        h('dl',{class:'tie-kv'},
          h('dt',{},'Diferencia de magnitud'), h('dd',{}, tieDec(d,1)+' grados'),
          h('dt',{},'Cuánto más se mueve el suelo'), h('dd',{}, amplitud>=1000 ? tieMil(amplitud)+' veces' : tieDec(amplitud,1)+' veces'),
          h('dt',{},'Cuánta más energía se libera'), h('dd',{}, h('b',{}, energia>=1000 ? tieMil(energia)+' veces' : tieDec(energia,1)+' veces'))),
        d>=0.95 && d<=1.05 ? nota('ok','Ahí está la clave:','Un solo grado de magnitud más equivale a unas 32 veces más energía liberada (10 elevado a 1,5). Dos grados más son unas 1.000 veces más energía. Por eso un sismo de 7,8 no es “un poco más fuerte” que uno de 5,8: libera cerca de 1.000 veces más energía.') : null);
    }
    calc();

    const merc = h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Grado (Mercalli)'), h('th',{},'Qué se siente y qué se ve'))),
      h('tbody',{}, TIE_MERCALLI.map(([g,d]) => h('tr',{}, h('td',{}, h('b',{},g)), h('td',{}, d))))));

    const abc = h('div',{class:'tie-abc'},
      h('div',{}, h('h4',{},'🎒 Antes'), h('ul',{},
        ['Identifiquen con el docente las zonas seguras del aula: junto a columnas o muros estructurales, lejos de ventanas, de estanterías altas y de lámparas.',
         'Aseguren al muro los estantes, el televisor y todo lo que pueda caer encima de alguien.',
         'Acuerden un punto de encuentro fuera del edificio y otro fuera del barrio, y una persona de contacto en otra ciudad.',
         'Hagan simulacros de verdad, cronometrados, al menos dos veces al año, incluidos los que tienen dificultades de movilidad.',
         'Tengan una mochila de emergencia: agua, linterna, radio a pilas, botiquín, copia de documentos y medicinas de uso permanente.',
         'Si viven cerca del mar: aprendan la ruta de evacuación vertical u horizontal hacia terreno alto.'].map(x=>h('li',{},x)))),
      h('div',{}, h('h4',{},'🟠 Durante'), h('ul',{},
        ['Agáchate, cúbrete y agárrate: al piso, bajo una mesa firme protegiendo cabeza y cuello, y sujeta la mesa hasta que pare.',
         'No corras hacia la salida mientras tiembla. La mayoría de las lesiones ocurre al desplazarse entre objetos que caen.',
         'Si no hay mesa, junto a un muro interior, lejos de ventanas, protegiéndote la cabeza con los brazos o una mochila.',
         'Nunca uses el ascensor. Si estás en él, presiona todos los pisos y sal en el primero que abra.',
         'Si estás afuera, aléjate de fachadas, postes, cables y vidrios, y quédate en un espacio abierto.',
         'Si estás en la playa y el sismo es tan fuerte que cuesta mantenerse en pie o dura más de medio minuto, no esperes ninguna alerta: sube a terreno alto de inmediato.'].map(x=>h('li',{},x)))),
      h('div',{}, h('h4',{},'🟢 Después'), h('ul',{},
        ['Evacúa con calma por la ruta acordada cuando deje de temblar y llega al punto de encuentro; reporta quién falta.',
         'Cuenta con las réplicas: pueden ser fuertes y llegar horas o días después. Repite el procedimiento cada vez.',
         'No enciendas fósforos ni interruptores hasta verificar que no hay olor a gas; si lo hay, cierra la llave y ventila.',
         'No entres a edificios dañados ni por objetos personales, aunque parezcan en pie.',
         'Usa el celular solo para mensajes cortos: hay que dejar la red libre para la emergencia.',
         'Infórmate únicamente por fuentes oficiales, como el Instituto Geofísico de la Escuela Politécnica Nacional y el SNGRE (ECU 911). En las primeras horas circulan muchos rumores y ninguna predicción de sismos es confiable: la ciencia todavía no puede predecir el día ni la hora.'].map(x=>h('li',{},x)))));

    return h('div',{class:'stack'},
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Foco, hipocentro y epicentro'),
          h('div',{html: tieFocoSVG()}),
          h('p',{class:'small',html:'El <b>foco</b> (o <b>hipocentro</b>) es el punto en profundidad donde la roca finalmente se rompe y libera la energía acumulada. El <b>epicentro</b> es la proyección de ese punto en la superficie: está justo encima. Los noticieros dan el epicentro porque es lo que se puede ubicar en un mapa, pero la profundidad del foco importa tanto como la magnitud: a igual magnitud, un sismo superficial sacude mucho más que uno profundo.'})),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Dos ondas, dos rapideces'),
          h('p',{html:'Las ondas P viajan más rápido (unos '+tieDec(TIE_VP,1)+' km/s en la corteza) que las S (unos '+tieDec(TIE_VS,1)+' km/s). Salen juntas del foco, pero llegan separadas, y esa separación crece con la distancia. Si mides cuántos segundos pasan entre la llegada de la P y la de la S, sabes a qué distancia estás del epicentro:'}),
          h('p',{class:'mono',style:'font-size:.95rem;text-align:center'},'distancia (km) ≈ (t_S − t_P) × '+tieDec(TIE_K,1)+' km/s'),
          nota('info','Esto salva vidas:','Las alertas sísmicas tempranas se basan justamente en esa diferencia: detectan la onda P, que casi no hace daño, y avisan unos segundos antes de que llegue la S, que es la destructiva. No predicen el sismo; avisan que ya empezó.'))),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'🎯 Ubica el epicentro por triangulación'),
        h('p',{},'Tres estaciones registraron el mismo sismo. Cada una te da la diferencia entre la llegada de la onda S y la de la onda P. Calcula el radio de cada círculo, escríbelo y mira dónde se cortan los tres.'),
        filas, btnPista, mapaTri, candBtns, triFb,
        h('p',{class:'small muted'},'Ejercicio construido para el aula con datos ficticios y una escala de 2 km por píxel del mapa. Con un solo círculo el epicentro puede estar en cualquier punto de la circunferencia; con dos, en dos puntos; hacen falta tres.')),
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Magnitud: la energía liberada'),
          h('p',{class:'small muted'},'Es un solo número por sismo, no depende de dónde estés y la escala es logarítmica. Mueve los dos deslizadores y compara.'),
          h('div',{class:'tie-sld'}, h('label',{},'Sismo A'), sldA), h('div',{class:'tie-sld'}, h('label',{},'Sismo B'), sldB),
          salida,
          nota('warn','Error frecuente:','“La escala de magnitud es lineal”. No lo es: es logarítmica. Pasar de 6 a 7 no suma una unidad de sacudida, multiplica la energía por unas 32. Por eso casi todos los sismos que sentimos son pequeños y los grandes son raros: la energía crece muchísimo más rápido que el número.')),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Intensidad: los efectos en un lugar'),
          h('p',{class:'small',html:'La <b>intensidad</b> se mide con la escala de Mercalli modificada (I a XII) a partir de lo que la gente sintió y de los daños observados. Un mismo sismo tiene <b>una sola magnitud</b>, pero <b>muchas intensidades</b>: alta cerca del epicentro y baja lejos. Y no depende solo de la distancia: sobre suelo blando o relleno la sacudida se amplifica, y una construcción sin refuerzo sufre mucho más que una bien hecha.'}),
          merc,
          nota('ok','Cómo distinguirlas:','La magnitud la calcula un instrumento y sale del sismógrafo; la intensidad la levantan las personas, preguntando y mirando. Por eso la magnitud se publica en minutos y los mapas de intensidad, en días.'))),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Qué hacer antes, durante y después (criterio realista para un colegio)'), abc,
        nota('bad','Ojo con un mito peligroso:','El llamado “triángulo de la vida”, que circula por redes y recomienda ponerse junto a los muebles en lugar de debajo, no es la recomendación de los organismos de gestión de riesgos. En construcciones como las nuestras, lo recomendado sigue siendo agacharse, cubrirse y agarrarse. Verifica siempre con la fuente oficial antes de reenviar.')),
      secNav());
  }

  /* =================================================================
     5 · VOLCANES
     ================================================================= */
  function secVolcanes(){
    const fichaF = h('div',{class:'stack'});
    const chips = h('div',{class:'tie-chips',role:'group','aria-label':'Tipos de volcán'});
    const bf = {};
    function verForma(id){
      St.forma = id;
      Object.entries(bf).forEach(([k,b]) => b.setAttribute('aria-pressed', String(k===id)));
      const F = TIE_FORMAS.find(x=>x.id===id);
      fichaF.innerHTML='';
      fichaF.append(h('h3',{style:'margin:0'}, F.n),
        h('dl',{class:'tie-kv'},
          h('dt',{},'Forma'), h('dd',{}, F.forma),
          h('dt',{},'Tipo de magma'), h('dd',{}, F.magma),
          h('dt',{},'Sílice'), h('dd',{}, F.sil),
          h('dt',{},'Viscosidad'), h('dd',{}, F.visc),
          h('dt',{},'Gases'), h('dd',{}, F.gas),
          h('dt',{},'Cómo erupciona'), h('dd',{}, F.erup),
          h('dt',{},'Ejemplos'), h('dd',{}, F.ej)));
      St.marcas.volcan = true;
      Store.log('seleccion',{recurso:'cn-tierra', volcan:id});
    }
    TIE_FORMAS.forEach(F => { bf[F.id] = h('button',{'aria-pressed':'false','aria-label':F.n, onclick:()=>verForma(F.id)}, F.n, h('small',{},F.visc)); chips.append(bf[F.id]); });

    /* simulador de explosividad */
    const salidaV = h('div',{class:'stack'});
    const barra = h('div',{class:'tie-bar'}, h('i',{style:'left:0%'}));
    const sSil = h('input',{type:'range',min:'48',max:'74',step:'1',value:String(St.volSil),'aria-label':'Contenido de sílice del magma, en por ciento', oninput:e=>{ St.volSil=+e.target.value; calcV(); }});
    const sGas = h('input',{type:'range',min:'0.5',max:'6',step:'0.1',value:String(St.volGas),'aria-label':'Contenido de gases disueltos, en por ciento en masa', oninput:e=>{ St.volGas=+e.target.value; calcV(); }});
    function calcV(){
      const vis = (St.volSil-48)/26;                      /* 0 = muy fluido, 1 = muy viscoso */
      const gas = (St.volGas-0.5)/5.5;
      const x = clamp(0.62*vis + 0.38*gas, 0, 1);
      St.vol = x;
      $('i', barra).style.left = (x*100).toFixed(0)+'%';
      const tipo = x<0.33 ? 'efusiva' : x<0.66 ? 'intermedia' : 'explosiva';
      const txt = x<0.33
        ? 'Erupción EFUSIVA. El magma es tan fluido que los gases escapan solos, como en una gaseosa destapada despacio. Sale lava que corre por la ladera y construye un volcán ancho y bajo. Es peligrosa para lo que está en su camino, pero rara vez sorprende a la gente.'
        : x<0.66
        ? 'Erupción INTERMEDIA. A veces sale lava, a veces se tapona el conducto y estalla. Es el comportamiento típico de los estratovolcanes andinos: por eso están hechos de capas alternadas de lava y de material piroclástico.'
        : 'Erupción EXPLOSIVA. El magma es tan viscoso que los gases no pueden salir: quedan atrapados a presión hasta que revientan el tapón, como una gaseosa agitada que se destapa de golpe. Produce columnas eruptivas, caída de ceniza a gran distancia y flujos piroclásticos.';
      salidaV.innerHTML='';
      salidaV.append(
        h('div',{class:'readouts',style:'grid-template-columns:repeat(3,1fr)'},
          h('div',{class:'readout'}, h('div',{class:'v'}, tieDec(St.volSil,0), ' ', h('span',{class:'u'},'%')), h('div',{class:'l'},'Sílice (SiO₂)')),
          h('div',{class:'readout'}, h('div',{class:'v'}, tieDec(St.volGas,1), ' ', h('span',{class:'u'},'%')), h('div',{class:'l'},'Gases disueltos')),
          h('div',{class:'readout'}, h('div',{class:'v'}, tipo), h('div',{class:'l'},'Erupción esperada'))),
        h('p',{style:'font-size:.9rem'}, txt),
        h('p',{class:'small muted'},'Modelo simplificado de aula: la explosividad real depende también de cuánta agua entra en contacto con el magma, de la velocidad de ascenso y de la forma del conducto.'));
      St.marcas.volcan = true;
    }
    calcV();

    const tablaV = h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Volcán'), h('th',{},'Tipo'), h('th',{},'Altura aprox.'), h('th',{},'Magma'), h('th',{},'Dónde está'), h('th',{},'Peligro principal'))),
      h('tbody',{}, TIE_VOLCANES.map(v => h('tr',{}, h('td',{}, h('b',{},v.n)), h('td',{}, v.tipo), h('td',{class:'num'}, v.alt), h('td',{}, v.mag), h('td',{}, v.prov), h('td',{}, v.pel))))));
    const prod = h('div',{class:'tablewrap'}, h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Producto'), h('th',{},'Por qué es peligroso'))),
      h('tbody',{}, TIE_PRODUCTOS.map(([n,d]) => h('tr',{}, h('td',{}, h('b',{},n)), h('td',{}, d))))));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'La forma del volcán cuenta qué magma lo hizo'),
        h('div',{html: tiePerfilesSVG()}), chips, fichaF),
      h('div',{class:'grid g2'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'🎛️ ¿Efusiva o explosiva? Pruébalo'),
          h('p',{class:'small muted'},'Dos propiedades del magma deciden casi todo: cuánta sílice tiene (que lo vuelve viscoso) y cuánto gas lleva disuelto. Mueve los deslizadores y observa.'),
          h('div',{class:'tie-sld'}, h('label',{},'Contenido de sílice (%)'), sSil),
          h('div',{class:'tie-sld'}, h('label',{},'Gases disueltos (% en masa)'), sGas),
          h('div',{class:'row',style:'gap:8px;align-items:center'}, h('span',{class:'small muted'},'efusiva'), barra, h('span',{class:'small muted'},'explosiva')),
          salidaV),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Productos y peligros'), prod,
          nota('warn','Error frecuente:','“Un volcán apagado no vuelve a hacer erupción”. La palabra “apagado” no existe en vulcanología. Se habla de volcanes activos, potencialmente activos y extintos, y un volcán solo se considera extinto cuando lleva decenas de miles de años sin actividad Y no tiene ya una fuente de magma. Muchos volcanes descansan siglos entre erupciones: ese silencio no es garantía de nada, y a veces significa lo contrario, porque da tiempo a que se acumule más magma y más gas.'))),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'🇪🇨 Volcanes ecuatorianos reconocibles'), tablaV,
        nota('info','Fuente y estado actual:','Aquí solo constan el tipo, la ubicación y el tipo de peligro asociado, que son estables. El estado de actividad cambia de un mes a otro y no se puede aprender de memoria: consúltalo siempre en el Instituto Geofísico de la Escuela Politécnica Nacional (IG-EPN), que vigila los volcanes del país, y sigue las disposiciones del SNGRE.'),
        nota('ok','Por qué tenemos tantos:','Todos estos volcanes existen por la misma razón que viste en la sección 3: la placa de Nazca se hunde, libera agua, funde el manto y alimenta un arco volcánico. Los de Galápagos son la excepción: no vienen de una subducción, sino de un punto caliente, una columna de manto caliente que perfora la placa desde abajo mientras esta se desplaza; por eso las islas forman una fila y las más antiguas están al este.')),
      secNav());
  }

  /* =================================================================
     6 · CICLO DE LAS ROCAS
     ================================================================= */
  function secRocas(){
    const svgBox = h('div',{});
    function pintarCiclo(){
      const nodos = Object.entries(TIE_NODOS).map(([k,n]) => {
        const on = St.roca===k, vis = St.visit[k];
        const forma = n.tipo==='fundido'
          ? `<ellipse cx="${n.x}" cy="${n.y}" rx="86" ry="30" fill="${n.col}" stroke="${on?'#ffffff':'#101722'}" stroke-width="${on?4:1.5}" opacity="${vis?1:.55}"/>`
          : `<rect x="${n.x-86}" y="${n.y-28}" width="172" height="56" rx="12" fill="${n.col}" stroke="${on?'#ffffff':'#101722'}" stroke-width="${on?4:1.5}" opacity="${vis?1:.55}"/>`;
        return `<g class="nd${on?' on':''}">${forma}`
          + `<text x="${n.x}" y="${n.y+1}" font-size="13" font-weight="700" fill="#101722" text-anchor="middle" font-family="IBM Plex Sans,sans-serif">${esc(n.n)}</text>`
          + (on?`<text x="${n.x}" y="${n.y+19}" font-size="11" fill="#101722" text-anchor="middle" font-family="IBM Plex Sans,sans-serif">◀ tu roca está aquí ▶</text>`:'')
          + (vis&&!on?`<text x="${n.x}" y="${n.y+19}" font-size="10" fill="#101722" text-anchor="middle" font-family="IBM Plex Sans,sans-serif">visitado ✓</text>`:'')
          + `</g>`;
      }).join('');
      const fl = (a,b,lab) => {
        const A=TIE_NODOS[a], B=TIE_NODOS[b];
        const dx=B.x-A.x, dy=B.y-A.y, L=Math.hypot(dx,dy), ux=dx/L, uy=dy/L;
        const x1=A.x+ux*92, y1=A.y+uy*40, x2=B.x-ux*92, y2=B.y-uy*40;
        const mx=(x1+x2)/2, my=(y1+y2)/2;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#8ea2b8" stroke-width="2" opacity=".6"/>`
          + `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${(x2-ux*11-uy*6).toFixed(1)},${(y2-uy*11+ux*6).toFixed(1)} ${(x2-ux*11+uy*6).toFixed(1)},${(y2-uy*11-ux*6).toFixed(1)}" fill="#8ea2b8" opacity=".6"/>`
          + `<text x="${mx.toFixed(1)}" y="${(my-5).toFixed(1)}" font-size="10" fill="#9fb0bd" text-anchor="middle" font-family="IBM Plex Sans,sans-serif">${esc(lab)}</text>`;
      };
      const flechas = fl('magma','ignea','enfría') + fl('ignea','sedimentos','meteoriza')
        + fl('sedimentos','deposito','transporte') + fl('deposito','sedimentaria','compacta')
        + fl('sedimentaria','metamorfica','calor y presión') + fl('metamorfica','magma','funde');
      svgBox.innerHTML = `<svg class="tie-ciclo" viewBox="0 0 600 480" role="img" aria-label="Esquema del ciclo de las rocas. Tu roca está ahora en: ${esc(TIE_NODOS[St.roca].n)}. Los estados y los procesos disponibles están también como botones debajo del esquema.">`
        + `<rect width="600" height="480" fill="#16233a"/>${flechas}${nodos}`
        + `<text x="300" y="470" font-size="11" fill="#9fb0bd" text-anchor="middle" font-family="IBM Plex Sans,sans-serif">Hay más caminos posibles que los dibujados: por ejemplo, una roca ígnea también puede fundirse o metamorfizarse.</text></svg>`;
    }
    const fbBox = h('div',{});
    const rutaEl = h('div',{class:'tie-ruta'});
    const procBox = h('div',{class:'tie-proc',role:'group','aria-label':'Procesos geológicos disponibles'});
    function pintarRuta(){
      rutaEl.innerHTML='';
      St.ruta.forEach((k,i) => { if (i) rutaEl.append(h('span',{},'→')); rutaEl.append(h('b',{}, TIE_NODOS[k].n)); });
      const faltan = ['ignea','sedimentos','deposito','sedimentaria','metamorfica'].filter(k=>!St.visit[k]);
      rutaEl.append(h('span',{style:'width:100%'}, faltan.length ? 'Te faltan por visitar: '+faltan.map(k=>TIE_NODOS[k].n).join(', ')+'.' : '¡Ciclo completo recorrido!'));
    }
    function elegirProceso(P){
      const actual = St.roca;
      if (P.de.includes(actual)){
        St.roca = P.a; St.visit[P.a]=true; St.ruta.push(P.a);
        fbBox.innerHTML='';
        fbBox.append(nota('ok', P.n+'.', P.d+' Tu roca es ahora: '+TIE_NODOS[P.a].n.toLowerCase()+'. '+TIE_NODOS[P.a].d));
        const listo = ['ignea','sedimentos','deposito','sedimentaria','metamorfica'].every(k=>St.visit[k]);
        if (listo && !St.marcas.ciclo){
          St.marcas.ciclo = true;
          fbBox.append(nota('ok','🎉 Ciclo completo.',`Recorriste el ciclo entero con ${St.rocaErr} error${St.rocaErr===1?'':'es'}. Fíjate en lo importante: no hay un principio ni un final, y una misma roca puede dar varias vueltas. Los átomos que hoy forman el granito de una cordillera estuvieron antes en el fondo de un mar y volverán a estarlo.`));
          Store.log('logro',{recurso:'cn-tierra', tarea:'ciclo-rocas', errores:St.rocaErr});
        }
      } else {
        St.rocaErr++; St.errs++;
        const k = actual+':'+P.id;
        fbBox.innerHTML='';
        fbBox.append(nota('warn','Ese proceso no se aplica aquí.', TIE_CICLO_FB[k] || `Desde ${TIE_NODOS[actual].n.toLowerCase()} ese proceso no lleva a ninguna parte. Fíjate en el estado actual de tu roca y pregúntate qué le tiene que pasar primero.`));
        Store.log('respuesta',{recurso:'cn-tierra', tarea:'ciclo-rocas', desde:actual, proceso:P.id, correcto:false});
      }
      pintarCiclo(); pintarRuta();
    }
    TIE_PROCESOS.forEach(P => procBox.append(h('button',{'aria-label':'Aplicar el proceso: '+P.n, onclick:()=>elegirProceso(P)}, P.n, h('small',{}, P.d))));
    pintarCiclo(); pintarRuta();

    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'🪨 Mueve la roca por el ciclo'),
        h('p',{},'Tu roca empieza como magma. En cada paso elige el proceso que de verdad corresponde a su estado actual: si te equivocas, no avanza y te explico por qué. La meta es visitar los cinco estados del ciclo.'),
        h('div',{class:'grid g2'}, svgBox,
          h('div',{class:'stack'},
            h('div',{class:'card',style:'padding:10px'}, h('span',{class:'eyebrow eco'},'Tu recorrido'), rutaEl),
            h('span',{class:'eyebrow eco'},'¿Qué le hacemos ahora?'), procBox, fbBox,
            h('div',{class:'row'},
              h('button',{class:'btn sm ghost', onclick:()=>{ St.roca='magma'; St.ruta=['magma']; St.visit={magma:true}; fbBox.innerHTML=''; pintarCiclo(); pintarRuta(); }},'Empezar de nuevo'))))),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Lo que el ciclo explica'),
        h('div',{class:'grid g3'},
          h('div',{}, h('b',{},'Por qué hay fósiles solo en unas rocas.'), h('p',{class:'small'},'Un fósil necesita que el resto quede enterrado suavemente entre capas. El calor y la presión del metamorfismo los destruyen, y la fusión, más todavía. Por eso los fósiles aparecen casi siempre en rocas sedimentarias.')),
          h('div',{}, h('b',{},'Por qué el tamaño del cristal delata el enfriamiento.'), h('p',{class:'small'},'Si el magma enfría lento y profundo, los cristales crecen grandes y visibles (granito). Si la lava enfría rápido en la superficie, no hay tiempo: cristales diminutos o vidrio (basalto, obsidiana).')),
          h('div',{}, h('b',{},'Por qué el ciclo conecta con las placas.'), h('p',{class:'small'},'Las dorsales fabrican roca ígnea; las fosas hunden roca y la funden; las cordilleras levantan y exponen rocas a la meteorización. El ciclo de las rocas es el ciclo de las placas visto desde la materia.'))),
        nota('info','Escalas de tiempo:','Una vuelta completa al ciclo puede tomar cientos de millones de años. La meteorización de una lápida, en cambio, se nota en décadas. Trabajar con tiempo geológico exige cambiar de escala mental: el planeta hace despacio lo que nosotros no alcanzamos a ver.')),
      secNav());
  }

  /* =================================================================
     7 · OCÉANOS Y CLIMA
     ================================================================= */
  function secOceano(){
    const S = tieSerie();
    const flechas = TIE_CORRIENTES.map((c,i) => {
      const on = St.corr===i;
      const col = c.t==='prof' ? '#9b7ce0' : (c.frio ? '#5fd3e0' : '#ff8f5a');
      const p = tiePath(c.pts);
      const n = c.pts.length, a = c.pts[n-2], b = c.pts[n-1];
      const x1=tieX(a[0]), y1=tieY(a[1]), x2=tieX(b[0]), y2=tieY(b[1]);
      const L=Math.hypot(x2-x1,y2-y1)||1, ux=(x2-x1)/L, uy=(y2-y1)/L;
      return `<path d="${p}" fill="none" stroke="${col}" stroke-width="${on?5:2.6}" stroke-linecap="round" stroke-dasharray="${c.t==='prof'?'9 6':''}" opacity="${on||St.corr===null?1:.4}"/>`
        + `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${(x2-ux*13-uy*7).toFixed(1)},${(y2-uy*13+ux*7).toFixed(1)} ${(x2-ux*13+uy*7).toFixed(1)},${(y2-uy*13-ux*7).toFixed(1)}" fill="${col}" opacity="${on||St.corr===null?1:.4}"/>`;
    }).join('');
    const mapa = h('div',{html: tieMapaSVG('nada', flechas)});
    const chipsC = h('div',{class:'tie-chips',role:'group','aria-label':'Corrientes oceánicas'});
    const fichaC = h('div',{});
    function verCorr(i){
      St.corr = i;
      $$('button', chipsC).forEach((b,j) => b.setAttribute('aria-pressed', String(j===i)));
      const c = TIE_CORRIENTES[i];
      const fl2 = TIE_CORRIENTES.map((cc,k) => {
        const on = k===i, col = cc.t==='prof' ? '#9b7ce0' : (cc.frio ? '#5fd3e0' : '#ff8f5a');
        return `<path d="${tiePath(cc.pts)}" fill="none" stroke="${col}" stroke-width="${on?5:2.2}" stroke-linecap="round" stroke-dasharray="${cc.t==='prof'?'9 6':''}" opacity="${on?1:.3}"/>`;
      }).join('');
      mapa.innerHTML = tieMapaSVG('nada', fl2);
      fichaC.innerHTML = '';
      fichaC.append(h('h4',{style:'margin:0'}, c.n), h('p',{style:'font-size:.9rem'}, c.d));
    }
    TIE_CORRIENTES.forEach((c,i) => chipsC.append(h('button',{'aria-pressed':String(St.corr===i),'aria-label':c.n, onclick:()=>verCorr(i)}, c.n)));
    verCorr(St.corr);

    /* serie: variabilidad y tendencia */
    const cv = h('canvas',{class:'chart',style:'height:280px'});
    const segS = h('div',{class:'tie-seg',role:'group','aria-label':'Qué componente de la serie se muestra'});
    [['suma','Dato observado (suma)'],['tend','Solo la tendencia'],['var','Solo la variabilidad']].forEach(([k,n]) =>
      segS.append(h('button',{'aria-pressed':String(St.serieModo===k), onclick:()=>{ St.serieModo=k; $$('button',segS).forEach((b,i)=>b.setAttribute('aria-pressed', String(['suma','tend','var'][i]===k))); pintarSerie(); }}, n)));
    const anios = S.map(p=>p.x);
    const selA = h('select',{'aria-label':'Año inicial del tramo', onchange:e=>{ St.yA=+e.target.value; pintarSerie(); }});
    const selB = h('select',{'aria-label':'Año final del tramo', onchange:e=>{ St.yB=+e.target.value; pintarSerie(); }});
    anios.forEach(y => { selA.append(h('option',{value:String(y), selected: y===St.yA || null}, String(y))); selB.append(h('option',{value:String(y), selected: y===St.yB || null}, String(y))); });
    const tramoFb = h('div',{});
    function pintarSerie(){
      const pts = S.map(p => ({ x:p.x, y: St.serieModo==='tend' ? p.tend : St.serieModo==='var' ? p.var : p.y }));
      const series = [{ label: St.serieModo==='var' ? 'variabilidad' : St.serieModo==='tend' ? 'tendencia' : 'anomalía', color: cssVar('--accent'), pts, dots: St.serieModo!=='tend' }];
      if (St.serieModo==='suma') series.push({ label:'tendencia', color: cssVar('--warn'), pts: S.map(p=>({x:p.x,y:p.tend})) });
      const a = S.find(p=>p.x===St.yA), b = S.find(p=>p.x===St.yB);
      if (a && b && St.yB!==St.yA && St.serieModo==='suma') series.push({ label:'tu tramo', color: cssVar('--bad'), pts:[{x:a.x,y:a.y},{x:b.x,y:b.y}] });
      setTimeout(()=>{ lineChart(cv, { series, xmin:1982, xmax:2024, ymin:St.serieModo==='var'?-0.25:-0.1, ymax:St.serieModo==='var'?0.25:1.1, xticks:6,
        xlabel:'año', ylabel:'anomalía (°C)', xfmt:v=>String(Math.round(v)), yfmt:v=>tieDec(v,2) }); }, 30);
      tramoFb.innerHTML='';
      if (a && b && St.yB>St.yA){
        const pend = (b.y-a.y)/(St.yB-St.yA)*10, larga = TIE_PEND*10;
        tramoFb.append(h('dl',{class:'tie-kv'},
          h('dt',{},'Tendencia de tu tramo'), h('dd',{}, tieDec(pend,2)+' °C por década'),
          h('dt',{},'Tendencia de toda la serie'), h('dd',{}, tieDec(larga,2)+' °C por década')));
        if (pend < larga*0.4){
          St.marcas.cherry = true;
          tramoFb.append(nota('bad','Eso es escoger los datos a conveniencia.',`Empezaste en un año de El Niño fuerte y terminaste en uno de La Niña: el tramo da ${tieDec(pend,2)} °C por década, mucho menos que la tendencia real de la serie completa. Con solo dos puntos bien elegidos se puede "demostrar" casi cualquier cosa. Por eso en clima se usan periodos largos, de 30 años, y no dos fechas sueltas.`));
        } else if (pend > larga*1.8){
          St.marcas.cherry = true;
          tramoFb.append(nota('warn','Exageraste en el otro sentido.',`Empezaste en un año frío de La Niña y terminaste en uno de El Niño: tu tramo da ${tieDec(pend,2)} °C por década, bastante más que la tendencia real. El error es el mismo que en el caso anterior, solo que a favor de la alarma. La honestidad con los datos vale en las dos direcciones.`));
        } else {
          tramoFb.append(nota('ok','Tramo razonable.','Tu tramo se parece a la tendencia de toda la serie. Fíjate en lo que hiciste: elegiste un intervalo suficientemente largo, o dos años en fases parecidas de El Niño. Eso es lo que hace que una tendencia sea creíble.'));
        }
      } else tramoFb.append(h('p',{class:'small muted'},'Elige un año inicial y uno final para medir la "tendencia" de ese tramo.'));
    }
    pintarSerie();

    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'🌊 Corrientes: el océano reparte el calor del planeta'),
        h('p',{},'Los vientos empujan las corrientes superficiales; las diferencias de temperatura y de salinidad mueven las profundas. Juntas forman un circuito que lleva calor del ecuador hacia los polos y devuelve agua fría por el fondo. Elige una corriente para ver su recorrido.'),
        chipsC, mapa, fichaC,
        h('div',{class:'tie-leg'},
          h('span',{}, h('i',{style:'border-top-color:#ff8f5a;border-top-style:solid'}),'Corriente cálida'),
          h('span',{}, h('i',{style:'border-top-color:#5fd3e0;border-top-style:solid'}),'Corriente fría'),
          h('span',{}, h('i',{style:'border-top-color:#9b7ce0;border-top-style:dashed'}),'Circulación profunda'))),
      h('div',{class:'grid g3'},
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'🔥 Reservorio de calor'),
          h('p',{class:'small',html:'El agua necesita muchísima energía para subir un grado: su capacidad calorífica es enorme comparada con la del aire. Por eso el océano ha absorbido <b>más del 90 %</b> del calor adicional retenido por el sistema climático en las últimas décadas (valor aproximado, según los balances energéticos publicados). Esa es la razón de que la atmósfera se haya calentado “solo” alrededor de un grado: el mar se ha llevado casi todo. También significa que ese calor no desaparece, y que el océano seguirá liberándolo durante siglos.'})),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'💨 Reservorio de carbono'),
          h('p',{class:'small',html:'El CO₂ se disuelve en el agua fría. El océano absorbe aproximadamente <b>una cuarta parte</b> del CO₂ que emitimos cada año (valor aproximado). Sin ese servicio gratuito, el calentamiento sería mucho mayor. El fitoplancton, además, fija carbono con la fotosíntesis y parte de ese carbono cae al fondo: es la llamada bomba biológica.'})),
        h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'🧪 Acidificación'),
          h('p',{class:'small',html:'Ese servicio tiene un costo. El CO₂ disuelto forma ácido carbónico y libera iones H⁺: el pH medio de la superficie del océano ha bajado alrededor de <b>0,1 unidades</b> desde la época preindustrial. Como la escala de pH también es logarítmica, eso equivale a cerca de un <b>30 % más</b> de iones H⁺. El agua más ácida dificulta que corales, moluscos y ciertos tipos de plancton construyan su concha de carbonato de calcio: afecta directamente a la pesca y al turismo.'}))),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'📈 Variabilidad o tendencia: aprende a distinguirlas'),
        h('p',{html:'En una misma serie conviven dos cosas distintas. La <b>variabilidad</b> son oscilaciones que suben y bajan sin dirección fija: El Niño y La Niña son el ejemplo clásico, con ciclos de unos 2 a 7 años. La <b>tendencia</b> es el cambio sostenido en una dirección a lo largo de décadas. Confundirlas es el error más común en los debates sobre clima.'}),
        segS, h('div',{style:'position:relative'}, cv),
        h('div',{class:'row',style:'gap:10px;align-items:flex-end;flex-wrap:wrap'},
          h('div',{class:'field'}, h('label',{},'Año inicial'), selA),
          h('div',{class:'field'}, h('label',{},'Año final'), selB),
          h('span',{class:'small muted',style:'max-width:360px'},'Prueba el tramo 1998–2012 y observa qué pasa. Después prueba 1985–2020.')),
        tramoFb,
        nota('warn','Aviso honesto sobre estos datos:','Esta serie es una construcción de demostración: se suma una tendencia lineal (de unos 0,19 °C por década, del orden de la observada realmente) y un componente de variabilidad inspirado en los años conocidos de El Niño y La Niña. No son mediciones. Sirve para entrenar la lectura; para datos reales del Ecuador consulta al INAMHI y, para los globales, a los informes del IPCC.'),
        nota('info','El Niño en el Ecuador:','Durante El Niño se debilitan los vientos alisios, el agua cálida se acumula frente a nuestra costa y se hunde la termoclina: eso frena el afloramiento de la Corriente de Humboldt. Resultado: menos nutrientes, menos pesca, mar más caliente y lluvias mucho más intensas en la costa, con inundaciones y deslizamientos. Con La Niña ocurre lo contrario. Ninguno de los dos es cambio climático: son la variabilidad. El cambio climático es la tendencia sobre la que ahora ocurren.')),
      secNav());
  }

  /* =================================================================
     8 · DECISIÓN DEL CANTÓN (APV)
     ================================================================= */
  function secDecision(){
    const CAT = { mitiga:'Mitigación', adapta:'Adaptación', ambas:'Las dos cosas' };
    const clasBox = h('div',{class:'stack'});
    const fbClas = h('div',{});
    function pintarClas(){
      clasBox.innerHTML='';
      TIE_MEDIDAS.forEach(M => {
        const seg = h('div',{class:'tie-seg',role:'group','aria-label':'Clasificar: '+M.n});
        Object.entries(CAT).forEach(([k,n]) => seg.append(h('button',{'aria-pressed':String(St.clas[M.id]===k),
          onclick:()=>{
            St.clas[M.id] = k;
            fbClas.innerHTML = '';
            if (k===M.cat) fbClas.append(nota('ok','Correcto · '+M.n+'.', M.fb));
            else { St.errs++;
              const porQue = M.cat==='mitiga'
                ? 'Esta medida actúa sobre la CAUSA: reduce las emisiones de gases de efecto invernadero. Eso es mitigación. La adaptación, en cambio, no toca la causa: reduce el daño que el cambio ya provoca.'
                : M.cat==='adapta'
                ? 'Esta medida no reduce ni un gramo de emisiones: la amenaza va a llegar igual. Lo que hace es reducir el daño cuando llegue. Eso es adaptación.'
                : 'Ojo: esta medida hace las dos cosas a la vez, y por eso es especialmente valiosa cuando el presupuesto es corto.';
              fbClas.append(nota('warn','Todavía no · '+M.n+'.', porQue+' '+M.fb));
            }
            Store.log('respuesta',{recurso:'cn-tierra', tarea:'mitiga-adapta', medida:M.id, correcto:k===M.cat});
            pintarClas();
          }}, n)));
        clasBox.append(h('div',{style:'border-bottom:1px dashed var(--line);padding:9px 0'},
          h('div',{}, h('b',{}, M.n), h('span',{class:'small muted',style:'display:block'}, M.d)),
          h('div',{style:'margin-top:6px'}, seg)));
      });
    }
    pintarClas();
    const aciertos = () => TIE_MEDIDAS.filter(M => St.clas[M.id]===M.cat).length;

    /* matriz */
    const filas = TIE_MEDIDAS.map(M => {
      const tot = M.imp + M.eq + M.cos + M.fac;
      const chk = h('input',{type:'checkbox','aria-label':'Priorizar: '+M.n, checked: St.prio.includes(M.id) || null,
        onchange:e=>{
          if (e.target.checked){ if (St.prio.length>=2){ e.target.checked=false; return toast('Solo puedes priorizar dos medidas: el presupuesto no da para más.'); } St.prio.push(M.id); }
          else St.prio = St.prio.filter(x=>x!==M.id);
          Store.log('decision',{recurso:'cn-tierra', prioridades:St.prio.slice()});
        }});
      return h('tr',{}, h('td',{}, chk), h('td',{}, h('b',{},M.n)),
        h('td',{}, St.clas[M.id] ? CAT[M.cat] : h('span',{class:'muted'},'—')),
        h('td',{class:'num'},String(M.imp)), h('td',{class:'num'},String(M.eq)), h('td',{class:'num'},String(M.cos)), h('td',{class:'num'},String(M.fac)),
        h('td',{class:'num'}, h('b',{}, String(tot))));
    });
    const matriz = h('div',{class:'tablewrap'}, h('table',{class:'data tie-mat'},
      h('thead',{}, h('tr',{}, h('th',{},'Priorizar'), h('th',{},'Medida'), h('th',{},'Tipo'), h('th',{},'Impacto'), h('th',{},'Equidad'), h('th',{},'Costo'), h('th',{},'Factibilidad'), h('th',{},'Total'))),
      h('tbody',{}, filas)));

    const ta = h('textarea',{placeholder:'Priorizamos estas dos medidas porque… En impacto y equidad se comparan así… La compensación que aceptamos es… El indicador con el que sabremos si funcionó es…',
      'aria-label':'Justificación de la decisión del cantón', style:'min-height:130px'});
    const guardado = h('div',{});
    const btnGuardar = h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{
      if (St.prio.length !== 2) return toast('Marca exactamente dos medidas en la matriz antes de guardar.');
      if (ta.value.trim().length < 100) return toast('Desarrolla tu conclusión: cita las dos medidas, al menos un criterio de la matriz y el indicador que usarías.');
      const ns = St.prio.map(id => TIE_MEDIDAS.find(M=>M.id===id).n);
      Store.addNote('conclusion',
        `Tierra dinámica · cantón de Puerto Sereno · medidas priorizadas: ${ns.join(' + ')}. Clasificación mitigación/adaptación acertada en ${aciertos()} de ${TIE_MEDIDAS.length}. ${ta.value.trim()}`,
        { recurso:'cn-tierra', medidas:St.prio.slice() });
      St.marcas.decision = true; St.notaOK = true;
      guardado.innerHTML='';
      guardado.append(nota('ok','Guardado en tu cuaderno.','Tu docente podrá revisarlo. Recuerda que una recomendación es revisable: si el indicador no mejora en el plazo previsto, hay que cambiarla, no defenderla.'));
      toast('Conclusión guardada en tu cuaderno.');
      Store.log('respuesta_abierta',{recurso:'cn-tierra', longitud:ta.value.length, medidas:St.prio.slice()});
    }},'Guardar mi conclusión en el cuaderno');
    if (St.notaOK) guardado.append(nota('ok','Conclusión guardada.','Puedes editarla y volver a guardarla si cambias de opinión.'));

    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'🏛️ El caso · cantón de Puerto Sereno (ficticio)'),
        h('p',{html:'Puerto Sereno tiene unos 48.000 habitantes. Está sobre la costa, al pie de una ladera volcánica, y lo cruza una quebrada por la que baja el agua de las lluvias. Su economía vive de la pesca artesanal y del turismo. En el consejo cantonal hay presupuesto para <b>dos</b> medidas este año, y todas las propuestas tienen partidarios. Tu tarea: clasificar, valorar y decidir.'}),
        nota('info','Las dos familias de respuesta:','<b>Mitigación</b> es actuar sobre la causa: reducir las emisiones de gases de efecto invernadero o aumentar su captura. <b>Adaptación</b> es actuar sobre las consecuencias: reducir el daño que el cambio y las amenazas naturales provocan. Un cantón pequeño casi no mueve la aguja global con su mitigación, pero sí decide cuánta gente sale ilesa de la próxima emergencia.')),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Paso 1 · ¿Mitigación o adaptación?'), clasBox, fbClas,
        h('p',{class:'small muted'},'Aciertos: '+aciertos()+' de '+TIE_MEDIDAS.length+'.')),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Paso 2 · Matriz de decisión'),
        h('p',{class:'small muted'},'Cada criterio se valora de 1 a 5. Atención: en la columna “Costo”, 5 significa barato. La suma es orientativa, no una sentencia: dos medidas con el mismo total pueden ser muy distintas. La columna “Tipo” se completa a medida que clasificas cada medida en el paso 1.'),
        h('div',{class:'tablewrap'}, h('table',{class:'data'},
          h('thead',{}, h('tr',{}, h('th',{},'Criterio'), h('th',{},'Qué pregunta responde'))),
          h('tbody',{}, TIE_CRIT.map(([k,n,d]) => h('tr',{}, h('td',{}, h('b',{},n)), h('td',{}, d)))))),
        matriz,
        nota('warn','Las compensaciones son el corazón del problema:','La reubicación de la quebrada es la que más daño evita y, a la vez, la peor puntuada en equidad y costo: si las familias pierden su trabajo o quedan lejos de la escuela, terminan volviendo y el dinero se pierde. La ordenanza cuesta casi nada, pero no sirve si no se hace cumplir. El alumbrado eficiente casi no reduce el riesgo local, aunque sí las emisiones. No existe la opción sin costo: elegir es aceptar una pérdida a cambio de otra ganancia.'),
        nota('info','Equidad, en concreto:','Pregúntate siempre quién gana y quién pierde con cada medida. Una obra que protege el malecón turístico y no toca el barrio de la quebrada reduce el daño total en dólares, pero concentra el riesgo en quienes ya tenían menos. El promedio puede mejorar mientras el más vulnerable empeora.')),
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Paso 3 · Decide y justifica'),
        h('p',{class:'small muted'},'Marca dos medidas en la matriz y explica tu decisión: qué criterio pesó más, qué compensación aceptas y con qué indicador medible sabrías, dentro de dos años, si funcionó.'),
        h('div',{class:'field'}, h('label',{},'Tu conclusión (mínimo 100 caracteres)'), ta), btnGuardar, guardado),
      secNav());
  }

  /* =================================================================
     9 · RETO FINAL
     ================================================================= */
  const PREGUNTAS = [
    { q:'Un compañero afirma: “las placas tectónicas son los pedazos en que está rota la corteza”. ¿Qué corriges?',
      ops:['Nada: placa y corteza son sinónimos',
           'Que las placas son trozos de litosfera, es decir, toda la corteza MÁS la parte rígida del manto superior, hasta unos 100 km',
           'Que las placas son trozos del manto y la corteza flota encima sin formar parte de ellas'],
      ok:1,
      fb:'Exacto. La corteza oceánica tiene de 5 a 10 km y la continental de 30 a 70 km, pero la placa llega hasta unos 100 km: incluye manto rígido. Lo que hace que se comporte como una placa no es la composición (corteza o manto), sino el comportamiento mecánico: rígido arriba, dúctil debajo, en la astenosfera.',
      wrong:['Si fueran sinónimos, la placa oceánica tendría solo unos 7 km de espesor y no podría hundirse como un bloque en la fosa. Revisa la casilla “Marcar la litosfera” de la sección 1.',
             'La corteza sí forma parte de la placa: va montada sobre el manto rígido y se mueve con él, como la capa de crema sobre un pedazo de torta.'] },
    { q:'“El magma de los volcanes ecuatorianos sube desde el núcleo.” ¿Qué falla en esa explicación?',
      ops:['Nada: el núcleo externo es líquido, así que de ahí sale el magma',
           'Que el núcleo externo es hierro y níquel fundidos a casi 3.000 km de profundidad; el magma de nuestros volcanes se genera en el manto superior y en la base de la corteza, entre unos 60 y 200 km, cuando el agua que arrastra la placa de Nazca hace fundir el manto',
           'Que el núcleo es sólido y por eso no puede aportar magma'],
      ok:1,
      fb:'Así es. Que algo esté fundido no lo convierte en magma: el núcleo externo es metal líquido, no roca fundida, y además no tiene manera de atravesar 2.900 km de manto sólido. El magma andino nace mucho más arriba, y su origen está en el agua que la subducción mete en el manto.',
      wrong:['El núcleo externo sí es líquido, pero eso no basta: es metal, no roca, y está separado de la superficie por casi 2.900 km de manto sólido. El origen del magma es local, no central.',
             'El núcleo externo es líquido (esa es justamente la prueba de la sombra de las ondas S). El problema no es su estado, sino su composición y su distancia.'] },
    { q:'Después de un sismo, alguien dice en el barrio: “aquí en la Sierra estamos tranquilos, los sismos son cosa de la costa”. ¿Qué respondes?',
      ops:['Tiene razón: la zona de subducción está frente a la costa, así que el riesgo sísmico serio es solo costero',
           'Que los sismos de mayor magnitud se originan en la subducción frente a la costa, pero además hay fallas activas dentro del continente, bajo la Sierra; sus sismos son menores en magnitud y mucho más superficiales, y por eso pueden causar más daño local',
           'Que en la Sierra no hay sismos, pero sí volcanes, y eso es un riesgo distinto'],
      ok:1,
      fb:'Correcto. La profundidad importa tanto como la magnitud: a igualdad de magnitud, un foco superficial bajo una ciudad sacude mucho más que uno profundo y lejano. El valle interandino tiene fallas activas y una larga historia de sismos destructivos. Ibarra, Riobamba, Ambato y Quito lo saben.',
      wrong:['La subducción explica los sismos más grandes, pero no todos. Mira la sección 3: hay sismos superficiales dentro de la placa continental, en fallas del propio valle interandino.',
             'En la Sierra sí hay sismos, y además no son independientes del vulcanismo: ambos vienen del mismo proceso de subducción.'] },
    { q:'Un volcán no ha hecho erupción en los últimos 400 años. ¿Qué se puede concluir?',
      ops:['Que está apagado y ya no representa peligro',
           'Nada tranquilizador por sí solo: muchos volcanes descansan siglos entre erupciones. Solo se considera extinto si lleva decenas de miles de años inactivo y ya no tiene fuente de magma; un reposo largo incluso puede significar que se acumuló más magma y más gas',
           'Que su próxima erupción será pequeña, porque la presión se liberó lentamente'],
      ok:1,
      fb:'Eso es. En vulcanología no existe la categoría “apagado”. Se habla de activo, potencialmente activo y extinto, y la decisión se toma con la historia eruptiva completa, no con la memoria de una generación. Cuatrocientos años es un instante en la vida de un volcán.',
      wrong:['“Apagado” no es una categoría científica. Varios volcanes del mundo han hecho erupción después de siglos de silencio, y algunos de los desastres volcánicos más graves ocurrieron en volcanes que la gente creía inofensivos.',
             'Es al revés: si el conducto está taponado, el gas se acumula sin poder escapar. Un reposo largo con magma viscoso es la receta de una erupción explosiva, no de una suave.'] },
    { q:'Un titular dice: “el sismo de magnitud 7 fue apenas un grado más fuerte que el de magnitud 6”. ¿Por qué es engañoso?',
      ops:['Porque la magnitud no mide fuerza sino daños, y los daños dependen del lugar',
           'Porque la escala es logarítmica: un grado más significa unas 10 veces más movimiento del suelo y unas 32 veces más energía liberada. Decir “apenas un grado” hace pensar en una escala lineal que no existe',
           'Porque la magnitud de 7 se mide con otro instrumento distinto al de la magnitud 6'],
      ok:1,
      fb:'Correcto. Cada grado multiplica la amplitud registrada por 10 y la energía por unas 32. De 6 a 8 hay unas 1.000 veces más energía. El titular usa la palabra “apenas” con un número que no admite esa palabra. Y ojo: lo que la gente sufre en su casa no es la magnitud, sino la intensidad, que además depende del suelo, de la distancia y de cómo está construido el edificio.',
      wrong:['La magnitud sí mide la energía liberada en el foco, y es un solo número por sismo. Lo que mide efectos y varía de un lugar a otro es la intensidad, en la escala de Mercalli. Son dos cosas distintas y las dos son necesarias.',
             'Se usan los mismos instrumentos: sismógrafos. Lo que cambia no es el aparato, es la escala, que es logarítmica.'] }
  ];
  function secReto(){
    const marcas = [
      ['capas','Exploraste las capas de la Tierra en el modelo'],
      ['bordes','Comparaste los tres tipos de borde'],
      ['triangula','Ubicaste el epicentro por triangulación'],
      ['volcan','Relacionaste viscosidad y gases con el tipo de erupción'],
      ['ciclo','Recorriste el ciclo de las rocas completo'],
      ['cherry','Comprobaste cómo un tramo mal elegido falsea una tendencia'],
      ['decision','Guardaste tu decisión razonada para el cantón']
    ];
    const lista = h('ul',{class:'checks plain'});
    marcas.forEach(([k,t]) => lista.append(h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), h('span',{}, (St.marcas[k]?'✓ ':'· ')+t))));
    const wrap = h('div',{class:'card stack'});
    let ok = 0, intentos = 0;
    wrap.append(h('span',{class:'eyebrow eco'},'🎯 Reto final · los cinco errores que se repiten todos los años'),
      h('p',{class:'small muted'},'Cada pregunta desmonta una idea muy extendida. Si te equivocas, la retroalimentación te dice exactamente dónde volver a mirar.'));
    PREGUNTAS.forEach(p => wrap.append(quizBlock(p, (att) => {
      ok++; intentos += att;
      if (ok === PREGUNTAS.length){
        const hechas = marcas.filter(([k]) => St.marcas[k]).length;
        const min = Math.round((Date.now()-St.start)/60000);
        Store.completeActivity('cn-tierra', { score:`${PREGUNTAS.length}/${PREGUNTAS.length}`, attempts: St.errs + (intentos - PREGUNTAS.length), duracionMin:min, tareas:`${hechas}/${marcas.length}` });
        retoSt.className = 'notice ok';
        retoSt.innerHTML = `<span><b>¡Reto resuelto!</b> Cinco de cinco, con ${hechas} de ${marcas.length} tareas del recorrido completadas.</span>`;
        wrap.append(nota('ok','Actividad completada y registrada en tu progreso.','Ya puedes explicar por qué el Ecuador tiene cordillera, volcanes y sismos con una sola causa, y distinguir en una serie de datos lo que oscila de lo que cambia. Eso es exactamente lo que pide la unidad.'));
        toast('Actividad completada: Tierra dinámica ✓');
      }
    })));
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Lo que hiciste hasta aquí'), lista,
        h('p',{class:'small muted'},'Puedes responder el reto aunque falte alguna casilla, pero cada tarea del recorrido te da el argumento con el que se responde.')),
      wrap,
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Para llevar al cuaderno'),
        h('p',{html:'Todo lo de esta unidad cuelga de una sola idea: <b>el interior caliente del planeta mueve las placas, y ese movimiento explica las montañas, los sismos, los volcanes y el reciclaje de las rocas</b>. El océano, por su parte, amortigua el calor y el carbono que le echamos, y lo hace tan bien que nos confunde: por eso hay que aprender a leer series largas y no dos fechas sueltas.'}),
        h('p',{class:'small muted'},'Fuentes a las que acudir de verdad: Instituto Geofísico de la Escuela Politécnica Nacional (sismos y volcanes), INAMHI (clima), SNGRE y ECU 911 (emergencias), Instituto Oceanográfico de la Armada (mar y oleaje).')),
      secNav());
  }

  /* =================================================================
     RENDER
     ================================================================= */
  function render(){
    if (E){ try { E.dispose(); } catch(err){ console.warn(err); } E = null; }
    renderNav(); body.innerHTML='';
    const f = [secInterior, secPlacas, secBordes, secSismos, secVolcanes, secRocas, secOceano, secDecision, secReto][St.sec];
    body.append(f());
    Store.log('seccion',{recurso:'cn-tierra', seccion:SEC[St.sec].id});
    if (St.sec===0 && E) E.select(St.capa);
  }
  render();
  return { unmount(){ if (E){ try { E.dispose(); } catch(err){ console.warn(err); } E = null; } } };
}

route('/cn/tierra', (view) => tierraView(view));
route('/cn/proximos/tierra', (v) => navigate('#/cn/tierra'));
</script>
