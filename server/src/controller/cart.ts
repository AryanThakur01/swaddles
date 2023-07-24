import expressAsyncHandler from 'express-async-handler'
import { ICart, ICustomRequest } from '../config/Interfaces'
import { Response } from 'express'
import Cart from '../models/cart'

export const AddToCart = expressAsyncHandler(
  async (req: ICustomRequest, res: Response) => {
    const { item, quantity }: ICart = req.body
    const { payload } = req

    let userId: string
    if (!payload || typeof payload === 'string')
      throw new Error('Improper Payload Recieved')

    if (quantity <= 0) throw new Error('Quantity should be positive only')

    userId = payload._id

    const filter = { user: userId, item }
    const update = { quantity }
    const options = {
      new: true,
      upsert: true,
      runValidators: true,
    }
    const cart = await Cart.findOneAndUpdate(filter, update, options)
    res.status(200).json({ ...cart })
  }
)

export const GetCart = expressAsyncHandler(
  async (req: ICustomRequest, res: Response) => {
    const { payload } = req

    if (!payload || typeof payload === 'string')
      throw new Error('Improper Payload Recieved')

    const filter = { user: payload._id }
    const cart = await Cart.find(filter).populate('item')

    res.status(200).json(cart)
  }
)
