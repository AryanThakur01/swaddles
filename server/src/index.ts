import { config } from 'dotenv'
import express from 'express'
// ------------------ Calling the routes --------------------
import notFound from './middleware/notFound'
import authRouter from './routes/auth'
// ----------------------------------------------------------

const app = express()
config()

// --------------------- End Points -------------------------
app.use('/api/v1/auth', authRouter)
app.use(notFound)
// ----------------------------------------------------------

// ------------------Starting The Server---------------------
const PORT: String | Number = process.env.PORT || 5001
const start = () => {
  app.listen(PORT, () => console.log(`Backend running at port: ${PORT}`))
}
start()
// ----------------------------------------------------------
