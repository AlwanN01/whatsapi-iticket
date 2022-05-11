import { kontak } from '#model'

export const create = async (nohp, nama) => {
  try {
    const exist = await kontak.findOne({
      where: {
        nohp,
      },
    })
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
  try {
    let message = ''
    switch (status) {
      case 'open':
        message = `*Silahkan ketik no kategori bantuan:*
                    1 : Jaringan
                    2 : Internet
                    3 : Software / SIMRS `
        break
      case 'off':
        message = '*Bantuan telah ditutup*'
        break
      case 'on progress':
        message = 'Bantuan yang anda butuhkan akan segera diproses'
        break
    }
    const data = await kontak.update(
      { status },
      {
        where: {
          nohp,
        },
      }
    )
    console.log(data)
    return data[0] ? message : '*Nomor Anda Belum Terdaftar*'
  } catch (err) {
    console.log(err)
  }
}

export const getStatus = async nohp => {
  try {
    const data = await kontak.findOne({
      where: {
        nohp,
      },
    })
    return data ? `Hai *${data.nama}* Status Help Anda Saat Ini *${data.status}*` : '*Nomor Anda Belum Terdaftar*'
  } catch (err) {
    console.log(err)
  }
}
