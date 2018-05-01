import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import '../Workspace/Workspace.css';
import { Link } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import Add from 'react-icons/lib/md/add';
import Remove from 'react-icons/lib/go/x';
import { bounce, flip } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import Motor from 'react-icons/lib/md/attach-file';

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

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            workspaces: [],
            title: '',
            descr: '',
            createMode: false,
            loading: true,
            empty: false
        }
    }


    componentDidMount(){
        axios.get('/api/dashboard/').then(data => {
            if(data.data[0]) {
                this.setState({workspaces: data.data, loading: false})
            } else {
                this.setState({workspaces: data.data, loading: false, empty: true})
            }
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
            this.setState({workspaces: data.data, title: '', descr: '', createMode: false, empty: false})
        })
    }

    changeInput(){
            return <div className='creationContainer'>
                <Remove className='iconSmall' onClick={e => this.setState({createMode: !this.state.createMode})}/>
                <input className='input title' maxlength='30' type="text" value={this.state.title} placeholder="title" onChange={e => this.setState({title: e.target.value})}/>
                <input className='input description' type='text' value={this.state.descr} rows='1' placeholder="description" onChange={e => this.setState({descr: e.target.value})}/>
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
                    <div className={this.state.empty ? 'alert alert-warning' : 'dontShow'}>
                        <p>Looks like an empty Space...Use it and create somenthing!</p>
                    </div>
                    <div className={this.state.loading ? css(styles.bounce) : 'dontShow'}><Motor /></div>
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