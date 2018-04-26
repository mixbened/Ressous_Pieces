import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            userinfo: [],
            issues: []
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        axios.get(`/api/user/${id}`).then(data => {
            this.setState({userinfo: data.data[0]})
            axios.get(`/api/issuesUser/${data.data[0].user_id}`).then(data => {
                this.setState({issues: data.data})
            })
            console.log(this.state.userinfo)
        })
    }

    render() {
        console.log(this.state.issues)
        const issueList = this.state.issues.map( el => <li className='list-group-item issue'><p>{el.title}</p><h6>{el.description}</h6><h6>{el.username}</h6></li>)
        return (
            <div>
                <div className='infoContainer'>
                    <div className='profileContainer'>
                        <h1>{this.state.userinfo.username}</h1>
                        <h3>{`Status: Rockstar`}</h3>
                    </div>
                    <img className='img-thumbnail profileImage' src={this.state.userinfo.imageurl} alt={`of ${this.state.username}`} />
                </div>
                <h5>{`${this.state.userinfo.username}'s Issues`}</h5>
                <ul className='issueContainer'>
                    {issueList}
                </ul>
            </div>
        );
    }
}

export default Profile;