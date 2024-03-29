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
      type: sequelize.ENUM('NO_REQUEST', 'ON_REQUEST', 'ON_PROGRESS'),
      defaultValue: 'NO_REQUEST',
    },
    stateTicket: {
      type: sequelize.STRING,
      defaultValue: null,
    },
  },
  { timestamps: true }
)
// matikan async saat pertama sync(), karena table ticket belum ada.
;(async () => {
  try {
    const { ticket } = await import('#model')
    ticket.hasOne(kontak, { foreignKey: 'stateTicket', onDelete: 'SET NULL' })
    kontak.belongsTo(ticket, { foreignKey: 'stateTicket' })
  } catch (error) {
    console.log(error)
  }
})()
export default kontak
