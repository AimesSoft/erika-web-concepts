export type ChangeSection = {
  title: string;
  items: string[];
};

export type ReleaseIntel = {
  version: string;
  releasedAt: string;
  releaseUrl: string;
  changelogUrl: string;
  assetCount: number;
  sections: ChangeSection[];
  source: "static-snapshot";
};

// Static fallback rendered into the HTML. public/version-sync.js refreshes this
// directly from GitHub in the visitor's browser, so the site needs no backend.
export const releaseSnapshot: ReleaseIntel = {
  version: "v0.1.5",
  releasedAt: "2026-08-03",
  releaseUrl: "https://github.com/AimesSoft/Erika/releases/tag/v0.1.5",
  changelogUrl: "https://github.com/AimesSoft/Erika/blob/main/CHANGELOG.md",
  assetCount: 9,
  source: "static-snapshot",
  sections: [
    {
      title: "System media controls and background audio",
      items: [
        "新增跨平台系统媒体控制、Now Playing 元数据和播放时间线。",
        "iOS 与 Android 支持可选后台音频播放，并在后台暂停视频解码。",
      ],
    },
    {
      title: "Platform support and release artifacts",
      items: [
        "新增 tvOS Flutter 插件、原生目标与自动发布产物。",
        "OpenHarmony 支持预编译产物下载，并在失败时回退源码构建。",
      ],
    },
    {
      title: "Subtitle memory fonts",
      items: [
        "新增跨 Rust、C API、Dart 与原生 Flutter 嵌入的内存字幕字体注册表。",
      ],
    },
    {
      title: "Playback recovery",
      items: [
        "输入断流时进入明确的缓冲状态，恢复后重新锚定媒体时钟。",
      ],
    },
  ],
};
