(function registerTemplates(app) {
const { icon } = app;

const escapeHTML = (value = '') =>
  String(value).replace(
    /[&<>'"]/g,
    (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character],
  );

const sectionHeading = ({ eyebrow, title, lead }) => `
  <header class="section-heading reveal">
    <p class="section-eyebrow">${escapeHTML(eyebrow)}</p>
    <div class="section-title-row">
      <h2>${escapeHTML(title)}</h2>
      <span class="title-dots" aria-hidden="true"></span>
    </div>
    <p>${escapeHTML(lead)}</p>
  </header>`;

function renderHeader(content) {
  const { brand, navigation } = content;
  return `
    <header class="site-header" data-header>
      <div class="shell header-inner">
        <a class="brand" href="#top" aria-label="Erika 首页">
          <img class="brand-mark" src="assets/images/favicon.svg" alt="" width="64" height="64">
          <span class="brand-name">${escapeHTML(brand.name)}</span>
          <span class="brand-kana">${escapeHTML(brand.kana)}</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="打开菜单" aria-expanded="false" data-nav-toggle>
          ${icon('menu')}
        </button>
        <nav class="site-nav" aria-label="主导航" data-nav>
          ${navigation.map(({ label, href }) => `<a href="${href}">${escapeHTML(label)}</a>`).join('')}
          <a class="nav-repo" href="${brand.repoUrl}" target="_blank" rel="noreferrer">${icon('github')} GitHub</a>
        </nav>
      </div>
    </header>`;
}

function renderHero({ brand, hero }) {
  return `
    <section class="hero shell" id="top" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="hero-eyebrow reveal">${escapeHTML(hero.eyebrow)}</p>
        <h1 id="hero-title" class="reveal">
          <span>${escapeHTML(hero.titleLead)}</span>
          <em>${escapeHTML(hero.titleAccent)}</em>
        </h1>
        <p class="hero-description reveal">${escapeHTML(hero.description)}</p>
        <div class="hero-actions reveal">
          <a class="button button-primary" href="${hero.primaryAction.href}">${escapeHTML(hero.primaryAction.label)} ${icon('arrow')}</a>
          <a class="button button-ghost" href="${hero.secondaryAction.href}">${escapeHTML(hero.secondaryAction.label)}</a>
        </div>
        <dl class="hero-facts reveal">
          ${hero.facts.map(({ value, label }) => `<div><dt>${escapeHTML(value)}</dt><dd>${escapeHTML(label)}</dd></div>`).join('')}
        </dl>
      </div>
      <div class="hero-art reveal" data-character-stage>
        <div class="hero-dots dots-pink" aria-hidden="true"></div>
        <div class="hero-dots dots-blue" aria-hidden="true"></div>
        <span class="art-label art-label-top">${escapeHTML(brand.descriptor)}</span>
        <span class="art-label art-label-side">Detective of playback</span>
        <img src="${hero.characterImage}" alt="${escapeHTML(hero.characterAlt)}" width="1120" height="1405" data-character>
        <p class="character-note">${escapeHTML(hero.sideNote)}</p>
        <span class="version-sticker">${escapeHTML(brand.version)}<small>CASE CLOSED?</small></span>
      </div>
    </section>`;
}

function renderFeatures(features) {
  return `
    <section class="section shell" id="features">
      ${sectionHeading(features)}
      <div class="feature-grid">
        ${features.items.map((item) => `
          <article class="feature-card reveal">
            <div class="feature-top"><span>${escapeHTML(item.number)}</span>${icon(item.icon)}</div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.text)}</p>
            <ul aria-label="相关技术">${item.tags.map((tag) => `<li>${escapeHTML(tag)}</li>`).join('')}</ul>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderQuickStart(quickStart) {
  return `
    <section class="section shell" id="start">
      ${sectionHeading(quickStart)}
      <div class="code-case reveal" data-tabs>
        <div class="code-tabs" role="tablist" aria-label="接入方式">
          ${quickStart.tabs.map((tab, index) => `
            <button type="button" role="tab" id="tab-${tab.id}" aria-controls="panel-${tab.id}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-tab="${tab.id}">${escapeHTML(tab.label)}</button>`).join('')}
        </div>
        ${quickStart.tabs.map((tab, index) => `
          <section class="code-panel" role="tabpanel" id="panel-${tab.id}" aria-labelledby="tab-${tab.id}" ${index === 0 ? '' : 'hidden'} data-panel="${tab.id}">
            <div class="code-toolbar">
              <span><i></i><i></i><i></i></span>
              <b>${escapeHTML(tab.language)}</b>
              <button type="button" data-copy aria-label="复制 ${escapeHTML(tab.label)} 代码">${icon('copy')}<span>复制</span></button>
            </div>
            <pre><code>${escapeHTML(tab.code)}</code></pre>
            <p class="code-note"><span>NOTE</span>${escapeHTML(tab.note)}</p>
          </section>`).join('')}
      </div>
    </section>`;
}

function renderPlatforms(platforms) {
  return `
    <section class="section shell" id="platforms">
      ${sectionHeading(platforms)}
      <div class="platform-list reveal">
        <div class="platform-row platform-head" aria-hidden="true">
          <span>Platform</span><span>Minimum</span><span>Renderer</span><span>Decoder</span><span>Status</span>
        </div>
        ${platforms.items.map((item) => `
          <article class="platform-row">
            <h3>${escapeHTML(item.name)}</h3>
            <span>${escapeHTML(item.minimum)}</span>
            <code>${escapeHTML(item.render)}</code>
            <code>${escapeHTML(item.decode)}</code>
            <span class="status ${item.status}"><i></i>${item.status === 'ready' ? '可用' : '规划中'}</span>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderDocs(docs) {
  return `
    <section class="section shell" id="docs">
      ${sectionHeading(docs)}
      <div class="docs-grid">
        ${docs.groups.map((group) => `
          <article class="doc-card reveal">
            <header><span>${escapeHTML(group.number)}</span><div><p>${escapeHTML(group.english)}</p><h3>${escapeHTML(group.title)}</h3></div></header>
            <ul>${group.links.map(([label, href]) => `<li><a href="${href}"><span>${escapeHTML(label)}</span>${icon('arrow')}</a></li>`).join('')}</ul>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderClosing(content) {
  const { brand, closing } = content;
  return `
    <section class="closing shell reveal" aria-labelledby="closing-title">
      <div class="closing-dots" aria-hidden="true"></div>
      <p class="closing-label">${escapeHTML(closing.label)}</p>
      <blockquote id="closing-title">
        <p>${escapeHTML(closing.quote)}</p>
        <footer>${escapeHTML(closing.reply)}</footer>
      </blockquote>
      <p class="closing-note">${escapeHTML(closing.note)}</p>
    </section>
    <footer class="site-footer">
      <div class="shell footer-inner">
        <a class="brand footer-brand" href="#top"><img class="brand-mark" src="assets/images/favicon.svg" alt="" width="64" height="64"><span class="brand-name">${escapeHTML(brand.name)}</span></a>
        <p>${escapeHTML(brand.descriptor)} · ${escapeHTML(brand.version)} · MPL-2.0</p>
        <a href="${brand.repoUrl}" target="_blank" rel="noreferrer">GitHub ${icon('arrow')}</a>
      </div>
    </footer>`;
}

app.renderPage = function renderPage(content) {
  return `${renderHeader(content)}<main id="main">${renderHero(content)}${renderFeatures(content.features)}${renderQuickStart(content.quickStart)}${renderPlatforms(content.platforms)}${renderDocs(content.docs)}${renderClosing(content)}</main>`;
};
})(window.ErikaApp = window.ErikaApp || {});
