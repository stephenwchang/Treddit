import React, { Component } from 'react'

export class PostItem extends Component {
  render() {
    return (
      <div style={postStyle}>
        {this.props.title}
      </div>
    )
  }
}

export default PostItem
