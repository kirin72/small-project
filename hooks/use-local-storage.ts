// SSR 환경에서 안전하게 localStorage를 사용하기 위한 커스텀 훅
// Next.js는 서버에서 먼저 렌더링하므로 window 객체가 없음
// useEffect를 사용하여 클라이언트에서만 localStorage 접근

'use client';

import { useState, useEffect } from 'react';

/**
 * localStorage에 값을 저장하고 불러오는 커스텀 훅
 * @param key - localStorage 키
 * @param initialValue - 초기값 (localStorage에 값이 없을 때 사용)
 * @returns [storedValue, setValue] - 저장된 값과 값을 변경하는 함수
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // 초기값으로 시작 (서버 렌더링 시)
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 컴포넌트 마운트 시 localStorage에서 값 불러오기
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('localStorage 로드 실패:', error);
    }
  }, [key]);

  // 값을 변경하고 localStorage에 저장하는 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 함수형 업데이트 지원 (예: setValue(prev => prev + 1))
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // 상태 업데이트
      setStoredValue(valueToStore);

      // localStorage에 저장
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('localStorage 저장 실패:', error);
    }
  };

  return [storedValue, setValue];
}
