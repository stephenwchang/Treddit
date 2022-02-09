import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PopoverHint from './PopoverHint';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    borderRadius: '10px',
    opacity: '.9',
    backgroundColor: '#6897bb',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '35%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: '30%',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: '28%',
    transition: theme.transitions.create('width'),
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
      '&:focus': {
        width: 250,
      },
    },
  },
});

function SearchAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton> */}
          <img className='tredditorLogo' onClick={() => props.subredditClick('all')}
            src={'https://i.redd.it/m1pd3gtxch431.jpg'}
            style={{
                height:'45px',
                width: '45px',
                borderRadius: '20px',
                marginRight: '10px',
              }}
            alt={''}
          />

          {/* <Typography className={classes.title} variant="h5" color="inherit" noWrap> */}

            <div className='tredditorLogoContainer' onClick={() => console.log('clicked logo')}>
              <div className='animated-title'>
                <div className='text-top'>
                  <div>
                    <span>Tredditor</span>
                  </div>
                </div>
                  <div className='text-bottom'>
                    <div className='textBottom'>a Reddit app</div>
                  </div>
              </div>
            </div>

          {/* </Typography> */}
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              onKeyDown={props.handleEnter}
              placeholder={'r/' + props.currentSub}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            >
            </InputBase>
            <PopoverHint subNotFound={props.subNotFound} handleClose={props.handleClose}/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);
