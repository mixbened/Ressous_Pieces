import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Workspace extends Component {
    constructor(){
        super();
        this.state = {
            wsTitle: '',
            wsDescr: '',
            title: '',
            descr: '',
            issues: []
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({workspace_id: id})
        console.log(id)
        axios.get(`/api/workspace/${id}`).then(data => {
            console.log(data.data)
            this.setState({wsTitle: data.data[0].title, wsDescr: data.data[0].description})
            console.log(this.state)
        })
        axios.get(`/api/issues/${id}`).then(data => {
            this.setState({issues: data.data})
        })
    }

    creatIssue(){
        const issue = {
            title: this.state.title,
            description: this.state.descr,
            workspace_id: this.state.workspace_id
        }
        console.log(issue)
        axios.post('/api/issue', issue).then( data => {
            this.setState({issues: data.data, title: '', description: ''})
        })
    }

    deleteIssue(id){
        axios.delete(`/api/issue/${id}`).then(data => {
            this.setState({issues: data.data, title: '', description: ''})
        })
    }

    render() {
        const { wsTitle, wsDescr } = this.state;
        const IssueList = this.state.issues.map(el =>  <div><h6>{el.title}</h6><p>{el.description}</p><Link to={`/issue/${el.issue_id}`}>Plus</Link><button onClick={() => this.deleteIssue(el.issue_id)}>X</button></div> )
        return (
            <div className='container'>
                <div>
                    <h3>{wsTitle}</h3>
                    <p>{wsDescr}</p>
                </div>
                <div>
                    <h2>Issues</h2>
                    {IssueList}
                    <div>
                        <input placeholder='Issue Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                        <textarea placeholder='Issue Description'  value={this.state.descr} onChange={e => this.setState({descr: e.target.value})}/>
                        <button onClick={e => this.creatIssue()}>New</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Workspace;