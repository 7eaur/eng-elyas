/* Three.js r180 (MIT). Holographic shader for the interactive ability card.
   CSS card and flip behavior remain available if WebGL is unsupported. */
const card=document.getElementById("ability-card");
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(card&&!reduced&&"IntersectionObserver"in window){
 let initialized=false;
 const observer=new IntersectionObserver(async entries=>{
  if(!entries.some(e=>e.isIntersecting)||initialized)return;
  initialized=true;observer.disconnect();
  try{
   const THREE=await import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js");
   const target=card.querySelector(".ability-front");if(!target||!card.isConnected)return;
   const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"low-power",premultipliedAlpha:true});
   renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
   renderer.setSize(target.clientWidth,target.clientHeight,false);
   renderer.domElement.className="holo-canvas";renderer.domElement.setAttribute("aria-hidden","true");
   renderer.domElement.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;border-radius:inherit;mix-blend-mode:screen";
   target.prepend(renderer.domElement);
   for(const el of target.children)if(el!==renderer.domElement)el.style.position="relative";
   const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,10);camera.position.z=3;
   const uniforms={uTime:{value:0},uPointer:{value:new THREE.Vector2(.5,.5)}};
   const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms,
    vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:"precision highp float;varying vec2 vUv;uniform float uTime;uniform vec2 uPointer;void main(){float dist=length(vUv-uPointer);float ray=max(0.,1.-abs(vUv.x-vUv.y*.26-.28-sin(uTime*.24)*.35)*2.3);float fine=sin((vUv.x+vUv.y*.5)*150.+uTime*.3)*.5+.5;float halo=max(0.,1.-dist*1.6);vec3 champagne=vec3(.77,.56,.37);vec3 teal=vec3(.28,.68,.68);vec3 violet=vec3(.56,.42,.71);vec3 rgb=mix(champagne,teal,smoothstep(.2,.85,vUv.x));rgb=mix(rgb,violet,smoothstep(.48,.97,vUv.y)*.46);float alpha=.035+ray*.16+halo*.12+fine*.021;gl_FragColor=vec4(rgb,alpha);}"
   });
   scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
   const pointer=e=>{const r=card.getBoundingClientRect();uniforms.uPointer.value.set((e.clientX-r.left)/r.width,1-(e.clientY-r.top)/r.height)};
   card.addEventListener("pointermove",pointer,{passive:true});
   let inView=true,raf=0;
   const visibility=new IntersectionObserver(e=>{inView=e.some(x=>x.isIntersecting)},{threshold:.01});visibility.observe(card);
   const clock=new THREE.Clock();
   const render=()=>{raf=requestAnimationFrame(render);if(!inView||document.hidden)return;uniforms.uTime.value=clock.getElapsedTime();renderer.render(scene,camera)};render();
   const resize=new ResizeObserver(()=>renderer.setSize(target.clientWidth,target.clientHeight,false));resize.observe(target);
   renderer.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault();cancelAnimationFrame(raf);renderer.domElement.remove();resize.disconnect();visibility.disconnect()});
  }catch(e){/* CSS fallback already works. */}
 },{threshold:.12});
 observer.observe(card);
}
