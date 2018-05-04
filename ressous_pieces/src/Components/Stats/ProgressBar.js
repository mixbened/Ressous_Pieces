import React, { Component } from 'react';
import axios from 'axios';
import './stats.css'

class ProgressBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            ratio: []
        }
    }

    componentDidMount(){
        axios.get(`/api/stats/${this.props.workspace_id}`).then(response => {
            this.setState({ratio: response.data.correct/(response.data.correct+response.data.incorrect)})
        })
    }

    colorChecker(){
        const { ratio } = this.state;
        if(ratio >= 0.8){
            return 'rgb(88, 100, 29)'
        } else if (ratio >= 0.5) {
            return 'rgb(123, 144, 75)'
        } else {
            return 'rgb(121, 201, 158)'
        }
    }

    render() {
        const { ratio } = this.state;
        return (
            <div className='progressBar' style={{width: `${ratio*100}%`, background: this.colorChecker()}}></div>
        );
    }
}

export default ProgressBar;