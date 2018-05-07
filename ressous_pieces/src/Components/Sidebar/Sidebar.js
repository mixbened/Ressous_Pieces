import React, { Component } from 'react';
import axios from 'axios';
import './Sidebar.css';
import Chart from '../Profile/Chart';
import RecentItem from '../Lists/RecentItem';
import { Link, withRouter } from 'react-router-dom';
import { updateRessents } from '../../ducks/reducer';
import {connect} from 'react-redux';

class Sidebar extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            image: '',
            ressents: [],
            loading: true
        }
    }

    componentDidMount(){
        const { updateRessents } = this.props;
        axios.get('/api/checkSession').then((data) => {
            console.log(data.data.imageurl)
            this.setState({
                username: data.data.username,
                image: data.data.imageurl,
            })
            updateRessents(this.state.username)
        })
    }

    render() {
        return (
            <div className='sidebar'>
                <div className='personalInfo'>
                    <div className='imageContainer'><img className='thumbnail profileImage' src={this.state.image} alt={`of ${this.state.username}`} /></div>  
                    <h4>What's up {this.state.username}!</h4>
                        <div className='ressentTitle'>
                        your stats
                        <hr />
                        </div>
                        <Chart ressents={this.props.ressents}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        stats: state.userStats,
        ressents: state.ressents
    }
}

export default withRouter(connect(mapStateToProps, {updateRessents})(Sidebar));