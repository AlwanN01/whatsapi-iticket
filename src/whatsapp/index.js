import client from './config/client'
import messageCreate from './messageCreate'
import messageReceive from './messageReceive'
import { Server } from 'socket.io'
import { toDataURL } from 'qrcode'

const whatsapp = async server => {
  const io = new Server(server)
  io.on('connection', socket => {
    socket.emit('message', 'Client Connected...')
    socket.on('disconnect', () => {
      socket.emit('message', 'Client disconnected')
    })
    client.on('qr', qr => {
      console.log('qr generate...')
      toDataURL(qr, (err, url) => {
        if (err) throw err
        socket.emit('qr', url)
        socket.emit('message', 'Scan QR code to login')
      })
    })
    client.on('ready', () => {
      console.log('Client is ready!')
      socket.emit('message', 'Client is ready!')
    })

    client.on('authenticated', () => {
      console.log('Client is authenticated!')
      socket.emit('message', 'WhatsApp API is Authenticated')
    })
    client.on('auth_failure', () => {
      console.log('Client is not authenticated!')
      socket.emit('message', 'Authentication failed')
    })
    client.on('disconnected', () => {
      console.log('Client disconnected!')
      socket.emit('message', 'Client disconnected!')
      client.destroy()
      client.initialize()
    })
  })

  client.on('message', messageReceive)
  client.on('message_create', messageCreate)
  client.on('error', err => {
    console.log(err)
  })

  client.initialize()
}

export default whatsapp
