import { Router, Request, Response } from "express";
import prisma from '../prisma/client'

const router = Router();

// GET /quizzes
router.get("/", async (req: Request, res: Response) => {
    const quizzes = await prisma.quiz.findMany({
        include: { _count: { select: { questions: true } } },
    })
    res.json(quizzes)
})

// GET /quizzes/:id
router.get('/:id', async (req: Request, res: Response) => {
    const quiz = await prisma.quiz.findUnique({
        where: { id: Number(req.params.id) },
        include: { questions: true },
    })
    if (!quiz) {
        res.status(404).json({ error: 'Quiz not found' })
        return
    }
    res.json(quiz)
})

// POST /quizzes


// DELETE /quizzes/:id
router.delete('/:id', async (req: Request, res: Response) => {
    await prisma.quiz.delete({
        where: { id: Number(req.params.id) },
    })
    res.status(204).send()
})

export default router