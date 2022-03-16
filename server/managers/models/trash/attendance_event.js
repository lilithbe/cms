import Sequelize from 'sequelize'
/**
 * 출석체크 컨피그
 */
export const attendance_event ={
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    use_event: {
        type: Sequelize.BOOLEAN,
    },
    event_name: {
        type: Sequelize.STRING,
    },
    point: {
        type: Sequelize.INTEGER,
    },
    content:{
        type: Sequelize.TEXT,
    },
    startDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    lastDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
  
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}