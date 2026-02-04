// 로그인 페이지
// shadcn/ui 기반 로그인 폼을 중앙에 배치
// 뒤로가기 버튼 포함

'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    // 전체 화면 보라색 그라디언트 배경
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 뒤로가기 버튼 */}
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-4 text-white hover:bg-white/20 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </Link>

        {/* 로그인 카드 */}
        <Card className="shadow-2xl fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              계정에 로그인하거나 새로운 계정을 만드세요
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        {/* 추가 정보 */}
        <p className="text-center text-white/80 text-sm mt-4">
          이 페이지는 React Hook Form + Zod로 구현되었습니다
        </p>
      </div>
    </div>
  );
}
