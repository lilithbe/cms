/**
 * config 관리
 */
import express from "express";
import jwt from "jsonwebtoken";
import {Table} from '../../managers/modelsManager/index'
import { Op } from 'sequelize'
import { updateConfig ,getConfig } from "../../data";
const route = express.Router();

//config 데이터
route.post('/data',(req,res)=>{
    console.log('admin-get-config')
    res.status(200).json({reqName:'admin-get-config'})
})
//config 데이터 수정
route.post('/update',(req,res)=>{
    try {
        const userData = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
          ); //토큰검증및 유저정보
          if(userData.grade>=10){
            Table('config').update(req.body,  {
                where: {
                  no: {
                    [Op.eq]: 1,
                  },
                },
              }).then((data)=>{
                res.status(200).json({reqName:'admin-get-config-update',status:true,data:updateConfig(req.body)})
              })
              .catch((error)=>{
                res.status(200).json({reqName:'admin-get-config-update',status:false,error:error})
              })
          }
            
         
    } catch (error) {
        res.status(200).json({reqName:'admin-get-config-update',status:false,error:error})
    }
  
  
})
//네비게이션 데이터
route.post('/navgation',(req,res)=>{
    console.log('admin-get-navgation')
    res.status(200).json({reqName:'admin-get-navgation'})
})
//네비게이션 데이터 수정
route.post('/navgation-update',(req,res)=>{
    console.log('admin-navgation-update')
    res.status(200).json({reqName:'admin-navgation-update'})
})
module.exports = route;