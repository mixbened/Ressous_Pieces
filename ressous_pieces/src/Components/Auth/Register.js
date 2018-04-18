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
            email: '',
            imageFile: '',
            cloudinaryUrl: ''
        }
        this.register = this.register.bind(this);
    }

    register(){
        this.uploadImage(this.state.imageFile);
        console.log(this.state.uploadUrl)
        const { username, email, imageUrl, password, uploadUrl } = this.state;
        const user = {
            username,
            email,
            imageUrl,
            password,
            
        }
        axios.post('/api/register', user).then(data => {
            if(data.data === 'registered'){
                // window.location = '/dashboard'
            } else {
                // window.location = '/'
            }
        })
    }

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
            const { username, email, imageUrl, password, uploadUrl } = this.state;
            const user = {
            username,
            email,
            imageUrl: uploadUrl,
            password,
            }
            console.log(user)
            axios.post('/api/register', user).then(data => {
                if(data.data === 'registered'){
                    // window.location = '/dashboard'
                } else {
                    // window.location = '/'
                }
            })
            })
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
                        <div className="form-group">
                            <label>image Upload</label>
                            <input type="file" onChange={e => this.setState({imageFile: e.target.files})} className="form-control-file" placeholder="image"/>
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