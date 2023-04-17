import { Model, DataTypes, Sequelize } from 'sequelize'

export const TABLE_NAME = 'messages'

export interface MessageAttributes {
  id?: number
  message?: string
  from?: string
  to?: string
  status?: 'sent' | 'error' | 'delivered'
  errorMessage?: string
}

export class Message extends Model<MessageAttributes> implements MessageAttributes {
  declare id: number
  declare message: string
  declare from: string
  declare to: string
  declare status: 'sent' | 'error' | 'delivered'
  declare errorMessage: string

  declare static associations: {}

  static start (sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      message: {
        type: DataTypes.STRING
      },
      from: {
        type: DataTypes.STRING
      },
      to: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      errorMessage: {
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      tableName: TABLE_NAME
    })
  }

  static associate () {}
}
