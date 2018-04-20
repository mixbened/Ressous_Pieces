import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import '../Workspace/Workspace.css';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            workspaces: [],
            title: '',
            descr: '',
            createMode: false
        }
    }

    componentDidMount(){
        axios.get('/api/dashboard/').then(data => {
            this.setState({workspaces: data.data})
        })
    }

    createSpace(){
        const { title, descr } = this.state;
        const workspace = {
            title,
            descr,
        }
        console.log(workspace);
        axios.post('/api/workspace', workspace).then(data => {
            console.log(data)
            this.setState({workspaces: data.data, title: '', descr: '', createMode: false})
        })
    }

    changeInput(){
            return <div className='creationContainer'>
                <button onClick={e => this.setState({createMode: !this.state.createMode})}>X</button>
                <input className='title' type="text" value={this.state.title} placeholder="title" onChange={e => this.setState({title: e.target.value})}/>
                <input className='description' value={this.state.descr} rows='1' placeholder="description" onChange={e => this.setState({descr: e.target.value})}/>
                <button className="btn btn-primary" onClick={() => this.createSpace()}>Create</button>
            </div>
    }



    render() {
        const workspaceList = this.state.workspaces.map((el,i) => <div key={i} className='wsPreview'><h2>{el.title}</h2><p>{el.description}</p><Link to={`/workspace/${el.workspace_id}`}>Plus</Link></div>)
        return (
            <div className='mainContainer'>
            <div className='container'>
                <main className='row'>
                    <div>
                        <button onClick={e => this.setState({createMode: !this.state.createMode})}>New</button>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </div>
                    <div className='wsContainer'>
                        {workspaceList}
                    </div>
                </main>
                <div className={this.state.createMode ? 'creationBar slide' : 'creationBar'}>
                    {this.changeInput()}
                </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;