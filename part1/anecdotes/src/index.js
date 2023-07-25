import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const Title = (props) => {
  const {text} = props
  return(
    <div>
      <h2>{text}</h2>
    </div>
  ) 
}

const Button = (props) => {
  const {text, functionality} = props
  return(
    <div>
      <button onClick={() => functionality()}>{text}</button>
    </div>
  ) 
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setVote] = useState([0, 0, 0, 0, 0, 0])
  const copy = [...points]

  const vote = () => {
    copy[selected] += 1
    setVote(copy)
  }

  const m = copy.indexOf(Math.max(...copy))

  return (
    <div>
      <Title text="Anecdote of the day" />
      {props.anecdotes[selected]}
      <p>has {copy[selected]} votes</p>
      <Button text="next anecdote" functionality={() => setSelected(Math.floor(Math.random() * ((props.anecdotes.length - 1) - 0 + 1)) + 0)}/>
      <Button text="vote" functionality={() => vote()} />
      <Title text="Anecdote with most votes" />
      {props.anecdotes[m]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App anecdotes={anecdotes} />);