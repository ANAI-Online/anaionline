<style>
/* ===== Bachillerato · Ecosistemas del Ecuador y dinámica de poblaciones ===== */
.eco2-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.eco2-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.eco2-nav button[aria-current="true"]{background:var(--eco);border-color:var(--eco);color:#fff}
.eco2-bio{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.eco2-bio button{display:flex;gap:9px;align-items:center;text-align:left;border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:12px;padding:9px 13px;cursor:pointer;font:600 .86rem/1.2 "IBM Plex Sans",sans-serif}
.eco2-bio button[aria-pressed="true"]{border-color:var(--eco);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--eco) 26%,transparent)}
.eco2-bio button small{display:block;font-weight:400;color:var(--ink-3);font-size:.74rem;margin-top:2px}
.eco2-bio .em{font-size:1.3rem}
.eco2-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.eco2-el{display:flex;flex-direction:column;gap:3px;align-items:flex-start;text-align:left;border:1px solid var(--line);border-radius:12px;padding:9px 11px;background:var(--bg-2);cursor:pointer;color:var(--ink);font:inherit}
.eco2-el:hover,.eco2-el:focus-visible{border-color:var(--eco);outline:none}
.eco2-el[aria-pressed="true"]{border-color:var(--eco);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--eco) 22%,transparent)}
.eco2-el b{font-size:.85rem;line-height:1.15}
.eco2-el i{font-size:.72rem;color:var(--ink-3);font-style:italic}
.eco2-tag{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--line);border-radius:999px;padding:1px 8px;font:600 .68rem/1.6 "IBM Plex Sans",sans-serif;color:var(--ink-2);background:var(--bg-3)}
.eco2-kv{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:.84rem;margin:6px 0 0}
.eco2-kv dt{font-weight:600;color:var(--ink-2)}
.eco2-kv dd{margin:0;color:var(--ink-2)}
.eco2-sl{display:grid;grid-template-columns:132px 1fr 88px;gap:10px;align-items:center;margin:5px 0}
.eco2-sl label{font-size:.82rem;color:var(--ink-2)}
.eco2-sl input[type=range]{width:100%}
.eco2-sl output{font-family:"IBM Plex Mono",monospace;font-size:.8rem;color:var(--ink);text-align:right}
.eco2-read{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.eco2-read div{border:1px solid var(--line);border-radius:10px;background:var(--bg-3);padding:6px 10px;min-width:104px}
.eco2-read b{display:block;font:700 1rem/1.2 "IBM Plex Mono",monospace;color:var(--ink)}
.eco2-read span{font-size:.7rem;color:var(--ink-3)}
.eco2-svg{width:100%;height:auto;background:var(--bg-3);border:1px solid var(--line);border-radius:14px}
.eco2-pyr{display:flex;flex-direction:column;gap:6px;align-items:center}
.eco2-lvl{display:flex;align-items:center;justify-content:center;gap:8px;border:1.5px solid var(--line);border-radius:8px;background:var(--bg-3);min-height:40px;min-width:52px;padding:6px 8px;font-size:.8rem;color:var(--ink);transition:width .45s ease;white-space:nowrap;overflow:hidden;box-sizing:border-box}
.eco2-bar{display:grid;grid-template-columns:150px 1fr auto;gap:8px;align-items:center;font-size:.8rem;margin:4px 0}
.eco2-bar .tr{display:block;background:var(--bg-3);border:1px solid var(--line);border-radius:6px;height:16px;overflow:hidden}
.eco2-bar .fl{display:block;height:100%;background:var(--eco);transition:width .4s ease}
.eco2-res{cursor:pointer}
.eco2-res:focus-visible rect{stroke-width:3.5}
.eco2-check{display:grid;gap:6px;list-style:none;padding:0;margin:0}
.eco2-check li{display:flex;gap:8px;align-items:flex-start;font-size:.85rem}
.eco2-check .ck{width:18px;height:18px;border-radius:5px;border:1.5px solid var(--line);flex:0 0 auto;display:grid;place-items:center;font-size:.7rem;font-weight:700}
.eco2-check li.ok .ck{background:var(--ok);border-color:var(--ok);color:#fff}
.eco2-canvas{width:100%;height:270px;display:block}
.eco2-leg{display:flex;flex-wrap:wrap;gap:12px;margin-top:6px;font-size:.76rem;color:var(--ink-3)}
.eco2-leg span{display:inline-flex;align-items:center;gap:5px}
.eco2-leg i{width:16px;height:4px;border-radius:2px;display:inline-block}
.eco2-stage{height:420px}
[data-motion="reducido"] .eco2-lvl,[data-motion="reducido"] .eco2-bar .fl{transition:none}
@media (max-width:640px){.eco2-sl{grid-template-columns:1fr;gap:2px}.eco2-sl output{text-align:left}.eco2-stage{height:300px}.eco2-bar{grid-template-columns:110px 1fr auto}}
</style>
<script>
/* =====================================================================
   BACHILLERATO · BIOLOGÍA · Unidades 7 y 8 (Biodiversidad y ecosistemas)
   Ruta #/explorar/ecosistemas → biomas del Ecuador, gradiente altitudinal,
   flujo de energía, ciclos de materia, servicios y amenazas.
   Ruta #/explorar/poblaciones → crecimiento, depredación, competencia,
   tablas de vida y un caso real de manejo.
   Complementa (no repite) #/cn/eco/red-trofica, que es el nivel EGB.
   ===================================================================== */

/* Registro defensivo de las actividades (sin tocar src/03c-data-areas.js) */
if (typeof BIO !== 'undefined' && BIO.activities){
  if (!BIO.activities['reto-ecosistemas']) BIO.activities['reto-ecosistemas'] = { t:'Reto: ecosistemas del Ecuador', unidad:null, peso:0, xp:140 };
  if (!BIO.activities['reto-poblaciones']) BIO.activities['reto-poblaciones'] = { t:'Reto: dinámica de poblaciones', unidad:null, peso:0, xp:130 };
}
if (typeof ACT_HREF !== 'undefined'){
  ACT_HREF['reto-ecosistemas'] = '#/explorar/ecosistemas';
  ACT_HREF['reto-poblaciones'] = '#/explorar/poblaciones';
}

/* ---------------------------------------------------------------------
   Utilidades de formato (números con coma decimal, miles con punto)
   --------------------------------------------------------------------- */
function ec2Dec(v, d){ const s = (d != null ? Number(v).toFixed(d) : String(Math.round(v))); return s.replace('.', ','); }
function ec2Mil(v){ const n = Math.round(v); return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function ec2Cant(v){ return Math.abs(v) >= 1000 ? ec2Mil(v) : ec2Dec(v, Math.abs(v) < 10 ? 1 : 0); }
function ec2Col(n){ try { return cssVar(n) || '#3f8f5f'; } catch(e){ return '#3f8f5f'; } }

/* =====================================================================
   1 · DATOS DE LOS CUATRO GRANDES ECOSISTEMAS DEL ECUADOR
   ===================================================================== */
const EC2_BIOMAS = {
  amazonia:{
    id:'amazonia', n:'Amazonía', em:'🌳', ar:'la', sub:'Bosque húmedo tropical',
    clima:'24 a 26 °C todo el año, sin estaciones marcadas. Entre 2.500 y 4.000 mm de lluvia al año.',
    altitud:'De 200 a 600 m s. n. m. · Napo, Orellana, Sucumbíos, Pastaza, Morona Santiago, Zamora Chinchipe.',
    suelo:'Oxisoles y ultisoles ácidos y muy pobres: casi todos los nutrientes están en la biomasa viva y en la hojarasca, no en el suelo. La hojarasca se descompone en pocas semanas.',
    d:'El ecosistema más diverso del país: en una sola hectárea del Yasuní se han contado más de 650 especies de árboles, más que en todo Estados Unidos y Canadá juntos. La vida se organiza en estratos, desde el suelo oscuro hasta los árboles emergentes de 50 m.',
    sky:0xA9C7D4, fog:[0xC8DCDF, 20, 52],
    partes:[
      { id:'ceibo', n:'Ceibo (árbol emergente)', sci:'Ceiba pentandra', rol:'Productor · estrato emergente', at:[-2.4,4.6,-1.2],
        d:'Sobresale por encima del dosel y llega a 50 o 60 m de altura. Recibe el sol directo, pero también el viento y la sequedad del aire.',
        adapt:'Raíces tabulares (contrafuertes) de hasta 3 m de alto: como el suelo útil solo tiene unos 20 cm, el árbol no puede anclarse en profundidad y se sostiene ensanchándose en la base.',
        dato:'Un solo ceibo puede albergar más de 40 especies de epífitas y decenas de especies de hormigas.' },
      { id:'dosel', n:'Dosel continuo', sci:'Estrato de 25 a 35 m', rol:'Productor · piso del dosel', at:[1.8,3.3,1.4],
        d:'Techo cerrado de copas donde vive la mayor parte de la biodiversidad del bosque: monos, aves frugívoras, insectos y epífitas.',
        adapt:'Hojas con ápice de goteo (punta alargada) que escurre el agua y evita que crezcan hongos y algas sobre la lámina.',
        dato:'El dosel intercepta cerca del 95 % de la luz: al suelo llega apenas entre el 1 y el 2 %.' },
      { id:'epifitas', n:'Epífitas: bromelias y orquídeas', sci:'Guzmania, Epidendrum', rol:'Productores sobre otros árboles', at:[0.6,3.0,-2.4],
        d:'Viven sobre las ramas sin ser parásitas: solo usan al árbol como soporte para alcanzar la luz.',
        adapt:'Las bromelias forman una cisterna con sus hojas que acumula agua de lluvia; allí se reproducen ranas, mosquitos e incluso pequeños cangrejos. Las raíces de las orquídeas tienen velamen, un tejido esponjoso que absorbe la humedad del aire.',
        dato:'Ecuador tiene más de 4.500 especies de orquídeas: es el país con más orquídeas del mundo por kilómetro cuadrado.' },
      { id:'rio', n:'Río de aguas blancas', sci:'Cuenca del Napo', rol:'Ecosistema acuático asociado', at:[4.6,0.15,3.2],
        d:'Los ríos amazónicos arrastran sedimentos andinos y desbordan cada año, creando bosques inundables (várzea).',
        adapt:'El delfín rosado (Inia geoffrensis) tiene vértebras cervicales libres que le permiten girar el cuello y nadar entre los árboles inundados; casi ciego, se orienta por ecolocalización en agua turbia.',
        dato:'La inundación anual puede subir el nivel del río entre 8 y 12 m y dura varios meses.' },
      { id:'suelo', n:'Suelo y hojarasca', sci:'Oxisol · micorrizas', rol:'Descomposición y reciclaje', at:[-3.6,0.2,2.6],
        d:'La capa fértil es delgadísima. Hongos, bacterias, termitas y lombrices devuelven los nutrientes a las raíces en semanas.',
        adapt:'Las micorrizas (hongos unidos a las raíces) capturan los nutrientes de la hojarasca antes de que la lluvia los lave. Por eso el bosque es exuberante sobre un suelo pobre.',
        dato:'Si se tala el bosque, en 3 a 5 años el suelo pierde su fertilidad: los nutrientes estaban en los árboles, no en la tierra.' },
      { id:'jaguar', n:'Jaguar', sci:'Panthera onca', rol:'Superdepredador · nivel trófico 4', at:[2.6,0.55,-3.4],
        d:'El felino más grande de América. Un individuo necesita entre 25 y 100 km² de bosque bien conservado.',
        adapt:'Mordida más potente que la de cualquier otro felino en relación con su tamaño: mata perforando el cráneo de sus presas y puede romper el caparazón de una tortuga.',
        dato:'Al haber tan poca energía disponible en el nivel 4, un jaguar por cada 50 km² es una densidad alta; por eso los superdepredadores son siempre escasos.' }
    ]
  },
  manglar:{
    id:'manglar', n:'Manglar', em:'🌊', ar:'el', sub:'Bosque de marea, costa del Pacífico',
    clima:'25 a 28 °C · lluvias de enero a mayo · influencia diaria de dos mareas.',
    altitud:'0 m s. n. m. · Esmeraldas (Cayapas-Mataje), Manabí, Guayas (Churute, El Salado), El Oro.',
    suelo:'Fango salino sin oxígeno (anóxico), con olor a azufre. El agua es salobre: la salinidad cambia cada seis horas con la marea.',
    d:'Un bosque que crece con los pies en el agua salada. Es la guardería de la pesca del Pacífico y la mejor defensa natural de la costa ante las marejadas.',
    sky:0xB9D2DC, fog:[0xCBDDE2, 22, 58],
    partes:[
      { id:'mangle-rojo', n:'Mangle rojo', sci:'Rhizophora mangle', rol:'Productor · especie ingeniera', at:[-2.2,2.3,0.6],
        d:'Forma la primera línea frente al mar sobre un enredo de raíces zancudas que salen del tronco y de las ramas.',
        adapt:'Excluye la sal en la raíz: filtra hasta el 90 % del sodio antes de que entre a la planta. Sus semillas germinan todavía en el árbol (viviparismo) y caen como lanzas que se clavan en el fango.',
        dato:'En Majagual (Cayapas-Mataje, Esmeraldas) están los manglares más altos del mundo, con árboles de hasta 60 m.' },
      { id:'mangle-negro', n:'Mangle negro', sci:'Avicennia germinans', rol:'Productor · zona interior', at:[2.6,1.9,-1.6],
        d:'Crece detrás del mangle rojo, donde el suelo se seca más y la sal se concentra.',
        adapt:'Neumatóforos: raíces que salen verticalmente del fango como lápices para respirar, porque el suelo no tiene oxígeno. Además excreta la sal por glándulas en las hojas: se ven cristales blancos en el envés.',
        dato:'Un bosque de mangle negro puede tener más de 10.000 neumatóforos por cada 100 m².' },
      { id:'estuario', n:'Agua salobre y marea', sci:'Estuario', rol:'Factor abiótico maestro', at:[5.0,0.1,2.6],
        d:'La marea sube y baja dos veces al día, con un rango de 2 a 4 m. Cada seis horas cambian la salinidad, el oxígeno y la temperatura.',
        adapt:'Los organismos del manglar son eurihalinos: toleran rangos amplios de salinidad. Esa tolerancia es la que deja fuera a la mayoría de especies marinas y de agua dulce.',
        dato:'El agua del estuario mezcla ríos y mar: la salinidad pasa de 0 a 35 partes por mil en pocos kilómetros.' },
      { id:'cangrejo', n:'Cangrejo rojo', sci:'Ucides occidentalis', rol:'Detritívoro · consumidor primario', at:[-3.4,0.2,2.8],
        d:'Vive en cuevas de hasta 1,5 m en el fango y se alimenta de hojas caídas del mangle.',
        adapt:'Sus branquias funcionan dentro de una cámara húmeda que le permite pasar horas fuera del agua; cava cuevas que airean el suelo anóxico.',
        dato:'La captura del cangrejo rojo da trabajo a unas 5.000 familias en el golfo de Guayaquil. La veda protege la reproducción en febrero y marzo.' },
      { id:'concha', n:'Concha prieta', sci:'Anadara tuberculosa', rol:'Filtrador · consumidor primario', at:[-1.0,0.05,3.4],
        d:'Molusco que vive enterrado entre las raíces del mangle rojo y filtra el agua para alimentarse.',
        adapt:'Tiene hemoglobina en la sangre (rara en moluscos), lo que le permite vivir en fango con muy poco oxígeno.',
        dato:'Filtrando, un banco de conchas limpia el agua y retiene sedimentos: un servicio ecosistémico que nadie paga.' },
      { id:'fragata', n:'Fragata y aves del estuario', sci:'Fregata magnificens', rol:'Consumidor secundario', at:[1.4,4.2,2.0],
        d:'Grandes aves marinas que anidan en el manglar y pescan en el estuario; también hay garzas, ibis y el pelícano pardo.',
        adapt:'La fragata tiene la mayor superficie de ala por peso corporal de todas las aves: planea horas sin batir las alas, pero no puede posarse en el agua porque sus plumas no son impermeables.',
        dato:'Más del 70 % de las especies que se pescan en el Pacífico ecuatoriano pasan alguna etapa de su vida en el manglar.' }
    ]
  },
  paramo:{
    id:'paramo', n:'Páramo', em:'🏔️', ar:'el', sub:'Pajonal andino sobre los 3.400 m',
    clima:'6 a 8 °C de media, pero con oscilación diaria de 20 °C: "invierno todas las noches y verano todos los días". Radiación ultravioleta muy alta.',
    altitud:'De 3.400 a 4.700 m s. n. m. · Carchi (El Ángel), Cotopaxi, Chimborazo, Cajas, Antisana, Cayambe.',
    suelo:'Andosoles negros, formados sobre ceniza volcánica, con mucha materia orgánica: retienen hasta el doble de su peso en agua. Funcionan como una esponja.',
    d:'El ecosistema que le da de beber al Ecuador: Quito, Cuenca y Ambato toman su agua del páramo. Las plantas crecen lentísimo porque hace frío todos los días del año.',
    sky:0x9FB8CF, fog:[0xC4D2DE, 24, 60],
    partes:[
      { id:'frailejon', n:'Frailejón', sci:'Espeletia pycnophylla', rol:'Productor emblemático', at:[-2.0,1.0,1.4],
        d:'Roseta de hojas gruesas sobre un tronco cubierto de hojas viejas. En el Ecuador solo crece en el páramo de El Ángel (Carchi).',
        adapt:'Tres adaptaciones al frío en una sola planta: pelos blancos (pubescencia) que reflejan el ultravioleta y frenan la pérdida de agua; hojas muertas que no se caen y aíslan el tronco como un abrigo; roseta que concentra el calor y recoge el agua hacia el centro.',
        dato:'Crece entre 1 y 2 cm al año: un frailejón de 2 m puede tener más de 100 años.' },
      { id:'pajonal', n:'Pajonal', sci:'Calamagrostis intermedia', rol:'Productor dominante', at:[2.2,0.5,-0.8],
        d:'Macollas de pasto duro que cubren la mayor parte del páramo y le dan su color dorado.',
        adapt:'Hojas enrolladas y con sílice que reducen la pérdida de agua y desalientan a los herbívoros; las yemas de crecimiento quedan protegidas dentro de la macolla, por eso rebrotan después de una quema.',
        dato:'Quemar el pajonal para renovar el pasto elimina la materia orgánica del suelo: el andosol pierde su capacidad de retener agua.' },
      { id:'almohadillas', n:'Almohadillas', sci:'Plantago rigida, Azorella', rol:'Productor · retención de agua', at:[-0.4,0.25,3.2],
        d:'Cojines vegetales duros y compactos que crecen al ras del suelo en las zonas más húmedas.',
        adapt:'La forma de cojín reduce la superficie expuesta al viento y crea un microclima varios grados más caliente en su interior. Acumulan agua como una esponja viva.',
        dato:'Una almohadilla puede retener hasta 10 veces su peso en agua; alimenta los riachuelos en época seca.' },
      { id:'laguna', n:'Laguna y turbera', sci:'Humedal altoandino', rol:'Reservorio de agua y carbono', at:[3.8,0.05,2.8],
        d:'Lagunas de origen glaciar y turberas: suelos encharcados donde la materia orgánica no se descompone del todo.',
        adapt:'Con frío y sin oxígeno, los descomponedores trabajan muy lento: la materia orgánica se acumula durante siglos y guarda enormes cantidades de carbono.',
        dato:'El páramo almacena entre 30 y 50 kg de carbono por m² en el suelo, mucho más que un bosque tropical.' },
      { id:'condor', n:'Cóndor andino', sci:'Vultur gryphus', rol:'Carroñero · ave nacional', at:[0.8,4.6,-2.6],
        d:'Ave voladora más grande del mundo por peso y envergadura (hasta 3,3 m). Come animales muertos.',
        adapt:'Vuela planeando con las corrientes térmicas del día: recorre más de 200 km sin batir las alas, lo que le permite encontrar carroña en un territorio enorme con poquísima energía.',
        dato:'En el Ecuador quedan alrededor de 150 cóndores. Pone un solo huevo cada dos o tres años: cualquier muerte adulta es difícil de reponer.' },
      { id:'oso', n:'Oso andino', sci:'Tremarctos ornatus', rol:'Consumidor · dispersor de semillas', at:[-3.4,0.6,-2.2],
        d:'El único oso de Sudamérica. Vive entre el bosque nublado y el páramo; su dieta es principalmente vegetal.',
        adapt:'Come corazones de achupalla (Puya) y bromelias, alimentos duros que casi ningún otro animal aprovecha; al desplazarse dispersa semillas entre el bosque y el páramo.',
        dato:'Necesita más de 100 km² de territorio continuo: cuando la carretera o el potrero parten el páramo, las poblaciones se aíslan.' }
    ]
  },
  galapagos:{
    id:'galapagos', n:'Galápagos', em:'🐢', ar:'', sub:'Islas oceánicas volcánicas',
    clima:'Estación seca y fresca (garúa, junio a diciembre, 19 a 22 °C) y estación cálida y lluviosa (enero a mayo, 26 a 30 °C). La corriente fría de Humboldt hace que el archipiélago sea árido pese a estar en el ecuador.',
    altitud:'De 0 a 1.707 m s. n. m. (volcán Wolf, Isabela) · 13 islas grandes y más de 100 islotes.',
    suelo:'Lava basáltica joven, casi sin suelo en la costa; en las partes altas hay suelos volcánicos húmedos con vegetación de Scalesia.',
    d:'Cada isla es un experimento natural. La lejanía (1.000 km del continente) filtró qué llegaba, y el aislamiento hizo el resto: casi el 30 % de las plantas y el 80 % de los reptiles no existen en ningún otro lugar del planeta.',
    sky:0x9EC3D8, fog:[0xCBDCE4, 26, 64],
    partes:[
      { id:'tortuga', n:'Tortuga gigante', sci:'Chelonoidis spp.', rol:'Herbívoro · ingeniera del ecosistema', at:[-1.6,0.55,1.8],
        d:'Puede pesar 250 kg y vivir más de 150 años. Hay caparazones en domo (islas húmedas) y en silla de montar (islas áridas).',
        adapt:'El caparazón en silla de montar deja subir el cuello para alcanzar los cactus altos: es una respuesta evolutiva a la escasez de alimento a ras de suelo. Almacena agua y grasa para meses de sequía.',
        dato:'De 15 poblaciones originales, 3 se extinguieron. Las demás se recuperan con programas de crianza.' },
      { id:'opuntia', n:'Cactus de Galápagos', sci:'Opuntia echios', rol:'Productor · zona árida', at:[2.4,1.7,-1.0],
        d:'Cactus arborescente de hasta 12 m, con un tronco leñoso y corteza áspera. Es la base de la zona seca.',
        adapt:'Donde hay tortugas e iguanas terrestres, el cactus crece como árbol, con las pencas fuera de su alcance y un tronco protegido por corteza; en las islas sin herbívoros grandes crece bajo y sin tronco.',
        dato:'Sus frutos y pencas son agua y comida para tortugas, iguanas y pinzones durante la estación seca.' },
      { id:'iguana', n:'Iguana marina', sci:'Amblyrhynchus cristatus', rol:'Herbívoro marino · único en el mundo', at:[3.4,0.25,2.6],
        d:'El único lagarto del planeta que se alimenta bajo el mar, pastando algas en las rocas.',
        adapt:'Glándulas nasales que expulsan la sal con un estornudo; cola aplanada para nadar; color oscuro para recalentarse al sol después de bucear en agua a 16 °C. En años de El Niño llega a reabsorber parte de su esqueleto y encoger hasta 20 % para sobrevivir con menos comida.',
        dato:'Puede bucear hasta 30 minutos y bajar 10 m, pero solo los machos grandes bucean: los pequeños comen en la orilla.' },
      { id:'pinzones', n:'Pinzones de Darwin', sci:'Geospiza, Camarhynchus', rol:'Consumidores · radiación adaptativa', at:[1.2,2.6,1.4],
        d:'De un solo ancestro llegado del continente surgieron unas 17 especies que se reparten los recursos por el tamaño y la forma del pico.',
        adapt:'Picos gruesos para semillas duras, finos para insectos, y hasta un pinzón carpintero que usa una espina de cactus como herramienta para sacar larvas.',
        dato:'En la sequía de 1977 en Daphne Mayor murió el 85 % de los pinzones: sobrevivieron los de pico más grande y el promedio de la población cambió en una sola generación.' },
      { id:'lava', n:'Lava y suelo volcánico', sci:'Basalto', rol:'Sustrato · sucesión primaria', at:[-3.8,0.35,-2.2],
        d:'Coladas de lava recientes, negras y desnudas, donde empieza la sucesión: primero líquenes y cactus de lava, después arbustos.',
        adapt:'El cactus de lava (Brachycereus) es una de las primeras plantas que coloniza la roca desnuda; sus raíces rompen el basalto y crean los primeros gramos de suelo.',
        dato:'Isabela y Fernandina siguen en formación: la erupción del volcán La Cumbre de 2024 cubrió kilómetros de territorio con lava nueva.' },
      { id:'humboldt', n:'Corriente fría de Humboldt', sci:'Afloramiento de aguas frías', rol:'Factor abiótico maestro', at:[5.0,0.1,3.4],
        d:'Trae agua fría y cargada de nutrientes desde el sur. Explica la aridez de las islas y la riqueza del mar.',
        adapt:'Gracias a ella hay pingüinos y lobos marinos en pleno ecuador: el pingüino de Galápagos es la única especie de pingüino que vive al norte de la línea equinoccial.',
        dato:'Cuando El Niño calienta el agua, el afloramiento se detiene, el fitoplancton desaparece y mueren de hambre iguanas marinas, lobos y pingüinos.' }
    ]
  }
};
const EC2_ORDEN = ['amazonia','manglar','paramo','galapagos'];

/* =====================================================================
   2 · ESCENAS 3D PROCEDIMENTALES (Three.js r128, sin librerías externas)
   v1.7 · vegetación y fauna modeladas por ecosistema: cada planta y cada
   animal se construye pieza a pieza, se pinta con colores por vértice
   (luz de arriba, sombra en la base, variación natural) y se fusiona en
   pocas mallas por parte para no pasar de ~120 mil triángulos.
   ===================================================================== */
/* Three.js r128 no gestiona el espacio de color: los tonos hexadecimales se
   interpretan como lineales y se ven lavados. Se convierten aquí a lineal. */
function ec2Lin(col){ return new THREE.Color(col).convertSRGBToLinear(); }
function ec2M(col, extra){ return mat(ec2Lin(col), Object.assign({ roughness:0.92, clearcoat:0, metalness:0, envMapIntensity:0.3 }, extra||{})); }
/* primitivas sueltas: las usa también la misión del manglar (src/61) */
function ec2Cyl(r1, r2, hh, col, seg){ return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, hh, seg||8), ec2M(col)); }
function ec2Sph(r, col, seg){ const s = seg || 12; return new THREE.Mesh(new THREE.SphereGeometry(r, s, Math.max(6, s-4)), ec2M(col)); }
function ec2Box(w, hh, d, col){ return new THREE.Mesh(new THREE.BoxGeometry(w, hh, d), ec2M(col)); }

/* ---------- color y geometría ---------- */
const EC2_C = new THREE.Color();
function ec2Rgb(hex){ EC2_C.set(hex); return [EC2_C.r, EC2_C.g, EC2_C.b]; }
function ec2Mix(a, b, t){ return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]; }
function ec2Set(o, c, k){ const f = k == null ? 1 : k; o[0] = c[0]*f; o[1] = c[1]*f; o[2] = c[2]*f; return o; }
const ec2N = (x, y, z, o) => Kit.fbm(x, y, z, o || 2);
/* ruido celular (Worley): distancia al punto de rasgo más cercano, en unidades de celda (rosetas, escudos) */
function ec2Celda(x, y, z){
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z); let d1 = 9;
  for (let a=-1; a<=1; a++) for (let b=-1; b<=1; b++) for (let c=-1; c<=1; c++){
    const cx = ix + a, cy = iy + b, cz = iz + c;
    let hh = (cx*374761393 + cy*668265263 + cz*2147483647) | 0; hh = Math.imul(hh ^ (hh >>> 13), 1274126177); hh ^= hh >>> 16;
    const fx = cx + ((hh & 255)/255), fy = cy + (((hh >>> 8) & 255)/255), fz = cz + (((hh >>> 16) & 255)/255);
    const d = Math.hypot(x - fx, y - fy, z - fz); if (d < d1) d1 = d;
  }
  return d1;
}
/* pinta una geometría: fn(x,y,z,salida,base) escribe un color sRGB; se guarda en lineal */
function ec2Paint(g, fn, base){
  const p = g.attributes.position, n = p.count, c = new Float32Array(n*3), o = [0,0,0];
  for (let i=0; i<n; i++){
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    if (fn) fn(x, y, z, o, base); else ec2Set(o, base);
    c[i*3] = Math.pow(clamp(o[0],0,1), 2.2); c[i*3+1] = Math.pow(clamp(o[1],0,1), 2.2); c[i*3+2] = Math.pow(clamp(o[2],0,1), 2.2);
  }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  if (g.attributes.uv) g.deleteAttribute('uv');
  if (g.attributes.uv2) g.deleteAttribute('uv2');
  return g;
}
function ec2Mx(x, y, z, rx, ry, rz, sx, sy, sz){
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rx||0, ry||0, rz||0, 'YXZ'));
  const s = sx == null ? 1 : sx;
  return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(s, sy == null ? s : sy, sz == null ? s : sz));
}
/* un "cubo" de piezas: se pintan en coordenadas locales, se colocan y se fusionan en una sola malla */
function ec2Bin(){
  const gs = [];
  return {
    add(g, col, m, fn){ if (!g.attributes.normal) g.computeVertexNormals(); ec2Paint(g, fn, Array.isArray(col) ? col : ec2Rgb(col)); if (m) g.applyMatrix4(m); gs.push(g); return g; },
    raw(g){ gs.push(g); return g; },
    get n(){ return gs.length; },
    mesh(o){
      if (!gs.length) return null;
      const op = o || {};
      const m = new THREE.Mesh(Kit.merge(gs.splice(0)), new THREE.MeshStandardMaterial({ color:0xffffff, vertexColors:true,
        roughness: op.rough ?? 0.86, metalness:0, envMapIntensity: op.env ?? 0.8, side: op.side ?? THREE.FrontSide,
        transparent: !!op.transparent, opacity: op.opacity ?? 1, depthWrite: op.depthWrite ?? true }));
      m.castShadow = op.cast !== false; m.receiveShadow = op.receive !== false;
      return m;
    }
  };
}
/* segmento cónico de a hasta b (tronco, rama, pata) */
function ec2Seg(bin, a, b, r0, r1, col, seg, fn){
  const A = new THREE.Vector3(a[0], a[1], a[2]), B = new THREE.Vector3(b[0], b[1], b[2]);
  const d = B.clone().sub(A), L = d.length() || 0.001;
  const g = new THREE.CylinderGeometry(r1, r0, L, seg || 7, 1, false); g.translate(0, L/2, 0);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), d.normalize());
  const m = new THREE.Matrix4().compose(A, q, new THREE.Vector3(1,1,1));
  return bin.add(g, col, m, fn);
}
/* tubo cónico por una curva */
function ec2Tubo(bin, pts, r0, r1, col, seg, rad, fn, rfn){
  const g = Kit.taper(pts.map(p => new THREE.Vector3(p[0], p[1], p[2])), r0, r1, { seg:seg||16, rad:rad||7, rfn });
  return bin.add(g, col, null, fn);
}
/* masa de follaje: icosaedro deformado con ruido, sombreado de abajo hacia arriba */
function ec2Masa(bin, x, y, z, rx, ry, rz, col, o){
  const c = Object.assign({ det:2, amp:0.22, fq:1.6, seed:0, luz:0.1, sombra:0.5, vari:0.08, tono:null, hoja:0.1 }, o||{});
  const det = c.det >= 2 && Math.max(rx, rz) > 0.85 ? c.det + 1 : c.det;
  const g = new THREE.IcosahedronGeometry(1, det), p = g.attributes.position, v = new THREE.Vector3();
  for (let i=0; i<p.count; i++){
    v.fromBufferAttribute(p, i);
    const n = ec2N(v.x*c.fq + c.seed, v.y*c.fq + 3.1, v.z*c.fq - c.seed, 3), n2 = ec2N(v.x*6.5 + c.seed, v.y*6.5, v.z*6.5, 1);
    v.multiplyScalar(1 + c.amp*n + c.hoja*n2);
    if (v.y < -0.35) v.y = -0.35 + (v.y + 0.35)*0.45;          /* base aplanada, como una copa real */
    p.setXYZ(i, v.x*rx, v.y*ry, v.z*rz);
  }
  g.computeVertexNormals(); Kit.weldNormals(g);
  const base = Array.isArray(col) ? col : ec2Rgb(col), alt = c.tono ? ec2Rgb(c.tono) : base;
  bin.add(g, base, new THREE.Matrix4().makeTranslation(x, y, z), (px, py, pz, out) => {
    const t = clamp((py/ry + 1)/2, 0, 1), nn = ec2N(px*2.4 + c.seed, py*2.4, pz*2.4, 2), fine = ec2N(px*9, py*9, pz*9, 1);
    const cc = ec2Mix(base, alt, clamp(0.5 + nn*1.6, 0, 1));
    ec2Set(out, cc, (1 - c.sombra) + (c.sombra + c.luz)*Math.pow(t, 1.3) + c.vari*fine*2);
  });
  return g;
}
/* hoja plana (lámina lanceolada) orientada: base en el origen, crece hacia +y y se curva hacia +z */
function ec2Hoja(L, W, curva, segs){
  const n = segs || 4, pos = [], idx = [];
  for (let i=0; i<=n; i++){
    const t = i/n, w = W*Math.sin(Math.PI*Math.min(1, t*1.05))*(1 - 0.25*t), y = L*t, zc = curva*t*t*L;
    pos.push(-w/2, y, zc, 0, y, zc - W*0.08, w/2, y, zc);
  }
  for (let i=0; i<n; i++){ const a = i*3, b = (i+1)*3; idx.push(a, b, a+1, a+1, b, b+1, a+1, b+1, a+2, a+2, b+1, b+2); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
  return g;
}
/* fronda pinnada (palmas y helechos): raquis arqueado con folíolos a ambos lados */
function ec2Fronda(L, n, lf, caida){
  const pos = [], P = t => [0, L*(0.55*t - caida*t*t), L*t];
  for (let i=1; i<=n; i++){
    const t = i/(n+1), p = P(t), q = P(t + 0.5/(n+1)), len = lf*Math.sin(Math.PI*(0.2 + 0.8*t))*(1 - 0.35*t), dz = 0.35*len;
    [1,-1].forEach(s => { pos.push(p[0], p[1], p[2], q[0], q[1], q[2], s*len, p[1] - len*0.45, p[2] + dz); });
  }
  for (let i=0; i<10; i++){ const a = P(i/10), b = P((i+1)/10); pos.push(-0.012, a[1], a[2], 0.012, a[1], a[2], 0, b[1], b[2]); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals();
  return g;
}
/* ala plana con perfil (aves): estaciones [envergadura, borde de ataque, borde de fuga] */
function ec2Ala(st, grosor, sg){
  const sh = new THREE.Shape(), k = sg || 1;
  sh.moveTo(st[0][1], k*st[0][0]); st.forEach(s => sh.lineTo(s[1], k*s[0]));
  for (let i=st.length-1; i>=0; i--) sh.lineTo(st[i][2], k*st[i][0]);
  const g = new THREE.ExtrudeGeometry(sh, { depth: grosor || 0.03, bevelEnabled:false, curveSegments:2 });
  g.rotateX(Math.PI/2);  /* queda en el plano XZ: x = cuerda, z = envergadura */
  return g;
}
/* franja de color sobre el ala (plumas cobertoras, parches blancos): entre las envergaduras s0–s1 y las fracciones de cuerda f0–f1 */
function ec2AlaParche(st, s0, s1, f0, f1, grosor, sg){
  const LT = v => { for (let k=1; k<st.length; k++){ if (v <= st[k][0] || k === st.length-1){ const a = st[k-1], b = st[k], t = clamp((v - a[0])/((b[0] - a[0]) || 1), 0, 1); return [a[1] + (b[1]-a[1])*t, a[2] + (b[2]-a[2])*t]; } } return [st[0][1], st[0][2]]; };
  const ss = [s0].concat(st.map(q => q[0]).filter(v => v > s0 && v < s1), [s1]), sh = new THREE.Shape(), k = sg || 1;
  ss.forEach((v, i) => { const [l, t] = LT(v), x = l + (t - l)*f0; if (i) sh.lineTo(x, k*v); else sh.moveTo(x, k*v); });
  for (let i=ss.length-1; i>=0; i--){ const [l, t] = LT(ss[i]); sh.lineTo(l + (t - l)*f1, k*ss[i]); }
  const g = new THREE.ExtrudeGeometry(sh, { depth:grosor, bevelEnabled:false, curveSegments:2 });
  g.rotateX(Math.PI/2); g.translate(0, grosor*0.14, 0);
  return g;
}

/* ---------- entorno: cielo, luces, niebla, horizonte, agua ---------- */
function ec2Cielo(E, alto, hor, bajo, tierra){
  const g = new THREE.SphereGeometry(62, 32, 18), A = ec2Rgb(alto), H = ec2Rgb(hor), B = ec2Rgb(bajo || hor);
  ec2Paint(g, (x, y, z, o) => { const t = y/62; ec2Set(o, t >= 0 ? ec2Mix(H, A, Math.pow(t, 0.55)) : ec2Mix(H, B, Math.min(1, -t*4))); });
  const mt = new THREE.MeshBasicMaterial({ vertexColors:true, side:THREE.BackSide, fog:false, depthWrite:false });
  const m = new THREE.Mesh(g, mt); m.renderOrder = -10; E.scene.add(m);
  /* el cielo también ilumina y se refleja: se sustituye el estudio por un entorno hecho con este mismo cielo */
  try {
    const pm = new THREE.PMREMGenerator(E.renderer), sc = new THREE.Scene(), g2 = g.clone(), T = ec2Rgb(tierra || 0x3A3A30);
    ec2Paint(g2, (x, y, z, o) => { const t = y/62; ec2Set(o, t >= 0 ? ec2Mix(H, A, Math.pow(t, 0.55)) : ec2Mix(H, T, Math.min(1, -t*6))); });
    const sol = new THREE.Mesh(new THREE.SphereGeometry(4, 12, 8), new THREE.MeshBasicMaterial({ color:0xfff6e0 }));
    sol.position.set(26, 44, 18); sc.add(new THREE.Mesh(g2, mt.clone()), sol);
    const rt = pm.fromScene(sc, 0.04), viejo = E.scene.environment;
    E.scene.environment = rt.texture; if (viejo && viejo.dispose) viejo.dispose();
    g2.dispose(); sol.geometry.dispose(); pm.dispose();
  } catch(e){ console.warn('entorno del cielo', e); }
  return m;
}
function ec2Luz(E, o){
  const low = E.low;
  E.scene.traverse(l => {
    if (l.isHemisphereLight){ l.color.set(o.cielo); l.groundColor.set(o.suelo); l.intensity = o.hemi ?? 0.4; }
    else if (l.isDirectionalLight){
      if (!E._ec2Sol){ E._ec2Sol = l; l.position.set(o.sol[0], o.sol[1], o.sol[2]); l.color.set(o.colSol || 0xfff1dc); l.intensity = o.fuerza ?? 1.25;
        if (!low){ l.castShadow = true; const s = l.shadow; s.mapSize.set(2048, 2048); s.bias = -0.0006; s.normalBias = 0.02;
          const c = s.camera; c.left = -12; c.right = 12; c.top = 12; c.bottom = -12; c.near = 1; c.far = 60; c.updateProjectionMatrix(); } }
      else l.intensity = 0;   /* sin luces de estudio: evitan brillos falsos sobre el agua */
    }
  });
  if (!low){ E.renderer.shadowMap.enabled = true; E.renderer.shadowMap.type = THREE.PCFSoftShadowMap; }
}
function ec2Niebla(E, col, cerca, lejos){ E.scene.fog = new THREE.Fog(col, cerca, lejos); }
/* anillo de relieve lejano (cordilleras, bosque en el horizonte) */
function ec2Horizonte(E, R, alto, hfn, colA, colB, y0, colFn){
  const seg = E.low ? 64 : 128, g = new THREE.CylinderGeometry(R, R*1.02, 1, seg, 3, true), p = g.attributes.position;
  for (let i=0; i<p.count; i++){ const x = p.getX(i), z = p.getZ(i), y = p.getY(i) + 0.5, a = Math.atan2(z, x);
    p.setY(i, (y0 || 0) - 2 + y*(2 + alto*hfn(a))); }
  g.computeVertexNormals();
  const A = ec2Rgb(colA), B = ec2Rgb(colB);
  ec2Paint(g, colFn || ((x, y, z, o) => ec2Set(o, ec2Mix(A, B, clamp((y - (y0||0))/(alto*0.9), 0, 1)))));
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors:true, roughness:1, metalness:0, side:THREE.DoubleSide, envMapIntensity:0.6 }));
  E.scene.add(m); return m;
}
/* textura procedural para el agua: vetas y reflejos que se desplazan con la corriente */
function ec2TexAgua(col, vetas, seed){
  const S = 256, cv = document.createElement('canvas'); cv.width = cv.height = S;
  const x = cv.getContext('2d'), img = x.createImageData(S, S), c = ec2Rgb(col).map(v => v*255);
  for (let j=0; j<S; j++) for (let i=0; i<S; i++){
    const u = i/S, v = j/S;
    const n = Kit.fbm(Math.cos(u*Math.PI*2)*1.2 + seed, Math.sin(u*Math.PI*2)*1.2, v*vetas, 3) + 0.5*Kit.fbm(Math.cos(v*Math.PI*2)*3, Math.sin(v*Math.PI*2)*3 + seed, u*4, 2);
    const k = 0.9 + 0.2*n, hl = n > 0.42 ? (n - 0.42)*1.6 : 0, o = (j*S + i)*4;
    img.data[o] = clamp(c[0]*k + hl*70, 0, 255); img.data[o+1] = clamp(c[1]*k + hl*70, 0, 255); img.data[o+2] = clamp(c[2]*k + hl*65, 0, 255); img.data[o+3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(cv); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
  return t;
}
function ec2Agua(size, y, col, op, o){
  const c = o || {}, seg = c.seg || 1;
  const g = new THREE.PlaneGeometry(size, size, seg, seg); g.rotateX(-Math.PI/2);
  const tex = c.tex ? ec2TexAgua(col, c.vetas || 6, c.seed || 1) : null;
  if (tex) tex.repeat.set(c.rep || 4, c.rep || 4);
  const m = new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({ color: tex ? 0xffffff : ec2Lin(col), map:tex, transparent:true, opacity: op==null ? 0.82 : op,
    roughness: c.rough ?? 0.12, metalness:0, envMapIntensity: c.env ?? 0.9, clearcoat:0.5, clearcoatRoughness:0.12, depthWrite:true }));
  m.position.y = y; m.userData.keepOpacity = true; m.receiveShadow = true; m.userData.tex = tex;
  return m;
}
/* velos de niebla: planos siempre de frente con un degradado radial */
function ec2Velos(E, n, zona, col, op){
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const x = cv.getContext('2d');
  const gr = x.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.5, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(cv), R = Kit.rng(71), out = [];
  for (let i=0; i<n; i++){
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map:tex, color:col, transparent:true, opacity:op*(0.6 + 0.4*R()), depthWrite:false, fog:true }));
    s.position.set(zona[0] + R()*(zona[1]-zona[0]), zona[2] + R()*(zona[3]-zona[2]), zona[4] + R()*(zona[5]-zona[4]));
    const k = zona[6] + R()*zona[7]; s.scale.set(k*1.9, k*0.6, 1); s.userData.v = 0.08 + R()*0.12; s.renderOrder = 5;
    E.scene.add(s); out.push(s);
  }
  return out;
}
const ec2Mov = () => (typeof motionOK === 'function' ? motionOK() : true);

/* ---------- relieve ---------- */
/* hfn(x,z) da la altura: se usa para el relieve y para posar encima cada planta y animal */
function ec2Terreno(size, hfn, colA, colB, rango, o){
  const c = o || {}, seg = c.seg || 48;
  const g = new THREE.PlaneGeometry(size, size, seg, seg); g.rotateX(-Math.PI/2);
  const p = g.attributes.position;
  for (let i=0; i<p.count; i++) p.setY(i, hfn(p.getX(i), p.getZ(i)));
  g.computeVertexNormals();
  const A = ec2Rgb(colA), B = ec2Rgb(colB), R = rango || 1;
  ec2Paint(g, c.color || ((x, y, z, out) => ec2Set(out, ec2Mix(A, B, clamp((y + R)/(2*R), 0, 1)))));
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors:true, roughness: c.rough ?? 0.97, metalness:0, envMapIntensity:0.7 }));
  m.receiveShadow = true; return m;
}

/* =====================================================================
   FLORA
   ===================================================================== */
const EC2_VERDES = { dosel:[0x2F6A2E, 0x3E7F33, 0x2B5E36, 0x4A8436, 0x356F3A, 0x557F2C], claro:0x86B04A };
/* árbol del dosel amazónico: tronco recto, ramas altas y copa de varias masas */
function ec2ArbolDosel(bin, hojas, x, y, z, alt, ancho, seed, low){
  const R = Kit.rng(seed), corteza = [0x6F6353, 0x5C5146, 0x7C6E5C][seed % 3];
  const tronco = (px, py, pz, o, b) => ec2Set(o, b, 0.62 + 0.38*clamp(py/(alt*0.6), 0, 1) + 0.12*ec2N(px*6, py*3, pz*6, 1));
  const lean = [(R()-0.5)*0.35, (R()-0.5)*0.35];
  ec2Tubo(bin, [[x, y-0.2, z], [x + lean[0]*0.4, y + alt*0.45, z + lean[1]*0.4], [x + lean[0], y + alt*0.82, z + lean[1]]], alt*0.045, alt*0.024, corteza, low ? 6 : 10, low ? 5 : 7, tronco);
  const top = [x + lean[0], y + alt*0.82, z + lean[1]], n = low ? 3 : 5;
  for (let i=0; i<n; i++){
    const a = i/n*Math.PI*2 + R(), r = ancho*(0.35 + 0.35*R()), hy = alt*(0.88 + 0.12*R());
    const cx = top[0] + Math.cos(a)*r, cz = top[2] + Math.sin(a)*r;
    ec2Seg(bin, top, [cx, y + hy - 0.15, cz], alt*0.02, alt*0.008, corteza, 5, tronco);
    const col = EC2_VERDES.dosel[(seed + i) % EC2_VERDES.dosel.length];
    ec2Masa(hojas, cx, y + hy, cz, ancho*(0.55 + 0.25*R()), ancho*(0.36 + 0.14*R()), ancho*(0.55 + 0.25*R()), col, { seed:seed*3 + i, det: low ? 1 : 2, tono: EC2_VERDES.dosel[(seed + i + 2) % 6] });
  }
  ec2Masa(hojas, top[0], y + alt*0.98, top[2], ancho*0.7, ancho*0.42, ancho*0.7, EC2_VERDES.dosel[seed % 6], { seed:seed*7, det: low ? 1 : 2, tono:EC2_VERDES.claro });
}
/* ceibo emergente: tronco pálido muy alto, contrafuertes y copa aparasolada */
function ec2Ceibo(bin, hojas, x, y, z, low){
  const alt = 5.3, R = Kit.rng(5), gris = 0xA39C8C;
  const corteza = (px, py, pz, o, b) => ec2Set(o, b, 0.66 + 0.3*clamp((py - y)/3, 0, 1) + 0.1*ec2N(px*5, py*1.5, pz*5, 2));
  ec2Tubo(bin, [[x, y-0.3, z], [x, y + 1.2, z], [x + 0.05, y + 3.4, z - 0.05], [x + 0.1, y + alt, z - 0.08]], 0.27, 0.13, gris, low ? 8 : 14, low ? 7 : 12, corteza);
  /* contrafuertes: aletas delgadas que se abren desde la base (raíces tabulares) */
  const nf = low ? 5 : 7;
  for (let i=0; i<nf; i++){
    const a = i/nf*Math.PI*2 + 0.3, L = 1.05 + 0.4*R(), H = 1.25 + 0.5*R();
    const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(L, 0);
    sh.quadraticCurveTo(L*0.18, H*0.12, 0.02, H); sh.lineTo(0, 0);
    const g = new THREE.ExtrudeGeometry(sh, { depth:0.07, bevelEnabled:true, bevelThickness:0.02, bevelSize:0.02, bevelSegments:1, curveSegments: low ? 5 : 9 });
    g.translate(0.1, -0.12, -0.035);
    bin.add(g, gris, ec2Mx(x, y, z, 0, -a, 0), corteza);
  }
  /* ramas horizontales y copa en parasol por encima del dosel */
  const cima = [x + 0.1, y + alt, z - 0.08], ramas = [];
  for (let i=0; i<6; i++){
    const a = i/6*Math.PI*2 + 0.4, r = 1.25 + 0.5*R(), p = [cima[0] + Math.cos(a)*r, y + alt + 0.45 + 0.3*R(), cima[2] + Math.sin(a)*r];
    ec2Tubo(bin, [[cima[0], cima[1] - 0.3, cima[2]], [cima[0] + Math.cos(a)*r*0.5, cima[1] + 0.2, cima[2] + Math.sin(a)*r*0.5], p], 0.09, 0.035, gris, 8, 6, corteza);
    ramas.push(p);
    ec2Masa(hojas, p[0], p[1] + 0.2, p[2], 0.95 + 0.3*R(), 0.42, 0.95 + 0.3*R(), [0x4E8A3A, 0x3F7D35, 0x5C9440][i % 3], { seed:40 + i, det: low ? 1 : 2, tono:0x8DB352, amp:0.26 });
  }
  ec2Masa(hojas, cima[0], y + alt + 0.95, cima[2], 1.2, 0.48, 1.2, 0x4C8A3C, { seed:77, det: low ? 1 : 2, tono:0x9BBF5C });
  return { cima, ramas, alt };
}
/* palma: estípite anillado, raíces fúlcreas opcionales (pambil) y corona de frondas */
function ec2Palma(bin, hojas, x, y, z, alt, o){
  const c = Object.assign({ seed:1, frondas:9, zancos:false, inclina:0.2, low:false }, o||{}), R = Kit.rng(c.seed);
  const a0 = R()*6.28, dx = Math.cos(a0)*c.inclina, dz = Math.sin(a0)*c.inclina;
  const anillos = (px, py, pz, out, b) => ec2Set(out, b, 0.78 + 0.18*Math.sin(py*34) + 0.08*ec2N(px*8, py*8, pz*8, 1));
  const top = [x + dx, y + alt, z + dz];
  ec2Tubo(bin, [[x, y + (c.zancos ? 0.45 : -0.1), z], [x + dx*0.4, y + alt*0.5, z + dz*0.4], top], 0.075, 0.055, 0x8E8575, c.low ? 8 : 14, 6, anillos);
  if (c.zancos) for (let i=0; i<7; i++){ const a = i/7*6.28, r = 0.36 + 0.1*R();
    ec2Seg(bin, [x + Math.cos(a)*0.03, y + 0.6, z + Math.sin(a)*0.03], [x + Math.cos(a)*r, y - 0.05, z + Math.sin(a)*r], 0.028, 0.022, 0x6F5E4B, 5); }
  ec2Seg(bin, [top[0], top[1] - 0.35, top[2]], [top[0], top[1] + 0.05, top[2]], 0.075, 0.065, 0x6D8A45, 7);   /* capitel verde */
  const n = c.low ? Math.ceil(c.frondas*0.6) : c.frondas, verde = ec2Rgb(0x4F8A34), seco = ec2Rgb(0x8E8A3E);
  for (let i=0; i<n; i++){
    const g = ec2Fronda(1.05 + 0.3*R(), c.low ? 9 : 15, 0.36, 0.55 + 0.35*R());
    const ry = i/n*Math.PI*2 + R()*0.4, tilt = -0.25 + 0.5*R();
    hojas.add(g, verde, ec2Mx(top[0], top[1], top[2], tilt, ry, 0), (px, py, pz, out) => ec2Set(out, ec2Mix(verde, seco, clamp(Math.hypot(px, pz)*0.35 - 0.1, 0, 0.45)), 0.8 + 0.25*clamp(py*1.5 + 0.5, 0, 1)));
  }
}
/* heliconia: hojas grandes en pala y brácteas rojas en zigzag */
function ec2Heliconia(hojas, flores, x, y, z, s, seed){
  const R = Kit.rng(seed), verde = ec2Rgb(0x3E8A3C);
  for (let i=0; i<5; i++){
    const g = ec2Hoja(0.9*s, 0.32*s, 0.35, 5); g.translate(0, 0.25*s, 0);
    hojas.add(g, verde, ec2Mx(x, y, z, 0.25 + 0.35*R(), i/5*6.28 + R(), 0), (px, py, pz, o) => ec2Set(o, verde, 0.7 + 0.35*clamp(py/s, 0, 1)));
  }
  const tallo = [x + 0.05, y, z]; ec2Seg(flores, tallo, [x + 0.05, y + 0.75*s, z], 0.012, 0.01, 0x5E7A3A, 4);
  for (let k=0; k<5; k++){
    const g = new THREE.ConeGeometry(0.045*s, 0.2*s, 5); g.rotateZ(k % 2 ? 1.05 : -1.05);
    flores.add(g, k === 4 ? 0xF2C230 : 0xD8342A, ec2Mx(x + 0.05 + (k % 2 ? 0.06 : -0.06)*s, y + (0.4 + k*0.075)*s, z));
  }
}
/* helecho del sotobosque */
function ec2Helecho(hojas, x, y, z, s, seed){
  const R = Kit.rng(seed), v = ec2Rgb(0x4C9440);
  for (let i=0; i<7; i++){
    const g = ec2Fronda(0.6*s, 8, 0.12*s, 0.9);
    hojas.add(g, v, ec2Mx(x, y, z, -0.35 + 0.4*R(), i/7*6.28 + R()*0.3, 0), (px, py, pz, o) => ec2Set(o, v, 0.75 + 0.3*clamp(py*2, 0, 1)));
  }
}
/* bromelia (epífita): roseta de hojas acanaladas con el centro rojo */
function ec2Bromelia(hojas, x, y, z, s, seed, colFlor){
  const R = Kit.rng(seed), v = ec2Rgb(0x5C9A3E), rojo = ec2Rgb(colFlor || 0xD9442E);
  for (let i=0; i<9; i++){
    const inner = i >= 6, g = ec2Hoja((inner ? 0.2 : 0.34)*s, 0.07*s, 0.9, 3);
    hojas.add(g, inner ? rojo : v, ec2Mx(x, y, z, 0.35 + (inner ? 0 : 0.35*R()), i*2.4 + R()*0.3, 0), (px, py, pz, o) => ec2Set(o, inner ? rojo : ec2Mix(v, rojo, clamp(0.2 - py*1.2, 0, 0.3)), 0.8 + 0.3*clamp(py*4, 0, 1)));
  }
}
/* liana: cuelga de una rama en catenaria hasta el suelo */
function ec2Liana(bin, a, b, flecha, r){
  const pts = []; for (let i=0; i<=8; i++){ const t = i/8; pts.push([a[0] + (b[0]-a[0])*t + Math.sin(t*9)*0.04, a[1] + (b[1]-a[1])*t - flecha*Math.sin(Math.PI*t), a[2] + (b[2]-a[2])*t]); }
  ec2Tubo(bin, pts, r || 0.028, (r || 0.028)*0.8, 0x5E5A3A, 20, 5, (px, py, pz, o, c) => ec2Set(o, c, 0.8 + 0.2*ec2N(px*6, py*6, pz*6, 1)));
}
/* mangle rojo: tronco sobre raíces zancudas en arco, raíces aéreas y propágulos colgantes */
function ec2MangleRojo(bin, hojas, x, y, z, alt, seed, low){
  const R = Kit.rng(seed), c = 0x6E5144, raiz = 0x87624A;
  const moja = (px, py, pz, o, b) => ec2Set(o, py < 0.12 ? ec2Mix(ec2Rgb(0x3F4639), b, clamp(py*4 + 0.4, 0, 1)) : b, 0.72 + 0.3*clamp(py/alt, 0, 1) + 0.08*ec2N(px*7, py*7, pz*7, 1));
  const base = y + 0.95;
  ec2Tubo(bin, [[x, base - 0.1, z], [x + 0.05, base + alt*0.5, z], [x + 0.1, base + alt, z + 0.05]], 0.12, 0.07, c, 8, 7, moja);
  /* raíces zancudas: salen del tronco a distintas alturas, se arquean hacia fuera y bajan al fango */
  const nr = low ? 9 : 17;
  for (let i=0; i<nr; i++){
    const a = i*2.39996 + R()*0.3, h0 = 0.1 + 0.8*(i/nr) + 0.1*R(), r = 0.32 + 0.5*h0 + 0.18*R();
    const ca = Math.cos(a), sa = Math.sin(a), yb = base - 0.1 + h0*0.7;
    const P = (k, hh) => [x + ca*k, hh, z + sa*k];
    ec2Tubo(bin, [P(0.05, yb), P(r*0.3, yb + 0.1 + 0.08*h0), P(r*0.68, yb - 0.05), P(r*0.92, (yb + y)*0.45), P(r, y - 0.2)], 0.036 + 0.012*h0, 0.03, raiz, low ? 10 : 16, 5, moja);
    if (!low && R() > 0.5){ const b2 = a + 0.35, r2 = r*1.3, q0 = P(r*0.68, yb - 0.05);
      ec2Tubo(bin, [q0, [x + Math.cos(b2)*r2*0.85, yb - 0.02, z + Math.sin(b2)*r2*0.85], [x + Math.cos(b2)*r2, y - 0.2, z + Math.sin(b2)*r2]], 0.026, 0.022, raiz, 10, 4, moja); }
  }
  const cima = [x + 0.1, base + alt, z + 0.05];
  for (let i=0; i<4; i++){ const a = i/4*6.28 + R(), r = 0.55 + 0.3*R(), p = [cima[0] + Math.cos(a)*r, cima[1] + 0.25 + 0.3*R(), cima[2] + Math.sin(a)*r];
    ec2Seg(bin, [cima[0], cima[1] - 0.2, cima[2]], p, 0.05, 0.025, c, 5, moja);
    ec2Masa(hojas, p[0], p[1] + 0.15, p[2], 0.72 + 0.2*R(), 0.42, 0.72 + 0.2*R(), [0x24522A, 0x2A5A2C, 0x1F4A26][i % 3], { seed:seed*5 + i, det: low ? 1 : 2, tono:0x3E7434, luz:0.18 });
    /* raíces aéreas que bajan desde las ramas */
    if (!low && i % 2 === 0) ec2Tubo(bin, [[p[0]*0.7 + cima[0]*0.3, p[1] - 0.2, p[2]*0.7 + cima[2]*0.3], [p[0]*0.8 + cima[0]*0.2, (p[1] + y)/2, p[2]*0.8 + cima[2]*0.2], [p[0]*0.85 + cima[0]*0.15, y - 0.15, p[2]*0.85 + cima[2]*0.15]], 0.018, 0.022, raiz, 10, 4, moja);
  }
  ec2Masa(hojas, cima[0], cima[1] + 0.6, cima[2], 0.8, 0.45, 0.8, 0x28582C, { seed:seed*9, det: low ? 1 : 2, tono:0x467C38, luz:0.18 });
  /* propágulos: las "lanzas" que germinan todavía en el árbol */
  if (!low) for (let i=0; i<9; i++){ const a = R()*6.28, r = 0.4 + 0.6*R(), px = cima[0] + Math.cos(a)*r, pz = cima[2] + Math.sin(a)*r, py = cima[1] + 0.38;
    ec2Seg(bin, [px, py, pz], [px + 0.02, py - 0.42, pz], 0.012, 0.022, 0x6B7A3A, 5, (qx, qy, qz, o, b) => ec2Set(o, qy < py - 0.3 ? ec2Rgb(0x6A4A30) : b)); }
  return cima;
}
/* mangle negro: copa grisácea y un campo de neumatóforos alrededor */
function ec2MangleNegro(bin, hojas, neum, x, y, z, alt, seed, low, hfn){
  const R = Kit.rng(seed), c = 0x5E5146;
  const cort = (px, py, pz, o, b) => ec2Set(o, b, 0.7 + 0.3*clamp(py/alt, 0, 1) + 0.1*ec2N(px*6, py*6, pz*6, 1));
  ec2Tubo(bin, [[x, y - 0.15, z], [x - 0.05, y + alt*0.55, z + 0.04], [x + 0.06, y + alt, z]], 0.13, 0.07, c, 8, 7, cort);
  for (let i=0; i<4; i++){ const a = i/4*6.28 + R()*0.6, r = 0.6 + 0.3*R(), p = [x + Math.cos(a)*r, y + alt + 0.25 + 0.25*R(), z + Math.sin(a)*r];
    ec2Seg(bin, [x + 0.06, y + alt - 0.25, z], p, 0.06, 0.03, c, 5, cort);
    ec2Masa(hojas, p[0], p[1] + 0.1, p[2], 0.7 + 0.2*R(), 0.4, 0.7 + 0.2*R(), [0x3A5632, 0x44603A, 0x365030][i % 3], { seed:seed*4 + i, det: low ? 1 : 2, tono:0x6A7E58, luz:0.12 }); }
  ec2Masa(hojas, x + 0.06, y + alt + 0.6, z, 0.75, 0.42, 0.75, 0x3E5A38, { seed:seed*11, det: low ? 1 : 2, tono:0x70846A });
  const nn = low ? 40 : 110;
  for (let i=0; i<nn; i++){ const a = R()*6.28, r = 0.45 + 2.1*Math.sqrt(R()), px = x + Math.cos(a)*r, pz = z + Math.sin(a)*r, hh = 0.14 + 0.22*R();
    const g = new THREE.CylinderGeometry(0.012, 0.022, hh, 5, 1, false); g.translate(0, hh/2 - 0.03, 0);
    neum.add(g, 0x5B4632, ec2Mx(px, hfn ? hfn(px, pz) : y, pz, (R()-0.5)*0.2, 0, (R()-0.5)*0.2), (qx, qy, qz, o, b) => ec2Set(o, qy < 0.06 ? ec2Rgb(0x3A3A30) : b, 0.8 + 0.5*clamp(qy/hh, 0, 1))); }
}
/* macolla de paja: hojas finas que salen del centro y se arquean hacia fuera */
function ec2Macolla(bin, x, y, z, s, seed, low){
  const R = Kit.rng(seed), n = low ? 22 : 40, pos = [], cols = [];
  const base = ec2Rgb(0x6E7A3C), punta = ec2Rgb([0xD6BE72, 0xCDB064, 0xE0C98A][seed % 3]), seca = ec2Rgb(0xA99A6A);
  for (let i=0; i<n; i++){
    const a = R()*Math.PI*2, incl = 0.18 + 0.9*Math.pow(R(), 0.9), L = s*(0.6 + 0.5*R()), w = 0.05*s;
    const ca = Math.cos(a), sa = Math.sin(a), off = 0.1*s*R();
    let px = x + ca*off, py = y, pz = z + sa*off;
    for (let k=0; k<3; k++){
      const t0 = k/3, t1 = (k+1)/3, bend = incl*(1 + t1*1.3);
      const qx = x + ca*(off + Math.sin(bend)*L*t1*0.75), qy = y + Math.cos(bend)*L*t1 + L*0.08, qz = z + sa*(off + Math.sin(bend)*L*t1*0.75);
      const ww = w*(1 - t0*0.8);
      pos.push(px - sa*ww, py, pz + ca*ww, px + sa*ww, py, pz - ca*ww, qx, qy, qz);
      const c0 = ec2Mix(base, R() > 0.8 ? seca : punta, t0), c1 = ec2Mix(base, punta, t1);
      cols.push(...c0, ...c0, ...c1);
      px = qx; py = qy; pz = qz;
    }
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals();
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols.map(v => Math.pow(v, 2.2)), 3));
  bin.raw(g);
}
/* frailejón: tallo forrado de hojas muertas y roseta plateada y lanosa */
function ec2Frailejon(bin, hojas, x, y, z, alt, seed, low){
  const R = Kit.rng(seed), plata = ec2Rgb(0xD5D8C6), verde = ec2Rgb(0x98A47A), muerta = ec2Rgb(0x8A7A62), oscura = ec2Rgb(0x5E5244);
  ec2Tubo(bin, [[x, y - 0.1, z], [x + 0.02, y + alt*0.5, z], [x + 0.03, y + alt, z + 0.02]], 0.11, 0.1, 0x7A6B58, 10, 9,
    (px, py, pz, o) => { const f = ec2N(px*10, py*14, pz*10, 2); ec2Set(o, ec2Mix(oscura, muerta, clamp(0.55 + f*1.4, 0, 1)), 0.8 + 0.25*clamp((py - y)/alt, 0, 1)); }, u => 0.1 + 0.025*Math.sin(u*70));
  /* hojas secas colgantes (la "falda" que aísla del frío) */
  const nf = low ? 10 : 22;
  for (let i=0; i<nf; i++){ const h0 = y + alt*(0.35 + 0.6*R()), g = ec2Hoja(0.32, 0.06, -0.2, 2);
    bin.add(g, muerta, ec2Mx(x, h0, z, Math.PI - 0.35, R()*6.28, 0), (px, py, pz, o) => ec2Set(o, ec2Mix(muerta, oscura, R()*0.5))); }
  const nh = low ? 20 : 40, cima = [x + 0.03, y + alt, z + 0.02];
  for (let i=0; i<nh; i++){
    const k = i/nh, g = ec2Hoja(0.46 + 0.2*(1 - k), 0.15, 0.2, 3), incl = 0.12 + 1.25*(1 - k);
    hojas.add(g, plata, ec2Mx(cima[0], cima[1] - 0.02, cima[2], incl, i*2.399, 0), (px, py, pz, o) => ec2Set(o, ec2Mix(verde, plata, clamp(py*2.2 + 0.2, 0, 1)), 0.88 + 0.2*clamp(py*2, 0, 1)));
  }
  if (seed % 2 === 0){ /* inflorescencia con cabezuelas amarillas */
    const f = [cima[0] + 0.12, cima[1] + 0.55, cima[2]];
    ec2Seg(bin, cima, f, 0.012, 0.009, 0x9A9A70, 4);
    for (let i=0; i<3; i++){ const g = new THREE.SphereGeometry(0.045, 7, 5); bin.add(g, 0xE9C43A, ec2Mx(f[0] + (i-1)*0.06, f[1] + (i === 1 ? 0.04 : 0), f[2], 0, 0, 0, 1, 0.6, 1)); }
  }
}
/* almohadilla: cojín compacto de rosetas diminutas */
function ec2Almohadilla(bin, x, y, z, s, seed, col){
  const g = new THREE.SphereGeometry(1, 22, 10, 0, Math.PI*2, 0, Math.PI*0.52), p = g.attributes.position;
  for (let i=0; i<p.count; i++){ const vx = p.getX(i), vy = p.getY(i), vz = p.getZ(i), n = ec2N(vx*2.6 + seed, vy*2.6, vz*2.6, 2);
    p.setXYZ(i, vx*s*(1 + 0.16*n), Math.pow(Math.max(0, vy), 0.7)*s*0.24*(1 + 0.25*n), vz*s*(0.85 + 0.16*n)); }
  g.computeVertexNormals();
  const c = ec2Rgb(col || 0x5A7E2C), c2 = ec2Rgb(0x8C9A44);
  bin.add(g, c, ec2Mx(x, y - 0.04, z, 0, seed, 0), (px, py, pz, o) => { const f = ec2N(px*40, py*40, pz*40, 1); ec2Set(o, ec2Mix(c, c2, clamp(0.3 + f*1.4, 0, 0.7)), 0.72 + 0.35*clamp(py/(s*0.22), 0, 1)); });
}
/* Opuntia echios: tronco leñoso escamoso y cadenas de pencas ovaladas */
function ec2Opuntia(bin, pencas, x, y, z, alt, seed, low){
  const R = Kit.rng(seed), corteza = ec2Rgb(0x7A5440), gris = ec2Rgb(0x9C8B78);
  ec2Tubo(bin, [[x, y - 0.1, z], [x + 0.04, y + alt*0.5, z - 0.03], [x + 0.02, y + alt, z]], 0.17, 0.12, 0x7A5440, 10, 9,
    (px, py, pz, o) => { const f = ec2N(px*12, py*18, pz*12, 2); ec2Set(o, ec2Mix(corteza, gris, clamp(0.4 + f*1.8, 0, 1)), 0.75 + 0.2*clamp((py - y)/alt, 0, 1)); });
  const verde = ec2Rgb(0x6F9A56), glauco = ec2Rgb(0x9DB582);
  const penca = (p, ry, rz, s) => { const g = new THREE.SphereGeometry(1, 12, 9);
    pencas.add(g, verde, ec2Mx(p[0], p[1], p[2], 0, ry, rz, 0.17*s, 0.25*s, 0.045*s), (px, py, pz, o) => { const f = ec2N(px*30, py*30, pz*30, 1); ec2Set(o, ec2Mix(verde, glauco, clamp(0.4 + f*2, 0, 1)), 0.78 + 0.3*clamp(py*3 + 0.5, 0, 1)); }); };
  const top = [x + 0.02, y + alt, z], nr = low ? 4 : 6;
  for (let i=0; i<nr; i++){
    const a = i/nr*6.28 + R()*0.5; let p = top.slice(), dir = [Math.cos(a)*1.1, 1, Math.sin(a)*1.1];
    const L = low ? 3 : 5;
    for (let k=0; k<L; k++){
      const incl = Math.atan2(Math.hypot(dir[0], dir[2]), dir[1]), s = 1 - k*0.12;
      const dl = Math.hypot(dir[0], dir[1], dir[2]), u = [dir[0]/dl, dir[1]/dl, dir[2]/dl], st = 0.21*s;
      const c = [p[0] + u[0]*st, p[1] + u[1]*st, p[2] + u[2]*st], ha = Math.atan2(u[2], u[0]);
      penca(c, -ha + (R()-0.5)*0.5, -incl, s);
      if (k === L - 1 && R() > 0.45){ const fl = new THREE.SphereGeometry(0.035, 6, 5); pencas.add(fl, 0xE8C43A, ec2Mx(c[0] + u[0]*0.22*s, c[1] + u[1]*0.22*s + 0.02, c[2] + u[2]*0.22*s)); }
      p = [c[0] + u[0]*st, c[1] + u[1]*st, c[2] + u[2]*st];
      dir = [dir[0]*1.15 + (R()-0.5)*0.4, dir[1]*0.85, dir[2]*1.15 + (R()-0.5)*0.4];
    }
  }
}
/* Scalesia: árbol de la zona húmeda, tronco delgado y copa en paraguas cubierta de musgo */
function ec2Scalesia(bin, hojas, x, y, z, alt, seed, low){
  const R = Kit.rng(seed), musgo = ec2Rgb(0x8FA85A), cort = ec2Rgb(0x6E6250);
  const tr = (px, py, pz, o) => ec2Set(o, ec2Mix(cort, musgo, clamp(ec2N(px*8, py*8, pz*8, 2)*2 + 0.2, 0, 0.7)), 0.8);
  ec2Tubo(bin, [[x, y - 0.1, z], [x + 0.1, y + alt*0.6, z - 0.05], [x + 0.15, y + alt, z]], 0.07, 0.04, 0x6E6250, 8, 6, tr);
  const top = [x + 0.15, y + alt, z];
  for (let i=0; i<5; i++){ const a = i/5*6.28 + R(), r = 0.55 + 0.25*R(), p = [top[0] + Math.cos(a)*r, top[1] + 0.2 + 0.15*R(), top[2] + Math.sin(a)*r];
    ec2Seg(bin, top, p, 0.035, 0.02, 0x6E6250, 5, tr);
    ec2Masa(hojas, p[0], p[1] + 0.1, p[2], 0.55, 0.22, 0.55, 0x2E5A2A, { seed:seed*6 + i, det: low ? 1 : 2, tono:0x4A7434, luz:0.1 }); }
}
/* cactus de lava: grupito de columnas cortas sobre el basalto */
function ec2CactusLava(bin, x, y, z, seed){
  const R = Kit.rng(seed), c = ec2Rgb(0xB9A85A), c2 = ec2Rgb(0x6B6A3C);
  for (let i=0; i<6; i++){ const a = R()*6.28, r = 0.1*R(), hh = 0.14 + 0.18*R(), g = new THREE.CylinderGeometry(0.035, 0.04, hh, 7, 3); g.translate(0, hh/2, 0);
    bin.add(g, c, ec2Mx(x + Math.cos(a)*r, y - 0.02, z + Math.sin(a)*r, (R()-0.5)*0.4, 0, (R()-0.5)*0.4), (px, py, pz, o) => ec2Set(o, ec2Mix(c2, c, clamp(py/hh, 0, 1)), 0.8 + 0.2*Math.sin(Math.atan2(pz, px)*7))); }
}

/* =====================================================================
   FAUNA
   ===================================================================== */
/* cuerpo de cuadrúpedo con curvas cónicas: sirve para el jaguar y el oso */
function ec2Cuadrupedo(bin, x, y, z, rot, o){
  const c = Object.assign({ L:1.3, alto:0.34, pata:0.36, grosor:0.2, cuello:0.12, cabeza:0.17, cola:0.9, colaR:0.045, piel:null, orejas:0.05, hocico:0.6, s:1 }, o||{});
  const s = c.s, m = ec2Mx(x, y, z, 0, rot, 0, s);
  const P = (a) => new THREE.Vector3(a[0], a[1], a[2]).applyMatrix4(m).toArray();
  let parte = 'tronco';
  const add = (g) => bin.add(g, 0x000000, m, (px, py, pz, o) => c.piel(px, py, pz, o, parte));
  const hy = c.pata + c.alto;
  /* tronco: de la grupa al pecho, más ancho en el tórax */
  const tronco = Kit.taper([[-c.L*0.5, hy, 0], [-c.L*0.1, hy - 0.03, 0], [c.L*0.3, hy + 0.01, 0], [c.L*0.5, hy + 0.06, 0]].map(v => new THREE.Vector3(...v)), 1, 1,
    { seg:c.segT || 18, rad:c.radT || 12, rfn: u => c.grosor*(0.82 + 0.28*Math.sin(Math.PI*Math.min(1, u*1.1)) - 0.12*Math.max(0, 0.4 - u)) });
  tronco.scale(1, 1, 0.82); add(tronco);
  /* cuello y cabeza */
  parte = 'cabeza'; add(Kit.taper([[c.L*0.42, hy + 0.05, 0], [c.L*0.58, hy + 0.12, 0], [c.L*0.66, hy + 0.14, 0]].map(v => new THREE.Vector3(...v)), c.grosor*0.72, c.cabeza*0.8, { seg:6, rad:10 }));
  const cab = new THREE.SphereGeometry(c.cabeza, 14, 10); cab.scale(1.12, 0.92, 0.95); cab.translate(c.L*0.72, hy + 0.14, 0); add(cab);
  const hoc = new THREE.SphereGeometry(c.cabeza*0.62, 12, 8); hoc.scale(1.1*c.hocico/0.6, 0.72, 0.9); hoc.translate(c.L*0.72 + c.cabeza*0.82, hy + 0.08, 0); add(hoc);
  [1,-1].forEach(sd => { const or = new THREE.SphereGeometry(c.orejas, 8, 6); or.scale(0.7, 1, 0.5); or.translate(c.L*0.68, hy + 0.14 + c.cabeza*0.85, sd*c.cabeza*0.62); add(or); });
  /* patas: muslo grueso que se afina hasta la mano */
  parte = 'pata'; [[c.L*0.34, 1], [c.L*0.34, -1], [-c.L*0.36, 1], [-c.L*0.36, -1]].forEach(([px, sd], k) => {
    const tr = k > 1, pz = sd*c.grosor*0.62;
    const pts = tr ? [[px, hy, pz], [px - 0.06, hy*0.55, pz], [px + 0.02, c.pata*0.22, pz], [px + 0.06, 0.04, pz]] : [[px, hy - 0.02, pz], [px + 0.02, hy*0.5, pz], [px, c.pata*0.2, pz], [px + 0.04, 0.04, pz]];
    add(Kit.taper(pts.map(v => new THREE.Vector3(...v)), c.grosor*(tr ? 0.55 : 0.45), c.grosor*0.24, { seg:10, rad:8 }));
    const mano = new THREE.SphereGeometry(c.grosor*0.3, 8, 6); mano.scale(1.4, 0.6, 1.1); mano.translate(px + 0.08, 0.05, pz); add(mano);
  });
  parte = 'cola'; if (c.cola > 0) add(Kit.taper([[-c.L*0.5, hy + 0.02, 0], [-c.L*0.5 - c.cola*0.35, hy - 0.12, 0.05], [-c.L*0.5 - c.cola*0.7, hy - 0.2, 0.12], [-c.L*0.5 - c.cola, hy - 0.08, 0.2]].map(v => new THREE.Vector3(...v)), c.colaR, c.colaR*0.7, { seg:16, rad:7 }));
  return { cabeza: P([c.L*0.72, hy + 0.14, 0]), P };
}
function ec2Jaguar(bin, x, y, z, rot){
  const oro = ec2Rgb(0xC98E3A), claro = ec2Rgb(0xEBDDBF), negro = ec2Rgb(0x2A2118);
  /* rosetas: anillos oscuros con el centro algo más oscuro que el fondo (ruido celular aproximado) */
  /* rosetas: anillos negros con el centro algo más oscuro que el fondo dorado */
  const piel = (px, py, pz, o, parte) => {
    const f = parte === 'tronco' ? 8.5 : 12, d = ec2Celda(px*f + 0.3*ec2N(px*6, py*6, pz*6, 1), py*f, pz*f);
    const vientre = parte === 'tronco' ? clamp((0.6 - py)/0.1, 0, 1) : parte === 'cabeza' ? clamp((0.74 - py)/0.06, 0, 1)*0.6 : parte === 'pata' ? 0.25 : 0;
    let c = ec2Mix(oro, claro, vientre*0.85);
    if (d > 0.3 && d < 0.47 && vientre < 0.7) c = negro; else if (d <= 0.3 && parte === 'tronco' && vientre < 0.5) c = ec2Mix(c, ec2Rgb(0xA8702C), 0.55);
    if (parte === 'cabeza' && d < 0.22) c = negro;
    ec2Set(o, c);
  };
  return ec2Cuadrupedo(bin, x, y, z, rot, { L:1.25, alto:0.3, pata:0.34, grosor:0.19, cabeza:0.16, cola:0.8, colaR:0.045, piel, orejas:0.045, hocico:0.55, segT:40, radT:22 });
}
function ec2Oso(bin, x, y, z, rot){
  const negro = ec2Rgb(0x1E1A17), crema = ec2Rgb(0xD9C9A0), pardo = ec2Rgb(0x3A2E25);
  const piel = (px, py, pz, o) => {
    const f = ec2N(px*30, py*30, pz*30, 1), c = ec2Mix(negro, pardo, clamp(0.5 + f*1.2, 0, 1)*0.35);
    ec2Set(o, c);
  };
  const r = ec2Cuadrupedo(bin, x, y, z, rot, { L:1.1, alto:0.36, pata:0.28, grosor:0.27, cabeza:0.2, cola:0.12, colaR:0.06, piel, orejas:0.07, hocico:0.5 });
  /* "anteojos" y pechera cremas del oso andino */
  const mk = new THREE.Matrix4().compose(new THREE.Vector3(...r.cabeza), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rot, 0)), new THREE.Vector3(1,1,1));
  [1,-1].forEach(sd => { const g = new THREE.TorusGeometry(0.05, 0.016, 5, 12); g.rotateY(Math.PI/2); g.translate(0.13, 0.05, sd*0.075); bin.add(g, crema, mk); });
  const hoc = new THREE.SphereGeometry(0.1, 10, 8); hoc.scale(1, 0.62, 0.85); hoc.translate(0.24, -0.04, 0); bin.add(hoc, 0xB9A47C, mk);
  const nar = new THREE.SphereGeometry(0.04, 8, 6); nar.translate(0.33, -0.03, 0); bin.add(nar, 0x111111, mk);
  const pech = new THREE.SphereGeometry(0.13, 10, 8); pech.scale(0.4, 1, 1.2); pech.translate(-0.04, -0.2, 0); bin.add(pech, crema, mk);
  return r;
}
/* ave genérica: cuerpo fusiforme, cabeza, pico, alas con perfil y cola */
function ec2Ave(bin, x, y, z, rot, o){
  const c = Object.assign({ s:1, cuerpo:0x333333, ala:null, cabeza:null, pico:0x333333, picoL:0.14, picoR:0.035, pos:'vuelo', alaSt:null, alaFn:null, cola:0.3, colaAb:0.12, cuello:0, patas:0, colPatas:0x333333, cuelloCol:null }, o||{});
  const m = ec2Mx(x, y, z, 0, rot, 0, c.s), add = (g, col, fn) => bin.add(g, col, m, fn);
  const b = Kit.taper([[-0.3, 0, 0], [-0.05, 0.02, 0], [0.18, 0.04, 0], [0.3, 0.06, 0]].map(v => new THREE.Vector3(...v)), 1, 1, { seg:12, rad:9, rfn: u => 0.1*Math.sin(Math.PI*(0.12 + 0.8*u)) + 0.012 });
  add(b, c.cuerpo);
  let hx = 0.34, hy = 0.08;
  if (c.cuello){ const pts = [[0.26, 0.06, 0], [0.34, 0.06 + c.cuello*0.6, 0], [0.3, 0.06 + c.cuello, 0], [0.36, 0.06 + c.cuello*1.1, 0]];
    add(Kit.taper(pts.map(v => new THREE.Vector3(...v)), 0.045, 0.035, { seg:12, rad:6 }), c.cuelloCol || c.cuerpo); hx = 0.38; hy = 0.06 + c.cuello*1.12; }
  const hd = new THREE.SphereGeometry(0.075, 12, 9); hd.translate(hx, hy, 0); add(hd, c.cabeza || c.cuerpo);
  const pk = new THREE.ConeGeometry(c.picoR, c.picoL, 7); pk.rotateZ(-Math.PI/2); pk.translate(hx + 0.06 + c.picoL/2, hy - 0.015, 0); add(pk, c.pico);
  [1,-1].forEach(sd => { const ey = new THREE.SphereGeometry(0.014, 6, 5); ey.translate(hx + 0.04, hy + 0.02, sd*0.055); add(ey, 0x0B0B0B); });
  /* cola en abanico */
  const cs = new THREE.Shape(); cs.moveTo(0, -0.03); cs.lineTo(-c.cola, -c.colaAb); cs.lineTo(-c.cola*0.9, 0); cs.lineTo(-c.cola, c.colaAb); cs.lineTo(0, 0.03);
  const cg = new THREE.ExtrudeGeometry(cs, { depth:0.012, bevelEnabled:false }); cg.rotateX(Math.PI/2); cg.translate(-0.26, 0.02, 0); add(cg, c.ala || c.cuerpo);
  const st = c.alaSt || [[0, 0.1, -0.1], [0.3, 0.08, -0.12], [0.6, 0.02, -0.1], [0.8, -0.06, -0.06]];
  [1,-1].forEach(sd => {
    const piezas = [[ec2Ala(st, 0.018, sd), c.ala || c.cuerpo]];
    (c.parches || []).forEach(q => piezas.push([ec2AlaParche(st, q[0], q[1], q[2], q[3], 0.024, sd), q[4]]));
    piezas.forEach(([g, col]) => {
      ec2Paint(g, null, ec2Rgb(col));
      if (c.pos === 'vuelo'){ g.rotateX(sd*0.12); g.translate(0.02, 0.05, sd*0.06); }
      else { g.scale(0.62, 1, 0.62); g.rotateY(sd*(-Math.PI/2 + 0.14)); g.rotateX(sd*0.55); g.translate(0.14, 0.09, sd*0.06); }
      g.applyMatrix4(m); bin.raw(g);
    });
  });
  if (c.patas){ [1,-1].forEach(sd => { const g = new THREE.CylinderGeometry(0.008, 0.008, c.patas, 4); g.translate(0.02, -0.07 - c.patas/2, sd*0.03); add(g, c.colPatas); }); }
}
function ec2Guacamayo(bin, x, y, z, rot, pos){
  ec2Ave(bin, x, y, z, rot, { s:0.9, cuerpo:0xD1291F, ala:0x1E5FB0, pico:0xE8E0CC, picoL:0.09, picoR:0.045, pos, cola:0.55, colaAb:0.05,
    cabeza:0xD83225, alaSt:[[0, 0.1, -0.1], [0.25, 0.08, -0.14], [0.5, 0.04, -0.14], [0.72, -0.02, -0.1], [0.85, -0.1, -0.12]],
    parches:[[0, 0.56, 0, 0.42, 0xD1291F], [0.04, 0.6, 0.42, 0.62, 0xF0C020], [0.04, 0.62, 0.62, 0.72, 0x3B8A3E]] });
}
function ec2Condor(bin, x, y, z, rot){
  ec2Ave(bin, x, y, z, rot, { s:2.5, cuerpo:0x1A1A1F, pico:0xD8C7A0, picoL:0.06, picoR:0.025, cabeza:0x9A6E62, cola:0.22, colaAb:0.1, pos:'vuelo',
    alaSt:[[0, 0.13, -0.14], [0.35, 0.12, -0.17], [0.7, 0.08, -0.15], [0.86, 0.05, -0.1], [0.9, 0.02, 0.02], [0.96, 0.0, -0.02], [0.98, -0.03, -0.06], [1.0, -0.06, -0.08]],
    parches:[[0.12, 0.64, 0.5, 1.0, 0xE8E4DA]] });
  const g = new THREE.TorusGeometry(0.06, 0.026, 6, 14); g.rotateY(Math.PI/2);
  bin.add(g, 0xF2EEE4, ec2Mx(x, y, z, 0, rot, 0, 2.5).multiply(new THREE.Matrix4().makeTranslation(0.3, 0.07, 0)));
}
function ec2Fragata(bin, x, y, z, rot){
  ec2Ave(bin, x, y, z, rot, { s:1.6, cuerpo:0x1C1C22, ala:0x1C1C22, pico:0x8A8A8A, picoL:0.14, picoR:0.018, cola:0.4, colaAb:0.16, pos:'vuelo',
    alaSt:[[0, 0.06, -0.08], [0.25, 0.1, -0.02], [0.45, 0.03, -0.1], [0.75, -0.14, -0.18], [0.95, -0.28, -0.3]] });
  const g = new THREE.SphereGeometry(0.05, 9, 7); g.scale(1, 1.2, 0.9);
  bin.add(g, 0xD8261E, ec2Mx(x, y, z, 0, rot, 0, 1.6).multiply(new THREE.Matrix4().makeTranslation(0.32, 0.0, 0)));
}
function ec2Garza(bin, x, y, z, rot){
  ec2Ave(bin, x, y, z, rot, { s:1.35, cuerpo:0xF1EFE8, ala:0xE9E6DD, pico:0xE0B52A, picoL:0.16, picoR:0.02, pos:'posada', cuello:0.3, cola:0.18, colaAb:0.06, patas:0.4, colPatas:0x222222 });
}
function ec2Pinzon(bin, x, y, z, rot){
  ec2Ave(bin, x, y, z, rot, { s:0.55, cuerpo:0x2B2622, ala:0x3A322B, pico:0x3A3A3A, picoL:0.08, picoR:0.05, pos:'posada', cola:0.16, colaAb:0.05, patas:0.05, colPatas:0x3A3A3A });
}
/* tortuga gigante: caparazón en domo con escudos y anillos de crecimiento */
function ec2Tortuga(bin, x, y, z, rot, s){
  const m = ec2Mx(x, y, z, 0, rot, 0, s || 1);
  const sem = [[0, 1], [0.34, 0.9], [-0.34, 0.9], [0, 0.72], [0.62, 0.7], [-0.62, 0.7], [0.34, 0.6], [-0.34, 0.6], [0, 0.42]];
  const pts = []; sem.forEach(([a, e]) => { const th = a*Math.PI, el = e; pts.push(new THREE.Vector3(Math.sin(th)*Math.cos(el), Math.sin(el), Math.cos(th)*Math.cos(el))); });
  for (let i=0; i<20; i++){ const a = i/20*Math.PI*2; pts.push(new THREE.Vector3(Math.cos(a), 0.12, Math.sin(a))); }
  [[0, 0.5], [0.5, 0.35], [-0.5, 0.35], [1, 0.5], [0.75, 0.3], [-0.75, 0.3], [0.25, 0.3], [-0.25, 0.3]].forEach(([a, e]) => { const th = a*Math.PI; pts.push(new THREE.Vector3(Math.sin(th)*Math.cos(e), Math.sin(e), Math.cos(th)*Math.cos(e))); });
  const g = new THREE.SphereGeometry(1, 56, 26, 0, Math.PI*2, 0, Math.PI*0.54), p = g.attributes.position, v = new THREE.Vector3();
  const osc = ec2Rgb(0x2E2A24), med = ec2Rgb(0x5B5446), cla = ec2Rgb(0x7A7060);
  const cols = [];
  for (let i=0; i<p.count; i++){ v.fromBufferAttribute(p, i).normalize();
    let d1 = 9, d2 = 9; pts.forEach(q => { const d = v.distanceTo(q); if (d < d1){ d2 = d1; d1 = d; } else if (d < d2) d2 = d; });
    const borde = d2 - d1, anillo = 0.5 + 0.5*Math.sin(d1*60);
    const c = borde < 0.035 ? osc : ec2Mix(med, cla, clamp(0.25 + 0.35*anillo - d1*0.8, 0, 1));
    cols.push(c); const bump = 1 + 0.04*clamp(borde*8, 0, 1);
    p.setXYZ(i, v.x*0.62*bump, Math.max(0.02, v.y)*0.5*bump + 0.26, v.z*0.78*bump); }
  g.computeVertexNormals();
  let k = 0; bin.add(g, med, m, (px, py, pz, o) => ec2Set(o, cols[k++]));
  const pie = ec2Rgb(0x6A6356);
  const piel = (px, py, pz, o) => ec2Set(o, pie, 0.85 + 0.2*ec2N(px*20, py*20, pz*20, 1));
  bin.add(Kit.taper([[0, 0.34, 0.62], [0, 0.46, 0.84], [0, 0.52, 0.98]].map(q => new THREE.Vector3(...q)), 0.1, 0.075, { seg:8, rad:8 }), pie, m, piel);
  const hd = new THREE.SphereGeometry(0.1, 12, 9); hd.scale(0.9, 0.85, 1.25); hd.translate(0, 0.54, 1.06); bin.add(hd, pie, m, piel);
  [[0.4, 0.46], [-0.4, 0.46], [0.42, -0.46], [-0.42, -0.46]].forEach(([px, pz]) => { const l = new THREE.CylinderGeometry(0.1, 0.12, 0.34, 9); l.translate(px, 0.15, pz); bin.add(l, pie, m, piel); });
}
function ec2Iguana(bin, x, y, z, rot, s){
  const m = ec2Mx(x, y, z, 0, rot, 0, s || 1), neg = ec2Rgb(0x2B2A28), gris = ec2Rgb(0x5A5650), sal = ec2Rgb(0xD8D4C8);
  const piel = (px, py, pz, o) => { const f = ec2N(px*18, py*18, pz*18, 2); ec2Set(o, ec2Mix(neg, gris, clamp(0.35 + f*1.8, 0, 1)), px > 0.5 && py > 0.1 ? 1.25 : 1); };
  bin.add(Kit.taper([[-0.36, 0.14, 0], [0, 0.17, 0], [0.36, 0.16, 0]].map(q => new THREE.Vector3(...q)), 1, 1, { seg:14, rad:9, rfn: u => 0.11*Math.sin(Math.PI*(0.15 + 0.75*u)) + 0.03 }), neg, m, piel);
  const hd = new THREE.SphereGeometry(0.09, 12, 9); hd.scale(1.35, 0.85, 0.9); hd.translate(0.46, 0.17, 0); bin.add(hd, neg, m, (px, py, pz, o) => ec2Set(o, py > 0.2 ? sal : neg));
  bin.add(Kit.taper([[-0.34, 0.14, 0], [-0.7, 0.08, 0.1], [-1.0, 0.04, 0.05], [-1.25, 0.03, -0.08]].map(q => new THREE.Vector3(...q)), 0.07, 0.012, { seg:16, rad:6 }).scale(1, 1.4, 0.55), neg, m, piel);
  for (let i=0; i<12; i++){ const g = new THREE.ConeGeometry(0.018, 0.07 - i*0.003, 4); g.translate(0.4 - i*0.09, 0.27 - Math.abs(i - 4)*0.006, 0); bin.add(g, gris, m); }
  [[0.24, 1], [0.24, -1], [-0.26, 1], [-0.26, -1]].forEach(([px, sd]) => bin.add(Kit.taper([[px, 0.12, sd*0.08], [px + 0.02, 0.1, sd*0.2], [px + 0.08, 0.01, sd*0.25]].map(q => new THREE.Vector3(...q)), 0.035, 0.022, { seg:6, rad:5 }), neg, m, piel));
}
function ec2Cangrejo(bin, x, y, z, rot, s){
  const m = ec2Mx(x, y, z, 0, rot, 0, s || 1), capa = ec2Rgb(0x5E2F45), pata = ec2Rgb(0xC9532E);
  const cp = new THREE.SphereGeometry(0.26, 16, 10); cp.scale(1.15, 0.45, 0.9); cp.translate(0, 0.17, 0);
  bin.add(cp, capa, m, (px, py, pz, o) => ec2Set(o, ec2Mix(capa, ec2Rgb(0x8A4050), clamp(0.3 + ec2N(px*12, py*12, pz*12, 1)*2, 0, 1)), 0.8 + 0.4*clamp((py - 0.12)*8, 0, 1)));
  [1,-1].forEach(sd => {
    const ey = new THREE.CylinderGeometry(0.012, 0.012, 0.08, 4); ey.translate(0.22, 0.25, sd*0.07); bin.add(ey, pata, m);
    const eb = new THREE.SphereGeometry(0.02, 6, 5); eb.translate(0.22, 0.3, sd*0.07); bin.add(eb, 0x151515, m);
    for (let i=0; i<4; i++){ const px = 0.12 - i*0.1, a = [px, 0.14, sd*0.2], b = [px - 0.06, 0.2, sd*0.4], c = [px - 0.12, 0.0, sd*0.5];
      ec2Seg(bin, new THREE.Vector3(...a).applyMatrix4(m).toArray(), new THREE.Vector3(...b).applyMatrix4(m).toArray(), 0.022*(s||1), 0.018*(s||1), pata, 5);
      ec2Seg(bin, new THREE.Vector3(...b).applyMatrix4(m).toArray(), new THREE.Vector3(...c).applyMatrix4(m).toArray(), 0.018*(s||1), 0.008*(s||1), pata, 5); }
    const brazo = [new THREE.Vector3(0.22, 0.14, sd*0.14), new THREE.Vector3(0.36, 0.14, sd*0.22)].map(v => v.applyMatrix4(m).toArray());
    ec2Seg(bin, brazo[0], brazo[1], 0.03*(s||1), 0.028*(s||1), pata, 5);
    const pz = new THREE.SphereGeometry(0.075, 10, 8); pz.scale(1.35, 0.7, 0.8); pz.translate(0.44, 0.15, sd*0.22); bin.add(pz, pata, m, (px, py, pzz, o) => ec2Set(o, px > 0.5 ? ec2Rgb(0xE8A070) : pata));
  });
}
function ec2Concha(bin, x, y, z, rot, s){
  const m = ec2Mx(x, y, z, 0.3, rot, 0.15, s || 1), osc = ec2Rgb(0x2E2720), cla = ec2Rgb(0x5E5040);
  [1,-1].forEach(sd => {
    const g = new THREE.SphereGeometry(0.16, 16, 8, 0, Math.PI*2, 0, Math.PI*0.5); g.scale(1.15, 0.45*sd, 0.92); g.rotateZ(sd*0.08);
    bin.add(g, osc, m, (px, py, pz, o) => { const a = Math.atan2(pz, px); ec2Set(o, ec2Mix(osc, cla, 0.5 + 0.5*Math.sin(a*26)), 0.8 + 0.3*Math.hypot(px, pz)/0.16); });
  });
}

/* =====================================================================
   ESCENAS · cada una devuelve { cielo, etq } (etq: posición de etiquetas
   que conviene fijar a mano). La misión del manglar (src/61) llama a
   EC2_ESCENA.manglar(E) sin opciones: en ese caso la marea queda quieta.
   ===================================================================== */
function ec2Parte(E, id, bins, info){
  const ms = [];
  bins.forEach(([b, o]) => { const m = b.mesh(o); if (m) ms.push(m); });
  E.addPart(id, ms, info || {});
  return ms;
}
const EC2_LAM = { side:THREE.DoubleSide, rough:0.78 };
function ec2Anima(E, fn){ if (ec2Mov()) E.onFrame(fn); }
/* bosque continuo hasta el horizonte: copas lejanas que tapan el borde de la escena */
function ec2Alfombra(E, r0, alto, hueco, low){
  const S = 76, seg = low ? 48 : 80, g = new THREE.PlaneGeometry(S, S, seg, seg); g.rotateX(-Math.PI/2);
  const p = g.attributes.position;
  for (let i=0; i<p.count; i++){ const x = p.getX(i), z = p.getZ(i), r = Math.hypot(x, z);
    const k = clamp((r - r0)/2.2, 0, 1), n = ec2N(x*0.33, 2, z*0.33, 3), n2 = ec2N(x*1.1, 5, z*1.1, 2);
    p.setY(i, -3 + k*(3 + alto + 0.9*n + 0.35*n2) - (hueco ? hueco(x, z)*6 : 0)); }
  g.computeVertexNormals();
  const vs = EC2_VERDES.dosel.map(ec2Rgb);
  ec2Paint(g, (x, y, z, o) => { const n = ec2N(x*0.5, 7, z*0.5, 2), f = ec2N(x*2.2, 1, z*2.2, 1);
    const c = ec2Mix(vs[0], vs[3], clamp(0.5 + n*1.6, 0, 1)); ec2Set(o, c, 0.62 + 0.3*clamp((y - alto + 0.6)/1.4, 0, 1) + 0.12*f); });
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors:true, roughness:0.95, metalness:0, envMapIntensity:0.35 }));
  m.receiveShadow = true; E.scene.add(m); return m;
}
const EC2_ESCENA = {
  amazonia(E, op){
    const low = E.low, R = Kit.rng(7);
    const rio = (x, z) => clamp(1 - Math.abs(z - 3.6)/2.4, 0, 1);
    const H = (x, z) => 0.34*Kit.fbm(x*0.14 + 2.1, 0.4, z*0.14 + 2.1, 3) - 0.95*Math.pow(rio(x, z), 0.8);
    ec2Cielo(E, 0x7EA6C6, 0xDDE7E6, 0xC5D3CF);
    ec2Niebla(E, 0xD3DEDB, 17, 54);
    ec2Luz(E, { cielo:0xE6EEF2, suelo:0x3C4A28, hemi:0.9, sol:[8, 13, 6], fuerza:1.35, colSol:0xFFF0D8 });
    ec2Horizonte(E, 46, 5, a => 0.55 + 0.9*Kit.fbm(Math.cos(a)*2, Math.sin(a)*2, 1, 3), 0x3F5E44, 0x7E978C, 1.5);
    ec2Alfombra(E, 10.6, 3.1, (x, z) => clamp(1 - Math.abs(z - 3.6)/2.2, 0, 1), low);
    /* río de aguas blancas: color café con leche por los sedimentos andinos */
    const agua = ec2Agua(1, -0.4, 0x6E5638, 0.9, { tex:true, vetas:10, rep:1, seed:3, rough:0.04, env:1.6 });
    agua.geometry.dispose(); agua.geometry = new THREE.PlaneGeometry(80, 5.4); agua.geometry.rotateX(-Math.PI/2);
    agua.position.z = 3.6; agua.userData.tex.repeat.set(10, 1);
    E.addPart('rio', [agua]);
    if (op && op.vista) ec2Anima(E, (t, dt) => { agua.userData.tex.offset.x -= dt*0.018; });
    /* suelo: hojarasca, barro de orilla y arena del lecho, un tronco caído con hongos */
    const lit = ec2Rgb(0x5E4A30), hum = ec2Rgb(0x3A2E22), mus = ec2Rgb(0x51702E), barro = ec2Rgb(0x6A553C), arena = ec2Rgb(0x7E6A4E);
    const suelo = ec2Terreno(26, H, 0, 0, 1, { seg: low ? 44 : 84, color:(x, y, z, o) => {
      const r = rio(x, z), n = ec2N(x*0.6, 0, z*0.6, 3), f = ec2N(x*3.2, 1, z*3.2, 1);
      let c = ec2Mix(hum, lit, clamp(0.5 + n*1.5, 0, 1)); c = ec2Mix(c, mus, clamp(n*2 - 0.1, 0, 0.55));
      if (r > 0.02) c = ec2Mix(c, r > 0.6 ? arena : barro, clamp(r*2.4, 0, 1));
      ec2Set(o, c, 0.82 + 0.28*f); } });
    const bS = ec2Bin(), bHongo = ec2Bin();
    const hojas = [0x7A5A2E, 0x94703A, 0x6B4A2A, 0xA8823E, 0x5C4028, 0x8A5A32].map(ec2Rgb);
    for (let i=0; i<(low ? 220 : 560); i++){ const x = -11 + R()*22, z = -9 + R()*18.5; if (rio(x, z) > 0.05) continue;
      const g = new THREE.PlaneGeometry(0.13, 0.07); g.rotateX(-Math.PI/2);
      bS.add(g, hojas[i % 6], ec2Mx(x, H(x, z) + 0.018, z, (R()-0.5)*0.3, R()*6.28, (R()-0.5)*0.3), null); }
    const tx = -1.6, tz = 7.0, ty = H(tx, tz);
    ec2Tubo(bS, [[tx - 1.4, ty + 0.12, tz - 0.4], [tx, ty + 0.2, tz], [tx + 1.3, ty + 0.14, tz + 0.5]], 0.2, 0.16, 0x5E4C38, 14, 9,
      (px, py, pz, o, b) => { const f = ec2N(px*4, py*4, pz*4, 2); ec2Set(o, f > 0.05 ? ec2Rgb(0x5E7A34) : b, 0.8 + 0.3*clamp((py - ty)*3, 0, 1)); });
    for (let i=0; i<7; i++){ const t = i/6, px = tx - 1.2 + 2.4*t, pz = tz - 0.34 + 0.8*t;
      const g = new THREE.SphereGeometry(0.1 + 0.05*R(), 10, 5, 0, Math.PI*2, 0, Math.PI*0.5); g.scale(1, 0.28, 1);
      bHongo.add(g, [0xE3C58E, 0xD28A3A, 0xEFE4CC][i % 3], ec2Mx(px, ty + 0.24 + 0.08*R(), pz + 0.16, 0, 0, 0)); }
    for (let i=0; i<5; i++){ const px = tx + 1.6 + R()*0.8, pz = tz + 0.4 + R()*0.6, py = H(px, pz);
      ec2Seg(bHongo, [px, py, pz], [px, py + 0.12, pz], 0.012, 0.01, 0xEFE6D0, 5);
      const g = new THREE.SphereGeometry(0.05, 9, 5, 0, Math.PI*2, 0, Math.PI*0.5); g.scale(1, 0.6, 1); bHongo.add(g, 0xC8663A, ec2Mx(px, py + 0.12, pz)); }
    E.addPart('suelo', [suelo, bS.mesh({ rough:0.95 }), bHongo.mesh({ rough:0.6 })].filter(Boolean));
    /* dosel continuo */
    const bT = ec2Bin(), bC = ec2Bin(), bLi = ec2Bin(), bAv = ec2Bin();
    const arboles = [[1.8,-1.0,3.4],[3.4,-1.6,3.0],[-0.6,-3.2,3.2],[0.2,-0.4,2.9],[-4.6,-0.6,3.1],[3.2,-3.8,2.7],[-3.0,-3.9,2.8],[5.4,0.2,3.0],[-6.2,0.9,2.9],[6.6,-2.8,3.2],[-6.8,-3.4,3.0],[1.4,-5.8,3.3],[-2.2,-6.6,3.0],[4.8,-6.0,2.9],[-5.4,-6.2,3.1],[7.9,-0.2,2.7],[-8.0,-1.0,2.8],[0.4,-8.2,3.0],[-8.6,-4.2,2.9],[8.4,-4.8,3.0],
      [-5.2,8.2,3.2],[-8.6,6.6,2.8],[8.8,5.8,2.9]];
    arboles.forEach(([x, z, a], i) => { if (low && i % 3 === 2) return; ec2ArbolDosel(bT, bC, x, H(x, z), z, a, 1.05 + 0.25*R(), 11 + i, low); });
    /* anillo de copas lejanas: tapa el borde de la alfombra de bosque */
    for (let i=0; i<(low ? 16 : 30); i++){ const a = i/(low ? 16 : 30)*Math.PI*2, r = 10.4 + R()*1.2, x = Math.cos(a)*r, z = Math.sin(a)*r; if (rio(x, z) > 0.1 || Math.abs(a - 0.95) < 0.85) continue;
      ec2Masa(bC, x, 3.1 + R()*0.6, z, 1.3, 0.7, 1.3, EC2_VERDES.dosel[i % 6], { det:1, seed:200 + i, tono:EC2_VERDES.claro }); }
    /* lianas: cuelgan de las ramas hasta el suelo */
    [[0.2,-0.4],[1.8,-1.0],[-4.6,-0.6],[3.4,-1.6],[5.4,0.2]].forEach(([x, z], i) => { const y0 = H(x, z) + 2.6;
      ec2Liana(bLi, [x + 0.5, y0, z + 0.3], [x + 1.1 + 0.3*i, H(x + 1.1, z + 0.6) - 0.05, z + 0.7], 0.5, 0.026); });
    ec2Guacamayo(bAv, -0.2, 3.9, 2.4, 0.3, 'vuelo'); ec2Guacamayo(bAv, 0.7, 4.15, 3.0, 0.45, 'vuelo');
    E.addPart('dosel', [bT.mesh({ rough:0.9 }), bC.mesh({ rough:0.82 }), bLi.mesh({ rough:0.9 }), bAv.mesh({ rough:0.55 })].filter(Boolean));
    /* ceibo emergente */
    const bCe = ec2Bin(), bCc = ec2Bin(), ce = ec2Ceibo(bCe, bCc, -2.4, H(-2.4, -1.2), -1.2, low);
    E.addPart('ceibo', [bCe.mesh({ rough:0.9 }), bCc.mesh({ rough:0.8 })]);
    /* epífitas: bromelias en las ramas del ceibo y en los troncos del dosel, y orquídeas */
    const bE = ec2Bin(), bO = ec2Bin();
    ce.ramas.forEach((p, i) => { const q = [(p[0]*0.55 + (-2.3)*0.45), p[1] - 0.25, (p[2]*0.55 + (-1.28)*0.45)]; ec2Bromelia(bE, q[0], q[1], q[2], 1.3, 60 + i, i % 2 ? 0xE0532C : 0xC9243A); });
    [[0.2,-0.4,1.4],[1.8,-1.0,1.8],[-4.6,-0.6,1.6],[3.4,-1.6,1.2],[-0.6,-3.2,1.9],[-3.0,-3.9,1.5]].forEach(([x, z, hh], i) => ec2Bromelia(bE, x + 0.12, H(x, z) + hh, z + 0.1, 1.1, 80 + i, i % 2 ? 0xE0532C : 0xD13A2E));
    [[-2.2, 2.4, -1.0], [-2.5, 3.1, -1.3], [0.35, 2.0, -0.3], [1.95, 2.3, -0.85]].forEach(([x, y, z], i) => {
      for (let k=0; k<5; k++){ const g = new THREE.SphereGeometry(0.035, 6, 4); g.scale(1.4, 0.8, 0.6); bO.add(g, i % 2 ? 0xE9A3D0 : 0xF3EEF6, ec2Mx(x + 0.07*k, y + H(x, z)*0 - 0.05*k, z + 0.12, 0, k, 0.3*k)); }
      ec2Seg(bO, [x - 0.02, y + 0.05, z + 0.1], [x + 0.35, y - 0.25, z + 0.12], 0.008, 0.006, 0x6A8A3A, 4); });
    E.addPart('epifitas', [bE.mesh(EC2_LAM), bO.mesh({ rough:0.5 })].filter(Boolean));
    /* jaguar en la orilla del río */
    const bJ = ec2Bin(); ec2Jaguar(bJ, 0.9, H(0.9, 1.05) - 0.02, 1.05, 0.25);
    E.addPart('jaguar', [bJ.mesh({ rough:0.7, env:0.5 })]);
    /* flora sin ficha: palmas, heliconias y helechos del sotobosque */
    const bF = ec2Bin(), bFl = ec2Bin(), bFr = ec2Bin();
    [[2.8,0.9,2.4,true],[-3.6,1.0,2.2,true],[-1.2,-1.8,2.0,false],[4.6,-3.0,2.3,false],[-5.8,-2.6,2.1,true],[6.4,1.2,2.2,false],[-2.4,6.5,2.3,true],[3.4,7.0,2.0,false]].forEach(([x, z, a, zz], i) => {
      if (low && i % 2) return; ec2Palma(bF, bFl, x, H(x, z), z, a, { seed:30 + i, zancos:zz, low }); });
    for (let i=0; i<(low ? 8 : 18); i++){ const bank = i % 2 ? 1.05 : 6.3, x = -7 + (i/(low ? 8 : 18))*14 + R()*0.6, z = bank + (R()-0.5)*0.5;
      ec2Heliconia(bFl, bFr, x, H(x, z), z, 0.85 + 0.3*R(), 100 + i); }
    for (let i=0; i<(low ? 12 : 30); i++){ const x = -8 + R()*16, z = -7 + R()*7.5; ec2Helecho(bFl, x, H(x, z), z, 0.8 + 0.5*R(), 140 + i); }
    E.addPart('ec2-flora', [bF.mesh({ rough:0.9 }), bFl.mesh(EC2_LAM), bFr.mesh({ rough:0.55 })].filter(Boolean), { pickable:false });
    if (!low) ec2Velos(E, 5, [-9, 9, 0.2, 0.9, 2.4, 4.8, 3, 3], 0xF4F6F2, 0.22);
    return { cielo:0xDDE7E6, cam:{ r:17.5, phi:1.2, t:[0, 2.5, 0.6] }, etq:{ suelo:[-1.6, H(-1.6, 7) + 0.9, 7.0], jaguar:[0.9, 1.3, 1.05], rio:[4.6, 0.3, 3.8] } };
  },
  manglar(E, op){
    const low = E.low, R = Kit.rng(11), vista = !!(op && op.vista);
    const H = (x, z) => -0.12 + 0.16*Kit.fbm(x*0.16 + 4.4, 0.4, z*0.16 + 4.4, 3) - clamp((z - 2.2)*0.12, 0, 0.7);
    ec2Cielo(E, 0x6FA5CC, 0xE4ECEA, 0xCAD8D6);
    ec2Niebla(E, 0xD9E4E4, 20, 64);
    ec2Luz(E, { cielo:0xEEF4F6, suelo:0x4A4A36, hemi:0.9, sol:[9, 14, 7], fuerza:1.4, colSol:0xFFF4E2 });
    /* horizonte: cinturón de manglar hacia tierra y mar abierto hacia el oeste */
    ec2Horizonte(E, 44, 2.6, a => { const tierra = clamp(-Math.sin(a)*2.2 + 0.4, 0, 1); return tierra*(0.45 + 0.6*Kit.fbm(Math.cos(a)*3, Math.sin(a)*3, 2, 3)); }, 0x2F5238, 0x6F8A76, -0.1);
    const lodo = ec2Rgb(0x5A4A38), lodoH = ec2Rgb(0x3A3228), arena = ec2Rgb(0x7E6E52);
    E.addPart('suelo', [ec2Terreno(30, H, 0, 0, 1, { seg: low ? 44 : 80, rough:0.55, color:(x, y, z, o) => {
      const n = ec2N(x*0.9, 3, z*0.9, 2), f = ec2N(x*4, 1, z*4, 1);
      ec2Set(o, ec2Mix(ec2Mix(lodoH, lodo, clamp((y + 0.35)*3, 0, 1)), arena, clamp(n*1.5 - 0.2, 0, 0.35)), 0.85 + 0.25*f); } })], { pickable:false });
    const agua = ec2Agua(90, 0.02, 0x40584A, 0.84, { tex:true, vetas:5, rep:9, seed:5, rough:0.08, env:0.7 });
    E.addPart('estuario', [agua]);
    if (vista) ec2Anima(E, (t) => { agua.position.y = 0.02 + 0.13*Math.sin(t*0.32); agua.userData.tex.offset.x = t*0.004; agua.userData.tex.offset.y = Math.sin(t*0.32)*0.03; });
    /* mangle rojo en primera línea */
    const bR = ec2Bin(), bRc = ec2Bin();
    [[-2.2,0.6,2.2],[-3.9,2.4,1.8],[-1.0,3.2,1.9],[-4.6,-1.6,1.7],[-0.4,-1.6,1.6],[-6.4,0.4,1.9],[-2.8,-3.4,1.8],[-6.0,3.6,1.6]].forEach(([x, z, a], i) => {
      if (low && i > 4) return; ec2MangleRojo(bR, bRc, x, H(x, z), z, a, 20 + i, low); });
    E.addPart('mangle-rojo', [bR.mesh({ rough:0.8 }), bRc.mesh({ rough:0.62, env:0.6 })]);
    /* mangle negro detrás, con sus neumatóforos */
    const bN = ec2Bin(), bNc = ec2Bin(), bNe = ec2Bin();
    [[2.6,-1.6,1.9],[4.0,0.4,1.7],[2.0,2.2,1.8],[4.6,-3.4,1.9]].forEach(([x, z, a], i) => { if (low && i > 2) return; ec2MangleNegro(bN, bNc, bNe, x, H(x, z), z, a, 40 + i, low, H); });
    E.addPart('mangle-negro', [bN.mesh({ rough:0.85 }), bNc.mesh({ rough:0.7 }), bNe.mesh({ rough:0.9 })]);
    /* cangrejo rojo junto a su cueva */
    const bK = ec2Bin(); ec2Cangrejo(bK, -3.4, H(-3.4, 2.9) + 0.02, 2.9, 0.6, 1.3);
    for (let i=0; i<4; i++){ const x = -3.9 + i*0.45, z = 3.4 - (i % 2)*0.5, g = new THREE.CircleGeometry(0.09, 10); g.rotateX(-Math.PI/2);
      bK.add(g, 0x15120E, ec2Mx(x, H(x, z) + 0.012, z)); }
    E.addPart('cangrejo', [bK.mesh({ rough:0.45, env:0.6 })]);
    /* concha prieta entre las raíces */
    const bQ = ec2Bin();
    for (let i=0; i<9; i++){ const x = -1.8 + (i % 3)*0.42 + R()*0.1, z = 3.1 + Math.floor(i/3)*0.36; ec2Concha(bQ, x, H(x, z) + 0.02, z, R()*6, 1); }
    E.addPart('concha', [bQ.mesh({ rough:0.5, env:0.7 })]);
    /* fragata en vuelo y garza en el agua somera */
    const bA = ec2Bin(); ec2Fragata(bA, 1.0, 4.0, 1.6, 0.7); ec2Garza(bA, 0.9, H(0.9, 2.6) + 0.45, 2.6, 2.4);
    E.addPart('fragata', [bA.mesh({ rough:0.6 })]);
    return { cielo:0xE4ECEA, etq:{ fragata:[1.0, 4.7, 1.6], estuario:[5.2, 0.45, 3.4] } };
  },
  paramo(E, op){
    const low = E.low, R = Kit.rng(19), vista = !!(op && op.vista);
    const lag = (x, z) => clamp(1 - Math.hypot(x - 3.9, z - 2.9)/2.2, 0, 1);
    const H = (x, z) => 0.62*Kit.fbm(x*0.12 + 6.7, 0.4, z*0.12 + 6.7, 3) - 0.9*lag(x, z) - 0.12*Math.pow(Math.max(0, Math.hypot(x, z) - 13), 1.3);
    ec2Cielo(E, 0x8A9DB0, 0xD7DDDF, 0xCCD3D4);
    ec2Niebla(E, 0xCBD3D7, 16, 84);
    ec2Luz(E, { cielo:0xDDE4EA, suelo:0x5A5236, hemi:1.0, sol:[-6, 11, 7], fuerza:1.05, colSol:0xFFF6E8 });
    /* cordilleras y un volcán nevado al fondo */
    const nieve = ec2Rgb(0xF3F5F6), roca = ec2Rgb(0x4A4E58), verdeL = ec2Rgb(0x3E4A40);
    ec2Horizonte(E, 42, 9, a => { const d = Math.atan2(Math.sin(a + 2.25), Math.cos(a + 2.25)); return 0.3 + 0.3*Kit.fbm(Math.cos(a)*2.5, Math.sin(a)*2.5, 4, 3) + 0.12*Kit.fbm(Math.cos(a)*14, Math.sin(a)*14, 2, 2) + 1.15*Math.exp(-Math.pow(d/0.13, 2)); }, 0x5E6A50, 0x8E948A, 0.5,
      (x, y, z, o) => { const t = clamp((y - 0.5)/9, 0, 1); ec2Set(o, t > 0.95 + 0.08*ec2N(x*0.3, y*0.3, z*0.3, 2) ? nieve : ec2Mix(verdeL, roca, clamp(t*1.4, 0, 1))); });
    const paja = ec2Rgb(0xB8A45E), pajaV = ec2Rgb(0x8C8D4C), turba = ec2Rgb(0x3C3A26), musgo = ec2Rgb(0x5E7A32);
    /* llanura lejana: continúa el pajonal hasta el pie de las cordilleras, sin borde visible */
    const lejos = new THREE.Mesh(new THREE.PlaneGeometry(110, 110), new THREE.MeshStandardMaterial({ color:ec2Lin(0x9E9656), roughness:1, metalness:0, envMapIntensity:0.6 }));
    lejos.rotation.x = -Math.PI/2; lejos.position.y = -0.55; lejos.receiveShadow = true; E.scene.add(lejos);
    E.addPart('suelo', [ec2Terreno(44, H, 0, 0, 1, { seg: low ? 48 : 90, color:(x, y, z, o) => {
      const l = lag(x, z), n = ec2N(x*0.5, 2, z*0.5, 3), f = ec2N(x*3.5, 1, z*3.5, 1);
      let c = ec2Mix(pajaV, paja, clamp(0.55 + n*1.6, 0, 1));
      if (l > 0) c = ec2Mix(c, l > 0.3 ? turba : musgo, clamp(l*3, 0, 1));
      ec2Set(o, c, 0.8 + 0.3*f); } })], { pickable:false });
    const agua = ec2Agua(1, -0.42, 0x2E4852, 0.92, { tex:true, vetas:3, rep:2, seed:9, rough:0.06, env:1.0 });
    agua.geometry.dispose(); agua.geometry = new THREE.CircleGeometry(2.35, 40); agua.geometry.rotateX(-Math.PI/2); agua.position.set(3.9, -0.42, 2.9);
    const bT = ec2Bin();
    for (let i=0; i<(low ? 14 : 30); i++){ const a = R()*6.28, r = 1.9 + R()*0.5, x = 3.9 + Math.cos(a)*r, z = 2.9 + Math.sin(a)*r; ec2Almohadilla(bT, x, H(x, z), z, 0.25 + 0.15*R(), 300 + i, 0x4E6A2C); }
    E.addPart('laguna', [agua, bT.mesh({ rough:0.85 })]);
    if (vista) ec2Anima(E, (t) => { agua.userData.tex.offset.set(t*0.01, t*0.006); });
    /* frailejones */
    const bF = ec2Bin(), bFl = ec2Bin();
    [[-2.0,1.2,1.05],[-3.3,-0.6,1.3],[-1.0,-2.0,0.85],[-4.2,2.2,1.1],[0.2,2.4,0.95],[-5.2,-1.6,1.2],[-2.6,-3.2,1.0],[-4.8,0.6,0.7],[-0.6,0.2,0.75],[-6.4,1.4,1.15]].forEach(([x, z, a], i) => {
      if (low && i > 6) return; ec2Frailejon(bF, bFl, x, H(x, z), z, a, i, low); });
    E.addPart('frailejon', [bF.mesh({ rough:0.95 }), bFl.mesh({ side:THREE.DoubleSide, rough:0.95, env:0.55 })]);
    /* pajonal: macollas de paja por todas partes */
    const bP = ec2Bin();
    for (let i=0; i<(low ? 150 : 420); i++){ const x = -12 + R()*23, z = -10 + R()*19; if (Math.hypot(x - 3.9, z - 2.9) < 2.6) continue;
      if (Math.hypot(x + 0.3, z - 2.9) < 1.6) continue; ec2Macolla(bP, x, H(x, z) - 0.03, z, 0.6 + 0.45*R(), i, low); }
    E.addPart('pajonal', [bP.mesh({ side:THREE.DoubleSide, rough:0.9, env:0.4 })]);
    /* almohadillas en la zona húmeda */
    const bAl = ec2Bin();
    for (let i=0; i<(low ? 8 : 14); i++){ const x = -1.5 + (i % 5)*0.62 + R()*0.2, z = 2.2 + Math.floor(i/5)*0.75 + R()*0.2; ec2Almohadilla(bAl, x, H(x, z), z, 0.36 + 0.14*R(), i, [0x557A2A, 0x4A6E26, 0x6A8430][i % 3]); }
    E.addPart('almohadillas', [bAl.mesh({ rough:0.6, env:0.55 })]);
    /* cóndor planeando */
    const bC = ec2Bin(); ec2Condor(bC, 0, 0, 0, 0);
    const cond = bC.mesh({ rough:0.7 }); cond.position.set(0.8, 4.4, -2.8); cond.rotation.set(0.12, 0.6, 0.08);
    E.addPart('condor', [cond]);
    if (vista) ec2Anima(E, (t) => { cond.position.set(0.8 + Math.cos(t*0.25)*0.5, 4.4 + Math.sin(t*0.5)*0.12, -2.8 + Math.sin(t*0.25)*0.5); cond.rotation.y = 0.6 - t*0.25; cond.rotation.z = 0.12; });
    /* oso andino */
    const bO = ec2Bin(); ec2Oso(bO, -3.4, H(-3.4, -2.4) - 0.02, -2.4, 0.5);
    E.addPart('oso', [bO.mesh({ rough:0.9 })]);
    /* neblina que se arrastra sobre el pajonal */
    const velos = ec2Velos(E, low ? 5 : 11, [-10, 10, 0.5, 2.4, -8, 6, 4, 4], 0xF1F3F4, 0.34);
    if (vista) ec2Anima(E, (t, dt) => velos.forEach(s => { s.position.x += s.userData.v*dt; if (s.position.x > 11) s.position.x = -11; }));
    return { cielo:0xD7DDDF, etq:{ laguna:[3.9, 0.35, 2.9], almohadillas:[-0.3, 0.8, 2.9] } };
  },
  galapagos(E, op){
    const low = E.low, R = Kit.rng(23), vista = !!(op && op.vista);
    const H = (x, z) => { const a = Math.atan2(z, x), r = Math.hypot(x, z)*(1 + 0.2*Kit.fbm(Math.cos(a)*1.3 + 2, Math.sin(a)*1.3, 0.7, 3));
      return clamp(1.55 - 0.085*r*r, -1.2, 2) + 0.3*Kit.fbm(x*0.17 + 9.3, 0.4, z*0.17 + 9.3, 3); };
    ec2Cielo(E, 0x5D9BCF, 0xDCE8EC, 0xB9D0DA);
    ec2Niebla(E, 0xD6E3E8, 22, 72);
    ec2Luz(E, { cielo:0xE8F1F6, suelo:0x3A3630, hemi:0.85, sol:[10, 14, 4], fuerza:1.5, colSol:0xFFF3DE });
    /* otra isla en el horizonte */
    ec2Horizonte(E, 48, 3.2, a => { const d = Math.atan2(Math.sin(a + 2.0), Math.cos(a + 2.0)); return 0.9*Math.exp(-Math.pow(d/0.22, 2)) + 0.5*Math.exp(-Math.pow((d + 0.5)/0.1, 2)); }, 0x5A6A6C, 0x9FB2B8, -0.6);
    const neg = ec2Rgb(0x161514), negR = ec2Rgb(0x2E2420), pardo = ec2Rgb(0x4A3E34), humedo = ec2Rgb(0x42552C);
    const coladaX = -1.3, coladaZ = 3.3;
    const tierra = ec2Terreno(22, H, 0, 0, 1, { seg: low ? 48 : 84, rough:0.8, color:(x, y, z, o) => {
      const cuerda = 0.5 + 0.5*Math.sin((x*2.2 + z*1.4) + 3*ec2N(x*0.8, 2, z*0.8, 2)), f = ec2N(x*5, 1, z*5, 1);
      const colada = Math.hypot((x - coladaX)*0.8, z - coladaZ) < 1.7 + 0.5*ec2N(x, 3, z, 2);
      let c = ec2Mix(neg, negR, clamp(ec2N(x*0.7, 4, z*0.7, 2)*1.5 + 0.2, 0, 0.6));
      if (!colada){ c = ec2Mix(c, pardo, clamp((y - 0.35)*1.6, 0, 0.8)); c = ec2Mix(c, humedo, clamp((y - 1.15)*2.2, 0, 1)); }
      ec2Set(o, c, (colada ? 0.9 + 0.35*cuerda : 0.85 + 0.12*cuerda) + 0.2*f); } });
    const bL = ec2Bin();
    for (let i=0; i<(low ? 3 : 6); i++){ const a = R()*6.28, r = R()*1.3, x = coladaX + Math.cos(a)*r, z = coladaZ + Math.sin(a)*r; ec2CactusLava(bL, x, H(x, z), z, 400 + i); }
    E.addPart('lava', [tierra, bL.mesh({ rough:0.7 })].filter(Boolean));
    /* corriente de Humboldt: mar frío y espuma en la costa */
    const mar = ec2Agua(110, -0.12, 0x1D5E74, 0.94, { tex:true, vetas:4, rep:14, seed:12, rough:0.1, env:1.0 });
    const esp = [], ne = 96;
    for (let i=0; i<=ne; i++){ const a = i/ne*Math.PI*2; let r = 2; while (r < 9 && H(Math.cos(a)*r, Math.sin(a)*r) > -0.1) r += 0.05; esp.push([a, r]); }
    const pos = [], idx = [];
    esp.forEach(([a, r], i) => { [r - 0.05, r + 0.06, r + 0.2].forEach(rr => pos.push(Math.cos(a)*rr, -0.105, Math.sin(a)*rr)); if (i < ne){ const b = i*3, c = (i+1)*3; idx.push(b, c, b+1, b+1, c, c+1, b+1, c+1, b+2, b+2, c+1, c+2); } });
    const ge = new THREE.BufferGeometry(); ge.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); ge.setIndex(idx); ge.computeVertexNormals();
    const al = new Float32Array(pos.length/3*3); for (let i=0; i<pos.length/3; i++){ const a = Math.floor(i/3)/ne*6.28, br = clamp(0.55 + 1.6*Kit.fbm(Math.cos(a)*4, Math.sin(a)*4, 3, 2), 0, 1), k = (i % 3 === 1 ? 1 : i % 3 === 0 ? 0.5 : 0)*br; al[i*3] = al[i*3+1] = al[i*3+2] = k; }
    ge.setAttribute('color', new THREE.BufferAttribute(al, 3));
    const espuma = new THREE.Mesh(ge, new THREE.MeshBasicMaterial({ color:0xffffff, vertexColors:true, transparent:true, opacity:0.7, depthWrite:false, blending:THREE.AdditiveBlending }));
    espuma.userData.keepOpacity = true;
    E.addPart('humboldt', [mar, espuma]);
    if (vista) ec2Anima(E, (t) => { mar.userData.tex.offset.set(t*0.006, t*0.004); espuma.material.opacity = 0.45 + 0.3*(0.5 + 0.5*Math.sin(t*1.1)); espuma.scale.setScalar(1 + 0.012*Math.sin(t*1.1)); });
    /* Opuntia arborescente */
    const bO = ec2Bin(), bOp = ec2Bin();
    [[2.2,-0.8,1.7],[3.4,1.2,1.4],[0.6,-2.8,1.6],[-2.4,-2.2,1.3],[-0.4,2.6,1.5],[2.8,-2.6,1.2]].forEach(([x, z, a], i) => { if (low && i > 4) return; ec2Opuntia(bO, bOp, x, H(x, z), z, a, 500 + i, low); });
    E.addPart('opuntia', [bO.mesh({ rough:0.9 }), bOp.mesh({ rough:0.55, env:0.6 })]);
    /* tortugas gigantes */
    const bT = ec2Bin(); ec2Tortuga(bT, -1.8, H(-1.8, 1.4) - 0.04, 1.4, 0.9, 1.1); ec2Tortuga(bT, -3.0, H(-3.0, -0.2) - 0.04, -0.2, -0.6, 0.85);
    E.addPart('tortuga', [bT.mesh({ rough:0.62, env:0.55 })]);
    /* iguanas marinas sobre las rocas de la orilla */
    const bI = ec2Bin();
    [[3.2,2.4,0.6,1.1],[4.0,1.3,2.2,0.9],[3.6,3.1,-0.8,0.8]].forEach(([x, z, r, s]) => ec2Iguana(bI, x, H(x, z) + 0.02, z, r, s));
    E.addPart('iguana', [bI.mesh({ rough:0.55, env:0.6 })]);
    /* pinzones: en el suelo y sobre las pencas */
    const bPz = ec2Bin();
    [[1.2,1.2,0],[1.6,1.0,2.2],[2.7,-0.5,1.2],[0.8,-2.2,-1]].forEach(([x, z, r]) => ec2Pinzon(bPz, x, H(x, z) + 0.06, z, r));
    E.addPart('pinzones', [bPz.mesh({ rough:0.6 })]);
    /* flora y rocas sin ficha: bosque de Scalesia en la parte alta, rocas y zayapas en la costa */
    const bS = ec2Bin(), bSc = ec2Bin(), bZ = ec2Bin();
    [[0.2,0.1,1.6],[-0.8,-0.6,1.4],[0.9,-0.9,1.3],[-0.5,0.9,1.5],[0.9,0.7,1.2]].forEach(([x, z, a], i) => { if (low && i > 2) return; ec2Scalesia(bS, bSc, x, H(x, z), z, a, 600 + i, low); });
    for (let i=0; i<(low ? 10 : 24); i++){ const e = esp[Math.floor(R()*ne)], rr = e[1] - 0.2 - R()*0.5, x = Math.cos(e[0])*rr, z = Math.sin(e[0])*rr;
      ec2Masa(bS, x, H(x, z) + 0.05, z, 0.22 + 0.2*R(), 0.14 + 0.1*R(), 0.2 + 0.2*R(), 0x1E1C1A, { det:1, seed:700 + i, tono:0x3A302A, amp:0.35, luz:0.1, sombra:0.3 }); }
    for (let i=0; i<(low ? 3 : 7); i++){ const e = esp[Math.floor(R()*ne)], rr = e[1] - 0.25, x = Math.cos(e[0])*rr, z = Math.sin(e[0])*rr;
      const g = new THREE.SphereGeometry(0.06, 8, 5); g.scale(1.2, 0.45, 0.9); bZ.add(g, 0xE0452A, ec2Mx(x, H(x, z) + 0.1, z, 0, R()*6, 0)); }
    E.addPart('ec2-flora', [bS.mesh({ rough:0.85 }), bSc.mesh({ rough:0.8 }), bZ.mesh({ rough:0.5 })].filter(Boolean), { pickable:false });
    return { cielo:0xDCE8EC, etq:{ lava:[coladaX, H(coladaX, coladaZ) + 0.7, coladaZ], humboldt:[5.6, 0.3, 3.4] } };
  }
};

/* =====================================================================
   3 · GRADIENTE ALTITUDINAL DEL ECUADOR
   ===================================================================== */
const EC2_PISOS = [
  { max:60,   n:'Manglar y humedal costero', plantas:'Mangle rojo, mangle negro, mangle blanco', animales:'Cangrejo rojo, concha prieta, fragata, pelícano', bio:'manglar',
    nota:'Aquí no manda la temperatura sino la sal y la marea.' },
  { max:300,  n:'Bosque húmedo tropical y bosque seco', plantas:'Ceibo (Ceiba trichandra), guayacán, balsa', animales:'Mono aullador, tucán, boa', bio:'amazonia',
    nota:'En el occidente el bosque es seco (Machalilla) y en el oriente, húmedo: la misma altitud, distinta lluvia.' },
  { max:1300, n:'Bosque piemontano', plantas:'Palmas, cedro, chonta', animales:'Gallito de la peña, ardilla, tucanes', bio:null,
    nota:'Transición: el calor baja poco a poco y aumenta la neblina.' },
  { max:2000, n:'Bosque montano bajo (nublado)', plantas:'Helechos arbóreos, orquídeas, bromelias', animales:'Colibríes, tangaras, oso andino', bio:null,
    nota:'La neblina aporta agua adicional que no cae como lluvia: precipitación horizontal.' },
  { max:3000, n:'Bosque montano alto · bosque nublado', plantas:'Cedro andino, aliso, musgos y epífitas', animales:'Tucán andino, puma, mono nocturno', bio:null,
    nota:'En Mindo o Baeza, cada árbol sostiene decenas de especies de epífitas.' },
  { max:3400, n:'Ceja andina y bosque de Polylepis', plantas:'Polylepis (árbol de papel), quishuar', animales:'Colibrí estrella ecuatoriana, conejo', bio:null,
    nota:'Polylepis es el género de árbol que crece a mayor altitud del mundo: hasta 4.500 m.' },
  { max:4200, n:'Páramo', plantas:'Pajonal, frailejón, almohadillas, achupalla', animales:'Cóndor, lobo de páramo, venado, curiquingue', bio:'paramo',
    nota:'La esponja de agua del Ecuador: aquí nacen los ríos que abastecen a las ciudades.' },
  { max:4700, n:'Superpáramo', plantas:'Musgos, líquenes, plantas en cojín aisladas', animales:'Muy pocos: insectos, ratón marsupial', bio:null,
    nota:'Suelo con hielo y deshielo diarios; menos del 10 % del terreno tiene vegetación.' },
  { max:6300, n:'Nieve y hielo permanentes', plantas:'Sin plantas vasculares; algas de nieve', animales:'Ninguno residente', bio:null,
    nota:'El Chimborazo llega a 6.263 m: por el abultamiento ecuatorial, su cumbre es el punto más lejano del centro de la Tierra.' }
];
function ec2Piso(alt){ return EC2_PISOS.find(p => alt <= p.max) || EC2_PISOS[EC2_PISOS.length-1]; }
function ec2Temp(alt){ return 26 - 0.55*alt/100; }

/* =====================================================================
   4 · FLUJO DE ENERGÍA (datos reales del estudio clásico de Silver Springs)
   ===================================================================== */
const EC2_PIR = {
  energia:{ n:'Pirámide de energía', u:'kJ · m⁻² · año⁻¹',
    d:'Mide cuánta energía pasa por cada nivel en un año. Nunca se invierte: la energía siempre disminuye hacia arriba.',
    v:[87000, 14000, 1600, 90], fuente:'Datos del ecosistema de Silver Springs (Odum, 1957), convertidos a kilojulios.' },
  biomasa:{ n:'Pirámide de biomasa', u:'g de materia seca · m⁻²',
    d:'Mide la masa de seres vivos presente en un momento dado. Puede invertirse en el mar, donde el fitoplancton se reproduce y es comido en horas.',
    v:[809, 37, 11, 1.5], fuente:'Mismo ecosistema. En el océano la pirámide se invierte: 4 g de fitoplancton sostienen 21 g de zooplancton.' },
  numeros:{ n:'Pirámide de números', u:'individuos · 1.000 m⁻²',
    d:'Cuenta individuos, sin importar su tamaño. Se invierte fácilmente: un solo árbol puede alimentar a miles de insectos.',
    v:[5800000, 208000, 3000, 12], fuente:'Un árbol (1 productor) puede sostener 10.000 orugas y 200 aves: la pirámide queda al revés.' }
};
const EC2_NIV = ['Productores (N1)', 'Consumidores primarios (N2)', 'Consumidores secundarios (N3)', 'Consumidores terciarios (N4)'];

/* =====================================================================
   5 · CICLOS BIOGEOQUÍMICOS (el estudiante sigue un átomo)
   ===================================================================== */
const EC2_CICLOS = {
  carbono:{
    n:'Ciclo del carbono', at:'un átomo de carbono', col:'#6E7B8B', inicio:'atmosfera',
    intro:'El carbono es el esqueleto de toda molécula orgánica. Sigue un átomo desde el aire y comprueba que la materia circula (a diferencia de la energía, que se pierde).',
    res:[
      { id:'atmosfera', n:'Atmósfera (CO₂)', x:60, y:30, w:170, h:52, dato:'≈ 875 Gt de carbono. En 1750 había 280 ppm de CO₂; hoy se superan las 420 ppm.' },
      { id:'productor', n:'Plantas y fitoplancton', x:320, y:30, w:170, h:52, dato:'≈ 550 Gt de carbono en la biomasa vegetal del planeta.' },
      { id:'consumidor', n:'Animales', x:570, y:30, w:150, h:52, dato:'Solo unas 2 Gt: los animales son una fracción diminuta de la biomasa.' },
      { id:'suelo', n:'Suelo y materia orgánica', x:320, y:170, w:170, h:52, dato:'≈ 1.500 a 2.400 Gt: más carbono que la atmósfera y la vegetación juntas. El páramo guarda 30 a 50 kg/m².' },
      { id:'oceano', n:'Océano (carbonatos)', x:60, y:170, w:170, h:52, dato:'≈ 38.000 Gt: el mayor reservorio activo. Al absorber CO₂ el agua se acidifica.' },
      { id:'fosil', n:'Combustibles fósiles', x:570, y:170, w:150, h:52, dato:'Carbono que llevaba millones de años fuera de circulación y devolvemos en décadas.' }
    ],
    pasos:[
      { de:'atmosfera', a:'productor', p:'Fotosíntesis', t:'La hoja fija el CO₂ y lo convierte en glucosa. Aquí entra también la energía del sol al ecosistema.' },
      { de:'productor', a:'consumidor', p:'Alimentación', t:'Un herbívoro come la hoja: el átomo pasa a formar parte de sus tejidos.' },
      { de:'productor', a:'atmosfera', p:'Respiración celular', t:'La planta respira y devuelve el CO₂ al aire: no todo lo que fija se queda en su cuerpo.' },
      { de:'consumidor', a:'atmosfera', p:'Respiración celular', t:'El animal quema la glucosa para obtener ATP y exhala el CO₂. La mayor parte del carbono vuelve por esta vía.' },
      { de:'consumidor', a:'suelo', p:'Muerte y excreción', t:'Los restos y las heces llegan al suelo, donde los descomponedores toman el relevo.' },
      { de:'productor', a:'suelo', p:'Caída de hojarasca', t:'Las hojas caen. En la Amazonía se descomponen en semanas; en el páramo frío pueden tardar siglos.' },
      { de:'suelo', a:'atmosfera', p:'Descomposición', t:'Hongos y bacterias respiran la materia orgánica y liberan CO₂. Es la respiración del suelo.' },
      { de:'suelo', a:'fosil', p:'Enterramiento (millones de años)', t:'Si la materia queda sin oxígeno y bajo presión, se transforma en carbón o petróleo: el átomo sale de circulación.' },
      { de:'fosil', a:'atmosfera', p:'Combustión', t:'Al quemar el combustible devolvemos en un instante el carbono que tardó millones de años en guardarse. Aquí se rompe el equilibrio del ciclo.' },
      { de:'atmosfera', a:'oceano', p:'Disolución en el agua', t:'El CO₂ se disuelve en el mar y forma ácido carbónico: el océano absorbe casi un tercio de nuestras emisiones y se acidifica.' },
      { de:'oceano', a:'atmosfera', p:'Desgasificación', t:'Si el agua se calienta, retiene menos gas y devuelve CO₂ al aire.' },
      { de:'oceano', a:'productor', p:'Fotosíntesis del fitoplancton', t:'El fitoplancton fija carbono disuelto: produce cerca de la mitad del oxígeno del planeta.' }
    ]
  },
  nitrogeno:{
    n:'Ciclo del nitrógeno', at:'un átomo de nitrógeno', col:'#5F7FA8', inicio:'n2',
    intro:'El 78 % del aire es nitrógeno, pero ningún animal ni planta puede usarlo directamente: el triple enlace del N₂ es durísimo. Todo depende de unas pocas bacterias.',
    res:[
      { id:'n2', n:'N₂ atmosférico', x:60, y:30, w:170, h:52, dato:'78 % del aire. Inutilizable para plantas y animales por su triple enlace.' },
      { id:'amonio', n:'Amonio NH₄⁺ (suelo)', x:320, y:30, w:170, h:52, dato:'Primera forma asimilable. La producen las bacterias fijadoras y la descomposición.' },
      { id:'nitrato', n:'Nitrato NO₃⁻ (suelo)', x:570, y:30, w:150, h:52, dato:'La forma que las plantas absorben mejor. Muy soluble: se lava con la lluvia.' },
      { id:'planta', n:'Proteínas de la planta', x:570, y:170, w:150, h:52, dato:'El nitrógeno entra en aminoácidos, ADN y clorofila.' },
      { id:'animal', n:'Proteínas del animal', x:320, y:170, w:170, h:52, dato:'El animal no fabrica aminoácidos esenciales: los obtiene comiendo.' },
      { id:'detrito', n:'Restos y excretas', x:60, y:170, w:170, h:52, dato:'La urea y las proteínas muertas vuelven al suelo.' }
    ],
    pasos:[
      { de:'n2', a:'amonio', p:'Fijación biológica', t:'Bacterias Rhizobium en los nódulos de las leguminosas (fréjol, chocho, alfalfa) rompen el N₂ con la enzima nitrogenasa. También lo hacen los rayos y, artificialmente, el proceso Haber-Bosch.' },
      { de:'amonio', a:'nitrato', p:'Nitrificación', t:'Nitrosomonas convierte NH₄⁺ en NO₂⁻ y Nitrobacter lo pasa a NO₃⁻. Ambas obtienen energía de esa reacción: son quimiosintéticas.' },
      { de:'nitrato', a:'planta', p:'Asimilación', t:'La raíz absorbe el nitrato y la planta lo usa para fabricar aminoácidos y clorofila.' },
      { de:'planta', a:'animal', p:'Alimentación', t:'El herbívoro come la planta y reorganiza esos aminoácidos en sus propias proteínas.' },
      { de:'animal', a:'detrito', p:'Excreción y muerte', t:'La urea de la orina y las proteínas del cuerpo muerto llegan al suelo.' },
      { de:'planta', a:'detrito', p:'Caída de hojarasca', t:'Las hojas caídas también devuelven nitrógeno al suelo.' },
      { de:'detrito', a:'amonio', p:'Amonificación', t:'Bacterias y hongos descomponen las proteínas y liberan amonio. Sin ellos, el nitrógeno quedaría atrapado en los cadáveres.' },
      { de:'nitrato', a:'n2', p:'Desnitrificación', t:'En suelos encharcados y sin oxígeno, Pseudomonas usa el nitrato para respirar y devuelve N₂ al aire: el ciclo se cierra.' },
      { de:'nitrato', a:'detrito', p:'Lixiviación hacia el agua', t:'El exceso de fertilizante se lava hacia ríos y esteros: provoca eutrofización, floraciones de algas y zonas muertas sin oxígeno.' }
    ]
  },
  agua:{
    n:'Ciclo del agua', at:'una molécula de agua', col:'#3E86A8', inicio:'oceano',
    intro:'El agua es el único de estos ciclos que no necesita organismos para funcionar, pero la vegetación lo cambia todo: sin bosque, la lluvia se va sin infiltrarse.',
    res:[
      { id:'oceano', n:'Océano', x:60, y:170, w:170, h:52, dato:'97 % del agua del planeta. Solo el 2,5 % es dulce y dos tercios están congelados.' },
      { id:'atmosfera', n:'Atmósfera (vapor y nubes)', x:320, y:30, w:170, h:52, dato:'Apenas el 0,001 % del agua, pero se renueva cada 9 días en promedio.' },
      { id:'vegetacion', n:'Vegetación', x:570, y:30, w:150, h:52, dato:'Un árbol amazónico grande transpira hasta 1.000 litros por día.' },
      { id:'suelo', n:'Suelo y páramo', x:570, y:170, w:150, h:52, dato:'El andosol del páramo retiene hasta el doble de su peso en agua y la suelta poco a poco.' },
      { id:'subterranea', n:'Agua subterránea', x:320, y:300, w:170, h:52, dato:'Puede permanecer siglos bajo tierra antes de salir por un manantial.' },
      { id:'rio', n:'Ríos y lagunas', x:60, y:300, w:170, h:52, dato:'Los ríos ecuatorianos nacen casi todos en el páramo, sobre los 3.500 m.' }
    ],
    pasos:[
      { de:'oceano', a:'atmosfera', p:'Evaporación', t:'El sol entrega energía y la molécula pasa a vapor. El 86 % de la evaporación del planeta ocurre en el mar.' },
      { de:'atmosfera', a:'suelo', p:'Precipitación', t:'El vapor se enfría, condensa y cae como lluvia, granizo o llovizna.' },
      { de:'atmosfera', a:'oceano', p:'Precipitación sobre el mar', t:'Tres cuartas partes de la lluvia caen directamente en el océano.' },
      { de:'suelo', a:'vegetacion', p:'Absorción por la raíz', t:'La raíz toma el agua y la sube por el xilema hasta las hojas.' },
      { de:'vegetacion', a:'atmosfera', p:'Transpiración', t:'La hoja libera vapor por los estomas. En la Amazonía la mitad de la lluvia procede de agua reciclada por el propio bosque: los "ríos voladores".' },
      { de:'suelo', a:'subterranea', p:'Infiltración', t:'El agua baja entre los poros del suelo. Un páramo sano infiltra casi todo; un suelo compactado por ganado, casi nada.' },
      { de:'suelo', a:'rio', p:'Escorrentía superficial', t:'Si el suelo está saturado o impermeable, el agua corre por la superficie y arrastra el suelo: erosión y crecidas.' },
      { de:'subterranea', a:'rio', p:'Descarga en manantiales', t:'El agua subterránea alimenta los ríos en época seca: por eso un río con buen páramo no se seca.' },
      { de:'rio', a:'oceano', p:'Caudal hacia el mar', t:'El río devuelve el agua al océano y la molécula cierra su recorrido.' },
      { de:'rio', a:'atmosfera', p:'Evaporación del agua dulce', t:'Lagunas y embalses también evaporan agua hacia la atmósfera.' }
    ]
  }
};

/* =====================================================================
   6 · SERVICIOS ECOSISTÉMICOS Y AMENAZAS REALES
   ===================================================================== */
const EC2_AMENAZAS = [
  { id:'deforestacion', n:'Deforestación amazónica', em:'🪓', bio:'Amazonía',
    causa:'Frente agrícola y ganadero, apertura de vías petroleras y mineras, y tala ilegal de madera fina.',
    datos:[ ['Pérdida anual de bosque nativo','≈ 45.000 a 60.000 ha/año','60'],
            ['Bosque nativo que conserva el país','≈ 51 % del territorio','51'],
            ['Deforestación acumulada desde 1990','≈ 30 % del bosque original','30'] ],
    efecto:'Al talar, el carbono de la biomasa pasa a la atmósfera y el suelo pobre solo sirve 3 a 5 años. Después el potrero se abandona y el frente avanza.',
    medidas:[ { t:'Programa Socio Bosque: incentivo económico por hectárea conservada', ok:true, fb:'Funciona porque cambia el incentivo: conservar pasa a tener un valor monetario para las comunidades, que son las dueñas del bosque.' },
              { t:'Reforestar con eucalipto y pino de rápido crecimiento', ok:false, fb:'Una plantación no es un bosque: el eucalipto es exótico, acidifica el suelo, consume mucha agua y no recupera la biodiversidad perdida.' },
              { t:'Prohibir toda actividad humana en la Amazonía', ok:false, fb:'No es viable ni justo: allí viven pueblos indígenas y campesinos. Las medidas que funcionan combinan conservación con medios de vida, como el manejo forestal comunitario.' } ],
    fuente:'MAATE · cifras aproximadas del monitoreo de deforestación.' },
  { id:'camaroneras', n:'Camaroneras sobre el manglar', em:'🦐', bio:'Manglar',
    causa:'Tala del manglar para excavar piscinas de camarón desde los años setenta, sobre todo en Guayas y El Oro.',
    datos:[ ['Manglar en 1969','≈ 203.000 ha','100'], ['Manglar que queda hoy','≈ 157.000 ha','77'],
            ['Pérdida atribuida a camaroneras','más del 70 % de lo perdido','70'] ],
    efecto:'Al desaparecer la guardería del manglar cae la pesca artesanal, se pierden la concha y el cangrejo, y la costa queda sin su barrera contra marejadas y tsunamis.',
    medidas:[ { t:'Acuerdos de uso sustentable del manglar con las comunidades concheras', ok:true, fb:'Los acuerdos entregan la custodia del manglar a quienes viven de él: vigilan, controlan la veda y recuperan bancos de concha. Es la medida con mejores resultados en el golfo de Guayaquil.' },
              { t:'Permitir nuevas camaroneras si cada una siembra mangle en otro sitio', ok:false, fb:'Un manglar joven tarda décadas en funcionar como criadero y casi nunca se logra la misma estructura. Compensar no equivale a conservar.' },
              { t:'Sembrar mangle en las piscinas sin retirar los muros ni restablecer la marea', ok:false, fb:'Sin flujo de marea las plántulas mueren: la marea es el factor abiótico que define este ecosistema. Primero hay que romper los muros.' } ],
    fuente:'Ministerio del Ambiente · Fundación Cerro Verde · cifras aproximadas.' },
  { id:'invasoras', n:'Especies introducidas en Galápagos', em:'🐐', bio:'Galápagos',
    causa:'Animales y plantas llevados por el ser humano: cabras, ratas, gatos, hormiga colorada, mora, guayaba.',
    datos:[ ['Especies introducidas registradas','más de 1.500','100'], ['Cabras erradicadas en el Proyecto Isabela','≈ 79.000 en 5 años','79'],
            ['Superficie del archipiélago protegida','97 % es parque nacional','97'] ],
    efecto:'Las cabras arrasaron la vegetación de la que dependen las tortugas; las ratas y los gatos comen huevos y crías; la mora forma matorrales impenetrables que desplazan a la Scalesia.',
    medidas:[ { t:'Erradicación total de la especie invasora en cada isla y bioseguridad en puertos y aeropuertos', ok:true, fb:'En islas, la erradicación completa sí es posible y es lo único que funciona: si queda el 1 % de la población invasora, se recupera. Por eso se acompaña con control de carga y equipaje.' },
              { t:'Controlar cada año una parte de las cabras para mantenerlas en pocos individuos', ok:false, fb:'Un control parcial funciona como una cosecha: las cabras responden con mayor natalidad y la población vuelve a su nivel en pocos años. Verás por qué en el simulador logístico.' },
              { t:'Trasladar las tortugas a islas donde no haya especies introducidas', ok:false, fb:'Cada población de tortuga está adaptada a su isla y cumple un papel ecológico allí; moverla no resuelve el problema y crea otro en la isla receptora.' } ],
    fuente:'Parque Nacional Galápagos · Fundación Charles Darwin.' }
];
const EC2_SERVICIOS = [
  { em:'💧', n:'Provisión: agua', d:'El páramo abastece de agua potable a Quito, Cuenca y Ambato. Cuidar 1 ha de páramo cuesta mucho menos que potabilizar el agua que deja de filtrar.' },
  { em:'🐟', n:'Provisión: alimento', d:'El manglar es la guardería de más del 70 % de las especies que se pescan en el Pacífico ecuatoriano.' },
  { em:'🌡️', n:'Regulación: clima', d:'Los bosques amazónicos y el suelo del páramo almacenan carbono; el bosque además recicla la mitad de su propia lluvia.' },
  { em:'🛡️', n:'Regulación: protección', d:'Las raíces del manglar disipan la energía del oleaje y reducen los daños de marejadas y tsunamis.' },
  { em:'🐝', n:'Soporte: polinización', d:'Colibríes, abejas y murciélagos polinizan cultivos como el cacao, el maracuyá y el tomate de árbol.' },
  { em:'🏞️', n:'Culturales', d:'Turismo, identidad y conocimiento: Galápagos recibe más de 250.000 visitantes al año y financia buena parte de su conservación.' }
];

/* =====================================================================
   RUTA A · #/explorar/ecosistemas
   ===================================================================== */
route('/explorar/ecosistemas', (view) => {
  view.classList.add('wide');
  const SEC = [
    { id:'biomas',   n:'1 · Los cuatro ecosistemas' },
    { id:'gradiente',n:'2 · Gradiente altitudinal' },
    { id:'energia',  n:'3 · Flujo de energía' },
    { id:'ciclos',   n:'4 · Ciclos de materia' },
    { id:'amenazas', n:'5 · Servicios y amenazas' },
    { id:'reto',     n:'6 · Reto final' }
  ];
  const St = { sec:0, bio:'amazonia', sel:null, pir:'energia', pirReal:false, calc:'', calcOK:false,
               alt:0, ciclo:'carbono', pos:null, ruta:[], amen:'deforestacion', amenFb:{},
               quiz:[false,false,false,false,false,false], intentos:0,
               marcas:{ explora:false, gradiente:false, energia:false, ciclo:false, medida:false },
               start:Date.now() };
  const hecho0 = !!(Store.s.activities['reto-ecosistemas'] || {}).done;

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{}, h('span',{class:'eyebrow eco'},'Biología · Bachillerato · Unidades 7 y 8 · Biodiversidad y ecosistemas'),
      h('h1',{},'Ecosistemas del Ecuador: cómo funcionan por dentro'),
      h('p',{},'Cuatro ecosistemas reales del país en 3D, el gradiente altitudinal que los ordena, la energía que los atraviesa y la materia que circula en ellos.')),
    h('span',{class:'pill eco'},'+140 XP · 40–50 min')));

  const estado = h('div',{class: hecho0 ? 'notice ok' : 'notice'}, hecho0
    ? 'Reto resuelto ✓ · puedes volver a explorar los cuatro ecosistemas cuando quieras.'
    : 'Pendiente: explora los ecosistemas, sigue un átomo por un ciclo y resuelve las 6 preguntas de la sección 6.');
  view.append(purposeBanner({
    proposito:'Comprender que cada ecosistema del Ecuador es el resultado de unos factores abióticos concretos, que la energía lo atraviesa en un solo sentido perdiéndose como calor, y que la materia circula una y otra vez.',
    observa:['Qué adaptación de cada especie responde a un factor abiótico concreto (sal, frío, falta de oxígeno, sequía)','Cuánta energía queda al subir de un nivel trófico al siguiente','Qué reservorio de carbono, nitrógeno o agua es el más grande y cuál el más rápido'],
    reto:'Explica por qué a 4.000 m no crece un ceibo y resuelve las 6 preguntas finales sobre energía, materia y amenazas.',
    statusEl: estado }));

  const nav = h('nav',{class:'eco2-nav','aria-label':'Secciones del recurso'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);

  /* ---------- escena 3D persistente ---------- */
  let SC = null;
  function escena(){
    if (SC) return SC;
    const stage = h('div',{class:'stage eco2-stage'}), panel = h('div',{class:'panel stack'});
    const wrap = h('div',{class:'stack'},
      h('div',{class:'eco2-bio'}), h('div',{class:'viewer'}, stage, panel), h('div',{class:'stack'}));
    SC = { wrap, stage, panel, bar: wrap.children[0], extra: wrap.children[2], E:null, bio:null };
    SC.montar = () => {
      const B = EC2_BIOMAS[St.bio];
      if (SC.E){ SC.E.dispose(); SC.E = null; }
      SC.stage.innerHTML = '';
      if (webglOK){
        try {
          SC.E = new Engine3D(SC.stage, { radius:15, phi:1.18, theta:0.62, minR:5, maxR:30, target:[0,1.6,0],
            aria:'Escena 3D del ecosistema. Arrastra para rotar y usa la lista de elementos para seleccionarlos con el teclado.',
            onSelect:(id) => { if (id){ St.sel = id; ficha(); } } });
          const r = EC2_ESCENA[St.bio](SC.E, { vista:true });
          SC.E.scene.background = new THREE.Color(r.cielo);
          if (!SC.E.scene.fog) SC.E.scene.fog = new THREE.Fog(B.fog[0], 30, 82);
          if (r.cam){ const e = SC.E; e.opts.radius = r.cam.r; if (r.cam.phi) e.opts.phi = r.cam.phi; e.home.set(r.cam.t[0], r.cam.t[1], r.cam.t[2]); e.resetView(); e.sph = Object.assign({}, e.goal); e.target.copy(e.goalTarget); }
          /* la etiqueta se coloca sobre la parte, calculando su caja real */
          B.partes.forEach(p => {
            let pos = p.at; const part = SC.E.parts.get(p.id);
            if (part){
              const caja = new THREE.Box3();
              part.meshes.forEach(m => { if (!m.geometry) return; m.updateMatrixWorld();
                if (!m.geometry.boundingBox) m.geometry.computeBoundingBox();
                caja.union(m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld)); });
              if (!caja.isEmpty()){ const c = caja.getCenter(new THREE.Vector3());
                pos = [c.x, Math.min(caja.max.y + 0.3, 6.5), c.z]; }
            }
            if (r.etq && r.etq[p.id]) pos = r.etq[p.id];
            SC.E.addLabel(p.id, p.n, pos);
          });
          SC.E.setLabels(true);
        } catch(e){ console.warn('escena 3D', e); if (SC.E){ try { SC.E.dispose(); } catch(e2){} } SC.E = null; }
      }
      if (!SC.E) SC.stage.append(h('div',{class:'ph'},'Sin WebGL: usa la lista de elementos de abajo; cada uno tiene su ficha completa con clima, suelo y adaptaciones.'));
      SC.bio = St.bio;
    };
    SC.ficha = ficha;
    return SC;
  }
  function ficha(){
    const B = EC2_BIOMAS[St.bio], p = B.partes.find(x => x.id === St.sel);
    SC.panel.innerHTML = '';
    SC.panel.append(h('span',{class:'eyebrow eco'}, B.em + ' ' + B.n + ' · ' + B.sub));
    if (!p){
      SC.panel.append(h('p',{class:'small'},'Gira la escena y toca un elemento, o elige uno en la lista de abajo. Cada ficha explica qué factor abiótico explica su forma de vida.'),
        h('dl',{class:'eco2-kv'},
          h('dt',{},'Clima'), h('dd',{},B.clima),
          h('dt',{},'Altitud'), h('dd',{},B.altitud),
          h('dt',{},'Suelo'), h('dd',{},B.suelo)),
        h('p',{class:'small muted',style:'margin-top:8px'},B.d));
    } else {
      SC.panel.append(
        h('div',{class:'row',style:'gap:6px;align-items:baseline'}, h('h3',{style:'margin:0'},p.n), h('i',{class:'small muted'},p.sci)),
        h('span',{class:'eco2-tag'},p.rol),
        h('p',{style:'font-size:.88rem;margin:6px 0'},p.d),
        h('dl',{class:'eco2-kv'},
          h('dt',{},'Adaptación'), h('dd',{},p.adapt),
          h('dt',{},'Dato'), h('dd',{},p.dato)),
        h('div',{class:'stack'},
          Store.s.a11y.tts ? h('div',{class:'row',style:'margin-top:8px'}, TTS.btn(p.n + '. ' + p.d + ' Adaptación: ' + p.adapt, 'Escuchar la ficha')) : null,
          h('button',{class:'btn sm ghost',style:'margin-top:8px', onclick:()=>{ St.sel = null; ficha(); if (SC.E) SC.E.select(null); }},'Ver el ecosistema completo')));
      if (SC.E) SC.E.select(p.id);
    }
    /* lista accesible + progreso */
    const vistos = (Store.s.seen['eco2-' + St.bio] || []).length;
    SC.extra.innerHTML = '';
    const grid = h('div',{class:'eco2-grid'});
    B.partes.forEach(x => grid.append(h('button',{class:'eco2-el','aria-pressed': String(St.sel === x.id),
      onclick:()=>{ St.sel = x.id; Store.markSeen('eco2-' + St.bio, x.id); Store.log('elemento_ecosistema',{ecosistema:St.bio, elemento:x.id}); marcar(); ficha(); }},
      h('b',{},x.n), h('i',{},x.sci), h('span',{class:'eco2-tag'}, x.rol.split(' · ')[0]))));
    SC.extra.append(h('div',{class:'card stack'},
      h('span',{class:'eyebrow eco'},'Elementos de ' + (B.ar ? B.ar + ' ' : '') + B.n.toLowerCase()),
      h('p',{class:'small muted'},'Fichas abiertas en este ecosistema: ' + vistos + ' de ' + B.partes.length + '. Abre al menos 4 en dos ecosistemas distintos para completar la primera casilla del reto.'),
      grid));
    SC.bar.innerHTML = '';
    EC2_ORDEN.forEach(id => { const b = EC2_BIOMAS[id];
      SC.bar.append(h('button',{'aria-pressed': String(id === St.bio), onclick:()=>{
        if (id === St.bio) return; St.bio = id; St.sel = null; SC.montar(); ficha();
        Store.log('ecosistema',{recurso:'reto-ecosistemas', ecosistema:id}); }},
        h('span',{class:'em','aria-hidden':'true'}, b.em), h('span',{}, b.n, h('small',{}, b.sub)))); });
  }
  function marcar(){
    const ok = EC2_ORDEN.filter(id => (Store.s.seen['eco2-' + id] || []).length >= 4).length;
    if (ok >= 2) St.marcas.explora = true;
  }

  function secBiomas(){
    const S = escena();
    if (S.bio !== St.bio || !S.E) S.montar();
    if (S.E) S.E.active = true;
    ficha();
    return h('div',{class:'stack'},
      h('div',{class:'notice info'}, h('span',{}, h('b',{},'Primero explora. '),'Gira cada escena, toca sus elementos y descubre qué adaptación tiene cada especie. Después lee el clima, la altitud y el suelo: comprobarás que cada forma de vida responde a un factor abiótico concreto.')),
      S.wrap, secNav());
  }

  /* ---------- 2 · gradiente altitudinal ---------- */
  function perfilSVG(alt){
    const W = 820, H = 300, base = 250;
    const pts = [[0,0],[60,10],[130,180],[210,900],[280,2400],[340,3600],[390,4600],[430,5600],[470,4700],[520,3400],[580,2100],[650,1100],[730,500],[820,260]];
    const X = i => i, Y = m => base - (m/6300)*(base-18);
    let path = 'M0,' + H + ' L0,' + Y(0);
    pts.forEach(p => { path += ' L' + X(p[0]) + ',' + Y(p[1]); });
    path += ' L' + W + ',' + H + ' Z';
    const bandas = EC2_PISOS.map((p, i) => {
      const y1 = Y(p.max), y0 = Y(i ? EC2_PISOS[i-1].max : 0);
      const tono = ['#2E6B3E','#3B7A44','#4A8450','#57895B','#6B8F68','#7F9375','#A79C63','#B9B49B','#EFF2F6'][i];
      return '<rect x="0" y="' + y1.toFixed(1) + '" width="' + W + '" height="' + Math.max(1,(y0-y1)).toFixed(1) + '" fill="' + tono + '" opacity="0.5"/>';
    }).join('');
    const y = Y(alt);
    return '<svg class="eco2-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Perfil del Ecuador de oeste a este con la altitud seleccionada de ' + ec2Mil(alt) + ' metros">' +
      '<defs><clipPath id="eco2clip"><path d="' + path + '"/></clipPath></defs>' +
      '<g clip-path="url(#eco2clip)">' + bandas + '</g>' +
      '<path d="' + path + '" fill="none" stroke="var(--ink-3)" stroke-width="1.6"/>' +
      '<rect x="0" y="' + Y(0).toFixed(1) + '" width="120" height="' + (H - Y(0)).toFixed(1) + '" fill="#2A6C86" opacity="0.55"/>' +
      '<line x1="0" y1="' + y.toFixed(1) + '" x2="' + W + '" y2="' + y.toFixed(1) + '" stroke="var(--accent)" stroke-width="2.2" stroke-dasharray="7 4"/>' +
      '<circle cx="300" cy="' + y.toFixed(1) + '" r="7" fill="var(--accent)" stroke="var(--bg-2)" stroke-width="2.5"/>' +
      '<text x="8" y="' + Math.max(14, y-8).toFixed(1) + '" font-size="13" font-weight="700" fill="var(--ink)">' + ec2Mil(alt) + ' m · ' + ec2Dec(ec2Temp(alt),1) + ' °C</text>' +
      '<text x="8" y="' + (H-8) + '" font-size="11" fill="var(--ink-3)">Costa (oeste)</text>' +
      '<text x="' + (W-10) + '" y="' + (H-8) + '" font-size="11" text-anchor="end" fill="var(--ink-3)">Amazonía (este)</text>' +
      '<text x="' + (W/2) + '" y="16" font-size="11" text-anchor="middle" fill="var(--ink-3)">Corte transversal del Ecuador continental</text></svg>';
  }
  function secGradiente(){
    const p = ec2Piso(St.alt), box = h('div',{});
    const svg = h('div',{html: perfilSVG(St.alt)});
    const rango = h('input',{ type:'range', min:'0', max:'6000', step:'100', value:String(St.alt), 'aria-label':'Altitud en metros sobre el nivel del mar',
      oninput:(e)=>{ St.alt = +e.target.value; if (St.alt >= 3400) St.marcas.gradiente = true; pinta(); } });
    const salida = h('output',{}, ec2Mil(St.alt) + ' m');
    function pinta(){
      const q = ec2Piso(St.alt);
      salida.textContent = ec2Mil(St.alt) + ' m';
      svg.innerHTML = perfilSVG(St.alt);
      box.innerHTML = '';
      box.append(h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'}, 'A ' + ec2Mil(St.alt) + ' m s. n. m.'),
        h('h3',{style:'margin:0'}, q.n),
        h('div',{class:'eco2-read'},
          h('div',{}, h('b',{}, ec2Dec(ec2Temp(St.alt),1) + ' °C'), h('span',{},'temperatura media')),
          h('div',{}, h('b',{}, ec2Mil(St.alt) + ' m'), h('span',{},'altitud')),
          h('div',{}, h('b',{}, ec2Dec(100 - St.alt*0.0115, 0) + ' %'), h('span',{},'presión respecto al mar')),
          h('div',{}, h('b',{}, ec2Dec(1 + St.alt*0.00012, 2) + '×'), h('span',{},'radiación ultravioleta'))),
        h('dl',{class:'eco2-kv'},
          h('dt',{},'Plantas típicas'), h('dd',{}, q.plantas),
          h('dt',{},'Animales'), h('dd',{}, q.animales),
          h('dt',{},'Clave'), h('dd',{}, q.nota)),
        q.bio ? h('button',{class:'btn sm', onclick:()=>{ St.bio = q.bio; St.sel = null; St.sec = 0; render(); }}, 'Ver ' + EC2_BIOMAS[q.bio].n + ' en 3D →') : null));
    }
    pinta();
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Factores abióticos: mueve la altitud'),
        h('p',{class:'small'},'El Ecuador cabe en menos de 200 km de ancho, pero va de 0 a 6.263 m. Sube el control y observa cómo cambia la vida. La temperatura baja unos 0,55 °C cada 100 m: por eso subir 1.000 m se parece a alejarse 1.000 km del ecuador.'),
        h('div',{class:'eco2-sl'}, h('label',{for:'eco2-alt'},'Altitud (m s. n. m.)'), rango, salida),
        h('div',{class:'row'},
          h('button',{class:'btn sm', onclick:()=>{ St.alt = 0; rango.value = '0'; pinta(); }},'0 m · costa'),
          h('button',{class:'btn sm', onclick:()=>{ St.alt = 2800; rango.value = '2800'; pinta(); }},'2.800 m · Quito'),
          h('button',{class:'btn sm', onclick:()=>{ St.alt = 4000; rango.value = '4000'; St.marcas.gradiente = true; pinta(); }},'4.000 m · páramo'),
          h('button',{class:'btn sm', onclick:()=>{ St.alt = 6000; rango.value = '6000'; St.marcas.gradiente = true; pinta(); }},'6.000 m · nieve')),
        svg),
      box,
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Lo que cambia con la altitud'),
        h('ul',{class:'eco2-check'},
          h('li',{}, h('span',{class:'ck'},'1'), 'Menos temperatura: las reacciones químicas de la vida se hacen más lentas y el crecimiento se frena.'),
          h('li',{}, h('span',{class:'ck'},'2'), 'Menos presión: a 4.000 m hay cerca del 60 % del oxígeno disponible al nivel del mar.'),
          h('li',{}, h('span',{class:'ck'},'3'), 'Más radiación ultravioleta: de ahí los pelos blancos del frailejón y las hojas gruesas.'),
          h('li',{}, h('span',{class:'ck'},'4'), 'Oscilación diaria enorme: en el páramo puede helar de madrugada y hacer 20 °C al mediodía del mismo día.')),
        h('p',{class:'small muted'},'Por eso no existe "el clima del Ecuador": existen pisos climáticos, y cada uno tiene su propia comunidad de especies.')),
      secNav());
  }

  /* ---------- 3 · flujo de energía ---------- */
  function secEnergia(){
    const P = EC2_PIR[St.pir], max = P.v[0];
    const pir = h('div',{class:'eco2-pyr'});
    P.v.slice().reverse().forEach((v, i) => {
      const idx = 3 - i, frac = St.pirReal ? v/max : Math.pow(v/max, 1/3);
      const w = Math.max(St.pirReal ? 1 : 16, frac*100);
      pir.append(h('div',{class:'eco2-lvl', style:'width:' + w.toFixed(2) + '%',
        title: EC2_NIV[idx] + ': ' + ec2Cant(v) + ' ' + P.u},
        h('b',{}, 'N' + (idx+1)), w > 26 ? h('span',{}, ec2Cant(v)) : null));
    });
    const leyenda = h('div',{});
    P.v.forEach((v, i) => leyenda.append(h('div',{class:'eco2-bar'},
      h('span',{}, 'N' + (i+1) + ' · ' + EC2_NIV[i].replace(/ \(.*/,'')),
      h('span',{class:'tr'}, h('span',{class:'fl', style:'width:' + Math.max(1.5, Math.pow(v/max, 1/3)*100).toFixed(1) + '%'})),
      h('span',{class:'mono'}, ec2Cant(v)))));
    const efi = [];
    for (let i=1; i<4; i++) efi.push([EC2_NIV[i-1] + ' → ' + EC2_NIV[i], P.v[i]/P.v[i-1]*100]);
    const chips = h('div',{class:'row'});
    Object.entries(EC2_PIR).forEach(([k,x]) => chips.append(h('button',{class:'chip' + (St.pir===k?' picked':''), onclick:()=>{ St.pir = k; render(); }}, x.n)));
    const calcIn = h('input',{ type:'number', value:St.calc, min:'0', style:'width:130px', 'aria-label':'Energía que llega al nivel 4, en kilojulios',
      oninput:(e)=>{ St.calc = e.target.value; } });
    const calcFb = h('div',{class:'notice', style:'display:none'});
    const calcBtn = h('button',{class:'btn sm primary', onclick:()=>{
      const v = parseFloat(String(St.calc).replace(',','.'));
      calcFb.style.display = 'flex';
      if (!isFinite(v)) { calcFb.className = 'notice warn'; calcFb.textContent = 'Escribe un número en kilojulios.'; return; }
      if (Math.abs(v - 50) <= 12){ calcFb.className = 'notice ok'; St.calcOK = true; St.marcas.energia = true;
        calcFb.innerHTML = '<b>Correcto.</b> 50.000 → 5.000 → 500 → 50 kJ. Tres saltos del 10 % dejan la milésima parte: por eso casi nunca hay un quinto nivel trófico.'; }
      else { calcFb.className = 'notice warn';
        calcFb.innerHTML = '<b>Aún no.</b> Aplica el 10 % tres veces seguidas, no una sola: 50.000 → 5.000 (N2) → 500 (N3) → ? (N4). Lo que se pierde en cada paso se va como calor de la respiración y como partes no digeridas.'; }
    }},'Comprobar');
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Tres maneras de mirar lo mismo'),
        chips,
        h('h3',{style:'margin:4px 0 0'}, P.n), h('p',{class:'small'}, P.d),
        h('div',{class:'row'}, h('label',{class:'toggle'}, h('input',{type:'checkbox', checked:St.pirReal||null, onchange:()=>{ St.pirReal = !St.pirReal; render(); }}), ' Ver a escala real (proporción exacta)')),
        pir,
        h('p',{class:'small muted', style:'margin:2px 0 0'},'Unidades: ' + P.u + '. Cada nivel con su valor exacto:'),
        leyenda,
        h('p',{class:'small muted'}, St.pirReal
          ? 'Esta es la proporción verdadera: los niveles superiores casi desaparecen. Por eso se suele dibujar con escala comprimida.'
          : 'Las barras usan una escala comprimida (raíz cúbica) para que los niveles altos se vean. Activa "escala real" para comprobar lo pequeños que son de verdad.'),
        h('p',{class:'small muted'}, P.fuente)),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'La regla del 10 % y por qué no es exacta'),
        h('div',{}, efi.map(([n,v]) => h('div',{class:'eco2-bar'}, h('span',{}, n.replace(/ \(.*/,'')),
          h('span',{class:'tr'}, h('span',{class:'fl', style:'width:' + clamp(v*4,2,100).toFixed(1) + '%'})),
          h('span',{class:'mono'}, ec2Dec(v, 1) + ' %')))),
        h('p',{class:'small'},'La eficiencia real varía entre el 2 % y el 20 %. El 10 % es un promedio útil, no una ley. ¿A dónde va el resto? Cerca del 60 % se pierde como calor en la respiración celular, un 20 a 30 % sale en heces y orina, y otra parte simplemente no se consume.'),
        h('div',{class:'notice info'}, h('span',{},'La energía FLUYE en un solo sentido y sale del ecosistema como calor. La materia, en cambio, CIRCULA: los mismos átomos se reutilizan una y otra vez. Esa es la diferencia que más se confunde en el examen.'))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Calcula tú'),
        h('p',{},'En un páramo, el pajonal fija 50.000 kJ · m⁻² · año⁻¹. Aplicando la regla del 10 %, ¿cuánta energía llega al cuarto nivel (por ejemplo, al lobo de páramo que come al conejo que comió al ratón… )?'),
        h('div',{class:'row'}, calcIn, h('span',{class:'small muted'},'kJ · m⁻² · año⁻¹'), calcBtn),
        calcFb,
        h('p',{class:'small muted'},'De aquí sale la respuesta a una pregunta clásica: ¿por qué hay pocos depredadores tope? No porque sean "fuertes", sino porque la energía que sobra para ellos es mínima. Y por eso una dieta basada en plantas alimenta a más personas con la misma superficie.')),
      secNav());
  }

  /* ---------- 4 · ciclos de materia ---------- */
  function cicloSVG(C, actual){
    const W = 790, H = C.id === 'agua' ? 380 : 250;
    const R = {}; C.res.forEach(r => R[r.id] = r);
    const centro = r => [r.x + r.w/2, r.y + r.h/2];
    let flechas = '';
    C.pasos.forEach((p, i) => {
      const a = centro(R[p.de]), b = centro(R[p.a]);
      const dx = b[0]-a[0], dy = b[1]-a[1], L = Math.hypot(dx,dy) || 1;
      const off = 34, x1 = a[0] + dx/L*off, y1 = a[1] + dy/L*off, x2 = b[0] - dx/L*off, y2 = b[1] - dy/L*off;
      const on = actual === p.de;
      flechas += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) +
        '" stroke="' + (on ? 'var(--accent)' : 'var(--ink-3)') + '" stroke-width="' + (on ? 2.6 : 1.1) + '" opacity="' + (on ? 1 : 0.4) + '" marker-end="url(#eco2ar)"/>';
    });
    let cajas = '';
    C.res.forEach(r => {
      const on = actual === r.id;
      cajas += '<g><rect x="' + r.x + '" y="' + r.y + '" width="' + r.w + '" height="' + r.h + '" rx="10" fill="var(--bg-2)" stroke="' + (on ? 'var(--accent)' : 'var(--line)') + '" stroke-width="' + (on ? 3 : 1.4) + '"/>' +
        '<text x="' + (r.x + r.w/2) + '" y="' + (r.y + r.h/2 + 4) + '" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink)">' + esc(r.n) + '</text>' +
        (on ? '<circle cx="' + (r.x + r.w - 13) + '" cy="' + (r.y + 13) + '" r="7" fill="var(--accent)"/>' : '') + '</g>';
    });
    return '<svg class="eco2-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Diagrama del ' + esc(C.n) + '. Reservorio actual: ' + esc((R[actual]||{}).n || '') + '">' +
      '<defs><marker id="eco2ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink-3)"/></marker></defs>' +
      flechas + cajas + '</svg>';
  }
  function secCiclos(){
    const C = Object.assign({ id:St.ciclo }, EC2_CICLOS[St.ciclo]);
    if (!St.pos) St.pos = C.inicio;
    const R = {}; C.res.forEach(r => R[r.id] = r);
    const chips = h('div',{class:'row'});
    Object.entries(EC2_CICLOS).forEach(([k,x]) => chips.append(h('button',{class:'chip' + (St.ciclo===k?' picked':''),
      onclick:()=>{ St.ciclo = k; St.pos = x.inicio; St.ruta = []; render(); }}, x.n)));
    const opciones = C.pasos.filter(p => p.de === St.pos);
    const ops = h('div',{class:'stack'});
    opciones.forEach(p => ops.append(h('button',{class:'btn sm', style:'text-align:left', onclick:()=>{
      St.ruta.push({ p:p.p, t:p.t, de:R[p.de].n, a:R[p.a].n });
      St.pos = p.a;
      if (St.ruta.length >= 5) St.marcas.ciclo = true;
      Store.log('ciclo_paso',{ciclo:St.ciclo, proceso:p.p});
      render();
    }}, h('b',{}, p.p), h('span',{class:'small muted', style:'display:block'}, 'hacia ' + R[p.a].n))));
    const rel = h('ol',{class:'stack', style:'padding-left:18px;margin:0'});
    St.ruta.slice(-6).forEach(x => rel.append(h('li',{style:'font-size:.86rem;margin:4px 0'}, h('b',{}, x.p + ': '), x.t)));
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Sigue un átomo'), chips,
        h('p',{class:'small'}, C.intro),
        h('div',{html: cicloSVG(C, St.pos)}),
        h('div',{class:'notice info'}, h('span',{}, h('b',{}, 'Ahora ' + C.at + ' está en: ' + R[St.pos].n + '. '), R[St.pos].dato)),
        h('p',{style:'font-weight:600;margin:4px 0 0'},'¿Por qué proceso sale de aquí?'), ops,
        h('div',{class:'row'},
          h('button',{class:'btn sm ghost', onclick:()=>{ St.pos = C.inicio; St.ruta = []; render(); }},'Reiniciar el recorrido'),
          h('span',{class:'small muted'},'Pasos dados: ' + St.ruta.length + (St.ruta.length >= 5 ? ' ✓' : ' (5 para completar la casilla)')))),
      St.ruta.length ? h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Tu recorrido'), rel,
        St.ruta.length >= 5 ? h('div',{class:'notice ok'},'El átomo no se gastó ni se perdió: cambió de reservorio una y otra vez. Eso es circular. Compáralo con la energía de la sección 3, que se pierde como calor y hay que reponerla cada día con el sol.') : null) : null,
      secNav());
  }

  /* ---------- 5 · servicios y amenazas ---------- */
  function secAmenazas(){
    const A = EC2_AMENAZAS.find(x => x.id === St.amen);
    const chips = h('div',{class:'row'});
    EC2_AMENAZAS.forEach(x => chips.append(h('button',{class:'chip' + (St.amen===x.id?' picked':''), onclick:()=>{ St.amen = x.id; render(); }}, x.em + ' ' + x.n)));
    const fb = St.amenFb[A.id];
    const meds = h('div',{class:'stack'});
    A.medidas.forEach((m, i) => meds.append(h('button',{class:'opt' + (fb && fb.i === i ? (m.ok ? ' ok' : ' bad') : ''), onclick:()=>{
      St.amenFb[A.id] = { i, ok:m.ok, fb:m.fb };
      if (m.ok && Object.values(St.amenFb).filter(x => x.ok).length >= 2) St.marcas.medida = true;
      Store.log('respuesta',{pregunta:'medida-' + A.id, opcion:i, correcto:m.ok});
      render();
    }}, h('span',{class:'k'}, String.fromCharCode(65+i)), m.t)));
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Servicios ecosistémicos: lo que estos ecosistemas nos dan gratis'),
        h('div',{class:'grid g3'}, EC2_SERVICIOS.map(s => h('div',{class:'tile'}, h('div',{style:'font-size:1.4rem'}, s.em), h('b',{}, s.n), h('p',{class:'small muted'}, s.d))))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Amenazas reales, con datos'), chips,
        h('h3',{style:'margin:4px 0 0'}, A.em + ' ' + A.n + ' · ' + A.bio),
        h('p',{class:'small'}, A.causa),
        h('div',{}, A.datos.map(([n,v,w]) => h('div',{class:'eco2-bar'}, h('span',{}, n),
          h('span',{class:'tr'}, h('span',{class:'fl', style:'width:' + w + '%'})), h('span',{class:'mono'}, v)))),
        h('p',{class:'small muted'}, A.fuente),
        h('div',{class:'notice warn'}, A.efecto)),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'¿Qué medida funciona de verdad?'), meds,
        fb ? h('div',{class:'notice ' + (fb.ok ? 'ok' : 'warn')}, h('span',{}, h('b',{}, fb.ok ? 'Sí. ' : 'No es la mejor. '), fb.fb)) : null,
        h('p',{class:'small muted'},'Acierta la medida en al menos dos amenazas distintas para completar esa casilla del reto.')),
      secNav());
  }

  /* ---------- 6 · reto final ---------- */
  const EC2_QZ = [
    { q:'En la Amazonía el suelo es pobre y, sin embargo, el bosque es exuberante. ¿Cómo se explica?',
      ops:['El suelo amazónico es en realidad muy fértil: por eso crecen árboles de 50 m',
           'Los nutrientes están en la biomasa viva y en la hojarasca, y se reciclan en semanas gracias a descomponedores y micorrizas',
           'Los árboles toman los nutrientes directamente del aire por las hojas',
           'La lluvia constante trae los nutrientes disueltos desde los Andes'],
      ok:1, fb:'El ciclo es rapidísimo y casi cerrado: la hoja cae, se descompone en semanas y la micorriza devuelve el nutriente a la raíz antes de que la lluvia lo lave. Por eso, al talar, el sistema se rompe y el suelo solo sirve 3 a 5 años.',
      wrong:['Es justo al revés: los oxisoles amazónicos están entre los suelos más lavados y ácidos del planeta.',
             'Las hojas fijan carbono del aire, pero el nitrógeno, el fósforo y el potasio entran por la raíz desde el suelo.',
             'La lluvia lava nutrientes, no los aporta. El aporte andino llega a las llanuras inundables, no a todo el bosque.'] },
    { q:'El mangle negro tiene neumatóforos (raíces que salen del fango como lápices). ¿Qué factor abiótico explica esa forma?',
      ops:['La salinidad del agua','La falta de oxígeno en el suelo fangoso','La fuerza del oleaje','La radiación ultravioleta'],
      ok:1, fb:'El fango del manglar es anóxico: no hay oxígeno para la respiración celular de las raíces. Los neumatóforos tienen lenticelas por donde entra aire cuando baja la marea.',
      wrong:['La sal es un problema real, pero el mangle la resuelve con glándulas excretoras en las hojas, no con los neumatóforos.',
             'Contra el oleaje lo que sirve son las raíces zancudas del mangle rojo, que anclan y disipan energía.',
             'La radiación no es un factor limitante a nivel del mar; en el páramo sí lo es.'] },
    { q:'Un pajonal fija 60.000 kJ · m⁻² · año⁻¹. ¿Cuál es el orden de magnitud de la energía disponible para un consumidor terciario?',
      ops:['Unos 6.000 kJ','Unos 600 kJ','Unos 60 kJ','La misma, porque la energía no se destruye'],
      ok:2, fb:'Tres transferencias al 10 %: 60.000 → 6.000 → 600 → 60 kJ. Esa escasez, y no la fuerza de los depredadores, es la que limita el número de niveles tróficos a cuatro o cinco.',
      wrong:['Eso sería aplicar el 10 % una sola vez: llegarías apenas al segundo nivel.',
             'Ese es el tercer nivel (consumidores secundarios). Falta un salto más.',
             'La energía no se destruye, pero sí se degrada: la mayor parte sale del ecosistema como calor de la respiración y ya no sirve para hacer biomasa.'] },
    { q:'¿Cuál de estas afirmaciones distingue correctamente el flujo de energía de los ciclos de materia?',
      ops:['Los dos circulan: por eso el ecosistema se sostiene solo',
           'La energía circula y la materia fluye hacia afuera',
           'La energía entra por los productores, fluye en un solo sentido y sale como calor; los mismos átomos, en cambio, se usan una y otra vez',
           'La materia y la energía se agotan al mismo ritmo en cada nivel trófico'],
      ok:2, fb:'Por eso un ecosistema necesita al sol todos los días, pero no necesita que le lleguen átomos nuevos de carbono: los de tu respiración de hoy estuvieron antes en una hoja, en un dinosaurio o en el océano.',
      wrong:['Si la energía circulara no haría falta el sol. Un ecosistema sin luz se apaga en poco tiempo.',
             'Está invertido: es la materia la que circula y la energía la que fluye y se disipa.',
             'La materia no se agota: se recicla. Lo que disminuye nivel a nivel es la energía útil.'] },
    { q:'En el ciclo del nitrógeno, ¿por qué las plantas no pueden usar directamente el N₂ del aire, que es el 78 % de la atmósfera?',
      ops:['Porque el N₂ no llega hasta las raíces','Porque el triple enlace del N₂ es muy difícil de romper y solo ciertas bacterias tienen la enzima nitrogenasa','Porque el N₂ es tóxico para las plantas','Porque las plantas solo absorben gases por las hojas'],
      ok:1, fb:'La fijación depende de bacterias como Rhizobium, de los rayos y del proceso industrial Haber-Bosch. Por eso sembrar leguminosas (fréjol, chocho) enriquece el suelo: llevan esas bacterias en sus nódulos.',
      wrong:['El N₂ está también en los poros del suelo; el problema no es el acceso, sino la química.',
             'El N₂ es inerte, no tóxico: precisamente por inerte resulta inutilizable.',
             'Las plantas sí absorben CO₂ por las hojas, pero eso no cambia la dificultad de romper el triple enlace.'] },
    { q:'Sobre las camaroneras y el manglar, ¿qué consecuencia ecológica es la mejor justificación para conservarlo?',
      ops:['El manglar es bonito y atrae turismo',
           'Sin manglar se pierde la zona de cría de más del 70 % de las especies pesqueras y la barrera natural de la costa: cae la pesca y sube el daño por marejadas',
           'El manglar produce la mayor parte del oxígeno del país',
           'Las camaroneras no afectan al manglar porque también son ecosistemas acuáticos'],
      ok:1, fb:'Es un argumento ecológico y económico a la vez: el manglar sostiene la pesca artesanal de la que viven miles de familias y evita daños costeros que cuestan millones. Por eso funcionan los acuerdos de uso sustentable con las comunidades.',
      wrong:['El valor cultural y turístico existe, pero no es el argumento más fuerte frente a una decisión económica.',
             'La mayor parte del oxígeno del planeta la produce el fitoplancton marino, no el manglar.',
             'Una piscina de camarón es un monocultivo con una sola especie y aporte de alimento externo: no cumple ninguna de las funciones del manglar.'] }
  ];
  function secReto(){
    const marcas = [ ['explora','Exploraste al menos 4 elementos en dos ecosistemas distintos'],
      ['gradiente','Llevaste el gradiente altitudinal por encima de los 3.400 m'],
      ['energia','Calculaste bien la energía del cuarto nivel trófico'],
      ['ciclo','Seguiste un átomo por 5 pasos de un ciclo'],
      ['medida','Acertaste la medida eficaz en dos amenazas'] ];
    const lista = h('ul',{class:'eco2-check'});
    marcas.forEach(([k,t]) => lista.append(h('li',{class: St.marcas[k] ? 'ok' : ''}, h('span',{class:'ck','aria-hidden':'true'}, St.marcas[k] ? '✓' : ''), h('span',{}, t))));
    const qs = h('div',{class:'stack'});
    EC2_QZ.forEach((q, i) => qs.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Pregunta ' + (i+1) + ' de 6'),
      quizBlock(q, (att) => {
        if (St.quiz[i]) return;
        St.quiz[i] = true; St.intentos += (att - 1);
        const n = St.quiz.filter(Boolean).length;
        if (n === 6) completar();
        else toast('Van ' + n + ' de 6 preguntas del reto.');
      }))));
    function completar(){
      const extras = Object.values(St.marcas).filter(Boolean).length;
      const min = Math.max(1, Math.round((Date.now() - St.start)/60000));
      Store.completeActivity('reto-ecosistemas', { score:'6/6', attempts:St.intentos, duracionMin:min, explorados:extras });
      estado.className = 'notice ok'; estado.textContent = 'Reto resuelto ✓ · ecosistemas del Ecuador';
      toast('Actividad completada: ecosistemas del Ecuador.');
    }
    const listo = St.quiz.filter(Boolean).length === 6;
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Antes de responder'),
        h('p',{},'Lo que hiciste hasta aquí:'), lista,
        h('p',{class:'small muted'},'Puedes responder aunque falte alguna casilla, pero cada una es una pista directa para las preguntas.')),
      qs,
      listo ? h('div',{class:'notice ok'},'Las 6 preguntas resueltas. Continúa con la dinámica de poblaciones: ') : null,
      h('div',{class:'row'}, h('a',{class:'btn sm', href:'#/explorar/poblaciones'},'Ir a dinámica de poblaciones →'),
        h('a',{class:'btn sm ghost', href:'#/cn/eco/red-trofica'},'Repasar la red trófica (nivel EGB)')),
      secNav());
  }

  function secNav(){
    return h('div',{class:'row', style:'justify-content:space-between;margin-top:6px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec = Math.max(0, St.sec-1); render(); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec = Math.min(SEC.length-1, St.sec+1); render(); }},'Siguiente →'));
  }
  function render(){
    nav.innerHTML = '';
    SEC.forEach((s, i) => nav.append(h('button',{'aria-current': String(i===St.sec), onclick:()=>{ St.sec = i; render(); }}, s.n)));
    if (SC && SC.E) SC.E.active = (St.sec === 0);
    body.innerHTML = '';
    body.append([secBiomas, secGradiente, secEnergia, secCiclos, secAmenazas, secReto][St.sec]());
    Store.log('seccion',{recurso:'reto-ecosistemas', seccion:SEC[St.sec].id});
  }
  marcar(); render();
  return { unmount(){ if (SC && SC.E){ try { SC.E.dispose(); } catch(e){} SC = null; } } };
});

/* =====================================================================
   RUTA B · #/explorar/poblaciones · DINÁMICA DE POBLACIONES
   ===================================================================== */

/* --- gráfico reutilizable: devuelve el contenedor y una función de dibujo --- */
function ec2Grafico(alto){
  const cv = h('canvas',{class:'eco2-canvas', style: alto ? 'height:' + alto + 'px' : null, role:'img'});
  const box = h('div',{style:'position:relative'}, cv);
  let ultimo = null;
  const draw = (opts) => { ultimo = opts; try { lineChart(cv, opts); } catch(e){ console.warn('gráfico', e); } };
  box._draw = (opts) => { setTimeout(()=>draw(opts), 0); };
  box._redraw = (opts) => draw(opts);
  return box;
}
function ec2Sl(etiqueta, min, max, step, valor, unidad, onIn){
  const out = h('output',{}, ec2Dec(valor, step < 1 ? 2 : 0) + (unidad ? ' ' + unidad : ''));
  const inp = h('input',{ type:'range', min:String(min), max:String(max), step:String(step), value:String(valor), 'aria-label':etiqueta,
    oninput:(e)=>{ const v = parseFloat(e.target.value); out.textContent = ec2Dec(v, step < 1 ? 2 : 0) + (unidad ? ' ' + unidad : ''); onIn(v); } });
  return h('div',{class:'eco2-sl'}, h('label',{}, etiqueta), inp, out);
}

/* --- escena ilustrada junto al gráfico: la población "se ve" crecer o estabilizarse (v1.7) ---
   paneles: [{ n, pts:[{x,y}], unidad (individuos por icono), K (opcional), icono:'cabra'|'tortuga' }] */
const EC2_ICONO = {
  cabra:'<path d="M-7 -1 C-7 -5 4 -6 6 -3 L9 -6 L10 -4 L8 -1 C8 1 6 2 5 2 L5 6 M-5 2 L-5 6 M-2 2 L-2 6 M3 2 L3 6" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  tortuga:'<path d="M-8 2 C-8 -6 6 -6 7 2 Z" fill="currentColor"/><path d="M6 0 C9 -2 11 -1 11 1 C10 3 8 3 6 2 Z M-6 2 v3 M-2 2 v3 M3 2 v3" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M-5 -2 h9 M-1 -5 v6" stroke="var(--bg-3)" stroke-width=".8" opacity=".6"/>'
};
function ec2Prado(paneles, o){
  const c = Object.assign({ dur:6, alto:170, xmax:60, etqT:'año' }, o||{});
  const n = paneles.length, estrecho = (window.innerWidth || 1000) < 620, W = estrecho ? 360 : 640, H = c.alto, cols = estrecho ? 1 : n, pw = (W - 12*(cols+1))/cols, cap = 150, HT = estrecho ? H*n : H;
  const R = Kit.rng(5), sitios = [];
  for (let i=0; i<cap; i++) sitios.push([0.06 + 0.88*R(), 0.36 + 0.5*Math.pow(R(), 0.8)]);
  sitios.sort((a, b) => a[1] - b[1]);
  let svg = `<svg class="eco2-svg" style="max-width:780px" viewBox="0 0 ${W} ${HT}" role="img" aria-label="${esc('Ilustración: ' + paneles.map(p => p.n + ', ' + ec2Mil(p.pts[p.pts.length-1].y) + ' individuos al final').join('; ') + '. Cada icono representa ' + ec2Mil(paneles[0].unidad) + ' individuos.')}">`;
  svg += `<defs><linearGradient id="eco2Pr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FBF5A"/><stop offset="1" stop-color="#5E8E3A"/></linearGradient><linearGradient id="eco2Ci" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E9BD0" stop-opacity=".3"/><stop offset="1" stop-color="#9CC7E8" stop-opacity=".05"/></linearGradient></defs>`;
  paneles.forEach((p, k) => { const x = estrecho ? 12 : 12 + k*(pw + 12), yo = estrecho ? k*H : 0;
    svg += `<g transform="translate(${x.toFixed(1)},${yo})"><rect x="0" y="8" width="${pw.toFixed(1)}" height="${H-16}" rx="12" fill="url(#eco2Ci)" stroke="var(--line)"/>`
      + `<path d="M0 ${H*0.3} C${pw*0.3} ${H*0.26} ${pw*0.7} ${H*0.33} ${pw} ${H*0.28} V${H-20} a12 12 0 0 1 -12 12 H12 a12 12 0 0 1 -12 -12 Z" fill="url(#eco2Pr)" data-pasto="${k}"/>`
      + `<text x="12" y="27" font-size="12" font-weight="700" fill="var(--ink)">${esc(p.n)}</text>`
      + `<text x="12" y="43" font-size="11" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)" data-cuenta="${k}"></text>`
      + `<g data-rebano="${k}" style="color:${p.col || '#F2EEE4'}">` + sitios.map(([u, v]) => `<g transform="translate(${(u*pw).toFixed(1)},${(v*H).toFixed(1)}) scale(${(0.75 + v*0.5).toFixed(2)})" style="display:none">${EC2_ICONO[p.icono || 'cabra']}</g>`).join('') + `</g>`
      + `<text x="${(pw/2).toFixed(1)}" y="${H-16}" font-size="11" font-weight="700" text-anchor="middle" fill="#FFFFFF" style="paint-order:stroke" stroke="#2E4A22" stroke-width="3.5" data-lleno="${k}"></text></g>`; });
  svg += `</svg>`;
  const box = h('div',{html:svg}), el = box.firstChild;
  const valor = (pts, t) => { if (t <= pts[0].x) return pts[0].y; for (let i=1; i<pts.length; i++) if (pts[i].x >= t){ const a = pts[i-1], b = pts[i], f = (t - a.x)/((b.x - a.x) || 1); return a.y + (b.y - a.y)*f; } return pts[pts.length-1].y; };
  function pinta(t){
    paneles.forEach((p, k) => {
      const N = valor(p.pts, t), iconos = Math.round(N/p.unidad), vis = Math.min(cap, iconos);
      const hijos = el.querySelector('[data-rebano="' + k + '"]').children;
      for (let i=0; i<hijos.length; i++) hijos[i].style.display = i < vis ? '' : 'none';
      el.querySelector('[data-cuenta="' + k + '"]').textContent = c.etqT + ' ' + ec2Dec(t, 0) + ' · N = ' + ec2Mil(N) + ' · 1 icono = ' + ec2Mil(p.unidad);
      const sat = p.K ? clamp(N/(p.K*1.6), 0, 1) : clamp(iconos/cap, 0, 1);
      el.querySelector('[data-pasto="' + k + '"]').setAttribute('opacity', (1 - 0.55*Math.max(0, sat - 0.5)*2).toFixed(2));
      el.querySelector('[data-lleno="' + k + '"]').textContent = iconos > cap ? 'sin espacio ni alimento: ya no cabe en la isla' : (p.K && N > p.K*0.92 ? 'estable cerca de K: nacimientos ≈ muertes' : '');
    });
  }
  const mov = (typeof motionOK === 'function' ? motionOK() : true);
  if (!mov) pinta(c.xmax);
  else { let t0 = null; const paso = (ts) => { if (!el.isConnected) return; if (t0 == null) t0 = ts; const f = Math.min(1, (ts - t0)/(c.dur*1000)); pinta(f*c.xmax); if (f < 1) requestAnimationFrame(paso); };
    pinta(0); requestAnimationFrame(paso); }
  return box;
}

/* --- tablas de vida reales (por cada 1.000 nacidos) --- */
const EC2_TABLAS = {
  humano:{ n:'Ser humano (Ecuador)', tipo:'Tipo I', col:'--accent', maxv:95,
    d:'Esperanza de vida al nacer de unos 77 años. La mortalidad se concentra al final de la vida: sobreviven casi todos los jóvenes.',
    est:'Pocas crías, mucho cuidado parental, madurez tardía. Estrategia K.',
    x:[0,1,10,20,40,60,70,80,90,95], nx:[1000,988,984,978,960,905,830,650,300,90] },
  gaviota:{ n:'Gaviota de Galápagos', tipo:'Tipo II', col:'--warn', maxv:22,
    d:'La probabilidad de morir es casi la misma a cualquier edad: depredación, tormentas y accidentes no distinguen entre jóvenes y adultos.',
    est:'Mortalidad constante; la curva es una recta en escala logarítmica.',
    x:[0,2,4,6,9,12,15,18,22], nx:[1000,640,410,260,135,70,36,18,7] },
  tortuga:{ n:'Tortuga gigante de Galápagos', tipo:'Tipo III', col:'--eco', maxv:150,
    d:'De cada 1.000 huevos, muy pocos llegan al año: ratas, gatos y hormigas se comen huevos y neonatos. Quien pasa esa barrera puede vivir más de un siglo.',
    est:'Muchísimas crías, ningún cuidado parental, madurez a los 20 o 25 años. Estrategia r en el inicio y longevidad extrema después.',
    x:[0,1,5,10,25,50,75,100,150], nx:[1000,55,44,40,36,32,27,19,4] }
};

route('/explorar/poblaciones', (view) => {
  view.classList.add('wide');
  const SEC = [
    { id:'crecimiento', n:'1 · Exponencial y logístico' },
    { id:'depredacion', n:'2 · Depredador y presa' },
    { id:'competencia', n:'3 · Competencia y nicho' },
    { id:'supervivencia',n:'4 · Tablas de vida' },
    { id:'caso',        n:'5 · Caso real: Española' },
    { id:'reto',        n:'6 · Reto final' }
  ];
  const St = { sec:0,
    cre:{ b:0.55, d:0.15, K:1000, N0:20 },
    lv:{ a:0.9, b:0.022, c:0.28, m:0.45, pulso:false },
    comp:{ dif:0.4, K1:1000, K2:900 },
    tab:'tortuga', log:true,
    caso:{ cabras:false, cria:false, ratas:false, adultos:false },
    quiz:[false,false,false,false,false], intentos:0,
    marcas:{ K:false, desfase:false, nicho:false, curva:false, manejo:false },
    start:Date.now() };
  const hecho0 = !!(Store.s.activities['reto-poblaciones'] || {}).done;

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{}, h('span',{class:'eyebrow eco'},'Biología · Bachillerato · Unidades 7 y 8 · Dinámica de poblaciones'),
      h('h1',{},'Dinámica de poblaciones: por qué ninguna crece para siempre'),
      h('p',{},'Simuladores con los modelos que se usan de verdad en ecología: crecimiento exponencial y logístico, Lotka-Volterra de depredación y de competencia, tablas de vida y un caso real de manejo en Galápagos.')),
    h('span',{class:'pill eco'},'+130 XP · 35–45 min')));

  const estado = h('div',{class: hecho0 ? 'notice ok' : 'notice'}, hecho0
    ? 'Reto resuelto ✓ · vuelve cuando quieras a experimentar con los simuladores.'
    : 'Pendiente: experimenta con los cuatro simuladores y resuelve las 5 preguntas de la sección 6.');
  view.append(purposeBanner({
    proposito:'Explicar con modelos cuantitativos por qué una población deja de crecer, por qué depredador y presa oscilan con desfase y por qué dos especies muy parecidas no pueden coexistir indefinidamente.',
    observa:['Qué le pasa a la curva logística exactamente en N = K/2 y en N = K','Cuál de las dos curvas del modelo depredador-presa alcanza su pico primero y por qué','Cuánta diferencia de nicho hace falta para que dos competidores coexistan'],
    reto:'Encuentra la medida de manejo que salva a la tortuga de Española y resuelve las 5 preguntas finales.',
    statusEl: estado }));

  const nav = h('nav',{class:'eco2-nav','aria-label':'Secciones del recurso'});
  const body = h('div',{class:'stack'});
  view.append(nav, body);

  /* ---------- 1 · exponencial vs logístico ---------- */
  function simCrecimiento(p){
    const dt = 0.25, pasos = Math.round(60/dt), r = p.b - p.d;
    const ex = [{x:0, y:p.N0}], lo = [{x:0, y:p.N0}];
    let Ne = p.N0, Nl = p.N0;
    for (let i=1; i<=pasos; i++){
      Ne = Math.max(0, Ne + r*Ne*dt);
      Nl = Math.max(0, Nl + r*Nl*(1 - Nl/p.K)*dt);
      if (i % 2 === 0){ ex.push({x:i*dt, y:Math.min(Ne, p.K*4)}); lo.push({x:i*dt, y:Nl}); }
    }
    return { ex, lo, r };
  }
  function secCrecimiento(){
    const p = St.cre, g = ec2Grafico(280), lect = h('div',{class:'eco2-read'}), notas = h('div',{}), escena = h('div',{});
    let tEsc = null;
    function pinta(){
      const s = simCrecimiento(p);
      /* la escena se vuelve a animar cuando el estudiante deja de mover los controles */
      clearTimeout(tEsc); tEsc = setTimeout(() => { escena.innerHTML = ''; const u = Math.max(1, p.K/50);
        escena.append(ec2Prado([{ n:'Exponencial: recursos ilimitados', pts:s.ex, unidad:u }, { n:'Logístico: con capacidad de carga K', pts:s.lo, unidad:u, K:p.K }])); }, 250);
      g._redraw({ series:[
          { pts:s.ex, color:ec2Col('--bad'), label:'Exponencial' },
          { pts:s.lo, color:ec2Col('--eco'), label:'Logístico' },
          { pts:[{x:0,y:p.K},{x:60,y:p.K}], color:ec2Col('--ink-3'), label:'K' } ],
        xlabel:'tiempo (años)', ylabel:'individuos (N)', ymax:p.K*1.6, xmax:60,
        yfmt:v=>ec2Mil(v), xfmt:v=>ec2Dec(v,0) });
      const t2 = s.r > 0 ? Math.log(2)/s.r : Infinity;
      const tInf = s.r > 0 ? Math.log((p.K - p.N0)/p.N0)/s.r : Infinity;
      lect.innerHTML = '';
      lect.append(
        h('div',{}, h('b',{}, (s.r>=0?'+':'') + ec2Dec(s.r,2)), h('span',{},'r = b − d (per cápita)')),
        h('div',{}, h('b',{}, isFinite(t2) && t2>0 ? ec2Dec(t2,1) + ' años' : '—'), h('span',{},'tiempo de duplicación')),
        h('div',{}, h('b',{}, ec2Mil(p.K/2)), h('span',{},'K/2 · crecimiento máximo')),
        h('div',{}, h('b',{}, isFinite(tInf) && tInf>0 ? ec2Dec(tInf,1) + ' años' : '—'), h('span',{},'llegada a K/2 (inflexión)')),
        h('div',{}, h('b',{}, ec2Mil(s.ex[s.ex.length-1].y)), h('span',{},'N exponencial a los 60 años')),
        h('div',{}, h('b',{}, ec2Mil(s.lo[s.lo.length-1].y)), h('span',{},'N logístico a los 60 años')));
      notas.innerHTML = '';
      if (s.r <= 0) notas.append(h('div',{class:'notice bad'},'Con la mortalidad por encima de la natalidad, r es negativo y la población se extingue: las dos curvas caen. Súbele la natalidad para ver crecimiento.'));
      else if (p.N0 > p.K) notas.append(h('div',{class:'notice warn'},'Empezaste por encima de la capacidad de carga: la curva logística BAJA hasta K. El modelo no solo frena el crecimiento, también corrige el exceso (a costa de mortalidad).'));
      else notas.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},'Fíjate en K/2. '),'La curva logística crece más rápido justo en la mitad de la capacidad de carga: allí hay muchos individuos reproduciéndose y todavía sobran recursos. Después, la resistencia ambiental (comida, espacio, enfermedades) frena el crecimiento hasta que las natalidades igualan a las mortalidades en N = K.')));
    }
    g._draw({ series:[{pts:[{x:0,y:0}], color:ec2Col('--eco')}], xlabel:'tiempo (años)', ylabel:'N' });
    setTimeout(pinta, 10);
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Simulador · mueve los controles antes de leer'),
        h('p',{class:'small'},'dN/dt = r · N para el modelo exponencial y dN/dt = r · N · (K − N)/K para el logístico. El segundo término, (K − N)/K, es la resistencia ambiental: vale casi 1 cuando la población es pequeña y 0 cuando N llega a K.'),
        ec2Sl('Natalidad b (crías por individuo y año)', 0, 1.2, 0.05, p.b, '', v => { p.b = v; pinta(); }),
        ec2Sl('Mortalidad d (muertes por individuo y año)', 0, 1.2, 0.05, p.d, '', v => { p.d = v; pinta(); }),
        ec2Sl('Capacidad de carga K', 200, 3000, 100, p.K, 'ind.', v => { p.K = v; St.marcas.K = true; pinta(); }),
        ec2Sl('Población inicial N₀', 5, 2000, 5, p.N0, 'ind.', v => { p.N0 = v; pinta(); }),
        escena, g, lect, notas,
        h('div',{class:'eco2-leg'},
          h('span',{}, h('i',{style:'background:' + ec2Col('--bad')}), 'Exponencial (recursos ilimitados)'),
          h('span',{}, h('i',{style:'background:' + ec2Col('--eco')}), 'Logístico (con capacidad de carga)'),
          h('span',{}, h('i',{style:'background:' + ec2Col('--ink-3')}), 'K'))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'¿Cuándo sirve cada modelo?'),
        h('div',{class:'grid g2'},
          h('div',{class:'tile'}, h('b',{},'Exponencial (curva en J)'), h('p',{class:'small muted'},'Solo es realista al inicio de una colonización o en un cultivo de bacterias recién sembrado. En Galápagos, las cabras introducidas en Santiago crecieron así hasta llegar a más de 79.000 y arrasar la vegetación.')),
          h('div',{class:'tile'}, h('b',{},'Logístico (curva en S)'), h('p',{class:'small muted'},'Aparece en poblaciones reales con recursos limitados. K no es un número fijo: baja si hay sequía y sube si mejora el hábitat. Al erradicar las cabras, K para las tortugas volvió a subir.'))),
        h('p',{class:'small'}, h('b',{},'Consecuencia para el manejo: '),'una población mantenida en K/2 es la que más produce por año. De ahí sale el concepto de rendimiento máximo sostenible de la pesca… y también el error de aplicarlo mal, porque si K/2 se estima de más, la población colapsa.')),
      secNav());
  }

  /* ---------- 2 · depredador-presa ---------- */
  function simLV(p){
    const dt = 0.005, T = 60, n = Math.round(T/dt);
    let P = 40, D = 9; const pre = [], dep = [];
    for (let i=0; i<=n; i++){
      const t = i*dt;
      if (p.pulso && Math.abs(t - 20) < dt/2) P += 45;
      const dP = p.a*P - p.b*P*D, dD = p.c*p.b*P*D - p.m*D;
      P = Math.max(0.01, P + dP*dt); D = Math.max(0.01, D + dD*dt);
      if (i % 20 === 0){ pre.push({x:t, y:P}); dep.push({x:t, y:D}); }
    }
    const pico = (arr, desde) => { let best = null;
      for (let i=1; i<arr.length-1; i++){ if (arr[i].x < desde) continue;
        if (arr[i].y > arr[i-1].y && arr[i].y >= arr[i+1].y){ best = arr[i]; break; } }
      return best; };
    const pp = pico(pre, 5), pd = pp ? pico(dep, pp.x) : null;
    return { pre, dep, pp, pd, Peq:p.m/(p.c*p.b), Deq:p.a/p.b };
  }
  function secDepredacion(){
    const p = St.lv, g = ec2Grafico(290), lect = h('div',{class:'eco2-read'}), nota = h('div',{});
    function pinta(){
      const s = simLV(p);
      g._redraw({ series:[
          { pts:s.pre, color:ec2Col('--eco'), label:'Presa (conejo)' },
          { pts:s.dep, color:ec2Col('--bad'), label:'Depredador (lobo de páramo)' } ],
        xlabel:'tiempo (años)', ylabel:'individuos', xmax:60, yfmt:v=>ec2Dec(v,0) });
      const lag = (s.pp && s.pd) ? s.pd.x - s.pp.x : null;
      lect.innerHTML = '';
      lect.append(
        h('div',{}, h('b',{}, ec2Dec(s.Peq,0)), h('span',{},'presas en equilibrio')),
        h('div',{}, h('b',{}, ec2Dec(s.Deq,0)), h('span',{},'depredadores en equilibrio')),
        h('div',{}, h('b',{}, lag != null ? ec2Dec(lag,1) + ' años' : '—'), h('span',{},'desfase entre picos')),
        h('div',{}, h('b',{}, s.pp ? ec2Dec(s.pp.y,0) : '—'), h('span',{},'pico de presas')));
      nota.innerHTML = '';
      nota.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},'El desfase, explicado. '),
        'El depredador no puede aumentar en el mismo instante que su presa: primero tiene que comer, engordar, reproducirse y criar. Ese retraso biológico es el desfase (aquí, ' +
        (lag != null ? ec2Dec(lag,1) : '—') + ' años). Cuando por fin hay muchos depredadores, ya quedan pocas presas: entonces los depredadores pasan hambre y caen. Al caer ellos, las presas se recuperan y el ciclo vuelve a empezar. Por eso el pico de depredadores va SIEMPRE un poco después del pico de presas, nunca antes ni a la vez.')));
      if (p.pulso) nota.append(h('div',{class:'notice warn'},'Soltaste 45 presas en el año 20. Observa: cambia la amplitud del ciclo, pero el periodo y el orden de los picos no cambian. El sistema no vuelve a su ciclo anterior: los modelos de Lotka-Volterra guardan memoria de la perturbación.'));
    }
    g._draw({ series:[{pts:[{x:0,y:0}], color:ec2Col('--eco')}], xlabel:'tiempo (años)', ylabel:'individuos' });
    setTimeout(pinta, 10);
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Simulador de Lotka-Volterra'),
        h('p',{class:'small'},'dPresa/dt = a·P − b·P·D  |  dDepredador/dt = c·b·P·D − m·D. El término P·D representa los encuentros: cuantos más haya de ambos, más capturas.'),
        ec2Sl('a · natalidad de la presa', 0.3, 1.6, 0.05, p.a, '', v => { p.a = v; pinta(); }),
        ec2Sl('b · eficacia de captura', 0.008, 0.05, 0.002, p.b, '', v => { p.b = v; pinta(); }),
        ec2Sl('c · conversión en crías de depredador', 0.1, 0.6, 0.02, p.c, '', v => { p.c = v; pinta(); }),
        ec2Sl('m · mortalidad del depredador', 0.15, 0.9, 0.05, p.m, '', v => { p.m = v; pinta(); }),
        h('div',{class:'row'},
          h('button',{class:'btn sm' + (p.pulso ? ' primary' : ''), 'aria-pressed':String(p.pulso), onclick:()=>{ p.pulso = !p.pulso; St.marcas.desfase = true; render(); }},
            p.pulso ? '✓ Perturbación activa (año 20)' : 'Perturbar: soltar 45 presas en el año 20'),
          h('button',{class:'btn sm ghost', onclick:()=>{ St.lv = { a:0.9, b:0.022, c:0.28, m:0.45, pulso:false }; render(); }},'Valores iniciales')),
        g, lect, nota,
        h('div',{class:'eco2-leg'},
          h('span',{}, h('i',{style:'background:' + ec2Col('--eco')}), 'Presa'),
          h('span',{}, h('i',{style:'background:' + ec2Col('--bad')}), 'Depredador'))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Lo que el modelo sí explica y lo que no'),
        h('div',{class:'grid g2'},
          h('div',{class:'tile'}, h('b',{},'Sí explica'), h('p',{class:'small muted'},'Las oscilaciones acopladas y desfasadas de lince y liebre americana, documentadas durante 90 años por los registros de pieles de la Compañía de la Bahía de Hudson, con ciclos de unos 10 años.')),
          h('div',{class:'tile'}, h('b',{},'No explica'), h('p',{class:'small muted'},'Que la presa tenga su propia capacidad de carga, que el depredador tenga presas alternativas o que haya refugios. Al añadir esos factores, los ciclos se amortiguan hasta un equilibrio estable, que es lo que más se observa en la naturaleza.'))),
        h('p',{class:'small'}, h('b',{},'Error frecuente: '),'pensar que el depredador "controla" a la presa como si fuera un freno instantáneo. En realidad ambos se controlan mutuamente con retraso, y ese retraso es lo que produce los ciclos.')),
      secNav());
  }

  /* ---------- 3 · competencia y nicho ---------- */
  function simComp(dif, K1, K2){
    const w = 0.55, alfa = Math.exp(-(dif*dif)/(2*w*w));
    const r1 = 0.45, r2 = 0.4, dt = 0.1, n = 1200;
    let N1 = 30, N2 = 30; const s1 = [], s2 = [];
    for (let i=0; i<=n; i++){
      const t = i*dt;
      const d1 = r1*N1*(K1 - N1 - alfa*N2)/K1, d2 = r2*N2*(K2 - N2 - alfa*N1)/K2;
      N1 = Math.max(0, N1 + d1*dt); N2 = Math.max(0, N2 + d2*dt);
      if (i % 8 === 0){ s1.push({x:t, y:N1}); s2.push({x:t, y:N2}); }
    }
    let res;
    if (N1 > 5 && N2 > 5) res = { k:'coexisten', t:'Las dos especies coexisten: cada una se ve más limitada por los individuos de su propia especie que por los de la otra. Eso solo ocurre cuando sus nichos son suficientemente distintos.' };
    else if (N1 > N2) res = { k:'excluye1', t:'Exclusión competitiva: la especie 1 elimina a la especie 2. Con nichos casi idénticos, la que tiene la mínima ventaja termina desplazando a la otra por completo.' };
    else res = { k:'excluye2', t:'Exclusión competitiva: la especie 2 elimina a la especie 1. Gana quien aprovecha mejor el recurso compartido, aunque la diferencia inicial sea pequeñísima.' };
    return { s1, s2, alfa, N1, N2, res };
  }
  function nichoSVG(dif){
    const W = 720, H = 200, w = 0.55;
    const gauss = (x, mu) => Math.exp(-Math.pow(x-mu,2)/(2*w*w));
    const mu1 = 1.1 - dif/2, mu2 = 1.1 + dif/2;
    const X = v => 40 + (v/2.6)*(W-70), Y = v => H - 34 - v*(H-70);
    const curva = (mu, col) => { let d = ''; for (let i=0; i<=80; i++){ const x = i/80*2.6; d += (i?' L':'M') + X(x).toFixed(1) + ',' + Y(gauss(x,mu)).toFixed(1); }
      return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.4"/>'; };
    let over = ''; for (let i=0; i<=80; i++){ const x = i/80*2.6; over += (i?' L':'M') + X(x).toFixed(1) + ',' + Y(Math.min(gauss(x,mu1), gauss(x,mu2))).toFixed(1); }
    over += ' L' + X(2.6).toFixed(1) + ',' + Y(0).toFixed(1) + ' L' + X(0).toFixed(1) + ',' + Y(0).toFixed(1) + ' Z';
    let ejes = '<line x1="' + X(0) + '" y1="' + Y(0) + '" x2="' + X(2.6) + '" y2="' + Y(0) + '" stroke="var(--line)" stroke-width="1.4"/>';
    for (let v=0; v<=2.5; v+=0.5) ejes += '<text x="' + X(v) + '" y="' + (Y(0)+16) + '" font-size="10" text-anchor="middle" fill="var(--ink-3)">' + ec2Dec(v,1) + '</text>';
    return '<svg class="eco2-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Curvas de uso del recurso de dos especies con una separación de picos de ' + ec2Dec(dif,2) + ' milímetros">' +
      '<path d="' + over + '" fill="var(--warn)" opacity="0.28"/>' + curva(mu1, ec2Col('--eco')) + curva(mu2, ec2Col('--accent')) + ejes +
      '<text x="' + (W/2) + '" y="' + (H-6) + '" font-size="11" text-anchor="middle" fill="var(--ink-3)">tamaño de la semilla (mm) · el área naranja es el solapamiento de nicho</text></svg>';
  }
  function secCompetencia(){
    const c = St.comp, g = ec2Grafico(270), svg = h('div',{}), lect = h('div',{class:'eco2-read'}), nota = h('div',{});
    function pinta(){
      const s = simComp(c.dif, c.K1, c.K2);
      g._redraw({ series:[
          { pts:s.s1, color:ec2Col('--eco'), label:'Pinzón de pico pequeño' },
          { pts:s.s2, color:ec2Col('--accent'), label:'Pinzón de pico grande' } ],
        xlabel:'tiempo (años)', ylabel:'individuos', ymax:Math.max(c.K1,c.K2)*1.2, yfmt:v=>ec2Mil(v) });
      svg.innerHTML = nichoSVG(c.dif);
      lect.innerHTML = '';
      lect.append(
        h('div',{}, h('b',{}, ec2Dec(s.alfa,2)), h('span',{},'α · coeficiente de competencia')),
        h('div',{}, h('b',{}, ec2Dec(s.alfa*100,0) + ' %'), h('span',{},'solapamiento de nicho')),
        h('div',{}, h('b',{}, ec2Mil(s.N1)), h('span',{},'especie 1 al final')),
        h('div',{}, h('b',{}, ec2Mil(s.N2)), h('span',{},'especie 2 al final')));
      nota.innerHTML = '';
      nota.append(h('div',{class:'notice ' + (s.res.k === 'coexisten' ? 'ok' : 'warn')}, s.res.t));
      if (s.res.k === 'coexisten') St.marcas.nicho = true;
    }
    g._draw({ series:[{pts:[{x:0,y:0}], color:ec2Col('--eco')}], xlabel:'tiempo (años)', ylabel:'individuos' });
    setTimeout(pinta, 10);
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Dos especies, un mismo recurso'),
        h('p',{class:'small'},'Dos pinzones de Darwin comen semillas en la misma isla. Separa el tamaño de pico de las dos especies y observa qué ocurre: al separarlos, cada una explota semillas distintas y el coeficiente de competencia α baja.'),
        ec2Sl('Diferencia de tamaño de pico (mm)', 0, 1.6, 0.05, c.dif, 'mm', v => { c.dif = v; pinta(); }),
        svg,
        h('div',{class:'row'},
          h('button',{class:'btn sm', onclick:()=>{ c.dif = 0.1; render(); }},'Nichos casi idénticos'),
          h('button',{class:'btn sm', onclick:()=>{ c.dif = 0.75; render(); }},'Partición parcial'),
          h('button',{class:'btn sm', onclick:()=>{ c.dif = 1.4; render(); }},'Nichos bien separados')),
        g, lect, nota),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Principio de exclusión competitiva (Gause, 1934)'),
        h('p',{},'Dos especies con exactamente el mismo nicho no pueden coexistir de forma indefinida en el mismo lugar: la que aprovecha mejor el recurso termina desplazando a la otra. Gause lo demostró con dos paramecios en un cultivo.'),
        h('div',{class:'grid g3'},
          h('div',{class:'tile'}, h('b',{},'Partición de recursos'), h('p',{class:'small muted'},'La salida habitual en la naturaleza: las especies se reparten el recurso en el tiempo, en el espacio o en el tamaño. En el manglar, la garza pesca de día y el martín pescador en otra profundidad.')),
          h('div',{class:'tile'}, h('b',{},'Desplazamiento de caracteres'), h('p',{class:'small muted'},'En las islas donde conviven, Geospiza fuliginosa y Geospiza fortis tienen picos claramente distintos; en las islas donde cada una vive sola, sus picos son casi iguales. La competencia empujó la evolución.')),
          h('div',{class:'tile'}, h('b',{},'Nicho fundamental y realizado'), h('p',{class:'small muted'},'El nicho fundamental es donde la especie PODRÍA vivir; el realizado, donde vive de verdad una vez que los competidores la limitan. Casi siempre es más pequeño.'))),
        h('p',{class:'small'}, h('b',{},'Ojo con el vocabulario: '),'el hábitat es la dirección donde vive la especie; el nicho es su profesión: qué come, cuándo, dónde, a qué temperatura y quién la come.')),
      secNav());
  }

  /* ---------- 4 · tablas de vida y curvas de supervivencia ---------- */
  function secSupervivencia(){
    const T = EC2_TABLAS[St.tab];
    const chips = h('div',{class:'row'});
    Object.entries(EC2_TABLAS).forEach(([k,x]) => chips.append(h('button',{class:'chip' + (St.tab===k?' picked':''),
      onclick:()=>{ St.tab = k; St.marcas.curva = true; render(); }}, x.tipo + ' · ' + x.n)));
    /* tabla de vida calculada */
    const filas = T.x.map((xi, i) => {
      const nx = T.nx[i], nx1 = T.nx[i+1];
      const lx = nx/1000, dx = nx1 != null ? nx - nx1 : null, qx = (dx != null && nx > 0) ? dx/nx : null;
      return { xi, nx, lx, dx, qx };
    });
    const tabla = h('table',{class:'data'},
      h('thead',{}, h('tr',{}, h('th',{},'Edad x (años)'), h('th',{},'nₓ · vivos'), h('th',{},'lₓ · proporción'), h('th',{},'dₓ · muertes'), h('th',{},'qₓ · mortalidad'))),
      h('tbody',{}, filas.map(f => h('tr',{}, h('td',{class:'mono'}, ec2Dec(f.xi,0)), h('td',{class:'mono'}, ec2Mil(f.nx)),
        h('td',{class:'mono'}, ec2Dec(f.lx,3)), h('td',{class:'mono'}, f.dx != null ? ec2Mil(f.dx) : '—'),
        h('td',{class:'mono'}, f.qx != null ? ec2Dec(f.qx*100,1) + ' %' : '—')))));
    const g = ec2Grafico(280);
    const serie = (k) => { const t = EC2_TABLAS[k];
      return { pts: t.x.map((xi,i) => ({ x: xi/t.maxv*100, y: St.log ? Math.log10(Math.max(t.nx[i],1)) : t.nx[i] })),
               color: ec2Col(t.col), label: t.tipo, dots:true }; };
    const dib = () => g._redraw({ series:['humano','gaviota','tortuga'].map(serie),
      xlabel:'% de la longevidad máxima de cada especie', ylabel: St.log ? 'supervivientes (escala logarítmica)' : 'supervivientes de 1.000 nacidos',
      xmax:100, ymax: St.log ? 4 : 1050, yfmt: v => St.log ? ec2Mil(Math.pow(10,v)) : ec2Mil(v), xfmt: v => ec2Dec(v,0) + ' %' });
    g._draw({ series:['humano','gaviota','tortuga'].map(serie), xlabel:'% de la longevidad máxima', ylabel:'supervivientes', xmax:100, ymax: St.log ? 4 : 1050, yfmt: v => St.log ? ec2Mil(Math.pow(10,v)) : ec2Mil(v) });
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Tabla de vida · elige la especie'), chips,
        h('h3',{style:'margin:2px 0 0'}, T.n + ' · curva ' + T.tipo),
        h('p',{class:'small'}, T.d),
        h('div',{class:'tablewrap'}, tabla),
        h('p',{class:'small muted'},'lₓ = nₓ / n₀ es la proporción que sobrevive desde el nacimiento. qₓ = dₓ / nₓ es la probabilidad de morir en ese intervalo teniendo esa edad. Fíjate en la primera fila de la tortuga: qₓ del 94,5 % en el primer año.'),
        h('div',{class:'notice info'}, h('span',{}, h('b',{},'Estrategia: '), T.est))),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Las tres curvas de supervivencia, juntas'),
        h('div',{class:'row'}, h('label',{class:'toggle'}, h('input',{type:'checkbox', checked: St.log || null,
          onchange:()=>{ St.log = !St.log; St.marcas.curva = true; dib(); }}), ' Escala logarítmica en el eje Y')),
        g,
        h('div',{class:'eco2-leg'},
          h('span',{}, h('i',{style:'background:' + ec2Col('--accent')}), 'Tipo I · ser humano'),
          h('span',{}, h('i',{style:'background:' + ec2Col('--warn')}), 'Tipo II · gaviota'),
          h('span',{}, h('i',{style:'background:' + ec2Col('--eco')}), 'Tipo III · tortuga')),
        h('p',{class:'small'},'La escala logarítmica es la que se usa siempre en ecología, porque convierte una mortalidad constante en una recta: si la curva es recta, qₓ no depende de la edad (tipo II). La del ser humano es convexa (tipo I: mueren los viejos) y la de la tortuga, cóncava y con una caída brutal al inicio (tipo III: mueren las crías).'),
        h('p',{class:'small muted'},'Desactiva la escala logarítmica y comprobarás que las curvas II y III se pegan al eje y ya no se distinguen: por eso la escala importa.')),
      secNav());
  }

  /* ---------- 5 · caso real: tortuga de Española ---------- */
  function simCaso(o){
    let F = 8, s0 = 0.02, sj = 0.88, sa = 0.955, mad = 0.05;
    /* con las cabras comiéndose la vegetación, la isla sostiene muy pocas tortugas */
    const K = o.cabras ? 2200 : 260;
    if (o.cabras){ F += 6; sj = 0.93; }   /* vegetación recuperada */
    if (o.cria) s0 = 0.6;                 /* huevos incubados y crías protegidas */
    if (o.ratas) s0 += 0.04;
    if (o.adultos) sa = 0.985;
    let J = 0, A = 14; const pts = [];
    for (let t=0; t<=60; t++){
      pts.push({ x:t, y:A });
      const g = Math.max(0, 1 - A/K);
      const nuevos = A*0.55*F*s0*g;
      const J2 = J*sj*(1-mad) + nuevos;
      const A2 = A*sa + J*sj*mad*g;
      J = J2; A = A2;
    }
    const l = pts[60].y > 0 && pts[50].y > 0 ? Math.pow(pts[60].y/pts[50].y, 1/10) : 0;
    return { pts, lambda:l, final:pts[60].y, K:K };
  }
  function secCaso(){
    const o = St.caso, g = ec2Grafico(280), lect = h('div',{class:'eco2-read'}), nota = h('div',{}), escena = h('div',{});
    const OPC = [ ['cabras','Erradicar las cabras introducidas','Restaura la vegetación: más alimento, mejor hábitat de anidación y mayor supervivencia juvenil.'],
                  ['cria','Crianza en cautiverio de huevos y neonatos','Los huevos se incuban en la Estación Charles Darwin y las crías se devuelven a los 5 años, cuando ya nadie se las come.'],
                  ['ratas','Controlar ratas y hormiga colorada','Reduce la depredación de nidos, pero solo una parte: el efecto es pequeño si el hábitat sigue arrasado.'],
                  ['adultos','Prohibir la extracción de adultos','Evita que se saquen tortugas adultas de la isla.'] ];
    function pinta(){
      const s = simCaso(o);
      escena.innerHTML = ''; escena.append(ec2Prado([{ n:'Tortugas adultas en Española', pts:s.pts, unidad: Math.max(1, Math.ceil(Math.max(...s.pts.map(q => q.y))/120)), K:s.K, icono:'tortuga', col:'#5A5347' }], { alto:150, etqT:'año' }));
      g._redraw({ series:[{ pts:s.pts, color:ec2Col('--eco'), label:'Tortugas adultas' },
                          { pts:[{x:0,y:14},{x:60,y:14}], color:ec2Col('--ink-3'), label:'Punto de partida: 14' }],
        xlabel:'años desde 1965', ylabel:'tortugas adultas', xmax:60, yfmt:v=>ec2Mil(v) });
      lect.innerHTML = '';
      lect.append(
        h('div',{}, h('b',{}, ec2Mil(s.final)), h('span',{},'adultos a los 60 años')),
        h('div',{}, h('b',{}, ec2Dec(s.lambda,3)), h('span',{},'λ · tasa anual de crecimiento')),
        h('div',{}, h('b',{}, ec2Mil(s.K)), h('span',{},'K · capacidad de carga de la isla')),
        h('div',{}, h('b',{}, Object.values(o).filter(Boolean).length + ' / 4'), h('span',{},'medidas activas')));
      nota.innerHTML = '';
      if (s.final < 20) nota.append(h('div',{class:'notice bad'},'La población no se recupera: en 60 años sigue con un puñado de adultos o se extingue. El cuello de botella está en que casi ningún huevo llega a juvenil.'));
      else if (!o.cabras) nota.append(h('div',{class:'notice warn'},'La crianza en cautiverio sí llena la isla… pero con las cabras vivas la isla solo sostiene unas ' + ec2Mil(s.K) + ' tortugas: la vegetación está arrasada. Estás produciendo tortugas para un hábitat que no las puede alimentar.'));
      else if (o.cria && o.cabras){ St.marcas.manejo = true;
        nota.append(h('div',{class:'notice ok'}, h('span',{}, h('b',{},'Esta es la combinación que funcionó de verdad. '),
          'La crianza en cautiverio resuelve el cuello de botella inmediato (casi ningún huevo llegaba a juvenil) y la erradicación de las cabras devuelve el hábitat, de modo que los repatriados encuentran qué comer. Una sola de las dos no basta: criar tortugas para soltarlas en una isla sin vegetación es tirar el esfuerzo, y quitar las cabras con solo 14 adultos habría tardado siglos.'))); }
      else nota.append(h('div',{class:'notice warn'},'La población crece, pero despacio. Compara: ¿qué ocurre si combinas la crianza en cautiverio con la erradicación de las cabras?'));
    }
    const chk = h('div',{class:'stack'});
    OPC.forEach(([k,t,d]) => chk.append(h('label',{class:'toggle', style:'align-items:flex-start'},
      h('input',{ type:'checkbox', checked:o[k] || null, onchange:()=>{ o[k] = !o[k]; Store.log('medida_manejo',{medida:k, activa:o[k]}); pinta(); } }),
      h('span',{}, h('b',{}, t), h('span',{class:'small muted', style:'display:block'}, d)))));
    g._draw({ series:[{pts:[{x:0,y:14}], color:ec2Col('--eco')}], xlabel:'años', ylabel:'adultos' });
    setTimeout(pinta, 10);
    return h('div',{class:'stack'},
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Caso real · Tortuga gigante de Española (Chelonoidis hoodensis)'),
        h('p',{},'En 1963 quedaban 14 tortugas en toda la isla Española: 12 hembras y 2 machos, tan dispersos que ya no se encontraban para reproducirse. Las cabras introducidas en el siglo XIX habían arrasado la vegetación. Tú decides el plan de manejo.'),
        h('div',{class:'notice info'},'Población objetivo: que λ (lambda, la tasa anual de crecimiento) supere claramente 1 y la población se sostenga sola. λ > 1 significa que crece; λ = 1, que se mantiene; λ < 1, que va hacia la extinción.'),
        chk, escena, g, lect, nota),
      h('div',{class:'card stack'},
        h('span',{class:'eyebrow eco'},'Lo que ocurrió de verdad'),
        h('ul',{class:'eco2-check'},
          h('li',{}, h('span',{class:'ck'},'1'), 'Las 14 tortugas fueron llevadas a la Estación Charles Darwin en Santa Cruz para un programa de crianza en cautiverio.'),
          h('li',{}, h('span',{class:'ck'},'2'), 'A ellas se sumó Diego, un macho repatriado desde el zoológico de San Diego en 1977, padre de cerca del 40 % de las crías del programa.'),
          h('li',{}, h('span',{class:'ck'},'3'), 'Las cabras fueron erradicadas por completo de Española en 1978: sin eso, las crías repatriadas no habrían tenido qué comer.'),
          h('li',{}, h('span',{class:'ck'},'4'), 'Entre 1975 y 2020 se repatriaron más de 1.900 tortugas juveniles. Hoy la población supera las 2.000 y se reproduce sola en la isla.'),
          h('li',{}, h('span',{class:'ck'},'5'), 'En 2020 el programa se cerró y los 15 reproductores, Diego incluido, volvieron a Española.')),
        h('p',{class:'small'}, h('b',{},'La lección de manejo: '),'en especies longevas con curva de tipo III, cada adulto vale muchísimo (tardan 20 a 25 años en madurar), pero el cuello de botella estaba en la primera etapa de vida. Por eso funcionó atacar las dos cosas a la vez: proteger el inicio de la vida y restaurar el hábitat. Una medida sola habría fracasado.'),
        h('p',{class:'small muted'},'Otro caso ecuatoriano para comparar: el cóndor andino, con unos 150 individuos, un solo huevo cada dos o tres años y mortalidad adulta por envenenamiento. Allí la prioridad es exactamente la contraria: salvar adultos, porque no hay forma rápida de reponerlos.')),
      secNav());
  }

  /* ---------- 6 · reto final ---------- */
  const EC2_QP = [
    { q:'En la curva logística, ¿en qué momento es MÁXIMA la cantidad de individuos nuevos que se añaden por año?',
      ops:['Al inicio, cuando N es muy pequeña','Cuando N = K/2','Cuando N llega a K','El aumento anual es siempre el mismo'],
      ok:1, fb:'En N = K/2 se combinan muchos individuos reproduciéndose y recursos todavía abundantes. De ahí sale la idea de rendimiento máximo sostenible en pesquerías: cosechar manteniendo la población cerca de la mitad de K.',
      wrong:['Con N pequeña la tasa per cápita es alta, pero hay poquísimos individuos reproduciéndose: el aumento absoluto es bajo.',
             'En N = K las natalidades igualan a las mortalidades y el crecimiento neto es cero: la población se mantiene, no aumenta.',
             'Eso describiría un crecimiento lineal, que no es ni el exponencial ni el logístico.'] },
    { q:'En el modelo depredador-presa, ¿por qué el pico de depredadores llega DESPUÉS del pico de presas?',
      ops:['Porque los depredadores son más lentos que las presas',
           'Porque el depredador necesita tiempo para alimentarse, reproducirse y criar: su respuesta numérica está retrasada respecto a la abundancia de presas',
           'Porque las presas huyen y tardan en ser encontradas',
           'Es una casualidad del modelo: en la naturaleza ambos picos coinciden'],
      ok:1, fb:'Ese retraso reproductivo es la causa del desfase de aproximadamente un cuarto de ciclo. Y explica la secuencia: muchas presas → muchos depredadores → pocas presas → pocos depredadores → muchas presas otra vez.',
      wrong:['La velocidad de carrera no tiene nada que ver: hablamos de tiempos de reproducción, no de persecución.',
             'La búsqueda tarda horas o días; el desfase del ciclo es de años. La escala no coincide.',
             'En los datos reales de lince y liebre americana el desfase se observa durante 90 años seguidos: no es un artefacto del modelo.'] },
    { q:'Dos especies de pinzón comen exactamente las mismas semillas en la misma isla. Según el principio de exclusión competitiva, ¿qué se espera a largo plazo?',
      ops:['Coexistirán indefinidamente repartiéndose la isla a partes iguales',
           'Una de las dos desplazará a la otra, salvo que sus nichos se separen (por tamaño de pico, zona o momento de alimentación)',
           'Las dos se extinguirán por competir demasiado',
           'Se cruzarán entre ellas formando una sola especie'],
      ok:1, fb:'La salida habitual en la naturaleza es la partición del nicho, y cuando la competencia es intensa puede producirse desplazamiento de caracteres: en las islas donde conviven, los picos de Geospiza fuliginosa y Geospiza fortis son más distintos que donde cada una vive sola.',
      wrong:['Con nichos idénticos no hay reparto estable: la mínima ventaja de una se amplifica generación tras generación.',
             'La competencia perjudica a ambas, pero la perdedora se extingue localmente antes de que la ganadora corra peligro.',
             'Son especies distintas con aislamiento reproductivo; la competencia no las fusiona.'] },
    { q:'Una curva de supervivencia de tipo III, como la de la tortuga gigante, indica que…',
      ops:['La mortalidad es constante a lo largo de toda la vida',
           'La mortalidad es altísima en las primeras etapas y muy baja en quienes superan esa barrera',
           'Casi todos los individuos mueren de viejos',
           'La población está creciendo exponencialmente'],
      ok:1, fb:'Por eso la tortuga pone muchos huevos sin cuidarlos: es una apuesta por la cantidad. Y por eso, en el manejo, proteger huevos y neonatos tuvo un efecto enorme en Española.',
      wrong:['Esa es la curva de tipo II, que en escala logarítmica se ve como una línea recta (gaviotas, muchas aves y roedores).',
             'Esa es la curva de tipo I, típica de mamíferos grandes y del ser humano, con pocas crías y mucho cuidado parental.',
             'La curva de supervivencia describe cómo muere una cohorte, no si la población crece o decrece.'] },
    { q:'En una isla de Galápagos se controla cada año una parte de las cabras introducidas, pero nunca se eliminan del todo. ¿Qué predice el modelo logístico?',
      ops:['La población de cabras irá disminuyendo hasta desaparecer sola',
           'Al bajar N por debajo de K, el crecimiento per cápita aumenta y la población se repone rápido: el control parcial funciona como una cosecha sostenible… para las cabras',
           'Las cabras se quedarán exactamente en el número al que se las deje',
           'La capacidad de carga K bajará hasta cero'],
      ok:1, fb:'Exactamente por esto el Parque Nacional Galápagos optó por la erradicación total, isla por isla, y no por el control periódico: en el Proyecto Isabela se eliminaron unas 79.000 cabras y se cerró la puerta con medidas de bioseguridad.',
      wrong:['Reducir una población sin eliminarla la deja en la zona donde crece más rápido: es lo contrario de lo que se busca.',
             'Solo se quedaría ahí si no se reprodujera; al quitar individuos, sobran recursos y la natalidad sube.',
             'K depende de los recursos de la isla, no del número de cabras que se retiren cada año.'] }
  ];
  function secReto(){
    const marcas = [ ['K','Moviste la capacidad de carga K en el simulador logístico'],
      ['desfase','Perturbaste el sistema depredador-presa y observaste el desfase'],
      ['nicho','Conseguiste que las dos especies competidoras coexistan'],
      ['curva','Comparaste las tres curvas de supervivencia'],
      ['manejo','Encontraste la combinación de manejo que salva a la tortuga de Española'] ];
    const lista = h('ul',{class:'eco2-check'});
    marcas.forEach(([k,t]) => lista.append(h('li',{class: St.marcas[k] ? 'ok' : ''}, h('span',{class:'ck','aria-hidden':'true'}, St.marcas[k] ? '✓' : ''), h('span',{}, t))));
    const qs = h('div',{class:'stack'});
    EC2_QP.forEach((q, i) => qs.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Pregunta ' + (i+1) + ' de 5'),
      quizBlock(q, (att) => {
        if (St.quiz[i]) return;
        St.quiz[i] = true; St.intentos += (att - 1);
        const n = St.quiz.filter(Boolean).length;
        if (n === 5){
          const extras = Object.values(St.marcas).filter(Boolean).length;
          const min = Math.max(1, Math.round((Date.now() - St.start)/60000));
          Store.completeActivity('reto-poblaciones', { score:'5/5', attempts:St.intentos, duracionMin:min, simuladores:extras });
          estado.className = 'notice ok'; estado.textContent = 'Reto resuelto ✓ · dinámica de poblaciones';
          toast('Actividad completada: dinámica de poblaciones.');
        } else toast('Van ' + n + ' de 5 preguntas del reto.');
      }))));
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Antes de responder'),
        h('p',{},'Lo que hiciste en los simuladores:'), lista,
        h('p',{class:'small muted'},'Si alguna casilla sigue vacía, vuelve a esa sección: la respuesta se ve mejor moviendo los controles que leyendo la teoría.')),
      qs,
      h('div',{class:'row'}, h('a',{class:'btn sm', href:'#/explorar/ecosistemas'},'← Volver a ecosistemas del Ecuador')),
      secNav());
  }

  function secNav(){
    return h('div',{class:'row', style:'justify-content:space-between;margin-top:6px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec = Math.max(0, St.sec-1); render(); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec = Math.min(SEC.length-1, St.sec+1); render(); }},'Siguiente →'));
  }
  function render(){
    nav.innerHTML = '';
    SEC.forEach((s, i) => nav.append(h('button',{'aria-current': String(i===St.sec), onclick:()=>{ St.sec = i; render(); }}, s.n)));
    body.innerHTML = '';
    body.append([secCrecimiento, secDepredacion, secCompetencia, secSupervivencia, secCaso, secReto][St.sec]());
    Store.log('seccion',{recurso:'reto-poblaciones', seccion:SEC[St.sec].id});
  }
  render();
});
</script>
