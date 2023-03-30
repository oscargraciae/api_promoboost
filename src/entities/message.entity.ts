import { Model, DataTypes, Sequelize } from 'sequelize'

export const TABLE_NAME = 'messages'

export interface MessageAttributes {
  id?: number
  message?: string
}

export class Message extends Model<MessageAttributes> implements MessageAttributes {
  declare id: number
  declare message: string

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
      }
    }, {
      sequelize,
      tableName: TABLE_NAME
    })
  }

  static associate () {}
}
