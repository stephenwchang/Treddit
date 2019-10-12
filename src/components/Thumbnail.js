import React, { Component } from 'react';

export class Thumbnail extends Component {
  render() {
      return (this.props.thumbnail.includes('jpg')) ? (
        <a href={this.props.url} target='_blank' rel='noopener noreferrer'><img src={this.props.thumbnail} alt='thumbnail' style={thumbnailStyle} /></a>
      ) : <a href={this.props.url} target='_blank' rel='noopener noreferrer'><img src='https://d1bdhkmqqz901h.cloudfront.net/x/smart/http://www.dailyjournal.net/wp-content/themes/Newspaper/images/no-thumb/thumbnail.jpg' alt='thumbnail' style={thumbnailStyle}/></a>
  }
}

const thumbnailStyle = {
  maxHeight: '60px',
  width: '100px',
  paddingRight: '10px'
}

export default Thumbnail;
