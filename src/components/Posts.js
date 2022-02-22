import React, { Component } from 'react';
import PostItem from './PostItem';

export class Posts extends Component {
  render() {
      return this.props.posts.map((posts) => (
        <PostItem
          key={posts.id}
          id={posts.id}
          title={posts.title}
          thumbnail={posts.thumbnail}
          url={posts.url}
          author={posts.author.name}
          subreddit={posts.subreddit_name_prefixed}
          selftext={posts.selftext_html}
          domain={posts.domain}
          num_comments={posts.num_comments}
          score={posts.score}
          created={posts.created}
          subredditClick={this.props.subredditClick}
          convertTime={this.props.convertTime}
          postHint={posts.post_hint}
        />
      ));
  }
}

export default Posts;
