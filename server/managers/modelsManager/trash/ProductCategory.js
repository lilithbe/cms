
const db = require('../dbManager/db')
const { category } = require('../models')

module.exports = db.sequelize.define('category',
category,
    {
        freezeTableName: true,
        timestemps: false
    }
)