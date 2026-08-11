(function registerTabs(app) {
app.initTabs = function initTabs(root = document) {
  root.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
    const tabs = [...tabGroup.querySelectorAll('[role="tab"]')];
    const panels = [...tabGroup.querySelectorAll('[role="tabpanel"]')];

    const activate = (tab, focus = false) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== tab.dataset.tab;
      });
      if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        activate(tabs[next], true);
      });
    });
  });
};
})(window.ErikaApp = window.ErikaApp || {});
