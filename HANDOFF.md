# Erika 文档站 交接说明

写给接手重写正文的人。本文件只陈述事实与已核实的数据，不含风格建议。

## 1. 这是什么

`~/Desktop/erika-web-concepts/` 是 Erika 播放内核的**文档站原型**，与 Erika 仓库
（`~/Desktop/Erika/`）分离，未纳入 git，**删除不可逆**。

| 路径 | 内容 |
|---|---|
| `06-washi-home.html` | 站点主页。15 处链接进 `docs/` |
| `01-…`–`05-…`, `A-…`–`C-…` | 早期概念稿 8 份，未接入站点导航 |
| `docs/` | 文档区，24 个 HTML 页 + `docs.css` |
| `docs/_build_*.py` | 21 个页面生成器 |
| `docs/_gen_shell.py` | 生成共享侧栏骨架 |
| `docs/_check_links.py` | 校验内部链接与锚点 |
| `docs/_pages_removed/` | 我写的 24 页正文已移到这里（见第 7 节） |

## 2. 最重要的一条：生成器是过期的

页面由 `_build_*.py` 生成，但**上一轮的内容修正是直接改 HTML 完成的，没有回写生成器**。
生成器里仍保留全部错误内容：

| 生成器 | 仍含有的错误 |
|---|---|
| `_build_types.py` | `ErikaColorPrimaries`、`ErikaVideoFrame`、`ErikaHdrFallbackReason` |
| `_build_handle.py` | `erika_acquire_video_frame`、`ErikaVideoFrame`、「队列有界」 |
| `_build_dart.py` | `stateStream`、`getTracks` |
| `_build_conventions.py` | `ErikaStatus_InternalError`、「内部有锁」 |
| `_build_events.py` | `SeekCompleted`、「队列有界」 |
| `_build_changelog.py` | `ErikaHdrFallbackReason` |
| `_build_{building,conventions,contributing,releasing,changelog}.py` | 导出数 `79`（实际 91） |

**跑任何一个生成器都会把错误内容写回站点。** 重写正文时二选一：

- 弃用生成器，直接手写 HTML；
- 或先把生成器内容替换成第 5 节的真值，再由生成器产出。

`_gen_shell.py`（侧栏骨架）和 `_check_links.py`（链接校验）与正文无关，可以照用。

## 3. 设计系统：`docs/docs.css`

266 行，是唯一需要保留的资产。新正文应当只使用它已有的类名，不要新增 CSS。
