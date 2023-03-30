import { Model, DataTypes, Sequelize } from 'sequelize'

export const TABLE_NAME = 'contacts'

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
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        validate: {
          len: {
            args: [1, 150],
            msg: 'Nombre obligatorio. '
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        unique: {
          name: 'uniqueKey',
          msg: 'Este número de teléfono ya está registrado.'
        }
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
