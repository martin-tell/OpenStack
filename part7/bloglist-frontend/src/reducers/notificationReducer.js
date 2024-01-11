import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    style: ''
  },
  reducers: {
    setNotification(state, action) {
      const { message, style } = action.payload
      state.message = message
      state.style = style
    }
  }
})

export const displayNotification = (message, style, time) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, style }))
    setTimeout(() => {
      dispatch(setNotification({ message: '', style: '' }))
    }, time)
  }
}

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer