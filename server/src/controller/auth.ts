import { Request, Response } from 'express'
import User from '../models/users'
import asyncHandler from 'express-async-handler'
import { IUser, LoginData } from '../config/Interfaces'

export const testAuth = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the auth api' })
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.create(req.body)
  const token: string = await user.createJWT()
  user.password = ''
  res.status(200).json({ user: user, token })
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password }: LoginData = req.body

  if (!username && !email) throw new Error('Enter Username Or Email')
  if (!password) throw new Error('Enter password')

  let user
  if (username) user = await User.findOne({ username })
  else user = await User.findOne({ email })

  if (!user) throw new Error('Not Registered')

  const passwordVerification: boolean = await user.checkPassword(password)
  if (!passwordVerification) throw new Error('Incorrect Password')

  const token: string = await user.createJWT()

  res.status(200).json({ user, token })
})
