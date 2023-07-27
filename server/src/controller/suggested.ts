import expressAsyncHandler from 'express-async-handler'
import { Response } from 'express'
import Products from '../models/products'

export const getAllHomePageData = expressAsyncHandler(
  async (_, res: Response) => {
    const carouselData = await Products.find({
      is_SWD_Advantage_product: true,
      product_rating: '5',
      overall_rating: '5',
      discounted_price: { $lt: 500 },
      brand: { $ne: '' },
    })

    res.status(200).json({ carouselData })
  }
)
