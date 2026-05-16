'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createQuiz } from '@/services/api'
import QuestionField, { QuestionFormData } from '@/components/QuetsionField'

const emptyQuestion = (): QuestionFormData => ({
  text: '',
  type: 'boolean',
  options: [],
})

export default function CreatePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<QuestionFormData[]>([
    emptyQuestion(),
  ])

  const handleQuestionChange = (index: number, updated: QuestionFormData) => {
    setQuestions(questions.map((q, i) => (i === index ? updated : q)))
  }

  const handleQuestionRemove = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!title.trim() || questions.length === 0) return

    await createQuiz({
      title,
      questions: questions.map((q) => ({
        text: q.text,
        type: q.type,
        options: q.type === 'checkbox' ? q.options : undefined,
      })),
    })

    router.push('/quizzes')
  }

  return (
    <main className="max-w-xl">
      <h1 className="text-xl font-bold">Create Quiz</h1>

      <input
        type="text"
        placeholder="Quiz title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border"
      />

      <div className="space-y-4">
        {questions.map((q, index) => (
          <QuestionField
            key={index}
            index={index}
            question={q}
            onChange={handleQuestionChange}
            onRemove={handleQuestionRemove}
          />
        ))}
      </div>

      <button
        onClick={() => setQuestions([...questions, emptyQuestion()])}
        className="w-full border-2 border-dashed text-gray-500 hover:text-gray-700"
      >
        Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
      >
        Create Quiz
      </button>
    </main>
  )
}
