// import client from '#wa/config/client'

import { toDataURL } from 'qrcode'
let msg = 'Client Connected...'
let barcode = ''
let ready = false
const messageAuth = (socket, client) => {
  socket.emit('message', msg)
  socket.emit('qr', barcode)
  socket.emit('ready', ready)

  client.on('qr', qr => {
    console.log('qr generate...')
    toDataURL(qr, (err, url) => {
      if (err) throw err
      barcode = url
      msg = 'Scan QR code to login'
      socket.emit('qr', barcode)
      socket.emit('message', msg)
    })
  })

  client.on('ready', () => {
    console.log('Client is ready!')
    msg = 'Client is ready!'
    barcode = ''
    ready = true
    socket.emit('ready', ready)
    socket.emit('message', msg)
  })

  client.on('authenticated', () => {
    console.log('Client is authenticated!')
    msg = 'Client is authenticated!'
    socket.emit('message', msg)
  })

  client.on('auth_failure', () => {
    console.log('Client is not authenticated!')
    msg = 'Client is not authenticated!'
    socket.emit('message', msg)
  })

  // client.on('disconnected', () => {
  //   console.log('Client disconnected!')
  //   msg = 'Client disconnected!'
  //   ready = false
  //   socket.emit('ready', ready)
  //   socket.emit('message', msg)
  //   client.destroy()
  //   setTimeout(() => {
  //     client.initialize()
  //   }, 10)
  // })
}

export default messageAuth
