# ANAI BioLab — Laboratorio Virtual de Biología · Documento de arquitectura (MVP v0.1)

**Prototipo navegable:** https://claude.ai/code/artifact/c87abe01-f5ad-41ae-9841-dfb6b3faec9f
**Fecha:** 10 de septiembre de 2026 · **Estado:** MVP funcional v0.2 (Etapas 1–6 + cerebro y pulmones 3D)

## 1. Qué contiene el MVP

| Módulo | Ruta | Estado |
|---|---|---|
| Home con corazón 3D en movimiento, accesos, escala "Del ADN a la biosfera", currículo (10 unidades) | `#/` | Completo |
| Panel del estudiante (Mateo Andrade, 37 % base, XP, insignias, sugerencias, última actividad) | `#/panel` | Completo |
| Atlas 3D · Cerebro: 12 estructuras (lóbulos, cerebelo, tronco, médula, cuerpo calloso, tálamo, hipotálamo, hipófisis, hipocampo), impulso nervioso con fases, "¿qué se activa cuando…?", exploración guiada, quiz | `#/explorar/cerebro` | Completo |
| Atlas 3D · Pulmones y vía aérea: 10 estructuras (laringe → alvéolos, pleura, diafragma, capilares), respiración con diafragma y fases, intercambio gaseoso, exploración guiada, quiz | `#/explorar/pulmones` | Completo |
| Órganos pendientes (hígado, riñones, digestivo, reproductor, sistemas): página propia "en construcción" | `#/explorar/organo/:id` | Placeholder |
| Atlas 3D · Corazón: 14 estructuras, hotspots, 3 niveles de profundidad, CONECTA, capas, transparencia, separación, aislar/ocultar, latido con fases, flujo sanguíneo, exploración libre y guiada (6 pasos), quiz por estructura, captura al cuaderno, fallback 2D sin WebGL | `#/explorar/corazon` | Completo |
| Explorador celular · Célula animal: 11 componentes con función/estructura/relaciones/analogía/profundizar, "ver en acción" (animaciones de proceso), capas, quiz visual por selección | `#/explorar/celula` | Completo |
| Misión "El viaje de un glóbulo rojo": 12 estaciones, saturación de O₂, decisiones con retroalimentación específica, predicción + intercambio gaseoso interactivo, esquema global, evaluación (ordenar, seleccionar en 3D, V/F argumentado), insignia | `#/mision/globulo-rojo` | Completo |
| Simulador cardiorrespiratorio: actividad, frecuencia respiratoria, condición (normal/anemia/altitud/alvéolos); FC, gasto cardíaco, ventilación, aporte vs. demanda de O₂; "¿Qué pasaría si…?" con predicción; caso biológico | `#/simuladores/circulacion` | Completo |
| Laboratorio de fotosíntesis: 10 pasos (pregunta → conclusión), control de variables con detección de errores metodológicos, datos con ruido, gráfico, análisis guiado que lee los datos reales del estudiante | `#/laboratorio/fotosintesis` | Completo |
| Evaluación del corazón: selección sobre 3D sin etiquetas, ordenar ciclo cardíaco, relacionar, V/F argumentado | `#/evaluacion/corazon` | Completo |
| Progreso: XP, nivel, insignias, unidades, exploración, registro de eventos, exportación JSON | `#/progreso` | Completo |
| Cuaderno de campo: observaciones, hipótesis, capturas, resultados, conclusiones, notas | `#/cuaderno` | Completo |
| Panel docente: grupo ficticio + estudiante demo real, progreso grupal, preguntas con más error, conceptos difíciles | `#/docente` | Completo (acciones docentes: fase 2) |
| Búsqueda universal (modelos, procesos, misiones, laboratorios, definiciones, unidades) | barra superior | Completo |
| Genética, ecosistemas, microscopio, otros órganos, célula vegetal/procariota, BioTutor, RA | placeholders identificados | Fase 2 |

## 2. Stack

**Prototipo (este entregable):** una sola página HTML autocontenida. HTML/CSS/JS moderno sin framework, Three.js r128 (WebGL) para 3D, Canvas 2D para gráficos y simulación, `localStorage` para persistencia, Google Fonts (Manrope + IBM Plex Sans/Mono).

**Producción (propuesta):** Next.js 15 + TypeScript + Tailwind; React Three Fiber + drei (glTF/Draco, LOD, WebXR para "Ver en mi espacio"); Supabase (PostgreSQL, Auth, Storage, RLS por rol estudiante/docente); despliegue en Vercel; CDN para modelos. Los módulos del prototipo se mapean 1:1 a carpetas del proyecto.

## 3. Arquitectura por capas (mapa del código → producción)

```
src/01-head.html        Tokens de diseño (claro/oscuro), sistema visual        → tailwind.config + globals.css
src/02-shell.html       Shell: sidebar, topbar, búsqueda, bottom-nav          → app/layout.tsx
src/03-data.js          REGISTRO DE CONTENIDOS (JSON editable)                → /content/*.json o tablas Supabase
src/04-core.js          Store + analítica + router + búsqueda + gráficos       → /lib/store, /lib/analytics, /lib/search
src/05-engine3d.js      Motor 3D (controles, picking, etiquetas, capas,        → /components/three/* (R3F)
                        transparencia, explode, animación) + modelos
src/06-views-home.js    Home, Panel, Explorar                                  → app/(student)/...
src/07a-views-atlas.js  Visor genérico de órganos (registro BIO.organs)        → app/explorar/[organo]
src/07b-views-cell.js   Explorador celular                                     → app/explorar/celula
src/03b-data-organs.js  Contenidos cerebro y pulmones · órganos planificados   → /content
src/05b-models-organs.js Modelos procedimentales cerebro y pulmones            → /components/three/models
src/08-views-mission.js Misiones                                               → app/mision/[id]
src/09-views-sim-lab.js Simuladores y laboratorios                             → app/simuladores, app/laboratorio
src/10-views-eval-...   Evaluación, progreso, cuaderno, docente                → app/evaluacion, app/progreso, app/(teacher)
```

### Registro de contenidos
Cada estructura: `{ id, nombre, capa, color, pos, lbl, n1, n2, n3, dato, conecta[], temas[], quiz }`. Cada organelo: `{ id, nombre, funcion, estructura, relaciones, analogia, n3, accion }`. Misiones, insignias, actividades (con unidad, peso y XP) y unidades curriculares son listas editables. Añadir un órgano nuevo = registrar en `BIO.organs` un objeto `{ id, nombre, capas, structures, guiada, cámara, actividad, insignia }` y un constructor `build(E)` que devuelva `{ anims, setSpeed, phaseText, legend, observa }`; el visor genérico (`organView`), la búsqueda, el progreso y la analítica funcionan sin cambios. Así se añadieron cerebro y pulmones.

### Motor 3D
Controles orbitales propios (ratón, táctil con pinza, teclado: flechas, +, −, 0), picking por raycast con paso a través de materiales translúcidos, etiquetas HTML proyectadas con ocultamiento del lado posterior, capas, opacidad, vista explosionada, aislar/ocultar, foco animado, captura JPEG, degradación automática (pixel ratio, segmentos, antialias) en equipos modestos, pausa al ocultar la pestaña y fallback SVG 2D si no hay WebGL. Los modelos actuales son procedimentales y están marcados como "modelo simplificado con fines educativos"; se sustituyen por glTF sin tocar la lógica (solo los `pos` de hotspots).

### Modelo de datos (producción)
`users`, `courses`, `enrollments`, `units`, `activities`, `models`, `structures`, `missions`, `attempts` (usuario, actividad, ítem, respuesta, correcto, intento, tiempo), `notebook_entries`, `badges`, `user_badges`, `events`.

### Esquema de eventos (analítica → Power BI)
`{ id, usuario, tipo, fecha, ruta, actividad?, modelo?, estructura?, origen?, pregunta?, opcion?, correcto?, intento?, resultado?, duracionMin? }`
Tipos actuales: vista, seleccion_estructura, nivel_profundidad, animacion, modo_exploracion, respuesta, respuesta_abierta, prediccion, mision_paso, mision_evento, laboratorio, simulador, cuaderno, captura, busqueda, actividad_completada, insignia. Exportable como JSON desde "Mi progreso"; en producción, tabla `events` + vistas SQL o endpoint REST para Power BI.

### Gamificación
XP por actividad (60–150), comprobaciones (5–10), nivel = XP/400, insignias por logros reales (explorar todo el corazón, completar misión, completar laboratorio), porcentaje de exploración por modelo. Sin mecánicas superficiales.

### BioTutor (preparado, no implementado)
Contrato de contexto ya disponible en el cliente: `{ estructuraSeleccionada, modelo, unidad, nivelEducativo, progreso, ultimosEventos }`. Se implementará como endpoint que recibe ese contexto y responde con la política pedagógica (no dar respuestas de evaluación, preguntar antes de explicar).

## 4. Decisiones de diseño
- Interacción antes que texto: cada modelo abre en exploración; las explicaciones se muestran por niveles (30 s / comprender / profundizar).
- Retroalimentación específica: cada distractor tiene su mensaje; en 3D, la pista depende de qué estructura eligió el estudiante.
- Predicción antes de simular ("¿Qué pasaría si…?") y control de variables en el laboratorio con detección del error metodológico.
- Identidad: azul marino profundo (guiño naval sutil), acento teal científico, familias por dominio (anatomía coral, célula teal, genética violeta, ecología verde, laboratorio ámbar, misiones oro). Tema claro y oscuro.
- Accesibilidad: navegación por teclado (incluido el 3D), lista de estructuras como alternativa al clic en 3D, pausa de animaciones (botón + `prefers-reduced-motion`), contraste, `aria` en controles, sin dependencia exclusiva del color (azul/rojo + texto).
- Rigor: contenidos a nivel BGU, con simplificaciones señaladas; modelos cuantitativos etiquetados como simplificados.

## 5. Roadmap sugerido
**Fase 2 (8–10 semanas):** migración a Next.js + R3F + Supabase con autenticación y roles; modelos glTF definitivos (corazón, célula, pulmones, cerebro); genética (constructor de cruces, ADN 3D, Edita el ADN); microscopio virtual; panel docente con asignación de actividades y revisión de respuestas abiertas.
**Fase 3:** ecosistemas ecuatorianos y simulador de poblaciones; "Viaja dentro"; procesos celulares animados (mitosis, meiosis, síntesis de proteínas); cuerpo humano completo por sistemas.
**Fase 4:** BioTutor, realidad aumentada (WebXR), integración con Power BI, extensión del marco a Física, Química, Ciencias Naturales y Matemáticas (mismo motor pedagógico y registro de contenidos).
