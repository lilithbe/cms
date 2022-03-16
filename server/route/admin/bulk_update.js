import express from "express";
import jwt from "jsonwebtoken";
import {Table} from '../../managers/modelsManager/index'
import { Op } from 'sequelize'
const route = express.Router();
//config 데이터
route.post('/update',(req,res)=>{
    const reqName ='bulk upload'
    try {
        if(isAdmin(req)){
            const tableValue = req.body.tableValue
            const arrayData = req.body.arrayData
            const update = async ()=>{
                arrayData.forEach( (inData,index) => {
                 
                    Table(tableValue).update(inData,{
                        where:{
                            id:{
                                [Op.eq]: inData.id
                            }
                        }
                    })
                        .then(() => {
                            console.log('update-bulk : ',index)
                        })
                        .catch((err) => {
                            console.log('err-',index,err)
                        })
                });
            }
            update().then(()=>{
                Table(tableValue).findAll()
                    .then((data) => {
                        res.status(200).json({reqName:reqName,status:true,data:data })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(200).json({reqName:reqName,status:false,error:err })
                    })
            }).catch(err=>{
                console.log(err)
                res.status(200).json({reqName:reqName,status:false,error:err })
            })
                
           

        }else{
            res.status(200).json({reqName:reqName,status:false,error:'관리자가 아님' })
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({reqName:reqName,status:false,error:error })
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