import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

class Issue extends Component {
    constructor(){
        super();
        this.state = {
            isTitle: '',
            isDescr: '',
            title: '',
            link: '',
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
    }

    handleKeyPress(event) {
        if(event.key === 'Enter'){
            this.createPractice();
        }
      }

    createPractice(){
        const practice = {
            title: this.state.title,
            link: this.state.link,
            issue_id: this.state.issue_id
        }
        axios.post('/api/practices', practice).then( data => {
            this.setState({practices: data.data, title: '', link: ''})
        })
    }

    deletePractice(id){
        axios.delete(`/api/practices/${id}/${this.state.issue_id}`).then(data => {
            console.log(data)
            this.setState({practices: data.data, title: '', description: ''})
        })
    }

    render() {
        const { isTitle, isDescr } = this.state;
        const PracticeList = this.state.practices.map(el =>  <div><h6>{el.title}</h6><a>{el.url}</a><button onClick={() => this.deletePractice(el.practice_id)}>X</button></div> )
        return (
            <div>
                <div className='main'>
                    <h1>{this.state.isTitle}</h1>
                    <p>{this.state.isDescr}</p>
                    <div>
                        <h2>Issues</h2>
                        {PracticeList}
                        <div>
                            <input placeholder='Practice Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                            <input placeholder='Practice Link'  value={this.state.link} onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.setState({link: e.target.value})}/>
                            <button onClick={() => this.createPractice()}>New</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Issue;