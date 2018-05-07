import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Topic from 'react-icons/lib/md/assignment';

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    topic(){
        if(this.props.issue_id){
            return <Link to={`/issue/${this.props.issue_id}`}><Topic className='icon' /></Link>
        }
    }

    render() {
        const { key, messagebody, username, issue_id } = this.props
        return (
            <div className='messageContainer' key={key}>
                <div>{username}:</div> 
                <div className='messageBody'>{messagebody}</div>
                {this.topic()}
            </div>
        );
    }
}

export default Message;