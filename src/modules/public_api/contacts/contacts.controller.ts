import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../config/constants'
import { ContactService } from '../../contacts/contacts.service'

export class PublicContactsController {
  public static async createContact (req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, phone, email, listId, token } = req.body

      if (!token) throw new Error('Token not found')
      if (!firstName || !lastName || !phone || !email || !listId) throw new Error('Missing fields')

      const { schemakey }: any = jwt.verify(token, SECRET_KEY)

      await new ContactService(schemakey).create({ firstName, lastName, phone, email, lists: [listId] })

      res.status(201).json({ message: 'Contact created successfully' })
    } catch (error) {
      next(error)
    }
  }
}
