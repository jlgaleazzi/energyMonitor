import React from 'react'

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        date: new Date()
      })
    }
    render() {
      return (
        <div className='clock'>
          <div className='widget_title'>Clock</div>
          <div className="clock_content">
              <div>
                  <h2>{this.state.date.toDateString()}</h2>
              </div>
              <div>
                  <h1>{this.state.date.toLocaleTimeString('en-US')}</h1>
              </div>
          </div>
        </div>

      );
    }
}

export default Clock;