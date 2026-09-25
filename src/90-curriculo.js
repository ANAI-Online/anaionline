<style>
.ctx-nav{display:flex;flex-wrap:wrap;gap:10px;align-items:stretch;margin-top:28px;padding-top:18px;border-top:1px solid var(--line)}
.ctx-nav a{flex:1 1 220px;display:flex;flex-direction:column;gap:2px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;text-decoration:none;color:inherit;background:var(--bg-2)}
.ctx-nav a:hover,.ctx-nav a:focus-visible{border-color:var(--accent)}
.ctx-nav .k{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
.ctx-nav .t{font-weight:700}
.ctx-nav .next{text-align:right}
.ctx-links{display:flex;flex-wrap:wrap;gap:6px}
</style>
<script>
/* =====================================================================
   CURRÍCULO · fuente única de verdad
   ---------------------------------------------------------------------
   Cada recurso de aprendizaje se declara UNA sola vez aquí, con:
     · href y actividad que lo completa (act)
     · la unidad de Biología (Bachillerato) donde vive: bio
     · las unidades de Ciencias Naturales (EGB Superior) que lo usan: cn
   A partir de este catálogo se derivan, sin copias a mano:
     · los recursos de cada unidad de Ciencias Naturales
     · el libro de calificaciones de Ciencias y el de Biología
     · el peso de cada actividad en el progreso de las unidades de Biología
     · las tarjetas de recursos de las áreas de Biología
     · la etiqueta de contexto (eyebrow), las migas y la navegación
       "anterior / siguiente" de cada página, según el entorno del estudiante
   Añadir o mover un recurso = editar una línea de este catálogo.
   ===================================================================== */
const CURR = {
  /* ---- Mundo celular ---- */
  'microscopio':      { href:'#/microscopio', act:'reto-microscopio', tipo:'Microscopio', em:'🔎', t:'Microscopio virtual',
    d:'Muestras de tejidos, sangre y microorganismos de 4x a 100x.', reto:'Enfoca, elige el aumento correcto e identifica cada muestra por su forma y organización, no por su etiqueta.',
    bio:1, cn:['8-cvt-1'] },
  'celula-comparar':  { href:'#/explorar/celula-comparar', act:'reto-celula-comparar', tipo:'Modelo 3D', em:'⚖️', t:'Comparar células',
    d:'Animal, vegetal y bacteriana lado a lado, a la misma escala.', reto:'Encuentra las características que comparten todas las células y explica por qué ninguna puede faltar.',
    bio:1, cn:['8-cvt-1'] },
  'celula':           { href:'#/explorar/celula', act:'reto-celula', tipo:'Modelo 3D', em:'🔬', t:'Célula animal en 3D',
    d:'Organelos en corte, "ver en acción" y vista en detalle de cada estructura.', reto:'Explica cómo colaboran núcleo, retículo, Golgi y mitocondria para fabricar y exportar una proteína.',
    bio:2, cn:['8-cvt-1'] },
  'celula-vegetal':   { href:'#/explorar/celula-vegetal', act:'reto-celula-vegetal', tipo:'Modelo 3D', em:'🌿', t:'Célula vegetal en 3D',
    d:'Pared celular, cloroplastos y vacuola central.', reto:'Encuentra los tres componentes que la célula animal no tiene y explica para qué le sirven a la planta.',
    bio:2, cn:['8-cvt-1'] },
  'procariota':       { href:'#/explorar/celula-procariota', act:'reto-procariota', tipo:'Modelo 3D', em:'🦠', t:'Célula procariota en 3D',
    d:'Sin núcleo: nucleoide, plásmidos, ribosomas y flagelo.', reto:'Explica qué le falta a una bacteria frente a una célula eucariota y cómo sobrevive igual.',
    bio:2, cn:['8-cvt-1'] },
  'procesos':         { href:'#/explorar/procesos', act:'reto-procesos', tipo:'Animación', em:'🔁', t:'Procesos celulares',
    d:'Mitosis, meiosis, ósmosis y respiración celular, paso a paso.', reto:'Distingue qué se mueve en cada proceso y explica en qué se diferencian la mitosis y la meiosis.',
    bio:2, cn:['8-cvt-1','9-cvt-1'] },
  'lab-osmosis':      { href:'#/laboratorio/osmosis-papa', act:'lab-osmosis-papa', tipo:'Laboratorio', em:'💧', t:'Laboratorio: ósmosis en papa',
    d:'Pesa cilindros de papa en distintas soluciones y grafica el cambio de masa.', reto:'Calcula por interpolación la concentración de sal en la que la papa no gana ni pierde agua.',
    bio:2, cn:['8-cvt-1'] },
  'mis-salva':        { href:'#/mision/salva-celula', act:'mision-salva-celula', tipo:'Misión', em:'🧪', t:'Misión: salva la célula',
    d:'Una célula no produce suficiente energía: recoge evidencias y descarta sospechosos.', reto:'Acusa al organelo responsable y sostén tu diagnóstico con las evidencias correctas.',
    bio:2, cn:['8-cvt-1'] },
  'mis-diagnostico':  { href:'#/mision/diagnostico-celular', act:'mision-diagnostico-celular', tipo:'Misión', em:'🩸', t:'Misión: diagnóstico celular',
    d:'Cuatro pacientes, cuatro muestras al microscopio: anemias, malaria e infección.', reto:'Resuelve los cuatro casos y justifica cada diagnóstico con lo que observaste.',
    bio:1, cn:['9-cvt-2'] },
  /* ---- Metabolismo ---- */
  'lab-fotosintesis': { href:'#/laboratorio/fotosintesis', act:'lab-fotosintesis', tipo:'Laboratorio', em:'🌱', t:'Laboratorio: fotosíntesis',
    d:'Luz, CO₂, temperatura y agua sobre la tasa fotosintética de Elodea.', reto:'Encuentra la meseta de la curva y explica qué otro factor pasa a limitar la fotosíntesis.',
    bio:3, cn:['8-cvt-2'] },
  'lab-catalasa':     { href:'#/laboratorio/catalasa', act:'lab-catalasa', tipo:'Laboratorio', em:'🧫', t:'Laboratorio: catalasa y temperatura',
    d:'Mide el oxígeno que libera la catalasa de hígado o de papa.', reto:'Encuentra la temperatura óptima y demuestra que el frío frena la enzima pero el calor la destruye.',
    bio:3, cn:['10-cvt-1'] },
  'lab-fermentacion': { href:'#/laboratorio/fermentacion', act:'lab-fermentacion', tipo:'Laboratorio', em:'🍞', t:'Laboratorio: fermentación de levadura',
    d:'CO₂ producido según el azúcar, la temperatura y el oxígeno.', reto:'Descubre qué azúcares no puede fermentar la levadura y explica por qué.',
    bio:3, cn:['10-cvt-1'] },
  'biomoleculas':     { href:'#/cn/biomoleculas', act:'cn-biomoleculas', tipo:'Modelo 3D', em:'🧪', t:'Biomoléculas y homeostasis',
    d:'Las cuatro familias en 3D, enzimas, desnaturalización y retroalimentación.', reto:'Explica con las curvas cómo el cuerpo corrige una desviación de la glucemia o de la temperatura.',
    bio:3, cn:['10-cvt-1'] },
  /* ---- Genética y evolución ---- */
  'adn':              { href:'#/explorar/adn', act:'reto-adn', tipo:'Modelo 3D', em:'🧬', t:'ADN 3D y "Edita el ADN"',
    d:'Doble hélice, nucleótidos, del gen a la proteína y mutaciones.', reto:'Edita el ADN hasta conseguir una mutación silenciosa, una de sentido erróneo y una sin sentido.',
    bio:4, cn:['9-cvt-1'] },
  'cruces':           { href:'#/explorar/cruces', act:'reto-cruces', tipo:'Laboratorio', em:'🟪', t:'Constructor de cruces',
    d:'Gametos, cuadro de Punnett y probabilidades.', reto:'Resuelve los tres casos del modo reto prediciendo las proporciones antes de cruzar.',
    bio:4, cn:['9-cvt-1'] },
  'genealogia':       { href:'#/explorar/genealogia', act:'reto-genealogia', tipo:'Laboratorio', em:'🌳', t:'Árboles genealógicos',
    d:'Lee un pedigrí y deduce genotipos y portadores.', reto:'Deduce el genotipo de las siete personas del árbol, incluida la que no se puede saber.',
    bio:4, cn:['9-cvt-1'] },
  'mis-codigo':       { href:'#/mision/codigo-genetico', act:'mision-codigo-genetico', tipo:'Misión', em:'🧬', t:'Misión: código genético',
    d:'Asesoramiento genético real a una familia con daltonismo.', reto:'Calcula la probabilidad y comunícasela a la familia sin confundirla con una certeza.',
    bio:4, cn:['9-cvt-1'] },
  'evolucion':        { href:'#/explorar/evolucion', act:'reto-evolucion', tipo:'Simulador', em:'🦎', t:'Selección natural',
    d:'Variación, selección, deriva y los pinzones de Galápagos.', reto:'Cambia el ambiente y explica con los datos por qué cambia la frecuencia de un rasgo en la población.',
    bio:5, cn:['9-cvt-1'] },
  'biotecnologia':    { href:'#/explorar/biotecnologia', act:'reto-biotecnologia', tipo:'Laboratorio', em:'🧫', t:'Biotecnología',
    d:'Extracción de ADN, PCR, electroforesis, insulina recombinante y CRISPR.', reto:'Lee un gel, interpreta una curva de PCR y justifica una postura sobre un uso de la biotecnología.',
    bio:9, cn:['10-cvt-3'] },
  /* ---- Cuerpo humano y salud ---- */
  'corazon':          { href:'#/explorar/corazon', act:'reto-corazon', tipo:'Modelo 3D', em:'🫀', t:'Corazón',
    d:'Cámaras, válvulas animadas, vasos coronarios y flujo sanguíneo.', reto:'Explica cómo el corazón mantiene separadas la circulación pulmonar y la sistémica.', bio:6, cn:['9-cvt-2'] },
  'pulmones':         { href:'#/explorar/pulmones', act:'reto-pulmones', tipo:'Modelo 3D', em:'🫁', t:'Pulmones y vía aérea',
    d:'Árbol bronquial, diafragma y lupa de alvéolos.', reto:'Sigue el recorrido del aire y explica dónde y por qué ocurre el intercambio de gases.', bio:6, cn:['9-cvt-2'] },
  'cerebro':          { href:'#/explorar/cerebro', act:'reto-cerebro', tipo:'Modelo 3D', em:'🧠', t:'Cerebro',
    d:'Lóbulos, cerebelo, estructuras profundas e impulso nervioso.', reto:'Relaciona cada región del encéfalo con la función que controla.', bio:6, cn:['9-cvt-2'] },
  'nervioso':         { href:'#/explorar/nervioso', act:'reto-nervioso', tipo:'Modelo 3D', em:'⚡', t:'Sistema nervioso',
    d:'Médula, nervios, sistema autónomo, neurona y sinapsis.', reto:'Explica por qué la señal es eléctrica dentro de la neurona y química entre neuronas.', bio:6, cn:['9-cvt-2'] },
  'estomago':         { href:'#/explorar/estomago', act:'reto-estomago', tipo:'Modelo 3D', em:'🍽️', t:'Estómago',
    d:'Capas de la pared, glándulas gástricas y digestión de proteínas.', reto:'Explica cómo el estómago produce ácido sin digerirse a sí mismo.', bio:6, cn:['9-cvt-2'] },
  'intestino-delgado':{ href:'#/explorar/intestino-delgado', act:'reto-intestino-delgado', tipo:'Modelo 3D', em:'🌀', t:'Intestino delgado',
    d:'Pliegues, vellosidades y microvellosidades; absorción de nutrientes.', reto:'Explica cómo tres escalas encajadas multiplican la superficie de absorción.', bio:6, cn:['9-cvt-2'] },
  'intestino-grueso': { href:'#/explorar/intestino-grueso', act:'reto-intestino-grueso', tipo:'Modelo 3D', em:'🔁', t:'Intestino grueso',
    d:'Absorción de agua, microbiota y formación de las heces.', reto:'Explica qué aporta la microbiota y por qué la fibra le importa tanto.', bio:6, cn:['9-cvt-2'] },
  'higado':           { href:'#/explorar/higado', act:'reto-higado', tipo:'Modelo 3D', em:'🟤', t:'Hígado',
    d:'Doble aporte sanguíneo, vía biliar y lupa del lobulillo hepático.', reto:'Explica por qué todo lo que absorbes en el intestino pasa primero por el hígado.', bio:6, cn:['9-cvt-2','10-cvt-1'] },
  'pancreas':         { href:'#/explorar/pancreas', act:'reto-pancreas', tipo:'Modelo 3D', em:'🟠', t:'Páncreas',
    d:'Función exocrina (enzimas) y endocrina (insulina y glucagón).', reto:'Explica cómo un mismo órgano vierte enzimas por un conducto y hormonas a la sangre.', bio:6, cn:['10-cvt-1'] },
  'rinones':          { href:'#/explorar/rinones', act:'reto-rinones', tipo:'Modelo 3D', em:'🫘', t:'Riñones y vía urinaria',
    d:'Nefrona 3D: filtración, reabsorción y secreción.', reto:'Explica cómo se filtran 180 litros al día y solo se excreta alrededor de 1,5.', bio:6, cn:['9-cvt-2','10-cvt-1'] },
  'reproductor':      { href:'#/explorar/reproductor', act:'reto-reproductor', tipo:'Modelo 3D', em:'⚥', t:'Sistema reproductor',
    d:'Gametogénesis, ciclo ovárico y uterino, y fecundación.', reto:'Explica el ciclo menstrual como un mecanismo hormonal y no como una lista de fechas.', bio:6, cn:['9-cvt-2'] },
  'esqueletico':      { href:'#/explorar/esqueletico', act:'reto-esqueletico', tipo:'Modelo 3D', em:'🦴', t:'Sistema esquelético',
    d:'Huesos, articulaciones, osteona y médula ósea.', reto:'Demuestra que el hueso es un tejido vivo que se construye donde se lo usa.', bio:6, cn:['9-cvt-2'] },
  'muscular':         { href:'#/explorar/muscular', act:'reto-muscular', tipo:'Modelo 3D', em:'💪', t:'Sistema muscular',
    d:'Del músculo al sarcómero y la teoría del filamento deslizante.', reto:'Explica por qué la banda A no cambia de largo cuando el músculo se contrae.', bio:6, cn:['9-cvt-2'] },
  'inmunidad':        { href:'#/explorar/inmunidad', act:'reto-inmunidad', tipo:'Simulador', em:'🛡️', t:'Inmunidad, vacunas y antibióticos',
    d:'Virus y bacterias en 3D, respuesta inmune, inmunidad de grupo y resistencia.', reto:'Explica con los simuladores por qué una vacuna protege también a quien no puede vacunarse.', bio:6, cn:['9-cvt-2'] },
  'apendicectomia':   { href:'#/simuladores/apendicectomia', act:'reto-apendicectomia', tipo:'Simulador 3D', em:'🩺', t:'Apendicectomía: una cirugía por dentro',
    d:'Del dolor que migra al punto de McBurney: planos de la pared, técnica abierta y laparoscópica en un modelo 3D estilizado, sin sangre.', reto:'Ordena los síntomas, ubica el punto de McBurney, atraviesa los planos en orden y elige cada paso de la operación explicando por qué.', bio:6, cn:['9-cvt-2'] },
  'sim-circulacion':  { href:'#/simuladores/circulacion', act:'reto-simulador', tipo:'Simulador', em:'∿', t:'Simulador cardiorrespiratorio',
    d:'Actividad física, ventilación, anemia y altitud.', reto:'Con 80 % de actividad, encuentra la frecuencia respiratoria mínima que cubre la demanda de oxígeno.', bio:6, cn:['9-cvt-2'] },
  'lab-frecuencia':   { href:'#/laboratorio/frecuencia-cardiaca', act:'lab-frecuencia-cardiaca', tipo:'Laboratorio', em:'🫀', t:'Laboratorio: frecuencia cardíaca',
    d:'Pulsaciones antes, durante y después del ejercicio.', reto:'Descubre qué indica mejor la condición física: la frecuencia máxima o la recuperación.', bio:6, cn:['9-cvt-2'] },
  'mis-globulo':      { href:'#/mision/globulo-rojo', act:'mision-globulo', tipo:'Misión', em:'🩸', t:'Misión: el viaje de un glóbulo rojo',
    d:'Sigue a un eritrocito por la circulación doble.', reto:'Reconstruye el recorrido sin ayuda y explica por qué la arteria pulmonar lleva sangre pobre en oxígeno.', bio:6, cn:['9-cvt-2'] },
  'eval-corazon':     { href:'#/evaluacion/corazon', act:'eval-corazon', tipo:'Evaluación', em:'✓', t:'Evaluación: el corazón',
    d:'Selección visual en 3D, ordenar, relacionar y verdadero o falso argumentado.', reto:'Demuestra lo aprendido sobre el corazón: ubica, ordena, relaciona y argumenta.', bio:6, cn:['9-cvt-2'] },
  /* ---- Ecología, biodiversidad y ambiente ---- */
  'eco-red':          { href:'#/cn/eco/red-trofica', act:'cn-eco-red', tipo:'Simulador', em:'🕸️', t:'Red trófica y perturbaciones',
    d:'Páramo, manglar y Amazonía: construye la red y simula una perturbación.', reto:'Predice qué pasa con cada población cuando desaparece el depredador tope y compruébalo.',
    bio:7, cn:['8-cvt-2','9-cvt-3'] },
  'poblaciones':      { href:'#/explorar/poblaciones', act:'reto-poblaciones', tipo:'Simulador', em:'📈', t:'Dinámica de poblaciones',
    d:'Crecimiento, capacidad de carga, depredador y presa, competencia.', reto:'Explica con el modelo por qué una población deja de crecer y por qué depredador y presa oscilan desfasados.',
    bio:7, cn:['9-cvt-3'] },
  'mis-ecosistema':   { href:'#/mision/ecosistema-riesgo', act:'mision-ecosistema-riesgo', tipo:'Misión', em:'🌱', t:'Misión: el ecosistema en riesgo',
    d:'Una población colapsa en un manglar ecuatoriano: busca la causa.', reto:'Acusa una sola causa, descarta las demás con evidencia y decide una medida de manejo.',
    bio:7, cn:['9-cvt-3','10-cvt-3'] },
  'ecosistemas':      { href:'#/explorar/ecosistemas', act:'reto-ecosistemas', tipo:'Modelo 3D', em:'🌳', t:'Ecosistemas del Ecuador',
    d:'Amazonía, manglar, páramo y Galápagos; energía y ciclos de la materia.', reto:'Explica por qué a 4.000 m no crece un ceibo y sigue un átomo por su ciclo.',
    bio:8, cn:['8-cvt-2','9-cvt-3','10-cvt-2'] },
  'clima':            { href:'#/cn/clima', act:'cn-clima', tipo:'Tablero de datos', em:'🌦️', t:'Clima y riesgo del Ecuador',
    d:'Tiempo y clima, El Niño, amenaza, exposición y vulnerabilidad.', reto:'Separa amenaza, exposición y vulnerabilidad en un caso real y propone una respuesta proporcional.',
    bio:10, cn:['8-cvt-3','10-cvt-2'] },
  'audiencia':        { href:'#/cn/audiencia', act:'cn-audiencia', tipo:'Caso', em:'⚖️', t:'Audiencia científica simulada',
    d:'Clasifica evidencia, argumenta, responde al contraargumento y vota.', reto:'Defiende una recomendación proporcional a la evidencia, con indicador y salvaguarda.',
    bio:10, cn:['10-cvt-3'] },
  'tierra':           { href:'#/cn/tierra', act:'cn-tierra', tipo:'Modelo 3D', em:'🌋', t:'Tierra dinámica',
    d:'Capas, placas, sismos, volcanes, ciclo de rocas y océanos.', reto:'Ubica un epicentro por triangulación y explica el origen de un sismo en la costa ecuatoriana.',
    bio:null, cn:['8-cvt-3','10-cvt-2'] },
  /* ---- Ciencias físicas (solo EGB Superior) ---- */
  'lab-densidad':     { href:'#/cn/lab/densidad', act:'cn-lab-densidad', tipo:'Laboratorio 3D', em:'⚖️', t:'Laboratorio: densidad y flotación',
    d:'Pesa, mide volumen por desplazamiento y predice si flota.', reto:'Encuentra un líquido en el que el aluminio flote y explica por qué flotar no depende de ser liviano.',
    bio:null, cn:['8-cf-1'] },
  'lab-movimiento':   { href:'#/cn/lab/movimiento', act:'cn-lab-movimiento', tipo:'Laboratorio 3D', em:'🛷', t:'Laboratorio: movimiento, fuerzas y energía',
    d:'Pista con sensores, rampa y gráficas x-t, v-t y a-t en vivo.', reto:'Consigue que el carrito recorra 2,0 m en exactamente 2,0 s partiendo del reposo.',
    bio:null, cn:['8-cf-2','9-cf-1','10-cf-1','10-cf-2'] },
  'energia':          { href:'#/cn/lab/energia', act:'cn-lab-energia', tipo:'Laboratorio 3D', em:'🔥', t:'Laboratorio: calor, luz y sonido',
    d:'Conducción, convección, radiación y ondas.', reto:'Identifica en cada montaje qué entra, qué se transforma, qué sirve y qué se pierde.',
    bio:null, cn:['8-cf-3'] },
  'lab-circuitos':    { href:'#/cn/lab/circuitos', act:'cn-lab-circuitos', tipo:'Laboratorio 3D', em:'💡', t:'Laboratorio: electricidad y circuitos',
    d:'Circuitos en serie, paralelo y mixtos con amperímetro y voltímetro.', reto:'Haz que dos focos brillen igual de fuerte que uno solo y explica por qué.',
    bio:null, cn:['9-cf-2','10-cf-3'] },
  'sim-espacio':      { href:'#/cn/sim/espacio', act:'cn-sim-espacio', tipo:'Simulador 3D', em:'🪐', t:'Simulador: sistema solar',
    d:'Órbitas a dos escalas, tiempo acelerado y tu peso en cada planeta.', reto:'Descubre la relación entre la distancia al Sol y la duración del año de cada planeta.',
    bio:null, cn:['9-cf-3'] },
  'sim-espectro':     { href:'#/cn/sim/espectro', act:'cn-sim-espacio', tipo:'Simulador', em:'🌈', t:'Espectro electromagnético',
    d:'De las ondas de radio a los rayos gamma: usos y protección.', reto:'Ordena las regiones por energía y justifica qué protección necesita cada una.',
    bio:null, cn:['9-cf-3','10-cf-3'] }
};

/* Área de Biología a la que pertenece cada unidad (U10 se integra en Biodiversidad y ecosistemas). */
const CURR_AREA_DE = u => ({1:'celular',2:'celular',3:'celular',4:'genetica',5:'genetica',9:'genetica',6:'cuerpo',7:'biodiversidad',8:'biodiversidad',10:'biodiversidad'})[u];
const CURR_PESO = { 'Laboratorio':3, 'Laboratorio 3D':3, 'Misión':3, 'Caso':4, 'Evaluación':4, 'Simulador':3, 'Simulador 3D':3, 'Tablero de datos':3 };
const currPeso = r => CURR_PESO[r.tipo] || 2;
const CURR_CORTO = { 'Laboratorio: ':'', 'Misión: ':'Mis. ', 'Simulador: ':'', 'Evaluación: ':'Eval. ' };
const CURR_CORTOS = {"microscopio": "Microscopio", "celula-comparar": "Comparar células", "celula": "Célula animal", "celula-vegetal": "Célula vegetal", "procariota": "Procariota", "procesos": "Procesos celulares", "lab-osmosis": "Lab. ósmosis", "mis-salva": "Mis. célula", "mis-diagnostico": "Mis. diagnóstico", "lab-fotosintesis": "Lab. fotosíntesis", "lab-catalasa": "Lab. catalasa", "lab-fermentacion": "Lab. fermentación", "biomoleculas": "Biomoléculas", "adn": "ADN", "cruces": "Cruces", "genealogia": "Genealogía", "mis-codigo": "Mis. genética", "evolucion": "Evolución", "biotecnologia": "Biotecnología", "corazon": "Corazón", "pulmones": "Pulmones", "cerebro": "Cerebro", "nervioso": "S. nervioso", "estomago": "Estómago", "intestino-delgado": "I. delgado", "intestino-grueso": "I. grueso", "higado": "Hígado", "pancreas": "Páncreas", "rinones": "Riñones", "reproductor": "Reproductor", "esqueletico": "Esqueleto", "muscular": "Músculos", "inmunidad": "Inmunidad", "sim-circulacion": "Sim. circulación", "lab-frecuencia": "Lab. pulso", "mis-globulo": "Mis. glóbulo", "eval-corazon": "Eval. corazón", "eco-red": "Red trófica", "poblaciones": "Poblaciones", "mis-ecosistema": "Mis. ecosistema", "ecosistemas": "Ecosistemas", "clima": "Clima", "audiencia": "Audiencia", "tierra": "Tierra", "lab-densidad": "Densidad", "lab-movimiento": "Movimiento", "energia": "Energía", "lab-circuitos": "Circuitos", "sim-espacio": "Espacio", "sim-espectro": "Espectro"};
const currCorto0 = t => { let s = t; for (const [a,b] of Object.entries(CURR_CORTO)) s = s.replace(a,b); return s.length > 16 ? s.slice(0,15)+'…' : s; };
const currPath = href => String(href||'').replace(/^#/,'').split('?')[0];

/* ---------- Aplicación: deriva todo a partir del catálogo ---------- */
BIO.curriculo = CURR;
BIO.aplicarCurriculo = function(){
  const ids = Object.keys(CURR);
  /* 1 · Ciencias Naturales: recursos, recursos por unidad y libro de calificaciones */
  const cnRec = {};
  ids.forEach(id => { const r = CURR[id]; if (r.cn && r.cn.length) cnRec[id] = Object.assign({}, BIO.cn.recursos[id] || {}, { t:r.t, tipo:r.tipo, em:r.em, href:r.href, ok:true, act:r.act, d:r.d, reto:r.reto }); });
  BIO.cn.recursos = cnRec;
  const orden = r => /^(Modelo|Animación|Microscopio)/.test(r.tipo) ? 0 : /^(Laboratorio|Simulador|Tablero)/.test(r.tipo) ? 1 : 2;
  BIO.cn.unidades.forEach(u => { u.recursos = ids.filter(id => (CURR[id].cn||[]).includes(u.id)).sort((a,b) => orden(CURR[a]) - orden(CURR[b])); });
  const items = [];
  [8,9,10].forEach(g => { const vistos = new Set();
    BIO.cn.unidades.filter(u => u.grado === g).forEach(u => u.recursos.forEach(id => { const r = CURR[id];
      if (!r.act || vistos.has(r.act)) return; vistos.add(r.act);
      items.push({ id:r.act, t:r.t, corto:CURR_CORTOS[id] || currCorto0(r.t), unidad:u.id, tipo:r.tipo, peso:currPeso(r) }); })); });
  BIO.cnGradeItems = items;
  BIO.cnItemsDe = grado => BIO.cnGradeItems.filter(i => +String(i.unidad).split('-')[0] === +grado);

  /* 2 · Biología: actividades con unidad y peso normalizado (cada unidad suma 100) */
  const porUnidad = {};
  ids.forEach(id => { const r = CURR[id]; if (!r.bio || !r.act) return;
    const a = BIO.activities[r.act] = Object.assign({ xp:100 }, BIO.activities[r.act] || {}, { t: (BIO.activities[r.act]||{}).t || r.t });
    a.unidad = r.bio; (porUnidad[r.bio] = porUnidad[r.bio] || []).push([r.act, currPeso(r)]); });
  /* exploración libre y guiada de los órganos: suman poco, pero suman */
  Object.entries(BIO.activities).forEach(([k,a]) => { if (/^(explorar|guiada)-/.test(k) && a.unidad){ (porUnidad[a.unidad] = porUnidad[a.unidad] || []).push([k, 1]); } });
  /* actividades sin recurso en el catálogo: no pesan en ninguna unidad de Biología */
  const conPeso = new Set(Object.values(porUnidad).flat().map(x=>x[0]));
  Object.entries(BIO.activities).forEach(([k,a]) => { if (!conPeso.has(k)){ a.peso = 0; if (/^cn-/.test(k)) a.unidad = null; } });
  Object.values(porUnidad).forEach(lista => { const vistos = new Map(); lista.forEach(([k,w]) => vistos.set(k, Math.max(w, vistos.get(k)||0)));
    const tot = [...vistos.values()].reduce((s,w)=>s+w,0);
    vistos.forEach((w,k) => { BIO.activities[k].peso = Math.round(w/tot*1000)/10; }); });

  /* 3 · Biología: libro de calificaciones (una columna por recurso, en orden de unidad) */
  BIO.gradeItems = ids.filter(id => CURR[id].bio && CURR[id].act).sort((a,b) => CURR[a].bio - CURR[b].bio)
    .map(id => { const r = CURR[id]; return { id:r.act, t:r.t, corto:CURR_CORTOS[id] || currCorto0(r.t), unidad:r.bio, tipo:r.tipo, peso:currPeso(r) }; })
    .filter((it,i,arr) => arr.findIndex(x=>x.id===it.id) === i);
  BIO.gradeItemsOf = year => BIO.gradeItems.filter(i => BIO.unitsOf(year).includes(i.unidad));

  /* 4 · Biología: tarjetas de las áreas (las misiones viven en su propia sección) */
  const viejo = Object.fromEntries(BIO.resources.map(r => [r.id, r]));
  BIO.resources = ids.filter(id => CURR[id].bio && CURR[id].tipo !== 'Misión').map(id => { const r = CURR[id], v = viejo[id] || {};
    const area = CURR_AREA_DE(r.bio); const extra = (v.areas||[]).filter(a => a !== area);
    return { id, tipo:r.tipo, t:r.t, d:r.d, href:r.href, areas:[area, ...extra], em:r.em, ok:true, reto:r.reto, act:r.act,
      transversal: /Laboratorio|Simulador/.test(r.tipo) && !/Modelo/.test(r.tipo) && extra.length > 0 }; });
  const bd = BIO.areas.find(a => a.id === 'biodiversidad'); if (bd && !bd.unidades.includes(10)) bd.unidades.push(10);
  BIO.plannedOrgans.length = 0;

  /* 5 · ACT_HREF: cada actividad sabe a qué página lleva */
  if (typeof ACT_HREF !== 'undefined') ids.forEach(id => { if (CURR[id].act) ACT_HREF[CURR[id].act] = CURR[id].href; });
};

/* ---------- Contexto de cada página según el entorno del estudiante ---------- */
/* Páginas índice que no son recursos por sí mismas: toman el contexto de un recurso del tema. */
const CURR_ALIAS = { '/explorar/genetica':['adn','Genética: mapa del tema'] };
function currRecursoDe(path){
  const p = String(path||'').split('?')[0];
  if (CURR_ALIAS[p]) return CURR_ALIAS[p][0];
  let best = null;
  for (const [id,r] of Object.entries(CURR)){ const rp = currPath(r.href);
    if (p === rp || (p.startsWith(rp+'/') && rp.length > 1)) { if (!best || rp.length > currPath(CURR[best].href).length) best = id; } }
  return best;
}
function currUnidadCN(id){
  const r = CURR[id]; if (!r || !(r.cn||[]).length) return null;
  const g = typeof cnNivelActual === 'function' ? cnNivelActual() : 8;
  const us = r.cn.map(BIO.cnUnidad).filter(Boolean);
  /* la del grado del estudiante; si no hay, la más cercana (primero las anteriores, que son repaso) */
  return us.find(u => u.grado === g) || us.slice().sort((a,b) => Math.abs(a.grado-g) - Math.abs(b.grado-g) || a.grado - b.grado)[0];
}
function currContexto(path){
  const c = currContextoBase(path); if (!c) return null;
  const al = CURR_ALIAS[String(path||'').split('?')[0]];
  if (al){ c.crumbs[c.crumbs.length-1] = { t:al[1] }; c.hermanos = []; c.id = null; }
  return c;
}
function currContextoBase(path){
  const id = currRecursoDe(path); if (!id) return null;
  const r = CURR[id], cn = Store.prog() === 'cn';
  if (cn){
    const u = currUnidadCN(id); if (!u) return null;
    const dom = BIO.cn.dominios.find(d => d.id === u.dom) || { n:'Ciencias Naturales' };
    const otras = r.cn.map(BIO.cnUnidad).filter(x => x && x.id !== u.id);
    return { id, r, prog:'cn', unidad:u,
      eyebrow:`Ciencias Naturales · ${u.grado}.º EGB · ${dom.n} · Unidad ${u.n}: ${u.t}`,
      tambien: otras.map(x => ({ t:`${x.grado}.º · U${x.n}`, href:'#/cn/unidad/'+x.id })),
      crumbs:[ { t:'Inicio', href:'#/cn' }, { t:dom.n, href:'#/cn/dominio/'+u.dom }, { t:`U${u.n} · ${u.t}`, href:'#/cn/unidad/'+u.id }, { t:r.t } ],
      hermanos: u.recursos.map(k => ({ id:k, t:CURR[k].t, href:CURR[k].href })), volver:{ t:`Unidad ${u.n}: ${u.t}`, href:'#/cn/unidad/'+u.id } };
  }
  if (!r.bio) return null;
  const unit = BIO.units.find(x => x.n === r.bio) || { n:r.bio, t:'' };
  const area = BIO.areas.find(a => a.id === CURR_AREA_DE(r.bio));
  const anio = BIO.year(BIO.yearOfUnit(r.bio)).corto;
  const seccion = r.tipo === 'Misión' ? { t:'Misiones', href:'#/misiones' } : /^Laboratorio$/.test(r.tipo) ? { t:'Laboratorios', href:'#/laboratorio' } : { t:area.n, href:'#/area/'+area.id };
  const ord = x => /^(Modelo|Animación|Microscopio)/.test(x.tipo) ? 0 : /^(Laboratorio|Simulador|Tablero)/.test(x.tipo) ? 1 : 2;
  const hermanos = Object.keys(CURR).filter(k => CURR[k].bio === r.bio).sort((a,b) => ord(CURR[a]) - ord(CURR[b])).map(k => ({ id:k, t:CURR[k].t, href:CURR[k].href }));
  return { id, r, prog:'bio', unidad:unit,
    eyebrow:`${area.n} · Unidad ${unit.n}: ${unit.t} · ${anio}`,
    tambien:[],
    crumbs:[ { t:'Inicio', href:'#/' }, ...(seccion.href === '#/area/'+area.id ? [{ t:'Áreas', href:'#/explorar' }] : []), seccion, { t:r.t } ],
    hermanos, volver:{ t:area.n, href:'#/area/'+area.id } };
}
/* Reescribe la etiqueta superior y añade "volver a la unidad / anterior / siguiente" al final de la página. */
function contextualizar(view, path){
  const c = currContexto(path); if (!c) return;
  const eb = view.querySelector('.page-head .eyebrow') || view.querySelector('.eyebrow');
  if (eb){ eb.textContent = c.eyebrow; eb.dataset.ctx = '1'; }
  if (c.tambien.length){ const head = view.querySelector('.page-head');
    if (head && !head.querySelector('.ctx-links')) (head.firstElementChild || head).append(h('div',{class:'ctx-links small muted',style:'margin-top:6px'}, 'También se usa en: ', ...c.tambien.map(x => h('a',{class:'pill',href:x.href}, x.t)))); }
  if (view.querySelector('.ctx-nav')) return;
  const i = c.hermanos.findIndex(x => x.id === c.id);
  const prev = i > 0 ? c.hermanos[i-1] : null, next = i >= 0 && i < c.hermanos.length-1 ? c.hermanos[i+1] : null;
  view.append(h('nav',{class:'ctx-nav','aria-label':'Navegación de la unidad'},
    prev ? h('a',{href:prev.href}, h('span',{class:'k'},'← Anterior'), h('span',{class:'t'},prev.t)) : null,
    h('a',{href:c.volver.href}, h('span',{class:'k'}, c.prog==='cn' ? 'Volver a la unidad' : 'Volver al área'), h('span',{class:'t'},c.volver.t)),
    next ? h('a',{class:'next',href:next.href}, h('span',{class:'k'},'Siguiente →'), h('span',{class:'t'},next.t)) : null));
}
function crumbsContexto(path){ const c = currContexto(path); return c ? c.crumbs : null; }
</script>
