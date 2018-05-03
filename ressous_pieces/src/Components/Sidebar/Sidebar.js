import React, { Component } from 'react';
import axios from 'axios';
import './Sidebar.css';
import Chart from '../Profile/Chart';
import RecentItem from '../Lists/RecentItem';

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
        axios.get('/api/checkSession').then((data) => {
            console.log(data.data.imageurl)
            this.setState({
                username: data.data.username,
                image: data.data.imageurl,
            })
            axios.get(`/api/ressents/${data.data.username}`).then(response => {
                this.setState({ressents: response.data, loading: false})
                console.log(this.state.ressents)
            })
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
                        <Chart ressents={this.state.ressents}/>
                </div>
            </div>
        );
    }
}

export default Sidebar;