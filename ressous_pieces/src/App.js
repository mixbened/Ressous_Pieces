import React, { Component } from 'react';
import './App.css';
import routes from './routes.js';
import Nav from './Components/Nav';
import Sidebar from './Components/Sidebar/Sidebar';
import Router from './Router';

class App extends Component {
  constructor(){
    super();
    this.state = {
      sidebar: false
    }
  }

checkLogin(){
  console.log(window.location.pathname)
  if(window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/'){
  } else {
    this.activateSidebar();
    return <Sidebar />
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
          <div className='content'>
          {routes}
          </div>
          <div className={this.state.sidebar ? 'side' : ''}>
          {this.checkLogin()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
