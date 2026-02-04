// 투두 리스트 페이지
// 기존 todo-list.html을 Next.js + TypeScript로 변환
// localStorage를 사용하여 데이터 영구 저장

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { TodoItem } from '@/types';

export default function TodoListPage() {
  // localStorage에 투두 목록 저장 (키: 'todos')
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todos', []);

  // 새 투두 입력 상태
  const [newTodo, setNewTodo] = useState('');

  // 투두 추가 함수
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now(), // 고유 ID로 타임스탬프 사용
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo(''); // 입력 필드 초기화
    }
  };

  // 투두 삭제 함수
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 투두 완료 토글 함수
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Enter 키로 투두 추가
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // 통계 계산
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;

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
            <CardTitle className="text-3xl text-center">투두 리스트</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 투두 추가 입력 */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="새로운 할 일을 입력하세요..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addTodo} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* 통계 표시 */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{totalTodos}</p>
                <p className="text-sm text-gray-600">전체</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{completedTodos}</p>
                <p className="text-sm text-gray-600">완료</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{remainingTodos}</p>
                <p className="text-sm text-gray-600">남음</p>
              </div>
            </div>

            {/* 투두 목록 */}
            <div className="space-y-2">
              {todos.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  아직 투두가 없습니다. 위에서 추가해보세요!
                </p>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      todo.completed
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {/* 완료 체크 버튼 */}
                    <Button
                      variant={todo.completed ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => toggleTodo(todo.id)}
                      className={todo.completed ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      <Check className="w-4 h-4" />
                    </Button>

                    {/* 투두 텍스트 */}
                    <span
                      className={`flex-1 ${
                        todo.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {todo.text}
                    </span>

                    {/* 삭제 버튼 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
