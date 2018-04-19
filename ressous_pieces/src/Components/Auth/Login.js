import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

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

    componentDidMount(){
        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : '831276837072082',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.10'
            });
            
        window.FB.Event.subscribe('auth.statusChange', (response) => {
            if(response.authResponse){
                console.log(response)
            } else {
                console.log('Second Condition')
                this.updateLoggedInState()
            }
        });   
        }.bind(this);

        (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v2.12&appId=831276837072082";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
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
        const responseFacebook = (response) => {
            console.log(response)
        }
        return (
            <div>
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
                        <div className='signButton'><button className="btn btn-primary" onClick={() => this.login()}>sign in</button></div>
                        <div className="fb-login-button" data-width="100" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false">Login with FB</div>

                </div>
                <div className='backContainer'>
                <Link to='/register'><button className='btn backButton'>register</button></Link>
                <Link to='/'><button className='btn backButton'>back</button></Link>
                </div>
            </div>
        );
    }
}

export default Login;