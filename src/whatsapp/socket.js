import messageCreate from './message/messageCreate'
import messageReceive from './message/messageReceive'
import messageAuth from '#wa/message/messageAuth'
export const socket = (socket, client) => {
  messageAuth(socket, client)
  // client.on('message', messageReceive)
  client.on('message_create', msg => messageCreate(msg, socket, client))

  console.log('Masuk Page WhatsApp')
  socket.on('disconnect', () => {
    // socket.disconnect()
    client.removeAllListeners()
    console.log('Keluar Page WhatsApp')
  })
}
