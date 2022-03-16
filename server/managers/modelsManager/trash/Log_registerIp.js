const Sequelize = require('sequelize')

const db = require('../dbManager/db')

module.exports = db.sequelize.define('log_registerIp',
    {
        no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ip: {
            type: Sequelize.STRING,
        },
        data: {
            type: Sequelize.JSON,
        },
       
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },

    },
    {
        freezeTableName: true,
        timestemps: false
    }
)