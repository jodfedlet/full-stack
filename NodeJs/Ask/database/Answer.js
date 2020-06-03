const sequelize = require('sequelize')
const connection = require('./database')

const Answer = connection.define('answer', {
    body:{
        type: sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({force: false})

module.exports = Answer