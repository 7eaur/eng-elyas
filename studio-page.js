(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const items={
himma:{name:"Himma",category:"Educational platform",subtitle:"An interactive learning experience",copy:"A learning platform designed to bring lessons, guided practice and assessment together in one clear experience for students and supervisors.",tags:["Web platform","Learning experience","Full-stack"],image:"/assets/featured-himma.webp",link:"https://himma-om.com/"},
update:{name:"Update Card",category:"Web platform · Digital products",subtitle:"Making digital orders simpler",copy:"A commerce-oriented product experience, structured around clear ordering flows, responsive pages and simple customer journeys.",tags:["Responsive build","Web development","Product UX"],image:"/assets/project-update.webp",link:"https://github.com/7eaur/update_card"},
clinic:{name:"Dr. Fayza Clinic",category:"Healthcare website",subtitle:"Information with clarity and care",copy:"A responsive healthcare website presenting clinic services, practical information and simple paths for visitors to get in touch.",tags:["Web design","Responsive","SEO-ready"],image:"/assets/project-clinic.webp",link:"https://github.com/7eaur/dr-fayza"},
wasl:{name:"Wasl Tech",category:"Business website",subtitle:"Digital services, clearly presented",copy:"Design and implementation of a digital-services brand experience, with readable messaging, responsive layouts and practical paths to reach the team.",tags:["Brand experience","Front-end","Visual design"],image:"/assets/project-wasl.webp",link:"https://github.com/7eaur/wasl"},
brand:{name:"Personal Brand Identity",category:"Identity · Digital assets",subtitle:"A visual system built with precision",copy:"An independent signature-style identity system developed for a software engineer, with logos, icons and digital presentation assets.",tags:["Logo system","Identity","Typography"],image:"/assets/about-brand.webp",link:"https://github.com/7eaur/eng-elyas/tree/main/brand/identity"},
wasila:{name:"Smart Wasila",category:"Education · Prototype",subtitle:"A study and revision concept",copy:"An educational web app concept focused on helping students prepare, review lessons and work through practice tests.",tags:["Education","Prototype","Product thinking"],image:"/assets/project-wasila.webp",link:"https://github.com/7eaur"},
lab:{name:"Himma Speech Lab",category:"Speech recognition · R&D",subtitle:"Experimenting with educational audio",copy:"An applied engineering effort exploring speech recognition workflows for an educational learning setting.",tags:["Speech","Research","Systems"],image:"/assets/featured-himma.webp",link:"https://github.com/7eaur/himma-lab"}
};
const category={
"web-developer":{projects:["himma","update","clinic","wasl"]},
"app-developer":{projects:["wasila","himma","update"]},
"ui-ux-designer":{projects:["clinic","himma","wasl","update"]},
"graphic-designer":{projects:["brand","wasl","clinic"]},
"photographer":{projects:[],gallery:["/assets/hero-portrait.webp","/assets/contact-desk.webp","/assets/about-brand.webp","/assets/featured-himma.webp","/assets/project-clinic.webp","/assets/project-wasl.webp","/assets/project-update.webp","/assets/project-wasila.webp"]}
};
const kind=document.body.dataset.page||"web-developer",data=category[kind]||category["web-developer"],list=$("#case-items");
const galleryAssets=["/assets/about-brand.webp","/assets/project-wasl.webp","/assets/project-clinic.webp","/assets/featured-himma.webp","/assets/project-update.webp","/assets/hero-portrait.webp","/assets/contact-desk.webp"];
function el(tag,cls,text){const a=document.createElement(tag);if(cls)a.className=cls;if(text!==undefined)a.textContent=text;return a}
function caseStudy(key,i){const d=items[key],article=el("article","case-item"),wrap=el("div","case-row"),photo=el("div","case-image"),img=document.createElement("img");img.src=d.image;img.alt="Portfolio presentation for "+d.name;img.loading="lazy";img.decoding="async";photo.append(img,el("span","concept-label","PORTFOLIO ARTWORK"));const copy=el("div","case-copy");copy.append(el("small","",String(i+1).padStart(2,"0")+"  "+d.category),el("h2","",d.name),el("p","case-subtitle",d.subtitle),el("p","",d.copy));const tags=el("div","tags");d.tags.forEach(t=>tags.append(el("span","",t)));copy.append(tags);const link=el("a","", "Explore the project ↗");link.href=d.link;link.target="_blank";link.rel="noopener noreferrer";copy.append(link);wrap.append(photo,copy);article.append(wrap);list.append(article);if(kind==="graphic-designer"){img.tabIndex=0;img.setAttribute("role","button");img.setAttribute("aria-label","View "+d.name+" visual");img.addEventListener("click",()=>openViewer(d.image,d.name));img.addEventListener("keydown",e=>{if(e.key==="Enter")openViewer(d.image,d.name)})}}
data.projects.forEach(caseStudy);
const zone=$("#gallery-zone"),dragger=$("#drag-gallery");if(kind==="photographer"){zone.hidden=false;zone.querySelector("h2").innerHTML="Drag in<br><em>any direction.</em>";const note=el("p","gallery-note","Selected visual compositions and portfolio artwork, not a commissioned photography catalogue.");note.style.cssText="font-size:12px;color:#857878;margin:-20px 0 35px";zone.querySelector(".shell").append(note);const gallery=data.gallery||galleryAssets;gallery.forEach((src,i)=>{const cell=el("button","gallery-photo"),img=document.createElement("img");cell.type="button";img.loading="lazy";img.src=src;img.alt="Portfolio visual composition "+(i+1);cell.append(img);cell.addEventListener("click",()=>openViewer(src,"Visual composition "+(i+1)));dragger.append(cell)});}else if(kind==="graphic-designer"){zone.hidden=false;zone.querySelector("h2").innerHTML="Every detail<br><em>has a story.</em>";galleryAssets.slice(0,5).forEach((src,i)=>{const cell=el("button","gallery-photo"),img=document.createElement("img");cell.type="button";img.loading="lazy";img.src=src;img.alt="Design presentation "+(i+1);cell.append(img);cell.addEventListener("click",()=>openViewer(src,"Design presentation "+(i+1)));dragger.append(cell)})}
const viewer=$("#image-viewer"),viewImage=$("#viewer-image"),caption=$("#viewer-caption");let imageList=[],index=0;
function openViewer(src,title){imageList=[...new Set([...$$(".gallery-photo img").map(i=>i.src),...$$(".case-image img").map(i=>i.src)])];if(!imageList.includes(new URL(src,location.origin).href))imageList.unshift(new URL(src,location.origin).href);index=imageList.indexOf(new URL(src,location.origin).href);showImage();caption.textContent=title;viewer.showModal()}
function showImage(){viewImage.src=imageList[index]||"";viewImage.alt="Selected portfolio image "+(index+1)}
function moveImage(direction){if(!imageList.length)return;index=(index+direction+imageList.length)%imageList.length;showImage();caption.textContent=(index+1)+" / "+imageList.length}
$("#viewer-close").addEventListener("click",()=>viewer.close());$("#viewer-prev").addEventListener("click",()=>moveImage(-1));$("#viewer-next").addEventListener("click",()=>moveImage(1));viewer.addEventListener("click",e=>{if(e.target===viewer)viewer.close()});viewer.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")moveImage(-1);if(e.key==="ArrowRight")moveImage(1)});
if(kind==="photographer"){
 const stage=el("div","spatial-track");const cells=[...dragger.querySelectorAll(".gallery-photo")];cells.forEach((cell,i)=>{stage.append(cell);const w=innerWidth<=650;const stepX=w?280:390,stepY=w?300:450;const left=(w?145:185)+(i%4)*stepX,top=(w?200:220)+Math.floor(i/4)*stepY;cell.style.left=left+"px";cell.style.top=top+"px";cell.style.setProperty("--r",((i%4-1.5)*2.5)+"deg")});dragger.append(stage);
 let px=0,py=0,active=false,startX=0,startY=0,oldX=0,oldY=0,moved=false;
 const apply=()=>{stage.style.transform="translate(calc(-50% + "+px+"px),calc(-50% + "+py+"px))"};
 const dragStart=e=>{if(e.pointerType!=="touch"&&e.button!==0)return;active=true;moved=false;startX=e.clientX;startY=e.clientY;oldX=px;oldY=py;dragger.classList.add("dragging")};
 const dragMove=e=>{if(!active)return;const dx=e.clientX-startX,dy=e.clientY-startY;if(Math.hypot(dx,dy)>7)moved=true;px=oldX+dx;py=oldY+dy;apply()};
 const dragEnd=()=>{active=false;dragger.classList.remove("dragging")};
 dragger.addEventListener("pointerdown",dragStart);document.addEventListener("pointermove",dragMove,{passive:true});document.addEventListener("pointerup",dragEnd);document.addEventListener("pointercancel",dragEnd);
 dragger.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
 dragger.addEventListener("wheel",e=>{e.preventDefault();px-=e.deltaX||e.deltaY*.65;py-=e.deltaY*.6;apply()},{passive:false});
 dragger.addEventListener("keydown",e=>{if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){e.preventDefault();px+=e.key==="ArrowLeft"?100:e.key==="ArrowRight"?-100:0;py+=e.key==="ArrowUp"?100:e.key==="ArrowDown"?-100:0;apply()}});
}else{
 let grabbing=false,startX=0,origScroll=0,moved=false;
 dragger.addEventListener("pointerdown",e=>{if(e.pointerType==="touch")return;grabbing=true;moved=false;startX=e.clientX;origScroll=dragger.scrollLeft});
 dragger.addEventListener("pointermove",e=>{if(!grabbing)return;const d=e.clientX-startX;if(Math.abs(d)>5){moved=true;dragger.scrollLeft=origScroll-d}});
 dragger.addEventListener("pointerup",()=>{grabbing=false});dragger.addEventListener("pointerleave",()=>{grabbing=false});
 dragger.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
}
$("#year").textContent=new Date().getFullYear();
})();
