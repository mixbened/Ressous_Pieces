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
                        <div className='titleBox'>
                            <p>{title}</p>
                        </div>
                        <div className='descrBox'>
                            <a href={url}><p>{url}</p></a>
                        </div> 
                    </div>
                    <div className='boxBox'>
                        <div><Remove className='iconSmall' onClick={() => this.deleteProjectFn(project_id)}/></div>
                        <div><Logo className='origin' origin={origin}/></div>
                    </div>
                </li>
            </div>
        );
    }
}

export default ProjectItem;