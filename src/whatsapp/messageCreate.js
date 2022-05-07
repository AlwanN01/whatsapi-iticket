import { mahasiswa, jurusan } from '#model'
import { replace, formatFromWANo } from './helper'
const messageCreate = async msg => {
  try {
    if (msg.fromMe) {
      const { default: client } = await import('./config/client')
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
          client.sendMessage(
            msg.to,
            replace(`
            *Data Mahasiswa yang temukan:*
            id: ${data.nim}
            nama: ${data.nama}
            jurusan: ${data.jurusan.nama_jurusan}
            `)
          )
        } else {
          client.sendMessage(msg.to, `data not found`)
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
