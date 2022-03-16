import Sequelize from 'sequelize'
export const accounts_model= {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    exp:{ type: Sequelize.INTEGER,},
    allExp:{ type: Sequelize.INTEGER,},
    
    googleId:{ type: Sequelize.STRING,},
    kakaoId:{ type: Sequelize.STRING,},
    naverId:{ type: Sequelize.STRING,},
    fasebookId:{ type: Sequelize.STRING,},
    twiterId:{ type: Sequelize.STRING,},
    faycoId:{ type: Sequelize.STRING,},
    passId:{ type: Sequelize.STRING,},
    instagremId:{ type: Sequelize.STRING,},

    email: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    isEmailCheck:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    loginType:{  type: Sequelize.STRING,},

    socialLoginData:{ type: Sequelize.JSON,},

    googleData:{ type: Sequelize.JSON,},
    kakaoData:{ type: Sequelize.JSON,},
    naverData:{ type: Sequelize.JSON,},
    fasebookData:{ type: Sequelize.JSON,},
    twiterData:{ type: Sequelize.JSON,},
    faycoData:{ type: Sequelize.JSON,},
    passData:{ type: Sequelize.JSON,},
    instagremData:{ type: Sequelize.JSON,},

    currentPage:{
        type: Sequelize.STRING,
    },
    type:{
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    fullName: {
        type: Sequelize.STRING,
    },
    nickName: {
        type: Sequelize.STRING,
    },
    age: {
        type: Sequelize.STRING,
    },
    sex: {
        type: Sequelize.STRING,
    },


    homepage: {
        type: Sequelize.STRING,
    },

    about: {
        type: Sequelize.STRING,
    },
    telephone: {
        type: Sequelize.STRING,
    },

    
    mobile:{
        type: Sequelize.STRING,
    },
    userImage:{
        type: Sequelize.STRING,
        defaultValue:'/basic/default/user.jpg'
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue:1
    },
    grade: {
        type: Sequelize.INTEGER,
        defaultValue:0
    },
    address: {
        type: Sequelize.JSON,
    },
    userData: {
        type: Sequelize.JSON,
    },
    registerIp:{
        type: Sequelize.STRING,
    },
    lastIp:{
        type: Sequelize.STRING,
    },
    useName:{
        type: Sequelize.STRING,
        defaultValue:'nickName'
    },
    birthday:{
        type: Sequelize.DATE,      
    },
    reserves_point: { //적립포인트
        type: Sequelize.INTEGER,
    },
    deposit_point: { //예치금 포인트
        type: Sequelize.INTEGER,
    },
    files:{
        type:Sequelize.JSON
    },
    isLock:{ //운영자에게 이용제한
        type: Sequelize.BOOLEAN,
        defaultValue:false
    },
    lastLoginDate: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
    },
    isPublic:{ //내 프로필 공개
        type: Sequelize.BOOLEAN,
        defaultValue:true
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
   

}