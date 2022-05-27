import { Server } from 'socket.io'
import ping from 'ping'

const Ping = server => {
  const io = new Server(server, { path: '/ping.io' })
  const emit = io.emit.bind(io) // io.sockets.emit('message', 'hello')

  const frequency = 1000 // second

  let host = [
    {
      host: 'google.com',
      name: 'mbah goggle',
      active: false,
    },
    {
      host: 'yahoo.com',
      name: 'mbah yahoo',
      active: false,
    },
    {
      host: '192.168.4.6',
      name: 'mbah ari',
      active: false,
    },
    {
      host: '192.168.4.99',
      name: 'mbah jurig',
      active: false,
    },
  ]
  setInterval(function () {
    host.forEach(function (host) {
      ping.sys.probe(host.host, function (active) {
        // change active status
        host.active = active
      })
    })
    emit('ping', host)
  }, frequency)
}

export default Ping
