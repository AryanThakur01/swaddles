import { Request, Response } from 'express'

export const testAuth = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the auth api' })
}

export const register = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Registered Successfully' })
}

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged In Successfully' })
}
