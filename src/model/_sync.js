import * as model from '#model'
;(async () => {
  try {
    await model.kontak.sync({ alter: true })
    console.log('table kontak connected')
    await model.jurusan.sync()
    console.log('table jurusan connected')
    await model.mahasiswa.sync()
    console.log('table mahasiswa connected')
    await model.ticket.sync({ alter: true })
    console.log('table ticket connected')
  } catch (error) {
    console.log(error)
    // console.log(JSON.stringify(error, null, 2))
  }
})()
