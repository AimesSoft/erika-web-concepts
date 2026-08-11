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
  source: "github-release" | "changelog" | "fallback";
  fetchedAt: string;
};

type GitHubRelease = {
  tag_name?: string;
  html_url?: string;
  published_at?: string;
  assets?: unknown[];
};

const REPOSITORY_URL = "https://github.com/AimesSoft/Erika";
const CHANGELOG_URL = `${REPOSITORY_URL}/blob/main/CHANGELOG.md`;
const RAW_CHANGELOG_URL = "https://raw.githubusercontent.com/AimesSoft/Erika/main/CHANGELOG.md";
const LATEST_RELEASE_API = "https://api.github.com/repos/AimesSoft/Erika/releases/latest";

const fallbackSections: ChangeSection[] = [
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
];

const fallback: Omit<ReleaseIntel, "fetchedAt"> = {
  version: "v0.1.5",
  releasedAt: "2026-08-03",
  releaseUrl: `${REPOSITORY_URL}/releases/tag/v0.1.5`,
  changelogUrl: CHANGELOG_URL,
  assetCount: 0,
  sections: fallbackSections,
  source: "fallback",
};

function cleanInlineMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function latestVersionFromChangelog(markdown: string) {
  const match = markdown.match(/^##\s+(\d+\.\d+\.\d+)\s+-\s+(\d{4}-\d{2}-\d{2})/m);
  return match ? { version: `v${match[1]}`, releasedAt: match[2] } : null;
}

function parseVersionBlock(markdown: string, version: string): ChangeSection[] {
  const normalized = version.replace(/^v/, "");
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((line) => line.startsWith(`## ${normalized}`));
  if (start < 0) return [];

  const sections: ChangeSection[] = [];
  let active: ChangeSection | null = null;

  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^##\s+/.test(line)) break;

    const heading = line.match(/^###\s+(.+)/);
    if (heading) {
      active = { title: cleanInlineMarkdown(heading[1]), items: [] };
      sections.push(active);
      continue;
    }

    const bullet = line.match(/^-\s+(.+)/);
    if (bullet && active) {
      active.items.push(cleanInlineMarkdown(bullet[1]));
      continue;
    }

    const continuation = cleanInlineMarkdown(line);
    if (continuation && active?.items.length) {
      const last = active.items.length - 1;
      active.items[last] = `${active.items[last]} ${continuation}`;
    }
  }

  return sections.filter((section) => section.items.length > 0);
}

function cachedRequest(url: string) {
  return fetch(url, {
    headers: {
      Accept: "application/vnd.github+json, text/plain;q=0.9",
      "User-Agent": "Erika-Project-Site",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 1800 },
  });
}

export async function getReleaseIntel(): Promise<ReleaseIntel> {
  const fetchedAt = new Date().toISOString();

  try {
    const [releaseResponse, changelogResponse] = await Promise.all([
      cachedRequest(LATEST_RELEASE_API),
      cachedRequest(RAW_CHANGELOG_URL),
    ]);

    const markdown = changelogResponse.ok ? await changelogResponse.text() : "";
    const changelogLatest = latestVersionFromChangelog(markdown);

    let release: GitHubRelease | null = null;
    if (releaseResponse.ok) {
      release = (await releaseResponse.json()) as GitHubRelease;
    }

    const version = release?.tag_name ?? changelogLatest?.version ?? fallback.version;
    const releasedAt = release?.published_at?.slice(0, 10) ?? changelogLatest?.releasedAt ?? fallback.releasedAt;
    const sections = parseVersionBlock(markdown, version);

    return {
      version,
      releasedAt,
      releaseUrl: release?.html_url ?? `${REPOSITORY_URL}/releases/tag/${version}`,
      changelogUrl: CHANGELOG_URL,
      assetCount: release?.assets?.length ?? 0,
      sections: sections.length ? sections : fallback.sections,
      source: release ? "github-release" : changelogLatest ? "changelog" : "fallback",
      fetchedAt,
    };
  } catch {
    return { ...fallback, fetchedAt };
  }
}
