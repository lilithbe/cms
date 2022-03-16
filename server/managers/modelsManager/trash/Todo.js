const Sequelize = require('sequelize')

const db = require('../dbManager/db')
const { dev_todos } = require('../models')
module.exports = db.sequelize.define('dev_todos',
dev_todos,
    {
        freezeTableName: true,
        timestemps: false
    }
)