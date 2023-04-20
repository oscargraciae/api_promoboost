import { Request, Response, NextFunction } from 'express'
import { ContactService } from '../../contacts/contacts.service'

export class PublicContactsController {
  public static async createContact (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req.user
      const { firstName, lastName, phone, email, listId } = req.body

      await new ContactService(schemakey).create({ firstName, lastName, phone, email, lists: [listId] })

      res.status(201).json({ message: 'Contact created successfully' })
    } catch (error) {
      next(error)
    }
  }
}
