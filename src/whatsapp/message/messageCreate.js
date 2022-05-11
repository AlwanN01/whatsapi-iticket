import { mahasiswa, jurusan, kontak } from '#model'
import { replace, formatFromWANo } from '#wa/helper'
import * as control from '#wa/controller'
const messageCreate = async (msg, emit, client) => {
  try {
    const nohp = formatFromWANo(msg.from)

    //if from me

    if (msg.body.startsWith('!id ')) {
      const nim = msg.body.split(' ')[1]
      const data = await mahasiswa.findOne({
        attributes: { exclude: 'kd_jurusan' },
        include: [
          {
            model: jurusan,
            attributes: ['kd_jurusan', 'nama_jurusan'],
          },
        ],
        where: {
          nim,
        },
      })
      if (data) {
        const message = `
          *Data Mahasiswa yang temukan:*
          id: ${data.nim}
          nama: ${data.nama}
          jurusan: ${data.jurusan.nama_jurusan}
          `
        emit('notif', replace(message)) //jika emit setelah send = error
        msg.reply(replace(message))

        //push puppeteer notification in browser
      } else {
        emit('notif', replace(` *Data Tidak Ditemukan* `)) //jika emit setelah send = error
        msg.reply(` *Data Tidak Ditemukan* `)
      }
    }
    if (msg.body.startsWith('!create ')) {
      const [first, ...rest] = msg.body.split(' ')
      const nama = rest.join(' ')
      const message = await control.create(nohp, nama)
      msg.reply(replace(message))
    }
    if (msg.body === '!delete') {
      const message = await control.deleteOne(nohp)
      msg.reply(replace(message))
    }
    if (msg.body === '!help') {
      const message = await control.update(nohp, 'open')
      msg.reply(replace(message))
    }
    if (msg.body === '!status') {
      const message = await control.getStatus(nohp)
      msg.reply(replace(message))
    }
    if (msg.body === '!ok' && msg.fromMe) {
      const message = await control.update(nohp, 'on progress')
      msg.reply(replace(message))
    }
    // switch (msg.body === '1') {
    //   case '1':

    //     break;

    //   default:
    //     break;
    // }
  } catch (err) {
    console.log(err)
  }
}

export default messageCreate
