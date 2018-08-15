import React from 'react';
import axios from 'axios';
import Post from '../post';

class PostArea extends React.Component {
    constructor(props) {
        super(props);
        this.popularPostsUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
        this.state = {
            popularPosts: [],
            renderedPosts: []
        }
    }

    getPostByIdUrl(itemId) {
        return 'https://hacker-news.firebaseio.com/v0/item/'
            + itemId
            + '.json?print=pretty';
    }

    // perform actions before rendering
    componentDidMount() {
        axios.get(this.popularPostsUrl).then(response => {
            this.setState({
                popularPosts: response.data
            });
            let rows = []; // hold first 20 posts
            for (let i = 0; i < 20; i++) {
                let uri = this.getPostByIdUrl(this.state.popularPosts[i]);
                axios.get(uri).then(response => {
                    let data = response.data;
                    rows.push(data);
                    this.setState({
                        renderedPosts: rows
                    });
                });
            }
        });
    }

    getChildren() {
        let children = []; // hold first 20 posts
        for (let i = 0; i < 20; i++) {
            let uri = this.getPostByIdUrl(this.state.popularPosts[i]);
            axios.get(uri).then(response => {
                let data = response.data;
                children.push(data);
            });
        }
        return children;
    }

    render() {
        let posts = this.state.renderedPosts.map(data => {
            return (<Post
                key={data.id}
                id={data.id}
                title={data.title}
                author={data.by}
                score={data.score}
                comments={data.descendants}
            />);
        });
        return (
            <div className='PostArea'>
                {posts}
            </div>
        );
    }
}

export default PostArea;