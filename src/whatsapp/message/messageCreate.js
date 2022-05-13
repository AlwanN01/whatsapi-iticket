import { mahasiswa, jurusan, kontak } from '#root/model'
import { replace, formatFromWANo } from '#wa/helper'
import * as control from '#wa/controller'
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
    console.log(`author: ${msg.author}`)
    console.log(`body: ${msg.body}`)
    console.log(`isStatus: ${msg.isStatus}`)
    console.log(`isGroup: ${msg.isGroup}`)
    console.log(`time: ${time}`)
    // //if from me
    if (!msg.fromMe && !chat.isGroup && !msg.isStatus) {
      msg.reply(
        replace(`*Hello, I am ITICKET Bot.*
    I can help you, please visit our website:
    *https://www.rskghabibie.com/*
    `)
      )
    }
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
      // const [first, ...rest] = msg.body.split(' ')
      const nama = msg.body.slice(8)
      const message = await control.create(nohp, nama)
      msg.reply(replace(message))
    }
    if (msg.body === '!delete') {
      const message = await control.deleteOne(nohp)
      msg.reply(replace(message))
    }
    if (msg.body === '!help') {
      const message = await control.updateStatus(nohp, 'open')
      msg.reply(replace(message))
    }
    if (msg.body === '!status') {
      const message = await control.getStatus(nohp)
      msg.reply(replace(message))
    }
    if (msg.body === '!ok' && msg.fromMe) {
      const message = await control.updateStatus(nohp, 'on progress')
      msg.reply(replace(message))
    }
    if (msg.body === '!no') {
      const chat = await msg.getChat()
      if (chat.isGroup) {
        msg.reply(`no anda adalah : ${msg.author}`)
      }
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
