(()=>{"use strict";
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const intro=$("#intro");
let introFinished=false;
function finishIntro(){if(introFinished)return;introFinished=true;intro?.classList.add("done");document.body.classList.remove("locked");try{sessionStorage.setItem("elyas-intro-seen","yes")}catch(e){}}
if(intro){let seen=false;try{seen=sessionStorage.getItem("elyas-intro-seen")==="yes"}catch(e){}if(seen||reduced){intro.hidden=true;intro.style.display="none"}else{document.body.classList.add("locked");window.setTimeout(finishIntro,2150);$("#intro-skip")?.addEventListener("click",finishIntro)}}
const year=$("#year");if(year)year.textContent=String(new Date().getFullYear());
function showLocalTime(){const clock=$("#local-clock");if(!clock)return;try{clock.textContent=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Aden",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date())}catch(e){clock.textContent="GMT+3"}}
showLocalTime();window.setInterval(showLocalTime,60000);
const modeButton=$("#color-toggle");
try{if(localStorage.getItem("elyas-experience-theme")==="dark")document.body.dataset.mode="dark"}catch(e){}
function updateMode(){if(modeButton){const dark=document.body.dataset.mode==="dark";modeButton.setAttribute("aria-pressed",String(dark));modeButton.title=dark?"Switch to light":"Switch to dark"}}
updateMode();modeButton?.addEventListener("click",()=>{document.body.dataset.mode=document.body.dataset.mode==="dark"?"light":"dark";try{localStorage.setItem("elyas-experience-theme",document.body.dataset.mode)}catch(e){}updateMode()});
const menu=$("#menu-toggle"),mobile=$("#mobile-nav");
function closeMenu(){if(!menu||!mobile)return;menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open menu");menu.textContent="☰";mobile.classList.remove("open");mobile.inert=true}
menu?.addEventListener("click",()=>{if(menu.getAttribute("aria-expanded")==="true"){closeMenu()}else{menu.setAttribute("aria-expanded","true");menu.setAttribute("aria-label","Close menu");menu.textContent="✕";mobile.classList.add("open");mobile.inert=false}});
$$(".mobile-links a,.mobile-links button").forEach(a=>a.addEventListener("click",closeMenu));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
window.addEventListener("resize",()=>{if(window.innerWidth>760)closeMenu()},{passive:true});
const words=["matter.","work.","inspire.","last."],word=$("#word-loop");
if(word&&!reduced){let i=0;window.setInterval(()=>{if(document.hidden)return;word.classList.add("changing");window.setTimeout(()=>{i=(i+1)%words.length;word.textContent=words[i];word.classList.remove("changing")},250)},3200)}
const glow=$(".cursor-halo");
if(glow&&window.matchMedia("(pointer:fine)").matches&&!reduced){let fx=0,fy=0,queued=false;document.addEventListener("pointermove",e=>{fx=e.clientX;fy=e.clientY;if(queued)return;queued=true;requestAnimationFrame(()=>{glow.style.left=fx+"px";glow.style.top=fy+"px";queued=false})},{passive:true})}
const hall=$("#hallway");$("#door-prev")?.addEventListener("click",()=>hall?.scrollBy({left:-350,behavior:reduced?"instant":"smooth"}));$("#door-next")?.addEventListener("click",()=>hall?.scrollBy({left:350,behavior:reduced?"instant":"smooth"}));
if(hall){let active=false,start=0,left=0,dragged=false;
hall.addEventListener("pointerdown",e=>{if(e.pointerType==="touch"||e.button!==0)return;active=true;dragged=false;start=e.clientX;left=hall.scrollLeft});
hall.addEventListener("pointermove",e=>{if(!active)return;const dx=e.clientX-start;if(Math.abs(dx)>5){dragged=true;hall.classList.add("dragging");hall.scrollLeft=left-dx}});
function endDrag(){active=false;hall.classList.remove("dragging")}
hall.addEventListener("pointerup",endDrag);hall.addEventListener("pointercancel",endDrag);hall.addEventListener("pointerleave",endDrag);
hall.addEventListener("click",e=>{if(dragged){e.preventDefault();e.stopPropagation();dragged=false}},true);
hall.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();hall.scrollBy({left:e.key==="ArrowRight"?260:-260,behavior:"smooth"})}})}
const chapters=[
{stamp:"NOW / SOFTWARE ENGINEERING",title:"Working independently. Building with purpose.",desc:"I build web platforms and mobile applications, combining engineering and product thinking from the first idea to launch.",tags:["Full-stack","Mobile","Product delivery"],image:"assets/hero-portrait.webp"},
{stamp:"SELECTED WORK / EDUCATION",title:"Helping students grow with Himma.",desc:"Developing a learning platform that brings lessons, practice and assessment together in a more engaging digital experience.",tags:["Learning platform","Interactive content","Accessibility"],image:"assets/featured-himma.webp"},
{stamp:"SELECTED WORK / DIGITAL PRODUCTS",title:"Real products for real businesses.",desc:"From Update Card to Wasl Tech and healthcare websites, I focus on practical software that solves an actual need.",tags:["Web products","Businesses","Experience"],image:"assets/project-wasl.webp"},
{stamp:"FOUNDATIONS / COMPUTER SCIENCE",title:"Engineering first. Always learning.",desc:"My computer science foundation shapes how I approach software architecture, databases, interfaces and reliable systems.",tags:["Computer science","System design","Continuous learning"],image:"assets/about-brand.webp"}
];
const chapterButtons=$$("[data-chapter]"),panel=$(".chapter-display");
function setChapter(i){const info=chapters[i];if(!info)return;chapterButtons.forEach((b,j)=>{b.classList.toggle("active",i===j);b.setAttribute("aria-pressed",String(i===j))});$("#chapter-num").textContent=String(i+1).padStart(2,"0");$("#chapter-caption").textContent=info.stamp;$("#chapter-title").textContent=info.title;$("#chapter-text").textContent=info.desc;const img=$("#chapter-photo");img.src=info.image;img.alt=info.title;$("#chapter-tags").replaceChildren(...info.tags.map(t=>{const s=document.createElement("span");s.textContent=t;return s}));panel.classList.remove("entering");void panel.offsetWidth;panel.classList.add("entering")}
chapterButtons.forEach(b=>b.addEventListener("click",()=>setChapter(Number(b.dataset.chapter))));
const card=$("#ability-card");
if(card){card.addEventListener("click",()=>{card.classList.toggle("flipped");card.setAttribute("aria-pressed",String(card.classList.contains("flipped")))});
if(!reduced&&window.matchMedia("(hover:hover) and (pointer:fine)").matches){
card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform="rotateY("+ (x*12).toFixed(2)+"deg) rotateX("+(-y*12).toFixed(2)+"deg)"});
card.addEventListener("pointerleave",()=>{card.style.transform=""})}}
if("IntersectionObserver"in window&&!reduced){$$(".doors-heading,.project-header,.project,.story> .wrap >h2,.ability-text,.contact-inner").forEach(el=>el.dataset.reveal="");const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("show");observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:"0px 0px -50px 0px"});$$("[data-reveal]").forEach(el=>observer.observe(el))}
const dialog=$("#contact-dialog"),form=$("#wizard-form"),pages=$$(".wizard-page"),back=$("#wizard-back"),next=$("#wizard-next"),err=$("#wizard-error"),progress=$("#wizard-progress"),indicator=$("#step-indicator");
let step=0;
function setStep(n){step=Math.max(0,Math.min(pages.length-1,n));pages.forEach((p,i)=>p.classList.toggle("active",i===step));back.hidden=step===0;next.textContent=step===pages.length-1?"Write the email ↗":"Continue →";progress.style.width=((step+1)/pages.length*100)+"%";indicator.textContent="QUESTION "+String(step+1).padStart(2,"0")+" / 05";err.textContent="";$(".wizard-content")?.scrollTo({top:0,behavior:"instant"})}
function openContact(){if(!dialog)return;closeMenu();step=0;form?.reset();setStep(0);if(!dialog.open){dialog.showModal()}document.body.classList.add("locked")}
function closeContact(){if(dialog?.open)dialog.close();document.body.classList.remove("locked")}
$$("[data-contact]").forEach(b=>b.addEventListener("click",openContact));$("#wizard-close")?.addEventListener("click",closeContact);dialog?.addEventListener("click",e=>{if(e.target===dialog)closeContact()});dialog?.addEventListener("close",()=>document.body.classList.remove("locked"));
back?.addEventListener("click",()=>setStep(step-1));
next?.addEventListener("click",()=>{if(!form)return;if(step<3){const field=["service","stage","timeline"][step];if(!form.elements[field].value){err.textContent="Please choose one option to continue.";return}setStep(step+1);return}if(step===3){setStep(4);return}
const name=String(form.elements.name.value||"").trim(),email=String(form.elements.email.value||"").trim();if(!name){err.textContent="Please add your name.";form.elements.name.focus();return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){err.textContent="Please enter a valid email address.";form.elements.email.focus();return}
const value=n=>String(form.elements[n]?.value||"").trim();const subject="Project enquiry — "+value("service");const body="Hi Elyas,\n\nI'd like to discuss a project.\n\nName: "+name+"\nEmail: "+email+"\nCompany / website: "+(value("company")||"—")+"\nProject type: "+value("service")+"\nStage: "+value("stage")+"\nStart: "+value("timeline")+"\n\nAbout the project:\n"+(value("message")||"To be discussed")+"\n\nThank you!";
const mailto="mailto:em775377979@gmail.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);window.location.href=mailto;err.textContent="Your email draft is ready. Press Send in your email app. If it didn't open, contact me on WhatsApp.";err.style.color="var(--petrol)"});
form?.addEventListener("submit",e=>e.preventDefault());
})();