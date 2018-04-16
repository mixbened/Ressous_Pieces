import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            failMessage: ''
        }
        this.login = this.login.bind(this);
    }

    login(){
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
        if(val === 'p'){
        this.setState({failMessage: <div>Wrong Password Dude. Try again!</div>});
        } else if (val === 'u') {
        this.setState({failMessage: <div>This User does not exist. Try again!</div>});
        }
    }

    render() {
        return (
            <div>
                <h1>Hello from the Login Component</h1>
                <input placeholder='Username' value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
                <input placeholder='Password' value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                <button onClick={this.login}>Login</button>
                {this.state.failMessage}
            </div>
        );
    }
}

export default Login;