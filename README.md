# ANAI BioLab · Laboratorio Virtual de Biología

Plataforma web educativa de Biología para estudiantes de Bachillerato de **ANAI Online**.
*No estudiar Biología solamente. Explorar la vida.*

## Qué incluye (v0.2)

- Atlas 3D interactivo: **corazón**, **cerebro** y **pulmones** (hotspots con tres niveles de profundidad, capas, transparencia, vista explosionada, animaciones, exploración guiada y quiz).
- Explorador celular 3D: **célula animal** con 11 componentes y "ver en acción".
- Misión: **El viaje de un glóbulo rojo**.
- Simulador cardiorrespiratorio y laboratorio virtual de **fotosíntesis**.
- Evaluación interactiva, progreso, cuaderno de campo y panel docente (datos de demostración ficticios).

## Cómo se usa

Abre `index.html` en un navegador moderno (Chrome, Edge, Firefox o Safari) con conexión a internet.
Publicado con GitHub Pages en: `https://USUARIO.github.io/anai-biolab/`

## Estructura

```
index.html        Plataforma completa en un solo archivo (lo que publica GitHub Pages)
src/              Código fuente modular (estilos, contenidos, motor 3D, vistas)
build.sh          Reconstruye index.html a partir de src/
docs/             Documento de arquitectura y hoja de ruta
```

## Actualizar

- **Sin programar:** sustituye `index.html` por la nueva versión (Add file → Upload files) y confirma el cambio. El sitio se actualiza en 1–2 minutos.
- **Editando el código:** modifica los archivos de `src/` (los contenidos están en `src/03-data.js` y `src/03b-data-organs.js`) y ejecuta `./build.sh`.

## Notas

- Modelos 3D procedimentales creados para el proyecto, simplificados con fines educativos y sustituibles por modelos glTF definitivos.
- El progreso de cada estudiante se guarda en su propio navegador. Las cuentas y el progreso centralizado corresponden a la fase 2 (ver `docs/ARQUITECTURA.md`).
- Los datos de estudiantes son ficticios.
