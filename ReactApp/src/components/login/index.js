import React from 'react';
import Header from '../header';
import './index.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            redirect: false
        }
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSuccess(message) {
        alert(message);
        this.setState({redirect: true});
    }

    handleFaliure(message) {
        alert(message)
    }

    handleSubmit(event) {
        axios.post('http://localhost:3001/users/login', this.state)
            .then(response => {
                if (response.data.success)
                    this.handleSuccess(JSON.stringify(response.data));
                else
                    this.handleFaliure(response.data.message);
            }).catch(err => console.log(err));
        event.preventDefault();
    }

    render() {
        if (this.state.redirect)
            return <Redirect to="/" />;
        else
            return (
                <div>
                    <Header />
                    <div className='login'>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <label>Name</label><br />
                            <input
                                type='text'
                                value={this.state.name}
                                onChange={this.handleNameChange.bind(this)} /><br /><br />

                            <label>Password</label><br />
                            <input
                                type='password'
                                value={this.state.password}
                                onChange={this.handlePasswordChange.bind(this)} /><br /><br />

                            <input type='submit' value='login' />
                        </form>
                    </div>
                </div>
            );
    }
}

export default Login;