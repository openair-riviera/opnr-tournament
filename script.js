
const toggle = document.getElementById('menuToggle');
const mobile = document.getElementById('mobileMenu');
if (toggle) {
  toggle.addEventListener('click', () => mobile.classList.toggle('is-open'));
}
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobile.classList.remove('is-open'));
});

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('is-active'));
    document.querySelectorAll('.tab-panel').forEach(x => x.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById('tab-' + btn.dataset.tab)?.classList.add('is-active');
  });
});

document.querySelectorAll('.vis-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.vis-btn').forEach(x => x.classList.remove('is-active'));
    document.querySelectorAll('.vis-panel').forEach(x => x.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById('vis-' + btn.dataset.vis)?.classList.add('is-active');
  });
});

const counters = document.querySelectorAll('[data-count]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * progress);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
    observer.unobserve(el);
  });
}, {threshold: .7});
counters.forEach(c => observer.observe(c));
