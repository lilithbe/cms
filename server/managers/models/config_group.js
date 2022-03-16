import Sequelize from 'sequelize'

export const config_group = {
    no: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: Sequelize.STRING,
    },
    label: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    labelTag:{ type: Sequelize.TEXT("long"),},
    value: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    url:{
      type: Sequelize.STRING,
    },
    createGrade: {
      type: Sequelize.INTEGER,
    },
  
    listGrade: {
      type: Sequelize.INTEGER,
    },
    viewGrade: {
      type: Sequelize.INTEGER,
    },
    updateGrade: {
      type: Sequelize.INTEGER,
    },
    deleteGrade: {
      type: Sequelize.INTEGER,
    },
    commentGrade: {
      type: Sequelize.INTEGER,
    },
    recommentGrade: {
      type: Sequelize.INTEGER,
    },
    goodGrade: {
      type: Sequelize.INTEGER,
    },
    badGrade: {
      type: Sequelize.INTEGER,
    },
  
    createrData: {
      type: Sequelize.JSON,
    },
    adminData: {
      type: Sequelize.JSON,
    },
   
    isContentBuy: { 
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    groupLaw: { //하위게시판 규칙 강제적용
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  
  
    fileUploadConfig: {
      type: Sequelize.JSON,
    },
    isThumbnail: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isUse:{
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    defaultThumbnail:{
      type: Sequelize.STRING,
    },
    defaultTitleImage:{
      type: Sequelize.STRING,
    },
    contentType: { //
      type: Sequelize.STRING,    
    },
   
    editorData: {
      type: Sequelize.JSON,
    },
    carouselData:{
      type: Sequelize.JSON,
    },
    editorType:{
      type: Sequelize.JSON,
    },

    isUserPrivateNickName:{type:Sequelize.BOOLEAN,defaultValue:false},//해당게시판의 글쓴이 이름을 숨길것인가?(비공개게시판 익명게시판)

    isSeries:{type:Sequelize.BOOLEAN,defaultValue:true}, //해당 게시판에 시리즈 연재를 가능하게 할것인가
    writeStartText:{ type: Sequelize.TEXT("long")}, //글작성 시작부분 관리자 멘트
    writeEndText:{ type: Sequelize.TEXT("long")}, //글작성 끝부분 관리자 멘트

    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  }