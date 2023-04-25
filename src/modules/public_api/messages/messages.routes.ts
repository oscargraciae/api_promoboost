import { Router } from 'express'
import { authJwt } from '../../../modules/auth/auth-jwt.service'
import { MessageController } from './messages.controller'

const router: Router = Router()

router.post('/', MessageController.create)

router.get('/', authJwt, MessageController.getAll)

export default router
