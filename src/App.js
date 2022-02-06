import React, { Component } from 'react';
import Posts from './components/Posts';
// import PopoverHint from './components/PopoverHint'
import PopoverHint from './components/PopoverHint';
import snoowrap from 'snoowrap';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import AppBar from './components/AppBar';
import moment from 'moment';

moment().format();

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
    subreddit: 'All', //subreddit will default to frontpage if not selected by user
    subNotFound: false,
  }

  loadPosts = (sub) => {
    r.getHot(sub).then(result => {
      this.setState({ posts: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
      console.log(this.state.posts)
    }, () => {
      this.setState({subNotFound: true})
    })
  }

  handleClick = event => {
    this.setState({ subreddit: event.target.value });
    this.loadPosts(event.target.value);
  }

  handleEnter = event => {
    if (event.key === 'Enter') {
      this.setState({ subreddit: event.target.value });
      this.loadPosts(event.target.value);
    }
  }

  handleClose = () => {
    this.setState({subNotFound: false})
    console.log('handled close of popover')
  }

  subredditClick = event => {
    this.setState({ subreddit: event });
    this.loadPosts(event);
  }

  convertTime = time => {
    let dateTime = moment.unix(time).format("MM-DD-YYYY HH:mm:ss")
    let timeAgo = moment(dateTime).fromNow()
    return timeAgo
  }

  loadMore = () => {
    console.log('infinite scroll activated')
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
    const loader = <div className='loader'>Loading posts...</div>
    return (
        <div className='posts'>
          <AppBar handleClick={this.handleClick} handleEnter={this.handleEnter} subredditClick={this.subredditClick} currentSub={this.state.subreddit} subNotFound={this.state.subNotFound} handleClose={this.handleClose}/>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={true}
            loader={loader}
          >
            {/* <SubredditChoice handleChange={this.handleChange} handleEnter={this.handleEnter} currentSub={this.state.subreddit} /> */}
            {/* <PopoverHint/> */}
            <Posts posts={this.state.posts} comments={this.state.comments} renderComments={this.renderComments} subredditClick={this.subredditClick} convertTime={this.convertTime}/>
          </InfiniteScroll>

        </div>

    );
  }
}

export default App;
