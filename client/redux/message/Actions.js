import {
  MESSAGE_LOADING,
  MESSAGE_UPDATE,
  MESSAGE_FAIL
} from './Types'

export const setMessageUpdate = (data) => {
  return (dispatch) => {
    try {
      dispatch(messageLoading(true))
      dispatch(messageUpdate(data))
      dispatch(messageLoading(false))

    } catch (error) {
      dispatch(messageLoading(false))
      dispatch(messageFail(error))
    }
  }
}

export const messageLoading = (data) => {
  return {
    type: MESSAGE_LOADING,
    payload: data,
  }
}
export const messageUpdate = (data) => {
  return {
    type: MESSAGE_UPDATE,
    payload: data,
  }
}
export const messageFail = (data) => {
  return {
    type: MESSAGE_FAIL,
    payload: data,
  }
}
