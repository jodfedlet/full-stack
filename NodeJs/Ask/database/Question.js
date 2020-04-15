const sequelize = require('sequelize')
const connection = require('./database')

const Question = connection.define('question', {
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Question.sync({force: false}).then(()=>{})

module.exports = Question