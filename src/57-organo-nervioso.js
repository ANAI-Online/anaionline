<script>
/* =====================================================================
   ÓRGANO: SISTEMA NERVIOSO COMPLETO — la red, no solo el encéfalo
   Datos (BIO.nerves) + modelo 3D procedimental (buildNerves)
   Ruta: #/explorar/nervioso
   El encéfalo por dentro (lóbulos, cerebelo, estructuras profundas) vive
   en el módulo del cerebro: aquí se trata como un bloque y se remite allá.
   ===================================================================== */
BIO.nerves = {
  capasHint: "Sugerencia: apaga la capa «Meninges» para ver la médula desnuda, y deja solo «Neurona y sinapsis (lupa)» para quedarte con la escala celular. Para la anatomía del encéfalo por dentro, usa el enlace al modelo del cerebro.",
  id:"nervioso", nombre:"Sistema nervioso completo", unidad:6, dominio:"anat",
  eyebrow:"Atlas 3D · Unidad 6 · Sistema nervioso", em:"⚡",
  intro:"El encéfalo no trabaja solo: cuelga de él una red de cables que llega hasta la punta de los dedos del pie. Recorre la médula, las raíces, los plexos y los nervios; compara el simpático con el parasimpático; y entra con la lupa en una neurona para ver cómo viaja el impulso y cómo salta de una célula a otra.",
  nota:"Modelo tridimensional simplificado con fines educativos. El cuerpo no se dibuja: solo la red nerviosa, con muchos menos nervios de los que existen en realidad (hay 31 pares de nervios raquídeos y millones de ramas). El encéfalo se representa como un bloque: su anatomía interna está en el modelo del cerebro. La neurona y la sinapsis de la lupa están ampliadas decenas de miles de veces: una sinapsis real mide unas 20 milésimas de micra de hendidura y no se ve ni con microscopio óptico. El corazón y el estómago aparecen solo como siluetas, para situar hacia dónde van las ramas del nervio vago.",
  focusR:8, radius:20, target:[2.0,1.1,0], phi:1.5, theta:0.12, floor:-5.2, floorSize:17,
  capas:[
    {id:"central", n:"Sistema nervioso central"},
    {id:"cubiertas", n:"Meninges y líquido cefalorraquídeo"},
    {id:"periferico", n:"Nervios periféricos"},
    {id:"autonomo", n:"Sistema nervioso autónomo"},
    {id:"lupa", n:"Neurona y sinapsis (lupa)"}
  ],
  opacityCapas:["central"], opacityLabel:"Transparencia del encéfalo y la médula", opacityDefault:1,
  activity:"explorar-nervioso", guidedActivity:"guiada-nervioso", badge:"neuroexplorador", seenThreshold:8,
  related:[
    {t:"Explorar el cerebro (anatomía del encéfalo)", href:"#/explorar/cerebro"},
    {t:"Tejido nervioso al microscopio", href:"#/microscopio/nervioso"},
    {t:"Cuerpo humano y salud", href:"#/area/cuerpo"}
  ],
  reto:{
    proposito:"Entender que el sistema nervioso es una red con dos lenguajes: dentro de cada neurona la señal es eléctrica y entre neuronas es química, y que ese cambio de lenguaje es justamente lo que permite integrar, modular y no equivocarse de dirección.",
    pista:"La neurona y la sinapsis están en la lupa, los dos círculos azules de la derecha. Las animaciones están en la pestaña Animación: empieza por «Potencial de acción».",
    observa:[
      {id:"neurona", txt:"La neurona completa: dónde nace el impulso y por qué la mielina va a trozos"},
      {id:"sinapsis", txt:"La sinapsis química: vesículas, hendidura, receptores y recaptación"},
      {id:"raices", txt:"Las raíces de la médula: una entra sensaciones, la otra saca órdenes"},
      {id:"vago", txt:"El nervio vago: el freno parasimpático que llega al corazón y al tubo digestivo"}
    ],
    pregunta:{
      q:"Ya viste las dos escalas. Dentro del axón la señal viaja como electricidad y entre dos neuronas se convierte en una sustancia química. ¿Qué gana el cuerpo con ese cambio de lenguaje, que además lo hace más lento?",
      ops:[
        "Ahorra energía: la sinapsis química no gasta ATP",
        "Gana control: la señal solo puede ir en un sentido y cada sinapsis puede sumarse, restarse o modularse antes de decidir si la neurona siguiente dispara",
        "Gana velocidad: el neurotransmisor cruza más rápido que el impulso eléctrico"
      ],
      ok:1,
      fb:"Exacto. La sinapsis química cuesta tiempo (entre 0,5 y 1 milisegundo) y cuesta energía, pero a cambio impone un sentido único —solo el lado presináptico tiene vesículas— y convierte cada neurona en un pequeño centro de decisión: recibe miles de señales excitadoras e inhibidoras y solo dispara si la suma alcanza el umbral en el cono axónico. Esa es la base del cálculo nervioso, y también el punto donde actúan los medicamentos y las drogas.",
      wrong:[
        "Ocurre lo contrario: fabricar vesículas, bombear calcio y recuperar el neurotransmisor cuesta bastante energía. Existen sinapsis eléctricas (uniones comunicantes) que son más baratas y más rápidas, pero casi no se pueden modular.",
        "La sinapsis química es el paso más lento de todo el recorrido. Lo que aporta no es velocidad, sino dirección y control."
      ]
    }
  },
  structures:[
    {id:"encefalo", nombre:"Encéfalo (bloque)", capa:"central", color:"#DCA894", pos:[0,5.05,0], lbl:[-2.30,5.85,0.50],
      n1:"El centro de mando alojado en el cráneo: cerebro, cerebelo y tronco encefálico. Aquí se muestra como un bloque, porque su anatomía interna tiene su propio modelo.",
      n2:"Pesa alrededor de 1,4 kg, apenas el 2 % del peso del cuerpo, y consume cerca del 20 % del oxígeno y de la glucosa que gastamos en reposo. Junto con la médula espinal forma el sistema nervioso central: la parte que decide e interpreta. Todo lo que entra y sale de él viaja por los nervios craneales y por la médula. Para ver los lóbulos, el cerebelo por dentro, el tálamo o el hipocampo, abre el modelo del cerebro con el enlace de arriba.",
      n3:"El encéfalo no almacena reservas de energía: si el flujo de sangre se interrumpe, en unos 10 segundos se pierde la conciencia y en pocos minutos empieza el daño irreversible. De ahí que el cuerpo proteja su irrigación por encima de casi todo lo demás, y que el tronco encefálico ajuste la presión arterial segundo a segundo. Un adulto tiene unos 86 mil millones de neuronas, y aproximadamente otras tantas células gliales que las sostienen, las alimentan y las aíslan.",
      dato:"Es el 2 % del peso del cuerpo y gasta el 20 % de su oxígeno.",
      conecta:["tronco","cerebelo","meninges","medula"], temas:["Sistema nervioso central","Metabolismo","Anatomía"],
      partes:[
        {n:"Hemisferios cerebrales", d:"La masa plegada de la corteza. Sus lóbulos y funciones están detallados en el modelo del cerebro.", at:[0,5.35,0.1], sub:"cerebro"},
        {n:"Superficie plegada", d:"Los pliegues (circunvoluciones) multiplican la superficie de corteza que cabe en el cráneo.", at:[0.55,5.05,0.55], sub:"cerebro"},
        {n:"Base del encéfalo", d:"Por aquí salen los nervios craneales y se continúa con el tronco encefálico.", at:[0,4.55,0.0], sub:"cerebro"}
      ],
      quiz:{q:"¿Por qué una interrupción breve del riego sanguíneo daña tan rápido al encéfalo?", ops:["Porque es el órgano más grande del cuerpo","Porque gasta muchísima energía y no guarda reservas de glucosa ni de oxígeno","Porque no tiene vasos sanguíneos propios"], ok:1,
        fb:"Consume el 20 % del oxígeno del cuerpo en reposo y depende del suministro continuo de la sangre, minuto a minuto.",
        wrong:["Ni de lejos: pesa alrededor de 1,4 kg. Lo que lo hace vulnerable es su gasto, no su tamaño.","Está muy vascularizado: recibe alrededor del 15 % de la sangre que expulsa el corazón en cada minuto."]}},

    {id:"tronco", nombre:"Tronco encefálico", capa:"central", color:"#CBA983", pos:[0,4.05,0.0], lbl:[-2.50,5.00,0.50],
      n1:"El tallo que une el encéfalo con la médula espinal: mesencéfalo, puente y bulbo raquídeo.",
      n2:"Por él pasan todas las vías que suben y bajan entre el cuerpo y el cerebro, y en él se cruzan la mayoría: por eso el hemisferio izquierdo maneja el lado derecho del cuerpo. Además contiene los centros que controlan la respiración, la frecuencia cardíaca y la presión arterial, y de él nacen diez de los doce pares de nervios craneales, entre ellos el vago.",
      n3:"La formación reticular, una red difusa de neuronas repartida por el tronco, regula el nivel de alerta: mantiene despierta a la corteza y filtra qué estímulos merecen atención. Una lesión grave del tronco impide respirar de forma autónoma, y por eso la muerte encefálica se define por la pérdida irreversible de sus funciones. Aquí empieza también la vía del reflejo del vómito, de la tos y del estornudo.",
      dato:"En el tronco se cruzan las vías: cada mitad del cerebro maneja la mitad opuesta del cuerpo.",
      conecta:["encefalo","medula","vago","cerebelo"], temas:["Funciones vitales","Vías nerviosas","Nervios craneales"],
      quiz:{q:"¿Qué consecuencia tiene que las vías se crucen en el tronco encefálico?", ops:["Que cada hemisferio controla y siente el lado opuesto del cuerpo","Que las señales llegan al doble de velocidad","Que el cerebelo recibe la información dos veces"], ok:0,
        fb:"Por eso una lesión en el hemisferio izquierdo debilita el lado derecho del cuerpo.",
        wrong:["Cruzarse no cambia la velocidad: la fija el grosor del axón y la mielina.","El cerebelo recibe su propia información; el cruce no la duplica."]}},

    {id:"cerebelo", nombre:"Cerebelo", capa:"central", color:"#B183C4", pos:[0,4.3,-0.62], lbl:[1.80,4.95,0.80],
      n1:"La estructura plegada que cuelga por detrás del tronco. Afina y coordina el movimiento, el equilibrio y la postura.",
      n2:"No decide moverse: compara la orden que salió de la corteza con lo que de verdad están haciendo los músculos y las articulaciones, y corrige el error sobre la marcha. Recibe esa información de vuelta por los nervios periféricos y del oído interno. Por eso podemos caminar, escribir o tocar un instrumento sin pensar en cada movimiento.",
      n3:"Ocupa el 10 % del volumen del encéfalo pero contiene más de la mitad de sus neuronas, empaquetadas en láminas finísimas llamadas folias. El alcohol deprime especialmente su funcionamiento: la marcha inestable y la dificultad para tocarse la nariz con el dedo son signos cerebelosos, y son también la base de las pruebas de campo que aplica la policía de tránsito.",
      dato:"Es el 10 % del volumen del encéfalo y tiene más de la mitad de sus neuronas.",
      conecta:["tronco","medula","encefalo"], temas:["Coordinación","Equilibrio","Aprendizaje motor"],
      quiz:{q:"Alguien camina con inestabilidad y no acierta a tocarse la nariz con el dedo. ¿Qué parte está funcionando mal?", ops:["El cerebelo","El bulbo raquídeo","Las raíces dorsales"], ok:0,
        fb:"Son signos cerebelosos clásicos: la fuerza está conservada, lo que falla es la precisión y la coordinación del movimiento.",
        wrong:["El bulbo controla respiración y latido; si fallara, el problema sería mucho más grave que la coordinación.","Si fallaran las raíces dorsales se perdería la sensibilidad de una zona concreta, no la coordinación general."]}},

    {id:"medula", nombre:"Médula espinal y sus segmentos", capa:"central", color:"#E3C79B", pos:[0,1.3,0.02], lbl:[-2.90,-0.10,0.50],
      n1:"Un cordón nervioso de unos 43 a 45 cm y 1 cm de grosor, alojado dentro del canal de la columna vertebral. Es autopista y centro de decisión a la vez.",
      n2:"Se divide en cuatro regiones —cervical, torácica, lumbar y sacra— de las que salen 31 pares de nervios raquídeos: 8 cervicales, 12 torácicos, 5 lumbares, 5 sacros y 1 coccígeo. Presenta dos engrosamientos, el cervical y el lumbosacro, justo donde nacen los nervios de los brazos y de las piernas. Dentro, la sustancia gris (los cuerpos de las neuronas) forma una mariposa central y la sustancia blanca (los axones con mielina) la rodea: es la disposición inversa a la del encéfalo.",
      n3:"La médula deja de crecer antes que la columna, así que en el adulto termina a la altura de la primera o segunda vértebra lumbar, en el cono medular; por debajo solo quedan raíces sueltas, la cola de caballo. Gracias a eso la punción lumbar se hace por debajo de L3: se atraviesa el líquido cefalorraquídeo sin tocar la médula. En el Ecuador, los traumatismos de médula por siniestros de tránsito —autos, motos— y por caídas y clavados en agua poco profunda están entre las causas más frecuentes de discapacidad física adquirida en personas jóvenes. El nivel importa: una lesión cervical alta compromete el nervio frénico (C3 a C5) y con él la respiración; una lesión torácica o lumbar afecta a las piernas y al control de esfínteres, pero respeta los brazos.",
      dato:"La médula termina en L1–L2: por eso la punción lumbar se hace más abajo, sin tocarla.",
      conecta:["raices","raquideos","tronco","meninges","simpatico"], temas:["Sistema nervioso central","Reflejos","Traumatismos","Salud en el Ecuador"],
      partes:[
        {n:"Región cervical", d:"Con el engrosamiento cervical (C5–T1), de donde salen los nervios del brazo. Por encima de C4 está en juego la respiración.", at:[0,3.05,0.04], sub:"cervical"},
        {n:"Región torácica", d:"La más larga y la más delgada. De T1 a L2 salen además las fibras simpáticas hacia la cadena paravertebral.", at:[0,2.05,0.02], sub:"toracica"},
        {n:"Engrosamiento lumbosacro", d:"De aquí salen los nervios de la pierna, incluido el ciático.", at:[0,0.15,0.02], sub:"lumbar"},
        {n:"Cono medular y cola de caballo", d:"El extremo afilado a la altura de L1–L2 y el haz de raíces sueltas que sigue bajando dentro del canal.", at:[0,-1.25,0.05], sub:"cauda"}
      ],
      quiz:{q:"¿Por qué la punción lumbar se hace por debajo de la tercera vértebra lumbar?", ops:["Porque ahí la columna es más blanda","Porque la médula termina alrededor de L1–L2 y más abajo solo hay raíces flotando en líquido","Porque por debajo de L3 no hay líquido cefalorraquídeo"], ok:1,
        fb:"Las raíces de la cola de caballo se apartan al entrar la aguja; la médula, que no podría apartarse, ya terminó más arriba.",
        wrong:["El hueso es igual de duro arriba y abajo; lo que cambia es qué hay dentro del canal.","Al contrario: ahí el espacio con líquido cefalorraquídeo es amplio, y por eso es el lugar elegido."]}},

    {id:"meninges", nombre:"Meninges y líquido cefalorraquídeo", capa:"cubiertas", color:"#9CC8DE", pos:[0,2.0,0.0], lbl:[-3.40,4.15,0.50], anchor:[0.17,1.99,0.24],
      n1:"Las tres membranas que envuelven el encéfalo y la médula —duramadre, aracnoides y piamadre— y el líquido transparente que circula entre ellas.",
      n2:"La duramadre es dura y resistente, la piamadre es finísima y se pega al tejido nervioso, y entre ambas está la aracnoides. El líquido cefalorraquídeo llena el espacio subaracnoideo: unos 150 mL que hacen flotar al encéfalo, lo amortiguan ante los golpes y se llevan los desechos. Se producen alrededor de 500 mL al día en los plexos coroideos de los ventrículos, así que todo el líquido se renueva tres o cuatro veces cada día.",
      n3:"Al flotar en ese líquido, el encéfalo pesa dentro del cráneo apenas unos 50 g en lugar de 1.400 g: el empuje del líquido sostiene casi todo su peso y evita que se aplaste contra la base del cráneo. La inflamación de las meninges es la meningitis, y algunas formas se previenen con vacunas incluidas en el esquema del Ministerio de Salud Pública del Ecuador. Si el líquido no drena bien se acumula y aumenta la presión dentro del cráneo: eso es la hidrocefalia.",
      dato:"El encéfalo flota: dentro del líquido pesa unos 50 g en lugar de 1.400 g.",
      conecta:["encefalo","medula","raices"], temas:["Protección","Homeostasis","Salud pública"],
      partes:[
        {n:"Duramadre", d:"La capa externa, gruesa y resistente, pegada al hueso del cráneo y al canal vertebral.", at:[0,2.6,0.32], sub:"dura"},
        {n:"Espacio subaracnoideo con líquido cefalorraquídeo", d:"Donde circula el líquido que amortigua y alimenta. Es el espacio al que entra la aguja en una punción lumbar.", at:[0,1.1,0.3], sub:"dura"},
        {n:"Piamadre", d:"La capa interna, transparente, adherida a la superficie del tejido nervioso.", at:[0,3.0,0.2], sub:"dura"}
      ],
      quiz:{q:"¿Cuál es la función principal del líquido cefalorraquídeo?", ops:["Transportar oxígeno a las neuronas","Hacer flotar y amortiguar el encéfalo y la médula, y arrastrar desechos","Producir los impulsos nerviosos"], ok:1,
        fb:"Sin ese colchón líquido, el peso del propio encéfalo dañaría sus estructuras inferiores ante cualquier movimiento brusco.",
        wrong:["El oxígeno lo transporta la sangre, a través de una red capilar muy densa.","Los impulsos los generan las neuronas; el líquido es un medio de protección y limpieza, no una fuente de señales."]}},

    {id:"raices", nombre:"Raíces dorsal y ventral con el ganglio raquídeo", capa:"periferico", color:"#C4802F", pos:[0.5,2.12,-0.1], lbl:[-3.10,0.75,0.50],
      n1:"En cada segmento, la médula se conecta con el cuerpo por dos raíces: una detrás, que trae sensaciones, y otra delante, que saca órdenes. Se unen enseguida en un solo nervio.",
      n2:"La raíz dorsal (posterior) es sensitiva y lleva incorporado un abultamiento, el ganglio raquídeo, donde están los cuerpos de las neuronas que traen la información del tacto, la temperatura y el dolor. La raíz ventral (anterior) es motora: por ella salen los axones de las motoneuronas que están en el asta anterior de la médula. Al unirse ambas raíces nace el nervio raquídeo, que ya es mixto.",
      n3:"Esta separación se conoce como ley de Bell-Magendie y fue de los primeros hallazgos experimentales de la fisiología del siglo XIX: al seccionar una raíz se perdía la sensibilidad y al seccionar la otra, el movimiento. Tiene consecuencias prácticas: cuando una hernia de disco comprime una raíz concreta, el dolor y el hormigueo siguen exactamente la franja de piel que esa raíz inerva —su dermatoma—, y eso permite decir qué vértebra está afectada sin abrir nada. El virus de la varicela se queda escondido toda la vida en los ganglios raquídeos y, si se reactiva, produce el herpes zóster siguiendo esa misma franja.",
      dato:"Detrás entra lo que sientes, delante sale lo que haces. Siempre en ese orden.",
      conecta:["medula","raquideos","simpatico"], temas:["Vías nerviosas","Sensibilidad","Movimiento"],
      partes:[
        {n:"Raíz dorsal (sensitiva)", d:"Entra por detrás. Trae el tacto, la temperatura, el dolor y la posición del cuerpo.", at:[0.42,2.16,-0.24], sub:"dorsal"},
        {n:"Ganglio raquídeo", d:"El abultamiento de la raíz dorsal donde viven los cuerpos de las neuronas sensitivas.", at:[0.58,2.08,-0.30], sub:"ganglio"},
        {n:"Raíz ventral (motora)", d:"Sale por delante con los axones de las motoneuronas del asta anterior.", at:[0.42,2.02,0.20], sub:"ventral"}
      ],
      quiz:{q:"Una lesión destruye únicamente la raíz dorsal de un segmento. ¿Qué le ocurre a esa persona?", ops:["Pierde la fuerza de esa zona pero sigue sintiendo","Pierde la sensibilidad de esa franja de piel pero conserva el movimiento","No nota ningún cambio"], ok:1,
        fb:"La raíz dorsal es la puerta de entrada de la sensibilidad; la salida motora, por la raíz ventral, sigue intacta.",
        wrong:["Es justo al revés: la fuerza depende de la raíz ventral, que está delante.","El cambio es evidente: aparece una franja de piel anestesiada, con los límites del dermatoma correspondiente."]}},

    {id:"raquideos", nombre:"Nervios raquídeos", capa:"periferico", color:"#D6BE55", pos:[0.75,0.6,0.0], lbl:[-2.90,-0.95,0.50], anchor:[-0.73,0.57,0.12],
      n1:"Los 31 pares de nervios mixtos que salen de la médula entre las vértebras y reparten fibras por todo el cuerpo.",
      n2:"Cada nervio raquídeo nace de la unión de una raíz dorsal y una ventral, sale por el agujero de conjunción entre dos vértebras y enseguida se divide en una rama posterior, para los músculos y la piel de la espalda, y una rama anterior, mucho más gruesa, que va hacia los lados y el frente del cuerpo. Un nervio no es una sola célula: es un cable colectivo con miles de axones envueltos en vainas de tejido conectivo, con sus propios vasos sanguíneos.",
      n3:"Cada nervio raquídeo abastece una franja de piel, el dermatoma, y un grupo de músculos, el miotoma. Los mapas de dermatomas son una herramienta diagnóstica de todos los días: el hormigueo del dedo meñique apunta a C8, el de la cara externa del pie a S1. A diferencia de los del sistema nervioso central, los axones de los nervios periféricos pueden regenerarse si la vaina que los rodea queda intacta, aunque avanzan despacio: alrededor de 1 mm al día, es decir, unos 3 cm al mes.",
      dato:"Un nervio periférico seccionado puede regenerarse, pero avanza solo 1 mm al día.",
      conecta:["raices","plexos","medula","simpatico"], temas:["Sistema nervioso periférico","Regeneración","Dermatomas"],
      quiz:{q:"¿Por qué se dice que los nervios raquídeos son mixtos?", ops:["Porque mezclan sangre y líquido cefalorraquídeo","Porque llevan a la vez fibras sensitivas y fibras motoras","Porque se mezclan con los huesos de la columna"], ok:1,
        fb:"Al unirse la raíz dorsal con la ventral, el nervio resultante lleva información en los dos sentidos.",
        wrong:["Ningún nervio transporta sangre: los vasos van junto a él, no dentro de sus fibras.","Atraviesan un agujero entre dos vértebras, pero no se mezclan con el hueso."]}},

    {id:"plexos", nombre:"Plexos braquial y lumbosacro", capa:"periferico", color:"#C9AE41", pos:[1.1,2.7,0.15], lbl:[-3.00,2.45,0.50],
      n1:"Dos redes donde varios nervios raquídeos se entrecruzan e intercambian fibras antes de formar los nervios grandes de los brazos y de las piernas.",
      n2:"El plexo braquial reúne las raíces de C5 a T1 y de él salen los nervios musculocutáneo, axilar, radial, mediano y cubital. El plexo lumbosacro reúne de L1 a S4 y da los nervios femoral, obturador y ciático. El entrecruzamiento tiene una ventaja: cada músculo del brazo o de la pierna acaba recibiendo fibras de varios segmentos medulares distintos, así que la lesión de una sola raíz rara vez deja un músculo completamente paralizado.",
      n3:"El plexo braquial pasa por un espacio estrecho entre la clavícula y la primera costilla, y esa vecindad lo hace vulnerable: un tirón brusco del brazo hacia abajo o de la cabeza hacia el lado opuesto puede arrancar sus raíces superiores (parálisis de Erb), algo que ocurre en caídas de motocicleta y en partos difíciles. Dormir con el brazo colgando del respaldo de una silla comprime el nervio radial contra el húmero y produce la llamada «parálisis del sábado por la noche», que casi siempre se recupera sola en semanas.",
      dato:"Gracias al entrecruzamiento, perder una raíz rara vez paraliza un músculo del todo.",
      conecta:["raquideos","nervios-brazo","ciatico","medula"], temas:["Sistema nervioso periférico","Anatomía","Traumatismos"],
      partes:[
        {n:"Plexo braquial (C5–T1)", d:"La red del hombro, de la que salen los nervios del brazo y de la mano.", at:[1.15,2.70,0.18], sub:"braquial"},
        {n:"Plexo lumbosacro (L1–S4)", d:"La red de la pelvis, de la que salen el femoral, el obturador y el ciático.", at:[0.85,-0.85,0.08], sub:"lumbosacro"}
      ],
      quiz:{q:"¿Qué ventaja aporta que los nervios se entrecrucen en un plexo?", ops:["Que la señal viaja más rápido","Que cada músculo recibe fibras de varias raíces, así que perder una sola raíz no lo paraliza por completo","Que se ahorra tejido nervioso"], ok:1,
        fb:"Es una redundancia deliberada: el mismo músculo tiene varias fuentes de inervación.",
        wrong:["La velocidad depende del grosor del axón y de su mielina, no del trazado del recorrido.","Al contrario: entrecruzarse exige más longitud total de fibra, no menos."]}},

    {id:"nervios-brazo", nombre:"Nervios de la extremidad superior", capa:"periferico", color:"#D2BC4E", pos:[2.5,1.2,0.28], lbl:[-3.20,-1.80,0.50], anchor:[-2.47,1.2,0.33],
      n1:"Los tres nervios grandes que recorren el brazo y la mano: el mediano, el cubital y el radial.",
      n2:"El mediano baja por la cara anterior del antebrazo y entra a la mano por el túnel del carpo; da sensibilidad al pulgar, al índice y al medio y mueve buena parte de los flexores. El cubital pasa por detrás del codo, muy superficial, y se encarga del meñique y del anular y de los músculos finos de la mano. El radial rodea el húmero por detrás y es el que levanta la muñeca y los dedos. Entre los tres reparten órdenes y sensaciones a un miembro que hace movimientos de una precisión enorme.",
      n3:"El «hueso de la risa» no es un hueso: es el nervio cubital golpeado contra el canal epitroclear del codo, donde no tiene casi nada que lo proteja, y por eso el golpe se siente como corriente en el meñique. El síndrome del túnel carpiano es la compresión del nervio mediano en la muñeca: produce hormigueo nocturno en los tres primeros dedos y es frecuente en trabajos con movimientos repetitivos o vibración, desde la peluquería hasta la cosecha. La corteza motora dedica a la mano una superficie enorme, desproporcionada respecto a su tamaño: mover un dedo con precisión ocupa más cerebro que mover todo el tronco.",
      dato:"El «hueso de la risa» es en realidad el nervio cubital golpeado en el codo.",
      conecta:["plexos","raquideos","sinapsis"], temas:["Sistema nervioso periférico","Anatomía","Salud laboral"],
      partes:[
        {n:"Nervio mediano", d:"Va por delante del antebrazo y atraviesa el túnel del carpo. Su compresión ahí produce el síndrome del túnel carpiano.", at:[2.55,1.35,0.42], sub:"mediano"},
        {n:"Nervio cubital", d:"Pasa superficial por detrás del codo: es el del «hueso de la risa». Inerva el meñique y los músculos finos de la mano.", at:[2.55,1.05,0.20], sub:"cubital"},
        {n:"Nervio radial", d:"Rodea el húmero por detrás y levanta la muñeca y los dedos.", at:[2.55,0.80,0.36], sub:"radial"}
      ],
      quiz:{q:"El hormigueo nocturno en el pulgar, el índice y el dedo medio sugiere compresión de…", ops:["el nervio radial en el brazo","el nervio mediano en el túnel del carpo","el nervio cubital en el codo"], ok:1,
        fb:"Es la distribución sensitiva típica del mediano, y la muñeca es el punto donde más fácilmente se comprime.",
        wrong:["El radial se encarga sobre todo de extender la muñeca y los dedos; su compresión produce la mano caída, no ese hormigueo.","El cubital da la sensibilidad del meñique y del borde del anular, no la de los tres primeros dedos."]}},

    {id:"ciatico", nombre:"Nervio ciático", capa:"periferico", color:"#B08E24", pos:[0.92,-3.0,0.05], lbl:[1.90,-3.90,0.60],
      n1:"El nervio más grueso y más largo del cuerpo: nace del plexo lumbosacro, sale de la pelvis por detrás y baja por el muslo hasta dividirse cerca de la rodilla.",
      n2:"Reúne fibras de L4 a S3 y en su origen alcanza cerca de 1,5 cm de ancho, el grosor de un dedo meñique. Desciende por la cara posterior del muslo, inerva los músculos que flexionan la rodilla y, en el hueco poplíteo, se divide en el nervio tibial y el peroneo común, que se reparten la pierna y el pie. Algunos de sus axones recorren cerca de un metro desde el cuerpo neuronal hasta su destino: son de las células más largas del organismo.",
      n3:"La ciática no es el nervio, es el dolor que aparece cuando algo lo irrita: en la mayoría de los casos, una hernia del disco intervertebral que comprime una raíz lumbar, no el tronco del nervio en sí. El dolor típico baja por la nalga y la parte de atrás del muslo siguiendo el trayecto de la raíz afectada. La mayoría de los episodios mejora en semanas con actividad suave y control del dolor; el reposo absoluto prolongado empeora el pronóstico. La inyección intramuscular en la nalga se aplica en el cuadrante superior externo precisamente para no tocarlo.",
      dato:"Algunos de sus axones miden cerca de un metro: de la médula lumbar al pie.",
      conecta:["plexos","raquideos","neurona"], temas:["Sistema nervioso periférico","Dolor","Anatomía"],
      partes:[
        {n:"Tronco del ciático", d:"El segmento grueso que baja por la cara posterior del muslo, de casi 1,5 cm de ancho en su origen.", at:[0.92,-2.60,0.02], sub:"tronco"},
        {n:"División en tibial y peroneo común", d:"Cerca del hueco poplíteo se separa en dos nervios que se reparten la pierna y el pie.", at:[0.95,-4.10,0.02], sub:"ramas"}
      ],
      quiz:{q:"En la mayoría de los casos, ¿qué causa el dolor que llamamos ciática?", ops:["Una infección del propio nervio ciático","La compresión de una raíz lumbar, casi siempre por una hernia de disco","Una fractura del hueso de la cadera"], ok:1,
        fb:"El problema suele estar en la salida de la médula, no en el trayecto del nervio por el muslo, aunque el dolor se sienta ahí.",
        wrong:["Las infecciones del nervio existen pero son raras; la causa habitual es mecánica y está en la columna.","Una fractura de cadera duele en la cadera y casi siempre impide caminar; el dolor ciático sigue el trayecto del nervio pierna abajo."]}},

    {id:"simpatico", nombre:"Cadena simpática paravertebral", capa:"autonomo", color:"#5C9E43", pos:[0.42,1.0,0.30], lbl:[-3.30,1.60,0.50],
      n1:"Dos cordones de ganglios situados a los lados de la columna, de la base del cráneo al cóccix. Son la central del «pelea o huye».",
      n2:"Las fibras simpáticas salen de la médula solo entre T1 y L2 —por eso se le llama sistema toracolumbar—, entran en la cadena de ganglios y desde ahí se distribuyen a todo el cuerpo. Ante un susto, actúan casi a la vez sobre muchos órganos: las pupilas se dilatan, el corazón late más fuerte y más rápido, los bronquios se abren, el hígado suelta glucosa, la sangre se desvía del intestino a los músculos y las glándulas sudoríparas se activan. Al mismo tiempo, la médula de las glándulas suprarrenales vierte adrenalina a la sangre y prolonga el efecto durante minutos.",
      n3:"Compara órgano por órgano: el simpático acelera el corazón y el parasimpático lo frena; el simpático dilata la pupila y el parasimpático la contrae; el simpático relaja el músculo del bronquio y el parasimpático lo estrecha; el simpático frena el movimiento y la secreción del tubo digestivo y el parasimpático los estimula; el simpático cierra el esfínter de la vejiga y el parasimpático contrae su pared para vaciarla. Casi todos los órganos reciben las dos órdenes y funcionan en el equilibrio entre ambas, no con un interruptor de encendido y apagado. Las glándulas sudoríparas son una excepción curiosa: son simpáticas, pero su neurotransmisor final es la acetilcolina, el mismo del parasimpático.",
      dato:"Sudar es una respuesta simpática, pero usa el neurotransmisor del parasimpático.",
      conecta:["vago","medula","raices","raquideos"], temas:["Sistema autónomo","Homeostasis","Estrés"],
      partes:[
        {n:"Ganglios paravertebrales", d:"Los abultamientos donde la fibra que sale de la médula hace sinapsis con la que va al órgano.", at:[0.42,1.60,0.30], sub:"ganglios"},
        {n:"Cordón intergangliónico", d:"El cable que une los ganglios entre sí y permite que una señal de T1–L2 alcance todo el cuerpo.", at:[0.42,0.40,0.30], sub:"cadena"}
      ],
      quiz:{q:"Un perro ladra de golpe y sientes el corazón en la garganta. ¿Qué está pasando?", ops:["El parasimpático acelera el corazón para reaccionar","El simpático acelera el corazón, dilata las pupilas y los bronquios y desvía sangre a los músculos","La médula espinal produce adrenalina directamente"], ok:1,
        fb:"Es la respuesta de «pelea o huye»: varios órganos reciben la misma orden a la vez, reforzada por la adrenalina de las suprarrenales.",
        wrong:["El parasimpático hace lo contrario: frena el corazón y favorece la digestión y el reposo.","La médula espinal no fabrica adrenalina: la produce la médula de las glándulas suprarrenales, sobre los riñones."]}},

    {id:"vago", nombre:"Nervio vago (parasimpático)", capa:"autonomo", color:"#2F86BB", pos:[0.32,2.4,0.6], lbl:[-3.00,3.30,0.50],
      n1:"El décimo par craneal: sale del bulbo raquídeo y baja por el cuello y el tórax hasta el abdomen. Es el gran representante del «reposo y digestión».",
      n2:"Es el nervio craneal más largo y transporta cerca del 75 % de todas las fibras parasimpáticas del cuerpo. Inerva la laringe y la faringe, el corazón, los bronquios y el tubo digestivo hasta aproximadamente los dos tercios del colon transverso. Después de una comida tranquila, su actividad baja la frecuencia cardíaca, estrecha un poco los bronquios, aumenta los movimientos y las secreciones del estómago y del intestino, y dirige la sangre hacia el aparato digestivo: por eso da sueño después de almorzar.",
      n3:"Aunque se lo conoce por sus órdenes, alrededor del 80 % de sus fibras son sensitivas: el vago es sobre todo un informante que le cuenta al tronco encefálico cómo están la presión arterial, el estado de los pulmones y el llenado del estómago. Esa doble vía explica el desmayo vasovagal: ante un dolor intenso, un pinchazo o una impresión fuerte, una descarga vagal brusca frena el corazón y dilata los vasos, la presión cae y la persona pierde el conocimiento unos segundos. Al acostarse, la sangre vuelve a la cabeza y la recuperación es rápida: por eso a quien se desmaya se lo acuesta y se le elevan las piernas, en lugar de sentarlo.",
      dato:"El 80 % de las fibras del vago suben: informa mucho más de lo que ordena.",
      conecta:["tronco","simpatico","encefalo"], temas:["Sistema autónomo","Digestión","Frecuencia cardíaca"],
      partes:[
        {n:"Ramas cardíacas", d:"Frenan la frecuencia del corazón. Son el motivo de que el pulso en reposo baje con el entrenamiento.", at:[0.36,1.95,0.80], sub:"destinos"},
        {n:"Ramas digestivas", d:"Estimulan los movimientos y las secreciones del estómago y del intestino.", at:[-0.28,0.50,0.78], sub:"destinos"}
      ],
      quiz:{q:"Después de un almuerzo abundante llega el sueño y el pulso baja. ¿Qué predomina?", ops:["El simpático, que activa la digestión","El parasimpático, sobre todo por el nervio vago","Ninguno: es solo el peso de la comida"], ok:1,
        fb:"Es el estado de «reposo y digestión»: el vago frena el corazón y activa el aparato digestivo.",
        wrong:["El simpático hace lo contrario con la digestión: la frena y desvía la sangre hacia los músculos.","Hay un cambio real y medible en la frecuencia cardíaca y en la actividad intestinal, dirigido por el sistema autónomo."]}},

    {id:"neurona", nombre:"Neurona y axón mielinizado (lupa)", capa:"lupa", color:"#E09A6E", pos:[5.4,3.3,0.4], lbl:[5.80,5.30,0.40], anchor:[5.39,3.47,0.4],
      n1:"La célula del sistema nervioso, ampliada: recibe por las dendritas, decide en el cono axónico y transmite por el axón hasta sus terminales.",
      n2:"Las dendritas y el soma recogen miles de señales a la vez; unas empujan hacia arriba el voltaje y otras hacia abajo. Todas se suman en el cono axónico, el punto de arranque del axón, que es la zona con más canales de sodio dependientes de voltaje: si la suma alcanza el umbral de unos −55 mV, se dispara un potencial de acción. Y se dispara entero o no se dispara: es la ley del todo o nada. Además, el impulso no se debilita al avanzar, porque en cada tramo se vuelve a generar desde cero con la energía de la propia membrana.",
      n3:"La vaina de mielina no es continua: la forman células de Schwann enrolladas, una por cada tramo, separadas por los nódulos de Ranvier, que dejan la membrana desnuda cada 0,2 a 2 mm. Los canales de sodio se concentran justo en esos nódulos, así que el impulso salta de nódulo en nódulo en lugar de recorrer punto a punto la membrana: es la conducción saltatoria, y multiplica la velocidad. Una fibra sin mielina conduce a 0,5–2 m/s; una fibra gruesa y mielinizada llega a 120 m/s, más de 400 km/h. En el sistema nervioso central la mielina no la fabrican células de Schwann sino oligodendrocitos, y cada uno envuelve varios axones a la vez. La esclerosis múltiple es una enfermedad autoinmunitaria en la que el propio sistema inmunitario ataca esa mielina del sistema nervioso central: el impulso deja de saltar, se enlentece o se bloquea, y aparecen síntomas que dependen de la zona afectada —visión borrosa, hormigueos, debilidad, problemas de equilibrio— muchas veces en brotes que remiten. Es más frecuente en mujeres y suele empezar entre los 20 y los 40 años; su prevalencia aumenta con la latitud y en el Ecuador se estima baja, por debajo de 10 casos por cada 100.000 habitantes, frente a más de 100 en países del norte de Europa. Hoy existen tratamientos que reducen la frecuencia de los brotes, y muchas personas con esclerosis múltiple llevan una vida activa.",
      dato:"El impulso no se debilita: se regenera entero en cada nódulo de Ranvier.",
      conecta:["sinapsis","ciatico","raquideos"], temas:["Célula nerviosa","Impulso nervioso","Mielina","Salud"],
      partes:[
        {n:"Soma y dendritas", d:"El cuerpo celular con el núcleo y las ramas que reciben las señales de otras neuronas.", at:[4.42,3.95,0.40], sub:"soma"},
        {n:"Cono axónico", d:"El arranque del axón: aquí se suman todas las señales y aquí se decide si hay potencial de acción.", at:[4.74,3.71,0.40], sub:"cono"},
        {n:"Vaina de mielina y células de Schwann", d:"Los manguitos blancos. Cada uno es una célula de Schwann enrollada alrededor del axón.", at:[5.25,3.61,0.40], sub:"mielina"},
        {n:"Nódulos de Ranvier", d:"Los huecos entre manguitos, con la membrana desnuda y llena de canales de sodio. El impulso salta de uno a otro.", at:[5.55,3.55,0.40], sub:"nodo"},
        {n:"Terminales sinápticos", d:"Los botones del final del axón, donde el impulso eléctrico se convierte en señal química.", at:[7.32,3.28,0.40], sub:"terminal"},
        {n:"Axón sin mielina (comparación)", d:"El axón desnudo de abajo: conduce la misma señal, pero mucho más despacio.", at:[5.95,2.78,0.40], sub:"amielinico"}
      ],
      quiz:{q:"¿Por qué la mielina hace que el impulso viaje mucho más rápido?", ops:["Porque conduce la electricidad mejor que el axón","Porque aísla el axón y concentra los canales de sodio en los nódulos, así que el impulso salta de nódulo en nódulo","Porque empuja el impulso hacia adelante"], ok:1,
        fb:"Es la conducción saltatoria: en vez de regenerarse en cada punto de la membrana, el potencial de acción solo se vuelve a generar en los nódulos de Ranvier.",
        wrong:["La mielina es un aislante, precisamente lo contrario de un buen conductor: su trabajo es impedir que la corriente se escape por la membrana.","La mielina no tiene ninguna capacidad de empujar: es una envoltura pasiva de membranas ricas en lípidos."]}},

    {id:"sinapsis", nombre:"Sinapsis química (lupa)", capa:"lupa", color:"#2FB6D0", pos:[5.72,-0.88,0.4], lbl:[5.90,-3.30,0.40],
      n1:"El punto de contacto entre dos neuronas, ampliado todavía más: el impulso eléctrico llega al terminal y se convierte en un mensaje químico que cruza un espacio diminuto.",
      n2:"Cuando el potencial de acción llega al terminal presináptico, abre canales de calcio; el calcio que entra hace que las vesículas se fusionen con la membrana y vacíen su neurotransmisor a la hendidura sináptica, un espacio de solo 20 a 40 nanómetros. Las moléculas lo cruzan por difusión en menos de un milisegundo y se unen a los receptores de la membrana postsináptica, que abren sus propios canales y cambian el voltaje de la neurona siguiente. Después la señal debe apagarse: parte del neurotransmisor vuelve al terminal por transportadores de recaptación, parte lo destruyen enzimas y parte se difunde.",
      n3:"Dentro de la neurona el mensaje es eléctrico y rápido; entre neuronas es químico y más lento, pero a cambio solo puede ir en un sentido —las vesículas están únicamente en el lado presináptico—, puede ser excitador o inhibidor y puede modularse molécula a molécula. Ahí actúan muchas sustancias, y conocerlo es una herramienta de salud, no una receta: la cafeína bloquea los receptores de adenosina, la molécula que acumula el cansancio, así que no da energía, solo tapa la señal de sueño; el alcohol potencia el neurotransmisor inhibidor GABA y frena el sistema nervioso central, lo que explica la falta de coordinación y de juicio antes que cualquier efecto «estimulante»; la nicotina imita a la acetilcolina y provoca una liberación brusca de dopamina en los circuitos de recompensa, lo que la hace muy adictiva; la cocaína y las anfetaminas bloquean o invierten la recaptación de dopamina y dejan la señal encendida de forma anormal, con daño a largo plazo en esos mismos circuitos. La medicina usa el mismo mecanismo a favor: los anestésicos locales bloquean los canales de sodio y el impulso ni siquiera llega a generarse, y varios antidepresivos actúan sobre la recaptación de serotonina.",
      dato:"La hendidura mide 20–40 nanómetros: unas dos milésimas del grosor de un cabello.",
      conecta:["neurona","nervios-brazo","medula"], temas:["Sinapsis","Neurotransmisores","Salud","Farmacología"],
      partes:[
        {n:"Terminal presináptico con vesículas", d:"El botón del axón que llega. Guarda el neurotransmisor en vesículas listas para fusionarse.", at:[5.40,-0.74,0.40], sub:"pre"},
        {n:"Hendidura sináptica", d:"El espacio de 20–40 nm que separa a las dos neuronas. El neurotransmisor lo cruza por difusión.", at:[5.84,-1.18,0.40], sub:"hend"},
        {n:"Receptores postsinápticos", d:"Las proteínas de la otra membrana que reconocen el neurotransmisor y abren canales.", at:[6.12,-1.46,0.40], sub:"receptor"},
        {n:"Transportador de recaptación", d:"Devuelve el neurotransmisor al terminal para apagar la señal y reutilizarlo.", at:[5.92,-0.84,0.40], sub:"recapta"}
      ],
      quiz:{q:"¿Por qué la información sináptica solo puede viajar en un sentido?", ops:["Porque la hendidura está inclinada","Porque solo el lado presináptico tiene vesículas con neurotransmisor y solo el postsináptico tiene los receptores","Porque el impulso eléctrico empuja siempre hacia adelante"], ok:1,
        fb:"La asimetría entre las dos membranas es lo que impone la dirección: quien habla tiene vesículas, quien escucha tiene receptores.",
        wrong:["La orientación geométrica no tiene nada que ver: lo decisivo es qué moléculas hay en cada membrana.","El impulso eléctrico se detiene en el terminal: a partir de ahí el mensaje es químico, y es la química la que impone el sentido."]}}
  ],
  guiada:[
    {tipo:"select", txt:"Empieza por el cable principal: selecciona la <b>médula espinal</b>, el cordón que baja desde el tronco encefálico por dentro de la columna.", target:"medula"},
    {tipo:"select", txt:"Acércate a un segmento y selecciona las <b>raíces</b>. Fíjate en cuál tiene el abultamiento (el ganglio) y qué tipo de información lleva cada una.", target:"raices"},
    {tipo:"select", txt:"Sigue la red hacia afuera: selecciona la estructura donde varias raíces se entrecruzan antes de formar los nervios del brazo y de la pierna, los <b>plexos</b>.", target:"plexos"},
    {tipo:"anim", txt:"Ve a Animación y activa el <b>Potencial de acción</b>. Observa a la vez la curva de voltaje y el punto que salta por el axón, y compara con el axón de abajo, que no tiene mielina.", target:"potencial"},
    {tipo:"select", txt:"Entra en la lupa: selecciona la <b>neurona</b> y localiza el cono axónico y los nódulos de Ranvier.", target:"neurona"},
    {tipo:"anim", txt:"Activa ahora la <b>Sinapsis química</b> y sigue el camino del neurotransmisor: vesícula, hendidura, receptor y recaptación.", target:"sinapsis"},
    {tipo:"anim", txt:"Activa el <b>Arco reflejo</b> y cronometra mentalmente: ¿qué llega antes, la orden que retira la mano o la señal que sube al encéfalo?", target:"reflejo"},
    {tipo:"select", txt:"Para terminar con el sistema autónomo, selecciona el <b>nervio vago</b> y compáralo con la cadena simpática.", target:"vago"},
    {tipo:"text", txt:"Explica con tus palabras cómo viaja una señal desde que te pinchas un dedo hasta que retiras la mano, y por qué el dolor consciente llega después. Menciona el nervio raquídeo, la raíz dorsal, la médula, la motoneurona y por lo menos una sinapsis. Tu respuesta se guardará en el cuaderno."}
  ]
};

Object.assign(BIO.activities, {
  "explorar-nervioso":{t:"Explorar el sistema nervioso", unidad:6, peso:15, xp:60},
  "guiada-nervioso":{t:"Exploración guiada del sistema nervioso", unidad:6, peso:10, xp:80},
  "reto-nervioso":{t:"Reto del sistema nervioso: eléctrico dentro, químico entre neuronas", unidad:6, peso:10, xp:70}
});

/* =====================================================================
   MODELO 3D
   ===================================================================== */
function buildNerves(E){
  orgvFrame(E, 1.25);
  const low = E.low, D = BIO.nerves;
  const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const CEN = new THREE.Vector3(0.6,1.4,0);
  const add = (id, meshes, extra={}) => { const s = S[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, explodeDir:V3(s.pos).sub(CEN).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl); return p; };
  const RND = Kit.rng(29);
  const seg = n => low ? Math.max(4, Math.round(n*0.55)) : n;

  /* ---------- materiales ---------- */
  const mBrain  = Kit.tissue({ color:0xDCA894, tex:'tissue', rep:[4,4], bump:0.018, rough:0.55, coat:0.32, coatRough:0.4, env:0.6 });
  const mCbl    = Kit.tissue({ color:0xB183C4, rough:0.5, coat:0.3, coatRough:0.45, env:0.55 });
  const mStem   = Kit.tissue({ color:0xCBA983, rough:0.5, coat:0.35, env:0.6 });
  const mCord   = Kit.tissue({ color:0xEBD3AA, rough:0.48, coat:0.38, env:0.6 });
  const mCordT  = Kit.tissue({ color:0xD7B786, rough:0.48, coat:0.38, env:0.6 });
  const mCordL  = Kit.tissue({ color:0xF0DCB4, rough:0.48, coat:0.38, env:0.6 });
  const mCauda  = Kit.tissue({ color:0xE0C79B, rough:0.55, coat:0.25, env:0.5 });
  const mNerve  = Kit.tissue({ color:0xD6BE55, rough:0.44, coat:0.42, coatRough:0.3, env:0.6 });
  const mNerve2 = Kit.tissue({ color:0xD2BC4E, rough:0.44, coat:0.42, coatRough:0.3, env:0.6 });
  const mPlexo  = Kit.tissue({ color:0xC9AE41, rough:0.46, coat:0.4, env:0.6 });
  const mSciat  = Kit.tissue({ color:0xB08E24, rough:0.46, coat:0.4, env:0.6 });
  const mRootD  = Kit.tissue({ color:0xB5701F, rough:0.46, coat:0.4, env:0.6 });
  const mRootV  = Kit.tissue({ color:0xE8B85C, rough:0.46, coat:0.4, env:0.6 });
  const mGang   = Kit.tissue({ color:0xC4802F, rough:0.42, coat:0.5, coatRough:0.25, env:0.7 });
  const mSymp   = Kit.tissue({ color:0x5C9E43, rough:0.45, coat:0.4, env:0.6 });
  const mVagus  = Kit.tissue({ color:0x2F86BB, rough:0.42, coat:0.45, env:0.65 });
  const mTarget = Kit.tissue({ color:0xC98A82, rough:0.6, coat:0.2, env:0.45 });
  const mMening = new THREE.MeshPhysicalMaterial({ color:0x9CC8DE, transparent:true, opacity:0.12, roughness:0.12, clearcoat:1, depthWrite:false, side:THREE.DoubleSide });
  const mSoma   = Kit.tissue({ color:0xD98B57, rough:0.52, coat:0.3, env:0.6 });
  const mAxon   = Kit.tissue({ color:0xC98046, rough:0.5, coat:0.3, env:0.6 });
  const mMyel   = Kit.tissue({ color:0xF4EDE0, rough:0.38, coat:0.55, coatRough:0.25, env:0.75 });
  const mSchw   = Kit.tissue({ color:0xAD8FBE, rough:0.45, coat:0.4, env:0.6 });
  const mPre    = Kit.tissue({ color:0xDE9A63, rough:0.5, coat:0.32, env:0.6 });
  const mPost   = Kit.tissue({ color:0x6E9BB8, rough:0.5, coat:0.32, env:0.6 });
  const mVes    = Kit.tissue({ color:0x2FB6D0, rough:0.4, coat:0.5, env:0.7 });
  const mRecep  = Kit.tissue({ color:0x8B4FB0, rough:0.42, coat:0.5, env:0.7 });
  const mTrans  = Kit.tissue({ color:0x2E8C62, rough:0.42, coat:0.5, env:0.7 });

  const tube2 = (pts, r0, r1, o={}) => Kit.taper(pts, r0, r1, Object.assign({ seg:seg(o.seg||18), rad:low?6:9 }, o.rfn?{rfn:o.rfn}:{}, o.seed!==undefined?{seed:o.seed}:{}));
  const ball = (c, r, sw) => { const g = new THREE.SphereGeometry(r, sw||(low?10:16), low?8:12); g.translate(c.x,c.y,c.z); return g; };

  /* =====================================================================
     1 · SISTEMA NERVIOSO CENTRAL
     ===================================================================== */
  /* --- encéfalo como bloque (sin desglose interno: eso está en #/explorar/cerebro) --- */
  const brainG = Kit.sculpt({ w: low?46:80, h: low?34:60,
    radii:[1.05,0.86,0.94],
    disp:(p,d) => 0.055*Kit.fbm(p.x*3.4, p.y*3.4, p.z*3.4, 3) - 0.07*gauss(p.x, 0.10)*Math.max(0, p.y)
                  - 0.06*Math.max(0, -p.y-0.45) });
  const brain = new THREE.Mesh(brainG, mBrain); brain.position.set(0,5.05,0); brain.userData.sub='cerebro';
  add('encefalo', [brain]);

  /* --- cerebelo: dos lóbulos con folias --- */
  const cbl = [1,-1].map(sg => { const g = Kit.sculpt({ w: low?26:44, h: low?20:32, radii:[0.34,0.30,0.30],
      disp:(p) => 0.022*Math.sin(Math.atan2(p.y, p.z)*22 + 1.4*Kit.n3(p.x*3,p.y*3,p.z*3)) });
    const m = new THREE.Mesh(g, mCbl); m.position.set(sg*0.32, 4.30, -0.62); return m; });
  add('cerebelo', cbl, { explodeDir:new THREE.Vector3(0,0.3,-1).normalize() });

  /* --- tronco encefálico --- */
  const stem = new THREE.Mesh(tube2([[0,4.62,-0.04],[0,4.30,0.0],[0,3.95,0.04],[0,3.60,0.05]], 0, 0,
    { rfn:u => 0.20 + 0.09*gauss(u-0.42,0.22) - 0.03*u, seg:20 }), mStem);
  add('tronco', [stem]);

  /* --- médula espinal por segmentos --- */
  const cordPts = [[0,3.60,0.05],[0,3.05,0.04],[0,2.35,0.03],[0,1.60,0.02],[0,0.85,0.02],[0,0.15,0.02],[0,-0.50,0.03],[0,-1.05,0.04]];
  const cordCurve = Kit.curve(cordPts);
  const cordR = u => 0.155 + 0.050*gauss(u-0.13,0.13) + 0.048*gauss(u-0.74,0.13) - 0.115*smooth01((u-0.86)/0.14);
  const cordSeg = (u0,u1,n) => { const a=[]; for (let i=0;i<=n;i++) a.push(cordCurve.getPointAt(u0+(u1-u0)*i/n)); return a; };
  const cordPiece = (u0,u1,mt,sub) => { const g = Kit.taper(cordSeg(u0,u1, low?6:10), 0, 0,
      { rfn:t => cordR(u0+(u1-u0)*t), seg:seg(22), rad:low?8:12 });
    const m = new THREE.Mesh(g, mt); m.userData.sub = sub; return m; };
  const cordMeshes = [cordPiece(0,0.235,mCord,'cervical'), cordPiece(0.225,0.63,mCordT,'toracica'),
                      cordPiece(0.62,0.845,mCordL,'lumbar'), cordPiece(0.835,1,mCordL,'cauda')];
  /* cola de caballo: raíces sueltas por debajo del cono medular */
  const caudaG = [];
  for (let i=0;i<(low?8:14);i++){ const sx = (i%2?1:-1)*(0.02+0.045*Math.floor(i/2)); const zz = (RND()-0.5)*0.10;
    caudaG.push(Kit.taper([[0, -0.92, 0.04],[sx*0.6, -1.25, 0.04+zz*0.4],[sx, -1.62, 0.04+zz],[sx*1.15, -1.95, 0.04+zz]], 0.022, 0.014, { seg:seg(10), rad:5 })); }
  const cauda = new THREE.Mesh(Kit.merge(caudaG), mCauda); cauda.userData.sub='cauda';
  cordMeshes.push(cauda);
  add('medula', cordMeshes);

  /* =====================================================================
     2 · MENINGES Y LÍQUIDO CEFALORRAQUÍDEO
     ===================================================================== */
  const dura = new THREE.Mesh(Kit.taper(cordSeg(0,1, low?10:18), 0, 0,
    { rfn:t => Math.max(0.10, cordR(t)) + 0.115, seg:seg(26), rad:low?8:14 }), mMening);
  dura.userData.sub='dura';
  const duraLow = new THREE.Mesh(tube2([[0,-1.02,0.04],[0,-1.55,0.04],[0,-2.05,0.04]], 0.20, 0.15, { seg:10 }), mMening);
  duraLow.userData.sub='dura';
  const duraBrain = new THREE.Mesh(new THREE.SphereGeometry(1.22, low?24:40, low?18:28), mMening);
  duraBrain.scale.set(1,0.90,0.97); duraBrain.position.set(0,5.02,0); duraBrain.userData.sub='dura';
  add('meninges', [dura, duraLow, duraBrain], { passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });

  /* =====================================================================
     3 · NERVIOS PERIFÉRICOS
     ===================================================================== */
  /* --- raíces dorsal y ventral con el ganglio raquídeo (nivel destacado) --- */
  const rootMeshes = [];
  [1,-1].forEach(sg => {
    const d0 = new THREE.Vector3(sg*0.12, 2.22, -0.10), d1 = new THREE.Vector3(sg*0.42, 2.16, -0.24);
    const gc = new THREE.Vector3(sg*0.58, 2.08, -0.30), j = new THREE.Vector3(sg*0.72, 2.00, -0.10);
    const v0 = new THREE.Vector3(sg*0.12, 2.10, 0.09), v1 = new THREE.Vector3(sg*0.44, 2.04, 0.20);
    const dm = new THREE.Mesh(Kit.merge([tube2([d0,d1,gc], 0.030, 0.038, { seg:10 }), tube2([gc,j], 0.040, 0.046, { seg:8 })]), mRootD);
    dm.userData.sub='dorsal';
    const gm = new THREE.Mesh(ball(gc, 0.082), mGang); gm.userData.sub='ganglio';
    const vm = new THREE.Mesh(tube2([v0, v1, j], 0.030, 0.044, { seg:10 }), mRootV); vm.userData.sub='ventral';
    rootMeshes.push(dm, gm, vm);
  });
  add('raices', rootMeshes, { explodeDir:new THREE.Vector3(0.4,0.2,-0.9).normalize() });

  /* --- nervios raquídeos: pares a lo largo de toda la médula --- */
  const spinG = [];
  const spinLevels = [];
  for (let y=3.32; y>-1.0; y-=0.28){ if (Math.abs(y-2.16) < 0.17) continue; spinLevels.push(y); }
  spinLevels.forEach((y,i) => [1,-1].forEach(sg => {
    const len = 0.45 + 0.30*gauss(y-2.9,0.6) + 0.28*gauss(y+0.15,0.7);
    const a = new THREE.Vector3(sg*0.13, y, 0.0), b = new THREE.Vector3(sg*(0.30+len*0.45), y-0.10, 0.06),
          c = new THREE.Vector3(sg*(0.30+len), y-0.26, 0.12);
    spinG.push(Kit.taper([a,b,c], 0.034, 0.020, { seg:seg(9), rad:5 }));
    /* pequeño ganglio raquídeo en cada nivel */
    spinG.push(ball(new THREE.Vector3(sg*0.26, y+0.02, -0.07), 0.038, 8));
  }));
  add('raquideos', [new THREE.Mesh(Kit.merge(spinG), mNerve)], { explodeDir:new THREE.Vector3(0.9,0,0.3).normalize() });

  /* --- plexos braquial y lumbosacro --- */
  const plexG = { braquial:[], lumbosacro:[] };
  [1,-1].forEach(sg => {
    const hub = new THREE.Vector3(sg*1.42, 2.46, 0.20);
    [3.10, 2.90, 2.70, 2.50, 2.32].forEach((y,k) => {
      const a = new THREE.Vector3(sg*0.22, y, 0.02);
      const m1 = new THREE.Vector3(sg*(0.70+0.06*k), y-0.10, 0.10+0.03*k);
      const m2 = new THREE.Vector3(sg*(1.05+0.04*((k+2)%4)), 2.72-0.10*k, 0.16);
      plexG.braquial.push(Kit.taper([a,m1,m2,hub], 0.030, 0.042, { seg:seg(12), rad:5 }));
    });
    plexG.braquial.push(ball(hub, 0.075, 10));
    const hub2 = new THREE.Vector3(sg*0.84, -1.30, 0.10);
    [-0.12, -0.35, -0.58, -0.80].forEach((y,k) => {
      const a = new THREE.Vector3(sg*0.20, y, 0.02);
      const m1 = new THREE.Vector3(sg*(0.46+0.08*k), y-0.18, 0.06);
      const m2 = new THREE.Vector3(sg*(0.70+0.05*((k+1)%3)), -0.95-0.06*k, 0.09);
      plexG.lumbosacro.push(Kit.taper([a,m1,m2,hub2], 0.030, 0.048, { seg:seg(12), rad:5 }));
    });
    plexG.lumbosacro.push(ball(hub2, 0.080, 10));
  });
  const plexB = new THREE.Mesh(Kit.merge(plexG.braquial), mPlexo); plexB.userData.sub='braquial';
  const plexL = new THREE.Mesh(Kit.merge(plexG.lumbosacro), mPlexo); plexL.userData.sub='lumbosacro';
  add('plexos', [plexB, plexL], { explodeDir:new THREE.Vector3(0.9,0.2,0.3).normalize() });

  /* --- nervios de la extremidad superior --- */
  const armCurves = {};
  const armMesh = { mediano:[], cubital:[], radial:[] };
  [1,-1].forEach(sg => {
    const hub = new THREE.Vector3(sg*1.42, 2.46, 0.20);
    const spec = [['mediano', 0.42, 0.10], ['cubital', 0.20, -0.06], ['radial', 0.36, 0.30]];
    spec.forEach(([k, zMid, zEnd]) => {
      const pts = [hub,
        new THREE.Vector3(sg*1.90, 1.92, 0.18+zMid*0.25),
        new THREE.Vector3(sg*2.36, 1.30, 0.14+zMid*0.45),
        new THREE.Vector3(sg*2.78, 0.62, 0.20+zEnd*0.6),
        new THREE.Vector3(sg*3.05, 0.02, 0.28+zEnd*0.5)];
      const m = new THREE.Mesh(Kit.taper(pts, 0.050, 0.030, { seg:seg(18), rad:low?6:9 }), mNerve2);
      m.userData.sub = k; armMesh[k].push(m);
      if (sg===1 && k==='mediano') armCurves.main = Kit.curve(pts);
    });
    /* pequeñas ramas terminales en la mano */
    const fan = [];
    for (let i=0;i<4;i++){ const a = new THREE.Vector3(sg*3.05, 0.02, 0.30);
      fan.push(Kit.taper([a, new THREE.Vector3(sg*(3.22+0.05*i), -0.18-0.06*i, 0.34+0.06*(i-1.5))], 0.020, 0.012, { seg:6, rad:5 })); }
    const fm = new THREE.Mesh(Kit.merge(fan), mNerve2); fm.userData.sub='mediano'; armMesh.mediano.push(fm);
  });
  add('nervios-brazo', [...armMesh.mediano, ...armMesh.cubital, ...armMesh.radial],
      { explodeDir:new THREE.Vector3(1,0,0.3).normalize() });

  /* --- nervio ciático --- */
  const sciMesh = [];
  [1,-1].forEach(sg => {
    const pts = [new THREE.Vector3(sg*0.84,-1.30,0.10), new THREE.Vector3(sg*0.94,-1.95,0.02),
                 new THREE.Vector3(sg*0.94,-2.75,0.00), new THREE.Vector3(sg*0.92,-3.55,0.02)];
    const tr = new THREE.Mesh(Kit.taper(pts, 0.105, 0.078, { seg:seg(18), rad:low?7:10 }), mSciat);
    tr.userData.sub='tronco'; sciMesh.push(tr);
    const br = [Kit.taper([new THREE.Vector3(sg*0.92,-3.55,0.02), new THREE.Vector3(sg*0.84,-4.20,0.06), new THREE.Vector3(sg*0.80,-4.85,0.08)], 0.052, 0.030, { seg:seg(12), rad:6 }),
                Kit.taper([new THREE.Vector3(sg*0.92,-3.55,0.02), new THREE.Vector3(sg*1.06,-4.15,-0.04), new THREE.Vector3(sg*1.14,-4.80,-0.06)], 0.046, 0.026, { seg:seg(12), rad:6 })];
    const bm = new THREE.Mesh(Kit.merge(br), mSciat); bm.userData.sub='ramas'; sciMesh.push(bm);
  });
  add('ciatico', sciMesh, { explodeDir:new THREE.Vector3(0.5,-0.8,0.2).normalize() });

  /* =====================================================================
     4 · SISTEMA NERVIOSO AUTÓNOMO
     ===================================================================== */
  /* --- cadena simpática paravertebral --- */
  const sympChain = [], sympGang = [];
  [1,-1].forEach(sg => {
    const pts = [new THREE.Vector3(sg*0.40,3.20,0.30), new THREE.Vector3(sg*0.44,2.20,0.32),
                 new THREE.Vector3(sg*0.44,1.10,0.32), new THREE.Vector3(sg*0.42,0.00,0.31),
                 new THREE.Vector3(sg*0.40,-1.00,0.30)];
    sympChain.push(Kit.taper(pts, 0.042, 0.036, { seg:seg(18), rad:6 }));
    const c = Kit.curve(pts);
    for (let i=0;i<=(low?7:11);i++){ const u = i/(low?7:11); const p = c.getPointAt(u);
      sympGang.push(ball(p, 0.082, 9));
      /* ramos comunicantes hacia el nervio raquídeo del nivel */
      sympChain.push(Kit.taper([p, new THREE.Vector3(sg*0.22, p.y+0.02, 0.12)], 0.022, 0.018, { seg:5, rad:5 })); }
  });
  const symC = new THREE.Mesh(Kit.merge(sympChain), mSymp); symC.userData.sub='cadena';
  const symG = new THREE.Mesh(Kit.merge(sympGang), mSymp); symG.userData.sub='ganglios';
  add('simpatico', [symC, symG], { explodeDir:new THREE.Vector3(0.6,0,0.8).normalize() });

  /* --- nervio vago --- */
  const vagG = [], vagTarget = [];
  [1,-1].forEach(sg => {
    const pts = [new THREE.Vector3(sg*0.16,4.12,-0.02), new THREE.Vector3(sg*0.26,3.70,0.34),
                 new THREE.Vector3(sg*0.30,3.05,0.58), new THREE.Vector3(sg*0.32,2.35,0.64),
                 new THREE.Vector3(sg*0.30,1.60,0.68), new THREE.Vector3(sg*0.24,0.85,0.70)];
    vagG.push(Kit.taper(pts, 0.064, 0.046, { seg:seg(20), rad:low?6:9 }));
    /* ramas cardíacas y digestivas */
    vagG.push(Kit.taper([new THREE.Vector3(sg*0.31,2.15,0.66), new THREE.Vector3(sg*0.36,2.02,0.80), new THREE.Vector3(sg*0.34,1.92,0.92)], 0.032, 0.020, { seg:8, rad:5 }));
    vagG.push(Kit.taper([new THREE.Vector3(sg*0.24,0.85,0.70), new THREE.Vector3(sg*0.05,0.62,0.78), new THREE.Vector3(-sg*0.22,0.50,0.80)], 0.038, 0.022, { seg:10, rad:5 }));
    vagG.push(Kit.taper([new THREE.Vector3(sg*0.24,0.85,0.70), new THREE.Vector3(sg*0.30,0.30,0.74), new THREE.Vector3(sg*0.26,-0.20,0.72)], 0.034, 0.020, { seg:10, rad:5 }));
  });
  const vagMesh = new THREE.Mesh(Kit.merge(vagG), mVagus); vagMesh.userData.sub='destinos';
  /* siluetas de los órganos de destino, para situar las ramas */
  const heartS = new THREE.Mesh(Kit.sculpt({ w:low?18:30, h:low?14:22, radii:[0.24,0.28,0.20] }), mTarget);
  heartS.position.set(0.10,1.88,0.98); heartS.userData.sub='destinos';
  const gutS = new THREE.Mesh(Kit.sculpt({ w:low?18:30, h:low?14:22, radii:[0.34,0.22,0.20],
    disp:(p)=>0.03*Kit.fbm(p.x*6,p.y*6,p.z*6,2) }), mTarget);
  gutS.position.set(-0.32,0.42,0.86); gutS.userData.sub='destinos';
  add('vago', [vagMesh, heartS, gutS], { explodeDir:new THREE.Vector3(0.2,0.1,1).normalize() });

  /* =====================================================================
     5 · LUPA A: LA NEURONA COMPLETA
     ===================================================================== */
  const ringMat = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:false });
  const NC = new THREE.Vector3(5.80, 3.00, 0.40);
  const ringN = new THREE.Mesh(new THREE.TorusGeometry(2.00, 0.026, 8, low?40:64), ringMat);
  ringN.position.copy(NC); ringN.lookAt(NC.clone().add(new THREE.Vector3(0.10,0.05,1)));
  const nLeadTo = new THREE.Vector3(1.30, 2.55, 0.20);
  const nDir = nLeadTo.clone().sub(NC).normalize();
  const nLead = new THREE.Mesh(Kit.taper([NC.clone().addScaledVector(nDir,2.00), nLeadTo], 0.013, 0.013, { seg:4, rad:6 }), ringMat);
  E.scene.add(ringN, nLead);

  const SOMA = new THREE.Vector3(4.42, 3.95, 0.40);
  const somaM = new THREE.Mesh(Kit.sculpt({ w:low?24:40, h:low?18:30, radii:[0.30,0.27,0.26],
    disp:(p)=>0.025*Kit.fbm(p.x*5,p.y*5,p.z*5,2) }), mSoma);
  somaM.position.copy(SOMA); somaM.userData.sub='soma';
  const dendG = [];
  [[-0.62,0.42],[-0.30,0.66],[0.06,0.62],[-0.68,0.02],[-0.46,-0.36]].forEach(([dx,dy],i) => {
    const a = SOMA.clone(), b = SOMA.clone().add(new THREE.Vector3(dx*0.55, dy*0.55, 0.04*(i%2?1:-1)));
    const c = SOMA.clone().add(new THREE.Vector3(dx, dy, 0.08*(i%2?1:-1)));
    dendG.push(Kit.taper([a,b,c], 0.055, 0.020, { seg:seg(10), rad:6 }));
    [-1,1].forEach(s2 => { const d = c.clone().add(new THREE.Vector3(dx*0.36 - s2*dy*0.22, dy*0.36 + s2*dx*0.22, 0.05*s2));
      dendG.push(Kit.taper([c, d], 0.018, 0.009, { seg:6, rad:5 })); });
  });
  const dendM = new THREE.Mesh(Kit.merge(dendG), mSoma); dendM.userData.sub='soma';

  /* cono axónico y axón mielinizado */
  const AX0 = new THREE.Vector3(4.78, 3.70, 0.40), AX1 = new THREE.Vector3(7.18, 3.28, 0.40);
  const conoM = new THREE.Mesh(Kit.taper([SOMA.clone().add(new THREE.Vector3(0.20,-0.14,0)), AX0], 0.175, 0.062, { seg:seg(10), rad:10 }), mSoma);
  conoM.userData.sub='cono';
  const axonM = new THREE.Mesh(Kit.taper([AX0, AX1], 0.050, 0.046, { seg:seg(16), rad:low?7:10 }), mAxon);
  axonM.userData.sub='nodo';
  const NSEG = low ? 5 : 6;
  const myelG = [], schwG = [], nodes = [];
  const axDir = AX1.clone().sub(AX0);
  const perpN = new THREE.Vector3(-axDir.y, axDir.x, 0).normalize();
  const gapK = 0.030;
  for (let i=0;i<NSEG;i++){
    const u0 = i/NSEG + gapK*0.5, u1 = (i+1)/NSEG - gapK*0.5;
    const a = AX0.clone().addScaledVector(axDir, u0), b = AX0.clone().addScaledVector(axDir, u1);
    myelG.push(Kit.taper([a, a.clone().lerp(b,0.5), b], 0, 0,
      { rfn:t => 0.055 + 0.070*Math.sin(Math.PI*Math.min(1,Math.max(0,t))), seg:seg(12), rad:low?8:12 }));
    const mid = a.clone().lerp(b,0.5).addScaledVector(perpN, 0.100);
    schwG.push(ball(mid, 0.055, 9));
    if (i < NSEG-1) nodes.push(AX0.clone().addScaledVector(axDir, (i+1)/NSEG));
  }
  nodes.unshift(AX0.clone().addScaledVector(axDir, 0.012));
  nodes.push(AX1.clone());
  const myelM = new THREE.Mesh(Kit.merge(myelG), mMyel); myelM.userData.sub='mielina';
  const schwM = new THREE.Mesh(Kit.merge(schwG), mSchw); schwM.userData.sub='mielina';

  /* terminales sinápticos */
  const termG = [];
  const TERM = [];
  [[0.30,0.24],[0.34,-0.02],[0.28,-0.28]].forEach(([dx,dy]) => {
    const b = AX1.clone().add(new THREE.Vector3(dx, dy, 0));
    termG.push(Kit.taper([AX1, AX1.clone().lerp(b,0.55), b], 0.036, 0.022, { seg:8, rad:6 }));
    termG.push(ball(b.clone().add(new THREE.Vector3(0.05, dy*0.18, 0)), 0.070, 10)); TERM.push(b);
  });
  const termM = new THREE.Mesh(Kit.merge(termG), mSoma); termM.userData.sub='terminal';

  /* axón sin mielina, para comparar */
  const BX0 = new THREE.Vector3(4.80, 2.80, 0.40), BX1 = new THREE.Vector3(7.18, 2.44, 0.40);
  const bareM = new THREE.Mesh(Kit.taper([BX0, BX1], 0.046, 0.042, { seg:seg(18), rad:low?7:10 }), mAxon);
  bareM.userData.sub='amielinico';
  const bareSoma = new THREE.Mesh(ball(BX0.clone().add(new THREE.Vector3(-0.16,0.04,0)), 0.13, 12), mSoma);
  bareSoma.userData.sub='amielinico';

  add('neurona', [somaM, dendM, conoM, axonM, myelM, schwM, termM, bareM, bareSoma],
      { explodeDir:new THREE.Vector3(1,0.3,0.2).normalize() });

  /* --- curva de voltaje dibujada en el espacio, dentro de la lupa --- */
  const VX0 = 4.36, VX1 = 7.24, VZ = 0.40;
  const yOfV = v => 1.48 + (v + 80)/120*0.74;
  const vOfT = t => {                                   /* mV en función de la fase 0→1 */
    if (t < 0.14) return -70;
    if (t < 0.20) return -70 + (t-0.14)/0.06*15;        /* hasta el umbral (−55 mV) */
    if (t < 0.32) return -55 + (t-0.20)/0.12*95;        /* despolarización: entra Na⁺ (+40 mV) */
    if (t < 0.54) return 40 - (t-0.32)/0.22*120;        /* repolarización: sale K⁺ (−80 mV) */
    if (t < 0.80) return -80 + (t-0.54)/0.26*10;        /* hiperpolarización */
    return -70;
  };
  const vPos = t => new THREE.Vector3(VX0 + (VX1-VX0)*t, yOfV(vOfT(t)), VZ);
  const tracePts = []; for (let i=0;i<=(low?60:110);i++) tracePts.push(vPos(i/(low?60:110)));
  const traceM = new THREE.Mesh(Kit.taper(tracePts, 0.024, 0.024, { seg:low?60:110, rad:5 }),
    new THREE.MeshBasicMaterial({ color:0xFFC24D, toneMapped:false }));
  const axisMat = new THREE.MeshBasicMaterial({ color:0x8FA3B5, toneMapped:false });
  const restLine = new THREE.Mesh(Kit.taper([[VX0-0.08, yOfV(-70), VZ],[VX1+0.06, yOfV(-70), VZ]], 0.008, 0.008, { seg:4, rad:4 }), axisMat);
  const thrLine  = new THREE.Mesh(Kit.taper([[VX0-0.08, yOfV(-55), VZ],[VX1+0.06, yOfV(-55), VZ]], 0.008, 0.008, { seg:4, rad:4 }),
    new THREE.MeshBasicMaterial({ color:0xE0705A, toneMapped:false }));
  const vAxis = new THREE.Mesh(Kit.taper([[VX0-0.08, yOfV(-84), VZ],[VX0-0.08, yOfV(46), VZ]], 0.008, 0.008, { seg:4, rad:4 }), axisMat);
  E.scene.add(traceM, restLine, thrLine, vAxis);
  const vBead = new THREE.Mesh(new THREE.SphereGeometry(0.070, 12, 9), new THREE.MeshBasicMaterial({ color:0xFFF0B0, toneMapped:false }));
  vBead.visible = false; vBead.renderOrder = 15; E.scene.add(vBead);

  /* =====================================================================
     6 · LUPA B: LA SINAPSIS QUÍMICA
     ===================================================================== */
  const SC = new THREE.Vector3(5.72, -0.88, 0.40);
  const ringS = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.024, 8, low?36:56), ringMat);
  ringS.position.copy(SC); ringS.lookAt(SC.clone().add(new THREE.Vector3(0.10,0.05,1)));
  const sFrom = TERM[1].clone().add(new THREE.Vector3(0.14,0,0));
  const sDirv = sFrom.clone().sub(SC).normalize();
  const sLead = new THREE.Mesh(Kit.taper([SC.clone().addScaledVector(sDirv,1.68), sFrom], 0.013, 0.013, { seg:4, rad:6 }), ringMat);
  E.scene.add(ringS, sLead);

  const PRE = new THREE.Vector3(5.44, -0.78, 0.40);          /* centro del terminal presináptico */
  const uAx = new THREE.Vector3(0.7071, -0.7071, 0);          /* eje pre → post */
  const pAx = new THREE.Vector3(0.7071, 0.7071, 0);           /* perpendicular, dentro del plano */
  const qAx = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), uAx);
  const qAxN = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), uAx.clone().negate());
  const PFACE = PRE.clone().addScaledVector(uAx, 0.38);       /* membrana presináptica */
  const SFACE = PRE.clone().addScaledVector(uAx, 0.74);       /* membrana postsináptica */
  /* terminal presináptico translúcido, para que se vean las vesículas de dentro */
  const preSkin = Kit.tissue({ color:0xDE9A63, rough:0.45, coat:0.4, env:0.6, transparent:true, opacity:0.34 });
  const preM = new THREE.Mesh(Kit.sculpt({ w:low?24:40, h:low?18:30, radii:[0.42,0.42,0.36],
    disp:(p,d) => -0.16*Math.max(0, d.x*uAx.x + d.y*uAx.y - 0.55) }), preSkin);
  preM.position.copy(PRE); preM.userData.sub='pre'; preM.renderOrder = 5;
  const preAx = new THREE.Mesh(Kit.taper([PRE.clone().addScaledVector(uAx,-1.05), PRE.clone().addScaledVector(uAx,-0.28)], 0.085, 0.16, { seg:seg(8), rad:8 }), mPre);
  preAx.userData.sub='pre';
  /* vesículas cargadas de neurotransmisor */
  const vesPos = [], vesG = [];
  for (let i=0;i<11;i++){
    const a = RND()*Math.PI*2, r = 0.06 + 0.17*Math.sqrt(RND());
    const c = PRE.clone().addScaledVector(uAx, -0.10 + 0.26*(RND()-0.5)).addScaledVector(pAx, Math.cos(a)*r).add(new THREE.Vector3(0,0,Math.sin(a)*r*0.75));
    vesPos.push(c); vesG.push(ball(c, 0.072, 10));
  }
  const vesM = new THREE.Mesh(Kit.merge(vesG), mVes); vesM.userData.sub='pre';
  /* membrana postsináptica: bloque grueso con su cara mirando a la hendidura */
  const slab = new THREE.Mesh(new THREE.BoxGeometry(1.30, 0.44, 0.78), mPost);
  slab.position.copy(SFACE.clone().addScaledVector(uAx, 0.22));
  slab.quaternion.copy(qAxN); slab.userData.sub='receptor';
  /* receptores asomando hacia la hendidura */
  const recG = [], REC = [];
  for (let i=0;i<5;i++){
    const off = (i-2)*0.25;
    const c = SFACE.clone().addScaledVector(pAx, off).addScaledVector(uAx, -0.07);
    const g = new THREE.CylinderGeometry(0.105, 0.080, 0.22, low?8:12);
    g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(qAxN)); g.translate(c.x,c.y,c.z);
    recG.push(g); REC.push(c.clone().addScaledVector(uAx,-0.10));
  }
  const recM = new THREE.Mesh(Kit.merge(recG), mRecep); recM.userData.sub='receptor';
  /* transportador de recaptación, en la membrana presináptica */
  const trC = PFACE.clone().addScaledVector(pAx, 0.30);
  const trG = new THREE.CylinderGeometry(0.095, 0.075, 0.22, low?8:12);
  trG.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(qAx)); trG.translate(trC.x,trC.y,trC.z);
  const trM = new THREE.Mesh(trG, mTrans); trM.userData.sub='recapta';
  add('sinapsis', [preAx, preM, vesM, slab, recM, trM], { explodeDir:new THREE.Vector3(1,-0.5,0.2).normalize() });

  /* =====================================================================
     ANIMACIÓN 1 · POTENCIAL DE ACCIÓN Y CONDUCCIÓN SALTATORIA
     ===================================================================== */
  const basic = c => new THREE.MeshBasicMaterial({ color:c, toneMapped:false, depthTest:false });
  const top = m => { m.renderOrder = 16; return m; };
  const apMat = basic(0xFFE06A), naMat = basic(0xF4813C), kMat = basic(0x5E4FD0), slowMat = basic(0x9FB6C6);
  const ap = { on:false, t:0, speed:1, na:[], k:[] };
  const apDot = top(new THREE.Mesh(new THREE.SphereGeometry(0.105, 12, 9), apMat)); apDot.visible=false; E.scene.add(apDot);
  const slowDot = top(new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 9), slowMat)); slowDot.visible=false; E.scene.add(slowDot);
  for (let i=0;i<3;i++){
    const a = top(new THREE.Mesh(new THREE.SphereGeometry(0.042, 8, 6), naMat)); a.visible=false; E.scene.add(a); ap.na.push(a);
    const b = top(new THREE.Mesh(new THREE.SphereGeometry(0.042, 8, 6), kMat));  b.visible=false; E.scene.add(b); ap.k.push(b);
  }
  const apParts = [apDot, slowDot, ...ap.na, ...ap.k, vBead];

  /* =====================================================================
     ANIMACIÓN 2 · TRANSMISIÓN SINÁPTICA
     ===================================================================== */
  const ntMat = basic(0x54D6E8), ntBack = basic(0x3E8E6E), caMat = basic(0xF2C53D);
  const syn = { on:false, t:0, speed:1, nt:[], ca:[], ves:[] };
  for (let i=0;i<10;i++){ const m = top(new THREE.Mesh(new THREE.SphereGeometry(0.046, 8, 6), ntMat));
    m.userData = { off:i/10, rec:REC[i % REC.length], src:vesPos[i % vesPos.length] }; m.visible=false; E.scene.add(m); syn.nt.push(m); }
  for (let i=0;i<4;i++){ const m = top(new THREE.Mesh(new THREE.SphereGeometry(0.040, 8, 6), caMat));
    m.userData = { off:i/4 }; m.visible=false; E.scene.add(m); syn.ca.push(m); }
  for (let i=0;i<3;i++){ const m = top(new THREE.Mesh(new THREE.SphereGeometry(0.052, 8, 6), ntBack));
    m.userData = { off:i/3 }; m.visible=false; E.scene.add(m); syn.ves.push(m); }
  const synParts = [...syn.nt, ...syn.ca, ...syn.ves];

  /* =====================================================================
     ANIMACIÓN 3 · ARCO REFLEJO DE RETIRADA
     ===================================================================== */
  const sensCurve = Kit.curve([[3.05,0.02,0.30],[2.78,0.62,0.26],[2.36,1.30,0.20],[1.90,1.92,0.20],
                               [1.42,2.46,0.20],[0.86,2.30,0.02],[0.50,2.14,-0.22],[0.14,2.20,-0.08]]);
  const motCurve  = Kit.curve([[0.14,2.12,0.06],[0.46,2.04,0.20],[0.92,2.34,0.22],[1.42,2.46,0.20],
                               [1.92,2.02,0.22],[2.34,1.52,0.26]]);
  const upCurve   = Kit.curve([[0.14,2.18,0.0],[0.06,2.80,0.03],[0.02,3.35,0.05],[0,3.95,0.03],[0,4.55,0.0],[0,5.00,0.05]]);
  const ref = { on:false, t:0, speed:1, sens:[], mot:[], up:[] };
  const sensMat = basic(0x4FC3E8), motMat = basic(0xFF8A3D), upMat = basic(0xC49BE0);
  for (let i=0;i<5;i++){ const m = top(new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), sensMat)); m.userData.off=i/5*0.12; m.visible=false; E.scene.add(m); ref.sens.push(m); }
  for (let i=0;i<5;i++){ const m = top(new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), motMat)); m.userData.off=i/5*0.12; m.visible=false; E.scene.add(m); ref.mot.push(m); }
  for (let i=0;i<4;i++){ const m = top(new THREE.Mesh(new THREE.SphereGeometry(0.060, 10, 8), upMat)); m.userData.off=i/4*0.10; m.visible=false; E.scene.add(m); ref.up.push(m); }
  const handM = new THREE.Mesh(Kit.sculpt({ w:low?18:28, h:low?14:20, radii:[0.20,0.26,0.13] }),
    Kit.tissue({ color:0xE2B597, rough:0.55, coat:0.2 }));
  handM.position.set(3.18,-0.20,0.32); handM.visible=false; E.scene.add(handM);
  const musM = new THREE.Mesh(Kit.sculpt({ w:low?18:28, h:low?14:20, radii:[0.16,0.26,0.16] }),
    Kit.tissue({ color:0xB8544A, rough:0.55, coat:0.25 }));
  musM.position.set(2.34,1.52,0.30); musM.visible=false; E.scene.add(musM);
  const stimM = top(new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 9), basic(0xFF5A32)));
  stimM.position.set(3.26,-0.36,0.44); stimM.visible=false; E.scene.add(stimM);
  const interM = top(new THREE.Mesh(new THREE.SphereGeometry(0.10, 10, 8), basic(0xFFE06A)));
  interM.position.set(0.14,2.16,0.0); interM.visible=false; E.scene.add(interM);
  const refParts = [...ref.sens, ...ref.mot, ...ref.up, handM, musM, stimM, interM];

  /* ---------- fases de texto ---------- */
  const apPhase = tau =>
      tau < 0.14 ? 'Reposo · −70 mV. La bomba de sodio y potasio mantiene el desequilibrio: más Na⁺ fuera, más K⁺ dentro'
    : tau < 0.20 ? 'Umbral · a −55 mV se abren de golpe los canales de sodio. Por debajo del umbral no pasa nada: es todo o nada'
    : tau < 0.32 ? 'Despolarización · entra Na⁺ a favor de su gradiente y el interior llega a +40 mV'
    : tau < 0.54 ? 'Repolarización · se cierran los canales de sodio y sale K⁺: el voltaje vuelve a caer'
    : tau < 0.80 ? 'Hiperpolarización · sale K⁺ de más y la membrana queda en −80 mV, por debajo del reposo'
    : 'Periodo refractario · los canales de sodio están inactivados: ese tramo no puede volver a dispararse y el impulso solo avanza hacia adelante';

  const model = {
    anims:[
      { id:'potencial', label:'Potencial de acción y conducción saltatoria (lupa de la neurona)',
        get on(){ return ap.on; },
        set(on){ ap.on = on; ap.t = 0; apParts.forEach(p => p.visible = on); if (on) E.focus(NC.clone(), 5.6); },
        focus:true },
      { id:'sinapsis', label:'Sinapsis química: vesículas, hendidura, receptores y recaptación (lupa)',
        get on(){ return syn.on; },
        set(on){ syn.on = on; syn.t = 0; synParts.forEach(p => p.visible = on); if (on) E.focus(SC.clone(), 4.4); },
        focus:true },
      { id:'reflejo', label:'Arco reflejo: retirar la mano antes de sentir el dolor',
        get on(){ return ref.on; },
        set(on){ ref.on = on; ref.t = 0; refParts.forEach(p => p.visible = on);
          if (on) E.focus(new THREE.Vector3(1.4,2.2,0.2), 11); else musM.scale.setScalar(1); },
        focus:true }
    ],
    setSpeed(k){ ap.speed = k; syn.speed = k; ref.speed = k; },
    phaseText(){
      if (ap.on){ const tau = (ap.t*NSEG) % 1; const nodo = Math.min(NSEG, Math.floor(ap.t*NSEG)+1);
        return `Nódulo ${nodo} de ${NSEG} · ${apPhase(tau)} · el axón de abajo, sin mielina, va mucho más atrás con la misma señal`; }
      if (syn.on){ const p = syn.t % 1;
        return p < 0.20 ? 'Llega el potencial de acción al terminal: se abren canales de calcio y entra Ca²⁺ (amarillo)'
             : p < 0.38 ? 'El calcio hace que las vesículas se fusionen con la membrana y viertan el neurotransmisor'
             : p < 0.60 ? 'Difusión por la hendidura sináptica (20–40 nm): las moléculas la cruzan en menos de 1 ms'
             : p < 0.80 ? 'Unión a los receptores postsinápticos: se abren canales y cambia el voltaje de la neurona siguiente'
             : 'Se apaga la señal: transportadores de recaptación devuelven el neurotransmisor al terminal para reutilizarlo'; }
      if (ref.on){ const p = ref.t % 1;
        return p < 0.10 ? 'Estímulo doloroso en la mano: los nociceptores de la piel disparan'
             : p < 0.34 ? 'Vía sensitiva: nervio de la mano → plexo braquial → raíz dorsal → asta posterior de la médula'
             : p < 0.42 ? 'Interneurona en la médula: la señal se desvía directamente a la motoneurona. El encéfalo aún no interviene'
             : p < 0.64 ? 'Vía motora: raíz ventral → nervio → músculo. La mano ya se retiró, en unos 30 ms'
             : p < 0.85 ? 'Solo ahora la señal termina de subir por la médula y el tronco hacia el encéfalo'
             : 'Dolor consciente: llega entre 0,3 y 0,5 s después. Primero te apartas; después te duele'; }
      return '';
    },
    legend:[
      { color:'#FFE06A', txt:'Potencial de acción saltando de nódulo en nódulo (axón con mielina)' },
      { color:'#9FB6C6', txt:'La misma señal en el axón sin mielina: mucho más lenta' },
      { color:'#F4813C', txt:'Na⁺ entrando: despolarización' },
      { color:'#5E4FD0', txt:'K⁺ saliendo: repolarización' },
      { color:'#F2C53D', txt:'Ca²⁺ entrando al terminal: dispara la liberación de vesículas' },
      { color:'#54D6E8', txt:'Neurotransmisor cruzando la hendidura' },
      { color:'#3E8E6E', txt:'Recaptación: el neurotransmisor vuelve al terminal' },
      { color:'#4FC3E8', txt:'Vía sensitiva (entra por la raíz dorsal)' },
      { color:'#FF8A3D', txt:'Vía motora (sale por la raíz ventral)' },
      { color:'#C49BE0', txt:'Vía ascendente hacia el encéfalo: el dolor consciente' }
    ],
    observa:'en el potencial de acción, la curva de voltaje y el punto del axón van juntos: cada vez que el punto salta a un nódulo, la curva recorre un ciclo completo y la altura del pico es siempre la misma, aunque esté lejos del soma. Compara los dos axones: el de arriba salta de nódulo en nódulo y el de abajo avanza punto a punto. En el arco reflejo, fíjate en que la partícula naranja ya llegó al músculo cuando la morada todavía va subiendo hacia el encéfalo.'
  };

  /* ---------- bucle ---------- */
  E.onFrame((t, dt) => {
    if (!motionOK()) return;

    if (ap.on){
      ap.t = (ap.t + dt*0.055*ap.speed) % 1;
      const idx = Math.min(nodes.length-1, Math.floor(ap.t*NSEG));
      const tau = (ap.t*NSEG) % 1;
      const nd = nodes[idx];
      apDot.position.copy(nd);
      const fire = tau > 0.14 && tau < 0.60;
      apDot.scale.setScalar(fire ? 1.0 + 0.55*Math.sin((tau-0.14)/0.46*Math.PI) : 0.55);
      vBead.position.copy(vPos(tau));
      /* iones en el nódulo activo */
      ap.na.forEach((m,i) => { const inWin = tau > 0.17 && tau < 0.34; m.visible = inWin;
        if (!inWin) return; const k = (tau-0.17)/0.17; const a = i/3*Math.PI*2;
        m.position.copy(nd).addScaledVector(perpN, (0.30 - 0.27*k)*(i%2?1:-1)).add(new THREE.Vector3(0,0,Math.sin(a)*0.06)); });
      ap.k.forEach((m,i) => { const inWin = tau > 0.33 && tau < 0.56; m.visible = inWin;
        if (!inWin) return; const k = (tau-0.33)/0.23; const a = i/3*Math.PI*2 + 1;
        m.position.copy(nd).addScaledVector(perpN, (0.04 + 0.26*k)*(i%2?-1:1)).add(new THREE.Vector3(0,0,Math.cos(a)*0.06)); });
      /* axón sin mielina: la misma señal, mucho más lenta */
      const slow = Math.min(1, ap.t*0.38);
      slowDot.position.lerpVectors(BX0, BX1, slow);
      slowDot.scale.setScalar(0.85 + 0.25*Math.sin(t*6));
    }

    if (syn.on){
      syn.t += dt*0.11*syn.speed; const p = syn.t % 1;
      syn.ca.forEach((m,i) => { const k = (p*1.6 + m.userData.off) % 1; m.visible = p < 0.42;
        m.position.copy(PFACE).addScaledVector(uAx, -0.05 - 0.28*k).addScaledVector(pAx, (i%2?1:-1)*(0.14+0.09*i)); });
      syn.ves.forEach((m,i) => { const k = (p*1.3 + m.userData.off) % 1; m.visible = p > 0.12 && p < 0.52;
        m.position.copy(vesPos[i*3 % vesPos.length]).lerp(PFACE.clone().addScaledVector(uAx,-0.06), k);
        m.scale.setScalar(1 - 0.5*k); });
      syn.nt.forEach((m) => { const k = ((p - 0.30 + m.userData.off*0.12)/0.45); m.visible = k > 0 && k < 1.25;
        if (!m.visible) return;
        const from = PFACE.clone().addScaledVector(uAx, 0.03);
        if (k <= 1){ m.position.lerpVectors(from, m.userData.rec, Math.min(1,k)); m.material = ntMat; m.scale.setScalar(0.85+0.3*Math.sin(k*Math.PI)); }
        else { const back = (k-1)/0.25; m.position.lerpVectors(m.userData.rec, trC, back); m.material = ntBack; m.scale.setScalar(1); } });
    }

    if (ref.on){
      ref.t = (ref.t + dt*0.085*ref.speed) % 1; const p = ref.t;
      stimM.visible = true; stimM.scale.setScalar(p < 0.14 ? 1 + 0.5*Math.sin(t*14) : 0.55);
      interM.visible = p > 0.32 && p < 0.46; interM.scale.setScalar(1 + 0.7*Math.sin(Math.max(0,(p-0.32))/0.14*Math.PI));
      ref.sens.forEach(m => { const k = (p - 0.10 - m.userData.off)/0.26; m.visible = k > 0 && k < 1;
        if (m.visible) m.position.copy(sensCurve.getPointAt(Math.min(0.999, Math.max(0.001,k)))); });
      ref.mot.forEach(m => { const k = (p - 0.42 - m.userData.off)/0.22; m.visible = k > 0 && k < 1;
        if (m.visible) m.position.copy(motCurve.getPointAt(Math.min(0.999, Math.max(0.001,k)))); });
      ref.up.forEach(m => { const k = (p - 0.34 - m.userData.off)/0.50; m.visible = k > 0 && k < 1;
        if (m.visible) m.position.copy(upCurve.getPointAt(Math.min(0.999, Math.max(0.001,k)))); });
      const contract = p > 0.60 && p < 0.80 ? Math.sin((p-0.60)/0.20*Math.PI) : 0;
      musM.scale.set(1 + 0.35*contract, 1 - 0.22*contract, 1 + 0.35*contract);
      handM.position.y = -0.20 + 0.30*contract;
    }
  });

  return model;
}

BIO.organs.nervioso = BIO.nerves;
BIO.builders.nervioso = buildNerves;
route('/explorar/nervioso', (view,q) => organView(view, q, BIO.nerves, buildNerves));
/* los enlaces antiguos al marcador «en construcción» llevan al modelo real */
route('/explorar/organo/nervioso', () => navigate('#/explorar/nervioso'));
</script>
