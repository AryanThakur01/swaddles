import { NextFunction } from 'express'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { ICustomRequest } from '../config/Interfaces'

const authentication = expressAsyncHandler(
  async (req: ICustomRequest, _, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer'))
      throw new Error('Invalid Authentication')
    const token: string = authHeader.split(' ')[1]
    try {
      const jwtSecret: string | undefined = process.env.JWT_SECRET || undefined
      if (!jwtSecret) {
        throw new Error('Environment Variables Fault')
      }
      const payload = jwt.verify(token, jwtSecret)
      req.payload = payload
      next()
    } catch (error) {
      throw new Error('Not authorized for this feature')
    }
  }
)

export default authentication
