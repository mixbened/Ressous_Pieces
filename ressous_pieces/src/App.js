import React, { Component } from 'react';
import './App.css';
import routes from './routes.js';
import Nav from './Components/Nav';
import Sidebar from './Components/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

// checks if User is Logged in and sidebar should be rendered
componentDidMount(){
  if(window.location.pathname === '/login' || window.location.pathname === '/register'){
  } else {
    this.setState({sidebar: true})
  }
}

  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='main'>
          <div className={window.location.pathname === '/' ? '' : 'content'}>
          {routes}
          </div>
          <div className={window.location.pathname === '/login' || window.location.pathname === '/register' ? '' : 'side'}>
            {window.location.pathname === '/login' || window.location.pathname === '/register' ?  <div></div> : <Sidebar /> }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}



export default withRouter(connect(mapStateToProps)(App));
