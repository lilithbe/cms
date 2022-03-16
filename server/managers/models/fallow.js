import Sequelize from 'sequelize'
export const fallow_model ={
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
    },
    userData: {
        type:Sequelize.JSON,
    },
    fallowId: {
        type: Sequelize.STRING,
    },
    fallowData:{
        type:Sequelize.JSON,
    },
   

    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}