import {Table , contentTable ,commentTable} from '../managers/modelsManager/index'
import { Op } from 'sequelize'
let CONFIG = {}
let GROUP_LIST = []
let BOARD_LIST = []
let BOARD_CONTENT_LIST =[]
let FILE_LIST =[]
let FALLOW_LIST=[]
let POPUP_LIST=[]

let USER_LIST = []
let CHAT_ROOM_LIST=['roby']
let JOIN_USER_LIST=[]
let ADMIN_LIST=[]
export const setStartData = async(callback)=>{
    await setAllUserData()
    await setAllConfigData()
    await setGroupData()
    await setBoardData()
    await setFileData()
    await setFallowData()
    await setAdminList()
    await callback( () => {
        return true
    })
}

const setAllUserData = async () => {
    console.log(`all User data setting...`)
    await Table('accounts').findAll( {attributes: {exclude: ['password']},})
        .then(async (data) => {
            USER_LIST = data
            console.log(`                       ............................. [ ${data.length} ]...`)
            return true
        })
        .catch((err) => {
            console.log('...all User data set ERROR : ', err)
            return false
        })
}
const setAdminList= async()=>{
    console.log(`admin List setting...`)
    await Table('accounts').findAll( {
        where: {
            isAdmin: {
              [Op.eq]: true
            }
          },
        attributes: {exclude: ['password']},})
        .then(async (data) => {
            ADMIN_LIST = data
            console.log(`                       ............................. [ ${data.length} ]...`)
            return true
        })
        .catch((err) => {
            console.log('...admin List set ERROR : ', err)
            return false
        })
}
const setAllConfigData = async () => {
    console.log(`all Config data setting...`)
    await Table('config').findAll()
        .then((data) => {
            CONFIG = data[0]
          
            return true
        })
        .catch((err) => {
            console.log('...all Config data set ERROR : ', err)
            return false
        })
}
const setGroupData= async () => {
    console.log(`all Group Config data setting...`)
    await Table('config_group').findAll()
        .then((data) => {
            GROUP_LIST = data
            console.log(`                       ............................. [ ${data.length} ]...`)
            if(data.length >0){
                console.log(`       Group Modeling...[ ${data.length} ]`)
            }else{
                console.log(`       Group count is none`)
            }
            return true
        })
        .catch((err) => {
            console.log('...all Group Config data set ERROR : ', err)
            return false
        })
}
const setBoardData= async () => {
    console.log(`all Board Config data setting...`)
    await Table('config_board').findAll()
        .then( async (data) => {
            BOARD_LIST = data
            console.log(`                       ............................. [ ${data.length} ]...`)           
            if(data.length >0){
                console.log(`       Board Modeling...[ ${data.length} ]`)
                let newArr=[]
                for (let i = 0; i < data.length; i++) {
                    const table = data[i];
                    console.log(`board.${i+1} : [${table.value}] Board data setting...`)
                    await contentTable(table.value).findAll()
                    .then( (data)=>{
                        if(data.length===0){
                            console.log(`       ${table.value} Board count is none`)
                        }else{
                            console.log(`                       ............................. [ ${data.length} ]...`)    
                            newArr.push({[`${table.value}`]:data})
                        }
                    })
                    .catch((err)=>{
                        console.log(`       ...${table.value} Board data set ERROR : `, err)
                    })
                }
                for (let i = 0; i < data.length; i++) {
                    const table = data[i];
                    console.log(`board.${i+1} : [${table.value}] Board comment data setting...`)
                    await commentTable(table.value).findAll()
                    .then( (data)=>{
                        if(data.length===0){
                            console.log(`       ${table.value} Board comment count is none`)
                        }else{
                            console.log(`                       ............................. [ ${data.length} ]...`)    
                            newArr.push({[`${table.value}_comment`]:data})
                        }
                    })
                    .catch((err)=>{
                        console.log(`       ...${table.value} Board comment data set ERROR : `, err)
                    })
                }
                BOARD_CONTENT_LIST=newArr
               
            }else{
                console.log(`       Board count is none`)
            }
            return true
        })
        .catch((err) => {
            console.log('...all Board Config data set ERROR : ', err)
            return false
        })
}
const setFileData= async () => {
    console.log(`all File data setting...`)
    await Table('log_file').findAll()
        .then((data) => {
            FILE_LIST = data
            console.log(`                       ............................. [ ${data.length} ]...`)
            if(data.length >0){
                console.log(`       File data Modeling...[ ${data.length} ]`)
            }else{
                console.log(`       File save count is none`)
            }
            return true
        })
        .catch((err) => {
            console.log('...all File data set ERROR : ', err)
            return false
        })
}
const setFallowData= async () => {
    console.log(`all fallow data setting...`)
    await Table('fallow').findAll()
        .then((data) => {
            FALLOW_LIST = data
            console.log(`                       ............................. [ ${data.length} ]...`)
            if(data.length >0){
                console.log(`       File data Modeling...[ ${data.length} ]`)
            }else{
                console.log(`       File save count is none`)
            }
            return true
        })
        .catch((err) => {
            console.log('...all File data set ERROR : ', err)
            return false
        })
}


/**
 * 데이터 업데이트
 */
export const updateConfig = (data) => {
    CONFIG = data
    return CONFIG
}
export const updateGroup = (data) => {
    GROUP_LIST = data
    return GROUP_LIST
}
export const updateBoard = (data) => {
    BOARD_LIST = data
    return BOARD_LIST
}
export const updateAccount = (data) => {
    USER_LIST = data
    return USER_LIST
}
export const updateJoinUser = (data) => {
    JOIN_USER_LIST = data
    return JOIN_USER_LIST
}

export const getMyAccount=async (userId) => {
   return Table('accounts').findOne( {
        where: {
            userId: {
                [Op.eq]: userId
            }
        },
        attributes: {exclude: ['password']}
    })
        .then((data) => {
            return data.dataValues
        })
        .catch((err) => {
            return err
        })
}

export const setMyAccount=async (myAcc) => {
   for (let i = 0; i < CONFIG.dc_levelUpRule.length; i++) {
       const l = CONFIG.dc_levelUpRule[i];
       // level:i,nextExp: exp,totalExp:total
       if(i===0 && myAcc.allExp<l.totalExp){
        myAcc.level=CONFIG.dc_levelUpRule[i].level
       }else if(myAcc.allExp>=CONFIG.dc_levelUpRule[i].totalExp && myAcc.allExp<l.totalExp){
        myAcc.level=CONFIG.dc_levelUpRule[i].level
       }
   }
    return Table('accounts').update(myAcc,{
         where: {
             userId: {
                 [Op.eq]: myAcc.userId
             }
         },
     })
         .then(() => {
             return myAcc
         })
         .catch((err) => {
             return err
         })
 }


/**
 * getData
 */
export const getBoardList = () => {
    return BOARD_LIST
}
export const getConfig = () => {
    return CONFIG
}
export const getGroupList = () => {
    return GROUP_LIST
}
/**
 * 
 * @returns 모든 유저 목록
 */
export const getUserList = () => {
    return USER_LIST
}
/**
 * 
 * @returns 접속한 유저 목록(로그인 하지 않은 유저 포함)
 */
export const getJoinUser = () => {
    return JOIN_USER_LIST
}
/**
 * 
 * @returns 관리자 목록
 */
export const getAdminList = ()=>{
    return ADMIN_LIST
}
/**
 * 
 * @returns 로그인 유저
 */
export const getLoginUser = () => {
    return JOIN_USER_LIST.filter(f=>f.isLogin===true)
}
/**
 * 내가 팔로우 한 유저 목록
 * @param {*} userId 
 * @returns 
 */
export const getMyFallowData = (userId) => {
    return FALLOW_LIST.filter(f=>f.userId===userId)
}
/**
 * 나를 팔로우한 유저 목록
 * @param {*}} userId 
 * @returns 
 */
export const getFallowMeData = (userId) => {
    return FALLOW_LIST.filter(f=>f.fallowId===userId)
}
