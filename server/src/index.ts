import { config } from 'dotenv'
import express from 'express'
// ------------------ Calling the routes --------------------
import notFound from './middleware/notFound'
import authRouter from './routes/auth'
import connectDb from './config/db'
// ----------------------------------------------------------

const app = express()
config()

// --------------------- End Points -------------------------
app.use('/api/v1/auth', authRouter)
app.use(notFound)
// ----------------------------------------------------------

// ------------------Starting The Server---------------------
const PORT: number = Number(process.env.PORT) || 5001
const MONGO_URI: string | undefined = process.env.MONGO_URI
const start = () => {
  try {
    connectDb(MONGO_URI)
    app.listen(PORT, () => console.log(`Backend running at port: ${PORT}`))
  } catch (error) {
    console.log(error)
    console.log('POSSIBLE FIXES:')
    console.log('Recheck The MONGO_URI used')
    console.log('Check whether your environment variables are set')
    console.log('Check if the PORT you are using is free')
  }
}
start()
// ----------------------------------------------------------
