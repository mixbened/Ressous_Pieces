import React, { Component } from 'react';
import './messenger.css';
import axios from 'axios';
import io from 'socket.io-client';
import { setTimeout } from 'timers';
import { Prompt, withRouter } from 'react-router-dom';
import updateUser from '../../ducks/reducer';
import { connect } from 'react-redux';
import Message from './Message';
import Topic from 'react-icons/lib/md/assignment';
import { Link } from 'react-router-dom';
import Arrow from 'react-icons/lib/ti/arrow-left';

class ChatData extends Component {
    constructor(props){
        super(props);
        this.state = {
            messagesDB: [],
            room: 2,
            messageInput: '',
            issueInput: null,
            username: '',
            typers: [],
            users: [],
            messagesSocket: [],
            topicActive: false,
            topics: []
        }
        
        this.socket = io('/data', { query: `username=${this.props.username}`});
        this.typing = false;
        
        
        this.sendMessage = e => {
            this.state.username === '' ? alert('Please enter your username') : 
            this.state.messageInput === '' ? alert('Please enter a message') :
            this.socket.emit('SEND_MESSAGE', {
                messagebody: this.state.messageInput,
                username: this.state.username,
                room: this.state.room,
                issue_id: this.state.issueInput
            });
            this.setState({messageInput: '', issueInput: ''})
        }
        
        this.socket.on('RECEIVE_MESSAGE', data => {
            console.log('received from Backend, pass to add', data);
            addMessage(data);
        })

        this.socket.on('SEND_USER', data => {
            this.setState({users: data})
        })

        // this.socket.on('RECEIVE_USER', data => {
        //     console.log('received User from Backend, add to State')
        //     this.setState({users: []})
        // })

        // this.socket.on('connect', data => {
        //     this.socket.emit('SET_USER', {username: this.state.username})
        // })

        /*this.socket.on('disconnect', data => {
            console.log('disconnetion runs')
            this.socket.emit('REMOVE_USER', {username: this.state.username})
        })*/
        
        const addMessage = data => {
            console.log('add to State', data);
            const filteredData = data.filter(e => e.room === 1)
            console.log(filteredData)
            this.setState({messagesSocket: data})
        }
        
        this.disconnect = () => {
            console.log('runs disconnect')
            this.socket.disconnect()
        }
        
       /* this.isTyping = () => {
            this.typing = true;
            this.socket.emit('isTyping', this.state.username);
            
            setTimeout(() => {
                this.typing = false;
                this.socket.emit('stopTyping', this.state.username)
            }, 1000)
        }
        
        // -- Receives 'currentTyper' from backend with specific User Name and sets state with currentTypers to initiate app notification of who is typing.
        this.socket.on('currentTyper', name => {
            let currentTypers = this.state.typers;
            if(currentTypers.indexOf(name) === -1){
                currentTypers.push(name)
            }
            this.setState({
                typers: currentTypers
            })
        })
        
        // -- Receives name of who has stopped typing to end the app notification
        this.socket.on('previousTyper', name => {
            let previousTypers = this.state.typers;
            previousTypers.forEach((e, i, a) => {
                if( e === name){
                    a.splice(i, 1)
                }
            })
            this.setState({
                typers: previousTypers
            })
        })*/
    }
    componentDidMount(){
        axios.get('/api/checkSession').then(response => {
            if(response.data.user_id){
                this.setState({username: response.data.username})
            } 
        })
        axios.get(`/api/chatroom/${this.state.room}`).then(response => {
            console.log('coming from DB', response.data)
            this.setState({messagesDB: response.data})
        })
    }

    handleKeyPress(event) {
        if(event.key === 'Enter'){
            this.sendMessage();
        } 
    }
    
    
    render(){
        const messages = this.state.messagesDB.concat(this.state.messagesSocket);
        const userList = this.state.users.map(el => <li className='userItem'>{el}</li>)
        const issueList = this.state.topics.map(el => <li onClick={() => this.setState({issueInput: el.issue_id, topicActive: false})}>{el.title}</li>)
        return (
            <div>
                <div className='breadcrump'><Link to='/chat'><Arrow />back</Link></div>
                <h1>Chatroom Data</h1>
                <div className='chatRoom'>
                <Prompt message={e => {
                    this.disconnect() ? 'You are leaving the Page' : ''
                }}/>
                <div className='infoBar'>
                    <h6>Who's on the line?</h6>
                    <ul className='userList'>
                        {userList}
                    </ul>
                </div>
                <div className='chatContent'>
                    <div className='messages'>
                        {messages.length ? messages.map((message,i) => {
                            // console.log(message.username, message.messageBody)
                            return (
                                <Message key={i} issue_id={message.issue_id} username={message.username} messagebody={message.messagebody}/>
                            )
                        }) : null}
                    </div>
                    {this.state.typers.length < 4? this.state.typers.map((typer, i) => {
                        if(typer === this.state.username){
                            return null
                        } else {
                            return (
                                <span key={i} style={{color: 'black', marginRight: '10px'}}>{typer + ' is typing...'}</span>
                            )
                        }}) : this.state.typers.length >=4 ? <p>There are multiple users typing...</p> : null}
                        <br/>
                        <br/>
                    Message: <br/>
                    <div className='inputWithIcon'>
                        <input className='input messageInput' onKeyPress={e => this.handleKeyPress(e)} placeholder='Enter message here' type="text" value={this.state.messageInput} /*onKeyPress={() => this.isTyping()}*/ onChange={e => this.setState({messageInput: e.target.value})}/>
                        <Topic className={this.state.issueInput ? 'iconElement' : 'dontShow'}/>
                    <button style={{display: 'inline-block'}}className='btn'onClick={() => {
                        axios.get(`/api/issuesUser/${this.props.user_id}`).then( data => {
                        this.setState({topicActive: !this.state.topicActive, topics: data.data})
                        })
                    }
                    }>Attach Topic</button>
                    </div>
                    <div className={this.state.topicActive ? 'issuesList' : 'dontShow'}>
                        <ul>
                            {issueList}
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        username: state.username,
        user_id: state.user_id
    }
}

export default withRouter(connect(mapStateToProps, {updateUser})(ChatData));