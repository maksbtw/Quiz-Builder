import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import quizzesRoutes from './routes/quizzes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/quizzes', quizzesRoutes)

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`)
})
