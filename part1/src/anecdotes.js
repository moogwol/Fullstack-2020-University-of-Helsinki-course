import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <div><button onClick={props.handleClick}>{props.text}</button></div>
  )
}

const Display = (props) => <div>{props.text}</div>


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0})
  const [max, setMax] = useState(0)
  const [mostPopular, setMostPopular] = useState(0)
  const votesCopy = { ...votes }
  const randomWisdom = () => setSelected(Math.floor(Math.random() * 6))

  console.log('current selection:', selected,
              'current votes:', votes,
              'highest vote:', max,
              'most popular:', mostPopular)

  const handleVote = () => {
    votesCopy[selected] += 1
    if (votesCopy[selected] > max) {
      setMax(votesCopy[selected])
      setMostPopular(selected)
    }
    setVotes(votesCopy)
  }


  return (
    <div>
      <Display text=<h1>Anecdote of the day</h1> />
      {props.anecdotes[selected]}
      <table>
        <tbody>
          <tr>
            <td><Button handleClick={randomWisdom}  text='next anecdote' /></td>
            <td><Button handleClick={handleVote} text='vote'/></td>
          </tr>
        </tbody>
      </table>
      <Display text=<h1>Anecdote with the most votes</h1> />
      {props.anecdotes[mostPopular]}
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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
