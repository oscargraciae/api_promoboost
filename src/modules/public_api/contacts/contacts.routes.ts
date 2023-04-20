import { Router } from 'express'
import { PublicContactsController } from './contacts.controller'

const router = Router()

router.post('/', PublicContactsController.createContact)

export default router
