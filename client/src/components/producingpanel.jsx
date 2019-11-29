import React, {Component} from 'react';
import Gauge from './Gauge';
const socketURL = `ws://${window.location.hostname}`;

class ProducingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wNow:0,
            time:new Date().toTimeString(),
            date:new Date().toDateString(),
            whToday:0,
            whLastSevenDays:0,
            cNow:0,
            energyNow:[0,0],
            temp:32,

        }
    }
    componentDidMount() {
        // connect to socket server
        let solarSocket = new WebSocket(`${socketURL}/solar`);
        solarSocket.addEventListener('open',((e) => {
            solarSocket.send('ProducePanel Connected');
        }))
        solarSocket.addEventListener('message',((e) => {
           console.log('receiving solar data'+e)
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
                energyNow:[kwatts,this.state.cNow]

            })
        }));
        let ccSocket = new WebSocket(`${socketURL}/ccout`);
        ccSocket.addEventListener('open', ( e => {
            ccSocket.send('requestData');
        }));
        ccSocket.addEventListener('message', e => {
           // console.log('receiving cc data '+e.data);
            let data = JSON.parse(e.data);
            let temp = data.tmp;
            let cWatts = Number(data.watts/1000).toFixed(2);
            this.setState({
                cNow:cWatts,
                temp: temp,
                energyNow:[this.state.wNow,cWatts]
            })
        })

    }
    render() {
        return <div>
                <h1>Solar Output</h1>
                <div>{this.state.date}</div>
                <Gauge energyNow={this.state.energyNow}/>
                <div>
                    <div className='wattsNow'>{this.state.wNow} Kw</div>
                    <div className='wattsNow'>{this.state.cNow} Kw</div>
                </div>
                <div>{this.state.whToday}</div>
                <div>{this.state.whLastSevenDays}</div>
                <div>{this.state.time}</div>

           </div>
    }

}

export default ProducingPanel;