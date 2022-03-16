import Sequelize from 'sequelize'
export const widget_model = {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id:{ type: Sequelize.STRING },
    label:{ type: Sequelize.STRING },  
    viewGrade:{ type: Sequelize.INTEGER },
    component:{type: Sequelize.STRING},
    
    data:{type: Sequelize.JSON},

    options:{type: Sequelize.JSON },
    styled:{type: Sequelize.TEXT('medium')},
    className:{type: Sequelize.TEXT('medium')},
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}