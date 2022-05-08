import { mahasiswa, jurusan } from '#model'
import { replace, formatFromWANo } from '#wa/helper'
const messageCreate = async (msg, socket, client) => {
  try {
    if (msg.fromMe) {
      if (msg.body.startsWith('!id ')) {
        const nim = msg.body.split(' ')[1]
        const data = await mahasiswa.findOne({
          attributes: { exclude: 'kd_jurusan' },
          include: [
            {
              model: jurusan,
              attributes: ['kd_jurusan', 'nama_jurusan']
            }
          ],
          where: {
            nim
          }
        })
        if (data) {
          const message = `
          *Data Mahasiswa yang temukan:*
          id: ${data.nim}
          nama: ${data.nama}
          jurusan: ${data.jurusan.nama_jurusan}
          `
          socket.emit('notif', replace(message)) //jika emit setelah send = error
          client.sendMessage(msg.to, replace(message))

          //push puppeteer notification in browser
        } else {
          socket.emit('notif', replace(` *Data Tidak Ditemukan* `)) //jika emit setelah send = error
          client.sendMessage(msg.to, ` *Data Tidak Ditemukan* `)
        }
      }
      msg.body === '!no' && client.sendMessage(msg.to, `your number is ${formatFromWANo(msg.to)}`)

      // msg.body === '!jurusan' && client.sendMessage(msg.to, `your jurusan is ${data.jurusan.nama_jurusan}`)
    }
  } catch (err) {
    console.log(err)
  }
}

export default messageCreate
