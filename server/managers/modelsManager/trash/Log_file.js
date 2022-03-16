const db = require('../dbManager/db')
const { log_file } = require('../models')

module.exports = db.sequelize.define('log_file',
    log_file,
    {
        freezeTableName: true,
        timestemps: false
    }
)