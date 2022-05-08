import express from 'express'
import { body } from 'express-validator'
import { sendMessage } from '#wa/controller/sendMessage'

const router = express.Router()
router.post('/', [body('number').notEmpty(), body('message').notEmpty()], sendMessage)
export default router
