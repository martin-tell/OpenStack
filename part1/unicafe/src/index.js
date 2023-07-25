import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';

const Title = (props) => {
  const {text} = props
  return(
    <div>
      <h2>
        {text}
      </h2>
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

const StatisticsLine = (props) => {
  const {text, value} = props
  return(     
    <tr> 
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {names, quantities} = props

  function sum(array){
    let acumulator = 0
    for(let i=0; i<array.length; i++)
      acumulator += array[i]
    return acumulator
  }
  const total = sum(quantities)

  function average(array){
    return sum([array[0]*1, array[1]*0, array[2]*-1])/sum(array)
  }
  const a = average(quantities)

  function positive_percent(array){
    return array[0] * 100 / sum(array)
  }
  const pp = positive_percent(quantities).toString().concat(" %")

  if(total == 0){
      return(
        <div>
          <p>No feedback given</p>
        </div>
      )
  }else{
    return(
      <div>
        <table>
          <tbody>
            <StatisticsLine text={names[0]} value={quantities[0]}/>
            <StatisticsLine text={names[1]} value={quantities[1]}/>
            <StatisticsLine text={names[2]} value={quantities[2]}/>
            <StatisticsLine text={names[3]} value={total}/>
            <StatisticsLine text={names[4]} value={a}/>
            <StatisticsLine text={names[5]} value={pp}/>
          </tbody>
        </table>
      </div>
    )
  }
}  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  
  const comments = ["good", "neutral", "bad", "all", "average", "positive"]
  const quantities = [good, neutral, bad]

  const total = () => quantities.reduce((acumulador, suma) => acumulador + suma, 0);

  return (
    <div>
      <Title text="give feedback"/>
      <Button text={comments[0]} functionality={() => setGood(good + 1)}/>
      <Button text={comments[1]} functionality={() => setNeutral(neutral +1)}/>
      <Button text={comments[2]} functionality={() => setBad(bad + 1)}/>
      <Title text="statistics"/>
      <Statistics names={comments} quantities={quantities}/>
    </div>
  )
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
