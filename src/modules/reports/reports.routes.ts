import { Router } from 'express'
import { authJwt } from '../auth/auth-jwt.service'

import { ReportController } from './reports.controller'

const router = Router()

router.get('/transactional-messages', authJwt, ReportController.getTransactionalMessagesReport)

router.get('/campaigns-messages', authJwt, ReportController.getCampaignsMessagesReport)

export default router
