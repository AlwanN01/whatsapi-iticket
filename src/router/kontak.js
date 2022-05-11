import express from 'express'
import { kontak } from '#control'

const router = express.Router()
router.get('/:id', kontak.getSearch)
router.post('/', kontak.create)

export default router
