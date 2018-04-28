import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Arrow from 'react-icons/lib/ti/arrow-left';

class Browser extends Component {
    constructor(){
        super();
        this.state = {
            issues: [],
            searchVal: ''
        }
    }

    componentDidMount(){
        axios.get('/api/issues/').then(data => {
            this.setState({issues: data.data})
        })
    }
    

    render() {
        const searchVal = this.state.searchVal.toLowerCase();
        const filteredIssues = this.state.issues.filter(el => { 
            if(searchVal === ''){
                return el
            } else {
                return el.title.toLowerCase().includes(this.state.searchVal)
            }
         })
        const issueList = filteredIssues.map( el => {
            return (
                <li className='list-group-item issue'>
                    <p>{el.title}</p>
                    <h6>{el.description}</h6>
                    <Link to={`/profile/${el.username}`}><h6>{el.username}</h6></Link>
                </li>
            )
        });
        return (
            <div>
                <div className='breadcrump'><Link to='/dashboard'><Arrow />dashboard</Link></div>
                <input onChange={el => this.setState({searchVal: el.target.value})} value={this.state.searchVal}/> 
                <h1>All Issues</h1>
                <ul className='issueContainer'>
                    {issueList}
                </ul>
            </div>
        );
    }
}

export default Browser;