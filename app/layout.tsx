// Next.js 루트 레이아웃 컴포넌트
// 모든 페이지에 공통으로 적용되는 HTML 구조와 메타데이터 정의

import type { Metadata } from 'next';
import './globals.css';

// 페이지 메타데이터 (SEO, 브라우저 탭 제목 등)
export const metadata: Metadata = {
  title: 'Small Project - 미니 앱 컬렉션',
  description: '투두 리스트, 계산기, 문자 합치기 등 유용한 미니 앱 모음',
  keywords: ['투두', '계산기', '미니앱', 'Next.js'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {/* 자식 컴포넌트 (페이지들)가 렌더링되는 영역 */}
        {children}
      </body>
    </html>
  );
}
