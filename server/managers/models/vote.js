import Sequelize from 'sequelize'
export const vote_model = {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id:{ type: Sequelize.STRING },
    label:{type: Sequelize.STRING},
    voterId:{type: Sequelize.STRING },
    voterData:{type: Sequelize.JSON},
    question:{ type: Sequelize.TEXT('long') },
    options:{ type: Sequelize.JSON },

    start:{type: Sequelize.DATE },
    end:{type: Sequelize.DATE },
    
    result:{ type: Sequelize.JSON },
    

 
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}