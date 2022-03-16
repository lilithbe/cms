import Sequelize from 'sequelize'
import {v4} from 'uuid'
export const carousel_model ={
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key:{type: Sequelize.STRING,
        defaultValue:v4()
    },
    isUse:{
         type: Sequelize.BOOLEAN,
    },
    title: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING,
    },
    src: {
        type: Sequelize.STRING,
    },
    link:{
        type:Sequelize.STRING,
    },
    linkType:{
        type:Sequelize.STRING,
    },

    button:{
        type:Sequelize.JSON,
    },
    type:{
        type:Sequelize.STRING,
    },
   
   

    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}