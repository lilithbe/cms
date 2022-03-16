import express from "express";
import { Op } from 'sequelize'
import {Table} from '../../managers/modelsManager/index'
import env from "dotenv";
import { fileDownloadToAzure } from "../../lib/file";
import { getTokenToUserData } from "../../lib/auth";

env.config();
const route = express.Router();
route.post('/:no', (req, res) => {
  try {
      const userData = getTokenToUserData(req)
      Table('log_file').findOne({
          where: {
              write_id: {
                  [Op.eq]: userData.userId
              },
              no: {
                  [Op.eq]: req.params.no
              },
          }
      })
          .then((data) => {
              fileDownloadToAzure(data.dataValues.file_type,data.key + '_' + data.name).then((blob) => {
                  Table('log_file').update({download_count:data.dataValues.download_count+1},{
                      where: {
                          no: {
                              [Op.eq]: req.params.no
                          },
                      }
                  })
                      .then(() => {
                        blob.pipe(res)
                      })
                      .catch((err) => {
                          res.status(200).json({ reqName: 'log_file-download', status: false, error: err })
                      })
              })
          })
          .catch((err) => {
              res.status(200).json({ reqName: 'log_file-download', status: false, error: err })
          })

  } catch (err) {
      res.status(200).json({ reqName: 'log_file-download', status: false, error: err })
  }
})




module.exports = route;