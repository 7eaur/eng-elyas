(()=>{"use strict";
const projects={
himma:{name:"Himma",type:"EDUCATION / WEB PLATFORM",desc:"An interactive educational platform bringing together learning activities, practice and assessment in a student-focused experience.",image:"assets/featured-himma.webp",url:"https://himma-om.com/"},
update:{name:"Update Card",type:"DIGITAL PRODUCT / COMMERCE",desc:"Digital ordering and commerce experiences developed for practical customer journeys.",image:"assets/project-update.webp",url:"https://github.com/7eaur/update_card"},
clinic:{name:"Dr. Fayza Clinic",type:"HEALTHCARE / WEBSITE",desc:"A responsive clinic website that presents services and makes essential information easy to find.",image:"assets/project-clinic.webp",url:"https://github.com/7eaur/dr-fayza"},
wasl:{name:"Wasl Tech",type:"DIGITAL SERVICES / WEBSITE",desc:"Digital services, product experiences and a carefully structured visual presence for a technology brand.",image:"assets/project-wasl.webp",url:"https://github.com/7eaur/wasl"},
ocr:{name:"Sabaic OCR / YOLO",type:"COMPUTER VISION / RESEARCH",desc:"Computer-vision and optical character recognition experiments around Sabaic script.",image:"assets/about-brand.webp",url:"https://github.com/7eaur/Sabaic-OCR-YOLO"},
lab:{name:"Himma Speech Lab",type:"SPEECH TECHNOLOGY / RESEARCH",desc:"Exploration and development of speech recognition for an educational context.",image:"assets/featured-himma.webp",url:"https://github.com/7eaur/himma-lab"},
brand:{name:"Elyas Personal Identity",type:"IDENTITY / BRAND DESIGN",desc:"The petrol-and-copper personal visual system: a custom engineered E mark, signature logotype and digital assets.",image:"assets/about-brand.webp",url:"https://github.com/7eaur/eng-elyas/tree/main/brand/identity"}
};
const categories={
web:{label:"THE WORK / 01",heading:["Web","development."],description:"Fast, responsive and thoughtfully engineered web experiences — from public websites to complex learning platforms.",symbol:"</>",tags:["Laravel","React","Node.js","Responsive design"],projects:["himma","update","clinic","wasl"]},
app:{label:"THE WORK / 02",heading:["App","development."],description:"Mobile-first product thinking and Flutter development, with a focus on useful flows and experiences that work beautifully on small screens.",symbol:"◧",tags:["Flutter","Dart","Mobile UX","REST APIs"],projects:["himma","update"]},
design:{label:"THE WORK / 03",heading:["UI / UX","design."],description:"Interfaces shaped by clarity, usability and identity: functional design in service of real people.",symbol:"✺",tags:["Product thinking","Responsive UI","Design systems","Prototyping"],projects:["clinic","wasl","brand"]},
systems:{label:"THE WORK / 04",heading:["Software","systems."],description:"Reliable software, structured data and the engineering beneath well-functioning products.",symbol:"{ }",tags:["APIs","Databases","Laravel","C#","SQL"],projects:["himma","update","lab","ocr"]},
creative:{label:"THE WORK / 05",heading:["Creative","technology."],description:"Where visual identity, interaction and engineering meet — experimenting with ideas and making them tangible.",symbol:"✦",tags:["Visual identity","Motion","Interactive UI","Computer vision"],projects:["brand","wasl","ocr"]}
};
const q=new URLSearchParams(location.search),selected=q.get("field")||"web",field=Object.hasOwn(categories,selected)?selected:"web",data=categories[field];
const byId=x=>document.getElementById(x);
byId("work-category").textContent=data.label;
byId("work-title").innerHTML=data.heading[0]+"<br><em>"+data.heading[1]+"</em>";
byId("work-description").textContent=data.description;
byId("work-symbol").textContent=data.symbol;
byId("work-tags").replaceChildren(...data.tags.map(t=>{const s=document.createElement("span");s.textContent=t;return s}));
document.title=data.heading.join(" ")+" — Elyas Al Shaebi";
const container=byId("work-items");
data.projects.forEach((key,i)=>{const p=projects[key],el=document.createElement("article");el.className="work-item";
const a=document.createElement("a");a.href=p.url;a.target="_blank";a.rel="noopener noreferrer";a.className="work-item-link";
const photo=document.createElement("div");photo.className="work-item-image";const img=document.createElement("img");img.src=p.image;img.alt="Portfolio artwork for "+p.name;img.loading="lazy";img.decoding="async";photo.append(img);
const copy=document.createElement("div");copy.className="work-item-text";const small=document.createElement("small");small.textContent=String(i+1).padStart(2,"0")+" / "+p.type;const h=document.createElement("h3");h.textContent=p.name;const para=document.createElement("p");para.textContent=p.desc;const link=document.createElement("span");link.textContent="Explore project ↗";copy.append(small,h,para,link);
a.append(photo,copy);el.append(a);container.append(el)});
byId("year").textContent=new Date().getFullYear();
try{byId("local-clock").textContent=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Aden",hour:"2-digit",minute:"2-digit"}).format(new Date())}catch(e){}
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
if("IntersectionObserver"in window&&!reduced){const io=new IntersectionObserver(entries=>entries.forEach(item=>{if(item.isIntersecting){item.target.classList.add("visible");io.unobserve(item.target)}}),{threshold:.09});document.querySelectorAll(".work-item").forEach(el=>io.observe(el))}
})();