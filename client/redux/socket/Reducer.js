import moment from 'moment'
import {
  SOCKET_LOADING,
  SOCKET_START,
  SOCKET_UPDATE ,
  SOCKET_DISCONNECT ,
  SOCKET_FAIL ,
  SOCKET_MESSAGE_ADD,
  SOCKET_CHAT_ADD,
  SOCKET_ROOM_CHANGE,

  SOCKET_FALLOW_ME_UPDATE,
  SOCKET_MY_FALLOW_UPDATE,
} from './Types'

const initialState = {
  message:[],
  chatRoom:'',
  chat:[],
  myFallow:[],
  fallowMe:[],
  isLoading: false, 
  failData: null, 
  isSocket:false,
  socket:null
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
      case SOCKET_FALLOW_ME_UPDATE:
        return {
          ...state,
          fallowMe: action.payload,
        };
        case SOCKET_MY_FALLOW_UPDATE:
          return {
            ...state,
            myFallow: action.payload,
          };
      case SOCKET_START:
        return {
          ...state,
          isSocket: true,
          socket: action.payload,
          startDate: moment().format("YYYY-MM-DD h:mm:ss"),
        };

      case SOCKET_DISCONNECT:
        return initialState;

      case SOCKET_FAIL:
        return {
          ...state,
          failData: action.payload,
        };
    case SOCKET_MESSAGE_ADD:
      return {
        ...state,
        message: [...state.message, action.payload],
      };
    case SOCKET_CHAT_ADD:
      return {
        ...state,
        chat: [...state.chat, action.payload],
      };
    case SOCKET_ROOM_CHANGE:
      return {
        ...state,
        chatRoom: action.payload,
      };

  
    default:
      return state;
  }
}

export default reducer
