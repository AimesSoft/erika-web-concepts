import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Erika — 让每一帧，抵达真相",
    description: "NipaPlay 自研的 Rust 跨平台播放内核：硬件解码、零拷贝渲染、HDR、AI 动漫超分、字幕与弹幕合成。",
    keywords: ["Erika", "NipaPlay", "Rust", "媒体播放", "Flutter", "播放器内核"],
    icons: {
      icon: "/og.png",
      shortcut: "/og.png",
    },
    openGraph: {
      title: "Erika — 让每一帧，抵达真相",
      description: "NipaPlay 自研的 Rust 跨平台播放内核。",
      type: "website",
      locale: "zh_CN",
      siteName: "Erika",
      images: [{ url: `${origin}/og.png`, width: 1659, height: 948, alt: "Erika 项目官网" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Erika — 让每一帧，抵达真相",
      description: "NipaPlay 自研的 Rust 跨平台播放内核。",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
