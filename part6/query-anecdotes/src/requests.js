import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(r => r.data)

export const createAnecdote = newAnecdote => axios.post(baseUrl, newAnecdote).then(r => r.data)

export const updateVotes = anecdote => axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })