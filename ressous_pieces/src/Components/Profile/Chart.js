import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component {
    constructor(){
        super();
        this.state = {
            chartData: {}
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
                }})
            })
    }


    render() {
        return (
            <div>
                <Doughnut
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default Chart;