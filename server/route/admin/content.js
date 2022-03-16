/**
 * 컨텐츠 관리
 */
 import env from 'dotenv'
import express from "express";
import { Table } from "../../managers/modelsManager";
import db from "../../managers/dbManager/db"
import {content,content_comment,} from '../../managers/models'
import { Op } from 'sequelize'
import jwt from "jsonwebtoken";
import {adminCheck} from '../../lib/check'
import {v4} from 'uuid'
env.config()
const prefix = process.env.PREFIX
const route = express.Router();

const query= (tableName, model)=>{  
    const content= db.sequelize.define(tableName,
        model,
    {
      freezeTableName: true,
        timestemps:false,    
    }
)
    return content
}


route.post('/group-list',(req,res)=>{    
    console.log('admin-group-list')
    if(adminCheck(req.headers.authorization)){
        Table('config_group').findAll()
        .then((groupData) => {
            res.status(200).json({reqName:'admin-group-list',status: true,  data:groupData })
        })
        .catch((err) => {
            res.status(200).json({ reqName:'admin-group-list',status: false, error: err }) 
        })
    }else{
        res.status(200).json({ reqName:'admin-group-list',status: false, error: "관리자가 아닙니다." })  
    }  
})
/**
 * 그룹생성
 * 그룹을 생성한뒤 전체 그룹리스트를 반환
 */
route.post('/group-create',(req,res)=>{
    req.body.id=v4()
    console.log('admin-group-create')
    if(adminCheck(req.headers.authorization)){
        Table('config_group').create(
            req.body
        )
        .then(() => {
            Table('config_group').findAll()
            .then((groupData) => {
                res.status(200).json({reqName:'admin-group-create',status: true,  data:groupData })
            })
            .catch((err) => {
                res.status(200).json({ reqName:'admin-group-create',status: false, error: err }) 
            })
        })
        .catch((err) => {
            console.log('admin-group-create Error : ', err)
            res.status(200).json({ reqName:'admin-group-create',status: false, error: err })     
        })
    }else{
        res.status(200).json({ reqName:'admin-group-create',status: false, error: "관리자가 아닙니다." })  
    } 
  
})

/**
 * 그룹 삭제
 * 그룹
 */
route.post('/group-delete',(req,res)=>{
    console.log('admin-group-delete')
     if(adminCheck(req.headers.authorization)){
        Table('config_group').destroy(
            {
                where: {
                    id: {
                        [Op.eq]: req.body.id
                    }
                }
              }
        )
        .then(() => {
                /**
                 * 그룹의 완전한 삭제를 위해 그룹에 속한 게시판의 상태를 비활성화 시킨다.
                 * 그룹에 속한 게시판의 그룹속성을 모두 삭제시킨다.
                 */
            Table('config_board').findAll( {
                where: {
                    groupId: {
                        [Op.eq]: req.body.id
                    }
                }
              })
            .then((boardList) => {
             
                for (let i = 0; i < boardList.length; i++) {                  
                    const data = boardList[i];                   
                    Table('config_board').update(
                        {
                        groupId:null,
                        groupData:null,
                        isUse:false
                    }, {
                            where: {
                                id: {
                                    [Op.eq]: data.id
                                }
                            }
                          }
                    )
                    .then(() => {
                        if(i+1 === boardList.length){
                            Table('config_board').findAll()

                            .then((boardData) => {
                                console.log(boardData.leng)

                        /**
                         * 작업이 성공할경우 리턴할 데이터
                         */
                                Table('config_group').findAll()
                                .then((data) => {
                                    res.status(200).json({reqName:'admin-group-delete',status: true,data:data})
                                })
                                .catch((err) => {
                                    console.log('admin-group-delete Error : ', err)
                                    res.status(200).json({ reqName:'admin-group-delete',status: false, error: err })     
                                })


                            })
                            .catch((err) => {
                                console.log('config_board check Error : ', err)   
                            })

                            
                        }
                    })
                    .catch((err) => {
                    })
                }
          

            })
            .catch((err) => {
                console.log('admin-group-delete Error : ', err)
                res.status(200).json({ reqName:'admin-group-delete',status: false, error: err })     
            })






              


        })
        .catch((err) => {
            console.log('admin-group-delete Error : ', err)
            res.status(200).json({ reqName:'admin-group-delete',status: false, error: err })     
        })
    }else{
        res.status(200).json({ reqName:'admin-group-list',status: false, error: "관리자가 아닙니다." })  
    }  
})

//그룹 수정 
route.post('/group-update',(req,res)=>{
    console.log('admin-group-update')
    Table('config_group').update(
        req.body, {
            where: {
                id: {
                    [Op.eq]: req.body.id
                }
            }
          }
    )
    .then(() => {
        Table('config_group').findAll()
        .then((data) => {
            res.status(200).json({reqName:'admin-group-update',status: true,data:data})
        })
        .catch((err) => {
            console.log('admin-group-update Error : ', err)
            res.status(200).json({ reqName:'admin-group-update',status: false, error: err })     
        })
    })
    .catch((err) => {
        console.log('admin-group-update Error : ', err)
        res.status(200).json({ reqName:'admin-group-update',status: false, error: err })     
    })
})

//게시판 목록 
route.post('/board-list',(req,res)=>{
    console.log('admin-board-list')
    Table('config_board').findAll()

    .then((boardData) => {
        res.status(200).json({reqName:'config_board',status: true,  boardConfig:boardData })
    })
    .catch((err) => {
        console.log('config_board check Error : ', err)
        res.status(200).json({ reqName:'config_board',status: false, error: err })     
    })
})
//게시판 생성
route.post('/board-create',(req,res)=>{
    console.log('admin-board-create')
    const createTableName = prefix+'_write_'+req.body.value
    req.body.id=v4()
    Table('config_board').create(req.body)
    .then((newData) => {
        query(createTableName, content) 
        .sync()
        .then(()=>{
            query(createTableName+'_comment', content_comment) 
            .sync()
            .then(()=>{
            
                Table('config_board').findAll()
                .then((boardData) => {
                    res.status(200).json({ reqName: 'admin-board-create', status: true,data:boardData })
                })
                .catch((err) => {
                    res.status(200).json({ reqName: 'admin-board-create', status: false, error: err })
                })
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'admin-board-create', status: false, error: err })
            })
        })
        .catch((err) => {
            res.status(200).json({ reqName: 'admin-board-create', status: false, error: err })
        }) 
    })
    .catch((err) => {
        res.status(200).json({ reqName: 'admin-board-create', status: false, error: err })
    })

})
/**
 * 게시판 삭제
 * 1. 해당 게시판 테이블 삭제
 * 2. 해당 게시판의 코맨트 게시판 테이블 삭제
 * 3. 해당 게시판의 컨피그 내용 한줄 삭제
 * 4. 해당 게시판의 콘텐츠 카운터만큼 그룹카운터 업데이트
 * 5. 전체 게시판,전체 그룹정보 전송
 */
route.post('/board-delete',(req,res)=>{
    console.log('admin-board-delete')
    console.log(req.body.contentCount)
    const deleteTableName = prefix+'_write_'+req.body.value
    const deleteCommentTableName = deleteTableName+'_comment'
    db.queryInterface.dropTable(deleteTableName) //1. 해당 게시판 테이블 삭제
    .then(()=>{
        db.queryInterface.dropTable(deleteCommentTableName)//2. 해당 게시판의 코맨트 게시판 테이블 삭제
        .then(()=>{
            // res.status(200).json({ reqName: 'admin-board-delete', status: true, })
            Table('config_board').destroy( //3. 해당 게시판의 컨피그 내용 한줄 삭제
                {
                    where: {
                        id: {
                            [Op.eq]: req.body.id
                        }
                    }
                  }
            )
            .then(()=>{
              //4. 해당 게시판의 콘텐츠 카운터만큼 그룹카운터 업데이트
                Table('config_group').findOne(   //4-1 . 해당게시판의 부모그룹정보 가져오기
                    {
                        where: {
                            id: {
                                [Op.eq]: req.body.groupId
                            }
                        }
                      }
                )
                .then((groupData)=>{
                    console.log(groupData)
                    groupData.dataValues.contentCount = groupData.dataValues.contentCount  - req.body.contentCount
                    Table('config_group').update(   //4-2 . 해당게시판의 부모그룹 콘텐츠 카운터에 해당게시판수자만큼 제하고 변경
                        groupData.dataValues,
                        {
                            where: {
                                id: {
                                    [Op.eq]: req.body.groupId
                                }
                            }
                          }
                    )
                    .then((groupData)=>{
                 
        
        
        
                    })
                    .catch((err) => {
                        res.status(200).json({ reqName: 'admin-board-delete', status: false, error: err })
                    })

    
    
    
                })
                .catch((err) => {
                    res.status(200).json({ reqName: 'admin-board-delete', status: false, error: err })
                })


            })
            .catch((err) => {
                res.status(200).json({ reqName: 'admin-board-delete', status: false, error: err })
            })
        })
        .catch((err) => {
            res.status(200).json({ reqName: 'admin-board-delete', status: false, error: err })
        })
      
    })
    .catch((err) => {
        res.status(200).json({ reqName: 'admin-board-delete', status: false, error: err })
    })
    
})
//게시판 수정
route.post('/board-update',(req,res)=>{
    console.log('admin-board-update')  
    Table('config_board').update(
        req.body, {
            where: {
                no: {
                    [Op.eq]: req.body.no
                }
            }
          }
    )

    .then(() => {
        Table('config_board').findAll()
        .then((data) => {
            res.status(200).json({reqName:'admin-board-update',status: true,data:data})
        })
        .catch((err) => {
            console.log('admin-board-update Error : ', err)
            res.status(200).json({ reqName:'admin-board-update',status: false, error: err })     
        })
    })
    .catch((err) => {
        console.log('admin-board-update Error : ', err)
        res.status(200).json({ reqName:'admin-board-update',status: false, error: err })     
    })

})

module.exports = route;