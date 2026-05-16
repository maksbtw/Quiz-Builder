'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Quiz, getQuiz } from '@/services/api'

export default function QuizDetailPage() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [boolAnswers, setBoolAnswers] = useState<Record<number, boolean>>({})
  const [checkAnswers, setCheckAnswers] = useState<Record<number, string[]>>({})

  useEffect(() => {
    getQuiz(Number(id)).then(setQuiz)
  }, [id])

  if (!quiz) return <p className="p-6">Loading...</p>

  return (
    <main className="w-[50vw] mx-auto py-10">
      <Link href="/quizzes" className="text-danger hover:underline">
        Back to quizzes
      </Link>

      <h1 className="text-2xl font-bold text-center py-10">{quiz.title}</h1>

      <ul className="space-y-4">
        {quiz.questions?.map((q, index) => (
          <li key={q.id} className="border rounded p-4">
            <p className="font-medium mb-2">
              {index + 1}. {q.text}
            </p>

            {q.type === 'boolean' && (
              <div className="flex gap-4">
                {[true, false].map(val => (
                  <label key={String(val)} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`bool-${q.id}`}
                      checked={boolAnswers[q.id] === val}
                      onChange={() => setBoolAnswers(prev => ({ ...prev, [q.id]:
                        val }))}
                    />
                    {val ? 'True' : 'False'}
                  </label>
                ))}
              </div>
            )}

            {q.type === 'input' && (
              <input
                className="border-b w-48 text-sm text-gray-400"
                placeholder="short text"
              />
            )}

            {q.type === 'checkbox' && (
              <ul className="space-y-1">
                {JSON.parse(q.options || '[]').map((opt: string) => (
                  <li key={opt}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkAnswers[q.id]?.includes(opt) ?? false}
                        onChange={() =>
                          setCheckAnswers(prev => ({
                            ...prev,
                            [q.id]: (prev[q.id] ?? []).includes(opt)
                              ? (prev[q.id] ?? []).filter(o => o !== opt)
                              : [...(prev[q.id] ?? []), opt],
                          }))
                        }
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
