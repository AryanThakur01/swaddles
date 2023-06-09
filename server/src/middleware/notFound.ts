import { Request, Response } from 'express'

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: `${req.url} Not Found` })
}

export default notFound
