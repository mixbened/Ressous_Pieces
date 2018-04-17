import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            imageUrl: '',
            email: ''
        }
        this.register = this.register.bind(this);
    }

    register(){
        const { username, email, imageUrl, password } = this.state;
        const user = {
            username,
            email,
            imageUrl,
            password
        }
        axios.post('/api/register', user).then(data => {
            if(data.data === 'registered'){
                // window.location = '/dashboard'
            } else {
                // window.location = '/'
            }
        })
    }

    render() {
    
        return (
            <div>
                <nav className='loginNav'>Nav</nav>
                <div className='container loginContainer'>
                        <h1>register</h1>
                        <div className="form-group">
                            <label>username</label>
                            <input type="text" className="form-control authInput" placeholder="username" onChange={e => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="text" className="form-control authInput" placeholder="password" onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>email</label>
                            <input type="text" className="form-control authInput" placeholder="email" onChange={e => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>image</label>
                            <input type="text" className="form-control authInput" placeholder="image" onChange={e => this.setState({imageUrl: e.target.value})}/>
                        </div>
                        {this.state.failMessage}
                        <button className="btn btn-primary" onClick={() => this.register()}>sign up</button>
                </div>
                <div className='backContainer'>
                <Link to='/login'><button className='btn backButton'>login</button></Link>
                <Link to='/dashboard'><button className='btn backButton'>back</button></Link>
                </div>
            </div>
        );
    }
}

export default Register;