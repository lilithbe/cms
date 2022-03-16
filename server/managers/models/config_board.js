import Sequelize from 'sequelize'
export const config_board = {
    no: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    boardType:{
      type: Sequelize.STRING,
      defaultValue:'freeBoard',
    },
    id: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    contentType: { //
      type: Sequelize.STRING,    
    },
    label: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    labelTag:{ type: Sequelize.TEXT("long"),},
    listUrl:{
      type: Sequelize.STRING,
    },
    writeUrl:{
      type: Sequelize.STRING,
    },
   
    createGrade: {
      type: Sequelize.INTEGER,
      defaultValue: 2,
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
   
    groupId: {
      type: Sequelize.STRING,
    },
   
    createrData: {
      type: Sequelize.JSON,
    },
    adminData: {
      type: Sequelize.JSON,
    },
    
   
    groupLaw: { //상위 그룹 규칙 적용
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
   
   
    editorType: {
      type: Sequelize.JSON,
    },
    carouselData:{
      type: Sequelize.JSON,
    },
    tag: {
      type: Sequelize.STRING,
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