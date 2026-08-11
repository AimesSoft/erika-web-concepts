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
  assert.match(html, /version-sync\.js/);
  assert.match(html, /api\.github\.com\/repos\/AimesSoft\/Erika\/releases\/latest/);
  assert.doesNotMatch(html, /\/api\/version/);
  assert.match(html, /https:\/\/github\.com\/AimesSoft\/Erika/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/);
});

test("exports a backend-free static site", async () => {
  const staticHtml = await readFile(new URL("../static-site/index.html", import.meta.url), "utf8");
  assert.match(staticHtml, /<html lang="zh-CN">/);
  assert.match(staticHtml, /VERSION INTEL/);
  assert.match(staticHtml, /<script src="\.\/version-sync\.js" defer><\/script>/);
  assert.match(staticHtml, /href="\.\/_next\/static\/css\//);
  assert.doesNotMatch(staticHtml, /<script[^>]+\/_next\//);
  assert.doesNotMatch(staticHtml, /signin-with-chatgpt|oai-authenticated-user|\/api\/version/);

  await Promise.all([
    access(new URL("../static-site/og.png", import.meta.url)),
    access(new URL("../static-site/version-sync.js", import.meta.url)),
    access(new URL("../static-site/.nojekyll", import.meta.url)),
  ]);
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
  assert.match(layout, /version-sync\.js/);
  assert.doesNotMatch(layout, /headers\(\)|generateMetadata/);
  assert.match(packageJson, /"name": "erika-project-site"/);
  assert.match(packageJson, /"build:static"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(readdir(new URL("../app/_sites-preview/", import.meta.url)));
});
