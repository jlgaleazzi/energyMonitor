import React, {Component} from 'react'
import Chart from 'chart.js'

class Gauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[0, 3.7]
        }
    }
    componentDidMount() {
     this.chart =  this.drawGauge();
    }
    componentDidUpdate(prevProps) {
        console.log(this.props.energyNow);
        if (this.props.energyNow !== prevProps.energyNow) {
            console.log('should update gauge');
            this.setState({
                data:[this.props.energyNow]
            })
            
            
            //this.drawGauge();
            this.chart.data.datasets[0].data = this.props.energyNow;
            this.chart.update();
            console.log('new Data'+JSON.stringify(this.state.data));
        }
    }

    drawGauge() {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.Width, canvas.height);
       
        let gauge = new Chart(ctx, {
            type:'doughnut',
            data: {
                labels: ['Now','Peak'],
                datasets: [{
                    data: this.props.energyNow,
                    backgroundColor: [
                        'rgb(250,222,50)',
                        'rgb(46,46,50)',
                        'rgba(255,205,86,0)'
                    ]
                }]
            },
            options: {
                circumference: Math.PI,
                rotation:Math.PI,
                cutoutPercentage:60,
                plugins: {
                    backgroundColor: 'rgba(120,250,250,0.5)',
                    borderColor:'#ffffff',
                    color: function(context) {
                        return context.dataset.backgroundColor;
                    },
                    font: function(context) {
                        var w = context.chart.width;
                        return {
                            size: w < 512 ? 18 : 20
                        }
                    },
                    align: 'start',
                    anchor: 'start',
                    offset: 10,
                    borderRadius: 4,
                    borderWidth: 1,
                    formatter: function(value, context) {
                        var i = context.dataIndex;
                        var len = context.dataset.data.length -1;
                        if (i == len) {
                            return null;
                        }
                        return value + ' kwh'
                    }
                }
            }
        }) 
        return gauge;
    }

    render() {
        return  <div className='gauge'>
                    <canvas ref='canvas'/>
                </div>
    }
}
 export default Gauge;