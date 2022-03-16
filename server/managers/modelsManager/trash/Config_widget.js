const db = require('../dbManager/db')
const { config_widget } = require('../models')

module.exports = db.sequelize.define('config_widget',
config_widget,
    {
        freezeTableName: true,
        timestemps: false
    }
)