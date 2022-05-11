import sequelize from 'sequelize'

const db = new sequelize(process.env.DB_NAME, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log, //logging: console.log query
})
// sync db
db.sync().then(() => {
  console.log('Database connected')
})
// try {
//   await db.authenticate()
//   console.log('Connection has been established successfully.')
// } catch (error) {
//   console.error('Unable to connect to the database:', error)
// }
export default db
