import express from 'express'
import { User } from '#control'
import { verifyToken, verifyRoles } from '#middleware'

const router = express.Router()
router.get('/', verifyToken, verifyRoles(['admin', 'user']), User.getUsers)
router.post('/register', User.register)
router.post('/login', User.login)
router.get('/token', User.refreshToken)
router.delete('/logout', User.logout)
export default router
