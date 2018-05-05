import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChatHome extends Component {
    render() {
        return (
            <div>
                    <button style={{background: 'red', color: 'white'}}>Beta</button>
                <ul>
                    <Link to='/messenger'><li>Web Development</li></Link>
                    <Link to='/chatdata'><li>Data Science</li></Link>
                </ul>
            </div>
        );
    }
}

export default ChatHome;