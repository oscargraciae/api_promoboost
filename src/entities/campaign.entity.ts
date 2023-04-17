import { Model, DataTypes, Sequelize } from 'sequelize'
import { Templates } from './templates.entity'

export const TABLE_NAME = 'campaigns'

export interface ICampaign {
  id?: number
  name?: string
  description?: string
  message?: string
  messageType?: string
  messageImage?: string
  messageVideo?: string
  whatsappAccount?: string
  isActive?: boolean
  templateId?: number
}

export class Campaign extends Model<ICampaign> implements ICampaign {
  declare id: number
  declare name: string
  declare description: string
  declare message: string
  declare messageType: string
  declare messageImage: string
  declare messageVideo: string
  declare whatsappAccount: string
  declare isActive: boolean

  declare templateId: number

  static start (sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        field: 'name'
      },
      description: {
        type: DataTypes.STRING,
        field: 'description'
      },
      message: {
        type: DataTypes.TEXT,
        field: 'message'
      },
      messageType: {
        type: DataTypes.STRING,
        field: 'message_type'
      },
      messageImage: {
        type: DataTypes.STRING,
        field: 'message_image'
      },
      messageVideo: {
        type: DataTypes.STRING,
        field: 'message_video'
      },
      whatsappAccount: {
        type: DataTypes.STRING,
        field: 'whatsapp_account'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      },
      templateId: {
        type: DataTypes.INTEGER,
        field: 'template_id'
      }
    }, {
      sequelize,
      tableName: TABLE_NAME,
      timestamps: true
    })
  }

  static associate () {
    this.belongsTo(Templates, {
      foreignKey: {
        name: 'templateId',
        field: 'template_id'
      }
    })

    this.belongsTo(Campaign, {
      foreignKey: {
        name: 'campaignId',
        field: 'campaign_id'
      }
    })

    Templates.hasMany(this, {
      foreignKey: {
        name: 'templateId',
        field: 'template_id'
      },
      as: 'campaignContacts'
    })
  }
}
