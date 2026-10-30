(function enhanceErikaDocs() {
  var pageLanguage = document.documentElement.lang === 'ja' ? 'ja' :
    document.documentElement.lang === 'en' ? 'en' : 'zh';
  try { localStorage.setItem('liberika-language', pageLanguage); } catch (error) { /* Storage is optional. */ }
  document.querySelectorAll('.language-switch select').forEach(function languageMenu(menu) {
    menu.addEventListener('change', function () {
      if (menu.value) window.location.href = menu.value + window.location.hash;
    });
  });
  var copyLabels = {
    zh: ['复制', '复制代码', '已复制', '复制失败'],
    en: ['Copy', 'Copy code', 'Copied', 'Copy failed'],
    ja: ['コピー', 'コードをコピー', 'コピーしました', 'コピーに失敗しました']
  }[pageLanguage];
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function fallbackCopy(resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        textarea.remove();
      }
    });
  }

  document.querySelectorAll('.code').forEach(function addCopyButton(block) {
    var pre = block.querySelector('pre');
    if (!pre || block.querySelector('.copy')) return;

    var button = document.createElement('button');
    button.className = 'copy';
    button.type = 'button';
    button.textContent = copyLabels[0];
    button.setAttribute('aria-label', copyLabels[1]);
    button.addEventListener('click', function handleCopy() {
      copyText(pre.innerText).then(function showSuccess() {
        button.textContent = copyLabels[2];
        window.setTimeout(function resetLabel() {
          button.textContent = copyLabels[0];
        }, 1500);
      }).catch(function showFailure() {
        button.textContent = copyLabels[3];
      });
    });
    block.appendChild(button);
  });
})();
