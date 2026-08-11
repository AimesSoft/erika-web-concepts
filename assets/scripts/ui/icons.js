(function registerIcons(app) {
const paths = {
  arrow: '<path d="M5 12h13M14 7l5 5-5 5"/>',
  copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 3 5 5 0 0 0 19.1.1S18 0 15 1.7a15.4 15.4 0 0 0-8 0C4-.1 2.9.1 2.9.1A5 5 0 0 0 2.7 3a5.5 5.5 0 0 0-1.5 4.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 7 18v4"/><path d="M7 19c-3 .9-3-1.5-4-2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  frame: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8v6H8z"/>',
  spark: '<path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/>',
  subtitle: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h4M13 15h4M8 11h8"/>',
};

app.icon = function icon(name, className = '') {
  const path = paths[name] ?? paths.arrow;
  return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
};
})(window.ErikaApp = window.ErikaApp || {});
