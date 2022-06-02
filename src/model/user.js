import sequelize from 'sequelize'
import db from '#db'

export const User = db.define('user', {
  name: {
    type: sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  role: {
    type: sequelize.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
  refreshToken: sequelize.STRING,
})
