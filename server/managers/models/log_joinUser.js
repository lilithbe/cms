import Sequelize from 'sequelize'
export const log_joinUser_model = {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userType:{ type: Sequelize.STRING },//member & guest
    userId:{ type: Sequelize.STRING },
    userData:{ type: Sequelize.JSON },
    ip:{ type: Sequelize.STRING },
    pathname:{ type: Sequelize.STRING },
    socketId:{ type: Sequelize.STRING },
    family:{ type: Sequelize.STRING },
    port:{ type: Sequelize.STRING },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}