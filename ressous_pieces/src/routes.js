import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Workspace from './Components/Workspace/Workspace';
import Issue from './Components/Issue/Issue';
import Home from './Components/Home';
import Browser from './Components/Browser/Browser';

const routes = 
<div>
    <Switch>
        <Route path='/login' component={ Login } />
        <Route path='/register' component={ Register } />
        <Route path='/dashboard' component={ Dashboard } />
        <Route path='/workspace/:id' component={ Workspace } />
        <Route path='/issue/:id' component={ Issue } />
        <Route path='/browser' component={ Browser } />
        <Route path='/' component={ Home } />
    </Switch>
</div>


export default routes;