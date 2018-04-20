import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './main.css';

class Nav extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
        }
    }

    componentDidMount(){
        axios.get('/api/checkSession').then(response => {
            console.log(response)
            if(response.data.user_id){
                this.setState({isLoggedIn: true})
            } 
        })
    }

    logout(){
        axios.post('/api/logout').then(data => {
            console.log('Logged Out')
            window.location = '/'
        })
    }

    checkButton(){
        if(this.state.isLoggedIn){ 
            return  (
            <div><li><Link className='btn navButton' to='/dashboard'>dashboard</Link></li>
            <li><a className='btn navButton' onClick={() => this.logout()}>logout</a></li></div>
            )
        } else {
            return <li><Link className='btn navButton' to='/login'>login</Link></li>
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <h2>Ressous Pieces</h2>
                    <div>
                            <ul>{this.checkButton()}</ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;