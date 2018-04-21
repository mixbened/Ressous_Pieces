import React, { Component } from 'react';
import axios from 'axios';

class Browser extends Component {
    constructor(){
        super();
        this.state = {
            issues: []
        }
    }

    componentDidMount(){
        axios.get('/api/issues/').then(data => {
            this.setState({issues: data.data})
        })
    }
    

    render() {
        const issueList = this.state.issues.map( el => <li className='list-group-item issue'><p>{el.title}</p><h6>{el.description}</h6></li>)
        return (
            <div>
                <ul className='issueContainer'>
                    {issueList}
                </ul>
            </div>
        );
    }
}

export default Browser;