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
      sidebar: false
    }
  }

componentDidMount(){
  console.log(window.location.pathname)
  if(window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/'){
  } else {
    this.setState({sidebar: true})
  }
}

activateSidebar(){
  this.setState({sidebar: true})
}

  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='main'>
          <div className='content container'>
          {routes}
          </div>
          <div className={this.state.sidebar ? 'side' : ''}>
          {this.state.sidebar ? <Sidebar /> : <div></div> }
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
