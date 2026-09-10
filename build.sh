#!/usr/bin/env bash
# Construye ANAI BioLab a partir de los módulos de src/.
#   index.html  → versión web completa (GitHub Pages, Netlify, Moodle…)
#   biolab.html → cuerpo sin <head>, para publicar como página en claude.ai
set -e
cd "$(dirname "$0")"
PARTS="src/01-head.html src/02-shell.html src/03-data.js src/03b-data-organs.js src/04-core.js src/05-engine3d.js src/05b-models-organs.js src/06-views-home.js src/07a-views-atlas.js src/07b-views-cell.js src/08-views-mission.js src/09-views-sim-lab.js src/10-views-eval-progress.js"
cat $PARTS > biolab.html
{ cat src/00-web-head.html; grep -v '^<title>ANAI BioLab</title>$' biolab.html; echo '</body>'; echo '</html>'; } > index.html
( echo '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'; cat biolab.html; echo '</body></html>' ) > test.html
echo "Listo: index.html ($(wc -c < index.html) bytes)"
