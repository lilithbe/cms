import Sequelize from 'sequelize'

export const content = {
  no: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id: {
    type: Sequelize.STRING,
    primaryKey: true,

  },
  contentType: { //
    type: Sequelize.STRING,
  },
  subject: { //제목
    type: Sequelize.TEXT
  },
  content: { //내용
    type: Sequelize.TEXT('long')
  },
  string: {
    type: Sequelize.TEXT('long')
  },
  arrayContent: { //내용
    type: Sequelize.JSON
  },
  writeId: {
    type: Sequelize.STRING
  },
  writeData: { //작성자 세부정보
    type: Sequelize.JSON
  },
  password: { //비공개글
    type: Sequelize.STRING,
  },

  hit: { // 클릭수
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  hitUser: { //
    type: Sequelize.JSON,
    defaultValue: []
  },
  good: { //좋아요
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  goodUser: { //
    type: Sequelize.JSON,
    defaultValue: []
  },
  bad: { //싫어요
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  badUser: { //
    type: Sequelize.JSON,
    defaultValue: []
  },
  commentCount: { //댓글수
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  editorFiles: {
    type: Sequelize.JSON,
  },
  isView: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  isMobile: { // 모바일에서 작성된 글인가?
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isBuyContent: { // 판매컨텐츠인가?
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  unit: { // 판매컨텐츠 라면 판매단위는? point,cash
    type: Sequelize.STRING,
    defaultValue: 'porint'
  },
  price: { // 판매컨텐츠 라면 얼마에 팔래?
    type: Sequelize.INTEGER,
  },
  isThumbnail: { //
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  thumbnail: { //
    type: Sequelize.JSON,
  },
  isLock: {
    type: Sequelize.BOOLEAN, //관리자에 의한 숨김표시
    defaultValue: false
  },
  uploadFiles: {//해당 게시물에 업로드된 파일
    type: Sequelize.JSON,
  },
  isNotice: { type: Sequelize.BOOLEAN, },


  // voteBoardData
  isVote: { type: Sequelize.BOOLEAN, },
  question: { type: Sequelize.TEXT('long') },
  options: { type: Sequelize.JSON },
  startDate: { type: Sequelize.DATE },
  endDate: { type: Sequelize.DATE },
  result: { type: Sequelize.JSON },
  // voteBoardData end


  imageBoardData: { type: Sequelize.JSON },
  videoBoardData: { type: Sequelize.JSON },
  saleBoardData: { type: Sequelize.JSON },
  buyBoardData: { type: Sequelize.JSON },
  qnaBoardData: { type: Sequelize.JSON },
  voteBoardData: { type: Sequelize.JSON },
  codeBoardData: { type: Sequelize.JSON },




  isSeries: { type: Sequelize.BOOLEAN,defaultValue:false },
  seriesId: { type: Sequelize.STRING },
  seriesIndex: { type: Sequelize.INTEGER },
  seriesStartDate: { type: Sequelize.DATE },
  isSeriesEnd: { type: Sequelize.BOOLEAN,defaultValue:false },
  seriesEndDate: { type: Sequelize.DATE },


  created: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}
