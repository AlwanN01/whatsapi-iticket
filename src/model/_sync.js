import * as model from '#model'
;(async () => {
  try {
    await model.User.sync()
    await model.kontak.sync()
    await model.jurusan.sync()
    await model.mahasiswa.sync()
    await model.ticket.sync()
  } catch (error) {
    console.log(error)
    // console.log(JSON.stringify(error, null, 2))
  }
})()
