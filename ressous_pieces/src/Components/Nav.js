import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Nav extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
        }
    }

    componentDidMount(){
        axios.get('/api/checkSession').then(response => {
            if(response){
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
            return <button onClick={() => this.logout()}>Logout</button>
        } else {
            return <Link to='/login'><button>Login</button></Link>
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <h2>Navigation</h2>
                    <div>
                        <Link to='/dashboard'>Dashboard</Link>
                        {this.checkButton()}
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;