/**
 * check Api
 */
 import express from "express";
 import {Table} from '../managers/modelsManager/index'
 import { Op } from 'sequelize'
 import jwt from "jsonwebtoken";
 import {v4} from 'uuid' 
 const route = express.Router();
 route.post('/create',(req,res)=>{
     const reqName ='page-create'
     try {
        const userData = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
          ); //토큰검증및 유저정보
            if(userData){

                Table('page').create(req.body)
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
     const reqName ='page-update'
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
               Table('page').update(req.body,{
                where: {
                    pageName: {
                    [Op.eq]:req.body.pageName
                  },
                 },
               })
               .then( (data) => {  
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
route.post('/delete',(req,res)=>{
    const reqName ='page-delete'
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
           
            Table('page').destroy({
                where: {
                    sectionId: {
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
 route.post('/get_data/:path',(req,res)=>{
    try {
          Table('page').findOne({
            where: {
                path: {
                  [Op.eq]:req.params.path,
                },
              }, 
        })
        .then((data) => {
            if(data){
                res.status(200).json({ reqName:'page_get_data',status: true, data: data.dataValues }) 
            }else{
                res.status(200).json({ reqName:'page_get_data',status: false, message:'요청한 페이지의 데이터가 없습니다. 신규 페이지등록을 완료하세요.' }) 
            }
            
            
        })
        .catch((err) => {
        
            res.status(200).json({ reqName:'page_get_data',status: false, error: err,message:'' })  
        })
       
     } catch (error) {
    
        res.status(200).json({ reqName:'page_get_data',status: false, error: error,message:'' })
     }
})


route.post('/set_data/:path',(req,res)=>{
 
    try {
          Table('page').findOne({
            where: {
                path: {
                  [Op.eq]:req.params.path,
                },
              }, 
        })
        .then((data) => {
            if(data){
                Table('page').update(req.body,{
                    where: {
                        path: {
                          [Op.eq]:req.params.path,
                        },
                      }, 
                })
                .then( (data) => {
                    const saveDelete = async (newWidget,deleteWidget)=>{
                        await newWidget.forEach(async(element,i) => {
                           await Table('widget').create({  id: element,
                            label: '',
                            viewGrade: 0,
                            component: '',
                            data: [],
                            options: {},
                            styled: '',
                            className: '',}).then(()=>{
                            console.log(i)
                        })
                        });
                        await deleteWidget.forEach(async(element,i) => {
                            await Table('widget').destroy({
                                where: {
                                    id: {
                                    [Op.eq]:element
                                  },
                                 },
                            }).then(()=>{
                                console.log(i)
                            })
                        });
                    }
                    saveDelete(req.body.newWidget,req.body.deleteWidget).then(()=>{
                        console.log('완료')
                        res.status(200).json({ reqName:'page_set_data',status: true, data: data.dataValues }) 
                    })
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'page_set_data',status: false, error: err,message:'' })  
                })
            }else{
                req.body.id=v4()
                Table('page').create(req.body,)
                .then((data) => {
                    const saveDelete = async (newWidget,deleteWidget)=>{
                        await newWidget.forEach(async(element,i) => {
                            await Table('widget').create({  id: element,
                             label: '',
                             viewGrade: 0,
                             component: '',
                             data: [],
                             options: {},
                             styled: '',
                             className: '',}).then(()=>{
                             console.log(i)
                         })
                         });
                         await deleteWidget.forEach(async(element,i) => {
                             await Table('widget').destroy({
                                 where: {
                                     id: {
                                     [Op.eq]:element
                                   },
                                  },
                             }).then(()=>{
                                 console.log(i)
                             })
                         });
                     }
                     saveDelete(req.body.newWidget,req.body.deleteWidget).then(()=>{
                         console.log('완료')
                         res.status(200).json({ reqName:'page_set_data',status: true, data: data.dataValues }) 
                     })
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'page_set_data',status: false, error: err,message:'' })  
                })
            }
        })
        .catch((err) => {
            res.status(200).json({ reqName:'page_set_data',status: false, error: err,message:'' })  
        })
       
     } catch (error) {
        res.status(200).json({ reqName:'page_set_data',status: false, error: error,message:'' })
     }
})



 module.exports = route;