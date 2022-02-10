import React, { Component } from 'react';
import CommentItem from './CommentItem';
import snoowrap from 'snoowrap';

let credentials = {
  userAgent: 'Treddit 1.0 by Stephen Chang',
  clientId: 'eeuo6tH6FkR0FQ',
  clientSecret: '_89r7SRlDhCTtJ0ilQuukSXURkU',
  refreshToken: '7881048-46rszR3pc4SbpMnJzgqsYLu5J6c'
};

const r = new snoowrap(credentials);

export class Comments extends Component {

  state = {
    comments: [],

  }

  renderComments = (id) => {
    r.getSubmission(id).comments.then(result => {
      this.setState({ comments: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
      console.log(this.state.comments);
    });
  }

  componentDidMount() {
    this.renderComments(this.props.id);
  }

  render() {
    if (this.state.comments.length > 0) {
      return this.state.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          depth={comment.depth}
          authorName={comment.author.name}
          replies={comment.replies}
          score={comment.score}
          created={comment.created}
          bodyHtml={comment.body_html}
          body={comment.body}
          convertTime={this.props.convertTime}
        />
      )).filter((x, i) => { return i < 5}) //display only first 5 comments
    }
    else {
      return <div className='loadingComments'> Loading comments...</div>
    }
  }
}

export default Comments;
