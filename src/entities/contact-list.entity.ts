import { Model, DataTypes, Sequelize } from 'sequelize'
import { Contact } from './contact.entity'
import { List } from './list.entity'

export const TABLE_NAME = 'contact_lists'

export interface IContact {
  id?: number
  isActive?: boolean
  contactId?: number
  listId?: number
}

export class ContactList extends Model<IContact> implements IContact {
  declare id: number
  declare isActive: boolean

  declare contactId: number
  declare listId: number

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

  static associate () {
    this.belongsTo(Contact, {
      foreignKey: {
        name: 'contactId',
        field: 'contact_id'
      },
      as: 'contact'
    })

    this.belongsTo(List, {
      foreignKey: {
        name: 'listId',
        field: 'list_id'
      },
      as: 'list'
    })

    Contact.hasMany(this, {
      foreignKey: {
        name: 'contactId',
        field: 'contact_id'
      },
      as: 'contactLists'
    })

    List.hasMany(this, {
      foreignKey: {
        name: 'listId',
        field: 'list_id'
      },
      as: 'contactLists'
    })
  }
}
