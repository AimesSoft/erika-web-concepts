# Erika project site

Erika 项目官网。以“侦探、证据、真相”为视觉线索，介绍 Erika 的播放能力、跨平台支持、处理链路与接入方式。

官网是纯静态页面。浏览器会直接从 GitHub Release 与仓库 `CHANGELOG.md` 同步最新版本信息；GitHub 不可用时保留构建时快照，不依赖任何后端接口。

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Validation

```bash
npm test
```

## Static output

```bash
npm run build:static
```

可直接部署的 HTML、CSS、JavaScript 与图片会输出到 `static-site/`。该目录可直接放到 GitHub Pages、Nginx、对象存储或任意静态托管服务。
