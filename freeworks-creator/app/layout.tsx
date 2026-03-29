import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FREEWORKS CREATOR — 크리에이터의 작품을 소장하다",
  description: "엄선된 크리에이터의 작품을 프리미엄 굿즈로 만나보세요. 소장 가치 있는 작품들을 하나의 컬렉션으로.",
  openGraph: {
    title: "FREEWORKS CREATOR",
    description: "크리에이터의 작품을 소장하다.",
    siteName: "Freeworks Creator",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  );
}
