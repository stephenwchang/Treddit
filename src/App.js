import React, { Component } from 'react';
import Posts from './components/Posts';
// import PopoverHint from './components/PopoverHint'
import PopoverHint from './components/PopoverHint';
import snoowrap from 'snoowrap';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import AppBar from './components/AppBar';
import moment from 'moment';
import HoverPanel from './components/HoverPanel';
import Drawer from './components/Drawer';

moment().format();

let credentials = {
  userAgent: 'Treddit 1.0 by Stephen Chang',
  clientId: 'eeuo6tH6FkR0FQ',
  clientSecret: '_89r7SRlDhCTtJ0ilQuukSXURkU',
  refreshToken: '7881048-46rszR3pc4SbpMnJzgqsYLu5J6c'
};
// temporary credentials - to find a way to implement reddit log-in capabilities

const r = new snoowrap(credentials);

class App extends Component {

  state = {
    posts: [],
    sortBy: 'Hot',
    subreddit: 'memes', //subreddit will default to frontpage if not selected by user
    subNotFound: false,
  }

  loadPosts = (sub) => {
    let currentSub = this.state.subreddit
    switch(this.state.sortBy) {
      case 'New':
        r.getNew(sub).then(result => {
          this.setState({ posts: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
          console.log(this.state.posts)
        }, () => {
          this.setState({subNotFound: true, subreddit: currentSub})
        })
        break;
      case 'Top':
        r.getTop(sub).then(result => {
          this.setState({ posts: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
          console.log(this.state.posts)
        }, () => {
          this.setState({subNotFound: true, subreddit: currentSub})
        })
        break;
      case 'Best':
        r.getBest(sub).then(result => {
          this.setState({ posts: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
          console.log(this.state.posts)
        }, () => {
          this.setState({subNotFound: true, subreddit: currentSub})
        })
        break;
      case 'Rising':
        r.getRising(sub).then(result => {
          this.setState({ posts: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
          console.log(this.state.posts)
        }, () => {
          this.setState({subNotFound: true, subreddit: currentSub})
        })
        break;
      case 'Controversial':
        r.getControversial(sub).then(result => {
          this.setState({ posts: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
          console.log(this.state.posts)
        }, () => {
          this.setState({subNotFound: true, subreddit: currentSub})
        })
        break;
      default:
        r.getHot(sub).then(result => {
          this.setState({ posts: Array.from(result) }) // temporary fix due to returned proxy object from snoowrap
          console.log(this.state.posts)
        }, () => {
          this.setState({subNotFound: true, subreddit: currentSub})
        })
      }
    }


  handleClick = event => {
    this.setState({ subreddit: event.target.value });
    this.loadPosts(event.target.value);
  }

  handleEnter = event => {
      this.setState({ subreddit: event.target.value });
      this.loadPosts(event.target.value);

  }

  handleSort = event => {
    console.log('event target value is ' + event.target.value)
    this.setState({ sortBy: event.target.value }, () => {
      this.loadPosts(this.state.subreddit);
    })
  }

  handleClose = () => {
    this.setState({subNotFound: false});
    console.log('handled close of popover');
  }

  subredditClick = event => {
    this.setState({ subreddit: event });
    this.loadPosts(event);
  }

  convertTime = time => {
    let dateTime = moment.unix(time).format("MM/DD/yyyy HH:mm:ss");
    let timeAgo = moment(dateTime).fromNow();
    return timeAgo
  }


  loadMore = () => {
    console.log('infinite scroll activated')
    let listingAmount = this.state.posts.length;

    switch(this.state.sortBy) {
      case 'New':
        r.getNew(this.state.subreddit, {limit: listingAmount}).then(myListing => {
          myListing.fetchMore({amount: 25}).then(extendedListing => {
            this.setState({ posts: extendedListing });
          })
        });
        break;
      case 'Best':
        r.getBest(this.state.subreddit, {limit: listingAmount}).then(myListing => {
          myListing.fetchMore({amount: 25}).then(extendedListing => {
            this.setState({ posts: extendedListing });
          })
        });
        break;
      case 'Top':
        r.getTop(this.state.subreddit, {limit: listingAmount}).then(myListing => {
          myListing.fetchMore({amount: 25}).then(extendedListing => {
            this.setState({ posts: extendedListing });
          })
        });
        break;
      case 'Rising':
        r.getRising(this.state.subreddit, {limit: listingAmount}).then(myListing => {
          myListing.fetchMore({amount: 25}).then(extendedListing => {
            this.setState({ posts: extendedListing });
          })
        });
        break;
      case 'Controversial':
        r.getControversial(this.state.subreddit, {limit: listingAmount}).then(myListing => {
          myListing.fetchMore({amount: 25}).then(extendedListing => {
            this.setState({ posts: extendedListing });
          })
        });
        break;
      default:
        r.getHot(this.state.subreddit, {limit: listingAmount}).then(myListing => {
          myListing.fetchMore({amount: 25}).then(extendedListing => {
            this.setState({ posts: extendedListing });
          })
        });
    }

   }

  componentDidMount = () => {
    this.loadPosts(this.state.subreddit);
  }

  render() {
    return (
      <>
        <Drawer
        subredditClick={this.subredditClick}
        handleEnter={this.handleEnter}
        currentSub={this.state.subreddit}
        subNotFound={this.state.subNotFound}
        handleClose={this.handleClose}
        loadMore={this.loadMore}
        posts={this.state.posts}
        comments={this.state.comments}
        renderComments={this.renderComments}
        convertTime={this.convertTime}
        handleSort={this.handleSort}
        sortBy={this.state.sortBy}/>

      </>

    );
  }
}

export default App;
