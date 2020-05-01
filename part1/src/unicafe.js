import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
  {props.text}
  </button>
)


const Statistics = (props) => {
  if (props.all > 0) {
    return (
    <tr><td>{props.text}</td><td>{props.statistic}</td></tr>
    )
  }
    else {
      return (
        <tr><td></td></tr>
      )
    }
  }


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const average = all / 3
  const positive = good / all * 100 + ' %'
  const feedback = () => {
    if (all === 0) {
      return 'no feedback given'
    }
  }
  console.log(['good:', good, 'neutral: ', neutral, 'bad: ', bad, 'total: ', all])

  const handleClick = (value, setter) => {
    return (
      () => [setter(value + 1), setAll(all + 1)]
    )
  }



  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleClick(good, setGood)} text='good' />
      <Button handleClick={handleClick(neutral, setNeutral)} text='neutral' />
      <Button handleClick={handleClick(bad, setBad)} text='bad' />

    <table>
      <caption><Header text='statistics' /></caption>
        <tbody>
          <Display text={feedback()}/>          
          <Statistics all={all} text='good'  statistic={good}/>
          <Statistics all={all} text='neutral' statistic={neutral}/>
          <Statistics all={all} text='bad' statistic={bad}/>
          <Statistics all={all} text='average' statistic={average}/>
          <Statistics all={all} text='percentage positive' statistic={positive}/>
        </tbody>
      </table>
    </div>

  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))
