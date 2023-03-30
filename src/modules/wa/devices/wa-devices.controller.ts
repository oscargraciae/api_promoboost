import { Request, Response, NextFunction } from 'express'
import WhatsAppConnection from '../../../services/whatsapp.service'
// import { WADeviceService } from './wa-devices.service'

export class WADevicesController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { device } = req.body

      // const wa = new WhatsAppConnection('testuno2018', device, res)
      const wa = new WhatsAppConnection('token', res)
      let session = await wa.getSessionUser()

      if (session === null) {
        session = await wa.createSession()
      }

      res.json({ device, message: 'session conected', session })
    } catch (error) {
      next(error)
    }
  }

  static async sendMessage (req: Request, res: Response, next: NextFunction) {
    try {
      const { device, message } = req.body

      const wa = new WhatsAppConnection('token', res)
      let session = await wa.getSessionUser()

      if (session === null) {
        session = await wa.createSession()
      }

      session.sendMessage('15550246501@c.us', { text: message })

      res.json({ device, message, session })
    } catch (error) {
      next(error)
    }
  }

  static async isAuth (req: Request, res: Response, next: NextFunction) {
    try {
      const { device } = req.body

      const wa = new WhatsAppConnection('token', res)
      const session = await wa.getSessionUser()

      if (session === null) {
        return res.json({ isAuth: false, device, message: 'session disconected', session })
      }

      return res.json({ isAuth: true, device, message: 'session conected', session })
    } catch (error) {
      next(error)
    }
  }
}
