import { Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import Razorpay from 'razorpay'
import Products from '../models/products'
import Orders from '../models/orders'
import { ICustomRequest } from '../config/Interfaces'

interface ICheckout {
  order: string
  qty: number
}
interface IDeliveryData {
  username: string
  address: string
  city: string
  state: string
  postaladdress: string
}

export const saveOrder = expressAsyncHandler(
  async (req: ICustomRequest, res: Response) => {
    const { shippingData, razorpayRes, order } = req.body
    const { payload } = req

    if (!payload || typeof payload === 'string')
      throw new Error('Improper Payload Recieved')

    const placedOrder = await Orders.create({
      ...shippingData,
      ...razorpayRes,
      Items: order,
      user: payload._id,
    })

    res.status(200).json({ placedOrder })
  }
)
export const checkoutUser = expressAsyncHandler(
  async (req: ICustomRequest, res: Response) => {
    const data = req.body
    const { payload } = req

    if (!payload || typeof payload === 'string')
      throw new Error('Improper Payload Recieved')

    let deliveryData: IDeliveryData = data.values
    // console.log(deliveryData)
    let order: ICheckout[] = data.order
    let total: number = 0

    let orderLen = order.length
    let idList = []
    for (let i = 0; i < orderLen; i++) idList.push(order[i].order)

    const products = await Products.find({ _id: { $in: [...idList] } }).select(
      '_id retail_price discounted_price'
    )

    for (let i = 0; i < orderLen; i++) {
      total +=
        (products[i].discounted_price || products[i].retail_price) *
        order.filter((item) => item.order === products[i].id)[0].qty
    }

    const razorpay = new Razorpay({
      key_id: process.env.KEY_ID || '',
      key_secret: process.env.KEY_SECRET || '',
    })
    const payment_capture = 1
    const amount = total
    const currency = 'INR'

    const options = {
      amount: amount * 100,
      currency,
      receipt: amount + '-' + payload._id.split(0).join('-'),
      payment_capture,
    }

    const response = await razorpay.orders.create(options)
    res.status(200).json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  }
)
