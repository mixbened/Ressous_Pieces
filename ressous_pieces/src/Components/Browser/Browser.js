import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Arrow from 'react-icons/lib/ti/arrow-left';
import { bounce, flip } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import Motor from 'react-icons/lib/md/attach-file';
import BrowseItem from '../Lists/BrowseItem';
import Search from 'react-icons/lib/fa/search';


const styles = StyleSheet.create({
  bounce: {
    animationName: flip,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    textAlign: 'center',
    fontSize: '2em',
    marginTop: '1em'
  }
})

class Browser extends Component {
    constructor(){
        super();
        this.state = {
            issues: [],
            workspaces: [],
            searchVal: '',
            showIssues: false,
            loading: true,
        }
    }

    componentDidMount(){
        axios.get('/api/issues/').then(data => {
            this.setState({issues: data.data, loading: false})
        })
        axios.get('/api/allWorkspaces/').then(data => {
            this.setState({workspaces: data.data, loading: false})
        })
    }
    

    render() {

        // get Search Value
        const searchVal = this.state.searchVal.toLowerCase();

        // create filtered Issues
        const filteredIssues = this.state.issues.filter(el => { 
            if(searchVal === ''){
                return el
            } else {
                return el.title.toLowerCase().includes(this.state.searchVal)
            }
         })

        // create Issue JSX
        const issueList = filteredIssues.map( el => {
            return (
                <BrowseItem title={el.title} description={el.description} username={el.username} imageurl={el.imageurl}/>
            )
        });

        // created filtered Workspace List
        const filteredWorkspaces = this.state.workspaces.filter(el => { 
            if(searchVal === ''){
                return el
            } else {
                return el.title.toLowerCase().includes(this.state.searchVal)
            }
         })

        // create Workspace JSX
        const workspaceList = filteredWorkspaces.map( el => {
            return (
                <BrowseItem title={el.title} description={el.description} username={el.username} imageurl={el.imageurl}/>
            )
        });

        // render JSX
        return (
            <div>
                <div className='breadcrump'><Link to='/dashboard'><Arrow />dashboard</Link></div>
                <div className='heading'>
                    <h2 className='title'>browser</h2>
                    <hr/>
                    <h4 className='subtitle'>find issues and workspaces for your personal development</h4>
                </div>
                <div className='btn-group' role='group'><div><button type='button' className={this.state.showIssues ? 'button border-right' : 'active button border-right'} onClick={() => this.setState({showIssues: false})}>Workspaces</button><button type='button' onClick={() => this.setState({showIssues: true})} className={this.state.showIssues ? 'active button border-left' : 'button border-left'}>Topics</button></div></div>
                <div className={this.state.showIssues ? 'listContainer' : 'notShow listContainer'}>
                <div className='browserHeading'>
                        <h3>Topics</h3>
                        <div className='inputWithIcon'>
                            <input placeholder='Search' className='input' type='text' onChange={el => this.setState({searchVal: el.target.value})} value={this.state.searchVal}/>
                            <Search className='iconElement' />
                        </div>
                        </div>
                        <hr />
                        <ul className='issueContainer'>
                        <div className={this.state.loading ? css(styles.bounce) : 'dontShow'}><Motor /></div>
                            {issueList}
                        </ul>
                </div>
                <div className={this.state.showIssues ? 'notShow listContainer' : 'listContainer'}>
                    <div className='browserHeading'>
                        <h3>Workspaces</h3>
                        <div className='inputWithIcon'>
                            <input placeholder='Search' className='input' type='text' onChange={el => this.setState({searchVal: el.target.value})} value={this.state.searchVal}/>
                            <Search className='iconElement' />
                        </div>
                    </div>
                        <hr />
                        <ul className='issueContainer'>
                        <div className={this.state.loading ? css(styles.bounce) : 'dontShow'}><Motor /></div>
                            {workspaceList}
                        </ul>
                </div>
            </div>
        );
    }
}

export default Browser;