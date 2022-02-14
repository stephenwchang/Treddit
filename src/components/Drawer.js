import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import HoverPanel from './HoverPanel';
import InfiniteScroll from 'react-infinite-scroller';
import Posts from './Posts';


const drawerWidth = 180;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: '#6897bb',
    borderRadius: '5px',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const loader = <div className='loader'>Loading posts...</div>

    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['all', 'worldnews', 'funny', 'nba', 'Damnthatsinteresting', 'aww', 'HumansBeingBros', 'memes', 'todayilearned'].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText onClick={() => this.props.subredditClick(text)} primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <img className='tredditorLogo' onClick={() => this.props.subredditClick('all')}
            src={'https://i.redd.it/m1pd3gtxch431.jpg'}
            style={{
                height:'45px',
                width: '45px',
                borderRadius: '20px',
                marginRight: '10px',
              }}
            alt={''}
          />
            <Typography variant="h6" color="inherit" noWrap>
              Tredditor
            </Typography>
            <Typography style={{ marginLeft: 'auto', }}>
              r/{this.props.currentSub}
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <AppBar subredditClick={this.props.subredditClick} handleEnter={this.props.handleEnter} currentSub={this.props.currentSub} subNotFound={this.props.subNotFound} handleClose={this.props.handleClose} /> */}
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

        <div className='posts'>
          <HoverPanel currentSub={this.props.subreddit}/>
          {/* <AppBar subredditClick={this.subredditClick} handleEnter={this.handleEnter} currentSub={this.state.subreddit} subNotFound={this.state.subNotFound} handleClose={this.handleClose}/> */}
          <InfiniteScroll
            pageStart={0}
            loadMore={this.props.loadMore}
            hasMore={true}
            loader={loader}
          >
            {/* <SubredditChoice handleChange={this.handleChange} handleEnter={this.handleEnter} currentSub={this.state.subreddit} /> */}
            {/* <PopoverHint/> */}
            <Posts posts={this.props.posts} comments={this.props.comments} renderComments={this.props.renderComments} subredditClick={this.props.subredditClick} convertTime={this.props.convertTime}/>
          </InfiniteScroll>
        </div>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
