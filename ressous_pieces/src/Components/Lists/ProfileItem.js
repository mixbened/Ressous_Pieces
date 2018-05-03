import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fork from 'react-icons/lib/fa/code-fork';

class BrowseItem extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    fork(){
        const { issue_id, workspace_id } = this.props;
        if(issue_id){
            this.props.forkIssue(issue_id)
        } else {
            this.props.forkSpace(workspace_id)
        }
    }


    render() {
        const { username, title, description, issue_id, workspace_id } = this.props
        return (
            <li className='list-group-item issue'>
                <div className='titleBox'>
                    <p>{title}</p>
                </div>
                <div className='descrBox'>
                    <p>{description}</p>
                </div>
                <button onClick={() => this.fork()}className='btn'>
                   <Fork /> 
                </button>
            </li>
        );
    }
}

export default BrowseItem;