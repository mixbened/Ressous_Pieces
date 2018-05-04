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
            <ul><Link className='navLink' to='/dashboard'><li className='navBox' >dashboard</li></Link>
            <Link className='navLink' to='/browser'><li className='navBox' >browser</li></Link>
            <a className='navLink' id='logout'onClick={() => this.logout()}><li className='navBox'>logout</li></a></ul>
            )
        } else {
            return <Link className='navLink' to='/login'><li className='navBox' >login</li></Link>
        }
    }

    render() {
        return (
            <div>
                <nav className={window.location.pathname === '/' ? 'notShow' : ''} >
                    <h2 className='logo'>R<span className='smallLetters'>essous</span><br/>P<span className='smallLetters'>ieces</span></h2>
                    <div>
                    <div className='navigation'>{this.checkButton()}</div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;