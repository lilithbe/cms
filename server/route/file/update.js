import express from "express";
import { Op } from 'sequelize'
import {Table} from '../../managers/modelsManager/index'
import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();
const route = express.Router();
route.post('/',(req,res)=>{
    try {
  
        const userData = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
          ); //토큰검증및 유저정보
          Table('log_file').update(req.body,{
            where: {
                write_id: {
                    [Op.eq]: userData.userId
                },
                no: {
                    [Op.eq]: req.body.no
                },
              
            }
        })
        .then(() => {
            res.status(200).json({reqName:'log_file-update',status: true})
        })
        .catch((err) => {
            res.status(200).json({ reqName:'log_file-update',status: false, error: err })
        })
       } catch (err) {
        res.status(200).json({ reqName:'log_file-update',status: false, error: err })
       }
})


module.exports = route;