import env from 'dotenv'
import mysql from 'mysql2/promise'
import bcrypt from "bcrypt"

import readline from 'readline'
import db from '../managers/dbManager/db'
import {
    adminInit, 
    tableArr, 
    configInputInit , 
    prefix, 
    boardConfigInit, 
    boardGroupConfigInit,
    pagesInit,
} from './init'
 
import {content,content_comment,production ,accounts_model} from '../managers/models'
import {Table} from '../managers/modelsManager/index'
import { updateColumns } from './update'

env.config()


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const dbCheck = async() => { 
    try {
        await db.sequelize.authenticate();
        return true
    } catch (err) {
        const connection = await mysql.createConnection({ host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASSWORD });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`);
        return false
    }
 }

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

const openBox=`
###########################################################
##                                                       ##
##                      Server v.${process.env.VER}                   ##
##                                   Developer ♡ lilith  ##
###########################################################
`

const tableInstall=(installCallback)=>{
    for (let i = 0; i < tableArr.length; i++) {
        const table = tableArr[i];  
                                 
        query(table.label, table.model) 
        .sync()
        .then(() => {
            if (table.label === prefix+'_accounts') {
               
                bcrypt.hash(adminInit.password, 10,  (err, hash) => {
                    adminInit.password = hash;
                    Table('accounts').create(adminInit)
                        .then(() => {
                            installCallback(true)  
                            console.log(table.label, '- 테이블 생성 및 관리자 계정 생성 완료')
                        })
                        .catch((err) => {
                            console.log('error : ', err)
                        })
                })
            }  else if (table.label === prefix+'_config') {
                Table('config').create(configInputInit)
                    .then(() => {                                             
                        console.log(table.label, '- 테이블 생성 컨피그 입력완료')
                    })
                    .catch((err) => {
                        console.log('error : ', err)
                    })
            } else if (table.label === prefix+'_config_board') {
                Table('config_board').bulkCreate(boardConfigInit)
                    .then(() => {                                  
                        console.log(table.label, '-테이블 생성 및 컨피그 파일 등록')
                        for (let zz = 0; zz < boardConfigInit.length; zz++) {
                            const contentTabel = boardConfigInit[zz];
                            query(contentTabel.createName, content) 
                            .sync()
                            .then(()=>{
                                console.log(contentTabel.createName, '-테이블 생성 ')
                            })
                            .catch((err) => {
                                console.log('error : ', err)
                            })
                            query(contentTabel.createName+'_comment', content_comment) 
                            .sync()
                            .then(()=>{
                                console.log(contentTabel.createName+'_comment', '-테이블 생성 ')
                            })
                            .catch((err) => {
                                console.log('error : ', err)
                            })
                        }
                    })
                    .catch((err) => {
                        console.log('error : ', err)
                    })
            } else if (table.label === prefix+'_config_group') {
                Table('config_group').bulkCreate(boardGroupConfigInit)
                .then(() => {
                    console.log(table.label, '-테이블 생성 및 컴피그 파일 등록')
                })
                .catch((err) =>{ 
                    console.log('error : ' , err)
                })
            } else if (table.label === prefix+'_page') {
                Table('page').bulkCreate(pagesInit)
                .then(() => {
                    console.log(table.label, '-테이블 생성 및 컴피그 파일 등록')
                })
                .catch((err) =>{ 
                    console.log('error : ' , err)
                })
            }else {
                console.log(table.label, '- 테이블 생성')
            }

         })
        .catch((err) =>{ 
            console.log('error : ' , err)
        })
    }
}

const databaseInitialization = async ()=>{
    try {
        await db.sequelize.authenticate().then(async(data)=>{
        const connection = await mysql.createConnection({ host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASSWORD });
        await connection.query(`DROP DATABASE ${process.env.DB_DATABASE};`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`);
      })
    } catch (error) {
      console.log(error)
    } 
}

const allUserDelete = async()=>{
    query( prefix+'_accounts', accounts_model) 
    .drop()
    .then(() => {

        query( prefix+'_accounts', accounts_model) 
        .sync()
        .then(() => {
            
            bcrypt.hash(adminInit.password, 10,  (err, hash) => {
                adminInit.password = hash;
                Table('accounts').create(adminInit)
                    .then(() => {
                       
                    })
                    .catch((err) => {
                        console.log('error : ', err)
                    })
            })
         })
        .catch((err) =>{ 
            console.log('error : ' , err)
        })


      
     })
    .catch((err) =>{ 
        console.log('error : ' , err)
    })
}

const question = (installCallback)=>{
    console.log('Mode Selected')
    console.log('1. Server Open')
    console.log('2. Database initialization and Server Open')
    console.log('3. User initialization')
    console.log('4. Update Columns')
    rl.on("line", function(line) {
        if(line==='1'){
            console.clear()
            console.log(openBox);
            installCallback(true)
        }else if(line==='2'){
            console.clear()
            console.log(openBox);
            console.log('All data has been initialized.')
            databaseInitialization().then(()=>{
                tableInstall(installCallback)
            })
        }else if(line==='3'){
            allUserDelete().then(()=>{          
                console.clear()
                console.log(openBox);
                console.log( prefix+'_accounts', '- Complete table creation and administrator account creation')
                question()
            } )
    
        }else if (line==='4'){
            updateColumns().then(()=>{
                console.clear()
                console.log(openBox);
                installCallback(true)
            })
                 
        }else{
            installCallback(true)
        }

        rl.close()
        })
}

const install =(installCallback)=>{
    try {
        console.clear()
        console.log(openBox);
        dbCheck().then(result=>{
            if(result){
                    question(installCallback)
            }else{
                //데이터베이스 없음
                console.log(`Congratulations on a new beginning.Let's start setting up. Please wait...`)
                tableInstall(installCallback)
            }
        })
    } catch (error) {
        result(false)
    }
}
export default install
