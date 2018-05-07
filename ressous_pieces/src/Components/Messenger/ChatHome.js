import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Arrow from 'react-icons/lib/ti/arrow-left';
import ChatPreview from './ChatPreview';

class ChatHome extends Component {
    render() {
        return (
            <div>
                <div className='breadcrump'><Link to='/dashboard'><Arrow />dashboard</Link></div>
                <div className='heading'>
                    <h2 className='title'>chat</h2>
                    <hr/>
                    <h4 className='subtitle'>find new workspaces and topics</h4>
                </div>
                    <button style={{background: 'red', color: 'white'}}>Beta</button>
                <div className='preview'>
                    <Link className='previewContainer' to='/chatweb'><ChatPreview room={1}/></Link>
                    <Link className='previewContainer' to='/chatdata'><ChatPreview room={2}/></Link>
                </div>
            </div>
        );
    }
}

export default ChatHome;