# liberika 文档站 交接说明

写给接手维护正文的人。本文件只陈述事实与已核实的数据（最近一次核实：
2026-10-25），不含风格建议。

## 1. 这是什么

`~/Desktop/erika-web-concepts/` 是 liberika 播放内核的**文档站**，与 liberika 仓库
（`~/Desktop/Erika/`）分离。

**它是 git 仓库**（2026-08-11 初始化），远端
`https://github.com/AimesSoft/erika-web-concepts.git`，工作流为直接提交
`main` 并 push，无 PR 环节。改完正文后必须 commit + push，只改磁盘文件
不算发布。

| 路径 | 内容 |
|---|---|
| `index.html`（根） | 独立 landing 页，用自己的 `assets/styles/main.css`，提供进入 `docs/` 的入口；文档品牌与面包屑返回此页 |
| `docs/index.html` | 文档区入口，侧栏导航进全部 24 个正文页 |
| `docs/guide/` | 接入指南 8 页：quickstart / flutter / swift / c / rust / openharmony / linux / web |
| `docs/kernel/` | 内核设计 8 页：architecture / decode / render / hdr / clock / upscale / zero-copy / subtitle-danmaku |
| `docs/reference/` | C ABI 参考 4 页：capi / capi-presenter / capi-handle / capi-json |
| `docs/project/` | 项目文档 4 页：building / releasing / contributing / changelog |
| `docs/docs.css` | 唯一样式表（1135 行） |
| `docs/docs.js` | 代码块一键复制等增强（46 行） |
| `06-washi-home.html` | 旧版原型主页残留：不在现行导航中，文档统一返回根 `index.html` |

## 2. 生成器已删除（旧警告作废）

最早版本曾有 21 个 `_build_*.py` 页面生成器与 `_check_links.py`，因内容
过期且未回写，在初始提交前已全部删除，git 历史中无痕迹。**现行维护方式：
直接手改 HTML，commit 后 push。** 没有任何"跑脚本会覆盖正文"的风险。

链接校验脚本也没有了。需要校验时临时写一段解析器：遍历 `href`，检查
同页锚点与相对路径目标是否存在即可（2026-10-25 全站 25 个文档页校验通过）。

## 3. 设计系统

`docs/docs.css` 是唯一需要保留的资产，正文只使用它已有的类名，不要新增
CSS。交互增强统一走 `docs/docs.js`（代码块复制按钮等）。

## 4. 内容基线

- 当前安装、接口及功能说明按 liberika v0.3.0 核对，更新日志保留旧版历史。
- C ABI 共 108 个导出函数、45 个类型；72 个 Presenter 函数、23 个
  Handle 函数，另有 13 个通用/独立入口。
- Flutter、SwiftPM 与 OHPM 的 0.3.0 均已公开可用。
- JSON bridge 共 47 个方法，支持 listMethods 发现、日志、章节和帧导出。
- Web 通过 liberika-web-0.3.0.zip 分发，包含运行时和演示页，尚未发布到 npm；
  需要 WebCodecs、OffscreenCanvas、WebGL2、Web Audio 和 HTTPS/localhost。
- 字幕/弹幕超采样默认开启；原生软件视频解码默认多线程。
- Linux 为实验性源码构建目标，没有预编译发布包。接入指南包含
  FFmpeg 8、补丁 libass、X11 / Wayland、PulseAudio 和 Flutter 动态库配置。
- 发布流程按当前 main 的 workflow 核对，涵盖独立 slice 构建、目标缓存
  及原生发布后的生态包发布。
- 更新内容时以 liberika 仓库的 `CHANGELOG.md`、`docs/*.md`、
  `crates/erika_capi/include/erika.h`、SDK 实现和发布 workflow 为来源。

## 5. 线上部署

- 生产地址为 `https://liberika.aimes-soft.com/`，服务器使用本机 SSH 配置的
  `nipaplay-prod`（43.128.47.234）。
- `erika-deploy-watch.service` 每 60 秒检查 `main`，从
  `/www/deploy/erika.aimes-soft.com/repository` 同步到
  `/www/wwwroot/erika.aimes-soft.com`；部署提交记录在同级 `DEPLOYED_COMMIT`。
- liberika 与旧 erika 域名共用上述自动部署目录。2026-10-25 修复新域名仍指向
  改名前静态副本的问题；新域名 nginx 配置为
  `/www/server/panel/vhost/nginx/liberika.aimes-soft.com.conf`。
- 同步保留 `.well-known`、`.user.ini`、`.htaccess` 和 `404.html`，不发布 `.git`
  与本维护文档。部署前自动备份到 `/www/backups/erika.aimes-soft.com/auto`。
- nginx 对 JS/CSS 设置 12 小时缓存。首页内容脚本在 `index.html` 中使用版本查询参数；
  后续发版同步更新该参数，避免已有浏览器继续显示旧版内容。
- push 后仍需检查线上首页和修改的文档，确认服务器已同步。

## 6. 本文件

HANDOFF.md 不在站点导航内，属于仓库维护说明。事实变化（文件清单、
工作流、内容基线）时随手更新本文件——上一版"未纳入 git、删除不可逆"
的描述曾因未更新而误导他人，引以为戒。

## 6. 文档区语言版本

`docs/` 的中文原页保留原路径；英文与日文分别使用同目录的 `.en.html`、
`.ja.html` 文件，例如 `guide/flutter.en.html`。页面语言切换会保留当前锚点，
页内链接指向相同语言的版本；偏好保存在 `localStorage` 的 `liberika-language`。
英文与日文正文目前为机器翻译，已在页面提示，关键术语和代码示例已抽查；
后续需要逐页人工校订。代码、命令及接口标识以中文页和源码为准，更新中文
内容时应同步维护译文并检查链接，不能只改一个语言版本。
