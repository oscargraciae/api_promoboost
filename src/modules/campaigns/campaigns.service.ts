import { CampaignContact } from '../../entities/campaign-contact'
import { Campaign } from '../../entities/campaign.entity'
import { CreateCampaignContactDto } from './dto/create-campaign-contact'
import { CreateCampaignDto } from './dto/create-campaign.dto'

export class CampaignService {
  constructor (schemaKey: string) {
    this.schemakey = schemaKey
  }

  private readonly schemakey

  async create (createCampaignDTO: CreateCampaignDto) {
    return await Campaign.schema(this.schemakey).create(createCampaignDTO)
  }

  async getAll () {
    return await Campaign.schema(this.schemakey).findAll({
      include: [
        {
          model: CampaignContact.schema(this.schemakey),
          as: 'campaignContacts'
        }
      ],
      order: [
        ['id', 'DESC']
      ]
    })
  }

  createCampaignContact ({ campaignId, contactId, status, deliveryError }: CreateCampaignContactDto) {
    CampaignContact.schema(this.schemakey).create({
      deliveryDate: new Date(),
      deliveryStatus: status,
      contactId,
      campaignId,
      deliveryError
    }).then((campaignContact: any) => {
      console.log('Campaign Contact: ', campaignContact)
    }).catch((error: any) => {
      console.error('Error when creating campaign contact: ', error)
    })
  }
}
