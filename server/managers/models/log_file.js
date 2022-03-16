import Sequelize from 'sequelize'
    /**
         * 파일번호
         * 작성자정보
         * 작성자 아이디
         * 파일명
         * 파일사이즈
         * 파일 확장자
         * 파일위치
         * 파일주소
         * 파일타입 : 파일의 용도 image,video,flash,files
         * 상태 : 운영자모드는 항상 true, 유저요청은 일단 false
         * 다운로드 허용
         * 다운로드 횟쉬
         * 요청타입
         */
        
export const log_file = {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    write_data: {
        type: Sequelize.JSON,
    },
    write_id: {
        type: Sequelize.STRING,
    },
   
    extention: {
        type: Sequelize.STRING,
    },
    path: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING,
    },
    thumbnail:{
        type: Sequelize.STRING,
    },
    src: {
        type: Sequelize.STRING,
    },

    name:{
        type: Sequelize.STRING,
    },
    alt:{
        type: Sequelize.STRING,
    },
    size:{
        type: Sequelize.INTEGER,
    },
   


 
    file_type: { //image,video,flash,files
        type: Sequelize.STRING,
    },
    isWrite: { //
        type: Sequelize.BOOLEAN,
    },
    isSave: { //
        type: Sequelize.BOOLEAN,
    },
    status: { //
        type: Sequelize.BOOLEAN,
    },
    use_download: {
        type: Sequelize.BOOLEAN,
    },
    width: {
        type: Sequelize.INTEGER,
    },
    height: {
        type: Sequelize.INTEGER,
    },
    download_count: {
        type: Sequelize.INTEGER,
    },
    key:{
        type: Sequelize.STRING,
    },
    
    userFolder:{ 
        type: Sequelize.STRING,
    },
    request: { //요청 타입: 에디터,파일,앨범,비디오,엑셀
        type: Sequelize.STRING,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}