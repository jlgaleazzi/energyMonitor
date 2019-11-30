import React, {Component} from 'react'
import Chart from 'chart.js'

class Gauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[0, 3.7],
            backgroundColor:[ '#3D9E92',
            '#F07A67',
            'rgba(0,0,0,1)']
        }
    }
    componentDidMount() {
     this.chart =  this.drawGauge();
    }
    componentDidUpdate(prevProps) {
        if (this.props.energyNow !== prevProps.energyNow) {
            this.setState({
                data:[this.props.energyNow]
            })


            //this.drawGauge();
            this.chart.data.datasets[0].data = this.props.energyNow;
            this.chart.update();
        }
    }

    drawGauge() {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.Width, canvas.height);

        let gauge = new Chart(ctx, {
            type:'doughnut',
            data: {
                labels: ['Producing','Consuming'],
                datasets: [{
                    data: this.props.energyNow,
                    backgroundColor: this.state.backgroundColor,
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderWidth: 1,
                }]
            },
            options: {
                circumference: Math.PI,
                rotation:Math.PI,
                cutoutPercentage:60,
                plugins: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderColor:'#000000',
                    color: function(context) {
                        return context.dataset.backgroundColor;
                    },
                    font: function(context) {
                        var w = context.chart.width;
                        return {
                            size: w < 512 ? 18 : 30
                        }
                    },
                    align: 'start',
                    anchor: 'start',
                    offset: 10,
                    borderRadius: 4,
                    borderWidth: 0,
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