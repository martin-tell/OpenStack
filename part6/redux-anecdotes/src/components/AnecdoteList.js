import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      {anecdote.content}
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(state => {
    switch (state.filter) {
      case 'ALL':
        return state.anecdotes
      case 'NO_VOTES':
        return state.anecdotes.filter(a => a.votes === 0)
      case 'MOST_VOTED':
        return state.anecdotes.filter(a => a.votes > 10)
      default:
        return state.anecdotes
    }
  })

  const vote = async (event, anecdote) => {
    event.preventDefault()
    dispatch(voteAnecdote(anecdote))
  }
  /*anecdotes.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1
    }
    if (a.votes < b.votes) {
      return 1
    }
    return 0
  })*/

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={(e) => vote(e, anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList