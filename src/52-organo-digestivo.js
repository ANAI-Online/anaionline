<script>
/* =====================================================================
   ATLAS 3D · TUBO DIGESTIVO: ESTÓMAGO · INTESTINO DELGADO · INTESTINO GRUESO
   Tres órganos completos (datos + modelo procedimental + ruta) en un archivo.
   Nombres globales propios: BIO.stomach / BIO.smallBowel / BIO.largeBowel,
   buildStomach / buildSmallBowel / buildLargeBowel.
   ===================================================================== */

/* ============================ 1 · ESTÓMAGO ============================ */
BIO.stomach = {
  capasHint: "Sugerencia: oculta la capa muscular para ver los pliegues gástricos por dentro, y quédate solo con la lupa para estudiar la glándula célula a célula.",
  id:"estomago", nombre:"Estómago", unidad:6, dominio:"anat", eyebrow:"Atlas 3D · Unidad 6 · Sistema digestivo", em:"🍽️",
  intro:"Recorre el estómago del cardias al píloro, abre su pared capa por capa y baja con la lupa hasta una glándula gástrica para ver quién fabrica el ácido y por qué el órgano no se digiere a sí mismo.",
  nota:"Modelo tridimensional simplificado con fines educativos. La forma del estómago cambia mucho según lo lleno que esté; las capas de la pared se muestran como un bloque separado y la glándula gástrica aparece en una lupa, miles de veces ampliada.",
  focusR:8.5, radius:14.5, target:[2.0,0.15,0], phi:1.45, theta:0.18, floor:-3.6, floorSize:13,
  capas:[
    {id:"regiones", n:"Regiones del estómago"},
    {id:"interior", n:"Interior: pliegues y píloro"},
    {id:"pared", n:"Capas de la pared (corte)"},
    {id:"glandula", n:"Glándula gástrica (lupa)"}
  ],
  opacityCapas:["regiones"], opacityLabel:"Transparencia de la pared gástrica", opacityDefault:0.92,
  activity:"explorar-estomago", guidedActivity:"guiada-estomago", badge:"anatomista", seenThreshold:7,
  related:[
    {t:"Intestino delgado",href:"#/explorar/intestino-delgado"},
    {t:"Intestino grueso",href:"#/explorar/intestino-grueso"},
    {t:"Biomoléculas",href:"#/cn"}
  ],
  reto:{
    proposito:"Entender cómo el estómago convierte el alimento en quimo: qué región hace qué, qué células producen el ácido y la enzima, y qué protege a la pared de su propio jugo gástrico.",
    observa:[
      {id:"fundus", txt:"Localiza el fundus, donde se acumula el gas tragado."},
      {id:"muscular", txt:"Cuenta los tres planos de la capa muscular en el corte de la pared."},
      {id:"glandula-gastrica", txt:"Abre la lupa de la glándula gástrica y busca las células parietales."},
      {id:"barrera-mucosa", txt:"Observa la barrera de moco y bicarbonato sobre la mucosa."}
    ],
    pista:"Pista: usa Capas → Ver interior para ver los pliegues gástricos por dentro.",
    pregunta:{q:"El jugo gástrico tiene un pH de 1 a 2, capaz de disolver metales. ¿Por qué no digiere la propia pared del estómago?",
      ops:["Porque el ácido solo actúa sobre los alimentos, no sobre los tejidos vivos",
           "Porque las células mucosas cubren la superficie con una capa de moco cargada de bicarbonato que neutraliza el ácido junto al epitelio",
           "Porque el estómago se vacía tan rápido que el ácido no tiene tiempo de actuar"],
      ok:1, fb:"El moco con bicarbonato mantiene un pH cercano a 7 pegado a la superficie, y el epitelio se renueva por completo cada 3 a 5 días. Cuando esa barrera falla (por Helicobacter pylori o por antiinflamatorios), aparece la úlcera.",
      wrong:["El ácido no distingue entre alimento y tejido: es química pura. De hecho, el estómago sí se digiere a sí mismo después de la muerte, cuando la barrera deja de renovarse.",
             "El estómago tarda de 2 a 4 horas en vaciarse y produce ácido de forma continua; el tiempo no es la explicación."]}
  },
  structures:[
    {id:"cardias", nombre:"Cardias", capa:"regiones", color:"#D98E7A", pos:[0.05,2.5,0], lbl:[1.6,3.4,0.4], anchor:[-0.08,2.56,-0.32],
      n1:"Puerta de entrada del estómago: el punto donde desemboca el esófago, a la altura del diafragma.",
      n2:"No es un esfínter anatómico grueso como el píloro, sino una zona de alta presión formada por el músculo del esófago, las fibras del diafragma y el ángulo agudo con el que el esófago entra en el estómago. Ese conjunto impide que el contenido ácido suba de vuelta.",
      n3:"Cuando esa barrera pierde tono aparece el reflujo gastroesofágico: el ácido irrita el esófago, que no tiene moco protector, y produce ardor. Comer muy tarde, acostarse tras la comida o el aumento de presión abdominal lo favorecen. El reflujo repetido puede cambiar el epitelio del esófago (esófago de Barrett), por eso conviene tratarlo y no normalizarlo.",
      dato:"El ardor de estómago casi nunca es del estómago: es esófago irritado por el ácido que subió.",
      conecta:["fundus","curvaturas","pliegues"], temas:["Sistema digestivo","Reflujo","Presiones"],
      quiz:{q:"¿Qué impide normalmente que el contenido ácido del estómago suba al esófago?",
        ops:["Un tapón de moco en la entrada","Una zona de alta presión formada por el esófago, el diafragma y el ángulo de entrada","El píloro, que se cierra hacia arriba"],
        ok:1, fb:"Es un cierre funcional, no una válvula anatómica: por eso puede fallar y dar reflujo.",
        wrong:["El moco recubre la superficie gástrica, pero no forma ningún tapón que cierre la entrada.","El píloro está al otro extremo: regula la salida hacia el duodeno, no la entrada."]}},
    {id:"fundus", nombre:"Fundus", capa:"regiones", color:"#E0A18F", pos:[-0.95,2.2,0], lbl:[-2.9,3.2,0.3],
      n1:"Cúpula del estómago, situada por encima del cardias y bajo la cúpula izquierda del diafragma.",
      n2:"Al estar arriba, recoge el aire que se traga con la comida y la bebida: es la burbuja gástrica que se ve en las radiografías de tórax de pie. Su pared es delgada y distensible y aloja gran parte de las glándulas que producen ácido.",
      n3:"El fundus se relaja cuando llega comida (relajación receptiva, un reflejo mediado por el nervio vago): puede aumentar mucho su volumen casi sin que suba la presión interior. Gracias a ello un estómago vacío de unos 50 mL llega a contener 1 a 1,5 litros sin dolor.",
      dato:"El eructo sale casi siempre del fundus: es el aire tragado, no gas producido por la digestión.",
      conecta:["cardias","cuerpo","curvaturas"], temas:["Sistema digestivo","Volumen","Reflejos"],
      quiz:{q:"¿Por qué el gas del estómago se acumula justo en el fundus?",
        ops:["Porque allí las glándulas producen gas al digerir","Porque es la parte más alta y el gas es menos denso que el líquido","Porque el fundus no tiene músculo y se llena solo"],
        ok:1, fb:"Es física, no fisiología: el aire tragado sube a la zona más alta cuando la persona está de pie.",
        wrong:["Las glándulas gástricas producen ácido, enzimas y moco, no gas. El gas intestinal sí procede de la fermentación, pero eso ocurre en el colon.","El fundus sí tiene capa muscular; de hecho se relaja de forma activa cuando llega comida."]}},
    {id:"cuerpo", nombre:"Cuerpo gástrico", capa:"regiones", color:"#D98470", pos:[-0.5,0.8,0], lbl:[-3.26,1.15,0.46],
      n1:"Región central y más amplia del estómago, donde se almacena y se mezcla la comida.",
      n2:"Su mucosa concentra las glándulas gástricas: aquí se fabrican el ácido clorhídrico y el pepsinógeno que convierten el bolo alimenticio en quimo, una papilla semilíquida. Las contracciones empiezan suaves en el cuerpo y se vuelven intensas hacia el antro.",
      n3:"Las células parietales del cuerpo producen también el factor intrínseco, una proteína imprescindible para absorber la vitamina B12 en el íleon. Por eso una gastritis crónica atrófica o una cirugía que reduzca el estómago puede provocar anemia por falta de B12 aunque la dieta la contenga.",
      dato:"El estómago absorbe muy poco: alcohol, agua y algunos fármacos. La absorción real ocurre más adelante.",
      conecta:["fundus","antro","pliegues","glandula-gastrica"], temas:["Sistema digestivo","Enzimas","Vitamina B12"],
      quiz:{q:"Además del ácido, el cuerpo gástrico produce el factor intrínseco. ¿Para qué sirve?",
        ops:["Para neutralizar el ácido antes de pasar al intestino","Para poder absorber la vitamina B12 más adelante, en el íleon","Para digerir las grasas dentro del estómago"],
        ok:1, fb:"Sin factor intrínseco la B12 se pierde en las heces y aparece anemia, aunque la dieta la contenga.",
        wrong:["Quien neutraliza el ácido es el bicarbonato del páncreas, ya en el duodeno.","Las grasas se digieren sobre todo en el intestino delgado, con bilis y lipasa pancreática."]}},
    {id:"antro", nombre:"Antro pilórico", capa:"regiones", color:"#C97A63", pos:[0.5,-1.05,0], lbl:[-0.91,-2.83,0.48],
      n1:"Porción inferior y horizontal del estómago, justo antes del píloro. Es la trituradora del órgano.",
      n2:"Su capa muscular es mucho más gruesa que la del cuerpo. Las ondas peristálticas llegan aquí con fuerza, empujan el quimo contra el píloro cerrado y lo devuelven hacia atrás a gran velocidad: esa retropulsión rompe los trozos hasta dejarlos por debajo de 2 mm, el tamaño que el píloro deja pasar.",
      n3:"En la mucosa del antro están las células G, que liberan gastrina a la sangre cuando llegan proteínas y el estómago se distiende; la gastrina viaja por el torrente sanguíneo y ordena a las células parietales del cuerpo que produzcan más ácido. Es un ejemplo claro de control endocrino dentro de un mismo órgano.",
      dato:"El estómago hace unas tres ondas de mezcla por minuto: puedes oírlas con un fonendoscopio.",
      conecta:["cuerpo","piloro","glandula-gastrica"], temas:["Sistema digestivo","Motilidad","Hormonas"],
      quiz:{q:"¿Por qué el quimo vuelve hacia atrás cuando la onda peristáltica llega al antro?",
        ops:["Porque el píloro casi cerrado solo deja pasar partículas muy pequeñas y el resto rebota, lo que tritura la comida","Porque el estómago empuja el alimento de vuelta al esófago","Porque el antro no tiene músculo suficiente para vaciarse"],
        ok:0, fb:"Esa retropulsión es el mecanismo de trituración del estómago: reduce los trozos por debajo de 2 mm.",
        wrong:["Volver al esófago sería reflujo o vómito, no el funcionamiento normal.","Ocurre lo contrario: el antro es la región con la capa muscular más gruesa."]}},
    {id:"piloro", nombre:"Píloro", capa:"interior", color:"#B06A55", pos:[1.6,-0.85,0], lbl:[1.2,-2.83,0.32],
      n1:"Anillo de músculo circular grueso que controla la salida del estómago hacia el duodeno.",
      n2:"Permanece casi cerrado y se abre en pequeños chorros: deja pasar unos pocos mililitros de quimo cada vez, para que el intestino delgado pueda neutralizar el ácido y digerir sin saturarse. El vaciado completo tarda de 2 a 4 horas y es más lento cuanto más grasa tiene la comida.",
      n3:"En algunos lactantes el músculo pilórico se engrosa (estenosis hipertrófica del píloro) y aparecen vómitos en chorro hacia la tercera o cuarta semana de vida; se corrige con cirugía. En el otro extremo, si el píloro deja pasar el quimo demasiado rápido tras una cirugía gástrica, aparece el síndrome de vaciamiento rápido.",
      dato:"El píloro deja pasar solo partículas menores de 2 mm: lo demás vuelve al antro para molerse otra vez.",
      conecta:["antro","muscular"], temas:["Sistema digestivo","Esfínteres","Motilidad"],
      quiz:{q:"¿Qué ventaja tiene que el estómago se vacíe poco a poco y no de golpe?",
        ops:["Permite al intestino delgado neutralizar el ácido y digerir cada porción sin saturarse","Evita que el alimento se pudra dentro del estómago","Hace que absorbamos los nutrientes en el propio estómago"],
        ok:0, fb:"El duodeno necesita tiempo para añadir bilis, enzimas y bicarbonato a cada chorro de quimo.",
        wrong:["El pH 1–2 del estómago ya impide que la mayoría de microbios proliferen allí.","La absorción de nutrientes ocurre en el intestino delgado, no en el estómago."]}},
    {id:"curvaturas", nombre:"Curvaturas mayor y menor", capa:"regiones", color:"#C8A24A", pos:[0.5,0.6,0], lbl:[-3.4,0.25,0.4], anchor:[-1.66,0.9,0],
      n1:"Los dos bordes del estómago: la curvatura mayor, larga y convexa, a la izquierda y abajo; la menor, corta y cóncava, a la derecha y arriba.",
      n2:"No son adornos: por ellas entran y salen los vasos y los nervios. Los epiplones (repliegues de peritoneo con grasa) cuelgan de la curvatura mayor y se unen al hígado desde la menor, y los ganglios linfáticos se alinean a lo largo de ambas.",
      n3:"Esa distribución tiene consecuencias quirúrgicas: al operar un cáncer gástrico se extirpan las cadenas ganglionares de ambas curvaturas, porque son la primera parada de las células tumorales. La curvatura menor, además, es una localización frecuente de úlcera gástrica.",
      dato:"La curvatura mayor mide unos 40 cm y la menor apenas 15: por eso el estómago tiene forma de J.",
      conecta:["cuerpo","fundus","antro"], temas:["Anatomía abdominal","Vasos","Cirugía"],
      quiz:{q:"¿Por qué son importantes las curvaturas del estómago en una cirugía oncológica?",
        ops:["Porque son la parte más gruesa de la pared","Porque por ellas discurren los vasos y las cadenas de ganglios linfáticos del estómago","Porque producen la mayor parte del ácido"],
        ok:1, fb:"Los ganglios de ambas curvaturas son la primera estación a la que llegan las células tumorales.",
        wrong:["La pared más gruesa es la del antro, por su capa muscular.","El ácido lo producen las glándulas del fundus y el cuerpo, no los bordes del órgano."]}},
    {id:"pliegues", nombre:"Pliegues gástricos", capa:"interior", color:"#E8B5A8", pos:[-0.45,0.65,0], lbl:[-2.9,-1.5,0.9], interno:true,
      n1:"Arrugas longitudinales de la mucosa y la submucosa que recorren el interior del estómago vacío.",
      n2:"Cuando el estómago se llena, los pliegues se estiran y desaparecen, como un acordeón que se abre: permiten que el órgano pase de unos 50 mL a más de un litro sin romper su revestimiento. También canalizan los líquidos hacia el píloro por el llamado camino gástrico, a lo largo de la curvatura menor.",
      n3:"En una endoscopia, unos pliegues muy engrosados y rígidos que no se borran al insuflar aire son un signo de alarma (gastritis grave o tumor infiltrante). A diferencia de los pliegues circulares del intestino delgado, los gástricos son temporales: son una reserva de superficie, no un mecanismo de absorción.",
      dato:"Un estómago vacío cabe en tu puño; lleno, puede multiplicar por veinte su volumen.",
      conecta:["cuerpo","mucosa","submucosa"], temas:["Sistema digestivo","Distensión","Endoscopia"],
      quiz:{q:"¿Qué les ocurre a los pliegues gástricos cuando comes?",
        ops:["Se hacen más profundos para aumentar la superficie de absorción","Se estiran y se borran, permitiendo que el estómago aumente su volumen","Se cierran para impedir que el alimento toque la pared"],
        ok:1, fb:"Son una reserva de superficie para distenderse, no un sistema de absorción como las vellosidades intestinales.",
        wrong:["El estómago casi no absorbe nutrientes: esa es la función de las vellosidades del intestino delgado.","El alimento debe contactar con la mucosa para recibir ácido y enzimas; la pared se protege con moco, no aislándose."]}},
    {id:"mucosa", nombre:"Mucosa", capa:"pared", color:"#E9A0A8", pos:[4.4,1.56,0], lbl:[6.4,2.25,0], anchor:[5.3,1.6,0.9],
      n1:"Capa más interna de la pared, la que toca el alimento. Contiene el epitelio y millones de glándulas gástricas.",
      n2:"Su epitelio es de una sola capa de células, todas ellas productoras de moco, sin ningún hueco entre ellas: es una barrera continua. Bajo el epitelio, una fina lámina de músculo (muscular de la mucosa) mueve los pliegues y ayuda a exprimir las glándulas.",
      n3:"Este epitelio se renueva completo cada 3 a 5 días, uno de los recambios más rápidos del cuerpo: las células madre del cuello de la glándula reponen de forma continua las que el ácido daña. Un tejido que se divide tanto es también más vulnerable a acumular mutaciones, lo que explica en parte la frecuencia del cáncer gástrico.",
      dato:"El estómago estrena revestimiento cada 3 a 5 días.",
      conecta:["submucosa","glandula-gastrica","barrera-mucosa"], temas:["Histología","Epitelios","Regeneración"],
      quiz:{q:"¿Qué sentido tiene que el epitelio del estómago se renueve cada 3 a 5 días?",
        ops:["Porque crece con la edad de la persona","Porque el ácido y las enzimas dañan sus células de forma continua y hay que reponerlas","Porque el estómago cambia de tamaño al comer"],
        ok:1, fb:"Es una superficie expuesta a pH 1–2: el recambio rápido es parte de la defensa.",
        wrong:["El recambio es constante durante toda la vida; no depende de la edad.","Los cambios de volumen los absorben los pliegues, no la renovación celular."]}},
    {id:"submucosa", nombre:"Submucosa", capa:"pared", color:"#F0CFA6", pos:[4.4,1.17,0], lbl:[6.6,1.5,0], anchor:[5.3,1.17,0.9],
      n1:"Capa de tejido conectivo bajo la mucosa, con vasos sanguíneos, linfáticos y nervios.",
      n2:"Es la capa que da resistencia a la pared: por eso, cuando se sutura un estómago o un intestino, el punto debe abarcar la submucosa. Contiene el plexo nervioso submucoso (de Meissner), que regula la secreción de las glándulas y el flujo de sangre local.",
      n3:"Las arterias submucosas son grandes: cuando una úlcera profundiza hasta ellas se produce una hemorragia digestiva, que se manifiesta con vómito oscuro o heces negras. Esa misma red permite que el endoscopista inyecte suero bajo una lesión para levantarla y extirparla sin perforar la pared.",
      dato:"Es la capa que sostiene los puntos de sutura: sin ella, la herida no cierra.",
      conecta:["mucosa","muscular"], temas:["Histología","Vasos","Urgencias"],
      quiz:{q:"¿Por qué una úlcera que llega a la submucosa puede sangrar mucho?",
        ops:["Porque la submucosa contiene los vasos sanguíneos grandes de la pared","Porque la submucosa produce el ácido","Porque la submucosa está en contacto directo con el alimento"],
        ok:0, fb:"Las arterias submucosas son la fuente habitual de la hemorragia digestiva alta.",
        wrong:["El ácido lo producen las células parietales de las glándulas, en la mucosa.","La capa en contacto con el alimento es la mucosa; la submucosa queda por debajo."]}},
    {id:"muscular", nombre:"Capa muscular (3 planos)", capa:"pared", color:"#C05F52", pos:[4.4,0.77,0], lbl:[7.0,0.72,0], anchor:[5.3,0.77,0.9],
      n1:"Músculo liso en tres planos superpuestos: oblicuo (interno), circular (medio) y longitudinal (externo).",
      n2:"El estómago es el único tramo del tubo digestivo con tres planos musculares. El longitudinal acorta, el circular estrecha y el oblicuo, exclusivo del estómago, retuerce el contenido. Combinados no solo empujan: amasan y trituran, como una batidora.",
      n3:"El ritmo lo marcan las células intersticiales de Cajal, marcapasos del tubo digestivo situados en la capa muscular, que disparan unas tres ondas lentas por minuto en el estómago (frente a unas doce por minuto en el duodeno). El engrosamiento de la capa circular forma los esfínteres, como el píloro.",
      dato:"Tres planos de músculo: por eso el estómago amasa y no solo empuja.",
      conecta:["submucosa","serosa","antro","piloro"], temas:["Histología","Músculo liso","Motilidad"],
      quiz:{q:"¿Qué le permite al estómago hacer la capa muscular oblicua, que el resto del tubo digestivo no tiene?",
        ops:["Absorber nutrientes","Retorcer y amasar el contenido, no solo empujarlo","Producir más ácido"],
        ok:1, fb:"Empujar (peristalsis) lo hacen las capas circular y longitudinal; el plano oblicuo añade el amasado.",
        wrong:["La absorción depende del epitelio de la mucosa, no del músculo.","El ácido lo producen las células parietales, en la mucosa."]}},
    {id:"serosa", nombre:"Serosa", capa:"pared", color:"#CFE0E8", pos:[4.4,0.46,0], lbl:[6.5,-0.1,0], anchor:[5.3,0.46,0.9],
      n1:"Capa más externa: una membrana lisa y húmeda (peritoneo visceral) que envuelve el estómago.",
      n2:"Produce una película de líquido que reduce la fricción, de modo que el estómago se desliza sobre el hígado, el bazo y el colon mientras se llena, se vacía y sigue los movimientos de la respiración.",
      n3:"Que un tumor o una úlcera atraviesen la serosa cambia el pronóstico: si se rompe, el contenido gástrico cae en la cavidad peritoneal y provoca una peritonitis, una urgencia quirúrgica con dolor abdominal intenso y vientre rígido.",
      dato:"Gracias a la serosa, los órganos del abdomen se rozan sin dañarse.",
      conecta:["muscular","curvaturas"], temas:["Histología","Peritoneo","Urgencias"],
      quiz:{q:"¿Qué ocurre si una úlcera perfora también la serosa?",
        ops:["Nada, la serosa es la capa menos importante","El contenido gástrico pasa a la cavidad abdominal y produce peritonitis","El estómago pierde su capacidad de producir ácido"],
        ok:1, fb:"La perforación gástrica es una urgencia quirúrgica: dolor brusco e intenso y abdomen rígido.",
        wrong:["Es la última barrera entre el estómago y la cavidad abdominal: atravesarla lo cambia todo.","La producción de ácido depende de la mucosa, que ya estaba dañada mucho antes."]}},
    {id:"glandula-gastrica", nombre:"Glándula gástrica (lupa)", capa:"glandula", color:"#E98A3C", pos:[4.4,-1.6,0], lbl:[6.9,-1.45,0],
      n1:"Tubo microscópico hundido en la mucosa. Cada glándula reúne cuatro tipos de células con tareas distintas.",
      n2:"Las células parietales bombean H⁺ contra un gradiente enorme y, junto con el Cl⁻, forman ácido clorhídrico a pH 1–2. Las principales liberan pepsinógeno, inactivo; el ácido lo recorta y lo convierte en pepsina, que rompe las proteínas en fragmentos. Las mucosas cubren la superficie de moco y bicarbonato, y las células G del antro liberan gastrina a la sangre para acelerar todo el proceso.",
      n3:"La bomba de protones (H⁺/K⁺-ATPasa) de la célula parietal gasta una molécula de ATP por cada protón expulsado y concentra el H⁺ unos tres millones de veces respecto de la sangre. Los fármacos llamados inhibidores de la bomba de protones (omeprazol y similares) la bloquean de forma irreversible: por eso su efecto dura más que su presencia en la sangre.",
      dato:"La pepsina no digiere la comida entera: solo corta proteínas, y deja de funcionar en cuanto el quimo se neutraliza en el duodeno.",
      conecta:["mucosa","barrera-mucosa","cuerpo","antro"], temas:["Enzimas","pH","Transporte activo"],
      partes:[
        {n:"Célula parietal (HCl)", d:"Bombea H⁺ con gasto de ATP; junto al Cl⁻ forma el ácido clorhídrico a pH 1–2. También produce el factor intrínseco.", at:[4.0,-1.55,0.18], sub:"parietal"},
        {n:"Célula principal (pepsinógeno)", d:"Libera pepsinógeno inactivo; el ácido lo transforma en pepsina, que corta las proteínas en fragmentos.", at:[4.42,-2.25,0.18], sub:"principal"},
        {n:"Célula mucosa (moco y bicarbonato)", d:"Tapiza la superficie con un gel alcalino: es la defensa que impide que el ácido toque el epitelio.", at:[4.4,-0.95,0.2], sub:"mucosa"},
        {n:"Célula G (gastrina)", d:"En el antro; detecta proteínas y distensión y envía gastrina por la sangre para estimular a las células parietales.", at:[4.85,-2.0,0.18], sub:"gcel"}
      ],
      quiz:{q:"¿Cómo evita el estómago que la pepsina lo digiera desde dentro de sus propias células?",
        ops:["La produce ya activa, pero en cantidades pequeñísimas","La fabrica como pepsinógeno inactivo y solo el ácido del interior del estómago la activa","La pepsina no puede digerir tejidos humanos"],
        ok:1, fb:"Es una precaución general del cuerpo: muchas enzimas digestivas se fabrican inactivas (zimógenos) y se activan fuera de la célula.",
        wrong:["Una enzima activa dentro de la célula la dañaría en cualquier cantidad; por eso se fabrica inactiva.","La pepsina rompe cualquier proteína, incluidas las del propio cuerpo: de ahí la precaución."]}},
    {id:"barrera-mucosa", nombre:"Barrera de moco y bicarbonato", capa:"glandula", color:"#8FD3DC", pos:[4.4,-0.8,0.1], lbl:[6.9,-3.7,0], anchor:[5.25,-0.47,0.62],
      n1:"Capa de gel de moco, de hasta 0,2 mm, con bicarbonato atrapado dentro, que cubre toda la superficie gástrica.",
      n2:"El moco no neutraliza el ácido de la luz: lo frena. Dentro del gel, el bicarbonato que segregan las células mucosas mantiene el pH cerca de 7 justo encima del epitelio, mientras a un par de décimas de milímetro el pH es 1–2. Sumada al epitelio sin huecos y a su recambio de 3 a 5 días, esta barrera es la razón de que el órgano no se digiera a sí mismo.",
      n3:"La úlcera aparece cuando la barrera falla, y en la inmensa mayoría de los casos falla por dos causas: la bacteria Helicobacter pylori y los antiinflamatorios como el ibuprofeno o la aspirina, que bloquean las prostaglandinas que mantienen el moco y el riego. Ni el estrés ni el ají causan úlcera: pueden molestar sobre una úlcera ya existente, pero no la producen. Barry Marshall y Robin Warren demostraron el papel de H. pylori en los años ochenta; Marshall llegó a beberse un cultivo de la bacteria para provocarse una gastritis y curarla con antibióticos. Recibieron el Premio Nobel de Medicina en 2005. En Ecuador la prevalencia de H. pylori es alta —los estudios nacionales la sitúan por encima del 60 % de la población adulta— y el cáncer gástrico está entre los de mayor mortalidad del país, por lo que detectar y tratar la infección tiene aquí un peso especial.",
      dato:"La úlcera es, casi siempre, una infección: se trata con antibióticos, no evitando las comidas condimentadas.",
      conecta:["mucosa","glandula-gastrica","cuerpo"], temas:["Salud","Microbiología","Historia de la ciencia"],
      quiz:{q:"Una persona tiene una úlcera gástrica. ¿Cuál es la causa más probable?",
        ops:["El estrés del trabajo y los disgustos","La infección por Helicobacter pylori o el uso de antiinflamatorios","Comer ají y alimentos condimentados"],
        ok:1, fb:"Marshall y Warren lo demostraron en los años ochenta y recibieron el Nobel en 2005: la mayoría de las úlceras se curan con antibióticos.",
        wrong:["El estrés puede aumentar las molestias de una úlcera que ya existe, pero no rompe la barrera mucosa por sí solo. Esta idea se mantuvo décadas y retrasó el tratamiento correcto.","El ají puede irritar una mucosa ya lesionada, pero no causa la úlcera: de hecho, la capsaicina no daña la barrera en personas sanas."]}}
  ],
  guiada:[
    {tipo:"select", target:"fundus", txt:"Localiza la <b>cúpula</b> del estómago, donde se acumula el aire que se traga."},
    {tipo:"select", target:"antro", txt:"Selecciona la región de <b>pared muscular más gruesa</b>, la que tritura el alimento contra el píloro."},
    {tipo:"anim", target:"mezcla", txt:"Activa la <b>mezcla gástrica</b> (Animación) y observa cómo la onda avanza hacia el píloro y el contenido rebota hacia atrás."},
    {tipo:"select", target:"muscular", txt:"En el corte de la pared, selecciona la capa con <b>tres planos de músculo</b>."},
    {tipo:"anim", target:"secrecion", txt:"Activa la <b>secreción gástrica</b> y fíjate en qué célula sale el H⁺ y en qué célula el pepsinógeno."},
    {tipo:"select", target:"barrera-mucosa", txt:"Selecciona la estructura que explica por qué el estómago <b>no se digiere a sí mismo</b>."},
    {tipo:"text", txt:"Explica con tus palabras cómo el estómago produce ácido a pH 1–2 sin destruirse y por qué hoy sabemos que la mayoría de las úlceras se tratan con antibióticos. Tu respuesta se guardará en el cuaderno."}
  ]
};

/* ======================= 2 · INTESTINO DELGADO ======================= */
BIO.smallBowel = {
  capasHint: "Sugerencia: activa solo las lupas para recorrer las tres escalas seguidas: pliegue, vellosidad y borde en cepillo.",
  id:"intestino-delgado", nombre:"Intestino delgado", unidad:6, dominio:"anat", eyebrow:"Atlas 3D · Unidad 6 · Sistema digestivo", em:"🌀",
  intro:"Sigue el quimo desde el duodeno hasta la válvula ileocecal y baja por la lupa de tres escalas —pliegue, vellosidad y microvellosidades— para entender cómo seis metros de tubo esconden unos 200 m² de superficie.",
  nota:"Modelo tridimensional simplificado con fines educativos. Las asas de yeyuno e íleon se representan esquemáticamente (en realidad miden unos 6 m y llenan gran parte del abdomen) y las tres escalas de la lupa están ampliadas miles de veces, cada una más que la anterior.",
  focusR:8.5, radius:15, target:[1.7,0.1,0], phi:1.45, theta:0.2, floor:-3.8, floorSize:13,
  capas:[
    {id:"duodeno", n:"Duodeno y conductos"},
    {id:"asas", n:"Yeyuno e íleon"},
    {id:"union", n:"Válvula ileocecal y mesenterio"},
    {id:"lupa", n:"Pliegue → vellosidad → microvellosidades (lupa)"}
  ],
  opacityCapas:["asas"], opacityLabel:"Transparencia de las asas intestinales", opacityDefault:0.95,
  activity:"explorar-intestino-delgado", guidedActivity:"guiada-intestino-delgado", badge:"anatomista", seenThreshold:7,
  related:[
    {t:"Estómago",href:"#/explorar/estomago"},
    {t:"Intestino grueso",href:"#/explorar/intestino-grueso"},
    {t:"Explorar la célula",href:"#/explorar/celula"}
  ],
  reto:{
    proposito:"Comprender cómo el intestino delgado multiplica su superficie en tres escalas encajadas y dónde va a parar cada nutriente absorbido.",
    observa:[
      {id:"papila-duodenal", txt:"Encuentra dónde desembocan la bilis y el jugo pancreático."},
      {id:"pliegues-circulares", txt:"Primera escala: los pliegues circulares de la pared."},
      {id:"vellosidad", txt:"Segunda escala: una vellosidad con su capilar y su quilífero."},
      {id:"microvellosidades", txt:"Tercera escala: el borde en cepillo de una sola célula."}
    ],
    pista:"Pista: sigue los tres aros de la lupa, de mayor a menor: cada uno amplía el anterior.",
    pregunta:{q:"Un tubo liso de 6 m y 3 cm de diámetro tendría menos de 1 m² de superficie interna. El intestino delgado alcanza unos 200 m². ¿Cómo lo consigue?",
      ops:["Porque es mucho más largo de lo que parece: mide más de 100 metros",
           "Porque tres niveles encajados —pliegues circulares, vellosidades y microvellosidades— multiplican la superficie, y cada nivel multiplica lo que ya multiplicó el anterior",
           "Porque el alimento pasa muchas veces por el mismo tramo"],
      ok:1, fb:"Los pliegues multiplican por unas 3 veces, las vellosidades por unas 10 y las microvellosidades por unas 20: multiplicados entre sí dan cientos de veces más superficie que un tubo liso.",
      wrong:["La longitud real en una persona viva es de unos 3 a 5 m (unos 6 a 7 m relajado tras la muerte). La clave no es la longitud, sino el relieve de la pared.","El tránsito es de un solo sentido: el quimo recorre el intestino una sola vez, en unas 3 a 5 horas."]}
  },
  structures:[
    {id:"duodeno", nombre:"Duodeno", capa:"duodeno", color:"#D98E74", pos:[0.75,1.75,0], lbl:[-0.86,3.56,0.1],
      n1:"Primer tramo del intestino delgado, con forma de C de unos 25 cm que abraza la cabeza del páncreas.",
      n2:"Aquí llega el quimo ácido desde el píloro y ocurre la neutralización: las glándulas duodenales y sobre todo el bicarbonato del páncreas suben el pH de 2 a cerca de 7, el rango en el que trabajan las enzimas pancreáticas. Su mucosa libera además hormonas (secretina y colecistoquinina) que ordenan al páncreas y a la vesícula biliar que viertan su contenido.",
      n3:"El duodeno es retroperitoneal: está pegado a la pared posterior del abdomen y casi no se mueve, a diferencia del yeyuno y el íleon, que cuelgan del mesenterio. Es la localización más frecuente de úlcera péptica, más incluso que el estómago, porque recibe el ácido concentrado antes de que se neutralice del todo.",
      dato:"Su nombre viene de duodeni: doce dedos, la longitud que le calcularon los anatomistas antiguos.",
      conecta:["papila-duodenal","via-biliar","conducto-pancreatico","yeyuno"], temas:["Sistema digestivo","pH","Hormonas"],
      quiz:{q:"¿Qué le ocurre al quimo ácido nada más entrar en el duodeno?",
        ops:["Se neutraliza gracias al bicarbonato del páncreas, hasta un pH cercano a 7","Se acidifica todavía más para terminar de digerir las proteínas","Se absorbe directamente a la sangre sin más cambios"],
        ok:0, fb:"Las enzimas pancreáticas necesitan pH neutro: con pH 2 no funcionarían.",
        wrong:["La pepsina del estómago deja de actuar justo al neutralizarse el quimo; la digestión de proteínas continúa con enzimas pancreáticas a pH neutro.","La absorción requiere antes que las enzimas terminen de romper los nutrientes."]}},
    {id:"papila-duodenal", nombre:"Papila duodenal mayor", capa:"duodeno", color:"#C8A24A", pos:[1.05,1.15,0.25], lbl:[-2.1,2.23,0.75],
      n1:"Pequeño relieve en el interior del duodeno donde desembocan juntos la vía biliar y el conducto pancreático.",
      n2:"Un anillo de músculo, el esfínter de Oddi, mantiene cerrada la salida entre comidas: la bilis se desvía entonces a la vesícula biliar, donde se concentra. Cuando llega grasa al duodeno, la colecistoquinina hace que la vesícula se contraiga y el esfínter se relaje, y ambos jugos entran a la vez.",
      n3:"Esa desembocadura compartida explica una enfermedad frecuente: si un cálculo biliar se enclava en la papila, bloquea también el conducto pancreático y el páncreas se digiere a sí mismo (pancreatitis aguda biliar). Si solo obstruye la vía biliar, la bilirrubina se acumula y aparece ictericia.",
      dato:"Bilis y jugo pancreático comparten la misma puerta de entrada: por eso un cálculo puede causar dos enfermedades.",
      conecta:["duodeno","via-biliar","conducto-pancreatico"], temas:["Sistema digestivo","Bilis","Urgencias"],
      quiz:{q:"¿Qué consecuencia tiene que la bilis y el jugo pancreático desemboquen por el mismo orificio?",
        ops:["Que la bilis digiere las proteínas","Que un cálculo enclavado allí puede bloquear los dos conductos y desencadenar una pancreatitis","Que el páncreas fabrica también bilis"],
        ok:1, fb:"Es la causa más frecuente de pancreatitis aguda: un cálculo que sale de la vesícula y se atasca en la papila.",
        wrong:["La bilis no tiene enzimas: emulsiona grasas para que la lipasa pueda actuar.","La bilis la fabrica el hígado; el páncreas produce enzimas y bicarbonato."]}},
    {id:"via-biliar", nombre:"Vía biliar (colédoco)", capa:"duodeno", color:"#5E9E52", pos:[1.35,2.35,-0.15], lbl:[1.32,3.71,-0.38], anchor:[1.43,2.27,-0.23],
      n1:"Conducto que trae al duodeno la bilis fabricada por el hígado y almacenada en la vesícula biliar.",
      n2:"La bilis no contiene enzimas: sus sales biliares actúan como un detergente y rompen las gotas grandes de grasa en miles de gotitas diminutas (emulsión). Así la lipasa pancreática, que solo trabaja en la superficie de las gotas, dispone de muchísima más superficie de ataque.",
      n3:"El hígado produce entre 600 y 1.000 mL de bilis al día, pero el 95 % de las sales biliares se reabsorbe en el íleon terminal y vuelve al hígado por la sangre portal: es la circulación enterohepática, que recicla el mismo material varias veces por comida. La bilis es también la vía por la que el cuerpo elimina la bilirrubina, el pigmento que da color a las heces.",
      dato:"Sin bilis, las grasas pasarían casi enteras a las heces: la digestión de la grasa caería en picado.",
      conecta:["papila-duodenal","duodeno","ileon"], temas:["Digestión de grasas","Hígado","Reciclaje"],
      quiz:{q:"¿Qué hace exactamente la bilis con las grasas?",
        ops:["Las digiere y las convierte en ácidos grasos","Las emulsiona: las rompe en gotitas para que la lipasa tenga más superficie donde actuar","Las transporta directamente a la sangre"],
        ok:1, fb:"La bilis es un detergente biológico, no una enzima: prepara el terreno para la lipasa pancreática.",
        wrong:["Quien rompe los enlaces químicos de la grasa es la lipasa pancreática; la bilis no es una enzima.","El transporte de las grasas absorbidas lo hacen los quilomicrones por la linfa, no la bilis."]}},
    {id:"conducto-pancreatico", nombre:"Conducto pancreático", capa:"duodeno", color:"#E0A040", pos:[1.55,0.75,-0.2], lbl:[-3.03,2.76,0.48],
      n1:"Conducto que vierte en el duodeno el jugo pancreático: enzimas para los tres nutrientes y bicarbonato.",
      n2:"El páncreas produce amilasa (almidón), lipasa (grasas) y proteasas como el tripsinógeno (proteínas), además de 1 a 1,5 litros diarios de líquido rico en bicarbonato que neutraliza el ácido gástrico. Las proteasas salen inactivas y solo se activan ya dentro del intestino.",
      n3:"El activador es la enteroquinasa, una enzima del borde en cepillo del duodeno: convierte el tripsinógeno en tripsina, y esta activa en cascada al resto. Este doble seguro —zimógenos inactivos más un activador que solo existe fuera del páncreas— evita que el órgano se digiera a sí mismo; cuando falla, ocurre la pancreatitis.",
      dato:"El páncreas fabrica las enzimas apagadas y el intestino les da el interruptor: así no se autodigiere.",
      conecta:["papila-duodenal","duodeno","microvellosidades"], temas:["Enzimas","Páncreas","Seguridad bioquímica"],
      quiz:{q:"¿Por qué el páncreas libera sus proteasas en forma inactiva?",
        ops:["Porque así duran más tiempo almacenadas","Porque si estuvieran activas digerirían el propio páncreas; se activan ya en el intestino","Porque el estómago las activaría demasiado pronto"],
        ok:1, fb:"El borde en cepillo del duodeno aporta la enteroquinasa, que enciende la cascada fuera del páncreas.",
        wrong:["La duración no es el problema: el riesgo es la autodigestión del órgano que las fabrica.","Las proteasas pancreáticas ni siquiera pasan por el estómago: se vierten directamente en el duodeno."]}},
    {id:"yeyuno", nombre:"Yeyuno", capa:"asas", color:"#D9836F", pos:[-0.65,0.25,0.2], lbl:[-3.67,0.34,0.8],
      n1:"Tramo medio del intestino delgado, el de las asas más anchas y de pared más gruesa. Aquí se absorbe la mayor parte de los nutrientes.",
      n2:"Su mucosa tiene los pliegues circulares más altos y las vellosidades más largas de todo el intestino: azúcares simples, aminoácidos y grasas se absorben sobre todo en el duodeno y el yeyuno, en los primeros 100 a 150 cm de recorrido. Junto con el íleon suma la mayor parte de los 3 a 5 m de intestino delgado de una persona viva.",
      n3:"Su nombre viene del latín ieiunus, en ayunas: los anatomistas lo encontraban siempre vacío en las disecciones, porque su tránsito es rápido y absorbe con enorme eficacia. El calcio y el hierro se absorben preferentemente en duodeno y yeyuno proximal, y ese hierro se absorbe mejor en su forma hemo (de origen animal) o acompañado de vitamina C.",
      dato:"Casi todo lo que comes ya está absorbido cuando el quimo lleva metro y medio de intestino.",
      conecta:["duodeno","ileon","pliegues-circulares","vellosidad"], temas:["Absorción","Nutrición","Anatomía"],
      quiz:{q:"¿Dónde se absorbe la mayor parte de los nutrientes de una comida?",
        ops:["En el estómago","En el duodeno y el yeyuno, en el primer metro y medio de intestino delgado","En el intestino grueso"],
        ok:1, fb:"Por eso el yeyuno tiene los pliegues más altos y las vellosidades más largas.",
        wrong:["El estómago absorbe casi nada: agua, alcohol y algunos fármacos.","El intestino grueso absorbe sobre todo agua, sales y algunas vitaminas de origen bacteriano."]}},
    {id:"ileon", nombre:"Íleon", capa:"asas", color:"#C97A63", pos:[-0.9,-1.7,0.2], lbl:[-3.2,-2.0,0.5],
      n1:"Tramo final del intestino delgado, de paredes más finas y vellosidades más cortas, que termina en la válvula ileocecal.",
      n2:"Es el único lugar del cuerpo donde se absorbe la vitamina B12 unida al factor intrínseco, y también donde se recuperan el 95 % de las sales biliares para devolverlas al hígado. Su pared alberga las placas de Peyer, cúmulos de tejido linfático que vigilan el enorme contenido microbiano que ya se acerca al colon.",
      n3:"Extirpar o inflamar el íleon terminal —como ocurre en la enfermedad de Crohn— produce anemia por falta de B12 y diarrea por sales biliares que llegan al colon sin reabsorberse. Las placas de Peyer forman parte del GALT, el tejido linfático asociado al intestino, que reúne alrededor del 70 % de las células inmunitarias del cuerpo.",
      dato:"La vitamina B12 solo se absorbe aquí, y solo si el estómago fabricó antes el factor intrínseco.",
      conecta:["yeyuno","valvula-ileocecal","via-biliar"], temas:["Absorción","Inmunidad","Vitaminas"],
      quiz:{q:"Una persona a la que le extirparon el íleon terminal desarrolla anemia. ¿Por qué?",
        ops:["Porque pierde sangre por la cicatriz","Porque el íleon terminal es el único sitio donde se absorbe la vitamina B12","Porque el hierro solo se absorbe en el íleon"],
        ok:1, fb:"Estómago (factor intrínseco) e íleon (absorción) trabajan juntos: si falla cualquiera de los dos, falta B12.",
        wrong:["La anemia aparece meses después de la cirugía, cuando se agotan las reservas hepáticas de B12: no es una pérdida de sangre.","El hierro se absorbe sobre todo en el duodeno y el yeyuno proximal."]}},
    {id:"valvula-ileocecal", nombre:"Válvula ileocecal", capa:"union", color:"#B06A55", pos:[-2.15,-2.75,0.1], lbl:[-4.25,-3.09,0.57],
      n1:"Unión entre el íleon y el ciego: un pliegue muscular que deja pasar el contenido en un solo sentido.",
      n2:"Se abre en pequeñas descargas cuando llega contenido desde el íleon y se cierra cuando el ciego se distiende. Su papel es doble: dosificar el paso al colon y, sobre todo, impedir que los miles de millones de bacterias del intestino grueso remonten hacia el delgado, mucho menos poblado.",
      n3:"Cuando esa barrera falla o el tránsito se enlentece aparece el sobrecrecimiento bacteriano del intestino delgado, con hinchazón, gases y diarrea. La diferencia poblacional es brutal: unas 10⁴ bacterias por mililitro en el yeyuno frente a más de 10¹¹ por gramo en el colon.",
      dato:"Es una puerta de sentido único: separa dos mundos microbianos que se diferencian en un millón de veces.",
      conecta:["ileon","mesenterio"], temas:["Microbiota","Anatomía","Barreras"],
      quiz:{q:"¿Cuál es la función principal de la válvula ileocecal?",
        ops:["Absorber el agua sobrante","Impedir que las bacterias del intestino grueso pasen al delgado y dosificar el paso del contenido","Producir enzimas digestivas"],
        ok:1, fb:"Separa un ambiente con pocas bacterias de otro densamente poblado.",
        wrong:["El agua se reabsorbe a lo largo del colon, no en la válvula.","Las enzimas vienen del páncreas y del borde en cepillo; la válvula es puramente mecánica."]}},
    {id:"mesenterio", nombre:"Mesenterio", capa:"union", color:"#EBD9A8", pos:[-0.3,-0.4,-0.6], lbl:[1.36,-1.12,-0.97], anchor:[0.05,-0.64,-0.76],
      n1:"Abanico de peritoneo que sujeta las asas intestinales a la pared posterior del abdomen y les lleva vasos y nervios.",
      n2:"Su raíz mide apenas 15 cm, pero su borde libre sostiene varios metros de intestino: por eso las asas pueden moverse con libertad sin enredarse. Entre sus dos hojas viajan la arteria mesentérica superior y sus ramas, las venas que llevan los nutrientes al hígado, los vasos linfáticos que recogen las grasas y los ganglios.",
      n3:"Toda la sangre que sale del intestino va antes al hígado por la vena porta: es el primer paso hepático, que permite filtrar y procesar lo absorbido antes de repartirlo al cuerpo. En 2016 se propuso describir el mesenterio como un órgano continuo, no como varias membranas separadas; el debate sigue abierto y es un buen ejemplo de que la anatomía también se revisa.",
      dato:"Nada de lo que absorbes pasa directo al cuerpo: primero el hígado lo revisa, gracias a las venas del mesenterio.",
      conecta:["yeyuno","ileon","quilifero"], temas:["Circulación portal","Peritoneo","Anatomía"],
      quiz:{q:"¿Adónde va la sangre cargada de nutrientes que sale del intestino delgado?",
        ops:["Directamente al corazón","Al hígado por la vena porta, antes de repartirse al resto del cuerpo","A los riñones para filtrarse"],
        ok:1, fb:"Ese primer paso hepático permite almacenar glucosa y neutralizar sustancias antes de que lleguen a la circulación general.",
        wrong:["Llega al corazón, pero solo después de pasar por el hígado.","Los riñones filtran la sangre del cuerpo entero, no específicamente la del intestino."]}},
    {id:"pliegues-circulares", nombre:"Pliegues circulares (escala 1)", capa:"lupa", color:"#E4A08A", pos:[4.3,2.3,0], lbl:[6.4,3.0,0],
      n1:"Repliegues permanentes y transversales de la mucosa y la submucosa, de hasta 8 mm de alto, que rodean la luz intestinal.",
      n2:"Son la primera de las tres escalas: multiplican la superficie unas 3 veces y, al ser circulares y no paralelos al eje, obligan al quimo a describir una espiral. Ese recorrido en remolino frena el avance y aumenta el contacto con la pared, lo que mejora la absorción.",
      n3:"A diferencia de los pliegues gástricos, no se borran al distenderse el intestino: son estructurales. Son altos y numerosos en el duodeno y el yeyuno y van desapareciendo en el íleon distal, siguiendo el mismo gradiente que la capacidad de absorción. En una radiografía con contraste dan al yeyuno su aspecto característico de pila de monedas.",
      dato:"Obligan al contenido a avanzar en espiral: más camino recorrido, más tiempo de contacto y más absorción.",
      conecta:["vellosidad","yeyuno","duodeno"], temas:["Superficie","Absorción","Histología"],
      partes:[
        {n:"Cresta del pliegue", d:"El repliegue incluye mucosa y submucosa: es permanente y no se borra al llenarse el intestino.", at:[4.3,3.05,0], sub:"pliegue"},
        {n:"Luz intestinal", d:"El quimo avanza en espiral alrededor de estos anillos, lo que alarga el recorrido y el tiempo de contacto.", at:[4.3,2.3,0.0], sub:"luz"}
      ],
      quiz:{q:"¿En qué se diferencian los pliegues circulares del intestino de los pliegues del estómago?",
        ops:["Los circulares son permanentes y aumentan la superficie de absorción; los gástricos se borran al llenarse el estómago","Son exactamente lo mismo en otro órgano","Los circulares solo aparecen cuando comemos"],
        ok:0, fb:"Unos son estructura fija de absorción; los otros, reserva temporal de superficie para distenderse.",
        wrong:["Se parecen a simple vista, pero cumplen funciones distintas y solo uno de ellos es permanente.","Están siempre presentes, llenos o vacíos: forman parte de la arquitectura de la pared."]}},
    {id:"vellosidad", nombre:"Vellosidad intestinal (escala 2)", capa:"lupa", color:"#E58C8C", pos:[4.3,-0.1,0], lbl:[6.5,0.75,0], anchor:[3.83,-0.11,0],
      n1:"Proyección de la mucosa con forma de dedo, de 0,5 a 1 mm de alto. Hay entre 20 y 40 en cada milímetro cuadrado.",
      n2:"Cada vellosidad está tapizada por enterocitos, las células absortivas, y por células caliciformes que producen moco. En su interior lleva su propia red de capilares y un vaso linfático central, el quilífero. Las vellosidades multiplican la superficie unas 10 veces sobre lo que ya habían conseguido los pliegues.",
      n3:"El epitelio intestinal se renueva cada 3 a 5 días desde las células madre del fondo de las criptas, que empujan a las nuevas células hacia la punta de la vellosidad, donde se desprenden. Por eso la quimioterapia, que ataca a las células que se dividen rápido, produce diarrea y llagas: afecta a este recambio. En la enfermedad celíaca el gluten desencadena una reacción inmunitaria que aplana las vellosidades, y con ellas desaparece la superficie de absorción.",
      dato:"Cada vellosidad es un órgano diminuto: tiene su arteria, su vena, su vaso linfático y su propio músculo.",
      conecta:["microvellosidades","capilar-vellosidad","quilifero","pliegues-circulares"], temas:["Absorción","Histología","Celiaquía"],
      partes:[
        {n:"Enterocito", d:"Célula absortiva de la superficie, con su borde en cepillo mirando a la luz intestinal.", at:[4.05,0.45,0.2], sub:"epitelio"},
        {n:"Capilar", d:"Recoge azúcares simples y aminoácidos y los lleva por la vena porta hasta el hígado.", at:[4.08,-0.15,0.12], sub:"capilar"},
        {n:"Quilífero central", d:"Vaso linfático que recoge las grasas ya empaquetadas en quilomicrones.", at:[4.3,-0.2,0], sub:"quilifero"},
        {n:"Cripta", d:"En su fondo están las células madre que renuevan todo el epitelio cada 3 a 5 días.", at:[4.3,-1.05,0], sub:"cripta"}
      ],
      quiz:{q:"¿Por qué una vellosidad necesita a la vez capilares y un vaso linfático?",
        ops:["Porque los capilares llevan oxígeno y el linfático lo devuelve","Porque los nutrientes hidrosolubles pasan a la sangre y las grasas, empaquetadas en quilomicrones, solo caben en la linfa","Porque el linfático absorbe el agua sobrante"],
        ok:1, fb:"Cada tipo de nutriente tiene su vía de salida: azúcares y aminoácidos por la sangre; grasas por la linfa.",
        wrong:["El sistema linfático no transporta oxígeno; eso lo hace la sangre en ambos sentidos.","El agua se absorbe por ósmosis hacia los capilares sanguíneos, no hacia el quilífero."]}},
    {id:"capilar-vellosidad", nombre:"Red capilar de la vellosidad", capa:"lupa", color:"#C8322E", pos:[4.05,-0.15,0.15], lbl:[6.5,-0.1,0], anchor:[4.12,-0.2,0],
      n1:"Malla de capilares justo bajo el epitelio que recoge lo absorbido y lo envía a la sangre.",
      n2:"Por aquí salen la glucosa, la galactosa y los aminoácidos, que entran en el enterocito con transportadores acoplados al sodio y cruzan después hacia el capilar. Toda esa sangre se reúne en la vena porta y va primero al hígado, que almacena glucosa como glucógeno y regula lo que llega al resto del cuerpo.",
      n3:"El flujo de sangre intestinal se multiplica después de comer (hiperemia posprandial): puede pasar del 10 % al 25 % del gasto cardíaco, lo que explica la somnolencia tras una comida copiosa. Los vasos de la vellosidad forman además un intercambio en contracorriente que, en situaciones de bajo riego, deja la punta de la vellosidad como la zona más vulnerable a la isquemia.",
      dato:"Azúcares y aminoácidos van por la sangre, y su primera parada obligatoria es el hígado.",
      conecta:["vellosidad","quilifero","mesenterio"], temas:["Absorción","Circulación portal","Transporte"],
      quiz:{q:"La glucosa absorbida en el intestino llega primero…",
        ops:["al cerebro","al hígado, por la vena porta","al músculo"],
        ok:1, fb:"El hígado regula la glucemia antes de que el azúcar llegue al resto del cuerpo.",
        wrong:["El cerebro consume mucha glucosa, pero la recibe de la circulación general, después del paso hepático.","El músculo también la usa, pero igualmente tras pasar por el hígado."]}},
    {id:"quilifero", nombre:"Vaso quilífero", capa:"lupa", color:"#F2E6C2", pos:[4.3,-0.3,0], lbl:[6.5,-0.95,0],
      n1:"Vaso linfático central de cada vellosidad. Recoge las grasas absorbidas y les da un camino distinto al de la sangre.",
      n2:"Dentro del enterocito, los ácidos grasos y los monoglicéridos se vuelven a unir en triglicéridos y se envuelven en proteínas formando gotas llamadas quilomicrones. Son demasiado grandes para atravesar la pared de un capilar sanguíneo, pero el quilífero tiene uniones abiertas entre sus células y los deja entrar.",
      n3:"La linfa cargada de grasa (el quilo) sube por el conducto torácico y desemboca en una vena cerca de la clavícula izquierda: así las grasas entran en la sangre sin pasar antes por el hígado. Esa ruta evita saturar al hígado tras una comida grasa, y explica que tras comer la linfa intestinal se vea blanquecina, como leche.",
      dato:"Las grasas evitan el filtro hepático: entran a la sangre por una vena del cuello, no por la vena porta.",
      conecta:["vellosidad","capilar-vellosidad","mesenterio"], temas:["Sistema linfático","Digestión de grasas","Transporte"],
      quiz:{q:"¿Por qué las grasas se absorben por la linfa y no directamente por la sangre?",
        ops:["Porque la sangre no puede transportar grasa","Porque los quilomicrones son demasiado grandes para entrar en un capilar sanguíneo, y el quilífero sí los admite","Porque la grasa es tóxica para el hígado"],
        ok:1, fb:"Es una cuestión de tamaño y de permeabilidad: el vaso linfático tiene uniones más abiertas.",
        wrong:["La sangre transporta grasas continuamente (por eso existen el colesterol y los triglicéridos en sangre); el problema es entrar en el capilar desde el intestino.","El hígado procesa grasas con normalidad: la ruta linfática solo evita saturarlo justo tras la comida."]}},
    {id:"microvellosidades", nombre:"Microvellosidades (escala 3)", capa:"lupa", color:"#F0C27A", pos:[4.3,-2.45,0], lbl:[6.5,-2.2,0],
      n1:"Prolongaciones diminutas de la membrana de cada enterocito, de 1 µm de alto. Forman el borde en cepillo.",
      n2:"Cada célula absortiva lleva entre 3.000 y 6.000: son la tercera escala y multiplican la superficie unas 20 veces más. En su membrana están ancladas las últimas enzimas de la digestión (lactasa, sacarasa, maltasa, peptidasas), de modo que el corte final del nutriente ocurre justo donde se va a absorber.",
      n3:"La intolerancia a la lactosa se explica aquí: la lactasa del borde en cepillo se pierde con la edad en gran parte de la humanidad y la lactosa no digerida sigue hasta el colon, donde las bacterias la fermentan y producen gases y diarrea. En los pueblos ganaderos de Europa y África oriental se seleccionó una mutación que mantiene la lactasa activa en la adultez; en la población indígena y mestiza de Ecuador la persistencia de lactasa es baja, así que la intolerancia es lo común y no una enfermedad.",
      dato:"Multiplicando las tres escalas —pliegues, vellosidades y microvellosidades— la superficie llega a unos 200 m².",
      conecta:["vellosidad","conducto-pancreatico"], temas:["Superficie","Enzimas","Intolerancia a la lactosa"],
      partes:[
        {n:"Borde en cepillo", d:"Entre 3.000 y 6.000 microvellosidades por célula: es la última y mayor multiplicación de superficie.", at:[4.3,-2.05,0], sub:"micro"},
        {n:"Enzimas de membrana", d:"Lactasa, sacarasa, maltasa y peptidasas: cortan el nutriente justo donde será absorbido.", at:[3.9,-2.15,0.25], sub:"enzimas"},
        {n:"Citoplasma del enterocito", d:"Aquí se vuelven a formar los triglicéridos y se empaquetan en quilomicrones antes de salir al quilífero.", at:[4.3,-2.75,0], sub:"cuerpo"}
      ],
      quiz:{q:"Una persona adulta bebe leche y le produce gases y diarrea. ¿Qué falta con más probabilidad?",
        ops:["Le falta bilis para digerir la grasa de la leche","Le falta lactasa en el borde en cepillo, y la lactosa llega sin digerir al colon donde fermenta","Le falta ácido en el estómago"],
        ok:1, fb:"La mayoría de la humanidad adulta pierde la lactasa: es lo habitual, no una enfermedad.",
        wrong:["La falta de bilis produciría heces grasas y claras, no el cuadro típico de gases tras la leche.","El ácido gástrico no interviene en la digestión de la lactosa."]}}
  ],
  guiada:[
    {tipo:"select", target:"papila-duodenal", txt:"Localiza el punto del duodeno donde <b>desembocan juntos</b> la bilis y el jugo pancreático."},
    {tipo:"select", target:"pliegues-circulares", txt:"En la lupa, selecciona la <b>primera escala</b> de multiplicación de la superficie."},
    {tipo:"select", target:"vellosidad", txt:"Selecciona la <b>segunda escala</b>: el dedo de mucosa con su capilar y su quilífero dentro."},
    {tipo:"anim", target:"absorcion", txt:"Activa la <b>absorción</b> (Animación) y observa por dónde sale cada nutriente: azúcares y aminoácidos por un lado, grasas por otro."},
    {tipo:"select", target:"quilifero", txt:"Selecciona el vaso por el que salen las <b>grasas</b> de la vellosidad."},
    {tipo:"select", target:"microvellosidades", txt:"Selecciona la <b>tercera escala</b>, la del borde en cepillo con sus enzimas."},
    {tipo:"text", txt:"Explica cómo tres escalas encajadas llevan la superficie del intestino hasta unos 200 m² y por qué las grasas viajan por la linfa mientras los azúcares van por la sangre. Tu respuesta se guardará en el cuaderno."}
  ]
};

/* ======================== 3 · INTESTINO GRUESO ======================== */
BIO.largeBowel = {
  capasHint: "Sugerencia: baja la transparencia de la pared para ver las haustras por dentro, y abre la lupa para mirar las criptas y la capa de microbiota.",
  id:"intestino-grueso", nombre:"Intestino grueso", unidad:6, dominio:"anat", eyebrow:"Atlas 3D · Unidad 6 · Sistema digestivo", em:"🔁",
  intro:"Recorre el marco del colon desde el ciego hasta el ano, descubre por qué tiene forma de saquitos y abre la lupa de la mucosa para ver las criptas, el moco y los billones de bacterias que fermentan lo que tú no puedes digerir.",
  nota:"Modelo tridimensional simplificado con fines educativos. El colon aparece vacío y abierto para poder verlo; las bacterias de la lupa se representan como formas de colores, enormemente ampliadas y muchísimo menos numerosas que en la realidad.",
  focusR:8.5, radius:15.2, target:[1.1,-0.35,0], phi:1.45, theta:0.2, floor:-4.2, floorSize:13,
  capas:[
    {id:"inicio", n:"Ciego y apéndice"},
    {id:"marco", n:"Marco cólico"},
    {id:"final", n:"Recto y ano"},
    {id:"pared", n:"Tenias, haustras y apéndices epiploicos"},
    {id:"lupa", n:"Mucosa del colon y microbiota (lupa)"}
  ],
  opacityCapas:["marco"], opacityLabel:"Transparencia del colon", opacityDefault:0.95,
  activity:"explorar-intestino-grueso", guidedActivity:"guiada-intestino-grueso", badge:"anatomista", seenThreshold:7,
  related:[
    {t:"Intestino delgado",href:"#/explorar/intestino-delgado"},
    {t:"Estómago",href:"#/explorar/estomago"},
    {t:"Ecosistemas y redes",href:"#/cn"}
  ],
  reto:{
    proposito:"Entender qué hace realmente el intestino grueso: cuánta agua recupera, qué aporta la microbiota que vive en él y por qué la fibra de la dieta le importa tanto.",
    observa:[
      {id:"haustras", txt:"Observa los saquitos (haustras) y las cintas musculares que los forman."},
      {id:"apendice", txt:"Localiza el apéndice y su reservorio de microbiota."},
      {id:"criptas", txt:"En la lupa, encuentra las criptas y las células caliciformes."},
      {id:"microbiota", txt:"Observa la capa de moco que separa las bacterias del epitelio."}
    ],
    pista:"Pista: usa Capas → Ver interior para mirar dentro del colon y seguir el recorrido del contenido.",
    pregunta:{q:"Al colon llegan cada día entre 1,5 y 2 litros de contenido líquido desde el intestino delgado, y se eliminan unos 100 a 150 g de heces. ¿Qué explica mejor esa diferencia?",
      ops:["El colon reabsorbe alrededor del 90 % de esa agua junto con sodio, y la microbiota fermenta los restos de fibra",
           "El agua se evapora dentro del abdomen","El intestino delgado se equivoca y envía demasiado líquido"],
      ok:0, fb:"El colon recupera cerca de 1,4 litros de agua al día; si el tránsito se acelera no le da tiempo y aparece la diarrea, la causa de la deshidratación que la hace peligrosa.",
      wrong:["Dentro del cuerpo no hay evaporación: el agua se mueve por ósmosis, siguiendo al sodio que el epitelio bombea.","No es un error: ese líquido son las secreciones digestivas (saliva, jugo gástrico, bilis, jugo pancreático) que el cuerpo recupera después."]}
  },
  structures:[
    {id:"ciego", nombre:"Ciego", capa:"inicio", color:"#D98E74", pos:[-2.3,-2.0,0], lbl:[-3.9,-2.6,0.4],
      n1:"Primera porción del intestino grueso: un fondo de saco en la parte baja derecha del abdomen, donde desemboca el íleon.",
      n2:"Recibe el contenido líquido del intestino delgado y empieza la reabsorción de agua y sodio. En los herbívoros el ciego es enorme —en un caballo puede superar los 30 litros— porque allí fermentan la celulosa; en el ser humano es pequeño, señal de que nuestra dieta dejó de depender de esa fermentación.",
      n3:"Su localización explica por qué el dolor de la apendicitis termina en la fosa ilíaca derecha. El contenido permanece aquí varias horas, el tiempo más largo de todo el colon, lo que favorece que las bacterias empiecen a fermentar la fibra que llega sin digerir.",
      dato:"Comparado con el de un caballo, nuestro ciego es minúsculo: cambiamos fermentación por una dieta más rica.",
      conecta:["apendice","colon-ascendente"], temas:["Anatomía","Evolución","Digestión comparada"],
      quiz:{q:"¿Por qué el ciego de un caballo es enorme y el nuestro pequeño?",
        ops:["Porque el caballo es más grande","Porque el caballo necesita fermentar celulosa durante horas y nosotros obtenemos energía de alimentos más digeribles","Porque el caballo no tiene estómago"],
        ok:1, fb:"La anatomía digestiva refleja la dieta: el tamaño del ciego es una pista evolutiva.",
        wrong:["No es proporción corporal: es una diferencia funcional de la dieta.","El caballo sí tiene estómago, aunque proporcionalmente pequeño."]}},
    {id:"apendice", nombre:"Apéndice vermiforme", capa:"inicio", color:"#C06A85", pos:[-2.65,-3.05,0.15], lbl:[-4.0,-3.9,0.4],
      n1:"Prolongación estrecha de unos 8 cm que cuelga del ciego, con abundante tejido linfático en su pared.",
      n2:"Durante mucho tiempo se consideró un órgano inútil, un vestigio. Hoy se le reconocen dos funciones: participa en la vigilancia inmunitaria del intestino y actúa como refugio de microbiota, un reservorio desde el que se recoloniza el colon después de una diarrea intensa.",
      n3:"La apendicitis ocurre cuando su luz, muy estrecha, se obstruye: la presión crece, el riego se corta y la pared puede perforarse en menos de un día. Es la urgencia quirúrgica abdominal más frecuente, y su signo clásico es un dolor que empieza alrededor del ombligo y en unas horas se localiza en la fosa ilíaca derecha. Quien no tiene apéndice no queda desprotegido: se recupera igual, solo un poco más despacio.",
      dato:"No es un órgano inútil: guarda una copia de seguridad de tu microbiota.",
      conecta:["ciego","microbiota"], temas:["Inmunidad","Microbiota","Urgencias"],
      quiz:{q:"¿Qué papel se le reconoce hoy al apéndice?",
        ops:["Ninguno: es un órgano inútil","Sirve como refugio de microbiota y participa en la defensa inmunitaria del intestino","Absorbe la mayor parte del agua del colon"],
        ok:1, fb:"Tras una diarrea intensa ayuda a recolonizar el colon con bacterias propias.",
        wrong:["Es la idea clásica, pero hoy se sabe que tiene tejido linfático activo y una función de reservorio.","El agua se reabsorbe a lo largo del colon, sobre todo en el ascendente y el transverso."]}},
    {id:"colon-ascendente", nombre:"Colon ascendente", capa:"marco", color:"#C9866B", pos:[-2.3,-0.2,0], lbl:[-4.48,-0.23,0.45],
      n1:"Tramo que sube por el lado derecho del abdomen desde el ciego hasta el hígado.",
      n2:"Aquí ocurre la mayor parte de la reabsorción de agua y de sodio: el contenido entra líquido y sale pastoso. El epitelio bombea sodio hacia fuera de la luz y el agua lo sigue por ósmosis, un mecanismo que la aldosterona puede reforzar cuando el cuerpo necesita retener sal y agua.",
      n3:"Es un tramo fijo, pegado a la pared posterior del abdomen. Su microbiota es la más activa del colon porque aún dispone de fibra y de agua para fermentar; por eso la mayor producción de ácidos grasos de cadena corta ocurre en el colon derecho, y el butirato producido allí alimenta directamente a las células del epitelio.",
      dato:"El contenido entra al colon casi líquido y ya en el ascendente empieza a espesarse.",
      conecta:["ciego","colon-transverso","criptas"], temas:["Absorción de agua","Osmosis","Microbiota"],
      quiz:{q:"¿Cómo reabsorbe agua el colon?",
        ops:["Bombeando agua directamente con gasto de ATP","Bombeando sodio fuera de la luz: el agua lo sigue por ósmosis","Evaporándola hacia la cavidad abdominal"],
        ok:1, fb:"No existen bombas de agua: el agua siempre sigue a los solutos.",
        wrong:["No hay bombas de agua en las membranas celulares; el transporte activo mueve iones, y el agua acompaña.","Dentro del cuerpo no hay evaporación posible."]}},
    {id:"colon-transverso", nombre:"Colon transverso", capa:"marco", color:"#D08E70", pos:[0,1.3,0], lbl:[0.0,2.9,0.4],
      n1:"Tramo que cruza el abdomen de derecha a izquierda, colgado del epiplón mayor bajo el estómago.",
      n2:"Es la porción más móvil del colon: cuelga de un mesenterio propio y en una persona de pie puede descender hasta cerca del ombligo. Continúa la reabsorción de agua y almacena el contenido, que aquí ya tiene consistencia pastosa.",
      n3:"Dos o tres veces al día, sobre todo después de comer, aparecen los movimientos en masa: contracciones potentes que empujan de golpe el contenido hacia el sigmoide y el recto. El reflejo gastrocólico —el estómago se llena y el colon se activa— explica las ganas de ir al baño poco después del desayuno.",
      dato:"El colon no empuja todo el tiempo: reserva la fuerza para dos o tres movimientos en masa al día.",
      conecta:["colon-ascendente","colon-descendente","haustras"], temas:["Motilidad","Reflejos","Anatomía"],
      quiz:{q:"¿Qué es el reflejo gastrocólico?",
        ops:["La activación del colon cuando el estómago se llena de comida","El paso del alimento del estómago al colon sin pasar por el delgado","La contracción del estómago cuando el colon está lleno"],
        ok:0, fb:"Por eso muchas personas sienten ganas de defecar poco después de desayunar.",
        wrong:["El contenido siempre recorre el intestino delgado antes de llegar al colon: tarda horas.","El reflejo va en el sentido contrario: del estómago al colon."]}},
    {id:"colon-descendente", nombre:"Colon descendente", capa:"marco", color:"#C57C63", pos:[2.3,-0.1,0], lbl:[0.24,-0.73,0.5],
      n1:"Tramo que baja por el lado izquierdo del abdomen hasta la fosa ilíaca izquierda.",
      n2:"Cuando el contenido llega aquí ya ha perdido casi toda el agua sobrante: su función es sobre todo almacenar y transportar. Su calibre es menor que el del colon derecho y su contenido, más consistente.",
      n3:"Precisamente por ese calibre menor y ese contenido más duro, es donde con más frecuencia aparecen los divertículos, pequeñas herniaciones de la mucosa a través de puntos débiles de la pared muscular. Se asocian a una presión interna alta mantenida durante años, típica de dietas pobres en fibra, y su inflamación (diverticulitis) provoca dolor en la parte baja izquierda del abdomen.",
      dato:"Lado derecho: se absorbe agua. Lado izquierdo: se almacena y se transporta.",
      conecta:["colon-transverso","sigmoide","apendices-epiploicos"], temas:["Anatomía","Fibra","Salud digestiva"],
      quiz:{q:"¿Por qué los divertículos son más frecuentes en el colon descendente y el sigmoide?",
        ops:["Porque allí viven más bacterias","Porque el calibre es menor y el contenido más duro, lo que eleva la presión sobre la pared","Porque es el tramo con más vellosidades"],
        ok:1, fb:"Una dieta rica en fibra ablanda el contenido y reduce esa presión mantenida.",
        wrong:["La densidad bacteriana es alta en todo el colon; no es lo que marca la diferencia.","El colon no tiene vellosidades: su mucosa es lisa, con criptas."]}},
    {id:"sigmoide", nombre:"Colon sigmoide", capa:"marco", color:"#B87055", pos:[1.35,-2.35,0], lbl:[2.37,-3.57,-0.05],
      n1:"Asa en forma de S que une el colon descendente con el recto, en la parte baja izquierda del abdomen.",
      n2:"Funciona como depósito: guarda las heces ya formadas hasta que un movimiento en masa las lleva al recto. Su pared muscular es gruesa y genera presiones altas, y su forma de bucle móvil le permite adaptarse al llenado.",
      n3:"Ese bucle móvil puede, en raras ocasiones, retorcerse sobre sí mismo (vólvulo de sigma) y obstruir el tránsito, algo más frecuente en personas mayores y en poblaciones de gran altitud con dietas muy ricas en fibra. Es también el tramo donde más pólipos aparecen, por lo que la colonoscopia de cribado le presta especial atención.",
      dato:"Las heces esperan aquí: el recto está casi siempre vacío hasta poco antes de la defecación.",
      conecta:["colon-descendente","recto"], temas:["Anatomía","Motilidad","Prevención"],
      quiz:{q:"¿Dónde se almacenan las heces formadas la mayor parte del tiempo?",
        ops:["En el recto","En el colon sigmoide","En el ciego"],
        ok:1, fb:"El recto solo se llena poco antes de la defecación: por eso su distensión desencadena el deseo de defecar.",
        wrong:["Si el recto estuviera lleno de forma permanente, sentiríamos ganas de defecar todo el tiempo.","En el ciego el contenido todavía es líquido y sigue reabsorbiéndose agua."]}},
    {id:"recto", nombre:"Recto", capa:"final", color:"#B5645A", pos:[0.1,-3.05,0], lbl:[-1.3,-3.3,0.4],
      n1:"Tramo final de unos 12 a 15 cm, sin tenias ni haustras, que recibe las heces justo antes de la defecación.",
      n2:"Sus paredes tienen receptores de estiramiento: cuando el contenido llega desde el sigmoide y lo distiende, aparece el deseo de defecar. Si el momento no es adecuado, la contracción voluntaria del esfínter externo devuelve el contenido al sigmoide y la sensación cede durante un rato.",
      n3:"Su mucosa está muy vascularizada y absorbe bien ciertos fármacos, que por esta vía entran a la circulación general evitando en parte el primer paso hepático: de ahí la utilidad de los supositorios cuando hay vómitos. Ignorar de forma repetida el deseo de defecar reduce la sensibilidad rectal y contribuye al estreñimiento.",
      dato:"El deseo de defecar no nace en el ano, sino en los receptores de estiramiento del recto.",
      conecta:["sigmoide","ano"], temas:["Reflejos","Control voluntario","Salud"],
      quiz:{q:"¿Qué desencadena el deseo de defecar?",
        ops:["La llegada de comida al estómago","La distensión del recto cuando el contenido llega desde el sigmoide","La contracción del esfínter externo"],
        ok:1, fb:"Es un reflejo de estiramiento, con una parte automática y otra voluntaria.",
        wrong:["Comer activa el reflejo gastrocólico, pero la sensación concreta nace de la distensión rectal.","El esfínter externo es el que retrasa la defecación de forma voluntaria; no es lo que la desencadena."]}},
    {id:"ano", nombre:"Ano y esfínteres", capa:"final", color:"#9E5A4E", pos:[0.1,-3.75,0], lbl:[-0.57,-4.43,0.22],
      n1:"Salida del tubo digestivo, controlada por dos esfínteres: uno interno involuntario y otro externo voluntario.",
      n2:"El esfínter interno, de músculo liso, se relaja de forma automática cuando el recto se distiende. El externo, de músculo estriado, obedece a la voluntad y permite retrasar la defecación. Entre ambos, una zona de mucosa muy sensible distingue si lo que llega es gas, líquido o sólido.",
      n3:"El control voluntario no está presente al nacer: se adquiere hacia los 2 o 3 años, cuando maduran las vías nerviosas. Es uno de los pocos lugares del cuerpo donde músculo liso y estriado colaboran en el mismo acto, y ese doble control es lo que convierte un reflejo automático en una función social.",
      dato:"Dos esfínteres, dos tipos de músculo: uno obedece al reflejo y el otro a tu decisión.",
      conecta:["recto"], temas:["Control motor","Desarrollo","Fisiología"],
      quiz:{q:"¿Qué diferencia al esfínter anal interno del externo?",
        ops:["El interno es voluntario y el externo automático","El interno es músculo liso y se relaja por reflejo; el externo es estriado y se controla voluntariamente","Ambos son voluntarios"],
        ok:1, fb:"Ese doble control permite decidir cuándo, aunque el reflejo ya haya empezado.",
        wrong:["Es justo al revés: el músculo liso nunca está bajo control voluntario.","Si ambos fueran voluntarios, no existiría el reflejo que avisa de que el recto está lleno."]}},
    {id:"tenias", nombre:"Tenias del colon", capa:"pared", color:"#E8D18A", pos:[-2.3,0.9,0.45], lbl:[-4.33,1.04,0.77], anchor:[-2.51,0.88,0.42],
      n1:"Tres cintas de músculo longitudinal que recorren el colon de punta a punta, separadas entre sí.",
      n2:"En el resto del tubo digestivo la capa longitudinal envuelve el tubo por completo; en el colon se concentra en estas tres bandas. Como son más cortas que el propio colon, lo fruncen, y ese fruncido es el que da origen a las haustras.",
      n3:"Las tres tenias convergen en la base del apéndice: seguirlas es el truco clásico del cirujano para encontrarlo cuando está en una posición rara. Las tenias desaparecen en el recto, donde la capa longitudinal vuelve a ser completa, lo que explica que el recto sea liso y no tenga saquitos.",
      dato:"Las tenias son más cortas que el colon: por eso lo fruncen, como el hilo de una cortina.",
      conecta:["haustras","colon-ascendente","apendice"], temas:["Histología","Anatomía","Cirugía"],
      quiz:{q:"¿Por qué el colon tiene forma de saquitos y el intestino delgado no?",
        ops:["Porque el colon está siempre más lleno","Porque las tres tenias son más cortas que el colon y lo fruncen","Porque el colon tiene menos músculo circular"],
        ok:1, fb:"Sin tenias, como en el recto, la pared es lisa.",
        wrong:["El llenado cambia el calibre, pero no crea las haustras: están también en el colon vacío.","El músculo circular es continuo en todo el colon; lo que cambia es la disposición del longitudinal."]}},
    {id:"haustras", nombre:"Haustras", capa:"pared", color:"#D69C7A", pos:[0,1.55,0.35], lbl:[2.2,2.85,0.5],
      n1:"Saquitos sucesivos en los que queda dividido el colon por el fruncido de las tenias.",
      n2:"No son fijos: aparecen y desaparecen al contraerse el músculo circular. Esas contracciones segmentarias amasan el contenido hacia adelante y hacia atrás sin hacerlo avanzar, lo que alarga el tiempo de contacto con la pared y mejora la reabsorción de agua.",
      n3:"El contenido tarda entre 12 y 48 horas en recorrer el colon, frente a las 3 a 5 horas del intestino delgado. Ese tiempo es lo que permite recuperar el agua y lo que da a la microbiota la oportunidad de fermentar. En una radiografía de abdomen, las haustras son la marca que distingue el colon de las asas del intestino delgado.",
      dato:"El contenido pasa de 3 a 5 horas en el intestino delgado y hasta 48 en el grueso.",
      conecta:["tenias","colon-transverso","criptas"], temas:["Motilidad","Absorción de agua","Radiología"],
      quiz:{q:"¿Qué ventaja tiene que el contenido avance tan despacio por el colon?",
        ops:["Da tiempo a reabsorber el agua y a que la microbiota fermente la fibra","Permite digerir las proteínas que quedaron","Evita que se formen gases"],
        ok:0, fb:"Si el tránsito se acelera, el agua no se reabsorbe: eso es exactamente la diarrea.",
        wrong:["La digestión de proteínas termina en el intestino delgado; en el colon ya casi no hay enzimas propias.","Ocurre lo contrario: cuanto más tiempo, más fermentación y más gas, que es normal y saludable."]}},
    {id:"apendices-epiploicos", nombre:"Apéndices epiploicos", capa:"pared", color:"#EFD08A", pos:[2.3,-0.9,0.4], lbl:[1.05,-1.25,0.6], anchor:[2.78,-1.23,0.15],
      n1:"Pequeños colgajos de grasa recubiertos de peritoneo que cuelgan de la superficie externa del colon.",
      n2:"Son exclusivos del intestino grueso: junto con las tenias y las haustras forman el trío de rasgos que permiten reconocer el colon a simple vista en una cirugía y distinguirlo del intestino delgado.",
      n3:"Ocasionalmente uno de ellos se retuerce sobre su pedículo y se infarta (apendagitis epiploica): produce un dolor abdominal localizado que puede confundirse con una apendicitis o una diverticulitis, pero se resuelve solo con analgesia. Reconocerlo en una tomografía evita una cirugía innecesaria.",
      dato:"Tenias, haustras y apéndices epiploicos: los tres carnés de identidad del intestino grueso.",
      conecta:["colon-descendente","tenias"], temas:["Anatomía","Peritoneo","Diagnóstico"],
      quiz:{q:"¿Cómo distingue un cirujano el colon del intestino delgado a simple vista?",
        ops:["Por el color","Por sus tenias, sus haustras y sus apéndices epiploicos","Por el olor"],
        ok:1, fb:"Son tres rasgos exclusivos del intestino grueso, visibles desde fuera.",
        wrong:["El color es muy parecido en ambos: no sirve para distinguirlos con seguridad.","No es un criterio anatómico ni fiable."]}},
    {id:"criptas", nombre:"Criptas y células caliciformes (lupa)", capa:"lupa", color:"#E9A0A8", pos:[4.4,0.5,0], lbl:[6.75,0.35,0], anchor:[4.42,0.53,0.34],
      n1:"La mucosa del colon no tiene vellosidades: es lisa y está perforada por criptas, tubos rectos llenos de células productoras de moco.",
      n2:"Su epitelio tiene dos tareas: absorber agua y sodio, y fabricar moco. Las células caliciformes, mucho más abundantes aquí que en el intestino delgado, segregan el moco que lubrica unas heces cada vez más secas y que sostiene la barrera frente a las bacterias. En el fondo de cada cripta, las células madre renuevan todo el epitelio cada 4 o 5 días.",
      n3:"El colon no tiene vellosidades porque no necesita superficie para absorber nutrientes: para el agua y las sales le basta con una superficie lisa. Ese recambio celular tan veloz es también su punto débil: casi todos los cánceres de colon empiezan como un pólipo en una cripta, y crecen despacio durante años, por lo que la colonoscopia permite extirparlos antes de que se vuelvan malignos.",
      dato:"Sin vellosidades y con muchas más células de moco: la mucosa del colon está hecha para el agua, no para los nutrientes.",
      conecta:["microbiota","colon-ascendente","haustras"], temas:["Histología","Prevención","Regeneración"],
      partes:[
        {n:"Cripta", d:"Tubo recto hundido en la mucosa; en su fondo están las células madre que renuevan el epitelio cada 4 o 5 días.", at:[4.4,0.2,0], sub:"cripta"},
        {n:"Célula caliciforme", d:"Fábrica de moco: mucho más abundante aquí que en el intestino delgado, lubrica unas heces cada vez más secas.", at:[4.05,0.65,0.2], sub:"caliciforme"},
        {n:"Enterocito absortivo", d:"Bombea sodio fuera de la luz; el agua lo sigue por ósmosis.", at:[4.75,0.7,0.2], sub:"absortivo"}
      ],
      quiz:{q:"¿Por qué la mucosa del colon no tiene vellosidades?",
        ops:["Porque las perdió por el roce de las heces","Porque su tarea es absorber agua y sales, y para eso no necesita multiplicar la superficie","Porque las bacterias se las comen"],
        ok:1, fb:"La forma sigue a la función: superficie enorme donde hay que absorber nutrientes, superficie lisa donde solo hay que recuperar agua.",
        wrong:["No es un desgaste: el colon nunca desarrolla vellosidades, ni siquiera en el embrión maduro.","La microbiota vive sobre la capa de moco y no destruye el epitelio sano."]}},
    {id:"microbiota", nombre:"Microbiota y capa de moco (lupa)", capa:"lupa", color:"#6FAE6A", pos:[4.4,1.35,0], lbl:[5.46,3.14,-0.44],
      n1:"Una comunidad de billones de bacterias vive sobre el moco del colon; solo pesan unos 200 gramos, pero hacen un trabajo químico enorme.",
      n2:"Fermentan la fibra que nuestras enzimas no pueden romper y producen ácidos grasos de cadena corta: acetato, propionato y butirato. El butirato es el alimento principal de las células del propio colon, hasta el 70 % de su energía. También fabrican vitamina K y varias del grupo B, compiten con los microbios patógenos y educan al sistema inmunitario. El moco se organiza en dos capas: la externa, habitada por bacterias, y la interna, densa y prácticamente estéril, que impide el contacto directo con el epitelio.",
      n3:"Conviene ser preciso con lo que se afirma: la microbiota produce vitamina K en cantidad útil y también vitamina B12, pero esta se sintetiza en el colon, donde ya no hay receptores para absorberla —esos están en el íleon—, así que la B12 de nuestras bacterias se pierde en las heces y debemos obtenerla de la dieta. Sin fibra, las bacterias empiezan a consumir el moco protector y la barrera se adelgaza: por eso la fibra de frutas, verduras, legumbres y granos enteros importa tanto. Un aporte razonable son unos 25 a 30 g diarios.",
      dato:"El gas intestinal es sobre todo señal de fermentación: una microbiota bien alimentada produce gas, y eso es normal.",
      conecta:["criptas","apendice","colon-ascendente"], temas:["Microbiota","Nutrición","Inmunidad"],
      partes:[
        {n:"Capa de moco externa", d:"Habitada por bacterias: es su terreno de vida y de fermentación.", at:[4.4,1.25,0.2], sub:"mocoext"},
        {n:"Capa de moco interna", d:"Densa y prácticamente estéril: mantiene a las bacterias lejos del epitelio.", at:[4.4,1.0,0.2], sub:"mocoint"},
        {n:"Bacterias fermentadoras", d:"Rompen la fibra y liberan acetato, propionato y butirato, el combustible de las células del colon.", at:[4.4,1.7,0.1], sub:"bacterias"}
      ],
      quiz:{q:"¿Cuál de estas afirmaciones sobre la microbiota del colon es correcta?",
        ops:["Fermenta la fibra y produce ácidos grasos de cadena corta que alimentan a las células del colon",
             "Digiere las proteínas y las grasas que el intestino delgado no absorbió, y así aprovechamos toda la comida",
             "Nos aporta toda la vitamina B12 que necesitamos"],
        ok:0, fb:"El butirato producido por las bacterias cubre hasta el 70 % de la energía de las células del epitelio del colon.",
        wrong:["La fermentación de proteínas en el colon es minoritaria y produce compuestos poco favorables; la digestión de proteínas y grasas termina en el intestino delgado.","Sí la producen, pero en el colon ya no hay receptores para absorberla: esos están en el íleon, antes. La B12 debe venir de la dieta."]}},
    {id:"parasitosis", nombre:"Parásitos intestinales y agua segura", capa:"lupa", color:"#7FA9C9", pos:[4.4,-1.35,0], lbl:[6.4,-2.0,0],
      n1:"Algunos parásitos —amebas, Giardia, áscaris— colonizan el intestino y compiten con nosotros por los nutrientes.",
      n2:"Casi todos llegan por vía fecal-oral: agua sin tratar, verduras regadas o lavadas con esa agua, o manos sin lavar. En el colon, la amebiasis produce diarrea con sangre y moco porque la ameba invade la mucosa; Giardia actúa antes, en el intestino delgado, y estropea el borde en cepillo, lo que causa diarrea grasa y pérdida de peso.",
      n3:"En Ecuador la parasitosis intestinal sigue siendo frecuente en la niñez, con cifras muy desiguales entre zonas urbanas con agua potable y zonas rurales o periurbanas sin saneamiento; en varias comunidades rurales los estudios encuentran más de la mitad de los escolares parasitados. Esto no es una cuestión de higiene personal ni de culpa: es una cuestión de infraestructura. Hervir el agua, clorarla, lavar frutas y verduras con agua segura y mejorar el saneamiento reducen la transmisión. La parasitosis crónica causa anemia y desnutrición, y afecta al crecimiento y al rendimiento escolar.",
      dato:"El agua segura previene más enfermedades digestivas que cualquier medicamento.",
      conecta:["microbiota","criptas","ciego"], temas:["Salud pública","Ecuador","Prevención"],
      quiz:{q:"¿Cuál es la medida que más reduce la parasitosis intestinal en una comunidad?",
        ops:["Tomar antiparasitarios cada mes por si acaso","Garantizar agua segura y saneamiento, y lavar los alimentos con esa agua","Evitar las frutas y las verduras crudas para siempre"],
        ok:1, fb:"El tratamiento cura a la persona, pero si el agua sigue contaminada la reinfección es cuestión de semanas.",
        wrong:["Desparasitar sin cortar la vía de transmisión lleva a reinfecciones continuas y favorece resistencias.","Frutas y verduras son necesarias: el problema no son ellas, sino el agua con la que se riegan o se lavan."]}}
  ],
  guiada:[
    {tipo:"select", target:"ciego", txt:"Localiza el <b>inicio</b> del intestino grueso, donde desemboca el íleon."},
    {tipo:"select", target:"tenias", txt:"Selecciona las <b>tres cintas musculares</b> que fruncen el colon."},
    {tipo:"anim", target:"transito", txt:"Activa el <b>tránsito y la reabsorción de agua</b> (Animación) y observa cómo el contenido se va espesando."},
    {tipo:"select", target:"criptas", txt:"En la lupa, selecciona la <b>mucosa del colon</b> con sus criptas y sus células de moco."},
    {tipo:"anim", target:"fermentacion", txt:"Activa la <b>fermentación bacteriana</b> y observa qué producen las bacterias a partir de la fibra."},
    {tipo:"select", target:"microbiota", txt:"Selecciona la comunidad que <b>fermenta la fibra</b> y produce ácidos grasos de cadena corta."},
    {tipo:"text", txt:"Explica cuánta agua reabsorbe el colon, qué hace realmente la microbiota con la fibra y por qué el agua segura es clave para la salud digestiva en el Ecuador. Tu respuesta se guardará en el cuaderno."}
  ]
};

/* =====================================================================
   MODELOS 3D
   ===================================================================== */

/* ------------------------------ ESTÓMAGO ------------------------------ */
function buildStomach(E){
  orgvFrame(E, 1.42);
  const low = E.low, D = BIO.stomach, S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s = S[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, interno:s.interno, explodeDir:V3(s.pos).sub(new THREE.Vector3(1.2,0.1,0)).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl); return p; };
  const R = Kit.rng(23);
  const seg = low ? 22 : 40, rad = low ? 12 : 20;
  /* serosa gástrica: rosa salmón con red capilar y brillo húmedo */
  const wall = (tint, bump) => orgvTex.mat({ tex:'serosa', rep:[4,2], bump: bump ?? 0.014, color:tint, rough:0.48, coat:0.7, coatRough:0.2, env:0.85 });

  /* --- cardias y esófago terminal --- */
  const eso = new THREE.Mesh(Kit.taper([[0.2,3.75,0],[0.1,3.1,0],[0.02,2.62,0]], 0.3, 0.42, { seg, rad }), wall(0xF0DCD4));
  eso.userData.sub = 'esofago';
  const ringC = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.08, 8, 26), wall(0xE0C4BA, 0.008));
  ringC.rotation.x = Math.PI/2; ringC.position.set(0.04, 2.62, 0); ringC.userData.sub = 'union';
  add('cardias', [eso, ringC]);

  /* --- fundus, cuerpo, antro y canal pilórico: UNA sola pared continua (sin costuras) barrida a lo largo de la
         línea media en J y cortada después en regiones; la curvatura mayor es el borde convexo y la menor el cóncavo --- */
  const JPTS = [[-1.3,3.08,0],[-1.12,2.5,0],[-0.8,1.72,0],[-0.64,0.8,0],[-0.52,-0.1,0],[-0.16,-0.78,0],[0.42,-1.16,0],[1.12,-1.08,0],[1.58,-0.9,0],[2.1,-0.62,0]];
  const JC = Kit.curve(JPTS);
  const JR = u => { const cap = 0.07; const dome = u < cap ? Math.sqrt(Math.max(0, 1 - Math.pow(1 - u/cap, 2))) : 1;
    const r = 1.02 - 0.06*smooth01((u-0.12)/0.3) - 0.3*smooth01((u-0.5)/0.18) - 0.3*smooth01((u-0.7)/0.14) - 0.06*smooth01((u-0.86)/0.14); return Math.max(0.02, r*dome); };
  const JT = low ? 70 : 130, JRAD = low ? 18 : 30;
  const jg = Kit.taper(JPTS, 0, 0, { rfn:JR, seg:JT, rad:JRAD });
  { const p = jg.attributes.position; for (let i=0;i<p.count;i++){ const x = p.getX(i), y = p.getY(i), z = p.getZ(i); p.setZ(i, z*0.86 + 0.012*Kit.fbm(x*3, y*3, z*3, 2)); } jg.computeVertexNormals(); }
  const jArc = []; for (let i=0;i<=JT;i++) jArc.push(i/JT);
  const uAt = x => { let best = 0, bd = 1e9; for (let i=0;i<=40;i++){ const q = JC.getPointAt(i/40); const d = Math.abs(q.x - x) + (q.y > 0 ? 9 : 0); if (d < bd){ bd = d; best = i/40; } } return best; };
  const uA = uAt(-0.16), uP = uAt(1.12);
  const jp0 = Kit.split(jg, i => { const u = Math.floor(i/(JRAD+1))/JT; return u >= uA ? 'rest' : 'sup'; });
  /* corte limpio (plano perpendicular a la línea media) entre antro y canal pilórico: el canal no se transparenta */
  const PC0 = JC.getPointAt(uP), PT0 = JC.getTangentAt(uP), rp = jp0.rest.attributes.position;
  const jp1 = Kit.splitPlane(jp0.rest, i => (rp.getX(i)-PC0.x)*PT0.x + (rp.getY(i)-PC0.y)*PT0.y + (rp.getZ(i)-PC0.z)*PT0.z, 'ant', 'pil');
  const jparts = { sup: jp0.sup, ant: jp1.ant, pil: jp1.pil };
  const sup = Kit.splitPlane(jparts.sup, i => jparts.sup.attributes.position.getY(i) - 1.86, 'cue', 'fun');
  const fun = new THREE.Mesh(sup.fun, wall(0xFFF2EE)); fun.userData.sub = 'fundus';
  add('fundus', [fun]);
  const cue = new THREE.Mesh(sup.cue, wall(0xFFFFFF));
  add('cuerpo', [cue]);
  const ant = new THREE.Mesh(jparts.ant, wall(0xF2E2DC));
  add('antro', [ant]);
  /* cuerpo del estómago que usan los pliegues y la onda peristáltica */
  const bodyPts = []; for (let i=0;i<=8;i++) bodyPts.push(JC.getPointAt(0.1 + (uA-0.1)*i/8));
  const bodyCurve = Kit.curve(bodyPts);
  const bodyR = u => JR(0.1 + (uA-0.1)*u)*0.97;

  /* --- píloro con esfínter y bulbo duodenal --- */
  const pil = new THREE.Mesh(jparts.pil, wall(0xE8D2CA));
  pil.userData.sub = 'canal';
  const sph = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.13, 8, 24), wall(0xD8B8AE, 0.006));
  { const dir = new THREE.Vector3(0.46,0.18,0).normalize(); const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    sph.setRotationFromQuaternion(q); sph.position.set(1.5, -0.93, 0); sph.userData.sub = 'esfinter'; }
  const duo = new THREE.Mesh(Kit.taper([[2.05,-0.64,0],[2.5,-0.42,0]], 0.3, 0.28, { seg:10, rad:12 }), wall(0xF6E6DE));
  duo.userData.sub = 'duodeno';
  add('piloro', [pil, sph, duo]);

  /* bordes de la pared: curvatura mayor (convexa) y menor (cóncava), calculadas sobre la propia pared */
  const edgeLine = (sgn, u0, u1, n) => { const out = []; for (let i=0;i<=n;i++){ const u = u0 + (u1-u0)*i/n; const c = JC.getPointAt(u), t = JC.getTangentAt(u); const nrm = new THREE.Vector3(-t.y, t.x, 0).normalize().multiplyScalar(sgn); out.push(c.clone().addScaledVector(nrm, JR(u)*1.0 + 0.02)); } return out; };

  /* --- curvaturas --- */
  const curvM = Kit.tissue({ color:0xC8A24A, rough:0.4, coat:0.6 });
  const mayor = new THREE.Mesh(Kit.taper(edgeLine(-1, 0.06, 0.86, 30), 0.075, 0.06, { seg: low?30:60, rad:8 }), curvM);
  mayor.userData.sub = 'mayor';
  const menor = new THREE.Mesh(Kit.taper(edgeLine(1, 0.24, 0.86, 22), 0.06, 0.05, { seg: low?24:44, rad:8 }), curvM);
  menor.userData.sub = 'menor';
  add('curvaturas', [mayor, menor]);

  /* --- pliegues gástricos (interior) --- */
  const folds = [];
  const nF = low ? 7 : 11;
  for (let k=0;k<nF;k++){
    const a0 = (k/nF)*Math.PI*2; const pts = [];
    for (let i=0;i<=12;i++){ const u = 0.08 + (i/12)*0.86; const c = bodyCurve.getPointAt(u); const a = a0 + 2.2*u;
      const rr = bodyR(u)*0.74 + 0.03*Math.sin(u*14+k);
      pts.push(new THREE.Vector3(c.x + Math.cos(a)*rr*0.9, c.y, c.z + Math.sin(a)*rr)); }
    folds.push(Kit.taper(pts, 0.062, 0.05, { seg: low?14:22, rad:6 }));
  }
  const fol = new THREE.Mesh(Kit.merge(folds), Kit.tissue({ color:0xD68C7C, rough:0.5, coat:0.4, tex:'tissue', rep:[2,2], bump:0.008 }));
  add('pliegues', [fol], { explodeDir:new THREE.Vector3(-0.6,-0.3,0.4).normalize() });

  /* --- corte de la pared: cuatro capas apiladas --- */
  const BX = 4.4, BZ = 0, SX = 2.7, SZ = 1.8;
  const slab = (y, th, color, sub, texo) => { const m = new THREE.Mesh(new THREE.BoxGeometry(SX, th, SZ), Kit.tissue(Object.assign({ color, rough:0.78, coat:0.05, env:0.4 }, texo||{})));
    m.position.set(BX, y, BZ); if (sub) m.userData.sub = sub; return m; };
  const muc = slab(1.56, 0.38, 0xCF5E72, 'epitelio', { tex:'tissue', rep:[2,1], bump:0.01 });
  const mucm = slab(1.335, 0.07, 0x9C4E66, 'muscular-mucosa');
  add('mucosa', [muc, mucm]);
  add('submucosa', [slab(1.17, 0.26, 0xE0A95C, 'conectivo'), slab(1.17, 0.05, 0xB8433C, 'vasos')]);
  const mo = slab(0.955, 0.17, 0xA6473C, 'oblicuo'), mc = slab(0.765, 0.21, 0x8B342C, 'circular'), ml = slab(0.58, 0.16, 0x6F241E, 'longitudinal');
  add('muscular', [mo, mc, ml]);
  add('serosa', [slab(0.46, 0.08, 0x9FC3D4, 'peritoneo')]);
  /* etiqueta visual: corte de pared unido al estómago con una línea guía */
  const guideM = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:true });
  const link = new THREE.Mesh(Kit.taper([[0.85,-0.2,0.35],[2.5,0.7,0.2],[3.15,1.15,0.1]], 0.012, 0.012, { seg:8, rad:6 }), guideM);
  E.scene.add(link);

  /* --- lupa: glándula gástrica --- */
  const GC = new THREE.Vector3(4.4, -1.6, 0);
  const loupe = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.022, 8, 60), guideM);
  loupe.position.copy(GC); E.scene.add(loupe);
  const lead = new THREE.Mesh(Kit.taper([[BX, 1.3, 0.55],[BX+0.7, 0.15, 0.5],[GC.x+0.3, GC.y+1.05, 0.35]], 0.01, 0.01, { seg:8, rad:6 }), guideM);
  E.scene.add(lead);

  /* superficie del epitelio y foveola (cuello de la glándula) */
  const glandM = Kit.tissue({ color:0xE0A695, rough:0.5, coat:0.45 });
  const surf = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 1.2), glandM); surf.position.set(GC.x, GC.y+0.95, 0);
  const pit = new THREE.Mesh(Kit.taper([[GC.x, GC.y+0.95, 0],[GC.x, GC.y+0.1, 0],[GC.x, GC.y-0.95, 0]], 0.17, 0.13, { seg:14, rad:12 }), glandM);
  pit.userData.sub = 'lumen';
  const cellMat = c => Kit.tissue({ color:c, rough:0.4, coat:0.6 });
  const cells = [];
  const cellAt = (x,y,z,r,col,sub) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, low?10:16, low?8:12), cellMat(col)); m.position.set(x,y,z); m.userData.sub = sub; cells.push(m); return m; };
  const parietales = [], principales = [], mucosas = [], gcels = [];
  for (let i=0;i<6;i++){ const y = GC.y + 0.55 - i*0.13; const sg = i%2 ? 1 : -1;
    mucosas.push(cellAt(GC.x + sg*0.31, y, 0.06*sg, 0.13, 0x4FA873, 'mucosa')); }
  for (let i=0;i<5;i++){ const y = GC.y + 0.1 - i*0.2; const sg = i%2 ? 1 : -1;
    parietales.push(cellAt(GC.x + sg*0.37, y, -0.05*sg, 0.17, 0xE07521, 'parietal')); }
  for (let i=0;i<5;i++){ const y = GC.y - 0.95 + i*0.14; const sg = i%2 ? -1 : 1;
    principales.push(cellAt(GC.x + sg*0.34, y - 0.6, 0.05*sg, 0.15, 0x3E76C4, 'principal')); }
  for (let i=0;i<3;i++) gcels.push(cellAt(GC.x + 0.78, GC.y - 1.75 + i*0.26, 0.1, 0.13, 0x9457C4, 'gcel'));
  add('glandula-gastrica', [surf, pit, ...cells], { explodeDir:new THREE.Vector3(0.4,-0.9,0.2).normalize() });

  /* barrera de moco y bicarbonato */
  const gel = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.26, 1.3), new THREE.MeshPhysicalMaterial({ color:0x8FD3DC, transparent:true, opacity:0.42, roughness:0.15, clearcoat:1, depthWrite:false }));
  gel.position.set(GC.x, GC.y+1.13, 0); gel.userData.sub = 'gel';
  const bic = [];
  for (let i=0;i<14;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 6), new THREE.MeshBasicMaterial({ color:0xBFEAF0, toneMapped:false }));
    m.position.set(GC.x - 0.85 + R()*1.7, GC.y + 1.05 + R()*0.18, -0.45 + R()*0.9); m.userData.sub = 'bicarbonato'; bic.push(m); }
  add('barrera-mucosa', [gel, ...bic], { passThrough:false, explodeDir:new THREE.Vector3(0,1,0.4).normalize() });

  /* --- animación 1: mezcla y peristalsis --- */
  const mixCurve = Kit.curve([[0.02,2.4,0],[-0.3,1.6,0.12],[-0.5,0.7,-0.1],[-0.35,-0.2,0.12],[0.1,-0.9,0],[0.8,-1.2,0.08],[1.25,-1.05,0],[0.6,-0.85,-0.2],[-0.1,-0.45,-0.15],[-0.35,0.4,-0.1],[-0.2,1.4,0.05],[0.02,2.4,0]]);
  const foodMat = new THREE.MeshBasicMaterial({ color:0xE0B657, toneMapped:false });
  const chymeMat = new THREE.MeshBasicMaterial({ color:0xB88A4A, toneMapped:false });
  const mix = { on:false, t:0, speed:1, parts:[] };
  for (let i=0;i<16;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.06 + R()*0.04, 8, 6), foodMat); m.userData.off = i/16; m.visible = false; E.scene.add(m); mix.parts.push(m); }
  const waveMat = new THREE.MeshBasicMaterial({ color:0xFF8A5A, toneMapped:false, transparent:true, opacity:0.75 });
  const wave = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 8, 28), waveMat); wave.visible = false; E.scene.add(wave);

  /* --- animación 2: secreción gástrica --- */
  const sec = { on:false, t:0, parts:[] };
  const hMat = new THREE.MeshBasicMaterial({ color:0xFF7A2E, toneMapped:false });
  const pMat = new THREE.MeshBasicMaterial({ color:0x5B8FD1, toneMapped:false });
  const mMat = new THREE.MeshBasicMaterial({ color:0x6FBF8F, toneMapped:false });
  const gMat = new THREE.MeshBasicMaterial({ color:0xA878C9, toneMapped:false });
  const emit = (fromMesh, to, mat, n) => { for (let i=0;i<n;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), mat);
    m.userData = { from: fromMesh.position.clone(), to: to.clone(), off: R() }; m.visible = false; E.scene.add(m); sec.parts.push(m); } };
  parietales.forEach(c => emit(c, new THREE.Vector3(GC.x, c.position.y + 0.25, 0), hMat, 2));
  principales.forEach(c => emit(c, new THREE.Vector3(GC.x, c.position.y + 0.35, 0), pMat, 2));
  mucosas.forEach(c => emit(c, new THREE.Vector3(GC.x + (R()-0.5)*1.2, GC.y + 1.15, (R()-0.5)*0.7), mMat, 1));
  gcels.forEach(c => emit(c, new THREE.Vector3(GC.x - 0.3, GC.y - 0.2, 0.3), gMat, 2));

  const model = {
    anims:[
      { id:'mezcla', label:'Mezcla gástrica: peristalsis, retropulsión y vaciamiento', get on(){ return mix.on; },
        set(on){ mix.on = on; mix.parts.forEach(p => p.visible = on); wave.visible = on; if (on) E.focus(new THREE.Vector3(0,0.4,0), 9); }, needsOpacity:0.45, focus:true },
      { id:'secrecion', label:'Secreción de la glándula gástrica (lupa): HCl, pepsinógeno, moco y gastrina', get on(){ return sec.on; },
        set(on){ sec.on = on; sec.parts.forEach(p => p.visible = on); if (on) E.focus(GC, 4.2); }, focus:true }
    ],
    setSpeed(k){ mix.speed = k; },
    phaseText(){
      if (sec.on && !mix.on) return 'Parietal → H⁺ (pH 1–2) · Principal → pepsinógeno, que el ácido convierte en pepsina · Mucosa → moco con bicarbonato · G → gastrina a la sangre';
      if (!mix.on) return '';
      const t = mix.t % 1;
      return t < 0.45 ? 'La onda baja desde el cuerpo: mezcla el alimento con el jugo gástrico y forma el quimo'
           : t < 0.8 ? 'La onda llega al antro con fuerza y empuja contra el píloro casi cerrado'
           : 'Retropulsión: solo pasan las partículas menores de 2 mm; el resto vuelve al antro y se vuelve a moler';
    },
    legend:[
      {color:'#E0B657', txt:'Alimento recién llegado'},
      {color:'#B88A4A', txt:'Quimo ya mezclado'},
      {color:'#FF8A5A', txt:'Onda peristáltica'},
      {color:'#FF7A2E', txt:'H⁺ (ácido clorhídrico) de la célula parietal'},
      {color:'#5B8FD1', txt:'Pepsinógeno de la célula principal'},
      {color:'#6FBF8F', txt:'Moco con bicarbonato'},
      {color:'#A878C9', txt:'Gastrina (hormona) hacia la sangre'}
    ],
    observa:'la onda no empuja todo hacia fuera: la mayor parte del contenido rebota contra el píloro y vuelve al antro, y ese rebote es lo que tritura. En la lupa, fíjate en que el moco verde se acumula encima del epitelio: esa capa es la que impide que el H⁺ naranja toque la pared.'
  };

  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (mix.on){
      mix.t = (mix.t + dt*0.08*mix.speed) % 1;
      mix.parts.forEach(p => { const k = ((mix.t + p.userData.off) % 1 + 1) % 1; p.position.copy(mixCurve.getPointAt(k)); p.material = k > 0.4 ? chymeMat : foodMat; });
      const w = (mix.t*1.35) % 1; const u = Math.min(0.999, w);
      const c = u < 0.78 ? bodyCurve.getPointAt(u/0.78) : new THREE.Vector3(-0.18 + (u-0.78)/0.22*1.3, -0.72 - (u-0.78)/0.22*0.36, 0);
      const rr = u < 0.78 ? bodyR(u/0.78)*1.04 : 0.74 - (u-0.78)/0.22*0.3;
      wave.position.copy(c); wave.scale.setScalar(Math.max(0.2, rr)); wave.rotation.set(Math.PI/2, 0, u < 0.78 ? 0 : 0.5);
      waveMat.opacity = 0.35 + 0.45*Math.sin(Math.PI*u);
    }
    if (sec.on){ sec.t += dt*0.45; sec.parts.forEach(p => { const k = (sec.t + p.userData.off) % 1; p.position.lerpVectors(p.userData.from, p.userData.to, k); p.scale.setScalar(0.55 + 0.7*Math.sin(k*Math.PI)); }); }
  });
  return model;
}

/* -------------------------- INTESTINO DELGADO -------------------------- */
function buildSmallBowel(E){
  orgvFrame(E, 1.3);
  const low = E.low, D = BIO.smallBowel, S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s = S[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, interno:s.interno, explodeDir:V3(s.pos).sub(new THREE.Vector3(1.0,0,0)).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl); return p; };
  const R = Kit.rng(41);
  const seg = low ? 26 : 48, rad = low ? 10 : 16;
  /* serosa rosada con red capilar y brillo húmedo del peritoneo */
  const gut = tint => orgvTex.mat({ tex:'serosa', rep:[10,1], bump:0.014, color:tint, rough:0.48, coat:0.7, coatRough:0.2, env:0.85 });

  /* --- duodeno en C --- */
  const duoPts = [[-0.35,2.62,0],[0.45,2.5,0.05],[1.0,1.95,0],[1.05,1.15,0],[0.55,0.62,0],[-0.1,0.52,0.05]];
  const duoM = new THREE.Mesh(Kit.taper(duoPts, 0.33, 0.28, { seg, rad }), gut(0xF4E4DC));
  add('duodeno', [duoM]);

  /* papila y conductos */
  const pap = new THREE.Mesh(Kit.sculpt({ radii:[0.13,0.12,0.13], w:20, h:14 }), Kit.tissue({ color:0xC8A24A, rough:0.4, coat:0.6 }));
  pap.position.set(1.02, 1.2, 0.26); pap.userData.sub = 'papila';
  const odd = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.04, 8, 20), Kit.tissue({ color:0xB08A30, rough:0.45 }));
  odd.position.set(1.02, 1.2, 0.3); odd.rotation.y = Math.PI/2; odd.userData.sub = 'oddi';
  add('papila-duodenal', [pap, odd]);
  const bileM = Kit.tissue({ color:0x5E9E52, rough:0.4, coat:0.55 });
  const bile = new THREE.Mesh(Kit.taper([[1.75,2.85,-0.5],[1.5,2.3,-0.3],[1.25,1.7,-0.1],[1.06,1.32,0.2]], 0.085, 0.06, { seg: low?14:26, rad:8 }), bileM);
  const vesic = new THREE.Mesh(Kit.sculpt({ radii:[0.3,0.22,0.22], w:22, h:16 }), bileM);
  vesic.position.set(1.95, 3.05, -0.55); vesic.userData.sub = 'vesicula'; bile.userData.sub = 'coledoco';
  add('via-biliar', [bile, vesic]);
  const pancM = Kit.tissue({ color:0xE0A040, rough:0.5, coat:0.4, tex:'tissue', rep:[3,1], bump:0.01 });
  const panc = new THREE.Mesh(Kit.taper([[1.05,1.05,-0.45],[1.8,0.85,-0.5],[2.6,0.7,-0.45]], 0, 0, { rfn:u => 0.3 - 0.12*u, seg: low?12:22, rad:10 }), pancM);
  panc.userData.sub = 'pancreas';
  const wir = new THREE.Mesh(Kit.taper([[2.4,0.74,-0.45],[1.7,0.86,-0.4],[1.2,1.08,-0.1],[1.04,1.2,0.18]], 0.05, 0.04, { seg: low?12:22, rad:8 }), Kit.tissue({ color:0xF0C878, rough:0.4, coat:0.6 }));
  wir.userData.sub = 'conducto';
  add('conducto-pancreatico', [panc, wir]);

  /* --- yeyuno e íleon: asas plegadas en filas que van y vuelven (como en un atlas), con vaivén en profundidad;
         separación entre filas mayor que el grosor del asa para que nunca se crucen --- */
  const SP_ = 0.66, XL = -2.1, XR = -0.25;
  const loops = (() => { const rows = [0.95, 0.95-SP_, 0.95-2*SP_, 0.95-3*SP_-0.08, 0.95-4*SP_-0.08]; const pts = [new THREE.Vector3(-0.1,0.52,0.05)]; let cut = 0;
    const zr = (u,k) => 0.36*Math.sin(u*Math.PI*2.3 + k*1.9 + 0.4) + 0.05*Math.sin(u*17 + k);
    rows.forEach((y,k) => { const ltr = k % 2 === 1; const xa = ltr ? XL : XR, xb = ltr ? XR : XL; const n = 16;
      for (let i=0;i<=n;i++){ const u = i/n; const x = xa + (xb-xa)*u + 0.06*Math.sin(u*11+k*2.3); pts.push(new THREE.Vector3(x, y + 0.045*Math.sin(u*8.5 + k*1.3), zr(u,k))); }
      if (k < rows.length-1){ const y2 = rows[k+1], yc = (y+y2)/2, rr = (y-y2)/2, dir = ltr ? 1 : -1, z0 = zr(1,k), z1 = zr(0,k+1);
        for (let j=1;j<7;j++){ const t = j/7, a = Math.PI/2 - t*Math.PI; pts.push(new THREE.Vector3(xb + dir*(0.12 + rr*Math.cos(a)), yc + rr*Math.sin(a), z0 + (z1-z0)*smooth01(t))); if (k === 2 && j === 3) cut = pts.length-1; } } });
    pts.push(new THREE.Vector3(-2.2,-2.45,0.08), new THREE.Vector3(-2.12,-2.66,0.06));
    return { jej: pts.slice(0, cut+1), ile: pts.slice(cut) }; })();
  const yey = new THREE.Mesh(Kit.taper(loops.jej, 0.3, 0.28, { seg: low?70:130, rad }), gut(0xFFFFFF));
  add('yeyuno', [yey]);
  const ile = new THREE.Mesh(Kit.taper(loops.ile, 0.27, 0.23, { seg: low?60:110, rad }), gut(0xF0E2DC));
  add('ileon', [ile]);

  /* --- válvula ileocecal y ciego --- */
  const cec = new THREE.Mesh(Kit.sculpt({ radii:[0.42,0.45,0.4], w:24, h:18 }), gut(0xE6D2C4));
  cec.position.set(-2.35, -2.95, 0); cec.userData.sub = 'ciego';
  const val = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.07, 8, 22), Kit.tissue({ color:0xB06A55, rough:0.45, coat:0.5 }));
  val.position.set(-2.1, -2.7, 0.05); val.rotation.set(Math.PI/2, 0, 0.6); val.userData.sub = 'valvula';
  add('valvula-ileocecal', [cec, val]);

  /* --- mesenterio: abanico translúcido --- */
  const fanG = new THREE.RingGeometry(0.3, 3.2, low?24:44, 1, Math.PI*0.98, Math.PI*0.7);
  const fan = new THREE.Mesh(fanG, new THREE.MeshPhysicalMaterial({ color:0xE8CE86, transparent:true, opacity:0.22, roughness:0.4, side:THREE.DoubleSide, depthWrite:false }));
  fan.position.set(0.45, 1.35, -0.85);
  const vessels = [];
  for (let i=0;i<7;i++){ const a = Math.PI*1.02 + i/6*Math.PI*0.62;
    vessels.push(Kit.taper([[0.45,1.35,-0.82],[0.45 + Math.cos(a)*1.6, 1.35 + Math.sin(a)*1.6, -0.8],[0.45 + Math.cos(a)*2.9, 1.35 + Math.sin(a)*2.9, -0.7]], 0.045, 0.022, { seg:10, rad:6 })); }
  const ves = new THREE.Mesh(Kit.merge(vessels), Kit.tissue({ color:0xB8433C, rough:0.4, coat:0.6 })); ves.userData.sub = 'vasos';
  add('mesenterio', [fan, ves], { passThrough:true, explodeDir:new THREE.Vector3(0,0,-1) });

  /* =============== LUPA: TRES ESCALAS ENCAJADAS =============== */
  const guideM = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:true });
  const ring = (c, r) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.02, 8, 56), guideM); m.position.copy(c); E.scene.add(m); return m; };
  const linkTo = (a, b) => { const m = new THREE.Mesh(Kit.taper([a, b], 0.009, 0.009, { seg:6, rad:6 }), guideM); E.scene.add(m); return m; };
  const P1 = new THREE.Vector3(4.3, 2.3, 0), P2 = new THREE.Vector3(4.3, -0.1, 0), P3 = new THREE.Vector3(4.3, -2.45, 0);
  ring(P1, 1.05); ring(P2, 1.0); ring(P3, 0.95);
  linkTo(new THREE.Vector3(-0.2,0.6,0.3), new THREE.Vector3(3.3, 2.0, 0.2));
  linkTo(new THREE.Vector3(4.3, 1.25, 0), new THREE.Vector3(4.3, 0.9, 0));
  linkTo(new THREE.Vector3(4.3, -1.1, 0), new THREE.Vector3(4.3, -1.5, 0));

  /* escala 1: segmento de pared con pliegues circulares */
  const wallM = Kit.tissue({ color:0xD07E66, rough:0.5, coat:0.45, tex:'tissue', rep:[3,1], bump:0.01, side:THREE.DoubleSide });
  const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 1.7, low?20:34, 1, true), wallM);
  tubo.rotation.z = Math.PI/2; tubo.position.copy(P1); tubo.userData.sub = 'luz';
  const plieGeos = [];
  for (let i=0;i<6;i++){ const x = P1.x - 0.72 + i*0.29;
    const g = new THREE.TorusGeometry(0.6, 0.085, 8, low?18:28); g.rotateY(Math.PI/2); g.translate(x, P1.y, P1.z); plieGeos.push(g); }
  const plie = new THREE.Mesh(Kit.merge(plieGeos), Kit.tissue({ color:0xD4707A, rough:0.5, coat:0.5 }));
  plie.userData.sub = 'pliegue';
  add('pliegues-circulares', [tubo, plie], { explodeDir:new THREE.Vector3(0,1,0) });

  /* escala 2: una vellosidad ampliada, con cripta */
  const viMat = Kit.tissue({ color:0xD4707A, rough:0.52, coat:0.3, tex:'tissue', rep:[1,2], bump:0.008, side:THREE.DoubleSide, env:0.75 });
  /* media vellosidad abierta (corte): se ve el capilar y el quilífero por dentro */
  const villus = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.27, 1.45, low?14:24, 1, true, Math.PI*0.34, Math.PI*1.32), viMat);
  villus.position.set(P2.x, P2.y + 0.2, 0); villus.userData.sub = 'epitelio';
  const vTip = new THREE.Mesh(new THREE.SphereGeometry(0.17, low?12:20, low?8:14, Math.PI*0.34, Math.PI*1.32, 0, Math.PI/2), viMat);
  vTip.position.set(P2.x, P2.y + 0.92, 0); vTip.userData.sub = 'epitelio';
  const baseSlab = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 0.9), viMat); baseSlab.position.set(P2.x, P2.y-0.62, 0); baseSlab.userData.sub = 'mucosa';
  const cryptG = [];
  for (let i=-1;i<=1;i++){ if (!i) continue; const g = new THREE.CylinderGeometry(0.09, 0.07, 0.42, 10); g.translate(P2.x + i*0.42, P2.y-0.88, 0); cryptG.push(g); }
  const crypt = new THREE.Mesh(Kit.merge(cryptG), Kit.tissue({ color:0xB95E6C, rough:0.5 })); crypt.userData.sub = 'cripta';
  /* vecinas, más pequeñas y sin etiqueta, para dar contexto */
  const neigh = [];
  [-0.62, 0.62].forEach(dx => { const m = new THREE.Mesh(Kit.taper([[P2.x+dx, P2.y-0.5, 0],[P2.x+dx, P2.y+0.52, 0]], 0.18, 0.12, { seg:10, rad:12 }), viMat); m.userData.sub = 'epitelio'; neigh.push(m); });
  add('vellosidad', [villus, vTip, baseSlab, crypt, ...neigh]);

  /* capilares de la vellosidad */
  const capGeos = [];
  for (let k=0;k<2;k++){ const sg = k ? 1 : -1; const pts = [];
    for (let i=0;i<=14;i++){ const u = i/14; const y = P2.y - 0.45 + u*1.25; const a = u*Math.PI*2.2;
      pts.push(new THREE.Vector3(P2.x + sg*(0.13 + 0.05*Math.sin(a)), y, 0.1*Math.cos(a))); }
    capGeos.push(Kit.taper(pts, 0.032, 0.026, { seg: low?12:22, rad:6 })); }
  capGeos.push(Kit.taper([[P2.x-0.45,P2.y-0.75,0.1],[P2.x-0.16,P2.y-0.5,0.05]], 0.045, 0.032, { seg:6, rad:8 }));
  capGeos.push(Kit.taper([[P2.x+0.16,P2.y-0.5,0.05],[P2.x+0.45,P2.y-0.75,0.1]], 0.032, 0.045, { seg:6, rad:8 }));
  const caps = new THREE.Mesh(Kit.merge(capGeos), Kit.tissue({ color:0xC8322E, rough:0.35, coat:0.7 }));
  caps.userData.sub = 'capilar';
  add('capilar-vellosidad', [caps], { explodeDir:new THREE.Vector3(-1,0,0.3).normalize() });

  /* quilífero central */
  const lac = new THREE.Mesh(Kit.taper([[P2.x, P2.y-0.72, 0],[P2.x, P2.y+0.62, 0]], 0.075, 0.05, { seg:12, rad:10 }), Kit.tissue({ color:0xF2E6C2, rough:0.3, coat:0.75 }));
  lac.userData.sub = 'quilifero';
  const lacOut = new THREE.Mesh(Kit.taper([[P2.x, P2.y-0.72, 0],[P2.x-0.1, P2.y-1.0, -0.25],[P2.x-0.35, P2.y-1.15, -0.5]], 0.055, 0.045, { seg:8, rad:8 }), Kit.tissue({ color:0xF2E6C2, rough:0.3, coat:0.75 }));
  lacOut.userData.sub = 'linfa';
  add('quilifero', [lac, lacOut], { explodeDir:new THREE.Vector3(0,-1,-0.4).normalize() });

  /* escala 3: borde en cepillo */
  const cellBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.7, 0.85), Kit.tissue({ color:0xD79B6C, rough:0.5, coat:0.4 }));
  cellBody.position.set(P3.x, P3.y-0.3, 0); cellBody.userData.sub = 'cuerpo';
  const mvG = [];
  const nx = low ? 9 : 15, nz = low ? 4 : 6;
  for (let i=0;i<nx;i++) for (let j=0;j<nz;j++){
    const g = new THREE.CylinderGeometry(0.028, 0.028, 0.46, 6);
    g.translate(P3.x - 0.63 + i*(1.26/(nx-1)), P3.y + 0.28, -0.32 + j*(0.64/(nz-1))); mvG.push(g);
    const c = new THREE.SphereGeometry(0.028, 6, 5); c.translate(P3.x - 0.63 + i*(1.26/(nx-1)), P3.y + 0.51, -0.32 + j*(0.64/(nz-1))); mvG.push(c); }
  const mv = new THREE.Mesh(Kit.merge(mvG), Kit.tissue({ color:0xE3AC5C, rough:0.42, coat:0.55 }));
  mv.userData.sub = 'micro';
  const enz = [];
  for (let i=0;i<10;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), Kit.tissue({ color:0x8FD3DC, rough:0.3, coat:0.8 }));
    m.position.set(P3.x - 0.6 + R()*1.2, P3.y + 0.35 + R()*0.2, -0.3 + R()*0.6); m.userData.sub = 'enzimas'; enz.push(m); }
  add('microvellosidades', [mv, cellBody, ...enz], { explodeDir:new THREE.Vector3(0,-1,0) });

  /* --- animación 1: absorción en la vellosidad --- */
  const abs = { on:false, t:0, speed:1, parts:[] };
  const sugMat = new THREE.MeshBasicMaterial({ color:0xE0B657, toneMapped:false });
  const aaMat = new THREE.MeshBasicMaterial({ color:0x8FD3DC, toneMapped:false });
  const fatMat = new THREE.MeshBasicMaterial({ color:0xF2E06A, toneMapped:false });
  const mk = (from, to, mat, off, r) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r||0.045, 8, 6), mat);
    m.userData = { from, to, off }; m.visible = false; E.scene.add(m); abs.parts.push(m); };
  for (let i=0;i<7;i++){ const x = P2.x - 0.22 + R()*0.44;
    mk(new THREE.Vector3(x, P2.y + 0.75 + R()*0.3, (R()-0.5)*0.4), new THREE.Vector3(P2.x + (i%2?1:-1)*0.15, P2.y - 0.3, 0), sugMat, i/7);
    mk(new THREE.Vector3(x + 0.1, P2.y + 0.9 + R()*0.3, (R()-0.5)*0.4), new THREE.Vector3(P2.x + (i%2?-1:1)*0.15, P2.y - 0.25, 0), aaMat, (i+0.4)/7); }
  for (let i=0;i<6;i++){ mk(new THREE.Vector3(P2.x + (R()-0.5)*0.5, P2.y + 0.8 + R()*0.4, (R()-0.5)*0.4), new THREE.Vector3(P2.x, P2.y - 0.6, 0), fatMat, i/6, 0.06); }
  for (let i=0;i<4;i++){ mk(new THREE.Vector3(P2.x, P2.y - 0.72, 0), new THREE.Vector3(P2.x-0.35, P2.y-1.15, -0.5), fatMat, i/4, 0.06); }

  /* --- animación 2: tránsito y mezcla en las asas --- */
  const tr = { on:false, t:0, parts:[] };
  const trCurve = Kit.curve([[0.0,2.6,0],[0.9,2.2,0],[1.0,1.3,0],[0.3,0.55,0],
    ...loops.jej.filter((_,i)=>i%3===0),
    ...loops.ile.filter((_,i)=>i%3===0),
    [-2.2,-2.75,0]]);
  for (let i=0;i<12;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color:0xB88A4A, toneMapped:false }));
    m.userData.off = i/12; m.visible = false; E.scene.add(m); tr.parts.push(m); }

  const model = {
    anims:[
      { id:'absorcion', label:'Absorción en la vellosidad (lupa): azúcares y aminoácidos a la sangre, grasas a la linfa', get on(){ return abs.on; },
        set(on){ abs.on = on; abs.parts.forEach(p => p.visible = on); if (on) E.focus(P2, 4.4); }, focus:true },
      { id:'transito', label:'Tránsito del quimo: del píloro a la válvula ileocecal', get on(){ return tr.on; },
        set(on){ tr.on = on; tr.parts.forEach(p => p.visible = on); if (on) E.focus(new THREE.Vector3(-0.3,0,0), 10); }, focus:true }
    ],
    setSpeed(k){ abs.speed = k; },
    phaseText(){
      if (abs.on) return 'Glucosa y aminoácidos → enterocito → capilar → vena porta → hígado · Ácidos grasos → quilomicrones → quilífero → linfa → sangre del cuello';
      if (tr.on) return 'El quimo tarda de 3 a 5 horas en recorrer el intestino delgado; casi todo se absorbe en el primer metro y medio';
      return '';
    },
    legend:[
      {color:'#E0B657', txt:'Azúcares simples (glucosa, galactosa)'},
      {color:'#8FD3DC', txt:'Aminoácidos'},
      {color:'#F2E06A', txt:'Ácidos grasos y quilomicrones'},
      {color:'#C8322E', txt:'Capilar sanguíneo (hacia la vena porta)'},
      {color:'#F2E6C2', txt:'Vaso quilífero (linfa)'}
    ],
    observa:'las partículas amarillas y azules terminan en el capilar rojo y las grasas, más grandes, solo pueden entrar en el quilífero claro del centro. Sigue los tres aros de la lupa de arriba abajo: pliegue, vellosidad y microvellosidades; cada escala amplía a la anterior y multiplica la superficie.'
  };

  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (abs.on){ abs.t += dt*0.4*abs.speed; abs.parts.forEach(p => { const k = (abs.t + p.userData.off) % 1; p.position.lerpVectors(p.userData.from, p.userData.to, k); p.scale.setScalar(0.6 + 0.6*Math.sin(k*Math.PI)); }); }
    if (tr.on){ tr.t = (tr.t + dt*0.05) % 1; tr.parts.forEach(p => { const k = ((tr.t + p.userData.off) % 1 + 1) % 1; p.position.copy(trCurve.getPointAt(k)); p.scale.setScalar(1 - 0.45*k); }); }
  });
  return model;
}

/* --------------------------- INTESTINO GRUESO --------------------------- */
function buildLargeBowel(E){
  orgvFrame(E, 1.42);
  const low = E.low, D = BIO.largeBowel, S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s = S[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, interno:s.interno, explodeDir:V3(s.pos).sub(new THREE.Vector3(0.6,-0.4,0)).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl); return p; };
  const R = Kit.rng(59);
  const rad = low ? 12 : 18;
  /* serosa del colon: rosa grisáceo con capilares y brillo húmedo */
  const colonMat = tint => orgvTex.mat({ tex:'serosa', rep:[8,2], bump:0.014, color:tint, rough:0.5, coat:0.65, coatRough:0.22, env:0.85 });
  const haustraR = (base, n) => u => base*(0.86 + 0.16*Math.abs(Math.sin(u*Math.PI*n)));

  /* --- ciego y apéndice --- */
  const cec = new THREE.Mesh(Kit.sculpt({ radii:[0.58,0.62,0.55], w: low?26:40, h: low?20:30,
    disp:(p)=>0.03*Math.sin(p.y*7) }), colonMat(0xC4735A));
  cec.position.set(-2.3, -2.05, 0);
  const ileo = new THREE.Mesh(Kit.taper([[-1.5,-1.7,0.15],[-1.95,-1.85,0.1]], 0.2, 0.17, { seg:8, rad:10 }), colonMat(0xF0E2DC));
  ileo.userData.sub = 'ileon';
  add('ciego', [cec, ileo]);
  const ap = new THREE.Mesh(Kit.taper([[-2.45,-2.5,0.15],[-2.6,-2.9,0.2],[-2.72,-3.3,0.1]], 0.1, 0.07, { seg:12, rad:8 }), orgvTex.mat({ tex:'serosa', rep:[2,1], color:0xF2DCD6, rough:0.48, coat:0.65, coatRough:0.22 }));
  add('apendice', [ap]);

  /* --- marco cólico --- */
  const asc = new THREE.Mesh(Kit.taper([[-2.3,-1.8,0],[-2.32,-0.6,0],[-2.3,0.7,0],[-2.2,1.35,0]], 0, 0, { rfn:haustraR(0.46, 5), seg: low?26:46, rad }), colonMat(0xEADBD2));
  add('colon-ascendente', [asc]);
  const trv = new THREE.Mesh(Kit.taper([[-2.2,1.45,0],[-1.2,1.6,0.15],[0,1.28,0.2],[1.2,1.5,0.15],[2.15,1.4,0]], 0, 0, { rfn:haustraR(0.43, 7), seg: low?32:56, rad }), colonMat(0xEEDFD6));
  add('colon-transverso', [trv]);
  const des = new THREE.Mesh(Kit.taper([[2.25,1.3,0],[2.35,0.4,0],[2.3,-0.8,0],[2.25,-1.5,0]], 0, 0, { rfn:haustraR(0.38, 5), seg: low?24:44, rad }), colonMat(0xE6D5CB));
  add('colon-descendente', [des]);
  const sig = new THREE.Mesh(Kit.taper([[2.25,-1.6,0],[1.85,-2.35,0.1],[1.1,-2.65,0.1],[0.45,-2.35,0.05],[0.12,-2.6,0]], 0, 0, { rfn:haustraR(0.33, 4), seg: low?22:40, rad }), colonMat(0xE2CFC4));
  add('sigmoide', [sig]);

  /* --- recto y ano --- */
  const rec = new THREE.Mesh(Kit.taper([[0.12,-2.62,0],[0.1,-3.1,0],[0.1,-3.45,0]], 0.42, 0.3, { seg:14, rad }), colonMat(0xDCC4B8));
  add('recto', [rec]);
  const anoInt = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.09, 8, 22), Kit.tissue({ color:0x9E5A4E, rough:0.5, coat:0.4 }));
  anoInt.rotation.x = Math.PI/2; anoInt.position.set(0.1, -3.58, 0); anoInt.userData.sub = 'interno';
  const anoExt = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 8, 24), Kit.tissue({ color:0xB86A5A, rough:0.55, coat:0.35 }));
  anoExt.rotation.x = Math.PI/2; anoExt.position.set(0.1, -3.78, 0); anoExt.userData.sub = 'externo';
  add('ano', [anoInt, anoExt]);

  /* --- tenias: tres cintas a lo largo del marco --- */
  const framePts = [[-2.3,-1.8,0],[-2.32,-0.6,0],[-2.3,0.7,0],[-2.2,1.45,0],[-1.2,1.6,0.15],[0,1.28,0.2],[1.2,1.5,0.15],[2.15,1.4,0],[2.35,0.4,0],[2.3,-0.8,0],[2.25,-1.55,0],[1.85,-2.35,0.1],[1.1,-2.65,0.1],[0.5,-2.38,0.05]];
  const frame = Kit.curve(framePts);
  const teniaGeos = [];
  for (let k=0;k<3;k++){ const ang = k*Math.PI*2/3; const pts = [];
    const n = low ? 40 : 76;
    for (let i=0;i<=n;i++){ const u = i/n; const c = frame.getPointAt(u); const tg = frame.getTangentAt(u);
      const up = new THREE.Vector3(0,0,1); const e1 = new THREE.Vector3().crossVectors(tg, up).normalize(); const e2 = new THREE.Vector3().crossVectors(tg, e1).normalize();
      const rr = 0.44 - 0.1*u;
      pts.push(c.clone().addScaledVector(e1, Math.cos(ang)*rr).addScaledVector(e2, Math.sin(ang)*rr)); }
    teniaGeos.push(Kit.taper(pts, 0.065, 0.05, { seg: low?40:74, rad:6 })); }
  const ten = new THREE.Mesh(Kit.merge(teniaGeos), orgvTex.mat({ tex:'tendon', rep:[1,8], bump:0.01, color:0xF6EEE2, rough:0.42, coat:0.6, coatRough:0.25 }));
  add('tenias', [ten], { explodeDir:new THREE.Vector3(0,0.4,1).normalize() });

  /* --- haustras: aros marcadores en los estrangulamientos --- */
  const hausG = [];
  for (let i=1;i<20;i++){ const u = i/20; const c = frame.getPointAt(u); const tg = frame.getTangentAt(u);
    const g = new THREE.TorusGeometry(0.36 - 0.07*u, 0.035, 6, low?14:20);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1), tg.clone().normalize());
    g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q)); g.translate(c.x, c.y, c.z); hausG.push(g); }
  const hau = new THREE.Mesh(Kit.merge(hausG), orgvTex.mat({ tex:'serosa', rep:[6,1], color:0xDCC6BA, rough:0.5, coat:0.6, coatRough:0.24 }));
  add('haustras', [hau], { explodeDir:new THREE.Vector3(0,1,0.3).normalize() });

  /* --- apéndices epiploicos --- */
  const epiG = [];
  for (let i=2;i<19;i+=2){ const u = i/20; const c = frame.getPointAt(u); const tg = frame.getTangentAt(u);
    const e1 = new THREE.Vector3().crossVectors(tg, new THREE.Vector3(0,0,1)).normalize();
    const p = c.clone().addScaledVector(e1, (0.42 + 0.16)*(i%4?1:-1)).add(new THREE.Vector3(0,0,0.16));
    const g = new THREE.SphereGeometry(0.11 + R()*0.05, 10, 8); g.scale(1, 1.5, 0.8); g.translate(p.x, p.y, p.z); epiG.push(g); }
  const epi = new THREE.Mesh(Kit.merge(epiG), orgvTex.mat({ tex:'fat', rep:[2,2], bump:0.03, rough:0.42, coat:0.7, coatRough:0.22 }));
  add('apendices-epiploicos', [epi], { explodeDir:new THREE.Vector3(0.4,0,1).normalize() });

  /* =============== LUPA: MUCOSA, CRIPTAS Y MICROBIOTA =============== */
  const guideM = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:true });
  const LC = new THREE.Vector3(4.4, 0.6, 0);
  const loupe = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.022, 8, 64), guideM); loupe.position.set(LC.x, LC.y+0.45, 0); E.scene.add(loupe);
  const lead = new THREE.Mesh(Kit.taper([[2.5,0.9,0.25],[3.2,0.8,0.2],[3.0,0.6,0.1]], 0.01, 0.01, { seg:6, rad:6 }), guideM); E.scene.add(lead);

  const mucM = Kit.tissue({ color:0xDC808C, rough:0.5, coat:0.45, tex:'tissue', rep:[2,1], bump:0.01 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.4, 1.1), mucM); base.position.set(LC.x, LC.y-0.38, 0); base.userData.sub = 'mucosa';
  const cryptG = [], gobG = [];
  const nc = low ? 4 : 6;
  for (let i=0;i<nc;i++){ const x = LC.x - 1.05 + i*(2.1/(nc-1));
    const g = new THREE.CylinderGeometry(0.12, 0.09, 0.62, low?10:14); g.translate(x, LC.y+0.07, 0.05); cryptG.push(g);
    const r = new THREE.TorusGeometry(0.13, 0.03, 6, 16); r.rotateX(Math.PI/2); r.translate(x, LC.y+0.38, 0.05); cryptG.push(r);
    for (let j=0;j<3;j++){ const sg = j%2 ? 1 : -1; const s = new THREE.SphereGeometry(0.06, 8, 6); s.scale(1,1.3,1);
      s.translate(x + sg*0.15, LC.y + 0.3 - j*0.17, 0.3); gobG.push(s); } }
  const cry = new THREE.Mesh(Kit.merge(cryptG), Kit.tissue({ color:0xB95E6C, rough:0.5, coat:0.45 })); cry.userData.sub = 'cripta';
  const gob = new THREE.Mesh(Kit.merge(gobG), Kit.tissue({ color:0x8FD3DC, rough:0.35, coat:0.7 })); gob.userData.sub = 'caliciforme';
  const abso = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 0.9), Kit.tissue({ color:0xD79B6C, rough:0.5, coat:0.4 }));
  abso.position.set(LC.x, LC.y+0.44, 0); abso.userData.sub = 'absortivo';
  add('criptas', [base, cry, gob, abso], { explodeDir:new THREE.Vector3(0,-1,0) });

  /* microbiota: dos capas de moco y bacterias */
  const mocoInt = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 1.0), new THREE.MeshPhysicalMaterial({ color:0xCDEFF2, transparent:true, opacity:0.5, roughness:0.15, clearcoat:1, depthWrite:false }));
  mocoInt.position.set(LC.x, LC.y+0.56, 0); mocoInt.userData.sub = 'mocoint';
  const mocoExt = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.3, 1.05), new THREE.MeshPhysicalMaterial({ color:0x9BD9C0, transparent:true, opacity:0.3, roughness:0.2, clearcoat:0.8, depthWrite:false }));
  mocoExt.position.set(LC.x, LC.y+0.82, 0); mocoExt.userData.sub = 'mocoext';
  const bactG = [];
  const bacCols = [0x6FAE6A, 0x8FBF52, 0x4E9E86, 0xC2B24E, 0x77A8C9];
  const bacMeshes = [];
  for (let i=0;i<(low?28:48);i++){
    const c = bacCols[i % bacCols.length];
    const g = new THREE.CylinderGeometry(0.035, 0.035, 0.1 + R()*0.09, 6);
    const m = new THREE.Mesh(g, Kit.tissue({ color:c, rough:0.4, coat:0.5 }));
    m.position.set(LC.x - 1.15 + R()*2.3, LC.y + 0.78 + R()*0.32, -0.45 + R()*0.9);
    m.rotation.set(R()*3, R()*3, R()*3); m.userData.sub = 'bacterias'; bacMeshes.push(m);
  }
  add('microbiota', [mocoExt, mocoInt, ...bacMeshes], { explodeDir:new THREE.Vector3(0,1,0) });

  /* parásitos y agua segura: una mirada aparte, bajo la mucosa */
  const paraM = Kit.tissue({ color:0x7FA9C9, rough:0.4, coat:0.6 });
  const paraMeshes = [];
  for (let i=0;i<5;i++){ const m = new THREE.Mesh(Kit.sculpt({ radii:[0.14,0.1,0.1], w:16, h:12 }), paraM);
    m.position.set(LC.x - 0.9 + i*0.45, LC.y - 1.95, (R()-0.5)*0.5); m.userData.sub = 'quiste'; paraMeshes.push(m); }
  const pRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.018, 8, 48), guideM); pRing.position.set(LC.x, LC.y-1.9, 0); E.scene.add(pRing);
  const pLead = new THREE.Mesh(Kit.taper([[LC.x, LC.y-0.45, 0],[LC.x, LC.y-0.95, 0]], 0.008, 0.008, { seg:4, rad:6 }), guideM); E.scene.add(pLead);
  const gota = new THREE.Mesh(Kit.sculpt({ radii:[0.3,0.38,0.3], w:20, h:16 }), new THREE.MeshPhysicalMaterial({ color:0x6FC6E0, transparent:true, opacity:0.45, roughness:0.05, clearcoat:1, depthWrite:false }));
  gota.position.set(LC.x + 1.05, LC.y - 1.9, 0); gota.userData.sub = 'agua';
  add('parasitosis', [...paraMeshes, gota], { explodeDir:new THREE.Vector3(0,-1,0.4).normalize() });

  /* --- animación 1: tránsito y reabsorción de agua --- */
  const trCurve = Kit.curve([[-2.3,-2.2,0],[-2.3,-1.0,0],[-2.3,0.4,0],[-2.2,1.45,0],[-1.2,1.6,0.15],[0,1.28,0.2],[1.2,1.5,0.15],[2.15,1.4,0],[2.35,0.4,0],[2.3,-0.9,0],[1.85,-2.35,0.1],[1.0,-2.6,0.1],[0.3,-2.5,0],[0.1,-3.2,0]]);
  const tr = { on:false, t:0, speed:1, parts:[], drops:[] };
  const wet = new THREE.MeshBasicMaterial({ color:0xA9762F, toneMapped:false });
  const dry = new THREE.MeshBasicMaterial({ color:0x6B4A24, toneMapped:false });
  for (let i=0;i<10;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), wet); m.userData.off = i/10; m.visible = false; E.scene.add(m); tr.parts.push(m); }
  const dropMat = new THREE.MeshBasicMaterial({ color:0x6FC6E0, toneMapped:false });
  for (let i=0;i<14;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), dropMat); m.userData.off = R(); m.visible = false; E.scene.add(m); tr.drops.push(m); }

  /* --- animación 2: fermentación en la lupa --- */
  const fer = { on:false, t:0, parts:[] };
  const fibMat = new THREE.MeshBasicMaterial({ color:0x9BD96A, toneMapped:false });
  const agccMat = new THREE.MeshBasicMaterial({ color:0xF2B24E, toneMapped:false });
  const gasMat = new THREE.MeshBasicMaterial({ color:0xBFD0DC, toneMapped:false });
  const ferMk = (from, to, mat, off, r) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r||0.05, 8, 6), mat); m.userData = { from, to, off }; m.visible = false; E.scene.add(m); fer.parts.push(m); };
  for (let i=0;i<8;i++) ferMk(new THREE.Vector3(LC.x - 1.1 + R()*2.2, LC.y + 1.8, (R()-0.5)*0.8), new THREE.Vector3(LC.x - 1.0 + R()*2.0, LC.y + 0.95, (R()-0.5)*0.7), fibMat, i/8, 0.07);
  for (let i=0;i<10;i++) ferMk(new THREE.Vector3(LC.x - 1.0 + R()*2.0, LC.y + 0.9, (R()-0.5)*0.7), new THREE.Vector3(LC.x - 0.9 + R()*1.8, LC.y + 0.2, (R()-0.5)*0.5), agccMat, i/10);
  for (let i=0;i<6;i++) ferMk(new THREE.Vector3(LC.x - 0.9 + R()*1.8, LC.y + 0.95, (R()-0.5)*0.6), new THREE.Vector3(LC.x - 0.9 + R()*1.8, LC.y + 2.1, (R()-0.5)*0.6), gasMat, i/6, 0.045);

  const model = {
    anims:[
      { id:'transito', label:'Tránsito y reabsorción de agua: de líquido a heces formadas', get on(){ return tr.on; },
        set(on){ tr.on = on; tr.parts.forEach(p => p.visible = on); tr.drops.forEach(p => p.visible = on); if (on) E.focus(new THREE.Vector3(0,-0.3,0), 11); }, needsOpacity:0.5, focus:true },
      { id:'fermentacion', label:'Fermentación de la fibra por la microbiota (lupa)', get on(){ return fer.on; },
        set(on){ fer.on = on; fer.parts.forEach(p => p.visible = on); if (on) E.focus(new THREE.Vector3(LC.x, LC.y+0.6, 0), 5); }, focus:true }
    ],
    setSpeed(k){ tr.speed = k; },
    phaseText(){
      if (fer.on && !tr.on) return 'Fibra → fermentación bacteriana → acetato, propionato y butirato (que alimenta al propio colon) + gas: por eso la fibra importa';
      if (!tr.on) return '';
      const t = tr.t % 1;
      return t < 0.35 ? 'Colon ascendente: llega contenido casi líquido; el sodio sale y el agua lo sigue por ósmosis'
           : t < 0.7 ? 'Colon transverso: el contenido se espesa; movimientos en masa dos o tres veces al día'
           : 'Descendente, sigmoide y recto: heces ya formadas, unos 100 a 150 g al día tras recuperar cerca de 1,4 litros de agua';
    },
    legend:[
      {color:'#A9762F', txt:'Contenido líquido recién llegado del íleon'},
      {color:'#6B4A24', txt:'Heces formadas'},
      {color:'#6FC6E0', txt:'Agua reabsorbida hacia la pared'},
      {color:'#9BD96A', txt:'Fibra que llega sin digerir'},
      {color:'#F2B24E', txt:'Ácidos grasos de cadena corta (butirato)'},
      {color:'#BFD0DC', txt:'Gas de la fermentación'}
    ],
    observa:'el contenido cambia de color a medida que avanza: es el agua que sale hacia la pared. En la lupa, comprueba que las bacterias se quedan sobre la capa de moco externa y nunca tocan el epitelio: esa capa interna casi estéril es la frontera que mantiene la paz entre el cuerpo y sus billones de inquilinos.'
  };

  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (tr.on){
      tr.t = (tr.t + dt*0.045*tr.speed) % 1;
      tr.parts.forEach(p => { const k = ((tr.t + p.userData.off) % 1 + 1) % 1; p.position.copy(trCurve.getPointAt(k)); p.material = k > 0.45 ? dry : wet; p.scale.setScalar(1 - 0.35*k); });
      tr.drops.forEach((p, i) => { const k = ((tr.t*2.5 + p.userData.off) % 1 + 1) % 1; const u = (p.userData.off*0.6 + 0.05) % 0.75;
        const c = trCurve.getPointAt(u); const dir = i % 2 ? 1 : -1;
        p.position.set(c.x + dir*(0.35 + k*0.55), c.y + 0.1*Math.sin(k*6), c.z + 0.2*dir*k); p.scale.setScalar(Math.max(0.15, 1 - k)); });
    }
    if (fer.on){ fer.t += dt*0.32; fer.parts.forEach(p => { const k = (fer.t + p.userData.off) % 1; p.position.lerpVectors(p.userData.from, p.userData.to, k); p.scale.setScalar(0.5 + 0.7*Math.sin(k*Math.PI)); }); }
  });
  return model;
}

/* ===================== REGISTRO, ACTIVIDADES Y RUTAS ===================== */
BIO.organs['estomago'] = BIO.stomach;
BIO.organs['intestino-delgado'] = BIO.smallBowel;
BIO.organs['intestino-grueso'] = BIO.largeBowel;
BIO.builders['estomago'] = buildStomach;
BIO.builders['intestino-delgado'] = buildSmallBowel;
BIO.builders['intestino-grueso'] = buildLargeBowel;
Object.assign(BIO.activities, {
  "explorar-estomago":{t:"Explorar el estómago", unidad:6, peso:10, xp:60},
  "guiada-estomago":{t:"Exploración guiada del estómago", unidad:6, peso:8, xp:80},
  "reto-estomago":{t:"Reto: el estómago no se digiere a sí mismo", unidad:6, peso:6, xp:50},
  "explorar-intestino-delgado":{t:"Explorar el intestino delgado", unidad:6, peso:10, xp:60},
  "guiada-intestino-delgado":{t:"Exploración guiada del intestino delgado", unidad:6, peso:8, xp:80},
  "reto-intestino-delgado":{t:"Reto: las tres escalas de la superficie intestinal", unidad:6, peso:6, xp:50},
  "explorar-intestino-grueso":{t:"Explorar el intestino grueso", unidad:6, peso:10, xp:60},
  "guiada-intestino-grueso":{t:"Exploración guiada del intestino grueso", unidad:6, peso:8, xp:80},
  "reto-intestino-grueso":{t:"Reto: agua, microbiota y fibra en el colon", unidad:6, peso:6, xp:50}
});
route('/explorar/estomago', (view,q) => organView(view, q, BIO.stomach, buildStomach));
route('/explorar/intestino-delgado', (view,q) => organView(view, q, BIO.smallBowel, buildSmallBowel));
route('/explorar/intestino-grueso', (view,q) => organView(view, q, BIO.largeBowel, buildLargeBowel));
</script>
