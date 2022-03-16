const Sequelize = require("sequelize");

const db = require("../dbManager/db");
const { config_board } = require("../models/config_board");

module.exports = db.sequelize.define(
  "config_board",
  config_board,
  {
    freezeTableName: true,
    timestemps: false,
  }
);
