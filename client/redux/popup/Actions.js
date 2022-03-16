import {
  POPUP_LOADING,
  POPUP_UPDATE,
  POPUP_FAIL,
} from './Types'



export const setPopup = (data) => {
  return (dispatch) => {
    try {
      dispatch(popupLoading(true))
      dispatch(popupUpdate(data))
      dispatch(popupLoading(false))

    } catch (error) {
      dispatch(popupLoading(false))
      dispatch(popupFail(error))
    }
  }
}



export const popupLoading = (data) => {
  return {
    type: POPUP_LOADING,
    payload: data,
  }
}
export const popupUpdate = (data) => {
  return {
    type: POPUP_UPDATE,
    payload: data,
  }
}
export const popupFail = (data) => {
  return {
    type: POPUP_FAIL,
    payload: data,
  }
}
