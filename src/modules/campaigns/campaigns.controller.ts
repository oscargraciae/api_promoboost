import { Request, Response, NextFunction } from 'express'
import { replaceTextByVariables } from '../../utils/messages_format'
import { Contact } from '../../entities/contact.entity'
import WhatsAppConnection from '../../services/whatsapp.service'
import { CampaignService } from './campaigns.service'

export class CampaignsController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { contactIds, message, name }: { contactIds: number[], message: string, name: string } = req.body
      const { schemakey }: any = req?.user

      const campaignService = new CampaignService(schemakey)

      const campaign = await campaignService.create({ name, message })

      const wa = new WhatsAppConnection(schemakey, res)
      let session = await wa.getSessionUser()

      if (session === null) {
        session = await wa.createSession()
      }

      const contactsSelected = await Contact.schema(schemakey).findAll({
        where: {
          isActive: true,
          id: contactIds.length === 0 ? { $ne: null } : contactIds
        }
      })

      contactsSelected.forEach((contact: { firstName: string, lastName: string, phone: string, id: number }) => {
        const formatedMessage = replaceTextByVariables(message, { firstName: contact.firstName, lastName: contact?.lastName })

        session.sendMessage(`${contact?.phone}@c.us`, { text: `${formatedMessage}` }).then((_result: any) => {
          campaignService.createCampaignContact({ campaignId: campaign.id, contactId: contact.id, status: 'success' })
        }).catch((_error: any) => {
          campaignService.createCampaignContact({ campaignId: campaign.id, contactId: contact.id, status: 'error', deliveryError: _error.message })
        })
      })

      res.json({ message })
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
