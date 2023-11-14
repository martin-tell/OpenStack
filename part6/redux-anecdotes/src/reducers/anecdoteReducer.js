import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAncedote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdotes(state, action) {
      const anecdote = action.payload
      return state.map(a => a.id !== anecdote.id ? a : anecdote)
    }
  }
})

export const inizializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAncedote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.updateVotes(anecdote)
    dispatch(updateAnecdotes(votedAnecdote))
  }
}

export const { appendAncedote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer