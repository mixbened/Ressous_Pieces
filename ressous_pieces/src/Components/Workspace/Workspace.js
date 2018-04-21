import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Workspace.css';
import { create } from 'domain';
import Plus from 'react-icons/lib/md/control-point';
import Remove from 'react-icons/lib/go/x';
import Arrow from 'react-icons/lib/ti/arrow-left';
import Logo from '../Logo';




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

    changeCheck(id, cf){
        console.log(cf)
        axios.put(`/api/issues/${id}/${cf}/${this.state.workspace_id}`).then(data => {
            this.setState({issues: data.data})
        })
    }

    render() {
        const { wsTitle, wsDescr } = this.state;
        const IssueList = this.state.issues.map((el,i) =>  <li className='list-group-item issue' key={i}><div className='infoBox'><Link to={`/issue/${el.issue_id}`}><p>{el.title}</p><p>{el.description}</p></Link></div><div className='boxBox'><Remove className='iconSmall' onClick={() => this.deleteIssue(el.issue_id)}/><input value={el.check_field} onChange={() => this.changeCheck(el.issue_id, !el.check_field)} type='checkbox' className='checkbox'/></div></li> )
        const ArticleList = this.state.articles.map((el,i)=>  <li className='list-group-item' key={i}><div className='infoBox'><p>{el.title}</p><a>{el.url}</a></div><div><div className='boxBox'><Remove className='iconSmall' onClick={() => this.deleteArticle(el.article_id)}/></div><Logo className='logo' origin={el.origin}/></div></li> )
        const ProjectsList = this.state.projects.map((el,i)=>  <li className='list-group-item' key={i}><div className='infoBox'><p>{el.title}</p><a>{el.url}</a></div><div className='boxBox'><Remove className='iconSmall' onClick={() => this.deleteProject(el.projects_id)}/><Logo className='logo' origin={el.origin}/></div></li> )
        return (
            <div>
                    <div className='breadcrump'><Link to='/dashboard'><Arrow />dashboard</Link></div>
                    <h2>{wsTitle}</h2>
                <div className='mainRow'>
                    <div className='description list'>
                        <h4>description</h4>
                        <p>{wsDescr}</p>
                    </div>
                    <div className='list-group issues list'>
                    <div className='titleContainer'>
                        <h4>issues</h4>
                        <Plus className='icon' onClick={() => this.setState({createMode: !this.state.createMode, create: 'i'})}/>
                    </div>
                        <ul>
                            {IssueList}
                        </ul>
                    </div>
                    <div className='list-group articles list'>
                    <div className='titleContainer'>
                        <h4>articles</h4>
                        <Plus className='icon' onClick={() => this.setState({createMode: !this.state.createMode, create: 'a'})}/>
                    </div>
                        <ul>
                            {ArticleList}
                        </ul>
                    </div>
                </div>
                    <div className='projects list-group list'>
                        <div className='titleContainer'>
                            <h4>projects</h4>
                            <Plus className='icon' onClick={() => this.setState({createMode: !this.state.createMode, create: 'p'})}/>
                        </div>
                        <ul>
                            {ProjectsList}
                        </ul>
                    </div>
                <div className={this.state.createMode ? 'creationBar slide' : 'creationBar'}>
                    {this.changeInput()}
                </div>
            </div>
        );
    }
}

export default Workspace;