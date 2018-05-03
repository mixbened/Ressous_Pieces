import React, { Component } from 'react';
import axios from 'axios';
import { bounce, flip } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import Motor from 'react-icons/lib/md/attach-file';
import ProfileItem from '../Lists/ProfileItem';

const styles = StyleSheet.create({
    bounce: {
      animationName: flip,
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      textAlign: 'center',
      fontSize: '2em',
      marginTop: '1em',
    },
    smallText: {
        fontSize: '1.5em'
    }
  })

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            userinfo: [],
            issues: [],
            workspaces: [],
            workspacesInput: [],
            createMode: false,
            loading: true,
        }
        this.setCreate = this.setCreate.bind(this);
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        axios.get(`/api/user/${id}`).then(data => {
            this.setState({userinfo: data.data[0]})
            axios.get(`/api/issuesUser/${data.data[0].user_id}`).then(data => {
                this.setState({issues: data.data, loading: false})
            })
            axios.get(`/api/workspacesUser/${data.data[0].user_id}`).then(data => {
                this.setState({workspaces: data.data, loading: false})
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
        console.log('change Input func',this.state.issueInput)
        const workspaceList = this.state.workspacesInput.map(el => <button onClick={() => this.forkIssue(this.state.issueInput, el.workspace_id)}>{el.title}</button>)
        return <div className='creationContainer'>
            <button onClick={e => this.setState({createMode: !this.state.createMode})}>X</button>
            {workspaceList}
        </div>
    }

    setCreate(id){
        this.setState({createMode: true, issueInput: id})
    }

    render() {
        const issueList = this.state.issues.map( el => <ProfileItem forkIssue={this.setCreate} title={el.title} description={el.description} username={el.username} issue_id={el.issue_id} workspace_id={el.workspace_id}/>)
        const workspaceList = this.state.workspaces.map( el => <ProfileItem forkSpace={this.forkSpace} title={el.title} description={el.description} username={el.username} workspace_id={el.workspace_id} />)
        return (
            <div>
                <div className='infoContainer'>
                    <div className='profileContainer'>
                    <div className='profileheading'>
                        <h1>{this.state.userinfo.username}</h1>
                        <hr/>
                        <h4 className='subtitle'>Workspaces and Topics</h4>
                    </div>
                    </div>
                    <img className='img-thumbnail profileImage' src={this.state.userinfo.imageurl} alt={`of ${this.state.username}`} />
                </div>
                <div className={this.state.loading ? css(styles.bounce) : 'dontShow'}><Motor /></div>
                <h5>Topics</h5>
                <ul className='issueContainer'>
                    {issueList}
                </ul>
                <h5>Workspaces</h5>
                <ul className='issueContainer'>
                    {workspaceList}
                </ul>
                <div className={this.state.createMode ? 'creationBar slide' : 'creationBar'}>
                    {this.state.issueInput ? this.changeInput() : ''}
                </div>
            </div>
        );
    }
}

export default Profile;