import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ChatPreview extends Component {
    constructor(props){
        super(props)
        this.state = {
            room: '',
            messages: []
        }
    }

    componentDidMount(){
        console.log(this.props.room)
        axios.get(`/api/chatroom/${this.props.room}`).then(response => {
            this.setState({messages: response.data, room: this.props.room})
        })
    }

    heading(val){
        if(val === 1) {
            return 'web developer'
        } else if (val === 2) {
            return 'data scientists'
        }
    }


    render() {
        const messageList = this.state.messages.map(el => <li>{el.username} > {el.messagebody}</li>)
        return (
            <div>
                <div className='chatHeading'>
                    <h3>{this.heading(this.state.room)}</h3>
                </div>
                <div className='chatPreview'>
                    <ul>
                        {messageList}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ChatPreview;