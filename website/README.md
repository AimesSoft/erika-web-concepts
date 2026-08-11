# Erika project site

Erika 项目官网。以“侦探、证据、真相”为视觉线索，介绍 Erika 的播放能力、跨平台支持、处理链路与接入方式。

官网会从 GitHub Release 与仓库 `CHANGELOG.md` 自动同步最新版本信息。结构化数据可通过 `GET /api/version` 获取。

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

The production build is emitted by vinext for Cloudflare-compatible hosting.
