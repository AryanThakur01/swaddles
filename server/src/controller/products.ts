import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import Products from '../models/products'

interface ISearchQuery {
  search?: string
  page?: string
  limit?: string
}

export const getAllProducts = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const s = new Set()
    const products = await Products.find().sort({ _id: 1 })
    // console.log(products)
    products.forEach((p) => {
      const split = p.product_category_tree.substring(
        2,
        p.product_category_tree.length - 2
      )
      // console.log(split)
      // const l = p.product_category_tree.split(' >> ')
      // l.forEach((category) => s.add(category))
    })
    // console.log(s)
    res.status(200).json({ ...products[1] })
    // res.status(200).json({ messsage: 'hello world' })
  }
)

export const getSearchedProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let { search, page, limit }: ISearchQuery = req.query
    if (!search) search = ''
    if (!page) page = '0'
    if (!limit) limit = '20'

    let skip = 0
    if (typeof page === 'string' && typeof limit === 'string')
      skip = (parseInt(page) - 1) * parseInt(limit)

    const productList = await Products.find({
      $or: [
        {
          product_name: { $regex: search, $options: 'i' },
        },
        {
          product_category_tree: { $regex: search, $options: 'i' },
        },
      ],
    })
      .sort({ _id: 1 })
      .skip(skip)
      .limit(parseInt(limit))

    res.status(200).json({ ...productList })
  }
)
