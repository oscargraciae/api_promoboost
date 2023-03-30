import { Sequelize } from 'sequelize'
// import constants from '../config/constants';

// import { GlobalUser } from './global_user.model'
// import { Organization } from './organization.model'
import { Account } from './account.entity'
import { ContactList } from './contact-list.entity'
import { Contact } from './contact.entity'
import { List } from './list.entity'
import { Message } from './message.entity'
import { User } from './user.entity'

const sequelize = new Sequelize('promoboost_dev', 'postgres', 'desarrollo', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  define: {
    underscored: true
  },
  dialectOptions: {
    connectTimeout: 900000
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 1000000
  }
})

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err))

// Entities
Account.start(sequelize)
User.start(sequelize)
Message.start(sequelize)
Contact.start(sequelize)
List.start(sequelize)
ContactList.start(sequelize)

// Associations
Account.associate()
User.associate()
Message.associate()
ContactList.associate()

export default sequelize
