import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'

export interface CustomError extends Error {
  statusCode?: number
  code?: number
}

export interface LoginData {
  username?: string
  email?: string
  password: string
}

// ------------------- Interfaces for Schemas ------------------
export interface IUser {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  address: string
  deliveryAddress?: string
  mobile: number
  mobileAlt?: number
}
export interface IUserMethods {
  checkPassword: (enteredPassword: string) => boolean
  createJWT: () => string
}

export interface IProducts {
  product_name: string
  product_category_tree: string
  pid: string
  retail_price: number
  discounted_price: number
  image: string
  is_SWD_Advantage_product: boolean
  description: string
  product_rating: string
  overall_rating: string
  brand: string
  product_specifications: string
}

export interface ICart {
  user: mongoose.Schema.Types.ObjectId
  item: mongoose.Schema.Types.ObjectId
  quantity: number
}
interface IOrderItem {
  order: mongoose.Schema.Types.ObjectId
  qty: number
}
export interface IOrder extends Omit<ICart, 'item' | 'quantity'> {
  username: string
  state: string
  postalCode: string
  city: string
  address: string
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
  Items: IOrderItem[]
  status: 'pending' | 'fulfilled' | 'active'
}

// -------------------------------------------------------------

// ---------------------- Custom Request -----------------------
export interface ICustomRequest extends Request {
  payload?: string | JwtPayload
}
// -------------------------------------------------------------
