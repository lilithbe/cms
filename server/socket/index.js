import jwt from "jsonwebtoken";
import {
  getGroupList,
  getBoardList,
  getConfig,
  getJoinUser,
  updateJoinUser,
  updateAccount,
  getMyFallowData,
  getFallowMeData,
  getUserList
} from '../data'
import { Table } from "../managers/modelsManager";
import { Op } from 'sequelize'
import moment from 'moment'
import fs from "fs";
let ALL_USERS=[]
let LOG=[]
const setLog=(log)=>{
  log.created=moment()
  LOG.push(log)
}
let GUEST_USER=[]
let LOGIN_USER=[]
const main = (io) => {
  // 접속한 소켓 기록을 모두 삭제합니다.
  Table('log_joinUser').destroy({
    where: {},truncate: true
  })
  setLog({type:'server start',value:`서버를 시작합니다.`})
  setInterval(() => {
    setLog({type:'save log',value:`기록을 데이터베이스에 저장합니다.`})
  }, 1000*60*60);

  io.on("connection", (socket) => {    
    
    socket.on("start",()=>{
      const joinUser = Array.from(getJoinUser())      
      socket.join("start");
       joinUser.push({
          socketId:socket.id,
          status:"start",
          isLogin:false,
          room:'start'
        })
        updateJoinUser(joinUser)
        setLog({type:'start',value:`${socket.id} start.`})
      socket.emit("start",
      {
        config:getConfig() ,
        groupData:getGroupList(),
        boardData:getBoardList(),
      })
        
    })

    socket.on('login',(token,callback)=>{
      try {
        socket.join("lobby"); //룸 변경
        const tokenVerifyValue=tokenVerify(token) //토큰 확인및 겟유저정보
  
        const userData = { //유저데이터 
          ...tokenVerifyValue, 
          socketId:socket.id,
          isLogin:true,
          status:'login',
          room:'lobby',
          loginDate:new Date()
        }
        const joinUserList=Array.from(getJoinUser()) //접속한 소켓리스트
        const allUser = Array.from(getUserList()) //회원가입된 모든유저
        
        const indexMyAccount = allUser.findIndex(f=>f.userId===userData.userId) //일치하는 유저정보 인덱스
        //유저데이터 업데이트
        //TODO : 필요한 유저에게 emit
        allUser.splice(indexMyAccount,1, 
          { ...allUser[indexMyAccount],
          socketId:socket.id,
          isLogin:true,
          room:'lobby',
          loginDate:new Date(),
        })
        updateAccount(allUser)


        
        //접속한 유저리스트에 소켓아이디가 같은 항목 변경
        const index = joinUserList.findIndex(f=>f.socketId===socket.id) 
        joinUserList.splice(index,1, userData)
        updateJoinUser(joinUserList)
        callback({
          myFallow: getMyFallowData(userData.userId),
          falowMe: getFallowMeData(userData.userId)
        })
      } catch (error) {
        callback({
          error: error
        })
      }
     
    })

    socket.on('admin_message',(req,res)=>{
      //users:selectUsers,messageState:messageState,token:authData.userToken
      const userData = tokenVerify(req.token)
      if(userData.isAdmin){
        for (let i = 0; i < req.users.length; i++) {
          const user = req.users[i];
          io.to(user.socketId).emit('message',req.messageState)
        }
      }else{
        res({status:false , })
      }
      
    })

    socket.on('pathChange',(req,callback)=>{
      const result=req
      if(req.userType==='member'){
        const userData=tokenVerify(req.token)
        result.userId=userData.userId
        result.userData=userData
      }
      result.socketId=socket.id
      const prername =socket.request.connection._peername
      const ip = prername.address.split(":")[3] ||socket.handshake.address;
      result.ip=ip
      result.port=prername.port
      result.family=prername.family

      if(req.userType==='member'){
        Table('log_joinUser').findOne({
          where: {
            userId: {
              [Op.eq]: result.userId
          }
        },
        })
        .then((user)=>{
          if(user){
            // update
            
            Table('log_joinUser').update(result,{
              where: {
                userId: {
                  [Op.eq]: result.userId
              }
            },
            })
            .then(()=>{
              LOGIN_USER.splice(
                LOGIN_USER.findIndex((f) => f.userId === result.userId),
                1,
                result
              );
                  // 임시파일 삭제
                    Table("log_file")
                      .findAll({
                        where: {
                          write_id: {
                            [Op.eq]: result.userId
                          },
                          isWrite: {
                            [Op.eq]: true
                          },
                          isSave: {
                            [Op.eq]: false
                          }
                        },
                        attributes:["key","path"]
                      })
                      .then((files) => {
                        console.log(files)
                        for (let i = 0; i < files.length; i++) {
                          const file = files[i];
                          fs.unlink(file.path, () => {
                            Table("log_file").destroy({
                              where: {
                                key: {
                                  [Op.eq]: file.key
                                }
                              }
                            });
                          });
                        }
                      });
            })
          }else{
            // create
            LOGIN_USER.push(result)
            Table('log_joinUser').create(result)
          }
        })

        setLog({type:'pathChange',value:`${socket.id} ${result.pathname} pathChange.`})
      }else{
        Table('log_joinUser').findOne({
          where: {
            socketId: {
                [Op.eq]: socket.id
            },
        },
        })
        .then((user)=>{
          if(user){
            // update
            Table('log_joinUser').update(result,{
              where: {
                socketId: {
                    [Op.eq]: socket.id
                }
            },
            })
            GUEST_USER.splice(GUEST_USER.findIndex(f=>f.socketId===socket.id),1,result)
          }else{
            // create
            GUEST_USER.push(result)
            Table('log_joinUser').create(result)
          }
        })
        setLog({type:'pathChange',value:`${socket.id}${result.pathname} pathChange.`})
      }
      callback(result.ip)
    })
    
    socket.on('getJoinUser',(callback)=>{
      callback([...GUEST_USER,...LOGIN_USER])
    })
    socket.on("disconnect", () => {
  
      const allUser= Array.from(getUserList())
      const index = allUser.findIndex((f)=>f.socketId===socket.id)
      const userData={...allUser.filter(f=>f.socketId===socket.id)[0],
        isLogin:false,
      }
      const result = allUser.splice(index,1, userData)
      // setLog({type:'disconnect',value:`${socket.id} disconnect.`})
      updateAccount(result)
      Table('log_joinUser').findOne({
        where: {
          socketId: {
              [Op.eq]: socket.id
          }
      },
      attributes:['userId',"userType","userData"]
      }).then((user)=>{
        if(user){
          if(user.dataValues.userType==="member"){
            // 임시파일 삭제
            Table("log_file")
            .findAll({
              where: {
                write_id: {
                  [Op.eq]: user.dataValues.userId
                },
                isWrite: {
                  [Op.eq]: true
                },
                isSave: {
                  [Op.eq]: false
                }
              }
            })
            .then((files) => {
              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                fs.unlink(file.path, () => {
                  Table("log_file").destroy({
                    where: {
                      key: {
                        [Op.eq]: file.key
                      }
                    }
                  });
                });
              }
            });

          }
        }
      })
      Table('log_joinUser').destroy({
        where: {
          socketId: {
              [Op.eq]: socket.id
          }
      },
      })
      
  
      const fallowMe =getFallowMeData(userData.userId)
      const myFallow =getMyFallowData(userData.userId)
        //TODO : 팔로우미 ,마이팔로우 유저들에게 해당 유저의 접속 끊김을 알리기
    });
  });
};

export default main;


const tokenVerify =(token)=> jwt.verify(
  token,
  process.env.SECRET_KEY
);