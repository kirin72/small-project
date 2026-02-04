// Tailwind CSS 클래스를 병합하는 유틸리티 함수
// clsx: 조건부 클래스 이름 처리
// tailwind-merge: Tailwind 클래스 충돌 해결

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 여러 클래스 이름을 병합하고, Tailwind CSS 충돌을 자동으로 해결합니다.
 * 예: cn('px-2 py-1', 'px-4') => 'py-1 px-4' (px-4가 px-2를 덮어씀)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
