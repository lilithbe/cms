import express from "express";
import fileUpload from "express-fileupload";
import env from "dotenv";
import { Table } from "../../managers/modelsManager/index";
import {fileDeleteToAzure, fileUploadToAzure} from '../../lib/file'
import { getTokenToUserData } from "../../lib/auth";
import { Op } from 'sequelize'
env.config();
const route = express.Router();
route.use(
    fileUpload({
      createParentPath: true
    })
  );
route.post('/upload/:request',(req,res)=>{
    try {
        const userData = getTokenToUserData(req)
        const fileType=req.params.request
       
        fileUploadToAzure(req, userData,'file-0').then((saveData) => {
            Table("log_file")
              .create({...saveData,
                isWrite: true,
                isSave: false,
            })
              .then((data) => {
                res.status(200).json({ reqName: "file-upload", status: true, result: [data] });
              })
              .catch((error) => {
                res.status(200).json({ reqName: "file-upload", status: false, error: error, errorMessage: "insert error message" });
              });
          })
       } catch (err) {
        res.status(200).json({ reqName:'log_file-update',status: false, error: err })
       }
})

route.post('/delete/:request', (req, res) => {
    try {
        const userData = getTokenToUserData(req)
        const fileType=req.params.request

        Table('log_file').findOne({
            where: {
                write_id: {
                    [Op.eq]: userData.userId
                },
                key: {
                    [Op.eq]: req.body.key
                },
            }
        })
            .then((data) => {
            
                const blobName=`${data.dataValues.key}_${data.dataValues.name}`
                console.log(fileType,blobName)
                fileDeleteToAzure(fileType,blobName).then(() => {
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
                            console.log(1)
                            console.log(err)
                            res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
                        })
                })
            })
            .catch((err) => {
                console.log(2)
                console.log(err)
                res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
            })

    } catch (err) {
        console.log(3)
        console.log(err)
        res.status(200).json({ reqName: 'log_file-delete', status: false, error: err })
    }
})
module.exports = route;