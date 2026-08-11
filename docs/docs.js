(function enhanceErikaDocs() {
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
    button.textContent = '复制';
    button.setAttribute('aria-label', '复制代码');
    button.addEventListener('click', function handleCopy() {
      copyText(pre.innerText).then(function showSuccess() {
        button.textContent = '已复制';
        window.setTimeout(function resetLabel() {
          button.textContent = '复制';
        }, 1500);
      }).catch(function showFailure() {
        button.textContent = '复制失败';
      });
    });
    block.appendChild(button);
  });
})();
