import { Model, DataTypes, Sequelize } from 'sequelize'
import { Campaign } from './campaign.entity'
import { Contact } from './contact.entity'

export const TABLE_NAME = 'campaign_contacts'

export interface ICampaignContact {
  id?: number
  deliveryDate?: Date
  deliveryStatus?: string

  contactId?: number
  campaignId?: number
}

export class CampaignContact extends Model<ICampaignContact> implements ICampaignContact {
  declare id: number
  declare deliveryDate: Date
  declare deliveryStatus: string

  declare contactId: number
  declare campaignId: number

  static start (sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      deliveryDate: {
        type: DataTypes.DATE,
        field: 'delivery_date'
      },
      deliveryStatus: {
        type: DataTypes.STRING,
        field: 'delivery_status'
      },

      contactId: {
        type: DataTypes.INTEGER,
        field: 'contact_id'
      },
      campaignId: {
        type: DataTypes.INTEGER,
        field: 'campaign_id'
      }
    }, {
      sequelize,
      tableName: TABLE_NAME,
      timestamps: true
    })
  }

  static associate () {
    this.belongsTo(Contact, {
      foreignKey: {
        name: 'contactId',
        field: 'contact_id'
      }
    })

    this.belongsTo(Campaign, {
      foreignKey: {
        name: 'campaignId',
        field: 'campaign_id'
      }
    })

    Campaign.hasMany(this, {
      foreignKey: {
        name: 'campaignId',
        field: 'campaign_id'
      },
      as: 'campaignContacts'
    })

    Contact.hasMany(this, {
      foreignKey: {
        name: 'contactId',
        field: 'contact_id'
      },
      as: 'campaignContacts'
    })
  }
}
