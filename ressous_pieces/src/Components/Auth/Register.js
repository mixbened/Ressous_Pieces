import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.register = this.register.bind(this);
    }

    register(){
        const user = {
            username: '',
            email: '',
            imageUrl: '',
            password: ''
        }
        axios.post('/api/register', user).then(data => {
            console.log('Registered')
        })
    }

    render() {
    
        return (
            <div>
                <h1>Hello from the Register Component</h1>
            </div>
        );
    }
}

export default Register;