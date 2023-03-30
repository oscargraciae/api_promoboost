import { faker } from '@faker-js/faker'
import { Contact } from '../../entities/contact.entity'

export async function createRandomContact (schemakey: string) {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const phone = faker.phone.phoneNumber('##########')

  console.log('firstName', firstName)
  console.log('lastName', lastName)
  console.log('phone', phone)

  // await Contact.schema(schemakey).create({ firstName, lastName, phone })
}

export async function createRandomContacts (schemakey: string, n: number) {
  for (let i = 0; i < n; i++) {
    await createRandomContact(schemakey)
  }
}

// const user = createRandomUser()
