import {
  BOARD_LOADING,
  BOARD_UPDATE,
  BOARD_FAIL,

} from './Types'

const initialState = {
  isStart:false,
  isLoading: false,
  failData: null,
  board_config:[]
 
}

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case BOARD_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case BOARD_UPDATE:
      return {
        ...state,
        isStart:true,
        board_config:action.payload
      }

    case BOARD_FAIL:
      return {
        ...state,
        failData: action.payload,
      }

    default: return state
  }
}

export default reducer
