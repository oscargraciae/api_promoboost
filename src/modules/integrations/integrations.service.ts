import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import { readFileSync } from 'fs'

import { Account } from '../../entities/account.entity'
import { List } from '../../entities/list.entity'
import { Contact } from '../../entities/contact.entity'
import { ContactList } from '../../entities/contact-list.entity'

const credentials = JSON.parse(readFileSync('credentials.json', 'utf8'))

const oauth2Client = new OAuth2Client(
  credentials.web.client_id,
  credentials.web.client_secret,
  'https://web-promoboost.azurewebsites.net/settings/integrations'
  // 'http://localhost:5173/settings/integrations'
)

export class IntegrationService {
  constructor (schema: string) {
    this.schemakey = schema
  }

  private readonly schemakey: string

  async authGoogle (): Promise<any> {
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/contacts.readonly']
    })
  }

  async saveGoogleToken (code: string): Promise<any> {
    const { tokens } = await oauth2Client.getToken(code)
    console.log('========TOKENS========')
    console.log(tokens)
    console.log('========TOKENS========')

    oauth2Client.setCredentials(tokens)

    return await Account.update({ googleToken: JSON.stringify(tokens) }, { where: { schemakey: this.schemakey } })
  }

  async importGoogleContacts (): Promise<any> {
    const account = await Account.findOne({ where: { schemakey: this.schemakey } })

    if (account == null) throw new Error('Account not found')

    const tokens = JSON.parse(account.googleToken)
    oauth2Client.setCredentials(tokens)

    const service = google.people({ version: 'v1', auth: oauth2Client })
    const response = await service.people.connections.list({
      resourceName: 'people/me',
      pageSize: 100,
      personFields: 'names,emailAddresses,phoneNumbers'
    })

    const contacts = processContacts(response)

    let list = await List.schema(this.schemakey).findOne({ where: { name: 'Google Contacts' } })

    if (list == null) {
      list = await List.schema(this.schemakey).create({ name: 'Google Contacts' })
    }

    contacts.forEach((contact: any) => {
      if (contact.phone == null && contact.name == null) return

      const { phone, firstName, lastName } = contact

      Contact.schema(this.schemakey).create({ firstName, lastName, phone })
        .then((contact: any) => {
          ContactList.schema(this.schemakey).create({ contactId: contact.id, listId: list?.id })
            .then((contactList: any) => { console.log('contactList', contactList) })
            .catch((error: any) => { console.log('error', error) })
        })
        .catch((error: any) => { console.log('error', error) })
    })

    return response
  }
}

function processContacts (response: any) {
  const contacts = response.data.connections

  const processedContacts = contacts.map((contact: any) => {
    let firstName = ''
    let lastName = ''
    let phone = ''

    // Obtiene el primer nombre disponible, si existe
    if (contact.names !== null && contact.names.length > 0) {
      firstName = contact.names[0].givenName
      lastName = contact.names[0].familyName
    }

    // Obtiene el primer número de teléfono disponible, si existe
    if (contact.phoneNumbers !== null && contact.phoneNumbers.length > 0) {
      phone = contact.phoneNumbers[0].canonicalForm
      console.log('phone', phone)
      phone = phone?.replace(/[^a-zA-Z0-9]/g, '')
      console.log('phone', phone)
    }

    return { firstName, lastName, phone }
  })

  return processedContacts
}
