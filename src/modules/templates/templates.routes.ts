import { Router } from 'express'
import { authJwt } from '../auth/auth-jwt.service'
import { TemplateController } from './templates.controller'

const router = Router()

router.get('/', authJwt, TemplateController.getAll)

router.post('/', authJwt, TemplateController.create)

export default router
