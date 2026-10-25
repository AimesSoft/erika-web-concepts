(function registerContent(app) {
app.siteContent = {
  brand: {
    name: 'liberika',
    kana: '古戸ヱリカ',
    descriptor: 'Playback Kernel',
    version: 'v0.3.0',
    repoUrl: 'https://github.com/AimesSoft/liberika',
  },
  navigation: [
    { label: '能力', href: '#features' },
    { label: '接入', href: '#start' },
    { label: '平台', href: '#platforms' },
    { label: '文档', href: '#docs' },
  ],
  hero: {
    eyebrow: 'NipaPlay presents / embeddable playback kernel',
    titleLead: '把播放，',
    titleAccent: '交给她来推理。',
    description:
      '从原生应用到浏览器，宿主只需递出一块画布。解码、同步、字幕、弹幕与渲染，全部在内核之内完成。',
    primaryAction: { label: '开始接入', href: '#start' },
    secondaryAction: { label: '阅读文档', href: 'docs/index.html' },
    characterImage: 'assets/images/erika-character.png',
    characterAlt: '古户绘梨花粉白礼服立绘',
    sideNote: '「如何です？古戸ヱリカにはこの程度の推理が可能です。」',
    facts: [
      { value: 'Rust', label: '内核语言' },
      { value: '8', label: '平台覆盖' },
    ],
  },
  features: {
    eyebrow: 'Case file / 01',
    title: '真相只有一条播放管线',
    lead:
      '0.3.0 带来 Web 后端、帧导出与诊断。字幕和弹幕超采样默认开启，原生软件视频解码默认多线程。',
    items: [
      {
        number: '01',
        icon: 'frame',
        title: '一块画布',
        text: '宿主提供原生表面或浏览器 Canvas，内核处理播放与合成；原生后端还支持 HDR 输出。',
        tags: ['Metal', 'wgpu', 'WebGL2'],
      },
      {
        number: '02',
        icon: 'spark',
        title: '零拷贝路径',
        text: '尽可能让硬件解码帧直接进入 GPU，减少多余搬运，也减少宿主侧的状态负担。',
        tags: ['VideoToolbox', 'D3D11VA', 'MediaCodec'],
      },
      {
        number: '03',
        icon: 'subtitle',
        title: '完整播放栈',
        text: '原生应用与浏览器共享 libass 字幕和 Rust 弹幕引擎。Web 可直接打开本地 MKV，保留 ASS 特效与字体。',
        tags: ['libass', 'Danmaku', 'WebCodecs'],
      },
    ],
  },
  quickStart: {
    eyebrow: 'Evidence / 02',
    title: '留下最少的接入痕迹',
    lead: '选择宿主环境，复制最短的开始方式。Flutter 走 pub.dev，Swift 走 SwiftPM，OpenHarmony 走 OHPM，其他原生宿主使用 GitHub Releases 预编译产物，Linux 从源码构建，Web 下载独立运行时。',
    tabs: [
      {
        id: 'release',
        label: '预编译产物',
        language: 'SHELL',
        code: `# github.com/AimesSoft/liberika/releases
erika-swift-core-0.3.0.xcframework.zip
erika-capi-macos-universal.zip
erika-capi-windows-x64.zip
erika-capi-android.zip
erika-capi-openharmony-arm64.zip
liberika-web-0.3.0.zip`,
        note: 'C ABI 归档包含 erika.h、许可证与 MANIFEST.txt；Swift 使用 XCFramework。',
        action: {
          label: '查看 GitHub Releases',
          url: 'https://github.com/AimesSoft/liberika/releases/tag/v0.3.0',
        },
      },
      {
        id: 'flutter',
        label: 'Flutter',
        language: 'DART',
        code: `import 'package:erika_flutter/erika_flutter.dart';

final player = ErikaPlayer();
await player.open('/path/to/video.mp4');
await player.play();

// 放入 Widget 树
ErikaVideoView(player: player)`,
        note: 'pub.dev 0.3.0 已发布：flutter pub add erika_flutter:^0.3.0。',
      },
      {
        id: 'swift',
        label: 'Swift · SwiftPM',
        language: 'SWIFT',
        code: `import Erika

let player = try ErikaPlayer()
try player.open("https://example.com/video.mp4")
try player.play()`,
        note: 'SwiftPM 0.3.0：在 Xcode 中添加 https://github.com/AimesSoft/liberika-swift',
        action: {
          label: '查看 Swift 接入指南',
          url: 'docs/guide/swift.html',
        },
      },
      {
        id: 'ohpm',
        label: 'OpenHarmony · OHPM',
        language: 'ARKTS',
        code: `import { ErikaPlayer } from 'erika';

const player = new ErikaPlayer();
player.open('https://example.com/video.mp4');
player.play();`,
        note: 'OHPM 0.3.0 已公开：ohpm install erika@0.3.0。原生表面与帧调度示例收录在接入指南。',
        action: {
          label: '查看 OpenHarmony 接入指南',
          url: 'docs/guide/openharmony.html',
        },
      },
      {
        id: 'web',
        label: 'Web · WASM',
        language: 'JAVASCRIPT',
        code: `import { Player } from './liberika/index.js';

const player = await Player.create({ canvas });
await player.open(file); // 本地 File / Blob 或远程 URL
playButton.onclick = () => player.play();

// 卸载时释放播放器
// await player.destroy();`,
        note: '下载 liberika-web-0.3.0.zip，完整解压后通过 HTTPS 或 localhost 访问。附带演示页；尚未发布到 npm。',
        action: {
          label: '查看 Web 接入与下载',
          url: 'docs/guide/web.html',
        },
      },
      {
        id: 'rust',
        label: 'Rust',
        language: 'RUST',
        code: `use erika::{MediaRequest, Player, PlayerConfig};

let player = Player::new(PlayerConfig::default());
player.open(MediaRequest::new("/path/to/video.mp4"))?;
player.play()?;`,
        note: 'Cargo.toml：erika = { git = "https://github.com/AimesSoft/liberika", tag = "v0.3.0" }',
      },
      {
        id: 'c-api',
        label: 'C · Presenter',
        language: 'C',
        code: `#include "erika.h"

ErikaPresenterHandle *player = erika_presenter_create();
erika_presenter_attach_metal_layer(
    player, (uint64_t)(uintptr_t)layer, width, height, scale);
erika_presenter_open(player, "/path/to/video.mp4");
erika_presenter_play(player);

// 在每个显示帧回调中调用
ErikaPresenterStats stats;
erika_presenter_render_tick(player, host_time, &stats);`,
        note: '示例为 Apple Metal；Windows、Android 与 HarmonyOS 使用对应的 surface 接口。',
      },
    ],
  },
  platforms: {
    eyebrow: 'Coverage / 03',
    title: '七个原生平台，加上 Web',
    lead: '平台能力留在内核里，产品逻辑留在宿主里。Web 使用 JavaScript Player 接口，编码支持由浏览器决定。',
    items: [
      { name: 'macOS', minimum: '11+', render: 'Metal', decode: 'VideoToolbox', status: 'ready' },
      { name: 'iOS', minimum: '13+', render: 'Metal', decode: 'VideoToolbox', status: 'ready' },
      { name: 'tvOS', minimum: '13+', render: 'Metal', decode: 'VideoToolbox', status: 'ready' },
      { name: 'Windows', minimum: '10+', render: 'D3D11', decode: 'D3D11VA', status: 'ready' },
      { name: 'Android', minimum: '8+', render: 'wgpu', decode: 'MediaCodec', status: 'ready' },
      { name: 'HarmonyOS', minimum: 'API 18', render: 'wgpu', decode: 'AVCodec', status: 'ready' },
      { name: 'Web', minimum: 'HTTPS / localhost', render: 'WebGL2', decode: 'WebCodecs', status: 'ready' },
      { name: 'Linux', minimum: 'FFmpeg 8.x', render: 'wgpu', decode: 'NVDEC / VA-API', status: 'planned', statusLabel: '实验性' },
    ],
  },
  docs: {
    eyebrow: 'Archive / 04',
    title: '从现场走进档案室',
    lead: '快速接入、内核原理、C ABI 参考和项目协作资料，都整理在这里。',
    groups: [
      {
        number: 'A',
        title: '接入指南',
        english: 'Guide',
        links: [
          ['快速开始', 'docs/guide/quickstart.html'],
          ['Flutter 嵌入', 'docs/guide/flutter.html'],
          ['Swift 接入', 'docs/guide/swift.html'],
          ['OpenHarmony / OHPM', 'docs/guide/openharmony.html'],
          ['Rust 嵌入', 'docs/guide/rust.html'],
          ['C ABI 嵌入', 'docs/guide/c.html'],
          ['Linux 接入', 'docs/guide/linux.html'],
          ['Web / WASM 接入', 'docs/guide/web.html'],
        ],
      },
      {
        number: 'B',
        title: '内核原理',
        english: 'Kernel',
        links: [
          ['架构总览', 'docs/kernel/architecture.html'],
          ['硬件解码', 'docs/kernel/decode.html'],
          ['零拷贝导入', 'docs/kernel/zero-copy.html'],
          ['渲染管线', 'docs/kernel/render.html'],
          ['高动态范围', 'docs/kernel/hdr.html'],
          ['神经超分', 'docs/kernel/upscale.html'],
          ['字幕与弹幕', 'docs/kernel/subtitle-danmaku.html'],
          ['时钟与调度', 'docs/kernel/clock.html'],
        ],
      },
      {
        number: 'C',
        title: '参考与项目',
        english: 'Reference',
        links: [
          ['C ABI 总览', 'docs/reference/capi.html'],
          ['ErikaHandle', 'docs/reference/capi-handle.html'],
          ['PresenterHandle', 'docs/reference/capi-presenter.html'],
          ['JSON bridge', 'docs/reference/capi-json.html'],
          ['构建与依赖', 'docs/project/building.html'],
          ['发布与产物', 'docs/project/releasing.html'],
          ['贡献指南', 'docs/project/contributing.html'],
          ['更新日志', 'docs/project/changelog.html'],
        ],
      },
    ],
  },
  closing: {
    label: 'A little truth from liberika',
    quote: '“GOOD！我是 liberika，是 NipaPlay 里第五个播放器内核。”',
    reply: '“即便算上你，也只有四个播放器内核！”',
    note:
      '名字取自《海猫鸣泣之时》的侦探古戸ヱリカ（古户绘梨花）。一个是台前的播放器，一个是幕后的引擎。',
  },
  artworkCredit: {
    label: '角色插画：w栗子w · 经作者授权使用',
    url: 'https://www.pixiv.net/artworks/134321283',
  },
};
})(window.ErikaApp = window.ErikaApp || {});
