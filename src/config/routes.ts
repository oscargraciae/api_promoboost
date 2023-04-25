import { Express } from 'express'

import authRouter from '../modules/auth/auth.routes'
import userRouter from '../modules/user/user.routes'
import accountRouter from '../modules/accounts/accounts.routes'
import messagesRouter from '../modules/public_api/messages/messages.routes'
import waDevicesRouter from '../modules/wa/devices/wa-devices.routes'
import contactsRouter from '../modules/contacts/contacts.routes'
import campaignsRouter from '../modules/campaigns/campaigns.routes'
import listsRouter from '../modules/lists/lists.routes'
import integrationsRouter from '../modules/integrations/integrations.routes'
import templatesRouter from '../modules/templates/templates.routes'
import reportsRouter from '../modules/reports/reports.routes'

import publicContactsRouter from '../modules/public_api/contacts/contacts.routes'

const Routes = (app: Express) => {
  app.use('/api/v1/auth', authRouter)

  app.use('/api/v1/accounts', accountRouter)

  app.use('/api/v1/users', userRouter)

  app.use('/api/v1/contacts', contactsRouter)

  app.use('/api/v1/lists', listsRouter)

  app.use('/api/v1/campaigns', campaignsRouter)

  app.use('/api/v1/wa/devices', waDevicesRouter)

  app.use('/api/v1/integrations', integrationsRouter)

  app.use('/api/v1/templates', templatesRouter)

  app.use('/api/v1/reports', reportsRouter)

  // Public API
  app.use('/api/v1/messages', messagesRouter)

  app.use('/v1/contacts', publicContactsRouter)
}

export default Routes
