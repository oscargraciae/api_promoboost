import { NextFunction, Request, Response } from 'express'

export function logErrors (err: any, _req: Request, _res: Response, next: NextFunction) {
  next(err)
}

export function errorHandler (err: any, _req: Request, res: Response, _next: NextFunction) {
  res.status(500).json({ message: err.message })
}
