import { mahasiswa, jurusan, kontak } from '#root/model'
import { replace, formatFromWANo } from '#root/app/whatsapp/helper'
import * as control from '#root/app/whatsapp/controller'
const messageCreate = async (msg, emit, client) => {
  try {
    //get date message
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const time = `${day}/${month}/${year} ${hour}:${minute}:${second}`

    const nohp = formatFromWANo(msg.from)
    const chat = await msg.getChat()
    console.log('_____________________________')
    console.log(`author: ${msg.author}`)
    console.log(`body: ${msg.body}`)
    console.log(`isStatus: ${msg.isStatus}`)
    console.log(`isGroup: ${chat.isGroup}`)
    console.log(`time: ${time}`)
    const prevMessage = await chat.fetchMessages({ limit: 3 })
    // //if from me
    if (!chat.isGroup && !msg.isStatus) {
      switch (true) {
        case msg.body === '!status':
          {
            const message = await control.getStatusMessage(nohp)
            msg.reply(replace(message))
          }
          break

        case msg.body.startsWith('!create '):
          {
            const nama = msg.body.slice(8)
            const message = await control.create(nohp, nama)
            msg.reply(replace(message))
          }
          break

        case msg.body === '!delete':
          {
            const message = await control.deleteOne(nohp)
            msg.reply(replace(message))
          }
          break

        case msg.body === '!help':
          {
            const message = await control.updateStatus(nohp, 'ON_REQUEST')
            msg.reply(replace(message))
          }
          break

        case msg.body === '1' || msg.body === '2' || msg.body === '3':
          {
            const message = await control.createTickets(nohp, msg.body)
            if (message) msg.reply(replace(message))
          }
          break

        case msg.body === '!cancel':
          {
            const message = await control.updateStatus(nohp, 'NO_REQUEST')
            msg.reply(replace(message))
          }
          break
        case msg.body === '!ok' && msg.fromMe:
          {
            const message = await control.updateStatus(nohp, 'ON_PROGRESS')
            msg.reply(replace(message))
          }
          break

        case msg.body === '!no':
          {
            const chat = await msg.getChat()
            if (chat.isGroup) {
              msg.reply(`no anda adalah : ${msg.author}`)
            }
          }
          break

        case msg.body.startsWith('!id '):
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
            emit('notif', replace(message)) //jika emit setelah send = error
            msg.reply(replace(message))

            //push puppeteer notification in browser
          } else {
            emit('notif', replace(` *Data Tidak Ditemukan* `)) //jika emit setelah send = error
            msg.reply(` *Data Tidak Ditemukan* `)
          }
          break
        default:
          {
            const status = await control.getStatusTicket(nohp)
            console.log(status)
            if (status === 'OPEN' && msg.body !== '*Mohon Tuliskan Keterangan Permasalahan:*' && msg.body !== '*Ticket Sudah Terdaftar*') {
              const message = await control.updateTicket(nohp, 'ON_PROGRESS', msg.body)
              if (message) msg.reply(replace(message))
            }
          }
          break
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export default messageCreate
