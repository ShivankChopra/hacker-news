import React from 'react';
import Header from '../header';
import PostArea from '../postArea';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn
        }
    }

    render() {
        return (
            <div className='App'>
                <Header />
                <PostArea />
            </div>
        );
    }
}

export default App;