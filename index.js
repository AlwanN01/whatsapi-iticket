import http from 'http'
import app from './src/app'
import whatsapp from '#root/whatsapp'
const port = process.env.PORT || 3000

const server = http.createServer(app)
whatsapp(server)

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default server
