import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import Products from '../models/products'

export const getProducts = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const products = await Products.find()
    res.status(200).json({ ...products })
  }
)
