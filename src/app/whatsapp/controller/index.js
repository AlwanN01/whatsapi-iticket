import { kontak, ticket } from '#model'
import db from '#db'
import chalk from 'chalk'
export const create = async (nohp, nama) => {
  try {
    const exist = await kontak.findOne({
      where: {
        nohp
      }
    })
    if (exist) return `Nomor Anda Sudah Terdaftar dengan nama *${exist.nama}*`

    const data = await kontak.create({
      nohp,
      nama
    })
    return data ? `Nomor Anda Berhasil Ditambahkan dengan nama *${nama}*` : '*Nomor Gagal Ditambahkan*'
  } catch (err) {
    console.log(err)
  }
}

export const deleteOne = async nohp => {
  try {
    const data = await kontak.destroy({
      where: {
        nohp
      }
    })
    return data ? '*Nomor Berhasil Dihapus*' : '*Nomor Anda Belum Terdaftar*'
  } catch (err) {
    console.log(err)
  }
}

export const updateStatus = async (nohp, status) => {
  let message
  switch (status) {
    case 'ON_REQUEST':
      message = `*Silahkan ketik no kategori bantuan:*
                    1 : Jaringan / Internet
                    2 : Hardware / Komputer / Monitor
                    3 : Software / SIMRS `
      break
    case 'CLOSED':
      message = '*Bantuan telah ditutup*'
      break
    case 'ON_PROGRESS':
      message = '*Mohon ditunggu*, Bantuan yang anda butuhkan akan segera direspons'
      break
    case 'NO_REQUEST':
      message = '*Bantuan Anda Dihentikan*'
  }
  const trans = await db.transaction()

  try {
    const dataKontak = await kontak.findOne({
      where: {
        nohp
      }
    })
    if (dataKontak.state_ticket && status === 'NO_REQUEST') {
      await ticket.destroy({
        where: {
          id_ticket: dataKontak.state_ticket
        }
      })
    }
    const resultUpdate = await kontak.update(
      { status },
      {
        where: {
          nohp
        }
      }
    )
    await trans.commit()
    return resultUpdate[0] ? message : '*Nomor Anda Belum Terdaftar*'
  } catch (err) {
    await trans.rollback()
    console.log(err)
  }
}

export const getStatus = async nohp => {
  try {
    const data = await kontak.findOne({
      where: {
        nohp
      }
    })
    if (data) return
    return data.status
  } catch (err) {
    console.log(err)
  }
}

export const getStatusMessage = async nohp => {
  try {
    const data = await kontak.findOne({
      where: {
        nohp
      }
    })
    return data ? `Hai *${data.nama}* Status Help Anda Saat Ini *${data.status}*` : '*Nomor Anda Belum Terdaftar*'
  } catch (err) {
    console.log(err)
  }
}

export const createTickets = async (nohp, noKategori) => {
  try {
    let kategori
    let kodeKategori
    switch (noKategori) {
      case '1':
        kategori = 'NETWORK'
        kodeKategori = 'NET'
        break
      case '2':
        kategori = 'HARDWARE'
        kodeKategori = 'HAR'
        break
      case '3':
        kategori = 'SOFTWARE'
        kodeKategori = 'SOF'
        break
    }
    const dataKontak = await kontak.findOne({
      where: {
        nohp
      }
    })
    if (!dataKontak) throw `Nomor ${nohp} Belum Terdaftar`
    if (dataKontak.status === 'NO_REQUEST') throw `Status ${nohp} Tidak ON_REQUEST`
    const findTickets = await ticket.findOne({
      where: {
        id_ticket: dataKontak.state_ticket
      }
    })
    if (findTickets) return `*Ticket Sudah Terdaftar*`
    const id_ticket = `${kodeKategori}${new Date().getTime()}`
    const ticketData = await ticket.create({
      id_ticket,
      kategori,
      nohp
    })
    await kontak.update({ state_ticket: id_ticket }, { where: { nohp } })
    return ticketData ? '*Mohon Tuliskan Keterangan Permasalahan:*' : '*Tiket Anda Gagal Dibuat*'
  } catch (err) {
    console.log(chalk.red(err))
  }
}

export const getStatusTicket = async nohp => {
  try {
    const data = await kontak.findOne({
      where: {
        nohp
      }
    })
    if (!data) return
    if (data.status !== 'ON_REQUEST') return
    const findTickets = await ticket.findOne({
      where: {
        id_ticket: data.state_ticket
      }
    })
    if (!findTickets) return
    return findTickets.status
  } catch (err) {
    console.log(chalk.red(err))
  }
}
export const updateTicket = async (nohp, status, keterangan) => {
  try {
    const dataKontak = await kontak.findOne({
      where: {
        nohp
      }
    })
    if (!dataKontak) throw `Nomor ${nohp} Belum Terdaftar`
    const findTickets = await ticket.findOne({
      where: {
        id_ticket: dataKontak.state_ticket
      }
    })
    if (!findTickets) throw `Ticket ${nohp} Tidak Terdaftar`
    const isUpdate = await ticket.update({ keterangan, status }, { where: { id_ticket: dataKontak.state_ticket } })
    return isUpdate[0]
      ? `*Mohon ditunggu*, Bantuan yang anda butuhkan akan segera direspons dengan id Ticket *${findTickets.id_ticket}*`
      : '*Permohonan Anda Gagal Diupdate*'
  } catch (err) {
    console.log(chalk.red(err))
  }
}
