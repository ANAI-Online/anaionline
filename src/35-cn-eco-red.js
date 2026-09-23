<style>
/* ===== Explorador de ecosistemas: red trófica, energía y perturbaciones ===== */
.ecr-nav{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
.ecr-nav button{border:1px solid var(--line);background:var(--bg-2);color:var(--ink-2);border-radius:999px;padding:7px 13px;font:600 .82rem/1.1 "IBM Plex Sans",sans-serif;cursor:pointer}
.ecr-nav button[aria-current="true"]{background:var(--eco);border-color:var(--eco);color:#fff}
.ecr-nav button .stp{font-family:"IBM Plex Mono",monospace;opacity:.7;margin-right:5px}
.ecr-sys{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.ecr-sys button{display:flex;gap:9px;align-items:center;text-align:left;border:1.5px solid var(--line);background:var(--bg-2);color:var(--ink);border-radius:12px;padding:9px 13px;cursor:pointer;font:600 .86rem/1.2 "IBM Plex Sans",sans-serif}
.ecr-sys button[aria-pressed="true"]{border-color:var(--eco);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--eco) 26%,transparent)}
.ecr-sys button small{display:block;font-weight:400;color:var(--ink-3);font-size:.74rem;margin-top:2px}
.ecr-sys .em{font-size:1.3rem}
.ecr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:9px}
.ecr-card{display:flex;flex-direction:column;gap:5px;align-items:center;text-align:center;border:1px solid var(--line);border-radius:13px;padding:10px 8px;background:var(--bg-2);cursor:pointer;color:var(--ink);font:inherit}
.ecr-card:hover,.ecr-card:focus-visible{border-color:var(--eco);outline:none;transform:translateY(-1px)}
.ecr-card[aria-pressed="true"]{border-color:var(--eco);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--eco) 22%,transparent)}
.ecr-card .sil{width:74px;height:74px;color:var(--ink-2)}
.ecr-card b{font-size:.84rem;line-height:1.15}
.ecr-card i{font-size:.72rem;color:var(--ink-3);font-style:italic;line-height:1.1}
.ecr-tag{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--line);border-radius:999px;padding:1px 8px;font:600 .68rem/1.5 "IBM Plex Sans",sans-serif;color:var(--ink-2);background:var(--bg-3)}
.ecr-web{width:100%;height:auto;background:var(--bg-3);border:1px solid var(--line);border-radius:14px;touch-action:manipulation}
.ecr-node{cursor:pointer}
.ecr-node:focus{outline:none}
.ecr-node:focus-visible .nshape{stroke-width:4;stroke-dasharray:5 3}
.ecr-legend{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;font-size:.76rem;color:var(--ink-3)}
.ecr-legend span{display:inline-flex;align-items:center;gap:5px}
.ecr-ficha{display:grid;grid-template-columns:110px 1fr;gap:12px;align-items:start}
.ecr-ficha .sil{width:96px;height:96px;color:var(--ink-2)}
.ecr-kv{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:.84rem;margin-top:6px}
.ecr-kv dt{font-weight:600;color:var(--ink-2)}
.ecr-kv dd{margin:0;color:var(--ink-2)}
.ecr-pyr{display:flex;flex-direction:column;gap:6px;align-items:center}
.ecr-lvl{display:flex;align-items:center;justify-content:center;gap:8px;border:1.5px solid var(--line);border-radius:8px;background:var(--bg-3);min-height:42px;padding:6px 10px;font-size:.8rem;color:var(--ink);transition:width .4s ease}
.ecr-lvl.faint{opacity:.45;border-style:dashed}
.ecr-lvl b,.ecr-lvl span{white-space:nowrap}
.ecr-check{display:grid;gap:6px}
.ecr-check li{display:flex;gap:8px;align-items:flex-start;font-size:.85rem;list-style:none}
.ecr-check .ck{width:18px;height:18px;border-radius:5px;border:1.5px solid var(--line);flex:0 0 auto;display:grid;place-items:center;font-size:.7rem;font-weight:700}
.ecr-check li.ok .ck{background:var(--ok);border-color:var(--ok);color:#fff}
.ecr-pred{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;border-bottom:1px dashed var(--line);padding:7px 0}
.ecr-pred .opts{display:flex;gap:4px}
.ecr-cyc{width:100%;height:auto;background:var(--bg-3);border:1px solid var(--line);border-radius:14px}
.ecr-proc{cursor:pointer}
.ecr-proc:focus-visible rect{stroke-width:3}
[data-motion="reducido"] .ecr-lvl{transition:none}
/* v1.7 · colores por nivel trófico (la forma y el rótulo siguen indicando el nivel: no depende solo del color) */
:root{--ecr-n1:#3E8E41;--ecr-n2:#A87A10;--ecr-n3:#C4581E;--ecr-n4:#B3353A;--ecr-d:#86603F;--ecr-hl:#FFFFFF}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--ecr-n1:#6CC274;--ecr-n2:#E0B44A;--ecr-n3:#F08A52;--ecr-n4:#EE7076;--ecr-d:#C79B72;--ecr-hl:#122036}}
:root[data-theme="dark"]{--ecr-n1:#6CC274;--ecr-n2:#E0B44A;--ecr-n3:#F08A52;--ecr-n4:#EE7076;--ecr-d:#C79B72;--ecr-hl:#122036}
.ecr-med{display:grid;place-items:center;width:86px;height:86px;border-radius:50%;color:var(--ecr-lv,var(--ink-2));background:radial-gradient(circle at 34% 28%,color-mix(in srgb,var(--ecr-lv) 6%,var(--bg-2)),color-mix(in srgb,var(--ecr-lv) 20%,var(--bg-2)));border:1.5px solid color-mix(in srgb,var(--ecr-lv) 42%,transparent);box-shadow:inset 0 -6px 12px color-mix(in srgb,var(--ecr-lv) 10%,transparent)}
.ecr-med .sil{width:66px;height:66px;color:inherit}
.ecr-ficha .ecr-med{width:104px;height:104px}.ecr-ficha .ecr-med .sil{width:80px;height:80px}
.ecr-card .ecr-tag,.ecr-ficha .ecr-tag.lv{border-color:color-mix(in srgb,var(--ecr-lv) 55%,transparent);color:var(--ecr-lv);background:color-mix(in srgb,var(--ecr-lv) 10%,var(--bg-2))}
.ecr-card[aria-pressed="true"]{border-color:var(--ecr-lv)}
.ecr-web text,.ecr-cyc text,.ecr-pir text{font-family:"IBM Plex Sans",sans-serif}
.ecr-flujo{stroke-dasharray:3 13;animation:ecr-flu .9s linear infinite}
@keyframes ecr-flu{to{stroke-dashoffset:-16}}
.ecr-pulso{transform-box:fill-box;transform-origin:center;animation:ecr-pul 1.6s ease-out infinite}
@keyframes ecr-pul{0%{transform:scale(.9);opacity:.8}100%{transform:scale(1.35);opacity:0}}
.ecr-node:hover .nshape{stroke-width:3}
.ecr-pir{width:100%;max-width:680px;margin:0 auto;height:auto;background:var(--bg-3);border:1px solid var(--line);border-radius:14px;display:block}
.ecr-calor{animation:ecr-cal 2.4s ease-in-out infinite}
@keyframes ecr-cal{0%,100%{transform:translateY(0);opacity:.85}50%{transform:translateY(-4px);opacity:.45}}
[data-motion="reducido"] .ecr-flujo,[data-motion="reducido"] .ecr-pulso,[data-motion="reducido"] .ecr-calor{animation:none}
@media (prefers-reduced-motion:reduce){.ecr-flujo,.ecr-pulso,.ecr-calor{animation:none}}
.ecr-webw{overflow-x:auto;-webkit-overflow-scrolling:touch}
@media (max-width:640px){.ecr-webw>svg.ecr-web{min-width:700px}.ecr-webw>svg.ecr-cyc{min-width:600px}}

@media (max-width:640px){.ecr-ficha{grid-template-columns:1fr}.ecr-ficha .sil{width:80px;height:80px}}
</style>
<script>
/* =====================================================================
   CIENCIAS NATURALES · ECOSISTEMAS DEL ECUADOR
   Red trófica · flujo de energía · ciclos de materia · perturbaciones
   8.º EGB (U2: ecosistemas, energía y ciclos) · 9.º EGB (U3: biodiversidad
   del Ecuador y conservación).
   Ruta: #/cn/eco/red-trofica · Actividad: cn-eco-red
   ===================================================================== */

/* La actividad se registra aquí para no tocar src/03-data.js */
if (typeof BIO !== 'undefined' && BIO.activities && !BIO.activities['cn-eco-red'])
  BIO.activities['cn-eco-red'] = { t:'Red trófica y ecosistemas del Ecuador', unidad:7, peso:30, xp:140 };
if (typeof ACT_HREF !== 'undefined') ACT_HREF['cn-eco-red'] = '#/cn/eco/red-trofica';

/* ---------------------------------------------------------------------
   Siluetas en SVG (dibujadas aquí mismo: ninguna imagen externa).
   v1.7: redibujadas con proporciones de cada especie (perfil hacia la
   derecha, apoyadas en la línea de suelo). Lienzo de 100 × 100, usan
   currentColor; los detalles claros usan var(--ecr-hl), así funcionan
   igual en tema claro y oscuro y sobre la ficha tintada de cada nivel.
   --------------------------------------------------------------------- */
const ECR_HL = 'var(--ecr-hl, var(--bg-3))';
const ECR_ART = {
  frailejon:'<path d="M43 95 L44.5 50 h11 L57 95z"/><path d="M44 52 l-4 6 4 2 -4 7 4 2 -4 7 4 2 -4 8 4 1 M56 52 l4 6 -4 2 4 7 -4 2 4 7 -4 2 4 8 -4 1" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" opacity=".8"/>'
    + '<g opacity=".92">' + [-78,-58,-38,-19,0,19,38,58,78].map(a => `<ellipse cx="50" cy="29" rx="4.6" ry="16" transform="rotate(${a} 50 46)"/>`).join('') + '</g>'
    + [-45,-15,15,45].map(a => `<ellipse cx="50" cy="35" rx="3.4" ry="10" transform="rotate(${a} 50 46)" fill="${ECR_HL}" opacity=".35"/>`).join('')
    + '<path d="M58 40 C66 30 70 20 71 10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="71.5" cy="9" r="4"/><circle cx="66" cy="16" r="3.2"/><circle cx="75" cy="17" r="2.8"/>',
  pajonal:'<g stroke="currentColor" fill="none" stroke-linecap="round"><g stroke-width="3.2"><path d="M50 92 C47 70 40 48 26 30"/><path d="M50 92 C53 70 60 48 74 30"/><path d="M50 92 C45 74 34 60 14 50"/><path d="M50 92 C55 74 66 60 86 50"/><path d="M50 92 C49 66 50 40 48 14"/></g>'
    + '<g stroke-width="2.2" opacity=".85"><path d="M50 92 C44 72 38 56 34 20"/><path d="M50 92 C56 72 62 56 66 20"/><path d="M50 92 C42 78 28 70 8 66"/><path d="M50 92 C58 78 72 70 92 66"/><path d="M50 92 C47 70 44 50 40 28"/><path d="M50 92 C53 70 56 50 60 28"/></g></g><ellipse cx="50" cy="93" rx="22" ry="4" opacity=".45"/>',
  achupalla:'<path d="M44 82 C43 64 44 40 46 22 C47 14 53 14 54 22 C56 40 57 64 56 82z"/>'
    + '<g fill="' + ECR_HL + '" opacity=".55">' + [26,34,42,50,58,66,74].map((y,i) => `<circle cx="${i%2?53:47}" cy="${y}" r="2.2"/>`).join('') + '</g>'
    + '<g stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none"><path d="M50 88 L20 70"/><path d="M50 88 L80 70"/><path d="M50 90 L12 84"/><path d="M50 90 L88 84"/><path d="M50 88 L30 60"/><path d="M50 88 L70 60"/></g><ellipse cx="50" cy="90" rx="24" ry="5"/>',
  conejo:'<ellipse cx="44" cy="68" rx="25" ry="17"/><ellipse cx="34" cy="74" rx="15" ry="13"/><ellipse cx="69" cy="52" rx="13" ry="11"/>'
    + '<ellipse cx="62" cy="30" rx="4.8" ry="15" transform="rotate(-18 62 30)"/><ellipse cx="70" cy="31" rx="4.4" ry="14" transform="rotate(4 70 31)"/><circle cx="18" cy="63" r="6.5"/>'
    + '<path d="M60 76 h8 v12 h-8z"/><ellipse cx="34" cy="88" rx="15" ry="4"/><circle cx="74" cy="49" r="2.3" fill="' + ECR_HL + '"/><ellipse cx="62" cy="31" rx="1.8" ry="10" transform="rotate(-18 62 31)" fill="' + ECR_HL + '" opacity=".45"/>',
  venado:'<ellipse cx="44" cy="50" rx="26" ry="13"/><path d="M60 44 C66 40 70 32 74 24 L82 28 C78 38 72 48 66 54z"/><ellipse cx="83" cy="25" rx="10" ry="6" transform="rotate(22 83 25)"/><ellipse cx="74" cy="17" rx="5.5" ry="2.6" transform="rotate(-35 74 17)"/>'
    + '<g stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M78 18 C76 10 72 6 66 4 M74 10 L70 12 M79 18 C82 10 86 6 92 5 M85 9 L88 13"/></g>'
    + '<g stroke="currentColor" stroke-width="4.4" stroke-linecap="round"><path d="M60 56 L62 90"/><path d="M53 58 L52 90"/><path d="M30 56 L26 72 L29 90"/><path d="M37 58 L36 90"/></g><path d="M19 44 C12 40 12 50 19 52z"/><circle cx="87" cy="24" r="1.8" fill="' + ECR_HL + '"/>',
  raton:'<ellipse cx="46" cy="68" rx="24" ry="15"/><path d="M62 58 C72 54 84 58 92 66 C84 72 72 74 62 72z"/><circle cx="64" cy="50" r="8.5"/><circle cx="64" cy="50" r="4.5" fill="' + ECR_HL + '" opacity=".5"/>'
    + '<path d="M23 66 C8 62 4 48 12 38 C14 34 18 34 16 40 C12 48 14 58 24 62" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>'
    + '<g stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M38 80 L36 88 M56 80 L58 88"/></g><circle cx="78" cy="62" r="2.2" fill="' + ECR_HL + '"/><path d="M90 66 L99 62 M90 67 L99 69" stroke="currentColor" stroke-width="1.2"/>',
  colibri:'<ellipse cx="46" cy="58" rx="17" ry="9" transform="rotate(-38 46 58)"/><circle cx="61" cy="40" r="8.5"/><path d="M67 37 L97 27 L68 42z"/>'
    + '<path d="M50 50 C40 36 28 22 12 12 C18 26 28 40 42 54z" opacity=".85"/><path d="M52 48 C46 30 40 18 30 8 C32 22 38 38 46 52z" opacity=".5"/>'
    + '<path d="M36 66 L18 86 L28 84 L24 96 L42 72z"/><circle cx="63" cy="38" r="1.9" fill="' + ECR_HL + '"/><path d="M50 60 C54 62 58 58 60 52" fill="none" stroke="' + ECR_HL + '" stroke-width="2.4" opacity=".6"/>'
    + '<path d="M84 60 C80 66 80 76 84 84 C88 76 88 66 84 60z" opacity=".55"/><path d="M84 84 V96" stroke="currentColor" stroke-width="2" opacity=".55"/>',
  zorro:'<ellipse cx="46" cy="54" rx="25" ry="11.5"/><path d="M64 46 C70 40 78 38 82 40 L96 48 L82 54 C76 56 68 56 64 54z"/><path d="M72 42 L74 28 L81 40z"/><path d="M79 41 L84 29 L87 43z"/>'
    + '<path d="M22 50 C10 54 4 66 6 80 C14 76 20 66 26 58z"/><path d="M8 72 C6 76 6 80 7 82 C10 80 12 77 13 74z" fill="' + ECR_HL + '" opacity=".6"/>'
    + '<g stroke="currentColor" stroke-width="3.6" stroke-linecap="round"><path d="M62 60 L64 90"/><path d="M56 62 L55 90"/><path d="M32 62 L28 76 L31 90"/><path d="M38 62 L38 90"/></g><circle cx="83" cy="45" r="1.8" fill="' + ECR_HL + '"/>',
  curiquingue:'<ellipse cx="46" cy="52" rx="16" ry="23" transform="rotate(-22 46 52)"/><circle cx="61" cy="26" r="10.5"/><path d="M69 21 C78 21 81 28 76 34 L72 30 L68 32z"/>'
    + '<path d="M34 64 L18 90 L28 88 L40 70z"/><path d="M38 38 C28 46 26 62 32 70 C36 60 40 50 46 44z" opacity=".75"/>'
    + '<g stroke="currentColor" stroke-width="3.4" stroke-linecap="round" fill="none"><path d="M47 72 L45 90 M54 70 L57 90"/><path d="M45 90 h-7 M45 90 h6 M57 90 h-6 M57 90 h7"/></g>'
    + '<path d="M62 30 C66 34 68 38 66 42" fill="none" stroke="' + ECR_HL + '" stroke-width="3" opacity=".6"/><g stroke="' + ECR_HL + '" stroke-width="1.6" opacity=".55"><path d="M48 44 l4 4 M45 52 l4 4 M50 56 l4 4"/></g><circle cx="63" cy="23" r="2" fill="' + ECR_HL + '"/>',
  condor:'<path d="M50 44 C42 42 30 40 18 42 L12 37 L10 43 L4 40 L5 46 L0 47 L4 51 C14 54 30 56 44 60z"/><path d="M50 44 C42 42 30 40 18 42 L12 37 L10 43 L4 40 L5 46 L0 47 L4 51 C14 54 30 56 44 60z" transform="matrix(-1 0 0 1 100 0)"/>'
    + '<path d="M40 50 C32 50 22 50 12 49 C22 52 32 54 42 56z M60 50 C68 50 78 50 88 49 C78 52 68 54 58 56z" fill="' + ECR_HL + '" opacity=".55"/>'
    + '<ellipse cx="50" cy="54" rx="9" ry="15"/><path d="M44 66 L50 80 L56 66z"/><circle cx="50" cy="33" r="6.5"/><path d="M50 26 C54 24 57 27 55 30z"/><ellipse cx="50" cy="41" rx="9" ry="4" fill="' + ECR_HL + '" opacity=".85"/>',
  puma:'<ellipse cx="46" cy="54" rx="28" ry="12.5"/><path d="M68 48 C72 44 78 42 84 42 C90 42 94 46 93 51 C92 56 86 58 80 58 C74 58 70 56 68 54z"/><path d="M77 43 L79 35 L84 42z"/><path d="M85 42 L88 35 L90 44z"/>'
    + '<path d="M19 50 C8 54 4 66 6 80 C7 86 12 88 14 84 C11 76 12 66 22 58z"/>'
    + '<g stroke="currentColor" stroke-width="5.2" stroke-linecap="round"><path d="M62 60 L64 89"/><path d="M55 62 L54 89"/><path d="M31 60 L27 75 L30 89"/><path d="M39 62 L39 89"/></g><circle cx="86" cy="47" r="1.8" fill="' + ECR_HL + '"/><path d="M88 53 L96 55" stroke="' + ECR_HL + '" stroke-width="1.2" opacity=".7"/>',
  hongos:'<path d="M28 92 C29 80 30 70 30 60 h10 C40 70 41 80 42 92z"/><path d="M12 62 C12 42 58 42 58 62 C50 58 20 58 12 62z"/><g stroke="' + ECR_HL + '" stroke-width="1.3" opacity=".6"><path d="M20 60 L24 57 M30 59 L32 56 M40 59 L38 56 M50 60 L46 57"/></g>'
    + '<path d="M64 92 C65 84 66 78 66 72 h7 C73 78 74 84 75 92z"/><path d="M54 74 C54 60 86 60 86 74 C78 71 62 71 54 74z"/><circle cx="24" cy="52" r="3" fill="' + ECR_HL + '"/><circle cx="40" cy="49" r="2.5" fill="' + ECR_HL + '"/><circle cx="70" cy="66" r="2.3" fill="' + ECR_HL + '"/>'
    + '<path d="M4 94 h92" stroke="currentColor" stroke-width="3" opacity=".35"/><path d="M36 94 C40 97 52 96 58 98 M70 94 C76 97 84 96 90 99" fill="none" stroke="currentColor" stroke-width="1" opacity=".5"/>',
  lombriz:'<path d="M8 72 C22 44 38 88 54 60 C66 38 80 58 92 40" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round"/><path d="M58 53 C61 48 64 45 67 44" fill="none" stroke="' + ECR_HL + '" stroke-width="5" opacity=".35"/>'
    + '<g stroke="' + ECR_HL + '" stroke-width="1.6" opacity=".7"><path d="M14 60 l7 5 M22 54 l6 7 M32 58 l3 8 M40 68 l7 -3 M47 70 l3 -8 M74 46 l6 4 M82 44 l4 6 M88 40 l4 5"/></g><circle cx="91" cy="40" r="1.5" fill="' + ECR_HL + '"/>',
  mangleRojo:'<path d="M18 26 C18 12 36 6 50 10 C62 4 82 10 84 24 C92 28 90 40 80 40 C70 46 30 46 20 40 C10 40 8 30 18 26z"/><path d="M46 60 L47 38 h6 L54 60z"/>'
    + '<g fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"><path d="M49 54 C36 56 26 66 22 88"/><path d="M51 54 C64 56 74 66 78 88"/><path d="M49 58 C42 66 40 76 38 88"/><path d="M51 58 C58 66 60 76 62 88"/><path d="M49 50 C30 50 14 62 10 88"/><path d="M51 50 C70 50 86 62 90 88"/><path d="M30 42 C28 56 30 72 30 88"/><path d="M70 42 C72 56 70 72 70 88"/></g>'
    + '<path d="M2 84 C12 80 22 88 32 84 C42 80 52 88 62 84 C72 80 82 88 98 84 V96 H2z" opacity=".35"/><g stroke="currentColor" stroke-width="1.6" opacity=".8"><path d="M36 44 v10 M58 44 v12 M64 44 v9"/></g>',
  mangleNegro:'<path d="M20 30 C18 14 40 8 52 12 C66 8 84 16 82 30 C88 36 82 46 72 44 C60 50 36 50 26 44 C14 44 12 34 20 30z"/><path d="M44 80 L46 42 h8 L56 80z"/><path d="M28 82 C36 78 42 78 46 76 h8 C58 78 64 78 72 82z"/>'
    + '<g stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M10 92 V80 M18 92 V76 M24 92 V82 M32 92 V78 M68 92 V78 M76 92 V82 M82 92 V76 M90 92 V80"/></g><path d="M2 92 h96" stroke="currentColor" stroke-width="3" opacity=".4"/>'
    + '<g fill="' + ECR_HL + '" opacity=".5"><circle cx="34" cy="24" r="2"/><circle cx="60" cy="22" r="2"/><circle cx="72" cy="34" r="2"/></g>',
  fitoplancton:'<circle cx="30" cy="34" r="17"/><g stroke="' + ECR_HL + '" stroke-width="1.4" opacity=".7">' + [0,30,60,90,120,150].map(a => `<path d="M30 34 L${(30+15*Math.cos(a*Math.PI/180)).toFixed(1)} ${(34+15*Math.sin(a*Math.PI/180)).toFixed(1)} M30 34 L${(30-15*Math.cos(a*Math.PI/180)).toFixed(1)} ${(34-15*Math.sin(a*Math.PI/180)).toFixed(1)}"/>`).join('') + '</g><circle cx="30" cy="34" r="5" fill="' + ECR_HL + '" opacity=".7"/>'
    + '<path d="M50 74 C58 60 88 56 96 64 C88 78 58 82 50 74z"/><path d="M54 72 C66 66 82 64 92 65" stroke="' + ECR_HL + '" stroke-width="1.5" fill="none" opacity=".7"/>'
    + '<path d="M60 16 C62 10 72 10 74 16 L80 30 C82 36 70 42 64 36z"/><path d="M76 24 C84 18 88 12 92 6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M66 38 L62 48" stroke="currentColor" stroke-width="1.8"/>'
    + '<g><circle cx="14" cy="76" r="6"/><circle cx="24" cy="82" r="6"/><circle cx="35" cy="86" r="6"/></g>',
  cangrejo:'<path d="M30 48 C32 38 68 38 70 48 C74 54 70 66 50 68 C30 66 26 54 30 48z"/><g stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M32 58 L18 62 L10 74"/><path d="M34 63 L22 70 L18 84"/><path d="M38 66 L32 76 L30 90"/><path d="M68 58 L82 62 L90 74"/><path d="M66 63 L78 70 L82 84"/><path d="M62 66 L68 76 L70 90"/></g>'
    + '<path d="M34 46 C26 40 20 36 16 30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M66 46 C74 40 80 36 84 30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'
    + '<path d="M8 30 C6 18 20 14 24 24 L18 26 L20 32 C14 36 9 35 8 30z"/><path d="M92 30 C94 18 80 14 76 24 L82 26 L80 32 C86 36 91 35 92 30z"/>'
    + '<g stroke="currentColor" stroke-width="2"><path d="M44 42 V34 M56 42 V34"/></g><circle cx="44" cy="33" r="3"/><circle cx="56" cy="33" r="3"/><path d="M38 52 C46 56 54 56 62 52" fill="none" stroke="' + ECR_HL + '" stroke-width="1.6" opacity=".6"/>',
  concha:'<path d="M46 20 C40 18 36 22 38 26 C20 30 8 48 12 64 C16 80 34 88 54 86 C76 84 90 70 88 52 C86 36 72 26 58 24 C58 20 52 18 46 20z"/>'
    + '<g fill="none" stroke="' + ECR_HL + '" stroke-width="2" opacity=".6"><path d="M46 26 C32 40 26 60 28 82 M48 26 C40 44 38 64 42 86 M50 26 C50 46 52 66 56 86 M52 26 C60 42 66 62 70 82 M54 26 C68 38 78 54 82 72 M44 26 C26 36 16 52 16 66"/></g>'
    + '<g fill="none" stroke="' + ECR_HL + '" stroke-width="1.2" opacity=".4"><path d="M22 54 C40 48 62 48 82 54 M18 68 C40 62 64 62 86 66"/></g>',
  camaron:'<path d="M80 30 C94 44 92 66 76 76 C60 86 36 84 24 72 C38 74 54 70 64 60 C72 52 76 40 80 30z"/><path d="M24 72 L8 62 L12 76 L4 84 L22 82z"/>'
    + '<g stroke="' + ECR_HL + '" stroke-width="1.6" opacity=".7" fill="none"><path d="M82 44 C74 48 72 54 74 60 M78 58 C70 60 66 64 66 70 M68 68 C60 70 56 72 54 78 M54 74 C46 76 42 78 40 82"/></g>'
    + '<g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M82 28 C86 14 94 8 99 8 M80 27 C76 12 80 4 86 2 M82 32 C88 28 94 30 98 34"/><path d="M76 70 L78 84 M68 74 L68 88 M58 78 L56 90 M48 80 L44 90"/></g><circle cx="82" cy="36" r="3.4" fill="' + ECR_HL + '"/>',
  lisa:'<path d="M14 50 C28 34 60 32 86 44 C92 47 94 52 86 56 C60 68 28 66 14 50z"/><path d="M16 50 L2 36 L7 50 L2 64z"/><path d="M40 37 L46 26 L52 36z"/><path d="M62 37 L66 30 L70 38z"/><path d="M52 60 L54 70 L46 62z"/>'
    + '<path d="M24 49 C44 46 64 46 84 49" stroke="' + ECR_HL + '" stroke-width="1.6" fill="none" opacity=".6"/><path d="M26 44 C44 40 64 41 80 44" stroke="' + ECR_HL + '" stroke-width="1" fill="none" opacity=".4"/><circle cx="80" cy="47" r="3" fill="' + ECR_HL + '"/><path d="M72 42 C70 48 70 52 72 56" stroke="' + ECR_HL + '" stroke-width="1.4" fill="none" opacity=".6"/>',
  pargo:'<path d="M16 54 C24 28 62 20 86 44 C92 50 92 54 86 58 C64 80 26 80 16 54z"/><path d="M18 54 L2 36 L8 54 L2 74z"/>'
    + '<path d="M30 34 L34 20 L40 30 L44 18 L50 28 L54 18 L58 30 L64 26 L68 36 C56 30 40 30 30 34z"/><path d="M48 74 L52 88 L40 76z"/><path d="M66 70 L70 80 L60 72z"/>'
    + '<circle cx="78" cy="46" r="3.4" fill="' + ECR_HL + '"/><circle cx="46" cy="50" r="5" fill="' + ECR_HL + '" opacity=".55"/><path d="M70 40 C66 48 66 56 70 62" stroke="' + ECR_HL + '" stroke-width="1.6" fill="none" opacity=".55"/>',
  garceta:'<ellipse cx="40" cy="50" rx="20" ry="12" transform="rotate(-16 40 50)"/><path d="M52 44 C60 38 58 28 54 22 C50 14 56 8 64 10 L68 14 C60 14 60 20 62 26 C66 34 64 44 56 50z"/><circle cx="64" cy="12" r="5.5"/><path d="M68 10 L96 14 L68 16z"/>'
    + '<path d="M22 50 L6 58 L24 56z"/><g stroke="currentColor" stroke-width="2.8" stroke-linecap="round" fill="none"><path d="M40 60 L40 92 M46 58 L50 76 L48 92"/><path d="M40 92 h-8 M40 92 h7 M48 92 h-7 M48 92 h8"/></g><circle cx="65" cy="11" r="1.5" fill="' + ECR_HL + '"/>',
  fragata:'<path d="M50 50 C44 42 36 30 22 28 C14 26 8 30 2 22 C8 36 16 40 28 42 C36 44 42 52 44 58z"/><path d="M50 50 C56 42 64 30 78 28 C86 26 92 30 98 22 C92 36 84 40 72 42 C64 44 58 52 56 58z"/>'
    + '<ellipse cx="50" cy="56" rx="7.5" ry="14"/><circle cx="50" cy="40" r="6"/><path d="M53 37 L64 33 L60 38 L54 42z"/><path d="M45 68 L36 96 L50 76 L64 96 L55 68z"/><circle cx="50" cy="50" r="5" fill="' + ECR_HL + '" opacity=".45"/>',
  mapache:'<ellipse cx="46" cy="60" rx="26" ry="16"/><path d="M66 52 C70 42 80 40 88 46 L97 52 L88 58 C80 62 70 60 66 56z"/><path d="M68 44 L68 32 L77 42z"/><path d="M80 42 L84 31 L87 45z"/>'
    + '<path d="M70 48 C76 44 84 44 88 48 C84 52 76 52 70 50z" fill="' + ECR_HL + '" opacity=".5"/><circle cx="80" cy="48" r="2" /><path d="M21 56 C10 58 4 68 6 82 C12 82 16 74 22 64z"/>'
    + '<g stroke="' + ECR_HL + '" stroke-width="3" opacity=".6"><path d="M8 72 L16 70 M8 78 L14 76 M12 64 L20 62"/></g><g stroke="currentColor" stroke-width="5" stroke-linecap="round"><path d="M32 72 V90 M44 74 V90 M58 72 V90 M64 70 L68 90"/></g>',
  cocodrilo:'<path d="M6 64 C20 54 40 52 58 54 C68 55 80 54 96 48 L96 58 C84 62 72 64 58 64 C40 64 24 68 8 70z"/><path d="M8 70 C0 74 0 82 12 80z"/>'
    + '<g><path d="M24 55 l4 -7 l4 7z"/><path d="M34 54 l4 -7 l4 7z"/><path d="M44 53 l4 -7 l4 7z"/><path d="M14 58 l4 -6 l4 6z"/></g><circle cx="66" cy="52" r="3.4"/><circle cx="66" cy="52" r="1.6" fill="' + ECR_HL + '"/>'
    + '<g stroke="' + ECR_HL + '" stroke-width="1.4" opacity=".7"><path d="M76 55 v4 M82 54 v4 M88 52 v4 M94 50 v4"/></g><g stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"><path d="M30 64 L24 76 L18 78 M50 64 L50 76 L56 78"/></g>',
  bacterias:'<g><rect x="10" y="28" width="30" height="13" rx="6.5" transform="rotate(-18 25 34)"/><rect x="46" y="18" width="26" height="12" rx="6" transform="rotate(14 59 24)"/><rect x="28" y="60" width="34" height="13" rx="6.5" transform="rotate(8 45 66)"/><circle cx="80" cy="56" r="8"/><circle cx="88" cy="72" r="6"/><circle cx="18" cy="76" r="7"/><circle cx="72" cy="36" r="5"/></g>'
    + '<g stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".8"><path d="M40 28 C48 24 50 30 56 28 M62 70 C70 72 72 66 78 68 M72 22 C78 16 76 10 82 8"/></g><g fill="' + ECR_HL + '" opacity=".5"><circle cx="20" cy="33" r="2"/><circle cx="56" cy="24" r="2"/><circle cx="42" cy="66" r="2"/></g>',
  ceiba:'<path d="M42 94 C42 70 45 52 46 36 h8 C55 52 58 70 58 94z"/><path d="M43 94 C36 84 26 80 14 80 C24 86 30 90 32 94z"/><path d="M57 94 C64 84 74 80 86 80 C76 86 70 90 68 94z"/><path d="M45 94 C42 88 38 86 34 86 C38 90 40 92 40 94z" opacity=".7"/>'
    + '<path d="M8 28 C8 18 26 12 38 16 C44 8 60 8 64 16 C76 10 94 16 92 28 C98 32 92 40 82 38 C70 44 30 44 18 38 C8 40 2 32 8 28z"/>'
    + '<g stroke="currentColor" stroke-width="3" fill="none"><path d="M50 40 L30 32 M50 40 L70 32 M50 40 L50 30"/></g><g fill="' + ECR_HL + '" opacity=".35"><ellipse cx="30" cy="22" rx="10" ry="4"/><ellipse cx="68" cy="22" rx="10" ry="4"/></g>',
  chonta:'<path d="M47 96 C46 74 47 54 48 36 h5 C54 54 55 74 54 96z"/><g stroke="' + ECR_HL + '" stroke-width="1.6" opacity=".55"><path d="M47 44 h7 M47 52 h7 M47 60 h7 M47 68 h7 M47 76 h7 M47 84 h7"/></g>'
    + '<g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M50 36 C38 28 22 28 8 40"/><path d="M50 36 C62 28 78 28 92 40"/><path d="M50 34 C44 20 32 12 18 12"/><path d="M50 34 C56 20 68 12 82 12"/><path d="M50 34 C50 22 50 14 50 4"/></g>'
    + '<g stroke="currentColor" stroke-width="1.4" opacity=".85"><path d="M40 30 l-3 6 M34 30 l-3 6 M28 31 l-3 6 M20 33 l-3 6 M60 30 l3 6 M66 30 l3 6 M72 31 l3 6 M80 33 l3 6 M42 24 l-5 3 M36 19 l-5 3 M28 15 l-4 4 M58 24 l5 3 M64 19 l5 3 M72 15 l4 4"/></g>'
    + '<circle cx="42" cy="46" r="4.5"/><circle cx="58" cy="47" r="4.5"/><circle cx="50" cy="52" r="4.5"/><circle cx="44" cy="55" r="4"/><circle cx="56" cy="56" r="4"/>',
  sotobosque:'<path d="M30 92 C28 72 22 58 8 48 C24 44 36 56 36 76z"/><path d="M34 92 C34 74 42 60 58 54 C48 68 42 80 40 92z"/><path d="M70 92 C70 72 76 58 92 52 C78 50 66 60 64 78z"/><path d="M64 92 C62 74 52 64 40 60 C50 72 56 82 58 92z" opacity=".8"/>'
    + '<path d="M50 94 V40" stroke="currentColor" stroke-width="2.4"/><g><path d="M50 44 L40 40 L48 50z"/><path d="M50 54 L60 50 L52 60z"/><path d="M50 64 L40 60 L48 70z"/></g>'
    + '<g stroke="' + ECR_HL + '" stroke-width="1.2" opacity=".55" fill="none"><path d="M12 50 C22 54 30 62 32 76 M88 54 C80 58 72 66 70 78"/></g><path d="M4 95 h92" stroke="currentColor" stroke-width="3" opacity=".3"/>',
  hormiga:'<ellipse cx="72" cy="66" rx="15" ry="11"/><ellipse cx="50" cy="62" rx="8" ry="7"/><circle cx="32" cy="58" r="10"/><path d="M26 50 L22 44" stroke="currentColor" stroke-width="3"/>'
    + '<g stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M26 52 C18 42 14 38 8 38 M30 50 C28 40 26 34 20 30"/><path d="M46 68 L38 88 M52 68 L54 90 M56 66 L66 88"/></g>'
    + '<path d="M22 60 L12 64 L22 66z"/><path d="M28 48 C32 30 40 16 58 8 C78 2 90 18 84 34 C76 44 58 46 44 44 C38 44 32 46 30 50z" opacity=".55"/><path d="M40 40 C52 28 66 20 82 18" stroke="' + ECR_HL + '" stroke-width="1.6" fill="none" opacity=".6"/><circle cx="28" cy="56" r="2" fill="' + ECR_HL + '"/>',
  mono:'<ellipse cx="46" cy="58" rx="18" ry="22"/><circle cx="46" cy="30" r="14"/><ellipse cx="47" cy="33" rx="8.5" ry="9" fill="' + ECR_HL + '" opacity=".75"/><circle cx="31" cy="28" r="5.5"/><circle cx="61" cy="28" r="5.5"/>'
    + '<circle cx="43" cy="30" r="1.8"/><circle cx="51" cy="30" r="1.8"/><path d="M44 37 C46 39 48 39 50 37" fill="none" stroke="currentColor" stroke-width="1.4"/>'
    + '<path d="M62 66 C82 68 96 56 92 40 C90 32 82 32 82 40 C84 48 78 54 64 56" fill="none" stroke="currentColor" stroke-width="6.5" stroke-linecap="round"/>'
    + '<g stroke="currentColor" stroke-width="7" stroke-linecap="round"><path d="M36 76 L32 92 M56 76 L60 92"/><path d="M32 48 L22 66 M60 48 L66 64"/></g>',
  guanta:'<path d="M20 62 C20 44 40 38 58 40 C72 42 80 48 84 56 C88 66 80 76 64 78 C44 80 20 78 20 62z"/><ellipse cx="80" cy="54" rx="13" ry="11"/><path d="M90 50 L99 55 L90 60z"/><circle cx="76" cy="42" r="5"/>'
    + '<g fill="' + ECR_HL + '" opacity=".85"><circle cx="30" cy="54" r="2.8"/><circle cx="40" cy="52" r="2.8"/><circle cx="50" cy="51" r="2.8"/><circle cx="60" cy="52" r="2.8"/><circle cx="34" cy="63" r="2.6"/><circle cx="44" cy="62" r="2.6"/><circle cx="54" cy="61" r="2.6"/><circle cx="64" cy="62" r="2.6"/><circle cx="84" cy="51" r="2"/></g>'
    + '<g stroke="currentColor" stroke-width="6" stroke-linecap="round"><path d="M32 74 V88 M46 76 V88 M66 74 V88"/></g>',
  danta:'<path d="M14 54 C14 36 34 30 56 32 C72 34 80 40 82 50 C84 64 72 72 50 72 C28 72 14 68 14 54z"/><path d="M74 38 C82 34 88 38 90 46 C94 50 98 54 96 60 C92 58 88 56 84 58 C78 58 74 52 74 46z"/><ellipse cx="78" cy="34" rx="4.5" ry="6"/>'
    + '<g stroke="currentColor" stroke-width="8" stroke-linecap="round"><path d="M26 66 V90 M40 68 V90 M62 66 V90 M72 62 V90"/></g><path d="M12 50 C6 48 6 56 12 56z"/><circle cx="84" cy="45" r="2" fill="' + ECR_HL + '"/><path d="M24 40 C38 34 60 34 72 40" fill="none" stroke="' + ECR_HL + '" stroke-width="2" opacity=".45"/>',
  guacamayo:'<ellipse cx="48" cy="42" rx="14" ry="18"/><circle cx="54" cy="22" r="11"/><path d="M62 16 C74 14 76 28 64 32 C66 26 64 22 60 22z"/><path d="M60 26 C62 30 66 32 64 34 C60 34 58 30 58 28z" opacity=".8"/>'
    + '<ellipse cx="55" cy="21" rx="5" ry="4" fill="' + ECR_HL + '" opacity=".75"/><circle cx="55" cy="21" r="1.8"/><path d="M36 36 C26 44 26 60 36 64 C40 54 42 46 46 40z" opacity=".75"/>'
    + '<path d="M44 58 C42 74 36 90 28 99 L38 99 C46 88 52 74 54 58z"/><path d="M50 58 C52 74 52 88 48 99 L42 99 C46 88 46 74 46 58z" opacity=".7"/>'
    + '<path d="M26 62 H80" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><g stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M44 58 L44 62 M52 58 L52 62"/></g>',
  rana:'<ellipse cx="50" cy="56" rx="24" ry="20"/><circle cx="35" cy="36" r="10"/><circle cx="65" cy="36" r="10"/><circle cx="35" cy="36" r="4.2" fill="' + ECR_HL + '"/><circle cx="65" cy="36" r="4.2" fill="' + ECR_HL + '"/><circle cx="35" cy="36" r="2"/><circle cx="65" cy="36" r="2"/>'
    + '<path d="M26 60 C10 64 6 80 14 88 C20 84 22 76 28 70z"/><path d="M74 60 C90 64 94 80 86 88 C80 84 78 76 72 70z"/><path d="M30 44 C22 42 14 46 12 52 C18 52 24 50 30 50z"/><path d="M70 44 C78 42 86 46 88 52 C82 52 76 50 70 50z"/>'
    + '<g fill="none" stroke="' + ECR_HL + '" stroke-width="3" opacity=".6"><path d="M38 44 C36 56 38 66 42 72 M62 44 C64 56 62 66 58 72"/></g><g fill="' + ECR_HL + '" opacity=".7"><circle cx="8" cy="89" r="2"/><circle cx="14" cy="92" r="2"/><circle cx="92" cy="89" r="2"/><circle cx="86" cy="92" r="2"/></g>',
  tucan:'<ellipse cx="40" cy="52" rx="18" ry="17"/><circle cx="54" cy="32" r="11"/><path d="M62 24 C80 20 96 26 98 34 C92 40 76 42 62 40z"/><path d="M64 38 C76 38 90 38 97 35 C92 40 76 42 64 40z" opacity=".6"/>'
    + '<ellipse cx="53" cy="36" rx="7" ry="6" fill="' + ECR_HL + '" opacity=".8"/><circle cx="55" cy="29" r="2"/><path d="M24 48 C14 56 14 70 26 70 C28 62 30 56 34 50z" opacity=".8"/>'
    + '<path d="M30 66 L18 94 L28 94 L38 70z"/><path d="M16 72 H72" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><g stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M40 68 L40 72 M48 66 L48 72"/></g>',
  boa:'<path d="M18 80 C8 80 6 70 16 66 C30 60 60 70 74 64 C84 60 84 50 72 48 C60 46 40 54 30 48 C22 44 26 34 38 32 C50 30 60 34 66 30" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round"/>'
    + '<path d="M62 32 C66 22 76 18 84 20 C92 22 94 28 88 32 C82 34 74 34 66 36z"/><circle cx="84" cy="24" r="2" fill="' + ECR_HL + '"/><path d="M92 28 L99 26 M92 29 L99 32" stroke="currentColor" stroke-width="1.3"/>'
    + '<g fill="' + ECR_HL + '" opacity=".65"><ellipse cx="14" cy="72" rx="3" ry="2.4"/><ellipse cx="30" cy="64" rx="3.4" ry="2.4"/><ellipse cx="48" cy="67" rx="3.4" ry="2.4"/><ellipse cx="66" cy="64" rx="3.4" ry="2.4"/><ellipse cx="76" cy="54" rx="3" ry="2.4"/><ellipse cx="56" cy="49" rx="3.4" ry="2.4"/><ellipse cx="38" cy="50" rx="3.4" ry="2.4"/><ellipse cx="32" cy="38" rx="3" ry="2.4"/><ellipse cx="50" cy="33" rx="3" ry="2.4"/></g>',
  jaguar:'<ellipse cx="45" cy="54" rx="29" ry="15"/><path d="M68 46 C72 38 82 36 88 40 C94 44 96 52 92 56 C88 60 80 60 74 58 C70 56 68 52 68 46z"/><path d="M75 40 L76 32 L82 38z"/><path d="M86 38 L90 31 L91 41z"/>'
    + '<path d="M17 50 C8 54 6 64 10 74 C12 78 16 78 15 74 C13 66 16 60 22 58z"/>'
    + '<g stroke="currentColor" stroke-width="7" stroke-linecap="round"><path d="M62 62 L63 89"/><path d="M54 64 L53 89"/><path d="M30 62 L27 76 L30 89"/><path d="M38 64 L38 89"/></g>'
    + '<g fill="none" stroke="' + ECR_HL + '" stroke-width="1.8" opacity=".8"><circle cx="30" cy="48" r="4"/><circle cx="42" cy="45" r="4.2"/><circle cx="54" cy="47" r="4"/><circle cx="36" cy="58" r="3.6"/><circle cx="48" cy="57" r="3.8"/><circle cx="60" cy="56" r="3.2"/><circle cx="24" cy="57" r="3"/></g><g fill="' + ECR_HL + '" opacity=".8"><circle cx="42" cy="45" r="1.2"/><circle cx="48" cy="57" r="1.2"/><circle cx="84" cy="46" r="1.9"/></g>',
  harpia:'<path d="M32 46 C30 30 40 20 54 22 C64 24 70 34 68 46 C68 62 60 74 50 76 C40 74 32 62 32 46z"/><circle cx="54" cy="22" r="12"/><path d="M44 14 L36 2 L48 10z"/><path d="M52 11 L50 0 L57 10z"/>'
    + '<path d="M64 20 C74 22 76 30 66 34 C66 28 64 26 62 24z"/><ellipse cx="53" cy="32" rx="9" ry="4" fill="' + ECR_HL + '" opacity=".35"/><path d="M40 44 C44 56 52 60 60 56 C58 64 50 70 44 66 C40 60 38 52 40 44z" fill="' + ECR_HL + '" opacity=".6"/>'
    + '<path d="M40 70 L32 96 L50 80 L58 96 L56 72z"/><path d="M28 40 C16 48 14 66 26 68 C28 58 30 50 34 44z" opacity=".85"/>'
    + '<g stroke="currentColor" stroke-width="6" stroke-linecap="round"><path d="M44 72 V84 M56 72 V84"/></g><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M44 84 l-7 5 M44 84 l1 8 M44 84 l7 5 M56 84 l-7 5 M56 84 l1 8 M56 84 l7 5"/></g><path d="M20 86 H80" stroke="currentColor" stroke-width="3" opacity=".6"/><circle cx="56" cy="20" r="2.2" fill="' + ECR_HL + '"/>',
  descomp:'<path d="M20 92 C21 82 22 74 22 66 h9 C31 74 32 82 33 92z"/><path d="M6 68 C6 50 48 50 48 68 C40 64 14 64 6 68z"/><circle cx="18" cy="60" r="2.6" fill="' + ECR_HL + '"/><circle cx="34" cy="58" r="2.2" fill="' + ECR_HL + '"/>'
    + '<ellipse cx="80" cy="74" rx="11" ry="6"/><ellipse cx="66" cy="72" rx="6" ry="5"/><circle cx="56" cy="70" r="6"/><g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"><path d="M52 66 C48 60 46 58 42 58 M54 64 C54 58 52 54 48 52"/><path d="M62 76 L56 86 M68 77 L68 88 M76 79 L82 88"/></g>'
    + '<path d="M4 94 h92" stroke="currentColor" stroke-width="3" opacity=".35"/><path d="M34 94 C44 90 56 96 66 92 C74 90 84 96 94 92" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".6"/><path d="M60 24 C66 18 76 18 80 26 C74 24 66 26 60 32z" opacity=".7"/>'
};
function ecrSil(art, cls){ return '<svg class="'+(cls||'sil')+'" viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="currentColor">'+(ECR_ART[art]||'')+'</svg>'; }

/* ---------------------------------------------------------------------
   Datos de los tres ecosistemas. Especies reales del Ecuador con su
   nombre común y científico. Las relaciones alimentarias son las descritas
   en la literatura ecológica; los valores numéricos son aproximados y así
   se indica en pantalla.
   --------------------------------------------------------------------- */
const ECR_ROL = {
  0:{ n:'Productor', ab:'N1', forma:'rombo', d:'Fabrica su propio alimento con la fotosíntesis.' },
  1:{ n:'Consumidor primario', ab:'N2', forma:'círculo', d:'Herbívoro: se alimenta de productores.' },
  2:{ n:'Consumidor secundario', ab:'N3', forma:'cuadrado', d:'Carnívoro u omnívoro: come consumidores primarios.' },
  3:{ n:'Consumidor terciario o superdepredador', ab:'N4', forma:'triángulo', d:'Está en la cima: casi nadie lo caza.' },
  4:{ n:'Descomponedor', ab:'D', forma:'hexágono', d:'Transforma los restos y devuelve los nutrientes al suelo o al agua.' }
};

const ECR_SYS = {
paramo:{ id:'paramo', n:'Páramo andino', ar:'el', em:'🏔️', sub:'sobre los 3.500 m · Cotopaxi, Cajas, Antisana',
  d:'Pajonales, frailejones y suelos negros que retienen agua. Frío, mucha radiación solar y poca productividad: por eso las cadenas alimentarias son cortas y cualquier pérdida se nota rápido.',
  base:9000, baseNota:'valor aproximado de producción primaria neta del pajonal, del orden de 9.000 kJ por metro cuadrado y año',
  sp:[
   {id:'pajonal', n:'Paja de páramo', sci:'Calamagrostis intermedia', art:'pajonal', lvl:0, est:'Preocupación menor', d:'Forma el pajonal que cubre el páramo. Sus hojas duras y silíceas son difíciles de digerir, pero sostienen a casi todos los herbívoros.', come:[]},
   {id:'frailejon', n:'Frailejón', sci:'Espeletia pycnophylla', art:'frailejon', lvl:0, est:'Vulnerable en el Ecuador (poblaciones reducidas al norte, en El Ángel)', d:'Planta en roseta con hojas peludas que condensan la neblina. Crece muy despacio: unos pocos centímetros al año.', come:[]},
   {id:'achupalla', n:'Achupalla', sci:'Puya hamata', art:'achupalla', lvl:0, est:'Preocupación menor', d:'Bromelia gigante del páramo. Su enorme inflorescencia ofrece néctar a colibríes y refugio a insectos.', come:[]},
   {id:'conejo', n:'Conejo de páramo', sci:'Sylvilagus andinus', art:'conejo', lvl:1, est:'Preocupación menor', d:'Herbívoro abundante y muy prolífico. Es la presa principal del lobo de páramo.', come:['pajonal','frailejon']},
   {id:'venado', n:'Venado de cola blanca', sci:'Odocoileus peruvianus', art:'venado', lvl:1, est:'Preocupación menor, pero muy cazado', d:'El herbívoro grande del páramo. Ramonea pajonal y brotes tiernos; controla el crecimiento de la vegetación.', come:['pajonal','achupalla','frailejon']},
   {id:'raton', n:'Ratón andino', sci:'Thomasomys sp.', art:'raton', lvl:1, est:'Preocupación menor', d:'Roedor nocturno que come semillas, raíces y algunos insectos. Une la vegetación con casi todos los carnívoros.', come:['pajonal','frailejon']},
   {id:'colibri', n:'Estrella ecuatoriana', sci:'Oreotrochilus chimborazo', art:'colibri', lvl:1, est:'Preocupación menor · endémica de los Andes ecuatorianos', d:'Colibrí que vive solo en el páramo alto. Bebe néctar y, al hacerlo, poliniza: su papel va más allá de alimentarse.', come:['achupalla','frailejon']},
   {id:'zorro', n:'Lobo de páramo', sci:'Lycalopex culpaeus', art:'zorro', lvl:2, est:'Preocupación menor · perseguido por ataques al ganado', d:'Cánido oportunista: caza conejos y ratones, come frutos y aprovecha la carroña. Es el depredador más visible del páramo.', come:['conejo','raton']},
   {id:'curiquingue', n:'Curiquingue', sci:'Phalcoboenus carunculatus', art:'curiquingue', lvl:2, est:'Preocupación menor', d:'Ave rapaz caminadora. Come insectos, lombrices, ratones y restos de animales muertos: es depredador y carroñero a la vez.', come:['raton','lombriz']},
   {id:'puma', n:'Puma', sci:'Puma concolor', art:'puma', lvl:3, est:'Preocupación menor a escala global, pero escaso y amenazado en los páramos del Ecuador', d:'Superdepredador. Un solo puma necesita un territorio enorme; al cazar venados y conejos impide que el pajonal sea sobrepastoreado.', come:['venado','conejo','zorro']},
   {id:'condor', n:'Cóndor andino', sci:'Vultur gryphus', art:'condor', lvl:3, est:'En peligro crítico en el Ecuador (quedan pocas decenas de individuos, según censos nacionales)', d:'No caza: se alimenta de animales muertos. Depende de que existan grandes herbívoros y de que nadie envenene la carroña.', come:['venado','zorro'], nota:{venado:'carroña', zorro:'carroña'}},
   {id:'hongos', n:'Hongos del suelo', sci:'Hongos y bacterias del suelo de páramo', art:'hongos', lvl:4, est:'No evaluado · el suelo negro del páramo guarda enormes cantidades de carbono', d:'Descomponen hojas, raíces y cadáveres. En el frío del páramo trabajan muy lento: por eso se acumula materia orgánica y el suelo retiene agua.', come:['pajonal','frailejon','venado','puma']},
   {id:'lombriz', n:'Lombriz andina', sci:'Oligoquetos del suelo andino', art:'lombriz', lvl:4, est:'No evaluado', d:'Detritívoro: tritura la hojarasca, airea el suelo y acelera la descomposición. También es alimento del curiquingue.', come:['pajonal','frailejon']}
  ],
  pop:{ P:'pajonal', H:'venado', M:'zorro', T:'puma' },
  perts:['caza-tope','quema','sequia','invasora'],
  invasora:{ n:'Pino exótico (Pinus radiata) y ganado', d:'Las plantaciones de pino secan el suelo y desplazan al pajonal; el ganado compite con el venado.' },
  ciclo:{ dep:'el suelo negro y la turba del páramo', extra:'El páramo guarda muchísimo carbono en el suelo: si se quema o se ara, ese carbono vuelve a la atmósfera como CO₂.' }
},
manglar:{ id:'manglar', n:'Manglar de la Costa', ar:'el', em:'🦀', sub:'Reserva Manglares Churute · Cayapas-Mataje (Esmeraldas)',
  d:'Bosque que vive con los pies en el agua salada. Enorme cantidad de hojarasca: casi toda la red empieza con hojas de mangle en descomposición, no con hojas vivas.',
  base:30000, baseNota:'valor aproximado: los manglares están entre los ecosistemas más productivos del planeta, del orden de 30.000 kJ por metro cuadrado y año',
  sp:[
   {id:'mangle-rojo', n:'Mangle rojo', sci:'Rhizophora mangle', art:'mangleRojo', lvl:0, est:'Preocupación menor a escala global · en el Ecuador ha perdido gran parte de su superficie por las camaroneras', d:'Se sostiene sobre raíces en zanco. Sus hojas caen al fango y alimentan a cangrejos, conchas y bacterias: es la base de la red.', come:[]},
   {id:'mangle-negro', n:'Mangle negro', sci:'Avicennia germinans', art:'mangleNegro', lvl:0, est:'Preocupación menor', d:'Respira por neumatóforos, raíces que salen del fango como pajitas. Elimina sal por las hojas.', come:[]},
   {id:'fitoplancton', n:'Fitoplancton', sci:'Diatomeas y dinoflagelados del estuario', art:'fitoplancton', lvl:0, est:'No evaluado', d:'Algas microscópicas que fotosintetizan en el agua. Sostienen a los filtradores y son la base de la parte acuática de la red.', come:[]},
   {id:'cangrejo-rojo', n:'Cangrejo rojo', sci:'Ucides occidentalis', art:'cangrejo', lvl:1, est:'Sujeto a veda anual en el Ecuador por sobreexplotación', d:'Come hojas caídas de mangle y detrito. Sus cuevas airean el fango. Es la pesca artesanal más importante del manglar.', come:['mangle-rojo','mangle-negro']},
   {id:'concha-prieta', n:'Concha prieta', sci:'Anadara tuberculosa', art:'concha', lvl:1, est:'Población en descenso · con talla mínima y veda en el Ecuador', d:'Bivalvo que filtra el agua y retiene fitoplancton y detrito. Vive enterrado entre las raíces del mangle rojo.', come:['fitoplancton','mangle-rojo']},
   {id:'camaron', n:'Camarón blanco', sci:'Penaeus vannamei', art:'camaron', lvl:1, est:'Silvestre en descenso · base de la acuicultura del Ecuador', d:'Sus larvas crecen entre las raíces del manglar, que funciona como guardería. Come detrito y microorganismos.', come:['fitoplancton','mangle-rojo']},
   {id:'lisa', n:'Lisa', sci:'Mugil cephalus', art:'lisa', lvl:1, est:'Preocupación menor', d:'Pez que raspa el fango y filtra algas y detrito. Muy abundante: alimenta a casi todos los depredadores del estuario.', come:['fitoplancton','mangle-rojo']},
   {id:'garceta', n:'Garceta grande', sci:'Ardea alba', art:'garceta', lvl:2, est:'Preocupación menor', d:'Caza al acecho en aguas someras: peces pequeños, camarones y cangrejos. Anida en colonias sobre el mangle.', come:['camaron','lisa','cangrejo-rojo']},
   {id:'pargo', n:'Pargo lunarejo', sci:'Lutjanus guttatus', art:'pargo', lvl:2, est:'Sobrepescado en la costa ecuatoriana', d:'Pez carnívoro que entra con la marea a cazar camarones y peces jóvenes entre las raíces.', come:['camaron','lisa']},
   {id:'mapache', n:'Mapache cangrejero', sci:'Procyon cancrivorus', art:'mapache', lvl:2, est:'Preocupación menor', d:'Omnívoro nocturno. Abre conchas y atrapa cangrejos en el fango; también come frutos y huevos.', come:['cangrejo-rojo','concha-prieta']},
   {id:'fragata', n:'Fragata', sci:'Fregata magnificens', art:'fragata', lvl:2, est:'Preocupación menor', d:'Ave marina que pesca en la superficie y roba comida a otras aves. Casi no se moja: no tiene plumas impermeables.', come:['lisa','camaron']},
   {id:'cocodrilo', n:'Cocodrilo de la Costa', sci:'Crocodylus acutus', art:'cocodrilo', lvl:3, est:'Vulnerable a escala global · en peligro en el Ecuador', d:'Superdepredador del estuario. Caza peces, cangrejos y mamíferos que se acercan a la orilla. Muy sensible a la pérdida de manglar.', come:['lisa','pargo','mapache','cangrejo-rojo']},
   {id:'bacterias', n:'Bacterias y hongos del fango', sci:'Comunidad microbiana del sedimento', art:'bacterias', lvl:4, est:'No evaluado', d:'Descomponen la hojarasca del mangle en el fango sin oxígeno. Sin ellas, las hojas no se convertirían en alimento para cangrejos y conchas.', come:['mangle-rojo','mangle-negro','lisa','cocodrilo']}
  ],
  pop:{ P:'mangle-rojo', H:'cangrejo-rojo', M:'garceta', T:'cocodrilo' },
  perts:['caza-tope','deforestacion','sequia','invasora','sobrepesca'],
  invasora:{ n:'Tilapia (Oreochromis sp.) escapada de piscinas', d:'Compite con los peces nativos jóvenes y remueve el fondo, enturbiando el agua.' },
  ciclo:{ dep:'el fango del manglar', extra:'El fango del manglar guarda carbono durante siglos porque casi no tiene oxígeno. Al talarlo para camaroneras, ese carbono se libera.' }
},
amazonia:{ id:'amazonia', n:'Amazonía', ar:'la', em:'🌳', sub:'Yasuní · Cuyabeno · bosque húmedo tropical',
  d:'El ecosistema más diverso del país. Casi todos los nutrientes están en los seres vivos, no en el suelo: la descomposición es tan rápida que el bosque se recicla a sí mismo.',
  base:44000, baseNota:'valor aproximado de producción primaria neta del bosque húmedo tropical, del orden de 44.000 kJ por metro cuadrado y año',
  sp:[
   {id:'ceiba', n:'Ceibo o kapok', sci:'Ceiba pentandra', art:'ceiba', lvl:0, est:'Preocupación menor', d:'Árbol emergente que sobresale del dosel. Sus flores y frutos alimentan a murciélagos, aves y monos; su copa sostiene nidos de harpía.', come:[]},
   {id:'chonta', n:'Palma de chonta', sci:'Bactris gasipaes', art:'chonta', lvl:0, est:'Preocupación menor · cultivada por los pueblos amazónicos', d:'Palma espinosa de frutos muy nutritivos. Es alimento clave de guantas, monos y también de las familias amazónicas.', come:[]},
   {id:'sotobosque', n:'Hierbas del sotobosque', sci:'Heliconia, Calathea y plántulas', art:'sotobosque', lvl:0, est:'No evaluado', d:'Plantas de sombra que crecen bajo el dosel. Aprovechan la poca luz que llega al suelo (menos del 2 %, aproximadamente).', come:[]},
   {id:'hormiga', n:'Hormiga arriera', sci:'Atta cephalotes', art:'hormiga', lvl:1, est:'No evaluado · muy abundante', d:'Corta hojas y las lleva al nido para cultivar un hongo del que se alimenta. Es el mayor herbívoro del bosque… y pesa menos de un gramo.', come:['ceiba','sotobosque']},
   {id:'mono', n:'Mono chorongo', sci:'Lagothrix lagothricha', art:'mono', lvl:1, est:'Vulnerable · muy afectado por la cacería', d:'Frugívoro del dosel. Dispersa semillas grandes por todo el bosque: si desaparece, muchos árboles dejan de regenerarse.', come:['ceiba','chonta']},
   {id:'guanta', n:'Guanta', sci:'Cuniculus paca', art:'guanta', lvl:1, est:'Preocupación menor · muy cazada para consumo', d:'Roedor nocturno que come frutos caídos y semillas. Presa habitual del jaguar y de la boa.', come:['chonta','sotobosque']},
   {id:'danta', n:'Danta o tapir amazónico', sci:'Tapirus terrestris', art:'danta', lvl:1, est:'Vulnerable', d:'El mamífero terrestre más grande del Ecuador. Come hojas y frutos y dispersa semillas enormes: es el "jardinero" del bosque.', come:['sotobosque','chonta']},
   {id:'guacamayo', n:'Guacamayo escarlata', sci:'Ara macao', art:'guacamayo', lvl:1, est:'Preocupación menor a escala global · local afectado por el tráfico de fauna', d:'Come frutos y semillas duras con su pico potente. Visita saladeros de arcilla para neutralizar toxinas.', come:['ceiba','chonta']},
   {id:'rana', n:'Rana punta de flecha', sci:'Ameerega bilinguis', art:'rana', lvl:2, est:'Preocupación menor · endémica del noroccidente amazónico', d:'Diminuta y diurna. Come hormigas y ácaros, y de ellos obtiene los alcaloides de su piel tóxica: sus colores avisan del peligro.', come:['hormiga']},
   {id:'tucan', n:'Tucán goliblanco', sci:'Ramphastos tucanus', art:'tucan', lvl:2, est:'Preocupación menor', d:'Come sobre todo frutos, pero también huevos, insectos y ranas pequeñas: es omnívoro, y por eso ocupa dos niveles a la vez.', come:['ceiba','rana']},
   {id:'boa', n:'Boa', sci:'Boa constrictor', art:'boa', lvl:2, est:'Preocupación menor', d:'Constrictora que caza al acecho roedores y aves. No es venenosa: mata por constricción.', come:['guanta','guacamayo','rana']},
   {id:'jaguar', n:'Jaguar', sci:'Panthera onca', art:'jaguar', lvl:3, est:'Casi amenazado a escala global · en peligro en el Ecuador', d:'Superdepredador. Mantiene a raya a los herbívoros grandes; necesita territorios de decenas de kilómetros cuadrados y bosque continuo.', come:['danta','guanta','boa','mono']},
   {id:'harpia', n:'Águila harpía', sci:'Harpia harpyja', art:'harpia', lvl:3, est:'Vulnerable · rara en el Ecuador', d:'Caza en el dosel: monos y perezosos. Anida en árboles emergentes como el ceibo, así que depende de que queden gigantes en pie.', come:['mono','tucan']},
   {id:'descomp', n:'Hongos y termitas', sci:'Comunidad descomponedora del suelo', art:'descomp', lvl:4, est:'No evaluado', d:'En el calor y la humedad amazónica descomponen una hoja en pocas semanas. Devuelven los nutrientes tan rápido que las raíces los recapturan casi al instante.', come:['ceiba','sotobosque','danta','jaguar']}
  ],
  pop:{ P:'chonta', H:'guanta', M:'boa', T:'jaguar' },
  perts:['caza-tope','deforestacion','sequia','invasora'],
  invasora:{ n:'Pastos africanos y especies exóticas en los claros', d:'Tras la deforestación, los pastos exóticos ocupan los claros e impiden que el bosque se regenere.' },
  ciclo:{ dep:'la biomasa de los árboles', extra:'En la Amazonía el carbono está sobre todo en los troncos y hojas, no en el suelo: al talar, se libera casi todo.' }
}
};

/* Perturbaciones: nombre, descripción y efecto sobre los parámetros del modelo */
const ECR_PERT = {
  'caza-tope':{ n:'Caza del depredador tope', em:'🎯', d:(S)=>`Se caza sistemáticamente ${ecrAl(ECR_sp(S,S.pop.T))} por conflicto con el ganado o por su piel.`,
    ap:(p)=>{ p.T0 = 0.12; p.mT += 0.30; } },
  'deforestacion':{ n:'Deforestación', em:'🪓', d:(S)=> S.id==='manglar' ? 'Se tala el manglar para construir piscinas camaroneras.' : 'Se tumba el bosque para pastizales y cultivos.',
    ap:(p)=>{ p.K *= 0.42; p.P0 = 0.45; } },
  'quema':{ n:'Quema del páramo', em:'🔥', d:()=>'Se quema el pajonal para que rebrote tierno para el ganado. El fuego destruye también la materia orgánica del suelo.',
    ap:(p)=>{ p.K *= 0.5; p.P0 = 0.25; p.rP *= 0.7; } },
  'sequia':{ n:'Sequía prolongada (El Niño / La Niña)', em:'☀️', d:(S)=> S.id==='manglar' ? 'Un evento de El Niño calienta el agua y cambia la salinidad del estuario durante varios años.' : 'Una sequía prolongada asociada a El Niño reduce la humedad durante varios años.',
    ap:(p)=>{ p.rP *= 0.4; p.K *= 0.55; p.temporal = 8; } },
  'invasora':{ n:'Especie invasora', em:'🐟', d:(S)=> S.invasora.n+': '+S.invasora.d, ap:(p)=>{ p.K *= 0.70; p.a1 *= 1.15; p.b1 *= 1.15; } },
  'sobrepesca':{ n:'Sobrepesca / extracción excesiva', em:'🎣', d:(S)=>`Se extrae ${ecrArt(ECR_sp(S,S.pop.H))} sin respetar vedas ni tallas mínimas.`, ap:(p)=>{ p.mH += 0.14; } }
};

/* Medidas de conservación (efecto a 10 años sobre los parámetros) */
const ECR_MED = {
  'area':{ n:'Área protegida', em:'🛡️', d:'Se declara reserva y se controla el acceso. Frena la pérdida de hábitat, pero necesita guardaparques y presupuesto sostenido.',
    ap:(p)=>{ p.K *= 1.55; p.mT = Math.max(0.10, p.mT-0.30); }, fb:'La protección legal detiene la pérdida de hábitat y la cacería: la vegetación recupera capacidad de carga y el depredador tope regresa poco a poco. Pero un área protegida sin control real en el terreno ("parque de papel") cambia muy poco.' },
  'corredor':{ n:'Corredor biológico', em:'🌿', d:'Se conectan dos fragmentos de hábitat con una franja continua de vegetación.',
    ap:(p)=>{ p.K *= 1.25; p.mT = Math.max(0.10, p.mT-0.22); p.inmT = 0.35; }, fb:'El corredor permite que los individuos se muevan entre fragmentos: los depredadores tope, que necesitan territorios enormes, son los más beneficiados. También reduce la endogamia. Su debilidad: si el corredor se corta en un punto, deja de funcionar.' },
  'restauracion':{ n:'Restauración del hábitat', em:'🌱', d:'Se siembran especies nativas y se retiran las invasoras para recuperar la vegetación.',
    ap:(p)=>{ p.K *= 1.8; p.rP *= 1.5; }, fb:'La restauración actúa en la base de la red: más productores significa más energía para todos los niveles. Es lo más eficaz a largo plazo, pero es lenta y costosa; un frailejón o un mangle adulto tarda décadas.' },
  'pesca':{ n:'Pesca o caza regulada (vedas y tallas)', em:'📏', d:'Se fija una veda y una talla mínima de captura, con control comunitario.',
    ap:(p)=>{ p.mH = Math.max(0.07, p.mH-0.30); }, fb:'Regular la extracción permite que los individuos se reproduzcan antes de ser capturados: la población objetivo se recupera y, con ella, sus depredadores. Funciona solo si la comunidad participa en el control, porque vigilar cada estero es imposible desde una oficina.' },
  'educacion':{ n:'Educación comunitaria', em:'🧑‍🏫', d:'Se trabaja con las escuelas y las asociaciones de pescadores o ganaderos para cambiar prácticas.',
    ap:(p)=>{ p.mT = Math.max(0.10, p.mT-0.16); p.mH = Math.max(0.07, p.mH-0.10); p.K *= 1.12; p.lento = true; }, fb:'La educación es la medida más lenta en la gráfica y la más duradera en la realidad: ninguna de las otras se sostiene si la gente que vive del ecosistema no participa. Fíjate en que a los 10 años aún está subiendo.' }
};

function ECR_sp(S, id){ return S.sp.find(x=>x.id===id) || {n:id, sci:'', lvl:0}; }
function ECR_pred(S, id){ return S.sp.filter(x => (x.come||[]).includes(id)); }
function ECR_num(v, dec){ const s = (dec!=null ? Number(v).toFixed(dec) : String(Math.round(v))); return s.replace('.', ','); }
function ECR_dec(v){ return v.toFixed(3).replace(/0+$/,'').replace(/\.$/,'').replace('.',','); }
function ECR_kj(v){ return v>=10 ? ECR_mil(v) : ECR_dec(v); }
function ECR_mil(v){ return Math.round(v).toLocaleString('es-EC').replace(/,/g,'.'); }

/* Género gramatical de cada especie, para que los textos se lean bien
   ("la paja de páramo", "del venado", "los hongos del suelo"). */
const ECR_GEN = { pajonal:'la', achupalla:'la', colibri:'la', hongos:'los', lombriz:'la',
  'concha-prieta':'la', lisa:'la', garceta:'la', fragata:'la', bacterias:'las',
  chonta:'la', sotobosque:'las', hormiga:'la', guanta:'la', danta:'la', rana:'la', boa:'la', descomp:'los' };
Object.values(ECR_SYS).forEach(S => S.sp.forEach(sp => { sp.ar = ECR_GEN[sp.id] || 'el'; }));
function ecrArt(sp, may){ const t = (sp.ar||'el')+' '+sp.n.toLowerCase(); return may ? t.charAt(0).toUpperCase()+t.slice(1) : t; }
function ecrDel(sp){ const a = sp.ar||'el'; return (a==='el'?'del':a==='la'?'de la':a==='los'?'de los':'de las')+' '+sp.n.toLowerCase(); }
function ecrSysDe(S){ return (S.ar==='la'?'de la ':'del ')+S.n.toLowerCase(); }
function ecrSysEn(S){ return (S.ar==='la'?'en la ':'en el ')+S.n.toLowerCase(); }
function ecrAl(sp){ const a = sp.ar||'el'; return (a==='el'?'al':a==='la'?'a la':a==='los'?'a los':'a las')+' '+sp.n.toLowerCase(); }

/* Flechas que el estudiante debe reconstruir en el modo "construye la red" */
ECR_SYS.paramo.retos   = [['pajonal','conejo'],['pajonal','venado'],['conejo','zorro'],['venado','puma'],['venado','condor'],['venado','hongos']];
ECR_SYS.manglar.retos  = [['mangle-rojo','cangrejo-rojo'],['fitoplancton','concha-prieta'],['cangrejo-rojo','mapache'],['camaron','garceta'],['lisa','cocodrilo'],['mangle-rojo','bacterias']];
ECR_SYS.amazonia.retos = [['chonta','guanta'],['ceiba','mono'],['hormiga','rana'],['guanta','jaguar'],['mono','harpia'],['danta','descomp']];

/* ---------------------------------------------------------------------
   Dibujo de la red trófica (SVG generado aquí, sin librerías)
   --------------------------------------------------------------------- */
function ecrLayout(S){
  const W=960, byLvl={}; S.sp.forEach(s => (byLvl[s.lvl] = byLvl[s.lvl]||[]).push(s));
  const yOf = {3:78, 2:214, 1:350, 0:486, 4:604};
  const pos = {};
  Object.keys(byLvl).forEach(l => { const arr = byLvl[l], n = arr.length;
    arr.forEach((s,i) => { pos[s.id] = { x: Math.round(196 + (W-196-84) * (n===1 ? 0.5 : i/(n-1))), y: yOf[l] }; }); });
  return { pos, W, H:670 };
}
const ECR_LVC = ['var(--ecr-n1)','var(--ecr-n2)','var(--ecr-n3)','var(--ecr-n4)','var(--ecr-d)'];
function ecrShape(lvl, x, y, r){
  if (lvl===0) return `<polygon class="nshape" points="${x},${y-r*1.08} ${x+r*1.08},${y} ${x},${y+r*1.08} ${x-r*1.08},${y}"`;
  if (lvl===1) return `<circle class="nshape" cx="${x}" cy="${y}" r="${r}"`;
  if (lvl===2) return `<rect class="nshape" x="${x-r*0.92}" y="${y-r*0.92}" width="${r*1.84}" height="${r*1.84}" rx="9"`;
  if (lvl===3) return `<path class="nshape" d="M${x} ${y-r*1.25} Q${x+2} ${y-r*1.25+2} ${x+r*1.2} ${y+r*0.8} Q${x+r*1.2} ${y+r*0.92} ${x+r*1.06} ${y+r*0.92} L${x-r*1.06} ${y+r*0.92} Q${x-r*1.2} ${y+r*0.92} ${x-r*1.2} ${y+r*0.8} Q${x-2} ${y-r*1.25+2} ${x} ${y-r*1.25}Z"`;
  const pts = []; for (let k=0;k<6;k++){ const a = Math.PI/6 + k*Math.PI/3; pts.push(`${(x+r*1.02*Math.cos(a)).toFixed(1)},${(y+r*1.02*Math.sin(a)).toFixed(1)}`); }
  return `<polygon class="nshape" points="${pts.join(' ')}"`;
}
function ecrArrow(p1, p2, r, color, w, op){
  const dx = p2.x-p1.x, dy = p2.y-p1.y, L = Math.hypot(dx,dy) || 1, ux = dx/L, uy = dy/L;
  const x1 = p1.x + ux*(r+4), y1 = p1.y + uy*(r+4), x2 = p2.x - ux*(r+12), y2 = p2.y - uy*(r+12);
  const hx = p2.x - ux*(r+2), hy = p2.y - uy*(r+2), px = -uy, py = ux, hw = 6.4*(w/2.2);
  return `<g opacity="${op}"><line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`
    + `<polygon fill="${color}" points="${hx.toFixed(1)},${hy.toFixed(1)} ${(x2+px*hw).toFixed(1)},${(y2+py*hw).toFixed(1)} ${(x2-px*hw).toFixed(1)},${(y2-py*hw).toFixed(1)}"/></g>`;
}
/* flecha curva (Bézier cuadrática) que sale del borde de la presa y entra con punta en el depredador */
function ecrCurva(p1, p2, r, k){
  const dx = p2.x-p1.x, dy = p2.y-p1.y, L = Math.hypot(dx,dy) || 1, nx = -dy/L, ny = dx/L;
  const cx = (p1.x+p2.x)/2 + nx*k*Math.min(L, 520)*0.17, cy = (p1.y+p2.y)/2 + ny*k*Math.min(L, 520)*0.17;
  const a1x = cx-p1.x, a1y = cy-p1.y, l1 = Math.hypot(a1x,a1y) || 1, a2x = cx-p2.x, a2y = cy-p2.y, l2 = Math.hypot(a2x,a2y) || 1;
  const sx = p1.x + a1x/l1*(r+4), sy = p1.y + a1y/l1*(r+4);
  const tx = p2.x + a2x/l2*(r+3), ty = p2.y + a2y/l2*(r+3), ex = p2.x + a2x/l2*(r+13), ey = p2.y + a2y/l2*(r+13);
  const f = n => n.toFixed(1);
  return { d:`M${f(sx)} ${f(sy)} Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`, tip:[tx,ty], base:[ex,ey], ux:-a2x/l2, uy:-a2y/l2,
    mid:[0.25*sx + 0.5*cx + 0.25*ex, 0.25*sy + 0.5*cy + 0.25*ey] };
}
function ecrPunta(c, color, w){
  const hw = 4.2 + w*1.2, px = -c.uy, py = c.ux, [bx, by] = c.base, [tx, ty] = c.tip;
  return `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)} L${(bx+px*hw).toFixed(1)} ${(by+py*hw).toFixed(1)} Q${(bx+c.ux*3).toFixed(1)} ${(by+c.uy*3).toFixed(1)} ${(bx-px*hw).toFixed(1)} ${(by-py*hw).toFixed(1)} Z" fill="${color}"/>`;
}
/* edges: [{a:presa, b:depredador, nota}] · sel: id resaltado · si edges es null se usan todas las reales */
function ecrWebSVG(S, edges, sel){
  const L = ecrLayout(S), r = 29, mov = (typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion);
  const E = edges || S.sp.flatMap(p => (p.come||[]).map(a => ({ a, b:p.id, nota:(p.nota||{})[a] })));
  const lvlOf = id => (S.sp.find(x => x.id === id) || {}).lvl || 0;
  let g = '', defs = '';
  const lvlY = {3:78, 2:214, 1:350, 0:486, 4:604};
  /* franjas de nivel con un degradado suave del color de cada nivel */
  [[3,'N4 · superdepredadores'],[2,'N3 · consumidores secundarios'],[1,'N2 · consumidores primarios'],[0,'N1 · productores'],[4,'D · descomponedores']].forEach(([l,txt]) => {
    if (!S.sp.some(s=>s.lvl===+l)) return;
    const c = ECR_LVC[l];
    defs += `<linearGradient id="ecrB${l}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c}" stop-opacity=".16"/><stop offset=".55" stop-color="${c}" stop-opacity=".06"/><stop offset="1" stop-color="${c}" stop-opacity=".12"/></linearGradient>`;
    g += `<rect x="10" y="${lvlY[l]-(l===4?50:58)}" width="940" height="${l===4?104:120}" rx="16" fill="url(#ecrB${l})"/>`
      + `<text x="26" y="${lvlY[l]-6}" font-size="20" font-weight="800" fill="${c}">${txt.split(' · ')[0]}</text>`
      + `<text x="26" y="${lvlY[l]+12}" font-size="11" font-weight="600" fill="${c}">${txt.split(' · ')[1]}</text>`;
  });
  defs += `<filter id="ecrSom" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#0E1F33" flood-opacity=".22"/></filter>`;
  [0,1,2,3,4].forEach(l => { const c = ECR_LVC[l];
    defs += `<radialGradient id="ecrN${l}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="var(--bg-2)"/><stop offset="1" stop-color="${c}" stop-opacity=".28"/></radialGradient>`; });
  /* flechas: color del nivel de la presa (de ahí viene la energía), curvas para no taparse */
  let flujo = '';
  E.forEach((e, i) => {
    const p1 = L.pos[e.a], p2 = L.pos[e.b]; if (!p1||!p2) return;
    const hi = sel && (e.a===sel || e.b===sel), dim = sel && !hi;
    const k = ((e.a.length + e.b.length*3 + i) % 2 ? 1 : -1) * (Math.abs(p2.x - p1.x) < 40 ? 0.35 : 0.8);
    const c = ecrCurva(p1, p2, r, k), col = ECR_LVC[lvlOf(e.a)], w = hi ? 3.4 : 2;
    g += `<g opacity="${dim ? 0.1 : hi ? 1 : 0.62}"><path d="${c.d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>${ecrPunta(c, col, w)}</g>`;
    if (hi){
      flujo += `<path class="${mov ? 'ecr-flujo' : ''}" d="${c.d}" fill="none" stroke="var(--ecr-hl)" stroke-width="1.8" stroke-linecap="round" opacity=".9"/>`;
      if (mov) [0, 0.9].forEach(dl => { flujo += `<circle r="4.2" fill="${col}" stroke="var(--ecr-hl)" stroke-width="1.4"><animateMotion dur="1.8s" begin="${dl}s" repeatCount="indefinite" path="${c.d}"/></circle>`; });
    }
    if (e.nota && !dim){ g += `<text x="${c.mid[0].toFixed(1)}" y="${(c.mid[1]+3).toFixed(1)}" font-size="10.5" font-weight="600" text-anchor="middle" fill="${hi?col:'var(--ink-3)'}" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="4">${e.nota}</text>`; }
  });
  g += flujo;
  S.sp.forEach(s => {
    const p = L.pos[s.id], on = sel===s.id, R = ECR_ROL[s.lvl], c = ECR_LVC[s.lvl];
    const rel = sel && !on && !E.some(e => (e.a===sel&&e.b===s.id)||(e.b===sel&&e.a===s.id));
    g += `<g class="ecr-node" tabindex="0" role="button" data-sp="${s.id}" opacity="${rel?0.3:1}" aria-label="${esc(s.n)}, ${R.n}. Abrir ficha">`
      + (on ? `<circle class="${mov ? 'ecr-pulso' : ''}" cx="${p.x}" cy="${p.y}" r="${r+9}" fill="none" stroke="${c}" stroke-width="3" opacity=".7"/>` : '')
      + `<g filter="url(#ecrSom)">` + ecrShape(s.lvl, p.x, p.y, r) + ` fill="url(#ecrN${s.lvl})" stroke="${c}" stroke-width="${on?3.6:2.2}"/></g>`
      + `<svg x="${p.x-21}" y="${p.y-21}" width="42" height="42" viewBox="0 0 100 100" fill="${c}" style="color:${c}">${ECR_ART[s.art]||''}</svg>`
      + `<text x="${p.x}" y="${p.y+r+17}" font-size="11.5" font-weight="600" text-anchor="middle" fill="var(--ink)" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="4">${esc(s.n)}</text>`
      + `<g><rect x="${p.x-13}" y="${p.y-r-(s.lvl===3?25:21)}" width="26" height="14" rx="7" fill="${c}"/><text x="${p.x}" y="${p.y-r-(s.lvl===3?15:11)}" font-size="9.5" font-weight="700" font-family="IBM Plex Mono, monospace" text-anchor="middle" fill="var(--bg-2)">${R.ab}</text></g>`
      + `</g>`;
  });
  return `<svg class="ecr-web" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-label="Red trófica ${esc(ecrSysDe(S))}: las flechas van del ser vivo que es comido hacia el que lo come.${sel ? ' Resaltada: ' + esc(ECR_sp(S, sel).n) + ' y la energía que recibe y entrega.' : ''}"><defs>${defs}</defs>${g}</svg>`;
}

/* Pirámide de energía ilustrada: barras a escala (con ancho mínimo legible),
   la especie de ejemplo de cada nivel y el calor que se pierde en cada escalón */
function ecrPiramideSVG(S, vals, nombres, ej){
  const W = 440, fila = 74, top = 10, H = top + 5*fila + 44, cx = 205, maxW = 350, mov = (typeof motionOK === 'function' ? motionOK() : true) && !(Store.s.a11y && Store.s.a11y.motion);
  const arte = [S.pop.P, S.pop.H, S.pop.M, S.pop.T].map(id => ECR_sp(S, id).art);
  let g = `<defs><radialGradient id="ecrSol" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#FFE9A3"/><stop offset=".6" stop-color="#F5B82E"/><stop offset="1" stop-color="#E08A1E"/></radialGradient>`;
  [0,1,2,3,4].forEach(k => { const c = ECR_LVC[Math.min(k,3)];
    g += `<linearGradient id="ecrP${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity="${k===4?.14:.3}"/><stop offset="1" stop-color="${c}" stop-opacity="${k===4?.06:.6}"/></linearGradient>`; });
  g += `</defs>`;
  for (let k=0; k<5; k++){
    const v = vals[k], frac = v/S.base, w = Math.max(0.09, frac)*maxW, y = top + (4-k)*fila, x = cx - w/2, falta = v < 1;
    const c = ECR_LVC[Math.min(k,3)], by = y + 22, bh = 42;
    const nom = nombres[k].replace(/ \(.*/,''), ab = (nombres[k].match(/\((.*)\)/) || [,''])[1];
    g += `<g opacity="${falta ? 0.6 : 1}">`;
    g += `<text x="14" y="${y+15}" font-size="13" font-weight="700" fill="var(--ink)"><tspan fill="${c}">${esc(ab)}</tspan> · ${esc(nom)}</text>`;
    g += `<text x="${W-14}" y="${y+15}" font-size="12" font-family="IBM Plex Mono, monospace" text-anchor="end" fill="var(--ink-2)">${ECR_kj(v)} kJ/m²·año</text>`;
    g += `<path d="M${(x+2).toFixed(1)} ${by+bh} L${(x+w-2).toFixed(1)} ${by+bh} L${(x+w-Math.min(8,w*0.12)).toFixed(1)} ${by} L${(x+Math.min(8,w*0.12)).toFixed(1)} ${by} Z" fill="url(#ecrP${k})" stroke="${c}" stroke-width="2" ${falta ? 'stroke-dasharray="6 5"' : ''} stroke-linejoin="round"/>`;
    const conIcono = k < 4 && !falta, dentro = w > 190;
    if (conIcono) g += `<svg x="${(dentro ? x + 14 : cx - 17).toFixed(1)}" y="${by+4}" width="34" height="34" viewBox="0 0 100 100" fill="${c}" style="color:${c}">${ECR_ART[arte[k]]||''}</svg>`;
    const et = falta ? 'energía insuficiente' : ej[k];
    g += `<text x="${(dentro ? x + 56 : x + w + 10).toFixed(1)}" y="${by+26}" font-size="12" font-weight="600" fill="var(--ink-2)">${esc(et)}</text>`;
    if (!falta){ const hx = W - 34, hy = by + 4;
      g += `<g class="${mov ? 'ecr-calor' : ''}" style="animation-delay:${(k*0.35).toFixed(2)}s"><path d="M${hx} ${hy+32} c5 -5 -5 -9 0 -14 s-5 -9 0 -14 M${hx+10} ${hy+36} c5 -5 -5 -9 0 -14 s-5 -9 0 -14 M${hx+20} ${hy+32} c5 -5 -5 -9 0 -14 s-5 -9 0 -14" fill="none" stroke="#E0663A" stroke-width="2.2" stroke-linecap="round" opacity=".8"/></g>`; }
    g += `</g>`;
  }
  const fy = top + 5*fila + 8;
  g += `<g><circle cx="26" cy="${fy+14}" r="11" fill="url(#ecrSol)"/>` + [0,45,90,135,180,225,270,315].map(a => { const t = a*Math.PI/180; return `<line x1="${(26+14*Math.cos(t)).toFixed(1)}" y1="${(fy+14+14*Math.sin(t)).toFixed(1)}" x2="${(26+18*Math.cos(t)).toFixed(1)}" y2="${(fy+14+18*Math.sin(t)).toFixed(1)}" stroke="#E6A21E" stroke-width="2" stroke-linecap="round"/>`; }).join('')
    + `<text x="50" y="${fy+18}" font-size="12" font-weight="600" fill="var(--ink-2)">la luz entra por los productores</text>`
    + `<path d="M${W-54} ${fy+22} c4 -4 -4 -7 0 -11 s-4 -7 0 -11" fill="none" stroke="#E0663A" stroke-width="2.2" stroke-linecap="round"/><text x="${W-14}" y="${fy+18}" font-size="12" font-weight="600" text-anchor="end" fill="#C4581E">calor</text></g>`;
  const resumen = vals.map((v,k) => `${nombres[k]}: ${ECR_kj(v)} kJ`).join('; ');
  return `<svg class="ecr-pir" viewBox="0 0 ${W} ${H}" role="img" aria-label="Pirámide de energía ${esc(ecrSysDe(S))}. ${esc(resumen)}. En cada nivel se pierde energía como calor.">${g}</svg>`;
}

/* =====================================================================
   VISTA
   ===================================================================== */
route('/cn/eco/red-trofica', (view) => {
  view.classList.add('wide');
  const SEC = [
    {id:'especies', n:'1 · Quién es quién'},
    {id:'red', n:'2 · La red trófica'},
    {id:'construye', n:'3 · Construye la red'},
    {id:'energia', n:'4 · Pirámide de energía'},
    {id:'perturba', n:'5 · ¿Qué pasa si…?'},
    {id:'materia', n:'6 · Fluye o circula'},
    {id:'conserva', n:'7 · Decisión de conservación'},
    {id:'reto', n:'8 · Reto final'}
  ];
  const St = { sys:'paramo', sec:0, sel:null, built:[], errs:0, hints:0, eff:10,
               pred:{}, predRun:false, pertId:null, sim:null, med:null, medRun:null,
               marks:{ red:false, pred:false, pir:false, ciclo:false, conserva:false, reto:false }, start:Date.now() };
  const done0 = !!Store.s.activities['cn-eco-red']?.done;

  view.append(h('div',{class:'page-head',style:'margin-bottom:12px'},
    h('div',{}, h('span',{class:'eyebrow eco'},'Ciencias Naturales · Ciencias de la Vida y de la Tierra · 8.º U2 y 9.º U3'),
      h('h1',{},'Ecosistemas del Ecuador: quién come a quién y a dónde va la energía'),
      h('p',{},'Explora tres ecosistemas reales del país, arma su red trófica, sigue la energía nivel por nivel y comprueba qué ocurre cuando alteramos una sola pieza.')),
    h('span',{class:'pill eco'},'+140 XP · 30–40 min')));
  const retoSt = h('div',{class:'notice'}, done0 ? 'Reto resuelto ✓ · puedes volver a explorar los tres ecosistemas.' : 'Pendiente: llega a la sección 8 con la red construida y tu predicción comprobada.');
  if (done0) retoSt.className = 'notice ok';
  view.append(purposeBanner({
    proposito:'Comprender que en un ecosistema la energía fluye en un solo sentido y se va perdiendo, mientras la materia circula, y que al alterar una especie se afecta a todas las demás.',
    observa:['El sentido de las flechas: van del ser vivo comido hacia el que lo come','Cuánta energía queda al pasar de un nivel al siguiente (aproximadamente el 10 %)','Qué poblaciones suben y cuáles bajan cuando se elimina el depredador tope'],
    reto:'Predice qué le ocurre a tres poblaciones ante una perturbación real, comprueba tu predicción con la simulación y justifica una medida de conservación.',
    statusEl: retoSt }));

  const sysBar = h('div',{class:'ecr-sys'});
  const nav = h('nav',{class:'ecr-nav','aria-label':'Secciones del recurso'});
  const body = h('div',{class:'stack'});
  view.append(sysBar, nav, body);

  function S(){ return ECR_SYS[St.sys]; }
  function renderSys(){
    sysBar.innerHTML='';
    Object.values(ECR_SYS).forEach(x => sysBar.append(h('button',{'aria-pressed': String(x.id===St.sys), onclick:()=>{ if (x.id===St.sys) return; St.sys=x.id; St.sel=null; St.built=[]; St.errs=0; St.fb=null; St.clas={}; St.clasFb=null; St.pred={}; St.predRun=false; St.pertId=null; St.sim=null; St.med=null; St.medRun=null; St.marks.red=false; St.marks.pred=false; renderSys(); render(); Store.log('ecosistema',{recurso:'cn-eco-red', ecosistema:x.id}); }},
      h('span',{class:'em','aria-hidden':'true'},x.em), h('span',{}, x.n, h('small',{},x.sub)))));
  }
  function renderNav(){
    nav.innerHTML='';
    SEC.forEach((s,i) => nav.append(h('button',{'aria-current': String(i===St.sec), onclick:()=>{ St.sec=i; render(); }}, s.n)));
  }
  function secNav(){
    return h('div',{class:'row',style:'justify-content:space-between;margin-top:6px'},
      h('button',{class:'btn sm', disabled: St.sec===0 || null, onclick:()=>{ St.sec=Math.max(0,St.sec-1); render(); }},'← Anterior'),
      h('button',{class:'btn sm primary', disabled: St.sec===SEC.length-1 || null, onclick:()=>{ St.sec=Math.min(SEC.length-1,St.sec+1); render(); }},'Siguiente →'));
  }
  function fichaEl(sp){
    const s = S(), pred = ECR_pred(s, sp.id), R = ECR_ROL[sp.lvl];
    const comeTxt = (sp.come||[]).length ? (sp.come||[]).map(id => ECR_sp(s,id).n + ((sp.nota||{})[id] ? ' ('+sp.nota[id]+')' : '')).join(', ') : 'Nada: fabrica su propio alimento con la fotosíntesis (agua, CO₂ y luz del sol).';
    const pc = pred.filter(p => p.lvl !== 4), pd = pred.filter(p => p.lvl === 4);
    const lista = pc.map(p => p.n + ((p.nota||{})[sp.id] ? ' ('+p.nota[sp.id]+')' : '')).join(', ');
    const cola = pd.length ? (sp.lvl===0 ? ' Su hojarasca y sus restos los aprovechan: ' : ' Al morir, sus restos pasan a los descomponedores: ') + pd.map(p=>p.n.toLowerCase()).join(', ') + '.' : '';
    const predTxt = (pc.length ? lista + '.' : (sp.lvl===4 ? 'Nada en esta red se alimenta de ellos.' : 'Ningún depredador de esta red lo caza: está en la cima.')) + cola;
    return h('div',{class:'card stack'},
      h('div',{class:'ecr-ficha'},
        h('div',{class:'ecr-med', style:'--ecr-lv:'+ECR_LVC[sp.lvl], html:ecrSil(sp.art)}),
        h('div',{},
          h('div',{class:'row',style:'gap:6px;align-items:baseline'}, h('h3',{style:'margin:0'},sp.n), h('i',{class:'small muted'},sp.sci)),
          h('div',{class:'row',style:'gap:6px;margin:6px 0'}, h('span',{class:'ecr-tag lv', style:'--ecr-lv:'+ECR_LVC[sp.lvl]},R.ab+' · '+R.n), h('span',{class:'ecr-tag'},'forma: '+R.forma)),
          h('p',{style:'font-size:.9rem;margin:4px 0'},sp.d),
          h('dl',{class:'ecr-kv'},
            h('dt',{},'Rol trófico'), h('dd',{},R.d),
            h('dt',{},'Qué come'), h('dd',{},comeTxt),
            h('dt',{},'Quién lo come'), h('dd',{},predTxt),
            h('dt',{},'Estado de conservación'), h('dd',{},sp.est)))),
      Store.s.a11y.tts ? h('div',{class:'row'}, TTS.btn(`${sp.n}, ${sp.sci}. ${R.n}. ${sp.d} Se alimenta de: ${comeTxt}. Lo comen: ${predTxt}.`,'Escuchar la ficha')) : null);
  }

  /* ---------- 1 · Quién es quién ---------- */
  function secEspecies(){
    const s = S();
    const fichaBox = h('div',{});
    const grid = h('div',{class:'ecr-grid'});
    s.sp.forEach(sp => grid.append(h('button',{class:'ecr-card', style:'--ecr-lv:'+ECR_LVC[sp.lvl], 'aria-pressed':String(St.sel===sp.id), onclick:()=>{ St.sel=sp.id; Store.markSeen('eco-'+s.id, sp.id); Store.log('especie',{ecosistema:s.id, especie:sp.id}); render(); }},
      h('span',{class:'ecr-med', html:ecrSil(sp.art)}), h('b',{},sp.n), h('i',{},sp.sci), h('span',{class:'ecr-tag'},ECR_ROL[sp.lvl].ab))));
    if (St.sel) fichaBox.append(fichaEl(ECR_sp(s,St.sel)));
    else fichaBox.append(h('div',{class:'notice info'},'Elige una especie para leer su ficha: qué come, quién la come y en qué estado de conservación se encuentra.'));
    const vistas = (Store.s.seen['eco-'+s.id]||[]).length;
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},s.em+' '+s.n), h('p',{style:'font-size:.92rem'},s.d),
        h('p',{class:'small muted'},'Las especies están agrupadas por nivel trófico. Fíjate en la etiqueta N1, N2, N3, N4 o D: no depende del color, sino de la forma y del rótulo.')),
      h('div',{class:'row small muted'}, h('span',{},`Fichas abiertas: ${vistas} de ${s.sp.length}`)),
      grid, fichaBox, secNav());
  }

  /* ---------- 2 · La red trófica ---------- */
  function secRed(){
    const s = S();
    const wrap = h('div',{class:'card stack'});
    const svgBox = h('div',{class:'ecr-webw', html: ecrWebSVG(s, null, St.sel)});
    const sel = h('select',{'aria-label':'Elegir especie para resaltar sus conexiones', onchange:()=>{ St.sel = sel.value || null; render(); }});
    sel.append(h('option',{value:''},'— Resaltar una especie —'));
    s.sp.forEach(sp => sel.append(h('option',{value:sp.id, selected: St.sel===sp.id || null}, sp.n)));
    wrap.append(h('span',{class:'eyebrow eco'},'Red trófica '+ecrSysDe(s)),
      h('div',{class:'notice info'}, h('span',{}, h('b',{},'Lee bien las flechas. '),`Cada flecha sale del ser vivo que es comido y apunta al que lo come, porque señala hacia dónde va la materia y la energía. Dibujar "${ECR_sp(s,s.pop.T).n} → ${ECR_sp(s,s.pop.H).n}" sería afirmar que ${ecrArt(ECR_sp(s,s.pop.H))} se come ${ecrAl(ECR_sp(s,s.pop.T))}.`)),
      h('div',{class:'row'}, sel, h('button',{class:'btn sm', onclick:()=>{ St.sel=null; render(); }},'Quitar resaltado')),
      svgBox,
      h('div',{class:'ecr-legend'},
        h('span',{}, h('b',{style:'color:var(--ecr-n1)'},'◆ N1'),' productores'), h('span',{}, h('b',{style:'color:var(--ecr-n2)'},'● N2'),' consumidores primarios'),
        h('span',{}, h('b',{style:'color:var(--ecr-n3)'},'■ N3'),' consumidores secundarios'), h('span',{}, h('b',{style:'color:var(--ecr-n4)'},'▲ N4'),' superdepredadores'),
        h('span',{}, h('b',{style:'color:var(--ecr-d)'},'⬢ D'),' descomponedores'),
        h('span',{}, 'La flecha toma el color del nivel del que sale la energía.')),
      h('p',{class:'small muted'},'Toca o selecciona con el tabulador cualquier especie para resaltar sus conexiones y abrir su ficha. Una red trófica es el conjunto de muchas cadenas alimentarias entrelazadas: por eso casi ningún ser vivo depende de una sola presa.'));
    if (St.sel) wrap.append(fichaEl(ECR_sp(s,St.sel)));
    setTimeout(()=>{ $$('.ecr-node', svgBox).forEach(g => {
      const pick = () => { St.sel = g.dataset.sp; Store.markSeen('eco-'+s.id, g.dataset.sp); render(); };
      g.addEventListener('click', pick);
      g.addEventListener('keydown', e => { if (e.key==='Enter' || e.key===' '){ e.preventDefault(); pick(); } });
    }); }, 0);
    return h('div',{class:'stack'}, wrap, secNav());
  }

  /* ---------- 3 · Construye la red ---------- */
  function secConstruye(){
    const s = S(), retos = s.retos;
    const hechos = () => St.built.filter(b => retos.some(r => r[0]===b.a && r[1]===b.b));
    const svgBox = h('div',{class:'ecr-webw', html: ecrWebSVG(s, St.built.map(b=>({a:b.a,b:b.b})), null)});
    const fb = h('div',{class: St.fb ? St.fb.k : 'notice', style: St.fb ? '' : 'display:none', html: St.fb ? '<span>'+St.fb.m+'</span>' : ''});
    const selA = h('select',{'aria-label':'Ser vivo que es comido (presa)'}), selB = h('select',{'aria-label':'Ser vivo que se lo come'});
    [selA, selB].forEach((sl,k) => { sl.append(h('option',{value:''}, k? '— ¿quién se lo come? —' : '— ¿a quién se comen? —')); s.sp.forEach(sp => sl.append(h('option',{value:sp.id}, sp.n))); });
    const lista = h('ul',{class:'ecr-check'});
    function pintarLista(){
      lista.innerHTML='';
      retos.forEach((r,i) => {
        const ok = St.built.some(b => b.a===r[0] && b.b===r[1]);
        const a = ECR_sp(s,r[0]), b = ECR_sp(s,r[1]);
        lista.append(h('li',{class: ok?'ok':''},
          h('span',{class:'ck','aria-hidden':'true'}, ok?'✓':''),
          h('span',{}, ok ? h('span',{}, h('b',{},a.n), ' → ', h('b',{},b.n), ' ', h('span',{class:'small muted'},'(la materia y la energía pasan del '+a.n.toLowerCase()+' al '+b.n.toLowerCase()+')'))
                          : h('span',{}, 'Flecha ', i+1, ': ¿quién se alimenta de ', h('b',{},a.n), '? ',
                              h('button',{class:'btn sm ghost', onclick:()=>{ St.hints++; toast('Pista: revisa la ficha de '+a.n+' en la sección 1; busca en "Quién lo come".'); }},'Pista')))));
      });
    }
    function intentar(){
      const A = selA.value, B = selB.value;
      if (!A || !B) return toast('Elige las dos especies: primero la que es comida y después la que come.');
      const a = ECR_sp(s,A), b = ECR_sp(s,B);
      const real = (b.come||[]).includes(A), inv = (a.come||[]).includes(B);
      const ya = St.built.some(x => x.a===A && x.b===B);
      const esReto = retos.some(r => r[0]===A && r[1]===B);
      let cls='notice warn', msg='';
      if (ya){ msg = 'Esa flecha ya está dibujada. Prueba con otra pareja.'; }
      else if (real){
        St.built.push({a:A, b:B}); cls='notice ok';
        msg = `<b>Correcta.</b> ${ecrArt(b,true)} se alimenta ${ecrDel(a)}, así que la flecha sale ${ecrDel(a)} y apunta ${ecrAl(b)}: por ahí viaja la materia y la energía.` + (esReto ? '' : ' No estaba en la lista, pero también forma parte de la red.');
      }
      else if (inv){ St.errs++; msg = `<b>Invertiste el sentido.</b> En realidad ${ecrArt(a)} come ${ecrAl(b)}, no al revés. La flecha siempre sale del que es comido y apunta al que come, porque muestra hacia dónde pasa la energía. Intenta de nuevo cambiando el orden.`; }
      else if (b.lvl===0){ St.errs++; msg = `<b>Un productor no come a otros seres vivos.</b> ${ecrArt(b,true)} fabrica su alimento con la fotosíntesis: usa luz, agua y CO₂. Ningún productor recibe flechas de alimento; todas salen de él.`; }
      else if (b.lvl===3 && a.lvl===0){ St.errs++; msg = `<b>Ese depredador no come plantas.</b> ${ecrArt(b,true)} es carnívoro: se alimenta de ${(b.come||[]).map(id=>ECR_sp(s,id).n.toLowerCase()).join(', ')}. La energía de la planta le llega, sí, pero de forma indirecta: pasa antes por un herbívoro.`; }
      else if (b.lvl===4){ St.errs++; msg = `<b>Casi.</b> Los descomponedores actúan sobre los restos de cualquier nivel, pero en esta red representamos solo algunos casos. Prueba con ${(b.come||[]).map(id=>ECR_sp(s,id).n.toLowerCase()).join(' o ')}.`; }
      else { St.errs++; msg = `<b>No hay evidencia de que ${ecrArt(b)} coma ${ecrAl(a)}.</b> Según su ficha, ${ecrArt(b)} se alimenta de: ${(b.come||[]).map(id=>ECR_sp(s,id).n.toLowerCase()).join(', ')}.`; }
      Store.log('construye_red',{ecosistema:s.id, presa:A, depredador:B, correcto:real&&!ya});
      const faltan = retos.filter(r => !St.built.some(b2 => b2.a===r[0] && b2.b===r[1]));
      if (!faltan.length && !St.marks.red){
        St.marks.red = true;
        const hayD = St.built.some(b2 => ECR_sp(s,b2.b).lvl===4);
        cls = 'notice ok';
        msg = `<b>Red completa.</b> Dibujaste las ${retos.length} flechas con ${St.errs} error(es)${St.hints?' y '+St.hints+' pista(s)':''}. ${hayD ? 'Muy bien: incluiste a los descomponedores, el nivel que casi siempre se olvida y sin el cual los nutrientes no volverían al suelo.' : ''} Recuerda que la energía no vuelve: cada flecha la lleva hacia arriba y en cada paso se pierde en forma de calor.`;
      }
      St.fb = { k:cls, m:msg };
      render();
    }
    const bar = h('div',{class:'stack'},
      h('div',{class:'row',style:'flex-wrap:wrap;gap:8px;align-items:center'},
        h('span',{class:'small',style:'font-weight:600'},'Es comido:'), selA,
        h('span',{class:'small',style:'font-weight:600'},'se lo come:'), selB,
        h('button',{class:'btn primary sm', onclick:intentar},'Dibujar la flecha →')),
      h('p',{class:'small muted'},'Todo funciona con el teclado: elige en las listas y pulsa el botón. También puedes borrar la última flecha si te equivocaste de pareja.'),
      h('div',{class:'row'},
        h('button',{class:'btn sm', onclick:()=>{ if (!St.built.length) return toast('Todavía no hay flechas.'); St.built.pop(); St.fb=null; render(); }},'Borrar la última'),
        h('button',{class:'btn sm ghost', onclick:()=>{ St.built=[]; St.marks.red=false; St.fb=null; render(); }},'Empezar de nuevo')));
    pintarLista();
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Construye la red'),
        h('p',{},'Ahora la red está vacía. Añade las flechas que faltan indicando quién se alimenta de quién. Ojo con el sentido: la flecha sale del ser vivo que es comido.'),
        bar, fb, h('b',{class:'small'},`Flechas pendientes (${retos.length - hechos().length} de ${retos.length})`), lista),
      h('div',{class:'card'}, svgBox), secNav());
  }

  /* ---------- 4 · Pirámide de energía ---------- */
  function secEnergia(){
    const s = S(), eff = St.eff/100;
    const nombres = ['Productores (N1)','Consumidores primarios (N2)','Consumidores secundarios (N3)','Superdepredadores (N4)','Un quinto nivel hipotético (N5)'];
    const ej = [ECR_sp(s,s.pop.P).n, ECR_sp(s,s.pop.H).n, ECR_sp(s,s.pop.M).n, ECR_sp(s,s.pop.T).n, '—'];
    const vals = []; for (let k=0;k<5;k++) vals.push(s.base * Math.pow(eff,k));
    const pir = h('div',{html: ecrPiramideSVG(s, vals, nombres, ej)});
    const slider = h('input',{type:'range',min:5,max:20,step:1,value:St.eff,id:'ecr-eff','aria-label':'Porcentaje de energía que pasa al siguiente nivel'});
    slider.addEventListener('input', ()=>{ St.eff = +slider.value; render(); });
    const q = quizBlock({
      q:'¿Por qué en la naturaleza casi nunca hay más de cuatro o cinco niveles tróficos?',
      ops:['Porque no existen animales tan grandes como para comerse a un superdepredador',
           'Porque en cada paso se pierde alrededor del 90 % de la energía como calor y actividad vital, y arriba ya no queda energía suficiente para sostener una población',
           'Porque los superdepredadores prefieren no ser comidos',
           'Porque la energía se acaba y hay que esperar a que el sol la devuelva al último nivel'],
      ok:1,
      fb:`En tu pirámide, del nivel 1 al nivel 4 queda apenas ${ECR_dec(Math.pow(eff,3)*100)} % de la energía inicial. Un depredador del quinto nivel tendría que recorrer territorios inmensos para encontrar lo que necesita: no le compensa. Por eso las cadenas son cortas, y en ecosistemas poco productivos como el páramo, aún más.`,
      wrong:['El tamaño no es el problema: de hecho hay superdepredadores pequeños. Mira los números de la pirámide y fíjate en cuánta energía queda arriba.',
             'Los seres vivos no eligen su nivel trófico. La respuesta está en la energía disponible en cada escalón.',
             'La energía del sol entra siempre por el nivel 1, nunca por arriba: la energía fluye en un solo sentido y no regresa.']
    }, att => { if (!St.marks.pir){ St.marks.pir = true; Store.log('reto_parcial',{parte:'piramide', intentos:att}); } });
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Pirámide de energía · '+s.n),
        h('p',{},'Cada nivel solo aprovecha una parte pequeña de la energía del nivel anterior. El resto se pierde: se usa en respirar, moverse y mantener el cuerpo, y termina disipado como calor.'),
        h('div',{class:'slider'}, h('label',{for:'ecr-eff'},'Energía que pasa al siguiente nivel'), h('output',{},ECR_num(St.eff)+' %'), slider),
        pir,
        h('p',{class:'small muted'},`Punto de partida: ${s.baseNota}. Los valores son aproximados y sirven para comparar órdenes de magnitud, no para memorizarlos. Las barras están a escala, con un ancho mínimo para que los niveles altos sigan siendo legibles.`),
        h('div',{class:'notice'}, h('span',{}, h('b',{},'Regla del 10 %: '), `con una eficiencia del ${ECR_num(St.eff)} %, de cada ${ECR_mil(s.base)} kJ que fijan los productores en un metro cuadrado durante un año solo llegan ${ECR_kj(vals[3])} kJ al cuarto nivel.`))),
      h('div',{class:'card stack'}, q), secNav());
  }

  /* ---------- Modelo de poblaciones (presa–depredador con capacidad de carga) ----------
     Cuatro compartimentos: P productores, H herbívoro, M depredador intermedio,
     T superdepredador. Integración paso a paso (método de Euler, dt = 0,02 años).
     Las unidades son un índice de población (0–100), no individuos reales.          */
  function ecrBase(){ return { rP:1.0, K:100, a1:0.012, b1:0.0125, a2:0.002, a3:0.030, a4:0.020, c1:0.35, cM:0.30, c3:0.16, mH:0.116, mM:0.120, mT:0.1456, dM:0.005, inmT:0, P0:1, T0:1, temporal:0, lento:false }; }
  function ecrStep(st, p, dt){
    const P=st.P, H=st.H, M=st.M, T=st.T;
    const dP = p.rP*P*(1-P/p.K) - p.a1*P*H - p.b1*P*M;
    const dH = p.c1*p.a1*P*H - p.mH*H - p.a2*H*M - p.a3*H*T;
    const dM = p.cM*(p.b1*P*M + p.a2*H*M) - p.mM*M - p.dM*M*M - p.a4*M*T;
    const dT = p.c3*(p.a3*H + p.a4*M)*T - p.mT*T + (p.inmT||0);
    return { P:Math.max(0,P+dP*dt), H:Math.max(0,H+dH*dt), M:Math.max(0,M+dM*dt), T:Math.max(0,T+dT*dt) };
  }
  function ecrEq(){ let st = {P:60,H:25,M:8,T:4}; const p = ecrBase(); for (let i=0;i<6000;i++) st = ecrStep(st, p, 0.02); return st; }
  function ecrSimular(pertId){
    const dt = 0.02, eq = ecrEq(), base = ecrBase();
    const pm = ecrBase(); ECR_PERT[pertId].ap(pm);
    const pts = { P:[], H:[], M:[], T:[] };
    let st = Object.assign({}, eq), t = -6, i = 0;
    const rec = () => { pts.P.push({x:t,y:st.P}); pts.H.push({x:t,y:st.H}); pts.M.push({x:t,y:st.M}); pts.T.push({x:t,y:st.T}); };
    rec();
    while (t < 30){
      const p = t < 0 ? base : pm;
      if (pm.temporal && t >= pm.temporal){ pm.rP = base.rP*0.92; pm.K = base.K*0.92; }
      st = ecrStep(st, p, dt); t += dt; i++;
      if (i % 12 === 0) rec();
      if (Math.abs(t) < dt/2){ st.P *= pm.P0; st.T *= pm.T0; }   // choque inicial de la perturbación
    }
    return { pts, eq, fin:st, params:pm, pert:pertId };
  }
  const ECR_DIR = v => v > 12 ? 'sube' : v < -12 ? 'baja' : 'igual';
  const ECR_DIRTXT = { sube:'Sube', baja:'Baja', igual:'Casi igual' };

  /* ---------- 5 · ¿Qué pasa si…? ---------- */
  function secPerturba(){
    const s = S(), keys = ['P','H','M','T'], etiq = { P:'Productor', H:'Consumidor primario', M:'Consumidor secundario', T:'Superdepredador' };
    const nom = k => ECR_sp(s, s.pop[k]).n;
    const box = h('div',{class:'stack'});
    const resBox = h('div',{class:'stack'});
    const pchips = h('div',{class:'stack'});
    const fb = h('div',{class:'notice',style:'display:none'});
    const chartWrap = h('div',{class:'card',style:'padding:12px;display:none'});
    const chart = h('canvas',{class:'chart',style:'height:260px'});
    chartWrap.append(h('span',{class:'eyebrow eco'},'Evolución de las poblaciones · índice 0–100'), chart,
      h('p',{class:'small muted'},'La perturbación ocurre en el año 0; antes, el ecosistema está en equilibrio. El modelo integra paso a paso cuatro ecuaciones de poblaciones (crecimiento con capacidad de carga y relaciones presa–depredador). El consumidor secundario también se alimenta de presas pequeñas —roedores, invertebrados— que no se representan por separado y que dependen de la vegetación. Sirve para ver tendencias y efectos indirectos, no para predecir números exactos.'));

    const sel = h('div',{class:'row',style:'flex-wrap:wrap'});
    s.perts.forEach(pid => { const P = ECR_PERT[pid];
      sel.append(h('button',{class:'chip'+(St.pertId===pid?' picked':''),'aria-pressed':String(St.pertId===pid), onclick:()=>{ St.pertId=pid; St.pred={}; St.predRun=false; St.sim=null; render(); }}, P.em+' '+P.n)); });

    if (St.pertId){
      const P = ECR_PERT[St.pertId];
      box.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},P.n+'. '), P.d(s))));
      pchips.append(h('p',{style:'font-weight:600'},'Antes de simular, predice qué ocurrirá con cada población a mediano plazo:'));
      keys.forEach(k => {
        const fila = h('div',{class:'ecr-pred'},
          h('span',{}, h('b',{},nom(k)), ' ', h('span',{class:'small muted'},'· '+etiq[k])),
          h('div',{class:'opts'}, ['sube','baja','igual'].map(v => h('button',{class:'chip'+(St.pred[k]===v?' picked':''),'aria-pressed':String(St.pred[k]===v), disabled: St.predRun||null,
            onclick:()=>{ St.pred[k]=v; render(); }}, ECR_DIRTXT[v]))));
        pchips.append(fila);
      });
      const listo = keys.every(k => St.pred[k]);
      pchips.append(h('button',{class:'btn primary', style:'align-self:flex-start;margin-top:8px', disabled: (!listo||St.predRun)||null,
        onclick:()=>{ St.sim = ecrSimular(St.pertId); St.predRun = true; Store.log('prediccion',{recurso:'cn-eco-red', ecosistema:s.id, perturbacion:St.pertId, prediccion:Object.assign({},St.pred)}); render(); }},
        listo ? 'Ejecutar la simulación (36 años)' : 'Completa las cuatro predicciones'));
    } else box.append(h('div',{class:'notice'},'Elige una perturbación para empezar.'));

    if (St.sim){
      const R = St.sim, aciertos = [];
      const filas = keys.map(k => {
        const ini = R.eq[k], fin = R.fin[k], ch = ini>0 ? (fin-ini)/ini*100 : 0, d = ECR_DIR(ch), ok = St.pred[k]===d;
        if (ok) aciertos.push(k);
        return { k, ini, fin, ch, d, ok };
      });
      const casc = ECR_CASCADA(St.pertId, s, filas);
      if (!St.marks.pred){ St.marks.pred = aciertos.length >= 3; }
      chartWrap.style.display='';
      setTimeout(()=>{ lineChart(chart, { series:[
          { label:nom('P'), color:cssVar('--eco'), pts:R.pts.P },
          { label:nom('H'), color:cssVar('--lab'), pts:R.pts.H },
          { label:nom('M'), color:cssVar('--warn'), pts:R.pts.M },
          { label:nom('T'), color:cssVar('--bad'), pts:R.pts.T } ],
        xmin:-6, xmax:30, ymin:0, ymax:110, xticks:6, xlabel:'años desde la perturbación', ylabel:'índice de población',
        xfmt:v=>ECR_num(v)+' a', yfmt:v=>ECR_num(v) }); }, 30);
      const tabla = h('div',{class:'tablewrap'}, h('table',{class:'data'},
        h('thead',{}, h('tr',{}, h('th',{},'Población'), h('th',{},'Antes'), h('th',{},'A los 30 años'), h('th',{},'Cambio'), h('th',{},'Tu predicción'))),
        h('tbody',{}, filas.map(f => h('tr',{},
          h('td',{}, nom(f.k)), h('td',{class:'num'},ECR_num(f.ini,1)), h('td',{class:'num'},ECR_num(f.fin,1)),
          h('td',{class:'num'}, (f.ch>=0?'+':'−')+ECR_num(Math.abs(f.ch))+' % · '+ECR_DIRTXT[f.d]),
          h('td',{}, h('span',{class:'pill '+(f.ok?'ok':'bad')}, (f.ok?'✓ ':'✗ ')+ECR_DIRTXT[St.pred[f.k]])))))));
      fb.className = 'notice '+(aciertos.length>=3?'ok':'warn'); fb.style.display='flex';
      fb.innerHTML = `<span><b>Acertaste ${aciertos.length} de 4.</b> ${filas.filter(f=>!f.ok).map(f=>`Predijiste que ${ecrArt(ECR_sp(s,s.pop[f.k]))} ${ECR_DIRTXT[St.pred[f.k]].toLowerCase()}, pero ${f.d==='igual'?'se mantuvo casi igual':'se ' + (f.d==='sube'?'multiplicó':'redujo')} (${(f.ch>=0?'+':'−')+ECR_num(Math.abs(f.ch))} %).`).join(' ')} ${casc}</span>`;
      resBox.append(tabla);
    }
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Perturbación · '+s.n),
        h('p',{},'Elige una perturbación real que ocurre hoy en el Ecuador, predice y después comprueba. Casi siempre hay efectos indirectos que no se ven a simple vista.'),
        sel, box, pchips, fb, resBox),
      chartWrap, secNav());
  }
  function ECR_CASCADA(pid, s, filas){
    const n = k => ecrArt(ECR_sp(s, s.pop[k])), nd = k => ecrDel(ECR_sp(s, s.pop[k])), na = k => ecrAl(ECR_sp(s, s.pop[k]));
    const T = { 'caza-tope': `<b>Cascada trófica.</b> Al desaparecer ${n('T')}, ${n('H')} deja de ser controlado y casi se duplica; al haber tantos herbívoros, ${n('P')} se consume más rápido de lo que crece y cae. Es el efecto indirecto que casi nadie predice: tocamos al depredador y el que se resiente es el productor. Mira también la curva ${nd('M')}: sube los primeros años porque ya nadie lo caza ("liberación del mesodepredador") y luego vuelve a bajar cuando la vegetación se agota. Los efectos indirectos llegan con retraso.`,
      'deforestacion': `<b>El golpe llega de abajo hacia arriba.</b> Solo se eliminó vegetación, pero fíjate en quién pierde más en porcentaje: ${n('T')}. Con menos productores hay menos energía en toda la pirámide, y el nivel más alto es el que primero se queda sin sustento, porque necesita territorios enormes.`,
      'quema': `<b>El fuego actúa en la base.</b> El pajonal rebrota tierno y parece recuperarse, pero la capacidad de carga del suelo quemado es menor: el sistema se estabiliza en valores más bajos y el superdepredador puede no volver nunca. Además, el suelo del páramo libera carbono y pierde su capacidad de retener agua.`,
      'sequia': `<b>Perturbación temporal, huella duradera.</b> La sequía dura unos ocho años y después la vegetación se recupera en parte, pero ${n('T')} sigue muy por debajo tres décadas más tarde: se reproduce despacio y necesita mucho territorio. Y mientras falta, ${n('H')} se mantiene alto y la vegetación no vuelve a su nivel anterior. Una perturbación "pasajera" puede dejar al ecosistema en otro estado.`,
      'invasora': `<b>Competencia invisible.</b> La especie invasora no aparece en la gráfica, pero ocupa espacio y recursos: baja la capacidad de carga y aumenta la presión sobre ${n('P')}. Todos los niveles se reajustan a la baja sin que ningún depredador haya desaparecido.`,
      'sobrepesca': `<b>Se extrae un solo eslabón… y se mueve toda la red.</b> Al sacar tanto ${n('H')} sube ${n('P')}, porque ya casi nadie lo consume, y baja ${n('T')}: la pesca compite con él por el mismo alimento. Además ${n('M')} se dispara y ocupa el espacio que dejó libre ${n('H')}. Por eso las vedas y las tallas mínimas no protegen solo a la especie capturada.` };
    return T[pid] || '';
  }

  /* ---------- 6 · Fluye o circula ---------- */
  const ECR_PROC = [
    { id:'fotosintesis', n:'Fotosíntesis', d:'Los productores capturan energía luminosa y con ella unen CO₂ y agua para formar glucosa. Aquí entran a la vez la energía (del sol) y la materia (el carbono del aire). Es la única puerta de entrada de energía al ecosistema.' },
    { id:'alimentacion', n:'Alimentación', d:'Al comer, un ser vivo incorpora materia y energía del anterior. Pero solo aprovecha una parte pequeña: el resto no llega a asimilarse o se gasta en vivir.' },
    { id:'respiracion', n:'Respiración celular', d:'Todos los seres vivos (incluidas las plantas) oxidan la glucosa para obtener ATP. Devuelven carbono a la atmósfera como CO₂ y liberan energía en forma de calor. La materia vuelve al ciclo; la energía, no.' },
    { id:'descomposicion', n:'Descomposición', d:'Hongos, bacterias y detritívoros transforman los restos y los excrementos. Devuelven al suelo o al agua el carbono, el nitrógeno y el fósforo, que las plantas volverán a usar. Sin este paso el ciclo se rompe.' },
    { id:'deposito', n:'Acumulación en el depósito', d:'Parte de la materia orgánica no se descompone del todo y se acumula. Ese carbono queda guardado durante décadas o siglos.' },
    { id:'combustion', n:'Quema y combustión', d:'Al quemar biomasa o combustibles fósiles se libera de golpe carbono que había tardado siglos en acumularse. Es la principal alteración humana del ciclo del carbono.' },
    { id:'calor', n:'Disipación en forma de calor', d:'En cada transferencia una gran parte de la energía se degrada a calor y sale del ecosistema. No se destruye (primera ley), pero ya no puede usarse para hacer trabajo biológico (segunda ley). Por eso la energía necesita reponerse cada día desde el sol.' }
  ];
  function ecrCicloSVG(modo, s){
    const cajas = [
      { id:'atm', x:330, y:20, w:250, h:56, t:'Atmósfera · CO₂' },
      { id:'prod', x:60, y:170, w:200, h:76, t:'Productores', s:ECR_sp(s,s.pop.P).n },
      { id:'cons', x:360, y:170, w:200, h:76, t:'Consumidores', s:ECR_sp(s,s.pop.H).n+' · '+ECR_sp(s,s.pop.T).n },
      { id:'desc', x:660, y:170, w:200, h:76, t:'Descomponedores', s:'hongos y bacterias' },
      { id:'dep', x:360, y:330, w:200, h:70, t:'Depósito', s:s.ciclo.dep },
      { id:'quema', x:660, y:330, w:200, h:70, t:'Quema / combustión', s:'alteración humana' }
    ];
    const sol = `<g><circle cx="80" cy="48" r="30" fill="none" stroke="var(--warn)" stroke-width="2.5"/><text x="80" y="53" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">Sol</text>` +
      [0,45,90,135,180,225,270,315].map(a => { const r1=34,r2=44,rad=a*Math.PI/180; return `<line x1="${(80+r1*Math.cos(rad)).toFixed(1)}" y1="${(48+r1*Math.sin(rad)).toFixed(1)}" x2="${(80+r2*Math.cos(rad)).toFixed(1)}" y2="${(48+r2*Math.sin(rad)).toFixed(1)}" stroke="var(--warn)" stroke-width="2"/>`; }).join('') + `</g>`;
    let g = sol;
    const visibles = modo === 'materia' ? cajas : cajas.filter(c => ['prod','cons','desc'].includes(c.id));
    visibles.forEach(c => { g += `<g><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="12" fill="var(--bg-2)" stroke="var(--ink-3)" stroke-width="1.6"/>`
      + `<text x="${c.x+c.w/2}" y="${c.y+(c.s?26:34)}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">${esc(c.t)}</text>`
      + (c.s?`<text x="${c.x+c.w/2}" y="${c.y+48}" text-anchor="middle" font-size="11.5" fill="var(--ink-3)">${esc(c.s)}</text>`:'') + `</g>`; });
    const lab = (x,y,txt,col) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="11.5" font-weight="600" fill="${col}" style="paint-order:stroke" stroke="var(--bg-3)" stroke-width="4.5">${esc(txt)}</text>`;
    const fl = (x1,y1,x2,y2,txt,col,dash,tx,ty) => {
      const a = ecrArrow({x:x1,y:y1},{x:x2,y:y2}, 2, col, 2.6, 1).replace('<line','<line stroke-dasharray="'+(dash||'0')+'"');
      const mx=(x1+x2)/2, my=(y1+y2)/2;
      return a + lab(tx!=null?tx:mx, ty!=null?ty:my-6, txt, col);
    };
    const punta = (x,y,dir,col) => { const p = { up:[[x,y],[x-6,y+11],[x+6,y+11]], down:[[x,y],[x-6,y-11],[x+6,y-11]], left:[[x,y],[x+11,y-6],[x+11,y+6]], right:[[x,y],[x-11,y-6],[x-11,y+6]] }[dir];
      return `<polygon fill="${col}" points="${p.map(q=>q.join(',')).join(' ')}"/>`; };
    const flP = (d,hx,hy,dir,txt,tx,ty,col,dash) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${dash||'0'}"/>` + punta(hx,hy,dir,col) + lab(tx,ty,txt,col);
    const eco = 'var(--eco)', warn = 'var(--warn)', ink3 = 'var(--ink-3)';
    if (modo === 'materia'){
      g += fl(334, 62, 132, 166, 'fotosíntesis', eco, null, 205, 96);
      g += fl(196, 166, 402, 66, 'respiración', ink3, null, 330, 148);
      g += fl(262, 208, 356, 208, 'alimento', eco, null, 309, 198);
      g += fl(474, 166, 474, 80, 'respiración', ink3, null, 520, 128);
      g += fl(562, 200, 656, 200, 'restos', eco, null, 609, 190);
      g += fl(752, 166, 574, 74, 'respiración', ink3, null, 690, 106);
      g += flP('M150 250 L150 306 L706 306 L706 254', 706, 250, 'up', 'hojarasca y raíces muertas', 330, 322, eco, '7 5');
      g += fl(742, 250, 566, 344, 'materia orgánica', eco, null, 690, 288);
      g += fl(566, 366, 654, 366, 'extracción', warn, null, 610, 356);
      g += flP('M866 344 L892 344 L892 48 L600 48', 586, 48, 'left', 'CO₂ liberado de golpe', 740, 40, warn);
      g += `<text x="480" y="440" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">La materia CIRCULA: los mismos átomos de carbono vuelven a usarse una y otra vez.</text>`;
    } else {
      g += fl(112, 76, 158, 166, 'energía luminosa', warn);
      g += fl(262, 196, 356, 196, '≈10 %', warn);
      g += fl(562, 196, 656, 196, '≈10 %', warn);
      [160,460,760].forEach(x => { g += fl(x, 252, x, 330, 'calor', ink3, '5 4');
        g += `<text x="${x}" y="${356}" text-anchor="middle" font-size="11.5" fill="var(--ink-3)">se disipa · no regresa</text>`; });
      g += `<text x="480" y="398" text-anchor="middle" font-size="12" fill="var(--ink-3)">De cada 100 unidades de energía que entran en un nivel, solo unas 10 llegan al siguiente.</text>`;
      g += `<text x="480" y="440" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">La energía FLUYE en un solo sentido: entra del sol, se degrada a calor y no regresa.</text>`;
    }
    return `<svg class="ecr-cyc" viewBox="0 0 900 460" role="img" aria-label="${modo==='materia'?'Ciclo del carbono: la materia circula entre atmósfera, productores, consumidores, descomponedores y el depósito del ecosistema.':'Flujo de energía: entra del sol, pasa de nivel en nivel perdiendo aproximadamente el 90 % en cada paso y se disipa como calor.'}">${g}</svg>`;
  }
  function secMateria(){
    const s = S();
    const modo = St.modo || 'materia';
    const svgBox = h('div',{class:'ecr-webw', html: ecrCicloSVG(modo, s)});
    const seg = h('div',{class:'segmented',role:'tablist'},
      ['materia','energia'].map(m => h('button',{role:'tab','aria-selected':String(modo===m), onclick:()=>{ St.modo=m; render(); }}, m==='materia'?'Ver la materia (carbono)':'Ver la energía')));
    const det = h('div',{class:'notice info'},'Elige un proceso para leer qué ocurre en él.');
    const procs = h('div',{class:'row',style:'flex-wrap:wrap'});
    ECR_PROC.forEach(p => procs.append(h('button',{class:'chip', onclick:()=>{ det.className='notice'; det.innerHTML=''; det.append(h('span',{}, h('b',{},p.n+'. '), p.d)); }}, p.n)));
    /* clasificación: fluye o circula */
    const items = [
      { id:'energia', n:'La energía', ok:'fluye', fb:'La energía entra una sola vez desde el sol, pasa de nivel en nivel y se va degradando a calor. No vuelve al principio: por eso el ecosistema necesita la luz del sol todos los días.' },
      { id:'carbono', n:'El carbono', ok:'circula', fb:'El mismo átomo de carbono pasa del aire a una planta, de la planta a un herbívoro, del herbívoro al descomponedor y otra vez al aire. Es materia: se recicla.' },
      { id:'agua', n:'El agua', ok:'circula', fb:'El agua se evapora, forma nubes, cae como lluvia, la absorben las raíces y vuelve a la atmósfera. En el páramo, además, queda retenida en el suelo y alimenta a las ciudades.' },
      { id:'nitrogeno', n:'El nitrógeno', ok:'circula', fb:'Bacterias fijadoras lo toman del aire, pasa a las proteínas de los seres vivos y otras bacterias lo devuelven a la atmósfera. Es un ciclo, aunque más lento y con muchos intermediarios.' },
      { id:'calor', n:'El calor que produce un animal al moverse', ok:'fluye', fb:'Ese calor sale del cuerpo y del ecosistema y ya no puede usarse para hacer trabajo biológico. Energía degradada: no se destruye, pero no vuelve a la red.' }
    ];
    St.clas = St.clas || {};
    const cfb = h('div',{class: St.clasFb ? St.clasFb.k : 'notice', style: St.clasFb ? '' : 'display:none', html: St.clasFb ? '<span>'+St.clasFb.m+'</span>' : ''});
    const lista = h('div',{class:'stack'});
    items.forEach(it => {
      const r = h('div',{class:'ecr-pred'}, h('span',{},it.n),
        h('div',{class:'opts'}, ['fluye','circula'].map(v => h('button',{class:'chip'+(St.clas[it.id]===v?(v===it.ok?' ok':' bad'):''),'aria-pressed':String(St.clas[it.id]===v),
          onclick:()=>{ St.clas[it.id]=v; const ok = v===it.ok;
            St.clasFb = { k:'notice '+(ok?'ok':'warn'),
              m:`<b>${ok?'Correcto: '+it.n.toLowerCase()+' '+it.ok+'.':'Aún no: '+it.n.toLowerCase()+' '+it.ok+'.'}</b> ${esc(it.fb)}` };
            const todas = items.every(x => St.clas[x.id]===x.ok);
            if (todas && !St.marks.ciclo){ St.marks.ciclo = true; toast('Distinguiste lo que fluye de lo que circula.'); }
            Store.log('respuesta',{pregunta:'fluye-o-circula', opcion:it.id+':'+v, correcto:ok});
            render(); }}, v==='fluye'?'Fluye (un solo sentido)':'Circula (vuelve a usarse)'))));
      lista.append(r);
    });
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Materia y energía '+ecrSysEn(s)),
        h('p',{},'Es el error más frecuente: pensar que la energía "se recicla". Compara los dos esquemas del mismo ecosistema y fíjate en las flechas que no regresan.'),
        seg, svgBox, h('p',{class:'small muted'},s.ciclo.extra), procs, det),
      h('div',{class:'card stack'}, h('b',{},'Clasifica: ¿fluye o circula?'), lista, cfb), secNav());
  }

  /* ---------- 7 · Decisión de conservación ---------- */
  function secConserva(){
    const s = S(), nom = k => ECR_sp(s, s.pop[k]).n;
    if (!St.sim) return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Decisión de conservación'),
        h('div',{class:'notice warn'},'Primero necesitas un ecosistema alterado: vuelve a la sección 5, elige una perturbación y ejecuta la simulación. Después podrás decidir qué medida aplicar.'),
        h('button',{class:'btn primary',style:'align-self:flex-start',onclick:()=>{ St.sec=4; render(); }},'Ir a la sección 5')), secNav());
    const chips = h('div',{class:'row',style:'flex-wrap:wrap'});
    Object.entries(ECR_MED).forEach(([id,M]) => chips.append(h('button',{class:'chip'+(St.med===id?' picked':''),'aria-pressed':String(St.med===id),
      onclick:()=>{ St.med=id; St.medRun=null; render(); }}, M.em+' '+M.n)));
    const box = h('div',{class:'stack'});
    if (St.med){
      const M = ECR_MED[St.med];
      box.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},M.n+'. '), M.d)));
      box.append(h('button',{class:'btn primary',style:'align-self:flex-start', onclick:()=>{
        const pA = Object.assign({}, St.sim.params), pB = Object.assign({}, St.sim.params); M.ap(pB);
        const dt = 0.02, pts = {P:[],H:[],M:[],T:[]}, sin = {P:[],H:[],M:[],T:[]};
        let a = Object.assign({}, St.sim.fin), b = Object.assign({}, St.sim.fin), t = 0, i = 0;
        const mix = (u) => { const o = {}; Object.keys(pB).forEach(k => { o[k] = (typeof pB[k]==='number' && typeof pA[k]==='number') ? pA[k] + (pB[k]-pA[k])*u : pB[k]; }); return o; };
        const rec = () => { ['P','H','M','T'].forEach(k => { pts[k].push({x:t,y:b[k]}); sin[k].push({x:t,y:a[k]}); }); };
        rec();
        while (t < 10){ const u = pB.lento ? Math.min(1, t/8) : Math.min(1, t/1.5);
          a = ecrStep(a, pA, dt); b = ecrStep(b, mix(u), dt); t += dt; i++; if (i % 12 === 0) rec(); }
        St.medRun = { pts, sin, fin:b, finSin:a };
        Store.log('conservacion',{recurso:'cn-eco-red', ecosistema:s.id, medida:St.med, perturbacion:St.pertId});
        render();
      }},'Simular 10 años con esta medida'));
    } else box.append(h('div',{class:'notice'},'Elige la medida que aplicarías en este ecosistema.'));
    const chartWrap = h('div',{class:'card',style:'padding:12px;display:none'});
    const chart = h('canvas',{class:'chart',style:'height:250px'});
    chartWrap.append(h('span',{class:'eyebrow eco'},'Diez años después de aplicar la medida'), chart);
    if (St.medRun){
      const R = St.medRun, M = ECR_MED[St.med];
      chartWrap.style.display='';
      setTimeout(()=>{ lineChart(chart, { series:[
          { label:nom('P'), color:cssVar('--eco'), pts:R.pts.P },
          { label:nom('H'), color:cssVar('--lab'), pts:R.pts.H },
          { label:nom('M'), color:cssVar('--warn'), pts:R.pts.M },
          { label:nom('T'), color:cssVar('--bad'), pts:R.pts.T } ],
        xmin:0, xmax:10, ymin:0, ymax:110, xticks:5, xlabel:'años desde la medida', ylabel:'índice de población',
        xfmt:v=>ECR_num(v)+' a', yfmt:v=>ECR_num(v) }); }, 30);
      const tabla = h('div',{class:'tablewrap'}, h('table',{class:'data'},
        h('thead',{}, h('tr',{}, h('th',{},'Población'), h('th',{},'Hoy (alterado)'), h('th',{},'A 10 años sin medida'), h('th',{},'A 10 años con la medida'))),
        h('tbody',{}, ['P','H','M','T'].map(k => h('tr',{}, h('td',{},nom(k)),
          h('td',{class:'num'},ECR_num(St.sim.fin[k],1)), h('td',{class:'num'},ECR_num(R.finSin[k],1)), h('td',{class:'num'}, h('b',{},ECR_num(R.fin[k],1))))))));
      const mejor = ['P','H','M','T'].filter(k => R.fin[k] > R.finSin[k]*1.05).length;
      const extinto = R.fin.T < 0.5;
      const ta = h('textarea',{placeholder:'Elegí esta medida porque… La simulación muestra que… La principal limitación es…','aria-label':'Justificación de tu decisión',style:'min-height:110px'});
      box.append(tabla, h('div',{class:'notice ok'}, h('span',{}, h('b',{},'Resultado a 10 años. '),
          `Con esta medida suben ${mejor} de las 4 poblaciones respecto a no hacer nada. Cuidado: más no siempre es mejor; un herbívoro que crece sin depredador termina sobrepastoreando la vegetación. ${M.fb}`)),
        ...(extinto ? [h('div',{class:'notice warn'}, h('span',{}, h('b',{},'Atención: '), `${ecrArt(ECR_sp(s,s.pop.T))} está prácticamente extinguido en esta zona (índice ${ECR_num(R.fin.T,1)}). Ninguna medida local lo devuelve si ya no quedan individuos: solo puede regresar si llega desde otra población, y para eso hace falta conectividad, es decir, un corredor biológico, o una reintroducción planificada.`))] : []),
        h('div',{class:'field'}, h('label',{},'Justifica tu decisión con los datos de la simulación (mínimo 80 caracteres)'), ta,
          h('button',{class:'btn primary sm',style:'align-self:flex-start', onclick:()=>{
            if (ta.value.trim().length < 80) return toast('Desarrolla tu justificación: cita al menos una población y un número de la tabla.');
            Store.addNote('conclusion', `Conservación · ${s.n} · perturbación: ${ECR_PERT[St.pertId].n} · medida elegida: ${M.n}. ${ta.value.trim()}`, { recurso:'cn-eco-red', ecosistema:s.id });
            St.marks.conserva = true; toast('Guardado en tu cuaderno. Tu docente podrá revisarlo.');
            Store.log('respuesta_abierta',{actividad:'cn-eco-red', longitud:ta.value.length, medida:St.med}); render();
          }},'Guardar en el cuaderno')));
      if (St.marks.conserva) box.append(h('div',{class:'notice ok'},'Justificación guardada en tu cuaderno de campo.'));
    }
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Decisión de conservación · '+s.n),
        h('p',{},`El ecosistema quedó alterado por: ${ECR_PERT[St.pertId].n.toLowerCase()}. Ninguna medida arregla todo: cada una actúa sobre una parte distinta de la red y tiene un costo. Elige una, simula diez años y defiende tu decisión.`),
        chips, box), chartWrap, secNav());
  }

  /* ---------- 8 · Reto final ---------- */
  function secReto(){
    const s = S(), T = ECR_sp(s, s.pop.T), H = ECR_sp(s, s.pop.H), P = ECR_sp(s, s.pop.P), M = ECR_sp(s, s.pop.M);
    const hechos = Object.entries({ red:'Construiste la red trófica', pred:'Acertaste al menos 3 de 4 en la predicción', pir:'Explicaste el límite de niveles tróficos', ciclo:'Distinguiste lo que fluye de lo que circula', conserva:'Justificaste una medida de conservación' });
    const lista = h('ul',{class:'ecr-check'});
    hechos.forEach(([k,txt]) => lista.append(h('li',{class: St.marks[k]?'ok':''}, h('span',{class:'ck','aria-hidden':'true'}, St.marks[k]?'✓':''), h('span',{}, txt))));
    const q = quizBlock({
      q:`${ecrSysEn(s).charAt(0).toUpperCase()+ecrSysEn(s).slice(1)}, la cacería hace desaparecer ${ecrAl(T)}. ¿Qué es lo más probable a mediano plazo?`,
      ops:[ `${ecrArt(P,true)} aumentará, porque ya no queda ningún depredador en el ecosistema`,
            `${ecrArt(H,true)} aumentará y ${ecrArt(P)} disminuirá: es una cascada trófica`,
            `No cambiará nada, porque ${ecrArt(T)} es una sola especie entre muchas`,
            `Todas las poblaciones disminuirán, porque el ecosistema pierde la energía que aportaba ${ecrArt(T)}` ],
      ok:1,
      fb:`Es el efecto que viste en la simulación: sin control, ${ecrArt(H)} se multiplica y sobreexplota ${ecrAl(P)}. ${ecrArt(M,true)} también se libera de su depredador. A esto se le llama cascada trófica, y explica por qué proteger a un superdepredador protege en realidad a toda la vegetación.`,
      wrong:[ `${ecrArt(P,true)} es un productor: no lo controlan los depredadores, sino los herbívoros que lo comen. Si hay más herbívoros, habrá menos vegetación.`,
              `Los superdepredadores son pocos, pero su papel es clave: regulan a los herbívoros. Vuelve a la sección 5 y mira qué le pasa al productor cuando eliminas al depredador tope.`,
              `${ecrArt(T,true)} no aporta energía al ecosistema: la energía entra únicamente por los productores, con la fotosíntesis. Lo que aporta es regulación.` ]
    }, att => {
      if (St.marks.reto) return;
      St.marks.reto = true;
      const score = Object.values(St.marks).filter(Boolean).length;
      const min = Math.round((Date.now()-St.start)/60000);
      Store.completeActivity('cn-eco-red', { score:`${score}/6`, attempts: St.errs + (att-1), duracionMin:min, ecosistema:s.id });
      Store.grantBadge('ecologo');
      retoSt.className = 'notice ok'; retoSt.textContent = 'Reto resuelto ✓';
      toast('Actividad completada: red trófica y ecosistemas del Ecuador.');
      render();
    });
    return h('div',{class:'stack'},
      h('div',{class:'card stack'}, h('span',{class:'eyebrow eco'},'Reto final'),
        h('p',{},'Lo que hiciste hasta aquí:'), lista,
        h('p',{class:'small muted'},'Puedes resolver el reto aunque falte alguna casilla, pero tu resultado será mejor si antes construyes la red, compruebas tu predicción y justificas una medida.')),
      h('div',{class:'card stack'}, q,
        St.marks.reto ? h('div',{class:'notice ok'}, h('span',{}, h('b',{},'Actividad completada. '), `Prueba ahora el mismo análisis en otro ecosistema: ${Object.values(ECR_SYS).filter(x=>x.id!==s.id).map(x=>(x.ar==='la'?'la ':'el ')+x.n.toLowerCase()).join(' o ')} funcionan con las mismas reglas, aunque las especies cambien.`)) : null),
      secNav());
  }

  /* ---------- render ---------- */
  function render(){
    renderNav(); body.innerHTML='';
    const f = [secEspecies, secRed, secConstruye, secEnergia, secPerturba, secMateria, secConserva, secReto][St.sec];
    body.append(f());
    Store.log('seccion',{recurso:'cn-eco-red', seccion:SEC[St.sec].id, ecosistema:St.sys});
  }
  renderSys(); render();
});
</script>
