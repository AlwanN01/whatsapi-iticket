import sequelize from 'sequelize'
import db from '#db'

const kontak = db.define(
  'kontak',
  {
    nohp: {
      type: sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nama: {
      type: sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: sequelize.STRING,
      defaultValue: 'off',
    },
  },
  { freezeTableName: true }
)

export default kontak
