import React, { Component } from 'react';

export class Thumbnail extends Component {
  render() {
      return (this.props.thumbnail.includes('jpg')) ? (
        <a onClick={(e)=> e.stopPropagation()} href={this.props.url} target='_blank' rel='noopener noreferrer'><img className='postThumbnail' src={this.props.thumbnail} alt='thumbnail'/></a>
      ) : <a onClick={(e)=> e.stopPropagation()} href={this.props.url} target='_blank' rel='noopener noreferrer'><img className='postThumbnail' src='https://negony.com/image/cache/placeholder-1000x1000.png' alt='thumbnail'/></a>
  }
}

// const thumbnailStyle = {
//   maxWidth: '140px',
//   borderRadius: '5px'

// }

export default Thumbnail;
