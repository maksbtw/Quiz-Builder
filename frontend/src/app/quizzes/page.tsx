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
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create Quiz
        </Link>
      </div>

      <ul className="space-y-3">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="flex justify-between items-center border gap-3"
          >
            <Link href={`/quizzes/${quiz.id}`} className="hover:underline">
              <span className="font-medium">{quiz.title}</span>
            </Link>
            <span className=" text-gray-500 ml-2">
              {quiz._count?.questions} questions
            </span>
            <button
              onClick={() => handleDelete(quiz.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
