import Sequelize from 'sequelize'
export const pages = {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    label:{ type: Sequelize.STRING },
    value:{ type: Sequelize.STRING },
    type:{ type: Sequelize.STRING },
    url:{ type: Sequelize.STRING },
    viewGrade:{ type: Sequelize.INTEGER },
    viewLinkGrade:{ type: Sequelize.INTEGER },
    pageData:{type: Sequelize.JSON },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}