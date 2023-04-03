import { Request, Response, NextFunction } from 'express'
import { CampaignContact } from '../../entities/campaign-contact'
import WhatsAppConnection from '../../services/whatsapp.service'
import { CampaignService } from './campaigns.service'

export class CampaignsController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { contacts, message, name }: any = req.body
      const { schemakey }: any = req?.user

      const campaign = await new CampaignService(schemakey).create({ name, message })

      const wa = new WhatsAppConnection(schemakey, res)
      let session = await wa.getSessionUser()

      if (session === null) {
        session = await wa.createSession()
      }

      if (contacts.length > 0) {
        contacts.forEach((contact: { firstName: string, phone: string, id: number }) => {
          session.sendMessage(`${contact?.phone}@c.us`, { text: `${message as string}` }).then((result: any) => {
            console.log('Result: ', result)
            CampaignContact.schema(schemakey).create({
              deliveryDate: new Date(),
              deliveryStatus: 'sent',
              contactId: contact.id,
              campaignId: campaign.id
            }).then((campaignContact: any) => {
              console.log('Campaign Contact: ', campaignContact)
            }).catch((error: any) => {
              console.error('Error when creating campaign contact: ', error)
            })
          }).catch((error: any) => {
            CampaignContact.schema(schemakey).create({
              deliveryDate: new Date(),
              deliveryStatus: 'error',
              contactId: contact.id,
              campaignId: campaign.id
            }).then((campaignContact: any) => {
              console.log('Campaign Contact: ', campaignContact)
            }).catch((error: any) => {
              console.error('Error when creating campaign contact: ', error)
            })
            console.error('Error when sending: ', error)
          })
        })
      }
      res.json({ message, contacts })
    } catch (error) {
      next(error)
    }
  }

  static async findAll (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const campaigns = await new CampaignService(schemakey).getAll()
      res.json(campaigns)
    } catch (error) {
      next(error)
    }
  }
}
