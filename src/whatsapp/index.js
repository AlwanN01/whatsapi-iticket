import { client, client2 } from './config/client'
import { Server } from 'socket.io'
import { socket } from './socket'
import messageCreate from './message/messageCreate'

const whatsapp = async server => {
  const io = new Server(server)
  const emit = io.emit.bind(io) // io.sockets.emit('message', 'hello')
  io.sockets.emit('init')
  client.initialize()
  io.on('connection', sockets => socket(sockets, client))
  client.on('message_create', msg => messageCreate(msg, emit, client))
}

export default whatsapp

// const emit = io.emit.bind(io) // io.sockets.emit('message', 'hello')
// console.log(io.engine.clientsCount)
