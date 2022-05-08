import messageReceive from './message/messageReceive'
import messageAuth from '#wa/message/messageAuth'
export const socket = (socket, client) => {
  messageAuth(socket, client)
  // client.on('message', messageReceive)

  console.log('Masuk Page WhatsApp')
  socket.on('disconnect', () => {
    ;+client.removeAllListeners('qr')
    client.removeAllListeners('ready')
    client.removeAllListeners('authenticated')
    client.removeAllListeners('auth_failure')
    client.removeAllListeners('disconnected')

    console.log('Keluar Page WhatsApp')
  })
}
