import Sequelize from 'sequelize'
export const dev_todos ={
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    content: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    status:{
        type:Sequelize.BOOLEAN,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}

