'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Quiz, getQuiz } from '@/services/api'

export default function QuizDetailPage() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    getQuiz(Number(id)).then(setQuiz)
  }, [id])

  if (!quiz) return <p className="p-6">Loading...</p>

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/quizzes" className="text-blue-600 hover:underline">
        Back to quizzes
      </Link>

      <h1 className="text-2xl font-bold">{quiz.title}</h1>

      <ul className="space-y-4">
        {quiz.questions?.map((q, index) => (
          <li key={q.id} className="border rounded p-4">
            <p className="font-medium mb-2">
              {index + 1}. {q.text}
            </p>

            {q.type === 'boolean' && (
              <div className="flex gap-4 text-smtext-gray-600">
                <span>True</span>
                <span>False</span>
              </div>
            )}

            {q.type === 'input' && (
              <input
                className="border-b w-48 text-sm text-gray-400"
                placeholder="short text"
              />
            )}

            {q.type === 'checkbox' && (
              <ul className="text-sm text-gray-600 space-y-1">
                {JSON.parse(q.options || '[]').map((opt: string, i: number) => (
                  <li key={i}>☐ {opt}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
