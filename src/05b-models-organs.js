<script>
/* =====================================================================
   MODELOS: CEREBRO · PULMONES (procedimentales, simplificados)
   Contrato: build(E) → { anims:[{id,label,on,set,needsOpacity,focus}], setSpeed(k), phaseText(), legend, observa }
   ===================================================================== */
function gyriSphere(radius, scale, pos, color, low, seed=0){
  const g = new THREE.SphereGeometry(radius, low?36:64, low?26:48);
  const p = g.attributes.position; const v = new THREE.Vector3();
  for (let i=0;i<p.count;i++){ v.fromBufferAttribute(p,i); const n = v.clone().normalize(); const d = 0.045*Math.sin(n.x*11+seed)*Math.sin(n.y*9+seed*0.7) + 0.035*Math.sin(n.z*13+n.x*5+seed); v.addScaledVector(n, d*radius); p.setXYZ(i,v.x,v.y,v.z); }
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat(color,{roughness:0.62})); m.scale.set(...scale); m.position.set(...pos); return m;
}
function buildBrain(E){
  const low = E.low; const S = Object.fromEntries(BIO.brain.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s=S[id]; const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, interno:s.interno, explodeDir:V3(s.pos).normalize() }, extra)); E.addLabel(id, s.nombre, s.lbl); return p; };
  const lobe = (id, radius, scale, pos, zoff, seed) => add(id, [gyriSphere(radius,scale,[pos[0],pos[1],pos[2]+zoff],S[id].color,low,seed), gyriSphere(radius,scale,[pos[0],pos[1],pos[2]-zoff],S[id].color,low,seed+3)]);
  lobe('lobulo-frontal', 1.0, [1.55,1.15,0.95], [1.2,0.7,0], 0.62, 1);
  lobe('lobulo-parietal', 1.0, [1.35,1.05,0.95], [-0.35,1.25,0], 0.62, 2);
  lobe('lobulo-temporal', 0.85, [1.55,0.75,0.75], [0.35,-0.55,0], 0.95, 3);
  lobe('lobulo-occipital', 0.85, [1.0,0.95,0.95], [-1.9,0.55,0], 0.6, 4);
  add('cerebelo', [gyriSphere(0.8,[1.15,0.7,0.85],[-1.5,-1.15,0.55],S.cerebelo.color,low,5), gyriSphere(0.8,[1.15,0.7,0.85],[-1.5,-1.15,-0.55],S.cerebelo.color,low,6)]);
  add('tronco', [tube([[-0.2,-0.3,0],[-0.4,-1.3,0],[-0.6,-2.3,0]],0.38,S.tronco.color,low)]);
  add('medula', [tube([[-0.6,-2.3,0],[-0.65,-3.2,0],[-0.7,-4.0,0]],0.24,S.medula.color,low)]);
  const cc = new THREE.Mesh(new THREE.TorusGeometry(0.95,0.12,10,40,Math.PI), mat(S['cuerpo-calloso'].color,{roughness:0.4})); cc.position.set(0,0.35,0); cc.scale.set(1.3,0.9,1);
  add('cuerpo-calloso',[cc]);
  const tl = [0.32,-0.32].map(z => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.42,24,18), mat(S.talamo.color)); m.scale.set(1.3,0.8,0.7); m.position.set(-0.1,0.05,z); return m; });
  add('talamo', tl);
  const ht = new THREE.Mesh(new THREE.SphereGeometry(0.3,20,16), mat(S.hipotalamo.color)); ht.position.set(0.25,-0.5,0); ht.scale.set(1.2,0.7,1);
  add('hipotalamo',[ht]);
  const hp = new THREE.Mesh(new THREE.SphereGeometry(0.2,18,14), mat(S.hipofisis.color)); hp.position.set(0.4,-1.05,0); const stalk = tube([[0.3,-0.65,0],[0.38,-0.9,0]],0.06,S.hipofisis.color,low);
  add('hipofisis',[hp,stalk]);
  add('hipocampo', [0.75,-0.75].map(z => tube([[-0.9,-0.4,z],[-0.3,-0.65,z*1.05],[0.5,-0.55,z*1.1]],0.14,S.hipocampo.color,low)));
  /* Impulso nervioso: receptor (mano) → médula → tronco → tálamo → parietal → frontal → médula → músculo */
  const route = curveOf([[3.0,-4.2,1.6],[1.2,-4.0,0.6],[-0.65,-3.6,0],[-0.5,-1.8,0],[-0.2,-0.3,0],[-0.1,0.1,0.3],[-0.3,1.4,0.55],[0.5,1.55,0.55],[1.2,1.2,0.5],[0.3,0.2,0.2],[-0.4,-1.6,0],[-0.65,-3.5,0],[1.0,-4.1,0.9],[3.0,-4.4,1.9]]);
  const imp = { on:false, t:0, speed:1, parts:[] }; const pm = new THREE.MeshStandardMaterial({ color:0xF2C94C, emissive:0xF2C94C, emissiveIntensity:0.9 }); const pg = new THREE.SphereGeometry(0.09,8,6);
  for (let i=0;i<8;i++){ const m = new THREE.Mesh(pg, pm); m.visible=false; m.userData.off = -i*0.012; E.scene.add(m); imp.parts.push(m); }
  const hand = new THREE.Mesh(new THREE.SphereGeometry(0.3,16,12), mat(0xE0B090)); hand.position.set(3.1,-4.3,1.75); hand.visible=false; E.scene.add(hand);
  const stim = new THREE.Mesh(new THREE.SphereGeometry(0.16,12,10), new THREE.MeshStandardMaterial({color:0xE05030, emissive:0xE05030, emissiveIntensity:0.8})); stim.position.set(3.4,-4.1,2.0); stim.visible=false; E.scene.add(stim);
  const pulse = { ids:[], t:0 };
  const model = {
    anims:[ { id:'impulso', label:'Impulso nervioso: estímulo → percepción → respuesta', get on(){ return imp.on; }, set(on){ imp.on=on; imp.t=0; imp.parts.forEach(p=>p.visible=on); hand.visible=on; stim.visible=on; if (on) E.focus(new THREE.Vector3(0.6,-1.2,0.4), 12); }, needsOpacity:0.45 } ],
    setSpeed(k){ imp.speed=k; },
    phaseText(){ if (!imp.on) return ''; const t = imp.t; return t<0.16 ? 'Receptor de la piel → médula espinal (neurona sensitiva)' : t<0.3 ? 'Vía ascendente: tronco encefálico → tálamo' : t<0.46 ? 'Corteza somatosensorial (parietal): percibes el estímulo' : t<0.6 ? 'Corteza motora (frontal): decides la respuesta' : t<0.85 ? 'Vía descendente: tronco → médula (neurona motora)' : 'Músculo: retiras la mano'; },
    legend:[{color:'#F2C94C',txt:'Impulso nervioso (potenciales de acción)'},{color:'#E05030',txt:'Estímulo (calor) en la mano'}],
    observa:'el reflejo medular retira la mano antes de que la señal llegue a la corteza; la percepción consciente del dolor llega después. Nota que la vía se cruza: la mano derecha se procesa en el hemisferio izquierdo.',
    highlight(ids){ pulse.ids = ids; pulse.t = 0; }
  };
  E.onFrame((t,dt) => {
    if (imp.on && motionOK()){ imp.t = (imp.t + dt*0.09*imp.speed) % 1; imp.parts.forEach(p => { const k = ((imp.t + p.userData.off) % 1 + 1) % 1; p.position.copy(route.getPointAt(k)); }); }
    if (pulse.ids.length){ pulse.t += dt; const k = 0.5+0.5*Math.sin(pulse.t*5); E.parts.forEach(p => { const hot = pulse.ids.includes(p.id); p.meshes.forEach(m => { if (!m.material.emissive) return; if (hot){ m.material.emissive.set(0xffffff); m.material.emissiveIntensity = 0.15+0.35*k; } }); }); if (pulse.t>4){ pulse.ids=[]; E.refreshEmissive(); } }
  });
  return model;
}

function buildLungs(E){
  const low = E.low; const S = Object.fromEntries(BIO.lungs.structures.map(s=>[s.id,s]));
  const add = (id, meshes, extra={}) => { const s=S[id]; const p = E.addPart(id, meshes, Object.assign({ capa:s.capa, explodeDir:V3(s.pos).normalize() }, extra)); E.addLabel(id, s.nombre, s.lbl); return p; };
  const lar = new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.36,0.7,20), mat(S.laringe.color,{roughness:0.5})); lar.position.set(0,4.0,0);
  add('laringe',[lar]);
  const tr = [tube([[0,3.65,0],[0,2.6,0],[0,1.6,0]],0.3,S.traquea.color,low)]; for (let y=3.4;y>1.7;y-=0.32){ const r = new THREE.Mesh(new THREE.TorusGeometry(0.32,0.05,8,24), mat(0xD2BEA6)); r.position.set(0,y,0); r.rotation.x=Math.PI/2; tr.push(r); }
  add('traquea',tr);
  add('bronquios',[tube([[0,1.6,0],[-0.6,1.15,0.05],[-1.25,0.6,0.1]],0.2,S.bronquios.color,low), tube([[0,1.6,0],[0.65,1.0,0.05],[1.35,0.4,0.1]],0.18,S.bronquios.color,low)]);
  const br = [[[-1.25,0.6,0.1],[-1.9,1.3,0.15],[-2.3,1.9,0.2]],[[-1.25,0.6,0.1],[-2.1,0.4,0.2],[-2.7,0.1,0.3]],[[-1.25,0.6,0.1],[-1.7,-0.5,0.2],[-2.35,-1.45,0.5]],[[-1.25,0.6,0.1],[-1.4,-0.6,-0.2],[-1.5,-1.9,-0.3]],[[1.35,0.4,0.1],[1.9,1.1,0.15],[2.2,1.7,0.2]],[[1.35,0.4,0.1],[2.1,0.0,0.2],[2.6,-0.4,0.3]],[[1.35,0.4,0.1],[1.6,-0.7,0.1],[1.9,-1.8,0.3]],[[1.35,0.4,0.1],[1.2,-0.7,-0.2],[1.1,-1.9,-0.3]]].map(p=>tube(p,0.07,S.bronquiolos.color,low));
  add('bronquiolos',br);
  const alv = []; const ac = [-2.35,-1.45,0.5]; for (let i=0;i<14;i++){ const a = i/14*Math.PI*2, r = i<7?0.22:0.4; const m = new THREE.Mesh(new THREE.SphereGeometry(0.15,14,10), mat(S.alveolos.color,{roughness:0.4})); m.position.set(ac[0]+Math.cos(a)*r, ac[1]+Math.sin(a)*r*0.8, ac[2]+(i%3-1)*0.16); alv.push(m); }
  add('alveolos',alv,{ explodeDir:new THREE.Vector3(-1,-0.6,0.5).normalize() });
  const cap = [tube([[-2.95,-0.95,0.9],[-2.6,-1.5,1.0],[-2.1,-1.9,0.95]],0.05,0x3E63B8,low), tube([[-2.1,-1.9,0.95],[-1.9,-1.35,1.05],[-2.2,-0.9,1.0]],0.05,0xD64545,low), tube([[-2.7,-1.95,0.35],[-2.35,-2.05,0.75],[-1.95,-1.95,0.4]],0.05,0xD64545,low)];
  add('capilares',cap,{ explodeDir:new THREE.Vector3(-1,-0.8,0.8).normalize() });
  const lungMesh = (pos, scale, seed) => { const m = new THREE.Mesh(new THREE.SphereGeometry(1, low?32:56, low?24:40), mat(S['pulmon-derecho'].color,{roughness:0.6})); m.scale.set(...scale); m.position.set(...pos); return m; };
  const rl = [lungMesh([-1.7,0.4,0],[1.25,1.7,1.25]), lungMesh([-1.75,-1.2,0.05],[1.3,1.3,1.3])];
  const ll = [lungMesh([1.65,0.3,0],[1.1,1.65,1.15]), lungMesh([1.7,-1.25,0.05],[1.15,1.25,1.2])];
  add('pulmon-derecho',rl); add('pulmon-izquierdo',ll);
  const pl = [[-1.72,-0.35,0.02,1.45,2.55,1.45],[1.68,-0.45,0.02,1.3,2.45,1.35]].map(([x,y,z,sx,sy,sz]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(1,32,24), new THREE.MeshPhysicalMaterial({ color:0x9FC5DC, transparent:true, opacity:0.14, roughness:0.15, depthWrite:false, side:THREE.DoubleSide })); m.scale.set(sx,sy,sz); m.position.set(x,y,z); return m; });
  add('pleura',pl,{ passThrough:true, explodeDir:new THREE.Vector3(0,0,0) });
  const dia = new THREE.Mesh(new THREE.SphereGeometry(2.6, 40, 20, 0, Math.PI*2, 0, Math.PI/2), mat(S.diafragma.color,{roughness:0.55, side:THREE.DoubleSide})); dia.scale.set(1.35,0.4,0.85); dia.position.set(0,-3.15,0);
  add('diafragma',[dia]);
  /* Aire: partículas por la vía aérea */
  const airPaths = [[[0,4.6,0],[0,3.6,0],[0,1.6,0],[-0.6,1.15,0.05],[-1.25,0.6,0.1],[-1.7,-0.5,0.2],[-2.35,-1.45,0.5]],[[0,4.6,0],[0,3.6,0],[0,1.6,0],[0.65,1.0,0.05],[1.35,0.4,0.1],[1.9,1.1,0.15],[2.2,1.7,0.2]],[[0,4.6,0],[0,3.6,0],[0,1.6,0],[-0.6,1.15,0.05],[-1.25,0.6,0.1],[-1.9,1.3,0.15],[-2.3,1.9,0.2]],[[0,4.6,0],[0,3.6,0],[0,1.6,0],[0.65,1.0,0.05],[1.35,0.4,0.1],[1.6,-0.7,0.1],[1.9,-1.8,0.3]]].map(curveOf);
  const air = { on:false, phase:0, speed:1, parts:[] }; const inMat = new THREE.MeshStandardMaterial({ color:0x5FB8C4, emissive:0x5FB8C4, emissiveIntensity:0.5 }), outMat = new THREE.MeshStandardMaterial({ color:0x9AA6B2, emissive:0x9AA6B2, emissiveIntensity:0.3 }); const pg = new THREE.SphereGeometry(0.06,8,6);
  airPaths.forEach(c => { for (let i=0;i<7;i++){ const m = new THREE.Mesh(pg, inMat); m.userData = { curve:c, t:i/7 }; m.visible=false; E.scene.add(m); air.parts.push(m); } });
  /* Intercambio gaseoso en alvéolos */
  const gx = { on:false, t:0, parts:[] }; const o2m = new THREE.MeshStandardMaterial({ color:0xD64545, emissive:0xD64545, emissiveIntensity:0.6 }), co2m = new THREE.MeshStandardMaterial({ color:0x3E63B8, emissive:0x3E63B8, emissiveIntensity:0.6 });
  for (let i=0;i<10;i++){ const o = new THREE.Mesh(new THREE.SphereGeometry(0.045,8,6), o2m); o.userData={ from:V3([ac[0]+(Math.random()-0.5)*0.5, ac[1]+(Math.random()-0.5)*0.4, ac[2]+(Math.random()-0.5)*0.3]), to:V3([-2.6,-1.5,1.0]), off:i/10, kind:'o2' }; o.visible=false; E.scene.add(o); gx.parts.push(o);
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.045,8,6), co2m); c.userData={ from:V3([-2.35,-2.05,0.75]), to:V3([ac[0]+(Math.random()-0.5)*0.5, ac[1]+(Math.random()-0.5)*0.4, ac[2]+(Math.random()-0.5)*0.3]), off:i/10, kind:'co2' }; c.visible=false; E.scene.add(c); gx.parts.push(c); }
  const lungBase = [...rl, ...ll].map(m => m.userData.baseScale.clone());
  const model = {
    anims:[
      { id:'respiracion', label:'Respiración (diafragma y volumen pulmonar)', get on(){ return air.on; }, set(on){ air.on=on; air.parts.forEach(p=>p.visible=on); if (!on){ [...rl,...ll].forEach((m,i)=>m.scale.copy(m.userData.baseScale)); dia.position.y=-3.15; dia.scale.y=0.4; } }, needsOpacity:0.5 },
      { id:'intercambio', label:'Intercambio gaseoso en los alvéolos', get on(){ return gx.on; }, set(on){ gx.on=on; gx.parts.forEach(p=>p.visible=on); if (on) E.focus(V3(ac), 3.2); }, needsOpacity:0.3 }
    ],
    setSpeed(k){ air.speed=k; },
    phaseText(){ if (gx.on && !air.on) return 'O₂: alvéolo → sangre · CO₂: sangre → alvéolo (difusión)'; if (!air.on) return ''; const p = air.phase; return p<0.4 ? 'Inspiración · el diafragma se contrae y baja, el tórax se expande, la presión cae y el aire entra' : 'Espiración · el diafragma se relaja y sube, el volumen disminuye y el aire sale'; },
    legend:[{color:'#5FB8C4',txt:'Aire inspirado (rico en O₂)'},{color:'#9AA6B2',txt:'Aire espirado (más CO₂)'},{color:'var(--oxy)',txt:'O₂ pasando a la sangre'},{color:'var(--deoxy)',txt:'CO₂ saliendo de la sangre'}],
    observa:'los pulmones no se mueven solos: siguen al diafragma y a las costillas gracias a la pleura. En reposo la espiración es pasiva; al toser o cantar intervienen los músculos abdominales.'
  };
  E.onFrame((t,dt) => {
    if (!motionOK()) return;
    if (air.on){ air.phase = (air.phase + dt*0.22*air.speed) % 1; const p = air.phase; const f = p<0.4 ? (1-Math.cos(Math.PI*p/0.4))/2 : (1+Math.cos(Math.PI*(p-0.4)/0.6))/2; const insp = p<0.4;
      [...rl,...ll].forEach((m,i)=>m.scale.copy(lungBase[i]).multiplyScalar(1+0.09*f)); dia.position.y = -3.15 - 0.45*f; dia.scale.y = 0.4 - 0.18*f;
      const dir = insp ? 1 : -1; air.parts.forEach(m => { m.userData.t = ((m.userData.t + dir*dt*0.35*air.speed) % 1 + 1) % 1; m.position.copy(m.userData.curve.getPointAt(m.userData.t)); m.material = insp ? inMat : outMat; }); }
    if (gx.on){ gx.t += dt*0.4; gx.parts.forEach(p => { const k = (gx.t + p.userData.off) % 1; p.position.lerpVectors(p.userData.from, p.userData.to, k); }); }
  });
  return model;
}
BIO.builders = { corazon: buildHeart, cerebro: buildBrain, pulmones: buildLungs };
</script>
