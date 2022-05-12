import express from 'express'
import { mahasiswa } from '#control'
import multer from 'multer'
import { normalize } from 'path'
const router = express.Router()
//upload with file original name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, normalize('./public/image'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
router.get('/', mahasiswa.getAll)
router.get('/pagenation', mahasiswa.getPagenation)
router.get('/search', mahasiswa.getSearch)
router.get('/:key', mahasiswa.getOne)
router.post('/', upload.single('foto'), mahasiswa.create)
router.put('/:key', multer().none(), mahasiswa.update)
router.delete('/:key', mahasiswa.deleteOne)
export default router
