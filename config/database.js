const sequelize = require("sequelize")
const db = process.env.prod_db
const username = process.env.prod_username
const secret = process.env.prod_password
const host = process.env.prod_host
// console.log(db, username, secret, host);
const Sequelize = new sequelize(`${db}`, `${username}`, `${secret}`, {
  host: host,
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
})

module.exports = Sequelize
