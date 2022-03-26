import {
    // dev_todos,
    accounts_model,

    // configs
    config,
    config_group,
    config_board,

    // log
    log_file,
    log_search_model,
    log_joinUser_model,

    // widget
    widget_model,
    calendar_model,
    fallow_model,
    popup_model,

    // 디폴트게시판
    qna_model,
    notice_model,
    review_model,
    page_model,
    vote_model,
    category


   
} from '../managers/models'
export const tableArray =(prefix)=>{
    return [
        { label: prefix+'_accounts', model: accounts_model },
    
        { label: prefix+'_config', model: config },
        { label: prefix+'_config_board', model: config_board },
        
        { label: prefix+'_config_group', model: config_group },
        { label: prefix+'_widget', model: widget_model },
        { label: prefix+'_page', model: page_model },
        { label: prefix+'_calendar', model: calendar_model },
        { label: prefix+'_popup', model:popup_model},
        { label: prefix+'_vote', model:vote_model},
        {label:prefix+'_fallow', model: fallow_model},
       
        { label: prefix+'_log_search', model: log_search_model },
        { label: prefix+'_log_file', model: log_file },
        { label: prefix+'_log_joinUser', model: log_joinUser_model },
    
        { label: prefix+'_qna', model: qna_model },
        { label: prefix+'_notice', model: notice_model },
        { label: prefix+'_review', model: review_model },

        { label: prefix+'_category', model: category },

    // { label: prefix+'_buttons', model: button_model },
    // { label: prefix+'_carousel', model: carousel_model },
    // { label: prefix+'_dev_todos', model: dev_todos },
    // { label: prefix+'_pages', model: pages },
    ]
}