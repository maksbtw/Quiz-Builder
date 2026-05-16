'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Quiz, getQuizzes, deleteQuiz } from '@/services/api'

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    getQuizzes().then(setQuizzes)
  }, [])

  const handleDelete = async (id: number) => {
    await deleteQuiz(id)
    setQuizzes(quizzes.filter((q) => q.id !== id))
  }

  return (
    <main className="w-[50vw] mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <Link
          href="/create"
          className="bg-primary text-surface rounded hover:bg-primary-hover py-2 px-6"
        >
          + Create Quiz
        </Link>
      </div>

      <ul className="space-y-3">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="flex items-center rounded text-surface h-25 bg-primary hover:bg-primary-hover"
          >
            <Link
              href={`/quizzes/${quiz.id}`}
              className="flex flex-col w-full px-6 py-4"
            >
              <span className="text-xl font-bold hover:underline">
                {quiz.title}
              </span>
              <span>
                {quiz._count?.questions} questions
              </span>
            </Link>
            <button
              onClick={() => handleDelete(quiz.id)}
              className="h-full px-6 font-bold rounded bg-danger cursor-pointer hover:bg-danger-hover"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
