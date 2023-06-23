import { NextFunction, Request, Response } from 'express'

const errorHandlerMiddleware = (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    message:
      err.message.split(':')[0] ||
      'Some Error Occurred, check {error_handler middleware}',
    statusCode: err.statusCode || err.code,
  }
  res.status(201).json(customError)
}

export default errorHandlerMiddleware
