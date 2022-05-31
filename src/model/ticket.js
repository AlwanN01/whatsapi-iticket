import sequelize from 'sequelize'
import db from 'rskg/db'
import { kontak } from '#model'

export const ticket = db.define(
  'ticket',
  {
    idTicket: {
      type: sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nohp: sequelize.STRING,
    kategori: {
      type: sequelize.ENUM('SOFTWARE', 'HARDWARE', 'NETWORK'),
      allowNull: false,
    },
    status: {
      type: sequelize.ENUM('ON_WAIT', 'OPEN', 'ON_PROGRESS', 'PENDING', 'SOLVED', 'CLOSED'),
      allowNull: false,
      defaultValue: 'ON_WAIT',
    },
    keterangan: sequelize.STRING,
    responseAt: sequelize.DATE,
    resolveAt: sequelize.DATE,
  },
  { timestamps: true }
)
ticket.belongsTo(kontak, { foreignKey: 'nohp' })
