import {
  PAGE_LOADING,
  PAGE_UPDATE,
  PAGE_FAIL,

} from './Types'

const initialState = {
  isStart:false,
  isLoading: false,
  failData: null,
  path:'',
  className:'',
  styled:'',
  children:[],
  history:[]
}


const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case PAGE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case PAGE_UPDATE:
      return {
        ...state,
       ...action.payload
      }

    case PAGE_FAIL:
      return {
        ...state,
        failData: action.payload,
      }

    default: return state
  }
}

export default reducer
