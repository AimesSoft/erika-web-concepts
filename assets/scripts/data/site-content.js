(function registerContent(app) {
app.siteContent = {
  brand: {
    name: 'Erika',
    kana: '古戸ヱリカ',
    descriptor: 'Playback Kernel',
    version: 'v0.1.5',
    repoUrl: 'https://github.com/AimesSoft/Erika',
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
      '宿主只需递出一块画布。解码、同步、字幕、弹幕与渲染，全部在内核之内完成。',
    primaryAction: { label: '开始接入', href: '#start' },
    secondaryAction: { label: '阅读文档', href: 'docs/index.html' },
    characterImage: 'assets/images/erika-character.png',
    characterAlt: '古户绘梨花粉白礼服立绘',
    sideNote: '「如何です？古戸ヱリカにはこの程度の推理が可能です。」',
    facts: [
      { value: 'Rust', label: '内核语言' },
      { value: '6', label: '已支持平台' },
      { value: '1', label: '宿主画布' },
    ],
  },
  features: {
    eyebrow: 'Case file / 01',
    title: '真相只有一条播放管线',
    lead:
      'Erika 把繁琐的媒体能力收进一致的内核边界，让每个宿主都能共享同一套播放行为。',
    items: [
      {
        number: '01',
        icon: 'frame',
        title: '一块画布',
        text: '宿主提供原生绘制表面，内核接管硬解、色彩转换、HDR 与最终呈现。',
        tags: ['Metal', 'D3D11', 'wgpu'],
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
        text: '时钟、音频、字幕、弹幕和神经超分都由内核统一调度，宿主只管理产品体验。',
        tags: ['libass', 'Audio', 'Anime4K'],
      },
    ],
  },
  quickStart: {
    eyebrow: 'Evidence / 02',
    title: '留下最少的接入痕迹',
    lead: '选择宿主环境，复制最短的开始方式。当前推荐使用 GitHub Releases 的预编译产物。',
    tabs: [
      {
        id: 'release',
        label: '预编译产物',
        language: 'SHELL',
        code: `# github.com/AimesSoft/Erika/releases
erika-capi-macos-universal.zip
erika-capi-windows-x64.zip
erika-capi-ios.zip
erika-capi-tvos.zip
erika-capi-android.zip
erika-capi-openharmony-arm64.zip`,
        note: '每个归档都包含 include/erika.h、许可证文本与 MANIFEST.txt。',
      },
      {
        id: 'rust',
        label: 'Rust',
        language: 'TOML',
        code: `[dependencies]
erika = { git = "https://github.com/AimesSoft/Erika", tag = "v0.1.5" }`,
        note: '源码构建前需准备 FFmpeg、libass 与其他原生依赖。',
      },
      {
        id: 'flutter',
        label: 'Flutter',
        language: 'YAML',
        code: `dependencies:
  erika_flutter:
    git:
      url: https://github.com/AimesSoft/Erika
      path: packages/erika_flutter`,
        note: '插件覆盖 macOS、iOS、tvOS、Windows、Android 与 HarmonyOS。',
      },
      {
        id: 'c-api',
        label: 'C · Presenter',
        language: 'C',
        code: `#include "erika.h"

ErikaPresenterHandle *player = erika_presenter_create();
erika_presenter_attach_metal_layer(player, layer, w, h, scale);
erika_presenter_open(player, "/path/to/video.mp4");
erika_presenter_play(player);`,
        note: 'Presenter 由内核托管完整播放栈，也可使用 ErikaHandle 自行拉取帧数据。',
      },
    ],
  },
  platforms: {
    eyebrow: 'Coverage / 03',
    title: '六个平台，同一种行为',
    lead: '平台能力留在内核里，产品逻辑留在宿主里。',
    items: [
      { name: 'macOS', minimum: '14+', render: 'Metal', decode: 'VideoToolbox', status: 'ready' },
      { name: 'iOS', minimum: '16+', render: 'Metal', decode: 'VideoToolbox', status: 'ready' },
      { name: 'tvOS', minimum: '13+', render: 'Metal', decode: 'VideoToolbox', status: 'ready' },
      { name: 'Windows', minimum: '10+', render: 'D3D11', decode: 'D3D11VA', status: 'ready' },
      { name: 'Android', minimum: '8+', render: 'wgpu', decode: 'MediaCodec', status: 'ready' },
      { name: 'HarmonyOS', minimum: 'API 18', render: 'wgpu', decode: 'AVCodec', status: 'ready' },
      { name: 'Linux', minimum: '—', render: 'wgpu', decode: '—', status: 'planned' },
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
          ['Rust 嵌入', 'docs/guide/rust.html'],
          ['C ABI 嵌入', 'docs/guide/c.html'],
          ['Flutter 嵌入', 'docs/guide/flutter.html'],
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
    label: 'A little truth from Erika',
    quote: '“GOOD！我是 Erika，是 NipaPlay 里第五个播放器内核。”',
    reply: '“即便算上你，也只有四个播放器内核！”',
    note:
      '名字取自《海猫鸣泣之时》的侦探古戸ヱリカ（古户绘梨花）。一个是台前的播放器，一个是幕后的引擎。',
  },
};
})(window.ErikaApp = window.ErikaApp || {});
