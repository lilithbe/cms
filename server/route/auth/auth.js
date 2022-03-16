/**
 * auth Api
 */
import express from "express";
import { Table } from '../managers/modelsManager/index'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { Op } from 'sequelize'
import env from 'dotenv'
env.config()
const route = express.Router();

route.post('/login', (req, res) => {
    console.log('auth-login')
    Table('accounts').findOne({
        where: {
            email: {
                [Op.eq]: req.body.email
            }
        }
    })
        .then((user) => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
                    const day = req.body.remember === true ? 60 * 60 * 24 * 365 : 60*60;
                    user.dataValues.remember = req.body.remember;
                    (user.dataValues.exp = Math.floor(Date.now()) + day),
                        (user.dataValues.iat = Math.floor(Date.now()));
                    delete user.dataValues.password
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
                } else {
                    res.status(200).json({ reqName: 'auth-login', status: false, error: '비밀번호가 틀립니다.' })
                }

            } else {
                res.status(200).json({ reqName: 'auth-login', status: false, error: '존재하지 않는 아이디입니다. 이메일을 다시확인하세요' })
            }
        })
        .catch((err) => {
            res.status(200).json({ reqName: 'auth-login', status: false, error: err })
        })


})
//회원 가입
route.post('/register', (req, res) => {
    console.log('auth-register')
    if(req.body.password!==req.body.confirmPassword){
        res.status(200).json({ reqName: 'auth-register', status: false, error: `비밀번호를 다시 확인하세요.` })
    }else{
        Table('accounts').findOne({
            where: {
                userId: {
                    [Op.eq]: req.body.userId
                }
            }
        })
            .then((user) => {
                if (!user) {
                    Table('accounts').findOne({
                        where: {
                            nickName: {
                                [Op.eq]: req.body.nickName
                            }
                        }
                    })
                        .then((user) => {
                            if (!user) {
                                bcrypt.hash(req.body.password, 10, (err, hash) => {
                                    req.body.password = hash;
                                    Table('accounts').create(req.body)
                                        .then(() => {
                                            res.status(200).json({ reqName: 'auth-register', status: true })
                                        })
                                        .catch((err) => {
                                            res.status(200).json({ reqName: 'auth-register', status: false, error: err })
                                        })
                                })
                            }else{
                                res.status(200).json({ reqName: 'auth-register', status: false, error: `${req.body.nickName}는(은) 이미 다른유저가 사용중입니다.` })
                            }
                        })
                        .catch((err) => {
                            res.status(200).json({ reqName: 'auth-register', status: false, error: err })
                        })
                } else {
                    res.status(200).json({ reqName: 'auth-register', status: false, error: `${req.body.userId}로는 이미 가입되어있습니다.` })
                }
            })
            .catch((err) => {
                res.status(200).json({ reqName: 'auth-register', status: false, error: err })
            })
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
    // 넘겨받은 세션의 유효성 검사.
    res.status(200).json({ reqName: 'auth-session-check' })
})
module.exports = route;