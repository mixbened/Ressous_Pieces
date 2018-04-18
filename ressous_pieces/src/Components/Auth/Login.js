import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            failMessage: ''
        }
        this.login = this.login.bind(this);
        this.showFail = this.showFail.bind(this);
    }

    handleKeyPress(event) {
        if(event.key === 'Enter'){
            this.login();
        }
      }

    login(){
        console.log('run Login')
        const { username, password } = this.state;
        const user = {
            username,
            password
        }
        axios.post('api/login', user).then(data => {
            console.log(data)
            if(data.data === "Wrong Password"){
                this.showFail('p')
            } else if (data.data === "Couldnt find User") {
                this.showFail('u')
            } else {
                window.location = '/dashboard';
            }
        })
    }

    showFail(val){
        console.log('show Fail')
        if(val === 'p'){
        this.setState({failMessage: <div>Wrong Password Dude. Try again!</div>});
        } else if (val === 'u') {
        this.setState({failMessage: <div>This User does not exist. Try again!</div>});
        }
    }

    render() {
        return (
            <div>
                <nav className='loginNav'>Nav</nav>
                <div className='container loginContainer'>
                        <h1>login</h1>
                        <div className="form-group">
                            <label>username</label>
                            <input type="text" className="form-control authInput" placeholder="username" onChange={e => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="text" className="form-control authInput" placeholder="password" onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                        {this.state.failMessage}
                        <button className="btn btn-primary" onClick={() => this.login()}>sign in</button>
                </div>
                <div className='backContainer'>
                <Link to='/register'><button className='btn backButton'>register</button></Link>
                <Link to='/dashboard'><button className='btn backButton'>back</button></Link>
                </div>
            </div>
        );
    }
}

export default Login;