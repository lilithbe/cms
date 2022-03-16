import { Table } from "../managers/modelsManager/index";
import { Op } from 'sequelize'
export const getTableOneData = async (tableName) => {
  try {
    await Table(tableName)
      .findOne()
      .then((data) => {
        return data.dataValues;
      })
      .catch((err) => {
        return err;
      });
  } catch (error) {
    return error;
  }
};
export const getTableAllData = async (tableName) => {
    try {
      await Table(tableName)
        .findAll()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          return err;
        });
    } catch (error) {
      return error;
    }
  };
  
