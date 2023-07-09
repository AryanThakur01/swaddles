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

// -------------------------------------------------------------
export interface ICustomRequest extends Request {
  payload?: string | JwtPayload
}
