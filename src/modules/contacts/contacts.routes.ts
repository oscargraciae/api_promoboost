import { Router } from 'express'
import { authJwt } from '../auth/auth-jwt.service'

import { ContactController } from './contacts.controller'

const router = Router()

router.post('/', authJwt, ContactController.create)

router.get('/', authJwt, ContactController.getAll)

router.get('/total', authJwt, ContactController.getTotalContacts)

router.post('/import-wa', authJwt, ContactController.importWaContacts)

export default router
