 import { Table } from '../managers/modelsManager/index'
 import bcrypt from "bcrypt"
 import jwt from "jsonwebtoken";
 import { Op } from 'sequelize'
 import env from 'dotenv'
 env.config()

 export const getTokenToUserData=(req)=> jwt.verify(
    req.headers.authorization,
    process.env.SECRET_KEY
)


 export const login = (userData,callback) => {
     console.log(userData)
    Table('accounts').findOne({
        where: {
            userId: {
                [Op.eq]: userData.userId
            }
        }
    })
        .then((user) => {
            if (user) {
                if (bcrypt.compareSync(userData.password, user.dataValues.password)) {
                    const day = userData.remember === true ? 60 * 60 * 24 * 365 : 60*60;
                    user.dataValues.remember = userData.remember;
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
                    callback( { reqName: 'auth-login', status: true, data: user.dataValues, token: token })
                } else {
                    callback( { reqName: 'auth-login', status: false, error: '비밀번호가 틀립니다.' })
                }

            } else {
                callback({ reqName: 'auth-login', status: false, error: '존재하지 않는 아이디입니다. 아이디를 다시확인하세요' })
            }
        })
        .catch((err) => {
            callback( { reqName: 'auth-login', status: false, error: err })
        })
 }
 


 //회원 가입
 export const register = (userData) => {
    if(userData.password!==userData.confirmPassword){
       return { reqName: 'auth-register', status: false, error: `비밀번호를 다시 확인하세요.` }
    }else{
        Table('accounts').findOne({
            where: {
                userId: {
                    [Op.eq]: userData.userId
                }
            }
        })
            .then((user) => {
                if (!user) {
                    Table('accounts').findOne({
                        where: {
                            nickName: {
                                [Op.eq]: userData.nickName
                            }
                        }
                    })
                        .then((user) => {
                            if (!user) {
                                bcrypt.hash(userData.password, 10, (err, hash) => {
                                    userData.password = hash;
                                    Table('accounts').create(userData)
                                        .then(() => {
                                           return { reqName: 'auth-register', status: true }
                                        })
                                        .catch((err) => {
                                            return { reqName: 'auth-register', status: false, error: err }
                                        })
                                })
                            }else{
                              return { reqName: 'auth-register', status: false, error: `${userData.nickName}는(은) 이미 다른유저가 사용중입니다.` }
                            }
                        })
                        .catch((err) => {
                           return { reqName: 'auth-register', status: false, error: err }
                        })
                } else {
                    return { reqName: 'auth-register', status: false, error: `${userData.userId}로는 이미 가입되어있습니다.` }
                }
            })
            .catch((err) => {
               return { reqName: 'auth-register', status: false, error: err }
            })
    }
 }

