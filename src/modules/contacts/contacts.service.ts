// CliendID 434585790973-95s9s8mjqfokdh0q5cb75e0d22mcu11m.apps.googleusercontent.com
// Secret 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

import { List } from '../../entities/list.entity'
import { ContactList } from '../../entities/contact-list.entity'
import { Contact } from '../../entities/contact.entity'
import { CreateContactDto } from './dto/create-contact.dto'
import sequelize from '../../entities'
import { Op } from 'sequelize'

export class ContactService {
  constructor (schema: string) {
    this.schemakey = schema
  }

  private readonly schemakey: string

  async create (newContactDTO: CreateContactDto) {
    const { lists } = newContactDTO

    let phoneToSend = newContactDTO.phone

    if (phoneToSend.slice(0, 3) === '+52') {
      phoneToSend = phoneToSend.replace('+52', '+521')
    }

    if (phoneToSend[0] === '+') {
      phoneToSend = phoneToSend.replace('+', '')
    }

    const contactCreated = await Contact.schema(this.schemakey).create({ ...newContactDTO, phone: phoneToSend })

    console.log('lists======>', lists)
    if (lists.length > 0) {
      const contactLists = lists.map((listId: number) => ({ listId, contactId: contactCreated.id }))
      await ContactList.schema(this.schemakey).bulkCreate(contactLists)
    }

    return { message: 'Contacto creado', contactCreated }
  }

  async getAll ({ listId, page, name }: { listId?: string, page?: number, name?: string }) {
    if (listId === undefined || listId === null || listId === 'undefined') {
      let where = {}

      if (name != null) {
        where = sequelize.where(
          sequelize.fn(
            'LOWER',
            sequelize.fn(
              'concat',
              sequelize.col('first_name'),
              ' ',
              sequelize.col('last_name')
            )
          ),
          {
            [Op.like]: `%${name.toLowerCase()}%`
          }
        )
      }

      return {
        list: null,
        contacts: await Contact.schema(this.schemakey).findAll({
          where,
          include: [
            {
              model: ContactList.schema(this.schemakey),
              as: 'listContacts',
              include: [
                {
                  model: List.schema(this.schemakey),
                  as: 'list'
                }
              ]
            }
          ],
          limit: 10,
          offset: (page != null && page > 0) ? (page - 1) * 10 : 0,
          order: [
            ['first_name', 'ASC']
          ]
        })
      }
    }

    return {
      list: await List.schema(this.schemakey).findOne({ where: { id: listId }, attributes: ['id', 'name'] }),
      contacts: await Contact.schema(this.schemakey).findAll({
        include: [
          {
            model: ContactList.schema(this.schemakey),
            where: { listId },
            as: 'listContacts',
            include: [
              {
                model: List.schema(this.schemakey),
                as: 'list'
              }
            ]
          }
        ],
        limit: 10,
        offset: (page != null && page > 0) ? (page - 1) * 10 : 0,
        order: [
          ['first_name', 'ASC']
        ]
      })
    }
  }

  async getContactById (contactId: number) {
    return await Contact.schema(this.schemakey).findOne({
      where: { id: contactId },
      include: [
        {
          model: ContactList.schema(this.schemakey),
          as: 'listContacts',
          include: [
            {
              model: List.schema(this.schemakey),
              as: 'list'
            }
          ]
        }
      ]
    })
  }

  async updateContact (contactId: number, updateContactDTO: CreateContactDto) {
    let phoneToSend = updateContactDTO.phone

    if (phoneToSend.slice(0, 3) === '+52') {
      phoneToSend = phoneToSend.replace('+52', '+521')
    }

    if (phoneToSend[0] === '+') {
      phoneToSend = phoneToSend.replace('+', '')
    }

    await Contact.schema(this.schemakey).update({ ...updateContactDTO, phone: phoneToSend }, { where: { id: contactId } })

    return { message: 'Contacto actualizado' }
  }

  async deleteContact (contactId: number) {
    await Contact.schema(this.schemakey).update({ isActive: false }, { where: { id: contactId } })

    return { message: 'Contacto eliminado' }
  }

  async getTotalContacts () {
    return await Contact.schema(this.schemakey).count({ where: { isActive: true } })
  }

  async importWaContacts (waContacts: any) {
    return []
  }

  async importGoogleContacts () {
    return []
  }
}
