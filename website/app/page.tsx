import { releaseSnapshot } from "../lib/release-intel";

const features = [
  {
    mark: "01",
    tag: "DECODE",
    title: "硬解，不绕路",
    body: "VideoToolbox、D3D11VA、MediaCodec 与 AVCodec 各就各位；互操作不可用时，回退路径同样清清楚楚。",
    tone: "berry",
  },
  {
    mark: "02",
    tag: "ZERO COPY",
    title: "让帧直接抵达 GPU",
    body: "从 CVPixelBuffer、D3D11VA 纹理到 AHardwareBuffer，尽量不在 CPU 与 GPU 之间来回搬运。",
    tone: "ink",
  },
  {
    mark: "03",
    tag: "HDR / EDR",
    title: "高光也是证词",
    body: "覆盖 Apple EDR、Windows HDR10 与 Android FP16 extended-linear scRGB，并为 SDR 准备明确退路。",
    tone: "cyan",
  },
  {
    mark: "04",
    tag: "ARTCNN",
    title: "为动画而生的 2× 超分",
    body: "ArtCNN 只处理亮度，以 Metal 或 wgpu/Vulkan compute 接入渲染管线，把线条与细节重新找回来。",
    tone: "paper",
  },
  {
    mark: "05",
    tag: "OVERLAY",
    title: "字幕与弹幕，同场推理",
    body: "SRT、WebVTT、ASS 与 Bilibili 弹幕进入同一套合成流程；DFM+ 负责碰撞避让，GPU 负责流畅呈现。",
    tone: "paper",
  },
  {
    mark: "06",
    tag: "EMBED",
    title: "宿主只管给出舞台",
    body: "C ABI、Flutter 插件与原生 surface 接入，让 C/C++、Swift、Dart 以及任何 FFI 语言都能调用完整播放栈。",
    tone: "berry",
  },
];

const platforms = [
  { name: "macOS", detail: "Metal · CoreAudio", state: "14+" },
  { name: "iOS", detail: "Metal · AudioQueue", state: "16+" },
  { name: "tvOS", detail: "Metal · AudioQueue", state: "13+" },
  { name: "Windows", detail: "D3D11 · WASAPI", state: "10+" },
  { name: "Android", detail: "Vulkan/GLES · AAudio", state: "8+" },
  { name: "HarmonyOS", detail: "Vulkan · OHAudio", state: "API 18+" },
];

const snippets = {
  rust: `use erika::{Player, PlayerConfig, MediaRequest};

let player = Player::new(PlayerConfig::default())?;
player.open(MediaRequest::file("/path/to/video.mp4"))?;
player.play()?;`,
  flutter: `final player = ErikaPlayer();
await player.open('/path/to/video.mp4');
await player.play();

ErikaWindowOverlayVideoView(player: player);`,
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const release = releaseSnapshot;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Erika 首页">
          <span className="brand-mark" aria-hidden="true">E</span>
          <span className="brand-word">ERIKA</span>
          <span className="brand-kana">エリカ</span>
        </a>
        <nav aria-label="主导航">
          <a href="#case">案件卷宗</a>
          <a href="#features">能力证据</a>
          <a href="#release">版本情报</a>
          <a href="#start">开始接入</a>
        </nav>
        <a
          className="top-github"
          href="https://github.com/AimesSoft/Erika"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <Arrow />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="speed-lines" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span>CASE FILE / 05</span>
            <span className="eyebrow-rule" />
            <span>OPEN SOURCE</span>
          </div>
          <p className="hero-kicker">NipaPlay 自研 · 跨平台播放内核</p>
          <h1>
            让每一帧，
            <span className="title-accent">抵达真相。</span>
          </h1>
          <p className="hero-lead">
            从硬件解码、音画同步到 HDR 渲染、字幕与弹幕合成，
            Erika 用 Rust 把完整播放栈装进一个可嵌入的内核。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#start">
              立即开始推理 <span aria-hidden="true">→</span>
            </a>
            <a
              className="button button-ghost"
              href="https://github.com/AimesSoft/Erika"
              target="_blank"
              rel="noreferrer"
            >
              查看源代码 <Arrow />
            </a>
          </div>
          <div className="hero-proof" aria-label="项目关键词">
            <span>RUST</span>
            <span>ZERO-COPY</span>
            <span>HDR</span>
            <span>FLUTTER</span>
          </div>
        </div>

        <div className="hero-art">
          <figure className="hero-keyvisual">
            <img
              src="/og.png"
              width="1659"
              height="948"
              alt="Erika 侦探站在播放画面前追查每一帧的黑红漫画风主视觉"
              fetchPriority="high"
            />
            <figcaption>
              <span>VISUAL EVIDENCE / 01</span>
              <strong>FRAME TRACE: LOCKED</strong>
            </figcaption>
          </figure>
          <div className="visual-status"><i aria-hidden="true" /> CORE ONLINE</div>
          <div className="case-stamp">CASE<br /><b>05</b></div>
          <div className="tape tape-top">TRUTH / FRAME / TRUTH / FRAME</div>
          <div className="tape tape-bottom">DO NOT CROSS · RENDER PATH</div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>HARDWARE DECODE</span><b>✦</b><span>ZERO-COPY</span><b>✦</b>
          <span>HDR / EDR</span><b>✦</b><span>AI UPSCALING</span><b>✦</b>
          <span>DANMAKU</span><b>✦</b><span>HARDWARE DECODE</span><b>✦</b>
          <span>ZERO-COPY</span><b>✦</b><span>HDR / EDR</span><b>✦</b>
        </div>
      </div>

      <section className="case-section" id="case">
        <div className="section-index">01</div>
        <div className="case-intro">
          <p className="section-label">THE CASE / 项目是什么</p>
          <h2>宿主给出舞台，<br />剩下的交给 Erika。</h2>
        </div>
        <div className="case-copy">
          <p>
            宿主应用只需提供一个渲染表面并发送播放命令。解码、时序同步、
            音视频渲染、字幕、弹幕与音频输出，全部在 Erika 内部完成。
          </p>
          <div className="quote-card">
            <span className="quote-mark">“</span>
            <p>我是 Erika，是 NipaPlay 里继 mdk、video_player、libmpv、media_kit 之后的第五个播放器内核。</p>
            <small>—— 案件记录 #0005</small>
          </div>
        </div>
        <div className="origin-note">
          <span className="pin" aria-hidden="true">×</span>
          <strong>名字里的彩蛋</strong>
          <p>
            “Erika”取自《海猫鸣泣之时》的侦探古戸ヱリカ。官网以侦探、证据与真相为灵感，
            为这个幕后播放引擎建立一套属于自己的视觉身份。
          </p>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="features-heading">
          <div>
            <p className="section-label light">THE EVIDENCE / 能力证据</p>
            <h2>这不是魔法，<br />是完整的播放栈。</h2>
          </div>
          <p className="features-aside">
            一条可以解释、可以回退、<br />也可以继续进化的播放路径。
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className={`feature-card ${feature.tone}`} key={feature.mark}>
              <div className="feature-top">
                <span className="feature-mark">{feature.mark}</span>
                <span className="feature-tag">{feature.tag}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <span className="card-cross" aria-hidden="true">＋</span>
            </article>
          ))}
        </div>
      </section>

      <section className="pipeline-section">
        <div className="pipeline-copy">
          <p className="section-label">THE METHOD / 播放链路</p>
          <h2>顺着证据，<br />找到每一帧。</h2>
          <p>
            从媒体源到屏幕，Erika 负责把时间、像素与声音对齐。
            各平台走自己的原生快车道，却共享同一套清晰的核心抽象。
          </p>
          <a href="https://github.com/AimesSoft/Erika/blob/main/docs/architecture.zh.md" target="_blank" rel="noreferrer">
            阅读架构总览 <Arrow />
          </a>
        </div>
        <div className="evidence-chain" aria-label="Erika 播放处理链路">
          <div className="chain-line" aria-hidden="true" />
          <div className="chain-item">
            <span className="chain-number">A</span>
            <div><small>SOURCE</small><strong>媒体输入</strong><p>文件 · 网络 · 自定义 IO</p></div>
          </div>
          <div className="chain-item offset">
            <span className="chain-number">B</span>
            <div><small>DECODE</small><strong>原生硬解</strong><p>平台能力优先，软解兜底</p></div>
          </div>
          <div className="chain-item">
            <span className="chain-number">C</span>
            <div><small>SYNC</small><strong>时钟同步</strong><p>音频主时钟 · vsync 量化</p></div>
          </div>
          <div className="chain-item offset">
            <span className="chain-number">D</span>
            <div><small>COMPOSE</small><strong>GPU 合成</strong><p>视频 · HDR · 字幕 · 弹幕</p></div>
          </div>
          <div className="chain-item">
            <span className="chain-number final">✓</span>
            <div><small>DISPLAY</small><strong>真相呈现</strong><p>一帧不落，准时抵达</p></div>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-heading">
          <p className="section-label">THE TERRITORY / 平台支持</p>
          <h2>跨越六个平台，<br /><span>仍是一位侦探。</span></h2>
        </div>
        <div className="platform-grid">
          {platforms.map((platform, index) => (
            <article className="platform-card" key={platform.name}>
              <span className="platform-no">0{index + 1}</span>
              <h3>{platform.name}</h3>
              <p>{platform.detail}</p>
              <span className="platform-state">可用 · {platform.state}</span>
            </article>
          ))}
        </div>
        <p className="linux-note"><span>＋</span> Linux / wgpu 支持正在规划中</p>
      </section>

      <section className="release-section" id="release">
        <div className="release-heading">
          <div>
            <p className="section-label">VERSION INTEL / 版本情报</p>
            <h2>最新证词，<br />自动归档。</h2>
          </div>
          <div className="release-sync">
            <span className="sync-light" aria-hidden="true" />
            <div><strong>GITHUB SYNCED</strong><small>每 30 分钟自动更新</small></div>
          </div>
        </div>

        <div className="release-dossier">
          <div className="version-card">
            <div className="version-card-top">
              <span>LATEST STABLE</span>
              <span>CASE / RELEASE</span>
            </div>
            <strong className="version-number" data-release-version>{release.version}</strong>
            <div className="version-meta">
              <div><small>RELEASED</small><time dateTime={release.releasedAt} data-release-date>{release.releasedAt}</time></div>
              <div><small>ASSETS</small><span data-release-assets>{release.assetCount || "—"}</span></div>
              <div><small>SOURCE</small><span data-release-source>SNAPSHOT</span></div>
            </div>
            <div className="version-actions">
              <a className="button button-primary" href={release.releaseUrl} target="_blank" rel="noreferrer" data-release-url>
                获取此版本 <Arrow />
              </a>
              <a className="version-api" href="https://api.github.com/repos/AimesSoft/Erika/releases/latest" target="_blank" rel="noreferrer">GITHUB API <span aria-hidden="true">→</span></a>
            </div>
            <span className="version-watermark" aria-hidden="true">V</span>
          </div>

          <div className="changelog-card">
            <div className="changelog-head">
              <div><span>CHANGELOG</span><strong><span data-release-version>{release.version}</span> 更新日志</strong></div>
              <a href={release.changelogUrl} target="_blank" rel="noreferrer">完整记录 <Arrow /></a>
            </div>
            <div className="change-list" data-change-list>
              {release.sections.map((section, index) => (
                <details key={section.title} open={index === 0}>
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{section.title}</strong>
                    <i aria-hidden="true">＋</i>
                  </summary>
                  <ul>
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="start-section" id="start">
        <div className="start-heading">
          <div>
            <p className="section-label light">FIRST CLUE / 快速开始</p>
            <h2>三行代码，<br />案件开始。</h2>
          </div>
          <p>先让它播放起来，再深入每一条渲染路径。</p>
        </div>
        <div className="code-grid">
          <article className="code-card">
            <div className="code-head"><span>RUST</span><span>player.rs</span></div>
            <pre><code>{snippets.rust}</code></pre>
          </article>
          <article className="code-card code-card-alt">
            <div className="code-head"><span>FLUTTER</span><span>player.dart</span></div>
            <pre><code>{snippets.flutter}</code></pre>
          </article>
        </div>
        <div className="doc-links">
          <a href="https://github.com/AimesSoft/Erika/blob/main/docs/integration.zh.md" target="_blank" rel="noreferrer">
            <span>01</span><strong>原生接入指南</strong><Arrow />
          </a>
          <a href="https://github.com/AimesSoft/Erika/blob/main/docs/flutter_embedding.zh.md" target="_blank" rel="noreferrer">
            <span>02</span><strong>Flutter 嵌入</strong><Arrow />
          </a>
          <a href="https://github.com/AimesSoft/Erika/blob/main/docs/capi_reference.zh.md" target="_blank" rel="noreferrer">
            <span>03</span><strong>C ABI 参考</strong><Arrow />
          </a>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-dots" aria-hidden="true" />
        <div className="cta-label">FINAL DEDUCTION</div>
        <h2>准备好，<br />揭开下一帧了吗？</h2>
        <p>Erika 已经把播放路径整理成一份可以验证的证词。</p>
        <a className="button button-light" href="https://github.com/AimesSoft/Erika" target="_blank" rel="noreferrer">
          在 GitHub 查看项目 <Arrow />
        </a>
        <div className="cta-seal" aria-hidden="true">E</div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">E</span>
          <span className="brand-word">ERIKA</span>
        </a>
        <p>Rust-powered embeddable media engine for NipaPlay.</p>
        <div className="footer-links">
          <a href="https://github.com/AimesSoft/Erika" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/AimesSoft/Erika/blob/main/LICENSE" target="_blank" rel="noreferrer">MPL-2.0</a>
          <a href="https://github.com/AimesSoft/NipaPlay-Reload" target="_blank" rel="noreferrer">NipaPlay</a>
        </div>
        <span className="footer-copy">© 2026 AimesSoft / Erika</span>
      </footer>
    </main>
  );
}
