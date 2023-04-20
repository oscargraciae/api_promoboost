import { Response } from 'express'
import WhatsAppConnection from '../../../services/whatsapp.service'
import { CreateMessageDto } from './dto/create-message.dto'

export class MessageService {
  async create (createMessageDTO: CreateMessageDto, res: Response) {
    // const wa = new WhatsAppConnection('northware', '8123203436', res)
    const wa = new WhatsAppConnection('token', res)
    let session = await wa.getSessionUser()

    if (session === null) {
      session = await wa.createSession()
    }

    session.sendMessage('15550246501@c.us', { text: 'Mensaje de prueba' })
  }
}
