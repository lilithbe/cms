import {
    content,
    content_comment,
} from '../models'

const model = (table) => {
    switch (table) {
        case 'content': return content;
        case 'content_comment': return content_comment;
        default: return null;
    }
}


import db from '../dbManager/db'
const prefix = process.env.PREFIX
module.exports = (table, type)=>{
    const tableName= prefix +'_write_'+ table
    const content= db.sequelize.define(tableName,
        model(type),
    {
      freezeTableName: true,
        timestemps:false,
    
    }
)
    return content
}


