import Sequelize from 'sequelize'
export const category= {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    label:{
        type: Sequelize.STRING,
    },



    parentId:{
        type: Sequelize.STRING,
    },
    parentLabel:{
        type: Sequelize.STRING,
    },
   
  
  
  
   
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },

}