/**
 * 회원관리
 */
 import express from "express";
 import { Table } from '../../managers/modelsManager/index'
 import bcrypt from "bcrypt"
 import jwt from "jsonwebtoken";
 import { Op } from 'sequelize'
 import env from 'dotenv'
 import {v4} from 'uuid'
 env.config()


const route = express.Router();
route.post('/admin_list',(req,res)=>{
    const reqName ='admin-member-list'
    try {
        if(isAdmin(req)){
            Table('accounts').findAll({
                attributes: ['email', 'useName' ,"isLock",
                 'nickName','firstName','lastName',
                 'fullName','userId','no','userImage','isEmailCheck',
                 'isAdmin','level','grade','age','mobile','address','birthday',"createdAt","updatedAt"
                ],
                where: {
                    isAdmin: {
                      [Op.eq]: true,
                    },
                  },

            })
            .then((data)=>{
                 
                res.status(200).json({reqName:reqName,status:true,list:data})
              })
              .catch((error)=>{
                res.status(200).json({reqName:reqName,status:false,error:error})
              })
        }else{
            res.status(200).json({reqName:reqName,status:false,error:'운영자가 아닙니다.'})
        }
    } catch (error) {
        res.status(200).json({reqName:reqName,status:false,error:error})
    }



 
})

//회원목록
route.post('/list',(req,res)=>{
    const reqName ='admin-member-list'
    try {
        if(isAdmin(req)){
            Table('accounts').findAll({
                attributes: ['email', 'useName' ,"isLock",
                 'nickName','firstName','lastName',
                 'fullName','userId','no','userImage','isEmailCheck',
                 'isAdmin','level','grade','age','mobile','address','birthday',"createdAt","updatedAt"
                ]
            })
            .then((data)=>{
                 
                res.status(200).json({reqName:reqName,status:true,list:data})
              })
              .catch((error)=>{
                res.status(200).json({reqName:reqName,status:false,error:error})
              })
        }else{
            res.status(200).json({reqName:reqName,status:false,error:'운영자가 아닙니다.'})
        }
    } catch (error) {
        res.status(200).json({reqName:reqName,status:false,error:error})
    }



 
})
//회원의 프로필 데이터
route.post('/profile',(req,res)=>{
    const reqName ='admin-member-profile'
    try {
        if(isAdmin(req)){

        }else{
            res.status(200).json({reqName:reqName,status:false,error:'운영자가 아닙니다.'})
        }
    } catch (error) {
        res.status(200).json({reqName:reqName,status:false,error:error})
    }
})
//회원 영구삭제및 ip 광역차단
route.post('/delete',(req,res)=>{
    const reqName ='admin-member-delete'
    try {
        if(isAdmin(req)){

        }else{
            res.status(200).json({reqName:reqName,status:false,error:'운영자가 아닙니다.'})
        }
    } catch (error) {
        res.status(200).json({reqName:reqName,status:false,error:error})
    }
})
//회원정보 수정
route.post('/update/data',(req,res)=>{
    const reqName ='admin-member-update-data'
    try {
        if(isAdmin(req)){
            Table('accounts').update(req.body,{
                where:{
                    no:{
                        [Op.eq]: req.body.no
                    }
                }
            })
                .then(() => {
                    res.status(200).json({ reqName: reqName, status: true })
                })
                .catch((err) => {
                    res.status(200).json({ reqName: reqName, status: false, error: err })
                })
        }else{
            res.status(200).json({reqName:reqName,status:false,error:'운영자가 아닙니다.'})
        }
    } catch (error) {
        res.status(200).json({reqName:reqName,status:false,error:error})
    }
})
route.post('/update/password',(req,res)=>{
    const reqName ='admin-member-update-password'
    try {
        if(isAdmin(req)){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                req.body.password = hash;
                Table('accounts').update(req.body,{
                    where:{
                        no:{
                            [Op.eq]: req.body.no
                        }
                    }
                })
                    .then(() => {
                        res.status(200).json({ reqName: reqName, status: true })
                    })
                    .catch((err) => {
                        res.status(200).json({ reqName: reqName, status: false, error: err })
                    })
            })


        }else{
            res.status(200).json({reqName:reqName,status:false,error:'운영자가 아닙니다.'})
        }
    } catch (error) {
        res.status(200).json({reqName:reqName,status:false,error:error})
    }
})

route.post('/update/datas', async(req,res)=>{
    const reqName ='admin-member-update-datas'
    try {
        if(isAdmin(req)){
            console.log(req.body)
            Table('accounts').bulkCreate(req.body,{
                updateOnDuplicate: ["no"],
            })
            .then((requestData) => {
                res.status(200).json({reqName:reqName,status:true,data:requestData})
             
            })
            .catch((err) => {
                console.log(err)
                res.status(200).json({reqName:reqName,status:false,error:err})
            })

             
        }else{
            res.status(200).json({reqName:reqName,status:false,error:'운영자가 아닙니다.'})
        }
    } catch (error) {
        console.log(2)
        res.status(200).json({reqName:reqName,status:false,error:error})
    }
})


module.exports = route;

const isAdmin = (req) => {
    const userData = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
    if(userData.grade>10)return true
    else return false
}
