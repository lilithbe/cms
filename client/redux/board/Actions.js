import {
  BOARD_LOADING,
  BOARD_UPDATE,
  BOARD_FAIL,
} from './Types'



export const setBoard = (data) => {
  return (dispatch) => {
    try {
      dispatch(boardLoading(true))
      dispatch(boardUpdate(data))
      dispatch(boardLoading(false))

    } catch (error) {
      dispatch(boardLoading(false))
      dispatch(boardFail(error))
    }
  }
}



export const boardLoading = (data) => {
  return {
    type: BOARD_LOADING,
    payload: data,
  }
}
export const boardUpdate = (data) => {
  return {
    type: BOARD_UPDATE,
    payload: data,
  }
}
export const boardFail = (data) => {
  return {
    type: BOARD_FAIL,
    payload: data,
  }
}
