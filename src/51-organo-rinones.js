<script>
/* =====================================================================
   ÓRGANO: RIÑONES Y VÍA URINARIA — datos + modelo 3D procedimental
   Contrato: AGENTS-API.md + AGENTS-ORGANOS.md (modelo canónico: BIO.lungs)
   ===================================================================== */
BIO.kidney = {
  reto:{
    proposito:"Explicar cómo el riñón filtra unos 180 litros de plasma al día y, aun así, solo produce alrededor de 1,5 litros de orina.",
    pista:"Pista: sigue el filtrado desde el glomérulo y fíjate en qué se devuelve a la sangre en cada tramo.",
    observa:[
      {id:"corpusculo", txt:"Observa dónde se filtra la sangre: el glomérulo dentro de la cápsula de Bowman."},
      {id:"tcp", txt:"Mira qué recupera el túbulo proximal: allí vuelve a la sangre la mayor parte del agua y toda la glucosa."},
      {id:"asa-henle", txt:"Sigue el asa de Henle y cómo crea una médula cada vez más salada."},
      {id:"colector", txt:"Termina en el túbulo colector, donde la hormona ADH decide cuánta agua más se recupera."}
    ],
    pregunta:{
      q:"En un día caluroso de trabajo en la costa casi no tomas agua. ¿Qué hacen tus riñones?",
      ops:[
        "Filtran menos sangre para ahorrar agua, y por eso orinas menos.",
        "Siguen filtrando; la ADH vuelve más permeable el túbulo colector, se reabsorbe más agua y la orina sale escasa y concentrada.",
        "Dejan de reabsorber sal para que el agua se quede en el cuerpo."
      ],
      ok:1,
      fb:"Correcto: la filtración casi no cambia. Lo que se ajusta es la reabsorción final: con deshidratación la hipófisis libera ADH, el colector deja pasar más agua hacia la médula salada y la orina se concentra.",
      wrong:[
        "Es una idea razonable, pero la filtración glomerular se mantiene bastante constante. El ahorro de agua ocurre después, en la reabsorción del túbulo colector bajo el efecto de la ADH.",
        "Es al revés: la sal que se reabsorbe mantiene la médula concentrada, y esa concentración es la que atrae el agua de vuelta. Perder más sal haría perder más agua."
      ]
    }
  },
  capasHint: "Sugerencia: oculta la cápsula y baja la transparencia del parénquima para ver las pirámides y los cálices, y quédate solo con la capa de la nefrona para estudiarla ampliada.",
  id:"rinones", nombre:"Riñones y vía urinaria", unidad:6, dominio:"anat", eyebrow:"Atlas 3D · Unidad 6 · Sistema urinario", em:"🫘",
  intro:"Corta el riñón con la transparencia, encuentra las pirámides y los cálices, y sigue una gota de filtrado por la nefrona ampliada en la lupa: filtración, reabsorción y secreción, paso a paso.",
  nota:"Modelo tridimensional simplificado con fines educativos. Se representa un solo riñón (el izquierdo) con su vía urinaria: en el cuerpo hay dos. La nefrona de la lupa está ampliada unas 2.000 veces y es una sola: cada riñón tiene alrededor de un millón. El número de pirámides (7 en el modelo) y la forma de los cálices varían de una persona a otra.",
  focusR:8, radius:14, target:[0.55,-0.10,0], phi:1.42, theta:0.30, floor:-3.9, floorSize:13,
  capas:[{id:"cubierta",n:"Cápsula renal"},{id:"parenquima",n:"Parénquima: corteza y médula"},{id:"via-urinaria",n:"Vía urinaria: cálices, pelvis, uréter y vejiga"},{id:"vasos",n:"Vasos renales"},{id:"nefrona",n:"Nefrona ampliada (lupa)"}],
  opacityCapas:["cubierta","parenquima"], opacityLabel:"Transparencia de la cápsula y la corteza", opacityDefault:0.85,
  activity:"explorar-rinones", guidedActivity:"guiada-rinones", badge:"anatomista", seenThreshold:7,
  related:[{t:"Misión: el viaje de un glóbulo rojo",href:"#/mision/globulo-rojo"},{t:"Simulador cardiorrespiratorio",href:"#/simuladores/circulacion"},{t:"Explorar los pulmones",href:"#/explorar/pulmones"}],
  structures:[
    /* ------------------------------ MACRO ------------------------------ */
    {id:"capsula", nombre:"Cápsula renal", capa:"cubierta", color:"#C7D8E3", pos:[-1.9,1.05,0], lbl:[-4.34,1.57,0.67],
      n1:"Envoltura fibrosa, fina y resistente que recubre la superficie del riñón y lo protege.",
      n2:"Es una capa de tejido conjuntivo denso, casi inextensible, que se desliza sobre el riñón y lo mantiene con su forma de habichuela. Por fuera de ella hay grasa perirrenal y la fascia renal, que amortiguan los golpes y sujetan el riñón contra la pared posterior del abdomen.",
      n3:"Que la cápsula casi no se estire explica un dato clínico: cuando el riñón se inflama de golpe (pielonefritis, obstrucción del uréter) la cápsula se tensa y aparece dolor intenso en la fosa lumbar; en cambio, una enfermedad renal crónica que avanza durante años no duele, porque el órgano se daña sin que la cápsula se distienda bruscamente. Por eso la enfermedad renal crónica se descubre casi siempre por análisis de sangre y orina, no por dolor.",
      dato:"El riñón adulto mide 11–12 cm y pesa unos 150 g: cabe en la palma de la mano.", conecta:["corteza","vasos-renales"], temas:["Anatomía","Protección de órganos","Salud renal"],
      quiz:{q:"¿Por qué una enfermedad renal crónica suele avanzar sin dolor?", ops:["Porque el riñón no tiene nervios","Porque la cápsula se distiende poco a poco y no se tensa de golpe","Porque el riñón deja de funcionar enseguida"], ok:1, fb:"El dolor renal aparece sobre todo cuando la cápsula se tensa rápido; un daño lento no la tensa y solo lo delatan los análisis.", wrong:["El riñón y su cápsula sí tienen inervación: una obstrucción aguda duele muchísimo.","Ocurre lo contrario: el riñón compensa durante años y la función baja despacio."]},
      partes:[{n:"Cápsula fibrosa", d:"Lámina de tejido conjuntivo que se desliza sobre la superficie renal.", at:[-2.6,1.9,0.5], sub:"capsula"}]},

    {id:"corteza", nombre:"Corteza renal y columnas", capa:"parenquima", color:"#A8574C", pos:[-2.5,1.35,0.4], lbl:[-4.66,2.38,0.9],
      n1:"Capa externa del riñón, de 1 cm de espesor, donde están los corpúsculos renales y los túbulos contorneados.",
      n2:"Tiene aspecto granuloso porque está llena de glomérulos. Entre pirámide y pirámide se mete hacia dentro formando las columnas renales (columnas de Bertin), que llevan los vasos hasta el interior del órgano. En la corteza ocurre la filtración y casi toda la reabsorción de glucosa, aminoácidos y bicarbonato.",
      n3:"Las células intersticiales de la corteza renal son las que fabrican la eritropoyetina (EPO) cuando detectan poco oxígeno: el riñón funciona como sensor de oxígeno del cuerpo. Vivir en Quito (2.850 m) mantiene ese estímulo de forma permanente, por eso a esa altitud los valores normales de hemoglobina son más altos que a nivel del mar y el laboratorio los interpreta con tablas corregidas por altitud.",
      dato:"Los riñones reciben el 20–25 % de la sangre que bombea el corazón: ~1,2 litros por minuto, pesando solo el 0,5 % del cuerpo.", conecta:["capsula","medula","corpusculo","tcp"], temas:["Filtración","Eritropoyetina","Altitud","Homeostasis"],
      quiz:{q:"¿Qué hormona fabrica el riñón cuando detecta poco oxígeno en la sangre?", ops:["Insulina","Eritropoyetina (EPO), que estimula la médula ósea","Adrenalina"], ok:1, fb:"La EPO ordena a la médula ósea producir más glóbulos rojos; en altura ese estímulo es constante.", wrong:["La insulina la produce el páncreas y regula la glucosa, no el oxígeno.","La adrenalina la produce la glándula suprarrenal (que se apoya sobre el riñón, pero no es riñón) y actúa en segundos, no sobre los glóbulos rojos."]},
      partes:[{n:"Corteza", d:"Zona granulosa externa: aquí están los glomérulos.", at:[-2.6,1.9,0.5], sub:"corteza"},
              {n:"Columna renal", d:"Prolongación de corteza que separa dos pirámides y da paso a los vasos.", at:[-1.55,1.95,0.25], sub:"corteza"}]},

    {id:"medula", nombre:"Médula renal: pirámides", capa:"parenquima", color:"#D3968D", interno:true, pos:[-2.0,0.95,0.15], lbl:[-4.77,1.03,1],
      n1:"Zona interna formada por unas 7 a 18 pirámides renales con aspecto estriado, cuyas puntas apuntan al centro del riñón.",
      n2:"Las estrías son las asas de Henle y los túbulos colectores, todos paralelos y orientados hacia la punta de la pirámide, o papila renal. Esa disposición ordenada es la que permite mantener el intersticio cada vez más salado a medida que se baja hacia la papila.",
      n3:"La médula trabaja con muy poco oxígeno: recibe poca sangre (para no lavar el gradiente salino) y a la vez gasta muchísimo ATP bombeando sodio en la rama ascendente. Vive al límite, y por eso es la primera zona que se daña cuando baja la presión, hay deshidratación intensa o se usan medicamentos nefrotóxicos como los antiinflamatorios en exceso.",
      dato:"El intersticio de la médula llega a 1.200 mOsm/kg, cuatro veces la concentración del plasma (300 mOsm/kg).", conecta:["corteza","via-excretora","asa-henle","colector"], temas:["Contracorriente","Concentración de la orina","Osmosis"],
      quiz:{q:"¿Por qué las pirámides renales se ven estriadas?", ops:["Por los vasos sanguíneos, que son rectos","Porque las asas de Henle y los túbulos colectores corren paralelos hacia la papila","Porque están formadas por músculo estriado"], ok:1, fb:"Es la alineación de millones de túbulos rectos la que produce el rayado.", wrong:["Los vasos rectos también son rectos y ayudan, pero la estriación la marcan sobre todo los túbulos.","No hay músculo estriado en el riñón: ese tejido es el de los músculos esqueléticos."]},
      partes:[{n:"Pirámide renal", d:"Cono de túbulos paralelos; su base mira a la corteza.", at:[-2.25,1.45,0.35], sub:"piramide"},
              {n:"Papila renal", d:"Punta de la pirámide: por sus poros sale la orina al cáliz menor.", at:[-1.45,0.95,0.15], sub:"papila"}]},

    {id:"via-excretora", nombre:"Cálices y pelvis renal", capa:"via-urinaria", color:"#E5D3A0", interno:true, pos:[-1.2,0.95,0], lbl:[-4.65,0.57,1.13],
      n1:"Embudos que recogen la orina que sale por las papilas y la reúnen en la pelvis renal, antes del uréter.",
      n2:"Cada papila se abre en un cáliz menor; dos o tres cálices menores se unen en un cáliz mayor, y los cálices mayores desembocan en la pelvis renal, una cavidad con forma de embudo aplanado. Sus paredes tienen músculo liso y epitelio de transición (urotelio), que soporta el contacto con la orina y se estira sin romperse.",
      n3:"A partir de la papila la orina ya no cambia de composición: todo lo que había que ajustar se ajustó en el túbulo. Los cálices y la pelvis son el punto donde suelen quedar atrapados los cálculos renales; cuando un cálculo pasa al uréter y lo obstruye, la pelvis se dilata (hidronefrosis) y aparece el cólico renal, uno de los dolores más intensos que se conocen.",
      dato:"Desde la papila hasta la vejiga la orina ya no se modifica: es un simple sistema de transporte.", conecta:["medula","ureter","colector"], temas:["Vía urinaria","Cálculos renales","Urotelio"],
      quiz:{q:"¿En qué punto la composición de la orina deja de cambiar?", ops:["En la vejiga, justo antes de orinar","Al salir por la papila renal hacia el cáliz menor","En el uréter, por la peristalsis"], ok:1, fb:"Toda la regulación ocurre en la nefrona; cálices, pelvis, uréter y vejiga solo conducen y almacenan.", wrong:["La vejiga almacena, pero su urotelio prácticamente no reabsorbe ni secreta.","El uréter empuja la orina con ondas musculares, pero no cambia su composición."]},
      partes:[{n:"Cáliz menor", d:"Copa que abraza una papila y recoge su orina.", at:[-1.45,0.95,0.15], sub:"menor"},
              {n:"Cáliz mayor", d:"Une dos o tres cálices menores.", at:[-1.28,1.05,0], sub:"mayor"},
              {n:"Pelvis renal", d:"Embudo final, ya dentro del seno renal; continúa en el uréter.", at:[-1.05,0.85,0], sub:"pelvis"}]},

    {id:"vasos-renales", nombre:"Arteria y vena renales", capa:"vasos", color:"#B03A33", pos:[-0.4,1.15,0], lbl:[-2.65,3.27,0.36],
      n1:"La arteria renal trae sangre desde la aorta y la vena renal la devuelve a la vena cava inferior, ambas por el hilio.",
      n2:"Dentro del riñón la arteria se divide hasta formar las arteriolas aferentes, que entran en cada glomérulo. La sangre sale del glomérulo por una arteriola eferente (¡otra arteriola, no una vena!) y recorre después los capilares peritubulares antes de reunirse en la vena renal. Esa doble red capilar en serie es exclusiva del riñón.",
      n3:"Que la salida del glomérulo sea una arteriola y no una vena es la clave de la filtración: al estrecharse o dilatarse, el riñón regula la presión dentro del ovillo y mantiene el filtrado estable aunque la presión arterial general suba o baje (autorregulación entre 80 y 180 mmHg de presión sistólica). La angiotensina II contrae sobre todo la arteriola eferente, y por eso sostiene el filtrado cuando falta volumen.",
      dato:"Toda la sangre del cuerpo pasa por los riñones unas 300 veces al día.", conecta:["capsula","corteza","corpusculo","peritubulares"], temas:["Circulación","Presión arterial","Autorregulación"],
      quiz:{q:"¿Qué sale del glomérulo llevando la sangre que no se filtró?", ops:["Una vénula","Una arteriola eferente","Un capilar linfático"], ok:1, fb:"Es la única vez en el cuerpo en que una red capilar queda entre dos arteriolas: así se controla la presión de filtración.", wrong:["Lo esperable sería una vénula, y por eso este caso es tan especial: aquí sale otra arteriola.","Los vasos linfáticos recogen líquido intersticial; no reciben la sangre del glomérulo."]},
      partes:[{n:"Arteria renal", d:"Rama de la aorta abdominal; entra por el hilio.", at:[-0.45,1.25,-0.12], sub:"arteria"},
              {n:"Vena renal", d:"Desemboca en la vena cava inferior.", at:[-0.3,0.98,0.18], sub:"vena"}]},

    {id:"ureter", nombre:"Uréter", capa:"via-urinaria", color:"#E0C795", pos:[-0.55,-0.7,0.1], lbl:[-2.00,-1.55,0.50],
      n1:"Tubo muscular de 25 a 30 cm que lleva la orina desde la pelvis renal hasta la vejiga.",
      n2:"No funciona por gravedad: su capa de músculo liso genera ondas peristálticas cada 10 a 20 segundos que empujan la orina hacia abajo. Por eso se puede orinar acostado o boca abajo. Entra en la vejiga atravesando su pared en diagonal, y ese trayecto oblicuo actúa como válvula: cuando la vejiga se llena, comprime el uréter e impide que la orina regrese al riñón.",
      n3:"El uréter tiene tres estrechamientos naturales (salida de la pelvis, cruce de los vasos ilíacos y entrada en la vejiga): ahí se atascan los cálculos. Si la válvula oblicua falla, hay reflujo vesicoureteral y las infecciones urinarias suben al riñón. Beber suficiente agua diluye la orina y reduce la formación de cálculos: en climas cálidos como la costa ecuatoriana, donde se suda mucho, esa recomendación es especialmente importante.",
      dato:"La orina sube en contra de la gravedad si hace falta: el uréter la bombea con ondas musculares.", conecta:["via-excretora","vejiga"], temas:["Peristalsis","Músculo liso","Cálculos renales"],
      quiz:{q:"¿Cómo llega la orina del riñón a la vejiga?", ops:["Por gravedad, cayendo por el tubo","Por ondas peristálticas del músculo liso del uréter","Empujada por la presión de la sangre"], ok:1, fb:"Es un bombeo muscular: funciona igual estando de pie o acostado.", wrong:["Si fuera solo gravedad, no se podría orinar acostado ni en ingravidez.","La presión sanguínea empuja la filtración en el glomérulo, no el transporte por el uréter."]}},

    {id:"vejiga", nombre:"Vejiga urinaria", capa:"via-urinaria", color:"#DFAE8C", pos:[0.05,-2.6,0], lbl:[-1.34,-3.87,0.63],
      n1:"Bolsa muscular que almacena la orina hasta el momento de orinar; en el adulto guarda de 400 a 500 mL.",
      n2:"Su pared es el músculo detrusor, y su interior está plegado en arrugas que desaparecen al llenarse. Los dos uréteres y la uretra delimitan el trígono vesical, la única zona que no se pliega. La sensación de ganas de orinar aparece hacia los 250–300 mL, cuando los receptores de estiramiento avisan a la médula sacra.",
      n3:"La micción es un reflejo medular (S2–S4) que el encéfalo aprende a frenar: por eso el control voluntario se adquiere con la edad. El esfínter interno es liso e involuntario; el externo, estriado y voluntario. La uretra femenina mide unos 4 cm y la masculina unos 20 cm, y esa diferencia anatómica explica que las infecciones urinarias sean mucho más frecuentes en mujeres.",
      dato:"La vejiga llena puede alcanzar el tamaño de una toronja y volver luego al de una ciruela.", conecta:["ureter"], temas:["Almacenamiento","Reflejos","Control voluntario","Salud"],
      quiz:{q:"¿Qué ocurre hacia los 250–300 mL de orina en la vejiga?", ops:["La vejiga se vacía automáticamente","Los receptores de estiramiento producen el deseo de orinar, que se puede contener","Los uréteres dejan de traer orina"], ok:1, fb:"El reflejo se dispara, pero el esfínter externo voluntario permite retrasar la micción.", wrong:["El vaciado automático ocurre en los bebés, antes de aprender a inhibir el reflejo.","Los riñones siguen produciendo orina sin parar: por eso la vejiga se sigue llenando."]},
      partes:[{n:"Músculo detrusor", d:"Capa muscular que se contrae para vaciar la vejiga.", at:[0.05,-2.6,0.7], sub:"detrusor"},
              {n:"Uretra", d:"Conducto de salida, con esfínter interno involuntario y externo voluntario.", at:[0.05,-3.5,0], sub:"uretra"}]},

    /* ------------------------- LUPA: LA NEFRONA ------------------------- */
    {id:"corpusculo", nombre:"Corpúsculo renal", capa:"nefrona", color:"#C9564E", pos:[1.80,1.75,0.25], lbl:[4.78,2.51,-0.79],
      n1:"Filtro de la nefrona: un ovillo de capilares (glomérulo) metido dentro de una copa doble (cápsula de Bowman).",
      n2:"La sangre entra por la arteriola aferente, que es más ancha que la eferente de salida: esa diferencia mantiene dentro del ovillo una presión alta (unos 55 mmHg) que empuja el plasma a través de la pared. La barrera tiene tres capas —endotelio con poros, membrana basal y los pedicelos de los podocitos— y deja pasar agua, sales, glucosa, aminoácidos y urea, pero retiene células y proteínas.",
      n3:"La presión de filtración neta es solo de unos 10 mmHg: los 55 mmHg que empujan menos los 30 mmHg de presión oncótica de las proteínas de la sangre y los 15 mmHg del líquido ya filtrado. Con ese margen tan pequeño, los dos riñones producen 125 mL de filtrado por minuto, es decir unos 180 litros al día. Cuando la barrera se daña (diabetes, hipertensión), pasan proteínas a la orina: la albuminuria es el primer aviso de enfermedad renal y se busca con un examen sencillo de orina.",
      dato:"Se filtran ~180 litros de plasma al día y se excretan ~1,5: más del 99 % vuelve a la sangre.", conecta:["tcp","yuxtaglomerular","vasos-renales","peritubulares"], temas:["Filtración","Presión","Diabetes","Salud renal"],
      quiz:{q:"Si aparece albúmina (una proteína) en la orina, lo más probable es que…", ops:["se esté bebiendo poca agua","la barrera de filtración del glomérulo esté dañada","el uréter esté obstruido"], ok:1, fb:"Un glomérulo sano retiene las proteínas: la albuminuria señala daño en la barrera, típico de diabetes e hipertensión mal controladas.", wrong:["Beber poca agua concentra la orina y la vuelve más oscura, pero no hace pasar proteínas.","Una obstrucción del uréter causa dolor y dilatación, no paso de proteínas por el filtro."]},
      partes:[{n:"Glomérulo", d:"Ovillo de unos 30 capilares donde se filtra el plasma.", at:[1.80,1.75,0.25], sub:"glomerulo"},
              {n:"Cápsula de Bowman", d:"Copa doble que recoge el filtrado; su hoja interna son los podocitos.", at:[1.80,1.75,0.25], sub:"bowman"},
              {n:"Arteriola aferente", d:"Entrada, más ancha: mantiene alta la presión dentro del ovillo.", at:[1.20,1.90,0.20], sub:"aferente"},
              {n:"Arteriola eferente", d:"Salida, más estrecha; continúa en los capilares peritubulares.", at:[2.00,1.45,0.30], sub:"eferente"}]},

    {id:"tcp", nombre:"Túbulo contorneado proximal", capa:"nefrona", color:"#E2A15C", pos:[2.40,1.30,0.30], lbl:[5,-1.18,-0.11],
      n1:"Primer tramo del túbulo, muy enrollado y en la corteza: aquí se recupera la mayor parte de lo filtrado.",
      n2:"Reabsorbe el 100 % de la glucosa y de los aminoácidos, alrededor del 65 % del sodio y del agua, y casi todo el bicarbonato. Sus células tienen un borde en cepillo de microvellosidades que multiplica la superficie y están repletas de mitocondrias, porque el transporte de sodio contra gradiente consume mucho ATP. Además es el tramo que más secreta: pasa al túbulo H⁺, amoníaco, creatinina y muchos medicamentos.",
      n3:"La glucosa se reabsorbe por transportadores SGLT2 que tienen un límite: por encima de unos 180 mg/dL de glucosa en sangre se saturan y aparece glucosa en la orina. Ese es el origen del nombre 'diabetes mellitus' (orina dulce) y también la base de los fármacos que bloquean el SGLT2 para que el exceso de azúcar salga por la orina y proteger el riñón de las personas con diabetes.",
      dato:"El borde en cepillo de un solo riñón suma varios metros cuadrados de superficie de absorción.", conecta:["corpusculo","asa-henle","peritubulares"], temas:["Reabsorción","Secreción","Transporte activo","Diabetes"],
      quiz:{q:"¿Por qué aparece glucosa en la orina de una persona con diabetes mal controlada?", ops:["Porque el glomérulo no filtra glucosa","Porque los transportadores del túbulo proximal se saturan por encima de ~180 mg/dL","Porque la glucosa se fabrica en el riñón"], ok:1, fb:"La glucosa se filtra siempre; lo que falla es la capacidad de reabsorberla toda cuando hay demasiada.", wrong:["El glomérulo sí filtra glucosa: es una molécula pequeña que pasa sin problema.","El riñón puede producir algo de glucosa en ayuno prolongado, pero no es la causa de la glucosuria."]},
      partes:[{n:"Borde en cepillo", d:"Microvellosidades que multiplican la superficie de reabsorción.", at:[2.40,1.30,0.30], sub:"tcp"}]},

    {id:"asa-henle", nombre:"Asa de Henle", capa:"nefrona", color:"#7FB3D5", pos:[2.83,0.40,0.25], lbl:[5.19,-0.02,-0.38], anchor:[2.9,0.4,0.26],
      n1:"Horquilla que baja a la médula y vuelve a subir; es la que permite concentrar la orina.",
      n2:"La rama descendente deja salir agua pero no sales; la rama ascendente gruesa hace justo lo contrario: bombea Na⁺, K⁺ y Cl⁻ hacia el intersticio con el transportador NKCC2 y es impermeable al agua. Como la sal que sale arriba vuelve a concentrar el líquido que baja, el sistema se multiplica a sí mismo: es el multiplicador de contracorriente.",
      n3:"Paso a paso: la rama ascendente crea una diferencia pequeña, de unos 200 mOsm/kg, entre el túbulo y el intersticio; el flujo continuo arrastra esa diferencia hacia abajo y, al repetirse a lo largo del asa, la acumula hasta 1.200 mOsm/kg en la punta de la papila. Cuanto más larga el asa, más concentrada puede ser la orina: el ratón del desierto, con asas larguísimas, casi no necesita beber. Los diuréticos de asa (furosemida) bloquean el NKCC2 y por eso son los más potentes.",
      dato:"El filtrado sale del asa más diluido que cuando entró (~100 mOsm/kg), pero deja detrás un intersticio salado.", conecta:["tcp","tcd","medula","peritubulares"], temas:["Contracorriente","Osmosis","Concentración de la orina"],
      quiz:{q:"¿Qué hace la rama ascendente gruesa del asa de Henle?", ops:["Deja salir agua y retiene sales","Bombea sales hacia el intersticio sin dejar salir agua","Filtra la sangre por segunda vez"], ok:1, fb:"Por eso el líquido que sale del asa está diluido y la médula queda salada: ese gradiente es el que luego permite concentrar la orina.", wrong:["Eso es lo que hace la rama descendente: la ascendente es impermeable al agua.","La filtración ocurre solo en el glomérulo; en el asa hay transporte, no filtración."]},
      partes:[{n:"Rama descendente", d:"Fina y permeable al agua: el filtrado se concentra al bajar.", at:[2.70,0.25,0.27], sub:"descendente"},
              {n:"Codo del asa", d:"Punto más profundo, en plena médula, con ~1.200 mOsm/kg alrededor.", at:[2.83,-0.35,0.25], sub:"curva"},
              {n:"Rama ascendente gruesa", d:"Bombea Na⁺, K⁺ y Cl⁻; impermeable al agua.", at:[2.95,0.25,0.25], sub:"ascendente"}]},

    {id:"tcd", nombre:"Túbulo contorneado distal", capa:"nefrona", color:"#9B8FCB", pos:[2.60,1.63,0.17], lbl:[5.25,2.92,-0.85],
      n1:"Tramo enrollado que vuelve a la corteza y pasa rozando el glomérulo de su propia nefrona.",
      n2:"Aquí ya no se reabsorben grandes cantidades, sino que se hace el ajuste fino de la composición. Reabsorbe Na⁺ y Cl⁻ con el cotransportador NCC (el que bloquean los diuréticos tiazídicos, muy usados contra la hipertensión) y regula el calcio bajo el mando de la hormona paratiroidea. Es impermeable al agua en su primera porción.",
      n3:"En su porción final y en el túbulo colector, la aldosterona hace que las células reabsorban Na⁺ y secreten K⁺: el cuerpo retiene sal —y con ella agua— a cambio de perder potasio. Ese intercambio explica por qué algunos medicamentos para la presión alteran el potasio en sangre y por qué se controla con análisis. También aquí se secreta el exceso de K⁺ de una comida rica en frutas.",
      dato:"El túbulo distal decide, gota a gota, la composición final de la orina.", conecta:["asa-henle","colector","yuxtaglomerular"], temas:["Ajuste fino","Aldosterona","Potasio","Hipertensión"],
      quiz:{q:"La aldosterona actúa sobre el túbulo distal y colector haciendo que…", ops:["se pierda sodio y se retenga potasio","se reabsorba sodio (y agua) y se secrete potasio","se filtre más sangre en el glomérulo"], ok:1, fb:"Retener sodio retiene agua: así sube el volumen de sangre y la presión arterial.", wrong:["Es justo al revés: la aldosterona ahorra sodio y elimina potasio.","La aldosterona actúa sobre el túbulo, no sobre la barrera de filtración."]},
      partes:[{n:"Porción inicial", d:"Reabsorbe Na⁺ y Cl⁻ con el cotransportador NCC; impermeable al agua.", at:[2.90,1.25,0.25], sub:"tcd"},
              {n:"Túbulo conector", d:"Enlaza con el túbulo colector, ya sensible a la aldosterona.", at:[3.00,2.00,0.20], sub:"conector"}]},

    {id:"colector", nombre:"Túbulo colector", capa:"nefrona", color:"#6FB08F", pos:[3.45,0.55,0.20], lbl:[5.38,0.52,-0.39],
      n1:"Conducto común al que llegan varias nefronas; baja recto por la médula hasta la papila.",
      n2:"Es el último que toca la orina y donde se decide cuánta agua se pierde. Si hay hormona antidiurética (ADH o vasopresina), sus células colocan acuaporinas en la membrana y el agua sale hacia el intersticio salado de la médula: la orina se concentra y sale poca y oscura. Sin ADH, la pared queda impermeable y se elimina orina abundante y clara.",
      n3:"Sus células intercaladas son las encargadas del equilibrio ácido-base: secretan H⁺ contra gradiente y devuelven bicarbonato a la sangre, lo que permite eliminar los ~70 mEq de ácido que generan cada día las proteínas de la dieta. El pulmón corrige el pH en minutos soltando CO₂; el riñón tarda horas o días, pero es el único que puede eliminar ácidos fijos y fabricar bicarbonato nuevo. También recicla urea hacia la médula, lo que refuerza el gradiente.",
      dato:"Con ADH la orina llega a 1.200 mOsm/kg; sin ADH puede bajar a 50 mOsm/kg.", conecta:["tcd","medula","via-excretora"], temas:["ADH","Equilibrio ácido-base","Concentración de la orina","Homeostasis"],
      quiz:{q:"Tras una tarde de deporte sin beber agua, ¿qué pasa en el túbulo colector?", ops:["Se libera ADH, se abren acuaporinas y se reabsorbe agua: orina escasa y oscura","Se cierra el paso de agua y se orina más para ahorrar sal","El glomérulo deja de filtrar por completo"], ok:1, fb:"La ADH es la respuesta a la deshidratación: el color oscuro de la orina es una señal visible de que hace falta beber.", wrong:["Si se perdiera más agua estando deshidratado, el problema empeoraría: el cuerpo hace lo contrario.","El filtrado se mantiene gracias a la autorregulación; lo que cambia es cuánta agua se reabsorbe."]},
      partes:[{n:"Células principales", d:"Responden a la ADH y a la aldosterona: agua y sodio.", at:[3.45,0.85,0.20], sub:"colector"},
              {n:"Papila y poros", d:"Los conductos desembocan en la papila, dentro del cáliz menor.", at:[3.43,-0.60,0.20], sub:"papila"}]},

    {id:"yuxtaglomerular", nombre:"Aparato yuxtaglomerular", capa:"nefrona", color:"#D4A017", pos:[1.65,1.90,0.25], lbl:[2.20,3.02,0.10],
      n1:"Punto de contacto entre el túbulo distal y la arteriola aferente de la misma nefrona: el sensor de la presión.",
      n2:"Tiene dos piezas. La mácula densa, en la pared del túbulo, mide cuánto NaCl pasa; las células granulares, en la pared de la arteriola, fabrican y liberan renina. Si llega poco NaCl —señal de que la presión o el volumen han bajado—, se libera renina y además se dilata la arteriola aferente para recuperar el filtrado: es la retroalimentación tubuloglomerular.",
      n3:"La renina pone en marcha el sistema renina-angiotensina-aldosterona: convierte el angiotensinógeno del hígado en angiotensina I, la ECA del pulmón la transforma en angiotensina II, y esta contrae las arterias, ordena a la suprarrenal liberar aldosterona y estimula la sed y la ADH. Resultado: sube la presión arterial. Muchos medicamentos para la hipertensión (los 'pril' y los 'sartán') actúan justo sobre esta cadena, y también protegen el riñón de las personas con diabetes.",
      dato:"El riñón no solo obedece a la presión arterial: también la fija, con la renina.", conecta:["corpusculo","tcd","vasos-renales"], temas:["Presión arterial","Renina-angiotensina","Homeostasis","Hipertensión"],
      quiz:{q:"¿Qué detecta la mácula densa y qué provoca cuando llega poco NaCl?", ops:["Detecta oxígeno y libera eritropoyetina","Detecta NaCl y hace liberar renina, que acaba subiendo la presión","Detecta calcio y libera hormona paratiroidea"], ok:1, fb:"Poco NaCl se interpreta como poco volumen: la renina pone en marcha la cadena que sube la presión y retiene sal y agua.", wrong:["La EPO la producen células intersticiales de la corteza ante la falta de oxígeno, no la mácula densa.","La hormona paratiroidea la fabrican las glándulas paratiroides, en el cuello."]},
      partes:[{n:"Mácula densa", d:"Células del túbulo distal que miden el NaCl que pasa.", at:[1.65,1.93,0.25], sub:"macula"},
              {n:"Células granulares", d:"En la pared de la arteriola aferente: producen renina.", at:[1.50,1.85,0.22], sub:"granulares"}]},

    {id:"peritubulares", nombre:"Capilares peritubulares y vasos rectos", capa:"nefrona", color:"#C0607A", pos:[3.15,0.45,0.40], lbl:[3.56,-1.58,0.59], anchor:[2.85,0.44,0.49],
      n1:"Red de capilares que nace de la arteriola eferente y abraza los túbulos para recoger lo reabsorbido.",
      n2:"Todo lo que el túbulo devuelve —agua, glucosa, aminoácidos, sodio— pasa a esta sangre, que además entrega a las células el oxígeno y el ATP que necesitan para bombear. En la médula estos capilares se alargan en horquilla formando los vasos rectos, paralelos al asa de Henle.",
      n3:"Los vasos rectos funcionan como intercambiador de contracorriente: al bajar pierden agua y ganan sales, y al subir hacen lo contrario, de modo que se llevan el agua reabsorbida sin lavar la sal del intersticio. Sin ese truco, la sangre disolvería en pocos minutos el gradiente que tanto cuesta construir y sería imposible concentrar la orina.",
      dato:"El riñón tiene dos redes capilares seguidas: primero filtra y después recupera.", conecta:["corpusculo","tcp","asa-henle","vasos-renales"], temas:["Reabsorción","Contracorriente","Circulación renal"],
      quiz:{q:"¿Por qué los vasos rectos no arrastran la sal de la médula?", ops:["Porque la sangre circula muy rápido por ellos","Porque bajan y suben en horquilla e intercambian en contracorriente","Porque sus paredes son impermeables"], ok:1, fb:"Lo que pierden al bajar lo recuperan al subir: se llevan agua, pero dejan la sal donde estaba.", wrong:["Al contrario: circulan lentamente, y eso también ayuda a preservar el gradiente.","Si fueran impermeables no podrían recoger el agua reabsorbida, que es su función."]},
      partes:[{n:"Capilares peritubulares", d:"Rodean los túbulos de la corteza y recogen lo reabsorbido.", at:[2.55,1.40,0.45], sub:"peritubulares"},
              {n:"Vasos rectos", d:"Horquillas vasculares de la médula: intercambiador de contracorriente.", at:[3.10,0.05,0.35], sub:"rectos"}]}
  ],
  guiada:[
    {tipo:"select", target:"corpusculo", txt:"En la lupa de la derecha, selecciona la estructura donde <b>se filtra la sangre</b>: un ovillo de capilares dentro de una copa."},
    {tipo:"anim", target:"filtrado", txt:"Activa <b>Sigue una gota de filtrado</b> (Animación) y lee abajo, en la barra de fase, qué ocurre en cada segmento del túbulo."},
    {tipo:"select", target:"tcp", txt:"Selecciona el tramo donde se recupera <b>toda la glucosa</b> y cerca del 65 % del agua y del sodio."},
    {tipo:"anim", target:"contracorriente", txt:"Activa el <b>multiplicador de contracorriente</b> y observa qué sale de la rama descendente y qué sale de la ascendente."},
    {tipo:"select", target:"asa-henle", txt:"Selecciona la estructura con forma de horquilla que hace salada la médula y permite concentrar la orina."},
    {tipo:"select", target:"yuxtaglomerular", txt:"Selecciona el sensor que mide el NaCl del túbulo y libera <b>renina</b> para regular la presión arterial."},
    {tipo:"text", txt:"Explica con tus palabras por qué se filtran unos 180 litros al día y solo se eliminan 1,5, y qué papel tienen la ADH y la aldosterona en esa diferencia. Tu respuesta se guardará en el cuaderno."}
  ]
};

function buildKidney(E){
  orgvFrame(E, 1.3);
  const low = E.low; const D = BIO.kidney; const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const CEN = new THREE.Vector3(0.3,0.1,0);
  const add = (id, meshes, extra={}) => { const s=S[id]; const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, interno:s.interno, explodeDir:V3(s.pos).sub(CEN).normalize() }, extra)); E.addLabel(id, s.nombre, s.lbl); return p; };
  const R = Kit.rng(29);
  const sg = (n, m) => low ? Math.max(4, Math.round(n*0.6)) : n;
  const tubeOpt = (a,b) => ({ seg: sg(a), rad: sg(b) });

  /* ====================== RIÑÓN: forma de habichuela ====================== */
  const KC = new THREE.Vector3(-1.9, 1.05, 0);            // centro del riñón
  const HC = KC.clone().add(new THREE.Vector3(0.48, 0, 0)); // seno renal (hilio hacia +X)
  const beanG = Kit.sculpt({ w: low?64:112, h: low?48:84,
    shape: d => { const nt = Math.max(0, d.x)*Math.exp(-(d.y*d.y*1.9)); let x = 1.18*d.x - 0.78*nt, y = 1.72*d.y, z = 1.02*d.z*(1 - 0.38*nt);
      y *= 1 + 0.05*Math.abs(d.z); return new THREE.Vector3(x, y, z); },
    disp: p => 0.014*Kit.fbm(p.x*2.4, p.y*2.4, p.z*2.4, 3) });
  const cortexMat = orgvTex.mat({ tex:'kidney', rep:[3,3], bump:0.016, rough:0.5, coat:0.55, coatRough:0.24, env:0.8 });
  const cortex = new THREE.Mesh(beanG, cortexMat); cortex.position.copy(KC); cortex.userData.sub = 'corteza';
  add('corteza', [cortex]);
  const capMat = new THREE.MeshPhysicalMaterial({ color:0xBFD6E4, transparent:true, opacity:0.13, roughness:0.15, clearcoat:1, depthWrite:false, side:THREE.DoubleSide });
  const capsule = new THREE.Mesh(beanG, capMat); capsule.position.copy(KC); capsule.scale.setScalar(1.05); capsule.userData.sub = 'capsula';
  add('capsula', [capsule], { passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });

  /* --------------------- médula: pirámides y papilas --------------------- */
  const pyrGeos = [], papGeos = [], apexes = [];
  const NPYR = 7;
  for (let i=0;i<NPYR;i++){
    const ang = -1.15 + i*(2.30/(NPYR-1)); const zs = (i%2 ? 1 : -1)*(i===3 ? 0.08 : 0.44);
    const w = new THREE.Vector3(-0.78, Math.sin(ang)*1.05, zs).normalize();      // hacia la corteza
    const A = HC.clone().addScaledVector(w, 0.20);                                 // vértice (papila)
    apexes.push({ A, w });
    const h0 = 0.94, r0 = 0.40;
    const g = new THREE.ConeGeometry(r0, h0, sg(16), 1);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), w.clone().negate());
    g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    const c = A.clone().addScaledVector(w, h0/2); g.translate(c.x,c.y,c.z); pyrGeos.push(g);
    const pg = new THREE.SphereGeometry(0.085, sg(10), sg(8)); pg.translate(A.x,A.y,A.z); papGeos.push(pg);
  }
  const medMesh = new THREE.Mesh(Kit.merge(pyrGeos), Kit.tissue({ color:orgvTex.lin(0xA8544A), tex:'tissue', rep:[1,5], bump:0.014, rough:0.6, coat:0.15 })); medMesh.userData.sub = 'piramide';
  const papMesh = new THREE.Mesh(Kit.merge(papGeos), Kit.tissue({ color:0xEECFBD, rough:0.45, coat:0.2 })); papMesh.userData.sub = 'papila';
  add('medula', [medMesh, papMesh]);

  /* ------------------ cálices menores, mayores y pelvis ------------------ */
  const calMat = Kit.tissue({ color:0xDCC172, rough:0.45, coat:0.3, coatRough:0.35 });
  const minor = [], major = [];
  const groups = [[0,1],[2,3,4],[5,6]];
  const gj = groups.map((grp,k) => { const y = grp.reduce((s,i)=>s+apexes[i].A.y,0)/grp.length; return HC.clone().add(new THREE.Vector3(0.20, (y-HC.y)*0.55, 0)); });
  groups.forEach((grp,k) => { grp.forEach(i => { const A = apexes[i].A; const m = A.clone().addScaledVector(apexes[i].w, -0.16);
      minor.push(Kit.taper([A.clone().addScaledVector(apexes[i].w,0.05), m, gj[k]], 0.145, 0.085, tubeOpt(14,9))); });
    major.push(Kit.taper([gj[k], gj[k].clone().lerp(HC.clone().add(new THREE.Vector3(0.52,-0.10,0)), 0.6), HC.clone().add(new THREE.Vector3(0.52,-0.10,0))], 0.115, 0.155, tubeOpt(14,10))); });
  const PC = HC.clone().add(new THREE.Vector3(0.52,-0.10,0));       // centro de la pelvis
  const U0 = KC.clone().add(new THREE.Vector3(1.00,-0.35,0));        // inicio del uréter
  const pelvis = Kit.taper([PC, PC.clone().lerp(U0,0.5), U0], 0.30, 0.095, tubeOpt(18,12));
  const minorM = new THREE.Mesh(Kit.merge(minor), calMat); minorM.userData.sub = 'menor';
  const majorM = new THREE.Mesh(Kit.merge(major), calMat); majorM.userData.sub = 'mayor';
  const pelvisM = new THREE.Mesh(pelvis, calMat); pelvisM.userData.sub = 'pelvis';
  add('via-excretora', [minorM, majorM, pelvisM]);

  /* ------------------------------ uréter ------------------------------ */
  const urePts = [U0, new THREE.Vector3(-0.80,0.05,0.06), new THREE.Vector3(-0.58,-0.80,0.12), new THREE.Vector3(-0.22,-1.62,0.12), new THREE.Vector3(0.00,-2.05,0.05)];
  const ureCurve = Kit.curve(urePts);
  const ureM = new THREE.Mesh(Kit.taper(urePts, 0.085, 0.075, tubeOpt(40,12)), Kit.tissue({ color:orgvTex.lin(0xE8D2BC), rough:0.44, coat:0.5, tex:'tissue', rep:[1,6], bump:0.006 }));
  add('ureter', [ureM]);

  /* ------------------------------ vejiga ------------------------------ */
  const BC = new THREE.Vector3(0.05,-2.60,0);
  const bladG = Kit.sculpt({ w: low?40:64, h: low?30:48,
    shape: d => new THREE.Vector3(0.84*d.x, d.y>0 ? 0.62*d.y : 0.72*d.y, 0.80*d.z),
    disp: (p,d) => (d.y>0.55 ? -0.10*smooth01((d.y-0.55)/0.45) : 0) + 0.012*Kit.fbm(p.x*3,p.y*3,p.z*3,2) });
  const blad = new THREE.Mesh(bladG, orgvTex.mat({ tex:'serosa', color:orgvTex.lin(0xFAEDE6), rep:[2,2], bump:0.014, rough:0.5, coat:0.55, coatRough:0.25, env:0.8 })); blad.position.copy(BC); blad.userData.sub = 'detrusor';
  const uret = new THREE.Mesh(Kit.taper([BC.clone().add(new THREE.Vector3(0,-0.66,0)), BC.clone().add(new THREE.Vector3(0.02,-1.25,0))], 0.085, 0.065, tubeOpt(12,10)), Kit.tissue({ color:0xCE8D68, rough:0.52, coat:0.25 })); uret.userData.sub = 'uretra';
  add('vejiga', [blad, uret]);

  /* -------------------------- vasos renales -------------------------- */
  const artPts = [new THREE.Vector3(0.28,1.22,-0.42), new THREE.Vector3(-0.30,1.20,-0.28), KC.clone().add(new THREE.Vector3(0.70,0.16,-0.12))];
  const venPts = [new THREE.Vector3(0.60,0.92,0.02), new THREE.Vector3(-0.12,0.94,0.10), KC.clone().add(new THREE.Vector3(0.72,-0.06,0.16))];
  const aorta = Kit.taper([new THREE.Vector3(0.28,2.10,-0.42), new THREE.Vector3(0.28,0.42,-0.42)], 0.135, 0.135, tubeOpt(14,12));
  const cava = Kit.taper([new THREE.Vector3(0.62,2.10,0.02), new THREE.Vector3(0.62,0.42,0.02)], 0.16, 0.16, tubeOpt(14,12));
  const artM = new THREE.Mesh(Kit.merge([Kit.taper(artPts, 0.125, 0.105, tubeOpt(24,12)), aorta]), Kit.tissue({ tex:'artery', rep:[4,1], bump:0.006, coat:0.55, rough:0.4 })); artM.userData.sub = 'arteria';
  const venM = new THREE.Mesh(Kit.merge([Kit.taper(venPts, 0.150, 0.125, tubeOpt(24,12)), cava]), Kit.tissue({ tex:'vein', rep:[4,1], bump:0.006, coat:0.55, rough:0.4 })); venM.userData.sub = 'vena';
  add('vasos-renales', [artM, venM]);

  /* ================== LUPA: NEFRONA AMPLIADA (~2.000×) ================== */
  const NC = new THREE.Vector3(2.55, 0.90, 0.25);
  const P = (x,y,z=0) => new THREE.Vector3(NC.x+x, NC.y+y, NC.z+z);
  const ringMat = new THREE.MeshBasicMaterial({ color:0x3FA7BD, toneMapped:false });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.022, 8, sg(64)), ringMat); ring.position.copy(NC.clone().add(new THREE.Vector3(0,-0.05,-0.15)));
  const leader = new THREE.Mesh(Kit.taper([P(-1.30,-0.85,0.15), new THREE.Vector3(0.45,-1.30,0.45), new THREE.Vector3(-2.05,-0.25,0.55)], 0.013, 0.013, tubeOpt(28,6)), ringMat);
  E.scene.add(ring, leader);

  /* corpúsculo renal: glomérulo + cápsula de Bowman + arteriolas */
  const CP = P(-0.75, 0.85, 0);
  const glomGeos = [];
  for (let i=0;i<7;i++){
    const ax = new THREE.Vector3(R()-0.5, R()-0.5, R()-0.5).normalize();
    const u = new THREE.Vector3().crossVectors(ax, new THREE.Vector3(0.2,1,0.3)).normalize();
    const v = new THREE.Vector3().crossVectors(ax, u);
    const rr = 0.10 + R()*0.09, a0 = R()*6, pts = [];
    for (let j=0;j<=12;j++){ const a = a0 + j/12*5.2; pts.push(CP.clone().addScaledVector(u, Math.cos(a)*rr).addScaledVector(v, Math.sin(a)*rr).addScaledVector(ax, (j/12-0.5)*0.08)); }
    glomGeos.push(Kit.taper(pts, 0.026, 0.026, tubeOpt(18,6)));
  }
  const glom = new THREE.Mesh(Kit.merge(glomGeos), Kit.tissue({ color:0x8E1812, rough:0.72, coat:0.05 })); glom.userData.sub = 'glomerulo';
  const bowG = new THREE.SphereGeometry(0.30, sg(28), sg(20)); bowG.translate(CP.x,CP.y,CP.z);
  const bow = new THREE.Mesh(bowG, new THREE.MeshPhysicalMaterial({ color:0xF2E6CE, transparent:true, opacity:0.30, roughness:0.16, clearcoat:1, depthWrite:false, side:THREE.DoubleSide })); bow.userData.sub = 'bowman';
  const affPts = [P(-1.50,1.02,-0.05), P(-1.12,0.96,-0.02), P(-0.96,0.90,0)];
  const aff = new THREE.Mesh(Kit.taper(affPts, 0.075, 0.058, tubeOpt(16,9)), Kit.tissue({ color:0xA01C12, rough:0.7, coat:0.05 })); aff.userData.sub = 'aferente';
  const effPts = [P(-0.58,0.62,0.04), P(-0.44,0.42,0.12), P(-0.30,0.30,0.18)];
  const eff = new THREE.Mesh(Kit.taper(effPts, 0.046, 0.040, tubeOpt(14,9)), Kit.tissue({ color:0xC03A28, rough:0.7, coat:0.05 })); eff.userData.sub = 'eferente';
  add('corpusculo', [glom, bow, aff, eff]);

  /* túbulo contorneado proximal */
  const tcpPts = [P(-0.50,0.70,0.10), P(-0.32,0.56,0.24), P(-0.12,0.68,0.06), P(-0.02,0.46,-0.10), P(-0.18,0.34,0.08), P(0.02,0.26,0.20), P(0.14,0.40,0.02), P(0.20,0.22,-0.06), P(0.15,0.10,0.02)];
  const tcpM = new THREE.Mesh(Kit.taper(tcpPts, 0.075, 0.070, tubeOpt(60,10)), Kit.tissue({ color:0xC96A12, tex:'tissue', rep:[1,8], bump:0.008, rough:0.72, coat:0.05 })); tcpM.userData.sub = 'tcp';
  add('tcp', [tcpM]);

  /* asa de Henle */
  const descPts = [P(0.15,0.08,0.02), P(0.14,-0.45,0.02), P(0.15,-1.00,0.0)];
  const curvPts = [P(0.15,-1.00,0), P(0.20,-1.26,0), P(0.36,-1.26,0), P(0.41,-1.00,0)];
  const ascPts  = [P(0.41,-1.00,0), P(0.42,-0.45,0), P(0.41,0.12,0)];
  const henleMat = Kit.tissue({ color:0x3D8FD0, rough:0.72, coat:0.05 });
  const desc = new THREE.Mesh(Kit.taper(descPts, 0.048, 0.044, tubeOpt(20,9)), henleMat); desc.userData.sub = 'descendente';
  const curv = new THREE.Mesh(Kit.taper(curvPts, 0.046, 0.062, tubeOpt(18,9)), henleMat); curv.userData.sub = 'curva';
  const asc  = new THREE.Mesh(Kit.taper(ascPts, 0.068, 0.072, tubeOpt(20,9)), Kit.tissue({ color:0x17427E, rough:0.72, coat:0.05 })); asc.userData.sub = 'ascendente';
  add('asa-henle', [desc, curv, asc]);

  /* túbulo contorneado distal + conector (pasa por el aparato yuxtaglomerular) */
  const tcdPts = [P(0.41,0.15,0), P(0.46,0.36,-0.10), P(0.28,0.54,0.06), P(0.08,0.70,-0.06), P(-0.16,0.88,0.02), P(-0.48,1.00,0.0), P(-0.86,1.02,0.0)];
  const conPts = [P(-0.86,1.02,0.0), P(-0.50,1.18,0.05), P(0.05,1.24,-0.02), P(0.56,1.12,-0.06), P(0.88,0.88,-0.05)];
  const tcdMat = Kit.tissue({ color:0x6A54B5, rough:0.72, coat:0.05 });
  const tcdM = new THREE.Mesh(Kit.taper(tcdPts, 0.062, 0.058, tubeOpt(44,9)), tcdMat); tcdM.userData.sub = 'tcd';
  const conM = new THREE.Mesh(Kit.taper(conPts, 0.058, 0.070, tubeOpt(34,9)), Kit.tissue({ color:0x54409E, rough:0.72, coat:0.05 })); conM.userData.sub = 'conector';
  add('tcd', [tcdM, conM]);

  /* túbulo colector + papila + afluentes de otras nefronas */
  const colPts = [P(0.88,0.88,-0.05), P(0.88,-0.20,-0.05), P(0.88,-1.35,-0.05)];
  const colMat = Kit.tissue({ color:0x18845E, rough:0.72, coat:0.05 });
  const colM = new THREE.Mesh(Kit.taper(colPts, 0.075, 0.115, tubeOpt(30,11)), colMat); colM.userData.sub = 'colector';
  const papG = new THREE.ConeGeometry(0.14, 0.26, sg(14), 1); papG.rotateX(Math.PI); papG.translate(P(0.88,-1.48,-0.05).x, P(0.88,-1.48,-0.05).y, P(0.88,-1.48,-0.05).z);
  const papM = new THREE.Mesh(papG, Kit.tissue({ color:0x0F6E4C, rough:0.72, coat:0.05 })); papM.userData.sub = 'papila';
  const trib = [Kit.taper([P(1.28,0.62,0.12), P(1.05,0.50,0.04), P(0.90,0.35,-0.04)], 0.05, 0.055, tubeOpt(16,8)),
                Kit.taper([P(0.52,0.30,-0.28), P(0.72,0.18,-0.18), P(0.88,0.05,-0.06)], 0.05, 0.055, tubeOpt(16,8))];
  const tribM = new THREE.Mesh(Kit.merge(trib), colMat); tribM.userData.sub = 'colector';
  add('colector', [colM, papM, tribM]);

  /* aparato yuxtaglomerular: mácula densa + células granulares */
  const jgGeos = [], mdGeos = [];
  for (let i=0;i<6;i++){ const g = new THREE.SphereGeometry(0.045, sg(10), sg(8)); const p = P(-1.02 + i*0.035, 0.90 + (i%2)*0.05, -0.02 + (R()-0.5)*0.05); g.translate(p.x,p.y,p.z); jgGeos.push(g); }
  for (let i=0;i<5;i++){ const g = new THREE.SphereGeometry(0.038, sg(10), sg(8)); const p = P(-0.98 + i*0.045, 1.02, 0.01 + (R()-0.5)*0.04); g.translate(p.x,p.y,p.z); mdGeos.push(g); }
  const jgM = new THREE.Mesh(Kit.merge(jgGeos), Kit.tissue({ color:0xC08A00, rough:0.7, coat:0.05 })); jgM.userData.sub = 'granulares';
  const mdM = new THREE.Mesh(Kit.merge(mdGeos), Kit.tissue({ color:0x8E44C8, rough:0.7, coat:0.05 })); mdM.userData.sub = 'macula';
  add('yuxtaglomerular', [jgM, mdM]);

  /* capilares peritubulares y vasos rectos */
  const periGeos = [];
  for (let k=0;k<3;k++){
    const pts = []; const ph = k*2.1;
    for (let j=0;j<=14;j++){ const u = j/14; const x = -0.32 + u*0.72, y = 0.66 - u*0.36 + 0.14*Math.sin(u*7 + ph), z = 0.22 + 0.16*Math.cos(u*6 + ph);
      pts.push(P(x, y, z)); }
    periGeos.push(Kit.taper(pts, 0.024, 0.024, tubeOpt(24,6)));
  }
  const periM = new THREE.Mesh(Kit.merge(periGeos), Kit.tissue({ color:0xA32449, rough:0.7, coat:0.05 })); periM.userData.sub = 'peritubulares';
  const vrD = Kit.taper([P(0.00,0.22,0.22), P(-0.02,-0.55,0.22), P(0.00,-1.18,0.22), P(0.12,-1.34,0.22)], 0.038, 0.032, tubeOpt(26,8));
  const vrA = Kit.taper([P(0.12,-1.34,0.22), P(0.24,-1.18,0.24), P(0.26,-0.55,0.24), P(0.24,0.22,0.24)], 0.032, 0.040, tubeOpt(26,8));
  const vrDM = new THREE.Mesh(vrD, Kit.tissue({ color:0xA01C12, rough:0.7, coat:0.05 })); vrDM.userData.sub = 'rectos';
  const vrAM = new THREE.Mesh(vrA, Kit.tissue({ color:0x1C3A8E, rough:0.7, coat:0.05 })); vrAM.userData.sub = 'rectos';
  add('peritubulares', [periM, vrDM, vrAM]);

  /* --------- intersticio medular: gradiente de osmolaridad (decorativo) --------- */
  const gradG = new THREE.PlaneGeometry(1.35, 1.75, 1, 8);
  { const pos = gradG.attributes.position, col = new Float32Array(pos.count*3);
    for (let i=0;i<pos.count;i++){ const t = 1 - (pos.getY(i)/1.75 + 0.5); const c = [lin(0.95-0.45*t), lin(0.92-0.55*t), lin(0.72-0.10*t)]; col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2]; }
    gradG.setAttribute('color', new THREE.BufferAttribute(col,3)); }
  const grad = new THREE.Mesh(gradG, new THREE.MeshBasicMaterial({ vertexColors:true, transparent:true, opacity:0.5, side:THREE.DoubleSide, depthWrite:false, toneMapped:false }));
  grad.position.copy(P(0.28,-0.55,-0.42)); grad.visible = false; E.scene.add(grad);

  /* ========================== ANIMACIONES ========================== */
  /* 1 · la gota de filtrado a lo largo de la nefrona */
  const SEGS = [
    { id:'corpusculo', pts:[CP.clone(), P(-0.62,0.76,0.06), P(-0.50,0.70,0.10)], col:0xFFF0B8,
      txt:'Corpúsculo renal · FILTRACIÓN: la presión del glomérulo empuja el plasma a la cápsula de Bowman. Pasan agua, sales, glucosa y urea; quedan fuera células y proteínas. Se filtran ~180 L al día.' },
    { id:'tcp', pts:tcpPts, col:0xF3C36A,
      txt:'Túbulo contorneado proximal · REABSORCIÓN masiva: el 100 % de la glucosa y de los aminoácidos, ~65 % del agua y del sodio. Y SECRECIÓN: H⁺, amoníaco, creatinina y medicamentos pasan al túbulo.' },
    { id:'descendente', pts:descPts, col:0xE9A94F,
      txt:'Rama descendente del asa · sale agua hacia el intersticio salado de la médula (no salen sales): el filtrado se concentra a medida que baja.' },
    { id:'curva', pts:curvPts, col:0xE08A3C,
      txt:'Codo del asa, en plena médula · aquí el líquido alcanza su máxima concentración, hasta ~1.200 mOsm/kg, la del intersticio que lo rodea.' },
    { id:'ascendente', pts:ascPts, col:0xBFD9E8,
      txt:'Rama ascendente gruesa · bombea Na⁺, K⁺ y Cl⁻ al intersticio y no deja salir agua: el filtrado se DILUYE (~100 mOsm/kg) y la médula se vuelve salada.' },
    { id:'tcd', pts:tcdPts, col:0xC9BEEA,
      txt:'Túbulo contorneado distal · ajuste fino: con aldosterona se reabsorbe Na⁺ y se secreta K⁺; también se regula el calcio. Al pasar junto al glomérulo, la mácula densa mide cuánta sal queda.' },
    { id:'conector', pts:conPts, col:0xB7A9E4,
      txt:'Túbulo conector · el líquido pasa al colector, donde se tomará la última decisión: cuánta agua se conserva.' },
    { id:'colector', pts:colPts, col:0x7FC3A4,
      txt:'Túbulo colector · con ADH se abren acuaporinas y el agua sale hacia la médula salada: la orina se concentra. Las células intercaladas secretan H⁺ y devuelven bicarbonato (equilibrio ácido-base).' },
    { id:'papila', pts:[P(0.88,-1.35,-0.05), P(0.88,-1.55,-0.05)], col:0xE2C766,
      txt:'Papila renal · ya es orina: ~1,5 L al día de los 180 L filtrados. Más del 99 % del agua volvió a la sangre. Ahora solo queda el transporte: cáliz, pelvis, uréter y vejiga.' }
  ];
  SEGS.forEach(s => { s.curve = Kit.curve(s.pts); s.len = s.curve.getLength(); });
  const TOTAL = SEGS.reduce((a,s)=>a+s.len,0);
  const segAt = d => { let acc = 0; for (const s of SEGS){ if (d <= acc + s.len) return { s, u: (d-acc)/s.len }; acc += s.len; } return { s: SEGS[SEGS.length-1], u: 1 }; };
  const drop = { on:false, d:0, speed:1, parts:[], seg:SEGS[0] };
  const dropMat = new THREE.MeshBasicMaterial({ color:0xFFF0B8, toneMapped:false, depthTest:false });
  for (let i=0;i<4;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(i?0.062:0.095, sg(12), sg(10)), i ? new THREE.MeshBasicMaterial({ color:0xFFF0B8, toneMapped:false, transparent:true, opacity:0.55-0.13*i, depthTest:false }) : dropMat);
    m.renderOrder = 6; m.userData.off = -i*0.085; m.visible = false; E.scene.add(m); drop.parts.push(m); }

  /* 2 · contracorriente: agua sale de la descendente, sal sale de la ascendente */
  const cc = { on:false, t:0, parts:[] };
  const waterMat = new THREE.MeshBasicMaterial({ color:0x2FA8DE, toneMapped:false, depthTest:false });
  const saltMat  = new THREE.MeshBasicMaterial({ color:0xE8A400, toneMapped:false, depthTest:false });
  for (let i=0;i<10;i++){
    const yy = 0.0 - i*0.11;
    const w = new THREE.Mesh(new THREE.SphereGeometry(0.03, sg(8), sg(6)), waterMat);
    w.renderOrder=6; w.userData = { from:P(0.15,yy,0.02), to:P(0.15,yy,0.02).add(new THREE.Vector3(-0.30,-0.04,0.02)), off:i/10 }; w.visible=false; E.scene.add(w); cc.parts.push(w);
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.03, sg(8), sg(6)), saltMat);
    s.renderOrder=6; s.userData = { from:P(0.41,yy,0), to:P(0.41,yy,0).add(new THREE.Vector3(0.28,-0.04,-0.06)), off:(i+0.5)/10 }; s.visible=false; E.scene.add(s); cc.parts.push(s);
  }

  /* 3 · flujo de orina: papila → cálices → pelvis → uréter → vejiga */
  const flowCurve = Kit.curve([apexes[3].A.clone(), gj[1].clone(), PC.clone(), U0.clone(), new THREE.Vector3(-0.80,0.05,0.06), new THREE.Vector3(-0.58,-0.80,0.12), new THREE.Vector3(-0.22,-1.62,0.12), new THREE.Vector3(0.00,-2.05,0.05), BC.clone().add(new THREE.Vector3(0,-0.05,0))]);
  const flow = { on:false, t:0, parts:[] };
  const uMat = new THREE.MeshBasicMaterial({ color:0xE0B02A, toneMapped:false, depthTest:false });
  for (let i=0;i<8;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.052, sg(10), sg(8)), uMat); m.renderOrder=6; m.userData = { off:i/8 }; m.visible=false; E.scene.add(m); flow.parts.push(m); }

  const model = {
    anims:[
      { id:'filtrado', label:'Sigue una gota de filtrado por la nefrona', get on(){ return drop.on; },
        set(on){ drop.on=on; drop.d=0; drop.parts.forEach(p=>p.visible=on); if (on) E.focus(NC.clone().add(new THREE.Vector3(0,-0.1,0)), 6.2); }, focus:true },
      { id:'contracorriente', label:'Multiplicador de contracorriente en el asa de Henle', get on(){ return cc.on; },
        set(on){ cc.on=on; cc.parts.forEach(p=>p.visible=on); grad.visible=on; if (on) E.focus(P(0.28,-0.5,0), 4.6); }, focus:true },
      { id:'orina', label:'Recorrido de la orina: papila → cálices → pelvis → uréter → vejiga', get on(){ return flow.on; },
        set(on){ flow.on=on; flow.parts.forEach(p=>p.visible=on); if (on) E.focus(new THREE.Vector3(-0.85,-0.45,0), 9.5); }, needsOpacity:0.45, focus:true }
    ],
    setSpeed(k){ drop.speed = k; },
    phaseText(){
      if (drop.on) return drop.seg.txt;
      if (cc.on) return 'Contracorriente · la rama ascendente (amarillo: Na⁺, K⁺, Cl⁻) sala el intersticio; la descendente deja salir agua (azul) hacia esa sal, y el líquido que baja se concentra todavía más. Repetido a lo largo del asa, el gradiente crece de 300 mOsm/kg en la corteza a ~1.200 en la papila.';
      if (flow.on){ const t = flow.t % 1; return t<0.22 ? 'Papila renal → cáliz menor → cáliz mayor: la orina ya no cambia de composición.' : t<0.42 ? 'Pelvis renal: embudo de recogida; aquí suelen atascarse los cálculos.' : t<0.82 ? 'Uréter: ondas peristálticas cada 10–20 s empujan la orina; no baja solo por gravedad.' : 'Vejiga: almacena 400–500 mL; el deseo de orinar aparece hacia los 250–300 mL.'; }
      return '';
    },
    legend:[
      {color:'#FFF0B8',txt:'Gota de filtrado (se vuelve orina al final del recorrido)'},
      {color:'#2FA8DE',txt:'Agua que sale de la rama descendente'},
      {color:'#E8A400',txt:'Na⁺, K⁺ y Cl⁻ bombeados por la rama ascendente'},
      {color:'#E0B02A',txt:'Orina ya formada, camino de la vejiga'},
      {color:'#C0392B',txt:'Sangre que entra (arteriolas y vasos rectos descendentes)'},
      {color:'#3B5BA5',txt:'Sangre que sale (vasos rectos ascendentes)'}
    ],
    observa:'sigue el color de la gota: se concentra al bajar por la rama descendente, se diluye al subir por la ascendente y vuelve a concentrarse en el colector solo si hay ADH. Con la transparencia de la corteza al 30 % verás las pirámides y los cálices dentro del riñón.'
  };

  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (drop.on){
      drop.d = (drop.d + dt*0.62*drop.speed) % TOTAL;
      const a = segAt(drop.d); drop.seg = a.s;
      drop.parts.forEach(p => { const d = ((drop.d + p.userData.off) % TOTAL + TOTAL) % TOTAL; const b = segAt(d); p.position.copy(b.s.curve.getPointAt(Math.max(0,Math.min(1,b.u)))); });
      dropMat.color.setHex(a.s.col);
      drop.parts[0].scale.setScalar(1 + 0.12*Math.sin(t*6));
    }
    if (cc.on){ cc.t += dt*0.5; cc.parts.forEach(p => { const k = (cc.t + p.userData.off) % 1; p.position.lerpVectors(p.userData.from, p.userData.to, k); p.scale.setScalar(0.5 + 0.7*Math.sin(k*Math.PI)); }); }
    if (flow.on){ flow.t += dt*0.12; flow.parts.forEach(p => { const k = ((flow.t + p.userData.off) % 1 + 1) % 1; p.position.copy(flowCurve.getPointAt(k)); }); }
  });
  return model;
}

BIO.organs.rinones = BIO.kidney;
BIO.builders.rinones = buildKidney;
Object.assign(BIO.activities, {
  "explorar-rinones":{t:"Explorar los riñones", unidad:6, peso:15, xp:60},
  "guiada-rinones":{t:"Exploración guiada de los riñones", unidad:6, peso:10, xp:80}
});
route('/explorar/rinones', (view,q) => organView(view, q, BIO.kidney, buildKidney));
</script>
