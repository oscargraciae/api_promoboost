import { Router } from 'express'
import { authJwt } from '../auth/auth-jwt.service'
import { CampaignsController } from './campaigns.controller'

const router: Router = Router()

router.post('/', authJwt, CampaignsController.create)

router.get('/', authJwt, CampaignsController.findAll)

export default router
