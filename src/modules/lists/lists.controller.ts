import { Request, Response, NextFunction } from 'express'
import { ListService } from './lists.service'

export class ListController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const listCreated = await new ListService(schemakey).create(req.body)
      res.json({ message: 'List created', listCreated })
    } catch (error) {
      next(error)
    }
  }

  static async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const lists = await new ListService(schemakey).getAll()
      res.json(lists)
    } catch (error) {
      next(error)
    }
  }

  static async addContactToList (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const { listId, contactId }: any = req.params

      const list = await new ListService(schemakey).addContactToList(listId, contactId)
      res.json(list)
    } catch (error) {
      next(error)
    }
  }
}
