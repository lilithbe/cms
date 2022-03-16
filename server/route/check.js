/**
 * check Api
 */
import express from "express";
import { Table } from "../managers/modelsManager/index";
import { Op } from "sequelize";
const route = express.Router();

route.post("/config", (req, res) => {
  console.log("config");
  try {
    Table("config")
      .findOne()
      .then((configData) => {
        Table("config_group")
          .findAll()
          .then((groupData) => {
            Table("config_board")
              .findAll()
              .then((boardData) => {
                Table("popup")
                  .findAll()
                  .then((popup) => {
                    Table("accounts")
                      .findAll({
                        attributes: { exclude: ["password"] },
                        where: {
                          isAdmin: {
                            [Op.eq]: true
                          }
                        }
                      })
                      .then((admins) => {
                        //console.log("admins...........",admins)
                        configData.dataValues.adminList = admins;
                        res.status(200).json({
                          reqName: "config",
                          status: true,
                          config: configData.dataValues,
                          groupConfig: groupData,
                          boardConfig: boardData,
                          popup: popup
                        });
                      })
                      .catch((err) => {
                        res.status(200).json({ reqName: "admins", status: false, error: err });
                      });
                  })
                  .catch((err) => {
                    res.status(200).json({ reqName: "admins", status: false, error: err });
                  });
              })
              .catch((err) => {
                res.status(200).json({ reqName: "config", status: false, error: err });
              });
          })
          .catch((err) => {
            res.status(200).json({ reqName: "config", status: false, error: err });
          });
      })
      .catch((err) => {
        res.status(200).json({ reqName: "config", status: false, error: err });
      });
  } catch (err) {
    res.status(200).json({ reqName: "config", status: false, error: err });
  }
});

module.exports = route;
