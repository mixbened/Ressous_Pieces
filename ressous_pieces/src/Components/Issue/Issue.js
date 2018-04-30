import React, { Component } from 'react';
import axios from 'axios';
import './Issue.css';
import Plus from 'react-icons/lib/md/control-point';
import Remove from 'react-icons/lib/go/x';
import Arrow from 'react-icons/lib/ti/arrow-left';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/mysql';
import 'brace/mode/css';
import 'brace/mode/python';
import 'brace/mode/html';
import 'brace/theme/textmate';
import { Prompt } from 'react-router';
import Descr from 'react-icons/lib/go/book';
import ArticleItem from '../Lists/ArticleItem';

class Issue extends Component {
    constructor(){
        super();
        this.state = {
            createMode: false,
            create: '',
            isTitle: '',
            isDescr: '',
            descr: '',
            title: '',
            link: '',
            articles: [],
            practices: [],
            editorMode: 'javascript',
            editorValue: '',
            descrActive: false
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({issue_id: id})
        console.log(id)
        axios.get(`/api/issue/${id}`).then(data => {
            this.setState({isTitle: data.data[0].title, isDescr: data.data[0].description, workspace_id: data.data[0].workspace_id, editorValue: data.data[0].editor, editorMode: data.data[0].editormode})
            console.log(this.state)
        })
        axios.get(`/api/practices/${id}`).then(data => {
            this.setState({practices: data.data})
        })
        axios.get(`/api/articles/${id}`).then(data => {
            this.setState({articles: data.data})
        })
    }

    handleKeyPress(event) {
        if(event.key === 'Enter' && this.state.create === 'p'){
            this.createPractice();
        } else if (event.key === 'Enter' && this.state.create === 'a'){
            this.createArticle();
      }
    }

    createPractice(){
        const practice = {
            title: this.state.title,
            link: this.state.link,
            issue_id: this.state.issue_id
        }
        axios.post('/api/practices', practice).then( data => {
            this.setState({practices: data.data, title: '', link: '', createMode: false})
        })
    }

    deletePractice(id){
        axios.delete(`/api/practices/${id}/${this.state.issue_id}`).then(data => {
            console.log(data)
            this.setState({practices: data.data, title: '', description: '', createMode: false})
        })
    }

    createArticle(){
        const article = {
            title: this.state.title,
            link: this.state.link,
            issue_id: this.state.issue_id
        }
        axios.post('/api/articleis', article).then( data => {
            console.log(data)
            this.setState({articles: data.data, title: '', link: '', createMode: false})
        })
    }

    deleteArticle(id){
        axios.delete(`/api/articleis/${id}/${this.state.issue_id}`).then(data => {
            this.setState({articles: data.data, title: '', link: ''})
        })
    }

    changeInput(){
        if(this.state.create === 'p'){
            return <div className='creationContainer'>
                <Remove className='icon' onClick={e => this.setState({createMode: !this.state.createMode})}/>
                <input className='input title' placeholder='Practice Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className= 'description input' placeholder='Practice Link'  value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
                <button className='btn' onClick={() => this.createIssue()}>Add</button>
            </div>
        } else if(this.state.create === 'a') {
            return <div className='creationContainer'>
                <Remove className='icon' onClick={e => this.setState({createMode: !this.state.createMode})}/>
                <input className='title input' placeholder='Article Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className='link input' placeholder='Article Link' value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
                <button className='btn' onClick={() => this.createArticle()}>Add</button>
            </div>
        }
    }   

    updateEditorValue(){
        axios.post(`/api/issue/${this.state.issue_id}`, {newInput: this.state.editorValue, editormode: this.state.editorMode}).then( data => {
            console.log('Updated the Input')
        })
    }

    render() {
        const { isTitle, isDescr } = this.state;
        const ArticleList = this.state.articles.map((el,i) =>  <ArticleItem key={i} title={el.title} url={el.url} article_id={el.article_id} origin={el.origin} deleteArticleFn={this.deleteArticle}/> )
        const PracticeList = this.state.practices.map((el,i) =>  <li  className='list-group-item' key={i}><h6>{el.title}</h6><a>{el.url}</a><Logo className='logo' origin={el.origin}/><Remove className='iconSmall' onClick={() => this.deletePractice(el.practice_id)}/></li> )
        return (
            <div>
            <Prompt message={e => {
                this.updateEditorValue() ? 'You are leaving the Page' : ''
            }}/>
                    <div className='breadcrump'><Link to='/dashboard'><Arrow />dashboard</Link> / <Link to={`/workspace/${this.state.workspace_id}`} className='breadcrump'>workspace</Link><Descr className='deleteButton' onClick={() => this.setState({descrActive: !this.state.descrActive})}/></div>
                <div className='heading'>
                    <h2 className='title'>{isTitle}</h2>
                    <hr/>
                    <h4 className='subtitle'>Issue</h4>
                </div>
                <div className='mainRow'>
                    <div className={this.state.descrActive ? 'description' : 'description away'}>
                        <p>{isDescr}</p>
                    </div>
                    <div className='list practices list-group'>
                        <div className='titleContainer'>
                            <h4>Practice Problems</h4>
                            <Plus className='icon' onClick={() => this.setState({createMode: !this.state.createMode, create: 'p'})}/>
                        </div>
                        <ul>
                            {PracticeList}
                        </ul>
                    </div>
                    <div className='list articles list-group'>
                    <div className='titleContainer'>
                        <h4>Articles</h4>
                        <Plus className='icon' onClick={() => this.setState({createMode: !this.state.createMode, create: 'a'})}/>
                    </div>
                        <ul>
                            {ArticleList}
                        </ul>
                    </div>
                </div>
                <div className='editorContainer'>
                    <h3>Notepad</h3>
                    <select value={this.state.editorMode} onChange={e => this.setState({editorMode: e.target.value})}>
                        <option value="javascript">Javascript</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="mysql">MySQL</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                    </select>
                    <AceEditor
                    mode={this.state.editorMode}
                    theme="textmate"
                    width='100%'
                    height='300px'
                    name="editor"
                    fontSize={14}
                    onChange={e => this.setState({editorValue: e})}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={this.state.editorValue || ''}
                    setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true
                    }}/>
                </div>
                <div className={this.state.createMode ? 'creationBar slide' : 'creationBar'}>
                    {this.changeInput()}
                </div>
            </div>
        );
    }
}

export default Issue;