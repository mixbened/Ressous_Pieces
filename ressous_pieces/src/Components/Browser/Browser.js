import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Arrow from 'react-icons/lib/ti/arrow-left';

class Browser extends Component {
    constructor(){
        super();
        this.state = {
            issues: [],
            workspaces: [],
            searchVal: '',
            showIssues: false
        }
    }

    componentDidMount(){
        axios.get('/api/issues/').then(data => {
            this.setState({issues: data.data})
        })
        axios.get('/api/allWorkspaces/').then(data => {
            this.setState({workspaces: data.data})
        })
    }
    

    render() {

        // get Search Value
        const searchVal = this.state.searchVal.toLowerCase();

        // create filtered Issues
        const filteredIssues = this.state.issues.filter(el => { 
            if(searchVal === ''){
                return el
            } else {
                return el.title.toLowerCase().includes(this.state.searchVal)
            }
         })

        // create Issue JSX
        const issueList = filteredIssues.map( el => {
            return (
                <li className='list-group-item issue'>
                    <p>{el.title}</p>
                    <h6>{el.description}</h6>
                    <Link to={`/profile/${el.username}`}><h6>{el.username}</h6></Link>
                </li>
            )
        });

        // created filtered Workspace List
        const filteredWorkspaces = this.state.workspaces.filter(el => { 
            if(searchVal === ''){
                return el
            } else {
                return el.title.toLowerCase().includes(this.state.searchVal)
            }
         })

        // create Workspace JSX
        const workspaceList = filteredWorkspaces.map( el => {
            return (
                <li className='list-group-item issue'>
                    <p>{el.title}</p>
                    <h6>{el.description}</h6>
                    <Link to={`/profile/${el.username}`}><h6>{el.username}</h6></Link>
                </li>
            )
        });

        // render JSX
        return (
            <div>
                <div className='breadcrump'><Link to='/dashboard'><Arrow />dashboard</Link></div>
                <div className='heading'>
                    <h2 className='title'>browser</h2>
                    <hr/>
                    <h4 className='subtitle'>find issues and workspaces for your personal development</h4>
                </div>
                <input onChange={el => this.setState({searchVal: el.target.value})} value={this.state.searchVal}/> 
                <button onClick={() => this.setState({showIssues: !this.state.showIssues})}>Toggle</button>
                <div className={this.state.showIssues ? 'listContainer' : 'notShow listContainer'}>
                    <table class='table'>
                        <thead>
                            <tr>
                                <th scope='col'>issues</th>
                            </tr>
                        </thead>
                        <ul className='issueContainer'>
                            {issueList}
                        </ul>
                    </table>
                </div>
                <div className={this.state.showIssues ? 'notShow listContainer' : 'listContainer'}>
                    <table class='table'>
                        <thead>
                            <tr>
                                <th scope='col'>workspaces</th>
                            </tr>
                        </thead>
                        <ul className='issueContainer'>
                            {workspaceList}
                        </ul>
                    </table>
                </div>
            </div>
        );
    }
}

export default Browser;