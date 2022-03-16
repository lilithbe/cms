import {
  POPUP_LOADING,
  POPUP_UPDATE,
  POPUP_FAIL,

} from './Types'

const initialState = {
  isStart:false,
  isLoading: false,
  failData: null,
  list:[]
}


const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case POPUP_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case POPUP_UPDATE:
      return {
        ...state,
        isStart:true,
        list:action.payload
      }

    case POPUP_FAIL:
      return {
        ...state,
        failData: action.payload,
      }

    default: return state
  }
}

export default reducer
