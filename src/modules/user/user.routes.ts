import { Router } from 'express'

import { UserController } from './user.controller'
import { authJwt } from '../auth/auth-jwt.service'

const router: Router = Router()

router.post('/', authJwt, UserController.create)

router.get('/', authJwt, UserController.getAll)

router.get('/:id', authJwt, UserController.getById)

export default router
