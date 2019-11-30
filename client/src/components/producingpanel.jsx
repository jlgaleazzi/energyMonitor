import React, {Component} from 'react';
import Gauge from './Gauge';
const socketURL = `ws://${window.location.hostname}`;

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
                        <div className="production">
                            <div className='widget_title'>Production</div>
                            <div className="historic">
                                <div><h2>Today</h2></div>
                                <div>
                                    <h1>
                                    {Number((this.state.whToday)/1000).toFixed(2)}
                                    </h1>
                                </div>
                                * Killowats
                            </div>
                            <div className="historic">
                                <div><h2>Last 7 days</h2></div>
                                <div>
                                    <h1>
                                    {Number((this.state.whLastSevenDays)/1000).toFixed(2)}
                                    </h1>
                                    * Killowatts
                                </div>
                            </div>
                        </div>
                        <div className='clock'>
                            <div className='widget_title'>Clock</div>
                            <div className="clock_content">
                                <div>
                                    <h2>{this.state.date}</h2>
                                </div>
                                <div>
                                    <h1>{this.state.time}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


    }

}

export default ProducingPanel;