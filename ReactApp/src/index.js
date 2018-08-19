import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/';
import Login from './components/login/';
import Signup from './components/signup/';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function BaseComponent(props) {
    return (
        <Router>
            <div>
                <Route exact strict path='/' component={App} />
                <Route exact strict path='/login' component={Login} />
                <Route exact strict path='/signup' component={Signup} />
            </div>
        </Router>
    );
}

ReactDom.render(<BaseComponent />, document.getElementById('root'));