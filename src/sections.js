import { clamp01 as clamp, workflowProgress, followPosition, layoutChanged } from './section-motion-model.mjs';
const profile = document.querySelector('.profile'), process = document.querySelector('.process');
const reel = profile.querySelector('.profile-reel'), stage = profile.querySelector('.profile-stage');
const pages = [...profile.querySelectorAll('.profile-card')], pageButtons = [...profile.querySelectorAll('[data-profile-jump]')];
const profileCount = profile.querySelector('[data-profile-count]'), orbit = profile.querySelector('.profile-orbit__draw');
const pin = process.querySelector('.process-pin'), track = process.querySelector('.work-track');
const prints = [...process.querySelectorAll('.work-print')], controls = [...process.querySelectorAll('[data-work-dir]')];
const workCount = process.querySelector('[data-work-count]'), bar = process.querySelector('.work-progress i');
const head = process.querySelector('.process__head'), foot = process.querySelector('.work-foot'), hint = process.querySelector('[data-work-hint]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)'), phone = matchMedia('(max-width:767.98px), (pointer:coarse)');
// Small viewport units stay fixed while Safari hides/shows its address bar.
const viewport = document.createElement('div');
viewport.setAttribute('aria-hidden', 'true'); viewport.className = 'motion-viewport'; document.body.append(viewport);
let nav = 80, viewHeight = 0, profileTravel = 1, workTravel = 1, distance = 0;
let profileMotion = false, workMotion = false, workIndex = -1, pageIndex = -1;
let geometry = {}, lastLayout = null, layoutFrame = 0, forceLayout = false;
let raf = 0, lastTime = 0, workX = NaN, previousX = NaN, lastProfileP = NaN;
const rests = [-1.5, 1.3, -1, 1.6];
const swings = prints.map((_, i) => ({ angle: rests[i], speed: 0 }));
function setStyle(el, property, value) { if (el.style.getPropertyValue(property) !== value) el.style.setProperty(property, value); }
function toggle(el, name, on) { if (el.classList.contains(name) !== on) el.classList.toggle(name, on); }
function schedule() { if (!raf) raf = requestAnimationFrame(render); }
function queueLayout(force = false) {
  forceLayout ||= force;
  if (!layoutFrame) layoutFrame = requestAnimationFrame(() => { layoutFrame = 0; const f = forceLayout; forceLayout = false; layout(f); });
}
function layout(force = false) {
  const next = { width: innerWidth, height: viewport.clientHeight || innerHeight,
    nav: Math.ceil(document.querySelector('.hdr')?.offsetHeight || 80), head: head.offsetHeight, foot: foot.offsetHeight };
  if (!force && !layoutChanged(lastLayout, next)) return;
  nav = next.nav; viewHeight = next.height;
  setStyle(profile, '--motion-nav', `${nav}px`); setStyle(process, '--motion-nav', `${nav}px`);
  profileMotion = !reduced.matches && viewHeight >= 520;
  toggle(profile, 'motion-profile', profileMotion);
  if (profileMotion) {
    const h = Math.min(640, viewHeight - nav - 32);
    profileTravel = Math.max(viewHeight * 2, 1000);
    setStyle(profile, '--profile-stage-height', `${h}px`);
    setStyle(profile, '--profile-card-height', `${Math.min(470, h - 94)}px`);
    setStyle(profile, '--profile-height', `${h + profileTravel}px`);
  } else for (const page of pages) for (const key of ['transform','opacity','z-index']) page.style.removeProperty(key);
  const pinHeight = viewHeight - nav;
  setStyle(process, '--work-pin-height', `${pinHeight}px`);
  let paperHeight = Math.min(470, pinHeight - next.head - Math.max(66, next.foot) - 60);
  workMotion = !reduced.matches && paperHeight >= 260;
  toggle(process, 'motion-work', workMotion);
  // Controls can change footer height once at setup, never in the animation frame.
  paperHeight = Math.min(470, pinHeight - head.offsetHeight - foot.offsetHeight - 60);
  if (workMotion && paperHeight < 260) { workMotion = false; toggle(process, 'motion-work', false); }
  setStyle(process, '--paper-height', `${workMotion ? paperHeight : 380}px`);
  if (workMotion) {
    distance = Math.max(0, track.offsetWidth - pin.clientWidth);
    workTravel = Math.max(distance * (phone.matches ? 1.1 : 1), viewHeight * .85);
    setStyle(process, '--work-height', `${pinHeight + workTravel}px`);
    prints.forEach((print, i) => { swings[i].angle = rests[i]; swings[i].speed = 0; setStyle(print, 'transform', `rotate(${rests[i]}deg)`); });
  } else {
    process.style.removeProperty('--work-height'); track.style.removeProperty('transform');
    for (const print of prints) print.style.removeProperty('transform');
  }
  const text = workMotion ? 'مرّر لتنتقل بين الخطوات.' : 'اسحب البطاقات لتتابع المراحل.';
  if (hint.textContent !== text) hint.textContent = text;
  // All geometry reads are batched in layout; render only uses cached numbers.
  const y = scrollY;
  geometry = { reelTop: reel.getBoundingClientRect().top + y, reelHeight: reel.offsetHeight,
    stageWidth: stage.clientWidth, workTop: process.getBoundingClientRect().top + y, workHeight: process.offsetHeight };
  lastLayout = { ...next, head: head.offsetHeight, foot: foot.offsetHeight };
  workX = previousX = lastProfileP = NaN; lastTime = 0;
  schedule();
}
function render(time) {
  raf = 0;
  const y = scrollY, dt = lastTime ? Math.min(48, time - lastTime) : 16.67; lastTime = time;
  const profileVisible = y + viewHeight > geometry.reelTop && y + nav < geometry.reelTop + geometry.reelHeight;
  if (profileMotion && profileVisible) {
    const p = clamp((y + nav + 16 - geometry.reelTop) / profileTravel);
    if (!Number.isFinite(lastProfileP) || Math.abs(p - lastProfileP) > .00002) {
      lastProfileP = p;
      const phase = p * 3, active = Math.min(2, Math.floor(phase));
      setStyle(orbit, 'stroke-dashoffset', String(1445 * (1 - p)));
      if (active !== pageIndex) {
        pageIndex = active; profileCount.textContent = String(active + 1).padStart(2, '0');
        pageButtons.forEach((b, i) => i === active ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current'));
      }
      const currentPeel = active < 2 ? clamp((phase - active - .4) / .6) : 0;
      pages.forEach((page, i) => {
        const peel = i < active ? 1 : i === active ? currentPeel : 0, behind = Math.max(0, i - active - currentPeel);
        const x = -peel * geometry.stageWidth * .85 + behind * 9, yy = -peel * 45 + behind * 12;
        setStyle(page, 'transform', `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${yy.toFixed(1)}px,0) rotate(${(-peel * 24 + behind * 4.5).toFixed(2)}deg)`);
        setStyle(page, 'opacity', String(1 - clamp((peel - .6) / .4))); setStyle(page, 'z-index', String(4 - i));
      });
    }
  }
  const visible = y + viewHeight > geometry.workTop && y + nav < geometry.workTop + geometry.workHeight;
  if (!workMotion || !visible) { workX = previousX = NaN; return; }
  const p = workflowProgress(y, geometry.workTop, nav, workTravel), target = p * distance;
  workX = followPosition(workX, target, dt, phone.matches ? 45 : 32);
  const velocity = Number.isFinite(previousX) ? (workX - previousX) / Math.max(.5, dt / 16.67) : 0; previousX = workX;
  setStyle(track, 'transform', `translate3d(${workX.toFixed(2)}px,0,0)`);
  setStyle(bar, 'transform', `scaleX(${distance ? (workX / distance).toFixed(4) : 1})`);
  const index = Math.min(3, Math.round(p * 3));
  if (index !== workIndex) { workIndex = index; workCount.textContent = String(index + 1).padStart(2, '0'); }
  const atStart = p < .005, atEnd = p > .995;
  if (controls[0].disabled !== atStart) controls[0].disabled = atStart;
  if (controls[1].disabled !== atEnd) controls[1].disabled = atEnd;
  let settling = Math.abs(workX - target) > .08;
  // Phone papers keep their hanging angle; only one track layer moves while swiping.
  if (!phone.matches) prints.forEach((print, i) => {
    const s = swings[i], step = Math.max(.5, dt / 16.67), aim = rests[i] + Math.max(-9, Math.min(9, velocity * .35));
    s.speed += (aim - s.angle) * .065 * step; s.speed *= Math.pow(.78, step); s.angle += s.speed * step;
    setStyle(print, 'transform', `rotate(${Math.max(-11, Math.min(11, s.angle)).toFixed(2)}deg)`);
    settling ||= Math.abs(s.speed) > .004 || Math.abs(s.angle - rests[i]) > .01;
  });
  if (settling) schedule();
}
function goTo(top) {
  if (window.__snapTo) window.__snapTo(top);
  else window.scrollTo({ top, behavior: reduced.matches ? 'auto' : 'smooth' });
}
for (const b of pageButtons) b.addEventListener('click', () => goTo(geometry.reelTop - nav - 16 + (+b.dataset.profileJump / 3) * profileTravel));
function workGo(dir) { if (workMotion) goTo(geometry.workTop - nav + clamp((workIndex + dir) / 3) * workTravel); }
for (const b of controls) b.addEventListener('click', () => workGo(+b.dataset.workDir));
process.querySelector('.work-line').addEventListener('keydown', e => {
  if (!workMotion || e.target !== e.currentTarget || !['ArrowLeft','ArrowRight'].includes(e.key)) return;
  e.preventDefault(); workGo(e.key === 'ArrowLeft' ? 1 : -1);
});
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', () => queueLayout(), { passive: true });
reduced.addEventListener('change', () => queueLayout(true)); phone.addEventListener('change', () => queueLayout(true));
document.fonts?.ready.then(() => queueLayout(true));
addEventListener('load', () => queueLayout(true), { once: true });
layout(true);
