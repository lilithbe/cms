import express from "express";
import { Op } from 'sequelize'
import { Table} from '../../managers/modelsManager/index'
import jwt from "jsonwebtoken";
const route = express.Router();

//그룹 목록
route.post('/bulk',(req,res)=>{
    console.log('bulk-upload')  
    console.log(req.body.data.length)
    try {
           Table('production').bulkCreate(req.body.data)
               .then(() => {
                   res.status(200).json({reqName:'category-list',status: true, })
               })
               .catch((err) => {
                console.log('1err')
                   res.status(200).json({ reqName:'category-list',status: false, error: err })
               })
      } catch (err) {
        console.log('2err')
       res.status(200).json({ reqName:'category-list',status: false, error: err })
      }
})




module.exports = route;