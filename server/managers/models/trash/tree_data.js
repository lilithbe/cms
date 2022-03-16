import Sequelize from 'sequelize'
export const tree_data_model ={
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    children:{
        type:Sequelize.JSON,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}