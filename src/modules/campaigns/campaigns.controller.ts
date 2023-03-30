import { Request, Response, NextFunction } from 'express'
import WhatsAppConnection from '../../services/whatsapp.service'

export class CampaignsController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { contacts, message }: any = req.body

      const wa = new WhatsAppConnection('token', res)
      let session = await wa.getSessionUser()

      if (session === null) {
        session = await wa.createSession()
      }

      if (contacts.length > 0) {
        contacts.forEach((contact: { firstName: string, phone: string }) => {
          session.sendMessage(`${contact?.phone}@c.us`, { text: `Hola ${contact.firstName} - ${message as string}` })
        })
      }

      // 8123203436
      // session.sendMessage('15550246501@c.us', { text: message })

      res.json({ message, contacts })
    } catch (error) {
      next(error)
    }
  }
}
