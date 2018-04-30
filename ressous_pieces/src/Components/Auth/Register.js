import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'

class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            imageUrl: '',
            email: '',
            imageFile: '',
            cloudinaryUrl: ''
        }
        this.uploadImage = this.uploadImage.bind(this);
    }


    // register without Image Upload

    // register(){
    //     this.uploadImage(this.state.imageFile);
    //     console.log(this.state.uploadUrl)
    //     const { username, email, imageUrl, password, uploadUrl } = this.state;
    //     const user = {
    //         username,
    //         email,
    //         imageUrl: uploadUrl,
    //         password,
            
    //     }
    //     axios.post('/api/register', user).then(data => {
    //         if(data.data === 'registered'){
    //             // window.location = '/dashboard'
    //         } else {
    //             // window.location = '/'
    //         }
    //     })
    // }

    uploadImage(file){
        console.log(file);
        axios.get('/api/upload').then(data => {
            let formData = new FormData();
            // formData.append('signature', data.data.signature);
            // formData.append('api_key', 313678225421239);
            // formData.append('timestamp',data.data.timestamp);
            formData.append('upload_preset', 'Devmtn_unsigned')
            formData.append('file', file[0])
            // for(var data of formData.entries()) {
            //         console.log(data); 
            //      }          
            axios.post(process.env.REACT_APP_CLOUDINARY_BASE_URL, formData).then(data => {
            console.log(data.data)
            this.setState({uploadUrl: data.data.secure_url})
            const user = {
            username: this.state.username,
            email: this.state.email,
            imageUrl: this.state.uploadUrl,
            password: this.state.password,
            }
            console.log(user)
            axios.post('/api/register', user).then(data => {
                if(data.data === 'registered'){
                    window.location = '/dashboard'
                } else {
                    window.location = '/'
                }
            })
            })
        })
    }

    register(){
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            }
        axios.post('/api/register', user).then(data => {
            if(data.data === 'registered'){
                window.location = '/login'
            } else {
                window.location = '/'
            }
        })
    }

    handler(){
        if(this.state.imageFile){
            this.uploadImage(this.state.imageFile);
        } else {
            this.register();
        }
    }

    render() {
    
        return (
            <div>
                <div className='container loginContainer'>
                        <h1 className='header'>register</h1>
                        <div className="form-group">
                            <label>username</label>
                            <input type="text" maxlength='30' className="form-control authInput" placeholder="username" onChange={e => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control authInput" placeholder="password" onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>email</label>
                            <input type="email" className="form-control authInput" placeholder="email" onChange={e => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>image Upload</label>
                            <input type="file" onChange={e => this.setState({imageFile: e.target.files})} className="form-control-file fileInput"/>
                        </div>
                        {this.state.failMessage}
                        <button className="btn btn-primary" onClick={() => this.handler()}>sign up</button>
                </div>
                <div className='backContainer'>
                <Link to='/login'><button className='btn backButton'>login</button></Link>
                <Link to='/'><button className='btn backButton'>back</button></Link>
                </div>
            </div>
        );
    }
}

export default Register;