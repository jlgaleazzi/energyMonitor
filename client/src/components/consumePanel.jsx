import React, {Component} from 'react';
import Gauge from './Gauge';

class ConsumePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watts: 0,
            time:new Date().toTimeString(),
        }
    }

    componentDidMount() {
        // connect to socket ser
      
        let socket = new WebSocket('ws://127.0.0.1:43210/');
        socket.addEventListener('open',((e) => {
            console.log('consume Panel Connected');
            socket.send("consumePanel Connected");
        }))
        socket.addEventListener('message', (e) => {
            console.log('receiving '+e.data);
            let data = JSON.parse(e.data);
            let watts = Number(data.watts).toFixed(2);
            console.log('watts '+watts);
            let time = new Date().toTimeString();
            this.setState({
                watts:watts,
                time:time,
            })
        }) 
    }

    render() {
        return  <div>
            <h1>Energy Now</h1>
            <div>** Actual Enery consumed in kwh</div>
            <Gauge energyNow={[this.state.watts,14]}/>
            <div className='wattsNow'>{this.state.watts} Kw</div>
        </div>
    }
}

export default ConsumePanel;
