import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            userinfo: [],
            issues: [],
            workspaces: [],
            workspacesInput: [],
            createMode: false
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
            alert('Forked')
            window.location = '/dashboard';
        })
    }

    forkIssue(issueID, workspaceID){
        console.log(issueID,workspaceID)
        axios.post(`/api/forkIssue/${issueID}/${workspaceID}`).then( data => {
            alert('Forked')
            window.location = '/dashboard';
        })
        this.setState({createMode: false})
    }

    changeInput(){
        axios.get('/api/dashboard/').then(data => {
            this.setState({workspacesInput: data.data})
        })
        const workspaceList = this.state.workspacesInput.map(el => <button onClick={() => this.forkIssue(this.state.issueInput, el.workspace_id)}>{el.title}</button>)
        return <div className='creationContainer'>
            <button onClick={e => this.setState({createMode: !this.state.createMode})}>X</button>
            {workspaceList}
        </div>
    }

    render() {
        const issueList = this.state.issues.map( el => <li className='list-group-item issue'><p>{el.title}</p><h6>{el.description}</h6><h6>{el.username}</h6><button onClick={() => this.setState({createMode: true, issueInput: el.issue_id})}>Fork</button></li>)
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
                <div className={this.state.createMode ? 'creationBar slide' : 'creationBar'}>
                    {this.changeInput()}
                </div>
            </div>
        );
    }
}

export default Profile;