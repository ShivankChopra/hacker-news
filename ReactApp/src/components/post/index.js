import React from 'react';
import './index.css';
import axios from 'axios';

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            score: this.props.score
        }
    }

    getUrlById(itemId) {
        return 'https://hacker-news.firebaseio.com/v0/item/'
            + itemId
            + '.json?print=pretty';
    }

    clickHandler(){
        /*let val = this.state.score + 1;
        this.setState({
            score: val
        });*/
        let uri = this.getUrlById(this.props.id);
        axios.get(uri).then(response => {
            this.setState({
                score: response.data.score
            });
        });
    }

    render(){
        return (
            <div className='Post'>
                <h3>{this.props.title}</h3>
                <h4>By {this.props.author}</h4>
                <h4>PostId {this.props.id}</h4>
                <p>Score: {this.state.score} Comments: {this.props.comments}</p>
                <button onClick = {() => this.clickHandler()}>upvote!</button>
            </div>
        );
    }
}

export default Post;