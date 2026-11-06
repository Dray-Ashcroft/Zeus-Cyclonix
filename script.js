/* Zeus Cyclonix · Water Cycle Simulator
   Project Designer: Sai Prasad · In assistance with Claude Opus 5.5
   Licence: GNU GPL-3.0 (third-party models and libraries keep their own licences) */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const ICON_FS="<svg viewBox=\"0 -960 960 960\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M182.15-182.15h101.33q14.39 0 24.35 9.87 9.95 9.87 9.95 24.37 0 14.5-9.95 24.19-9.96 9.7-24.35 9.7H148.09q-14.43 0-24.25-9.82t-9.82-24.25v-135.39q0-14.39 9.87-24.35 9.87-9.95 24.37-9.95 14.5 0 24.2 9.95 9.69 9.96 9.69 24.35v101.33Zm595.7 0v-101.33q0-14.39 9.87-24.35 9.87-9.95 24.35-9.95 14.48 0 24.31 9.95 9.84 9.96 9.84 24.35v135.39q0 14.43-9.96 24.25-9.95 9.82-24.35 9.82H676.85q-14.75 0-24.57-9.87t-9.82-24.37q0-14.5 9.82-24.2 9.82-9.69 24.48-9.69h101.09Zm-595.7-595.7v101.09q0 14.66-9.87 24.48t-24.37 9.82q-14.5 0-24.19-9.82-9.7-9.82-9.7-24.57v-135.06q0-14.4 9.82-24.35 9.82-9.96 24.25-9.96h135.39q14.39 0 24.35 10.01 9.95 10.02 9.95 24.49 0 14.48-9.95 24.18-9.96 9.69-24.35 9.69H182.15Zm595.7 0H676.76q-14.66 0-24.48-9.87t-9.82-24.35q0-14.48 9.82-24.31 9.82-9.84 24.57-9.84h135.06q14.4 0 24.35 9.96 9.96 9.95 9.96 24.35v135.06q0 14.75-10.01 24.57-10.02 9.82-24.49 9.82-14.48 0-24.18-9.82-9.69-9.82-9.69-24.48v-101.09Z\"/></svg>", ICON_FS_EXIT="<svg viewBox=\"0 -960 960 960\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M249.41-249.41H148.09q-14.43 0-24.25-9.87-9.82-9.88-9.82-24.35 0-14.48 9.82-24.32 9.82-9.83 24.25-9.83h135.39q14.39 0 24.35 9.95 9.95 9.96 9.95 24.35v135.39q0 14.43-10.01 24.25t-24.49 9.82q-14.48 0-24.17-9.82-9.7-9.82-9.7-24.25v-101.32Zm461.42 0v101.32q0 14.43-9.87 24.25-9.88 9.82-24.49 9.82-14.62 0-24.32-9.82-9.69-9.82-9.69-24.25v-135.39q0-14.39 9.82-24.35 9.82-9.95 24.57-9.95h135.06q14.4 0 24.35 10.01 9.96 10.01 9.96 24.49 0 14.48-9.96 24.17-9.95 9.7-24.35 9.7H710.83ZM249.41-710.83v-101.08q0-14.4 9.87-24.35 9.88-9.96 24.35-9.96 14.48 0 24.32 9.96 9.83 9.95 9.83 24.35v135.06q0 14.75-9.95 24.57-9.96 9.82-24.35 9.82H148.09q-14.43 0-24.25-9.87t-9.82-24.49q0-14.61 9.82-24.31t24.25-9.7h101.32Zm461.42 0h101.08q14.4 0 24.35 9.87 9.96 9.88 9.96 24.49 0 14.62-9.96 24.32-9.95 9.69-24.35 9.69H676.85q-14.75 0-24.57-9.82t-9.82-24.57v-135.06q0-14.4 9.87-24.35 9.87-9.96 24.49-9.96 14.61 0 24.31 9.96 9.7 9.95 9.7 24.35v101.08Z\"/></svg>", ICON_PLAY="<svg viewBox=\"0 -960 960 960\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M314.02-254.65v-456.7q0-15.91 10.21-25.11 10.22-9.19 23.75-9.19 4.53 0 9.16 1.12 4.62 1.12 9.31 3.58l359.29 229.6q7.84 5.48 11.87 12.44 4.04 6.95 4.04 15.91t-4.04 15.91q-4.03 6.96-11.87 12.44l-359.29 229.6q-4.69 2.46-9.32 3.46t-9.16 1q-13.56 0-23.75-9.02-10.2-9.02-10.2-25.04Z\"/></svg>", ICON_PAUSE="<svg viewBox=\"0 -960 960 960\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M620.42-189q-28.17 0-48.23-20.08-20.06-20.09-20.06-48.29v-445.26q0-28.2 20.06-48.29Q592.25-771 620.43-771h55q28.17 0 48.18 20.08 20.02 20.09 20.02 48.29v445.26q0 28.2-20.02 48.29Q703.59-189 675.42-189h-55Zm-335.76 0q-28.18 0-48.23-20.08-20.06-20.09-20.06-48.29v-445.26q0-28.2 20.06-48.29Q256.49-771 284.66-771h55q28.18 0 48.19 20.08 20.02 20.09 20.02 48.29v445.26q0 28.2-20.02 48.29Q367.83-189 339.66-189h-55Z\"/></svg>";

/* ---------- Words in three languages ---------- */
const L={
en:{
  sub:'Water Cycle Simulator', evap:'Evaporation', cond:'Condensation', prec:'Precipitation',
  chip_evap:'Step 1: Evaporation', chip_cond:'Step 2: Condensation', chip_prec:'Step 3: Precipitation',
  tab_controls:'Controls', tab_explain:'Explain', tab_data:'Data', whole:'Whole cycle', fullscreen:'Fullscreen', fullscreen_exit:'Exit fullscreen',
  sl_t:"Sun's heat · air temperature", sl_rh:'Relative humidity', sl_w:'Wind speed',
  teach:'Teach mode', pause:'Pause', play:'Play', labels:'Labels', arrows:'Cycle arrows', rays:"Sun's rays", co_rays:'Sunlight brings heat energy', reset:'Clear sky & restart',
  next:'Next', finish:'Finish', exit:'Exit', close:'Close', step_of:'Step {n} of 3',
  th_title:'Air cools with height', th_note:'Surrounding air: about 6.5 °C colder per km', th_ground:'ground', th_base:'cloud base', th_peak:'peak 5 km', km:'km', m:'m',
  atm:'Atmosphere', r_td:'Dew point', r_lcl:'Cloud base height', r_tc:'Rising air at cloud base', r_plains:'Over the plains', r_peaks:'Over the peaks',
  raining:'Raining', snowing:'Snowing', dry_rain:'Dry · rain next', dry_snow:'Dry · snow next',
  budget:'Water budget · parcels', b_e:'Evaporated + transpired', b_v:'Rising as vapour now', b_c:'Held in clouds now', b_p:'Fallen as rain or snow',
  b_note:'Water is never used up. It only changes state and place.', key:'Key',
  k_vap:'Water vapour (an invisible gas, drawn as faint mist)', k_drop:'Cloud droplet (liquid)', k_rain:'Raindrop', k_snow:'Snowflake (ice)', k_flow:'Runoff and groundwater',
  scale_note:'Scene heights are not to scale. Readings are calculated from the sliders.',
  per_s:'parcels/s', wait_vap:'Waiting for vapour', filling:'Cloud still filling', rain:'Rain', snow:'Snow', rain_snow:'Rain + snow',
  l_sun:'Sun', l_ocean:'Ocean', l_lake:'Lake', l_mtn:'Mountains', l_gw:'Groundwater', l_vap:'Water vapour rising', l_lvl:'Condensation level', l_forming:'Cloud forming', l_river:'River',
  co_evap:"Sun's heat → water evaporates", co_salt:'Salt stays in the sea; only water evaporates', co_trans:'Plants release vapour → transpiration',
  co_dew:'Dew point reached → droplets form', co_rain:'Drops too heavy → rain falls', co_snow:'Below 0 °C → falls as snow',
  co_runoff:'Runoff → rivers carry water to the sea', co_infil:'Infiltration → water soaks into the ground', co_gw:'Groundwater flows slowly to the sea',
  co_store:'Snow stores water until it melts', co_tap:'Tap a cloud to look inside it', co_wait:'This cloud is still forming',
  mag_title:'Inside a cloud', mag_note:'Not to scale', look:'Look inside a cloud',
  mag_a:'Water vapour molecules move freely in the warm air.', mag_b:'The air cools to its dew point. Molecules collect on a salt crystal and form a droplet.',
  mag_c:'Countless droplets make the cloud. They bump into each other and join.', mag_d:'The drop grows too heavy to float and falls as a raindrop.',
  ml_mol:'Water molecule', ml_salt:'Salt crystal (nucleus)', ml_drop:'Cloud droplet ≈ 0.01 mm', ml_rain:'Raindrop ≈ 1 mm',
  ml_liq:'Liquid water · hydrogen bonds',
  mag_title_ice:'Inside a freezing cloud',
  ice_b:'Below 0 °C, molecules settle on a dust grain and lock straight into ice: a lattice of hexagonal rings.',
  ice_c:'The ice crystal grows as nearby droplets evaporate onto it, branching into six arms.',
  ice_d:'The snowflake grows too heavy to float and falls as snow.',
  ml_dust:'Dust grain (ice nucleus)', ml_ice:'Ice · hexagonal rings', ml_crys:'Ice crystal', ml_flake:'Snowflake ≈ 2 mm'
}};

/* Teach mode steps */
const TEACH_T={
en:[{cap:'The Sun warms the sea. Water escapes as invisible vapour and rises.',hint:'The vapour has reached the cool air at the dashed line. Press Next.'},
    {cap:'The air has cooled to its dew point. Vapour condenses into droplets and the clouds grow. Tap a cloud to look inside.',hint:'The clouds are full of droplets. Press Next.'},
    {cap:'Drops grow too heavy and fall. Watch the water run off to the sea and soak into the ground.',hint:'Finish lets the whole cycle run on its own.'}],
};

let lang='en';   // English only (the language switch was removed)
const t=(k,vars)=>{ let s=(L[lang]&&L[lang][k])??L.en[k]??k; if(vars) for(const v in vars) s=s.split('{'+v+'}').join(vars[v]); return s; };

const $ = id => document.getElementById(id);
const clamp = (x,a,b)=>Math.min(b,Math.max(a,x));
const lerp = (a,b,t)=>a+(b-a)*t;
const smooth = (a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
const ease = t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MQ='(max-width:1179px)';
const narrow=()=>matchMedia(MQ).matches;

/* ---------- Simulation state ---------- */
const S={T:28,RH:60,wind:4,speed:1,paused:false,labels:true,arrows:false,
  E:0,P:0,gate:3,events:[],lastCross:null,evapRate:0,condRate:0,precRate:0,_cond:0,_prec:0, focus:'all',
  flowEv:{runoff:0,infil:0,gw:0,snow:0}, runoffIn:0,mtnIn:0,gwIn:0, flowR:0,flowM:0,flowG:0};

/* ---------- Process chips: show which step is in focus ---------- */
function showInfo(p){ document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed', String(c.dataset.p===p))); }

/* ---------- Tabs and responsive placement ---------- */
const appEl=document.querySelector('.app');
function setTab(t_){
  appEl.dataset.tab=t_;
  document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===t_)));
}
// phone: Controls and Data are tabs; smart panel: the Data button opens and closes the Data panel
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>setTab(!narrow()&&appEl.dataset.tab===b.dataset.tab?'none':b.dataset.tab));
setTab(narrow()?'controls':'none');
/* On phones and tablets the thermometer moves into the Data tab; Teach and Credits sit under the scene */
function placeResponsive(){
  const th=$('thermo'), te=$('teach'), cr=$('credits');
  if(narrow()){ $('pane-data').prepend(th); $('ui').prepend(cr); $('ui').prepend(te); }
  else { for(const e of [th,te,cr]) $('stage').insertBefore(e,$('loader')); }
}
placeResponsive();
matchMedia(MQ).addEventListener('change',()=>{ placeResponsive(); setTab(narrow()?'controls':'none'); closeMag(); });

/* ---------- Renderer / scene ---------- */
const stage=$('stage');
let renderer;
try{ renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); }
catch(e){ $('load-msg').textContent='This device could not start 3D graphics (WebGL). Try another browser.'; throw e; }
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.setClearColor(0x000000,0);
renderer.domElement.classList.add('gl');
stage.insertBefore(renderer.domElement,$('storm'));
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(38,1,0.1,400);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true; controls.minDistance=8; controls.maxDistance=80; controls.maxPolarAngle=Math.PI*0.495;
const hemi=new THREE.HemisphereLight(0xffffff,0x4d5d49,1.5); scene.add(hemi);
const sunLight=new THREE.DirectionalLight(0xfff1d6,2.2); sunLight.position.set(-8,22,14); scene.add(sunLight);

const pointMats=[];
let ptScale=1;
function resize(){
  const w=stage.clientWidth,h=stage.clientHeight; if(!w||!h) return;
  renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix();
  ptScale=renderer.getDrawingBufferSize(new THREE.Vector2()).y/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)));
  for(const m of pointMats) m.uniforms.uScale.value=ptScale;
}
new ResizeObserver(resize).observe(stage);

/* ---------- Camera presets ---------- */
const PRESETS={
  all:{t:[0,6.3,0],o:[25,12,19]},
  evap:{t:[0,4.6,4.5],o:[16,6,13]},
  cond:{t:[-2.2,8.2,-3],o:[15,3.5,11]},
  prec:{t:[0.5,4.6,-1.5],o:[19,5,11]}
};
let camTween=null;
function goTo(name,instant){
  const p=PRESETS[name]; const k=Math.max(1,Math.pow(1.25/camera.aspect,0.7));
  const tg=new THREE.Vector3(...p.t), pos=tg.clone().add(new THREE.Vector3(...p.o).multiplyScalar(k));
  if(instant||reduceMotion){camera.position.copy(pos);controls.target.copy(tg);controls.update();camTween=null;return;}
  camTween={p0:camera.position.clone(),t0:controls.target.clone(),p1:pos,t1:tg,s:0};
}

/* ---------- Atmosphere ---------- */
const Y_BASE=8.39;   // condensation level of the model's rain cloud at rest
const es=T=>6.112*Math.exp(17.62*T/(243.12+T));                   // saturation vapour pressure, hPa
const dewPoint=(T,RH)=>{const g=Math.log(RH/100)+17.62*T/(243.12+T);return 243.12*g/(17.62-g);};
const REF=es(28)*(1-0.60)*(0.5+0.15*4);
const evapIndex=()=>es(S.T)*(1-S.RH/100)*(0.5+0.15*S.wind)/REF;  // Dalton: (es - ea)·f(wind)
const BASE_RATE=24;   // parcels per second from open water at 28 °C, 60 %, 4 m/s
const TRANS_RATE=4;   // parcels per second transpired by plants at the same conditions
function atmos(){
  const Td=dewPoint(S.T,S.RH), lcl=0.125*(S.T-Td), tc=S.T-9.8*lcl, pk=S.T-6.5*5;
  const yc=Y_BASE+clamp(lerp(-1.1,1.0,(lcl-0.2)/2.8),-1.1,1.0);
  return {Td,lcl,tc,pk,yc,snowPeak:pk<=1};
}
let A=atmos();

const clouds=[
  {name:'Cloud127',half:new THREE.Vector3(1.05,0.79,1.40),rest:new THREE.Vector3(-2.35,9.18,-0.81),cap:120,u:0,raining:false,drain:0,share:0.6},
  {name:'Cloud226',half:new THREE.Vector3(1.30,0.97,1.62),rest:new THREE.Vector3(-2.56,10.17,-6.17),cap:90,u:0,raining:false,drain:0,share:0.4}
];
const cloudScale=c=>c<=0?0.0001:1.3*Math.pow(Math.min(c,1.25),0.6);

/* ---------- Ground height grid (filled from the model) ---------- */
const G={x0:-5.8,z0:-11.2,cs:0.3,nx:40,nz:76,h:null,w:null};
const gIdx=(x,z)=>clamp(Math.floor((z-G.z0)/G.cs),0,G.nz-1)*G.nx+clamp(Math.floor((x-G.x0)/G.cs),0,G.nx-1);
function groundY(x,z){ return G.h?G.h[gIdx(x,z)]:3; }
const isWater=(x,z)=>G.w?G.w[gIdx(x,z)]===1:false;

/* ---------- Water paths for runoff and groundwater (traced from the model) ---------- */
const LAKE=[-0.3,3.13,-0.3];
const RIVER=[[-0.9,3.06,0.4],[-1.4,2.97,1.0],[-1.55,2.92,1.5],[-1.7,2.87,2.0],[-1.75,2.81,2.5],[-2.07,2.76,3.0],[-2.55,2.73,3.5],
  [-2.65,2.69,4.0],[-2.8,2.65,4.5],[-2.9,2.63,5.0],[-2.85,2.62,5.7],[-2.5,2.62,6.8]];
const MOUNT_XZ=[[-2.4,-6.0],[-2.1,-4.8],[-1.6,-3.4],[-1.1,-2.0],[-0.6,-1.0]];
let MOUNT=[];
const GX=5.56;   // just in front of the cut-away face
const CH_Y={'-8.5':4.06,'-8':3.33,'-7.5':3.0,'-7':2.8,'-6.5':2.46,'-6':2.12,'-5.5':2.0,'-5':2.03,'-4.5':2.09,'-4':2.22,'-3.5':2.0,'-3':1.46,'-2.5':1.37,
  '-2':1.24,'-1.5':1.24,'-1':1.19,'-0.5':1.21,'0':1.28,'0.5':1.32,'1':1.35,'1.5':1.34,'2':1.34,'2.5':1.36,'3':1.42,'3.5':1.47,'4':1.46,'4.5':1.43,'5':1.36,'5.5':1.27,'6':1.08};
const chan=(z0)=>{ const out=[]; for(let z=z0;z<=6.001;z+=0.5){ const k=String(Math.round(z*2)/2); out.push([GX,CH_Y[k]+0.07,z]); } out.push([GX,1.0,6.6]); return out; };
const GW_A=[[GX,2.86,0.5],[GX,1.42,0.5],...chan(1)];      // seep from the plains
const GW_B=[[GX,3.68,-5.0],[GX,2.12,-5.0],...chan(-4.5)];  // seep from the hills
function pathLen(pts){ const c=[0]; for(let i=1;i<pts.length;i++){ const a=pts[i-1],b=pts[i]; c.push(c[i-1]+Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])); } return c; }
function pathAt(pts,cum,d,out){
  let i=1; while(i<cum.length-1&&cum[i]<d) i++;
  const a=pts[i-1],b=pts[i], seg=Math.max(1e-6,cum[i]-cum[i-1]), k=clamp((d-cum[i-1])/seg,0,1);
  out[0]=lerp(a[0],b[0],k); out[1]=lerp(a[1],b[1],k); out[2]=lerp(a[2],b[2],k); return out;
}

/* ---------- Particle systems ---------- */
function pointsMaterial(soft){
  const m=new THREE.ShaderMaterial({
    uniforms:{uScale:{value:ptScale}},
    vertexShader:`attribute vec3 aColor;attribute float aAlpha;attribute float aSize;varying vec3 vC;varying float vA;uniform float uScale;
      void main(){vC=aColor;vA=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=max(1.5,aSize*uScale/-mv.z);gl_Position=projectionMatrix*mv;}`,
    fragmentShader: soft
      // vapour: a soft wisp with no hard edge
      ? `varying vec3 vC;varying float vA;
      void main(){vec2 p=gl_PointCoord-0.5;float r=length(p)*2.0;if(r>1.0)discard;gl_FragColor=vec4(vC,vA*exp(-r*r*2.4)*(1.0-0.85*r));}`
      : `varying vec3 vC;varying float vA;
      void main(){vec2 p=gl_PointCoord-0.5;float r=length(p)*2.0;if(r>1.0)discard;
      vec3 c=mix(vC*0.55,vC,smoothstep(0.98,0.62,r));gl_FragColor=vec4(c,vA*smoothstep(1.0,0.82,r));}`,
    transparent:true,depthWrite:false});
  pointMats.push(m); return m;
}
function makePoints(N,soft){
  const g=new THREE.BufferGeometry();
  const pos=new Float32Array(N*3), col=new Float32Array(N*3), al=new Float32Array(N), sz=new Float32Array(N);
  g.setAttribute('position',new THREE.BufferAttribute(pos,3).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('aColor',new THREE.BufferAttribute(col,3).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('aAlpha',new THREE.BufferAttribute(al,1).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('aSize',new THREE.BufferAttribute(sz,1).setUsage(THREE.DynamicDrawUsage));
  const pts=new THREE.Points(g,pointsMaterial(soft)); pts.frustumCulled=false; scene.add(pts);
  return {N,g,pos,col,al,sz,pts,n:0};
}
function flush(sys){
  sys.g.setDrawRange(0,sys.n);
  for(const k of ['position','aColor','aAlpha','aSize']) sys.g.attributes[k].needsUpdate=true;
}

// vapour + droplets
const MAXV=2600;
const V={sys:makePoints(MAXV,true),list:[]};
const VAP=[0.52,0.80,0.93], DROP=[1.0,1.0,1.0];
function addVapour(x,y,z){
  if(V.list.length>=MAXV) return;
  const ci=Math.random()<clouds[0].share?0:1;
  const off=new THREE.Vector3(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1); if(off.length()>1) off.normalize();
  V.list.push({x,y,z,x0:x,z0:z,y0:y,ci,off,ph:1,hold:0.05+Math.random()*0.7,age:0,t2:0,d2:1+Math.random()*0.6,vy:0.6+Math.random()*0.35,
    w:Math.random()*6.28,tx:clouds[ci].rest.x+off.x*clouds[ci].half.x*0.8,tz:clouds[ci].rest.z+off.z*clouds[ci].half.z*0.8,sx:0,sy:0,sz:0});
  S.E++;
}
function spawnVapour(){
  if(Math.random()<0.06){ // lake
    const a=Math.random()*Math.PI*2, r=Math.sqrt(Math.random());
    addVapour(-0.45+Math.cos(a)*1.0*r, 3.07, -0.1+Math.sin(a)*0.85*r);
  } else addVapour(lerp(-5.0,5.2,Math.random()), 2.56, lerp(5.8,10.5,Math.random()));
}
let lastTrans=null;
function spawnTranspiration(){
  for(let tries=0;tries<8;tries++){
    const x=lerp(-5.0,5.0,Math.random()), z=lerp(-5.5,4.2,Math.random()), h=groundY(x,z);
    if(isWater(x,z)||h<2.7||h>3.9) continue;
    addVapour(x,h+0.06,z); lastTrans=[x,h+0.06,z]; return;
  }
}
function stepVapour(dt){
  const heat=clamp((S.T-10)/35,0,1);
  const Lv=V.list; let w=0;
  for(let i=0;i<Lv.length;i++){
    const p=Lv[i]; p.age+=dt;
    if(p.ph===1){
      p.y+=p.vy*(0.8+0.6*heat)*dt;
      const span=Math.max(0.5,A.yc-p.y0), s=clamp((p.y-p.y0)/span,0,1), e=ease(s);
      const wob=Math.sin(p.age*1.7+p.w)*0.25*(1-s);
      p.x=lerp(p.x0,p.tx,e)+wob; p.z=lerp(p.z0,p.tz,e)+Math.cos(p.age*1.3+p.w)*0.2*(1-s);
      if(p.y>=A.yc){ if(S.gate<2){ p.y=A.yc-p.hold; } else { p.ph=2;p.t2=0;p.sx=p.x;p.sy=p.y;p.sz=p.z;S._cond++; S.lastCross=[p.x,p.y,p.z]; } }
    } else {
      p.t2+=dt; const c=clouds[p.ci], sc=Math.max(0.55,cloudScale(c.u/c.cap));
      const cy=A.yc+c.half.y*sc;
      const tx=c.rest.x+p.off.x*c.half.x*sc*0.85, ty=cy+p.off.y*c.half.y*sc*0.7, tz=c.rest.z+p.off.z*c.half.z*sc*0.85;
      const k=ease(clamp(p.t2/p.d2,0,1));
      p.x=lerp(p.sx,tx,k); p.y=lerp(p.sy,ty,k); p.z=lerp(p.sz,tz,k);
      if(p.t2>=p.d2){ c.u+=1; continue; }
    }
    Lv[w++]=p;
  }
  Lv.length=w;
}
function drawVapour(){
  const s=V.sys; let n=0;
  for(const p of V.list){
    const j=n*3; s.pos[j]=p.x; s.pos[j+1]=p.y; s.pos[j+2]=p.z;
    let c,a,z;
    if(p.ph===1){ c=VAP; a=0.9*smooth(0,0.9,p.age); z=0.36; }
    else { const k=clamp(p.t2/0.5,0,1); c=[lerp(VAP[0],DROP[0],k),lerp(VAP[1],DROP[1],k),lerp(VAP[2],DROP[2],k)];
      a=(0.55+0.4*k)*(1-smooth(0.7,1,p.t2/p.d2)); z=lerp(0.34,0.16,k); }
    s.col[j]=c[0]; s.col[j+1]=c[1]; s.col[j+2]=c[2]; s.al[n]=a; s.sz[n]=z; n++;
  }
  s.n=n; flush(s);
}

// rain streaks
const MAXR=900;
const R={pos:new Float32Array(MAXR*6),list:[]};
const rainGeo=new THREE.BufferGeometry();
rainGeo.setAttribute('position',new THREE.BufferAttribute(R.pos,3).setUsage(THREE.DynamicDrawUsage));
const rainLines=new THREE.LineSegments(rainGeo,new THREE.LineBasicMaterial({color:0x4f86d1,transparent:true,opacity:0.85,depthWrite:false}));
rainLines.frustumCulled=false; scene.add(rainLines);
// snow, splashes, and water on the ground
const SN={sys:makePoints(500),list:[]};
const SP={sys:makePoints(260),list:[]};
const FL={sys:makePoints(900),list:[]};
const FCOL={run:[0.16,0.48,0.86],inf:[0.34,0.47,0.66],gw:[0.12,0.42,0.86]};

function spawnPrecip(ci){
  const c=clouds[ci], sc=cloudScale(c.u/c.cap);
  const a=Math.random()*Math.PI*2, r=Math.sqrt(Math.random());
  const x=c.rest.x+Math.cos(a)*c.half.x*sc*0.85*r, z=c.rest.z+Math.sin(a)*c.half.z*sc*0.85*r, y=A.yc+0.05;
  const snow = ci===1 && A.snowPeak;
  if(snow){ if(SN.list.length<500) SN.list.push({x,y,z,age:0,w:Math.random()*6.28}); }
  else if(R.list.length<MAXR) R.list.push({x,y,z,vy:6+Math.random()*2,ci});
}
function addFlow(type,pts,speed){
  if(FL.list.length>=900) return;
  FL.list.push({type,pts,cum:pathLen(pts),d:0,speed:speed*(0.85+Math.random()*0.3),age:0,p:[0,0,0]});
}
function onRainLand(x,y,z,ci){
  const r=Math.random();
  if(NEW.flow){ // flowing-water surfaces: only record how much water is arriving
    if(r<0.3){ S.runoffIn+=1; if(ci===1) S.mtnIn+=1; S.flowEv.runoff++; }
    else if(r<0.45){ S.gwIn+=1; S.flowEv.infil++; S.gwAcc=(S.gwAcc||0)+1; if(S.gwAcc>=2){ S.gwAcc=0; S.flowEv.gw++; } }
    return;
  }
  if(r<0.3){ // runoff over the surface to the lake, then down the river to the sea
    const start=[[x,y+0.05,z]];
    const route = ci===1 ? [...start, ...MOUNT, LAKE, ...RIVER] : [...start, LAKE, ...RIVER];
    addFlow('run',route,1.25); S.flowEv.runoff++;
  } else if(r<0.45){ // infiltration: soaks into the soil
    addFlow('inf',[[x,y+0.03,z],[x,y-0.7,z]],0.45); S.flowEv.infil++;
    S.gwAcc=(S.gwAcc||0)+1;
    if(S.gwAcc>=2){ S.gwAcc=0; addFlow('gw', ci===1?GW_B:GW_A, 0.55); S.flowEv.gw++; }
  }
}
function stepPrecip(dt){
  const wz=-0.06*S.wind;
  let w=0;
  for(const p of R.list){
    p.y-=p.vy*dt; p.z+=wz*dt*2;
    const g=groundY(p.x,p.z);
    if(p.y<=g+0.03){ if(Math.random()<0.5&&SP.list.length<260) SP.list.push({x:p.x,y:g+0.04,z:p.z,age:0}); onRainLand(p.x,g,p.z,p.ci); continue; }
    R.list[w++]=p;
  }
  R.list.length=w; w=0;
  for(const p of SN.list){
    p.age+=dt; p.y-=(1.05+0.35*Math.sin(p.age*3+p.w))*dt; p.x+=Math.sin(p.age*1.8+p.w)*0.45*dt; p.z+=wz*dt+Math.cos(p.age*1.4+p.w)*0.4*dt;
    if(p.y<=groundY(p.x,p.z)+0.05){ S.flowEv.snow++; continue; }
    SN.list[w++]=p;
  }
  SN.list.length=w; w=0;
  for(const p of SP.list){ p.age+=dt; if(p.age>0.35) continue; SP.list[w++]=p; }
  SP.list.length=w; w=0;
  for(const f of FL.list){
    f.age+=dt; f.d+=f.speed*dt;
    const end=f.cum[f.cum.length-1];
    if(f.d>=end+0.4) continue;
    pathAt(f.pts,f.cum,Math.min(f.d,end),f.p);
    FL.list[w++]=f;
  }
  FL.list.length=w;
}
function drawPrecip(){
  let n=0;
  for(const p of R.list){ const j=n*6; R.pos[j]=p.x;R.pos[j+1]=p.y;R.pos[j+2]=p.z; R.pos[j+3]=p.x;R.pos[j+4]=p.y+0.38;R.pos[j+5]=p.z+0.0065*S.wind; n++; }
  rainGeo.setDrawRange(0,n*2); rainGeo.attributes.position.needsUpdate=true;
  const s=SN.sys; n=0;
  for(const p of SN.list){ const j=n*3; s.pos[j]=p.x;s.pos[j+1]=p.y;s.pos[j+2]=p.z; s.col[j]=1;s.col[j+1]=1;s.col[j+2]=1; s.al[n]=0.95; s.sz[n]=0.15; n++; }
  s.n=n; flush(s);
  const q=SP.sys; n=0;
  for(const p of SP.list){ const j=n*3,k=p.age/0.35; q.pos[j]=p.x;q.pos[j+1]=p.y;q.pos[j+2]=p.z; q.col[j]=0.55;q.col[j+1]=0.75;q.col[j+2]=0.95; q.al[n]=0.8*(1-k); q.sz[n]=0.06+0.2*k; n++; }
  q.n=n; flush(q);
  const f=FL.sys; n=0;
  for(const p of FL.list){ const j=n*3, c=FCOL[p.type], end=p.cum[p.cum.length-1];
    f.pos[j]=p.p[0]; f.pos[j+1]=p.p[1]; f.pos[j+2]=p.p[2]; f.col[j]=c[0]; f.col[j+1]=c[1]; f.col[j+2]=c[2];
    f.al[n]=0.95*smooth(0,0.25,p.age)*(1-smooth(end-0.1,end+0.4,p.d)); f.sz[n]=p.type==='gw'?0.15:0.12; n++; }
  f.n=n; flush(f);
}

/* ---------- Cloud water and rainfall ---------- */
const accum=[0,0];
function stepClouds(dt){
  for(let i=0;i<2;i++){
    const c=clouds[i], f=c.u/c.cap;
    if(!c.raining && f>=1 && S.gate>=3){ c.raining=true; S.events.push(i); }
    if(c.raining && f<=0.35) c.raining=false;
    c.drain = c.raining ? c.cap*(0.28+2*Math.max(0,f-1))*dt : 0;
    c.drain=Math.min(c.drain,c.u); c.u-=c.drain; S.P+=c.drain; S._prec+=c.drain;
    if(c.raining){
      accum[i]+=c.drain*(i===1&&A.snowPeak?4.2:3.2);
      while(accum[i]>=1){accum[i]-=1; spawnPrecip(i);}
    }
  }
}

/* ---------- Sun's rays: stronger with the Sun's heat slider ---------- */
const RAYS={group:new THREE.Group(),beams:[],time:0,on:true,vis:1,sun:new THREE.Vector3(-4.41,13.17,8.42)};
scene.add(RAYS.group);
{
  // where each ray lands: mostly the sea, some on the plains and the lake (in the order they switch on)
  const T=[[-1.5,2.57,8.0],[2.5,2.57,7.2],[-3.4,3.1,2.6],[0.6,2.57,9.6],[-0.4,3.12,-0.2],[3.9,2.57,9.3],[-3.6,2.57,6.4],
           [1.6,3.2,1.2],[1.1,2.57,6.2],[4.2,2.57,6.6],[-2.4,2.57,9.9],[3.4,3.25,-2.2],[-0.8,2.57,6.8],[2.8,2.57,10.3]];
  const geo=new THREE.CylinderGeometry(1,1,1,8,1,true), cone=new THREE.ConeGeometry(1,1,10);
  for(const tp of T){
    const mat=new THREE.ShaderMaterial({uniforms:{uTime:{value:0},uOp:{value:0},uSpeed:{value:1}},transparent:true,depthWrite:false,
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:`uniform float uTime,uOp,uSpeed;varying vec2 vUv;
        void main(){float f=fract(vUv.y*7.0-uTime*uSpeed);float dash=smoothstep(0.30,0.45,f)*(1.0-smoothstep(0.55,0.72,f));
        float ends=smoothstep(0.0,0.12,vUv.y)*smoothstep(1.0,0.9,vUv.y);
        vec3 col=mix(vec3(1.0,0.70,0.16),vec3(1.0,0.93,0.55),dash);
        gl_FragColor=vec4(col,(0.38+0.62*dash)*uOp*ends);}`});
    const beam=new THREE.Mesh(geo,mat); beam.frustumCulled=false;
    const head=new THREE.Mesh(cone,new THREE.MeshBasicMaterial({color:0xf2a51e,transparent:true,opacity:0,depthWrite:false}));
    RAYS.group.add(beam,head); RAYS.beams.push({to:new THREE.Vector3(...tp),beam,head,mat,op:0});
  }
  // soft glow around the Sun, hidden behind the Sun's sphere where they overlap
  const cv=document.createElement('canvas'); cv.width=cv.height=128; const g=cv.getContext('2d');
  const rg=g.createRadialGradient(64,64,8,64,64,64); rg.addColorStop(0,'rgba(255,214,90,0.95)'); rg.addColorStop(0.45,'rgba(255,200,70,0.35)'); rg.addColorStop(1,'rgba(255,190,60,0)');
  g.fillStyle=rg; g.fillRect(0,0,128,128);
  const tex=new THREE.CanvasTexture(cv); tex.colorSpace=THREE.SRGBColorSpace;
  RAYS.halo=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,opacity:0}));
  RAYS.group.add(RAYS.halo);
}
const _up=new THREE.Vector3(0,1,0), _d=new THREE.Vector3(), _a=new THREE.Vector3();
function updateRays(dt,raw){
  if(B.sun) B.sun.getWorldPosition(RAYS.sun);
  const k=clamp((S.T-10)/35,0,1);              // 0 at 10 °C, 1 at 45 °C
  RAYS.vis=lerp(RAYS.vis,RAYS.on?1:0,1-Math.exp(-5*raw));
  RAYS.group.visible=RAYS.vis>0.01;
  if(!RAYS.group.visible) return;
  RAYS.time+=dt;
  const n=4+10*k, speed=0.7+1.6*k, rad=0.035+0.05*k, sunR=1.15*(0.85+0.25*k);
  RAYS.beams.forEach((r,i)=>{
    const want=clamp(n-i,0,1)*(0.45+0.5*k);
    r.op=lerp(r.op,want,1-Math.exp(-4*raw)); const op=r.op*RAYS.vis;
    _d.subVectors(r.to,RAYS.sun); const len=_d.length(); _d.divideScalar(len);
    const startOff=sunR+0.15, endOff=0.32, L=Math.max(0.1,len-startOff-endOff);
    _a.copy(RAYS.sun).addScaledVector(_d,startOff+L/2);
    r.beam.position.copy(_a); r.beam.quaternion.setFromUnitVectors(_up,_d); r.beam.scale.set(rad,L,rad);
    r.mat.uniforms.uTime.value=RAYS.time; r.mat.uniforms.uSpeed.value=speed; r.mat.uniforms.uOp.value=op;
    r.head.position.copy(r.to).addScaledVector(_d,-endOff/2-0.02); r.head.quaternion.setFromUnitVectors(_up,_d);
    r.head.scale.set(rad*3.2,endOff,rad*3.2); r.head.material.opacity=op*1.1;
    r.beam.visible=r.head.visible=op>0.01;
  });
  RAYS.halo.position.copy(RAYS.sun); const hs=3.2+3.2*k; RAYS.halo.scale.set(hs,hs,1);
  RAYS.halo.material.opacity=(0.35+0.55*k)*RAYS.vis;
}

/* ---------- Condensation level marker ---------- */
const levelGroup=new THREE.Group(); scene.add(levelGroup);
{
  const pts=[[-5.6,-11],[5.6,-11],[5.6,11],[-5.6,11]].map(([x,z])=>new THREE.Vector3(x,0,z));
  const g=new THREE.BufferGeometry().setFromPoints(pts);
  const line=new THREE.LineLoop(g,new THREE.LineDashedMaterial({color:0x5d67b0,dashSize:0.45,gapSize:0.3,transparent:true,opacity:0.9}));
  line.computeLineDistances(); levelGroup.add(line);
  const plane=new THREE.Mesh(new THREE.PlaneGeometry(11.2,22),new THREE.MeshBasicMaterial({color:0x8d96d8,transparent:true,opacity:0.07,side:THREE.DoubleSide,depthWrite:false}));
  plane.rotation.x=-Math.PI/2; levelGroup.add(plane);
}

/* ---------- Labels ---------- */
const LBL=[
  {key:'l_sun',pos:()=>[-4.4,14.7,8.4]},
  {key:'l_ocean',pos:()=>[2.2,2.7,8.6]},
  {key:'l_lake',pos:()=>[-0.4,3.3,-0.1]},
  {key:'l_river',cls:'k-flow',pos:()=>[-2.6,2.85,4.0],show:()=>stage.clientWidth>560},
  {key:'l_mtn',pos:()=>[0.6,5.6,-8.3]},
  {key:'l_gw',cls:'k-flow',pos:()=>[5.55,1.65,3.2]},
  {key:'l_vap',cls:'k-evap',pos:()=>[1.2,(2.6+A.yc)/2+0.4,5.2],show:()=>V.list.length>8&&stage.clientWidth>560},
  {key:'l_lvl',cls:'k-cond',pos:()=>[5.6,A.yc,10.4]},
  {key:'c1',cls:'k-cond',pos:()=>{const c=clouds[0];return [c.rest.x,A.yc+c.half.y*2*cloudScale(c.u/c.cap)+0.25,c.rest.z];},
    txt:()=>clouds[0].raining?'rain':'l_forming',show:()=>clouds[0].u>3},
  {key:'c2',cls:'k-cond',pos:()=>{const c=clouds[1];return [c.rest.x,A.yc+c.half.y*2*cloudScale(c.u/c.cap)+0.25,c.rest.z];},
    txt:()=>clouds[1].raining?(A.snowPeak?'snow':'rain'):'l_forming',show:()=>clouds[1].u>3}
];
for(const l of LBL){ const e=document.createElement('div'); e.className='lbl '+(l.cls||''); $('labels').appendChild(e); l.el=e; l.last=''; }
function labelText(){ for(const l of LBL){ l.last=''; if(!l.txt) l.el.textContent=t(l.key); } }
const _v=new THREE.Vector3();
function drawLabels(){
  const w=stage.clientWidth,h=stage.clientHeight;
  for(const l of LBL){
    const vis=S.labels&&(!l.show||l.show());
    if(!vis){ if(l.el.style.display!=='none') l.el.style.display='none'; continue; }
    _v.set(...l.pos()).project(camera);
    if(_v.z>1||Math.abs(_v.x)>1.1||Math.abs(_v.y)>1.1){ l.el.style.display='none'; continue; }
    l.el.style.display='';
    if(l.txt){ const k=l.txt(); if(k!==l.last){ l.el.textContent=t(k); l.last=k; l.el.className='lbl '+(k==='rain'||k==='snow'?'k-prec':'k-cond'); } }
    l.el.style.transform=`translate(${(_v.x*0.5+0.5)*w}px,${(-_v.y*0.5+0.5)*h}px) translate(-50%,calc(-100% - 7px))`;
  }
}

/* ---------- Model ---------- */
let mixer=null, root=null;
const B={rain:[],ripple:[],snow:[],arrow:[],sun:null,c:[null,null],all:[]};
const darkU={d1:{value:0},d2:{value:0},j1:{value:25},j2:{value:24}};
const vis={rain:0,snow:0,arrows:0};

function patchCloudMaterial(mat){
  mat.onBeforeCompile=sh=>{
    sh.uniforms.uDark1=darkU.d1; sh.uniforms.uDark2=darkU.d2; sh.uniforms.uJ1=darkU.j1; sh.uniforms.uJ2=darkU.j2;
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uJ1;uniform float uJ2;varying float vC1;varying float vC2;')
      .replace('#include <skinbase_vertex>',`#include <skinbase_vertex>
        vC1=dot(skinWeight,step(abs(skinIndex-vec4(uJ1)),vec4(0.5)));
        vC2=dot(skinWeight,step(abs(skinIndex-vec4(uJ2)),vec4(0.5)));`);
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uDark1;uniform float uDark2;varying float vC1;varying float vC2;')
      .replace('#include <opaque_fragment>',`outgoingLight*=mix(vec3(1.0),vec3(0.40,0.44,0.51),clamp(uDark1*vC1+uDark2*vC2,0.0,1.0));
        #include <opaque_fragment>`);
  };
  mat.needsUpdate=true;
}
/* The model paints glowing magma just under the groundwater. Real magma lies many kilometres deeper and plays
   no part in the water cycle, so the lowest band of the cut-away is repainted as ordinary dark rock. */
function patchRock(mat){
  mat.onBeforeCompile=sh=>{
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying float vWY;')
      .replace('#include <project_vertex>','#include <project_vertex>\nvWY=(modelMatrix*vec4(transformed,1.0)).y;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vWY;')
      .replace('#include <map_fragment>',`#include <map_fragment>
        float rRed=max(smoothstep(0.03,0.12,diffuseColor.r-max(diffuseColor.g,diffuseColor.b)*1.25),
          smoothstep(1.35,1.8,diffuseColor.r/max(max(diffuseColor.g,diffuseColor.b),0.01))*smoothstep(0.015,0.04,diffuseColor.r))*step(vWY,2.3);   // even dim red, judged by hue
        float rockK=max(smoothstep(1.5,1.0,vWY),rRed);
        float rLum=dot(diffuseColor.rgb,vec3(0.299,0.587,0.114));
        diffuseColor.rgb=mix(diffuseColor.rgb, vec3(0.040,0.036,0.033)+rLum*vec3(0.10,0.092,0.085), rockK);`)
      .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\nfloat eRed=smoothstep(0.015,0.08,totalEmissiveRadiance.r-max(totalEmissiveRadiance.g,totalEmissiveRadiance.b)*1.2);\ntotalEmissiveRadiance*=(1.0-smoothstep(1.6,1.05,vWY))*(1.0-rockK)*(1.0-eRed);   // no magma glow on any face');
  };
  mat.needsUpdate=true;
}

/* Groundwater: soft light drifting through the model's own channel, on every cut-away face */
const GWU={uPh:{value:0},uAmt:{value:0.7}};
function patchGroundwater(mesh){
  const mat=mesh.material.clone(); mesh.material=mat;
  mat.onBeforeCompile=sh=>{
    sh.uniforms.uPh=GWU.uPh; sh.uniforms.uAmt=GWU.uAmt;
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vGW;')
      .replace('#include <project_vertex>','#include <project_vertex>\nvGW=(modelMatrix*vec4(transformed,1.0)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>',`#include <common>
      varying vec3 vGW; uniform float uPh,uAmt;
      float gh3(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
      float gn3(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);
        return mix(mix(mix(gh3(i),gh3(i+vec3(1,0,0)),f.x),mix(gh3(i+vec3(0,1,0)),gh3(i+vec3(1,1,0)),f.x),f.y),
                   mix(mix(gh3(i+vec3(0,0,1)),gh3(i+vec3(1,0,1)),f.x),mix(gh3(i+vec3(0,1,1)),gh3(i+vec3(1,1,1)),f.x),f.y),f.z); }`)
      .replace('#include <map_fragment>',`#include <map_fragment>
        // two noise layers drifting downhill towards the sea at different speeds: soft, rippling light, never stripes
        vec3 gd=normalize(vec3(0.0,-0.6,1.0));
        vec3 q=vGW*2.2-gd*uPh;
        float gnA=gn3(q), gnB=gn3(q*2.3+vec3(7.1)-gd*uPh*0.7);
        float gn=gnA*0.6+gnB*0.4;
        float ghl=smoothstep(0.52,0.85,gn);
        diffuseColor.rgb*=0.9+0.2*gn;
        diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*0.85+vec3(0.35,0.55,0.62),ghl*uAmt);`);
  };
  mat.needsUpdate=true;
}
function onModel(gltf){
  root=gltf.scene; root.scale.setScalar(100); scene.add(root);
  let skinned=[];
  root.traverse(o=>{
    if(o.isSkinnedMesh){ o.frustumCulled=false; skinned.push(o); }
    if(o.isBone){
      const n=o.name;
      if(/^Rain_drop/.test(n)) B.rain.push(o);
      else if(/^Ripple_/.test(n)) B.ripple.push(o);
      else if(/^Snow_/.test(n)) B.snow.push(o);
      else if(/^Arrow_/.test(n)) B.arrow.push(o);
      else if(/^Sun/.test(n)) B.sun=o;
      else if(n===clouds[0].name) B.c[0]=o;
      else if(n===clouds[1].name) B.c[1]=o;
    }
  });
  B.all=[...B.rain,...B.ripple,...B.snow,...B.arrow,B.sun,...B.c].filter(Boolean);
  const cloudMesh=skinned.find(m=>/^cloud/.test(m.name));
  if(cloudMesh){
    const bones=cloudMesh.skeleton.bones;
    darkU.j1.value=bones.indexOf(B.c[0]); darkU.j2.value=bones.indexOf(B.c[1]);
    patchCloudMaterial(cloudMesh.material);
  }
  for(const m of skinned) if(/^mesh_[01]$/.test(m.name)) patchRock(m.material);
  // sharper ground when the camera looks across the land at a low angle
  root.traverse(o=>{ if(o.isMesh&&o.material&&o.material.map){ o.material.map.anisotropy=MAX_ANISO; o.material.map.needsUpdate=true; } });
  root.traverse(o=>{ if(o.isMesh&&/^side_water/.test(o.name)) patchGroundwater(o); });
  // animation: everything except the clouds' scale, which the simulation drives
  const src=gltf.animations.find(a=>a.name==='idle_with_info')||gltf.animations[0];
  const clip=new THREE.AnimationClip('wc',src.duration,src.tracks.filter(tr=>!(/^Cloud/.test(tr.name)&&/\.scale$/.test(tr.name))));
  mixer=new THREE.AnimationMixer(root); mixer.clipAction(clip).play(); mixer.setTime(0.01);
  root.updateMatrixWorld(true);
  // build the ground-height grid and a water mask from the terrain and water surfaces
  G.h=new Float32Array(G.nx*G.nz).fill(-1); G.w=new Uint8Array(G.nx*G.nz);
  const v=new THREE.Vector3(), water=[];
  for(const m of skinned){
    const isW=/^water_body/.test(m.name);
    if(!(/^mesh_0/.test(m.name)||isW)) continue;
    m.skeleton.update();
    const n=m.geometry.attributes.position.count;
    for(let i=0;i<n;i++){ m.getVertexPosition(i,v); v.applyMatrix4(m.matrixWorld);
      const ix=Math.floor((v.x-G.x0)/G.cs), iz=Math.floor((v.z-G.z0)/G.cs);
      if(ix<0||iz<0||ix>=G.nx||iz>=G.nz) continue; const k=iz*G.nx+ix; if(v.y>G.h[k]) G.h[k]=v.y;
      if(isW&&v.y>2.3) water.push(k,v.y); }
  }
  for(let pass=0;pass<6;pass++){ const h=G.h.slice();
    for(let iz=0;iz<G.nz;iz++)for(let ix=0;ix<G.nx;ix++){ const k=iz*G.nx+ix; if(h[k]>=0) continue; let m=-1;
      for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){ const x=ix+dx,z=iz+dz; if(x>=0&&z>=0&&x<G.nx&&z<G.nz) m=Math.max(m,h[z*G.nx+x]); }
      if(m>=0) G.h[k]=m; } }
  for(let k=0;k<G.h.length;k++) if(G.h[k]<0) G.h[k]=2.6;
  for(let i=0;i<water.length;i+=2) if(water[i+1]>=G.h[water[i]]-0.04) G.w[water[i]]=1;
  MOUNT=MOUNT_XZ.map(([x,z])=>[x,groundY(x,z)+0.06,z]);

  resize(); goTo('all',true);
  restart(true);
}

/* The model is either stored in this page (single-file version) or published beside it as glTF JSON.
   Both are turned into a binary .glb in memory and handed to the loader, so no data: URL is ever fetched. */
function failLoad(err){
  console.error(err);
  $('load-msg').innerHTML='The 3D landscape could not load. Reload the page to try again.<br><small style="opacity:.7">'+String(err&&err.message||err).replace(/</g,'&lt;')+'</small>';
}
function b64ToBytes(b64){ const str=atob(b64); const u=new Uint8Array(str.length); for(let i=0;i<str.length;i++) u[i]=str.charCodeAt(i); return u; }
async function getGLB(id,file,progress){
  const inline=document.getElementById(id);
  if(inline){ if(progress){ $('load-msg').textContent='Building the landscape…'; await new Promise(r=>setTimeout(r,30)); } return b64ToBytes(inline.textContent.trim()).buffer; }
  const res=await fetch(file);
  if(!res.ok) throw new Error(file+' returned HTTP '+res.status);
  const expected=/\.glb$/i.test(file)?5309000:7078898; let got=0; const parts=[];
  if(progress&&res.body&&res.body.getReader){
    const rd=res.body.getReader();
    for(;;){ const {done,value}=await rd.read(); if(done) break; parts.push(value); got+=value.length;
      $('load-bar').style.width=Math.min(95,100*got/expected).toFixed(0)+'%'; }
  } else { parts.push(new Uint8Array(await res.arrayBuffer())); got=parts[0].length; }
  let all=parts.length===1?parts[0]:new Uint8Array(got); if(parts.length>1){ let o=0; for(const p of parts){ all.set(p,o); o+=p.length; } }
  if(progress){ $('load-msg').textContent='Building the landscape…'; await new Promise(r=>setTimeout(r,30)); }
  if(/\.glb$/i.test(file)) return all.buffer.byteLength===all.length?all.buffer:all.slice().buffer;   // a plain .glb file is used as it is
  const json=JSON.parse(new TextDecoder().decode(all)); all=null;
  const uri=json.buffers[0].uri; delete json.buffers[0].uri;
  const bin=b64ToBytes(uri.slice(uri.indexOf(',')+1));
  const jb=new TextEncoder().encode(JSON.stringify(json));
  const jpad=(4-jb.length%4)%4, bpad=(4-bin.length%4)%4;
  const total=12+8+jb.length+jpad+8+bin.length+bpad;
  const glb=new ArrayBuffer(total), dv=new DataView(glb), u8=new Uint8Array(glb);
  dv.setUint32(0,0x46546C67,true); dv.setUint32(4,2,true); dv.setUint32(8,total,true);
  dv.setUint32(12,jb.length+jpad,true); dv.setUint32(16,0x4E4F534A,true); u8.set(jb,20); u8.fill(0x20,20+jb.length,20+jb.length+jpad);
  const o=20+jb.length+jpad; dv.setUint32(o,bin.length+bpad,true); dv.setUint32(o+4,0x004E4942,true); u8.set(bin,o+8);
  return glb;
}
function parseGLB(buf){
  return new Promise((ok,bad)=>{
    // Load textures through <img> elements rather than fetch(), which some viewers block for blob: URLs.
    const cib=window.createImageBitmap; try{ window.createImageBitmap=undefined; }catch(e){}
    try{ new GLTFLoader().parse(buf,'',ok,bad); } catch(e){ bad(e); }
    finally{ try{ window.createImageBitmap=cib; }catch(e){} }
  });
}
async function loadModel(){
  const glb=await getGLB('wc-model','models/water-cycle.glb',true);
  $('load-bar').style.width='100%';
  const g=await parseGLB(glb);
  try{ onModel(g); }catch(e){ failLoad(e); return; }
  // the detailed models load next, behind the loading screen, so the scene appears complete
  $('load-msg').textContent='Adding the Sun, clouds, rain, snow and water…';
  const extras=[['wc-sun','models/sun.glb',onSun],['wc-cloud','models/cloud.glb',onCloud],['wc-drop','models/drop.glb',onDrop],['wc-waves','models/waves.glb',onWaves],['wc-snow','models/snow.glb',onSnow],['wc-h2o','models/h2o.glb',onH2O],['wc-lw','models/lw.glb',onLW],['wc-plants','models/plants.glb',onPlants],['wc-maize','models/maize.glb',onMaize],['wc-trees','models/trees.glb',onTrees],['wc-clover','models/clover.glb',onClover]];
  let done=0; $('load-bar').style.width='0%';
  for(const [id,file,fn] of extras){
    try{ fn(await parseGLB(await getGLB(id,file,false))); } catch(e){ console.warn('Could not load '+file,e); }
    $('load-bar').style.width=(100*++done/extras.length).toFixed(0)+'%';
  }
  $('loader').hidden=true;
  PERF.start=performance.now();
}

/* ---------- Detailed models: Sun, clouds, raindrops, sea waves ---------- */
const NEW={sun:null,clouds:null,drop:null,waves:null,river:null,flow:null,snow:null};
const DROPS_MAX=320, SNOW_FLAKE=5;
const CLOUD_THIN=3;
function onSun(g){
  const grp=new THREE.Group(); const sc=g.scene;
  const box=new THREE.Box3().setFromObject(sc), c=box.getCenter(new THREE.Vector3()), r=box.getSize(new THREE.Vector3()).x/2;
  sc.position.sub(c); sc.scale.multiplyScalar(1/r); grp.add(sc);
  sc.traverse(o=>{ if(o.isMesh){ o.material=new THREE.MeshBasicMaterial({map:o.material.map,color:0xffffff}); o.frustumCulled=false; } });
  scene.add(grp); NEW.sun=grp;
}
function onCloud(g){
  const make=()=>{
    const sc=g.scene.clone(true), grp=new THREE.Group(), stacks=[], shade={uCy:{value:0},uHh:{value:1}};
    const box=new THREE.Box3().setFromObject(sc), c=box.getCenter(new THREE.Vector3());
    sc.position.sub(c); grp.add(sc); sc.updateMatrixWorld(true);
    sc.traverse(o=>{ if(!o.isMesh) return;
      const p=o.geometry.attributes.position, a=new THREE.Vector3().fromBufferAttribute(p,0), b=new THREE.Vector3().fromBufferAttribute(p,4);
      const ax=b.sub(a).normalize().transformDirection(o.matrixWorld);
      o.material=new THREE.MeshBasicMaterial({map:o.material.map,color:0xffffff,transparent:true,opacity:0.1,depthWrite:false,side:THREE.DoubleSide});
      // cumulus shading: grey flat base, bright sunlit top
      o.material.onBeforeCompile=sh=>{ sh.uniforms.uCy=shade.uCy; sh.uniforms.uHh=shade.uHh;
        sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying float vWY;').replace('#include <project_vertex>','#include <project_vertex>\nvWY=(modelMatrix*vec4(transformed,1.0)).y;');
        sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uCy,uHh;varying float vWY;')
          .replace('#include <map_fragment>','#include <map_fragment>\nfloat cH=clamp((vWY-uCy)/max(uHh,0.01),-1.0,1.0);diffuseColor.rgb*=mix(vec3(0.60,0.64,0.72),vec3(1.0),smoothstep(-0.75,0.55,cH));'); };
      o.frustumCulled=false; o.renderOrder=2; stacks.push({m:o,ax}); });
    // keep every 3rd slice (light enough for classroom panels); each kept slice is made denser to match
    for(const st of stacks){ const g=st.m.geometry; if(g.userData.thinned) continue; const idx=g.index.array, keep=[];
      for(let q=0;q<idx.length/6;q+=CLOUD_THIN) for(let k=0;k<6;k++) keep.push(idx[q*6+k]);
      g.setIndex(keep); g.userData.thinned=true; }
    scene.add(grp); return {grp,stacks,shade};
  };
  NEW.clouds=[make(),make()];
}
/* Snowfall: 200 photographed snowflakes on a looping fall, placed under the mountain cloud */
/* Snow: the model's photographed snowflakes, falling the way snow falls: slowly (about a sixth of rain's speed),
   drifting and turning, from the cloud base down to the peaks. The flakes follow the simulation's snow particles. */
function onSnow(g){
  let src=null; g.scene.traverse(o=>{ if(o.isSkinnedMesh&&!src) src=o; }); if(!src) return;
  const G0=src.geometry, P=G0.attributes.position, UV=G0.attributes.uv, SI=G0.attributes.skinIndex, idx=G0.index.array;
  // group vertices by flake (one bone per flake), then pick one flake of each of the three photographed shapes
  const byBone=new Map(); for(let i=0;i<P.count;i++){ const b=SI.getX(i); if(!byBone.has(b)) byBone.set(b,[]); byBone.get(b).push(i); }
  const picked={};
  for(const [b,vs] of byBone){ let u=0,v=0; for(const i of vs){ u+=UV.getX(i); v+=UV.getY(i); } u/=vs.length; v/=vs.length;
    const key=(u>0.5?'r':'l')+(v>0.5?'t':'b'); if(!picked[key]) picked[key]=vs; }
  const mat=new THREE.MeshBasicMaterial({map:src.material.map,alphaTest:0.3,side:THREE.DoubleSide,transparent:true});
  mat.color.setRGB(1.75,1.8,1.9);   // photographed flakes are grey-blue; seen falling against the sky, snow looks white
  const meshes=[];
  for(const vs of Object.values(picked)){
    const set=new Map(vs.map((vi,k)=>[vi,k])), pos=[], uv=[], ind=[], c=new THREE.Vector3(), v=new THREE.Vector3();
    for(const vi of vs) c.add(v.fromBufferAttribute(P,vi)); c.divideScalar(vs.length);
    let r=0; for(const vi of vs) r=Math.max(r,v.fromBufferAttribute(P,vi).distanceTo(c));
    for(const vi of vs){ v.fromBufferAttribute(P,vi).sub(c).divideScalar(r||1); pos.push(v.x,v.y,v.z); uv.push(UV.getX(vi),UV.getY(vi)); }
    for(let t=0;t<idx.length;t+=3) if(set.has(idx[t])&&set.has(idx[t+1])&&set.has(idx[t+2])) ind.push(set.get(idx[t]),set.get(idx[t+1]),set.get(idx[t+2]));
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3)); geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2)); geo.setIndex(ind);
    const im=new THREE.InstancedMesh(geo,mat,500); im.count=0; im.frustumCulled=false; scene.add(im); meshes.push(im);
  }
  NEW.snow={meshes,mat};
  SN.sys.pts.visible=false;
}
const _e=new THREE.Euler();
function drawSnowFlakes(){
  const sn=NEW.snow; if(!sn) return;
  const n=sn.meshes.length, cnt=new Array(n).fill(0);
  for(let i=0;i<SN.list.length;i++){ const p=SN.list[i], m=i%n, im=sn.meshes[m];
    if(p.spin===undefined){ p.spin=[(Math.random()-.5)*2.4,(Math.random()-.5)*2.4,Math.random()*6.28]; p.size=0.06+Math.random()*0.05; }
    _e.set(p.age*p.spin[0],p.age*p.spin[1],p.spin[2]); _q.setFromEuler(_e);
    const f=smooth(0,0.4,p.age);   // grow in just below the cloud base
    _p3.set(p.x,p.y,p.z); _s3.setScalar(p.size*f); _m4.compose(_p3,_q,_s3); im.setMatrixAt(cnt[m]++,_m4); }
  sn.meshes.forEach((im,k)=>{ im.count=cnt[k]; im.instanceMatrix.needsUpdate=true; });
}
function onDrop(g){
  let geo=null; g.scene.updateMatrixWorld(true);
  g.scene.traverse(o=>{ if(o.isMesh&&o.name==='Object_8'&&!geo) geo=o.geometry.clone(); });
  if(!geo) g.scene.traverse(o=>{ if(o.isMesh&&!geo) geo=o.geometry.clone(); });
  geo.computeBoundingBox(); const c=geo.boundingBox.getCenter(new THREE.Vector3()), sz=geo.boundingBox.getSize(new THREE.Vector3());
  geo.translate(-c.x,-c.y,-c.z); geo.scale(2/sz.x,2/sz.y,2/sz.z); geo.computeVertexNormals();
  // Falling rain is seen as thin streaks: each drop moves several times its own length while the eye takes it in.
  // So the drop is drawn stretched along its fall, clear in the middle and bright at the rim, like real rain against the sky.
  const mat=new THREE.MeshStandardMaterial({color:0x7d9fc2,roughness:0.15,metalness:0,transparent:true,opacity:0.9,depthWrite:false,emissive:0x34567a,emissiveIntensity:0.4});
  mat.onBeforeCompile=sh=>{ sh.fragmentShader=sh.fragmentShader.replace('#include <normal_fragment_maps>',
    '#include <normal_fragment_maps>\nfloat rim=pow(1.0-abs(normal.z),1.4);diffuseColor.a*=0.45+0.6*rim;diffuseColor.rgb=mix(diffuseColor.rgb,vec3(0.93,0.97,1.0),(1.0-rim)*0.45);'); };
  const im=new THREE.InstancedMesh(geo,mat,DROPS_MAX); im.count=0; im.frustumCulled=false; im.renderOrder=1; scene.add(im); NEW.drop=im;
  rainLines.visible=false;
}
function onWaves(g){
  const grp=new THREE.Group(), sc=g.scene; grp.add(sc);
  sc.updateMatrixWorld(true);
  const box=new THREE.Box3().setFromObject(sc), c=box.getCenter(new THREE.Vector3()), sz=box.getSize(new THREE.Vector3());
  sc.position.sub(c);
  sc.traverse(o=>{ if(o.isMesh){ o.frustumCulled=false; o.renderOrder=1; const m=o.material; m.transparent=true; m.opacity=0.82; m.depthWrite=false; } });
  // the open sea: x −5.05…5.35, z 5.7…10.7, just above the landscape's own water
  grp.userData={w:10.35/sz.x, d:4.95/sz.z, h:1/Math.max(1e-3,sz.y)};
  grp.position.set(0.15,2.6,8.2);
  scene.add(grp);
  const mx=new THREE.AnimationMixer(sc); g.animations.forEach(a=>mx.clipAction(a).play());
  NEW.waves={grp,mx};
  // the same water also flows down the river from the lake to the sea, as a strip that follows the river bed
  let map=null; sc.traverse(o=>{ if(o.isMesh&&o.material.map&&!map) map=o.material.map; });
  if(map) buildRiver(map);
}
/* Flowing water: strips textured with the water model, scrolling downstream.
   'flat' strips lie on the land (river, mountain stream); 'face' strips stand on the cut-away face (groundwater). */
function flowStrip(srcMap,pts,w0,w1,mode,repeatLen,tint){
  const tex=srcMap.clone(); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.needsUpdate=true;
  const curve=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)),false,'centripetal');
  const N=Math.max(24,Math.round(curve.getLength()*10)), pos=[], uv=[], idx=[];
  const ref=mode==='face'?new THREE.Vector3(1,0,0):new THREE.Vector3(0,1,0), side=new THREE.Vector3(); let along=0, prev=null;
  for(let i=0;i<=N;i++){
    const t=i/N, p=curve.getPointAt(t), tg=curve.getTangentAt(t);
    side.crossVectors(tg,ref).normalize(); const w=lerp(w0,w1,t);
    if(prev) along+=p.distanceTo(prev); prev=p.clone();
    pos.push(p.x-side.x*w/2,p.y-side.y*w/2,p.z-side.z*w/2, p.x+side.x*w/2,p.y+side.y*w/2,p.z+side.z*w/2);
    uv.push(0,along/repeatLen, 1,along/repeatLen);
    if(i<N){ const a=i*2; idx.push(a,a+2,a+1, a+1,a+2,a+3); }
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3)); g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  g.setIndex(idx); g.computeVertexNormals();
  const mat=new THREE.MeshStandardMaterial({map:tex,color:tint,roughness:0.25,metalness:0,transparent:true,opacity:0.9,depthWrite:false,
    polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:THREE.DoubleSide,emissive:0x0b3a5c,emissiveIntensity:0.25});
  const bandU={value:0}; mat.userData.band=bandU;
  mat.onBeforeCompile=sh=>{ sh.uniforms.uBand=bandU;
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uBand;')
    .replace('#include <alphamap_fragment>','#include <alphamap_fragment>\n#ifdef USE_MAP\ndiffuseColor.a*=smoothstep(0.0,0.28,vMapUv.x)*smoothstep(1.0,0.72,vMapUv.x);\n'+
      // bright bands carried along with the water, so the direction of flow is easy to see
      'float bnd=pow(0.5+0.5*sin(vMapUv.y*6.2832*1.6),8.0)*uBand;diffuseColor.rgb=mix(diffuseColor.rgb,vec3(0.85,0.97,1.0),bnd);diffuseColor.a=max(diffuseColor.a,bnd*0.9*smoothstep(0.0,0.3,vMapUv.x)*smoothstep(1.0,0.7,vMapUv.x));\n#endif'); };
  const m=new THREE.Mesh(g,mat); m.renderOrder=1; m.frustumCulled=false; scene.add(m);
  return {m,tex,mat};
}
function buildRiver(srcMap){
  const F={};
  F.river=flowStrip(srcMap,RIVER.map(p=>[p[0],p[1]-0.02,p[2]]),0.3,0.75,'flat',1.1,0xcdeeff);
  F.river.mat.userData.band.value=0;   // no bright bands: the ripple texture alone shows the flow
  NEW.flow=F; NEW.river=F.river;
  FL.list.length=0;   // the dots from before the water model arrived are no longer needed
}
function updateFlow(dt,raw){
  const F=NEW.flow; if(!F) return;
  const k=1-Math.exp(-raw*0.6);
  // smoothed amount of water arriving (per second of simulation)
  if(dt>0){ S.flowR=lerp(S.flowR,S.runoffIn/dt,k); S.flowM=lerp(S.flowM,S.mtnIn/dt,k); S.flowG=lerp(S.flowG,S.gwIn/dt,k); }
  S.runoffIn=S.mtnIn=S.gwIn=0;
  const r=clamp(S.flowR/12,0,1), g=clamp(S.flowG/6,0,1);   // rain on the hills also reaches the lake and river
  F.river.tex.offset.y-=dt*(0.2+0.6*r);  F.river.mat.opacity=0.7+0.3*r;
  // groundwater always seeps slowly; recent rain makes it move faster
  GWU.uPh.value+=dt*(0.35+0.8*g); GWU.uAmt.value=0.6+0.4*g;
}
const _ax=new THREE.Vector3(-1,0,0), _q=new THREE.Quaternion(), _m4=new THREE.Matrix4(), _s3=new THREE.Vector3(), _p3=new THREE.Vector3(), _vd=new THREE.Vector3();
function updateNewModels(dt,raw){
  updatePlants(dt);
  const k=clamp((S.T-10)/35,0,1);
  if(NEW.sun){ NEW.sun.position.copy(RAYS.sun); NEW.sun.scale.setScalar(1.1*(0.85+0.25*k)); NEW.sun.rotation.y+=dt*0.08; }
  if(NEW.clouds){
    NEW.clouds.forEach((nc,i)=>{
      const c=clouds[i], f=c.u/c.cap, s=cloudScale(f);
      nc.grp.visible=s>0.02;
      nc.grp.position.set(c.rest.x,A.yc+c.half.y*s,c.rest.z);
      nc.grp.scale.set(c.half.x*2.7*s,c.half.y*2.7*s,c.half.z*2.7*s);
      nc.shade.uCy.value=nc.grp.position.y; nc.shade.uHh.value=c.half.y*s*1.2;
      const dark=i===0?darkU.d1.value:darkU.d2.value;
      _vd.copy(nc.grp.position).sub(camera.position).normalize();
      const fade=clamp(f*4,0,1);
      for(const st of nc.stacks){ const d=Math.abs(_vd.dot(st.ax)), a0=Math.min(0.5,0.17*d*d*fade*(1+0.6*dark));
        st.m.visible=d*d>(PERF.low?0.34:0.1); st.m.material.opacity=1-Math.pow(1-a0,CLOUD_THIN);
        st.m.material.color.setRGB(lerp(1,0.46,dark),lerp(1,0.49,dark),lerp(1,0.56,dark)); }
    });
  }
  if(NEW.drop){
    const lim=PERF.low?160:DROPS_MAX, im=NEW.drop, L=R.list, step=Math.max(1,Math.ceil(L.length/lim)); let n=0;
    _q.setFromAxisAngle(_ax,Math.atan2(0.12*S.wind,7));   // leans with the wind
    for(let i=0;i<L.length&&n<lim;i+=step){ const p=L[i], v=p.sz||(p.sz=0.75+Math.random()*0.5);
      _p3.set(p.x,p.y+0.2,p.z); _s3.set(0.03*v,0.24*v,0.03*v); _m4.compose(_p3,_q,_s3); im.setMatrixAt(n++,_m4); }
    im.count=n; im.instanceMatrix.needsUpdate=true;
  }
  updateFlow(dt,raw);
  drawSnowFlakes();
  if(NEW.waves){
    const w=NEW.waves, u=w.grp.userData;
    w.grp.scale.set(u.w,u.h*(0.04+0.025*S.wind),u.d);
    w.mx.timeScale=0.45+0.09*S.wind; w.mx.update(dt);
  }
}

const _w=new THREE.Vector3();
function setWorldY(bone,fn){
  bone.getWorldPosition(_w); _w.y=fn(_w.y);
  bone.position.copy(bone.parent.worldToLocal(_w));
}
function poseModel(dt){
  if(!mixer) return;
  // The mixer only writes values that changed, so put back its last pose before updating,
  // otherwise the scaling and offsets below would pile up frame after frame.
  for(const b of B.all){ const u=b.userData; if(u.bp){ b.position.copy(u.bp); b.scale.copy(u.bs); } }
  mixer.update(dt);
  for(const b of B.all){ const u=b.userData; (u.bp||(u.bp=new THREE.Vector3())).copy(b.position); (u.bs||(u.bs=new THREE.Vector3())).copy(b.scale); }
  root.updateMatrixWorld(true);
  const tgt={rain:clouds[0].raining?1:0, snow:(clouds[1].raining&&A.snowPeak)?1:0, arrows:S.arrows?1:0};
  for(const k in vis) vis[k]=lerp(vis[k],tgt[k],1-Math.exp(-4*Math.max(dt,0.016)));
  // clouds: flat base on the condensation level, size from water content
  for(let i=0;i<2;i++){
    const b=B.c[i]; if(!b) continue; const c=clouds[i], s=cloudScale(c.u/c.cap);
    const want=A.yc+c.half.y*s;
    setWorldY(b,y=>y+(want-c.rest.y));
    b.scale.setScalar(NEW.clouds?1e-4:s);
  }
  // falling drops stretch to start at the new cloud base
  const g1=3.3, g2=5.0;
  for(const b of B.rain){ setWorldY(b,y=>g1+(y-g1)*(A.yc-g1)/(Y_BASE-g1)); b.scale.multiplyScalar(NEW.drop?1e-4:Math.max(1e-4,vis.rain)); }
  for(const b of B.ripple) b.scale.multiplyScalar(Math.max(1e-4,vis.rain));
  for(const b of B.snow){ setWorldY(b,y=>g2+(y-g2)*(A.yc-g2)/(9.2-g2)); b.scale.multiplyScalar(NEW.snow?1e-4:Math.max(1e-4,vis.snow)); }
  for(const b of B.arrow) b.scale.multiplyScalar(Math.max(1e-4,vis.arrows));
  if(B.sun) B.sun.scale.multiplyScalar(NEW.sun?1e-4:0.85+0.25*clamp((S.T-10)/35,0,1));
  darkU.d1.value=smooth(0.4,1.0,clouds[0].u/clouds[0].cap)*0.9;
  darkU.d2.value=smooth(0.4,1.0,clouds[1].u/clouds[1].cap)*0.9;
}

/* ---------- Main step ---------- */
let spawnAcc=0, transAcc=0;
function simStep(dt){
  const ei=evapIndex();
  spawnAcc+=BASE_RATE*ei*dt; while(spawnAcc>=1){ spawnAcc-=1; spawnVapour(); }
  transAcc+=TRANS_RATE*ei*dt; while(transAcc>=1){ transAcc-=1; spawnTranspiration(); }
  stepVapour(dt); stepClouds(dt); stepPrecip(dt);
}
function restart(preroll){
  S.events.length=0; S.lastCross=null; S.gwAcc=0;
  V.list.length=0; R.list.length=0; SN.list.length=0; SP.list.length=0; FL.list.length=0;
  S.E=0; S.P=0; spawnAcc=0; transAcc=0;
  clouds[0].u=0; clouds[1].u=0; clouds[0].raining=clouds[1].raining=false;
  if(preroll){ clouds[0].u=0.55*clouds[0].cap; clouds[1].u=0.5*clouds[1].cap; for(let i=0;i<360;i++) simStep(1/30); S.events.length=0; }
  for(const k in S.flowEv) S.flowEv[k]=0;
}

function readouts(){
  const f=v=>(v>=0?'':'−')+Math.abs(v).toFixed(1)+' °C';
  $('r-td').textContent=f(A.Td);
  $('r-lcl').textContent=A.lcl<1?Math.round(A.lcl*1000/10)*10+' '+t('m'):A.lcl.toFixed(2)+' '+t('km');
  $('r-tc').textContent=f(A.tc);
  drawThermo();
  $('r-type1').textContent=t(clouds[0].raining?'raining':'dry_rain');
  $('r-type2').textContent=t(clouds[1].raining?(A.snowPeak?'snowing':'raining'):(A.snowPeak?'dry_snow':'dry_rain'));
  $('b-e').textContent=Math.round(S.E); $('b-v').textContent=V.list.length;
  $('b-c').textContent=Math.round(clouds[0].u+clouds[1].u); $('b-p').textContent=Math.round(S.P);
  const ev=S.evapRate, cd=S.condRate, pr=S.precRate;
  $('m-evap').style.width=clamp(ev/80*100,0,100)+'%'; $('s-evap').textContent=ev.toFixed(0)+' '+t('per_s');
  $('m-cond').style.width=clamp(cd/60*100,0,100)+'%'; $('s-cond').textContent=cd<0.5?t('wait_vap'):cd.toFixed(0)+' '+t('per_s');
  $('m-prec').style.width=clamp(pr/80*100,0,100)+'%';
  const snowing=clouds[1].raining&&A.snowPeak;
  $('s-prec').textContent=pr<0.5?t('filling'):t(snowing&&!clouds[0].raining?'snow':snowing?'rain_snow':'rain')+' '+pr.toFixed(0)+'/s';
  $('chip-evap').classList.toggle('live',ev>0.5); $('chip-cond').classList.toggle('live',cd>0.5); $('chip-prec').classList.toggle('live',pr>0.5);
  const storm=Math.max(clouds[0].raining?darkU.d1.value:0,clouds[1].raining?darkU.d2.value:0);
  $('storm').style.opacity=(0.22*storm).toFixed(3);
  sunLight.intensity=(1.4+1.5*clamp((S.T-10)/35,0,1))*(1-0.3*storm);
}

let last=performance.now(), rdT=0;
/* Automatic quality: if the device draws fewer than ~28 frames a second, first render at standard resolution,
   then draw lighter clouds and fewer raindrops. Checked twice, a few seconds apart, after loading. */
const PERF={start:0,frames:0,ms:0,stage:0,low:false};
function checkPerf(now,elapsed){
  if(!PERF.start||PERF.stage>=2||now-PERF.start<1500) return;
  PERF.frames++; PERF.ms+=elapsed;
  if(PERF.ms<3000) return;
  const fps=1000*PERF.frames/PERF.ms; PERF.frames=0; PERF.ms=0;
  if(fps>=28){ PERF.stage=2; return; }
  if(PERF.stage===0&&renderer.getPixelRatio()>1){ renderer.setPixelRatio(1); resize(); PERF.stage=1; return; }
  PERF.low=true; PERF.stage=2;
}
function frame(now){
  const elapsed=now-last, raw=Math.min(0.05,elapsed/1000); last=now; checkPerf(now,elapsed);
  const dt=S.paused?0:raw*S.speed;
  if(root){
    A=atmos();
    if(dt>0){
      S._cond=0; S._prec=0; const ev0=S.E;
      // sub-step at high speed for stable particles
      const n=Math.ceil(dt/0.034); for(let i=0;i<n;i++) simStep(dt/n);
      const k=1-Math.exp(-2*raw);
      S.evapRate=lerp(S.evapRate,(S.E-ev0)/raw,k); S.condRate=lerp(S.condRate,S._cond/raw,k); S.precRate=lerp(S.precRate,S._prec/raw,k);
    }
    poseModel(dt); updateRays(dt,raw); updateNewModels(dt,raw);
    levelGroup.position.y=A.yc;
    drawVapour(); drawPrecip();
    rdT+=raw; if(rdT>0.2){ rdT=0; readouts(); if(teach>=0) $('t-hint').textContent=TEACH[teach].hint(); }
  }
  if(camTween){
    camTween.s=Math.min(1,camTween.s+raw/1.3); const e=ease(camTween.s);
    camera.position.lerpVectors(camTween.p0,camTween.p1,e); controls.target.lerpVectors(camTween.t0,camTween.t1,e);
    if(camTween.s>=1) camTween=null;
  }
  controls.update();
  renderer.render(scene,camera);
  drawLabels(); updateCallouts(raw); drawMag(raw);
  requestAnimationFrame(frame);
}
controls.addEventListener('start',()=>{camTween=null;});

/* ---------- In-scene teaching tags ---------- */
const CO=[], cdn={evap:3,cond:0,gap:0,trans:9,run:0,infil:5,gw:0,snow:0,rays:6}, COQ=[];
let evapTagSalt=false;
const _pv=new THREE.Vector3();
function placeEl(el,pos){
  _pv.copy(pos).project(camera);
  if(_pv.z>1||Math.abs(_pv.x)>1.1||Math.abs(_pv.y)>1.1){ el.style.visibility='hidden'; return; }
  el.style.visibility='';
  const W=stage.clientWidth, hw=(el.offsetWidth||160)/2+6;
  const x=clamp((_pv.x*0.5+0.5)*W,hw,Math.max(hw,W-hw));
  el.style.transform=`translate(${x}px,${(-_pv.y*0.5+0.5)*stage.clientHeight}px) translate(-50%,calc(-100% - 8px))`;
}
function callout(key,k,pos,dur=4.5){ if(S.labels&&COQ.length<4) COQ.push([key,k,pos,dur]); }
function showCallout(key,k,pos,dur){
  while(CO.length>=(narrow()?2:3)){ CO.shift().el.remove(); }
  const el=document.createElement('div'); el.className='callout k-'+k; el.textContent=t(key); $('labels').appendChild(el);
  const o={el,pos:new THREE.Vector3(...pos),t:dur}; CO.push(o); placeEl(el,o.pos);
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('on')));
}
function clearCallouts(){ COQ.length=0; while(CO.length) CO.pop().el.remove(); }
function updateCallouts(raw){
  if(!S.paused&&root){
    for(const k of ['evap','cond','trans','run','infil','gw','snow','rays']) cdn[k]-=raw;
    if(cdn.evap<=0&&S.evapRate>2){
      const pos=[lerp(-2.5,3.5,Math.random()),3.1,lerp(6.8,9.2,Math.random())];
      callout(evapTagSalt?'co_salt':'co_evap','evap',pos,evapTagSalt?5.5:4.5); evapTagSalt=!evapTagSalt; cdn.evap=11; }
    if(cdn.rays<=0&&RAYS.on){ const r=RAYS.beams[0]; callout('co_rays','evap',[lerp(RAYS.sun.x,r.to.x,0.55),lerp(RAYS.sun.y,r.to.y,0.55),lerp(RAYS.sun.z,r.to.z,0.55)],4.5); cdn.rays=29; }
    if(cdn.trans<=0&&lastTrans&&S.evapRate>2){ callout('co_trans','evap',lastTrans,5); cdn.trans=19; }
    if(cdn.cond<=0&&S.lastCross){ callout('co_dew','cond',S.lastCross); cdn.cond=13; }
    while(S.events.length){ const i=S.events.shift(), c=clouds[i], snow=i===1&&A.snowPeak;
      callout(snow?'co_snow':'co_rain','prec',[c.rest.x,A.yc-1.3,c.rest.z+(i===0?0.8:-0.4)],5); }
    const fe=S.flowEv;
    if(fe.runoff>0&&cdn.run<=0){ callout('co_runoff','flow',[-1.75,2.95,2.4],5); cdn.run=17; }
    if(fe.infil>0&&cdn.infil<=0){ callout('co_infil','flow',[GX,3.05,0.5],5); cdn.infil=17; }
    if(fe.gw>0&&cdn.gw<=0&&(NEW.flow||FL.list.some(f=>f.type==='gw'&&f.d>2))){ callout('co_gw','flow',[GX,1.55,3.6],5); cdn.gw=21; }
    if(fe.snow>0&&cdn.snow<=0){ callout('co_store','prec',[-1.2,6.2,-7.8],5); cdn.snow=23; }
    fe.runoff=fe.infil=fe.gw=fe.snow=0;
  }
  S.lastCross=null;
  cdn.gap-=raw; if(cdn.gap<=0&&COQ.length){ showCallout(...COQ.shift()); cdn.gap=1.4; }
  for(let i=CO.length-1;i>=0;i--){ const o=CO[i]; if(!S.paused) o.t-=raw;
    if(o.t<0.5) o.el.classList.remove('on');
    if(o.t<0){ o.el.remove(); CO.splice(i,1); continue; }
    placeEl(o.el,o.pos); }
}

/* ---------- Thermometer: surrounding air temperature with height ---------- */
const TH_MAX=6;
const TH={bar:$('th-bar'),box:$('th-ticks'),ticks:[]};
for(let i=0;i<4;i++){ const e=document.createElement('div'); e.className='th-tick'; TH.box.appendChild(e); TH.ticks.push(e); }
function tColor(tc){
  const w=[242,246,248], hot=[226,120,48], cold=[70,126,206];
  const [a,k]=tc>=0?[hot,clamp(tc/35,0,1)]:[cold,clamp(-tc/15,0,1)];
  return `rgb(${w.map((v,i)=>Math.round(lerp(v,a[i],k))).join(',')})`;
}
function drawThermo(){
  const H=TH.bar.clientHeight||200, fmt=v=>(v<0?'−':'')+Math.abs(v).toFixed(1)+' °C';
  const st=[]; for(let k=0;k<=TH_MAX;k++) st.push(`${tColor(S.T-6.5*k)} ${(k/TH_MAX*100).toFixed(1)}%`);
  TH.bar.style.background=`linear-gradient(to top,${st.join(',')})`;
  const h0=S.T/6.5;
  const items=[
    {h:0,html:`<b>${fmt(S.T)}</b> <span>${t('th_ground')}</span>`,k:''},
    {h:A.lcl,html:`<b>${A.lcl.toFixed(1)} ${t('km')}</b> <span>${t('th_base')}</span>`,k:'k-cond'},
    {h:h0,html:`<b>0 °C</b> <span>${h0.toFixed(1)} ${t('km')}</span>`,k:'k-prec'},
    {h:5,html:`<b>${fmt(A.pk)}</b> <span>${t('th_peak')}</span>`,k:''}
  ].map((d,i)=>({...d,i})).sort((a,b)=>a.h-b.h);
  let prev=-99;
  for(const d of items){
    const el=TH.ticks[d.i];
    if(d.h>TH_MAX){ el.hidden=true; continue; }
    el.hidden=false; let y=d.h/TH_MAX*H; y=Math.max(y,prev+15); prev=y;
    el.style.bottom=y+'px'; el.className='th-tick '+d.k; if(el._h!==d.html){ el.innerHTML=d.html; el._h=d.html; }
  }
}

/* ---------- Teach mode: one step at a time ---------- */
const TEACH=[
  {p:'evap',name:'evap',gate:1,
   hint:()=>V.list.filter(q=>q.ph===1&&q.y>=A.yc-q.hold-0.02).length>40?TEACH_T[lang][0].hint:''},
  {p:'cond',name:'cond',gate:2,hint:()=>clouds[0].u>=clouds[0].cap?TEACH_T[lang][1].hint:''},
  {p:'prec',name:'prec',gate:3,hint:()=>TEACH_T[lang][2].hint}
];
let teach=-1;
function setPaused(v){ const b=$('btn-play'); if(!b) return; S.paused=v; b.innerHTML=v?ICON_PLAY:ICON_PAUSE; b.setAttribute('aria-label',t(v?'play':'pause')); b.title=t(v?'play':'pause')+' (or tap the sky)'; }
let toastT=0;
function toast(icon,text){ const el=$('toast'); el.innerHTML=icon+'<span>'+text+'</span>'; el.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('on'),900); }
function renderTeach(){
  if(teach<0) return; const st=TEACH[teach];
  const el=$('teach'); el.className='ov panel k-'+st.p;
  $('t-step').textContent=t('step_of',{n:teach+1}); $('t-name').textContent=t(st.name); $('t-cap').textContent=TEACH_T[lang][teach].cap;
  $('t-hint').textContent=st.hint(); $('t-next').textContent=t(teach===TEACH.length-1?'finish':'next');
}
function teachGo(i){
  if(i>=TEACH.length){ exitTeach(); return; }
  closeMag();
  teach=i; const st=TEACH[i]; S.gate=st.gate;
  if(i===0){ restart(false); clearCallouts(); cdn.evap=1.5; setPaused(false); }
  if(i===1){ const c=clouds[0]; callout('co_tap','cond',[c.rest.x,A.yc+2.2,c.rest.z],5); }
  if(i===2){ clouds.forEach((c,k)=>{ if(!c.raining&&c.u>0.3*c.cap){ c.raining=true; S.events.push(k); } }); }
  $('teach').hidden=false; renderTeach();
  $('btn-teach').setAttribute('aria-pressed','true');
  S.focus=st.p; showInfo(st.p); goTo(st.p);
}
function exitTeach(){
  teach=-1; S.gate=3; $('teach').hidden=true; $('btn-teach').setAttribute('aria-pressed','false');
  S.focus='all'; showInfo('all'); goTo('all');
}

/* ---------- Plants, placed by vegetation zone ----------
   The landscape's own photo texture decides where plants grow: green ground gets plants, while sand, bare rock,
   snow and water stay bare. Maize fields and meadows cover the plains, reeds and ferns line the lake and river,
   and pines climb the lower slopes, thinning and shrinking towards the tree line. Everything sways with the wind slider. */
const MAX_ANISO=renderer?Math.min(8,renderer.capabilities.getMaxAnisotropy()):1;
const VEG={u:{uTime:{value:0},uWind:{value:4}},sp:{},ims:[],map:null,built:false};
function bakeParts(g){ g.scene.updateMatrixWorld(true); const out=[];
  g.scene.traverse(o=>{ if(!o.isMesh) return; let p=o, grp=''; while(p){ if(/^(Bark|Grass)/.test(p.name)){ grp=p.name; } p=p.parent; }
    out.push({name:o.name,grp,geo:floatGeom(o.geometry,o.matrixWorld),mat:o.material}); }); return out; }
// a model laid out as a row of plants → one variant per plant (cut where the row has a gap); stems and leaves of a plant stay together
function splitRow(parts,gapFrac){
  // the row may run sideways or front-to-back: cut along whichever way it is longer
  const bb=new THREE.Box3(); for(const p of parts){ p.geo.computeBoundingBox(); bb.union(p.geo.boundingBox); }
  const sz=bb.getSize(new THREE.Vector3()), along=sz.z>sz.x?'getZ':'getX';
  const items=[]; let mn=1e9,mx=-1e9;
  parts.forEach((p,pi)=>{ const pos=p.geo.attributes.position, idx=p.geo.index, nT=idx.count/3;
    for(let t=0;t<nT;t++){ let x=0; for(let k=0;k<3;k++) x+=pos[along](idx.getX(t*3+k)); x/=3; items.push([x,pi,t]); mn=Math.min(mn,x); mx=Math.max(mx,x); } });
  items.sort((a,b)=>a[0]-b[0]);
  const gap=(mx-mn)*gapFrac, groups=[[]];
  for(let i=0;i<items.length;i++){ if(i>0&&items[i][0]-items[i-1][0]>gap) groups.push([]); groups[groups.length-1].push(items[i]); }
  return groups.filter(g=>g.length>=4).map(g=>normVariant(parts.map((p,pi)=>sub(p,g.filter(it=>it[1]===pi).map(it=>it[2]))).filter(Boolean)));
}
function sub(p,tris){ if(!tris.length) return null;
  const src=p.geo, idx=src.index, map=new Map(), ind=[];
  for(const t of tris) for(let k=0;k<3;k++){ const i=idx.getX(t*3+k); if(!map.has(i)) map.set(i,map.size); ind.push(map.get(i)); }
  const g=new THREE.BufferGeometry(), ids=[...map.keys()];
  for(const [k,a] of Object.entries(src.attributes)){ const n=a.itemSize, f=new Float32Array(ids.length*n); ids.forEach((i,j)=>{ for(let c=0;c<n;c++) f[j*n+c]=acomp(a,i,c); }); g.setAttribute(k,new THREE.BufferAttribute(f,n)); }
  g.setIndex(ind); return {geo:g,mat:p.mat};
}
// base centre at the origin, largest size = 1, so a plant's size is set by one number when it is planted
function normVariant(parts){
  const b=new THREE.Box3(); for(const p of parts){ p.geo.computeBoundingBox(); b.union(p.geo.boundingBox); }
  const s=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3()), k=1/Math.max(s.x,s.y,s.z);
  for(const p of parts){ p.geo.translate(-c.x,-b.min.y,-c.z); p.geo.scale(k,k,k); p.geo.computeBoundingSphere(); }
  return {parts,h:s.y*k};
}
function vegMat(m,stiff,tint){
  const mm=m.clone(); if(tint) mm.color.multiplyScalar(tint);
  if(mm.map){ mm.map.anisotropy=MAX_ANISO; mm.map.needsUpdate=true; }   // stays sharp when seen at a low angle mm.side=THREE.DoubleSide; mm.metalness=0; mm.roughness=0.92; mm.envMapIntensity=0.6;
  // thin needles and grass blades: a low cut-off plus alpha-to-coverage, so foliage does not vanish when its texture is seen small and far away
  if(m.alphaTest>0||m.transparent){ mm.transparent=false; mm.alphaTest=0.12; mm.alphaToCoverage=true; mm.depthWrite=true; }
  // leaves let light through: a little of their own colour glows on the shaded side, so foliage never turns black
  if(mm.map){ mm.emissive=new THREE.Color(0xffffff); mm.emissiveMap=mm.map; mm.emissiveIntensity=0.28; }
  mm.onBeforeCompile=sh=>{
    sh.uniforms.uTime=VEG.u.uTime; sh.uniforms.uWind=VEG.u.uWind;
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uTime,uWind;')
      .replace('#include <project_vertex>',`
        vec4 wp=vec4(transformed,1.0); vec2 ph=vec2(0.0); float isz=1.0;
        #ifdef USE_INSTANCING
          wp=instanceMatrix*wp; ph=instanceMatrix[3].xz; isz=length(instanceMatrix[1].xyz);
        #endif
        // the wind blows inland (towards the mountains); tips bend most, the base stays put, and gusts travel across the land
        float hgt=clamp(transformed.y,0.0,1.0);
        float gust=0.65+0.35*sin(uTime*(1.2+0.1*uWind)-ph.y*1.6+ph.x*0.7)+0.15*sin(uTime*3.1+ph.x*7.3+ph.y*5.1);
        float bend=(0.01+0.011*uWind)*${stiff.toFixed(3)}*hgt*hgt*gust*isz;
        wp.z-=bend; wp.x+=bend*0.3*sin(uTime*1.7+ph.y*3.0); wp.y-=bend*bend*0.5/max(isz,1e-3);
        vec4 mvPosition=modelViewMatrix*wp; gl_Position=projectionMatrix*mvPosition;`);
  };
  mm.customProgramCacheKey=()=>'veg'+stiff+(mm.alphaTest>0?'a':'o');
  return mm;
}
function onPlants(g){   // from the plant set: ferns and white wildflowers
  const parts=bakeParts(g), by=n=>parts.filter(p=>p.name===n);
  const row=(names,gap)=>splitRow(names.flatMap(by),gap);
  VEG.sp.fern={v:row(['Object_7'],0.04),stiff:0.6};
  VEG.sp.daisy={v:row(['Object_9'],0.035),stiff:1};
  plantAll();
}
function onTrees(g){   // broadleaf trees with full crowns (a round-crowned and a slender form) and chunky grass tufts
  const parts=bakeParts(g), grp=n=>parts.filter(p=>p.grp===n).map(p=>({geo:p.geo,mat:p.mat}));
  VEG.sp.tree={v:['Bark001_2669','Bark_2671'].map(n=>normVariant(grp(n))).filter(v=>v.parts.length),stiff:0.3,tintAll:1.1};
  VEG.sp.tuft={v:['Grass_B_Low_Dense_2','Grass_B_Low_Dense024_3','Grass_B_Low_Small_1','Grass_B_Low_Small092_4'].map(n=>normVariant(grp(n))).filter(v=>v.parts.length),stiff:1};
  plantAll();
}
function onClover(g){   // clover patches: soft, round-leaved ground cover
  // the patches are dense, so only the lighter ones are planted (under 9,000 triangles each)
  const parts=bakeParts(g), v=parts.flatMap(p=>splitRow([p],0.006)).filter(v=>v.parts.reduce((a,q)=>a+q.geo.index.count/3,0)<9000);
  VEG.sp.clover={v,stiff:0.2,tintAll:1.1};
  plantAll();
}
function onMaize(g){ const parts=bakeParts(g); VEG.sp.maize={v:[normVariant(parts.map(p=>({geo:p.geo,mat:p.mat})))],stiff:0.7,tintAll:1.45}; plantAll(); }   // the leaf photo is dark; maize in sun reads lighter

/* the vegetation map: terrain height, slope and photo colour on a fine grid (0.05 units) */
function buildVegMap(){
  let m=null; root.traverse(o=>{ if(o.isMesh&&/^mesh_0$/.test(o.name)) m=o; });
  if(!m||!m.material.map||!m.material.map.image) return null;
  const pa=m.geometry.attributes.position, ua=m.geometry.attributes.uv, ia=m.geometry.index, n=pa.count, P=new Float32Array(n*3), v=new THREE.Vector3();
  if(m.skeleton) m.skeleton.update();
  for(let i=0;i<n;i++){ m.getVertexPosition(i,v); v.applyMatrix4(m.matrixWorld); P[i*3]=v.x; P[i*3+1]=v.y; P[i*3+2]=v.z; }
  const cs=0.05, x0=G.x0, z0=G.z0, nx=Math.ceil(G.nx*G.cs/cs), nz=Math.ceil(G.nz*G.cs/cs), N=nx*nz;
  const H=new Float32Array(N).fill(-1e9), U=new Float32Array(N), W=new Float32Array(N), NY=new Float32Array(N);
  const nT=ia?ia.count/3:n/3, id=k=>ia?ia.getX(k):k;
  for(let t=0;t<nT;t++){
    const a=id(t*3),b=id(t*3+1),c=id(t*3+2);
    const ax=P[a*3],ay=P[a*3+1],az=P[a*3+2], bx=P[b*3],by=P[b*3+1],bz=P[b*3+2], cx=P[c*3],cy=P[c*3+1],cz=P[c*3+2];
    const e1x=bx-ax,e1y=by-ay,e1z=bz-az, e2x=cx-ax,e2y=cy-ay,e2z=cz-az;
    const nX=e1y*e2z-e1z*e2y, nY=e1z*e2x-e1x*e2z, nZ=e1x*e2y-e1y*e2x, nl=Math.hypot(nX,nY,nZ)||1, ny=Math.abs(nY)/nl;
    if(ny<0.3) continue;                                  // cliffs and the cut-away sides
    const det=e1x*e2z-e2x*e1z; if(Math.abs(det)<1e-12) continue;
    const i0=Math.max(0,Math.floor((Math.min(ax,bx,cx)-x0)/cs)), i1=Math.min(nx-1,Math.floor((Math.max(ax,bx,cx)-x0)/cs));
    const j0=Math.max(0,Math.floor((Math.min(az,bz,cz)-z0)/cs)), j1=Math.min(nz-1,Math.floor((Math.max(az,bz,cz)-z0)/cs));
    for(let j=j0;j<=j1;j++) for(let i=i0;i<=i1;i++){
      const px=x0+(i+0.5)*cs-ax, pz=z0+(j+0.5)*cs-az, s=(px*e2z-e2x*pz)/det, r=(e1x*pz-px*e1z)/det;
      if(s<-1e-4||r<-1e-4||s+r>1+1e-4) continue;
      const y=ay+s*e1y+r*e2y, k=j*nx+i; if(y<=H[k]) continue;
      H[k]=y; NY[k]=ny; U[k]=ua.getX(a)+s*(ua.getX(b)-ua.getX(a))+r*(ua.getX(c)-ua.getX(a)); W[k]=ua.getY(a)+s*(ua.getY(b)-ua.getY(a))+r*(ua.getY(c)-ua.getY(a));
    }
  }
  const TS=512, cv=document.createElement('canvas'); cv.width=cv.height=TS; const cx2=cv.getContext('2d',{willReadFrequently:true});
  cx2.drawImage(m.material.map.image,0,0,TS,TS); const px=cx2.getImageData(0,0,TS,TS).data;
  const C=new Uint8Array(N*3), WET=new Uint8Array(N);
  for(let k=0;k<N;k++){ if(H[k]<-1e8) continue;
    const u=((U[k]%1)+1)%1, w=((W[k]%1)+1)%1, q=(Math.min(TS-1,Math.floor(w*TS))*TS+Math.min(TS-1,Math.floor(u*TS)))*4;
    C[k*3]=px[q]; C[k*3+1]=px[q+1]; C[k*3+2]=px[q+2];
    const x=x0+((k%nx)+0.5)*cs, z=z0+(Math.floor(k/nx)+0.5)*cs;
    if(isWater(x,z)||(px[q+2]>px[q+1]+6&&px[q+2]>px[q]+20)) WET[k]=1; }
  // distance to open water (lake, river, sea) by a breadth-first sweep, in grid cells
  const D=new Uint16Array(N).fill(65535), Q=new Int32Array(N); let qh=0,qt=0;
  for(let k=0;k<N;k++) if(WET[k]){ D[k]=0; Q[qt++]=k; }
  while(qh<qt){ const k=Q[qh++], i=k%nx, j=(k/nx)|0, d=D[k]+1;
    if(i>0&&D[k-1]>d){D[k-1]=d;Q[qt++]=k-1;} if(i<nx-1&&D[k+1]>d){D[k+1]=d;Q[qt++]=k+1;}
    if(j>0&&D[k-nx]>d){D[k-nx]=d;Q[qt++]=k-nx;} if(j<nz-1&&D[k+nx]>d){D[k+nx]=d;Q[qt++]=k+nx;} }
  return {cs,x0,z0,nx,nz,H,NY,C,WET,D};
}
function vegAt(x,z){
  const M=VEG.map, i=Math.floor((x-M.x0)/M.cs), j=Math.floor((z-M.z0)/M.cs);
  if(i<0||j<0||i>=M.nx||j>=M.nz) return null; const k=j*M.nx+i; if(M.H[k]<-1e8) return null;
  const r=M.C[k*3],g=M.C[k*3+1],b=M.C[k*3+2], L=(r+g+b)/3, mxc=Math.max(r,g,b), sat=mxc?(mxc-Math.min(r,g,b))/mxc:0;
  return {y:M.H[k],ny:M.NY[k],r,g,b,L,sat,wet:M.WET[k]===1,dw:M.D[k]*M.cs,
    green:(g-Math.max(r*0.92,b))/255,            // > 0 where the photo shows vegetation
    bare:L>165&&sat<0.22||L<38||r>g*1.18};      // snow, bare rock, deep shadow or sand/soil
}
// smooth value noise, for patches and clearings
function vnoise(x,z){ const h=(a,b)=>{ const s=Math.sin(a*127.1+b*311.7)*43758.5453; return s-Math.floor(s); };
  const i=Math.floor(x),j=Math.floor(z),fx=x-i,fz=z-j,ux=fx*fx*(3-2*fx),uz=fz*fz*(3-2*fz);
  return lerp(lerp(h(i,j),h(i+1,j),ux),lerp(h(i,j+1),h(i+1,j+1),ux),uz); }

function plantAll(){
  if(VEG.built||!root||!VEG.sp.tree||!VEG.sp.maize||!VEG.sp.fern||!VEG.sp.clover) return;
  VEG.map=buildVegMap(); if(!VEG.map) return; VEG.built=true;
  let seed=20261106; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
  const X0=-5.6, X1=5.95, Z0=-10.9, Z1=6.0;            // the land, inside the cut-away edges
  const taken=new Map(), cellK=(x,z)=>Math.floor(x/0.1)+'_'+Math.floor(z/0.1);
  const free=(x,z,r)=>{ for(let dx=-1;dx<=1;dx++) for(let dz=-1;dz<=1;dz++){ const L=taken.get((Math.floor(x/0.1)+dx)+'_'+(Math.floor(z/0.1)+dz)); if(L) for(const q of L) if(Math.hypot(q[0]-x,q[1]-z)<Math.max(r,q[2])) return false; } return true; };
  const take=(x,z,r)=>{ const k=cellK(x,z); (taken.get(k)||taken.set(k,[]).get(k)).push([x,z,r]); };
  const out={};                                            // species → list of [variant, x, y, z, size, yaw, tilt x, tilt z, shade]
  const put=(sp,vi,x,y,z,size,tilt,c)=>{ const sh=0.86+rnd()*0.24; (out[sp]||(out[sp]=[])).push([vi,x,y,z,size,rnd()*6.283,tilt?(rnd()-0.5)*0.12:0,tilt?(rnd()-0.5)*0.12:0,sh,c||null]); };
  const scatter=(n,tries,fn)=>{ let k=0; for(let t=0;t<tries&&k<n;t++){ const x=lerp(X0,X1,rnd()), z=lerp(Z0,Z1,rnd()), s=vegAt(x,z); if(s&&fn(x,z,s)) k++; } return k; };

  // 1. maize fields: flat green farmland on the plains, planted in rows, away from the water's edge
  const fields=[]; for(let t=0;t<4000&&fields.length<3;t++){
    const x=lerp(-4.2,4.6,rnd()), z=lerp(-3.6,3.2,rnd()), s=vegAt(x,z);
    if(!s||s.ny<0.97||s.y<2.7||s.y>3.4||s.dw<0.45||s.bare||s.green<0.0) continue;
    if(fields.some(f=>Math.hypot(f[0]-x,f[1]-z)<2.2)) continue;
    let ok=true; for(const [dx,dz] of [[0.4,0.3],[-0.4,0.3],[0.4,-0.3],[-0.4,-0.3]]){ const q=vegAt(x+dx,z+dz); if(!q||q.ny<0.95||q.dw<0.3||Math.abs(q.y-s.y)>0.12) { ok=false; break; } }
    if(ok) fields.push([x,z,rnd()*Math.PI]); }
  for(const [fx,fz,fa] of fields){ const ca=Math.cos(fa), sa=Math.sin(fa), Wd=lerp(0.75,1.0,rnd()), Dp=lerp(0.5,0.65,rnd());
    for(let u=-Wd/2;u<=Wd/2;u+=0.09) for(let w=-Dp/2;w<=Dp/2;w+=0.075){
      const x=fx+u*ca-w*sa+(rnd()-0.5)*0.012, z=fz+u*sa+w*ca+(rnd()-0.5)*0.012, s=vegAt(x,z);
      if(!s||s.dw<0.2||s.ny<0.9||rnd()<0.06) continue;   // a few gaps, as in a real field
      put('maize',0,x,s.y-0.004,z,lerp(0.105,0.13,rnd()),false); take(x,z,0.04); } }

  const vi=sp=>(rnd()*VEG.sp[sp].v.length)|0;
  // 2. broadleaf trees. Groves line the lake and rivers, where roots reach water; a few stand alone in the meadows;
  //    on the mountains a forest belt climbs the lower slopes, thinning out and getting smaller towards the tree line
  const tree=(x,z,s,size)=>{ if(!free(x,z,size*0.28)) return false;
    const k=0.9+rnd()*0.2; put('tree',vi('tree'),x,s.y-0.01,z,size,false,[k*(0.92+0.1*rnd()),k,k*(0.85+0.1*rnd())]); take(x,z,size*0.28); return true; };
  scatter(90,50000,(x,z,s)=>{ if(s.wet||s.bare||s.dw<0.1||s.dw>0.75||s.ny<0.7||s.y<2.65||s.y>3.6) return false;
    if(rnd()>smooth(0.35,0.7,vnoise(x*1.3+3,z*1.3+7))) return false; return tree(x,z,s,lerp(0.34,0.48,rnd())); });
  scatter(22,30000,(x,z,s)=>{ if(s.wet||s.bare||s.dw<0.5||s.ny<0.9||s.green<0.0||s.y<2.7||s.y>3.5) return false; return tree(x,z,s,lerp(0.4,0.52,rnd())); });
  scatter(170,50000,(x,z,s)=>{
    if(s.bare||s.wet||s.ny<0.55||s.y<3.5||s.y>4.95||s.green<-0.03) return false;
    const up=smooth(4.2,4.95,s.y), p=(1-up)*smooth(0.3,0.68,vnoise(x*0.9,z*0.9));
    if(rnd()>p) return false; return tree(x,z,s,lerp(0.36,0.5,rnd())*(1-0.5*up)); });

  // 3. clover and ferns where the soil stays moist; ferns also grow in the shade of the forest
  scatter(45,40000,(x,z,s)=>{ if(s.wet||s.dw<0.04||s.dw>0.7||s.ny<0.85||s.bare||s.y<2.65||s.y>4.3) return false;
    if(!free(x,z,0.06)) return false; put('clover',vi('clover'),x,s.y-0.002,z,lerp(0.14,0.22,rnd()),true); take(x,z,0.06); return true; });
  scatter(110,40000,(x,z,s)=>{ if(s.wet||s.dw<0.06||s.dw>0.5||s.ny<0.7||s.bare||s.green<-0.02||s.y<2.65||s.y>4.5) return false;
    if(!free(x,z,0.04)) return false; put('fern',vi('fern'),x,s.y-0.003,z,lerp(0.08,0.12,rnd()),true); take(x,z,0.04); return true; });
  scatter(80,30000,(x,z,s)=>{ if(s.bare||s.ny<0.6||s.y<3.5||s.y>4.6||s.green<-0.03||vnoise(x*0.9,z*0.9)<0.45) return false;
    if(!free(x,z,0.04)) return false; put('fern',vi('fern'),x,s.y-0.003,z,lerp(0.07,0.1,rnd()),true); take(x,z,0.04); return true; });

  // 4. grass tufts in patches with clearings; their colour follows the ground: fresh green where the land is lush, straw where it is dry
  scatter(900,120000,(x,z,s)=>{ if(s.wet||s.ny<0.7||s.y<2.6||s.y>4.9||s.L>175) return false;
    const patch=vnoise(x*1.6+11,z*1.6+5); if(rnd()>patch*1.4-0.15) return false;
    if(s.green<0&&rnd()<0.5) return false;
    if(!free(x,z,0.03)) return false;
    const g=clamp((s.green+0.02)/0.08,0,1), c=[lerp(1.12,0.82,g),lerp(1.0,1.05,g),lerp(0.62,0.72,g)];
    put('tuft',vi('tuft'),x,s.y-0.003,z,lerp(0.055,0.085,rnd())*(1-0.35*smooth(4.2,4.9,s.y)),true,c); take(x,z,0.03); return true; });

  // 5. wildflowers in small drifts in the green meadows
  for(let g=0;g<16;g++){ let cx=0,cz=0,ok=false;
    for(let t=0;t<400&&!ok;t++){ cx=lerp(-4.8,5.2,rnd()); cz=lerp(-5,4,rnd()); const s=vegAt(cx,cz); ok=!!s&&!s.wet&&s.dw>0.25&&s.ny>0.85&&s.green>0.01&&s.y>2.7&&s.y<3.9; }
    if(!ok) continue; const sp='daisy', n=5+((rnd()*6)|0);
    for(let i=0;i<n;i++){ const a=rnd()*6.283, r=Math.sqrt(rnd())*0.2, x=cx+Math.cos(a)*r, z=cz+Math.sin(a)*r, s=vegAt(x,z);
      if(!s||s.wet||!free(x,z,0.022)) continue; put(sp,vi(sp),x,s.y-0.002,z,lerp(0.06,0.085,rnd()),true); take(x,z,0.022); } }

  // build one instanced mesh per variant part
  const m4=new THREE.Matrix4(), q=new THREE.Quaternion(), e=new THREE.Euler(), pv=new THREE.Vector3(), sv=new THREE.Vector3(), col=new THREE.Color();
  const grp=new THREE.Group(); grp.name='plants'; scene.add(grp); VEG.grp=grp;
  for(const [name,list] of Object.entries(out)){ const sp=VEG.sp[name]; if(!sp) continue;
    sp.v.forEach((vr,vi)=>{ const L=list.filter(a=>a[0]===vi); if(!L.length) return;
      for(const part of vr.parts){
        const mat=part._m||(part._m=vegMat(part.mat,sp.stiff,(sp.tint&&sp.tint[part.mat.name])||sp.tintAll||1));
        const im=new THREE.InstancedMesh(part.geo,mat,L.length); im.name='veg_'+name; im.frustumCulled=false;
        L.forEach((a,i)=>{ e.set(a[6],a[5],a[7]); q.setFromEuler(e); pv.set(a[1],a[2],a[3]); sv.setScalar(a[4]); m4.compose(pv,q,sv); im.setMatrixAt(i,m4);
          const c=a[9]||[1,1,1]; col.setRGB(a[8]*c[0],a[8]*c[1]*(0.98+0.04*Math.sin(a[1]*3)),a[8]*c[2]*0.97); im.setColorAt(i,col); });
        im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true; im.userData.full=L.length; grp.add(im); VEG.ims.push(im); } }); }
  VEG.counts=Object.fromEntries(Object.entries(out).map(([k,v])=>[k,v.length]));
}
function updatePlants(dt){ if(!VEG.built) return; VEG.u.uTime.value+=dt; VEG.u.uWind.value+=(S.wind-VEG.u.uWind.value)*Math.min(1,dt*2);
  if(PERF.low&&!VEG.lowDone){ VEG.lowDone=true; for(const im of VEG.ims) if(/tree|maize|tuft|clover/.test(im.name)) im.count=Math.ceil(im.userData.full*0.6); } }

/* ---------- Cloud magnifier: what happens inside a cloud ---------- */
const MG={open:false,ci:0,t:0,R:150,mols:[],drops:[],cv:$('mag-cv'),ctx:null,phase:-1,cold:false};
MG.ctx=MG.cv.getContext('2d');
// one loop: A vapour 0-3, B condensing (warm cloud) or freezing into ice (cold cloud) 3-8, C droplets join or the ice crystal branches 8-12, D falling 12-15.5
const TB=3, TC=8, TD=12, MAG_T=15.5;
function cssVar(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||'#888'; }

/* 3D molecules. The H2O model is recoloured to the CPK convention used in textbooks: oxygen red, hydrogen white. */
const CPK={O:0xe03a2e,H:0xf4f6f8,bond:0xd3d9df};
const MK={mol:null,liq:null};
const acomp=(a,i,c)=>c===0?a.getX(i):c===1?a.getY(i):c===2?a.getZ(i):a.getW(i);   // one component, de-quantised
function floatGeom(g,m4){   // copy to plain float attributes (the compressed models store integers) and bake the node transform
  const o=new THREE.BufferGeometry();
  for(const k of ['position','normal','uv']){ const a=g.attributes[k]; if(!a) continue; const n=a.itemSize;
    const f=new Float32Array(a.count*n); for(let i=0;i<a.count;i++) for(let c=0;c<n;c++) f[i*n+c]=acomp(a,i,c);
    o.setAttribute(k,new THREE.BufferAttribute(f,n)); }
  if(g.index) o.setIndex(g.index.clone());
  o.applyMatrix4(m4); if(!o.attributes.normal) o.computeVertexNormals(); o.normalizeNormals(); return o;
}
function onH2O(g){
  g.scene.updateMatrixWorld(true);
  const parts=[]; g.scene.traverse(o=>{ if(o.isMesh) parts.push({geo:floatGeom(o.geometry,o.matrixWorld),col:o.material.color.clone()}); });
  for(const p of parts){ p.box=new THREE.Box3().setFromBufferAttribute(p.geo.attributes.position); p.size=p.box.getSize(new THREE.Vector3()); }
  const grey=c=>Math.abs(c.r-c.g)<0.06&&Math.abs(c.g-c.b)<0.06;
  const bond=parts.find(p=>grey(p.col)), atoms=parts.filter(p=>p!==bond);
  const elong=p=>Math.max(p.size.x,p.size.y,p.size.z)/Math.max(1e-6,Math.min(p.size.x,p.size.y,p.size.z));
  atoms.sort((a,b)=>elong(a)-elong(b));              // oxygen is one round atom; the hydrogen mesh holds two
  const Op=atoms[0], Hp=atoms[1]; if(!Op||!Hp) return;
  const O=Op.box.getCenter(new THREE.Vector3()), mid=Hp.box.getCenter(new THREE.Vector3()), pos=Hp.geo.attributes.position, v=new THREE.Vector3();
  const b=mid.clone().sub(O).normalize();
  let p=new THREE.Vector3(), far=0;
  for(let i=0;i<pos.count;i++){ v.fromBufferAttribute(pos,i); const d=v.distanceTo(mid); if(d>far){ far=d; p.copy(v).sub(mid); } }
  const hc=s=>{ const c=new THREE.Vector3(); let n=0; for(let i=0;i<pos.count;i++){ v.fromBufferAttribute(pos,i); if(v.clone().sub(mid).dot(p)*s>0){ c.add(v); n++; } } return c.divideScalar(Math.max(1,n)); };
  let h1=hc(1), h2=hc(-1); p.copy(h1).sub(h2); p.addScaledVector(b,-p.dot(b)).normalize(); h1=hc(1); h2=hc(-1);
  const OH=(h1.distanceTo(O)+h2.distanceTo(O))/2;
  const n=new THREE.Vector3().crossVectors(b,p);
  // canonical frame: oxygen at the origin, the H–O–H bisector along +x, the molecule in the x–y plane, O–H = 1
  const F=new THREE.Matrix4().makeScale(1/OH,1/OH,1/OH).multiply(new THREE.Matrix4().makeBasis(b,p,n).invert()).multiply(new THREE.Matrix4().makeTranslation(-O.x,-O.y,-O.z));
  for(const q of parts) q.geo.applyMatrix4(F);
  const ang=h1.clone().sub(O).angleTo(h2.clone().sub(O));
  MK.mol={O:Op.geo,H:Hp.geo,B:bond?bond.geo:null,rO:Op.size.x/2/OH,rH:Math.min(Hp.size.x,Hp.size.y,Hp.size.z)/2/OH,angle:ang};
}
function onLW(g){
  const box=new THREE.Box3().setFromObject(g.scene), c=box.getCenter(new THREE.Vector3()), r=box.getSize(new THREE.Vector3()).length()/2;
  g.scene.position.sub(c); const piv=new THREE.Group(); piv.add(g.scene); piv.scale.setScalar(1/r);
  g.scene.traverse(o=>{ if(o.isMesh){ const red=o.material.color.r>0.6&&o.material.color.g<0.5;
    o.material=new THREE.MeshStandardMaterial({color:red?CPK.O:CPK.H,roughness:red?0.35:0.45,transparent:true,opacity:1}); o.frustumCulled=false; } });
  const outer=new THREE.Group(); outer.add(piv); MK.liq=outer;   // the outer group is sized in the lens; piv keeps the model at radius 1
}

/* Hexagonal ice (ice Ih), built from the H2O model. Oxygens sit on a wurtzite-type lattice (a = 4.52 Å, c = 7.36 Å),
   each joined to four neighbours 2.76 Å away. Hydrogens follow the ice rules: two on every oxygen, one on every O···O link. */
function buildIce(){
  const U=0.96, a=4.52/U, c=7.36/U, u=3/8, nx=4, ny=4, nz=2, s3=Math.sqrt(3);
  const basis=[[1/3,2/3,0],[2/3,1/3,0.5],[1/3,2/3,u],[2/3,1/3,0.5+u]];
  const F=[]; for(let i=0;i<nx;i++) for(let j=0;j<ny;j++) for(let k=0;k<nz;k++) for(const q of basis) F.push([i+q[0],j+q[1],k+q[2]]);
  const cart=(f,o)=>o.set(f[0]*a-f[1]*a/2, f[1]*a*s3/2, f[2]*c);   // hexagonal axes 120° apart
  const wrap=(d,n)=>d-n*Math.round(d/n);
  const dvec=(i,j,o)=>cart([wrap(F[j][0]-F[i][0],nx),wrap(F[j][1]-F[i][1],ny),wrap(F[j][2]-F[i][2],nz)],o);
  const dOO=u*c, adj=F.map(()=>[]), edges=[], t=new THREE.Vector3();
  for(let i=0;i<F.length;i++) for(let j=i+1;j<F.length;j++){ if(Math.abs(dvec(i,j,t).length()-dOO)<0.3){ adj[i].push(edges.length); adj[j].push(edges.length); edges.push({i,j,from:-1}); } }
  // every oxygen has four links, so walking unused links always closes a loop: orienting links along each loop gives every oxygen two donated hydrogens
  for(let s=0;s<F.length;s++){ let v=s; for(;;){ const e=adj[v].map(k=>edges[k]).find(e=>e.from<0); if(!e) break; e.from=v; v=e.i===v?e.j:e.i; } }
  // a small piece around one of the open hexagonal channels that run along the c axis
  const ctr=new THREE.Vector3(); cart([2,2,1],ctr); const sel=[], idx=new Map();
  for(let i=0;i<F.length;i++){ if(F[i][2]<0.5||F[i][2]>=1.5) continue; cart(F[i],t).sub(ctr); if(Math.hypot(t.x,t.y)<=5.6/U){ idx.set(i,sel.length); sel.push(i); } }
  const sites=sel.map(i=>{ const p=cart(F[i],new THREE.Vector3()).sub(ctr), don=[];
    for(const k of adj[i]){ const e=edges[k]; if(e.from===i){ const o=e.i===i?e.j:e.i; don.push({o,d:dvec(i,o,new THREE.Vector3()).normalize()}); } }
    const B=don[0].d.clone().add(don[1].d).normalize(), P=don[0].d.clone().sub(don[1].d).normalize(), N=new THREE.Vector3().crossVectors(B,P);
    return {i,p,q:new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(B,P,N)),don,ord:0,r:Math.hypot(p.x,p.y)}; });
  const order=sites.map((s,k)=>k).sort((x,y)=>sites[x].r-sites[y].r||sites[x].p.z-sites[y].p.z);
  order.forEach((k,o)=>sites[k].ord=o);
  const sorted=order.map(k=>sites[k]);
  const hb=[];   // hydrogen bonds: from a donated hydrogen to the neighbouring oxygen
  for(const s of sorted) for(const d of s.don){ const k=idx.get(d.o); if(k===undefined) continue; const tgt=sites[k];
    const dir=tgt.p.clone().sub(s.p).normalize(), L=tgt.p.distanceTo(s.p);
    hb.push({a:s.p.clone().addScaledVector(dir,1+(MK.mol?MK.mol.rH:0.4)+0.05), b:s.p.clone().addScaledVector(dir,L-(MK.mol?MK.mol.rO:0.6)-0.05), ord:Math.max(s.ord,tgt.ord)}); }
  hb.sort((x,y)=>x.ord-y.ord);
  return {sites:sorted,hb};
}

const M3={ok:null};
const MAG_S=0.14;   // lens units per O–H length: oxygen ≈ 0.05 of the lens radius
function mag3D(){
  if(M3.ok!==null) return M3.ok;
  if(!MK.mol) return false;
  try{
    const cv=document.createElement('canvas');
    const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:'low-power'}); r.setClearColor(0x000000,0); r.setPixelRatio(1);
    const sc=new THREE.Scene(), k=1/0.92, cam=new THREE.OrthographicCamera(-k,k,k,-k,-10,10); cam.position.z=5;
    sc.add(new THREE.HemisphereLight(0xffffff,0x8a97a6,1.7)); const dl=new THREE.DirectionalLight(0xffffff,2.0); dl.position.set(-1.4,2,3); sc.add(dl);
    const mats={O:new THREE.MeshStandardMaterial({color:CPK.O,roughness:0.35}),H:new THREE.MeshStandardMaterial({color:CPK.H,roughness:0.45}),B:new THREE.MeshStandardMaterial({color:CPK.bond,roughness:0.5})};
    const ice=buildIce(), N=Math.max(34,ice.sites.length), im={};
    for(const key of ['O','H','B']) if(MK.mol[key]){ const m=new THREE.InstancedMesh(MK.mol[key],mats[key],N); m.frustumCulled=false; m.count=0; sc.add(m); im[key]=m; }
    const lat=new THREE.Group(); sc.add(lat); lat.scale.setScalar(MAG_S);
    const lp=new Float32Array(ice.hb.length*6); ice.hb.forEach((h,i)=>{ h.a.toArray(lp,i*6); h.b.toArray(lp,i*6+3); });
    const lg=new THREE.BufferGeometry(); lg.setAttribute('position',new THREE.BufferAttribute(lp,3));
    const hbl=new THREE.LineSegments(lg,new THREE.LineDashedMaterial({color:0x2f7fc4,dashSize:0.16,gapSize:0.12,transparent:true,opacity:0.9}));
    hbl.computeLineDistances(); hbl.frustumCulled=false; lat.add(hbl);
    let liq=null; if(MK.liq){ liq=MK.liq; liq.visible=false; sc.add(liq); }
    Object.assign(M3,{r,cv,sc,cam,im,lat,hbl,ice,liq,N,ok:true});
  }catch(e){ console.warn("3D magnifier unavailable, using the drawn version",e); M3.err=String(e&&e.stack||e); M3.ok=false; }
  return M3.ok;
}
const _mm=new THREE.Matrix4(), _mq=new THREE.Quaternion(), _mq2=new THREE.Quaternion(), _mp=new THREE.Vector3(), _mp2=new THREE.Vector3(), _ms=new THREE.Vector3(), _ax3=new THREE.Vector3();
function setMol(k,p,q,s){ _ms.setScalar(s); _mm.compose(p,q,_ms); for(const key in M3.im) M3.im[key].setMatrixAt(k,_mm); }

function magSetup(){
  MG.cold = MG.ci===1 && A.snowPeak;   // the cloud over the freezing peaks makes ice, the one over the plains makes droplets
  const n=MG.cold&&M3.ok&&M3.ice?M3.ice.sites.length:34;
  MG.mols=[]; for(let i=0;i<n;i++) MG.mols.push({x:Math.random()*1.8-0.9,y:Math.random()*1.8-0.9,z:Math.random()*0.8-0.4,a:Math.random()*6.28,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,
    stuck:false,ts:TB+Math.random()*2.2,q:new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.random()*6.3,Math.random()*6.3,Math.random()*6.3)),w:new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),fx:null});
  MG.drops=[]; for(let i=0;i<8;i++){ const a=i/8*6.28+0.4, r=0.5+Math.random()*0.2; MG.drops.push({x:Math.cos(a)*r,y:Math.sin(a)*r*0.8,r:0.07+Math.random()*0.025,s:Math.random()}); }
  MG.haze=[]; for(let i=0;i<46;i++) MG.haze.push({x:Math.random()*2-1,y:Math.random()*2-1,r:0.012+Math.random()*0.014,v:0.02+Math.random()*0.04});
  $('mag').querySelector('.mtitle').textContent=t(MG.cold?'mag_title_ice':'mag_title');
}
function openMag(ci){
  const c=clouds[ci];
  if(c.u<5){ callout('co_wait','cond',[c.rest.x,A.yc+0.5,c.rest.z],3); return; }
  mag3D();
  MG.open=true; MG.ci=ci; MG.t=0; MG.phase=-1; magSetup();
  const el=$('mag'); el.hidden=false; placeMag(); $('magline').style.display='';
}
function closeMag(){ MG.open=false; $('mag').hidden=true; $('magline').style.display='none'; }
function placeMag(){
  const W=stage.clientWidth,H=stage.clientHeight, el=$('mag');
  const small=narrow();
  const R=small?Math.round(clamp(Math.min(W,H)*0.3,90,150)):150;
  const dpr=Math.min(2,devicePixelRatio||1);
  if(MG.R!==R||MG.cv.width!==Math.round(2*R*dpr)){
    MG.R=R; const d=dpr; MG.cv.width=Math.round(2*R*d); MG.cv.height=Math.round(2*R*d);
    MG.cv.style.width=2*R+'px'; MG.cv.style.height=2*R+'px'; MG.ctx.setTransform(d,0,0,d,0,0); }
  el.style.width=(2*R+24)+'px';
  const c=clouds[MG.ci]; _pv.set(c.rest.x,A.yc+c.half.y*cloudScale(c.u/c.cap),c.rest.z).project(camera);
  const cx=(_pv.x*0.5+0.5)*W, cy=(-_pv.y*0.5+0.5)*H;
  const pw=2*R+24, ph=el.offsetHeight||2*R+90;
  let left,top;
  if(small){ left=(W-pw)/2; top=Math.max(8,(H-ph)/2); }
  else {
    const minX=372, maxX=W-212-pw, minY=64, maxY=H-160-ph;
    left = cx-pw-70>=minX ? cx-pw-70 : cx+70; left=clamp(left,minX,Math.max(minX,maxX));
    top=clamp(cy-ph/2,minY,Math.max(minY,maxY));
  }
  el.style.left=left+'px'; el.style.top=top+'px';
  // leader line from the cloud to the nearest point of the lens
  const lx=left+MG.cv.offsetLeft+R, ly=top+MG.cv.offsetTop+R;   // lens centre
  const dx=cx-lx, dy=cy-ly, d=Math.hypot(dx,dy)||1;
  const ex=lx+dx/d*R, ey=ly+dy/d*R, show=d>R+6;
  const l=$('magline-l'), dot=$('magline-c');
  l.setAttribute('x1',ex); l.setAttribute('y1',ey); l.setAttribute('x2',cx); l.setAttribute('y2',cy);
  dot.setAttribute('cx',cx); dot.setAttribute('cy',cy);
  $('magline').style.color=cssVar('--cond'); l.style.display=dot.style.display=show?'':'none';
}
function drawWater(ctx,x,y,s,a){ // H2O: one oxygen, two hydrogens at about 104.5°
  ctx.save(); ctx.translate(x,y); ctx.rotate(a);
  const hx=Math.sin(0.912)*s*1.25, hy=Math.cos(0.912)*s*1.25;
  ctx.fillStyle='#f4f6f8'; ctx.strokeStyle='rgba(0,0,0,.35)'; ctx.lineWidth=1;
  for(const sx of [-1,1]){ ctx.beginPath(); ctx.arc(sx*hx,-hy,s*0.62,0,6.283); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle='#d8453b'; ctx.beginPath(); ctx.arc(0,0,s,0,6.283); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function drawSalt(ctx,x,y,s){
  ctx.save(); ctx.translate(x,y); ctx.rotate(0.3);
  ctx.fillStyle='#e9edf0'; ctx.strokeStyle='#8a97a3'; ctx.lineWidth=1.5;
  ctx.fillRect(-s,-s,2*s,2*s); ctx.strokeRect(-s,-s,2*s,2*s);
  ctx.beginPath(); ctx.moveTo(-s,-s); ctx.lineTo(-s*0.55,-s*1.45); ctx.lineTo(s*1.45,-s*1.45); ctx.lineTo(s,-s); ctx.closePath(); ctx.fillStyle='#f7f9fa'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(s,-s); ctx.lineTo(s*1.45,-s*1.45); ctx.lineTo(s*1.45,s*0.55); ctx.lineTo(s,s); ctx.closePath(); ctx.fillStyle='#cfd6dc'; ctx.fill(); ctx.stroke();
  ctx.restore();
}
function drawDrop(ctx,x,y,r,flat){ // drops are round (not tear-shaped); a falling 1–2 mm drop is only slightly flattened
  ctx.save(); ctx.translate(x,y);
  const g=ctx.createRadialGradient(-r*0.35,-r*0.4,r*0.1,0,0,r);
  g.addColorStop(0,'rgba(235,248,255,.95)'); g.addColorStop(0.55,'rgba(120,190,235,.75)'); g.addColorStop(1,'rgba(40,120,200,.85)');
  ctx.fillStyle=g; ctx.strokeStyle='rgba(20,80,150,.6)'; ctx.lineWidth=1.2;
  ctx.beginPath();
  if(flat) ctx.ellipse(0,0,r*1.04,r*0.9,0,0,6.283);
  else ctx.arc(0,0,r,0,6.283);
  ctx.fill(); ctx.stroke(); ctx.restore();
}
function tag(ctx,txt,x,y,R){
  ctx.font=`600 ${Math.max(11,R*0.085)}px ${getComputedStyle(document.body).fontFamily}`;
  const w=ctx.measureText(txt).width+12, h=Math.max(18,R*0.13);
  const lim=Math.max(0,R*0.9-w/2); x=clamp(x,R-lim,R+lim); y=clamp(y,R*0.25,R*1.75);
  ctx.fillStyle='rgba(255,255,255,.88)'; ctx.strokeStyle='rgba(16,38,44,.25)';
  ctx.beginPath(); ctx.roundRect?ctx.roundRect(x-w/2,y-h/2,w,h,5):ctx.rect(x-w/2,y-h/2,w,h); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#10262c'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(txt,x,y+0.5);
}
function drawDust(ctx,x,y,s){ // a mineral dust grain: the usual seed for ice in clouds
  ctx.save(); ctx.translate(x,y); ctx.fillStyle='#8c7f72'; ctx.strokeStyle='#5b5249'; ctx.lineWidth=1.2; ctx.beginPath();
  [1,0.72,0.95,0.68,1.05,0.8,0.9].forEach((r,i,k)=>{ const a=i/k.length*6.283+0.3; ctx.lineTo(Math.cos(a)*s*r,Math.sin(a)*s*r); });
  ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
function drawFlake(ctx,x,y,L,g,rot){ // six-fold ice crystal: a hexagonal plate that sprouts six branched arms as it grows
  ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.lineCap='round'; ctx.lineJoin='round';
  const plate=L*0.17*smooth(0,0.25,g), arm=L*smooth(0.12,0.85,g);
  const hex=r=>{ ctx.beginPath(); for(let i=0;i<6;i++){ const a=i*Math.PI/3; ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r); } ctx.closePath(); };
  for(const [w,col] of [[0.075,'rgba(52,112,178,.6)'],[0.038,'#f5fbff']]){
    ctx.strokeStyle=col; ctx.lineWidth=Math.max(1.2,L*w);
    if(arm>plate) for(let i=0;i<6;i++){ const a=i*Math.PI/3, ca=Math.cos(a), sa=Math.sin(a);
      ctx.beginPath(); ctx.moveTo(ca*plate*0.8,sa*plate*0.8); ctx.lineTo(ca*arm,sa*arm);
      for(const f of [0.42,0.62,0.8]){ const d=f*L; if(d>arm*0.98) continue;
        const bl=L*0.3*(1-f*0.75)*smooth(0.25+f*0.6,1,g);
        for(const sd of [-1,1]){ const b=a+sd*Math.PI/3; ctx.moveTo(ca*d,sa*d); ctx.lineTo(ca*d+Math.cos(b)*bl,sa*d+Math.sin(b)*bl); } }
      ctx.stroke(); }
  }
  if(plate>0.5){ hex(plate); ctx.fillStyle='rgba(236,248,255,.95)'; ctx.fill(); ctx.strokeStyle='rgba(52,112,178,.7)'; ctx.lineWidth=Math.max(1,L*0.025); ctx.stroke();
    hex(plate*0.55); ctx.strokeStyle='rgba(52,112,178,.35)'; ctx.stroke(); }
  ctx.restore();
}
function drawMag(raw){
  if(!MG.open) return;
  placeMag();
  if(!S.paused) MG.t+=raw; if(MG.t>=MAG_T){ MG.t=0; magSetup(); }
  const tt=MG.t, R=MG.R, ctx=MG.ctx, D=2*R, P=v=>R+v*R*0.92, cold=MG.cold, use3=M3.ok===true;
  const phase=tt<TB?0:tt<TC?1:tt<TD?2:3;
  if(phase!==MG.phase){ MG.phase=phase; $('mag-cap').textContent=t((cold?['mag_a','ice_b','ice_c','ice_d']:['mag_a','mag_b','mag_c','mag_d'])[phase]); }
  ctx.clearRect(0,0,D,D);
  const bg=ctx.createLinearGradient(0,0,0,D), cool=smooth(TB-0.5,TB+1,tt);
  bg.addColorStop(0,`rgb(${lerp(250,cold?206:214,cool)|0},${lerp(236,cold?226:229,cool)|0},${lerp(214,cold?246:242,cool)|0})`);
  bg.addColorStop(1,`rgb(${lerp(244,cold?186:196,cool)|0},${lerp(226,cold?208:214,cool)|0},${lerp(204,cold?236:232,cool)|0})`);
  ctx.fillStyle=bg; ctx.fillRect(0,0,D,D);
  const ms=R*0.045, run=S.paused?0:raw;
  if(phase<=1){
    const TG=[], tg=(...q)=>TG.push(q);
    let nMol=0, lastFree=null;
    // the 3D scene shares the lens coordinates: x right, y up, the lens radius is 1/0.92
    const lat=use3?M3.lat:null;
    // look almost straight down the c axis, where the hexagonal rings show
    if(use3){ lat.rotation.set(-0.2+0.08*Math.sin(tt*0.5),0.22*Math.sin(tt*0.42),tt*0.06); lat.updateMatrixWorld(true); lat.getWorldQuaternion(_mq2); }
    if(!cold){
      const nx=P(0), ny=P(0), stuckN=MG.mols.filter(m=>m.stuck).length;
      const dr=R*0.06+R*0.19*Math.sqrt(stuckN/MG.mols.length);
      const zoom=smooth(5.3,6.1,tt);                 // the view moves into the droplet: liquid water, molecules close together
      for(const m of MG.mols){
        if(m.stuck) continue;
        if(tt>m.ts){ const dx=-m.x, dy=-m.y, d=Math.hypot(dx,dy);
          if(d<(dr/(R*0.92))+0.02){ m.stuck=true; continue; }
          m.x+=dx/d*0.7*run; m.y+=dy/d*0.7*run; }
        else { m.x+=m.vx*run*(1.4-cool*0.6); m.y+=m.vy*run*(1.4-cool*0.6); if(Math.abs(m.x)>0.95) m.vx*=-1; if(Math.abs(m.y)>0.95) m.vy*=-1; }
        m.a+=run*1.5; if(zoom>0.4) continue; lastFree=m;
        if(use3){ m.q.premultiply(_mq.setFromAxisAngle(m.w,run*1.6)); _mp.set(m.x,-m.y,m.z); setMol(nMol++,_mp,m.q,MAG_S); }
        else drawWater(ctx,P(m.x),P(m.y),ms,m.a);
      }
      const dropR=lerp(dr,R*0.97,zoom);
      ctx.globalAlpha=1-0.45*zoom; if(stuckN>0||zoom>0) drawDrop(ctx,nx,ny,dropR,false); ctx.globalAlpha=1;
      if(zoom<1){ ctx.globalAlpha=1-zoom; drawSalt(ctx,nx,ny,R*0.045); ctx.globalAlpha=1; }
      if(use3&&M3.liq){ const k=smooth(5.6,6.4,tt); M3.liq.visible=k>0;
        if(k>0){ M3.liq.scale.setScalar(0.86*(0.75+0.25*k)); M3.liq.rotation.set(0.3,tt*0.25,0.1); M3.liq.traverse(o=>{ if(o.isMesh) o.material.opacity=k; }); } }
      if(zoom<0.5){ if(lastFree) tg(t('ml_mol'),P(lastFree.x),P(lastFree.y)-ms*3.2,R); tg(t(stuckN>6?'ml_drop':'ml_salt'),R,R+R*0.36,R); }
    } else {
      // freezing cloud: molecules settle on a dust grain and lock, one by one, into the hexagonal ice lattice
      const sites=use3?M3.ice.sites:null, n=MG.mols.length;
      drawDust(ctx,P(0),P(0),R*0.05);
      let placed=0;
      MG.mols.forEach((m,i)=>{
        const start=TB+0.2+i*(3.3/n), k=use3?smooth(start,start+0.75,tt):0;
        if(tt<start||!use3){
          if(!use3&&tt>start){ m.stuck=true; return; }
          m.x+=m.vx*run*(1.4-cool*0.6); m.y+=m.vy*run*(1.4-cool*0.6); if(Math.abs(m.x)>0.95) m.vx*=-1; if(Math.abs(m.y)>0.95) m.vy*=-1; m.a+=run*1.5; lastFree=m;
          if(use3){ m.q.premultiply(_mq.setFromAxisAngle(m.w,run*1.6)); _mp.set(m.x,-m.y,m.z); setMol(nMol++,_mp,m.q,MAG_S); }
          else drawWater(ctx,P(m.x),P(m.y),ms,m.a);
          return; }
        if(!m.fx){ m.fx=new THREE.Vector3(m.x,-m.y,m.z); m.fq=m.q.clone(); }
        const s=sites[i]; _mp2.copy(s.p).applyMatrix4(lat.matrixWorld); _mq.copy(_mq2).multiply(s.q);
        _mp.lerpVectors(m.fx,_mp2,ease(k)); const q=m.fq.clone().slerp(_mq,ease(k));
        setMol(nMol++,_mp,q,MAG_S); if(k>=1) placed=i+1;
      });
      if(use3){ let c=0; const hb=M3.ice.hb; while(c<hb.length&&hb[c].ord<placed) c++; M3.hbl.geometry.setDrawRange(0,c*2); M3.hbl.visible=c>0; }
      if(!use3){ const g=smooth(TB+0.5,TC,tt)*0.3; drawFlake(ctx,P(0),P(0),R*0.5,g,0); }
      if(lastFree&&placed<n*0.6) tg(t('ml_mol'),P(lastFree.x),P(lastFree.y)-ms*3.2,R);
      tg(t(placed<n*0.3?'ml_dust':'ml_ice'),R,R*1.78,R);
    }
    if(use3){
      for(const key in M3.im){ M3.im[key].count=nMol; M3.im[key].instanceMatrix.needsUpdate=true; }
      M3.lat.visible=cold; if(cold&&M3.liq) M3.liq.visible=false;
      const px=Math.round(D*Math.min(2,devicePixelRatio||1)); if(M3.cv.width!==px) M3.r.setSize(px,px,false);
      M3.r.render(M3.sc,M3.cam); ctx.drawImage(M3.cv,0,0,D,D);
      if(!cold&&smooth(5.3,6.1,tt)>=0.5) tg(t('ml_liq'),R,R*1.78,R);
    }
    for(const q of TG) tag(ctx,...q);
  } else if(!cold){
    // countless tiny droplets in the background
    ctx.fillStyle='rgba(90,160,215,.45)';
    for(const h of MG.haze){ h.y-=h.v*run*0.3; if(h.y<-1) h.y=1; ctx.beginPath(); ctx.arc(P(h.x),P(h.y),h.r*R,0,6.283); ctx.fill(); }
    // droplets drift in one by one and join the growing drop (volume adds up, so the radius grows as a cube root)
    let vol=0.12**3; const pos=[];
    for(const d of MG.drops){
      const k=ease(clamp((tt-TC-0.4-d.s*1.6)/1.8,0,1));
      const x=lerp(d.x,0,k)+Math.sin(tt*1.3+d.s*6)*0.03*(1-k), y=lerp(d.y,0,k);
      pos.push([x,y,k]); if(k>=1) vol+=d.r**3;
    }
    const big=Math.cbrt(vol);
    pos.forEach(([x,y,k],i)=>{ const d=MG.drops[i]; if(k>=1||Math.hypot(x,y)<big-d.r*0.3) return; drawDrop(ctx,P(x),P(y),d.r*R*0.92,false); });
    let by=0; if(phase===3) by=Math.pow((tt-TD)/(MAG_T-TD),2)*1.6;
    drawDrop(ctx,P(0),P(by),big*R*0.92,phase===3);
    tag(ctx,t(phase===3?'ml_rain':'ml_drop'),R,P(by)+big*R+R*0.12,R);
  } else {
    // the ice crystal grows while the supercooled droplets around it shrink: their water evaporates and freezes onto the ice
    const g=phase===2?smooth(TC,TD-0.4,tt):1, fall=phase===3?Math.pow((tt-TD)/(MAG_T-TD),2)*1.6:0;
    ctx.fillStyle='rgba(90,160,215,.35)';
    for(const h of MG.haze){ h.y-=h.v*run*0.3; if(h.y<-1) h.y=1; ctx.beginPath(); ctx.arc(P(h.x),P(h.y),h.r*R*(1-0.6*g),0,6.283); ctx.fill(); }
    for(const d of MG.drops){ const r=d.r*(1-smooth(TC+d.s*0.8,TD-0.6,tt)); if(r<0.004) continue;
      const x=d.x*(1-0.12*g), y=d.y*(1-0.12*g)+fall*0.4; drawDrop(ctx,P(x),P(y),r*R*0.92,false); }
    drawFlake(ctx,P(0),P(fall),R*0.6,g,tt*0.05);
    tag(ctx,t(phase===3?'ml_flake':'ml_crys'),R,clamp(P(fall)+R*0.7,0,R*1.78),R);
  }
  // lens rim shading
  const rim=ctx.createRadialGradient(R,R,R*0.82,R,R,R); rim.addColorStop(0,'rgba(0,0,0,0)'); rim.addColorStop(1,'rgba(0,0,0,.14)');
  ctx.fillStyle=rim; ctx.fillRect(0,0,D,D);
}
// tap (not drag) on a cloud opens the magnifier
let down=null;
renderer.domElement.addEventListener('pointerdown',e=>{ down={x:e.clientX,y:e.clientY,t:performance.now()}; });
renderer.domElement.addEventListener('pointerup',e=>{
  if(!down||!root) return; const moved=Math.hypot(e.clientX-down.x,e.clientY-down.y), dtm=performance.now()-down.t; down=null;
  if(moved>8||dtm>500) return;
  const r=renderer.domElement.getBoundingClientRect(), px=e.clientX-r.left, py=e.clientY-r.top;
  let best=-1,bd=1e9;
  clouds.forEach((c,i)=>{
    const s=Math.max(0.35,cloudScale(c.u/c.cap)), cy=A.yc+c.half.y*s;
    _pv.set(c.rest.x,cy,c.rest.z).project(camera); const sx=(_pv.x*0.5+0.5)*r.width, sy=(-_pv.y*0.5+0.5)*r.height;
    _v.set(c.rest.x,cy+c.half.y*s,c.rest.z).project(camera); const rad=Math.max(28,Math.abs((-_v.y*0.5+0.5)*r.height-sy)*1.6);
    const d=Math.hypot(px-sx,py-sy); if(d<rad&&d<bd){ bd=d; best=i; }
  });
  if(best>=0) openMag(best); else togglePause();   // a tap on empty sky or land pauses and resumes
});
$('mag-close').onclick=closeMag;

/* ---------- Fullscreen ---------- */
const fsBtn=$('btn-fs');
if(document.fullscreenEnabled){ fsBtn.hidden=false;
  fsBtn.onclick=()=>{ const p=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen(); if(p&&p.catch) p.catch(()=>{ fsBtn.hidden=true; }); };
  document.addEventListener('fullscreenchange',()=>{ const on=!!document.fullscreenElement; fsBtn.innerHTML=on?ICON_FS_EXIT:ICON_FS; fsBtn.setAttribute('aria-label',t(on?'fullscreen_exit':'fullscreen')); fsBtn.title=t(on?'fullscreen_exit':'fullscreen'); });
}

/* ---------- Language ---------- */
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i]').forEach(e=>{ e.textContent=t(e.dataset.i); });
  document.querySelectorAll('[data-ia]').forEach(e=>{ const k=(e.id==='btn-fs'&&document.fullscreenElement)?'fullscreen_exit':e.dataset.ia; e.setAttribute('aria-label',t(k)); e.title=t(k); });
  document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
  setPaused(S.paused); showInfo(S.focus); labelText(); renderTeach();
  MG.phase=-1; TH.ticks.forEach(e=>e._h='');
  for(const o of CO) o.el.remove(); CO.length=0; COQ.length=0;
  if(root) readouts();
}
function openCredits(){ $('credits').hidden=false; if(narrow()) $('credits').scrollIntoView({block:'nearest',behavior:reduceMotion?'auto':'smooth'}); }
$('btn-credits').onclick=()=>{ $('credits').hidden?openCredits():($('credits').hidden=true); };
$('btn-credits2').onclick=openCredits;
$('cr-close').onclick=()=>{ $('credits').hidden=true; };

/* ---------- Controls ---------- */
function bindSlider(id,out,key,fmt){ const el=$(id); const set=()=>{S[key]=+el.value; $(out).textContent=fmt(+el.value);}; el.addEventListener('input',set); set(); }
bindSlider('in-t','o-t','T',v=>v+' °C');
bindSlider('in-rh','o-rh','RH',v=>v+' %');
bindSlider('in-w','o-w','wind',v=>v+' m/s');
$('btn-play').onclick=togglePause;
const SPEEDS=[0.5,1,2,4];
$('btn-speed').onclick=()=>{ S.speed=SPEEDS[(SPEEDS.indexOf(S.speed)+1)%SPEEDS.length]; $('btn-speed').textContent=(S.speed===0.5?'½':S.speed)+'×'; };
function togglePause(){ setPaused(!S.paused); toast(S.paused?ICON_PAUSE:ICON_PLAY,S.paused?'Paused':'Playing'); }
$('btn-lbl').onclick=()=>{S.labels=!S.labels; $('btn-lbl').setAttribute('aria-pressed',String(S.labels)); levelGroup.visible=S.labels; if(!S.labels) clearCallouts();};
$('btn-rays').onclick=()=>{RAYS.on=!RAYS.on; $('btn-rays').setAttribute('aria-pressed',String(RAYS.on));};
$('btn-arr').onclick=()=>{S.arrows=!S.arrows; $('btn-arr').setAttribute('aria-pressed',String(S.arrows));};
$('btn-reset').onclick=()=>{ if(teach>=0) exitTeach(); restart(false); clearCallouts(); S.evapRate=S.condRate=S.precRate=0;};
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{const p=c.dataset.p; S.focus=p; showInfo(p); goTo(p);
  if(p==='cond'&&clouds[0].u>5){ const cl=clouds[0]; callout('co_tap','cond',[cl.rest.x,A.yc+2.2,cl.rest.z],5); } });
$('btn-whole').onclick=()=>{S.focus='all'; showInfo('all'); goTo('all');};
$('btn-teach').onclick=()=>{ teach>=0?exitTeach():teachGo(0); };
$('t-next').onclick=()=>teachGo(teach+1);
$('t-exit').onclick=exitTeach;
document.addEventListener('keydown',e=>{ if(e.key===' '&&!/INPUT|BUTTON|TEXTAREA|SELECT|SUMMARY/.test(document.activeElement?.tagName||'')){ e.preventDefault(); togglePause(); return; }
  if(e.key==='Escape'){ if(!$('credits').hidden) $('credits').hidden=true; else if(MG.open) closeMag(); } });

applyLang();
closeMag();
loadModel().catch(failLoad);
requestAnimationFrame(frame);
