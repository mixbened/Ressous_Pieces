import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './Workspace.css';
import { create } from 'domain';
import Plus from 'react-icons/lib/md/control-point';
import Remove from 'react-icons/lib/go/x';
import Arrow from 'react-icons/lib/ti/arrow-left';
import Logo from '../Logo';
import Delete from 'react-icons/lib/go/settings';
import Descr from 'react-icons/lib/go/book';
import IssueItem from '../Lists/IssueItem';
import ArticleItem from '../Lists/ArticleItem';
import ProjectItem from '../Lists/ProjectItem';
import { bounce, flip } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import Motor from 'react-icons/lib/md/attach-file';
import { updateStats } from '../../ducks/reducer';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    bounce: {
      animationName: flip,
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      textAlign: 'center',
      fontSize: '2em',
      marginTop: '1em',
    }
  })


  function ratio(cf, a, b) {
    if(cf){
        let newUnchecked = a;
        let newChecked = b++;
        return [newUnchecked,newChecked]
    } else {
        let newUnchecked = a++;
        let newChecked = b;
        return [newUnchecked,newChecked]
    }
  }

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
            projects: [],
            descrActive: false,
            loading: true,
            empty: false,
        }
        this.deleteProject = this.deleteProject.bind(this)
        this.deleteIssue = this.deleteIssue.bind(this)
        this.changeCheck = this.changeCheck.bind(this)
        this.deleteArticle = this.deleteArticle.bind(this)
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({workspace_id: id})
        axios.get(`/api/workspace/${id}`).then(data => {
            this.setState({wsTitle: data.data[0].title, wsDescr: data.data[0].description, loading:false})
        })
        axios.get(`/api/issues/${id}`).then(data => {
            this.setState({issues: data.data})
        })
        axios.post(`/api/articles/${id}`, {"type": "workspace_id"}).then(data => {
            this.setState({articles: data.data})
        })
        axios.get(`/api/projects/${id}`).then(data => {
            this.setState({projects: data.data})
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
        console.log('Run function', id)
        axios.delete(`/api/project/${id}/${this.state.workspace_id}`).then(data => {
            this.setState({projects: data.data, title: '', link: ''})
        })
    }

    changeInput(){
        if(this.state.create === 'i'){
            return <div className='creationContainer'>
                <Remove className='icon' onClick={e => this.setState({createMode: !this.state.createMode})}/>
                <input className='input title'  maxlength='30' placeholder='Issue Title' type='text' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className= 'input description' placeholder='Issue Description' type='text' value={this.state.descr} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({descr: e.target.value})}/>
                <button className='btn' onClick={() => this.createIssue()}>Add</button>
            </div>
        } else if(this.state.create === 'a') {
            return <div className='creationContainer'>
                <Remove className='icon' onClick={e => this.setState({createMode: !this.state.createMode})}/>
                <input className='input title' placeholder='Article Title' maxlength='30' type='text' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className='input link' placeholder='Article Link' type='url' value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
                <button className='btn' onClick={() => this.createArticle()}>Add</button>
            </div>
        } else if (this.state.create ==='d'){
            return <div className='creationContainer'>
                <div>Delete Workspace  <button className='btn' onClick={() => this.deleteWorkspace()}>Yes</button>  <button className='btn' onClick={() => this.setState({createMode: !this.state.createMode})}>No</button></div>
            </div> 
        } else {
            return <div className='creationContainer'>
                <Remove className='icon' onClick={e => this.setState({createMode: !this.state.createMode})}/>
                <input className='input title' maxlength='30' placeholder='Project Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className='input link' placeholder='Project Link' type='url' value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
                <button className='btn' onClick={() => this.createProject()}>Add</button>
            </div> 
        }
    }

    deleteWorkspace(){
        axios.delete(`/api/workspace/${this.state.workspace_id}`).then(data => {
            window.location = '/dashboard'
        })
    }

    deleteArticle(id){
        axios.delete(`/api/article/${id}/${this.state.workspace_id}`).then(data => {
            this.setState({articles: data.data, title: '', link: ''})
        })
    }
// a handler for sending the Database the Value of the Checkbox
    changeCheck(id, cf){
        const { updateStats } = this.props
        axios.put(`/api/issues/${id}/${cf}/${this.state.workspace_id}`).then(data => {
            this.setState({issues: data.data})
            updateStats()
        })
    }

// a handler that is checking if every Category is empty
    emptyCheck(){
        if(this.state.articles.length || this.state.projects.length || this.state.issues.length){
        return 'dontShow'
        } else {
        return 'alert alert-warning'
        }
    }

    render() {
        const { wsTitle, wsDescr } = this.state;
        const IssueList = this.state.issues.map((el,i) =>  <IssueItem key={i} title={el.title} issue_id={el.issue_id} description={el.description} check_field={el.check_field} changeCheckFn={this.changeCheck} deleteIssueFn={this.deleteIssue} /> )
        const ArticleList = this.state.articles.map((el,i) =>  <ArticleItem key={i} title={el.title} url={el.url} article_id={el.article_id} origin={el.origin} deleteArticleFn={this.deleteArticle}/> )
        const ProjectsList = this.state.projects.map((el,i)=>  <ProjectItem key={i} title={el.title} url={el.url} project_id={el.projects_id} origin={el.origin} deleteProjectFn={this.deleteProject}/> )
        return (
            <div>
                    <div className='breadcrump'><Link to='/dashboard'><Arrow />dashboard</Link><Delete className='deleteButton' onClick={() => this.setState({createMode: !this.state.createMode, create: 'd'})}/><Descr className='deleteButton' onClick={() => this.setState({descrActive: !this.state.descrActive})}/></div>
                    <div className='heading'>
                        <h2 className='title'>{wsTitle}</h2>
                        <hr/>
                        <h4 className='subtitle'>workspace</h4>
                    </div>
                    <div className={this.state.descrActive ? 'description' : 'description away'}>
                        <p>{wsDescr}</p>
                    </div>
                <div className='mainRow'>
                    <div className='list-group issues list'>
                    <div className='titleContainer'>
                        <h4>topics</h4>
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
                    <div className={this.state.loading ? css(styles.bounce) : 'dontShow'}><Motor /></div>
                    <div className='projects list-group list'>
                        <div className='titleContainer'>
                            <h4>projects</h4>
                            <Plus className='icon' onClick={() => this.setState({createMode: !this.state.createMode, create: 'p'})}/>
                        </div>
                        <ul>
                            {ProjectsList}
                        </ul>
                    </div> 
                    <div className={this.emptyCheck()}>
                        <p>Looks like an empty Space...Use it and create somenthing!</p>
                    </div> 
                <div className={this.state.createMode ? 'creationBar slide' : 'creationBar'}>
                    {this.changeInput()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userStats: state.userStats
    }
}

export default withRouter(connect(mapStateToProps, {updateStats})(Workspace));