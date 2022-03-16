/**
 * check Api
 */
 import express from "express";
 import {Table} from '../managers/modelsManager/index'
 import { Op } from 'sequelize'
 import {v4} from 'uuid'
 const route = express.Router();
 
 route.post('/create',(req,res)=>{
     const reqName ='vote-create'
     try {
        req.body.id=v4()
        Table('vote').create(req.body)
        .then((data) => {
            res.status(200).json({ reqName:reqName,status: true, data: data.dataValues })
        })
        .catch((err) => {
            res.status(200).json({ reqName:reqName,status: false, error: err })
        })      
     } catch (error) {
        
        res.status(200).json({ reqName:reqName,status: false, error: error })
     }
   
 })
 route.post('/update',(req,res)=>{
    const reqName ='vote-update'
    console.log('vote-update')
    try {
        Table('vote').update(req.body,{
            where: {
                id: {
                [Op.eq]:req.body.id
              },
             },
           })
           .then( (data)=> {
           res.status(200).json({ reqName:reqName,status: true, data: req.body })
           })
           .catch((err) => {
               res.status(200).json({ reqName:reqName,status: false, error: err })
           })
      
    } catch (error) {
       res.status(200).json({ reqName:reqName,status: false, error: error })
    }
  
})
route.post('/delete',(req,res)=>{
    const reqName ='vote-delete'
    console.log('vote-delete')
    try {
        Table('vote').destroy({
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
      
    } catch (error) {
       res.status(200).json({ reqName:reqName,status: false, error: error })
    }
  
})
 route.post('/list',(req,res)=>{
     const reqName ="vote-list"
    try {
          Table('vote').findAll()
        .then((data) => {
            res.status(200).json({ reqName:reqName,status: true, list: data }) 
        })
        .catch((err) => {
            res.status(200).json({ reqName:reqName,status: false, error: err })  
        })
       
     } catch (error) {
         console.log(error)
        res.status(200).json({ reqName:reqName,status: false, error: error })
     }
})
route.post('/view',(req,res)=>{
    const reqName ="vote-view"
    try {
          Table('vote').findOne({
            where: {
                id: {
                  [Op.eq]:req.body.id,
                },
              }, 
        })
        .then((data) => {
            res.status(200).json({ reqName:reqName,status: true, list: data }) 
        })
        .catch((err) => {
            res.status(200).json({ reqName:reqName,status: false, error: err })  
        })
       
     } catch (error) {
         console.log(error)
        res.status(200).json({ reqName:reqName,status: false, error: error })
     }
})

 module.exports = route;