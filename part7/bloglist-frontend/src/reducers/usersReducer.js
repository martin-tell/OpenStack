import { createSlice } from '@reduxjs/toolkit'
import users from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action){
      return action.payload
    }
  }
})

export const getUsers = () => {
  return async (dispatch) => {
    const response = await users.getAll()
    dispatch(setUsers(response))
  }
}

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer