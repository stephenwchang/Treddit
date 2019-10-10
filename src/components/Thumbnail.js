import React, { Component } from 'react';

export class Thumbnail extends Component {
  render() {
      return (this.props.thumbnail.includes('jpg')) ? (
        <img src={this.props.thumbnail} alt='thumbnail' style={thumbnailStyle} />
      ) : <img src='https://309w5s255371fs4df2vftgbl-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/placeholder-300x169.jpg' alt='thumbnail' style={thumbnailStyle}/>
  }
}

const thumbnailStyle = {
  maxHeight: '60px',
  width: '100px',
  paddingRight: '10px'
}

export default Thumbnail;
