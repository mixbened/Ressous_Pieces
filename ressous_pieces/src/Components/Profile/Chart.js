import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { updateStats } from '../../ducks/reducer';
import { connect } from 'react-redux';  
import { withRouter } from 'react-router-dom';

class Chart extends Component {
    constructor(){
        super();
        this.state = {
            chartData: {},
            ratio: 0,
            load: true
        }
    }

    componentDidMount(){
        const { updateStats } = this.props
        updateStats();
        this.setState({load: false});
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
        if(this.props.stats[0] == 0 && this.props.stats[1] == 0) {
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
                    data={{
                        datasets: [{
                            data: [this.props.stats[0], this.props.stats[1]],
                            backgroundColor: [
                            '#FF6384',
                            '#36A2EB'
                            ],
                            hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB'
                            ]
                        }]
                    }}
                />
                <h5>{`You are ${this.checkStats()}`}</h5>
            </div>
    )
        }
    }

    render() {
        return (
            <div>
            {this.state.load ? '' : this.serveDoughnut()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        stats: state.userStats
    }
}
export default withRouter(connect(mapStateToProps, {updateStats})(Chart));