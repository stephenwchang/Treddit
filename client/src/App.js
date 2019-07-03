import React, { Component } from 'react';
import Posts from './components/Posts';
import snoowrap from 'snoowrap';
import './App.css';

const r = new snoowrap({
  userAgent: 'Treddit 1.0 by Stephen Chang',
  clientId: 'eeuo6tH6FkR0FQ',
  clientSecret: '_89r7SRlDhCTtJ0ilQuukSXURkU',
  refreshToken: '7881048-46rszR3pc4SbpMnJzgqsYLu5J6c'
});


class App extends Component {
  state = {
    posts: []
  }

  renderComments = id => {
    r.getSubmission(id).comments.then(result => {
      console.log(id, result);
    });
  }


  componentDidMount = () => {
    r.getHot().then(result => {
      this.setState({ posts: result }) //
      console.log(this.state.posts)
    });

  }

  render() {
    return (
      <div>
        <Posts posts={this.state.posts} renderComments={this.renderComments}/>
      </div>
    );
  }
}

export default App;
