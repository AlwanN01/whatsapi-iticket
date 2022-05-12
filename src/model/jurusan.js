import sequelize from 'sequelize'
import db from '#db'

const jurusan = db.define(
  'jurusan',
  {
    kd_jurusan: {
      type: sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    nama_jurusan: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

export default jurusan
