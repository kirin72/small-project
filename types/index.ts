// 프로젝트 전체에서 사용하는 TypeScript 타입 정의

/**
 * 투두 아이템 타입
 * - id: 고유 식별자 (타임스탬프 사용)
 * - text: 투두 내용
 * - completed: 완료 여부
 */
export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * 로그인 폼 데이터 타입
 * - email: 사용자 이메일
 * - password: 사용자 비밀번호
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * 앱 카드 타입 (메인 페이지에서 사용)
 * - title: 앱 이름
 * - description: 앱 설명
 * - href: 라우팅 경로
 * - icon: Lucide 아이콘 컴포넌트
 * - gradient: 그라디언트 색상 (from-color to-color)
 */
export interface AppCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}
