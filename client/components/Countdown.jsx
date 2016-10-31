import React from 'react'
import Clock from './Clock'
import CountdownForm from './CountdownForm'
import Controls from './Controls'

export default class Countdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      countdownStatus: 'stopped'
    }
    this.handleSetCountdown = this.handleSetCountdown.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer()
          break
        case 'paused':
          clearInterval(this.timer)
          this.timer = undefined
          break
      }
    }
  }

  // componentWillUpdate(nextProps, nextState) {
  //
  // }
  //
  // componentDidMount() {
  //   console.log('dm')
  // }
  //
  // componentWillMount() {
  //   console.log('wm')
  // }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = undefined
  }

  startTimer() {
    this.timer = setInterval(() => {
      let newCount = this.state.count - 1
      this.setState({
        count: newCount >= 0 ? newCount : 0
      })
      if (newCount === 0) {
        this.setState({
          countdownStatus: 'stopped'
        })
        clearInterval(this.timer)
        this.timer = undefined
      }
    }, 1000)
  }

  handleSetCountdown(seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    })
  }

  handleStatusChange(newStatus) {
    this.setState({
      countdownStatus: newStatus
    })
    if (newStatus === 'stopped') {
      clearInterval(this.timer)
      this.setState({count: 0})
    }
  }

  render() {
    let {count, countdownStatus} = this.state
    let renderControlArea = () => {
      if (countdownStatus !== 'stopped') {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange} />
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown} />
      }
    }

    return (
      <div>
        <h1 className="page-title">Countdown</h1>
        <Clock totalSeconds={count} />
        {renderControlArea()}
      </div>
    )
  }
}
