import Sequelize from 'sequelize'
export const page_model = {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    id:{ type: Sequelize.STRING },
    path:{ type: Sequelize.STRING },
    className:{ type: Sequelize.TEXT('medium') },
    styled:{ type: Sequelize.TEXT('long') },
    children:{type: Sequelize.JSON },
    histor:{type: Sequelize.JSON },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}