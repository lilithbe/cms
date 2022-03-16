import Sequelize from 'sequelize'
export const log_search_model= {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type: Sequelize.STRING,
        defaultValue:"geust"
    },
    string:{
        type: Sequelize.STRING,
    },
    count:{
        type: Sequelize.INTEGER,
    },
    created:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    }
}