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
    moreCommentsLoaded: false,
    noComments: false,
  }

  renderComments = (id) => {
    r.getSubmission(id).comments.then(result => {
      let resultArray = Array.from(result);
      resultArray.length === 0 ? this.setState({ noComments: true }) :
      this.setState({ comments: resultArray }) // temporary fix due to returned proxy object from snoowrap
      console.log(this.state.comments);
    });
  }

  loadMoreComments =() => {
   this.setState({ moreCommentsLoaded: !this.state.moreCommentsLoaded })
  }

  componentDidMount() {
    this.renderComments(this.props.id);
  }

  render() {
    return (this.state.noComments) ? <div className='loadingComments'>No comments</div> : (this.state.comments.length > 0) ?
       [
        this.state.comments.map((comment) => (
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
      )).filter((x, i) => { return i < 5})  //display only first 5 comments
         ,
        !this.state.moreCommentsLoaded ? <div className='loadAllComments' onClick={this.loadMoreComments}>Show all comments</div>
        :
        this.state.comments.map((comment) => (
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
        )).filter((x, i) => { return i > 4})] :
     <div className='loadingComments'> Loading comments...</div>


    // else {
    //   return <div className='loadingComments'> Loading comments...</div>
    // }
  }
}

export default Comments;
