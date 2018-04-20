import React, { Component } from 'react';
import axios from 'axios';
import './Issue.css';

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
            practices: []
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({issue_id: id})
        console.log(id)
        axios.get(`/api/issue/${id}`).then(data => {
            this.setState({isTitle: data.data[0].title, isDescr: data.data[0].description})
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
                <button onClick={e => this.setState({createMode: !this.state.createMode})}>X</button>
                <input className='title' placeholder='Practice Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className= 'description' placeholder='Practice Link'  value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
                <button className='btn' onClick={() => this.createIssue()}>Add</button>
            </div>
        } else if(this.state.create === 'a') {
            return <div className='creationContainer'>
                <button onClick={e => this.setState({createMode: !this.state.createMode})}>X</button>
                <input className='title' placeholder='Article Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                <input className='link' placeholder='Article Link' value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
                <button className='btn' onClick={() => this.createArticle()}>Add</button>
            </div>
        }
    }   

    render() {
        const { isTitle, isDescr } = this.state;
        const ArticleList = this.state.articles.map((el,i) =>  <div key={i}><h6>{el.title}</h6><a>{el.url}</a><button onClick={() => this.deleteArticle(el.article_id)}>X</button></div> )
        const PracticeList = this.state.practices.map((el,i) =>  <div><h6>{el.title}</h6><a>{el.url}</a><button onClick={() => this.deletePractice(el.practice_id)}>X</button></div> )
        return (
            <div className='container'>
                    <h2>{isTitle}</h2>
                <div className='mainRow'>
                    <div className='description list'>
                        <h4>Description</h4>
                        <p>{isDescr}</p>
                    </div>
                    <div className='list practices'>
                        <h4>Practice Problems</h4>
                        {PracticeList}
                        <button onClick={() => this.setState({createMode: !this.state.createMode, create: 'p'})}>X</button>
                    </div>
                    <div className='list articles'>
                        <h4>Articles</h4>
                        {ArticleList}
                        <button onClick={() => this.setState({createMode: !this.state.createMode, create: 'a'})}>X</button>
                    </div>
                </div>
                <div className={this.state.createMode ? 'creationBar slide' : 'creationBar'}>
                    {this.changeInput()}
                </div>
            </div>
        );
    }
}

export default Issue;