import sequelize from 'sequelize'
import db from '#db'
import jurusan from './jurusan'

const mahasiswa = db.define('mahasiswa', {
  nim: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  nama: {
    type: sequelize.STRING,
    allowNull: false,
  },
  kd_jurusan: {
    type: sequelize.STRING,
    allowNull: false,
  },
  alamat: sequelize.STRING,
  angkatan: sequelize.INTEGER,
  foto: sequelize.STRING,
})
jurusan.hasOne(mahasiswa, { foreignKey: 'kd_jurusan' })
mahasiswa.belongsTo(jurusan, { foreignKey: 'kd_jurusan' })
// mahasiswa.removeAttribute('id')
// mahasiswa.sync().then(() => {
//   console.log('table mahasiswa connected')
// })
export default mahasiswa
