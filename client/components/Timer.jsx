import React from 'react'
import Clock from './Clock'

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Timer</h1>
        <Clock />
      </div>
    )
  }
}
