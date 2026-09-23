<script>
/* =====================================================================
   COLEGIO: años de Bachillerato, códigos de acceso, curso de demostración,
   tareas asignadas, adaptaciones NEE y representantes.
   Todos los datos de estudiantes son ficticios.
   ===================================================================== */
BIO.school = { institucion:'ANAI Online', asignatura:'Biología',
  docente:{ id:'doc-1', nombre:'Docente de Biología', email:'biologia@anai.edu.ec' } };

/* Distribución de unidades por año (editable desde el panel docente) */
BIO.years = [
  { id:1, n:'1.º de Bachillerato', corto:'1.º BGU', unidades:[1,2,3],
    d:'La vida y su organización, la célula y el metabolismo celular.' },
  { id:2, n:'2.º de Bachillerato', corto:'2.º BGU', unidades:[4,5,6],
    d:'Genética, evolución y anatomía y fisiología humana.' },
  { id:3, n:'3.º de Bachillerato', corto:'3.º BGU', unidades:[7,8,9,10],
    d:'Ecología, biodiversidad, biotecnología y biología aplicada.' }
];
BIO.year = id => BIO.years.find(y => y.id===+id) || (typeof BIO.nivel === 'function' ? BIO.nivel(id) : BIO.years[0]);
/* unidades de un año: la docente puede reasignarlas (se guarda en el navegador) */
BIO.unitsOf = y => (typeof Store!=='undefined' && Store.s && Store.s.yearUnits && Store.s.yearUnits[y]) || BIO.year(y).unidades;
BIO.yearOfUnit = u => (BIO.years.find(y => BIO.unitsOf(y.id).includes(u)) || BIO.years[0]).id;
BIO.paralelos = ['A','B'];

/* Códigos de acceso por año y paralelo (en la fase con servidor se validan en línea) */
BIO.accessCodes = [
  { code:'8EGB-A-C4NT', year:8, paralelo:'A', activo:true, usos:26 },
  { code:'9EGB-A-F7LM', year:9, paralelo:'A', activo:true, usos:24 },
  { code:'10EGB-A-Q2VB', year:10, paralelo:'A', activo:true, usos:21 },
  { code:'1BGU-A-7K3P', year:1, paralelo:'A', activo:true, usos:22 },
  { code:'1BGU-B-M4QD', year:1, paralelo:'B', activo:true, usos:19 },
  { code:'2BGU-A-R9TX', year:2, paralelo:'A', activo:true, usos:24 },
  { code:'2BGU-B-V6HN', year:2, paralelo:'B', activo:true, usos:21 },
  { code:'3BGU-A-J2WF', year:3, paralelo:'A', activo:true, usos:17 },
  { code:'2BGU-A-OLD1', year:2, paralelo:'A', activo:false, usos:24 }
];
BIO.familyCode = 'FAM-2K9P';   /* código de representante de demostración (Mateo Andrade) */

/* ---------- Ítems calificables: actividades y retos con su peso ---------- */
BIO.gradeItems = [
  { id:'explorar-celula', t:'Explorar la célula', corto:'Célula 3D', unidad:2, tipo:'Exploración', peso:1 },
  { id:'reto-celula', t:'Reto: la fábrica de proteínas', corto:'Reto célula', unidad:2, tipo:'Reto', peso:2 },
  { id:'lab-fotosintesis', t:'Laboratorio: fotosíntesis', corto:'Lab. fotosíntesis', unidad:3, tipo:'Laboratorio', peso:3 },
  { id:'explorar-corazon', t:'Explorar el corazón', corto:'Corazón 3D', unidad:6, tipo:'Exploración', peso:1 },
  { id:'guiada-corazon', t:'Exploración guiada del corazón', corto:'Guiada corazón', unidad:6, tipo:'Exploración', peso:1 },
  { id:'reto-corazon', t:'Reto: dos circulaciones', corto:'Reto corazón', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-cerebro', t:'Reto: el cerebro', corto:'Reto cerebro', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-pulmones', t:'Reto: los pulmones', corto:'Reto pulmones', unidad:6, tipo:'Reto', peso:2 },
  { id:'sim-circulacion', t:'Simulador cardiorrespiratorio', corto:'Simulador', unidad:6, tipo:'Simulador', peso:1 },
  { id:'mision-globulo', t:'Misión: el viaje de un glóbulo rojo', corto:'Misión glóbulo', unidad:6, tipo:'Misión', peso:3 },
  { id:'eval-corazon', t:'Evaluación: el corazón', corto:'Evaluación', unidad:6, tipo:'Evaluación', peso:4 },
  /* --- módulos incorporados en v1.0 y v1.1 --- */
  { id:'reto-celula-vegetal', t:'Reto: la célula vegetal', corto:'Cél. vegetal', unidad:2, tipo:'Reto', peso:2 },
  { id:'reto-procariota', t:'Reto: la célula procariota', corto:'Procariota', unidad:2, tipo:'Reto', peso:2 },
  { id:'reto-procesos', t:'Reto: procesos celulares', corto:'Procesos', unidad:2, tipo:'Reto', peso:2 },
  { id:'reto-microscopio', t:'Microscopio virtual', corto:'Microscopio', unidad:2, tipo:'Reto', peso:2 },
  { id:'mision-salva-celula', t:'Misión: salva la célula', corto:'Mis. célula', unidad:2, tipo:'Misión', peso:3 },
  { id:'mision-diagnostico-celular', t:'Misión: diagnóstico celular', corto:'Mis. diagnóstico', unidad:2, tipo:'Misión', peso:3 },
  { id:'lab-catalasa', t:'Laboratorio: catalasa y temperatura', corto:'Lab. catalasa', unidad:3, tipo:'Laboratorio', peso:3 },
  { id:'lab-osmosis-papa', t:'Laboratorio: ósmosis en papa', corto:'Lab. ósmosis', unidad:3, tipo:'Laboratorio', peso:3 },
  { id:'lab-fermentacion', t:'Laboratorio: fermentación', corto:'Lab. fermentación', unidad:3, tipo:'Laboratorio', peso:3 },
  { id:'reto-adn', t:'Reto: ADN y mutaciones', corto:'ADN', unidad:4, tipo:'Reto', peso:2 },
  { id:'reto-cruces', t:'Reto: cuadro de Punnett', corto:'Cruces', unidad:4, tipo:'Reto', peso:2 },
  { id:'mision-codigo-genetico', t:'Misión: código genético', corto:'Mis. genética', unidad:4, tipo:'Misión', peso:3 },
  { id:'reto-evolucion', t:'Reto: selección natural', corto:'Evolución', unidad:4, tipo:'Reto', peso:2 },
  { id:'lab-frecuencia-cardiaca', t:'Laboratorio: frecuencia cardíaca', corto:'Lab. pulso', unidad:6, tipo:'Laboratorio', peso:3 },
  { id:'reto-higado', t:'Reto: el hígado', corto:'Hígado', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-rinones', t:'Reto: los riñones', corto:'Riñones', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-estomago', t:'Reto: el estómago', corto:'Estómago', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-intestino-delgado', t:'Reto: el intestino delgado', corto:'I. delgado', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-intestino-grueso', t:'Reto: el intestino grueso', corto:'I. grueso', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-pancreas', t:'Reto: el páncreas', corto:'Páncreas', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-reproductor', t:'Reto: sistema reproductor', corto:'Reproductor', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-esqueletico', t:'Reto: sistema esquelético', corto:'Esqueleto', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-muscular', t:'Reto: sistema muscular', corto:'Muscular', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-nervioso', t:'Reto: sistema nervioso', corto:'Nervioso', unidad:6, tipo:'Reto', peso:2 },
  { id:'reto-ecosistemas', t:'Reto: ecosistemas del Ecuador', corto:'Ecosistemas', unidad:7, tipo:'Reto', peso:2 },
  { id:'reto-poblaciones', t:'Reto: dinámica de poblaciones', corto:'Poblaciones', unidad:7, tipo:'Reto', peso:2 },
  { id:'mision-ecosistema-riesgo', t:'Misión: el ecosistema en riesgo', corto:'Mis. ecosistema', unidad:7, tipo:'Misión', peso:3 }
];
BIO.gradeItemsOf = year => BIO.gradeItems.filter(i => BIO.unitsOf(year).includes(i.unidad));

/* ---------- Curso de demostración (datos ficticios) ---------- */
const NOMBRES = ['Valentina Cobo','Sebastián Ríos','Camila Ortiz','Nicolás Paredes','Isabella Mora','Emilio Vaca','Doménica Salas','Joaquín Torres','Martina Vélez','Andrés Cedeño','Rafaela Ponce','Matías Alvarado','Emilia Zambrano','Thiago Benítez','Antonella Guerra','Samuel Loor','Renata Espín','Ariel Chávez','Julieta Mendoza','Bruno Carrasco','Luciana Peña','Iván Maldonado','Sofía Arteaga','Daniel Yépez','Paula Jaramillo','Mateo Cárdenas','Elena Suárez','Gabriel Noboa','Amelia Vintimilla','Óliver Tapia'];
const REPRE = ['Sra. Pérez','Sr. Gómez','Sra. Andrade','Sr. Villacís','Sra. Naranjo','Sr. Bustamante','Sra. Espinoza','Sr. Palacios'];
const ADAPT = { 'letra-grande':'Letra grande', 'tipografia':'Tipografía legible', 'voz':'Lectura en voz alta', 'menos-movimiento':'Menos movimiento', 'pistas':'Pistas siempre visibles', 'intentos':'Intentos adicionales', 'tiempo':'Sin límite de tiempo' };
BIO.adaptaciones = ADAPT;

/* generador determinista: los mismos datos en cada visita */
function lcg(seed){ let s = seed>>>0; return () => (s = (s*1664525 + 1013904223)>>>0) / 4294967296; }
function buildRoster(){
  const out = []; let k = 0;
  const grupos = [ {year:1, par:'A', n:10}, {year:1, par:'B', n:8}, {year:2, par:'A', n:11}, {year:2, par:'B', n:8}, {year:3, par:'A', n:8} ];
  grupos.forEach(g => {
    const items = BIO.gradeItemsOf(g.year);
    for (let i=0;i<g.n;i++){
      const r = lcg(97 + k*31 + g.year*7);
      const nombre = NOMBRES[k % NOMBRES.length]; k++;
      const nivel = 0.3 + r()*0.68;                       // desempeño general del estudiante
      const notas = {};
      const DIF = [0.4,-0.5,0.2,0.5,-0.2,-0.7,0.1,-0.4,0.6,-0.3,-0.8];   // dificultad relativa de cada actividad
      items.forEach((it,j) => { const hecho = r() < (nivel + 0.18 - j*0.045); if (hecho) notas[it.id] = Math.max(3.5, Math.min(10, Math.round((4.2 + nivel*5.6 + DIF[j%11]*1.6 + (r()-0.5)*2.6)*10)/10)); });
      const dias = Math.round(Math.pow(r(),2)*14);         // días desde la última conexión
      const adapt = []; if (r()<0.16) adapt.push('letra-grande'); if (r()<0.12) adapt.push('voz'); if (r()<0.1) adapt.push('pistas'); if (r()<0.08) adapt.push('tiempo');
      out.push({ id:'e'+k, nombre, year:g.year, paralelo:g.par,
        email: nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z ]/g,'').split(' ').join('.')+'@anai.edu.ec',
        rep: REPRE[k % REPRE.length], repTel:'09'+String(80000000 + Math.floor(r()*19999999)),
        notas, dias, min: 60 + Math.round(nivel*260), adapt, demo:false });
    }
  });
  return out;
}
BIO.roster = null;
BIO.getRoster = () => BIO.roster || (BIO.roster = buildRoster());
BIO.rosterOf = (year, par) => BIO.getRoster().filter(e => e.year===year && (!par || e.paralelo===par));
/* El estudiante de demostración (Mateo Andrade) se integra al curso 2.º A y usa el progreso real de este navegador */
BIO.demoStudentId = 'demo-mateo';

/* Notas de arranque del estudiante de demostración (si aún no realiza la actividad en este navegador) */
BIO.demoNotas = { 'explorar-corazon':8.6, 'guiada-corazon':8.0, 'explorar-celula':9.0, 'lab-fotosintesis':7.4, 'sim-circulacion':8.2, 'mision-globulo':8.8 };

/* ---------- Tareas asignadas por la docente (fechas relativas a hoy) ---------- */
const D = n => Date.now() + n*86400000;
BIO.assignments = [
  { id:'a1', item:'reto-corazon',    year:2, paralelo:'A', vence:D(2),  nota:'Resuélvelo después de observar los dos ventrículos.' },
  { id:'a2', item:'mision-globulo',  year:2, paralelo:'A', vence:D(6),  nota:'Anota en el cuaderno dónde se carga y dónde se descarga el oxígeno.' },
  { id:'a3', item:'eval-corazon',    year:2, paralelo:'A', vence:D(-1), nota:'Evaluación de la unidad 6.' },
  { id:'a4', item:'reto-celula',     year:1, paralelo:'A', vence:D(3),  nota:'Ordena el recorrido de la insulina.' },
  { id:'a5', item:'lab-fotosintesis',year:1, paralelo:'A', vence:D(8),  nota:'Formula tu hipótesis antes de experimentar.' }
];

/* ---------- Comentarios de la docente (vista de familia) ---------- */
BIO.comentarios = [
  { alumno:'demo-mateo', at:D(-2), txt:'Muy buena exploración del corazón. Le sugiero revisar el reto del tabique interventricular antes de la evaluación.' },
  { alumno:'demo-mateo', at:D(-9), txt:'Completó la misión del glóbulo rojo con una argumentación clara.' }
];
</script>
