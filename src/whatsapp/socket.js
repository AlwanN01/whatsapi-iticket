import client from './config/client'
import messageCreate from './message/messageCreate'
import messageReceive from './message/messageReceive'
import messageAuth from './message/messageAuth'

export const socket = socket => {
  client.initialize()

  messageAuth(socket, client)
  client.on('message', messageReceive)
  client.on('message_create', messageCreate)

  console.log('Masuk Page WhatsApp')
  socket.on('disconnect', () => {
    console.log('Keluar Page WhatsApp')
  })
}
