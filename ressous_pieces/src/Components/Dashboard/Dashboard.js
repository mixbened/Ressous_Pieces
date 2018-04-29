import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import '../Workspace/Workspace.css';
import { Link } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import Add from 'react-icons/lib/md/add';
import Remove from 'react-icons/lib/go/x';

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
        // axios.get(`/api/workspaces/${id}`).then(data => {
        //     this.state.workspaces.forEach(el => {

        //     })
        // })
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
                <Remove className='iconSmall' onClick={e => this.setState({createMode: !this.state.createMode})}/>
                <input className='title' type="text" value={this.state.title} placeholder="title" onChange={e => this.setState({title: e.target.value})}/>
                <input className='description' value={this.state.descr} rows='1' placeholder="description" onChange={e => this.setState({descr: e.target.value})}/>
                <button className="btn btn-primary" onClick={() => this.createSpace()}>Create</button>
            </div>
    }



    render() {
        const workspaceList = this.state.workspaces.map((el,i) => <Link key={i} className='wsPreview' to={`/workspace/${el.workspace_id}`}><div><h3>{el.title}</h3><p>{el.description}</p></div></Link>)
        return (
            <div>
            <div className='heading'>
                <h2 className='title'>dashboard</h2>
                <hr/>
                <h4 className='subtitle'>organize your workspaces here</h4>
            </div>
            <div className='mainContainer'>
                <main>
                    <div className='addButton'>
                        <a onClick={e => this.setState({createMode: !this.state.createMode})}><Add className='centering'/></a>
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