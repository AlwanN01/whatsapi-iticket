import * as model from '#model'
;(async () => {
  try {
    await model.User.sync({ alter: true })
    await model.kontak.sync({ alter: true })
    await model.jurusan.sync()
    await model.mahasiswa.sync()
    await model.ticket.sync({ alter: true })
  } catch (error) {
    console.log(error)
    // console.log(JSON.stringify(error, null, 2))
  }
})()
