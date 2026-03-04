import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import AmplitudeProvider from "@/components/AmplitudeProvider";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "TVING - 스트리밍 서비스",
  description: "좋아하는 콘텐츠를 언제 어디서나 즐기세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Script
        src="https://cdn.amplitude.com/script/ba621d8cbeb865c11fef1b115063ae2a.experiment.js"
        strategy="beforeInteractive"
      />
      <body className={`${notoSansKR.className} antialiased bg-[#0f0f0f] text-white`}>
        <AmplitudeProvider />
        <AppProvider>
          <Header />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
