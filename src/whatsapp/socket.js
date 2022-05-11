import messageReceive from './message/messageReceive'
import messageAuth from '#wa/message/messageAuth'
export const socket = (socket, client) => {
  messageAuth(socket, client)
  // client.on('message', messageReceive)

  console.log('Masuk Page WhatsApp')
  socket.on('disconnect', () => {
    console.log('Keluar Page WhatsApp')
    client.removeAllListeners('qr')
    client.removeAllListeners('ready')
    client.removeAllListeners('authenticated')
    client.removeAllListeners('auth_failure')
  })
}
