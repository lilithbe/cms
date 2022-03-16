import Sequelize from 'sequelize'
export const production={
      id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
        },
        productAdminCode1:{
          type:Sequelize.STRING
        },
        productAdminCode2:{
          type:Sequelize.STRING
        },
        productCode:{
          type:Sequelize.STRING
        },
        bigCategory:{
          type:Sequelize.STRING
        },
        middleCategory:{
          type:Sequelize.STRING
        },
        smallCategory:{
          type:Sequelize.STRING
        },
        detailCategory:{
          type:Sequelize.STRING
        },

        categoryCode:{
          type:Sequelize.STRING
        },
        categoryName:{
          type:Sequelize.STRING
        },
        marketCategory:{
          type:Sequelize.STRING
        },
        originProductName:{
          type:Sequelize.STRING
        },
        marketProductName:{
          type:Sequelize.STRING
        },

        originPrice:{ //원가
          type:Sequelize.INTEGER
        },
        fullPrice:{ //준수가격
          type:Sequelize.INTEGER
        },

        price:{ //판매가
          type:Sequelize.INTEGER
        },


      
     
        
      
        packagePrice:{
          type:Sequelize.INTEGER
        },
        packageType:{
          type:Sequelize.STRING
        },
        rePackagePrice:{
          type:Sequelize.INTEGER
        },//반품배송비
        minimumCount:{
          type:Sequelize.INTEGER,
          defaultValue:1
        },
        maximumCount:{
          type:Sequelize.INTEGER,
          defaultValue:0
        },
        originNotice:{
          type:Sequelize.TEXT('long') 
        },//원산지 업체 공지 
        spesialNotice:{
          type:Sequelize.TEXT('long') 
        }, //특별공지
        option_1:{
          type:Sequelize.TEXT('long') 
        },
        optionValue_1:{
          type:Sequelize.TEXT('long') 
        },
        option_2:{
          type:Sequelize.TEXT('long') 
        },
        optionValue_2:{
          type:Sequelize.TEXT('long') 
        },
        mixOption:{
          type:Sequelize.TEXT('long') 
        },

       
        productProperty:{
          type:Sequelize.TEXT('long') 
        },//상품속성
        productGrade:{
          type:Sequelize.TEXT('long') 
        },
        isTax:{ //과세
          type:Sequelize.BOOLEAN,
          defaultValue:true
        },
        isLaw:{ //가격 준수 여부
          type:Sequelize.BOOLEAN,
          defaultValue:false
        },
        isSimpleChangingMind:{//단순변심
          type:Sequelize.BOOLEAN,
          defaultValue:true
        },
        isAudultOnry:{ //성인전용
          type:Sequelize.BOOLEAN,
          defaultValue:false
        },
        thumbnailSmall:{
          type:Sequelize.STRING
        },
        thumbnailMiddle:{
          type:Sequelize.STRING
        },
        thumbnailBig:{
          type:Sequelize.STRING
        },
        produceIncome:{
          type:Sequelize.STRING
        },//제작/수입
        brand:{
          type:Sequelize.STRING
        },
        modelName:{
          type:Sequelize.STRING
        },
        originBuild:{
          type:Sequelize.STRING
        },
      
        keyword:{
          type:Sequelize.STRING
        },
        topText:{
          type:Sequelize.TEXT('long')  
        },//top Html
        footerText:{
          type:Sequelize.TEXT('long')  
        },//하단 html
        productContentText:{
          type:Sequelize.TEXT('long')  
        },//제품 상세정보 html
        productInfomationCode:{//wpvnawjdqhrhtl 코드
          type:Sequelize.INTEGER
        },
        productInfomationCategory:{//제품정보고시카테고리
          type:Sequelize.STRING
        },
        productInfomation:{
          type:Sequelize.STRING
        }, //제품정보고시
        productInfomationHtml:{
          type:Sequelize.TEXT('long') 
        },//제품정보고시 html

        gmarket:{
          type:Sequelize.STRING
        },
        action:{
          type:Sequelize.STRING
        },
        st11:{//11번가
          type:Sequelize.STRING
        },
        cupang:{
          type:Sequelize.STRING
        },
        smartstore :{
          type:Sequelize.STRING
        },
        marketAdText:{
          type:Sequelize.TEXT('long') 
        },
        saleGift:{
          type:Sequelize.STRING
        },



        productCertificationType:{
          type:Sequelize.STRING
        },//인증구분
        productCertificationInfomation:{
          type:Sequelize.STRING
        },//인증정보

        optionStandlone:{
          type:Sequelize.TEXT('long') 
        },//독립형옵션
        optionCombination:{
          type:Sequelize.TEXT('long') 
        },//조합형옵션
        

        status:{//상태
          type:Sequelize.STRING
        },
        isSale:{ //판매중?
          type:Sequelize.BOOLEAN
        },
        isWork:{ //전시중?
          type:Sequelize.BOOLEAN
        },
        createDate:{
          type: Sequelize.DATE,
        },
        updateDate:{
          type: Sequelize.DATE,
        },
   
        created: {
          type: Sequelize.DATE,
          defaultValue:Sequelize.NOW,
        },
  }