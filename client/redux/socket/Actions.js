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



export const setSocketStart = (data) => {
  return (dispatch) => {
    try {
      dispatch(socketLoading(true))
      dispatch(socketStart(data))
      dispatch(socketLoading(false))

    } catch (error) {
      dispatch(socketLoading(false))
      dispatch(socketFail(error))
    }
  }
}
export const setDisconnect = () => {
  return (dispatch) => {
    try {
      dispatch(socketDisconnect())
      dispatch(socketLoading(false))
    } catch (error) {
      dispatch(socketLoading(false))
      dispatch(socketFail(error))
    }
  }
}

export const socketDisconnect = () => {
  return {
    type: SOCKET_DISCONNECT,
  }
}
export const socketLoading = (data) => {
  return {
    type: SOCKET_LOADING,
    payload: data,
  }
}
export const socketStart = (data) => {
  return {
    type: SOCKET_START,
    payload: data,
  }
}
export const socketFail = (data) => {
  return {
    type: SOCKET_FAIL,
    payload: data,
  }
}



// -------------------




export const setMsgAdd = (data) => {
  return {
    type: SOCKET_MESSAGE_ADD,
    payload: data,
  }
}
export const setChatAdd = (data) => {
  return {
    type: SOCKET_CHAT_ADD,
    payload: data,
  }
}
export const setChatRoomChange = (data) => {
  return {
    type: SOCKET_ROOM_CHANGE,
    payload: data,
  }
}

export const setFallowMeUpdate = (data) => {
  return {
    type: SOCKET_FALLOW_ME_UPDATE,
    payload: data,
  }
}


export const setMyFallowUpdate = (data) => {
  return {
    type: SOCKET_MY_FALLOW_UPDATE,
    payload: data,
  }
}

