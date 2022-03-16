import {
  GROUP_LOADING,
  GROUP_UPDATE,
  GROUP_FAIL,
} from './Types'



export const setGroup = (data) => {
  return (dispatch) => {
    try {
      dispatch(groupLoading(true))
      dispatch(groupUpdate(data))
      dispatch(groupLoading(false))

    } catch (error) {
      dispatch(groupLoading(false))
      dispatch(groupFail(error))
    }
  }
}



export const groupLoading = (data) => {
  return {
    type: GROUP_LOADING,
    payload: data,
  }
}
export const groupUpdate = (data) => {
  return {
    type: GROUP_UPDATE,
    payload: data,
  }
}
export const groupFail = (data) => {
  return {
    type: GROUP_FAIL,
    payload: data,
  }
}
