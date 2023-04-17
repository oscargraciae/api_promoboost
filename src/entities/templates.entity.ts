import { Model, DataTypes, Sequelize } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

export const TABLE_NAME = 'templates'

export interface TemplatesAttributes {
  id?: number
  name?: string
  message?: string
  image?: string
  video?: string
  type?: string
  key?: string
  isActive?: boolean
}

export class Templates extends Model<TemplatesAttributes> implements TemplatesAttributes {
  declare id: number
  declare name: string
  declare message: string
  declare image: string
  declare video: string
  declare type: string
  declare key: string
  declare isActive: boolean

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
        type: DataTypes.STRING,
        field: 'name'
      },
      message: {
        type: DataTypes.TEXT
      },
      image: {
        type: DataTypes.STRING
      },
      video: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      key: {
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      }
    }, {
      sequelize,
      tableName: TABLE_NAME,
      timestamps: true,
      hooks: {
        afterValidate: async (template: any) => {
          template.key = uuidv4()
        }
      }

    })
  }

  static associate () {}
}
