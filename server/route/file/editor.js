import express from "express";
import fileUpload from "express-fileupload";
import env from "dotenv";
import { Table } from "../../managers/modelsManager/index";
import {editorUpload, fileDeleteToAzure} from '../../lib/file'
import { getTokenToUserData } from "../../lib/auth";
import { Op } from 'sequelize'
env.config();
const route = express.Router();
route.use(
    fileUpload({
      createParentPath: true
    })
  );
route.post('/upload',(req,res)=>{
    try {
        console.log('editor image upload')
        const userData = getTokenToUserData(req)
        editorUpload(req, userData,'file-0').then((saveData) => {
            Table("log_file")
              .create({...saveData,
                isWrite: true,
                isSave: false,
            })
              .then((data) => {
                res.status(200).json({ reqName: "file-upload", status: true, result: [data] });
              })
              .catch((error) => {
                console.log(error)
                res.status(200).json({ reqName: "file-upload", status: false, error: error, errorMessage: "insert error message" });
              });
          })
       } catch (err) {
           console.log(err)
        res.status(200).json({ reqName:'log_file-update',status: false, error: err })
       }
})

route.post('/delete', (req, res) => {
    try {
        const userData = getTokenToUserData(req)
        Table('log_file').findOne({
            where: {
                write_id: {
                    [Op.eq]: userData.userId
                },
                key: {
                    [Op.eq]: req.body.key
                },
                request:{
                    [Op.eq]:'editor'
                }
            }
        })
            .then((data) => {
                const blobName=`${data.dataValues.key}_${data.dataValues.name}`
                fileDeleteToAzure('editor',blobName).then(() => {
                    Table('log_file').destroy({
                        where: {
                            write_id: {
                                [Op.eq]: userData.userId
                            },
                            key: {
                                [Op.eq]: req.body.key
                            },
                        }
                    })
                        .then(() => {
                            res.status(200).json({ reqName: 'log_file-delete', status: true })
                        })
                        .catch((err) => {
                            res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
                        })
                })
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
            })

    } catch (err) {
        res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
    }
})
module.exports = route;