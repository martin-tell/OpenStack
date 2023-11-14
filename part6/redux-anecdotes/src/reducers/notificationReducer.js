import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const displayNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotification(content))
    setTimeout(() => {      
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
