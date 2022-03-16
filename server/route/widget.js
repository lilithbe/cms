 import express from "express";
 import {Table} from '../managers/modelsManager/index'
 import { Op } from 'sequelize'
 import jwt from "jsonwebtoken";
 const route = express.Router();
 const attributes = ['id','userId','start','end','startStr','endStr','title','content','userId','color','backgroundColor' , 'textColor','borderColor','created','updatedAt']
 route.post('/create',(req,res)=>{
     const reqName ='widget-create'
     try {
        const userData = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
          ); //토큰검증및 유저정보
            if(userData){
                Table('widget').create(req.body)
                .then((data) => {
                    res.status(200).json({ reqName:reqName,status: true, data: data.dataValues })
                })
                .catch((err) => {
                    res.status(200).json({ reqName:reqName,status: false, error: err })
                })
            }else{
                res.status(200).json({ reqName:reqName,status: false, error: '' })
            }
       
     } catch (error) {
        
        res.status(200).json({ reqName:reqName,status: false, error: error })
     }
   
 })
 route.post('/update',(req,res)=>{
    const reqName ='widget-update'
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
               Table('widget').update(req.body,{
                where: {
                    id: {
                    [Op.eq]:req.body.id
                  },
                 },
               })
               .then( (data)=> {  
               res.status(200).json({ reqName:reqName,status: true, data: data })
               })
               .catch((err) => {
                   res.status(200).json({ reqName:reqName,status: false, error: err })
               })
           }else{
               res.status(200).json({ reqName:reqName,status: false, error: '' })
           }
      
    } catch (error) {
       res.status(200).json({ reqName:reqName,status: false, error: error })
    }
  
})
route.post('/delete',(req,res)=>{
    const reqName ='widget-update'
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
            Table('widget').destroy({
                where: {
                    id: {
                      [Op.eq]:req.body.id,
                    },
                  }, 
            })
            .then(() => {
                res.status(200).json({ reqName:reqName,status: true }) 
            })
            .catch((err) => {
                res.status(200).json({ reqName:reqName,status: false, error: err })  
            })
           }else{
               res.status(200).json({ reqName:reqName,status: false, error: '' })
           }
      
    } catch (error) {
       res.status(200).json({ reqName:reqName,status: false, error: error })
    }
  
})

route.post('/set_data/:widgetId',(req,res)=>{
    const reqName ='set_widget'
    const widgetId =req.params.widgetId
    try {
        Table('widget').findOne({
            where: {
                id: {
                  [Op.eq]:widgetId
                },
              }, 
        })
        .then((data) => {
            if(data){
                Table('widget').update(req.body,
                    {
                        where: {
                            id: {
                              [Op.eq]:widgetId
                            },
                          }, 
                    })
                .then(() => {
                    res.status(200).json({ reqName:reqName,status: true  })
                })
                .catch((err) => {
                    res.status(200).json({ reqName:reqName,status: false, error: err })
                })
            }else{
                Table('widget').create(req.body)
                .then((data) => {
                    res.status(200).json({ reqName:reqName,status: true })
                })
                .catch((err) => {
                    res.status(200).json({ reqName:reqName,status: false, error: err })
                })
            }
            
        })
        .catch((err) => {
            res.status(200).json({ reqName:reqName,status: false, error: err })
        })
      
    } catch (error) {       
       res.status(200).json({ reqName:reqName,status: false, error: error })
    }
  
})

route.post('/get_data/:widgetId',(req,res)=>{
    const reqName ='get_data'
    const widgetId =req.params.widgetId
    try {
        Table('widget').findOne({
            where: {
                id: {
                  [Op.eq]:widgetId
                },
              }, 
        })
        .then((data) => {
            if(data){
                res.status(200).json({ reqName:reqName,status: true, data: data.dataValues })
            }else{
                res.status(200).json({ reqName:reqName,status: false, message: '해당위젯이 존재하지 않습니다.' }) 
            }
        })
        .catch((err) => {
            res.status(200).json({ reqName:reqName,status: false, error: err })
        })
      
    } catch (error) {       
       res.status(200).json({ reqName:reqName,status: false, error: error })
    }
  
})
 module.exports = route;