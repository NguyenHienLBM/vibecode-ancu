(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('header');
  const topButton = document.createElement('button');
  topButton.type = 'button';
  topButton.className = 'back-to-top';
  topButton.textContent = '↑';
  topButton.setAttribute('aria-label', 'Về đầu trang');
  topButton.hidden = true;
  document.body.append(topButton);
  let scheduled = false;
  function updateScrollState() {
    const show = window.scrollY > 500;
    // Giữ nút hiển thị khi còn focus để không làm mất vị trí bàn phím.
    topButton.hidden = !show && document.activeElement !== topButton;
    header?.classList.toggle('has-shadow', window.scrollY > 30);
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateScrollState); }
  }, { passive: true });
  topButton.addEventListener('blur', updateScrollState);
  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  });
  updateScrollState();
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-arrived');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('main section, .newsletter, .banner').forEach(section => observer.observe(section));
  }
})();
