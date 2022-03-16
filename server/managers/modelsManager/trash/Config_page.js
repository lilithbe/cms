const db = require('../dbManager/db')
const { config_page } = require('../models')

module.exports = db.sequelize.define('config_page',
config_page,
    {
        freezeTableName: true,
        timestemps: false
    }
)