import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'
import loginService from '../services/login'
import { displayNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action){
      return action.payload
    }
  }
})

export const loadUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogs.setToken(user.token)
    }
  }
}

export const logIn = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username, password
      })
      blogs.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
    } catch(exception){
      dispatch(displayNotification('wrong credentials', 'error', 5000))
    }
  }
}

export const { setUser } = userSlice.actions

export default userSlice.reducer