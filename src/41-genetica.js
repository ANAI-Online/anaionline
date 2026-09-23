<style>
/* ===== Laboratorio de genética (BGU U4 · 9.º EGB CVT U1) — CSS propio, prefijo gen- ===== */
.gen-legend{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.gen-b{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);border-radius:999px;padding:2px 9px 2px 3px;background:var(--bg-2);font-size:.78rem;color:var(--ink)}
.gen-b i{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-family:var(--font-m,"IBM Plex Mono",monospace);font-weight:700;font-size:.74rem;color:#fff}
.gen-b.sm{font-size:.72rem;padding:1px 7px 1px 2px}
.gen-b.sm i{width:17px;height:17px;font-size:.66rem}
.gen-seq{display:flex;flex-wrap:wrap;gap:10px}
.gen-codon{display:flex;flex-direction:column;gap:3px;align-items:center;border:1px solid var(--line);border-radius:10px;padding:6px 7px;background:var(--bg-2);min-width:74px}
.gen-codon.mut{border-color:var(--warn);box-shadow:inset 0 0 0 1px var(--warn)}
.gen-codon .gen-cnum{font-size:.64rem;color:var(--ink-3);letter-spacing:.06em;text-transform:uppercase}
.gen-codon .gen-aa{font-size:.72rem;color:var(--ink-2);font-weight:600;text-align:center}
.gen-trio{display:flex;gap:3px}
.gen-nt{width:24px;height:26px;border-radius:6px;border:1px solid transparent;color:#fff;font-family:var(--font-m,"IBM Plex Mono",monospace);font-weight:700;font-size:.82rem;cursor:pointer;display:grid;place-items:center;padding:0}
.gen-nt:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.gen-nt[aria-pressed="true"]{box-shadow:0 0 0 3px var(--bg-2),0 0 0 5px var(--accent)}
.gen-nt.ro{cursor:default}
.gen-pick{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.gen-slot{width:30px;height:32px;border-radius:7px;border:2px dashed var(--line-2);background:var(--bg-3);color:var(--ink-3);font-family:var(--font-m,"IBM Plex Mono",monospace);font-weight:700;display:grid;place-items:center;cursor:pointer;padding:0;font-size:.85rem}
.gen-slot.ok{border-style:solid;border-color:var(--ok);color:#fff}
.gen-slot.bad{border-style:solid;border-color:var(--bad);color:#fff;background:var(--bad)}
.gen-slot.on{border-color:var(--accent);border-style:solid}
.gen-ladder{display:flex;flex-direction:column;gap:3px;font-family:var(--font-m,"IBM Plex Mono",monospace)}
.gen-rung{display:flex;align-items:center;gap:4px}
.gen-rung .bar{flex:1;height:2px;background:var(--line-2);max-width:26px}
.gen-2d{width:100%;height:100%;display:block}
.gen-2d .gen-hit{cursor:pointer}
.gen-ovl{position:absolute;left:12px;right:12px;bottom:46px;z-index:3;display:flex;flex-direction:column;gap:6px;pointer-events:none}
.gen-ovl .notice{pointer-events:auto}
.gen-slider{display:grid;grid-template-columns:1fr auto;gap:4px 10px;align-items:center;font-size:.82rem}
.gen-slider input{grid-column:1/-1;width:100%}
.gen-flow{display:grid;grid-template-columns:1fr;gap:10px}
.gen-box{border:1px solid var(--line);border-radius:12px;padding:10px;background:var(--bg-2);position:relative;overflow:hidden}
.gen-box.nuc{border-style:double;border-width:3px;background:color-mix(in srgb,var(--gen,var(--accent)) 8%,var(--bg-2))}
.gen-box>.gen-tag{position:absolute;top:6px;right:9px;font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
.gen-strip{display:flex;gap:6px;flex-wrap:nowrap;overflow-x:auto;padding:22px 2px 6px;position:relative;min-height:70px}
.gen-cod{flex:0 0 auto;width:62px;text-align:center;border:1px solid var(--line);border-radius:8px;padding:4px 2px;background:var(--bg-3);font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.8rem;font-weight:700;color:var(--ink)}
.gen-cod.leido{background:color-mix(in srgb,var(--ok) 16%,var(--bg-3));border-color:var(--ok)}
.gen-cod.lee{background:color-mix(in srgb,var(--accent) 18%,var(--bg-3));border-color:var(--accent)}
.gen-cod small{display:block;font-family:inherit;font-weight:500;font-size:.62rem;color:var(--ink-3)}
.gen-ribo{position:absolute;top:0;left:2px;width:62px;text-align:center;font-size:.9rem;transition:transform .5s ease}
.gen-quieto .gen-ribo{transition:none}
.gen-prot{display:flex;gap:4px;flex-wrap:wrap;align-items:center}
.gen-aa-chip{border:1px solid var(--line);border-radius:999px;padding:2px 9px;background:color-mix(in srgb,var(--ok) 12%,var(--bg-2));font-size:.76rem;font-weight:600}
.gen-tab64{width:100%;border-collapse:collapse;font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.68rem}
.gen-tab64 th,.gen-tab64 td{border:1px solid var(--line);padding:3px 4px;text-align:center}
.gen-tab64 th{background:var(--bg-3);color:var(--ink-3);font-weight:600}
.gen-tab64 td.on{background:color-mix(in srgb,var(--accent) 22%,var(--bg-2));font-weight:700}
.gen-tab64 td.stop{color:var(--bad);font-weight:700}
.gen-punnett{border-collapse:separate;border-spacing:4px;margin:2px 0}
.gen-punnett th,.gen-punnett td{padding:0}
.gen-punnett .gen-hd{min-width:78px;height:40px;border-radius:9px;background:var(--bg-3);border:1px solid var(--line);font-family:var(--font-m,"IBM Plex Mono",monospace);font-weight:700;font-size:.9rem;color:var(--ink);display:grid;place-items:center;padding:0 8px}
.gen-punnett .gen-hd.corner{background:transparent;border:0}
.gen-punnett .gen-hd small{display:block;font-family:"IBM Plex Sans",sans-serif;font-size:.6rem;font-weight:500;color:var(--ink-3);text-transform:uppercase;letter-spacing:.05em}
.gen-cell{min-width:120px;min-height:64px;border-radius:10px;border:2px dashed var(--line-2);background:var(--bg-2);color:var(--ink-3);font:inherit;font-size:.86rem;cursor:pointer;display:grid;place-items:center;gap:0;padding:2px 6px;width:100%}
.gen-cell b{font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:1rem;color:var(--ink)}
.gen-cell small{font-size:.66rem;color:var(--ink-2)}
.gen-cell.sel{border-color:var(--accent);border-style:solid}
.gen-cell.ok{border-style:solid;border-color:var(--ok);background:color-mix(in srgb,var(--ok) 10%,var(--bg-2))}
.gen-cell.bad{border-style:solid;border-color:var(--bad);animation:gen-shake .3s}
@keyframes gen-shake{25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
.gen-bars{display:flex;flex-direction:column;gap:9px}
.gen-bar{display:grid;grid-template-columns:minmax(120px,1.1fr) 3fr;gap:8px;align-items:center;font-size:.82rem}
.gen-bar .gen-tracks{display:flex;flex-direction:column;gap:3px}
.gen-bar .gen-tr{display:grid;grid-template-columns:1fr 66px;gap:7px;align-items:center}
.gen-bar .gen-tr .t{height:12px;background:var(--bg-3);border-radius:4px;overflow:hidden;border:1px solid var(--line)}
.gen-bar .gen-tr .t i{display:block;height:100%;background:var(--ink-3)}
.gen-bar .gen-tr.obs .t i{background:var(--accent)}
.gen-bar .gen-tr .n{font-family:var(--font-m,"IBM Plex Mono",monospace);font-size:.7rem;color:var(--ink-2);text-align:right;font-variant-numeric:tabular-nums}
.gen-ped-wrap{border:1px solid var(--line);border-radius:14px;background:radial-gradient(120% 90% at 30% 0%,color-mix(in srgb,var(--gen,var(--accent)) 6%,var(--bg-2)),var(--bg-2) 60%);padding:6px}
.gen-ped{width:100%;height:auto;max-height:440px;display:block;margin:0 auto}
.gen-ped text{font-family:"IBM Plex Sans",sans-serif;fill:var(--ink)}
.gen-ped .sym[tabindex]{cursor:pointer}
.gen-ped .sym:focus{outline:none}
/* relleno fijo en los dos temas: «relleno oscuro = afectado» tiene que ser verdad también en el tema oscuro */
.gen-ped .shape{fill:#F7F8FB;stroke:var(--ink-2);stroke-width:2.2;filter:url(#gen-f-sh);transition:stroke .15s}
.gen-ped .shape.edge{fill:none;filter:none}
.gen-ped .shape.af,.gen-ped .half{fill:#1B2436}
.gen-ped .shape.preg{stroke-dasharray:4 3;fill:#E9EDF3}
.gen-ped .sym[tabindex]:hover .shape,.gen-ped .sym:focus-visible .shape{stroke:var(--accent)}
.gen-ped .sym:focus-visible .shape:not(.edge){stroke-width:3.4}
.gen-ped .halo{fill:color-mix(in srgb,var(--accent) 14%,transparent);stroke:var(--accent);stroke-width:2.4;stroke-dasharray:5 3.5}
.gen-ped .sym.on .shape{stroke:var(--accent);stroke-width:3}
.gen-ped .sym.off{opacity:.42}
.gen-ped .back{fill:var(--bg-2);stroke:none}
.gen-ped .lnk{stroke:var(--ink-3);stroke-width:2.2;fill:none;stroke-linecap:square}
.gen-ped .lnk.mat{stroke:var(--ink-2)}
.gen-ped .gguia{stroke:var(--line);stroke-width:1;stroke-dasharray:2 5}
.gen-ped .gnum rect{fill:var(--bg-3);stroke:var(--line)}
.gen-ped .gnum text{font-size:11.5px;font-weight:700;fill:var(--ink-2);letter-spacing:.04em}
.gen-ped .cap{font-size:10px;fill:var(--ink-3)}
.gen-ped .idl{font-size:10.5px;font-weight:600;fill:var(--ink-2);font-family:var(--font-m,"IBM Plex Mono",monospace)}
.gen-ped .duda{font-size:17px;font-weight:700;fill:#3A465C}
.gen-ped .gtp rect{fill:color-mix(in srgb,var(--ok) 16%,var(--bg-2));stroke:var(--ok);stroke-width:1.2}
.gen-ped .gtp text{font-size:11.5px;font-weight:700;fill:var(--ok);font-family:var(--font-m,"IBM Plex Mono",monospace)}
.gen-ped.mini{width:20px;height:20px;max-height:none;margin:0;flex:none}
.gen-ped.mini .shape{stroke-width:2;filter:none}
.gen-pedleg{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:.78rem;color:var(--ink-2)}
.gen-pedleg>span{display:inline-flex;align-items:center;gap:6px}
.gen-pedleg-i{display:inline-flex}
.gen-mini{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px}
.gen-adn-viewer .stage{align-self:start;height:560px;position:sticky;top:14px}
@media(max-width:1100px){.gen-adn-viewer .stage{position:relative;top:auto;height:460px;min-height:0}}
.stage .lbl.gen-lbl-surco{font-style:italic;font-weight:600;background:color-mix(in srgb,var(--gen,var(--accent)) 14%,var(--bg-2));border-color:color-mix(in srgb,var(--gen,var(--accent)) 45%,var(--line))}
/* ---- v1.7 · índice ilustrado ---- */
.gen-hub .tile{overflow:hidden}
.gen-hub .tile .pill{align-self:flex-start}
.gen-hub .tipo{font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gen,var(--ink-3));margin-bottom:-4px}
.gen-thumb{display:block;margin:-18px -18px 2px;height:128px;background:radial-gradient(120% 120% at 20% 0%,color-mix(in srgb,var(--gen,var(--accent)) 16%,var(--bg-2)),color-mix(in srgb,var(--gen,var(--accent)) 5%,var(--bg-3)) 70%);border-bottom:1px solid var(--line);position:relative}
.gen-thumb svg{position:absolute;inset:4px 10px;width:calc(100% - 20px);height:calc(100% - 8px)}
.gen-hub .tile:hover .gen-thumb svg{transform:scale(1.03);transition:transform .25s}
/* ---- v1.7 · ilustraciones de cruces ---- */
.gen-prog{display:flex;gap:12px;align-items:center;margin-top:8px;padding:10px 12px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(180deg,var(--bg-2),var(--bg-3))}
.gen-prog-ill{flex:none;display:grid;place-items:center;width:92px;height:92px;border-radius:12px;background:radial-gradient(circle at 40% 35%,color-mix(in srgb,var(--bg-2) 70%,#fff),var(--bg-3) 75%);border:1px solid var(--line)}
.gen-prog-ill svg.gen-fen{width:84px;height:84px;filter:url(#gen-f-soft)}
.gen-prog-ill:has(svg.ancho){width:136px}
.gen-prog-ill svg.gen-fen.ancho{width:128px;height:85px}
.gen-prog-tx{display:flex;flex-direction:column;gap:2px;min-width:0}
.gen-prog-tx b{font-size:.92rem;line-height:1.25}
.gen-sex{font-size:1.05rem;line-height:1;color:var(--gen,var(--accent));font-weight:700}
.gen-gams{display:flex;gap:14px;flex-wrap:wrap}
.gen-gam{margin:0;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:var(--ink-3)}
.gen-gam svg{width:70px;height:70px;filter:url(#gen-f-soft)}
.gen-gam svg.esp{width:92px}
.gen-gam figcaption{display:flex;align-items:center;gap:4px}
.gen-punnett .gen-hd{gap:6px;grid-auto-flow:column;justify-content:center}
.gen-punnett .gen-hd>span:last-child{display:grid;place-items:center}
.gen-hd-ill{display:grid;place-items:center}
.gen-hd-g{width:34px;height:34px;filter:url(#gen-f-soft)}
.gen-hd-g.esp{width:44px}
.gen-cell.ok{grid-template-columns:auto 1fr;justify-items:start;text-align:left;gap:8px;padding:6px 10px}
.gen-cell-tx{display:grid;gap:1px;justify-items:inherit}
.gen-cell-ill svg.gen-fen{width:50px;height:50px;display:block;filter:url(#gen-f-soft)}
.gen-cell-ill svg.gen-fen.ancho{width:69px;height:46px}
.gen-cell.ok{animation:gen-pop .35s ease-out}
@keyframes gen-pop{0%{transform:scale(.94)}60%{transform:scale(1.03)}100%{transform:none}}
.gen-fentag{display:inline-flex;align-items:center;gap:7px;min-width:0}
.gen-mini{width:26px;height:26px;flex:none}
.gen-crias-box{display:flex;flex-direction:column;gap:8px;padding:12px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(180deg,var(--bg-2),var(--bg-3))}
.gen-crias{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:4px;max-width:560px}
.gen-cria{aspect-ratio:1;border-radius:8px;background:var(--bg-2);border:1px solid var(--line);display:grid;place-items:center;opacity:0;transform:scale(.4) translateY(6px);transition:opacity .28s ease,transform .32s cubic-bezier(.3,1.6,.5,1)}
.gen-cria.in{opacity:1;transform:none}
.gen-cria.quieto{transition:none}
.gen-cria svg{width:86%;height:86%}
.gen-crias-lg{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:.8rem}
.gen-crias-lg>span{display:inline-flex;align-items:center;gap:6px}
.gen-crias-lg b{font-size:.86rem}
@media(max-width:760px){.gen-punnett{width:100%;table-layout:fixed}.gen-punnett th:first-child{width:74px}.gen-punnett .gen-hd{grid-auto-flow:row;min-width:0;padding:4px 2px;height:auto;gap:2px}.gen-hd-g{width:26px;height:26px}.gen-hd-g.esp{width:34px}.gen-punnett .gen-cell{min-width:0;font-size:.78rem}.gen-prog-ill:has(svg.ancho){width:112px}.gen-prog-ill svg.gen-fen.ancho{width:104px;height:69px}.gen-bar{grid-template-columns:1fr}.gen-cell.ok{grid-template-columns:1fr;justify-items:center;text-align:center;padding:6px}.gen-cell-ill svg.gen-fen{width:40px;height:40px}.gen-cell-ill svg.gen-fen.ancho{width:57px;height:38px}.gen-crias{gap:3px}.gen-cria{border-radius:6px}}
</style>
<script>
/* =====================================================================
   LABORATORIO DE GENÉTICA
   Biología BGU · Unidad 4 "Genética y evolución"
   Ciencias Naturales EGB · 9.º CVT U1 "Herencia, evolución y diversidad"
   Rutas: #/explorar/genetica · #/explorar/adn · #/explorar/cruces · #/explorar/genealogia
   ===================================================================== */
Object.assign(BIO.activities, {
  'reto-adn':    { t:'Reto: edita el ADN',            unidad:null, peso:0, xp:100 },
  'reto-cruces': { t:'Reto: constructor de cruces',   unidad:null, peso:0, xp:100 }
});
try { if (typeof ACT_HREF === 'object' && ACT_HREF) Object.assign(ACT_HREF, { 'reto-adn':'#/explorar/adn', 'reto-cruces':'#/explorar/cruces' }); } catch(e){}

/* número con coma decimal, como se escribe en Ecuador */
const genN = (v, d) => (typeof v === 'number' && isFinite(v) ? v : 0).toFixed(d === undefined ? 1 : d).replace('.', ',');
const genMotion = () => (typeof motionOK === 'function' ? motionOK() : true) && !Store.s.a11y.motion;

/* ---------------------------------------------------------------- bases */
const GEN_BASE = {
  A:{ hex:'#2E9E5B', c:0x2E9E5B, n:'adenina',  tipo:'purina',     par:'T', pares:2 },
  T:{ hex:'#D8452F', c:0xD8452F, n:'timina',   tipo:'pirimidina', par:'A', pares:2 },
  C:{ hex:'#2E6BD8', c:0x2E6BD8, n:'citosina', tipo:'pirimidina', par:'G', pares:3 },
  G:{ hex:'#E0891A', c:0xE0891A, n:'guanina',  tipo:'purina',     par:'C', pares:3 },
  U:{ hex:'#8E5BD0', c:0x8E5BD0, n:'uracilo',  tipo:'pirimidina', par:'A', pares:2 }
};
const GEN_COMP = { A:'T', T:'A', C:'G', G:'C' };
const genChip = (b, extra) => h('span',{class:'gen-b'+(extra||'')}, h('i',{style:`background:${GEN_BASE[b].hex}`},b), GEN_BASE[b].n);
const genLeyenda = (rna) => h('div',{class:'gen-legend'}, (rna?['A','U','C','G']:['A','T','C','G']).map(b => genChip(b,' sm')),
  h('span',{class:'small muted'},'Cada base tiene letra y color: no dependas solo del color.'));

/* -------------------------------------------------- código genético real */
const GEN_CODIGO = {
  UUU:'Phe',UUC:'Phe',UUA:'Leu',UUG:'Leu', CUU:'Leu',CUC:'Leu',CUA:'Leu',CUG:'Leu',
  AUU:'Ile',AUC:'Ile',AUA:'Ile',AUG:'Met', GUU:'Val',GUC:'Val',GUA:'Val',GUG:'Val',
  UCU:'Ser',UCC:'Ser',UCA:'Ser',UCG:'Ser', CCU:'Pro',CCC:'Pro',CCA:'Pro',CCG:'Pro',
  ACU:'Thr',ACC:'Thr',ACA:'Thr',ACG:'Thr', GCU:'Ala',GCC:'Ala',GCA:'Ala',GCG:'Ala',
  UAU:'Tyr',UAC:'Tyr',UAA:'Alto',UAG:'Alto', CAU:'His',CAC:'His',CAA:'Gln',CAG:'Gln',
  AAU:'Asn',AAC:'Asn',AAA:'Lys',AAG:'Lys', GAU:'Asp',GAC:'Asp',GAA:'Glu',GAG:'Glu',
  UGU:'Cys',UGC:'Cys',UGA:'Alto',UGG:'Trp', CGU:'Arg',CGC:'Arg',CGA:'Arg',CGG:'Arg',
  AGU:'Ser',AGC:'Ser',AGA:'Arg',AGG:'Arg', GGU:'Gly',GGC:'Gly',GGA:'Gly',GGG:'Gly'
};
const GEN_AA = { Phe:'fenilalanina', Leu:'leucina', Ile:'isoleucina', Met:'metionina (inicio)', Val:'valina', Ser:'serina',
  Pro:'prolina', Thr:'treonina', Ala:'alanina', Tyr:'tirosina', His:'histidina', Gln:'glutamina', Asn:'asparagina',
  Lys:'lisina', Asp:'ácido aspártico', Glu:'ácido glutámico', Cys:'cisteína', Trp:'triptófano', Arg:'arginina',
  Gly:'glicina', Alto:'codón de parada (fin de la proteína)' };
const genAAn = a => GEN_AA[a] || a;
const genARN = adn => adn.replace(/T/g,'U');
const genCodones = s => s.match(/.{1,3}/g) || [];
/* traduce un ARNm desde el primer codón; devuelve los aminoácidos hasta el codón de parada (incluido) */
function genTraduce(arn){ const out = []; for (const c of genCodones(arn)){ if (c.length < 3) break; const aa = GEN_CODIGO[c] || '?'; out.push({ c, aa }); if (aa === 'Alto') break; } return out; }

/* tabla del código genético, consultable por el estudiante */
function genTabla64(resaltar){
  const B = ['U','C','A','G'];
  const filas = [];
  B.forEach(b1 => B.forEach(b2 => {
    const tds = B.map(b3 => { const cod = b1+b2+b3, aa = GEN_CODIGO[cod];
      return h('td',{class:(cod===resaltar?'on ':'')+(aa==='Alto'?'stop':''), title:`${cod} → ${genAAn(aa)}`}, cod, h('br'), aa); });
    filas.push(h('tr',{}, h('th',{}, b1+b2+'·'), ...tds));
  }));
  return h('div',{class:'tablewrap'}, h('table',{class:'gen-tab64','aria-label':'Tabla del código genético (codones del ARN mensajero)'},
    h('thead',{}, h('tr',{}, h('th',{},'1.ª y 2.ª'), ...B.map(b=>h('th',{},'3.ª: '+b)))), h('tbody',{}, filas)));
}

/* ------------------------------------------------ franja propósito/reto */
function genBanner(o){
  return h('section',{class:'reto static'+(o.done?' done':''),'aria-label':'Propósito, observación y reto de este recurso'},
    h('div',{class:'reto-body'},
      h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'1 · Propósito'), h('p',{},o.proposito)),
      h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'2 · Observa'), h('ul',{class:'checks plain'}, o.observa.map(t => h('li',{}, h('span',{class:'ck dotck','aria-hidden':'true'}), t)))),
      h('div',{class:'reto-col'}, h('span',{class:'eyebrow'},'3 · 🎯 Tu reto'), h('p',{style:'font-weight:600'},o.reto), o.statusEl || null)));
}

/* miniaturas ilustradas de las tarjetas del índice (SVG, 240 × 120) */
function genMiniatura(k){
  const W = 240, H = 120;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${ {adn:'Ilustración: doble hélice de ADN con sus pares de bases', cruces:'Ilustración: cuadro de Punnett con flores púrpuras y blancas', ped:'Ilustración: árbol genealógico de tres generaciones'}[k] }">`;
  if (k === 'adn'){
    const seq = 'ATGGTGCACCTGACTCCTGAG', A = 34, cy = 60, per = 88; let back = '', front = '', rungs = '';
    const y = (x, s) => cy + A*Math.sin((x-8)/per*Math.PI*2 + (s?Math.PI:0));
    let p0 = '', p1 = ''; for (let x=4; x<=236; x+=3){ p0 += (x===4?'M':'L') + x + ' ' + y(x,0).toFixed(1); p1 += (x===4?'M':'L') + x + ' ' + y(x,1).toFixed(1); }
    seq.split('').forEach((b,i) => { const x = 14 + i*10.6, ya = y(x,0), yb = y(x,1), ym = (ya+yb)/2, c = GEN_COMP[b];
      rungs += `<line x1="${x}" y1="${ya.toFixed(1)}" x2="${x}" y2="${ym.toFixed(1)}" stroke="${GEN_BASE[b].hex}" stroke-width="5" stroke-linecap="round"/><line x1="${x}" y1="${ym.toFixed(1)}" x2="${x}" y2="${yb.toFixed(1)}" stroke="${GEN_BASE[c].hex}" stroke-width="5" stroke-linecap="round"/>`; });
    s += `<defs><linearGradient id="gen-mt-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D3E3"/><stop offset="1" stop-color="#7C8BA6"/></linearGradient></defs>
      <path d="${p1}" stroke="#6F7E99" stroke-width="7" fill="none" stroke-linecap="round" opacity=".75"/>${rungs}
      <path d="${p0}" stroke="url(#gen-mt-a)" stroke-width="8" fill="none" stroke-linecap="round"/><path d="${p0}" stroke="#fff" stroke-width="2" fill="none" opacity=".45" transform="translate(-1 -2)"/>`;
  } else if (k === 'cruces'){
    s += `<g font-family="IBM Plex Mono,monospace" font-weight="700" font-size="11" style="fill:var(--ink-2)">`;
    s += `<use href="#gen-s-arv-p" x="4" y="16" width="56" height="56"/><text x="32" y="88" text-anchor="middle">Aa × Aa</text>`;
    const cel = [['AA','gen-s-arv-p'],['Aa','gen-s-arv-p'],['Aa','gen-s-arv-p'],['aa','gen-s-arv-b']];
    s += `<text x="118" y="16" text-anchor="middle">A</text><text x="172" y="16" text-anchor="middle">a</text><text x="80" y="47" text-anchor="middle">A</text><text x="80" y="99" text-anchor="middle">a</text>`;
    cel.forEach(([gt,id],i) => { const x = 92 + (i%2)*54, yy = 22 + Math.floor(i/2)*52;
      s += `<rect x="${x}" y="${yy}" width="50" height="48" rx="9" style="fill:var(--bg-2);stroke:var(--line)" stroke-width="1.4"/><use href="#${id}" x="${x+4}" y="${yy+1}" width="34" height="34"/><text x="${x+42}" y="${yy+42}" text-anchor="end" font-size="10">${gt}</text>`; });
    s += `<text x="220" y="58" text-anchor="middle" font-size="13" style="fill:var(--gen,var(--ink-2))">3 : 1</text><text x="220" y="74" text-anchor="middle" font-size="9" style="fill:var(--ink-3)">fenotipos</text></g>`;
  } else {
    const P = [['h',70,26,false,'half'],['m',128,26,false,'half'],['h',50,72,true],['m',99,72,false],['h',150,72,false],['m',124,108,true],['h',176,108,false]];
    s += `<g style="stroke:var(--ink-3)" stroke-width="2" fill="none"><path d="M70 26H128M99 26V50M50 50H99M50 50V72M99 50V72M99 72H150M124 72V92M124 92H176M124 92V108M176 92V108"/></g>`;
    P.forEach(([sx,x,yy,af,est]) => { const f = af ? '#1B2436' : '#F7F8FB';
      s += sx === 'h' ? `<rect x="${x-10}" y="${yy-10}" width="20" height="20" rx="3" style="fill:${f};stroke:var(--ink-2)" stroke-width="2" filter="url(#gen-f-soft)"/>` : `<circle cx="${x}" cy="${yy}" r="10.5" style="fill:${f};stroke:var(--ink-2)" stroke-width="2" filter="url(#gen-f-soft)"/>`;
      if (est) s += sx === 'h' ? `<rect x="${x-10}" y="${yy-10}" width="10" height="20" style="fill:#1B2436"/>` : `<path d="M${x} ${yy-10.5}A10.5 10.5 0 0 0 ${x} ${yy+10.5}Z" style="fill:#1B2436"/>`; });
    s += `<g font-family="IBM Plex Sans,sans-serif" font-weight="700" font-size="10" style="fill:var(--ink-3)"><text x="14" y="30">I</text><text x="14" y="76">II</text><text x="14" y="112">III</text></g>`;
    s += `<g transform="translate(196 38)"><rect x="-4" y="-16" width="44" height="22" rx="11" style="fill:color-mix(in srgb,var(--ok) 16%,var(--bg-2));stroke:var(--ok)"/><text x="18" y="-1" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="11" style="fill:var(--ok)">Aa</text></g>`;
  }
  return s + '</svg>';
}

/* ===================================================================== */
/*  ÍNDICE DEL LABORATORIO                                               */
/* ===================================================================== */
route('/explorar/genetica', (view) => {
  view.append(h('div',{class:'page-head'}, h('div',{},
    h('span',{class:'eyebrow gen'},'Genética y evolución · BGU U4 · 9.º EGB CVT U1'),
    h('h1',{},'Laboratorio de genética'),
    h('p',{},'Primero manipulas: abres la doble hélice, cambias una base, generas gametos y llenas el cuadro de Punnett. La explicación viene después, cuando ya viste qué ocurre.'))));
  const T = [
    ['#/explorar/adn','🧬','ADN en 3D','Doble hélice manipulable, emparejamiento de bases, replicación semiconservativa, transcripción y traducción, y el reto "Edita el ADN".','Consigue una mutación silenciosa, una de sentido erróneo y una sin sentido.'],
    ['#/explorar/cruces','🟪','Constructor de cruces','Elige el rasgo, define los genotipos de los progenitores, obtén los gametos y llena el cuadro de Punnett casilla por casilla.','Resuelve los tres casos del modo reto.'],
    ['#/explorar/genealogia','👨‍👩‍👧','Árbol genealógico','Tres generaciones, un rasgo recesivo: deduce el genotipo de cada persona a partir de los fenotipos.','Deduce quién es portador y quién no se puede saber.']
  ];
  genSprite();
  const g = h('div',{class:'grid g3 gen-hub'});
  T.forEach(([href,em,t,d,reto], i) => g.append(h('a',{class:'tile gen',href},
    h('span',{class:'gen-thumb',html:genMiniatura(['adn','cruces','ped'][i])}), h('span',{class:'tipo'},'Genética'), h('h3',{},t), h('p',{},d),
    h('div',{class:'res-reto'}, h('b',{},'🎯 Tu reto'), h('span',{},reto)), h('span',{class:'pill gen'},'Disponible'))));
  view.append(g);
  view.append(h('div',{style:'height:18px'}), h('div',{class:'card stack'},
    h('span',{class:'eyebrow gen'},'Antes de empezar: cuatro ideas que conviene revisar'),
    h('ul',{style:'padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:.9rem'},
      ['«El alelo dominante es el mejor o el más frecuente». Dominante solo significa que se expresa cuando está presente; el grupo sanguíneo O (recesivo) es el más frecuente en el Ecuador.',
       '«Los hijos heredan la mitad de los rasgos del papá y la mitad de la mamá, mezclados». Se heredan alelos completos, no mezclas: por eso de dos padres de ojos cafés puede nacer un hijo de ojos azules.',
       '«Una mutación siempre es mala». Muchas son silenciosas y no cambian nada; otras son la materia prima de la evolución.',
       '«El ADN está solo en el núcleo». También hay ADN en las mitocondrias y en los cloroplastos, y las bacterias no tienen núcleo.',
       '«El ARN es igual al ADN». El ARN es de una sola cadena, lleva ribosa y usa uracilo (U) en lugar de timina (T).'].map(t => h('li',{},t)))));
});

/* ===================================================================== */
/*  ADN 3D · replicación · transcripción y traducción · edita el ADN      */
/* ===================================================================== */
const ADN_SEQ0 = 'ATGGTGCACCTGACTCCTGAGTAA';   /* hebra codificante: 8 codones (inicio del gen de la beta-globina humana) */
const ADN_R = 1.55, ADN_RI = 0.18, ADN_RISE = 0.42, ADN_TWIST = Math.PI*2/10, ADN_OPEN = 1.9;

route('/explorar/adn', (view) => {
  view.classList.add('wide');
  const S = { seq: ADN_SEQ0, sel:null, open:0, replOpen:0, fork:0, replicando:false, tab:'bases', tipos:new Set(), paso:0 };
  const N = () => S.seq.length;

  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{},
    h('span',{class:'eyebrow gen'},'Genética y evolución · ADN, ARN y proteínas'),
    h('h1',{},'¿Qué pasa si cambias una sola letra del ADN?'),
    h('p',{},'Gira la doble hélice, ábrela, mira cómo se copia y cómo se lee. Después cambia una base y comprueba si el aminoácido cambia… o no.')),
    h('a',{class:'btn sm',href:'#/explorar/cruces'},'Ir a cruces →')));

  const retoSt = h('div',{class:'notice'},'Pendiente: 0 de 3 clases de mutación conseguidas.');
  view.append(genBanner({
    proposito:'Entender que el ADN es una secuencia de bases emparejadas que se copia y que se lee de tres en tres para fabricar proteínas.',
    observa:['Qué base se empareja siempre con cuál, y por qué no es al azar','Que al replicarse cada hebra nueva se queda con una hebra vieja','Que el ARN mensajero sale del núcleo y el ribosoma lo lee por codones'],
    reto:'Edita el ADN hasta conseguir las tres clases de mutación puntual: silenciosa, de sentido erróneo y sin sentido.',
    statusEl: retoSt, done: !!Store.s.activities['reto-adn']?.done }));

  const stage = h('div',{class:'stage'}), panel = h('div',{class:'panel'});
  view.append(h('div',{class:'viewer gen-adn-viewer'}, stage, panel));

  /* ---------------------------------------------------------- 3D */
  /* v1.7 · Esqueleto azúcar-fosfato con volumen (tubo continuo + fosfatos + desoxirribosas);
     cada base es un bloque cuyo extremo encaja con el de su pareja: 2 dientes en A–T y 3 en C–G
     (los puentes de hidrógeno), y la purina es más larga que la pirimidina. Las dos hebras no
     están enfrentadas a 180°: el esqueleto se desplaza hacia un lado y aparecen el surco mayor y
     el surco menor. Toda la hélice cuelga de un grupo que se orienta según la forma del escenario. */
  let E = null, raf = 0, timer = 0;
  const M = { base:[[],[]], bb:[null,null], p:[[],[]], nuevo:null, root:null, cur:0, surcos:[] };
  const UPV = new THREE.Vector3(0,1,0);
  const ADN_RB = 1.0, ADN_EPS = 0.35, ADN_GAP = 0.07, ADN_HH = 0.1, ADN_DEP = 0.2, ADN_T = 0.09;
  const lin = hx => new THREE.Color(hx).convertSRGBToLinear();
  const MAT = {};

  /* posición de cada nucleótido: B = extremo de la base (unión con el azúcar), S = azúcar, P = fosfato */
  const posNt = (i, s) => {
    const th = i*ADN_TWIST, y = (i - (N()-1)/2)*ADN_RISE, dir = s ? th + Math.PI : th;
    const ph = s ? th + Math.PI - ADN_EPS : th + ADN_EPS, sg = s ? th + Math.PI - ADN_EPS*0.5 : th + ADN_EPS*0.5;
    return { th:dir, y,
      B: new THREE.Vector3(ADN_RB*Math.cos(dir), y, ADN_RB*Math.sin(dir)),
      S: new THREE.Vector3(1.24*Math.cos(sg), y, 1.24*Math.sin(sg)),
      P: new THREE.Vector3(ADN_R*Math.cos(ph), y + (s ? -0.06 : 0.06), ADN_R*Math.sin(ph)) };
  };
  const openGlob = () => Math.max(M.cur, S.replOpen || 0);
  function cilGeo(a, b, r, seg){
    const d = new THREE.Vector3().subVectors(b, a), L = d.length() || 0.001;
    const g = new THREE.CylinderGeometry(r, r, L, seg || 6, 1);
    g.applyMatrix4(new THREE.Matrix4().compose(a.clone().addScaledVector(d, 0.5),
      new THREE.Quaternion().setFromUnitVectors(UPV, d.clone().normalize()), new THREE.Vector3(1,1,1)));
    return g;
  }
  /* bloque de base: perfil en el plano (a lo largo de la base, a lo largo del eje) con dientes o muescas */
  const GEO = {};
  function geoBase(b, fino){
    const k = b + (fino ? 'f' : '');
    if (GEO[k]) return GEO[k];
    const pur = GEN_BASE[b].tipo === 'purina', n = GEN_BASE[b].pares;
    const L = pur ? ADN_RB + 0.2 : ADN_RB - 0.2 - ADN_GAP, hh = ADN_HH*(fino ? 0.8 : 1), t = pur ? ADN_T : -ADN_T;
    const sh = new THREE.Shape(); sh.moveTo(0.02, -hh); sh.lineTo(L, -hh);
    for (let q=0; q<n; q++){ const vc = hh*((2*q+1)/n - 1), w = hh/n*0.84;
      sh.lineTo(L, vc - w); sh.lineTo(L + t, vc - w*0.66); sh.lineTo(L + t, vc + w*0.66); sh.lineTo(L, vc + w); }
    sh.lineTo(L, hh); sh.lineTo(0.02, hh); sh.lineTo(0.02, -hh);
    const dep = ADN_DEP*(fino ? 0.72 : 1);
    const g = new THREE.ExtrudeGeometry(sh, { depth:dep, bevelEnabled:true, bevelThickness:0.022, bevelSize:0.018, bevelSegments:1, curveSegments:1 });
    g.translate(0, 0, -dep/2); g.computeVertexNormals();
    return (GEO[k] = g);
  }
  /* orientación del bloque: x = hacia el eje por la línea del par, y = eje de la hélice */
  function orientaBase(m, p){
    const xin = new THREE.Vector3(-Math.cos(p.th), 0, -Math.sin(p.th)), z = new THREE.Vector3().crossVectors(xin, UPV);
    m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(xin, UPV, z));
  }
  const matBase = (b, fino) => new THREE.MeshStandardMaterial({ color:lin(GEN_BASE[b].hex), roughness:fino?0.5:0.36, metalness:0, envMapIntensity:0.9 });
  function colorea(m, b){ m.material.color.copy(lin(GEN_BASE[b].hex)); if (m.material.userData.c0) m.material.userData.c0.copy(m.material.color); }
  /* esqueleto de una hebra: tubo continuo por los fosfatos + conectores; y aparte fosfatos y azúcares */
  function esqueleto(s, rTubo, low){
    const pts = []; for (let i=0;i<N();i++) pts.push(M.p[s][i].P);
    const curva = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const SEG = low ? 5 : 8;
    const tubo = new THREE.TubeGeometry(curva, (N()-1)*SEG, rTubo, low ? 7 : 10, false);
    const conect = [], nodos = [];
    for (let i=0;i<N();i++){ const p = M.p[s][i];
      conect.push(cilGeo(p.S, p.P, rTubo*0.5, 6), cilGeo(p.B.clone().lerp(p.S, 0.15), p.S, rTubo*0.42, 6)); }
    return { tubo, conect:Kit.merge(conect), SEG, radial: low ? 7 : 10 };
  }
  function nodosGeo(s, rP, low){
    const out = [];
    for (let i=0;i<N();i++){ const p = M.p[s][i];
      const sph = new THREE.SphereGeometry(rP, low ? 9 : 13, low ? 7 : 9); sph.translate(p.P.x, p.P.y, p.P.z); out.push(sph); }
    return out;
  }
  function azucarGeo(p, r){
    const g = new THREE.CylinderGeometry(r, r, r*0.75, 5, 1);   /* anillo de cinco lados: la desoxirribosa */
    g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(UPV, new THREE.Vector3(Math.cos(p.th),0,Math.sin(p.th)).cross(UPV).normalize())));
    g.translate(p.S.x, p.S.y, p.S.z); return g;
  }
  const toW = v => v.clone().applyMatrix4(M.root.matrixWorld);

  function build3D(){
    E.spotlight = () => {};   /* la selección se marca con el contorno y el brillo de la base elegida, sin atenuar el resto */
    const low = E.low;
    M.root = new THREE.Group(); E.scene.add(M.root);
    if (M.horiz) M.root.rotation.z = -Math.PI/2;           /* eje de la hélice en horizontal */
    M.root.updateMatrixWorld(true);
    MAT.hueso = new THREE.MeshStandardMaterial({ color:lin('#A8B4C8'), roughness:0.42, metalness:0.08, envMapIntensity:0.85 });
    MAT.fosfato = new THREE.MeshStandardMaterial({ color:lin('#7F8EA8'), roughness:0.34, metalness:0.1, envMapIntensity:0.9 });
    MAT.azucar = new THREE.MeshStandardMaterial({ color:lin('#D6DDE8'), roughness:0.5, metalness:0, envMapIntensity:0.7 });
    MAT.nuevo = new THREE.MeshStandardMaterial({ color:lin('#D6BE5E'), roughness:0.42, metalness:0.05, envMapIntensity:0.85 });
    MAT.nuevoP = new THREE.MeshStandardMaterial({ color:lin('#B89A34'), roughness:0.36, metalness:0.08, envMapIntensity:0.9 });
    for (let s=0; s<2; s++) for (let i=0; i<N(); i++) M.p[s][i] = posNt(i, s);
    for (let s=0; s<2; s++){
      const sk = esqueleto(s, 0.13, low);
      const tubo = new THREE.Mesh(Kit.merge([sk.tubo, sk.conect]), MAT.hueso);
      const az = []; for (let i=0;i<N();i++) az.push(azucarGeo(M.p[s][i], 0.15));
      const nod = new THREE.Mesh(Kit.merge(nodosGeo(s, 0.19, low).concat(az)), MAT.fosfato);
      M.bb[s] = [tubo, nod];
      E.addPart(`bb-${s}`, [tubo, nod], { pickable:false });
      for (let i=0; i<N(); i++){
        const p = M.p[s][i], b = s ? GEN_COMP[S.seq[i]] : S.seq[i];
        const m = new THREE.Mesh(geoBase(b), matBase(b)); m.position.copy(p.B); orientaBase(m, p);
        M.base[s][i] = m;
        E.addPart(`nt-${s}-${i}`, [m]);
        E.addLabel(`nt-${s}-${i}`, b, [0,0,0]);
      }
    }
    /* todo cuelga del grupo raíz (addPart lo había puesto en la escena) */
    for (let s=0;s<2;s++){ M.bb[s].forEach(m => M.root.add(m)); M.base[s].forEach(m => M.root.add(m)); }
    /* surcos: se rotulan en el borde de la silueta (arriba el mayor, abajo el menor), cerca del centro */
    const arriba = M.horiz ? new THREE.Vector3(0,1,0) : new THREE.Vector3(Math.cos(E.opts.theta), 0, -Math.sin(E.opts.theta));
    [['surco-mayor','surco mayor',-Math.PI/2, 1],['surco-menor','surco menor',Math.PI/2, -1]].forEach(([id, t, off, sg]) => {
      let best = null, bd = -9;
      for (let i=Math.floor(N()*0.3); i<Math.ceil(N()*0.7); i++){ const a = i*ADN_TWIST + off, y = (i - (N()-1)/2)*ADN_RISE + ADN_RISE/2;
        const d = toW(new THREE.Vector3(Math.cos(a), y, Math.sin(a))).sub(toW(new THREE.Vector3(0, y, 0))).normalize().dot(arriba)*sg - Math.abs(i - (N()-1)/2)*0.012;
        if (d > bd){ bd = d; best = { a, y }; } }
      E.addPart(id, []);
      const ext = toW(new THREE.Vector3(2.75*Math.cos(best.a), best.y, 2.75*Math.sin(best.a)));
      const anc = toW(new THREE.Vector3(1.15*Math.cos(best.a), best.y, 1.15*Math.sin(best.a)));
      E.addLabel(id, t, [ext.x, ext.y, ext.z], [anc.x, anc.y, anc.z]);
      const l = E.labels.get(id); if (l && l.el) l.el.classList.add('gen-lbl-surco');
      M.surcos.push(id);
    });
    actualizar3D();
  }
  function buildNuevo(){
    if (M.nuevo || !E) return;
    const low = E.low;
    M.nuevo = { tubo:[null,null], nodo:[[],[]], base:[[],[]], seg:0, radial:0 };
    for (let s=0; s<2; s++){
      /* la hebra nueva s se construye sobre el molde s: ocupa el lugar de la antigua hebra 1-s */
      const sk = esqueleto(1-s, 0.1, low);
      const tubo = new THREE.Mesh(sk.tubo, MAT.nuevo); tubo.geometry.setDrawRange(0, 0);
      M.nuevo.tubo[s] = tubo; M.nuevo.seg = sk.SEG; M.nuevo.radial = sk.radial; M.root.add(tubo);
      const conect = new THREE.Mesh(sk.conect, MAT.nuevo); conect.visible = false; M.nuevo.conect = M.nuevo.conect || []; M.nuevo.conect[s] = conect; M.root.add(conect);
      for (let i=0; i<N(); i++){
        const p = M.p[1-s][i], b = s ? S.seq[i] : GEN_COMP[S.seq[i]];
        const g = new THREE.SphereGeometry(0.15, low ? 8 : 11, low ? 6 : 8); g.translate(p.P.x, p.P.y, p.P.z);
        const nodo = new THREE.Mesh(Kit.merge([g, azucarGeo(p, 0.12)]), MAT.nuevoP);
        const base = new THREE.Mesh(geoBase(b, true), matBase(b, true)); base.position.copy(p.B); orientaBase(base, p);
        nodo.visible = base.visible = false;
        M.root.add(nodo); M.root.add(base);
        M.nuevo.nodo[s][i] = nodo; M.nuevo.base[s][i] = base;
      }
    }
  }
  function actualizar3D(){
    if (!E) return;
    const sx = openGlob()*ADN_OPEN;
    for (let s=0; s<2; s++){
      const dx = sx*(s ? -1 : 1);
      if (M.bb[s]) M.bb[s].forEach(m => m.position.x = dx);
      for (let i=0; i<N(); i++){
        const p = M.p[s][i]; if (!p) continue;
        M.base[s][i].position.x = p.B.x + dx;
        const lb = E.labels.get(`nt-${s}-${i}`);
        if (lb){ const k = 1.26, w = toW(new THREE.Vector3(p.P.x*k + dx, p.P.y, p.P.z*k)); lb.pos.copy(w); }
      }
      if (M.nuevo){
        const f = S.fork;
        const tubo = M.nuevo.tubo[s]; tubo.position.x = dx;
        tubo.geometry.setDrawRange(0, Math.floor(clamp(f - 0.5, 0, N()-1)*M.nuevo.seg)*M.nuevo.radial*6);
        tubo.visible = f > 0.5;
        const cn = M.nuevo.conect[s]; cn.position.x = dx; cn.visible = f > N();
        for (let i=0; i<N(); i++){
          const p = M.p[1-s][i], vis = f > i;
          M.nuevo.nodo[s][i].visible = vis; M.nuevo.base[s][i].visible = vis;
          M.nuevo.nodo[s][i].position.x = dx;
          M.nuevo.base[s][i].position.x = p.B.x + dx;
        }
      }
    }
    const surcoVis = openGlob() < 0.04;
    M.surcos.forEach(id => E.setVisible(id, surcoVis));
  }
  function tintar(){
    if (!E) return;
    for (let i=0; i<N(); i++){
      const a = S.seq[i], c = GEN_COMP[a];
      M.base[0][i].geometry = geoBase(a); colorea(M.base[0][i], a);
      M.base[1][i].geometry = geoBase(c); colorea(M.base[1][i], c);
      const la = E.labels.get(`nt-0-${i}`), lc = E.labels.get(`nt-1-${i}`);
      if (la) la.el.textContent = a; if (lc) lc.el.textContent = c;
      if (M.nuevo){ M.nuevo.base[0][i].geometry = geoBase(c, true); colorea(M.nuevo.base[0][i], c);
        M.nuevo.base[1][i].geometry = geoBase(a, true); colorea(M.nuevo.base[1][i], a); }
    }
    if (E.selected) E.select(E.selected);
  }

  if (webglOK){
    try {
      /* encuadre según la forma del escenario: hélice horizontal si el escenario es apaisado */
      const sw = stage.clientWidth || 800, shh = stage.clientHeight || 540, asp = sw/shh;
      M.horiz = asp >= 1.0;
      const tv = Math.tan(19*Math.PI/180), th = tv*asp, Lh = (N()-1)*ADN_RISE/2 + 0.5;
      const rad = M.horiz ? Math.max((Lh + 0.8)/th, 4.9/tv) : Math.max((Lh + 1.7)/tv, 2.9/th);
      E = new Engine3D(stage, { declutter:false, radius:rad, phi:M.horiz ? 1.36 : 1.45, theta:M.horiz ? 0.22 : 0.35, minR:4, maxR:34, target:[0,0,0],
        floor:M.horiz ? -4.3 : null, floorSize:11,
        aria:'Doble hélice de ADN en 3D. Arrastra para rotar, rueda del ratón para acercar, flechas del teclado para girar. Usa la lista de nucleótidos del panel para seleccionar con el teclado.',
        onSelect:(id)=>{ if (id && id.startsWith('nt-')){ const [,s,i] = id.split('-'); seleccionar(+s, +i); } } });
      build3D();
      E.onFrame((t, dt) => {
        if (Math.abs(M.cur - S.open) < 0.001) return;
        M.cur = genMotion() ? M.cur + (S.open - M.cur)*Math.min(1, dt*5.5) : S.open;
        if (Math.abs(M.cur - S.open) < 0.002) M.cur = S.open;
        actualizar3D();
      });
    } catch(err){ console.warn('ADN 3D', err); E = null; }
  }
  if (!E) stage.append(esquema2D());

  /* alternativa 2D sin WebGL: escalera de bases seleccionable */
  function esquema2D(){
    const alto = 30, H = N()*alto + 40;
    let sv = `<svg class="gen-2d" viewBox="0 0 320 ${H}" role="img" aria-label="Esquema 2D de la doble hélice: escalera de pares de bases">`;
    sv += `<line class="lnk" x1="60" y1="20" x2="60" y2="${H-20}" stroke="#A8B4C8" stroke-width="5"/><line x1="260" y1="20" x2="260" y2="${H-20}" stroke="#A8B4C8" stroke-width="5"/>`;
    for (let i=0;i<N();i++){ const y = 30 + i*alto, b = S.seq[i], c = GEN_COMP[b];
      sv += `<line x1="60" y1="${y}" x2="260" y2="${y}" stroke="var(--line-2)" stroke-width="2"/>`;
      sv += `<g class="gen-hit" data-s="0" data-i="${i}"><rect x="72" y="${y-11}" width="24" height="22" rx="5" fill="${GEN_BASE[b].hex}"/><text x="84" y="${y+5}" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">${b}</text></g>`;
      sv += `<g class="gen-hit" data-s="1" data-i="${i}"><rect x="224" y="${y-11}" width="24" height="22" rx="5" fill="${GEN_BASE[c].hex}"/><text x="236" y="${y+5}" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">${c}</text></g>`;
      sv += `<text x="160" y="${y+4}" text-anchor="middle" font-size="10" fill="var(--ink-3)">${GEN_BASE[b].pares} puentes</text>`;
    }
    sv += '</svg>';
    const wrap = h('div',{style:'position:absolute;inset:0;overflow:auto;padding:46px 10px 40px',html:sv});
    wrap.addEventListener('click', e => { const g = e.target.closest('.gen-hit'); if (g) seleccionar(+g.dataset.s, +g.dataset.i); });
    wrap.append(h('div',{class:'notice info',style:'margin-top:10px'},'WebGL no está disponible en este equipo: aquí tienes la misma doble hélice como escalera. Toca cualquier base para ver su ficha; el resto del laboratorio funciona igual.'));
    return wrap;
  }

  /* barra superior del escenario */
  const ovl = h('div',{class:'gen-ovl'});
  const top = h('div',{class:'stage-top'});
  const oInp = h('input',{type:'range',min:0,max:100,value:0,id:'adn-open','aria-label':'Abrir la doble hélice'});
  const oOut = h('output',{},'cerrada');
  oInp.addEventListener('input', ()=>{ S.open = +oInp.value/100; oOut.value = S.open<0.02 ? 'cerrada' : S.open>0.9 ? 'totalmente abierta' : genN(S.open*100,0)+' %'; actualizar3D(); });
  top.append(h('span',{class:'gen-slider',style:'min-width:190px'}, h('label',{for:'adn-open'},'Abrir la doble hélice'), oOut, oInp),
    h('span',{class:'grow'}),
    h('button',{class:'btn sm',onclick:()=>{ if (!E) return toast('Requiere el modelo 3D.'); E.setLabels(E.labelsEl.style.display === 'none'); }},'Letras'),
    h('button',{class:'btn sm',onclick:()=>{ if (E) E.resetView(); },'aria-label':'Restablecer la vista'},'↺ Vista'));
  stage.append(top, ovl, h('div',{class:'stage-bottom'}, h('span',{class:'stage-note'},'Modelo simplificado: 10 pares de bases por vuelta; se ven el surco mayor y el surco menor.')));

  /* ---------------------------------------------------------- panel */
  const tabs = h('div',{class:'tabs',role:'tablist'}), body = h('div',{class:'stack'});
  const TABS = [['bases','Bases y parejas'],['repl','Replicación'],['arn','ARN y proteína'],['edita','Edita el ADN']];
  TABS.forEach(([id,t]) => tabs.append(h('button',{role:'tab','aria-selected':String(id===S.tab),onclick:()=>{ S.tab=id; render(); Store.log('pestana',{recurso:'adn',tab:id}); }},t)));
  panel.append(h('div',{class:'card'}, tabs, h('div',{style:'height:12px'}), body));

  function seleccionar(s, i){ S.sel = { s, i }; if (E) E.select(`nt-${s}-${i}`); Store.markSeen('adn', 'nt'); Store.log('seleccion_nucleotido',{hebra:s, pos:i}); if (S.tab!=='bases'){ S.tab='bases'; } render(); }

  function fichaNt(){
    if (!S.sel) return h('div',{class:'notice'},'Toca un nucleótido en el modelo (o en la lista de abajo) para ver su ficha. Arrastra para rotar · rueda para acercar · flechas del teclado para girar.');
    const { s, i } = S.sel; const b = s ? GEN_COMP[S.seq[i]] : S.seq[i]; const B = GEN_BASE[b];
    return h('div',{class:'stack',style:'gap:6px'},
      h('div',{class:'row',style:'justify-content:space-between'}, h('span',{class:'pill gen'}, s ? 'Hebra molde' : 'Hebra codificante'), h('span',{class:'mono small muted'},`posición ${i+1} de ${N()}`)),
      h('h3',{}, h('span',{class:'gen-b'}, h('i',{style:`background:${B.hex}`}, b), B.n)),
      h('div',{class:'kv'},
        h('dt',{},'Tipo de base'), h('dd',{}, B.tipo + (B.tipo==='purina' ? ' (anillo doble, más grande)' : ' (anillo simple, más pequeña)')),
        h('dt',{},'Se empareja con'), h('dd',{}, GEN_BASE[B.par].n+' ('+B.par+')'),
        h('dt',{},'Puentes de hidrógeno'), h('dd',{}, B.pares+' puentes'+(B.pares===3?' · por eso los pares C–G son más difíciles de separar':'')),
        h('dt',{},'Partes del nucleótido'), h('dd',{},'fosfato + desoxirribosa (azúcar) + base nitrogenada')),
      h('p',{class:'small muted'},'Una purina siempre se empareja con una pirimidina: así el ancho de la hélice es constante (2 nm). Si se emparejaran dos purinas, la escalera se deformaría.'));
  }

  /* emparejamiento comprobable: arrastrar la base o elegirla con el teclado */
  function empareja(){
    const molde = 'ATGC'.split('');
    const st = { slots: molde.map(()=>null), sel:null, errores:0, ok:false };
    const wrap = h('div',{class:'stack',style:'gap:8px'});
    const fb = h('div',{class:'notice',style:'display:none'});
    const fila = h('div',{class:'gen-pick'}), slots = h('div',{class:'gen-pick'});
    const chips = h('div',{class:'gen-pick'});
    molde.forEach(b => fila.append(h('span',{class:'gen-nt ro',style:`background:${GEN_BASE[b].hex}`,'aria-label':GEN_BASE[b].n},b)));
    function poner(k, b){
      const esperado = GEN_COMP[molde[k]];
      if (b === esperado){ st.slots[k] = b; pinta(); comprobar(); fb.className='notice ok'; fb.innerHTML = `<span><b>Correcto.</b> ${esc(GEN_BASE[molde[k]].n)} (${molde[k]}) se empareja con ${esc(GEN_BASE[b].n)} (${b}) mediante ${GEN_BASE[b].pares} puentes de hidrógeno.</span>`; }
      else { st.errores++; fb.className='notice warn';
        const msg = (GEN_BASE[b].tipo === GEN_BASE[molde[k]].tipo)
          ? `${b} y ${molde[k]} son las dos ${GEN_BASE[b].tipo}s: dos bases del mismo tipo no caben (o sobra o falta espacio). Frente a una purina va siempre una pirimidina.`
          : `${molde[k]} no se empareja con ${b}: A va con T (2 puentes) y C va con G (3 puentes). Prueba con ${esperado}.`;
        fb.innerHTML = `<span><b>Aún no.</b> ${esc(msg)}</span>`; }
      fb.style.display='flex'; Store.log('respuesta',{pregunta:'emparejamiento-adn', opcion:b, correcto:b===esperado});
    }
    function comprobar(){ if (st.ok) return; if (st.slots.every((v,k)=>v===GEN_COMP[molde[k]])){ st.ok = true; Store.markSeen('adn','pares');
      wrap.append(h('div',{class:'notice ok'},'Hebra complementaria completa. Fíjate en que no hiciste ninguna elección libre: conocida una hebra, la otra queda determinada. Por eso el ADN se puede copiar.')); } }
    function pinta(){ slots.innerHTML='';
      molde.forEach((mb,k) => { const v = st.slots[k];
        const btn = h('button',{class:'gen-slot'+(v?' ok':'')+(st.sel===k?' on':''),style:v?`background:${GEN_BASE[v].hex}`:'', 'aria-label':`Base complementaria de ${GEN_BASE[mb].n} en la posición ${k+1}${v?': '+v:': vacía'}`,
          onclick:()=>{ st.sel = st.sel===k?null:k; pinta(); }}, v || '?');
        btn.addEventListener('dragover', e => { e.preventDefault(); btn.classList.add('on'); });
        btn.addEventListener('dragleave', ()=>btn.classList.remove('on'));
        btn.addEventListener('drop', e => { e.preventDefault(); btn.classList.remove('on'); poner(k, e.dataTransfer.getData('text/plain')); });
        slots.append(btn); }); }
    ['A','T','C','G'].forEach(b => { const c = h('button',{class:'gen-nt',draggable:'true',style:`background:${GEN_BASE[b].hex}`,'aria-label':`Colocar ${GEN_BASE[b].n}`,
      onclick:()=>{ if (st.sel===null) return toast('Primero elige una casilla vacía (o arrastra la base hasta ella).'); poner(st.sel, b); st.sel=null; pinta(); }}, b);
      c.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', b)); chips.append(c); });
    pinta();
    wrap.append(h('span',{class:'eyebrow gen'},'Comprueba el emparejamiento'),
      h('p',{class:'small muted'},'Esta es una hebra molde. Completa la hebra complementaria: arrastra cada base hasta su casilla o, con el teclado, elige primero la casilla y después la base.'),
      h('div',{class:'stack',style:'gap:4px'}, h('span',{class:'small muted'},'Hebra molde'), fila, h('span',{class:'small muted'},'Hebra complementaria'), slots),
      chips, fb);
    return wrap;
  }

  /* ------------------------------------------------ replicación */
  function replicar(){
    if (!E) return toast('La animación de la replicación requiere el modelo 3D. Abajo tienes la explicación paso a paso.');
    buildNuevo(); S.replicando = true; S.fork = 0; S.replOpen = 0; oInp.value = 0; S.open = 0; oOut.value='cerrada';
    if (!genMotion()){ S.replOpen = 1; S.fork = N()+1; actualizar3D(); render(); return; }
    cancelAnimationFrame(raf); let last = performance.now();
    const paso = (now) => { const dt = Math.min((now-last)/1000, 0.05); last = now;
      if (S.replOpen < 1) S.replOpen = Math.min(1, S.replOpen + dt*1.5); else S.fork += dt*11;
      actualizar3D();
      if (S.fork < N()+1) raf = requestAnimationFrame(paso); else { S.fork = N()+1; actualizar3D(); render(); }
    };
    raf = requestAnimationFrame(paso);
    Store.log('animacion',{recurso:'adn', animacion:'replicacion'});
  }
  function boxRepl(){
    const box = h('div',{class:'stack'});
    box.append(h('span',{class:'eyebrow gen'},'Replicación semiconservativa'),
      h('p',{class:'small muted'},'Primero mírala y después lee la explicación: la helicasa separa las dos hebras y cada una sirve de molde para una hebra nueva.'),
      h('div',{class:'row'},
        h('button',{class:'btn primary sm',onclick:replicar},'▶ Replicar el ADN'),
        h('button',{class:'btn sm',onclick:()=>{ cancelAnimationFrame(raf); S.fork=0; S.replOpen=0; S.replicando=false; actualizar3D(); render(); }},'↺ Reiniciar')));
    if (S.replicando && S.fork > N()) box.append(h('div',{class:'notice ok'},h('span',{},h('b',{},'Dos moléculas idénticas. '),'Cada una conserva una hebra original (gris) y una hebra nueva (amarilla). Por eso la replicación se llama semiconservativa: nunca se fabrica una molécula totalmente nueva.')));
    box.append(h('div',{class:'gen-legend'},
      h('span',{class:'gen-b sm'}, h('i',{style:'background:#A8B4C8'},'V'),'hebra vieja (molde)'),
      h('span',{class:'gen-b sm'}, h('i',{style:'background:#D6BE5E'},'N'),'hebra nueva'),
      h('span',{class:'small muted'},'Además del color, las hebras nuevas son más delgadas.')));
    box.append(h('ol',{style:'padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:.88rem'},
      ['La helicasa rompe los puentes de hidrógeno y abre la doble hélice: se forma la horquilla de replicación.',
       'Cada hebra queda expuesta y actúa como molde. No hay que inventar nada: la secuencia de la hebra nueva está determinada por el emparejamiento A–T y C–G.',
       'La ADN polimerasa coloca los nucleótidos complementarios uno a uno y corrige errores.',
       'Resultado: dos moléculas idénticas, cada una con una hebra vieja y una nueva.'].map(t=>h('li',{},t))));
    box.append(quizBlock({ q:'Si una de las dos hebras dice 5\'-ATGCC-3\', ¿qué dirá la hebra nueva que se copia sobre ella?',
      ops:['ATGCC, porque la copia es idéntica','TACGG, porque cada base se empareja con su complementaria','Cualquier secuencia, porque la polimerasa elige'],
      ok:1, fb:'La hebra nueva es complementaria, no idéntica: A con T, T con A, G con C y C con G. La molécula final sí es idéntica a la original porque une el molde con su complementaria.',
      wrong:['La hebra nueva no copia letra por letra: se empareja. La molécula completa (molde + nueva) sí resulta idéntica a la original.','La polimerasa no elige: la secuencia del molde determina la de la hebra nueva. Eso es lo que hace fiable la herencia.'] },
      ()=>{ Store.markSeen('adn','replicacion'); Store.addXP(10,'Replicación del ADN'); }));
    return box;
  }

  /* --------------------------------- transcripción y traducción */
  function boxARN(){
    const arn = genARN(S.seq), aas = genTraduce(arn), cods = genCodones(arn);
    const total = 3 + aas.length;   /* 0 ADN · 1 transcripción · 2 salida del núcleo · 3.. traducción */
    const box = h('div',{class:'stack'+(genMotion()?'':' gen-quieto')});
    const nucleo = h('div',{class:'gen-box nuc'}, h('span',{class:'gen-tag'},'Núcleo'));
    const cito = h('div',{class:'gen-box'}, h('span',{class:'gen-tag'},'Citoplasma'));
    const p = S.paso;

    nucleo.append(h('div',{class:'stack',style:'gap:4px'},
      h('span',{class:'small muted'},'ADN · hebra codificante'),
      h('code',{class:'mono',style:'font-size:.84rem;letter-spacing:.06em'}, S.seq.match(/.{1,3}/g).join(' ')),
      h('span',{class:'small muted'},'ADN · hebra molde (la que se copia)'),
      h('code',{class:'mono',style:'font-size:.84rem;letter-spacing:.06em;color:var(--ink-3)'}, S.seq.split('').map(b=>GEN_COMP[b]).join('').match(/.{1,3}/g).join(' '))));
    if (p === 1) nucleo.append(h('div',{class:'notice info'},h('span',{},h('b',{},'Transcripción. '),'La ARN polimerasa lee la hebra molde y construye el ARN mensajero. Ojo: donde el ADN tendría timina (T), el ARN pone uracilo (U); y el ARN es de una sola cadena.')),
      h('code',{class:'mono',style:'font-size:.9rem;letter-spacing:.08em;color:var(--gen,var(--accent))'}, cods.join(' ')));

    const strip = h('div',{class:'gen-strip'});
    const ribo = h('div',{class:'gen-ribo','aria-hidden':'true',title:'Ribosoma'},'▼');
    const leidos = Math.max(0, p-3);
    cods.forEach((c,k) => strip.append(h('div',{class:'gen-cod'+(k<leidos?' leido':'')+(k===leidos && p>=3?' lee':'')}, c, h('small',{}, k<leidos||k===leidos&&p>=3 ? (GEN_CODIGO[c]||'?') : '·'))));
    if (p >= 3){ ribo.style.transform = `translateX(${Math.min(leidos, cods.length-1)*68}px)`; strip.append(ribo); }
    if (p >= 2) cito.append(h('div',{class:'stack',style:'gap:4px'}, h('span',{class:'small muted'},'ARN mensajero · leído de tres en tres (codones)'), strip,
      p >= 3 ? h('span',{class:'small muted'},'▼ = ribosoma: señala el codón que está leyendo.') : null));
    else cito.append(h('p',{class:'small muted'},'Todavía no ha llegado el ARN mensajero. El ADN no sale del núcleo: sale su copia.'));
    if (p >= 3){
      const prot = h('div',{class:'gen-prot'});
      aas.slice(0, Math.min(leidos + 1, aas.length)).forEach(a => prot.append(a.aa === 'Alto'
        ? h('span',{class:'gen-aa-chip',style:'background:color-mix(in srgb,var(--bad) 12%,var(--bg-2))'},'⛔ alto')
        : h('span',{class:'gen-aa-chip',title:genAAn(a.aa)}, a.aa)));
      cito.append(h('div',{class:'stack',style:'gap:4px'}, h('span',{class:'small muted'},'Proteína en construcción'), prot));
    }

    const nota = [
      'Estado inicial: el ADN está guardado en el núcleo. También hay ADN en las mitocondrias y en los cloroplastos, y las bacterias, que no tienen núcleo, lo llevan suelto en el citoplasma.',
      'Transcripción: se copia solo el gen que hace falta, y se copia a ARN (una sola cadena, con uracilo en lugar de timina).',
      'El ARN mensajero sale del núcleo por un poro nuclear. El ADN se queda: es el archivo maestro y no puede arriesgarse fuera.',
      'El ribosoma se une al ARN mensajero y lee el primer codón. AUG significa metionina y además es la señal de inicio.'
    ][Math.min(p,3)];
    const paso3 = p > 3 ? `El ribosoma lee el codón ${cods[leidos-1]}: según la tabla del código genético corresponde a ${genAAn(aas[leidos-1] ? aas[leidos-1].aa : '?')}. El ARN de transferencia trae ese aminoácido y lo une a la cadena.` : null;

    const ctrl = h('div',{class:'row'},
      h('button',{class:'btn sm',onclick:()=>{ S.paso = Math.max(0, S.paso-1); render(); },disabled:p===0?'':null},'← Atrás'),
      h('button',{class:'btn primary sm',onclick:()=>{ S.paso = Math.min(total, S.paso+1); render(); },disabled:p>=total?'':null},'Siguiente paso →'),
      h('button',{class:'btn sm',onclick:()=>{ S.paso = 0; render(); }},'↺ Reiniciar'),
      h('button',{class:'btn sm ghost',onclick:()=>openModal(h('div',{class:'stack'}, h('h3',{},'Tabla del código genético'),
        h('p',{class:'small muted'},'Codones del ARN mensajero. 64 codones para 20 aminoácidos: por eso varios codones significan lo mismo (el código es degenerado) y por eso existen las mutaciones silenciosas.'),
        genTabla64(p>3 ? cods[leidos-1] : 'AUG'), h('button',{class:'btn',onclick:closeModal},'Cerrar')))},'📖 Consultar la tabla'));

    box.append(h('span',{class:'eyebrow gen'},`Transcripción y traducción · paso ${p+1} de ${total+1}`),
      h('div',{class:'gen-flow'}, nucleo, h('div',{class:'small muted',style:'text-align:center'}, p>=2 ? '↓ el ARNm sale por un poro nuclear ↓' : '↓ poro nuclear ↓'), cito),
      h('div',{class:'notice'}, h('span',{}, h('b',{},'Qué está pasando: '), paso3 || nota)), ctrl, genLeyenda(true));
    if (p >= total) { box.append(h('div',{class:'notice ok'},`Proteína terminada: ${aas.filter(a=>a.aa!=='Alto').map(a=>genAAn(a.aa)).join(' – ')}. El codón de parada no aporta aminoácido: solo indica el final.`));
      Store.markSeen('adn','traduccion'); }
    return box;
  }

  /* ------------------------------------------------ edita el ADN */
  function clasifica(seq){
    const o = genTraduce(genARN(ADN_SEQ0)), n = genTraduce(genARN(seq));
    if (seq === ADN_SEQ0) return null;
    let i = 0; while (i < ADN_SEQ0.length && ADN_SEQ0[i] === seq[i]) i++;
    const k = Math.floor(i/3);                       /* codón afectado */
    const vo = o[k] ? o[k].aa : null, vn = n[k] ? n[k].aa : null;
    const cod = genCodones(genARN(seq))[k];
    if (k === 0 && cod !== 'AUG') return { tipo:'inicio', k, cod, txt:`Cambiaste el codón de inicio: ahora dice ${cod} y no AUG. Sin señal de inicio el ribosoma no sabe dónde empezar a leer y la proteína no se fabrica. Es una mutación grave.` };
    if (vo === 'Alto' && vn !== 'Alto') return { tipo:'parada', k, cod, txt:`Destruiste el codón de parada: el ribosoma sigue leyendo más allá del final del gen y produce una proteína alargada y casi siempre inservible.` };
    if (vo === vn) return { tipo:'silenciosa', k, cod, txt:`El codón cambió de ${o[k].c} a ${cod}, pero los dos significan ${genAAn(vn)}: la proteína es idéntica. Ocurre porque el código genético es degenerado (64 codones para 20 aminoácidos), sobre todo cuando cambia la tercera base.` };
    if (vn === 'Alto') return { tipo:'sinsentido', k, cod, txt:`El codón ${cod} es una señal de parada: la traducción se detiene en el aminoácido ${k} y se obtiene una proteína truncada, casi siempre no funcional.` };
    return { tipo:'sentido', k, cod, txt:`El codón pasó de ${o[k].c} (${genAAn(vo)}) a ${cod} (${genAAn(vn)}): la proteína tiene un aminoácido distinto. Puede no notarse, o cambiarlo todo.`,
      extra: (k===6 && vn==='Val') ? 'Este cambio exacto (ácido glutámico → valina en la sexta posición de la beta-globina) es el que produce la anemia falciforme. La misma mutación, en zonas con malaria, da a los portadores cierta protección: por eso una mutación no es "buena" ni "mala" en abstracto, depende del ambiente.' : null };
  }
  function boxEdita(){
    const box = h('div',{class:'stack'});
    const info = clasifica(S.seq);
    const cods = genCodones(S.seq), arnC = genCodones(genARN(S.seq)), prot = genTraduce(genARN(S.seq));
    const seq = h('div',{class:'gen-seq'});
    cods.forEach((c,k) => {
      const trio = h('div',{class:'gen-trio'});
      c.split('').forEach((b,j) => { const idx = k*3+j;
        trio.append(h('button',{class:'gen-nt',style:`background:${GEN_BASE[b].hex}`,'aria-label':`Base ${idx+1}: ${GEN_BASE[b].n}. Pulsa para cambiarla.`,
          onclick:()=>menuBase(idx)}, b)); });
      const aa = prot[k] ? prot[k].aa : '—';
      seq.append(h('div',{class:'gen-codon'+(info && info.k===k?' mut':'')},
        h('span',{class:'gen-cnum'},'codón '+(k+1)), trio,
        h('span',{class:'gen-aa'}, arnC[k], h('br'), aa)));
    });
    function menuBase(idx){
      const actual = S.seq[idx];
      const m = h('div',{class:'stack'}, h('h3',{},`Cambiar la base ${idx+1} (ahora ${actual}: ${GEN_BASE[actual].n})`),
        h('p',{class:'small muted'},'Al cambiar una base del ADN cambia también su pareja en la otra hebra, y cambia el codón del ARN mensajero.'));
      const fila = h('div',{class:'gen-pick'});
      ['A','T','C','G'].forEach(b => fila.append(h('button',{class:'gen-nt',style:`background:${GEN_BASE[b].hex}`,'aria-label':`Poner ${GEN_BASE[b].n}`,disabled:b===actual?'':null,
        onclick:()=>{ S.seq = S.seq.slice(0,idx)+b+S.seq.slice(idx+1); closeModal(); tintar(); actualizar3D(); S.paso = 0;
          const r = clasifica(S.seq); if (r && ['silenciosa','sentido','sinsentido'].includes(r.tipo)) S.tipos.add(r.tipo);
          Store.log('mutacion',{posicion:idx, base:b, tipo:r?r.tipo:'original'}); marcarReto(); render(); }}, b)));
      m.append(fila, h('button',{class:'btn',style:'align-self:flex-start',onclick:closeModal},'Cancelar'));
      openModal(m);
    }
    box.append(h('span',{class:'eyebrow gen'},'Edita el ADN'),
      h('p',{class:'small muted'},'Toca cualquier base y cámbiala. Debajo de cada codón verás el codón del ARN mensajero y el aminoácido que le corresponde según la tabla del código genético.'),
      seq, genLeyenda(false));
    box.append(h('div',{class:'notice'+(info?(info.tipo==='silenciosa'?' ok':info.tipo==='sentido'?' warn':' bad'):'')},
      h('span',{}, info ? h('b',{}, ({silenciosa:'Mutación silenciosa. ',sentido:'Mutación de sentido erróneo. ',sinsentido:'Mutación sin sentido. ',inicio:'Pérdida del codón de inicio. ',parada:'Pérdida del codón de parada. '})[info.tipo]) : h('b',{},'Secuencia original. '),
        info ? info.txt : 'Esta es la secuencia de partida: los ocho primeros codones del gen de la beta-globina humana. Cambia una base y observa qué pasa.')));
    if (info && info.extra) box.append(h('div',{class:'notice info'}, h('span',{}, h('b',{},'Dato: '), info.extra)));
    box.append(h('div',{class:'row'},
      h('button',{class:'btn sm',onclick:()=>{ S.seq = ADN_SEQ0; tintar(); actualizar3D(); S.paso=0; render(); }},'↺ Restaurar el gen original'),
      h('button',{class:'btn sm ghost',onclick:()=>{ if (!info) return toast('Primero cambia una base.'); Store.addNote('observacion',`Edita el ADN · ${info.tipo}: ${info.txt}`); toast('Guardado en tu cuaderno de campo.'); }},'Guardar en cuaderno'),
      h('button',{class:'btn sm ghost',onclick:()=>openModal(h('div',{class:'stack'}, h('h3',{},'Tabla del código genético'), genTabla64(info?info.cod:'GAG'.replace(/T/g,'U')), h('button',{class:'btn',onclick:closeModal},'Cerrar')))},'📖 Tabla')));
    const faltan = ['silenciosa','sentido','sinsentido'].filter(t=>!S.tipos.has(t));
    box.append(h('ul',{class:'checks'}, [['silenciosa','Mutación silenciosa (el aminoácido no cambia)'],['sentido','Mutación de sentido erróneo (cambia el aminoácido)'],['sinsentido','Mutación sin sentido (aparece un codón de parada)']]
      .map(([k,t]) => h('li',{class:S.tipos.has(k)?'ok':''}, h('span',{class:'ck','aria-hidden':'true'}, S.tipos.has(k)?'✓':''), t))));
    if (faltan.length) box.append(h('p',{class:'small muted'},'Pista: fíjate en el codón 7 (GAG). Cambiando una sola de sus tres bases se pueden obtener las tres clases de mutación.'));
    return box;
  }
  function marcarReto(){
    const n = ['silenciosa','sentido','sinsentido'].filter(t=>S.tipos.has(t)).length;
    if (n < 3){ retoSt.className='notice'; retoSt.textContent = `Pendiente: ${n} de 3 clases de mutación conseguidas.`; return; }
    retoSt.className='notice ok';
    retoSt.innerHTML = '<span><b>¡Reto resuelto!</b> Conseguiste las tres clases de mutación puntual. Conclusión: un mismo tipo de cambio (una sola base) puede no tener ningún efecto, cambiar un aminoácido o cortar la proteína. Una mutación no es «mala» por definición.</span>';
    if (!Store.s.activities['reto-adn']?.done) Store.completeActivity('reto-adn', { score:'3 tipos de mutación' });
  }

  function listaNt(){
    const ul = h('div',{class:'gen-pick','aria-label':'Nucleótidos de la hebra codificante'});
    S.seq.split('').forEach((b,i) => ul.append(h('button',{class:'gen-nt',style:`background:${GEN_BASE[b].hex}`,'aria-pressed':String(!!S.sel && S.sel.i===i && S.sel.s===0),
      'aria-label':`Nucleótido ${i+1}: ${GEN_BASE[b].n}`,onclick:()=>seleccionar(0,i)}, b)));
    return h('div',{class:'stack',style:'gap:5px'}, h('span',{class:'eyebrow'},'Hebra codificante · selecciona con el teclado'), ul);
  }

  function render(){
    $$('button',tabs).forEach((b,i)=>b.setAttribute('aria-selected', String(TABS[i][0]===S.tab)));
    body.innerHTML = '';
    if (S.tab === 'bases') body.append(fichaNt(), h('div',{style:'height:10px'}), listaNt(), h('div',{style:'height:10px'}), empareja());
    else if (S.tab === 'repl') body.append(boxRepl());
    else if (S.tab === 'arn') body.append(boxARN());
    else body.append(boxEdita());
  }
  render(); marcarReto();

  /* ----------------------------------------- cierre: comprobación */
  const cierre = h('div',{class:'stack'}, h('span',{class:'eyebrow gen'},'Comprueba lo que entendiste'));
  let hechas = 0; const marcar = () => { if (++hechas === 3) Store.addXP(15,'Comprobación del ADN'); };
  cierre.append(quizBlock({ q:'Después de editar el ADN, ¿cuál de estas afirmaciones es correcta?',
    ops:['Toda mutación es dañina, porque altera el ADN','Una mutación puede ser silenciosa, perjudicial o incluso ventajosa según el cambio y el ambiente','Las mutaciones solo ocurren si te expones a radiación'],
    ok:1, fb:'Muchas mutaciones no cambian el aminoácido (silenciosas), otras cambian uno solo y pueden no notarse, algunas son perjudiciales y unas pocas resultan ventajosas. Sin mutaciones no habría variabilidad y, sin variabilidad, no habría evolución.',
    wrong:['Acabas de producir mutaciones silenciosas: el aminoácido no cambió y la proteína es idéntica. «Alterar el ADN» no equivale a «hacer daño».','La radiación y algunas sustancias las aumentan, pero también ocurren de forma espontánea por errores de copia en cada división celular.'] }, marcar));
  cierre.append(quizBlock({ q:'¿Dónde hay ADN en una célula vegetal?',
    ops:['Solo en el núcleo','En el núcleo, en las mitocondrias y en los cloroplastos','Solo en los ribosomas, que son los que fabrican proteínas'],
    ok:1, fb:'Además del ADN nuclear, las mitocondrias y los cloroplastos tienen su propio ADN circular, herencia de su origen bacteriano. Y las bacterias, sin núcleo, llevan el suyo en el citoplasma.',
    wrong:['Es la idea más extendida, pero incompleta: las mitocondrias y los cloroplastos tienen ADN propio, y las bacterias ni siquiera tienen núcleo.','Los ribosomas no guardan ADN: leen ARN mensajero. Están hechos de ARN ribosómico y proteínas.'] }, marcar));
  cierre.append(quizBlock({ q:'Una diferencia correcta entre el ADN y el ARN mensajero es que…',
    ops:['son la misma molécula con distinto nombre según dónde esté','el ARN es de una sola cadena, lleva ribosa y usa uracilo donde el ADN usa timina','el ARN tiene cuatro bases y el ADN tiene cinco'],
    ok:1, fb:'ADN: doble cadena, desoxirribosa, bases A-T-C-G, se queda en el núcleo. ARN mensajero: una sola cadena, ribosa, bases A-U-C-G, sale al citoplasma. El ARN es una copia de trabajo, no el archivo.',
    wrong:['No lo son: se diferencian en el azúcar, en el número de cadenas y en una de las bases. El ADN no sale del núcleo; su copia de ARN sí.','Cada uno usa cuatro bases: el ADN A-T-C-G y el ARN A-U-C-G.'] }, marcar));
  view.append(h('div',{style:'height:16px'}), h('div',{class:'card'}, cierre));

  return { unmount(){ cancelAnimationFrame(raf); clearTimeout(timer); if (E) E.dispose(); E = null; } };
});

/* ===================================================================== */
/*  CONSTRUCTOR DE CRUCES · CUADRO DE PUNNETT                             */
/* ===================================================================== */
const GEN_SUP = { XD:'Xᴰ', Xd:'Xᵈ', Y:'Y' };
function genRasgoBase(o){
  const R = Object.assign({ sexual:false }, o);
  R.parse = g => { const out = []; let i = 0; while (i < g.length){ const t = R.orden.find(x => g.startsWith(x, i)); if (!t){ i++; continue; } out.push(t); i += t.length; } return out; };
  R.comb = (a,b) => [a,b].sort((x,y)=>R.orden.indexOf(x)-R.orden.indexOf(y)).join('');
  R.disp = g => R.parse(g).map(t => GEN_SUP[t] || t).join('');
  R.dispT = t => GEN_SUP[t] || t;
  return R;
}
const GEN_RASGOS = {
  flor: genRasgoBase({ id:'flor', n:'Color de flor (arveja)', tipo:'Dominancia completa', orden:['A','a'],
    gen:'Un gen con dos alelos: A (púrpura) domina sobre a (blanca).',
    madre:['AA','Aa','aa'], padre:['AA','Aa','aa'],
    fen: g => g.includes('A') ? 'Flor púrpura' : 'Flor blanca',
    nota:'Es el cruce clásico de Mendel. Fíjate en que aa y Aa se ven distintos, pero AA y Aa se ven iguales: el fenotipo no revela el genotipo.' }),
  dondiego: genRasgoBase({ id:'dondiego', n:'Color de flor del dondiego de noche', tipo:'Dominancia incompleta', orden:['R','B'],
    gen:'R (rojo) y B (blanco) no se dominan: el heterocigoto RB es intermedio.',
    madre:['RR','RB','BB'], padre:['RR','RB','BB'],
    fen: g => g === 'RR' ? 'Flor roja' : g === 'BB' ? 'Flor blanca' : 'Flor rosada',
    nota:'Aquí sí se ve una especie de "mezcla" en el fenotipo, pero los alelos no se mezclan: el cruce de dos rosadas vuelve a dar rojas y blancas. La mezcla es del color, no de los genes.' }),
  sangre: genRasgoBase({ id:'sangre', n:'Grupo sanguíneo ABO', tipo:'Codominancia y alelos múltiples', orden:['A','B','O'],
    gen:'Tres alelos: Iᴬ y Iᴮ son codominantes entre sí y los dos dominan sobre i (aquí escritos A, B y O).',
    madre:['AA','AO','BB','BO','AB','OO'], padre:['AA','AO','BB','BO','AB','OO'],
    fen: g => { const A = g.includes('A'), B = g.includes('B'); return A && B ? 'Grupo AB' : A ? 'Grupo A' : B ? 'Grupo B' : 'Grupo O'; },
    nota:'En AB los dos alelos se expresan a la vez y completos (codominancia): la persona tiene los dos antígenos, no un antígeno intermedio. El grupo O, que es el recesivo, es el más frecuente en el Ecuador: dominante no significa frecuente.' }),
  ojos: genRasgoBase({ id:'ojos', n:'Color de ojos (modelo simplificado)', tipo:'Dominancia completa', orden:['C','c'],
    gen:'C (café) domina sobre c (azul). Modelo simplificado de un solo gen.',
    madre:['CC','Cc','cc'], padre:['CC','Cc','cc'],
    fen: g => g.includes('C') ? 'Ojos cafés' : 'Ojos azules',
    nota:'En la realidad el color de ojos depende de varios genes (es poligénico), por eso hay tantos tonos. Este modelo de un solo gen sirve para entender la herencia, pero no lo uses para predecir el color de ojos de un bebé real.' }),
  daltonismo: genRasgoBase({ id:'daltonismo', n:'Daltonismo (ligado al cromosoma X)', tipo:'Herencia ligada al sexo', sexual:true, orden:['XD','Xd','Y'],
    gen:'El gen está en el cromosoma X. Xᴰ (visión normal) domina sobre Xᵈ (daltonismo). El cromosoma Y no lleva ese gen.',
    madre:['XDXD','XDXd','XdXd'], padre:['XDY','XdY'],
    fen: g => g.includes('Y')
      ? (g.includes('Xd') ? 'Hombre daltónico' : 'Hombre con visión normal')
      : (g === 'XdXd' ? 'Mujer daltónica' : g === 'XDXd' ? 'Mujer portadora (visión normal)' : 'Mujer con visión normal, no portadora'),
    nota:'El hombre tiene un solo X: con un único alelo Xᵈ ya es daltónico, no hay un segundo X que lo compense. Por eso el daltonismo es mucho más frecuente en hombres, y casi siempre lo hereda de su madre.' })
};

/* ===================================================================== */
/*  ILUSTRACIONES SVG DEL LABORATORIO (v1.7)                              */
/*  Un único «sprite» con degradados y símbolos que se reutilizan con     */
/*  <use>: flores, glóbulos, ojos, láminas de Ishihara, gametos y         */
/*  símbolos de pedigrí. Luz desde arriba a la izquierda.                 */
/* ===================================================================== */
function genRng(seed){ let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function genSprite(){
  if (document.getElementById('gen-sprite')) return;
  const lg = (id, a, b, x2, y2) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2||0}" y2="${y2===undefined?1:y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const rg = (id, stops, cx, cy, r) => `<radialGradient id="${id}" cx="${cx||0.5}" cy="${cy||0.5}" r="${r||0.5}">${stops.map(([o,c,op]) => `<stop offset="${o}" stop-color="${c}"${op!==undefined?` stop-opacity="${op}"`:''}/>`).join('')}</radialGradient>`;
  let d = '';
  /* ---- degradados ---- */
  d += lg('gen-g-leaf','#7DB85A','#3E7A34');
  d += lg('gen-g-arv-p','#C08BE0','#5E2388') + lg('gen-g-arv-p2','#D3A8EC','#7E3FAC');
  d += lg('gen-g-arv-b','#FFFFFF','#E4DDEE') + lg('gen-g-arv-b2','#FFFFFF','#EEE9F4');
  [['r','#6E0718','#C8102E','#EC5A70','#9E1030'],['k','#B03C72','#EE7FAE','#FBC3DA','#C9578A'],['b','#D9D2A8','#F7F3EE','#FFFFFF','#CFC8CC']].forEach(([k,t,m,e,tb]) => {
    d += rg('gen-g-don-'+k, [[0,t],[0.22,m],[1,e]], 0.5, 0.52, 0.55) + lg('gen-g-dtu-'+k, m, tb, 1, 0); });
  d += rg('gen-g-rbc', [[0,'#F6A39B'],[0.34,'#E25B55'],[0.72,'#C0262B'],[1,'#86121A']], 0.46, 0.44, 0.56);
  d += rg('gen-g-scl', [[0,'#FFFFFF'],[0.75,'#F3EEE9'],[1,'#D9CFC6']]);
  d += rg('gen-g-iris-c', [[0,'#2A170A'],[0.38,'#5E3718'],[0.78,'#8F5E2E'],[1,'#3E2310']]);
  d += rg('gen-g-iris-a', [[0,'#173656'],[0.38,'#3A76B8'],[0.78,'#86BCEB'],[1,'#26548A']]);
  d += rg('gen-g-ovu', [[0,'#FFF8F2'],[0.7,'#F9DCCB'],[1,'#EDBB9F']], 0.42, 0.4, 0.6);
  d += rg('gen-g-cor', [[0.72,'#F6CDB2',0],[0.8,'#F6CDB2',0.55],[1,'#F2BE9D',0]]);
  d += rg('gen-g-esp', [[0,'#FFFFFF'],[0.6,'#D5E1EE'],[1,'#94ADCB']], 0.38, 0.38, 0.62);
  d += rg('gen-g-pol', [[0,'#FFF1B8'],[0.55,'#F5C743'],[1,'#C98A12']], 0.4, 0.38, 0.62);
  d += rg('gen-g-plate', [[0,'#FBF7EE'],[1,'#EAE1CF']]);
  d += lg('gen-g-cro','#B99AD8','#6E4C99',1,1);
  d += `<filter id="gen-f-sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.6" flood-color="#0b1020" flood-opacity=".28"/></filter>`;
  d += `<filter id="gen-f-soft" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#0b1020" flood-opacity=".22"/></filter>`;

  /* ---- arveja (Pisum sativum): estandarte, alas y quilla ---- */
  const arv = k => { const P = k==='p', st = P ? '#4B1D6B' : '#9C93AE', vn = P ? '#3A0F55' : '#8A80A0';
    return `<path d="M52 99 C50 90 47 84 49 74" stroke="#3F7A34" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M50 88 C40 83 32 87 28 94 C37 97 45 95 50 88Z" fill="url(#gen-g-leaf)" stroke="#2F5E27" stroke-width=".8"/>
      <path d="M50 86 C60 81 67 85 65 91 C63 96 58 93 60 90" stroke="#5E9A45" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <path d="M50 64 C31 64 13 48 17 28 C20 13 38 7 50 19 C62 7 80 13 83 28 C87 48 69 64 50 64Z" fill="url(#gen-g-arv-${k})" stroke="${st}" stroke-width="1.1"/>
      <g stroke="${vn}" opacity=".32" fill="none" stroke-width=".9" stroke-linecap="round"><path d="M50 61 C49 48 48 34 50 22"/><path d="M50 60 C42 50 34 40 27 28"/><path d="M50 60 C58 50 66 40 73 28"/><path d="M49 61 C38 56 28 50 21 41"/><path d="M51 61 C62 56 72 50 79 41"/></g>
      <ellipse cx="34" cy="27" rx="11" ry="5.5" fill="#fff" opacity=".28" transform="rotate(-28 34 27)"/>
      <path d="M50 67 C36 71 25 65 27 54 C29 45 42 47 50 58Z" fill="url(#gen-g-arv-${k}2)" stroke="${st}" stroke-width="1"/>
      <path d="M50 67 C64 71 75 65 73 54 C71 45 58 47 50 58Z" fill="url(#gen-g-arv-${k}2)" stroke="${st}" stroke-width="1"/>
      <path d="M43 61 C41 71 48 76 56 71 C60 67 59 61 57 58 C53 62 47 63 43 61Z" fill="url(#gen-g-arv-${k})" stroke="${st}" stroke-width="1"/>
      <path d="M41 69 C43 77 56 78 59 69 L57 65 L53.5 69 L50 64 L46.5 69 L43 65 Z" fill="url(#gen-g-leaf)" stroke="#2F5E27" stroke-width=".8"/>`; };
  d += `<symbol id="gen-s-arv-p" viewBox="0 0 100 100">${arv('p')}</symbol><symbol id="gen-s-arv-b" viewBox="0 0 100 100">${arv('b')}</symbol>`;

  /* ---- dondiego de noche (Mirabilis jalapa): tubo largo y limbo de 5 lóbulos ---- */
  let limbo = ''; for (let i=0;i<=120;i++){ const t = i/120*Math.PI*2, r = 31*(0.86 + 0.14*Math.pow(Math.abs(Math.cos(2.5*(t+Math.PI/2))),0.55));
    limbo += (i?'L':'M') + (50 + r*Math.cos(t)).toFixed(1) + ' ' + (37 + r*Math.sin(t)*0.8).toFixed(1); }
  const pliegues = [0,1,2,3,4].map(k => { const t = -Math.PI/2 + k*Math.PI*2/5; return `<path d="M50 38 L${(50+27*Math.cos(t)).toFixed(1)} ${(37+27*Math.sin(t)*0.8).toFixed(1)}"/>`; }).join('');
  const estambres = [-0.9,-0.45,0,0.45,0.9].map((a,k) => { const x = 50 + Math.sin(a)*24, y = 18 - Math.cos(a)*6 + (k%2)*3; return `<path d="M50 39 C${(50+Math.sin(a)*10).toFixed(1)} 32 ${(x-2).toFixed(1)} ${(y+8).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}" fill="none"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9" fill="#F3CF3E" stroke="#B08A12" stroke-width=".5"/>`; }).join('');
  const don = k => { const st = { r:'#7A0A1E', k:'#B8487A', b:'#B7AEB4' }[k];
    return `<path d="M50 99 C51 94 50 90 50 86" stroke="#3F7A34" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M44 84 C45 90 55 90 56 84 C54 80 46 80 44 84Z" fill="url(#gen-g-leaf)" stroke="#2F5E27" stroke-width=".8"/>
      <path d="M46.6 46 C47.2 62 47.5 74 47.7 83 L52.3 83 C52.5 74 52.8 62 53.4 46Z" fill="url(#gen-g-dtu-${k})" stroke="${st}" stroke-width=".8"/>
      <path d="${limbo}Z" fill="url(#gen-g-don-${k})" stroke="${st}" stroke-width="1.1"/>
      <g stroke="${st}" stroke-width=".8" opacity=".35" fill="none">${pliegues}</g>
      <ellipse cx="38" cy="26" rx="10" ry="4.5" fill="#fff" opacity=".28" transform="rotate(-18 38 26)"/>
      <g stroke="${k==='b'?'#C9C0A0':'#F7E6EC'}" stroke-width=".8">${estambres}</g>`; };
  ['r','k','b'].forEach(k => d += `<symbol id="gen-s-don-${k}" viewBox="0 0 100 100">${don(k)}</symbol>`);

  /* ---- glóbulo rojo con antígenos A (triángulos) y B (círculos) ---- */
  const rbc = (A, B, txt) => { let ant = '';
    for (let i=0;i<12;i++){ const t = i/12*Math.PI*2 - Math.PI/2, x = 50 + 36*Math.cos(t), y = 47 + 36*Math.sin(t)*0.94;
      const tipoA = A && (!B || i%2===0), tipoB = B && (!A || i%2===1);
      if (tipoA){ const r = 5.2, p = [0,1,2].map(j => { const a = t + j*2.094; return (x + r*Math.cos(a)).toFixed(1)+','+(y + r*Math.sin(a)).toFixed(1); }).join(' ');
        ant += `<line x1="${(50+32*Math.cos(t)).toFixed(1)}" y1="${(47+32*Math.sin(t)*0.94).toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#0E5E52" stroke-width="1.2"/><polygon points="${p}" fill="#22A78F" stroke="#0E5E52" stroke-width="1"/>`; }
      else if (tipoB) ant += `<line x1="${(50+32*Math.cos(t)).toFixed(1)}" y1="${(47+32*Math.sin(t)*0.94).toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#8A5A06" stroke-width="1.2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.7" fill="#F4AE22" stroke="#8A5A06" stroke-width="1"/>`;
    }
    return `<ellipse cx="50" cy="90" rx="26" ry="4" fill="#000" opacity=".12"/>
      <ellipse cx="50" cy="47" rx="33" ry="31" fill="url(#gen-g-rbc)" stroke="#7A0F16" stroke-width="1.2"/>
      <ellipse cx="50" cy="48" rx="17" ry="15" fill="none" stroke="#7A0F16" stroke-width="1" opacity=".25"/>
      <path d="M26 34 C32 22 46 17 58 18" stroke="#fff" stroke-width="2.6" fill="none" opacity=".35" stroke-linecap="round"/>
      ${ant}<text x="50" y="55" text-anchor="middle" font-family="IBM Plex Sans,Arial,sans-serif" font-weight="800" font-size="${txt.length>1?19:22}" fill="#fff" stroke="#6A0C12" stroke-width=".6" paint-order="stroke">${txt}</text>`; };
  d += `<symbol id="gen-s-rbc-A" viewBox="0 0 100 100">${rbc(true,false,'A')}</symbol><symbol id="gen-s-rbc-B" viewBox="0 0 100 100">${rbc(false,true,'B')}</symbol>`;
  d += `<symbol id="gen-s-rbc-AB" viewBox="0 0 100 100">${rbc(true,true,'AB')}</symbol><symbol id="gen-s-rbc-O" viewBox="0 0 100 100">${rbc(false,false,'O')}</symbol>`;

  /* ---- ojo: esclerótica, iris con estrías, pupila y brillo ---- */
  const ojo = k => { let est = ''; for (let i=0;i<22;i++){ const t = i/22*Math.PI*2; est += `<path d="M${(50+7.5*Math.cos(t)).toFixed(1)} ${(51+7.5*Math.sin(t)).toFixed(1)} L${(50+16*Math.cos(t+0.08)).toFixed(1)} ${(51+16*Math.sin(t+0.08)).toFixed(1)}"/>`; }
    return `<clipPath id="gen-cp-ojo-${k}"><path d="M10 51 C27 25 73 25 90 51 C73 76 27 76 10 51Z"/></clipPath>
      <path d="M19 24 C37 12 64 11 83 22" stroke="#6B4A34" stroke-width="4.5" fill="none" stroke-linecap="round" opacity=".85"/>
      <path d="M10 51 C27 25 73 25 90 51 C73 76 27 76 10 51Z" fill="url(#gen-g-scl)"/>
      <g clip-path="url(#gen-cp-ojo-${k})">
        <circle cx="50" cy="51" r="18" fill="url(#gen-g-iris-${k})"/>
        <g stroke="#fff" stroke-width=".7" opacity=".22">${est}</g>
        <circle cx="50" cy="51" r="18" fill="none" stroke="#000" stroke-width="1.6" opacity=".45"/>
        <circle cx="50" cy="51" r="6.8" fill="#0A0A0C"/>
        <path d="M10 51 C27 25 73 25 90 51 L90 36 L10 36Z" fill="#3A2A20" opacity=".16"/>
        <circle cx="56.5" cy="44.5" r="3.4" fill="#fff" opacity=".92"/><circle cx="44" cy="57" r="1.5" fill="#fff" opacity=".55"/>
      </g>
      <path d="M10 51 C27 25 73 25 90 51 C73 76 27 76 10 51Z" fill="none" stroke="#5A4636" stroke-width="2.2"/>
      <g stroke="#3F2F24" stroke-width="1.6" stroke-linecap="round"><path d="M22 40 l-4 -5"/><path d="M31 33 l-2.5 -6"/><path d="M41 29.5 l-1 -6"/><path d="M51 28.5 l0 -6"/><path d="M61 29.5 l1.2 -6"/><path d="M70 33 l2.6 -5.6"/><path d="M79 40 l4 -5"/></g>`; };
  d += `<symbol id="gen-s-ojo-c" viewBox="0 0 100 100">${ojo('c')}</symbol><symbol id="gen-s-ojo-a" viewBox="0 0 100 100">${ojo('a')}</symbol>`;

  /* ---- lámina tipo Ishihara estilizada: un «5» de puntos naranja entre puntos verdes ----
     La versión «d» muestra la misma lámina como la percibe una persona daltónica (rojo-verde):
     los dos grupos de puntos se vuelven del mismo tono y el número desaparece. */
  const seg = [[40,30,62,30],[40,30,40,48],[40,48,57,48],[57,48,61,53],[61,53,61,64],[61,64,57,70],[57,70,39,70]];
  const dseg = (x,y,[ax,ay,bx,by]) => { const vx = bx-ax, vy = by-ay, t = clamp(((x-ax)*vx+(y-ay)*vy)/(vx*vx+vy*vy),0,1); return Math.hypot(x-ax-t*vx, y-ay-t*vy); };
  const R = genRng(1914), pts = [];
  for (let k=0; k<3200 && pts.length<230; k++){ const r = 1.9 + R()*3.1, a = R()*Math.PI*2, q = Math.sqrt(R())*(44-r), x = 50+q*Math.cos(a), y = 50+q*Math.sin(a);
    if (pts.every(p => Math.hypot(p[0]-x, p[1]-y) > p[2]+r+0.6)) pts.push([x,y,r, Math.min(...seg.map(s=>dseg(x,y,s))) < 6.2, R()]); }
  const FIG = ['#E0763A','#D65A2C','#EE9A4E','#C9482A'], FON = ['#7FA65A','#98B865','#6C9754','#A9C07A','#86AC60'];
  const FIGd = ['#A7995A','#9C8E52','#B2A565','#958950'], FONd = ['#A2975B','#AFA464','#968B53','#ABA062','#9E935A'];
  const plato = dalt => `<circle cx="50" cy="50" r="47" fill="url(#gen-g-plate)" stroke="#C8BEA8" stroke-width="1.2"/>` +
    pts.map(([x,y,r,f,u]) => { const pal = f ? (dalt?FIGd:FIG) : (dalt?FONd:FON); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${pal[Math.floor(u*pal.length)]}"/>`; }).join('') +
    `<circle cx="50" cy="50" r="47" fill="none" stroke="#fff" stroke-width="1.4" opacity=".35"/>`;
  d += `<symbol id="gen-s-ish-n" viewBox="0 0 100 100">${plato(false)}</symbol><symbol id="gen-s-ish-d" viewBox="0 0 100 100">${plato(true)}</symbol>`;

  /* ---- símbolos de pedigrí (para las 100 crías del daltonismo) ---- */
  const pm = f => `<rect x="18" y="18" width="64" height="64" rx="6" style="fill:${f};stroke:var(--ink-2)" stroke-width="5"/>`;
  const pf = f => `<circle cx="50" cy="50" r="33" style="fill:${f};stroke:var(--ink-2)" stroke-width="5"/>`;
  d += `<symbol id="gen-s-pm-n" viewBox="0 0 100 100">${pm('#F7F8FB')}</symbol><symbol id="gen-s-pm-a" viewBox="0 0 100 100">${pm('#1B2436')}</symbol>`;
  d += `<symbol id="gen-s-pf-n" viewBox="0 0 100 100">${pf('#F7F8FB')}</symbol><symbol id="gen-s-pf-a" viewBox="0 0 100 100">${pf('#1B2436')}</symbol>`;
  d += `<symbol id="gen-s-pf-p" viewBox="0 0 100 100">${pf('#F7F8FB')}<circle cx="50" cy="50" r="10" style="fill:#1B2436"/></symbol>`;

  /* ---- gametos ---- */
  d += `<symbol id="gen-s-ovu" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="url(#gen-g-cor)"/>
    ${Array.from({length:18},(_,i)=>{ const t=i/18*Math.PI*2; return `<circle cx="${(50+40*Math.cos(t)).toFixed(1)}" cy="${(50+40*Math.sin(t)).toFixed(1)}" r="4.2" fill="#F4C7A8" opacity=".75"/>`; }).join('')}
    <circle cx="50" cy="50" r="35" fill="none" stroke="#F6E2D4" stroke-width="4.5"/><circle cx="50" cy="50" r="32.5" fill="url(#gen-g-ovu)" stroke="#D69C7E" stroke-width="1"/>
    <circle cx="50" cy="50" r="17" fill="#FFFFFF" fill-opacity=".85" stroke="#C98E73" stroke-width="1.2"/><path d="M30 36 C35 28 44 24 52 24" stroke="#fff" stroke-width="2.4" fill="none" opacity=".7" stroke-linecap="round"/></symbol>`;
  d += `<symbol id="gen-s-esp" viewBox="0 0 100 100"><path d="M60 50 C68 41 75 59 83 49 C89 42 93 55 99 47" stroke="#8FA3BE" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <rect x="47" y="46.3" width="15" height="7.4" rx="3.7" fill="#B6C6D9" stroke="#7F97B6" stroke-width=".8"/>
    <ellipse cx="29" cy="50" rx="22" ry="18" fill="url(#gen-g-esp)" stroke="#6F89AA" stroke-width="1.2"/>
    <path d="M12 42 C14 34 22 31 30 32" stroke="#fff" stroke-width="2.2" fill="none" opacity=".8" stroke-linecap="round"/></symbol>`;
  d += `<symbol id="gen-s-pol" viewBox="0 0 100 100">${Array.from({length:22},(_,i)=>{ const t=i/22*Math.PI*2; return `<circle cx="${(50+37*Math.cos(t)).toFixed(1)}" cy="${(50+37*Math.sin(t)).toFixed(1)}" r="3.3" fill="#E1A92A" stroke="#A8740E" stroke-width=".6"/>`; }).join('')}
    <circle cx="50" cy="50" r="35" fill="url(#gen-g-pol)" stroke="#A8740E" stroke-width="1.2"/>
    ${[[40,32],[64,40],[36,64],[60,66],[50,50],[30,48],[70,58]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.2" fill="#C98A12" opacity=".35"/>`).join('')}
    <path d="M28 36 C33 27 42 23 50 23" stroke="#fff" stroke-width="2.4" fill="none" opacity=".7" stroke-linecap="round"/></symbol>`;

  document.body.insertAdjacentHTML('beforeend', `<svg id="gen-sprite" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden;pointer-events:none"><defs>${d}</defs></svg>`);
}
/* símbolo de la ilustración completa del fenotipo */
function genFenId(rid, g){
  if (rid === 'flor') return g.includes('A') ? 'gen-s-arv-p' : 'gen-s-arv-b';
  if (rid === 'dondiego') return g === 'RR' ? 'gen-s-don-r' : g === 'BB' ? 'gen-s-don-b' : 'gen-s-don-k';
  if (rid === 'sangre'){ const A = g.includes('A'), B = g.includes('B'); return 'gen-s-rbc-' + (A && B ? 'AB' : A ? 'A' : B ? 'B' : 'O'); }
  if (rid === 'ojos') return g.includes('C') ? 'gen-s-ojo-c' : 'gen-s-ojo-a';
  const dal = g.includes('Y') ? g.includes('Xd') : g === 'XdXd';
  return dal ? 'gen-s-ish-d' : 'gen-s-ish-n';
}
/* miniatura (las 100 crías): en el daltonismo, símbolo de pedigrí, que no depende del color */
function genFenMiniId(rid, g){
  if (rid !== 'daltonismo') return genFenId(rid, g);
  if (g.includes('Y')) return g.includes('Xd') ? 'gen-s-pm-a' : 'gen-s-pm-n';
  return g === 'XdXd' ? 'gen-s-pf-a' : g === 'XDXd' ? 'gen-s-pf-p' : 'gen-s-pf-n';
}
const genUse = (id, cls, aria) => `<svg class="${cls||''}" viewBox="0 0 100 100" ${aria?`role="img" aria-label="${esc(aria)}"`:'aria-hidden="true"'}><use href="#${id}"/></svg>`;
/* cromosoma sexual en miniatura con la banda del locus del color (Xq28) */
function genCromo(tipo, alelo, x, y, s){
  const k = s || 1, band = alelo === 'D' ? '#2F9A62' : alelo === 'd' ? '#E0801E' : null;
  const arm = (a, L, w) => `<rect x="${(-w/2).toFixed(1)}" y="${(-L).toFixed(1)}" width="${w}" height="${L}" rx="${w/2}" transform="rotate(${a})" fill="url(#gen-g-cro)" stroke="#4D3470" stroke-width="${(0.9/k).toFixed(2)}"/>`;
  const Y = tipo === 'Y';
  let g = `<g transform="translate(${x} ${y}) scale(${k})">`;
  g += Y ? arm(-160,10,6.5)+arm(160,10,6.5)+arm(-14,19,6.5)+arm(14,19,6.5) : arm(-162,18,6.5)+arm(162,18,6.5)+arm(-18,24,6.5)+arm(18,24,6.5);
  if (band) g += `<g transform="rotate(162)"><rect x="-3.6" y="-15" width="7.2" height="4.4" rx="1.2" fill="${band}" stroke="#fff" stroke-width=".8"/></g>`;
  g += `<circle cx="0" cy="0" r="3.2" fill="#5C3F86"/></g>`;
  return g;
}
/* ilustración completa del fenotipo; en el daltonismo añade el par de cromosomas sexuales */
function genFenSVG(rid, g, cls, aria){
  if (rid !== 'daltonismo') return genUse(genFenId(rid, g), cls, aria);
  const par = g.match(/XD|Xd|Y/g) || [];
  const cr = par.map((t,i) => genCromo(t==='Y'?'Y':'X', t==='XD'?'D':t==='Xd'?'d':null, 114 + i*23, 46, 1.3)).join('');
  const lab = par.map((t,i) => `<text x="${114+i*23}" y="95" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--ink-2)" font-family="IBM Plex Mono,monospace">${GEN_SUP[t]||t}</text>`).join('');
  return `<svg class="${cls||''}" viewBox="0 0 150 100" ${aria?`role="img" aria-label="${esc(aria)}"`:'aria-hidden="true"'}><use href="#${genFenId(rid,g)}" x="0" y="4" width="92" height="92"/>${cr}${lab}</svg>`;
}
/* gameto: óvulo, espermatozoide o grano de polen, con su alelo en el núcleo */
function genGametoSVG(kind, label, cls){
  const id = { ovu:'gen-s-ovu', esp:'gen-s-esp', pol:'gen-s-pol' }[kind];
  const tx = kind === 'esp' ? 29 : 50, fs = label.length > 1 ? 17 : 22;
  return `<svg class="${cls||''}" viewBox="0 0 100 100" aria-hidden="true"><use href="#${id}"/><text x="${tx}" y="${50+fs*0.36}" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="${fs}" fill="#1B2436">${esc(label)}</text></svg>`;
}
const genEsPlanta = rid => rid === 'flor' || rid === 'dondiego';

route('/explorar/cruces', (view) => {
  view.classList.add('wide');
  genSprite();
  const S = { rasgo:'flor', madre:'Aa', padre:'Aa', celdas:[null,null,null,null], errores:0, modo:'aprender', retosOK:new Set(), sim:null, sel:null };
  const R = () => GEN_RASGOS[S.rasgo];
  const gamM = () => R().parse(S.madre), gamP = () => R().parse(S.padre);

  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{},
    h('span',{class:'eyebrow gen'},'Genética y evolución · leyes de Mendel y herencia ligada al sexo'),
    h('h1',{},'Constructor de cruces'),
    h('p',{},'Elige el rasgo, define el genotipo de cada progenitor, genera los gametos y llena tú el cuadro de Punnett. Después compara la probabilidad con lo que ocurre de verdad en 100 crías.')),
    h('a',{class:'btn sm',href:'#/explorar/adn'},'← ADN 3D')));

  const retoSt = h('div',{class:'notice'},'Pendiente: 0 de 3 casos resueltos en el modo reto.');
  view.append(genBanner({
    proposito:'Comprender que los descendientes reciben un alelo completo de cada progenitor y que el cuadro de Punnett solo da probabilidades.',
    observa:['Que cada gameto lleva un solo alelo de cada gen','Que dos padres del mismo fenotipo pueden tener un hijo distinto','Cuánto se parecen (y cuánto no) las 100 crías a la proporción teórica'],
    reto:'Entra en el modo reto y resuelve los tres casos.', statusEl: retoSt, done: !!Store.s.activities['reto-cruces']?.done }));

  const seg = h('div',{class:'segmented',role:'tablist',style:'align-self:flex-start'},
    h('button',{role:'tab','aria-selected':'true',onclick:()=>{ S.modo='aprender'; render(); }},'Aprender'),
    h('button',{role:'tab','aria-selected':'false',onclick:()=>{ S.modo='reto'; render(); Store.log('modo',{recurso:'cruces',modo:'reto'}); }},'Modo reto'));
  const cuerpo = h('div',{class:'stack'});
  view.append(h('div',{class:'stack'}, seg, cuerpo));

  function reset(){ S.celdas = [null,null,null,null]; S.errores = 0; S.sim = null; S.sel = null; }

  /* --------------------------------------------- selección del rasgo */
  function panelRasgo(){
    const card = h('div',{class:'card stack'});
    const chips = h('div',{class:'row'});
    Object.values(GEN_RASGOS).forEach(r => chips.append(h('button',{class:'chip'+(r.id===S.rasgo?' picked':''),'aria-pressed':String(r.id===S.rasgo),
      onclick:()=>{ S.rasgo = r.id; S.madre = r.madre[1] || r.madre[0]; S.padre = r.padre[1] || r.padre[0]; reset(); render(); Store.log('cruce',{rasgo:r.id}); }}, r.n)));
    const r = R();
    const selM = h('select',{'aria-label':'Genotipo de la madre',onchange:e=>{ S.madre = e.target.value; reset(); render(); }});
    r.madre.forEach(g => selM.append(h('option',{value:g,selected:g===S.madre?'':null}, `${r.disp(g)} · ${r.fen(g)}`)));
    const selP = h('select',{'aria-label':'Genotipo del padre',onchange:e=>{ S.padre = e.target.value; reset(); render(); }});
    r.padre.forEach(g => selP.append(h('option',{value:g,selected:g===S.padre?'':null}, `${r.disp(g)} · ${r.fen(g)}`)));
    /* progenitor ilustrado: fenotipo que se ve + genotipo */
    const prog = (g, fem) => h('div',{class:'gen-prog'},
      h('span',{class:'gen-prog-ill',html:genFenSVG(r.id, g, 'gen-fen'+(r.sexual?' ancho':''), `${fem?'Progenitora':'Progenitor'}: ${r.fen(g)}`)}),
      h('span',{class:'gen-prog-tx'},
        h('span',{class:'gen-sex','aria-hidden':'true'}, fem ? '♀' : '♂'),
        h('b',{}, r.fen(g)), h('span',{class:'mono small muted'}, 'genotipo ' + r.disp(g))));
    card.classList.add('gen-card-rasgo');
    card.append(h('span',{class:'eyebrow gen'},'1 · Elige el rasgo'), chips,
      h('div',{class:'notice info'}, h('span',{}, h('b',{}, r.tipo+'. '), r.gen)),
      h('span',{class:'eyebrow gen'},'2 · Define los genotipos de los progenitores'),
      h('div',{class:'grid g2'},
        h('div',{class:'field'}, h('label',{}, r.sexual ? 'Madre (XX)' : 'Progenitora'), selM, prog(S.madre, true)),
        h('div',{class:'field'}, h('label',{}, r.sexual ? 'Padre (XY)' : 'Progenitor'), selP, prog(S.padre, false))));
    return card;
  }

  /* --------------------------------------------- gametos */
  function panelGametos(){
    const r = R(), gm = gamM(), gp = gamP();
    const box = h('div',{class:'card stack gen-card-gam'});
    const kindM = 'ovu', kindP = genEsPlanta(r.id) ? 'pol' : 'esp';
    const nomG = k => ({ ovu:'óvulo', esp:'espermatozoide', pol:'grano de polen' })[k];
    const fila = (tit, gen, gs, det, kind) => h('div',{class:'stack',style:'gap:4px'},
      h('span',{class:'small muted'}, tit+': '+r.disp(gen)),
      h('div',{class:'gen-gams'}, gs.map(t => h('figure',{class:'gen-gam'},
        h('span',{html:genGametoSVG(kind, r.dispT(t), 'gen-gam-ill '+kind)}),
        h('figcaption',{}, h('span',{class:'pill gen'}, r.dispT(t)), ' ', nomG(kind))))),
      h('span',{class:'small muted'}, det));
    box.append(h('span',{class:'eyebrow gen'},'3 · Genera los gametos (meiosis)'),
      h('p',{class:'small muted'},'En la meiosis los dos alelos de cada gen se separan: cada óvulo y cada espermatozoide lleva uno solo. Eso es la primera ley de Mendel (segregación).'),
      fila(r.sexual?'Óvulos de la madre':'Gametos de la progenitora', S.madre, gm,
        gm[0]===gm[1] ? 'Es homocigota: todos sus gametos son iguales.' : 'Es heterocigota: la mitad de sus gametos lleva un alelo y la mitad el otro.', kindM),
      fila(r.sexual?'Espermatozoides del padre':'Gametos del progenitor', S.padre, gp,
        r.sexual ? 'La mitad lleva el cromosoma X (con su alelo) y la mitad lleva el Y: el padre determina el sexo.' : (gp[0]===gp[1] ? 'Es homocigoto: todos sus gametos son iguales.' : 'Es heterocigoto: produce dos clases de gametos en igual proporción.'), kindP),
      h('div',{class:'notice'},'Ojo: el gameto lleva un alelo completo, no "la mitad de un rasgo". Los alelos no se mezclan ni se diluyen.'));
    return box;
  }

  /* --------------------------------------------- cuadro de Punnett */
  function opciones(){ const r = R(), gm = gamM(), gp = gamP(), set = [];
    gm.forEach(a => gp.forEach(b => { const g = r.comb(a,b); if (!set.includes(g)) set.push(g); })); return set; }
  function panelPunnett(){
    const r = R(), gm = gamM(), gp = gamP();
    const box = h('div',{class:'card stack gen-card-pun'});
    const fb = h('div',{class:'notice',style:'display:none'});
    const ops = h('div',{class:'row gen-ops'});
    const tabla = h('table',{class:'gen-punnett','aria-label':'Cuadro de Punnett: filas, gametos de la madre; columnas, gametos del padre'});
    const kP = genEsPlanta(r.id) ? 'pol' : 'esp';
    const thead = h('thead',{}, h('tr',{}, h('th',{}, h('span',{class:'gen-hd corner'})),
      ...gp.map(t => h('th',{scope:'col'}, h('span',{class:'gen-hd'}, h('span',{class:'gen-hd-ill',html:genGametoSVG(kP, '', 'gen-hd-g '+kP)}), h('span',{}, h('small',{}, r.sexual?'padre':'progenitor'), r.dispT(t)))))));
    const tb = h('tbody',{});
    const botones = [];
    gm.forEach((a,fi) => {
      const tr = h('tr',{}, h('th',{scope:'row'}, h('span',{class:'gen-hd'}, h('span',{class:'gen-hd-ill',html:genGametoSVG('ovu', '', 'gen-hd-g ovu')}), h('span',{}, h('small',{}, r.sexual?'madre':'progenitora'), r.dispT(a)))));
      gp.forEach((b,ci) => { const k = fi*2+ci, v = S.celdas[k];
        const btn = h('button',{class:'gen-cell'+(v?' ok':'')+(S.sel===k?' sel':''),'data-k':k,
          'aria-label':`Casilla ${fi+1}-${ci+1}: gameto ${r.dispT(a)} de la madre con gameto ${r.dispT(b)} del padre. ${v?('Contiene '+r.disp(v)+', '+r.fen(v)):'Vacía, pulsa para completarla'}`,
          onclick:()=>{ S.sel = (S.sel===k?null:k); pinta(); }},
          v ? h('span',{class:'gen-cell-ill',html:genFenSVG(r.id, v, 'gen-fen'+(r.sexual?' ancho':''))}) : null,
          h('span',{class:'gen-cell-tx'},
            v ? h('b',{}, r.disp(v)) : h('b',{},'?'), v ? h('small',{}, r.fen(v)) : h('small',{},'toca para completar')));
        botones.push(btn); tr.append(h('td',{}, btn)); });
      tb.append(tr);
    });
    tabla.append(thead, tb);
    tabla.addEventListener('keydown', e => {
      const i = botones.indexOf(document.activeElement); if (i < 0) return;
      const mv = { ArrowRight:1, ArrowLeft:-1, ArrowDown:2, ArrowUp:-2 }[e.key]; if (!mv) return;
      const j = i + mv; if (j >= 0 && j < botones.length){ botones[j].focus(); e.preventDefault(); }
    });
    function pinta(){
      ops.innerHTML = '';
      if (S.sel === null){ ops.append(h('span',{class:'small muted'},'Selecciona una casilla del cuadro (con el ratón o con el tabulador y las flechas) y después elige el genotipo que corresponde.')); return; }
      const fi = Math.floor(S.sel/2), ci = S.sel%2, a = gm[fi], b = gp[ci], correcto = r.comb(a,b);
      ops.append(h('span',{class:'small',style:'font-weight:600'},`Casilla seleccionada: gameto ${r.dispT(a)} × gameto ${r.dispT(b)}. ¿Qué genotipo resulta?`));
      opciones().forEach(g => ops.append(h('button',{class:'chip',onclick:()=>responder(S.sel, g, a, b, correcto)}, r.disp(g))));
      botones.forEach((bt,i) => bt.classList.toggle('sel', i===S.sel));
    }
    function responder(k, g, a, b, correcto){
      const toks = r.parse(g);
      if (g === correcto){
        S.celdas[k] = g; fb.className='notice ok';
        fb.innerHTML = `<span><b>Correcto.</b> El gameto ${esc(r.dispT(a))} de la madre se une con el gameto ${esc(r.dispT(b))} del padre y forma ${esc(r.disp(g))}: ${esc(r.fen(g))}.</span>`;
        S.sel = null; Store.log('punnett',{rasgo:S.rasgo, casilla:k, correcto:true});
        render(); return;
      }
      S.errores++;
      const falta = [];
      const cp = toks.slice();
      [a,b].forEach(t => { const j = cp.indexOf(t); if (j >= 0) cp.splice(j,1); else falta.push(t); });
      let msg;
      if (falta.length === 2) msg = `Esa casilla cruza el gameto ${r.dispT(a)} de la madre con el gameto ${r.dispT(b)} del padre: el genotipo tiene que contener los dos, y ${r.disp(g)} no contiene ninguno.`;
      else if (falta.length === 1){ const quien = falta[0] === a ? 'la madre (la fila)' : 'el padre (la columna)';
        msg = `Falta el alelo ${r.dispT(falta[0])}, que aporta ${quien}. Cada descendiente recibe un alelo de cada progenitor: nunca dos del mismo, ni una mezcla de los dos.`; }
      else msg = `${r.disp(g)} tiene los alelos correctos pero mal escritos. Escribe siempre el alelo dominante (o el cromosoma X) primero: ${r.disp(correcto)}.`;
      if (r.sexual && toks.filter(t=>t==='Y').length > 1) msg = 'La madre no puede aportar un cromosoma Y: ella es XX. El Y solo puede venir del padre.';
      fb.className='notice warn'; fb.innerHTML = `<span><b>Aún no.</b> ${esc(msg)}</span>`; fb.style.display='flex';
      const bt = botones[k]; bt.classList.add('bad'); setTimeout(()=>bt.classList.remove('bad'), 400);
      Store.log('punnett',{rasgo:S.rasgo, casilla:k, correcto:false, elegido:g});
    }
    pinta(); if (S.errores) fb.style.display='flex';
    box.append(h('span',{class:'eyebrow gen'},'4 · Llena el cuadro de Punnett, casilla por casilla'),
      h('p',{class:'small muted'},'Cada casilla es un encuentro posible entre un gameto de la madre y uno del padre. Las cuatro casillas son igual de probables.'),
      h('div',{class:'tablewrap'}, tabla), ops, fb,
      h('div',{class:'row'}, h('button',{class:'btn sm',onclick:()=>{ reset(); render(); }},'↺ Vaciar el cuadro')));
    return box;
  }

  /* --------------------------------------------- resultados */
  function proporciones(){
    const r = R(), gm = gamM(), gp = gamP(); const gen = {}, fen = {}, fenG = {};
    gm.forEach(a => gp.forEach(b => { const g = r.comb(a,b); gen[g] = (gen[g]||0)+1; const f = r.fen(g); fen[f] = (fen[f]||0)+1; if (!fenG[f]) fenG[f] = g; }));
    return { gen, fen, fenG };
  }
  /* etiqueta de fenotipo con su miniatura (la miniatura acompaña al texto, no lo sustituye) */
  const fenTag = (f, g) => h('span',{class:'gen-fentag'}, h('span',{html:genUse(genFenMiniId(R().id, g),'gen-mini')}), f);
  function razon(obj){ const v = Object.values(obj); const g = v.reduce((a,b)=>{ const mcd=(x,y)=>y?mcd(y,x%y):x; return mcd(a,b); }); return v.map(x=>x/g).join(' : '); }
  function panelResultados(){
    const r = R(), P = proporciones(), box = h('div',{class:'card stack gen-card-res'});
    const tabla = (obj, tit, disp, celda) => { const t = h('table',{class:'data'}, h('thead',{}, h('tr',{}, h('th',{},tit), h('th',{},'Casillas'), h('th',{},'Probabilidad'))),
      h('tbody',{}, Object.entries(obj).map(([k,v]) => h('tr',{}, h('td',{}, celda ? celda(k) : disp?disp(k):k),h('td',{class:'num'}, v+' de 4'), h('td',{class:'num'}, genN(v/4*100,0)+' %')))));
      return h('div',{class:'stack',style:'gap:4px'}, h('span',{class:'eyebrow'},'Proporción '+(disp?'genotípica':'fenotípica')), h('div',{class:'tablewrap'}, t), h('span',{class:'mono small muted'},'razón '+razon(obj))); };
    box.append(h('span',{class:'eyebrow gen'},'5 · Resultados del cruce'),
      h('div',{class:'grid g2'}, tabla(P.gen,'Genotipo', g=>r.disp(g)), tabla(P.fen,'Fenotipo', null, f=>fenTag(f, P.fenG[f]))),
      h('div',{class:'notice info'}, h('span',{}, h('b',{},'Rigor: '), 'Estas son probabilidades, no garantías. Una razón 3 : 1 no significa que de cuatro crías nazcan exactamente tres y una: significa que cada cría tiene 75 % de probabilidad del fenotipo dominante, y el azar puede dar 4 y 0, o 2 y 2. La proporción teórica se cumple cuando hay muchas crías.')),
      h('p',{class:'small muted'}, r.nota));
    return box;
  }

  /* --------------------------------------------- simulación de 100 crías */
  function simular(n){
    const r = R(), gm = gamM(), gp = gamP(), cuenta = {}, serie = [];
    const P = proporciones(); const domFen = Object.entries(P.fen).sort((a,b)=>b[1]-a[1])[0][0];
    let dom = 0; const lista = [];   /* las primeras 100 crías, en orden de nacimiento, para dibujarlas */
    for (let i=0;i<n;i++){ const g = r.comb(gm[Math.random()<0.5?0:1], gp[Math.random()<0.5?0:1]); const f = r.fen(g);
      if (i < 100) lista.push(g);
      cuenta[f] = (cuenta[f]||0)+1; if (f === domFen) dom++; if ((i+1)%2===0 || i===n-1) serie.push({ x:i+1, y:dom/(i+1)*100 }); }
    S.sim = { n, cuenta, serie, domFen, esperado: P.fen[domFen]/4*100, lista };
  }
  function panelSim(){
    const r = R(), P = proporciones(), box = h('div',{class:'card stack gen-card-sim'});
    box.append(h('span',{class:'eyebrow gen'},'6 · Contrasta la probabilidad con la realidad'),
      h('p',{class:'small muted'},'El cuadro de Punnett dice lo que se espera. Ahora deja que nazcan 100 crías y compara.'),
      h('div',{class:'row'},
        h('button',{class:'btn primary sm',onclick:()=>{ simular(100); render(); Store.log('simulacion',{rasgo:S.rasgo, crias:100}); }},'🐣 Simular 100 crías'),
        h('button',{class:'btn sm',onclick:()=>{ simular(100); render(); }},'Otra camada de 100'),
        h('button',{class:'btn sm',onclick:()=>{ simular(1000); render(); }},'Simular 1.000 crías')));
    if (!S.sim) return box;
    const bars = h('div',{class:'gen-bars'});
    const fens = Object.keys(P.fen);
    fens.forEach(f => { const esp = P.fen[f]/4*100, obs = (S.sim.cuenta[f]||0)/S.sim.n*100;
      bars.append(h('div',{class:'gen-bar'}, fenTag(f, P.fenG[f]),
        h('div',{class:'gen-tracks'},
          h('div',{class:'gen-tr'}, h('span',{class:'t'}, h('i',{style:`width:${esp}%`})), h('span',{class:'n'},'teórico '+genN(esp,0)+' %')),
          h('div',{class:'gen-tr obs'}, h('span',{class:'t'}, h('i',{style:`width:${obs}%`})), h('span',{class:'n'},'observado '+genN(obs,1)+' %'))))); });
    const cv = h('canvas',{style:'height:200px;width:100%','aria-label':'Gráfico: porcentaje observado del fenotipo más frecuente conforme aumentan las crías'});
    const wrap = h('div',{style:'position:relative'}, cv);
    /* la camada, cría por cría: una cuadrícula de 10 × 10 que se llena en orden de nacimiento */
    const L = S.sim.lista || [];
    const cnt100 = {}; L.forEach(g => { const f = r.fen(g); cnt100[f] = (cnt100[f]||0)+1; });
    const grid = h('div',{class:'gen-crias',role:'img','aria-label':`Las ${L.length} primeras crías, una por casilla: `+Object.entries(cnt100).map(([f,c])=>`${c} con ${f.toLowerCase()}`).join(', ')});
    grid.innerHTML = L.map((g,i) => `<span class="gen-cria" title="Cría ${i+1}: ${esc(r.fen(g))} (${esc(r.disp(g))})">${genUse(genFenMiniId(r.id, g))}</span>`).join('');
    const cuentaEl = h('div',{class:'gen-crias-lg'}, Object.keys(P.fen).map(f => h('span',{}, fenTag(f, P.fenG[f]), h('b',{class:'mono'}, String(cnt100[f]||0)))));
    box.append(h('div',{class:'gen-crias-box'},
      h('span',{class:'eyebrow'}, S.sim.n > 100 ? `Las primeras 100 crías de la camada de ${genN(S.sim.n,0).replace(/(\d)(?=(\d{3})+$)/g,'$1.')}` : 'La camada, cría por cría'),
      grid, cuentaEl));
    const cells = [...grid.children];
    if (genMotion()){ const t0 = performance.now();
      const paso = (now) => { if (!grid.isConnected) return; const k = Math.min(cells.length, Math.floor((now - t0)/14));
        for (let i=0;i<k;i++) cells[i].classList.add('in'); if (k < cells.length) requestAnimationFrame(paso); };
      requestAnimationFrame(paso);
    } else cells.forEach(c => c.classList.add('in','quieto'));
    box.append(h('div',{class:'stack',style:'gap:6px'}, h('span',{class:'eyebrow'},`Camada de ${S.sim.n} crías`), bars),
      h('span',{class:'eyebrow'},`Cómo se acerca «${S.sim.domFen}» a su valor teórico`), wrap);
    const dif = Math.abs((S.sim.cuenta[S.sim.domFen]||0)/S.sim.n*100 - S.sim.esperado);
    box.append(h('div',{class:'notice'+(dif<3?' ok':'')}, h('span',{}, h('b',{},'Lectura: '),
      `Se esperaba ${genN(S.sim.esperado,0)} % de «${S.sim.domFen}» y salió ${genN((S.sim.cuenta[S.sim.domFen]||0)/S.sim.n*100,1)} %: una diferencia de ${genN(dif,1)} puntos. ${S.sim.n>=1000 ? 'Con muchas crías la frecuencia observada se pega al valor teórico: así funciona la ley de los grandes números.' : 'Vuelve a simular: cada camada da un número distinto. Con 1.000 crías la diferencia se reduce casi siempre.'}`)));
    setTimeout(()=>{ try { lineChart(cv, { series:[
      { label:'observado (la línea recta es el valor teórico)', color:cssVar('--accent')||'#3B82F6', pts:S.sim.serie },
      { color:cssVar('--ink-3')||'#888', pts:[{x:2,y:S.sim.esperado},{x:S.sim.n,y:S.sim.esperado}] }
    ], xmin:2, xmax:S.sim.n, ymin:0, ymax:100, xlabel:'crías nacidas', ylabel:'% del fenotipo', xticks:5, yfmt:v=>genN(v,0)+' %' }); } catch(e){ console.warn(e); } }, 30);
    return box;
  }

  /* --------------------------------------------- modo reto */
  const RETOS = [
    { id:'r1', q:'Dos plantas de flor púrpura se cruzan y, entre sus descendientes, aparece una planta de flor blanca. ¿Cuál es el genotipo de los dos progenitores?',
      ops:['AA × AA','Aa × Aa','AA × aa'], ok:1,
      fb:'La flor blanca es aa, así que recibió un alelo a de cada progenitor. Como los dos padres son púrpuras, cada uno tiene también un alelo A: los dos son Aa. Se espera 25 % de flores blancas.',
      wrong:['Si los dos fueran AA, ninguno podría aportar un alelo a y no habría descendientes blancos.','AA × aa da toda la descendencia Aa, es decir, toda púrpura. No aparecería ninguna blanca.'] },
    { id:'r2', q:'Una mujer portadora de daltonismo (XᴰXᵈ) tiene hijos con un hombre de visión normal (XᴰY). ¿Qué probabilidad hay de que un hijo cualquiera sea un varón daltónico?',
      ops:['0 %, porque el padre no es daltónico','25 % del total de hijos e hijas','50 %, porque la mitad de los hijos son varones'], ok:1,
      fb:'Las cuatro casillas son XᴰXᴰ, XᴰXᵈ, XᴰY y XᵈY. Solo una de las cuatro es un varón daltónico: 25 % del total. Si te preguntaran solo entre los varones, sería el 50 %.',
      wrong:['El padre aporta el Y, no el alelo del daltonismo: el varón daltónico recibe el Xᵈ de su madre portadora.','La mitad de los hijos son varones, pero de esos varones solo la mitad recibe el Xᵈ: 50 % de 50 % es 25 %.'] },
    { id:'r3', q:'Una madre de grupo sanguíneo O tiene hijos con un padre de grupo AB. ¿Qué grupos pueden tener sus hijos?',
      ops:['A y B únicamente','O y AB únicamente','A, B, AB y O, en partes iguales'], ok:0,
      fb:'La madre OO solo aporta O; el padre AB aporta A o B. Los hijos son AO (grupo A) o BO (grupo B): 50 % y 50 %. No puede haber hijos O ni AB. Fíjate en que ningún hijo tiene el grupo de sus padres.',
      wrong:['Para ser O harían falta dos alelos O, y el padre no tiene ninguno; para ser AB harían falta A y B, y la madre no aporta ninguno de los dos.','La madre no puede aportar A ni B: todos sus gametos llevan O.'] }
  ];
  function panelReto(){
    const box = h('div',{class:'card stack'});
    box.append(h('span',{class:'eyebrow gen'},'Modo reto · tres casos'),
      h('p',{class:'small muted'},'Usa el constructor para comprobar tus respuestas: cambia al modo Aprender, arma el cruce y mira el cuadro.'));
    RETOS.forEach(rr => box.append(quizBlock(rr, ()=>{ S.retosOK.add(rr.id); marcarReto(); })));
    return box;
  }
  function marcarReto(){
    const n = S.retosOK.size;
    if (n < 3){ retoSt.className='notice'; retoSt.textContent = `Pendiente: ${n} de 3 casos resueltos en el modo reto.`; return; }
    retoSt.className='notice ok';
    retoSt.innerHTML = '<span><b>¡Reto resuelto!</b> Los tres casos exigen lo mismo: partir del descendiente, deducir qué alelo tuvo que aportar cada progenitor y comprobarlo con el cuadro de Punnett.</span>';
    if (!Store.s.activities['reto-cruces']?.done) Store.completeActivity('reto-cruces', { score:'3 de 3 casos' });
  }

  function cierre(){
    const box = h('div',{class:'card stack'}, h('span',{class:'eyebrow gen'},'Comprueba lo que entendiste'));
    let n = 0; const ok = () => { if (++n === 2) Store.addXP(15,'Comprobación de cruces'); };
    box.append(quizBlock({ q:'En el Ecuador el grupo sanguíneo O es el más frecuente, y el alelo que lo produce es recesivo. ¿Qué significa entonces "dominante"?',
      ops:['Que es el alelo más frecuente en la población','Que es el alelo mejor, el que da ventaja','Que se expresa en el fenotipo cuando está presente, aunque solo haya una copia'],
      ok:2, fb:'Dominante es una relación entre alelos, no una medida de frecuencia ni de calidad. La frecuencia de un alelo depende de la historia de la población; que sea ventajoso, del ambiente. El alelo del grupo O es recesivo y, aun así, el más frecuente aquí.',
      wrong:['Justo al revés en este ejemplo: el alelo recesivo del grupo O es el más frecuente en el Ecuador. La frecuencia no tiene que ver con la dominancia.','La polidactilia es dominante y no es una ventaja; el alelo del grupo O es recesivo y es el más común. Dominante no quiere decir mejor.'] }, ok));
    box.append(quizBlock({ q:'Dos personas de ojos cafés tienen una hija de ojos azules. ¿Cómo se explica?',
      ops:['Los rasgos de los padres se mezclaron y salió un tono más claro','Los dos padres son heterocigotos (Cc) y cada uno le pasó el alelo c','Es imposible: algo está mal en el análisis'],
      ok:1, fb:'No hay mezcla: cada progenitor aportó un alelo completo. Los dos eran Cc (de ojos cafés, portadores de c) y la hija recibió cc. Por eso un rasgo puede "saltarse" generaciones y reaparecer.',
      wrong:['Si los rasgos se mezclaran como pinturas, la variabilidad desaparecería en pocas generaciones y nunca reaparecería el azul. Lo que se hereda son alelos, no mezclas.','Es perfectamente posible y bastante común: es la mejor prueba de que los alelos no se mezclan, solo se ocultan.'] }, ok));
    return box;
  }

  function render(){
    $$('button',seg).forEach((b,i)=>b.setAttribute('aria-selected', String((i===0) === (S.modo==='aprender'))));
    cuerpo.innerHTML = '';
    if (S.modo === 'reto'){ cuerpo.append(panelReto(), h('div',{class:'notice'},'¿Necesitas comprobarlo? Vuelve a "Aprender" y arma el cruce en el constructor.')); marcarReto(); return; }
    cuerpo.append(panelRasgo(), panelGametos(), panelPunnett());
    if (S.celdas.every(Boolean)) cuerpo.append(panelResultados(), panelSim(), cierre());
    else cuerpo.append(h('div',{class:'notice'},'Completa las cuatro casillas del cuadro para ver las proporciones, la simulación de 100 crías y la comprobación final.'));
  }
  render(); marcarReto();
});

/* ===================================================================== */
/*  PEDIGRÍ · dibujo SVG común (genealogía y misión «Código genético»)    */
/*  Notación estándar: cuadrado = varón, círculo = mujer, relleno =       */
/*  afectado; medio relleno (autosómico) o punto central (ligado al X) =  */
/*  portador, solo cuando el estudiante ya lo dedujo.                     */
/* ===================================================================== */
function genPedSVG(o){
  const g = o.gente, xs = g.map(p=>p.x), ys = g.map(p=>p.y);
  const x0 = Math.min(...xs) - 104, x1 = Math.max(...xs) + 56, y0 = Math.min(...ys) - 50, y1 = Math.max(...ys) + 56;
  let sv = `<svg class="gen-ped" viewBox="${x0} ${y0} ${x1-x0} ${y1-y0}" role="group" aria-label="${esc(o.aria)}">`;
  (o.gens||[]).forEach(([t,y]) => { sv += `<g class="gnum" aria-hidden="true"><rect x="${x0+10}" y="${y-12}" width="${16+t.length*7}" height="24" rx="12"/><text x="${x0+18+t.length*3.5}" y="${y+4.5}" text-anchor="middle">${t}</text></g>`;
    sv += `<line class="gguia" x1="${x0+30+t.length*7}" y1="${y}" x2="${x1-8}" y2="${y}"/>`; });
  sv += '<g class="lnks">' + o.lineas.map(l => l[0]==='M' ? `<path class="lnk mat" d="M${l[1]} ${l[2]}H${l[3]}"/>` : l[0]==='V' ? `<path class="lnk" d="M${l[1]} ${l[2]}V${l[3]}"/>` : `<path class="lnk" d="M${l[1]} ${l[2]}H${l[3]}"/>`).join('') + '</g>';
  g.forEach(p => {
    const hmb = p.sexo === 'h', muj = p.sexo === 'm', R = 20, x = p.x, y = p.y;
    const forma = (cls, k) => hmb ? `<rect class="${cls}" x="${x-R*k}" y="${y-R*k}" width="${2*R*k}" height="${2*R*k}" rx="${4*k}"/>`
      : muj ? `<circle class="${cls}" cx="${x}" cy="${y}" r="${R*k}"/>`
      : `<path class="${cls}" d="M${x} ${y-21*k}L${x+21*k} ${y}L${x} ${y+21*k}L${x-21*k} ${y}Z"/>`;
    const at = p.clic ? ` tabindex="0" role="button" data-id="${p.id}"` : '';
    if (p.off) sv += forma('back', 1);   /* fondo opaco: la línea no se ve a través de la figura atenuada */
    sv += `<g class="sym${p.sel?' on':''}${p.off?' off':''}"${at} aria-label="${esc(p.aria)}">`;
    if (p.sel) sv += forma('halo', 1.3);
    sv += forma('shape' + (p.af ? ' af' : '') + (p.sexo === '?' ? ' preg' : ''), 1);
    if (p.estado === 'half') sv += hmb ? `<path class="half" d="M${x} ${y-R}H${x-R+4}A4 4 0 0 0 ${x-R} ${y-R+4}V${y+R-4}A4 4 0 0 0 ${x-R+4} ${y+R}H${x}Z"/>` : `<path class="half" d="M${x} ${y-R}A${R} ${R} 0 0 0 ${x} ${y+R}Z"/>`;
    if (p.estado === 'dot') sv += `<circle class="half" cx="${x}" cy="${y}" r="6"/>`;
    if (p.estado === 'duda') sv += `<text class="duda" x="${x}" y="${y+6}" text-anchor="middle">?</text>`;
    if (p.sexo === '?') sv += `<text class="duda" x="${x}" y="${y+6}" text-anchor="middle">?</text>`;
    if (p.af || p.estado) sv += forma('shape edge', 1);
    sv += `<text class="idl" x="${x}" y="${y+R+17}" text-anchor="middle">${esc(p.id)}</text>`;
    if (p.cap) sv += `<text class="cap" x="${x}" y="${y+R+29}" text-anchor="middle">${esc(p.cap)}</text>`;
    if (p.gt){ const w = Math.max(30, p.gt.length*7.4 + 12); sv += `<g class="gtp"><rect x="${x-w/2}" y="${y-R-25}" width="${w}" height="18" rx="9"/><text x="${x}" y="${y-R-12}" text-anchor="middle">${esc(p.gt)}</text></g>`; }
    sv += '</g>';
  });
  return sv + '</svg>';
}
/* leyenda HTML del pedigrí, con los mismos símbolos */
function genPedLeyenda(items){
  const ic = { h:'<rect x="3" y="3" width="18" height="18" rx="2.5" class="shape"/>', m:'<circle cx="12" cy="12" r="9.5" class="shape"/>',
    af:'<rect x="3" y="3" width="18" height="18" rx="2.5" class="shape af"/>', afm:'<circle cx="12" cy="12" r="9.5" class="shape af"/>',
    half:'<rect x="3" y="3" width="18" height="18" rx="2.5" class="shape"/><rect x="3" y="3" width="9" height="18" rx="2" class="half"/><rect x="3" y="3" width="18" height="18" rx="2.5" class="shape edge"/>',
    dot:'<circle cx="12" cy="12" r="9.5" class="shape"/><circle cx="12" cy="12" r="3.4" class="half"/>',
    duda:'<rect x="3" y="3" width="18" height="18" rx="2.5" class="shape"/><text x="12" y="16.5" text-anchor="middle" class="duda" style="font-size:12px">?</text>',
    emb:'<path d="M12 2L22 12L12 22L2 12Z" class="shape preg"/>' };
  return h('div',{class:'gen-pedleg'}, items.map(([k,t]) => h('span',{}, h('span',{class:'gen-pedleg-i',html:`<svg viewBox="0 0 24 24" class="gen-ped mini" aria-hidden="true">${ic[k]}</svg>`}), t)));
}

/* ===================================================================== */
/*  ÁRBOL GENEALÓGICO                                                     */
/* ===================================================================== */
const GEN_PED = {
  rasgo:'Albinismo (autosómico recesivo: A = pigmentación normal, a = albinismo)',
  gente: [
    { id:'I-1',  sexo:'h', af:false, x:210, y:60,  gen:'Aa',    por:'No es albino, pero tuvo un hijo albino (aa): tuvo que aportarle un alelo a. Es portador obligado.' },
    { id:'I-2',  sexo:'m', af:false, x:330, y:60,  gen:'Aa',    por:'No es albina, pero tuvo un hijo albino (aa): tuvo que aportarle un alelo a. Es portadora obligada.' },
    { id:'II-1', sexo:'h', af:true,  x:190, y:170, gen:'aa',    por:'Es albino y el rasgo es recesivo: solo se manifiesta con los dos alelos a.' },
    { id:'II-2', sexo:'m', af:false, x:310, y:170, gen:'Aa',    por:'No es albina, pero su hija sí lo es (aa): le aportó un alelo a. Es portadora obligada.' },
    { id:'II-3', sexo:'h', af:false, x:440, y:170, gen:'Aa',    por:'Viene de fuera de la familia y no es albino, pero su hija es aa: él también le aportó un alelo a.' },
    { id:'III-1',sexo:'m', af:true,  x:345, y:280, gen:'aa',    por:'Es albina: dos alelos a, uno de cada progenitor.' },
    { id:'III-2',sexo:'h', af:false, x:435, y:280, gen:'AA/Aa', por:'Sus padres son Aa × Aa y él no es albino: puede ser AA o Aa y con esta información no se puede decidir. De hecho, 2 de cada 3 descendientes no albinos de ese cruce son portadores.' }
  ],
  lineas: [ ['M',210,60,330,60], ['V',270,60,115], ['H',190,115,310,115], ['V',190,115,170], ['V',310,115,170],
            ['M',310,170,440,170], ['V',375,170,225], ['H',345,225,435,225], ['V',345,225,280], ['V',435,225,280] ]
};
route('/explorar/genealogia', (view) => {
  view.classList.add('wide');
  const S = { sel:null, ok:{}, intentos:0 };
  view.append(h('div',{class:'page-head',style:'margin-bottom:14px'}, h('div',{},
    h('span',{class:'eyebrow gen'},'Genética y evolución · análisis de un árbol genealógico'),
    h('h1',{},'¿Quién lleva el alelo sin saberlo?'),
    h('p',{},'Un árbol genealógico solo muestra fenotipos. Tu trabajo es deducir los genotipos: a veces se pueden saber con certeza y a veces no.')),
    h('a',{class:'btn sm',href:'#/explorar/cruces'},'← Cruces')));

  const st = h('div',{class:'notice'},'Pendiente: 0 de 7 genotipos deducidos.');
  view.append(genBanner({
    proposito:'Aplicar el razonamiento genético al revés: partir de lo que se ve (fenotipo) para deducir lo que no se ve (genotipo).',
    observa:['Que un rasgo recesivo puede saltarse generaciones','Que los padres de una persona afectada son portadores obligados','Que en algunos casos la información no alcanza para decidir'],
    reto:'Deduce el genotipo de las siete personas del árbol, incluida la que no se puede determinar.', statusEl: st }));

  genSprite();
  const card = h('div',{class:'card stack gen-ped-card'});
  const opsBox = h('div',{class:'stack'}), fb = h('div',{class:'notice',style:'display:none'});
  const svgWrap = h('div',{class:'gen-ped-wrap'});
  view.append(card);
  card.append(h('span',{class:'eyebrow gen'},'El rasgo que vas a analizar'),
    h('p',{style:'font-weight:600'}, GEN_PED.rasgo),
    h('p',{class:'small muted'},'Cuadrado = hombre · círculo = mujer · relleno oscuro y la palabra «albino» = persona afectada. Toca a una persona (o llega con el tabulador y pulsa Enter) para deducir su genotipo.'),
    svgWrap,
    genPedLeyenda([['h','hombre'],['m','mujer'],['af','afectado (albino)'],['half','portador (Aa), cuando lo deduces'],['duda','no se puede saber (AA o Aa)']]),
    opsBox, fb);

  function dibuja(){
    svgWrap.innerHTML = genPedSVG({ aria:'Árbol genealógico de tres generaciones', lineas:GEN_PED.lineas, gens:[['I',60],['II',170],['III',280]],
      gente: GEN_PED.gente.map(p => { const done = S.ok[p.id];
        return { id:p.id, sexo:p.sexo, af:p.af, x:p.x, y:p.y, clic:true, sel:S.sel === p.id, cap:p.af?'albino':'normal', gt: done ? p.gen : null,
          estado: done && p.gen === 'Aa' ? 'half' : done && p.gen === 'AA/Aa' ? 'duda' : null,
          aria:`${p.id}, ${p.sexo==='h'?'hombre':'mujer'}, ${p.af?'albino':'pigmentación normal'}${done?', genotipo '+p.gen:''}` }; }) });
    if (S.foco){ const f = svgWrap.querySelector(`.sym[data-id="${S.foco}"]`); S.foco = null; if (f) f.focus(); }
  }
  /* los oyentes se enlazan una sola vez (antes se acumulaban en cada redibujo) */
  const act = e => { const g = e.target.closest('.sym'); if (!g) return; S.sel = g.dataset.id; if (e.type === 'keydown') S.foco = g.dataset.id; pinta(); };
  svgWrap.addEventListener('click', act);
  svgWrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); act(e); } });
  function pinta(){
    dibuja(); opsBox.innerHTML = '';
    if (!S.sel){ opsBox.append(h('span',{class:'small muted'},'Selecciona a una persona del árbol.')); return; }
    const p = GEN_PED.gente.find(x=>x.id===S.sel);
    if (S.ok[p.id]){ opsBox.append(h('div',{class:'notice ok'}, h('span',{}, h('b',{}, `${p.id}: ${p.gen}. `), p.por))); return; }
    const row = h('div',{class:'row'});
    ['AA','Aa','aa','AA/Aa'].forEach(g => row.append(h('button',{class:'chip','aria-label':`Asignar genotipo ${g==='AA/Aa'?'AA o Aa (no se puede saber)':g} a ${p.id}`,onclick:()=>responder(p,g)}, g==='AA/Aa'?'AA o Aa (no se puede saber)':g)));
    opsBox.append(h('p',{class:'small',style:'font-weight:600'},`¿Cuál es el genotipo de ${p.id} (${p.sexo==='h'?'hombre':'mujer'}, ${p.af?'albino':'pigmentación normal'})?`), row);
  }
  function responder(p, g){
    S.intentos++;
    if (g === p.gen){ S.ok[p.id] = true; fb.className='notice ok'; fb.innerHTML = `<span><b>Correcto: ${esc(p.id)} es ${esc(p.gen)}.</b> ${esc(p.por)}</span>`; fb.style.display='flex';
      Store.log('genealogia',{persona:p.id, correcto:true}); progreso(); pinta(); return; }
    let msg;
    if (p.af) msg = `${p.id} es albino y el albinismo es recesivo: un solo alelo A bastaría para tener pigmentación normal. Solo aa produce albinismo.`;
    else if (g === 'aa') msg = `Si ${p.id} fuera aa, sería albino, y en el árbol aparece con pigmentación normal. Tiene al menos un alelo A.`;
    else if (p.gen === 'Aa') msg = `Fíjate en sus descendientes: ${p.id} tiene un hijo o una hija albino (aa), y ese descendiente recibió un alelo a de cada progenitor. Si ${p.id} fuera AA no habría podido aportarlo.`;
    else msg = `Sus padres son Aa × Aa y ${p.id} no es albino, así que se descartan solo los aa. Con esta información no se puede distinguir entre AA y Aa: falta un dato (un descendiente albino, por ejemplo).`;
    fb.className='notice warn'; fb.innerHTML = `<span><b>Aún no.</b> ${esc(msg)}</span>`; fb.style.display='flex';
    Store.log('genealogia',{persona:p.id, correcto:false, elegido:g});
  }
  function progreso(){
    const n = Object.keys(S.ok).length;
    if (n < GEN_PED.gente.length){ st.className='notice'; st.textContent = `Pendiente: ${n} de ${GEN_PED.gente.length} genotipos deducidos.`; return; }
    st.className='notice ok';
    st.innerHTML = '<span><b>Árbol completo.</b> Los padres de una persona afectada por un rasgo recesivo son siempre portadores, aunque no manifiesten nada. Y hay casos, como III-2, en los que la información disponible no alcanza para decidir.</span>';
    Store.addXP(20,'Árbol genealógico');
    if (!Store.s.activities['reto-genealogia']?.done) Store.completeActivity('reto-genealogia', { score:`${n} de ${n} genotipos` });
  }
  pinta(); progreso();

  view.append(h('div',{style:'height:16px'}), h('div',{class:'card stack'},
    h('span',{class:'eyebrow gen'},'Comprueba lo que entendiste'),
    quizBlock({ q:'En el árbol, II-1 es albino y sus padres no lo son. ¿Qué se puede afirmar con certeza?',
      ops:['El albinismo apareció de repente por una mutación en II-1','Los dos padres son portadores (Aa) aunque no sean albinos','La madre es la única responsable, porque el rasgo se hereda por vía materna'],
      ok:1, fb:'Un descendiente aa recibió un alelo a de cada progenitor. Como ninguno de los dos es albino, los dos son Aa: portadores. Por eso un rasgo recesivo puede saltarse generaciones enteras.',
      wrong:['Una mutación nueva es posible pero rarísima; la explicación esperable es que los dos padres sean portadores. Además, un solo alelo mutado no bastaría: hacen falta dos.','El albinismo es autosómico: no está en los cromosomas sexuales. Los dos progenitores aportan por igual.'] },
      ()=>Store.addXP(10,'Análisis de árbol genealógico')),
    quizBlock({ q:'III-2 no es albino y sus padres son Aa × Aa. ¿Cuál es la probabilidad de que sea portador (Aa)?',
      ops:['50 %, porque la mitad de los hijos son Aa','2 de cada 3 (unos 66,7 %), porque ya sabemos que no es aa','100 %, porque sus padres son portadores'],
      ok:1, fb:'De las cuatro casillas (AA, Aa, Aa, aa) descartamos la aa porque III-2 no es albino. Quedan tres casillas igual de probables y dos de ellas son Aa: 2 de cada 3. Saber algo cambia la probabilidad.',
      wrong:['El 50 % sería la probabilidad antes de saber que no es albino. Con esa información hay que descartar la casilla aa y recalcular sobre las tres restantes.','No: podría ser AA. Que los padres sean portadores no obliga a que los hijos lo sean.'] },
      ()=>Store.addXP(10,'Probabilidad condicionada'))));
});
</script>
