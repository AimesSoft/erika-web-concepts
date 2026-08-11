(function startErika(app) {
  const root = document.querySelector('#app');
  if (!root) return;

  root.innerHTML = app.renderPage(app.siteContent);
  app.initTabs(root);
  app.initClipboard(root);
  app.initNavigation(root);
  app.initReveal(root);
  app.initCharacterMotion(root);
})(window.ErikaApp = window.ErikaApp || {});
