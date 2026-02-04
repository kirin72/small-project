// React Hook Form + Zod를 사용한 로그인 폼 컴포넌트
// shadcn/ui 컴포넌트로 구성된 폼 UI
// 이메일 형식, 비밀번호 길이 등 폼 검증 기능 포함

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LogIn, UserPlus } from 'lucide-react';

// Zod 스키마 - 폼 검증 규칙 정의
const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(50, '비밀번호는 최대 50자까지 가능합니다.'),
});

// TypeScript 타입 추론
type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form 초기화
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // Zod 스키마로 검증
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 로그인 버튼 클릭 시 실행되는 함수
  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log('로그인 시도:', data);
      // TODO: 실제 로그인 API 호출
      alert(`로그인 시도\n이메일: ${data.email}`);
    } catch (error) {
      console.error('로그인 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 버튼 클릭 시 실행되는 함수
  const onSignupSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log('회원가입 시도:', data);
      // TODO: 실제 회원가입 API 호출
      alert(`회원가입 시도\n이메일: ${data.email}`);
    } catch (error) {
      console.error('회원가입 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* 이메일 입력 필드 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 비밀번호 입력 필드 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="최소 6자 이상"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* 로그인 버튼 */}
          <Button
            type="button"
            onClick={form.handleSubmit(onLoginSubmit)}
            disabled={isLoading}
            className="flex-1"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {isLoading ? '처리 중...' : '로그인'}
          </Button>

          {/* 회원가입 버튼 */}
          <Button
            type="button"
            onClick={form.handleSubmit(onSignupSubmit)}
            disabled={isLoading}
            variant="outline"
            className="flex-1"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            회원가입
          </Button>
        </div>
      </form>
    </Form>
  );
}
