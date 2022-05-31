import { kontak, ticket } from '#model'
import db from '#db'
import chalk from 'chalk'
import moment from 'moment'
export const create = async (nohp, nama) => {
  try {
    const exist = await kontak.findByPk(nohp)
    if (exist) return `Nomor Anda Sudah Terdaftar dengan nama *${exist.nama}*`

    const data = await kontak.create({
      nohp,
      nama,
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
        nohp,
      },
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
    const dataKontak = await kontak.findByPk(nohp)
    if (dataKontak?.stateTicket && status === 'NO_REQUEST') {
      await ticket.destroy({
        where: {
          idTicket: dataKontak.stateTicket,
        },
      })
    }
    const resultUpdate = await kontak.update(
      { status },
      {
        where: {
          nohp,
        },
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
    const data = await kontak.findByPk(nohp)
    if (data) return
    return data.status
  } catch (err) {
    console.log(err)
  }
}

export const getStatusMessage = async nohp => {
  try {
    const data = await kontak.findByPk(nohp)
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
    const dataKontak = await kontak.findByPk(nohp)
    if (!dataKontak) throw `Nomor ${nohp} Belum Terdaftar`
    if (dataKontak.status === 'NO_REQUEST') throw `Status ${nohp} Tidak ON_REQUEST`
    const findTickets = await ticket.findOne({
      where: {
        idTicket: dataKontak.stateTicket,
      },
    })
    if (findTickets) return `*Ticket Sudah Terdaftar*`
    const idTicket = `${kodeKategori}${new Date().getTime()}`
    const ticketData = await ticket.create({
      idTicket,
      kategori,
      nohp,
    })
    await kontak.update({ stateTicket: idTicket }, { where: { nohp } })
    return ticketData ? '*Mohon Tuliskan Keterangan Permasalahan:*' : '*Tiket Anda Gagal Dibuat*'
  } catch (err) {
    console.log(chalk.red(err))
  }
}

export const getStatusTicket = async nohp => {
  try {
    const data = await kontak.findByPk(nohp)
    if (!data) return
    if (data.status !== 'ON_REQUEST') return
    const findTickets = await ticket.findOne({
      where: {
        idTicket: data.stateTicket,
      },
    })
    if (!findTickets) return
    return findTickets.status
  } catch (err) {
    console.log(chalk.red(err))
  }
}
export const updateTicket = async (nohp, status, keterangan) => {
  status != 'OPEN' && keterangan == null
  const responseAt = status == 'ON_PROGRESS' && moment().format('YYYY-MM-DD HH:mm:ss')
  const resolveAt = status == 'SOLVED' && moment().format('YYYY-MM-DD HH:mm:ss')
  let message
  try {
    const dataKontak = await kontak.findByPk(nohp)
    if (!dataKontak) throw `Nomor ${nohp} Belum Terdaftar`
    const findTickets = await ticket.findOne({
      where: {
        idTicket: dataKontak.stateTicket,
      },
    })
    if (!findTickets) throw `Ticket ${nohp} Tidak Terdaftar`
    const isUpdate = await ticket.update(
      { status, ...(keterangan && { keterangan }), ...(responseAt && { responseAt }), ...(resolveAt && { resolveAt }) },
      { where: { idTicket: dataKontak.stateTicket } }
    )
    if (status == 'SOLVED') {
      await kontak.update(
        { status: 'NO_REQUEST', stateTicket: null },
        {
          where: {
            nohp,
          },
        }
      )
    }
    switch (status) {
      case 'OPEN':
        message = `*Mohon ditunggu*, Bantuan yang anda butuhkan akan segera direspons dengan id Ticket *${findTickets.idTicket}*`
        break
      case 'ON_PROGRESS':
        message = 'Permohonan akan segera saya proses'
        break
      case 'SOLVED':
        message = `Permohonan telah selesai dalam waktu ${moment(resolveAt).diff(moment(findTickets.responseAt), 'minutes')} menit`
        break
    }
    return isUpdate[0] ? message : '*Permohonan Anda Gagal Diupdate*'
  } catch (err) {
    console.log(chalk.red(err))
  }
}
