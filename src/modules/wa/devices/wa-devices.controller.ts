import { Request, Response, NextFunction } from 'express'
import WhatsAppConnection from '../../../services/whatsapp.service'
// import { WADeviceService } from './wa-devices.service'

export class WADevicesController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const wa = new WhatsAppConnection(schemakey, res)
      let session = await wa.getSessionUser()

      if (session === null) {
        session = await wa.createSession()
      }

      res.json({ message: 'session conected', session })
    } catch (error) {
      next(error)
    }
  }

  static async isAuth (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      console.log('schemakey', schemakey)
      const wa = new WhatsAppConnection(schemakey, res)
      let session = await wa.getSessionUser()

      console.log('session', session)
      if (session === null) {
        session = await wa.createSession()
        console.log('session 2 ==========', session)
        if (session === null) {
          return res.json({ isAuth: false, message: 'session disconected', session })
        }
      }

      return res.json({ isAuth: true, message: 'session conected', session })
    } catch (error) {
      next(error)
    }
  }

  static async getAuthSession (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const wa = new WhatsAppConnection(schemakey, res)
      const session = await wa.getSessionUser()

      if (session === null) {
        return res.json({ isAuth: false, message: 'session disconected', session })
      }

      return res.json({ isAuth: true, message: 'session conected', session })
    } catch (error) {
      next(error)
    }
  }
}
