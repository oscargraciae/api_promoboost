import { Sequelize } from 'sequelize'
// import constants from '../config/constants';

// import { GlobalUser } from './global_user.model'
// import { Organization } from './organization.model'
import { Account } from './account.entity'
import { CampaignContact } from './campaign-contact'
import { Campaign } from './campaign.entity'
import { ContactList } from './contact-list.entity'
import { Contact } from './contact.entity'
import { Device } from './device.entity'
import { List } from './list.entity'
import { Message } from './message.entity'
import { Templates } from './templates.entity'
import { User } from './user.entity'

const sequelize = new Sequelize('promoboost_dev', 'evaa', 'survey2022001$', {
  host: 'evaadb.postgres.database.azure.com',
  port: 5432,
  dialect: 'postgres',
  define: {
    underscored: true
  },
  dialectOptions: {
    connectTimeout: 900000
  },
  pool: {
    max: 5,
    min: 0,
    idle: 1000 * 10, // 30 seconds
    acquire: 1000 * 30 // 10 seconds
  }
  // logging: true
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
Device.start(sequelize)
Campaign.start(sequelize)
CampaignContact.start(sequelize)
Templates.start(sequelize)

// Associations
Account.associate()
User.associate()
Message.associate()
ContactList.associate()
Device.associate()
CampaignContact.associate()
Campaign.associate()
Templates.associate()

export default sequelize
