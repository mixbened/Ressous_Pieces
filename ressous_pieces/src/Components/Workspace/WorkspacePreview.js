import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ArticleItem from '../Lists/ArticleItem';
import IssueItem from '../Lists/IssueItem';
import ProjectItem from '../Lists/ProjectItem';
import Motor from 'react-icons/lib/md/attach-file';
import Plus from 'react-icons/lib/md/control-point';
import Remove from 'react-icons/lib/go/x';
import Arrow from 'react-icons/lib/ti/arrow-left';
import Logo from '../Logo';
import Delete from 'react-icons/lib/go/settings';
import Descr from 'react-icons/lib/go/book';
import { bounce, flip } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';


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

class WorkspacePreview extends Component {
    constructor(props){
        super(props);
        this.state = {
            wsTitle: '',
            wsDescr: '',
            articles: [],
            issues: [],
            projects: []
        }
    }


    componentDidMount(){
        const id = this.props.workspace_id;
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

    emptyCheck(){
        if(this.state.articles.length || this.state.projects.length || this.state.issues.length){
        return 'dontShow'
        } else {
        return 'alert alert-warning'
        }
    }


                render() {
        const { wsTitle, wsDescr } = this.state;
        const IssueList = this.state.issues.map((el,i) =>  <IssueItem key={i} title={el.title} issue_id={el.issue_id} description={el.description} check_field={el.check_field} /> )
        const ArticleList = this.state.articles.map((el,i) =>  <ArticleItem key={i} title={el.title} url={el.url} article_id={el.article_id} origin={el.origin}/> )
        const ProjectsList = this.state.projects.map((el,i)=>  <ProjectItem key={i} title={el.title} url={el.url} project_id={el.projects_id} origin={el.origin}/> )
        return (
            <div className='previewContainer'>
                    <div className='breadcrump'><Link to='/dashboard'><Arrow />dashboard</Link><Delete className='deleteButton' /><Descr className='deleteButton'/></div>
                    <div className='heading'>
                        <h2 className='title'>{wsTitle}</h2>
                        <hr/>
                        <h4 className='subtitle'>workspace</h4>
                    </div>
                    <div className='description away'>
                        <p>{wsDescr}</p>
                    </div>
                <div className='mainRow'>
                    <div className='list-group issues list'>
                    <div className='titleContainer'>
                        <h4>issues</h4>
                        <Plus className='icon'/>
                    </div>
                        <ul>
                            {IssueList}
                        </ul>
                    </div>
                    <div className='list-group articles list'>
                    <div className='titleContainer'>
                        <h4>articles</h4>
                        <Plus className='icon'/>
                    </div>
                        <ul>
                            {ArticleList}
                        </ul>
                    </div>
                </div>
                    <div className='projects list-group list'>
                        <div className='titleContainer'>
                            <h4>projects</h4>
                            <Plus className='icon'/>
                        </div>
                        <ul>
                            {ProjectsList}
                        </ul>
                    </div> 
                    <div className={this.emptyCheck()}>
                        <p>Looks like an empty Space...Use it and create somenthing!</p>
                    </div>
            </div>
        );
    }
}

export default WorkspacePreview;