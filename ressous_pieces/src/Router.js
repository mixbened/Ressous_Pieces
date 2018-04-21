import React, { Component } from 'react';
import routes from './routes';

class Router extends Component {
    render() {
        return (
            <div>
                {routes}
            </div>
        );
    }
}

export default Router;