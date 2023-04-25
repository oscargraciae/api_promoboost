import { Request, Response, NextFunction } from 'express'
import WhatsAppConnection from '../../services/whatsapp.service'
import { ContactService } from './contacts.service'

export class ContactController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const resp = await new ContactService(schemakey).create({ ...req.body })

      res.json(resp)
    } catch (error) {
      next(error)
    }
  }

  static async getAll (req: Request, res: Response, next: NextFunction) {
    const { schemakey }: any = req?.user
    const { listId, page, name }: { listId?: string, page?: number, name?: string } = req.query

    const resp = await new ContactService(schemakey).getAll({ listId, page, name })

    res.json(resp)
  }

  static async getById (req: Request, res: Response, next: NextFunction) {
    const { schemakey }: any = req?.user
    const { id }: any = req.params

    const resp = await new ContactService(schemakey).getContactById(id)

    res.json(resp)
  }

  static async update (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const { id }: any = req.params

      await new ContactService(schemakey).updateContact(id, { ...req.body })

      res.json({ message: 'ok' })
    } catch (error) {
      next(error)
    }
  }

  static async delete (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const { id }: any = req.params

      await new ContactService(schemakey).deleteContact(id)

      res.json({ message: 'ok' })
    } catch (error) {
      next(error)
    }
  }

  static async getTotalContacts (req: Request, res: Response, next: NextFunction) {
    const { schemakey }: any = req?.user

    const resp = await new ContactService(schemakey).getTotalContacts()

    res.json(resp)
  }

  static async importWaContacts (req: Request, res: Response, next: NextFunction) {
    const { schemakey }: any = req?.user
    console.log('schemakey', schemakey)

    const wa = new WhatsAppConnection('token', res)
    let session = await wa.getSessionUser()

    if (session === null) {
      session = await wa.createSession()
    }

    res.json({ message: 'ok' })
  }
}
