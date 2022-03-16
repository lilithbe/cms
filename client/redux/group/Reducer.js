import {
  GROUP_LOADING,
  GROUP_UPDATE,
  GROUP_FAIL,

} from './Types'

const initialState = {
  isStart:false,
  isLoading: false,
  failData: null,
  group_config:[]
}


const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case GROUP_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case GROUP_UPDATE:
      return {
        ...state,
        isStart:true,
        group_config:action.payload
      }

    case GROUP_FAIL:
      return {
        ...state,
        failData: action.payload,
      }

    default: return state
  }
}

export default reducer
