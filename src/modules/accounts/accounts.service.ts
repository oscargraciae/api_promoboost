import { AuthService } from '../auth/auth.service'
import { CreateOrganizationDTO } from './accounts.dto'
import { UserService } from '../user/user.service'
import { errorTypes } from '../../config/error-types'

import sequelize from '../../entities'
import { Account } from '../../entities/account.entity'
import { Message } from '../../entities/message.entity'
import { Contact } from '../../entities/contact.entity'
import { List } from '../../entities/list.entity'
import { ContactList } from '../../entities/contact-list.entity'

class AccountService {
  private readonly schemakey?: string

  constructor (schemakey?: string) {
    this.schemakey = schemakey
  }

  async getOrganization () {
    return await Account.findOne({ where: { schemakey: this.schemakey } })
  }

  async create (data: CreateOrganizationDTO) {
    // if (await new UserService().getByEmail(data.email) !== null) throw new Error('EMAIL_ALREADY_EXISTS')
    if (await new UserService().getByEmail(data.email) !== null) throw new Error(errorTypes.EMAIL_ALREADY_EXISTS.code)

    const account = await Account.create({ ...data })

    const user = await new UserService().create({ ...data, accountId: account.id })

    const schemakey = `schema_${account.id}`

    await this.createSchema(schemakey)

    await Account.update({ schemakey: `schema_${account.id}` }, { where: { id: account.id } })

    return new AuthService().createTokens({ id: user.id, firstName: user.firstName, email: user.email, schemakey, accountId: account.id })
  }

  migrations () {
    if (this.schemakey !== undefined) {
      void Message.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })
      void Contact.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })
      void List.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })
      void ContactList.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })

      ContactList.associate()
    }
  }

  async createSchema (schemakey: string) {
    if (schemakey !== undefined) {
      await sequelize.createSchema(schemakey, {})
      await sequelize.sync({ schema: schemakey }) // NO FORZAR / NOT FORCE
    }
  }

  async syncSchema (schemakey: string) {
    await sequelize.sync({ schema: schemakey }) // NO FORZAR / NOT FORCE
  }
}

export default AccountService
