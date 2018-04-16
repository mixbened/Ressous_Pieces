import React, { Component } from 'react';
import './App.css';
import routes from './routes.js';
import Nav from './Components/Nav';

class App extends Component {

checkLogin(){
  console.log(window.location.pathname)
  if(window.location.pathname === '/login'){
    console.log('Check failed')
  } else {
    return <Nav />
  }
}

  render() {
    return (
      <div>
        {this.checkLogin()}
        {routes}
      </div>
    );
  }
}

export default App;
