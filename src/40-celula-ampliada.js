<style>
/* ===== Célula ampliada (vegetal · procariota · procesos) — CSS propio ===== */
.cel-cmp{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cel-box{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--bg-2)}
.cel-box h4{font-size:.86rem;margin:0 0 6px}
.cel-box ul{margin:0;padding-left:16px;font-size:.84rem;color:var(--ink-2);display:flex;flex-direction:column;gap:5px}
.cel-box.mas{border-color:color-mix(in srgb,var(--ok) 45%,var(--line))}
.cel-box.menos{border-color:color-mix(in srgb,var(--warn) 45%,var(--line))}
.cel-mito{border:1px dashed color-mix(in srgb,var(--bad) 45%,var(--line));border-radius:10px;padding:9px 11px;background:color-mix(in srgb,var(--bad) 7%,transparent);font-size:.84rem;color:var(--ink-2)}
.cel-mito b{color:var(--bad);display:block;font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;margin-bottom:3px}
.cel-steps{display:flex;gap:6px;flex-wrap:wrap}
.cel-steps button{border:1px solid var(--line-2);background:var(--bg-2);color:var(--ink-2);border-radius:8px;padding:6px 10px;font-size:.78rem;font-weight:600}
.cel-steps button[aria-current="true"]{background:var(--accent);border-color:transparent;color:#fff}
.cel-tl{width:100%;margin-top:4px}
.cel-kv{display:flex;flex-wrap:wrap;gap:6px}
.cel-kv span{font-family:var(--font-m);font-size:.76rem;background:var(--bg-3);border-radius:7px;padding:4px 8px;color:var(--ink-2)}
.cel-kv span b{color:var(--ink)}
.cel-leg{display:flex;gap:12px;flex-wrap:wrap;font-size:.79rem;color:var(--ink-2);align-items:center}
.cel-leg i{width:10px;height:10px;border-radius:3px;display:inline-block;margin-right:5px;vertical-align:-1px}
.cel-tabla{table-layout:fixed;width:100%;border:1px solid var(--line);border-radius:12px;background:var(--bg-2)}
.cel-tabla th{white-space:normal;padding:8px 9px}
.cel-tabla td{padding:8px 9px}
.cel-tabla td,.cel-tabla th{overflow-wrap:anywhere}
.cel-tabla td.si{color:var(--ok);font-weight:700}
.cel-tabla td.no{color:var(--bad);font-weight:700}
.cel-tabla tr.on td{background:var(--accent-soft)}
.cel-tabla th button{border:0;background:none;font:inherit;color:inherit;padding:0;cursor:pointer;text-decoration:underline dotted}
.cel-esc{display:flex;align-items:flex-end;gap:10px;margin-top:6px}
.cel-esc .b{background:var(--accent);border-radius:4px;min-width:6px;height:14px}
.cel-esc .b.mini{background:var(--eco)}
.cel-sv{width:100%;height:auto;background:var(--bg-3);border-radius:10px;border:1px solid var(--line)}
.cel-fall{padding:14px 16px}
@media (max-width:640px){ .cel-cmp{grid-template-columns:1fr} }
/* v1.7 · escenario de altura fija y pegajoso mientras el panel se desplaza */
.cel-viewer{align-items:start}
.cel-viewer .phase:empty,.cel-cmpv .phase:empty{display:none}
.cel-viewer>.stage{height:560px;min-height:0;position:sticky;top:76px}
.cel-cmpv{display:grid;grid-template-columns:minmax(0,1fr) 430px;grid-template-areas:"st tb" "st pn";gap:16px;align-items:start}
.cel-cmpv>.stage{grid-area:st;height:560px;min-height:0;position:sticky;top:76px}
.cel-cmpv>.cel-tb{grid-area:tb;min-width:0}
.cel-cmpv>.panel{grid-area:pn}
.cel-tabla.t3 th{overflow-wrap:normal;word-break:normal;hyphens:manual;text-transform:none;font-size:.78rem;letter-spacing:0;vertical-align:bottom}
.cel-tabla.t3 th:first-child{width:29%}
.cel-tabla.t3 td,.cel-tabla.t3 th{padding:7px 6px}
.cel-tabla.t3 td{font-size:.78rem;line-height:1.35;vertical-align:top;overflow-wrap:break-word;word-break:normal}
.cel-tabla.t3 td:first-child{font-weight:600;color:var(--ink)}
.cel-tabla.t3 tbody tr{cursor:pointer}
.cel-tabla.t3 th .dot{display:inline-block;width:9px;height:9px;border-radius:3px;margin-right:5px;vertical-align:0}
@media (max-width:1360px){ .cel-cmpv{grid-template-columns:minmax(0,1fr) 300px;grid-template-areas:"st pn" "tb tb"} .cel-cmpv>.stage{position:relative;top:auto} .cel-tabla.t3 th:first-child{width:22%} }
@media (max-width:1100px){ .cel-viewer>.stage{position:relative;top:auto;height:480px} .cel-cmpv{grid-template-columns:minmax(0,1fr);grid-template-areas:"st" "tb" "pn"} .cel-cmpv>.stage{height:480px} }
@media (max-width:860px){ .cel-viewer>.stage,.cel-cmpv>.stage{height:400px} .cel-tabla.t3 th:first-child{width:30%} .cel-tabla.t3 th{font-size:.74rem} .cel-tabla.t3 th .dot{display:none} .cel-tabla.t3 td,.cel-tabla.t3 th{padding:7px 6px} }
</style>
<script>
/* =====================================================================
   CÉLULA AMPLIADA — vegetal 3D, procariota 3D y procesos celulares
   (mitosis, meiosis, ósmosis y transporte, respiración celular).
   Biología BGU U2–U3 · Ciencias Naturales EGB 8.º CVT U1 y 9.º CVT U1.
   Todo procedimental; sin dependencias externas.
   ===================================================================== */
(function(){

/* ---------- actividades (registro defensivo) ---------- */
try {
  if (typeof BIO !== 'undefined' && BIO.activities) Object.assign(BIO.activities, {
    'reto-celula-vegetal':{t:'Reto: la célula vegetal', unidad:null, peso:0, xp:80},
    'reto-procariota':{t:'Reto: la célula procariota', unidad:null, peso:0, xp:80},
    'reto-procesos':{t:'Reto: procesos celulares', unidad:null, peso:0, xp:80}
  });
} catch(e){ console.warn('actividades célula ampliada', e); }

/* menos animación si la persona lo pidió (ajustes o accesibilidad) */
const animOK = () => { try { return motionOK() && !Store.s.a11y.motion; } catch(e){ return false; } };
const num = n => String(n).replace('.', ',');

/* =====================================================================
   DATOS
   ===================================================================== */
const VEG = {
  reto:'Encuentra los tres componentes que una célula animal NO tiene y explica para qué le sirven a la planta.',
  structures:[
    { id:'pared', nombre:'Pared celular', color:'#9DBE6A', solo:true,
      funcion:'Da forma y sostén a la célula, resiste la presión del agua que entra y evita que la célula estalle.',
      estructura:'Capa gruesa (de 0,1 a varios micrómetros) de fibras de celulosa pegadas con pectina, por FUERA de la membrana plasmática. Es porosa: deja pasar agua y sales.',
      analogia:'Es la caja de cartón; la membrana es la funda plástica que va adentro.',
      n1:'La pared celular es una capa dura de celulosa que rodea a la célula vegetal por fuera de la membrana.',
      n2:'Cuando entra agua, la vacuola empuja hacia afuera y la pared responde con una fuerza igual: esa presión (turgencia) es la que mantiene erguida una hoja. Si falta agua, la planta se marchita.',
      n3:'La pared primaria es de celulosa, hemicelulosa y pectina; en tejidos de sostén se añade una pared secundaria con lignina. Es rígida pero porosa (deja pasar moléculas pequeñas), así que no controla qué entra: eso lo hace la membrana.',
      accion:{t:'Presión de turgencia', d:'La vacuola empuja la membrana contra la pared y la célula se pone firme.'} },
    { id:'membrana', nombre:'Membrana plasmática', color:'#8FD0DA',
      funcion:'Controla qué entra y qué sale de la célula: es la frontera selectiva.',
      estructura:'Bicapa de fosfolípidos de unos 8 nanómetros de grosor, con proteínas incrustadas que funcionan como canales y bombas. Es flexible, no rígida.',
      analogia:'Una puerta con guardia: deja pasar a unos y a otros no.',
      n1:'La membrana es una capa delgadísima de grasas y proteínas que decide qué entra y qué sale.',
      n2:'Está por dentro de la pared y es mil veces más delgada que ella. La pared sostiene; la membrana selecciona. Son dos estructuras distintas con trabajos distintos.',
      n3:'Modelo del mosaico fluido: los fosfolípidos se desplazan lateralmente y las proteínas flotan en ellos. La permeabilidad selectiva explica la ósmosis, la difusión facilitada y el transporte activo.',
      accion:{t:'Transporte a través de la membrana', d:'Moléculas cruzando por difusión y por proteínas transportadoras.'} },
    { id:'cloroplastos', nombre:'Cloroplastos', color:'#4E9D5A', solo:true,
      funcion:'Realizan la fotosíntesis: con luz, agua y dióxido de carbono fabrican glucosa y liberan oxígeno.',
      estructura:'Organelos con doble membrana. Adentro hay pilas de sacos aplanados (tilacoides) agrupados en granas, unidos por lamelas y rodeados de estroma. La clorofila está en los tilacoides.',
      analogia:'Una planta de energía solar con paneles apilados.',
      n1:'Los cloroplastos son las fábricas verdes: con la luz del sol producen el alimento de la planta.',
      n2:'La luz se capta en los tilacoides (fase luminosa: se produce ATP y NADPH y se libera oxígeno del agua) y el azúcar se arma en el estroma (ciclo de Calvin, con el CO₂ del aire).',
      n3:'Tienen ADN circular propio y ribosomas 70S, como las bacterias: la teoría endosimbiótica propone que provienen de cianobacterias captadas por una célula ancestral.',
      accion:{t:'Fotosíntesis en marcha', d:'Entra CO₂ y agua, sale oxígeno y glucosa hacia el citoplasma.'} },
    { id:'vacuola', nombre:'Vacuola central', color:'#7FB3E0', solo:true,
      funcion:'Almacena agua, sales, azúcares, pigmentos y desechos; su presión mantiene firme a la célula.',
      estructura:'Una sola bolsa enorme que ocupa hasta el 80 o 90 % del volumen celular, rodeada por una membrana llamada tonoplasto. Empuja al resto de organelos contra la pared.',
      analogia:'Un tanque de agua que, al llenarse, pone tiesa a toda la planta.',
      n1:'La vacuola es una bolsa grande de agua que ocupa casi toda la célula vegetal.',
      n2:'Al llenarse de agua presiona la membrana contra la pared (turgencia) y el tallo se mantiene erguido. Si sale agua, la célula se marchita y puede haber plasmólisis.',
      n3:'El tonoplasto tiene bombas de protones que acumulan solutos; eso baja el potencial hídrico y atrae agua por ósmosis. Además guarda enzimas digestivas: hace el trabajo que en la célula animal reparten los lisosomas.',
      accion:{t:'Entrada de agua', d:'El agua entra a la vacuola por ósmosis y la célula se pone firme.'} },
    { id:'nucleo', nombre:'Núcleo', color:'#7E66CC',
      funcion:'Guarda el ADN y dirige la actividad celular.',
      estructura:'Rodeado por una envoltura doble con poros; adentro hay cromatina y nucléolo. En la célula vegetal queda desplazado hacia un costado por la vacuola.',
      analogia:'La oficina de dirección, con los planos guardados.',
      n1:'El núcleo guarda la información (el ADN) y da las órdenes.',
      n2:'Del núcleo sale el ARN mensajero por los poros y llega a los ribosomas, donde se arman las proteínas.',
      n3:'La cromatina se organiza en nucleosomas; el nucléolo fabrica las subunidades de los ribosomas. En la vegetal la vacuola lo empuja contra la pared, por eso se lo ve pegado a un lado.',
      accion:{t:'Salida de ARN mensajero', d:'El mensaje sale por los poros hacia los ribosomas.'} },
    { id:'mitocondrias', nombre:'Mitocondrias', color:'#E0784A',
      funcion:'Hacen la respiración celular: con oxígeno liberan la energía de la glucosa y producen ATP.',
      estructura:'Doble membrana; la interna forma crestas que aumentan la superficie. Adentro está la matriz, con ADN y ribosomas propios.',
      analogia:'La central eléctrica de la célula.',
      n1:'Sí: las plantas también tienen mitocondrias, porque también respiran.',
      n2:'El cloroplasto fabrica glucosa con luz; la mitocondria la usa para obtener ATP, de día y de noche, en las raíces y en las semillas donde no hay luz.',
      n3:'Fotosíntesis y respiración no son procesos opuestos que se anulen: la planta produce más materia de la que consume, y por eso crece. La respiración ocurre las 24 horas.',
      accion:{t:'Producción de ATP', d:'Entra piruvato y oxígeno, sale ATP hacia el citoplasma.'} },
    { id:'reticulo', nombre:'Retículo endoplasmático', color:'#7FA7CF',
      funcion:'Fabrica y transporta proteínas (el rugoso) y lípidos (el liso).',
      estructura:'Red de sacos y tubos conectados con la envoltura nuclear; el rugoso lleva ribosomas pegados.',
      analogia:'La línea de producción con su banda transportadora.',
      n1:'El retículo fabrica y transporta las proteínas y las grasas de la célula.',
      n2:'Las proteínas hechas en sus ribosomas viajan en vesículas hacia el aparato de Golgi.',
      n3:'En la célula vegetal el retículo atraviesa los plasmodesmos y conecta el interior de células vecinas: forma un continuo llamado retículo desmotubular.',
      accion:{t:'Vesículas hacia el Golgi', d:'Las proteínas salen empaquetadas hacia el Golgi.'} },
    { id:'golgi', nombre:'Aparato de Golgi', color:'#E0AC45',
      funcion:'Modifica, empaqueta y envía; en la planta también fabrica materiales de la pared.',
      estructura:'Pilas de cisternas aplanadas (dictiosomas) repartidas por el citoplasma, con vesículas saliendo de los bordes.',
      analogia:'La bodega de despacho que etiqueta y envía.',
      n1:'El Golgi empaqueta lo que fabrica el retículo y lo envía a su destino.',
      n2:'En las plantas prepara pectinas y hemicelulosas y las manda en vesículas hacia la pared celular.',
      n3:'Durante la citocinesis vegetal, sus vesículas se alinean en el centro y forman el fragmoplasto y la placa celular: la nueva pared que separa las dos células hijas.',
      accion:{t:'Envío a la pared', d:'Vesículas con material de pared viajando hacia la membrana.'} },
    { id:'citoesqueleto', nombre:'Citoesqueleto', color:'#6FC8A8',
      funcion:'Sostiene la forma interna, ordena los organelos y guía la corriente citoplasmática.',
      estructura:'Red de microtúbulos y filamentos de actina. Los microtúbulos corticales marcan la dirección en que se depositan las fibras de celulosa.',
      analogia:'El andamio y los rieles de la célula.',
      n1:'El citoesqueleto es el andamio interno: sostiene y mueve cosas dentro de la célula.',
      n2:'Por sus filamentos los cloroplastos se desplazan para recibir más o menos luz (ciclosis).',
      n3:'Los microtúbulos corticales orientan a la celulosa sintasa de la membrana: por eso la pared tiene fibras ordenadas y la célula crece en una dirección.',
      accion:{t:'Ciclosis', d:'Los organelos circulan arrastrados por la corriente citoplasmática.'} },
    { id:'plasmodesmos', nombre:'Plasmodesmos', color:'#C9A227', solo:true,
      funcion:'Comunican el citoplasma de células vecinas a través de la pared.',
      estructura:'Canales de unos 50 nanómetros que atraviesan la pared; por dentro pasa la membrana y un tubo de retículo llamado desmotúbulo.',
      analogia:'Túneles entre casas pegadas.',
      n1:'Los plasmodesmos son túneles que conectan una célula vegetal con la de al lado.',
      n2:'Como la pared no deja que las células se toquen, estos canales permiten que se pasen agua, azúcares y señales.',
      n3:'El conjunto de citoplasmas conectados se llama simplasto; el camino por fuera, entre paredes, se llama apoplasto. Algunos virus vegetales viajan por los plasmodesmos.',
      accion:{t:'Paso entre células', d:'Azúcares y señales cruzando de una célula a la vecina.'} },
    { id:'citoplasma', nombre:'Citoplasma', color:'#A9D8CF',
      funcion:'Medio acuoso donde ocurren muchas reacciones, como la glucólisis.',
      estructura:'En la célula vegetal queda como una capa delgada entre la vacuola y la membrana, atravesada por hebras.',
      analogia:'El patio de la fábrica, donde todo circula.',
      n1:'El citoplasma es el gel donde flotan los organelos.',
      n2:'La vacuola lo comprime contra la pared: por eso se lo ve como una capa fina alrededor de la célula.',
      n3:'Contiene el citosol y los organelos; allí ocurre la glucólisis, primera etapa de la respiración celular.',
      accion:{t:'Corriente citoplasmática', d:'El citoplasma circula y arrastra a los organelos.'} }
  ]
};

const PRO = {
  reto:'Demuestra con el modelo por qué una bacteria no necesita mitocondrias para respirar.',
  structures:[
    { id:'capsula', nombre:'Cápsula', color:'#CBD9E8',
      funcion:'Capa gelatinosa externa que protege de la desecación y dificulta que las defensas la reconozcan.',
      estructura:'Polisacáridos pegajosos por fuera de la pared. No todas las bacterias la tienen.',
      analogia:'Un impermeable resbaloso.',
      n1:'La cápsula es una capa pegajosa que protege a la bacteria.',
      n2:'Le sirve para resistir la sequedad y para adherirse a superficies, como los dientes.',
      n3:'En las bacterias patógenas la cápsula bloquea la fagocitosis; muchas vacunas se dirigen justamente a sus polisacáridos.' },
    { id:'pared', nombre:'Pared celular', color:'#B9A55C',
      funcion:'Da forma y evita que la bacteria estalle cuando entra agua.',
      estructura:'Malla de peptidoglicano (no de celulosa). Gruesa en las Gram positivas, delgada y con membrana externa en las Gram negativas.',
      analogia:'Una malla de alambre alrededor de un globo.',
      n1:'La pared bacteriana es una malla que sostiene a la bacteria.',
      n2:'No es igual a la pared vegetal: la de la planta es de celulosa y la de la bacteria es de peptidoglicano.',
      n3:'La penicilina impide armar el peptidoglicano; por eso ataca bacterias y no daña a nuestras células, que no tienen pared.' },
    { id:'membrana', nombre:'Membrana plasmática', color:'#8FD0DA',
      funcion:'Controla el paso de sustancias y, además, hace el trabajo de la mitocondria: aquí ocurre la cadena transportadora de electrones.',
      estructura:'Bicapa de fosfolípidos con proteínas; forma pliegues hacia adentro (mesosomas) que aumentan la superficie.',
      analogia:'Una pared que además es la central eléctrica.',
      n1:'La membrana controla lo que entra y sale, y también produce energía.',
      n2:'Como no hay mitocondrias, las proteínas que fabrican ATP están en la propia membrana plasmática.',
      n3:'Al ser tan pequeña, la relación superficie/volumen de la bacteria es altísima: le alcanza con su membrana para intercambiar y para respirar.' },
    { id:'nucleoide', nombre:'Nucleoide', color:'#C05B7E',
      funcion:'Contiene el ADN: toda la información de la bacteria.',
      estructura:'Un único cromosoma circular, superenrollado y sin envoltura nuclear. No es un núcleo verdadero.',
      analogia:'Los planos guardados en el piso, sin oficina ni puerta.',
      n1:'El nucleoide es la zona donde está el ADN de la bacteria: no tiene núcleo.',
      n2:'Que no tenga núcleo no significa que no tenga ADN: lo tiene suelto en el citoplasma, en un cromosoma circular.',
      n3:'Sin envoltura nuclear, transcripción y traducción ocurren a la vez: el ribosoma empieza a leer el ARN mientras todavía se está copiando.' },
    { id:'plasmidos', nombre:'Plásmidos', color:'#E0784A',
      funcion:'Anillos pequeños de ADN extra; pueden llevar genes de resistencia a antibióticos.',
      estructura:'Moléculas circulares de ADN, mucho más pequeñas que el cromosoma, que se copian aparte.',
      analogia:'Llaveros con llaves extra que se pueden prestar.',
      n1:'Los plásmidos son anillos pequeños de ADN adicional.',
      n2:'Las bacterias se los pasan entre ellas por conjugación: así se propaga la resistencia a los antibióticos.',
      n3:'En biotecnología se usan como vectores: se les inserta un gen (por ejemplo el de la insulina humana) y la bacteria fabrica la proteína.' },
    { id:'ribosomas', nombre:'Ribosomas 70S', color:'#3C3660',
      funcion:'Fabrican las proteínas.',
      estructura:'Más pequeños que los nuestros (70S frente a 80S), con dos subunidades y sin membrana.',
      analogia:'Máquinas de ensamblaje sueltas por el piso.',
      n1:'Los ribosomas arman las proteínas; la bacteria tiene miles.',
      n2:'Son de tipo 70S, iguales a los de mitocondrias y cloroplastos: una pista de la teoría endosimbiótica.',
      n3:'Varios antibióticos (tetraciclinas, macrólidos) bloquean el ribosoma 70S sin tocar el 80S de nuestras células.' },
    { id:'flagelo', nombre:'Flagelo', color:'#6E86C9',
      funcion:'Permite nadar hacia el alimento o alejarse de lo dañino.',
      estructura:'Filamento helicoidal de flagelina movido por un motor rotatorio anclado en la membrana, impulsado por protones.',
      analogia:'Una hélice de barco con su motor.',
      n1:'El flagelo es una hélice que gira y mueve a la bacteria.',
      n2:'Gira de verdad, como un tornillo: no se agita como un látigo. Alcanza decenas de vueltas por segundo.',
      n3:'La quimiotaxis alterna giros antihorarios (avance) con horarios (volteretas): la bacteria compara concentraciones en el tiempo y corrige su rumbo.' },
    { id:'pili', nombre:'Pili y fimbrias', color:'#A8B4C4',
      funcion:'Sirven para adherirse a superficies y, el pilus sexual, para pasar plásmidos a otra bacteria.',
      estructura:'Filamentos proteicos cortos y rectos, más delgados que el flagelo y mucho más numerosos.',
      analogia:'Pelitos con ventosas.',
      n1:'Las fimbrias son pelitos que sirven para pegarse.',
      n2:'Gracias a ellas las bacterias forman biopelículas, como la placa dental.',
      n3:'El pilus de conjugación forma un puente entre dos bacterias y transfiere un plásmido: transferencia horizontal de genes.' },
    { id:'citoplasma', nombre:'Citoplasma', color:'#A9D8CF',
      funcion:'Gel donde ocurren todas las reacciones: no hay organelos con membrana.',
      estructura:'Citosol con ribosomas, gránulos de reserva y el nucleoide. Sin retículo, sin Golgi, sin mitocondrias.',
      analogia:'Un taller de un solo ambiente, sin habitaciones.',
      n1:'En el citoplasma de la bacteria pasa todo, porque no hay cuartos separados.',
      n2:'Al no tener compartimentos, las reacciones ocurren juntas y muy rápido: puede dividirse cada 20 minutos.',
      n3:'Tiene gránulos de reserva (glucógeno, polifosfato) y, en algunas, vesículas de gas o magnetosomas.' }
  ]
};

/* =====================================================================
   PIEZAS DE INTERFAZ (propias de este archivo)
   ===================================================================== */
/* Franja de propósito · qué observar · reto */
function franja(o){
  return h('section',{class:'reto static'}, h('div',{class:'reto-body'},
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'Propósito'), h('p',{},o.proposito)),
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'Observa'),
      h('ul',{class:'checks plain'}, o.observa.map(t => h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), t)))),
    h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'🎯 Reto'), h('p',{style:'font-weight:600'},o.reto),
      o.extra || null)));
}

/* Controles de la escena (etiquetas, vista, captura) */
function celChrome(stage, E, opts){
  const top = h('div',{class:'stage-top'});
  const lbl = h('button',{class:'btn sm','aria-pressed':'true','aria-label':'Mostrar u ocultar etiquetas',onclick:()=>{ const on = lbl.getAttribute('aria-pressed')!=='true'; lbl.setAttribute('aria-pressed', on); E && E.setLabels(on); }},'Etiquetas');
  const rst = h('button',{class:'btn sm','aria-label':'Restablecer la vista',onclick:()=>E && E.resetView()},'↺ Vista');
  const cap = h('button',{class:'btn sm','aria-label':'Guardar una captura en el cuaderno',onclick:()=>{
    if (!E) return toast('La captura requiere el modelo 3D.');
    Store.addNote('captura', opts.captureTxt(), { img: E.capture() });
    Store.log('captura',{modelo:opts.model}); toast('Captura guardada en tu cuaderno de campo.');
  }},'Capturar');
  top.append(opts.left || h('span'), h('span',{class:'grow'}), lbl, rst, cap);
  const bottom = h('div',{class:'stage-bottom'});
  const nota = h('span',{class:'stage-note'}, opts.nota || 'Modelo simplificado con fines educativos');
  bottom.append(h('span',{class:'phase', style: opts.phase ? '' : 'display:none'}, opts.phase || ''), nota);
  stage.append(top, bottom);
  return { phase: $('.phase', bottom), nota };
}

/* Ficha de una estructura, con los tres niveles de profundidad */
function ficha(s, modelo, ctrl){
  const act = h('div',{class:'notice info',style:'display:none'});
  return h('div',{class:'hcard stack',style:'gap:4px'},
    h('div',{class:'row',style:'justify-content:space-between'},
      h('span',{class:'pill cell'}, s.solo ? 'Exclusivo de la célula vegetal' : 'Componente'),
      h('span',{class:'mono small muted'}, `${(Store.s.seen[modelo]||[]).length} explorados`)),
    h('h3',{}, s.nombre),
    h('div',{class:'q'},'Función'), h('p',{}, s.funcion),
    h('div',{class:'q'},'Estructura'), h('p',{}, s.estructura),
    h('div',{class:'q'},'Analogía'), h('p',{style:'font-style:italic'}, s.analogia),
    h('div',{class:'q'},'Tres niveles de profundidad'), depthBlock(s,'n'),
    h('div',{class:'ctrl-row',style:'margin-top:10px'},
      s.accion && ctrl && ctrl.action ? h('button',{class:'btn sm',onclick:()=>{
        const txt = ctrl.action(s.id);
        if (!txt) return toast('Esta animación necesita el modelo 3D.');
        act.textContent = `${s.accion.t}: ${s.accion.d} ${txt}`; act.style.display='';
        Store.log('animacion',{modelo, estructura:s.id, accion:s.accion.t});
      }},'Ver en acción') : null,
      ctrl && ctrl.focus ? h('button',{class:'btn sm',onclick:()=>{ if (!ctrl.focus(s.id)) toast('Necesita el modelo 3D.'); }},'Acercar') : null,
      h('button',{class:'btn sm ghost',onclick:()=>{ Store.addNote('observacion', `${s.nombre}: ${s.funcion} Analogía: ${s.analogia}`); toast('Guardado en tu cuaderno.'); }},'Guardar en cuaderno')),
    act);
}

/* Lista de componentes: alternativa completa con teclado */
function listaComponentes(structs, modelo, onPick, aria){
  const ul = h('ul',{class:'struct-list','aria-label':aria});
  const render = (sel) => { ul.innerHTML=''; const seen = Store.s.seen[modelo]||[];
    structs.forEach(s => ul.append(h('li',{}, h('button',{'aria-pressed': sel===s.id, onclick:()=>onPick(s.id,'lista')},
      h('span',{class:'sw',style:`background:${s.color}`}), s.nombre, seen.includes(s.id) ? h('span',{class:'seen'},'✓') : null))));
  };
  render(null); return { el:ul, render };
}

/* Bloque de cierre: pregunta con retroalimentación por distractor */
function cierre(titulo, q, actId){
  const box = h('div',{class:'card stack'}, h('span',{class:'eyebrow cell'}, titulo),
    quizBlock(q, att => {
      if (actId) Store.completeActivity(actId, { score: att===1 ? 100 : Math.max(60, 100-15*(att-1)), attempts: att });
    }));
  return box;
}

/* Caja de error típico que hay que desmontar */
const errorTipico = (mal, bien) => h('div',{class:'cel-mito'}, h('b',{},'Error frecuente'),
  h('p',{style:'margin:0 0 4px'}, h('span',{style:'text-decoration:line-through'}, mal)), h('p',{style:'margin:0'}, bien));

/* =====================================================================
   AYUDAS DE MODELADO
   ===================================================================== */
const CAMDIR = new THREE.Vector3(0.40,0.30,0.86).normalize();
const PHIC = Math.atan2(CAMDIR.z, -CAMDIR.x);
const cutStart = len => PHIC + (Math.PI*2 - len)/2;
const CUT = 1.5*Math.PI;
const org = (c,o) => Kit.tissue(Object.assign({ color:c, rough:0.4, coat:0.6, coatRough:0.25 }, o||{}));
const dirOf = R => new THREE.Vector3(R()*2-1, R()*2-1, R()*2-1).normalize();

/* Franja que muestra el grosor de una capa en el borde del corte */
function rimStrip(shapeFn, kOut, kIn, len){
  const P=[], I=[]; const edges=[cutStart(len), cutStart(len)+len]; let base=0; const N=36;
  edges.forEach(phi => {
    for (let i=0;i<=N;i++){ const th=i/N*Math.PI;
      const d = new THREE.Vector3(-Math.cos(phi)*Math.sin(th), Math.cos(th), Math.sin(phi)*Math.sin(th));
      [kOut,kIn].forEach(k => { const q = shapeFn(d.clone(), k); P.push(q.x,q.y,q.z); }); }
    for (let i=0;i<N;i++){ const a=base+i*2; I.push(a,a+1,a+2, a+1,a+3,a+2); }
    base += (N+1)*2;
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(P,3)); g.setIndex(I); g.computeVertexNormals();
  return g;
}

/* Sistema de partículas que viajan por trayectos (usado en todas las escenas) */
function Flow(E){
  const geo = new THREE.SphereGeometry(0.075, 10, 8); const pool = []; let t = 0;
  const api = {
    /* cada trayecto: from/to o curve, color, n, speed, size; opcional geo+mat (moléculas con forma propia) y spin */
    set(list){
      let k = 0;
      (list||[]).forEach(d => { for (let i=0;i<(d.n||6);i++){
        let m = pool[k]; if (!m){ m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ toneMapped:false })); m.userData.own = m.material; E.scene.add(m); pool.push(m); }
        const own = m.userData.own; m.geometry = d.geo || geo; m.material = d.mat || own;
        m.visible = true; if (!d.mat) own.color.set(d.color); m.scale.setScalar(d.size || 1); m.rotation.set(0,0,0);
        m.userData = { d, off: i/(d.n||6), own }; k++;
      } });
      for (let i=k;i<pool.length;i++) pool[i].visible = false;
      api.tick(0);
    },
    clear(){ pool.forEach(m => m.visible = false); },
    tick(dt){
      if (animOK()) t += dt;
      pool.forEach(m => { if (!m.visible) return; const d = m.userData.d;
        const u = ((t*(d.speed||0.35)) + m.userData.off) % 1;
        if (d.curve) m.position.copy(d.curve.getPointAt(d.back ? 1-u : u));
        else m.position.lerpVectors(d.from, d.to, d.back ? 1-u : u);
        if (d.pulse) m.scale.setScalar((d.size||1) * (0.6 + 0.7*Math.sin(u*Math.PI)));
        if (d.spin) m.rotation.set(u*d.spin + m.userData.off*9, u*d.spin*0.7 + m.userData.off*5, 0);
      });
    }
  };
  E.onFrame((tt,dt) => api.tick(dt));
  return api;
}

/* =====================================================================
   MODELO: CÉLULA VEGETAL EN CORTE
   ===================================================================== */
function buildPlant(E){
  const low = E.low, R = Kit.rng(41);
  const S = Object.fromEntries(VEG.structures.map(s=>[s.id,s]));
  const A = [3.25, 2.6, 2.5];
  /* superelipsoide: caja de esquinas redondeadas */
  const boxAt = (d, k) => { const p = 5;
    const n = Math.pow(Math.pow(Math.abs(d.x/A[0]),p) + Math.pow(Math.abs(d.y/A[1]),p) + Math.pow(Math.abs(d.z/A[2]),p), 1/p);
    return d.clone().multiplyScalar(k/(n||1e-6)); };
  const shell = (k, cut) => Kit.sculpt({ w: low?56:96, h: low?38:66,
    phiStart: cut ? cutStart(CUT) : 0, phiLength: cut ? CUT : Math.PI*2,
    shape: d => boxAt(d, k), disp: (p,d) => 0.035*Kit.fbm(d.x*1.7+5, d.y*1.7, d.z*1.7, 3)*k });
  const add = (id, meshes, lbl, extra) => { E.addPart(id, meshes, Object.assign({ explodeDir: V3(lbl).normalize() }, extra||{})); E.addLabel(id, S[id].nombre, lbl); };
  const geos = {};

  /* --- pared celular: capa gruesa con su franja de grosor --- */
  geos.paredOut = { cut: shell(1.00, true), full: shell(1.00, false) };
  geos.paredIn  = { cut: shell(0.935, true), full: shell(0.935, false) };
  const pMatOut = Kit.tissue({ tex:'tissue', rep:[6,5], bump:0.06, color:0x98C062, rough:0.6, coat:0.25, coatRough:0.4, side:THREE.DoubleSide });
  const pMatIn  = Kit.tissue({ tex:'granular', rep:[5,4], bump:0.02, color:0x9DBE6A, rough:0.66, coat:0.15, side:THREE.DoubleSide });
  const paredO = new THREE.Mesh(geos.paredOut.cut, pMatOut), paredI = new THREE.Mesh(geos.paredIn.cut, pMatIn);
  const paredRim = new THREE.Mesh(rimStrip(boxAt, 1.00, 0.935, CUT), Kit.tissue({ tex:'tissue', rep:[1,6], bump:0.03, color:0x7F9E4C, rough:0.7, coat:0.1, side:THREE.DoubleSide }));
  [paredO, paredI, paredRim].forEach(m => m.userData.sub = 'pared');
  add('pared', [paredO, paredI, paredRim], [0, 3.35, 1.1], { passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });

  /* --- membrana plasmática: por dentro de la pared, delgadísima --- */
  geos.memOut = { cut: shell(0.925, true), full: shell(0.925, false) };
  geos.memIn  = { cut: shell(0.905, true), full: shell(0.905, false) };
  const mMat = celFresnel(Kit.tissue({ tex:'membrane', rep:[7,5], bump:0.02, color:0x74C2D2, transparent:true, opacity:0.62, rough:0.22, coat:0.9, side:THREE.DoubleSide, depthWrite:false }), 0.3, 1.5);
  const memO = new THREE.Mesh(geos.memOut.cut, mMat), memI = new THREE.Mesh(geos.memIn.cut, celFresnel(Kit.tissue({ color:0xCBEEF2, transparent:true, opacity:0.2, side:THREE.DoubleSide, depthWrite:false }), 0.3));
  memO.renderOrder = 2; memI.renderOrder = 1;
  const memRim = new THREE.Mesh(rimStrip(boxAt, 0.925, 0.905, CUT), Kit.tissue({ color:0x4FAFBF, rough:0.35, coat:0.5, side:THREE.DoubleSide }));
  const dm = new THREE.Object3D();
  const nProt = low ? 60 : 130;
  const prot = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.045,0.045,0.13,8), org(0x8C7CC4), nProt); let pi = 0;
  for (let i=0;i<nProt*3 && pi<nProt;i++){ const d = dirOf(R); if (d.dot(CAMDIR) > 0.45) continue;
    dm.position.copy(boxAt(d, 0.915)); dm.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), d); dm.updateMatrix(); prot.setMatrixAt(pi++, dm.matrix); }
  prot.count = pi;
  [memO, memI, memRim].forEach(m => m.userData.sub = 'bicapa'); prot.userData.sub = 'prot';
  add('membrana', [memO, memI, memRim, prot], [2.75, 2.35, 1.1], { passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });

  /* --- vacuola central: ocupa el centro y empuja a todo contra la pared --- */
  const VC = new THREE.Vector3(0.12,-0.05,0);
  const vShell = (k, cut) => { const g = Kit.sculpt({ w: low?44:72, h: low?30:52,
      phiStart: cut ? cutStart(CUT) : 0, phiLength: cut ? CUT : Math.PI*2,
      radii:[1.72*k, 1.42*k, 1.34*k], disp:(p,d)=>0.05*Kit.fbm(d.x*2+13, d.y*2, d.z*2, 2) });
    g.translate(VC.x, VC.y, VC.z); return g; };
  geos.vac = { cut: vShell(1, true), full: vShell(1, false) };
  geos.vacIn = { cut: vShell(0.965, true), full: vShell(0.965, false) };
  const vacO = new THREE.Mesh(geos.vac.cut, celFresnel(Kit.tissue({ color:0x4F95DE, transparent:true, opacity:0.62, rough:0.18, coat:1, coatRough:0.1, side:THREE.DoubleSide, depthWrite:false, env:1.3 }), 0.34, 1.4));
  const vacI = new THREE.Mesh(geos.vacIn.cut, Kit.tissue({ color:0xA9D2F5, transparent:true, opacity:0.26, side:THREE.BackSide, depthWrite:false }));
  vacO.userData.sub = 'tonoplasto';
  add('vacuola', [vacO, vacI], [0.2, -1.45, 1.8], { passThrough:true });

  /* --- núcleo desplazado contra la pared --- */
  const NC = boxAt(new THREE.Vector3(-0.72, 0.6, -0.36).normalize(), 0.70);
  const nShell = k => { const g = Kit.sculpt({ w: low?40:64, h: low?28:46, radii:[0.78*k,0.72*k,0.75*k], disp:(p,d)=>0.025*Kit.fbm(d.x*2.4+3,d.y*2.4,d.z*2.4,2) }); g.translate(NC.x,NC.y,NC.z); return g; };
  const nOut = new THREE.Mesh(nShell(1), celFresnel(Kit.tissue({ tex:'membrane', rep:[3,2], bump:0.015, color:0x7560D0, rough:0.35, coat:0.7, transparent:true, opacity:0.9, side:THREE.DoubleSide, depthWrite:false }), 0.5, 1.3));
  const chrom = []; for (let i=0;i<(low?8:14);i++){ let p = NC.clone().add(dirOf(R).multiplyScalar(R()*0.42)); const pts=[p.clone()];
    for (let j=0;j<6;j++){ p = p.clone().add(dirOf(R).multiplyScalar(0.2)); if (p.distanceTo(NC)>0.6) p.sub(NC).multiplyScalar(0.75).add(NC); pts.push(p); }
    chrom.push(Kit.taper(pts, 0.028, 0.024, { seg:22, rad:5, bumpy:0.35, bf:18, seed:i })); }
  const chromM = new THREE.Mesh(Kit.merge(chrom), org(0x4B3490, { rough:0.5, coat:0.3 }));
  const nucleolo = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 16), org(0x3A2478, { rough:0.6 })); nucleolo.position.copy(NC).add(new THREE.Vector3(0.18,0.1,0.2));
  const poreN = low?30:70; const pores = new THREE.InstancedMesh(new THREE.TorusGeometry(0.045,0.015,6,12), org(0xC9B8F2), poreN); let pc=0;
  for (let i=0;i<poreN*3 && pc<poreN;i++){ const d = dirOf(R); if (d.dot(CAMDIR) > 0.6) continue;
    dm.position.copy(NC).add(new THREE.Vector3(d.x*0.785, d.y*0.725, d.z*0.755)); dm.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), d); dm.updateMatrix(); pores.setMatrixAt(pc++, dm.matrix); }
  pores.count = pc; nOut.userData.sub='env'; pores.userData.sub='poros'; chromM.userData.sub='crom'; nucleolo.userData.sub='nucleolo';
  add('nucleo', [nOut, chromM, nucleolo, pores], [NC.x-0.4, NC.y+1.25, NC.z+0.7]);

  /* --- cloroplastos: lentes aplanadas contra la pared, abiertas hacia el centro para ver las granas --- */
  const CLP = [[-0.55,0.72,0.42],[0.65,0.78,-0.25],[0.85,-0.45,0.5],[-0.75,-0.55,0.3],[0.15,0.9,0.55],[-0.35,-0.85,-0.45],[0.35,0.25,-0.9],[-0.45,0.05,-0.9]];
  const envG = [], stromaG = [], tilG = [], lamG = [], almG = []; const clpPos = [];
  CLP.forEach((d0,k) => {
    const d = new THREE.Vector3(d0[0],d0[1],d0[2]).normalize(); const c = boxAt(d, 0.8); clpPos.push(c);
    /* eje delgado (Y local) = normal de la pared: el cloroplasto queda tendido sobre ella */
    const Y = d.clone(), X = new THREE.Vector3().crossVectors(Y, dirOf(R)).normalize(), Z = new THREE.Vector3().crossVectors(X, Y);
    const M = new THREE.Matrix4().compose(c, new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X,Y,Z)), new THREE.Vector3(1,1,1));
    const put = g => g.applyMatrix4(M);
    const A0 = [0.64, 0.24, 0.44];
    /* envoltura: se retira el casquete que mira al interior de la célula */
    const lente = (s, th) => { const g = new THREE.SphereGeometry(1, low?22:34, low?12:18, 0, Math.PI*2, 0, th); g.scale(A0[0]*s, A0[1]*s, A0[2]*s); return g; };
    envG.push(put(lente(1, 0.64*Math.PI))); stromaG.push(put(lente(0.9, 0.62*Math.PI)));
    /* granas: pilas de tilacoides (discos) apilados a lo largo del eje delgado, unidas por lamelas del estroma */
    const spots = [[-0.34,-0.12],[-0.08,0.16],[0.2,-0.1],[0.4,0.14],[-0.2,-0.3],[0.12,0.28]].slice(0, low?4:6);
    spots.forEach(([gx,gz],sI) => { const f = Math.sqrt(Math.max(0.15, 1 - (gx/A0[0])**2 - (gz/A0[2])**2)); const nT = Math.max(3, Math.round(6*f)); const rr = 0.078 + 0.018*R();
      for (let t=0;t<nT;t++){ const disc = new THREE.CylinderGeometry(rr, rr, 0.02, low?10:16); disc.translate(gx, -0.065*f + t*0.028, gz); tilG.push(put(disc)); }
      if (sI){ const [px,pz] = spots[sI-1]; const L = Math.hypot(gx-px, gz-pz); const lam = new THREE.BoxGeometry(L, 0.01, 0.05); lam.rotateY(-Math.atan2(gz-pz, gx-px)); lam.translate((gx+px)/2, (sI%2 ? 0.02 : -0.02), (gz+pz)/2); lamG.push(put(lam)); } });
    if (k%3 === 0){ const a = new THREE.SphereGeometry(0.08, 12, 8); a.scale(1.3, 0.8, 1); a.translate(0.05, -0.04, -0.3); almG.push(put(a)); }
  });
  const clpEnv = new THREE.Mesh(Kit.merge(envG), celFresnel(Kit.tissue({ color:0x2F8F45, transparent:true, opacity:1, rough:0.3, coat:0.8, coatRough:0.2, side:THREE.DoubleSide, depthWrite:true }), 0.55, 1.2));
  const clpStr = new THREE.Mesh(Kit.merge(stromaG), Kit.tissue({ color:0x74C463, rough:0.5, coat:0.3, side:THREE.BackSide }));
  const clpTil = celInst1(Kit.merge(tilG), org(0x17602F, { rough:0.42, coat:0.5 }));
  const clpLam = celInst1(Kit.merge(lamG.concat(almG)), org(0x2E8B45, { rough:0.5 }));
  clpEnv.userData.sub='env'; clpStr.userData.sub='env'; clpTil.userData.sub='tilacoides'; clpLam.userData.sub='lamelas';
  add('cloroplastos', [clpEnv, clpStr, clpTil, clpLam], [2.2, 2.0, 1.7]);
  let clpBest = 0; clpPos.forEach((c,i) => { if (c.dot(CAMDIR) < clpPos[clpBest].dot(CAMDIR)) clpBest = i; }); E.setAnchor('cloroplastos', clpPos[clpBest]);

  /* --- mitocondrias: las plantas también respiran (crestas laminares y matriz densa, como en la animal) --- */
  const mOut = [], mIn = [], mMtx = [], mCr = [];
  const perfil = (L,r,n) => { const pts=[]; for (let i=0;i<=n;i++){ const a = -Math.PI/2 + i/n*Math.PI; pts.push(new THREE.Vector2(r*Math.cos(a), (L/2)*Math.sin(a))); } return pts; };
  const MIT = [[0.92,0.2,0.5],[-0.25,0.95,-0.3],[0.35,-0.95,0.35],[-0.9,-0.2,-0.4],[0.5,0.55,0.8]];
  MIT.forEach(d0 => {
    const d = new THREE.Vector3(d0[0],d0[1],d0[2]).normalize(); const c = boxAt(d, 0.80);
    const Z = CAMDIR.clone().add(dirOf(R).multiplyScalar(0.4)).normalize(); const Y = new THREE.Vector3().crossVectors(Z, dirOf(R)).normalize(); const X = new THREE.Vector3().crossVectors(Y,Z);
    const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X,Y,Z));
    const xf = (g,off) => { g.applyMatrix4(new THREE.Matrix4().compose(c.clone().add((off||new THREE.Vector3()).clone().applyQuaternion(q)), q, new THREE.Vector3(1,1,1))); return g; };
    const L = 0.86, r = 0.21;
    mOut.push(xf(new THREE.LatheGeometry(perfil(L,r,14), low?16:26, 0.3*Math.PI, 1.4*Math.PI)));
    mIn.push(xf(new THREE.LatheGeometry(perfil(L*0.92, r*0.84, 14), low?16:26, 0.32*Math.PI, 1.36*Math.PI)));
    mMtx.push(xf(new THREE.LatheGeometry(perfil(L*0.88, r*0.8, 12), low?14:22, 0.33*Math.PI, 1.34*Math.PI)));
    for (let j=0;j<5;j++){ const y = -L*0.32 + j/4*L*0.64; const rho = r*0.84*Math.sqrt(Math.max(0.05, 1-Math.pow(y/(L*0.46),2)));
      const t = celTongue(rho, rho*0.38, 0.4 + 0.2*R(), 0.04, low); t.rotateY((j%2 ? Math.PI : 0) + (R()-0.5)*0.3); t.translate(0, y, -0.015); mCr.push(xf(t)); }
  });
  { const a = new THREE.Mesh(Kit.merge(mOut), org(0xE06A3A,{side:THREE.DoubleSide, rough:0.34})), b = new THREE.Mesh(Kit.merge(mIn), org(0xF08E5C,{transparent:true, opacity:1, depthWrite:true})),
      m = celInst1(Kit.merge(mMtx), org(0xB94A2E,{side:THREE.BackSide, rough:0.6, coat:0.2})), cr = celInst1(Kit.merge(mCr), org(0xFFC79A,{rough:0.42, coat:0.5}));
    a.userData.sub='ext'; b.userData.sub = m.userData.sub = cr.userData.sub = 'crestas'; add('mitocondrias', [a,b,m,cr], [-2.6, 1.15, 1.6]); }

  /* --- retículo endoplasmático rugoso junto al núcleo --- */
  const sheets = [], ribo = [];
  [[0.92,1.75,1.3,0.6],[1.04,1.65,1.4,0.62],[1.16,1.8,1.25,0.6]].forEach(([r,ps,pl,ts],k) => {
    const g = new THREE.SphereGeometry(r, low?22:38, low?8:14, ps, pl, ts*Math.PI, 0.24*Math.PI);
    const p = g.attributes.position, v = new THREE.Vector3();
    for (let i=0;i<p.count;i++){ v.fromBufferAttribute(p,i); const n = v.clone().normalize(); v.addScaledVector(n, 0.05*Math.sin(v.x*5+k)); p.setXYZ(i,v.x,v.y,v.z); }
    g.computeVertexNormals(); g.translate(NC.x,NC.y,NC.z); sheets.push(g);
    /* p ya está trasladado al núcleo: no hay que volver a sumar NC */
    for (let i=0;i<(low?30:70);i++){ const vi = Math.floor(R()*p.count); ribo.push(new THREE.Vector3(p.getX(vi), p.getY(vi), p.getZ(vi))); }
  });
  const rerM = new THREE.Mesh(Kit.merge(sheets), Kit.tissue({ color:0x5E93D6, rough:0.32, coat:0.7, side:THREE.DoubleSide }));
  const rerR = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.03, low?0:1), org(0x2A2345,{rough:0.55,coat:0.25}), ribo.length);
  ribo.forEach((p,i)=>{ dm.position.copy(p); dm.quaternion.identity(); dm.updateMatrix(); rerR.setMatrixAt(i, dm.matrix); });
  rerM.userData.sub='cisternas'; rerR.userData.sub='ribosomas';
  add('reticulo', [rerM, rerR], [NC.x+0.4, NC.y-1.75, NC.z+1.6]);
  { const g0 = sheets[0]; g0.computeBoundingBox(); E.setAnchor('reticulo', g0.boundingBox.getCenter(new THREE.Vector3())); }

  /* --- dictiosomas (Golgi) --- */
  const gg = [], ves = [];
  [[0.2,-0.75,0.62],[-0.85,0.15,0.5]].forEach(d0 => {
    const d = new THREE.Vector3(d0[0],d0[1],d0[2]).normalize(); const c = boxAt(d, 0.78);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), d);
    for (let i=0;i<5;i++){ const g = new THREE.SphereGeometry(1, low?20:30, low?8:12); g.scale(0.32-i*0.025, 0.028, 0.22-i*0.018);
      g.applyMatrix4(new THREE.Matrix4().compose(c.clone().add(new THREE.Vector3(0, i*0.075, 0).applyQuaternion(q)), q, new THREE.Vector3(1,1,1))); gg.push(g); }
    for (let i=0;i<5;i++){ const s = new THREE.SphereGeometry(0.05+R()*0.03, 10, 8);
      const p = c.clone().add(dirOf(R).multiplyScalar(0.3)); s.translate(p.x,p.y,p.z); ves.push(s); }
  });
  { const a = new THREE.Mesh(Kit.merge(gg), org(0xE0AC45,{side:THREE.DoubleSide})), b = new THREE.Mesh(Kit.merge(ves), org(0xF0C66A,{transparent:true,opacity:0.85}));
    a.userData.sub='cisternas'; b.userData.sub='vesiculas'; add('golgi', [a,b], [1.6, -2.2, 2.0]); }

  /* --- citoesqueleto: microtúbulos corticales y hebras que cruzan la vacuola --- */
  const mts = [];
  for (let i=0;i<(low?16:28);i++){ const d1 = dirOf(R), d2 = dirOf(R);
    const p1 = boxAt(d1, 0.88), p2 = boxAt(d2, 0.88); const mid = p1.clone().lerp(p2, 0.5).multiplyScalar(0.92);
    mts.push(Kit.taper([p1, mid, p2], 0.016, 0.014, { seg:16, rad:4 })); }
  const cito = new THREE.Mesh(Kit.merge(mts), new THREE.MeshStandardMaterial({ color:0x6FC8A8, transparent:true, opacity:0.55, roughness:0.5, depthWrite:false }));
  add('citoesqueleto', [cito], [-2.8, -1.6, 1.5]);

  /* --- citoplasma: gránulos en la capa delgada entre vacuola y membrana --- */
  const gn = low?150:320; const ga = new Float32Array(gn*3); let gi=0;
  for (let i=0;i<gn*3 && gi<gn;i++){ const d = dirOf(R); const p = boxAt(d, 0.78 + R()*0.1);
    const v = p.clone().sub(VC); if (Math.hypot(v.x/1.72, v.y/1.42, v.z/1.34) < 1.05) continue;
    ga[gi*3]=p.x; ga[gi*3+1]=p.y; ga[gi*3+2]=p.z; gi++; }
  const gr = new THREE.BufferGeometry(); gr.setAttribute('position', new THREE.BufferAttribute(ga,3)); gr.setDrawRange(0, gi);
  const gran = new THREE.Points(gr, new THREE.PointsMaterial({ color:0x9CD6C8, size:0.05, transparent:true, opacity:0.6, depthWrite:false }));
  add('citoplasma', [gran], [-2.9, -2.35, 1.2], { pickable:false, explodeDir:new THREE.Vector3(0,0,0) });

  /* --- plasmodesmos: canales que atraviesan la pared --- */
  const pmG = [], pmD = []; const pmPos = [];
  [[-1,0.45,0.2],[-1,-0.35,-0.3],[-1,0.05,0.6],[0,0.75,-1],[0.4,-0.6,-1],[1,0.3,-0.25],[1,-0.4,0.3]].forEach(v => {
    const d = new THREE.Vector3(v[0],v[1],v[2]).normalize(); const pOut = boxAt(d,1.06), pIn = boxAt(d,0.88);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), d);
    const c = pOut.clone().lerp(pIn,0.5); pmPos.push(c);
    const len = pOut.distanceTo(pIn);
    const t1 = new THREE.CylinderGeometry(0.085,0.085,len,10,1,true); t1.applyMatrix4(new THREE.Matrix4().compose(c, q, new THREE.Vector3(1,1,1))); pmG.push(t1);
    const t2 = new THREE.CylinderGeometry(0.028,0.028,len*0.95,7); t2.applyMatrix4(new THREE.Matrix4().compose(c, q, new THREE.Vector3(1,1,1))); pmD.push(t2);
  });
  { const a = new THREE.Mesh(Kit.merge(pmG), org(0xE3D89A,{side:THREE.DoubleSide})), b = new THREE.Mesh(Kit.merge(pmD), org(0xC9A227));
    a.userData.sub='canal'; b.userData.sub='desmotubulo'; add('plasmodesmos', [a,b], [-3.6, 0.5, 0.9]); }

  /* líneas guía: cada etiqueta apunta a un punto claro de su estructura */
  { const ph = cutStart(CUT), th = 0.4*Math.PI; const dm2 = new THREE.Vector3(-Math.cos(ph)*Math.sin(th), Math.cos(th), Math.sin(ph)*Math.sin(th));
    E.setAnchor('pared', boxAt(new THREE.Vector3(0.12,1,0.12).normalize(), 1.0));
    E.setAnchor('membrana', boxAt(dm2, 0.915));
    E.setAnchor('vacuola', VC.clone().add(new THREE.Vector3(0.2,-0.9,0)));
    E.setAnchor('nucleo', NC);
    E.setAnchor('mitocondrias', boxAt(new THREE.Vector3(-0.25,0.95,-0.3).normalize(), 0.80));
    E.setAnchor('golgi', boxAt(new THREE.Vector3(0.2,-0.75,0.62).normalize(), 0.78));
    E.setAnchor('plasmodesmos', pmPos[2]);
    E.setAnchor('citoesqueleto', boxAt(new THREE.Vector3(-0.8,-0.5,-0.3).normalize(), 0.88));
    E.setAnchor('citoplasma', boxAt(new THREE.Vector3(-0.7,-0.75,-0.1).normalize(), 0.84)); }

  /* --- "ver en acción" --- */
  const flow = Flow(E);
  const CLP0 = clpPos[0], MIT0 = boxAt(new THREE.Vector3(0.92,0.2,0.5).normalize(), 0.80);
  const rutas = {
    pared:{ txt:'La vacuola empuja la membrana contra la pared: la célula se mantiene firme (turgencia).',
      f:[{ from:VC.clone(), to:boxAt(new THREE.Vector3(0,1,0.2).normalize(),0.9), color:0x7FB3E0, n:6, speed:0.3 },
         { from:VC.clone(), to:boxAt(new THREE.Vector3(1,0.1,0.2).normalize(),0.9), color:0x7FB3E0, n:6, speed:0.3 }] },
    membrana:{ txt:'Unas moléculas cruzan solas la bicapa y otras necesitan proteínas transportadoras.',
      f:[{ from:boxAt(new THREE.Vector3(0.3,1,0.5).normalize(),1.25), to:boxAt(new THREE.Vector3(0.3,1,0.5).normalize(),0.82), color:0x7FE0EC, n:7, speed:0.35 }] },
    cloroplastos:{ txt:'Entran CO₂ y agua; salen oxígeno y glucosa hacia el citoplasma.',
      f:[{ from:boxAt(new THREE.Vector3(-0.55,0.72,0.42).normalize(),1.3), to:CLP0.clone(), color:0x9CD6FF, n:6, speed:0.32 },
         { from:CLP0.clone(), to:boxAt(new THREE.Vector3(-0.2,1,0.9).normalize(),1.25), color:0x7FE0A0, n:6, speed:0.32 }] },
    vacuola:{ txt:'El agua entra por ósmosis y la vacuola se expande.',
      f:[{ from:boxAt(new THREE.Vector3(0.2,0.9,0.4).normalize(),1.2), to:VC.clone(), color:0x7FB3E0, n:8, speed:0.3 }] },
    nucleo:{ txt:'El ARN mensajero sale por los poros hacia los ribosomas.',
      f:[{ from:NC.clone(), to:NC.clone().add(new THREE.Vector3(1.4,-0.9,0.6)), color:0xB8A8FF, n:7, speed:0.4 }] },
    mitocondrias:{ txt:'Sale ATP hacia el resto de la célula: la planta respira de día y de noche.',
      f:[{ from:MIT0.clone(), to:NC.clone(), color:0xFFC24A, n:7, speed:0.4 },
         { from:MIT0.clone(), to:CLP0.clone(), color:0xFFC24A, n:5, speed:0.4 }] },
    reticulo:{ txt:'Las vesículas con proteínas viajan del retículo al Golgi.',
      f:[{ from:NC.clone().add(new THREE.Vector3(0.9,-0.6,0.4)), to:boxAt(new THREE.Vector3(0.2,-0.75,0.62).normalize(),0.78), color:0x9CC4EA, n:6, speed:0.35 }] },
    golgi:{ txt:'Vesículas con pectinas y hemicelulosas viajan hacia la pared.',
      f:[{ from:boxAt(new THREE.Vector3(0.2,-0.75,0.62).normalize(),0.78), to:boxAt(new THREE.Vector3(0.2,-0.75,0.62).normalize(),0.95), color:0xFFD27A, n:6, speed:0.32 }] },
    citoesqueleto:{ txt:'Los organelos circulan arrastrados por la corriente citoplasmática (ciclosis).',
      f:[{ curve: new THREE.CatmullRomCurve3([boxAt(new THREE.Vector3(1,0.3,0.4).normalize(),0.85), boxAt(new THREE.Vector3(0,1,0.3).normalize(),0.85), boxAt(new THREE.Vector3(-1,0.1,0.4).normalize(),0.85), boxAt(new THREE.Vector3(0,-1,0.3).normalize(),0.85)], true), color:0x6FC8A8, n:9, speed:0.18 }] },
    plasmodesmos:{ txt:'Azúcares y señales cruzan de una célula a la vecina por los canales de la pared.',
      f:[{ from:pmPos[0].clone().add(new THREE.Vector3(0.6,0,0)), to:pmPos[0].clone().add(new THREE.Vector3(-0.6,0,0)), color:0xFFD27A, n:6, speed:0.4 }] },
    citoplasma:{ txt:'El citosol se desplaza en una capa delgada entre la vacuola y la membrana.',
      f:[{ curve: new THREE.CatmullRomCurve3([boxAt(new THREE.Vector3(0.9,0.5,0.5).normalize(),0.82), boxAt(new THREE.Vector3(-0.3,0.9,0.5).normalize(),0.82), boxAt(new THREE.Vector3(-0.9,-0.4,0.5).normalize(),0.82), boxAt(new THREE.Vector3(0.4,-0.9,0.5).normalize(),0.82)], true), color:0xA9D8CF, n:8, speed:0.2 }] }
  };

  let cut = true;
  return {
    partes: VEG.structures.map(s=>s.id),
    focos: { cloroplastos:[clpPos[clpBest], 2.4], nucleo:[NC, 2.6], vacuola:[VC, 5.0], plasmodesmos:[pmPos[0], 2.0], mitocondrias:[MIT0, 2.2] },
    action(id){ const r = rutas[id]; if (!r) { flow.clear(); return ''; } flow.set(r.f); return r.txt; },
    stop(){ flow.clear(); },
    get cutaway(){ return cut; },
    setCutaway(on){ cut = on;
      paredO.geometry = on ? geos.paredOut.cut : geos.paredOut.full;
      paredI.geometry = on ? geos.paredIn.cut : geos.paredIn.full;
      memO.geometry = on ? geos.memOut.cut : geos.memOut.full;
      memI.geometry = on ? geos.memIn.cut : geos.memIn.full;
      vacO.geometry = on ? geos.vac.cut : geos.vac.full;
      vacI.geometry = on ? geos.vacIn.cut : geos.vacIn.full;
      paredRim.visible = on; memRim.visible = on; }
  };
}

/* =====================================================================
   MODELO: CÉLULA PROCARIOTA (bacilo) + comparación de escala
   ===================================================================== */
function buildProk(E){
  const low = E.low, R = Kit.rng(73);
  const S = Object.fromEntries(PRO.structures.map(s=>[s.id,s]));
  const L = 1.55;                                  // media longitud del cuerpo cilíndrico
  const sdf = (p,r) => { const x = Math.max(-L, Math.min(L, p.x)); return Math.hypot(p.x-x, p.y, p.z) - r; };
  const capAt = (d, r) => { let lo = 0.01, hi = L + r + 0.05;
    for (let i=0;i<22;i++){ const m = (lo+hi)/2; if (sdf(new THREE.Vector3(d.x*m, d.y*m, d.z*m), r) < 0) lo = m; else hi = m; }
    return d.clone().multiplyScalar(lo); };
  const shell = (r, cut) => Kit.sculpt({ w: low?52:88, h: low?34:58,
    phiStart: cut ? cutStart(CUT) : 0, phiLength: cut ? CUT : Math.PI*2,
    shape: d => capAt(d, r), disp: (p,d) => 0.02*Kit.fbm(d.x*2+7, d.y*2, d.z*2, 2) });
  const add = (id, meshes, lbl, extra) => { E.addPart(id, meshes, Object.assign({ explodeDir: V3(lbl).normalize() }, extra||{})); E.addLabel(id, S[id].nombre, lbl); };
  const g = {};

  /* cápsula */
  g.cap = { cut: shell(1.16, true), full: shell(1.16, false) };
  const capM = new THREE.Mesh(g.cap.cut, celFresnel(Kit.tissue({ tex:'granular', rep:[5,3], bump:0.02, color:0xB9CDE4, transparent:true, opacity:0.52, rough:0.3, coat:0.9, side:THREE.DoubleSide, depthWrite:false }), 0.22, 1.5));
  add('capsula', [capM], [0, 1.85, 1.0], { passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });

  /* pared de peptidoglicano */
  g.pOut = { cut: shell(1.00, true), full: shell(1.00, false) };
  g.pIn  = { cut: shell(0.93, true), full: shell(0.93, false) };
  const parO = new THREE.Mesh(g.pOut.cut, Kit.tissue({ tex:'granular', rep:[6,3], bump:0.03, color:0xC9B672, rough:0.6, coat:0.25, side:THREE.DoubleSide }));
  const parI = new THREE.Mesh(g.pIn.cut, Kit.tissue({ color:0xB9A55C, rough:0.65, side:THREE.DoubleSide }));
  const parRim = new THREE.Mesh(rimStrip(capAt, 1.00, 0.93, CUT), Kit.tissue({ color:0x8E7C3C, rough:0.6, side:THREE.DoubleSide }));
  [parO,parI,parRim].forEach(m=>m.userData.sub='pared');
  add('pared', [parO, parI, parRim], [1.9, 1.15, 0.8], { passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });

  /* membrana plasmática */
  g.mOut = { cut: shell(0.91, true), full: shell(0.91, false) };
  g.mIn  = { cut: shell(0.885, true), full: shell(0.885, false) };
  const memO = new THREE.Mesh(g.mOut.cut, celFresnel(Kit.tissue({ tex:'membrane', rep:[6,3], bump:0.02, color:0x74C2D2, transparent:true, opacity:0.7, rough:0.22, coat:0.9, side:THREE.DoubleSide, depthWrite:false }), 0.35, 1.4));
  const memI = new THREE.Mesh(g.mIn.cut, Kit.tissue({ color:0xCBEEF2, transparent:true, opacity:0.3, side:THREE.DoubleSide, depthWrite:false }));
  const memRim = new THREE.Mesh(rimStrip(capAt, 0.91, 0.885, CUT), Kit.tissue({ color:0x4FAFBF, rough:0.35, side:THREE.DoubleSide }));
  [memO,memI,memRim].forEach(m=>m.userData.sub='bicapa');
  add('membrana', [memO, memI, memRim], [-1.9, 1.1, 0.8], { passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });

  /* nucleoide: un único cromosoma circular superenrollado */
  const npts = []; const NN = 16;
  for (let i=0;i<NN;i++){ const a = i/NN*Math.PI*2;
    npts.push(new THREE.Vector3(Math.cos(a)*0.95 + (R()-0.5)*0.25, Math.sin(a)*0.34 + (R()-0.5)*0.3, Math.sin(a*2)*0.26 + (R()-0.5)*0.25)); }
  const nc = new THREE.CatmullRomCurve3(npts, true, 'catmullrom', 0.5);
  /* superenrollamiento: la doble hélice se enrolla sobre sí misma alrededor del trazado del cromosoma */
  const NS = low ? 320 : 640, fr = nc.computeFrenetFrames(NS, true), sup = [];
  for (let i=0;i<NS;i++){ const t = i/NS, a = t*Math.PI*2*(low?46:70), p = nc.getPointAt(t);
    sup.push(p.addScaledVector(fr.normals[i], Math.cos(a)*0.075).addScaledVector(fr.binormals[i], Math.sin(a)*0.075)); }
  const nucleoide = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sup, true), low?640:1400, 0.028, low?5:6, true), org(0xC8466F, { rough:0.42, coat:0.5 }));
  add('nucleoide', [nucleoide], [0, -1.3, 1.1]); E.setAnchor('nucleoide', nc.getPointAt(0.3));

  /* plásmidos */
  const plG = [];
  [[0.95,0.42,-0.3],[-1.0,-0.4,0.25],[0.15,-0.5,0.45]].forEach((p,i) => {
    const t = new THREE.TorusGeometry(0.2, 0.035, 7, 26);
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(R()*3, R()*3, R()*3));
    t.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(p[0],p[1],p[2]), q, new THREE.Vector3(1,1,1))); plG.push(t);
  });
  add('plasmidos', [new THREE.Mesh(Kit.merge(plG), org(0xE8663A, { rough:0.4 }))], [1.3, -1.35, 1.1]); E.setAnchor('plasmidos', [0.15,-0.5,0.45]);

  /* ribosomas 70S */
  const nr = low?160:320; const rib = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.045, low?0:1), org(0x352E62,{rough:0.55,coat:0.25}), nr);
  const dm = new THREE.Object3D(); let ri = 0;
  for (let i=0;i<nr*3 && ri<nr;i++){ const d = dirOf(R); const p = capAt(d, 0.88*(0.25+R()*0.7));
    dm.position.copy(p); dm.updateMatrix(); rib.setMatrixAt(ri++, dm.matrix); }
  rib.count = ri;
  add('ribosomas', [rib], [-1.2, -1.5, 1.2], { pickable:false, explodeDir:new THREE.Vector3(0,0,0) });
  { const L0 = new THREE.Vector3(-1.2,-1.5,1.2), m4 = new THREE.Matrix4(), v = new THREE.Vector3(); let best = null, bd = 1e9; for (let i=0;i<ri;i++){ rib.getMatrixAt(i, m4); v.setFromMatrixPosition(m4); const dd = v.distanceTo(L0); if (dd < bd){ bd = dd; best = v.clone(); } } if (best) E.setAnchor('ribosomas', best); }

  /* flagelo helicoidal con su motor: gira de verdad */
  const fp = []; for (let i=0;i<=70;i++){ const u = i/70; const amp = 0.34*Math.min(1, u*3.5);
    fp.push(new THREE.Vector3(-u*3.2, Math.sin(u*11)*amp, Math.cos(u*11)*amp)); }
  const flag = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(fp), low?110:190, 0.05, 6, false), org(0x6E86C9,{rough:0.4}));
  flag.position.set(-(L+0.55), 0, 0);
  const motor = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.05, 8, 18), org(0x4F5F96)); motor.rotation.y = Math.PI/2; motor.position.set(-(L+0.5), 0, 0);
  flag.userData.sub='filamento'; motor.userData.sub='motor';
  add('flagelo', [flag, motor], [-3.3, 0.75, 0.6]); E.setAnchor('flagelo', [-(L+1.35), 0, 0]);

  /* pili y fimbrias */
  const piG = [];
  for (let i=0;i<(low?12:20);i++){ const d = dirOf(R); if (Math.abs(d.x) > 0.8) d.x *= 0.4; d.normalize();
    const p0 = capAt(d, 1.0), p1 = capAt(d, 1.0).addScaledVector(d, 0.55);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), d);
    const c = new THREE.CylinderGeometry(0.018,0.014,p0.distanceTo(p1),5);
    c.applyMatrix4(new THREE.Matrix4().compose(p0.clone().lerp(p1,0.5), q, new THREE.Vector3(1,1,1))); piG.push(c); }
  add('pili', [new THREE.Mesh(Kit.merge(piG), org(0x98A6BC))], [1.3, 1.6, -0.6]);

  /* citoplasma */
  const cn = low?90:200; const ca = new Float32Array(cn*3);
  for (let i=0;i<cn;i++){ const p = capAt(dirOf(R), 0.86*(0.2+R()*0.75)); ca[i*3]=p.x; ca[i*3+1]=p.y; ca[i*3+2]=p.z; }
  const cg = new THREE.BufferGeometry(); cg.setAttribute('position', new THREE.BufferAttribute(ca,3));
  const citop = new THREE.Points(cg, new THREE.PointsMaterial({ color:0xA9D8CF, size:0.05, transparent:true, opacity:0.5, depthWrite:false }));
  add('citoplasma', [citop], [0, -1.8, -0.8], { pickable:false, explodeDir:new THREE.Vector3(0,0,0) });
  E.setAnchor('capsula', capAt(new THREE.Vector3(0.35,1,-0.25).normalize(), 1.16));
  E.setAnchor('pared', capAt(new THREE.Vector3(0.9,0.75,-0.3).normalize(), 1.0));
  E.setAnchor('membrana', capAt(new THREE.Vector3(-0.9,0.7,-0.3).normalize(), 0.91));
  E.setAnchor('citoplasma', capAt(new THREE.Vector3(0.3,-0.8,-0.5).normalize(), 0.55));

  /* --- comparación de escala (1 unidad = 1 micrómetro) --- */
  const escala = new THREE.Group(); escala.visible = false; E.scene.add(escala);
  const euca = new THREE.Mesh(new THREE.SphereGeometry(10, 48, 32), celFresnel(Kit.tissue({ tex:'tissue', rep:[4,3], bump:0.03, color:0xE88FB0, transparent:true, opacity:0.6, rough:0.25, coat:0.8, side:THREE.DoubleSide, depthWrite:false }), 0.2, 1.5));
  const eucaN = new THREE.Mesh(new THREE.SphereGeometry(3, 28, 20), Kit.tissue({ color:0x7E66CC, transparent:true, opacity:0.55, rough:0.4 }));
  const bact = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), org(0xC9B672)); bact.scale.set(1.0, 0.45, 0.45); bact.position.set(14.5, -9.0, 0);
  const bact2 = bact.clone(); bact2.position.set(16.8, -9.0, 0.4);
  escala.add(euca, eucaN, bact, bact2);
  const flow = Flow(E);

  E.onFrame((t, dt) => { if (animOK()) flag.rotation.x += dt*5.2; });

  let cut = true, modo = 'detalle';
  return {
    partes: PRO.structures.map(s=>s.id),
    focos: { nucleoide:[new THREE.Vector3(0,0,0), 3.2], flagelo:[new THREE.Vector3(-3,0,0), 3.6], plasmidos:[new THREE.Vector3(0.95,0.42,-0.3), 2.2], ribosomas:[new THREE.Vector3(0,0,0), 2.8] },
    action(id){
      const r = {
        flagelo:{ txt:'El motor gira e impulsa a la bacteria: por eso nada hacia el alimento.', f:[{ from:new THREE.Vector3(-4.2,0,0), to:new THREE.Vector3(-1.4,0,0), color:0x9CD6FF, n:6, speed:0.5 }] },
        membrana:{ txt:'Los protones salen y vuelven a entrar: así se fabrica el ATP en la propia membrana.', f:[{ from:capAt(new THREE.Vector3(0.2,1,0.3).normalize(),0.9), to:capAt(new THREE.Vector3(0.2,1,0.3).normalize(),1.15), color:0xFFC24A, n:7, speed:0.45 }] },
        nucleoide:{ txt:'El ARN se transcribe y los ribosomas lo leen al instante, sin salir de ningún núcleo.', f:[{ from:new THREE.Vector3(0.6,0.1,0), to:new THREE.Vector3(-0.8,0.5,0.4), color:0xB8A8FF, n:6, speed:0.4 }] },
        plasmidos:{ txt:'Por el pilus la bacteria pasa un plásmido a otra: así se comparte la resistencia.', f:[{ from:new THREE.Vector3(0.95,0.42,-0.3), to:new THREE.Vector3(2.6,1.6,-0.9), color:0xE0784A, n:5, speed:0.35 }] },
        ribosomas:{ txt:'Las proteínas recién armadas se liberan al citoplasma.', f:[{ from:new THREE.Vector3(-0.5,0,0.3), to:new THREE.Vector3(0.9,-0.5,0.5), color:0x6A6488, n:6, speed:0.4 }] }
      }[id];
      if (!r){ flow.clear(); return ''; } flow.set(r.f); return r.txt;
    },
    stop(){ flow.clear(); },
    get modo(){ return modo; },
    setEscala(on){
      modo = on ? 'escala' : 'detalle';
      E.parts.forEach(p => E.setVisible(p.id, !on));
      escala.visible = on; flow.clear();
      const st = E.container, asp = (st.clientWidth || 800)/(st.clientHeight || 560), t = Math.tan(19*Math.PI/180);
      E.opts.maxR = Math.max(E.opts.maxR, 50); E.goalTarget.set(on ? 3.8 : 0, on ? -0.8 : 0, 0); E.goal.r = on ? clamp(Math.max(11/t, 14.8/(t*asp)), 20, 50) : E.opts.radius;
    },
    get cutaway(){ return cut; },
    setCutaway(on){ cut = on;
      capM.geometry = on ? g.cap.cut : g.cap.full;
      parO.geometry = on ? g.pOut.cut : g.pOut.full; parI.geometry = on ? g.pIn.cut : g.pIn.full;
      memO.geometry = on ? g.mOut.cut : g.mOut.full; memI.geometry = on ? g.mIn.cut : g.mIn.full;
      parRim.visible = on; memRim.visible = on; }
  };
}

/* =====================================================================
   RUTA: CÉLULA VEGETAL
   ===================================================================== */
route('/explorar/celula-vegetal', (view, q) => {
  const S = Object.fromEntries(VEG.structures.map(s=>[s.id,s]));
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'},
    h('div',{}, h('span',{class:'eyebrow cell'},'Mundo celular · Biología U2 · CCNN 8.º CVT U1'),
      h('h1',{},'Célula vegetal en corte'),
      h('p',{},'Gira, acércate y toca cada parte. Primero explora el modelo; la explicación aparece cuando seleccionas.')),
    h('div',{class:'row'}, h('span',{class:'pill cell'},'3D interactivo'), h('span',{class:'pill ok'},'+80 XP'))));

  view.append(franja({
    proposito:'Reconocer las estructuras propias de la célula vegetal y entender por qué una planta se sostiene sin tener esqueleto.',
    observa:[
      'El grosor de la pared celular comparado con la delgadez de la membrana que está por dentro',
      'Las pilas de tilacoides (granas) dentro de cada cloroplasto cuando te acercas',
      'Cuánto espacio ocupa la vacuola central y contra dónde empuja al núcleo',
      'Los canales que atraviesan la pared y comunican con la célula vecina'
    ],
    reto: VEG.reto
  }));

  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'viewer cel-viewer'}, stage, panel));

  let E = null, M = null, sel = null, tab = 'explorar';
  if (webglOK){
    try {
      E = new Engine3D(stage, { radius:11.5, phi:1.22, theta:0.42, minR:2.0, maxR:24, floor:-3.45, floorSize:10,
        aria:'Célula vegetal en 3D. Arrastra para rotar, rueda para acercar. También puedes usar la lista de componentes con el teclado.',
        onSelect:(id)=>{ if (id) select(id,'modelo'); } });
      M = buildPlant(E); celFitAspect(E, stage);
    } catch(err){ console.warn('célula vegetal 3D', err); E = null; M = null; }
  }
  const chrome = celChrome(stage, E, { left:h('span',{class:'pill cell'},'Célula vegetal'), model:'celula-vegetal',
    captureTxt:()=>`Captura de la célula vegetal 3D${sel ? ' · '+S[sel].nombre : ''}` });
  if (!E) stage.append(h('div',{class:'ph cel-fall',style:'margin:40px 20px'},
    'Este navegador no tiene WebGL, así que el modelo 3D no se puede dibujar. La lista de componentes, las fichas con los tres niveles y el reto funcionan igual: elige cualquier componente en la lista de abajo.'));

  const tabs = h('div',{class:'tabs',role:'tablist'});
  const body = h('div',{class:'stack'});
  [['explorar','Explorar'],['comparar','Comparar con la animal'],['capas','Capas']].forEach(([id,t]) =>
    tabs.append(h('button',{role:'tab','aria-selected':id===tab, onclick:()=>{ tab=id; paint(); }}, t)));
  panel.append(h('div',{class:'card'}, tabs, h('div',{style:'height:12px'}), body));

  const lista = listaComponentes(VEG.structures, 'celula-vegetal', (id,src)=>select(id,src), 'Componentes de la célula vegetal');
  const ctrl = {
    action: id => M ? (M.action(id) || ' ') : null,
    focus: id => { if (!E || !M) return false; const f = M.focos[id];
      if (f){ E.focus(f[0], f[1]); } else { E.fit(id); }
      chrome.phase.style.display=''; chrome.phase.textContent = 'Acercando: '+S[id].nombre; return true; }
  };

  function comparar(){
    const mas = ['Pared celular de celulosa: sostiene y evita que estalle al entrar agua.',
      'Cloroplastos: fabrican su propio alimento con luz (es autótrofa).',
      'Vacuola central enorme: almacena agua y genera la presión de turgencia.',
      'Plasmodesmos: canales que comunican los citoplasmas a través de la pared.',
      'Plastos de reserva (amiloplastos) que guardan almidón.'];
    const menos = ['No tiene centríolos (en las plantas superiores): el huso se arma igual, sin ellos.',
      'No tiene lisosomas típicos: la vacuola hace la digestión celular.',
      'No cambia de forma ni se desplaza: la pared se lo impide, y no lo necesita porque no busca alimento.',
      'No forma un anillo de citocinesis: separa las células hijas construyendo una placa celular.'];
    return h('div',{class:'stack'},
      h('p',{class:'small muted'},'La célula vegetal y la animal son las dos eucariotas: ambas tienen núcleo, mitocondrias, retículo, Golgi, ribosomas y membrana. Las diferencias se explican por el modo de vida.'),
      h('div',{class:'cel-cmp'},
        h('div',{class:'cel-box mas'}, h('h4',{},'Qué tiene DE MÁS que la animal'), h('ul',{}, mas.map(t=>h('li',{},t)))),
        h('div',{class:'cel-box menos'}, h('h4',{},'Qué tiene DE MENOS'), h('ul',{}, menos.map(t=>h('li',{},t))))),
      h('div',{class:'notice info'},'El porqué: la planta no se mueve y fabrica su alimento con luz. Necesita sostenerse (pared), captar luz (cloroplastos) y guardar agua (vacuola). El animal se mueve y busca su alimento: le conviene una célula flexible, sin pared.'),
      errorTipico('«La pared celular es lo mismo que la membrana.»',
        'Son dos capas distintas: la pared está por fuera, mide de 0,1 a varios micrómetros y es de celulosa; la membrana está por dentro, mide unos 8 nanómetros y es una bicapa de lípidos. La pared sostiene y deja pasar casi todo; la membrana selecciona qué entra. En el modelo, la franja del corte muestra el grosor de cada una.'),
      errorTipico('«Las plantas no tienen mitocondrias porque tienen cloroplastos.»',
        'Las plantas sí tienen mitocondrias y respiran las 24 horas, también en raíces y semillas donde no llega la luz. El cloroplasto fabrica glucosa; la mitocondria la usa para obtener ATP. Selecciona “Mitocondrias” en la lista y verás cinco de ellas en el modelo.'),
      h('table',{class:'data cel-tabla'},
        h('thead',{}, h('tr',{}, h('th',{},'Estructura'), h('th',{},'Animal'), h('th',{},'Vegetal'))),
        h('tbody',{}, [['Pared celular','no','sí'],['Cloroplastos','no','sí'],['Vacuola central grande','no','sí'],
          ['Plasmodesmos','no','sí'],['Centríolos','sí','no'],['Lisosomas','sí','no'],['Mitocondrias','sí','sí'],['Núcleo','sí','sí']]
          .map(([n,a,v]) => h('tr',{}, h('td',{},n),
            h('td',{class:a==='sí'?'si':'no'}, a==='sí'?'Sí':'No'),
            h('td',{class:v==='sí'?'si':'no'}, v==='sí'?'Sí':'No'))))),
      h('button',{class:'btn sm',onclick:()=>navigate('#/explorar/celula')},'Abrir la célula animal'));
  }

  function capas(){
    const box = h('div',{class:'stack'});
    if (M && M.setCutaway){
      const cb = h('input',{type:'checkbox',checked:true,'aria-label':'Vista en corte'});
      cb.addEventListener('change', ()=>{ M.setCutaway(cb.checked); Store.log('vista_corte',{modelo:'celula-vegetal',activa:cb.checked}); });
      box.append(h('label',{class:'toggle'}, cb, 'Vista en corte (se retira una cuña para ver el interior)'));
    }
    const op = h('input',{type:'range',min:0,max:100,value:100,id:'cel-veg-op','aria-label':'Opacidad de la pared'});
    const out = h('output',{},'100 %');
    op.addEventListener('input', ()=>{ out.value = op.value+' %'; E && E.setOpacity('pared', op.value/100); });
    box.append(h('div',{class:'slider'}, h('label',{for:'cel-veg-op'},'Opacidad de la pared'), out, op));
    const lay = h('div',{class:'layers'});
    VEG.structures.forEach(s => lay.append(h('label',{class:'toggle'},
      h('input',{type:'checkbox',checked:true,'aria-label':'Mostrar '+s.nombre,onchange:e=>E && E.setVisible(s.id, e.target.checked)}), s.nombre)));
    box.append(h('span',{class:'eyebrow'},'Componentes visibles'), lay,
      h('button',{class:'btn sm',onclick:()=>{ VEG.structures.forEach(s=>E && E.setVisible(s.id,true)); paint(); }},'Mostrar todo'));
    if (!E) box.append(h('div',{class:'notice warn'},'Estos controles cambian el modelo 3D, que no está disponible en este navegador.'));
    return box;
  }

  function paint(){
    $$('button',tabs).forEach((b,i)=> b.setAttribute('aria-selected', ['explorar','comparar','capas'][i]===tab));
    body.innerHTML = '';
    if (tab === 'explorar'){
      body.append(sel ? ficha(S[sel], 'celula-vegetal', ctrl)
        : h('div',{class:'notice'},'Toca una parte del modelo o elige un componente de la lista. La pared y la membrana son translúcidas: puedes hacer clic a través de ellas.'));
      body.append(h('div',{}, h('span',{class:'eyebrow'},'Componentes'), lista.el));
      lista.render(sel);
    }
    else if (tab === 'comparar') body.append(comparar());
    else body.append(capas());
  }

  function select(id, src){
    if (!S[id]) return;
    sel = id; M && M.stop(); E && E.select(id);
    Store.markSeen('celula-vegetal', id);
    Store.log('seleccion_estructura',{modelo:'celula-vegetal', estructura:id, origen:src});
    const n = (Store.s.seen['celula-vegetal']||[]).length;
    chrome.phase.style.display=''; chrome.phase.textContent = `${S[id].nombre} · ${n} de ${VEG.structures.length} exploradas`;
    tab = 'explorar'; paint();
  }
  paint();

  view.append(cierre('Reto resuelto · célula vegetal', {
    q:'Una hoja se marchita cuando le falta agua y vuelve a ponerse firme al regarla. ¿Qué estructura explica mejor ese cambio y por qué?',
    ops:[
      'La membrana plasmática, porque es rígida y sostiene la forma de la célula.',
      'La vacuola central junto con la pared celular: al llenarse de agua, la vacuola empuja la membrana contra la pared y la célula queda firme (turgencia).',
      'Los cloroplastos, porque fabrican el agua que la planta necesita.',
      'Las mitocondrias, porque las plantas no las tienen y por eso se marchitan.'
    ],
    ok:1,
    fb:'La turgencia es un trabajo de equipo: la vacuola aporta la presión del agua y la pared aporta la resistencia. Si sale agua, la vacuola se encoge, la célula pierde presión y la hoja cae.',
    wrong:[
      'La membrana nunca es rígida: es una bicapa de lípidos flexible de unos 8 nanómetros. Lo rígido es la pared celular, que está por fuera de ella. Son dos capas distintas.',
      'La fotosíntesis usa agua como reactivo y produce glucosa y oxígeno; no fabrica el agua que sostiene a la hoja. Esa agua entra por ósmosis desde la raíz.',
      'Las plantas sí tienen mitocondrias: respiran de día y de noche. En el modelo puedes seleccionarlas y contarlas.'
    ]
  }, 'reto-celula-vegetal'));

  if (q && q.s && S[q.s]) select(q.s, 'busqueda');
  return { unmount(){ if (E) E.dispose(); E = null; M = null; } };
});

/* =====================================================================
   RUTA: CÉLULA PROCARIOTA
   ===================================================================== */
route('/explorar/celula-procariota', (view, q) => {
  const S = Object.fromEntries(PRO.structures.map(s=>[s.id,s]));
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'},
    h('div',{}, h('span',{class:'eyebrow cell'},'Mundo celular · Biología U2 · CCNN 9.º CVT U1'),
      h('h1',{},'Célula procariota: una bacteria por dentro'),
      h('p',{},'Un bacilo en corte, con su flagelo girando. Explora primero y compara después el tamaño con una célula eucariota.')),
    h('div',{class:'row'}, h('span',{class:'pill cell'},'3D interactivo'), h('span',{class:'pill ok'},'+80 XP'))));

  view.append(franja({
    proposito:'Entender qué le falta a una célula procariota frente a una eucariota y cómo hace para vivir igual de bien (o mejor).',
    observa:[
      'Dónde está el ADN si no hay núcleo: búscalo como un ovillo suelto en el citoplasma',
      'Que el flagelo gira como un tornillo, movido por un motor anclado en la membrana',
      'El tamaño de la bacteria comparado con una célula animal: usa el botón de comparación de escala',
      'Que no hay mitocondrias ni cloroplastos ni retículo: ningún organelo con membrana'
    ],
    reto: PRO.reto
  }));

  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'viewer cel-viewer'}, stage, panel));

  let E = null, M = null, sel = null, tab = 'explorar';
  if (webglOK){
    try {
      E = new Engine3D(stage, { radius:9.5, phi:1.25, theta:0.4, minR:2.0, maxR:40, floor:-2.6, floorSize:9,
        aria:'Bacteria en 3D. Arrastra para rotar, rueda para acercar. También puedes usar la lista de componentes con el teclado.',
        onSelect:(id)=>{ if (id) select(id,'modelo'); } });
      M = buildProk(E); celFitAspect(E, stage);
    } catch(err){ console.warn('procariota 3D', err); E = null; M = null; }
  }
  const chrome = celChrome(stage, E, { left:h('span',{class:'pill cell'},'Bacteria (bacilo)'), model:'celula-procariota',
    captureTxt:()=>`Captura de la célula procariota 3D${sel ? ' · '+S[sel].nombre : ''}`,
    nota:'Modelo simplificado · cuerpo de unos 2 micrómetros de largo' });
  if (!E) stage.append(h('div',{class:'ph cel-fall',style:'margin:40px 20px'},
    'Sin WebGL no se puede dibujar el modelo 3D. Toda la información está en la lista de componentes y en la comparación de tamaño, que funcionan con teclado.'));

  const tabs = h('div',{class:'tabs',role:'tablist'});
  const body = h('div',{class:'stack'});
  [['explorar','Explorar'],['escala','Tamaño'],['falta','Qué le falta']].forEach(([id,t]) =>
    tabs.append(h('button',{role:'tab','aria-selected':id===tab, onclick:()=>{ tab=id; paint(); }}, t)));
  panel.append(h('div',{class:'card'}, tabs, h('div',{style:'height:12px'}), body));

  const lista = listaComponentes(PRO.structures, 'celula-procariota', (id,src)=>select(id,src), 'Componentes de la bacteria');
  const ctrl = {
    action: id => M ? (M.action(id) || ' ') : null,
    focus: id => { if (!E || !M) return false; const f = M.focos[id]; if (f) E.focus(f[0], f[1]); else E.fit(id); return true; }
  };

  function escalaBox(){
    const box = h('div',{class:'stack'});
    const btn = h('button',{class:'btn primary','aria-pressed': M && M.modo==='escala' ? 'true':'false', onclick:()=>{
      if (!M) return toast('La comparación en 3D necesita el modelo.');
      const on = M.modo !== 'escala'; M.setEscala(on); btn.setAttribute('aria-pressed', on?'true':'false');
      btn.textContent = on ? 'Volver a la bacteria' : 'Ver las dos juntas en 3D';
      Store.log('comparacion_escala',{activa:on});
    }}, M && M.modo==='escala' ? 'Volver a la bacteria' : 'Ver las dos juntas en 3D');
    box.append(h('p',{},'A escala real, una bacteria al lado de una célula animal se ve así de pequeña:'), btn,
      h('div',{class:'cel-esc'},
        h('div',{}, h('div',{class:'b',style:'width:200px;height:20px'}), h('span',{class:'small muted'},'Célula animal: unos 20 micrómetros')),
        h('div',{}, h('div',{class:'b mini',style:'width:20px;height:8px'}), h('span',{class:'small muted'},'Bacteria: unos 2 micrómetros'))),
      h('table',{class:'data cel-tabla'},
        h('thead',{}, h('tr',{}, h('th',{},'Comparación'), h('th',{},'Procariota'), h('th',{},'Eucariota'))),
        h('tbody',{}, [['Largo típico','1 a 5 micrómetros','10 a 100 micrómetros'],
          ['Cuántas caben','unas 1 000 bacterias en el volumen de una célula animal','—'],
          ['ADN','circular, en el nucleoide','lineal, en cromosomas dentro del núcleo'],
          ['Ribosomas','70S','80S (y 70S en mitocondrias)'],
          ['División','fisión binaria, cada 20 minutos','mitosis, varias horas']]
          .map(r => h('tr',{}, h('td',{},r[0]), h('td',{},r[1]), h('td',{},r[2]))))),
      h('div',{class:'notice info'},'Al ser tan pequeña, la bacteria tiene muchísima superficie por cada unidad de volumen: le alcanza con su membrana para intercambiar todo y no necesita organelos internos.'));
    return box;
  }

  function faltaBox(){
    return h('div',{class:'stack'},
      h('div',{class:'cel-cmp'},
        h('div',{class:'cel-box menos'}, h('h4',{},'Qué NO tiene'), h('ul',{}, [
          'Núcleo verdadero (no hay envoltura nuclear)','Mitocondrias','Cloroplastos','Retículo endoplasmático y Golgi',
          'Lisosomas ni vacuolas grandes','Citoesqueleto complejo como el nuestro'].map(t=>h('li',{},t)))),
        h('div',{class:'cel-box mas'}, h('h4',{},'Cómo sobrevive igual'), h('ul',{}, [
          'El ADN está suelto en el nucleoide: se transcribe y se traduce a la vez, más rápido.',
          'Respira en su propia membrana plasmática, que hace el trabajo de la membrana interna mitocondrial.',
          'Las cianobacterias hacen fotosíntesis en membranas internas, sin cloroplasto.',
          'Es tan pequeña que todo llega por difusión: no necesita “cuartos” ni transporte interno.',
          'Se divide por fisión binaria en 20 minutos y comparte genes por plásmidos: se adapta rapidísimo.'].map(t=>h('li',{},t))))),
      errorTipico('«Las bacterias son siempre dañinas.»',
        'La gran mayoría es inofensiva o necesaria. En el intestino nos ayudan a digerir y producen vitamina K; en el suelo, Rhizobium fija nitrógeno para las leguminosas; en la cocina, Lactobacillus convierte la leche en yogur y queso. Solo un pequeño grupo es patógeno.'),
      errorTipico('«Sin núcleo, la bacteria no tiene ADN.»',
        'Sí tiene ADN: un cromosoma circular en el nucleoide y, muchas veces, plásmidos. Lo que no tiene es la envoltura que lo encierra. Selecciona “Nucleoide” en la lista para verlo.'),
      h('button',{class:'btn sm',onclick:()=>navigate('#/explorar/celula-comparar')},'Ver las tres células comparadas'));
  }

  function paint(){
    $$('button',tabs).forEach((b,i)=> b.setAttribute('aria-selected', ['explorar','escala','falta'][i]===tab));
    body.innerHTML = '';
    if (tab === 'explorar'){
      body.append(sel ? ficha(S[sel], 'celula-procariota', ctrl)
        : h('div',{class:'notice'},'Toca una parte del modelo o elige un componente de la lista.'));
      body.append(h('div',{}, h('span',{class:'eyebrow'},'Componentes'), lista.el));
      lista.render(sel);
    }
    else if (tab === 'escala') body.append(escalaBox());
    else body.append(faltaBox());
  }

  function select(id, src){
    if (!S[id]) return;
    if (M && M.modo === 'escala') M.setEscala(false);
    sel = id; M && M.stop(); E && E.select(id);
    Store.markSeen('celula-procariota', id);
    Store.log('seleccion_estructura',{modelo:'celula-procariota', estructura:id, origen:src});
    chrome.phase.style.display=''; chrome.phase.textContent = S[id].nombre;
    tab = 'explorar'; paint();
  }
  paint();

  view.append(cierre('Reto resuelto · célula procariota', {
    q:'Una bacteria del suelo no tiene núcleo ni mitocondrias, y aun así crece y se reproduce. ¿Qué explicación es correcta?',
    ops:[
      'Sin núcleo no puede tener ADN: se reproduce sin heredar información.',
      'Su ADN está en el nucleoide y la respiración ocurre en su propia membrana plasmática; además, muchas bacterias son útiles para el suelo y para nosotros.',
      'Todas las bacterias causan enfermedades, así que en el suelo solo hacen daño.',
      'En realidad es una célula vegetal pequeña, porque tiene pared celular.'
    ],
    ok:1,
    fb:'No tener organelos no es una carencia fatal: la bacteria reparte esas funciones en su membrana y su citoplasma, y su tamaño diminuto hace que todo llegue por difusión.',
    wrong:[
      'Sin núcleo sigue habiendo ADN: un cromosoma circular en el nucleoide, más los plásmidos. Lo que falta es la envoltura nuclear, no la información.',
      'La mayoría de las bacterias no son patógenas: fijan nitrógeno en el suelo, descomponen materia orgánica y viven en nuestro intestino ayudándonos a digerir.',
      'Tener pared no la convierte en vegetal: la pared de la planta es de celulosa y la de la bacteria es de peptidoglicano, y la bacteria no tiene ni núcleo ni cloroplastos.'
    ]
  }, 'reto-procariota'));

  if (q && q.s && S[q.s]) select(q.s, 'busqueda');
  return { unmount(){ if (E) E.dispose(); E = null; M = null; } };
});

/* =====================================================================
   PROCESOS CELULARES — piezas comunes
   ===================================================================== */
const smooth = u => u<=0 ? 0 : u>=1 ? 1 : u*u*(3-2*u);
const lerp = (a,b,u) => a + (b-a)*u;

const V = (x,y,z) => new THREE.Vector3(x,y,z);
const lerpV = (a,b,u,o) => (o || new THREE.Vector3()).set(lerp(a.x,b.x,u), lerp(a.y,b.y,u), lerp(a.z,b.z,u));
const AX = { X:V(1,0,0), Y:V(0,1,0), Z:V(0,0,1) };
/* Interpola los campos numéricos (y vectores) de una tabla de fases */
function faseMix(PH, T){
  const p = Math.max(0, Math.min(PH.length-1, Math.floor(T))), p2 = Math.min(PH.length-1, p+1), u = smooth(T - p), o = { p, u };
  Object.keys(PH[p]).forEach(k => { const a = PH[p][k], b = PH[p2][k]; o[k] = a && a.isVector3 ? lerpV(a, b, u) : (typeof a === 'number' ? lerp(a, b, u) : a); });
  return o;
}

/* ---------- Cuerpo celular deformable (eje local X): esfera → alargada → dos lóbulos con surco de citocinesis ---------- */
function celBody(E, o){
  const low = E.low; const g = new THREE.SphereGeometry(1, low?40:64, low?28:46); g.rotateZ(-Math.PI/2);
  const pos = g.attributes.position, N = pos.count, base = Float32Array.from(pos.array);
  const grp = new Int32Array(N), seen = new Map();
  for (let i=0;i<N;i++){ const k = Math.round(base[i*3]*1e4)+','+Math.round(base[i*3+1]*1e4)+','+Math.round(base[i*3+2]*1e4); if (!seen.has(k)) seen.set(k, i); grp[i] = seen.get(k); }
  const mat = celFresnel(Kit.tissue({ tex:'membrane', rep:o.rep || [7,4], bump:0.035, color:o.color, transparent:true, opacity:o.opacity ?? 0.55, rough:0.22, coat:1, coatRough:0.12, side:THREE.DoubleSide, depthWrite:false, env:1.25 }), o.fr ?? 0.2, 1.6);
  const inMat = Kit.tissue({ color:o.inner ?? 0xDDF2F5, transparent:true, opacity:o.inOp ?? 0.12, rough:0.6, coat:0, side:THREE.BackSide, depthWrite:false });
  const mesh = new THREE.Mesh(g, mat), inner = new THREE.Mesh(g, inMat); mesh.renderOrder = 2; inner.renderOrder = 1; E.scene.add(inner); E.scene.add(mesh);
  const acc = new Float32Array(N*3); let key = '';
  /* sm suaviza el surco; cuando los lóbulos ya se separan (d ≥ r) se anula para que las hijas queden redondas */
  const smf = (d, r) => 0.3*d*(1 - smooth((d/r - 0.95)/0.1));
  const prof = (X, d, r) => { const sm = smf(d, r), sX = Math.sqrt(X*X + sm*sm) - sm, t = (sX - d)/r; return r*Math.sqrt(Math.max(0, 1 - t*t)); };
  const xmax = (d, r) => { const sm = smf(d, r); return Math.sqrt(Math.pow(d + r + sm, 2) - sm*sm); };
  const api = { mesh, inner, mat, d:0, r:1, rz:0, pos:V(0,0,0),
    set(d, r, shapeFn){ const k = d.toFixed(3)+'|'+r.toFixed(3)+'|'+(shapeFn ? shapeFn.key : ''); if (k === key) return; key = k; api.d = d; api.r = r;
      const Xm = xmax(d, r), P = pos.array;
      for (let i=0;i<N;i++){ const ux = base[i*3], uy = base[i*3+1], uz = base[i*3+2], rad = Math.hypot(uy, uz);
        let X = ux*Xm, rho = prof(X, d, r), f = rad > 1e-6 ? rho/rad : 0; let x = X, y = uy*f, z = uz*f;
        if (shapeFn){ const q = shapeFn(ux, uy, uz, x, y, z); x = q[0]; y = q[1]; z = q[2]; }
        P[i*3] = x; P[i*3+1] = y; P[i*3+2] = z; }
      pos.needsUpdate = true; g.computeVertexNormals();
      const n = g.attributes.normal.array; acc.fill(0);
      for (let i=0;i<N;i++){ const j = grp[i]*3; acc[j] += n[i*3]; acc[j+1] += n[i*3+1]; acc[j+2] += n[i*3+2]; }
      for (let i=0;i<N;i++){ const j = grp[i]*3, l = Math.hypot(acc[j],acc[j+1],acc[j+2]) || 1; n[i*3] = acc[j]/l; n[i*3+1] = acc[j+1]/l; n[i*3+2] = acc[j+2]/l; }
      g.attributes.normal.needsUpdate = true; g.computeBoundingSphere(); },
    place(p, rz){ api.pos.copy(p); api.rz = rz || 0; [mesh, inner].forEach(m => { m.position.copy(p); m.rotation.set(0, 0, api.rz); }); },
    show(v, op){ mesh.visible = inner.visible = v; if (op !== undefined){ mat.opacity = (o.opacity ?? 0.55)*op; inMat.opacity = (o.inOp ?? 0.12)*op; } },
    /* punto interior: dirección unitaria u (local), fracción k del camino entre el centro del lóbulo y la membrana */
    inside(u, k, out){ const Xm = xmax(api.d, api.r), X = u.x*Xm, rad = Math.hypot(u.y, u.z), rho = prof(X, api.d, api.r), f = rad > 1e-6 ? rho/rad : 0;
      const cx = Math.sign(u.x || 1)*Math.min(api.d, Math.abs(X));
      out.set(cx + (X - cx)*k, u.y*f*k, u.z*f*k).applyAxisAngle(AX.Z, api.rz).add(api.pos); return out; }
  };
  api.set(0, 1); return api;
}

/* ---------- Cromátida con volumen: brazo corto (p) y largo (q) desde el centrómero, bandas y superficie de cromatina ---------- */
const celBandMat = c => Kit.tissue({ color:c, vc:true, rough:0.52, coat:0.22, coatRough:0.45, env:0.7 });
function celArm(L, r, u0, u1, seed, low){
  const R = Kit.rng(seed), wob = (R()-0.5)*0.16*L, N = 8, pts = [];
  for (let i=0;i<=N;i++){ const u = u0 + (u1-u0)*i/N; pts.push(V(wob*Math.sin(u*Math.PI), u*L, 0)); }
  const prof = u => { let k = 1; if (u < 0.16) k = 0.58 + 0.42*smooth(u/0.16); if (u > 0.84) k *= Math.sqrt(Math.max(0, 1 - Math.pow((u-0.84)/0.16, 2))); return r*k; };
  const seg = low ? 14 : 26, rad = low ? 8 : 12;
  const g = Kit.taper(pts, r, r, { seg, rad, rfn: t => prof(u0 + (u1-u0)*t), bumpy:0.09, bf:36*L*(u1-u0), seed });
  /* bandas tipo G: franjas claras y oscuras a lo largo del brazo */
  const ph = R()*6.3, fq = 5.5 + R()*2.5, col = new Float32Array(g.attributes.position.count*3);
  for (let i=0;i<=seg;i++){ const u = u0 + (u1-u0)*i/seg, x = u*L; const b = Math.sin(x*fq*2.1 + ph) + 0.6*Math.sin(x*fq*4.3 + ph*1.7);
    const v = 1 - 0.36*smooth((b - 0.15)/0.5) - (u > 0.9 ? 0.1 : 0);
    for (let j=0;j<=rad;j++){ const k = (i*(rad+1)+j)*3; col[k] = col[k+1] = col[k+2] = v; } }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}
const CEL_KIN = new THREE.SphereGeometry(1, 14, 10);
function celChromatid(E, o){
  const low = E.low, mA = o.mat || celBandMat(o.color), mT = o.tip !== undefined ? celBandMat(o.tip) : null;
  const kMat = Kit.tissue({ color:new THREE.Color(o.color).multiplyScalar(0.42), rough:0.5, coat:0.4 });
  const f = mT ? 0.55 : 1;
  const pA = new THREE.Mesh(celArm(o.Lp, o.r, 0, mT ? f + 0.02 : 1, o.seed, low), mA), pB = mT ? new THREE.Mesh(celArm(o.Lp, o.r, f, 1, o.seed, low), mT) : null;
  const q = new THREE.Mesh(celArm(o.Lq, o.r, 0, 1, o.seed + 3, low), mA), kin = new THREE.Mesh(CEL_KIN, kMat);
  const ms = [pA, q, kin].concat(pB ? [pB] : []); ms.forEach(m => E.scene.add(m));
  const dP = V(0,0,0), dQ = V(0,0,0), qq = new THREE.Quaternion(), tmp = V(0,0,0);
  const api = { c:V(0,0,0), mats:{ main:mA, tip:mT }, meshes:ms,
    /* c: centrómero · up: dirección del brazo p · side: hacia su polo · bend: apertura en X · trailAx/trail: pliegue en V al ser arrastrada */
    pose(c, up, side, bend, trailAx, trail, sx, sy, vis){
      api.c.copy(c); ms.forEach(m => m.visible = vis); if (!vis) return;
      dP.copy(up).multiplyScalar(Math.cos(bend)).addScaledVector(side, Math.sin(bend)).normalize();
      dQ.copy(up).multiplyScalar(-Math.cos(bend)).addScaledVector(side, Math.sin(bend)).normalize();
      if (trail){ [dP, dQ].forEach(d => { tmp.copy(d).multiplyScalar(Math.cos(trail)).addScaledVector(trailAx, Math.sin(trail)); d.copy(tmp.normalize()); }); }
      qq.setFromUnitVectors(AX.Y, dP); [pA, pB].forEach(m => { if (!m) return; m.position.copy(c); m.quaternion.copy(qq); m.scale.set(sx, sy, sx); });
      qq.setFromUnitVectors(AX.Y, dQ); q.position.copy(c); q.quaternion.copy(qq); q.scale.set(sx, sy, sx);
      kin.position.copy(c); kin.scale.setScalar(o.r*0.74*sx);
    },
    tipPos(out){ return out.copy(dP).multiplyScalar(o.Lp*0.55).add(api.c); },
    setTip(c){ if (mT) mT.color.set(c); }
  };
  return api;
}

/* ---------- Huso: fibras (microtúbulos) instanciadas; se reescriben las matrices, no la geometría ---------- */
function celSpindle(E, max, color){
  const g = new THREE.CylinderGeometry(1, 1, 1, 5, 1, true); g.translate(0, 0.5, 0);
  const mat = new THREE.MeshStandardMaterial({ color:color || 0x4FA3E0, emissive:color || 0x4FA3E0, emissiveIntensity:0.35, transparent:true, opacity:0, roughness:0.45, depthWrite:false });
  const im = new THREE.InstancedMesh(g, mat, max); im.count = 0; im.frustumCulled = false; im.renderOrder = 3; E.scene.add(im);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = V(1,1,1), dir = V(0,0,0); let n = 0;
  const api = { begin(){ n = 0; },
    fiber(a, b, w){ if (n >= max) return; dir.subVectors(b, a); const L = dir.length(); if (L < 1e-3) return; q.setFromUnitVectors(AX.Y, dir.multiplyScalar(1/L)); sc.set(w, L, w); m4.compose(a, q, sc); im.setMatrixAt(n++, m4); },
    bent(a, b, mid, w){ api.fiber(a, mid, w); api.fiber(mid, b, w); },
    end(op){ im.count = n; im.instanceMatrix.needsUpdate = true; mat.opacity = op; im.visible = op > 0.01 && n > 0; } };
  return api;
}
/* Huso completo entre dos polos: fibras del cinetocoro, polares (se solapan en el ecuador) y ásteres */
function celHuso(E){
  const kin = celSpindle(E, 24, 0x2E86D6), pol = celSpindle(E, 40, 0x4FA3E0), ast = celSpindle(E, 48, 0x6FB8EC);
  const ax = V(0,0,0), e1 = V(0,0,0), e2 = V(0,0,0), rd = V(0,0,0), a = V(0,0,0), b = V(0,0,0), m = V(0,0,0), mid = V(0,0,0);
  const api = { begin(){ kin.begin(); pol.begin(); ast.begin(); },
    /* A, B: polos · targets: [{c, pole:0|1}] · npol: fibras polares por polo */
    add(A, B, targets, npol, spread){
      ax.subVectors(B, A); const L = ax.length(); if (L < 0.2){ ax.set(1,0,0); } else ax.multiplyScalar(1/L);
      e1.set(0,1,0); if (Math.abs(e1.dot(ax)) > 0.9) e1.set(0,0,1); e1.addScaledVector(ax, -e1.dot(ax)).normalize(); e2.crossVectors(ax, e1);
      mid.addVectors(A, B).multiplyScalar(0.5);
      (targets||[]).forEach(t => kin.fiber(t.pole ? B : A, t.c, 0.03));
      for (let s=0;s<2;s++){ const P = s ? B : A, sg = s ? -1 : 1;
        for (let i=0;i<npol;i++){ const t = (i + 0.5*s)/npol*Math.PI*2; rd.copy(e1).multiplyScalar(Math.cos(t)).addScaledVector(e2, Math.sin(t));
          b.copy(mid).addScaledVector(ax, sg*0.55).addScaledVector(rd, (spread||1)*0.9);
          m.addVectors(P, b).multiplyScalar(0.5).addScaledVector(rd, (spread||1)*0.42); pol.bent(P, b, m, 0.018); }
        for (let i=0;i<10;i++){ const t = i/10*Math.PI*2 + s; rd.copy(e1).multiplyScalar(Math.cos(t)).addScaledVector(e2, Math.sin(t));
          a.copy(ax).multiplyScalar(-sg*0.55).addScaledVector(rd, 0.84).normalize(); b.copy(P).addScaledVector(a, 0.42 + 0.14*((i*7)%3)/2); ast.fiber(P, b, 0.014); } } },
    end(ko, po, ao){ kin.end(ko); pol.end(po); ast.end(ao); } };
  return api;
}
/* Centrosoma: par de centríolos perpendiculares con su nube pericentriolar */
function celCentrosome(E){
  const c1 = new THREE.CylinderGeometry(0.075, 0.075, 0.26, 9), c2 = new THREE.CylinderGeometry(0.075, 0.075, 0.26, 9); c2.rotateZ(Math.PI/2); c2.translate(0.1, -0.13, 0);
  const rods = new THREE.Mesh(Kit.merge([c1, c2]), Kit.tissue({ color:0x3D6FB8, rough:0.35, coat:0.6 }));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.36, 18, 14), new THREE.MeshBasicMaterial({ color:0xBFE4FF, transparent:true, opacity:0.32, depthWrite:false, toneMapped:false }));
  E.scene.add(rods); E.scene.add(halo);
  return { set(p, vis){ rods.position.copy(p); halo.position.copy(p); rods.visible = halo.visible = vis; rods.rotation.set(0.4, p.x*0.2, 0.3); } };
}
/* Núcleo con envoltura doble que se disuelve y se rearma */
function celNucleus(E, seed){
  const low = E.low; const g = celNoiseAttr(Kit.sculpt({ radii:[1,0.95,1], w: low?40:64, h: low?28:46, disp:(p,d) => 0.02*Kit.fbm(d.x*3+seed, d.y*3, d.z*3, 2) }), 2.4, seed);
  const mat = Kit.tissue({ tex:'membrane', rep:[3,2], bump:0.02, color:0x8C74DA, transparent:true, opacity:0.7, rough:0.32, coat:0.8, side:THREE.DoubleSide, depthWrite:false });
  const u = celDissolve(mat); celFresnel(mat, 0.3, 1.3);
  const mesh = new THREE.Mesh(g, mat); mesh.renderOrder = 1; E.scene.add(mesh);
  return { mesh, set(p, rad, diss){ mesh.position.copy(p); mesh.scale.setScalar(rad); u.value = diss; mesh.visible = diss < 0.985 && rad > 0.01; } };
}
/* Cromatina descondensada: un "territorio" enmarañado por cromosoma, con su color */
function celChromatin(E, cols, seed, rad){
  const low = E.low, R = Kit.rng(seed), geos = [];
  cols.forEach((c, k) => { const ctr = dirOf(R).multiplyScalar(rad*0.42); let p = ctr.clone(); const pts = [p.clone()];
    for (let j=0;j<(low?22:36);j++){ p = p.clone().add(dirOf(R).multiplyScalar(rad*0.28)); if (p.distanceTo(ctr) > rad*0.55) p.sub(ctr).multiplyScalar(0.6).add(ctr); if (p.length() > rad*0.86) p.multiplyScalar(0.8); pts.push(p); }
    const g = Kit.taper(pts, 0.04, 0.036, { seg: low?90:200, rad:5, bumpy:0.45, bf:90, seed:k+seed });
    const col = new THREE.Color(c), a = new Float32Array(g.attributes.position.count*3); for (let i=0;i<a.length;i+=3){ a[i] = col.r; a[i+1] = col.g; a[i+2] = col.b; }
    g.setAttribute('color', new THREE.BufferAttribute(a, 3)); geos.push(g); });
  const mat = Kit.tissue({ vc:true, color:0xffffff, rough:0.5, coat:0.3, transparent:true, opacity:1, depthWrite:true });
  const mesh = new THREE.Mesh(Kit.merge(geos), mat); E.scene.add(mesh);
  return { mesh, set(p, sc, op){ mesh.position.copy(p); mesh.scale.setScalar(sc); mat.opacity = op; mat.depthWrite = op > 0.95; mesh.visible = op > 0.02; } };
}
/* Orgánulos del citoplasma que acompañan a la célula al dividirse (mitocondrias y vesículas) */
function celCyto(E, body, n, seed){
  const R = Kit.rng(seed), g = new THREE.SphereGeometry(0.13, 12, 8); g.scale(2.3, 1, 1);
  const mito = new THREE.InstancedMesh(g, Kit.tissue({ color:0xE0703E, rough:0.4, coat:0.6 }), n);
  const vg = new THREE.IcosahedronGeometry(0.07, 1), nv = n*2, ves = new THREE.InstancedMesh(vg, Kit.tissue({ color:0xF2C865, rough:0.35, coat:0.6 }), nv);
  const it = []; for (let i=0;i<n+nv;i++) it.push({ u:dirOf(R), k:0.5 + R()*0.38, q:new THREE.Quaternion().setFromEuler(new THREE.Euler(R()*6, R()*6, R()*6)) });
  E.scene.add(mito); E.scene.add(ves); const m4 = new THREE.Matrix4(), p = V(0,0,0), one = V(1,1,1);
  return { update(bodies){ it.forEach((o, i) => { const b = bodies[i % bodies.length]; b.inside(o.u, o.k, p); m4.compose(p, o.q, one); (i < n ? mito : ves).setMatrixAt(i < n ? i : i - n, m4); });
      mito.instanceMatrix.needsUpdate = ves.instanceMatrix.needsUpdate = true; },
    show(v){ mito.visible = ves.visible = v; } };
}
/* Moléculas con forma (para el flujo de partículas) */
function celMolGeo(kind){
  const parts = [], put = (g, c, x, y, z) => { g.translate(x, y, z); const col = new THREE.Color(c), a = new Float32Array(g.attributes.position.count*3); for (let i=0;i<a.length;i+=3){ a[i]=col.r; a[i+1]=col.g; a[i+2]=col.b; } g.setAttribute('color', new THREE.BufferAttribute(a,3)); g.deleteAttribute('uv'); parts.push(g); };
  const S = (r) => new THREE.SphereGeometry(r, 12, 9);
  if (kind === 'agua'){ put(S(0.1), 0xE0453A, 0,0,0); put(S(0.066), 0xF4F6F8, 0.085,0.06,0); put(S(0.066), 0xF4F6F8, -0.085,0.06,0); }
  else if (kind === 'co2'){ put(S(0.085), 0x3A3F48, 0,0,0); put(S(0.078), 0xE0453A, 0.14,0,0); put(S(0.078), 0xE0453A, -0.14,0,0); }
  else if (kind === 'o2'){ put(S(0.085), 0xE0453A, 0.07,0,0); put(S(0.085), 0xE0453A, -0.07,0,0); }
  else if (kind === 'atp'){ put(S(0.07), 0x5B7BD6, -0.16,0,0); put(S(0.06), 0xF2C037, -0.03,0,0); put(S(0.058), 0xF08A24, 0.08,0,0); put(S(0.058), 0xF08A24, 0.18,0.02,0); put(S(0.058), 0xF08A24, 0.28,0,0); }
  else if (kind === 'glucosa'){ const t = new THREE.TorusGeometry(0.2, 0.05, 8, 6); put(t, 0xF2C037, 0,0,0); for (let i=0;i<6;i++){ const a = i/6*Math.PI*2; put(S(0.055), i ? 0x3A3F48 : 0xE0453A, Math.cos(a)*0.2, Math.sin(a)*0.2, 0); } }
  else if (kind === 'piruvato'){ const t = new THREE.TorusGeometry(0.13, 0.04, 8, 3); put(t, 0xE08A3C, 0,0,0); for (let i=0;i<3;i++){ const a = i/3*Math.PI*2; put(S(0.05), 0x3A3F48, Math.cos(a)*0.13, Math.sin(a)*0.13, 0); } }
  else if (kind === 'ion'){ put(S(0.09), 0xffffff, 0,0,0); }
  return Kit.merge(parts);
}
const celMolMat = () => new THREE.MeshStandardMaterial({ vertexColors:true, roughness:0.35, metalness:0, emissive:0x111111 });

/* =====================================================================
   ESCENA: MITOSIS
   ===================================================================== */
const ESC_MITOSIS = {
  id:'mitosis', nombre:'Mitosis', sub:'Una célula madre → dos células hijas idénticas',
  cam:{ radius:14.2, phi:1.32, theta:0.42, minR:6, maxR:28, floor:-3.5, floorSize:12 },
  steps:[
    { n:'Interfase (G2)', d:'La célula ya copió su ADN: cada cromosoma tiene dos cromátidas hermanas idénticas, pero la cromatina sigue descondensada dentro del núcleo.' },
    { n:'Profase', d:'La cromatina se condensa y aparecen los cromosomas con forma de X. La envoltura nuclear se desarma y se forma el huso acromático.' },
    { n:'Metafase', d:'Los cromosomas se alinean en el plano ecuatorial, sujetos por el huso desde los dos polos. Es el mejor momento para contarlos.' },
    { n:'Anafase', d:'Se separan las cromátidas hermanas: cada una viaja hacia un polo opuesto. Desde aquí cada polo tiene un juego completo.' },
    { n:'Telofase y citocinesis', d:'Se forman dos envolturas nucleares nuevas, la cromatina se descondensa y el citoplasma se divide: dos células hijas idénticas entre sí y a la madre.' }
  ],
  datos:[
    ['Cromosomas de la madre','4 (2 pares)'], ['Cromátidas totales','8'],
    ['Células hijas','2'], ['Cromosomas por hija','4 · iguales a la madre'],
    ['Tipo de división','ecuacional (2n → 2n)']
  ],
  build(E){
    const low = E.low, R = Kit.rng(11);
    /* par 1 (largo): rojo y naranja · par 2 (corto): azul y turquesa — cada homólogo con su tono */
    const COL = [0xE0334A, 0xF08A24, 0x2F74E0, 0x14A394];
    const SIZE = [[0.5,0.82],[0.5,0.82],[0.26,0.52],[0.26,0.52]];
    const body = celBody(E, { color:0x86CCDA, opacity:0.5, fr:0.16 });
    const cyto = celCyto(E, body, low ? 10 : 16, 4);
    const nucM = celNucleus(E, 3), nucL = celNucleus(E, 5), nucR = celNucleus(E, 7);
    const chM = celChromatin(E, COL, 21, 1.65), chL = celChromatin(E, COL, 23, 1.65), chR = celChromatin(E, COL, 23, 1.65);
    const nlMat = Kit.tissue({ tex:'granular', rep:[2,2], bump:0.02, color:0x3E2A86, rough:0.5, coat:0.3, transparent:true, opacity:1 });
    const nls = [0,1,2].map(() => { const m = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 16), nlMat.clone()); E.scene.add(m); return m; });
    const cen = [celCentrosome(E), celCentrosome(E)], huso = celHuso(E);
    const chr = COL.map((c,i) => { const mat = celBandMat(c);
      const sis = [0,1].map(() => celChromatid(E, { Lp:SIZE[i][0], Lq:SIZE[i][1], r:0.125, color:c, seed:i*7+1, mat }));
      return { sis, rnd:dirOf(R).multiplyScalar(0.78), u0:dirOf(R), s0:dirOf(R), mp:[V(0,1.42,0.28), V(0,-0.28,-0.3), V(0,0.56,-0.25), V(0,-1.36,0.32)][i], tz:[0.45,-0.5,-0.4,0.5][i] }; });
    const PH = [
      { cond:0,    ring:0, spread:1, sep:0.1,  open:0.16, trail:0,   shrink:0,    chrom:1,    diss:0,    nl:1,   chromD:0,    dissD:1.01, nlD:0,   kin:0,    pol:0,    ast:0.3,  d:0,    r:3.0,  A:V(0.25,2.05,0.5), B:V(0.62,1.95,0.42) },
      { cond:0.55, ring:0, spread:1, sep:0.1,  open:0.2,  trail:0,   shrink:0,    chrom:0.22, diss:0.55, nl:0.15, chromD:0,   dissD:1.01, nlD:0,   kin:0,    pol:0.45, ast:0.75, d:0,    r:3.0,  A:V(-2.05,1.25,0.35), B:V(2.05,1.25,0.35) },
      { cond:1,    ring:1, spread:0, sep:0.1,  open:0.16, trail:0,   shrink:0,    chrom:0,    diss:1.01, nl:0,   chromD:0,    dissD:1.01, nlD:0,   kin:0.9,  pol:0.75, ast:0.85, d:0,    r:3.0,  A:V(-2.45,0,0), B:V(2.45,0,0) },
      { cond:1,    ring:1, spread:0, sep:1.9,  open:0.16, trail:1.0, shrink:0.28, chrom:0,    diss:1.01, nl:0,   chromD:0,    dissD:1.01, nlD:0,   kin:0.9,  pol:0.85, ast:0.85, d:0.95, r:2.95, A:V(-3.2,0,0), B:V(3.2,0,0) },
      { cond:0.42, ring:1, spread:0, sep:2.9,  open:0.16, trail:0.75, shrink:0.5, chrom:0,    diss:1.01, nl:0,   chromD:0.8,  dissD:0.02, nlD:0.8, kin:0.12, pol:0.4,  ast:0.25, d:2.35, r:2.5,  A:V(-3.95,0,0), B:V(3.95,0,0) }
    ];
    const c = V(0,0,0), up = V(0,0,0), side = V(0,0,0), sd = V(0,0,0), rad = V(0,0,0), tan = V(0,0,0), cs = V(0,0,0), tr = V(0,0,0);
    const DL = V(-2.75,0,0), DR = V(2.75,0,0), O = V(0,0,0);
    function apply(T){
      const f = faseMix(PH, T);
      body.set(f.d, f.r); body.place(O, 0); cyto.update([body]);
      nucM.set(O, 1.75, f.diss); nucL.set(DL, 1.3, f.dissD); nucR.set(DR, 1.3, f.dissD);
      chM.set(O, 1, f.chrom); chL.set(DL, 0.66, f.chromD); chR.set(DR, 0.66, f.chromD);
      [[nls[0], V(0.45,0.3,0.4), 0.28, f.nl], [nls[1], DL.clone().add(V(0.2,0.2,0.25)), 0.2, f.nlD], [nls[2], DR.clone().add(V(0.2,0.2,0.25)), 0.2, f.nlD]].forEach(([m,p,s,o]) => {
        m.position.copy(p); m.scale.setScalar(s*(0.5+0.5*o)); m.material.opacity = o; m.material.depthWrite = o > 0.95; m.visible = o > 0.02; });
      const vis = f.cond > 0.03, sx = lerp(0.3, 1, f.cond), sy = lerp(2.0, 1, f.cond);
      const targets = [];
      chr.forEach(ch => {
        /* en la placa metafásica los cromosomas se apilan a lo largo del ecuador, con los brazos en el plano de la placa */
        c.copy(ch.rnd).multiplyScalar(f.spread*1.25).addScaledVector(ch.mp, f.ring); c.y *= 1 - f.shrink; c.z *= 1 - f.shrink;
        tan.set(0, 1, ch.tz).normalize(); up.copy(tan).multiplyScalar(f.ring).addScaledVector(ch.u0, 1 - f.ring).normalize();
        sd.copy(ch.s0).multiplyScalar(1 - f.ring).addScaledVector(AX.X, f.ring); sd.addScaledVector(up, -sd.dot(up)).normalize();
        ch.sis.forEach((cd, s) => { const dir = s ? 1 : -1; side.copy(sd).multiplyScalar(dir); tr.copy(side).negate();
          cs.copy(c).addScaledVector(side, f.sep); cd.pose(cs, up, side, f.open, tr, f.trail, sx, sy, vis);
          if (f.kin > 0.01) targets.push({ c:cd.c, pole:s }); });
      });
      huso.begin(); huso.add(f.A, f.B, targets, low ? 6 : 9, 1); huso.end(f.kin, f.pol, f.ast);
      cen[0].set(f.A, true); cen[1].set(f.B, true);
    }
    return { apply, fases:PH.length };
  },
  svg(p){
    const pos = [[[0,0]],[[0,0]],[[0,-26],[0,26]],[[-46,-20],[-46,20],[46,-20],[46,20]],[[-60,0],[60,0]]][p];
    const cells = p<4 ? [[0,74]] : [[-58,56],[58,56]];
    return `<svg viewBox="0 0 320 170" class="cel-sv" role="img" aria-label="Esquema de la fase ${p+1} de la mitosis">
      ${cells.map(c=>`<circle cx="${160+c[0]}" cy="85" r="${c[1]}" fill="none" stroke="#7FB3C8" stroke-width="2"/>`).join('')}
      ${p<=1 || p===4 ? (p===4 ? `<circle cx="102" cy="85" r="26" fill="none" stroke="#9A86D8" stroke-width="2"/><circle cx="218" cy="85" r="26" fill="none" stroke="#9A86D8" stroke-width="2"/>` : `<circle cx="160" cy="85" r="42" fill="none" stroke="#9A86D8" stroke-width="2" stroke-dasharray="${p===1?'5 5':'0'}"/>`) : ''}
      ${pos.map((q,i)=>`<rect x="${160+q[0]-6}" y="${85+q[1]-14}" width="12" height="28" rx="5" fill="${['#E0334A','#F08A24','#2F74E0','#14A394'][i%4]}"/>`).join('')}
    </svg>`;
  },
  quiz:{
    q:'En la metafase los cromosomas se ven alineados en el centro. ¿Por qué esa fase es la mejor para contar cuántos cromosomas tiene la célula?',
    ops:['Porque en ese momento se duplican y aparecen todos.',
      'Porque están condensados al máximo y ordenados en un solo plano, sin superponerse.',
      'Porque cada cromosoma ya se separó en dos células distintas.',
      'Porque la envoltura nuclear los mantiene juntos y quietos.'],
    ok:1,
    fb:'Por eso los cariotipos se preparan deteniendo la división en metafase: los cromosomas están cortos, gruesos y alineados.',
    wrong:['La duplicación del ADN ocurrió antes, en la fase S de la interfase; en metafase ya estaban duplicados.',
      'La separación de las cromátidas ocurre después, en la anafase; en metafase siguen unidas por el centrómero.',
      'En metafase la envoltura nuclear ya se desarmó: por eso el huso puede alcanzar a los cromosomas.']
  }
};

/* =====================================================================
   ESCENA: MEIOSIS
   ===================================================================== */
const ESC_MEIOSIS = {
  id:'meiosis', nombre:'Meiosis', sub:'Dos divisiones seguidas → cuatro células hijas distintas',
  cam:{ radius:16, phi:1.3, theta:0.55, minR:7, maxR:32, floor:-3.9, floorSize:13 },
  steps:[
    { n:'Interfase', d:'El ADN se duplica una sola vez. Cada cromosoma queda con dos cromátidas hermanas.' },
    { n:'Profase I y entrecruzamiento', d:'Los cromosomas homólogos (uno del padre, otro de la madre) se aparean formando una tétrada e intercambian trozos: el entrecruzamiento. Mira cómo las puntas cambian de color.' },
    { n:'Metafase I', d:'Las tétradas se alinean en el ecuador. El azar decide qué homólogo mira a cada polo.' },
    { n:'Anafase I y telofase I', d:'Se separan los homólogos completos (no las hermanas). Se forman dos células con la mitad de cromosomas: ya son haploides.' },
    { n:'Meiosis II', d:'Cada célula divide sus cromátidas hermanas, como en una mitosis, pero sin volver a copiar el ADN.' },
    { n:'Cuatro células hijas', d:'Resultan cuatro células haploides y genéticamente distintas entre sí. En los animales son los gametos.' }
  ],
  datos:[
    ['Cromosomas de la madre','2 (1 par de homólogos)'], ['Divisiones','2 seguidas, con una sola copia del ADN'],
    ['Células hijas','4'], ['Cromosomas por hija','1 · la mitad (haploide)'],
    ['Fuentes de variación','entrecruzamiento + reparto azaroso de los homólogos']
  ],
  build(E){
    const low = E.low, ROJO = 0xE0334A, AZUL = 0x2F74E0;
    const bodyA = celBody(E, { color:0x86CCDA, opacity:0.5, fr:0.16 }), bodyB = celBody(E, { color:0x86CCDA, opacity:0.5, fr:0.16 });
    const cyto = celCyto(E, bodyA, low ? 10 : 16, 9);
    const nucM = celNucleus(E, 4), nucs = [0,1,2,3].map(k => celNucleus(E, 11+k));
    const chM = celChromatin(E, [ROJO, AZUL], 31, 1.6);
    const cen = [0,1,2,3].map(() => celCentrosome(E)), husoI = celHuso(E), husoL = celHuso(E), husoR = celHuso(E);
    const crs = []; const Rr = Kit.rng(5);
    for (let j=0;j<4;j++){ const hm = j<2 ? 0 : 1, s = j%2, base = hm ? AZUL : ROJO;
      /* hermanas idénticas (misma semilla de bandas); homólogos distintos */
      const cd = celChromatid(E, { Lp:0.64, Lq:0.9, r:0.15, color:base, tip:base, seed: hm ? 19 : 7 });
      crs.push({ hm, s, cd, base, rnd:V(Rr()*2-1, Rr()*2-1, Rr()*2-1).multiplyScalar(0.7) });
    }
    const quiasma = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.035, 8, 22), new THREE.MeshBasicMaterial({ color:0xF2C037, toneMapped:false, transparent:true, opacity:0 }));
    quiasma.rotation.y = Math.PI/2; E.scene.add(quiasma);
    let cruzado = false;
    const cruzar = on => { if (on === cruzado) return; cruzado = on;
      crs[1].cd.setTip(on ? AZUL : ROJO);
      crs[2].cd.setTip(on ? ROJO : AZUL); };
    /* pose de cada cromátida por fase: centrómero, brazo p, lado hacia su polo, pliegue en V */
    const sg = v => v ? 1 : -1;
    const POSE = [
      j => ({ c:crs[j].rnd.clone(), up:AX.Y, side:AX.Z.clone().multiplyScalar(sg(crs[j].s)), tr:AX.X.clone().multiplyScalar(-sg(crs[j].hm)), trail:0 }),
      j => ({ c:V(sg(crs[j].hm)*0.21, 0.15, sg(crs[j].s)*0.11), up:AX.Y, side:AX.Z.clone().multiplyScalar(sg(crs[j].s)), tr:AX.X.clone().multiplyScalar(-sg(crs[j].hm)), trail:0 }),
      j => ({ c:V(sg(crs[j].hm)*0.24, 0, sg(crs[j].s)*0.1), up:AX.Y, side:AX.Z.clone().multiplyScalar(sg(crs[j].s)), tr:AX.X.clone().multiplyScalar(-sg(crs[j].hm)), trail:0.08 }),
      j => ({ c:V(sg(crs[j].hm)*2.35, 0, sg(crs[j].s)*0.1), up:AX.Y, side:AX.Z.clone().multiplyScalar(sg(crs[j].s)), tr:AX.X.clone().multiplyScalar(-sg(crs[j].hm)), trail:0.55 }),
      j => ({ c:V(sg(crs[j].hm)*2.45, sg(crs[j].s)*1.15, 0), up:AX.Z, side:AX.Y.clone().multiplyScalar(sg(crs[j].s)), tr:AX.Y.clone().multiplyScalar(-sg(crs[j].s)), trail:0.85 }),
      j => ({ c:V(sg(crs[j].hm)*2.5, sg(crs[j].s)*1.72, 0), up:AX.Z, side:AX.Y.clone().multiplyScalar(sg(crs[j].s)), tr:AX.Y.clone().multiplyScalar(-sg(crs[j].s)), trail:0.3 })
    ];
    const PH = [
      { cond:0,   chrom:1,   diss:0,    dissF:1.01, kinI:0,   polI:0,    astI:0.3, kin2:0,   pol2:0,   ast2:0,   q:0,
        A:V(0.3,2.05,0.45), B:V(0.55,1.95,0.4), C:V(0.3,2.05,0.45), D:V(0.55,1.95,0.4) },
      { cond:0.82, chrom:0.2, diss:0.6,  dissF:1.01, kinI:0,   polI:0.45, astI:0.75, kin2:0,  pol2:0,   ast2:0,   q:1,
        A:V(-2.0,1.2,0.3), B:V(-2.0,1.2,0.3), C:V(2.0,1.2,0.3), D:V(2.0,1.2,0.3) },
      { cond:1,   chrom:0,   diss:1.01, dissF:1.01, kinI:0.9, polI:0.75, astI:0.85, kin2:0,  pol2:0,   ast2:0,   q:0.8,
        A:V(-2.9,0,0), B:V(-2.9,0,0), C:V(2.9,0,0), D:V(2.9,0,0) },
      { cond:1,   chrom:0,   diss:1.01, dissF:1.01, kinI:0.8, polI:0.6,  astI:0.6, kin2:0,   pol2:0,   ast2:0.2, q:0,
        A:V(-3.3,0.25,0), B:V(-3.3,-0.25,0), C:V(3.3,0.25,0), D:V(3.3,-0.25,0) },
      { cond:1,   chrom:0,   diss:1.01, dissF:1.01, kinI:0,   polI:0,    astI:0,   kin2:0.9, pol2:0.7, ast2:0.75, q:0,
        A:V(-2.45,-2.0,0), B:V(-2.45,2.0,0), C:V(2.45,-2.0,0), D:V(2.45,2.0,0) },
      { cond:0.88, chrom:0,   diss:1.01, dissF:0.05, kinI:0,   polI:0,    astI:0,   kin2:0.1, pol2:0.2, ast2:0.2, q:0,
        A:V(-2.5,-2.95,0), B:V(-2.5,2.95,0), C:V(2.5,-2.95,0), D:V(2.5,2.95,0) }
    ];
    const tmp = V(0,0,0), up = V(0,0,0), side = V(0,0,0), tr = V(0,0,0), cc = V(0,0,0), O = V(0,0,0), QP = V(0,0,0);
    const CELL4 = [V(-2.5,-1.72,0), V(-2.5,1.72,0), V(2.5,-1.72,0), V(2.5,1.72,0)];
    function apply(T){
      const f = faseMix(PH, T), p = f.p, u = f.u, p2 = Math.min(5, p+1);
      cruzar(T >= 1.45);
      /* células: la madre se alarga y se estrangula (meiosis I); luego cada hija se divide a lo largo del eje Y (meiosis II) */
      if (T < 3){ const d = p < 2 ? 0 : lerp(0, 2.35, u), r = p < 2 ? 2.9 : lerp(2.9, 2.3, u);
        bodyA.set(d, r); bodyA.place(O, 0); bodyA.show(true); bodyB.show(false); cyto.update([bodyA]); }
      else { const t2 = Math.min(2, T - 3), k = t2 > 1 ? 1 : 0, uu = smooth(k ? t2 - 1 : t2);
        const cx = k ? lerp(2.45, 2.5, uu) : lerp(2.35, 2.45, uu), d = k ? lerp(0.62, 1.74, uu) : lerp(0, 0.62, uu), r = k ? lerp(2.0, 1.66, uu) : lerp(2.3, 2.0, uu);
        [[bodyA,-1],[bodyB,1]].forEach(([b,s]) => { b.set(d, r); b.place(V(s*cx, 0, 0), Math.PI/2); b.show(true); }); cyto.update([bodyA, bodyB]); }
      nucM.set(O, 1.75, f.diss); chM.set(O, 1, f.chrom);
      nucs.forEach((n,k) => n.set(CELL4[k], 0.92, f.dissF));
      const vis = f.cond > 0.03, sx = lerp(0.3, 1, f.cond), sy = lerp(2.0, 1, f.cond);
      const tI = [], tL = [], tR = [];
      crs.forEach((cr, j) => { const a = POSE[p](j), b = POSE[p2](j);
        lerpV(a.c, b.c, u, cc); lerpV(a.up, b.up, u, up).normalize(); lerpV(a.side, b.side, u, side).normalize(); lerpV(a.tr, b.tr, u, tr).normalize();
        side.addScaledVector(up, -side.dot(up)).normalize();
        cr.cd.pose(cc, up, side, 0.14, tr, lerp(a.trail, b.trail, u), sx, sy, vis);
        tI.push({ c:cr.cd.c, pole:cr.hm }); (cr.hm ? tR : tL).push({ c:cr.cd.c, pole:cr.s }); });
      husoI.begin(); if (f.kinI + f.polI + f.astI > 0.01) husoI.add(f.A.clone().lerp(f.B, 0.5), f.C.clone().lerp(f.D, 0.5), f.kinI > 0.01 ? tI : [], low ? 6 : 8, 1); husoI.end(f.kinI, f.polI, f.astI);
      husoL.begin(); if (f.kin2 + f.pol2 + f.ast2 > 0.01) husoL.add(f.A, f.B, tL, low ? 4 : 6, 0.7); husoL.end(f.kin2, f.pol2, f.ast2);
      husoR.begin(); if (f.kin2 + f.pol2 + f.ast2 > 0.01) husoR.add(f.C, f.D, tR, low ? 4 : 6, 0.7); husoR.end(f.kin2, f.pol2, f.ast2);
      [f.A, f.B, f.C, f.D].forEach((P, k) => cen[k].set(P, true));
      crs[1].cd.tipPos(QP); crs[2].cd.tipPos(tmp); QP.add(tmp).multiplyScalar(0.5);
      quiasma.position.copy(QP); quiasma.material.opacity = f.q; quiasma.visible = f.q > 0.02 && vis;
    }
    return { apply, fases:6, get cruzado(){ return cruzado; } };
  },
  svg(p){
    const cells = p<3 ? [[0,70]] : p<5 ? [[-56,52],[56,52]] : [[-58,40],[-58,40],[58,40],[58,40]];
    const pos = [[[-8,0],[8,0],[-8,0],[8,0]],[[-16,0],[-6,0],[6,0],[16,0]],[[-16,0],[-6,0],[6,0],[16,0]],
      [[-62,-6],[-52,-6],[52,-6],[62,-6]],[[-58,-24],[-58,24],[58,-24],[58,24]],[[-58,-24],[-58,24],[58,-24],[58,24]]][p];
    const col = p>=2 ? ['#E0334A','#2F74E0','#E0334A','#2F74E0'] : ['#E0334A','#E0334A','#2F74E0','#2F74E0'];
    return `<svg viewBox="0 0 320 170" class="cel-sv" role="img" aria-label="Esquema de la fase ${p+1} de la meiosis">
      ${cells.map((c,i)=>`<circle cx="${160+c[0]}" cy="${p<5?85:(i%2?120:50)}" r="${c[1]}" fill="none" stroke="#7FB3C8" stroke-width="2"/>`).join('')}
      ${pos.map((q,i)=>`<rect x="${160+q[0]-5}" y="${85+q[1]-13}" width="10" height="26" rx="4" fill="${col[i]}"/>`).join('')}
      ${p===1||p===2 ? '<circle cx="160" cy="72" r="7" fill="none" stroke="#F2C037" stroke-width="3"/>' : ''}
    </svg>`;
  },
  quiz:{
    q:'Al final de la meiosis se obtienen cuatro células. ¿En qué se diferencian de las dos células que produce la mitosis?',
    ops:['En nada: en las dos divisiones las hijas son idénticas a la madre.',
      'Tienen la mitad de cromosomas y son distintas entre sí, por el entrecruzamiento y el reparto azaroso de los homólogos.',
      'Tienen el doble de cromosomas, porque hubo dos divisiones.',
      'Son idénticas entre sí, pero más pequeñas.'],
    ok:1,
    fb:'Una sola copia del ADN y dos divisiones dan la mitad de cromosomas; el entrecruzamiento y el azar en metafase I hacen que ninguna hija sea igual a otra. Por eso los hermanos no son idénticos.',
    wrong:['En la mitosis sí son idénticas, pero en la meiosis no: hay entrecruzamiento y reparto azaroso de homólogos.',
      'El ADN se copió una sola vez y hubo dos divisiones: por eso el número se reduce a la mitad, no se duplica.',
      'El tamaño no es la diferencia importante: lo decisivo es que tienen la mitad de cromosomas y distinta combinación genética.']
  }
};

/* =====================================================================
   ESCENA: ÓSMOSIS Y TRANSPORTE
   ===================================================================== */
const MEDIOS = {
  hipotonico:{ n:'Hipotónico', d:'Hay MÁS agua afuera (menos solutos). El agua entra a la célula.', sol:18, esc:1.18,
    animal:'La célula animal se hincha y puede estallar (hemólisis, si es un glóbulo rojo).',
    vegetal:'La célula vegetal se pone turgente: la vacuola empuja contra la pared y no estalla. Es su estado normal y sano.' },
  isotonico:{ n:'Isotónico', d:'Hay la misma concentración adentro y afuera. Entra y sale la misma cantidad de agua.', sol:46, esc:1.0,
    animal:'La célula animal mantiene su forma. El suero fisiológico es isotónico por eso.',
    vegetal:'La célula vegetal queda fláccida: sin presión de turgencia, la planta se ve caída aunque no muera.' },
  hipertonico:{ n:'Hipertónico', d:'Hay MENOS agua afuera (más solutos). El agua sale de la célula.', sol:84, esc:0.78,
    animal:'La célula animal se arruga (crenación).',
    vegetal:'El protoplasto se separa de la pared: plasmólisis. Por eso la sal mata las plantas.' }
};
const TRANSPORTES = {
  simple:{ n:'Difusión simple', d:'Moléculas pequeñas y sin carga (O₂, CO₂) cruzan solas la bicapa, de donde hay más a donde hay menos. No gasta energía.', color:0x7FE0EC, atp:false },
  facilitada:{ n:'Difusión facilitada', d:'Moléculas grandes o con carga (glucosa, iones) pasan por una proteína canal, también a favor del gradiente y sin gastar ATP.', color:0x63C28A, atp:false },
  bomba:{ n:'Bomba de sodio y potasio', d:'Saca 3 iones de sodio y mete 2 de potasio EN CONTRA del gradiente. Por eso gasta ATP: es transporte activo.', color:0xE0784A, atp:true }
};

const ESC_OSMOSIS = {
  id:'osmosis', nombre:'Ósmosis y transporte', sub:'Qué se mueve, hacia dónde y con cuánta energía',
  cam:{ radius:17.5, phi:1.2, theta:0.62, minR:7, maxR:32, floor:-3.6, floorSize:14, target:[0,-0.2,0] },
  custom:true,
  build(E){
    const low = E.low, CC = V(-3.2, 0, 0), MX = 3.0, RG = Kit.rng(19), dm = new THREE.Object3D();
    /* --- la célula: animal (sin pared) o vegetal (pared de celulosa, vacuola y cloroplastos) --- */
    const cellG = Kit.sculpt({ w: low?48:80, h: low?34:56, radii:[1,1,1] }); const cBase = Float32Array.from(cellG.attributes.position.array);
    const protoMat = celFresnel(Kit.tissue({ tex:'tissue', rep:[6,4], bump:0.035, color:0xE88FB0, transparent:true, opacity:0.62, rough:0.22, coat:1, coatRough:0.12, side:THREE.DoubleSide, depthWrite:false, env:1.2 }), 0.3, 1.4);
    const proto = new THREE.Mesh(cellG, protoMat); proto.renderOrder = 2; proto.position.copy(CC); E.scene.add(proto);
    const protoIn = new THREE.Mesh(cellG, Kit.tissue({ color:0xF7DCE6, transparent:true, opacity:0.16, side:THREE.BackSide, depthWrite:false })); protoIn.position.copy(CC); E.scene.add(protoIn);
    const nuc = new THREE.Mesh(Kit.sculpt({ radii:[0.55,0.52,0.55], w:32, h:24, disp:(p,d)=>0.02*Kit.fbm(d.x*3,d.y*3,d.z*3,2) }), Kit.tissue({ tex:'membrane', rep:[2,2], bump:0.015, color:0x7560D0, rough:0.35, coat:0.7 })); E.scene.add(nuc);
    const nucl = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), Kit.tissue({ color:0x3E2A86, rough:0.5 })); E.scene.add(nucl);
    /* pared: caja de esquinas redondeadas, fibrosa y translúcida */
    const WA = 2.35, boxN = (d, p) => { const n = Math.pow(Math.pow(Math.abs(d.x),p) + Math.pow(Math.abs(d.y),p) + Math.pow(Math.abs(d.z),p), 1/p); return n || 1e-6; };
    const pared = new THREE.Mesh(Kit.sculpt({ w: low?40:64, h: low?30:48, shape: d => d.clone().multiplyScalar(WA/boxN(d,4.5)) }),
      celFresnel(Kit.tissue({ tex:'tissue', rep:[5,4], bump:0.05, color:0x93BE62, transparent:true, opacity:0.62, rough:0.55, coat:0.35, side:THREE.DoubleSide, depthWrite:false }), 0.3, 1.2));
    pared.position.copy(CC); pared.renderOrder = 3; E.scene.add(pared);
    const vac = new THREE.Mesh(Kit.sculpt({ w:40, h:30, radii:[1,1,1], disp:(p,d)=>0.03*Kit.fbm(d.x*2+4,d.y*2,d.z*2,2) }), celFresnel(Kit.tissue({ color:0x4F95DE, transparent:true, opacity:0.55, rough:0.2, coat:1, side:THREE.DoubleSide, depthWrite:false }), 0.3, 1.4));
    vac.position.copy(CC); vac.renderOrder = 1; E.scene.add(vac);
    const clpG = new THREE.SphereGeometry(0.2, 16, 10); clpG.scale(1.5, 0.7, 1);
    const NCL = 12, clp = new THREE.InstancedMesh(clpG, Kit.tissue({ color:0x3F9A4E, rough:0.35, coat:0.7 }), NCL); E.scene.add(clp);
    const clpDir = []; for (let i=0;i<NCL;i++) clpDir.push({ d:dirOf(RG), q:new THREE.Quaternion().setFromEuler(new THREE.Euler(RG()*6, RG()*6, RG()*6)) });
    /* --- solutos (esferas amarillas) del medio y del interior, con agitación térmica --- */
    const NS = 84, NI = 40, solG = new THREE.IcosahedronGeometry(0.12, 1), solMat = Kit.tissue({ color:0xE8B92E, rough:0.35, coat:0.6 });
    const solM = new THREE.InstancedMesh(solG, solMat, NS), solI = new THREE.InstancedMesh(solG, solMat, NI); E.scene.add(solM); E.scene.add(solI);
    const sOut = []; for (let i=0;i<NS;i++){ let p; do { p = V(RG()*8-4, RG()*7-3.5, RG()*6-3).add(CC); } while (p.distanceTo(CC) < 3.0); sOut.push({ p, ph:RG()*6.3 }); }
    const sIn = []; for (let i=0;i<NI;i++) sIn.push({ d:dirOf(RG).multiplyScalar(0.25 + RG()*0.6), ph:RG()*6.3 });
    /* --- parche de membrana ampliado: bicapa de fosfolípidos (cabezas + dos colas) con proteínas --- */
    const PY = 16, PZ = low ? 5 : 7, SPC = 0.32, holes = [V(1.55,0,0.1), V(0,0,-0.35), V(-1.55,0,0.1)];
    const lip = []; for (let row=0; row<2; row++) for (let j=0;j<PY;j++) for (let k=0;k<PZ;k++){ const y = -2.4 + j*SPC + (k%2)*0.08, z = -(PZ-1)/2*SPC + k*SPC;
      if (holes.some(hh => Math.hypot(y-hh.x, z-hh.z) < 0.5)) continue; lip.push({ row, y, z }); }
    const heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.135, 10, 8), Kit.tissue({ color:0xF0C98A, rough:0.4, coat:0.55 }), lip.length);
    const tails = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.03, 0.022, 0.34, 5), Kit.tissue({ color:0xE8D6A8, rough:0.6, coat:0.1 }), lip.length*2);
    lip.forEach((l, i) => { const sx = l.row ? 1 : -1;
      dm.position.set(MX + sx*0.46, l.y, l.z); dm.rotation.set(0,0,0); dm.updateMatrix(); heads.setMatrixAt(i, dm.matrix);
      [-0.05, 0.05].forEach((o, t) => { dm.position.set(MX + sx*0.21, l.y + o, l.z); dm.rotation.set(0, 0, Math.PI/2 + o*sx*1.2); dm.updateMatrix(); tails.setMatrixAt(i*2+t, dm.matrix); }); });
    E.scene.add(heads); E.scene.add(tails);
    /* acuaporina: cuatro subunidades en barril alrededor de un poro estrecho */
    const aq = []; for (let k=0;k<4;k++){ const a = k/4*Math.PI*2 + 0.4; const g = new THREE.CylinderGeometry(0.16, 0.16, 1.05, 12); g.scale(1, 1, 0.8);
      const b = new THREE.SphereGeometry(0.17, 12, 8); b.scale(1, 0.5, 1); b.translate(0, 0.5, 0); const b2 = b.clone(); b2.translate(0, -1.0, 0);
      [g, b, b2].forEach(q => { q.rotateZ(Math.PI/2); q.translate(0, Math.cos(a)*0.2, Math.sin(a)*0.2); aq.push(q); }); }
    const acua = new THREE.Mesh(Kit.merge(aq), Kit.tissue({ color:0x2F8FD8, rough:0.35, coat:0.7 })); acua.position.set(MX, holes[0].x, holes[0].z); E.scene.add(acua);
    /* proteína canal (difusión facilitada): barril hueco con vestíbulos */
    const prf = []; [[0.2,-0.62],[0.44,-0.6],[0.46,-0.3],[0.38,0],[0.46,0.3],[0.44,0.6],[0.2,0.62],[0.16,0.3],[0.12,0],[0.16,-0.3],[0.2,-0.62]].forEach(([x,y]) => prf.push(new THREE.Vector2(x, y)));
    const canalG = new THREE.LatheGeometry(prf, low?16:28); canalG.rotateZ(Math.PI/2);
    const canal = new THREE.Mesh(canalG, Kit.tissue({ color:0x2FA866, rough:0.35, coat:0.65, side:THREE.DoubleSide })); canal.position.set(MX, holes[1].x, holes[1].z); E.scene.add(canal);
    /* bomba de sodio y potasio: dominio transmembrana + dominio citoplasmático que une ATP */
    const bg = []; { const t = new THREE.CylinderGeometry(0.42, 0.46, 1.1, 18); t.rotateZ(Math.PI/2); bg.push(t);
      const c1 = new THREE.SphereGeometry(0.5, 20, 14); c1.scale(0.9, 1, 1.05); c1.translate(-0.78, 0.12, 0); bg.push(c1);
      const c2 = new THREE.SphereGeometry(0.32, 16, 12); c2.translate(-0.95, -0.42, 0.25); bg.push(c2);
      const e = new THREE.SphereGeometry(0.3, 14, 10); e.scale(0.6, 1, 1); e.translate(0.62, 0, 0); bg.push(e); }
    const bomba = new THREE.Mesh(Kit.merge(bg), Kit.tissue({ tex:'granular', rep:[2,2], bump:0.02, color:0xD0603A, rough:0.4, coat:0.6 })); bomba.position.set(MX, holes[2].x, holes[2].z); E.scene.add(bomba);
    const atpG = celMolGeo('atp'), molMat = celMolMat(), aguaG = celMolGeo('agua');
    const atpM = new THREE.Mesh(atpG, molMat); atpM.scale.setScalar(1.6); atpM.position.set(MX-1.75, holes[2].x - 0.55, 0.45); E.scene.add(atpM);
    /* etiquetas con línea guía (partes no seleccionables, solo para mostrar u ocultar su rótulo) */
    const lab = (id, t, pos, anc, meshes) => { E.addPart(id, meshes, { pickable:false }); E.addLabel(id, t, pos, anc); };
    E.addLabel('_agua','Célula', [CC.x, 3.05, 0]); E.addLabel('_memb','Membrana ampliada', [MX, 3.0, 0]);
    lab('_acua', 'Acuaporina', [MX+1.9, holes[0].x+0.85, 0.3], [MX+0.5, holes[0].x, holes[0].z+0.1], [acua]);
    lab('_canal', 'Proteína canal', [MX+2.0, holes[1].x+0.1, 0.3], [MX+0.5, holes[1].x, holes[1].z], [canal]);
    lab('_bomba', 'Bomba Na⁺/K⁺', [MX+1.9, holes[2].x-0.75, 0.3], [MX+0.6, holes[2].x, holes[2].z], [bomba]);
    E.addLabel('_int', 'Citoplasma', [MX-1.6, -2.95, 0.4]); E.addLabel('_ext', 'Medio exterior', [MX+1.6, -2.95, 0.4]);

    const flowA = Flow(E), flowT = Flow(E), flowW = Flow(E);
    let medio = 'isotonico', tipo = 'animal', transporte = 'simple', esc = 2.1;
    const tmp = V(0,0,0);
    function forma(){ /* crenación en la animal hipertónica; caja blanda (turgente) o esfera retraída (plasmólisis) en la vegetal */
      const P = cellG.attributes.position.array, d = V(0,0,0);
      const pe = tipo === 'vegetal' ? (medio === 'hipertonico' ? 2.3 : medio === 'isotonico' ? 3.2 : 4.2) : 2;
      const cren = tipo === 'animal' && medio === 'hipertonico';
      for (let i=0;i<P.length;i+=3){ d.set(cBase[i], cBase[i+1], cBase[i+2]).normalize(); let r = 1/boxN(d, pe);
        if (cren){ const sp = Math.pow(Math.max(0, Math.sin(d.x*9.3+1)*Math.sin(d.y*9.1)*Math.sin(d.z*8.7+2)), 3); r *= 1 + 0.35*sp - 0.04; }
        else r *= 1 + 0.02*Kit.n3(d.x*3, d.y*3, d.z*3);
        P[i] = d.x*r; P[i+1] = d.y*r; P[i+2] = d.z*r; }
      cellG.attributes.position.needsUpdate = true; cellG.computeVertexNormals(); cellG.computeBoundingSphere(); }
    function pintar(){
      const M = MEDIOS[medio], veg = tipo === 'vegetal';
      esc = veg ? (medio === 'hipertonico' ? 1.62 : medio === 'hipotonico' ? 2.24 : 2.02) : 2.1*M.esc;
      forma(); proto.scale.setScalar(esc); protoIn.scale.setScalar(esc);
      protoMat.color.set(veg ? 0x8FCC9C : 0xE88FB0); protoIn.material.color.set(veg ? 0xE2F4E4 : 0xF7DCE6);
      nuc.position.copy(CC).add(V(veg ? -esc*0.52 : 0, esc*0.32, veg ? esc*0.3 : 0)); nuc.scale.setScalar(Math.max(0.7, esc/2.1)*(veg ? 0.8 : 1)); nucl.position.copy(nuc.position).add(V(0.12,0.1,0.28).multiplyScalar(nuc.scale.x));
      pared.visible = veg; vac.visible = veg; clp.visible = veg;
      if (veg){ vac.scale.setScalar(esc*0.66); clpDir.forEach((c, i) => { dm.position.copy(c.d).multiplyScalar(esc*0.84).add(CC); dm.quaternion.copy(c.q); dm.scale.setScalar(Math.min(1, esc/2)); dm.updateMatrix(); clp.setMatrixAt(i, dm.matrix); }); clp.instanceMatrix.needsUpdate = true; }
      solM.count = M.sol;
      const dentro = CC.clone().add(V(0.8, 0.4, 0.4)), fuera = CC.clone().add(V(3.0, 1.4, 1.2));
      const W = { geo:aguaG, mat:molMat, spin:7, size:1.7 };
      const agua = medio === 'hipotonico' ? [Object.assign({ from:fuera, to:dentro, n:8, speed:0.35 }, W)]
        : medio === 'hipertonico' ? [Object.assign({ from:dentro, to:fuera, n:8, speed:0.35 }, W)]
        : [Object.assign({ from:fuera, to:dentro, n:4, speed:0.25 }, W), Object.assign({ from:dentro, to:fuera, n:4, speed:0.25 }, W)];
      flowA.set(agua);
      /* agua por la acuaporina, en el mismo sentido que en la célula */
      const yA = holes[0].x, zA = holes[0].z;
      const aqC = new THREE.CatmullRomCurve3([V(MX+2.2, yA+0.7, zA+0.3), V(MX+0.75, yA, zA), V(MX-0.75, yA, zA), V(MX-2.2, yA+0.5, zA+0.4)]);
      const wIn = medio !== 'hipertonico', wOut = medio !== 'hipotonico';
      flowW.set([wIn ? Object.assign({ curve:aqC, n:medio === 'isotonico' ? 3 : 6, speed:0.24 }, W) : null, wOut ? Object.assign({ curve:aqC, back:true, n:medio === 'isotonico' ? 3 : 6, speed:0.24 }, W) : null].filter(Boolean));
      const T = TRANSPORTES[transporte];
      const fuera2 = V(MX+2.2, 0, 0.3), lista = [];
      if (transporte === 'simple') lista.push({ from:fuera2.clone().setY(2.35), to:V(MX-2.2, 2.35, 0.3), color:T.color, n:6, speed:0.3, geo:celMolGeo('o2'), mat:molMat, spin:5, size:1.3 });
      if (transporte === 'facilitada') lista.push({ curve:new THREE.CatmullRomCurve3([V(MX+2.2,holes[1].x+0.9,0.2), V(MX+0.8,holes[1].x,holes[1].z), V(MX-0.8,holes[1].x,holes[1].z), V(MX-2.2,holes[1].x+0.9,0.2)]), color:T.color, n:6, speed:0.28, size:1.6 });
      if (transporte === 'bomba'){ const yB = holes[2].x, zB = holes[2].z;
        lista.push({ curve:new THREE.CatmullRomCurve3([V(MX-2.2,yB-0.9,zB+0.2), V(MX-0.8,yB,zB), V(MX+0.8,yB,zB), V(MX+2.2,yB-0.9,zB+0.2)]), color:0xE0784A, n:6, speed:0.26, size:1.5 });
        lista.push({ curve:new THREE.CatmullRomCurve3([V(MX+2.2,yB+0.9,zB+0.3), V(MX+0.8,yB+0.15,zB+0.2), V(MX-0.8,yB+0.15,zB+0.2), V(MX-2.2,yB+0.9,zB+0.3)]), color:0x7E66CC, n:4, speed:0.26, size:1.5 }); }
      flowT.set(lista);
      atpM.visible = T.atp;
    }
    E.onFrame((t, dt) => {
      const on = animOK(), k = on ? t : 0;
      if (on && transporte === 'bomba'){ bomba.rotation.x = 0.12*Math.sin(t*2.4); atpM.rotation.set(t*1.3, t*0.8, 0); }
      for (let i=0;i<solM.count;i++){ const o = sOut[i]; dm.position.set(o.p.x + 0.06*Math.sin(k*1.7 + o.ph), o.p.y + 0.06*Math.sin(k*1.3 + o.ph*2), o.p.z + 0.06*Math.cos(k*1.5 + o.ph)); dm.rotation.set(0,0,0); dm.scale.setScalar(1); dm.updateMatrix(); solM.setMatrixAt(i, dm.matrix); }
      for (let i=0;i<NI;i++){ const o = sIn[i]; tmp.copy(o.d).multiplyScalar(esc*(tipo === 'vegetal' ? 0.72 : 0.9)); dm.position.set(CC.x + tmp.x + 0.04*Math.sin(k*1.9 + o.ph), CC.y + tmp.y + 0.04*Math.cos(k*1.4 + o.ph), CC.z + tmp.z); dm.updateMatrix(); solI.setMatrixAt(i, dm.matrix); }
      solM.instanceMatrix.needsUpdate = solI.instanceMatrix.needsUpdate = true;
    });
    pintar();
    return {
      apply(){},
      get medio(){ return medio; }, get tipo(){ return tipo; }, get transporte(){ return transporte; },
      setMedio(m){ medio = m; pintar(); }, setTipo(t){ tipo = t; pintar(); }, setTransporte(k){ transporte = k; pintar(); }
    };
  },
  svg(medio){
    const r = { hipotonico:62, isotonico:50, hipertonico:36 }[medio] || 50;
    const fl = medio === 'hipotonico' ? '→ el agua ENTRA' : medio === 'hipertonico' ? '← el agua SALE' : '↔ entra y sale igual';
    return `<svg viewBox="0 0 320 160" class="cel-sv" role="img" aria-label="Esquema de una célula en medio ${medio}">
      <rect x="6" y="6" width="308" height="148" rx="12" fill="none" stroke="#7FB3C8" stroke-width="2" stroke-dasharray="6 6"/>
      <circle cx="160" cy="80" r="${r}" fill="#E8A8C0" fill-opacity="0.4" stroke="#C06B8A" stroke-width="2"/>
      <text x="160" y="86" text-anchor="middle" font-size="13" fill="#333">${fl}</text>
    </svg>`;
  },
  quiz:{
    q:'Si pones una hoja de lechuga en agua con mucha sal, se marchita. ¿Qué se movió a través de la membrana?',
    ops:['La sal entró a la célula y la llenó, por eso se ve arrugada.',
      'El agua salió de la célula hacia el medio salado, donde hay menos agua libre.',
      'La membrana se encogió por el contacto con la sal.',
      'Los cloroplastos absorbieron la sal y se contrajeron.'],
    ok:1,
    fb:'La ósmosis es el paso de AGUA por una membrana semipermeable, desde donde hay más agua hacia donde hay menos. En la célula vegetal, el protoplasto se separa de la pared: eso es la plasmólisis.',
    wrong:['La ósmosis mueve agua, no solutos. La sal casi no atraviesa la membrana: lo que se desplaza es el agua, que sale hacia el medio más concentrado.',
      'La membrana no se encoge por sí sola: lo que cambia es el volumen de agua del interior, y la membrana la sigue.',
      'Los cloroplastos no absorben sal; además, la lechuga se marchita igual en la oscuridad, donde no hay fotosíntesis.']
  }
};

/* =====================================================================
   ESCENA: RESPIRACIÓN CELULAR
   ===================================================================== */
const ESC_RESP = {
  id:'respiracion', nombre:'Respiración celular', sub:'De la glucosa al ATP, paso a paso',
  cam:{ radius:11.8, phi:1.32, theta:0.5, minR:4, maxR:24, floor:-2.4, floorSize:12, target:[-0.95,0.1,0] },
  steps:[
    { n:'Glucólisis', d:'Ocurre en el CITOPLASMA, sin oxígeno. Una glucosa (6 carbonos) se parte en 2 piruvatos (3 carbonos). Ganancia neta: 2 ATP y 2 NADH.' },
    { n:'Oxidación del piruvato y ciclo de Krebs', d:'En la MATRIZ mitocondrial. El piruvato se convierte en acetil-CoA y entra al ciclo; se libera CO₂ y se cargan los transportadores: 2 ATP, 6 NADH y 2 FADH₂ por glucosa.' },
    { n:'Cadena transportadora y quimiosmosis', d:'En las CRESTAS de la membrana interna. Los electrones del NADH y del FADH₂ pasan de complejo en complejo, se bombean protones al espacio intermembrana y la ATP sintasa los deja volver fabricando ATP. El oxígeno recibe los electrones al final y se forma agua.' },
    { n:'Balance final', d:'Por cada glucosa se obtienen entre 36 y 38 ATP según el modelo clásico (las mediciones actuales dan entre 30 y 32, porque transportar los protones también cuesta). Sin oxígeno, solo quedan los 2 ATP de la glucólisis.' }
  ],
  datos:[
    ['Glucólisis','2 ATP · 2 NADH · citoplasma'],
    ['Krebs (×2 vueltas)','2 ATP · 6 NADH · 2 FADH₂ · matriz'],
    ['Cadena transportadora','unos 32 ATP · crestas'],
    ['Aceptor final de electrones','oxígeno → agua'],
    ['Total por glucosa','36 a 38 ATP (modelo clásico)']
  ],
  build(E){
    const low = E.low, RG = Kit.rng(29);
    /* mitocondria en corte longitudinal: se retira el cuarto frontal-superior de las dos membranas */
    const L = 4.6, RO = 1.5, RI = 1.3, CUTR = 0.95, TILT = -0.32;
    const perfil = (Lh, r, n) => { const pts = []; for (let i=0;i<=n;i++){ const a = -Math.PI/2 + i/n*Math.PI; const c = Math.cos(a); pts.push(new THREE.Vector2(r*Math.pow(c, 0.8), (Lh/2)*Math.sin(a))); } return pts; };
    const lathe = (Lh, r, d) => { const g = new THREE.LatheGeometry(perfil(Lh, r, 28), low?28:48, d, Math.PI*2 - 2*d); g.rotateZ(-Math.PI/2); g.rotateX(TILT); return g; };
    const rimG = (() => { const P = [], I = []; let base = 0; const po = perfil(L, RO, 28), pi = perfil(L*0.94, RI, 28);
      [CUTR, -CUTR].forEach(ph => { for (let i=0;i<=28;i++){ [po[i], pi[i]].forEach(v => { const x = v.y, rr = v.x; const q = V(x, -rr*Math.sin(ph), rr*Math.cos(ph)); q.applyAxisAngle(AX.X, TILT); P.push(q.x, q.y, q.z); }); }
        for (let i=0;i<28;i++){ const a = base + i*2; I.push(a, a+1, a+2, a+1, a+3, a+2); } base += 29*2; });
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setIndex(I); g.computeVertexNormals(); return g; })();
    /* la abertura de LatheGeometry (φ≈0) queda en +Z tras rotateZ; la franja une externa e interna en los dos bordes del corte */
    const ext = new THREE.Mesh(lathe(L, RO, CUTR), Kit.tissue({ tex:'membrane', rep:[6,3], bump:0.03, color:0xE06A3A, rough:0.34, coat:0.7, side:THREE.DoubleSide }));
    const inn = new THREE.Mesh(lathe(L*0.94, RI, CUTR), Kit.tissue({ color:0xF08E5C, rough:0.38, coat:0.6, side:THREE.FrontSide }));
    const mtx = new THREE.Mesh(lathe(L*0.9, RI*0.96, CUTR+0.02), Kit.tissue({ tex:'granular', rep:[6,3], bump:0.02, color:0xB94A2E, rough:0.62, coat:0.2, side:THREE.BackSide }));
    const rim = new THREE.Mesh(rimG, Kit.tissue({ color:0xF7C9A8, rough:0.5, coat:0.3, side:THREE.DoubleSide }));
    [ext, inn, mtx, rim].forEach(m => E.scene.add(m));
    /* crestas laminares con volumen, alternando arriba y abajo */
    const cr = [], XS = [], JIT = []; const NCR = low ? 6 : 8;
    for (let i=0;i<NCR;i++){ const x = -1.75 + i*(3.5/(NCR-1)); XS.push(x); const rho = RI*0.97*Math.pow(Math.max(0.05, 1 - Math.pow(x/(L*0.47), 2)), 0.4);
      const t = celTongue(rho, rho*0.42, 0.34 + 0.12*RG(), 0.11, low); JIT.push((RG()-0.5)*0.3); t.rotateZ(-Math.PI/2); t.rotateX((i%2 ? Math.PI : 0) + TILT + JIT[i]); t.translate(x, 0, 0); cr.push(t); }
    const crestas = new THREE.Mesh(Kit.merge(cr), Kit.tissue({ color:0xFFC08E, rough:0.42, coat:0.55 })); E.scene.add(crestas);
    const cut = new THREE.Plane(new THREE.Vector3(0, 0, -1).applyAxisAngle(AX.X, TILT), RI*Math.cos(CUTR)*0.98);
    crestas.material.clippingPlanes = [cut]; crestas.material.clipShadows = false; crestas.material.side = THREE.DoubleSide;
    /* ATP sintasas: tallo en la membrana y cabeza F1 (tres lóbulos, para que se vea girar) hacia la matriz */
    const synG = (() => { const st = new THREE.CylinderGeometry(0.03, 0.03, 0.16, 6); st.translate(0, 0.08, 0); const parts = [st];
      for (let k=0;k<3;k++){ const a = k/3*Math.PI*2; const s = new THREE.SphereGeometry(0.06, 10, 8); s.translate(Math.cos(a)*0.05, 0.2, Math.sin(a)*0.05); parts.push(s); } parts.forEach(g => g.deleteAttribute('uv')); return Kit.merge(parts); })();
    const syn = []; XS.forEach((x, i) => { const up = i%2 ? -1 : 1; [-1, 1].forEach(sd => { for (let k=0;k<3;k++){ const rr = (up > 0 ? 0.2 + k*0.3 : -0.2 - k*0.3);
      const p = V(x + sd*0.075, rr, 0.05 + 0.15*((k+i)%2)); p.applyAxisAngle(AX.X, TILT + JIT[i]); syn.push({ p, n:V(sd, 0, 0), a:RG()*6 }); } }); });
    const synM = new THREE.InstancedMesh(synG, Kit.tissue({ color:0xF2C037, rough:0.35, coat:0.7 }), syn.length); E.scene.add(synM);
    synM.material.clippingPlanes = [cut];
    const dmS = new THREE.Object3D(), qN = new THREE.Quaternion(), qS = new THREE.Quaternion();
    const placeSyn = (t) => { syn.forEach((s, i) => { qN.setFromUnitVectors(AX.Y, s.n); qS.setFromAxisAngle(AX.Y, s.a + t*(3 + (i%3))); dmS.quaternion.copy(qN).multiply(qS); dmS.position.copy(s.p); dmS.updateMatrix(); synM.setMatrixAt(i, dmS.matrix); }); synM.instanceMatrix.needsUpdate = true; };
    placeSyn(0);
    /* complejos de la cadena transportadora en la cresta frontal (I, III, IV), ADN mitocondrial y ribosomas en la matriz */
    const iF = Math.floor(NCR/2), xF = XS[iF], upF = iF%2 ? -1 : 1;
    const cx = [[0.28, 0x5B7BD6, 0.17],[0.62, 0x8E6BD1, 0.14],[0.95, 0x2FA88A, 0.13]].map(([r, c, s]) => { const g = new THREE.SphereGeometry(s, 14, 10); g.scale(1.3, 1, 1);
      const m = new THREE.Mesh(g, Kit.tissue({ color:c, rough:0.35, coat:0.6 })); m.position.set(xF - 0.1, upF*r, 0.2).applyAxisAngle(AX.X, TILT + JIT[iF]); E.scene.add(m); return m; });
    const dna = []; for (let k=0;k<2;k++){ const t = new THREE.TorusGeometry(0.2, 0.022, 6, 32); t.rotateX(1.2 + k); t.translate(-0.9 + k*2.1, (k ? -0.55 : 0.5), -0.25); dna.push(t); }
    const mtDNA = new THREE.Mesh(Kit.merge(dna), Kit.tissue({ color:0x8E3B7A, rough:0.45 })); mtDNA.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(TILT)); E.scene.add(mtDNA);
    const nrib = low ? 40 : 90, rib = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.035, 0), Kit.tissue({ color:0x4A2A30, rough:0.6 }), nrib); const dmR = new THREE.Object3D();
    for (let i=0;i<nrib;i++){ const x = (RG()*2-1)*1.9, a = RG()*Math.PI*2, r = RG()*RI*0.8*Math.sqrt(Math.max(0, 1-(x/2.3)**2)); dmR.position.set(x, Math.cos(a)*r, -Math.abs(Math.sin(a)*r)*0.8).applyAxisAngle(AX.X, TILT); dmR.updateMatrix(); rib.setMatrixAt(i, dmR.matrix); }
    E.scene.add(rib);
    /* glucosa en el citoplasma */
    const molMat = celMolMat(), G = { glu:celMolGeo('glucosa'), pir:celMolGeo('piruvato'), atp:celMolGeo('atp'), co2:celMolGeo('co2'), o2:celMolGeo('o2'), agua:celMolGeo('agua') };
    const gluc = new THREE.Mesh(G.glu, molMat); gluc.scale.setScalar(1.8); gluc.position.set(-5.4, 1.6, 0.6); E.scene.add(gluc);
    const T = p => V(p[0], p[1], p[2]).applyAxisAngle(AX.X, TILT);
    E.addLabel('_cito','Citoplasma (glucólisis)', [-5.4, 2.5, 0.6]);
    E.addLabel('_matriz','Matriz (ciclo de Krebs)', [0.3, -2.05, 0.9], T([0.35,-0.7,-0.35]));
    E.addLabel('_crestas','Crestas (cadena transportadora)', [1.6, 2.2, 0.9], T([1.25,0.85,0.12]));
    E.addLabel('_sint','ATP sintasa', [3.3, 1.15, 1.2], syn[syn.length-4].p);
    E.addLabel('_ext','Membrana externa', [-2.6, -2.25, 0.6], T([-1.2, -1.3, 0.55]));
    const flow = Flow(E);
    const krebs = new THREE.CatmullRomCurve3([T([-0.75,-0.1,-0.25]), T([-0.35,0.35,-0.35]), T([0.15,0.05,-0.3]), T([-0.3,-0.45,-0.2])], true);
    const e1 = cx[0].position, e3 = cx[1].position, e4 = cx[2].position;
    const F = [
      [{ from:V(-5.4,1.6,0.6), to:V(-4.2,0.6,0.4), n:3, speed:0.3, geo:G.glu, mat:molMat, spin:4, size:1.2 },
       { from:V(-4.2,0.6,0.4), to:V(-2.4,0.1,0.5), n:6, speed:0.32, geo:G.pir, mat:molMat, spin:5, size:1.3 },
       { from:V(-4.3,0.5,0.4), to:V(-4.9,-1.4,0.9), n:3, speed:0.3, geo:G.atp, mat:molMat, spin:3, size:1.1 }],
      [{ from:V(-2.6,0.2,0.5), to:T([-0.75,-0.1,-0.25]), n:4, speed:0.3, geo:G.pir, mat:molMat, spin:5, size:1.2 },
       { curve:krebs, color:0x8FD8B0, n:8, speed:0.2, size:1.1 },
       { from:T([0.1,0.05,-0.3]), to:V(0.9,2.6,0.9), n:5, speed:0.35, geo:G.co2, mat:molMat, spin:6, size:1.3 },
       { from:T([-0.3,-0.45,-0.2]), to:e1, n:5, speed:0.35, color:0xB07FE8, size:0.9 }],
      [{ curve:new THREE.CatmullRomCurve3([e1.clone(), e1.clone().lerp(e3, 0.5).add(V(0.06,0,0.12)), e3.clone(), e3.clone().lerp(e4, 0.5).add(V(0.06,0,0.12)), e4.clone()]), color:0x5CE1FF, n:8, speed:0.42, size:0.8 },
       { from:e1.clone().add(V(-0.35,0,0)), to:e1.clone().add(V(0.02,0,0)), color:0xFF5A6A, n:4, speed:0.5, size:0.7 },
       { from:e3.clone().add(V(-0.35,0,0)), to:e3.clone().add(V(0.02,0,0)), color:0xFF5A6A, n:4, speed:0.5, size:0.7 },
       { from:syn[iF*6+1].p.clone(), to:syn[iF*6+1].p.clone().add(V(-0.45,0.1,0.2)), n:5, speed:0.4, geo:G.atp, mat:molMat, spin:4, size:1.1 },
       { from:syn[iF*6+4].p.clone(), to:syn[iF*6+4].p.clone().add(V(0.45,-0.1,0.2)), n:5, speed:0.4, geo:G.atp, mat:molMat, spin:4, size:1.1 },
       { from:V(1.2,2.8,1.0), to:e4.clone().add(V(0.25,0,0.1)), n:3, speed:0.3, geo:G.o2, mat:molMat, spin:5, size:1.2 },
       { from:e4.clone().add(V(0.25,0,0.1)), to:V(2.4,-2.3,1.1), n:3, speed:0.3, geo:G.agua, mat:molMat, spin:6, size:1.3 },
       { from:V(1.6,0.9,0.4), to:V(3.8,1.9,0.9), n:5, speed:0.4, geo:G.atp, mat:molMat, spin:4, size:1.2 }],
      [{ from:V(0,0,0.2), to:V(3.9,1.9,1.0), n:8, speed:0.42, geo:G.atp, mat:molMat, spin:4, size:1.2 },
       { from:V(-0.5,0.3,0.2), to:V(-3.8,2.0,1.0), n:6, speed:0.42, geo:G.atp, mat:molMat, spin:4, size:1.2 },
       { from:V(2.2,0.4,0.3), to:V(4.2,-1.4,0.8), n:4, speed:0.35, geo:G.agua, mat:molMat, spin:6, size:1.3 },
       { from:V(0.4,0.6,0.2), to:V(1.0,2.8,0.9), n:4, speed:0.35, geo:G.co2, mat:molMat, spin:6, size:1.3 }]
    ];
    let paso = 0, ts = 0;
    E.onFrame((t, dt) => { if (animOK() && paso >= 2){ ts += dt; placeSyn(ts); } if (animOK() && paso === 0) gluc.rotation.z += dt*0.8; });
    function apply(Tt){
      const p = Math.max(0, Math.min(3, Math.round(Tt)));
      if (p !== paso || !flow.__on){ paso = p; flow.set(F[p]); flow.__on = true; }
      gluc.visible = p === 0;
      crestas.material.emissive && crestas.material.emissive.setHex(p === 2 ? 0x3A1A0A : 0x000000);
      cx.forEach(m => m.material.emissive.setHex(p === 2 ? 0x222244 : 0x000000));
      synM.material.emissive.setHex(p >= 2 ? 0x3A2A00 : 0x000000);
    }
    apply(0);
    return { apply, fases:4 };
  },
  svg(p){
    const et = ['Glucólisis · citoplasma · 2 ATP','Ciclo de Krebs · matriz · 2 ATP','Cadena transportadora · crestas · ~32 ATP','Total: 36 a 38 ATP por glucosa'][p];
    return `<svg viewBox="0 0 320 120" class="cel-sv" role="img" aria-label="Esquema de la etapa ${p+1} de la respiración celular">
      <rect x="10" y="30" width="80" height="56" rx="10" fill="${p===0?'#F2C037':'#DDE5EC'}"/>
      <rect x="110" y="30" width="80" height="56" rx="10" fill="${p===1?'#8FD8B0':'#DDE5EC'}"/>
      <rect x="210" y="30" width="96" height="56" rx="10" fill="${p>=2?'#7FE0EC':'#DDE5EC'}"/>
      <text x="160" y="105" text-anchor="middle" font-size="13" fill="#333">${et}</text>
      <text x="50" y="62" text-anchor="middle" font-size="11" fill="#333">Glucólisis</text>
      <text x="150" y="62" text-anchor="middle" font-size="11" fill="#333">Krebs</text>
      <text x="258" y="62" text-anchor="middle" font-size="11" fill="#333">Cadena + ATP</text>
    </svg>`;
  },
  quiz:{
    q:'¿Por qué una célula sin oxígeno obtiene muchísimo menos ATP de la misma glucosa?',
    ops:['Porque sin oxígeno la glucosa no entra a la célula.',
      'Porque sin el oxígeno como aceptor final, la cadena transportadora se detiene y solo quedan los 2 ATP de la glucólisis.',
      'Porque la mitocondria desaparece cuando falta oxígeno.',
      'Porque el ciclo de Krebs produce por sí solo casi todo el ATP.'],
    ok:1,
    fb:'La mayor parte del ATP (unos 32 de los 36 a 38) se fabrica en la cadena transportadora, y esa cadena necesita oxígeno al final para recibir los electrones y formar agua.',
    wrong:['La glucosa entra igual por transporte facilitado; el problema aparece después, en la mitocondria.',
      'La mitocondria sigue ahí: lo que se detiene es la cadena transportadora por falta de aceptor final de electrones.',
      'El ciclo de Krebs aporta solo 2 ATP directos; su trabajo real es cargar NADH y FADH₂ para la cadena.']
  }
};

/* =====================================================================
   RUTA: PROCESOS CELULARES
   ===================================================================== */
const ESCENAS = [ESC_MITOSIS, ESC_MEIOSIS, ESC_OSMOSIS, ESC_RESP];

route('/explorar/procesos', (view, q) => {
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'},
    h('div',{}, h('span',{class:'eyebrow cell'},'Mundo celular · Biología U2 y U3 · CCNN 9.º CVT U1'),
      h('h1',{},'Procesos celulares en 3D'),
      h('p',{},'Mueve tú la película: avanza fase por fase, retrocede y observa qué cambia antes de leer la explicación.')),
    h('div',{class:'row'}, h('span',{class:'pill cell'},'4 procesos'), h('span',{class:'pill ok'},'+80 XP'))));

  view.append(franja({
    proposito:'Ver con los propios ojos qué se mueve en cada proceso celular: cromosomas en la mitosis y la meiosis, agua en la ósmosis y electrones en la respiración.',
    observa:[
      'En la mitosis: en qué fase se separan las cromátidas y cuántos cromosomas queda con cada célula hija',
      'En la meiosis: cómo cambian de color las puntas de las cromátidas tras el entrecruzamiento',
      'En la ósmosis: qué partícula cruza la membrana y hacia qué lado',
      'En la respiración: en qué parte de la mitocondria se fabrica la mayor parte del ATP'
    ],
    reto:'Explica con el modelo por qué la mitosis produce dos células idénticas y la meiosis, cuatro distintas.'
  }));

  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  const tabs = h('div',{class:'tabs',role:'tablist',style:'margin-bottom:10px'});
  view.append(tabs, h('div',{class:'viewer cel-viewer'}, stage, panel));

  let sc = ESCENAS[0], E = null, M = null, T = 0, playing = false, fb = null;
  const ui = {};
  const card = h('div',{class:'card stack'}); panel.append(card);

  ESCENAS.forEach(s => tabs.append(h('button',{role:'tab','aria-selected': s===sc, onclick:()=>{
    if (s === sc) return; sc = s; T = 0; playing = false;
    $$('button',tabs).forEach((b,i)=> b.setAttribute('aria-selected', ESCENAS[i]===sc));
    Store.log('proceso',{proceso:sc.id}); montar();
  }}, s.nombre)));

  function sync(){
    if (sc.custom) return;
    const p = Math.max(0, Math.min(sc.steps.length-1, Math.round(T)));
    if (ui.range) ui.range.value = String(Math.round(T*100));
    if (ui.fase){ ui.fase.textContent = `${p+1}. ${sc.steps[p].n}`; }
    if (ui.desc) ui.desc.textContent = sc.steps[p].d;
    if (ui.pasos) $$('button', ui.pasos).forEach((b,i)=> b.setAttribute('aria-current', i===p ? 'true':'false'));
    if (fb) fb.innerHTML = sc.svg(p);
  }
  function irA(p, delta){
    const max = sc.steps.length - 1;
    T = delta ? Math.max(0, Math.min(max, Math.round(T) + delta)) : Math.max(0, Math.min(max, p));
    playing = false; if (ui.play) ui.play.textContent = '▶ Reproducir';
    M && M.apply && M.apply(T); sync();
    Store.log('fase_proceso',{proceso:sc.id, fase:Math.round(T)});
  }

  function controlesPasos(){
    const box = h('div',{class:'stack'});
    ui.pasos = h('div',{class:'cel-steps'});
    sc.steps.forEach((s,i) => ui.pasos.append(h('button',{'aria-current': i===Math.round(T)?'true':'false','aria-label':'Ir a la fase '+s.n, onclick:()=>irA(i)}, `${i+1}. ${s.n}`)));
    ui.range = h('input',{class:'cel-tl',type:'range',min:0,max:String((sc.steps.length-1)*100),value:String(Math.round(T*100)),'aria-label':'Línea de tiempo del proceso'});
    ui.range.addEventListener('input', ()=>{ T = (+ui.range.value)/100; playing = false; if (ui.play) ui.play.textContent = '▶ Reproducir'; M && M.apply && M.apply(T); sync(); });
    ui.play = h('button',{class:'btn sm primary',onclick:()=>{
      if (!E) return toast('La reproducción continua necesita el modelo 3D; usa los botones de fase.');
      if (!animOK()) return toast('Tienes activada la opción de menos animación: avanza fase por fase con los botones.');
      if (T >= sc.steps.length-1) T = 0;
      playing = !playing; ui.play.textContent = playing ? '⏸ Pausa' : '▶ Reproducir';
    }}, playing ? '⏸ Pausa' : '▶ Reproducir');
    ui.fase = h('strong',{}); ui.desc = h('p',{style:'margin-top:4px'});
    box.append(h('div',{class:'ctrl-row'},
        h('button',{class:'btn sm','aria-label':'Fase anterior',onclick:()=>irA(null,-1)},'‹ Anterior'),
        ui.play,
        h('button',{class:'btn sm','aria-label':'Fase siguiente',onclick:()=>irA(null,1)},'Siguiente ›'),
        h('button',{class:'btn sm ghost',onclick:()=>irA(0)},'↺ Reiniciar')),
      ui.pasos, ui.range, h('div',{class:'notice info',style:'display:block'}, ui.fase, ui.desc));
    return box;
  }

  function controlesOsmosis(){
    const box = h('div',{class:'stack'});
    const info = h('div',{class:'notice info',style:'display:block'});
    const pintaInfo = () => { const m = MEDIOS[M ? M.medio : 'isotonico'], t = M ? M.tipo : 'animal';
      info.innerHTML = ''; info.append(h('div',{}, h('strong',{},'Medio '+m.n.toLowerCase()+'. '), m.d),
        h('p',{style:'margin-top:4px'}, t === 'vegetal' ? m.vegetal : m.animal)); };
    const seg = (etiqueta, opciones, get, set, aria) => {
      const s = h('div',{class:'segmented',role:'group','aria-label':aria});
      opciones.forEach(([k,t]) => s.append(h('button',{'aria-pressed': get()===k ? 'true':'false', onclick:()=>{
        set(k); $$('button',s).forEach((b,i)=> b.setAttribute('aria-pressed', opciones[i][0]===get() ? 'true':'false'));
        pintaInfo(); pintaTrans(); Store.log('osmosis',{control:aria, valor:k});
      }}, t)));
      return h('div',{}, h('span',{class:'eyebrow'}, etiqueta), s);
    };
    const trans = h('div',{class:'notice',style:'display:block'});
    const pintaTrans = () => { const t = TRANSPORTES[M ? M.transporte : 'simple'];
      trans.innerHTML = ''; trans.append(h('div',{}, h('strong',{}, t.n+'. '), t.d),
        h('div',{class:'cel-kv',style:'margin-top:6px'}, h('span',{}, 'Gasta ATP: ', h('b',{}, t.atp ? 'sí' : 'no')),
          h('span',{}, 'Sentido: ', h('b',{}, t.atp ? 'en contra del gradiente' : 'a favor del gradiente')))); };
    box.append(
      seg('Medio exterior', [['hipotonico','Hipotónico'],['isotonico','Isotónico'],['hipertonico','Hipertónico']],
        ()=> M ? M.medio : 'isotonico', k => M && M.setMedio(k), 'Tipo de medio'),
      seg('Tipo de célula', [['animal','Animal (sin pared)'],['vegetal','Vegetal (con pared)']],
        ()=> M ? M.tipo : 'animal', k => M && M.setTipo(k), 'Tipo de célula'),
      info,
      seg('Transporte por la membrana', [['simple','Difusión simple'],['facilitada','Facilitada'],['bomba','Bomba Na⁺/K⁺']],
        ()=> M ? M.transporte : 'simple', k => M && M.setTransporte(k), 'Tipo de transporte'),
      trans,
      errorTipico('«La ósmosis mueve los solutos hacia donde hay menos.»',
        'La ósmosis mueve AGUA a través de una membrana semipermeable. Los solutos que no pueden cruzar se quedan donde están; el que se desplaza es el disolvente. Si el soluto puede cruzar, eso ya es difusión, no ósmosis.'));
    pintaInfo(); pintaTrans();
    if (fb) fb.innerHTML = sc.svg(M ? M.medio : 'isotonico');
    return box;
  }

  function paint(){
    card.innerHTML = '';
    card.append(h('span',{class:'eyebrow cell'}, sc.nombre), h('p',{class:'small muted'}, sc.sub));
    card.append(sc.custom ? controlesOsmosis() : controlesPasos());
    if (sc.datos) card.append(h('table',{class:'data cel-tabla'},
      h('tbody',{}, sc.datos.map(d => h('tr',{}, h('td',{},d[0]), h('td',{},d[1]))))));
    if (sc.id === 'mitosis') card.append(errorTipico('«En la mitosis se forman células diferentes.»',
      'En la mitosis las dos hijas son genéticamente idénticas entre sí y a la madre: por eso sirve para crecer, reparar heridas y reponer células. La que produce células distintas es la meiosis.'));
    if (sc.id === 'meiosis') card.append(errorTipico('«La meiosis es una mitosis con más pasos.»',
      'Son distintas en el resultado: la mitosis da 2 células iguales con el mismo número de cromosomas; la meiosis da 4 células distintas con la mitad. Además, en la meiosis hay apareamiento de homólogos y entrecruzamiento, que en la mitosis no ocurren.'));
    card.append(h('div',{class:'stack'}, h('span',{class:'eyebrow'},'Comprueba lo que viste'), quizBlock(sc.quiz, att => {
      Store.log('quiz_proceso',{proceso:sc.id, intentos:att});
      resueltos[sc.id] = true;
      const n = Object.keys(resueltos).length;
      toast(`Resueltos ${n} de ${ESCENAS.length} procesos.`);
      if (n >= 2) Store.completeActivity('reto-procesos', { score: n*25, attempts: att });
    })));
    sync();
  }
  const resueltos = {};

  function montar(){
    if (E){ try { E.dispose(); } catch(err){ console.warn(err); } E = null; M = null; }
    stage.innerHTML = ''; fb = null;
    if (webglOK){
      try {
        E = new Engine3D(stage, Object.assign({ aria:`Modelo 3D de ${sc.nombre}. Usa los botones de fase para avanzar con el teclado.` }, sc.cam));
        M = sc.build(E);
        /* en pantallas angostas (móvil) se aleja la cámara para que el proceso completo quepa a lo ancho */
        { const w = stage.clientWidth || 800, hh = stage.clientHeight || 560, k = clamp(1.4/(w/hh), 1, 1.75); E.opts.radius = sc.cam.radius*k; E.goal.r = E.sph.r = E.opts.radius; E.opts.maxR = Math.max(E.opts.maxR, E.opts.radius*1.3); }
        E.onFrame((t,dt) => { if (!playing || sc.custom || !M || !M.apply) return;
          if (!animOK()){ playing = false; return; }
          T = Math.min(sc.steps.length-1, T + dt*0.38);
          if (T >= sc.steps.length-1){ playing = false; if (ui.play) ui.play.textContent = '▶ Reproducir'; }
          M.apply(T); sync(); });
      } catch(err){ console.warn('proceso 3D', err); E = null; M = null; }
    }
    celChrome(stage, E, { left:h('span',{class:'pill cell'}, sc.nombre), model:'proceso-'+sc.id,
      captureTxt:()=>`Captura de ${sc.nombre}` });
    if (!E){
      fb = h('div',{style:'padding:0 6px'});
      stage.append(h('div',{class:'ph cel-fall',style:'margin:28px 18px'},
        h('p',{},'Sin WebGL no hay modelo 3D. Este esquema equivalente cambia con los mismos controles, y toda la información está en el panel:'),
        fb));
    }
    if (M && M.apply) M.apply(T);
    paint();
  }
  montar();

  view.append(cierre('Reto resuelto · procesos celulares', {
    q:'Al terminar una mitosis normal, ¿cómo son las dos células hijas respecto de la célula madre?',
    ops:['Distintas entre sí, porque en la mitosis también hay entrecruzamiento.',
      'Con la mitad de los cromosomas, igual que en la meiosis.',
      'Iguales entre sí y con el mismo número de cromosomas que la madre.',
      'Iguales solo si la célula está en un medio isotónico.'],
    ok:2,
    fb:'La mitosis es una división ecuacional: copia el ADN una vez y reparte cromátidas idénticas. Por eso sirve para crecer y reparar tejidos. La meiosis, en cambio, reduce a la mitad y genera variación.',
    wrong:['El entrecruzamiento ocurre en la profase I de la meiosis, no en la mitosis: en la mitosis los homólogos ni siquiera se aparean.',
      'La reducción a la mitad es propia de la meiosis, que hace dos divisiones con una sola copia del ADN.',
      'El medio afecta el volumen de agua de la célula (ósmosis), no el número de cromosomas de las hijas.']
  }, 'reto-procesos'));

  if (q && q.p){ const s = ESCENAS.find(x=>x.id===q.p); if (s){ sc = s; $$('button',tabs).forEach((b,i)=> b.setAttribute('aria-selected', ESCENAS[i]===sc)); montar(); } }
  return { unmount(){ playing = false; if (E){ try { E.dispose(); } catch(err){ console.warn(err); } } E = null; M = null; } };
});

/* =====================================================================
   RUTA: LAS TRES CÉLULAS COMPARADAS
   ===================================================================== */
const TABLA3 = [
  ['Núcleo con envoltura','sí','sí','no'],
  ['Material genético','ADN lineal en cromosomas','ADN lineal en cromosomas','ADN circular en el nucleoide'],
  ['Pared celular','no','sí, de celulosa','sí, de peptidoglicano'],
  ['Cloroplastos','no','sí','no (las cianobacterias usan membranas internas)'],
  ['Vacuola central','no (varias pequeñas)','sí, enorme','no'],
  ['Mitocondrias','sí','sí','no: respira en su membrana'],
  ['Ribosomas','80S','80S','70S'],
  ['Tamaño típico','10 a 30 micrómetros','20 a 100 micrómetros','1 a 5 micrómetros'],
  ['Cómo se divide','mitosis','mitosis con placa celular','fisión binaria']
];

route('/explorar/celula-comparar', (view) => {
  view.classList.add('wide');
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'},
    h('div',{}, h('span',{class:'eyebrow cell'},'Mundo celular · comparación'),
      h('h1',{},'Las tres células, lado a lado'),
      h('p',{},'Animal, vegetal y procariota en la misma escena. Toca una célula o una columna para resaltarla.'))));

  view.append(franja({
    proposito:'Distinguir de un vistazo qué comparten las tres células y en qué se diferencian, sin memorizar listas sueltas.',
    observa:['El tamaño real: activa la escala verdadera y busca la bacteria',
      'Qué fila dice “sí” en las tres: eso es lo común a toda célula',
      'Qué tiene la vegetal que no tiene la animal, y por qué le sirve'],
    reto:'Encuentra las tres características que comparten TODAS las células y explica por qué ninguna puede faltar.'
  }));

  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'}), tbCard = h('div',{class:'card stack cel-tb'});
  view.append(h('div',{class:'cel-cmpv'}, stage, tbCard, panel));

  let E = null, real = false, sel = null;
  /* cada célula es un conjunto de mallas con desplazamiento y escala relativos
     (Engine3D reparenta las mallas a la escena, así que no se usan grupos) */
  const piezas = { animal:[], vegetal:[], procariota:[] };
  if (webglOK){
    try {
      E = new Engine3D(stage, { radius:17, phi:1.25, theta:0.3, minR:5, maxR:40, floor:-3.4, floorSize:18,
        aria:'Las tres células en 3D. Usa los botones de la tabla para resaltar cada una.',
        onSelect:(id)=>{ if (id) marcar(id,'modelo'); } });
      const low = E.low, R = Kit.rng(61), P = (m) => ({ m, off:[0,0,0], s:[1,1,1] });
      const memb = (c, op, fr) => celFresnel(Kit.tissue({ tex:'tissue', rep:[5,4], bump:0.03, color:c, transparent:true, opacity:op, rough:0.22, coat:1, coatRough:0.12, side:THREE.DoubleSide, depthWrite:false, env:1.25 }), fr, 1.4);
      const at = (g, x, y, z) => { g.translate(x, y, z); return g; };
      const lente = (a, b, c) => { const g = new THREE.SphereGeometry(1, 14, 10); g.scale(a, b, c); return g; };
      const orient = (g, q) => g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
      const rq = () => new THREE.Quaternion().setFromEuler(new THREE.Euler(R()*6, R()*6, R()*6));
      /* --- animal: membrana translúcida, núcleo con nucléolo, mitocondrias, retículo, Golgi y lisosomas --- */
      const aM = new THREE.Mesh(Kit.sculpt({ w: low?40:60, h: low?28:44, radii:[1,0.92,0.96], disp:(p,d)=>0.03*Kit.fbm(d.x*2,d.y*2,d.z*2,2) }), memb(0xE88FB0, 0.62, 0.22)); aM.renderOrder = 2;
      const aN = new THREE.Mesh(Kit.sculpt({ radii:[0.34,0.32,0.33], w:32, h:24 }), Kit.tissue({ tex:'membrane', rep:[2,2], bump:0.015, color:0x7560D0, rough:0.35, coat:0.7 }));
      const aNl = new THREE.Mesh(at(new THREE.SphereGeometry(0.13, 14, 10), 0.1, 0.12, 0.2), Kit.tissue({ color:0x3E2A86, rough:0.5 }));
      aN.geometry.translate(0.05, 0.08, 0);
      const mitA = []; for (let i=0;i<7;i++){ const d = dirOf(R); const g = orient(lente(0.16, 0.065, 0.065), rq()); mitA.push(at(g, d.x*0.62, d.y*0.55, d.z*0.58)); }
      const erA = []; for (let k=0;k<3;k++){ const g = new THREE.SphereGeometry(0.44 + k*0.07, 20, 6, 3.6, 1.8, 1.2, 0.7); erA.push(at(g, 0.05, 0.08, 0)); }
      const goA = []; for (let k=0;k<4;k++){ const g = lente(0.2 - k*0.02, 0.018, 0.12); g.rotateZ(0.5); goA.push(at(g, -0.42 + k*0.035, -0.32 + k*0.045, 0.35)); }
      const lyA = []; for (let i=0;i<5;i++){ const d = dirOf(R); lyA.push(at(new THREE.SphereGeometry(0.06, 10, 8), d.x*0.6, d.y*0.55, d.z*0.55)); }
      piezas.animal = [P(aM), P(aN), P(aNl), P(new THREE.Mesh(Kit.merge(mitA), Kit.tissue({ color:0xE0703E, rough:0.4, coat:0.6 }))),
        P(new THREE.Mesh(Kit.merge(erA), Kit.tissue({ color:0x5E93D6, rough:0.35, coat:0.6, side:THREE.DoubleSide }))),
        P(new THREE.Mesh(Kit.merge(goA), Kit.tissue({ color:0xE0AC45, rough:0.4, coat:0.6 }))), P(new THREE.Mesh(Kit.merge(lyA), Kit.tissue({ color:0xC8508C, rough:0.4, coat:0.6 })))];
      /* --- vegetal: pared de celulosa, vacuola central, cloroplastos y núcleo desplazado --- */
      const A3 = [1.1, 0.9, 0.9], pnorm = (d,k) => { const p=5; const n = Math.pow(Math.pow(Math.abs(d.x/A3[0]),p)+Math.pow(Math.abs(d.y/A3[1]),p)+Math.pow(Math.abs(d.z/A3[2]),p), 1/p); return d.clone().multiplyScalar(k/(n||1e-6)); };
      const vW = new THREE.Mesh(Kit.sculpt({ w: low?40:64, h: low?28:44, shape:d=>pnorm(d,1) }), celFresnel(Kit.tissue({ tex:'tissue', rep:[5,4], bump:0.05, color:0x8DBF55, transparent:true, opacity:0.66, rough:0.5, coat:0.4, side:THREE.DoubleSide, depthWrite:false }), 0.16, 1.3)); vW.renderOrder = 3;
      const vV = new THREE.Mesh(Kit.sculpt({ w:40, h:28, radii:[0.78,0.6,0.6], disp:(p,d)=>0.02*Kit.fbm(d.x*2+3,d.y*2,d.z*2,2) }), celFresnel(Kit.tissue({ color:0x4F95DE, transparent:true, opacity:0.62, rough:0.2, coat:1, side:THREE.DoubleSide, depthWrite:false }), 0.35, 1.3)); vV.geometry.translate(0.08, -0.03, 0); vV.renderOrder = 1;
      const clV = [], grV = []; for (let i=0;i<14;i++){ const d = dirOf(R), c = pnorm(d, 0.84); const q = new THREE.Quaternion().setFromUnitVectors(AX.Y, d);
        clV.push(at(orient(lente(0.15, 0.06, 0.1), q), c.x, c.y, c.z)); for (let k=0;k<3;k++){ const g = new THREE.CylinderGeometry(0.035, 0.035, 0.05, 8); g.translate(-0.06 + k*0.06, 0, 0); grV.push(at(orient(g, q), c.x, c.y, c.z)); } }
      const vN = new THREE.Mesh(at(Kit.sculpt({ radii:[0.24,0.22,0.23], w:28, h:20 }), -0.72, 0.42, 0.18), Kit.tissue({ tex:'membrane', rep:[2,2], bump:0.015, color:0x7560D0, rough:0.35, coat:0.7 }));
      piezas.vegetal = [P(vW), P(vV), P(vN), P(new THREE.Mesh(Kit.merge(clV), Kit.tissue({ color:0x3F9A4E, rough:0.35, coat:0.7 }))), P(new THREE.Mesh(Kit.merge(grV), Kit.tissue({ color:0x17602F, rough:0.45 })))];
      /* --- procariota: bacilo con cápsula, nucleoide, ribosomas, flagelo y pili --- */
      const cps = (hl, r, n) => { const pts = []; for (let i=0;i<=n;i++){ const a = -Math.PI/2 + i/n*Math.PI/2; pts.push(new THREE.Vector2(Math.max(1e-4, r*Math.cos(a)), -hl + r*Math.sin(a))); } for (let i=1;i<=n;i++){ const a = i/n*Math.PI/2; pts.push(new THREE.Vector2(Math.max(1e-4, r*Math.cos(a)), hl + r*Math.sin(a))); } return pts; };
      const bodyG = new THREE.LatheGeometry(cps(0.62, 0.4, 12), low?24:40); bodyG.rotateZ(Math.PI/2);
      const bB = new THREE.Mesh(bodyG, celFresnel(Kit.tissue({ tex:'granular', rep:[4,2], bump:0.02, color:0xC9B672, transparent:true, opacity:0.8, rough:0.3, coat:0.9, side:THREE.DoubleSide, depthWrite:false }), 0.3, 1.4)); bB.renderOrder = 2;
      const npt = []; for (let i=0;i<60;i++){ const t = i/60*Math.PI*2; npt.push(V(Math.cos(t)*0.5 + (R()-0.5)*0.2, Math.sin(t*2)*0.12 + (R()-0.5)*0.12, Math.sin(t)*0.16 + (R()-0.5)*0.1)); }
      const bN = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(npt, true), low?160:300, 0.022, 5, true), Kit.tissue({ color:0xC8466F, rough:0.42, coat:0.5 }));
      const rbP = []; for (let i=0;i<(low?30:60);i++){ const x = (R()*2-1)*0.85, a = R()*6.3, r = R()*0.3; rbP.push(at(new THREE.IcosahedronGeometry(0.028, 0), x, Math.cos(a)*r, Math.sin(a)*r)); }
      const fp = []; for (let i=0;i<=50;i++){ const u = i/50; fp.push(V(1.0 + u*0.8, -u*0.35 + Math.sin(u*13)*0.09*Math.min(1,u*4), Math.cos(u*13)*0.09*Math.min(1,u*4))); }
      const piB = []; for (let i=0;i<12;i++){ const a = i/12*Math.PI*2, x = -0.5 + (i%4)*0.33, d = V(0, Math.cos(a), Math.sin(a)); const g = new THREE.CylinderGeometry(0.008, 0.008, 0.2, 4); orient(g, new THREE.Quaternion().setFromUnitVectors(AX.Y, d)); piB.push(at(g, x, d.y*0.47, d.z*0.47)); }
      piB.forEach(g => g.deleteAttribute('uv'));
      piezas.procariota = [P(bB), P(bN), P(new THREE.Mesh(Kit.merge(rbP), Kit.tissue({ color:0x352E62, rough:0.55 }))),
        P(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(fp), low?60:120, 0.022, 5, false), Kit.tissue({ color:0x6E86C9, rough:0.4 }))), P(new THREE.Mesh(Kit.merge(piB), Kit.tissue({ color:0x98A6BC, rough:0.5 })))];
      Object.entries(piezas).forEach(([id, list]) => E.addPart(id, list.map(q=>q.m), { explodeDir:new THREE.Vector3(0,0,0) }));
      E.addLabel('animal','Animal', [-5.2, 2.4, 0]); E.addLabel('vegetal','Vegetal', [0, 2.8, 0]); E.addLabel('procariota','Procariota', [5.2, 1.8, 0]);
      colocar();
    } catch(err){ console.warn('comparar 3D', err); E = null; }
  }
  /* encuadre: las tres células deben caber a lo ancho, también en pantallas angostas */
  function encuadre(){
    if (!E) return; const w = stage.clientWidth || 800, hh = stage.clientHeight || 560, t = Math.tan(19*Math.PI/180), asp = w/hh;
    const X = real ? 7.6 : 8.0, Y = real ? 3.3 : 2.9, r = clamp(Math.max(Y/t, X/(t*asp)) * 1.06, 12, 38);
    E.opts.radius = r; E.goal.r = r; E.home.set(real ? -0.9 : 0, real ? -0.2 : 0, 0); E.goalTarget.copy(E.home);
  }
  function colocar(){
    if (!E) return;
    const conf = real
      ? { animal:{ p:[-6.2,0,0], k:1.5 }, vegetal:{ p:[0.4,0,0], k:3.0 }, procariota:{ p:[5.6,-2.4,0], k:0.3 } }
      : { animal:{ p:[-5.3,0,0], k:1.7 }, vegetal:{ p:[-0.1,0,0], k:1.9 }, procariota:{ p:[4.85,0,0], k:1.5 } };
    Object.entries(piezas).forEach(([id, list]) => { const c = conf[id];
      list.forEach(q => { q.m.position.set(c.p[0]+q.off[0]*c.k, c.p[1]+q.off[1]*c.k, c.p[2]+q.off[2]*c.k);
        q.m.scale.set(q.s[0]*c.k, q.s[1]*c.k, q.s[2]*c.k); q.m.userData.base = q.m.position.clone(); });
      const l = E.labels.get(id); if (l) l.pos.setX(c.p[0]).setY(c.p[1] + (id==='procariota' ? 0.9 : 2.2)*Math.max(0.5,c.k*0.6));
    });
    encuadre();
  }
  if (E){ const ro = new ResizeObserver(() => encuadre()); ro.observe(stage); const d0 = E.dispose.bind(E); E.dispose = () => { ro.disconnect(); d0(); }; }
  if (!E) stage.append(h('div',{class:'ph cel-fall',style:'margin:40px 20px'},
    'Sin WebGL no se dibujan las tres células, pero la tabla comparativa de la derecha es completa y funciona con teclado.'));
  celChrome(stage, E, { left:h('span',{class:'pill cell'},'Tres células'), model:'celula-comparar',
    captureTxt:()=>'Captura comparativa de las tres células', nota:'Modelo esquemático · usa el botón de escala real' });

  const tbody = h('tbody',{});
  const COLS3 = { animal:'#E8A8C0', vegetal:'#B9D98C', procariota:'#C9B672' };
  const th = (id,t) => h('th',{}, h('button',{onclick:()=>marcar(id,'tabla'),'aria-label':'Resaltar la célula '+t}, h('span',{class:'dot','aria-hidden':'true',style:`background:${COLS3[id]}`}), t));
  const tabla = h('table',{class:'data cel-tabla t3'},
    h('thead',{}, h('tr',{}, h('th',{},'Característica'), th('animal','Animal'), th('vegetal','Vegetal'), th('procariota','Procariota'))), tbody);
  function pintarTabla(){
    tbody.innerHTML = '';
    TABLA3.forEach((r,i) => {
      const tr = h('tr',{ onclick:()=>{ $$('tr',tbody).forEach(x=>x.classList.remove('on')); tr.classList.add('on'); Store.log('comparar_fila',{fila:r[0]}); } },
        h('td',{}, r[0]),
        ...[1,2,3].map(k => h('td',{ class: r[k]==='sí' ? 'si' : r[k]==='no' ? 'no' : '' }, r[k]==='sí' ? 'Sí' : r[k]==='no' ? 'No' : r[k])));
      tbody.append(tr);
    });
  }
  pintarTabla();
  const escBtn = h('button',{class:'btn sm','aria-pressed':'false',onclick:()=>{ real = !real; escBtn.setAttribute('aria-pressed', real?'true':'false');
    escBtn.textContent = real ? 'Volver al tamaño ampliado' : 'Ver el tamaño real relativo'; nota.textContent = real
      ? 'Ahora sí están a escala: la bacteria mide unos 2 micrómetros y la célula vegetal, unos 60. Caben cientos de bacterias en una sola célula vegetal.'
      : 'Atención: aquí las tres están dibujadas de tamaño parecido para poder compararlas. En la realidad la bacteria es muchísimo más pequeña.';
    colocar(); Store.log('escala_comparar',{real}); }}, 'Ver el tamaño real relativo');
  const nota = h('p',{class:'small muted'},'Atención: aquí las tres están dibujadas de tamaño parecido para poder compararlas. En la realidad la bacteria es muchísimo más pequeña.');
  tbCard.append(h('span',{class:'eyebrow cell'},'Tabla comparativa'),
    h('div',{class:'cel-leg'}, h('span',{}, h('i',{style:'background:#E8A8C0'}),'Animal'), h('span',{}, h('i',{style:'background:#B9D98C'}),'Vegetal'), h('span',{}, h('i',{style:'background:#C9B672'}),'Procariota')),
    tabla);
  panel.append(h('div',{class:'card stack'},
    escBtn, nota,
    h('div',{class:'notice info'},'Toda célula, sin excepción, tiene membrana plasmática, citoplasma, ribosomas y material genético. Lo demás cambia según el modo de vida.'),
    h('div',{class:'ctrl-row'},
      h('button',{class:'btn sm',onclick:()=>navigate('#/explorar/celula')},'Célula animal'),
      h('button',{class:'btn sm',onclick:()=>navigate('#/explorar/celula-vegetal')},'Célula vegetal'),
      h('button',{class:'btn sm',onclick:()=>navigate('#/explorar/celula-procariota')},'Bacteria'))));

  function marcar(id, src){
    sel = id; E && E.select(id);
    Store.log('comparar_celula',{celula:id, origen:src});
    toast({ animal:'Célula animal: eucariota, sin pared ni cloroplastos.', vegetal:'Célula vegetal: eucariota, con pared, cloroplastos y vacuola central.', procariota:'Célula procariota: sin núcleo ni organelos con membrana.' }[id] || '');
  }

  view.append(h('div',{class:'card stack'}, h('span',{class:'eyebrow cell'},'Reto · comparación'),
    quizBlock({
      q:'¿Qué tienen en común, sin excepción, la célula animal, la vegetal y la bacteriana?',
      ops:['Núcleo, mitocondrias y ribosomas.',
        'Membrana plasmática, citoplasma, ribosomas y material genético.',
        'Pared celular y vacuola central.',
        'Cloroplastos, porque todas necesitan energía.'],
      ok:1,
      fb:'Eso es lo mínimo para ser célula: una frontera que selecciona, un medio interno donde ocurren las reacciones, máquinas para fabricar proteínas e información para dirigirlo todo.',
      wrong:['La bacteria no tiene núcleo ni mitocondrias, y sigue siendo una célula completa.',
        'La célula animal no tiene pared ni vacuola central; la bacteria tiene pared pero no vacuola central.',
        'Solo la vegetal (y algunos protistas) tiene cloroplastos. Los demás obtienen energía de los alimentos.']
    }, att => { Store.log('quiz_comparar',{intentos:att}); Store.completeActivity('reto-celula-comparar', { score: att===1 ? 100 : Math.max(60, 100-15*(att-1)), attempts: att }); })));

  return { unmount(){ if (E) E.dispose(); E = null; } };
});

/*__FIN__*/
})();
</script>
