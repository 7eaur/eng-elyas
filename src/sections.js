// Small, one-time reveals; content stays readable without JavaScript or animation.
const items = document.querySelectorAll('[data-section-reveal]');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: .12 });
  for (const item of items) { item.classList.add('section-reveal'); observer.observe(item); }
}
