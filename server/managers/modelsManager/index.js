import db from '../dbManager/db'
import {
    // accounts
    accounts_model,
    // configs
    config,
    config_group,
    config_board,
    // content
    content,
    content_comment,
    // widget
    fallow_model,
    popup_model,
    calendar_model,
    vote_model,

    // log
    log_file,
    log_search_model,
    log_joinUser_model,

    notice_model,
    review_model,
    qna_model,
    widget_model,
    page_model,

} from '../models'

const model = (table) => {
    switch (table) {
   
        case 'accounts': return accounts_model;
        case 'fallow' : return fallow_model;
        case 'config': return config;
        case 'config_board': return config_board;
        case 'config_group': return config_group;

        case 'log_file': return log_file;
        case 'log_search': return log_search_model;
        case 'log_joinUser': return log_joinUser_model;
        // 일정
        case 'calendar':return calendar_model;
        // 팝업
        case 'popup':return popup_model;
        case 'vote' :return vote_model;
        case 'widget': return widget_model;
        case 'page': return page_model;
        // 컨텐츠
        case 'content': return content;
        // 컨텐츠 댓글
        case 'content_comment': return content_comment;

        // 디폴트 게시판
        case 'notice': return notice_model;
        case 'review': return review_model;
        case 'qna': return qna_model;


        // trash??
        // case 'page':return pages;
        // case 'category' :return category;
        // case 'production' :return production;
        // case 'tree_data ': return tree_data_model;
        // case 'dev_todos': return dev_todos;

        default: return null;
    }
}
const prefix = process.env.PREFIX

export const Table = (table) => {

    const result = db.sequelize.define(prefix +'_'+ table,
        model(table),
        {
            freezeTableName: true,
            timestemps: false,

        }
    )
    return result
}
export const contentTable = (table) => {

    const tableName= prefix +'_write_'+ table
    const result = db.sequelize.define(tableName,
        model('content'),
        {
            freezeTableName: true,
            timestemps: false,

        }
    )
    return result
}
export const commentTable = (table) => {

    const tableName= prefix +'_write_'+ table+'_comment'
    const result = db.sequelize.define(tableName,
        model('content_comment'),
        {
            freezeTableName: true,
            timestemps: false,

        }
    )
    return result
}