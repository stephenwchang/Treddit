import React, { Component } from 'react';
import Posts from './components/Posts';
import SubredditChoice from './components/SubredditChoice';
import snoowrap from 'snoowrap';
import './App.css';

let credentials = {
  userAgent: 'Treddit 1.0 by Stephen Chang',
  clientId: 'eeuo6tH6FkR0FQ',
  clientSecret: '_89r7SRlDhCTtJ0ilQuukSXURkU',
  refreshToken: '7881048-46rszR3pc4SbpMnJzgqsYLu5J6c'
};

const r = new snoowrap(credentials);

// temporary credentials - to find a way to implement reddit log-in capabilities



class App extends Component {

  state = {
    posts: [],
    subreddit: 'All' //subreddit will default to frontpage if not selected by user
  }

  loadPosts = (sub) => {
    r.getHot(sub).then(result => {
      this.setState({ posts: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
      console.log(this.state.posts)
    });

  }

  handleChange = event => {
    this.setState({ subreddit: event.target.value });
    this.loadPosts(event.target.value);
  }

  handleEnter = event => {
    if (event.key === 'Enter') {
      this.setState({ subreddit: event.target.value });
      this.loadPosts(event.target.value);
    }
  }

  loadMore = () => {
    let listingAmount = this.state.posts.length;
    r.getHot(this.state.subreddit, {limit: listingAmount}).then(myListing => {
      myListing.fetchMore({amount: 25}).then(extendedListing => {
        this.setState({ posts: extendedListing });
      })
    });
  }


  // renderComments = (id) => {
  //     // r.getSubmission(id).comments.then(result => {
  //     //   this.ssetState({ comments: result })
  //       console.log(this.state.comments)
  //     // });
  // }


  componentDidMount = () => {
    this.loadPosts(this.state.subreddit);
  }

  render() {
    return (
      <div>
        <div className='posts'>
          <button onClick={this.loadMore}>load more posts</button>
          <SubredditChoice handleChange={this.handleChange} handleEnter={this.handleEnter} currentSub={this.state.subreddit} />
          <Posts posts={this.state.posts} comments={this.state.comments} renderComments={this.renderComments} />
        </div>
      </div>
    );
  }
}

export default App;
