// 메인 랜딩 페이지
// 4개의 미니 앱 (로그인, 투두 리스트, 계산기, 문자 합치기) 카드 표시
// 기존 index.html을 Next.js로 변환

'use client';

import { LogIn, ListTodo, Calculator, Combine } from 'lucide-react';
import { AppCard } from '@/components/app-card';
import type { AppCardProps } from '@/types';

export default function HomePage() {
  // 앱 카드 데이터 배열
  const apps: AppCardProps[] = [
    {
      title: '로그인',
      description: 'shadcn/ui 기반 로그인 폼',
      href: '/login',
      icon: LogIn,
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: '투두 리스트',
      description: '할 일을 관리하고 완료 상태를 추적하세요',
      href: '/todo-list',
      icon: ListTodo,
      gradient: 'from-green-500 to-teal-600',
    },
    {
      title: '숫자 계산기',
      description: '간단한 덧셈과 곱셈 계산을 수행하세요',
      href: '/calculator',
      icon: Calculator,
      gradient: 'from-orange-500 to-red-600',
    },
    {
      title: '문자 합치기',
      description: '여러 문자를 하나로 합쳐보세요',
      href: '/combine',
      icon: Combine,
      gradient: 'from-pink-500 to-purple-600',
    },
  ];

  return (
    // 전체 화면 보라색 그라디언트 배경
    <div className="min-h-screen gradient-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Small Project
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            유용한 미니 앱 모음집
          </p>
        </header>

        {/* 앱 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, index) => (
            <div
              key={app.href}
              className="fade-in"
              style={{
                // 순차적으로 나타나는 애니메이션 (150ms 간격)
                animationDelay: `${index * 150}ms`,
              }}
            >
              <AppCard {...app} />
            </div>
          ))}
        </div>

        {/* 푸터 */}
        <footer className="text-center mt-16 text-white/80">
          <p className="text-sm">
            Next.js 15 + shadcn/ui로 제작되었습니다
          </p>
        </footer>
      </div>
    </div>
  );
}
