const Sequelize = require("sequelize");

const db = require("../dbManager/db");
const { config_group } = require("../models/config_group");

module.exports = db.sequelize.define(
  "config_group",
  config_group,
  {
    freezeTableName: true,
    timestemps: false,
  }
);
