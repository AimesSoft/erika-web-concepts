import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://erika.example${pathname}`, {
      headers: {
        accept: "text/html",
        host: "erika.example",
        "x-forwarded-host": "erika.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Erika official project site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /ERIKA/);
  assert.match(html, /让每一帧/);
  assert.match(html, /NipaPlay 自研/);
  assert.match(html, /硬解，不绕路/);
  assert.match(html, /VERSION INTEL/);
  assert.match(html, /版本情报/);
  assert.match(html, /更新日志/);
  assert.match(html, /\/api\/version/);
  assert.match(html, /https:\/\/github\.com\/AimesSoft\/Erika/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/);
});

test("exposes the latest release as structured JSON", async () => {
  const response = await render("/api/version");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/json\b/i);
  assert.match(response.headers.get("cache-control") ?? "", /s-maxage=1800/);

  const release = await response.json();
  assert.match(release.version, /^v\d+\.\d+\.\d+$/);
  assert.match(release.releasedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(Array.isArray(release.sections));
  assert.ok(release.sections.length > 0);
});

test("ships site-specific metadata, artwork, and source", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /让每一帧/);
  assert.match(page, /古戸ヱリカ/);
  assert.match(layout, /Erika — 让每一帧，抵达真相/);
  assert.match(layout, /\$\{origin\}\/og\.png/);
  assert.match(packageJson, /"name": "erika-project-site"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(readdir(new URL("../app/_sites-preview/", import.meta.url)));
});
