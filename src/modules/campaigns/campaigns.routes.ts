import { Router } from 'express'
import { CampaignsController } from './campaigns.controller'

const router: Router = Router()

router.post('/', CampaignsController.create)

export default router
