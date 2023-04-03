import { Router } from 'express'

import { authJwt } from '../../auth/auth-jwt.service'
import { WADevicesController } from './wa-devices.controller'

const router: Router = Router()

router.post('/', authJwt, WADevicesController.create)

router.get('/is-auth', authJwt, WADevicesController.isAuth)

router.get('/get-wa-session', authJwt, WADevicesController.getAuthSession)

export default router
