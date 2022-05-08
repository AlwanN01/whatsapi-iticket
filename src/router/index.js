import express from 'express'
import * as route from './export'
import { notFound } from '#middleware/index'
const router = express.Router()

router.use('/mahasiswa', route.mahasiswa)
router.use('/whatsApi', route.whatsApi)
router.use('/kontak', route.kontak)
router.use(notFound) // jika endpoint tidak ditemukan

export default router
