const sequelize = require('sequelize')

const connection = new sequelize('Ask','root','root', {
    host:'localhost',
    dialect:'mysql'
})

module.exports = connection
