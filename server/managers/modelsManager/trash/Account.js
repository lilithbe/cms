const Sequelize = require('sequelize')

const db = require('../dbManager/db')
const { accounts_model } = require('../models')

module.exports = db.sequelize.define('accounts',    
    accounts_model,   
    {
        freezeTableName: true,
        timestemps: false
    }
)