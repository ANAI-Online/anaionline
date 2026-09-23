<script>
/* =====================================================================
   ÓRGANO: SISTEMA MUSCULAR — el motor que mueve las palancas del esqueleto
   Datos (BIO.muscle) + modelo 3D procedimental (buildMuscle)
   Ruta: #/explorar/muscular
   ===================================================================== */
BIO.muscle = {
  capasHint:"Sugerencia: apaga «Músculos superficiales posteriores» para quedarte con la cara anterior del cuerpo, o apaga las dos para ver el armazón óseo y el diafragma solos. Para estudiar la contracción, deja encendidas únicamente las dos capas de lupa y ve a la pestaña Animación.",
  id:"muscular", nombre:"Sistema muscular", unidad:6, dominio:"anat",
  eyebrow:"Atlas 3D · Unidad 6 · Movimiento, contracción y energía", em:"💪",
  intro:"El esqueleto pone las palancas; aquí está el motor. Recorre los grandes grupos musculares, abre el codo para ver un par antagonista trabajando y baja con la lupa hasta el sarcómero, donde la fuerza se fabrica: filamentos que no se acortan, solo se deslizan unos sobre otros.",
  nota:"Modelo tridimensional simplificado con fines educativos. Se representan los grandes grupos superficiales, no los más de 600 músculos del cuerpo: los profundos (braquial, transverso del abdomen, psoas, manguito de los rotadores) y los del antebrazo, la mano, el pie y la cara no se detallan, y el antebrazo aparece como una masa única. Cada grupo se dibuja como un haz de fascículos para que se vea la dirección de las fibras, y los vientres están algo más marcados que en un cuerpo real, donde la piel y la grasa los suavizan. El armazón óseo, en marfil, es solo una referencia de posición: el modelo completo está en el sistema esquelético. Las lupas están ampliadas cientos de miles de veces: una fibra muscular mide entre 10 y 100 µm de diámetro y un sarcómero en reposo unos 2 µm; el número y el grosor de los filamentos son esquemáticos.",
  focusR:7, radius:23.2, target:[1.05,0.2,0], phi:1.46, theta:0.24, floor:-6.15, floorSize:16,
  capas:[
    {id:"anterior", n:"Músculos superficiales anteriores"},
    {id:"posterior", n:"Músculos superficiales posteriores"},
    {id:"profundo", n:"Músculo profundo: el diafragma"},
    {id:"micro", n:"Del músculo al sarcómero (lupa)"},
    {id:"nervio", n:"Unión neuromuscular (lupa)"}
  ],
  opacityCapas:["anterior","posterior"], opacityLabel:"Transparencia de los músculos superficiales", opacityDefault:1,
  activity:"explorar-muscular", guidedActivity:"guiada-muscular", badge:"anatomista", seenThreshold:8,
  related:[
    {t:"Explorar el sistema esquelético", href:"#/explorar/esqueletico"},
    {t:"El corazón: músculo cardíaco", href:"#/explorar/corazon"},
    {t:"Los pulmones y el diafragma", href:"#/explorar/pulmones"},
    {t:"Cuerpo humano y salud", href:"#/area/cuerpo"}
  ],
  reto:{
    proposito:"Comprobar que la contracción muscular no es un músculo que «se encoge» por dentro: es un deslizamiento de filamentos que no cambian de longitud, y que ese deslizamiento necesita calcio para empezar y ATP para poder soltarse.",
    pista:"Las tres lupas están a la derecha del cuerpo, unidas entre sí por líneas azules: arriba el músculo entero y sus envolturas, en el medio el sarcómero y abajo la unión neuromuscular. Las animaciones se activan en la pestaña Animación.",
    observa:[
      {id:"sarcomero", txt:"En el sarcómero: cuál de las bandas cambia de anchura al contraerse y cuál no"},
      {id:"union-neuromuscular", txt:"Las vesículas de acetilcolina cruzando la hendidura hasta la placa motora"},
      {id:"fibra", txt:"Las tres escalas: músculo → fascículo envuelto en perimisio → fibra con los núcleos pegados a la membrana"},
      {id:"biceps", txt:"En la flexión del codo: qué hace el bíceps y qué hace el tríceps al mismo tiempo"}
    ],
    pregunta:{
      q:"Unas horas después de la muerte los músculos se endurecen y las articulaciones no se pueden doblar: es el rigor mortis. ¿Cuál es la explicación correcta?",
      ops:[
        "El calcio desaparece del músculo y los filamentos se sueldan entre sí",
        "Sin ATP, las cabezas de miosina no pueden soltarse de la actina y quedan enganchadas",
        "Los músculos se endurecen porque el cuerpo se enfría después de morir"
      ],
      ok:1,
      fb:"El rigor mortis es la mejor prueba de para qué sirve el ATP en la contracción: no hace falta para pegar la cabeza de miosina a la actina, hace falta para despegarla. Al morir se acaba el ATP, la bomba que devuelve el calcio al retículo sarcoplásmico deja de funcionar, el calcio inunda el citoplasma, se forman los puentes cruzados… y ya no hay manera de deshacerlos. El músculo queda bloqueado. El rigor empieza a las 2–6 horas, es completo hacia las 12 y desaparece a los 1–3 días, cuando las propias enzimas degradan las proteínas. Por eso la carne se deja madurar antes de venderla.",
      wrong:[
        "Ocurre justo al revés: el calcio no desaparece, se escapa. Sin ATP la bomba que lo recoge se detiene y el calcio sale del retículo al citoplasma, que es precisamente la señal que ordena formar los puentes cruzados.",
        "La temperatura cambia la velocidad del proceso (con calor aparece antes y pasa antes), pero no es la causa: el rigor mortis también ocurre en climas cálidos y en un cuerpo a 37 °C. La causa es bioquímica: se agotó el ATP."
      ]
    }
  },
  structures:[

    {id:"pectoral", nombre:"Pectoral mayor", capa:"anterior", color:"#B4453C", pos:[0.85,3.35,0.62], lbl:[-2.54,5.26,1.23],
      n1:"El abanico grueso que cubre la parte anterior del tórax y lleva el brazo hacia adelante y hacia el centro del cuerpo.",
      n2:"Nace en un origen muy ancho —la mitad interna de la clavícula, el esternón y los cartílagos de las primeras costillas— y todas sus fibras convergen en un tendón estrecho que se ancla en el húmero, junto al hombro. Esa forma de abanico le permite hacer tres movimientos: acercar el brazo al cuerpo (aducción), llevarlo hacia adelante (flexión) y rotarlo hacia adentro. Es el músculo de abrazar, de empujar una puerta y de hacer una flexión de brazos en el suelo.",
      n3:"Cuando el brazo está fijo —apoyado en una mesa o en las rodillas— el pectoral invierte su acción: en vez de mover el brazo, tira de las costillas hacia arriba. Por eso una persona con dificultad respiratoria se apoya instintivamente en los brazos: convierte el pectoral en un músculo respiratorio accesorio. Debajo de él, mucho más pequeño, está el pectoral menor, que no se ve desde fuera. Y la mama se asienta sobre el pectoral mayor, sin formar parte de él: el músculo es el suelo, no el contenido.",
      dato:"Si apoyas los brazos en una mesa, el pectoral deja de mover el brazo y pasa a ayudarte a respirar.",
      conecta:["deltoides","dorsal-trapecio","diafragma"], temas:["Movimiento","Sistema respiratorio","Palancas"],
      partes:[
        {n:"Porción clavicular", d:"Las fibras superiores, que nacen en la clavícula y elevan el brazo hacia adelante.", at:[0.70,3.88,0.60], sub:"clavicular"},
        {n:"Porción esternocostal", d:"El grueso del abanico: nace en el esternón y en los cartílagos costales.", at:[0.55,3.10,0.66], sub:"esternocostal"},
        {n:"Tendón de inserción", d:"Donde todas las fibras convergen para anclarse en el húmero, junto al hombro.", at:[1.26,3.62,0.20], sub:"tendon"}
      ],
      quiz:{q:"¿Por qué una persona con dificultad para respirar se apoya con los brazos en una mesa?", ops:["Para no caerse, sin más","Porque al fijar los brazos el pectoral tira de las costillas y ayuda a ensanchar el tórax","Porque así el aire entra por el pecho"], ok:1,
        fb:"Un músculo tira siempre de sus dos extremos: si se fija el que solía moverse, mueve el otro. Con el brazo fijo, el pectoral eleva las costillas.",
        wrong:["El apoyo ayuda al equilibrio, pero la razón fisiológica es otra: fijar el brazo cambia el punto móvil del músculo.","El aire entra siempre por la vía aérea. Lo que cambia es el volumen del tórax, y eso lo consiguen los músculos."]}},

    {id:"deltoides", nombre:"Deltoides", capa:"anterior", color:"#C05248", pos:[1.45,3.55,0.05], lbl:[2.6,5.19,-0.42],
      n1:"La hombrera muscular que cubre la articulación del hombro y separa el brazo del cuerpo.",
      n2:"Tiene tres porciones que nacen en tres sitios distintos —clavícula por delante, acromion a los lados y espina de la escápula por detrás— y las tres se insertan en el mismo punto del húmero. Por eso cada una hace una cosa diferente: la anterior lleva el brazo hacia adelante, la media lo separa del cuerpo (abducción) y la posterior lo lleva hacia atrás. Es un músculo multipeniforme: sus fibras son cortas y oblicuas, muchas por unidad de volumen, lo que le da mucha fuerza aunque su recorrido sea corto.",
      n3:"El deltoides es el sitio clásico de las inyecciones intramusculares —incluidas las vacunas— porque es grueso, superficial y está lejos de vasos y nervios grandes. Curiosamente, no es él quien inicia la separación del brazo: los primeros 15° los hace el supraespinoso, un músculo profundo del manguito de los rotadores, y solo después el deltoides toma el relevo. Si se lesiona el nervio axilar, el hombro pierde su relieve redondeado y aparece el «hombro en charretera».",
      dato:"Sus tres porciones pueden ser antagonistas entre sí: la anterior lleva el brazo adelante y la posterior, atrás.",
      conecta:["pectoral","triceps","dorsal-trapecio"], temas:["Movimiento","Salud","Anatomía del hombro"],
      partes:[
        {n:"Fascículo anterior", d:"Nace en la clavícula. Lleva el brazo hacia adelante y lo rota hacia adentro.", at:[0.95,4.00,0.38], sub:"anterior"},
        {n:"Fascículo medio", d:"Nace en el acromion. Es el que separa el brazo del cuerpo.", at:[1.46,4.05,-0.02], sub:"medio"},
        {n:"Fascículo posterior", d:"Nace en la espina de la escápula. Lleva el brazo hacia atrás.", at:[1.02,3.90,-0.52], sub:"posterior"}
      ],
      quiz:{q:"Las tres porciones del deltoides terminan en el mismo punto del húmero. ¿Por qué hacen movimientos distintos?", ops:["Porque tienen distinta cantidad de fibras","Porque nacen en sitios distintos y tiran desde direcciones diferentes","Porque reciben nervios de distinta velocidad"], ok:1,
        fb:"Lo que decide la acción de un músculo es la línea que une su origen con su inserción. Cambia el origen y cambia el movimiento.",
        wrong:["La cantidad de fibras cambia la fuerza, no la dirección del movimiento.","Todo el deltoides recibe el mismo nervio, el axilar. La diferencia es geométrica, no nerviosa."]}},

    {id:"biceps", nombre:"Bíceps braquial", capa:"anterior", color:"#C4564A", pos:[1.55,2.70,0.24], lbl:[-3.7,0.1,0.9], anchor:[-1.53,2.55,0.3],
      n1:"El músculo de la cara anterior del brazo: flexiona el codo y, sobre todo, gira la palma hacia arriba.",
      n2:"«Bíceps» significa «de dos cabezas»: la porción larga nace por encima de la articulación del hombro y su tendón pasa por dentro de ella, y la porción corta nace en la apófisis coracoides de la escápula. Las dos se unen en un solo vientre y terminan en un tendón que se ancla en la tuberosidad del radio, no en el cúbito. Ese detalle lo explica todo: como el radio puede girar, al tirar de él el bíceps hace supinación, es decir, voltea la palma hacia arriba. Por eso los tornillos y los grifos están hechos para apretarse con la mano derecha: ese giro es el más fuerte.",
      n3:"El bíceps no es el flexor más potente del codo, aunque sea el más famoso: por debajo, sin verse, está el braquial, que aporta más fuerza de flexión, y el braquiorradial ayuda desde el antebrazo. Y ese «bulto» que aparece al flexionar no es músculo que aparece de la nada: el volumen del músculo no cambia, simplemente se acorta y, al conservar el volumen, se engrosa. Es exactamente lo que le ocurre a una esponja que se comprime a lo largo.",
      dato:"El bíceps aporta cerca de un tercio de la fuerza de flexión del codo: el motor principal es el braquial, que no se ve.",
      conecta:["triceps","deltoides","sarcomero"], temas:["Par antagonista","Palancas","Biomecánica"],
      partes:[
        {n:"Porción larga", d:"Su tendón entra en la articulación del hombro y corre por la corredera del húmero.", at:[1.32,3.60,0.16], sub:"larga"},
        {n:"Porción corta", d:"Nace en la apófisis coracoides de la escápula, por delante del hombro.", at:[1.16,3.62,0.26], sub:"corta"},
        {n:"Vientre muscular", d:"La parte carnosa que se acorta y se engrosa al contraerse.", at:[1.50,2.72,0.26], sub:"vientre"},
        {n:"Tendón distal", d:"Se ancla en la tuberosidad del radio: por eso el bíceps supina la mano.", at:[1.68,1.52,0.18], sub:"tendon"}
      ],
      quiz:{q:"Al flexionar el codo, el bíceps «se abulta». ¿Qué está pasando realmente?", ops:["El músculo se llena de sangre y crece","El músculo se acorta y, como su volumen no cambia, se engrosa","Se le inyecta aire desde los pulmones"], ok:1,
        fb:"Un músculo contraído tiene el mismo volumen que relajado: lo que hace es cambiar de forma, más corto y más grueso, porque sus sarcómeros se acortan.",
        wrong:["Durante el ejercicio llega más sangre al músculo, pero el bulto aparece de inmediato al contraerlo, antes de que cambie ningún riego.","Los músculos no contienen aire: lo que se acorta son estructuras proteicas dentro de cada fibra."]}},

    {id:"triceps", nombre:"Tríceps braquial", capa:"posterior", color:"#A03D36", pos:[1.58,2.60,-0.32], lbl:[-3.7,-0.75,0.9], anchor:[-1.64,2.3,-0.12],
      n1:"El músculo de la cara posterior del brazo: extiende el codo. Es el antagonista del bíceps.",
      n2:"Tiene tres cabezas: la larga nace en la escápula (y por eso también lleva el brazo hacia atrás), y las cabezas lateral y medial nacen en el propio húmero. Las tres se unen en un tendón ancho que se inserta en el olécranon, la punta del codo. Es el músculo de empujar: lanzar, apartar algo, levantarse de una silla apoyándose en los brazos. Junto con el bíceps forma un par antagonista: cuando uno se contrae, el otro se relaja, y esa coordinación la ordena la médula espinal mediante la inhibición recíproca, sin que tengas que pensarla.",
      n3:"El tríceps aporta alrededor de dos tercios de la masa muscular del brazo, más que el bíceps, aunque llame menos la atención porque está detrás. Un detalle que sorprende: el bíceps y el tríceps no pueden hacerse fuerza mutuamente para «fijar» el codo sin gastar energía, y un músculo solo puede tirar, nunca empujar. Por eso el cuerpo necesita siempre pares: un músculo devuelve al hueso a la posición desde la que el otro lo movió. Sin tríceps, podrías doblar el codo pero solo la gravedad lo estiraría.",
      dato:"Un músculo solo sabe tirar, nunca empujar: por eso todo movimiento necesita un par de músculos antagonistas.",
      conecta:["biceps","deltoides","dorsal-trapecio"], temas:["Par antagonista","Palancas","Sistema nervioso"],
      partes:[
        {n:"Cabeza larga", d:"Nace en la escápula, cruza el hombro y también lleva el brazo hacia atrás.", at:[1.28,3.48,-0.32], sub:"larga"},
        {n:"Cabeza lateral", d:"Nace en la cara posterior del húmero, por fuera.", at:[1.62,3.05,-0.22], sub:"lateral"},
        {n:"Cabeza medial", d:"La más profunda, nace en el húmero por debajo de las otras dos.", at:[1.60,2.42,-0.16], sub:"medial"},
        {n:"Tendón del olécranon", d:"El tendón ancho que se ancla en la punta del codo.", at:[1.56,1.82,-0.24], sub:"tendon"}
      ],
      quiz:{q:"¿Por qué el cuerpo necesita músculos antagonistas como el bíceps y el tríceps?", ops:["Para tener músculos de repuesto si uno se lesiona","Porque un músculo solo puede tirar: hace falta otro que devuelva el hueso a su sitio","Porque así el hueso no se rompe"], ok:1,
        fb:"La contracción solo acorta. Para volver a extender el codo hace falta otro músculo que tire desde el lado contrario.",
        wrong:["No son repuestos: hacen movimientos opuestos y ambos son necesarios en cada gesto.","Los antagonistas también protegen la articulación frenando el movimiento, pero la razón de fondo es mecánica: el músculo no puede empujar."]}},

    {id:"abdominales", nombre:"Recto del abdomen y oblicuos", capa:"anterior", color:"#BE4F43", pos:[0.30,1.70,0.60], lbl:[-5.03,1.22,1.96],
      n1:"La pared muscular del abdomen: flexiona el tronco, lo hace girar y comprime las vísceras.",
      n2:"El recto del abdomen es una cinta que va del pubis a las costillas, dividida por tres o cuatro intersecciones tendinosas y separada de la del otro lado por la línea alba. Esas divisiones son las que dibujan los «cuadros»: no son músculos distintos, es un solo músculo con costuras. A los lados están los oblicuos, cuyas fibras cruzan en direcciones opuestas —el externo hacia abajo y adelante, el interno hacia arriba y adelante—, de modo que girar el tronco hacia la derecha usa el oblicuo externo izquierdo y el interno derecho. Más profundo aún está el transverso, que rodea la cintura como una faja.",
      n3:"La pared abdominal es también un músculo espiratorio y de esfuerzo: al toser, estornudar, vomitar, defecar o empujar en el parto, se contrae y sube la presión dentro del abdomen. Junto con el diafragma y los músculos de la espalda forma el cinturón que estabiliza la columna: cuando cargas peso, ese cinturón se tensa antes de que te muevas. Sobre la «tableta»: es cuestión de dos cosas independientes, cuánto músculo tienes y cuánta grasa subcutánea lo cubre, y el número de intersecciones tendinosas viene de fábrica —hay personas con cuatro y personas con seis—. La forma del abdomen no mide la salud de nadie; lo que sí importa es que esa pared sea fuerte, porque sostiene la columna.",
      dato:"Los «cuadros» del abdomen son las costuras tendinosas de un solo músculo, y su número es genético.",
      conecta:["diafragma","dorsal-trapecio","gluteo"], temas:["Postura","Respiración forzada","Salud"],
      partes:[
        {n:"Recto del abdomen", d:"La cinta vertical que va del pubis a las costillas y flexiona el tronco.", at:[0.26,1.90,0.64], sub:"recto"},
        {n:"Intersecciones tendinosas", d:"Las costuras horizontales que dividen el recto y dibujan los «cuadros».", at:[0.26,2.38,0.66], sub:"intersecciones"},
        {n:"Línea alba", d:"La franja tendinosa central donde se encuentran las aponeurosis de los dos lados.", at:[0,1.80,0.68], sub:"alba"},
        {n:"Oblicuo externo", d:"Las fibras laterales en diagonal: hacen girar el tronco y comprimen el abdomen.", at:[0.88,2.05,0.42], sub:"oblicuo"}
      ],
      quiz:{q:"Para girar el tronco hacia la derecha, ¿qué músculos trabajan juntos?", ops:["Los dos rectos del abdomen a la vez","El oblicuo externo izquierdo y el oblicuo interno derecho","Solo el transverso del abdomen"], ok:1,
        fb:"Las fibras de los oblicuos cruzan en direcciones opuestas: el giro sale de combinar un oblicuo externo con el interno del lado contrario.",
        wrong:["Los dos rectos a la vez flexionan el tronco hacia adelante; no producen rotación.","El transverso comprime como una faja y estabiliza, pero no rota el tronco."]}},

    {id:"dorsal-trapecio", nombre:"Trapecio y dorsal ancho", capa:"posterior", color:"#9C3A33", pos:[0,3.30,-0.72], lbl:[-4.87,3.71,0.61], anchor:[-0.26,3.2,-0.46],
      n1:"Los dos grandes músculos que dibujan la espalda: el trapecio arriba, como una capa, y el dorsal ancho abajo, como unas alas.",
      n2:"El trapecio va del cráneo y de las vértebras hasta la clavícula y la escápula, y tiene tres porciones: la superior eleva el hombro (el gesto de «no sé»), la media junta las escápulas y la inferior las baja. Sostener una mochila pesada es trabajo suyo. El dorsal ancho nace en un origen enorme —las vértebras dorsales bajas, la fascia toracolumbar, la cresta ilíaca y las últimas costillas— y sus fibras convergen hacia arriba y hacia afuera para insertarse en el húmero. Es el músculo de tirar hacia abajo y hacia atrás: subir por una cuerda, remar, hacer una dominada, la brazada del crol.",
      n3:"El dorsal ancho es el músculo de mayor superficie del cuerpo humano, y se puede trasladar en cirugía —con su arteria y su nervio— para reconstruir una mama después de una mastectomía o cubrir una pérdida de tejido, sin que la persona quede con una limitación importante, porque otros músculos asumen su función. El trapecio, en cambio, tiene una peculiaridad: no lo inerva un nervio del plexo cervical corriente sino el nervio accesorio, el XI par craneal, que sale del cráneo. Por eso una cirugía de cuello puede dejar el hombro caído si ese nervio se lesiona.",
      dato:"El dorsal ancho es el músculo de mayor superficie del cuerpo y puede trasplantarse dentro de la misma persona.",
      conecta:["deltoides","triceps","gluteo"], temas:["Postura","Medicina reconstructiva","Movimiento"],
      partes:[
        {n:"Trapecio superior", d:"Del cráneo y el cuello al hombro: lo eleva. Se tensa al cargar una mochila.", at:[0.62,4.45,-0.45], sub:"trapecio"},
        {n:"Trapecio medio e inferior", d:"De las vértebras a la escápula: la juntan hacia el centro y la bajan.", at:[0.52,3.35,-0.58], sub:"trapecio"},
        {n:"Dorsal ancho", d:"De la pelvis y la columna lumbar al húmero: tira del brazo hacia abajo y atrás.", at:[0.78,2.10,-0.52], sub:"dorsal"},
        {n:"Fascia toracolumbar", d:"La lámina tendinosa de la zona lumbar donde nace buena parte del dorsal ancho.", at:[0,1.55,-0.55], sub:"fascia"}
      ],
      quiz:{q:"¿Qué movimiento es el más propio del dorsal ancho?", ops:["Levantar el brazo por encima de la cabeza","Tirar del brazo hacia abajo y hacia atrás, como en una dominada o en la brazada de crol","Girar la cabeza hacia un lado"], ok:1,
        fb:"Sus fibras van de la pelvis y la columna al húmero: al acortarse, arrastran el brazo hacia abajo y hacia atrás.",
        wrong:["Ese es trabajo del deltoides, del supraespinoso y del giro de la escápula; el dorsal hace lo contrario.","La cabeza la mueven el esternocleidomastoideo y el trapecio superior, no el dorsal ancho."]}},

    {id:"gluteo", nombre:"Glúteo mayor", capa:"posterior", color:"#A8423A", pos:[0.72,0.15,-0.62], lbl:[-3.23,-1.53,0.54],
      n1:"El músculo más voluminoso del cuerpo. Extiende la cadera: es el que te levanta de una silla y el que te impulsa al subir.",
      n2:"Nace en la parte posterior del ilion y del sacro y baja en diagonal hasta el fémur y la banda fibrosa del muslo. Al contraerse lleva el muslo hacia atrás y endereza el tronco sobre la cadera. En terreno llano trabaja poco: caminar en plano lo usa apenas. Donde se vuelve imprescindible es al subir gradas, correr, saltar o levantarse del suelo, y sobre todo al impedir que el tronco se venza hacia adelante en cada apoyo. Junto a él, el glúteo medio hace otro trabajo que no se ve: mantener la pelvis horizontal cuando te apoyas en un solo pie.",
      n3:"El glúteo mayor humano es desproporcionadamente grande comparado con el de un chimpancé, y esa diferencia es una de las firmas anatómicas del bipedismo y de la carrera de resistencia: no aparece tanto al caminar como al correr, donde evita que el tronco se desplome hacia adelante en cada zancada. Si el glúteo medio falla, al apoyarse en una pierna la cadera contraria cae: es el signo de Trendelenburg, que un médico busca simplemente pidiendo que la persona se pare en un pie.",
      dato:"Caminar en llano casi no lo usa; subir gradas y correr, muchísimo.",
      conecta:["isquiotibiales","cuadriceps","abdominales"], temas:["Bipedismo","Evolución humana","Ejercicio"],
      partes:[
        {n:"Glúteo mayor", d:"La masa superficial que extiende la cadera y endereza el tronco.", at:[0.74,0.05,-0.72], sub:"mayor"},
        {n:"Glúteo medio", d:"Más arriba y por fuera: mantiene la pelvis horizontal al apoyarse en un solo pie.", at:[0.98,0.82,-0.34], sub:"medio"}
      ],
      quiz:{q:"¿En cuál de estas acciones trabaja más el glúteo mayor?", ops:["Caminar despacio en terreno plano","Subir gradas o levantarse de una silla","Estar de pie sin moverse"], ok:1,
        fb:"Su trabajo es extender la cadera contra una resistencia: subir, correr, saltar, incorporarse.",
        wrong:["Caminar en llano lo usa muy poco: la mayor parte del impulso viene de la pantorrilla y del peso del propio cuerpo.","De pie y quieto, la postura la sostienen sobre todo músculos posturales profundos con contracciones mínimas."]}},

    {id:"cuadriceps", nombre:"Cuádriceps femoral", capa:"anterior", color:"#C4564A", pos:[0.80,-1.40,0.42], lbl:[-3.28,-3.27,1.63],
      n1:"Los cuatro músculos de la cara anterior del muslo y el único grupo capaz de estirar la rodilla.",
      n2:"Son el recto femoral, en el centro, y los vastos lateral, medial e intermedio, que lo rodean. Los cuatro terminan en un único tendón que envuelve la rótula y continúa hasta la tibia como tendón rotuliano: la rótula funciona como una polea que aleja el tendón del eje de giro y aumenta la fuerza. El recto femoral es el único que cruza también la cadera, así que además flexiona el muslo; por eso patear un balón combina los dos movimientos. Cuando el médico golpea el tendón rotuliano y la pierna salta, está comprobando el reflejo miotático de este grupo.",
      n3:"El cuádriceps es el grupo muscular de mayor masa del cuerpo y, quizá por eso, el que más rápido se pierde cuando no se usa: después de una o dos semanas de inmovilización con yeso o de reposo en cama, el muslo se adelgaza de forma visible y se pierde una parte importante de la fuerza. También es el que frena: al bajar gradas, el cuádriceps trabaja alargándose (contracción excéntrica) para que el cuerpo no se desplome, y ese trabajo de frenado es el que más agujetas produce al día siguiente.",
      dato:"Bajar gradas cansa el cuádriceps más que subirlas, porque trabaja frenando mientras se alarga.",
      conecta:["isquiotibiales","gluteo","triceps-sural"], temas:["Palancas","Ejercicio","Rehabilitación"],
      partes:[
        {n:"Recto femoral", d:"El central. Cruza también la cadera, así que flexiona el muslo además de estirar la rodilla.", at:[0.80,-1.15,0.46], sub:"recto"},
        {n:"Vasto lateral", d:"El más voluminoso, por fuera del muslo.", at:[1.08,-1.35,0.28], sub:"lateral"},
        {n:"Vasto medial", d:"Por dentro; su vientre baja mucho y forma el relieve encima de la rodilla.", at:[0.52,-2.10,0.34], sub:"medial"},
        {n:"Tendón rotuliano", d:"Continúa el tendón del cuádriceps desde la rótula hasta la tibia. Aquí se busca el reflejo.", at:[0.74,-2.88,0.30], sub:"tendon"}
      ],
      quiz:{q:"¿Por qué duelen más las piernas después de bajar un cerro que después de subirlo?", ops:["Porque bajar exige más oxígeno","Porque al bajar el cuádriceps frena el cuerpo contrayéndose mientras se alarga, y ese trabajo daña más las fibras","Porque al bajar los huesos reciben más peso"], ok:1,
        fb:"El trabajo excéntrico —contraerse alargándose— produce microlesiones en las fibras y es el que más dolor muscular tardío causa.",
        wrong:["Bajar consume menos oxígeno que subir: es mecánicamente más barato y aun así duele más al día siguiente.","El hueso sí recibe impacto, pero el dolor muscular de los días siguientes viene del trabajo excéntrico de las fibras."]}},

    {id:"isquiotibiales", nombre:"Isquiotibiales", capa:"posterior", color:"#9C3A33", pos:[0.72,-1.50,-0.42], lbl:[-2.78,-2.66,0.78], anchor:[1.05,-1.51,-0.29],
      n1:"Los tres músculos de la cara posterior del muslo: flexionan la rodilla y extienden la cadera.",
      n2:"Son el bíceps femoral, el semitendinoso y el semimembranoso. Casi todos nacen en la tuberosidad isquiática —el hueso sobre el que te sientas— y terminan por debajo de la rodilla, de modo que cruzan dos articulaciones a la vez. Esa doble función los vuelve antagonistas del cuádriceps en la rodilla y compañeros del glúteo en la cadera. Al caminar y al correr no solo impulsan: en la última parte de cada zancada frenan la pierna que viene lanzada hacia adelante, antes de que el pie toque el suelo.",
      n3:"Justo en ese frenado —contracción excéntrica, músculo tenso mientras se estira— ocurre la lesión típica del velocista y del futbolista: la rotura de isquiotibiales casi nunca sucede empujando, sino frenando. De ahí que la prevención no consista solo en estirar sino en entrenar la fuerza excéntrica. Y hay un detalle cotidiano: si te sientas mucho, estos músculos pasan horas acortados; por eso, al inclinarse hacia adelante con las rodillas estiradas, muchas personas sienten que «tiran» detrás del muslo. Eso no mide flexibilidad moral ninguna, solo longitud de reposo.",
      dato:"La lesión típica de isquiotibiales ocurre frenando la pierna, no impulsándola.",
      conecta:["cuadriceps","gluteo","triceps-sural"], temas:["Lesiones deportivas","Par antagonista","Ejercicio"],
      partes:[
        {n:"Bíceps femoral", d:"El lateral, de dos cabezas. Se inserta en la cabeza del peroné.", at:[1.00,-1.75,-0.30], sub:"biceps-f"},
        {n:"Semitendinoso", d:"El más interno y superficial; su tendón es largo y fino.", at:[0.50,-1.85,-0.32], sub:"semiten"},
        {n:"Semimembranoso", d:"Profundo al semitendinoso, con una lámina tendinosa ancha en su origen.", at:[0.62,-1.60,-0.40], sub:"semimem"}
      ],
      quiz:{q:"Un velocista se rompe los isquiotibiales. ¿En qué momento de la carrera es más probable que ocurra?", ops:["Al salir de tacos, empujando con toda la fuerza","Al final de cada zancada, cuando frenan la pierna que viene lanzada hacia adelante","Al cruzar la meta y desacelerar caminando"], ok:1,
        fb:"El músculo está a la vez tenso y estirándose: es la situación en la que más tensión soporta cada fibra.",
        wrong:["Empujando el músculo se acorta, que es su situación más segura y en la que genera menos tensión por fibra.","Desacelerando al trote la exigencia es mucho menor; el riesgo está en la velocidad máxima."]}},

    {id:"triceps-sural", nombre:"Gastrocnemio y sóleo", capa:"posterior", color:"#B4453C", pos:[0.78,-3.90,-0.35], lbl:[-3.76,-5.48,0.94],
      n1:"La pantorrilla: dos músculos superpuestos que terminan en el tendón de Aquiles y levantan el talón en cada paso.",
      n2:"El gastrocnemio es el superficial, con dos cabezas que nacen por encima de la rodilla, en el fémur; por eso además de empujar el pie hacia abajo también ayuda a flexionar la rodilla. El sóleo, ancho y profundo, nace por debajo de la rodilla, en la tibia y el peroné. Los dos se unen en el tendón de Aquiles, el más grueso y resistente del cuerpo, que se ancla en el calcáneo. Esa diferencia de origen tiene una consecuencia comprobable: si estiras la pantorrilla con la rodilla estirada trabajas sobre todo el gastrocnemio, y si la doblas, sobre el sóleo.",
      n3:"El sóleo está formado en su mayoría por fibras de tipo I, lentas, ricas en mitocondrias y en mioglobina, muy resistentes a la fatiga: sostiene el cuerpo de pie durante horas sin cansarse y su bombeo contra las venas profundas ayuda a devolver la sangre al corazón, por lo que se le llama «el segundo corazón». El gastrocnemio tiene una proporción mayor de fibras de tipo II, rápidas y potentes pero fatigables, las del salto y el sprint. Todas las personas tenemos ambos tipos, en proporciones que dependen en parte de la genética y en parte del entrenamiento; ningún tipo es mejor, sirven para cosas distintas.",
      dato:"El sóleo bombea sangre de vuelta al corazón al caminar: por eso se le llama «el segundo corazón».",
      conecta:["cuadriceps","isquiotibiales","fibra"], temas:["Fibras I y II","Deporte","Circulación"],
      partes:[
        {n:"Gastrocnemio medial y lateral", d:"Las dos cabezas superficiales; nacen por encima de la rodilla y también la flexionan.", at:[0.76,-3.55,-0.34], sub:"gastro"},
        {n:"Sóleo", d:"Profundo y ancho; nace por debajo de la rodilla. Fibras lentas, resistentes a la fatiga.", at:[0.80,-4.20,-0.28], sub:"soleo"},
        {n:"Tendón de Aquiles", d:"El tendón más grueso del cuerpo. Une los dos músculos con el calcáneo.", at:[0.76,-5.15,-0.30], sub:"aquiles"}
      ],
      quiz:{q:"Estiras la pantorrilla con la rodilla doblada y casi no notas tirón; con la rodilla estirada, sí. ¿Por qué?", ops:["Porque con la rodilla doblada el tendón de Aquiles se afloja","Porque el gastrocnemio cruza la rodilla: al doblarla se destensa y el estiramiento recae en el sóleo","Porque el sóleo desaparece al doblar la rodilla"], ok:1,
        fb:"Un músculo que cruza dos articulaciones depende de la posición de las dos. El gastrocnemio nace en el fémur; el sóleo, no.",
        wrong:["El tendón es el mismo en las dos posiciones: lo que cambia es la longitud del músculo que tira de él.","El sóleo sigue ahí; de hecho, es el que sí se estira en esa posición."]}},

    {id:"diafragma", nombre:"Diafragma", capa:"profundo", color:"#C9705C", pos:[0,2.25,0.05], lbl:[-3.66,1.99,1.39], anchor:[0.09,2.37,0.43],
      n1:"La cúpula muscular que separa el tórax del abdomen. Es el principal músculo de la respiración.",
      n2:"Es un músculo plano en forma de paraguas, con fibras que nacen en las costillas inferiores, el esternón y las vértebras lumbares y convergen en un centro tendinoso, una lámina fibrosa en el medio que no se contrae. Al contraerse, la cúpula se aplana y desciende: el tórax aumenta de volumen, la presión interna baja y el aire entra. Al relajarse vuelve a subir por la elasticidad del pulmón y el aire sale, sin gasto de energía. En reposo hace alrededor del 70 % del trabajo respiratorio; los intercostales y los abdominales entran cuando hace falta más.",
      n3:"Lo controla el nervio frénico, que nace en la médula cervical (C3 a C5): una lesión medular por encima de ese nivel deja a la persona sin respiración autónoma. Es además el único músculo esquelético que trabaja toda la vida sin descanso y que, a la vez, puedes manejar a voluntad: puedes aguantar la respiración, pero no indefinidamente. En Quito, a unos 2.850 m sobre el nivel del mar, la presión del aire es cerca de un 28 % menor que a nivel del mar, así que cada respiración trae menos moléculas de oxígeno; el cuerpo lo compensa respirando algo más y, a lo largo de semanas, fabricando más glóbulos rojos. Quien llega de la costa al altiplano lo nota en el primer tramo de gradas.",
      dato:"El hipo es una contracción brusca e involuntaria del diafragma seguida del cierre de la laringe.",
      conecta:["abdominales","pectoral","fibra"], temas:["Respiración","Altitud","Sistema nervioso"],
      partes:[
        {n:"Cúpulas", d:"Las dos bóvedas musculares, más alta la derecha por el hígado que tiene debajo.", at:[0.60,2.35,0.05], sub:"cupula"},
        {n:"Centro tendinoso", d:"La lámina fibrosa central donde convergen las fibras. No se contrae.", at:[0,2.42,0.02], sub:"centro"},
        {n:"Pilares", d:"Las columnas musculares que anclan el diafragma en las vértebras lumbares.", at:[0.18,1.55,-0.25], sub:"pilares"}
      ],
      quiz:{q:"¿Qué le ocurre al diafragma cuando tomas aire?", ops:["Se relaja y sube, empujando el aire hacia adentro","Se contrae y desciende: el tórax se agranda, la presión baja y el aire entra","Se contrae y sube para hacer sitio a los pulmones"], ok:1,
        fb:"El aire no se «succiona» con los pulmones: el diafragma cambia el volumen del tórax y la diferencia de presión hace el resto.",
        wrong:["Eso es la espiración en reposo: el diafragma se relaja, sube y el aire sale solo.","Si subiera, el tórax se haría más pequeño y el aire saldría. Al contraerse, la cúpula se aplana y baja."]}},

    {id:"fibra", nombre:"Del músculo a la miofibrilla (lupa)", capa:"micro", color:"#D4796B", pos:[5.00,3.10,0.40], lbl:[7.23,5.41,-0.41],
      n1:"Un músculo es un manojo de manojos: fascículos envueltos en perimisio, y dentro de cada fascículo, fibras que son células enormes llenas de miofibrillas.",
      n2:"Tres envolturas de tejido conectivo lo organizan todo: el epimisio rodea el músculo entero, el perimisio agrupa las fibras en fascículos —los «hilos» que se ven al deshacer un trozo de carne— y el endomisio envuelve cada fibra. Las tres se continúan con el tendón: la fuerza de cada fibra llega al hueso por esa red, no por un cable individual. La fibra muscular es una célula rarísima: mide de 10 a 100 µm de grosor y puede alcanzar varios centímetros de largo —en el sartorio, hasta unos 30 cm—, y tiene cientos de núcleos empujados contra la membrana, porque el interior está ocupado por las miofibrillas. Cada miofibrilla es una fila de sarcómeros, y de ahí salen las estrías. Alrededor de cada una, el retículo sarcoplásmico almacena calcio, y los túbulos T, que son pliegues de la membrana, llevan el impulso eléctrico hasta el centro de la célula.",
      n3:"Hay tres tejidos musculares y conviene compararlos de verdad. El esquelético es voluntario, muy estriado, con muchos núcleos por célula pegados a la membrana, contracción rápida y fatigable. El cardíaco es involuntario, también estriado, con uno o dos núcleos centrales, células ramificadas unidas por discos intercalares que dejan pasar la señal de una a otra —por eso el corazón late como un todo— y es prácticamente infatigable, con muchísimas mitocondrias. El liso, en las paredes del intestino, los vasos y el útero, es involuntario, no tiene estrías porque sus filamentos no se alinean en sarcómeros, tiene un solo núcleo central, se contrae despacio y puede mantener la contracción durante horas gastando poquísima energía.",
      dato:"Una fibra muscular es una sola célula con cientos de núcleos: nace de la fusión de muchas células embrionarias.",
      conecta:["sarcomero","union-neuromuscular","triceps-sural"], temas:["Histología","Tipos de músculo","Célula"],
      partes:[
        {n:"Músculo entero y epimisio", d:"El órgano completo, envuelto en su vaina externa de tejido conectivo.", at:[4.38,4.02,0.42], sub:"musculo"},
        {n:"Fascículo y perimisio", d:"El manojo de fibras y la vaina que lo agrupa: los «hilos» visibles de la carne.", at:[5.72,4.02,0.42], sub:"fasciculo"},
        {n:"Fibra muscular (célula)", d:"Una sola célula multinucleada, de 10 a 100 µm de grosor y hasta varios centímetros de largo.", at:[4.65,3.12,0.40], sub:"fibra"},
        {n:"Núcleos periféricos", d:"Cientos de núcleos empujados contra la membrana por las miofibrillas.", at:[4.65,3.34,0.56], sub:"nucleos"},
        {n:"Miofibrillas", d:"Los cilindros estriados del interior: cada uno es una fila de sarcómeros.", at:[4.95,3.06,0.46], sub:"miofibrilla"},
        {n:"Retículo sarcoplásmico y túbulos T", d:"El almacén de calcio que envuelve cada miofibrilla y los pliegues que llevan el impulso al interior.", at:[5.30,3.18,0.50], sub:"reticulo"},
        {n:"Tejido esquelético", d:"Voluntario, estriado, muchos núcleos periféricos, rápido y fatigable.", at:[4.16,2.22,0.50], sub:"esqueletico"},
        {n:"Tejido cardíaco", d:"Involuntario, estriado, células ramificadas con discos intercalares, casi infatigable.", at:[5.02,2.22,0.50], sub:"cardiaco"},
        {n:"Tejido liso", d:"Involuntario, sin estrías, un núcleo central, lento y muy económico.", at:[5.86,2.22,0.50], sub:"liso"}
      ],
      quiz:{q:"¿Cuál es la diferencia real entre el músculo cardíaco y el esquelético?", ops:["El cardíaco no tiene estrías y el esquelético sí","Los dos son estriados, pero el cardíaco es involuntario, sus células están ramificadas y unidas por discos intercalares, y casi no se fatiga","El cardíaco es en realidad músculo liso"], ok:1,
        fb:"Los dos tienen sarcómeros y por eso los dos se ven estriados. Lo que cambia es el control, la forma de las células, su unión eléctrica y su resistencia a la fatiga. Puedes verlo en el modelo del corazón.",
        wrong:["El cardíaco sí tiene estrías: su mecanismo de contracción es el mismo del esquelético, con actina y miosina en sarcómeros.","El liso es otro tejido distinto: sin estrías, con un núcleo central y contracción lenta y sostenida, como en el intestino."]}},

    {id:"sarcomero", nombre:"Sarcómero: actina, miosina y bandas (lupa)", capa:"micro", color:"#6C4AB6", pos:[5.00,0.00,0.40], lbl:[5.30,1.92,0.45],
      n1:"La unidad que se repite dentro de cada miofibrilla, entre dos líneas Z. Mide unos 2 µm en reposo y es donde se fabrica la fuerza.",
      n2:"Contiene dos tipos de filamentos. Los finos, de actina, se anclan en las líneas Z de los extremos y apuntan hacia el centro; los gruesos, de miosina, ocupan la parte central. De esa disposición salen las bandas que se ven al microscopio: la banda A es la longitud del filamento grueso (oscura, unos 1,6 µm); la banda I es la zona donde solo hay actina (clara) y queda a ambos lados de cada línea Z; la zona H es la parte central donde solo hay miosina, sin solapamiento, y la línea M la sujeta por el medio. Al contraerse, la miosina tira de la actina hacia el centro: las líneas Z se acercan, la banda I se estrecha y la zona H se estrecha o desaparece, pero la banda A no cambia de anchura porque el filamento grueso sigue midiendo lo mismo.",
      n3:"Esa última observación fue la prueba decisiva. En 1954, Hugh Huxley y Jean Hanson, por un lado, y Andrew Huxley y Rolf Niedergerke, por otro, publicaron en el mismo número de Nature que las bandas A no se acortan: los filamentos no se encogen, se deslizan. Hay además un tercer filamento, la titina, la proteína más grande del cuerpo humano, que une la línea Z con la línea M y actúa como un resorte que devuelve el sarcómero a su longitud. De ahí la relación longitud-tensión: un sarcómero demasiado estirado tiene poco solapamiento y un sarcómero demasiado corto tiene los filamentos chocando, así que en ambos extremos el músculo genera menos fuerza. Existe una longitud óptima, alrededor de 2,0 a 2,2 µm.",
      dato:"Los filamentos nunca se acortan: solo se deslizan unos sobre otros. La banda A lo demuestra.",
      conecta:["fibra","union-neuromuscular","biceps"], temas:["Filamento deslizante","ATP","Historia de la ciencia"],
      partes:[
        {n:"Línea Z", d:"El borde del sarcómero. Ancla los filamentos finos; dos líneas Z se acercan al contraerse.", at:[6.02,0.00,0.40], sub:"linea-z"},
        {n:"Filamentos de actina", d:"Los finos, anclados en la línea Z. Se deslizan hacia el centro, no se acortan.", at:[5.62,0.22,0.40], sub:"actina"},
        {n:"Filamentos de miosina", d:"Los gruesos del centro, con cabezas que forman los puentes cruzados.", at:[5.00,0.26,0.40], sub:"miosina"},
        {n:"Cabezas de miosina", d:"Los puentes cruzados: se unen a la actina, dan el golpe de fuerza y se sueltan con ATP.", at:[5.22,0.12,0.40], sub:"cabezas"},
        {n:"Banda A, banda I y zona H", d:"Las marcas de arriba: la A no cambia de anchura; la I y la H se estrechan.", at:[5.00,0.74,0.40], sub:"bandas"},
        {n:"Tropomiosina y troponina", d:"La cinta que tapa los sitios de unión de la actina y el interruptor que la aparta cuando llega el calcio.", at:[5.45,-0.32,0.40], sub:"tropo"},
        {n:"Retículo sarcoplásmico", d:"El almacén de calcio que rodea la miofibrilla y lo libera al llegar el impulso.", at:[5.00,-0.66,0.40], sub:"reticulo"}
      ],
      quiz:{q:"Al contraerse el músculo, ¿qué le pasa a la banda A?", ops:["Se estrecha, como la banda I","No cambia de anchura, porque el filamento grueso mide siempre lo mismo","Desaparece por completo"], ok:1,
        fb:"Esta es la observación que demostró la teoría del filamento deslizante: si los filamentos se acortaran, la banda A tendría que estrecharse, y no lo hace.",
        wrong:["La banda I sí se estrecha, porque es la parte de actina que aún no está solapada con la miosina. La A es la longitud del filamento grueso y no cambia.","La que puede desaparecer es la zona H, cuando los filamentos finos llegan a solaparse en el centro."]}},

    {id:"union-neuromuscular", nombre:"Unión neuromuscular y placa motora (lupa)", capa:"nervio", color:"#E0B050", pos:[5.00,-3.10,0.40], lbl:[4.90,-4.80,0.45],
      n1:"La sinapsis donde un nervio da la orden a una fibra muscular. Sin ella, el músculo está sano pero no se mueve.",
      n2:"El axón de una motoneurona llega al músculo, pierde su mielina y se ensancha en un terminal lleno de vesículas cargadas de acetilcolina. Cuando el impulso llega, entra calcio al terminal y las vesículas vuelcan su contenido en la hendidura sináptica, un espacio de unos 50 nm. La acetilcolina cruza y se une a receptores de la placa motora, la membrana plegada de la fibra, y desencadena un potencial de acción que recorre el sarcolema y baja por los túbulos T. Allí ordena al retículo sarcoplásmico que suelte calcio; el calcio se une a la troponina, la troponina mueve la tropomiosina y quedan libres los sitios de la actina donde la miosina puede engancharse. Después, la enzima acetilcolinesterasa destruye la acetilcolina y la señal se apaga.",
      n3:"Una motoneurona y todas las fibras que inerva forman una unidad motora, y siempre se contraen todas juntas. El tamaño de la unidad decide para qué sirve el músculo: en los músculos del ojo una neurona controla menos de diez fibras, y eso da una precisión extraordinaria; en el glúteo mayor puede controlar más de mil, y eso da fuerza bruta. Además, el cuerpo recluta según el principio del tamaño: primero entran las unidades pequeñas y lentas, y solo si hace falta más fuerza se suman las grandes y rápidas. Por eso levantas una pluma o un costal con el mismo músculo: no cambias de músculo, cambias cuántas unidades motoras enciendes. Esta sinapsis es además un punto vulnerable: el curare y la toxina botulínica la bloquean, en la miastenia gravis el sistema inmunitario ataca sus receptores, y los plaguicidas organofosforados —de uso frecuente en la agricultura y la floricultura en el Ecuador— inhiben la acetilcolinesterasa, de modo que la acetilcolina no se retira y el músculo queda en contracción mantenida.",
      dato:"Una pluma o un costal: el mismo músculo, distinto número de unidades motoras encendidas.",
      conecta:["sarcomero","fibra","biceps"], temas:["Unidad motora","Sinapsis","Salud laboral"],
      partes:[
        {n:"Axón de la motoneurona", d:"La fibra nerviosa mielinizada que trae la orden desde la médula espinal.", at:[3.95,-2.20,0.40], sub:"axon"},
        {n:"Terminal y vesículas", d:"El ensanchamiento final, cargado de vesículas con acetilcolina.", at:[4.95,-2.72,0.42], sub:"terminal"},
        {n:"Hendidura sináptica", d:"El espacio de unos 50 nm que la acetilcolina debe cruzar. El nervio y el músculo no se tocan.", at:[4.95,-2.98,0.42]},
        {n:"Placa motora y receptores", d:"La membrana plegada de la fibra, con los receptores donde encaja la acetilcolina.", at:[4.95,-3.16,0.42], sub:"placa"},
        {n:"Fibra muscular inervada", d:"La célula que recibe la orden; una motoneurona inerva muchas a la vez: es una unidad motora.", at:[4.95,-3.62,0.40], sub:"fibra"}
      ],
      quiz:{q:"Puedes levantar una pluma o un costal con el mismo bíceps. ¿Cómo regula el cuerpo esa diferencia de fuerza?", ops:["Contrayendo cada fibra con más o menos intensidad, según haga falta","Encendiendo más o menos unidades motoras: primero las pequeñas y lentas, después las grandes y rápidas","Cambiando la velocidad del impulso nervioso"], ok:1,
        fb:"Una fibra se contrae o no se contrae, sin términos medios (ley del todo o nada). La fuerza se gradúa reclutando más unidades motoras y aumentando su frecuencia de disparo.",
        wrong:["Cada fibra responde con todo lo que tiene: no hay medias contracciones. Lo que se gradúa es cuántas fibras participan.","La velocidad del impulso a lo largo del axón es prácticamente constante; lo que cambia es cuántas neuronas se activan y con qué frecuencia disparan."]}}
  ],
  guiada:[
    {tipo:"select", txt:"Empieza por un par antagonista: selecciona el <b>bíceps braquial</b> y fíjate dónde nace y dónde se inserta.", target:"biceps"},
    {tipo:"anim", txt:"Activa <b>Flexión del codo</b> y observa qué hace el bíceps y qué hace el tríceps <i>al mismo tiempo</i>.", target:"codo"},
    {tipo:"select", txt:"Ahora selecciona el <b>tríceps braquial</b>, el músculo que devuelve el codo a su posición.", target:"triceps"},
    {tipo:"select", txt:"Sube a la primera lupa, arriba a la derecha: selecciona <b>Del músculo a la miofibrilla</b> y usa 🔍 Ver en detalle para recorrer las tres envolturas y los tres tipos de tejido.", target:"fibra"},
    {tipo:"select", txt:"Baja a la segunda lupa y selecciona el <b>sarcómero</b>. Localiza las dos líneas Z, la banda A y la zona H antes de animar nada.", target:"sarcomero"},
    {tipo:"anim", txt:"Activa <b>Filamento deslizante</b> y vigila las barras de colores de arriba: ¿cuál cambia de anchura y cuál no?", target:"deslizante"},
    {tipo:"select", txt:"Ve a la tercera lupa: selecciona la <b>unión neuromuscular</b> y busca las vesículas dentro del terminal.", target:"union-neuromuscular"},
    {tipo:"anim", txt:"Activa <b>Del nervio al calcio</b> y sigue la cadena completa: acetilcolina, placa motora, túbulos T, calcio y tropomiosina.", target:"activacion"},
    {tipo:"text", txt:"Explica con tus palabras por qué se dice que los filamentos «se deslizan» y no «se encogen», qué observación de las bandas lo demuestra, y qué papel cumplen el calcio y el ATP en el ciclo. Tu respuesta se guardará en el cuaderno."}
  ]
};

Object.assign(BIO.activities, {
  "explorar-muscular":{t:"Explorar el sistema muscular", unidad:6, peso:15, xp:60},
  "guiada-muscular":{t:"Exploración guiada del sistema muscular", unidad:6, peso:10, xp:80},
  "reto-muscular":{t:"Reto del músculo: la teoría del filamento deslizante", unidad:6, peso:10, xp:70}
});
</script>
<script>
/* =====================================================================
   MODELO 3D DEL SISTEMA MUSCULAR
   Escala del cuerpo: 1 unidad ≈ 14 cm (la misma del sistema esquelético)
   Lupas: LF (músculo→miofibrilla), LS (sarcómero), LU (unión neuromuscular)
   ===================================================================== */
function buildMuscle(E){
  orgvFrame(E, 1.25);
  const low = E.low, D = BIO.muscle;
  const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const CEN = new THREE.Vector3(0, 1.4, 0);
  const add = (id, meshes, extra={}) => { const s = S[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, explodeDir:V3(s.pos).sub(CEN).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl); return p; };
  const SEG = (a,b) => low ? a : b;
  const RND = Kit.rng(71);
  /* el render escribe en sRGB y trata el color del material como lineal */
  const sRGB = hex => { const c = new THREE.Color(hex); return c.setRGB(Math.pow(c.r,2.2), Math.pow(c.g,2.2), Math.pow(c.b,2.2)); };
  const plain = (c, o={}) => Kit.tissue(Object.assign({ rough:0.55, coat:0.25, coatRough:0.4, env:0.5 }, o, { color:sRGB(c) }));
  const flat  = c => new THREE.MeshStandardMaterial({ color:sRGB(c), roughness:0.8, metalness:0, envMapIntensity:0 });
  /* músculo: textura de miocardio (fibras rojas) teñida */
  /* músculo estriado: fascículos longitudinales con perimisio claro y fibras finas; epimisio con brillo húmedo */
  const musMat = (tint, rep) => orgvTex.mat({ color:tint || 0xFFFFFF, tex:'muscle', rep:rep ? [rep[0], Math.max(1, Math.round(rep[1]/3))] : [1,2], bump:0.026, rough:0.5, coat:0.55, coatRough:0.26, env:0.7 });
  const tendonMat = () => orgvTex.mat({ tex:'tendon', rep:[1,3], bump:0.01, rough:0.36, coat:0.65, coatRough:0.22, env:0.75 });
  const boneMat = () => orgvTex.mat({ color:0xF6F0E4, tex:'bone', rep:[2,4], bump:0.012, rough:0.56, coat:0.26, coatRough:0.42, env:0.55 });
  const glassMat = (c, op) => Kit.tissue({ color:sRGB(c), transparent:true, opacity:op, rough:0.12, coat:1, coatRough:0.12, depthWrite:false, side:THREE.DoubleSide });
  /* vientre fusiforme: extremos finos (tendón) y panza gruesa */
  const belly = (pts, rEnd, rMid, skew) => Kit.taper(pts, 0, 0,
    { rfn: u => rEnd + (rMid - rEnd) * Math.sin(Math.PI * Math.pow(u, skew || 1)), seg:SEG(9,16), rad:SEG(7,11) });
  const rod = (pts, r0, r1, seg, rad) => Kit.taper(pts, r0, r1, { seg:seg || SEG(6,10), rad:rad || SEG(6,9) });
  const mesh = (geos, mat, sub) => { const m = new THREE.Mesh(Kit.merge(geos), mat); if (sub) m.userData.sub = sub; return m; };
  const V = (x,y,z) => new THREE.Vector3(x,y,z);

  /* ===================== ARMAZÓN ÓSEO DE REFERENCIA =====================
     No es seleccionable: solo sitúa los músculos. El esqueleto completo
     vive en #/explorar/esqueletico                                       */
  const ELBOW = V(-1.62, 1.62, 0.00);         /* codo del lado izquierdo del modelo: pivote de la flexión */
  const armFlex = [];                          /* mallas que giran con el antebrazo */
  const pivotMesh = (geos, mat, sub) => { const g = Kit.merge(geos); g.translate(-ELBOW.x, -ELBOW.y, -ELBOW.z);
    const m = new THREE.Mesh(g, mat); m.position.copy(ELBOW); if (sub) m.userData.sub = sub; armFlex.push(m); return m; };

  const frameG = [];
  { /* cráneo y cuello */
    const sk = new THREE.SphereGeometry(1, SEG(18,28), SEG(14,20)); sk.scale(0.58, 0.62, 0.66); sk.translate(0, 5.52, 0.02); frameG.push(sk);
    const jaw = new THREE.SphereGeometry(0.30, SEG(10,14), SEG(8,11)); jaw.scale(0.95, 0.60, 0.95); jaw.translate(0, 4.78, 0.24); frameG.push(jaw);
    frameG.push(rod([V(0,4.35,0.02), V(0,5.00,0.06)], 0.20, 0.17));
    /* columna */
    frameG.push(rod([V(0,4.40,0.10), V(0,3.60,-0.16), V(0,2.60,-0.10), V(0,1.70,0.06), V(0,0.85,-0.02)], 0.13, 0.17, SEG(10,16)));
    /* caja torácica */
    const RW = [[0.60,0.40],[0.80,0.55],[0.95,0.68],[1.05,0.76],[1.09,0.80],[1.06,0.78],[0.98,0.72]];
    RW.forEach((w, i) => { const t = new THREE.TorusGeometry(1, 0.044, SEG(5,6), SEG(16,26)); t.rotateX(Math.PI/2);
      t.scale(w[0], 1, w[1]); t.translate(0, 4.02 - 0.255*i, 0.10 + 0.02*i); frameG.push(t); });
    const st = new THREE.BoxGeometry(0.26, 1.55, 0.10); st.translate(0, 3.35, 0.60); frameG.push(st);
    /* pelvis */
    const pv = new THREE.TorusGeometry(1, 0.10, SEG(6,8), SEG(18,28)); pv.rotateX(Math.PI/2); pv.scale(0.80, 1, 0.56);
    pv.translate(0, 0.62, 0.00); frameG.push(pv);
    [-1,1].forEach(s => { const il = new THREE.SphereGeometry(1, SEG(12,18), SEG(9,13)); il.scale(0.08, 0.46, 0.44);
      il.translate(s*0.74, 0.95, 0.00); frameG.push(il); });
  }
  [-1,1].forEach(s => {
    frameG.push(rod([V(s*0.14,4.06,0.58), V(s*0.70,4.14,0.44), V(s*1.36,4.02,0.02)], 0.055, 0.048));
    frameG.push(rod([V(s*1.42,3.82,-0.02), V(s*1.62,1.62,0.00)], 0.10, 0.09, SEG(8,12)));
    frameG.push(rod([V(s*0.88,0.25,0.05), V(s*0.80,-1.30,0.08), V(s*0.74,-2.72,0.03)], 0.13, 0.12, SEG(8,12)));
    frameG.push(rod([V(s*0.74,-2.85,0.03), V(s*0.76,-5.35,0.00)], 0.13, 0.08, SEG(8,12)));
    const pat = new THREE.SphereGeometry(1, SEG(10,14), SEG(8,11)); pat.scale(0.12, 0.16, 0.06);
    pat.translate(s*0.74, -2.55, 0.34); frameG.push(pat);
    const foot = new THREE.SphereGeometry(1, SEG(12,16), SEG(9,12)); foot.scale(0.17, 0.13, 0.42);
    foot.translate(s*0.76, -5.72, 0.26); frameG.push(foot);
    if (s > 0){   /* este antebrazo queda fijo; el del otro lado gira con el codo */
      frameG.push(rod([V(s*1.60,1.60,-0.06), V(s*1.68,-0.20,0.02)], 0.075, 0.055));
      frameG.push(rod([V(s*1.74,1.58,0.08), V(s*1.80,-0.18,0.06)], 0.055, 0.065));
      const hd = new THREE.SphereGeometry(1, SEG(10,14), SEG(8,11)); hd.scale(0.17, 0.25, 0.10);
      hd.translate(s*1.76, -0.44, 0.08); frameG.push(hd);
    }
  });
  const frameMesh = new THREE.Mesh(Kit.merge(frameG), boneMat()); E.scene.add(frameMesh);

  /* antebrazo derecho: gira con el codo (hueso + masa muscular no detallada) */
  const fArmBone = pivotMesh([
    rod([V(-1.60,1.60,-0.06), V(-1.68,-0.20,0.02)], 0.075, 0.055),
    rod([V(-1.74,1.58,0.08), V(-1.80,-0.18,0.06)], 0.055, 0.065),
    (() => { const hd = new THREE.SphereGeometry(1, SEG(10,14), SEG(8,11)); hd.scale(0.17, 0.25, 0.10); hd.translate(-1.76,-0.44,0.08); return hd; })()
  ], boneMat());
  const fArmMus = pivotMesh([ belly([V(-1.66,1.52,0.02), V(-1.72,0.78,0.06), V(-1.76,-0.06,0.04)], 0.09, 0.20, 0.7) ],
    musMat(0xE8B4A6, [1,4]));
  E.scene.add(fArmBone, fArmMus);

  /* ========================= PECTORAL MAYOR ========================= */
  { const clav = [], stern = [], tend = [];
    [-1,1].forEach(s => { const P = V(s*1.28, 3.62, 0.18);
      const orig = [[0.12,3.98,0.50,'c'],[0.10,3.62,0.62,'e'],[0.10,3.22,0.64,'e'],[0.12,2.86,0.58,'e'],[0.16,2.56,0.48,'e']];
      orig.forEach(([ox,oy,oz,k]) => { const O = V(s*ox, oy, oz);
        const mid = O.clone().lerp(P, 0.5).add(V(0, 0.04, 0.20));
        const g = Kit.taper([O, mid, P], 0, 0, { rfn:u => 0.17 - 0.10*u + 0.05*Math.sin(Math.PI*u), seg:SEG(8,14), rad:SEG(7,10) });
        (k === 'c' ? clav : stern).push(g); });
      tend.push(rod([P, V(s*1.36, 3.58, 0.10)], 0.09, 0.07));
    });
    add('pectoral', [ mesh(clav, musMat(0xFFC9B8, [1,4]), 'clavicular'),
                      mesh(stern, musMat(0xFFD2C0, [1,4]), 'esternocostal'),
                      mesh(tend, tendonMat(), 'tendon') ]);
  }

  /* ============================ DELTOIDES ============================ */
  { const ant = [], med = [], post = [];
    [-1,1].forEach(s => { const T = V(s*1.52, 2.74, 0.02);
      const fan = (O, list) => list.push(Kit.taper([O, O.clone().lerp(T,0.5).add(V(s*0.10,0,0.02)), T], 0, 0,
        { rfn:u => 0.14 - 0.09*u + 0.06*Math.sin(Math.PI*u), seg:SEG(7,12), rad:SEG(7,10) }));
      [[0.76,4.06,0.40],[1.02,4.06,0.30]].forEach(p => fan(V(s*p[0],p[1],p[2]), ant));
      [[1.24,4.14,0.12],[1.40,4.12,-0.02],[1.32,4.08,-0.18]].forEach(p => fan(V(s*p[0],p[1],p[2]), med));
      [[1.08,3.94,-0.48],[0.86,3.86,-0.56]].forEach(p => fan(V(s*p[0],p[1],p[2]), post));
    });
    add('deltoides', [ mesh(ant, musMat(0xFFC6B4, [1,4]), 'anterior'),
                       mesh(med, musMat(0xFFD4C2, [1,4]), 'medio'),
                       mesh(post, musMat(0xF0B8A8, [1,4]), 'posterior') ]);
  }

  /* ===================== BÍCEPS Y TRÍCEPS BRAQUIAL =====================
     El lado derecho (x>0) se anima: sus mallas pivotan en el hombro     */
  const SHO = V(-1.42, 3.82, -0.02);
  const armMove = { biceps:[], triceps:[] };
  const shoulderMesh = (geos, mat, sub, bag) => { const g = Kit.merge(geos); g.translate(-SHO.x, -SHO.y, -SHO.z);
    const m = new THREE.Mesh(g, mat); m.position.copy(SHO); if (sub) m.userData.sub = sub; if (bag) bag.push(m); return m; };
  { const L ={ larga:[], corta:[], vientre:[], tendon:[] }, Rt = { larga:[], corta:[], vientre:[], tendon:[] };
    [-1,1].forEach(s => { const B = s < 0 ? Rt : L; const J = V(s*1.60, 1.92, 0.24);
      B.larga.push(belly([V(s*1.30,3.70,0.10), V(s*1.44,3.00,0.22), V(s*1.54,2.42,0.26)], 0.055, 0.115, 0.9));
      B.corta.push(belly([V(s*1.12,3.70,0.24), V(s*1.34,3.02,0.30), V(s*1.52,2.42,0.28)], 0.050, 0.105, 0.9));
      B.vientre.push(belly([V(s*1.53,2.50,0.27), V(s*1.57,2.16,0.26), J], 0.150, 0.190, 1.0));
      B.tendon.push(rod([J, V(s*1.66,1.66,0.20), V(s*1.70,1.44,0.14)], 0.055, 0.038));
    });
    const bm = musMat(0xFFCFBE, [1,5]), bt = tendonMat();
    const meshes = [
      mesh(L.larga, bm, 'larga'), mesh(L.corta, bm, 'corta'), mesh(L.vientre, bm, 'vientre'), mesh(L.tendon, bt, 'tendon'),
      shoulderMesh(Rt.larga, bm, 'larga', armMove.biceps), shoulderMesh(Rt.corta, bm, 'corta', armMove.biceps),
      shoulderMesh(Rt.vientre, bm, 'vientre', armMove.biceps), shoulderMesh(Rt.tendon, bt, 'tendon', armMove.biceps)
    ];
    add('biceps', meshes, { explodeDir:V(0.6, 0.2, 0.8).normalize() });
  }
  { const L = { larga:[], lateral:[], medial:[], tendon:[] }, Rt = { larga:[], lateral:[], medial:[], tendon:[] };
    [-1,1].forEach(s => { const B = s < 0 ? Rt : L; const O = V(s*1.56, 2.02, -0.24);
      B.larga.push(belly([V(s*1.24,3.58,-0.30), V(s*1.42,2.86,-0.32), O], 0.055, 0.115, 0.9));
      B.lateral.push(belly([V(s*1.60,3.16,-0.16), V(s*1.62,2.62,-0.22), O], 0.050, 0.100, 0.9));
      B.medial.push(belly([V(s*1.62,2.52,-0.10), V(s*1.60,2.28,-0.16), O], 0.048, 0.085, 0.9));
      B.tendon.push(rod([O, V(s*1.55,1.74,-0.20)], 0.095, 0.070));
    });
    const tm = musMat(0xF2B4A4, [1,5]), tt = tendonMat();
    const meshes = [
      mesh(L.larga, tm, 'larga'), mesh(L.lateral, tm, 'lateral'), mesh(L.medial, tm, 'medial'), mesh(L.tendon, tt, 'tendon'),
      shoulderMesh(Rt.larga, tm, 'larga', armMove.triceps), shoulderMesh(Rt.lateral, tm, 'lateral', armMove.triceps),
      shoulderMesh(Rt.medial, tm, 'medial', armMove.triceps), shoulderMesh(Rt.tendon, tt, 'tendon', armMove.triceps)
    ];
    add('triceps', meshes, { explodeDir:V(0.6, 0.1, -0.8).normalize() });
  }

  /* ===================== RECTO DEL ABDOMEN Y OBLICUOS ===================== */
  { const recto = [], inter = [], alba = [], obl = [];
    [-1,1].forEach(s => {
      const rows = [[2.62,0.20,0.62],[2.20,0.21,0.63],[1.78,0.21,0.62],[1.34,0.21,0.58],[0.82,0.24,0.50]];
      rows.forEach((r, i) => { const g = new THREE.SphereGeometry(1, SEG(12,18), SEG(9,13));
        g.scale(0.20, i === 4 ? 0.26 : 0.19, 0.10); g.translate(s*0.25, r[0], r[2]); recto.push(g); });
      [2.41, 1.99, 1.56].forEach(y => { const b = new THREE.BoxGeometry(0.44, 0.05, 0.13); b.translate(s*0.25, y, 0.60); inter.push(b); });
      /* oblicuo externo: tres bandas en diagonal de las costillas a la cresta ilíaca */
      [[0.98,2.68,0.26, 0.58,0.92,0.44],[1.02,2.30,0.34, 0.66,0.78,0.48],[0.96,1.92,0.42, 0.44,0.60,0.52]].forEach(p => {
        obl.push(Kit.taper([V(s*p[0],p[1],p[2]), V(s*(p[0]+p[3])/2*1.05, (p[1]+p[4])/2, (p[2]+p[5])/2 + 0.06), V(s*p[3],p[4],p[5])],
          0, 0, { rfn:u => 0.16 - 0.03*u, seg:SEG(6,10), rad:SEG(6,9) })); });
    });
    { const b = new THREE.BoxGeometry(0.07, 2.30, 0.10); b.translate(0, 1.72, 0.62); alba.push(b); }
    add('abdominales', [ mesh(recto, musMat(0xFFCCBA, [2,2]), 'recto'),
                         mesh(inter, tendonMat(), 'intersecciones'),
                         mesh(alba, tendonMat(), 'alba'),
                         mesh(obl, musMat(0xF6BCAC, [1,3]), 'oblicuo') ]);
  }

  /* ===================== TRAPECIO Y DORSAL ANCHO ===================== */
  { const trap = [], dors = [], fasc = [];
    [-1,1].forEach(s => {
      const trapTo = [[1.28,4.02,-0.30],[1.28,4.02,-0.30],[1.10,4.00,-0.42],[0.92,3.96,-0.50],[0.80,3.92,-0.52],[0.76,3.90,-0.52]];
      [[0,5.02,-0.26],[0,4.58,-0.40],[0,4.12,-0.48],[0,3.58,-0.52],[0,3.02,-0.54],[0,2.52,-0.50]].forEach((o, i) => {
        const O = V(o[0], o[1], o[2]), T = V(s*trapTo[i][0], trapTo[i][1], trapTo[i][2]);
        trap.push(Kit.taper([O, O.clone().lerp(T,0.5).add(V(0,0.02,-0.06)), T], 0, 0,
          { rfn:u => 0.115 - 0.02*u + 0.03*Math.sin(Math.PI*u), seg:SEG(6,11), rad:SEG(6,9) })); });
      const H = V(s*1.28, 3.56, -0.08);
      [[0,2.26,-0.54],[0,1.84,-0.54],[0,1.42,-0.50],[s*0.52,1.06,-0.42],[s*0.86,1.66,-0.34]].forEach(o => {
        const O = V(o[0], o[1], o[2]);
        dors.push(Kit.taper([O, O.clone().lerp(H,0.55).add(V(0,-0.04,-0.08)), H], 0, 0,
          { rfn:u => 0.135 - 0.05*u + 0.04*Math.sin(Math.PI*u), seg:SEG(7,12), rad:SEG(6,9) })); });
    });
    { const f = new THREE.SphereGeometry(1, SEG(12,18), SEG(9,13)); f.scale(0.42, 0.52, 0.10); f.translate(0, 1.58, -0.54); fasc.push(f); }
    add('dorsal-trapecio', [ mesh(trap, musMat(0xF0B0A0, [1,4]), 'trapecio'),
                             mesh(dors, musMat(0xE8A697, [1,4]), 'dorsal'),
                             mesh(fasc, tendonMat(), 'fascia') ], { explodeDir:V(0, 0.2, -1).normalize() });
  }

  /* ============================ GLÚTEOS ============================ */
  { const may = [], med = [];
    [-1,1].forEach(s => {
      const g = Kit.sculpt({ w:SEG(16,26), h:SEG(12,20),
        shape: d => V(0.44*d.x, 0.60*d.y, 0.34*d.z + 0.05*d.y),
        disp: p => 0.022*Kit.fbm(p.x*6 + s, p.y*6, p.z*6, 2) });
      g.rotateZ(s*0.22); g.translate(s*0.70, 0.10, -0.50); may.push(g);
      const m2 = new THREE.SphereGeometry(1, SEG(12,18), SEG(9,13)); m2.scale(0.24, 0.34, 0.18);
      m2.rotateZ(s*0.30); m2.translate(s*0.92, 0.86, -0.34); med.push(m2);
    });
    add('gluteo', [ mesh(may, musMat(0xF2B2A2, [2,2]), 'mayor'), mesh(med, musMat(0xE9A696, [2,2]), 'medio') ],
      { explodeDir:V(0, -0.1, -1).normalize() });
  }

  /* =========================== CUÁDRICEPS =========================== */
  { const rec = [], lat = [], med = [], tnd = [];
    [-1,1].forEach(s => { const P = V(s*0.74, -2.48, 0.32);
      rec.push(belly([V(s*0.82,0.66,0.32), V(s*0.82,-0.90,0.44), P], 0.075, 0.170, 0.95));
      lat.push(belly([V(s*1.06,0.18,0.10), V(s*1.02,-1.20,0.28), V(s*0.86,-2.30,0.30)], 0.070, 0.190, 0.85));
      med.push(belly([V(s*0.60,-0.50,0.16), V(s*0.56,-1.60,0.28), V(s*0.60,-2.38,0.32)], 0.060, 0.170, 1.7));
      tnd.push(rod([P, V(s*0.74,-2.66,0.34), V(s*0.74,-2.98,0.26)], 0.085, 0.070));
    });
    add('cuadriceps', [ mesh(rec, musMat(0xFFCCBA, [1,5]), 'recto'),
                        mesh(lat, musMat(0xFFC4B2, [1,5]), 'lateral'),
                        mesh(med, musMat(0xFFD6C4, [1,5]), 'medial'),
                        mesh(tnd, tendonMat(), 'tendon') ], { explodeDir:V(0.3, -0.2, 1).normalize() });
  }

  /* ========================= ISQUIOTIBIALES ========================= */
  { const bf = [], st = [], sm = [];
    [-1,1].forEach(s => { const O = V(s*0.62, -0.18, -0.40);
      bf.push(belly([O, V(s*0.94,-1.70,-0.34), V(s*1.00,-2.92,-0.20)], 0.060, 0.150, 1.0));
      st.push(belly([O, V(s*0.52,-1.80,-0.34), V(s*0.54,-2.96,-0.22)], 0.055, 0.130, 1.0));
      sm.push(belly([O.clone().add(V(0,0,-0.06)), V(s*0.66,-1.60,-0.44), V(s*0.62,-2.86,-0.30)], 0.055, 0.135, 1.0));
    });
    add('isquiotibiales', [ mesh(bf, musMat(0xEFAE9E, [1,5]), 'biceps-f'),
                            mesh(st, musMat(0xE8A798, [1,5]), 'semiten'),
                            mesh(sm, musMat(0xDFA092, [1,5]), 'semimem') ], { explodeDir:V(0.3, -0.2, -1).normalize() });
  }

  /* ====================== GASTROCNEMIO Y SÓLEO ====================== */
  { const gas = [], sol = [], aq = [];
    [-1,1].forEach(s => {
      gas.push(belly([V(s*0.58,-2.60,-0.26), V(s*0.62,-3.30,-0.34), V(s*0.74,-4.02,-0.28)], 0.060, 0.155, 0.75));
      gas.push(belly([V(s*0.92,-2.60,-0.24), V(s*0.90,-3.30,-0.32), V(s*0.80,-3.98,-0.28)], 0.055, 0.135, 0.75));
      sol.push(belly([V(s*0.78,-3.00,-0.16), V(s*0.78,-3.80,-0.24), V(s*0.77,-4.42,-0.24)], 0.080, 0.165, 0.9));
      aq.push(rod([V(s*0.77,-4.46,-0.26), V(s*0.76,-5.10,-0.30), V(s*0.76,-5.62,-0.26)], 0.060, 0.080));
    });
    add('triceps-sural', [ mesh(gas, musMat(0xF6BCAC, [1,5]), 'gastro'),
                           mesh(sol, musMat(0xE6A494, [1,5]), 'soleo'),
                           mesh(aq, tendonMat(), 'aquiles') ], { explodeDir:V(0.2, -0.4, -1).normalize() });
  }

  /* ============================ DIAFRAGMA ============================ */
  { const dg = new THREE.RingGeometry(0.001, 1.18, SEG(48,80), SEG(14,22)); dg.rotateX(-Math.PI/2);
    { const p = dg.attributes.position;
      for (let i=0;i<p.count;i++){ const x = p.getX(i), zr = p.getZ(i), z = zr*0.74; const r = Math.hypot(x, zr)/1.18;
        const y = 1.86 + 0.52*Math.exp(-((x+0.50)*(x+0.50)/0.42 + z*z/0.60))
                       + 0.46*Math.exp(-((x-0.50)*(x-0.50)/0.42 + z*z/0.60))
                       + 0.20*Math.exp(-(x*x/0.30 + z*z/0.40)) - 0.10*Math.pow(r,4);
        p.setXYZ(i, x, y, z); }
      dg.computeVertexNormals(); }
    const dia = new THREE.Mesh(dg, Kit.tissue({ color:0xFFC3AE, tex:'diaphragm', rep:[1,1], bump:0.014, coat:0.45, rough:0.5, side:THREE.DoubleSide }));
    dia.userData.sub = 'cupula';
    const ct = new THREE.RingGeometry(0.001, 0.34, SEG(20,32), 2); ct.rotateX(-Math.PI/2); ct.translate(0, 2.46, -0.02);
    const cen = new THREE.Mesh(ct, plain(0xE6DECB, { rough:0.42, coat:0.4, side:THREE.DoubleSide })); cen.userData.sub = 'centro';
    const pil = [-1,1].map(s => rod([V(s*0.22,1.98,-0.28), V(s*0.16,1.50,-0.34), V(s*0.10,1.12,-0.30)], 0.085, 0.060));
    add('diafragma', [dia, cen, mesh(pil, musMat(0xF0B4A2, [1,3]), 'pilares')], { explodeDir:V(0, 1, 0) });
  }

  /* ======================= LUPAS: aros y guías ======================= */
  const ringMat = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:false });
  const LF = V(5.00, 3.10, 0.40), LS = V(5.00, 0.00, 0.40), LU = V(5.00, -3.10, 0.40);
  const lupa = (c, rad, to) => { const r = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.022, 8, SEG(36,60)), ringMat);
    r.position.copy(c); r.lookAt(c.clone().add(V(-0.30, 0, 1)));
    const dir = to.clone().sub(c).normalize();
    const ld = new THREE.Mesh(Kit.taper([c.clone().addScaledVector(dir, rad), to], 0.011, 0.011, { seg:4, rad:6 }), ringMat);
    E.scene.add(r, ld); };
  lupa(LF, 1.50, V(1.72, 2.74, 0.28));    /* el músculo entero: el bíceps */
  lupa(LS, 1.50, V(5.00, 1.60, 0.40));    /* del músculo a la miofibrilla */
  lupa(LU, 1.35, V(5.00, -1.50, 0.40));   /* del sarcómero a la placa motora */

  /* ============ LUPA 1: MÚSCULO → FASCÍCULO → FIBRA → MIOFIBRILLA ============ */
  { const musG = [], epiG = [], fasG = [], perG = [], fibG = [], nucG = [], miofG = [], estG = [], retG = [], tubG = [];
    /* músculo entero con epimisio */
    musG.push(Kit.taper([V(LF.x-1.20, LF.y+0.92, LF.z), V(LF.x-0.62, LF.y+0.92, LF.z), V(LF.x-0.04, LF.y+0.92, LF.z)],
      0, 0, { rfn:u => 0.035 + 0.155*Math.sin(Math.PI*u), seg:SEG(10,16), rad:SEG(8,12) }));
    epiG.push(Kit.taper([V(LF.x-1.20, LF.y+0.92, LF.z), V(LF.x-0.62, LF.y+0.92, LF.z), V(LF.x-0.04, LF.y+0.92, LF.z)],
      0, 0, { rfn:u => 0.050 + 0.175*Math.sin(Math.PI*u), seg:SEG(10,16), rad:SEG(8,12) }));
    /* fascículo: 7 fibras en un manojo envuelto en perimisio */
    for (let k=0;k<7;k++){ const a = k/7*Math.PI*2, rr = k === 6 ? 0 : 0.078;
      const c = new THREE.CylinderGeometry(0.030, 0.030, 0.92, SEG(7,10), 1); c.rotateZ(Math.PI/2);
      c.translate(LF.x+0.66, LF.y + 0.92 + Math.sin(a)*rr, LF.z + Math.cos(a)*rr); fasG.push(c); }
    perG.push(rod([V(LF.x+0.18, LF.y+0.92, LF.z), V(LF.x+1.14, LF.y+0.92, LF.z)], 0.128, 0.128, SEG(6,10), SEG(10,16)));
    /* fibra muscular ampliada, semitransparente */
    fibG.push(rod([V(LF.x-1.12, LF.y+0.04, LF.z), V(LF.x+0.62, LF.y+0.04, LF.z)], 0.205, 0.205, SEG(8,14), SEG(12,20)));
    for (let k=0;k<8;k++){ const a = RND()*Math.PI*2, x = LF.x - 1.00 + 1.55*RND();
      const g = new THREE.SphereGeometry(0.048, SEG(7,10), SEG(6,8)); g.scale(1.6, 0.8, 0.8);
      g.translate(x, LF.y + 0.04 + Math.sin(a)*0.185, LF.z + Math.cos(a)*0.185); nucG.push(g); }
    for (let k=0;k<4;k++){ const a = k/4*Math.PI*2 + 0.4;
      const y = LF.y + 0.04 + Math.sin(a)*0.095, z = LF.z + Math.cos(a)*0.095;
      const c = new THREE.CylinderGeometry(0.040, 0.040, 1.64, SEG(7,10), 1); c.rotateZ(Math.PI/2); c.translate(LF.x-0.25, y, z); miofG.push(c);
      for (let j=0;j<9;j++){ const t = new THREE.TorusGeometry(0.043, 0.013, SEG(4,6), SEG(8,12)); t.rotateY(Math.PI/2);
        t.translate(LF.x - 1.02 + j*0.175, y, z); estG.push(t); } }
    /* retículo sarcoplásmico alrededor de una miofibrilla + túbulos T */
    { const y = LF.y + 0.04 + Math.sin(0.4)*0.095, z = LF.z + Math.cos(0.4)*0.095;
      for (let j=0;j<6;j++){ const t = new THREE.TorusGeometry(0.072, 0.016, SEG(4,6), SEG(10,16)); t.rotateY(Math.PI/2);
        t.translate(LF.x - 0.94 + j*0.30, y, z); retG.push(t); }
      [-1,1].forEach(o => retG.push(Kit.taper([V(LF.x-0.98, y + o*0.072, z), V(LF.x+0.62, y + o*0.072, z)], 0.017, 0.017, { seg:SEG(5,8), rad:SEG(5,7) })));
      [-0.46, 0.20].forEach(dx => { const t = new THREE.TorusGeometry(0.212, 0.020, SEG(4,6), SEG(12,20)); t.rotateY(Math.PI/2);
        t.translate(LF.x + dx, LF.y + 0.04, LF.z); tubG.push(t); }); }
    /* tres tipos de tejido muscular, comparados */
    const tEsq = [], tCar = [], tLis = [], tNuc = [], tDisc = [];
    { const y0 = LF.y - 0.88, z0 = LF.z + 0.12;
      const cx = LF.x - 0.84;
      const c = new THREE.CylinderGeometry(0.085, 0.085, 0.62, SEG(9,14), 1); c.rotateZ(Math.PI/2); c.translate(cx, y0, z0); tEsq.push(c);
      for (let j=0;j<7;j++){ const t = new THREE.TorusGeometry(0.088, 0.012, SEG(4,6), SEG(8,12)); t.rotateY(Math.PI/2);
        t.translate(cx - 0.26 + j*0.087, y0, z0); tEsq.push(t); }
      for (let j=0;j<4;j++){ const n = new THREE.SphereGeometry(0.032, SEG(6,8), SEG(5,7)); n.scale(1.5,0.8,0.8);
        n.translate(cx - 0.22 + j*0.15, y0 + 0.082, z0 + 0.03); tNuc.push(n); }
      const cx2 = LF.x + 0.02;
      const c2 = new THREE.CylinderGeometry(0.080, 0.080, 0.40, SEG(9,14), 1); c2.rotateZ(Math.PI/2); c2.translate(cx2 - 0.14, y0, z0); tCar.push(c2);
      [[0.22, 0.10],[0.22,-0.10]].forEach(([dx,dy]) => { const b = new THREE.CylinderGeometry(0.062, 0.062, 0.28, SEG(8,12), 1);
        b.rotateZ(Math.PI/2); b.rotateY(0); b.translate(cx2 + dx, y0 + dy, z0); tCar.push(b); });
      for (let j=0;j<5;j++){ const t = new THREE.TorusGeometry(0.083, 0.011, SEG(4,6), SEG(8,12)); t.rotateY(Math.PI/2);
        t.translate(cx2 - 0.28 + j*0.075, y0, z0); tCar.push(t); }
      [-0.34, 0.09].forEach(dx => { const d = new THREE.CylinderGeometry(0.092, 0.092, 0.028, SEG(8,12), 1); d.rotateZ(Math.PI/2);
        d.translate(cx2 + dx, y0, z0); tDisc.push(d); });
      { const n = new THREE.SphereGeometry(0.042, SEG(6,9), SEG(5,7)); n.translate(cx2 - 0.14, y0, z0 + 0.02); tNuc.push(n); }
      const cx3 = LF.x + 0.86;
      [[-0.16,0.09],[0.02,-0.02],[0.20,0.09],[0.04,0.18]].forEach(([dx,dy]) => {
        const sp = new THREE.SphereGeometry(1, SEG(9,13), SEG(7,10)); sp.scale(0.155, 0.045, 0.045);
        sp.translate(cx3 + dx, y0 + dy, z0); tLis.push(sp);
        const n = new THREE.SphereGeometry(0.028, SEG(6,8), SEG(5,7)); n.translate(cx3 + dx, y0 + dy, z0 + 0.02); tNuc.push(n); }); }

    add('fibra', [
      mesh(musG, musMat(0xFFC8B6, [1,4]), 'musculo'),
      mesh(epiG, glassMat(0xBFE2EC, 0.16), 'musculo'),
      mesh(fasG, musMat(0xFFD6C6, [1,4]), 'fasciculo'),
      mesh(perG, glassMat(0xA9D8E8, 0.22), 'fasciculo'),
      mesh(fibG, Kit.tissue({ color:sRGB(0xE59484), transparent:true, opacity:0.34, rough:0.3, coat:0.8, depthWrite:false, side:THREE.DoubleSide }), 'fibra'),
      mesh(nucG, plain(0x5B3E8C, { rough:0.45, coat:0.4 }), 'nucleos'),
      mesh(miofG, plain(0xD9705E, { rough:0.5, coat:0.35 }), 'miofibrilla'),
      mesh(estG, plain(0x6E2C24, { rough:0.6, coat:0.2 }), 'miofibrilla'),
      mesh(retG, glassMat(0x3FD0E0, 0.55), 'reticulo'),
      mesh(tubG, plain(0x2E6EA8, { rough:0.4, coat:0.5 }), 'reticulo'),
      mesh(tEsq, plain(0xC85A48, { rough:0.5, coat:0.35 }), 'esqueletico'),
      mesh(tCar, plain(0x9B3A32, { rough:0.5, coat:0.35 }), 'cardiaco'),
      mesh(tDisc, plain(0x3A1F1B, { rough:0.7, coat:0.1 }), 'cardiaco'),
      mesh(tLis, plain(0xE0A08C, { rough:0.55, coat:0.3 }), 'liso'),
      mesh(tNuc, plain(0x5B3E8C, { rough:0.45, coat:0.4 }), 'nucleos')
    ], { explodeDir:V(1, 0.5, 0.2).normalize() });
  }

  /* ================= LUPA 2: SARCÓMERO Y FILAMENTO DESLIZANTE ================= */
  const ZREST = 1.02, ZCONTR = 0.76, THICK = 0.66;   /* semilongitudes: Z, contraído, medio filamento grueso */
  const ACT = 0.72;                                   /* longitud del filamento fino */
  const ROWS = [[0.30,0.12],[0.30,-0.12],[-0.30,0.12],[-0.30,-0.12],[0.11,0.19],[-0.11,0.19],[0.11,-0.19],[-0.11,-0.19]];
  const half = {}, heads = [], tropo = [];
  { ['L','R'].forEach(side => { const s = side === 'L' ? -1 : 1; const g = [];
      const zd = new THREE.BoxGeometry(0.055, 0.86, 0.50); zd.translate(s*ZREST, 0, 0); g.push(zd);
      ROWS.forEach(([dy,dz]) => { const a = Kit.taper([V(s*ZREST, dy, dz), V(s*(ZREST-ACT), dy, dz)], 0.024, 0.024, { seg:SEG(3,5), rad:SEG(5,7) }); g.push(a); });
      const gm = Kit.merge(g); const m = new THREE.Mesh(gm, plain(side === 'L' ? 0xE8E2F2 : 0xE8E2F2, { rough:0.45, coat:0.4 }));
      m.userData.sub = 'actina'; m.position.copy(LS); half[side] = m;
      /* línea Z resaltada encima del mismo grupo */
      const zg = new THREE.BoxGeometry(0.075, 0.90, 0.54); zg.translate(s*ZREST, 0, 0);
      const zm = new THREE.Mesh(zg, plain(0x6C4AB6, { rough:0.5, coat:0.4 })); zm.userData.sub = 'linea-z'; zm.position.copy(LS);
      half[side+'z'] = zm;
      /* tropomiosina y troponina sobre dos filamentos finos */
      const tg = [], trg = [];
      [[0.11,0.19],[-0.11,0.19]].forEach(([dy,dz]) => {
        tg.push(Kit.taper([V(s*ZREST, dy+0.030, dz+0.014), V(s*(ZREST-ACT), dy+0.030, dz+0.014)], 0.012, 0.012, { seg:SEG(3,5), rad:5 }));
        for (let j=1;j<4;j++){ const n = new THREE.SphereGeometry(0.026, SEG(6,8), SEG(5,7));
          n.translate(s*(ZREST - ACT*j/4), dy+0.034, dz+0.016); trg.push(n); } });
      const tm = new THREE.Mesh(Kit.merge(tg.concat(trg)), plain(0xE3A008, { rough:0.45, coat:0.4 }));
      tm.userData.sub = 'tropo'; tm.position.copy(LS); tropo.push(tm);
    });

    /* filamentos gruesos (miosina) — fijos: definen la banda A */
    const myoG = [], headStatic = [];
    const myoRows = [[0.20,0],[-0.20,0],[0,0]];
    myoRows.forEach(([dy,dz], ri) => {
      myoG.push(Kit.taper([V(LS.x-THICK, LS.y+dy, LS.z+dz), V(LS.x+THICK, LS.y+dy, LS.z+dz)], 0.052, 0.052, { seg:SEG(4,7), rad:SEG(8,12) }));
      if (ri === 2) return;
      for (let j=0;j<7;j++){ const x = LS.x - THICK + 0.18 + j*0.155; if (Math.abs(x-LS.x) < 0.10) continue;
        [-1,1].forEach(o => { const arm = Kit.taper([V(x, LS.y+dy, LS.z+dz), V(x + 0.05, LS.y+dy+o*0.10, LS.z+dz)], 0.020, 0.020, { seg:2, rad:5 });
          const hd = new THREE.SphereGeometry(0.038, SEG(6,8), SEG(5,7)); hd.translate(x + 0.055, LS.y+dy+o*0.115, LS.z+dz);
          headStatic.push(arm, hd); }); }
    });
    const myoMesh = new THREE.Mesh(Kit.merge(myoG), plain(0xC0392B, { rough:0.45, coat:0.45 })); myoMesh.userData.sub = 'miosina';
    const headStaticMesh = new THREE.Mesh(Kit.merge(headStatic), plain(0xE0685A, { rough:0.45, coat:0.45 })); headStaticMesh.userData.sub = 'cabezas';
    /* cabezas animadas del filamento central */
    const headMat = plain(0xF07A66, { rough:0.42, coat:0.5 });
    for (let j=0;j<6;j++){ const x = LS.x - THICK + 0.20 + j*0.185; if (Math.abs(x - LS.x) < 0.09) continue;
      [-1,1].forEach(o => {
        const arm = Kit.taper([V(0,0,0), V(0.045, o*0.10, 0)], 0.020, 0.020, { seg:2, rad:5 });
        const hd = new THREE.SphereGeometry(0.040, SEG(6,8), SEG(5,7)); hd.translate(0.055, o*0.118, 0);
        const m = new THREE.Mesh(Kit.merge([arm, hd]), headMat);
        m.position.set(x, LS.y, LS.z); m.userData.sub = 'cabezas'; m.userData.dir = o; heads.push(m); }); }
    /* línea M y retículo sarcoplásmico de la lupa */
    const mLine = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.56, 0.30), plain(0xD8CFB4, { rough:0.5, coat:0.3 }));
    mLine.position.set(LS.x, LS.y, LS.z); mLine.userData.sub = 'miosina';
    const srG = [];
    [-1,1].forEach(o => { srG.push(Kit.taper([V(LS.x-1.16, LS.y + o*0.62, LS.z), V(LS.x+1.16, LS.y + o*0.62, LS.z)], 0.035, 0.035, { seg:SEG(4,7), rad:SEG(6,8) }));
      [-1,1].forEach(q => { const t = new THREE.TorusGeometry(0.11, 0.032, SEG(5,7), SEG(10,16)); t.rotateY(Math.PI/2);
        t.translate(LS.x + q*1.16, LS.y + o*0.62, LS.z); srG.push(t); }); });
    const srMesh = new THREE.Mesh(Kit.merge(srG), glassMat(0x3FD0E0, 0.45)); srMesh.userData.sub = 'reticulo';
    /* barras de bandas */
    const barY = LS.y + 0.78;
    const bar = (c, y) => { const m = new THREE.Mesh(new THREE.BoxGeometry(1, 0.085, 0.085), flat(c)); m.position.set(LS.x, y, LS.z); m.userData.sub = 'bandas'; return m; };
    const barA = bar(0xC0392B, barY), barH = bar(0x2E8B57, barY + 0.14);
    const barI1 = bar(0x3B78C3, barY), barI2 = bar(0x3B78C3, barY);
    add('sarcomero', [half.L, half.R, half.Lz, half.Rz, tropo[0], tropo[1], myoMesh, headStaticMesh, ...heads,
      mLine, srMesh, barA, barH, barI1, barI2], { explodeDir:V(0.15, 1, 0.3).normalize() });
    var sarco = { barA, barH, barI1, barI2 };
  }

  /* =============== LUPA 3: UNIÓN NEUROMUSCULAR Y PLACA MOTORA =============== */
  const ach = [], caIons = [];
  let axonDot = null, apRing = null;
  { const axG = [], myG = [], termG = [], vesG = [], plateG = [], foldG = [], recG = [], fibG = [];
    const A0 = V(LU.x-1.12, LU.y+0.90, LU.z-0.10), A1 = V(LU.x-0.58, LU.y+0.60, LU.z), A2 = V(LU.x-0.16, LU.y+0.40, LU.z);
    axG.push(Kit.taper([A0, A1, A2], 0.070, 0.062, { seg:SEG(6,10), rad:SEG(7,10) }));
    for (let j=0;j<3;j++){ const t = j/3 + 0.08; const p = A0.clone().lerp(A1, t);
      const c = new THREE.CylinderGeometry(0.115, 0.115, 0.20, SEG(9,14), 1);
      c.rotateZ(Math.PI/2 + 0.52); c.translate(p.x, p.y, p.z); myG.push(c); }
    const term = new THREE.SphereGeometry(1, SEG(14,20), SEG(10,14)); term.scale(0.40, 0.24, 0.26);
    term.translate(LU.x, LU.y+0.30, LU.z); termG.push(term);
    for (let k=0;k<9;k++){ const g = new THREE.SphereGeometry(0.046, SEG(6,9), SEG(5,7));
      g.translate(LU.x - 0.28 + 0.07*k + 0.02*(k%2), LU.y + 0.30 + (RND()-0.5)*0.17, LU.z + (RND()-0.5)*0.14); vesG.push(g); }
    const plate = new THREE.BoxGeometry(0.98, 0.07, 0.46); plate.translate(LU.x, LU.y - 0.02, LU.z); plateG.push(plate);
    for (let k=0;k<7;k++){ const f = new THREE.BoxGeometry(0.045, 0.17, 0.42); f.translate(LU.x - 0.39 + k*0.13, LU.y - 0.13, LU.z); foldG.push(f); }
    for (let k=0;k<9;k++){ const r = new THREE.SphereGeometry(0.030, SEG(5,7), SEG(4,6));
      r.translate(LU.x - 0.40 + k*0.10, LU.y + 0.03, LU.z + 0.10*(k%2 ? 1 : -1)); recG.push(r); }
    fibG.push(rod([V(LU.x-1.10, LU.y-0.46, LU.z), V(LU.x+1.10, LU.y-0.46, LU.z)], 0.30, 0.30, SEG(5,8), SEG(12,18)));
    const estriaG = [];
    for (let k=0;k<7;k++){ const t = new THREE.TorusGeometry(0.303, 0.012, SEG(4,6), SEG(10,16)); t.rotateY(Math.PI/2);
      t.translate(LU.x - 0.92 + k*0.30, LU.y - 0.46, LU.z); estriaG.push(t); }
    /* partículas de la animación */
    const achMat = new THREE.MeshBasicMaterial({ color:0xF2E6C9, toneMapped:false });
    for (let k=0;k<12;k++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6, 5), achMat);
      m.userData.off = k/12; m.userData.x = LU.x - 0.36 + 0.065*k; m.visible = false; E.scene.add(m); ach.push(m); }
    const caMat = new THREE.MeshBasicMaterial({ color:0x3FD0E0, toneMapped:false });
    for (let k=0;k<10;k++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.036, 6, 5), caMat);
      const o = k%2 ? 1 : -1; m.userData.from = V(LS.x - 0.9 + 0.2*k, LS.y + o*0.62, LS.z);
      m.userData.to = V(LS.x - 0.9 + 0.2*k, LS.y + o*0.20, LS.z); m.userData.off = k/10;
      m.visible = false; E.scene.add(m); caIons.push(m); }
    axonDot = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), new THREE.MeshBasicMaterial({ color:0xFFE87A, toneMapped:false }));
    axonDot.visible = false; E.scene.add(axonDot);
    const arg = new THREE.TorusGeometry(0.325, 0.030, 6, SEG(14,22)); arg.rotateY(Math.PI/2);
    apRing = new THREE.Mesh(arg, new THREE.MeshBasicMaterial({ color:0xFFE87A, toneMapped:false }));
    apRing.visible = false; E.scene.add(apRing);
    var axonPath = Kit.curve([A0, A1, A2]);
    add('union-neuromuscular', [
      mesh(axG, plain(0xE8D48A, { rough:0.5, coat:0.35 }), 'axon'),
      mesh(myG, plain(0xF2EAD2, { rough:0.55, coat:0.3 }), 'axon'),
      mesh(vesG, plain(0xF7E2A8, { rough:0.35, coat:0.6 }), 'vesiculas'),
      mesh(termG, Kit.tissue({ color:sRGB(0xE0B050), transparent:true, opacity:0.40, rough:0.25, coat:0.9, coatRough:0.2, depthWrite:false, side:THREE.DoubleSide }), 'terminal'),
      mesh(plateG, plain(0xD4796B, { rough:0.5, coat:0.4 }), 'placa'),
      mesh(foldG, plain(0xC46A5C, { rough:0.55, coat:0.35 }), 'placa'),
      mesh(recG, plain(0x2E8B57, { rough:0.45, coat:0.45 }), 'placa'),
      mesh(fibG, Kit.tissue({ color:sRGB(0xD4796B), transparent:true, opacity:0.55, rough:0.4, coat:0.5, depthWrite:false, side:THREE.DoubleSide }), 'fibra'),
      mesh(estriaG, plain(0x8E3A30, { rough:0.6, coat:0.2 }), 'fibra')
    ], { explodeDir:V(1, -0.5, 0.2).normalize() });
    var ACPATH = axonPath;
  }

  /* ========================= ANIMACIONES ========================= */
  const sli = { on:false, t:0, speed:1 };
  const act = { on:false, t:0, speed:1 };
  const cod = { on:false, t:0, speed:1 };

  /* el estado del sarcómero se reaplica en cada cuadro: así la vista
     explosionada o cualquier otro cambio de posición no lo descuadra */
  const sarState = { z:ZREST, ang:-0.55, open:false };
  const setSarcomere = (z, headAng, tropoOpen) => { sarState.z = z; sarState.ang = headAng; sarState.open = tropoOpen; applySar(); };
  const applySar = () => {
    const z = sarState.z, headAng = sarState.ang, tropoOpen = sarState.open;
    const dx = z - ZREST;
    half.L.position.x = LS.x - dx; half.Lz.position.x = LS.x - dx; tropo[0].position.x = LS.x - dx;
    half.R.position.x = LS.x + dx; half.Rz.position.x = LS.x + dx; tropo[1].position.x = LS.x + dx;
    tropo[0].position.y = LS.y + (tropoOpen ? 0.035 : 0); tropo[1].position.y = LS.y + (tropoOpen ? 0.035 : 0);
    heads.forEach(m => { m.rotation.z = m.userData.dir * headAng; });
    /* barras: A constante, I y H se estrechan */
    const iW = Math.max(0.02, z - THICK), hW = Math.max(0.02, 2*(z - ACT));
    sarco.barA.scale.x = 2*THICK; sarco.barA.position.x = LS.x;
    sarco.barH.scale.x = hW; sarco.barH.position.x = LS.x;
    sarco.barI1.scale.x = iW; sarco.barI1.position.x = LS.x - (THICK + iW/2);
    sarco.barI2.scale.x = iW; sarco.barI2.position.x = LS.x + (THICK + iW/2);
  };
  setSarcomere(ZREST, -0.55, false);

  const setElbow = k => {   /* k: 0 extendido → 1 flexionado */
    const ang = -1.55*k;
    armFlex.forEach(m => { m.rotation.x = ang; });
    armMove.biceps.forEach(m => { const b = m.userData.baseScale || new THREE.Vector3(1,1,1);
      m.scale.set(b.x*(1 + 0.22*k), b.y*(1 - 0.20*k), b.z*(1 + 0.22*k)); m.rotation.x = -0.16*k; });
    armMove.triceps.forEach(m => { const b = m.userData.baseScale || new THREE.Vector3(1,1,1);
      m.scale.set(b.x*(1 - 0.09*k), b.y*(1 + 0.07*k), b.z*(1 - 0.09*k)); });
  };

  /* durante la flexión del codo se ocultan los grupos que tapan el brazo */
  const CODHIDE = ['pectoral','abdominales','dorsal-trapecio','diafragma','gluteo','cuadriceps','isquiotibiales','triceps-sural','fibra','sarcomero','union-neuromuscular'];
  let codHidePrev = null;

  const showAct = on => { ach.forEach(m => m.visible = on); caIons.forEach(m => m.visible = on);
    axonDot.visible = on; apRing.visible = on; if (!on) setSarcomere(ZREST, -0.55, false); };

  const model = {
    anims:[
      { id:'deslizante', label:'Filamento deslizante: el ciclo de los puentes cruzados',
        get on(){ return sli.on; },
        set(on){ sli.on = on; sli.t = 0; if (!on) setSarcomere(ZREST, -0.55, false);
          else { act.on = false; showAct(false); E.focus(LS.clone(), 4.4); E.goal.theta = 0.05; E.goal.phi = 1.50; } },
        focus:true },
      { id:'activacion', label:'Del nervio al calcio: acetilcolina, placa motora y retículo',
        get on(){ return act.on; },
        set(on){ act.on = on; act.t = 0; showAct(on);
          if (on){ sli.on = false; setSarcomere(ZREST, -0.55, false); E.focus(V(LS.x, LS.y - 1.6, LS.z), 6.4); E.goal.theta = 0.05; E.goal.phi = 1.50; } },
        focus:true },
      { id:'codo', label:'Flexión del codo: bíceps y tríceps, un par antagonista (oculta el resto del cuerpo)',
        get on(){ return cod.on; },
        set(on){ cod.on = on; cod.t = 0;
          if (on){ codHidePrev = CODHIDE.map(id => { const p = E.parts.get(id); return p ? p.visible : true; });
            CODHIDE.forEach(id => E.setVisible(id, false));
            E.focus(V(-1.62, 2.10, 0.55), 6.8); E.goal.theta = -1.57; E.goal.phi = 1.55; }
          else { setElbow(0); if (codHidePrev){ CODHIDE.forEach((id, i) => E.setVisible(id, codHidePrev[i])); codHidePrev = null; } } },
        focus:true }
    ],
    setSpeed(k){ sli.speed = k; act.speed = k; cod.speed = k; },
    phaseText(){
      if (sli.on){ const c = (sli.t % 1) * 4;
        if (c >= 3) return 'Relajación · el calcio vuelve al retículo, la tropomiosina tapa otra vez los sitios de la actina y el sarcómero se alarga. Comprueba las barras: la banda A (roja) nunca cambió de anchura; la I (azul) y la zona H (verde), sí.';
        const p = c - Math.floor(c);
        return p < 0.25 ? 'Unión · el Ca²⁺ ha destapado los sitios de la actina y la cabeza de miosina se engancha: se forma el puente cruzado'
             : p < 0.55 ? 'Golpe de fuerza · la cabeza gira y arrastra el filamento fino hacia el centro: la línea Z se acerca y el sarcómero se acorta'
             : p < 0.75 ? 'Desunión · una molécula de ATP se une a la cabeza y la suelta de la actina. Sin ATP la cabeza quedaría pegada: eso es el rigor mortis'
             : 'Reactivación · la hidrólisis del ATP recarga la cabeza, que vuelve a su posición lista para engancharse más adelante en la actina'; }
      if (act.on){ const p = act.t % 1;
        return p < 0.18 ? 'El impulso nervioso baja por el axón de la motoneurona hasta el terminal'
             : p < 0.34 ? 'Entra Ca²⁺ al terminal y las vesículas vuelcan acetilcolina en la hendidura sináptica (unos 50 nm)'
             : p < 0.50 ? 'La acetilcolina se une a los receptores de la placa motora: nace el potencial de acción del músculo'
             : p < 0.68 ? 'El impulso recorre el sarcolema y baja por los túbulos T hasta el interior de la fibra'
             : p < 0.84 ? 'El retículo sarcoplásmico libera Ca²⁺ al citoplasma'
             : 'El Ca²⁺ se une a la troponina, la tropomiosina se corre y los sitios de la actina quedan libres: ya puede empezar el ciclo de los puentes cruzados'; }
      if (cod.on){ const p = cod.t % 1;
        return p < 0.5 ? 'Flexión · el bíceps es el agonista: se acorta y se engrosa. El tríceps, antagonista, se relaja y se alarga. El codo es una palanca de tercer género: mucha fuerza para poco peso, a cambio de velocidad'
                       : 'Extensión · ahora el agonista es el tríceps, que se acorta y tira del olécranon, mientras el bíceps se relaja. Ningún músculo empuja: ambos tiran'; }
      return '';
    },
    legend:[
      { color:'#C0392B', txt:'Banda A · filamentos gruesos de miosina: su anchura NO cambia' },
      { color:'#3B78C3', txt:'Banda I · solo filamentos finos: se estrecha al contraerse' },
      { color:'#2E8B57', txt:'Zona H · solo miosina, sin solapamiento: se estrecha o desaparece' },
      { color:'#6C4AB6', txt:'Líneas Z · los bordes del sarcómero, que se acercan entre sí' },
      { color:'#E3A008', txt:'Tropomiosina y troponina: tapan o destapan los sitios de la actina' },
      { color:'#3FD0E0', txt:'Ca²⁺ liberado por el retículo sarcoplásmico' },
      { color:'#F2E6C9', txt:'Acetilcolina de las vesículas del terminal nervioso' }
    ],
    observa:'en la animación del filamento deslizante, no mires solo el movimiento: vigila las tres barras de colores de arriba. La roja (banda A) mide siempre lo mismo porque el filamento grueso no cambia de longitud; la azul (banda I) y la verde (zona H) se estrechan. Eso es exactamente lo que vieron Huxley y Hanson al microscopio en 1954, y es la prueba de que los filamentos se deslizan en vez de encogerse. En la flexión del codo, fíjate en que los dos músculos actúan a la vez: uno se acorta mientras el otro se deja alargar.'
  };

  E.onFrame((t, dt) => {
    applySar();
    if (!motionOK()) return;
    if (sli.on){
      sli.t += dt*0.085*sli.speed; const c = (sli.t % 1) * 4;
      if (c >= 3){ const k = c - 3; setSarcomere(ZREST + (ZCONTR - ZREST)*(1 - k), -0.55, false); }
      else { const i = Math.floor(c), p = c - i;
        const stroke = p < 0.25 ? 0 : p < 0.55 ? smooth01((p - 0.25)/0.30) : 1;
        const z = ZREST + (ZCONTR - ZREST)*(i + stroke)/3;
        const ang = p < 0.25 ? -0.55 + 0.20*smooth01(p/0.25)
                  : p < 0.55 ? -0.35 + 0.75*smooth01((p - 0.25)/0.30)
                  : p < 0.75 ? 0.40 : 0.40 - 0.95*smooth01((p - 0.75)/0.25);
        setSarcomere(z, ang, true);
        heads.forEach(m => { const d = p > 0.55 && p < 0.80 ? 0.05 : 0; m.position.y = LS.y + m.userData.dir*d; }); }
    }
    if (act.on){
      act.t += dt*0.11*act.speed; const p = act.t % 1;
      axonDot.visible = p < 0.20;
      if (p < 0.20) axonDot.position.copy(ACPATH.getPointAt(clamp(p/0.20, 0, 1)));
      ach.forEach((m, i) => { const k = clamp((p - 0.20 - 0.012*i)/0.16, 0, 1); m.visible = p > 0.20 && p < 0.55;
        m.position.set(m.userData.x, LU.y + 0.20 - 0.16*k, LU.z + (i%2 ? 0.06 : -0.06)); });
      apRing.visible = p > 0.45 && p < 0.72;
      apRing.position.set(LU.x - 0.95 + 1.9*clamp((p - 0.45)/0.27, 0, 1), LU.y - 0.46, LU.z);
      caIons.forEach((m, i) => { const k = clamp((p - 0.66 - 0.010*i)/0.18, 0, 1); m.visible = p > 0.66;
        m.position.lerpVectors(m.userData.from, m.userData.to, k); });
      setSarcomere(ZREST, -0.55, p > 0.86);
    }
    if (cod.on){ cod.t += dt*0.12*cod.speed; setElbow(0.5 - 0.5*Math.cos(2*Math.PI*(cod.t % 1))); }
  });
  return model;
}

BIO.organs.muscular = BIO.muscle;
BIO.builders.muscular = buildMuscle;
route('/explorar/muscular', (view, q) => organView(view, q, BIO.muscle, buildMuscle));
/* Los enlaces antiguos al marcador "en construcción" llevan al modelo real */
route('/explorar/organo/muscular', () => navigate('#/explorar/muscular'));
</script>
