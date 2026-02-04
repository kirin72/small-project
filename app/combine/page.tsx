// 문자 합치기 페이지
// 기존 combine.html을 Next.js + TypeScript로 변환
// 여러 문자를 입력받아 하나로 합치는 기능

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CombinePage() {
  // 입력 문자열 배열 (최대 10개)
  const [inputs, setInputs] = useState<string[]>(Array(10).fill(''));

  // 합쳐진 결과
  const [result, setResult] = useState<string>('');

  // 특정 인덱스의 입력 값 변경
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // 문자 합치기
  const handleCombine = () => {
    // 빈 문자열이 아닌 것만 필터링하여 합치기
    const filtered = inputs.filter((input) => input.trim() !== '');

    if (filtered.length === 0) {
      alert('최소 하나의 문자를 입력해주세요!');
      return;
    }

    const combined = filtered.join('');
    setResult(combined);
  };

  // 초기화
  const handleReset = () => {
    setInputs(Array(10).fill(''));
    setResult('');
  };

  // 입력된 문자 개수
  const filledCount = inputs.filter((input) => input.trim() !== '').length;

  return (
    <div className="min-h-screen gradient-bg p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
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

        {/* 메인 카드 */}
        <Card className="shadow-2xl fade-in">
          <CardHeader>
            <CardTitle className="text-3xl text-center">문자 합치기</CardTitle>
            <p className="text-center text-muted-foreground mt-2">
              최대 10개의 문자를 입력하고 하나로 합쳐보세요
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 진행 상황 표시 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-center text-sm text-gray-600">
                입력된 문자: <span className="font-bold text-blue-600">{filledCount}</span> / 10
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(filledCount / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* 입력 필드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inputs.map((input, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`input-${index}`}>문자 {index + 1}</Label>
                  <Input
                    id={`input-${index}`}
                    type="text"
                    placeholder={`문자 ${index + 1}`}
                    value={input}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    maxLength={50}
                  />
                </div>
              ))}
            </div>

            {/* 버튼 그룹 */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCombine}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                합치기
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                초기화
              </Button>
            </div>

            {/* 결과 표시 */}
            {result && (
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg border-2 border-green-300 animate-in fade-in-50 duration-500">
                <p className="text-center text-gray-600 mb-2 font-semibold">
                  합쳐진 결과
                </p>
                <div className="bg-white p-4 rounded-lg shadow-inner">
                  <p className="text-2xl font-bold text-center text-gray-800 break-all">
                    {result}
                  </p>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>총 길이: <span className="font-bold">{result.length}</span>자</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {filledCount}개의 문자를 합쳤습니다
                  </p>
                </div>
              </div>
            )}

            {/* 안내 메시지 */}
            {!result && (
              <div className="text-center text-gray-500 py-4">
                문자를 입력하고 합치기 버튼을 클릭하세요
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
