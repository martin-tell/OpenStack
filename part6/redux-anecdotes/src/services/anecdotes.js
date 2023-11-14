import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async anecdote => {
  const object = { content: anecdote, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async anecdote => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote)
  return response.data
}
  
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  createNew,
  updateVotes
}
