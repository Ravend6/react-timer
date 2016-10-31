import React from 'react'

export default class Controls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onStatusChange = this.onStatusChange.bind(this)
  }

  static propTypes = {
    countdownStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired,
  }

  // componentWillReceiveProps(newProps) {
  //   console.log('receive', newProps.countdownStatus)
  // }

  onStatusChange(newStatus) {
    return () => {
      this.props.onStatusChange(newStatus)
    }
  }

  render() {
    let {countdownStatus} = this.props
    let renderStartStopButton = () => {
      if (countdownStatus === 'started') {
        return <button className="button secondary" onClick={this.onStatusChange('paused')}>Pause</button>
      } else if (countdownStatus === 'paused') {
        return <button className="button primary" onClick={this.onStatusChange('started')}>Start</button>
      }
    }

    return (
      <div className="controls">
        {renderStartStopButton()}
        <button className="button alert hollow" onClick={this.onStatusChange('stopped')}>Clear</button>
      </div>
    )
  }
}
