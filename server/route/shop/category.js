 import express from "express";
 import { Op } from 'sequelize'
 import { Table} from '../../managers/modelsManager/index'
 import {v4} from 'uuid'
 const route = express.Router();
 

 route.post('/all-list',(req,res)=>{
     try {
            Table('category').findAll()
                .then((list) => {
                    res.status(200).json({reqName:'category-list',status: true,  list:list })
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'category-list',status: false, error: err })
                })
       } catch (err) {
        res.status(200).json({ reqName:'category-list',status: false, error: err })
       }
 })
 route.post('/create',(req,res)=>{
    try {
            req.body.id=v4()
        Table('category').findOne({
            where: {
             label: {
                    [Op.eq]: req.body.label
                }
            }
            })
            .then((list) => {
                if(list){
                    console.log(list)
                    res.status(200).json({ reqName: 'category-list', status: false, error: '중복된 이름입니다.' })
                }else{
                    Table('category').create(req.body)
                    .then((data) => {
                        res.status(200).json({ reqName: 'category-list', status: true, data: data })
                    })
                    .catch((err) => {
                        res.status(200).json({ reqName: 'category-list', status: false, error: err })
                    })
                }
              
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'category-list', status: false, error: err })
            })
      } catch (err) {
       res.status(200).json({ reqName:'category-list',status: false, error: err })
      }
})



 route.post('/children-list/:parentId',(req,res)=>{
    console.log('children-list')   
    try {
           Table('category').findAll({
               where: {
                id: {
                       [Op.eq]: req.params.parentId
                   }
               }
               })
               .then((list) => {
                   res.status(200).json({reqName:'children_category-list',status: true,  list:list })
               })
               .catch((err) => {
                   res.status(200).json({ reqName:'children_category-list',status: false, error: err })
               })
      } catch (err) {
       res.status(200).json({ reqName:'_childrencategory-list',status: false, error: err })
      }
})

route.post('/delete/:id',(req,res)=>{
    try {
            Table('category').destroy({
                where: {
                    [Op.or]: [
                        {
                            path: {
                                [Op.like]: "%" + '/' + req.body.label 
                            }
                        },
                        {
                            path: {
                                [Op.like]: "%" + '/' + req.body.label +'/'+ "%"
                            }
                        },
                        {
                            id: {
                                [Op.eq]: req.body.id
                            }
                        },
                    ]
                }
            })
            .then((list) => {
                Table('category').findAll()
                    .then((list) => {
                        res.status(200).json({ reqName: 'children_category-list', status: true, list: list })
                    })
                    .catch((err) => {
                        res.status(200).json({ reqName: 'children_category-list', status: false, error: err })
                    })
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'category-delete', status: false, error: err })
            })





  
        //    Table('category').destroy({
        //     where: {
        //      id: {
        //             [Op.eq]: req.params.id
        //         }
        //     }
        //     })
        //        .then(() => {
        //            res.status(200).json({reqName:'category-delete',status: true, })
        //        })
        //        .catch((err) => {
        //            res.status(200).json({ reqName:'category-delete',status: false, error: err })
        //        })
      } catch (err) {
       res.status(200).json({ reqName:'category-delete',status: false, error: err })
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