import { Model, DataTypes, Sequelize } from 'sequelize'

export const TABLE_NAME = 'lists'

export interface IList {
  id?: number
  name: string
  description?: string
  color?: string
  isActive?: boolean
}

export class List extends Model<IList> implements IList {
  declare id: number
  declare name: string
  declare description: string
  declare color: string
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
        field: 'name',
        validate: {
          len: {
            args: [1, 150],
            msg: 'Nombre obligatorio. '
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        field: 'description',
        allowNull: true
      },
      color: {
        type: DataTypes.STRING,
        field: 'color',
        allowNull: true
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
