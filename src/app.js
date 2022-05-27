import express from 'express'
import helmet from 'helmet'
// import helmOptions from '#root/config/helmet'
import morgan from 'morgan'
import router from '#root/routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../apidocs.json'

const app = express()
// app.use(helmet(helmOptions))
app.use(cors())
app.use(morgan('dev')) // menggunakan morgan untuk menampilkan log
app.use(express.urlencoded({ extended: true })) // menggunakan bodyParser untuk mengambil data dari form
app.use(express.json()) // menggunakan bodyParser untuk mengambil data dari json
app.use(cookieParser())
app.use(express.static('public', { root: '.', extensions: ['html'] }))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(router)

export default app
