import express from "express";
import { Op } from 'sequelize'
import {Table} from '../../managers/modelsManager/index'
import env from "dotenv";
import { getTokenToUserData } from "../../lib/auth";
env.config();
const route = express.Router();
route.post('/my/:file_type',(req,res)=>{
    try {
        console.log('list file')
        const userData = getTokenToUserData(req)
        const where = req.params.file_type==='all'?{
            where: {
                write_id: {
                    [Op.eq]: userData.userId
                }
            }
        }:{
            where: {
                write_id: {
                    [Op.eq]: userData.userId
                },
                file_type: {
                    [Op.eq]: req.params.file_type
                }
            }
        }
  
     
          Table('log_file').findAll(where)
        .then((list) => {
            res.status(200).json({reqName:'log_file-list',status: true,  result:list })
        })
        .catch((err) => {
           
            res.status(200).json({ reqName:'log_file-list',status: false, error: err })
        })
       } catch (err) {
           console.log(err)
        res.status(200).json({ reqName:'log_file-list',status: false, error: err })
       }
})
route.get('/my/image',(req,res)=>{
    try {
        const userData = getTokenToUserData(req)
          Table('log_file').findAll({
            where: {
                write_id: {
                    [Op.eq]: userData.userId
                },
                file_type: {
                    [Op.eq]: 'image'
                },
                request: {
                    [Op.not]: 'editor'
                }
            },
        })
        .then((list) => {
            res.status(200).json({reqName:'log_file-list',status: true,  result:list })
        })
        .catch((err) => {
            res.status(200).json({ reqName:'log_file-list',status: false, error: err })
        })
       } catch (err) {
        res.status(200).json({ reqName:'log_file-list',status: false, error: err })
       }
})
module.exports = route;