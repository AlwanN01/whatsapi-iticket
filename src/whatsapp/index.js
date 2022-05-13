import { client } from './config/client'
import { Server } from 'socket.io'
// import { socket } from './socket'
import { toDataURL } from 'qrcode'
import messageCreate from './message/messageCreate'

let msg = 'Client Connected...'
let barcode = ''
let ready = false

const whatsapp = server => {
  const io = new Server(server)
  client.initialize()
  const emit = io.emit.bind(io) // io.sockets.emit('message', 'hello')
  io.on('connection', sockets => {
    sockets.emit('message', msg)
    sockets.emit('qr', barcode)
    sockets.emit('ready', ready)
  })
  client.on('message_create', msg => messageCreate(msg, emit, client))
  client.on('qr', qr => {
    console.log('qr generate...')
    toDataURL(qr, (err, url) => {
      barcode = url
      msg = 'Scan QR code to login'
      emit('qr', barcode)
      emit('message', msg)
    })
  })
  client.on('ready', () => {
    console.log('Client is ready!')
    msg = 'Client is ready!'
    barcode = ''
    ready = true
    emit('ready', ready)
    emit('message', msg)
  })

  client.on('authenticated', () => {
    console.log('Client is authenticated!')
    msg = 'Client is authenticated!'
    emit('message', msg)
  })

  client.on('auth_failure', () => {
    console.log('Client is not authenticated!')
    msg = 'Client is not authenticated!'
    emit('message', msg)
  })

  client.on('disconnected', () => {
    console.log('Client disconnected!')
    msg = 'Client disconnected!'
    ready = false
    emit('ready', ready)
    emit('message', msg)
    emit('disconnected')
    client.destroy()
    client.initialize()
  })
}

export default whatsapp

// const emit = io.emit.bind(io) // io.sockets.emit('message', 'hello')
// console.log(io.engine.clientsCount)
