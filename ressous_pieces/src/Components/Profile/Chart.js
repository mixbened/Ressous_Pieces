import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { updateStats } from '../../ducks/reducer';
import { connect } from 'react-redux';  
import { withRouter } from 'react-router-dom';
import RecentItem from '../Lists/RecentItem';


class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: {},
            ratio: 0,
            load: true
        }
    }

    componentDidMount(){
        const { updateStats, ressents } = this.props
        updateStats();
        this.setState({load: false})
    }

//creating a ratio of the Stats and returning a motivational banner
    checkStats(){
        if(this.props.stats[1]/(this.props.stats[0]+this.props.stats[0]) >= 0.9){
            return 'a Rockstar!'
        } else if (this.props.stats[1]/(this.props.stats[0]+this.props.stats[0])  >= 0.5){
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
                    <p className='cursive'>create and check off topics to see your stats</p>
                </div>
            )
        } else {
            console.log('stats')
            return (<div>
                <Doughnut
                    data={{
                        labels: ['open issues','completed Issues'],
                        datasets: [{
                            data: [this.props.stats[0], this.props.stats[1]],
                            borderWidth: [0,0],
                            backgroundColor: [
                            '#90BE6D',
                            '#A4243B'
                            ],
                            hoverBackgroundColor: [
                            '#90BE6D',
                            '#A4243B'
                            ]
                        }]
                    }}
                    options={{
                        legend: {
                            display: false,
                        }
                    }}
                />
                <h5 className='cursive'>{`You are ${this.checkStats()}`}</h5>
            </div>
    )
        }
    }

    render() {
        const recentIssues = this.props.ressents.map( (el, i) => {
            return <RecentItem keyId={i+1} wsTitle={el.wstitle} title={el.title} description={el.description} id={el.issue_id}/>
        })
        return (
            <div>
                <div>
                {this.state.load ? '' : this.serveDoughnut()}
                </div>
                <div className='ressentTitle'>
                    ressents
                    <hr />
                </div>
                <div className='recentContainer'>
                    <ul>
                    {recentIssues}
                    </ul>
                </div>
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