import { Model, DataTypes, Sequelize, Association } from 'sequelize'
import argon2 from 'argon2'
import { Account } from './account.entity'

export const TABLE_NAME = 'users'

export interface IUser {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  isActive?: boolean
  roleId?: number
  accountId?: number
}

export class User extends Model<IUser> implements IUser {
  declare id: number
  declare firstName: string
  declare lastName: string
  declare email: string
  declare password: string
  declare isActive: boolean
  declare roleId: number
  declare accountId: number

  declare static associations: {
    account: Association<User, Account>
  }

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
      email: {
        type: DataTypes.STRING,
        unique: {
          name: 'uniqueKey',
          msg: 'Esta dirección de correo electrónico ya está en uso. '
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      },
      accountId: {
        type: DataTypes.INTEGER,
        field: 'account_id',
        references: {
          model: 'accounts',
          key: 'id'
        }
      }
    }, {
      sequelize,
      tableName: TABLE_NAME,
      timestamps: true,
      // omitNull: true,
      hooks: {
        afterValidate: async (user: any) => {
          if (user.password !== null) {
            const hashedPassword = await argon2.hash(user.password)
            user.password = hashedPassword
          }
        }
      }
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
      as: 'users'
    })
  }
}
