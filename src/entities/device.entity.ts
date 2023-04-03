import { Model, DataTypes, Sequelize } from 'sequelize'
import { Account } from './account.entity'

export const TABLE_NAME = 'devices'

export interface IDevice {
  id?: number
  name: string
  phone?: string
  isActive?: boolean
  isConnected?: boolean
}

export class Device extends Model<IDevice> implements IDevice {
  declare id: number
  declare name: string
  declare phone: string
  declare isActive: boolean
  declare isConnected: boolean

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
        field: 'name',
        validate: {
          len: {
            args: [1, 150],
            msg: 'Nombre obligatorio. '
          }
        }
      },
      phone: {
        type: DataTypes.STRING,
        field: 'phone',
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      },
      isConnected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_connected'
      }
    }, {
      sequelize,
      tableName: TABLE_NAME,
      timestamps: true
    })
  }

  static associate () {
    this.belongsTo(Account, {
      foreignKey: {
        name: 'accountId',
        field: 'account_id'
      },
      as: 'account'
    })

    Account.hasMany(this, {
      foreignKey: {
        name: 'accountId',
        field: 'account_id'
      },
      as: 'devices'
    })
  }
}
