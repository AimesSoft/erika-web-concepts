(function startErika(app) {
  const root = document.querySelector('#app');
  if (!root) return;

  app.language = app.getLanguage();
  const content = app.localizeContent(app.siteContent, app.language);
  app.ui = content.ui;
  document.documentElement.lang = { zh: 'zh-CN', en: 'en', ja: 'ja' }[app.language];
  document.title = app.ui.title;
  document.querySelector('meta[name="description"]').content = app.ui.description;
  document.querySelector('.skip-link').textContent = app.ui.skip;
  root.innerHTML = app.renderPage(content);
  root.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.language === app.language) return;
    try { localStorage.setItem('liberika-language', button.dataset.language); } catch { /* Storage may be unavailable. */ }
    window.location.reload();
  }));
  app.initTabs(root);
  app.initClipboard(root);
  app.initNavigation(root);
  app.initReveal(root);
  app.initCharacterMotion(root);
})(window.ErikaApp = window.ErikaApp || {});
