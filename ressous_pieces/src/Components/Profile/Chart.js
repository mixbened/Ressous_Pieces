import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component {
    constructor(){
        super();
        this.state = {
            chartData: {},
            ratio: 0
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


    render() {
        return (
            <div>
                <Doughnut
                    data={this.state.chartData}
                />
                <h5>{`You are ${this.checkStats()}`}</h5>
            </div>
        );
    }
}

export default Chart;