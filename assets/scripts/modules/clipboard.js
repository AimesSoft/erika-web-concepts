(function registerClipboard(app) {
const { icon } = app;

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

app.initClipboard = function initClipboard(root = document) {
  root.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-panel')?.querySelector('code')?.textContent;
      if (!code) return;
      try {
        await copyText(code);
        button.innerHTML = `${icon('check')}<span>已复制</span>`;
        button.classList.add('copied');
        window.setTimeout(() => {
          button.innerHTML = `${icon('copy')}<span>复制</span>`;
          button.classList.remove('copied');
        }, 1600);
      } catch {
        button.querySelector('span').textContent = '复制失败';
      }
    });
  });
};
})(window.ErikaApp = window.ErikaApp || {});
