import express from "express";
import { Op } from 'sequelize'
import { Table} from '../../managers/modelsManager/index'
import jwt from "jsonwebtoken";
const route = express.Router();

//그룹 목록
route.post('/category',(req,res)=>{
    console.log('product-category-id-list')  
    console.log(req.body.id)
    console.log(req.body.offset,req.body.limit)

    try {
           Table('production').findAll({
            offset:req.body.offset,
            limit:req.body.limit ,
          where: {
            categoryCode: {
                [Op.eq]: req.body.id,
            },
          },
        })
               .then((list) => {
                   res.status(200).json({reqName:'product-category-id-list',status: true,productList:list })
               })
               .catch((err) => {
                console.log('1err')
                   res.status(200).json({ reqName:'product-category-id-list',status: false, error: err })
               })
      } catch (err) {
        console.log('2err')
       res.status(200).json({ reqName:'product-category-id-list',status: false, error: err })
      }
})
route.post('/dateup',(req,res)=>{
  try {
    Table('production').findAll(
      {  offset:req.body.offset,
        limit:req.body.limit ,
        order: [["updatedAt", "DESC"]],
      }
    )
        .then((list) => {
            res.status(200).json({reqName:'업데이트 순서로',status: true,productList:list })
        })
        .catch((err) => {
         console.log('1err')
            res.status(200).json({ reqName:'업데이트 순서로',status: false, error: err })
        })
} catch (err) {
 console.log('2err')
res.status(200).json({ reqName:'업데이트 순서로',status: false, error: err })
}
})



module.exports = route;