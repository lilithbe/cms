import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'
const isDev =  process.env.NEXT_PUBLIC_TYPE==='development'?true:false
const store = createStore(
  rootReducer,
  isDev?composeWithDevTools(applyMiddleware(logger, thunk)):applyMiddleware(thunk)
  
)

export default store

