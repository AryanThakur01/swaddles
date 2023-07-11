import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import Products from '../models/products'

export const getAllProducts = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const products = await Products.find()
    res.status(200).json({ ...products })
  }
)

export const getSearchedProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { search } = req.query
    const productList = await Products.find({
      product_name: { $regex: search, $options: 'i' },
    })
    console.log(productList.length)
    res.status(200).json({ message: search })
  }
)
