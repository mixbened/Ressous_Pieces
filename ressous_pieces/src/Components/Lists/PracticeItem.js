import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Remove from 'react-icons/lib/go/x';
import Logo from '../Logo';

class PracticeItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            descr: '',
            id: '',
            check_field: false,
        }
    }

    deletePracticeFn(id){
        this.props.deletePracticeFn(id);
    }


    render() {
        const { title, url, origin, practice_id } = this.props
        return (
            <div>
                <li className='list-group-item'>
                    <div className='infoBox'>
                        <p>{title}</p>
                        <a>{url}</a>
                    </div>
                    <div className='boxBox'>
                        <Remove className='iconSmall' onClick={() => this.deleteProjectFn(practice_id)}/>
                        <Logo className='logo' origin={origin}/>
                    </div>
                </li>
            </div>
        );
    }
}

export default PracticeItem;