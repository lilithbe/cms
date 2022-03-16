import Sequelize from 'sequelize'

export const popup_model ={
    no:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
      
    },
    userId:{
        type: Sequelize.STRING,
    },
    label:{
        type: Sequelize.STRING, 
    },
    src:{
        type: Sequelize.STRING  
    },
    content:{
        type: Sequelize.TEXT('long')  
    },
    x:{
        type: Sequelize.INTEGER  
    },
    y:{
        type: Sequelize.INTEGER  
    },
    width:{
        type: Sequelize.INTEGER  
    },
    height:{
        type: Sequelize.INTEGER  
    },
    isTodayClose:{
        type: Sequelize.BOOLEAN  
    },
    start:{
        type: Sequelize.DATE,
    },
    end:{
        type: Sequelize.DATE,
    },
    url:{
        type: Sequelize.STRING,
    },
    isUse:{
        type: Sequelize.BOOLEAN,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },  
    
}