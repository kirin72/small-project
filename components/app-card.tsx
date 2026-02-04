// 메인 페이지에서 사용하는 재사용 가능한 앱 카드 컴포넌트
// 각 미니 앱을 나타내는 카드로, 클릭 시 해당 앱 페이지로 이동

'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AppCardProps } from '@/types';

export function AppCard({ title, description, href, icon: Icon, gradient }: AppCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="card-hover card-active cursor-pointer overflow-hidden border-0 shadow-lg h-full">
        {/* 그라디언트 헤더 */}
        <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          {/* 아이콘 표시 */}
          <Icon className="w-16 h-16 text-white" />
        </div>

        {/* 카드 내용 */}
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">클릭하여 시작하기 →</p>
        </CardContent>
      </Card>
    </Link>
  );
}
