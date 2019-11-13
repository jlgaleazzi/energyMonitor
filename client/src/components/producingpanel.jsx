import React, {Component} from 'react';
import Gauge from './gauge';
class ProducingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wNow:0,
            time:new Date().toTimeString(),
            date:new Date().toDateString(),
            whToday:0,
            whLastSevenDays:0,
            energyNow:[0,3.7]

        }
    }
    componentDidMount() {
        // connect to socket server
        let socket = new WebSocket('ws://127.0.0.1:54321/');
        socket.addEventListener('open',((e) => {
            socket.send('hello');
        }))
        socket.addEventListener('message',((e) => {
           //console.log('receiving message'+e)
          let data = JSON.parse(e.data);
            let uDate = data.production[1].readingTime;
            let d = new Date(0);
            d.setUTCSeconds(uDate);
            let time = d.toTimeString()
            let kwatts = Number((data.production[1].wNow)/1000).toFixed(2);
            this.setState({
                wNow:kwatts,
                time:time,
                whToday: data.production[1].whToday,
                whLastSevenDays: data.production[1].whLastSevenDays,
                energyNow:[kwatts,3.7]

            })
        }));
    }
    render() {
        return <div>
                <h1>Solar Output</h1>
                <div>{this.state.date}</div>
                <Gauge energyNow={this.state.energyNow}/>
                <div className='wattsNow'>{this.state.wNow} Kw</div>
                <div>{this.state.whToday}</div>
                <div>{this.state.whLastSevenDays}</div>
                <div>{this.state.time}</div>
               
           </div>
    }

}

export default ProducingPanel;