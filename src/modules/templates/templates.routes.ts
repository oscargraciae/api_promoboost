import { Router } from 'express'
import { authJwt } from '../auth/auth-jwt.service'
import { TemplateController } from './templates.controller'

const router = Router()

router.get('/', authJwt, TemplateController.getAll)

router.get('/:id', authJwt, TemplateController.getById)

router.put('/:id', authJwt, TemplateController.update)

router.post('/', authJwt, TemplateController.create)

router.delete('/:id', authJwt, TemplateController.delete)

export default router
