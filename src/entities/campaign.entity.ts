import { Model, DataTypes, Sequelize } from 'sequelize'

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
        type: DataTypes.STRING,
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
      }
    }, {
      sequelize,
      tableName: TABLE_NAME,
      timestamps: true
    })
  }
}
