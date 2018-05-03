import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Edit from 'react-icons/lib/md/chevron-right';

class RecentItem extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { title, wsTitle, id, keyId } = this.props;
        return (
            <li>
            <Link to={`/issue/${id}`}>
            <div className='recent'>
                <div className='circle'>{keyId}</div>
                <h6>{title}</h6>
                <p>{wsTitle}</p>
            </div>
            </Link>
            </li>
        );
    }
}

export default RecentItem;