import express from 'express'
import * as route from './export'
import { notFound } from '#middleware/index'
const router = express.Router()

router.use('/mahasiswa', route.mahasiswa)

router.use(notFound) // jika endpoint tidak ditemukan

export default router
