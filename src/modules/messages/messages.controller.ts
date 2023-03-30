import { Request, Response, NextFunction } from 'express'
import { MessageService } from './messages.service'

export class MessageController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const message = await new MessageService().create({ content: 'Hola mundo!', to: '8123203436' }, res)
      res.json(message)
    } catch (error) {
      next(error)
    }
  }
}
