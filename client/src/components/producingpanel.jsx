import React, {Component} from 'react';
import Gauge from './Gauge';
import ProductionHistory from './productionHistory';
import Clock from './clock';
const socketURL = `ws://${window.location.hostname}:5431`;

class ProducingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wNow:0,
            time:new Date().toLocaleTimeString('en-US'),
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
        return <div className='dashContainer'>
                    <div className='meter_widget'>
                        <div className='widget_title'>Energy Meter</div>
                        <Gauge energyNow={this.state.energyNow}/>
                        <div className='numeric_container'>
                            <div className='wattsNow'>{this.state.wNow} Kwh</div>
                            <div className='wattsNow'>{this.state.cNow} Kwh</div>
                        </div>
                    </div>
                    <div className="column_2">
                        <ProductionHistory
                        whToday={this.state.whToday}
                        whLastSevenDays={this.state.whLastSevenDays}
                        />
                        <Clock />
                    </div>
                </div>


    }

}

export default ProducingPanel;