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
import { Campaign } from '../../entities/campaign.entity'
import { CampaignContact } from '../../entities/campaign-contact'
import { Test } from '../../entities/test.entity'

class AccountService {
  private schemakey?: string

  constructor (schemakey?: string) {
    this.schemakey = schemakey
  }

  setSchemakey (schemakey: string) {
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
    this.setSchemakey(schemakey)

    await this.createSchema(schemakey)

    await Account.update({ schemakey: `schema_${account.id}` }, { where: { id: account.id } })

    return new AuthService().createTokens({ id: user.id, firstName: user.firstName, email: user.email, schemakey, accountId: account.id })
  }

  async migrations () {
    try {
      if (this.schemakey !== undefined) {
        await Contact.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })
        await List.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })
        await Message.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })
        await ContactList.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })
        await Campaign.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })
        await CampaignContact.schema(this.schemakey).sync({ schema: this.schemakey, alter: true })

        ContactList.associate()
        CampaignContact.associate()
      }
    } catch (error) {
      console.log('error migrations========>', error)
    }
  }

  async createSchema (newSchemakey: string) {
    try {
      console.log('createSchema========>', newSchemakey)
      await sequelize.createSchema(newSchemakey, {})
      // await sequelize.sync({ schema: newSchemakey }) // NO FORZAR / NOT FORCE
      this.migrations()
        .then(() => {
          console.log('migration========>', newSchemakey)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  async syncSchema (schemakey: string) {
    await sequelize.sync({ schema: schemakey }) // NO FORZAR / NOT FORCE
  }
}

export default AccountService
