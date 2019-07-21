import React, { Component } from 'react';

export class CommentItem extends Component {
  // recursively generate comments until no more replies exist
  renderReplies = () => {
    if (this.props.replies) {
      return this.props.replies.map((comment) => (
        <CommentItem key={comment.id} depth={comment.depth} authorName={comment.author.name} replies={comment.replies} score={comment.score} created={comment.created} bodyHtml={comment.body_html} body={comment.body}/>
      ));
    }
  }

  render() {

      return (
        <div>
          <div className='commentItem' style={{marginLeft: `${((this.props.depth) * 20).toString()}px` }}>
            <div style={authorStyle}>{this.props.authorName}</div>
            <p dangerouslySetInnerHTML={{ __html: this.props.bodyHtml }}>
            </p>
          </div>
          {this.renderReplies()}
        </div>

      )

  }
}

const authorStyle = {
  color: "blue"
}

export default CommentItem;
