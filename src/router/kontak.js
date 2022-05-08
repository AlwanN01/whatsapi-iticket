import express from 'express'
import { kontak } from '#control'

const router = express.Router()
router.get('/:id', kontak.getSearch)

export default router
