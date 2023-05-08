import { Router } from 'express'
import multer from 'multer'
import { authJwt } from '../auth/auth-jwt.service'

import { ContactController } from './contacts.controller'

const router = Router()
const upload = multer({})

router.post('/', authJwt, ContactController.create)

router.get('/', authJwt, ContactController.getAll)

router.get('/:id', authJwt, ContactController.getById)

router.put('/:id', authJwt, ContactController.update)

router.delete('/:id', authJwt, ContactController.delete)

router.get('/report/total', authJwt, ContactController.getTotalContacts)

router.post('/import-wa', authJwt, ContactController.importWaContacts)

router.post('/import-csv', upload.single('file'), ContactController.importCsvContacts)

export default router
