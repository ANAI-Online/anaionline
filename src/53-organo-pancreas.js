<script>
/* =====================================================================
   ÓRGANO: PÁNCREAS — la glándula de dos oficios
   Datos (BIO.pancreas) + modelo 3D procedimental (buildPancreas)
   Ruta: #/explorar/pancreas
   ===================================================================== */
BIO.pancreas = {
  capasHint: "Sugerencia: baja la transparencia de la glándula para seguir el conducto de Wirsung por dentro, y activa solo la capa «Tejido al microscopio» para quedarte con la lupa.",
  id:"pancreas", nombre:"Páncreas", unidad:6, dominio:"anat",
  eyebrow:"Atlas 3D · Unidad 6 · Sistema digestivo y endocrino", em:"🟠",
  intro:"Un mismo órgano con dos oficios: fabrica el jugo que digiere la comida y, al mismo tiempo, las hormonas que regulan el azúcar de la sangre. Recorre la cabeza, el cuerpo y la cola, sigue el conducto hasta el duodeno y entra con la lupa en el tejido para ver quién hace cada cosa.",
  nota:"Modelo tridimensional simplificado con fines educativos. El páncreas real mide unos 15 cm y está aplanado contra la pared posterior del abdomen, por detrás del estómago (que aquí no se dibuja para dejar ver la glándula). El duodeno y el bazo se representan solo lo necesario para situar el órgano. El tejido de la lupa está ampliado unas 300 veces: en la realidad un islote mide 0,1–0,2 mm y no se ve a simple vista.",
  focusR:9, radius:15.5, target:[0.05,-0.55,0], phi:1.35, theta:0.28, floor:-4.6, floorSize:13,
  capas:[
    {id:"glandula", n:"Glándula (cabeza, cuerpo y cola)"},
    {id:"conductos", n:"Conductos y desembocadura"},
    {id:"vecinos", n:"Duodeno y bazo"},
    {id:"lupa", n:"Tejido al microscopio (lupa)"}
  ],
  opacityCapas:["glandula"], opacityLabel:"Transparencia de la glándula", opacityDefault:1,
  activity:"explorar-pancreas", guidedActivity:"guiada-pancreas", badge:"anatomista", seenThreshold:8,
  related:[
    {t:"Simulador de glucemia (insulina y glucagón)", href:"#/cn/biomoleculas"},
    {t:"La célula ampliada", href:"#/explorar/celula"},
    {t:"Cuerpo humano y salud", href:"#/area/cuerpo"}
  ],
  reto:{
    proposito:"Descubrir cómo un solo órgano hace dos trabajos que no se parecen en nada: uno que sale por un tubo hacia el intestino y otro que sale directo a la sangre.",
    pista:"Para ver el conducto por dentro de la glándula, baja la transparencia en la pestaña Capas. El acino y el islote están en la lupa, el círculo azul de abajo a la derecha.",
    observa:[
      {id:"acino", txt:"El acino exocrino: dónde se fabrican las enzimas y hacia dónde las vierte"},
      {id:"islote", txt:"El islote de Langerhans: cuatro tipos de células y ningún conducto"},
      {id:"wirsung", txt:"El conducto principal, que recorre la glándula de la cola a la cabeza"},
      {id:"oddi", txt:"El esfínter de Oddi: la puerta por la que el jugo entra al duodeno"}
    ],
    pregunta:{
      q:"Ya viste las dos rutas de salida. ¿Cuál es la diferencia real entre la parte exocrina y la parte endocrina del páncreas?",
      ops:[
        "La exocrina trabaja de día y la endocrina de noche",
        "La exocrina vierte su producto a un conducto que llega al duodeno; la endocrina lo vierte directamente a la sangre, sin conducto",
        "La exocrina está en la cabeza y la endocrina solo en la cola"
      ],
      ok:1,
      fb:"Esa es la clave: «exocrino» significa que secreta hacia fuera por un conducto y «endocrino», hacia dentro, a la sangre. El páncreas es el ejemplo clásico de glándula mixta: el 98 % de su masa son acinos exocrinos y apenas el 1–2 % son islotes, pero esos islotes deciden qué hace el cuerpo con la energía.",
      wrong:[
        "No hay turnos. Las dos funciones ocurren a la vez, en el mismo órgano y en el mismo momento; lo que cambia es por dónde sale el producto.",
        "Los islotes están repartidos por toda la glándula, aunque son algo más abundantes en la cola. Lo que separa a las dos partes no es el lugar, sino la vía de salida: conducto o sangre."
      ]
    }
  },
  structures:[
    {id:"cabeza", nombre:"Cabeza y proceso unciforme", capa:"glandula", color:"#B8763F", pos:[-2.20,-0.35,0.05], lbl:[-5.47,-2.27,1.44],
      n1:"La parte más ancha del páncreas, encajada en la curva en C del duodeno, con un gancho que se mete por detrás: el proceso unciforme.",
      n2:"Aquí confluye todo: el conducto pancreático llega desde la cola y se une a la vía biliar que baja del hígado, y ambos desembocan juntos en el duodeno. El proceso unciforme se desliza por detrás de los vasos mesentéricos superiores, que lo atraviesan como un puente.",
      n3:"Esa vecindad explica un signo clínico: un tumor de la cabeza del páncreas comprime la vía biliar y la bilis se acumula, tiñendo de amarillo la piel y los ojos (ictericia) sin dolor. Por eso la ictericia indolora en un adulto siempre se estudia. También explica por qué operar esta zona es tan difícil: hay que separar la cabeza del duodeno, del colédoco y de los vasos, todo en pocos centímetros.",
      dato:"Cabeza y duodeno comparten irrigación: no se puede extirpar una sin el otro.",
      conecta:["duodeno","ampolla","cuello","wirsung"], temas:["Sistema digestivo","Anatomía abdominal","Vía biliar"],
      partes:[
        {n:"Cabeza propiamente dicha", d:"La masa ancha encajada en la C duodenal; mide unos 4 cm de alto.", at:[-2.20,-0.20,0.20], sub:"cabeza"},
        {n:"Proceso unciforme", d:"Prolongación en gancho que se dirige hacia atrás y hacia la izquierda, por debajo de los vasos mesentéricos.", at:[-1.50,-1.30,-0.25], sub:"unciforme"}
      ],
      quiz:{q:"¿Qué órgano rodea la cabeza del páncreas formando una C?", ops:["El estómago","El duodeno","El bazo"], ok:1,
        fb:"El duodeno abraza la cabeza y recibe en su pared el jugo pancreático y la bilis.",
        wrong:["El estómago queda por delante del páncreas, no lo rodea: se apoya sobre él.","El bazo está al otro extremo, junto a la cola."]}},

    {id:"cuello", nombre:"Cuello", capa:"glandula", color:"#B06E39", pos:[-1.30,0.45,0.00], lbl:[-0.55,1.68,-0.5],
      n1:"El estrechamiento de unos 2 cm que une la cabeza con el cuerpo.",
      n2:"Es la parte más delgada porque pasa por delante de dos vasos grandes: la vena mesentérica superior y la vena esplénica, que se unen justo detrás del cuello para formar la vena porta, la que lleva al hígado todo lo absorbido en el intestino.",
      n3:"Cuando hay que extirpar la cabeza del páncreas, el cirujano corta precisamente por el cuello: es el punto donde la glándula se separa mejor de los vasos. Del cuello también nace, en muchas personas, el conducto accesorio de Santorini.",
      dato:"Detrás del cuello nace la vena porta, la 'autopista' del hígado.",
      conecta:["cabeza","cuerpo","santorini"], temas:["Anatomía abdominal","Sistema porta"],
      quiz:{q:"¿Por qué el cuello del páncreas es tan estrecho?", ops:["Porque ahí no hay tejido glandular","Porque pasa por delante de grandes venas que lo aplanan","Porque es la parte más joven del órgano"], ok:1,
        fb:"La vena mesentérica superior y la esplénica se unen detrás del cuello y forman la vena porta.",
        wrong:["Sí hay tejido glandular: acinos e islotes como en el resto. Lo que cambia es el grosor, no el tejido.","Todo el órgano se forma a la vez en el embrión, a partir de dos brotes que se fusionan."]}},

    {id:"cuerpo", nombre:"Cuerpo", capa:"glandula", color:"#C07F46", pos:[0.25,0.68,-0.12], lbl:[0.90,2.20,-0.10],
      n1:"La porción larga y algo triangular que cruza la línea media, por delante de la columna y por detrás del estómago.",
      n2:"Está pegada a la pared posterior del abdomen, fuera del saco peritoneal (es retroperitoneal): por eso no cuelga ni se mueve con la respiración como el intestino. Su superficie no es lisa sino granulosa, dividida en lobulillos que se palpan como pequeñas uvas.",
      n3:"Al estar fijo contra la columna, un golpe fuerte en el abdomen (el manillar de una bicicleta, el cinturón en un choque) puede aplastar el cuerpo del páncreas contra la vértebra L2 y romperlo. Es una de las causas de pancreatitis traumática en adolescentes.",
      dato:"Es retroperitoneal: está pegado a la pared de atrás, no flota en el abdomen.",
      conecta:["cuello","cola","wirsung"], temas:["Anatomía abdominal","Traumatismos"],
      quiz:{q:"¿Qué significa que el páncreas sea retroperitoneal?", ops:["Que está dentro del estómago","Que está fijo contra la pared posterior del abdomen, por detrás del peritoneo","Que no tiene irrigación propia"], ok:1,
        fb:"Por eso no se desplaza y por eso un golpe puede aplastarlo contra la columna.",
        wrong:["No está dentro de ningún otro órgano: el estómago se apoya por delante de él.","Está muy bien irrigado: recibe sangre de las arterias del tronco celíaco y de la mesentérica superior."]}},

    {id:"cola", nombre:"Cola", capa:"glandula", color:"#C98A50", pos:[2.55,1.18,-0.40], lbl:[3.44,2.5,-0.96],
      n1:"El extremo afilado del páncreas, el único que se mueve, y que llega a tocar el bazo.",
      n2:"Viaja dentro de un repliegue (el ligamento esplenorrenal) junto a los vasos esplénicos, lo que la hace móvil a diferencia del resto del órgano. Es la zona más rica en islotes de Langerhans.",
      n3:"Esa vecindad con el bazo tiene consecuencias: al extirpar el bazo se puede lesionar la cola, y al extirpar la cola muchas veces se extirpa también el bazo. Como concentra islotes, en los trasplantes de islotes para diabetes tipo 1 es la región de donde más células beta se obtienen.",
      dato:"La cola es la zona con más islotes: más células productoras de insulina por gramo.",
      conecta:["cuerpo","bazo","islote"], temas:["Anatomía abdominal","Sistema endocrino"],
      quiz:{q:"¿Con qué órgano contacta la cola del páncreas?", ops:["Con el hígado","Con el bazo","Con el riñón derecho"], ok:1,
        fb:"La cola llega hasta el hilio del bazo acompañando a los vasos esplénicos.",
        wrong:["El hígado queda arriba y a la derecha; se relaciona con el páncreas a través de la vía biliar, no por contacto con la cola.","El riñón derecho está al otro lado; es el izquierdo el que queda por detrás de la cola."]}},

    {id:"wirsung", nombre:"Conducto pancreático principal (Wirsung)", capa:"conductos", color:"#E7D48A", pos:[-0.20,0.55,-0.05], lbl:[-0.18,2.9,-0.61],
      n1:"El tubo que recorre el páncreas de la cola a la cabeza recogiendo el jugo de toda la glándula.",
      n2:"Empieza finísimo en la cola (menos de 2 mm) y va engrosando al recibir conductos laterales, como un río que recoge afluentes: al llegar a la cabeza mide unos 4 mm, y cada día transporta 1–1,5 litros de jugo. Ese líquido no es solo enzimas: las células que tapizan los conductos le añaden agua y bicarbonato, que neutraliza el quimo ácido llegado del estómago y sube el pH del duodeno de alrededor de 2 a casi 8. Sin ese cambio las enzimas pancreáticas, que solo trabajan en medio alcalino, quedarían inservibles.",
      n3:"Su calibre es un dato diagnóstico: en la ecografía o la resonancia, un Wirsung dilatado por encima de 3–4 mm sugiere que algo lo obstruye más abajo. En la pancreatitis crónica el conducto se ve arrosariado, con estrecheces y dilataciones alternas, como un collar de cuentas.",
      dato:"Transporta entre 1 y 1,5 litros de jugo pancreático al día.",
      conecta:["santorini","ampolla","cola","acino"], temas:["Sistema digestivo","Secreción exocrina"],
      quiz:{q:"¿En qué dirección circula el jugo por el conducto de Wirsung?", ops:["De la cabeza hacia la cola","De la cola hacia la cabeza y de ahí al duodeno","Del duodeno hacia el páncreas"], ok:1,
        fb:"Recoge el jugo de toda la glándula y lo lleva hacia la cabeza, donde desemboca en el duodeno.",
        wrong:["Sería al revés: la cola es el extremo ciego, el origen; la cabeza es la salida.","Si el contenido del duodeno subiera por el conducto, las enzimas se activarían dentro del páncreas: justamente lo que el esfínter de Oddi impide."]}},

    {id:"santorini", nombre:"Conducto accesorio (Santorini)", capa:"conductos", color:"#DCCB86", pos:[-2.30,0.42,0.08], lbl:[-5.3,2.22,0.52],
      n1:"Un segundo conducto, más corto y más fino, que drena la parte alta de la cabeza en una papila propia.",
      n2:"Es un resto del desarrollo: el páncreas se forma a partir de dos brotes del intestino embrionario, uno dorsal y otro ventral, que giran y se fusionan. El Santorini es lo que queda del conducto del brote dorsal, y desemboca en la papila menor, unos 2 cm por encima de la mayor.",
      n3:"En un 5–10 % de las personas los dos brotes no fusionan sus conductos (páncreas divisum) y casi todo el jugo tiene que salir por el Santorini, que es estrecho: eso puede provocar pancreatitis de repetición sin otra causa aparente. Es una variante anatómica, no una enfermedad en sí misma.",
      dato:"Es la huella de que el páncreas se formó a partir de dos brotes que se fusionaron.",
      conecta:["wirsung","cuello","duodeno"], temas:["Embriología","Variantes anatómicas"],
      quiz:{q:"¿Qué explica la existencia de un conducto accesorio?", ops:["Que el páncreas se formó de dos brotes embrionarios distintos que se fusionaron","Que el conducto principal se rompió alguna vez","Que sirve para devolver bilis al hígado"], ok:0,
        fb:"El brote dorsal y el ventral se fusionan durante el desarrollo, y el conducto accesorio es lo que queda del dorsal.",
        wrong:["No procede de ninguna rotura: está presente desde el nacimiento en la mayoría de las personas.","La bilis nunca vuelve al hígado por aquí; baja del hígado al duodeno por la vía biliar."]}},

    {id:"ampolla", nombre:"Ampolla de Vater y vía biliar", capa:"conductos", color:"#6FA05A", pos:[-3.02,-1.10,0.10], lbl:[-4.75,-2.99,1.1], anchor:[-3.14,-1.17,0.21],
      n1:"La pequeña cavidad donde se juntan el conducto pancreático y el colédoco antes de abrirse al duodeno por la papila mayor.",
      n2:"Por el colédoco baja la bilis que fabrica el hígado y guarda la vesícula; por el Wirsung sube el jugo pancreático. Los dos se unen en la ampolla y salen juntos por un orificio de apenas 2–3 mm. Así, cuando llega comida grasa, la bilis emulsiona la grasa y la lipasa pancreática la digiere, en el mismo sitio y en el mismo momento.",
      n3:"Ese canal común tiene un precio: si un cálculo de la vesícula se atasca en la ampolla, bloquea también la salida del páncreas. El jugo se acumula a presión, las enzimas se activan dentro de la glándula y se produce una pancreatitis aguda biliar, la causa más frecuente de pancreatitis en el Ecuador y en el mundo.",
      dato:"Bilis y jugo pancreático salen por el mismo agujero, de 2 a 3 mm.",
      conecta:["wirsung","oddi","duodeno","cabeza"], temas:["Vía biliar","Digestión de grasas","Pancreatitis"],
      partes:[
        {n:"Colédoco (vía biliar)", d:"Trae la bilis desde el hígado y la vesícula; desciende por detrás de la cabeza del páncreas.", at:[-2.90,-0.25,0.18], sub:"coledoco"},
        {n:"Ampolla de Vater", d:"La cámara común donde confluyen bilis y jugo pancreático.", at:[-3.05,-1.15,0.10], sub:"ampolla"},
        {n:"Papila mayor", d:"El relieve de la pared del duodeno por el que se vierten ambos líquidos.", at:[-3.30,-1.22,0.10], sub:"papila"}
      ],
      quiz:{q:"¿Por qué un cálculo de la vesícula puede provocar una pancreatitis?", ops:["Porque el cálculo viaja hasta el páncreas y lo perfora","Porque al atascarse en la ampolla bloquea también la salida del jugo pancreático","Porque la bilis disuelve el páncreas"], ok:1,
        fb:"Al compartir la desembocadura, una piedra encajada obstruye las dos vías: el jugo queda retenido a presión y las enzimas se activan dentro de la glándula.",
        wrong:["El cálculo no atraviesa tejidos: se queda encajado en el conducto. El daño lo hace la obstrucción, no una perforación.","La bilis no digiere el páncreas. Quien lo daña es su propio jugo, cuando se activa donde no debe."]}},

    {id:"oddi", nombre:"Esfínter de Oddi", capa:"conductos", color:"#B4534A", pos:[-3.12,-1.18,0.10], lbl:[-5.2,-1.49,0.95], anchor:[-3.13,-1.19,0.28],
      n1:"El anillo de músculo liso que rodea la ampolla y decide cuándo se abre la puerta al duodeno.",
      n2:"Entre comidas permanece cerrado: la bilis no puede salir y se desvía a la vesícula, donde se concentra. Cuando llega comida —sobre todo grasa y proteína— el duodeno libera la hormona colecistoquinina, que contrae la vesícula y relaja el esfínter: bilis y jugo pancreático salen a la vez.",
      n3:"El esfínter cumple una segunda función, silenciosa pero decisiva: impide que el contenido del duodeno refluya hacia el conducto pancreático. Si lo hiciera, la enteroquinasa del duodeno activaría los precursores dentro de la glándula. Es la última de las barreras que evitan que el páncreas se digiera a sí mismo.",
      dato:"Cerrado protege al páncreas del reflujo; abierto deja pasar bilis y enzimas.",
      conecta:["ampolla","duodeno","wirsung"], temas:["Regulación hormonal","Digestión","Músculo liso"],
      quiz:{q:"Además de dejar salir el jugo, ¿qué protege el esfínter de Oddi?", ops:["Evita que el contenido del duodeno entre en el conducto pancreático","Evita que el páncreas produzca demasiada insulina","Evita que la comida llegue al estómago"], ok:0,
        fb:"El duodeno contiene enteroquinasa: si refluyera, activaría los precursores dentro del páncreas.",
        wrong:["La insulina no pasa por ningún conducto: sale directamente a la sangre desde los islotes, muy lejos de este esfínter.","El esfínter está después del estómago: la comida ya pasó por él antes de llegar aquí."]}},

    {id:"duodeno", nombre:"Duodeno", capa:"vecinos", color:"#D98C7A", pos:[-2.60,-2.15,0.05], lbl:[-3.97,-3.61,0.78],
      n1:"El primer tramo del intestino delgado, con forma de C, que abraza la cabeza del páncreas y recibe su jugo.",
      n2:"Es aquí donde el quimo ácido que sale del estómago se encuentra con el bicarbonato y las enzimas. Sus células producen dos hormonas mensajeras: la secretina (cuando detecta ácido, pide bicarbonato) y la colecistoquinina (cuando detecta grasas y proteínas, pide enzimas y bilis). El páncreas no adivina lo que comiste: el duodeno se lo avisa.",
      n3:"El duodeno fabrica además la enteroquinasa, la enzima anclada a su pared que activa el tripsinógeno y desencadena en cascada la activación de todas las demás proteasas. Al estar fuera del páncreas, garantiza que la digestión de proteínas solo empiece aquí. Es una solución elegante: la llave y la cerradura viven en habitaciones distintas.",
      dato:"La enteroquinasa que activa las enzimas está en el duodeno, no en el páncreas.",
      conecta:["ampolla","oddi","cabeza","santorini"], temas:["Sistema digestivo","Hormonas digestivas","Activación enzimática"],
      quiz:{q:"¿Cómo sabe el páncreas que debe enviar bicarbonato?", ops:["Porque el estómago se lo ordena por un nervio exclusivo","Porque el duodeno detecta el ácido y libera secretina a la sangre","Porque el páncreas mide el pH de la sangre"], ok:1,
        fb:"La secretina es el mensajero: viaja por la sangre y ordena a las células de los conductos que secreten bicarbonato.",
        wrong:["El nervio vago influye, pero la señal principal ante el ácido es hormonal, no nerviosa, y nace en el duodeno.","La sangre mantiene su pH casi constante; lo que cambia es el pH del duodeno, y ahí es donde está el sensor."]}},

    {id:"bazo", nombre:"Bazo", capa:"vecinos", color:"#7B3550", pos:[3.70,1.40,-0.55], lbl:[5.27,1.88,-1.11],
      n1:"Órgano del sistema inmunitario y de la sangre situado a la izquierda, en contacto con la cola del páncreas.",
      n2:"No forma parte del sistema digestivo: filtra la sangre, retira los glóbulos rojos viejos y alberga linfocitos. Está aquí porque comparte con la cola del páncreas los vasos esplénicos, que corren a lo largo del borde superior de la glándula.",
      n3:"Esa arteria esplénica que discurre pegada al páncreas explica una complicación de la pancreatitis crónica: la inflamación puede trombosar la vena esplénica y provocar várices en el estómago. Y al revés, un pseudoquiste pancreático puede erosionar la arteria. Vecindad estrecha, consecuencias compartidas.",
      dato:"El bazo no digiere nada: está aquí solo como referencia anatómica de la cola.",
      conecta:["cola"], temas:["Anatomía abdominal","Sistema inmunitario"],
      quiz:{q:"¿Qué relación tiene el bazo con el páncreas?", ops:["Le envía enzimas digestivas","Es su vecino: comparte con la cola los vasos esplénicos","Almacena la insulina que produce el páncreas"], ok:1,
        fb:"La arteria y la vena esplénicas recorren el borde superior del páncreas hasta el bazo.",
        wrong:["El bazo no produce ninguna enzima digestiva: filtra sangre y alberga células de defensa.","La insulina no se almacena fuera del páncreas: se libera a la sangre y actúa en minutos."]}},

    {id:"acino", nombre:"Acino exocrino y conductillo", capa:"lupa", color:"#9C4F87", pos:[0.97,-2.65,1.05], lbl:[-1.58,-3.51,1.99],
      n1:"El racimo de células que fabrica las enzimas digestivas y las vierte al conductillo. Es el 98 % del peso del páncreas.",
      n2:"Cada célula acinar es una fábrica de proteínas: su mitad basal está llena de retículo endoplásmico rugoso (por eso se tiñe de morado) y su mitad apical, de gránulos de zimógeno que se vacían por exocitosis hacia el centro del racimo. El jugo lleva tres familias de enzimas: amilasa (rompe el almidón), lipasa (rompe las grasas) y proteasas (rompen las proteínas). La amilasa y la lipasa salen ya activas, porque no pueden dañar al páncreas; las proteasas no: salen como precursores inactivos, porque una proteasa suelta dentro de la glándula la destruiría.",
      n3:"Las enzimas salen como precursores inactivos —tripsinógeno, quimotripsinógeno, procarboxipeptidasa, prolipasa— y además la célula fabrica un inhibidor de la tripsina que neutraliza cualquier molécula que se active por accidente. Si esas defensas fallan, la tripsina activa al resto en cascada y el órgano empieza a digerirse: eso es la pancreatitis aguda, y duele en la boca del estómago irradiando a la espalda.",
      dato:"Una célula acinar renueva casi todo su contenido de proteína cada día: es la célula que más proteína fabrica del cuerpo.",
      conecta:["wirsung","islote","duodeno"], temas:["Célula secretora","Enzimas digestivas","Pancreatitis"],
      partes:[
        {n:"Células acinares", d:"Células piramidales dispuestas en racimo, con el núcleo en la base y los gránulos en el ápice.", at:[0.97,-2.47,1.05], sub:"acinares"},
        {n:"Gránulos de zimógeno", d:"Las vesículas naranjas cargadas de enzimas inactivas, listas para vaciarse al lumen.", at:[0.97,-2.65,1.18], sub:"zimogenos"},
        {n:"Conductillo y células centroacinares", d:"El tubo de salida. Sus células añaden agua y bicarbonato al jugo.", at:[1.50,-2.83,1.02], sub:"conductillo"}
      ],
      quiz:{q:"¿Por qué el páncreas no se digiere a sí mismo si fabrica proteasas?", ops:["Porque sus células están recubiertas de una capa de grasa","Porque las enzimas se fabrican inactivas y solo se activan en el duodeno","Porque las proteasas solo digieren proteínas de la comida, no las propias"], ok:1,
        fb:"El tripsinógeno se convierte en tripsina únicamente cuando la enteroquinasa del duodeno lo corta; además, la propia célula fabrica un inhibidor por si alguna se activa antes de tiempo.",
        wrong:["No hay ninguna capa de grasa protectora: lo que protege es el estado inactivo de las enzimas y el inhibidor de la tripsina.","Una proteasa no distingue el origen de la proteína: digiere cualquiera. Por eso el control está en cuándo se activa, no en qué digiere."]}},

    {id:"islote", nombre:"Islote de Langerhans", capa:"lupa", color:"#1E63B0", pos:[2.15,-2.93,0.98], lbl:[4.77,-3.21,0.74], anchor:[2.21,-2.85,1.39],
      n1:"Un grupo compacto de células hormonales, sin ningún conducto, incrustado entre los acinos como una isla en un mar.",
      n2:"Un páncreas tiene alrededor de un millón de islotes, que juntos pesan solo 1–2 gramos. Cada islote reúne cuatro poblaciones: células beta (insulina, ~60 %), alfa (glucagón, ~25 %), delta (somatostatina, ~10 %) y PP (polipéptido pancreático, ~5 %). Ninguna tiene conducto: vierten sus hormonas directamente a los capilares que atraviesan el islote.",
      n3:"El islote funciona como un pequeño comité: la somatostatina de las células delta frena a la vez a las beta y a las alfa, y el orden en que la sangre recorre el islote hace que cada célula «escuche» lo que acaban de secretar sus vecinas. Además, no todos los islotes se parecen: en el ser humano las células beta y alfa están entremezcladas, mientras que en el ratón las beta forman un núcleo compacto rodeado de alfa. Por eso no todo lo que se descubre en ratones se traslada sin más a las personas.",
      dato:"Los islotes son el 1–2 % del páncreas, pero reciben el 15 % de su sangre.",
      conecta:["celulas-beta","capilares-islote","acino","cola"], temas:["Sistema endocrino","Homeostasis","Diabetes"],
      partes:[
        {n:"Células alfa (glucagón)", d:"En la periferia del islote. Liberan glucagón cuando la glucemia baja: ordenan al hígado sacar glucosa.", at:[2.52,-2.75,1.10], sub:"alfa"},
        {n:"Células delta (somatostatina)", d:"Dispersas entre las anteriores. Su hormona frena a las dos: es el freno del sistema.", at:[1.82,-3.18,1.12], sub:"delta"},
        {n:"Células PP", d:"Las menos abundantes. Su polipéptido pancreático modera la secreción exocrina y el apetito.", at:[2.36,-3.25,0.90], sub:"pp"}
      ],
      quiz:{q:"En un islote, ¿qué células liberan la hormona que hace bajar la glucosa en sangre?", ops:["Las células alfa","Las células beta","Las células delta"], ok:1,
        fb:"Las beta liberan insulina, que ordena a músculo, hígado y grasa retirar glucosa de la sangre y guardarla.",
        wrong:["Las alfa hacen lo contrario: liberan glucagón cuando la glucosa baja, para que el hígado la devuelva a la sangre.","Las delta liberan somatostatina, que frena a las otras dos; no retira glucosa por sí misma."]}},

    {id:"celulas-beta", nombre:"Células beta (insulina)", capa:"lupa", color:"#1E63B0", pos:[2.15,-2.93,0.98], lbl:[4.58,-2.81,0.25],
      n1:"Las células más numerosas del islote: miden la glucosa de la sangre y, cuando sube, liberan insulina.",
      n2:"Son sensor y efector a la vez: dejan entrar glucosa, la queman, y el ATP que producen cierra un canal de potasio; la célula se despolariza, entra calcio y se vacían las vesículas de insulina. Todo en segundos y sin intermediarios. La insulina ordena al músculo, al hígado y al tejido graso retirar glucosa de la sangre y guardarla; el glucagón de las células alfa ordena lo contrario. Esa pareja de señales opuestas es el ejemplo más claro de retroalimentación negativa del cuerpo: la curva completa tras una comida puedes recorrerla en el simulador de glucemia enlazado arriba.",
      n3:"La diabetes tipo 1 y la tipo 2 no son grados de lo mismo. En la tipo 1 el sistema inmunitario destruye las células beta: no hay insulina, y ponerla desde el diagnóstico es imprescindible; suele aparecer en la infancia o la adolescencia y no la causa lo que la persona comió. En la tipo 2 sí hay insulina —al principio incluso más de lo normal—, pero el músculo, el hígado y la grasa responden poco a ella (resistencia a la insulina) y con los años la célula beta se agota; influyen la genética, la edad, el sedentarismo y el entorno alimentario, no la falta de voluntad. En el Ecuador el INEC ubica año tras año a la diabetes mellitus entre las primeras causas de muerte, y lo que más ayuda es lo que está al alcance: moverse alrededor de 150 minutos por semana, cambiar las bebidas azucaradas por agua, apoyarse en alimentos locales como el chocho, la quinua, el fréjol y la fruta entera en vez de en jugos, y hacerse una glucosa en ayunas si hay antecedentes familiares, porque la tipo 2 puede pasar años sin dar ningún síntoma.",
      dato:"En la tipo 1 falta la señal; en la tipo 2 falla quien la escucha.",
      conecta:["islote","capilares-islote","acino"], temas:["Sistema endocrino","Homeostasis","Diabetes","Salud en el Ecuador"],
      quiz:{q:"¿En qué se diferencian de verdad la diabetes tipo 1 y la tipo 2?", ops:[
          "En la tipo 1 no hay insulina porque las células beta fueron destruidas; en la tipo 2 hay insulina, pero las células del cuerpo responden poco a ella",
          "La tipo 1 aparece por comer mucha azúcar y la tipo 2 se hereda",
          "La tipo 2 es la misma enfermedad que la tipo 1, solo que más avanzada"], ok:0,
        fb:"Falla la señal en un caso y quien la escucha en el otro. Por eso el tratamiento es distinto: en la tipo 1 la insulina es imprescindible desde el principio; en la tipo 2 se empieza por la actividad física, la alimentación y medicamentos que mejoran la respuesta a la insulina.",
        wrong:["Ninguna de las dos se produce por comer azúcar. La tipo 1 es autoinmunitaria y nadie la provoca con su dieta; la tipo 2 tiene varias causas a la vez y, curiosamente, su componente hereditario es mayor que el de la tipo 1.",
               "Son mecanismos distintos, no etapas de una misma enfermedad. Una persona con tipo 2 de muchos años puede llegar a necesitar insulina porque su célula beta se agotó, y aun así sigue siendo tipo 2."]}},

    {id:"capilares-islote", nombre:"Capilares del islote", capa:"lupa", color:"#8E140F", pos:[2.20,-2.78,1.05], lbl:[3.74,-4.27,0.92], anchor:[2.19,-2.83,1.03],
      n1:"La red de vasos finísimos que atraviesa cada islote y por la que salen las hormonas hacia todo el cuerpo.",
      n2:"Son capilares fenestrados: su pared tiene poros, hasta diez veces más permeables que un capilar normal, para que la insulina alcance la sangre en segundos. La sangre entra por el centro del islote, donde están las beta, y sale por la periferia, donde están las alfa: así el glucagón nunca se libera sin que las células alfa hayan 'olido' primero cuánta insulina hay.",
      n3:"Toda esa sangre va a parar a la vena porta: la insulina pasa primero por el hígado, que retira la mitad antes de que llegue al resto del cuerpo. Por eso el hígado es el primer destinatario de la orden de guardar glucosa, y por eso la insulina inyectada en el brazo no reproduce exactamente lo que hace el páncreas.",
      dato:"La insulina llega al hígado antes que a ningún otro órgano.",
      conecta:["islote","celulas-beta","cola"], temas:["Circulación","Sistema endocrino","Homeostasis"],
      quiz:{q:"¿Por dónde salen del páncreas la insulina y el glucagón?", ops:["Por el conducto de Wirsung, junto con las enzimas","Por los capilares del islote, directamente a la sangre","Por la vía biliar, junto con la bilis"], ok:1,
        fb:"Son hormonas: no usan ningún conducto. Esa es exactamente la diferencia entre endocrino y exocrino.",
        wrong:["Por el Wirsung sale el jugo con las enzimas. Si la insulina saliera por ahí, iría al intestino y se digeriría, no llegaría a las células.","La vía biliar trae bilis desde el hígado hacia el intestino; ninguna hormona pancreática pasa por ella."]}}
  ],
  guiada:[
    {tipo:"select", txt:"Empieza por el principio del recorrido: selecciona la <b>cola</b>, el extremo del páncreas que toca el bazo.", target:"cola"},
    {tipo:"select", txt:"Ahora sigue el tubo que recoge el jugo de toda la glándula. Selecciona el <b>conducto principal</b>. Pista: baja la transparencia de la glándula en la pestaña Capas para verlo por dentro.", target:"wirsung"},
    {tipo:"select", txt:"Localiza el punto donde el conducto pancreático y la vía biliar se juntan antes de entrar al intestino: la <b>ampolla</b>.", target:"ampolla"},
    {tipo:"anim", txt:"Activa la animación <b>Secreción exocrina</b> y fíjate en el momento exacto en que las enzimas cambian de color. ¿Dónde ocurre?", target:"exocrina"},
    {tipo:"select", txt:"Entra en la lupa: selecciona el <b>acino</b>, el racimo de células que fabrica esas enzimas.", target:"acino"},
    {tipo:"select", txt:"En la misma lupa, selecciona el <b>islote</b>: la estructura que no tiene conducto y vierte sus hormonas directamente a la sangre.", target:"islote"},
    {tipo:"select", txt:"Dentro del islote, selecciona las células que fabrican la <b>insulina</b>.", target:"celulas-beta"},
    {tipo:"anim", txt:"Activa <b>Regulación de la glucosa</b> y observa qué células se encienden cuando la glucemia sube y cuáles cuando baja.", target:"endocrina"},
    {tipo:"text", txt:"Explica con tus palabras por qué se dice que el páncreas es una glándula mixta, y por qué normalmente no se digiere a sí mismo. Menciona el acino, el islote, el conducto y el duodeno. Tu respuesta se guardará en el cuaderno."}
  ]
};

Object.assign(BIO.activities, {
  "explorar-pancreas":{t:"Explorar el páncreas", unidad:6, peso:15, xp:60},
  "guiada-pancreas":{t:"Exploración guiada del páncreas", unidad:6, peso:10, xp:80},
  "reto-pancreas":{t:"Reto del páncreas: exocrino y endocrino", unidad:6, peso:10, xp:70}
});

/* =====================================================================
   MODELO 3D
   ===================================================================== */
function buildPancreas(E){
  orgvFrame(E, 1.42);
  const low = E.low, D = BIO.pancreas;
  const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const CEN = new THREE.Vector3(0,-0.2,0);
  const add = (id, meshes, extra={}) => { const s = S[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, explodeDir:V3(s.pos).sub(CEN).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl); return p; };
  const RND = Kit.rng(17);

  /* ---------- eje longitudinal de la glándula: cabeza → cola ---------- */
  const AX = Kit.curve([[-2.30,-1.25,0.10],[-2.40,-0.45,0.10],[-2.05,0.20,0.05],[-1.30,0.45,0.00],
                        [-0.35,0.58,-0.08],[0.85,0.80,-0.18],[2.00,1.05,-0.32],[2.95,1.30,-0.45]]);
  const RP = [[0,0.58],[0.07,0.84],[0.18,0.88],[0.27,0.64],[0.34,0.40],[0.41,0.38],[0.52,0.50],[0.66,0.52],[0.80,0.43],[0.91,0.29],[1,0.13]];
  const PR = u => { u = u<0?0:u>1?1:u; for (let i=1;i<RP.length;i++){ if (u<=RP[i][0]){ const a=RP[i-1], b=RP[i]; const t=(u-a[0])/((b[0]-a[0])||1); return a[1]+(b[1]-a[1])*t; } } return RP[RP.length-1][1]; };
  const axPts = (u0,u1,n) => { const a=[]; for (let i=0;i<=n;i++) a.push(AX.getPointAt(u0+(u1-u0)*i/n)); return a; };
  /* glándula lobulillada, color crema rosado, con brillo discreto de la cápsula */
  const glandMat = c => orgvTex.mat({ color:c, tex:'gland', rep:[5,2], bump:0.03, rough:0.58, coat:0.4, coatRough:0.3, env:0.75 });
  const segMesh = (u0,u1,mat,sub,seed) => { const g = Kit.taper(axPts(u0,u1, low?8:14), 0, 0,
      { rfn: t => PR(u0+(u1-u0)*t), seg: low?16:30, rad: low?12:20, bumpy:0.055, bf:11, seed });
    const m = new THREE.Mesh(g, mat); if (sub) m.userData.sub = sub; return m; };
  const capSphere = (u, mat, sub) => { const p = AX.getPointAt(u); const g = new THREE.SphereGeometry(PR(u)*0.99, low?14:22, low?10:16); g.translate(p.x,p.y,p.z); const m = new THREE.Mesh(g, mat); if (sub) m.userData.sub = sub; return m; };

  const mCabeza = glandMat(0xF2E2D6), mCuello = glandMat(0xEADACD), mCuerpo = glandMat(0xFFF4EA), mCola = glandMat(0xFFF8F0);

  /* cabeza + proceso unciforme */
  const unc = new THREE.Mesh(Kit.sculpt({ radii:[0.60,0.40,0.44], w: low?26:40, h: low?20:30,
      disp:(p)=>0.03*Kit.fbm(p.x*5+3,p.y*5,p.z*5,3) }), mCabeza);
  unc.position.set(-1.48,-1.28,-0.24); unc.rotation.set(0.15,0,-0.45); unc.userData.sub='unciforme';
  add('cabeza', [segMesh(0,0.29,mCabeza,'cabeza',3), capSphere(0.004,mCabeza,'cabeza'), unc]);
  add('cuello', [segMesh(0.27,0.42,mCuello,null,7)]);
  add('cuerpo', [segMesh(0.40,0.79,mCuerpo,null,11)]);
  add('cola',   [segMesh(0.77,1,mCola,null,15), capSphere(0.997,mCola,null)]);

  /* ---------- duodeno en C ---------- */
  const duoPts = [[-1.55,1.45,0.20],[-2.75,1.32,0.20],[-3.45,0.58,0.15],[-3.58,-0.55,0.12],
                  [-3.28,-1.68,0.08],[-2.38,-2.22,0.05],[-1.30,-2.18,-0.02],[-0.55,-1.60,-0.10]];
  const duo = new THREE.Mesh(Kit.taper(duoPts, 0, 0, { rfn:u => 0.40 - 0.07*u, seg: low?26:52, rad: low?12:18, bumpy:0.05, bf:26, seed:5 }),
    orgvTex.mat({ tex:'serosa', rep:[6,2], bump:0.02, rough:0.52, coat:0.55, coatRough:0.24, env:0.8 }));
  duo.userData.sub = 'duodeno';
  add('duodeno', [duo]);

  /* ---------- bazo ---------- */
  const spl = new THREE.Mesh(Kit.sculpt({ radii:[0.86,0.64,0.56], w: low?32:52, h: low?24:38,
      disp:(p,d)=> -0.14*Math.exp(-((p.x+0.45)*(p.x+0.45)/0.14 + p.y*p.y/0.5)) + 0.02*Kit.fbm(p.x*4,p.y*4,p.z*4,3) }),
    orgvTex.mat({ color:orgvTex.lin(0x74303F), rough:0.42, coat:0.8, coatRough:0.18, env:0.85 }));
  spl.position.set(3.70,1.40,-0.55); spl.rotation.set(0,0,-0.3);
  add('bazo', [spl]);

  /* ---------- conductos ---------- */
  const AMP = new THREE.Vector3(-3.05,-1.15,0.10);
  const wirPts = [[2.85,1.26,-0.42],[1.90,1.02,-0.30],[0.80,0.78,-0.16],[-0.35,0.56,-0.06],[-1.30,0.42,0.02],
                  [-1.95,0.12,0.06],[-2.25,-0.35,0.08],[-2.48,-0.82,0.08],[-2.80,-1.08,0.09],[AMP.x,AMP.y,AMP.z]];
  const ductMat = Kit.tissue({ color:0xE7D48A, rough:0.3, coat:0.8, coatRough:0.16 });
  const wir = new THREE.Mesh(Kit.taper(wirPts, 0, 0, { rfn:u => 0.055 + 0.075*u, seg: low?30:60, rad: low?8:12 }), ductMat);
  const lateral = [];
  for (let i=0;i<8;i++){ const u = 0.12 + i*0.095; const p = Kit.curve(wirPts).getPointAt(u);
    const sg = i%2 ? 1 : -1; const end = p.clone().add(new THREE.Vector3(0.10*sg, 0.34*sg, -0.18*sg));
    lateral.push(Kit.taper([p, p.clone().lerp(end,0.55).add(new THREE.Vector3(0.05,0,0.05)), end], 0.035, 0.018, { seg:8, rad:6 })); }
  const wirLat = new THREE.Mesh(Kit.merge(lateral), ductMat); wirLat.userData.sub='ramas'; wir.userData.sub='principal';
  add('wirsung', [wir, wirLat]);

  const san = new THREE.Mesh(Kit.taper([[-1.35,0.45,0.02],[-1.95,0.58,0.05],[-2.55,0.46,0.08],[-3.16,0.08,0.11]], 0.05, 0.042, { seg: low?14:26, rad: low?7:10 }),
    Kit.tissue({ color:0xDCCB86, rough:0.32, coat:0.75 }));
  add('santorini', [san]);

  const bileMat = Kit.tissue({ color:0x6FA05A, rough:0.3, coat:0.8, coatRough:0.18 });
  const bile = new THREE.Mesh(Kit.taper([[-2.30,2.35,0.55],[-2.55,1.55,0.40],[-2.75,0.65,0.28],[-2.92,-0.25,0.18],[-3.00,-0.85,0.12],[AMP.x,AMP.y,AMP.z]],
    0.105, 0.085, { seg: low?20:38, rad: low?8:12 }), bileMat); bile.userData.sub='coledoco';
  const ampG = new THREE.SphereGeometry(0.145, low?14:20, low?10:14); ampG.scale(1.25,0.9,0.9); ampG.translate(AMP.x,AMP.y,AMP.z);
  const ampM = new THREE.Mesh(ampG, Kit.tissue({ color:0xC9B96A, rough:0.34, coat:0.7 })); ampM.userData.sub='ampolla';
  const pap = new THREE.Mesh(Kit.taper([[AMP.x,AMP.y,AMP.z],[-3.22,-1.20,0.10],[-3.36,-1.24,0.10]], 0.12, 0.055, { seg:10, rad:10 }),
    Kit.tissue({ color:0xD88E76, rough:0.5, coat:0.4 })); pap.userData.sub='papila';
  add('ampolla', [bile, ampM, pap]);

  const oddiDir = new THREE.Vector3(-1,-0.22,0).normalize();
  const oddiQ = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1), oddiDir);
  const oddiG = [];
  [0.0,0.10].forEach((k,i) => { const g = new THREE.TorusGeometry(0.175 - i*0.03, 0.05, low?7:9, low?16:26);
    g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(oddiQ));
    const c = AMP.clone().addScaledVector(oddiDir, 0.13 + k); g.translate(c.x,c.y,c.z); oddiG.push(g); });
  add('oddi', [new THREE.Mesh(Kit.merge(oddiG), Kit.tissue({ color:0xB4534A, rough:0.5, coat:0.4 }))]);

  /* =====================================================================
     LUPA: tejido pancreático a escala microscópica
     ===================================================================== */
  const LC = new THREE.Vector3(1.55,-2.85,1.00);
  const ringMat = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:false });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.026, 8, low?40:64), ringMat);
  ring.position.copy(LC); ring.lookAt(LC.clone().add(new THREE.Vector3(0.18,0.12,1)));
  const leadTo = new THREE.Vector3(0.45,0.30,0.05);
  const ldir = leadTo.clone().sub(LC).normalize();
  const lead = new THREE.Mesh(Kit.taper([LC.clone().addScaledVector(ldir,1.18), leadTo], 0.013, 0.013, { seg:4, rad:6 }), ringMat);
  E.scene.add(ring, lead);

  /* --- acino exocrino --- */
  const AC = V3(S.acino.pos);
  const acinarMat = Kit.tissue({ color:0x9C4F87, rough:0.66, coat:0.08, coatRough:0.5, env:0.45 });
  const zymMat = Kit.tissue({ color:0xE07B10, rough:0.5, coat:0.15, env:0.5 });
  const cellG = [], zymG = [], acCenters = [];
  for (let i=0;i<8;i++){
    const a = i/8*Math.PI*2, tilt = (i%2 ? 1 : -1) * 0.30;
    const dir = new THREE.Vector3(Math.cos(a)*0.95, Math.sin(a)*0.95, tilt).normalize();
    const c = AC.clone().addScaledVector(dir, 0.245); acCenters.push({ c, dir });
    const g = new THREE.SphereGeometry(1, low?14:20, low?10:15);
    const pos = g.attributes.position;
    for (let k=0;k<pos.count;k++){ const x=pos.getX(k), y=pos.getY(k), z=pos.getZ(k);
      const s = 0.170*(0.72 + 0.55*(0.5 - 0.5*(x*dir.x+y*dir.y+z*dir.z)));  /* estrecha hacia el lumen */
      pos.setXYZ(k, x*s*1.05, y*s*1.05, z*s*1.05); }
    g.computeVertexNormals(); g.translate(c.x,c.y,c.z); cellG.push(g);
    for (let j=0;j<3;j++){ const off = new THREE.Vector3(RND()-0.5, RND()-0.5, RND()-0.5).multiplyScalar(0.085);
      const zc = c.clone().addScaledVector(dir, -0.090).add(off);
      const zg = new THREE.SphereGeometry(0.033, 7, 6); zg.translate(zc.x,zc.y,zc.z); zymG.push(zg); }
  }
  const acCells = new THREE.Mesh(Kit.merge(cellG), acinarMat); acCells.userData.sub='acinares';
  const acZym = new THREE.Mesh(Kit.merge(zymG), zymMat); acZym.userData.sub='zimogenos';
  const lumen = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 10), Kit.tissue({ color:0xF0DCA8, rough:0.5, coat:0.15, env:0.5 }));
  lumen.position.copy(AC); lumen.userData.sub='conductillo';
  const ductlPts = [AC.clone(), AC.clone().add(new THREE.Vector3(0.34,-0.14,-0.02)), AC.clone().add(new THREE.Vector3(0.70,-0.26,-0.06))];
  const ductl = new THREE.Mesh(Kit.taper(ductlPts, 0.062, 0.085, { seg:12, rad:10 }), Kit.tissue({ color:0xD9C06A, rough:0.55, coat:0.12, env:0.5 }));
  ductl.userData.sub='conductillo';
  add('acino', [acCells, acZym, lumen, ductl], { explodeDir:new THREE.Vector3(-0.8,-0.3,0.5).normalize() });

  /* --- islote de Langerhans --- */
  const IC = V3(S.islote.pos);
  const CELLTYPE = [
    { sub:'beta',  n:22, col:0x1E63B0, rmin:0.00, rmax:0.32 },
    { sub:'alfa',  n:10, col:0xCB4415, rmin:0.32, rmax:0.52 },
    { sub:'delta', n:5,  col:0x6B3FA8, rmin:0.22, rmax:0.48 },
    { sub:'pp',    n:3,  col:0x2A8055, rmin:0.30, rmax:0.50 }
  ];
  const betaPos = [], alfaPos = [], isletMeshes = [], byType = {};
  CELLTYPE.forEach(T => {
    const gs = [];
    for (let i=0;i<T.n;i++){
      const th = Math.acos(2*RND()-1), ph = RND()*Math.PI*2;
      const rr = T.rmin + (T.rmax-T.rmin)*Math.cbrt(RND());
      const c = IC.clone().add(new THREE.Vector3(Math.sin(th)*Math.cos(ph)*rr, Math.sin(th)*Math.sin(ph)*rr*0.9, Math.cos(th)*rr*0.9));
      if (T.sub==='beta') betaPos.push(c); if (T.sub==='alfa') alfaPos.push(c);
      const g = new THREE.SphereGeometry(0.102, low?10:14, low?8:10); g.translate(c.x,c.y,c.z); gs.push(g);
    }
    const m = new THREE.Mesh(Kit.merge(gs), Kit.tissue({ color:T.col, rough:0.62, coat:0.06, coatRough:0.5, env:0.4 }));
    m.userData.sub = T.sub; m.userData.glow = T.col; isletMeshes.push(m); byType[T.sub] = m;
  });
  add('islote', [byType.alfa, byType.delta, byType.pp], { explodeDir:new THREE.Vector3(0.7,-0.3,0.6).normalize() });
  add('celulas-beta', [byType.beta], { explodeDir:new THREE.Vector3(0.4,-0.6,0.7).normalize() });

  /* --- capilares fenestrados del islote --- */
  const capPts = [IC.clone().add(new THREE.Vector3(-0.92,0.34,0.16)), IC.clone().add(new THREE.Vector3(-0.42,0.12,0.08)),
                  IC.clone().add(new THREE.Vector3(-0.08,-0.06,-0.04)), IC.clone().add(new THREE.Vector3(0.26,0.10,0.06)),
                  IC.clone().add(new THREE.Vector3(0.58,-0.14,-0.02)), IC.clone().add(new THREE.Vector3(1.00,-0.34,0.10))];
  const capCurve = Kit.curve(capPts);
  const capMat = Kit.tissue({ color:0x8E140F, rough:0.6, coat:0.08, coatRough:0.5, env:0.4 });
  const capGeos = [Kit.taper(capPts, 0.062, 0.054, { seg: low?16:30, rad: low?7:10 })];
  for (let k=0;k<4;k++){ const u0 = 0.28 + k*0.13; const a = capCurve.getPointAt(u0), b = capCurve.getPointAt(Math.min(0.96,u0+0.16));
    const off = new THREE.Vector3((k%2?1:-1)*0.26, (k<2?1:-1)*0.24, 0.12*(k%2?1:-1));
    capGeos.push(Kit.taper([a, a.clone().lerp(b,0.5).add(off), b], 0.028, 0.028, { seg:10, rad:6 })); }
  add('capilares-islote', [new THREE.Mesh(Kit.merge(capGeos), capMat)], { explodeDir:new THREE.Vector3(0.9,0.1,0.4).normalize() });

  /* =====================================================================
     ANIMACIONES
     ===================================================================== */
  /* --- 1. secreción exocrina: del acino al duodeno, con activación --- */
  const jPts = [[2.85,1.26,-0.42],[1.90,1.02,-0.30],[0.80,0.78,-0.16],[-0.35,0.56,-0.06],[-1.30,0.42,0.02],
                [-1.95,0.12,0.06],[-2.25,-0.35,0.08],[-2.48,-0.82,0.08],[-2.80,-1.08,0.09],[-3.05,-1.15,0.10],
                [-3.32,-1.23,0.10],[-3.42,-1.62,0.08],[-3.18,-2.05,0.06],[-2.55,-2.28,0.04],[-1.80,-2.24,0.00]];
  const jCurve = Kit.curve(jPts);
  let uAct = 0.78; { let best = 1e9; const tip = new THREE.Vector3(-3.32,-1.23,0.10);
    for (let i=0;i<=240;i++){ const u=i/240; const d = jCurve.getPointAt(u).distanceTo(tip); if (d<best){ best=d; uAct=u; } } }
  const pMat = c => new THREE.MeshBasicMaterial({ color:c, toneMapped:false, depthTest:false });
  const inactMat = pMat(0x7C858F), actMat = pMat(0xE9761B), bicMat = pMat(0x2C9CD1);
  const exo = { on:false, speed:1, enz:[], bic:[], zym:[] };
  const pG = new THREE.SphereGeometry(0.072, 8, 6), pGs = new THREE.SphereGeometry(0.052, 7, 6);
  const onTop = m => { m.renderOrder = 14; return m; };
  for (let i=0;i<14;i++){ const m = onTop(new THREE.Mesh(pG, inactMat)); m.userData.t = i/14; m.visible=false; E.scene.add(m); exo.enz.push(m); }
  for (let i=0;i<8;i++){ const m = onTop(new THREE.Mesh(pGs, bicMat)); m.userData.t = i/8 + 0.04; m.visible=false; E.scene.add(m); exo.bic.push(m); }
  /* gránulos vaciándose dentro del acino (lupa) */
  acCenters.forEach((a,i) => { const m = onTop(new THREE.Mesh(new THREE.SphereGeometry(0.040,7,6), actMat)); m.userData = { from:a.c.clone().addScaledVector(a.dir,-0.05), to:AC.clone(), off:i/acCenters.length };
    m.visible=false; E.scene.add(m); exo.zym.push(m); });

  /* --- 2. regulación de la glucosa: insulina y glucagón --- */
  const gluMat = pMat(0x3F9E4A), insMat = pMat(0x1E63B0), glgMat = pMat(0xCB4415);
  const endo = { on:false, t:0, speed:1, glu:[], horm:[] };
  for (let i=0;i<10;i++){ const m = onTop(new THREE.Mesh(new THREE.SphereGeometry(0.058,8,6), gluMat)); m.userData.t = i/10; m.visible=false; E.scene.add(m); endo.glu.push(m); }
  for (let i=0;i<12;i++){ const src = i<6 ? betaPos[i % betaPos.length] : alfaPos[i % alfaPos.length];
    const m = onTop(new THREE.Mesh(new THREE.SphereGeometry(0.050,7,6), i<6 ? insMat : glgMat));
    m.userData = { from:src.clone(), beta:i<6, off:(i%6)/6 }; m.visible=false; E.scene.add(m); endo.horm.push(m); }

  const model = {
    anims:[
      { id:'exocrina', label:'Secreción exocrina: del acino al duodeno (y dónde se activan las enzimas)',
        get on(){ return exo.on; },
        set(on){ exo.on = on; exo.enz.forEach(p=>p.visible=on); exo.bic.forEach(p=>p.visible=on); exo.zym.forEach(p=>p.visible=on);
          if (on) E.focus(new THREE.Vector3(-1.2,-0.3,0), 13); },
        needsOpacity:0.45, focus:true },
      { id:'endocrina', label:'Regulación de la glucosa: insulina y glucagón (lupa)',
        get on(){ return endo.on; },
        set(on){ endo.on = on; endo.t = 0; endo.glu.forEach(p=>p.visible=on); endo.horm.forEach(p=>p.visible=on);
          if (on) E.focus(IC.clone(), 4.2); else isletMeshes.forEach((m,i)=>{ if (m.material.emissive) m.material.emissiveIntensity = 0; }); },
        focus:true }
    ],
    setSpeed(k){ exo.speed = k; endo.speed = k; },
    phaseText(){
      if (endo.on){ const p = endo.t % 1;
        return p < 0.5
          ? 'Glucemia alta (después de comer) · las células beta liberan insulina a los capilares: músculo, hígado y grasa retiran glucosa de la sangre'
          : 'Glucemia baja (en ayunas) · las células alfa liberan glucagón: el hígado deshace su glucógeno y devuelve glucosa a la sangre'; }
      if (exo.on){ const t = exo.enz[0] ? exo.enz[0].userData.t : 0;
        return t < 0.35 ? 'Los acinos vierten zimógenos INACTIVOS al conductillo y al conducto principal'
             : t < uAct ? 'El jugo baja por el Wirsung hacia la ampolla, con bicarbonato que neutralizará el ácido'
             : 'En el duodeno la enteroquinasa activa el tripsinógeno: las enzimas (naranja) ya pueden digerir'; }
      return '';
    },
    legend:[
      { color:'#7C858F', txt:'Zimógenos inactivos (tripsinógeno, quimotripsinógeno, prolipasa)' },
      { color:'#E9761B', txt:'Enzimas activas: solo a partir del duodeno' },
      { color:'#2C9CD1', txt:'Bicarbonato: neutraliza el quimo ácido (pH 2 → pH 8)' },
      { color:'#3F9E4A', txt:'Glucosa circulando por el capilar del islote' },
      { color:'#1E63B0', txt:'Insulina (células beta): hace bajar la glucemia' },
      { color:'#CB4415', txt:'Glucagón (células alfa): hace subir la glucemia' }
    ],
    observa:'las enzimas viajan grises por todo el conducto y solo cambian a naranja cuando cruzan el esfínter de Oddi: esa es la razón por la que el páncreas no se digiere a sí mismo. En la lupa, fíjate en que el islote no tiene ningún tubo de salida: sus hormonas entran directamente al capilar rojo.'
  };

  E.onFrame((t,dt) => {
    if (!motionOK()) return;
    if (exo.on){
      exo.enz.forEach(m => { m.userData.t = (m.userData.t + dt*0.055*exo.speed) % 1;
        m.position.copy(jCurve.getPointAt(m.userData.t));
        m.material = m.userData.t >= uAct ? actMat : inactMat;
        m.scale.setScalar(m.userData.t >= uAct ? 1.15 : 1); });
      exo.bic.forEach(m => { m.userData.t = (m.userData.t + dt*0.055*exo.speed) % 1; m.position.copy(jCurve.getPointAt(m.userData.t)); });
      exo.zym.forEach(m => { const k = ((t*0.32*exo.speed + m.userData.off) % 1); m.position.lerpVectors(m.userData.from, m.userData.to, k); m.scale.setScalar(0.7+0.5*Math.sin(k*Math.PI)); });
    }
    if (endo.on){
      endo.t += dt*0.10*endo.speed; const p = endo.t % 1, beta = p < 0.5;
      endo.glu.forEach(m => { m.userData.t = (m.userData.t + dt*0.14*endo.speed) % 1; m.position.copy(capCurve.getPointAt(m.userData.t));
        m.scale.setScalar(beta ? 1.25 : 0.65); });
      endo.horm.forEach(m => { const active = m.userData.beta === beta;
        m.visible = active; if (!active) return;
        const k = ((t*0.5*endo.speed + m.userData.off) % 1);
        const dest = capCurve.getPointAt(0.30 + 0.4*m.userData.off);
        m.position.lerpVectors(m.userData.from, dest, k); m.scale.setScalar(0.6+0.7*Math.sin(k*Math.PI)); });
      isletMeshes.forEach(m => { if (!m.material.emissive) return;
        const isBeta = m.userData.sub === 'beta', isAlfa = m.userData.sub === 'alfa';
        const glow = (isBeta && beta) || (isAlfa && !beta);
        m.material.emissive.set(glow ? (m.userData.glow || 0xffffff) : 0x000000);
        m.material.emissiveIntensity = glow ? 0.35 + 0.45*(0.5+0.5*Math.sin(t*4)) : 0; });
    }
  });
  return model;
}

BIO.organs.pancreas = BIO.pancreas;
BIO.builders.pancreas = buildPancreas;
route('/explorar/pancreas', (view,q) => {
  return organView(view, q, BIO.pancreas, buildPancreas);
});
/* Los enlaces antiguos al marcador "en construcción" llevan al modelo real */
route('/explorar/organo/pancreas', () => navigate('#/explorar/pancreas'));
</script>
