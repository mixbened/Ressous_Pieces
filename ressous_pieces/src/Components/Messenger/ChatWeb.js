import React, { Component } from 'react';
import './messenger.css';
import axios from 'axios';
import io from 'socket.io-client';
import { setTimeout } from 'timers';
import { Prompt } from 'react-router-dom';

class Messenger extends Component {
    constructor(){
        super();
        this.state = {
            messagesDB: [],
            room: 1,
            messageInput: '',
            username: '',
            typers: [],
            messagesSocket: []
        }
        
        this.socket = io('/web');
        this.typing = false;
        
        
        this.sendMessage = e => {
            e.preventDefault();
            this.state.username === '' ? alert('Please enter your username') : 
            this.state.messageInput === '' ? alert('Please enter a message') :
            this.socket.emit('SEND_MESSAGE', {
                messagebody: this.state.messageInput,
                username: this.state.username,
                room: this.state.room
            });
            this.setState({messageInput: ''})
        }
        
        this.socket.on('RECEIVE_MESSAGE', data => {
            console.log('received from Backend, pass to add', data);
            addMessage(data);
        })
        
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
    
    
    render(){
        const messages = this.state.messagesDB.concat(this.state.messagesSocket)
        return (
            <div className='chatRoom'>
            <Prompt message={e => {
                this.disconnect() ? 'You are leaving the Page' : ''
            }}/>
            <h1>Chatrom Web</h1>
            <div className='messages'>
                {messages.length ? messages.map((message,i) => {
                    // console.log(message.username, message.messageBody)
                    return (
                        <span key={i}>
                        <strong style={{color: 'purple', marginLeft: '0', textAlign: 'left'}}>{message.username}:</strong>
                        {' '}{message.messagebody}<br/>
                        </span>
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
            <input className='input' placeholder='Enter message here' type="text" value={this.state.messageInput} /*onKeyPress={() => this.isTyping()}*/ onChange={e => this.setState({messageInput: e.target.value})}/><br/>
            <button className='btn' onClick={this.sendMessage}>Send Message</button>
            </div>
        )
    }
}

export default Messenger;