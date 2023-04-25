import { CampaignContact } from '../../entities/campaign-contact'
import { Campaign } from '../../entities/campaign.entity'
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
}
