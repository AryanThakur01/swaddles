import { config } from 'dotenv'
import express, { json } from 'express'
import cors from 'cors'
// ------------------ Calling the routes --------------------
import errorHandlerMiddleware from './middleware/error_handler'
import notFound from './middleware/notFound'
import authRouter from './routes/auth'
import userDataRouter from './routes/userData'
import productsRouter from './routes/products'
import cartsRouter from './routes/cart'
import suggestedRouter from './routes/suggested'
import connectDb from './config/db'
// ----------------------------------------------------------

const app = express()
config()
app.use(json())
app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
)

// --------------------- End Points -------------------------
app.use('/api/v1/suggested', suggestedRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/userdata', userDataRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/cart', cartsRouter)
// ----------------------------------------------------------

// --------------------- Middlewares ------------------------
app.use(errorHandlerMiddleware)
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
