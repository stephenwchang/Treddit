import React, { Component } from 'react';


export class SelfText extends Component {
  render() {
    if (this.props.selftext != null) {
      return <div dangerouslySetInnerHTML={{ __html: this.props.selftext }}/>
    } else return null
  }
}

export default SelfText;
