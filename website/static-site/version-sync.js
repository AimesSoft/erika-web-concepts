(function () {
  "use strict";

  var releaseApi = "https://api.github.com/repos/AimesSoft/Erika/releases/latest";
  var changelogRaw = "https://raw.githubusercontent.com/AimesSoft/Erika/main/CHANGELOG.md";

  function clean(value) {
    return value
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseChangelog(markdown, version) {
    var normalized = version.replace(/^v/, "");
    var lines = markdown.replace(/\r\n/g, "\n").split("\n");
    var start = lines.findIndex(function (line) { return line.indexOf("## " + normalized) === 0; });
    var sections = [];
    var active = null;

    if (start < 0) return sections;

    for (var index = start + 1; index < lines.length; index += 1) {
      var line = lines[index];
      if (/^##\s+/.test(line)) break;

      var heading = line.match(/^###\s+(.+)/);
      if (heading) {
        active = { title: clean(heading[1]), items: [] };
        sections.push(active);
        continue;
      }

      var bullet = line.match(/^-\s+(.+)/);
      if (bullet && active) {
        active.items.push(clean(bullet[1]));
        continue;
      }

      var continuation = clean(line);
      if (continuation && active && active.items.length) {
        active.items[active.items.length - 1] += " " + continuation;
      }
    }

    return sections.filter(function (section) { return section.items.length; });
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (node) { node.textContent = value; });
  }

  function renderSections(sections) {
    var list = document.querySelector("[data-change-list]");
    if (!list || !sections.length) return;
    list.replaceChildren();

    sections.forEach(function (section, index) {
      var details = document.createElement("details");
      if (index === 0) details.open = true;

      var summary = document.createElement("summary");
      var number = document.createElement("span");
      var title = document.createElement("strong");
      var icon = document.createElement("i");
      number.textContent = String(index + 1).padStart(2, "0");
      title.textContent = section.title;
      icon.textContent = "＋";
      icon.setAttribute("aria-hidden", "true");
      summary.append(number, title, icon);

      var bullets = document.createElement("ul");
      section.items.forEach(function (item) {
        var bullet = document.createElement("li");
        bullet.textContent = item;
        bullets.appendChild(bullet);
      });

      details.append(summary, bullets);
      list.appendChild(details);
    });
  }

  Promise.all([
    fetch(releaseApi, { headers: { Accept: "application/vnd.github+json" }, cache: "default" }),
    fetch(changelogRaw, { cache: "default" })
  ]).then(function (responses) {
    if (!responses[0].ok || !responses[1].ok) throw new Error("GitHub unavailable");
    return Promise.all([responses[0].json(), responses[1].text()]);
  }).then(function (result) {
    var release = result[0];
    var markdown = result[1];
    var version = release.tag_name;
    var sections = parseChangelog(markdown, version);

    setText("[data-release-version]", version);
    setText("[data-release-date]", (release.published_at || "").slice(0, 10));
    setText("[data-release-assets]", String((release.assets || []).length));
    setText("[data-release-source]", "RELEASE");
    document.querySelectorAll("[data-release-url]").forEach(function (link) {
      link.setAttribute("href", release.html_url);
    });
    renderSections(sections);
  }).catch(function () {
    // The complete static snapshot remains visible when GitHub is unavailable.
  });
})();
