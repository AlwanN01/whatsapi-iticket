import messageReceive from './message/messageReceive'
import messageAuth from '#wa/message/messageAuth'
import { client } from '#wa/config/client'

export const socket = socket => {
  messageAuth(socket)
  // client.on('message', messageReceive)

  console.log('Masuk Page WhatsApp')
  socket.on('disconnect', () => {
    console.log('Keluar Page WhatsApp')
  })
}
