import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from 'react-icons/lib/md/chevron-right';

class BrowseItem extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render() {
        const { username, title, description, imageurl } = this.props
        return (
            <li className='list-group-item issue'>
                <div className='titleBox'>
                    <p>{title}</p>
                </div>
                <div className='descrBox'>
                    <p>{description}</p>
                </div>
                <div>
                    <Link to={`/profile/${username}`}>
                        <img className='imagePreview' src={imageurl} />
                        <div className='profilePreview'>
                            <span className='smallText'>{username}</span><User />
                        </div>
                    </Link>
                </div>
            </li>
        );
    }
}

export default BrowseItem;