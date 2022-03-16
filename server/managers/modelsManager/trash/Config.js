const db = require('../dbManager/db')
const { config } = require('../models')

module.exports = db.sequelize.define('config',
    config,
    {
        freezeTableName: true,
        timestemps: false
    }
)