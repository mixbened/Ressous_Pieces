import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            userinfo: [],
            issues: [],
            workspaces: []
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        axios.get(`/api/user/${id}`).then(data => {
            this.setState({userinfo: data.data[0]})
            axios.get(`/api/issuesUser/${data.data[0].user_id}`).then(data => {
                this.setState({issues: data.data})
            })
            axios.get(`/api/workspacesUser/${data.data[0].user_id}`).then(data => {
                this.setState({workspaces: data.data})
            })
        })
    }

    forkSpace(id){
        axios.post(`/api/forkSpace/${id}`).then( data => {
            window.location = '/dashboard';
        })
    }

    render() {
        console.log(this.state.issues)
        const issueList = this.state.issues.map( el => <li className='list-group-item issue'><p>{el.title}</p><h6>{el.description}</h6><h6>{el.username}</h6></li>)
        const workspaceList = this.state.workspaces.map( el => <li className='list-group-item issue'><p>{el.title}</p><h6>{el.description}</h6><h6>{el.username}</h6><button onClick={() => this.forkSpace(el.workspace_id)}>Fork</button></li>)
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
                <h5>{`${this.state.userinfo.username}'s Workspaces`}</h5>
                <ul className='issueContainer'>
                    {workspaceList}
                </ul>
            </div>
        );
    }
}

export default Profile;