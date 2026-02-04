// 숫자 계산기 페이지
// 기존 number_calculator.html을 Next.js + TypeScript로 변환
// 덧셈과 곱셈 계산 기능 제공

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, X, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CalculatorPage() {
  // 입력 숫자 상태
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');

  // 결과 상태
  const [result, setResult] = useState<number | null>(null);
  const [operation, setOperation] = useState<string>('');

  // 덧셈 계산
  const handleAdd = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      alert('올바른 숫자를 입력해주세요!');
      return;
    }

    setResult(n1 + n2);
    setOperation('덧셈');
  };

  // 곱셈 계산
  const handleMultiply = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      alert('올바른 숫자를 입력해주세요!');
      return;
    }

    setResult(n1 * n2);
    setOperation('곱셈');
  };

  // 초기화
  const handleReset = () => {
    setNum1('');
    setNum2('');
    setResult(null);
    setOperation('');
  };

  return (
    <div className="min-h-screen gradient-bg p-4 sm:p-8">
      <div className="max-w-xl mx-auto">
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
            <CardTitle className="text-3xl text-center">숫자 계산기</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 첫 번째 숫자 입력 */}
            <div className="space-y-2">
              <Label htmlFor="num1">첫 번째 숫자</Label>
              <Input
                id="num1"
                type="number"
                placeholder="숫자를 입력하세요"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* 두 번째 숫자 입력 */}
            <div className="space-y-2">
              <Label htmlFor="num2">두 번째 숫자</Label>
              <Input
                id="num2"
                type="number"
                placeholder="숫자를 입력하세요"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* 계산 버튼 */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                덧셈
              </Button>
              <Button
                onClick={handleMultiply}
                className="bg-green-500 hover:bg-green-600"
                size="lg"
              >
                <X className="w-5 h-5 mr-2" />
                곱셈
              </Button>
            </div>

            {/* 초기화 버튼 */}
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              초기화
            </Button>

            {/* 결과 표시 */}
            {result !== null && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border-2 border-purple-300 animate-in fade-in-50 duration-500">
                <p className="text-center text-gray-600 mb-2">{operation} 결과</p>
                <p className="text-4xl font-bold text-center text-purple-600">
                  {result.toLocaleString()}
                </p>
                <p className="text-center text-sm text-gray-500 mt-2">
                  {num1} {operation === '덧셈' ? '+' : '×'} {num2} = {result}
                </p>
              </div>
            )}

            {/* 안내 메시지 */}
            {result === null && (
              <div className="text-center text-gray-500 py-4">
                위에 두 숫자를 입력하고 계산 버튼을 클릭하세요
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
