import React, { Component } from 'react';


export class SelfText extends Component {
  render() {
    if (this.props.selftext != null) {
      return <p dangerouslySetInnerHTML={{ __html: this.props.selftext }}/>

    }
  }
}

export default SelfText;
