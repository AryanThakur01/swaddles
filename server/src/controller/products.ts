import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import Products from '../models/products'

interface ISearchQuery {
  search?: string
  page?: string
  limit?: string
  filter?: string
}
interface ISingleProductQuery {
  _id?: string
}

export const getAllProducts = expressAsyncHandler(async (_, res: Response) => {
  const s = new Set()
  const products = await Products.find().sort({ _id: 1 })
  res.status(200).json({ ...products })
})

export const getSearchedProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let { search, page, limit, filter }: ISearchQuery = req.query
    if (!search) search = ''
    if (!page) page = '0'
    if (!limit) limit = '20'

    let skip = 0
    if (typeof page === 'string' && typeof limit === 'string')
      skip = (parseInt(page) - 1) * parseInt(limit)

    let productList
    if (filter !== 'null') {
      // console.log(filter)
      console.log(req.query)
      productList = await Products.find({
        $and: [
          {
            product_name: { $regex: search, $options: 'i' },
          },
          {
            product_category_tree: { $regex: filter, $options: 'i' },
          },
        ],
      }).sort({ product_rating: 1, _id: 1 })
    } else {
      productList = await Products.find({
        $or: [
          {
            product_name: { $regex: search, $options: 'i' },
          },
          {
            product_category_tree: { $regex: search, $options: 'i' },
          },
        ],
      }).sort({ product_rating: 1, _id: 1 })
    }
    const length = productList.length
    productList = productList.slice(skip, skip + parseInt(limit))

    res.status(200).json({ productList, length })
  }
)

export const getOneProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { _id }: ISingleProductQuery = req.query
    const product = await Products.find({ _id })
    res.status(200).json({ ...product[0] })
  }
)

export const getFilters = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { search } = req.query
    if (!search) throw new Error('Enter Search Value for filter')
    const products = await Products.find({
      $or: [
        {
          product_name: { $regex: search, $options: 'i' },
        },
        {
          product_category_tree: { $regex: search, $options: 'i' },
        },
      ],
    })
    let allFilters = []
    for (let i = products.length - 1; i >= 0; i--) {
      const categories = products[i].product_category_tree
      const filterList = categories
        .substring(2, categories.length - 2)
        .split(' >> ')
      allFilters.push(filterList)
    }
    res.status(200).json({ filters: allFilters })
  }
)
