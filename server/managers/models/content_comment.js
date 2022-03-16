import Sequelize from 'sequelize'
import {v4} from 'uuid'
export const content_comment={
          no:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id:{
            type: Sequelize.STRING,
            primaryKey: true,
            defaultValue: v4()
        },
        commentType: { //
          type: Sequelize.STRING,    
        },
        defaltContentData:{ //메인 콘텐츠 정보
          type:Sequelize.JSON,
        },
        parentsTargetUserData:{ //부모대상이 되는 유저의 정보
          type: Sequelize.JSON,
         },
        parentsCommentId:{
          type: Sequelize.INTEGER,
         },
         parentsContentId:{
          type: Sequelize.INTEGER,
         },
        comment: { //내용
          type: Sequelize.TEXT                        
        },
       
        writeId: { //작성자
          type: Sequelize.STRING
        }, 
        writeNickName: { //작성자
          type: Sequelize.STRING
        }, 
        writeData:{ //작성자정보
          type:Sequelize.JSON,
        },  
        isPublic:{ //비공개글인가?
          type:Sequelize.BOOLEAN,
          defaultValue:false
        },
        password: { //비공개글일경우 password  등록
          type: Sequelize.STRING,
        },
        good:{ //좋아요
          type: Sequelize.INTEGER,
          defaultValue:0
        },
        goodUser: { //
          type: Sequelize.JSON,
          defaultValue:[]
        }, 
        bad:{ //싫어요
          type: Sequelize.INTEGER,
          defaultValue:0
        },
        badUser: { //
          type: Sequelize.JSON,
          defaultValue:[]
        }, 
        sos:{ //신고자,신고내용,신고결과
          type:Sequelize.JSON,
        },
        isLock:{
          type:Sequelize.BOOLEAN,
          defaultValue:false
        },
        
  
        created: {
          type: Sequelize.DATE,
          defaultValue:Sequelize.NOW,
        },
  }