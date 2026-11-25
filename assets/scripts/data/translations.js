(function registerTranslations(app) {
  const translations = {
    zh: {
      ui: { home: 'liberika 首页', openMenu: '打开菜单', closeMenu: '关闭菜单', navigation: '主导航', language: '语言', technologies: '相关技术', integration: '接入方式', copy: '复制', copied: '已复制', copyFailed: '复制失败', copyCode: '复制代码', ready: '可用', planned: '规划中', skip: '跳到正文', title: 'liberika — 可嵌入播放内核', description: 'liberika 0.3.8 — 面向原生应用与浏览器的可嵌入播放内核，支持 MKV、ASS 字幕与弹幕。' },
    },
    en: {
      ui: { home: 'liberika home', openMenu: 'Open menu', closeMenu: 'Close menu', navigation: 'Main navigation', language: 'Language', technologies: 'Related technologies', integration: 'Integration options', copy: 'Copy', copied: 'Copied', copyFailed: 'Copy failed', copyCode: 'Copy code', ready: 'Available', planned: 'Planned', skip: 'Skip to content', title: 'liberika — Embeddable playback kernel', description: 'liberika 0.3.8 is an embeddable playback kernel for native applications and browsers, with MKV, ASS subtitles and danmaku.' },
      nav: ['Features', 'Get started', 'Platforms', 'Documentation', 'Live demo'],
      hero: ['Leave playback', 'to her deduction.', 'In both native apps and browsers, the host only provides a surface or canvas; decoding, sync, subtitles, danmaku, and rendering run inside the kernel.', 'Get started', 'Read the docs', 'Illustration of Erika Furudo in a pink and white dress', 'Kernel language', 'Platforms'],
      features: ['One truth, one playback pipeline', 'liberika handles decoding, rendering, subtitles, and danmaku inside the kernel, keeping playback behavior consistent across hosts.', 'One surface', 'The host supplies a native surface or browser canvas; the kernel handles playback and composition. Native backends also support HDR output.', 'Zero-copy paths', 'Where supported, hardware-decoded frames import directly as GPU textures, avoiding extra CPU copies.', 'A complete playback stack', 'Native apps and browsers share libass subtitles and the Rust danmaku engine. Web can open local MKV files with ASS effects and fonts.'],
      quick: ['Leave barely a trace', 'Pick the integration for your host. Flutter uses pub.dev, Swift uses SwiftPM, and OpenHarmony uses OHPM. Other native hosts use GitHub Releases binaries; Linux offers bundled / system packages or source builds and Web uses npm or a standalone runtime.', 'Prebuilt binaries', 'C ABI archives contain erika.h, licenses and MANIFEST.txt; Swift uses an XCFramework.', 'View GitHub Releases', 'Version 0.3.8 is on pub.dev: flutter pub add erika_flutter:^0.3.8', 'SwiftPM 0.3.8: in Xcode, add https://github.com/AimesSoft/liberika-swift', 'Swift integration guide', 'Version 0.3.8 is on OHPM: ohpm install erika@0.3.8. The integration guide covers native surfaces and frame scheduling.', 'OpenHarmony integration guide', 'The npm package @aimessoft/liberika-web 0.3.8 is published and needs no bundler configuration with Vite. You can also download liberika-web-0.3.8.zip and host it yourself. Live demo: liberika.aimes-soft.com/demo/', 'Web integration and live demo', 'This example uses Apple Metal. On Windows, Android and HarmonyOS, use the matching surface API.'],
      platforms: ['Seven native platforms, plus Web', 'Per-platform rendering and hardware decoding are handled inside the kernel. Web uses the JavaScript Player API and codec support depends on the browser.', 'Experimental'],
      docs: ['Into the archives', 'Find integration guides, kernel design, C ABI references and project resources here.', 'Guides', 'Kernel', 'Reference and project', ['Quick start', 'Flutter integration', 'Swift integration', 'OpenHarmony / OHPM', 'Rust integration', 'C ABI integration', 'Linux integration', 'Web / WASM integration'], ['Architecture overview', 'Hardware decoding', 'Zero-copy import', 'Rendering pipeline', 'High dynamic range', 'Neural upscaling', 'Subtitles and danmaku', 'Clock and scheduling'], ['C ABI overview', 'ErikaHandle', 'ErikaPresenterHandle', 'JSON bridge', 'Building and dependencies', 'Releases and artifacts', 'Contributing', 'Changelog']],
      closing: ['“GOOD! I am liberika, the fifth playback kernel in NipaPlay.”', '“Even counting you, there are only four playback kernels!”', 'Named after the detective Erika Furudo from Umineko When They Cry. Built for NipaPlay, and open-sourced as a standalone playback kernel.', 'Character illustration: w栗子w · used with permission'],
    },
    ja: {
      ui: { home: 'liberika ホーム', openMenu: 'メニューを開く', closeMenu: 'メニューを閉じる', navigation: 'メインナビゲーション', language: '言語', technologies: '関連技術', integration: '接続方法', copy: 'コピー', copied: 'コピーしました', copyFailed: 'コピー失敗', copyCode: 'コードをコピー', ready: '利用可能', planned: '予定', skip: '本文へ移動', title: 'liberika — 組み込み型再生カーネル', description: 'liberika 0.3.8 はネイティブアプリとブラウザー向けの組み込み型再生カーネルです。MKV、ASS 字幕、弾幕に対応。' },
      nav: ['機能', '導入', 'プラットフォーム', 'ドキュメント', 'オンラインデモ'],
      hero: ['再生は、', '彼女の推理にお任せ。', 'ネイティブアプリでもブラウザーでも、ホストが用意するのはサーフェスか Canvas だけ。デコード、同期、字幕、弾幕、描画はすべてカーネル内で処理します。', '導入する', 'ドキュメントを読む', 'ピンクと白のドレスを着た古戸ヱリカのイラスト', '実装言語', '対応プラットフォーム'],
      features: ['再生パイプラインは一つ', 'liberika はデコード、描画、字幕、弾幕をカーネル内でまとめて処理し、どのホストでも同じ再生動作を保ちます。', '一つの描画面', 'ホストはネイティブサーフェスまたはブラウザーの Canvas を渡し、カーネルが再生と合成を処理します。ネイティブでは HDR 出力にも対応します。', 'ゼロコピー経路', '対応環境ではハードウェアデコードしたフレームを直接 GPU テクスチャに取り込み、余分な CPU コピーを避けます。', '完全な再生スタック', 'ネイティブとブラウザーで libass 字幕と Rust 弾幕エンジンを共有。Web ではローカル MKV を ASS 効果やフォントとともに開けます。'],
      quick: ['最小限の手順で導入', 'ホスト環境に合わせて導入方法を選べます。Flutter は pub.dev、Swift は SwiftPM、OpenHarmony は OHPM を利用。その他のネイティブホストは GitHub Releases のビルド済み成果物、Linux は bundled / system パッケージまたはソース、Web は npm または独立ランタイムを利用します。', 'ビルド済み成果物', 'C ABI アーカイブには erika.h、ライセンス、MANIFEST.txt が含まれます。Swift は XCFramework を使用します。', 'GitHub Releases を見る', 'pub.dev 0.3.8 公開中：flutter pub add erika_flutter:^0.3.8。', 'SwiftPM 0.3.8：Xcode に https://github.com/AimesSoft/liberika-swift を追加。', 'Swift 導入ガイド', 'OHPM 0.3.8 公開中：ohpm install erika@0.3.8。ガイドにはネイティブサーフェスとフレームスケジューリングの例があります。', 'OpenHarmony 導入ガイド', 'npm パッケージ @aimessoft/liberika-web 0.3.8 を公開しています。Vite などのバンドラーは設定不要です。liberika-web-0.3.8.zip をダウンロードして自分で配信することもできます。オンラインデモ：liberika.aimes-soft.com/demo/', 'Web 導入とオンラインデモ', '例は Apple Metal 用です。Windows、Android、HarmonyOS では各プラットフォームのサーフェス API を使用します。'],
      platforms: ['7 つのネイティブプラットフォームと Web', '各プラットフォームの描画とハードウェアデコード対応はカーネル内で完結します。Web は JavaScript Player API を使用し、コーデック対応はブラウザーに依存します。', '実験的'],
      docs: ['アーカイブへ', '導入ガイド、カーネル設計、C ABI リファレンス、プロジェクト資料をまとめています。', '導入ガイド', 'カーネル', 'リファレンスとプロジェクト', ['クイックスタート', 'Flutter 組み込み', 'Swift 導入', 'OpenHarmony / OHPM', 'Rust 組み込み', 'C ABI 組み込み', 'Linux 導入', 'Web / WASM 導入'], ['アーキテクチャ', 'ハードウェアデコード', 'ゼロコピー取り込み', '描画パイプライン', '高ダイナミックレンジ', 'ニューラル超解像', '字幕と弾幕', 'クロックとスケジューリング'], ['C ABI 概要', 'ErikaHandle', 'PresenterHandle', 'JSON bridge', 'ビルドと依存関係', 'リリースと成果物', '貢献ガイド', '変更履歴']],
      closing: ['「GOOD！ 私は liberika、NipaPlay の 5 番目の再生カーネルです。」', '「あなたを数えても、再生カーネルは 4 つしかありません！」', '名前の由来は『うみねこのなく頃に』の探偵、古戸ヱリカ。NipaPlay のために作った再生カーネルを、単体でも使える形で公開しています。', 'キャラクターイラスト：w栗子w · 作者の許可を得て使用'],
    },
  };
  app.translations = translations;
  app.getLanguage = function () {
    try { const value = localStorage.getItem('liberika-language'); return translations[value] ? value : 'zh'; } catch { return 'zh'; }
  };
  app.localizeContent = function (base, lang) {
    const content = JSON.parse(JSON.stringify(base));
    const t = translations[lang];
    content.ui = t.ui;
    if (lang === 'zh') return content;
    content.navigation.forEach((item, i) => item.label = t.nav[i]);
    const h = t.hero;
    Object.assign(content.hero, { titleLead: h[0], titleAccent: h[1], description: h[2], characterAlt: h[5] });
    content.hero.primaryAction.label = h[3]; content.hero.secondaryAction.label = h[4];
    content.hero.facts.forEach((fact, i) => fact.label = h[i + 6]);
    const f = t.features;
    content.features.title = f[0]; content.features.lead = f[1];
    content.features.items.forEach((item, i) => { item.title = f[2 + i * 2]; item.text = f[3 + i * 2]; });
    const q = t.quick, tabs = content.quickStart.tabs;
    content.quickStart.title = q[0]; content.quickStart.lead = q[1];
    tabs[0].label = q[2]; tabs[0].note = q[3]; tabs[0].action.label = q[4];
    tabs[1].note = q[5]; tabs[2].note = q[6]; tabs[2].action.label = q[7];
    tabs[3].note = q[8]; tabs[3].action.label = q[9]; tabs[4].note = q[10]; tabs[4].action.label = q[11]; tabs[6].note = q[12];
    const comments = lang === 'en' ? [['放入 Widget 树', 'Add to the widget tree'], ['本地 File / Blob 或远程 URL', 'Local File / Blob or remote URL'], ['卸载时释放播放器', 'Release the player on unmount'], ['在每个显示帧回调中调用', 'Call in each display-frame callback']] : [['放入 Widget 树', 'ウィジェットツリーに配置'], ['本地 File / Blob 或远程 URL', 'ローカル File / Blob またはリモート URL'], ['卸载时释放播放器', 'アンマウント時にプレーヤーを解放'], ['在每个显示帧回调中调用', '各表示フレームのコールバックで呼び出す']];
    tabs.forEach(tab => comments.forEach(([from, to]) => tab.code = tab.code.replace(from, to)));
    content.platforms.title = t.platforms[0]; content.platforms.lead = t.platforms[1]; content.platforms.items.at(-1).statusLabel = t.platforms[2];
    content.docs.title = t.docs[0]; content.docs.lead = t.docs[1];
    content.docs.groups.forEach((group, i) => { group.title = t.docs[i + 2]; group.links.forEach((link, j) => link[0] = t.docs[i + 5][j]); });
    [content.closing.quote, content.closing.reply, content.closing.note, content.artworkCredit.label] = t.closing;
    const localizeLink = href => href.startsWith('docs/') ? href.replace(/\.html(?=($|#|\?))/, `.${lang}.html`) : href;
    content.hero.secondaryAction.href = localizeLink(content.hero.secondaryAction.href);
    tabs.forEach(tab => { if (tab.action) tab.action.url = localizeLink(tab.action.url); });
    content.docs.groups.forEach(group => group.links.forEach(link => link[1] = localizeLink(link[1])));
    return content;
  };
})(window.ErikaApp = window.ErikaApp || {});
