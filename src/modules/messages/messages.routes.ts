import { Router } from 'express'
import { MessageController } from './messages.controller'

const router: Router = Router()

router.post('/', MessageController.create)

export default router
