import Sequelize from 'sequelize'
export const category= {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id:{
        type: Sequelize.STRING,
    },
    parentId:{
        type: Sequelize.STRING,
    },
    name:{
        type: Sequelize.STRING,
    },
    wholeCategoryId:{
        type: Sequelize.STRING,
    },
    wholeCategoryName:{
        type: Sequelize.STRING,
    },
    level: {
        type: Sequelize.INTEGER,
    },
    lastLevel: {
        type: Sequelize.BOOLEAN,
    },
    deleted: {
        type: Sequelize.BOOLEAN,
    }, 
    sellBlogUse:{
        type: Sequelize.BOOLEAN,
    },
    sortOrder:{
        type: Sequelize.INTEGER,
    },
    juvenileHarmful: {
        type: Sequelize.BOOLEAN,
    },
    itmes:{
        type: Sequelize.JSON,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },

}