import React, { Component } from 'react';

import axios from 'axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const newpost = response.data.slice(0, 4);
                const updatedpost = newpost.map(post => {
                    return {
                        ...post,
                        author: 'John'
                    }
                })
                this.setState({ posts: updatedpost })
                console.log(updatedpost)
            })
            .catch(error => {
                console.log("Error on get Request")
                this.setState({error: true})
            })

    }

    handlepostclick(id) {
        this.setState({ selectedPostId: id})
    }

    render() {

        let posts = <p>An Error has occured </p>
        if (!this.state.error) {
                posts = this.state.posts.map(post => {
                return <Post
                    click={() => this.handlepostclick(post.id)}
                    key={post.id}
                    author={post.author}
                    title={post.title} />
            })
        }

        

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;