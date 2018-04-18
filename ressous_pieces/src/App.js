import React, { Component } from 'react';
import './App.css';
import routes from './routes.js';
import Nav from './Components/Nav';
import Sidebar from './Components/Sidebar/Sidebar'

class App extends Component {

checkLogin(){
  console.log(window.location.pathname)
  if(window.location.pathname === '/login' || window.location.pathname === '/register'){
      <div>{routes}</div>
  } else {
    return <div><Nav /><div className='content'><div className='main'>{routes}</div><div><Sidebar /></div></div></div>
  }
}

  render() {
    return (
      <div className='app'>
        {this.checkLogin()}
        {routes}
      </div>
    );
  }
}

export default App;
