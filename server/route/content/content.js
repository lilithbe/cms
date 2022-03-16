/**
 * content Api
 */
import express from "express";
import { Op } from 'sequelize'
import {contentTable, Table} from '../managers/modelsManager/index'
import jwt from "jsonwebtoken";
const route = express.Router();

//그룹 목록
route.post('/group-list',(req,res)=>{
    console.log('content-group-list')
    res.status(200).json({reqName:'content-group-list'})
})
//요청하는 그룹의 게시판의 컨텐츠 요청
route.post('/group-content-list',(req,res)=>{
    console.log('content-group-content-list')
    Table('config_board').findAll({
        where: {
            groupId: {
                [Op.eq]: req.body.groupId
            }
        }
    })
    .then((boardList) => {
       const contentList = boardList.map(async (data)=>{
           await contentTable(data.value).findAll()
            .then((list) => {
                return {status:true ,list:list}
            })
            .catch((err) => {
                return {status:false}
            })
        })
        res.status(200).json({ reqName:'content-group-content-list',status: true, list: contentList })
        
    })
    .catch((err) => {
        res.status(200).json({ reqName:'content-group-content-list',status: false, error: err })
    })
})
//게시판 목록
route.post('/board-list',(req,res)=>{
    console.log('content-board-list')
    res.status(200).json({reqName:'content-board-list'})
})
//게시판 전체 컨텐츠 목록
route.post('/list',(req,res)=>{
    console.log('content-list')
    let pageNumver = req.body.pageNumber
    let setOffset= 0
    if(pageNumver > 1){
        setOffset = req.body.limit * (pageNumver - 1)
    }
   
    contentTable(req.body.boardValue).findAll({
        offset:setOffset,
        limit: req.body.limit 
    })
    .then((list) => {
        res.status(200).json({reqName:'content-list',status: true,  list:list })
    })
    .catch((err) => {
        res.status(200).json({ reqName:'content-list',status: false, error: err })
    })
})
//저장
route.post("/write", (req, res) => {
  const result = { reqName: "content-write" };
  const userToken = req.headers.authorization;
  console.log(result.reqName);
  try {
    const writer = jwt.verify(userToken, process.env.SECRET_KEY); //토큰검증및 유저정보
    const boardConfig = req.body.boardConfig; //게시판의 기본정보
    if (writer.grade >= boardConfig.createGrade) {
      //게시판 작성 권한 확인:그레이드
      if (writer.level >= boardConfig.createLevel) {
        //게시판 작성 권한 확인:레벨
        //게시물 저장
        contentTable(req.body.tableName)
          .create(req.body.data)
          .then(() => {
            //게시판 정보 가져오기
            Table("config_board")
              .findOne({
                where: {
                  value: {
                    [Op.eq]: req.body.tableName,
                  },
                },
              })
              .then((config) => {
                Table("config_board")
                  .update(
                    {
                      contentCount: config.dataValues.contentCount + 1,
                    },
                    {
                      where: {
                        value: {
                          [Op.eq]: req.body.tableName,
                        },
                      },
                    }
                  )
                  .then((list) => {
                    res
                      .status(200)
                      .json({ ...result, message: "저장완료,카운팅 완료" });
                  })
                  .catch((err) => {
                    res
                      .status(200)
                      .json({ ...result, error: err, message: "카운팅 실패" });
                  });
              })
              .catch((err) => {
                res
                  .status(200)
                  .json({ ...result, error: err, message: "카운팅 실패" });
              });
          })
          .catch((err) => {
            res
              .status(200)
              .json({ ...result, error: err, message: "데이터저장실패" });
          });
      } else {
        res.status(200).json({ ...result, message: "작성자 레벨이 낮음" });
      }
    } else {
      res
        .status(200)
        .json({ ...result, message: "작성자 그레이드 레벨이 낮음" });
    }
  } catch (err) {
    res.status(200).json({ ...result, error: err, message: "토큰만료" });
  }
});
//수정
route.post('/update',(req,res)=>{
    console.log('content-update')
    res.status(200).json({reqName:'content-update'})
})
//삭제
route.post('/delete',(req,res)=>{
    console.log('content-delete')
    res.status(200).json({reqName:'content-delete'})
})
//내용
route.post('/read',(req,res)=>{
    console.log('content-read')
    contentTable(req.body.tableName).findOne({
        where: {
            id: {
                [Op.eq]: req.body.contentId
            }
        }
    })
    .then((data) => {
        res.status(200).json({reqName:'content-list',status: true,  request:data })
    })
    .catch((err) => {
        res.status(200).json({ reqName:'content-list',status: false, error: err })
    })


})

module.exports = route;