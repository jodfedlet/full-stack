const sequelize = require('sequelize')

const connection = new sequelize('Guiapress','root', 'root', {
    host:'localhost',
    dialect: 'mysql'
})

module.exports = connection