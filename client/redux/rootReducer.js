import { combineReducers } from 'redux'

/* 리듀서 목록 */
import authReducer from './auth/Reducer'
import configReducer from './config/Reducer'
import boardReducer from './board/Reducer'
import groupReducer from './group/Reducer'
import socketReducer from './socket/Reducer'
import messageReducer from './message/Reducer'
import popupReducer from './popup/Reducer'
import pageReducer from './page/Reducer'
const rootReducer = combineReducers({
  authData:authReducer,
  popupData:popupReducer,
  configData:configReducer,
  boardData:boardReducer,
  groupData:groupReducer,
  socketData:socketReducer,
  pageData:pageReducer,
  messageData:messageReducer,

})

export default rootReducer