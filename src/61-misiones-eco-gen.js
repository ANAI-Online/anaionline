<style>
/* ===== Misiones de fase 2: ecosistema en riesgo · código genético ===== */
.mis3-ov{position:absolute;inset:0;display:none;padding:16px 16px 44px;background:var(--bg-2);overflow:auto;z-index:4}
.mis3-map{width:100%;height:auto;display:block;background:var(--bg-3);border:1px solid var(--line);border-radius:12px}
.mis3-map .zn{cursor:pointer}
.mis3-map .zn:focus{outline:none}
.mis3-map .zn:focus-visible circle{stroke:var(--accent);stroke-width:4}
.mis3-map .zn.on circle{stroke:var(--accent);stroke-width:4}
.mis3-map text{font-family:"IBM Plex Sans",sans-serif;fill:var(--ink-2);font-size:11px}
.mis3-zonas{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.mis3-zona{display:flex;flex-direction:column;gap:2px;align-items:flex-start;text-align:left;border:1.5px solid var(--line);border-radius:12px;background:var(--bg-2);color:var(--ink);padding:9px 11px;cursor:pointer;font:inherit}
.mis3-zona:hover,.mis3-zona:focus-visible{border-color:var(--eco);outline:none}
.mis3-zona[aria-pressed="true"]{border-color:var(--eco);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--eco) 24%,transparent)}
.mis3-zona b{font-size:.88rem}
.mis3-zona small{font-size:.72rem;color:var(--ink-3)}
.mis3-zona .mis3-ok{color:var(--ok);font-weight:700;font-size:.72rem}
.mis3-ev{display:flex;gap:10px;align-items:flex-start;text-align:left;width:100%;border:1.5px solid var(--line);border-radius:11px;background:var(--bg-2);color:var(--ink);padding:10px 12px;cursor:pointer;font:inherit;font-size:.84rem;line-height:1.35}
.mis3-ev:hover,.mis3-ev:focus-visible{border-color:var(--accent);outline:none}
.mis3-ev[aria-pressed="true"]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--bg-2))}
.mis3-ev.ok{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 12%,transparent)}
.mis3-ev.bad{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 10%,transparent)}
.mis3-ev .mis3-k{font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.74rem;color:var(--ink-3);flex:none;padding-top:2px}
.mis3-ficha{border:1px solid var(--line);border-radius:12px;background:var(--bg-2);padding:10px 12px}
.mis3-ficha summary{cursor:pointer;font-weight:600;font-size:.87rem}
.mis3-ficha[open]{border-color:var(--eco)}
.mis3-ficha p{margin:7px 0 0;font-size:.84rem;color:var(--ink-2)}
.mis3-desc{display:grid;grid-template-columns:minmax(120px,1fr) minmax(140px,1.3fr);gap:8px;align-items:center;font-size:.83rem;margin:5px 0}
.mis3-desc select{width:100%;padding:7px 9px;border-radius:9px;border:1px solid var(--line-2);background:var(--bg-2);color:var(--ink);font:inherit;font-size:.82rem}
.mis3-desc.ok select{border-color:var(--ok)}
.mis3-desc.bad select{border-color:var(--bad)}
.mis3-leg{display:flex;flex-wrap:wrap;gap:8px;font-size:.74rem;color:var(--ink-3)}
.mis3-leg span{display:inline-flex;align-items:center;gap:5px}
.mis3-leg i{width:14px;height:3px;border-radius:2px;display:inline-block}
.mis3-chartbox{position:relative;height:250px;margin-top:6px}
.mis3-chartbox canvas{width:100%;height:100%}
.mis3-gam{display:flex;flex-wrap:wrap;gap:8px}
.mis3-crom{font-family:var(--font-m,"IBM Plex Mono",monospace);font-weight:700}
.mis3-nota{font-size:.78rem;color:var(--ink-3)}
/* el panel de una misión es largo: el escenario queda a la vista mientras se lee */
.mis3-mision .stage{max-height:680px;align-self:start;position:sticky;top:14px}
.mis3-ped-off{opacity:.45}
.mis3-mision .gen-punnett{width:100%;table-layout:fixed}
.mis3-mision .gen-punnett th:first-child{width:76px}
.mis3-mision .gen-punnett .gen-hd{grid-auto-flow:row;min-width:0;padding:4px 2px;height:auto;gap:2px}
.mis3-mision .gen-cell{min-width:0}
.mis3-mision .gen-cell.ok{grid-template-columns:1fr;justify-items:center;text-align:center;padding:6px 4px}
@media(max-width:900px){.mis3-chartbox{height:210px}.mis3-mision .stage{position:relative;top:auto;max-height:none}}
</style>
<script>
/* =====================================================================
   MISIONES · FASE 2
   1) El ecosistema en riesgo  → #/mision/ecosistema-riesgo
   2) Código genético          → #/mision/codigo-genetico
   Ambas son casos: el estudiante recoge evidencia, emite un diagnóstico
   y lo justifica. La justificación es lo que se evalúa.
   ===================================================================== */

/* ---------- registro defensivo de metadatos y disponibilidad ---------- */
(function mis3Registro(){
  try {
    if (typeof BIO === 'undefined') return;
    if (BIO.activities){
      if (!BIO.activities['mision-ecosistema-riesgo'])
        BIO.activities['mision-ecosistema-riesgo'] = { t:'Misión: El ecosistema en riesgo', unidad:7, peso:30, xp:140 };
      if (!BIO.activities['mision-codigo-genetico'])
        BIO.activities['mision-codigo-genetico'] = { t:'Misión: Código genético', unidad:4, peso:30, xp:130 };
    }
    if (Array.isArray(BIO.missions))
      BIO.missions.forEach(m => { if (m.id === 'ecosistema-riesgo' || m.id === 'codigo-genetico') m.disponible = true; });
    if (typeof ACT_HREF !== 'undefined' && ACT_HREF){
      ACT_HREF['mision-ecosistema-riesgo'] = '#/mision/ecosistema-riesgo';
      ACT_HREF['mision-codigo-genetico']   = '#/mision/codigo-genetico';
    }
  } catch(e){ console.warn('mis3 registro', e); }
})();

/* ---------- utilidades comunes ---------- */
function mis3Num(v, d){ const s = (d != null ? Number(v).toFixed(d) : String(Math.round(v))); return s.replace('.', ','); }
function mis3Col(n, alt){ if (!n) return alt; if (n.charAt(0) !== '-') return n; try { const c = cssVar(n); return c || alt; } catch(e){ return alt; } }
function mis3Quieto(){ try { return !!(Store.s.a11y.motion || !Store.s.settings.motion); } catch(e){ return false; } }
/* barra de estaciones, igual que en la misión del glóbulo rojo */
function mis3Ruta(el, pasos, idx, fin){
  el.innerHTML = '';
  pasos.forEach((p,i) => el.append(h('span',{ class: i<idx ? 'done' : (i===idx && !fin ? 'now' : '') }, p.n)));
}
function mis3Cierre(el, txt, extra){
  el.append(h('div',{class:'notice ok'}, h('span',{}, txt)));
  if (extra) el.append(extra);
}

/* =====================================================================
   MISIÓN 1 · EL ECOSISTEMA EN RIESGO
   Caso: colapso de la concha prieta en el manglar del estuario de
   Cañaveral (caso construido con datos verosímiles del Pacífico
   ecuatoriano). Causa real: tala del manglar para camaroneras.
   La contaminación por nutrientes es la correlación tentadora: sube por
   la misma causa (efluentes de las piscinas), no es la causa del colapso.
   ===================================================================== */
const MIS3_ANIOS = [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
const MIS3_SERIES = {
  concha:    { n:'Concha prieta', u:'ind/m²', d:1, col:'#6B4BB8', alt:'#6B4BB8', v:[12.4,12.3,12.0,9.9,8.0,6.3,5.2,4.4,3.8,3.3,3.1] },
  manglar:   { n:'Cobertura de manglar', u:'ha', d:0, col:'#2E8B57', alt:'#2E8B57', v:[820,812,760,700,648,604,570,540,516,492,470] },
  camaronera:{ n:'Piscinas camaroneras', u:'ha', d:0, col:'#C2452F', alt:'#C2452F', v:[90,96,148,205,258,300,336,366,392,414,430] },
  nitratos:  { n:'Nitratos en el agua', u:'mg/L', d:2, col:'#C98A16', alt:'#C98A16', v:[0.40,0.42,0.55,0.78,0.98,1.18,1.34,1.50,1.64,1.78,1.90] },
  concheros: { n:'Concheros activos', u:'personas', d:0, col:'#3E7CB1', alt:'#3E7CB1', v:[180,176,171,168,160,150,141,128,116,104,96] },
  salinidad: { n:'Salinidad del estuario', u:'psu', d:1, col:'#7A8189', alt:'#7A8189', v:[25.1,24.8,27.9,25.4,24.9,25.6,24.6,25.8,26.1,25.2,25.5] }
};
const MIS3_ZONAS = [
  { id:'norte', n:'Zona norte · estero El Palmar', em:'🌳', at:[-3.0,0.9,-1.4],
    manglar:'95 % de cobertura (sin tala)', nitratos:'2,0 mg/L', concha:'10,8 ind/m²', juveniles:'4,6 ind/m²',
    resumen:'Manglar intacto. Recibe la misma descarga del río que la zona sur: los nitratos son casi iguales. La concha está sana y hay muchísimos juveniles.' },
  { id:'media', n:'Zona media · Boca de Caña', em:'🌿', at:[0.2,0.9,1.8],
    manglar:'70 % de cobertura (tala parcial)', nitratos:'1,4 mg/L', concha:'5,4 ind/m²', juveniles:'1,9 ind/m²',
    resumen:'Tala parcial. Todo aparece en valores intermedios: la concha y los juveniles bajan en la misma proporción en que se pierde el manglar.' },
  { id:'sur', n:'Zona sur · estero Chupador', em:'🦐', at:[4.4,0.9,2.2],
    manglar:'38 % de cobertura (62 % talado para piscinas)', nitratos:'2,1 mg/L', concha:'1,2 ind/m²', juveniles:'0,3 ind/m²',
    resumen:'Manglar talado y rodeado de piscinas camaroneras. La concha casi ha desaparecido y prácticamente no hay juveniles: no se está reponiendo el banco.' }
];
const MIS3_FICHAS = [
  { id:'esfuerzo', t:'Bitácora de la asociación de concheros',
    d:'Los concheros activos pasaron de 180 a 96 (−47 %) y la captura por persona y día cayó de 320 a 110 conchas. La veda de octubre se respeta desde 2012 y la talla mínima (4,5 cm) se controla en el muelle.' },
  { id:'tallas', t:'Estructura de tallas del muestreo de 2024',
    d:'Las conchas grandes (más de 5 cm) siguen apareciendo en proporción normal. Lo que falta son los juveniles menores de 2 cm: 0,3 ind/m² en la zona sur frente a 4,6 ind/m² en la norte. El banco no se está reponiendo.' },
  { id:'salinidad', t:'Registro de salinidad (2014–2024)',
    d:'La salinidad oscila entre 24,6 y 27,9 psu, sin tendencia. El valor más alto se midió en 2016, un año en que la concha todavía estaba en 12,0 ind/m². La concha prieta es eurihalina: tolera de 20 a 35 psu.' },
  { id:'invasora', t:'Primer registro de especie introducida',
    d:'El mejillón asiático Mytella strigata se registró por primera vez en el estuario en 2021. Compite por el sustrato con la concha prieta. Para 2021 la concha ya había caído un 65 % respecto a 2014.' },
  { id:'efluentes', t:'Informe técnico sobre los efluentes',
    d:'Las piscinas camaroneras renuevan agua cada quincena y descargan al estero agua rica en nitrógeno. Ese efluente se reparte por todo el estuario con la marea: por eso los nitratos suben también en la zona norte, donde el manglar sigue en pie.' }
];
const MIS3_EVID = [
  { id:'orden',     t:'El manglar y las camaroneras cambian desde 2016; la concha empieza a caer en 2017.', sirve:true },
  { id:'zonas',     t:'Zona norte (manglar intacto): 10,8 conchas/m². Zona sur (62 % talado): 1,2 conchas/m². Los nitratos son casi iguales en las dos.', sirve:true },
  { id:'juveniles', t:'En la zona sur faltan los juveniles (0,3 ind/m²) y en la norte abundan (4,6 ind/m²); las tallas grandes siguen presentes.', sirve:true },
  { id:'nitratos',  t:'Los nitratos suben y la concha baja: la correlación es casi perfecta (r = −0,98).', sirve:false },
  { id:'esfuerzo',  t:'Los concheros activos bajaron un 47 % y la captura por persona también bajó.', sirve:false },
  { id:'salinidad', t:'La salinidad oscila entre 24,6 y 27,9 psu, sin tendencia en once años.', sirve:false },
  { id:'invasora',  t:'El mejillón introducido Mytella strigata se registró por primera vez en 2021.', sirve:false },
  { id:'efluentes', t:'Las piscinas descargan agua rica en nitrógeno que la marea reparte por todo el estuario.', sirve:false }
];
const MIS3_DESCARTES = [
  { id:'sobrepesca', n:'Sobrepesca de la concha', ok:'esfuerzo',
    fb:'La extracción bajó un 47 % y aun así se saca menos concha por persona. Si sobraran manos, al retirarse la mitad de los concheros la captura por persona habría subido.',
    mal:'Esa evidencia no dice nada sobre cuánta gente extrae concha ni cuánto saca cada uno. Busca el dato del esfuerzo pesquero.' },
  { id:'salinidad', n:'Cambio de salinidad', ok:'salinidad',
    fb:'Once años sin tendencia y el valor más extremo (2016) coincide con la concha todavía sana. Una causa tiene que variar cuando varía el efecto.',
    mal:'Para descartar la salinidad necesitas el registro de salinidad: comprobar si cambió y si ese cambio coincide con el colapso.' },
  { id:'invasora', n:'Especie introducida', ok:'invasora',
    fb:'Primer registro en 2021, cuando la concha ya había caído un 65 %. Una causa no puede empezar después de su efecto (sí puede agravarlo).',
    mal:'Aquí lo decisivo es la fecha del primer registro de la especie introducida comparada con la fecha en que empezó el colapso.' },
  { id:'nutrientes', n:'Contaminación por nutrientes', ok:'zonas',
    fb:'Los nitratos son casi iguales en el norte y en el sur, pero la concha solo colapsa donde falta el manglar. Misma causa supuesta, resultados opuestos: no es la causa.',
    mal:'Para descartar los nitratos hace falta comparar dos zonas con nitratos parecidos y manglar distinto: ahí se ve qué variable manda.' }
];
const MIS3_CULPA = [
  { id:'sobrepesca', t:'Sobrepesca: se extrae más concha de la que el banco produce',
    fb:'Si el problema fuera la extracción, faltarían las tallas grandes y al retirarse el 47 % de los concheros la captura por persona se habría estabilizado. Ocurre lo contrario: menos gente, menos conchas por persona, y lo que falta son los juveniles.' },
  { id:'tala', t:'Tala del manglar para abrir piscinas camaroneras', ok:true },
  { id:'nutrientes', t:'Contaminación por nutrientes procedentes de la cuenca',
    fb:'Los nitratos suben, es cierto, pero en la zona norte llegan casi a lo mismo (2,0 mg/L) y allí hay 10,8 conchas/m². Las piscinas producen los dos efectos a la vez —talan y descargan nutrientes—, y por eso las dos series van juntas: es una causa común, no una cadena causal.' },
  { id:'invasora', t:'Llegada del mejillón introducido Mytella strigata',
    fb:'El mejillón se registró en 2021, cuando la concha ya había caído un 65 %. Puede estar agravando el problema, pero no pudo iniciarlo: ninguna causa actúa hacia atrás en el tiempo.' },
  { id:'salinidad', t:'Cambio en la salinidad del estuario',
    fb:'La salinidad oscila entre 24,6 y 27,9 psu sin tendencia, y su valor más alto (2016) coincide con la concha todavía en 12,0 ind/m². Además la concha prieta tolera de 20 a 35 psu.' }
];
const MIS3_MANEJO = [
  { t:'Vedar la concha prieta durante dos años y no cambiar nada más',
    fb:'La veda protege a los adultos que quedan, pero el muestreo mostró que lo que falta son los juveniles: sin raíces de mangle las larvas no tienen dónde asentarse. Sería tratar el síntoma y dejar la causa intacta.' },
  { t:'Acuerdo de uso sustentable del manglar con la asociación de concheros: custodia comunitaria del estero, freno a nuevas piscinas y reforestación de las zonas taladas', ok:true,
    fb:'Actúa sobre la causa (la pérdida de hábitat de cría) y sobre quien puede sostenerla en el tiempo: la comunidad que vive de la concha. En el golfo de Guayaquil estos acuerdos son la medida con mejores resultados. La recuperación no es inmediata: un manglar joven tarda años en funcionar como criadero.' },
  { t:'Sembrar cada año conchas de criadero en la zona sur',
    fb:'Repoblar sin restaurar el hábitat obliga a repetir la siembra indefinidamente: las nuevas conchas llegan al mismo lugar donde las larvas no pueden asentarse. Alivia el síntoma un año y deja la causa intacta.' },
  { t:'Prohibir los fertilizantes en las fincas río arriba',
    fb:'Bajar los nitratos es deseable por otras razones, pero la comparación entre zonas mostró que los nitratos no explican el colapso: en la zona norte son igual de altos y la concha está sana.' }
];

/* ---------- escena 3D propia del estuario (v1.7) ----------
   Manglar rojo (Rhizophora) con raíces zancudas en arco, manglar negro (Avicennia) con
   neumatóforos, un estero que pasa por las tres zonas de muestreo, tocones donde se taló y
   piscinas camaroneras con sus muros de tierra. Todo procedimental. */
function mis3Lin(c){ return new THREE.Color(c).convertSRGBToLinear(); }
function mis3Mat(c, o){ return mat(mis3Lin(c), Object.assign({ roughness:0.9, clearcoat:0, metalness:0, envMapIntensity:0.35 }, o||{})); }
/* distancia de (x,z) a la línea central del estero */
const MIS3_ESTERO = [[-9,-0.2],[-6,-0.8],[-3,-1.5],[-1.2,0.2],[0.2,1.75],[2.2,2.5],[4.4,2.25],[6.6,1.45],[9.5,1.1],[13,0.6]];
function mis3DistEstero(x, z){ let d = 1e9; for (let i=0;i<MIS3_ESTERO.length-1;i++){ const [ax,az] = MIS3_ESTERO[i], [bx,bz] = MIS3_ESTERO[i+1];
  const vx = bx-ax, vz = bz-az, t = clamp(((x-ax)*vx + (z-az)*vz)/(vx*vx+vz*vz), 0, 1); d = Math.min(d, Math.hypot(x-ax-t*vx, z-az-t*vz)); } return d; }
const MIS3_PISC = { x0:4.9, x1:8.4, z0:2.95, z1:5.3 };   /* rectángulo de las piscinas (sin árboles) */
function mis3Alt(x, z){
  const d = mis3DistEstero(x, z), cauce = clamp(1 - (d - 0.55)/0.9, 0, 1);
  let y = 0.16 + 0.16*Kit.fbm(x*0.21 + 4.4, 0.4, z*0.21 + 4.4, 3) - 0.62*cauce*cauce*(3 - 2*cauce);
  y -= clamp((z - 5.2)*0.18, 0, 0.6) + clamp((-z - 6)*0.18, 0, 0.6);           /* bordes que bajan al mar */
  const P = MIS3_PISC, dp = Math.max(P.x0 - x, x - P.x1, P.z0 - z, z - P.z1);
  if (dp < 0.6) y = y + (0.2 - y)*clamp(1 - dp/0.6, 0, 1);                    /* terreno aplanado para las piscinas */
  return y;
}
function mis3Manglar(E, low){
  const R = Kit.rng(23), out = { cielo:null };
  /* ---- cielo en degradado y bruma: el horizonte no termina en un borde ---- */
  const oscuro = (() => { try { const c = new THREE.Color(cssVar('--bg') || '#ffffff'); return (c.r + c.g + c.b)/3 < 0.35; } catch(e){ return false; } })();
  const cv = document.createElement('canvas'); cv.width = 4; cv.height = 256; const cx = cv.getContext('2d');
  const gr = cx.createLinearGradient(0,0,0,256);
  if (oscuro){ gr.addColorStop(0,'#1E3148'); gr.addColorStop(0.62,'#50657A'); gr.addColorStop(1,'#8A8F8C'); }
  else { gr.addColorStop(0,'#6FA6C9'); gr.addColorStop(0.6,'#B9D4DF'); gr.addColorStop(1,'#E4E6D8'); }
  cx.fillStyle = gr; cx.fillRect(0,0,4,256);
  const cielo = new THREE.CanvasTexture(cv); cielo.encoding = THREE.sRGBEncoding; E.scene.background = cielo;
  E.scene.fog = new THREE.Fog(new THREE.Color(oscuro ? '#6E7C86' : '#D9E2DE'), 22, 44);
  /* ---- terreno con color por vértice: fango bajo el agua, suelo del manglar, salitral talado ---- */
  const TS = 34, TN = low ? 56 : 90;
  const tg = new THREE.PlaneGeometry(TS, TS, TN, TN); tg.rotateX(-Math.PI/2);
  const tp = tg.attributes.position, tc = [], c = new THREE.Color();
  const cFango = new THREE.Color('#3A3025'), cSuelo = new THREE.Color('#5D4E36'), cOliva = new THREE.Color('#5E5C38'), cSal = new THREE.Color('#A08E6C'), cDique = new THREE.Color('#8B7456');
  for (let i=0;i<tp.count;i++){ const x = tp.getX(i) + 1.5, z = tp.getZ(i) + 1; const y = mis3Alt(x, z); tp.setXYZ(i, x, y, z);
    const talado = clamp((x - 2.4)/1.6, 0, 1)*clamp(1 - Math.abs(z - 1.5)/5.5, 0, 1);
    c.copy(y < 0.02 ? cFango : cSuelo).lerp(cOliva, clamp(0.5 + Kit.fbm(x*0.5, 1.3, z*0.5, 2) - 0.4, 0, 0.6)*(y > 0.05 ? 1 : 0));
    c.lerp(cSal, talado*0.75*(y > 0.04 ? 1 : 0));
    const P = MIS3_PISC; if (x > P.x0-0.5 && x < P.x1+0.5 && z > P.z0-0.5 && z < P.z1+0.5) c.lerp(cDique, 0.55);
    const n = 0.9 + 0.2*Kit.fbm(x*2.3, 0.2, z*2.3, 2); tc.push(Math.pow(c.r*n,2.2), Math.pow(c.g*n,2.2), Math.pow(c.b*n,2.2)); }
  tg.setAttribute('color', new THREE.Float32BufferAttribute(tc, 3)); tg.computeVertexNormals();
  E.scene.add(new THREE.Mesh(tg, mat(0xffffff, { vertexColors:true, roughness:0.97, clearcoat:0, metalness:0, envMapIntensity:0.25 })));
  /* ---- agua del estuario: color, brillo y un rizado que se mueve con la marea ---- */
  const nS = 128, nc = document.createElement('canvas'); nc.width = nc.height = nS; const nx = nc.getContext('2d'), img = nx.createImageData(nS, nS);
  const hA = (i,j) => Kit.fbm(i/nS*6, 0.7, j/nS*6, 3) + 0.5*Math.sin((i+j)/nS*Math.PI*8);
  for (let j=0;j<nS;j++) for (let i=0;i<nS;i++){ const dx = hA(i+1,j) - hA(i-1,j), dz = hA(i,j+1) - hA(i,j-1), k = (j*nS+i)*4;
    const v = new THREE.Vector3(-dx*2.2, -dz*2.2, 1).normalize(); img.data[k] = (v.x*0.5+0.5)*255; img.data[k+1] = (v.y*0.5+0.5)*255; img.data[k+2] = (v.z*0.5+0.5)*255; img.data[k+3] = 255; }
  nx.putImageData(img, 0, 0);
  const nm = new THREE.CanvasTexture(nc); nm.wrapS = nm.wrapT = THREE.RepeatWrapping; nm.repeat.set(5, 5);
  const agua = new THREE.Mesh(new THREE.PlaneGeometry(TS, TS, 1, 1), mat(mis3Lin('#2B6B73'), { transparent:true, opacity:0.84, roughness:0.08, metalness:0.05, clearcoat:1, clearcoatRoughness:0.08, envMapIntensity:1.1, normalMap:nm, normalScale:new THREE.Vector2(0.2, 0.2) }));
  agua.rotation.x = -Math.PI/2; agua.position.set(1.5, 0.0, 1); agua.userData.keepOpacity = true; E.scene.add(agua);
  out.agua = nm;
  /* ---- árboles ---- */
  const corteza = [], raices = [], copas = [], copasN = [], tocones = [], cortes = [];
  const V = (x,y,z) => new THREE.Vector3(x,y,z);
  const cil = (a, b, r0, r1, seg) => { const d = new THREE.Vector3().subVectors(b, a), L = d.length();
    const g = new THREE.CylinderGeometry(r1, r0, L, seg || 7, 1); g.applyMatrix4(new THREE.Matrix4().compose(a.clone().addScaledVector(d, 0.5), new THREE.Quaternion().setFromUnitVectors(V(0,1,0), d.normalize()), V(1,1,1))); return g; };
  const copa = (x, y, z, s, col, lista, seed) => { const g = new THREE.IcosahedronGeometry(1, low ? 1 : 2), p = g.attributes.position, cc = [], k0 = new THREE.Color(col), k = new THREE.Color();
    for (let i=0;i<p.count;i++){ const X = p.getX(i), Y = p.getY(i), Z = p.getZ(i), f = 0.78 + 0.42*Kit.fbm(X*1.6 + seed, Y*1.6, Z*1.6 + seed, 3);
      p.setXYZ(i, x + X*s*f, y + Y*s*f*0.62, z + Z*s*f);
      k.copy(k0).multiplyScalar(0.72 + 0.45*(Y*0.5+0.5)*f); cc.push(Math.pow(k.r,2.2), Math.pow(k.g,2.2), Math.pow(k.b,2.2)); }
    g.setAttribute('color', new THREE.Float32BufferAttribute(cc, 3)); g.computeVertexNormals(); Kit.weldNormals(g); lista.push(g); };
  function mangleRojo(x, z, h){
    const y0 = mis3Alt(x, z), base = V(x, y0 + 0.75*h/2.4, z), top = V(x + (R()-0.5)*0.3, y0 + h, z + (R()-0.5)*0.3);
    corteza.push(cil(base, top, 0.09*h/2.2, 0.06*h/2.2, 7));
    /* raíces zancudas: salen del tronco a distintas alturas y bajan en arco hasta el fango */
    const nr = low ? 8 : 12;
    for (let i=0;i<nr;i++){ const a = i/nr*Math.PI*2 + R()*0.4, hy = y0 + (0.35 + R()*0.55)*h/2.4, rad = (0.7 + R()*0.6)*h/2.4;
      const p0 = V(x + Math.cos(a)*0.06, hy, z + Math.sin(a)*0.06), p2 = V(x + Math.cos(a)*rad, 0, z + Math.sin(a)*rad); p2.y = mis3Alt(p2.x, p2.z) - 0.05;
      const p1 = V(x + Math.cos(a)*rad*0.55, hy + 0.28*h/2.4, z + Math.sin(a)*rad*0.55);
      raices.push(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(p0, p1, p2), low ? 6 : 10, 0.028*h/2.2, low ? 4 : 5, false)); }
    /* ramas con raíces aéreas que cuelgan hasta el agua */
    const nb = 3 + Math.floor(R()*2);
    for (let i=0;i<nb;i++){ const a = i/nb*Math.PI*2 + R(), L = (0.5 + R()*0.4)*h/2.4, yb = y0 + h*(0.72 + R()*0.18);
      const b0 = V(top.x, yb, top.z), b1 = V(top.x + Math.cos(a)*L, yb + 0.28*h/2.4, top.z + Math.sin(a)*L);
      corteza.push(cil(b0, b1, 0.04*h/2.2, 0.025*h/2.2, 5));
      if (R() < 0.7){ const gy = mis3Alt(b1.x, b1.z); raices.push(cil(V(b1.x, gy - 0.05, b1.z), b1.clone().setY(b1.y - 0.05), 0.014*h/2.2, 0.012*h/2.2, 4)); }
      copa(b1.x, b1.y + 0.18*h/2.4, b1.z, (0.55 + R()*0.2)*h/2.4, '#2F6A38', copas, x*3 + i); }
    copa(top.x, top.y + 0.25*h/2.4, top.z, (0.7 + R()*0.15)*h/2.4, '#336F3B', copas, z*5);
  }
  function mangleNegro(x, z, h){
    const y0 = mis3Alt(x, z), top = V(x, y0 + h, z);
    corteza.push(cil(V(x, y0 - 0.05, z), top, 0.1*h/2, 0.06*h/2, 7));
    for (let i=0;i<3;i++){ const a = i*2.1 + R(); copa(x + Math.cos(a)*0.35*h/2, y0 + h + 0.1, z + Math.sin(a)*0.35*h/2, (0.55 + R()*0.15)*h/2, '#5B7A4B', copasN, i + x); }
    copa(x, y0 + h + 0.35*h/2, z, 0.6*h/2, '#62824F', copasN, z + 9);
  }
  const lejos = (x, z, m) => mis3DistEstero(x, z) > (m || 1.15);
  const libre = (x, z) => { const P = MIS3_PISC; return !(x > P.x0-0.9 && x < P.x1+0.9 && z > P.z0-0.9 && z < P.z1+0.9); };
  /* zona norte y oeste: manglar rojo intacto y denso */
  const pos = [[-4.6,-3.0,2.5],[-3.2,-3.4,2.3],[-1.8,-3.0,2.2],[-5.4,-1.6,2.4],[-4.3,0.6,2.2],[-2.6,0.4,2.0],[-6.0,0.9,2.3],[-0.6,-2.4,2.0],[-1.8,1.6,1.9],[-3.6,2.2,2.1],[-5.6,-3.6,2.1],[0.6,-1.2,1.8]];
  pos.forEach(([x,z,hh]) => { if (lejos(x,z)) mangleRojo(x, z, hh); });
  /* zona media: tala parcial */
  [[1.4,0.2,1.8],[-0.4,3.0,1.8],[1.8,3.8,1.7]].forEach(([x,z,hh]) => { if (lejos(x,z)) mangleRojo(x, z, hh); });
  [[2.3,-1.8,1.9],[3.5,-2.3,1.7]].forEach(([x,z,hh]) => mangleNegro(x, z, hh));
  /* tocones donde se taló el manglar (sobre todo en la zona sur, junto a las piscinas) */
  [[0.9,3.3],[1.0,1.0],[3.1,0.6],[3.8,-0.6],[4.2,0.9],[3.2,3.9],[4.1,4.4],[2.6,1.2],[5.2,0.2],[6.0,-0.4],[2.9,-0.4]].forEach(([x,z]) => { if (!lejos(x,z,0.9)) return;
    const y0 = mis3Alt(x, z), hh = 0.18 + R()*0.2, r = 0.07 + R()*0.05;
    tocones.push(cil(V(x, y0 - 0.05, z), V(x, y0 + hh, z), r*1.2, r, 7));
    const tapa = new THREE.CylinderGeometry(r*0.98, r*0.98, 0.012, 7); tapa.translate(x, y0 + hh + 0.006, z); cortes.push(tapa);
    for (let i=0;i<4;i++){ const a = R()*6.28, L = 0.3 + R()*0.3; raices.push(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(V(x, y0 + 0.08, z), V(x + Math.cos(a)*L*0.5, y0 + 0.16, z + Math.sin(a)*L*0.5), V(x + Math.cos(a)*L, mis3Alt(x + Math.cos(a)*L, z + Math.sin(a)*L) - 0.03, z + Math.sin(a)*L)), 5, 0.02, 4, false)); } });
  const mCort = mis3Mat('#5E4838', { roughness:0.85 }), mRaiz = mis3Mat('#6E5240', { roughness:0.8 });
  E.scene.add(new THREE.Mesh(Kit.merge(corteza), mCort), new THREE.Mesh(Kit.merge(raices), mRaiz));
  if (tocones.length) E.scene.add(new THREE.Mesh(Kit.merge(tocones), mis3Mat('#6B5443')), new THREE.Mesh(Kit.merge(cortes), mis3Mat('#C9A77C')));
  E.scene.add(new THREE.Mesh(Kit.merge(copas), mat(0xffffff, { vertexColors:true, roughness:0.62, clearcoat:0.25, clearcoatRoughness:0.5, metalness:0, envMapIntensity:0.45 })));
  E.scene.add(new THREE.Mesh(Kit.merge(copasN), mat(0xffffff, { vertexColors:true, roughness:0.8, clearcoat:0, metalness:0, envMapIntensity:0.35 })));
  /* neumatóforos del mangle negro: «lápices» que salen del fango para respirar */
  const NP = low ? 110 : 240, neu = new THREE.InstancedMesh(new THREE.ConeGeometry(0.025, 0.36, 5), mis3Mat('#4E3C2C'), NP), dm = new THREE.Object3D(); let k = 0;
  for (let t=0; t<NP*4 && k<NP; t++){ const x = 1.6 + R()*3.2, z = -3.4 + R()*2.9; if (!lejos(x, z, 0.9)) continue;
    const y0 = mis3Alt(x, z); dm.position.set(x, y0 + 0.12, z); dm.rotation.set((R()-0.5)*0.3, 0, (R()-0.5)*0.3); dm.scale.setScalar(0.7 + R()*0.6); dm.updateMatrix(); neu.setMatrixAt(k++, dm.matrix); }
  neu.count = k; E.scene.add(neu);
  /* conchas prietas sobre el fango de la zona norte (lo que se está perdiendo) */
  const NC = 14, con = new THREE.InstancedMesh(new THREE.SphereGeometry(0.1, 9, 6), mis3Mat('#2E261F', { roughness:0.55, clearcoat:0.3 }), NC); k = 0;
  for (let t=0; t<200 && k<NC; t++){ const x = -3.9 + R()*1.8, z = -2.4 + R()*1.9; if (mis3DistEstero(x, z) < 0.62 || mis3DistEstero(x,z) > 1.1) continue;
    dm.position.set(x, mis3Alt(x, z) + 0.03, z); dm.rotation.set(0, R()*6, 0); dm.scale.set(1, 0.5, 0.8); dm.updateMatrix(); con.setMatrixAt(k++, dm.matrix); }
  con.count = k; E.scene.add(con);
  return out;
}
/* piscinas camaroneras: muro de tierra con biselado y cuatro estanques de agua verdosa */
function mis3Piscinas(){
  const P = MIS3_PISC, w = P.x1 - P.x0, d = P.z1 - P.z0, cx = (P.x0 + P.x1)/2, cz = (P.z0 + P.z1)/2;
  const sh = new THREE.Shape(); sh.moveTo(-w/2, -d/2); sh.lineTo(w/2, -d/2); sh.lineTo(w/2, d/2); sh.lineTo(-w/2, d/2); sh.lineTo(-w/2, -d/2);
  const pw = (w - 0.66)/2, pd = (d - 0.66)/2, pools = [];
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz]) => { const x0 = sx < 0 ? -w/2 + 0.22 : 0.11, z0 = sz < 0 ? -d/2 + 0.22 : 0.11;
    const hole = new THREE.Path(); hole.moveTo(x0, z0); hole.lineTo(x0, z0 + pd); hole.lineTo(x0 + pw, z0 + pd); hole.lineTo(x0 + pw, z0); hole.lineTo(x0, z0); sh.holes.push(hole);
    pools.push([cx + x0 + pw/2, cz + z0 + pd/2]); });
  const g = new THREE.ExtrudeGeometry(sh, { depth:0.16, bevelEnabled:true, bevelThickness:0.07, bevelSize:0.07, bevelSegments:2, curveSegments:1 });
  g.rotateX(Math.PI/2); g.translate(cx, 0.36, cz);
  const dique = new THREE.Mesh(g, mis3Mat('#8C7456', { roughness:0.95 }));
  const ms = [dique];
  pools.forEach(([x,z]) => { const a = new THREE.Mesh(new THREE.PlaneGeometry(pw + 0.02, pd + 0.02), mat(mis3Lin('#3F8C80'), { roughness:0.12, clearcoat:0.8, clearcoatRoughness:0.1, envMapIntensity:0.9, metalness:0.02 }));
    a.rotation.x = -Math.PI/2; a.position.set(x, 0.27, z); ms.push(a); });
  /* compuerta y canal de descarga hacia el estero (los efluentes del caso) */
  const comp = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.3, 0.18), mis3Mat('#6F6A62', { roughness:0.6 })); comp.position.set(cx - 0.9, 0.34, P.z0 - 0.02); ms.push(comp);
  const canal = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.9), mat(mis3Lin('#4B8F7E'), { roughness:0.2, clearcoat:0.6 })); canal.position.set(cx - 0.9, 0.12, P.z0 - 0.52); ms.push(canal);
  return ms;
}

function mis3MapaSVG(){
  const z = [ ['norte',96,86,'Zona norte'], ['media',210,150,'Zona media'], ['sur',248,206,'Zona sur'] ];
  let s = '<svg class="mis3-map" viewBox="0 0 420 270" role="group" aria-label="Mapa del estuario de Cañaveral con las tres zonas de muestreo">';
  s += '<rect x="0" y="0" width="420" height="270" fill="#20556B" fill-opacity=".18"/>';
  s += '<path d="M0 120 C70 96 120 132 190 128 C260 124 300 176 420 160 L420 0 L0 0 Z" fill="#2F7038" fill-opacity=".30"/>';
  s += '<path d="M0 214 C80 198 150 226 240 216 C320 208 370 232 420 226 L420 270 L0 270 Z" fill="#2F7038" fill-opacity=".18"/>';
  s += '<rect x="292" y="180" width="108" height="66" rx="5" fill="#7A6A52" fill-opacity=".55" stroke="#7A6A52"/>';
  s += '<rect x="300" y="188" width="42" height="22" rx="3" fill="#2E6F85" fill-opacity=".8"/><rect x="350" y="188" width="42" height="22" rx="3" fill="#2E6F85" fill-opacity=".8"/>';
  s += '<rect x="300" y="216" width="42" height="22" rx="3" fill="#2E6F85" fill-opacity=".8"/><rect x="350" y="216" width="42" height="22" rx="3" fill="#2E6F85" fill-opacity=".8"/>';
  s += '<text x="296" y="176">piscinas camaroneras</text><text x="14" y="60">manglar en pie</text><text x="14" y="252">estuario</text>';
  z.forEach(([id,x,y,n]) => {
    s += `<g class="zn" data-zona="${id}" tabindex="0" role="button" aria-label="Muestrear la ${n}">`;
    s += `<circle cx="${x}" cy="${y}" r="15" fill="var(--bg-2)" stroke="var(--eco)" stroke-width="2.5"/>`;
    s += `<text x="${x}" y="${y+4}" text-anchor="middle" font-weight="700" fill="var(--ink)">${n.split(' ')[1][0].toUpperCase()}</text>`;
    s += `<text x="${x}" y="${y+30}" text-anchor="middle">${n}</text></g>`;
  });
  return s + '</svg>';
}

route('/mision/ecosistema-riesgo', (view) => {
  view.classList.add('wide');
  const ACT = 'mision-ecosistema-riesgo';
  const PASOS = [
    { id:'caso',  n:'El caso' },
    { id:'serie', n:'Histórico' },
    { id:'zonas', n:'Muestreo' },
    { id:'corr',  n:'Correlación' },
    { id:'archivo', n:'Archivo' },
    { id:'acusa', n:'Diagnóstico' },
    { id:'manejo', n:'Decisión' }
  ];
  const S = { idx:0, fin:false, errores:0, puntos:0, total:6, hip:null, zonas:new Set(), fichas:new Set(),
              culpa:null, evid:new Set(), desc:{}, manejo:null, inicio:Date.now() };

  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{},
    h('span',{class:'eyebrow mis'},'Misión biológica · Unidad 7 · Ecología'),
    h('h1',{},'El ecosistema en riesgo'),
    h('p',{},'La concha prieta se está acabando en el manglar de Cañaveral. Cinco explicaciones compiten y solo una resiste las evidencias. Tu trabajo es decidir cuál, y sostenerlo con datos.')),
    h('span',{class:'pill mis'},'+140 XP · 15 min')));

  view.append(purposeBanner({
    proposito:'Diagnosticar la causa del colapso de una población usando evidencia: comparar zonas, ordenar los hechos en el tiempo y distinguir una correlación de una causa.',
    observa:['Qué variable cambió antes que la concha prieta','Qué ocurre en dos zonas que comparten nitratos pero no cobertura de manglar','Qué falta en el banco de conchas: los adultos grandes o los juveniles'],
    reto:'Acusa a una sola causa, sostenla con tres evidencias y explica con qué evidencia descartas cada una de las otras cuatro hipótesis.',
    done: !!Store.s.activities[ACT]?.done
  }));

  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'mission mis3-mision'}, stage, panel));
  const overlay = h('div',{class:'mis3-ov'});
  let E = null;
  if (webglOK){
    try {
      E = new Engine3D(stage, { radius:15.5, phi:1.08, theta:0.36, minR:7, maxR:30, target:[0.5,0.3,0.7],
        aria:'Escena 3D del manglar de Cañaveral. Arrastra para rotar; usa los botones de zona del panel para muestrear con el teclado.',
        onSelect:(id) => { if (id && id.indexOf('mis3-z-') === 0) muestrear(id.slice(7)); } });
      const r = mis3Manglar(E, E.low);
      /* piscinas camaroneras junto a la zona sur: el 3D cuenta el caso, no solo decora */
      E.addPart('camaroneras', mis3Piscinas());
      E.addLabel('camaroneras', 'Piscinas camaroneras', [6.65, 1.3, 4.1], [6.65, 0.4, 4.1]);
      MIS3_ZONAS.forEach((z,i) => {
        const col = [0x2E8B57, 0xC98A16, 0xC2452F][i], y0 = mis3Alt(z.at[0], z.at[2]);
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 1.6, 8), mis3Mat('#8A8070', { roughness:0.6 })); post.position.set(z.at[0], y0 + 0.65, z.at[2]);
        const boya = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 14), mat(mis3Lin('#' + col.toString(16).padStart(6,'0')), { roughness:0.35, clearcoat:0.8, clearcoatRoughness:0.2 })); boya.position.set(z.at[0], 1.55, z.at[2]);
        const faja = new THREE.Mesh(new THREE.TorusGeometry(0.282, 0.035, 8, 28), mis3Mat('#F4F1EA', { roughness:0.5 })); faja.rotation.x = Math.PI/2; faja.position.set(z.at[0], 1.55, z.at[2]);
        const flot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.1, 16), mis3Mat('#E9E4DA', { roughness:0.6 })); flot.position.set(z.at[0], 0.04, z.at[2]);
        E.addPart('mis3-z-' + z.id, [post, boya, faja, flot]);
        E.addLabel('mis3-z-' + z.id, z.n.split(' · ')[0], [z.at[0], 2.75, z.at[2]], [z.at[0], 1.86, z.at[2]]);
      });
      E.onFrame((t) => { if (!mis3Quieto() && r.agua) r.agua.offset.set(t*0.012, t*0.007); });
      E.setLabels(true);
    } catch(e){ console.warn('mis3 manglar 3D', e); if (E){ try { E.dispose(); } catch(e2){} } E = null; }
  }
  if (!E){
    stage.append(h('div',{class:'ph',style:'padding:14px'},
      h('div',{class:'stack'}, h('span',{class:'small muted'},'Sin WebGL: mapa del estuario (mismas zonas, mismo muestreo).'),
        (function(){ const w = h('div',{html:mis3MapaSVG()});
          const act = e => { const g = e.target.closest('.zn'); if (g) muestrear(g.dataset.zona); };
          w.addEventListener('click', act);
          w.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); act(e); } });
          return w; })())));
  }
  stage.append(overlay);
  stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Caso construido con datos verosímiles del Pacífico ecuatoriano; no corresponde a un estuario real concreto.')));

  const rutaEl = h('div',{class:'route'}), cuerpo = h('div',{class:'stack'});
  panel.append(h('div',{class:'card stack'}, rutaEl, cuerpo));

  /* ---------- muestreo de zonas (3D, mapa o botones) ---------- */
  let zonaBox = null, zonaFicha = null, zonaListo = null;
  function muestrear(id){
    const z = MIS3_ZONAS.find(x => x.id === id); if (!z) return;
    if (S.idx !== 2) { toast('El muestreo se hace en la estación «Muestreo».'); return; }
    S.zonas.add(id);
    if (E) { E.select('mis3-z-' + id); E.focus(V3([z.at[0], 1.2, z.at[2]]), 10); }
    Store.log('mision_evidencia',{ mision:'ecosistema-riesgo', tipo:'zona', zona:id });
    if (zonaFicha){
      zonaFicha.innerHTML = '';
      zonaFicha.append(h('b',{}, z.em + ' ' + z.n),
        h('table',{class:'data',style:'margin-top:6px'},
          h('tbody',{},
            [['Cobertura de manglar', z.manglar], ['Nitratos', z.nitratos], ['Concha prieta adulta', z.concha], ['Juveniles (<2 cm)', z.juveniles]]
              .map(([k,v]) => h('tr',{}, h('td',{},k), h('td',{class:'num'},v))))),
        h('p',{class:'small muted',style:'margin-top:6px'}, z.resumen));
    }
    if (zonaBox) pintaZonas();
    if (S.zonas.size === 3 && zonaListo) zonaListo();
  }
  function pintaZonas(){
    if (!zonaBox) return;
    zonaBox.innerHTML = '';
    MIS3_ZONAS.forEach(z => {
      const hecho = S.zonas.has(z.id);
      zonaBox.append(h('button',{class:'mis3-zona','aria-pressed':String(hecho),
        'aria-label':`Muestrear ${z.n}${hecho?' (ya muestreada)':''}`, onclick:()=>muestrear(z.id)},
        h('b',{}, z.em + ' ' + z.n.split(' · ')[0]),
        h('small',{}, z.n.split(' · ')[1]),
        hecho ? h('span',{class:'mis3-ok'},'✓ muestreada') : h('small',{},'sin muestrear')));
    });
  }

  /* ---------- gráfico del histórico ---------- */
  /* rel:true → cada serie se escala a su propio máximo (0–100): sirve para comparar
     la FORMA y el momento del cambio, no la magnitud. Los valores reales van en la tabla. */
  function grafico(activas, opts){
    const rel = !!(opts && opts.rel);
    const box = h('div',{class:'mis3-chartbox'}), cv = h('canvas',{'aria-hidden':'true'});
    box.append(cv);
    setTimeout(()=>{ try {
      let tope = 0;
      const series = activas.map(k => { const s = MIS3_SERIES[k];
        const base = rel ? Math.max.apply(null, s.v) : s.v[0];
        const pts = MIS3_ANIOS.map((a,i)=>({ x:a, y: s.v[i]/base*100 }));
        pts.forEach(p => { if (p.y > tope) tope = p.y; });
        return { pts, color: mis3Col(s.col, s.alt), label:s.n, dots:true }; });
      lineChart(cv, { series, xlabel:'Año',
        ylabel: rel ? 'Escala relativa (100 = máximo de cada serie)' : 'Índice (2014 = 100)',
        ymin:0, ymax: Math.max(120, Math.round(tope*1.18)), xticks:5,
        xfmt:v=>String(Math.round(v)), yfmt:v=>String(Math.round(v)) });
    } catch(e){ console.warn('grafico', e); } }, 30);
    return box;
  }
  function tablaSerie(){
    const t = h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Año'), Object.values(MIS3_SERIES).map(s=>h('th',{}, s.n + ' (' + s.u + ')')))),
      h('tbody',{}, MIS3_ANIOS.map((a,i)=>h('tr',{}, h('td',{},String(a)),
        Object.values(MIS3_SERIES).map(s=>h('td',{class:'num'}, mis3Num(s.v[i], s.d)))))));
    return h('div',{class:'tablewrap'}, t);
  }

  /* ---------- render de estaciones ---------- */
  function siguiente(txt, fn){
    const b = h('button',{class:'btn primary',style:'align-self:flex-start;display:none',onclick:fn}, txt);
    return b;
  }
  function show(){
    mis3Ruta(rutaEl, PASOS, S.idx, S.fin);
    cuerpo.innerHTML = ''; overlay.style.display = 'none'; overlay.innerHTML = '';
    zonaBox = zonaFicha = zonaListo = null;
    const p = PASOS[S.idx];
    if (E && p.id !== 'zonas'){ E.select(null); E.resetView(); }
    Store.log('mision_paso',{ mision:'ecosistema-riesgo', paso:p.id, indice:S.idx });
    cuerpo.append(h('div',{class:'row',style:'justify-content:space-between'},
      h('span',{class:'eyebrow mis'},`Estación ${S.idx+1} de ${PASOS.length}`),
      h('span',{class:'mono small muted'},`${S.errores} errores`)));
    const next = siguiente(S.idx === PASOS.length-1 ? 'Cerrar el caso' : 'Continuar →',
      ()=>{ S.idx++; if (S.idx >= PASOS.length){ S.fin = true; S.idx = PASOS.length-1; } show(); });
    const listo = () => { next.style.display = ''; try { next.focus(); } catch(e){} };
    if (p.id === 'caso') estCaso(listo);
    if (p.id === 'serie') estSerie(listo);
    if (p.id === 'zonas') estZonas(listo);
    if (p.id === 'corr') estCorr(listo);
    if (p.id === 'archivo') estArchivo(listo);
    if (p.id === 'acusa') estAcusa(listo);
    if (p.id === 'manejo'){ estManejo(); return; }
    cuerpo.append(next);
  }

  function estCaso(listo){
    cuerpo.append(h('h3',{},'La denuncia'),
      h('p',{style:'font-size:.92rem'},'La asociación de concheros de Cañaveral, en la costa ecuatoriana, lleva años viendo menos concha prieta (Anadara tuberculosa). En 2014 sacaban unas 12 conchas por metro cuadrado; hoy sacan 3. El Ministerio del Ambiente pide un diagnóstico antes de decidir qué medida tomar.'),
      h('div',{class:'notice info'},'Cinco hipótesis están sobre la mesa. Al final tendrás que acusar a una sola y descartar las otras cuatro con evidencia, no con opinión.'),
      h('ul',{class:'small',style:'margin:0;padding-left:18px'}, MIS3_CULPA.map(c => h('li',{}, c.t))),
      h('p',{style:'font-weight:600;margin-top:8px'},'Antes de ver un solo dato, ¿cuál sospechas? (no se evalúa: es tu punto de partida)'));
    const fb = h('div',{class:'notice',style:'display:none'});
    const box = h('div',{class:'stack'});
    MIS3_CULPA.forEach((c,i) => box.append(h('button',{class:'opt',onclick:function(){
      if (S.hip) return; S.hip = c.id;
      $$('button.opt', box).forEach(b => b.disabled = true); this.classList.add('ok');
      fb.className = 'notice'; fb.innerHTML = '<span><b>Hipótesis de partida registrada.</b> Toda hipótesis vale al empezar: lo que la convierte en diagnóstico es la evidencia. Ve a buscarla y prepárate para abandonarla si los datos no la sostienen.</span>';
      fb.style.display = 'flex';
      Store.log('mision_hipotesis',{ mision:'ecosistema-riesgo', hipotesis:c.id }); listo();
    }}, h('span',{class:'k'},String.fromCharCode(65+i)), c.t)));
    cuerpo.append(box, fb);
  }

  function estSerie(listo){
    const activas = new Set(['concha','manglar']);
    const graf = h('div',{});
    const pinta = () => { graf.innerHTML = ''; graf.append(grafico(Array.from(activas))); };
    const chips = h('div',{class:'row'});
    Object.entries(MIS3_SERIES).forEach(([k,s]) => {
      const b = h('button',{class:'chip' + (activas.has(k) ? ' picked' : ''), 'aria-pressed':String(activas.has(k)),
        onclick:function(){ if (activas.has(k)) activas.delete(k); else activas.add(k);
          if (!activas.size){ activas.add(k); return; }
          this.classList.toggle('picked', activas.has(k)); this.setAttribute('aria-pressed', String(activas.has(k))); pinta(); }},
        h('i',{style:`display:inline-block;width:12px;height:3px;border-radius:2px;background:${mis3Col(s.col,s.alt)}`}), s.n);
      chips.append(b);
    });
    cuerpo.append(h('h3',{},'Once años de datos'),
      h('p',{class:'small muted'},'Todas las series están en índice (valor de 2014 = 100) para poder compararlas en un mismo gráfico. Enciende y apaga series; la tabla de abajo tiene los valores reales.'),
      chips, graf, h('details',{class:'mis3-ficha'}, h('summary',{},'Ver la tabla de datos completa'), tablaSerie()));
    pinta();
    cuerpo.append(h('div',{style:'height:6px'}));
    cuerpo.append(quizBlock({
      q:'Mirando el orden de los hechos, ¿qué se puede afirmar?',
      ops:[
        'La concha empezó a caer primero y el manglar después: perder la concha desestabilizó el bosque',
        'El manglar, las piscinas y los nitratos cambian desde 2016; la concha empieza a caer en 2017. Lo que cambió primero está en la costa, no en el banco de conchas',
        'Todas las variables cambian a la vez, así que la serie temporal no sirve para nada',
        'Los concheros son cada vez menos, así que ellos son la causa del colapso'
      ], ok:1,
      fb:'Una causa no puede empezar después de su efecto. El manglar cae en 2016 y la concha en 2017. Ojo: los nitratos y las piscinas también arrancan en 2016, así que la serie temporal deja tres sospechosos empatados. Para separarlos hay que comparar zonas.',
      wrong:[
        'Revisa los valores: en 2016 el manglar ya bajó de 812 a 760 ha y la concha seguía en 12,0 ind/m². El manglar se movió primero.',
        'No cambian a la vez: la concha reacciona un año después. Y aunque coincidieran, comparar zonas todavía podría separarlas.',
        'Los concheros bajan de forma suave durante los once años, sin el quiebre de 2016–2017, y además son cada vez menos: menos extracción, no más.'
      ]
    }, att => { S.errores += att-1; if (att === 1) S.puntos++; mis3Ruta(rutaEl, PASOS, S.idx, S.fin); listo(); }));
  }

  function estZonas(listo){
    zonaListo = listo;
    cuerpo.append(h('h3',{},'Sal a muestrear'),
      h('p',{class:'small muted'},'Muestrea las tres zonas del estuario: toca la boya en el modelo 3D o usa los botones (también con el tabulador). Cada muestreo te da cobertura de manglar, nitratos, densidad de concha adulta y densidad de juveniles.'));
    zonaBox = h('div',{class:'mis3-zonas'}); cuerpo.append(zonaBox); pintaZonas();
    zonaFicha = h('div',{class:'mis3-ficha'}); zonaFicha.append(h('span',{class:'small muted'},'Selecciona una zona para ver su ficha.'));
    cuerpo.append(zonaFicha);
    const preg = h('div',{class:'stack'});
    cuerpo.append(preg);
    const original = listo;
    zonaListo = () => {
      if (preg.childElementCount) return;
      preg.append(h('div',{class:'notice ok'},'Tres zonas muestreadas. Compara la norte con la sur antes de responder.'),
        quizBlock({
          q:'La zona norte y la zona sur tienen casi los mismos nitratos (2,0 y 2,1 mg/L) y densidades de concha opuestas (10,8 y 1,2 ind/m²). ¿Qué permite concluir esa comparación?',
          ops:[
            'Que los nitratos no explican la diferencia: lo que cambia entre las dos zonas es la cobertura de manglar',
            'Que el muestreo está mal hecho, porque con los mismos nitratos deberían salir los mismos resultados',
            'Que la zona norte tiene mejor suerte y habría que muestrear más años',
            'Que los nitratos sí explican la diferencia, porque 2,1 es mayor que 2,0'
          ], ok:0,
          fb:'Es una comparación con control: dos zonas que comparten la variable sospechosa (nitratos) y difieren en otra (manglar) dan resultados opuestos. La que manda es la que difiere. Y esto explica también por qué las dos series iban juntas: las piscinas talan manglar y además descargan nitrógeno; una causa común, no una cadena.',
          wrong:[
            'Al revés: que con nitratos iguales salgan resultados opuestos es justamente el resultado informativo. Significa que los nitratos no son lo que decide.',
            'La zona media completa el patrón: 70 % de manglar, 5,4 conchas/m². Tres puntos ordenados no son suerte, son un gradiente.',
            '0,1 mg/L de diferencia no puede producir una diferencia de nueve veces en la densidad de concha. Busca qué otra variable sí difiere entre las dos zonas.'
          ]
        }, att => { S.errores += att-1; if (att === 1) S.puntos++; mis3Ruta(rutaEl, PASOS, S.idx, S.fin); original(); }));
    };
    if (S.zonas.size === 3) zonaListo();
  }

  function estCorr(listo){
    cuerpo.append(h('h3',{},'La correlación tentadora'),
      h('p',{style:'font-size:.92rem'},'Un informe preliminar concluye: «los nitratos y la concha prieta están correlacionados de manera casi perfecta (r = −0,98); por lo tanto, los nitratos causan el colapso».'),
      grafico(['concha','nitratos'], { rel:true }),
      h('p',{class:'small muted'},'Y la correlación es real: cuando los nitratos suben, la concha baja, año tras año.'));
    cuerpo.append(quizBlock({
      q:'¿Por qué esa correlación no basta para acusar a los nitratos?',
      ops:[
        'Porque r = −0,98 es un valor demasiado alto para ser fiable',
        'Porque una tercera variable —las piscinas camaroneras— produce los dos efectos a la vez: talan el manglar y descargan nitrógeno. La correlación es real, pero la causa es común',
        'Porque la correlación es negativa y las correlaciones negativas no sirven',
        'Porque once años son pocos datos para calcular una correlación'
      ], ok:1,
      fb:'Es el caso clásico de causa común (variable de confusión). El muestreo por zonas fue el experimento natural que lo resolvió: donde los nitratos son altos pero el manglar está en pie, la concha está sana.',
      wrong:[
        'Un valor alto de r no es sospechoso en sí mismo; el problema no es la fuerza de la relación sino su interpretación causal.',
        'El signo solo indica la dirección: cuando una sube, la otra baja. Una correlación negativa informa exactamente igual que una positiva.',
        'Con más años la correlación seguiría saliendo alta, porque las dos variables comparten la misma causa. Más datos del mismo tipo no arreglan una confusión: hace falta comparar casos que separen las variables.'
      ]
    }, att => { S.errores += att-1; if (att === 1) S.puntos++; mis3Ruta(rutaEl, PASOS, S.idx, S.fin); listo(); }));
  }

  function estArchivo(listo){
    cuerpo.append(h('h3',{},'El archivo del caso'),
      h('p',{class:'small muted'},'Cinco documentos. Ábrelos todos: alguno de ellos es la única forma de descartar una de las hipótesis.'));
    const st = h('div',{class:'notice'},'Documentos abiertos: 0 de 5.');
    MIS3_FICHAS.forEach(f => {
      const d = h('details',{class:'mis3-ficha'}, h('summary',{}, f.t), h('p',{}, f.d));
      d.addEventListener('toggle', () => {
        if (!d.open) return;
        S.fichas.add(f.id);
        Store.log('mision_evidencia',{ mision:'ecosistema-riesgo', tipo:'ficha', ficha:f.id });
        if (S.fichas.size === MIS3_FICHAS.length){
          st.className = 'notice ok';
          st.textContent = 'Archivo completo. Ya tienes todo lo necesario para acusar y, sobre todo, para descartar.';
          listo();
        } else st.textContent = `Documentos abiertos: ${S.fichas.size} de ${MIS3_FICHAS.length}.`;
      });
      cuerpo.append(d);
    });
    cuerpo.append(st);
    if (S.fichas.size === MIS3_FICHAS.length){ st.className = 'notice ok'; listo(); }
  }

  function estAcusa(listo){
    cuerpo.append(h('h3',{},'Tu diagnóstico'), h('p',{style:'font-weight:600'},'1. ¿Cuál es la causa del colapso?'));
    const fb1 = h('div',{class:'notice',style:'display:none'});
    const box = h('div',{class:'stack'});
    const paso2 = h('div',{class:'stack',style:'display:none'});
    const paso3 = h('div',{class:'stack',style:'display:none'});
    let intentos = 0;
    MIS3_CULPA.forEach((c,i) => box.append(h('button',{class:'opt',onclick:function(){
      if (S.culpa) return; intentos++;
      if (c.ok){
        S.culpa = c.id; this.classList.add('ok');
        $$('button.opt', box).forEach(b => b.disabled = true);
        if (intentos === 1) S.puntos++;
        fb1.className = 'notice ok';
        fb1.innerHTML = '<span><b>Acusación correcta: la tala del manglar para abrir piscinas.</b> El manglar es la guardería de la concha: sus raíces sostienen el fango donde se asientan las larvas. Sin raíces no hay reclutamiento, y por eso lo que falta son los juveniles, no los adultos grandes. Ahora demuéstralo.</span>';
        fb1.style.display = 'flex'; abrirEvidencias();
      } else {
        S.errores++; this.classList.add('bad');
        fb1.className = 'notice warn'; fb1.innerHTML = `<span><b>Aún no.</b> ${esc(c.fb)}</span>`; fb1.style.display = 'flex';
        mis3Ruta(rutaEl, PASOS, S.idx, S.fin);
      }
      Store.log('mision_diagnostico',{ mision:'ecosistema-riesgo', elegido:c.id, correcto:!!c.ok, intento:intentos });
    }}, h('span',{class:'k'},String.fromCharCode(65+i)), c.t)));
    cuerpo.append(box, fb1, paso2, paso3);

    function abrirEvidencias(){
      paso2.style.display = '';
      paso2.append(h('p',{style:'font-weight:600'},'2. Elige exactamente las tres evidencias que sostienen tu acusación.'),
        h('p',{class:'small muted'},'Cuidado: hay evidencias verdaderas que no sostienen esta acusación (sirven para descartar otras hipótesis) y una que parece sostenerla pero no lo hace.'));
      const lista = h('div',{class:'stack'});
      const fb2 = h('div',{class:'notice',style:'display:none'});
      const btn = h('button',{class:'btn primary sm',style:'align-self:flex-start',onclick:comprobar},'Comprobar las evidencias');
      MIS3_EVID.forEach((ev,i) => lista.append(h('button',{class:'mis3-ev','aria-pressed':'false',
        onclick:function(){ if (this.classList.contains('ok') || this.classList.contains('bad')) return;
          if (S.evid.has(ev.id)) S.evid.delete(ev.id); else { if (S.evid.size >= 3) return toast('Ya elegiste tres evidencias. Suelta una antes de tomar otra.'); S.evid.add(ev.id); }
          this.setAttribute('aria-pressed', String(S.evid.has(ev.id)));
        }}, h('span',{class:'mis3-k'},String.fromCharCode(65+i)), ev.t)));
      paso2.append(lista, btn, fb2);
      function comprobar(){
        if (S.evid.size !== 3) return toast('Elige exactamente tres evidencias.');
        let bien = 0;
        $$('button.mis3-ev', lista).forEach((b,i) => {
          const ev = MIS3_EVID[i]; if (!S.evid.has(ev.id)) return;
          b.classList.add(ev.sirve ? 'ok' : 'bad'); if (ev.sirve) bien++;
        });
        const perfecto = bien === 3;
        if (perfecto) S.puntos++; else S.errores++;
        btn.style.display = 'none';
        fb2.className = 'notice ' + (perfecto ? 'ok' : 'warn');
        fb2.innerHTML = perfecto
          ? '<span><b>Las tres correctas.</b> Orden temporal (el manglar se mueve primero), comparación entre zonas (el manglar decide, no los nitratos) y estructura de la población (faltan los juveniles, que es justo lo que produce la pérdida de la guardería). Juntas cierran el argumento.</span>'
          : `<span><b>${bien} de 3.</b> Las que sostienen la acusación son: el orden temporal (el manglar cae antes que la concha), la comparación entre zonas (mismos nitratos, manglar distinto, resultados opuestos) y la falta de juveniles (el banco no se repone porque no hay dónde asentarse). La correlación de los nitratos es real pero confundida; el esfuerzo pesquero, la salinidad y la fecha del mejillón sirven para descartar otras hipótesis, no para sostener esta.</span>`;
        fb2.style.display = 'flex';
        Store.log('mision_evidencias',{ mision:'ecosistema-riesgo', elegidas:Array.from(S.evid), aciertos:bien });
        abrirDescartes();
      }
    }

    function abrirDescartes(){
      paso3.style.display = '';
      paso3.append(h('p',{style:'font-weight:600'},'3. Descarta las otras cuatro hipótesis: asigna a cada una la evidencia que la deja fuera.'));
      const fb3 = h('div',{class:'notice',style:'display:none'});
      const filas = MIS3_DESCARTES.map(d => {
        const sel = h('select',{'aria-label':`Evidencia que descarta: ${d.n}`},
          h('option',{value:''},'— elige una evidencia —'),
          MIS3_EVID.map(ev => h('option',{value:ev.id}, String.fromCharCode(65+MIS3_EVID.indexOf(ev)) + '. ' + ev.t.slice(0,58) + (ev.t.length>58?'…':''))));
        const fila = h('div',{class:'mis3-desc'}, h('span',{}, d.n), sel);
        paso3.append(fila);
        return { d, sel, fila };
      });
      const btn = h('button',{class:'btn primary sm',style:'align-self:flex-start',onclick:comprobar},'Comprobar los descartes');
      paso3.append(btn, fb3);
      function comprobar(){
        if (filas.some(f => !f.sel.value)) return toast('Asigna una evidencia a cada hipótesis.');
        let bien = 0; const detalle = [];
        filas.forEach(f => {
          const ok = f.sel.value === f.d.ok;
          f.fila.className = 'mis3-desc ' + (ok ? 'ok' : 'bad');
          if (ok){ bien++; detalle.push(`<b>${esc(f.d.n)}:</b> ${esc(f.d.fb)}`); }
          else detalle.push(`<b>${esc(f.d.n)} —aún no—:</b> ${esc(f.d.mal)} ${esc(f.d.fb)}`);
          S.desc[f.d.id] = f.sel.value;
        });
        const perfecto = bien === filas.length;
        if (perfecto) S.puntos++; else S.errores++;
        btn.style.display = 'none';
        filas.forEach(f => f.sel.disabled = true);
        fb3.className = 'notice ' + (perfecto ? 'ok' : 'warn');
        fb3.innerHTML = `<span><b>${bien} de ${filas.length} descartes correctos.</b><br>` + detalle.join('<br>') + '</span>';
        fb3.style.display = 'flex';
        Store.log('mision_descartes',{ mision:'ecosistema-riesgo', aciertos:bien, respuestas:S.desc });
        mis3Ruta(rutaEl, PASOS, S.idx, S.fin);
        listo();
      }
    }
  }

  function estManejo(){
    cuerpo.append(h('h3',{},'La decisión de manejo'),
      h('p',{style:'font-size:.92rem'},'El Ministerio pregunta qué hacer. Un diagnóstico correcto con una medida equivocada deja el ecosistema igual.'));
    const fb = h('div',{class:'notice',style:'display:none'});
    const box = h('div',{class:'stack'});
    const cierre = h('div',{class:'stack'});
    MIS3_MANEJO.forEach((m,i) => box.append(h('button',{class:'opt',onclick:function(){
      if (S.manejo) return;
      if (m.ok){
        S.manejo = i; this.classList.add('ok'); $$('button.opt', box).forEach(b => b.disabled = true);
        fb.className = 'notice ok'; fb.innerHTML = `<span><b>Buena decisión.</b> ${esc(m.fb)}</span>`; fb.style.display = 'flex';
        argumento();
      } else {
        S.errores++; this.classList.add('bad');
        fb.className = 'notice warn'; fb.innerHTML = `<span><b>Aún no.</b> ${esc(m.fb)}</span>`; fb.style.display = 'flex';
      }
      Store.log('mision_manejo',{ mision:'ecosistema-riesgo', opcion:i, correcto:!!m.ok });
    }}, h('span',{class:'k'},String.fromCharCode(65+i)), m.t)));
    cuerpo.append(box, fb, cierre);

    function argumento(){
      const ta = h('textarea',{ placeholder:'Escribe tu informe (mínimo 60 caracteres): causa acusada, evidencias que la sostienen y una hipótesis que descartaste con su evidencia.', 'aria-label':'Informe final del diagnóstico', rows:4, style:'width:100%' });
      const fb2 = h('div',{class:'notice',style:'display:none'});
      cierre.append(h('p',{style:'font-weight:600'},'Escribe el informe: es lo que se evalúa, no solo el acierto.'), ta,
        h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{
          const t = ta.value.trim();
          if (t.length < 60) return toast('Desarrolla el informe: al menos 60 caracteres.');
          const bajo = t.toLowerCase();
          const marcas = [
            { k:['manglar','mangle','tala','camaron'], t:'la causa (la pérdida de manglar por las piscinas)' },
            { k:['zona','norte','sur','compar'], t:'la comparación entre zonas' },
            { k:['juvenil','larva','cría','cria','reclut'], t:'por qué faltan los juveniles' },
            { k:['nitrato','correlac','causa común','causa comun','confus'], t:'la diferencia entre correlación y causa' },
            { k:['2016','2017','antes','primero','orden'], t:'el orden temporal de los hechos' }
          ];
          const tiene = marcas.filter(m => m.k.some(k => bajo.includes(k)));
          const falta = marcas.filter(m => !tiene.includes(m));
          fb2.className = 'notice ' + (tiene.length >= 3 ? 'ok' : 'warn');
          fb2.innerHTML = '<span><b>' + (tiene.length >= 3 ? 'Informe sólido.' : 'Informe incompleto.') + '</b> ' +
            (tiene.length ? 'Tu informe incluye: ' + esc(tiene.map(m=>m.t).join('; ')) + '. ' : '') +
            (falta.length ? 'Para que el argumento cierre, añade: ' + esc(falta.map(m=>m.t).join('; ')) + '.' : 'Están los cuatro pilares del argumento: causa, orden temporal, comparación controlada y descarte de la correlación espuria.') + '</span>';
          fb2.style.display = 'flex';
          Store.addNote('conclusion','Informe (misión El ecosistema en riesgo): ' + t);
          Store.log('respuesta_abierta',{ actividad:ACT, longitud:t.length, pilares:tiene.length });
          finalizar(tiene.length);
        }},'Entregar el informe'), fb2);
    }

    function finalizar(pilares){
      if (cuerpo.querySelector('.mis3-fin')) return;
      const min = Math.max(1, Math.round((Date.now()-S.inicio)/60000));
      const primera = !Store.s.activities[ACT]?.done;
      Store.completeActivity(ACT, { score:`${S.puntos}/${S.total}`, attempts:S.errores, duracionMin:min, pilares });
      try { Store.grantBadge('ecologo'); } catch(e){}
      S.fin = true; mis3Ruta(rutaEl, PASOS, S.idx, true);
      const fin = h('div',{class:'stack mis3-fin'});
      mis3Cierre(fin, h('span',{}, h('b',{},`Caso cerrado · ${S.puntos}/${S.total} en el razonamiento · ${S.errores} errores.`),
        primera ? ' Has ganado 140 XP y la insignia Ecólogo.' : ' Ya habías resuelto este caso; el registro se actualizó.',
        ' La concha prieta no se acabó porque la pescaran: se acabó porque le quitaron la guardería.'));
      fin.append(h('div',{class:'row'},
        h('a',{class:'btn',href:'#/explorar/ecosistemas'},'Ver el manglar en detalle'),
        h('a',{class:'btn',href:'#/cn/eco/red-trofica'},'Red trófica'),
        h('a',{class:'btn primary',href:'#/misiones'},'Volver a misiones')));
      cuerpo.append(fin);
    }
  }

  show();
  return { unmount(){ if (E){ try { E.dispose(); } catch(e){} } E = null; } };
});

/* =====================================================================
   MISIÓN 2 · CÓDIGO GENÉTICO
   Caso de asesoramiento genético: la familia Zambrano consulta por el
   daltonismo (ligado al X). Lo más valioso de la misión no es el cálculo:
   es comunicar bien una probabilidad a una familia.
   ===================================================================== */
const MIS3_XD = 'Xᴰ', MIS3_XR = 'Xᵈ';
const MIS3_PED = {
  gente:[
    { id:'I-1',  nom:'Jorge (abuelo materno)', sexo:'h', af:true,  x:150, y:58,  gen:'XdY',
      por:'Es daltónico y el gen está en el X: con su único X portando el alelo Xᵈ, ya manifiesta el daltonismo. No tiene un segundo X que lo compense.' },
    { id:'I-2',  nom:'Rosa (abuela materna)', sexo:'m', af:false, x:280, y:58,  gen:'XDXd',
      por:'Ve los colores normalmente, pero su hijo Andrés es daltónico. Un hijo varón recibe su único X de la madre: ese Xᵈ vino de ella. Es portadora obligada.' },
    { id:'II-1', nom:'Lucía (la consultante)', sexo:'m', af:false, x:210, y:170, gen:'XDXd',
      por:'Su padre es daltónico (XᵈY) y a toda hija le pasa su único X, que lleva Xᵈ. Como Lucía ve bien, su otro X (el de la madre) es Xᴰ. Es portadora con certeza: no hay otra opción.' },
    { id:'II-2', nom:'Andrés (hermano de Lucía)', sexo:'h', af:true,  x:80,  y:170, gen:'XdY',
      por:'Daltónico: su único X lleva Xᵈ y lo recibió de su madre, Rosa.' },
    { id:'II-3', nom:'Marco (esposo de Lucía)', sexo:'h', af:false, x:340, y:170, gen:'XDY',
      por:'Ve los colores normalmente y solo tiene un X: ese X lleva Xᴰ. En los hombres no existe el estado de portador para un gen del X.' },
    { id:'III-1',nom:'Sofía (hija, 8 años)', sexo:'m', af:false, x:150, y:282, gen:'XDXD/XDXd',
      por:'De su padre recibió Xᴰ con seguridad, así que ve bien pase lo que pase. De su madre pudo recibir Xᴰ o Xᵈ: es portadora con probabilidad 1/2 y no hay forma de saberlo solo con el árbol.' },
    { id:'III-3',nom:'Iván (hijo, 3 años)', sexo:'h', af:false, x:340, y:282, gen:'XDY',
      por:'Es varón y ve bien: su único X tiene que ser Xᴰ. En los varones el fenotipo revela el genotipo directamente, sin ambigüedad.' }
  ],
  otros:[ { id:'III-2', nom:'Emilia (hija, 6 años)', sexo:'m', af:false, x:245, y:282 },
          { id:'III-4', nom:'embarazo', sexo:'?', af:false, x:430, y:282 } ],
  lineas:[ ['M',150,58,280,58], ['V',215,58,114], ['H',80,114,215,114], ['V',80,114,170], ['V',210,114,170],
           ['M',210,170,340,170], ['V',275,170,226], ['H',150,226,430,226],
           ['V',150,226,282], ['V',245,226,282], ['V',340,226,282], ['V',430,226,282] ],
  ops:['XDXD','XDXd','XdXd','XDY','XdY','XDXD/XDXd']
};
function mis3Gen(g){ return String(g).replace(/XD/g, MIS3_XD).replace(/Xd/g, MIS3_XR).replace(/\//g, ' o '); }

const MIS3_COMUNICA = [
  { t:'«En cada embarazo hay 1 posibilidad entre 4 (25 %) de que el bebé sea daltónico: 50 % si es varón y 0 % si es niña. Esa probabilidad es exactamente la misma en este embarazo que en los tres anteriores.»', ok:true,
    fb:'Da el número, lo desglosa por sexo, y deja claro que cada embarazo es independiente. Eso es comunicar una probabilidad: informar sin asustar y sin prometer.' },
  { t:'«Como ya tuvieron tres hijos que ven bien, a este le toca salir daltónico.»',
    fb:'Es la falacia del jugador. Los gametos no llevan la cuenta de lo que pasó antes: cada fecundación es un evento independiente y la probabilidad sigue siendo 1/4.' },
  { t:'«Como ya tuvieron tres hijos que ven bien, el riesgo en este embarazo es menor.»',
    fb:'Es la misma falacia al revés. Los embarazos anteriores no gastan ni acumulan riesgo: la probabilidad no se mueve, sigue en 1/4.' },
  { t:'«De cada cuatro hijos, exactamente uno es daltónico. Ustedes ya tienen tres sanos, así que el cuarto lo será.»',
    fb:'Confunde probabilidad con reparto garantizado. "1 de cada 4" es una proporción esperada en muchísimos casos, no una cuota que se cumpla dentro de una familia: una familia de cuatro hijos puede tener cero o cuatro daltónicos.' },
  { t:'«Como Lucía ve los colores con normalidad, no hay ningún riesgo para sus hijos.»',
    fb:'Confunde fenotipo con genotipo. Lucía ve bien porque su otro X lleva Xᴰ, pero es portadora: la mitad de sus óvulos llevan Xᵈ. Justamente por eso la familia vino a consultar.' }
];
const MIS3_FALACIA = [
  { t:'«Sí, la naturaleza compensa: después de tres que ven bien, viene uno daltónico.»',
    fb:'La naturaleza no compensa nada. Cada óvulo se forma en una meiosis independiente y lleva Xᴰ o Xᵈ con la misma probabilidad, sin importar qué óvulo se fecundó hace tres años.' },
  { t:'«No, don Marco. Cada embarazo es independiente: el óvulo de este embarazo no "sabe" qué pasó en los anteriores. La probabilidad sigue siendo 1 de cada 4, ni más ni menos.»', ok:true,
    fb:'Responde a la creencia sin ridiculizarla y da el mecanismo: cada meiosis es un sorteo nuevo. Nombrar el mecanismo es lo que hace creíble el número.' },
  { t:'«Al contrario: ya pasó lo difícil, ahora el riesgo es mucho más bajo.»',
    fb:'Misma falacia con el signo cambiado. Ni sube ni baja: sigue en 1/4 en cada embarazo.' }
];

function mis3PedSVG(S){
  /* v1.7 · mismo dibujo de pedigrí que el laboratorio de genética (genPedSVG, archivo 41) */
  const gente = MIS3_PED.gente.map(p => { const done = !!S.ok[p.id];
    return { id:p.id, sexo:p.sexo, af:p.af, x:p.x, y:p.y, clic:true, sel:S.sel === p.id, cap:p.nom.split(' (')[0], gt: done ? mis3Gen(p.gen) : null,
      estado: done && p.gen === 'XDXd' ? 'dot' : done && p.gen === 'XDXD/XDXd' ? 'duda' : null,
      aria:`${p.nom}, ${p.sexo==='h'?'hombre':'mujer'}, ${p.af?'daltónico':'ve los colores con normalidad'}${done?', genotipo '+mis3Gen(p.gen):''}` }; })
    .concat(MIS3_PED.otros.map(p => ({ id:p.sexo === '?' ? 'III-4' : p.id, sexo:p.sexo, af:false, x:p.x, y:p.y, clic:false, off:true, cap:p.nom.split(' (')[0],
      aria:`${p.nom}, ${p.sexo==='m'?'mujer':'embarazo'}, no se analiza en esta estación` })));
  return genPedSVG({ aria:'Árbol genealógico de la familia Zambrano, tres generaciones', lineas:MIS3_PED.lineas, gens:[['I',58],['II',170],['III',282]], gente });
}

route('/mision/codigo-genetico', (view) => {
  view.classList.add('wide');
  const ACT = 'mision-codigo-genetico';
  try { genSprite(); } catch(e){}
  const PASOS = [
    { id:'consulta', n:'La consulta' },
    { id:'pedigri',  n:'Pedigrí' },
    { id:'gametos',  n:'Gametos' },
    { id:'punnett',  n:'Punnett' },
    { id:'prob',     n:'Probabilidad' },
    { id:'comunica', n:'Comunicar' }
  ];
  const S = { idx:0, fin:false, errores:0, puntos:0, total:6, ok:{}, sel:null, inicio:Date.now(), celdas:[null,null,null,null] };

  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{},
    h('span',{class:'eyebrow mis'},'Misión biológica · Unidad 4 · Genética'),
    h('h1',{},'Código genético'),
    h('p',{},'Lucía y Marco esperan su cuarto hijo y vienen a consultar. En la familia de Lucía hay daltonismo. Tu trabajo es leer el pedigrí, calcular la probabilidad real y —lo más difícil— decírsela bien.')),
    h('span',{class:'pill mis'},'+130 XP · 12 min')));

  view.append(purposeBanner({
    proposito:'Resolver un caso real de asesoramiento genético: deducir genotipos a partir de un pedigrí, predecir la descendencia y comunicar una probabilidad sin convertirla en una certeza.',
    observa:['Por qué en un varón el fenotipo revela el genotipo y en una mujer no','Qué alelo recibe con seguridad una hija de un padre daltónico','Qué parte del resultado cambia si el bebé es niño o niña'],
    reto:'Calcula la probabilidad de que el cuarto hijo sea daltónico y elige la única forma de explicárselo a la familia que no confunde probabilidad con certeza.',
    done: !!Store.s.activities[ACT]?.done
  }));

  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'mission mis3-mision'}, stage, panel));
  const overlay = h('div',{class:'mis3-ov'});
  let E = null; const CR = {};

  /* v1.7 · cromosoma en metafase: dos cromátidas hermanas con volumen (torno con extremos
     redondeados y constricción en el centrómero), unidas en el centro y abiertas en los brazos;
     bandas G sugeridas y la banda del locus del color (Xq28, cerca del extremo del brazo largo). */
  const BANDAS = { X:[[0.18,0.07],[0.36,0.06],[0.5,0.05],[-0.2,0.06],[-0.38,0.08],[-0.55,0.06],[-0.72,0.05]], Y:[[0.14,0.05],[-0.2,0.07],[-0.42,0.09]] };
  function cromatida(tipo, col, sgn, low){
    const Lp = tipo === 'Y' ? 0.34 : 0.64, Lq = tipo === 'Y' ? 0.74 : 1.02, R0 = 0.16, NP = low ? 30 : 56;
    const prof = [];
    for (let i=0;i<=NP;i++){ const y = -Lq + (Lp + Lq)*i/NP;
      const L = y >= 0 ? Lp : Lq, u = Math.abs(y);
      let r = R0*(1 - 0.42*Math.exp(-Math.pow(y/0.09, 2)));
      if (u > L - R0) r *= Math.sqrt(Math.max(0, 1 - Math.pow((u - (L - R0))/R0, 2)));
      prof.push(new THREE.Vector2(Math.max(0.0005, r), y)); }
    const g = new THREE.LatheGeometry(prof, low ? 12 : 20);
    const p = g.attributes.position, cc = [], base = new THREE.Color(col), k = new THREE.Color(), loc = new THREE.Color(col).lerp(new THREE.Color(1,1,1), 0.62);
    for (let i=0;i<p.count;i++){ const y = p.getY(i), L = y >= 0 ? Lp : Lq, u = Math.abs(y)/L;
      /* las cromátidas se abren hacia los extremos: forma de X */
      p.setX(i, p.getX(i) + sgn*(0.13 + 0.26*Math.pow(u, 1.35)));
      let f = 1; (BANDAS[tipo]||[]).forEach(([c, w]) => { const yy = c >= 0 ? c*Lp/0.6 : c*Lq/0.8; if (Math.abs(y - yy) < w/2) f = 0.6; });
      k.copy(base).multiplyScalar(f);
      if (tipo !== 'Y' && Math.abs(y + Lq*0.8) < 0.055) k.copy(loc);
      cc.push(k.r, k.g, k.b); }
    g.setAttribute('color', new THREE.Float32BufferAttribute(cc, 3)); g.computeVertexNormals();
    return g;
  }
  function cromosoma(tipo, col){
    const low = E && E.low, c = mis3Lin('#' + col.toString(16).padStart(6,'0'));
    const m = mat(0xffffff, { vertexColors:true, roughness:0.5, clearcoat:0.35, clearcoatRoughness:0.35, envMapIntensity:0.7 });
    const g = Kit.merge([cromatida(tipo, c, 1, low), cromatida(tipo, c, -1, low)]);
    const ms = [new THREE.Mesh(g, m)];
    /* cinetocoro: el punto de unión en el centrómero */
    const cen = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), mat(c.clone().multiplyScalar(0.55), { roughness:0.45, clearcoat:0.4 }));
    cen.scale.set(1.25, 0.8, 0.8); ms.push(cen);
    return ms;
  }
  function montar3D(){
    const defs = [
      { id:'m-xd', txt:'Lucía · '+MIS3_XD, col:0x3E9A6B, x:-1.9, y:0.2 },
      { id:'m-xr', txt:'Lucía · '+MIS3_XR, col:0xD98324, x:-0.7, y:0.2 },
      { id:'p-xd', txt:'Marco · '+MIS3_XD, col:0x3E9A6B, x:0.9,  y:0.2 },
      { id:'p-y',  txt:'Marco · Y',        col:0x5B7C99, x:2.0,  y:0.2 }
    ];
    /* fondo: la célula de cada progenitor, translúcida, para que los cromosomas no floten en el vacío */
    [[-1.75, '#E8A3B4'], [2.0, '#9CC0E4']].forEach(([x, c]) => {
      const disco = new THREE.Mesh(new THREE.SphereGeometry(1.62, 40, 24), new THREE.MeshStandardMaterial({ color:mis3Lin(c), transparent:true, opacity:0.16, roughness:0.4, depthWrite:false, envMapIntensity:0.6 }));
      disco.scale.set(1, 0.92, 0.18); disco.position.set(x, 0.25, -0.75); disco.renderOrder = -1; E.scene.add(disco);
      const borde = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.025, 8, 80), new THREE.MeshStandardMaterial({ color:mis3Lin(c), transparent:true, opacity:0.55, roughness:0.4 }));
      borde.scale.set(1, 0.92, 1); borde.position.set(x, 0.25, -0.75); E.scene.add(borde);
    });
    defs.forEach(d => {
      const ms = cromosoma(d.id === 'p-y' ? 'Y' : 'X', d.col);
      ms.forEach(m => { m.position.x += d.x; m.position.y += d.y; });
      E.addPart(d.id, ms);
      E.addLabel(d.id, d.txt, [d.x, d.y + 1.15, 0]);
      CR[d.id] = { meshes:ms, base:d.x, x:d.x };
    });
    E.setLabels(true);
  }
  function separar(on){
    const dest = on ? { 'm-xd':-2.7, 'm-xr':-1.0, 'p-xd':1.2, 'p-y':2.9 } : { 'm-xd':-1.9, 'm-xr':-0.7, 'p-xd':0.9, 'p-y':2.0 };
    Object.entries(dest).forEach(([k,x]) => { if (CR[k]) CR[k].x = x; });
    if (mis3Quieto()) aplicar(1);
  }
  function aplicar(t){
    Object.entries(CR).forEach(([id, c]) => {
      const dx = (c.x - c.meshes[0].position.x) * t;
      if (Math.abs(dx) < 1e-5) return;
      c.meshes.forEach(m => m.position.x += dx);
      const l = E && E.labels.get(id); if (l) l.pos.x = c.meshes[0].position.x;
    });
  }
  if (webglOK){
    try {
      /* encuadre según la forma del escenario: las dos células completas también en el móvil */
      const asp = (stage.clientWidth || 740) / (stage.clientHeight || 520), tv = Math.tan(19*Math.PI/180);
      E = new Engine3D(stage, { radius:Math.max(7.6, 3.75/(tv*asp), 2.3/tv), phi:1.42, theta:0, minR:3.5, maxR:16, target:[0.1,0.35,0], floor:-0.95, floorSize:9,
        aria:'Modelo 3D de los cromosomas sexuales de Lucía (dos X) y de Marco (un X y un Y). Usa la lista del panel para seleccionarlos con el teclado.',
        onSelect:(id) => { if (id && CR[id]) fichaCrom(id); } });
      montar3D();
      E.onFrame((tt, dt) => { if (!mis3Quieto()) aplicar(Math.min(1, dt*3.2)); });
    } catch(e){ console.warn('mis3 cromosomas 3D', e); if (E){ try { E.dispose(); } catch(e2){} } E = null; }
  }
  if (!E) stage.append(h('div',{class:'ph',style:'padding:14px'},'Sin WebGL: los cromosomas se describen en el panel. Lucía tiene dos cromosomas X (uno con el alelo '+MIS3_XD+' y otro con '+MIS3_XR+'); Marco tiene un X con '+MIS3_XD+' y un Y, que no lleva el gen del color.'));
  stage.append(overlay);
  stage.append(h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Familia ficticia; el mecanismo de herencia es real.')));

  const rutaEl = h('div',{class:'route'}), cuerpo = h('div',{class:'stack'});
  panel.append(h('div',{class:'card stack'}, rutaEl, cuerpo));
  let fichaEl = null;
  function fichaCrom(id){
    const txt = {
      'm-xd':'X de Lucía con el alelo '+MIS3_XD+' (visión normal). Lo heredó de su madre, Rosa.',
      'm-xr':'X de Lucía con el alelo '+MIS3_XR+' (daltonismo). Lo heredó de su padre, Jorge, que es daltónico: a sus hijas les pasa siempre este X.',
      'p-xd':'Único X de Marco, con el alelo '+MIS3_XD+'. Se lo pasará a todas sus hijas y a ninguno de sus hijos varones.',
      'p-y':'Cromosoma Y de Marco. No lleva el gen de los pigmentos visuales: por eso un varón con '+MIS3_XR+' no tiene con qué compensarlo.'
    }[id];
    if (E) E.select(id);
    if (fichaEl){ fichaEl.className = 'notice info'; fichaEl.textContent = txt; fichaEl.style.display = 'flex'; }
  }

  function show(){
    mis3Ruta(rutaEl, PASOS, S.idx, S.fin);
    cuerpo.innerHTML = ''; overlay.style.display = 'none'; overlay.innerHTML = ''; fichaEl = null;
    const p = PASOS[S.idx];
    Store.log('mision_paso',{ mision:'codigo-genetico', paso:p.id, indice:S.idx });
    cuerpo.append(h('div',{class:'row',style:'justify-content:space-between'},
      h('span',{class:'eyebrow mis'},`Estación ${S.idx+1} de ${PASOS.length}`),
      h('span',{class:'mono small muted'},`${S.errores} errores`)));
    const next = h('button',{class:'btn primary',style:'align-self:flex-start;display:none',
      onclick:()=>{ S.idx++; show(); }}, 'Continuar →');
    const listo = () => { next.style.display = ''; try { next.focus(); } catch(e){} };
    separar(p.id === 'gametos' || p.id === 'punnett');
    if (p.id === 'consulta') estConsulta(listo);
    if (p.id === 'pedigri')  estPedigri(listo);
    if (p.id === 'gametos')  estGametos(listo);
    if (p.id === 'punnett')  estPunnett(listo);
    if (p.id === 'prob')     estProb(listo);
    if (p.id === 'comunica'){ estComunica(); return; }
    cuerpo.append(next);
  }

  function estConsulta(listo){
    fichaEl = h('div',{class:'notice',style:'display:none'});
    cuerpo.append(h('h3',{},'En la consulta'),
      h('p',{style:'font-size:.92rem'},'Lucía tiene 34 años y está embarazada de su cuarto hijo. Su padre es daltónico y su hermano Andrés también. Ella y su esposo Marco ven los colores con normalidad, igual que sus tres hijos. Vienen con una pregunta concreta: «¿qué posibilidad hay de que este bebé sea daltónico?».'),
      h('div',{class:'notice info'},'El daltonismo rojo-verde se hereda ligado al cromosoma X. El alelo '+MIS3_XD+' (visión normal) domina sobre '+MIS3_XR+' (daltonismo). El cromosoma Y no lleva ese gen: por eso un varón con un solo '+MIS3_XR+' ya es daltónico.'),
      h('p',{class:'small muted'},'Toca cada cromosoma en el modelo —o usa los botones de abajo— para ver qué lleva cada uno.'));
    const fila = h('div',{class:'row'});
    [['m-xd','Lucía · X con '+MIS3_XD],['m-xr','Lucía · X con '+MIS3_XR],['p-xd','Marco · X con '+MIS3_XD],['p-y','Marco · Y']]
      .forEach(([id,t]) => fila.append(h('button',{class:'chip','aria-label':'Ver ficha de '+t, onclick:()=>fichaCrom(id)}, t)));
    cuerpo.append(fila, fichaEl);
    cuerpo.append(quizBlock({
      q:'Marco ve los colores con normalidad. ¿Puede ser portador del alelo '+MIS3_XR+' sin saberlo?',
      ops:['Sí, igual que Lucía: podría llevarlo escondido en su otro cromosoma','No: solo tiene un cromosoma X, así que si llevara '+MIS3_XR+' sería daltónico','Depende de si su padre era daltónico'],
      ok:1,
      fb:'En los varones no existe el estado de portador para un gen del X: hay un solo X y su alelo se expresa siempre. Por eso el fenotipo de un varón revela directamente su genotipo, y en las mujeres no.',
      wrong:['Ese "otro cromosoma" sería el Y, y el Y no lleva el gen de los pigmentos visuales: no hay dónde esconder el alelo ni con qué compensarlo.',
             'El padre de Marco le dio el cromosoma Y, no el X. Un varón recibe su único X de su madre, así que el fenotipo del padre no aporta aquí.']
    }, att => { S.errores += att-1; mis3Ruta(rutaEl, PASOS, S.idx, S.fin); listo(); }));
  }

  function estPedigri(listo){
    overlay.style.display = 'block'; overlay.innerHTML = '';
    const svgWrap = h('div',{});
    overlay.append(h('div',{class:'stack'}, h('b',{},'Pedigrí de la familia Zambrano'), h('div',{class:'gen-ped-wrap'}, svgWrap),
      genPedLeyenda([['h','hombre'],['m','mujer'],['af','daltónico'],['dot','portadora (cuando la deduces)'],['duda','no se puede saber'],['emb','embarazo actual']]),
      h('p',{class:'mis3-nota'},'Cuadrado = hombre · círculo = mujer · rombo punteado = embarazo actual · relleno oscuro = daltónico. Las figuras atenuadas (Emilia y el embarazo) no se analizan en esta estación.')));
    const opsBox = h('div',{class:'stack'}), fb = h('div',{class:'notice',style:'display:none'});
    const st = h('div',{class:'notice'},`Genotipos deducidos: ${Object.keys(S.ok).length} de ${MIS3_PED.gente.length}.`);
    cuerpo.append(h('h3',{},'Lee el pedigrí'),
      h('p',{class:'small muted'},'El árbol solo muestra fenotipos. Deduce el genotipo de las siete personas señaladas: toca a una en el árbol (o llega con el tabulador y pulsa Enter). En una de ellas la información no alcanza para decidir, y reconocerlo también es parte del trabajo.'),
      st, opsBox, fb);

    const act = e => { const g = e.target.closest('.sym[data-id]'); if (!g) return; S.sel = g.dataset.id; pinta(); };
    svgWrap.addEventListener('click', act);
    svgWrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); act(e); } });
    function dibuja(){ svgWrap.innerHTML = mis3PedSVG(S); }
    function pinta(){
      dibuja(); opsBox.innerHTML = '';
      if (!S.sel){ opsBox.append(h('span',{class:'small muted'},'Selecciona a una persona del árbol.')); return; }
      const p = MIS3_PED.gente.find(x => x.id === S.sel);
      if (S.ok[p.id]){ opsBox.append(h('div',{class:'notice ok'}, h('span',{}, h('b',{}, `${p.nom}: ${mis3Gen(p.gen)}. `), p.por))); return; }
      const row = h('div',{class:'row'});
      MIS3_PED.ops.forEach(g => row.append(h('button',{class:'chip','aria-label':`Asignar el genotipo ${mis3Gen(g)} a ${p.nom}`,
        onclick:()=>responder(p,g)}, mis3Gen(g))));
      opsBox.append(h('p',{class:'small',style:'font-weight:600'},`¿Cuál es el genotipo de ${p.nom} (${p.sexo==='h'?'hombre':'mujer'}, ${p.af?'daltónico':'ve los colores con normalidad'})?`), row);
    }
    function responder(p, g){
      if (g === p.gen){
        S.ok[p.id] = true; fb.className = 'notice ok';
        fb.innerHTML = `<span><b>Correcto: ${esc(p.nom)} es ${esc(mis3Gen(p.gen))}.</b> ${esc(p.por)}</span>`; fb.style.display = 'flex';
        Store.log('mision_pedigri',{ mision:'codigo-genetico', persona:p.id, correcto:true });
        progreso(); pinta(); return;
      }
      S.errores++;
      let msg;
      if (p.sexo === 'h' && (g === 'XDXD' || g === 'XDXd' || g === 'XdXd' || g === 'XDXD/XDXd'))
        msg = `${p.nom.split(' (')[0]} es hombre: su par sexual es X e Y, nunca dos X. Sus genotipos posibles son ${mis3Gen('XDY')} o ${mis3Gen('XdY')}.`;
      else if (p.sexo === 'h')
        msg = p.af ? `Es daltónico, así que su único X lleva el alelo ${MIS3_XR}: ${mis3Gen('XdY')}.`
                   : `Ve los colores con normalidad y solo tiene un X: ese X lleva ${MIS3_XD}, así que es ${mis3Gen('XDY')}.`;
      else if (g === 'XdXd')
        msg = `${p.nom.split(' (')[0]} ve los colores con normalidad. Con ${mis3Gen('XdXd')} sería daltónica: haría falta que sus dos X llevaran ${MIS3_XR}.`;
      else if (p.gen === 'XDXd' && g === 'XDXD')
        msg = p.id === 'II-1'
          ? `Fíjate en su padre: Jorge es ${mis3Gen('XdY')} y a todas sus hijas les pasa ese mismo X. Lucía tuvo que recibir ${MIS3_XR}, así que no puede ser ${mis3Gen('XDXD')}.`
          : `Fíjate en su hijo: Andrés es daltónico y un varón recibe su único X de la madre. Ese ${MIS3_XR} salió de ella, así que no puede ser ${mis3Gen('XDXD')}.`;
      else if (p.gen === 'XDXD/XDXd')
        msg = `Su padre solo pudo darle un X con ${MIS3_XD}, así que ve bien con seguridad. Pero de su madre, que es ${mis3Gen('XDXd')}, pudo recibir cualquiera de los dos alelos: con el árbol no se puede decidir entre ${mis3Gen('XDXD')} y ${mis3Gen('XDXd')}.`;
      else
        msg = `Revisa quién le dio cada cromosoma X y qué fenotipo tiene esa persona: el pedigrí se resuelve rastreando de dónde vino cada X.`;
      fb.className = 'notice warn'; fb.innerHTML = `<span><b>Aún no.</b> ${esc(msg)}</span>`; fb.style.display = 'flex';
      mis3Ruta(rutaEl, PASOS, S.idx, S.fin);
      Store.log('mision_pedigri',{ mision:'codigo-genetico', persona:p.id, correcto:false, elegido:g });
    }
    let sumado = false;
    function progreso(){
      const n = Object.keys(S.ok).length;
      if (n < MIS3_PED.gente.length){ st.className = 'notice'; st.textContent = `Genotipos deducidos: ${n} de ${MIS3_PED.gente.length}.`; return; }
      st.className = 'notice ok';
      st.innerHTML = '<span><b>Pedigrí resuelto.</b> Lo decisivo: Lucía es portadora <i>con certeza</i>, porque su padre daltónico le pasó su único X. Y en Sofía la información no alcanza: es portadora con probabilidad 1/2, nada más.</span>';
      if (!sumado){ sumado = true; if (S.errores === 0) S.puntos++; else if (S.errores <= 2) S.puntos += 0.5; }
      listo();
    }
    pinta(); progreso();
  }

  function estGametos(listo){
    cuerpo.append(h('h3',{},'De la meiosis a los gametos'),
      h('p',{style:'font-size:.92rem'},'En el modelo, los cromosomas se han separado: eso es lo que hace la meiosis. Cada óvulo y cada espermatozoide reciben un solo cromosoma sexual, al azar y con la misma probabilidad.'),
      h('div',{class:'notice info'},'Lucía ('+mis3Gen('XDXd')+') produce dos tipos de óvulos: la mitad con '+MIS3_XD+' y la mitad con '+MIS3_XR+'. Marco ('+mis3Gen('XDY')+') produce dos tipos de espermatozoides: la mitad con '+MIS3_XD+' y la mitad con Y.'));
    cuerpo.append(quizBlock({
      q:'¿Qué determina el sexo del bebé y por qué eso importa en este caso?',
      ops:[
        'El óvulo, porque es la célula más grande; e importa porque el daltonismo viene de la madre',
        'El espermatozoide, según lleve el X o el Y; e importa porque el '+MIS3_XR+' solo puede venir del óvulo de Lucía: un bebé con Y no recibe un segundo X que lo compense',
        'No lo determina ninguno de los dos: el sexo se define después, durante el desarrollo'
      ], ok:1,
      fb:'El espermatozoide aporta X o Y. Si aporta X, ese X lleva '+MIS3_XD+' y compensa cualquier '+MIS3_XR+' materno: la niña verá bien. Si aporta Y, el único X del bebé será el de Lucía, y ahí sí se juega el daltonismo.',
      wrong:[
        'El tamaño no tiene nada que ver. Y aunque es cierto que en este caso el alelo '+MIS3_XR+' viene de la madre, quien decide el sexo es el espermatozoide (X o Y).',
        'El sexo cromosómico queda definido en la fecundación, según el espermatozoide aporte X o Y. Lo que ocurre después es el desarrollo de ese programa.'
      ]
    }, att => { S.errores += att-1; if (att === 1) S.puntos++; mis3Ruta(rutaEl, PASOS, S.idx, S.fin); listo(); }));
  }

  function estPunnett(listo){
    const gamM = ['XD','Xd'], gamP = ['XD','Y'];
    const correcto = ['XDXD','XDY','XDXd','XdY'];  /* fila×columna */
    const fenot = {
      'XDXD':'Niña, ve bien, no portadora', 'XDXd':'Niña, ve bien, portadora',
      'XDY':'Niño, ve bien', 'XdY':'Niño daltónico', 'XdXd':'Niña daltónica'
    };
    const ops = ['XDXD','XDXd','XdXd','XDY','XdY'];
    let sel = null, err = 0, resueltas = S.celdas.filter(Boolean).length;
    cuerpo.append(h('h3',{},'El cuadro de Punnett'),
      h('p',{class:'small muted'},'Filas: óvulos de Lucía. Columnas: espermatozoides de Marco. Toca una casilla vacía y elige qué se forma al combinarse los dos gametos.'));
    const tabla = h('table',{class:'gen-punnett','aria-label':'Cuadro de Punnett: filas, óvulos de Lucía; columnas, espermatozoides de Marco'});
    const opsBox = h('div',{class:'stack'}), fb = h('div',{class:'notice',style:'display:none'});
    cuerpo.append(tabla, opsBox, fb);
    function pinta(){
      tabla.innerHTML = '';
      const thead = h('thead',{}, h('tr',{}, h('th',{}, h('div',{class:'gen-hd corner'},'')),
        gamP.map(g => h('th',{}, h('div',{class:'gen-hd'}, h('span',{class:'gen-hd-ill',html:genGametoSVG('esp','','gen-hd-g esp')}), h('span',{}, h('span',{}, mis3Gen(g)), h('small',{},'espermatozoide')))))));
      const tb = h('tbody',{});
      gamM.forEach((gm,i) => {
        const tr = h('tr',{}, h('th',{}, h('div',{class:'gen-hd'}, h('span',{class:'gen-hd-ill',html:genGametoSVG('ovu','','gen-hd-g ovu')}), h('span',{}, h('span',{}, mis3Gen(gm)), h('small',{},'óvulo')))));
        gamP.forEach((gp,j) => {
          const k = i*2+j, val = S.celdas[k];
          const b = h('button',{class:'gen-cell' + (val ? ' ok' : (sel === k ? ' sel' : '')),
            'aria-label': val ? `Casilla ${k+1}: ${mis3Gen(val)}` : `Casilla ${k+1}, vacía. Combina ${mis3Gen(gm)} con ${mis3Gen(gp)}`,
            onclick:()=>{ if (val) return; sel = k; pinta(); }},
            val ? h('span',{class:'gen-cell-ill',html:genFenSVG('daltonismo', val, 'gen-fen ancho')}) : null,
            h('span',{class:'gen-cell-tx'}, val ? h('b',{}, mis3Gen(val)) : h('span',{},'?'),
            val ? h('small',{}, fenot[val]) : null));
          tr.append(h('td',{}, b));
        });
        tb.append(tr);
      });
      tabla.append(thead, tb);
      opsBox.innerHTML = '';
      if (sel === null || S.celdas[sel]){ opsBox.append(h('span',{class:'small muted'}, resueltas === 4 ? 'Cuadro completo.' : 'Selecciona una casilla vacía.')); return; }
      const i = Math.floor(sel/2), j = sel%2;
      const row = h('div',{class:'row'});
      ops.forEach(g => row.append(h('button',{class:'chip','aria-label':`Poner ${mis3Gen(g)} en la casilla`, onclick:()=>responder(sel,g)}, mis3Gen(g))));
      opsBox.append(h('p',{class:'small',style:'font-weight:600'},`¿Qué se forma al unirse el óvulo ${mis3Gen(gamM[i])} con el espermatozoide ${mis3Gen(gamP[j])}?`), row);
    }
    function responder(k, g){
      const i = Math.floor(k/2), j = k%2;
      if (g === correcto[k]){
        S.celdas[k] = g; resueltas++; sel = null;
        fb.className = 'notice ok';
        fb.innerHTML = `<span><b>Correcto: ${esc(mis3Gen(g))}.</b> ${esc(fenot[g])}.</span>`; fb.style.display = 'flex';
        Store.log('mision_punnett',{ mision:'codigo-genetico', casilla:k, correcto:true });
        if (resueltas === 4) cerrar();
        pinta(); return;
      }
      err++; S.errores++;
      let msg;
      if (g.includes('Y') && gamP[j] !== 'Y') msg = `En esa columna el espermatozoide lleva un X, no el Y. El Y solo puede aparecer en la columna de la derecha.`;
      else if (!g.includes('Y') && gamP[j] === 'Y') msg = `En esa columna el espermatozoide lleva el Y: el resultado tiene que incluirlo. Un descendiente recibe un cromosoma de cada progenitor, ni más ni menos.`;
      else if (g === 'XdXd') msg = `Para ${mis3Gen('XdXd')} harían falta dos ${MIS3_XR}, y Marco no tiene ninguno: su X lleva ${MIS3_XD}.`;
      else msg = `Combina literalmente los dos gametos de esta casilla: el óvulo ${mis3Gen(gamM[i])} y el espermatozoide ${mis3Gen(gamP[j])}. El resultado es ${mis3Gen(correcto[k])}.`;
      fb.className = 'notice warn'; fb.innerHTML = `<span><b>Aún no.</b> ${esc(msg)}</span>`; fb.style.display = 'flex';
      mis3Ruta(rutaEl, PASOS, S.idx, S.fin);
      Store.log('mision_punnett',{ mision:'codigo-genetico', casilla:k, correcto:false, elegido:g });
    }
    function cerrar(){
      if (err === 0) S.puntos++;
      fb.className = 'notice ok';
      fb.innerHTML = '<span><b>Cuadro completo.</b> Cuatro resultados igual de probables: una niña no portadora, un niño que ve bien, una niña portadora y un niño daltónico. Ahora traduce eso a probabilidades.</span>';
      listo();
    }
    pinta();
    if (resueltas === 4) cerrar();
  }

  function estProb(listo){
    cuerpo.append(h('h3',{},'Las tres probabilidades'),
      h('p',{class:'small muted'},'Del cuadro salen tres números distintos, y confundirlos es el error más frecuente en la consulta.'));
    let hechas = 0, fallos = 0;
    const pregs = [
      { q:'¿Cuál es la probabilidad de que el bebé sea daltónico, sin saber todavía si es niño o niña?',
        ops:['1 de cada 2 (50 %)','1 de cada 4 (25 %)','1 de cada 3 (33 %)','0 %'], ok:1,
        fb:'De las cuatro casillas del cuadro, una sola ('+mis3Gen('XdY')+') corresponde a una persona daltónica: 1/4 = 25 %.',
        wrong:['El 50 % es la probabilidad solo si ya se sabe que es varón: son dos preguntas distintas.',
               'Las casillas del cuadro son cuatro, no tres, y todas tienen la misma probabilidad.',
               'Sí hay riesgo: una de las cuatro casillas es un niño daltónico. El 0 % corresponde a las niñas.'] },
      { q:'La ecografía confirma que es varón. ¿Cuál es ahora la probabilidad de que sea daltónico?',
        ops:['Sigue siendo 25 %','1 de cada 2 (50 %)','100 %','12,5 %'], ok:1,
        fb:'Saber el sexo elimina las dos casillas de niñas. De las dos casillas de varones que quedan ('+mis3Gen('XDY')+' y '+mis3Gen('XdY')+'), una es daltónica: 1/2. Información nueva cambia la probabilidad; no cambia la biología.',
        wrong:['El 25 % era la probabilidad antes de saber el sexo. Con un dato nuevo hay que recalcular sobre las casillas que siguen siendo posibles.',
               'No es seguro: el óvulo puede llevar '+MIS3_XD+' o '+MIS3_XR+', con la misma probabilidad. Un varón tiene la mitad de posibilidades.',
               'Ese número saldría de dividir otra vez por dos, pero el sexo ya está determinado: no se multiplica dos veces por la misma condición.'] },
      { q:'Si fuera niña, ¿qué se le puede decir a la familia?',
        ops:['Que sería daltónica con un 50 % de probabilidad','Que no será daltónica, pero puede ser portadora con un 50 % de probabilidad','Que no será daltónica ni portadora','Que sería daltónica con un 25 % de probabilidad'], ok:1,
        fb:'Toda hija recibe de Marco un X con '+MIS3_XD+', que basta para ver los colores con normalidad. Lo que está en juego en las niñas no es la visión, sino si llevan el alelo para la siguiente generación: 1/2.',
        wrong:['Para ser daltónica necesitaría dos alelos '+MIS3_XR+', y Marco no tiene ninguno que aportar.',
               'Portadora sí puede ser: el óvulo puede llevar '+MIS3_XR+'. Es exactamente lo que le pasó a Lucía y lo que hace que la familia esté hoy en la consulta.',
               'Ese 25 % es la probabilidad global de bebé daltónico, no la de una niña. En las niñas la probabilidad de daltonismo es 0.'] }
    ];
    pregs.forEach(q => cuerpo.append(quizBlock(q, att => {
      S.errores += att-1; if (att > 1) fallos++;
      hechas++; mis3Ruta(rutaEl, PASOS, S.idx, S.fin);
      if (hechas === pregs.length){ if (fallos === 0) S.puntos++; listo(); }
    })));
  }

  function estComunica(){
    cuerpo.append(h('h3',{},'Ahora díselo a la familia'),
      h('p',{style:'font-size:.92rem'},'Tienes el número. Falta la parte difícil: decirlo sin convertir una probabilidad en una promesa ni en una condena. Lucía y Marco no son estadísticos y están nerviosos.'),
      h('p',{style:'font-weight:600'},'1. ¿Cómo se lo explicas?'));
    const fb1 = h('div',{class:'notice',style:'display:none'});
    const box1 = h('div',{class:'stack'});
    const paso2 = h('div',{class:'stack',style:'display:none'});
    const paso3 = h('div',{class:'stack',style:'display:none'});
    let listo1 = false;
    MIS3_COMUNICA.forEach((c,i) => box1.append(h('button',{class:'opt',onclick:function(){
      if (listo1) return;
      if (c.ok){
        listo1 = true; this.classList.add('ok'); $$('button.opt', box1).forEach(b => b.disabled = true);
        if (!box1._fallo) S.puntos++;
        fb1.className = 'notice ok'; fb1.innerHTML = `<span><b>Correcto.</b> ${esc(c.fb)}</span>`; fb1.style.display = 'flex';
        paso2.style.display = ''; segundo();
      } else {
        S.errores++; box1._fallo = true; this.classList.add('bad');
        fb1.className = 'notice warn'; fb1.innerHTML = `<span><b>Aún no.</b> ${esc(c.fb)}</span>`; fb1.style.display = 'flex';
      }
      Store.log('mision_comunicacion',{ mision:'codigo-genetico', opcion:i, correcto:!!c.ok });
    }}, h('span',{class:'k'},String.fromCharCode(65+i)), c.t)));
    cuerpo.append(box1, fb1, paso2, paso3);

    function segundo(){
      if (paso2.childElementCount) return;
      paso2.append(h('p',{style:'font-weight:600'},'2. Don Marco insiste: «Doctor, ya tuvimos tres hijos que ven bien. El cuarto tiene que salir daltónico, ¿no?». ¿Qué le respondes?'));
      const fb2 = h('div',{class:'notice',style:'display:none'});
      const box2 = h('div',{class:'stack'});
      let hecho = false, fallo2 = false;
      MIS3_FALACIA.forEach((c,i) => box2.append(h('button',{class:'opt',onclick:function(){
        if (hecho) return;
        if (c.ok){
          hecho = true; this.classList.add('ok'); $$('button.opt', box2).forEach(b => b.disabled = true);
          if (!fallo2) S.puntos++;
          fb2.className = 'notice ok'; fb2.innerHTML = `<span><b>Correcto.</b> ${esc(c.fb)}</span>`; fb2.style.display = 'flex';
          paso3.style.display = ''; tercero();
        } else {
          S.errores++; fallo2 = true; this.classList.add('bad');
          fb2.className = 'notice warn'; fb2.innerHTML = `<span><b>Aún no.</b> ${esc(c.fb)}</span>`; fb2.style.display = 'flex';
        }
        Store.log('mision_falacia',{ mision:'codigo-genetico', opcion:i, correcto:!!c.ok });
      }}, h('span',{class:'k'},String.fromCharCode(65+i)), c.t)));
      paso2.append(box2, fb2);
    }

    function tercero(){
      if (paso3.childElementCount) return;
      const ta = h('textarea',{ rows:4, style:'width:100%', 'aria-label':'Explicación para la familia',
        placeholder:'Escríbelo con tus palabras, como se lo dirías a Lucía y a Marco (mínimo 50 caracteres).' });
      const fb3 = h('div',{class:'notice',style:'display:none'});
      paso3.append(h('p',{style:'font-weight:600'},'3. Escríbelo tú, con tus palabras.'), ta,
        h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{
          const t = ta.value.trim();
          if (t.length < 50) return toast('Desarrolla la explicación: al menos 50 caracteres.');
          const bajo = t.toLowerCase();
          const marcas = [
            { k:['25','1 de cada 4','1/4','un cuarto','cuarta'], t:'el número (1 de cada 4)' },
            { k:['varón','varon','niño','nino','hombre','50','mitad'], t:'el caso del varón (50 %)' },
            { k:['niña','nina','hija','portadora'], t:'qué ocurre si es niña' },
            { k:['independ','cada embarazo','no depende','anterior','no influye'], t:'que cada embarazo es independiente' },
            { k:['probabilidad','posibilidad','no es seguro','no significa'], t:'que es una probabilidad y no una certeza' }
          ];
          const tiene = marcas.filter(m => m.k.some(k => bajo.includes(k)));
          const falta = marcas.filter(m => !tiene.includes(m));
          const bien = tiene.length >= 3;
          fb3.className = 'notice ' + (bien ? 'ok' : 'warn');
          fb3.innerHTML = '<span><b>' + (bien ? 'Buena comunicación.' : 'Le falta algo importante.') + '</b> ' +
            (tiene.length ? 'Tu explicación menciona: ' + esc(tiene.map(m=>m.t).join('; ')) + '. ' : '') +
            (falta.length ? 'Te falta añadir: ' + esc(falta.map(m=>m.t).join('; ')) + '.' : 'Están las cuatro piezas: el número, el desglose por sexo, la independencia entre embarazos y la diferencia entre probabilidad y certeza.') +
            ' Y una última cosa que no está en los números: el daltonismo no impide una vida plena. Comunicar bien también es no alarmar de más.</span>';
          fb3.style.display = 'flex';
          Store.addNote('conclusion','Asesoramiento genético (misión Código genético): ' + t);
          Store.log('respuesta_abierta',{ actividad:ACT, longitud:t.length, piezas:tiene.length });
          finalizar(tiene.length);
        }},'Entregar la explicación'), fb3);
    }

    function finalizar(piezas){
      if (cuerpo.querySelector('.mis3-fin')) return;
      const min = Math.max(1, Math.round((Date.now()-S.inicio)/60000));
      const primera = !Store.s.activities[ACT]?.done;
      const pts = Math.round(S.puntos*10)/10;
      Store.completeActivity(ACT, { score:`${pts}/${S.total}`, attempts:S.errores, duracionMin:min, piezas });
      try { Store.grantBadge('genetista'); } catch(e){}
      S.fin = true; mis3Ruta(rutaEl, PASOS, S.idx, true);
      const fin = h('div',{class:'stack mis3-fin'});
      mis3Cierre(fin, h('span',{}, h('b',{},`Caso resuelto · ${pts}/${S.total} · ${S.errores} errores.`),
        primera ? ' Has ganado 130 XP y la insignia Genetista.' : ' Ya habías resuelto este caso; el registro se actualizó.',
        ' Lo más difícil de la genética aplicada no es el cuadro de Punnett: es que la familia entienda que 1 de cada 4 no es una cuota ni una condena.'));
      fin.append(h('div',{class:'row'},
        h('a',{class:'btn',href:'#/explorar/cruces'},'Constructor de cruces'),
        h('a',{class:'btn',href:'#/explorar/genealogia'},'Más árboles genealógicos'),
        h('a',{class:'btn primary',href:'#/misiones'},'Volver a misiones')));
      cuerpo.append(fin);
    }
  }

  show();
  return { unmount(){ if (E){ try { E.dispose(); } catch(e){} } E = null; } };
});
</script>
