(function registerNavigation(app) {
const { icon } = app;

app.initNavigation = function initNavigation(root = document) {
  const header = root.querySelector('[data-header]');
  const toggle = root.querySelector('[data-nav-toggle]');
  const nav = root.querySelector('[data-nav]');
  if (!header || !toggle || !nav) return;

  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    toggle.innerHTML = icon(open ? 'close' : 'menu');
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });
};
})(window.ErikaApp = window.ErikaApp || {});
