/**
 * auth Api
 */
import express from "express";
import { Table } from '../managers/modelsManager/index'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { Op } from 'sequelize'
import env from 'dotenv'
import {v4} from 'uuid'
import {getIp} from '../lib/getIp'
import { configInit } from "../install/init";
env.config()
const route = express.Router();

route.post('/email_check', (req, res) => {
    console.log('email_check')
    Table('accounts').findOne({
        where: {
            email: {
                [Op.eq]: req.body.email
            }
        }
    })
        .then((user) => {
            if(!user){
                res.status(200).json({ reqName: 'email_check', status: true })
            }else{
                res.status(200).json({ reqName: 'email_check', status: false ,data:{created:user.createdAt}})
            }
            
        })
        .catch((err) => {
            console.log(err)
            res.status(200).json({ reqName: 'email_check', status: false, error: err })
        })


})

route.post('/nickname_check', (req, res) => {
    console.log('nickname_check')
    Table('accounts').findOne({
        where: {
            nickName: {
                [Op.eq]: req.body.nickName
            }
        }
    })
        .then((user) => {
            if(!user){
                res.status(200).json({ reqName: 'nickname_check', status: true })
            }else{
                res.status(200).json({ reqName: 'nickname_check', status: false ,data:{created:user.createdAt}})
            }
            
        })
        .catch((err) => {
            console.log(err)
            res.status(200).json({ reqName: 'nickname_check', status: false, error: err })
        })


})

//회원 가입
route.post('/register', (req, res) => {
    console.log('auth-register')
    req.body.registerIp=getIp(req)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.userId=v4()
        req.body.password = hash;
        Table('accounts').create(req.body)
            .then(() => {
                Table('config').create(configInit(req.body.email))
                .then(() => {
                    res.status(200).json({ reqName: 'auth-register', status: true })
                })
                .catch((err) => {
                    res.status(200).json({ reqName: 'auth-register', status: false, error: err })
                }) 
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'auth-register', status: false, error: err })
            })
    })
 
})
// 로그인
route.post('/login', (req, res) => {
    console.log('auth-login')
    try {      
        const userIp = getIp(req)
        Table('accounts').findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email
                }
            }
        })
            .then((user) => {
                if (user) {
                    if(user.dataValues.type==='local'){
                        if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
                            Table('accounts').update({
                                lastLoginDate:new Date(),  //로그인 시간기록
                                lastIp:userIp
                            },{
                                where: {
                                    email: {
                                        [Op.eq]: req.body.email
                                    }
                                },
                              })
                            .then(() => {
                                const day = req.body.remember === true ? 60 * 60 * 24 * 365 : 60*60;
                                user.dataValues.remember = req.body.remember;
                                (user.dataValues.exp = Math.floor(Date.now()) + day),
                                    (user.dataValues.iat = Math.floor(Date.now()));
                                delete user.dataValues.password
                                user.dataValues.lastIp=userIp
                                let token = jwt.sign(
                                    {
                                        ...user.dataValues,
                                        exp: Math.floor(Date.now()/1000) + day,
                                        iat: Math.floor(Date.now()/1000),
                                    },
                                    process.env.SECRET_KEY
                                );
                                user.dataValues.userToken = token
                                res.status(200).json({ reqName: 'auth-login', status: true, data: user.dataValues, token: token })
                            })
                            .catch((err) => {
                                res.status(200).json({ reqName: 'social_join', status: false, error: err })
                            }) 
    
    
    
    
                         
                        } else {
                            res.status(200).json({ reqName: 'auth-login', status: false, error: '비밀번호가 틀립니다.' })
                        }
                    }else{
                        res.status(200).json({ reqName: 'auth-login', status: false, error: `가입유형을 확인하세요. [${user.dataValues.type}]` })
                    }
                    
    
                } else {
                    res.status(200).json({ reqName: 'auth-login', status: false, error: '존재하지 않는 아이디입니다. 아이디를 다시확인하세요' })
                }
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'auth-login', status: false, error: '관리자에게 문의하세요.' })
            })
    } catch (error) {
        res.status(200).json({ reqName: 'auth-login', status: false, error: '관리자에게 문의하세요.' })
    }
})

route.post('/social_join', (req,res)=>{
    const setUserData = (userData,request,result) => {
        const day = request.body.remember === true ? 60 * 60 * 24 * 365 : 60*60;
        userData.dataValues.remember = request.body.remember;
        (userData.dataValues.exp = Math.floor(Date.now()) + day),
            (userData.dataValues.iat = Math.floor(Date.now()));
        delete userData.dataValues.password
        let token = jwt.sign(
            {
                ...userData.dataValues,
                exp: Math.floor(Date.now()/1000) + day,
                iat: Math.floor(Date.now()/1000),
            },
            process.env.SECRET_KEY
        );
        userData.dataValues.userToken = token
        result.status(200).json({ reqName: 'social_join', status: true, data: userData.dataValues, token: token })
    }
   
    try {
        // 소셜로그인 요청 이메일로 가입되어있는 계정이 있는지 확인.
        Table('accounts').findOne({
            where: {
                [`${req.body.type}Id`]: {
                    [Op.eq]: req.body.userId
                },
            }
        })
        .then((user) => {
           if(user){
            Table('accounts').update({
                userId:req.body.userId,
                type:req.body.type,
                nickName:req.body.nickName,
                userImage:req.body.userImage,
                lastLoginDate:new Date()
            },{
                where: {
                    [`${req.body.type}Id`]: {
                        [Op.eq]: req.body.userId
                    },
                },
              })
            .then(() => {
                setUserData(user,req,res)
            })
            .catch((err) => {
                console.log(1)
                res.status(200).json({ reqName: 'social_join', status: false, error: err })
            }) 
                
           }else{
            //    소셜로그인 신규가입부분
                Table('accounts').create({
                    ...req.body,
                    [`${req.body.type}Id`]: req.body.userId,
                    [`${req.body.type}Data`]: req.body.socialData,
                    grade:10,
                })
                .then(() => {
                    Table('accounts').findOne({
                        where: {
                            email: {
                                [Op.eq]: req.body.email
                            }
                        }
                    }).then((user2)=>{
                        setUserData(user2,req,res)
                    }).catch((err)=>{
                        console.log(2)
                        res.status(200).json({ reqName: 'social_join', status: false, error: err })
                    })
                })
                .catch((err) => {
                    console.log(3)
                    res.status(200).json({ reqName: 'social_join', status: false, error: err })
                })
            }
        })
        .catch((err) => {
            console.log(4)
            res.status(200).json({ reqName: 'social_join', status: false, error: err })
        })

      
    } catch (err) {
        console.log(5)
        res.status(200).json({ reqName: 'social_join', status: false, error:err })
    }


   
})

//프로필
route.post('/profile', (req, res) => {
    console.log('auth-profile')
    Table('accounts').findOne({
        where: {
            userId: {
                [Op.eq]: req.body.userId
            }
        }
    })
        .then((user) => {
            if (user) {
                delete user.dataValues.password
                res.status(200).json({ reqName: 'auth-profile', status: true, data: user.dataValues })
            } else {
                res.status(200).json({ reqName: 'auth-profile', status: true, error: '아이디를 다시확인하세요' })
            }
        })
        .catch((err) => {
            res.status(200).json({ reqName: 'auth-profile', status: false, error: err })
        })
})

//프로필 수정
route.post('/profile-update', (req, res) => {
    console.log('auth-profile-update')
    // 비밀번호 검증하고 프로필 전송이 빠짐
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash;
        Table('accounts').update(req.body)
            .then(() => {
                res.status(200).json({ reqName: 'auth-profile-update', status: true })
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'auth-profile-update', status: false, error: err })
            })
    })
})

//세션 인증
route.post('/session-check', (req, res) => {
    console.log('auth-session-check')
    const userData = jwt.verify(req.headers.authorization, process.env.SECRET_KEY); //토큰검증및 유저정보
    const ip =getIp(req)
    try {
        if(userData){
            if(userData.lastIp===ip){
                res.status(200).json({ reqName: 'auth-session-check' ,status:true, msg:'토큰의 아이피와 현재 아이피가 동일함' })
            }else{
                res.status(200).json({ reqName: 'auth-session-check',status:false, msg:'토큰의 아이피와 현재 아이피가 틀림' })
            }
        }
        
    } catch (error) {
        res.status(200).json({ reqName: 'auth-session-check',status:false,error:error,msg:' catch error' })
    }  
})


route.post('/getip', (req, res) => {
    try {
        res.status(200).json({ reqName: 'get-ip' ,status:true, ip: getIp(req)})        
    } catch (error) {
        res.status(200).json({ reqName: 'get-ip',status:false,error:error,msg:' catch error' })
    }  
})


module.exports = route;