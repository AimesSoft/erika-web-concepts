(function registerReveal(app) {
app.initReveal = function initReveal(root = document) {
  const items = [...root.querySelectorAll('.reveal')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px' },
  );
  items.forEach((item) => observer.observe(item));
};
})(window.ErikaApp = window.ErikaApp || {});
