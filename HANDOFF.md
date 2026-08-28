# Erika 文档站 交接说明

写给接手维护正文的人。本文件只陈述事实与已核实的数据（最近一次核实：
2026-08-28），不含风格建议。

## 1. 这是什么

`~/Desktop/erika-web-concepts/` 是 Erika 播放内核的**文档站**，与 Erika 仓库
（`~/Desktop/Erika/`）分离。

**它是 git 仓库**（2026-08-11 初始化），远端
`https://github.com/AimesSoft/erika-web-concepts.git`，工作流为直接提交
`main` 并 push，无 PR 环节。改完正文后必须 commit + push，只改磁盘文件
不算发布。

| 路径 | 内容 |
|---|---|
| `index.html`（根） | 独立 landing 页，用自己的 `assets/styles/main.css`，与 `docs/` 无导航关系 |
| `docs/index.html` | 文档区入口，侧栏导航进全部 22 个正文页 |
| `docs/guide/` | 接入指南 6 页：quickstart / flutter / swift / c / rust / openharmony |
| `docs/kernel/` | 内核设计 8 页：architecture / decode / render / hdr / clock / upscale / zero-copy / subtitle-danmaku |
| `docs/reference/` | C ABI 参考 4 页：capi / capi-presenter / capi-handle / capi-json |
| `docs/project/` | 项目文档 4 页：building / releasing / contributing / changelog |
| `docs/docs.css` | 唯一样式表（1135 行） |
| `docs/docs.js` | 代码块一键复制等增强（46 行） |
| `06-washi-home.html` | 旧版原型主页残留：现已无任何出链，仅被 `docs/index.html` 引用，可视为待清理项 |

## 2. 生成器已删除（旧警告作废）

最早版本曾有 21 个 `_build_*.py` 页面生成器与 `_check_links.py`，因内容
过期且未回写，在初始提交前已全部删除，git 历史中无痕迹。**现行维护方式：
直接手改 HTML，commit 后 push。** 没有任何"跑脚本会覆盖正文"的风险。

链接校验脚本也没有了。需要校验时临时写一段解析器：遍历 `href`，检查
同页锚点与相对路径目标是否存在即可（2026-08-28 全站 23 页校验通过）。

## 3. 设计系统

`docs/docs.css` 是唯一需要保留的资产，正文只使用它已有的类名，不要新增
CSS。交互增强统一走 `docs/docs.js`（代码块复制按钮等）。

## 4. 内容基线

- 正文已与 Erika 仓库 v0.1.7 的真实 API 对齐（见 git 历史
  "align … with authentic v0.1.7 APIs" 等提交）。
- 2026-08-28 补入 #124（透明视频与跨平台 GPU 合成）的文档：
  `guide/flutter.html` 新增 `ErikaTextureVideoView` 与混合模式支持矩阵，
  `reference/capi-presenter.html` 新增 4 个 C 入口，`project/changelog.html`
  新增 Unreleased 小节。
- 更新内容时以 Erika 仓库的 `CHANGELOG.md`、`docs/*.md` 与
  `crates/erika_capi/include/erika.h` 为真值来源。

## 5. 本文件

HANDOFF.md 不在站点导航内，属于仓库维护说明。事实变化（文件清单、
工作流、内容基线）时随手更新本文件——上一版"未纳入 git、删除不可逆"
的描述曾因未更新而误导他人，引以为戒。
