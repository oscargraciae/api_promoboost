import sequelize from '../../entities'
import { Contact } from '../../entities/contact.entity'
import { ContactList } from '../../entities/contact-list.entity'
import { List } from '../../entities/list.entity'
import { CreateListDTO } from './dto/create-list.dto'

export class ListService {
  constructor (schema: string) {
    this.schemakey = schema
  }

  private readonly schemakey: string

  async create (createListDTO: CreateListDTO) {
    const listCreated = await List.schema(this.schemakey).create(createListDTO)
    return listCreated
  }

  async getAll () {
    const subquery: any = [
      [sequelize.literal(`(SELECT COUNT (id) FROM "${this.schemakey}"."contact_lists" WHERE "${this.schemakey}"."contact_lists"."list_id" = "List"."id")`), 'total'],
    ]

    return await List.schema(this.schemakey).findAll({
      where: { isActive: true },
      attributes: { include: subquery },
      include: [
        {
          model: ContactList.schema(this.schemakey),
          as: 'contactLists'
        }
      ],
      order: [
        ['name', 'DESC']
      ]
    })
  }

  async addContactToList (listId: number, contactId: number) {
    const contactList = await ContactList.schema(this.schemakey).findOne({ where: { listId, contactId } })
    if (contactList != null) {
      await contactList.destroy()
      return { message: 'Contacto eliminado de la lista' }
    }

    const contactListCreated = await ContactList.schema(this.schemakey).create({ listId, contactId })
    return contactListCreated
  }
}
