<script>
/* =====================================================================
   ÁREAS DE CIENCIAS NATURALES · RECURSOS · RETOS · PARTES EN DETALLE
   ===================================================================== */
BIO.areas = [
  { id:'celular', n:'Mundo celular', dom:'cell', em:'🔬', unidades:[1,2,3],
    d:'La célula como unidad de la vida: organelos, metabolismo, transporte y división celular.',
    pregunta:'¿Cómo logra una célula mantenerse viva, obtener energía y fabricar lo que necesita?' },
  { id:'cuerpo', n:'Cuerpo humano y salud', dom:'anat', em:'🫀', unidades:[6],
    d:'Anatomía y fisiología de los sistemas del cuerpo humano, su interconexión y la salud.',
    pregunta:'¿Cómo trabajan juntos los órganos y sistemas para mantener el equilibrio del cuerpo?' },
  { id:'genetica', n:'Genética y evolución', dom:'gen', em:'🧬', unidades:[4,5,9],
    d:'ADN, herencia, mutaciones, evolución de las especies y biotecnología.',
    pregunta:'¿Cómo se transmite la información de la vida y cómo cambian las especies con el tiempo?' },
  { id:'biodiversidad', n:'Biodiversidad y ecosistemas', dom:'eco', em:'🌎', unidades:[7,8],
    d:'Ecosistemas, redes tróficas, ciclos de la materia y la biodiversidad del Ecuador.',
    pregunta:'¿Qué mantiene en equilibrio a un ecosistema y qué ocurre cuando lo alteramos?' }
];
BIO.transversalUnits = [10];
BIO.areaOfUnit = u => (BIO.areas.find(a => a.unidades.includes(u)) || {}).id || 'transversal';

/* Registro de recursos: cada recurso pertenece a una o varias áreas; laboratorios, simuladores y misiones son transversales */
BIO.resources = [
  { id:'celula', tipo:'Modelo 3D', t:'Célula animal en corte', d:'Organelos detallados, vista en corte y "ver en acción".', href:'#/explorar/celula', areas:['celular'], em:'🔬', ok:true },
  { id:'celula-vegetal', tipo:'Modelo 3D', t:'Célula vegetal', d:'Cloroplastos, pared celular y vacuola central.', href:'#/explorar/celula-vegetal', areas:['celular'], em:'🌿', ok:true },
  { id:'procariota', tipo:'Modelo 3D', t:'Célula procariota', d:'Sin núcleo: nucleoide, plásmidos, flagelo.', href:'#/explorar/celula-procariota', areas:['celular','biodiversidad'], em:'🦠', ok:true },
  { id:'procesos', tipo:'Animación', t:'Procesos celulares', d:'Mitosis, meiosis, respiración celular, transporte y ósmosis.', href:'#/explorar/procesos', areas:['celular'], em:'🔁', ok:true },
  { id:'microscopio', tipo:'Microscopio', t:'Microscopio virtual', d:'4x · 10x · 40x · 100x. Muestras de tejidos, sangre y microorganismos.', href:'#/microscopio', areas:['celular','cuerpo','biodiversidad'], em:'🔎', ok:true },
  { id:'corazon', tipo:'Modelo 3D', t:'Corazón', d:'Cámaras, válvulas animadas, vasos coronarios y flujo sanguíneo.', href:'#/explorar/corazon', areas:['cuerpo'], em:'🫀', ok:true },
  { id:'cerebro', tipo:'Modelo 3D', t:'Cerebro', d:'Lóbulos, cerebelo, estructuras profundas e impulso nervioso.', href:'#/explorar/cerebro', areas:['cuerpo'], em:'🧠', ok:true },
  { id:'pulmones', tipo:'Modelo 3D', t:'Pulmones y vía aérea', d:'Lóbulos, árbol bronquial, diafragma y lupa de alvéolos.', href:'#/explorar/pulmones', areas:['cuerpo'], em:'🫁', ok:true },
  { id:'adn', tipo:'Modelo 3D', t:'ADN 3D y "Edita el ADN"', d:'Doble hélice, nucleótidos, replicación y mutaciones.', href:'#/explorar/adn', areas:['genetica'], em:'🧬', ok:true },
  { id:'cruces', tipo:'Laboratorio', t:'Constructor de cruces', d:'Gametos, cuadro de Punnett y probabilidades. Modo aprender / reto.', href:'#/explorar/cruces', areas:['genetica'], em:'🟪', ok:true },
  { id:'genealogia', tipo:'Laboratorio', t:'Árboles genealógicos', d:'Lee un pedigrí y deduce genotipos y portadores.', href:'#/explorar/genealogia', areas:['genetica'], em:'🌳', ok:true },
  { id:'celula-comparar', tipo:'Modelo 3D', t:'Comparar células', d:'Animal, vegetal y procariota lado a lado.', href:'#/explorar/celula-comparar', areas:['celular'], em:'⚖️', ok:true },
  { id:'evolucion', tipo:'Simulador', t:'Selección natural', d:'Cambia el ambiente y observa cómo varía una población en generaciones.', href:'#/explorar/evolucion', areas:['genetica','biodiversidad'], em:'🦎', ok:true },
  { id:'ecosistemas', tipo:'Modelo 3D', t:'Ecosistemas del Ecuador', d:'Amazonía, manglar, páramo y Galápagos con redes tróficas.', href:'#/explorar/ecosistemas', areas:['biodiversidad'], em:'🌳', ok:true },
  { id:'poblaciones', tipo:'Simulador', t:'Dinámica de poblaciones', d:'Productores, consumidores y depredadores en el tiempo.', href:'#/explorar/poblaciones', areas:['biodiversidad'], em:'📈', ok:true },
  { id:'lab-fotosintesis', tipo:'Laboratorio', t:'Fotosíntesis: ¿qué la limita?', d:'Hipótesis, variables, datos y conclusión con Elodea.', href:'#/laboratorio/fotosintesis', areas:['celular','biodiversidad'], em:'🧪', ok:true, transversal:true },
  { id:'sim-circulacion', tipo:'Simulador', t:'Sistema cardiorrespiratorio', d:'Actividad física, respiración, anemia y altitud.', href:'#/simuladores/circulacion', areas:['cuerpo','celular'], em:'∿', ok:true, transversal:true },
  { id:'eval-corazon', tipo:'Evaluación', t:'Evaluación: el corazón', d:'Selección visual en 3D, ordenar, relacionar, V/F argumentado.', href:'#/evaluacion/corazon', areas:['cuerpo'], em:'✓', ok:true }
];

/* Cada recurso declara su propósito (qué debe lograr el estudiante) y, si ya existe, la actividad de reto asociada */
const RES_RETO = {
  'celula':['Explica cómo colaboran núcleo, retículo, Golgi y mitocondria para fabricar y exportar una proteína.','reto-celula'],
  'celula-vegetal':['Descubre qué estructuras permiten a una planta fabricar su alimento y mantenerse erguida.'],
  'procariota':['Compara una bacteria con tu propia célula: ¿qué le falta y cómo sobrevive sin eso?'],
  'procesos':['Ordena las etapas de la mitosis y predice qué pasa si un cromosoma no se separa.'],
  'microscopio':['Identifica el tipo de tejido observando la forma y la organización de sus células.'],
  'corazon':['Explica cómo el corazón mantiene separadas la circulación pulmonar y la sistémica.','reto-corazon'],
  'cerebro':['Relaciona cada región del encéfalo con la función que controla y predice los efectos de una lesión.','reto-cerebro'],
  'pulmones':['Sigue el recorrido del aire y explica dónde y por qué ocurre el intercambio de gases.','reto-pulmones'],
  'adn':['Cambia una base del ADN y predice si la proteína resultante cambiará.'],
  'cruces':['Predice la proporción de fenotipos de un cruce y compruébala con el cuadro de Punnett.'],
  'evolucion':['Cambia el ambiente y explica por qué cambia la frecuencia de un rasgo en la población.'],
  'ecosistemas':['Retira una especie de la red trófica y predice qué ocurre con las demás.'],
  'poblaciones':['Encuentra las condiciones que llevan a una población al equilibrio o al colapso.'],
  'lab-fotosintesis':['Encuentra el factor que limita la fotosíntesis y explica la meseta de la curva.','lab-fotosintesis'],
  'sim-circulacion':['Con 80 % de actividad física, encuentra la ventilación mínima que cubre la demanda de O₂.','reto-simulador'],
  'eval-corazon':['Demuestra lo aprendido sobre el corazón: ubica, ordena, relaciona y argumenta.','eval-corazon']
};
BIO.resources.forEach(r => { const x = RES_RETO[r.id]; if (x){ r.reto = x[0]; r.act = x[1] || null; } });

/* Misiones: transversales, conectan varias áreas */
const MIS_AREAS = { 'globulo-rojo':['cuerpo','celular'], 'salva-celula':['celular','cuerpo'], 'ecosistema-riesgo':['biodiversidad','genetica'], 'codigo-genetico':['genetica','cuerpo'], 'diagnostico-celular':['celular','cuerpo'] };
BIO.missions.forEach(m => { m.areas = MIS_AREAS[m.id] || []; });

/* Actividades de reto */
Object.assign(BIO.activities, {
  'reto-corazon':{ t:'Reto: el corazón', unidad:6, peso:5, xp:50 },
  'reto-cerebro':{ t:'Reto: el cerebro', unidad:6, peso:5, xp:50 },
  'reto-pulmones':{ t:'Reto: los pulmones', unidad:6, peso:5, xp:50 },
  'reto-celula':{ t:'Reto: la célula', unidad:2, peso:5, xp:50 },
  'reto-simulador':{ t:'Reto: el simulador cardiorrespiratorio', unidad:6, peso:5, xp:50 }
});

/* ---------- Propósito y reto por recurso ---------- */
BIO.heart.reto = { proposito:'Comprender cómo el corazón mantiene separadas dos circulaciones: la que va a los pulmones y la que va al cuerpo.',
  observa:[ {id:'ventriculo-derecho', txt:'Ventrículo derecho'}, {id:'ventriculo-izquierdo', txt:'Ventrículo izquierdo'}, {id:'tabique', txt:'Tabique interventricular'} ],
  pista:'Usa "Ver en detalle" en cada ventrículo y compara el grosor de sus paredes.',
  pregunta:{ q:'Un bebé nace con un orificio en el tabique interventricular. ¿Qué ocurre con la sangre y por qué?', ops:['Nada: el tabique solo da soporte al corazón','Parte de la sangre oxigenada pasa del ventrículo izquierdo al derecho, porque el izquierdo genera más presión; la sangre se mezcla y el corazón trabaja de más','La sangre desoxigenada pasa directamente a la aorta porque el lado derecho es más fuerte'], ok:1, fb:'El ventrículo izquierdo genera unos 120 mmHg y el derecho unos 25: la sangre fluye de mayor a menor presión. Por eso, cuando el tabique no separa ambos lados, la sangre oxigenada vuelve a los pulmones y el corazón debe bombear más.', wrong:['El tabique es justo lo que impide que se mezclen la sangre oxigenada y la desoxigenada.','Recuerda cuál ventrículo tiene la pared más gruesa y genera más presión.'] } };
BIO.brain.reto = { proposito:'Relacionar cada región del encéfalo con la función que controla.',
  observa:[ {id:'lobulo-occipital', txt:'Lóbulo occipital'}, {id:'cerebelo', txt:'Cerebelo'}, {id:'lobulo-frontal', txt:'Lóbulo frontal'} ],
  pista:'Prueba el panel "¿Qué se activa cuando…?" en la pestaña Animación.',
  pregunta:{ q:'Tras un golpe en la nuca, una persona ve borroso aunque sus ojos están sanos y camina tambaleándose. ¿Qué dos estructuras podrían estar afectadas?', ops:['Lóbulo frontal y lóbulo temporal','Lóbulo occipital y cerebelo','Tronco encefálico e hipocampo'], ok:1, fb:'Ambas están en la parte posterior: el occipital interpreta la visión y el cerebelo coordina el equilibrio y los movimientos.', wrong:['El frontal planifica y el temporal procesa la audición y la memoria; ninguno explica la visión borrosa ni el tambaleo.','El tronco controla funciones vitales y el hipocampo la memoria; busca las regiones de la visión y del equilibrio.'] } };
BIO.lungs.reto = { proposito:'Explicar el camino del aire hasta la sangre y qué hace eficiente el intercambio gaseoso.',
  observa:[ {id:'traquea', txt:'Tráquea'}, {id:'bronquiolos', txt:'Bronquiolos'}, {id:'alveolos', txt:'Alvéolos'}, {id:'diafragma', txt:'Diafragma'} ],
  pista:'Activa "Intercambio gaseoso" en la pestaña Animación y observa la lupa.',
  pregunta:{ q:'En el enfisema se destruyen las paredes de muchos alvéolos. ¿Por qué la persona se fatiga aunque respire más rápido?', ops:['Porque entra menos aire por la tráquea','Porque disminuye la superficie de intercambio: aunque llegue aire, pasa menos O₂ a la sangre','Porque el diafragma deja de moverse'], ok:1, fb:'Los alvéolos suman unos 70 m² de superficie. Al destruirse, esa superficie se reduce y el O₂ que difunde a la sangre por minuto disminuye, aunque la persona respire más.', wrong:['La vía aérea sigue abierta; el problema está en el lugar del intercambio.','El diafragma funciona; lo que falla es la superficie donde el O₂ pasa a la sangre.'] } };
BIO.cell.reto = { proposito:'Entender la célula como una fábrica organizada en la que cada organelo cumple una etapa.',
  observa:[ {id:'nucleo', txt:'Núcleo'}, {id:'rer', txt:'Retículo rugoso'}, {id:'golgi', txt:'Aparato de Golgi'}, {id:'mitocondria', txt:'Mitocondria'} ],
  pista:'Usa "Ver en acción" en cada organelo para ver hacia dónde viajan sus productos.',
  orden:{ q:'Una célula del páncreas fabrica y exporta insulina (una proteína). Ordena el recorrido desde la información hasta la salida:', seq:['Núcleo: el gen se copia en ARN mensajero','Ribosomas del retículo rugoso: se fabrica la proteína','Aparato de Golgi: se modifica y empaqueta','Vesícula de secreción: viaja por el citoplasma','Membrana plasmática: la insulina sale de la célula (exocitosis)'], fb:'Es la vía de secreción: núcleo → RER → Golgi → vesícula → membrana. La mitocondria aporta el ATP que necesita todo el proceso.' } };

/* ---------- Partes en detalle: {n, d, at:[x,y,z], sub?} ---------- */
const P = (list) => list.map(([n,d,at,sub]) => ({ n, d, at, sub }));
const PARTES = {
  corazon:{
    'ventriculo-izquierdo':P([['Ápex (punta del corazón)','Punto más inferior del corazón; se palpa entre la 5.ª y 6.ª costilla.',[0.92,-2.44,0.44]],['Miocardio grueso','Pared de 10–15 mm: genera la presión para todo el cuerpo.',[1.5,-0.65,-0.33]],['Músculos papilares y cuerdas tendinosas','En el interior: sujetan la válvula mitral para que no se invierta.',[0.75,-0.55,-0.3]],['Tracto de salida aórtico','Por aquí sale la sangre hacia la aorta.',[0.15,0.15,-0.1]]]),
    'ventriculo-derecho':P([['Cono arterial (infundíbulo)','Porción lisa que conduce la sangre hacia la arteria pulmonar.',[0.1,0.2,1.05],'cono'],['Pared delgada','De 3–5 mm: basta para enviar la sangre a los pulmones, que están muy cerca.',[-0.28,-1.25,1.18]],['Trabéculas carnosas','Relieves musculares de la pared interna.',[-0.4,-0.8,0.5]],['Entrada por la tricúspide','Recibe la sangre de la aurícula derecha.',[-0.85,0.02,0.2]]]),
    'auricula-derecha':P([['Orejuela derecha','Pequeño saco muscular que aumenta la capacidad de la aurícula.',[-0.55,1.15,0.75],'orejuela'],['Nodo sinoauricular','Marcapasos natural: aquí nace cada latido.',[-1.1,1.4,0.35]],['Desembocadura de las venas cavas','Entrada de la sangre que regresa del cuerpo.',[-1.35,0.15,-0.3]]]),
    'auricula-izquierda':P([['Orejuela izquierda','Prolongación en forma de oreja junto a la arteria pulmonar.',[1.45,0.95,0.4],'orejuela'],['Desembocadura de las 4 venas pulmonares','Entrada de la sangre oxigenada desde los pulmones.',[0.7,0.9,-1.25]],['Salida hacia la mitral','Paso hacia el ventrículo izquierdo.',[0.62,0.2,-0.35]]]),
    'aorta':P([['Aorta ascendente','Nace del ventrículo izquierdo; de su base salen las coronarias.',[-0.2,1.4,0.1],'main'],['Cayado aórtico','Arco que se dirige hacia la izquierda y hacia atrás.',[0.2,3.1,-0.45],'main'],['Tronco braquiocefálico','Irriga el brazo derecho y el lado derecho de la cabeza.',[-0.35,3.6,-0.2],'bt'],['Carótida común izquierda','Lleva sangre al lado izquierdo de la cabeza y el cerebro.',[0.36,3.65,-0.47],'cci'],['Subclavia izquierda','Irriga el brazo izquierdo.',[0.82,3.55,-0.8],'sci'],['Aorta descendente','Baja por el tórax y el abdomen repartiendo sangre a los órganos.',[1.0,-0.5,-1.4],'main']]),
    'arteria-pulmonar':P([['Tronco pulmonar','Sale del ventrículo derecho por delante de la aorta.',[0.42,1.3,0.52],'tronco'],['Arteria pulmonar derecha','Pasa por detrás de la aorta ascendente hacia el pulmón derecho.',[-1.2,1.9,-0.68],'der'],['Arteria pulmonar izquierda','Se dirige al pulmón izquierdo bajo el cayado aórtico.',[1.5,2.05,-0.3],'izq']]),
    'venas-pulmonares':P([['Venas pulmonares derechas','Superior e inferior: pasan por detrás de la aurícula derecha.',[-1.2,0.85,-1.25],'der'],['Venas pulmonares izquierdas','Superior e inferior: llegan desde el pulmón izquierdo.',[2.0,0.9,-0.9],'izq']]),
    'vena-cava-superior':P([['Tramo superior','Recoge la sangre de la cabeza, el cuello y los brazos.',[-1.05,3.3,0.0]],['Desembocadura','Entra en la aurícula derecha por arriba, sin válvula.',[-1.15,1.5,0.05]]]),
    'vena-cava-inferior':P([['Tramo inferior','Recoge la sangre del tronco, el abdomen y las piernas.',[-1.25,-2.2,-0.45]],['Desembocadura','Entra en la aurícula derecha por abajo.',[-1.15,0.2,-0.15]]]),
    'valvula-tricuspide':P([['Tres valvas','Se abren hacia el ventrículo y se cierran en la sístole.',[-0.85,0.02,0.2],'valvas'],['Anillo fibroso','Soporte que mantiene la forma de la válvula.',[-0.49,0.02,0.2],'anillo'],['Cuerdas tendinosas','Debajo: impiden que las valvas se inviertan.',[-0.8,-0.4,0.3]]]),
    'valvula-mitral':P([['Dos valvas','Anterior y posterior: única válvula con dos valvas.',[0.62,0.05,-0.35],'valvas'],['Anillo fibroso','Soporta la mayor presión del corazón.',[0.96,0.05,-0.35],'anillo'],['Cuerdas tendinosas','Unen las valvas a los músculos papilares.',[0.65,-0.35,-0.25]]]),
    'valvula-pulmonar':P([['Tres valvas semilunares','Con forma de media luna; se cierran solas por la presión del vaso.',[0.3,0.62,0.72],'valvas'],['Anillo','Unión entre el ventrículo derecho y el tronco pulmonar.',[0.6,0.6,0.72],'anillo']]),
    'valvula-aortica':P([['Tres valvas semilunares','Se abren en la sístole ventricular y se cierran en la diástole ("dub").',[0.1,0.38,-0.1],'valvas'],['Anillo','Unión entre el ventrículo izquierdo y la aorta.',[0.4,0.36,-0.1],'anillo'],['Origen de las coronarias','Justo encima de la válvula nacen las arterias coronarias.',[0.1,0.62,0.12]]]),
    'tabique':P([['Porción muscular','La mayor parte del tabique: gruesa y contráctil.',[0.2,-1.0,0.3]],['Porción membranosa','Zona fina y superior; allí suelen aparecer las comunicaciones interventriculares.',[0.05,0.1,0.1]]]),
    'vasos-coronarios':P([['Arteria coronaria derecha','Recorre el surco entre aurícula y ventrículo derechos.',[-1.35,0.15,0.85],'art'],['Descendente anterior','Baja entre los dos ventrículos hacia el ápex.',[0.4,-0.6,1.35],'art'],['Arteria circunfleja','Rodea el lado izquierdo por el surco auriculoventricular.',[1.5,0.3,0.4],'art'],['Venas cardíacas','Recogen la sangre usada del miocardio hacia el seno coronario.',[0.62,-0.9,1.3],'ven'],['Grasa epicárdica','Tejido adiposo normal que rodea y protege a los vasos.',[-0.8,0.3,1.05],'grasa']])
  },
  cerebro:{
    'lobulo-frontal':P([['Corteza prefrontal','Planifica, decide y controla los impulsos.',[2.2,0.5,0.9]],['Corteza motora primaria','Envía las órdenes de movimiento voluntario.',[0.35,1.55,1.0]],['Área de Broca','Necesaria para producir el habla.',[1.05,0.15,1.45]]]),
    'lobulo-parietal':P([['Corteza somatosensorial','Recibe tacto, temperatura, dolor y posición del cuerpo.',[-0.3,1.6,0.95]],['Lobulillo parietal','Integra la información espacial: dónde están las cosas.',[-1.1,1.2,1.2]]]),
    'lobulo-temporal':P([['Corteza auditiva','Recibe e interpreta los sonidos.',[0.1,0.0,1.55]],['Área de Wernicke','Da significado a las palabras que escuchamos.',[-0.75,0.15,1.45]],['Polo temporal','Extremo anterior: memoria y reconocimiento.',[1.2,-0.5,1.2]]]),
    'lobulo-occipital':P([['Corteza visual primaria','Recibe la información de la retina.',[-2.4,0.45,0.5]],['Áreas visuales de asociación','Reconocen formas, colores y movimiento.',[-1.9,0.9,1.1]]]),
    'cerebelo':P([['Hemisferios cerebelosos','Coordinan los movimientos de las extremidades.',[-1.55,-1.1,1.3]],['Vermis','Porción central: equilibrio y postura.',[-2.3,-1.05,0]],['Folias','Láminas que aumentan la superficie de la corteza cerebelosa.',[-1.2,-0.7,1.1]]]),
    'tronco':P([['Mesencéfalo','Reflejos visuales y auditivos; conecta con el cerebro.',[-0.2,-0.4,0.35]],['Puente (protuberancia)','Relevo entre cerebro y cerebelo; ritmo respiratorio.',[-0.4,-1.2,0.45]],['Bulbo raquídeo','Centros respiratorio y cardiovascular.',[-0.58,-2.0,0.3]]]),
    'medula':P([['Cordón medular','Conduce las señales entre el encéfalo y el cuerpo.',[-0.66,-3.2,0.2],'cordon'],['Nervios espinales','31 pares salen entre las vértebras hacia todo el cuerpo.',[-0.55,-3.4,0.9],'nervios']]),
    'cuerpo-calloso':P([['Rodilla (anterior)','Une los lóbulos frontales.',[1.0,0.45,0]],['Tronco','Porción central del haz de fibras.',[0,0.9,0]],['Esplenio (posterior)','Une los lóbulos occipitales y parietales.',[-1.05,0.45,0]]]),
    'hipofisis':P([['Adenohipófisis (anterior)','Produce hormona del crecimiento, TSH, ACTH, FSH, LH y prolactina.',[0.46,-1.0,0.15],'adeno'],['Neurohipófisis (posterior)','Libera oxitocina y vasopresina fabricadas en el hipotálamo.',[0.3,-1.0,0.12],'neuro'],['Tallo hipofisario','Conecta la hipófisis con el hipotálamo.',[0.35,-0.72,0.05],'tallo']]),
    'hipocampo':P([['Cabeza (anterior)','Porción más gruesa, junto a la amígdala.',[0.55,-0.5,0.85]],['Cola (posterior)','Se curva hacia arriba y atrás.',[-0.9,-0.22,0.72]]])
  },
  pulmones:{
    'pulmon-derecho':P([['Lóbulo superior','Separado del medio por la cisura horizontal.',[-2.3,1.0,0.6],'sup'],['Lóbulo medio','Solo existe en el pulmón derecho.',[-2.2,-0.55,1.0],'med'],['Lóbulo inferior','El más grande; separado por la cisura oblicua.',[-2.4,-1.2,-0.6],'inf'],['Vértice (ápex)','Asciende por encima de la clavícula.',[-1.6,1.95,0.1]]]),
    'pulmon-izquierdo':P([['Lóbulo superior','Incluye la língula, equivalente al lóbulo medio.',[2.3,0.9,0.5],'sup'],['Lóbulo inferior','Separado por la cisura oblicua.',[2.4,-1.2,-0.6],'inf'],['Escotadura cardíaca','Hueco que deja espacio para el corazón.',[0.95,-0.6,0.9]]]),
    'traquea':P([['Anillos de cartílago en C','Mantienen la tráquea siempre abierta.',[0.35,2.6,0.2],'anillos'],['Pared membranosa','Parte posterior sin cartílago, junto al esófago.',[0,2.6,-0.4],'membranosa'],['Carina','Punto donde la tráquea se divide en dos bronquios.',[0,1.55,0.25]]]),
    'laringe':P([['Cartílago tiroides','Forma la "nuez de Adán"; protege las cuerdas vocales.',[0,4.0,0.6],'tiroides'],['Cartílago cricoides','Anillo completo que une la laringe con la tráquea.',[0.38,3.55,0.1],'cricoides'],['Epiglotis','Tapa que cierra la vía aérea al tragar.',[0,4.55,-0.3],'epiglotis'],['Hueso hioides','Hueso en U del que cuelga la laringe.',[0.45,4.62,0.2],'hioides']]),
    'bronquios':P([['Bronquio principal derecho','Más corto, ancho y vertical.',[-0.45,1.3,0.12]],['Bronquio principal izquierdo','Más largo y horizontal: pasa bajo el cayado aórtico.',[0.55,1.2,0.12]],['Bronquios lobulares','Uno para cada lóbulo pulmonar.',[-1.4,0.6,0.12]]]),
    'alveolos':P([['Saco alveolar','Racimo de alvéolos al final del conducto alveolar.',[-4.0,-1.75,1.35],'alveolos'],['Bronquiolo respiratorio','Último tramo de la vía aérea antes de los alvéolos.',[-3.25,-1.55,1.15],'bronquiolo']]),
    'capilares':P([['Arteriola (sangre pobre en O₂)','Llega desde la arteria pulmonar.',[-4.37,-1.53,1.35]],['Vénula (sangre oxigenada)','Sale hacia las venas pulmonares.',[-3.2,-2.55,1.35]]]),
    'diafragma':P([['Cúpula derecha','Más alta porque el hígado está debajo.',[-1.75,-1.5,0.3]],['Cúpula izquierda','Algo más baja; debajo están el estómago y el bazo.',[1.65,-1.6,0.3]],['Centro tendinoso','Zona fibrosa central sobre la que se apoya el corazón.',[0,-2.05,0.3]]]),
    'pleura':P([['Pleura visceral','Recubre la superficie del pulmón.',[-2.95,0.3,0.2]],['Espacio pleural','Capa fina de líquido con presión negativa.',[-3.0,-0.5,0.3]]]),
    'vasos-pulmonares':P([['Arterias pulmonares (azul)','Acompañan a los bronquios con sangre pobre en O₂.',[-0.6,1.35,0.5],'art'],['Venas pulmonares (rojo)','Salen por la parte inferior del hilio hacia la aurícula izquierda.',[-0.9,0.45,-0.45],'ven']])
  },
  'celula-animal':{
    'nucleo':P([['Envoltura nuclear doble','Dos membranas que separan el ADN del citoplasma.',[0.3,1.3,0.25],'env'],['Poros nucleares','Canales por donde sale el ARN y entran proteínas.',[-0.55,0.75,-0.55],'poros'],['Cromatina','ADN enrollado en proteínas (histonas).',[0.25,0.1,0.45],'crom']]),
    'mitocondria':P([['Membrana externa','Lisa: envuelve a toda la mitocondria.',[-1.95,1.3,0.7],'ext'],['Crestas','Pliegues de la membrana interna donde se forma el ATP.',[-1.95,0.95,0.8],'int'],['Matriz','Interior donde ocurre el ciclo de Krebs.',[-2.05,0.8,0.55]]]),
    'golgi':P([['Cara cis','Recibe las vesículas que llegan del retículo.',[-1.0,-0.4,1.2]],['Cisternas','Sacos aplanados donde se modifican las proteínas.',[-1.25,-0.55,1.55],'cist'],['Vesículas','Transportan los productos hacia la membrana o los lisosomas.',[-1.7,-0.95,2.1],'ves']]),
    'membrana':P([['Bicapa lipídica','Se ve en el borde del corte: dos capas de fosfolípidos.',[1.3,2.2,2.1],'bicapa'],['Proteínas de membrana','Canales, transportadores y receptores.',[-2.6,1.8,-1.0],'prot']]),
    'rer':P([['Cisternas','Sacos aplanados y conectados con la envoltura nuclear.',[-1.3,0.35,-0.9],'cist'],['Ribosomas adheridos','Le dan el aspecto "rugoso" y fabrican proteínas.',[-1.55,-0.25,-0.45],'ribo']]),
    'centriolos':P([['Nueve tripletes de microtúbulos','Organización 9×3 típica de los centríolos.',[-0.35,1.3,0.75],'rods'],['Material pericentriolar','Nube de proteínas desde donde crecen los microtúbulos.',[-0.1,1.1,0.95],'pcm']]),
    'lisosomas':P([['Membrana','Aísla las enzimas digestivas del resto de la célula.',[1.25,-1.73,1.2],'memb'],['Contenido ácido','Unas 50 enzimas que digieren moléculas y organelos viejos.',[1.25,-1.95,1.15],'cont']])
  }
};
Object.entries(PARTES).forEach(([modelo, map]) => { const D = { corazon:BIO.heart, cerebro:BIO.brain, pulmones:BIO.lungs, 'celula-animal':BIO.cell }[modelo]; D.structures.forEach(s => { if (map[s.id]) s.partes = map[s.id]; }); });

/* Eyebrows por área */
BIO.heart.eyebrow = 'Cuerpo humano y salud · Unidad 6 · Sistema circulatorio';
BIO.brain.eyebrow = 'Cuerpo humano y salud · Unidad 6 · Sistema nervioso';
BIO.lungs.eyebrow = 'Cuerpo humano y salud · Unidad 6 · Sistema respiratorio';
</script>
