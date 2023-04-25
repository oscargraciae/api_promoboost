import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Message } from '../../../entities/message.entity'

import { SECRET_KEY } from '../../../config/constants'
import { Templates } from '../../../entities/templates.entity'
import WhatsAppConnection from '../../../services/whatsapp.service'

export class MessageController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { templateId, phone, token }: { templateId: string, phone: string, token: string } = req.body

      if (!token) throw new Error('Token not found')
      if (!templateId || !phone) throw new Error('Template or phone not found')

      const { schemakey }: any = jwt.verify(token, SECRET_KEY)

      const wa = new WhatsAppConnection(schemakey, res)
      let session = await wa.getSessionUser()

      if (session === null) {
        session = await wa.createSession()
      }

      const template = await Templates.schema(schemakey).findOne({ where: { key: templateId } })

      if (!template) throw new Error('Template not found')

      let phoneToSend = phone

      if (phoneToSend.slice(0, 3) === '+52') {
        phoneToSend = phoneToSend.replace('+52', '+521')
      }

      if (phoneToSend[0] === '+') {
        phoneToSend = phoneToSend.replace('+', '')
      }

      const messageResponse = await Message.schema(schemakey).create({ message: template.message, to: phoneToSend, from: session?.user?.id, status: 'delivered' })

      await session.sendMessage(`${phoneToSend}@c.us`, { text: `${template.message}` })
        .then(() => {
          console.log('Message sent!')
          messageResponse.status = 'sent'
          void messageResponse.save()
        })
        .catch((error) => {
          console.error('Error when sending: ', error)
          messageResponse.status = 'error'
          messageResponse.errorMessage = error?.message
          void messageResponse.save()
        })

      res.json({ isSent: true, message: template.message, session })
    } catch (error) {
      next(error)
    }
  }

  static async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const { page }: { page?: number } = req.query

      const resp = await Message.schema(schemakey).findAll({ limit: 10, offset: page ? (page - 1) * 10 : 0 })

      res.json(resp)
    } catch (error) {
      next(error)
    }
  }
}
