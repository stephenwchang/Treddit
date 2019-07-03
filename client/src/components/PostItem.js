import React, { Component } from 'react'
import Comments from './Comments';

export class PostItem extends Component {
  render() {

    return (
      <div style={postStyle} onClick={this.props.renderComments.bind(this, this.props.id)}>
        {this.props.title}
        <Comments />
      </div>
    )
  }
}

const postStyle = {
  border: '1px solid',
  borderRadius: '5px',
  margin: '5px',
  padding: '5px'
}
export default PostItem;
