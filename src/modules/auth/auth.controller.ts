import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'

export class AuthController {
  static async login (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const token = await new AuthService().auth({ email, password })

      res.json({ token })
    } catch (error) {
      next(error)
    }
  }
}
