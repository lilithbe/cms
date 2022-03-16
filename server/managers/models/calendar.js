import Sequelize from 'sequelize'
export const calendar_model ={
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId:{
        type: Sequelize.STRING,
    },
    title:{
        type: Sequelize.STRING, 
    },
    content:{
        type: Sequelize.TEXT('long'), 
    },
    start:{
        type: Sequelize.DATE,
    },
    end:{
        type: Sequelize.DATE,
    },
    startStr:{
        type: Sequelize.STRING,
    },
    endStr:{
        type: Sequelize.STRING,
    },
    startTime:{
        type: Sequelize.STRING,
    },
    endTime:{
        type: Sequelize.STRING,
    },
    color:{
        type: Sequelize.STRING,
    },
    backgroundColor:{
        type: Sequelize.STRING,
    },
  
    textColor:{
        type: Sequelize.STRING,
    },
    borderColor:{
        type: Sequelize.STRING,
    },
    classNames:{
        type: Sequelize.JSON,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },

    
    
}