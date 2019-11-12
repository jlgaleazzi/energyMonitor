import React, {Component} from 'react'

class Gauge extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {

    }

    drawGauge() {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.Width, canvas.height);
        let gauge = new Chart(ctx, {
            type:'doughnut',
            data: {
                labels: ['Red','Blue'],
                datasets: [{
                    data: [10,190],
                    backgroundColor: [
                        'rgb(255,99,132',
                        'rgb(54,162,235',
                        'rgb(255,205,86'
                    ]
                }]
            },
            options: {
                circumference: Math.PI,
                rotation:Math.PI,
                cutoutPercentage:80,
                plugins: {
                    backgroundColor: 'rgba(0,0,0,0.7)',
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
                    }
                }
            }
        })
    }

    render() {
        return  <div className='gauge'>
                    <canvas ref='canvas'/>
                </div>
    }
}