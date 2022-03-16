import Sequelize from 'sequelize'
/**
 * 출석체크 로그
 */
export const attendance_check ={
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}