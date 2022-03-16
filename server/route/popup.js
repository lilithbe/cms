/**
 * popup Api
 */
 import express from "express";
 import {Table} from '../managers/modelsManager/index'
 import { Op } from 'sequelize'
 import jwt from "jsonwebtoken";
 const route = express.Router();
 import {v4} from 'uuid'
 route.post('/create',(req,res)=>{
     console.log('popup-create')
     try {
        const userData = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
          ); //토큰검증및 유저정보
            if(userData){
        
                Table('popup').create({...req.body,userId:userData.userId,id:v4()})
                .then( () => {
                
                    Table('popup').findAll()
                    .then((data) => {
                 
                       res.status(200).json( { reqName:'popup',status: true, list: data })
                    })
                    .catch((err) => {
                        res.status(200).json( { reqName:'popup',status: false, error: err })
                    })

                   
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'popup',status: false, error: err })
                })
            }else{
                res.status(200).json({ reqName:'popup',status: false, error: '' })
            }
       
     } catch (error) {
        console.log(error)
        res.status(200).json({ reqName:'popup',status: false, error: error })
     }
   
 })
 route.post('/update',(req,res)=>{
    console.log('popup-create')
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
               Table('popup').update(req.body,{
                where: {
                    id: {
                    [Op.eq]:req.body.id
                  },
                 },
               })
               .then((data) => {
                   console.log(data)
                Table('popup').findAll()
                .then((data) => {
                    res.status(200).json( { reqName:'popup',status: true, list: data })
                })
                .catch((err) => {
                    res.status(200).json( { reqName:'popup',status: false, error: err })
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
route.post('/delete',(req,res)=>{
    console.log('popup-delete')
    try {
       const userData = jwt.verify(
           req.headers.authorization,
           process.env.SECRET_KEY
         ); //토큰검증및 유저정보
           if(userData){
               Table('popup').destroy({
                where: {
                    id: {
                    [Op.eq]:req.body.id
                  },
                 },
               })
               .then(() => {
                Table('popup').findAll()
                .then((data) => {
                    res.status(200).json({ reqName:'popup',status: true, list: data }) 
                })
                .catch((err) => {
                    res.status(200).json({ reqName:'popup',status: false, error: err })
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
 route.post('/all_list',(req,res)=>{
    console.log('popup-list')
    try {
        Table('popup').findAll()
        .then((data) => {
            res.status(200).json({ reqName:'popup',status: true, list: data })
            
        })
        .catch((err) => {
            res.status(200).json({ reqName:'popup',status: false, error: err })
        })
        
       
     } catch (error) {
         console.log(error)
        res.status(200).json({ reqName:'config',status: false, error: error })
     }
})
route.post('/use_list',(req,res)=>{
    console.log('popup-list')
    try {
        Table('popup').findAll({
            where: {
                isUse: {
                [Op.eq]:true
              },
             },
        })
        .then((data) => {
            res.status(200).json( { reqName:'popup',status: true, list: data })
        })
        .catch((err) => {
            res.status(200).json( { reqName:'popup',status: false, error: err })
        })  
     } catch (error) {
         console.log(error)
        res.status(200).json({ reqName:'config',status: false, error: error })
     }
})


 module.exports = route;