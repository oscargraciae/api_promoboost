import { Model, DataTypes, Sequelize } from 'sequelize'

export const TABLE_NAME = 'accounts'

export interface AccountAttributes {
  id?: number
  name?: string
  schemakey?: string
  phone?: string
  isActive?: boolean
  googleToken?: string
}

export class Account extends Model<AccountAttributes> implements AccountAttributes {
  declare id: number
  declare name: string
  declare schemakey: string
  declare phone: string
  declare isActive: boolean
  declare googleToken: string

  declare static associations: {}

  static start (sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      schemakey: {
        type: DataTypes.STRING,
        unique: {
          name: 'uniqueKey',
          msg: 'This schema key is already in use. '
        }
      },
      phone: {
        type: DataTypes.STRING
      },
      googleToken: {
        type: DataTypes.TEXT,
        field: 'google_token'
      }
    }, {
      sequelize,
      tableName: TABLE_NAME,
      schema: 'public'
    })
  }

  static associate () {}
}
