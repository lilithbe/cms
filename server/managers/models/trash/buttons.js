import Sequelize from 'sequelize'
export const button_model ={
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        type: Sequelize.STRING,
    },
    hoverLabel: {
        type: Sequelize.STRING,
    },
    className: {
        type: Sequelize.STRING,
    },
    style:{
        type:Sequelize.JSON,
    },
    hoverStyle:{
        type:Sequelize.JSON,
    },
    type:{
        type:Sequelize.STRING,
    },
    link:{
        type:Sequelize.STRING,
    },
    linkType:{
        type:Sequelize.STRING,
    },
   

    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}