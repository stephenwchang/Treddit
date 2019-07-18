import React, { Component } from 'react';

export class Thumbnail extends Component {
  render() {
      return (this.props.thumbnail.includes('jpg')) ? (
        <img src={this.props.thumbnail} alt='thumbnail' style={thumbnailStyle} />
      ) : <></>
  }
}

const thumbnailStyle = {
  maxHeight: '60px',
  paddingRight: '10px'
}

export default Thumbnail;
