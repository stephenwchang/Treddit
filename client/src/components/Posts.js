import React, { Component } from 'react';
import PostItem from './PostItem';

export class Posts extends Component {
  render() {
      return this.props.posts.map((posts) => (
        <PostItem key={posts.id} id={posts.id} title={posts.title}/>
      ));
  }
}

export default Posts;
