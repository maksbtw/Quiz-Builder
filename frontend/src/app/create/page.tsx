'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {createQuiz} from '@/services/api'
import QuestionField, {QuestionFormData} from '@/components/QuetsionField'
import Link from "next/link";

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
  const [error, setError] = useState<string | null>(null)

  const handleQuestionChange = (index: number, updated: QuestionFormData) => {
    setQuestions(questions.map((q, i) => (i === index ? updated : q)))
  }

  const handleQuestionRemove = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setError(null)

    if (!title.trim()) {
      setError('Quiz title is required')
      return
    }

    if (questions.length === 0) {
      setError('Add at least one question')
      return
    }

    for (const q of questions) {
      if (!q.text.trim()) {
        setError('All questions must have text')
        return
      }
      if (q.type === 'checkbox') {
        if (q.options.length < 2) {
          setError('Checkbox questions must have at least 2 options')
          return
        }
        if (q.options.some(opt => !opt.trim())) {
          setError('All options must have text')
          return
        }
      }
    }

    await createQuiz({
      title,
      questions: questions.map(q => ({
        text: q.text,
        type: q.type,
        options: q.type === 'checkbox' ? q.options : undefined,
      })),
    })

    router.push('/quizzes')
  }

  return (
    <main className="w-[50vw] mx-auto py-10 flex flex-col">
      <Link href="/quizzes" className="text-danger hover:underline">
        Back to quizzes
      </Link>

      <h1 className="text-2xl font-bold text-center py-10">Create Quiz</h1>

      {error && (
        <p className="text-danger text-sm pb-5">{error}</p>
      )}

      <input
        type="text"
        placeholder="Quiz title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mx-5 px-6 py-2 rounded border-2 border-border"
      />

      <div className="flex flex-col gap-5 my-10">
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
        className="mb-2 px-6 py-2 rounded border-2 border-dotted border-border"
      >
        Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="bg-primary text-surface rounded hover:bg-primary-hover py-2 px-6"
      >
        Create Quiz
      </button>
    </main>
  )
}
