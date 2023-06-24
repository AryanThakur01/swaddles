import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../config/Interfaces'

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    message:
      err.message.split(':')[0] ||
      'Some Error Occurred, check {error_handler middleware}',
    statusCode: err.statusCode || 500,
  }
  console.log(err)
  res.status(customError.statusCode).json(customError)
}

export default errorHandlerMiddleware
