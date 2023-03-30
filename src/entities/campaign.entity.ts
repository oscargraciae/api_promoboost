import { Model, DataTypes, Sequelize } from 'sequelize'

export const TABLE_NAME = 'campaigns'

export interface IContact {
  id?: number
  firstName?: string
  lastName?: string
  phone?: string
  isActive?: boolean
}

export class Contact extends Model<IContact> implements IContact {
  declare id: number
  declare firstName: string
  declare lastName: string
  declare phone: string
  declare isActive: boolean

  static start (sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
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
