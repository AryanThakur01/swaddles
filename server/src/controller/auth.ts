import { Request, Response } from 'express'
import User from '../models/users'
import asyncHandler from 'express-async-handler'

export const testAuth = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the auth api' })
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.create(req.body)
  res.status(200).json({ ...user })
})

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged In Successfully' })
}
