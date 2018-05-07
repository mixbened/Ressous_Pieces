import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Topic from 'react-icons/lib/md/assignment';
import { StyleSheet, css } from 'aphrodite';
import { bounce, fadeInRight } from 'react-animations';


const styles = StyleSheet.create({
    fadeInRight: {
      animationName: fadeInRight,
      animationDuration: '1s',
    },
  })

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
            <div className={css(styles.fadeInRight)} key={key}>
                <div>{username}:</div> 
                <div className='messageBody'>{messagebody}</div>
                {this.topic()}
            </div>
        );
    }
}

export default Message;