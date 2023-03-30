import { Router } from 'express'

import { authJwt } from '../auth/auth-jwt.service'
import { IntegrationsController } from './integrations.controller'

const router = Router()

router.get('/google-contacts/authenticate', authJwt, IntegrationsController.authGoogle)

router.get('/google-contacts/save-token', authJwt, IntegrationsController.saveGoogleToken)

router.get('/google-contacts/get-contacts', authJwt, IntegrationsController.importGoogleContacts)

export default router
