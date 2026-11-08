(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const scene = document.getElementById('art-scene');
  const art = document.querySelector('.hero-art');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

  // Read stored theme defensively: browser privacy modes can restrict storage.
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('elyas-theme'); } catch (_) { /* storage unavailable */ }
  function setTheme(value) {
    const theme = value === 'dark' ? 'dark' : 'light';
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن');
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#092d33' : '#F6EFE6';
    try { localStorage.setItem('elyas-theme', theme); } catch (_) { /* storage unavailable */ }
  }
  setTheme(savedTheme || 'light');
  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));

  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
    mobileNav.classList.toggle('open', open);
    mobileNav.inert = !open;
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });

  // Pointer movement only affects the artwork, not content or scroll behavior.
  if (scene && art && finePointer.matches && !reducedMotion.matches) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, frame = 0;
    const animate = () => {
      currentX += (targetX - currentX) * .085;
      currentY += (targetY - currentY) * .085;
      scene.style.setProperty('--ry', `${currentX.toFixed(3)}deg`);
      scene.style.setProperty('--rx', `${currentY.toFixed(3)}deg`);
      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > .02) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const tick = () => { if (!frame) frame = requestAnimationFrame(animate); };
    art.addEventListener('pointermove', event => {
      const r = art.getBoundingClientRect();
      targetX = ((event.clientX - r.left) / r.width - .5) * 8;
      targetY = -((event.clientY - r.top) / r.height - .5) * 5;
      tick();
    }, {passive:true});
    art.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; tick(); });
  }
  const revealItems = document.querySelectorAll('.reveal-on-scroll');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(node => node.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -20px 0px' });
    revealItems.forEach(node => observer.observe(node));
  }
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();