import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

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

// -------------------------------------------------------------

// ---------------------- Custom Request -----------------------
export interface ICustomRequest extends Request {
  payload?: string | JwtPayload
}
// -------------------------------------------------------------
