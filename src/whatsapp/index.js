import { Server } from 'socket.io'
import { socket } from './socket'
const whatsapp = async server => {
  const io = new Server(server)

  io.on('connection', socket)
}

export default whatsapp
