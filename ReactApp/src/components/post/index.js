import React from 'react';
import './index.css';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.score
        }
    }

    getPostUri(itemId) {
        return 'https://hacker-news.firebaseio.com/v0/item/'
            + itemId
            + '.json?print=pretty';
    }

    getUpvoteUri(itemId) {
        return 'http://localhost:3001/hackernews/api/upvote/' + itemId;
    }

    handleUpvote() {
        let postUri = this.getPostUri(this.props.id);
        let upvoteUri = this.getUpvoteUri(this.props.id);

        // request for refreshed score and score maintained by local server
        axios.get(postUri).then(response => {
            let scoreFromserver = response.data.score;
            axios.post(upvoteUri).then(res => {
                let scoreFromLocal = res.data.score;
                this.setState({
                    score: scoreFromLocal + scoreFromserver
                });
            }).catch(err => console.log(err));
        });
    }

    render() {
        return (
            <div className='Post'>
                <h3>{this.props.title}</h3>
                <h4>By {this.props.author}</h4>
                <h4>PostId {this.props.id}</h4>
                <p>Score: {this.state.score} Comments: {this.props.comments}</p>
                <button onClick={() => this.handleUpvote()}>upvote!</button>
            </div>
        );
    }
}

export default Post;