
const db = require('../dbManager/db')
const { tree_data_model } = require('../models')

module.exports = db.sequelize.define('tree_data',
    tree_data_model,
    {
        freezeTableName: true,
        timestemps: false
    }
)