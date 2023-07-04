import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const authentication = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
)

export default authentication
