import Sequelize from 'sequelize'
import { prefix } from "./init";
import db from '../managers/dbManager/db'


/**
 * 추가될 컬럼의 데이터 입력
 */
const addColumn=[
    // {tableName:prefix+'_config',columnName:'dc_test',columnData:{type:Sequelize.STRING,defaultValue:'test'}},
]

export const updateColumns= async()=>{
    for (let i = 0; i < addColumn.length; i++) {
        const column = addColumn[i];
        db.queryInterface.addColumn(column.tableName,column.columnName,column.columnData)
    }
}