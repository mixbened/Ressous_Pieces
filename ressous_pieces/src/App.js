import React, { Component } from 'react';
import './App.css';
import routes from './routes.js';
import Nav from './Components/Nav';
import Sidebar from './Components/Sidebar/Sidebar'

class App extends Component {

checkLogin(){
  console.log(window.location.pathname)
  if(window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/'){
  } else {
    return <div><Sidebar /></div>
  }
}

  render() {
    return (
      <div className='app'>
      <Nav />
      <div className='content'>
        <div className='main'>
          {routes}
        </div>
          {this.checkLogin()}
      </div>
      </div>
    );
  }
}

export default App;
