import express from 'express'
import { body } from 'express-validator'
import { whatsApi } from '#control'
const router = express.Router()
router.post('/', [body('number').notEmpty(), body('message').notEmpty()], whatsApi.sendMessage)
export default router
