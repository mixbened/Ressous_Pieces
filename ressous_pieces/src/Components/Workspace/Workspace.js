import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Workspace.css';
import { create } from 'domain';

class Workspace extends Component {
    constructor(){
        super();
        this.state = {
            createMode: false,
            create: '',
            wsTitle: '',
            wsDescr: '',
            title: '',
            descr: '',
            issues: [],
            link: '',
            articles: [],
            projects: []
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({workspace_id: id})
        axios.get(`/api/workspace/${id}`).then(data => {
            this.setState({wsTitle: data.data[0].title, wsDescr: data.data[0].description})
        })
        axios.get(`/api/issues/${id}`).then(data => {
            this.setState({issues: data.data})
        })
        axios.post(`/api/articles/${id}`, {"type": "workspace_id"}).then(data => {
            this.setState({articles: data.data})
        })
        axios.get(`/api/projects/${id}`).then(data => {
            this.setState({projects: data.data})
            console.log(this.state.projects)
        })
    }

    handleKeyPress(event) {
        if(event.key === 'Enter' && this.state.create === 'i'){
            this.createIssue();
        } else if (event.key === 'Enter' && this.state.create === 'a'){
            this.createArticle();
        } else if(event.key === 'Enter') {
            this.createProject();
        }
      }

    createIssue(){
        const issue = {
            title: this.state.title,
            description: this.state.descr,
            workspace_id: this.state.workspace_id
        }
        console.log(issue)
        axios.post('/api/issue', issue).then( data => {
            this.setState({issues: data.data, title: '', descr: '', createMode: false})
        })
    }

    createArticle(){
        const article = {
            title: this.state.title,
            link: this.state.link,
            workspace_id: this.state.workspace_id
        }
        axios.post('/api/article', article).then( data => {
            this.setState({articles: data.data, title: '', link: '',  createMode: false})
        })
    }

    createProject(){
        const project = {
            title: this.state.title,
            link: this.state.link,
            workspace_id: this.state.workspace_id
        }
        axios.post('/api/project', project).then( data => {
            this.setState({projects: data.data, title: '', link: '', createMode: false})
        })
    }

    deleteIssue(id){
        axios.delete(`/api/issue/${id}/${this.state.workspace_id}`).then(data => {
            console.log(data)
            this.setState({issues: data.data, title: '', description: ''})
        })
    }

    deleteProject(id){
        axios.delete(`/api/project/${id}/${this.state.workspace_id}`).then(data => {
            this.setState({projects: data.data, title: '', link: ''})
        })
    }

    changeInput(){
        if(this.state.create === 'i'){
            return <div className='creationContainer'>
                <button onClick={e => this.setState({createMode: !this.state.createMode})}>X</button>
                <input className='title' placeholder='Issue Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className= 'description' placeholder='Issue Description'  value={this.state.descr} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({descr: e.target.value})}/>
                <button className='btn' onClick={() => this.createIssue()}>Add</button>
            </div>
        } else if(this.state.create === 'a') {

            return <div className='creationContainer'>
                <button onClick={e => this.setState({createMode: !this.state.createMode})}>X</button>
                <input className='title' placeholder='Article Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className='link' placeholder='Article Link' value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
                <button className='btn' onClick={() => this.createArticle()}>Add</button>
            </div>
        } else {
            return <div className='creationContainer'>
            <button onClick={e => this.setState({createMode: !this.state.createMode})}>X</button>
            <input className='title' placeholder='Project Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
            <input className='link' placeholder='Project Link' value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
            <button className='btn' onClick={() => this.createProject()}>Add</button>
            </div> 
        }
    }

    deleteArticle(id){
        axios.delete(`/api/article/${id}/${this.state.workspace_id}`).then(data => {
            this.setState({articles: data.data, title: '', link: ''})
        })
    }

    render() {
        const { wsTitle, wsDescr } = this.state;
        const IssueList = this.state.issues.map((el,i) =>  <div key={i}><h6>{el.title}</h6><p>{el.description}</p><Link to={`/issue/${el.issue_id}`}>Plus</Link><button onClick={() => this.deleteIssue(el.issue_id)}>X</button></div> )
        const ArticleList = this.state.articles.map((el,i)=>  <div key={i}><h6>{el.title}</h6><a>{el.url}</a><button onClick={() => this.deleteArticle(el.article_id)}>X</button></div> )
        const ProjectsList = this.state.projects.map((el,i)=>  <div key={i}><h6>{el.title}</h6><a>{el.url}</a><button onClick={() => this.deleteProject(el.projects_id)}>X</button></div> )
        return (
            <div className='container'>
                    <h2>{wsTitle}</h2>
                <div className='mainRow'>
                    <div className='description list'>
                        <h4>Description</h4>
                        <p>{wsDescr}</p>
                    </div>
                    <div className='list-group issues'>
                        <h4>Issues</h4>
                        {IssueList}
                        <button onClick={() => this.setState({createMode: !this.state.createMode, create: 'i'})}>X</button>
                    </div>
                    <div className='list articles'>
                        <h4>Articles</h4>
                        {ArticleList}
                        <button onClick={() => this.setState({createMode: !this.state.createMode, create: 'a'})}>X</button>
                    </div>
                </div>
                    <div className='projects'>
                        <h4>Projects</h4>
                        {ProjectsList}
                        <button onClick={() => this.setState({createMode: !this.state.createMode, create: 'p'})}>X</button>
                    </div>
                <div className={this.state.createMode ? 'creationBar slide' : 'creationBar'}>
                    {this.changeInput()}
                </div>
            </div>
        );
    }
}

export default Workspace;