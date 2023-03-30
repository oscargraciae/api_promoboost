import { Router } from 'express'
import { authJwt } from '../auth/auth-jwt.service'
import { AccountController } from './accounts.controller'

const router: Router = Router()

router.get('/', authJwt, AccountController.get)

router.post('/', AccountController.create)

router.get('/migration', AccountController.migration)

export default router
