// Scroll-driven stories. Native wheel/touch remain untouched; only presentation transforms move.
const profile = document.querySelector('.profile');
const reel = profile?.querySelector('.profile-reel');
const stage = profile?.querySelector('.profile-stage');
const pages = [...(profile?.querySelectorAll('.profile-card') || [])];
const pageButtons = [...(profile?.querySelectorAll('[data-profile-jump]') || [])];
const process = document.querySelector('.process');
const pin = process?.querySelector('.process-pin');
const track = process?.querySelector('.work-track');
const prints = [...(process?.querySelectorAll('.work-print') || [])];
const controls = [...(process?.querySelectorAll('[data-work-dir]') || [])];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
let nav = 80, profileTravel = 1, workTravel = 1, distance = 0;
let profileMotion = false, workMotion = false, workIndex = 0, pageIndex = -1;
let raf = 0, lastTime = 0, lastX = 0, lastProgress = -1, settle = 0;
const swings = prints.map((_, i) => ({ angle: [-1.5, 1.3, -1, 1.6][i], speed: 0, rest: [-1.5, 1.3, -1, 1.6][i] }));

function schedule() { if (!raf) raf = requestAnimationFrame(render); }
function layout() {
  if (!profile || !process) return;
  nav = Math.ceil(document.querySelector('.hdr')?.getBoundingClientRect().height || 80);
  for (const el of [profile, process]) el.style.setProperty('--motion-nav', `${nav}px`);
  const vh = innerHeight;
  profileMotion = !reduced.matches && vh >= 520;
  profile.classList.toggle('motion-profile', profileMotion);
  if (profileMotion) {
    const h = Math.min(640, vh - nav - 32);
    const paper = Math.min(470, h - 94);
    profileTravel = Math.max(vh * 2, 1000);
    profile.style.setProperty('--profile-stage-height', `${h}px`);
    profile.style.setProperty('--profile-card-height', `${paper}px`);
    profile.style.setProperty('--profile-height', `${h + profileTravel}px`);
  } else {
    for (const page of pages) { page.style.removeProperty('transform'); page.style.removeProperty('opacity'); page.style.removeProperty('z-index'); }
  }
  // Measure the real header/footer and reserve space for the wire, peg and paper frame.
  process.classList.add('motion-work');
  const pinHeight = vh - nav;
  process.style.setProperty('--work-pin-height', `${pinHeight}px`);
  const head = process.querySelector('.process__head').offsetHeight;
  const foot = process.querySelector('.work-foot').offsetHeight;
  const paperHeight = Math.min(470, pinHeight - head - foot - 60);
  workMotion = !reduced.matches && paperHeight >= 260;
  process.classList.toggle('motion-work', workMotion);
  process.style.setProperty('--paper-height', `${workMotion ? paperHeight : 380}px`);
  if (workMotion) {
    distance = Math.max(0, track.offsetWidth - pin.clientWidth);
    workTravel = Math.max(distance * (innerWidth < 768 ? 1.1 : 1), vh * .85);
    process.style.setProperty('--work-height', `${pinHeight + workTravel}px`);
  } else {
    process.style.removeProperty('--work-height'); track.style.removeProperty('transform');
    for (const print of prints) print.style.removeProperty('transform');
  }
  process.querySelector('[data-work-hint]').textContent = workMotion ? 'مرّر لتنتقل بين الخطوات.' : 'اسحب البطاقات لتتابع المراحل.';
  lastX = NaN; lastProgress = -1; schedule();
}
function render(time) {
  raf = 0;
  const dt = Math.min(2.5, Math.max(.5, (time - (lastTime || time)) / 16.67)); lastTime = time;
  if (profileMotion) {
    const r = reel.getBoundingClientRect();
    const p = clamp((nav + 16 - r.top) / profileTravel);
    const phase = p * 3;
    profile.style.setProperty('--profile-p', p.toFixed(4));
    const active = Math.min(2, Math.floor(phase));
    if (active !== pageIndex) {
      pageIndex = active; profile.querySelector('[data-profile-count]').textContent = String(active + 1).padStart(2, '0');
      pageButtons.forEach((b, i) => i === active ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current'));
    }
    if (r.top < innerHeight && r.bottom > nav) pages.forEach((page, i) => {
      const currentPeel = active < 2 ? clamp((phase - active - .4) / .6) : 0;
      const peel = i < active ? 1 : i === active ? currentPeel : 0;
      const behind = Math.max(0, i - active - currentPeel);
      const x = -peel * stage.clientWidth * .85 + behind * 9;
      const y = -peel * 45 + behind * 12;
      const rotate = -peel * 24 + behind * 4.5;
      page.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rotate.toFixed(2)}deg)`;
      page.style.opacity = String(1 - clamp((peel - .6) / .4));
      page.style.zIndex = String(4 - i);
    });
  }
  if (workMotion) {
    const r = process.getBoundingClientRect();
    const p = clamp((nav - r.top) / workTravel);
    const x = p * distance;
    const velocity = Number.isFinite(lastX) ? (x - lastX) / dt : 0; lastX = x;
    track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    process.style.setProperty('--work-p', p.toFixed(4));
    workIndex = Math.min(3, Math.round(p * 3));
    process.querySelector('[data-work-count]').textContent = String(workIndex + 1).padStart(2, '0');
    controls[0].disabled = p < .005; controls[1].disabled = p > .995;
    if (Math.abs(p - lastProgress) > .00005) settle = 80;
    lastProgress = p;
    if (r.top < innerHeight && r.bottom > nav) prints.forEach((print, i) => {
      const s = swings[i], target = s.rest + clamp(velocity * .35, -9, 9);
      s.speed += (target - s.angle) * .065 * dt;
      s.speed *= Math.pow(.78, dt); s.angle += s.speed * dt;
      print.style.transform = `rotate(${clamp(s.angle, -11, 11).toFixed(2)}deg)`;
    });
    if (settle > 0 && r.top < innerHeight && r.bottom > nav) { settle--; schedule(); }
  }
}
function goTo(top) {
  if (window.__snapTo) window.__snapTo(top);
  else window.scrollTo({ top, behavior: reduced.matches ? 'auto' : 'smooth' });
}
for (const b of pageButtons) b.addEventListener('click', () => {
  const top = reel.getBoundingClientRect().top + scrollY - nav - 16;
  goTo(top + (+b.dataset.profileJump / 3) * profileTravel);
});
function workGo(dir) {
  if (!workMotion) return;
  const p = clamp((workIndex + dir) / 3);
  goTo(process.getBoundingClientRect().top + scrollY - nav + p * workTravel);
}
for (const b of controls) b.addEventListener('click', () => workGo(+b.dataset.workDir));
const line = process?.querySelector('.work-line');
line?.addEventListener('keydown', e => {
  if (!workMotion || e.target !== line || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  e.preventDefault(); workGo(e.key === 'ArrowLeft' ? 1 : -1);
});
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', layout, { passive: true });
reduced.addEventListener('change', layout);
document.fonts?.ready.then(layout);
layout();
