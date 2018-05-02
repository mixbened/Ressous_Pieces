import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Remove from 'react-icons/lib/go/x';
import Check from 'react-icons/lib/fa/check-circle';
import Unchecked from 'react-icons/lib/io/android-radio-button-off';


class IssueItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            descr: '',
            id: '',
            check_field: false,
        }
    }

    deleteIssueFn(id){
        this.props.deleteIssueFn(id);
    }

    changeCheckFn(id, cf){
        this.props.changeCheckFn(id, cf);
    }



    render() {
        const { title, description, issue_id, check_field } = this.props
        return (
            <div>
                <li className='list-group-item issue'>
                        <Link  className='infoBox' to={`/issue/${issue_id}`}>
                            <div className='titleBox'>
                                <p>{title}</p>
                            </div>
                            <div className='descrBox'>
                                <p>{description}</p>
                            </div>
                        </Link>
                    <div className='boxBox'>
                        <Remove className='iconSmall' onClick={() => this.deleteIssueFn(issue_id)}/>
                        <div onClick={() => this.changeCheckFn(issue_id, !check_field)} className={check_field ? 'check' : 'dontShow'}><Check /></div>
                        <div onClick={() => this.changeCheckFn(issue_id, !check_field)} className={check_field ? 'dontShow' : 'check'}><Unchecked /></div>
                    </div>
                </li>
            </div>
        );
    }
}

export default IssueItem;