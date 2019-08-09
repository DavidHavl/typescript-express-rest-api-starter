import { NextFunction, Request, Response } from 'express'

const halContentType = function (req: Request, res: Response, next: NextFunction): void {
  res.header('Content-Type', 'application/hal+json')
  next()
}

export default halContentType
