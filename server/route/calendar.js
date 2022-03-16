/**
 * check Api
 */
 import express from "express";
 import {Table} from '../managers/modelsManager/index'
 import { Op } from 'sequelize'
 import jwt from "jsonwebtoken";
 const route = express.Router();
 const attributes = ['id','userId','start','end','startStr','endStr','title','content','userId','color','backgroundColor' , 'textColor','borderColor','created','updatedAt']
 route.post('/event/create',(req,res)=>{
     console.log('calendar-create')
     try {
        const userData = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
          ); //토큰검증및 유저정보
            if(userData){
                Table('calendar').create(req.body)
                .then(() => {
                    Table('calendar').findAll({
                        where: {
                            userId: {
                              [Op.eq]:userData.userId,
                            },
                          }, 
                          attributes:attributes
                    })
                    .then((data) => {
                        res.status(200).json({ reqName:'admins',status: true, list: data }) 
                    })
                    .catch((err) => {
                        res.status(200).json({ reqName:'config',status: false, error: err })  
                    })

                   
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'config',status: false, error: err })
                })
            }else{
                res.status(200).json({ reqName:'config',status: false, error: '' })
            }
       
     } catch (error) {
        
        res.status(200).json({ reqName:'config',status: false, error: error })
     }
   
 })
 route.post('/event/update',(req,res)=>{
    console.log('calendar-create')
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
               Table('calendar').update(req.body,{
                where: {
                    id: {
                    [Op.eq]:req.body.id
                  },
                 },
               })
               .then( async() => {  
                Table('calendar').findAll({
                    where: {
                        userId: {
                          [Op.eq]:userData.userId,
                        },
                      }, 
                      attributes:attributes
                })
                .then((data) => {
                    res.status(200).json({ reqName:'admins',status: true, list: data }) 
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'config',status: false, error: err })  
                })
               })
               .catch((err) => {
                   res.status(200).json({ reqName:'config',status: false, error: err })
               })
           }else{
               res.status(200).json({ reqName:'config',status: false, error: '' })
           }
      
    } catch (error) {
       res.status(200).json({ reqName:'config',status: false, error: error })
    }
  
})
route.post('/event/delete',(req,res)=>{
    console.log('calendar-delete')
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
           
            Table('calendar').destroy({
                where: {
                    id: {
                      [Op.eq]:req.body.id,
                    },
                  }, 
                  attributes:attributes
            })
            .then((data) => {
                Table('calendar').findAll({
                    where: {
                        userId: {
                          [Op.eq]:userData.userId,
                        },
                      }, 
                      attributes:attributes
                })
                .then((data) => {
                    res.status(200).json({ reqName:'admins',status: true, list: data }) 
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'config',status: false, error: err })  
                })
            })
            .catch((err) => {
                res.status(200).json({ reqName:'config',status: false, error: err })  
            })
           }else{
               res.status(200).json({ reqName:'config',status: false, error: '' })
           }
      
    } catch (error) {
       res.status(200).json({ reqName:'config',status: false, error: error })
    }
  
})
 route.post('/event/list',(req,res)=>{
    console.log('create-create')
    try {
        const userData = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
          ); //토큰검증및 유저정보
          Table('calendar').findAll({
            where: {
                userId: {
                  [Op.eq]:userData.userId,
                },
              }, 
              attributes:attributes
        })
        .then((data) => {
            res.status(200).json({ reqName:'admins',status: true, list: data }) 
        })
        .catch((err) => {
            res.status(200).json({ reqName:'config',status: false, error: err })  
        })
       
     } catch (error) {
         console.log(error)
        res.status(200).json({ reqName:'config',status: false, error: error })
     }
})

 module.exports = route;