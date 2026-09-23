<script>
/* =====================================================================
   ATLAS 3D · HÍGADO (BGU · Unidad 6 · Cuerpo humano y salud)
   Datos + modelo procedimental + ruta. Un solo archivo.
   Lupa: lobulillo hepático clásico (hepatocitos en cordones, sinusoides,
   tríada portal, vena centrolobulillar y células de Kupffer).
   ===================================================================== */

BIO.liver = {
  capasHint: "Sugerencia: baja la transparencia del tejido hepático para ver por dónde entran la vena porta y la arteria hepática, y amplía la lupa del lobulillo.",
  id:"higado", nombre:"Hígado", unidad:6, dominio:"anat", eyebrow:"Atlas 3D · Unidad 6 · Sistema digestivo y metabolismo", em:"🟤",
  intro:"Recorre los lóbulos, sigue el doble aporte de sangre que solo este órgano recibe y amplía el lobulillo hepático para ver dónde se transforman los nutrientes y se preparan los desechos.",
  nota:"Modelo tridimensional simplificado con fines educativos. La forma de los lóbulos está suavizada y el hígado real no se ve aislado: está cubierto por peritoneo y en contacto con el diafragma, el estómago y el intestino. El lobulillo de la lupa está ampliado unas 500 veces y se dibuja como un hexágono perfecto; en un corte real los lobulillos son irregulares. Se representan unos pocos cordones y sinusoides: en el hígado hay alrededor de un millón de lobulillos.",
  focusR:9.5, radius:13, target:[-1.6,-0.3,0], phi:1.42, theta:0.30, floor:-3.5, floorSize:11,
  capas:[
    {id:"lobulos", n:"Lóbulos y ligamentos"},
    {id:"vasos", n:"Vasos sanguíneos"},
    {id:"biliar", n:"Vesícula y vía biliar"},
    {id:"lobulillo", n:"Lobulillo hepático (lupa)"}
  ],
  opacityCapas:["lobulos"], opacityLabel:"Transparencia del tejido hepático", opacityDefault:1,
  activity:"explorar-higado", guidedActivity:"guiada-higado", badge:"anatomista", seenThreshold:8,
  related:[
    {t:"Biomoléculas: lo que el hígado transforma", href:"#/cn/biomoleculas"},
    {t:"Célula animal en corte", href:"#/explorar/celula"},
    {t:"Microscopio virtual", href:"#/microscopio"}
  ],
  reto:{
    proposito:"Explica por qué el hígado es la primera parada obligatoria de todo lo que absorbes en el intestino y qué hace con ello.",
    pista:"Pista: compara de dónde viene la sangre de la vena porta y de dónde viene la de la arteria hepática.",
    observa:[
      {id:"vena-porta", txt:"Observa de dónde llega la sangre de la vena porta."},
      {id:"arteria-hepatica", txt:"Compárala con la sangre de la arteria hepática."},
      {id:"sinusoides", txt:"Mira dónde se mezclan las dos sangres, en la lupa."},
      {id:"venas-suprahepaticas", txt:"Sigue la salida de la sangre hacia la vena cava inferior."}
    ],
    pregunta:{
      q:"Tomas un jugo con mucha azúcar. ¿Qué camino sigue esa glucosa desde el intestino?",
      ops:[
        "Va por las arterias directamente al cerebro y al músculo; el hígado la recibe al final.",
        "Va por la vena porta al hígado, que almacena parte como glucógeno, y solo después pasa al resto del cuerpo.",
        "Pasa a la linfa y llega al hígado por el conducto biliar."
      ],
      ok:1,
      fb:"Es el primer paso hepático: toda la sangre del intestino atraviesa el hígado antes de llegar al corazón y repartirse. Por eso la glucemia no se dispara tanto después de comer.",
      wrong:[
        "Es al revés: la sangre del intestino no llega al corazón directamente, primero pasa por el hígado a través de la vena porta.",
        "La vía biliar transporta bilis desde el hígado hacia el intestino, nunca nutrientes desde el intestino hacia el hígado. Los azúcares viajan por la sangre de la vena porta."
      ]
    }
  },
  structures:[
    {id:"lobulo-derecho", nombre:"Lóbulo derecho", capa:"lobulos", color:"#8A4636", pos:[-1.75,0.2,0.05], lbl:[-3.64,1.36,0.45],
      n1:"Es la porción más grande del hígado, situada bajo las costillas del lado derecho y apoyada en la cúpula derecha del diafragma.",
      n2:"El hígado de una persona adulta pesa alrededor de 1,5 kg y el lóbulo derecho aporta la mayor parte de esa masa. Todo su tejido está formado por lobulillos: unas unidades hexagonales de 1 a 2 mm que se repiten cerca de un millón de veces y que hacen siempre el mismo trabajo, como los ladrillos de una pared.",
      n3:"La división clásica en cuatro lóbulos es superficial: la cirugía usa la clasificación de Couinaud, que divide el hígado en ocho segmentos, cada uno con su propia rama de la porta, de la arteria y su conducto biliar. Gracias a esa independencia se puede extirpar un segmento enfermo sin dañar el resto, y por eso es posible el trasplante de donante vivo.",
      dato:"El hígado es la víscera más grande del cuerpo: pesa unos 1,5 kg, casi como tres litros y medio de leche… en un solo órgano.",
      conecta:["lobulo-izquierdo","vena-porta","venas-suprahepaticas","hepatocitos"], temas:["Sistema digestivo","Metabolismo","Anatomía abdominal"],
      quiz:{q:"¿Por qué se puede donar una parte del hígado en vida?",
        ops:["Porque el hígado no es un órgano vital","Porque está dividido en segmentos con vasos propios y el tejido restante regenera su masa","Porque el hígado izquierdo es de repuesto"],
        ok:1, fb:"Cada segmento tiene su propia rama de la porta, de la arteria y su conducto biliar; el tejido que queda crece hasta recuperar la masa en semanas.",
        wrong:["El hígado es imprescindible: sin él no se puede vivir. Lo que permite la donación es su organización en segmentos y su capacidad de regeneración.","Ningún lóbulo es prescindible ni está 'de repuesto': los dos trabajan. La clave es que el tejido restante regenera."]}},
    {id:"lobulo-izquierdo", nombre:"Lóbulo izquierdo", capa:"lobulos", color:"#9A5642", pos:[1.35,0.3,0.1], lbl:[3.1,-0.42,-0.33],
      n1:"Porción más pequeña y aplanada que se extiende hacia la izquierda, por delante del estómago.",
      n2:"Hace exactamente lo mismo que el derecho: no hay reparto de tareas entre lóbulos. Su cara inferior se apoya sobre el estómago y deja una huella visible; por eso, cuando el estómago se llena, el lóbulo izquierdo se desplaza ligeramente.",
      n3:"El hígado tiene una capacidad de regeneración excepcional para un órgano humano: tras extirpar hasta un 70 % de su masa, los hepatocitos que quedan se dividen y recuperan el volumen original en semanas. No vuelve a formar los lóbulos con la misma forma, sino que agranda el tejido que queda: es regeneración de masa, no de la figura del órgano.",
      dato:"Si se extirpa hasta un 70 % del hígado, el tejido restante recupera la masa perdida en pocas semanas.",
      conecta:["lobulo-derecho","ligamento-falciforme","vena-porta"], temas:["Regeneración","Anatomía abdominal"],
      quiz:{q:"Después de una operación en la que se extirpa parte del hígado, el tejido que queda…",
        ops:["Vuelve a formar los mismos lóbulos con idéntica forma","Crece hasta recuperar la masa perdida, aunque no la forma original","No se recupera: la función se pierde para siempre"],
        ok:1, fb:"Los hepatocitos se dividen y devuelven al órgano su masa y su función en semanas; la silueta no se reconstruye igual.",
        wrong:["No se reconstruye la figura de los lóbulos: lo que se recupera es la masa y la función, agrandando el tejido que queda.","Sí se recupera: el hígado es el órgano interno con mayor capacidad de regeneración."]}},
    {id:"lobulo-caudado", nombre:"Lóbulo caudado", capa:"lobulos", color:"#76382B", pos:[-0.55,0.15,-0.95], lbl:[2.67,1.4,-2.15],
      n1:"Lóbulo pequeño situado en la cara posterior, entre la vena cava inferior y la fisura del ligamento venoso.",
      n2:"Es el segmento I de la clasificación quirúrgica y tiene una particularidad: drena su sangre directamente a la vena cava inferior por venas cortas propias, sin pasar por las grandes venas suprahepáticas.",
      n3:"Esa independencia tiene consecuencias clínicas: en el síndrome de Budd-Chiari, donde se obstruyen las venas suprahepáticas, el lóbulo caudado conserva su drenaje y se hipertrofia mientras el resto del hígado sufre. En una ecografía o una tomografía, un caudado muy agrandado es una pista de ese problema.",
      dato:"Es el único lóbulo que desagua directamente en la vena cava inferior, con sus propias venas cortas.",
      conecta:["venas-suprahepaticas","vena-porta","lobulo-cuadrado"], temas:["Anatomía abdominal","Circulación venosa"],
      quiz:{q:"¿Qué distingue al lóbulo caudado de los demás?",
        ops:["Que no recibe sangre de la vena porta","Que drena directamente a la vena cava inferior por venas propias","Que fabrica una bilis distinta"],
        ok:1, fb:"Su drenaje independiente explica que resista cuando se obstruyen las venas suprahepáticas.",
        wrong:["Sí recibe ramas de la vena porta, como todo el tejido hepático: lo peculiar es su salida venosa.","Todo el hígado produce la misma bilis; no hay lóbulos con funciones diferentes."]}},
    {id:"lobulo-cuadrado", nombre:"Lóbulo cuadrado", capa:"lobulos", color:"#A6644C", pos:[-0.45,-1.05,0.5], lbl:[-0.55,-2.55,1.25],
      n1:"Lóbulo pequeño y de contorno rectangular situado en la cara inferior, entre la vesícula biliar y la fisura del ligamento redondo.",
      n2:"Está justo por delante del hilio hepático, la 'puerta' por donde entran la vena porta y la arteria hepática y por donde sale la vía biliar. Ver el lóbulo cuadrado es la referencia para localizar esa puerta.",
      n3:"Aunque la anatomía clásica lo cuenta como lóbulo aparte, funcionalmente pertenece al hígado izquierdo: recibe su sangre y su conducto biliar de las ramas izquierdas. Es el segmento IVb de Couinaud, y esa diferencia entre la anatomía de superficie y la funcional es justo lo que obligó a crear la clasificación por segmentos.",
      dato:"Se ve como un lóbulo propio, pero funcionalmente forma parte del hígado izquierdo.",
      conecta:["vesicula-biliar","via-biliar","vena-porta","lobulo-caudado"], temas:["Anatomía abdominal","Anatomía quirúrgica"],
      quiz:{q:"El lóbulo cuadrado se ve en la superficie como un lóbulo aparte, pero…",
        ops:["funcionalmente depende de los vasos del hígado izquierdo","no tiene vasos propios y es tejido muerto","solo aparece en la infancia"],
        ok:0, fb:"Recibe sangre y drena bilis por las ramas izquierdas: por eso la anatomía de superficie no basta para operar.",
        wrong:["Todo el tejido hepático está irrigado y vivo; el lóbulo cuadrado trabaja como el resto.","Está presente durante toda la vida: es una región de la cara inferior del hígado."]}},
    {id:"ligamento-falciforme", nombre:"Ligamento falciforme", capa:"lobulos", color:"#E7DBC2", pos:[0.12,1.6,0.25], lbl:[1.05,2.49,-0.18],
      n1:"Lámina de peritoneo con forma de hoz que une la cara superior del hígado con el diafragma y la pared abdominal anterior.",
      n2:"Marca en la superficie el límite entre el lóbulo derecho y el izquierdo y ayuda a mantener el hígado en su sitio, aunque lo que de verdad lo sujeta es la presión abdominal y su unión al diafragma y a la vena cava.",
      n3:"En su borde libre inferior lleva el ligamento redondo, que no es un ligamento cualquiera: es el resto fibroso de la vena umbilical, la que durante la vida fetal traía sangre oxigenada desde la placenta directamente al hígado. Al nacer deja de circular sangre por ella y se transforma en un cordón fibroso. En algunas enfermedades hepáticas graves esa vena puede volver a abrirse y dilatar las venas alrededor del ombligo.",
      dato:"El cordón de su borde libre es lo que queda de la vena umbilical que te alimentó antes de nacer.",
      conecta:["lobulo-derecho","lobulo-izquierdo","vena-porta"], temas:["Desarrollo embrionario","Anatomía abdominal"],
      quiz:{q:"El ligamento redondo del borde libre del ligamento falciforme es…",
        ops:["un vaso que lleva bilis","el resto fibroso de la vena umbilical fetal","un nervio del hígado"],
        ok:1, fb:"Antes de nacer esa vena traía sangre oxigenada desde la placenta; después del parto se convierte en un cordón fibroso.",
        wrong:["La bilis circula por los conductos biliares, que salen por el hilio, no por el borde del ligamento falciforme.","No es tejido nervioso: es un vaso fetal cerrado y convertido en tejido fibroso."]}},
    {id:"vena-porta", nombre:"Vena porta hepática", capa:"vasos", color:"#3D63C9", interno:true, pos:[-0.3,-1.0,-0.2], lbl:[2.36,-1.29,-0.98],
      n1:"Vena que recoge toda la sangre del estómago, del intestino, del páncreas y del bazo y la lleva al hígado.",
      n2:"Se forma por la unión de la vena mesentérica superior y la vena esplénica, entra por el hilio y se divide en una rama derecha y una izquierda que se ramifican hasta las tríadas portales. Aporta cerca del 75 % de la sangre que recibe el hígado: es sangre venosa, pobre en oxígeno pero riquísima en los nutrientes que acabas de absorber.",
      n3:"Este es el llamado primer paso hepático: todo lo que absorbes en el intestino —azúcares, aminoácidos, alcohol, medicamentos, toxinas— atraviesa el hígado antes de llegar al corazón y repartirse por el cuerpo. Por eso muchos medicamentos tomados por la boca necesitan dosis mayores que inyectados: el hígado ya transformó una parte. Si la sangre no puede atravesar el hígado (hipertensión portal), busca caminos alternativos y dilata venas del esófago que pueden sangrar.",
      dato:"Es una vena que empieza y termina en capilares: sale de los capilares del intestino y desemboca en los sinusoides del hígado. Un 'sistema porta'.",
      conecta:["arteria-hepatica","sinusoides","triada-portal","hepatocitos","lobulo-derecho"], temas:["Sistema digestivo","Circulación","Farmacología"],
      quiz:{q:"¿Qué trae la vena porta al hígado?",
        ops:["Sangre rica en oxígeno desde el corazón","Sangre venosa cargada de los nutrientes absorbidos en el intestino","Bilis desde la vesícula biliar"],
        ok:1, fb:"Aporta el 75 % del flujo hepático y hace del hígado la primera parada de todo lo que absorbes.",
        wrong:["Esa es la arteria hepática, que aporta el oxígeno; la porta trae sangre ya usada por el intestino.","La bilis va en sentido contrario: se produce en el hígado y baja al intestino por la vía biliar."]}},
    {id:"arteria-hepatica", nombre:"Arteria hepática", capa:"vasos", color:"#C8322E", interno:true, pos:[0.1,-1.4,-0.45], lbl:[1.57,-2.76,-0.69],
      n1:"Arteria que trae al hígado sangre rica en oxígeno desde la aorta, a través del tronco celíaco.",
      n2:"Aporta solo un 25 % del flujo sanguíneo del hígado, pero cerca de la mitad de su oxígeno, porque su sangre está recién oxigenada en los pulmones. Entra por el hilio junto a la vena porta y la vía biliar, y acompaña a la porta en cada ramificación hasta llegar a las tríadas portales.",
      n3:"El hígado es el único órgano del cuerpo con doble aporte sanguíneo: una vena que le trae el trabajo (nutrientes) y una arteria que le trae la energía (oxígeno). Esa redundancia lo protege: si se obstruye una rama arterial, la sangre de la porta puede sostener el tejido. La vía biliar, en cambio, depende casi solo de la arteria, y por eso una lesión arterial en un trasplante daña primero los conductos biliares.",
      dato:"Aporta apenas el 25 % de la sangre del hígado, pero cerca del 50 % de su oxígeno.",
      conecta:["vena-porta","sinusoides","triada-portal","via-biliar"], temas:["Circulación","Sistema digestivo"],
      quiz:{q:"¿Por qué se dice que el hígado tiene un doble aporte sanguíneo?",
        ops:["Porque recibe sangre de dos arterias distintas","Porque recibe sangre de la vena porta (nutrientes) y de la arteria hepática (oxígeno)","Porque su sangre entra y sale por el mismo vaso"],
        ok:1, fb:"Es el único órgano así: la porta le trae la materia prima y la arteria el oxígeno para procesarla.",
        wrong:["No son dos arterias: lo peculiar es que una de las dos entradas es venosa y viene del intestino.","La sangre entra por la porta y la arteria, y sale por un tercer camino: las venas suprahepáticas."]}},
    {id:"venas-suprahepaticas", nombre:"Venas suprahepáticas", capa:"vasos", color:"#2F4E86", interno:true, pos:[-0.35,0.95,-0.8], lbl:[1.56,1.96,-1.55],
      n1:"Son las tres venas (derecha, media e izquierda) que recogen toda la sangre del hígado y la vuelcan en la vena cava inferior.",
      n2:"Recogen la sangre de las venas centrolobulillares de cada lobulillo. Desde la cava inferior esa sangre llega a la aurícula derecha del corazón y de ahí va a los pulmones. Es la única salida de la sangre hepática: por el hígado pasan alrededor de 1,5 litros de sangre por minuto, cerca de una cuarta parte de todo lo que bombea el corazón en reposo.",
      n3:"Como el hígado está pegado a la vena cava y esta llega directo al corazón, los problemas del corazón derecho se notan en el hígado: si el corazón no vacía bien, la sangre se remansa y el hígado se congestiona y se agranda (hepatomegalia congestiva). El camino inverso también existe: una obstrucción de estas venas (síndrome de Budd-Chiari) hace que la sangre no salga y el hígado se hinche.",
      dato:"Por el hígado pasa alrededor de 1,5 litros de sangre por minuto: una cuarta parte de todo lo que bombea el corazón.",
      conecta:["vena-centrolobulillar","lobulo-caudado","vena-porta","lobulo-derecho"], temas:["Circulación","Homeostasis"],
      quiz:{q:"¿A dónde va la sangre que sale del hígado por las venas suprahepáticas?",
        ops:["A la vena cava inferior y de ahí a la aurícula derecha","Al intestino, para recoger más nutrientes","A la arteria aorta"],
        ok:0, fb:"Cava inferior → aurícula derecha → pulmones. El hígado es la última estación antes de que esa sangre vuelva al corazón.",
        wrong:["La sangre llega desde el intestino, no vuelve a él: el flujo va intestino → porta → hígado → cava.","Las venas nunca desembocan en una arteria: la aorta sale del ventrículo izquierdo."]}},
    {id:"vesicula-biliar", nombre:"Vesícula biliar", capa:"biliar", color:"#4E8C4A", pos:[-1.0,-1.3,0.5], lbl:[-1.74,-2.17,0.87],
      n1:"Bolsa con forma de pera, de unos 8 cm, alojada en una fosa de la cara inferior del hígado; almacena y concentra la bilis.",
      n2:"El hígado produce entre 0,5 y 1 litro de bilis al día de forma continua, pero solo hace falta cuando comes. Entre comidas la bilis se desvía a la vesícula, que guarda unos 50 ml y le quita agua hasta concentrarla varias veces. Cuando llega al duodeno una comida grasosa, la hormona colecistoquinina hace que la vesícula se contraiga y vacíe su bilis.",
      n3:"Si la bilis se concentra demasiado o se estanca, el colesterol puede cristalizar y formar cálculos biliares. Cuando un cálculo obstruye la salida aparece el cólico biliar: dolor intenso bajo las costillas derechas, típicamente después de una comida grasosa. Se puede vivir sin vesícula: sin ella la bilis llega al intestino de forma continua en lugar de a chorros.",
      dato:"La vesícula no fabrica bilis: solo la guarda y la concentra hasta unas diez veces mientras esperas la próxima comida.",
      conecta:["via-biliar","lobulo-cuadrado","hepatocitos"], temas:["Sistema digestivo","Digestión de lípidos","Salud"],
      quiz:{q:"¿Cuál es la función de la vesícula biliar?",
        ops:["Fabricar la bilis","Almacenar y concentrar la bilis que fabrica el hígado","Producir enzimas digestivas"],
        ok:1, fb:"La bilis se fabrica en los hepatocitos; la vesícula la guarda entre comidas y la suelta cuando llega grasa al duodeno.",
        wrong:["La bilis se fabrica en los hepatocitos del hígado; la vesícula solo la almacena, y por eso se puede vivir sin ella.","Las enzimas digestivas las producen el páncreas y el intestino. La bilis no tiene enzimas: emulsiona la grasa."]}},
    {id:"via-biliar", nombre:"Vía biliar", capa:"biliar", color:"#C9A227", interno:true, pos:[-0.1,-1.7,0.0], lbl:[0.55,-3.25,0.2],
      n1:"Red de conductos que recoge la bilis del hígado y la conduce hasta el duodeno: conductos hepáticos, cístico y colédoco.",
      n2:"La bilis nace en los canalículos entre los hepatocitos, se junta en los conductillos de las tríadas portales y va hacia conductos cada vez mayores hasta el colédoco, que desemboca en el duodeno. La bilis no contiene enzimas: sus sales biliares emulsionan la grasa, la rompen en gotitas diminutas para que las enzimas del páncreas puedan actuar.",
      n3:"La bilis también es una vía de eliminación. La bilirrubina procede de la hemoglobina de los glóbulos rojos viejos: cada segundo se destruyen millones de glóbulos rojos y el hígado convierte esa bilirrubina en una forma soluble que se excreta con la bilis, y que da su color a las heces. Si el hígado no la procesa o los conductos se obstruyen, la bilirrubina se acumula en la sangre y aparece la ictericia: piel y ojos amarillos, orina oscura y heces pálidas. En los recién nacidos la ictericia leve es frecuente porque su hígado aún está madurando.",
      dato:"El color de las heces y el amarillo de la ictericia son la misma sustancia: bilirrubina, el residuo de la hemoglobina.",
      conecta:["vesicula-biliar","hepatocitos","triada-portal","arteria-hepatica"], temas:["Sistema digestivo","Excreción","Salud"],
      quiz:{q:"Una persona tiene los ojos amarillos, la orina oscura y las heces pálidas. ¿Qué explica mejor esos tres signos juntos?",
        ops:["Falta de hierro en la sangre","La bilirrubina no llega al intestino y se acumula en la sangre","Exceso de agua en la dieta"],
        ok:1, fb:"Si la bilis no sale, la bilirrubina se acumula (ojos amarillos), se elimina por la orina (oscura) y no llega al intestino (heces pálidas).",
        wrong:["La falta de hierro causa anemia y palidez, no coloración amarilla ni cambios en el color de las heces.","Beber agua no cambia el color de la piel ni de las heces; el color de las heces depende de los pigmentos de la bilis."]}},
    {id:"hepatocitos", nombre:"Hepatocitos en cordones", capa:"lobulillo", color:"#C9835C", pos:[-4.55,-0.75,0.7], lbl:[-5.87,0.3,0.94],
      n1:"Son las células del hígado; se ordenan en cordones de una o dos células de grosor que van desde el borde del lobulillo hasta la vena central.",
      n2:"Representan cerca del 80 % de la masa del hígado y son las obreras del metabolismo. Guardan el exceso de glucosa como glucógeno (unos 100 gramos, suficientes para sostener la glucemia unas 12 a 24 horas de ayuno) y lo devuelven a la sangre cuando hace falta; fabrican y exportan lípidos; y con los aminoácidos producen proteínas del plasma como la albúmina —unos 12 gramos al día— y los factores que permiten que la sangre coagule. Al usar los aminoácidos generan amoníaco, muy tóxico, y lo convierten en urea, que el riñón elimina.",
      n3:"Aquí ocurre lo que en la calle se llama 'desintoxicar', y es un proceso químico en dos fases, no una limpieza. En la fase I, enzimas del citocromo P450 modifican la molécula (la oxidan); en la fase II se le pega una molécula soluble en agua (glucuronidación, sulfatación, conjugación con glutatión) para que pueda salir por la orina o la bilis. Por eso ningún jugo ni té 'detox' desintoxica nada: el trabajo lo hacen estas enzimas, funcionan todo el tiempo y no se pueden acelerar bebiendo algo. Lo que sí las sobrecarga es el exceso de alcohol o de medicamentos: el paracetamol en dosis altas agota el glutatión de la fase II y daña el hígado.",
      dato:"Los 'detox' no existen: desintoxicar es una reacción química en dos fases que tus hepatocitos hacen las 24 horas, tomes lo que tomes.",
      conecta:["sinusoides","vena-centrolobulillar","triada-portal","via-biliar"], temas:["Metabolismo","Biomoléculas","Salud","Pensamiento crítico"],
      quiz:{q:"¿Qué significa realmente que el hígado 'desintoxica'?",
        ops:["Que atrapa las toxinas y las guarda hasta que se eliminen con un jugo detox","Que transforma las sustancias en dos fases químicas para hacerlas solubles y poder excretarlas","Que filtra la sangre como un colador, reteniendo lo malo"],
        ok:1, fb:"Fase I: enzimas del citocromo P450 modifican la molécula. Fase II: se le añade un grupo soluble para excretarla por la orina o la bilis.",
        wrong:["El hígado no almacena toxinas esperando ayuda: las transforma continuamente. Ningún jugo activa ni acelera ese proceso.","No es un filtro mecánico: es química. Transforma las moléculas para que el riñón o la bilis puedan sacarlas."]}},
    {id:"sinusoides", nombre:"Sinusoides y células de Kupffer", capa:"lobulillo", color:"#B1443C", pos:[-4.0,-1.75,0.7], lbl:[-5.69,-3.21,1.4], anchor:[-3.98,-1.84,0.65],
      n1:"Capilares anchos y porosos que corren entre los cordones de hepatocitos y llevan la sangre desde el borde del lobulillo hasta la vena central.",
      n2:"Aquí se mezclan las dos sangres: la de la rama de la vena porta (nutrientes) y la de la rama de la arteria hepática (oxígeno). Su pared está agujereada y no tiene membrana basal continua, así que el plasma sale al espacio de Disse y baña directamente a los hepatocitos: por eso el intercambio es tan rápido. En sus paredes viven las células de Kupffer, macrófagos fijos que devoran bacterias, restos celulares y glóbulos rojos viejos que llegan desde el intestino.",
      n3:"Las células de Kupffer son el grupo de macrófagos de tejido más numeroso del cuerpo y forman la primera barrera inmunitaria frente a lo que entra desde el intestino. En el espacio de Disse hay además células estrelladas que almacenan vitamina A; cuando el hígado se daña de forma repetida, esas células producen colágeno, el tejido se endurece y se llega a la fibrosis y la cirrosis. En Ecuador la hepatitis A sigue apareciendo en brotes: se transmite por vía fecal-oral, con agua o alimentos contaminados, así que su frecuencia está ligada al acceso a agua segura y saneamiento, todavía desigual entre zonas urbanas y rurales.",
      dato:"Los sinusoides son capilares con agujeros: el plasma sale y baña a los hepatocitos sin salir del vaso por completo.",
      conecta:["hepatocitos","vena-porta","arteria-hepatica","vena-centrolobulillar"], temas:["Circulación","Sistema inmunitario","Salud pública","Histología"],
      quiz:{q:"¿Qué tiene de especial la sangre que circula por los sinusoides?",
        ops:["Es solo sangre arterial, muy oxigenada","Es una mezcla de sangre de la vena porta y de la arteria hepática","Es sangre que ya pasó por el riñón"],
        ok:1, fb:"La mezcla de las dos entradas es lo que hace único al hígado: recibe a la vez nutrientes y oxígeno.",
        wrong:["Solo una cuarta parte del flujo es arterial: la mayoría viene de la vena porta, cargada de nutrientes.","La sangre del riñón vuelve al corazón por la vena cava; no atraviesa el hígado."]}},
    {id:"triada-portal", nombre:"Tríada portal", capa:"lobulillo", color:"#6B8F3A", pos:[-5.45,-1.3,0.7], lbl:[-6.84,-1.46,1.16],
      n1:"Conjunto de tres conductos que se repite en cada vértice del lobulillo: una rama de la vena porta, una rama de la arteria hepática y un conductillo biliar.",
      n2:"Las dos ramas sanguíneas vierten en los sinusoides y su sangre viaja hacia el centro del lobulillo; el conductillo biliar, en cambio, recoge la bilis que viene del centro. Sangre y bilis circulan por el mismo lobulillo en direcciones opuestas, sin mezclarse nunca: la sangre va de fuera hacia adentro y la bilis de adentro hacia afuera.",
      n3:"La tríada suele ser en realidad un espacio portal con cinco elementos: los tres conductos más un vaso linfático y fibras nerviosas. El hígado produce entre una cuarta parte y la mitad de la linfa del cuerpo. Al mirar una lámina al microscopio, encontrar estos espacios portales es lo que permite reconocer el tejido hepático y delimitar los lobulillos, y su inflamación es uno de los primeros signos de una hepatitis.",
      dato:"En el lobulillo la sangre va de fuera hacia el centro y la bilis del centro hacia fuera: corrientes opuestas que nunca se mezclan.",
      conecta:["vena-porta","arteria-hepatica","via-biliar","sinusoides"], temas:["Histología","Circulación","Sistema digestivo"],
      quiz:{q:"En un lobulillo hepático, ¿en qué dirección circulan la sangre y la bilis?",
        ops:["Las dos van del borde hacia la vena central","La sangre va del borde al centro y la bilis del centro al borde","Las dos van del centro hacia el borde"],
        ok:1, fb:"Corrientes opuestas: la sangre termina en la vena centrolobulillar y la bilis sale por los conductillos de las tríadas.",
        wrong:["Si la bilis fuera al centro, desembocaría en la sangre: precisamente lo que el hígado evita separándolas.","La sangre entra por las ramas de la porta y la arteria, que están en el borde, y avanza hacia el centro."]}},
    {id:"vena-centrolobulillar", nombre:"Vena centrolobulillar", capa:"lobulillo", color:"#4A5FA8", pos:[-4.55,-1.3,0.9], lbl:[-6.18,-2.69,1.63],
      n1:"Vena situada en el centro de cada lobulillo; recoge la sangre que ha atravesado los sinusoides.",
      n2:"Todas las venas centrolobulillares confluyen en venas cada vez mayores hasta formar las venas suprahepáticas, que desembocan en la vena cava inferior. La sangre que llega aquí ya entregó su oxígeno y sus nutrientes a los hepatocitos del camino.",
      n3:"Por eso los hepatocitos que rodean esta vena (zona 3 del lobulillo) son los que menos oxígeno reciben y los primeros en sufrir cuando hay poca sangre o un tóxico: ahí empiezan el daño por alcohol y la acumulación de grasa. El hígado graso —grasa acumulada en los hepatocitos— es hoy la enfermedad hepática más frecuente y en Ecuador se asocia al sobrepeso y a una dieta con muchas bebidas azucaradas y ultraprocesados; según las encuestas nacionales de salud y nutrición, cerca de seis de cada diez personas adultas tienen sobrepeso u obesidad. En sus primeras etapas es reversible con alimentación y actividad física.",
      dato:"El daño hepático por alcohol o por grasa empieza justo alrededor de esta vena, donde llega menos oxígeno.",
      conecta:["sinusoides","venas-suprahepaticas","hepatocitos"], temas:["Circulación","Salud","Nutrición"],
      quiz:{q:"¿Por qué el daño por alcohol o por grasa empieza alrededor de la vena centrolobulillar?",
        ops:["Porque ahí llegan primero los tóxicos","Porque es la zona del lobulillo que recibe la sangre con menos oxígeno","Porque ahí no hay hepatocitos"],
        ok:1, fb:"La sangre llega al centro después de recorrer todo el sinusoide: los hepatocitos de la zona 3 trabajan con el oxígeno que sobra.",
        wrong:["Los tóxicos llegan primero al borde del lobulillo, por las tríadas portales; lo que vuelve frágil al centro es la falta de oxígeno.","El centro está rodeado de hepatocitos: son precisamente los que más sufren."]}}
  ],
  guiada:[
    {tipo:"select", target:"vena-porta", txt:"Selecciona el vaso que trae al hígado <b>toda la sangre del intestino</b>, cargada de nutrientes."},
    {tipo:"select", target:"arteria-hepatica", txt:"Ahora selecciona el vaso que le trae el <b>oxígeno</b>. Con los dos ya viste el doble aporte sanguíneo."},
    {tipo:"anim", target:"flujo", txt:"Activa <b>Doble aporte sanguíneo</b> (Animación) y observa dónde se juntan las dos sangres y por dónde salen."},
    {tipo:"select", target:"sinusoides", txt:"En la lupa, selecciona los <b>capilares porosos</b> donde se mezclan las dos sangres y bañan a los hepatocitos."},
    {tipo:"select", target:"hepatocitos", txt:"Selecciona las <b>células</b> que guardan glucógeno, fabrican albúmina y transforman los tóxicos en dos fases."},
    {tipo:"anim", target:"bilis", txt:"Activa <b>Producción y flujo de bilis</b> y comprueba que la bilis viaja en sentido contrario a la sangre."},
    {tipo:"select", target:"via-biliar", txt:"Selecciona el camino por el que la <b>bilis</b> y la bilirrubina llegan al duodeno."},
    {tipo:"text", txt:"Explica con tus palabras el primer paso hepático: qué le pasa a un alimento absorbido en el intestino antes de llegar al resto del cuerpo, y por qué eso hace del hígado un órgano tan expuesto a los tóxicos. Tu respuesta se guardará en el cuaderno."}
  ]
};

/* Actividades y registro del recurso en el catálogo (el hígado deja de estar "en construcción") */
Object.assign(BIO.activities, {
  "explorar-higado":{t:"Explorar el hígado", unidad:6, peso:15, xp:60},
  "guiada-higado":{t:"Exploración guiada del hígado", unidad:6, peso:10, xp:80},
  "reto-higado":{t:"Reto del hígado: el primer paso hepático", unidad:6, peso:10, xp:70}
});
(() => {
  const i = BIO.plannedOrgans.findIndex(o => o.id === 'higado');
  if (i >= 0) BIO.plannedOrgans.splice(i, 1);
  if (!BIO.resources.some(r => r.id === 'higado')) BIO.resources.push({
    id:'higado', tipo:'Modelo 3D', t:'Hígado', d:'Lóbulos, doble aporte sanguíneo, vía biliar y lupa del lobulillo hepático.',
    href:'#/explorar/higado', areas:['cuerpo'], em:'🟤', ok:true,
    reto:'Explica por qué todo lo que absorbes en el intestino pasa primero por el hígado y qué hace él con eso.', act:'reto-higado'
  });
})();

/* =====================================================================
   MODELO 3D
   ===================================================================== */
function buildLiver(E){
  orgvFrame(E, 1.42);
  const low = E.low;
  const DH = BIO.liver;
  const SH = Object.fromEntries(DH.structures.map(s => [s.id, s]));
  const CENTER = new THREE.Vector3(-0.4,-0.1,0);
  const addH = (id, meshes, extra={}) => {
    const s = SH[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, explodeDir:V3(s.pos).sub(CENTER).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl);
    return p;
  };
  const RH = Kit.rng(17);

  /* ---------- 1. Parénquima: masa hepática dividida en cuatro lóbulos ---------- */
  const liverG = Kit.sculpt({
    w: low?84:132, h: low?64:104,
    shape: d => {
      const X = d.x < 0 ? 3.00*d.x : 2.35*d.x;
      /* cuña: masa alta y profunda a la derecha, afilada hacia la punta izquierda */
      const Hh = 1.25 + 0.70*Math.exp(-Math.pow((X+1.55)/1.15, 2)) - 0.40*smooth01((X-0.15)/2.0);
      const Pp = 1.32 - 0.62*smooth01((X-0.05)/2.1);
      const yOff = 0.05 + 0.34*smooth01((X-0.10)/2.0);          // el borde inferior sube hacia la izquierda
      let Y = d.y * Hh * (d.y > 0 ? 1 : 0.84);                  // cara superior abombada, cara visceral más plana
      let Z = d.z * Pp;
      if (Y < 0 && Z > 0) Y += 0.50*(-Y)*smooth01((Z-0.20)/0.85);  // borde inferior anterior afilado
      if (Z < -0.25 && X > -1.35 && X < 0.35) Z += 0.40*Math.exp(-((X+0.50)*(X+0.50)/0.32 + (Y+0.05)*(Y+0.05)/0.70)); // surco de la vena cava
      return new THREE.Vector3(X, Y + yOff, Z);
    },
    disp: (p) => {
      let dz = 0.024*Kit.fbm(p.x*1.7, p.y*1.7, p.z*1.7, 3);
      dz -= 0.20*gauss(p.x-0.12, 0.14)*smooth01((p.y-0.10)/0.6);                    // surco del ligamento falciforme
      dz -= 0.14*gauss(p.x-0.12, 0.11)*smooth01((-p.y-0.30)/0.4);                   // fisura umbilical (cara inferior)
      dz -= 0.18*Math.exp(-((p.x+1.00)*(p.x+1.00)/0.12 + (p.z-0.45)*(p.z-0.45)/0.34))*smooth01((-p.y-0.55)/0.4); // fosa de la vesícula
      dz -= 0.10*gauss(p.z+0.80, 0.18)*smooth01((p.x+1.30)/0.5)*smooth01((0.35-p.x)/0.5)*smooth01((p.y+0.70)/0.5); // fisura del ligamento venoso
      return dz;
    },
    store: (p) => {
      if (p.x > 0.18) return 'izq';
      if (p.z < -0.55 && p.x > -1.25 && p.y > -0.55) return 'caud';
      if (p.y < -0.35 && p.z > 0.05 && p.x > -1.05) return 'cuad';
      return 'der';
    }
  });
  const regions = Kit.split(liverG, i => liverG.userData.extra[i]);
  /* cápsula de Glisson húmeda sobre parénquima pardo rojizo con lobulillos finos */
  const parMat = tint => orgvTex.mat({ color:tint, tex:'liver', rep:[3,2], bump:0.02, rough:0.5, coat:0.8, coatRough:0.17, env:0.85 });
  const LOB = [['der','lobulo-derecho',0xFFFFFF], ['izq','lobulo-izquierdo',0xF4ECEA], ['caud','lobulo-caudado',0xE2D6D4], ['cuad','lobulo-cuadrado',0xFFF4EE]];
  const parMeshes = [];
  LOB.forEach(([k, id, tint]) => {
    const g = regions[k] || new THREE.SphereGeometry(0.2, 10, 8).translate(...SH[id].pos);  // resguardo: la parte siempre existe
    const m = new THREE.Mesh(g, parMat(tint));
    parMeshes.push(m);
    addH(id, [m]);
  });

  /* ---------- 2. Ligamento falciforme y ligamento redondo ---------- */
  const ligMat = orgvTex.mat({ color:orgvTex.lin(0xD9CDB6), rough:0.55, coat:0.5, coatRough:0.3, env:0.7, side:THREE.DoubleSide });
  const falc = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1, 16, 5), ligMat);
  { /* hoz: alta en el centro, afilada en los extremos y apoyada en la cara superior del hígado */
    const p = falc.geometry.attributes.position;
    for (let i=0;i<p.count;i++){
      const x = p.getX(i), v = (p.getY(i) + 0.5);                     // 0 = borde inferior, 1 = borde superior
      const alto = 0.46*Math.exp(-Math.pow(x/0.85, 2));
      p.setXYZ(i, x, v*alto, 0.10*Math.sin(x*1.5));
    }
    falc.geometry.computeVertexNormals(); }
  falc.rotation.y = Math.PI/2; falc.position.set(0.12, 1.28, 0.25); falc.userData.sub = 'falciforme';
  const redondo = new THREE.Mesh(Kit.taper([[0.12,1.32,0.72],[0.12,0.45,1.22],[0.12,-0.45,1.18],[0.12,-1.05,0.92]], 0.05, 0.04, { seg:16, rad:8 }),
    orgvTex.mat({ color:orgvTex.lin(0xC9B994), rough:0.55, coat:0.45 }));
  redondo.userData.sub = 'redondo';
  addH('ligamento-falciforme', [falc, redondo], { explodeDir:new THREE.Vector3(0,1,0.3).normalize() });

  /* ---------- 3. Vena porta: tributarias, tronco y ramas intrahepáticas ---------- */
  const HIL = new THREE.Vector3(-0.32,-1.00,-0.20);                    // hilio hepático
  const venMat = Kit.tissue({ tex:'vein', rep:[4,1], bump:0.008, coat:0.65, rough:0.36 });
  const portaG = [
    Kit.taper([[0.95,-2.10,-0.05],[0.50,-1.92,-0.12],[0.15,-1.70,-0.18]], 0.08, 0.125, { seg:14, rad:10 }),   // vena esplénica
    Kit.taper([[-0.28,-2.15,0.15],[-0.02,-1.94,0.00],[0.15,-1.70,-0.18]], 0.08, 0.125, { seg:14, rad:10 }),   // vena mesentérica superior
    Kit.taper([[0.15,-1.70,-0.18],[-0.05,-1.35,-0.20], HIL], 0.19, 0.165, { seg:16, rad:12 }),                // tronco de la porta
    Kit.taper([HIL, [-0.95,-0.80,-0.18],[-1.75,-0.55,-0.12]], 0.15, 0.07, { seg:16, rad:10 }),                // rama derecha
    Kit.taper([HIL, [0.35,-0.80,-0.12],[1.05,-0.55,-0.05]], 0.13, 0.06, { seg:16, rad:10 })                   // rama izquierda
  ];
  [[-1.75,-0.55,-0.12,-2.40,-0.25,0.15],[-1.75,-0.55,-0.12,-2.05,0.25,-0.45],[-1.75,-0.55,-0.12,-1.85,-1.05,0.45],
   [1.05,-0.55,-0.05,1.75,-0.25,0.15],[1.05,-0.55,-0.05,1.50,0.05,-0.30]].forEach(v => {
    portaG.push(Kit.taper([[v[0],v[1],v[2]],[(v[0]+v[3])/2,(v[1]+v[4])/2,(v[2]+v[5])/2],[v[3],v[4],v[5]]], 0.055, 0.025, { seg:10, rad:7 }));
  });
  addH('vena-porta', [new THREE.Mesh(Kit.merge(portaG), venMat)]);

  /* ---------- 4. Arteria hepática ---------- */
  const artMat = Kit.tissue({ tex:'artery', rep:[4,1], bump:0.008, coat:0.7, rough:0.34 });
  const artG = [
    Kit.taper([[1.35,-2.05,-0.55],[0.78,-1.82,-0.52],[0.20,-1.45,-0.42],[-0.25,-1.15,-0.32]], 0.08, 0.06, { seg:18, rad:10 }),
    Kit.taper([[-0.25,-1.15,-0.32],[-0.95,-0.95,-0.26],[-1.70,-0.72,-0.20]], 0.055, 0.028, { seg:14, rad:8 }),
    Kit.taper([[-0.25,-1.15,-0.32],[0.35,-0.98,-0.22],[1.00,-0.72,-0.16]], 0.05, 0.026, { seg:14, rad:8 })
  ];
  addH('arteria-hepatica', [new THREE.Mesh(Kit.merge(artG), artMat)]);

  /* ---------- 5. Venas suprahepáticas y vena cava inferior ---------- */
  const cavaMat = Kit.tissue({ color:0x0B1738, rough:0.45, coat:0.35 });
  const cava = new THREE.Mesh(Kit.taper([[-0.35,-1.45,-0.86],[-0.35,-0.10,-0.90],[-0.35,1.15,-0.88],[-0.35,2.15,-0.86]], 0.17, 0.17, { seg:16, rad:12 }), cavaMat);
  cava.userData.sub = 'cava';
  const supG = [
    Kit.taper([[-2.10,-0.30,-0.25],[-1.35,0.40,-0.55],[-0.62,0.88,-0.80],[-0.37,0.98,-0.85]], 0.045, 0.13, { seg:16, rad:9 }),  // suprahepática derecha
    Kit.taper([[-0.70,-0.45,0.35],[-0.62,0.35,-0.15],[-0.42,0.85,-0.72]], 0.04, 0.10, { seg:14, rad:9 }),                        // suprahepática media
    Kit.taper([[1.50,-0.25,-0.10],[0.80,0.40,-0.50],[-0.15,0.85,-0.80],[-0.35,0.92,-0.86]], 0.04, 0.10, { seg:16, rad:9 })       // suprahepática izquierda
  ];
  const sup = new THREE.Mesh(Kit.merge(supG), cavaMat); sup.userData.sub = 'suprahepaticas';
  addH('venas-suprahepaticas', [sup, cava], { explodeDir:new THREE.Vector3(0,1,-0.6).normalize() });

  /* ---------- 6. Vesícula biliar ---------- */
  const vesMat = orgvTex.mat({ color:orgvTex.lin(0x4E7448), rough:0.4, coat:0.9, coatRough:0.14, env:0.9 });
  const vesG = Kit.sculpt({ w: low?28:44, h: low?20:32,
    shape: d => new THREE.Vector3(0.30*d.x, 0.42*d.y*(d.y>0 ? 0.75 : 1), 0.30*d.z),
    disp: (p) => 0.05*smooth01((p.y+0.05)/0.45) });
  const ves = new THREE.Mesh(vesG, vesMat);
  ves.position.set(-1.00,-1.28,0.48); ves.rotation.z = -0.35; ves.rotation.x = 0.25; ves.userData.sub = 'vesicula';
  addH('vesicula-biliar', [ves], { explodeDir:new THREE.Vector3(-0.5,-1,0.6).normalize() });

  /* ---------- 7. Vía biliar: hepáticos, cístico y colédoco ---------- */
  const bilMat = orgvTex.mat({ color:orgvTex.lin(0x9C9A3E), rough:0.4, coat:0.7, coatRough:0.2 });
  const CONF = new THREE.Vector3(-0.48,-1.28,0.06);                     // unión de los conductos hepáticos
  const bilG = [
    Kit.taper([[-1.70,-0.92,0.14],[-1.05,-1.12,0.10], CONF], 0.028, 0.048, { seg:14, rad:8 }),   // conducto hepático derecho
    Kit.taper([[1.00,-0.92,0.16],[0.20,-1.16,0.10], CONF], 0.026, 0.045, { seg:14, rad:8 }),     // conducto hepático izquierdo
    Kit.taper([[-0.92,-1.62,0.42],[-0.70,-1.45,0.22], CONF], 0.045, 0.045, { seg:10, rad:8 }),   // conducto cístico
    Kit.taper([CONF,[-0.30,-1.72,0.02],[-0.10,-2.05,-0.02],[0.05,-2.42,-0.05]], 0.055, 0.050, { seg:16, rad:9 })  // colédoco
  ];
  const bil = new THREE.Mesh(Kit.merge(bilG), bilMat); bil.userData.sub = 'conductos';
  addH('via-biliar', [bil], { explodeDir:new THREE.Vector3(0,-1,0.35).normalize() });

  /* =====================================================================
     8. LUPA: lobulillo hepático clásico
     ===================================================================== */
  const LC = new THREE.Vector3(-4.55,-1.30,0.70);      // centro del lobulillo ampliado
  const RL = 0.95;                                     // radio del hexágono
  const HZ = 0.30;                                     // media altura del prisma
  const lupaMat = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:false });
  const aro = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.022, 8, 56), lupaMat); aro.position.copy(LC);
  const destino = new THREE.Vector3(-2.60,-0.55,0.60);
  const dirGuia = destino.clone().sub(LC).normalize();
  const guia = new THREE.Mesh(Kit.taper([LC.clone().addScaledVector(dirGuia, 1.15), destino], 0.012, 0.012, { seg:4, rad:6 }), lupaMat);
  E.scene.add(aro, guia);
  /* contorno hexagonal del lobulillo (decorativo, no seleccionable) */
  const hexPt = (k, z) => new THREE.Vector3(LC.x + RL*Math.cos(k*Math.PI/3), LC.y + RL*Math.sin(k*Math.PI/3), LC.z + z);
  const hexG = [];
  for (let k=0;k<6;k++){ hexG.push(Kit.taper([hexPt(k, HZ), hexPt(k+1, HZ)], 0.022, 0.022, { seg:3, rad:5 })); hexG.push(Kit.taper([hexPt(k, -HZ), hexPt(k+1, -HZ)], 0.022, 0.022, { seg:3, rad:5 })); }
  E.scene.add(new THREE.Mesh(Kit.merge(hexG), new THREE.MeshBasicMaterial({ color:0x7A5236, toneMapped:false })));

  const NC = low ? 12 : 18;                            // cordones de hepatocitos
  const capas = low ? [0] : [-0.13, 0.13];
  const hepG = [];
  for (let i=0;i<NC;i++){
    const a = (i + 0.5) * 2*Math.PI/NC;
    const ux = Math.cos(a), uy = Math.sin(a);
    capas.forEach(cz => {
      for (let r=0.26; r<=0.86; r+=0.085){
        const jitter = 0.035*(RH()-0.5);
        const g = new THREE.SphereGeometry(0.058 + 0.012*RH(), low?6:8, low?5:6);
        g.translate(LC.x + ux*r + uy*jitter, LC.y + uy*r - ux*jitter, LC.z + cz + 0.05*(RH()-0.5));
        hepG.push(g);
      }
    });
  }
  const hep = new THREE.Mesh(Kit.merge(hepG), Kit.tissue({ color:0x8A5233, rough:0.5, coat:0.4, coatRough:0.35 }));
  hep.userData.sub = 'cordones';
  addH('hepatocitos', [hep], { explodeDir:new THREE.Vector3(-0.9,0.4,0.3).normalize() });

  /* sinusoides: tubos entre cordones, con color de rojo (periferia) a azul (centro) */
  const sinG = [], kupG = [], sinCurvas = [];
  for (let i=0;i<NC;i++){
    const a = i * 2*Math.PI/NC;
    const ux = Math.cos(a), uy = Math.sin(a);
    const pts = [];
    for (let t=0;t<=5;t++){
      const r = 0.92 - t*(0.92-0.16)/5;
      const w = 0.05*Math.sin(t*1.7 + i);
      pts.push(new THREE.Vector3(LC.x + ux*r - uy*w, LC.y + uy*r + ux*w, LC.z + 0.10*Math.sin(t*0.9 + i*0.6)));
    }
    sinCurvas.push(Kit.curve(pts));
    const g = Kit.taper(pts, 0.032, 0.026, { seg:12, rad:6 });
    const col = new Float32Array(g.attributes.position.count*3);
    for (let q=0;q<g.attributes.position.count;q++){
      const d = Math.hypot(g.attributes.position.getX(q)-LC.x, g.attributes.position.getY(q)-LC.y);
      const t = 1 - Math.min(1, Math.max(0, (d-0.16)/0.76));           // 0 en la periferia, 1 en el centro
      col[q*3]   = 0.42*Math.pow(0.90 - 0.62*t, 2.2);
      col[q*3+1] = 0.42*Math.pow(0.20 + 0.08*t, 2.2);
      col[q*3+2] = 0.42*Math.pow(0.16 + 0.62*t, 2.2);
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    sinG.push(g);
    if (i % 3 === 0){                                                   // células de Kupffer sobre la pared del sinusoide
      const r = 0.45 + 0.30*RH();
      const kg = new THREE.SphereGeometry(0.066, low?6:9, low?5:7);
      kg.translate(LC.x + ux*r + uy*0.075, LC.y + uy*r - ux*0.075, LC.z + 0.17);
      kupG.push(kg);
    }
  }
  const sinMesh = new THREE.Mesh(Kit.merge(sinG), Kit.tissue({ vc:true, rough:0.34, coat:0.65 })); sinMesh.userData.sub = 'sinusoides';
  const kupMesh = new THREE.Mesh(Kit.merge(kupG), Kit.tissue({ color:0x3A0C5E, rough:0.42, coat:0.5 })); kupMesh.userData.sub = 'kupffer';
  addH('sinusoides', [sinMesh, kupMesh], { explodeDir:new THREE.Vector3(-0.9,-0.2,0.4).normalize() });

  /* tríadas portales en los seis vértices */
  const triP = [], triA = [], triB = [];
  for (let k=0;k<6;k++){
    const a = k*Math.PI/3;
    const ux = Math.cos(a), uy = Math.sin(a);
    const tx = -uy, ty = ux;
    const eje = (ox, oy, rad, arr) => arr.push(Kit.taper([
      [LC.x + ux*RL + tx*ox - ux*oy, LC.y + uy*RL + ty*ox - uy*oy, LC.z - HZ - 0.06],
      [LC.x + ux*RL + tx*ox - ux*oy, LC.y + uy*RL + ty*ox - uy*oy, LC.z + HZ + 0.06]], rad, rad, { seg:3, rad:8 }));
    eje(0, 0.02, 0.072, triP);      // rama de la vena porta
    eje(0.135, 0.10, 0.038, triA);  // rama de la arteria hepática
    eje(-0.135, 0.10, 0.033, triB); // conductillo biliar
  }
  const tp = new THREE.Mesh(Kit.merge(triP), Kit.tissue({ color:0x14307E, rough:0.4, coat:0.5 })); tp.userData.sub = 'porta';
  const ta = new THREE.Mesh(Kit.merge(triA), Kit.tissue({ color:0x6E100D, rough:0.4, coat:0.5 })); ta.userData.sub = 'arteria';
  const tb = new THREE.Mesh(Kit.merge(triB), Kit.tissue({ color:0x6E560F, rough:0.44, coat:0.45 })); tb.userData.sub = 'conductillo';
  addH('triada-portal', [tp, ta, tb], { explodeDir:new THREE.Vector3(-0.6,-0.8,0.3).normalize() });

  /* vena centrolobulillar */
  const vcl = new THREE.Mesh(Kit.taper([[LC.x,LC.y,LC.z-HZ-0.14],[LC.x,LC.y,LC.z+HZ+0.16]], 0.155, 0.155, { seg:4, rad:16 }),
    Kit.tissue({ color:0x0D1748, rough:0.42, coat:0.45 }));
  vcl.userData.sub = 'central';
  addH('vena-centrolobulillar', [vcl], { explodeDir:new THREE.Vector3(-0.5,-0.3,1).normalize() });

  /* =====================================================================
     9. ANIMACIONES
     ===================================================================== */
  const mkParts = (n, curva, mat, grupo, tipo) => {
    const g = new THREE.SphereGeometry(0.07, 8, 6);
    for (let i=0;i<n;i++){ const m = new THREE.Mesh(g, mat); m.visible = false; m.userData = { curva, off:i/n, tipo }; E.scene.add(m); grupo.push(m); }
  };
  const mkMini = (n, curva, mat, grupo, tipo) => {
    const g = new THREE.SphereGeometry(0.042, 7, 6);
    for (let i=0;i<n;i++){ const m = new THREE.Mesh(g, mat); m.visible = false; m.userData = { curva, off:i/n, tipo }; E.scene.add(m); grupo.push(m); }
  };
  const matPorta = new THREE.MeshBasicMaterial({ color:0x5B86F0, toneMapped:false });
  const matArt   = new THREE.MeshBasicMaterial({ color:0xFF5A4E, toneMapped:false });
  const matSal   = new THREE.MeshBasicMaterial({ color:0x8E7FD8, toneMapped:false });
  const matBilis = new THREE.MeshBasicMaterial({ color:0xC8C63A, toneMapped:false });

  const flujo = { on:false, speed:1, t:0, parts:[] };
  mkParts(7, Kit.curve([[-0.35,-2.85,0.10],[0.05,-2.20,-0.05],[0.15,-1.85,-0.20],[-0.02,-1.30,-0.22], HIL, [-0.95,-0.52,-0.22],[-1.75,-0.30,-0.15],[-2.30,-0.10,0.00]]), matPorta, flujo.parts, 'porta');
  mkParts(5, Kit.curve([[1.05,-2.70,-0.10],[0.55,-2.25,-0.16],[0.15,-1.85,-0.20], HIL, [0.35,-0.55,-0.15],[1.10,-0.38,-0.10],[1.65,-0.22,0.05]]), matPorta, flujo.parts, 'porta');
  mkParts(5, Kit.curve([[1.55,-2.55,-0.60],[0.85,-1.95,-0.55],[0.25,-1.25,-0.45],[-0.22,-0.80,-0.34],[-0.95,-0.66,-0.30],[-1.70,-0.44,-0.24]]), matArt, flujo.parts, 'arteria');
  mkParts(5, Kit.curve([[-2.05,-0.15,-0.20],[-1.30,0.45,-0.50],[-0.55,0.85,-0.70],[-0.28,1.05,-0.74],[-0.28,2.05,-0.72]]), matSal, flujo.parts, 'salida');
  mkParts(5, Kit.curve([[1.55,-0.10,-0.10],[0.85,0.45,-0.45],[-0.10,0.80,-0.70],[-0.28,1.15,-0.74],[-0.28,2.05,-0.72]]), matSal, flujo.parts, 'salida');
  sinCurvas.forEach((c, i) => { if (i % (low?3:2) === 0) mkMini(3, c, i%2 ? matPorta : matArt, flujo.parts, 'sinusoide'); });

  const bilis = { on:false, t:0, parts:[] };
  for (let i=0;i<NC;i+=(low?3:2)){
    const a = (i + 0.5) * 2*Math.PI/NC, ux = Math.cos(a), uy = Math.sin(a);
    const kk = Math.round(a/(Math.PI/3)) % 6, ang = kk*Math.PI/3;
    mkMini(2, Kit.curve([
      new THREE.Vector3(LC.x + ux*0.22, LC.y + uy*0.22, LC.z + 0.05),
      new THREE.Vector3(LC.x + ux*0.58, LC.y + uy*0.58, LC.z + 0.05),
      new THREE.Vector3(LC.x + Math.cos(ang)*(RL-0.20) - Math.sin(ang)*0.135, LC.y + Math.sin(ang)*(RL-0.20) + Math.cos(ang)*0.135, LC.z + 0.05),
      new THREE.Vector3(LC.x + Math.cos(ang)*RL - Math.sin(ang)*0.135, LC.y + Math.sin(ang)*RL + Math.cos(ang)*0.135, LC.z + 0.05)
    ]), matBilis, bilis.parts, 'canaliculo');
  }
  mkParts(5, Kit.curve([[-1.70,-0.62,0.10],[-1.00,-0.82,0.05], CONF, [-0.62,-1.15,0.18],[-0.85,-1.30,0.40]]), matBilis, bilis.parts, 'vesicula');
  mkParts(6, Kit.curve([[1.05,-0.70,0.12],[0.25,-0.86,0.06], CONF, [-0.28,-1.45,0.00],[-0.10,-2.10,-0.05],[0.05,-2.80,-0.05]]), matBilis, bilis.parts, 'coledoco');

  const setGrupo = (grupo, on) => grupo.parts.forEach(p => { p.visible = on; });

  const model = {
    anims:[
      { id:'flujo', label:'Doble aporte sanguíneo y primer paso hepático',
        get on(){ return flujo.on; },
        set(on){ flujo.on = on; flujo.t = 0; setGrupo(flujo, on); },
        needsOpacity:0.45 },
      { id:'bilis', label:'Producción y flujo de bilis (sentido contrario a la sangre)',
        get on(){ return bilis.on; },
        set(on){ bilis.on = on; bilis.t = 0; setGrupo(bilis, on); if (on) E.focus(LC.clone().lerp(new THREE.Vector3(-1.0,-1.1,0.3), 0.55), 12); },
        needsOpacity:0.45, focus:true }
    ],
    setSpeed(k){ flujo.speed = k; },
    phaseText(){
      if (!flujo.on && !bilis.on) return '';
      if (bilis.on && !flujo.on) return 'La bilis nace entre los hepatocitos, sale del lobulillo por los conductillos de las tríadas y baja por el colédoco al duodeno: viaja en sentido contrario a la sangre';
      const p = flujo.t % 1;
      const s = p < 0.34 ? 'Entrada · la vena porta trae el 75 % del flujo con los nutrientes absorbidos en el intestino; la arteria hepática trae el 25 % restante con el oxígeno'
        : p < 0.68 ? 'Mezcla · las dos sangres se juntan en los sinusoides del lobulillo y bañan a los hepatocitos: aquí ocurre el primer paso hepático'
        : 'Salida · la sangre llega a la vena centrolobulillar, se reúne en las venas suprahepáticas y sale a la vena cava inferior, rumbo al corazón';
      return bilis.on ? s + ' · en amarillo, la bilis va en sentido contrario' : s;
    },
    legend:[
      {color:'#5B86F0', txt:'Sangre de la vena porta: pobre en oxígeno, rica en nutrientes'},
      {color:'#FF5A4E', txt:'Sangre de la arteria hepática: rica en oxígeno'},
      {color:'#8E7FD8', txt:'Salida por las venas suprahepáticas hacia la vena cava inferior'},
      {color:'#C8C63A', txt:'Bilis: del centro del lobulillo hacia las tríadas y el duodeno'}
    ],
    observa:'las dos entradas de sangre se juntan en los sinusoides y solo hay una salida. En la lupa, el color de los sinusoides pasa de rojo en la periferia a azulado en el centro: los hepatocitos que rodean la vena centrolobulillar trabajan con el oxígeno que sobra, y por eso son los primeros en dañarse. La bilis recorre el lobulillo en dirección contraria y nunca se mezcla con la sangre.'
  };

  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (flujo.on){
      flujo.t += dt*0.11*flujo.speed;
      flujo.parts.forEach(m => {
        const k = ((flujo.t*(m.userData.tipo === 'sinusoide' ? 1.8 : 1) + m.userData.off) % 1 + 1) % 1;
        m.position.copy(m.userData.curva.getPointAt(k));
        if (m.userData.tipo === 'sinusoide') m.material = k > 0.62 ? matSal : (m.userData.off < 0.5 ? matPorta : matArt);
      });
    }
    if (bilis.on){
      bilis.t += dt*0.10*flujo.speed;
      bilis.parts.forEach(m => {
        const k = ((bilis.t + m.userData.off) % 1 + 1) % 1;
        m.position.copy(m.userData.curva.getPointAt(k));
        m.scale.setScalar(0.7 + 0.5*Math.sin(k*Math.PI));
      });
    }
  });

  return model;
}

BIO.organs.higado = BIO.liver;
BIO.builders.higado = buildLiver;

route('/explorar/higado', (view, q) => {
  return organView(view, q, BIO.liver, buildLiver);
});
/* Los enlaces antiguos al marcador "en construcción" llevan al modelo real */
route('/explorar/organo/higado', () => navigate('#/explorar/higado'));
</script>
