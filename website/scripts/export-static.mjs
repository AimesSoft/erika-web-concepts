import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../static-site/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", Date.now().toString());

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://erika-static.local/", { headers: { accept: "text/html" } }),
  {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}`);
}

let html = await response.text();
html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "")
  .replace(/\sdata-(?:rsc-css-href|precedence)=["'][^"']*["']/gi, "")
  .replace(/(["'])\/_next/g, "$1./_next")
  .replace(/(["'])\/og\.png/g, "$1./og.png")
  .replace("</body>", '<script src="./version-sync.js" defer></script></body>');

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(
  new URL("../dist/client/_next/static/css/", import.meta.url),
  new URL("_next/static/css/", outputRoot),
  { recursive: true },
);
await cp(new URL("../public/og.png", import.meta.url), new URL("og.png", outputRoot));
await cp(new URL("../public/version-sync.js", import.meta.url), new URL("version-sync.js", outputRoot));
await writeFile(new URL("index.html", outputRoot), html, "utf8");
await writeFile(new URL(".nojekyll", outputRoot), "", "utf8");

console.log("Static site exported to static-site/");
