import {
  MESSAGE_LOADING,
  MESSAGE_UPDATE,
  MESSAGE_FAIL
} from './Types'



const initialState = {
  isLoading: false, 
  failData: null, 
  joinUser:[],
  room:'',
  message:{severity:'', summary: '', detail: '', life: 0},
  adminMessage:{ severity:'', summary: '', detail: '', life: 0},
  chatData:[],

  
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case MESSAGE_UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    case MESSAGE_FAIL:
      return {
        ...state,
        failData: action.payload,
      }
    default: return state
  }
}

export default reducer
