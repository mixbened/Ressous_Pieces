import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component {
    constructor(){
        super();
        this.state = {
            chartData: {},
            ratio: 0,
            load: false
        }
    }

    componentDidMount(){
        axios.get(`/api/workspaces/`).then(data => {
                this.setState({chartData: {
                    datasets: [{
                        data: [data.data.unchecked, data.data.check],
                        backgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                        ],
                        hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                        ]
                    }]
                },
                    ratio:data.data.check/(data.data.unchecked+data.data.check),
                    load: true
            })
        })
    }

    checkStats(){
        if(this.state.ratio >= 0.9){
            return 'a Rockstar!'
        } else if (this.state.ratio >= 0.5){
            return 'on Track'
        } else {
            return 'a little bit behind...'
        }
    }

    serveDoughnut(){
        console.log('serve Dough')
        console.log(this.state.chartData.datasets[0].data)
        if(this.state.chartData.datasets[0].data[0] == 0 && this.state.chartData.datasets[0].data[1] == 0) {
            console.log('no Stats')
            return (
                <div>
                    <p>create and check off topics to see your stats</p>
                </div>
            )
        } else {
            console.log('stats')
            return (<div>
                <Doughnut
                    data={this.state.chartData}
                />
                <h5>{`You are ${this.checkStats()}`}</h5>
            </div>
    )
        }
    }

    render() {
        return (
            <div>
                <h5>Your RP Stats</h5>
                {this.state.load ? this.serveDoughnut() : ''}
            </div>
        );
    }
}

export default Chart;