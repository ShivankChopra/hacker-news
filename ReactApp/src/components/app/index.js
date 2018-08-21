import React from 'react';
import News from '../news/';
import Login from '../login/';
import Signup from '../signup/';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogin() {

    }

    handleSignup() {

    }

    handleFetchData() {

    }

    handleUpvote() {

    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact strict path='/' component={News} />
                    <Route exact strict path='/login' component={Login} />
                    <Route exact strict path='/signup' component={Signup} />
                </div>
            </Router>
        );
    }
}

export default App;