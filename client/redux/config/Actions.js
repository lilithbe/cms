import {
  CONFIG_LOADING,
  CONFIG_UPDATE,
  CONFIG_FAIL,
} from './Types'



export const setConfig = (data) => {
  return (dispatch) => {
    try {
      dispatch(configLoading(true))
      dispatch(configUpdate(data))
      dispatch(configLoading(false))

    } catch (error) {
      dispatch(configLoading(false))
      dispatch(configFail(error))
    }
  }
}



export const configLoading = (data) => {
  return {
    type: CONFIG_LOADING,
    payload: data,
  }
}
export const configUpdate = (data) => {
  return {
    type: CONFIG_UPDATE,
    payload: data,
  }
}
export const configFail = (data) => {
  return {
    type: CONFIG_FAIL,
    payload: data,
  }
}
