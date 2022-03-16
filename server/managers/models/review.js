import Sequelize from 'sequelize'
export const review_model = {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      productCode:{
        type:Sequelize.STRING,
      },
     
      subject: { //제목
        type: Sequelize.STRING
      },
      content: { //내용
        type: Sequelize.TEXT('long')  
      },
      
      writeData: { //작성자 세부정보
        type: Sequelize.JSON
      }, 
    
      good:{ //좋아요
        type: Sequelize.INTEGER,
      },
      bad:{ //싫어요
        type: Sequelize.INTEGER,
      },
      comment:{ //댓글
        type: Sequelize.JSON,
      },
      hit:{ // 클릭수
        type: Sequelize.INTEGER,
      },
      isView:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
    
      isThumbnail: { //
        type: Sequelize.BOOLEAN,
        defaultValue:false    
      },
      thumbnail: { //
        type: Sequelize.JSON,    
      },
      isLock:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      uploadFiles:{
        type: Sequelize.JSON,  
      },
      
      created: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW,
      },
}
