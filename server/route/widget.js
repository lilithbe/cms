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
route.post('/delete/:widgetId',(req,res)=>{
    const reqName ='widget-delete'
    const widgetId =req.params.widgetId
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
            Table('page').update(req.body,{
                where: {
                    id: {
                      [Op.eq]:req.body.id
                    },
                  }, 
            })
            .then((data) => {
                Table('widget').findOne({
                    where: {
                        id: {
                          [Op.eq]:widgetId
                        },
                      }, 
                })
                .then((widget) => {
                    if(widget){
                        Table('widget').destroy({
                            where: {
                                id: {
                                  [Op.eq]:widgetId
                                },
                              }, 
                        })
                        .then(() => {
                            console.log('위젯 삭제')
                            res.status(200).json({ reqName:'page_set_data',status: true }) 
                        })
                        .catch((err) => {
                            res.status(200).json({ reqName:reqName,status: false, error: err })  
                        })
                    }else{
                        console.log('페이지 데이터만 수정')
                        res.status(200).json({ reqName:'page_set_data',status: true }) 
                    }
                    
                })
                .catch((err) => {
                    res.status(200).json({ reqName:reqName,status: false, error: err })  
                })
            })
            .catch((err) => {
                res.status(200).json({ reqName:'page_set_data',status: false, error: err,message:'' })  
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
    console.log(reqName)
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

                const createData = {
                    id: widgetId,
                    label: '',
                    viewGrade: 0,
                    component: '',
                    data: {},
                    options: {},
                    styled: '',
                    className: ''
                }

                Table('widget').create(createData)
                .then((newData) => {
                    res.status(200).json({ reqName:reqName,status: true, data: newData.dataValues })
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
 module.exports = route;