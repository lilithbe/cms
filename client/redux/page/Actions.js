import {
  PAGE_LOADING,
  PAGE_UPDATE,
  PAGE_FAIL,
} from './Types'



export const setPage = (data) => {
  return (dispatch) => {
    try {
      dispatch(pageLoading(true))
      dispatch(pageUpdate(data))
      dispatch(pageLoading(false))

    } catch (error) {
      dispatch(pageLoading(false))
      dispatch(pageFail(error))
    }
  }
}



export const pageLoading = (data) => {
  return {
    type: PAGE_LOADING,
    payload: data,
  }
}
export const pageUpdate = (data) => {
  return {
    type: PAGE_UPDATE,
    payload: data,
  }
}
export const pageFail = (data) => {
  return {
    type: PAGE_FAIL,
    payload: data,
  }
}
