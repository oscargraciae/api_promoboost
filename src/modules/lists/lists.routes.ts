import { Router } from 'express'
import { authJwt } from '../auth/auth-jwt.service'
import { ListController } from './lists.controller'

const router = Router()

router.post('/', authJwt, ListController.create)

router.get('/', authJwt, ListController.getAll)

router.post('/:listId/contacts/:contactId', authJwt, ListController.addContactToList)

export default router
