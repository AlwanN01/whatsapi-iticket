import express from 'express'
import morgan from 'morgan'
import router from '#root/router'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../apidocs.json'

const app = express()
app.use(cors())
app.use(morgan('dev')) // menggunakan morgan untuk menampilkan log
app.use(express.urlencoded({ extended: true })) // menggunakan bodyParser untuk mengambil data dari form
app.use(express.json()) // menggunakan bodyParser untuk mengambil data dari json
app.use(cookieParser())
app.use(express.static('public', { root: '.' }))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(router)

export default app
