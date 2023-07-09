import connectDb from '../config/db'
import { config } from 'dotenv'
import Products from '../models/products'
import productList from './populate.json'
import { application } from 'express'
config()

const populate = async () => {
  productList.forEach((element) => {
    Products.create(element)
  })
  console.log('population Successful')
}

const start = async () => {
  await connectDb(process.env.MONGO_URI)
  application.listen(5000, () => {
    console.log('port running on port', 5000)
  })
  populate()
}

start()
