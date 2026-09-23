<script>
/* =====================================================================
   ÓRGANO: SISTEMA ESQUELÉTICO — el andamio vivo que se rehace solo
   Datos (BIO.skeleton) + modelo 3D procedimental (buildSkeleton)
   Ruta: #/explorar/esqueletico
   ===================================================================== */
BIO.skeleton = {
  capasHint:"Sugerencia: apaga «Esqueleto apendicular» para quedarte con el eje del cuerpo (cráneo, columna y costillas) y ver bien las cuatro curvaturas de perfil. Para estudiar la rodilla, activa solo «Articulaciones» y usa 🔍 Ver en detalle.",
  id:"esqueletico", nombre:"Sistema esquelético", unidad:6, dominio:"anat",
  eyebrow:"Atlas 3D · Unidad 6 · Sostén, movimiento y médula ósea", em:"🦴",
  intro:"Doscientos seis huesos que no son piedras: son tejido vivo, con células, vasos y nervios, que se derriba y se levanta cada día según cómo lo uses. Recorre el esqueleto región por región, abre la rodilla por dentro y entra con la lupa a ver las osteonas, las trabéculas y la médula roja donde nace tu sangre.",
  nota:"Modelo tridimensional simplificado con fines educativos. Se representan las regiones funcionales, no los 206 huesos uno por uno: las vértebras, las costillas, los huesos de la mano y del pie están agrupados y esquematizados. Las proporciones siguen las de una persona adulta de talla media, pero el relieve real de cada hueso (crestas, tuberosidades, agujeros) es mucho más complejo. La rodilla se muestra con la cápsula transparente para dejar ver su interior. El tejido de las lupas está ampliado unas 200 veces: una osteona real mide 0,2 mm y no se ve a simple vista.",
  focusR:7, radius:23.2, target:[0.55,0.2,0], phi:1.46, theta:0.30, floor:-6.15, floorSize:16,
  capas:[
    {id:"axial", n:"Esqueleto axial (cráneo, columna, tórax)"},
    {id:"apendicular", n:"Esqueleto apendicular (cinturas y miembros)"},
    {id:"articulaciones", n:"Articulaciones"},
    {id:"lupa", n:"Hueso al microscopio (lupa)"}
  ],
  opacityCapas:["axial","apendicular"], opacityLabel:"Transparencia de los huesos", opacityDefault:1,
  activity:"explorar-esqueletico", guidedActivity:"guiada-esqueletico", badge:"anatomista", seenThreshold:8,
  related:[
    {t:"Explorar los pulmones", href:"#/explorar/pulmones"},
    {t:"La célula ampliada", href:"#/explorar/celula"},
    {t:"Cuerpo humano y salud", href:"#/area/cuerpo"}
  ],
  reto:{
    proposito:"Comprobar que el hueso no es un material muerto que solo sostiene, sino un tejido vivo que se derriba y se reconstruye toda la vida, y que se construye justo donde se lo usa.",
    pista:"Las dos lupas están a la derecha del esqueleto, unidas al fémur por una línea azul. La rodilla abierta está en la pierna izquierda del modelo: usa 🔍 Ver en detalle para entrar.",
    observa:[
      {id:"esponjoso-medula", txt:"Las trabéculas del hueso esponjoso: hacia dónde apuntan y qué hay en los huecos"},
      {id:"hueso-compacto", txt:"La osteona: los anillos de laminillas, el conducto de Havers y los osteocitos en sus lagunas"},
      {id:"rodilla", txt:"La rodilla por dentro: cartílago, meniscos, ligamentos y líquido sinovial"},
      {id:"columna", txt:"Las cuatro curvaturas de la columna vistas de perfil"}
    ],
    pregunta:{
      q:"Un astronauta pasa seis meses en la Estación Espacial y vuelve con los huesos más débiles, aunque comió bien y tomó calcio. ¿Cuál es la mejor explicación?",
      ops:[
        "En el espacio el calcio no se absorbe en el intestino",
        "Sin peso que soportar, las trabéculas dejan de recibir carga y el hueso retira material donde ya no se lo necesita",
        "La radiación del espacio destruye directamente los huesos"
      ],
      ok:1,
      fb:"Eso es la ley de Wolff en acción: el hueso se remodela según las fuerzas que recibe. En microgravedad los osteoclastos siguen excavando pero los osteoblastos ya no reciben la señal mecánica para rellenar, y se pierde alrededor del 1 % de masa ósea por mes, sobre todo en la cadera y la columna. Por eso en la estación espacial el ejercicio con carga no es opcional: es tratamiento. Y por eso, en la Tierra, estar meses en cama o con un yeso también debilita el hueso.",
      wrong:[
        "El calcio se absorbe igual: el intestino no depende de la gravedad. De hecho, el calcio sobra en la sangre de los astronautas, porque sale del hueso y se elimina por la orina, y eso les da cálculos renales.",
        "La radiación es un problema real para otros tejidos, pero la pérdida ósea aparece desde los primeros días y se corrige con ejercicio de carga: la causa es mecánica, no radiológica."
      ]
    }
  },
  structures:[

    {id:"craneo", nombre:"Cráneo", capa:"axial", color:"#EFE6D2", pos:[0,5.40,0.12], lbl:[-1.85,6.02,0.62],
      n1:"La caja ósea que protege el encéfalo y sostiene la cara. Son 22 huesos, y solo uno de ellos se mueve: la mandíbula.",
      n2:"Se divide en dos partes. El neurocráneo (8 huesos: frontal, dos parietales, dos temporales, occipital, esfenoides y etmoides) forma una bóveda cerrada alrededor del cerebro, con un agujero grande en la base —el agujero occipital— por donde sale la médula espinal. El macizo facial (14 huesos) aloja las órbitas, la nariz y los dientes. Los huesos planos de la bóveda no se unen con articulaciones móviles sino con suturas: bordes dentados que encajan como las piezas de un rompecabezas.",
      n3:"Al nacer las suturas están abiertas y quedan zonas membranosas, las fontanelas, que permiten que la cabeza se deforme al pasar por el canal del parto y que el cerebro siga creciendo: la fontanela anterior no se cierra hasta los 18–24 meses. Por eso un recién nacido tiene unos 270 huesos y un adulto 206: muchos se fusionan. El hueso más pequeño del cuerpo está aquí dentro, en el oído medio: el estribo, de unos 3 mm.",
      dato:"Un recién nacido tiene unos 270 huesos; un adulto, 206. La diferencia son los que se fusionan.",
      conecta:["columna","tipos-articulaciones","hueso-compacto"], temas:["Sistema nervioso","Protección","Crecimiento"],
      partes:[
        {n:"Neurocráneo (bóveda)", d:"Los huesos planos que encierran el encéfalo: frontal, parietales, temporales y occipital.", at:[0,6.06,0.04], sub:"boveda"},
        {n:"Suturas", d:"Las uniones dentadas e inmóviles entre los huesos planos. Son articulaciones fibrosas.", at:[0,6.13,0.04], sub:"suturas"},
        {n:"Órbitas y macizo facial", d:"Las cuencas de los ojos y los huesos de la nariz y el maxilar superior.", at:[0.26,5.14,0.60], sub:"cara"},
        {n:"Mandíbula", d:"El único hueso móvil del cráneo. Se articula con el temporal y permite masticar y hablar.", at:[0,4.50,0.45], sub:"mandibula"}
      ],
      quiz:{q:"¿Qué tipo de unión hay entre los huesos planos de la bóveda craneal en un adulto?", ops:["Articulaciones móviles con líquido sinovial","Suturas: uniones fibrosas prácticamente inmóviles","No están unidos: flotan sobre el cerebro"], ok:1,
        fb:"Las suturas son articulaciones fibrosas: sus bordes dentados encajan y casi no permiten movimiento, que es justo lo que se necesita para proteger el encéfalo.",
        wrong:["El líquido sinovial aparece en articulaciones que deben moverse, como la rodilla o el hombro. En la bóveda del cráneo el movimiento sería un problema, no una ventaja.","Sí están unidos, y con firmeza. Lo que está abierto al nacer son las fontanelas, y se cierran en los primeros dos años."]}},

    {id:"columna", nombre:"Columna vertebral", capa:"axial", color:"#E6DCC6", pos:[0,3.00,-0.12], lbl:[-3.91,2.79,1.11],
      n1:"El eje del cuerpo: 33 vértebras apiladas que sostienen el tronco, protegen la médula espinal y permiten doblarse en todas las direcciones.",
      n2:"Se ordena en cinco regiones: 7 cervicales (las del cuello, las más pequeñas y móviles), 12 torácicas (donde se articulan las costillas), 5 lumbares (las más gruesas, porque cargan más peso), 5 sacras fusionadas en un solo hueso —el sacro— y 4 coccígeas fusionadas en el cóccix. Entre una vértebra y la siguiente hay un disco intervertebral: un anillo fibroso con un núcleo gelatinoso que amortigua los golpes y permite que cada par se incline un poco. Sumados, esos poquitos dan un movimiento enorme.",
      n3:"Vista de perfil la columna no es recta sino una doble S, con cuatro curvaturas alternas: cervical y lumbar cóncavas hacia atrás (lordosis), torácica y sacra cóncavas hacia adelante (cifosis). Las dos primarias (torácica y sacra) ya están en el feto; las secundarias aparecen después: la cervical cuando el bebé levanta la cabeza a los 3 meses, la lumbar cuando empieza a caminar al año. Esa forma de resorte multiplica por unas 10 veces la resistencia a la compresión frente a una columna recta. Los discos pierden agua durante el día: por eso medimos 1–2 cm menos por la noche que al despertar.",
      dato:"Mides 1 a 2 cm menos en la noche que en la mañana: los discos se deshidratan con las horas de pie.",
      conecta:["craneo","caja-toracica","cintura-pelvica"], temas:["Sostén","Sistema nervioso","Postura"],
      partes:[
        {n:"Región cervical (7 vértebras)", d:"Las del cuello. Las dos primeras, atlas y axis, permiten decir «sí» y «no».", at:[0,4.75,0.22], sub:"cervical"},
        {n:"Región torácica (12 vértebras)", d:"Cada una recibe un par de costillas. Forman la cifosis torácica.", at:[0,3.40,-0.32], sub:"toracica"},
        {n:"Región lumbar (5 vértebras)", d:"Las más grandes y robustas: soportan el peso de todo el tronco.", at:[0,2.00,0.28], sub:"lumbar"},
        {n:"Sacro y cóccix", d:"Nueve vértebras fusionadas que cierran la pelvis por detrás.", at:[0,0.75,-0.20], sub:"sacro"},
        {n:"Discos intervertebrales", d:"Almohadillas fibrocartilaginosas entre vértebra y vértebra. Amortiguan y permiten inclinarse.", at:[0,2.60,0.05], sub:"discos"}
      ],
      quiz:{q:"¿Por qué la columna vista de perfil forma una doble S y no una línea recta?", ops:["Porque las vértebras crecen torcidas","Porque las curvaturas actúan como un resorte y reparten mucho mejor la carga","Porque el peso de la cabeza la dobla con los años"], ok:1,
        fb:"Las curvaturas alternas convierten la columna en un muelle: absorben impactos al caminar o saltar y multiplican su resistencia a la compresión.",
        wrong:["No hay nada torcido: las curvaturas son normales y necesarias. Lo anómalo sería una columna recta de perfil, o una curvatura lateral (escoliosis).","La cabeza no las produce: la curvatura cervical aparece a los 3 meses, cuando el bebé empieza a levantarla, y la lumbar al empezar a caminar."]}},

    {id:"caja-toracica", nombre:"Caja torácica", capa:"axial", color:"#EDE2CC", pos:[0,3.30,0.18], lbl:[-3.26,3.87,1.12],
      n1:"La jaula de 12 pares de costillas y el esternón que protege el corazón y los pulmones y se mueve en cada respiración.",
      n2:"Todas las costillas nacen atrás, de una vértebra torácica. Por delante, las siete primeras llegan al esternón con su propio cartílago (costillas verdaderas); las tres siguientes se unen al cartílago de la séptima formando el arco costal (costillas falsas), y las dos últimas no llegan a ningún lado: son las costillas flotantes. El esternón tiene tres piezas: manubrio, cuerpo y apéndice xifoides. Gracias a los cartílagos costales, que son flexibles, toda la caja puede ensancharse: al inspirar las costillas se elevan y giran hacia afuera, como el asa de un balde.",
      n3:"La caja torácica es un ejemplo de compromiso evolutivo: tiene que ser rígida para proteger y blanda para respirar, y lo resuelve con hueso atrás y cartílago adelante. Con la edad esos cartílagos se calcifican y la caja se vuelve más rígida, una de las razones por las que la capacidad respiratoria baja en la vejez. Además, el esternón y las costillas son de los pocos huesos que conservan médula ósea roja en el adulto: por eso, cuando hace falta estudiar la sangre, la punción se hace en el esternón o en la cresta ilíaca.",
      dato:"Solo 7 de los 12 pares de costillas llegan realmente al esternón.",
      conecta:["columna","cintura-escapular","esponjoso-medula"], temas:["Protección","Sistema respiratorio","Hematopoyesis"],
      partes:[
        {n:"Esternón", d:"El hueso plano del centro del pecho: manubrio, cuerpo y apéndice xifoides.", at:[0,3.30,0.62], sub:"esternon"},
        {n:"Costillas verdaderas (1 a 7)", d:"Llegan al esternón con su propio cartílago costal.", at:[1.05,3.45,0.30], sub:"verdaderas"},
        {n:"Costillas falsas (8 a 10)", d:"Su cartílago se une al de la séptima y forma el arco costal.", at:[0.95,2.55,0.45], sub:"falsas"},
        {n:"Costillas flotantes (11 y 12)", d:"Terminan libres en la pared del abdomen; no llegan por delante.", at:[0.80,2.05,-0.10], sub:"flotantes"},
        {n:"Cartílagos costales", d:"Las barras flexibles que permiten que el tórax se ensanche al inspirar.", at:[0.50,2.90,0.62], sub:"cartilagos"}
      ],
      quiz:{q:"¿Por qué las costillas se unen al esternón mediante cartílago y no directamente con hueso?", ops:["Porque el cartílago es más barato de fabricar para el cuerpo","Porque el cartílago es flexible y deja que la caja se ensanche en cada inspiración","Porque el hueso no puede crecer en esa zona"], ok:1,
        fb:"Hueso atrás para proteger, cartílago adelante para deformarse: así la misma estructura puede ser jaula y fuelle a la vez.",
        wrong:["El cuerpo no elige por costo. La razón es mecánica: hace falta una parte que ceda para poder respirar.","El hueso sí crece ahí; de hecho, con los años esos cartílagos se calcifican y el tórax se vuelve más rígido."]}},

    {id:"cintura-escapular", nombre:"Cintura escapular", capa:"apendicular", color:"#E9DFC8", pos:[0,4.02,0.05], lbl:[-2.6,5.08,1.35], anchor:[0.23,4.03,0.6],
      n1:"La clavícula y la escápula: el puente entre el brazo y el tronco, y la razón de que el hombro se mueva tanto.",
      n2:"Es una cintura incompleta: por delante la clavícula se apoya en el esternón, pero por detrás las dos escápulas no se tocan entre sí ni se articulan con la columna. La escápula flota sobre las costillas sujeta solo por músculos, de modo que se desliza, gira y bascula, y suma su movimiento al del hombro. Por eso puedes levantar el brazo por encima de la cabeza: unos 120° los pone la articulación del hombro y los otros 60°, el giro de la escápula.",
      n3:"La clavícula es el único apoyo óseo entre el brazo y el tronco, y actúa como un puntal que mantiene el hombro separado del pecho. También es el hueso que más se fractura, sobre todo por caídas con la mano extendida, y el primero que empieza a osificarse en el embrión (hacia la quinta semana). En cuadrúpedos como el caballo la clavícula casi desapareció, porque ahí lo útil es que la extremidad se mueva hacia adelante y hacia atrás, no en todas las direcciones.",
      dato:"La clavícula es el hueso que se fractura con más frecuencia en el cuerpo humano.",
      conecta:["caja-toracica","brazo","tipos-articulaciones"], temas:["Movimiento","Evolución","Traumatismos"],
      partes:[
        {n:"Clavícula", d:"El puntal en forma de S que une el esternón con el acromion y separa el hombro del pecho.", at:[0.80,4.10,0.38], sub:"clavicula"},
        {n:"Escápula (omóplato)", d:"La paleta triangular que se desliza sobre las costillas, sujeta por músculos.", at:[1.00,3.45,-0.50], sub:"escapula"},
        {n:"Acromion y cavidad glenoidea", d:"El techo del hombro y la copa poco profunda que recibe la cabeza del húmero.", at:[1.42,3.95,-0.08], sub:"glena"}
      ],
      quiz:{q:"¿Por qué el hombro humano se mueve en tantas direcciones?", ops:["Porque la escápula está firmemente atornillada a la columna","Porque la cavidad glenoidea es poco profunda y además la escápula gira sobre las costillas","Porque el húmero no tiene cabeza redondeada"], ok:1,
        fb:"Movilidad extrema a cambio de estabilidad: por eso el hombro es también la articulación que más se luxa.",
        wrong:["Ocurre justo lo contrario: la escápula no se articula con la columna, solo la sostienen músculos, y esa libertad es la que suma movimiento.","La cabeza del húmero es muy redondeada: es una esfera casi perfecta, y por eso puede girar en todos los ejes."]}},

    {id:"brazo", nombre:"Húmero, radio y cúbito", capa:"apendicular", color:"#ECE1C9", pos:[1.65,2.70,0.00], lbl:[4.44,4.16,-1.01], anchor:[1.62,2.73,0.03],
      n1:"Los tres huesos largos del miembro superior: uno en el brazo (húmero) y dos en el antebrazo (radio y cúbito).",
      n2:"El húmero va del hombro al codo y es la palanca del brazo. En el codo se articula con los dos huesos del antebrazo: con el cúbito forma una bisagra pura que solo flexiona y extiende, y con el radio, una articulación que permite girar. Ese giro es la clave: el radio rota sobre el cúbito y cruza por delante de él, y así la palma pasa de mirar hacia arriba (supinación) a mirar hacia abajo (pronación). Sin ese par de huesos no podrías girar un destornillador ni una llave.",
      n3:"Un hueso largo tiene siempre la misma arquitectura: dos extremos anchos (epífisis) rellenos de hueso esponjoso, un tubo central (diáfisis) de hueso compacto con la cavidad medular por dentro, y entre ambos la metáfisis, donde estuvo el cartílago de crecimiento. Ser un tubo hueco y no una barra maciza no es un defecto: para la misma cantidad de material, un tubo resiste mucho más la flexión, porque lo que importa está en la periferia. Es el mismo principio de la caña de bambú y de los tubos de una bicicleta.",
      dato:"Un hueso largo es un tubo hueco: con el mismo material resiste mucho más la flexión que una barra maciza.",
      conecta:["cintura-escapular","mano","hueso-compacto","tipos-articulaciones"], temas:["Palanca","Biomecánica","Estructura del hueso"],
      partes:[
        {n:"Húmero", d:"El hueso del brazo. Su cabeza esférica entra en la glena; abajo forma la tróclea del codo.", at:[1.52,2.75,-0.01], sub:"humero"},
        {n:"Cúbito", d:"El hueso interno del antebrazo. Su olécranon es la punta del codo y forma la bisagra.", at:[1.58,0.80,-0.07], sub:"cubito"},
        {n:"Radio", d:"El hueso externo. Gira sobre el cúbito y permite la pronación y la supinación de la mano.", at:[1.80,0.80,0.05], sub:"radio"}
      ],
      quiz:{q:"¿Para qué sirve tener dos huesos en el antebrazo y no uno solo?", ops:["Para repartir mejor el peso del brazo","Para que el radio gire sobre el cúbito y la palma pueda voltearse","Para que el codo pueda doblarse hacia los lados"], ok:1,
        fb:"Pronación y supinación: sin dos huesos no podrías girar la mano sin mover el hombro. Pruébalo sujetándote el codo contra el cuerpo.",
        wrong:["El peso lo carga sobre todo el cúbito en el codo y el radio en la muñeca, pero repartirlo no es la razón: podría hacerlo un hueso grueso.","El codo es una bisagra: no se dobla hacia los lados. Lo que añade el segundo hueso es rotación, no lateralidad."]}},

    {id:"mano", nombre:"Mano", capa:"apendicular", color:"#E7DCC4", pos:[1.70,-0.60,0.05], lbl:[2.71,-3.41,0.06],
      n1:"Veintisiete huesos por mano: 8 en el carpo (muñeca), 5 metacarpianos en la palma y 14 falanges en los dedos.",
      n2:"Los ocho huesos del carpo están en dos filas y se deslizan un poco unos sobre otros: ninguno se mueve mucho, pero la suma da a la muñeca una libertad enorme. De ahí salen los cinco metacarpianos, que forman la palma, y las falanges: tres por dedo salvo el pulgar, que tiene dos. Ese pulgar es el que cambia todo, porque su articulación con el trapecio tiene forma de silla de montar y puede oponerse: tocar la yema de cualquier otro dedo.",
      n3:"Entre las manos (54 huesos) y los pies (52) suman 106 de los 206 huesos del cuerpo: más de la mitad del esqueleto está en las cuatro extremidades finales. No es casualidad: muchos huesos pequeños significan muchas articulaciones, y muchas articulaciones significan precisión. En la evolución humana, el pulgar oponible y la capacidad de hacer una pinza de precisión aparecen junto con las primeras herramientas de piedra. El escafoides, uno de los huesos del carpo, se fractura con frecuencia al caer con la mano extendida y a veces no se ve en la primera radiografía.",
      dato:"Manos y pies reúnen 106 de los 206 huesos: más de la mitad del esqueleto.",
      conecta:["brazo","pie","tipos-articulaciones"], temas:["Precisión","Evolución humana","Anatomía comparada"],
      partes:[
        {n:"Carpo (8 huesos)", d:"Los huesos de la muñeca, en dos filas. Se deslizan entre sí: articulaciones planas.", at:[1.70,-0.20,0.02], sub:"carpo"},
        {n:"Metacarpianos (5)", d:"Los huesos de la palma. El primero, el del pulgar, se articula en silla de montar.", at:[1.68,-0.45,0.08], sub:"metacarpo"},
        {n:"Falanges (14)", d:"Tres por dedo, dos en el pulgar. Cada una añade una articulación de bisagra.", at:[1.65,-0.95,0.15], sub:"falanges"}
      ],
      quiz:{q:"¿Qué hace especial al pulgar humano?", ops:["Que tiene tres falanges como los demás dedos","Que su articulación en silla de montar le permite oponerse y tocar la yema de los otros dedos","Que es el dedo más largo"], ok:1,
        fb:"La oposición del pulgar es lo que hace posible la pinza de precisión: sostener un lápiz, enhebrar una aguja, tallar una piedra.",
        wrong:["El pulgar tiene solo dos falanges; los otros cuatro dedos tienen tres.","Es el más corto de los cinco. Su ventaja no es la longitud sino la dirección en la que puede moverse."]}},

    {id:"cintura-pelvica", nombre:"Cintura pélvica", capa:"apendicular", color:"#E4D9C0", pos:[0,0.60,0.05], lbl:[-3.89,0.61,0.89], anchor:[-0.37,0.6,-0.2],
      n1:"El anillo óseo que une las piernas al tronco: dos huesos coxales unidos al sacro por detrás y entre sí por delante.",
      n2:"Cada coxal es en realidad la fusión de tres huesos que en la infancia están separados por cartílago: ilion (la parte ancha de arriba, cuya cresta se palpa en la cadera), isquion (donde te sientas) y pubis (por delante). Los tres se unen justo en el acetábulo, la copa profunda que recibe la cabeza del fémur. A diferencia de la escapular, esta cintura es completa y muy rígida: aquí no interesa la movilidad sino transmitir al suelo todo el peso del tronco, y aguantar el empuje de los músculos más potentes del cuerpo.",
      n3:"La pelvis humana es la firma anatómica del bipedismo: es corta, ancha y con las alas ilíacas orientadas hacia los lados, lo que permite que los glúteos estabilicen la cadera en cada paso; la de un chimpancé es alta y plana. Esa forma trae una tensión conocida como «el dilema obstétrico»: un canal del parto estrecho para caminar bien, pero un cráneo grande para el cerebro, y es la razón de que el bebé humano nazca comparativamente inmaduro y de que rote durante el parto. En criminalística y en arqueología, la pelvis es el hueso que mejor permite estimar si un esqueleto es de una mujer o de un varón.",
      dato:"La pelvis es la parte del esqueleto que mejor distingue a una mujer de un varón.",
      conecta:["columna","femur","esponjoso-medula"], temas:["Bipedismo","Evolución humana","Sostén"],
      partes:[
        {n:"Ilion y cresta ilíaca", d:"El ala ancha superior. Su borde se palpa al poner las manos en la cintura; de ahí se extrae médula ósea.", at:[1.00,1.35,-0.05], sub:"ilion"},
        {n:"Isquion", d:"La parte posteroinferior: el hueso sobre el que te sientas.", at:[0.62,-0.35,-0.05], sub:"isquion"},
        {n:"Pubis y sínfisis púbica", d:"La rama anterior y la unión cartilaginosa entre los dos coxales.", at:[0.20,0.12,0.46], sub:"pubis"},
        {n:"Acetábulo", d:"La copa profunda donde encaja la cabeza del fémur: la articulación de la cadera.", at:[0.88,0.25,0.10], sub:"acetabulo"}
      ],
      quiz:{q:"¿Por qué la cintura pélvica es rígida y la escapular no?", ops:["Porque la pélvica tiene que transmitir el peso del cuerpo al suelo y la escapular, dar movilidad al brazo","Porque la pélvica está formada por más huesos","Porque la escapular todavía no terminó de osificarse"], ok:0,
        fb:"Cada cintura resuelve un problema distinto: abajo, estabilidad y carga; arriba, alcance y libertad de movimiento.",
        wrong:["Tiene menos: dos coxales más el sacro, frente a clavícula y escápula de cada lado. Lo que cambia es cómo se unen, no cuántos son.","La escápula está perfectamente osificada en el adulto. Su movilidad es una ventaja funcional, no una inmadurez."]}},

    {id:"femur", nombre:"Fémur", capa:"apendicular", color:"#EFE4CC", pos:[0.82,-1.20,0.05], lbl:[-2.12,-2.51,1.11],
      n1:"El hueso más largo, pesado y resistente del cuerpo: va de la cadera a la rodilla y mide alrededor de una cuarta parte de tu estatura.",
      n2:"Su cabeza esférica encaja profundamente en el acetábulo y se une al cuerpo del hueso por un cuello estrecho que forma un ángulo de unos 125°. Ese codo no es un capricho: separa la pierna de la pelvis y da a los glúteos la palanca que necesitan para sostener el cuerpo sobre un solo pie en cada paso. El cuerpo del fémur, la diáfisis, es un tubo de hueso compacto con una cresta posterior rugosa, la línea áspera, donde se anclan los músculos más potentes del muslo.",
      n3:"El cuello femoral es a la vez la solución y el punto débil: es la zona donde se concentra más tensión de todo el esqueleto y la que más se fractura en las personas mayores con osteoporosis. Una fractura de cadera a los 80 años no es un percance menor, porque obliga a una inmovilidad que a su vez debilita más el hueso y el músculo; por eso prevenir caídas en casa (alfombras sueltas, poca luz, escaleras sin pasamanos) importa tanto como el calcio. En el interior de la cabeza femoral, las trabéculas se ordenan en abanicos que siguen exactamente las líneas de fuerza: es el ejemplo clásico de la ley de Wolff.",
      dato:"Mide alrededor del 26 % de tu estatura: por eso con un fémur se puede estimar la talla de una persona.",
      conecta:["cintura-pelvica","rodilla","esponjoso-medula","hueso-compacto"], temas:["Palanca","Biomecánica","Osteoporosis"],
      partes:[
        {n:"Cabeza y cuello femoral", d:"La esfera que entra en el acetábulo y el cuello inclinado 125°: la zona que más se fractura en la vejez.", at:[0.88,0.25,0.05], sub:"cabeza"},
        {n:"Trocánter mayor", d:"La prominencia lateral que se palpa en la cadera; ahí tiran los glúteos.", at:[1.18,0.32,0.00], sub:"trocanter"},
        {n:"Diáfisis", d:"El tubo central de hueso compacto, con la cavidad medular por dentro.", at:[0.80,-1.30,0.08], sub:"diafisis"},
        {n:"Cóndilos femorales", d:"Los dos rodillos del extremo inferior que ruedan y deslizan sobre la tibia.", at:[0.74,-2.58,0.02], sub:"condilos"}
      ],
      quiz:{q:"¿Por qué el cuello del fémur es la zona que más se fractura en las personas mayores?", ops:["Porque es la parte más blanda del hueso desde el nacimiento","Porque es donde se concentra más tensión y además pierde trabéculas con la osteoporosis","Porque no recibe sangre"], ok:1,
        fb:"Mucha carga concentrada en poco hueso: si las trabéculas internas se adelgazan, basta una caída leve para que ceda.",
        wrong:["No es blanda: en un adulto joven el cuello femoral aguanta varias veces el peso del cuerpo. Lo que cambia con los años es la cantidad de hueso, no su naturaleza.","Sí recibe sangre, aunque por vasos frágiles: de hecho, una fractura puede cortarle el riego a la cabeza femoral, y eso complica su curación."]}},

    {id:"tibia-perone", nombre:"Tibia y peroné", capa:"apendicular", color:"#E9DEC6", pos:[0.76,-4.05,0.02], lbl:[3.02,-5.75,-0.48],
      n1:"Los dos huesos de la pierna: la tibia, gruesa y por dentro, que carga el peso, y el peroné, delgado y por fuera, que casi no lo carga.",
      n2:"La tibia recibe arriba los cóndilos del fémur en una superficie plana, la meseta tibial, y abajo forma el maléolo interno del tobillo; su cara anterior, la «espinilla», está justo bajo la piel, sin músculo que la cubra, y por eso un golpe ahí duele tanto. El peroné no participa en la rodilla y apenas transmite un 10 % de la carga: su trabajo es anclar músculos y, sobre todo, formar el maléolo externo, la pared que impide que el pie se vaya hacia afuera.",
      n3:"Que el peroné cargue tan poco peso lo convierte en el donante ideal de las cirugías reconstructivas: se puede extraer un segmento largo, con su arteria, para reconstruir una mandíbula o un hueso destruido por un tumor, y la persona sigue caminando. El tobillo, en cambio, es una mortaja apretada entre los dos maléolos, y por eso el esguince es la lesión más común del deporte: al torcerse el pie hacia adentro, los ligamentos externos se estiran más allá de su límite.",
      dato:"El peroné soporta apenas un 10 % de la carga: por eso se puede usar como injerto para reconstruir otros huesos.",
      conecta:["rodilla","pie","femur"], temas:["Sostén","Medicina reconstructiva","Lesiones deportivas"],
      partes:[
        {n:"Meseta tibial", d:"La superficie plana superior sobre la que ruedan los cóndilos del fémur.", at:[0.74,-2.85,0.03], sub:"meseta"},
        {n:"Diáfisis tibial", d:"La espinilla: cara anterior subcutánea, sin músculo que la proteja.", at:[0.74,-4.10,0.10], sub:"tibia"},
        {n:"Peroné", d:"El hueso delgado externo. No entra en la rodilla y carga muy poco peso.", at:[0.96,-4.05,-0.04], sub:"perone"},
        {n:"Maléolos", d:"Las dos prominencias del tobillo: la interna es de la tibia y la externa, del peroné.", at:[0.80,-5.30,0.00], sub:"maleolos"}
      ],
      quiz:{q:"Si el peroné casi no soporta peso, ¿para qué sirve?", ops:["Para nada: es un hueso vestigial","Para anclar músculos y formar el maléolo externo, que estabiliza el tobillo","Para producir la mayor parte de los glóbulos rojos"], ok:1,
        fb:"Su valor es de anclaje y estabilidad lateral. Por eso se puede extraer un trozo como injerto sin perder la capacidad de caminar.",
        wrong:["No es vestigial: sin maléolo externo el tobillo se luxaría hacia afuera con facilidad.","La médula roja del adulto está sobre todo en el esternón, las costillas, las vértebras, la pelvis y los extremos del fémur y el húmero, no en el peroné."]}},

    {id:"pie", nombre:"Pie", capa:"apendicular", color:"#E5DAC2", pos:[0.78,-5.68,0.35], lbl:[-2.09,-6.36,1.32],
      n1:"Veintiséis huesos organizados en arcos: la base que soporta todo el peso del cuerpo y lo impulsa en cada paso.",
      n2:"Se divide en tarso (7 huesos, entre ellos el calcáneo del talón y el astrágalo que recibe a la tibia), metatarso (5) y falanges (14). Pero lo decisivo no son los huesos sueltos sino cómo se ordenan: forman un arco longitudinal y otro transversal, sostenidos por ligamentos y músculos. Ese arco actúa como un resorte: se aplana al apoyar, guardando energía elástica, y rebota al despegar, devolviéndola. Caminar sale más barato gracias a él.",
      n3:"El pie humano es el resultado de renunciar a agarrar para poder caminar: el pie de un chimpancé tiene un dedo gordo oponible, como un pulgar, y es plano; el humano alineó el primer dedo con los otros y construyó los arcos. Las huellas fósiles de Laetoli, en Tanzania, de hace unos 3,6 millones de años, ya muestran un pie con arco y dedo gordo alineado: caminábamos erguidos mucho antes de tener un cerebro grande. En el día a día, el pie plano flexible en la infancia es normal y en la mayoría se resuelve solo al formarse el arco.",
      dato:"El arco del pie es un resorte: se aplana al apoyar y devuelve energía al despegar.",
      conecta:["tibia-perone","mano","tipos-articulaciones"], temas:["Bipedismo","Evolución humana","Biomecánica"],
      partes:[
        {n:"Calcáneo", d:"El hueso del talón, el más grande del pie. Recibe el tendón de Aquiles.", at:[0.78,-5.76,-0.26], sub:"calcaneo"},
        {n:"Astrágalo y tarso", d:"El astrágalo recibe a la tibia; con los demás huesos del tarso forma la cúpula del arco.", at:[0.78,-5.52,0.12], sub:"tarso"},
        {n:"Metatarsianos", d:"Los cinco huesos largos del antepié. Sus cabezas forman la almohadilla de apoyo.", at:[0.76,-5.84,0.62], sub:"metatarso"},
        {n:"Falanges", d:"Los huesos de los dedos. El primero, alineado con los demás: no es oponible como en los simios.", at:[0.74,-5.90,1.12], sub:"falanges"}
      ],
      quiz:{q:"¿Cuál es la diferencia clave entre el pie humano y el de un chimpancé?", ops:["El humano tiene más huesos","El humano tiene arcos y el primer dedo alineado; el del chimpancé es plano y con dedo gordo oponible","El del chimpancé no tiene falanges"], ok:1,
        fb:"El pie humano cambió agarrar por caminar: los arcos actúan como resorte y el dedo gordo alineado da el impulso final del paso.",
        wrong:["Tienen el mismo número de huesos: 26 por pie. Lo que cambia es su disposición y su forma.","Sí las tiene, y muy largas y curvas, porque le sirven para agarrar ramas."]}},

    {id:"rodilla", nombre:"Rodilla: articulación sinovial en corte", capa:"articulaciones", color:"#8FC7BF", pos:[-0.74,-2.62,0.10], lbl:[-5.15,-3.65,1.58],
      n1:"La articulación más grande y compleja del cuerpo, abierta aquí para ver sus cinco piezas: cartílago, meniscos, ligamentos, cápsula y líquido sinovial.",
      n2:"En una articulación sinovial los huesos no se tocan: los extremos están recubiertos de cartílago articular, un tejido liso de 2 a 4 mm sin vasos ni nervios, y entre ambos hay una cavidad cerrada por la cápsula. La membrana que la tapiza fabrica el líquido sinovial, apenas 1 a 3 mL de un fluido espeso que lubrica, reparte la carga y alimenta al cartílago, que no tiene riego propio. En la rodilla se añaden dos meniscos, cuñas de fibrocartílago que rellenan el desajuste entre los cóndilos redondos del fémur y la meseta plana de la tibia, y cuatro ligamentos principales: dos cruzados por dentro, que frenan el deslizamiento hacia adelante y hacia atrás, y dos colaterales a los lados. La rótula, el hueso sesamoideo más grande del cuerpo, va incluida en el tendón del cuádriceps y funciona como una polea que aumenta su fuerza.",
      n3:"El cartílago articular tiene un coeficiente de rozamiento de alrededor de 0,003: es más resbaladizo que el hielo sobre hielo, y ningún material fabricado por el ser humano lo iguala. Su gran limitación es que no tiene vasos: se nutre por difusión desde el líquido sinovial, y ese intercambio depende del movimiento, porque al cargar y descargar el cartílago se exprime y se vuelve a empapar como una esponja. De ahí una conclusión que suele sorprender: moverse no gasta las articulaciones, las alimenta. Lo que sí las daña es la sobrecarga sin descanso, los golpes repetidos y, con los años, la artrosis, en la que el cartílago se adelgaza y el hueso queda expuesto.",
      dato:"El cartílago articular resbala más que el hielo sobre hielo, y se alimenta solo cuando te mueves.",
      conecta:["femur","tibia-perone","tipos-articulaciones"], temas:["Articulaciones","Biomecánica","Salud articular"],
      partes:[
        {n:"Cartílago articular", d:"La capa lisa y blanca que recubre los cóndilos y la meseta tibial. Sin vasos ni nervios.", at:[-0.74,-2.60,-0.02], sub:"cartilago"},
        {n:"Meniscos", d:"Dos cuñas de fibrocartílago que rellenan el hueco entre fémur y tibia y reparten la carga.", at:[-0.74,-2.83,0.03], sub:"meniscos"},
        {n:"Ligamentos cruzados", d:"Cruzados dentro de la articulación: frenan el deslizamiento hacia adelante y hacia atrás.", at:[-0.74,-2.62,-0.02], sub:"cruzados"},
        {n:"Ligamentos colaterales", d:"Las bandas laterales que impiden que la rodilla se abra hacia los lados.", at:[-1.06,-2.62,0.03], sub:"colaterales"},
        {n:"Rótula", d:"El hueso sesamoideo incluido en el tendón del cuádriceps. Actúa como polea y aumenta su fuerza.", at:[-0.74,-2.52,0.40], sub:"rotula"},
        {n:"Cápsula y líquido sinovial", d:"La bolsa cerrada y el fluido que lubrica y nutre el cartílago: 1 a 3 mL en toda la rodilla.", at:[-0.74,-2.62,0.30], sub:"sinovial"}
      ],
      quiz:{q:"El cartílago articular no tiene vasos sanguíneos. ¿Cómo se alimenta?", ops:["Por difusión desde el líquido sinovial, gracias al movimiento que lo exprime y lo empapa","Por vasos que le llegan desde el hueso subyacente","No se alimenta: es tejido muerto"], ok:0,
        fb:"Por eso el movimiento regular cuida las articulaciones en lugar de gastarlas, y la inmovilidad prolongada adelgaza el cartílago.",
        wrong:["El hueso subcondral está justo debajo, pero sus vasos no atraviesan el cartílago sano. El intercambio ocurre por su cara libre, con el líquido sinovial.","Está vivo: tiene condrocitos que fabrican y mantienen su matriz. Lo que casi no tiene es capacidad de repararse si se rompe, precisamente por la falta de vasos."]}},

    {id:"tipos-articulaciones", nombre:"Tipos de articulaciones", capa:"articulaciones", color:"#D8B45C", pos:[1.60,1.95,0.00], lbl:[5.1,4.95,-1.15], anchor:[1.8,1.95,0.22],
      n1:"No todas las articulaciones se mueven igual: su forma decide en cuántas direcciones pueden hacerlo. Aquí se resaltan tres ejemplos sobre el mismo brazo.",
      n2:"Las sinoviales se clasifican por la geometría de sus superficies. La esférica o enartrosis (hombro, cadera) tiene una bola en una copa y se mueve en los tres ejes: flexión-extensión, separación-aproximación y rotación. La bisagra o troclear (codo, rodilla, dedos) solo tiene un eje: flexiona y extiende, como la bisagra de una puerta. La plana o artrodia (entre los huesos del carpo y del tarso) tiene caras casi lisas que se deslizan un poco una sobre otra; cada una aporta muy poco, pero sumadas dan a la muñeca su libertad. Hay además otras tres: en silla de montar (pulgar), en pivote (atlas-axis, radio-cúbito) y elipsoidea (muñeca).",
      n3:"Existe una regla casi universal en el aparato locomotor: movilidad y estabilidad son inversas. El hombro, la más móvil, es la que más se luxa; la cadera, con la misma forma pero una copa profunda y ligamentos fuertes, se mueve menos y se luxa poquísimo. Y no todas las articulaciones son sinoviales: las fibrosas (suturas del cráneo, unión tibia-peroné) son casi inmóviles, y las cartilaginosas (discos intervertebrales, sínfisis púbica) permiten un movimiento pequeño pero amortiguan. El cuerpo elige en cada sitio el punto justo del compromiso.",
      dato:"Cuanto más móvil es una articulación, menos estable: el hombro es la que más se luxa del cuerpo.",
      conecta:["cintura-escapular","brazo","mano","rodilla"], temas:["Clasificación","Biomecánica","Movimiento"],
      partes:[
        {n:"Esférica (hombro)", d:"Bola en copa: se mueve en los tres ejes. Máxima movilidad, mínima estabilidad.", at:[1.42,3.82,-0.02], sub:"esferica"},
        {n:"Bisagra (codo)", d:"Un solo eje de giro: flexión y extensión, como la bisagra de una puerta.", at:[1.62,1.62,0.00], sub:"bisagra"},
        {n:"Plana (carpo)", d:"Superficies casi lisas que se deslizan. Poco movimiento cada una, mucho al sumarse.", at:[1.70,-0.19,0.02], sub:"plana"}
      ],
      quiz:{q:"El hombro y la cadera tienen la misma forma (bola y copa). ¿Por qué el hombro se luxa mucho más?", ops:["Porque la cabeza del húmero es más pequeña que la del fémur","Porque la copa del hombro es poco profunda y sus ligamentos son laxos, a cambio de más movilidad","Porque el hombro no tiene líquido sinovial"], ok:1,
        fb:"Movilidad y estabilidad se pagan una con la otra: la cadera sacrifica recorrido para no fallar nunca bajo el peso del cuerpo.",
        wrong:["El tamaño no es lo decisivo: lo que cambia es la profundidad de la copa que la recibe.","Las dos son articulaciones sinoviales y las dos tienen líquido sinovial y cápsula."]}},

    {id:"hueso-compacto", nombre:"Hueso compacto y osteona (lupa)", capa:"lupa", color:"#D9C08A", pos:[4.50,1.85,0.40], lbl:[6.04,5.66,-0.52],
      n1:"Un corte del tubo externo del hueso, ampliado 200 veces: anillos de matriz ósea alrededor de un canal. Cada una de esas unidades es una osteona.",
      n2:"El hueso compacto forma alrededor del 80 % de la masa del esqueleto y está organizado en osteonas de 0,2 a 0,3 mm, ordenadas a lo largo del eje del hueso como un manojo de pajillas. En el centro de cada una corre el conducto de Havers, con un capilar y un nervio; a su alrededor, entre 4 y 20 laminillas concéntricas de matriz en las que las fibras de colágeno cambian de dirección en cada capa, como en la madera contrachapada. Entre laminilla y laminilla, atrapados en huecos llamados lagunas, están los osteocitos, y de laminilla a laminilla los conductos de Volkmann conectan unos canales de Havers con otros.",
      n3:"La matriz ósea es un material compuesto: colágeno tipo I, que aporta flexibilidad y resistencia a la tracción, e hidroxiapatita de calcio y fosfato, que aporta dureza y resistencia a la compresión. Ninguno sirve solo: un hueso descalcificado en ácido se dobla como goma, y uno calcinado se deshace al apretarlo. Los osteocitos no están ahí de adorno: son los sensores del sistema. Prolongan finísimas extensiones por unos túneles, los canalículos, y se tocan entre sí formando una red que detecta la deformación del hueso y avisa dónde hace falta reforzar o retirar material. Un solo hueso puede tener decenas de miles de osteocitos por milímetro cúbico conectados en esa red.",
      dato:"El colágeno da flexibilidad y los minerales dureza: sin colágeno el hueso sería frágil como la tiza.",
      conecta:["esponjoso-medula","brazo","femur"], temas:["Histología","Materiales","Estructura del hueso"],
      partes:[
        {n:"Conducto de Havers", d:"El canal central de cada osteona, con un capilar y un nervio. Corre paralelo al eje del hueso.", at:[4.10,2.15,0.58], sub:"havers"},
        {n:"Laminillas concéntricas", d:"Los anillos de matriz. Las fibras de colágeno cambian de dirección en cada capa, como el contrachapado.", at:[4.10,2.15,0.52], sub:"laminillas"},
        {n:"Osteocitos en sus lagunas", d:"Las células maduras atrapadas en la matriz. Conectadas por canalículos, detectan la deformación del hueso.", at:[4.42,1.60,0.56], sub:"osteocitos"},
        {n:"Conductos de Volkmann", d:"Los canales transversales que comunican unos conductos de Havers con otros y con la superficie.", at:[4.35,1.98,0.56], sub:"volkmann"}
      ],
      quiz:{q:"Si se disuelven los minerales de un hueso y solo queda el colágeno, ¿qué ocurre?", ops:["Se vuelve quebradizo como la tiza","Se vuelve flexible: se puede doblar como una goma","No cambia nada"], ok:1,
        fb:"El experimento clásico: un hueso de pollo en vinagre unos días se dobla. Los minerales dan dureza; el colágeno, flexibilidad. El hueso es fuerte porque tiene los dos.",
        wrong:["Eso pasa al contrario: si quemas el hueso, desaparece el colágeno y queda el mineral, que se desmorona al apretarlo.","Cambia muchísimo, y es la mejor prueba de que el hueso es un material compuesto y no un bloque de mineral."]}},

    {id:"esponjoso-medula", nombre:"Hueso esponjoso, trabéculas y médula roja (lupa)", capa:"lupa", color:"#B03A3A", pos:[4.50,-1.55,0.40], lbl:[6.26,-4.34,0.18],
      n1:"El interior de los extremos del hueso, ampliado 200 veces: una malla de vigas finas —las trabéculas— con médula ósea roja en todos los huecos.",
      n2:"El hueso esponjoso es apenas el 20 % de la masa del esqueleto, pero por su forma de malla tiene mucha más superficie que el compacto, y por eso es el que más participa en los intercambios de calcio y el que primero se pierde en la osteoporosis. Sus trabéculas no están puestas al azar: siguen las líneas de fuerza que atraviesan el hueso, como los tirantes y puntales de un puente. Es la ley de Wolff, formulada en 1892: el hueso se construye donde se lo usa y se retira donde no. Entre las trabéculas, la médula ósea roja fabrica sangre: de una única célula madre hematopoyética salen los glóbulos rojos, todos los glóbulos blancos y las plaquetas, al ritmo de unos dos millones de glóbulos rojos por segundo.",
      n3:"Esa ley tiene consecuencias muy prácticas. El ejercicio con carga —caminar rápido, subir gradas, saltar, cargar peso, bailar— deforma mínimamente el hueso, los osteocitos lo detectan y los osteoblastos refuerzan justo esas zonas; la natación y la bicicleta son excelentes para el corazón, pero al no cargar el esqueleto aportan mucho menos al hueso. A la inversa, semanas en cama o un yeso hacen perder masa ósea rápidamente. Además, la médula roja no está en todo el esqueleto del adulto: en el recién nacido sí, pero con los años la de los huesos largos se convierte en médula amarilla (grasa) y la roja queda en el esternón, las costillas, las vértebras, la pelvis y los extremos del fémur y el húmero. Por eso, cuando hay que estudiar la médula, se punciona la cresta ilíaca.",
      dato:"La médula roja produce unos dos millones de glóbulos rojos por segundo, toda tu vida.",
      conecta:["hueso-compacto","femur","cintura-pelvica","caja-toracica"], temas:["Ley de Wolff","Hematopoyesis","Osteoporosis","Ejercicio"],
      partes:[
        {n:"Trabéculas", d:"Las vigas finas de hueso, orientadas según las líneas de fuerza que atraviesan el hueso.", at:[4.20,-1.25,0.55], sub:"trabeculas"},
        {n:"Médula ósea roja", d:"El tejido que ocupa los huecos y fabrica las células de la sangre.", at:[4.72,-1.80,0.55], sub:"medula"},
        {n:"Células sanguíneas en formación", d:"Glóbulos rojos, glóbulos blancos y plaquetas, todos nacidos de una misma célula madre.", at:[4.50,-2.05,0.60], sub:"celulas"}
      ],
      quiz:{q:"Dos personas hacen ejercicio una hora diaria: una nada y la otra sube gradas y trota. ¿Qué pasa con sus huesos?", ops:["Los dos ganan hueso por igual: lo que importa es el tiempo de ejercicio","La que trota y sube gradas gana más hueso, porque el esqueleto solo se refuerza donde recibe carga","La que nada gana más hueso, porque el agua ofrece más resistencia"], ok:1,
        fb:"Ley de Wolff: el estímulo que hace crecer hueso es la deformación mecánica por impacto y carga. Nadar es excelente para el corazón, los pulmones y las articulaciones, pero aporta poco al hueso.",
        wrong:["El tiempo no basta: lo decisivo es el tipo de estímulo. Sin carga, los osteocitos no reciben la señal que ordena reforzar.","El agua da resistencia al músculo, pero sostiene el cuerpo y elimina el impacto: justo la señal que el hueso necesita."]}}
  ],
  guiada:[
    {tipo:"select", txt:"Empieza por el eje del cuerpo: selecciona la <b>columna vertebral</b> y gira el modelo para verla de perfil. ¿Cuántas curvaturas distingues?", target:"columna"},
    {tipo:"select", txt:"Ahora busca el hueso más largo y resistente del cuerpo, el que va de la cadera a la rodilla: el <b>fémur</b>.", target:"femur"},
    {tipo:"select", txt:"Entra en la articulación abierta de la pierna izquierda: selecciona la <b>rodilla</b> y luego pulsa 🔍 Ver en detalle para recorrer sus piezas.", target:"rodilla"},
    {tipo:"anim", txt:"Activa <b>Flexión de la rodilla</b> y observa qué hacen los cóndilos sobre los meniscos y por dónde se desliza la rótula.", target:"flexion"},
    {tipo:"select", txt:"Ve a la lupa de arriba, a la derecha: selecciona el <b>hueso compacto</b> y localiza el conducto central de una osteona.", target:"hueso-compacto"},
    {tipo:"select", txt:"Baja a la segunda lupa: selecciona el <b>hueso esponjoso</b> y fíjate en la dirección de las trabéculas.", target:"esponjoso-medula"},
    {tipo:"anim", txt:"Activa <b>Remodelación ósea</b> y sigue el orden: quién excava primero y quién rellena después.", target:"remodelacion"},
    {tipo:"text", txt:"Explica con tus palabras por qué se dice que el hueso es un tejido vivo y por qué el ejercicio con carga lo fortalece mientras que estar semanas en cama lo debilita. Menciona osteoclastos, osteoblastos, osteocitos y trabéculas. Tu respuesta se guardará en el cuaderno."}
  ]
};

Object.assign(BIO.activities, {
  "explorar-esqueletico":{t:"Explorar el sistema esquelético", unidad:6, peso:15, xp:60},
  "guiada-esqueletico":{t:"Exploración guiada del esqueleto", unidad:6, peso:10, xp:80},
  "reto-esqueletico":{t:"Reto del esqueleto: el hueso es un tejido vivo", unidad:6, peso:10, xp:70}
});
</script>
<script>
/* =====================================================================
   MODELO 3D DEL ESQUELETO
   Escala: 1 unidad ≈ 14 cm. Talla total ≈ 12,1 unidades (planta -6,0 → vértice 6,1)
   ===================================================================== */
function buildSkeleton(E){
  orgvFrame(E, 1.25);
  const low = E.low, D = BIO.skeleton;
  const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const CEN = new THREE.Vector3(0, 1.2, 0);
  const add = (id, meshes, extra={}) => { const s = S[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, explodeDir:V3(s.pos).sub(CEN).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl); return p; };
  const RND = Kit.rng(23);
  /* material de hueso: textura de cartílago (marfil) teñida */
  const boneMat = (c, rep) => orgvTex.mat({ color:c, tex:'bone', rep:rep||[2,4], bump:0.014, rough:0.56, coat:0.28, coatRough:0.4, env:0.6 });
  /* el render escribe en sRGB y trata el color del material como lineal: convertimos para que el tono sea el elegido */
  const sRGB = hex => { const c = new THREE.Color(hex); return c.setRGB(Math.pow(c.r,2.2), Math.pow(c.g,2.2), Math.pow(c.b,2.2)); };
  const plainMat = (c, o={}) => Kit.tissue(Object.assign({ rough:0.55, coat:0.25, coatRough:0.4, env:0.5 }, o, { color:sRGB(c) }));
  const SEG = (a,b) => low?a:b;

  /* ============================ CRÁNEO ============================ */
  const SK = new THREE.Vector3(0, 5.55, 0.00);
  const vaultG = Kit.sculpt({ w:SEG(36,56), h:SEG(28,44),
    shape: d => {
      let x = 0.585*d.x, y = 0.580*d.y, z = 0.665*d.z;
      if (d.z < 0) z *= 1.06;                                        /* occipital saliente */
      if (d.y < 0){ const k = -d.y; x *= 1 - 0.20*k; z *= 1 - 0.14*k; }   /* base más estrecha */
      z += 0.035*gauss(d.y - 0.02, 0.18)*smooth01((d.z - 0.45)/0.4);  /* arcos superciliares */
      return new THREE.Vector3(x, y, z);
    },
    disp: (p) => 0.010*Kit.fbm(p.x*5, p.y*5, p.z*5, 3) });
  const skullM = new THREE.Mesh(vaultG, boneMat(0xF3EBDA, [2,2]));
  skullM.position.copy(SK); skullM.userData.sub = 'boveda';
  /* macizo facial: órbitas y abertura nasal excavadas */
  const faceG = Kit.sculpt({ w:SEG(24,38), h:SEG(18,30),
    shape: d => {
      let x = 0.430*d.x, y = 0.370*d.y, z = 0.395*d.z;
      const orb = gauss(Math.abs(d.x) - 0.52, 0.28) * gauss(d.y - 0.42, 0.34) * smooth01((d.z - 0.20)/0.5);
      z -= 0.19*orb;
      const nas = gauss(d.x, 0.15) * gauss(d.y + 0.02, 0.22) * smooth01((d.z - 0.42)/0.4);
      z -= 0.15*nas;
      return new THREE.Vector3(x, y, z);
    } });
  const faceM = new THREE.Mesh(faceG, boneMat(0xF1E8D5, [2,2]));
  faceM.position.set(0, 5.02, 0.29); faceM.userData.sub = 'cara';
  const holeMat = plainMat(0x4A3B30, { rough:0.88, coat:0.05 });
  const holes = [];
  [-1,1].forEach(s => { const g = new THREE.SphereGeometry(0.150, SEG(12,18), SEG(9,14));
    g.scale(1.0, 0.88, 0.72); g.translate(s*0.245, 5.15, 0.520); holes.push(g); });
  { const g = new THREE.SphereGeometry(0.090, SEG(10,14), SEG(8,10)); g.scale(0.78, 1.35, 0.70);
    g.translate(0, 4.94, 0.560); holes.push(g); }
  const holeM = new THREE.Mesh(Kit.merge(holes), holeMat); holeM.userData.sub = 'cara';
  /* arcada dentaria superior */
  const maxG = new THREE.TorusGeometry(0.215, 0.046, SEG(6,8), SEG(14,22), Math.PI*1.20);
  maxG.rotateX(Math.PI/2); maxG.rotateY(-Math.PI*1.10);
  maxG.translate(0, 4.68, 0.245);
  const maxM = new THREE.Mesh(maxG, boneMat(0xF0E6D2, [3,1])); maxM.userData.sub = 'cara';
  /* mandíbula en U con ramas ascendentes hasta el temporal */
  const jawPts = [[-0.315,5.09,-0.12],[-0.350,4.81,-0.03],[-0.330,4.60,0.15],[-0.195,4.50,0.35],[0,4.48,0.44],
                  [0.195,4.50,0.35],[0.330,4.60,0.15],[0.350,4.81,-0.03],[0.315,5.09,-0.12]];
  const jawM = new THREE.Mesh(Kit.taper(jawPts, 0, 0, { rfn:u => 0.052 + 0.048*Math.sin(Math.PI*u), seg:SEG(20,36), rad:SEG(7,10) }),
    boneMat(0xEFE4D0, [3,1])); jawM.userData.sub = 'mandibula';
  /* suturas: coronal y sagital en relieve */
  const sutMat = plainMat(0xC9B492, { rough:0.72, coat:0.1 });
  const sutG = [];
  { const cor = []; for (let i=0;i<=22;i++){ const a = Math.PI*(0.05 + 0.90*i/22);
      cor.push(new THREE.Vector3(SK.x + 0.592*Math.cos(a), SK.y + 0.590*Math.sin(a), SK.z + 0.06)); }
    sutG.push(Kit.taper(cor, 0.017, 0.017, { seg:SEG(14,26), rad:5 }));
    const sag = []; for (let i=0;i<=22;i++){ const t = -1.25 + 1.62*i/22;
      sag.push(new THREE.Vector3(SK.x, SK.y + 0.592*Math.cos(t), SK.z + 0.680*Math.sin(t))); }
    sutG.push(Kit.taper(sag, 0.017, 0.017, { seg:SEG(14,26), rad:5 })); }
  const sutM = new THREE.Mesh(Kit.merge(sutG), sutMat); sutM.userData.sub = 'suturas';
  add('craneo', [skullM, faceM, holeM, maxM, jawM, sutM]);

  /* ========================== COLUMNA ========================== */
  const VERT = [];
  const cerv = [[5.15,0.10],[5.03,0.17],[4.91,0.21],[4.79,0.22],[4.67,0.19],[4.55,0.13],[4.42,0.05]];
  cerv.forEach((v,i) => VERT.push({ y:v[0], z:v[1], r:0.115 + 0.006*i, reg:'cervical' }));
  for (let i=0;i<12;i++){ const t = i/11;
    VERT.push({ y:4.30 - 1.68*t, z:-0.06 - 0.28*Math.sin(Math.PI*t) + 0.04*t, r:0.160 + 0.075*t, reg:'toracica' }); }
  for (let i=0;i<5;i++){ const t = i/4;
    VERT.push({ y:2.50 - 0.98*t, z:0.02 + 0.22*Math.sin(Math.PI*t*0.9) + 0.08*t, r:0.250 + 0.050*t, reg:'lumbar' }); }
  const bodyG = { cervical:[], toracica:[], lumbar:[] }, discG = [];
  VERT.forEach((v, i) => {
    const reg = v.reg, G = bodyG[reg];
    const hb = reg==='cervical' ? 0.075 : reg==='toracica' ? 0.098 : 0.155;
    const b = new THREE.CylinderGeometry(v.r, v.r*0.98, hb, SEG(10,14), 1);
    b.translate(0, v.y, v.z); G.push(b);
    /* apófisis espinosa */
    const sl = reg==='cervical' ? 0.17 : reg==='toracica' ? 0.32 : 0.28;
    const dy = reg==='cervical' ? 0.04 : reg==='toracica' ? 0.16 : 0.03;
    G.push(Kit.taper([[0, v.y, v.z - v.r*0.85], [0, v.y - dy*0.5, v.z - v.r - sl*0.5], [0, v.y - dy, v.z - v.r - sl]],
      0.055, 0.032, { seg:SEG(4,7), rad:SEG(5,7) }));
    /* apófisis transversas */
    const tw = reg==='cervical' ? 0.13 : reg==='toracica' ? 0.19 : 0.25;
    [-1,1].forEach(s => G.push(Kit.taper([[s*v.r*0.75, v.y, v.z - v.r*0.35], [s*(v.r + tw), v.y + 0.02, v.z - v.r*0.55]],
      0.045, 0.030, { seg:3, rad:SEG(5,6) })));
    /* arco vertebral */
    [-1,1].forEach(s => G.push(Kit.taper([[s*v.r*0.72, v.y, v.z - v.r*0.30], [s*v.r*0.55, v.y, v.z - v.r - 0.06]],
      0.040, 0.040, { seg:3, rad:SEG(5,6) })));
    /* disco intervertebral */
    const nx = VERT[i+1];
    if (nx && nx.reg !== 'cervical' || (nx && reg === 'cervical')){
      if (nx){ const dh = Math.abs(v.y - nx.y) * 0.34;
        const dc = new THREE.CylinderGeometry((v.r + nx.r)/2*1.03, (v.r + nx.r)/2*1.03, dh, SEG(10,14), 1);
        dc.translate(0, (v.y + nx.y)/2, (v.z + nx.z)/2); discG.push(dc); } }
  });
  const spineMeshes = [];
  Object.entries(bodyG).forEach(([reg, gs]) => { const m = new THREE.Mesh(Kit.merge(gs), boneMat(0xE9DFC9, [2,6])); m.userData.sub = reg; spineMeshes.push(m); });
  const discM = new THREE.Mesh(Kit.merge(discG), plainMat(0xC6D6DC, { rough:0.45, coat:0.4 })); discM.userData.sub = 'discos';
  spineMeshes.push(discM);
  /* sacro y cóccix */
  const sacG = Kit.sculpt({ w:SEG(20,32), h:SEG(16,26),
    shape: d => new THREE.Vector3(0.42*d.x*(1 - 0.78*smooth01((-d.y + 0.15)/1.1)), 0.58*d.y, 0.17*d.z*(1 - 0.30*smooth01((-d.y)/1.2))),
    disp: (p) => 0.012*Kit.fbm(p.x*6, p.y*6, p.z*6, 2) });
  const sacM = new THREE.Mesh(sacG, boneMat(0xE6DBC4, [2,3]));
  sacM.position.set(0, 0.82, -0.14); sacM.rotation.x = 0.42; sacM.userData.sub = 'sacro';
  const cocM = new THREE.Mesh(Kit.taper([[0,0.26,-0.34],[0,0.10,-0.40],[0,-0.02,-0.38]], 0.085, 0.035, { seg:SEG(5,8), rad:SEG(6,8) }),
    boneMat(0xE6DBC4, [2,2])); cocM.userData.sub = 'sacro';
  spineMeshes.push(sacM, cocM);
  add('columna', spineMeshes);

  /* ======================= CAJA TORÁCICA ======================= */
  const TH = VERT.filter(v => v.reg === 'toracica');
  const RW = [0.55,0.75,0.88,0.97,1.04,1.08,1.10,1.09,1.04,0.95,0.78,0.56];
  const ribG = { verdaderas:[], falsas:[], flotantes:[] }, cartG = [];
  for (let i=0;i<12;i++){
    const v = TH[i], w = RW[i], dk = 0.22 + 0.62*(i/11);
    const grp = i < 7 ? 'verdaderas' : i < 10 ? 'falsas' : 'flotantes';
    [-1,1].forEach(s => {
      const P = [ new THREE.Vector3(s*(v.r + 0.14), v.y, v.z - 0.03),
                  new THREE.Vector3(s*0.48*w, v.y - 0.07, v.z - 0.26),
                  new THREE.Vector3(s*w,      v.y - 0.32*dk, v.z + 0.16),
                  new THREE.Vector3(s*0.80*w, v.y - 0.76*dk, v.z + 0.60),
                  new THREE.Vector3(s*0.40*w, v.y - 1.00*dk, v.z + 0.78) ];
      const pts = grp === 'flotantes' ? P.slice(0, 3).concat([P[2].clone().lerp(P[3], 0.45)]) : P;
      ribG[grp].push(Kit.taper(pts, 0.052, 0.040, { seg:SEG(12,22), rad:SEG(6,9) }));
      if (grp === 'flotantes') return;
      const end = P[4];
      const tgt = i < 7 ? new THREE.Vector3(s*0.14, 3.98 - 0.23*i, 0.575)
                        : new THREE.Vector3(s*0.32, 2.62, 0.50);
      const midC = i < 7 ? end.clone().lerp(tgt, 0.5).add(new THREE.Vector3(0, -0.03, 0.06))
                         : end.clone().lerp(tgt, 0.5).add(new THREE.Vector3(s*0.06, 0.10, 0.10));
      cartG.push(Kit.taper([end, midC, tgt], 0.042, 0.034, { seg:SEG(6,12), rad:SEG(5,8) }));
    });
  }
  const ribMeshes = Object.entries(ribG).map(([k, gs]) => { const m = new THREE.Mesh(Kit.merge(gs), boneMat(0xEDE2CC, [1,8])); m.userData.sub = k; return m; });
  const cartM = new THREE.Mesh(Kit.merge(cartG), plainMat(0xD8DCCF, { rough:0.42, coat:0.45 })); cartM.userData.sub = 'cartilagos';
  const stG = [];
  { const a = new THREE.BoxGeometry(0.34, 0.46, 0.11); a.translate(0, 3.88, 0.60); stG.push(a);
    const b = new THREE.BoxGeometry(0.27, 1.12, 0.10); b.translate(0, 3.10, 0.60); stG.push(b);
    const c = new THREE.BoxGeometry(0.14, 0.22, 0.07); c.translate(0, 2.44, 0.59); stG.push(c); }
  const stM = new THREE.Mesh(Kit.merge(stG), boneMat(0xEFE5CF, [2,3])); stM.userData.sub = 'esternon';
  add('caja-toracica', [...ribMeshes, cartM, stM]);

  /* ===================== CINTURA ESCAPULAR ===================== */
  const clavG = [], scapMeshes = [], glenG = [];
  [-1,1].forEach(s => {
    clavG.push(Kit.taper([[s*0.14, 4.06, 0.60], [s*0.60, 4.14, 0.48], [s*1.06, 4.06, 0.20], [s*1.42, 4.02, 0.02]],
      0, 0, { rfn:u => 0.058 - 0.018*Math.sin(Math.PI*u), seg:SEG(10,18), rad:SEG(7,10) }));
    /* escápula: placa triangular apoyada sobre las costillas */
    const sc = new THREE.Mesh(Kit.sculpt({ w:SEG(18,28), h:SEG(14,22),
      shape: d => new THREE.Vector3(0.055*d.x, 0.54*d.y, 0.46*d.z * (1 - 0.42*smooth01((-d.y)/1.1))),
      disp: (p) => 0.012*Kit.fbm(p.x*6, p.y*6, p.z*6, 2) }), boneMat(0xE9DFC8, [2,2]));
    sc.position.set(s*1.00, 3.45, -0.46); sc.rotation.set(0.22, s*0.42, s*-0.26); sc.userData.sub = 'escapula';
    scapMeshes.push(sc);
    /* espina de la escápula + acromion */
    glenG.push(Kit.taper([[s*0.62, 3.78, -0.62], [s*1.10, 3.90, -0.44], [s*1.44, 4.00, -0.14]], 0.058, 0.070, { seg:SEG(6,10), rad:SEG(6,8) }));
    /* cavidad glenoidea: copa poco profunda */
    const gl = new THREE.SphereGeometry(0.19, SEG(12,18), SEG(8,12), 0, Math.PI*2, 0, Math.PI*0.55);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), new THREE.Vector3(s*0.75,-0.30,0.20).normalize());
    gl.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    gl.translate(s*1.33, 3.86, -0.06); glenG.push(gl);
    /* apófisis coracoides */
    glenG.push(Kit.taper([[s*1.02, 3.86, -0.22], [s*1.10, 3.92, 0.10]], 0.048, 0.038, { seg:3, rad:SEG(5,7) }));
  });
  const clavM = new THREE.Mesh(Kit.merge(clavG), boneMat(0xEBE1CA, [1,6])); clavM.userData.sub = 'clavicula';
  const glenM = new THREE.Mesh(Kit.merge(glenG), boneMat(0xE7DDC6, [2,2])); glenM.userData.sub = 'glena';
  add('cintura-escapular', [clavM, ...scapMeshes, glenM]);

  /* ===================== BRAZO Y ANTEBRAZO ===================== */
  const humG = [], ulnG = [], radG = [];
  [-1,1].forEach(s => {
    const hTop = new THREE.Vector3(s*1.42, 3.82, -0.02), hBot = new THREE.Vector3(s*1.62, 1.62, 0.00);
    humG.push(Kit.taper([hTop, hTop.clone().lerp(hBot,0.5).add(new THREE.Vector3(s*0.03,0,0.04)), hBot],
      0, 0, { rfn:u => 0.105 - 0.030*Math.sin(Math.PI*u), seg:SEG(10,18), rad:SEG(8,12) }));
    const hd = new THREE.SphereGeometry(0.175, SEG(12,18), SEG(9,13)); hd.translate(s*1.38, 3.86, -0.04); humG.push(hd);
    [-0.16, 0.14].forEach((o,k) => { const c = new THREE.SphereGeometry(k?0.115:0.095, SEG(10,14), SEG(8,10));
      c.scale(1, 0.85, 1); c.translate(s*(1.62 + s*o*0.9), 1.60, 0.0); humG.push(c); });
    /* cúbito: olécranon arriba, fino abajo */
    ulnG.push(Kit.taper([[s*1.54, 1.72, -0.12],[s*1.56, 0.92, -0.10],[s*1.58, 0.08, -0.06]],
      0, 0, { rfn:u => 0.078 - 0.034*u, seg:SEG(8,16), rad:SEG(7,10) }));
    const ol = new THREE.SphereGeometry(0.095, SEG(10,14), SEG(8,10)); ol.translate(s*1.54, 1.76, -0.18); ulnG.push(ol);
    /* radio: fino arriba, ancho abajo */
    radG.push(Kit.taper([[s*1.76, 1.66, 0.06],[s*1.78, 0.90, 0.06],[s*1.80, 0.02, 0.05]],
      0, 0, { rfn:u => 0.050 + 0.042*u, seg:SEG(8,16), rad:SEG(7,10) }));
    const rh = new THREE.CylinderGeometry(0.068, 0.068, 0.10, SEG(10,14)); rh.translate(s*1.76, 1.70, 0.06); radG.push(rh);
  });
  const humM = new THREE.Mesh(Kit.merge(humG), boneMat(0xECE1C9, [1,6])); humM.userData.sub = 'humero';
  const ulnM = new THREE.Mesh(Kit.merge(ulnG), boneMat(0xE9DEC6, [1,6])); ulnM.userData.sub = 'cubito';
  const radM = new THREE.Mesh(Kit.merge(radG), boneMat(0xEEE3CB, [1,6])); radM.userData.sub = 'radio';
  add('brazo', [humM, ulnM, radM]);

  /* =========================== MANO =========================== */
  const carpG = [], metaG = [], falG = [];
  const FL = [0.95, 1.00, 0.95, 0.80];
  [-1,1].forEach(s => {
    for (let r=0;r<2;r++) for (let k=0;k<4;k++){
      const g = new THREE.SphereGeometry(0.052, SEG(8,11), SEG(6,9));
      g.scale(1, 0.85, 1);
      g.translate(s*(1.60 + 0.055*k), -0.14 - 0.10*r, -0.08 + 0.075*k + 0.03*r); carpG.push(g);
    }
    for (let k=0;k<4;k++){
      const b = new THREE.Vector3(s*(1.64 + 0.035*k), -0.28, -0.09 + 0.070*k);
      const t = new THREE.Vector3(s*(1.66 + 0.030*k), -0.64, -0.15 + 0.105*k);
      metaG.push(Kit.taper([b, t], 0.040, 0.034, { seg:SEG(4,7), rad:SEG(5,7) }));
      const L = 0.55*FL[k], tip = new THREE.Vector3(t.x, t.y - L, t.z + 0.05);
      falG.push(Kit.taper([t, t.clone().lerp(tip,0.52), tip], 0.033, 0.023, { seg:SEG(4,8), rad:SEG(5,7) }));
    }
    /* pulgar: separado y hacia adelante */
    const tb = new THREE.Vector3(s*1.58, -0.26, 0.10), tm = new THREE.Vector3(s*1.50, -0.46, 0.30);
    metaG.push(Kit.taper([tb, tm], 0.044, 0.036, { seg:SEG(4,7), rad:SEG(5,7) }));
    falG.push(Kit.taper([tm, new THREE.Vector3(s*1.44, -0.62, 0.44)], 0.034, 0.024, { seg:SEG(4,7), rad:SEG(5,7) }));
  });
  const carpM = new THREE.Mesh(Kit.merge(carpG), boneMat(0xE7DCC4, [2,2])); carpM.userData.sub = 'carpo';
  const metaM = new THREE.Mesh(Kit.merge(metaG), boneMat(0xEADFC7, [1,4])); metaM.userData.sub = 'metacarpo';
  const falM  = new THREE.Mesh(Kit.merge(falG),  boneMat(0xE5DAC2, [1,4])); falM.userData.sub = 'falanges';
  add('mano', [carpM, metaM, falM]);

  /* ====================== CINTURA PÉLVICA ====================== */
  const ilMeshes = [], isqG = [], pubG = [], acetG = [];
  const HIP = s => new THREE.Vector3(s*0.88, 0.25, 0.05);
  [-1,1].forEach(s => {
    const il = new THREE.Mesh(Kit.sculpt({ w:SEG(20,32), h:SEG(16,26),
      shape: d => new THREE.Vector3(0.080*d.x, 0.60*d.y*(1 - 0.18*smooth01((-d.y)/1.3)), 0.62*d.z * (1 - 0.34*smooth01((-d.y)/1.2))),
      disp: (p) => 0.015*Kit.fbm(p.x*5, p.y*5, p.z*5, 2) }), boneMat(0xE4D9C0, [2,2]));
    il.position.set(s*0.72, 0.92, 0.04); il.rotation.set(-0.10, s*0.62, s*-0.36); il.userData.sub = 'ilion';
    ilMeshes.push(il);
    const H = HIP(s);
    /* cuerpo del ilion: baja del ala al acetábulo */
    isqG.push(Kit.taper([new THREE.Vector3(s*0.74, 0.86, 0.02), new THREE.Vector3(s*0.82, 0.55, 0.04), H],
      0.155, 0.150, { seg:SEG(5,9), rad:SEG(7,10) }));
    /* puente sacroilíaco: une el ala con el sacro por detrás */
    isqG.push(Kit.taper([new THREE.Vector3(s*0.22, 1.12, -0.24), new THREE.Vector3(s*0.48, 1.06, -0.14), new THREE.Vector3(s*0.68, 0.98, -0.02)],
      0.125, 0.140, { seg:SEG(5,9), rad:SEG(7,10) }));
    isqG.push(Kit.taper([H, new THREE.Vector3(s*0.74,-0.18,-0.14), new THREE.Vector3(s*0.48,-0.42,0.02)],
      0.105, 0.080, { seg:SEG(6,10), rad:SEG(7,9) }));
    pubG.push(Kit.taper([H, new THREE.Vector3(s*0.46,0.16,0.40), new THREE.Vector3(s*0.07,0.12,0.47)],
      0.090, 0.068, { seg:SEG(6,10), rad:SEG(7,9) }));
    pubG.push(Kit.taper([new THREE.Vector3(s*0.07,0.12,0.47), new THREE.Vector3(s*0.30,-0.18,0.34), new THREE.Vector3(s*0.48,-0.42,0.02)],
      0.062, 0.070, { seg:SEG(6,10), rad:SEG(6,8) }));
    /* acetábulo: copa profunda mirando hacia afuera-abajo-adelante */
    const cup = new THREE.SphereGeometry(0.235, SEG(14,20), SEG(9,14), 0, Math.PI*2, 0, Math.PI*0.62);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), new THREE.Vector3(s*0.82,-0.42,0.38).normalize());
    cup.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    cup.translate(H.x - s*0.06, H.y + 0.03, H.z - 0.02); acetG.push(cup);
  });
  const isqM = new THREE.Mesh(Kit.merge(isqG), boneMat(0xE2D7BE, [1,4])); isqM.userData.sub = 'isquion';
  const pubM = new THREE.Mesh(Kit.merge(pubG), boneMat(0xE6DBC2, [1,4])); pubM.userData.sub = 'pubis';
  const acetM = new THREE.Mesh(Kit.merge(acetG), boneMat(0xDCD1B8, [2,2])); acetM.userData.sub = 'acetabulo';
  add('cintura-pelvica', [...ilMeshes, isqM, pubM, acetM]);

  /* ================== MIEMBRO INFERIOR Y RODILLA ================== */
  const KNEE = new THREE.Vector3(-0.74, -2.72, 0.03);   /* rodilla izquierda: pivote de la flexión */
  const flexM = [];
  const pivotMesh = (geos, mat, sub) => { const g = Kit.merge(geos); g.translate(-KNEE.x, -KNEE.y, -KNEE.z);
    const m = new THREE.Mesh(g, mat); m.position.copy(KNEE); if (sub) m.userData.sub = sub; flexM.push(m); return m; };
  const fixMesh = (geos, mat, sub) => { const m = new THREE.Mesh(Kit.merge(geos), mat); if (sub) m.userData.sub = sub; return m; };

  /* --- fémur --- */
  const femParts = { cabeza:[], trocanter:[], diafisis:[], condilos:[] };
  [-1,1].forEach(s => {
    const H = new THREE.Vector3(s*0.88, 0.25, 0.05), K = new THREE.Vector3(s*0.74, -2.72, 0.03);
    const hd = new THREE.SphereGeometry(0.185, SEG(14,20), SEG(10,15)); hd.translate(H.x, H.y, H.z); femParts.cabeza.push(hd);
    femParts.cabeza.push(Kit.taper([H, new THREE.Vector3(s*1.02,0.28,0.02), new THREE.Vector3(s*1.12,0.30,0.00)],
      0.115, 0.135, { seg:SEG(5,8), rad:SEG(7,10) }));
    const tr = new THREE.SphereGeometry(0.155, SEG(12,16), SEG(8,12)); tr.scale(1,1.25,0.95); tr.translate(s*1.17, 0.36, -0.02);
    femParts.trocanter.push(tr);
    femParts.diafisis.push(Kit.taper([new THREE.Vector3(s*1.10,0.26,0.00),
      new THREE.Vector3(s*0.92,-1.25,0.10), new THREE.Vector3(K.x, K.y+0.16, K.z)],
      0, 0, { rfn:u => 0.135 - 0.038*Math.sin(Math.PI*u) + 0.02*u, seg:SEG(10,18), rad:SEG(9,13) }));
    [-0.17, 0.17].forEach(o => { const c = new THREE.SphereGeometry(0.225, SEG(12,18), SEG(9,13));
      c.scale(0.92, 1, 1.05); c.translate(K.x + o, K.y + 0.14, K.z - 0.02); femParts.condilos.push(c); });
  });
  add('femur', Object.entries(femParts).map(([k, gs]) => fixMesh(gs, boneMat(0xEFE4CC, [1,6]), k)));

  /* --- tibia y peroné (la izquierda gira con la rodilla) --- */
  const tibMeshes = [];
  [-1,1].forEach(s => {
    const K = new THREE.Vector3(s*0.74, -2.72, 0.03);
    const mk = s < 0 ? pivotMesh : fixMesh;
    const plat = new THREE.CylinderGeometry(0.29, 0.26, 0.13, SEG(14,20), 1); plat.translate(K.x, K.y - 0.17, K.z);
    tibMeshes.push(mk([plat], boneMat(0xE9DEC6, [2,2]), 'meseta'));
    const sh = Kit.taper([new THREE.Vector3(K.x, K.y-0.22, K.z+0.02), new THREE.Vector3(s*0.75,-4.10,0.08), new THREE.Vector3(s*0.76,-5.32,0.02)],
      0, 0, { rfn:u => 0.150 - 0.058*u, seg:SEG(10,18), rad:SEG(8,12) });
    tibMeshes.push(mk([sh], boneMat(0xE9DEC6, [1,6]), 'tibia'));
    const fib = Kit.taper([new THREE.Vector3(s*0.99,-2.92,-0.05), new THREE.Vector3(s*0.96,-4.10,-0.02), new THREE.Vector3(s*0.94,-5.30,-0.02)],
      0, 0, { rfn:u => 0.052 + 0.016*u, seg:SEG(8,14), rad:SEG(6,9) });
    tibMeshes.push(mk([fib], boneMat(0xE6DBC3, [1,6]), 'perone'));
    const mal = [];
    { const a = new THREE.SphereGeometry(0.095, SEG(10,14), SEG(7,10)); a.scale(0.8,1.3,0.9); a.translate(s*0.64,-5.40,0.0); mal.push(a);
      const b = new THREE.SphereGeometry(0.085, SEG(10,14), SEG(7,10)); b.scale(0.8,1.4,0.9); b.translate(s*0.95,-5.44,-0.02); mal.push(b); }
    tibMeshes.push(mk(mal, boneMat(0xE3D8C0, [2,2]), 'maleolos'));
  });
  add('tibia-perone', tibMeshes);

  /* --- pie (el izquierdo acompaña a la pierna) --- */
  const footMeshes = [];
  [-1,1].forEach(s => {
    const mk = s < 0 ? pivotMesh : fixMesh;
    const tal = new THREE.SphereGeometry(0.165, SEG(12,18), SEG(9,13)); tal.scale(1,0.9,1.15); tal.translate(s*0.76,-5.50,0.06);
    footMeshes.push(mk([tal], boneMat(0xE5DAC2, [2,2]), 'tarso'));
    const cal = new THREE.SphereGeometry(1, SEG(12,18), SEG(9,13)); cal.scale(0.17,0.20,0.34); cal.translate(s*0.76,-5.74,-0.24);
    footMeshes.push(mk([cal], boneMat(0xE7DCC4, [2,2]), 'calcaneo'));
    const tar = []; for (let k=0;k<4;k++){ const g = new THREE.SphereGeometry(0.098, SEG(9,12), SEG(7,9));
      g.translate(s*(0.64 + 0.085*k), -5.64, 0.20 + 0.055*k); tar.push(g); }
    footMeshes.push(mk(tar, boneMat(0xE5DAC2, [2,2]), 'tarso'));
    const met = [], fal = [];
    for (let k=0;k<5;k++){
      const b = new THREE.Vector3(s*(0.62 + 0.070*k), -5.70, 0.36), t = new THREE.Vector3(s*(0.52 + 0.115*k), -5.86, 0.92);
      met.push(Kit.taper([b, t], 0.048, 0.038, { seg:SEG(4,7), rad:SEG(5,7) }));
      const L = k === 0 ? 0.32 : 0.26 - 0.02*k;
      fal.push(Kit.taper([t, new THREE.Vector3(t.x, -5.90, t.z + L*1.4)], 0.036, 0.028, { seg:SEG(3,6), rad:SEG(5,7) }));
    }
    footMeshes.push(mk(met, boneMat(0xE8DDC5, [1,4]), 'metatarso'));
    footMeshes.push(mk(fal, boneMat(0xE3D8C0, [1,4]), 'falanges'));
  });
  add('pie', footMeshes);

  /* ============ RODILLA: ARTICULACIÓN SINOVIAL EN CORTE ============ */
  const K = KNEE;
  const cartMatA = plainMat(0xDFF0EB, { rough:0.18, coat:0.85, coatRough:0.12 });
  const meniMat  = plainMat(0xC79E52, { rough:0.50, coat:0.30 });
  const ligMat   = plainMat(0xEDE7D6, { rough:0.62, coat:0.10 });
  /* cartílago de los cóndilos femorales (no se mueve con la tibia) */
  const fcG = [];
  [-0.17, 0.17].forEach(o => { const c = new THREE.SphereGeometry(0.238, SEG(12,18), SEG(9,13), 0, Math.PI*2, Math.PI*0.56, Math.PI*0.44);
    c.scale(0.92, 1, 1.05); c.translate(K.x + o, K.y + 0.14, K.z - 0.02); fcG.push(c); });
  const femCart = fixMesh(fcG, cartMatA, 'cartilago');
  /* cartílago de la meseta tibial + meniscos (giran con la tibia) */
  const tcG = [new THREE.CylinderGeometry(0.288, 0.278, 0.050, SEG(14,20), 1)];
  tcG[0].translate(K.x, K.y - 0.085, K.z);
  const tibCart = pivotMesh(tcG, cartMatA, 'cartilago');
  const menG = [];
  [-1,1].forEach(o => { const t = new THREE.TorusGeometry(0.175, 0.050, SEG(6,8), SEG(12,18), Math.PI*1.35);
    t.rotateX(-Math.PI/2); t.rotateY(o > 0 ? 0.5 : Math.PI - 0.5);
    t.translate(K.x + o*0.135, K.y - 0.030, K.z); menG.push(t); });
  const meniscos = pivotMesh(menG, meniMat, 'meniscos');
  /* ligamentos cruzados */
  const cruG = [
    Kit.taper([new THREE.Vector3(K.x-0.03, K.y-0.09, K.z+0.11), new THREE.Vector3(K.x+0.04, K.y+0.07, K.z-0.02), new THREE.Vector3(K.x+0.11, K.y+0.25, K.z-0.15)], 0.042, 0.038, { seg:SEG(5,9), rad:SEG(6,8) }),
    Kit.taper([new THREE.Vector3(K.x+0.05, K.y-0.09, K.z-0.13), new THREE.Vector3(K.x-0.02, K.y+0.07, K.z-0.02), new THREE.Vector3(K.x-0.11, K.y+0.25, K.z+0.05)], 0.042, 0.038, { seg:SEG(5,9), rad:SEG(6,8) })];
  const cruzados = fixMesh(cruG, ligMat, 'cruzados');
  /* ligamentos colaterales */
  const colG = [-1,1].map(o => Kit.taper([new THREE.Vector3(K.x + o*0.30, K.y+0.36, K.z-0.02),
    new THREE.Vector3(K.x + o*0.33, K.y-0.05, K.z), new THREE.Vector3(K.x + o*0.30, K.y-0.46, K.z+0.02)],
    0.040, 0.038, { seg:SEG(5,9), rad:SEG(6,8) }));
  const colaterales = fixMesh(colG, ligMat, 'colaterales');
  /* rótula y tendones: siguen la mitad del giro (tracking rotuliano) */
  const patG = [];
  { const p = new THREE.SphereGeometry(1, SEG(12,18), SEG(9,13)); p.scale(0.115, 0.155, 0.055);
    p.translate(K.x, K.y + 0.20, K.z + 0.345); patG.push(p);
    patG.push(Kit.taper([new THREE.Vector3(K.x, K.y+0.78, K.z+0.26), new THREE.Vector3(K.x, K.y+0.36, K.z+0.33)], 0.060, 0.050, { seg:SEG(4,7), rad:SEG(6,8) }));
    patG.push(Kit.taper([new THREE.Vector3(K.x, K.y+0.05, K.z+0.34), new THREE.Vector3(K.x, K.y-0.36, K.z+0.22)], 0.050, 0.055, { seg:SEG(4,7), rad:SEG(6,8) })); }
  const patG2 = Kit.merge(patG); patG2.translate(-K.x, -K.y, -K.z);
  const patella = new THREE.Mesh(patG2, boneMat(0xEFE4CC, [2,2])); patella.position.copy(K); patella.userData.sub = 'rotula';
  /* cápsula articular con líquido sinovial */
  const capsG = Kit.sculpt({ w:SEG(20,30), h:SEG(16,22),
    shape: d => new THREE.Vector3(0.42*d.x, 0.47*d.y, 0.40*d.z) });
  const capsule = new THREE.Mesh(capsG, Kit.tissue({ color:sRGB(0x9AD6E8), transparent:true, opacity:0.20, rough:0.10,
    coat:1, coatRough:0.1, depthWrite:false, side:THREE.DoubleSide }));
  capsule.position.set(K.x, K.y - 0.02, K.z + 0.02); capsule.userData.sub = 'sinovial';
  add('rodilla', [femCart, tibCart, meniscos, cruzados, colaterales, patella, capsule],
    { explodeDir:new THREE.Vector3(-0.9, -0.2, 0.4).normalize() });

  /* =============== TIPOS DE ARTICULACIONES (brazo derecho) =============== */
  const jointMat = Kit.tissue({ color:sRGB(0xD8B45C), transparent:true, opacity:0.55, rough:0.25, coat:0.8, depthWrite:false, side:THREE.DoubleSide });
  const jointSolid = plainMat(0xC79A33, { rough:0.35, coat:0.6 });
  /* esférica: hombro */
  const esfG = [new THREE.SphereGeometry(0.255, SEG(14,20), SEG(10,14))];
  esfG[0].translate(1.38, 3.86, -0.04);
  const esfMesh = fixMesh(esfG, jointMat, 'esferica');
  const esfArcG = [];
  for (let a=0;a<3;a++){ const t = new THREE.TorusGeometry(0.36, 0.016, 5, SEG(18,28), Math.PI*1.1);
    t.rotateY(a*Math.PI/3); t.rotateX(a===2 ? Math.PI/2 : 0); t.translate(1.38, 3.86, -0.04); esfArcG.push(t); }
  const esfArc = fixMesh(esfArcG, jointSolid, 'esferica');
  /* bisagra: codo — eje de giro y arco de movimiento */
  const bisG = [];
  { const ax = new THREE.CylinderGeometry(0.038, 0.038, 0.72, SEG(10,14)); ax.rotateZ(Math.PI/2); ax.translate(1.62, 1.62, 0.00); bisG.push(ax);
    const arc = new THREE.TorusGeometry(0.42, 0.018, 5, SEG(16,26), Math.PI*0.75); arc.rotateY(Math.PI/2); arc.rotateZ(-0.5);
    arc.translate(1.62, 1.62, 0.00); bisG.push(arc); }
  const bisMesh = fixMesh(bisG, jointSolid, 'bisagra');
  /* plana: carpo — dos discos que se deslizan */
  const plaG = [];
  [0, 1].forEach(r => { const d0 = new THREE.CylinderGeometry(0.135, 0.135, 0.022, SEG(12,18));
    d0.rotateX(0.25); d0.translate(1.70, -0.185 + 0.032*(r?1:-1), 0.02 + 0.01*r); plaG.push(d0); });
  const plaMesh = fixMesh(plaG, jointSolid, 'plana');
  add('tipos-articulaciones', [esfMesh, esfArc, bisMesh, plaMesh],
    { explodeDir:new THREE.Vector3(1, 0.2, 0.3).normalize() });

  const flatMat = c => new THREE.MeshStandardMaterial({ color:sRGB(c), roughness:0.82, metalness:0, envMapIntensity:0 });
  /* ===================== LUPAS: aro y línea guía ===================== */
  const ringMat = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:false });
  const lupa = (c, rad, to) => { const r = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.022, 8, SEG(36,60)), ringMat);
    r.position.copy(c); r.lookAt(c.clone().add(new THREE.Vector3(-0.35, 0, 1)));
    const dir = to.clone().sub(c).normalize();
    const ld = new THREE.Mesh(Kit.taper([c.clone().addScaledVector(dir, rad), to], 0.011, 0.011, { seg:4, rad:6 }), ringMat);
    E.scene.add(r, ld); };
  const LC1 = new THREE.Vector3(4.50, 1.85, 0.40), LC2 = new THREE.Vector3(4.50, -1.55, 0.40);
  lupa(LC1, 1.10, new THREE.Vector3(1.66, 2.60, 0.02));
  lupa(LC2, 1.20, new THREE.Vector3(1.04, 0.22, 0.04));

  /* =============== LUPA 1: HUESO COMPACTO Y OSTEONAS =============== */
  const matrixG = [new THREE.BoxGeometry(1.78, 1.42, 0.22)];
  matrixG[0].translate(LC1.x, LC1.y, LC1.z);
  const matrixM = fixMesh(matrixG, boneMat(0xE0C89A, [3,3]), 'laminillas');
  const ZF = LC1.z + 0.118;
  const OST = [[-0.48,0.36],[0.28,0.40],[-0.14,-0.14],[0.52,-0.34],[-0.60,-0.36]];
  const lamG = [], havG = [], octG = [], volG = [];
  OST.forEach(([ox, oy]) => {
    const cx = LC1.x + ox, cy = LC1.y + oy;
    [0.105, 0.165, 0.225].forEach(rr => { const t = new THREE.TorusGeometry(rr, 0.021, SEG(5,7), SEG(16,26));
      t.translate(cx, cy, ZF); lamG.push(t); });
    const hc = new THREE.CylinderGeometry(0.048, 0.048, 0.30, SEG(10,14)); hc.rotateX(Math.PI/2); hc.translate(cx, cy, LC1.z + 0.02); havG.push(hc);
    for (let k=0;k<10;k++){ const a = (k/10)*Math.PI*2 + ox; const rr = k%2 ? 0.135 : 0.196;
      const g = new THREE.SphereGeometry(0.030, SEG(6,8), SEG(5,6)); g.scale(1.5, 0.75, 0.75);
      const q = new THREE.Matrix4().makeRotationZ(a); g.applyMatrix4(q);
      g.translate(cx + Math.cos(a)*rr, cy + Math.sin(a)*rr, ZF); octG.push(g); }
  });
  for (let k=0;k<4;k++){ const a = OST[k], b = OST[(k+1)%OST.length];
    volG.push(Kit.taper([new THREE.Vector3(LC1.x+a[0], LC1.y+a[1], LC1.z+0.02), new THREE.Vector3(LC1.x+b[0], LC1.y+b[1], LC1.z+0.02)],
      0.026, 0.026, { seg:3, rad:SEG(5,6) })); }
  const lamM = fixMesh(lamG, plainMat(0xF0E0BC, { rough:0.5, coat:0.3 }), 'laminillas');
  const havM = fixMesh(havG, flatMat(0x9E2F28), 'havers');
  const octM = fixMesh(octG, flatMat(0x4C3A6B), 'osteocitos');
  const volM = fixMesh(volG, flatMat(0xC0562E), 'volkmann');
  add('hueso-compacto', [matrixM, lamM, havM, octM, volM], { explodeDir:new THREE.Vector3(1, 0.4, 0.3).normalize() });

  /* ========= LUPA 2: HUESO ESPONJOSO, TRABÉCULAS Y MÉDULA ROJA ========= */
  const trabG = [];
  const bez = (p0, p1, p2, n) => { const out = []; for (let i=0;i<=n;i++){ const t = i/n, u = 1-t;
    out.push(new THREE.Vector3(u*u*p0.x + 2*u*t*p1.x + t*t*p2.x, u*u*p0.y + 2*u*t*p1.y + t*t*p2.y, u*u*p0.z + 2*u*t*p1.z + t*t*p2.z)); } return out; };
  const nodes = [];
  [1,-1].forEach(fam => { for (let j=0;j<5;j++){
    const o = 0.14*j, z0 = LC2.z + 0.30 - 0.16*j;
    const p0 = new THREE.Vector3(LC2.x + fam*(-0.82 + o), LC2.y - 0.82, z0);
    const p1 = new THREE.Vector3(LC2.x + fam*(-0.18 + o), LC2.y + 0.02, z0 + fam*0.08);
    const p2 = new THREE.Vector3(LC2.x + fam*(0.34 + 0.10*j), LC2.y + 0.84, z0);
    const pts = bez(p0, p1, p2, 6);
    pts.forEach(p => nodes.push(p));
    trabG.push(Kit.taper(pts, 0.036, 0.030, { seg:SEG(7,12), rad:SEG(5,7) }));
  } });
  for (let k=0;k<10;k++){ const a = nodes[Math.floor(RND()*nodes.length)], b = nodes[Math.floor(RND()*nodes.length)];
    if (a.distanceTo(b) > 0.12 && a.distanceTo(b) < 0.55) trabG.push(Kit.taper([a, b], 0.024, 0.024, { seg:3, rad:5 })); }
  const trabM = fixMesh(trabG, boneMat(0xE6D4AC, [2,4]), 'trabeculas');
  const marG = [];
  for (let k=0;k<34;k++){ const g = new THREE.SphereGeometry(0.048 + 0.035*RND(), SEG(6,9), SEG(5,7));
    g.translate(LC2.x + (RND()-0.5)*1.70, LC2.y + (RND()-0.5)*1.66, LC2.z + (RND()-0.5)*0.55); marG.push(g); }
  const marM = fixMesh(marG, Kit.tissue({ color:sRGB(0x9E2A2A), transparent:true, opacity:0.72, rough:0.55, coat:0.3, depthWrite:false }), 'medula');
  const cellG = [];
  for (let k=0;k<7;k++){ const g = new THREE.SphereGeometry(0.058, SEG(8,11), SEG(6,8)); g.scale(1, 1, 0.45);
    g.translate(LC2.x + (RND()-0.5)*1.5, LC2.y + (RND()-0.5)*1.5, LC2.z + 0.34 + RND()*0.12); cellG.push(g); }
  const rbcM = fixMesh(cellG, plainMat(0xD03A2E, { rough:0.4, coat:0.5 }), 'celulas');
  const wbcG = [], pltG = [];
  for (let k=0;k<4;k++){ const g = new THREE.SphereGeometry(0.072, SEG(8,11), SEG(6,8));
    g.translate(LC2.x + (RND()-0.5)*1.4, LC2.y + (RND()-0.5)*1.4, LC2.z + 0.36 + RND()*0.10); wbcG.push(g); }
  for (let k=0;k<6;k++){ const g = new THREE.SphereGeometry(0.030, SEG(6,8), SEG(5,6)); g.scale(1,1,0.5);
    g.translate(LC2.x + (RND()-0.5)*1.4, LC2.y + (RND()-0.5)*1.4, LC2.z + 0.38 + RND()*0.10); pltG.push(g); }
  const wbcM = fixMesh(wbcG, plainMat(0xEFE4F2, { rough:0.35, coat:0.6 }), 'celulas');
  const pltM = fixMesh(pltG, plainMat(0xE0A33A, { rough:0.4, coat:0.5 }), 'celulas');
  add('esponjoso-medula', [trabM, marM, rbcM, wbcM, pltM], { explodeDir:new THREE.Vector3(1, -0.4, 0.3).normalize() });

  /* ===================== ANIMACIÓN 1: REMODELACIÓN ===================== */
  const RC = new THREE.Vector3(4.50, -3.90, 0.55), X0 = 3.95, WW = 1.10;
  const remObj = [];
  const showable = m => { m.visible = false; E.scene.add(m); remObj.push(m); return m; };
  const barG = new THREE.CylinderGeometry(0.24, 0.24, 1.80, SEG(12,18)); barG.rotateZ(Math.PI/2); barG.translate(RC.x, RC.y, RC.z);
  const barM = showable(new THREE.Mesh(barG, boneMat(0xE6D4AC, [4,2])));
  const trench = showable(new THREE.Mesh(new THREE.BoxGeometry(WW, 0.16, 0.34), flatMat(0x33211A)));
  const newBone = showable(new THREE.Mesh(new THREE.BoxGeometry(WW, 0.145, 0.32), flatMat(0xF7EBCB)));
  const clast = showable(new THREE.Mesh(Kit.sculpt({ radii:[0.14,0.10,0.12], w:SEG(12,18), h:SEG(9,13),
    disp:(p)=>0.02*Kit.fbm(p.x*8,p.y*8,p.z*8,2) }), flatMat(0xC2560E)));
  const blasts = [];
  for (let k=0;k<4;k++) blasts.push(showable(new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.085, 0.085), flatMat(0x1F7C7C))));
  const newOct = [];
  for (let k=0;k<3;k++) newOct.push(showable(new THREE.Mesh(new THREE.SphereGeometry(0.036, SEG(6,8), SEG(5,6)), flatMat(0x4C3A6B))));
  const rem = { on:false, t:0, speed:1 };
  const setTrench = k => { trench.scale.x = Math.max(0.001, k); trench.position.set(X0 + 0.5*WW*k, RC.y + 0.165, RC.z); };
  const setNew = m => { newBone.scale.x = Math.max(0.001, m); newBone.position.set(X0 + 0.5*WW*m, RC.y + 0.160, RC.z); };

  /* ================== ANIMACIÓN 2: FLEXIÓN DE RODILLA ================== */
  const flex = { on:false, t:0, speed:1 };
  const setFlex = ang => { flexM.forEach(m => m.rotation.x = ang); patella.rotation.x = ang*0.55; };

  const model = {
    anims:[
      { id:'remodelacion', label:'Remodelación ósea: osteoclastos excavan, osteoblastos rellenan',
        get on(){ return rem.on; },
        set(on){ rem.on = on; rem.t = 0; remObj.forEach(m => m.visible = on);
          if (on){ setTrench(0); setNew(0); clast.visible = false; blasts.forEach(b=>b.visible=false); newOct.forEach(o=>o.visible=false); E.focus(RC.clone(), 3.0); E.goal.theta = 0.10; E.goal.phi = 1.42; } },
        focus:true },
      { id:'flexion', label:'Flexión de la rodilla: cóndilos, meniscos y rótula',
        get on(){ return flex.on; },
        set(on){ flex.on = on; flex.t = 0; if (!on) setFlex(0); else { E.focus(KNEE.clone(), 2.8); E.goal.theta = -0.90; E.goal.phi = 1.48; } },
        focus:true }
    ],
    setSpeed(k){ rem.speed = k; flex.speed = k; },
    phaseText(){
      if (rem.on){ const t = rem.t % 1;
        return t < 0.10 ? 'Reposo · la superficie del hueso está cubierta por células de revestimiento'
             : t < 0.45 ? 'Resorción · los osteoclastos (naranja) disuelven el mineral y excavan una cavidad; el calcio pasa a la sangre (unas 3 semanas)'
             : t < 0.55 ? 'Inversión · los osteoclastos se retiran y llegan los osteoblastos'
             : t < 0.92 ? 'Formación · los osteoblastos (verde azulado) rellenan la cavidad con matriz nueva (unos 3 meses)'
             : 'Mineralización · algunos osteoblastos quedan atrapados en la matriz y se convierten en osteocitos'; }
      if (flex.on){ const p = flex.t % 1;
        return p < 0.5 ? 'Flexión · los cóndilos ruedan y deslizan sobre los meniscos y la rótula baja por la tróclea; el ligamento cruzado anterior se tensa'
                       : 'Extensión · el cuádriceps tira de la rótula, la tibia vuelve y los colaterales frenan el movimiento lateral'; }
      return '';
    },
    legend:[
      { color:'#D2691E', txt:'Osteoclastos: excavan el hueso viejo y liberan calcio' },
      { color:'#2E8B8B', txt:'Osteoblastos: fabrican la matriz de hueso nuevo' },
      { color:'#4C3A6B', txt:'Osteocitos: osteoblastos atrapados que vigilan la carga desde dentro' },
      { color:'#9E2F28', txt:'Conducto de Havers: vaso y nervio en el eje de cada osteona' },
      { color:'#9E2A2A', txt:'Médula ósea roja entre las trabéculas' }
    ],
    observa:'en la remodelación, primero se excava y después se rellena: siempre en ese orden y en el mismo sitio. Si el hueso recibe carga, los osteoblastos rellenan más de lo que los osteoclastos quitaron y el hueso se refuerza; sin carga, la cuenta sale negativa y el hueso se adelgaza. En la lupa de abajo, fíjate en que las trabéculas no están al azar: se cruzan siguiendo las líneas de fuerza, como los tirantes de un puente.'
  };

  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (rem.on){
      rem.t += dt*0.055*rem.speed; const p = rem.t % 1;
      const kR = clamp((p - 0.10)/0.35, 0, 1), kF = clamp((p - 0.55)/0.37, 0, 1);
      setTrench(kR); setNew(kF);
      clast.visible = p > 0.08 && p < 0.55;
      clast.position.set(X0 + WW*kR, RC.y + 0.30, RC.z + 0.04);
      clast.scale.setScalar(1 + 0.10*Math.sin(t*6));
      blasts.forEach((b, i) => { b.visible = p > 0.50; b.position.set(X0 + WW*kF + 0.06, RC.y + 0.31, RC.z - 0.12 + 0.08*i); });
      newOct.forEach((o, i) => { o.visible = p > 0.62 + 0.09*i; o.position.set(X0 + 0.22 + 0.32*i, RC.y + 0.18, RC.z + 0.02); });
    }
    if (flex.on){ flex.t += dt*0.10*flex.speed; setFlex(1.75*(0.5 - 0.5*Math.cos(2*Math.PI*(flex.t % 1)))); }
  });
  return model;
}

BIO.organs.esqueletico = BIO.skeleton;
BIO.builders.esqueletico = buildSkeleton;
route('/explorar/esqueletico', (view, q) => organView(view, q, BIO.skeleton, buildSkeleton));
/* Los enlaces antiguos al marcador "en construcción" llevan al modelo real */
route('/explorar/organo/esqueletico', () => navigate('#/explorar/esqueletico'));
</script>
