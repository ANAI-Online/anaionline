<script>
/* =====================================================================
   ÓRGANO: SISTEMA REPRODUCTOR — gametogénesis, ciclo y fecundación
   Datos (BIO.repro) + modelo 3D procedimental (buildRepro)
   Ruta: #/explorar/reproductor
   ===================================================================== */
BIO.repro = {
  capasHint: "Sugerencia: deja visible una sola capa cada vez para comparar los dos sistemas sin ruido. La capa «Gametogénesis al microscopio» contiene las tres lupas: el folículo en corte, el túbulo seminífero en corte y los dos gametos dibujados a la misma escala. La animación del ciclo es el corazón de este módulo.",
  id:"reproductor", nombre:"Sistema reproductor", unidad:6, dominio:"anat",
  eyebrow:"Atlas 3D · Unidad 6 · Sistema reproductor y salud sexual", em:"⚥",
  intro:"Los dos sistemas con el mismo rigor y en la misma escena: dónde se forman los gametos, por qué la ovogénesis produce uno y la espermatogénesis cuatro, cómo se sincronizan el ciclo ovárico y el uterino día a día, y qué ocurre de verdad cuando un espermatozoide llega al tercio externo de la trompa.",
  nota:"Modelo tridimensional simplificado con fines educativos. Los dos sistemas se muestran lado a lado y a una escala parecida para poder compararlos, no en su posición real dentro de la pelvis ni en su tamaño relativo real. El útero y el testículo están abiertos como en un corte anatómico para dejar ver el endometrio y los túbulos seminíferos. Las tres lupas están ampliadas entre 100 y 1.000 veces: un folículo maduro mide unos 2 cm, pero un túbulo seminífero mide 0,2 mm de ancho y un ovocito 0,12 mm. En la lupa de los gametos el largo del espermatozoide y el diámetro del ovocito guardan la proporción real; solo el grosor de la cabeza y de la cola se dibuja algo mayor para que puedan verse.",
  focusR:9.5, radius:16.2, target:[0.2,-0.55,0], phi:1.42, theta:0.20, floor:-5.0, floorSize:15,
  capas:[
    {id:"femenino", n:"Sistema reproductor femenino"},
    {id:"masculino", n:"Sistema reproductor masculino"},
    {id:"lupa", n:"Gametogénesis al microscopio (lupa)"}
  ],
  opacityCapas:["femenino","masculino"], opacityLabel:"Transparencia de los órganos", opacityDefault:1,
  activity:"explorar-reproductor", guidedActivity:"guiada-reproductor", badge:"anatomista", seenThreshold:8,
  related:[
    {t:"Meiosis paso a paso (procesos celulares)", href:"#/explorar/procesos"},
    {t:"Genética y herencia", href:"#/explorar/genetica"},
    {t:"Cuerpo humano y salud", href:"#/area/cuerpo"}
  ],
  reto:{
    proposito:"Entender el ciclo menstrual como un mecanismo y no como una lista de fechas: ver al mismo tiempo qué hormona sube, qué le pasa al folículo en el ovario y qué le pasa al endometrio en el útero.",
    pista:"Activa la animación «Ciclo ovárico y ciclo uterino» y bájale la velocidad. Las cuatro curvas de arriba son FSH, LH, estrógenos y progesterona; la barra vertical marca el día en que va el ciclo.",
    observa:[
      {id:"ovarios", txt:"El ovario: cómo crece el folículo y en qué se convierte después de la ovulación"},
      {id:"utero", txt:"El endometrio: cuándo se engrosa, cuándo se mantiene y cuándo se desprende"},
      {id:"foliculo", txt:"El folículo en corte: ovocito, células de la granulosa y antro"},
      {id:"tubulo", txt:"El túbulo seminífero en corte: las capas de la espermatogénesis y las células de Sertoli"}
    ],
    pregunta:{
      q:"Llega el día 26, el ovocito no fue fecundado y unos días después empieza la menstruación. ¿Qué la desencadena exactamente?",
      ops:[
        "La subida de la FSH, que empuja al endometrio a desprenderse",
        "La caída de los estrógenos y sobre todo de la progesterona cuando el cuerpo lúteo deja de funcionar",
        "El pico de LH, que se repite al final del ciclo"
      ],
      ok:1,
      fb:"El cuerpo lúteo tiene una vida programada de unos 14 días. Si no llega la hormona hCG de un embrión implantado, se apaga: la progesterona y los estrógenos caen en picada, las arterias del endometrio se contraen y la capa funcional se desprende. Por eso la fase lútea dura casi siempre lo mismo y lo que cambia de una persona a otra —y de un mes a otro— es la duración de la fase folicular.",
      wrong:[
        "La FSH sí empieza a subir al final del ciclo, pero justamente porque ya no hay estrógenos ni progesterona que la frenen: es una consecuencia de la caída, no su causa. Su efecto es reclutar los folículos del ciclo siguiente.",
        "El pico de LH ocurre una sola vez, alrededor del día 13, y su efecto es desencadenar la ovulación. En la segunda mitad del ciclo la LH permanece baja."
      ]
    }
  },
  structures:[
    /* ---------------- SISTEMA FEMENINO ---------------- */
    {id:"ovarios", nombre:"Ovarios", capa:"femenino", color:"#E3B98C", pos:[-4.58,0.62,0.05], lbl:[-6.03,1.27,0.24],
      n1:"Las dos gónadas femeninas, del tamaño de una almendra: producen los ovocitos y las hormonas estrógenos y progesterona.",
      n2:"Cada ciclo, la FSH de la hipófisis recluta un grupo de folículos; uno se vuelve dominante y los demás se atresian. Ese folículo fabrica estrógenos, que hacen crecer el endometrio y que, al pasar cierto umbral, provocan el pico de LH. Unas 36 horas después del inicio de ese pico el folículo se rompe y libera el ovocito: eso es la ovulación. Lo que queda del folículo se transforma en cuerpo lúteo y produce progesterona durante unos 14 días.",
      n3:"La reserva es finita y se agota sin reponerse. Un feto femenino llega a tener unos 6 a 7 millones de ovocitos hacia la semana 20; al nacer quedan entre 1 y 2 millones, en la pubertad unos 300.000 a 400.000 y a lo largo de la vida solo unos 400 llegan a ovularse: todos los demás se pierden por atresia. Cuando la reserva se agota llega la menopausia, hacia los 50 años. Es exactamente lo contrario de lo que ocurre en el testículo, que fabrica gametos nuevos todos los días.",
      dato:"Una niña nace con todos sus ovocitos ya formados: después del nacimiento no se produce ninguno más.",
      conecta:["trompas","utero","foliculo","gametos"], temas:["Sistema endocrino","Gametogénesis","Ciclo ovárico"],
      partes:[
        {n:"Folículos en crecimiento", d:"Se alojan en la corteza del ovario. Cada mes un grupo empieza a crecer y solo uno suele llegar a ovular.", at:[-4.58,0.84,0.26], sub:"foliculos"},
        {n:"Cuerpo lúteo", d:"Lo que queda del folículo después de la ovulación. Produce progesterona durante unos 14 días y luego se apaga.", at:[-4.34,0.42,0.22], sub:"luteo"}
      ],
      quiz:{q:"¿Qué señal hormonal desencadena la ovulación?", ops:["El aumento sostenido de la FSH","El pico brusco de LH, unas 36 horas antes","El aumento de la progesterona"], ok:1,
        fb:"Los estrógenos del folículo dominante, al superar cierto nivel, hacen que la hipófisis dispare una descarga de LH: esa descarga rompe el folículo.",
        wrong:["La FSH hace crecer a los folículos al inicio del ciclo, pero no los rompe: de hecho baja justo antes de la ovulación.","La progesterona sube después de la ovulación, no antes: la produce el cuerpo lúteo, que solo existe una vez que el folículo ya se rompió."]}},

    {id:"trompas", nombre:"Trompas uterinas y fimbrias", capa:"femenino", color:"#E7A79A", pos:[-3.85,1.42,0.04], lbl:[-5.56,2.19,0.27],
      n1:"Los dos conductos de unos 10 cm que recogen el ovocito liberado por el ovario y lo conducen hacia el útero. Aquí ocurre la fecundación.",
      n2:"La trompa no está soldada al ovario: termina en un embudo con flecos móviles, las fimbrias, que barren la superficie del ovario en el momento de la ovulación y captan el ovocito, que por un instante queda libre en la cavidad abdominal. Dentro, los cilios y las contracciones de la pared lo empujan hacia el útero, un viaje de tres a cuatro días. La porción más ancha, la ampolla —el tercio externo—, es donde espermatozoide y ovocito se encuentran.",
      n3:"El encuentro tiene una ventana muy estrecha: el ovocito solo es fecundable de 12 a 24 horas, mientras que los espermatozoides pueden sobrevivir hasta cinco días en el moco cervical y en la trompa. Por eso el período fértil se extiende sobre todo hacia los días anteriores a la ovulación. Si el embrión no consigue avanzar —por cicatrices que dejó una infección por clamidia no tratada, por ejemplo— se implanta en la propia trompa: es el embarazo ectópico, que no puede prosperar y que es una urgencia médica, porque la trompa puede romperse y sangrar.",
      dato:"El ovocito pasa unos segundos libre en la cavidad abdominal antes de que las fimbrias lo capten.",
      conecta:["ovarios","utero","gametos"], temas:["Fecundación","Cilios","Salud sexual"],
      partes:[
        {n:"Fimbrias", d:"Los flecos móviles del extremo. Barren la superficie del ovario y captan el ovocito recién liberado.", at:[-4.45,0.95,0.20], sub:"fimbrias"},
        {n:"Ampolla (tercio externo)", d:"La porción más ancha y el lugar real de la fecundación.", at:[-4.10,1.36,0.10], sub:"ampolla"}
      ],
      quiz:{q:"¿En qué lugar ocurre normalmente la fecundación?", ops:["En el interior del ovario, apenas se libera el ovocito","En el tercio externo de la trompa uterina, la ampolla","En el útero, sobre el endometrio ya engrosado"], ok:1,
        fb:"El espermatozoide recorre todo el camino desde la vagina y el encuentro ocurre en la ampolla; al útero llega ya un embrión de varios días.",
        wrong:["Ningún espermatozoide entra en el ovario: el ovocito sale de él y es captado por las fimbrias.","Al útero llega un blastocisto de cinco o seis días. Si la fecundación ocurriera allí, no habría tiempo para las primeras divisiones."]}},

    {id:"utero", nombre:"Útero: endometrio y miometrio", capa:"femenino", color:"#C4675F", pos:[-2.80,0.55,0.00], lbl:[-4.92,2.79,0.08],
      n1:"Órgano muscular hueco, del tamaño de una pera invertida, donde se implanta el embrión y se desarrolla el feto.",
      n2:"Tiene tres capas. El perimetrio lo recubre por fuera; el miometrio es una pared gruesa de músculo liso dispuesto en tres planos entrecruzados, y el endometrio es la mucosa interior, con una capa basal permanente y una capa funcional que se reconstruye y se desprende en cada ciclo. Mientras el ovario cumple su ciclo, el endometrio cumple el suyo: menstruación en los días 1 a 5, fase proliferativa por acción de los estrógenos hasta la ovulación y fase secretora por acción de la progesterona, cuando las glándulas acumulan glucógeno para alimentar a un posible embrión. El dolor menstrual se debe a las prostaglandinas que contraen el miometrio; cuando es tan intenso que impide la vida normal hay que estudiarlo, porque puede deberse a endometriosis, que afecta a cerca de una de cada diez mujeres.",
      n3:"El útero pesa unos 60 gramos y mide 7,5 cm, y en el embarazo llega a pesar cerca de un kilo y a multiplicar su volumen unas 500 veces. Esa capacidad no depende de la edad de la persona: se puede quedar embarazada en la primera ovulación, incluso antes de la primera menstruación. Y ahí hay un dato que el Ecuador no puede esquivar: los registros de nacidos vivos del INEC muestran año tras año decenas de miles de nacimientos de madres adolescentes y más de mil de niñas menores de 15 años, y el país figura entre los de mayor tasa de embarazo adolescente de América del Sur. Un embarazo antes de los 15 años multiplica el riesgo de anemia, parto prematuro y muerte materna, y casi siempre corta la escolaridad. En una niña menor de 14 años el embarazo es, por definición legal, consecuencia de violencia sexual. La evidencia sobre qué funciona es clara y no tiene nada que ver con culpar a nadie: educación sexual integral, que retrasa el inicio de las relaciones y aumenta el uso de protección, acceso real a métodos anticonceptivos sin pedir permiso ni juzgar, y detección y sanción de la violencia sexual.",
      dato:"El útero multiplica su volumen unas 500 veces durante el embarazo y vuelve casi a su tamaño original en seis semanas.",
      conecta:["trompas","cuello-uterino","ovarios"], temas:["Ciclo uterino","Salud pública","Derechos"],
      partes:[
        {n:"Miometrio", d:"La pared muscular, en tres planos entrecruzados. Se contrae en la menstruación y en el parto.", at:[-3.55,0.70,0.10], sub:"miometrio"},
        {n:"Endometrio", d:"La mucosa interior. Su capa funcional se engrosa de 0,5 mm a 8-12 mm y se desprende cada ciclo.", at:[-2.80,0.60,0.25], sub:"endometrio"},
        {n:"Fondo uterino", d:"La parte superior y más ancha, entre las dos trompas. Es donde suele implantarse el embrión.", at:[-2.80,1.32,0.10], sub:"miometrio"}
      ],
      quiz:{q:"¿Qué se desprende exactamente en la menstruación?", ops:["Todo el endometrio, hasta dejar el músculo al descubierto","Solo la capa funcional del endometrio; la capa basal queda y lo regenera","Una parte del miometrio, que después se repone"], ok:1,
        fb:"La capa basal es permanente y a partir de ella el endometrio vuelve a crecer en la fase proliferativa siguiente.",
        wrong:["Si se desprendiera todo el endometrio no habría desde dónde regenerarlo. La capa basal, la más profunda, siempre permanece.","El miometrio es músculo y no se desprende nunca: solo se contrae. Lo que se elimina es mucosa, no músculo."]}},

    {id:"cuello-uterino", nombre:"Cuello uterino (cérvix)", capa:"femenino", color:"#D79B8B", pos:[-2.80,-0.52,0.02], lbl:[-0.24,-0.37,-0.52],
      n1:"La porción inferior y estrecha del útero, que se abre a la vagina y cuyo canal está ocupado por moco.",
      n2:"El moco cervical funciona como una puerta que cambia con las hormonas: bajo el efecto de los estrógenos, cerca de la ovulación, se vuelve abundante, transparente y filante, con sus fibras alineadas como un peine que deja pasar a los espermatozoides y los conserva vivos varios días; bajo el efecto de la progesterona, en la segunda mitad del ciclo, se vuelve espeso y prácticamente impenetrable. En el parto ese cuello firme se borra y se dilata hasta unos 10 cm.",
      n3:"Aquí está la zona de transformación, donde el epitelio del canal se encuentra con el de la vagina, y donde el virus del papiloma humano puede provocar lesiones que con los años derivan en cáncer cervicouterino, uno de los cánceres más frecuentes en mujeres en el Ecuador y casi enteramente prevenible: la vacuna contra el VPH está en el esquema nacional de vacunación y el tamizaje periódico (Papanicolaou o prueba de VPH) detecta las lesiones cuando todavía se tratan con facilidad. Sobre este mismo moco actúan varios anticonceptivos hormonales, que además impiden la ovulación. Vale la pena mirar la eficacia real, en uso típico y durante un año: implante subdérmico y DIU fallan en menos del 1 % de las usuarias; el inyectable trimestral, alrededor del 4 %; la píldora combinada, alrededor del 7 %, casi siempre por olvidos; el preservativo externo, alrededor del 13 %; no usar nada, alrededor del 85 %. La anticoncepción de emergencia con levonorgestrel actúa retrasando la ovulación y es más eficaz cuanto antes se tome, hasta 72 horas (con menor eficacia hasta 120); no interrumpe un embarazo ya implantado ni sirve como método habitual.",
      dato:"Solo el preservativo protege a la vez del embarazo y de las infecciones de transmisión sexual.",
      conecta:["utero","vagina","trompas"], temas:["Anticoncepción","Prevención","Salud sexual"],
      quiz:{q:"En el uso real, a lo largo de un año, ¿qué método anticonceptivo falla menos?", ops:["El preservativo externo bien colocado","El implante subdérmico","La píldora combinada"], ok:1,
        fb:"El implante y el DIU fallan en menos del 1 % de las usuarias por año porque no dependen de que la persona haga algo cada día ni en cada relación. Eso sí: no protegen de las infecciones de transmisión sexual, y por eso se combinan con el preservativo.",
        wrong:["Bien usado en cada relación el preservativo falla alrededor del 2 %, pero en el uso real de la población la cifra sube a cerca del 13 %: se olvida, se coloca tarde o se rompe. Sigue siendo el único que protege también de las ITS.","La píldora es muy eficaz si se toma todos los días a la misma hora (0,3 % de fallo), pero en el uso real ronda el 7 % anual, porque los olvidos son frecuentes."]}},

    {id:"vagina", nombre:"Vagina", capa:"femenino", color:"#C98E86", pos:[-2.79,-1.45,0.12], lbl:[-5.48,-1.03,0.6],
      n1:"Conducto muscular y muy elástico de 8 a 10 cm que comunica el cuello uterino con el exterior.",
      n2:"Sus paredes tienen pliegues transversales que le permiten distenderse enormemente en el parto y recuperar después su forma. Conviene no confundirla con la vulva: la vulva es el conjunto de estructuras externas (labios mayores y menores, clítoris, orificio uretral y entrada vaginal) y la vagina es el conducto interno. El clítoris, por cierto, no es solo lo que se ve: la mayor parte de sus unos 10 cm son internos y tiene cerca de 8.000 terminaciones nerviosas, más que ninguna otra estructura del cuerpo.",
      n3:"La vagina se limpia sola. Sus lactobacilos producen ácido láctico y mantienen un pH de 3,8 a 4,5 que frena el crecimiento de otros microorganismos; las duchas vaginales y los jabones perfumados arrasan esa flora y aumentan las infecciones, no las previenen. Sobre las infecciones de transmisión sexual, la evidencia es simple y poco dramática: la mayoría cursa sin síntomas, así que no tener molestias no significa no tenerlas; el preservativo usado desde el inicio de la relación reduce de forma importante la transmisión de VIH, gonorrea, clamidia y sífilis; la clamidia y la gonorrea se curan con antibióticos, pero si no se tratan pueden dejar infertilidad; la sífilis no tratada en el embarazo daña al feto y se detecta con una prueba de sangre; y el VIH, con el tratamiento antirretroviral actual, llega a una carga viral indetectable, que además no se transmite. Hacerse pruebas periódicas si hay vida sexual activa es una conducta de cuidado, no una acusación.",
      dato:"El pH ácido de la vagina es una defensa: las duchas vaginales lo destruyen y aumentan las infecciones.",
      conecta:["cuello-uterino","utero"], temas:["Microbiota","ITS","Prevención"],
      quiz:{q:"¿Por qué no se recomiendan las duchas vaginales?", ops:["Porque la vagina no se puede mojar por dentro","Porque eliminan los lactobacilos y el pH ácido que protegen de las infecciones","Porque el agua diluye las hormonas del ciclo"], ok:1,
        fb:"El aseo externo con agua es suficiente: por dentro, la vagina mantiene su propio equilibrio.",
        wrong:["No es cuestión de mojarse: la vagina está húmeda de forma permanente. El problema es arrasar con la flora que la defiende.","Las hormonas del ciclo viajan por la sangre, no por la vagina: nada de lo que se aplique localmente las diluye."]}},

    /* ---------------- SISTEMA MASCULINO ---------------- */
    {id:"testiculos", nombre:"Testículos", capa:"masculino", color:"#DCC0A4", pos:[3.98,-2.55,-0.23], lbl:[6.37,-2.86,-0.63], anchor:[3.9,-2.53,-0.18],
      n1:"Las dos gónadas masculinas: producen espermatozoides en los túbulos seminíferos y testosterona en las células de Leydig.",
      n2:"Cada testículo está dividido en unos 250 lobulillos y contiene entre 200 y 300 metros de túbulos seminíferos enrollados: es una fábrica desplegada en muy poco espacio. Dentro del túbulo trabajan las células de Sertoli; fuera, entre los túbulos, las células de Leydig fabrican testosterona. Los túbulos desembocan en la rete testis y de ahí al epidídimo. La hipófisis dirige las dos funciones con hormonas distintas: la FSH actúa sobre las Sertoli y sostiene la producción de gametos, y la LH actúa sobre las Leydig y sostiene la de testosterona.",
      n3:"Los testículos están fuera del abdomen por una razón térmica: la espermatogénesis necesita entre 2 y 3 °C menos que la temperatura corporal, y por eso el escroto acerca o aleja los testículos según el frío gracias a los músculos cremáster y dartos. Si un testículo no desciende antes del nacimiento (criptorquidia) hay que corregirlo, porque dentro del abdomen no produce gametos y aumenta el riesgo de cáncer. Dos avisos útiles a esta edad: el dolor testicular intenso y brusco puede ser una torsión, y hay unas pocas horas para salvar el testículo; y el cáncer de testículo, aunque poco frecuente, es el tumor sólido más común entre los 15 y los 35 años, se detecta como un bulto duro e indoloro y se cura en más del 95 % de los casos si se consulta a tiempo.",
      dato:"Cada testículo contiene entre 200 y 300 metros de túbulos seminíferos enrollados.",
      conecta:["epididimo","tubulo","deferente"], temas:["Gametogénesis","Sistema endocrino","Autocuidado"],
      partes:[
        {n:"Túnica albugínea", d:"La cápsula fibrosa y resistente que envuelve el testículo y lo divide en lobulillos.", at:[3.45,-2.18,0.20], sub:"albuginea"},
        {n:"Túbulos seminíferos", d:"Los tubos enrollados donde se fabrican los espermatozoides. Aquí están representados solo unos pocos.", at:[4.50,-2.50,0.12], sub:"tubulos"}
      ],
      quiz:{q:"¿Por qué los testículos están fuera de la cavidad abdominal?", ops:["Porque no caben dentro de la pelvis","Porque la espermatogénesis necesita entre 2 y 3 °C menos que la temperatura corporal","Porque así reciben más oxígeno del aire"], ok:1,
        fb:"El escroto funciona como un termostato: acerca los testículos al cuerpo con el frío y los aleja con el calor.",
        wrong:["Sí cabrían: de hecho se forman dentro del abdomen y descienden antes de nacer. Lo que no funciona ahí dentro es la producción de gametos.","Ningún órgano toma oxígeno del aire salvo el pulmón: los testículos se oxigenan por la sangre, como todos los demás."]}},

    {id:"epididimo", nombre:"Epidídimo", capa:"masculino", color:"#C79C7A", pos:[3.15,-2.85,-0.30], lbl:[4.2,-3.9,-0.54], anchor:[3.07,-2.67,-0.5],
      n1:"Un conducto de unos 6 metros enrollado sobre sí mismo, pegado al borde del testículo, donde los espermatozoides terminan de madurar y se almacenan.",
      n2:"Los espermatozoides salen del túbulo seminífero prácticamente inmóviles e incapaces de fecundar. Durante los 10 a 14 días que tardan en recorrer el epidídimo adquieren la capacidad de moverse hacia adelante y de reconocer y unirse a la zona pelúcida del ovocito. En la cola del epidídimo quedan almacenados hasta la eyaculación.",
      n3:"Su función explica varios hechos: después de una vasectomía los testículos siguen produciendo espermatozoides, que simplemente se reabsorben; y la epididimitis, una de las causas más frecuentes de dolor escrotal en jóvenes, suele deberse a clamidia o gonorrea, se trata con antibióticos y conviene tratar también a las parejas sexuales para evitar la reinfección.",
      dato:"Seis metros de conducto enrollados en una estructura de apenas 5 cm.",
      conecta:["testiculos","deferente","tubulo"], temas:["Maduración de gametos","Salud sexual"],
      quiz:{q:"¿Un espermatozoide que acaba de salir del túbulo seminífero puede fecundar?", ops:["Sí, ya está completamente listo","No: adquiere movilidad y capacidad de unirse al ovocito durante su paso por el epidídimo","No, y solo madura dentro del útero"], ok:1,
        fb:"La maduración del epidídimo dura de 10 a 14 días; el último paso, la capacitación, ocurre después, dentro del tracto femenino.",
        wrong:["Si así fuera, el epidídimo sobraría. Al salir del túbulo el espermatozoide todavía no nada hacia adelante.","En el tracto femenino ocurre la capacitación, que es un paso final; pero la movilidad se adquiere antes, en el epidídimo."]}},

    {id:"deferente", nombre:"Conducto deferente", capa:"masculino", color:"#E0CDB0", pos:[3.90,-1.30,-0.50], lbl:[5.65,2.11,-1.13], anchor:[4.45,-0.36,-0.5],
      n1:"Tubo muscular de unos 45 cm que lleva los espermatozoides desde el epidídimo hasta la uretra.",
      n2:"Sube desde el escroto dentro del cordón espermático, entra en el abdomen, rodea la vejiga y se une al conducto de la vesícula seminal para formar el conducto eyaculador, que atraviesa la próstata. Su pared tiene una capa de músculo liso muy gruesa en relación con su calibre: en la eyaculación se contrae en ondas y empuja los espermatozoides con fuerza.",
      n3:"Es el punto donde se practica la vasectomía: se corta y se liga el conducto por ambos lados a través de una incisión mínima. Su eficacia supera el 99 %, no modifica las hormonas ni la erección ni la sensación del orgasmo, y el volumen del semen apenas cambia, porque los espermatozoides son menos del 1 % de ese volumen. No es inmediata: quedan espermatozoides más abajo, y por eso hace falta confirmar con un espermiograma a los tres meses. Y no protege de las infecciones de transmisión sexual.",
      dato:"Tras una vasectomía el semen sigue saliendo igual: los espermatozoides son menos del 1 % de su volumen.",
      conecta:["epididimo","vesiculas","prostata"], temas:["Anticoncepción","Músculo liso"],
      quiz:{q:"¿Qué cambia en el cuerpo después de una vasectomía?", ops:["Deja de producirse testosterona","Los espermatozoides ya no llegan al semen, pero las hormonas, la erección y la eyaculación siguen igual","Deja de producirse semen"], ok:1,
        fb:"El corte está en el conducto que transporta los gametos, no en las glándulas que fabrican el líquido ni en las que fabrican las hormonas.",
        wrong:["La testosterona la producen las células de Leydig del testículo y sale por la sangre, no por el conducto deferente: no se ve afectada.","El semen lo fabrican sobre todo las vesículas seminales y la próstata, que no se tocan en la operación."]}},

    {id:"vesiculas", nombre:"Vesículas seminales", capa:"masculino", color:"#C9A24F", pos:[3.30,0.40,-0.52], lbl:[4.55,1.55,-0.20], anchor:[3.06,0.36,-0.58],
      n1:"Dos glándulas alargadas y sacciformes, detrás de la vejiga, que aportan la mayor parte del líquido del semen.",
      n2:"Producen entre el 60 y el 70 % del volumen del eyaculado: un líquido viscoso y alcalino, rico en fructosa —el combustible que consumen los espermatozoides para mover su flagelo— y en prostaglandinas, que favorecen las contracciones del tracto femenino y ayudan al transporte. Su carácter alcalino neutraliza la acidez de la uretra y de la vagina, donde un pH de 4 inmovilizaría a los espermatozoides en pocos minutos.",
      n3:"De aquí sale una idea que conviene aclarar: «semen» y «espermatozoides» no son lo mismo. Un eyaculado normal mide de 1,5 a 5 mL y contiene al menos unos 15 a 16 millones de espermatozoides por mililitro, pero esas células representan menos del 1 % del volumen; el resto es el líquido de las vesículas seminales y de la próstata. Por eso un semen de aspecto normal no dice nada sobre la fertilidad: hace falta un espermiograma.",
      dato:"La fructosa del líquido seminal es el combustible con el que el espermatozoide mueve su cola.",
      conecta:["deferente","prostata","gametos"], temas:["Bioquímica","Reproducción"],
      quiz:{q:"¿Qué aportan sobre todo las vesículas seminales?", ops:["Los espermatozoides","La mayor parte del líquido del semen, con fructosa y prostaglandinas","Las hormonas masculinas"], ok:1,
        fb:"Los gametos vienen del testículo; las vesículas aportan el líquido que los nutre, los protege del pH ácido y ayuda a transportarlos.",
        wrong:["Los espermatozoides se fabrican en los túbulos seminíferos del testículo y maduran en el epidídimo.","La testosterona la producen las células de Leydig del testículo y viaja por la sangre, no por el semen."]}},

    {id:"prostata", nombre:"Próstata", capa:"masculino", color:"#B58B6A", pos:[3.30,-0.10,-0.10], lbl:[5.3,0.54,-0.61],
      n1:"Glándula del tamaño de una nuez que rodea el primer tramo de la uretra, justo debajo de la vejiga.",
      n2:"Aporta entre el 20 y el 30 % del volumen del semen: un líquido lechoso y ligeramente ácido con enzimas, entre ellas el antígeno prostático específico (PSA), que licua el coágulo que el semen forma al salir y libera a los espermatozoides. En la eyaculación su músculo liso se contrae y, al mismo tiempo, el esfínter interno de la vejiga se cierra: por eso nunca salen orina y semen a la vez.",
      n3:"Al rodear la uretra, cualquier aumento de tamaño se nota al orinar. La hiperplasia benigna aparece en la mayoría de los varones a partir de los 50 años y no es cáncer. El cáncer de próstata es distinto: es uno de los cánceres más frecuentes en varones en el Ecuador y suele ser silencioso al principio, por lo que la conversación sobre el tamizaje con PSA y tacto rectal se recomienda a partir de los 50 años, o de los 45 si hay antecedentes familiares.",
      dato:"El PSA no está en la sangre para diagnosticar: su función real es licuar el semen.",
      conecta:["vesiculas","uretra-pene","deferente"], temas:["Glándulas anexas","Salud del varón"],
      quiz:{q:"¿Por qué no salen orina y semen a la vez?", ops:["Porque usan conductos completamente separados","Porque en la eyaculación el esfínter interno de la vejiga se cierra","Porque el semen empuja la orina de vuelta al riñón"], ok:1,
        fb:"La uretra masculina es un conducto compartido: lo que cambia es qué puerta está abierta en cada momento.",
        wrong:["Comparten la uretra en casi todo su recorrido: por eso hace falta un mecanismo que los separe en el tiempo.","La orina nunca vuelve al riñón: los uréteres la conducen en un solo sentido."]}},

    {id:"uretra-pene", nombre:"Uretra y pene", capa:"masculino", color:"#C98275", pos:[2.98,-1.30,0.55], lbl:[6.5,-1.09,-0.2],
      n1:"La uretra masculina conduce orina y semen hasta el exterior; el pene la aloja y es el órgano de la cópula.",
      n2:"El pene tiene tres columnas de tejido eréctil: dos cuerpos cavernosos y, por debajo, el cuerpo esponjoso, que rodea y protege la uretra para que no se cierre durante la erección. La erección no es un músculo que se contrae: es un fenómeno vascular. Un estímulo nervioso libera óxido nítrico, las arterias se dilatan, los espacios del tejido eréctil se llenan de sangre y esa misma presión comprime las venas de salida, de modo que la sangre queda retenida.",
      n3:"El glande está cubierto por el prepucio; retraerlo y asear la zona con agua evita infecciones, sin necesidad de jabones agresivos. Sobre el preservativo, que es el único método que actúa a la vez contra el embarazo y contra las ITS, la evidencia es concreta: se coloca antes de cualquier contacto genital, no solo antes de la eyaculación, porque el líquido preseminal puede arrastrar espermatozoides; se deja un espacio en la punta y se saca el aire; no se usan dos a la vez, porque la fricción los rompe; y no se combinan con lubricantes de aceite o vaselina, que degradan el látex. Bien usado falla alrededor del 2 % anual, y en el uso real de la población, alrededor del 13 %; casi toda esa diferencia son errores de colocación y de momento, no fallos del material.",
      dato:"El preservativo se coloca antes de cualquier contacto genital, no justo antes de la eyaculación.",
      conecta:["prostata","vesiculas","deferente"], temas:["Fisiología vascular","Prevención","Salud sexual"],
      partes:[
        {n:"Uretra", d:"El conducto compartido por orina y semen; discurre dentro del cuerpo esponjoso.", at:[3.10,-1.05,0.38], sub:"uretra"},
        {n:"Cuerpos eréctiles", d:"Dos cuerpos cavernosos y un cuerpo esponjoso. Se llenan de sangre en la erección.", at:[2.85,-1.60,0.80], sub:"cuerpos"}
      ],
      quiz:{q:"¿Por qué el preservativo debe colocarse antes de cualquier contacto genital?", ops:["Porque después ya no encaja bien","Porque el líquido preseminal puede arrastrar espermatozoides y porque las ITS se transmiten por contacto de piel y mucosas","Porque así dura más tiempo"], ok:1,
        fb:"Varias infecciones, como el VPH y el herpes, se transmiten por contacto de piel y mucosas aunque no haya eyaculación.",
        wrong:["El ajuste no es el problema: el problema es que ya hubo contacto sin barrera.","La duración del preservativo no depende del momento en que se coloque, sino de usarlo una sola vez y conservarlo bien."]}},

    /* ---------------- LUPA: GAMETOGÉNESIS ---------------- */
    {id:"foliculo", nombre:"Folículo ovárico (lupa)", capa:"lupa", color:"#E7B9C6", pos:[-3.60,-2.95,1.10], lbl:[-5.45,-4.51,1.72],
      n1:"El folículo maduro visto por dentro: el ovocito, rodeado de células de la granulosa, junto a una cavidad llena de líquido llamada antro.",
      n2:"El folículo es a la vez cuna y glándula. Las células de la granulosa nutren al ovocito y fabrican estrógenos a partir de los andrógenos que les pasan las células de la teca, y el líquido del antro va creciendo hasta que el folículo maduro alcanza unos 2 cm y abomba la superficie del ovario. La ovogénesis que ocurre dentro tiene un calendario insólito: la meiosis I empieza antes de nacer y se detiene en profase I; cada mes, el folículo dominante la termina y expulsa el primer corpúsculo polar; la meiosis II arranca y vuelve a detenerse en metafase II, y solo se completa si hay fecundación, expulsando entonces el segundo corpúsculo polar. Resultado: un único gameto funcional por cada ovogonia, más dos o tres corpúsculos polares que se degeneran.",
      n3:"¿Por qué un solo gameto y no cuatro? Porque el reparto del citoplasma es deliberadamente desigual. El ovocito conserva casi todo: mitocondrias, ribosomas, ARN y proteínas maternas que sostendrán las primeras divisiones del embrión, cuando su propio genoma todavía no se ha activado. Los corpúsculos polares se llevan cromosomas, pero casi nada de citoplasma: sirven para descartar material genético sobrante, no para hacer otro gameto. Esa detención de décadas tiene un costo: cuanto más tiempo lleva el ovocito con sus cromosomas apareados, mayor es la probabilidad de que se separen mal (no disyunción), y por eso la frecuencia de trisomías aumenta con la edad materna. Si quieres repasar las etapas de la meiosis, están en el módulo de procesos celulares.",
      dato:"Un ovocito puede pasar cuarenta años detenido en la profase I antes de terminar su primera división.",
      conecta:["ovarios","gametos","tubulo"], temas:["Meiosis","Ovogénesis","Genética"],
      partes:[
        {n:"Ovocito", d:"La célula que completará la meiosis. Conserva casi todo el citoplasma del reparto.", at:[-3.88,-3.25,1.20], sub:"ovocito"},
        {n:"Células de la granulosa", d:"Lo nutren y fabrican los estrógenos del ciclo a partir de los andrógenos de la teca.", at:[-2.90,-2.95,1.13], sub:"granulosa"},
        {n:"Antro", d:"La cavidad llena de líquido folicular que crece hasta que el folículo se rompe.", at:[-3.60,-2.62,1.25], sub:"antro"}
      ],
      quiz:{q:"¿Cuántos gametos funcionales resultan de una ovogonia al terminar la meiosis?", ops:["Cuatro, como en la espermatogénesis","Uno solo, más dos o tres corpúsculos polares que se degeneran","Dos, uno por cada división meiótica"], ok:1,
        fb:"El reparto desigual del citoplasma deja todas las reservas en una sola célula: la que tendrá que sostener las primeras divisiones del embrión.",
        wrong:["Cuatro es el resultado de la espermatogénesis, donde las cuatro células reciben un reparto equitativo y casi no llevan citoplasma.","Las dos divisiones sí ocurren, pero de las cuatro células resultantes tres son corpúsculos polares sin citoplasma y se degeneran."]}},

    {id:"tubulo", nombre:"Túbulo seminífero (lupa)", capa:"lupa", color:"#4E7FC4", pos:[-1.35,-3.05,1.10], lbl:[-4.16,-4.81,2.01], anchor:[-1.26,-2.99,1.14],
      n1:"Un corte transversal del tubo donde se fabrican los espermatozoides: las células se ordenan en capas, desde la pared hasta el centro.",
      n2:"Ese orden es el orden del proceso. Pegadas a la pared están las espermatogonias, que se dividen por mitosis y mantienen la reserva; hacia adentro, los espermatocitos primarios entran en la meiosis I y dan dos espermatocitos secundarios; la meiosis II produce cuatro espermátidas, y la espermiogénesis las transforma en espermatozoides: pierden casi todo el citoplasma, compactan el núcleo, forman el acrosoma y desarrollan el flagelo. Cada ronda completa dura unos 74 días y el proceso es continuo: distintos segmentos del túbulo están en distintas etapas al mismo tiempo, desde la pubertad y sin interrupción.",
      n3:"Las células de Sertoli son el andamio de todo esto: se extienden desde la pared hasta el lumen, sostienen y nutren a las células en formación, se comen los restos de citoplasma que descartan las espermátidas y, unidas entre sí por uniones estrechas, forman la barrera hematotesticular, que aísla a los gametos de la sangre. Esa barrera es imprescindible, porque los espermatozoides aparecen en la pubertad, mucho después de que el sistema inmunitario aprendiera a distinguir lo propio: sin ella, el cuerpo los atacaría como extraños. Un adulto produce del orden de 100 a 200 millones de espermatozoides al día, más de mil por segundo. El calor sostenido, el tabaco y los esteroides anabolizantes reducen esa producción; como el ciclo dura unos 74 días, los efectos tardan meses en aparecer y también meses en revertirse.",
      dato:"La espermatogénesis completa dura unos 74 días y no se detiene nunca desde la pubertad.",
      conecta:["testiculos","gametos","foliculo"], temas:["Meiosis","Espermatogénesis","Inmunología"],
      partes:[
        {n:"Espermatogonias", d:"En la pared del túbulo. Se dividen por mitosis y mantienen la reserva de por vida.", at:[-0.61,-3.05,1.16], sub:"espermatogonias"},
        {n:"Espermatocitos", d:"En pleno proceso meiótico. Cada espermatocito primario dará cuatro células.", at:[-1.35,-2.49,1.16], sub:"espermatocitos"},
        {n:"Espermátidas", d:"Ya haploides. Se transforman en espermatozoides perdiendo citoplasma y formando el flagelo.", at:[-1.35,-3.43,1.16], sub:"espermatidas"},
        {n:"Células de Sertoli", d:"Van de la pared al lumen: nutren, sostienen y forman la barrera hematotesticular.", at:[-1.95,-2.70,1.18], sub:"sertoli"}
      ],
      quiz:{q:"¿Cuántos espermatozoides resultan de un espermatocito primario tras las dos divisiones meióticas?", ops:["Uno","Dos","Cuatro"], ok:2,
        fb:"El reparto del citoplasma es equitativo y las cuatro células llegan a ser gametos funcionales: es la diferencia clave con la ovogénesis.",
        wrong:["Uno es el resultado de la ovogénesis, donde tres de las cuatro células acaban como corpúsculos polares.","Dos células es el resultado de una mitosis, o el producto intermedio de la meiosis I; todavía falta la meiosis II."]}},

    {id:"gametos", nombre:"Gametos a la misma escala (lupa)", capa:"lupa", color:"#F2C96B", pos:[0.80,-3.55,1.20], lbl:[4.47,-4.46,0.6],
      n1:"Los dos gametos dibujados con la misma regla: el ovocito mide unos 0,12 mm de diámetro y el espermatozoide unos 0,05 mm de largo, de los cuales casi todo es cola.",
      n2:"El ovocito es la célula más grande del cuerpo humano —apenas visible a simple vista como un punto— y el espermatozoide, una de las más pequeñas: el ovocito tiene alrededor de diez mil veces su volumen. La diferencia no es un capricho, es una división del trabajo. El espermatozoide es un vehículo reducido al mínimo: cabeza con el núcleo haploide y el acrosoma cargado de enzimas, pieza intermedia repleta de mitocondrias y un flagelo de unos 50 µm que lo impulsa a un ritmo de unos 2 a 3 mm por minuto. El ovocito aporta el otro medio genoma y, además, todo lo demás: citoplasma, ribosomas, ARN y las mitocondrias. De ahí que el ADN mitocondrial se herede solo por vía materna: las pocas mitocondrias que entran con el espermatozoide se destruyen.",
      n3:"De esta diferencia depende también el sexo cromosómico. El ovocito siempre aporta un cromosoma X; el espermatozoide puede aportar un X o un Y, y es esa lotería la que define el sexo cromosómico del embrión: lo determina el gameto paterno. Hasta la sexta semana el embrión tiene gónadas indiferenciadas y los dos juegos de conductos; hacia la séptima, el gen SRY del cromosoma Y enciende el programa testicular y el testículo naciente produce testosterona y hormona antimülleriana, que desarrollan un camino y hacen regresar el otro. Sin SRY, la gónada sigue la vía ovárica. Conviene precisar dos cosas: existen variaciones del desarrollo sexual, en que este proceso sigue rutas distintas, y el sexo cromosómico es un dato biológico que no describe por sí mismo la identidad de género de una persona.",
      dato:"El ovocito tiene unas diez mil veces el volumen de un espermatozoide; el ADN mitocondrial se hereda solo de la madre.",
      conecta:["foliculo","tubulo","trompas"], temas:["Genética","Determinación del sexo","Herencia mitocondrial"],
      partes:[
        {n:"Ovocito con zona pelúcida", d:"La envoltura transparente que el espermatozoide debe atravesar y que después bloquea la entrada de otros.", at:[0.25,-3.55,1.85], sub:"ovulo"},
        {n:"Corona radiada", d:"Las células de la granulosa que viajan pegadas al ovocito tras la ovulación.", at:[0.25,-2.72,1.30], sub:"corona"},
        {n:"Espermatozoide", d:"Cabeza con acrosoma, pieza intermedia con mitocondrias y flagelo. Dibujado a la misma escala que el ovocito.", at:[1.85,-3.38,1.25], sub:"esperma"}
      ],
      quiz:{q:"¿De qué gameto depende el sexo cromosómico del embrión?", ops:["Del ovocito, que puede aportar X o Y","Del espermatozoide, que aporta X o Y mientras el ovocito siempre aporta X","De los dos por igual, al azar"], ok:1,
        fb:"El gen SRY del cromosoma Y enciende hacia la séptima semana el desarrollo testicular; sin él, la gónada sigue la vía ovárica.",
        wrong:["El ovocito proviene de una persona con dos cromosomas X, así que solo puede aportar un X: nunca un Y.","No es simétrico: uno de los dos gametos siempre aporta lo mismo. El azar está en cuál de los dos tipos de espermatozoide llega primero."]}}
  ],
  guiada:[
    {tipo:"select", txt:"Empieza por donde se forman los gametos femeninos: selecciona los <b>ovarios</b>.", target:"ovarios"},
    {tipo:"select", txt:"Ahora busca el lugar donde ocurre realmente la fecundación. Pista: no es el útero, y tiene flecos en el extremo.", target:"trompas"},
    {tipo:"anim", txt:"Activa la animación <b>Ciclo ovárico y ciclo uterino</b> y bájale la velocidad. Observa a la vez tres cosas: el folículo en el ovario, el grosor del endometrio y las cuatro curvas hormonales de arriba.", target:"ciclo"},
    {tipo:"select", txt:"Con la animación andando, selecciona el <b>útero</b> y fíjate en qué días el endometrio crece y en qué días se desprende.", target:"utero"},
    {tipo:"select", txt:"Pasa al otro sistema: selecciona los <b>testículos</b>, abiertos como en un corte para ver los túbulos seminíferos.", target:"testiculos"},
    {tipo:"select", txt:"Entra en la lupa y selecciona el <b>túbulo seminífero en corte</b>: las capas que ves son las etapas del proceso.", target:"tubulo"},
    {tipo:"anim", txt:"Activa <b>Espermatogénesis</b> y observa el recorrido de una célula desde la pared hasta el lumen. Son unos 74 días.", target:"espermatogenesis"},
    {tipo:"select", txt:"Compara ahora las dos gametogénesis: selecciona el <b>folículo ovárico en corte</b> y fíjate en cuántos gametos funcionales salen de una ovogonia.", target:"foliculo"},
    {tipo:"anim", txt:"Activa <b>Fecundación e implantación</b> y sigue el recorrido completo: dónde se encuentran los gametos, qué impide que entre un segundo espermatozoide y dónde termina el viaje.", target:"fecundacion"},
    {tipo:"text", txt:"Explica con tus palabras por qué la ovogénesis produce un solo gameto y la espermatogénesis cuatro, y qué consecuencia tiene esa diferencia para el embrión. Menciona el citoplasma, los corpúsculos polares y las mitocondrias. Tu respuesta se guardará en el cuaderno."}
  ]
};

Object.assign(BIO.activities, {
  "explorar-reproductor":{t:"Explorar el sistema reproductor", unidad:6, peso:15, xp:60},
  "guiada-reproductor":{t:"Exploración guiada del sistema reproductor", unidad:6, peso:10, xp:80},
  "reto-reproductor":{t:"Reto: el ciclo ovárico y uterino como mecanismo", unidad:6, peso:10, xp:70}
});

/* =====================================================================
   MODELO 3D
   ===================================================================== */
function buildRepro(E){
  orgvFrame(E, 1.42);
  const low = E.low, D = BIO.repro;
  const S = Object.fromEntries(D.structures.map(s=>[s.id,s]));
  const CEN = new THREE.Vector3(0,-0.4,0);
  const add = (id, meshes, extra={}) => { const s = S[id];
    const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, explodeDir:V3(s.pos).sub(CEN).normalize() }, extra));
    E.addLabel(id, s.nombre, s.lbl); return p; };
  const RND = Kit.rng(29);
  const basic = c => new THREE.MeshBasicMaterial({ color:c, toneMapped:false });
  const onTop = c => new THREE.MeshBasicMaterial({ color:c, toneMapped:false, depthTest:false });

  /* =====================================================================
     SISTEMA FEMENINO
     ===================================================================== */
  const UC = new THREE.Vector3(-2.80, 0.55, 0);
  const pearW = y => 0.52 + 0.46*smooth01((y+0.5)/1.0);

  /* --- útero abierto: miometrio con ventana + endometrio --- */
  const myo = new THREE.Mesh(Kit.sculpt({ w: low?40:66, h: low?30:48,
      phiStart:0.875*Math.PI, phiLength:1.25*Math.PI,
      shape: d => new THREE.Vector3(d.x*pearW(d.y)*1.05, d.y*0.88, d.z*pearW(d.y)*0.62),
      disp: p => 0.014*Kit.fbm(p.x*4.5, p.y*4.5, p.z*4.5, 3) }),
    Kit.tissue({ color:orgvTex.lin(0xD4887E), tex:'tissue', rep:[3,2], bump:0.018, rough:0.55, coat:0.45, coatRough:0.28, env:0.7, side:THREE.DoubleSide }));
  myo.position.copy(UC); myo.userData.sub = 'miometrio';
  const endo = new THREE.Mesh(Kit.sculpt({ w: low?28:46, h: low?22:34,
      shape: d => new THREE.Vector3(d.x*pearW(d.y)*0.62, d.y*0.60, d.z*pearW(d.y)*0.32) }),
    Kit.tissue({ color:orgvTex.lin(0xC0505E), rough:0.45, coat:0.6, coatRough:0.22, env:0.7 }));
  endo.position.copy(UC).add(new THREE.Vector3(0,0.03,0.02)); endo.userData.sub = 'endometrio';
  add('utero', [myo, endo]);

  /* --- cuello uterino y vagina --- */
  add('cuello-uterino', [new THREE.Mesh(
    Kit.taper([[-2.80,-0.14,0.00],[-2.80,-0.42,0.02],[-2.80,-0.86,0.05]], 0.30, 0.25, { seg: low?10:18, rad: low?10:16 }),
    Kit.tissue({ color:orgvTex.lin(0xDDA698), rough:0.46, coat:0.5, coatRough:0.25, env:0.7 }))]);
  add('vagina', [new THREE.Mesh(
    Kit.taper([[-2.80,-0.80,0.04],[-2.79,-1.35,0.10],[-2.78,-2.02,0.19]], 0.40, 0.46, { seg: low?12:22, rad: low?12:18, bumpy:0.05, bf:9, seed:3 }),
    Kit.tissue({ color:orgvTex.lin(0xD39A90), tex:'tissue', rep:[3,2], bump:0.014, rough:0.52, coat:0.45, coatRough:0.26, env:0.7 }))]);

  /* --- trompas con fimbrias + ovarios --- */
  const tubeG = [], fimG = [], OV = {}, AMP = {};
  [-1,1].forEach(sg => {
    const pts = [[-2.80+sg*0.52, 1.14, 0.00], [-2.80+sg*1.02, 1.44, 0.02],
                 [-2.80+sg*1.50, 1.44, 0.05], [-2.80+sg*1.78, 1.14, 0.06]];
    tubeG.push(Kit.taper(pts, 0.085, 0.175, { seg: low?16:30, rad: low?8:12 }));
    const endP = V3(pts[3]); AMP[sg] = endP;
    OV[sg] = new THREE.Vector3(-2.80+sg*1.78, 0.62, 0.05);
    for (let i=0;i<7;i++){
      const a = -0.5 + i/6*2.1;
      const dv = new THREE.Vector3(sg*Math.sin(a)*0.60, -0.80, Math.cos(a)*0.45).normalize();
      fimG.push(Kit.taper([endP.clone().addScaledVector(dv,0.09),
                           endP.clone().addScaledVector(dv,0.26).add(new THREE.Vector3(0,0,0.04)),
                           endP.clone().addScaledVector(dv,0.42+0.06*Math.sin(i*2))], 0.055, 0.016, { seg:8, rad:6 }));
    }
  });
  const tubeMesh = new THREE.Mesh(Kit.merge(tubeG), Kit.tissue({ color:orgvTex.lin(0xE2A698), tex:'tissue', rep:[5,1], bump:0.012, rough:0.48, coat:0.5, coatRough:0.25, env:0.7 }));
  tubeMesh.userData.sub = 'ampolla';
  const fimMesh = new THREE.Mesh(Kit.merge(fimG), Kit.tissue({ color:orgvTex.lin(0xE9B6A8), rough:0.46, coat:0.5, env:0.7 }));
  fimMesh.userData.sub = 'fimbrias';
  add('trompas', [tubeMesh, fimMesh]);

  const ovMat = Kit.tissue({ color:orgvTex.lin(0xE6CDB4), tex:'tissue', rep:[3,2], bump:0.02, rough:0.52, coat:0.45, coatRough:0.26, env:0.7 });
  const ovMeshes = [-1,1].map(sg => {
    const m = new THREE.Mesh(Kit.sculpt({ w: low?28:46, h: low?20:34,
      shape: d => new THREE.Vector3(d.x*0.40, d.y*0.30, d.z*0.27),
      disp: p => 0.022*Kit.fbm(p.x*6+sg, p.y*6, p.z*6, 3) }), ovMat);
    m.position.copy(OV[sg]); m.rotation.z = sg*0.25; m.userData.sub = 'foliculos'; return m;
  });
  /* folículo visible en el ovario izquierdo: crece y se transforma en cuerpo lúteo */
  const folMat = Kit.tissue({ color:0xE9AFC6, rough:0.4, coat:0.5, env:0.5 });
  const folMesh = new THREE.Mesh(new THREE.SphereGeometry(1, low?12:18, low?9:13), folMat);
  folMesh.position.copy(OV[-1]).add(new THREE.Vector3(-0.04,0.06,0.22)); folMesh.scale.setScalar(0.07);
  folMesh.userData.sub = 'luteo';
  add('ovarios', ovMeshes.concat([folMesh]));

  /* =====================================================================
     SISTEMA MASCULINO
     ===================================================================== */
  const TST = [new THREE.Vector3(3.42,-2.70,-0.18), new THREE.Vector3(4.62,-2.56,-0.30)];
  const PRO = new THREE.Vector3(3.30,-0.10,-0.10);
  const albMat = Kit.tissue({ color:orgvTex.lin(0xEDE4D6), rough:0.4, coat:0.65, coatRough:0.2, env:0.75, side:THREE.DoubleSide });
  const stubMat = Kit.tissue({ color:orgvTex.lin(0xD9A488), rough:0.55, coat:0.3, env:0.6 });
  const testMeshes = [];
  TST.forEach((c,ti) => {
    const sh = new THREE.Mesh(Kit.sculpt({ w: low?30:50, h: low?22:36,
      phiStart:0.875*Math.PI, phiLength:1.25*Math.PI,
      shape: d => new THREE.Vector3(d.x*0.50, d.y*0.62, d.z*0.46) }), albMat);
    sh.position.copy(c); sh.userData.sub = 'albuginea'; testMeshes.push(sh);
    const gs = [];
    for (let k=0;k<5;k++){
      const pts = [], a0 = RND()*6.28;
      for (let j=0;j<=14;j++){ const t = j/14, a = a0 + t*7.6, rr = 0.38*(1-0.42*t);
        pts.push(new THREE.Vector3(c.x + Math.cos(a)*rr*0.82, c.y - 0.42 + t*0.84 + 0.06*Math.sin(a*2), c.z + Math.sin(a)*rr*0.70 + 0.06)); }
      gs.push(Kit.taper(pts, 0.038, 0.030, { seg: low?18:32, rad:5 }));
    }
    const tm = new THREE.Mesh(Kit.merge(gs), stubMat); tm.userData.sub = 'tubulos'; testMeshes.push(tm);
  });
  add('testiculos', testMeshes);

  const epiG = [], defG = [];
  TST.forEach((c,ti) => {
    const sx = ti ? 1 : -1;
    epiG.push(Kit.taper([ c.clone().add(new THREE.Vector3(sx*0.04, 0.60,-0.30)),
                          c.clone().add(new THREE.Vector3(sx*0.40, 0.20,-0.38)),
                          c.clone().add(new THREE.Vector3(sx*0.44,-0.30,-0.36)),
                          c.clone().add(new THREE.Vector3(sx*0.28,-0.62,-0.30)) ],
                        0.10, 0.13, { seg: low?14:26, rad: low?8:12, bumpy:0.17, bf:9, seed:4+ti }));
    defG.push(Kit.taper([ c.clone().add(new THREE.Vector3(sx*0.28,-0.62,-0.30)),
                          new THREE.Vector3(c.x + sx*0.46, c.y+0.30,-0.42),
                          new THREE.Vector3(c.x + sx*0.50,-1.30,-0.50),
                          new THREE.Vector3(c.x + sx*0.30,-0.55,-0.52),
                          new THREE.Vector3(PRO.x + sx*0.42, 0.00,-0.44),
                          new THREE.Vector3(PRO.x + sx*0.10, 0.02,-0.22) ],
                        0.075, 0.065, { seg: low?22:40, rad: low?8:10 }));
  });
  add('epididimo', [new THREE.Mesh(Kit.merge(epiG), Kit.tissue({ color:orgvTex.lin(0xCFA888), rough:0.5, coat:0.45, coatRough:0.26, env:0.65 }))]);
  add('deferente', [new THREE.Mesh(Kit.merge(defG), Kit.tissue({ color:orgvTex.lin(0xE8DCC6), rough:0.42, coat:0.5, env:0.7 }))]);

  const vsG = [-1,1].map(sx => Kit.taper([
      new THREE.Vector3(PRO.x + sx*0.68, 0.78,-0.62),
      new THREE.Vector3(PRO.x + sx*0.46, 0.44,-0.58),
      new THREE.Vector3(PRO.x + sx*0.26, 0.12,-0.42),
      new THREE.Vector3(PRO.x + sx*0.10, 0.00,-0.26) ], 0.21, 0.07,
      { seg: low?16:28, rad: low?9:13, bumpy:0.32, bf:15, seed: sx>0?8:12 }));
  add('vesiculas', [new THREE.Mesh(Kit.merge(vsG), Kit.tissue({ color:orgvTex.lin(0xDEC89C), rough:0.48, coat:0.45, coatRough:0.26, env:0.7 }))]);

  const pro = new THREE.Mesh(Kit.sculpt({ w: low?28:46, h: low?20:34,
      shape: d => new THREE.Vector3(d.x*0.46, d.y*0.38, d.z*0.40),
      disp: p => -0.05*Math.exp(-(p.x*p.x/0.02 + (p.z+0.3)*(p.z+0.3)/0.05)) + 0.015*Kit.fbm(p.x*6,p.y*6,p.z*6,3) }),
    Kit.tissue({ color:orgvTex.lin(0xC9A088), tex:'tissue', rep:[3,2], bump:0.02, rough:0.52, coat:0.42, coatRough:0.28, env:0.7 }));
  pro.position.copy(PRO);
  add('prostata', [pro]);

  const urePts = [[3.30,0.22,-0.22],[3.30,-0.10,-0.10],[3.26,-0.48,0.06],[3.10,-1.05,0.38],[2.85,-1.60,0.70],[2.58,-2.02,0.98]];
  const ure = new THREE.Mesh(Kit.taper(urePts, 0.075, 0.062, { seg: low?20:36, rad: low?8:11 }),
    Kit.tissue({ color:orgvTex.lin(0xEAC9B8), rough:0.42, coat:0.5, env:0.7 }));
  ure.userData.sub = 'uretra';
  const shaft = new THREE.Mesh(Kit.taper(urePts.slice(2), 0.24, 0.26, { seg: low?16:30, rad: low?12:18 }),
    Kit.tissue({ color:orgvTex.lin(0xD39586), tex:'tissue', rep:[4,2], bump:0.014, rough:0.52, coat:0.4, env:0.65, transparent:true, opacity:0.62 }));
  shaft.userData.sub = 'cuerpos'; shaft.renderOrder = 3;
  const glansG = new THREE.SphereGeometry(0.29, low?14:20, low?10:15);
  glansG.scale(0.95,1,1.05); glansG.translate(2.52,-2.12,1.06);
  const glans = new THREE.Mesh(glansG, Kit.tissue({ color:orgvTex.lin(0xCB8074), rough:0.46, coat:0.45, env:0.65, transparent:true, opacity:0.75 }));
  glans.userData.sub = 'cuerpos'; glans.renderOrder = 3;
  add('uretra-pene', [ure, shaft, glans]);

  /* =====================================================================
     LUPAS
     ===================================================================== */
  const ringMat = basic(0x3FA7BD);
  const loupe = (center, r, leadTo) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.026, 8, low?36:60), ringMat);
    ring.position.copy(center); E.scene.add(ring);
    if (leadTo){ const dv = leadTo.clone().sub(center).normalize();
      E.scene.add(new THREE.Mesh(Kit.taper([center.clone().addScaledVector(dv,r), leadTo], 0.012, 0.012, { seg:4, rad:5 }), ringMat)); }
  };

  /* --- folículo ovárico en corte --- */
  const FC = V3(S.foliculo.pos);
  loupe(FC, 0.98, OV[-1].clone().add(new THREE.Vector3(-0.05,-0.12,0.20)));
  const granG = [];
  for (let ring=0; ring<2; ring++){
    const rr = 0.72 - ring*0.15, n = ring ? 13 : 17;
    for (let i=0;i<n;i++){ const a = i/n*6.2832 + ring*0.24;
      const g = new THREE.SphereGeometry(0.072, low?8:11, low?6:8);
      g.translate(FC.x + Math.cos(a)*rr, FC.y + Math.sin(a)*rr, FC.z + 0.04*Math.sin(a*3)); granG.push(g); }
  }
  const granM = new THREE.Mesh(Kit.merge(granG), Kit.tissue({ color:0xE7B9C6, rough:0.5, coat:0.3, env:0.5 }));
  granM.userData.sub = 'granulosa';
  const antro = new THREE.Mesh(new THREE.SphereGeometry(0.52, low?16:24, low?12:16),
    Kit.tissue({ color:0x9FD3E0, rough:0.18, coat:0.85, env:0.7, transparent:true, opacity:0.42 }));
  antro.position.copy(FC); antro.scale.z = 0.42; antro.userData.sub = 'antro';
  const OOC = FC.clone().add(new THREE.Vector3(-0.28,-0.30,0.12));
  const ooc = new THREE.Mesh(new THREE.SphereGeometry(0.20, low?14:20, low?10:15),
    Kit.tissue({ color:0xF2C96B, rough:0.4, coat:0.5, env:0.55 }));
  ooc.position.copy(OOC); ooc.userData.sub = 'ovocito';
  const corG = [];
  for (let i=0;i<10;i++){ const a = i/10*6.2832; const g = new THREE.SphereGeometry(0.056, 8, 6);
    g.translate(OOC.x + Math.cos(a)*0.27, OOC.y + Math.sin(a)*0.27, OOC.z + 0.03*Math.cos(a*2)); corG.push(g); }
  const corM = new THREE.Mesh(Kit.merge(corG), Kit.tissue({ color:0xF0CBD8, rough:0.5, coat:0.3, env:0.5 }));
  corM.userData.sub = 'ovocito';
  const teca = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.05, 8, low?30:48),
    Kit.tissue({ color:0xC98A9A, rough:0.55, coat:0.2, env:0.45 }));
  teca.position.copy(FC); teca.userData.sub = 'granulosa';
  add('foliculo', [granM, antro, ooc, corM, teca], { explodeDir:new THREE.Vector3(-0.9,-0.3,0.4).normalize() });

  /* --- túbulo seminífero en corte --- */
  const TC = V3(S.tubulo.pos);
  loupe(TC, 0.98, TST[0].clone().add(new THREE.Vector3(-0.18,0.18,0.26)));
  const pared = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.05, 8, low?30:48),
    Kit.tissue({ color:0xBFA98A, rough:0.55, coat:0.2, env:0.45 }));
  pared.position.copy(TC); pared.userData.sub = 'espermatogonias';
  const LAYERS = [
    { r:0.74, n:16, s:0.085, col:0x3E7CC4, sub:'espermatogonias' },
    { r:0.56, n:13, s:0.095, col:0x7B4BB0, sub:'espermatocitos' },
    { r:0.38, n:11, s:0.068, col:0x46B9A8, sub:'espermatidas' }
  ];
  const tubMeshes = [pared];
  LAYERS.forEach(L => {
    const gs = [];
    for (let i=0;i<L.n;i++){ const a = i/L.n*6.2832 + L.r;
      const g = new THREE.SphereGeometry(L.s, low?8:11, low?6:8);
      g.translate(TC.x + Math.cos(a)*L.r, TC.y + Math.sin(a)*L.r, TC.z + 0.03*Math.sin(a*2)); gs.push(g); }
    const m = new THREE.Mesh(Kit.merge(gs), Kit.tissue({ color:L.col, rough:0.42, coat:0.3, coatRough:0.25, env:0.5 }));
    m.userData.sub = L.sub; tubMeshes.push(m);
  });
  const serG = [];
  for (let i=0;i<5;i++){ const a = i/5*6.2832 + 0.35;
    serG.push(Kit.taper([ new THREE.Vector3(TC.x + Math.cos(a)*0.84, TC.y + Math.sin(a)*0.84, TC.z-0.04),
                          new THREE.Vector3(TC.x + Math.cos(a)*0.50, TC.y + Math.sin(a)*0.50, TC.z-0.02),
                          new THREE.Vector3(TC.x + Math.cos(a)*0.16, TC.y + Math.sin(a)*0.16, TC.z) ], 0.10, 0.045, { seg:10, rad:7 }));
  }
  const serM = new THREE.Mesh(Kit.merge(serG), Kit.tissue({ color:0xD8A93E, rough:0.5, coat:0.25, env:0.5 }));
  serM.userData.sub = 'sertoli'; tubMeshes.push(serM);
  const lumG = [];
  for (let i=0;i<6;i++){ const a = i/6*6.2832 + 0.5;
    const hc = new THREE.Vector3(TC.x + Math.cos(a)*0.16, TC.y + Math.sin(a)*0.16, TC.z+0.04);
    const g = new THREE.SphereGeometry(0.045, 8, 6); g.scale(1.4,0.8,0.8); g.translate(hc.x,hc.y,hc.z); lumG.push(g);
    lumG.push(Kit.taper([hc, hc.clone().add(new THREE.Vector3(Math.cos(a)*0.16, Math.sin(a)*0.16, 0.02))], 0.012, 0.006, { seg:5, rad:5 }));
  }
  const lumM = new THREE.Mesh(Kit.merge(lumG), Kit.tissue({ color:0x2FA8C4, rough:0.4, coat:0.4, env:0.55 }));
  lumM.userData.sub = 'espermatidas'; tubMeshes.push(lumM);
  add('tubulo', tubMeshes, { explodeDir:new THREE.Vector3(-0.3,-0.5,0.6).normalize() });

  /* --- los dos gametos a escala real entre sí (1 µm = 0,01 unidades) --- */
  const GC = V3(S.gametos.pos);
  loupe(GC, 1.05, null);
  const OVU = GC.clone().add(new THREE.Vector3(-0.42,0.02,0.10));
  const ovulo = new THREE.Mesh(new THREE.SphereGeometry(0.50, low?18:26, low?13:19),
    Kit.tissue({ color:0xF2C96B, rough:0.4, coat:0.5, env:0.55 }));
  ovulo.position.copy(OVU); ovulo.userData.sub = 'ovulo';
  const zona = new THREE.Mesh(new THREE.SphereGeometry(0.60, low?16:24, low?12:16),
    Kit.tissue({ color:0xF7E6C2, rough:0.15, coat:0.9, env:0.7, transparent:true, opacity:0.35 }));
  zona.position.copy(OVU); zona.userData.sub = 'ovulo';
  const corG2 = [];
  for (let i=0;i<16;i++){ const a = i/16*6.2832; const g = new THREE.SphereGeometry(0.10, 8, 6);
    g.translate(OVU.x + Math.cos(a)*0.70, OVU.y + Math.sin(a)*0.70, OVU.z + 0.05*Math.sin(a*3)); corG2.push(g); }
  const corM2 = new THREE.Mesh(Kit.merge(corG2), Kit.tissue({ color:0xF0CBD8, rough:0.5, coat:0.3, env:0.5 }));
  corM2.userData.sub = 'corona';
  const SPH = GC.clone().add(new THREE.Vector3(1.05,0.18,0.06));
  const headG = new THREE.SphereGeometry(0.038, 10, 8); headG.scale(1.7,1,0.8); headG.translate(SPH.x,SPH.y,SPH.z);
  const midG = new THREE.SphereGeometry(0.024, 8, 6); midG.scale(2.2,1,1); midG.translate(SPH.x+0.085,SPH.y,SPH.z);
  const tailPts = [];
  for (let i=0;i<=16;i++){ const t = i/16;
    tailPts.push(new THREE.Vector3(SPH.x + 0.11 + t*0.50, SPH.y + 0.055*Math.sin(t*9.0)*t, SPH.z + 0.02*Math.cos(t*7))); }
  const tailG = Kit.taper(tailPts, 0.017, 0.008, { seg: low?14:24, rad:5 });
  const sperm = new THREE.Mesh(Kit.merge([headG, midG, tailG]), Kit.tissue({ color:0x2FA8C4, rough:0.35, coat:0.5, env:0.6 }));
  sperm.userData.sub = 'esperma';
  add('gametos', [ovulo, zona, corM2, sperm], { explodeDir:new THREE.Vector3(0.6,-0.6,0.5).normalize() });

  /* =====================================================================
     ANIMACIÓN 1 · CICLO OVÁRICO Y CICLO UTERINO (28 días)
     ===================================================================== */
  const CX0 = -5.30, CW = 5.75, CY0 = 2.20, CH = 1.45, CZ = -1.45;
  const hxp = d => CX0 + CW*(d/28);
  const hyp = v => CY0 + CH*(v<0?0:v>1?1:v);
  const FSH = d => 0.22 + 0.32*gauss(d-2.5,4.2) + 0.42*gauss(d-13,1.3) + 0.30*gauss(d-29,2.6);
  const LHf = d => 0.10 + 0.86*gauss(d-13,1.0);
  const EST = d => 0.07 + 0.78*gauss(d-12,2.3) + 0.40*gauss(d-21,4.0);
  const PRG = d => 0.04 + 0.88*gauss(d-21,3.6)*smooth01((d-14.5)/2.2);
  const CURVES = [
    { f:FSH, col:0x2F8FBF, n:'FSH' },
    { f:LHf, col:0xE0762B, n:'LH' },
    { f:EST, col:0xB4459E, n:'Estrógenos' },
    { f:PRG, col:0x4B9B3E, n:'Progesterona' }
  ];
  const chart = [], dots = [];
  { const panel = new THREE.Mesh(new THREE.PlaneGeometry(CW+0.7, CH+0.85),
      new THREE.MeshBasicMaterial({ color:0x123040, transparent:true, opacity:0.10, side:THREE.DoubleSide, depthWrite:false, toneMapped:false }));
    panel.position.set(CX0+CW/2, CY0+CH/2-0.05, CZ-0.06); chart.push(panel);
    const axis = new THREE.Mesh(new THREE.PlaneGeometry(CW+0.2, 0.025), basic(0x8FA6B4));
    axis.position.set(CX0+CW/2, CY0-0.05, CZ); chart.push(axis);
    [7,14,21,28].forEach(d => { const tk = new THREE.Mesh(new THREE.PlaneGeometry(0.022, d===14?CH+0.2:0.18),
        new THREE.MeshBasicMaterial({ color: d===14?0xE0762B:0x8FA6B4, transparent:true, opacity: d===14?0.55:1, toneMapped:false }));
      tk.position.set(hxp(d), d===14 ? CY0+CH/2 : CY0-0.14, CZ-0.01); chart.push(tk); });
    CURVES.forEach(C => {
      const pts = []; for (let i=0;i<=56;i++){ const d = i/2; pts.push(new THREE.Vector3(hxp(d), hyp(C.f(d)), CZ)); }
      chart.push(new THREE.Mesh(Kit.taper(pts, 0.036, 0.036, { seg: low?40:72, rad:5 }), basic(C.col)));
      const dt = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), basic(C.col));
      dt.userData.f = C.f; dots.push(dt); chart.push(dt);
    });
  }
  const marker = new THREE.Mesh(new THREE.PlaneGeometry(0.045, CH+0.30), basic(0xE0554A));
  marker.position.set(hxp(0), CY0+CH/2, CZ+0.02); chart.push(marker);
  chart.forEach(m => { m.visible = false; m.renderOrder = 6; E.scene.add(m); });

  const cyc = { on:false, day:0, speed:1 };
  const ovoMesh = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), onTop(0xF2C96B));
  ovoMesh.visible = false; ovoMesh.renderOrder = 14; E.scene.add(ovoMesh);
  const flowCurve = Kit.curve([[-2.80,0.35,0.08],[-2.80,-0.30,0.08],[-2.80,-0.80,0.10],[-2.79,-1.45,0.16],[-2.78,-2.05,0.22]]);
  const flow = [];
  const flowMat = onTop(0xB3282B);
  for (let i=0;i<6;i++){ const m = new THREE.Mesh(new THREE.SphereGeometry(0.058, 8, 6), flowMat);
    m.userData.t = i/6; m.visible = false; m.renderOrder = 14; E.scene.add(m); flow.push(m); }
  const folCol = { a:new THREE.Color(0xE9AFC6), b:new THREE.Color(0xE8C24A) };

  /* =====================================================================
     ANIMACIÓN 2 · FECUNDACIÓN E IMPLANTACIÓN
     ===================================================================== */
  const FERT = AMP[-1].clone().add(new THREE.Vector3(0.18,0.10,-0.01));
  const spermCurve = Kit.curve([[-2.78,-1.98,0.18],[-2.80,-1.30,0.10],[-2.80,-0.60,0.05],[-2.80,0.20,0.04],
                               [-2.86,0.95,0.03],[-3.28,1.22,0.02],[-3.80,1.46,0.03],[-4.25,1.34,0.04],[FERT.x,FERT.y,FERT.z]]);
  const zygCurve = Kit.curve([[FERT.x,FERT.y,FERT.z],[-4.15,1.36,0.04],[-3.70,1.44,0.03],[-3.22,1.20,0.03],
                              [-2.92,0.92,0.06],[-2.80,0.62,0.10]]);
  const fec = { on:false, t:0, speed:1, sperm:[] };
  const spMat = onTop(0x2FA8C4);
  for (let i=0;i<18;i++){ const g = new THREE.SphereGeometry(0.048, 8, 6); g.scale(1.5,1,1);
    const m = new THREE.Mesh(g, spMat); m.userData = { off:i/18, lat:(RND()-0.5)*0.14, ph:RND()*6.28 };
    m.visible = false; m.renderOrder = 14; E.scene.add(m); fec.sperm.push(m); }
  const eggMesh = new THREE.Mesh(new THREE.SphereGeometry(0.19, 14, 10), onTop(0xF2C96B));
  eggMesh.position.copy(FERT); eggMesh.visible = false; eggMesh.renderOrder = 14; E.scene.add(eggMesh);
  const zonaMesh = new THREE.Mesh(new THREE.SphereGeometry(0.27, 14, 10),
    new THREE.MeshBasicMaterial({ color:0xF7E6C2, transparent:true, opacity:0.45, toneMapped:false, depthTest:false }));
  zonaMesh.position.copy(FERT); zonaMesh.visible = false; zonaMesh.renderOrder = 13; E.scene.add(zonaMesh);
  const zygMesh = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), onTop(0xE88A3C));
  zygMesh.visible = false; zygMesh.renderOrder = 14; E.scene.add(zygMesh);

  /* =====================================================================
     ANIMACIÓN 3 · ESPERMATOGÉNESIS EN EL TÚBULO (lupa)
     ===================================================================== */
  const spg = { on:false, speed:1, parts:[] };
  const stCols = [new THREE.Color(0x3E7CC4), new THREE.Color(0x7B4BB0), new THREE.Color(0x46B9A8), new THREE.Color(0x1FA0C4)];
  for (let i=0;i<10;i++){
    const a = i/10*6.2832;
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), new THREE.MeshBasicMaterial({ color:0x3E7CC4, toneMapped:false, depthTest:false }));
    m.userData = { a, off:i/10 }; m.visible = false; m.renderOrder = 14; E.scene.add(m); spg.parts.push(m);
  }

  /* =====================================================================
     MODELO DEVUELTO
     ===================================================================== */
  const faseOvarica = d => d<5 ? 'reclutamiento de folículos'
    : d<13 ? 'fase folicular: el folículo dominante crece y fabrica estrógenos'
    : d<14.6 ? 'OVULACIÓN: el pico de LH rompe el folículo'
    : d<25 ? 'fase lútea: el cuerpo lúteo fabrica progesterona'
    : 'el cuerpo lúteo se apaga: caen progesterona y estrógenos';
  const faseUterina = d => d<5.5 ? 'menstruación: se desprende la capa funcional del endometrio'
    : d<14 ? 'fase proliferativa: los estrógenos regeneran y engrosan el endometrio'
    : d<26 ? 'fase secretora: la progesterona lo prepara para una posible implantación'
    : 'el endometrio deja de sostenerse y empieza a desprenderse';

  const model = {
    anims:[
      { id:'ciclo', label:'Ciclo ovárico y ciclo uterino (28 días, con las cuatro hormonas)',
        get on(){ return cyc.on; },
        set(on){ cyc.on = on; chart.forEach(m => m.visible = on); if (!on){ ovoMesh.visible = false; flow.forEach(m=>m.visible=false); endo.scale.set(1,1,1); folMesh.scale.setScalar(0.07); folMat.color.copy(folCol.a); }
          else { cyc.day = 0; E.focus(new THREE.Vector3(-2.60,0.95,0), 13.8); } },
        focus:true },
      { id:'fecundacion', label:'Fecundación e implantación: el recorrido real del espermatozoide',
        get on(){ return fec.on; },
        set(on){ fec.on = on; fec.t = 0; fec.sperm.forEach(m => m.visible = on); eggMesh.visible = on; zonaMesh.visible = on; zygMesh.visible = false;
          if (on) E.focus(new THREE.Vector3(-3.40,0.30,0.05), 11.5); },
        focus:true },
      { id:'espermatogenesis', label:'Espermatogénesis en el túbulo seminífero (lupa)',
        get on(){ return spg.on; },
        set(on){ spg.on = on; spg.parts.forEach(m => m.visible = on); if (on) E.focus(TC.clone(), 4.2); },
        focus:true }
    ],
    setSpeed(k){ cyc.speed = k; fec.speed = k; spg.speed = k; },
    phaseText(){
      if (cyc.on){ const d = cyc.day;
        return `Día ${Math.floor(d)+1} de 28 · Ovario: ${faseOvarica(d)} · Útero: ${faseUterina(d)}`; }
      if (fec.on){ const t = fec.t;
        return t < 0.34 ? 'De los cientos de millones de espermatozoides depositados, solo unos pocos cientos llegan hasta la trompa: el resto queda en el camino. Mientras suben, el tracto femenino los capacita: cambia su membrana y su cola pasa a batir con fuerza (hiperactivación)'
             : t < 0.47 ? 'Tercio externo de la trompa (ampolla): el espermatozoide atraviesa la corona radiada y, al unirse a la zona pelúcida, libera las enzimas del acrosoma (reacción acrosómica) para abrirse paso'
             : t < 0.58 ? 'Fusión de membranas: bloqueo a la poliespermia. Primero una despolarización inmediata, después la reacción cortical endurece la zona pelúcida. Solo entonces el ovocito termina su meiosis II y expulsa el segundo corpúsculo polar'
             : t < 0.86 ? 'El cigoto baja por la trompa mientras se divide: de 3 a 4 días hasta el útero, ya convertido en mórula y luego en blastocisto'
             : 'Implantación en el endometrio, de 6 a 7 días después de la fecundación. El blastocisto secreta hCG, que mantiene vivo al cuerpo lúteo: por eso no llega la menstruación, y por eso la prueba de embarazo detecta hCG'; }
      if (spg.on) return 'Espermatogénesis · unos 74 días de la pared al lumen: espermatogonia → espermatocito I → meiosis I → espermatocitos II → meiosis II → 4 espermátidas → 4 espermatozoides. Las células de Sertoli (amarillo) los sostienen y los aíslan de la sangre';
      return '';
    },
    legend:[
      { color:'#2F8FBF', txt:'FSH · hace crecer los folículos al inicio del ciclo' },
      { color:'#E0762B', txt:'LH · su pico del día 13 desencadena la ovulación' },
      { color:'#B4459E', txt:'Estrógenos · del folículo; engrosan el endometrio' },
      { color:'#4B9B3E', txt:'Progesterona · del cuerpo lúteo; mantiene el endometrio' },
      { color:'#B3282B', txt:'Menstruación: desprendimiento de la capa funcional' },
      { color:'#2FA8C4', txt:'Espermatozoides en camino hacia la trompa' },
      { color:'#E88A3C', txt:'Cigoto y blastocisto de vuelta hacia el útero' },
      { color:'#3E7CC4', txt:'Espermatogonias · pegadas a la pared del túbulo' },
      { color:'#7B4BB0', txt:'Espermatocitos · en plena meiosis' },
      { color:'#46B9A8', txt:'Espermátidas · ya haploides, camino del lumen' },
      { color:'#D8A93E', txt:'Células de Sertoli · sostén y barrera hematotesticular' }
    ],
    observa:'en la animación del ciclo, fíjate en que nada ocurre por separado: el folículo crece mientras sube la curva magenta de los estrógenos, la ovulación llega justo después del pico naranja de LH, y el endometrio solo se desprende cuando cae la curva verde de la progesterona. En la fecundación, observa dónde ocurre el encuentro: no en el útero, sino en el tercio externo de la trompa.'
  };

  E.onFrame((t, dt) => {
    if (!motionOK()) return;
    if (cyc.on){
      cyc.day = (cyc.day + dt*1.55*cyc.speed) % 28;
      const d = cyc.day;
      marker.position.x = hxp(d);
      dots.forEach(dtm => dtm.position.set(hxp(d), hyp(dtm.userData.f(d)), CZ+0.03));
      /* endometrio: fino en la menstruación, máximo en la fase secretora */
      const th = d < 5 ? 1.0 + 0.10*d/5 : d < 14 ? 1.10 + 0.72*(d-5)/9 : d < 26 ? 1.82 + 0.12*Math.sin((d-14)/12*Math.PI) : 1.94 - 0.94*(d-26)/2;
      endo.scale.set(th, 1, th);
      /* folículo y cuerpo lúteo */
      if (d < 13.6){ folMesh.scale.setScalar(0.06 + 0.17*Math.pow(d/13.6, 1.6)); folMat.color.copy(folCol.a); }
      else if (d < 25){ folMesh.scale.setScalar(0.24); folMat.color.copy(folCol.a).lerp(folCol.b, smooth01((d-13.6)/1.6)); }
      else { folMesh.scale.setScalar(0.24 - 0.16*(d-25)/3); folMat.color.copy(folCol.b); }
      /* ovulación: el ovocito sale del ovario hacia las fimbrias */
      const ovu = d > 13.6 && d < 16.5;
      ovoMesh.visible = ovu;
      if (ovu){ const k = smooth01((d-13.8)/2.2);
        ovoMesh.position.lerpVectors(folMesh.position, AMP[-1].clone().add(new THREE.Vector3(0.10,0.02,0.04)), k); }
      /* menstruación */
      const mens = d < 5;
      flow.forEach(m => { m.visible = mens; if (!mens) return;
        m.userData.t = (m.userData.t + dt*0.22*cyc.speed) % 1; m.position.copy(flowCurve.getPointAt(m.userData.t)); });
    }
    if (fec.on){
      fec.t = (fec.t + dt*0.055*fec.speed) % 1;
      const T = fec.t;
      fec.sperm.forEach((m,i) => {
        const u = Math.max(0, Math.min(1, (T/0.44) - m.userData.off*0.30));
        m.visible = T < 0.50 && u > 0;
        if (!m.visible) return;
        const p = spermCurve.getPointAt(u);
        m.position.set(p.x + m.userData.lat*0.5*Math.sin(t*6+m.userData.ph), p.y, p.z + m.userData.lat + 0.06*Math.sin(t*7+m.userData.ph));
      });
      eggMesh.visible = T < 0.62; zonaMesh.visible = T < 0.62;
      const pulse = T > 0.47 && T < 0.58 ? 1 + 0.18*Math.sin(t*12) : 1;
      zonaMesh.scale.setScalar(T > 0.47 ? 1.10*pulse : 1);
      eggMesh.scale.setScalar(pulse);
      const zyg = T >= 0.58;
      zygMesh.visible = zyg;
      if (zyg){ const u = Math.min(1, (T-0.58)/0.28);
        zygMesh.position.copy(zygCurve.getPointAt(u));
        zygMesh.scale.setScalar(T > 0.86 ? 1.15 + 0.12*Math.sin(t*5) : 0.95 + 0.10*Math.sin(t*3)); }
    }
    if (spg.on){
      spg.parts.forEach(m => {
        const k = ((t*0.09*spg.speed + m.userData.off) % 1);
        const r = 0.76 - 0.62*k;
        m.position.set(TC.x + Math.cos(m.userData.a)*r, TC.y + Math.sin(m.userData.a)*r, TC.z + 0.10);
        const st = k < 0.33 ? 0 : k < 0.62 ? 1 : k < 0.85 ? 2 : 3;
        m.material.color.copy(stCols[st]);
        m.scale.setScalar(k < 0.62 ? 1.0 : k < 0.85 ? 0.78 : 0.6);
      });
    }
  });

  return model;
}

BIO.organs.reproductor = BIO.repro;
BIO.builders.reproductor = buildRepro;
route('/explorar/reproductor', (view,q) => organView(view, q, BIO.repro, buildRepro));
/* Los enlaces antiguos al marcador "en construcción" llevan al modelo real */
route('/explorar/organo/reproductor', () => navigate('#/explorar/reproductor'));
</script>
