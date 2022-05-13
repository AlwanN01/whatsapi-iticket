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
  client.on('ready', async () => {
    let state = await client.getState()
    if (state === 'TIMEOUT') {
      console.log('TIMEOUT REACHED')
    } else {
      console.log('CLIENT READY IN STATE: ', state)
    }
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
    client.initialize()
  })

  client.on('disconnected', reason => {
    console.log(`Client disconnected! reason: ${reason}`)
    msg = 'Client disconnected!'
    ready = false
    emit('ready', ready)
    emit('message', msg)
    emit('disconnected')
    client.destroy().then(() => {
      console.log('Client is destroyed!')
      msg = 'Client is destroyed!'
      emit('message', msg)
      client.initialize().then(() => {
        console.log('Client is initialized!')
        msg = 'Client is initialized!'
        emit('message', msg)
      })
    })
  })
  client.on('change_state', state => {
    console.log('Client state changed to: ' + state)
  })
}

export default whatsapp

// const emit = io.emit.bind(io) // io.sockets.emit('message', 'hello')
// console.log(io.engine.clientsCount)
