 import express from "express";
 import { Op } from 'sequelize'
 import { Table} from '../../managers/modelsManager/index'
 import jwt from "jsonwebtoken";
 const route = express.Router();
 
 //그룹 목록
 route.post('/root-list',(req,res)=>{
     console.log('root-list')   
     try {
            Table('category').findAll({
                where: {
                    level: {
                        [Op.eq]: 1
                    }
                }
                })
                .then((list) => {
                    res.status(200).json({reqName:'category-list',status: true,  categorys:list })
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'category-list',status: false, error: err })
                })
       } catch (err) {
        res.status(200).json({ reqName:'category-list',status: false, error: err })
       }
 })


 route.post('/children-list',(req,res)=>{
    console.log('children-list')   
    try {
           Table('category').findAll({
               where: {
                parentId: {
                       [Op.eq]: req.body.parentId
                   }
               }
               })
               .then((list) => {
                   res.status(200).json({reqName:'children_category-list',status: true,  categorys:list })
               })
               .catch((err) => {
                   res.status(200).json({ reqName:'children_category-list',status: false, error: err })
               })
      } catch (err) {
       res.status(200).json({ reqName:'_childrencategory-list',status: false, error: err })
      }
})

route.post('/getcount',(req,res)=>{
    console.log('getcount')   
    console.log(req.body.level===1?'middleCategory':req.body.level===2?'smallCategory':req.body.level===3?'detailCategory':'bigCategory');
    try {
           Table('production').count({
               where: {
                  [req.body.level===2?'middleCategory':req.body.level===3?'smallCategory':req.body.level===4?'detailCategory':'bigCategory']:{
                    [Op.eq]: req.body.name
                   },
               }
               })
               .then((count) => {
                   res.status(200).json({reqName:'children_category-list',status: true, count:count  })
               })
               .catch((err) => {
                   res.status(200).json({ reqName:'children_category-list',status: false, error: err })
               })
      } catch (err) {
       res.status(200).json({ reqName:'_childrencategory-list',status: false, error: err })
      }
})


 
 module.exports = route;