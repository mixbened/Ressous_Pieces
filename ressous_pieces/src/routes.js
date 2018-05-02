import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Workspace from './Components/Workspace/Workspace';
import Issue from './Components/Issue/Issue';
import Home from './Components/Home/Home';
import Browser from './Components/Browser/Browser';
import Chart from './Components/Profile/Chart';
import Profile from './Components/Profile/Profile';
import DataPrivacy from './Components/DataPrivacy';
import Impressum from './Components/Impressum';

const routes = 
<div>
    <Switch>
        <Route path='/login' component={ Login } />
        <Route path='/register' component={ Register } />
        <Route path='/dashboard' component={ Dashboard } />
        <Route path='/workspace/:id' component={ Workspace } />
        <Route path='/issue/:id' component={ Issue } />
        <Route path='/browser' component={ Browser } />
        <Route path='/chart' component={ Chart } />
        <Route path='/profile/:id' component={ Profile } />
        <Route path='/privacy' component={ DataPrivacy } />
        <Route path='/impressum' component={ Impressum } />
        <Route path='/' component={ Home } />
    </Switch>
</div>


export default routes;