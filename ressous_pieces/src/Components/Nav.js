import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './main.css';
import { updateUser } from '../ducks/reducer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';  

class Nav extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
        }
    }

    componentDidMount(){
        const { updateUser } = this.props
        axios.get('/api/checkSession').then(response => {
            console.log(response)
            if(response.data.user_id){
                this.setState({isLoggedIn: true})
                updateUser({username: response.data.username, user_id: response.data.user_id})
            } 
        })
    }

    logout(){
        axios.post('/api/logout').then(data => {
            console.log('Logged Out')
            window.location = '/'
        })
    }

    checkActive(val){
        if(window.location.pathname === val){
            return 'navActive navBox'
        } else {
            return 'navBox'
        }
    }

    checkButton(){
        if(this.state.isLoggedIn){ 
            return  (
            <ul><Link className='navLink' to='/dashboard'><li className={this.checkActive('/dashboard')} >dashboard</li></Link>
            <Link className='navLink' to='/browser'><li className={this.checkActive('/browser')} >browser</li></Link>
            <Link className='navLink' to='/chat'><li className={this.checkActive('/chat')} >chat</li></Link>
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

function mapStateToProps(state){
    return {
        username: state.username
    }
}

export default withRouter(connect(mapStateToProps, {updateUser})(Nav));