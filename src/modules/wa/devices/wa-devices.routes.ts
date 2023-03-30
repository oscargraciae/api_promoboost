import { Router } from 'express'
import { WADevicesController } from './wa-devices.controller'

const router: Router = Router()

router.post('/', WADevicesController.create)

router.post('/send-message', WADevicesController.sendMessage)

router.get('/is-auth', WADevicesController.isAuth)

export default router
