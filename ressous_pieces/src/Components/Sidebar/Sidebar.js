import React, { Component } from 'react';
import axios from 'axios';
import './Sidebar.css';
import Chart from '../Profile/Chart';

class Sidebar extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            image: '',
            recents: []
        }
    }

    componentDidMount(){
        axios.get('/api/checkSession').then((data) => {
            console.log(data.data.imageurl)
            this.setState({
                username: data.data.username,
                image: data.data.imageurl,
            })
        })
    }

    render() {
        return (
            <div className='sidebar'>
                <div className='personalInfo'>
                    <div className='imageContainer'><img className='thumbnail profileImage' src={this.state.image} alt={`of ${this.state.username}`} /></div>  
                    <h2>Whats up {this.state.username}!</h2>
                    <Chart />
                </div>
            </div>
        );
    }
}

export default Sidebar;