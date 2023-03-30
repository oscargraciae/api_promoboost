import { Request, Response, NextFunction } from 'express'
import { IntegrationService } from './integrations.service'

export class IntegrationsController {
  static async authGoogle (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const resp = await new IntegrationService(schemakey).authGoogle()

      res.json(resp)
    } catch (error) {
      next(error)
    }
  }

  static async saveGoogleToken (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const { code } = req?.query

      console.log('code', code)
      const resp = await new IntegrationService(schemakey).saveGoogleToken(code as string)

      res.json({ resp })
    } catch (error) {
      next(error)
    }
  }

  static async importGoogleContacts (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const resp = await new IntegrationService(schemakey).importGoogleContacts()

      res.json(resp)
    } catch (error) {
      next(error)
    }
  }
}
