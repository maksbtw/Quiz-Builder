const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface Question {
    id: number
    text: string
    type: 'boolean' | 'input' | 'checkbox'
    options: string | null
    correctAnswer: string | null
    quizId: number
}

export interface Quiz {
    id: number
    title: string
    createdAt: string
    _count?: { questions: number }
    questions?: Question[]
}

export interface CreateQuizPayload {
    title: string
    questions: {
        text: string
        type: 'boolean' | 'input' | 'checkbox'
        options?: string[]
        correctAnswer?: string | string[]
    }[]
}

export async function getQuizzes(): Promise<Quiz[]> {
    const res = await fetch(`${API_URL}/quizzes`)
    return res.json()
}

export async function getQuiz(id: number): Promise<Quiz> {
    const res = await fetch(`${API_URL}/quizzes/${id}`)
    return res.json()
}

export async function createQuiz(payload: CreateQuizPayload): Promise<Quiz> {
    const res = await fetch(`${API_URL}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    return res.json()
}

export async function deleteQuiz(id: number): Promise<void> {
    await fetch(`${API_URL}/quizzes/${id}`, { method: 'DELETE' })
}