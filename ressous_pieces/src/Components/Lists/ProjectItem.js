import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Remove from 'react-icons/lib/go/x';
import Logo from '../Logo';

class ProjectItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            descr: '',
            id: '',
            check_field: false,
        }
    }

    deleteProjectFn(id){
        console.log('function', id);
        this.props.deleteProjectFn(id);
    }


    render() {
        const { title, url, origin, project_id } = this.props
        console.log('render', project_id)
        return (
            <div>
                <li className='list-group-item'>
                    <div className='infoBox'>
                        <p>{title}</p>
                        <a>{url}</a>
                    </div>
                    <div className='boxBox'>
                        <Remove className='iconSmall' onClick={() => this.deleteProjectFn(project_id)}/>
                        <Logo className='logo' origin={origin}/>
                    </div>
                </li>
            </div>
        );
    }
}

export default ProjectItem;